"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealAnimation = "fade-up" | "fade-down" | "fade-left" | "fade-right";

const hiddenByAnimation: Record<RevealAnimation, string> = {
  "fade-up": "translate-y-3",
  "fade-down": "-translate-y-3",
  "fade-left": "translate-x-3",
  "fade-right": "-translate-x-3",
};

/**
 * Scroll reveal, used sparingly — on section groups rather than on every
 * individual card. A 12px drift over 500ms registers as the page settling;
 * the 30px slide it replaced registered as an effect.
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
        "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
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
