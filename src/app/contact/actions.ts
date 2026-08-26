"use server";

import { z } from "zod";

const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/mgonlrqe";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.email("Enter a valid email address").max(200),
  phone: z.string().trim().max(50).optional(),
  service: z.string().trim().max(50).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (10 characters minimum)")
    .max(5000),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level messages keyed by input name, for inline display. */
  errors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
};

export const initialContactState: ContactFormState = { status: "idle" };

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    service: formData.get("service") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: ContactFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof z.infer<typeof contactSchema>;
      errors[field] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      errors,
    };
  }

  const data = parsed.data;

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...data,
        _subject: "New Message from MantraSphere Website",
      }),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "There was a problem sending your message. Please try again.",
      };
    }
  } catch {
    return {
      status: "error",
      message:
        "We couldn't reach the mail service. Please try again, or email us directly.",
    };
  }

  return { status: "success" };
}
