"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectDevCard } from "./ProjectDevCard";
import type { ProjectItem } from "./ProjectsData";

interface ProjectsDevModeProps {
  projects: ProjectItem[];
}

export function ProjectsDevMode({ projects }: ProjectsDevModeProps) {
  const devProjects = projects.filter((p) => p.devBullets.length > 0);
  return (
    <section
      id="work"
      className="relative bg-dev py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
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
            Things I&apos;ve <span className="text-gradient-dev">Built</span>
          </h2>
          <p className="font-poppins text-white/40 text-sm mt-2">
            Click any card to flip and see details
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {devProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                project.featured ? "md:col-span-2" : "md:col-span-1"
              )}
            >
              <ProjectDevCard item={project} featured={project.featured} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
