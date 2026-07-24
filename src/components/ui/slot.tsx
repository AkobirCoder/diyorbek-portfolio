import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Slot — `asChild` naqshi uchun minimal, server-xavfsiz implementatsiya.
 * Radix Slot 1.2+ ichki createContext ishlatgani uchun Server Component
 * grafida qulaydi; bu variant faqat cloneElement + prop birlashtirishdan
 * iborat, shuning uchun serverda ham ishlaydi va bog'liqlik qo'shmaydi.
 */

type AnyProps = Record<string, unknown>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...childProps };

  for (const key in slotProps) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];

    // Hodisa ishlovchilarini ketma-ket chaqiramiz (ikkalasi ham ishga tushadi)
    if (/^on[A-Z]/.test(key)) {
      if (typeof slotValue === "function" && typeof childValue === "function") {
        merged[key] = (...args: unknown[]) => {
          (childValue as (...a: unknown[]) => void)(...args);
          (slotValue as (...a: unknown[]) => void)(...args);
        };
      } else if (typeof slotValue === "function") {
        merged[key] = slotValue;
      }
    } else if (key === "className") {
      merged[key] = cn(slotValue as string, childValue as string);
    } else if (key === "style") {
      merged[key] = {
        ...(slotValue as React.CSSProperties),
        ...(childValue as React.CSSProperties),
      };
    } else {
      merged[key] = slotValue;
    }
  }

  return merged;
}

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, ...slotProps },
  ref,
) {
  if (!React.isValidElement(children)) {
    if (React.Children.count(children) > 1) {
      throw new Error("asChild bitta React elementini kutadi");
    }
    return null;
  }

  const child = children as React.ReactElement<AnyProps>;
  const childProps = child.props;

  return React.cloneElement(child, {
    ...mergeProps(slotProps as AnyProps, childProps),
    ref,
  } as Partial<AnyProps> & React.Attributes);
});
