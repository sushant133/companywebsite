import { MessagesTable } from "@/components/admin/messages-table";
import { listMessages } from "@/lib/db/messages";

export default async function AdminMessagesPage() {
  const messages = await listMessages().catch(() => []);

  return (
    <div>
      <h1 className="text-[1.6rem] font-bold tracking-[-0.02em] text-ink">
        Enquiries
      </h1>
      <p className="mt-1 mb-7 text-[0.9rem] text-slate-500">
        Everything sent through the contact form. Each sender is also added to
        the subscriber list, so you can email them from Bulk email.
      </p>

      <MessagesTable initial={messages} />
    </div>
  );
}
