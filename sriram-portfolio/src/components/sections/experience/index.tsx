"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useModeStore } from "@/store";
import { ExperienceDevMode } from "./ExperienceDevMode";
import { ExperienceDesignMode } from "./ExperienceDesignMode";
import type { ExperienceItem } from "./ExperienceData";

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperienceProps) {
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
          <ExperienceDevMode experiences={experiences} />
        </motion.div>
      ) : (
        <motion.div
          key="design-exp"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ExperienceDesignMode experiences={experiences} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
