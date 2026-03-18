export type Mode = "developer" | "designer";

export interface Project {
  id: string;
  title: string;
  tech: string[];
  duration: string;
  devBullets: string[];
  designBullets: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  designTools?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  roleDesign?: string;
  duration: string;
  location?: string;
  devBullets: string[];
  designBullets: string[];
  stack: string[];
  designTools?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface NavLink {
  label: string;
  href: string;
}
