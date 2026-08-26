"use client";

import { useActionState } from "react";
import { FaCircleCheck, FaPaperPlane, FaSpinner } from "react-icons/fa6";

import {
  initialContactState,
  submitContact,
} from "@/app/contact/actions";
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
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile App Development" },
  { value: "ai", label: "AI & Machine Learning" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "marketing", label: "Digital Marketing" },
  { value: "3d", label: "3D/4D Development" },
  { value: "other", label: "Other" },
];

const fieldClass =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-body text-ink transition-colors placeholder:text-slate-400 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 aria-invalid:border-destructive";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
        <div className="text-center">
          <FaCircleCheck className="mx-auto mb-4 size-10 text-emerald-600" />
          <h3 className="mb-2 text-card-title">
            Message Sent Successfully!
          </h3>
          <p className="text-body text-slate-600">
            Thank you for reaching out. We&apos;ll get back to you within 24
            hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
      <form action={formAction} noValidate>
        <h3 className="mb-6 text-card-title">Send Us a Message</h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            id="firstName"
            label="First Name *"
            placeholder="John"
            error={state.errors?.firstName}
            required
          />
          <Field
            id="lastName"
            label="Last Name *"
            placeholder="Doe"
            error={state.errors?.lastName}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            id="email"
            type="email"
            label="Email *"
            placeholder="john@example.com"
            error={state.errors?.email}
            required
          />
          <Field
            id="phone"
            type="tel"
            label="Phone"
            placeholder="+977 9XXXXXXXXX"
            error={state.errors?.phone}
          />
        </div>

        <div className="mb-5">
          <Label
            htmlFor="service"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Service Interested In
          </Label>
          {/* Radix renders a hidden native select for `name`, so this still
              posts correctly when the action runs without client JS. */}
          <Select name="service">
            <SelectTrigger
              id="service"
              className={cn(fieldClass, "justify-between")}
            >
              <SelectValue placeholder="Select a Service" />
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

        <div className="mb-5">
          <Label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Your Message *
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell us about your project..."
            aria-invalid={Boolean(state.errors?.message)}
            className={cn(fieldClass, "h-auto min-h-32 resize-y py-3")}
          />
          <FieldError message={state.errors?.message} />
        </div>

        {state.status === "error" && !state.errors ? (
          <p
            role="alert"
            className="mb-5 rounded-xl bg-destructive/10 px-4 py-3 text-[0.9rem] text-destructive"
          >
            {state.message}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="brand"
          size="pill-lg"
          disabled={pending}
          className="w-full justify-center"
        >
          {pending ? (
            <>
              <FaSpinner className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  type = "text",
  ...props
}: React.ComponentProps<typeof Input> & {
  id: string;
  label: string;
  error?: string;
}) {
  return (
    <div className="mb-5">
      <Label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </Label>
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

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-[0.85rem] text-destructive">
      {message}
    </p>
  );
}
