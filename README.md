# cesarmanzo-portafolio

Portfolio of César Alberto Manzo Olivares — software engineer, Guadalajara, México.

The site has three layers for three audiences, and keeps them separate:

| Route | For | What it holds |
|---|---|---|
| `/` | anyone | exactly five selected projects, each with a one-line thesis and 1–3 proof points |
| `/projects`, `/projects/:slug` | anyone curious about range | every portfolio-worthy project, grouped by category |
| `/technical`, `/technical/:slug` | interviewers, technical readers | architecture, invariants, trust boundaries, measurements, failures, limitations and what is not proven |
| `/about` | — | who, how I work, contact |

Bilingual (English / Spanish), English by default.

## Content

All project content lives in `src/data/` and nowhere else:

- `projects.ts` — the projects, the categories, the tags, and `HOME_SLUGS` (the
  five on Home). Accessible copy only.
- `technical.ts` — one engineering document per project, at the depth it has
  earned (`deep`, `breakdown`, `research`, `note`). A section only exists when
  there is evidence for it.
- `media.ts` — maps image keys to the files in `src/assets/work/`.

Interface copy is in `src/i18n/content.ts`. Every figure on the site is copied
from the project's own repository or current documentation; when one changes
there, change it here. Private repositories (Ferrol, Ennard) are described from
their documentation — no source links, code, keys or private data.

`npm test` checks the editorial invariants: five Home projects in the chosen
order, every project in its category and at its technical depth, deep dives
keep a limitations / not-proven section, both languages filled and carrying the
same numbers, required disclaimers present, and no stale or private wording
(old product names, old test counts, private repository URLs).

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4. No router, animation or icon library:
the single entrance gesture is CSS driven by one `IntersectionObserver`, and it
is skipped entirely under `prefers-reduced-motion`.

Fonts (Instrument Serif, Inter, JetBrains Mono) are self-hosted from
`src/assets/fonts` — latin and latin-ext subsets only — so nothing third-party
sits on the critical path.

## Project imagery

Everything under `src/assets/work/` is a real capture or diagram taken from the
project it illustrates:

| File | Origin |
|---|---|
| `thalyx-*.svg` | `CesarManzoCode/thalyx` → `docs/media/` |
| `orux-*.webp`, `orux-flow.svg` | `CesarManzoCode/orux` → `docs/img/` |
| `ferrol-*.webp` | `CesarManzoCode/ferrol` → `docs/capturas/` (private repo) |
| `acredita-*.webp` | `CesarManzoCode/study-acreditabach` → `docs/media/` |
| `studymation-*.webp` | `CesarManzoCode/Studymation` → `docs/media/` |
| `indice-cero-*.webp` | `CesarManzoCode/cpp-ceti` (Índice Cero) → `docs/media/`, sidebar cropped |

Nothing here is a mock-up. PNGs are converted to WebP and, where a capture has
wide empty margins, cropped — never composited, restyled or redrawn. If a
project's interface changes, replace the file rather than redrawing it.

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
npm run check      # typecheck + lint + content tests + build
npm run preview
```

Routing uses the History API with no router dependency (`src/router.tsx`);
`vercel.json` rewrites unknown paths to `index.html`. `VITE_BASE_PATH` sets
Vite's base if the site is served from a sub-path.

## Social image

`public/og.png` (1200×630) is rendered from `scripts/og.html`. To regenerate it,
open that file in a browser at a 1200×630 viewport and screenshot it.
