"use client";

import { motion, useTransform } from "motion/react";
import type { MouseParallax } from "@/hooks/use-mouse-parallax";
import { portraitLqip } from "@/content/portrait-lqip";
import { duration, ease } from "@/lib/motion-tokens";

const NATURAL_WIDTH = 1085;
const NATURAL_HEIGHT = 1450;

/**
 * HeroPortrait — Hero'ning yuragi va LCP elementi (Blueprint §12).
 *
 * Rasm oldindan feather qilingan (chetlari shaffoflikka eritilgan), shuning
 * uchun subyekt qorong'ilikdan paydo bo'layotgandek ko'rinadi va fon bilan
 * seamless qo'shiladi — qo'pol kesish chizig'i yo'q.
 *
 * <picture> ishlatilgan: AVIF (20KB) + WebP zaxira, oldindan siqilgan.
 * next/image o'rniga — chunki rasm allaqachon optimal, qayta kodlash
 * sifatni pasaytiradi va server bosqichi qo'shadi.
 *
 * Parallaks: ±10px siljish + 1.5° perspektiv burilish.
 */
export function HeroPortrait({
  alt,
  parallax,
  reduced,
}: {
  alt: string;
  parallax: MouseParallax;
  reduced: boolean;
}) {
  const x = useTransform(parallax.x, (v) => v * 10);
  const y = useTransform(parallax.y, (v) => v * 8);
  const rotateY = useTransform(parallax.x, (v) => v * 1.5);
  const rotateX = useTransform(parallax.y, (v) => v * -1);

  return (
    <>
      {/* LCP uchun oldindan yuklash — React 19 <link>ni <head>ga ko'taradi */}
      <link
        rel="preload"
        as="image"
        href="/portrait/portrait.avif"
        type="image/avif"
        fetchPriority="high"
      />

      <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
        <motion.div
          className="relative h-[48svh] w-auto sm:h-[64svh] lg:h-[76svh]"
          style={
            reduced
              ? undefined
              : { x, y, rotateY, rotateX, transformPerspective: 1400 }
          }
          initial={{ opacity: 0, y: 60, scale: 1.04 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: reduced ? 0.2 : duration.cinema,
            delay: reduced ? 0 : 0.45,
            ease: ease.outExpo,
          }}
        >
          <picture>
            <source
              type="image/avif"
              srcSet="/portrait/portrait-mobile.avif 760w, /portrait/portrait.avif 1085w"
              sizes="(max-width: 768px) 78vw, 42vw"
            />
            <source
              type="image/webp"
              srcSet="/portrait/portrait-mobile.webp 760w, /portrait/portrait.webp 1085w"
              sizes="(max-width: 768px) 78vw, 42vw"
            />
            <img
              src="/portrait/portrait.webp"
              alt={alt}
              width={NATURAL_WIDTH}
              height={NATURAL_HEIGHT}
              fetchPriority="high"
              decoding="async"
              className="h-full w-auto select-none object-contain"
              style={{
                backgroundImage: `url(${portraitLqip})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                // Ikkinchi (CSS) feather qatlami — pishirilgan alpha ustiga.
                // Studiya fonining chetlarini kafolatli ravishda Hero foniga
                // eritadi, har qanday yorug'lik farqidan qat'i nazar.
                maskImage:
                  "radial-gradient(65% 72% at 50% 44%, #000 52%, transparent 88%)",
                WebkitMaskImage:
                  "radial-gradient(65% 72% at 50% 44%, #000 52%, transparent 88%)",
              }}
            />
          </picture>
        </motion.div>
      </div>
    </>
  );
}
