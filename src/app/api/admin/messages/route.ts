import { handle, jsonOk, requireAdmin } from "@/lib/api";
import { listMessages } from "@/lib/db/messages";

export async function GET() {
  return handle(async () => {
    await requireAdmin();
    return jsonOk({ messages: await listMessages() });
  });
}
