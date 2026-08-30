"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  FaEye,
  FaPaperPlane,
  FaSpinner,
  FaTriangleExclamation,
  FaUserCheck,
} from "react-icons/fa6";

import {
  FieldShell,
  StringListInput,
  TextInput,
  inputClass,
} from "@/components/admin/field-inputs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/admin/client";
import type { CampaignSummary } from "@/lib/email/campaigns";
import type { PublicSubscriber } from "@/lib/email/subscribers";
import { cn } from "@/lib/utils";

type Recipient = { email: string; name: string };

/** Same forgiving parse the subscriber importer uses. */
function parseRecipients(raw: string): Recipient[] {
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

const blankContent = {
  subject: "",
  preheader: "",
  heading: "",
  body: "",
  bullets: [] as string[],
  ctaLabel: "Talk to us",
  ctaUrl: "/contact",
  imageUrl: "",
  footerNote: "",
};

export function CampaignComposer({
  subscribers,
  campaigns,
  maxRecipients,
  mailReady,
  fromAddress,
}: {
  subscribers: PublicSubscriber[];
  campaigns: CampaignSummary[];
  maxRecipients: number;
  mailReady: boolean;
  fromAddress: string;
}) {
  const [content, setContent] = React.useState(blankContent);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [extra, setExtra] = React.useState("");
  const [testAddress, setTestAddress] = React.useState("");
  const [fields, setFields] = React.useState<Record<string, string>>({});
  const [sending, setSending] = React.useState<"none" | "test" | "all">("none");
  const [preview, setPreview] = React.useState("");
  const [previewing, setPreviewing] = React.useState(false);
  const [history, setHistory] = React.useState(campaigns);

  const set =
    <K extends keyof typeof content>(key: K) =>
    (value: (typeof content)[K]) => {
      setContent((current) => ({ ...current, [key]: value }));
      setFields((current) => {
        if (!(key in current)) return current;
        const { [key]: _removed, ...rest } = current;
        return rest;
      });
    };

  // The two sources are merged and de-duplicated so a hand-typed address that
  // is also a subscriber does not produce two emails.
  const recipients = React.useMemo(() => {
    const merged = new Map<string, Recipient>();
    for (const subscriber of subscribers) {
      if (!selected.has(subscriber.id)) continue;
      merged.set(subscriber.email.toLowerCase(), {
        email: subscriber.email,
        name: subscriber.name,
      });
    }
    for (const entry of parseRecipients(extra)) {
      const key = entry.email.toLowerCase();
      if (!merged.has(key)) merged.set(key, entry);
    }
    return [...merged.values()];
  }, [subscribers, selected, extra]);

  const overLimit = recipients.length > maxRecipients;

  function toggleAll() {
    // "Select all" stops at the recipient cap, so the comparison has to be
    // against how many it would select — otherwise a list longer than the cap
    // never counts as fully selected and the button can never clear it.
    const selectable = subscribers.slice(0, maxRecipients);
    setSelected((current) =>
      current.size >= selectable.length
        ? new Set()
        : new Set(selectable.map((s) => s.id)),
    );
  }

  async function showPreview() {
    setPreviewing(true);
    const response = await fetch("/api/admin/email/preview", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(content),
    });
    setPreviewing(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setFields(payload?.fields ?? {});
      toast.error(payload?.error ?? "Could not build the preview.");
      return;
    }

    setPreview(await response.text());
  }

  async function send(testOnly: boolean) {
    const list = testOnly
      ? parseRecipients(testAddress).slice(0, 1)
      : recipients;

    if (list.length === 0) {
      toast.error(
        testOnly
          ? "Enter an address to send the test to."
          : "Choose at least one recipient.",
      );
      return;
    }

    if (
      !testOnly &&
      !window.confirm(
        `Send "${content.subject || "this campaign"}" to ${list.length} recipient${list.length === 1 ? "" : "s"}? This cannot be undone.`,
      )
    ) {
      return;
    }

    setSending(testOnly ? "test" : "all");
    setFields({});

    const result = await apiFetch<{
      campaignId: string;
      sent: number;
      failed: number;
      results: { email: string; ok: boolean; error?: string }[];
    }>("/api/admin/email/send", {
      method: "POST",
      json: { content, recipients: list, testOnly },
    });

    setSending("none");

    if (!result.ok) {
      setFields(result.fields ?? {});
      toast.error(result.error);
      return;
    }

    const { sent, failed } = result.data;
    if (failed > 0) {
      toast.warning(`Sent ${sent}, ${failed} failed. See the log below.`);
    } else {
      toast.success(
        testOnly ? "Test sent." : `Sent to ${sent} recipient${sent === 1 ? "" : "s"}.`,
      );
    }

    setHistory((current) => [
      {
        id: result.data.campaignId,
        subject: content.subject,
        recipientCount: list.length,
        sent,
        failed,
        testOnly,
        sentBy: "you",
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
  }

  return (
    <div className="space-y-5 pb-6">
      {!mailReady ? (
        <p className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[0.85rem] leading-[1.7] text-amber-800">
          <FaTriangleExclamation className="mt-0.5 shrink-0" />
          <span>
            SMTP is not configured, so nothing can be sent yet. Add{" "}
            <code>SMTP_HOST</code>, <code>SMTP_PORT</code>,{" "}
            <code>SMTP_USER</code>, <code>SMTP_PASSWORD</code> and{" "}
            <code>SMTP_FROM</code> to <code>.env.local</code> and restart.
          </span>
        </p>
      ) : (
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[0.82rem] text-slate-500">
          Sending as <span className="font-semibold text-ink">{fromAddress}</span>
        </p>
      )}

      {/* ---- Message ---- */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-1 text-[0.95rem] font-bold text-ink">The message</h2>
        <p className="mb-4 text-[0.8rem] leading-[1.6] text-slate-500">
          <code className="text-brand">{"{{name}}"}</code> and{" "}
          <code className="text-brand">{"{{email}}"}</code> are replaced per
          recipient.
        </p>

        <div className="space-y-4">
          <FieldShell label="Subject" error={fields.subject} htmlFor="c-subject">
            <TextInput
              id="c-subject"
              value={content.subject}
              onChange={set("subject")}
              invalid={Boolean(fields.subject)}
              placeholder="Build your next product with MantraSphere"
            />
          </FieldShell>

          <FieldShell
            label="Preview line"
            help="The grey text most inboxes show after the subject."
            error={fields.preheader}
            htmlFor="c-preheader"
          >
            <TextInput
              id="c-preheader"
              value={content.preheader}
              onChange={set("preheader")}
              invalid={Boolean(fields.preheader)}
            />
          </FieldShell>

          <FieldShell label="Heading" error={fields.heading} htmlFor="c-heading">
            <TextInput
              id="c-heading"
              value={content.heading}
              onChange={set("heading")}
              invalid={Boolean(fields.heading)}
            />
          </FieldShell>

          <FieldShell
            label="Body"
            help="Leave a blank line between paragraphs."
            error={fields.body}
            htmlFor="c-body"
          >
            <Textarea
              id="c-body"
              value={content.body}
              rows={8}
              aria-invalid={Boolean(fields.body)}
              onChange={(event) => set("body")(event.target.value)}
              className={cn(inputClass, "resize-y leading-[1.8]")}
            />
          </FieldShell>

          <FieldShell label="Bullet points" error={fields.bullets}>
            <StringListInput
              values={content.bullets}
              onChange={set("bullets")}
              addLabel="Add bullet"
            />
          </FieldShell>

          <div className="grid gap-4 sm:grid-cols-2">
            <FieldShell label="Button label" error={fields.ctaLabel} htmlFor="c-cta">
              <TextInput
                id="c-cta"
                value={content.ctaLabel}
                onChange={set("ctaLabel")}
                invalid={Boolean(fields.ctaLabel)}
              />
            </FieldShell>
            <FieldShell
              label="Button link"
              help="A site path such as /contact, or a full URL."
              error={fields.ctaUrl}
              htmlFor="c-ctaurl"
            >
              <TextInput
                id="c-ctaurl"
                value={content.ctaUrl}
                onChange={set("ctaUrl")}
                invalid={Boolean(fields.ctaUrl)}
              />
            </FieldShell>
          </div>

          <FieldShell
            label="Banner image"
            help="A path under /public or a full URL. Leave empty for no image."
            error={fields.imageUrl}
            htmlFor="c-image"
          >
            <TextInput
              id="c-image"
              value={content.imageUrl}
              onChange={set("imageUrl")}
              invalid={Boolean(fields.imageUrl)}
            />
          </FieldShell>

          <FieldShell
            label="Sign-off"
            error={fields.footerNote}
            htmlFor="c-footer"
          >
            <Textarea
              id="c-footer"
              value={content.footerNote}
              rows={3}
              onChange={(event) => set("footerNote")(event.target.value)}
              className={cn(inputClass, "resize-y leading-[1.7]")}
            />
          </FieldShell>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={showPreview}
          disabled={previewing}
        >
          {previewing ? <FaSpinner className="animate-spin" /> : <FaEye />}
          Preview
        </Button>

        {preview ? (
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <div className="flex items-center justify-between bg-slate-50 px-4 py-2">
              <span className="text-[0.78rem] font-semibold text-slate-500">
                Preview — as Alex would see it
              </span>
              <button
                type="button"
                onClick={() => setPreview("")}
                className="cursor-pointer text-[0.78rem] text-slate-400 hover:text-brand"
              >
                Close
              </button>
            </div>
            <iframe
              title="Email preview"
              srcDoc={preview}
              // Sandboxed without allow-scripts: the preview is display only.
              sandbox=""
              className="h-[560px] w-full border-0 bg-white"
            />
          </div>
        ) : null}
      </section>

      {/* ---- Recipients ---- */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h2 className="text-[0.95rem] font-bold text-ink">Recipients</h2>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[0.72rem] font-semibold",
              overLimit
                ? "bg-destructive/10 text-destructive"
                : "bg-slate-100 text-slate-500",
            )}
          >
            {recipients.length} / {maxRecipients}
          </span>
        </div>
        <p className="mb-4 text-[0.8rem] leading-[1.6] text-slate-500">
          Each person gets their own copy — addresses are never shared between
          recipients.
        </p>

        {subscribers.length > 0 ? (
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[0.8rem] font-semibold text-slate-600">
                Subscribers
              </span>
              <button
                type="button"
                onClick={toggleAll}
                className="cursor-pointer text-[0.78rem] font-semibold text-brand hover:underline"
              >
                {selected.size === subscribers.length
                  ? "Clear all"
                  : `Select all (${Math.min(subscribers.length, maxRecipients)})`}
              </button>
            </div>
            <div className="max-h-[240px] overflow-y-auto rounded-xl border border-slate-200">
              {subscribers.map((subscriber) => (
                <label
                  key={subscriber.id}
                  className="flex cursor-pointer items-center gap-3 border-b border-slate-100 px-3 py-2 last:border-b-0 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={selected.has(subscriber.id)}
                    onChange={(event) =>
                      setSelected((current) => {
                        const next = new Set(current);
                        if (event.target.checked) next.add(subscriber.id);
                        else next.delete(subscriber.id);
                        return next;
                      })
                    }
                    className="size-4 shrink-0 accent-[#6366f1]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.84rem] text-ink">
                      {subscriber.name || subscriber.email}
                    </span>
                    {subscriber.name ? (
                      <span className="block truncate text-[0.74rem] text-slate-400">
                        {subscriber.email}
                      </span>
                    ) : null}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ) : (
          <p className="mb-4 rounded-xl border border-dashed border-slate-300 px-4 py-4 text-[0.85rem] text-slate-500">
            No subscribers yet. Add some on the Subscribers page, or paste
            addresses below.
          </p>
        )}

        <FieldShell
          label="Extra addresses"
          help="One per line. Name <a@b.com> works too."
        >
          <Textarea
            value={extra}
            rows={3}
            onChange={(event) => setExtra(event.target.value)}
            className={cn(inputClass, "resize-y leading-[1.7]")}
          />
        </FieldShell>

        {overLimit ? (
          <p className="mt-3 text-[0.82rem] text-destructive">
            That is {recipients.length - maxRecipients} over the {maxRecipients}
            -recipient limit. Remove some before sending.
          </p>
        ) : null}
      </section>

      {/* ---- Send ---- */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 text-[0.95rem] font-bold text-ink">Send</h2>

        <div className="mb-4 flex flex-wrap items-end gap-3">
          <FieldShell label="Send a test to" className="min-w-[240px] flex-1">
            <TextInput
              value={testAddress}
              onChange={setTestAddress}
              placeholder="you@example.com"
            />
          </FieldShell>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => send(true)}
            disabled={!mailReady || sending !== "none"}
          >
            {sending === "test" ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaUserCheck />
            )}
            Send test
          </Button>
        </div>

        <Button
          type="button"
          variant="brand"
          size="pill"
          onClick={() => send(false)}
          disabled={
            !mailReady ||
            sending !== "none" ||
            recipients.length === 0 ||
            overLimit
          }
        >
          {sending === "all" ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaPaperPlane />
          )}
          Send to {recipients.length} recipient
          {recipients.length === 1 ? "" : "s"}
        </Button>
      </section>

      {/* ---- History ---- */}
      {history.length > 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white">
          <header className="border-b border-slate-200 px-5 py-3.5">
            <h2 className="text-[0.95rem] font-bold text-ink">Recent sends</h2>
          </header>
          <ul>
            {history.map((campaign) => (
              <li
                key={campaign.id}
                className="flex items-center gap-3 border-b border-slate-100 px-5 py-3 last:border-b-0"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.86rem] font-medium text-ink">
                    {campaign.subject || "(no subject)"}
                    {campaign.testOnly ? (
                      <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[0.66rem] font-semibold text-slate-500">
                        test
                      </span>
                    ) : null}
                  </span>
                  <span className="block text-[0.74rem] text-slate-400">
                    {new Date(campaign.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}{" "}
                    · {campaign.sentBy}
                  </span>
                </span>
                <span className="shrink-0 text-[0.78rem] text-slate-500">
                  <span className="font-semibold text-emerald-600">
                    {campaign.sent}
                  </span>{" "}
                  sent
                  {campaign.failed > 0 ? (
                    <>
                      {" · "}
                      <span className="font-semibold text-destructive">
                        {campaign.failed}
                      </span>{" "}
                      failed
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
