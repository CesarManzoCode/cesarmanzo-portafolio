# cesarmanzo-portafolio

Portfolio of César Alberto Manzo Olivares — software engineer, Guadalajara, México.

The page is organised around the work rather than around a stack: six projects,
each presented with the evidence that it runs. Bilingual (English / Spanish),
English by default.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4. No animation or icon library:
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
| `acredita-*.webp` | captured from a local build of `CesarManzoCode/study-acreditabach` |

Nothing here is a mock-up. If a project's interface changes, replace the file
rather than redrawing it.

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
npm run preview
```

`VITE_BASE_PATH` sets Vite's base; the GitHub Pages workflow sets it to
`/<repo>/` automatically.

## Social image

`public/og.png` (1200×630) is rendered from `scripts/og.html`. To regenerate it,
open that file in a browser at a 1200×630 viewport and screenshot it.
