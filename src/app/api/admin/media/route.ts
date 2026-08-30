import {
  ApiError,
  handle,
  isSameOrigin,
  jsonOk,
  requireAdmin,
} from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/auth/rate-limit";
import {
  MAX_UPLOAD_BYTES,
  isAllowedImageType,
  listMedia,
  uploadMedia,
} from "@/lib/db/media";

/** The library the image fields pick from. */
export async function GET() {
  return handle(async () => {
    await requireAdmin();
    return jsonOk({ files: await listMedia() });
  });
}

/**
 * Takes one file from a multipart form and stores it in GridFS. Uploading is
 * the one admin action that writes bytes rather than validated fields, so the
 * type and the size are both checked before anything is stored.
 */
export async function POST(request: Request) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    const admin = await requireAdmin();

    const limit = rateLimit(
      `media:${admin._id.toString()}:${clientIp(request.headers)}`,
      60,
      60 * 60 * 1000,
    );
    if (!limit.ok) {
      throw new ApiError("Too many uploads. Try again shortly.", 429);
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      throw new ApiError("Expected a file upload.", 400);
    }

    const file = form.get("file");
    if (!(file instanceof File)) {
      throw new ApiError("No file was attached.", 400);
    }
    if (!isAllowedImageType(file.type)) {
      throw new ApiError(
        "Upload a PNG, JPEG, WebP, GIF, AVIF or SVG image.",
        415,
      );
    }
    if (file.size === 0) {
      throw new ApiError("That file is empty.", 400);
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      throw new ApiError(
        `That file is larger than ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)}MB.`,
        413,
      );
    }

    const stored = await uploadMedia({
      filename: file.name,
      contentType: file.type,
      bytes: Buffer.from(await file.arrayBuffer()),
      uploadedBy: admin.email,
    });

    return jsonOk({ file: stored }, { status: 201 });
  });
}
