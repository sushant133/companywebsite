import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

import { env, isMailConfigured } from "@/lib/env";
import { ApiError } from "@/lib/api";

/**
 * One pooled SMTP connection per process. Pooling matters here: a campaign
 * opens up to a hundred sends in a row, and a fresh TLS handshake for each one
 * is what gets a sender throttled.
 */
const globalForMail = globalThis as typeof globalThis & {
  __mantrasphereMailer?: Transporter;
};

export function getTransporter(): Transporter {
  if (!isMailConfigured()) {
    throw new ApiError(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD in .env.local.",
      503,
    );
  }

  const { host, port, secure, user, password } = env.smtp;

  globalForMail.__mantrasphereMailer ??= nodemailer.createTransport({
    host,
    port,
    // Implicit TLS on 465, STARTTLS everywhere else.
    secure: secure || port === 465,
    auth: { user, pass: password },
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
  });

  return globalForMail.__mantrasphereMailer;
}

/** The `From:` header, falling back to the authenticated mailbox. */
export function mailFrom(displayName: string): string {
  const { from, user } = env.smtp;
  const address = from || user;
  return from.includes("<") ? from : `"${displayName}" <${address}>`;
}

export async function verifyTransport(): Promise<void> {
  await getTransporter().verify();
}
