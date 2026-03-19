"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StaggerChildrenProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  threshold?: number;
  className?: string;
  childClassName?: string | ((index: number) => string);
}

const CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  threshold = 0.1,
  className,
  childClassName,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {Array.isArray(children) &&
        children.map((child, i) => (
          <motion.div
            key={i}
            variants={CHILD_VARIANTS}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 24,
            }}
            className={
              typeof childClassName === "function"
                ? childClassName(i)
                : childClassName
            }
          >
            {child}
          </motion.div>
        ))}
    </motion.div>
  );
}
