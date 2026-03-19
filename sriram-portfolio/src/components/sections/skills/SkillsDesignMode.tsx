"use client";

import { useLightDark } from "@/context/LightDarkContext";
import { SkillOrbit } from "./SkillOrbit";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { SkillCategory } from "./SkillsData";

interface SkillsDesignModeProps {
  skills: { dev: SkillCategory[]; design: SkillCategory[] };
}

export function SkillsDesignMode({ skills }: SkillsDesignModeProps) {
  const { isLight } = useLightDark();
  const designSkills = skills.design;
  const orbit1 = designSkills
    .filter((c) => c.orbit === 1)
    .flatMap((c) => c.skills);
  const orbit2 = designSkills
    .filter((c) => c.orbit === 2)
    .flatMap((c) => c.skills);
  const orbit3 = designSkills
    .filter((c) => c.orbit === 3)
    .flatMap((c) => c.skills);
  return (
    <section
      id="skills"
      className="relative bg-design py-14 md:py-24 px-4 md:px-6 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      {/* Spider web background — web radiates from center */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="sk-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e63946" stopOpacity="0.07" />
            <stop offset="60%" stopColor="#1d3557" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0d0d14" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <rect width="100%" height="100%" fill="url(#sk-glow)" />

        {/* Web radiates from dead center — 16 spokes */}
        {Array.from({ length: 16 }).map((_, i) => {
          const deg = i * 22.5;
          const rad = (deg * Math.PI) / 180;
          const len = 80;
          const x2 = 50 + len * Math.cos(rad);
          const y2 = 50 + len * Math.sin(rad);
          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#e63946"
              strokeWidth="0.4"
              opacity={0.04 + (i % 2) * 0.02}
            />
          );
        })}

        {/* Concentric web rings — center origin */}
        {[8, 16, 25, 36, 48, 62, 78].map((r, i) => (
          <circle
            key={i}
            cx="50%"
            cy="50%"
            r={`${r}%`}
            fill="none"
            stroke={i % 2 === 0 ? "#e63946" : "#1d3557"}
            strokeWidth="0.4"
            opacity={0.05 + i * 0.008}
            strokeDasharray={i % 2 === 0 ? "2 8" : "4 12"}
          />
        ))}

        {/* Bold outer ring */}
        <circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="#e63946"
          strokeWidth="0.5"
          opacity="0.06"
          strokeDasharray="1 6"
        />

        {/* 4 diagonal slash accents in corners */}
        <line
          x1="0%"
          y1="0%"
          x2="18%"
          y2="18%"
          stroke="#1d3557"
          strokeWidth="20"
          opacity="0.07"
        />
        <line
          x1="100%"
          y1="0%"
          x2="82%"
          y2="18%"
          stroke="#1d3557"
          strokeWidth="20"
          opacity="0.07"
        />
        <line
          x1="0%"
          y1="100%"
          x2="18%"
          y2="82%"
          stroke="#1d3557"
          strokeWidth="20"
          opacity="0.07"
        />
        <line
          x1="100%"
          y1="100%"
          x2="82%"
          y2="82%"
          stroke="#1d3557"
          strokeWidth="20"
          opacity="0.07"
        />

        {/* Corner cross marks */}
        {[[5, 5], [95, 5], [5, 95], [95, 95], [50, 5], [50, 95], [5, 50], [95, 50]].map(
          ([x, y], i) => (
            <g key={i} opacity="0.1">
              <line
                x1={`${x - 0.8}%`}
                y1={`${y}%`}
                x2={`${x + 0.8}%`}
                y2={`${y}%`}
                stroke="#e63946"
                strokeWidth="1"
              />
              <line
                x1={`${x}%`}
                y1={`${y - 1.2}%`}
                x2={`${x}%`}
                y2={`${y + 1.2}%`}
                stroke="#e63946"
                strokeWidth="1"
              />
            </g>
          )
        )}

        {/* Slow rotating outer ring */}
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="#e63946"
          strokeWidth="0.3"
          opacity="0.06"
          strokeDasharray="6 20"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50% 50%; 360 50% 50%"
            dur="40s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Counter-rotating inner ring */}
        <circle
          cx="50%"
          cy="50%"
          r="28%"
          fill="none"
          stroke="#1d3557"
          strokeWidth="0.4"
          opacity="0.08"
          strokeDasharray="4 14"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50% 50%; -360 50% 50%"
            dur="28s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e63946, #1d3557, transparent)",
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal variant="fade-up" className="text-center mb-10 md:mb-16">
          <p className="font-mono text-xs text-design-red/60 uppercase tracking-widest mb-3">
            04 — Skills
          </p>
          <h2 className="section-heading-design text-white">
            MY <span className="text-design-red">TOOLKIT</span>
          </h2>
          <div className="w-24 h-1 bg-design-red mt-4 mb-2 mx-auto" />
          <p className="font-mono text-xs text-white/30 mt-2">
            Hover to pause · Hover skills to highlight
          </p>
        </ScrollReveal>

        {/* Orbital canvas — hidden on mobile */}
        <ScrollReveal
          variant="scale-up"
          delay={0.3}
          className="orbital-canvas hidden lg:block relative mx-auto"
          style={{ width: 680, height: 680 }}
        >
          {/* Background glow behind center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-48 h-48 rounded-full blur-3xl opacity-10"
              style={{
                background:
                  "radial-gradient(circle, #e63946 0%, transparent 70%)",
              }}
            />
          </div>

          <SkillOrbit
            skills={orbit1}
            radius={120}
            duration={18}
            color="#e63946"
            mode="designer"
          />
          <SkillOrbit
            skills={orbit2}
            radius={210}
            duration={28}
            reverse
            color="#457b9d"
            mode="designer"
          />
          <SkillOrbit
            skills={orbit3}
            radius={300}
            duration={40}
            color="#e63946"
            mode="designer"
          />

          {/* Center node — brutalist */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="border-2 border-design-red px-5 py-3 shadow-brutal relative z-10"
              style={{
                background: isLight ? "rgba(255,252,247,0.98)" : "#0d0d14",
                boxShadow: isLight
                  ? "0 4px 20px rgba(62,48,28,0.07)"
                  : undefined,
              }}
            >
              <span className="font-bebas text-sm text-design-red whitespace-nowrap">
                Design
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile fallback — simple pill grid */}
        <div className="lg:hidden mt-8 flex flex-wrap gap-2 justify-center">
          {designSkills.flatMap((c) => c.skills).map((skill) => (
            <span key={skill} className="skill-pill-design">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
