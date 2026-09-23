import type { Depth, Lang, StatusTone } from '../data/projects';
import type { SectionKind } from '../data/technical';

export type { Lang };

/* -------------------------------------------------------------------- *
 * Interface copy only. Project content lives in src/data/.
 * -------------------------------------------------------------------- */

export type Link = { label: string; href: string };

export type SiteContent = {
  nav: { home: string; projects: string; technical: string; about: string; github: string; primary: string };
  a11y: { language: string; skip: string; swipe: string; openInNew: string };
  meta: {
    title: string;
    description: string;
    projects: string;
    technical: string;
    about: string;
    notFound: string;
  };

  home: {
    role: string;
    place: string;
    headline: string;
    lead: string;
    available: string;
    selectedLabel: string;
    selectedNote: string;
    projectCta: string;
    technicalCta: string;
    beyondLabel: string;
    beyondTitle: string;
    beyondBody: string;
    beyondCta: string;
    techLabel: string;
    techTitle: string;
    techBody: string;
    techCta: string;
    techSample: string;
  };

  projects: {
    eyebrow: string;
    title: string;
    lede: string;
    count: (n: number, c: number) => string;
    jump: string;
    technical: string;
    open: string;
    privateRepo: string;
  };

  project: {
    back: string;
    why: string;
    what: string;
    status: string;
    links: string;
    toTechnical: string;
    technicalHint: string;
    noTechnical: string;
    captureNote: string;
  };

  technical: {
    eyebrow: string;
    title: string;
    lede: string;
    rules: string[];
    caveat: string;
    read: string;
    back: string;
    sources: string;
    toProject: string;
    privateSources: string;
    contents: string;
  };

  depth: Record<Depth, { name: string; one: string; blurb: string }>;
  tone: Record<StatusTone, string>;
  section: Record<SectionKind, string>;

  method: {
    eyebrow: string;
    title: string;
    lede: string;
    loopLabel: string;
    loop: { step: string; title: string; body: string }[];
    loopNote: string;
    endsLabel: string;
    ends: string;
  };

  about: {
    eyebrow: string;
    title: string;
    body: string[];
    practiceLabel: string;
    practice: { area: string; detail: string }[];
  };

  contact: {
    eyebrow: string;
    title: string;
    body: string;
    email: string;
    channels: Link[];
    place: string;
  };

  notFound: { title: string; body: string; home: string };

  footer: { built: string; rights: string };
};

const EMAIL = 'cesarmanzocode@gmail.com';
export const GITHUB = 'https://github.com/CesarManzoCode';
const LINKEDIN = 'https://www.linkedin.com/in/c%C3%A9sar-alberto-manzo-olivares-b503383b8/';

/* ==================================================================== *
 * English
 * ==================================================================== */
const en: SiteContent = {
  nav: { home: 'Home', projects: 'Projects', technical: 'Technical', about: 'About', github: 'GitHub', primary: 'Primary' },
  a11y: {
    language: 'Language',
    skip: 'Skip to content',
    swipe: 'Swipe the image to see all of it',
    openInNew: 'opens in a new tab',
  },
  meta: {
    title: 'César Manzo — Software Engineer',
    description:
      'Software engineer in Guadalajara, México. An experimental operating system, business software built on real data, a learn-to-code platform, realtime collaboration over Git and compatibility verification — with the evidence behind each.',
    projects: 'Projects — César Manzo',
    technical: 'Technical — César Manzo',
    about: 'About — César Manzo',
    notFound: 'Not found — César Manzo',
  },

  home: {
    role: 'Software engineer',
    place: 'Guadalajara, México',
    headline: 'I build systems, and I finish them.',
    lead: 'An operating system where the AI can only propose. The catalogue, pricing and invoicing a hardware store runs on. A platform where students learn to program by writing real code. Different problems, one habit: build all of it, then check it against the real thing — real hardware, real data, the real service.',
    available: 'Open to new work — remote or in Guadalajara.',
    selectedLabel: 'Five projects',
    selectedNote: 'Chosen to show range — not the five most complex.',
    projectCta: 'Project',
    technicalCta: 'Technical',
    beyondLabel: 'All projects',
    beyondTitle: 'Beyond these five',
    beyondBody:
      'A capability microkernel measured against Linux, a Supabase-compatible backend runtime, a research program in compilers, an AI assistant that asks before it acts, and more — grouped by what they are, not when they were built.',
    beyondCta: 'Browse projects',
    techLabel: 'For technical readers',
    techTitle: 'The engineering, with its limits',
    techBody:
      'Architecture, invariants, trust boundaries, measurements, failures and what is not proven — kept separate from the project pages, so each can be read at its own depth.',
    techCta: 'Open the technical layer',
    techSample: 'Thalyx on real hardware: 156 proven · 2 not proven · 0 failed',
  },

  projects: {
    eyebrow: 'Projects',
    title: 'Everything worth your time, by kind',
    lede: 'Grouped by what each project is. Larger entries carry more evidence; small ones are kept small on purpose.',
    count: (n, c) => `${n} projects · ${c} categories`,
    jump: 'Jump to category',
    technical: 'Technical',
    open: 'Read more',
    privateRepo: 'Private repository',
  },

  project: {
    back: 'All projects',
    why: 'Why it exists',
    what: 'What it does',
    status: 'Status',
    links: 'Links',
    toTechnical: 'Read the technical',
    technicalHint: 'Architecture, measurements, failures and what is not proven.',
    noTechnical: 'No separate technical page for this project.',
    captureNote: 'Captures are real screens from the project, not mock-ups.',
  },

  technical: {
    eyebrow: 'Technical',
    title: 'Engineering evidence',
    lede: 'For interviewers and anyone who wants to check. Each entry states what is built, what must always hold, what was measured, what broke — and what is not proven.',
    rules: [
      'Numbers come from the project’s own repository or documentation.',
      '“Not proven” means not proven. A check that could not run is not counted as a pass.',
      'A section only appears when there is evidence for it.',
    ],
    caveat: 'Main limitation',
    read: 'Read',
    back: 'Technical index',
    sources: 'Sources',
    toProject: 'Project overview',
    privateSources: 'The repository is private; this summary is written from its current documentation. No code, keys or private data are reproduced.',
    contents: 'On this page',
  },

  depth: {
    deep: { name: 'Deep dives', one: 'Deep dive', blurb: 'Full engineering write-ups.' },
    breakdown: { name: 'Technical breakdowns', one: 'Breakdown', blurb: 'The architecture and the decisions that matter.' },
    research: { name: 'Research notes', one: 'Research note', blurb: 'Programs whose claims are not yet tested.' },
    note: { name: 'Short notes', one: 'Short note', blurb: 'Small projects, stated briefly.' },
  },

  tone: {
    active: 'Active',
    complete: 'Complete',
    archived: 'Archived',
    research: 'Research',
  },

  section: {
    architecture: 'Architecture',
    invariants: 'Invariants',
    trust: 'Trust boundaries',
    evidence: 'Evidence',
    measurements: 'Measurements',
    experiments: 'Experiments',
    failures: 'Failures',
    limitations: 'Limitations',
    notProven: 'What is not proven',
    nonClaims: 'What it does not claim',
    reproduce: 'Reproduce',
  },

  method: {
    eyebrow: 'How I work',
    title: 'The same loop, every time.',
    lede: 'An operating system and a hardware store’s catalogue have nothing in common except how they were made: fix the constraints, build against them, then find out what the machine actually does. The stack changes with the problem. The loop is what carries over.',
    loopLabel: 'The loop',
    loop: [
      { step: '01', title: 'Frame', body: 'What the system has to do, what it must never do, and what it has to survive. Most of the design is settled here.' },
      { step: '02', title: 'Build', body: 'The fastest route to something standing up: code I write, a library that already solved it, a coding agent working from the constraints above.' },
      { step: '03', title: 'Inspect', body: 'Read what came out against what was asked for — the diff, the schema, the boundary, the failure paths.' },
      { step: '04', title: 'Test', body: 'Types, static analysis, unit and integration tests, and fault injection wherever the wrong moment would matter.' },
      { step: '05', title: 'Run', body: 'Against the thing that decides: real hardware, a real dataset, the real service, somebody at a counter with a customer waiting.' },
      { step: '06', title: 'Correct', body: 'What came back wrong goes in as a new constraint. Publishing what is still unproven is part of this, not an appendix to it.' },
    ],
    loopNote: '06 → 01 · on a commit, on a feature, on a whole system.',
    endsLabel: 'Where it ends',
    ends: 'An implementation can come from anywhere. Whether it is correct gets settled somewhere else — by the compiler, by the test, by the invariant Postgres refuses to break, by a board that either boots or does not. None of it negotiates, which is what makes it worth building against.',
  },

  about: {
    eyebrow: 'About',
    title: 'Who is building this',
    body: [
      'I’m César Manzo, a software engineer in Guadalajara, México. I gravitate to the part most projects skip: taking something from an idea to a thing that runs, survives being killed at the wrong moment, and can be checked by somebody who has no reason to trust me.',
      'That is why the projects here look nothing like each other. An operating system, a kernel, business software, teaching platforms and verification tools share no stack. What they share is the loop below, and the range it demands: schema, service, interface, deployment, and the evidence that each part does what it says.',
    ],
    practiceLabel: 'Where that work happens',
    practice: [
      { area: 'Systems', detail: 'Rust, Linux, BPF, kernels, sandboxing, signed artifacts.' },
      { area: 'Backend', detail: 'TypeScript and Python services, PostgreSQL and SQLite, schema and migrations.' },
      { area: 'Real time', detail: 'WebSocket state, presence, ownership, preventing collisions on shared state.' },
      { area: 'Product & interface', detail: 'React, Next.js, accessibility, and design that comes from the content.' },
      { area: 'Verification', detail: 'Differential testing, property and mutation testing, fault injection, reproducible artifacts.' },
      { area: 'AI systems', detail: 'Agents with explicit trust boundaries, local models, cost-aware routing.' },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    body: 'Email is the fastest way to reach me — about a role, a project, or anything here you want to ask about. I answer.',
    email: EMAIL,
    channels: [
      { label: 'GitHub', href: GITHUB },
      { label: 'LinkedIn', href: LINKEDIN },
    ],
    place: 'Guadalajara, Jalisco, México · available remotely',
  },

  notFound: { title: 'Nothing here', body: 'That page does not exist. It may have moved when the site was reorganised.', home: 'Go home' },

  footer: {
    built: 'Built with React, Vite and Tailwind. Type: Instrument Serif, Inter, JetBrains Mono.',
    rights: 'César Alberto Manzo Olivares',
  },
};

/* ==================================================================== *
 * Español
 * ==================================================================== */
const es: SiteContent = {
  nav: { home: 'Inicio', projects: 'Proyectos', technical: 'Técnico', about: 'Sobre mí', github: 'GitHub', primary: 'Principal' },
  a11y: {
    language: 'Idioma',
    skip: 'Saltar al contenido',
    swipe: 'Desliza la imagen para verla completa',
    openInNew: 'se abre en una pestaña nueva',
  },
  meta: {
    title: 'César Manzo — Ingeniero de software',
    description:
      'Ingeniero de software en Guadalajara, México. Un sistema operativo experimental, software de negocio construido sobre datos reales, una plataforma para aprender a programar, colaboración en tiempo real sobre Git y verificación de compatibilidad — con la evidencia detrás de cada uno.',
    projects: 'Proyectos — César Manzo',
    technical: 'Técnico — César Manzo',
    about: 'Sobre mí — César Manzo',
    notFound: 'No encontrado — César Manzo',
  },

  home: {
    role: 'Ingeniero de software',
    place: 'Guadalajara, México',
    headline: 'Construyo sistemas, y los termino.',
    lead: 'Un sistema operativo donde la IA solo puede proponer. El catálogo, los precios y la facturación con los que trabaja una ferretería. Una plataforma donde los estudiantes aprenden a programar escribiendo código real. Problemas distintos, una misma costumbre: construirlo entero y después comprobarlo contra lo real — hardware real, datos reales, el servicio real.',
    available: 'Abierto a nuevos proyectos — en remoto o en Guadalajara.',
    selectedLabel: 'Cinco proyectos',
    selectedNote: 'Elegidos para mostrar amplitud — no son los cinco más complejos.',
    projectCta: 'Proyecto',
    technicalCta: 'Técnico',
    beyondLabel: 'Todos los proyectos',
    beyondTitle: 'Más allá de estos cinco',
    beyondBody:
      'Un microkernel de capacidades medido contra Linux, un runtime de backend compatible con Supabase, un programa de investigación en compiladores, un asistente de IA que pregunta antes de actuar, y más — agrupados por lo que son, no por cuándo se hicieron.',
    beyondCta: 'Ver proyectos',
    techLabel: 'Para lectores técnicos',
    techTitle: 'La ingeniería, con sus límites',
    techBody:
      'Arquitectura, invariantes, fronteras de confianza, mediciones, fallos y lo que no está probado — separado de las páginas de proyecto, para que cada una se lea a su propia profundidad.',
    techCta: 'Abrir la capa técnica',
    techSample: 'Thalyx en hardware real: 156 probados · 2 no probados · 0 fallidos',
  },

  projects: {
    eyebrow: 'Proyectos',
    title: 'Todo lo que vale tu tiempo, por tipo',
    lede: 'Agrupados por lo que es cada proyecto. Las entradas grandes llevan más evidencia; las pequeñas se quedan pequeñas a propósito.',
    count: (n, c) => `${n} proyectos · ${c} categorías`,
    jump: 'Ir a la categoría',
    technical: 'Técnico',
    open: 'Leer más',
    privateRepo: 'Repositorio privado',
  },

  project: {
    back: 'Todos los proyectos',
    why: 'Por qué existe',
    what: 'Qué hace',
    status: 'Estado',
    links: 'Enlaces',
    toTechnical: 'Leer la parte técnica',
    technicalHint: 'Arquitectura, mediciones, fallos y lo que no está probado.',
    noTechnical: 'Este proyecto no tiene una página técnica aparte.',
    captureNote: 'Las capturas son pantallas reales del proyecto, no maquetas.',
  },

  technical: {
    eyebrow: 'Técnico',
    title: 'Evidencia de ingeniería',
    lede: 'Para entrevistadores y para quien quiera comprobar. Cada entrada dice qué está construido, qué tiene que cumplirse siempre, qué se midió, qué se rompió — y qué no está probado.',
    rules: [
      'Los números salen del propio repositorio o la documentación del proyecto.',
      '«No probado» significa no probado. Una comprobación que no pudo correr no cuenta como aprobada.',
      'Una sección solo aparece cuando hay evidencia para ella.',
    ],
    caveat: 'Limitación principal',
    read: 'Leer',
    back: 'Índice técnico',
    sources: 'Fuentes',
    toProject: 'Resumen del proyecto',
    privateSources: 'El repositorio es privado; este resumen está escrito a partir de su documentación actual. No se reproduce código, llaves ni datos privados.',
    contents: 'En esta página',
  },

  depth: {
    deep: { name: 'Análisis a fondo', one: 'Análisis a fondo', blurb: 'Documentos de ingeniería completos.' },
    breakdown: { name: 'Desgloses técnicos', one: 'Desglose', blurb: 'La arquitectura y las decisiones que importan.' },
    research: { name: 'Notas de investigación', one: 'Nota de investigación', blurb: 'Programas cuyos claims todavía no se han probado.' },
    note: { name: 'Notas breves', one: 'Nota breve', blurb: 'Proyectos pequeños, dichos en corto.' },
  },

  tone: {
    active: 'Activo',
    complete: 'Terminado',
    archived: 'Archivado',
    research: 'Investigación',
  },

  section: {
    architecture: 'Arquitectura',
    invariants: 'Invariantes',
    trust: 'Fronteras de confianza',
    evidence: 'Evidencia',
    measurements: 'Mediciones',
    experiments: 'Experimentos',
    failures: 'Fallos',
    limitations: 'Limitaciones',
    notProven: 'Lo que no está probado',
    nonClaims: 'Lo que no afirma',
    reproduce: 'Reproducir',
  },

  method: {
    eyebrow: 'Cómo trabajo',
    title: 'El mismo ciclo, cada vez.',
    lede: 'Un sistema operativo y el catálogo de una ferretería no comparten nada, salvo la forma en que se hicieron: fijar las restricciones, construir contra ellas y después averiguar qué hace la máquina de verdad. El stack cambia con el problema. El ciclo es lo que se traslada.',
    loopLabel: 'El ciclo',
    loop: [
      { step: '01', title: 'Definir', body: 'Qué tiene que hacer el sistema, qué no puede hacer nunca y a qué tiene que sobrevivir. Casi todo el diseño se decide aquí.' },
      { step: '02', title: 'Construir', body: 'La vía más rápida a algo que se sostenga: código que escribo, una librería que ya lo resolvió, un agente de código trabajando contra las restricciones de arriba.' },
      { step: '03', title: 'Inspeccionar', body: 'Leer lo que salió contra lo que se pedía: el diff, el esquema, la frontera, los caminos de fallo.' },
      { step: '04', title: 'Probar', body: 'Tipos, análisis estático, pruebas unitarias y de integración, e inyección de fallos donde el peor momento importe.' },
      { step: '05', title: 'Ejecutar', body: 'Contra lo que decide: hardware real, datos reales, el servicio real, alguien en un mostrador con un cliente esperando.' },
      { step: '06', title: 'Corregir', body: 'Lo que volvió mal entra como restricción nueva. Publicar lo que todavía no está probado es parte de esto, no un apéndice.' },
    ],
    loopNote: '06 → 01 · en un commit, en una función, en un sistema entero.',
    endsLabel: 'Dónde termina',
    ends: 'Una implementación puede venir de donde sea. Si es correcta se decide en otro lado: en el compilador, en la prueba, en la invariante que PostgreSQL se niega a romper, en una placa que arranca o no. Nada de eso negocia, y por eso vale la pena construir contra ello.',
  },

  about: {
    eyebrow: 'Sobre mí',
    title: 'Quién construye esto',
    body: [
      'Soy César Manzo, ingeniero de software en Guadalajara, México. Me atrae la parte que casi todos los proyectos se saltan: llevar algo de idea a cosa que corre, que sobrevive a que la maten en el peor momento y que alguien sin motivos para confiar en mí puede comprobar.',
      'Por eso los proyectos de aquí no se parecen entre sí. Un sistema operativo, un kernel, software de negocio, plataformas educativas y herramientas de verificación no comparten stack. Lo que comparten es el ciclo de abajo y el alcance que exige: esquema, servicio, interfaz, despliegue, y la evidencia de que cada parte hace lo que dice.',
    ],
    practiceLabel: 'Dónde ocurre ese trabajo',
    practice: [
      { area: 'Sistemas', detail: 'Rust, Linux, BPF, kernels, aislamiento, artefactos firmados.' },
      { area: 'Backend', detail: 'Servicios en TypeScript y Python, PostgreSQL y SQLite, esquema y migraciones.' },
      { area: 'Tiempo real', detail: 'Estado por WebSocket, presencia, ownership, evitar colisiones sobre estado compartido.' },
      { area: 'Producto e interfaz', detail: 'React, Next.js, accesibilidad y diseño que sale del contenido.' },
      { area: 'Verificación', detail: 'Pruebas diferenciales, de propiedades y de mutación, inyección de fallos, artefactos reproducibles.' },
      { area: 'Sistemas de IA', detail: 'Agentes con fronteras de confianza explícitas, modelos locales, enrutamiento consciente del costo.' },
    ],
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Hablemos',
    body: 'El correo es la vía más rápida — por un puesto, un proyecto o algo de aquí que quieras preguntar. Contesto.',
    email: EMAIL,
    channels: [
      { label: 'GitHub', href: GITHUB },
      { label: 'LinkedIn', href: LINKEDIN },
    ],
    place: 'Guadalajara, Jalisco, México · disponible en remoto',
  },

  notFound: { title: 'Aquí no hay nada', body: 'Esa página no existe. Puede que se haya movido al reorganizar el sitio.', home: 'Ir al inicio' },

  footer: {
    built: 'Hecho con React, Vite y Tailwind. Tipografías: Instrument Serif, Inter, JetBrains Mono.',
    rights: 'César Alberto Manzo Olivares',
  },
};

export const content: Record<Lang, SiteContent> = { en, es };
