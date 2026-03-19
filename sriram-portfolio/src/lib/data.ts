import { getYearsOfExperience } from "@/lib/experience";
import { experiences } from "@/components/sections/experience/ExperienceData";
import type { ExperienceItem } from "@/components/sections/experience/ExperienceData";
import { projects } from "@/components/sections/projects/ProjectsData";
import type { ProjectItem } from "@/components/sections/projects/ProjectsData";
import { devSkills, designSkills } from "@/components/sections/skills/SkillsData";
import type { SkillCategory } from "@/components/sections/skills/SkillsData";
import { contactLinks } from "@/components/sections/contact/ContactData";
import type { ContactLink } from "@/components/sections/contact/ContactData";

export function getExperiences(): ExperienceItem[] {
  return experiences;
}

export function getProjects(): ProjectItem[] {
  return projects;
}

export function getSkills(): { dev: SkillCategory[]; design: SkillCategory[] } {
  return { dev: devSkills, design: designSkills };
}

export function getContactLinks(): ContactLink[] {
  return contactLinks;
}

export function getMeta() {
  return {
    name: "Sriram Venkatachalam",
    title: "Senior Frontend Engineer",
    subtitle: `${getYearsOfExperience()} Years · React · Next.js · TypeScript`,
    location: "Bengaluru, India",
    availability: "Open to roles · Bengaluru / Remote",
    email: "sriramvenkatachalam1406@gmail.com",
    linkedin: "https://www.linkedin.com/in/sriram-venkatachalam-976a0016a/",
    github: "https://github.com/Srirm14",
    behance: "https://www.behance.net/sriramleo",
    portfolio: "https://sriramvenkatachalam.in",
    resume: "/resume.pdf",
  };
}
