import type { Metadata } from "next";
import { FaUser } from "react-icons/fa6";

import {
  Container,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { teamGroups } from "@/lib/data/team";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership, development, design, and marketing team behind MantraSphere Innovations.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader title="Our" highlight="Team" crumb="Team" />

      <Section>
        <Container>
          <SectionHeader
            tag="Meet the Team"
            title={
              <>
                The Minds Behind{" "}
                <span className="text-gradient-brand">MantraSphere</span>
              </>
            }
            description="Our talented team of professionals brings together diverse expertise to deliver exceptional results."
          />

          {teamGroups.map((group, groupIndex) => (
            <div key={group.title}>
              <Reveal>
                <h3
                  className={cn(
                    "mb-[30px] inline-block border-b-[3px] border-brand pb-2.5 text-[1.5rem] text-ink",
                    groupIndex > 0 && "mt-[50px]",
                  )}
                >
                  {group.title}
                </h3>
              </Reveal>

              <div
                className={cn(
                  "mb-5 grid grid-cols-1 gap-[30px] xs:grid-cols-2",
                  group.layout === "leadership"
                    ? "md:grid-cols-3"
                    : "md:grid-cols-3 lg:grid-cols-4",
                )}
              >
                {group.members.map((member, index) => (
                  <Reveal
                    key={member.name}
                    delay={(index + 1) * 100}
                    className="group ring-gradient relative rounded-[22px] card-surface p-[30px] text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float"
                  >
                    <div className="mb-5">
                      <div
                        className={cn(
                          "mx-auto flex size-[112px] items-center justify-center rounded-full bg-linear-135 text-[2.35rem] text-white shadow-[0_10px_28px_rgb(15_23_42_/_0.18),inset_0_2px_0_rgb(255_255_255_/_0.25)] ring-4 ring-white transition-transform duration-300 group-hover:scale-[1.04]",
                          member.gradient,
                        )}
                      >
                        <FaUser />
                      </div>
                    </div>
                    <h4 className="mb-1 text-[1.15rem]">{member.name}</h4>
                    <span className="mb-2.5 block text-[0.9rem] font-semibold text-brand">
                      {member.role}
                    </span>
                    <p className="text-[0.9rem] text-slate-500">{member.bio}</p>
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
