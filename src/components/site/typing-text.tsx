"use client";

import * as React from "react";

const WORDS = ["Digital Reality", "Smart Solutions", "Innovation", "Success"];
const TYPE_MS = 100;
const DELETE_MS = 50;
const HOLD_MS = 2000;
const RESTART_MS = 500;
const START_DELAY_MS = 2000;

/**
 * Cycling headline text on the home hero.
 *
 * Renders WORDS[0] on the server so the heading is complete in the HTML for
 * crawlers and for anyone without JS, then starts the same type/delete loop
 * the legacy script ran, after the same 2s initial delay.
 */
export function TypingText({ className }: { className?: string }) {
  const [text, setText] = React.useState(WORDS[0]);

  React.useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: number;

    const tick = () => {
      const word = WORDS[wordIndex];

      if (deleting) {
        charIndex -= 1;
        setText(word.substring(0, charIndex));
      } else {
        charIndex += 1;
        setText(word.substring(0, charIndex));
      }

      let speed = deleting ? DELETE_MS : TYPE_MS;

      if (!deleting && charIndex === word.length) {
        speed = HOLD_MS;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % WORDS.length;
        speed = RESTART_MS;
      }

      timer = window.setTimeout(tick, speed);
    };

    timer = window.setTimeout(tick, START_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return <span className={className}>{text}</span>;
}
