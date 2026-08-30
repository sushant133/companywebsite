import { handle, jsonOk } from "@/lib/api";
import { resolveSessionAdmin, toPublicAdmin } from "@/lib/auth/admins";
import { getSession } from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/lib/env";

/** Who is signed in, for the dashboard shell. Never 401s; it reports instead. */
export async function GET() {
  return handle(async () => {
    if (!isDatabaseConfigured()) return jsonOk({ admin: null });
    const admin = await resolveSessionAdmin(await getSession());
    return jsonOk({ admin: admin ? toPublicAdmin(admin) : null });
  });
}
