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
  requireOwner,
} from "@/lib/api";
import {
  createAdmin,
  findAdminByEmail,
  listAdmins,
  toPublicAdmin,
} from "@/lib/auth/admins";
import { passwordSchema } from "@/lib/auth/password";

const createSchema = z.object({
  name: z.string().trim().min(2, "Enter a name").max(120),
  email: z.email("Enter a valid email address").max(200),
  password: passwordSchema,
  role: z.enum(["owner", "editor"]),
});

export async function GET() {
  return handle(async () => {
    await requireAdmin();
    return jsonOk({ admins: await listAdmins() });
  });
}

export async function POST(request: Request) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    requireOwner(await requireAdmin());

    const parsed = createSchema.safeParse(await readJson(request));
    if (!parsed.success) return jsonValidationError(parsed.error);

    if (await findAdminByEmail(parsed.data.email)) {
      return jsonError("An account with that email already exists.", 409, {
        fields: { email: "That email is already in use" },
      });
    }

    const admin = await createAdmin(parsed.data);
    return jsonOk({ admin: toPublicAdmin(admin) }, { status: 201 });
  });
}
