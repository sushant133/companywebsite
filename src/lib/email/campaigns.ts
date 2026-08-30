import "server-only";

import { ObjectId } from "mongodb";
import { z } from "zod";

import { getDb } from "@/lib/db/mongo";
import { env } from "@/lib/env";
import { getContent } from "@/lib/content/store";
import { getTransporter, mailFrom } from "@/lib/email/transport";
import { findUnsubscribeToken } from "@/lib/email/subscribers";
import {
  personalize,
  renderCampaignHtml,
  renderCampaignText,
  type CampaignBrand,
  type CampaignContent,
  type CampaignRecipient,
} from "@/lib/email/template";

export const CAMPAIGN_COLLECTION = "campaigns";

/** The ceiling the dashboard advertises, enforced here rather than in the UI. */
export const MAX_RECIPIENTS = 100;

/**
 * How many messages are in flight at once. Shared mail hosts start deferring
 * well before a hundred parallel sends, so this stays deliberately low.
 */
const CONCURRENCY = 4;

export const recipientSchema = z.object({
  email: z.email("Enter a valid email address").max(200),
  name: z.string().trim().max(160).optional(),
});

export const campaignContentSchema = z.object({
  subject: z.string().trim().min(1, "A subject is required").max(200),
  preheader: z.string().trim().max(200).default(""),
  heading: z.string().trim().min(1, "A heading is required").max(200),
  body: z.string().trim().min(1, "Write something to send").max(20000),
  bullets: z.array(z.string().trim().max(200)).max(10).default([]),
  ctaLabel: z.string().trim().max(80).default(""),
  ctaUrl: z.string().trim().max(500).default(""),
  imageUrl: z.string().trim().max(500).default(""),
  footerNote: z.string().trim().max(1000).default(""),
});

export const sendCampaignSchema = z.object({
  content: campaignContentSchema,
  recipients: z
    .array(recipientSchema)
    .min(1, "Add at least one recipient")
    .max(MAX_RECIPIENTS, `A campaign can go to at most ${MAX_RECIPIENTS} recipients`),
  /** Sends only to the first recipient, for checking the layout. */
  testOnly: z.boolean().default(false),
});

export type SendResult = {
  email: string;
  ok: boolean;
  error?: string;
};

export type CampaignDoc = {
  _id: ObjectId;
  subject: string;
  content: CampaignContent;
  recipientCount: number;
  sent: number;
  failed: number;
  results: SendResult[];
  testOnly: boolean;
  sentBy: string;
  createdAt: Date;
};

/** Company details for the template, read from the same content the site uses. */
export async function buildBrand(): Promise<Omit<CampaignBrand, "unsubscribeUrl">> {
  const site = await getContent("site");
  return {
    companyName: site.name,
    siteUrl: site.url,
    logoUrl: site.logo,
    tagline: site.description,
    address: site.contact.address,
    phone: site.contact.phones[0] ?? "",
    email: site.contact.email,
    socials: site.socials.map((social) => ({
      label: social.label,
      href: social.href,
    })),
  };
}

/** Deduplicates on the address, keeping the first name given for it. */
export function dedupeRecipients(
  recipients: CampaignRecipient[],
): CampaignRecipient[] {
  const seen = new Map<string, CampaignRecipient>();
  for (const recipient of recipients) {
    const email = recipient.email.trim().toLowerCase();
    if (!email || seen.has(email)) continue;
    seen.set(email, { email, name: recipient.name?.trim() || "" });
  }
  return [...seen.values()];
}

/**
 * Two links: the page a reader lands on from the footer, and the endpoint a
 * mail client POSTs to for one-click unsubscribe. An address that is not on the
 * subscriber list gets neither — there is nothing to unsubscribe it from.
 */
async function unsubscribeUrlsFor(
  email: string,
  siteUrl: string,
): Promise<{ page: string; oneClick: string }> {
  const token = await findUnsubscribeToken(email);
  if (!token) return { page: "", oneClick: "" };

  const base = siteUrl.replace(/\/+$/, "");
  const query = `token=${encodeURIComponent(token)}`;
  return {
    page: `${base}/unsubscribe?${query}`,
    oneClick: `${base}/api/unsubscribe?${query}`,
  };
}

/**
 * Sends one message per recipient rather than one message with a hundred
 * addresses: every reader sees only their own address, the greeting can be
 * personalised, and one bad address does not sink the rest of the batch.
 */
export async function sendCampaign(input: {
  content: CampaignContent;
  recipients: CampaignRecipient[];
  testOnly: boolean;
  sentBy: string;
}): Promise<{ sent: number; failed: number; results: SendResult[] }> {
  const recipients = dedupeRecipients(input.recipients).slice(
    0,
    input.testOnly ? 1 : MAX_RECIPIENTS,
  );

  const transporter = getTransporter();
  const baseBrand = await buildBrand();
  const from = mailFrom(baseBrand.companyName);
  const replyTo = env.smtp.replyTo || baseBrand.email;

  const results: SendResult[] = new Array(recipients.length);

  let cursor = 0;
  async function worker() {
    while (cursor < recipients.length) {
      const index = cursor++;
      const recipient = recipients[index]!;
      const unsubscribe = await unsubscribeUrlsFor(
        recipient.email,
        baseBrand.siteUrl,
      );
      const brand: CampaignBrand = {
        ...baseBrand,
        unsubscribeUrl: unsubscribe.page,
      };

      try {
        await transporter.sendMail({
          from,
          to: recipient.name
            ? { name: recipient.name, address: recipient.email }
            : recipient.email,
          replyTo,
          subject: personalize(input.content.subject, recipient),
          text: renderCampaignText(input.content, brand, recipient),
          html: renderCampaignHtml(input.content, brand, recipient),
          headers: unsubscribe.oneClick
            ? {
                "List-Unsubscribe": `<${unsubscribe.oneClick}>, <${unsubscribe.page}>`,
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
              }
            : undefined,
        });
        results[index] = { email: recipient.email, ok: true };
      } catch (error) {
        results[index] = {
          email: recipient.email,
          ok: false,
          error: error instanceof Error ? error.message : "Send failed",
        };
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, recipients.length) }, worker),
  );

  const sent = results.filter((result) => result.ok).length;
  return { sent, failed: results.length - sent, results };
}

export async function recordCampaign(input: {
  content: CampaignContent;
  recipientCount: number;
  sent: number;
  failed: number;
  results: SendResult[];
  testOnly: boolean;
  sentBy: string;
}): Promise<string> {
  const db = await getDb();
  const doc: CampaignDoc = {
    _id: new ObjectId(),
    subject: input.content.subject,
    content: input.content,
    recipientCount: input.recipientCount,
    sent: input.sent,
    failed: input.failed,
    results: input.results,
    testOnly: input.testOnly,
    sentBy: input.sentBy,
    createdAt: new Date(),
  };
  await db.collection<CampaignDoc>(CAMPAIGN_COLLECTION).insertOne(doc);
  return doc._id.toString();
}

export type CampaignSummary = {
  id: string;
  subject: string;
  recipientCount: number;
  sent: number;
  failed: number;
  testOnly: boolean;
  sentBy: string;
  createdAt: string;
};

export async function listCampaigns(limit = 25): Promise<CampaignSummary[]> {
  const db = await getDb();
  const docs = await db
    .collection<CampaignDoc>(CAMPAIGN_COLLECTION)
    .find({}, { projection: { results: 0, content: 0 } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return docs.map((doc) => ({
    id: doc._id.toString(),
    subject: doc.subject,
    recipientCount: doc.recipientCount,
    sent: doc.sent,
    failed: doc.failed,
    testOnly: doc.testOnly,
    sentBy: doc.sentBy,
    createdAt: doc.createdAt.toISOString(),
  }));
}
