"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/site";

/**
 * Fixed header.
 *
 * Every page opens on a dark section, so the bar sits transparent over that
 * and gains a solid background once you scroll past it. The mobile menu
 * drops from the bar rather than sliding in from the side, which keeps it
 * attached to the control that opened it.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] transition-colors duration-200",
        scrolled || open
          ? "border-b border-white/10 bg-ink/95 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container>
        <div className="flex h-18 items-center justify-between gap-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={34}
              height={34}
              priority
              className="size-[34px] object-contain"
            />
            <span className="font-heading text-[1.0625rem] font-semibold tracking-tight text-white">
              Mantra<span className="text-gradient-brand">Sphere</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActive(link.href)
                    ? "text-white"
                    : "text-slate-400 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="brand"
              size="pill"
              className="hidden lg:inline-flex"
            >
              <Link href="/contact">Start a project</Link>
            </Button>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="-mr-2 flex size-10 items-center justify-center rounded-md text-white lg:hidden"
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
      </Container>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-white/10 bg-ink lg:hidden"
      >
        <Container>
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-white/[0.07] py-3.5 text-[0.9375rem] last:border-b-0",
                  isActive(link.href)
                    ? "font-medium text-brand-light"
                    : "text-slate-300",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="brand" size="pill-lg" className="my-4">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Start a project
              </Link>
            </Button>
          </nav>
        </Container>
      </div>
    </header>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1140px] px-5 sm:px-8">{children}</div>
  );
}
