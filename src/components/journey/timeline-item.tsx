"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";
import { ease, revealViewport } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Milestone } from "@/types/journey";

/**
 * TimelineItem — bitta bosqich (Blueprint §4, §8).
 * Nuqta ekranga kirganda scale 0→1 + nur portlashi. Matn opacity+y bilan suriladi.
 * Desktopda toq/juft indeks bo'yicha chap/o'ng almashadi; mobilda hammasi o'ngda.
 */
export function TimelineItem({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const reduced = useReducedMotion();
  const isRight = index % 2 === 1;

  return (
    <li className="relative pl-14 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0">
      {/* Nuqta — chiziq ustida */}
      <span className="absolute left-2 top-1.5 z-[1] -translate-x-1/2 md:left-1/2">
        <m.span
          className="relative grid h-4 w-4 place-items-center rounded-full border-2 border-accent bg-bg"
          initial={reduced ? undefined : { scale: 0 }}
          whileInView={reduced ? undefined : { scale: 1 }}
          viewport={revealViewport}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {reduced ? null : (
            <m.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-accent"
              initial={{ opacity: 0.7, scale: 0.6 }}
              whileInView={{ opacity: 0, scale: 3 }}
              viewport={revealViewport}
              transition={{ duration: 0.9, ease: ease.outExpo }}
            />
          )}
        </m.span>
      </span>

      {/* Kontent */}
      <m.div
        className={cn(
          "flex flex-col gap-2 pb-14 md:pb-20",
          isRight
            ? "md:col-start-2 md:pl-4"
            : "md:col-start-1 md:items-end md:pr-4 md:text-right",
        )}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: reduced ? 0.2 : 0.6, ease: ease.outExpo }}
      >
        <span className="font-mono text-label uppercase tracking-[0.14em] text-accent tabular-nums">
          {milestone.year}
        </span>
        <h3 className="text-h2 text-fg">{milestone.title}</h3>
        <p className="max-w-[42ch] text-body text-fg-muted text-pretty">
          {milestone.description}
        </p>
      </m.div>
    </li>
  );
}
