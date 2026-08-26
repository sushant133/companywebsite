import type { Metadata } from "next";

import { ClosingCta } from "@/components/site/closing-cta";
import { Container, PageHeader, Section } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, mobile apps, AI and machine learning, product design, digital marketing and browser-based 3D — what each involves and what we build with.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumb="Services"
        title="Six services, and what each one actually involves"
        intro="No packages or tiers. Tell us the problem and we will tell you which of these it needs, or that it needs none of them."
      />

      <Section>
        <Container>
          <div className="divide-y divide-line border-b border-line">
            {services.map((service, index) => (
              <Reveal
                key={service.slug}
                id={service.slug}
                className="scroll-mt-28 py-14 first:pt-0 md:py-20"
              >
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-sm text-fg-subtle tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-h2">{service.title}</h2>
                    </div>
                    <p className="mt-6 text-lead leading-relaxed text-fg-muted lg:max-w-none">
                      {service.description}
                    </p>
                    <ul className="mt-8 flex flex-wrap gap-2">
                      {service.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-line bg-surface-alt px-2.5 py-1 text-[0.8125rem] text-fg-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:pt-2">
                    <h3 className="text-eyebrow mb-5 uppercase text-fg-subtle">
                      Typical work
                    </h3>
                    <ul className="grid gap-x-8 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="border-t border-line py-3 text-[0.9375rem] text-fg-muted"
                        >
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

      <ClosingCta
        title="Not sure which of these you need?"
        description="Describe the problem rather than the solution and we will tell you what it takes to solve — including when the answer is that you don't need us."
        secondary={{ href: "/products", label: "See our products" }}
      />
    </>
  );
}
