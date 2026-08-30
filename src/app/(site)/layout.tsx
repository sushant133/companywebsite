import { BackToTop } from "@/components/site/back-to-top";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { getContent } from "@/lib/content/store";

/**
 * The public site's chrome. The dashboard sits outside this group so it gets a
 * bare document rather than the marketing navbar and footer.
 *
 * Rendered per request: the header, the footer and every page below read their
 * copy from MongoDB, and an edit in the dashboard has to be visible on the next
 * page view rather than at the next deploy.
 */
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [site, services] = await Promise.all([
    getContent("site"),
    getContent("services"),
  ]);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: `${site.url}/`,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phones[0],
    sameAs: site.socials.map((social) => social.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Navbar site={site} />
      <main className="flex-1">{children}</main>
      <Footer site={site} services={services.items} />
      <BackToTop />
    </>
  );
}
