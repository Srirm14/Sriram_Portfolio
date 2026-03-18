"use client";

import { motion } from "framer-motion";
import { ExperienceDesignCard } from "./ExperienceDesignCard";
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
  return (
    <section
      id="experience"
      className="relative bg-design py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 line-grid opacity-50 pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#39FF14]/30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-[#39FF14]/60 uppercase tracking-widest mb-3">
            02 — Experience
          </p>
          <h2 className="section-heading-design text-white">
            WHERE I&apos;VE{" "}
            <span className="text-[#39FF14]">DESIGNED</span>
          </h2>
          <div className="w-24 h-1 bg-[#39FF14] mt-4" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#39FF14]/20 -translate-x-1/2 hidden lg:block" />

          {/* Desktop: alternating timeline */}
          <div className="hidden lg:flex flex-col gap-12">
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
          <div className="lg:hidden flex flex-col gap-8">
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
