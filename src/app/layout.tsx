import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";

import { BackToTop } from "@/components/site/back-to-top";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Headings only. Inter Tight's narrower forms hold up at large sizes with
// heavy negative tracking, which a geometric face like Poppins does not.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Software development in Nepal`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/images/logo.png" },
  verification: { google: siteConfig.googleSiteVerification },
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — Software development in Nepal`,
    description: siteConfig.description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
  logo: `${siteConfig.url}/images/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dhangadhimai-10",
    addressLocality: "Siraha",
    addressRegion: "Madhesh Pradesh",
    addressCountry: "NP",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Next 16 no longer neutralises `scroll-behavior: smooth` during route
      // transitions unless this attribute is present.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${interTight.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
