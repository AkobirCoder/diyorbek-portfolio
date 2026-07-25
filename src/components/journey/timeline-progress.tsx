"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * TimelineProgress — vaqt chizig'i (Blueprint §8: "scroll bilan to'ladi").
 * Track (nozik chegara) ustiga scroll progressiga bog'langan gradient chiziq
 * chiziladi. `reduced` — to'liq to'lgan holatda, animatsiyasiz.
 */
export function TimelineProgress({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.6,
  });

  return (
    <div ref={ref} aria-hidden="true" className={cn("w-px bg-border", className)}>
      <m.div
        className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent to-azure"
        style={{ scaleY: reduced ? 1 : scaleY }}
      />
    </div>
  );
}
