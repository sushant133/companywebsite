import { z } from "zod";

import {
  ApiError,
  handle,
  isSameOrigin,
  jsonError,
  jsonOk,
  jsonValidationError,
  readJson,
  requireAdmin,
} from "@/lib/api";
import { setAdminPassword, toSessionPayload } from "@/lib/auth/admins";
import { passwordSchema, verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

const changeSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password").max(200),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "The two passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((value) => value.newPassword !== value.currentPassword, {
    message: "Choose a password you have not used here before",
    path: ["newPassword"],
  });

export async function POST(request: Request) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    const admin = await requireAdmin();

    const parsed = changeSchema.safeParse(await readJson(request));
    if (!parsed.success) return jsonValidationError(parsed.error);

    const valid = await verifyPassword(
      parsed.data.currentPassword,
      admin.passwordHash,
    );
    if (!valid) {
      return jsonError("Your current password is not correct.", 400, {
        fields: { currentPassword: "That is not your current password" },
      });
    }

    await setAdminPassword(admin._id, parsed.data.newPassword);

    // The change bumps tokenVersion, which invalidates every session including
    // this one, so issue a fresh cookie rather than logging the admin out.
    await createSession(
      toSessionPayload({ ...admin, tokenVersion: admin.tokenVersion + 1 }),
    );

    return jsonOk({ changed: true });
  });
}
