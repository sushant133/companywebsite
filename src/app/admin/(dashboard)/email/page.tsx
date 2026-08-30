import { CampaignComposer } from "@/components/admin/campaign-composer";
import { listCampaigns, MAX_RECIPIENTS } from "@/lib/email/campaigns";
import { listSubscribers } from "@/lib/email/subscribers";
import { env, isMailConfigured } from "@/lib/env";

export default async function AdminEmailPage() {
  const [subscribers, campaigns] = await Promise.all([
    listSubscribers().catch(() => []),
    listCampaigns(10).catch(() => []),
  ]);

  return (
    <div>
      <h1 className="text-[1.6rem] font-bold tracking-[-0.02em] text-ink">
        Bulk email
      </h1>
      <p className="mt-1 mb-7 text-[0.9rem] text-slate-500">
        Write one message and send it to up to {MAX_RECIPIENTS} people. Everyone
        gets their own copy on the MantraSphere template — no one sees anyone
        else&apos;s address.
      </p>

      <CampaignComposer
        subscribers={subscribers.filter((s) => s.status === "subscribed")}
        campaigns={campaigns}
        maxRecipients={MAX_RECIPIENTS}
        mailReady={isMailConfigured()}
        fromAddress={env.smtp.from || env.smtp.user}
      />
    </div>
  );
}
