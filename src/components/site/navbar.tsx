"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { RichHeading, plainText } from "@/components/site/rich-text";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

/**
 * The bar is transparent until you scroll, so its white type relies on every
 * route opening with a dark banner. That holds site-wide: the home and services
 * heroes and the shared `PageHeader` are all ink.
 *
 * Links, wordmark and button all come from the `site` content section, so the
 * dashboard can rename a page or add one without a deploy.
 */
export function Navbar({ site }: { site: SiteContent }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] transition-all duration-300",
        scrolled
          ? "bg-ink/95 py-3 shadow-[0_4px_30px_rgb(0_0_0_/_0.2)] backdrop-blur-[20px]"
          : "py-5",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5">
        <Link href="/" className="z-[1001] flex items-center gap-2.5">
          {site.logo ? (
            <Image
              src={site.logo}
              alt={`${plainText(site.shortName)} logo`}
              width={42}
              height={42}
              priority
              className="size-[42px] object-contain"
            />
          ) : null}
          <RichHeading
            text={site.shortName}
            className="font-heading text-2xl font-extrabold text-gold"
          />
        </Link>

        <ul
          className={cn(
            "flex items-center gap-2",
            // Mobile: off-canvas drawer sliding in from the right.
            "max-md:fixed max-md:top-0 max-md:h-screen max-md:w-[300px] max-md:flex-col max-md:items-stretch max-md:gap-1 max-md:overflow-y-auto max-md:bg-ink max-md:px-[30px] max-md:pt-[100px] max-md:pb-[30px] max-md:shadow-[-5px_0_30px_rgb(0_0_0_/_0.3)] max-md:transition-[right] max-md:duration-300",
            open ? "max-md:right-0" : "max-md:right-[-100%]",
          )}
        >
          {site.navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  // Matches the legacy "close menu on link click" handler.
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-full px-[18px] py-2 text-[0.95rem] font-medium transition-all duration-300 max-md:w-full max-md:rounded-[10px] max-md:px-5 max-md:py-3.5",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="brand"
            size="pill"
            className="px-6 py-2.5 text-[0.9rem] max-md:hidden"
          >
            <Link href={site.headerCta.href}>{site.headerCta.label}</Link>
          </Button>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="z-[1001] hidden cursor-pointer flex-col gap-[5px] max-md:flex"
          >
            <span
              className={cn(
                "h-[3px] w-7 rounded-[3px] bg-white transition-transform duration-300",
                open && "translate-y-[8px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-[3px] w-7 rounded-[3px] bg-white transition-opacity duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-[3px] w-7 rounded-[3px] bg-white transition-transform duration-300",
                open && "-translate-y-[8px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
