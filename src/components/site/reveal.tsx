"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealAnimation = "fade-up" | "fade-down" | "fade-left" | "fade-right";

const hiddenByAnimation: Record<RevealAnimation, string> = {
  "fade-up": "translate-y-[30px]",
  "fade-down": "-translate-y-[30px]",
  "fade-left": "translate-x-[30px]",
  "fade-right": "-translate-x-[30px]",
};

/**
 * Scroll-reveal wrapper replacing the hand-rolled `data-aos` IntersectionObserver
 * from js/script.js. Same thresholds (0.1 / -50px bottom margin), same 600ms
 * ease transition, and the same one-shot behaviour — once revealed, it stays.
 *
 * The stagger that the original produced with `setTimeout` is expressed here as
 * `transition-delay`, which reads the same on screen without the timer.
 */
export function Reveal({
  animation = "fade-up",
  delay = 0,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  animation?: RevealAnimation;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      className={cn(
        "transition-[opacity,transform] duration-600 ease-out motion-reduce:transition-none",
        visible
          ? "translate-x-0 translate-y-0 opacity-100"
          : cn("opacity-0", hiddenByAnimation[animation]),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
