import {
  ApiError,
  handle,
  isSameOrigin,
  jsonOk,
  requireAdmin,
  requireOwner,
} from "@/lib/api";
import { countAdmins, deleteAdmin } from "@/lib/auth/admins";

type Context = { params: Promise<{ id: string }> };

export async function DELETE(request: Request, context: Context) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    const admin = requireOwner(await requireAdmin());
    const { id } = await context.params;

    if (id === admin._id.toString()) {
      throw new ApiError("You cannot delete the account you are signed in to.", 400);
    }
    // Losing the last account would lock everyone out of the dashboard.
    if ((await countAdmins()) <= 1) {
      throw new ApiError("At least one admin account has to remain.", 400);
    }

    if (!(await deleteAdmin(id))) {
      throw new ApiError("That account no longer exists.", 404);
    }
    return jsonOk({ deleted: true });
  });
}
