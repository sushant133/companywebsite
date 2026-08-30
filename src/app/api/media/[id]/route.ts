import { readMedia } from "@/lib/db/media";
import { isDatabaseConfigured } from "@/lib/env";

type Context = { params: Promise<{ id: string }> };

/**
 * Serves an uploaded image to the public site. Deliberately unauthenticated:
 * these are the pictures on the pages. Ids are never reused, so a stored file
 * can be cached indefinitely.
 *
 * The CSP header matters for SVG: an uploaded SVG served from the site's own
 * origin could otherwise carry script. `default-src 'none'` renders the drawing
 * and nothing else, and `nosniff` stops a mistyped file being run as HTML.
 */
export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;

  if (!isDatabaseConfigured()) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readMedia(id);
    if (!file) return new Response("Not found", { status: 404 });

    return new Response(new Uint8Array(file.bytes), {
      headers: {
        "content-type": file.contentType,
        "content-length": String(file.bytes.byteLength),
        "cache-control": "public, max-age=31536000, immutable",
        "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
        "x-content-type-options": "nosniff",
        "content-disposition": "inline",
      },
    });
  } catch (error) {
    console.error("[media] could not read file", error);
    return new Response("Not found", { status: 404 });
  }
}
