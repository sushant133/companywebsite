import { SettingsPanels } from "@/components/admin/settings-panels";
import { listAdmins, resolveSessionAdmin, toPublicAdmin } from "@/lib/auth/admins";
import { getSession } from "@/lib/auth/session";
import { env, isMailConfigured } from "@/lib/env";

export default async function AdminSettingsPage() {
  const admin = await resolveSessionAdmin(await getSession());
  const admins = await listAdmins().catch(() => []);

  return (
    <div>
      <h1 className="text-[1.6rem] font-bold tracking-[-0.02em] text-ink">
        Settings
      </h1>
      <p className="mt-1 mb-7 text-[0.9rem] text-slate-500">
        Your password, the other admin accounts, and how mail is delivered.
      </p>

      <SettingsPanels
        current={admin ? toPublicAdmin(admin) : null}
        initialAdmins={admins}
        mail={{
          ready: isMailConfigured(),
          host: env.smtp.host,
          port: env.smtp.port,
          user: env.smtp.user,
          from: env.smtp.from || env.smtp.user,
        }}
      />
    </div>
  );
}
