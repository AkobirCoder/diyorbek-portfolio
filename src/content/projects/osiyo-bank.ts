/** QORALAMA loyiha — haqiqiy nom·mijoz·yil·Telegram havolasi keyin almashtiriladi. */
import type { LocalizedProject } from "@/types/project";

export const osiyoBank: LocalizedProject = {
  slug: "osiyo-bank",
  client: "Osiyo Bank",
  category: "brand",
  format: "16:9",
  year: 2025,
  cover: "/work/osiyo-bank/cover.jpg",
  telegramUrl: "https://t.me/dicouz/109",
  featured: true,
  title: {
    uz: "Ishonch qurilishi",
    ru: "Построение доверия",
    en: "Building trust",
  },
  teaser: {
    uz: "Bank uchun insonlarga yaqin, iliq korporativ imidj film.",
    ru: "Тёплый, человечный корпоративный имидж-фильм для банка.",
    en: "A warm, human corporate image film for a bank.",
  },
  caseStudy: {
    intro: {
      uz: "Osiyo Bank sovuq korporativ ohangdan uzoqlashib, oddiy odamlar hikoyasiga tayanmoqchi edi.",
      ru: "Osiyo Bank хотели уйти от холодного корпоративного тона и опереться на истории обычных людей.",
      en: "Osiyo Bank wanted to move away from a cold corporate tone and lean on the stories of everyday people.",
    },
    approach: {
      uz: "Hujjatli uslubdagi intervyular va tabiiy yorug'lik; montajda insoniy lahzalar raqamlardan ustun qo'yildi.",
      ru: "Интервью в документальном стиле и естественный свет; в монтаже человеческие моменты важнее цифр.",
      en: "Documentary-style interviews and natural light; the edit puts human moments above numbers.",
    },
  },
  gallery: [
    {
      src: "/work/osiyo-bank/01.jpg",
      width: 1600,
      height: 900,
      alt: { uz: "Intervyu kadri", ru: "Кадр интервью", en: "Interview frame" },
    },
    {
      src: "/work/osiyo-bank/02.jpg",
      width: 1600,
      height: 900,
      alt: { uz: "Ko'cha portreti", ru: "Уличный портрет", en: "Street portrait" },
    },
  ],
};
