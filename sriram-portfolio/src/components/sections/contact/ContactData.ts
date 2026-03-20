export interface ContactLink {
  id: string;
  label: string;
  sublabel: string;
  value: string;
  href: string;
  copyValue: string;
  canCopy: boolean;
  canNavigate: boolean;
  icon: string;
  devAccent: string;
  designAccent: string;
}

export const contactLinks: ContactLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    sublabel: "Let's connect professionally",
    value: "sriram-venkatachalam",
    href: "https://www.linkedin.com/in/sriram-venkatachalam-976a0016a/",
    copyValue:
      "https://www.linkedin.com/in/sriram-venkatachalam-976a0016a/",
    canCopy: true,
    canNavigate: true,
    icon: "Linkedin",
    devAccent: "#c9a84c",
    designAccent: "#e85d00",
  },
  {
    id: "email",
    label: "Email",
    sublabel: "Slide into my inbox",
    value: "sriramvenkatachalam1406@gmail.com",
    href: "mailto:sriramvenkatachalam1406@gmail.com",
    copyValue: "sriramvenkatachalam1406@gmail.com",
    canCopy: true,
    canNavigate: true,
    icon: "Mail",
    devAccent: "#e8d5a3",
    designAccent: "#e85d00",
  },
  {
    id: "behance",
    label: "Behance",
    sublabel: "See my design work",
    value: "sriramleo",
    href: "https://www.behance.net/sriramleo",
    copyValue: "https://www.behance.net/sriramleo",
    canCopy: true,
    canNavigate: true,
    icon: "Globe",
    devAccent: "#d4a843",
    designAccent: "#e85d00",
  },
];
