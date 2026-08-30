"use client";

import * as React from "react";
import { toast } from "sonner";
import { FaKey, FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";

import {
  FieldShell,
  SelectInput,
  TextInput,
  inputClass,
} from "@/components/admin/field-inputs";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/admin/client";
import type { PublicAdmin } from "@/lib/auth/admins";
import { cn } from "@/lib/utils";

export function SettingsPanels({
  current,
  initialAdmins,
  mail,
}: {
  current: PublicAdmin | null;
  initialAdmins: PublicAdmin[];
  mail: {
    ready: boolean;
    host: string;
    port: number;
    user: string;
    from: string;
  };
}) {
  return (
    <div className="space-y-5">
      <PasswordPanel />
      {current?.role === "owner" ? (
        <AdminsPanel current={current} initial={initialAdmins} />
      ) : (
        <TeamList admins={initialAdmins} />
      )}
      <MailPanel mail={mail} />
    </div>
  );
}

function PasswordPanel() {
  const [values, setValues] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [fields, setFields] = React.useState<Record<string, string>>({});
  const [pending, setPending] = React.useState(false);

  const set = (key: keyof typeof values) => (value: string) =>
    setValues((state) => ({ ...state, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setFields({});

    const result = await apiFetch("/api/admin/auth/password", {
      method: "POST",
      json: values,
    });
    setPending(false);

    if (!result.ok) {
      setFields(result.fields ?? {});
      toast.error(result.error);
      return;
    }

    setValues({ currentPassword: "", newPassword: "", confirmPassword: "" });
    toast.success(
      "Password changed. Any other device signed in as you has been signed out.",
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="mb-1 text-[0.95rem] font-bold text-ink">Your password</h2>
      <p className="mb-4 text-[0.8rem] leading-[1.6] text-slate-500">
        Changing it signs out every other session using this account.
      </p>

      <form onSubmit={submit} className="max-w-[420px] space-y-4" noValidate>
        <FieldShell
          label="Current password"
          error={fields.currentPassword}
          htmlFor="pw-current"
        >
          <input
            id="pw-current"
            type="password"
            autoComplete="current-password"
            value={values.currentPassword}
            aria-invalid={Boolean(fields.currentPassword)}
            onChange={(event) => set("currentPassword")(event.target.value)}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell
          label="New password"
          help="At least 10 characters, with an uppercase letter, a lowercase letter and a number."
          error={fields.newPassword}
          htmlFor="pw-new"
        >
          <input
            id="pw-new"
            type="password"
            autoComplete="new-password"
            value={values.newPassword}
            aria-invalid={Boolean(fields.newPassword)}
            onChange={(event) => set("newPassword")(event.target.value)}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell
          label="Confirm new password"
          error={fields.confirmPassword}
          htmlFor="pw-confirm"
        >
          <input
            id="pw-confirm"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            aria-invalid={Boolean(fields.confirmPassword)}
            onChange={(event) => set("confirmPassword")(event.target.value)}
            className={inputClass}
          />
        </FieldShell>

        <Button type="submit" variant="brand" size="sm" disabled={pending}>
          {pending ? <FaSpinner className="animate-spin" /> : <FaKey />}
          Change password
        </Button>
      </form>
    </section>
  );
}

function AdminsPanel({
  current,
  initial,
}: {
  current: PublicAdmin;
  initial: PublicAdmin[];
}) {
  const [admins, setAdmins] = React.useState(initial);
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "editor",
  });
  const [fields, setFields] = React.useState<Record<string, string>>({});
  const [pending, setPending] = React.useState(false);

  const set = (key: keyof typeof values) => (value: string) =>
    setValues((state) => ({ ...state, [key]: value }));

  async function create(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setFields({});

    const result = await apiFetch<{ admin: PublicAdmin }>("/api/admin/admins", {
      method: "POST",
      json: values,
    });
    setPending(false);

    if (!result.ok) {
      setFields(result.fields ?? {});
      toast.error(result.error);
      return;
    }

    setAdmins((state) => [...state, result.data.admin]);
    setValues({ name: "", email: "", password: "", role: "editor" });
    toast.success("Account created.");
  }

  async function remove(admin: PublicAdmin) {
    if (!window.confirm(`Delete the account for ${admin.email}?`)) return;

    const result = await apiFetch(`/api/admin/admins/${admin.id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    setAdmins((state) => state.filter((item) => item.id !== admin.id));
    toast.success("Account deleted.");
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="mb-1 text-[0.95rem] font-bold text-ink">Admin accounts</h2>
      <p className="mb-4 text-[0.8rem] leading-[1.6] text-slate-500">
        Editors can change content and send email. Owners can also add and
        remove accounts.
      </p>

      <ul className="mb-6 overflow-hidden rounded-xl border border-slate-200">
        {admins.map((admin) => (
          <li
            key={admin.id}
            className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.88rem] font-medium text-ink">
                {admin.name}
                {admin.id === current.id ? (
                  <span className="ml-2 text-[0.72rem] text-slate-400">
                    (you)
                  </span>
                ) : null}
              </span>
              <span className="block truncate text-[0.76rem] text-slate-500">
                {admin.email} · last signed in{" "}
                {admin.lastLoginAt
                  ? new Date(admin.lastLoginAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })
                  : "never"}
              </span>
            </span>

            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[0.68rem] font-semibold",
                admin.role === "owner"
                  ? "bg-brand/10 text-brand"
                  : "bg-slate-100 text-slate-500",
              )}
            >
              {admin.role}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete ${admin.email}`}
              disabled={admin.id === current.id || admins.length <= 1}
              onClick={() => remove(admin)}
              className="text-slate-400 hover:text-destructive"
            >
              <FaTrash />
            </Button>
          </li>
        ))}
      </ul>

      <form onSubmit={create} className="max-w-[520px]" noValidate>
        <h3 className="mb-3 text-[0.86rem] font-semibold text-slate-600">
          Add an account
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldShell label="Name" error={fields.name} htmlFor="new-name">
            <TextInput
              id="new-name"
              value={values.name}
              onChange={set("name")}
              invalid={Boolean(fields.name)}
            />
          </FieldShell>
          <FieldShell label="Email" error={fields.email} htmlFor="new-email">
            <input
              id="new-email"
              type="email"
              value={values.email}
              aria-invalid={Boolean(fields.email)}
              onChange={(event) => set("email")(event.target.value)}
              className={inputClass}
            />
          </FieldShell>
          <FieldShell
            label="Temporary password"
            help="At least 10 characters, mixed case, with a number."
            error={fields.password}
            htmlFor="new-password"
          >
            <TextInput
              id="new-password"
              value={values.password}
              onChange={set("password")}
              invalid={Boolean(fields.password)}
            />
          </FieldShell>
          <FieldShell label="Role" error={fields.role} htmlFor="new-role">
            <SelectInput
              id="new-role"
              value={values.role}
              onChange={set("role")}
              options={[
                { value: "editor", label: "Editor" },
                { value: "owner", label: "Owner" },
              ]}
            />
          </FieldShell>
        </div>

        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="mt-4"
          disabled={pending}
        >
          {pending ? <FaSpinner className="animate-spin" /> : <FaPlus />}
          Create account
        </Button>
      </form>
    </section>
  );
}

function TeamList({ admins }: { admins: PublicAdmin[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="mb-1 text-[0.95rem] font-bold text-ink">Admin accounts</h2>
      <p className="mb-4 text-[0.8rem] text-slate-500">
        Only an owner can add or remove accounts.
      </p>
      <ul className="overflow-hidden rounded-xl border border-slate-200">
        {admins.map((admin) => (
          <li
            key={admin.id}
            className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0"
          >
            <span className="min-w-0">
              <span className="block truncate text-[0.88rem] font-medium text-ink">
                {admin.name}
              </span>
              <span className="block truncate text-[0.76rem] text-slate-500">
                {admin.email}
              </span>
            </span>
            <span className="shrink-0 text-[0.72rem] text-slate-400">
              {admin.role}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MailPanel({
  mail,
}: {
  mail: { ready: boolean; host: string; port: number; user: string; from: string };
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="mb-1 text-[0.95rem] font-bold text-ink">Mail delivery</h2>
      <p className="mb-4 text-[0.8rem] leading-[1.6] text-slate-500">
        Set in the environment rather than here — credentials do not belong in
        the database.
      </p>

      {mail.ready ? (
        <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-2 text-[0.85rem]">
          <dt className="text-slate-500">Status</dt>
          <dd className="font-semibold text-emerald-600">Configured</dd>
          <dt className="text-slate-500">Host</dt>
          <dd className="text-ink">
            {mail.host}:{mail.port}
          </dd>
          <dt className="text-slate-500">Account</dt>
          <dd className="truncate text-ink">{mail.user}</dd>
          <dt className="text-slate-500">From</dt>
          <dd className="truncate text-ink">{mail.from}</dd>
        </dl>
      ) : (
        <>
          <p className="mb-3 text-[0.85rem] font-semibold text-amber-700">
            Not configured — campaigns cannot be sent.
          </p>
          <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-[0.75rem] leading-[1.7] text-slate-200">
{`SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="no-reply@mantrasphere.com.np"
SMTP_PASSWORD="app-password"
SMTP_FROM="no-reply@mantrasphere.com.np"
SMTP_REPLY_TO="info@mantrasphere.com.np"`}
          </pre>
        </>
      )}
    </section>
  );
}
