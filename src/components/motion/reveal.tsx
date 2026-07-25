"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ease, revealViewport } from "@/lib/motion-tokens";

/**
 * Reveal — scroll bilan bir marta paydo bo'luvchi o'ram (Blueprint §8).
 * Bolalar opacity + y bilan yumshoq suriladi. `reduced` bo'lsa — faqat opacity.
 * Barcha reveal `once: true` (bir marta).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{
        duration: reduced ? 0.2 : 0.7,
        delay: reduced ? 0 : delay,
        ease: ease.outExpo,
      }}
    >
      {children}
    </m.div>
  );
}
