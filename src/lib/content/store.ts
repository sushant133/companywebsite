import "server-only";

import { cache } from "react";

import { getDb } from "@/lib/db/mongo";
import { defaultContent } from "@/lib/content/defaults";
import {
  contentSchemas,
  type ContentMap,
  type ContentSection,
} from "@/lib/content/schema";
import { isDatabaseConfigured } from "@/lib/env";

export const CONTENT_COLLECTION = "content";

type ContentDoc = {
  _id: ContentSection;
  data: unknown;
  updatedAt: Date;
  updatedBy?: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date)
  );
}

/**
 * Stored documents are merged over the shipped defaults rather than replacing
 * them, so a section saved before a new field existed still renders, and a
 * field the admin cleared out falls back to something sensible. Arrays replace
 * wholesale — an empty list is a deliberate choice, not a missing value.
 */
function mergeDefaults<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : (override as T));
  }

  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    result[key] = key in base ? mergeDefaults(base[key], value) : value;
  }
  return result as T;
}

/**
 * Reads one content section. Falls back to the shipped defaults whenever the
 * database is not configured, is unreachable, or holds a document that no
 * longer satisfies the schema — the public site must never go down because of
 * a content problem.
 */
export const getContent = cache(async function getContent<
  K extends ContentSection,
>(section: K): Promise<ContentMap[K]> {
  const fallback = defaultContent[section];

  if (!isDatabaseConfigured()) return fallback;

  try {
    const db = await getDb();
    const doc = await db
      .collection<ContentDoc>(CONTENT_COLLECTION)
      .findOne({ _id: section });

    if (!doc?.data) return fallback;

    const merged = mergeDefaults(fallback, doc.data);
    const parsed = contentSchemas[section].safeParse(merged);
    return parsed.success ? (parsed.data as ContentMap[K]) : fallback;
  } catch (error) {
    console.error(`[content] falling back to defaults for "${section}"`, error);
    return fallback;
  }
});

/** Every section at once, for the admin dashboard overview. */
export async function getAllContent(): Promise<ContentMap> {
  const entries = await Promise.all(
    (Object.keys(defaultContent) as ContentSection[]).map(
      async (section) => [section, await getContent(section)] as const,
    ),
  );
  return Object.fromEntries(entries) as ContentMap;
}

/** Validates and persists one section. Throws on a schema violation. */
export async function saveContent<K extends ContentSection>(
  section: K,
  value: unknown,
  updatedBy?: string,
): Promise<ContentMap[K]> {
  const merged = mergeDefaults(defaultContent[section], value);
  const data = contentSchemas[section].parse(merged) as ContentMap[K];

  const db = await getDb();
  await db.collection<ContentDoc>(CONTENT_COLLECTION).updateOne(
    { _id: section },
    { $set: { data, updatedAt: new Date(), updatedBy } },
    { upsert: true },
  );

  return data;
}

/** Drops a section's stored document so it renders from the shipped defaults. */
export async function resetContent(section: ContentSection): Promise<void> {
  const db = await getDb();
  await db.collection<ContentDoc>(CONTENT_COLLECTION).deleteOne({ _id: section });
}

/** When each section was last edited, for the dashboard overview. */
export async function getContentMeta(): Promise<
  Record<string, { updatedAt: string; updatedBy?: string }>
> {
  if (!isDatabaseConfigured()) return {};
  try {
    const db = await getDb();
    const docs = await db
      .collection<ContentDoc>(CONTENT_COLLECTION)
      .find({}, { projection: { updatedAt: 1, updatedBy: 1 } })
      .toArray();

    return Object.fromEntries(
      docs.map((doc) => [
        doc._id,
        {
          updatedAt: doc.updatedAt?.toISOString() ?? "",
          updatedBy: doc.updatedBy,
        },
      ]),
    );
  } catch {
    return {};
  }
}
