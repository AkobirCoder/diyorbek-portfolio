/**
 * site.ts — Yagona haqiqat manbai (single source of truth).
 * Domen, aloqa ma'lumotlari, ijtimoiy tarmoqlar shu yerdan olinadi.
 * Hech qayerda bu qiymatlar qattiq yozilmasin — hammasi shu fayldan import qilinadi.
 */

export const LOCALES = ["uz", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";

export const site = {
  name: "Diyorbek Zarifboyev",
  role: "Videomaker",
  location: {
    city: "Toshkent",
    cityEn: "Tashkent",
    country: "O'zbekiston",
    countryEn: "Uzbekistan",
  },

  /** Ishlab chiqarish domeni. Haqiqiy domen olinganda faqat shu qator o'zgaradi. */
  url: "https://diyorbekportfolio.vercel.app",

  /** Hero ostidagi ishonch raqamlari — Blueprint bo'yicha uchta. */
  stats: [
    { value: "100+", labelKey: "stats.projects" },
    { value: "50+", labelKey: "stats.clients" },
    { value: "4", labelKey: "stats.years" },
  ],

  contact: {
    email: "zarifboyevdiyor@gmail.com",
    phone: "+998 93 255 69 49",
    phoneHref: "+998932556949",
  },

  social: {
    instagram: {
      handle: "@dico.uz",
      url: "https://instagram.com/dico.uz",
    },
    telegram: {
      handle: "@dicouz",
      url: "https://t.me/dicouz",
      /** Loyiha videolari shu ochiq kanaldan olinadi. */
      channel: "dicouz",
    },
  },
} as const;

export type Site = typeof site;
