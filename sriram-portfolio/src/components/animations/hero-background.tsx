"use client";

import { motion } from "framer-motion";
import { useModeStore } from "@/store";

export function HeroBackground() {
  const mode = useModeStore((s) => s.mode);
  const isDev = mode === "developer";

  if (!isDev) {
    return (
      <div
        className="absolute inset-0 overflow-hidden bg-[#0a0a0a]"
        aria-hidden
      >
        <div className="absolute inset-0 line-grid opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-full w-full opacity-[0.06]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="design-grid"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 0 40 L 80 40"
                  stroke="#39FF14"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M 40 0 L 40 80"
                  stroke="#39FF14"
                  strokeWidth="1"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#design-grid)" />
          </svg>
        </div>
        <motion.div
          className="absolute bottom-20 left-10 h-1 w-32 bg-[#39FF14]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute right-20 top-1/3 h-1 w-24 rotate-45 bg-[#39FF14]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.div
          className="absolute left-1/4 top-20 h-1 w-20 -rotate-12 bg-[#39FF14]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-dev-bg dot-grid"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-dev-soft opacity-50" />
      <motion.div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#7c3aed]/20 blur-3xl"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-[#06b6d4]/20 blur-3xl"
        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-32 w-32 rounded-full bg-[#7c3aed]/15 blur-2xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
