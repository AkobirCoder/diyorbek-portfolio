import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Kichik mono yorliq (masalan "01 — ISHLAR"). */
  eyebrow?: React.ReactNode;
  /** Asosiy sarlavha. */
  title: React.ReactNode;
  /** Ixtiyoriy tavsif paragrafi. */
  description?: React.ReactNode;
  /** Sarlavha darajasi — semantik to'g'rilik uchun (Blueprint §10). */
  as?: "h2" | "h3";
  align?: "start" | "center";
  /** Sarlavhani `aria-labelledby` bilan bog'lash uchun id. */
  titleId?: string;
}

/**
 * SectionHeading — har bir bo'lim sarlavhasi uchun yagona namuna.
 * TextReveal animatsiyasi 3-bosqichda tashqi o'ram orqali qo'shiladi.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "start",
  titleId,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
      {...props}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        id={titleId}
        className="text-display-2 text-fg max-w-[20ch] text-balance"
      >
        {title}
      </Tag>
      {description && (
        <p className="text-body-lg text-fg-muted max-w-[52ch]">{description}</p>
      )}
    </div>
  );
}
