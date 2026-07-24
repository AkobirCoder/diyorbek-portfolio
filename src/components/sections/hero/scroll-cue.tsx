"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/motion-tokens";

/**
 * ScrollCue — pastga skroll qilish ishorasi. Nozik chiziq ichida
 * sekin pastga siljiydigan nur. 3s davomiy, bezovta qilmaydi.
 */
export function ScrollCue({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduced ? 0.2 : 0.8,
        delay: reduced ? 0 : 2.4,
        ease: ease.outExpo,
      }}
    >
      <div className="relative h-10 w-px overflow-hidden bg-border">
        {!reduced && (
          <motion.div
            className="absolute inset-x-0 h-4 bg-accent"
            animate={{ y: ["-100%", "250%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
