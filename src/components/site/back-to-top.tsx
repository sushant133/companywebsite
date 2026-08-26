"use client";

import * as React from "react";
import { FaChevronUp } from "react-icons/fa6";

import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-5 bottom-5 z-[999] flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-soft transition-all duration-200 sm:right-8 sm:bottom-8",
        "hover:border-slate-300 hover:text-ink",
        visible
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-2 opacity-0",
      )}
    >
      <FaChevronUp className="size-3.5" />
    </button>
  );
}
