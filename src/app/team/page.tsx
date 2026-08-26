import type { Metadata } from "next";

import { CtaSection } from "@/components/site/cta-section";
import {
  Container,
  PageHeader,
  Section,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { teamGroups } from "@/lib/data/team";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people behind MantraSphere Innovations — leadership, engineering, design and marketing.",
};

/** Two initials, used in place of a stock user glyph on a coloured circle. */
function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        crumb="Team"
        title="The people who will"
        highlight="actually build it"
        intro="There is no delivery team behind the team you meet. Everyone listed here works directly on client projects."
      />

      <Section>
        <Container>
          <div className="divide-y divide-slate-200">
            {teamGroups.map((group) => (
              <Reveal key={group.title} className="py-12 first:pt-0 md:py-14">
                <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
                  <h2 className="section-label text-slate-500 lg:pt-1">
                    {group.title}
                  </h2>

                  <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                    {group.members.map((member) => (
                      <li key={member.name} className="flex gap-4">
                        <span
                          aria-hidden
                          className={cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-135 font-heading text-sm font-semibold text-white",
                            member.gradient,
                          )}
                        >
                          {initials(member.name)}
                        </span>
                        <div>
                          <h3 className="text-card-title">{member.name}</h3>
                          <p className="mt-0.5 text-sm font-medium text-brand-strong">
                            {member.role}
                          </p>
                          <p className="mt-2 text-body text-slate-600">
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

      <CtaSection
        title="Want to work with this team?"
        description="We take on a limited number of projects at a time, which is the trade-off for everyone here being on the actual work."
        primary={{ href: "/contact", label: "Start a project" }}
        secondary={{ href: "/about", label: "How we work" }}
      />
    </>
  );
}
