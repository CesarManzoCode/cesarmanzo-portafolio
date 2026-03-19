import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  name: 'César Alberto Manzo Olivares',
  role: 'Backend Developer · Automatización · IA · Data',
  pitch:
    'Construyo sistemas backend inteligentes que automatizan procesos, convierten datos en decisiones y llevan la IA a productos reales.',
  summary:
    'Backend developer enfocado en arquitectura sólida, automatización útil e implementación de soluciones impulsadas por datos. Combino servicios backend, integraciones, inteligencia artificial y análisis para crear productos robustos, escalables y orientados a impacto.',
  availability: 'Disponible para oportunidades en backend, IA aplicada y data.',
  highlights: [
    'APIs y servicios escalables',
    'Automatización de procesos',
    'Integración de IA aplicada',
    'Análisis y explotación de datos',
  ],
  about: [
    'Diseño y construyo soluciones backend con foco en rendimiento, mantenibilidad y calidad de código. Me especializo en convertir procesos manuales en flujos automatizados, integraciones confiables y plataformas listas para crecer.',
    'Mi enfoque mezcla ingeniería de software, pensamiento analítico y visión de producto para resolver problemas reales con APIs, servicios, pipelines, agentes, dashboards y sistemas orientados por datos.',
  ],
  projects: [
    {
      name: 'Sentinel Agent',
      description:
        'Agente de IA local-first orientado a terminal que actúa como una capa de control entre la intención del usuario y la ejecución de acciones en el sistema. Implementa un runtime estructurado (planning → execution → reflection → response) con un policy engine que evalúa riesgos, permisos y aprobaciones antes de ejecutar herramientas, priorizando seguridad, observabilidad y control de efectos secundarios.',
      technologies: ['Python', 'Groq API (LLM)', 'SQLite (FTS5)', 'Vector Index', 'Rich (CLI)'],
      githubUrl: 'https://github.com/CesarManzoCode/sentinel-agent',
      liveUrl:'',
    },
    {
    name: 'RevenuePulse AI',
    description:
      'Plataforma de automatización de ventas B2B SaaS con IA. Centraliza la ingesta de leads, los puntúa con inteligencia heurística e histórica, automatiza el seguimiento, recomienda mensajes por canal y genera analytics de atribución de revenue por fuente y campaña.',
    technologies: [
      'FastAPI',
      'Python 3.11',
      'SQLAlchemy 2.0',
      'PostgreSQL',
      'Alembic',
      'Celery',
      'Redis',
      'Pandas',
      'NumPy',
      'Pydantic v2',
      'React',
      'TypeScript',
      'Vite',
      'TailwindCSS',
      'TanStack Query',
      'Zustand',
      'Recharts',
      'Docker',
    ],
    githubUrl: 'https://github.com/CesarManzoCode/revenuepulse-ai',
    liveUrl: '', // No hay live URL publicada en el repo
  },
  {
    name: 'Ennard',
    description:
      'Asistente de IA autónomo local con acciones modulares, planificación y memoria persistente. Ejecuta tareas del sistema, navega internet, gestiona archivos, corre código Python y se auto-mejora mediante un loop de agente con soporte para modo autónomo.',
    technologies: ['Python', 'OpenAI SDK (compatible)', 'Qwen2.5-7B', 'Threading'],
    githubUrl: 'https://github.com/CesarManzoCode/Ennard',
    liveUrl: '', // No tiene deploy público — es un asistente local (CLI)
  },
  ],
  skillGroups: [
    {
      title: 'Backend',
      category: 'backend',
      description: 'Arquitectura de servicios, APIs, lógica de negocio, integraciones y escalabilidad.',
      skills: ['Node.js', 'Python', 'FastAPI', 'Express', 'REST APIs', 'SQL', 'PostgreSQL', 'Redis', 'Docker'],
    },
    {
      title: 'IA / Data',
      category: 'ai-data',
      description: 'Aplicación práctica de IA, automatización inteligente y análisis de datos accionable.',
      skills: ['OpenAI API', 'Pandas', 'NumPy', 'ETL', 'Data Analysis', 'Prompt Engineering', 'Automation Workflows'],
    },
    {
      title: 'Herramientas',
      category: 'tools',
      description: 'Entornos, flujos y herramientas para desarrollar, desplegar y mantener software moderno.',
      skills: ['Git', 'GitHub', 'Linux', 'Vercel', 'GitHub Actions', 'Postman', 'VS Code', 'CI/CD'],
    },
  ],
  socials: {
    github: {
      label: 'GitHub',
      href: 'https://github.com/CesarManzoCode',
      displayValue: 'github.com/CesarManzoCode',
    },
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/c%C3%A9sar-alberto-manzo-olivares-b503383b8/',
      displayValue: 'linkedin.com/in/c%C3%A9sar-alberto-manzo-olivares-b503383b8/',
    },
    email: {
      label: 'Contacto',
      href: 'mailto:cesarmanzocode@gmail.com',
      displayValue: 'cesarmanzocode@gmail.com',
    },
  },
  contactNote:
    'Disponible para roles full-time y colaboraciones freelance.',
};
