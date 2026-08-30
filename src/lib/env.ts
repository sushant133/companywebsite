import "server-only";

/**
 * Server-side configuration, read lazily so a missing value only breaks the
 * feature that needs it. The public site keeps rendering from its built-in
 * defaults when MongoDB is not configured, which is what the pre-CMS site did.
 */

export const env = {
  get mongoUri() {
    return process.env.MONGODB_URI?.trim() || "";
  },
  get mongoDbName() {
    return process.env.MONGODB_DB?.trim() || "mantrasphere";
  },
  get authSecret() {
    return process.env.AUTH_SECRET?.trim() || "";
  },
  /**
   * Optional extra gate on the first-run admin setup form. When set, the value
   * has to be typed in before the first owner account can be created, which
   * closes the window between deploying and claiming the dashboard.
   */
  get setupToken() {
    return process.env.ADMIN_SETUP_TOKEN?.trim() || "";
  },
  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
  get smtp() {
    return {
      host: process.env.SMTP_HOST?.trim() || "",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      user: process.env.SMTP_USER?.trim() || "",
      password: process.env.SMTP_PASSWORD ?? "",
      from: process.env.SMTP_FROM?.trim() || "",
      replyTo: process.env.SMTP_REPLY_TO?.trim() || "",
    };
  },
};

export function isDatabaseConfigured() {
  return env.mongoUri.length > 0;
}

export function isMailConfigured() {
  const { host, user, password } = env.smtp;
  return Boolean(host && user && password);
}

/** The JWT signing key. Throws only when auth is actually exercised. */
export function requireAuthSecret() {
  const secret = env.authSecret;
  if (secret.length < 32) {
    throw new Error(
      "AUTH_SECRET is missing or too short. Set a random string of at least 32 characters in .env.local.",
    );
  }
  return new TextEncoder().encode(secret);
}

export function requireMongoUri() {
  const uri = env.mongoUri;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add your MongoDB Atlas connection string to .env.local.",
    );
  }
  return uri;
}
