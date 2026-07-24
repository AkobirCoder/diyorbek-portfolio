"use client";

import { useEffect } from "react";

/**
 * useLockScroll — `locked` true bo'lganda body skrollini bloklaydi
 * (mobil menyu ochilganda). Skrollbar kengligini kompensatsiya qiladi,
 * shuning uchun kontent "sakramaydi".
 */
export function useLockScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { style } = document.body;
    const prevOverflow = style.overflow;
    const prevPaddingRight = style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      style.overflow = prevOverflow;
      style.paddingRight = prevPaddingRight;
    };
  }, [locked]);
}
