import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

/** Legacy `.container`: 1200px max width, 20px gutters. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5", className)}>
      {children}
    </div>
  );
}

/** Legacy `.section`: 100px vertical padding, 70px below 768px. */
export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-[70px] md:py-[100px]", className)} {...props}>
      {children}
    </section>
  );
}

export function SectionHeader({
  tag,
  title,
  description,
  dark = false,
}: {
  tag: string;
  title: React.ReactNode;
  description?: string;
  /** Inverts the copy colours for sections sitting on the dark background. */
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-15 max-w-[700px] text-center">
      <span
        className={cn(
          "mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.8125rem] font-semibold tracking-[0.06em] uppercase",
          dark
            ? "border border-white/12 bg-white/[0.06] text-brand-light shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-md"
            : "border border-brand/15 bg-brand/[0.07] text-brand",
        )}
      >
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-current opacity-70"
        />
        {tag}
      </span>
      <h2
        className={cn(
          "mb-4 text-[2rem] md:text-[2.6rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-[1.075rem] leading-[1.75]",
            dark ? "text-slate-300/80" : "text-slate-500",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Dark banner with breadcrumb used by the services/products/team/contact pages. */
export function PageHeader({
  title,
  highlight,
  crumb,
}: {
  title: string;
  highlight: string;
  crumb: string;
}) {
  return (
    <section className="relative overflow-hidden mesh-dark pt-[130px] pb-[60px] text-center md:pt-40 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 pattern-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-30%] left-1/2 h-[26rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(99_102_241_/_0.2)_0%,transparent_65%)] blur-3xl"
      />
      <Container>
        <div className="relative z-[2]">
          <h1 className="mb-4 text-[2.2rem] text-white md:text-5xl">
            {title} <span className="text-gradient-brand">{highlight}</span>
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-3 text-[0.95rem] text-slate-400"
          >
            <Link href="/" className="text-brand-light hover:text-white">
              Home
            </Link>
            <FaChevronRight className="size-2.5" />
            <span>{crumb}</span>
          </nav>
        </div>
      </Container>
    </section>
  );
}
