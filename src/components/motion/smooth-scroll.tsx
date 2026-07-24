"use client";

import * as React from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
}

interface SmoothScrollValue {
  scrollTo: (target: string | HTMLElement | number, opts?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = React.createContext<SmoothScrollValue | null>(null);

/**
 * SmoothScroll — Lenis silliq skroll (Blueprint §8).
 * lerp 0.09 · duration 1.2 · wheelMultiplier 0.9.
 * FAQAT sichqoncha bilan boshqariladigan qurilmalarda faol — sensorli
 * ekranlar va reduced-motion'da tabiiy skroll qoladi (ko'p saytlar
 * qiladigan xatoni takrorlamaymiz).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = React.useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = canHover && !reduced;

  React.useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.2,
      wheelMultiplier: 0.9,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  const scrollTo = React.useCallback<SmoothScrollValue["scrollTo"]>(
    (target, opts) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          offset: opts?.offset ?? 0,
          duration: opts?.immediate ? 0 : 1.2,
        });
        return;
      }
      // Fallback — Lenis faol emas (mobil / reduced-motion)
      const el =
        typeof target === "string"
          ? document.querySelector(target)
          : typeof target === "number"
            ? null
            : target;
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
      } else if (el instanceof HTMLElement) {
        const top =
          el.getBoundingClientRect().top + window.scrollY + (opts?.offset ?? 0);
        window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      }
    },
    [reduced],
  );

  const stop = React.useCallback(() => lenisRef.current?.stop(), []);
  const start = React.useCallback(() => lenisRef.current?.start(), []);

  const value = React.useMemo<SmoothScrollValue>(
    () => ({ scrollTo, stop, start }),
    [scrollTo, stop, start],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

/** Nav va langarlar shu hook orqali silliq skrollga murojaat qiladi. */
export function useSmoothScroll(): SmoothScrollValue | null {
  return React.useContext(SmoothScrollContext);
}
