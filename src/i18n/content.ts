import type { PortfolioData } from '../types/portfolio';

export type Lang = 'en' | 'es';

export type SiteContent = {
  nav: { about: string; projects: string; skills: string; contact: string; cta: string };
  brandRole: string;
  a11y: { menu: string; backToTop: string; language: string };
  hero: {
    availability: string;
    roleLine: string;
    ctaProjects: string;
    scroll: string;
    signals: { k: string; v: string }[];
  };
  sections: {
    about: { eyebrow: string; title: string; description: string };
    projects: { eyebrow: string; title: string; description: string };
    skills: { eyebrow: string; title: string; description: string };
    contact: { eyebrow: string; title: string; description: string };
  };
  about: { pillars: { title: string; description: string }[]; nowLabel: string; nowText: string };
  projectsUi: { featured: string; visit: string; code: string; viewCode: string; privateRepo: string };
  status: { live: string; openSource: string; building: string };
  contactUi: { heading: string; ctaEmail: string; cta2: string; noteLabel: string };
  footer: { builtWith: string };
  portfolio: PortfolioData;
};

/* ---- values shared across both languages (avoid duplication drift) ---- */
const MARQUEE = [
  'Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'WebSockets', 'PostgreSQL', 'Redis',
  'SQLAlchemy', 'Prisma', 'Docker', 'Caddy', 'Stripe', 'OpenAI', 'tree-sitter', 'Tailwind CSS',
  'Vite', 'OAuth', 'asyncio', 'CI/CD',
];

const SOCIALS = {
  github: { label: 'GitHub', href: 'https://github.com/CesarManzoCode', displayValue: 'github.com/CesarManzoCode' },
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/c%C3%A9sar-alberto-manzo-olivares-b503383b8/',
    displayValue: 'linkedin.com/in/césar-manzo-olivares',
  },
  email: { label: 'Email', href: 'mailto:cesarmanzocode@gmail.com', displayValue: 'cesarmanzocode@gmail.com' },
};

const TECH = {
  orux: ['Python 3.11', 'WebSockets (asyncio)', 'PostgreSQL', 'asyncpg', 'tree-sitter', 'pyright', 'Starlette', 'React', 'TypeScript', 'Docker', 'Caddy', 'Stripe', 'OAuth'],
  studymation: ['FastAPI', 'Python 3.11', 'PostgreSQL', 'SQLAlchemy 2.0', 'Alembic', 'Redis', 'OpenAI', 'Next.js 15', 'React 19', 'Stripe', 'Docker'],
  cpp: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'shadcn/ui', 'Monaco Editor', 'Prisma', 'PostgreSQL', 'Better Auth', 'Judge0', 'Vercel'],
  sentinel: ['Python', 'Groq API (LLM)', 'SQLite (FTS5)', 'Vector Index', 'Rich (CLI)'],
};

const SKILLS = {
  backend: ['Python', 'FastAPI', 'Starlette', 'asyncio', 'WebSockets', 'Node.js', 'REST APIs', 'PostgreSQL', 'SQLAlchemy', 'Redis'],
  frontend: ['TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui', 'Radix UI'],
  ai: ['OpenAI API', 'Agents / Runtime', 'Prompt Engineering', 'tree-sitter', 'pyright', 'Pandas', 'Automation'],
  infra: ['Docker', 'Caddy', 'Vercel', 'DigitalOcean', 'Stripe', 'OAuth', 'GitHub Actions', 'Linux', 'CI/CD'],
};

const NAME = 'César Alberto Manzo Olivares';
const SHORT = 'César Manzo';

/* ------------------------------- English ------------------------------- */
const en: SiteContent = {
  nav: { about: 'About', projects: 'Projects', skills: 'Stack', contact: 'Contact', cta: "Let's talk" },
  brandRole: 'Software Engineer · Full-Stack',
  a11y: { menu: 'Open menu', backToTop: 'Back to top', language: 'Language' },
  hero: {
    availability: 'Available · remote / Guadalajara',
    roleLine: 'Software Engineer — Full-Stack',
    ctaProjects: 'View projects',
    scroll: 'Scroll',
    signals: [
      { k: 'In production', v: 'orux.space · cpp-ceti.vercel.app' },
      { k: 'Focus', v: 'Real-time · Applied AI · Payments' },
      { k: 'How I build', v: 'In layers, tested from commit 1' },
    ],
  },
  sections: {
    about: {
      eyebrow: 'About',
      title: 'An engineer who closes the full loop',
      description: 'I design the architecture, write the tested code and run the infrastructure that keeps it alive in production.',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Real products, in production',
      description: "These aren't demos: they're complete systems I designed, built and deployed — backed by users, payments and tests.",
    },
    skills: {
      eyebrow: 'Stack',
      title: 'The tools I build with',
      description: 'A stack that covers the whole path — from the first endpoint to a production domain with automatic TLS.',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's build something that ships",
      description: 'Full-time roles, freelance, or an idea you want to make real — the first message is the easiest one.',
    },
  },
  about: {
    pillars: [
      { title: 'End to end', description: 'Backend, frontend, database, payments and infrastructure. I close the full loop all the way to production.' },
      { title: 'Real-time & scale', description: 'WebSocket sync, presence, ownership and collision prevention over shared state.' },
      { title: 'AI applied with judgment', description: 'Agents with a structured runtime and LLMs integrated where they add value — not for hype.' },
    ],
    nowLabel: 'Right now',
    nowText: 'Running Orux in production and open to new challenges.',
  },
  projectsUi: { featured: 'Featured project', visit: 'Visit', code: 'Code', viewCode: 'View code', privateRepo: 'Private repo' },
  status: { live: 'Live', openSource: 'Open source', building: 'In progress' },
  contactUi: { heading: "Let's talk", ctaEmail: 'Email me', cta2: 'GitHub', noteLabel: 'Note' },
  footer: { builtWith: 'Built with React, Vite, Tailwind & Framer Motion' },
  portfolio: {
    name: NAME,
    shortName: SHORT,
    role: 'Software Engineer · Full-Stack · AI · Real-time Systems',
    roles: ['Full-Stack Software Engineer', 'Real-time systems', 'Applied AI for product', 'Backend · Infra · Payments'],
    pitch: 'I build and ship SaaS products end to end — from the real-time backend and applied AI to the frontend, payments and production infrastructure.',
    summary: 'Software engineer focused on getting ideas truly into production. I design solid architecture, write tested code and run the infrastructure behind it — APIs, real-time sync, AI agents, payment gateways and deployments that hold up with real users.',
    availability: 'Available for full-time roles and collaborations',
    highlights: ['End-to-end SaaS', 'Real-time systems', 'Applied AI', 'Infra & deployment'],
    stats: [
      { value: 3, label: 'Full-stack products built' },
      { value: 478, suffix: '+', label: 'Automated tests in Orux' },
      { value: 33, label: 'Iterative architecture layers' },
      { value: 4, label: 'Languages with semantic analysis' },
    ],
    about: [
      "I'm a full-stack software engineer — equally comfortable modeling a database, syncing state over WebSocket, integrating an LLM or issuing a TLS certificate on a VPS. What drives me is closing the full loop: turning an idea into something running, tested and in users' hands.",
      'I work in layers, with tests from the very first commit and architecture decisions that hold up. Orux, my most ambitious project, was built this way: 33 layers, 478 backend tests and a multi-team product deployed to production with Stripe payments.',
    ],
    marquee: MARQUEE,
    projects: [
      {
        name: 'Orux',
        tagline: 'Real-time collaborative editor, on top of Git',
        description: 'A coordination layer for teams that ship fast without stepping on each other. Each team works in an isolated workspace (a real Git repo) with per-file and per-line presence, invisible ownership with tentative edits and one-click approval, collision prevention and multi-language semantic impact analysis. It integrates Git from the web, GitHub OAuth login, an operator panel and a freemium model billed through Stripe. Built in layers, with tests from the first commit.',
        technologies: TECH.orux,
        metrics: [
          { label: 'Backend tests', value: '478' },
          { label: 'Layers', value: '33' },
          { label: 'Languages analyzed', value: '4' },
        ],
        accent: 'cyan',
        status: 'live',
        year: '2026',
        domain: 'orux.space',
        liveUrl: 'https://orux.space',
        repoPrivate: true,
        featured: true,
      },
      {
        name: 'Studymation',
        tagline: 'AI-powered academic document generator',
        description: 'A SaaS that guides students through a conversational flow, extracts the assignment details and produces a formatted .docx with verified academic citations (Semantic Scholar and Crossref). Monetized with subscriptions and prepaid credits via Stripe, a multi-provider LLM abstraction, Google OAuth and storage on DigitalOcean Spaces.',
        technologies: TECH.studymation,
        metrics: [
          { label: 'Backend', value: 'FastAPI' },
          { label: 'Payments', value: 'Stripe' },
          { label: 'Citations', value: 'Verified' },
        ],
        accent: 'violet',
        status: 'open-source',
        year: '2026',
        githubUrl: 'https://github.com/CesarManzoCode/Studymation',
      },
      {
        name: 'cpp-ceti',
        tagline: 'Interactive platform to learn C++',
        description: 'A platform for CETI Guadalajara students with a 90% practice, 10% theory philosophy: short lessons, an in-browser Monaco editor and automated tests that run your C++ code with Judge0. It includes challenges with test cases, quizzes, XP-based progress tracking and authentication with Better Auth + Google.',
        technologies: TECH.cpp,
        metrics: [
          { label: 'Editor', value: 'Monaco' },
          { label: 'Execution', value: 'Judge0' },
          { label: 'Hosting', value: 'Vercel' },
        ],
        accent: 'emerald',
        status: 'live',
        year: '2026',
        domain: 'cpp-ceti.vercel.app',
        liveUrl: 'https://cpp-ceti.vercel.app',
        githubUrl: 'https://github.com/CesarManzoCode/cpp-ceti',
      },
      {
        name: 'Sentinel Agent',
        tagline: 'Local-first AI agent for the terminal',
        description: "A control layer between the user's intent and the execution of actions on the system. It implements a structured runtime (planning → execution → reflection → response) with a policy engine that evaluates risks, permissions and approvals before running tools — prioritizing safety, observability and control of side effects.",
        technologies: TECH.sentinel,
        metrics: [
          { label: 'Focus', value: 'Local-first' },
          { label: 'Runtime', value: 'Plan → Exec' },
          { label: 'Control', value: 'Policy engine' },
        ],
        accent: 'amber',
        status: 'open-source',
        year: '2026',
        githubUrl: 'https://github.com/CesarManzoCode/sentinel-agent',
      },
    ],
    skillGroups: [
      { title: 'Backend & Real-time', category: 'backend', description: 'Service architecture, APIs, real-time sync and tested business logic.', skills: SKILLS.backend },
      { title: 'Frontend & Product', category: 'frontend', description: 'Modern, accessible and fast interfaces, with a focus on experience and detail.', skills: SKILLS.frontend },
      { title: 'Applied AI & Data', category: 'ai-data', description: 'Useful LLM integration, agents with a structured runtime and actionable data analysis.', skills: SKILLS.ai },
      { title: 'Infra & Deployment', category: 'infra', description: 'Getting code to production and keeping it alive: containers, payments, domains and CI/CD.', skills: SKILLS.infra },
    ],
    socials: SOCIALS,
    contactNote: 'I reply fast. If you have a project, a role or an idea you want to take to production, drop me a line.',
  },
};

/* ------------------------------- Español ------------------------------- */
const es: SiteContent = {
  nav: { about: 'Sobre mí', projects: 'Proyectos', skills: 'Stack', contact: 'Contacto', cta: 'Hablemos' },
  brandRole: 'Software Engineer · Full-Stack',
  a11y: { menu: 'Abrir menú', backToTop: 'Volver arriba', language: 'Idioma' },
  hero: {
    availability: 'Disponible · remoto / Guadalajara',
    roleLine: 'Software Engineer — Full-Stack',
    ctaProjects: 'Ver proyectos',
    scroll: 'Scroll',
    signals: [
      { k: 'En producción', v: 'orux.space · cpp-ceti.vercel.app' },
      { k: 'Foco', v: 'Tiempo real · IA aplicada · Pagos' },
      { k: 'Forma de construir', v: 'Por capas, con tests desde el commit 1' },
    ],
  },
  sections: {
    about: {
      eyebrow: 'Sobre mí',
      title: 'Ingeniero que cierra el ciclo completo',
      description: 'Diseño la arquitectura, escribo el código probado y opero la infraestructura que lo mantiene vivo en producción.',
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Productos reales, en producción',
      description: 'No son demos: son sistemas completos que diseñé, construí y desplegué — con usuarios, pagos y tests que los respaldan.',
    },
    skills: {
      eyebrow: 'Stack',
      title: 'Las herramientas con las que construyo',
      description: 'Un stack que cubre todo el camino — del primer endpoint al dominio en producción con TLS automático.',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Construyamos algo que llegue a producción',
      description: 'Roles full-time, freelance o una idea que quieras volver real — el primer mensaje es el más fácil.',
    },
  },
  about: {
    pillars: [
      { title: 'De punta a punta', description: 'Backend, frontend, base de datos, pagos e infraestructura. Cierro el ciclo completo hasta producción.' },
      { title: 'Tiempo real & escala', description: 'Sincronización por WebSocket, presencia, ownership y prevención de colisiones sobre estado compartido.' },
      { title: 'IA aplicada con criterio', description: 'Agentes con runtime estructurado y LLMs integrados donde aportan valor — no por moda.' },
    ],
    nowLabel: 'Ahora mismo',
    nowText: 'Operando Orux en producción y abierto a nuevos retos.',
  },
  projectsUi: { featured: 'Proyecto destacado', visit: 'Visitar', code: 'Código', viewCode: 'Ver código', privateRepo: 'Repo privado' },
  status: { live: 'En vivo', openSource: 'Open source', building: 'En construcción' },
  contactUi: { heading: '¿Hablamos?', ctaEmail: 'Escríbeme', cta2: 'GitHub', noteLabel: 'Nota' },
  footer: { builtWith: 'Construido con React, Vite, Tailwind & Framer Motion' },
  portfolio: {
    name: NAME,
    shortName: SHORT,
    role: 'Software Engineer · Full-Stack · IA · Sistemas en tiempo real',
    roles: ['Full-Stack Software Engineer', 'Sistemas en tiempo real', 'IA aplicada a producto', 'Backend · Infra · Pagos'],
    pitch: 'Construyo y despliego productos SaaS de punta a punta: del backend en tiempo real y la IA aplicada hasta el frontend, los pagos y la infraestructura en producción.',
    summary: 'Ingeniero de software enfocado en llevar ideas a producción de verdad. Diseño arquitectura sólida, escribo código probado y opero la infraestructura que lo sostiene — APIs, sincronización en tiempo real, agentes de IA, pasarelas de pago y despliegues que aguantan usuarios reales.',
    availability: 'Disponible para roles full-time y colaboraciones',
    highlights: ['SaaS de punta a punta', 'Sistemas en tiempo real', 'IA aplicada', 'Infra & despliegue'],
    stats: [
      { value: 3, label: 'Productos full-stack construidos' },
      { value: 478, suffix: '+', label: 'Tests automatizados en Orux' },
      { value: 33, label: 'Capas de arquitectura iterativa' },
      { value: 4, label: 'Lenguajes con análisis semántico' },
    ],
    about: [
      'Soy ingeniero de software full-stack: me siento igual de cómodo modelando una base de datos, sincronizando estado por WebSocket, integrando un LLM o sacando un certificado TLS en un VPS. Lo que me mueve es cerrar el ciclo completo — que una idea termine corriendo, probada y en manos de usuarios.',
      'Mi forma de trabajar es por capas, con tests desde el primer commit y decisiones de arquitectura que se sostienen. Orux, mi proyecto más ambicioso, se construyó así: 33 capas, 478 tests en backend y un producto multi-equipo desplegado en producción con pagos por Stripe.',
    ],
    marquee: MARQUEE,
    projects: [
      {
        name: 'Orux',
        tagline: 'Editor colaborativo en tiempo real, sobre Git',
        description: 'Una capa de coordinación para equipos que programan rápido sin pisarse. Cada equipo trabaja en un workspace aislado (un repo Git real) con presencia por archivo y línea, ownership invisible con edición tentativa y aprobación de un clic, prevención de colisiones y análisis de impacto semántico multi-lenguaje. Integra Git desde la web, login con OAuth de GitHub, panel de operador y un modelo freemium cobrado por Stripe. Construido por capas, con tests desde el primer commit.',
        technologies: TECH.orux,
        metrics: [
          { label: 'Tests backend', value: '478' },
          { label: 'Capas', value: '33' },
          { label: 'Lenguajes analizados', value: '4' },
        ],
        accent: 'cyan',
        status: 'live',
        year: '2026',
        domain: 'orux.space',
        liveUrl: 'https://orux.space',
        repoPrivate: true,
        featured: true,
      },
      {
        name: 'Studymation',
        tagline: 'Generador de documentos académicos con IA',
        description: 'SaaS que guía al estudiante por un flujo conversacional, extrae los datos del trabajo y produce un .docx formateado con citas académicas verificadas (Semantic Scholar y Crossref). Monetización con suscripciones y créditos de prepago vía Stripe, abstracción multi-proveedor de LLM, OAuth de Google y almacenamiento en DigitalOcean Spaces.',
        technologies: TECH.studymation,
        metrics: [
          { label: 'Backend', value: 'FastAPI' },
          { label: 'Pagos', value: 'Stripe' },
          { label: 'Citas', value: 'Verificadas' },
        ],
        accent: 'violet',
        status: 'open-source',
        year: '2026',
        githubUrl: 'https://github.com/CesarManzoCode/Studymation',
      },
      {
        name: 'cpp-ceti',
        tagline: 'Plataforma interactiva para aprender C++',
        description: 'Plataforma para estudiantes del CETI Guadalajara con filosofía 90% práctica, 10% teoría: lecciones cortas, editor Monaco en el navegador y tests automáticos que ejecutan tu código C++ con Judge0. Incluye retos con casos de prueba, quizzes, seguimiento de progreso con XP y autenticación con Better Auth + Google.',
        technologies: TECH.cpp,
        metrics: [
          { label: 'Editor', value: 'Monaco' },
          { label: 'Ejecución', value: 'Judge0' },
          { label: 'Hosting', value: 'Vercel' },
        ],
        accent: 'emerald',
        status: 'live',
        year: '2026',
        domain: 'cpp-ceti.vercel.app',
        liveUrl: 'https://cpp-ceti.vercel.app',
        githubUrl: 'https://github.com/CesarManzoCode/cpp-ceti',
      },
      {
        name: 'Sentinel Agent',
        tagline: 'Agente de IA local-first para la terminal',
        description: 'Capa de control entre la intención del usuario y la ejecución de acciones en el sistema. Implementa un runtime estructurado (planning → execution → reflection → response) con un policy engine que evalúa riesgos, permisos y aprobaciones antes de ejecutar herramientas — priorizando seguridad, observabilidad y control de efectos secundarios.',
        technologies: TECH.sentinel,
        metrics: [
          { label: 'Enfoque', value: 'Local-first' },
          { label: 'Runtime', value: 'Plan → Exec' },
          { label: 'Control', value: 'Policy engine' },
        ],
        accent: 'amber',
        status: 'open-source',
        year: '2026',
        githubUrl: 'https://github.com/CesarManzoCode/sentinel-agent',
      },
    ],
    skillGroups: [
      { title: 'Backend & Tiempo real', category: 'backend', description: 'Arquitectura de servicios, APIs, sincronización en tiempo real y lógica de negocio probada.', skills: SKILLS.backend },
      { title: 'Frontend & Producto', category: 'frontend', description: 'Interfaces modernas, accesibles y rápidas, con foco en la experiencia y el detalle.', skills: SKILLS.frontend },
      { title: 'IA aplicada & Data', category: 'ai-data', description: 'Integración útil de LLMs, agentes con runtime estructurado y análisis de datos accionable.', skills: SKILLS.ai },
      { title: 'Infra & Despliegue', category: 'infra', description: 'Llevar el código a producción y mantenerlo vivo: contenedores, pagos, dominios y CI/CD.', skills: SKILLS.infra },
    ],
    socials: SOCIALS,
    contactNote: 'Respondo rápido. Si tienes un proyecto, un rol o una idea que quieras llevar a producción, escríbeme.',
  },
};

export const content: Record<Lang, SiteContent> = { en, es };
