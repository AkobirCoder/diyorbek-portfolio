"use client";

import { LazyMotion, domAnimation } from "motion/react";

/**
 * MotionProvider — Motion'ning faqat kerakli xususiyatlarini yuklaydi
 * (Blueprint §12). `domAnimation` animatsiya, variant, whileInView va
 * hover/tap/focus imkoniyatlarini beradi (~18KB), to'liq `motion` (~34KB)
 * o'rniga. Komponentlar `motion.*` emas, yengil `m.*` ishlatadi.
 *
 * `strict` — kimdir og'ir `motion.*` ishlatib qo'ysa, xato beradi (nazorat).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
