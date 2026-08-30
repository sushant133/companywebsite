import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/shell";
import { resolveSessionAdmin, toPublicAdmin } from "@/lib/auth/admins";
import { getSession } from "@/lib/auth/session";
import { countUnreadMessages } from "@/lib/db/messages";
import { isDatabaseConfigured } from "@/lib/env";

/**
 * The gate the dashboard pages sit behind. Proxy has already checked that the
 * cookie is a valid token; this is the check that the account it names still
 * exists and has not had its password changed since.
 */
export default async function DashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  if (!isDatabaseConfigured()) redirect("/admin/login");

  const admin = await resolveSessionAdmin(await getSession());
  if (!admin) redirect("/admin/login");

  const unread = await countUnreadMessages().catch(() => 0);
  const publicAdmin = toPublicAdmin(admin);

  return (
    <AdminShell
      admin={{
        name: publicAdmin.name,
        email: publicAdmin.email,
        role: publicAdmin.role,
      }}
      unreadCount={unread}
    >
      {children}
    </AdminShell>
  );
}
