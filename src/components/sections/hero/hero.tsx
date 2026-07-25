"use client";

import { m } from "motion/react";
import { Container } from "@/components/shared/container";
import { AnchorButton } from "@/components/shared/anchor-button";
import { StatRow, type StatItem } from "@/components/shared/stat-row";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ease } from "@/lib/motion-tokens";
import { HeroLight } from "./hero-light";
import { HeroBackdropType } from "./hero-backdrop-type";
import { HeroPortrait } from "./hero-portrait";
import { FloatingTools } from "./floating-tools";
import { ScrollCue } from "./scroll-cue";

export interface HeroProps {
  eyebrow: string;
  name: string;
  intro: string;
  ctaLabel: string;
  reelLabel: string;
  portraitAlt: string;
  backdropWord: string;
  stats: readonly StatItem[];
}

/**
 * Hero — 100svh kinematik bosh ekran (Blueprint §4, §8, §9).
 *
 * Kompozitsiya — uch zonali muvozanat, aniq vertikal ritm bilan:
 *   YUQORI-CHAP   unvon + ism (ikki qator, ikki ton) — portret boshidan tepada
 *   MARKAZ        portret (fokus) + yumshoq nur + parallaks
 *   MID-BAND      6 suzuvchi ikonka (matndan chetda, xavfsiz zonalarda)
 *   PAST-CHAP     tavsif + CTA
 *   PAST-O'NG     statistika
 *
 * Vertikal zonalar bir-birini kesib o'tmaydi: ism (y≈15–34%), portret boshi
 * (y≈40%), tavsif/raqamlar (y≥72%). Shu sabab matn hech qachon kesilmaydi
 * yoki ustma-ust tushmaydi.
 */
export function Hero({
  eyebrow,
  name,
  intro,
  ctaLabel,
  reelLabel,
  portraitAlt,
  backdropWord,
  stats,
}: HeroProps) {
  const prefersReduced = useReducedMotion();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const parallaxDisabled = prefersReduced || !canHover;
  const parallax = useMouseParallax(parallaxDisabled);
  const reduced = prefersReduced;

  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.2 : 0.75,
      delay: reduced ? 0 : delay,
      ease: ease.outExpo,
    },
  });

  // Ism — LCP elementi. FAQAT transform (opacity yo'q), shuning uchun SSR'da
  // to'liq bo'yalgan holda keladi va LCP erta qayd etiladi (Blueprint §12).
  const nameReveal = (delay: number) => ({
    initial: reduced ? { y: 0 } : { y: "0.32em" },
    animate: { y: 0 },
    transition: {
      duration: reduced ? 0.2 : 0.8,
      delay: reduced ? 0 : delay,
      ease: ease.outExpo,
    },
  });

  return (
    <section
      id="top"
      aria-label={name}
      data-theme="dark"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-bg text-fg"
    >
      {/* 0 — kinematik yoritish */}
      <div className="absolute inset-0 z-0">
        <HeroLight parallax={parallax} reduced={reduced} />
      </div>

      {/* 1 — kinematik fon teksturasi (bezak) */}
      <div className="absolute inset-0 z-[1]">
        <HeroBackdropType
          text={backdropWord}
          parallax={parallax}
          reduced={reduced}
        />
      </div>

      {/* 2 — portret (fokus, LCP) */}
      <div className="absolute inset-0 z-[2]">
        <HeroPortrait alt={portraitAlt} parallax={parallax} reduced={reduced} />
      </div>

      {/* 3 — pastki skrim: matn o'qilishi uchun */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[62svh] sm:h-[46svh]"
        style={{
          background:
            "linear-gradient(to top, var(--bg) 14%, color-mix(in oklch, var(--bg) 76%, transparent) 50%, transparent 100%)",
        }}
      />

      {/* 4 — suzuvchi ikonkalar (matndan chetda) */}
      <div className="absolute inset-0 z-[4]">
        <FloatingTools parallax={parallax} reduced={reduced} />
      </div>

      {/* 5 — kontent: uch zona */}
      <Container
        size="wide"
        className="relative z-[5] flex h-full flex-col justify-between pb-[clamp(2.5rem,4vh,5rem)] pt-[clamp(7rem,5.5rem+4vw,10rem)]"
      >
        {/* YUQORI — unvon + ism */}
        <div className="flex flex-col gap-5">
          <m.p
            className="flex items-center gap-3 font-mono text-label uppercase tracking-[0.16em] text-fg-muted"
            {...fadeUp(0.12)}
          >
            <span aria-hidden="true" className="h-px w-8 bg-accent/80" />
            {eyebrow}
          </m.p>

          <h1 className="flex flex-col font-display font-light leading-[0.92] tracking-[-0.03em] text-[clamp(2.5rem,0.9rem+5.4vw,6.25rem)]">
            <m.span className="block text-fg" {...nameReveal(0.1)}>
              {firstName}
            </m.span>
            <m.span className="block text-fg-muted" {...nameReveal(0.18)}>
              {lastName}
            </m.span>
          </h1>
        </div>

        {/* PAST — tavsif/CTA (chap) + statistika (o'ng) */}
        <div className="flex flex-col gap-10 sm:gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <m.div
            className="flex max-w-[40ch] flex-col gap-7"
            {...fadeUp(0.46)}
          >
            <p className="text-body-lg text-fg-muted">{intro}</p>
            <div className="flex flex-wrap items-center gap-3">
              <AnchorButton targetId="contact" variant="primary" size="lg">
                {ctaLabel}
              </AnchorButton>
              <AnchorButton targetId="work" variant="glass" size="lg">
                {reelLabel}
              </AnchorButton>
            </div>
          </m.div>

          <m.div className="shrink-0" {...fadeUp(0.58)}>
            <StatRow
              items={stats}
              className="gap-x-8 sm:gap-x-12 lg:justify-end"
            />
          </m.div>
        </div>
      </Container>

      <div className="z-[5]">
        <ScrollCue reduced={reduced} />
      </div>
    </section>
  );
}
