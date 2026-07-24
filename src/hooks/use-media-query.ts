"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * useMediaQuery — SSR-xavfsiz media so'rov kuzatuvchisi.
 * Serverda `false` qaytaradi, mijozda haqiqiy holatga sinxronlashadi.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
