"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

export type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "blur-in"
  | "slide-up";

interface UseScrollAnimationOptions {
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

interface AnimationConfig {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  transition: Record<string, number | string>;
}

const VARIANTS: Record<AnimationVariant, AnimationConfig> = {
  "fade-up": {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  "fade-down": {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  "fade-left": {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  "fade-right": {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  "scale-up": {
    initial: { opacity: 0, scale: 0.88 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  "blur-in": {
    initial: { opacity: 0, filter: "blur(12px)", y: 16 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
  },
  "slide-up": {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 28,
    },
  },
};

export function useScrollAnimation({
  variant = "fade-up",
  delay = 0,
  duration,
  threshold = 0.15,
  once = true,
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });
  const config = VARIANTS[variant];

  const transition = {
    ...config.transition,
    ...(duration ? { duration } : {}),
    delay,
  };

  return {
    ref,
    initial: config.initial,
    animate: inView ? config.animate : config.initial,
    transition,
  };
}
