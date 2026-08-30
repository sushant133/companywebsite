import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

import { Icon } from "@/components/site/icon";
import { RichHeading } from "@/components/site/rich-text";
import { Reveal } from "@/components/site/reveal";
import type { Banner } from "@/lib/content/schema";
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

/**
 * Headings are edited as one string, so the brand-gradient run is marked with
 * `[[double brackets]]` rather than being split into elements here.
 */
export function SectionHeader({
  tag,
  title,
  description,
  dark = false,
}: {
  tag: string;
  title: string;
  description?: string;
  /** Inverts the copy colours for sections sitting on the dark background. */
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-15 max-w-[700px] text-center">
      {tag ? (
        <span
          className={cn(
            "mb-4 inline-block rounded-full px-5 py-1.5 text-[0.9rem] font-semibold text-brand",
            dark ? "bg-brand/20" : "bg-brand/10",
          )}
        >
          {tag}
        </span>
      ) : null}
      <h2
        className={cn(
          "mb-4 text-[2rem] md:text-[2.5rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        <RichHeading text={title} />
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

/**
 * The tall dark banner opening the services, products and about pages: the
 * photograph sits under an ink wash that stays opaque beneath the copy and
 * lets the image through towards the right edge.
 *
 * Set `overlap` when a `StatsBar` follows, so the extra bottom padding gives
 * the card something to straddle.
 */
export function PageBanner({
  banner,
  overlap = false,
}: {
  banner: Banner;
  overlap?: boolean;
}) {
  const image = banner.image || "/images/about.jpg";

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-ink pt-[120px] md:pt-[160px]",
        overlap ? "pb-[110px] md:pb-[130px]" : "pb-[70px] md:pb-[90px]",
      )}
    >
      <div aria-hidden className="absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/85 lg:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#0f172a_0%,#0f172a_34%,rgb(15_23_42_/_0.75)_52%,rgb(15_23_42_/_0.25)_100%)] lg:block" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -left-[10%] z-[1] size-[620px] rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.18)_0%,transparent_70%)]"
      />

      <Container>
        <div className="relative z-[2] max-w-[620px]">
          {banner.crumb ? (
            <Reveal animation="fade-down">
              <nav
                aria-label="Breadcrumb"
                className="mb-6 flex items-center gap-2.5 text-[0.8rem] text-slate-400"
              >
                <Link href="/" className="text-brand-light hover:text-white">
                  Home
                </Link>
                <FaChevronRight className="size-2" />
                <span>{banner.crumb}</span>
              </nav>
            </Reveal>
          ) : null}

          <Reveal animation="fade-down" delay={banner.crumb ? 60 : 0}>
            <span className="mb-4 inline-block text-[0.9rem] font-semibold tracking-[0.2em] text-brand-light uppercase">
              {banner.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mb-6 text-[2.2rem] leading-[1.15] font-extrabold text-white md:text-[3.2rem]">
              <RichHeading text={banner.title} />
            </h1>
          </Reveal>

          {banner.description ? (
            <Reveal delay={180}>
              <p className="mb-8 max-w-[520px] text-base leading-[1.8] text-slate-300 md:text-[1.1rem]">
                {banner.description}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={240} className="flex flex-wrap gap-3">
            {banner.points.map((point) => (
              <span
                key={point.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[0.85rem] font-medium text-slate-200 backdrop-blur-sm"
              >
                <Icon name={point.icon} className="text-brand-light" />
                {point.label}
              </span>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Dark banner with breadcrumb used by simpler pages. */
export function PageHeader({
  title,
  crumb,
}: {
  /** Marked up with `[[brackets]]` for the gradient run. */
  title: string;
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
            <RichHeading text={title} />
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
