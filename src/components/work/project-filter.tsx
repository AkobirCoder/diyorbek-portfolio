"use client";

import { useRef, type KeyboardEvent } from "react";
import type { ProjectCategory } from "@/types/project";
import { cn } from "@/lib/utils";

export type FilterKey = "all" | ProjectCategory;

/**
 * ProjectFilter — loyiha toifasi filtri (Blueprint §6, §10).
 * `role=tablist` + roving tabindex + strelka/Home/End klaviatura navigatsiyasi.
 */
export function ProjectFilter({
  filters,
  active,
  onChange,
  label,
}: {
  filters: readonly { key: FilterKey; label: string }[];
  active: FilterKey;
  onChange: (key: FilterKey) => void;
  /** tablist uchun aria-label. */
  label: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % filters.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + filters.length) % filters.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = filters.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    const target = filters[next];
    if (target) {
      onChange(target.key);
      refs.current[next]?.focus();
    }
  }

  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
      {filters.map((filter, i) => {
        const selected = filter.key === active;
        return (
          <button
            key={filter.key}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(filter.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "rounded-full border px-5 py-2.5 font-mono text-label uppercase tracking-[0.12em] transition-colors duration-[240ms]",
              selected
                ? "border-accent bg-accent text-bg"
                : "border-border bg-surface/50 text-fg-muted hover:border-fg/20 hover:text-fg",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
