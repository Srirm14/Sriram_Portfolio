"use client";

import { motion } from "framer-motion";
import {
  useScrollAnimation,
  type AnimationVariant,
} from "@/hooks/useScrollAnimation";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration,
  threshold = 0.15,
  once = true,
  className,
  style,
}: ScrollRevealProps) {
  const { ref, initial, animate, transition } = useScrollAnimation({
    variant,
    delay,
    duration,
    threshold,
    once,
  });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
