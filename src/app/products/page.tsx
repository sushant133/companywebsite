import type { Metadata } from "next";
import { FaCheck } from "react-icons/fa6";

import { CtaSection } from "@/components/site/cta-section";
import {
  Container,
  PageHeader,
  Section,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { products } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Nine platforms MantraSphere built and licences — covering restaurants, hospitals, hotels, parking, marketing, AI and 3D.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        crumb="Products"
        title="Nine platforms we built"
        highlight="and licence"
        intro="Each of these started as client work and became a product. Where one already covers most of what you need, deploying and adapting it beats commissioning a build from scratch."
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Reveal
                key={product.title}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-7 transition-colors hover:border-slate-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <product.icon className="size-5 text-brand-strong" />
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide uppercase",
                      product.featured
                        ? "bg-brand-soft text-brand-dark"
                        : "bg-slate-100 text-slate-500",
                    )}
                  >
                    {product.badge}
                  </span>
                </div>

                <h2 className="mt-5 text-card-title">{product.title}</h2>
                <p className="mt-2.5 text-body text-slate-600">
                  {product.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-slate-200 pt-5">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-body text-slate-600"
                    >
                      <FaCheck className="mt-1.5 size-2.5 shrink-0 text-brand-strong" />
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
        title="Want to see one of these running?"
        description="Tell us which platform and roughly how you would use it, and we will set up a walkthrough against real data rather than a slide deck."
        primary={{ href: "/contact", label: "Request a demo" }}
        secondary={{ href: "/services", label: "Custom build instead" }}
      />
    </>
  );
}
