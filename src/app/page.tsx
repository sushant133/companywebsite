import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClosingCta } from "@/components/site/closing-cta";
import {
  Container,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { commitments, faqs, processSteps, techGroups } from "@/lib/data/home";
import { products } from "@/lib/data/products";
import { services } from "@/lib/data/services";

const featuredProducts = products.filter((p) => p.featured);

export default function HomePage() {
  return (
    <>
      {/* ---- Hero ----
          Left-aligned and text-first. The centred, particle-filled,
          full-viewport version it replaces spent a whole screen saying
          less than these four lines do. */}
      <section className="border-b border-line bg-surface-alt pt-36 pb-20 md:pt-44 md:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow mb-6">Siraha, Nepal</p>
              <h1 className="text-display">
                We build software for businesses that need it to keep working.
              </h1>
              <p className="measure mt-7 text-lead text-fg-muted">
                MantraSphere is a nine-person development studio. We take on web
                and mobile projects end to end — discovery, design, build and
                the handover that lets your own team take it from there.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild variant="brand" size="lg-cta">
                  <Link href="/contact">Start a project</Link>
                </Button>
                <Button asChild variant="outline-brand" size="lg-cta">
                  <Link href="/products">See what we&apos;ve shipped</Link>
                </Button>
              </div>
            </div>

            {/* Standing in for the stat counters: three facts that are true
                and checkable, rather than four animated numbers. */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
              <HeroFact
                value="9"
                term="Products in market"
                detail="Across six sectors"
              />
              <HeroFact
                value="6"
                term="Services"
                detail="Web, mobile, AI, design, 3D"
              />
              <HeroFact
                value="UTC+5:45"
                term="Time zone"
                detail="Overlaps Asia, Gulf, Europe"
              />
              <HeroFact
                value="Sun–Fri"
                term="Working days"
                detail="9:00 to 19:00 NPT"
              />
            </ul>
          </div>
        </Container>
      </section>

      {/* ---- Services ----
          A numbered list with hairline rules. No icon chips, no hover lift,
          no six identical cards. */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="What we do"
            title="Six things, done properly"
            description="Most clients come to us for one of these and stay for two. We would rather be good at a short list than available for everything."
          />
          <Reveal>
            <ul className="border-t border-line">
              {services.map((service, index) => (
                <li key={service.slug}>
                  <Link
                    href="/services"
                    className="group grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-5 border-b border-line py-7 transition-colors hover:bg-surface-alt md:grid-cols-[3rem_minmax(0,18rem)_minmax(0,1fr)_auto] md:gap-x-8 md:px-2"
                  >
                    <span className="font-display text-sm text-fg-subtle tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-h3 transition-colors group-hover:text-brand">
                      {service.title}
                    </h3>
                    <p className="col-start-2 mt-2 text-sm text-fg-muted md:col-start-3 md:mt-0 md:text-[0.9375rem]">
                      {service.teaser}
                    </p>
                    <FaArrowRight
                      aria-hidden
                      className="col-start-2 mt-3 size-3.5 text-fg-subtle transition-all group-hover:translate-x-1 group-hover:text-brand md:col-start-4 md:mt-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* ---- Products ---- */}
      <Section className="border-y border-line bg-surface-alt">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <SectionHeader
              className="mb-0"
              eyebrow="Our own products"
              title="Nine platforms we built and licence"
              description="Alongside client work we maintain a product line of our own. If one of these already covers most of what you need, deploying it beats commissioning something from scratch."
            />
            <Button asChild variant="outline-brand" size="md">
              <Link href="/products">All nine products</Link>
            </Button>
          </div>

          <Reveal className="grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article
                key={product.title}
                className="flex flex-col rounded-xl border border-line bg-surface p-7 shadow-card"
              >
                <product.icon className="size-5 text-brand" />
                <p className="mt-5 text-eyebrow uppercase text-fg-subtle">
                  {product.sector}
                </p>
                <h3 className="mt-2 text-h3">{product.title}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-fg-muted">
                  {product.description}
                </p>
              </article>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ---- How we work ---- */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="How we work"
            title="Four stages, no surprises in the middle"
          />
          <Reveal className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.number} className="border-t-2 border-fg pt-5">
                <p className="font-display text-sm text-fg-subtle tabular-nums">
                  {step.number}
                </p>
                <h3 className="mt-3 text-h3">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ---- Commitments ---- */}
      <Section className="border-y border-line bg-surface-alt">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
            <SectionHeader
              className="mb-0"
              eyebrow="Working with us"
              title="What you can actually hold us to"
            />
            <Reveal className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {commitments.map((item) => (
                <div key={item.title}>
                  <item.icon className="size-[1.15rem] text-brand" />
                  <h3 className="mt-4 text-h3">{item.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---- Tech ----
          One quiet band. This was six dark boxed cards on a full dark
          section, which gave a list of tool names the visual weight of
          the company's actual offer. */}
      <Section size="tight">
        <Container>
          <h2 className="text-eyebrow mb-8 uppercase text-fg-subtle">
            Tools we work in
          </h2>
          <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {techGroups.map((group) => (
              <div
                key={group.label}
                className="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:gap-6"
              >
                <dt className="w-28 shrink-0 text-sm font-medium">
                  {group.label}
                </dt>
                <dd className="text-sm text-fg-muted">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ---- FAQ ---- */}
      <Section className="border-t border-line">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
            <SectionHeader
              className="mb-0"
              eyebrow="Questions"
              title="The things people ask before signing"
            />
            <Accordion type="single" collapsible className="border-t border-line">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="border-b border-line"
                >
                  <AccordionTrigger className="rounded-none py-5 text-left text-[1.0625rem] font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:text-fg-subtle">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[58ch] pt-0 pb-6 text-[0.9375rem] leading-relaxed text-fg-muted">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      <ClosingCta />
    </>
  );
}

function HeroFact({
  value,
  term,
  detail,
}: {
  value: string;
  term: string;
  detail: string;
}) {
  return (
    <li>
      <p className="font-display text-2xl tracking-tight md:text-[1.75rem]">
        {value}
      </p>
      <p className="mt-1.5 text-sm font-medium">{term}</p>
      <p className="mt-0.5 text-[0.8125rem] text-fg-subtle">{detail}</p>
    </li>
  );
}

