import Link from "next/link";

import { Container, Section } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

type CtaAction = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  /** Trailing icons sit after the label; leading icons before it. */
  iconPosition?: "leading" | "trailing";
  external?: boolean;
};

/** The gradient CTA band that closes the home, services and products pages. */
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
    <Section className="relative overflow-hidden bg-[linear-gradient(125deg,#4f46e5_0%,#6366f1_32%,#0ea5e9_72%,#06b6d4_100%)]">
      {/* Soft light sources rather than one flat circle, so the band has
          somewhere for the eye to land. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/2 -right-[10%] size-[520px] rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 -left-[8%] size-[420px] rounded-full bg-white/[0.07] blur-3xl"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 pattern-dots opacity-40" />
      <Container>
        <Reveal className="relative z-[2] text-center">
          <h2 className="mb-4 text-[2rem] text-white md:text-[2.5rem]">
            {title}
          </h2>
          <p className="mx-auto mb-10 max-w-[600px] text-[1.15rem] text-white/85">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton action={primary} variant="white" />
            <CtaButton action={secondary} variant="outline-white" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function CtaButton({
  action,
  variant,
}: {
  action: CtaAction;
  variant: "white" | "outline-white";
}) {
  const content = (
    <>
      {action.iconPosition === "leading" ? action.icon : null}
      {action.label}
      {action.iconPosition !== "leading" ? action.icon : null}
    </>
  );

  return (
    <Button asChild variant={variant} size="pill-lg">
      {action.external ? (
        <a href={action.href}>{content}</a>
      ) : (
        <Link href={action.href}>{content}</Link>
      )}
    </Button>
  );
}
