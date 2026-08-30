import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCirclePlay, FaFolderOpen } from "react-icons/fa6";

import { CtaSection } from "@/components/site/cta-section";
import { FaqSection } from "@/components/site/faq-section";
import { HeroParticles } from "@/components/site/hero-particles";
import { Icon } from "@/components/site/icon";
import {
  Container,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Preloader } from "@/components/site/preloader";
import { Reveal } from "@/components/site/reveal";
import { RichHeading, plainText } from "@/components/site/rich-text";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { TypingText } from "@/components/site/typing-text";
import { Button } from "@/components/ui/button";
import { getContent } from "@/lib/content/store";
import { cn } from "@/lib/utils";

/**
 * One soft accent per tech category, so the six read as distinct groups
 * without shouting. Written as whole class strings because Tailwind scans
 * source text and would not see them assembled at runtime.
 */
const techAccents = [
  { chip: "bg-indigo-500/25 text-indigo-200", pill: "hover:border-indigo-400 hover:bg-ink-3" },
  { chip: "bg-sky-500/25 text-sky-200", pill: "hover:border-sky-400 hover:bg-ink-3" },
  { chip: "bg-cyan-500/25 text-cyan-200", pill: "hover:border-cyan-400 hover:bg-ink-3" },
  { chip: "bg-violet-500/25 text-violet-200", pill: "hover:border-violet-400 hover:bg-ink-3" },
  { chip: "bg-teal-500/25 text-teal-200", pill: "hover:border-teal-400 hover:bg-ink-3" },
  { chip: "bg-rose-500/25 text-rose-200", pill: "hover:border-rose-400 hover:bg-ink-3" },
];

export default async function HomePage() {
  const [home, services, testimonials, site] = await Promise.all([
    getContent("home"),
    getContent("services"),
    getContent("testimonials"),
    getContent("site"),
  ]);
  const { hero, why, servicesPreview, tech, process } = home;

  return (
    <>
      <Preloader label={plainText(site.shortName)} />

      {/* ---- Hero ---- */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-ink pt-20">
        {/* Photographic backdrop, held under an ink wash that is heaviest on
            the left so the left-aligned copy keeps its contrast. */}
        <div aria-hidden className="absolute inset-0 z-0">
          {hero.image ? (
            <Image
              src={hero.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-ink/70" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42_/_0.92)_0%,rgb(15_23_42_/_0.72)_45%,rgb(99_102_241_/_0.3)_100%)]" />
        </div>

        <HeroParticles />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/2 -right-[20%] size-[800px] rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.15)_0%,transparent_70%)]"
        />
        <Container>
          <div className="relative z-[2] max-w-[820px] text-left">
            {hero.badge ? (
              <Reveal
                animation="fade-down"
                className="mb-[30px] inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-brand/15 px-5 py-2 text-[0.9rem] font-medium text-brand-light"
              >
                <Icon name={hero.badgeIcon} />
                <span>{hero.badge}</span>
              </Reveal>
            ) : null}

            <Reveal delay={100}>
              <h1 className="mb-6 text-[1.8rem] leading-[1.15] font-extrabold text-white xs:text-[2.2rem] md:text-5xl lg:text-[4rem]">
                <RichHeading text={hero.title} />{" "}
                <TypingText
                  words={hero.typingWords}
                  className="text-gradient-brand"
                />
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mb-10 max-w-[700px] text-base leading-[1.8] text-slate-300 md:text-[1.2rem]">
                {hero.description}
              </p>
            </Reveal>

            <Reveal delay={300} className="flex flex-wrap gap-4">
              <Button asChild variant="brand" size="pill-lg">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <FaArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline-brand" size="pill-lg">
                <Link href={hero.secondaryCta.href}>
                  <FaCirclePlay />
                  {hero.secondaryCta.label}
                </Link>
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---- Why Choose Us ---- */}
      <Section id="overview" className="bg-slate-100">
        <Container>
          {/* Copy and reasons on the left, illustration on the right; the two
              stack into a single column below lg. */}
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal className="mb-10">
                <span className="mb-4 inline-block rounded-full bg-brand/10 px-5 py-1.5 text-[0.9rem] font-semibold text-brand">
                  {why.tag}
                </span>
                <h2 className="mb-4 text-[2rem] text-ink md:text-[2.5rem]">
                  <RichHeading text={why.title} />
                </h2>
                <p className="max-w-[560px] text-[1.1rem] leading-[1.8] text-slate-500">
                  {why.description}
                </p>
              </Reveal>

              <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                {why.items.map((item, index) => (
                  <Reveal
                    key={item.title}
                    animation="fade-right"
                    delay={(index + 1) * 80}
                    className="group flex gap-4"
                  >
                    <div className="flex size-12 min-w-12 items-center justify-center rounded-2xl bg-brand/10 text-[1.2rem] text-brand transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-white">
                      <Icon name={item.icon} />
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-[1.05rem] text-ink">
                        {item.title}
                      </h3>
                      <p className="text-[0.9rem] leading-[1.7] text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {why.image ? (
              <Reveal
                animation="fade-left"
                delay={150}
                className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-8 top-10 bottom-10 rounded-[48px] bg-gradient-brand opacity-15 blur-3xl"
                />
                {/* Decorative: the reasons beside it already carry the meaning. */}
                {/* Square, matching the shipped cut-out. Swapping in an image
                    of another shape means changing these two numbers to match,
                    or the reserved space shifts once it loads. */}
                <Image
                  src={why.image}
                  alt=""
                  width={700}
                  height={700}
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 560px, 100vw"
                  className="relative h-auto w-full"
                />
              </Reveal>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* ---- Services preview ---- */}
      <Section>
        <Container>
          <SectionHeader
            tag={servicesPreview.tag}
            title={servicesPreview.title}
            description={servicesPreview.description}
          />
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service, index) => (
              <Reveal
                key={service.slug}
                delay={(index + 1) * 100}
                className="group relative overflow-hidden rounded-[20px] border border-white/15 bg-ink px-[30px] py-10 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-brand/40 hover:shadow-brand"
              >
                {/* Scaled past the edges so the blur leaves no fringe at the
                    rounded corners. */}
                {service.image ? (
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="scale-105 object-cover transition-all duration-700 ease-out group-hover:scale-[1.16]"
                  />
                ) : null}
                {/* Ink layer, purely for text contrast over a photograph this
                    busy. Eases back on hover rather than clearing out. */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-ink/50 transition-colors duration-500 ease-out group-hover:bg-ink/38"
                />
                {/* Soft bluish-white frosted pane. Its backdrop blur is what
                    softens the photograph beneath, so the image element itself
                    stays sharp and only has to handle the zoom. */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-white/20 via-sky-200/12 to-brand/16 backdrop-blur-[6px] transition-all duration-500 ease-out group-hover:from-white/8 group-hover:via-sky-200/5 group-hover:to-brand/8 group-hover:backdrop-blur-[0px]"
                />
                {/* Gradient rule that wipes in across the card top on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <div className="relative mb-5 flex size-[60px] items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-[1.5rem] text-white transition-all duration-500 ease-out group-hover:border-transparent group-hover:bg-gradient-brand group-hover:shadow-[0_12px_22px_-10px_rgb(99_102_241_/_0.7)]">
                  <Icon name={service.icon} />
                </div>
                <h3 className="relative mb-3 text-[1.25rem] text-white">
                  {service.title}
                </h3>
                <p className="relative mb-5 text-[0.95rem] text-slate-300">
                  {service.teaser}
                </p>
                <Link
                  href="/services"
                  className="relative inline-flex items-center gap-2 text-[0.95rem] font-semibold text-white/85 transition-colors duration-300 group-hover:text-white"
                >
                  Learn More
                  <FaArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="brand" size="pill-lg">
              <Link href={servicesPreview.primaryCta.href}>
                {servicesPreview.primaryCta.label} <FaArrowRight />
              </Link>
            </Button>
            {/* Services say what we can do; projects show what we have done. */}
            <Button asChild variant="outline-brand" size="pill-lg">
              <Link href={servicesPreview.secondaryCta.href}>
                <FaFolderOpen /> {servicesPreview.secondaryCta.label}
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* ---- Tech stack ---- */}
      <Section
        id="technologies"
        className="border-y border-indigo-100 bg-gradient-to-b from-indigo-50 to-[#e7eefb]"
      >
        <Container>
          <SectionHeader
            tag={tech.tag}
            title={tech.title}
            description={tech.description}
          />
          <div className="grid grid-cols-1 auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tech.categories.map((category, index) => {
              const accent = techAccents[index % techAccents.length]!;
              return (
                <Reveal
                  key={category.title}
                  delay={(index + 1) * 100}
                  className="rounded-3xl border border-white/12 bg-ink-3 p-7 shadow-[0_8px_24px_-14px_rgb(15_23_42_/_0.35)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_40px_-18px_rgb(15_23_42_/_0.5)]"
                >
                  <div className="mb-6 flex items-center gap-3.5">
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-2xl text-[1.15rem]",
                        accent.chip,
                      )}
                    >
                      <Icon name={category.icon} />
                    </span>
                    <div>
                      <h3 className="text-[1.05rem] text-white">
                        {category.title}
                      </h3>
                      <p className="text-[0.8rem] font-normal text-slate-300">
                        {category.items.length} technologies
                      </p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 gap-2.5 xs:grid-cols-2">
                    {category.items.map((item) => (
                      <li
                        key={item.label}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl border border-white/10 bg-ink-2 px-3.5 py-2.5 text-[0.875rem] font-medium text-slate-100 transition-colors duration-200 ease-out",
                          accent.pill,
                        )}
                      >
                        <Icon
                          name={item.icon}
                          className="shrink-0 text-[1.05rem] text-brand-light"
                        />
                        <span className="truncate">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---- Process ---- */}
      <Section className="bg-slate-100">
        <Container>
          {/* Illustration left, copy right - the mirror of Why Choose Us. */}
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            {process.image ? (
              <Reveal
                animation="fade-right"
                className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-8 top-10 bottom-10 rounded-[48px] bg-gradient-brand opacity-15 blur-3xl"
                />
                {/* Decorative: the numbered steps beside it carry the meaning.
                    Sized to the shipped image; a replacement of another shape
                    needs these two numbers changed to match. */}
                <Image
                  src={process.image}
                  alt=""
                  width={620}
                  height={350}
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 560px, 100vw"
                  className="relative h-auto w-full"
                />
              </Reveal>
            ) : null}

            <div>
              <Reveal className="mb-10">
                <span className="mb-4 inline-block rounded-full bg-brand/10 px-5 py-1.5 text-[0.9rem] font-semibold text-brand">
                  {process.tag}
                </span>
                <h2 className="mb-4 text-[2rem] text-ink md:text-[2.5rem]">
                  <RichHeading text={process.title} />
                </h2>
                <p className="max-w-[560px] text-[1.1rem] leading-[1.8] text-slate-500">
                  {process.description}
                </p>
              </Reveal>

              {process.steps.map((step, index) => (
                <Reveal
                  key={`${step.number}-${step.title}`}
                  animation="fade-left"
                  delay={(index + 1) * 100}
                  className="relative mb-8 flex items-start gap-5 last:mb-0"
                >
                  {/* Connector down to the next marker; the last step has
                      nothing to connect to. */}
                  {index < process.steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute top-12 -bottom-8 left-[23px] w-[2px] bg-gradient-brand opacity-25"
                    />
                  ) : null}
                  <div className="relative z-[2] flex size-12 min-w-12 items-center justify-center rounded-full bg-gradient-brand font-heading text-[0.95rem] font-extrabold text-white shadow-[0_8px_20px_-6px_rgb(99_102_241_/_0.5)]">
                    {step.number}
                  </div>
                  <div className="pt-1">
                    <h3 className="mb-1.5 text-[1.15rem] text-ink">
                      {step.title}
                    </h3>
                    <p className="text-[0.95rem] leading-[1.7] text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <TestimonialsSection testimonials={testimonials} />

      <FaqSection faq={home.faq} />

      <CtaSection cta={home.cta} />
    </>
  );
}
