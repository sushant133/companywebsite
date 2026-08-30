import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaCheck,
} from "react-icons/fa6";

import { CtaSection } from "@/components/site/cta-section";
import { Icon } from "@/components/site/icon";
import {
  Container,
  PageBanner,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { plainText } from "@/components/site/rich-text";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/content/schema";
import { getContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getContent("projects");
  return {
    title: "Projects",
    description:
      projects.banner.description || plainText(projects.banner.title),
  };
}

export default async function ProjectsPage() {
  const projects = await getContent("projects");
  const [featured, ...rest] = projects.items;

  return (
    <>
      <PageBanner banner={projects.banner} />

      <Section>
        <Container>
          <SectionHeader
            tag={projects.header.tag}
            title={projects.header.title}
            description={projects.header.description}
          />

          {featured ? (
            /* Visual on the left, the detail on the right, stacking below lg. */
            <Reveal className="grid grid-cols-1 gap-8 overflow-hidden rounded-[20px] border border-slate-200 bg-white p-[30px] shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-300 hover:border-brand/20 hover:shadow-brand md:p-[45px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
              <ProjectVisual project={featured} className="lg:aspect-[4/3]" />

              <div>
                <h3 className="mb-2 text-[1.5rem] text-ink md:text-[1.7rem]">
                  {featured.title}
                </h3>

                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] font-semibold text-brand">
                  {featured.categories.map((category, index) => (
                    <span key={category} className="flex items-center gap-3">
                      {index > 0 ? (
                        <span
                          aria-hidden
                          className="size-1 rounded-full bg-brand/40"
                        />
                      ) : null}
                      {category}
                    </span>
                  ))}
                </div>

                <p className="mb-6 leading-[1.8] text-slate-500">
                  {featured.description}
                </p>

                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {featured.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-[0.95rem] font-medium"
                    >
                      <FaCheck className="shrink-0 text-brand" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mb-7 flex flex-wrap items-center gap-2">
                  <span className="text-[0.85rem] font-semibold text-slate-400">
                    Tech Stack:
                  </span>
                  {featured.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-brand/8 px-4 py-1.5 text-[0.85rem] font-semibold text-brand"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="brand" size="pill">
                    <Link href="/contact">
                      Discuss a Similar Project <FaArrowRight />
                    </Link>
                  </Button>
                  {featured.liveUrl ? (
                    <Button asChild variant="outline-brand" size="pill">
                      <a
                        href={featured.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        View Live <FaArrowUpRightFromSquare />
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ) : (
            <p className="text-center leading-[1.8] text-slate-500">
              Delivered work will be listed here shortly.
            </p>
          )}

          {/* Appears on its own once a second project lands in the content. */}
          {rest.length > 0 ? (
            <div className="mt-[30px] grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, index) => (
                <Reveal
                  key={project.slug}
                  delay={(index + 1) * 100}
                  className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-300 hover:-translate-y-2 hover:border-brand/20 hover:shadow-brand"
                >
                  <ProjectVisual project={project} rounded={false} />
                  <div className="p-7">
                    <h3 className="mb-1.5 text-[1.15rem] text-ink">
                      {project.title}
                    </h3>
                    <p className="mb-3 text-[0.85rem] font-semibold text-brand">
                      {project.categories.join(" · ")}
                    </p>
                    <p className="mb-4 text-[0.9rem] leading-[1.75] text-slate-500">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-brand/8 px-3 py-1 text-[0.8rem] font-semibold text-brand"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : null}
        </Container>
      </Section>

      <CtaSection cta={projects.cta} />
    </>
  );
}

/**
 * A screenshot when the project has one; otherwise the project mark on the
 * brand gradient, so the panel reads as artwork rather than a missing image.
 */
function ProjectVisual({
  project,
  className,
  rounded = true,
}: {
  project: Project;
  className?: string;
  rounded?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden border-slate-200 ${
        rounded ? "rounded-2xl border" : "border-b"
      } ${className ?? ""}`}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-brand" />
          <div
            aria-hidden
            className="dot-pattern absolute inset-0 opacity-40 mix-blend-overlay"
          />
          <div
            aria-hidden
            className="absolute -right-10 -bottom-12 size-44 rounded-full bg-white/10"
          />
          <Icon
            name={project.icon}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[3.5rem] text-white/90"
          />
        </>
      )}
    </div>
  );
}
