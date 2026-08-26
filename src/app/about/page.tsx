import type { Metadata } from "next";
import Image from "next/image";

import { ClosingCta } from "@/components/site/closing-cta";
import { Container, PageHeader, Section } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { industries, positions } from "@/lib/data/about";
import { processSteps } from "@/lib/data/home";

export const metadata: Metadata = {
  title: "About",
  description:
    "MantraSphere Innovations is a nine-person software studio in Siraha, Nepal, building web and mobile products and licensing nine of its own platforms.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="A small studio in Siraha, building software that has to last"
        intro="We started MantraSphere in 2025 to do a narrower job than most agencies attempt, and to do it without handing the work to whoever was free that week."
      />

      {/* ---- Story ---- */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <div className="space-y-5 text-lead leading-relaxed text-fg-muted">
                <p>
                  Most software projects do not fail at the build. They fail
                  afterwards — when the agency moves on, nobody documented the
                  deployment, and the client is left with a codebase no other
                  developer wants to touch.
                </p>
                <p>
                  We organised around that. Nine people, a deliberately short
                  list of services, and a handover process treated as part of
                  the work rather than an afterthought at the end of it.
                  Documentation, architecture notes and a walkthrough ship with
                  every project, whether or not you keep us on afterwards.
                </p>
                <p>
                  Alongside client work we maintain nine of our own platforms,
                  across restaurants, hospitals, hotels, parking, marketing and
                  3D. That product line is why we can be honest when a custom
                  build is the wrong answer — we usually have something close
                  already running.
                </p>
              </div>
            </Reveal>

            <Reveal animation="fade-left">
              <figure>
                <Image
                  src="/images/about.jpg"
                  alt="MantraSphere Innovations"
                  width={520}
                  height={420}
                  className="w-full rounded-xl border border-line object-cover"
                />
                <figcaption className="mt-4 text-sm text-fg-subtle">
                  Dhangadhimai-10, Siraha — Madhesh Pradesh, Nepal.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- Positions ----
          Replaces the six "core values" cards. A value only means something
          if a reasonable competitor might disagree with it. */}
      <Section className="border-y border-line bg-surface-alt">
        <Container>
          <h2 className="text-h2 mb-12 max-w-2xl md:mb-16">
            Four things we would rather be judged on
          </h2>
          <Reveal className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {positions.map((position, index) => (
              <div key={position.title} className="border-t border-fg pt-5">
                <p className="font-display text-sm text-fg-subtle tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-h3">{position.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-muted">
                  {position.body}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ---- Process ---- */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
            <div>
              <p className="eyebrow mb-5">How a project runs</p>
              <h2 className="text-h2">From first call to handover</h2>
            </div>
            <Reveal>
              <ol className="border-t border-line">
                {processSteps.map((step) => (
                  <li
                    key={step.number}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 border-b border-line py-6"
                  >
                    <span className="font-display text-sm text-fg-subtle tabular-nums">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-h3">{step.title}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- Sectors ---- */}
      <Section size="tight" className="border-t border-line">
        <Container>
          <h2 className="text-eyebrow mb-8 uppercase text-fg-subtle">
            Sectors we have built for
          </h2>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((industry) => (
              <li
                key={industry.title}
                className="flex items-center gap-3 border-t border-line py-4 text-[0.9375rem]"
              >
                <industry.icon className="size-4 shrink-0 text-fg-subtle" />
                {industry.title}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClosingCta
        title="Think we might suit each other?"
        description="Send over what you're planning. If we're not the right fit we'll say so early, and point you at someone who is where we can."
        secondary={{ href: "/team", label: "Meet the team" }}
      />
    </>
  );
}
