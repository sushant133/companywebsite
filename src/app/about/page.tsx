import type { Metadata } from "next";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CtaSection } from "@/components/site/cta-section";
import {
  Container,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import {
  aboutHighlights,
  coreValues,
  differentiators,
  foundationCards,
  industries,
} from "@/lib/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "MantraSphere Innovations is a software development studio in Siraha, Nepal, building web and mobile products and licensing nine of its own platforms.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="A studio in Siraha, building"
        highlight="software that lasts"
        intro="We started MantraSphere to do a narrower job than most agencies attempt, and to do it without handing the work to whoever happened to be free that week."
      />

      {/* ---- Story ---- */}
      <Section>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <p className="section-label mb-4 text-brand-strong">
                <span aria-hidden className="h-px w-6 bg-current opacity-50" />
                Who we are
              </p>
              <h2 className="text-section">
                Most projects don&apos;t fail at the build.{" "}
                <span className="text-brand-strong">
                  They fail after the handover.
                </span>
              </h2>
              <div className="mt-6 space-y-4 text-lead text-slate-600">
                <p>
                  The agency moves on, nobody wrote down how deployment works,
                  and the client is left holding a codebase no other developer
                  wants to touch. We organised the studio around not doing that.
                </p>
                <p>
                  A deliberately short list of services, delivered by the same
                  people from discovery through to launch, with documentation
                  and a walkthrough treated as part of the work rather than an
                  afterthought once the invoice clears.
                </p>
                <p>
                  Alongside client projects we build and maintain nine platforms
                  of our own, across hospitality, healthcare, transport,
                  marketing and 3D. That product line is why we can tell you
                  honestly when a custom build is the wrong answer.
                </p>
              </div>

              <dl className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {aboutHighlights.map((item) => (
                  <div key={item.title}>
                    <dt className="flex items-center gap-2.5 text-card-title">
                      <item.icon className="size-4 text-brand-strong" />
                      {item.title}
                    </dt>
                    <dd className="mt-1.5 text-body text-slate-600">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal animation="fade-left">
              <figure>
                <Image
                  src="/images/about.jpg"
                  alt="MantraSphere Innovations"
                  width={560}
                  height={440}
                  className="w-full rounded-xl border border-slate-200 object-cover"
                />
                <figcaption className="mt-3 text-sm text-slate-500">
                  Dhangadhimai-10, Siraha — Madhesh Pradesh, Nepal.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- Mission / vision / values ---- */}
      <Section className="border-y border-slate-200 bg-slate-50">
        <Container>
          <SectionHeader
            label="Our foundation"
            title={
              <>
                What we&apos;re working towards,{" "}
                <span className="text-brand-strong">and how</span>
              </>
            }
            description="The three statements we check decisions against when a project forces a trade-off."
          />

          <Reveal className="grid gap-6 lg:grid-cols-3">
            {foundationCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-slate-200 bg-white p-7"
              >
                <div className="flex items-center gap-3">
                  <card.icon className="size-5 text-brand-strong" />
                  <span className="font-heading text-sm font-semibold text-slate-400 tabular-nums">
                    {card.label}
                  </span>
                </div>
                <h3 className="mt-5 text-card-title">{card.title}</h3>
                <p className="mt-2.5 text-body text-slate-600">{card.body}</p>
                <ul className="mt-5 space-y-2 border-t border-slate-200 pt-5">
                  {card.points.map((point) => (
                    <li key={point} className="text-body text-slate-600">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ---- Values ----
          Plain two-column list. These were six centred cards with circular
          icon badges that scaled and recoloured on hover — a lot of chrome
          around one sentence each. */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeader
              className="mb-0"
              align="start"
              label="What defines us"
              title={
                <>
                  The principles we actually{" "}
                  <span className="text-brand-strong">argue about</span>
                </>
              }
            />
            <Reveal className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {coreValues.map((value) => (
                <div key={value.title}>
                  <value.icon className="size-[1.15rem] text-brand-strong" />
                  <h3 className="mt-3.5 text-card-title">{value.title}</h3>
                  <p className="mt-2 text-body text-slate-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- What makes us different ---- */}
      <Section className="border-y border-slate-200 bg-slate-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeader
              className="mb-0"
              align="start"
              label="Why choose us"
              title={
                <>
                  What you get that you{" "}
                  <span className="text-brand-strong">might not elsewhere</span>
                </>
              }
              description="Four things that come up most often when clients explain why they stayed with us."
            />

            <Accordion
              type="single"
              collapsible
              className="border-t border-slate-200"
            >
              {differentiators.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  value={`wcp-${index}`}
                  className="border-b border-slate-200"
                >
                  <AccordionTrigger className="rounded-none py-5 text-left text-[1rem] font-semibold text-ink hover:no-underline **:data-[slot=accordion-trigger-icon]:text-slate-400">
                    <span className="flex items-center gap-3">
                      <item.icon className="size-4 shrink-0 text-brand-strong" />
                      {item.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[62ch] pt-0 pb-5 text-body text-slate-600">
                    {item.body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* ---- Industries ---- */}
      <Section size="tight">
        <Container>
          <h2 className="section-label mb-6 text-slate-500">
            Sectors we have built for
          </h2>
          <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((industry) => (
              <li
                key={industry.title}
                className="flex items-center gap-3 border-t border-slate-200 py-4 text-body text-slate-700"
              >
                <industry.icon className="size-4 shrink-0 text-slate-400" />
                {industry.title}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaSection
        title="Think we might suit each other?"
        description="Send over what you're planning. If we're not the right fit we'll say so early, and point you somewhere better where we can."
        primary={{ href: "/contact", label: "Get in touch" }}
        secondary={{ href: "/team", label: "Meet the team" }}
      />
    </>
  );
}
