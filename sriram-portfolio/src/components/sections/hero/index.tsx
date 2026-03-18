"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useModeStore } from "@/store";
import { HeroDevMode } from "./HeroDevMode";
import { HeroDesignMode } from "./HeroDesignMode";

export default function Hero() {
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
          <HeroDevMode />
        </motion.div>
      ) : (
        <motion.div
          key="design-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HeroDesignMode />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
