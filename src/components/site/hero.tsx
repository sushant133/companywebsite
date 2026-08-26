import Link from "next/link";
import { FaArrowRight, FaCheck } from "react-icons/fa6";

import { Container } from "@/components/site/layout-primitives";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";

/**
 * Home hero.
 *
 * Palette is taken from the logo: #0d56a7 blue and #f5a431 amber, sampled
 * from the mark itself. The cyan in the headline accent is the site's
 * existing brand colour, kept so the hero hands over cleanly to the indigo
 * sections below rather than stopping dead at the fold.
 *
 * Motion is a single fade-and-rise, staggered by delay. No particles, no
 * typing effect, no JavaScript — the section is fully static markup.
 */

const assurances = ["Agile delivery", "24/7 support", "NDA on request"];

export function Hero() {
  return (
    <section className="hero-surface relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div aria-hidden className="hero-mesh pointer-events-none absolute inset-0" />

      {/* Hands the eye down into the next section instead of a hard cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-slate-100/95"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---- Left: the offer ---- */}
          <div>
            <p
              className="hero-rise inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-4 py-1.5 text-[0.8125rem] font-medium text-slate-200"
              style={{ animationDelay: "0ms" }}
            >
              <span className="size-1.5 rounded-full bg-logo-amber" />
              Software Development · Siraha, Nepal
            </p>

            <h1
              className="hero-rise mt-6 text-[2.125rem] leading-[1.12] font-extrabold tracking-[-0.03em] text-white xs:text-[2.5rem] md:text-[3.125rem] lg:text-[3.5rem]"
              style={{ animationDelay: "80ms" }}
            >
              Transforming Ideas Into{" "}
              <span className="bg-[linear-gradient(100deg,#4a80bd_0%,#38bdf8_55%,#f5a431_100%)] bg-clip-text text-transparent">
                Digital Reality
              </span>
            </h1>

            <p
              className="hero-rise mt-6 max-w-[36rem] text-[1.0625rem] leading-[1.75] text-slate-300/90"
              style={{ animationDelay: "160ms" }}
            >
              MantraSphere Innovations builds web platforms, mobile apps and
              AI-driven tools for businesses across healthcare, hospitality,
              retail and transport — designed, built and supported by one team.
            </p>

            <div
              className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "240ms" }}
            >
              <Button asChild variant="brand" size="pill-lg">
                <Link href="/services">
                  Explore Services
                  <FaArrowRight className="size-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline-white" size="pill-lg">
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>

            <ul
              className="hero-rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-7"
              style={{ animationDelay: "320ms" }}
            >
              {assurances.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[0.875rem] text-slate-300"
                >
                  <FaCheck className="size-3 text-logo-amber" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Right: what we actually build ----
              Real content rather than an abstract graphic, which keeps the
              section feeling full without inventing a fake product shot. */}
          <div
            className="hero-rise rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-[1.0625rem] font-semibold text-white">
                What we build
              </h2>
              <Link
                href="/services"
                className="text-[0.8125rem] font-medium text-logo-amber transition-opacity hover:opacity-80"
              >
                All services
              </Link>
            </div>

            <ul className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.slug} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-logo-blue/25 text-[0.875rem] text-[#7db4e8]">
                    <service.icon />
                  </span>
                  <span className="text-[0.875rem] leading-snug font-medium text-slate-200">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                ["9", "Products"],
                ["6", "Services"],
                ["8", "Industries"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-heading text-[1.5rem] font-bold text-white">
                    {value}
                  </dd>
                  <p className="mt-0.5 text-[0.75rem] text-slate-400">{label}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
