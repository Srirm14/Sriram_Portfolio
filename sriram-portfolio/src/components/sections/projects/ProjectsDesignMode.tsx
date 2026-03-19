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
    >
      {/* Spider web section background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="proj-glow-tr" cx="100%" cy="0%" r="50%">
            <stop offset="0%" stopColor="#e63946" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="proj-glow-bl" cx="0%" cy="100%" r="45%">
            <stop offset="0%" stopColor="#1d3557" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#1d3557" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#proj-glow-tr)" />
        <rect width="100%" height="100%" fill="url(#proj-glow-bl)" />

        {/* Web — top right anchor */}
        {[150, 168, 186, 204, 222, 240, 258, 276, 294, 312].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const len = 100;
          const x2 = 100 + len * Math.cos(rad);
          const y2 = 0 + len * Math.sin(rad);
          return (
            <line
              key={i}
              x1="100%"
              y1="0%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#e63946"
              strokeWidth="0.5"
              opacity={0.04 + i * 0.004}
            />
          );
        })}
        {[10, 20, 32, 46, 62, 80].map((r, i) => (
          <circle
            key={i}
            cx="100%"
            cy="0%"
            r={`${r}%`}
            fill="none"
            stroke="#e63946"
            strokeWidth="0.5"
            opacity={0.035 + i * 0.007}
            strokeDasharray="3 9"
          />
        ))}

        {/* Web — bottom left anchor */}
        {[0, 18, 36, 54, 72, 90, 108].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const len = 70;
          const x2 = len * Math.cos(rad);
          const y2 = 100 - len * Math.sin(rad);
          return (
            <line
              key={i}
              x1="0%"
              y1="100%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#1d3557"
              strokeWidth="0.5"
              opacity={0.04 + i * 0.005}
            />
          );
        })}
        {[8, 18, 30, 44].map((r, i) => (
          <circle
            key={i}
            cx="0%"
            cy="100%"
            r={`${r}%`}
            fill="none"
            stroke="#1d3557"
            strokeWidth="0.5"
            opacity={0.05 + i * 0.008}
            strokeDasharray="2 8"
          />
        ))}

        {/* Subtle horizontal rules */}
        {[20, 40, 60, 80].map((y, i) => (
          <line
            key={i}
            x1="0%"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="#e63946"
            strokeWidth="0.3"
            opacity="0.04"
            strokeDasharray="6 18"
          />
        ))}

        {/* Cross marks */}
        {[[8, 12], [92, 18], [15, 85], [88, 75], [50, 8], [50, 92], [25, 50], [75, 50]].map(
          ([x, y], i) => (
            <g key={i} opacity={0.09 + i * 0.012}>
              <line
                x1={`${x - 0.7}%`}
                y1={`${y}%`}
                x2={`${x + 0.7}%`}
                y2={`${y}%`}
                stroke="#e63946"
                strokeWidth="1"
              />
              <line
                x1={`${x}%`}
                y1={`${y - 1}%`}
                x2={`${x}%`}
                y2={`${y + 1}%`}
                stroke="#e63946"
                strokeWidth="1"
              />
            </g>
          )
        )}

        {/* Slow animated scan line */}
        <line
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          stroke="#e63946"
          strokeWidth="0.8"
          opacity="0.07"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;0,100%;0,0"
            dur="14s"
            repeatCount="indefinite"
          />
        </line>
      </svg>

      {/* Top accent — red to navy */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e63946, #1d3557, transparent)",
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-[#e63946]/60 uppercase tracking-widest mb-3">
            03 — Projects
          </p>
          <h2 className="section-heading-design text-white">
            THINGS I&apos;VE{" "}
            <span className="text-[#e63946]">DESIGNED</span>
          </h2>
          <div className="w-24 h-1 bg-[#e63946] mt-4" />
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
