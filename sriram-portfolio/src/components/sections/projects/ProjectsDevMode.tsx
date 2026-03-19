"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { ProjectItem } from "./ProjectsData";
import { CompassBg } from "@/components/ui/backgrounds/CompassBg";
import { ProjectCard } from "./ProjectCard";
import { ProjectDrawer } from "./ProjectDrawer";

interface ProjectsDevModeProps {
  projects: ProjectItem[];
}

export function ProjectsDevMode({ projects }: ProjectsDevModeProps) {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const devProjects = projects.filter((p) => p.devBullets.length > 0);

  const handleSelect = useCallback((item: ProjectItem) => setSelected(item), []);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section
      id="work"
      className="ld-section-ambient ld-section-ambient--work relative overflow-hidden bg-dev px-6 py-24 lg:px-12"
    >
      <CompassBg accentColor="var(--theme-primary, #c9a84c)" />
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-[1] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in srgb, var(--theme-primary, #c9a84c) 30%, transparent), transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="ld-section-eyebrow mb-3 font-mono text-xs uppercase tracking-widest">
            03 — Projects
          </p>
          <h2 className="section-heading-dev">
            Things I&apos;ve{" "}
            <span className="text-gradient-dev">Built</span>
          </h2>
          <p className="ld-section-lede mt-2 max-w-md text-sm">
            Click any card to explore
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div
          className="columns-1 sm:columns-2 lg:columns-2 gap-4"
          style={{ columnFill: "balance" }}
        >
          {devProjects.map((project, index) => (
            <div key={project.id} className="break-inside-avoid mb-4">
              <ProjectCard
                item={project}
                mode="developer"
                onClick={handleSelect}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Drawer */}
      <ProjectDrawer
        item={selected}
        mode="developer"
        onClose={handleClose}
      />
    </section>
  );
}
