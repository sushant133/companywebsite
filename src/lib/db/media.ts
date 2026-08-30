import "server-only";

import { GridFSBucket, ObjectId, type Db } from "mongodb";

import { getDb } from "@/lib/db/mongo";

export const MEDIA_BUCKET = "media";

/** Five megabytes. Large enough for a hero photo, small enough to buffer. */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/**
 * What the dashboard is allowed to upload. Anything not on this list is
 * refused outright rather than stored and served with a guessed type.
 */
const ALLOWED_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

export function isAllowedImageType(type: string): boolean {
  return type in ALLOWED_TYPES;
}

export function extensionFor(type: string): string {
  return ALLOWED_TYPES[type] ?? "bin";
}

export type MediaFile = {
  id: string;
  /** The path to store in a content field, and to render on the site. */
  url: string;
  filename: string;
  contentType: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
};

type MediaMetadata = {
  contentType: string;
  uploadedBy: string;
};

export function mediaUrl(id: string | ObjectId): string {
  return `/api/media/${id.toString()}`;
}

async function bucket(): Promise<GridFSBucket> {
  const db: Db = await getDb();
  return new GridFSBucket(db, { bucketName: MEDIA_BUCKET });
}

/**
 * Keeps the stored name recognisable in the library without letting a crafted
 * filename carry a path or an unexpected extension.
 */
export function safeFilename(name: string, contentType: string): string {
  const base = name
    .replace(/\\/g, "/")
    .split("/")
    .pop()!
    .replace(/\.[^.]*$/, "")
    .replace(/[^a-zA-Z0-9 ._-]/g, "")
    .trim()
    .slice(0, 80);

  return `${base || "image"}.${extensionFor(contentType)}`;
}

export async function uploadMedia(input: {
  filename: string;
  contentType: string;
  bytes: Buffer;
  uploadedBy: string;
}): Promise<MediaFile> {
  const files = await bucket();
  const filename = safeFilename(input.filename, input.contentType);

  const id = await new Promise<ObjectId>((resolve, reject) => {
    const stream = files.openUploadStream(filename, {
      // GridFS has its own contentType field, but the metadata copy is what
      // survives a projection and keeps the listing to a single query.
      metadata: {
        contentType: input.contentType,
        uploadedBy: input.uploadedBy,
      } satisfies MediaMetadata,
    });
    stream.on("error", reject);
    stream.on("finish", () => resolve(stream.id as ObjectId));
    stream.end(input.bytes);
  });

  return {
    id: id.toString(),
    url: mediaUrl(id),
    filename,
    contentType: input.contentType,
    size: input.bytes.byteLength,
    uploadedBy: input.uploadedBy,
    uploadedAt: new Date().toISOString(),
  };
}

export async function listMedia(limit = 200): Promise<MediaFile[]> {
  const files = await bucket();
  const docs = await files
    .find({})
    .sort({ uploadDate: -1 })
    .limit(limit)
    .toArray();

  return docs.map((doc) => ({
    id: doc._id.toString(),
    url: mediaUrl(doc._id),
    filename: doc.filename,
    contentType:
      (doc.metadata as MediaMetadata | undefined)?.contentType ??
      "application/octet-stream",
    size: doc.length,
    uploadedBy: (doc.metadata as MediaMetadata | undefined)?.uploadedBy ?? "",
    uploadedAt: doc.uploadDate.toISOString(),
  }));
}

export async function deleteMedia(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const files = await bucket();
  try {
    await files.delete(new ObjectId(id));
    return true;
  } catch {
    // The driver throws rather than returning a count when the id is unknown.
    return false;
  }
}

/**
 * Reads a file back for the public route. Buffered rather than streamed: the
 * upload cap keeps these small, and a single Buffer gives the response a
 * correct Content-Length without adapting a Node stream to a web one.
 */
export async function readMedia(
  id: string,
): Promise<{ bytes: Buffer; contentType: string } | null> {
  if (!ObjectId.isValid(id)) return null;

  const objectId = new ObjectId(id);
  const files = await bucket();
  const [doc] = await files.find({ _id: objectId }).limit(1).toArray();
  if (!doc) return null;

  const chunks: Buffer[] = [];
  await new Promise<void>((resolve, reject) => {
    const stream = files.openDownloadStream(objectId);
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", resolve);
  });

  return {
    bytes: Buffer.concat(chunks),
    contentType:
      (doc.metadata as MediaMetadata | undefined)?.contentType ??
      "application/octet-stream",
  };
}
