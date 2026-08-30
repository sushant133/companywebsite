import { notFound } from "next/navigation";

import { SectionEditor } from "@/components/admin/section-editor";
import { sectionSpecs } from "@/lib/content/fields";
import { isContentSection } from "@/lib/content/schema";
import { getContent } from "@/lib/content/store";

export default async function ContentSectionPage(
  props: PageProps<"/admin/content/[section]">,
) {
  const { section } = await props.params;
  if (!isContentSection(section)) notFound();

  const content = await getContent(section);

  return (
    <SectionEditor
      section={section}
      spec={sectionSpecs[section]}
      initial={content as unknown as Record<string, unknown>}
    />
  );
}
