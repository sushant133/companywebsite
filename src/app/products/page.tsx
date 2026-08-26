import type { Metadata } from "next";
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";

import { CtaSection } from "@/components/site/cta-section";
import {
  Container,
  PageHeader,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { products } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Ready-to-deploy software products from MantraSphere Innovations, covering hospitality, healthcare, retail, parking, marketing, AI/ML, and immersive 3D.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader title="Our" highlight="Products" crumb="Products" />

      <Section>
        <Container>
          <SectionHeader
            tag="Our Products"
            title={
              <>
                Ready-to-Deploy{" "}
                <span className="text-gradient-brand">Solutions</span>
              </>
            }
            description="Explore our lineup of industry-specific software products designed to streamline operations and boost efficiency."
          />

          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Reveal
                key={product.title}
                delay={((index % 3) + 1) * 100}
                className="flex flex-col rounded-[20px] border border-slate-200 bg-white px-[30px] py-10 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-brand"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-brand/10 text-[1.8rem] text-brand">
                    <product.icon />
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3.5 py-1 text-[0.75rem] font-bold tracking-[1px] uppercase",
                      product.featured
                        ? "bg-gradient-brand text-white"
                        : "bg-brand/10 text-brand",
                    )}
                  >
                    {product.badge}
                  </span>
                </div>

                <h3 className="mb-3.5 text-[1.35rem]">{product.title}</h3>
                <p className="mb-6 text-[0.95rem] leading-[1.7] text-slate-500">
                  {product.description}
                </p>

                <ul className="flex-1">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 border-b border-slate-100 py-2 text-[0.95rem] text-ink-3 last:border-b-0"
                    >
                      <FaCircleCheck className="shrink-0 text-[0.9rem] text-brand" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Interested in Our Products?"
        description="Request a free demo or get a custom quote tailored to your business needs."
        primary={{
          href: "/contact",
          label: "Request Demo",
          icon: <FaArrowRight />,
        }}
        secondary={{ href: "/contact", label: "Get Custom Quote" }}
      />
    </>
  );
}
