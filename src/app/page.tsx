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
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-ink pt-20">
        <HeroParticles />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/2 -right-[20%] size-[800px] rounded-full bg-[radial-gradient(circle,rgb(99_102_241_/_0.15)_0%,transparent_70%)]"
        />
        <Container>
          <div className="relative z-[2] mx-auto max-w-[900px] text-center">
            <Reveal
              animation="fade-down"
              className="mb-[30px] inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-brand/15 px-5 py-2 text-[0.9rem] font-medium text-brand-light"
            >
              <FaRocket />
              <span>Innovating the Future of Technology</span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mb-6 text-[1.8rem] leading-[1.15] font-extrabold text-white xs:text-[2.2rem] md:text-5xl lg:text-[4rem]">
                Transforming Ideas Into{" "}
                <TypingText className="text-gradient-brand" />
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mb-10 max-w-[700px] text-base leading-[1.8] text-slate-400 md:text-[1.2rem]">
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
      <Section id="overview" className="bg-slate-100">
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
                className="group rounded-[20px] border border-transparent bg-white px-[30px] py-10 text-center shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-300 hover:-translate-y-2 hover:border-brand/20 hover:shadow-brand"
              >
                <div className="mx-auto mb-5 flex size-[70px] items-center justify-center rounded-[20px] bg-brand/10 text-[1.8rem] text-brand transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-white">
                  <item.icon />
                </div>
                <h3 className="mb-3 text-[1.3rem]">{item.title}</h3>
                <p className="text-[0.95rem] text-slate-500">
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
                className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-white px-[30px] py-10 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-brand"
              >
                {/* Gradient rule that wipes in across the card top on hover. */}
                <span className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100" />
                <div className="mb-5 flex size-[60px] items-center justify-center rounded-2xl bg-brand/10 text-[1.5rem] text-brand transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-white">
                  <service.icon />
                </div>
                <h3 className="mb-3 text-[1.25rem]">{service.title}</h3>
                <p className="mb-5 text-[0.95rem] text-slate-500">
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
      <Section id="technologies" className="bg-ink">
        <Container>
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
                className="rounded-[20px] border border-ink-3 bg-ink-2 p-[30px] transition-all duration-300 hover:-translate-y-1 hover:border-brand"
              >
                <h3 className="mb-5 flex items-center gap-2.5 text-[1.1rem] text-white">
                  <category.icon className="text-brand-light" />
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 gap-3 xs:grid-cols-2">
                  {category.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 rounded-[10px] bg-white/5 px-3.5 py-2.5 text-[0.9rem] text-slate-400 transition-all duration-300 hover:bg-brand/15 hover:text-white"
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
      <Section className="bg-slate-100">
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
                <div className="relative z-[2] flex size-[60px] min-w-[60px] items-center justify-center rounded-full bg-gradient-brand font-heading text-[1.1rem] font-extrabold text-white shadow-[0_8px_25px_rgb(99_102_241_/_0.3)] md:size-[100px] md:min-w-[100px] md:text-[1.5rem]">
                  {step.number}
                </div>
                <div className="flex-1 rounded-xl bg-white p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] md:p-[30px]">
                  <h3 className="mb-2.5 text-[1.3rem] text-ink">
                    {step.title}
                  </h3>
                  <p className="text-[0.95rem] text-slate-500">
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
