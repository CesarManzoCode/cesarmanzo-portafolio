/* ==================================================================== *
 * Evidence — the datasets behind the charts on the site.
 *
 * Every value is copied from a machine-readable or tabulated artifact in
 * the project's own public repository (path given per dataset). Charts
 * draw these values and nothing else; if the source changes, change it
 * here. Nothing is interpolated, smoothed or estimated.
 * ==================================================================== */

import type { T } from './projects';

const s = (en: string, es: string): T => ({ en, es });

/* -------------------------------------------------------------------- *
 * Thalyx — thalyx/README.md, docs/STATUS.md
 * `sudo ./dev/verify.sh` on real hardware.
 * -------------------------------------------------------------------- */
export const THALYX_VERIFY = { proven: 156, notProven: 2, failed: 0, date: '2026-08-25' };

/* -------------------------------------------------------------------- *
 * Thalyx-Kernel — README.md (phase table) and
 * vault/evidence/k6-comparison-hardening.md (campaign + lock split).
 * -------------------------------------------------------------------- */
export const KERNEL_PHASES: { id: string; what: T; gate: string; self?: string }[] = [
  { id: 'K1', what: s('Protected boot', 'Arranque protegido'), gate: '13/13' },
  { id: 'K2', what: s('Capability system', 'Sistema de capacidades'), gate: '21/21', self: '28/28' },
  { id: 'K3', what: s('SMP · 4 CPUs · virtio-blk', 'SMP · 4 CPUs · virtio-blk'), gate: '28/28', self: '57/57' },
  { id: 'K4', what: s('Durable versioned state', 'Estado durable versionado'), gate: '31/31', self: '48/48' },
  { id: 'K5', what: s('Thalyx port · llama.cpp', 'Port de Thalyx · llama.cpp'), gate: '47/47', self: '88/88' },
  { id: 'K6', what: s('17 benchmarks vs. Linux', '17 benchmarks contra Linux'), gate: '19/19 + 5', self: '27/27' },
];

/** `scale.ipc:N` — IPC round trips per 10 ms slice with N client/server pairs. */
export const KERNEL_SCALING = {
  pairs: [1, 2, 3, 4],
  /** Linux guest, reference campaign (6 rounds, KVM). */
  linux: [1516, 3031, 7410, 11912],
  /** This kernel, reference campaign: one machine-wide lock. */
  baseline: [2352, 1701, 1597, 1806],
  /** This kernel after the lock split (perf/ipc-scalability, 3 rounds). */
  split: [4608, 6362, 7797, 8518],
};

export type BenchClass = 'equivalent' | 'comparable' | 'distinct';

/** Reference campaign: native ÷ Linux median ratio, per benchmark row. */
export const KERNEL_RATIOS: { id: string; cls: BenchClass; ratio: number }[] = [
  { id: 'entry.version:0', cls: 'equivalent', ratio: 1.33 },
  { id: 'entry.clock:0', cls: 'equivalent', ratio: 0.796 },
  { id: 'ipc.call:0', cls: 'comparable', ratio: 0.407 },
  { id: 'ipc.call:64', cls: 'comparable', ratio: 0.411 },
  { id: 'ipc.call:256', cls: 'comparable', ratio: 0.416 },
  { id: 'ipc.caps:1', cls: 'comparable', ratio: 0.463 },
  { id: 'ipc.caps:4', cls: 'comparable', ratio: 0.574 },
  { id: 'mem.map:1', cls: 'comparable', ratio: 4.73 },
  { id: 'mem.map:64', cls: 'comparable', ratio: 0.451 },
  { id: 'mem.seal:16', cls: 'comparable', ratio: 0.776 },
  { id: 'cap.derive:0', cls: 'comparable', ratio: 3.23 },
  { id: 'sched.wake:0', cls: 'equivalent', ratio: 4.43 },
  { id: 'quota.share:25', cls: 'equivalent', ratio: 1.05 },
  { id: 'scale.ipc:1', cls: 'comparable', ratio: 1.55 },
  { id: 'scale.ipc:2', cls: 'comparable', ratio: 0.562 },
  { id: 'scale.ipc:3', cls: 'comparable', ratio: 0.227 },
  { id: 'scale.ipc:4', cls: 'comparable', ratio: 0.151 },
  { id: 'scale.compute:1', cls: 'equivalent', ratio: 0.995 },
  { id: 'scale.compute:2', cls: 'equivalent', ratio: 0.995 },
  { id: 'scale.compute:3', cls: 'equivalent', ratio: 0.995 },
  { id: 'scale.compute:4', cls: 'equivalent', ratio: 0.982 },
  { id: 'closure.unit:0', cls: 'distinct', ratio: 0.59 },
  { id: 'engine.load:0', cls: 'comparable', ratio: 9.94 },
  { id: 'engine.infer:0', cls: 'equivalent', ratio: 1.1 },
  { id: 'engine.infer:1', cls: 'equivalent', ratio: 1.1 },
  { id: 'engine.infer:4', cls: 'equivalent', ratio: 1.11 },
  { id: 'engine.cancel:0', cls: 'distinct', ratio: 1.57 },
];

/* -------------------------------------------------------------------- *
 * SupaKernel — release/manifest.json (git abbbda3, 2026-09-07).
 * -------------------------------------------------------------------- */
export type GateResult = 'pass' | 'artifact-only' | 'blocked';

export const SUPAKERNEL_RELEASE = { git: 'abbbda3', date: '2026-09-07' };

export const SUPAKERNEL_GATES: { id: string; result: GateResult; hash: string }[] = [
  { id: 'build-reproducible', result: 'pass', hash: 'db4f48d29816' },
  { id: 'package-boundaries', result: 'pass', hash: '8c95e1bc4a0d' },
  { id: 'postgresql-support', result: 'pass', hash: 'f35de11961c7' },
  { id: 'sqlite-support', result: 'pass', hash: 'abb17f57ee26' },
  { id: 'pglite-support', result: 'pass', hash: '5a9032017692' },
  { id: 'runtime-portability', result: 'artifact-only', hash: '21431cfaa0e2' },
  { id: 'data-compatibility', result: 'pass', hash: '5c2086d7251e' },
  { id: 'auth-compatibility', result: 'pass', hash: 'd1bacecc800c' },
  { id: 'authorization', result: 'pass', hash: 'bdd6b87680a0' },
  { id: 'storage-compatibility', result: 'pass', hash: 'dacd7ceae13c' },
  { id: 'realtime-compatibility', result: 'pass', hash: '2fcb98b8004d' },
  { id: 'management-mcp', result: 'pass', hash: 'abde298c12f2' },
  { id: 'openapi-types', result: 'pass', hash: 'e140c6dd0f10' },
  { id: 'migrations', result: 'pass', hash: '513918372b4c' },
  { id: 'upgrade', result: 'pass', hash: 'd3bf60077aea' },
  { id: 'properties', result: 'pass', hash: 'ed277a562d47' },
  { id: 'semantic-mutation', result: 'pass', hash: '54a5957f7dd3' },
  { id: 'generated-mutation', result: 'artifact-only', hash: '26f2d9b81908' },
  { id: 'fault-recovery', result: 'pass', hash: '75212646a7a0' },
  { id: 'threat-redaction', result: 'pass', hash: '561f23db7e63' },
  { id: 'observability-replay', result: 'pass', hash: 'ee12a774a1bd' },
  { id: 'trace-audit', result: 'pass', hash: 'ee7d0513aa84' },
];

/** Evidence items outside the 22 release gates. */
export const SUPAKERNEL_EVIDENCE: { id: string; result: GateResult; hash: string }[] = [
  { id: 'bknd-performance', result: 'artifact-only', hash: '99d2e08edc1f' },
  { id: 'agent-dx', result: 'blocked', hash: 'd89e92e4a32e' },
  { id: 'external-ownership', result: 'blocked', hash: '38628548bde7' },
  { id: 'supalite-divergences', result: 'artifact-only', hash: '04e31e570bee' },
];

/* -------------------------------------------------------------------- *
 * SupaDiff — release-evidence/v1.0.0.json → targets[].capabilities[].
 * -------------------------------------------------------------------- */
export type CapLevel = 'exact' | 'approximate' | 'experimental' | 'unsupported' | 'none';

export const SUPADIFF_TARGETS = [
  'supabase-hosted',
  'supabase-local',
  'supalite-sqlite',
  'supalite-sqlite-postgres',
  'supalite-pglite',
  'supalite-postgres',
];

const E: CapLevel = 'exact';
const U: CapLevel = 'unsupported';
const X: CapLevel = 'experimental';
const A: CapLevel = 'approximate';
const N: CapLevel = 'none';

export const SUPADIFF_MATRIX: { cap: string; levels: CapLevel[] }[] = [
  { cap: 'auth.password.signin', levels: [E, E, U, E, E, E] },
  { cap: 'auth.password.signup', levels: [E, E, U, E, E, E] },
  { cap: 'auth.session.read', levels: [E, E, U, E, E, E] },
  { cap: 'auth.session.refresh', levels: [E, E, U, E, E, E] },
  { cap: 'auth.session.revoke', levels: [E, E, U, E, E, E] },
  { cap: 'auth.user.update', levels: [E, E, U, E, E, E] },
  { cap: 'cli.invoke', levels: [E, E, E, E, E, E] },
  { cap: 'cli.projectTree.read', levels: [E, E, E, E, E, E] },
  { cap: 'data.delete', levels: [E, E, E, E, E, E] },
  { cap: 'data.insert', levels: [E, E, E, E, E, E] },
  { cap: 'data.seed', levels: [E, E, E, E, E, E] },
  { cap: 'data.select', levels: [E, E, E, E, E, E] },
  { cap: 'data.update', levels: [E, E, E, E, E, E] },
  { cap: 'data.upsert', levels: [E, E, E, E, E, E] },
  { cap: 'execution.controlled-concurrency', levels: [U, U, U, U, U, U] },
  { cap: 'http.preflight', levels: [E, E, E, E, E, E] },
  { cap: 'migration.apply', levels: [E, E, E, E, E, E] },
  { cap: 'rls.emulated.with-check', levels: [U, U, U, A, U, U] },
  { cap: 'rls.native', levels: [E, E, U, U, E, E] },
  { cap: 'schema.apply', levels: [E, E, E, E, E, E] },
  { cap: 'schema.apply.declarative-pg-dialect', levels: [N, N, U, N, N, N] },
  { cap: 'schema.introspect', levels: [E, E, E, E, E, E] },
  { cap: 'storage.bucket.create', levels: [E, E, U, X, X, X] },
  { cap: 'storage.object.read', levels: [E, E, U, X, X, X] },
  { cap: 'storage.object.write', levels: [E, E, U, X, X, X] },
  { cap: 'storage.signed-url.create', levels: [E, E, U, X, X, X] },
  { cap: 'storage.signed-url.redeem', levels: [E, E, U, U, U, U] },
];

/* -------------------------------------------------------------------- *
 * Ferrol — private repository; figures from its documentation.
 * -------------------------------------------------------------------- */
export const FERROL_FUNNEL = { products: 12027, families: 1642, searches: 1800, saved: 85 };

/** The evidence rubric that decides whether an image result is kept. */
export const FERROL_RUBRIC: { signal: T; points: number }[] = [
  { signal: s('Part name', 'Nombre de la pieza'), points: 3 },
  { signal: s('Supplier key', 'Clave del proveedor'), points: 4 },
  { signal: s('Brand', 'Marca'), points: 2 },
  { signal: s('Attribute', 'Atributo'), points: 1 },
  { signal: s('Measure', 'Medida'), points: 1 },
  { signal: s('Other-world word', 'Palabra de otro mundo'), points: -4 },
];
export const FERROL_THRESHOLD = 3;
export const FERROL_TOR_SCORE = -12;

/* -------------------------------------------------------------------- *
 * Índice Cero — cpp-ceti/README.md (course table).
 * -------------------------------------------------------------------- */
export const INDICE_COURSES: { name: T; lang: string; units: number; published?: number; lessons: number; practices: number }[] = [
  { name: s('C++ from zero', 'C++ desde cero'), lang: 'C++', units: 10, lessons: 67, practices: 80 },
  { name: s('Object-oriented programming', 'Programación orientada a objetos'), lang: 'C#', units: 16, published: 14, lessons: 73, practices: 64 },
  { name: s('Development models and methods', 'Modelos y métodos de desarrollo'), lang: 'C#', units: 10, lessons: 44, practices: 32 },
  { name: s('Databases', 'Bases de datos'), lang: 'SQL', units: 20, lessons: 92, practices: 51 },
];

/* -------------------------------------------------------------------- *
 * ACREDITA-BACH — the seven areas and their topics, as the app lists
 * them (docs/media/areas-y-calendario.png); they sum to the 177 topics
 * of the official guide.
 * -------------------------------------------------------------------- */
export const ACREDITA_AREAS: { name: T; topics: number; color: string }[] = [
  { name: s('Mathematics', 'Matemáticas'), topics: 30, color: '#2f5fd0' },
  { name: s('Digital culture', 'Cultura digital'), topics: 18, color: '#127a80' },
  { name: s('History', 'Historia'), topics: 21, color: '#8c5a12' },
  { name: s('Humanities', 'Humanidades'), topics: 20, color: '#8a3f86' },
  { name: s('Natural sciences', 'Ciencias naturales'), topics: 32, color: '#3f7a35' },
  { name: s('Language & communication', 'Lengua y comunicación'), topics: 31, color: '#b0412e' },
  { name: s('Social sciences', 'Ciencias sociales'), topics: 25, color: '#6547b0' },
];

/* -------------------------------------------------------------------- *
 * Ennard — private repository; tool policy from its documentation.
 * -------------------------------------------------------------------- */
export const ENNARD_TOOLS = {
  automatic: 15,
  approval: ['write_file', 'edit_file', 'move_path', 'delete_path', 'http_fetch', 'forget', 'run_shell'],
};
