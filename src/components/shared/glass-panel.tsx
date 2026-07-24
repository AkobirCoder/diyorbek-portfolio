import * as React from "react";
import { cn } from "@/lib/utils";

type GlassLevel = 1 | 2 | 3;

const levelClass: Record<GlassLevel, string> = {
  1: "glass-1",
  2: "glass-2",
  3: "glass-3",
};

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Blur/shaffoflik darajasi (Blueprint §5). 1=ToolTile, 2=Header/Modal, 3=CTA. */
  level?: GlassLevel;
  /** Burchak radiusi. */
  radius?: "card" | "glass" | "panel" | "full";
}

const radiusClass = {
  card: "rounded-card",
  glass: "rounded-glass",
  panel: "rounded-panel",
  full: "rounded-full",
} as const;

/**
 * GlassPanel — barcha shishasimon yuzalar uchun asos.
 * ToolTile, Header, VideoModal, CTA paneli shu komponentdan quriladi.
 */
export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  function GlassPanel(
    { level = 2, radius = "glass", className, children, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(levelClass[level], radiusClass[radius], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
