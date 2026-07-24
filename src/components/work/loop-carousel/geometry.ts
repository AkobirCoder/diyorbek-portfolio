import type { CarouselConfig } from "./use-carousel-config";

export interface CardGeometry {
  transform: string;
  opacity: number;
  zIndex: number;
  visible: boolean;
  absOffset: number;
}

/**
 * Bitta kadrning 3D holati — sof funksiya (render va imperativ yangilash bir
 * manbadan foydalanadi). `offset` uzluksiz halqaga o'raladi: [−N/2, N/2).
 */
export function cardGeometry(
  index: number,
  position: number,
  count: number,
  cfg: CarouselConfig,
): CardGeometry {
  let offset = index - position;
  offset = ((offset % count) + count) % count;
  if (offset > count / 2) offset -= count;

  const absOffset = Math.abs(offset);
  const angle = offset * cfg.angle;
  const rad = (angle * Math.PI) / 180;
  const x = Math.sin(rad) * cfg.radius;
  const z = (Math.cos(rad) - 1) * cfg.radius;
  const scale = Math.max(0.4, 1 - absOffset * cfg.scaleStep);
  const visible = absOffset <= cfg.maxVisible + 0.5;

  return {
    transform: `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, 0, ${z.toFixed(2)}px) rotateY(${(-angle).toFixed(2)}deg) scale(${scale.toFixed(3)})`,
    opacity: visible ? Math.max(0, 1 - absOffset * cfg.opacityStep) : 0,
    zIndex: Math.round(1000 - absOffset * 100),
    visible,
    absOffset,
  };
}

/** Joriy `position`dan faol (markaziy) kadr indeksi. */
export function activeIndex(position: number, count: number): number {
  return ((Math.round(position) % count) + count) % count;
}
