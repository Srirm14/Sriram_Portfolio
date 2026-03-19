"use client";

import { useRef, useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Building2,
  Puzzle,
  TestTube2,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SkillTerminal } from "./SkillTerminal";
import type { SkillCategory } from "./SkillsData";

interface SkillsDevModeProps {
  skills: { dev: SkillCategory[]; design: SkillCategory[] };
}

const FOCUS_ITEMS: {
  Icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    Icon: Zap,
    title: "Performance first",
    desc: "TanStack Query, memoisation, lazy loading",
  },
  {
    Icon: Building2,
    title: "Scalable architecture",
    desc: "Modular Next.js, feature-based structure",
  },
  {
    Icon: Puzzle,
    title: "Reusable systems",
    desc: "Component libraries, design tokens, shared utils",
  },
  {
    Icon: TestTube2,
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
          <p className="font-mono text-xs text-[#c9a84c] uppercase tracking-widest mb-3">
            04 — Skills
          </p>
          <h2 className="section-heading-dev">
            My <span className="text-gradient-dev">Stack</span>
          </h2>
          <p className="font-poppins text-[#f0ece4]/35 text-sm mt-2">
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
              <p className="font-mono text-xs text-[#c9a84c] uppercase tracking-widest mb-4">
                What I focus on
              </p>
              <div className="flex flex-col gap-3">
                {FOCUS_ITEMS.map(({ Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg
                                 border border-[rgba(201,168,76,0.22)] bg-[rgba(201,168,76,0.07)]
                                 text-[#c9a84c]"
                      aria-hidden
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="font-grotesk font-semibold text-sm text-[#f0ece4]">
                        {title}
                      </p>
                      <p className="font-poppins text-xs text-[#f0ece4]/45 mt-0.5">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Currently exploring card */}
            <ScrollReveal variant="fade-up" delay={0.2} className="glass-card p-5 rounded-xl border border-[#c9a84c]/25 flex-1">
              <p className="font-mono text-xs text-[#e8d5a3] uppercase tracking-widest mb-3">
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
                    className="px-3 py-1 rounded-full font-mono text-xs bg-[#c9a84c]/12 border border-[#c9a84c]/25 text-[#e8d5a3]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="border-t border-[rgba(201,168,76,0.12)] pt-4 flex gap-3">
                <span
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg
                             border border-[rgba(201,168,76,0.22)] bg-[rgba(201,168,76,0.07)]
                             text-[#e8d5a3]"
                  aria-hidden
                >
                  <Bot className="h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <p className="font-grotesk font-semibold text-sm text-[#f0ece4]">
                    Vibe coding — among other things
                  </p>
                  <p className="font-poppins text-xs text-[#f0ece4]/45 mt-0.5 leading-relaxed">
                    I also connect with AI agents to design, build, and ship full
                    features fast — from prompt to production. Orchestrating
                    agents is just another tool in the belt.
                  </p>
                  <p className="font-mono text-xs text-[#c9a84c]/70 mt-2 italic">
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
