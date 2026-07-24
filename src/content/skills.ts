/**
 * skills.ts — 6 ta mahorat (Blueprint §1, §4: SkillCard×6).
 *
 * Uch tilli. `icon` — Phase 5'da skill ikonkalariga moslashtiriladi.
 * Ro'yxatni tahrirlash uchun faqat shu massivni o'zgartiring.
 */

import type { LocalizedSkill } from "@/types/content";

export const skills: readonly LocalizedSkill[] = [
  {
    key: "cinematography",
    icon: "camera",
    label: {
      uz: "Kinematografiya",
      ru: "Операторская работа",
      en: "Cinematography",
    },
    description: {
      uz: "Yorug'lik, kompozitsiya va kamera harakati — har kadr niyat bilan quriladi.",
      ru: "Свет, композиция и движение камеры — каждый кадр строится осознанно.",
      en: "Light, composition and camera movement — every frame built with intent.",
    },
  },
  {
    key: "directing",
    icon: "director",
    label: {
      uz: "Rejissura",
      ru: "Режиссура",
      en: "Directing",
    },
    description: {
      uz: "G'oyani ssenariy va kadrlar ketma-ketligiga aylantirish — hikoya ritmini boshqarish.",
      ru: "Превращение идеи в сценарий и раскадровку — управление ритмом истории.",
      en: "Turning an idea into script and shot list — steering the rhythm of the story.",
    },
  },
  {
    key: "editing",
    icon: "editing",
    label: {
      uz: "Montaj",
      ru: "Монтаж",
      en: "Editing",
    },
    description: {
      uz: "Premiere Pro va After Effects'da tempoli, aniq montaj — ortiqcha hech narsasiz.",
      ru: "Темповый, точный монтаж в Premiere Pro и After Effects — без лишнего.",
      en: "Paced, precise editing in Premiere Pro and After Effects — nothing wasted.",
    },
  },
  {
    key: "color",
    icon: "color",
    label: {
      uz: "Rang berish",
      ru: "Цветокоррекция",
      en: "Color grading",
    },
    description: {
      uz: "DaVinci Resolve'da kinematik rang — brend kayfiyatini bitta paletta bilan aytish.",
      ru: "Кинематографичный цвет в DaVinci Resolve — настроение бренда одной палитрой.",
      en: "Cinematic color in DaVinci Resolve — a brand's mood told in one palette.",
    },
  },
  {
    key: "sound",
    icon: "sound",
    label: {
      uz: "Ovoz va musiqa",
      ru: "Звук и музыка",
      en: "Sound & music",
    },
    description: {
      uz: "Musiqa tanlash, ovoz balansi va urg'u — kadrni his qildiradigan qatlam.",
      ru: "Подбор музыки, баланс звука и акценты — слой, который заставляет кадр чувствоваться.",
      en: "Music selection, audio balance and accents — the layer that makes a frame feel.",
    },
  },
  {
    key: "motion",
    icon: "motion",
    label: {
      uz: "Grafika va animatsiya",
      ru: "Графика и анимация",
      en: "Motion & graphics",
    },
    description: {
      uz: "Sarlavhalar, logotip animatsiyasi va yengil VFX — brend tilida, ortiqcha bezaksiz.",
      ru: "Титры, анимация логотипа и лёгкий VFX — на языке бренда, без лишнего декора.",
      en: "Titles, logo animation and light VFX — in the brand's language, no clutter.",
    },
  },
] as const;
