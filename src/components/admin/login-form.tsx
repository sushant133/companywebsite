"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaLock, FaSpinner } from "react-icons/fa6";

import { FieldShell, TextInput, inputClass } from "@/components/admin/field-inputs";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/admin/client";
import { cn } from "@/lib/utils";

type Mode = "login" | "setup";

export function LoginForm({
  mode,
  nextPath,
  tokenRequired,
}: {
  mode: Mode;
  nextPath: string;
  tokenRequired: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [fields, setFields] = React.useState<Record<string, string>>({});
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    setupToken: "",
  });
  const [reveal, setReveal] = React.useState(false);

  const set = (key: keyof typeof values) => (value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    setFields({});

    const result = await apiFetch(
      mode === "setup" ? "/api/admin/auth/setup" : "/api/admin/auth/login",
      {
        method: "POST",
        json:
          mode === "setup"
            ? values
            : { email: values.email, password: values.password },
      },
    );

    if (!result.ok) {
      setPending(false);
      setMessage(result.error);
      setFields(result.fields ?? {});
      return;
    }

    // The cookie is set; `refresh` makes the server re-evaluate the redirect.
    router.replace(nextPath.startsWith("/admin") ? nextPath : "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={submit} noValidate>
      <h1 className="mb-1.5 text-[1.4rem] font-bold tracking-[-0.02em] text-ink">
        {mode === "setup" ? "Create the owner account" : "Sign in"}
      </h1>
      <p className="mb-6 text-[0.88rem] leading-[1.7] text-slate-500">
        {mode === "setup"
          ? "No admin account exists yet. This form creates the first one and signs you in."
          : "Enter your admin credentials to manage the website content."}
      </p>

      <div className="space-y-4">
        {mode === "setup" ? (
          <FieldShell label="Your name" error={fields.name} htmlFor="admin-name">
            <TextInput
              id="admin-name"
              value={values.name}
              onChange={set("name")}
              invalid={Boolean(fields.name)}
            />
          </FieldShell>
        ) : null}

        <FieldShell label="Email" error={fields.email} htmlFor="admin-email">
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={values.email}
            aria-invalid={Boolean(fields.email)}
            onChange={(event) => set("email")(event.target.value)}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell
          label="Password"
          error={fields.password}
          help={
            mode === "setup"
              ? "At least 10 characters, with an uppercase letter, a lowercase letter and a number."
              : undefined
          }
          htmlFor="admin-password"
        >
          <div className="relative">
            <input
              id="admin-password"
              type={reveal ? "text" : "password"}
              autoComplete={
                mode === "setup" ? "new-password" : "current-password"
              }
              value={values.password}
              aria-invalid={Boolean(fields.password)}
              onChange={(event) => set("password")(event.target.value)}
              className={cn(inputClass, "pr-10")}
            />
            <button
              type="button"
              aria-label={reveal ? "Hide password" : "Show password"}
              onClick={() => setReveal((value) => !value)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-brand"
            >
              {reveal ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </FieldShell>

        {mode === "setup" ? (
          <>
            <FieldShell
              label="Confirm password"
              error={fields.confirmPassword}
              htmlFor="admin-confirm"
            >
              <input
                id="admin-confirm"
                type="password"
                autoComplete="new-password"
                value={values.confirmPassword}
                aria-invalid={Boolean(fields.confirmPassword)}
                onChange={(event) => set("confirmPassword")(event.target.value)}
                className={inputClass}
              />
            </FieldShell>

            {tokenRequired ? (
              <FieldShell
                label="Setup token"
                help="The value of ADMIN_SETUP_TOKEN from your environment file."
                error={fields.setupToken}
                htmlFor="admin-token"
              >
                <TextInput
                  id="admin-token"
                  value={values.setupToken}
                  onChange={set("setupToken")}
                  invalid={Boolean(fields.setupToken)}
                />
              </FieldShell>
            ) : null}
          </>
        ) : null}
      </div>

      {message ? (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-destructive/10 px-4 py-3 text-[0.85rem] leading-[1.6] text-destructive"
        >
          {message}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="brand"
        size="pill"
        disabled={pending}
        className="mt-6 w-full justify-center"
      >
        {pending ? <FaSpinner className="animate-spin" /> : <FaLock />}
        {mode === "setup" ? "Create account & sign in" : "Sign in"}
      </Button>
    </form>
  );
}
