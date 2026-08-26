import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Container,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { faqs } from "@/lib/data/home";

export function FaqSection() {
  return (
    <Section id="faq" className="mesh-light">
      <Container>
        <SectionHeader
          tag="FAQ"
          title={
            <>
              Frequently Asked{" "}
              <span className="text-gradient-brand">Questions</span>
            </>
          }
          description="Find answers to common questions about our services and processes."
        />
        <Reveal delay={200} className="mx-auto max-w-[800px]">
          {/* `collapsible` reproduces the legacy behaviour: opening one panel
              closes the others, and clicking an open panel closes it. */}
          <Accordion type="single" collapsible className="gap-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="mb-3.5 overflow-hidden rounded-[16px] card-surface transition-all duration-300 data-[state=open]:border-brand/30 data-[state=open]:shadow-raised"
              >
                <AccordionTrigger className="rounded-none px-6 py-5 hover:bg-brand/[0.03] hover:no-underline **:data-[slot=accordion-trigger-icon]:text-brand md:px-[30px]">
                  <h3 className="pr-5 text-[1.0125rem] font-semibold text-ink">
                    {faq.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-0 pb-5 text-[0.9375rem] leading-[1.75] text-slate-500 md:px-[30px]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  );
}
