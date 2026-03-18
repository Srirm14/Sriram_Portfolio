"use client";

import { motion } from "framer-motion";
import { useModeStore } from "@/store";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const mode = useModeStore((s) => s.mode);
  const isDev = mode === "developer";

  const filteredProjects = projects.filter((p) =>
    isDev ? p.devBullets.length > 0 : p.designBullets.length > 0,
  );

  return (
    <section
      id="projects"
      className={cn(
        "relative px-6 py-20",
        isDev ? "bg-dev-bg" : "bg-[#0a0a0a]",
      )}
    >
      <div className="mx-auto max-w-4xl">
        <h2
          className={cn(
            "mb-12",
            isDev ? "section-heading-dev" : "section-heading-design",
          )}
        >
          Projects
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((proj, i) => {
            const bullets = isDev ? proj.devBullets : proj.designBullets;
            const meta = isDev
              ? `${proj.tech.join(", ")} · ${proj.duration}`
              : proj.tags.join(", ");
            return (
              <motion.article
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "group rounded-xl p-6 transition-all duration-300",
                  isDev
                    ? "glass-card border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-glass-purple hover:-translate-y-1"
                    : "brutal-card border-2 border-[#39FF14] bg-[#0a0a0a] hover:border-[#39FF14] hover:bg-[#39FF14] hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5",
                )}
              >
                <h3
                  className="mb-2 font-grotesk font-bold"
                  style={{ color: "#ffffff" }}
                >
                  <span
                    className={
                      isDev
                        ? "group-hover:text-[#ffffff]"
                        : "group-hover:text-[#0a0a0a]"
                    }
                  >
                    {proj.title}
                  </span>
                </h3>
                <p
                  className="mb-4 text-sm"
                  style={{ color: isDev ? "rgba(255,255,255,0.7)" : "#39FF14" }}
                >
                  <span
                    className={
                      isDev
                        ? "group-hover:text-[#ffffff]"
                        : "group-hover:text-[#0a0a0a]"
                    }
                  >
                    {meta}
                  </span>
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
                        style={{
                          backgroundColor: isDev ? "#06b6d4" : "#39FF14",
                        }}
                      />
                      <span
                        className={
                          isDev
                            ? "group-hover:text-[#ffffff]"
                            : "group-hover:text-[#0a0a0a]"
                        }
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
                {!isDev && proj.designTools && (
                  <p
                    className="mt-4 text-xs font-mono"
                    style={{ color: "#39FF14" }}
                  >
                    <span className="group-hover:text-[#0a0a0a]">
                      Tools: {proj.designTools}
                    </span>
                  </p>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
