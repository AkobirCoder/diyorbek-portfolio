"use client";

import { useEffect, useState } from "react";

/**
 * useScrollSpy — ko'rinishdagi faol bo'lim id'sini qaytaradi.
 * IntersectionObserver ekran markazi atrofidagi bo'limni tanlaydi.
 * `ids` barqaror bo'lishi kerak (modul darajasidagi massiv).
 */
export function useScrollSpy(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        const first = visible[0];
        if (first) {
          setActiveId(first.target.id);
        }
      },
      // Ekranning yuqori-o'rta uchdan biriga kirgan bo'lim faol hisoblanadi.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
