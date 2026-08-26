"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Full-screen splash shown until the window `load` event fires, with the same
 * 800ms grace period and 3s hard fallback as the original js/script.js.
 *
 * Rendered on the home and about routes only, matching which legacy pages
 * carried the `#preloader` markup.
 */
export function Preloader() {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const hide = () => setHidden(true);

    // If the page already finished loading before hydration, don't wait for an
    // event that has been and gone.
    const onLoad = () => window.setTimeout(hide, 800);
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    const fallback = window.setTimeout(hide, 3000);
    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[99999] flex items-center justify-center bg-ink transition-[opacity,visibility] duration-500",
        hidden && "invisible opacity-0",
      )}
    >
      <div className="text-center">
        <div className="mx-auto mb-5 size-[60px] animate-spin rounded-full border-[3px] border-ink-2 border-t-brand" />
        <span className="font-heading text-2xl font-bold tracking-[2px] text-white">
          {siteConfig.shortName}
        </span>
      </div>
    </div>
  );
}
