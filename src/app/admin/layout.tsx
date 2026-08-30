import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  // The dashboard has no business in a search index.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Bare wrapper. The dashboard chrome lives in the `(dashboard)` group so the
 * login and first-run screens can render without a sidebar.
 *
 * Always rendered per request: everything below reads the session cookie.
 */
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-screen bg-slate-100">{children}</div>;
}
