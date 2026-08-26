import Link from "next/link";

import { Container, Section } from "@/components/site/layout-primitives";
import { Button } from "@/components/ui/button";

/**
 * The single dark band on any given page, always last.
 *
 * This replaces the full-width gradient CTA that closed the home, services,
 * products and about pages — four near-identical purple blocks with floating
 * circles behind them. One restrained treatment, reused, reads as a system;
 * four loud ones read as a template.
 */
export function ClosingCta({
  title = "Tell us what you're trying to build.",
  description = "Send over the outline and we'll come back with an honest read on scope, timeline and whether we're the right team for it.",
  primary = { href: "/contact", label: "Start a project" },
  secondary = { href: "/services", label: "Browse services" },
}: {
  title?: string;
  description?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <Section className="bg-ink">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <div>
            <h2 className="text-h2 text-white">{title}</h2>
            <p className="measure mt-5 text-lead text-ink-fg-muted">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild variant="white" size="lg-cta">
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
            <Button asChild variant="outline-white" size="lg-cta">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
