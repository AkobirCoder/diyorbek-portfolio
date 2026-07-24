"use client";

import { tools } from "@/content/tools";
import type { MouseParallax } from "@/hooks/use-mouse-parallax";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ToolTile } from "./tool-tile";

/**
 * FloatingTools — portret atrofidagi 6 ta suzuvchi ikonka (Blueprint §9).
 *
 * Responsive: mobilda 4 ta, planshetda 5 ta, desktopda 6 ta.
 * Joylashuvlar chetlarga yaqin (x: 8–19% va 81–92%), shuning uchun hech qachon
 * yuz sohasini qoplamaydi.
 */

/** Ustuvorlikka qarab ko'rinish sinfi — mobil 4, md 5, lg 6. */
function visibilityClass(priority: number): string {
  if (priority <= 4) return "";
  if (priority === 5) return "hidden md:block";
  return "hidden lg:block";
}

export function FloatingTools({
  parallax,
  reduced,
}: {
  parallax: MouseParallax;
  reduced: boolean;
}) {
  // Mobil (<640px) alohida xavfsiz joylashuvlarni ishlatadi
  const isMobile = useMediaQuery("(max-width: 639px)");

  // Hero'da ikonkalar ambient bezak — dasturlarning rasmiy, o'qiladigan
  // ro'yxati Skills bo'limida (ToolMarquee) beriladi. Shu sabab bu yerda
  // ekran o'quvchidan yashiriladi (Blueprint §10: bezaklar aria-hidden).
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {tools.map((tool, index) => (
        <ToolTile
          key={tool.id}
          tool={tool}
          index={index}
          parallax={parallax}
          reduced={reduced}
          pos={isMobile ? tool.posMobile : tool.pos}
          className={visibilityClass(tool.priority)}
        />
      ))}
    </div>
  );
}
