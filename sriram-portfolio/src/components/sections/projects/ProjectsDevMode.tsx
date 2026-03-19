"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { ProjectItem } from "./ProjectsData";
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
      className="relative bg-dev py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-[#7c3aed] uppercase tracking-widest mb-3">
            03 — Projects
          </p>
          <h2 className="section-heading-dev">
            Things I&apos;ve{" "}
            <span className="text-gradient-dev">Built</span>
          </h2>
          <p className="font-poppins text-white/30 text-sm mt-2">
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
