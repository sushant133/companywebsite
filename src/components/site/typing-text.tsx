"use client";

import * as React from "react";

const TYPE_MS = 100;
const DELETE_MS = 50;
const HOLD_MS = 2000;
const RESTART_MS = 500;
const START_DELAY_MS = 2000;

/**
 * Cycling headline text on the home hero. The words come from the `home`
 * content section, so they are editable from the dashboard.
 *
 * Renders the first word on the server so the heading is complete in the HTML
 * for crawlers and for anyone without JS, then starts the same type/delete loop
 * the legacy script ran, after the same 2s initial delay.
 */
export function TypingText({
  words,
  className,
}: {
  words: string[];
  className?: string;
}) {
  const usable = words.filter((word) => word.trim());
  const [text, setText] = React.useState(usable[0] ?? "");

  // Re-runs if the words are edited; the string is a stable dependency where
  // the array itself would be a new reference on every render.
  const key = usable.join("|");

  React.useEffect(() => {
    const list = key.split("|").filter(Boolean);
    if (list.length === 0) return;

    setText(list[0]!);
    if (list.length === 1) return;

    let wordIndex = 0;
    let charIndex = list[0]!.length;
    let deleting = true;
    let timer: number;

    const tick = () => {
      const word = list[wordIndex]!;

      charIndex += deleting ? -1 : 1;
      setText(word.substring(0, charIndex));

      let speed = deleting ? DELETE_MS : TYPE_MS;

      if (!deleting && charIndex === word.length) {
        speed = HOLD_MS;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % list.length;
        speed = RESTART_MS;
      }

      timer = window.setTimeout(tick, speed);
    };

    timer = window.setTimeout(tick, START_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [key]);

  return <span className={className}>{text}</span>;
}
