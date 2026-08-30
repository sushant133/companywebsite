import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * Gate in front of the dashboard. It only answers "is this cookie a currently
 * valid token" — whether the account still exists is settled inside the routes
 * themselves, which can reach the database. Proxy runs before rendering, so an
 * unauthenticated request never reaches an admin page at all.
 *
 * Deliberately self-contained: proxy code can be deployed away from the app,
 * so it does not share modules with it.
 */

const SESSION_COOKIE = "ms_admin_session";
const LOGIN_PATH = "/admin/login";
/** Reachable without a session — the login form and its API, plus first-run setup. */
const PUBLIC_ADMIN_PATHS = new Set([LOGIN_PATH, "/admin/setup"]);

async function hasValidSession(token: string | undefined): Promise<boolean> {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!token || !secret || secret.length < 32) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
      issuer: "mantrasphere-admin",
      audience: "mantrasphere-admin",
    });
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const signedIn = await hasValidSession(
    request.cookies.get(SESSION_COOKIE)?.value,
  );

  // Signing in again while already signed in just goes to the dashboard.
  if (pathname === LOGIN_PATH) {
    if (signedIn) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (PUBLIC_ADMIN_PATHS.has(pathname)) return NextResponse.next();

  if (!signedIn) {
    const url = new URL(LOGIN_PATH, request.url);
    // Come back to where they were headed once they are through.
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
