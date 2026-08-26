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
import { faqs } from "@/lib/data/home";

/**
 * FAQ, laid out as heading beside answers rather than a centred stack of
 * bordered cards. The rows are separated by hairlines — an accordion already
 * reads as a list, so wrapping each row in its own card was redundant.
 */
export function FaqSection() {
  return (
    <Section id="faq" className="border-t border-slate-200">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader
            className="mb-0"
            align="start"
            label="Questions"
            title={
              <>
                Answers to what clients{" "}
                <span className="text-brand-strong">usually ask first</span>
              </>
            }
            description="If something here is not covered, ask us directly — we would rather answer it before you commit."
          />

          <Accordion
            type="single"
            collapsible
            className="border-t border-slate-200"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-b border-slate-200"
              >
                <AccordionTrigger className="rounded-none py-5 text-left text-[1rem] font-semibold text-ink hover:no-underline **:data-[slot=accordion-trigger-icon]:text-slate-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[62ch] pt-0 pb-5 text-body text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
}
