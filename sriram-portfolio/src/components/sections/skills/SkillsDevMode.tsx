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
import { HoneycombBg } from "@/components/ui/backgrounds/HoneycombBg";
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
      className="ld-section-ambient ld-section-ambient--skills relative overflow-hidden bg-dev px-4 py-14 md:px-6 md:py-24 lg:px-12"
      style={{ willChange: "transform" }}
    >
      <HoneycombBg accentColor="var(--theme-primary, #c9a84c)" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section header */}
        <ScrollReveal variant="fade-left" className="mb-8 md:mb-12">
          <p className="ld-section-eyebrow mb-3 font-mono text-xs uppercase tracking-widest">
            04 — Skills
          </p>
          <h2 className="section-heading-dev">
            My <span className="text-gradient-dev">Stack</span>
          </h2>
          <p className="ld-section-lede mt-2 max-w-lg text-sm">
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
            <ScrollReveal variant="fade-up" delay={0.1} className="glass-card p-6 rounded-sm">
              <p className="ld-section-eyebrow mb-4 font-mono text-xs uppercase tracking-widest">
                What I focus on
              </p>
              <div className="flex flex-col gap-3">
                {FOCUS_ITEMS.map(({ Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm
                                 border border-[rgba(201,168,76,0.22)] bg-[rgba(201,168,76,0.07)]
                                 text-[#c9a84c]"
                      aria-hidden
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="ld-focus-title font-grotesk text-sm font-semibold">
                        {title}
                      </p>
                      <p className="ld-focus-desc font-poppins mt-0.5 text-xs">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Currently exploring card */}
            <ScrollReveal variant="fade-up" delay={0.2} className="glass-card flex-1 rounded-sm border border-[#c9a84c]/25 p-5">
              <p className="ld-section-eyebrow mb-3 font-mono text-xs uppercase tracking-widest">
                Currently exploring
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {[
                  "AI-powered UIs",
                  "React Server Components",
                  "Edge Functions",
                  "Web Performance",
                  "Vibe Coding",
                ].map((item) => (
                  <span
                    key={item}
                    className="ld-explore-pill rounded-full border px-3 py-1 font-mono text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 border-t border-[rgba(201,168,76,0.12)] pt-4">
                <span
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm
                             border border-[rgba(201,168,76,0.22)] bg-[rgba(201,168,76,0.07)]
                             text-[#c9a84c]"
                  aria-hidden
                >
                  <Bot className="h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <p className="ld-focus-title font-grotesk text-sm font-semibold">
                    Vibe coding — among other things
                  </p>
                  <p className="ld-focus-desc font-poppins mt-0.5 text-xs leading-relaxed">
                    I also connect with AI agents to design, build, and ship full
                    features fast — from prompt to production. Orchestrating
                    agents is just another tool in the belt.
                  </p>
                  <p className="mt-2 font-mono text-xs italic text-[#c9a84c]/75">
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
