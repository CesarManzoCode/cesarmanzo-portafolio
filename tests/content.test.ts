/* Editorial invariants of the portfolio, checked on every `npm test`.
   Run with Node’s built-in test runner (type stripping, no extra deps). */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { CATEGORIES, PROJECTS, REST, SELECTED, SELECTION, ordered, type CategoryId, type Depth, type T } from '../src/data/projects.ts';
import * as EVIDENCE from '../src/data/evidence.ts';
import { TECH } from '../src/data/technical.ts';

const EXPECTED_CATEGORY: Record<string, CategoryId> = {
  thalyx: 'systems',
  'thalyx-kernel': 'systems',
  supakernel: 'systems',
  one: 'systems',
  supadiff: 'devtools',
  orux: 'devtools',
  ferrol: 'products',
  studymation: 'products',
  'indice-cero': 'education',
  'acredita-bach': 'education',
  ennard: 'ai',
  'cesarmanzocode-rice': 'environment',
};

const EXPECTED_DEPTH: Record<string, Depth> = {
  thalyx: 'deep',
  'thalyx-kernel': 'deep',
  supakernel: 'deep',
  supadiff: 'deep',
  ferrol: 'deep',
  orux: 'breakdown',
  'indice-cero': 'breakdown',
  studymation: 'breakdown',
  ennard: 'breakdown',
  one: 'research',
  'acredita-bach': 'note',
  'cesarmanzocode-rice': 'note',
};

test('the root presents exactly the five selected projects, in order', () => {
  assert.deepEqual([...SELECTED], ['thalyx', 'ferrol', 'indice-cero', 'orux', 'supadiff']);
  assert.deepEqual(SELECTION.map((s) => s.slug), [...SELECTED]);
  for (const s of SELECTION) assert.ok(s.against.en && s.against.es && s.verdict.en && s.verdict.es, `${s.slug}: selection copy`);
});

test('site order places every project exactly once: the selection first, then the rest', () => {
  assert.deepEqual([...SELECTED, ...REST].sort(), PROJECTS.map((p) => p.slug).sort());
  assert.equal(new Set([...SELECTED, ...REST]).size, PROJECTS.length);
  assert.deepEqual(ordered().slice(0, SELECTED.length).map((p) => p.slug), [...SELECTED]);
  for (const p of PROJECTS) {
    assert.ok(p.proof.length >= 1 && p.proof.length <= 3, `${p.slug}: 1–3 proof points`);
    for (const st of p.stats) assert.ok(st.value.trim() && st.label.en && st.label.es, `${p.slug}: stat`);
  }
});

/* The root page is built only from the selection. Its own modules may not
   reach for the whole collection, nor name any other project. */
test('nothing on the root page can present a project outside the selection', () => {
  const rootModules = ['src/pages/Home.tsx', 'src/components/Doors.tsx'];
  const others = PROJECTS.map((p) => p.slug).filter((slug) => !(SELECTED as readonly string[]).includes(slug));
  for (const f of rootModules) {
    const src = readFileSync(f, 'utf8');
    for (const banned of ['ordered(', 'projectsIn(', 'PROJECTS.map', 'PROJECTS.filter', 'REST', 'Atlas', 'AlsoCard'])
      assert.ok(!src.includes(banned), `${f}: uses ${banned}`);
    for (const slug of others) assert.ok(!new RegExp(`['"\`]${slug}['"\`]`).test(src), `${f}: names ${slug}`);
    for (const p of PROJECTS.filter((x) => others.includes(x.slug))) assert.ok(!src.includes(p.name), `${f}: names ${p.name}`);
  }
});

test('the chart datasets add up to the figures quoted in the copy', () => {
  const { THALYX_VERIFY, SUPAKERNEL_GATES, SUPADIFF_MATRIX, SUPADIFF_TARGETS, INDICE_COURSES, ACREDITA_AREAS, KERNEL_SCALING, ENNARD_TOOLS, FERROL_FUNNEL } = EVIDENCE;
  assert.deepEqual([THALYX_VERIFY.proven, THALYX_VERIFY.notProven, THALYX_VERIFY.failed], [156, 2, 0]);
  assert.equal(SUPAKERNEL_GATES.length, 22);
  assert.equal(SUPAKERNEL_GATES.filter((g) => g.result === 'pass').length, 20);
  assert.equal(SUPAKERNEL_GATES.filter((g) => g.result === 'artifact-only').length, 2);
  assert.equal(SUPADIFF_MATRIX.length, 27);
  assert.equal(SUPADIFF_TARGETS.length, 6);
  for (const r of SUPADIFF_MATRIX) assert.equal(r.levels.length, 6, r.cap);
  const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  assert.equal(sum(INDICE_COURSES.map((c) => c.units)), 56);
  assert.equal(sum(INDICE_COURSES.map((c) => c.lessons)), 276);
  assert.equal(sum(INDICE_COURSES.map((c) => c.practices)), 227);
  assert.equal(sum(ACREDITA_AREAS.map((a) => a.topics)), 177);
  assert.equal(ACREDITA_AREAS.length, 7);
  assert.equal(KERNEL_SCALING.split[3], 8518);
  assert.equal(KERNEL_SCALING.baseline[3], 1806);
  assert.equal(ENNARD_TOOLS.automatic + ENNARD_TOOLS.approval.length, 22);
  assert.equal(Math.round((1 - FERROL_FUNNEL.searches / FERROL_FUNNEL.products) * 100), FERROL_FUNNEL.saved);
});

test('every listed project exists, once, in its category', () => {
  assert.equal(new Set(PROJECTS.map((p) => p.slug)).size, PROJECTS.length);
  assert.deepEqual(PROJECTS.map((p) => p.slug).sort(), Object.keys(EXPECTED_CATEGORY).sort());
  for (const p of PROJECTS) assert.equal(p.category, EXPECTED_CATEGORY[p.slug], p.slug);
  for (const c of CATEGORIES) assert.ok(PROJECTS.some((p) => p.category === c.id), `empty category ${c.id}`);
});

test('technical depth matches the assigned level, one doc per project', () => {
  assert.equal(TECH.length, PROJECTS.length);
  for (const d of TECH) {
    const p = PROJECTS.find((x) => x.slug === d.slug);
    assert.ok(p, `tech doc without project: ${d.slug}`);
    assert.equal(d.depth, EXPECTED_DEPTH[d.slug], d.slug);
    assert.equal(p.depth, d.depth, `${d.slug}: project/tech depth disagree`);
  }
});

test('every deep dive keeps its negative results visible', () => {
  for (const d of TECH.filter((x) => x.depth === 'deep')) {
    const kinds = d.sections.map((s) => s.kind);
    assert.ok(
      kinds.some((k) => k === 'limitations' || k === 'notProven' || k === 'nonClaims'),
      `${d.slug}: no limitations / not-proven / non-claims section`,
    );
    assert.ok(d.caveat.en && d.caveat.es, `${d.slug}: caveat`);
  }
});

/* Collect every bilingual value, for language and wording checks. */
function bilingual(v: unknown, out: T[] = []): T[] {
  if (Array.isArray(v)) v.forEach((x) => bilingual(x, out));
  else if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    if (typeof o.en === 'string' && typeof o.es === 'string' && Object.keys(o).length === 2) out.push(o as T);
    else Object.values(o).forEach((x) => bilingual(x, out));
  }
  return out;
}

test('every bilingual string is filled in both languages', () => {
  for (const t of bilingual([PROJECTS, TECH, CATEGORIES, EVIDENCE, SELECTION])) {
    assert.ok(t.en.trim() && t.es.trim(), JSON.stringify(t));
  }
});

test('numbers agree between English and Spanish', () => {
  const nums = (s: string) => (s.match(/\d[\d.,]*/g) ?? []).map((n) => n.replace(/[.,]$/, '').replace(/,/g, ''));
  for (const t of bilingual([PROJECTS, TECH, SELECTION])) {
    assert.deepEqual(nums(t.es).sort(), nums(t.en).sort(), `${t.en}\n${t.es}`);
  }
});

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? sourceFiles(p) : /\.(ts|tsx|css|html)$/.test(f) ? [p] : [];
  });
}
const SOURCES = [...sourceFiles('src'), 'index.html', 'scripts/og.html'].map((f) => [f, readFileSync(f, 'utf8')] as const);

test('no stale or unsafe wording anywhere in the site', () => {
  const forbidden: [RegExp, string][] = [
    [/C\+\+\s?CETI/i, 'obsolete product name (now Índice Cero)'],
    [/1,300|1,100|1 300|1 100/, 'stale Thalyx test count'],
    [/143 proven|143 probados/, 'stale Thalyx hardware result'],
    [/github\.com\/CesarManzoCode\/(ferrol|ennard)/i, 'private repository URL'],
    [/\/home\/[a-z]/, 'personal filesystem path'],
    [/battle[- ]tested|production[- ]grade|blazing/i, 'adjective instead of evidence'],
    [/lorem ipsum|\bTODO\b|\bTBD\b/, 'placeholder copy'],
    [/IPC does not scale|a single machine-wide lock serializes/i, 'stale kernel claim (the lock was split after the K6 reference campaign)'],
  ];
  for (const [file, text] of SOURCES) {
    for (const [re, why] of forbidden) assert.ok(!re.test(text), `${file}: ${why} (${re})`);
  }
});

test('endorsement and proof disclaimers are present', () => {
  const note = (slug: string) => PROJECTS.find((p) => p.slug === slug)!.note;
  assert.match(note('indice-cero')!.en, /not an official CETI/i);
  assert.match(note('acredita-bach')!.en, /not affiliated.*Ceneval/i);
  assert.match(note('supadiff')!.en, /not affiliated.*Supabase/i);
  assert.match(note('supakernel')!.en, /not affiliated.*Supabase/i);
  const one = TECH.find((d) => d.slug === 'one')!;
  assert.match(one.caveat.en, /no implementation and no observed evidence/i);
});
