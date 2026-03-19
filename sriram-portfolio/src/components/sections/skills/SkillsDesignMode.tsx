"use client";

import { SkillOrbit } from "./SkillOrbit";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { SkillCategory } from "./SkillsData";

interface SkillsDesignModeProps {
  skills: { dev: SkillCategory[]; design: SkillCategory[] };
}

export function SkillsDesignMode({ skills }: SkillsDesignModeProps) {
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
      <div className="absolute inset-0 line-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#39FF14]/20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal variant="fade-up" className="text-center mb-10 md:mb-16">
          <p className="font-mono text-xs text-[#39FF14]/60 uppercase tracking-widest mb-3">
            04 — Skills
          </p>
          <h2 className="section-heading-design text-white">
            MY <span className="text-[#39FF14]">TOOLKIT</span>
          </h2>
          <div className="w-24 h-1 bg-[#39FF14] mt-4 mb-2 mx-auto" />
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
                  "radial-gradient(circle, #39FF14 0%, transparent 70%)",
              }}
            />
          </div>

          <SkillOrbit
            skills={orbit1}
            radius={120}
            duration={18}
            color="#39FF14"
            mode="designer"
          />
          <SkillOrbit
            skills={orbit2}
            radius={210}
            duration={28}
            reverse
            color="#84cc16"
            mode="designer"
          />
          <SkillOrbit
            skills={orbit3}
            radius={300}
            duration={40}
            color="#39FF14"
            mode="designer"
          />

          {/* Center node — brutalist */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="border-2 border-[#39FF14] px-5 py-3 shadow-brutal relative z-10"
              style={{ background: "#0a0a0a" }}
            >
              <span className="font-bebas text-sm text-[#39FF14] whitespace-nowrap">
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
