import { z } from "zod";

import {
  ApiError,
  handle,
  isSameOrigin,
  jsonError,
  jsonOk,
  jsonValidationError,
  readJson,
} from "@/lib/api";
import {
  findAdminByEmail,
  recordLogin,
  toPublicAdmin,
  toSessionPayload,
} from "@/lib/auth/admins";
import { fakeVerify, verifyPassword } from "@/lib/auth/password";
import { clientIp, rateLimit, resetRateLimit } from "@/lib/auth/rate-limit";
import { createSession } from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/lib/env";

const loginSchema = z.object({
  email: z.email("Enter a valid email address").max(200),
  password: z.string().min(1, "Enter your password").max(200),
});

/** Five attempts per address per fifteen minutes, and per IP across accounts. */
const ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    if (!isDatabaseConfigured()) {
      throw new ApiError(
        "The database is not configured. Set MONGODB_URI in .env.local.",
        503,
      );
    }

    const parsed = loginSchema.safeParse(await readJson(request));
    if (!parsed.success) return jsonValidationError(parsed.error);

    const email = parsed.data.email.trim().toLowerCase();
    const ip = clientIp(request.headers);

    for (const key of [`login:ip:${ip}`, `login:email:${email}`]) {
      const limit = rateLimit(key, ATTEMPTS, WINDOW_MS);
      if (!limit.ok) {
        return jsonError(
          `Too many attempts. Try again in ${Math.ceil(limit.retryAfter / 60)} minute(s).`,
          429,
        );
      }
    }

    const admin = await findAdminByEmail(email);
    if (!admin) {
      // Same work, same wording: nothing here says whether the account exists.
      await fakeVerify();
      return jsonError("Email or password is incorrect.", 401);
    }

    const valid = await verifyPassword(parsed.data.password, admin.passwordHash);
    if (!valid) {
      return jsonError("Email or password is incorrect.", 401);
    }

    resetRateLimit(`login:email:${email}`);
    resetRateLimit(`login:ip:${ip}`);

    await createSession(toSessionPayload(admin));
    await recordLogin(admin._id);

    return jsonOk({ admin: toPublicAdmin(admin) });
  });
}
