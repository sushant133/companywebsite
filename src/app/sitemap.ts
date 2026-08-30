import type { MetadataRoute } from "next";

import { getContent } from "@/lib/content/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getContent("site");
  const lastModified = new Date();

  // Built from the navigation the dashboard defines, so a page added there is
  // in the sitemap without a code change.
  return site.navLinks
    .filter((link) => link.href.startsWith("/"))
    .map((link) => ({
      url: `${site.url}${link.href === "/" ? "" : link.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: link.href === "/" ? 1 : 0.8,
    }));
}
