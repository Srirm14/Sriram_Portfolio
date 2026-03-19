"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExperienceDevCard } from "./ExperienceDevCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ExperienceItem } from "./ExperienceData";

interface ExperienceDevModeProps {
  experiences: ExperienceItem[];
}

export function ExperienceDevMode({ experiences }: ExperienceDevModeProps) {
  const devExperiences = experiences.filter((exp) => exp.devBullets.length > 0);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true });

  return (
    <section
      id="experience"
      className="ld-section-ambient ld-section-ambient--experience relative overflow-hidden bg-dev px-4 py-14 md:px-6 md:py-24 lg:px-12"
      style={{ willChange: "transform" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 dot-grid opacity-30" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal variant="fade-up" className="mb-10 text-center md:mb-16">
          <p className="ld-section-eyebrow mb-3 font-mono text-xs uppercase tracking-widest">
            02 — Experience
          </p>
          <h2 className="section-heading-dev">
            Where I&apos;ve <span className="text-gradient-dev">Shipped</span>
          </h2>
          <p className="ld-section-lede mt-3 max-w-md mx-auto text-sm">
            Click any card to expand
          </p>
        </ScrollReveal>

        <div ref={lineRef} className="relative z-10">
          <motion.div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 hidden lg:block"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(201,168,76,0.35), transparent)",
            }}
            initial={{ height: 0 }}
            animate={{ height: lineInView ? "100%" : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Desktop: alternating timeline */}
          <div className="hidden lg:flex flex-col gap-8 md:gap-12">
            {devExperiences.map((item, index) => (
              <ExperienceDevCard
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>

          {/* Mobile: stacked with left border */}
          <div className="lg:hidden flex flex-col gap-5 md:gap-8">
            {devExperiences.map((item, index) => (
              <ExperienceDevCard
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
