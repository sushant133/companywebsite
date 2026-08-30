import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaPhone } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaSection } from "@/components/site/cta-section";
import { Icon } from "@/components/site/icon";
import { Container, PageBanner } from "@/components/site/layout-primitives";
import { Preloader } from "@/components/site/preloader";
import { Reveal } from "@/components/site/reveal";
import { RichHeading, plainText } from "@/components/site/rich-text";
import { StatsBar } from "@/components/site/stats-bar";
import { Button } from "@/components/ui/button";
import { getContent } from "@/lib/content/store";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getContent("about");
  return {
    title: "About Us",
    description: about.banner.description || plainText(about.banner.title),
  };
}

/** Shared vertical rhythm across every band of the page. */
const sectionPad = "py-16 md:py-20 lg:py-24";
/** The pale blue the tinted bands sit on. */
const tint = "bg-[#f6f8fd]";

/** Small caps chip that opens each section. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-block rounded-md bg-brand/10 px-3 py-1 text-[0.68rem] font-bold tracking-[0.16em] text-brand uppercase">
      {children}
    </p>
  );
}

/** Section heading: one size, one weight, used by every band. */
function Heading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[1.9rem] leading-[1.15] font-bold tracking-[-0.025em] text-ink md:text-[2.4rem]",
        className,
      )}
    >
      <RichHeading text={text} />
    </h2>
  );
}

export default async function AboutPage() {
  const [about, site] = await Promise.all([
    getContent("about"),
    getContent("site"),
  ]);
  const { story, foundation, values, different, industries } = about;

  return (
    <>
      <Preloader label={plainText(site.shortName)} />

      {/* ---- Banner ---- */}
      <PageBanner banner={about.banner} overlap />

      {/* ---- Stats, straddling the banner edge ---- */}
      <StatsBar />

      {/* ---- Who we are ---- */}
      {/* The banner above is dark and the stats card breaks the join, so the
          hairline that used to separate two white bands is gone. */}
      <section className={cn("bg-white", sectionPad)}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>{story.eyebrow}</Eyebrow>
                <Heading text={story.title} className="mt-5 mb-6" />
              </Reveal>

              <Reveal delay={80}>
                {story.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      "text-[0.98rem] leading-[1.85] text-slate-500",
                      index === story.paragraphs.length - 1 ? "mb-8" : "mb-4",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              <Reveal delay={140} className="flex flex-wrap gap-4">
                <Button asChild variant="brand" size="pill">
                  <Link href={story.primaryCta.href}>
                    {story.primaryCta.label} <FaArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline-brand" size="pill">
                  <Link href={story.secondaryCta.href}>
                    <FaPhone /> {story.secondaryCta.label}
                  </Link>
                </Button>
              </Reveal>
            </div>

            {story.image ? (
              <Reveal animation="fade-left" delay={120}>
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-[0_24px_50px_-32px_rgb(15_23_42_/_0.4)]">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ) : null}
          </div>

          {/* Four points on one ruled band, divided by hairlines. */}
          {story.highlights.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 border-t border-slate-200 pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {story.highlights.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 70}
                  className="group border-slate-200 py-5 sm:py-6 lg:py-0 lg:not-first:border-l lg:not-first:pl-7 lg:not-last:pr-7"
                >
                  <Icon
                    name={item.icon}
                    className="mb-4 text-[1.05rem] text-brand transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                  />
                  <h3 className="mb-2 text-[0.98rem] font-semibold tracking-[-0.01em] text-ink">
                    {item.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.7] text-slate-500">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      {/* ---- Our foundation ---- */}
      <section className={cn(tint, sectionPad)}>
        <Container>
          <Reveal className="mb-12 max-w-[720px]">
            <Eyebrow>{foundation.eyebrow}</Eyebrow>
            <Heading text={foundation.title} className="mt-5" />
            <p className="mt-5 text-[0.95rem] leading-[1.8] text-slate-500">
              {foundation.description}
            </p>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            {/* Numbered rows rather than three identical cards. */}
            <div className="border-t border-slate-200">
              {foundation.cards.map((card, index) => (
                <Reveal
                  key={card.title}
                  delay={index * 80}
                  className="grid gap-4 border-b border-slate-200 py-7 md:gap-6 lg:grid-cols-12 lg:py-8"
                >
                  <div className="lg:col-span-1">
                    <span className="font-heading text-[1.9rem] leading-none font-extrabold text-ink md:text-[2.2rem]">
                      {card.label}
                    </span>
                  </div>

                  <div className="lg:col-span-6 lg:border-l lg:border-slate-200 lg:pl-6">
                    <div className="mb-3 flex items-center gap-2.5">
                      <Icon
                        name={card.icon}
                        className="text-[0.95rem] text-brand"
                      />
                      <h3 className="text-[1.1rem] font-semibold tracking-[-0.01em] text-ink">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-[0.9rem] leading-[1.8] text-slate-500">
                      {card.body}
                    </p>
                  </div>

                  <ul className="space-y-2.5 lg:col-span-5">
                    {card.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-baseline gap-2.5 text-[0.86rem] leading-[1.6] text-slate-500"
                      >
                        <span
                          aria-hidden
                          className="mt-1 size-1.5 shrink-0 rounded-full bg-brand"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {foundation.image ? (
              <Reveal animation="fade-left" delay={120} className="lg:pt-2">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-[0_24px_50px_-32px_rgb(15_23_42_/_0.4)] lg:sticky lg:top-28 lg:aspect-[4/5]">
                  {/* Decorative: the section above carries the described instance. */}
                  <Image
                    src={foundation.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      {/* ---- Core values ---- */}
      <section className={cn("bg-white", sectionPad)}>
        <Container>
          <div className="mb-10 grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-16">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{values.eyebrow}</Eyebrow>
              <Heading text={values.title} className="mt-5" />
            </Reveal>
            <Reveal delay={80} className="lg:col-span-5">
              <p className="text-[0.92rem] leading-[1.8] text-slate-500">
                {values.description}
              </p>
            </Reveal>
          </div>

          {/* One ruled matrix, shared gridlines. */}
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
            {values.items.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 60}
                style={{ "--accent": value.accent } as React.CSSProperties}
                className="group bg-white p-6 transition-colors duration-300 hover:bg-slate-50 lg:p-7"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[1rem] text-[var(--accent)] transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                  <Icon name={value.icon} />
                </div>
                <h3 className="mb-2 text-[0.98rem] font-semibold tracking-[-0.01em] text-ink">
                  {value.title}
                </h3>
                <p className="text-[0.85rem] leading-[1.75] text-slate-500">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- What makes us different ---- */}
      <section className={cn(tint, sectionPad)}>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-[60px]">
            <Reveal animation="fade-right">
              <Eyebrow>{different.eyebrow}</Eyebrow>
              <Heading text={different.title} className="mt-5 mb-4" />
              <p className="mb-8 text-[0.95rem] leading-[1.85] text-slate-500">
                {different.description}
              </p>

              <Accordion type="single" collapsible className="gap-3">
                {different.items.map((item, index) => (
                  <AccordionItem
                    key={item.title}
                    value={`wcp-${index}`}
                    className="group/item mb-3 overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-brand/25 data-[state=open]:border-brand/30 data-[state=open]:shadow-[0_18px_36px_-24px_rgb(99_102_241_/_0.55)]"
                  >
                    <AccordionTrigger className="items-center gap-3.5 rounded-none px-5 py-4 hover:bg-slate-50 hover:no-underline **:data-[slot=accordion-trigger-icon]:text-slate-400 group-data-[state=open]/item:**:data-[slot=accordion-trigger-icon]:text-brand">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,rgb(99_102_241_/_0.1),rgb(14_165_233_/_0.1))] text-[0.9rem] text-brand transition-all duration-300 group-data-[state=open]/item:bg-[linear-gradient(135deg,#6366f1,#0ea5e9)] group-data-[state=open]/item:text-white">
                        <Icon name={item.icon} />
                      </span>
                      <h3 className="flex-1 text-[0.95rem] font-semibold text-ink">
                        {item.title}
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pt-0 pb-5 text-[0.88rem] leading-[1.75] text-slate-500 md:pl-[68px]">
                      {item.body}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            <Reveal animation="fade-left" delay={120}>
              {/* Photograph beside the capability tiles, as in the reference. */}
              {/* No aspect ratio on the photo: the grid row is sized by the
                  tile block, and the image stretches to match it. */}
              <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
                {different.image ? (
                  <div className="relative h-[200px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-[0_24px_50px_-32px_rgb(15_23_42_/_0.4)] sm:h-auto">
                    {/* Decorative: the section above carries the described instance. */}
                    <Image
                      src={different.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <div className="relative mx-auto">
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.1),transparent_70%)]"
                  />
                  {/* Source order is preserved from the legacy markup: the
                      branded tile is the seventh child, so it lands in the
                      third row of the 3x3 grid. */}
                  <div className="relative z-[2] grid grid-cols-[repeat(3,70px)] grid-rows-[repeat(3,70px)] gap-2.5 xs:grid-cols-[repeat(3,76px)] xs:grid-rows-[repeat(3,76px)] md:grid-cols-[repeat(3,84px)] md:grid-rows-[repeat(3,84px)] md:gap-3">
                    {different.tiles.map((tile, index) => (
                      <div
                        key={tile.label}
                        style={{ animationDelay: `${index * 0.2}s` }}
                        className="flex size-[70px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white shadow-[0_4px_15px_rgb(0_0_0_/_0.04)] transition-all duration-300 animate-float-hex hover:-translate-y-[5px] hover:border-brand/30 hover:shadow-[0_10px_30px_rgb(99_102_241_/_0.15)] xs:size-[76px] md:size-[84px]"
                      >
                        <Icon
                          name={tile.icon}
                          className="text-[1.05rem] text-brand md:text-[1.2rem]"
                        />
                        <span className="text-center text-[0.58rem] leading-[1.2] font-semibold text-slate-500 md:text-[0.65rem]">
                          {tile.label}
                        </span>
                      </div>
                    ))}
                    <div className="hex-center flex size-[70px] scale-110 flex-col items-center justify-center gap-1.5 rounded-2xl border border-transparent bg-[linear-gradient(135deg,#6366f1,#0ea5e9)] shadow-[0_14px_30px_-12px_rgb(99_102_241_/_0.7)] xs:size-[76px] md:size-[84px]">
                      {site.logo ? (
                        <Image
                          src={site.logo}
                          alt=""
                          width={40}
                          height={40}
                          className="max-w-[40%]"
                        />
                      ) : null}
                      <span className="text-center text-[0.58rem] leading-[1.2] font-semibold text-white/90 md:text-[0.65rem]">
                        {plainText(site.shortName)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---- Industries ---- */}
      <section className={cn("bg-white", sectionPad)}>
        <Container>
          <div className="mb-10 grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-16">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{industries.eyebrow}</Eyebrow>
              <Heading text={industries.title} className="mt-5" />
            </Reveal>
            <Reveal delay={80} className="lg:col-span-5">
              <p className="text-[0.92rem] leading-[1.8] text-slate-500">
                {industries.description}
              </p>
            </Reveal>
          </div>

          {/* A ruled index — icon and name on one line, no cards. */}
          <div className="grid grid-cols-1 gap-px border-y border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {industries.items.map((industry, index) => (
              <Reveal
                key={industry.title}
                delay={index * 40}
                style={{ "--accent": industry.accent } as React.CSSProperties}
                className="group flex items-center gap-3.5 bg-white px-5 py-6 transition-colors duration-300 hover:bg-slate-50"
              >
                <Icon
                  name={industry.icon}
                  className="text-[1.1rem] text-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-110"
                />
                <h3 className="text-[0.92rem] leading-[1.35] font-medium text-ink">
                  {industry.title}
                </h3>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- CTA ---- */}
      {/* The same closing band the home, services and products pages use. */}
      <CtaSection cta={about.cta} />
    </>
  );
}
