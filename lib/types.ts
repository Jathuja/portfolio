export interface ProjectLinks {
  demo?: string;
  github?: string;
  writeup?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description?: string;
  stack: string[];
  featured: boolean;
  year?: string;
  role?: string;
  problem?: string;
  features?: string[];
  challenge?: string;
  solution?: string;
  architectureNotes?: string;
  links?: ProjectLinks;
  liveUrl?: string;
  githubUrl?: string;
  coverImage?: string;
  metrics?: ProjectMetric[];
  status?: "Completed" | "In Progress" | "Archived" | string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  gpa?: string;
  coursework: string[];
  honors?: string[];
  location?: string;
  logo?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url: string;
  credentialId?: string;
  skills?: string[];
  badge?: string;
}

export interface Experience {
  role: string;
  company: string;
  location?: string;
  duration: string;
  description: string;
  achievements?: string[];
  techStack?: string[];
  current?: boolean;
}

export interface TimelineItem {
  id: string;
  category: "experience" | "education" | "certification" | "milestone";
  date: string;
  title: string;
  subtitle: string;
  description?: string;
  tags?: string[];
  link?: {
    label: string;
    url: string;
  };
  highlight?: boolean;
}

export interface Interest {
  id: string;
  title: string;
  category: string;
  description: string;
  details?: string;
  icon?: string;
}

export interface SkillItem {
  name: string;
  descriptor?: string;
  highlighted?: boolean;
}

export interface SkillCategoryGroup {
  id: string;
  key: string;
  title: string;
  tagline: string;
  skills: SkillItem[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  cloud?: string[];
  tools: string[];
  softSkills?: string[];
}

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  source: "native" | "medium";
  canonicalUrl?: string;
  url?: string; // backwards compatibility alias
  coverImage?: string;
  readingTime: string;
  content?: string;
};

export type BlogPost = Post;


export interface NavItem {
  name: string;
  href: string;
  number: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  medium: string;
  email: string;
  twitter?: string;
}

export interface ContactConfig {
  formspreeEndpoint: string;
  responseEstimate: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  description: string;
  url: string;
  ogImage: string;
  links: SocialLinks;
  contact: ContactConfig;
  mediumUsername: string;
  navItems: NavItem[];
  secondaryNavItems: NavItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrContext: string;
  quote: string;
  relationship: string;
  avatar?: string;
  projectOrHighlight?: string;
}

export interface UsesItem {
  id: string;
  name: string;
  category: string;
  description: string;
  specsOrDetails?: string;
  tag?: string;
  link?: string;
  highlight?: boolean;
}

export interface UsesCategoryGroup {
  id: string;
  key: string;
  title: string;
  tagline: string;
  items: UsesItem[];
}

export interface NowFocusItem {
  id: string;
  category: "building" | "learning" | "reading" | "exploring" | "seeking" | string;
  title: string;
  description: string;
  link?: {
    label: string;
    url: string;
  };
  status?: string;
  details?: string[];
}

export interface NowData {
  lastUpdated: string;
  location: string;
  statusSummary: string;
  quote?: {
    text: string;
    author: string;
  };
  focusItems: NowFocusItem[];
}

