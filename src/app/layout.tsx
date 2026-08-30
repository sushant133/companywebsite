import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { getContent } from "@/lib/content/store";
import { plainText } from "@/components/site/rich-text";
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

/** Read from the content store, so renaming the company in the dashboard
 *  reaches the title, the OG tags and the verification meta as well. */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getContent("site");
  const name = plainText(site.name);
  const title = `${name} | Software Solutions`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${name}` },
    description: site.description,
    icons: { icon: site.logo || "/images/logo.png" },
    verification: site.googleSiteVerification
      ? { google: site.googleSiteVerification }
      : undefined,
    openGraph: {
      siteName: name,
      type: "website",
      url: site.url,
      title,
      description: site.description,
    },
  };
}

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
