import type { Depth, Lang, StatusTone } from '../data/projects';
import type { SectionKind } from '../data/technical';

export type { Lang };

/* -------------------------------------------------------------------- *
 * Interface copy only. Project content lives in src/data/.
 * -------------------------------------------------------------------- */

export type Link = { label: string; href: string };

export type SiteContent = {
  nav: { work: string; index: string; ledger: string; about: string; github: string; primary: string; menu: string; close: string };
  a11y: { language: string; skip: string; swipe: string; openInNew: string; rooms: string };
  meta: { title: string; description: string; index: string; ledger: string; about: string; notFound: string };

  home: {
    who: string;
    headline: string[];
    lead: string;
    available: string;
    ctaWork: string;
    ctaLedger: string;
    atlasLabel: string;
    atlasNote: string;
    open: string;
    record: string;
    moreLabel: string;
    moreTitle: string;
    moreBody: string;
    allWork: string;
    verification: string;
    verificationBody: string;
    storyboard: { step: string; title: string }[];
    findings: string;
    evidenceModel: string;
  };

  index: { eyebrow: string; title: string; lede: string; count: (n: number, c: number) => string; privateRepo: string; open: string };

  project: {
    back: string;
    why: string;
    how: string;
    gallery: string;
    captureNote: string;
    record: string;
    recordLede: string;
    recordMissing: string;
    caveat: string;
    contents: string;
    sources: string;
    privateSources: string;
    next: string;
    links: string;
  };

  ledger: {
    eyebrow: string;
    title: string;
    lede: string;
    rules: string[];
    cols: { project: string; proven: string; limit: string; depth: string };
    read: string;
  };

  depth: Record<Depth, { name: string; one: string }>;
  tone: Record<StatusTone, string>;
  section: Record<SectionKind, string>;

  method: {
    eyebrow: string;
    title: string;
    lede: string;
    loop: { step: string; title: string; body: string }[];
    ends: string;
  };

  about: {
    eyebrow: string;
    title: string;
    body: string[];
    practiceLabel: string;
    practice: { area: string; detail: string }[];
  };

  contact: { eyebrow: string; title: string; body: string; email: string; channels: Link[]; place: string };
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
  nav: { work: 'Work', index: 'Index', ledger: 'Evidence', about: 'About', github: 'GitHub', primary: 'Primary', menu: 'Menu', close: 'Close' },
  a11y: {
    language: 'Language',
    skip: 'Skip to content',
    swipe: 'Swipe the image to see all of it',
    openInNew: 'opens in a new tab',
    rooms: 'Projects on this page',
  },
  meta: {
    title: 'César Manzo — Software Engineer',
    description:
      'Software engineer in Guadalajara, México. An operating system booted on real hardware, a kernel written from scratch and measured against Linux, the software a hardware store runs on, a platform where students learn to program — each with its evidence and its limits.',
    index: 'Index of work — César Manzo',
    ledger: 'Evidence ledger — César Manzo',
    about: 'About — César Manzo',
    notFound: 'Not found — César Manzo',
  },

  home: {
    who: 'César Manzo · Software engineer · Guadalajara, México',
    headline: ['From a kernel written from scratch', 'to the counter of a hardware store.'],
    lead: 'I build complete systems — operating systems, backends, business software, learning platforms — and then check them against the thing that decides: real hardware, a real catalogue, a real student. What passed is shown below. What has not been proven yet is published too.',
    available: 'Open to new work — remote or in Guadalajara.',
    ctaWork: 'See the work',
    ctaLedger: 'Evidence ledger',
    atlasLabel: 'Real captures, real output',
    atlasNote: 'Every screen here is a capture from the project itself, or a chart drawn from its own evidence files. Nothing is a mock-up.',
    open: 'Open the project',
    record: 'Engineering record',
    moreLabel: 'Also built',
    moreTitle: 'Smaller rooms, same standard.',
    moreBody: 'An exam-prep engine, a document pipeline that refuses to invent citations, an assistant that asks before it acts, a research program written to be proven wrong, and the machine I work on.',
    allWork: 'Index of all work',
    verification: 'Checking claims against real systems',
    verificationBody: '“Compatible” is a claim, not a guarantee. These two projects turn it into something that can be run: one compares a product against the real service, the other only calls something supported once a real test proves it.',
    storyboard: [
      { step: '01', title: 'Kai types into a file Ana owns. Nothing blocks him — it becomes a proposal.' },
      { step: '02', title: 'Ana gets a diff: approve or reject in one click.' },
      { step: '03', title: 'Whoever depends on the changed function is warned — before anything breaks.' },
    ],
    findings: 'What it found',
    evidenceModel: 'Every public claim carries the full chain',
  },

  index: {
    eyebrow: 'Index',
    title: 'Everything, by what it is.',
    lede: 'Operating systems and business software do not belong in the same visual drawer — so each project keeps its own colours, taken from its own screens.',
    count: (n, c) => `${n} projects · ${c} kinds`,
    privateRepo: 'Private repository',
    open: 'Open',
  },

  project: {
    back: 'Index',
    why: 'Why it exists',
    how: 'How it works',
    gallery: 'Captures',
    captureNote: 'Real screens and diagrams from the project’s repository — not mock-ups.',
    record: 'Engineering record',
    recordLede: 'For interviewers and anyone who wants to check: how it is built, what must always hold, what was measured, what broke — and what is not proven.',
    recordMissing: '',
    caveat: 'Main limitation',
    contents: 'In this record',
    sources: 'Sources',
    privateSources: 'The repository is private; this record is written from its current documentation. No code, keys or private data are reproduced.',
    next: 'Next project',
    links: 'Links',
  },

  ledger: {
    eyebrow: 'Evidence ledger',
    title: 'What is proven. What is not.',
    lede: 'Every project on one sheet: the strongest measured result next to the most important limitation. Open any row for its full engineering record.',
    rules: [
      'Numbers are copied from the project’s own repository or documentation.',
      '“Not proven” means not proven: a check that could not run is never counted as a pass.',
      'A section of a record only exists when there is evidence for it.',
    ],
    cols: { project: 'Project', proven: 'Measured / verified', limit: 'Main limitation', depth: 'Record' },
    read: 'Read',
  },

  depth: {
    deep: { name: 'Deep dives', one: 'Deep dive' },
    breakdown: { name: 'Technical breakdowns', one: 'Breakdown' },
    research: { name: 'Research notes', one: 'Research note' },
    note: { name: 'Short notes', one: 'Short note' },
  },

  tone: { active: 'Active', complete: 'Complete', archived: 'Archived', research: 'Research' },

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
    eyebrow: 'How it gets made',
    title: 'The same loop, every time.',
    lede: 'An operating system and a hardware store’s catalogue have nothing in common except how they were made. The stack changes with the problem; the loop carries over.',
    loop: [
      { step: '01', title: 'Frame', body: 'What it has to do, what it must never do, what it has to survive.' },
      { step: '02', title: 'Build', body: 'The fastest route to something standing: my code, a library, or a coding agent working inside those constraints.' },
      { step: '03', title: 'Inspect', body: 'Read what came out against what was asked — the diff, the schema, the boundary, the failure paths.' },
      { step: '04', title: 'Test', body: 'Types, static analysis, unit and integration tests, fault injection where the wrong moment matters.' },
      { step: '05', title: 'Run', body: 'Against what decides: real hardware, a real dataset, the real service, a customer at the counter.' },
      { step: '06', title: 'Correct', body: 'What came back wrong becomes a constraint. Publishing what is still unproven is part of the loop.' },
    ],
    ends: 'An implementation can come from anywhere. Whether it is correct is settled elsewhere — by the compiler, the test, the invariant Postgres refuses to break, a board that either boots or does not.',
  },

  about: {
    eyebrow: 'About',
    title: 'Who is building this',
    body: [
      'I’m César Manzo, a software engineer in Guadalajara, México. I gravitate to the part most projects skip: taking something from an idea to a thing that runs, survives being killed at the wrong moment, and can be checked by somebody who has no reason to trust me.',
      'That is why the projects here look nothing like each other. An operating system, a kernel, business software, teaching platforms and verification tools share no stack. What they share is the loop, and the range it demands: schema, service, interface, deployment, and the evidence that each part does what it says.',
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
    title: 'Let’s talk.',
    body: 'Email is the fastest way to reach me — about a role, a project, or anything here you want to ask about. I answer.',
    email: EMAIL,
    channels: [
      { label: 'GitHub', href: GITHUB },
      { label: 'LinkedIn', href: LINKEDIN },
    ],
    place: 'Guadalajara, Jalisco, México · available remotely',
  },

  notFound: { title: 'Nothing here.', body: 'That page does not exist. It may have moved when the site was rebuilt.', home: 'Go to the work' },

  footer: {
    built: 'Built with React, Vite and Tailwind. Type: Archivo and JetBrains Mono. Every capture is real.',
    rights: 'César Alberto Manzo Olivares',
  },
};

/* ==================================================================== *
 * Español
 * ==================================================================== */
const es: SiteContent = {
  nav: { work: 'Trabajo', index: 'Índice', ledger: 'Evidencia', about: 'Sobre mí', github: 'GitHub', primary: 'Principal', menu: 'Menú', close: 'Cerrar' },
  a11y: {
    language: 'Idioma',
    skip: 'Saltar al contenido',
    swipe: 'Desliza la imagen para verla completa',
    openInNew: 'se abre en una pestaña nueva',
    rooms: 'Proyectos en esta página',
  },
  meta: {
    title: 'César Manzo — Ingeniero de software',
    description:
      'Ingeniero de software en Guadalajara, México. Un sistema operativo arrancado en hardware real, un kernel escrito desde cero y medido contra Linux, el software con el que trabaja una ferretería, una plataforma donde los estudiantes aprenden a programar — cada uno con su evidencia y sus límites.',
    index: 'Índice del trabajo — César Manzo',
    ledger: 'Libro de evidencia — César Manzo',
    about: 'Sobre mí — César Manzo',
    notFound: 'No encontrado — César Manzo',
  },

  home: {
    who: 'César Manzo · Ingeniero de software · Guadalajara, México',
    headline: ['De un kernel escrito desde cero', 'al mostrador de una ferretería.'],
    lead: 'Construyo sistemas completos — sistemas operativos, backends, software de negocio, plataformas de aprendizaje — y después los compruebo contra lo que decide: hardware real, un catálogo real, un estudiante real. Abajo está lo que pasó la prueba. Lo que todavía no está probado también se publica.',
    available: 'Abierto a nuevos proyectos — en remoto o en Guadalajara.',
    ctaWork: 'Ver el trabajo',
    ctaLedger: 'Libro de evidencia',
    atlasLabel: 'Capturas reales, salida real',
    atlasNote: 'Cada pantalla aquí es una captura del propio proyecto, o una gráfica dibujada con sus propios archivos de evidencia. Nada es un mock-up.',
    open: 'Abrir el proyecto',
    record: 'Registro de ingeniería',
    moreLabel: 'También construido',
    moreTitle: 'Salas más chicas, el mismo estándar.',
    moreBody: 'Un motor para preparar un examen nacional, un pipeline de documentos que se niega a inventar citas, un asistente que pregunta antes de actuar, un programa de investigación escrito para poder refutarse, y la máquina en la que trabajo.',
    allWork: 'Índice de todo el trabajo',
    verification: 'Comprobar lo que se afirma contra sistemas reales',
    verificationBody: '«Compatible» es una afirmación, no una garantía. Estos dos proyectos la convierten en algo que se puede correr: uno compara un producto contra el servicio real, el otro solo llama soportado a algo cuando una prueba real lo demuestra.',
    storyboard: [
      { step: '01', title: 'Kai escribe en un archivo de Ana. Nada lo bloquea — se vuelve una propuesta.' },
      { step: '02', title: 'Ana recibe un diff: aprueba o rechaza con un clic.' },
      { step: '03', title: 'A quien depende de la función cambiada se le avisa — antes de que algo se rompa.' },
    ],
    findings: 'Lo que encontró',
    evidenceModel: 'Cada afirmación pública lleva la cadena completa',
  },

  index: {
    eyebrow: 'Índice',
    title: 'Todo, por lo que es.',
    lede: 'Un sistema operativo y un software de negocio no van en el mismo cajón visual — así que cada proyecto conserva sus propios colores, tomados de sus propias pantallas.',
    count: (n, c) => `${n} proyectos · ${c} tipos`,
    privateRepo: 'Repositorio privado',
    open: 'Abrir',
  },

  project: {
    back: 'Índice',
    why: 'Por qué existe',
    how: 'Cómo funciona',
    gallery: 'Capturas',
    captureNote: 'Pantallas y diagramas reales del repositorio del proyecto — no son mock-ups.',
    record: 'Registro de ingeniería',
    recordLede: 'Para entrevistadores y para quien quiera comprobar: cómo está construido, qué tiene que cumplirse siempre, qué se midió, qué se rompió — y qué no está probado.',
    recordMissing: '',
    caveat: 'Limitación principal',
    contents: 'En este registro',
    sources: 'Fuentes',
    privateSources: 'El repositorio es privado; este registro está escrito a partir de su documentación actual. No se reproduce código, llaves ni datos privados.',
    next: 'Siguiente proyecto',
    links: 'Enlaces',
  },

  ledger: {
    eyebrow: 'Libro de evidencia',
    title: 'Qué está probado. Qué no.',
    lede: 'Todos los proyectos en una sola hoja: el resultado medido más fuerte junto a la limitación más importante. Abre cualquier fila para ver su registro de ingeniería completo.',
    rules: [
      'Los números se copian del repositorio o la documentación del propio proyecto.',
      '«No probado» significa no probado: una comprobación que no pudo correr nunca cuenta como aprobada.',
      'Una sección de un registro solo existe cuando hay evidencia para ella.',
    ],
    cols: { project: 'Proyecto', proven: 'Medido / verificado', limit: 'Limitación principal', depth: 'Registro' },
    read: 'Leer',
  },

  depth: {
    deep: { name: 'A fondo', one: 'A fondo' },
    breakdown: { name: 'Desgloses técnicos', one: 'Desglose' },
    research: { name: 'Notas de investigación', one: 'Nota de investigación' },
    note: { name: 'Notas breves', one: 'Nota breve' },
  },

  tone: { active: 'Activo', complete: 'Completo', archived: 'Archivado', research: 'Investigación' },

  section: {
    architecture: 'Arquitectura',
    invariants: 'Invariantes',
    trust: 'Fronteras de confianza',
    evidence: 'Evidencia',
    measurements: 'Mediciones',
    experiments: 'Experimentos',
    failures: 'Fallos',
    limitations: 'Limitaciones',
    notProven: 'Qué no está probado',
    nonClaims: 'Qué no afirma',
    reproduce: 'Reproducir',
  },

  method: {
    eyebrow: 'Cómo se hace',
    title: 'El mismo ciclo, siempre.',
    lede: 'Un sistema operativo y el catálogo de una ferretería no tienen nada en común salvo cómo se hicieron. El stack cambia con el problema; el ciclo se queda.',
    loop: [
      { step: '01', title: 'Delimitar', body: 'Qué tiene que hacer, qué no debe hacer nunca, qué tiene que sobrevivir.' },
      { step: '02', title: 'Construir', body: 'La ruta más rápida a algo en pie: mi código, una biblioteca, o un agente de código trabajando dentro de esas restricciones.' },
      { step: '03', title: 'Inspeccionar', body: 'Leer lo que salió contra lo que se pidió — el diff, el esquema, la frontera, los caminos de fallo.' },
      { step: '04', title: 'Probar', body: 'Tipos, análisis estático, pruebas unitarias y de integración, inyección de fallos donde el momento equivocado importa.' },
      { step: '05', title: 'Correr', body: 'Contra lo que decide: hardware real, datos reales, el servicio real, un cliente en el mostrador.' },
      { step: '06', title: 'Corregir', body: 'Lo que volvió mal se vuelve una restricción. Publicar lo que aún no está probado es parte del ciclo.' },
    ],
    ends: 'Una implementación puede venir de cualquier parte. Si es correcta se decide en otro lado — en el compilador, en la prueba, en la invariante que Postgres se niega a romper, en una placa que arranca o no arranca.',
  },

  about: {
    eyebrow: 'Sobre mí',
    title: 'Quién construye esto',
    body: [
      'Soy César Manzo, ingeniero de software en Guadalajara, México. Me atrae la parte que la mayoría de los proyectos se salta: llevar algo de una idea a una cosa que corre, que sobrevive a que la maten en el peor momento y que puede comprobar alguien que no tiene por qué confiar en mí.',
      'Por eso los proyectos de aquí no se parecen entre sí. Un sistema operativo, un kernel, software de negocio, plataformas de enseñanza y herramientas de verificación no comparten stack. Lo que comparten es el ciclo, y la amplitud que exige: esquema, servicio, interfaz, despliegue, y la evidencia de que cada parte hace lo que dice.',
    ],
    practiceLabel: 'Dónde ocurre ese trabajo',
    practice: [
      { area: 'Sistemas', detail: 'Rust, Linux, BPF, kernels, sandboxing, artefactos firmados.' },
      { area: 'Backend', detail: 'Servicios en TypeScript y Python, PostgreSQL y SQLite, esquema y migraciones.' },
      { area: 'Tiempo real', detail: 'Estado por WebSocket, presencia, ownership, evitar colisiones sobre estado compartido.' },
      { area: 'Producto e interfaz', detail: 'React, Next.js, accesibilidad, y diseño que sale del contenido.' },
      { area: 'Verificación', detail: 'Pruebas diferenciales, de propiedades y de mutación, inyección de fallos, artefactos reproducibles.' },
      { area: 'Sistemas de IA', detail: 'Agentes con fronteras de confianza explícitas, modelos locales, ruteo consciente del costo.' },
    ],
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Hablemos.',
    body: 'El correo es la forma más rápida de contactarme — por un puesto, un proyecto o cualquier cosa de aquí que quieras preguntar. Respondo.',
    email: EMAIL,
    channels: [
      { label: 'GitHub', href: GITHUB },
      { label: 'LinkedIn', href: LINKEDIN },
    ],
    place: 'Guadalajara, Jalisco, México · disponible en remoto',
  },

  notFound: { title: 'Aquí no hay nada.', body: 'Esa página no existe. Puede que se haya movido al reconstruir el sitio.', home: 'Ir al trabajo' },

  footer: {
    built: 'Hecho con React, Vite y Tailwind. Tipografía: Archivo y JetBrains Mono. Cada captura es real.',
    rights: 'César Alberto Manzo Olivares',
  },
};

export const content: Record<Lang, SiteContent> = { en, es };
