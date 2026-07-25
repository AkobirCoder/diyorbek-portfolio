"use client";

import { forwardRef, memo, type CSSProperties, type MouseEvent } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/types/project";

export interface CarouselCardProps {
  project: Project;
  categoryLabel: string;
  index: number;
  width: number;
  height: number;
  /** SSR/boshlang'ich holat — flash oldini oladi. */
  initialStyle: Pick<CSSProperties, "transform" | "opacity" | "zIndex">;
  onCardClick: (index: number, event: MouseEvent) => void;
}

/**
 * CarouselCard — presentatsion kartochka. Tashqi `div` (ref) transformi
 * LoopCarousel tomonidan imperativ o'rnatiladi; `Link` Case Study'ga o'tadi.
 * `memo` — ota re-render bo'lganda qayta chizilmaydi (proplar barqaror).
 */
export const CarouselCard = memo(
  forwardRef<HTMLDivElement, CarouselCardProps>(function CarouselCard(
    { project, categoryLabel, index, width, height, initialStyle, onCardClick },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-index={index}
        className="absolute left-1/2 top-1/2 will-change-transform"
        style={{
          width,
          height,
          transformStyle: "preserve-3d",
          ...initialStyle,
        }}
      >
        <Link
          href={`/work/${project.slug}`}
          onClick={(e) => onCardClick(index, e)}
          aria-label={`${project.title} — ${project.client}, ${categoryLabel}, ${project.year}`}
          className="carousel-card group relative flex h-full w-full flex-col overflow-hidden rounded-panel border border-border bg-surface elev-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src={project.cover}
            alt=""
            fill
            loading="lazy"
            sizes="320px"
            className="object-fill transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-bg via-bg/30 to-transparent"
          />
          <div className="relative mt-auto flex flex-col gap-1.5 p-6">
            {/* <span className="font-mono text-label uppercase tracking-[0.12em] text-accent">
              {categoryLabel} · {project.year}
            </span> */}
            {/* <span className="font-display text-h2 font-light leading-tight text-fg">
              {project.title}
            </span> */}
            {/* <span className="text-body text-fg-muted">{project.client}</span> */}
          </div>
        </Link>
      </div>
    );
  }),
);
