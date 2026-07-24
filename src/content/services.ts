/**
 * services.ts — taklif etiladigan xizmatlar (Blueprint §0, §1).
 * Uch tilli. Skills = "nima qila oladi", Services = "nimani taklif qiladi".
 */

import type { LocalizedService } from "@/types/content";

export const services: readonly LocalizedService[] = [
  {
    key: "brand-films",
    label: {
      uz: "Brend filmlari",
      ru: "Бренд-фильмы",
      en: "Brand films",
    },
    description: {
      uz: "Kompaniya yoki mahsulotni kino tilida ochib beruvchi to'liq imidj video.",
      ru: "Имиджевое видео, раскрывающее компанию или продукт языком кино.",
      en: "Image films that reveal a company or product in the language of cinema.",
    },
  },
  {
    key: "commercials",
    label: {
      uz: "Reklama roliklari",
      ru: "Рекламные ролики",
      en: "Commercials",
    },
    description: {
      uz: "Aniq maqsadli, konvertatsiyaga yo'naltirilgan qisqa reklama videolari.",
      ru: "Целевые рекламные ролики, ориентированные на конверсию.",
      en: "Targeted, conversion-focused short-form commercials.",
    },
  },
  {
    key: "reels",
    label: {
      uz: "Reels va vertikal kontent",
      ru: "Reels и вертикальный контент",
      en: "Reels & vertical content",
    },
    description: {
      uz: "Instagram va TikTok uchun tempoli, e'tibor tortuvchi vertikal video seriyalari.",
      ru: "Темповые, цепляющие вертикальные серии для Instagram и TikTok.",
      en: "Paced, scroll-stopping vertical series for Instagram and TikTok.",
    },
  },
  {
    key: "fashion-beauty",
    label: {
      uz: "Moda va go'zallik",
      ru: "Мода и красота",
      en: "Fashion & beauty",
    },
    description: {
      uz: "Kolleksiya, lukbuk va go'zallik brendlari uchun estetik kadrlar.",
      ru: "Эстетичные кадры для коллекций, лукбуков и бьюти-брендов.",
      en: "Aesthetic frames for collections, lookbooks and beauty brands.",
    },
  },
  {
    key: "color-grading",
    label: {
      uz: "Rang berish",
      ru: "Цветокоррекция",
      en: "Color grading",
    },
    description: {
      uz: "Boshqa suratkashlar materialiga alohida xizmat sifatida kinematik rang.",
      ru: "Кинематографичный цвет как отдельная услуга для чужого материала.",
      en: "Cinematic color as a standalone service for other shooters' footage.",
    },
  },
  {
    key: "editing",
    label: {
      uz: "Montaj",
      ru: "Монтаж",
      en: "Editing",
    },
    description: {
      uz: "Xom materialdan tayyor hikoya — ritm, ovoz va grafika bilan.",
      ru: "Из сырого материала — готовая история с ритмом, звуком и графикой.",
      en: "From raw footage to a finished story — rhythm, sound and graphics.",
    },
  },
] as const;
