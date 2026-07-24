"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import type { GalleryImage } from "@/types/project";
import { GalleryLightbox, type LightboxLabels } from "./gallery-lightbox";

/**
 * CaseGallery — kadr setkasi + Lightbox (Blueprint §4).
 * Har rasm bosilganda to'liq ekranli ko'ruvchi ochiladi.
 */
export function CaseGallery({
  label,
  images,
  labels,
}: {
  label: string;
  images: readonly GalleryImage[];
  labels: LightboxLabels;
}) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <Container size="wide" className="mt-20 lg:mt-28">
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={image.alt}
            className="group relative aspect-video overflow-hidden rounded-glass border border-border elev-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <GalleryLightbox
        images={images}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
        labels={labels}
      />
    </Container>
  );
}
