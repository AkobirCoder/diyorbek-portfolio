import * as React from "react";
import { Slot } from "./slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — barcha chaqiruv tugmalari uchun yagona primitiv.
 * `asChild` orqali <Link> yoki <a> ga aylanadi (CTA'lar uchun zarur).
 * Motion 3-bosqichda o'rnatilgach, magnetic/hover animatsiyasi tashqi
 * o'ram (Magnetic) orqali qo'shiladi — tugmaning o'zi toza qoladi.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "font-mono text-label uppercase tracking-[0.14em]",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:pointer-events-none disabled:opacity-45",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        // Asosiy CTA — quyosh botishi
        primary:
          "bg-accent text-on-accent hover:bg-accent-hover elev-2 hover:elev-3",
        // Ikkilamchi — shisha
        glass: "glass-2 text-fg hover:bg-surface-raised rounded-full",
        // Uchinchi — nozik chegara
        outline:
          "border border-border-strong text-fg hover:border-accent hover:text-accent bg-transparent",
        // Eng yengil — fonsiz
        ghost: "text-fg-muted hover:text-fg hover:bg-surface bg-transparent",
      },
      size: {
        sm: "h-9 px-4 rounded-full",
        md: "h-11 px-6 rounded-full",
        lg: "h-14 px-8 rounded-full text-[0.8125rem]",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
