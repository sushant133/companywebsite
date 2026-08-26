import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaBrain,
  FaCheckDouble,
  FaCircleCheck,
  FaCloud,
  FaChevronRight,
  FaGaugeHigh,
  FaGears,
  FaHeadset,
  FaLock,
  FaPhone,
  FaRocket,
  FaShieldHalved,
  FaUpRightAndDownLeftFromCenter,
  FaUsers,
} from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Container,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Preloader } from "@/components/site/preloader";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import {
  aboutHighlights,
  coreValues,
  differentiators,
  foundationCards,
  industries,
} from "@/lib/data/about";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MantraSphere Innovations is a team of innovators, developers, and designers transforming the digital landscape one breakthrough solution at a time.",
};

const heroTags = ["ISO Certified", "Global Reach", "24/7 Support"];

/** Source order is preserved from the legacy markup: the branded tile is the
 *  seventh child, so it lands in the third row of the 3x3 grid. */
const hexTiles = [
  { icon: FaGears, label: "Agile", delay: "0s" },
  { icon: FaLock, label: "Secure", delay: "0.2s" },
  { icon: FaGaugeHigh, label: "Fast", delay: "0.4s" },
  { icon: FaUpRightAndDownLeftFromCenter, label: "Scalable", delay: "0.6s" },
  { icon: FaCheckDouble, label: "Tested", delay: "0.8s" },
  { icon: FaCloud, label: "Cloud", delay: "1s" },
];

export default function AboutPage() {
  return (
    <>
      <Preloader />

      {/* ---- Hero ---- */}
      <section className="relative flex items-center overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#1a1040_40%,#0f172a_100%)] pt-[130px] pb-25 md:min-h-[70vh] md:pt-35 md:pb-30">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute -top-25 -right-25 size-100 rounded-full bg-brand/15 opacity-50 blur-[60px] animate-float-shape" />
          <span className="absolute -bottom-12 -left-12 size-75 rounded-full bg-brand-pink/12 opacity-50 blur-[60px] [animation:float-shape_10s_ease-in-out_infinite_reverse]" />
          <span className="absolute top-[30%] left-[40%] size-50 rounded-full bg-brand-sky/12 opacity-50 blur-[60px] [animation:float-shape_12s_ease-in-out_infinite]" />
          <span className="absolute top-[20%] right-[20%] size-[150px] rounded-full bg-teal-500/12 opacity-50 blur-[60px] [animation:float-shape_9s_ease-in-out_infinite_reverse]" />
          <span className="absolute right-[10%] bottom-[30%] size-25 rounded-full bg-amber-500/10 opacity-50 blur-[60px] [animation:float-shape_7s_ease-in-out_infinite]" />
          <span className="grid-overlay absolute inset-0" />
        </div>

        <Container>
          <div className="relative z-[2] mx-auto max-w-[800px] text-center">
            <Reveal
              animation="fade-down"
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-brand/25 bg-brand/12 px-6 py-2 text-[0.9rem] font-medium text-brand-light"
            >
              <span className="size-2 rounded-full bg-brand-light animate-pulse-dot" />
              <span>Discover Our Story</span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mb-5 text-[1.8rem] leading-[1.2] font-extrabold text-white xs:text-[2.2rem] md:text-[3.5rem]">
                We Are <span className="text-gradient-brand">MantraSphere</span>
                <br />
                Innovations
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mb-[30px] text-base leading-[1.8] text-slate-400 md:text-[1.2rem]">
                A passionate team of innovators, developers, and designers
                committed to transforming the digital landscape — one
                breakthrough solution at a time.
              </p>
            </Reveal>

            <Reveal
              delay={300}
              className="mb-[30px] flex flex-col flex-wrap items-center justify-center gap-4 xs:flex-row"
            >
              {heroTags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-[18px] py-2 text-[0.85rem] font-medium text-slate-300"
                >
                  <FaCircleCheck className="text-[0.8rem] text-emerald-500" />
                  {tag}
                </span>
              ))}
            </Reveal>

            <Reveal delay={350}>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center justify-center gap-3 text-[0.95rem] text-slate-400"
              >
                <Link href="/" className="text-brand-light hover:text-white">
                  Home
                </Link>
                <FaChevronRight className="size-2.5" />
                <span>About Us</span>
              </nav>
            </Reveal>
          </div>
        </Container>

        <div aria-hidden className="absolute -bottom-0.5 left-0 z-[3] w-full">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-20 w-full">
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* ---- Who we are ---- */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-[50px] lg:gap-20">
            <Reveal animation="fade-right">
              <span className="mb-4 inline-block rounded-full bg-brand/10 px-5 py-1.5 text-[0.9rem] font-semibold text-brand">
                Who We Are
              </span>
              <h2 className="mb-6 text-[2rem] leading-[1.25] md:text-[2.5rem]">
                Pioneering Digital{" "}
                <span className="text-gradient-brand">Innovation</span> Since
                2025
              </h2>
              <p className="mb-4 text-[1.15rem] leading-[1.8] font-medium text-ink-3">
                MantraSphere Innovations was born from a bold idea — that
                technology should empower every business, regardless of size, to
                achieve extraordinary things.
              </p>
              <p className="mb-4 leading-[1.8] text-slate-500">
                What started as a small team of 5 passionate developers in a
                modest workspace has blossomed into a powerhouse of 30+ talented
                professionals serving clients across the globe. Our journey has
                been fueled by curiosity, creativity, and an unwavering
                commitment to excellence.
              </p>
              <p className="mb-4 leading-[1.8] text-slate-500">
                We don&apos;t just write code — we craft digital experiences
                that transform businesses. From AI-powered analytics to
                immersive 3D environments, we push the boundaries of what&apos;s
                possible in the digital world.
              </p>

              <div className="my-9 grid grid-cols-1 gap-5 md:grid-cols-2">
                {aboutHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3.5 rounded-[14px] border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-brand"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6366f1_0%,#0ea5e9_100%)] text-base text-white">
                      <item.icon />
                    </div>
                    <div>
                      <h4 className="mb-0.5 text-[0.95rem] text-ink">
                        {item.title}
                      </h4>
                      <p className="text-[0.82rem] text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="brand" size="pill-lg">
                  <Link href="/services">
                    Our Services <FaArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline-brand" size="pill-lg">
                  <Link href="/contact">
                    <FaPhone /> Contact Us
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal animation="fade-left">
              <div className="relative mx-auto w-full max-w-[520px]">
                <div
                  aria-hidden
                  className="absolute top-1/2 left-1/2 z-0 h-4/5 w-4/5 rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.18)_0%,transparent_70%)] blur-[40px] animate-glow-pulse"
                />
                <div className="group relative z-[2] overflow-hidden rounded-[24px] border-[3px] border-brand/15 shadow-[0_25px_60px_rgb(99_102_241_/_0.18),0_8px_20px_rgb(0_0_0_/_0.08)] transition-all duration-400 hover:-translate-y-2 hover:border-brand/35 hover:shadow-[0_35px_80px_rgb(99_102_241_/_0.25),0_12px_30px_rgb(0_0_0_/_0.1)]">
                  <Image
                    src="/images/about.jpg"
                    alt="Artificial Intelligence Neural Network - MantraSphere Innovations"
                    width={520}
                    height={420}
                    className="h-[260px] w-full object-cover transition-transform duration-600 group-hover:scale-105 md:h-[320px] lg:h-[420px]"
                  />
                </div>

                <div className="absolute -top-4 right-0 z-10 flex items-center gap-2.5 rounded-[14px] border border-slate-200 bg-white px-2.5 py-2.5 text-[0.8rem] font-semibold text-ink shadow-[0_10px_30px_rgb(0_0_0_/_0.1)] animate-float-badge max-xs:rounded-full xs:px-4 md:-right-5 md:px-[22px] md:py-3 md:text-[0.9rem]">
                  <FaBrain className="text-[1.2rem] text-brand md:text-[1.1rem]" />
                  <span className="max-xs:hidden">AI Powered</span>
                </div>
                <div
                  className="absolute -bottom-4 left-0 z-10 flex items-center gap-2.5 rounded-[14px] border border-slate-200 bg-white px-2.5 py-2.5 text-[0.8rem] font-semibold text-ink shadow-[0_10px_30px_rgb(0_0_0_/_0.1)] animate-float-badge max-xs:rounded-full xs:px-4 md:-left-5 md:px-[22px] md:py-3 md:text-[0.9rem]"
                  style={{ animationDelay: "2s" }}
                >
                  <FaCircleCheck className="text-[1.2rem] text-brand md:text-[1.1rem]" />
                  <span className="max-xs:hidden">Futuristic Innovations</span>
                </div>

                <div
                  aria-hidden
                  className="dot-pattern absolute -right-4 -bottom-5 z-[1] size-20 rounded-xl opacity-60 md:-right-[30px] md:-bottom-[30px] md:size-[120px]"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- Mission / Vision / Values ---- */}
      <Section className="bg-white">
        <Container>
          <SectionHeader
            tag="Our Foundation"
            title={
              <>
                Driven by Purpose,{" "}
                <span className="text-gradient-brand">Defined by Values</span>
              </>
            }
            description="The principles that guide every decision we make and every solution we build."
          />
          <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-3">
            {foundationCards.map((card, index) => (
              <Reveal
                key={card.title}
                delay={(index + 1) * 100}
                className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white px-[34px] py-11 transition-all duration-400 hover:-translate-y-2 hover:border-brand/30 hover:shadow-brand"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute -top-25 -right-25 size-50 rounded-full opacity-0 blur-[80px] transition-opacity duration-400 group-hover:opacity-100",
                    card.glow,
                  )}
                />
                <div className="mb-7 flex items-center justify-between">
                  <div className="relative size-[72px]">
                    <div
                      className={cn(
                        "relative z-[2] flex size-[72px] items-center justify-center rounded-[20px] bg-linear-135 text-[1.8rem] text-white",
                        card.iconGradient,
                      )}
                    >
                      <card.icon />
                    </div>
                    <span
                      aria-hidden
                      className="absolute -top-1.5 -left-1.5 size-[calc(100%+12px)] rounded-[24px] border-2 border-dashed border-brand/20 animate-spin-slow"
                    />
                  </div>
                  <span className="font-heading text-[3rem] leading-none font-black text-slate-100">
                    {card.label}
                  </span>
                </div>
                <h3 className="mb-4 text-[1.5rem] text-ink">{card.title}</h3>
                <p className="mb-6 leading-[1.8] text-slate-500">{card.body}</p>
                <ul>
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 py-2 text-[0.95rem] font-medium text-ink-3"
                    >
                      <FaArrowRight className="text-[0.75rem] text-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Core values ---- */}
      <Section className="bg-slate-50">
        <Container>
          <SectionHeader
            tag="What Defines Us"
            title={
              <>
                Our Core <span className="text-gradient-brand">Values</span>
              </>
            }
            description="The pillars that support our culture, guide our decisions, and shape our future."
          />
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <Reveal
                key={value.title}
                delay={(index + 1) * 100}
                style={{ "--accent": value.accent } as React.CSSProperties}
                className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-white px-7 py-9 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-brand"
              >
                <div className="mx-auto mb-5 flex size-[70px] items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[1.6rem] text-[var(--accent)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white">
                  <value.icon />
                </div>
                <h4 className="mb-2.5 text-[1.15rem] text-ink">
                  {value.title}
                </h4>
                <p className="text-[0.92rem] leading-[1.7] text-slate-500">
                  {value.description}
                </p>
                <div className="mt-5">
                  <span className="mx-auto block h-1 w-10 rounded-[2px] bg-[var(--accent)] opacity-40 transition-all duration-300 group-hover:w-15 group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- What makes us different ---- */}
      <Section className="bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-[60px]">
            <Reveal animation="fade-right">
              <span className="mb-4 inline-block rounded-full bg-brand/10 px-5 py-1.5 text-[0.9rem] font-semibold text-brand">
                Why Choose Us
              </span>
              <h2 className="mb-4 text-[2rem] md:text-[2.3rem]">
                What Makes Us{" "}
                <span className="text-gradient-brand">Different</span>
              </h2>
              <p className="mb-9 leading-[1.8] text-slate-500">
                In a crowded market, we stand out through our unique combination
                of expertise, innovation, and genuine care for our clients&apos;
                success.
              </p>

              <Accordion type="single" collapsible className="gap-3">
                {differentiators.map((item, index) => (
                  <AccordionItem
                    key={item.title}
                    value={`wcp-${index}`}
                    className="group/item mb-3 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 data-[state=open]:border-brand/30 data-[state=open]:shadow-[0_4px_20px_rgb(99_102_241_/_0.08)]"
                  >
                    <AccordionTrigger className="items-center gap-3.5 rounded-none px-6 py-[18px] hover:bg-slate-50 hover:no-underline **:data-[slot=accordion-trigger-icon]:text-slate-400 group-data-[state=open]/item:**:data-[slot=accordion-trigger-icon]:text-brand">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,rgb(99_102_241_/_0.1),rgb(14_165_233_/_0.1))] text-[0.95rem] text-brand transition-all duration-300 group-data-[state=open]/item:bg-[linear-gradient(135deg,#6366f1,#0ea5e9)] group-data-[state=open]/item:text-white">
                        <item.icon />
                      </span>
                      <h4 className="flex-1 text-base text-ink">
                        {item.title}
                      </h4>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pt-0 pb-5 text-[0.92rem] leading-[1.7] text-slate-500 md:pl-[78px]">
                      {item.body}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            <Reveal animation="fade-left">
              <div className="relative flex h-[450px] w-full items-center justify-center">
                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 size-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.08),transparent_70%)]"
                />
                <div className="relative z-[2] grid grid-cols-[repeat(3,70px)] grid-rows-[repeat(3,70px)] gap-2.5 xs:grid-cols-[repeat(3,80px)] xs:grid-rows-[repeat(3,80px)] md:grid-cols-[repeat(3,100px)] md:grid-rows-[repeat(3,100px)] md:gap-[15px]">
                  {hexTiles.map((tile) => (
                    <div
                      key={tile.label}
                      style={{ animationDelay: tile.delay }}
                      className="flex size-[70px] flex-col items-center justify-center gap-1.5 rounded-[20px] border border-slate-200 bg-white shadow-[0_4px_15px_rgb(0_0_0_/_0.04)] transition-all duration-300 animate-float-hex hover:-translate-y-[5px] hover:border-brand/30 hover:shadow-[0_10px_30px_rgb(99_102_241_/_0.1)] xs:size-20 md:size-25"
                    >
                      <tile.icon className="text-[1.2rem] text-brand md:text-[1.5rem]" />
                      <span className="text-center text-[0.6rem] leading-[1.2] font-semibold text-slate-500 md:text-[0.7rem]">
                        {tile.label}
                      </span>
                    </div>
                  ))}
                  <div className="hex-center flex size-[70px] scale-110 flex-col items-center justify-center gap-1.5 rounded-[20px] border border-transparent bg-[linear-gradient(135deg,#6366f1,#0ea5e9)] shadow-[0_4px_15px_rgb(0_0_0_/_0.04)] xs:size-20 md:size-25">
                    <Image
                      src="/images/logo.png"
                      alt=""
                      width={40}
                      height={40}
                      className="max-w-[40%]"
                    />
                    <span className="text-center text-[0.6rem] leading-[1.2] font-semibold text-white/90 md:text-[0.7rem]">
                      Mantra
                      <br />
                      Sphere
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- Industries ---- */}
      <Section className="bg-white">
        <Container>
          <SectionHeader
            tag="Industries"
            title={
              <>
                Industries We <span className="text-gradient-brand">Serve</span>
              </>
            }
            description="Our expertise spans across multiple industries, delivering tailored solutions for each sector."
          />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <Reveal
                key={industry.title}
                delay={100 + index * 50}
                style={{ "--accent": industry.accent } as React.CSSProperties}
                className="group rounded-[20px] border border-slate-200 bg-slate-50 px-5 py-9 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-brand"
              >
                <div className="mx-auto mb-3.5 flex size-16 items-center justify-center rounded-[18px] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[1.5rem] text-[var(--accent)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white">
                  <industry.icon />
                </div>
                <h4 className="text-[0.95rem] text-ink">{industry.title}</h4>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- CTA ---- */}
      <Section className="relative overflow-hidden bg-gradient-brand">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute -top-50 -right-25 size-100 rounded-full bg-white/5" />
          <span className="absolute -bottom-[150px] -left-20 size-75 rounded-full bg-white/5" />
          <span className="absolute top-1/2 left-1/2 size-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5" />
        </div>
        <Container>
          <Reveal className="relative z-[2] text-center">
            <div className="mx-auto mb-7 flex size-20 items-center justify-center rounded-full border border-white/20 bg-white/15 text-[2rem] text-white backdrop-blur-[10px]">
              <FaRocket />
            </div>
            <h2 className="mb-4 text-[2rem] text-white md:text-[2.5rem]">
              Ready to Transform Your Business?
            </h2>
            <p className="mx-auto mb-9 max-w-[600px] text-[1.15rem] leading-[1.8] text-white/85">
              Join the growing list of businesses that trust MantraSphere
              Innovations to power their digital journey. Let&apos;s build
              something extraordinary together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="white" size="pill-lg">
                <Link href="/contact">
                  Start Your Project <FaArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline-white" size="pill-lg">
                <Link href="/team">
                  <FaUsers /> Meet Our Team
                </Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-[30px]">
              <span className="flex items-center gap-2 text-[0.85rem] font-medium text-white/80">
                <FaShieldHalved className="text-[0.9rem] text-white/90" />
                ISO Certified
              </span>
              <span className="flex items-center gap-2 text-[0.85rem] font-medium text-white/80">
                <FaHeadset className="text-[0.9rem] text-white/90" />
                24/7 Support
              </span>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
