"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useModeStore } from "@/store";
import { HeroDevMode } from "./HeroDevMode";
import { HeroDesignMode } from "./HeroDesignMode";
import type { getMeta } from "@/lib/data";

interface HeroProps {
  meta: ReturnType<typeof getMeta>;
}

export default function Hero({ meta }: HeroProps) {
  const mode = useModeStore((s) => s.mode);

  return (
    <AnimatePresence mode="wait">
      {mode === "developer" ? (
        <motion.div
          key="dev-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HeroDevMode meta={meta} />
        </motion.div>
      ) : (
        <motion.div
          key="design-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HeroDesignMode meta={meta} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
