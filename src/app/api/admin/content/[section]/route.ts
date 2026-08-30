import { revalidatePath } from "next/cache";

import {
  ApiError,
  handle,
  isSameOrigin,
  jsonOk,
  jsonValidationError,
  readJson,
  requireAdmin,
} from "@/lib/api";
import { defaultContent } from "@/lib/content/defaults";
import { isContentSection, contentSchemas } from "@/lib/content/schema";
import { getContent, resetContent, saveContent } from "@/lib/content/store";

type Context = { params: Promise<{ section: string }> };

async function sectionOf(context: Context) {
  const { section } = await context.params;
  if (!isContentSection(section)) {
    throw new ApiError(`Unknown content section "${section}".`, 404);
  }
  return section;
}

/** Editing any section can change the header, footer or a card on another page. */
function revalidateSite() {
  revalidatePath("/", "layout");
}

export async function GET(_request: Request, context: Context) {
  return handle(async () => {
    await requireAdmin();
    const section = await sectionOf(context);
    return jsonOk({
      section,
      content: await getContent(section),
      defaults: defaultContent[section],
    });
  });
}

export async function PUT(request: Request, context: Context) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    const admin = await requireAdmin();
    const section = await sectionOf(context);

    const body = await readJson(request);
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      throw new ApiError("Expected a content object.", 400);
    }

    // Parsed once here purely to turn a failure into field-level messages the
    // editor can show inline; `saveContent` parses again as the real gate.
    const check = contentSchemas[section].safeParse({
      ...defaultContent[section],
      ...(body as Record<string, unknown>),
    });
    if (!check.success) return jsonValidationError(check.error);

    const content = await saveContent(section, body, admin.email);
    revalidateSite();

    return jsonOk({ section, content });
  });
}

/** Restores a section to the copy the site ships with. */
export async function DELETE(request: Request, context: Context) {
  return handle(async () => {
    if (!isSameOrigin(request)) {
      throw new ApiError("Cross-site requests are not allowed.", 403);
    }
    await requireAdmin();
    const section = await sectionOf(context);

    await resetContent(section);
    revalidateSite();

    return jsonOk({ section, content: defaultContent[section] });
  });
}
