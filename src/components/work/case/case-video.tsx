"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/shared/container";
import { VideoModal, type VideoModalLabels } from "../video-modal";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

/**
 * CaseVideo — case study'ning katta muqovasi + Play (Blueprint §4, §12).
 * Bosilganda VideoModal ochiladi (Telegram embed faqat shunda yuklanadi).
 */
export function CaseVideo({
  project,
  watchLabel,
  modalLabels,
}: {
  project: Project;
  watchLabel: string;
  modalLabels: VideoModalLabels;
}) {
  const [open, setOpen] = useState(false);
  const vertical = project.format === "9:16";

  return (
    <Container size="wide" className="mt-12 lg:mt-16">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${watchLabel}: ${project.title}`}
        className={cn(
          "group relative block w-full overflow-hidden rounded-panel border border-border elev-3",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          vertical ? "mx-auto aspect-[9/16] max-w-sm" : "aspect-video",
        )}
      >
        <Image
          src={project.cover}
          alt=""
          fill
          priority
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-fg/60 bg-bg/40 backdrop-blur-sm transition-transform duration-[300ms] group-hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 translate-x-1 text-fg" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>

      <VideoModal
        project={open ? project : null}
        onClose={() => setOpen(false)}
        labels={modalLabels}
      />
    </Container>
  );
}
