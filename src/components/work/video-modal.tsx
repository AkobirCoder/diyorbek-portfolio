"use client";

import { useEffect, useRef } from "react";
import { getFocusable } from "@/lib/focus";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

const easeExpo = "cubic-bezier(0.16,1,0.3,1)";

export interface VideoModalLabels {
  close: string;
  openInTelegram: string;
}

/**
 * VideoModal — loyiha videosini Telegram embed orqali ko'rsatadi (Blueprint §6, §12).
 *
 * MUHIM: iframe faqat modal ochilganda DOMga qo'shiladi — shuning uchun Telegram
 * vidjeti (~300KB) birinchi yuklanishda EMAS, faqat "Play" bosilganda tortiladi.
 * Fokus qamovi, Esc, skroll bloki, Lenis to'xtatish — MobileMenu bilan bir naqsh.
 */
export function VideoModal({
  project,
  onClose,
  labels,
}: {
  project: Project | null;
  onClose: () => void;
  labels: VideoModalLabels;
}) {
  const open = project !== null;
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const scroll = useSmoothScroll();

  useLockScroll(open);

  useEffect(() => {
    if (open) scroll?.stop();
    else scroll?.start();
  }, [open, scroll]);

  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    if (!container) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const focusables = getFocusable(container);
    focusables[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !container) return;
      const items = getFocusable(container);
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  const embedSrc = project ? `${project.telegramUrl}?embed=1` : "";

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={project ? `${project.title} — ${project.client}` : undefined}
      inert={!open}
      data-state={open ? "open" : "closed"}
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8",
        "transition-[opacity,visibility] duration-[420ms]",
        open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
      )}
      style={{ transitionTimingFunction: easeExpo }}
    >
      {/* Fon — bosilganda yopiladi */}
      <button
        type="button"
        tabIndex={-1}
        aria-label={labels.close}
        onClick={onClose}
        className="glass-2 absolute inset-0 bg-bg/80"
      />

      <div
        className={cn(
          "relative flex w-full max-w-[440px] flex-col gap-4 transition-transform duration-[420ms]",
          open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.98]",
        )}
        style={{ transitionTimingFunction: easeExpo }}
      >
        {/* Sarlavha + yopish */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
              {project?.client}
            </span>
            <h2 className="text-h2 text-fg">{project?.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Telegram embed — faqat ochiq bo'lganda mount qilinadi */}
        <div
          className={cn(
            "overflow-hidden rounded-glass border border-border bg-surface elev-3",
            project?.format === "9:16" ? "aspect-[9/16]" : "aspect-video",
          )}
        >
          {open && embedSrc ? (
            <iframe
              src={embedSrc}
              title={project ? `${project.title} — Telegram` : "Telegram"}
              className="h-full w-full"
              loading="lazy"
              allow="encrypted-media; fullscreen"
            />
          ) : null}
        </div>

        {project ? (
          <a
            href={project.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-3 font-mono text-label uppercase tracking-[0.12em] text-fg-muted transition-colors hover:bg-surface-raised hover:text-accent"
          >
            {labels.openInTelegram}
          </a>
        ) : null}
      </div>
    </div>
  );
}
