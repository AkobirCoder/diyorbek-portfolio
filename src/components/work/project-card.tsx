"use client";

import Image from "next/image";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

/**
 * ProjectCard — bitta loyiha kartochkasi (Blueprint §4, §9).
 *
 * Format bo'yicha moslashadi:
 *   16:9 → 2 ustun (desktop yarim kenglik, asimmetrik) · aspect-video
 *   9:16 → 1 ustun (desktop chorak, lenta) · aspect-[9/16]
 * Bosilganda VideoModal ochiladi (onOpen). Muqova next/image bilan optimallashadi.
 */
export function ProjectCard({
  project,
  categoryLabel,
  watchLabel,
  onOpen,
}: {
  project: Project;
  categoryLabel: string;
  watchLabel: string;
  onOpen: (project: Project) => void;
}) {
  const isVertical = project.format === "9:16";

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`${watchLabel}: ${project.title} — ${project.client}`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-glass border border-border bg-surface text-left elev-1",
        "transition-colors duration-[240ms] hover:border-fg/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isVertical ? "col-span-1 aspect-[9/16]" : "col-span-2 aspect-video",
      )}
    >
      <Image
        src={project.cover}
        alt=""
        fill
        sizes={
          isVertical
            ? "(max-width: 1024px) 50vw, 25vw"
            : "(max-width: 1024px) 100vw, 50vw"
        }
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
      />

      {/* Pastki gradient — matn o'qilishi uchun */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent"
      />

      {/* Play belgisi — hover/fokusda paydo bo'ladi */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-fg/50 bg-bg/40 opacity-0 backdrop-blur-sm transition-opacity duration-[300ms] group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-0.5 text-fg" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>

      {/* Meta */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5">
        <span className="font-mono text-label uppercase tracking-[0.12em] text-accent">
          {categoryLabel} · {project.year}
        </span>
        <h3 className="text-h2 text-fg">{project.title}</h3>
        <span className="text-body text-fg-muted">{project.client}</span>
      </div>
    </button>
  );
}
