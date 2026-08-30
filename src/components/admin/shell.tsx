"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  FaArrowRightFromBracket,
  FaBars,
  FaGear,
  FaGaugeHigh,
  FaInbox,
  FaPaperPlane,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";

import { Icon } from "@/components/site/icon";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/admin/client";
import { sectionOrder, sectionSpecs } from "@/lib/content/fields";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: string };

const toolLinks: NavItem[] = [
  { href: "/admin", label: "Overview", icon: "dashboard" },
  { href: "/admin/messages", label: "Enquiries", icon: "inbox" },
  { href: "/admin/subscribers", label: "Subscribers", icon: "users" },
  { href: "/admin/email", label: "Bulk email", icon: "send" },
  { href: "/admin/settings", label: "Settings", icon: "gear" },
];

const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: FaGaugeHigh,
  inbox: FaInbox,
  users: FaUsers,
  send: FaPaperPlane,
  gear: FaGear,
};

export function AdminShell({
  admin,
  unreadCount,
  children,
}: {
  admin: { name: string; email: string; role: string };
  unreadCount: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [signingOut, setSigningOut] = React.useState(false);

  async function signOut() {
    setSigningOut(true);
    const result = await apiFetch("/api/admin/auth/logout", { method: "POST" });
    if (!result.ok) {
      setSigningOut(false);
      toast.error(result.error);
      return;
    }
    // `replace` so the back button does not land on a dashboard page.
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ---- Sidebar ---- */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-ink transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/admin" className="font-heading text-[1.2rem] font-extrabold text-gold">
            Mantra<span className="text-gradient-brand">Sphere</span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="cursor-pointer text-slate-400 hover:text-white lg:hidden"
          >
            <FaXmark />
          </button>
        </div>

        {/*
          Following any link in here closes the mobile drawer, which would
          otherwise stay open over the page it just navigated to. Handled on the
          container rather than per link: one listener, and it covers the
          wordmark above as well.
        */}
        <nav
          onClick={() => setOpen(false)}
          className="flex-1 overflow-y-auto px-3 pb-6"
        >
          <NavGroup label="Dashboard">
            {toolLinks.map((item) => {
              const ItemIcon = toolIcons[item.icon]!;
              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  active={
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href)
                  }
                  badge={item.href === "/admin/messages" ? unreadCount : 0}
                >
                  <ItemIcon className="size-3.5 shrink-0" />
                  {item.label}
                </NavLink>
              );
            })}
          </NavGroup>

          <NavGroup label="Website content">
            {sectionOrder.map((section) => (
              <NavLink
                key={section}
                href={`/admin/content/${section}`}
                active={pathname === `/admin/content/${section}`}
              >
                <Icon
                  name={sectionSpecs[section].icon}
                  className="size-3.5 shrink-0"
                />
                {sectionSpecs[section].label}
              </NavLink>
            ))}
          </NavGroup>
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="truncate text-[0.85rem] font-semibold text-white">
            {admin.name}
          </p>
          <p className="mb-3 truncate text-[0.75rem] text-slate-400">
            {admin.email} · {admin.role}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={signOut}
            disabled={signingOut}
            className="w-full justify-center border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
          >
            <FaArrowRightFromBracket />
            {signingOut ? "Signing out…" : "Sign out"}
          </Button>
        </div>
      </aside>

      {/* Scrim behind the mobile drawer. */}
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-ink/50 lg:hidden"
        />
      ) : null}

      {/* ---- Content ---- */}
      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="cursor-pointer text-ink"
          >
            <FaBars />
          </button>
          <span className="font-heading text-[1rem] font-extrabold text-ink">
            Dashboard
          </span>
        </header>

        <main className="mx-auto max-w-[900px] px-5 py-8">{children}</main>
      </div>
    </div>
  );
}

function NavGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <p className="mb-2 px-3 text-[0.68rem] font-bold tracking-[0.14em] text-slate-500 uppercase">
        {label}
      </p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

function NavLink({
  href,
  active,
  badge = 0,
  children,
}: {
  href: string;
  active: boolean;
  badge?: number;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.86rem] font-medium transition-colors",
          active
            ? "bg-brand text-white"
            : "text-slate-300 hover:bg-white/10 hover:text-white",
        )}
      >
        {children}
        {badge > 0 ? (
          <span className="ml-auto rounded-full bg-rose-500 px-1.5 py-0.5 text-[0.65rem] font-bold text-white">
            {badge}
          </span>
        ) : null}
      </Link>
    </li>
  );
}
