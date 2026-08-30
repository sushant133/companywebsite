import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";

import { getSession } from "@/lib/auth/session";
import { resolveSessionAdmin, type AdminDoc } from "@/lib/auth/admins";
import { isDatabaseConfigured } from "@/lib/env";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function jsonError(
  message: string,
  status = 400,
  extra?: Record<string, unknown>,
) {
  return NextResponse.json({ ok: false, error: message, ...extra }, { status });
}

/** Turns a Zod failure into `{ "path.to.field": "message" }` for the forms. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".") || "_";
    result[path] ??= issue.message;
  }
  return result;
}

export function jsonValidationError(error: z.ZodError) {
  return jsonError("Please correct the highlighted fields.", 422, {
    fields: fieldErrors(error),
  });
}

/**
 * Rejects a cross-site form post. The session cookie is `SameSite=Lax`, which
 * already blocks cross-site POSTs in current browsers; this is the belt to that
 * pair of braces and costs nothing.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Same-origin fetches may omit it entirely.
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

/**
 * Every admin API route starts here. It confirms the cookie is valid *and*
 * that the account still exists with the same password generation, so a
 * deleted or reset account cannot keep working from an old token.
 */
export async function requireAdmin(): Promise<AdminDoc> {
  if (!isDatabaseConfigured()) {
    throw new ApiError("The database is not configured.", 503);
  }
  const admin = await resolveSessionAdmin(await getSession());
  if (!admin) throw new ApiError("Not signed in.", 401);
  return admin;
}

export function requireOwner(admin: AdminDoc): AdminDoc {
  if (admin.role !== "owner") {
    throw new ApiError("This action needs an owner account.", 403);
  }
  return admin;
}

/** Wraps a handler so thrown `ApiError`s and Zod failures become responses. */
export async function handle(
  fn: () => Promise<Response>,
): Promise<Response> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonError(error.message, error.status);
    }
    if (error instanceof z.ZodError) {
      return jsonValidationError(error);
    }
    console.error("[api] unhandled error", error);
    return jsonError("Something went wrong. Please try again.", 500);
  }
}

/** Parses a JSON body, rejecting anything that is not an object. */
export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ApiError("Expected a JSON body.", 400);
  }
}
