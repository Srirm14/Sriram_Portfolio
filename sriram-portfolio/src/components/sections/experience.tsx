"use client";

import { motion } from "framer-motion";
import { useMode } from "@/contexts/mode-context";
import { experiences } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

export function Experience() {
  const { mode } = useMode();
  const isDev = mode === "developer";

  const filteredExperiences = experiences.filter((exp) =>
    isDev ? exp.devBullets.length > 0 : exp.designBullets.length > 0
  );

  return (
    <section
      id="experience"
      className={cn(
        "relative px-6 py-20",
        isDev ? "bg-dev-bg" : "bg-[#0a0a0a]"
      )}
    >
      <div className="mx-auto max-w-3xl">
        <h2
          className={cn(
            "mb-12",
            isDev ? "section-heading-dev" : "section-heading-design"
          )}
        >
          Experience
        </h2>
        <div className="relative">
          <div
            className={cn(
              "absolute left-[11px] top-0 bottom-0 w-0.5",
              isDev ? "bg-white/20" : "bg-[#39FF14]/50"
            )}
          />
          <div className="space-y-8">
            {filteredExperiences.map((exp, i) => {
              const bullets = isDev ? exp.devBullets : exp.designBullets;
              const role = isDev ? exp.role : exp.roleDesign || exp.role;
              const stack = isDev ? exp.stack : exp.designTools || [];
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex gap-6"
                >
                  <div
                    className={cn(
                      "absolute left-0 top-2 h-3 w-3 shrink-0 rounded-full",
                      isDev ? "bg-[#7c3aed]" : "bg-[#39FF14]"
                    )}
                  />
                  <div
                    className={cn(
                      "group ml-8 flex-1 rounded-xl p-6 transition-all",
                      isDev
                        ? "glass-card-hover border border-white/10 bg-white/5"
                        : "brutal-card-hover border-2 border-[#39FF14] bg-[#0a0a0a] hover:bg-[#39FF14]"
                    )}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3
                        className="font-grotesk font-bold"
                        style={{ color: "#ffffff" }}
                      >
                        {exp.company}
                      </h3>
                      {exp.location && (
                        <span
                          className="text-sm"
                          style={{ color: isDev ? "rgba(255,255,255,0.6)" : "rgba(57,255,20,0.8)" }}
                        >
                          · {exp.location}
                        </span>
                      )}
                    </div>
                    <p
                      className="mb-1 text-sm font-medium"
                      style={{ color: isDev ? "#06b6d4" : "#39FF14" }}
                    >
                      {role}
                    </p>
                    <p
                      className="mb-4 text-sm"
                      style={{ color: isDev ? "rgba(255,255,255,0.6)" : "rgba(57,255,20,0.7)" }}
                    >
                      {exp.duration}
                    </p>
                    <ul className="space-y-2">
                      {bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm leading-relaxed"
                          style={{ color: "#ffffff" }}
                        >
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                            style={{ backgroundColor: isDev ? "#06b6d4" : "#39FF14" }}
                          />
                          <span
                            className={cn(
                              "group-hover:transition-colors",
                              isDev ? "group-hover:text-[#ffffff]" : "group-hover:text-[#0a0a0a]"
                            )}
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {stack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {stack.map((s) => (
                          <span
                            key={s}
                            className={cn(
                              "rounded px-2 py-0.5 text-xs font-mono",
                              isDev
                                ? "bg-white/10 text-white/80"
                                : "border border-[#39FF14]/50 text-[#39FF14]"
                            )}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
