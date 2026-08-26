import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import { BackToTop } from "@/components/site/back-to-top";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Software Solutions`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/images/logo.png" },
  verification: { google: siteConfig.googleSiteVerification },
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} | Software Solutions`,
    description: siteConfig.description,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Next 16 no longer neutralises `scroll-behavior: smooth` during route
      // transitions unless this attribute is present, which would otherwise
      // make every navigation animate its scroll to the top.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${poppins.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <Toaster />
      </body>
    </html>
  );
}
