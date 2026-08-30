"use server";

import { redirect } from "next/navigation";

import { unsubscribeByToken } from "@/lib/email/subscribers";
import { isDatabaseConfigured } from "@/lib/env";

/**
 * Confirmed from the page rather than run on page load, so a link scanner or a
 * prefetch cannot unsubscribe someone who never clicked.
 */
export async function unsubscribeAction(formData: FormData) {
  const token = String(formData.get("token") ?? "");

  if (isDatabaseConfigured()) {
    try {
      await unsubscribeByToken(token);
    } catch (error) {
      console.error("[unsubscribe] failed", error);
    }
  }

  // Reported as done either way: whether an address was on the list is not
  // something an unauthenticated visitor should be able to probe for.
  redirect("/unsubscribe?done=1");
}
