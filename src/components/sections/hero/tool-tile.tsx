"use client";

import { motion, useTransform } from "motion/react";
import type { Tool } from "@/content/tools";
import type { MouseParallax } from "@/hooks/use-mouse-parallax";
import { toolIcons } from "./tool-icons";
import { ease } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * ToolTile — suzuvchi shisha plitka, ichida dastur nishoni (Blueprint §4).
 *
 * Uch transform qatlami alohida elementlarda — bir-birini bosmasligi uchun:
 *   1) joylashuv (absolute + markazlash)
 *   2) sichqoncha parallaksi (eng tez qatlam, ±28px × chuqurlik)
 *   3) cheksiz suzish (har biri o'z fazasida — sinxronlik sun'iy ko'rinadi)
 *
 * Faqat transform va opacity animatsiya qilinadi → 60 FPS.
 */
export function ToolTile({
  tool,
  index,
  parallax,
  reduced,
  pos,
  className,
}: {
  tool: Tool;
  index: number;
  parallax: MouseParallax;
  reduced: boolean;
  /** Breakpoint bo'yicha tanlangan joylashuv (FloatingTools hal qiladi). */
  pos: { x: number; y: number };
  className?: string;
}) {
  const Icon = toolIcons[tool.id];
  const amount = 28 * tool.depth;
  const x = useTransform(parallax.x, (v) => v * amount);
  const y = useTransform(parallax.y, (v) => v * amount * 0.7);

  if (!Icon) return null;

  return (
    <div
      className={cn("absolute -translate-x-1/2 -translate-y-1/2", className)}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      {/* Parallaks qatlami */}
      <motion.div style={reduced ? undefined : { x, y }}>
        {/* Kirish + suzish qatlami */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: reduced ? 0.2 : 0.8,
            delay: reduced ? 0 : 0.85 + index * 0.07,
            ease: ease.outExpo,
          }}
        >
          <motion.div
            animate={
              reduced ? undefined : { y: [0, -14, 0], rotate: [-3.5, 3.5, -3.5] }
            }
            transition={{
              duration: tool.float,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.6,
            }}
            className="relative"
          >
            {/* Brend rangidagi yumshoq nur */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full blur-xl"
              style={{
                background: `radial-gradient(circle, ${tool.glow}33 0%, transparent 70%)`,
              }}
            />

            {/* Shisha plitka (bezak — ota element aria-hidden) */}
            <div
              className={cn(
                "glass-1 elev-2 relative grid place-items-center rounded-glass",
                "h-11 w-11 sm:h-14 sm:w-14 lg:h-[68px] lg:w-[68px]",
              )}
            >
              <Icon className="h-[62%] w-[62%]" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
