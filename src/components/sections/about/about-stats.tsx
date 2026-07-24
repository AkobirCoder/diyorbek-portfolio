"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion-tokens";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { StatItem } from "@/components/shared/stat-row";

/**
 * AboutStats — ekranga kirganda 0→qiymat sanaladigan statistika (Blueprint §8).
 *
 * Sanoq React state'siz — `animate()` qiymatni to'g'ridan-to'g'ri DOM tuguniga
 * yozadi (`textContent`), shuning uchun har kadrda qayta render bo'lmaydi va
 * `set-state-in-effect` qoidasi buzilmaydi. `reduced` — darhol yakuniy qiymat.
 */
export function AboutStats({
  items,
  className,
}: {
  items: readonly StatItem[];
  className?: string;
}) {
  const listRef = useRef<HTMLDListElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const inView = useInView(listRef, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;

    const controls = items.map((item, i) => {
      const node = nodeRefs.current[i];
      if (!node) return null;

      const match = /^(\d+)(.*)$/.exec(item.value);
      if (!match) {
        node.textContent = item.value;
        return null;
      }

      const target = Number(match[1]);
      const suffix = match[2] ?? "";

      if (reduced) {
        node.textContent = `${target}${suffix}`;
        return null;
      }

      return animate(0, target, {
        duration: 1.2,
        ease: ease.outExpo,
        onUpdate: (v) => {
          node.textContent = `${Math.round(v)}${suffix}`;
        },
      });
    });

    return () => controls.forEach((c) => c?.stop());
  }, [inView, items, reduced]);

  return (
    <dl ref={listRef} className={cn("flex flex-wrap gap-x-14 gap-y-8", className)}>
      {items.map((item, i) => (
        <div key={item.label} className="flex flex-col gap-2">
          <dd
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className="font-display text-display-2 font-light leading-none text-fg tabular-nums"
          >
            0
          </dd>
          <dt className="max-w-[12ch] font-mono text-label uppercase tracking-[0.14em] text-fg-muted">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
