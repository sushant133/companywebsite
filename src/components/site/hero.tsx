import Link from "next/link";
import { FaArrowRight, FaCheck } from "react-icons/fa6";

import { Container } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

const proofPoints = [
  "Web, mobile, AI and 3D under one roof",
  "Nine products already in production",
  "Fixed scope agreed before we start",
];

const stats = [
  { value: "9", label: "Products shipped" },
  { value: "6", label: "Service lines" },
  { value: "8", label: "Industries served" },
];

/**
 * Home hero.
 *
 * Replaces the centred full-viewport version: that one filled a whole screen
 * with a badge, an animated typing headline and 30 drifting particles, and
 * said less than these five lines. This is a two-column masthead — the offer
 * on the left, evidence on the right — sized so the section beneath is
 * visible on a laptop without scrolling.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-28 pb-16 md:pt-36 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-grid" />

      <Container>
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="section-label mb-5 text-brand-light">
                <span aria-hidden className="h-px w-6 bg-current opacity-50" />
                Software development studio · Nepal
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="text-hero text-white">
                Software that ships,{" "}
                <span className="text-gradient-brand">and keeps running</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="measure mt-6 text-lead text-slate-400">
                MantraSphere Innovations builds web platforms, mobile apps and
                AI tools for businesses across healthcare, hospitality, retail
                and transport — then hands them over documented, so your team
                can take it from there.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-7 space-y-2.5">
                {proofPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-body text-slate-300"
                  >
                    <FaCheck className="mt-1.5 size-3 shrink-0 text-brand-light" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={240}
              className="mt-9 flex flex-col gap-3 xs:flex-row xs:items-center"
            >
              <Button asChild variant="brand" size="pill-lg">
                <Link href="/contact">
                  Start a project
                  <FaArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline-white" size="pill-lg">
                <Link href="/products">See our products</Link>
              </Button>
            </Reveal>
          </div>

          {/* Evidence panel. A concrete list of what the company actually
              sells beats an abstract illustration, and it gives the hero a
              second column without inventing a graphic. */}
          <Reveal delay={140} animation="fade-left">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <h2 className="text-card-title text-white">
                Where our work runs today
              </h2>
              <dl className="mt-6 grid grid-cols-3 gap-4 border-b border-white/10 pb-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-heading text-2xl font-semibold text-white">
                      {stat.value}
                    </dd>
                    <p className="mt-1 text-xs leading-snug text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </dl>
              <ul className="mt-6 space-y-3.5">
                {[
                  ["Hospitality", "Restaurant & hotel management"],
                  ["Healthcare", "Hospital records and billing"],
                  ["Transport", "Parking and number-plate systems"],
                ].map(([sector, detail]) => (
                  <li key={sector} className="flex items-baseline gap-3">
                    <span className="w-24 shrink-0 text-xs font-semibold tracking-wide text-brand-light uppercase">
                      {sector}
                    </span>
                    <span className="text-body text-slate-400">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
