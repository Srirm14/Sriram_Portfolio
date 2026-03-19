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
      <div className="absolute inset-0 line-grid opacity-50 pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#39FF14]/30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal variant="fade-up" className="mb-10 md:mb-16">
          <p className="font-mono text-xs text-[#39FF14]/60 uppercase tracking-widest mb-3">
            02 — Experience
          </p>
          <h2 className="section-heading-design text-white">
            WHERE I&apos;VE{" "}
            <span className="text-[#39FF14]">DESIGNED</span>
          </h2>
          <div className="w-24 h-1 bg-[#39FF14] mt-4" />
        </ScrollReveal>

        <div ref={lineRef} className="relative">
          <motion.div
            className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 hidden lg:block"
            style={{ background: "rgba(57,255,20,0.2)" }}
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
