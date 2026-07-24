"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { getFocusable } from "@/lib/focus";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { useSmoothScroll } from "@/components/motion/smooth-scroll";
import type { GalleryImage } from "@/types/project";
import { cn } from "@/lib/utils";

export interface LightboxLabels {
  close: string;
  prev: string;
  next: string;
}

/**
 * GalleryLightbox — to'liq ekranli galereya ko'ruvchi (Blueprint §4, §10).
 * Esc / strelka klaviatura, fokus qamovi, skroll bloki — VideoModal bilan bir naqsh.
 */
export function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
  labels,
}: {
  images: readonly GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  labels: LightboxLabels;
}) {
  const open = index !== null;
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const scroll = useSmoothScroll();
  const multiple = images.length > 1;

  useLockScroll(open);

  useEffect(() => {
    if (open) scroll?.stop();
    else scroll?.start();
  }, [open, scroll]);

  useEffect(() => {
    if (!open || index === null) return;
    const container = containerRef.current;
    if (!container) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    getFocusable(container)[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight" && multiple) {
        event.preventDefault();
        onNavigate((index! + 1) % images.length);
        return;
      }
      if (event.key === "ArrowLeft" && multiple) {
        event.preventDefault();
        onNavigate((index! - 1 + images.length) % images.length);
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
  }, [open, index, images.length, multiple, onClose, onNavigate]);

  const current = index !== null ? images[index] : null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={current?.alt}
      inert={!open}
      data-state={open ? "open" : "closed"}
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10",
        "transition-opacity duration-[300ms]",
        open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
      )}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label={labels.close}
        onClick={onClose}
        className="absolute inset-0 bg-bg/92"
      />

      <button
        type="button"
        onClick={onClose}
        aria-label={labels.close}
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      {multiple && index !== null ? (
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + images.length) % images.length)}
          aria-label={labels.prev}
          className="absolute left-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg sm:left-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}

      {current ? (
        <div className="relative z-[1] flex items-center justify-center">
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="92vw"
            className="h-auto max-h-[82vh] w-auto max-w-[92vw] rounded-glass object-contain"
          />
        </div>
      ) : null}

      {multiple && index !== null ? (
        <button
          type="button"
          onClick={() => onNavigate((index + 1) % images.length)}
          aria-label={labels.next}
          className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg sm:right-6"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}

      {current && index !== null ? (
        <span className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-label uppercase tracking-[0.14em] text-fg-muted">
          {index + 1} / {images.length}
        </span>
      ) : null}
    </div>
  );
}
