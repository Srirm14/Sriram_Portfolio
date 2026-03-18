import { ModeThemeSync } from "@/components/mode-theme-sync";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <ModeThemeSync />
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
        </main>
      </div>
    </>
  );
}
