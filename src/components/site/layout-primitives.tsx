import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

/** 1140px measure with gutters that hold up on tablet. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1140px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/**
 * One vertical rhythm for the whole site. Previously every section carried
 * its own padding, which is why the page never settled into a cadence.
 */
export function Section({
  size = "default",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { size?: "default" | "tight" }) {
  return (
    <section
      className={cn(
        size === "tight" ? "py-14 md:py-20" : "py-16 md:py-24",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

/**
 * Section heading.
 *
 * The label is a plain uppercase line rather than a filled pill, and the
 * emphasis word is solid brand colour rather than gradient — gradient now
 * belongs to the wordmark, the hero and primary buttons only.
 */
export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "start";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 md:mb-14",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <p
        className={cn(
          "section-label mb-4",
          align === "center" && "justify-center",
          dark ? "text-brand-light" : "text-brand-strong",
        )}
      >
        <span aria-hidden className="h-px w-6 bg-current opacity-50" />
        {label}
      </p>
      <h2
        className={cn("text-section", dark ? "text-white" : "text-ink")}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-lead",
            align === "center" && "mx-auto",
            "measure",
            align === "center" && "max-w-[52ch]",
            dark ? "text-slate-400" : "text-slate-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/**
 * Interior page masthead. Short, dark and quiet — it orients you and hands
 * over to the content rather than acting as a second hero.
 */
export function PageHeader({
  title,
  highlight,
  crumb,
  intro,
}: {
  title: string;
  highlight?: string;
  crumb: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-28 pb-14 md:pt-36 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-grid" />
      <Container>
        <div className="relative">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-2 text-sm text-slate-400"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <FaChevronRight className="size-2.5 text-slate-600" />
            <span className="text-slate-300">{crumb}</span>
          </nav>
          <h1 className="text-page-title max-w-3xl text-white">
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="text-brand-light">{highlight}</span>
              </>
            ) : null}
          </h1>
          {intro ? (
            <p className="measure mt-5 text-lead text-slate-400">{intro}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
