import { ApiError, handle, isSameOrigin, jsonOk } from "@/lib/api";
import { destroySession } from "@/lib/auth/session";

export async function POST(request: Request) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    // Unconditional: signing out has to work even from a stale session.
    await destroySession();
    return jsonOk({ signedOut: true });
  });
}
