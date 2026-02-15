export enum ProjectCategory {
  INSTALLATIONS = "Installations & Exhibitions",
  AI_RESEARCH = "AI & Design Research",
  PRODUCT_DESIGN = "Product & Visual Design",
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: ProjectCategory;
  image: string;
  contextImage?: string;
  images?: string[];
  processImages?: string[];
  outcomeImages?: string[];
  overview: string;
  industry: string[];
  service: string[];
  learnings: string;
  needs?: string;
  concept?: string;
  process?: string[];
  outcome?: string;
  reflection?: string;
  featured?: boolean;
  externalLink?: string;
  reflectionVideo?: string;
  reflectionImage?: string;
  collaborators?: string;
}

// Fix: Add Event interface to fix missing export error in EventsPage.tsx.
export interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  country: string;
  type: string;
  link?: string;
  image: string;
}