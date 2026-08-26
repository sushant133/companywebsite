import type { Metadata } from "next";
import { FaCheck } from "react-icons/fa6";

import { CtaSection } from "@/components/site/cta-section";
import {
  Container,
  PageHeader,
  Section,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, mobile apps, AI and machine learning, UI/UX design, digital marketing and 3D development — what each involves and the tools we build with.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumb="Services"
        title="What we build, and"
        highlight="what that involves"
        intro="Six service lines, all delivered in-house. Tell us the problem and we will tell you which of these it needs — or that it needs none of them."
      />

      <Section>
        <Container>
          <div className="divide-y divide-slate-200">
            {services.map((service, index) => (
              <Reveal
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28 py-12 first:pt-0 md:py-16"
              >
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-sm font-semibold text-slate-400 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <service.icon className="size-5 text-brand-strong" />
                    </div>
                    <h2 className="mt-4 text-section">{service.title}</h2>
                    <p className="mt-4 text-lead text-slate-600">
                      {service.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:pt-14">
                    <h3 className="section-label mb-4 text-slate-500">
                      Typical work
                    </h3>
                    <ul className="grid gap-x-8 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 border-t border-slate-200 py-3 text-body text-slate-600"
                        >
                          <FaCheck className="mt-1.5 size-3 shrink-0 text-brand-strong" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Not sure which of these you need?"
        description="Describe the problem rather than the solution and we will tell you what it takes to solve, including when the honest answer is that you don't need us."
        primary={{ href: "/contact", label: "Get in touch" }}
        secondary={{ href: "/products", label: "View products" }}
      />
    </>
  );
}
