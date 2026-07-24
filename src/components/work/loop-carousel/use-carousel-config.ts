"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Karusel geometriyasi bir breakpoint uchun (Blueprint §9 ruhida).
 * maxVisible = markaz + har tomondan shuncha kadr → desktop 9, planshet 5, mobil 3.
 */
export interface CarouselConfig {
  angle: number;
  radius: number;
  scaleStep: number;
  opacityStep: number;
  maxVisible: number;
  cardW: number;
  cardH: number;
  perspective: number;
  dragPx: number;
}

const DESKTOP: CarouselConfig = {
  angle: 20,
  radius: 540,
  scaleStep: 0.15,
  opacityStep: 0.26,
  maxVisible: 4,
  cardW: 300,
  cardH: 400,
  perspective: 1300,
  dragPx: 230,
};

const TABLET: CarouselConfig = {
  angle: 26,
  radius: 380,
  scaleStep: 0.17,
  opacityStep: 0.3,
  maxVisible: 2,
  cardW: 250,
  cardH: 340,
  perspective: 1100,
  dragPx: 190,
};

const MOBILE: CarouselConfig = {
  angle: 34,
  radius: 230,
  scaleStep: 0.22,
  opacityStep: 0.42,
  maxVisible: 1,
  cardW: 210,
  cardH: 300,
  perspective: 900,
  dragPx: 150,
};

/**
 * Joriy ekran uchun konfiguratsiya. SSR'da (media query `false`) desktop
 * qaytadi — birinchi mijoz render bilan mos (hydration xavfsiz).
 */
export function useCarouselConfig(): CarouselConfig {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery(
    "(min-width: 640px) and (max-width: 1023px)",
  );
  if (isMobile) return MOBILE;
  if (isTablet) return TABLET;
  return DESKTOP;
}
