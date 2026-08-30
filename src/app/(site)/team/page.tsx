import type { Metadata } from "next";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa6";

import {
  Container,
  PageBanner,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { plainText } from "@/components/site/rich-text";
import { StatsBar, type Stat } from "@/components/site/stats-bar";
import type { TeamMember } from "@/lib/content/schema";
import { getContent } from "@/lib/content/store";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const team = await getContent("team");
  return {
    title: "Our Team",
    description: team.banner.description || plainText(team.banner.title),
  };
}

/** Initials stand in until real portraits exist. */
function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default async function TeamPage() {
  const [team, services] = await Promise.all([
    getContent("team"),
    getContent("services"),
  ]);

  const teamSize = team.groups.reduce(
    (n, group) => n + group.members.length,
    0,
  );

  /**
   * Figures about the people rather than the site-wide set, counted off the
   * team and services content so they cannot drift as the roster changes.
   */
  const teamStats: Stat[] = [
    { icon: "FaUsers", value: String(teamSize), label: "Team Members" },
    {
      icon: "FaSitemap",
      value: String(team.groups.length),
      label: "Specialist Teams",
    },
    {
      icon: "FaLayerGroup",
      value: String(services.items.length),
      label: "Service Areas Covered",
    },
    {
      icon: "FaMicrochip",
      value: String(
        new Set(services.items.flatMap((service) => service.tech)).size,
      ),
      label: "Technologies Mastered",
    },
  ];

  const leadership = team.groups.filter(
    (group) => group.layout === "leadership",
  );
  const specialists = team.groups.filter(
    (group) => group.layout !== "leadership",
  );

  return (
    <>
      <PageBanner banner={team.banner} overlap />

      {/* ---- Stats, straddling the banner edge ---- */}
      <StatsBar stats={teamStats} />

      <Section>
        <Container>
          {leadership.map((group) => (
            <div key={group.title}>
              <SectionHeader
                tag={team.leadershipHeader.tag}
                title={team.leadershipHeader.title}
                description={team.leadershipHeader.description || group.blurb}
              />

              {/* Two wide cards, portrait beside the quote. */}
              <div className="mb-16 grid grid-cols-1 gap-[30px] lg:grid-cols-2">
                {group.members.map((member, index) => (
                  <Reveal
                    key={member.name}
                    delay={(index + 1) * 100}
                    className="flex flex-col gap-6 rounded-[20px] border border-slate-200 bg-white p-[30px] shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-brand sm:flex-row sm:items-start"
                  >
                    <Avatar
                      member={member}
                      className="size-[120px] text-[2rem]"
                      sizePx={120}
                    />
                    <div className="min-w-0 text-center sm:text-left">
                      <h3 className="text-[1.25rem] text-ink">{member.name}</h3>
                      <span className="mb-4 block text-[0.9rem] font-semibold text-brand">
                        {member.role}
                      </span>
                      <FaQuoteLeft
                        aria-hidden
                        className="mx-auto mb-2 text-[1.1rem] text-brand/30 sm:mx-0"
                      />
                      <p className="text-[0.95rem] leading-[1.8] text-slate-500">
                        {member.bio}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          {specialists.map((group) => (
            <div key={group.title} className="mb-16 last:mb-0">
              <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
                <h2 className="mb-3 flex items-center justify-center gap-3 text-[1.6rem] text-ink md:text-[1.9rem]">
                  <span aria-hidden className="h-px w-8 bg-brand" />
                  Our {group.title}
                </h2>
                <p className="text-[0.98rem] leading-[1.8] text-slate-500">
                  {group.blurb}
                </p>
              </Reveal>

              <div className="grid grid-cols-1 gap-[30px] xs:grid-cols-2 lg:grid-cols-4">
                {group.members.map((member, index) => (
                  <Reveal
                    key={member.name}
                    delay={(index + 1) * 100}
                    className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-300 hover:-translate-y-2 hover:border-brand/20 hover:shadow-brand"
                  >
                    {/* Tinted band the portrait straddles. Kept faint: the
                        avatar carries the colour, the card stays calm. */}
                    <div className="relative">
                      <div
                        className={cn(
                          "h-[70px] bg-linear-135 opacity-10",
                          member.gradient,
                        )}
                      />
                      <Avatar
                        member={member}
                        className="absolute top-[18px] left-1/2 size-[92px] -translate-x-1/2 border-4 border-white text-[1.5rem]"
                        sizePx={92}
                      />
                    </div>

                    <div className="px-6 pt-[54px] pb-7 text-center">
                      <h3 className="mb-1 text-[1.1rem] text-ink">
                        {member.name}
                      </h3>
                      <span className="mb-3 block text-[0.85rem] font-semibold text-brand">
                        {member.role}
                      </span>
                      <p className="text-[0.9rem] leading-[1.75] text-slate-500">
                        {member.bio}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}

/** A portrait once one is set in the dashboard, initials on a gradient until then. */
function Avatar({
  member,
  className,
  sizePx,
}: {
  member: TeamMember;
  className?: string;
  sizePx: number;
}) {
  if (member.image) {
    return (
      <Image
        src={member.image}
        alt={member.name}
        width={sizePx}
        height={sizePx}
        className={cn("shrink-0 rounded-full object-cover", className)}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-linear-135 font-heading font-bold text-white",
        member.gradient || "from-[#6366f1] to-[#0ea5e9]",
        className,
      )}
    >
      {initialsOf(member.name)}
    </div>
  );
}
