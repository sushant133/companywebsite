import { FaQuoteLeft, FaStar } from "react-icons/fa6";

import {
  Container,
  Section,
  SectionHeader,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import type { TestimonialsContent } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

/** Initials stand in until real portraits exist, as on the team page. */
function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/**
 * The client-quote band on the home page. It renders nothing at all until the
 * dashboard has both switched it on and put a quote in it — an empty
 * "what our clients say" section says the wrong thing about a young company.
 */
export function TestimonialsSection({
  testimonials,
}: {
  testimonials: TestimonialsContent;
}) {
  if (!testimonials.enabled || testimonials.items.length === 0) return null;

  return (
    <Section className="bg-slate-100">
      <Container>
        <SectionHeader
          tag={testimonials.tag}
          title={testimonials.title}
          description={testimonials.description}
        />

        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item, index) => (
            <Reveal
              key={`${item.name}-${index}`}
              delay={((index % 3) + 1) * 100}
              className="flex flex-col rounded-[20px] border border-slate-200 bg-white p-8 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-brand"
            >
              <FaQuoteLeft
                aria-hidden
                className="mb-4 text-[1.4rem] text-brand/30"
              />

              <p className="mb-6 flex-1 text-[0.95rem] leading-[1.8] text-slate-500">
                {item.quote}
              </p>

              <div
                className="mb-4 flex gap-1"
                aria-label={`${item.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, star) => (
                  <FaStar
                    key={star}
                    aria-hidden
                    className={cn(
                      "text-[0.85rem]",
                      star < item.rating ? "text-amber-400" : "text-slate-200",
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3.5 border-t border-slate-100 pt-5">
                <div
                  aria-hidden
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-135 font-heading text-[0.9rem] font-bold text-white",
                    item.gradient || "from-[#6366f1] to-[#0ea5e9]",
                  )}
                >
                  {initialsOf(item.name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[0.98rem] font-semibold text-ink">
                    {item.name}
                  </p>
                  <p className="truncate text-[0.85rem] text-slate-500">
                    {[item.role, item.company].filter(Boolean).join(", ")}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
