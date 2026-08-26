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
    <Section id="faq" className="bg-slate-100">
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
                className="mb-4 overflow-hidden rounded-xl border border-transparent bg-white shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-300 data-[state=open]:border-brand/30"
              >
                <AccordionTrigger className="rounded-none px-[30px] py-5 hover:bg-slate-100 hover:no-underline **:data-[slot=accordion-trigger-icon]:text-brand">
                  <h3 className="pr-5 text-[1.05rem] font-semibold text-ink">
                    {faq.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-[30px] pt-0 pb-5 text-[0.95rem] leading-[1.8] text-slate-500">
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
