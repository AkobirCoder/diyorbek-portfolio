"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ease, revealViewport } from "@/lib/motion-tokens";

/**
 * TextReveal — sarlavhani so'zma-so'z ko'taruvchi reveal (Blueprint §8).
 * Har so'z stagger bilan y+opacity orqali suriladi. `aria-label` to'liq matnni
 * beradi, shuning uchun ekran o'quvchi bo'linmagan matnni bir marta o'qiydi.
 * `reduced` — animatsiyasiz oddiy sarlavha.
 */

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: { opacity: 1, y: 0 },
};

export interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** So'zlar orasidagi kechikish (Blueprint: sarlavha stagger ~40ms). */
  stagger?: number;
}

export function TextReveal({
  text,
  as = "h2",
  id,
  className,
  stagger = 0.045,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const MotionTag =
    as === "p"
      ? motion.p
      : as === "h1"
        ? motion.h1
        : as === "h3"
          ? motion.h3
          : motion.h2;

  if (reduced) {
    const Tag = as;
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ staggerChildren: stagger }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            className="inline-block"
            variants={wordVariants}
            transition={{ duration: 0.6, ease: ease.outExpo }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
