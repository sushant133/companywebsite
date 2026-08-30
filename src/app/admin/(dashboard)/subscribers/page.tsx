import { SubscribersManager } from "@/components/admin/subscribers-manager";
import { listSubscribers } from "@/lib/email/subscribers";

export default async function AdminSubscribersPage() {
  const subscribers = await listSubscribers().catch(() => []);

  return (
    <div>
      <h1 className="text-[1.6rem] font-bold tracking-[-0.02em] text-ink">
        Subscribers
      </h1>
      <p className="mt-1 mb-7 text-[0.9rem] text-slate-500">
        The people a campaign can go to. Anyone who uses the contact form is
        added here automatically; you can also paste a list in.
      </p>

      <SubscribersManager initial={subscribers} />
    </div>
  );
}
