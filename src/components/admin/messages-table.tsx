"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaMagnifyingGlass,
  FaPhone,
  FaTrash,
} from "react-icons/fa6";

import { inputClass } from "@/components/admin/field-inputs";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/admin/client";
import type { PublicMessage } from "@/lib/db/messages";
import { cn } from "@/lib/utils";

export function MessagesTable({ initial }: { initial: PublicMessage[] }) {
  const [messages, setMessages] = React.useState(initial);
  const [query, setQuery] = React.useState("");
  const [openId, setOpenId] = React.useState<string | null>(null);

  const needle = query.trim().toLowerCase();
  const visible = needle
    ? messages.filter((message) =>
        [
          message.firstName,
          message.lastName,
          message.email,
          message.service,
          message.message,
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
    : messages;

  async function setRead(id: string, read: boolean) {
    // Flipped locally first: the row should respond immediately, and a failure
    // puts it back.
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, read } : message,
      ),
    );

    const result = await apiFetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      json: { read },
    });

    if (!result.ok) {
      setMessages((current) =>
        current.map((message) =>
          message.id === id ? { ...message, read: !read } : message,
        ),
      );
      toast.error(result.error);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this enquiry? This cannot be undone.")) return;

    const previous = messages;
    setMessages((current) => current.filter((message) => message.id !== id));

    const result = await apiFetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      setMessages(previous);
      toast.error(result.error);
      return;
    }
    toast.success("Enquiry deleted.");
  }

  if (messages.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-[0.9rem] text-slate-500">
        No enquiries yet. Anything sent through the contact form will appear
        here.
      </p>
    );
  }

  return (
    <div>
      <div className="relative mb-4 max-w-[360px]">
        <FaMagnifyingGlass
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-3 -translate-y-1/2 text-slate-400"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search enquiries"
          aria-label="Search enquiries"
          className={cn(inputClass, "pl-8")}
        />
      </div>

      <div className="space-y-2">
        {visible.map((message) => {
          const open = openId === message.id;
          return (
            <article
              key={message.id}
              className={cn(
                "overflow-hidden rounded-xl border bg-white transition-colors",
                message.read ? "border-slate-200" : "border-brand/40",
              )}
            >
              <button
                type="button"
                onClick={() => {
                  setOpenId(open ? null : message.id);
                  if (!message.read) void setRead(message.id, true);
                }}
                aria-expanded={open}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left hover:bg-slate-50"
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    message.read ? "bg-slate-200" : "bg-brand",
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9rem] font-semibold text-ink">
                    {message.firstName} {message.lastName}
                    {message.service ? (
                      <span className="ml-2 rounded-full bg-brand/10 px-2 py-0.5 text-[0.68rem] font-semibold text-brand">
                        {message.service}
                      </span>
                    ) : null}
                  </span>
                  <span className="block truncate text-[0.78rem] text-slate-500">
                    {message.email} · {message.message}
                  </span>
                </span>
                <span className="shrink-0 text-[0.72rem] text-slate-400">
                  {new Date(message.createdAt).toLocaleDateString(undefined, {
                    dateStyle: "medium",
                  })}
                </span>
              </button>

              {open ? (
                <div className="border-t border-slate-100 px-4 py-4">
                  <p className="mb-4 text-[0.9rem] leading-[1.8] whitespace-pre-wrap text-slate-600">
                    {message.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={`mailto:${message.email}`}>
                        <FaEnvelope /> Reply
                      </a>
                    </Button>
                    {message.phone ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={`tel:${message.phone.replace(/\s/g, "")}`}>
                          <FaPhone /> {message.phone}
                        </a>
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setRead(message.id, !message.read)}
                    >
                      <FaEnvelopeOpen />
                      Mark {message.read ? "unread" : "read"}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => remove(message.id)}
                      className="ml-auto"
                    >
                      <FaTrash /> Delete
                    </Button>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}

        {visible.length === 0 ? (
          <p className="py-6 text-center text-[0.9rem] text-slate-500">
            No enquiry matches &ldquo;{query.trim()}&rdquo;.
          </p>
        ) : null}
      </div>
    </div>
  );
}
