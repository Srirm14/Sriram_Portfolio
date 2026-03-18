# Sriram Venkatachalam — Portfolio

Personal portfolio website for Sriram Venkatachalam,
Senior Frontend Engineer & Product Designer.

Live: https://sriramvenkatachalam.in

---

## Stack

| Layer     | Tech                           |
| --------- | ------------------------------ |
| Framework | Next.js 14 (App Router, SSG)   |
| Language  | TypeScript (strict)            |
| Styling   | Tailwind CSS + shadcn/ui       |
| Animation | Framer Motion                  |
| Fonts     | Space Grotesk, Poppins, JetBrains Mono, Syne |
| Deployment| Vercel                         |

---

## Features

- **Dual mode portfolio** — Developer mode (glassmorphism) and Designer mode (KLX neo-brutalism) with a global toggle
- **Fully static (SSG)** — All data served at build time, zero runtime fetching
- **SEO optimised** — OG image, sitemap, robots.txt, web manifest, canonical URLs
- **Performance first** — Static export, font optimisation, image priority loading
- **Responsive** — Mobile first, works across all screen sizes
- **Accessible** — Semantic HTML, aria labels, keyboard navigable

---

## Sections

| # | Section    | Developer Mode              | Designer Mode                  |
|---|------------|-----------------------------|--------------------------------|
| 1 | Hero       | Glassmorphism + spinning rings | Glitch photo + brutalist CTAs |
| 2 | Experience | Alternating timeline, collapsible cards | KLX brutalist timeline |
| 3 | Projects   | Bento grid flip cards       | Bento grid flip cards          |
| 4 | Skills     | Live terminal session       | Orbital tag cloud              |
| 5 | Contact    | Glass hover cards           | Brutalist hover cards          |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production (static export)
npm run build

# Preview production build
npx serve out
```

---

## Project Structure

```
src/
├── app/              # Next.js App Router pages + metadata
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, Experience, Projects, Skills, Contact
│   │   ├── hero/
│   │   ├── experience/
│   │   ├── projects/
│   │   ├── skills/
│   │   └── contact/
│   ├── toggle/       # Dev/Designer mode toggle
│   └── ui/           # Reusable UI primitives
├── context/          # ModeContext — global dev/designer state
├── data/             # All static content data
├── hooks/            # useMode, useTypewriter, useTerminalType
├── lib/              # utils, data access functions
└── types/            # TypeScript interfaces

public/
├── images/           # Profile photo, project screenshots
└── resume.pdf        # Downloadable resume
```

---

## Content Updates

Portfolio data is centralised via `src/lib/data.ts`, which imports from section data files. To update:

- **Experience** — `src/components/sections/experience/ExperienceData.ts`
- **Projects** — `src/components/sections/projects/ProjectsData.ts`
- **Skills** — `src/components/sections/skills/SkillsData.ts`
- **Contact** — `src/components/sections/contact/ContactData.ts`
- **Meta** (name, title, links) — `getMeta()` in `src/lib/data.ts`

No component changes needed.

---

## Deployment

Deployed on Vercel. Push to main triggers automatic deployment.

Build command: `npm run build`
Output directory: `out`

---

## Author

**Sriram Venkatachalam**
Senior Frontend Engineer · Bengaluru, India

- Portfolio: https://sriramvenkatachalam.in
- LinkedIn: https://www.linkedin.com/in/sriram-venkatachalam-976a0016a/
- GitHub: https://github.com/Srirm14
- Behance: https://www.behance.net/sriramleo
- Email: sriramvenkatachalam1406@gmail.com
