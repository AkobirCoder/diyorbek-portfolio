import { z } from "zod";

/**
 * validation.ts — brif shakli sxemasi (Blueprint §9).
 * Server va (yengil) mijoz validatsiyasi uchun yagona haqiqat manbai.
 * `company` — honeypot: bot to'ldirsa, bo'sh bo'lmaydi → rad etiladi.
 */

export const PROJECT_TYPES = [
  "brand",
  "commercial",
  "reels",
  "fashion",
  "other",
] as const;

export const briefSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  projectType: z
    .enum(PROJECT_TYPES)
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  /**
   * Honeypot — ko'rinmas maydon; odam bo'sh qoldiradi. Bot to'ldirsa, sxema
   * uni QABUL qiladi (rad etmaydi), lekin route jimgina tashlab yuboradi
   * (bot muvaffaqiyat deb o'ylaydi va moslashmaydi).
   */
  company: z.string().max(200).optional(),
});

export type BriefInput = z.infer<typeof briefSchema>;
