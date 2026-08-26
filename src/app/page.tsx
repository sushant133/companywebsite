import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { CtaSection } from "@/components/site/cta-section";
import { FaqSection } from "@/components/site/faq-section";
import { Hero } from "@/components/site/hero";
import {
  Container,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { overviewItems, processSteps, techCategories } from "@/lib/data/home";
import { services } from "@/lib/data/services";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ---- Services ----
          The core offer, and the only section on this page that uses cards.
          Everything below deliberately uses a different structure so the
          page does not read as three identical grids in a row. */}
      <Section>
        <Container>
          <SectionHeader
            label="What we do"
            title={
              <>
                Six services, one team{" "}
                <span className="text-brand-strong">behind all of them</span>
              </>
            }
            description="Most clients arrive needing one of these and end up using two. Everything is delivered by the same nine people, not subcontracted out."
          />

          <div className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href="/services"
                className="group flex flex-col bg-white p-7 transition-colors hover:bg-slate-50"
              >
                <service.icon className="size-5 text-brand-strong" />
                <h3 className="mt-5 text-card-title">{service.title}</h3>
                <p className="mt-2.5 flex-1 text-body text-slate-600">
                  {service.teaser}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-strong">
                  Learn more
                  <FaArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Why work with us ----
          Was six identical cards. Now a two-column list: no card chrome, no
          hover lift, just the points and room to read them. */}
      <Section className="border-y border-slate-200 bg-slate-50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeader
              className="mb-0"
              align="start"
              label="Why work with us"
              title={
                <>
                  The parts that usually{" "}
                  <span className="text-brand-strong">go wrong</span>
                </>
              }
              description="Every agency promises quality and delivery. These are the specific commitments we make about how a project actually runs."
            />

            <Reveal className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {overviewItems.map((item) => (
                <div key={item.title}>
                  <item.icon className="size-[1.15rem] text-brand-strong" />
                  <h3 className="mt-3.5 text-card-title">{item.title}</h3>
                  <p className="mt-2 text-body text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- Process ----
          Four numbered steps in a row. The vertical timeline with 100px
          gradient circles was giving four short paragraphs the visual weight
          of the entire services offer. */}
      <Section>
        <Container>
          <SectionHeader
            label="How we work"
            title={
              <>
                From first call to{" "}
                <span className="text-brand-strong">handover</span>
              </>
            }
            description="Four stages, with a written scope and a fixed price agreed before any code is written."
          />

          <Reveal className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.number} className="border-t border-slate-900 pt-5">
                <span className="font-heading text-sm font-semibold text-slate-400 tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-2.5 text-card-title">{step.title}</h3>
                <p className="mt-2 text-body text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ---- Tech ----
          One dark band with grouped chips, replacing six dark boxed cards on
          a full dark section. A list of tool names does not need the same
          real estate as the company's actual offer. */}
      <Section id="technologies" className="bg-ink">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeader
              className="mb-0"
              align="start"
              dark
              label="Tech stack"
              title={
                <>
                  Chosen per project,{" "}
                  <span className="text-brand-light">not per habit</span>
                </>
              }
              description="We work across these day to day and pick per project rather than fitting every problem to one stack."
            />

            <Reveal className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {techCategories.map((category) => (
                <div key={category.title}>
                  <h3 className="flex items-center gap-2.5 text-sm font-semibold text-white">
                    <category.icon className="size-4 text-brand-light" />
                    {category.title}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {category.items.map((item) => (
                      <li
                        key={item.label}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300"
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      <FaqSection />

      <CtaSection
        title="Have a project in mind?"
        description="Send us the outline and we'll come back within one working day with questions, a rough scope and an honest read on whether we're the right fit."
        primary={{ href: "/contact", label: "Start a project" }}
        secondary={{ href: "/services", label: "Browse services" }}
      />
    </>
  );
}
