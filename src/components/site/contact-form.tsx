"use client";

import { useActionState } from "react";

import { initialContactState, submitContact } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const serviceOptions = [
  { value: "web", label: "Web development" },
  { value: "mobile", label: "Mobile app" },
  { value: "ai", label: "AI & machine learning" },
  { value: "uiux", label: "Product design" },
  { value: "marketing", label: "Digital marketing" },
  { value: "3d", label: "3D & immersive" },
  { value: "other", label: "Something else" },
];

const fieldClass =
  "h-11 w-full rounded-[10px] border border-line bg-surface px-3.5 text-[0.9375rem] text-fg transition-colors placeholder:text-fg-subtle focus-visible:border-brand focus-visible:ring-[3px] focus-visible:ring-brand/15 aria-invalid:border-destructive";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-line bg-surface-alt p-8 md:p-10">
        <h2 className="text-h3">Message sent</h2>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-fg-muted">
          Thanks — it&apos;s in our inbox. You&apos;ll hear back within one
          working day (Sunday to Friday, Nepal Time). If it&apos;s urgent,
          calling is faster than waiting on email.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface p-6 shadow-card md:p-8">
      <form action={formAction} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="firstName"
            label="First name"
            placeholder="John"
            error={state.errors?.firstName}
            required
          />
          <Field
            id="lastName"
            label="Last name"
            placeholder="Doe"
            error={state.errors?.lastName}
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="email"
            type="email"
            label="Email"
            placeholder="john@example.com"
            error={state.errors?.email}
            required
          />
          <Field
            id="phone"
            type="tel"
            label="Phone"
            hint="Optional"
            placeholder="+977 98XXXXXXXX"
            error={state.errors?.phone}
          />
        </div>

        <div>
          <FieldLabel htmlFor="service" hint="Optional">
            What do you need?
          </FieldLabel>
          {/* Radix renders a hidden native select for `name`, so this still
              posts correctly if the action runs before JS loads. */}
          <Select name="service">
            <SelectTrigger
              id="service"
              className={cn(fieldClass, "justify-between")}
            >
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <FieldLabel htmlFor="message">About the project</FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="What are you building, who is it for, and is there a date you're working towards?"
            aria-invalid={Boolean(state.errors?.message)}
            className={cn(fieldClass, "h-auto min-h-36 resize-y py-3")}
          />
          <FieldError message={state.errors?.message} />
        </div>

        {state.status === "error" && !state.errors ? (
          <p
            role="alert"
            className="rounded-[10px] border border-destructive/20 bg-destructive/5 px-3.5 py-3 text-sm text-destructive"
          >
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Button type="submit" variant="brand" size="lg-cta" disabled={pending}>
            {pending ? "Sending…" : "Send message"}
          </Button>
          <p className="text-sm text-fg-subtle">
            We reply within one working day.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  type = "text",
  ...props
}: React.ComponentProps<typeof Input> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} hint={hint}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        name={id}
        type={type}
        aria-invalid={Boolean(error)}
        className={fieldClass}
        {...props}
      />
      <FieldError message={error} />
    </div>
  );
}

function FieldLabel({
  htmlFor,
  hint,
  children,
}: {
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-fg">
        {children}
      </Label>
      {hint ? <span className="text-xs text-fg-subtle">{hint}</span> : null}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}
