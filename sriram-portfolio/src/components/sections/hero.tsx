"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useModeStore } from "@/store";
import { HeroBackground } from "@/components/animations/hero-background";
import { Typewriter } from "@/components/animations/typewriter";
import { cn } from "@/lib/utils";

export function Hero() {
  const mode = useModeStore((s) => s.mode);
  const isDev = mode === "developer";

  return (
    <section
      id="hero"
      className={cn(
        "relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16",
        isDev ? "bg-dev-bg" : "bg-[#0a0a0a]",
      )}
    >
      <HeroBackground />
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <motion.h1
          className={cn(
            "mb-4 font-grotesk text-display-lg font-bold tracking-tight",
            "text-[#ffffff]",
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDev
            ? "Senior Frontend Engineer"
            : "Product Designer & Frontend Engineer"}
        </motion.h1>
        <motion.p
          className="mb-6 text-lg"
          style={{
            color: isDev ? "rgba(255,255,255,0.7)" : "rgba(57,255,20,0.8)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {isDev
            ? "Building fast, scalable products · React · Next.js · TypeScript"
            : "Crafting interfaces that feel as good as they look · Figma · UI/UX · Design Systems"}
        </motion.p>
        <motion.div
          className={cn(
            "mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-mono",
            isDev ? "badge-available-dev" : "badge-available-design",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full",
                isDev ? "bg-green-500 animate-ping-slow" : "bg-[#39FF14]",
              )}
            />
            <span
              className={cn(
                "relative inline-flex h-2 w-2 rounded-full",
                isDev ? "bg-green-500" : "bg-[#39FF14]",
              )}
            />
          </span>
          <span style={{ color: isDev ? "#ffffff" : "#39FF14" }}>
            Open to roles · Bengaluru / Remote
          </span>
        </motion.div>
        <motion.div
          className="mb-4 flex items-center gap-2 text-sm"
          style={{
            color: isDev ? "rgba(255,255,255,0.6)" : "rgba(57,255,20,0.6)",
          }}
        >
          <Typewriter />
        </motion.div>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {isDev ? (
            <>
              <Link
                href="#projects"
                className={cn(
                  "rounded-lg border px-6 py-3 font-grotesk font-medium backdrop-blur-sm transition-all",
                  "border-[#06b6d4]/50 bg-white/5 text-[#ffffff]",
                  "hover:border-[#06b6d4] hover:shadow-glow-cyan",
                )}
              >
                View Work
              </Link>
              <Link
                href="#"
                className={cn(
                  "rounded-lg border border-white/20 px-6 py-3 font-grotesk font-medium backdrop-blur-sm transition-all",
                  "bg-transparent text-[#ffffff] hover:border-white/40 hover:bg-white/5",
                )}
              >
                Resume
              </Link>
            </>
          ) : (
            <>
              <Link href="#projects" className={cn("brutal-btn")}>
                View Work
              </Link>
              <Link href="#" className={cn("brutal-btn-outline")}>
                Resume
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
