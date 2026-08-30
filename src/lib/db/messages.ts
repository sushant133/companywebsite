import "server-only";

import { ObjectId } from "mongodb";

import { getDb } from "@/lib/db/mongo";

export const MESSAGE_COLLECTION = "messages";

export type MessageDoc = {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  read: boolean;
  createdAt: Date;
};

export type PublicMessage = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  read: boolean;
  createdAt: string;
};

function toPublic(doc: MessageDoc): PublicMessage {
  return {
    id: doc._id.toString(),
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    phone: doc.phone,
    service: doc.service,
    message: doc.message,
    read: doc.read,
    createdAt: doc.createdAt.toISOString(),
  };
}

/**
 * Contact submissions are kept so the dashboard has an inbox and so the people
 * who wrote in can be turned into email recipients. Storing one must never fail
 * the form itself — the caller ignores the boolean when the send succeeded.
 */
export async function saveMessage(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}): Promise<boolean> {
  try {
    const db = await getDb();
    await db.collection<MessageDoc>(MESSAGE_COLLECTION).insertOne({
      _id: new ObjectId(),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email.toLowerCase(),
      phone: input.phone ?? "",
      service: input.service ?? "",
      message: input.message,
      read: false,
      createdAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error("[messages] could not store submission", error);
    return false;
  }
}

export async function listMessages(limit = 200): Promise<PublicMessage[]> {
  const db = await getDb();
  const docs = await db
    .collection<MessageDoc>(MESSAGE_COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return docs.map(toPublic);
}

export async function countUnreadMessages(): Promise<number> {
  const db = await getDb();
  return db.collection<MessageDoc>(MESSAGE_COLLECTION).countDocuments({
    read: false,
  });
}

export async function markMessageRead(
  id: string,
  read: boolean,
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const result = await db
    .collection<MessageDoc>(MESSAGE_COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { read } });
  return result.matchedCount === 1;
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const result = await db
    .collection<MessageDoc>(MESSAGE_COLLECTION)
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
