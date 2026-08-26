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
  "w-full rounded-xl border-2 border-slate-200 bg-white px-[18px] py-3.5 text-[0.95rem] text-ink transition-all focus-visible:border-brand focus-visible:ring-[3px] focus-visible:ring-brand/10";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.1),0_8px_10px_-6px_rgb(0_0_0_/_0.1)] md:p-10">
        <div className="px-10 py-15 text-center">
          <FaCircleCheck className="mx-auto mb-5 text-[4rem] text-emerald-500" />
          <h3 className="mb-2.5 text-[1.5rem] text-ink">
            Message Sent Successfully!
          </h3>
          <p className="text-slate-500">
            Thank you for reaching out. We&apos;ll get back to you within 24
            hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.1),0_8px_10px_-6px_rgb(0_0_0_/_0.1)] md:p-10">
      <form action={formAction} noValidate>
        <h3 className="mb-[30px] text-[1.5rem] text-ink">Send Us a Message</h3>

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
            className="mb-2 block text-[0.9rem] font-semibold text-ink-3"
          >
            Service Interested In
          </Label>
          {/* Radix renders a hidden native select for `name`, so this still
              posts correctly when the action runs without client JS. */}
          <Select name="service">
            <SelectTrigger
              id="service"
              className={cn(fieldClass, "h-auto justify-between")}
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
            className="mb-2 block text-[0.9rem] font-semibold text-ink-3"
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
            className={cn(fieldClass, "min-h-[120px] resize-y")}
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
        className="mb-2 block text-[0.9rem] font-semibold text-ink-3"
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
