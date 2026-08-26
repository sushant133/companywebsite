import Link from "next/link";

import { cn } from "@/lib/utils";

/** 1120px measure with generous gutters. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1120px] px-6", className)}>
      {children}
    </div>
  );
}

/**
 * Section rhythm. One scale, three steps — sections do not each invent
 * their own padding.
 */
export function Section({
  size = "default",
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { size?: "default" | "tight" | "loose" }) {
  return (
    <section
      className={cn(
        size === "tight" && "py-14 md:py-20",
        size === "default" && "py-20 md:py-28",
        size === "loose" && "py-24 md:py-36",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

/**
 * Section heading. Left-aligned by default — centring every heading on the
 * page is a large part of what makes a layout feel machine-assembled.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "start",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow mb-5",
            align === "center" && "justify-center",
            tone === "dark" && "text-brand-line",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-h2",
          tone === "dark" && "text-white",
          align === "start" && "max-w-3xl",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-lead",
            align === "start" && "measure",
            tone === "dark" ? "text-ink-fg-muted" : "text-fg-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Interior page masthead. Deliberately short and quiet: it orients you and
 * gets out of the way, rather than acting as a second hero.
 */
export function PageHeader({
  title,
  intro,
  crumb,
}: {
  title: string;
  intro?: string;
  crumb: string;
}) {
  return (
    <header className="border-b border-line bg-surface-alt pt-32 pb-14 md:pt-40 md:pb-20">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-sm text-fg-subtle"
        >
          <Link href="/" className="hover:text-fg">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-fg-muted">{crumb}</span>
        </nav>
        <h1 className="text-display max-w-3xl">{title}</h1>
        {intro ? (
          <p className="measure mt-6 text-lead text-fg-muted">{intro}</p>
        ) : null}
      </Container>
    </header>
  );
}
