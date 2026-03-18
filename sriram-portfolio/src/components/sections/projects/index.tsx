"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useModeStore } from "@/store";
import { ProjectsDevMode } from "./ProjectsDevMode";
import { ProjectsDesignMode } from "./ProjectsDesignMode";
import type { ProjectItem } from "./ProjectsData";

interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  const mode = useModeStore((s) => s.mode);

  return (
    <AnimatePresence mode="wait">
      {mode === "developer" ? (
        <motion.div
          key="dev-projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProjectsDevMode projects={projects} />
        </motion.div>
      ) : (
        <motion.div
          key="design-projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProjectsDesignMode projects={projects} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
