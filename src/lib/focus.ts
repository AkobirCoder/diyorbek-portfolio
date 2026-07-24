/**
 * focus.ts — Fokus qamovi (focus trap) yordamchilari.
 * Mobil menyu, VideoModal va Lightbox (keyingi bosqichlar) qayta ishlatadi.
 */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/** Konteyner ichidagi ko'rinadigan fokuslanadigan elementlar. */
export function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (el) =>
      el.offsetParent !== null ||
      el === document.activeElement ||
      el.getClientRects().length > 0,
  );
}
