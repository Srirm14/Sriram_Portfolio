"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useLightDark } from "@/context/LightDarkContext";
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

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function HeroDevMode({ meta }: HeroDevModeProps) {
  const { isLight } = useLightDark();

  if (isLight) {
    return (
      <section
        id="hero"
        className="hero-dev-light relative flex min-h-[100svh] items-center overflow-hidden bg-dev dot-grid"
      >
        <HeroBackground mode="developer" appearance="light" />
        <div
          className="hero-light-grain pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-28 text-center md:px-10 md:py-36 lg:items-start lg:text-left">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="badge-available-dev hero-light-badge mb-8 flex items-center gap-2 md:mb-10"
          >
            <span className="h-2 w-2 animate-ping-slow rounded-full bg-[#b8956a]/90 shadow-[0_0_12px_rgba(201,168,76,0.45)]" />
            <span className="font-mono text-sm text-[rgba(28,22,18,0.72)]">
              {meta.availability}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{
              duration: 0.65,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-4 max-w-[18ch] font-grotesk text-4xl font-semibold tracking-tight text-[#14110e] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {meta.name}
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{
              duration: 0.55,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="ld-section-lede font-poppins text-base font-medium tracking-wide md:text-lg"
          >
            {meta.subtitle}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{
              duration: 0.55,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3 md:mt-14 md:gap-4 lg:justify-start"
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
              <ArrowDown className="h-4 w-4" />
              View Experience
            </button>
            <Link
              href={meta.resume}
              download
              className="dev-btn-outline flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
            className="w-full"
          >
            <HeroStats mode="developer" />
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="bg-dev dot-grid relative flex min-h-screen items-center overflow-hidden"
    >
      <HeroBackground mode="developer" appearance="dark" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 pt-16 pb-12 md:gap-12 md:px-6 md:pt-24 md:pb-16 lg:flex-row lg:justify-start lg:gap-20 lg:px-12">
        {/* Left — text */}
        <motion.div
          className="flex w-full flex-1 flex-col items-center text-center lg:items-start lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="badge-available-dev mb-4 flex items-center gap-2 md:mb-6"
          >
            <span className="h-2 w-2 animate-ping-slow rounded-full bg-green-400" />
            <span className="text-[#f0ece4]/90">{meta.availability}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-display-lg md:text-display-xl mb-4 font-grotesk font-bold tracking-tight leading-tight text-[#f0ece4]"
          >
            Senior Frontend
            <br />
            <span className="text-gradient-dev">Engineer</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <HeroTypewriter mode="developer" words={DEV_WORDS} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-poppins mb-8 max-w-md text-base font-light leading-relaxed text-[#f0ece4]/65 md:text-lg"
          >
            Building fast, scalable products with React, Next.js & TypeScript
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:justify-start"
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
              <ArrowDown className="h-4 w-4" />
              View Experience
            </button>
            <Link
              href={meta.resume}
              download
              className="dev-btn-outline flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Link>
          </motion.div>

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
