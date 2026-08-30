import { handle, jsonOk, requireAdmin } from "@/lib/api";
import { listCampaigns } from "@/lib/email/campaigns";

export async function GET() {
  return handle(async () => {
    await requireAdmin();
    return jsonOk({ campaigns: await listCampaigns() });
  });
}
