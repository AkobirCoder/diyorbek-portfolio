/**
 * motion-tokens.ts — Animatsiya konstantalari (Blueprint §8).
 * JS (Motion) va CSS bir xil qiymatlardan foydalanishi uchun yagona manba.
 * Bu tokenlar Motion o'rnatilgach (3-bosqich) faol ishlatiladi.
 */

/** Davomiylik — soniyalarda (Motion soniya bilan ishlaydi). */
export const duration = {
  instant: 0.12,
  quick: 0.24,
  base: 0.42,
  slow: 0.8,
  cinema: 1.4,
} as const;

/** Easing egri chiziqlari — cubic-bezier nuqtalari. */
export const ease = {
  /** Asosiy — 90% holatda. Kamera kabi yumshoq to'xtash. */
  outExpo: [0.16, 1, 0.3, 1],
  /** Modal, sahifa o'tishlari. */
  inOutQuart: [0.77, 0, 0.175, 1],
} as const;

/** Spring sozlamalari — parallaks va suzuvchi elementlar uchun. */
export const spring = {
  soft: { stiffness: 120, damping: 22, mass: 1 },
  float: { stiffness: 40, damping: 14, mass: 1 },
} as const;

/** Standart reveal varianti — bir marta ishlaydi (Blueprint §8). */
export const revealViewport = { once: true, margin: "0px 0px -12% 0px" } as const;

export type Duration = keyof typeof duration;
export type Ease = keyof typeof ease;
