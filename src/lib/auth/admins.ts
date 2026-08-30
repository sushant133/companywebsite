import "server-only";

import { ObjectId, type Collection } from "mongodb";

import { getDb } from "@/lib/db/mongo";
import { hashPassword } from "@/lib/auth/password";
import type { AdminRole, SessionPayload } from "@/lib/auth/session";

export const ADMIN_COLLECTION = "admins";

export type AdminDoc = {
  _id: ObjectId;
  email: string;
  name: string;
  passwordHash: string;
  role: AdminRole;
  /** Bumped on every password change so old sessions stop verifying. */
  tokenVersion: number;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
};

export type PublicAdmin = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: string;
  lastLoginAt: string | null;
};

let indexesReady: Promise<void> | null = null;

export async function adminsCollection(): Promise<Collection<AdminDoc>> {
  const db = await getDb();
  const collection = db.collection<AdminDoc>(ADMIN_COLLECTION);

  // A unique index is what actually prevents two accounts sharing an email;
  // the application-level check below is only there for a friendly message.
  indexesReady ??= collection
    .createIndex({ email: 1 }, { unique: true })
    .then(() => undefined)
    .catch((error) => {
      indexesReady = null;
      throw error;
    });
  await indexesReady;

  return collection;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function toPublicAdmin(doc: AdminDoc): PublicAdmin {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    role: doc.role,
    createdAt: doc.createdAt.toISOString(),
    lastLoginAt: doc.lastLoginAt?.toISOString() ?? null,
  };
}

export function toSessionPayload(doc: AdminDoc): SessionPayload {
  return {
    sub: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    role: doc.role,
    ver: doc.tokenVersion,
  };
}

export async function countAdmins(): Promise<number> {
  const collection = await adminsCollection();
  return collection.countDocuments();
}

export async function findAdminByEmail(
  email: string,
): Promise<AdminDoc | null> {
  const collection = await adminsCollection();
  return collection.findOne({ email: normalizeEmail(email) });
}

export async function findAdminById(id: string): Promise<AdminDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await adminsCollection();
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function listAdmins(): Promise<PublicAdmin[]> {
  const collection = await adminsCollection();
  const docs = await collection.find({}).sort({ createdAt: 1 }).toArray();
  return docs.map(toPublicAdmin);
}

export async function createAdmin(input: {
  email: string;
  name: string;
  password: string;
  role: AdminRole;
}): Promise<AdminDoc> {
  const collection = await adminsCollection();
  const now = new Date();
  const doc: AdminDoc = {
    _id: new ObjectId(),
    email: normalizeEmail(input.email),
    name: input.name.trim(),
    passwordHash: await hashPassword(input.password),
    role: input.role,
    tokenVersion: 1,
    createdAt: now,
    updatedAt: now,
  };

  await collection.insertOne(doc);
  return doc;
}

export async function setAdminPassword(
  id: ObjectId,
  password: string,
): Promise<void> {
  const collection = await adminsCollection();
  await collection.updateOne(
    { _id: id },
    {
      $set: { passwordHash: await hashPassword(password), updatedAt: new Date() },
      $inc: { tokenVersion: 1 },
    },
  );
}

export async function recordLogin(id: ObjectId): Promise<void> {
  const collection = await adminsCollection();
  await collection.updateOne({ _id: id }, { $set: { lastLoginAt: new Date() } });
}

export async function deleteAdmin(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const collection = await adminsCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

/**
 * The signed-in admin, confirmed against the database. The cookie alone is not
 * enough: an account can be deleted, or its password changed from another
 * device, after the token was issued.
 */
export async function resolveSessionAdmin(
  session: SessionPayload | null,
): Promise<AdminDoc | null> {
  if (!session) return null;
  const doc = await findAdminById(session.sub);
  if (!doc || doc.tokenVersion !== session.ver) return null;
  return doc;
}
