"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectDesignCard } from "./ProjectDesignCard";
import type { ProjectItem } from "./ProjectsData";

interface ProjectsDesignModeProps {
  projects: ProjectItem[];
}

export function ProjectsDesignMode({ projects }: ProjectsDesignModeProps) {
  const designProjects = projects.filter((p) => p.designBullets.length > 0);
  return (
    <section
      id="work"
      className="relative bg-design py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 line-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#39FF14]/20" />

      <div className="relative z-10 max-w-5xl mx-auto">
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
            Click any card to flip
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {designProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: index * 0.1,
              }}
              className={cn(
                project.featured ? "md:col-span-2" : "md:col-span-1"
              )}
            >
              <ProjectDesignCard item={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
