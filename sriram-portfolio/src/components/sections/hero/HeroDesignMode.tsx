"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { HeroFloatingTags } from "./HeroFloatingTags";
import { HeroStats } from "./HeroStats";
import { HeroTypewriter } from "./HeroTypewriter";

const DESIGN_WORDS = [
  "Product Designer",
  "UI/UX Engineer",
  "Design Systems",
  "Visual Thinker",
];

export function HeroDesignMode() {
  const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  };

  return (
    <section id="hero" className="relative min-h-screen bg-design flex items-center line-grid overflow-hidden">
      <HeroBackground mode="designer" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-24 pb-16">
        {/* Left — text */}
        <motion.div
          className="flex-1 flex flex-col items-start"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springTransition}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="badge-available-design mb-6 flex items-center gap-2"
          >
            <span className="text-[#39FF14]">●</span>
            <span>Open to roles · Bengaluru / Remote</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...springTransition }}
            className="font-syne font-black text-display-xl text-white uppercase tracking-tight leading-tight mb-4"
          >
            Product Designer
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <HeroTypewriter mode="designer" words={DESIGN_WORDS} />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...springTransition }}
            className="font-poppins font-normal text-lg text-white/50 max-w-md leading-relaxed mb-8"
          >
            Crafting interfaces that feel as good as they look
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ...springTransition }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="brutal-btn flex items-center gap-2"
            >
              <ArrowDown className="w-4 h-4" />
              VIEW EXPERIENCE
            </button>
            <Link
              href="/resume.pdf"
              download
              className="brutal-btn-outline flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              RESUME
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <HeroStats mode="designer" />
          </motion.div>
        </motion.div>

        {/* Right — photo with floating tags */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springTransition, delay: 0.15 }}
        >
          <HeroFloatingTags mode="designer" />
        </motion.div>
      </div>
    </section>
  );
}
