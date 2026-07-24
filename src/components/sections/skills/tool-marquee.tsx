"use client";

import { tools } from "@/content/tools";
import { toolIcons } from "@/components/sections/hero/tool-icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * ToolMarquee — jihoz va dasturlar lentasi (Blueprint §4).
 *
 * Uzluksiz gorizontal siljish (diskret "karusel" EMAS — Blueprint §8 taqiqiga
 * mos). Ro'yxat ikki marta takrorlanadi va -50% ga suriladi → uzuksiz halqa.
 * `reduced` — siljish o'chadi, o'rniga o'ralgan statik qator.
 */

function ToolChip({ id, label }: { id: string; label: string }) {
  const Icon = toolIcons[id];
  return (
    <div className="glass-1 flex items-center gap-3 rounded-full px-5 py-3">
      {Icon ? <Icon className="h-5 w-5 shrink-0" /> : null}
      <span className="whitespace-nowrap font-mono text-label uppercase tracking-[0.12em] text-fg-muted">
        {label}
      </span>
    </div>
  );
}

export function ToolMarquee({ label }: { label: string }) {
  const reduced = useReducedMotion();

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden}>
      {tools.map((tool) => (
        <li key={tool.id}>
          <ToolChip id={tool.id} label={tool.label} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col gap-6">
      <span className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
        {label}
      </span>

      {reduced ? (
        <ul className="flex flex-wrap items-center gap-4">
          {tools.map((tool) => (
            <li key={tool.id}>
              <ToolChip id={tool.id} label={tool.label} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="marquee-mask relative overflow-hidden">
          <div className="flex w-max animate-marquee">
            {row(false)}
            {row(true)}
          </div>
        </div>
      )}
    </div>
  );
}
