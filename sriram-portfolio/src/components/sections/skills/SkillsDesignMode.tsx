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
  const primary = "#e85d00";
  const secondary = isLight ? "#1a1a1a" : "#b0b8c1";
  const accent = isLight ? "#ff7a1a" : "#b0b8c1";

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
      className="relative py-14 md:py-24 px-4 md:px-6 overflow-hidden"
      style={{
        backgroundColor: isLight ? "#fff8f2" : "#080808",
        willChange: "transform",
      }}
    >
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg,
            transparent,
            ${primary}40,
            ${isLight ? `${accent}40` : `${secondary}30`},
            transparent)`,
        }}
      />

      {/* Background — minimal radial + subtle orbit rings */}
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
            <radialGradient id="sk-glow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor={primary} stopOpacity={isLight ? 0.06 : 0.08} />
              <stop offset="70%" stopColor={secondary} stopOpacity={isLight ? 0.03 : 0.05} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#sk-glow)" />

          {/* Subtle concentric rings — orbit feel */}
          {[20, 35, 50, 65, 80].map((r, i) => (
            <circle
              key={i}
              cx="50%"
              cy="50%"
              r={`${r}%`}
              fill="none"
              stroke={i % 2 === 0 ? primary : secondary}
              strokeWidth="0.4"
              opacity={isLight ? 0.06 + i * 0.01 : 0.08 + i * 0.01}
              strokeDasharray={i % 2 === 0 ? "4 12" : "2 8"}
            />
          ))}

          {/* Corner accents — minimal */}
          <polygon
            points="0,0 48,0 0,48"
            fill={primary}
            opacity={isLight ? 0.1 : 0.08}
          />
          <polygon
            points="1200,900 1152,900 1200,852"
            fill={secondary}
            opacity={isLight ? 0.08 : 0.06}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal variant="fade-up" className="text-center mb-10 md:mb-16">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: `${primary}99` }}
          >
            04 — Skills
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
            MY <span style={{ color: primary }}>TOOLKIT</span>
          </h2>
          <div
            className="mt-4 h-px w-16 mx-auto mb-2"
            style={{
              background: isLight
                ? `linear-gradient(90deg, ${primary}60, ${accent}80)`
                : `linear-gradient(90deg, ${primary}50, ${secondary}40)`,
            }}
          />
          <p
            className="font-mono text-xs mt-2"
            style={{
              color: isLight ? "rgba(15,15,15,0.58)" : "rgba(245,245,245,0.55)",
            }}
          >
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
              className="w-48 h-48 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${primary} 0%, transparent 70%)`,
                opacity: isLight ? 0.08 : 0.12,
              }}
            />
          </div>

          <SkillOrbit
            skills={orbit1}
            radius={120}
            duration={18}
            color={primary}
            mode="designer"
          />
          <SkillOrbit
            skills={orbit2}
            radius={210}
            duration={28}
            reverse
            color={secondary}
            mode="designer"
          />
          <SkillOrbit
            skills={orbit3}
            radius={300}
            duration={40}
            color={primary}
            mode="designer"
          />

          {/* Center node */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="border-2 px-5 py-3 shadow-brutal relative z-10"
              style={{
                borderColor: primary,
                background: isLight ? "rgba(255,252,247,0.98)" : "#0d0d14",
                boxShadow: isLight
                  ? `4px 4px 0px ${secondary}, 0 4px 20px rgba(62,48,28,0.07)`
                  : `4px 4px 0px ${secondary}`,
              }}
            >
              <span
                className="font-bebas text-sm whitespace-nowrap"
                style={{ color: primary }}
              >
                Design
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile fallback — pill grid */}
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
