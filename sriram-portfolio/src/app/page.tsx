import {
  getExperiences,
  getProjects,
  getSkills,
  getContactLinks,
  getMeta,
} from "@/lib/data";
import { ModeThemeSync } from "@/components/mode-theme-sync";
import { ModeHint } from "@/components/ui/ModeHint";
import { Navbar } from "@/components/navbar";
import Hero from "@/components/sections/hero";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Contact from "@/components/sections/contact";

export const revalidate = false;

export default function Home() {
  const meta = getMeta();
  const experiences = getExperiences();
  const projects = getProjects();
  const skills = getSkills();
  const contactLinks = getContactLinks();

  return (
    <>
      <ModeThemeSync />
      <div className="page-surface min-h-screen">
        <Navbar />
        <ModeHint />
        <main className="pt-16">
          <Hero meta={meta} />
          <Experience experiences={experiences} />
          <Projects projects={projects} />
          <Skills skills={skills} />
          <Contact contactLinks={contactLinks} meta={meta} />
        </main>
      </div>
    </>
  );
}
