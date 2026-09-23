# cesarmanzo-portafolio

Portfolio of César Alberto Manzo Olivares — software engineer, Guadalajara, México.

The site is built around one idea: **the work should be visible before anyone has to read about it.**
Every project is a *room* painted with the palette of its own captures and led by what it actually
produced — a terminal frame, a storefront, a compiler’s verdict, a benchmark curve, a matrix of
release gates. An operating system, a hardware store and a classroom never share a treatment.

| Route | What it is |
|---|---|
| `/` | The headline, the range as an index, a wall of real captures — then seven rooms, the smaller ones, the method, contact |
| `/projects` | Index of every project by kind, each row in its own palette |
| `/projects/:slug` | One continuous descent: the room at full size → the plain story → captures → the **engineering record** (architecture, invariants, trust boundaries, measurements, failures, limitations, what is not proven, how to reproduce) |
| `/technical` | Evidence ledger: every project’s strongest measured result next to its main limitation |
| `/technical/:slug` | Kept for old links: opens the project page at its engineering record |
| `/about` | Who, where the work happens, the loop, contact |

Bilingual (English / Spanish), English by default.

## Content

All project content lives in `src/data/` and nowhere else:

- `projects.ts` — projects, categories, room stats, `EXHIBIT` (the seven Home rooms) and `ALSO`.
- `technical.ts` — one engineering record per project, at the depth it has earned. A section only exists when there is evidence for it.
- `evidence.ts` — the datasets the charts draw, each copied from a machine-readable or tabulated artifact in the project’s own public repository (path noted per dataset): Thalyx’s hardware verify run, the Thalyx-Kernel K6 campaign and lock-split measurements, SupaKernel’s `release/manifest.json`, SupaDiff’s `release-evidence/v1.0.0.json`, Índice Cero’s course table, ACREDITA-BACH’s areas.
- `media.ts` — image keys → files in `src/assets/work/`, with intrinsic sizes.

Interface copy is in `src/i18n/content.ts`. Private repositories (Ferrol, Ennard) are described from
their documentation — no source links, code, keys or private data.

`npm test` checks the editorial invariants: every project placed exactly once, each in its category
and at its technical depth; deep dives keep a limitations / not-proven section; both languages filled
and carrying the same numbers; chart datasets add up to the figures quoted in the copy (22 gates, 27×6
capabilities, 56 units, 177 topics…); disclaimers present; and no stale or private wording.

## Design system

- **Type:** Archivo (variable, weight 100–900 and width 62–125 %) — pushed narrow and heavy for names and numbers, wide and small for labels, left alone for reading — plus JetBrains Mono for anything a machine produced. Self-hosted, latin + latin-ext.
- **Colour:** the site’s own surfaces are neutral (bone paper, ink). Each room’s palette is lifted from the project’s captures (`.room-<slug>` in `src/styles/index.css`); the engineering record shares one dark ground so technical readers find the same structure everywhere.
- **Motion:** each chart has one meaningful motion — a verify run filling in, a benchmark line drawing itself — driven by a single `IntersectionObserver`, and none under `prefers-reduced-motion`.

## Project imagery

Everything under `src/assets/work/` is a real capture or diagram taken from the project it illustrates:

| File | Origin |
|---|---|
| `thalyx-*.svg` | `CesarManzoCode/thalyx` → `docs/media/` |
| `orux-*.webp`, `orux-flow.svg` | `CesarManzoCode/orux` → `docs/img/` |
| `ferrol-*.webp` | `CesarManzoCode/ferrol` → `docs/capturas/` (private repo) |
| `acredita-*.webp` | `CesarManzoCode/study-acreditabach` → `docs/media/` |
| `studymation-*.webp`, `studymation-pipeline.svg` | `CesarManzoCode/Studymation` → `docs/media/` |
| `indice-cero-*.webp`, `indice-cycle.svg` | `CesarManzoCode/cpp-ceti` (Índice Cero) → `docs/media/`, sidebar cropped |
| `rice-signal.webp` | `CesarManzoCode/cesarmanzocode-rice` → `wallpapers/` |

Nothing here is a mock-up. PNGs are converted to WebP and, where a capture has wide empty margins,
cropped — never composited, restyled or redrawn. Window frames around captures carry a label we wrote,
never an invented URL. The only change to the two repository SVG diagrams is the removal of their
`aria-label` (the site supplies its own alt text).

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
npm run check      # typecheck + lint + content tests + build
npm run preview
```

Routing uses the History API with no router dependency (`src/router.tsx`); `vercel.json` rewrites
unknown paths to `index.html`. `VITE_BASE_PATH` sets Vite’s base if the site is served from a sub-path.

## Social image

`public/og.png` (1200×630) is rendered from `scripts/og.html`, which uses the real captures. To
regenerate it, open that file in a browser at a 1200×630 viewport and screenshot it.
