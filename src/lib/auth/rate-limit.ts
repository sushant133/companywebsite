import "server-only";

/**
 * A fixed-window counter held in process memory. It is deliberately simple:
 * it slows down password guessing and runaway mail sends on a single server
 * without adding a Redis dependency. Behind several instances each one keeps
 * its own window, so treat the limits as a floor rather than a guarantee.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Stops the map growing without bound on a long-lived server. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  return {
    ok: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfter,
  };
}

/** Clears a key's window, e.g. after a login finally succeeds. */
export function resetRateLimit(key: string): void {
  buckets.delete(key);
}

/**
 * Best-effort client address. Behind a proxy the left-most `x-forwarded-for`
 * entry is the client; with no proxy header at all every caller shares one
 * bucket, which errs on the side of limiting too much rather than too little.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
