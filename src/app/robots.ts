import type { MetadataRoute } from "next";

import { getContent } from "@/lib/content/store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getContent("site");

  return {
    // The dashboard and the unsubscribe confirmation are not for crawlers.
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/unsubscribe"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
