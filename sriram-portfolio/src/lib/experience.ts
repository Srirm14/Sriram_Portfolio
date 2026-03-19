export const CAREER_START = new Date("2021-11-01");

export function getYearsOfExperience(): string {
  const now = new Date();
  const totalMs = now.getTime() - CAREER_START.getTime();
  const totalMonths = Math.floor(totalMs / (1000 * 60 * 60 * 24 * 30.4375));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Round up to next year if 9+ months into current year
  // e.g. 4 years 9 months → "5+"
  // e.g. 4 years 3 months → "4+"
  const displayYears = months >= 9 ? years + 1 : years;

  return `${displayYears}+`;
}

export function getYearsLabel(): string {
  return `${getYearsOfExperience()} Years`;
}

// e.g. "4+ Years Experience"
export function getYearsFullLabel(): string {
  return `${getYearsOfExperience()} Years Experience`;
}
