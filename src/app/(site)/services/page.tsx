import type { Metadata } from "next";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

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
import { StatsBar } from "@/components/site/stats-bar";
import { getContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const services = await getContent("services");
  return {
    title: "Services",
    description:
      services.banner.description ||
      plainText(services.banner.title),
  };
}

export default async function ServicesPage() {
  const services = await getContent("services");

  return (
    <>
      {/* ---- Banner ---- */}
      <PageBanner banner={services.banner} overlap />

      {/* ---- Stats, straddling the hero edge ---- */}
      <StatsBar />

      {/* ---- The services themselves ---- */}
      <Section>
        <Container>
          <SectionHeader
            tag={services.header.tag}
            title={services.header.title}
            description={services.header.description}
          />

          {services.items.map((service, index) => (
            <Reveal
              key={service.slug}
              className="mb-[30px] grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[20px] border border-slate-200 bg-white p-[30px] shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-300 hover:border-brand/20 hover:shadow-brand md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 md:p-[45px] lg:grid-cols-[auto_minmax(0,1fr)_300px]"
            >
              <div className="min-w-20 self-start text-center">
                <div className="mb-3 flex size-20 items-center justify-center rounded-[20px] bg-gradient-brand text-[2rem] text-white">
                  <Icon name={service.icon} />
                </div>
                <span className="font-heading text-[1.5rem] font-extrabold text-slate-200">
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
                      className="rounded-full bg-brand/8 px-4 py-1.5 text-[0.85rem] font-semibold text-brand"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative: the heading and copy already name the service. */}
              {service.image ? (
                <div className="relative aspect-[16/9] w-full self-center overflow-hidden rounded-2xl border border-slate-200 md:col-span-2 lg:col-span-1 lg:aspect-[5/4]">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 90vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </Reveal>
          ))}
        </Container>
      </Section>

      <CtaSection cta={services.cta} />
    </>
  );
}
