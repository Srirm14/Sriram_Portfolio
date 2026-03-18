"use client";

import { motion } from "framer-motion";
import { designSkills } from "./SkillsData";
import { SkillOrbit } from "./SkillOrbit";

const orbit1 = designSkills
  .filter((c) => c.orbit === 1)
  .flatMap((c) => c.skills);
const orbit2 = designSkills
  .filter((c) => c.orbit === 2)
  .flatMap((c) => c.skills);
const orbit3 = designSkills
  .filter((c) => c.orbit === 3)
  .flatMap((c) => c.skills);

export function SkillsDesignMode() {
  return (
    <section
      id="skills"
      className="relative bg-design py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 line-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#39FF14]/20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-center mb-16"
        >
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
        </motion.div>

        {/* Orbital canvas — hidden on mobile */}
        <div
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
              <span className="font-syne font-black text-sm text-[#39FF14] whitespace-nowrap uppercase">
                Design
              </span>
            </div>
          </div>
        </div>

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
