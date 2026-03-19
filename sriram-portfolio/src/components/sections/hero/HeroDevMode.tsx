"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { HeroFloatingTags } from "./HeroFloatingTags";
import { HeroStats } from "./HeroStats";
import { HeroTypewriter } from "./HeroTypewriter";

const DEV_WORDS = [
  "React Engineer",
  "Next.js Architect",
  "Frontend Lead",
  "UI Craftsman",
];

interface HeroDevModeProps {
  meta: ReturnType<typeof import("@/lib/data").getMeta>;
}

export function HeroDevMode({ meta }: HeroDevModeProps) {
  return (
    <section id="hero" className="relative min-h-screen bg-dev flex items-center dot-grid overflow-hidden">
      <HeroBackground mode="developer" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-8 md:gap-12 lg:gap-20 pt-16 md:pt-24 pb-12 md:pb-16">
        {/* Left — text */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="badge-available-dev mb-4 md:mb-6 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping-slow" />
            <span className="text-[#f0ece4]/90">Open to roles · Bengaluru / Remote</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-grotesk font-bold text-display-lg md:text-display-xl text-[#f0ece4] tracking-tight leading-tight mb-4"
          >
            Senior Frontend
            <br />
            <span className="text-gradient-dev">Engineer</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <HeroTypewriter mode="developer" words={DEV_WORDS} />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-poppins font-light text-base md:text-lg text-[#f0ece4]/65 max-w-md leading-relaxed mb-8"
          >
            Building fast, scalable products with React, Next.js & TypeScript
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4"
          >
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="dev-btn flex items-center gap-2"
            >
              <ArrowDown className="w-4 h-4" />
              View Experience
            </button>
            <Link
              href={meta.resume}
              download
              className="dev-btn-outline flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <HeroStats mode="developer" />
          </motion.div>
        </motion.div>

        {/* Right — photo with floating tags */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <HeroFloatingTags mode="developer" />
        </motion.div>
      </div>
    </section>
  );
}
