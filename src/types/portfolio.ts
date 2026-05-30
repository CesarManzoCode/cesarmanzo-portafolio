export type SocialLink = {
  label: string;
  href: string;
  displayValue: string;
};

export type Accent = 'cyan' | 'violet' | 'emerald' | 'amber';

export type ProjectStatus = 'live' | 'building' | 'open-source';

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  metrics: ProjectMetric[];
  accent: Accent;
  status: ProjectStatus;
  year: string;
  /** Visible domain for the live deployment, e.g. "orux.space". */
  domain?: string;
  liveUrl?: string;
  githubUrl?: string;
  /** When the source repo is private and only the product is public. */
  repoPrivate?: boolean;
  featured?: boolean;
};

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

export type SkillCategory = 'backend' | 'frontend' | 'ai-data' | 'infra';

export type SkillGroup = {
  title: string;
  category: SkillCategory;
  description: string;
  skills: string[];
};

export type PortfolioData = {
  name: string;
  shortName: string;
  role: string;
  roles: string[];
  pitch: string;
  summary: string;
  availability: string;
  highlights: string[];
  stats: Stat[];
  about: string[];
  marquee: string[];
  projects: Project[];
  skillGroups: SkillGroup[];
  socials: {
    github: SocialLink;
    linkedin: SocialLink;
    email: SocialLink;
  };
  contactNote: string;
};
