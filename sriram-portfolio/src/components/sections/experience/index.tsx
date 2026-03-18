"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useModeStore } from "@/store";
import { ExperienceDevMode } from "./ExperienceDevMode";
import { ExperienceDesignMode } from "./ExperienceDesignMode";

export default function Experience() {
  const mode = useModeStore((s) => s.mode);

  return (
    <AnimatePresence mode="wait">
      {mode === "developer" ? (
        <motion.div
          key="dev-exp"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ExperienceDevMode />
        </motion.div>
      ) : (
        <motion.div
          key="design-exp"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ExperienceDesignMode />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
