"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent the page scrolling behind the open mobile sheet.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] transition-colors duration-200",
        scrolled || open
          ? "border-b border-line bg-surface/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-[1120px] items-center justify-between gap-8 px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={32}
            height={32}
            priority
            className="size-8 object-contain"
          />
          <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-fg">
            Mantra<span className="text-gradient-brand">Sphere</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "text-fg"
                    : "text-fg-muted hover:bg-surface-alt hover:text-fg",
                )}
              >
                {link.label}
                {/* A 2px rule reads as a location marker; a filled pill on
                    every link reads as chrome. */}
                {active ? (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="brand" size="md" className="hidden md:inline-flex">
            <Link href="/contact">Start a project</Link>
          </Button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex size-10 items-center justify-center rounded-md text-fg md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  open ? "top-1.5 rotate-45" : "top-0.5",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet. Drops from the bar rather than sliding in from the
          side, so it reads as part of the header it belongs to. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-surface md:hidden"
      >
        <nav className="mx-auto flex w-full max-w-[1120px] flex-col px-6 py-3">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-line py-3.5 text-[0.9375rem] last:border-b-0",
                  active ? "font-medium text-brand" : "text-fg",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Button asChild variant="brand" size="md" className="mt-4 mb-2">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Start a project
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
