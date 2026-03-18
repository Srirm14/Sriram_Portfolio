"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useModeStore } from "@/store";
import { SkillsDevMode } from "./SkillsDevMode";
import { SkillsDesignMode } from "./SkillsDesignMode";

export default function Skills() {
  const mode = useModeStore((s) => s.mode);

  return (
    <AnimatePresence mode="wait">
      {mode === "developer" ? (
        <motion.div
          key="dev-skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SkillsDevMode />
        </motion.div>
      ) : (
        <motion.div
          key="design-skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SkillsDesignMode />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
