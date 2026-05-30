// Deterministic OG image generator (1200x630) — no external deps.
// Implements a tiny TrueType rasterizer + PNG encoder using only Node's zlib.
// Run: node scripts/og.mjs  ->  public/og.png
import { readFileSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const W = 1200;
const H = 630;
const SS = 4; // text anti-alias supersampling (vertical), analytic horizontal

// ---------------------------------------------------------------- RGB canvas
const buf = new Uint8Array(W * H * 3);

function blend(x, y, r, g, b, a) {
  if (a <= 0) return;
  x |= 0;
  y |= 0;
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  if (a > 1) a = 1;
  const i = (y * W + x) * 3;
  buf[i] = r * a + buf[i] * (1 - a);
  buf[i + 1] = g * a + buf[i + 1] * (1 - a);
  buf[i + 2] = b * a + buf[i + 2] * (1 - a);
}

const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) => [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

// ---------------------------------------------------------------- TrueType
function parseFont(path) {
  const data = readFileSync(path);
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const u16 = (o) => dv.getUint16(o);
  const i16 = (o) => dv.getInt16(o);
  const u32 = (o) => dv.getUint32(o);

  const numTables = u16(4);
  const tables = {};
  for (let i = 0; i < numTables; i++) {
    const o = 12 + i * 16;
    const tag = String.fromCharCode(data[o], data[o + 1], data[o + 2], data[o + 3]);
    tables[tag] = { offset: u32(o + 8), length: u32(o + 12) };
  }

  const head = tables.head.offset;
  const unitsPerEm = u16(head + 18);
  const locFormat = i16(head + 50);
  const numGlyphs = u16(tables.maxp.offset + 4);
  const numHMetrics = u16(tables.hhea.offset + 34);
  const hmtx = tables.hmtx.offset;

  // loca
  const locaOff = tables.loca.offset;
  const loca = new Array(numGlyphs + 1);
  for (let i = 0; i <= numGlyphs; i++) {
    loca[i] = locFormat === 0 ? u16(locaOff + i * 2) * 2 : u32(locaOff + i * 4);
  }
  const glyfOff = tables.glyf.offset;

  // cmap format 4
  const cmapOff = tables.cmap.offset;
  const numSub = u16(cmapOff + 2);
  let subOff = 0;
  for (let i = 0; i < numSub; i++) {
    const o = cmapOff + 4 + i * 8;
    const plat = u16(o);
    const enc = u16(o + 2);
    const off = u32(o + 4);
    if ((plat === 3 && (enc === 1 || enc === 0)) || plat === 0) subOff = cmapOff + off;
  }
  // parse fmt4
  const fmt = u16(subOff);
  const cmap = new Map();
  if (fmt === 4) {
    const segX2 = u16(subOff + 6);
    const segCount = segX2 / 2;
    const endO = subOff + 14;
    const startO = endO + segX2 + 2;
    const deltaO = startO + segX2;
    const rangeO = deltaO + segX2;
    for (let s = 0; s < segCount; s++) {
      const end = u16(endO + s * 2);
      const start = u16(startO + s * 2);
      const delta = i16(deltaO + s * 2);
      const rangePos = rangeO + s * 2;
      const range = u16(rangePos);
      for (let c = start; c <= end && c !== 0xffff; c++) {
        let g;
        if (range === 0) g = (c + delta) & 0xffff;
        else {
          const gi = u16(rangePos + range + (c - start) * 2);
          g = gi === 0 ? 0 : (gi + delta) & 0xffff;
        }
        if (g) cmap.set(c, g);
      }
    }
  }

  const advance = (gid) => {
    const idx = gid < numHMetrics ? gid : numHMetrics - 1;
    return u16(hmtx + idx * 4);
  };

  // glyph outline -> contours of {x,y,on}, resolving composites
  const glyphCache = new Map();
  function glyph(gid, depth = 0) {
    if (glyphCache.has(gid)) return glyphCache.get(gid);
    const start = glyfOff + loca[gid];
    const len = loca[gid + 1] - loca[gid];
    if (len === 0) {
      const e = { contours: [] };
      glyphCache.set(gid, e);
      return e;
    }
    const nc = i16(start);
    let result;
    if (nc >= 0) {
      // simple
      let o = start + 10;
      const ends = [];
      for (let i = 0; i < nc; i++) {
        ends.push(u16(o));
        o += 2;
      }
      const nPts = ends[ends.length - 1] + 1;
      const insLen = u16(o);
      o += 2 + insLen;
      const flags = new Uint8Array(nPts);
      for (let i = 0; i < nPts; ) {
        const f = data[o++];
        flags[i++] = f;
        if (f & 8) {
          let rep = data[o++];
          while (rep-- > 0 && i < nPts) flags[i++] = f;
        }
      }
      const xs = new Int16Array(nPts);
      let x = 0;
      for (let i = 0; i < nPts; i++) {
        const f = flags[i];
        if (f & 2) {
          const dx = data[o++];
          x += f & 16 ? dx : -dx;
        } else if (!(f & 16)) {
          x += i16(o);
          o += 2;
        }
        xs[i] = x;
      }
      const ys = new Int16Array(nPts);
      let y = 0;
      for (let i = 0; i < nPts; i++) {
        const f = flags[i];
        if (f & 4) {
          const dy = data[o++];
          y += f & 32 ? dy : -dy;
        } else if (!(f & 32)) {
          y += i16(o);
          o += 2;
        }
        ys[i] = y;
      }
      const contours = [];
      let s = 0;
      for (let c = 0; c < nc; c++) {
        const e = ends[c];
        const pts = [];
        for (let i = s; i <= e; i++) pts.push({ x: xs[i], y: ys[i], on: !!(flags[i] & 1) });
        contours.push(pts);
        s = e + 1;
      }
      result = { contours };
    } else {
      // composite
      const contours = [];
      let o = start + 10;
      let more = true;
      while (more && depth < 5) {
        const flags = u16(o);
        const compGid = u16(o + 2);
        o += 4;
        let arg1, arg2;
        if (flags & 1) {
          arg1 = i16(o);
          arg2 = i16(o + 2);
          o += 4;
        } else {
          arg1 = (data[o] << 24) >> 24;
          arg2 = (data[o + 1] << 24) >> 24;
          o += 2;
        }
        let a = 1, b = 0, c = 0, d = 1;
        if (flags & 8) {
          a = d = i16(o) / 16384;
          o += 2;
        } else if (flags & 0x40) {
          a = i16(o) / 16384;
          d = i16(o + 2) / 16384;
          o += 4;
        } else if (flags & 0x80) {
          a = i16(o) / 16384;
          b = i16(o + 2) / 16384;
          c = i16(o + 4) / 16384;
          d = i16(o + 6) / 16384;
          o += 8;
        }
        const dx = flags & 2 ? arg1 : 0;
        const dy = flags & 2 ? arg2 : 0;
        const sub = glyph(compGid, depth + 1);
        for (const pts of sub.contours) {
          contours.push(
            pts.map((p) => ({ x: a * p.x + c * p.y + dx, y: b * p.x + d * p.y + dy, on: p.on })),
          );
        }
        more = !!(flags & 0x20);
      }
      result = { contours };
    }
    glyphCache.set(gid, result);
    return result;
  }

  return { unitsPerEm, advance, glyph, cmap };
}

// flatten contours (quadratic) -> edges in device space
function glyphEdges(font, gid, penX, baseline, scale) {
  const g = font.glyph(gid);
  const edges = [];
  const tx = (p) => penX + p.x * scale;
  const ty = (p) => baseline - p.y * scale;
  for (const ptsRaw of g.contours) {
    // normalize: ensure starts on-curve
    let pts = ptsRaw;
    if (pts.length === 0) continue;
    if (!pts[0].on) {
      const last = pts[pts.length - 1];
      if (last.on) pts = [last, ...pts.slice(0, -1)];
      else pts = [{ x: (pts[0].x + last.x) / 2, y: (pts[0].y + last.y) / 2, on: true }, ...pts];
    }
    const poly = [];
    const n = pts.length;
    let prev = pts[0];
    poly.push({ x: tx(prev), y: ty(prev) });
    for (let i = 1; i <= n; i++) {
      const cur = pts[i % n];
      if (cur.on) {
        poly.push({ x: tx(cur), y: ty(cur) });
        prev = cur;
      } else {
        let next = pts[(i + 1) % n];
        let endPt;
        if (next.on) {
          endPt = next;
          i++;
        } else {
          endPt = { x: (cur.x + next.x) / 2, y: (cur.y + next.y) / 2, on: true };
        }
        const STEPS = 8;
        const p0 = prev, p1 = cur, p2 = endPt;
        for (let s = 1; s <= STEPS; s++) {
          const t = s / STEPS;
          const mt = 1 - t;
          const qx = mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x;
          const qy = mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y;
          poly.push({ x: tx({ x: qx, y: qy }), y: ty({ x: qx, y: qy }) });
        }
        prev = endPt;
      }
    }
    for (let i = 0; i < poly.length; i++) {
      const A = poly[i];
      const B = poly[(i + 1) % poly.length];
      if (A.y !== B.y) edges.push([A.x, A.y, B.x, B.y]);
    }
  }
  return edges;
}

function rasterizeEdges(edges, color, alpha, gradient) {
  if (!edges.length) return;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const e of edges) {
    minX = Math.min(minX, e[0], e[2]);
    maxX = Math.max(maxX, e[0], e[2]);
    minY = Math.min(minY, e[1], e[3]);
    maxY = Math.max(maxY, e[1], e[3]);
  }
  const bx0 = Math.max(0, Math.floor(minX));
  const by0 = Math.max(0, Math.floor(minY));
  const bx1 = Math.min(W, Math.ceil(maxX));
  const by1 = Math.min(H, Math.ceil(maxY));
  const bw = bx1 - bx0;
  const bh = by1 - by0;
  if (bw <= 0 || bh <= 0) return;
  const cov = new Float32Array(bw * bh);
  const xsBuf = [];
  for (let sy = 0; sy < bh * SS; sy++) {
    const y = by0 + (sy + 0.5) / SS;
    const r = sy >> 2;
    xsBuf.length = 0;
    for (const e of edges) {
      const y0 = e[1], y1 = e[3];
      if ((y0 <= y && y1 > y) || (y1 <= y && y0 > y)) {
        const t = (y - y0) / (y1 - y0);
        xsBuf.push({ x: e[0] + t * (e[2] - e[0]), d: y1 > y0 ? 1 : -1 });
      }
    }
    if (xsBuf.length < 2) continue;
    xsBuf.sort((a, b) => a.x - b.x);
    let w = 0;
    for (let k = 0; k < xsBuf.length - 1; k++) {
      w += xsBuf[k].d;
      if (w !== 0) {
        let xa = xsBuf[k].x - bx0;
        let xb = xsBuf[k + 1].x - bx0;
        if (xb <= xa) continue;
        const c0 = Math.max(0, Math.floor(xa));
        const c1 = Math.min(bw, Math.ceil(xb));
        for (let cx = c0; cx < c1; cx++) {
          const ov = Math.min(cx + 1, xb) - Math.max(cx, xa);
          if (ov > 0) cov[r * bw + cx] += ov / SS;
        }
      }
    }
  }
  for (let r = 0; r < bh; r++) {
    for (let cx = 0; cx < bw; cx++) {
      const a = cov[r * bw + cx];
      if (a <= 0.003) continue;
      let col = color;
      if (gradient) {
        const t = clamp01((bx0 + cx - gradient.x0) / (gradient.x1 - gradient.x0));
        col = mix(gradient.from, gradient.to, t);
      }
      blend(bx0 + cx, by0 + r, col[0], col[1], col[2], Math.min(1, a) * alpha);
    }
  }
}

// ---------------------------------------------------------------- text API
function measure(font, text, size, tracking = 0) {
  const scale = size / font.unitsPerEm;
  let w = 0;
  for (const ch of text) {
    const gid = font.cmap.get(ch.codePointAt(0)) || 0;
    w += font.advance(gid) * scale + tracking;
  }
  return w;
}

function drawText(font, text, x, baseline, size, opts = {}) {
  const { color = [255, 255, 255], alpha = 1, tracking = 0, gradient = null } = opts;
  const scale = size / font.unitsPerEm;
  let grad = null;
  if (gradient) {
    const total = measure(font, text, size, tracking);
    grad = { from: gradient.from, to: gradient.to, x0: x, x1: x + total };
  }
  let penX = x;
  for (const ch of text) {
    const gid = font.cmap.get(ch.codePointAt(0)) || 0;
    const edges = glyphEdges(font, gid, penX, baseline, scale);
    rasterizeEdges(edges, color, alpha, grad);
    penX += font.advance(gid) * scale + tracking;
  }
  return penX - x;
}

// ---------------------------------------------------------------- shapes
function fillRect(x, y, w, h, color, a = 1) {
  for (let yy = Math.max(0, y); yy < Math.min(H, y + h); yy++)
    for (let xx = Math.max(0, x); xx < Math.min(W, x + w); xx++) blend(xx, yy, color[0], color[1], color[2], a);
}

function roundRectCoverage(px, py, x, y, w, h, rad) {
  // returns 0..1 coverage of pixel center via 2x2 supersample
  let cnt = 0;
  for (let sx = 0; sx < 2; sx++)
    for (let sy = 0; sy < 2; sy++) {
      const fx = px + (sx + 0.5) / 2;
      const fy = py + (sy + 0.5) / 2;
      if (fx < x || fx > x + w || fy < y || fy > y + h) continue;
      // corner check
      let cxp = null, cyp = null;
      if (fx < x + rad && fy < y + rad) { cxp = x + rad; cyp = y + rad; }
      else if (fx > x + w - rad && fy < y + rad) { cxp = x + w - rad; cyp = y + rad; }
      else if (fx < x + rad && fy > y + h - rad) { cxp = x + rad; cyp = y + h - rad; }
      else if (fx > x + w - rad && fy > y + h - rad) { cxp = x + w - rad; cyp = y + h - rad; }
      if (cxp !== null) {
        const dx = fx - cxp, dy = fy - cyp;
        if (dx * dx + dy * dy > rad * rad) continue;
      }
      cnt++;
    }
  return cnt / 4;
}

function fillRoundRect(x, y, w, h, rad, color, a = 1) {
  for (let yy = Math.max(0, Math.floor(y)); yy < Math.min(H, Math.ceil(y + h)); yy++)
    for (let xx = Math.max(0, Math.floor(x)); xx < Math.min(W, Math.ceil(x + w)); xx++) {
      const cov = roundRectCoverage(xx, yy, x, y, w, h, rad);
      if (cov > 0) blend(xx, yy, color[0], color[1], color[2], a * cov);
    }
}

function strokeRoundRect(x, y, w, h, rad, t, color, a = 1) {
  for (let yy = Math.max(0, Math.floor(y - 1)); yy < Math.min(H, Math.ceil(y + h + 1)); yy++)
    for (let xx = Math.max(0, Math.floor(x - 1)); xx < Math.min(W, Math.ceil(x + w + 1)); xx++) {
      const outer = roundRectCoverage(xx, yy, x, y, w, h, rad);
      const inner = roundRectCoverage(xx, yy, x + t, y + t, w - 2 * t, h - 2 * t, Math.max(0, rad - t));
      const cov = outer - inner;
      if (cov > 0.003) blend(xx, yy, color[0], color[1], color[2], a * cov);
    }
}

function gradientRoundRect(x, y, w, h, rad, from, to) {
  for (let yy = Math.max(0, Math.floor(y)); yy < Math.min(H, Math.ceil(y + h)); yy++)
    for (let xx = Math.max(0, Math.floor(x)); xx < Math.min(W, Math.ceil(x + w)); xx++) {
      const cov = roundRectCoverage(xx, yy, x, y, w, h, rad);
      if (cov > 0) {
        const c = mix(from, to, clamp01((xx - x) / w));
        blend(xx, yy, c[0], c[1], c[2], cov);
      }
    }
}

// ---------------------------------------------------------------- scene
const cyan = [86, 230, 255];
const blue = [91, 155, 255];
const violet = [183, 155, 255];
const textMain = [236, 243, 255];
const textSub = [150, 164, 196];
const textFaint = [96, 108, 138];
const panelBg = [12, 16, 30];

// background gradient + diagonal
for (let y = 0; y < H; y++) {
  const t = y / H;
  for (let x = 0; x < W; x++) {
    const d = (x / W) * 0.35;
    const base = mix([9, 11, 21], [4, 5, 11], clamp01(t + d * 0.25));
    const i = (y * W + x) * 3;
    buf[i] = base[0];
    buf[i + 1] = base[1];
    buf[i + 2] = base[2];
  }
}
// aurora glows
function radial(cx, cy, rad, color, maxA) {
  for (let y = Math.max(0, cy - rad); y < Math.min(H, cy + rad); y++)
    for (let x = Math.max(0, cx - rad); x < Math.min(W, cx + rad); x++) {
      const dx = x - cx, dy = y - cy;
      const dd = Math.sqrt(dx * dx + dy * dy) / rad;
      if (dd >= 1) continue;
      const f = (1 - dd) * (1 - dd);
      blend(x, y, color[0], color[1], color[2], f * maxA);
    }
}
radial(120, -40, 620, cyan, 0.14);
radial(1080, 20, 560, violet, 0.16);
radial(720, 680, 520, blue, 0.08);

// subtle grid
for (let x = 0; x <= W; x += 48) for (let y = 0; y < H; y++) blend(x, y, 255, 255, 255, 0.018);
for (let y = 0; y <= H; y += 48) for (let x = 0; x < W; x++) blend(x, y, 255, 255, 255, 0.018);

// top accent bar
gradientRoundRect(0, 0, W, 4, 0, cyan, violet);

const fontBold = parseFont('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf');
const fontReg = parseFont('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf');
const fontMono = parseFont('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf');

const PAD = 84;

// monogram
fillRoundRect(PAD, 70, 88, 88, 22, [255, 255, 255], 0.05);
strokeRoundRect(PAD, 70, 88, 88, 22, 2, cyan, 0.5);
{
  const cmW = measure(fontBold, 'CM', 40, 1);
  drawText(fontBold, 'CM', PAD + 44 - cmW / 2, 70 + 58, 40, {
    gradient: { from: cyan, to: violet },
    tracking: 1,
  });
}

// availability pill
{
  const label = 'Disponible  ·  Software Engineer';
  const ts = 22;
  const tw = measure(fontReg, label, ts, 0.3);
  const px = PAD + 112;
  const py = 96;
  const pw = tw + 64;
  const ph = 44;
  fillRoundRect(px, py, pw, ph, 22, [255, 255, 255], 0.04);
  strokeRoundRect(px, py, pw, ph, 22, 1.5, [120, 170, 255], 0.3);
  // dot
  for (let y = py + 16; y < py + 28; y++) for (let x = px + 20; x < px + 32; x++) {
    const dx = x - (px + 26), dy = y - (py + 22);
    if (dx * dx + dy * dy <= 36) blend(x, y, 90, 230, 170, 1);
  }
  drawText(fontReg, label, px + 44, py + 30, ts, { color: [205, 222, 250], tracking: 0.3 });
}

// headline
drawText(fontBold, 'César Manzo', PAD, 332, 92, {
  gradient: { from: [190, 245, 255], to: violet },
  tracking: 0.5,
});

// subtitle
drawText(fontReg, 'Full-Stack  ·  Tiempo real  ·  IA aplicada', PAD, 392, 33, {
  color: textSub,
  tracking: 0.4,
});

// divider
fillRect(PAD, 432, 600, 1, [255, 255, 255], 0.12);

// domains line (mono)
drawText(fontMono, 'orux.space', PAD, 492, 26, { color: cyan, tracking: 0.5 });
{
  const w = measure(fontMono, 'orux.space', 26, 0.5);
  drawText(fontMono, '·', PAD + w + 18, 492, 26, { color: textFaint });
  drawText(fontMono, 'cpp-ceti.vercel.app', PAD + w + 46, 492, 26, { color: [120, 220, 180], tracking: 0.5 });
}

// github footer
drawText(fontMono, 'github.com/CesarManzoCode', PAD, 556, 21, { color: textFaint, tracking: 0.4 });

// ---------------- right panel: editor mock
const PX = 792, PY = 132, PW = 324, PH = 372;
fillRoundRect(PX, PY, PW, PH, 24, panelBg, 0.72);
strokeRoundRect(PX, PY, PW, PH, 24, 1.5, [255, 255, 255], 0.12);
// window dots
const dotY = PY + 30;
const dots = [[239, 110, 110], [245, 200, 90], [90, 220, 150]];
dots.forEach((c, i) => {
  const cx = PX + 28 + i * 22;
  for (let y = dotY - 6; y < dotY + 6; y++) for (let x = cx - 6; x < cx + 6; x++) {
    const dx = x - cx, dy = y - dotY;
    if (dx * dx + dy * dy <= 30) blend(x, y, c[0], c[1], c[2], 0.95);
  }
});
drawText(fontMono, 'deploy.log', PX + PW - 132, dotY + 6, 17, { color: textFaint });
fillRect(PX + 20, PY + 52, PW - 40, 1, [255, 255, 255], 0.1);

// code bars
const bars = [
  { w: 0.62, c: cyan, ca: 0.5 },
  { w: 0.84, c: [150, 160, 185], ca: 0.4 },
  { w: 0.5, c: [150, 160, 185], ca: 0.4, owner: cyan },
  { w: 0.7, c: [150, 160, 185], ca: 0.4 },
  { w: 0.56, c: cyan, ca: 0.45 },
  { w: 0.76, c: [150, 160, 185], ca: 0.4, owner: violet },
  { w: 0.44, c: [150, 160, 185], ca: 0.4 },
];
let by = PY + 78;
const innerX = PX + 26;
const innerW = PW - 52;
for (const b of bars) {
  fillRoundRect(innerX, by, innerW * b.w, 12, 6, b.c, b.ca);
  if (b.owner) {
    const cx = innerX + innerW * b.w + 12;
    fillRoundRect(cx, by - 3, 3, 18, 1.5, b.owner, 1);
  }
  by += 34;
}
// panel footer status
for (let y = PY + PH - 34; y < PY + PH - 24; y++) for (let x = PX + 26; x < PX + 36; x++) {
  const dx = x - (PX + 31), dy = y - (PY + PH - 29);
  if (dx * dx + dy * dy <= 25) blend(x, y, 90, 230, 170, 1);
}
drawText(fontMono, 'live · orux.space', PX + 44, PY + PH - 24, 16, { color: [150, 220, 190] });

// ---------------------------------------------------------------- PNG encode
function crcTable() {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
}
const CRC = crcTable();
function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = data.length;
  const out = Buffer.alloc(12 + len);
  out.writeUInt32BE(len, 0);
  out.write(type, 4, 'ascii');
  Buffer.from(data).copy(out, 8);
  const crcBuf = Buffer.alloc(4 + len);
  crcBuf.write(type, 0, 'ascii');
  Buffer.from(data).copy(crcBuf, 4);
  out.writeUInt32BE(crc32(crcBuf), 8 + len);
  return out;
}

// raw scanlines with filter byte 0 (none)
const raw = Buffer.alloc(H * (1 + W * 3));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 3)] = 0;
  buf.copy
    ? buf.copy(raw, y * (1 + W * 3) + 1, y * W * 3, y * W * 3 + W * 3)
    : raw.set(buf.subarray(y * W * 3, y * W * 3 + W * 3), y * (1 + W * 3) + 1);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type RGB
const idat = deflateSync(raw, { level: 9 });
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('IDAT', idat),
  chunk('IEND', Buffer.alloc(0)),
]);
writeFileSync('public/og.png', png);
console.log('wrote public/og.png', png.length, 'bytes', W + 'x' + H);
