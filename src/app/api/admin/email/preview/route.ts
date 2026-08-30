import {
  ApiError,
  handle,
  isSameOrigin,
  jsonValidationError,
  readJson,
  requireAdmin,
} from "@/lib/api";
import { buildBrand, campaignContentSchema } from "@/lib/email/campaigns";
import { renderCampaignHtml } from "@/lib/email/template";

/**
 * Renders the campaign exactly as it will be sent, so the editor can show it in
 * an iframe. Returns HTML rather than JSON on success.
 */
export async function POST(request: Request) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    await requireAdmin();

    const parsed = campaignContentSchema.safeParse(await readJson(request));
    if (!parsed.success) return jsonValidationError(parsed.error);

    const brand = await buildBrand();
    const html = renderCampaignHtml(
      parsed.data,
      { ...brand, unsubscribeUrl: `${brand.siteUrl}/unsubscribe?token=preview` },
      { email: "preview@example.com", name: "Alex" },
    );

    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  });
}
