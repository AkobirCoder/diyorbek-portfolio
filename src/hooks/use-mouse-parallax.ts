"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { spring as springTokens } from "@/lib/motion-tokens";

export interface MouseParallax {
  /** -1 (chap) … 1 (o'ng) */
  x: MotionValue<number>;
  /** -1 (yuqori) … 1 (past) */
  y: MotionValue<number>;
}

/**
 * useMouseParallax — kursor pozitsiyasini normallashtirilgan (-1…1) spring
 * qiymatlariga aylantiradi (Blueprint §8).
 *
 * MotionValue ishlatilgani uchun React qayta render bo'lmaydi — transformlar
 * to'g'ridan-to'g'ri GPU qatlamiga yoziladi, shuning uchun 60 FPS saqlanadi.
 * Kursor to'xtasa spring elementni markazga qaytaradi.
 */
export function useMouseParallax(disabled = false): MouseParallax {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, springTokens.soft);
  const y = useSpring(rawY, springTokens.soft);

  useEffect(() => {
    if (disabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    function onPointerMove(event: PointerEvent) {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    }

    function onPointerLeave() {
      rawX.set(0);
      rawY.set(0);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [disabled, rawX, rawY]);

  return { x, y };
}
