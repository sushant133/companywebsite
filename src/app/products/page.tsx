import type { Metadata } from "next";

import { ClosingCta } from "@/components/site/closing-cta";
import { Container, PageHeader, Section } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Nine platforms MantraSphere built and licences — for restaurants, hospitals, hotels, parking operators, marketing teams and more.",
};

const featured = products.filter((p) => p.featured);
const rest = products.filter((p) => !p.featured);

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        crumb="Products"
        title="Nine platforms we built, and licence"
        intro="Each of these started as client work and became a product. If one covers most of what you need, deploying and adapting it is faster and cheaper than starting from nothing."
      />

      {/* The three most established get room to breathe; the remaining six
          follow in a denser grid. A flat nine-card grid gave a niche tool
          the same weight as the platform that pays the bills. */}
      <Section>
        <Container>
          <h2 className="text-eyebrow mb-8 uppercase text-fg-subtle">
            Most deployed
          </h2>
          <Reveal className="grid gap-6 lg:grid-cols-3">
            {featured.map((product) => (
              <article
                key={product.title}
                className="flex flex-col rounded-xl border border-line bg-surface p-8 shadow-card"
              >
                <product.icon className="size-6 text-brand" />
                <p className="mt-6 text-eyebrow uppercase text-fg-subtle">
                  {product.sector}
                </p>
                <h3 className="mt-2 text-h3">{product.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                  {product.description}
                </p>
                <ul className="mt-6 space-y-2 border-t border-line pt-5">
                  {product.features.map((feature) => (
                    <li key={feature} className="text-sm text-fg-muted">
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section size="tight" className="border-t border-line">
        <Container>
          <h2 className="text-eyebrow mb-8 uppercase text-fg-subtle">
            Also available
          </h2>
          <Reveal className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((product) => (
              <article
                key={product.title}
                className="border-t border-line pt-5"
              >
                <div className="flex items-center gap-2.5">
                  <product.icon className="size-4 text-brand" />
                  <p className="text-eyebrow uppercase text-fg-subtle">
                    {product.sector}
                  </p>
                </div>
                <h3 className="mt-3 text-h3">{product.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-muted">
                  {product.description}
                </p>
              </article>
            ))}
          </Reveal>
        </Container>
      </Section>

      <ClosingCta
        title="Want to see one of these running?"
        description="Tell us which platform and roughly how you'd use it, and we'll set up a walkthrough against real data rather than a slide deck."
        primary={{ href: "/contact", label: "Request a walkthrough" }}
        secondary={{ href: "/services", label: "Custom build instead" }}
      />
    </>
  );
}
