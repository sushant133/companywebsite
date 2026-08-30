import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { env, requireAuthSecret } from "@/lib/env";

export const SESSION_COOKIE = "ms_admin_session";

/** Eight hours: long enough for a working day, short enough to matter. */
const SESSION_SECONDS = 8 * 60 * 60;

export type AdminRole = "owner" | "editor";

export type SessionPayload = {
  /** Admin document id. */
  sub: string;
  email: string;
  name: string;
  role: AdminRole;
  /**
   * Bumped whenever the account's password changes, which invalidates every
   * token issued before it without keeping server-side session state.
   */
  ver: number;
};

export async function encryptSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(payload.sub)
    .setIssuer("mantrasphere-admin")
    .setAudience("mantrasphere-admin")
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(requireAuthSecret());
}

export async function decryptSession(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, requireAuthSecret(), {
      algorithms: ["HS256"],
      issuer: "mantrasphere-admin",
      audience: "mantrasphere-admin",
    });

    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      (payload.role !== "owner" && payload.role !== "editor") ||
      typeof payload.ver !== "number"
    ) {
      return null;
    }

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      ver: payload.ver,
    };
  } catch {
    // An expired or tampered token is simply "not signed in".
    return null;
  }
}

export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await encryptSession(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

/** The signed-in admin according to the cookie alone — no database round trip. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return decryptSession(cookieStore.get(SESSION_COOKIE)?.value);
}
