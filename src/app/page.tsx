import Link from "next/link";
import {
  FaArrowRight,
  FaCirclePlay,
  FaPhone,
  FaRocket,
} from "react-icons/fa6";

import { CtaSection } from "@/components/site/cta-section";
import { FaqSection } from "@/components/site/faq-section";
import { HeroParticles } from "@/components/site/hero-particles";
import {
  Container,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Preloader } from "@/components/site/preloader";
import { Reveal } from "@/components/site/reveal";
import { TypingText } from "@/components/site/typing-text";
import { Button } from "@/components/ui/button";
import { overviewItems, processSteps, techCategories } from "@/lib/data/home";
import { services } from "@/lib/data/services";
import { contactInfo } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Preloader />

      {/* ---- Hero ---- */}
      <section className="relative flex min-h-screen items-center overflow-hidden mesh-dark pt-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 pattern-grid" />
        <HeroParticles />
        {/* Warm spotlight behind the headline, so the type sits in light
            rather than floating on a flat field. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-10%] left-1/2 h-[42rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(99_102_241_/_0.22)_0%,transparent_65%)] blur-3xl"
        />
        {/* Fades the hero into the section beneath instead of cutting. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-slate-100"
        />
        <Container>
          <div className="relative z-[2] mx-auto max-w-[900px] text-center">
            <Reveal
              animation="fade-down"
              className="mb-[30px] inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-5 py-2 text-[0.9rem] font-medium text-brand-light shadow-[inset_0_1px_0_rgb(255_255_255_/_0.1)] backdrop-blur-md"
            >
              <FaRocket className="text-brand-light" />
              <span>Innovating the Future of Technology</span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mb-6 text-[1.8rem] leading-[1.15] font-extrabold text-white xs:text-[2.2rem] md:text-5xl lg:text-[4rem]">
                Transforming Ideas Into{" "}
                <TypingText className="text-gradient-brand" />
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mb-10 max-w-[680px] text-base leading-[1.75] text-slate-300/85 md:text-[1.175rem]">
                MantraSphere Innovations delivers cutting-edge software
                solutions that empower businesses to thrive in the digital era.
                From AI-powered applications to immersive 3D experiences, we
                turn your vision into extraordinary digital products.
              </p>
            </Reveal>

            <Reveal
              delay={300}
              className="mb-[60px] flex flex-wrap justify-center gap-4"
            >
              <Button asChild variant="brand" size="pill-lg">
                <Link href="/services">
                  Explore Services
                  <FaArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline-brand" size="pill-lg">
                <Link href="/about">
                  <FaCirclePlay />
                  Learn More
                </Link>
              </Button>
            </Reveal>
          </div>
        </Container>

        <div className="absolute bottom-[30px] left-1/2 z-[2] -translate-x-1/2 text-center">
          <Link
            href="#overview"
            className="flex flex-col items-center gap-2 text-[0.8rem] text-white/50"
          >
            <span className="flex h-10 w-[26px] justify-center rounded-[13px] border-2 border-white/30 pt-2">
              <span className="h-2 w-1 rounded-[2px] bg-brand-light animate-scroll-down" />
            </span>
            <span>Scroll Down</span>
          </Link>
        </div>
      </section>

      {/* ---- Why Choose Us ---- */}
      <Section id="overview" className="mesh-light">
        <Container>
          <SectionHeader
            tag="Why Choose Us"
            title={
              <>
                We Build Solutions That{" "}
                <span className="text-gradient-brand">Drive Growth</span>
              </>
            }
            description="At MantraSphere Innovations, we combine technical expertise with creative thinking to deliver solutions that make a real difference."
          />
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {overviewItems.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index + 1) * 100}
                className="group ring-gradient relative rounded-[22px] card-surface px-[30px] py-11 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float"
              >
                <div className="mx-auto mb-6 flex size-[68px] items-center justify-center rounded-[20px] bg-gradient-to-br from-brand/12 to-brand-sky/12 text-[1.7rem] text-brand shadow-[inset_0_1px_0_rgb(255_255_255_/_0.7)] transition-all duration-300 group-hover:bg-gradient-brand group-hover:from-transparent group-hover:to-transparent group-hover:text-white group-hover:shadow-glow">
                  <item.icon />
                </div>
                <h3 className="mb-3 text-[1.2rem]">{item.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Services preview ---- */}
      <Section>
        <Container>
          <SectionHeader
            tag="Our Services"
            title={
              <>
                What We <span className="text-gradient-brand">Offer</span>
              </>
            }
            description="Comprehensive digital solutions tailored to meet your unique business requirements."
          />
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal
                key={service.slug}
                delay={(index + 1) * 100}
                className="group relative overflow-hidden rounded-[22px] card-surface px-[30px] py-10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float"
              >
                {/* Gradient rule that wipes in across the card top on hover. */}
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-brand transition-transform duration-400 group-hover:scale-x-100" />
                {/* Corner wash that warms the card as the pointer arrives. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-brand/12 opacity-0 blur-2xl transition-opacity duration-400 group-hover:opacity-100"
                />
                <div className="mb-6 flex size-[58px] items-center justify-center rounded-[18px] bg-gradient-to-br from-brand/12 to-brand-sky/12 text-[1.45rem] text-brand shadow-[inset_0_1px_0_rgb(255_255_255_/_0.7)] transition-all duration-300 group-hover:bg-gradient-brand group-hover:from-transparent group-hover:to-transparent group-hover:text-white group-hover:shadow-glow">
                  <service.icon />
                </div>
                <h3 className="mb-3 text-[1.2rem]">{service.title}</h3>
                <p className="mb-6 text-[0.9375rem] leading-relaxed text-slate-500">
                  {service.teaser}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-brand transition-all hover:gap-3"
                >
                  Learn More <FaArrowRight />
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Button asChild variant="brand" size="pill-lg">
              <Link href="/services">
                View All Services <FaArrowRight />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* ---- Tech stack ---- */}
      <Section id="technologies" className="relative overflow-hidden mesh-dark">
        <div aria-hidden className="pointer-events-none absolute inset-0 pattern-grid" />
        <Container className="relative z-[2]">
          <SectionHeader
            dark
            tag="Tech Stack"
            title={
              <>
                Technologies We{" "}
                <span className="text-gradient-brand">Work With</span>
              </>
            }
            description="We leverage the latest and most powerful technologies to build robust solutions."
          />
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {techCategories.map((category, index) => (
              <Reveal
                key={category.title}
                delay={(index + 1) * 100}
                className="rounded-[22px] card-glass p-[30px] transition-all duration-300 hover:-translate-y-1 hover:border-brand/45 hover:bg-white/[0.06]"
              >
                <h3 className="mb-5 flex items-center gap-3 text-[1.05rem] text-white">
                  <span className="flex size-9 items-center justify-center rounded-[11px] bg-brand/15 text-[0.95rem] text-brand-light">
                    <category.icon />
                  </span>
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 gap-2.5 xs:grid-cols-2">
                  {category.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 rounded-[11px] border border-white/[0.06] bg-white/[0.04] px-3.5 py-2.5 text-[0.875rem] text-slate-300/90 transition-all duration-300 hover:border-brand/35 hover:bg-brand/15 hover:text-white"
                    >
                      <item.icon className="text-[1.2rem] text-brand-light" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Process ---- */}
      <Section className="mesh-light">
        <Container>
          <SectionHeader
            tag="How We Work"
            title={
              <>
                Our Development{" "}
                <span className="text-gradient-brand">Process</span>
              </>
            }
            description="A streamlined approach to turning your ideas into successful digital products."
          />
          <div className="relative mx-auto max-w-[800px]">
            {/* Vertical rule aligned to the centre of the step markers. */}
            <span
              aria-hidden
              className="absolute top-0 left-[30px] h-full w-[2px] bg-gradient-brand md:left-[50px]"
            />
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                animation={index % 2 === 0 ? "fade-right" : "fade-left"}
                delay={(index + 1) * 100}
                className="relative mb-10 flex items-start gap-5 last:mb-0 md:gap-[30px]"
              >
                <div className="relative z-[2] flex size-[60px] min-w-[60px] items-center justify-center rounded-full bg-gradient-brand font-heading text-[1.1rem] font-extrabold text-white shadow-[0_8px_25px_rgb(99_102_241_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.25)] ring-4 ring-white md:size-[92px] md:min-w-[92px] md:text-[1.45rem]">
                  {step.number}
                </div>
                <div className="group flex-1 rounded-[18px] card-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-raised md:p-[30px]">
                  <h3 className="mb-2.5 text-[1.2rem] text-ink">
                    {step.title}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FaqSection />

      <CtaSection
        title="Ready to Start Your Next Project?"
        description="Let's collaborate to build something extraordinary. Get in touch with us today and let's turn your ideas into reality."
        primary={{
          href: "/contact",
          label: "Contact Us",
          icon: <FaArrowRight />,
        }}
        secondary={{
          href: `tel:${contactInfo.phones[1].replace(/\s/g, "")}`,
          label: "Call Us Now",
          icon: <FaPhone />,
          iconPosition: "leading",
          external: true,
        }}
      />
    </>
  );
}
