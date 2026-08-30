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
import {
  addSubscribers,
  listSubscribers,
  subscriberInputSchema,
} from "@/lib/email/subscribers";

const postSchema = z.object({
  subscribers: z.array(subscriberInputSchema).min(1).max(500),
});

export async function GET() {
  return handle(async () => {
    await requireAdmin();
    return jsonOk({ subscribers: await listSubscribers() });
  });
}

export async function POST(request: Request) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    await requireAdmin();

    const parsed = postSchema.safeParse(await readJson(request));
    if (!parsed.success) return jsonValidationError(parsed.error);

    const result = await addSubscribers(parsed.data.subscribers);
    return jsonOk({ ...result, subscribers: await listSubscribers() });
  });
}
