"use client";

import { ContactCardDev } from "./ContactCardDev";
import { ContactCardDesign } from "./ContactCardDesign";
import type { ContactLink } from "./ContactData";

interface ContactCardProps {
  readonly link: ContactLink;
  readonly mode: "developer" | "designer";
}

export function ContactCard({ link, mode }: ContactCardProps) {
  return mode === "developer" ? (
    <ContactCardDev link={link} />
  ) : (
    <ContactCardDesign link={link} />
  );
}
