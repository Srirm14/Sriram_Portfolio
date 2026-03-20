"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Download, Send } from "lucide-react";
import { useLightDark } from "@/context/LightDarkContext";
import { HeroBackground } from "./HeroBackground";
import { HeroStats } from "./HeroStats";

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

          <div className="hero-dev-name-glow-wrap relative mb-4 w-full min-w-0">
            <motion.h1
              {...fadeUp}
              transition={{
                duration: 0.35,
                delay: 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hero-name-shimmer text-balance font-grotesk text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {meta.name}
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{
                duration: 0.45,
                delay: 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-mono text-sm text-[rgba(28,22,18,0.6)] mt-1"
            >
              — {((meta as { devRole?: string; title: string }).devRole) ?? ((meta as { devRole?: string; title: string }).title)}
            </motion.p>
          </div>

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
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="dev-btn-outline flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Apply
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
      className="hero-dev-dark relative flex min-h-[100svh] items-center overflow-hidden bg-dev dot-grid"
    >
      <HeroBackground mode="developer" appearance="dark" />
      <div
        className="hero-dark-grain pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
      />
      <div
        className="hero-dev-dark-name-aura pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-28 text-center md:px-10 md:py-36 lg:items-start lg:text-left">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="badge-available-dev mb-8 flex items-center gap-2 md:mb-10"
        >
          <span className="h-2 w-2 animate-ping-slow rounded-full bg-[#c9a84c]/90 shadow-[0_0_14px_rgba(201,168,76,0.35)]" />
          <span className="font-mono text-sm text-[rgba(232,228,218,0.72)]">
            {meta.availability}
          </span>
        </motion.div>

        <div className="hero-dev-name-glow-wrap relative mb-5 w-full min-w-0">
          <motion.h1
            {...fadeUp}
            transition={{
              duration: 0.25,
              delay: 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hero-name-shimmer-dark text-balance relative z-[1] font-grotesk text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {meta.name}
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{
              duration: 0.45,
              delay: 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-mono text-sm text-[rgba(232,228,218,0.65)] mt-1"
          >
            — {((meta as { devRole?: string; title: string }).devRole) ?? ((meta as { devRole?: string; title: string }).title)}
          </motion.p>
        </div>

        <motion.p
          {...fadeUp}
          transition={{
            duration: 0.55,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hero-dev-dark-subtitle font-poppins text-base font-medium tracking-wide text-[rgba(196,188,176,0.88)] md:text-lg"
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
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="dev-btn-outline flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Apply
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
          transition={{ duration: 0.65, delay: 0.28, ease: "easeOut" }}
          className="w-full"
        >
          <HeroStats mode="developer" />
        </motion.div>
      </div>
    </section>
  );
}
