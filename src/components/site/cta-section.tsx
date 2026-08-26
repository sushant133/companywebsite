import Link from "next/link";

import { Container, Section } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

type CtaAction = { href: string; label: string };

/**
 * Closing band, shared by every page.
 *
 * Deliberately flat dark rather than the full-bleed gradient with floating
 * circles it replaces: the CTA should be the clearest thing on the page, and
 * a busy background works against that.
 */
export function CtaSection({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: CtaAction;
  secondary: CtaAction;
}) {
  return (
    <Section className="bg-ink">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-16">
          <div>
            <h2 className="text-section text-white">{title}</h2>
            <p className="measure mt-4 text-lead text-slate-400">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 xs:flex-row">
            <Button asChild variant="white" size="pill-lg">
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
            <Button asChild variant="outline-white" size="pill-lg">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
