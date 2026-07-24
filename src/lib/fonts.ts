import { Unbounded, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Shriftlar — next/font/google build vaqtida yuklab olib, o'z domenimizdan
 * tarqatadi (runtime'da Google'ga so'rov yo'q). Uch til uchun `latin` + `cyrillic`
 * subsetlari majburiy. Hammasi variable — og'irlik o'qi to'liq keladi.
 */

// Display — kinoafisha hissi. Faqat yengil–o'rta og'irliklar ishlatiladi (Blueprint §6).
export const fontDisplay = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
  adjustFontFallback: true,
});

// Body — o'qish uchun.
export const fontBody = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: true,
});

// Meta / label — Frame.io aniqligi: yil, kategoriya, raqam.
export const fontMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
  adjustFontFallback: true,
});

/** Barcha shrift o'zgaruvchilarini <html> ga biriktirish uchun. */
export const fontVariables = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`;
