"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { ProjectItem } from "./ProjectsData";
import { ProjectCard } from "./ProjectCard";
import { ProjectDrawer } from "./ProjectDrawer";

interface ProjectsDesignModeProps {
  projects: ProjectItem[];
}

export function ProjectsDesignMode({ projects }: ProjectsDesignModeProps) {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const designProjects = projects.filter(
    (p) => p.designBullets.length > 0
  );

  const handleSelect = useCallback((item: ProjectItem) => setSelected(item), []);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section
      id="work"
      className="relative bg-design py-24 px-6 lg:px-12 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <div className="absolute inset-0 line-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#39FF14]/20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-[#39FF14]/60 uppercase tracking-widest mb-3">
            03 — Projects
          </p>
          <h2 className="section-heading-design text-white">
            THINGS I&apos;VE{" "}
            <span className="text-[#39FF14]">DESIGNED</span>
          </h2>
          <div className="w-24 h-1 bg-[#39FF14] mt-4" />
          <p className="font-mono text-xs text-white/30 mt-3">
            Click any card to explore
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          style={{ columnFill: "balance" }}
        >
          {designProjects.map((project, index) => (
            <div key={project.id} className="break-inside-avoid mb-4">
              <ProjectCard
                item={project}
                mode="designer"
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
        mode="designer"
        onClose={handleClose}
      />
    </section>
  );
}
