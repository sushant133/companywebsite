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
                className="group ring-gradient relative flex flex-col overflow-hidden rounded-[22px] card-surface px-[30px] py-10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-16 size-48 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative mb-5 flex items-start justify-between">
                  <div className="flex size-16 items-center justify-center rounded-[18px] bg-gradient-to-br from-brand/12 to-brand-sky/12 text-[1.7rem] text-brand shadow-[inset_0_1px_0_rgb(255_255_255_/_0.7)] transition-all duration-300 group-hover:bg-gradient-brand group-hover:from-transparent group-hover:to-transparent group-hover:text-white group-hover:shadow-glow">
                    <product.icon />
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3.5 py-1 text-[0.75rem] font-bold tracking-[1px] uppercase",
                      product.featured
                        ? "bg-gradient-brand text-white shadow-[0_4px_14px_rgb(99_102_241_/_0.35)]"
                        : "border border-brand/15 bg-brand/[0.07] text-brand",
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
