import type { Metadata } from "next";
import { FaArrowRight, FaCheck } from "react-icons/fa6";

import { CtaSection } from "@/components/site/cta-section";
import {
  Container,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end digital services from MantraSphere Innovations: web and mobile development, AI and machine learning, UI/UX design, digital marketing, and 3D/4D development.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Our" highlight="Services" crumb="Services" />

      <Section>
        <Container>
          <SectionHeader
            tag="What We Do"
            title={
              <>
                Comprehensive Digital{" "}
                <span className="text-gradient-brand">Solutions</span>
              </>
            }
            description="We offer end-to-end digital services designed to transform your business and accelerate growth."
          />

          {services.map((service, index) => (
            <Reveal
              key={service.slug}
              className="group ring-gradient relative mb-[30px] flex flex-col gap-5 overflow-hidden rounded-[24px] card-surface p-[30px] transition-all duration-300 hover:-translate-y-1 hover:shadow-float md:flex-row md:gap-10 md:p-[50px]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-16 size-56 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative min-w-20 text-center">
                <div className="mb-3 flex size-20 items-center justify-center rounded-[22px] bg-gradient-brand text-[1.9rem] text-white shadow-[0_10px_28px_rgb(99_102_241_/_0.35),inset_0_1px_0_rgb(255_255_255_/_0.25)]">
                  <service.icon />
                </div>
                <span className="font-heading text-[1.4rem] font-extrabold text-slate-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <h3 className="mb-4 text-[1.6rem] text-ink">{service.title}</h3>
                <p className="mb-6 leading-[1.8] text-slate-500">
                  {service.description}
                </p>

                <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-[0.95rem] font-medium"
                    >
                      <FaCheck className="shrink-0 text-brand" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-brand/15 bg-brand/[0.07] px-4 py-1.5 text-[0.8125rem] font-semibold text-brand transition-colors hover:border-brand/35 hover:bg-brand/12"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </Section>

      <CtaSection
        title="Need a Custom Solution?"
        description="Let's discuss how our services can help your business grow. Contact us for a free consultation."
        primary={{
          href: "/contact",
          label: "Contact Us",
          icon: <FaArrowRight />,
        }}
        secondary={{ href: "/products", label: "View Products" }}
      />
    </>
  );
}
