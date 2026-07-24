import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — Tailwind sinflarini xavfsiz birlashtiradi.
 * clsx shartli sinflarni yig'adi, twMerge ziddiyatli utilitalarni tozalaydi.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
