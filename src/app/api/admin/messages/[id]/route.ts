import { z } from "zod";

import {
  ApiError,
  handle,
  isSameOrigin,
  jsonOk,
  jsonValidationError,
  readJson,
  requireAdmin,
} from "@/lib/api";
import { deleteMessage, markMessageRead } from "@/lib/db/messages";

type Context = { params: Promise<{ id: string }> };

const patchSchema = z.object({ read: z.boolean() });

export async function PATCH(request: Request, context: Context) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    await requireAdmin();

    const parsed = patchSchema.safeParse(await readJson(request));
    if (!parsed.success) return jsonValidationError(parsed.error);

    const { id } = await context.params;
    if (!(await markMessageRead(id, parsed.data.read))) {
      throw new ApiError("That message no longer exists.", 404);
    }
    return jsonOk({ id, read: parsed.data.read });
  });
}

export async function DELETE(request: Request, context: Context) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    await requireAdmin();

    const { id } = await context.params;
    if (!(await deleteMessage(id))) {
      throw new ApiError("That message no longer exists.", 404);
    }
    return jsonOk({ deleted: true });
  });
}
