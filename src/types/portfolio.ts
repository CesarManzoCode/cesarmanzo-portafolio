export type SocialLink = {
  label: string;
  href: string;
  displayValue: string;
};

export type Project = {
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
};

export type SkillCategory = 'backend' | 'ai-data' | 'tools';

export type SkillGroup = {
  title: string;
  category: SkillCategory;
  description: string;
  skills: string[];
};

export type PortfolioData = {
  name: string;
  role: string;
  pitch: string;
  summary: string;
  availability: string;
  highlights: string[];
  about: string[];
  projects: Project[];
  skillGroups: SkillGroup[];
  socials: {
    github: SocialLink;
    linkedin: SocialLink;
    email: SocialLink;
  };
  contactNote: string;
};
