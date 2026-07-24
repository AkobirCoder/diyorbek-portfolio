"use client";

import { useMediaQuery } from "./use-media-query";

/**
 * Foydalanuvchi kamaytirilgan harakatni yoqganmi (Blueprint §8).
 * Barcha animatsiya qarorlari shu qiymatni hurmat qiladi.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
