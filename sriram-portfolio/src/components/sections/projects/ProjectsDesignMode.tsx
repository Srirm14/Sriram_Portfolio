"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLightDark } from "@/context/LightDarkContext";
import type { ProjectItem } from "./ProjectsData";
import { ProjectCard } from "./ProjectCard";
import { ProjectDrawer } from "./ProjectDrawer";

interface ProjectsDesignModeProps {
  projects: ProjectItem[];
}

export function ProjectsDesignMode({ projects }: ProjectsDesignModeProps) {
  const { isLight } = useLightDark();
  const primary = "#e85d00";
  const secondary = isLight ? "#1a1a1a" : "#b0b8c1";

  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const designProjects = projects.filter(
    (p) => p.designBullets.length > 0
  );

  const handleSelect = useCallback((item: ProjectItem) => setSelected(item), []);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section
      id="work"
      className="relative py-24 px-6 lg:px-12 overflow-hidden"
      style={{ backgroundColor: isLight ? "#fff8f2" : "#080808" }}
    >
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg,
            transparent,
            ${primary}40,
            ${isLight ? "#ff7a1a40" : `${secondary}30`},
            transparent)`,
        }}
      />

      {/* Background abstraction */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="proj-fade-v" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="8%" stopColor="#fff" stopOpacity="1" />
              <stop offset="92%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="proj-mask">
              <rect width="100%" height="100%" fill="url(#proj-fade-v)" />
            </mask>
          </defs>

          <g mask="url(#proj-mask)">
            {/* LEFT — speed lines radiating from top-left */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const gap = 18;
              const xBase = 8 + i * gap;
              return (
                <line
                  key={`sl-${i}`}
                  x1={xBase}
                  y1="0%"
                  x2={xBase - 60}
                  y2="100%"
                  stroke={primary}
                  strokeWidth={i === 0 ? "1.5" : "0.4"}
                  opacity={
                    i === 0
                      ? isLight
                        ? 0.5
                        : 0.45
                      : isLight
                        ? 0.2
                        : 0.18
                  }
                  strokeLinecap="round"
                />
              );
            })}

            {/* Left edge bar */}
            <line
              x1="4"
              y1="0%"
              x2="4"
              y2="100%"
              stroke={primary}
              strokeWidth="3"
              opacity={isLight ? 0.6 : 0.55}
            />

            {/* Left — horizontal tick marks */}
            {Array.from({ length: 16 }).map((_, i) => {
              const isMajor = i % 4 === 0;
              const y = `${(i + 1) * (100 / 17)}%`;
              return (
                <line
                  key={`lt-${i}`}
                  x1="4"
                  y1={y}
                  x2={isMajor ? "28" : "16"}
                  y2={y}
                  stroke={primary}
                  strokeWidth={isMajor ? "1" : "0.5"}
                  opacity={
                    isLight
                      ? isMajor
                        ? 0.5
                        : 0.25
                      : isMajor
                        ? 0.45
                        : 0.22
                  }
                />
              );
            })}

            {/* LEFT corner triangle */}
            <polygon
              points="0,0 36,0 0,36"
              fill={primary}
              opacity={isLight ? 0.22 : 0.2}
            />

            {/* RIGHT — grid of small dots */}
            {Array.from({ length: 10 }).map((_, row) =>
              Array.from({ length: 4 }).map((_, col) => {
                const xPct = 97 - col * 1.2;
                const yPct = 8 + row * 9;
                const fade = 1 - (col / 3) * 0.6;
                return (
                  <circle
                    key={`dot-${row}-${col}`}
                    cx={`${xPct}%`}
                    cy={`${yPct}%`}
                    r="1.2"
                    fill={secondary}
                    opacity={(isLight ? 0.28 : 0.24) * fade}
                  />
                );
              })
            )}

            {/* Right edge bar */}
            <line
              x1="99.6%"
              y1="0%"
              x2="99.6%"
              y2="100%"
              stroke={secondary}
              strokeWidth="2"
              opacity={isLight ? 0.4 : 0.35}
            />

            {/* Right — bottom corner triangle */}
            <polygon
              points="1200,900 1160,900 1200,860"
              fill={secondary}
              opacity={isLight ? 0.2 : 0.18}
            />

            {/* Animated scan — orange */}
            <rect x="0" y="0" width="100%" height="1.5" fill={primary}>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0;0,900;0,0"
                dur="11s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.45;0"
                keyTimes="0;0.5;1"
                dur="11s"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="mb-12"
        >
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: `${primary}99` }}
          >
            03 — Projects
          </p>
          <h2
            className="section-heading-design"
            style={{
              color: isLight ? "#0f0f0f" : "#f5f5f5",
              fontFamily: "var(--font-big-shoulders)",
              fontWeight: 900,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            THINGS I&apos;VE{" "}
            <span style={{ color: primary }}>DESIGNED</span>
          </h2>
          <div
            className="mt-4 h-px w-16"
            style={{
              background: isLight
                ? `linear-gradient(90deg, ${primary}60, #ff7a1a80)`
                : `linear-gradient(90deg, ${primary}50, ${secondary}40)`,
            }}
          />
          <p
            className="font-mono text-xs mt-3"
            style={{
              color: isLight ? "rgba(15,15,15,0.58)" : "rgba(245,245,245,0.55)",
            }}
          >
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
