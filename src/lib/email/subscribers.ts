import "server-only";

import { randomUUID } from "node:crypto";
import { ObjectId, type Collection } from "mongodb";
import { z } from "zod";

import { getDb } from "@/lib/db/mongo";

export const SUBSCRIBER_COLLECTION = "subscribers";

export type SubscriberStatus = "subscribed" | "unsubscribed";

export type SubscriberDoc = {
  _id: ObjectId;
  email: string;
  name: string;
  tags: string[];
  /** How the address arrived: the contact form, an import, or typed in. */
  source: string;
  status: SubscriberStatus;
  /** Opaque value behind the one-click unsubscribe link. */
  unsubscribeToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PublicSubscriber = {
  id: string;
  email: string;
  name: string;
  tags: string[];
  source: string;
  status: SubscriberStatus;
  createdAt: string;
};

export const subscriberInputSchema = z.object({
  email: z.email("Enter a valid email address").max(200),
  name: z.string().trim().max(160).default(""),
  tags: z.array(z.string().trim().min(1).max(40)).max(10).default([]),
  source: z.string().trim().max(60).default("manual"),
});

let indexesReady: Promise<void> | null = null;

export async function subscribersCollection(): Promise<
  Collection<SubscriberDoc>
> {
  const db = await getDb();
  const collection = db.collection<SubscriberDoc>(SUBSCRIBER_COLLECTION);

  indexesReady ??= Promise.all([
    collection.createIndex({ email: 1 }, { unique: true }),
    collection.createIndex({ unsubscribeToken: 1 }),
  ])
    .then(() => undefined)
    .catch((error) => {
      indexesReady = null;
      throw error;
    });
  await indexesReady;

  return collection;
}

export function toPublicSubscriber(doc: SubscriberDoc): PublicSubscriber {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    tags: doc.tags,
    source: doc.source,
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function listSubscribers(): Promise<PublicSubscriber[]> {
  const collection = await subscribersCollection();
  const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toPublicSubscriber);
}

export async function listSubscribedEmails(): Promise<
  { email: string; name: string }[]
> {
  const collection = await subscribersCollection();
  const docs = await collection
    .find({ status: "subscribed" })
    .project<{ email: string; name: string }>({ email: 1, name: 1, _id: 0 })
    .toArray();
  return docs;
}

/**
 * Adds addresses, skipping any already on the list. Re-adding an address that
 * had unsubscribed does not resubscribe it — that has to be a deliberate act
 * by the person, not a side effect of an import.
 */
export async function addSubscribers(
  inputs: z.infer<typeof subscriberInputSchema>[],
): Promise<{ added: number; skipped: number }> {
  const collection = await subscribersCollection();
  const now = new Date();
  let added = 0;
  let skipped = 0;

  for (const input of inputs) {
    const email = input.email.trim().toLowerCase();
    const result = await collection.updateOne(
      { email },
      {
        $setOnInsert: {
          email,
          name: input.name,
          tags: input.tags,
          source: input.source,
          status: "subscribed" as SubscriberStatus,
          unsubscribeToken: randomUUID(),
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true },
    );

    if (result.upsertedCount === 1) added += 1;
    else skipped += 1;
  }

  return { added, skipped };
}

export async function setSubscriberStatus(
  id: string,
  status: SubscriberStatus,
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const collection = await subscribersCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date() } },
  );
  return result.matchedCount === 1;
}

export async function deleteSubscriber(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const collection = await subscribersCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

/** Backs the public unsubscribe link. Returns the address that was removed. */
export async function unsubscribeByToken(
  token: string,
): Promise<string | null> {
  if (!token.trim()) return null;
  const collection = await subscribersCollection();
  const doc = await collection.findOneAndUpdate(
    { unsubscribeToken: token.trim() },
    { $set: { status: "unsubscribed" as SubscriberStatus, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
  return doc?.email ?? null;
}

export async function findUnsubscribeToken(
  email: string,
): Promise<string | null> {
  const collection = await subscribersCollection();
  const doc = await collection.findOne({ email: email.trim().toLowerCase() });
  return doc?.unsubscribeToken ?? null;
}
