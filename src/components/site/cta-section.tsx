import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import { Container, Section } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import type { CtaBand } from "@/lib/content/schema";

type CtaAction = { label: string; href: string };

/** `tel:`, `mailto:` and off-site links leave the router alone. */
function isExternal(href: string) {
  return !href.startsWith("/");
}

/** The gradient CTA band that closes the home, services and products pages. */
export function CtaSection({ cta }: { cta: CtaBand }) {
  return (
    <Section className="relative overflow-hidden bg-gradient-brand">
      <div
        aria-hidden
        className="absolute -top-1/2 -right-[10%] size-[500px] rounded-full bg-white/5"
      />
      <Container>
        <Reveal className="relative z-[2] text-center">
          <h2 className="mb-4 text-[2rem] text-white md:text-[2.5rem]">
            {cta.title}
          </h2>
          {cta.description ? (
            <p className="mx-auto mb-10 max-w-[600px] text-[1.15rem] text-white/85">
              {cta.description}
            </p>
          ) : null}
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton action={cta.primary} variant="white" withIcon />
            <CtaButton action={cta.secondary} variant="outline-white" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function CtaButton({
  action,
  variant,
  withIcon = false,
}: {
  action: CtaAction;
  variant: "white" | "outline-white";
  withIcon?: boolean;
}) {
  const content = (
    <>
      {action.label}
      {withIcon ? <FaArrowRight /> : null}
    </>
  );

  return (
    <Button asChild variant={variant} size="pill-lg">
      {isExternal(action.href) ? (
        <a href={action.href}>{content}</a>
      ) : (
        <Link href={action.href}>{content}</Link>
      )}
    </Button>
  );
}
