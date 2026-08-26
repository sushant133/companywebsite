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
        "fixed right-[30px] bottom-[30px] z-[999] flex size-[50px] cursor-pointer items-center justify-center rounded-full bg-gradient-brand text-[1.1rem] text-white shadow-[0_4px_15px_rgb(99_102_241_/_0.4)] transition-all duration-300",
        "hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgb(99_102_241_/_0.5)]",
        visible
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-5 opacity-0",
      )}
    >
      <FaChevronUp />
    </button>
  );
}
