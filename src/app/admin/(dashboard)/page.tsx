import Link from "next/link";
import {
  FaArrowRight,
  FaCircleCheck,
  FaEnvelopeOpenText,
  FaInbox,
  FaTriangleExclamation,
  FaUsers,
} from "react-icons/fa6";

import { Icon } from "@/components/site/icon";
import { sectionOrder, sectionSpecs } from "@/lib/content/fields";
import { getContentMeta } from "@/lib/content/store";
import { listMessages } from "@/lib/db/messages";
import { listCampaigns } from "@/lib/email/campaigns";
import { listSubscribers } from "@/lib/email/subscribers";
import { isMailConfigured } from "@/lib/env";
import { cn } from "@/lib/utils";

function formatDate(value: string) {
  if (!value) return "never";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminOverviewPage() {
  // Each of these is independently allowed to fail: a dashboard that will not
  // load because one collection is unhappy is worse than one missing a number.
  const [meta, messages, subscribers, campaigns] = await Promise.all([
    getContentMeta().catch(
      () => ({}) as Awaited<ReturnType<typeof getContentMeta>>,
    ),
    listMessages(50).catch(() => []),
    listSubscribers().catch(() => []),
    listCampaigns(5).catch(() => []),
  ]);

  const unread = messages.filter((message) => !message.read).length;
  const subscribed = subscribers.filter(
    (subscriber) => subscriber.status === "subscribed",
  ).length;
  const mailReady = isMailConfigured();

  return (
    <div>
      <h1 className="text-[1.6rem] font-bold tracking-[-0.02em] text-ink">
        Overview
      </h1>
      <p className="mt-1 mb-7 text-[0.9rem] text-slate-500">
        Everything on the public site is edited from here. Changes go live as
        soon as you save.
      </p>

      <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={<FaInbox />}
          value={String(messages.length)}
          label="Enquiries"
          note={unread > 0 ? `${unread} unread` : "all read"}
          href="/admin/messages"
        />
        <StatCard
          icon={<FaUsers />}
          value={String(subscribed)}
          label="Subscribers"
          note={`${subscribers.length} total`}
          href="/admin/subscribers"
        />
        <StatCard
          icon={<FaEnvelopeOpenText />}
          value={String(campaigns.length)}
          label="Recent campaigns"
          note={mailReady ? "SMTP ready" : "SMTP not set up"}
          href="/admin/email"
        />
        <StatCard
          icon={mailReady ? <FaCircleCheck /> : <FaTriangleExclamation />}
          value={mailReady ? "Ready" : "Setup"}
          label="Mail delivery"
          note={mailReady ? "campaigns can be sent" : "add SMTP_* variables"}
          href="/admin/settings"
          tone={mailReady ? "ok" : "warn"}
        />
      </div>

      <h2 className="mb-3 text-[1.05rem] font-bold tracking-[-0.01em] text-ink">
        Website content
      </h2>
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {sectionOrder.map((section) => {
          const spec = sectionSpecs[section];
          const updated = meta[section];

          return (
            <Link
              key={section}
              href={`/admin/content/${section}`}
              className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_14px_30px_-20px_rgb(15_23_42_/_0.4)]"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                <Icon name={spec.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-[0.92rem] font-semibold text-ink">
                  {spec.label}
                  <FaArrowRight className="size-2.5 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                </span>
                <span className="mt-0.5 block text-[0.78rem] leading-[1.6] text-slate-500">
                  {spec.description}
                </span>
                <span className="mt-1.5 block text-[0.72rem] text-slate-400">
                  {updated
                    ? `Edited ${formatDate(updated.updatedAt)}${updated.updatedBy ? ` by ${updated.updatedBy}` : ""}`
                    : "Using the shipped defaults"}
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      {messages.length > 0 ? (
        <>
          <h2 className="mb-3 text-[1.05rem] font-bold tracking-[-0.01em] text-ink">
            Latest enquiries
          </h2>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {messages.slice(0, 5).map((message) => (
              <Link
                key={message.id}
                href="/admin/messages"
                className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-slate-50"
              >
                {!message.read ? (
                  <span
                    aria-label="Unread"
                    className="size-2 shrink-0 rounded-full bg-brand"
                  />
                ) : (
                  <span className="size-2 shrink-0" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.88rem] font-semibold text-ink">
                    {message.firstName} {message.lastName}
                  </span>
                  <span className="block truncate text-[0.78rem] text-slate-500">
                    {message.message}
                  </span>
                </span>
                <span className="shrink-0 text-[0.72rem] text-slate-400">
                  {formatDate(message.createdAt)}
                </span>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  note,
  href,
  tone = "default",
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  note: string;
  href: string;
  tone?: "default" | "ok" | "warn";
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_14px_30px_-20px_rgb(15_23_42_/_0.4)]"
    >
      <span
        className={cn(
          "mb-2 grid size-8 place-items-center rounded-lg text-[0.85rem]",
          tone === "warn"
            ? "bg-amber-100 text-amber-600"
            : tone === "ok"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-brand/10 text-brand",
        )}
      >
        {icon}
      </span>
      <p className="font-heading text-[1.5rem] leading-none font-extrabold text-ink">
        {value}
      </p>
      <p className="mt-1 text-[0.82rem] font-medium text-slate-600">{label}</p>
      <p className="text-[0.72rem] text-slate-400">{note}</p>
    </Link>
  );
}
