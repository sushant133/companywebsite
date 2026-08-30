import {
  ApiError,
  handle,
  isSameOrigin,
  jsonError,
  jsonOk,
  jsonValidationError,
  readJson,
  requireAdmin,
} from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/auth/rate-limit";
import {
  MAX_RECIPIENTS,
  dedupeRecipients,
  recordCampaign,
  sendCampaign,
  sendCampaignSchema,
} from "@/lib/email/campaigns";
import { isMailConfigured } from "@/lib/env";

/**
 * Five campaigns an hour per admin. Bulk mail is the one action here that can
 * do real damage if a script gets hold of a session, so it is capped even for
 * an authenticated caller.
 */
const CAMPAIGNS_PER_HOUR = 5;

export async function POST(request: Request) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    const admin = await requireAdmin();

    if (!isMailConfigured()) {
      throw new ApiError(
        "SMTP is not configured. Add SMTP_HOST, SMTP_USER and SMTP_PASSWORD to .env.local.",
        503,
      );
    }

    const limit = rateLimit(
      `campaign:${admin._id.toString()}:${clientIp(request.headers)}`,
      CAMPAIGNS_PER_HOUR,
      60 * 60 * 1000,
    );
    if (!limit.ok) {
      return jsonError(
        `Send limit reached. Try again in ${Math.ceil(limit.retryAfter / 60)} minute(s).`,
        429,
      );
    }

    const parsed = sendCampaignSchema.safeParse(await readJson(request));
    if (!parsed.success) return jsonValidationError(parsed.error);

    const recipients = dedupeRecipients(parsed.data.recipients);
    if (recipients.length === 0) {
      return jsonError("Add at least one valid recipient.", 422);
    }
    if (recipients.length > MAX_RECIPIENTS) {
      return jsonError(
        `A campaign can go to at most ${MAX_RECIPIENTS} recipients.`,
        422,
      );
    }

    const outcome = await sendCampaign({
      content: parsed.data.content,
      recipients,
      testOnly: parsed.data.testOnly,
      sentBy: admin.email,
    });

    const campaignId = await recordCampaign({
      content: parsed.data.content,
      recipientCount: parsed.data.testOnly ? 1 : recipients.length,
      sent: outcome.sent,
      failed: outcome.failed,
      results: outcome.results,
      testOnly: parsed.data.testOnly,
      sentBy: admin.email,
    });

    return jsonOk({ campaignId, ...outcome });
  });
}
