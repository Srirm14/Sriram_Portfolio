"use client";

import { useRef, useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SkillTerminal } from "./SkillTerminal";
import type { SkillCategory } from "./SkillsData";

interface SkillsDevModeProps {
  skills: { dev: SkillCategory[]; design: SkillCategory[] };
}

const FOCUS_ITEMS = [
  {
    icon: "⚡",
    title: "Performance first",
    desc: "TanStack Query, memoisation, lazy loading",
  },
  {
    icon: "🏗",
    title: "Scalable architecture",
    desc: "Modular Next.js, feature-based structure",
  },
  {
    icon: "🧩",
    title: "Reusable systems",
    desc: "Component libraries, design tokens, shared utils",
  },
  {
    icon: "🧪",
    title: "Tested code",
    desc: "Playwright E2E, regression prevention",
  },
];

export function SkillsDevMode({ skills: _skills }: SkillsDevModeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      // Only start when user has scrolled to the section — rootMargin shrinks
      // the bottom so section must be in the upper ~70% of the viewport
      { threshold: 0.2, rootMargin: "0px 0px -25% 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-dev py-14 md:py-24 px-4 md:px-6 lg:px-12 overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <ScrollReveal variant="fade-left" className="mb-8 md:mb-12">
          <p className="font-mono text-xs text-[#7c3aed] uppercase tracking-widest mb-3">
            04 — Skills
          </p>
          <h2 className="section-heading-dev">
            My <span className="text-gradient-dev">Stack</span>
          </h2>
          <p className="font-poppins text-white/30 text-sm mt-2">
            Scroll here to watch it load · scroll inside the terminal to see more
          </p>
        </ScrollReveal>

        {/* Two column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Left — terminal: flexible height, matches right column on desktop */}
          <div className="w-full min-h-[320px] sm:min-h-[380px] lg:min-h-0 flex flex-col">
            <ScrollReveal
              variant="fade-left"
              delay={0}
              className="flex-1 min-h-0 flex flex-col"
            >
              {inView && <SkillTerminal />}
            </ScrollReveal>
          </div>

          {/* Right — supporting context */}
          <ScrollReveal
            variant="fade-right"
            delay={0.2}
            className="flex flex-col gap-4 md:gap-6"
          >
            {/* What I focus on card */}
            <ScrollReveal variant="fade-up" delay={0.1} className="glass-card p-6 rounded-xl">
              <p className="font-mono text-xs text-[#7c3aed] uppercase tracking-widest mb-4">
                What I focus on
              </p>
              <div className="flex flex-col gap-3">
                {FOCUS_ITEMS.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-grotesk font-semibold text-sm text-white">
                        {item.title}
                      </p>
                      <p className="font-poppins text-xs text-white/40 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Currently exploring card */}
            <ScrollReveal variant="fade-up" delay={0.2} className="glass-card p-5 rounded-xl border border-[#7c3aed]/20 flex-1">
              <p className="font-mono text-xs text-[#06b6d4] uppercase tracking-widest mb-3">
                Currently exploring
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "AI-powered UIs",
                  "React Server Components",
                  "Edge Functions",
                  "Web Performance",
                  "Vibe Coding",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full font-mono text-xs bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[#06b6d4]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="border-t border-white/5 pt-4 flex gap-3">
                <span className="text-lg flex-shrink-0">🤖</span>
                <div>
                  <p className="font-grotesk font-semibold text-sm text-white">
                    Vibe coding — among other things
                  </p>
                  <p className="font-poppins text-xs text-white/40 mt-0.5 leading-relaxed">
                    I also connect with AI agents to design, build, and ship full
                    features fast — from prompt to production. Orchestrating
                    agents is just another tool in the belt.
                  </p>
                  <p className="font-mono text-xs text-[#7c3aed]/60 mt-2 italic">
                    {`// not my only trick, but a sharp one.`}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
