import type { Metadata } from "next";

import { ClosingCta } from "@/components/site/closing-cta";
import { Container, PageHeader, Section } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { initials, teamGroups } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The nine people at MantraSphere Innovations — leadership, engineering, design and marketing.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        crumb="Team"
        title="Nine people, and you'll work with several of them"
        intro="There is no delivery team behind the team you meet. Everyone listed here works on client projects."
      />

      <Section>
        <Container>
          <div className="divide-y divide-line">
            {teamGroups.map((group) => (
              <Reveal key={group.title} className="py-12 first:pt-0 md:py-16">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
                  <h2 className="text-eyebrow uppercase text-fg-subtle lg:pt-1">
                    {group.title}
                  </h2>

                  <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
                    {group.members.map((member) => (
                      <li key={member.name} className="flex gap-4">
                        {/* Monogram rather than a stock user glyph on a
                            coloured gradient — it identifies the person
                            instead of decorating the card. */}
                        <span
                          aria-hidden
                          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-sm font-medium text-brand"
                        >
                          {initials(member.name)}
                        </span>
                        <div>
                          <h3 className="text-h3">{member.name}</h3>
                          <p className="mt-0.5 text-sm text-brand">
                            {member.role}
                          </p>
                          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-muted">
                            {member.bio}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingCta
        title="Want to work with this lot?"
        description="We take on a limited number of projects at a time, which is the trade-off for everyone here being on the actual work."
        secondary={{ href: "/about", label: "How we work" }}
      />
    </>
  );
}
