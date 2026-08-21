export type Lang = 'en' | 'es';

/* -------------------------------------------------------------------- *
 * Shapes. Each project gets the fields its own story needs, rather than
 * one Project type that forces six identical cards.
 * -------------------------------------------------------------------- */

export type Link = { label: string; href: string };

export type Head = {
  n: string;
  name: string;
  kind: string;
  status: string;
  lede: string;
  links: Link[];
};

export type Point = { title: string; body: string };

export type SiteContent = {
  nav: { work: string; about: string; contact: string };
  a11y: { language: string; skip: string; menu: string; toIndex: string; swipe: string };
  meta: { title: string; description: string };

  hero: {
    name: string;
    role: string;
    place: string;
    headline: string;
    lead: string;
    indexLabel: string;
    indexHint: string;
    available: string;
  };

  index: { n: string; name: string; kind: string; blurb: string; href: string }[];

  work: { eyebrow: string; title: string; note: string };

  thalyx: Head & {
    quote: string;
    points: Point[];
    evidenceLabel: string;
    evidence: { when: string; what: string }[];
    honest: string;
    figures: { authorisation: string; architecture: string; atomic: string };
  };

  orux: Head & {
    flowCaption: string;
    steps: { n: string; title: string; body: string; alt: string }[];
    underneath: Point;
    omitted: Point;
  };

  ferrol: Head & {
    points: Point[];
    figures: { desktop: string; category: string; mobile: string };
    captureNote: string;
  };

  secondaryLabel: string;

  acredita: Head & {
    points: Point[];
    figures: { today: string; syllabus: string };
  };

  studymation: Head & {
    points: Point[];
    pipelineLabel: string;
    pipeline: { step: string; title: string; body: string }[];
    stackLabel: string;
    stack: string;
  };

  cpp: Head & {
    points: Point[];
    curriculumLabel: string;
    curriculum: string[];
    exercise: {
      label: string;
      unit: string;
      title: string;
      brief: string;
      code: string;
      casesLabel: string;
      cases: { stdin: string; stdout: string; note: string }[];
      note: string;
    };
  };

  more: { text: string; link: Link };

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

  footer: { built: string; rights: string };
};

const EMAIL = 'cesarmanzocode@gmail.com';
const GITHUB = 'https://github.com/CesarManzoCode';
const LINKEDIN = 'https://www.linkedin.com/in/c%C3%A9sar-alberto-manzo-olivares-b503383b8/';

const REPO = {
  thalyx: 'https://github.com/CesarManzoCode/thalyx',
  thalyxStatus: 'https://github.com/CesarManzoCode/thalyx/blob/main/docs/STATUS.md',
  orux: 'https://github.com/CesarManzoCode/orux',
  acredita: 'https://github.com/CesarManzoCode/study-acreditabach',
  studymation: 'https://github.com/CesarManzoCode/Studymation',
  cpp: 'https://github.com/CesarManzoCode/cpp-ceti',
  cppSite: 'https://cpp-ceti.vercel.app',
};

/* ==================================================================== *
 * English
 * ==================================================================== */
const en: SiteContent = {
  nav: { work: 'Work', about: 'About', contact: 'Contact' },
  a11y: {
    language: 'Language',
    skip: 'Skip to content',
    menu: 'Menu',
    toIndex: 'Jump to project',
    swipe: 'Swipe the image to see all of it',
  },
  meta: {
    title: 'César Manzo — Software Engineer',
    description:
      'Software engineer in Guadalajara, México. An experimental operating system in Rust, a real-time coordination layer over Git, and the catalogue and pricing platform a hardware store runs on.',
  },

  hero: {
    name: 'César Manzo',
    role: 'Software engineer',
    place: 'Guadalajara, México',
    headline: 'I build systems, and I finish them.',
    lead:
      'An experimental operating system in Rust that boots on real hardware. A real-time coordination layer that sits on top of an actual Git repository. The catalogue and price engine a hardware store works its counter from. Different problems, one habit: design it, build all of it, and keep the evidence that it runs.',
    indexLabel: 'The work',
    indexHint: 'Six projects · 2026',
    available: 'Open to new work — remote or in Guadalajara.',
  },

  index: [
    {
      n: '01',
      name: 'Thalyx',
      kind: 'Operating system · Rust',
      blurb: 'An OS whose automation is a first-class citizen and is never trusted.',
      href: '#thalyx',
    },
    {
      n: '02',
      name: 'Orux',
      kind: 'Real-time collaboration · Python · TypeScript',
      blurb: 'Presence down to the line, ownership, and a warning before you break someone.',
      href: '#orux',
    },
    {
      n: '03',
      name: 'Ferrol',
      kind: 'Commercial platform · TypeScript',
      blurb: '12,851 articles, a price engine and trade accounts for a hardware store.',
      href: '#ferrol',
    },
    {
      n: '04',
      name: 'ACREDITA-BACH',
      kind: 'Study platform · JavaScript',
      blurb: 'The syllabus of a national exam, turned into a daily plan.',
      href: '#acredita',
    },
    {
      n: '05',
      name: 'Studymation',
      kind: 'Document platform · Python',
      blurb: 'Requirements in; a formatted document with verified sources out.',
      href: '#studymation',
    },
    {
      n: '06',
      name: 'C++ CETI',
      kind: 'Teaching platform · TypeScript',
      blurb: 'Ten units of C++ you write, run and get corrected on in the browser.',
      href: '#cpp',
    },
  ],

  work: {
    eyebrow: 'Selected work',
    title: 'Six systems, and the evidence',
    note: 'Screenshots and diagrams on this page come from the projects themselves — real runs and real captures, not mock-ups.',
  },

  thalyx: {
    n: '01',
    name: 'Thalyx',
    kind: 'Operating system · Rust · 2026',
    status: 'In development · Phase 1 closed on real hardware',
    lede:
      'An operating system where the automation is a first-class citizen rather than an application — and the one component that is never trusted. The Linux kernel is a piece Thalyx manages, not a host it rests on.',
    links: [
      { label: 'Repository', href: REPO.thalyx },
      { label: 'What is proven, and what is not', href: REPO.thalyxStatus },
    ],
    quote: 'Everything the agent can do, a human can do directly — without it, and without losing capability.',
    points: [
      {
        title: 'The agent proposes. It executes nothing.',
        body: 'It sits outside the trusted computing base: it cannot run anything, cannot compose the prompt you authorise against, and cannot let text it has read decide what happens. The core recomputes the signature digest itself and revalidates everything the agent produced. The assumption is that a model will eventually be talked into something — the design makes that survivable.',
      },
      {
        title: 'The human route is complete and independent.',
        body: 'No login, because there is nobody else to be. No shell, because what is not a word the session knows does not exist. Nothing you can do only by asking. A system where the automation is the only way to get things done is a worse system, not a better one.',
      },
      {
        title: 'A permission becomes kernel policy.',
        body: 'A grant is not a promise userspace keeps to itself. It becomes a bit in a BPF map, loaded by Thalyx’s own loader — no libbpf, no bpftool, no second file on disk — and what was not granted is refused inside the kernel. A module gets its own uid, its own root filesystem, a seccomp filter and a cgroup, and no terminal: everything it says reaches you through Thalyx, labelled.',
      },
      {
        title: 'Installs commit atomically, or not at all.',
        body: 'Killed with SIGABRT between the directory rename and the symlink swap — no unwinding, no cleanup — nothing ends up half-installed. The store reports exactly what it is holding: one unresolved intent, one inert orphan. The retry succeeds.',
      },
    ],
    evidenceLabel: 'Evidence',
    evidence: [
      {
        when: '2026-08-07',
        what: 'A PC booted Thalyx from USB through its own firmware, drove HDMI and a real xHCI keyboard, installed itself onto a second disk, and booted again without the medium.',
      },
      {
        when: '2026-08-10',
        what: 'verify.sh on that machine: 143 proven, 2 not proven, 1 failed. The LSM denied a real network connection to the process that lacked the permission — and only to that one.',
      },
      {
        when: 'Test suite',
        what: 'Over 1,100 tests, including fault injection that kills the real binary at each point of the atomic commit, and unattended end-to-end runs of the whole walkthrough.',
      },
    ],
    honest:
      'The project’s working rule is that a claim you cannot check is not a claim. verify.sh never counts a check it could not make as a pass: it prints NOT PROVEN with the reason. What is still unproven is published next to what is — the filesystem watcher has never been loaded by Thalyx’s own loader, and no tier of the language model abstained even once, which the design calls the most important measurement it has.',
    figures: {
      authorisation:
        'A real run: installing a signed module. The core draws the authorisation frame itself, from the module’s signed manifest — the agent cannot compose it, reword it, or show you a subset of it.',
      architecture:
        'Two routes reach the core; only the human one is complete, and only the core is trusted. Grants leave userspace and become policy inside the kernel.',
      atomic:
        'The atomic commit, killed with SIGABRT at its most dangerous instant. Nothing is half-installed, the store says exactly what it holds, and the retry succeeds.',
    },
  },

  orux: {
    n: '02',
    name: 'Orux',
    kind: 'Real-time collaboration · Python · TypeScript · 2026',
    status: 'Reached production at orux.space and was shut down. The repository is the finished product, kept as an engineering record; all of it still runs locally.',
    lede:
      'Git understands files, lines and commits. Teams work with responsibilities, dependencies and coordination. Orux is the layer in between: the safety that branches, pull requests and reviews give you, without the ceremony — because the system already knows what everybody else is doing, and nobody had to ask it.',
    links: [{ label: 'Repository', href: REPO.orux }],
    flowCaption:
      'How a change actually moves. Whether the file is yours decides what your edit means; Ctrl+S is the checkpoint, not every keystroke; and everyone it affects is told before the break exists.',
    steps: [
      {
        n: '1',
        title: 'Ownership decides what an edit means — not whether you may make it.',
        body: 'If the file is yours, what you type applies live and everyone sees it land. If it is someone else’s, the editor quietly goes into proposal mode: you keep typing, the change stays local, and Ctrl+S sends it to the owner as a diff. Nobody is stopped before they try — that is the difference between a coordination tool and a permissions system.',
        alt: 'The Orux editor in proposal mode: Kai is typing into a file Ana owns, the changed lines are marked as a local draft, and Ana’s live cursor sits on line 25.',
      },
      {
        n: '2',
        title: 'Ctrl+S runs a real impact analysis, and tells the people it affects.',
        body: 'When a save changes a symbol’s surface, Orux works out who actually uses it and notifies those owners with a severity — not “this file was touched”, but “this function you depend on changed shape”. Four languages and four tiers, deepest available per file: LSP resolves the fan-out, the language’s own parser or tree-sitter does detection, regex is the floor so nothing goes unanalysed. The client is told which tier answered, because a component that degrades silently is invisible in production.',
        alt: 'An incoming high-risk impact notice in the Orux editor: a function Kai’s file imports changed shape, with the affected folders marked in the file tree.',
      },
      {
        n: '3',
        title: 'The owner approves or rejects in one click.',
        body: 'The proposal arrives as a diff with a line count, an approve button and a reject button. No form, no workflow, no ceremony. Edit first, negotiate second, apply last.',
        alt: 'A proposal awaiting review in the Orux editor, shown as a diff with added lines highlighted and approve and reject buttons.',
      },
    ],
    underneath: {
      title: 'Underneath, a real Git repository',
      body: 'Each team’s workspace is an actual repo on disk. Status, commit, clone and push to the team branch all work from the browser, and user credentials are ephemeral — never stored. git clone is enough to walk away with everything, which is the point: Orux integrates with Git, it does not replace it, and it never traps the code in a format of its own.',
    },
    omitted: {
      title: 'What it deliberately does not do',
      body: 'No conflict resolution: the thesis is to prevent the collision, not to merge it afterwards — CRDTs were considered and rejected for the same reason. No offline mode, because shared live state is the foundation rather than a feature. No enforcement, no governance, no surveillance: everything is optional, and you can still push straight to main.',
    },
  },

  ferrol: {
    n: '03',
    name: 'Ferrol',
    kind: 'Catalogue, prices and requests · TypeScript · 2026',
    status: 'Private repository · stages 0–8 complete; the one open criterion is external — domain and VPS.',
    lede:
      'Software written against a business, not a spec. Ferreterías Ferrol, in Guadalajara, sells twelve thousand articles identified by measurement, key and brand, and neither a customer nor someone behind the counter had a way to find one. This is the catalogue, the price engine and the request channel that fixes that.',
    links: [],
    points: [
      {
        title: 'The real list, imported end to end',
        body: '12,851 articles, 12,769 of them published across fifteen categories, brought in by a guided import that reads the files the business actually keeps — not a clean fixture invented for the demo.',
      },
      {
        title: 'A price engine with lists and trade accounts',
        body: 'Prices are derived from cost with per-list rules, and a trade account signs in to see its own. Money is exact by contract, and private prices are isolated from the public cache so a logged-in customer’s rates can never leak into someone else’s page.',
      },
      {
        title: 'No checkout, on purpose',
        body: 'V1 does not process payments. The customer builds a request and it leaves through WhatsApp with a folio already registered — which is how the shop already sells. Software that fights how a business works loses.',
      },
      {
        title: 'It works when the browser does not cooperate',
        body: 'With JavaScript disabled, searching, filtering by URL and opening an article all still work. Nothing overflows horizontally at 390, 768 or 1440 px, the console is clean, and a full page load measured between 111 and 400 ms against the production build.',
      },
    ],
    figures: {
      desktop: 'The catalogue home: one search field over twelve thousand articles, and the category tree underneath.',
      category: 'A branch with 2,597 articles: filters by brand and availability, key, unit and reference price per row.',
      mobile: 'The same home at 390 px. The phone is where the counter actually reads it.',
    },
    captureNote:
      'Captured against the production build with Ferrol’s real list loaded. The margin is a trial figure, not the shop’s.',
  },

  secondaryLabel: 'Also built',

  acredita: {
    n: '04',
    name: 'ACREDITA-BACH',
    kind: 'Study platform · JavaScript · 2026',
    status: 'Runs entirely in the browser · open repository',
    lede:
      'A daily study plan for the ACREDITA-BACH, the Ceneval exam that accredits high school in México. Not a generic study app with a syllabus dropped into it: it is built around that exam — its seven areas, its 177 topics, and the real physical load of its two sessions.',
    links: [{ label: 'Repository', href: REPO.acredita }],
    points: [
      {
        title: 'It teaches before it asks',
        body: 'New material is explained first and the question comes after. Active recall works on something you were given; a quiz on material nobody taught you is just a score.',
      },
      {
        title: 'Spaced repetition over real content',
        body: '1,032 cards and 1,708 items written against the official topic guidance, plus 45 topics whose problems are generated fresh every time — the numbers, data and context change while the level and exam format stay put.',
      },
      {
        title: 'An essential mode, on by default',
        body: '354 cards instead of 1,032, covering what the exam actually evaluates: roughly a third of the study time for the same coverage. Switching modes never erases anything — the extra cards keep their interval and come back.',
      },
      {
        title: 'Mocks with the exam’s real shape',
        body: '106 items in four and a half hours, then 99 in four. The pilot block that does not score is included, because the candidate cannot tell which items it is, and discounted when the result is computed.',
      },
      {
        title: 'Progress that cannot be lost',
        body: 'Guest mode keeps everything on the device. An account moves it to a server and merges rather than overwrites, so studying offline never costs you anything, and passwords are stretched with PBKDF2 before they ever leave the browser.',
      },
    ],
    figures: {
      today: 'The daily plan: what today is for, how long it takes, and which topics are new.',
      syllabus: 'The seven areas of the exam with their 177 topics, each carrying the weight it has in the real paper.',
    },
  },

  studymation: {
    n: '05',
    name: 'Studymation',
    kind: 'Document platform · Python · Next.js · 2026',
    status: 'Open repository',
    lede:
      'A student describes an assignment. The platform runs a guided flow to pull out what the work actually requires, builds the document, finds and checks the sources, and returns a .docx already in the institution’s format.',
    links: [{ label: 'Repository', href: REPO.studymation }],
    points: [
      {
        title: 'A pipeline, not a prompt',
        body: 'Four explicit steps, each with its own contract and its own failure mode. Sections are planned globally before they are written, then written in parallel, and the introduction and conclusion are produced from the summaries of what actually got written.',
      },
      {
        title: 'Sources are verified, or declared missing',
        body: 'Candidates are searched in Semantic Scholar and Crossref, ranked for relevance and inserted deterministically; the bibliography lists only the sources that were used. When nothing useful is found the step reports found = false rather than inventing a reference — the failure that would matter most to the person handing the work in.',
      },
      {
        title: 'Institutional formatting',
        body: 'Each school is a template: cover, logo, colours and body styles come from its own definition, so the output is a document that can be handed in rather than raw text somebody has to reformat.',
      },
      {
        title: 'Billing that binds the product',
        body: 'Subscriptions and prepaid credits through Stripe, with the plan’s page limit checked before generation starts and token cost recorded per document afterwards.',
      },
    ],
    pipelineLabel: 'The generation pipeline',
    pipeline: [
      { step: '01', title: 'Structure', body: 'Outline, intent, keywords and citation queries per section, against the school’s template.' },
      { step: '02', title: 'Content', body: 'Global plan, sections in parallel, then intro and conclusion from the real summaries.' },
      { step: '03', title: 'Citations', body: 'Search, rank, verify, insert. Nothing found is reported as nothing found.' },
      { step: '04', title: 'Assembly', body: 'The .docx itself: cover, styles, tables, lists and figures.' },
    ],
    stackLabel: 'Built with',
    stack: 'FastAPI · PostgreSQL · SQLAlchemy 2.0 · Alembic · Redis · Stripe · Next.js 15. The model layer is a provider abstraction — which one runs is configuration, not architecture.',
  },

  cpp: {
    n: '06',
    name: 'C++ CETI',
    kind: 'Teaching platform · TypeScript · 2026',
    status: 'Open repository',
    lede:
      'At the CETI in Guadalajara, C++ is taught by copying code onto a blackboard, and the platforms that do teach programming do not teach C++. Failing those subjects is a resource problem, not a laziness problem. This is the missing resource: ten units where you read something short, write the code yourself, run it, and are told exactly what failed.',
    links: [
      { label: 'Repository', href: REPO.cpp },
      { label: 'Open the platform', href: REPO.cppSite },
    ],
    points: [
      {
        title: '90% practice, 10% theory',
        body: 'Every concept is followed immediately by an exercise you type. The lesson is short because the point is what happens after it.',
      },
      {
        title: 'Your code is really compiled',
        body: 'The editor is Monaco — the one from VS Code — and what you write is compiled and run against test cases, so feedback is the output of your program rather than a checkbox someone wrote.',
      },
      {
        title: 'Progress that means something',
        body: 'Challenges with their own cases, quizzes, and XP tracked per unit, behind real accounts with email and Google sign-in.',
      },
    ],
    curriculumLabel: 'The course, as it stands',
    curriculum: [
      'Your first C++ program',
      'Reading input with cin',
      'Variables and data types',
      'Control flow',
      'Loops: repeating without writing it a hundred times',
      'Functions: packaging your code',
      'printf and scanf: the C way to print and read',
      'Arrays: many values in one variable',
      'Files: saving to and reading from disk',
      'Matrices: arrays in two dimensions',
    ],
    exercise: {
      label: 'One real exercise, from the course data',
      unit: 'Unit 05 · Loops · easy · 14 XP',
      title: 'Count from 1 to N',
      brief: 'Read an int n and print the numbers from 1 to n, one per line.',
      code: `#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  // for que imprima de 1 a n

  return 0;
}`,
      casesLabel: 'Test cases',
      cases: [
        { stdin: '5', stdout: '1 2 3 4 5', note: 'shown to the student' },
        { stdin: '1', stdout: '1', note: 'hidden' },
        { stdin: '10', stdout: '1 2 3 … 10', note: 'hidden' },
      ],
      note: 'The student gets the starter, writes the loop, and the submission is compiled and run against all three — including the two they cannot see. Hints exist, and none of them is the answer.',
    },
  },

  more: {
    text: 'There are more repositories — smaller tools, experiments and earlier versions of what is above. These six are the ones worth your time.',
    link: { label: 'github.com/CesarManzoCode', href: GITHUB },
  },

  about: {
    eyebrow: 'About',
    title: 'Who is building this',
    body: [
      'I’m César Manzo, a software engineer in Guadalajara, México. I gravitate to the part most projects skip: taking something from an idea to a thing that runs, survives being killed at the wrong moment, and can be checked by somebody who has no reason to trust me.',
      'That is why the six projects above look nothing like each other. An operating system, a collaboration layer, a hardware store’s catalogue and three pieces of teaching software share no stack. What they share is the working method: decide what the thing is for, build all of it — schema, service, interface, deployment — and keep the evidence that it does what it says.',
    ],
    practiceLabel: 'Where that work happens',
    practice: [
      { area: 'Systems', detail: 'Rust, Linux, BPF, filesystems, sandboxing, signed artifacts.' },
      { area: 'Backend', detail: 'Python and FastAPI, async services, PostgreSQL, schema and migrations.' },
      { area: 'Real time', detail: 'WebSocket state, presence, ownership, preventing collisions on shared state.' },
      { area: 'Product & interface', detail: 'TypeScript, React, Next.js, accessibility, and design that comes from the content.' },
      { area: 'Infrastructure', detail: 'Docker, Caddy and TLS, deployment, backups, restores that were actually run.' },
      { area: 'Correctness', detail: 'Exact monetary arithmetic, static analysis, tests, fault injection.' },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    body: 'Email is the fastest way to reach me — about a role, a project, or something above you want to ask about. I answer.',
    email: EMAIL,
    channels: [
      { label: 'GitHub', href: GITHUB },
      { label: 'LinkedIn', href: LINKEDIN },
    ],
    place: 'Guadalajara, Jalisco, México · available remotely',
  },

  footer: {
    built: 'Built with React, Vite and Tailwind. Type: Instrument Serif, Inter, JetBrains Mono.',
    rights: 'César Alberto Manzo Olivares',
  },
};

/* ==================================================================== *
 * Español
 * ==================================================================== */
const es: SiteContent = {
  nav: { work: 'Trabajo', about: 'Sobre mí', contact: 'Contacto' },
  a11y: {
    language: 'Idioma',
    skip: 'Saltar al contenido',
    menu: 'Menú',
    toIndex: 'Ir al proyecto',
    swipe: 'Desliza la imagen para verla completa',
  },
  meta: {
    title: 'César Manzo — Ingeniero de software',
    description:
      'Ingeniero de software en Guadalajara, México. Un sistema operativo experimental en Rust, una capa de coordinación en tiempo real sobre Git y el catálogo con motor de precios de una ferretería.',
  },

  hero: {
    name: 'César Manzo',
    role: 'Ingeniero de software',
    place: 'Guadalajara, México',
    headline: 'Construyo sistemas, y los termino.',
    lead:
      'Un sistema operativo experimental en Rust que arranca en hardware real. Una capa de coordinación en tiempo real montada sobre un repositorio Git de verdad. El catálogo y el motor de precios con los que una ferretería atiende el mostrador. Problemas distintos, una misma costumbre: diseñarlo, construirlo entero y guardar la evidencia de que funciona.',
    indexLabel: 'El trabajo',
    indexHint: 'Seis proyectos · 2026',
    available: 'Abierto a nuevos proyectos — en remoto o en Guadalajara.',
  },

  index: [
    {
      n: '01',
      name: 'Thalyx',
      kind: 'Sistema operativo · Rust',
      blurb: 'Un SO cuyo agente es ciudadano de primera y nunca es de fiar.',
      href: '#thalyx',
    },
    {
      n: '02',
      name: 'Orux',
      kind: 'Colaboración en tiempo real · Python · TypeScript',
      blurb: 'Presencia hasta la línea, ownership y un aviso antes de romperle el código a alguien.',
      href: '#orux',
    },
    {
      n: '03',
      name: 'Ferrol',
      kind: 'Plataforma comercial · TypeScript',
      blurb: '12,851 artículos, motor de precios y cuentas comerciales para una ferretería.',
      href: '#ferrol',
    },
    {
      n: '04',
      name: 'ACREDITA-BACH',
      kind: 'Plataforma de estudio · JavaScript',
      blurb: 'El temario de un examen nacional convertido en un plan diario.',
      href: '#acredita',
    },
    {
      n: '05',
      name: 'Studymation',
      kind: 'Plataforma de documentos · Python',
      blurb: 'Entran los requisitos; sale un documento con formato y fuentes verificadas.',
      href: '#studymation',
    },
    {
      n: '06',
      name: 'C++ CETI',
      kind: 'Plataforma de enseñanza · TypeScript',
      blurb: 'Diez unidades de C++ que escribes, ejecutas y te corrigen en el navegador.',
      href: '#cpp',
    },
  ],

  work: {
    eyebrow: 'Trabajo seleccionado',
    title: 'Seis sistemas, y la evidencia',
    note: 'Las capturas y diagramas de esta página salen de los propios proyectos: ejecuciones reales, no maquetas.',
  },

  thalyx: {
    n: '01',
    name: 'Thalyx',
    kind: 'Sistema operativo · Rust · 2026',
    status: 'En desarrollo · Fase 1 cerrada en hardware real',
    lede:
      'Un sistema operativo donde el agente es ciudadano de primera clase en vez de una aplicación — y, a la vez, lo único en lo que el sistema nunca confía. El kernel de Linux es una pieza que Thalyx administra, no un anfitrión sobre el que se apoya.',
    links: [
      { label: 'Repositorio', href: REPO.thalyx },
      { label: 'Qué está probado y qué no', href: REPO.thalyxStatus },
    ],
    quote: 'Todo lo que el agente puede hacer, una persona puede hacerlo directamente — sin él y sin perder capacidad.',
    points: [
      {
        title: 'El agente propone. No ejecuta nada.',
        body: 'Vive fuera de la base de cómputo confiable: no puede ejecutar, no puede redactar el aviso que autorizas ni dejar que un texto que leyó decida qué ocurre. El núcleo recalcula por su cuenta el digest de la firma y revalida todo lo que el agente produjo. Se da por hecho que al modelo, tarde o temprano, alguien lo va a convencer de algo; el diseño existe para que eso se pueda sobrevivir.',
      },
      {
        title: 'La vía humana es completa e independiente.',
        body: 'No hay login, porque no hay nadie más que ser. No hay shell: lo que no es una palabra que la sesión conoce, no existe. Nada que solo se pueda hacer pidiéndoselo al agente. Un sistema donde la automatización es la única forma de trabajar es un sistema peor, no mejor.',
      },
      {
        title: 'Un permiso se vuelve política del kernel.',
        body: 'Un permiso no es una promesa que el espacio de usuario se hace a sí mismo: se convierte en un bit de un mapa BPF, cargado por el propio loader de Thalyx — sin libbpf, sin bpftool, sin un segundo archivo en disco — y lo que no se concedió se niega dentro del kernel. Cada módulo recibe su uid, su raíz, un filtro seccomp y un cgroup, y no tiene terminal: lo que quiera decirte llega a través de Thalyx, etiquetado.',
      },
      {
        title: 'La instalación se confirma entera, o no ocurre.',
        body: 'Matada con SIGABRT entre el rename del directorio y el cambio del symlink — sin rebobinar, sin limpieza — nada queda a medio instalar. El almacén reporta exactamente lo que tiene: una intención sin resolver y un huérfano inerte. El reintento funciona.',
      },
    ],
    evidenceLabel: 'Evidencia',
    evidence: [
      {
        when: '2026-08-07',
        what: 'Una PC arrancó Thalyx desde USB con su propio firmware, usó HDMI y un teclado xHCI real, se instaló en un segundo disco y volvió a arrancar sin el medio de instalación.',
      },
      {
        when: '2026-08-10',
        what: 'verify.sh en esa misma máquina: 143 probados, 2 no probados, 1 fallido. El LSM negó una conexión de red real al proceso que no tenía el permiso — y solo a ese.',
      },
      {
        when: 'Pruebas',
        what: 'Más de 1,100 tests, con inyección de fallos que mata el binario real en cada punto del commit atómico y recorridos completos de principio a fin sin intervención.',
      },
    ],
    honest:
      'La regla de trabajo del proyecto es que una afirmación que no puedes comprobar no es una afirmación. verify.sh nunca cuenta como aprobada una verificación que no pudo hacer: imprime NOT PROVEN con el motivo. Lo que sigue sin probarse se publica junto a lo que sí — el vigilante del sistema de archivos nunca ha sido cargado por el loader de Thalyx, y ningún nivel del modelo se abstuvo ni una vez, que es la medición que el propio diseño considera la más importante.',
    figures: {
      authorisation:
        'Una ejecución real: instalar un módulo firmado. El núcleo dibuja el aviso de autorización por su cuenta, a partir del manifiesto firmado — el agente no puede redactarlo, reformularlo ni enseñarte solo una parte.',
      architecture:
        'Dos vías llegan al núcleo; solo la humana es completa, y solo el núcleo es de fiar. Los permisos salen del espacio de usuario y se vuelven política dentro del kernel.',
      atomic:
        'El commit atómico, matado con SIGABRT en su instante más peligroso. Nada queda a medias, el almacén dice exactamente qué tiene y el reintento funciona.',
    },
  },

  orux: {
    n: '02',
    name: 'Orux',
    kind: 'Colaboración en tiempo real · Python · TypeScript · 2026',
    status: 'Llegó a producción en orux.space y se apagó. El repositorio es el producto terminado, conservado como registro de ingeniería; todo sigue funcionando en local.',
    lede:
      'Git entiende de archivos, líneas y commits. Los equipos trabajan con responsabilidades, dependencias y coordinación. Orux es la capa intermedia: la seguridad que dan las ramas, los pull requests y las revisiones, sin la ceremonia — porque el sistema ya sabe qué está haciendo cada quien, y nadie tuvo que preguntárselo.',
    links: [{ label: 'Repositorio', href: REPO.orux }],
    flowCaption:
      'Cómo se mueve un cambio de verdad. Que el archivo sea tuyo decide qué significa tu edición; Ctrl+S es el punto de control, no cada tecla; y a quien le afecta se le avisa antes de que exista la ruptura.',
    steps: [
      {
        n: '1',
        title: 'El ownership decide qué significa una edición, no si puedes hacerla.',
        body: 'Si el archivo es tuyo, lo que escribes se aplica en vivo y todos lo ven aterrizar. Si es de otra persona, el editor entra en silencio en modo propuesta: sigues escribiendo, el cambio se queda local y Ctrl+S se lo manda al dueño como un diff. A nadie se le detiene antes de intentarlo — ahí está la diferencia entre una herramienta de coordinación y un sistema de permisos.',
        alt: 'El editor de Orux en modo propuesta: Kai escribe en un archivo de Ana, las líneas modificadas están marcadas como borrador local y el cursor de Ana está vivo en la línea 25.',
      },
      {
        n: '2',
        title: 'Ctrl+S corre un análisis de impacto de verdad, y avisa a quien le toca.',
        body: 'Cuando un guardado cambia la superficie de un símbolo, Orux calcula quién lo usa realmente y avisa a los dueños de esos archivos, con una severidad — no «se tocó este archivo», sino «esta función de la que dependes cambió de forma». Cuatro lenguajes y cuatro niveles, y por archivo corre el más profundo disponible: el LSP resuelve el fan-out, el parser del propio lenguaje o tree-sitter hacen la detección y la regex es el piso, para que ningún archivo se quede sin analizar. Al cliente se le dice qué nivel respondió, porque un componente que se degrada en silencio es invisible en producción.',
        alt: 'Un aviso de impacto de riesgo alto en el editor de Orux: una función que importa el archivo de Kai cambió de forma, con las carpetas afectadas marcadas en el árbol.',
      },
      {
        n: '3',
        title: 'El dueño aprueba o rechaza con un clic.',
        body: 'La propuesta llega como un diff con su conteo de líneas, un botón de aprobar y otro de rechazar. Sin formulario, sin flujo de trabajo, sin ceremonia. Editar primero, negociar después, aplicar al final.',
        alt: 'Una propuesta pendiente de revisión en el editor de Orux, mostrada como diff con las líneas añadidas resaltadas y botones de aprobar y rechazar.',
      },
    ],
    underneath: {
      title: 'Debajo, un repositorio Git real',
      body: 'El workspace de cada equipo es un repo de verdad en disco. Status, commit, clone y push a la rama del equipo funcionan desde el navegador, y las credenciales del usuario son efímeras: nunca se guardan. Con un git clone te llevas todo, que es justamente el punto — Orux se integra con Git, no lo reemplaza, y nunca encierra el código en un formato propio.',
    },
    omitted: {
      title: 'Lo que a propósito no hace',
      body: 'No resuelve conflictos: la tesis es evitar la colisión, no fusionarla después — los CRDT se consideraron y se descartaron por lo mismo. No hay modo sin conexión, porque el estado compartido en vivo es el cimiento y no una función. No hay enforcement, gobernanza ni vigilancia: todo es opcional, y puedes seguir haciendo push directo a main.',
    },
  },

  ferrol: {
    n: '03',
    name: 'Ferrol',
    kind: 'Catálogo, precios y solicitudes · TypeScript · 2026',
    status: 'Repositorio privado · etapas 0 a 8 completas; el único criterio abierto es externo: dominio y VPS.',
    lede:
      'Software escrito contra un negocio, no contra una especificación. Ferreterías Ferrol, en Guadalajara, vende doce mil artículos que se identifican por medida, clave y marca, y ni el cliente ni quien atiende el mostrador tenían forma de encontrar uno. Esto es el catálogo, el motor de precios y el canal de solicitudes que resuelven eso.',
    links: [],
    points: [
      {
        title: 'La lista real, importada de principio a fin',
        body: '12,851 artículos, 12,769 publicados en quince categorías, cargados con una importación guiada que lee los archivos que el negocio de verdad tiene — no un dataset limpio inventado para la demo.',
      },
      {
        title: 'Motor de precios con listas y cuentas comerciales',
        body: 'Los precios se derivan del costo con reglas por lista, y una cuenta comercial entra para ver los suyos. El dinero es exacto por contrato, y los precios privados están aislados de la caché pública: la tarifa de un cliente con sesión no puede filtrarse a la página de otro.',
      },
      {
        title: 'Sin checkout, a propósito',
        body: 'La V1 no cobra. El cliente arma su solicitud y se va por WhatsApp con un folio ya registrado, que es como la ferretería ya vende. El software que pelea contra la forma de trabajar de un negocio pierde.',
      },
      {
        title: 'Funciona aunque el navegador no coopere',
        body: 'Con JavaScript desactivado, buscar, filtrar por URL y abrir una ficha siguen funcionando. Ninguna página desborda horizontalmente a 390, 768 ni 1440 px, la consola está limpia y la carga completa se midió entre 111 y 400 ms contra el servidor de producción.',
      },
    ],
    figures: {
      desktop: 'El inicio del catálogo: un solo buscador sobre doce mil artículos y el árbol de categorías debajo.',
      category: 'Una rama con 2,597 artículos: filtros por marca y disponibilidad, y clave, unidad y precio de referencia en cada renglón.',
      mobile: 'El mismo inicio a 390 px. El teléfono es donde el mostrador realmente lo lee.',
    },
    captureNote:
      'Capturas tomadas contra el servidor de producción con la lista real de Ferrol cargada. El margen es de ensayo, no el de la ferretería.',
  },

  secondaryLabel: 'También construido',

  acredita: {
    n: '04',
    name: 'ACREDITA-BACH',
    kind: 'Plataforma de estudio · JavaScript · 2026',
    status: 'Corre entero en el navegador · repositorio abierto',
    lede:
      'Un plan de estudio diario para el ACREDITA-BACH, el examen del Ceneval con el que se acredita el bachillerato en México. No es una app de estudio genérica con un temario encima: está construida alrededor de ese examen — sus siete áreas, sus 177 temas y la carga física real de sus dos sesiones.',
    links: [{ label: 'Repositorio', href: REPO.acredita }],
    points: [
      {
        title: 'Enseña antes de preguntar',
        body: 'El material nuevo se explica primero y la pregunta viene después. La práctica activa funciona sobre algo que sí te dieron; un cuestionario sobre lo que nadie te enseñó solo es una calificación.',
      },
      {
        title: 'Repetición espaciada sobre contenido real',
        body: '1,032 tarjetas y 1,708 reactivos escritos contra las orientaciones oficiales del temario, más 45 temas cuyos problemas se generan distintos cada vez: cambian los números, los datos y el contexto, y se mantienen el nivel y el formato del examen.',
      },
      {
        title: 'Un modo esencial, activado de fábrica',
        body: '354 tarjetas en vez de 1,032, cubriendo lo que el examen sí evalúa: alrededor de un tercio del tiempo de estudio para la misma cobertura. Cambiar de modo no borra nada — las tarjetas de ampliación conservan su intervalo y regresan.',
      },
      {
        title: 'Simulacros con la forma real del examen',
        body: '106 reactivos en cuatro horas y media, y luego 99 en cuatro. El bloque piloto que no puntúa va incluido, porque el sustentante no puede distinguirlo, y se descuenta al calificar.',
      },
      {
        title: 'Progreso que no se pierde',
        body: 'El modo invitado guarda todo en el dispositivo. Una cuenta lo lleva al servidor y mezcla en vez de sobrescribir, así que estudiar sin conexión nunca cuesta nada, y la contraseña se estira con PBKDF2 antes de salir del navegador.',
      },
    ],
    figures: {
      today: 'El plan del día: para qué es hoy, cuánto tarda y qué temas son nuevos.',
      syllabus: 'Las siete áreas del examen con sus 177 temas, cada una con el peso que tiene en el examen real.',
    },
  },

  studymation: {
    n: '05',
    name: 'Studymation',
    kind: 'Plataforma de documentos · Python · Next.js · 2026',
    status: 'Repositorio abierto',
    lede:
      'Un estudiante describe el trabajo que le pidieron. La plataforma conduce un flujo guiado para sacar lo que el trabajo realmente exige, construye el documento, busca y comprueba las fuentes y devuelve un .docx ya con el formato de la institución.',
    links: [{ label: 'Repositorio', href: REPO.studymation }],
    points: [
      {
        title: 'Un pipeline, no un prompt',
        body: 'Cuatro pasos explícitos, cada uno con su contrato y su modo de fallar. Las secciones se planifican de forma global antes de escribirse, luego se escriben en paralelo, y la introducción y la conclusión se producen a partir de los resúmenes de lo que de verdad se escribió.',
      },
      {
        title: 'Las fuentes se verifican, o se declaran ausentes',
        body: 'Los candidatos se buscan en Semantic Scholar y Crossref, se ordenan por relevancia y se insertan de forma determinista; la bibliografía solo lista las fuentes que se usaron. Cuando no aparece nada útil, el paso reporta found = false en vez de inventar una referencia — que es justo el fallo que más le importaría a quien entrega el trabajo.',
      },
      {
        title: 'Formato institucional',
        body: 'Cada escuela es una plantilla: portada, logo, colores y estilos salen de su propia definición, así que lo que sale es un documento entregable y no un texto que alguien tenga que volver a formatear.',
      },
      {
        title: 'Cobro pegado al producto',
        body: 'Suscripciones y créditos de prepago por Stripe, con el límite de páginas del plan verificado antes de empezar a generar y el costo en tokens registrado por documento al terminar.',
      },
    ],
    pipelineLabel: 'El pipeline de generación',
    pipeline: [
      { step: '01', title: 'Estructura', body: 'Esquema, intención, palabras clave y consultas de cita por sección, contra la plantilla de la escuela.' },
      { step: '02', title: 'Contenido', body: 'Plan global, secciones en paralelo, e intro y conclusión desde los resúmenes reales.' },
      { step: '03', title: 'Citas', body: 'Buscar, ordenar, verificar, insertar. Lo que no se encontró se reporta como no encontrado.' },
      { step: '04', title: 'Ensamblado', body: 'El .docx: portada, estilos, tablas, listas y figuras.' },
    ],
    stackLabel: 'Construido con',
    stack: 'FastAPI · PostgreSQL · SQLAlchemy 2.0 · Alembic · Redis · Stripe · Next.js 15. La capa de modelos es una abstracción de proveedores: cuál corre es configuración, no arquitectura.',
  },

  cpp: {
    n: '06',
    name: 'C++ CETI',
    kind: 'Plataforma de enseñanza · TypeScript · 2026',
    status: 'Repositorio abierto',
    lede:
      'En el CETI de Guadalajara el C++ se enseña copiando código al pizarrón, y las plataformas que sí enseñan a programar no enseñan C++. Reprobar esas materias es un problema de recursos, no de flojera. Esto es ese recurso que falta: diez unidades donde lees algo corto, escribes tú el código, lo ejecutas y te dicen exactamente qué falló.',
    links: [
      { label: 'Repositorio', href: REPO.cpp },
      { label: 'Abrir la plataforma', href: REPO.cppSite },
    ],
    points: [
      {
        title: '90 % práctica, 10 % teoría',
        body: 'Cada concepto va seguido de inmediato por un ejercicio que tecleas. La lección es corta porque lo importante es lo que pasa después de ella.',
      },
      {
        title: 'Tu código se compila de verdad',
        body: 'El editor es Monaco — el de VS Code — y lo que escribes se compila y se ejecuta contra casos de prueba, así que la retroalimentación es la salida de tu programa y no una palomita que alguien escribió a mano.',
      },
      {
        title: 'Progreso que significa algo',
        body: 'Retos con sus propios casos, quizzes y XP por unidad, detrás de cuentas reales con correo e inicio de sesión con Google.',
      },
    ],
    curriculumLabel: 'El curso, tal como está',
    curriculum: [
      'Tu primer programa en C++',
      'Leer datos del usuario con cin',
      'Variables y tipos de datos',
      'Control de flujo',
      'Ciclos: repetir sin escribir cien veces',
      'Funciones: empaquetar tu código',
      'printf y scanf: la forma C de imprimir y leer',
      'Arreglos: muchos valores en una sola variable',
      'Archivos: guardar y leer datos del disco',
      'Matrices: arreglos en dos dimensiones',
    ],
    exercise: {
      label: 'Un ejercicio real, sacado del contenido del curso',
      unit: 'Unidad 05 · Ciclos · fácil · 14 XP',
      title: 'Contar de 1 a N',
      brief: 'Lee un int n e imprime los números del 1 a n, uno por línea.',
      code: `#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  // for que imprima de 1 a n

  return 0;
}`,
      casesLabel: 'Casos de prueba',
      cases: [
        { stdin: '5', stdout: '1 2 3 4 5', note: 'visible para el alumno' },
        { stdin: '1', stdout: '1', note: 'oculto' },
        { stdin: '10', stdout: '1 2 3 … 10', note: 'oculto' },
      ],
      note: 'El alumno recibe el esqueleto, escribe el ciclo y su envío se compila y se ejecuta contra los tres casos — incluidos los dos que no puede ver. Hay pistas, y ninguna de ellas es la respuesta.',
    },
  },

  more: {
    text: 'Hay más repositorios: herramientas pequeñas, experimentos y versiones anteriores de lo de arriba. Estos seis son los que valen tu tiempo.',
    link: { label: 'github.com/CesarManzoCode', href: GITHUB },
  },

  about: {
    eyebrow: 'Sobre mí',
    title: 'Quién construye esto',
    body: [
      'Soy César Manzo, ingeniero de software en Guadalajara, México. Me atrae la parte que casi todos los proyectos se saltan: llevar algo de idea a cosa que corre, que sobrevive a que la maten en el peor momento y que alguien sin motivos para confiar en mí puede comprobar.',
      'Por eso los seis proyectos de arriba no se parecen entre sí. Un sistema operativo, una capa de colaboración, el catálogo de una ferretería y tres piezas de software educativo no comparten stack. Lo que comparten es la forma de trabajar: decidir para qué es la cosa, construirla entera — esquema, servicio, interfaz, despliegue — y guardar la evidencia de que hace lo que dice.',
    ],
    practiceLabel: 'Dónde ocurre ese trabajo',
    practice: [
      { area: 'Sistemas', detail: 'Rust, Linux, BPF, sistemas de archivos, aislamiento, artefactos firmados.' },
      { area: 'Backend', detail: 'Python y FastAPI, servicios asíncronos, PostgreSQL, esquema y migraciones.' },
      { area: 'Tiempo real', detail: 'Estado por WebSocket, presencia, ownership, evitar colisiones sobre estado compartido.' },
      { area: 'Producto e interfaz', detail: 'TypeScript, React, Next.js, accesibilidad y diseño que sale del contenido.' },
      { area: 'Infraestructura', detail: 'Docker, Caddy y TLS, despliegue, respaldos y restauraciones que sí se ejecutaron.' },
      { area: 'Corrección', detail: 'Aritmética monetaria exacta, análisis estático, pruebas, inyección de fallos.' },
    ],
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Hablemos',
    body: 'El correo es la vía más rápida — por un puesto, un proyecto o algo de aquí arriba que quieras preguntar. Contesto.',
    email: EMAIL,
    channels: [
      { label: 'GitHub', href: GITHUB },
      { label: 'LinkedIn', href: LINKEDIN },
    ],
    place: 'Guadalajara, Jalisco, México · disponible en remoto',
  },

  footer: {
    built: 'Hecho con React, Vite y Tailwind. Tipografías: Instrument Serif, Inter, JetBrains Mono.',
    rights: 'César Alberto Manzo Olivares',
  },
};

export const content: Record<Lang, SiteContent> = { en, es };
