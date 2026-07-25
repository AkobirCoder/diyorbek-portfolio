"use client";

import { m, useTransform } from "motion/react";
import type { MouseParallax } from "@/hooks/use-mouse-parallax";
import { ease } from "@/lib/motion-tokens";

/**
 * HeroBackdropType — portret ortidagi ulkan xira yozuv (Blueprint §4, §6).
 *
 * Bu BEZAK, sarlavha emas — shuning uchun aria-hidden va <h1> emas
 * (Blueprint §10). Harflar ekran chetlaridan chiqib ketadi — bu ataylab,
 * muharrirona hissiyot beradi.
 *
 * Eng sekin qatlam (±6px) — eng uzoqda turgandek ko'rinadi.
 */
export function HeroBackdropType({
  text,
  parallax,
  reduced,
}: {
  text: string;
  parallax: MouseParallax;
  reduced: boolean;
}) {
  const x = useTransform(parallax.x, (v) => v * -6);
  const y = useTransform(parallax.y, (v) => v * -6);

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[42%] flex -translate-y-1/2 justify-center"
      style={reduced ? undefined : { x, y }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0.2 : 0.9,
        delay: reduced ? 0 : 0.15,
        ease: ease.outExpo,
      }}
    >
      <span
        className="whitespace-nowrap font-display text-hero-backdrop font-extralight leading-none text-fg"
        style={{ opacity: 0.032 }}
      >
        {text}
      </span>
    </m.div>
  );
}
