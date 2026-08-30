"use server";

import { z } from "zod";

import { getContent } from "@/lib/content/store";
import { saveMessage } from "@/lib/db/messages";
import { addSubscribers } from "@/lib/email/subscribers";
import { getTransporter, mailFrom } from "@/lib/email/transport";
import { escapeHtml } from "@/lib/email/template";
import { isDatabaseConfigured, isMailConfigured } from "@/lib/env";

const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/mgonlrqe";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.email("Enter a valid email address").max(200),
  phone: z.string().trim().max(50).optional(),
  service: z.string().trim().max(50).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (10 characters minimum)")
    .max(5000),
});

type ContactData = z.infer<typeof contactSchema>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level messages keyed by input name, for inline display. */
  errors?: Partial<Record<keyof ContactData, string>>;
};

/**
 * The initial state lives with the form rather than here: a `"use server"`
 * module may only export async functions, and exporting a plain object from one
 * makes the whole module fail to evaluate — taking the action with it.
 */

/** Emails the enquiry to the company inbox over the configured SMTP account. */
async function notifyByEmail(data: ContactData): Promise<boolean> {
  if (!isMailConfigured()) return false;

  try {
    const site = await getContent("site");
    const rows: [string, string][] = [
      ["Name", `${data.firstName} ${data.lastName}`],
      ["Email", data.email],
      ["Phone", data.phone || "—"],
      ["Service", data.service || "—"],
    ];

    await getTransporter().sendMail({
      from: mailFrom(site.name),
      to: site.contact.email,
      replyTo: { name: `${data.firstName} ${data.lastName}`, address: data.email },
      subject: `New enquiry from ${data.firstName} ${data.lastName}`,
      text: [
        ...rows.map(([label, value]) => `${label}: ${value}`),
        "",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#334155;">
          <h2 style="color:#0f172a;">New website enquiry</h2>
          <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td style="color:#64748b;">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
              )
              .join("")}
          </table>
          <p style="white-space:pre-wrap;line-height:1.7;margin-top:16px;">${escapeHtml(data.message)}</p>
        </div>`,
    });
    return true;
  } catch (error) {
    console.error("[contact] notification email failed", error);
    return false;
  }
}

/** Posts to Formspree, which is how the site worked before SMTP was set up. */
async function notifyByFormspree(data: ContactData): Promise<boolean> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        _subject: "New Message from MantraSphere Website",
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("[contact] formspree post failed", error);
    return false;
  }
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    service: formData.get("service") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: ContactFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactData;
      errors[field] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      errors,
    };
  }

  const data = parsed.data;

  // Stored first so the enquiry survives even if every delivery route is down,
  // and so the dashboard inbox and the mailing list both see it.
  let stored = false;
  if (isDatabaseConfigured()) {
    stored = await saveMessage(data);
    try {
      await addSubscribers([
        {
          email: data.email,
          name: `${data.firstName} ${data.lastName}`.trim(),
          tags: ["contact-form"],
          source: "contact-form",
        },
      ]);
    } catch (error) {
      console.error("[contact] could not add to the mailing list", error);
    }
  }

  // SMTP when it is configured, Formspree otherwise, so an install without
  // mail credentials keeps behaving exactly as it did before.
  const delivered = (await notifyByEmail(data)) || (await notifyByFormspree(data));

  if (!delivered && !stored) {
    return {
      status: "error",
      message:
        "We couldn't reach the mail service. Please try again, or email us directly.",
    };
  }

  return { status: "success" };
}
