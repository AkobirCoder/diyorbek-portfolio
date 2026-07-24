"use client";

import { motion, useTransform } from "motion/react";
import type { MouseParallax } from "@/hooks/use-mouse-parallax";

/**
 * HeroLight — kinematik yoritish qatlami (Blueprint §7, §8).
 *
 * Uch manba: subyekt ortidagi sovuq ko'k nur (portretning studiya yorug'ligi
 * bilan mos tushadi va rasm chetlarini fonga eritadi), pastki-chapdan iliq
 * urg'u nuri, va tepadan yumshoq oq konus.
 *
 * Har bir dog' 20s davomida juda sekin "nafas oladi" — ko'z ilg'amaydi,
 * lekin sahifa tirik his qilinadi.
 */
export function HeroLight({
  parallax,
  reduced,
}: {
  parallax: MouseParallax;
  reduced: boolean;
}) {
  // Nur qatlami kursorga teskari siljiydi — chuqurlik hissi (±12px)
  const x = useTransform(parallax.x, (v) => v * -12);
  const y = useTransform(parallax.y, (v) => v * -12);

  const drift = reduced
    ? undefined
    : { scale: [1, 1.07, 1], opacity: [0.85, 1, 0.85] };
  const driftTransition = {
    duration: 20,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={reduced ? undefined : { x, y }}
    >
      {/* Subyekt ortidagi asosiy ko'k nur */}
      <motion.div
        className="absolute left-1/2 top-[26%] h-[75vmax] w-[75vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--azure) 26%, transparent) 0%, transparent 62%)",
          opacity: 0.5,
        }}
        animate={drift}
        transition={driftTransition}
      />

      {/* Iliq urg'u nuri — pastki chap */}
      <motion.div
        className="absolute left-[12%] top-[76%] h-[52vmax] w-[52vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--accent) 20%, transparent) 0%, transparent 65%)",
          opacity: 0.42,
        }}
        animate={drift}
        transition={{ ...driftTransition, duration: 26, delay: 3 }}
      />

      {/* Tepadan yumshoq oq konus */}
      <div
        className="absolute inset-x-0 top-0 h-[46vh]"
        style={{
          background:
            "radial-gradient(70% 100% at 50% 0%, color-mix(in oklch, white 6%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Pastki vinyetka — kontent uchun kontrast */}
      <div
        className="absolute inset-x-0 bottom-0 h-[42vh]"
        style={{
          background:
            "linear-gradient(to top, var(--bg) 4%, color-mix(in oklch, var(--bg) 70%, transparent) 42%, transparent 100%)",
        }}
      />
    </motion.div>
  );
}
