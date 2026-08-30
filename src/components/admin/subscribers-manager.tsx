"use client";

import * as React from "react";
import { toast } from "sonner";
import { FaBan, FaCheck, FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";

import { FieldShell, inputClass } from "@/components/admin/field-inputs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/admin/client";
import type { PublicSubscriber } from "@/lib/email/subscribers";
import { cn } from "@/lib/utils";

/**
 * Accepts the shapes people actually paste: one address per line, optionally
 * `Name <address>` or `name, address`, and tolerates commas or semicolons
 * between entries on one line.
 */
function parseRecipients(raw: string): { email: string; name: string }[] {
  return raw
    .split(/[\n;,]+/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const angle = entry.match(/^(.*?)<([^>]+)>$/);
      if (angle) {
        return {
          name: angle[1]!.trim().replace(/^["']|["']$/g, ""),
          email: angle[2]!.trim(),
        };
      }
      return { name: "", email: entry };
    })
    .filter((entry) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email));
}

export function SubscribersManager({
  initial,
}: {
  initial: PublicSubscriber[];
}) {
  const [subscribers, setSubscribers] = React.useState(initial);
  const [raw, setRaw] = React.useState("");
  const [pending, setPending] = React.useState(false);

  const parsed = React.useMemo(() => parseRecipients(raw), [raw]);
  const subscribed = subscribers.filter(
    (subscriber) => subscriber.status === "subscribed",
  ).length;

  async function add() {
    if (parsed.length === 0) {
      toast.error("No valid email address found in what you pasted.");
      return;
    }

    setPending(true);
    const result = await apiFetch<{
      added: number;
      skipped: number;
      subscribers: PublicSubscriber[];
    }>("/api/admin/subscribers", {
      method: "POST",
      json: {
        subscribers: parsed.map((entry) => ({
          email: entry.email,
          name: entry.name,
          tags: ["imported"],
          source: "import",
        })),
      },
    });
    setPending(false);

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    setSubscribers(result.data.subscribers);
    setRaw("");
    toast.success(
      `Added ${result.data.added}${result.data.skipped ? `, skipped ${result.data.skipped} already on the list` : ""}.`,
    );
  }

  async function setStatus(
    id: string,
    status: "subscribed" | "unsubscribed",
  ) {
    const previous = subscribers;
    setSubscribers((current) =>
      current.map((subscriber) =>
        subscriber.id === id ? { ...subscriber, status } : subscriber,
      ),
    );

    const result = await apiFetch(`/api/admin/subscribers/${id}`, {
      method: "PATCH",
      json: { status },
    });

    if (!result.ok) {
      setSubscribers(previous);
      toast.error(result.error);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Remove this address from the list?")) return;

    const previous = subscribers;
    setSubscribers((current) =>
      current.filter((subscriber) => subscriber.id !== id),
    );

    const result = await apiFetch(`/api/admin/subscribers/${id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      setSubscribers(previous);
      toast.error(result.error);
    }
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-1 text-[0.95rem] font-bold text-ink">Add addresses</h2>
        <p className="mb-4 text-[0.8rem] leading-[1.6] text-slate-500">
          One per line. <code className="text-brand">Name &lt;a@b.com&gt;</code>{" "}
          works too. Addresses already on the list are skipped.
        </p>

        <FieldShell label="Paste addresses">
          <Textarea
            value={raw}
            rows={4}
            onChange={(event) => setRaw(event.target.value)}
            placeholder={"Alex Doe <alex@example.com>\nsam@example.com"}
            className={cn(inputClass, "resize-y leading-[1.7]")}
          />
        </FieldShell>

        <div className="mt-3 flex items-center gap-3">
          <Button
            type="button"
            variant="brand"
            size="sm"
            onClick={add}
            disabled={pending || parsed.length === 0}
          >
            {pending ? <FaSpinner className="animate-spin" /> : <FaPlus />}
            Add {parsed.length > 0 ? parsed.length : ""} address
            {parsed.length === 1 ? "" : "es"}
          </Button>
          {raw.trim() && parsed.length === 0 ? (
            <span className="text-[0.8rem] text-destructive">
              No valid address found.
            </span>
          ) : null}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white">
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5">
          <h2 className="text-[0.95rem] font-bold text-ink">The list</h2>
          <p className="text-[0.78rem] text-slate-500">
            {subscribed} subscribed · {subscribers.length} total
          </p>
        </header>

        {subscribers.length === 0 ? (
          <p className="px-5 py-10 text-center text-[0.9rem] text-slate-500">
            Nobody on the list yet.
          </p>
        ) : (
          <ul>
            {subscribers.map((subscriber) => (
              <li
                key={subscriber.id}
                className="flex items-center gap-3 border-b border-slate-100 px-5 py-3 last:border-b-0"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.88rem] font-medium text-ink">
                    {subscriber.name || subscriber.email}
                  </span>
                  <span className="block truncate text-[0.76rem] text-slate-500">
                    {subscriber.name ? `${subscriber.email} · ` : ""}
                    {subscriber.source}
                  </span>
                </span>

                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[0.68rem] font-semibold",
                    subscriber.status === "subscribed"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  {subscriber.status}
                </span>

                <div className="flex shrink-0 items-center gap-0.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={
                      subscriber.status === "subscribed"
                        ? "Unsubscribe"
                        : "Resubscribe"
                    }
                    title={
                      subscriber.status === "subscribed"
                        ? "Unsubscribe"
                        : "Resubscribe"
                    }
                    onClick={() =>
                      setStatus(
                        subscriber.id,
                        subscriber.status === "subscribed"
                          ? "unsubscribed"
                          : "subscribed",
                      )
                    }
                    className="text-slate-400 hover:text-brand"
                  >
                    {subscriber.status === "subscribed" ? <FaBan /> : <FaCheck />}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Delete"
                    onClick={() => remove(subscriber.id)}
                    className="text-slate-400 hover:text-destructive"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
