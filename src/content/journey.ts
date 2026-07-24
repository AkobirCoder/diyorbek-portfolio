/**
 * journey.ts — vaqt chizig'i: 2022 → 2026 (Blueprint §0, §1, §8).
 * Uch tilli. QORALAMA — haqiqiy voqealar bilan almashtiriladi.
 */

import type { LocalizedMilestone } from "@/types/journey";

export const milestones: readonly LocalizedMilestone[] = [
  {
    year: 2022,
    title: {
      uz: "Birinchi kamera",
      ru: "Первая камера",
      en: "First camera",
    },
    description: {
      uz: "Videografiya bilan jiddiy shug'ullanish boshlandi — birinchi buyurtmalar va tunlar montaj ortida.",
      ru: "Серьёзное погружение в видеографию — первые заказы и ночи за монтажом.",
      en: "A serious start in videography — first commissions and long nights in the edit.",
    },
  },
  {
    year: 2023,
    title: {
      uz: "Reels va birinchi brendlar",
      ru: "Reels и первые бренды",
      en: "Reels and first brands",
    },
    description: {
      uz: "Vertikal kontent orqali auditoriya o'sdi; birinchi mahalliy brendlar bilan doimiy hamkorlik.",
      ru: "Аудитория выросла через вертикальный контент; первые постоянные локальные бренды.",
      en: "Audience grew through vertical content; first ongoing work with local brands.",
    },
  },
  {
    year: 2024,
    title: {
      uz: "Brend filmlariga o'tish",
      ru: "Переход к бренд-фильмам",
      en: "Moving into brand films",
    },
    description: {
      uz: "To'liq siklli produksiya — g'oyadan rang berishgacha. DaVinci Resolve'da rang uslubi shakllandi.",
      ru: "Полный цикл продакшна — от идеи до цвета. Сформировался цветовой стиль в DaVinci Resolve.",
      en: "Full-cycle production — idea to color. A signature grade took shape in DaVinci Resolve.",
    },
  },
  {
    year: 2025,
    title: {
      uz: "Moda va go'zallik yo'nalishi",
      ru: "Мода и красота",
      en: "Fashion and beauty",
    },
    description: {
      uz: "Kolleksiya va go'zallik brendlari bilan estetik loyihalar; xalqaro mijozlar bilan birinchi ishlar.",
      ru: "Эстетичные проекты с коллекциями и бьюти-брендами; первые международные клиенты.",
      en: "Aesthetic projects with collections and beauty brands; first international clients.",
    },
  },
  {
    year: 2026,
    title: {
      uz: "100+ loyiha",
      ru: "100+ проектов",
      en: "100+ projects",
    },
    description: {
      uz: "50+ mijoz, 4 yil tajriba. Yolg'iz muallif sifatida — g'oyadan yakuniy montajgacha bir qo'lda.",
      ru: "50+ клиентов, 4 года опыта. Как единственный автор — от идеи до финала в одних руках.",
      en: "50+ clients, 4 years of experience. As a solo author — idea to final cut, in one pair of hands.",
    },
  },
] as const;
