"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExperienceDesignCard } from "./ExperienceDesignCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ExperienceItem } from "./ExperienceData";

interface ExperienceDesignModeProps {
  experiences: ExperienceItem[];
}

export function ExperienceDesignMode({
  experiences,
}: ExperienceDesignModeProps) {
  const designExperiences = experiences.filter(
    (item) => item.designBullets.length > 0
  );
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true });

  return (
    <section
      id="experience"
      className="relative bg-design py-14 md:py-24 px-4 md:px-6 lg:px-12 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Spider web background SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="exp-glow-l" cx="0%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#1d3557" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1d3557" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="exp-glow-r" cx="100%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#e63946" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Side glows */}
        <rect width="100%" height="100%" fill="url(#exp-glow-l)" />
        <rect width="100%" height="100%" fill="url(#exp-glow-r)" />

        {/* Web from top-left corner */}
        {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const len = 90;
          const x2 = len * Math.cos(rad);
          const y2 = len * Math.sin(rad);
          return (
            <line
              key={i}
              x1="0%"
              y1="0%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#e63946"
              strokeWidth="0.5"
              opacity={0.035 + i * 0.004}
            />
          );
        })}
        {/* Concentric arcs — top left */}
        {[12, 22, 34, 48, 64, 82].map((r, i) => (
          <circle
            key={i}
            cx="0%"
            cy="0%"
            r={`${r}%`}
            fill="none"
            stroke="#e63946"
            strokeWidth="0.5"
            opacity={0.04 + i * 0.006}
            strokeDasharray="3 9"
          />
        ))}

        {/* Web from bottom-right corner */}
        {[180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const len = 70;
          const x2 = 100 + len * Math.cos(rad);
          const y2 = 100 + len * Math.sin(rad);
          return (
            <line
              key={i}
              x1="100%"
              y1="100%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#1d3557"
              strokeWidth="0.5"
              opacity={0.04 + i * 0.004}
            />
          );
        })}
        {[10, 20, 32, 46].map((r, i) => (
          <circle
            key={i}
            cx="100%"
            cy="100%"
            r={`${r}%`}
            fill="none"
            stroke="#1d3557"
            strokeWidth="0.5"
            opacity={0.05 + i * 0.008}
            strokeDasharray="3 9"
          />
        ))}

        {/* Horizontal divider lines — fade in from sides */}
        {[25, 50, 75].map((y, i) => (
          <line
            key={i}
            x1="0%"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="#e63946"
            strokeWidth="0.3"
            opacity="0.06"
            strokeDasharray="8 16"
          />
        ))}

        {/* Cross marks scattered */}
        {[[10, 20], [90, 35], [20, 70], [85, 80], [50, 15], [45, 90]].map(
          ([x, y], i) => (
            <g key={i} opacity={0.1 + i * 0.015}>
              <line
                x1={`${x - 0.6}%`}
                y1={`${y}%`}
                x2={`${x + 0.6}%`}
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

        {/* Animated vertical scan */}
        <line
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          stroke="#e63946"
          strokeWidth="1"
          opacity="0.06"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0;100%,0;0,0"
            dur="12s"
            repeatCount="indefinite"
          />
        </line>
      </svg>

      {/* Top accent line — red to navy gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, #e63946, #1d3557, #e63946)",
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal variant="fade-up" className="mb-10 md:mb-16">
          <p className="font-mono text-xs text-[#e63946]/60 uppercase tracking-widest mb-3">
            02 — Experience
          </p>
          <h2 className="section-heading-design text-white">
            WHERE I&apos;VE{" "}
            <span className="text-[#e63946]">DESIGNED</span>
          </h2>
          <div className="w-24 h-1 bg-[#e63946] mt-4" />
        </ScrollReveal>

        <div ref={lineRef} className="relative">
          <motion.div
            className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 hidden lg:block"
            style={{ background: "rgba(230,57,70,0.2)" }}
            initial={{ height: 0 }}
            animate={{ height: lineInView ? "100%" : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Desktop: alternating timeline */}
          <div className="hidden lg:flex flex-col gap-8 md:gap-12">
            {designExperiences.map((item, index) => (
              <ExperienceDesignCard
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>

          {/* Mobile: stacked with left border */}
          <div className="lg:hidden flex flex-col gap-5 md:gap-8">
            {designExperiences.map((item, index) => (
              <ExperienceDesignCard
                key={item.id}
                item={item}
                index={index}
                isLeft={true}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
