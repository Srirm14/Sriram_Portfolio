"use client";

import { motion } from "framer-motion";
import { useMode } from "@/contexts/mode-context";
import { devSkills, designSkills } from "@/lib/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const { mode } = useMode();
  const isDev = mode === "developer";
  const skills = isDev ? devSkills : designSkills;

  return (
    <section
      id="skills"
      className={cn(
        "relative px-6 py-20",
        isDev ? "bg-dev-bg" : "bg-[#0a0a0a]"
      )}
    >
      <div className="mx-auto max-w-4xl">
        <h2
          className={cn(
            "mb-12",
            isDev ? "section-heading-dev" : "section-heading-design"
          )}
        >
          Skills
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="space-y-3"
            >
              <h3
                className="font-grotesk text-sm font-semibold"
                style={{ color: isDev ? "#06b6d4" : "#39FF14" }}
              >
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "px-3 py-1.5 text-xs font-mono transition-all",
                      isDev ? "skill-pill-dev rounded-full" : "skill-pill-design"
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
