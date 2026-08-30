import { z } from "zod";

import {
  ApiError,
  handle,
  isSameOrigin,
  jsonOk,
  jsonValidationError,
  readJson,
} from "@/lib/api";
import { countAdmins, createAdmin, toPublicAdmin, toSessionPayload } from "@/lib/auth/admins";
import { passwordSchema } from "@/lib/auth/password";
import { clientIp, rateLimit } from "@/lib/auth/rate-limit";
import { createSession } from "@/lib/auth/session";
import { env, isDatabaseConfigured } from "@/lib/env";

const setupSchema = z
  .object({
    name: z.string().trim().min(2, "Enter a name").max(120),
    email: z.email("Enter a valid email address").max(200),
    password: passwordSchema,
    confirmPassword: z.string(),
    setupToken: z.string().trim().max(200).default(""),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "The two passwords do not match",
    path: ["confirmPassword"],
  });

/** Whether the first-run form should be offered at all. */
export async function GET() {
  return handle(async () => {
    if (!isDatabaseConfigured()) {
      return jsonOk({ needsSetup: false, databaseConfigured: false });
    }
    return jsonOk({
      needsSetup: (await countAdmins()) === 0,
      databaseConfigured: true,
      tokenRequired: env.setupToken.length > 0,
    });
  });
}

/**
 * Creates the first owner account. It only works while no admin exists, so the
 * window closes the moment the first account is made — there is no way to use
 * this route to add a second one.
 */
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

    const limit = rateLimit(`setup:${clientIp(request.headers)}`, 5, 60 * 60 * 1000);
    if (!limit.ok) throw new ApiError("Too many attempts. Try again later.", 429);

    if ((await countAdmins()) > 0) {
      throw new ApiError(
        "An admin account already exists. Sign in instead.",
        409,
      );
    }

    const parsed = setupSchema.safeParse(await readJson(request));
    if (!parsed.success) return jsonValidationError(parsed.error);

    if (env.setupToken && parsed.data.setupToken !== env.setupToken) {
      throw new ApiError("That setup token is not correct.", 403);
    }

    const admin = await createAdmin({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
      role: "owner",
    });

    await createSession(toSessionPayload(admin));
    return jsonOk({ admin: toPublicAdmin(admin) });
  });
}
