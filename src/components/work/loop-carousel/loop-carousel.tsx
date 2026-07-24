"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import {
  animate,
  useMotionValue,
  type AnimationPlaybackControls,
} from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Project, ProjectCategory } from "@/types/project";
import { cn } from "@/lib/utils";
import { useCarouselConfig } from "./use-carousel-config";
import { cardGeometry, activeIndex } from "./geometry";
import { CarouselCard } from "./carousel-card";

export interface LoopCarouselLabels {
  carousel: string;
  prev: string;
  next: string;
}

const AUTOPLAY_MS = 3800;

/**
 * LoopCarousel — kinematik 3D loop karusel (native, kutubxonasiz).
 * Arxitektura: yagona `position` motion value → har kadr transformi imperativ
 * yoziladi (60 FPS, React re-render yo'q). Drag/g'ildirak/touch/autoplay/klaviatura.
 */
export function LoopCarousel({
  projects,
  categoryLabels,
  labels,
  className,
}: {
  projects: readonly Project[];
  categoryLabels: Record<ProjectCategory, string>;
  labels: LoopCarouselLabels;
  className?: string;
}) {
  const count = projects.length;
  const cfg = useCarouselConfig();
  const reduced = useReducedMotion();

  const position = useMotionValue(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  /** Mo'ljallangan butun holat — tez ketma-ket qadamlar to'planishi uchun. */
  const targetRef = useRef(0);

  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const paused = hovering || focusWithin;

  /** Har kadrning transformini imperativ yozadi (re-render yo'q). */
  const apply = useCallback(
    (v: number) => {
      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const g = cardGeometry(i, v, count, cfg);
        el.style.transform = g.transform;
        el.style.opacity = String(g.opacity);
        el.style.zIndex = String(g.zIndex);
        el.style.pointerEvents = g.visible ? "auto" : "none";
        el.dataset.active = g.absOffset < 0.5 ? "true" : "false";
      }
    },
    [cfg, count],
  );

  useEffect(() => {
    apply(position.get());
    const unsubscribe = position.on("change", (v) => {
      apply(v);
      const idx = activeIndex(v, count);
      setActive((prev) => (prev === idx ? prev : idx));
    });
    return unsubscribe;
  }, [apply, position, count]);

  /* ── Aylantirish ─────────────────────────────────────────────────── */

  const stepTo = useCallback(
    (target: number, velocity = 0) => {
      targetRef.current = target;
      controls.current?.stop();
      if (reduced) {
        position.set(target);
        return;
      }
      controls.current = animate(position, target, {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.9,
        velocity,
      });
    },
    [position, reduced],
  );

  const step = useCallback(
    (dir: number) => stepTo(targetRef.current + dir),
    [stepTo],
  );

  const goToIndex = useCallback(
    (target: number) => {
      const base = Math.round(position.get());
      const current = ((base % count) + count) % count;
      let delta = ((target - current) % count + count) % count;
      if (delta > count / 2) delta -= count;
      stepTo(base + delta);
    },
    [position, count, stepTo],
  );

  /* ── Autoplay ────────────────────────────────────────────────────── */

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => step(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced, paused, step]);

  /* ── Drag (inertsiya bilan) ──────────────────────────────────────── */

  const drag = useRef({
    active: false,
    startX: 0,
    startPos: 0,
    lastVal: 0,
    lastT: 0,
    velocity: 0,
  });

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      controls.current?.stop();
      e.currentTarget.setPointerCapture?.(e.pointerId);
      drag.current = {
        active: true,
        startX: e.clientX,
        startPos: position.get(),
        lastVal: position.get(),
        lastT: performance.now(),
        velocity: 0,
      };
    },
    [position],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d.active) return;
      const dx = e.clientX - d.startX;
      const v = d.startPos - dx / cfg.dragPx;
      const now = performance.now();
      const dt = now - d.lastT;
      if (dt > 0) d.velocity = ((v - d.lastVal) / dt) * 1000;
      d.lastVal = v;
      d.lastT = now;
      position.set(v);
    },
    [cfg.dragPx, position],
  );

  const onPointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d.active) return;
      d.active = false;
      e.currentTarget.releasePointerCapture?.(e.pointerId);

      const projected = position.get() + (reduced ? 0 : d.velocity * 0.12);
      const base = Math.round(position.get());
      const target = Math.max(base - 3, Math.min(base + 3, Math.round(projected)));
      stepTo(target, reduced ? 0 : d.velocity);
    },
    [position, reduced, stepTo],
  );

  /* ── G'ildirak (native, passiv emas) ─────────────────────────────── */

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let cooldown = 0;
    function onWheel(e: WheelEvent) {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 2) return;
      e.preventDefault();
      const now = performance.now();
      if (now - cooldown < 220) return;
      cooldown = now;
      step(delta > 0 ? 1 : -1);
    }
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [step]);

  /* ── Klaviatura + fokus ──────────────────────────────────────────── */

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      }
    },
    [step],
  );

  const onFocusCapture = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      setFocusWithin(true);
      const holder = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-index]",
      );
      if (holder?.dataset.index) goToIndex(Number(holder.dataset.index));
    },
    [goToIndex],
  );

  const onCardClick = useCallback(
    (index: number, e: MouseEvent) => {
      // Faol bo'lmagan kadr — markazga aylantiriladi (navigatsiya emas)
      if (index !== activeIndex(position.get(), count)) {
        e.preventDefault();
        goToIndex(index);
      }
      // Faol kadr — Link Case Study'ga o'tadi
    },
    [position, count, goToIndex],
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={labels.carousel}
        tabIndex={-1}
        className="relative mx-auto flex touch-pan-y select-none items-center justify-center"
        style={{ height: cfg.cardH + 130, perspective: `${cfg.perspective}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocusCapture={onFocusCapture}
        onBlurCapture={() => setFocusWithin(false)}
        onKeyDown={onKeyDown}
      >
        <div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project, i) => {
            const g = cardGeometry(i, 0, count, cfg);
            return (
              <CarouselCard
                key={project.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                project={project}
                categoryLabel={categoryLabels[project.category]}
                index={i}
                width={cfg.cardW}
                height={cfg.cardH}
                initialStyle={{
                  transform: g.transform,
                  opacity: g.opacity,
                  zIndex: g.zIndex,
                }}
                onCardClick={onCardClick}
              />
            );
          })}
        </div>
      </div>

      {/* Boshqaruv tugmalari */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={labels.prev}
          className="grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:border-fg/20 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label={labels.next}
          className="grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:border-fg/20 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Ekran o'quvchi uchun faol kadr e'loni */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {projects[active]?.title}
      </p>
    </div>
  );
}
