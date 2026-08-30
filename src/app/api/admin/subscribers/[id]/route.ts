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
import { deleteSubscriber, setSubscriberStatus } from "@/lib/email/subscribers";

type Context = { params: Promise<{ id: string }> };

const patchSchema = z.object({
  status: z.enum(["subscribed", "unsubscribed"]),
});

export async function PATCH(request: Request, context: Context) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    await requireAdmin();

    const parsed = patchSchema.safeParse(await readJson(request));
    if (!parsed.success) return jsonValidationError(parsed.error);

    const { id } = await context.params;
    if (!(await setSubscriberStatus(id, parsed.data.status))) {
      throw new ApiError("That subscriber no longer exists.", 404);
    }
    return jsonOk({ id, status: parsed.data.status });
  });
}

export async function DELETE(request: Request, context: Context) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    await requireAdmin();

    const { id } = await context.params;
    if (!(await deleteSubscriber(id))) {
      throw new ApiError("That subscriber no longer exists.", 404);
    }
    return jsonOk({ deleted: true });
  });
}
