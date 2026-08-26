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
          "mb-4 inline-block rounded-full px-5 py-1.5 text-[0.9rem] font-semibold text-brand",
          dark ? "bg-brand/20" : "bg-brand/10",
        )}
      >
        {tag}
      </span>
      <h2
        className={cn(
          "mb-4 text-[2rem] md:text-[2.5rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-[1.1rem] leading-[1.8]",
            dark ? "text-slate-400" : "text-slate-500",
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
    <section className="relative overflow-hidden bg-gradient-ink pt-[130px] pb-[60px] text-center md:pt-40 md:pb-20">
      <div
        aria-hidden
        className="absolute -top-1/2 -left-[10%] size-[600px] rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.1)_0%,transparent_70%)]"
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
