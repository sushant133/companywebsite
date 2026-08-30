import { NextResponse } from "next/server";

import { unsubscribeByToken } from "@/lib/email/subscribers";
import { isDatabaseConfigured } from "@/lib/env";

/**
 * The endpoint behind the `List-Unsubscribe-Post` header. Mail clients POST
 * here without any user interaction, so it has to succeed quietly and never
 * ask a question.
 */
export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (isDatabaseConfigured()) {
    try {
      await unsubscribeByToken(token);
    } catch (error) {
      console.error("[unsubscribe] one-click failed", error);
    }
  }
  return new Response(null, { status: 204 });
}

/** A client that follows the header as a link lands on the human-facing page. */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  return NextResponse.redirect(
    new URL(`/unsubscribe?token=${encodeURIComponent(token)}`, request.url),
  );
}
