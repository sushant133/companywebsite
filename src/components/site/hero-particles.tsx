"use client";

import * as React from "react";

type Particle = {
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
};

const emptySubscribe = () => () => {};

function generateParticles(): Particle[] {
  return Array.from({ length: 30 }, () => {
    const size = Math.random() * 4 + 2;
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${size}px`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 4 + 4}s`,
    };
  });
}

/**
 * The 30 drifting dots behind the home hero.
 *
 * Positions are randomised, which cannot be done during a server render
 * without breaking hydration. `useSyncExternalStore` reports false on the
 * server and true on the client, so the particles are generated only once
 * React is running in the browser — no state updates from an effect.
 */
export function HeroParticles() {
  const isClient = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const particles = React.useMemo(
    () => (isClient ? generateParticles() : []),
    [isClient],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-brand/50"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
