"use client";

import { motion } from "framer-motion";
import { experiences } from "./ExperienceData";
import { ExperienceDevCard } from "./ExperienceDevCard";

const devExperiences = experiences.filter((exp) => exp.devBullets.length > 0);

export function ExperienceDevMode() {
  return (
    <section
      id="experience"
      className="relative bg-dev py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs text-[#7c3aed] uppercase tracking-widest mb-3">
            02 — Experience
          </p>
          <h2 className="section-heading-dev">
            Where I&apos;ve <span className="text-gradient-dev">Shipped</span>
          </h2>
          <p className="font-poppins text-white/40 mt-3 text-sm">
            Click any card to expand
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#7c3aed]/30 to-transparent -translate-x-1/2 hidden lg:block" />

          {/* Desktop: alternating timeline */}
          <div className="hidden lg:flex flex-col gap-12">
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
          <div className="lg:hidden flex flex-col gap-8">
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
