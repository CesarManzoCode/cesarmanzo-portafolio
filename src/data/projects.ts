/* ==================================================================== *
 * Projects — the single source for every project on the site.
 *
 * Presentation lives in components; this file is data only (no asset
 * imports), so it can be checked by `npm test` without a bundler.
 * Images are referenced by key and resolved in `src/data/media.ts`.
 *
 * Every figure here comes from the project's own repository or its
 * current documentation. If a number changes there, change it here.
 * ==================================================================== */

export type Lang = 'en' | 'es';
/** A string in both languages. Claims must carry the same strength in each. */
export type T = { en: string; es: string };

export type CategoryId = 'systems' | 'devtools' | 'products' | 'education' | 'ai' | 'environment';

/** How much technical material a project has earned. */
export type Depth = 'deep' | 'breakdown' | 'research' | 'note';

/** Visual weight on the Projects page — not a ranking. */
export type Weight = 'major' | 'standard' | 'minor';

export type StatusTone = 'active' | 'complete' | 'archived' | 'research';

export type TagId =
  | 'rust'
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'cpp'
  | 'postgres'
  | 'ai'
  | 'verification'
  | 'realtime'
  | 'supabase'
  | 'education'
  | 'linux'
  | 'kernel';

export type MediaKey =
  | 'thalyx-authorisation'
  | 'thalyx-architecture'
  | 'thalyx-atomic'
  | 'orux-flow'
  | 'orux-tentative'
  | 'orux-impact'
  | 'orux-review'
  | 'ferrol-home'
  | 'ferrol-category'
  | 'ferrol-mobile'
  | 'indice-lesson'
  | 'indice-challenge'
  | 'acredita-today'
  | 'acredita-lesson'
  | 'acredita-item'
  | 'studymation-brief'
  | 'studymation-run'
  | 'studymation-document';

export type FigureRef = {
  media: MediaKey;
  alt: T;
  caption: T;
  /** Dense captures pan on a phone instead of shrinking. */
  zoom?: 'md' | 'lg';
  /** Drawn for a dark ground (the Thalyx captures). */
  dark?: boolean;
  /** A phone capture: shown narrow beside a wide one. */
  narrow?: boolean;
};

export type ProjectLink = { label: T; href: string };

export type Project = {
  slug: string;
  name: string;
  category: CategoryId;
  weight: Weight;
  depth: Depth;
  year: string;
  /** Short kind line, e.g. “Operating system · Rust”. */
  kind: T;
  status: T;
  statusTone: StatusTone;
  /** One accessible sentence: what it is, for anyone. */
  thesis: T;
  /** Why it exists — the problem, in plain words. */
  why: T;
  /** 1–3 concrete proof points. The first ones are used on Home. */
  proof: T[];
  /** The accessible story: a few titled paragraphs, no jargon walls. */
  points: { title: T; body: T }[];
  tags: TagId[];
  links: ProjectLink[];
  figures: FigureRef[];
  /** Repository is private: no source link is shown. */
  privateRepo?: boolean;
  /** Affiliation / endorsement disclaimers and similar notes. */
  note?: T;
};

const GH = 'https://github.com/CesarManzoCode';

const L = {
  repo: { en: 'Repository', es: 'Repositorio' },
};

/* -------------------------------------------------------------------- *
 * Categories — the primary information architecture of /projects.
 * -------------------------------------------------------------------- */
export const CATEGORIES: { id: CategoryId; name: T; blurb: T }[] = [
  {
    id: 'systems',
    name: { en: 'Systems & Infrastructure', es: 'Sistemas e infraestructura' },
    blurb: {
      en: 'Operating systems, kernels, backend runtimes and the research underneath them.',
      es: 'Sistemas operativos, kernels, runtimes de backend y la investigación que hay debajo.',
    },
  },
  {
    id: 'devtools',
    name: { en: 'Developer Tools & Verification', es: 'Herramientas para desarrolladores y verificación' },
    blurb: {
      en: 'Tools that make other software safer to change — or check whether it does what it claims.',
      es: 'Herramientas que hacen más seguro cambiar otro software, o que comprueban si hace lo que dice.',
    },
  },
  {
    id: 'products',
    name: { en: 'Products & Web', es: 'Productos y web' },
    blurb: {
      en: 'Software built against a real business or a real paying user, not a spec.',
      es: 'Software construido contra un negocio real o un usuario que paga, no contra una especificación.',
    },
  },
  {
    id: 'education',
    name: { en: 'Education', es: 'Educación' },
    blurb: {
      en: 'Learning tools built around what students in México actually face.',
      es: 'Herramientas de aprendizaje construidas alrededor de lo que de verdad enfrentan estudiantes en México.',
    },
  },
  {
    id: 'ai',
    name: { en: 'AI & Automation', es: 'IA y automatización' },
    blurb: {
      en: 'Assistants and automation where the model is one component with limits, not the whole system.',
      es: 'Asistentes y automatización donde el modelo es un componente con límites, no el sistema entero.',
    },
  },
  {
    id: 'environment',
    name: { en: 'Developer Environment', es: 'Entorno de desarrollo' },
    blurb: {
      en: 'The machine I work on, treated as software.',
      es: 'La máquina en la que trabajo, tratada como software.',
    },
  },
];

export const TAGS: Record<TagId, T> = {
  rust: { en: 'Rust', es: 'Rust' },
  typescript: { en: 'TypeScript', es: 'TypeScript' },
  javascript: { en: 'JavaScript', es: 'JavaScript' },
  python: { en: 'Python', es: 'Python' },
  cpp: { en: 'C / C++', es: 'C / C++' },
  postgres: { en: 'PostgreSQL', es: 'PostgreSQL' },
  ai: { en: 'AI systems', es: 'Sistemas de IA' },
  verification: { en: 'Verification', es: 'Verificación' },
  realtime: { en: 'Realtime', es: 'Tiempo real' },
  supabase: { en: 'Supabase ecosystem', es: 'Ecosistema Supabase' },
  education: { en: 'Education', es: 'Educación' },
  linux: { en: 'Linux', es: 'Linux' },
  kernel: { en: 'Kernel', es: 'Kernel' },
};

/* -------------------------------------------------------------------- *
 * The projects.
 * -------------------------------------------------------------------- */
export const PROJECTS: Project[] = [
  /* ================================================================ *
   * Thalyx
   * ================================================================ */
  {
    slug: 'thalyx',
    name: 'Thalyx',
    category: 'systems',
    weight: 'major',
    depth: 'deep',
    year: '2026',
    kind: { en: 'Experimental operating system · Rust', es: 'Sistema operativo experimental · Rust' },
    status: {
      en: 'In development · Phase 1 closed on real hardware',
      es: 'En desarrollo · Fase 1 cerrada en hardware real',
    },
    statusTone: 'active',
    thesis: {
      en: 'An operating system built around an AI agent — where the agent can only propose, and the person at the keyboard can always do everything without it.',
      es: 'Un sistema operativo construido alrededor de un agente de IA — donde el agente solo puede proponer, y la persona frente al teclado siempre puede hacerlo todo sin él.',
    },
    why: {
      en: 'On today’s systems an AI agent is a guest that has to pretend to be a human: drive a keyboard, or call APIs traced from human interaction. Thalyx asks what an operating system looks like when the agent is designed in from the start — and assumes that, sooner or later, the model will be talked into something, so that has to be survivable.',
      es: 'En los sistemas de hoy un agente de IA es un invitado que tiene que fingir ser humano: manejar un teclado o llamar APIs calcadas de la interacción humana. Thalyx pregunta cómo es un sistema operativo cuando el agente se diseña desde el principio — y da por hecho que, tarde o temprano, alguien convencerá al modelo de algo, así que eso tiene que poder sobrevivirse.',
    },
    proof: [
      {
        en: 'A real PC booted it from USB, installed it onto a second disk and booted again without the installer.',
        es: 'Una PC real lo arrancó desde USB, lo instaló en un segundo disco y volvió a arrancar sin el instalador.',
      },
      {
        en: 'Latest hardware run: 156 checks proven, 2 not proven, 0 failed.',
        es: 'Última corrida en hardware: 156 comprobaciones probadas, 2 no probadas, 0 fallidas.',
      },
      {
        en: 'Permissions are enforced inside the Linux kernel, not by a promise in an app.',
        es: 'Los permisos se hacen cumplir dentro del kernel de Linux, no con una promesa dentro de una app.',
      },
    ],
    points: [
      {
        title: { en: 'The agent proposes. It executes nothing.', es: 'El agente propone. No ejecuta nada.' },
        body: {
          en: 'The agent sits outside the part of the system that is trusted. It cannot run anything by itself, cannot write the permission prompt you approve, and cannot let text it has read decide what happens. The core re-checks everything it produces.',
          es: 'El agente vive fuera de la parte del sistema en la que se confía. No puede ejecutar nada por sí mismo, no puede redactar el aviso de permiso que apruebas y no puede dejar que un texto que leyó decida qué ocurre. El núcleo revisa de nuevo todo lo que produce.',
        },
      },
      {
        title: { en: 'The human route is complete.', es: 'La vía humana es completa.' },
        body: {
          en: 'Everything the agent can do, a person can do directly, without it and without losing capability. A system where the AI is the only way to get things done is a worse system, not a better one.',
          es: 'Todo lo que el agente puede hacer, una persona puede hacerlo directamente, sin él y sin perder capacidad. Un sistema donde la IA es la única forma de hacer las cosas es un sistema peor, no mejor.',
        },
      },
      {
        title: { en: 'A permission becomes kernel policy.', es: 'Un permiso se vuelve política del kernel.' },
        body: {
          en: 'When you grant a program a permission, the grant is loaded into the Linux kernel itself, and what was not granted is refused there. Each program runs isolated, with its own user, its own files and its own resource limits.',
          es: 'Cuando le das un permiso a un programa, el permiso se carga en el propio kernel de Linux, y lo que no se concedió se niega ahí. Cada programa corre aislado, con su propio usuario, sus propios archivos y sus propios límites de recursos.',
        },
      },
      {
        title: { en: 'What is not proven is published too.', es: 'Lo que no está probado también se publica.' },
        body: {
          en: 'The project’s rule is that a claim you cannot check is not a claim. Its verifier never counts a check it could not run as a pass — and the biggest open result is written down: no tier of the local model ever abstained when it should have asked for clarification.',
          es: 'La regla del proyecto es que una afirmación que no puedes comprobar no es una afirmación. Su verificador nunca cuenta como aprobada una comprobación que no pudo correr — y el resultado abierto más grande está escrito: ningún nivel del modelo local se abstuvo nunca cuando debía pedir aclaración.',
        },
      },
    ],
    tags: ['rust', 'linux', 'kernel', 'ai', 'verification'],
    links: [
      { label: L.repo, href: `${GH}/thalyx` },
      { label: { en: 'What is proven, and what is not', es: 'Qué está probado y qué no' }, href: `${GH}/thalyx/blob/main/docs/STATUS.md` },
    ],
    figures: [
      {
        media: 'thalyx-authorisation',
        dark: true,
        zoom: 'md',
        alt: {
          en: 'A real Thalyx run installing a signed module: the core prints an authorisation frame listing the one permission requested and waits for a yes.',
          es: 'Una ejecución real de Thalyx instalando un módulo firmado: el núcleo imprime un aviso de autorización con el único permiso solicitado y espera un sí.',
        },
        caption: {
          en: 'A real run: installing a signed module. The core draws the authorisation frame from the module’s signed manifest — the agent cannot compose it, reword it, or show a subset of it.',
          es: 'Una ejecución real: instalar un módulo firmado. El núcleo dibuja el aviso a partir del manifiesto firmado del módulo — el agente no puede redactarlo, reformularlo ni enseñar solo una parte.',
        },
      },
    ],
  },

  /* ================================================================ *
   * Thalyx-Kernel
   * ================================================================ */
  {
    slug: 'thalyx-kernel',
    name: 'Thalyx-Kernel',
    category: 'systems',
    weight: 'major',
    depth: 'deep',
    year: '2026',
    kind: { en: 'Capability microkernel · x86_64 · Rust', es: 'Microkernel de capacidades · x86_64 · Rust' },
    status: {
      en: 'Phases K0–K6 complete in their stated scope · QEMU only',
      es: 'Fases K0–K6 completas en su alcance declarado · solo QEMU',
    },
    statusTone: 'active',
    thesis: {
      en: 'A kernel written from scratch so that work done on someone’s behalf has explicit limits — what it may touch, what it may spend, and who is accountable for it.',
      es: 'Un kernel escrito desde cero para que el trabajo hecho a nombre de alguien tenga límites explícitos — qué puede tocar, cuánto puede gastar y quién responde por él.',
    },
    why: {
      en: 'General-purpose kernels grant authority by user and process, and account per process. A system that dispatches delegated work to semi-trusted agents needs authority and accounting per unit of work. Thalyx-Kernel builds those as kernel primitives — independently of Thalyx — and then measures what they cost against Linux on the same machine.',
      es: 'Los kernels de propósito general dan autoridad por usuario y proceso, y contabilizan por proceso. Un sistema que reparte trabajo delegado a agentes semiconfiables necesita autoridad y contabilidad por unidad de trabajo. Thalyx-Kernel construye eso como primitivas del kernel — independiente de Thalyx — y luego mide cuánto cuestan contra Linux en la misma máquina.',
    },
    proof: [
      {
        en: 'Six phases, each passed by an independent checker that reads kernel logs and raw disk bytes.',
        es: 'Seis fases, cada una aprobada por un verificador independiente que lee los logs del kernel y los bytes crudos del disco.',
      },
      {
        en: '17 paired benchmarks against Linux — including the ones it loses.',
        es: '17 benchmarks pareados contra Linux — incluidos los que pierde.',
      },
    ],
    points: [
      {
        title: { en: 'Authority is a handle, not an identity.', es: 'La autoridad es un handle, no una identidad.' },
        body: {
          en: 'Every object is reached through a revocable capability. There is no global namespace a program can reach into by name.',
          es: 'Cada objeto se alcanza a través de una capacidad revocable. No hay un espacio de nombres global al que un programa pueda asomarse por nombre.',
        },
      },
      {
        title: { en: 'Measured against Linux, honestly.', es: 'Medido contra Linux, con honestidad.' },
        body: {
          en: 'Some operations are cheaper, some cost several times more, and inter-process calls do not scale across CPUs because of a machine-wide lock. That last one is written up as the largest limitation, not hidden.',
          es: 'Algunas operaciones salen más baratas, otras cuestan varias veces más, y las llamadas entre procesos no escalan entre CPUs por un lock global de la máquina. Eso último está escrito como la limitación más grande, no escondido.',
        },
      },
    ],
    tags: ['rust', 'kernel', 'verification'],
    links: [{ label: L.repo, href: `${GH}/thalyx-kernel` }],
    figures: [],
  },

  /* ================================================================ *
   * SupaKernel
   * ================================================================ */
  {
    slug: 'supakernel',
    name: 'SupaKernel',
    category: 'systems',
    weight: 'major',
    depth: 'deep',
    year: '2026',
    kind: { en: 'Backend runtime · TypeScript', es: 'Runtime de backend · TypeScript' },
    status: {
      en: 'v1 acceptance: 20 of 22 gates pass, 2 artifact-only, 0 failed · packages not published',
      es: 'Aceptación v1: 20 de 22 gates pasan, 2 solo con artefacto, 0 fallidos · paquetes sin publicar',
    },
    statusTone: 'active',
    thesis: {
      en: 'A lightweight backend that offers an explicit subset of Supabase over PostgreSQL or SQLite — and only calls something supported once a real test proves it.',
      es: 'Un backend ligero que ofrece un subconjunto explícito de Supabase sobre PostgreSQL o SQLite — y solo llama soportado a algo cuando una prueba real lo demuestra.',
    },
    why: {
      en: '“Compatible” backends usually claim more than they check. SupaKernel runs one semantic core across databases and JavaScript runtimes, and every public claim is tied to a command, an artifact and a hash. Anything without that chain is labelled experimental.',
      es: 'Los backends «compatibles» suelen afirmar más de lo que comprueban. SupaKernel corre un solo núcleo semántico sobre varias bases de datos y runtimes de JavaScript, y cada afirmación pública está atada a un comando, un artefacto y un hash. Lo que no tiene esa cadena se etiqueta como experimental.',
    },
    proof: [
      {
        en: 'Runs on PostgreSQL, SQLite and PGlite, across Node, Bun, Deno, Workers and the browser.',
        es: 'Corre sobre PostgreSQL, SQLite y PGlite, en Node, Bun, Deno, Workers y el navegador.',
      },
      {
        en: 'Release acceptance: 20 gates pass, 2 artifact-only, 0 failed.',
        es: 'Aceptación de release: 20 gates pasan, 2 solo con artefacto, 0 fallidos.',
      },
    ],
    points: [
      {
        title: { en: 'Claims come with receipts.', es: 'Las afirmaciones traen recibo.' },
        body: {
          en: 'Each supported capability lists the real targets it ran against, the command, the resulting artifact and its hash, and the known limitations.',
          es: 'Cada capacidad soportada lista los targets reales contra los que corrió, el comando, el artefacto resultante con su hash y las limitaciones conocidas.',
        },
      },
      {
        title: { en: 'It says what it does not claim.', es: 'Dice lo que no afirma.' },
        body: {
          en: 'No blanket Supabase parity. No “faster than” claim from an inconclusive benchmark. No developer-experience result where the experiment could not run.',
          es: 'Nada de paridad total con Supabase. Ninguna afirmación de «más rápido que» a partir de un benchmark inconcluso. Ningún resultado de experiencia de desarrollo donde el experimento no pudo correr.',
        },
      },
    ],
    tags: ['typescript', 'postgres', 'supabase', 'verification'],
    links: [{ label: L.repo, href: `${GH}/supakernel` }],
    figures: [],
    note: {
      en: 'Independent project. Not affiliated with or endorsed by Supabase.',
      es: 'Proyecto independiente. Sin afiliación ni respaldo de Supabase.',
    },
  },

  /* ================================================================ *
   * ONE
   * ================================================================ */
  {
    slug: 'one',
    name: 'ONE',
    category: 'systems',
    weight: 'standard',
    depth: 'research',
    year: '2026',
    kind: { en: 'Research program · compilers & IR', es: 'Programa de investigación · compiladores e IR' },
    status: {
      en: 'Research foundation · no implementation yet · every claim untested',
      es: 'Fundamento de investigación · sin implementación aún · todos los claims sin probar',
    },
    statusTone: 'research',
    thesis: {
      en: 'A research program asking whether very different kinds of computation can share one core for analysis, optimisation and execution — written so that it can be proven wrong.',
      es: 'Un programa de investigación que pregunta si formas muy distintas de cómputo pueden compartir un mismo núcleo de análisis, optimización y ejecución — escrito para que se pueda demostrar que está equivocado.',
    },
    why: {
      en: 'Big architectural ideas usually get built before anyone decides what would count as failure. ONE does the opposite: contracts, claims, falsifiers and preregistered gates first, then the first narrow experiment.',
      es: 'Las ideas arquitectónicas grandes suelen construirse antes de que alguien decida qué contaría como fracaso. ONE hace lo contrario: contratos, claims, falsadores y gates preregistrados primero, y después el primer experimento acotado.',
    },
    proof: [
      {
        en: 'Every claim has a written falsifier; all are currently “untested”.',
        es: 'Cada claim tiene un falsador escrito; hoy todos están «sin probar».',
      },
    ],
    points: [
      {
        title: { en: 'Honest about where it is.', es: 'Honesto sobre dónde está.' },
        body: {
          en: 'There is no implementation and no observed evidence yet. What exists is the design record, the decisions, and the first experiment defined in enough detail to run.',
          es: 'Todavía no hay implementación ni evidencia observada. Lo que existe es el registro de diseño, las decisiones y el primer experimento definido con el detalle suficiente para correrlo.',
        },
      },
    ],
    tags: ['cpp', 'verification'],
    links: [{ label: L.repo, href: `${GH}/one` }],
    figures: [],
  },

  /* ================================================================ *
   * SupaDiff
   * ================================================================ */
  {
    slug: 'supadiff',
    name: 'SupaDiff',
    category: 'devtools',
    weight: 'major',
    depth: 'deep',
    year: '2026',
    kind: { en: 'Compatibility verification · TypeScript', es: 'Verificación de compatibilidad · TypeScript' },
    status: { en: 'Layers L0–L14 implemented · open repository', es: 'Capas L0–L14 implementadas · repositorio abierto' },
    statusTone: 'complete',
    thesis: {
      en: 'Compatibility is observable behavior: SupaDiff runs the same scenario against Supalite and real Supabase, and compares what actually happens.',
      es: 'La compatibilidad es comportamiento observable: SupaDiff corre el mismo escenario contra Supalite y contra Supabase real, y compara lo que de verdad ocurre.',
    },
    why: {
      en: 'Supalite promises to behave like Supabase. “Compatible” is a claim, not a guarantee — so instead of reading source code or specs, SupaDiff executes both and compares responses, data and stored bytes.',
      es: 'Supalite promete comportarse como Supabase. «Compatible» es una afirmación, no una garantía — así que en lugar de leer código o especificaciones, SupaDiff ejecuta los dos y compara respuestas, datos y bytes guardados.',
    },
    proof: [
      {
        en: 'Found a signed-URL bug where Supalite served the wrong content with a “200 OK”.',
        es: 'Encontró un bug de URLs firmadas donde Supalite servía el contenido equivocado con un «200 OK».',
      },
      {
        en: 'Found an upgrade bug that makes the first insert after migrating to Supabase fail.',
        es: 'Encontró un bug de actualización que hace fallar el primer insert después de migrar a Supabase.',
      },
      {
        en: 'Runs against real targets: Supalite, Supabase over Docker, and a hosted Supabase project.',
        es: 'Corre contra targets reales: Supalite, Supabase sobre Docker y un proyecto de Supabase hospedado.',
      },
    ],
    points: [
      {
        title: { en: 'Same scenario, two real systems.', es: 'Mismo escenario, dos sistemas reales.' },
        body: {
          en: 'A scenario — sign up, insert a row, upload a file, sign a URL — runs step by step against both targets. Sensitive values are redacted, then the observations are compared by meaning, not by raw text.',
          es: 'Un escenario — registrarse, insertar una fila, subir un archivo, firmar una URL — corre paso a paso contra los dos targets. Los valores sensibles se ocultan y luego las observaciones se comparan por significado, no por texto crudo.',
        },
      },
      {
        title: { en: 'Findings are reproducible.', es: 'Los hallazgos son reproducibles.' },
        body: {
          en: 'Every run leaves a deterministic artifact that can be inspected, replayed and reduced to the smallest failing case. Both bugs above are registered and reproducible, not guessed from reading source.',
          es: 'Cada corrida deja un artefacto determinista que se puede inspeccionar, repetir y reducir al caso mínimo que falla. Los dos bugs de arriba están registrados y son reproducibles, no adivinados leyendo código.',
        },
      },
    ],
    tags: ['typescript', 'supabase', 'verification', 'postgres'],
    links: [
      { label: L.repo, href: `${GH}/supadiff` },
      { label: { en: 'Upstream issue: lite-projects#69', es: 'Issue upstream: lite-projects#69' }, href: 'https://github.com/dswbx/lite-projects/issues/69' },
    ],
    figures: [],
    note: {
      en: 'Independent project. Not affiliated with or endorsed by Supabase.',
      es: 'Proyecto independiente. Sin afiliación ni respaldo de Supabase.',
    },
  },

  /* ================================================================ *
   * Orux
   * ================================================================ */
  {
    slug: 'orux',
    name: 'Orux',
    category: 'devtools',
    weight: 'major',
    depth: 'breakdown',
    year: '2026',
    kind: { en: 'Realtime collaboration over Git · Python · TypeScript', es: 'Colaboración en tiempo real sobre Git · Python · TypeScript' },
    status: {
      en: 'Reached production and was shut down · kept as a finished engineering record',
      es: 'Llegó a producción y se apagó · se conserva como registro de ingeniería terminado',
    },
    statusTone: 'archived',
    thesis: {
      en: 'A live coding space for small teams on a real Git repository, where editing someone else’s file turns your change into a proposal instead of a conflict.',
      es: 'Un espacio de código en vivo para equipos pequeños sobre un repositorio Git real, donde editar el archivo de otra persona convierte tu cambio en una propuesta en vez de un conflicto.',
    },
    why: {
      en: 'For a team of two to fifty, branches, pull requests and reviews are a lot of ceremony — so people route around them and break each other’s code. Orux gives the same safety without the ceremony, because the system already knows what everyone else is doing.',
      es: 'Para un equipo de dos a cincuenta personas, las ramas, los pull requests y las revisiones son mucha ceremonia — así que la gente les da la vuelta y se rompen el código entre sí. Orux da la misma seguridad sin la ceremonia, porque el sistema ya sabe qué está haciendo cada quien.',
    },
    proof: [
      {
        en: 'Ownership changes what an edit means: your file applies live, someone else’s becomes a proposal.',
        es: 'El ownership cambia lo que significa una edición: tu archivo se aplica en vivo, el de otra persona se vuelve propuesta.',
      },
      {
        en: 'Saving warns the people whose code your change is about to break.',
        es: 'Guardar avisa a las personas cuyo código tu cambio está por romper.',
      },
      {
        en: 'Over 500 automated tests; the whole stack still runs locally.',
        es: 'Más de 500 pruebas automatizadas; todo el stack sigue corriendo en local.',
      },
    ],
    points: [
      {
        title: { en: 'Nobody is stopped before they try.', es: 'A nadie se le detiene antes de intentarlo.' },
        body: {
          en: 'If the file is yours, your typing lands live for everyone. If it is someone else’s, you keep typing, the change stays local, and saving sends it to the owner as a diff to approve or reject in one click.',
          es: 'Si el archivo es tuyo, lo que escribes aterriza en vivo para todos. Si es de otra persona, sigues escribiendo, el cambio se queda local y al guardar le llega al dueño como un diff que aprueba o rechaza con un clic.',
        },
      },
      {
        title: { en: 'A warning before the break exists.', es: 'Un aviso antes de que exista la ruptura.' },
        body: {
          en: 'When a save changes the shape of a function others depend on, Orux works out who actually uses it and tells those people, with a severity — not “this file was touched”.',
          es: 'Cuando un guardado cambia la forma de una función de la que otros dependen, Orux calcula quién la usa realmente y se lo dice a esas personas, con una severidad — no «se tocó este archivo».',
        },
      },
      {
        title: { en: 'Git stays underneath.', es: 'Git sigue debajo.' },
        body: {
          en: 'Each team’s workspace is a real Git repository. git clone is enough to walk away with everything.',
          es: 'El workspace de cada equipo es un repositorio Git real. Con un git clone te llevas todo.',
        },
      },
    ],
    tags: ['python', 'typescript', 'realtime', 'postgres'],
    links: [{ label: L.repo, href: `${GH}/orux` }],
    figures: [
      {
        media: 'orux-tentative',
        zoom: 'md',
        alt: {
          en: 'The Orux editor in proposal mode: Kai types into a file Ana owns; the changed lines are marked as a local draft and Ana’s live cursor is on line 25.',
          es: 'El editor de Orux en modo propuesta: Kai escribe en un archivo de Ana; las líneas cambiadas están marcadas como borrador local y el cursor de Ana está vivo en la línea 25.',
        },
        caption: {
          en: 'Kai edits a file Ana owns. Nothing is blocked — the change is a proposal until Ana sees it.',
          es: 'Kai edita un archivo de Ana. Nada se bloquea: el cambio es una propuesta hasta que Ana lo ve.',
        },
      },
      {
        media: 'orux-review',
        zoom: 'md',
        alt: {
          en: 'A proposal awaiting review in Orux, shown as a diff with approve and reject buttons.',
          es: 'Una propuesta pendiente de revisión en Orux, mostrada como diff con botones de aprobar y rechazar.',
        },
        caption: {
          en: 'The owner’s side: a diff, a line count, approve or reject.',
          es: 'Del lado del dueño: un diff, un conteo de líneas, aprobar o rechazar.',
        },
      },
      {
        media: 'orux-impact',
        zoom: 'md',
        alt: {
          en: 'An incoming high-risk impact notice in Orux: a function that Kai’s file imports changed shape, with the affected folders marked in the file tree.',
          es: 'Un aviso de impacto de riesgo alto en Orux: una función que importa el archivo de Kai cambió de forma, con las carpetas afectadas marcadas en el árbol.',
        },
        caption: {
          en: 'The other side of a save: the owner of a dependent file is told a function they use changed shape.',
          es: 'El otro lado de un guardado: al dueño de un archivo dependiente se le avisa que una función que usa cambió de forma.',
        },
      },
    ],
  },

  /* ================================================================ *
   * Ferrol
   * ================================================================ */
  {
    slug: 'ferrol',
    name: 'Ferrol',
    category: 'products',
    weight: 'major',
    depth: 'deep',
    year: '2026',
    kind: { en: 'Business software · TypeScript · PostgreSQL', es: 'Software de negocio · TypeScript · PostgreSQL' },
    status: {
      en: 'Private repository · stages 0–8 complete; the open criterion is external (domain and VPS)',
      es: 'Repositorio privado · etapas 0 a 8 completas; el criterio abierto es externo (dominio y VPS)',
    },
    statusTone: 'active',
    thesis: {
      en: 'The catalogue, pricing, customer accounts and invoicing a hardware store in Guadalajara runs on — built against its real product lists, not a demo dataset.',
      es: 'El catálogo, los precios, las cuentas de clientes y la facturación con los que trabaja una ferretería en Guadalajara — construido contra sus listas reales de productos, no contra datos de demostración.',
    },
    why: {
      en: 'Ferreterías Ferrol sells over twelve thousand articles identified by measurement, key and brand, and neither customers nor the people at the counter had a good way to find one. Real supplier files and real tax rules then showed which of the software’s assumptions were wrong.',
      es: 'Ferreterías Ferrol vende más de doce mil artículos que se identifican por medida, clave y marca, y ni los clientes ni quien atiende el mostrador tenían una buena forma de encontrar uno. Después, los archivos reales de proveedores y las reglas fiscales reales mostraron qué suposiciones del software estaban mal.',
    },
    proof: [
      {
        en: 'Built on the store’s real catalogue: 12,027 products grouped into 1,642 visual families.',
        es: 'Construido sobre el catálogo real de la tienda: 12,027 productos agrupados en 1,642 familias visuales.',
      },
      {
        en: 'Real supplier spreadsheets exposed bugs that synthetic tests had passed — each fixed with a regression test.',
        es: 'Hojas de cálculo reales de proveedores destaparon bugs que las pruebas sintéticas habían pasado — cada uno corregido con su prueba de regresión.',
      },
      {
        en: 'Found and fixed an invoice flow where customers got the PDF but never the legal XML.',
        es: 'Encontró y corrigió un flujo de facturación donde el cliente recibía el PDF pero nunca el XML fiscal.',
      },
    ],
    points: [
      {
        title: { en: 'The real list, end to end.', es: 'La lista real, de principio a fin.' },
        body: {
          en: 'A guided import reads the files the business actually keeps. A price engine derives prices from cost with per-list rules, and trade accounts sign in to see their own — isolated so one customer’s prices can never leak into another’s page.',
          es: 'Una importación guiada lee los archivos que el negocio de verdad tiene. Un motor de precios los deriva del costo con reglas por lista, y las cuentas comerciales entran para ver los suyos — aislados para que el precio de un cliente nunca se filtre a la página de otro.',
        },
      },
      {
        title: { en: 'No checkout, on purpose.', es: 'Sin checkout, a propósito.' },
        body: {
          en: 'Customers build a request that leaves through WhatsApp with a registered folio, which is how the store already sells. Software that fights how a business works loses.',
          es: 'El cliente arma una solicitud que sale por WhatsApp con un folio registrado, que es como la tienda ya vende. El software que pelea contra la forma de trabajar de un negocio pierde.',
        },
      },
      {
        title: { en: 'Photos by evidence, not by luck.', es: 'Fotos por evidencia, no por suerte.' },
        body: {
          en: 'Supplier names are abbreviated — “TOR” means screw (tornillo). An image search trusted the first result and gave a screw the picture of a web browser. Now a result is only kept when it carries enough evidence that it is the right part; otherwise the product stays without a photo and says why.',
          es: 'Los nombres del proveedor vienen abreviados — «TOR» es tornillo. Una búsqueda de imágenes confió en el primer resultado y a un tornillo le puso la imagen de un navegador web. Ahora un resultado solo se conserva si trae evidencia suficiente de que es la pieza correcta; si no, el producto se queda sin foto y dice por qué.',
        },
      },
      {
        title: { en: 'Invoices under real legal rules.', es: 'Facturas bajo reglas legales reales.' },
        body: {
          en: 'Mexican electronic invoicing is checked with a real schema validator and the tax authority’s own published transformations. Where the official files could not be obtained, the operation refuses to run instead of approximating.',
          es: 'La facturación electrónica mexicana se comprueba con un validador de esquemas real y las transformaciones que publica la propia autoridad fiscal. Donde no se pudieron obtener los archivos oficiales, la operación se niega a correr en lugar de aproximar.',
        },
      },
    ],
    tags: ['typescript', 'postgres'],
    links: [],
    privateRepo: true,
    figures: [
      {
        media: 'ferrol-home',
        zoom: 'md',
        alt: {
          en: 'The Ferrol catalogue home: one search field over twelve thousand articles, with the category tree underneath.',
          es: 'El inicio del catálogo de Ferrol: un solo buscador sobre doce mil artículos, con el árbol de categorías debajo.',
        },
        caption: {
          en: 'The catalogue home: one search field over twelve thousand articles.',
          es: 'El inicio del catálogo: un solo buscador sobre doce mil artículos.',
        },
      },
      {
        media: 'ferrol-category',
        zoom: 'lg',
        alt: {
          en: 'A Ferrol category listing with filters by brand and availability, and key, unit and reference price per row.',
          es: 'Un listado de categoría de Ferrol con filtros por marca y disponibilidad, y clave, unidad y precio de referencia por renglón.',
        },
        caption: {
          en: 'A branch with 2,597 articles. Captured against the production build with the real list loaded; the margin shown is a trial figure, not the store’s.',
          es: 'Una rama con 2,597 artículos. Capturado contra el build de producción con la lista real cargada; el margen que se ve es de ensayo, no el de la tienda.',
        },
      },
      {
        media: 'ferrol-mobile',
        narrow: true,
        alt: {
          en: 'The Ferrol catalogue home on a 390-pixel-wide phone screen.',
          es: 'El inicio del catálogo de Ferrol en una pantalla de teléfono de 390 píxeles de ancho.',
        },
        caption: {
          en: 'The same home at 390 px — the phone is where the counter actually reads it.',
          es: 'El mismo inicio a 390 px — el teléfono es donde el mostrador realmente lo lee.',
        },
      },
    ],
  },

  /* ================================================================ *
   * Studymation
   * ================================================================ */
  {
    slug: 'studymation',
    name: 'Studymation',
    category: 'products',
    weight: 'standard',
    depth: 'breakdown',
    year: '2026',
    kind: { en: 'Document platform · Python · Next.js', es: 'Plataforma de documentos · Python · Next.js' },
    status: { en: 'Open repository', es: 'Repositorio abierto' },
    statusTone: 'complete',
    thesis: {
      en: 'Turns a teacher’s assignment and rubric into a checked contract, then into a formatted Word document whose sources were actually looked up — or reported as missing.',
      es: 'Convierte la consigna y la rúbrica de un profesor en un contrato verificable, y luego en un documento de Word con formato cuyas fuentes se buscaron de verdad — o se reportan como faltantes.',
    },
    why: {
      en: 'The failure that matters most to a student handing in work is an invented reference, or a document that ignored half the rubric. Studymation is built around preventing exactly those two.',
      es: 'El fallo que más le importa a un estudiante que entrega un trabajo es una referencia inventada, o un documento que ignoró media rúbrica. Studymation está construido para evitar justo esos dos.',
    },
    proof: [
      {
        en: 'Citations come from academic databases and are revalidated; if none survive, the gap is recorded instead of filled.',
        es: 'Las citas salen de bases académicas y se revalidan; si ninguna sobrevive, el hueco se registra en vez de rellenarse.',
      },
      {
        en: 'After writing, the content is re-read against the rubric’s deliverables.',
        es: 'Después de escribir, el contenido se vuelve a leer contra los entregables de la rúbrica.',
      },
    ],
    points: [
      {
        title: { en: 'The rubric is a contract.', es: 'La rúbrica es un contrato.' },
        body: {
          en: 'The rubric is parsed into deliverables the pipeline must satisfy, and a later step audits the finished content against them.',
          es: 'La rúbrica se convierte en entregables que el pipeline tiene que cumplir, y un paso posterior audita el contenido terminado contra ellos.',
        },
      },
      {
        title: { en: 'A real SaaS around it.', es: 'Un SaaS real alrededor.' },
        body: {
          en: 'Accounts, plans, prepaid credits on an immutable ledger, Stripe payments with signed webhooks, and per-school templates for the cover page and styles.',
          es: 'Cuentas, planes, créditos de prepago sobre un libro contable inmutable, pagos con Stripe y webhooks firmados, y plantillas por escuela para la portada y los estilos.',
        },
      },
    ],
    tags: ['python', 'typescript', 'postgres', 'ai'],
    links: [{ label: L.repo, href: `${GH}/Studymation` }],
    figures: [
      {
        media: 'studymation-brief',
        zoom: 'md',
        alt: {
          en: 'The Studymation brief: topic, subject, student data and the teacher’s rubric pasted in full, with a readiness panel showing 7 of 7 required fields.',
          es: 'El brief de Studymation: tema, materia, datos del alumno y la rúbrica del profesor pegada completa, con un panel que marca 7 de 7 campos requeridos.',
        },
        caption: {
          en: 'The brief is the contract with the student, rubric included.',
          es: 'El brief es el contrato con el estudiante, rúbrica incluida.',
        },
      },
      {
        media: 'studymation-document',
        zoom: 'md',
        alt: {
          en: 'Two pages of a generated document: an institutional cover page and a body page with headings, an in-text citation and references.',
          es: 'Dos páginas de un documento generado: una portada institucional y una página con encabezados, una cita en el texto y referencias.',
        },
        caption: {
          en: 'Produced by running the real assembler on the repository’s test fixtures: cover, styles, citation and references are system output; the prose is fixture text, because that run had no model keys.',
          es: 'Producido corriendo el ensamblador real con los fixtures de prueba del repositorio: portada, estilos, cita y referencias son salida del sistema; la prosa es texto de fixture, porque esa corrida no tenía llaves de modelo.',
        },
      },
    ],
  },

  /* ================================================================ *
   * Índice Cero
   * ================================================================ */
  {
    slug: 'indice-cero',
    name: 'Índice Cero',
    category: 'education',
    weight: 'major',
    depth: 'breakdown',
    year: '2026',
    kind: { en: 'Learn-to-code platform · TypeScript · Next.js', es: 'Plataforma para aprender a programar · TypeScript · Next.js' },
    status: { en: 'Web app · open repository', es: 'App web · repositorio abierto' },
    statusTone: 'active',
    thesis: {
      en: 'A platform where students learn to program by writing real code in the browser — compiled, run and graded against hidden tests, with feedback that says exactly what went wrong.',
      es: 'Una plataforma donde los estudiantes aprenden a programar escribiendo código real en el navegador — compilado, ejecutado y calificado contra pruebas ocultas, con retroalimentación que dice exactamente qué salió mal.',
    },
    why: {
      en: 'At the CETI in Guadalajara, programming is often taught by copying code onto a blackboard, and the popular learning apps do not follow the syllabus. Failing those subjects is usually a lack of somewhere to practise, not a lack of effort.',
      es: 'En el CETI de Guadalajara, la programación muchas veces se enseña copiando código al pizarrón, y las apps populares de aprendizaje no siguen el temario. Reprobar esas materias casi siempre es falta de un lugar donde practicar, no falta de esfuerzo.',
    },
    proof: [
      {
        en: '4 courses · 56 units · 276 lessons · 227 practice exercises.',
        es: '4 cursos · 56 unidades · 276 lecciones · 227 prácticas.',
      },
      {
        en: 'Code is really compiled and checked against test cases, some of them hidden.',
        es: 'El código se compila de verdad y se revisa contra casos de prueba, algunos ocultos.',
      },
      {
        en: 'C++, C# and SQL — each course brings its own compiler.',
        es: 'C++, C# y SQL — cada curso trae su propio compilador.',
      },
    ],
    points: [
      {
        title: { en: '90% practice, 10% theory.', es: '90 % práctica, 10 % teoría.' },
        body: {
          en: 'Every lesson ends in code the student writes. The explanation is short because the point is what happens after it.',
          es: 'Cada lección termina en código que escribe el estudiante. La explicación es corta porque lo importante es lo que pasa después.',
        },
      },
      {
        title: { en: 'Feedback that teaches.', es: 'Retroalimentación que enseña.' },
        body: {
          en: 'A failed challenge does not just say “incorrect”: it shows expected output next to yours, points at the line and column where they part, and keeps a hidden case so the fix cannot be fitted to the example.',
          es: 'Un reto fallido no solo dice «incorrecto»: pone la salida esperada junto a la tuya, señala la línea y la columna donde se separan y guarda un caso oculto para que la solución no se ajuste al ejemplo.',
        },
      },
    ],
    tags: ['typescript', 'postgres', 'education'],
    links: [
      { label: { en: 'Open Índice Cero', es: 'Abrir Índice Cero' }, href: 'https://cpp-ceti.vercel.app' },
      { label: L.repo, href: `${GH}/cpp-ceti` },
    ],
    figures: [
      {
        media: 'indice-challenge',
        zoom: 'lg',
        alt: {
          en: 'A C++ challenge: the statement, the student’s code in the editor, and the result — 0 of 2 tests passed, expected output next to the student’s, and a note that text is missing from column 12 of line 1.',
          es: 'Un reto de C++: el enunciado, el código del estudiante en el editor y el resultado — 0 de 2 pruebas aprobadas, la salida esperada junto a la del estudiante y el aviso de que falta texto desde la columna 12 de la línea 1.',
        },
        caption: {
          en: 'A real attempt with the classic integer-division mistake. Expected vs. actual, the exact column, and a hidden second case.',
          es: 'Un intento real con el error clásico de la división entera. Esperado contra obtenido, la columna exacta y un segundo caso oculto.',
        },
      },
    ],
    note: {
      en: 'Independent initiative. Not an official CETI product.',
      es: 'Iniciativa independiente. No es un producto oficial del CETI.',
    },
  },

  /* ================================================================ *
   * ACREDITA-BACH
   * ================================================================ */
  {
    slug: 'acredita-bach',
    name: 'ACREDITA-BACH',
    category: 'education',
    weight: 'standard',
    depth: 'note',
    year: '2026',
    kind: { en: 'Study engine · JavaScript', es: 'Motor de estudio · JavaScript' },
    status: { en: 'Runs entirely in the browser · open repository', es: 'Corre entero en el navegador · repositorio abierto' },
    statusTone: 'complete',
    thesis: {
      en: 'A daily study plan for the national high-school accreditation exam in México, built around one rule: nothing is asked before it has been taught.',
      es: 'Un plan de estudio diario para el examen nacional de acreditación del bachillerato en México, construido alrededor de una regla: nada se pregunta antes de haberse enseñado.',
    },
    why: {
      en: 'Generic study apps drop a syllabus into a quiz engine. This one is shaped by the exam itself — its seven areas, its 177 topics and the real length of its two sessions.',
      es: 'Las apps de estudio genéricas meten un temario en un motor de cuestionarios. Esta está moldeada por el propio examen — sus siete áreas, sus 177 temas y la duración real de sus dos sesiones.',
    },
    proof: [
      {
        en: '7 areas · 177 topics · 1,032 cards · 1,708 written questions.',
        es: '7 áreas · 177 temas · 1,032 tarjetas · 1,708 reactivos escritos.',
      },
      {
        en: 'Automated checks fail the build if a question can appear before its lesson.',
        es: 'Las comprobaciones automáticas fallan si una pregunta puede aparecer antes que su lección.',
      },
    ],
    points: [
      {
        title: { en: 'Teach, then ask.', es: 'Enseñar, luego preguntar.' },
        body: {
          en: 'New material arrives explained with a single button; the questions come later, with the exam’s format. Spaced repetition decides when each card comes back.',
          es: 'El material nuevo llega explicado con un solo botón; las preguntas vienen después, con el formato del examen. La repetición espaciada decide cuándo regresa cada tarjeta.',
        },
      },
      {
        title: { en: 'Simulations with the exam’s real shape.', es: 'Simulacros con la forma real del examen.' },
        body: {
          en: 'Full mock sessions of 106 and 99 questions with their real time limits, including the unscored pilot block, which is discounted when grading.',
          es: 'Simulacros completos de 106 y 99 reactivos con sus tiempos reales, incluido el bloque piloto que no puntúa y que se descuenta al calificar.',
        },
      },
    ],
    tags: ['javascript', 'education'],
    links: [{ label: L.repo, href: `${GH}/study-acreditabach` }],
    figures: [
      {
        media: 'acredita-today',
        zoom: 'md',
        alt: {
          en: 'The Today screen: 32 minutes split into 15 review cards, 2 new topics and 10 exam-format questions, with a warning that Mathematics is the area at risk.',
          es: 'La pantalla Hoy: 32 minutos repartidos en 15 tarjetas de repaso, 2 temas nuevos y 10 reactivos con formato de examen, con el aviso de que Matemáticas es el área en riesgo.',
        },
        caption: {
          en: 'A real study day with eight days of use behind it. The app has already decided what today holds, and why.',
          es: 'Una jornada real con ocho días de uso detrás. La app ya decidió qué toca hoy, y por qué.',
        },
      },
      {
        media: 'acredita-lesson',
        zoom: 'md',
        alt: {
          en: 'Step 16 of 32: a new topic arrives with its explanation and a single “got it” button.',
          es: 'Paso 16 de 32: un tema nuevo llega con su explicación y un solo botón de «ya entendí».',
        },
        caption: {
          en: 'Step 16 of 32 — first it is explained.',
          es: 'Paso 16 de 32 — primero se explica.',
        },
      },
      {
        media: 'acredita-item',
        zoom: 'md',
        alt: {
          en: 'Step 22 of 32: an exam-format question with a calculator available and an immediate explanation.',
          es: 'Paso 22 de 32: un reactivo con el formato del examen, calculadora disponible y explicación inmediata.',
        },
        caption: {
          en: 'Step 22 of 32 — then it is asked, in the exam’s format.',
          es: 'Paso 22 de 32 — después se pregunta, con el formato del examen.',
        },
      },
    ],
    note: {
      en: 'Independent study tool. Not affiliated with or endorsed by Ceneval, and it does not guarantee results.',
      es: 'Herramienta de estudio independiente. Sin afiliación ni respaldo del Ceneval, y no garantiza resultados.',
    },
  },

  /* ================================================================ *
   * Ennard
   * ================================================================ */
  {
    slug: 'ennard',
    name: 'Ennard',
    category: 'ai',
    weight: 'major',
    depth: 'breakdown',
    year: '2026',
    kind: { en: 'Personal AI assistant · Python · Linux', es: 'Asistente personal de IA · Python · Linux' },
    status: {
      en: 'Private repository · installed and running on my own Linux machine',
      es: 'Repositorio privado · instalado y corriendo en mi propia máquina Linux',
    },
    statusTone: 'active',
    thesis: {
      en: 'A personal assistant that lives on my machine: it can look at things freely, but must ask before changing anything — and it speaks up on its own when a command fails and it thinks it matters.',
      es: 'Un asistente personal que vive en mi máquina: puede mirar libremente, pero tiene que preguntar antes de cambiar nada — y habla por su cuenta cuando un comando falla y cree que importa.',
    },
    why: {
      en: 'An assistant is useful when it already knows what you were doing, and dangerous when it can act without asking. Ennard is built around that split, and around not spending money on every typo.',
      es: 'Un asistente es útil cuando ya sabe qué estabas haciendo, y peligroso cuando puede actuar sin preguntar. Ennard está construido alrededor de esa división, y de no gastar dinero en cada typo.',
    },
    proof: [
      {
        en: '22 tools: reading is automatic, anything that changes the disk or leaves the machine needs approval.',
        es: '22 herramientas: leer es automático; cualquier cosa que cambie el disco o salga de la máquina necesita aprobación.',
      },
      {
        en: 'A small local model filters failures for free; the paid model is rationed to one call every ten minutes.',
        es: 'Un modelo local pequeño filtra los fallos gratis; el modelo de pago se raciona a una llamada cada diez minutos.',
      },
    ],
    points: [
      {
        title: { en: 'Looking never interrupts.', es: 'Mirar nunca interrumpe.' },
        body: {
          en: 'Reading files, searching, checking git or the system happen without asking. Writing, deleting, running a shell command or going to the internet always stop and ask, with the exact action in front of you.',
          es: 'Leer archivos, buscar, revisar git o el sistema ocurre sin preguntar. Escribir, borrar, ejecutar un comando o salir a internet siempre se detiene y pregunta, con la acción exacta delante.',
        },
      },
      {
        title: { en: 'Memory that knows what kind of thing it knows.', es: 'Memoria que sabe qué tipo de cosa sabe.' },
        body: {
          en: 'Long-term memory marks each entry as a fact you told it, a preference, its own inference that might be wrong, something retrieved, or an open question.',
          es: 'La memoria a largo plazo marca cada entrada como un hecho que le dijiste, una preferencia, una inferencia suya que puede estar mal, algo recuperado o una pregunta abierta.',
        },
      },
    ],
    tags: ['python', 'ai', 'linux'],
    links: [],
    privateRepo: true,
    figures: [],
  },

  /* ================================================================ *
   * cesarmanzocode-rice
   * ================================================================ */
  {
    slug: 'cesarmanzocode-rice',
    name: 'cesarmanzocode-rice',
    category: 'environment',
    weight: 'minor',
    depth: 'note',
    year: '2026',
    kind: { en: 'Hyprland environment · Bash · Lua', es: 'Entorno Hyprland · Bash · Lua' },
    status: { en: 'Open repository', es: 'Repositorio abierto' },
    statusTone: 'complete',
    thesis: {
      en: 'My Linux desktop as a reusable, reproducible install — with themes, behaviour and personal preferences kept apart.',
      es: 'Mi escritorio Linux como una instalación reutilizable y reproducible — con temas, comportamiento y preferencias personales separados.',
    },
    why: {
      en: 'Dotfiles usually mix everything together, so changing a theme breaks a keybind and pulling updates overwrites your settings.',
      es: 'Los dotfiles suelen mezclarlo todo, así que cambiar un tema rompe un atajo y bajar actualizaciones sobrescribe tu configuración.',
    },
    proof: [
      {
        en: 'Dry-run mode, automatic backups and validation scripts.',
        es: 'Modo de simulación, respaldos automáticos y scripts de validación.',
      },
    ],
    points: [],
    tags: ['linux'],
    links: [{ label: L.repo, href: `${GH}/cesarmanzocode-rice` }],
    figures: [],
  },
];

/** The five projects on Home, in order. Chosen for breadth and clarity, not complexity. */
export const HOME_SLUGS = ['thalyx', 'ferrol', 'indice-cero', 'orux', 'supadiff'] as const;

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function projectsIn(category: CategoryId): Project[] {
  return PROJECTS.filter((p) => p.category === category);
}

export function homeProjects(): Project[] {
  return HOME_SLUGS.map((s) => {
    const p = getProject(s);
    if (!p) throw new Error(`Home project not found: ${s}`);
    return p;
  });
}
