"use client";

import * as React from "react";
import Image from "next/image";
import { FaMagnifyingGlass } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container, Section } from "@/components/site/layout-primitives";
import { RichHeading } from "@/components/site/rich-text";
import { Reveal } from "@/components/site/reveal";
import type { HomeContent } from "@/lib/content/schema";

export function FaqSection({ faq }: { faq: HomeContent["faq"] }) {
  const [query, setQuery] = React.useState("");

  const needle = query.trim().toLowerCase();
  const visible = needle
    ? faq.items.filter(
        (item) =>
          item.question.toLowerCase().includes(needle) ||
          item.answer.toLowerCase().includes(needle),
      )
    : faq.items;

  if (faq.items.length === 0) return null;

  return (
    // White, so the FAQ reads as its own band rather than merging into the
    // slate "How We Work" section directly above it.
    <Section id="faq" className="bg-white">
      <Container>
        {/* Heading, search and questions on the left; illustration on the
            right. Stacks into a single column below lg. */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="mb-8 text-[2.1rem] leading-[1.15] font-extrabold text-ink md:text-[2.9rem]">
                <RichHeading text={faq.title} />
              </h2>
            </Reveal>

            <Reveal delay={100} className="mb-6">
              <div className="relative">
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={faq.searchPlaceholder || "Search question here"}
                  aria-label="Search questions"
                  // The native clear button would collide with the magnifier.
                  className="w-full appearance-none rounded-full border border-slate-200 bg-slate-50 py-4 pr-14 pl-6 text-[0.98rem] text-ink outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-brand/50 focus:bg-white [&::-webkit-search-cancel-button]:hidden"
                />
                <FaMagnifyingGlass
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-6 -translate-y-1/2 text-slate-400"
                />
              </div>
            </Reveal>

            <Reveal delay={150}>
              {/* Rules rather than cards, matching the reference: the question
                  sits on the row and a +/- marker carries the state. */}
              <Accordion
                type="single"
                collapsible
                defaultValue={faq.items[0]?.question}
              >
                {visible.map((item) => (
                  <AccordionItem
                    key={item.question}
                    value={item.question}
                    className="border-b border-slate-200"
                  >
                    <AccordionTrigger className="items-center gap-6 rounded-none py-5 hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                      <h3 className="flex-1 text-[1.02rem] leading-[1.55] font-semibold text-ink transition-colors duration-300 group-hover/accordion-trigger:text-brand group-aria-expanded/accordion-trigger:text-brand">
                        {item.question}
                      </h3>
                      {/* Two bars: the upright one collapses, turning + into -. */}
                      <span className="relative flex size-6 min-w-6 items-center justify-center text-slate-400 transition-colors duration-300 group-hover/accordion-trigger:text-brand group-aria-expanded/accordion-trigger:text-brand">
                        <span className="absolute h-[2px] w-[15px] rounded-full bg-current" />
                        <span className="absolute h-[15px] w-[2px] rounded-full bg-current transition-transform duration-300 ease-out group-aria-expanded/accordion-trigger:scale-y-0" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pr-10 pb-5 text-[0.95rem] leading-[1.8] text-slate-500">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {visible.length === 0 ? (
                <p className="py-6 text-[0.95rem] text-slate-500">
                  No questions match{" "}
                  <span className="font-semibold text-ink">
                    &ldquo;{query.trim()}&rdquo;
                  </span>
                  . Try a different search.
                </p>
              ) : null}
            </Reveal>
          </div>

          {faq.image ? (
            <Reveal
              animation="fade-left"
              delay={150}
              className="mx-auto w-full max-w-[400px] sm:max-w-[480px] lg:max-w-none"
            >
              {/* Decorative: the questions beside it carry the meaning.
                  Sized to the shipped image; a replacement of another shape
                  needs these two numbers changed to match. */}
              <Image
                src={faq.image}
                alt=""
                width={630}
                height={450}
                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 480px, 400px"
                className="h-auto w-full"
              />
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
