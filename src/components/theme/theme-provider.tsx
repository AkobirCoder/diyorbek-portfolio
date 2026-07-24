"use client";

import * as React from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const THEME_EVENT = "dz-themechange";

/** DOM'dagi haqiqiy tema — inline skript (themeInitScript) tomonidan o'rnatilgan. */
function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/**
 * ThemeProvider — data-theme'ni tashqi manba (DOM) sifatida kuzatadi.
 * useSyncExternalStore FOUC'siz ishlaydi: boshlang'ich holat inline skript
 * tomonidan qo'yilgan, bu yerda faqat React bilan sinxronlashtiramiz.
 * `storage` hodisasi orqali brauzer tablari o'rtasida ham moslashadi.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setTheme = React.useCallback((next: Theme) => {
    const root = document.documentElement;
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* localStorage mavjud bo'lmasa — jim davom etamiz */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme ThemeProvider ichida ishlatilishi kerak");
  }
  return ctx;
}
