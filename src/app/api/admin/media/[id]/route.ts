import { ApiError, handle, isSameOrigin, jsonOk, requireAdmin } from "@/lib/api";
import { deleteMedia } from "@/lib/db/media";

type Context = { params: Promise<{ id: string }> };

/**
 * Removing a file does not go looking for content that still points at it —
 * a broken thumbnail in the editor is a cheaper failure than refusing to tidy
 * up, and the image fields show one when a path stops resolving.
 */
export async function DELETE(request: Request, context: Context) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    await requireAdmin();

    const { id } = await context.params;
    if (!(await deleteMedia(id))) {
      throw new ApiError("That file no longer exists.", 404);
    }
    return jsonOk({ deleted: true });
  });
}
