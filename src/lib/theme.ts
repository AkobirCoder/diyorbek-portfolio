/**
 * theme.ts — Tema tizimi asoslari (ikki rejim, Blueprint §7).
 * Qorong'i — asosiy va "haqiqiy" brend ko'rinishi. Yorug' — muharrirona variant.
 */

export const THEMES = ["dark", "light"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "dark";
export const THEME_STORAGE_KEY = "dz-theme";

/**
 * Flash'siz tema skripti — <head> ichida, React'dan oldin ishlaydi.
 * localStorage yoki tizim sozlamasini o'qib, <html data-theme> ni birinchi
 * bo'yoqdan oldin o'rnatadi (FOUC yo'q).
 */
export const themeInitScript = `
(function() {
  try {
    var key = "${THEME_STORAGE_KEY}";
    var stored = localStorage.getItem(key);
    // Qorong'i — brendning asosiy va "haqiqiy" ko'rinishi. Tizim sozlamasi
    // emas, faqat foydalanuvchining ANIQ tanlovi uni o'zgartiradi.
    var theme = stored === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;
