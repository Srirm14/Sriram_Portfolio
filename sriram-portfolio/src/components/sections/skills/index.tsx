"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useModeStore } from "@/store";
import { SkillsDevMode } from "./SkillsDevMode";
import { SkillsDesignMode } from "./SkillsDesignMode";
import type { SkillCategory } from "./SkillsData";

interface SkillsProps {
  skills: { dev: SkillCategory[]; design: SkillCategory[] };
}

export default function Skills({ skills }: SkillsProps) {
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
          <SkillsDevMode skills={skills} />
        </motion.div>
      ) : (
        <motion.div
          key="design-skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SkillsDesignMode skills={skills} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
