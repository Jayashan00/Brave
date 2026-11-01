// Turns a flat garment photo into data for the 3D viewer:
//  - colour canvas with alpha (cut-out)
//  - depth field (distance transform of the silhouette -> "inflated" pillow profile)
//  - dominant fabric colour (so recolouring keeps logos and prints intact)

const cache = new Map();

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function canvasOf(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

// Background removal for plain backgrounds: flood-fill from the border through
// pixels that are close to the border colours.
function autoMask(img, size = 320) {
  const r = size / Math.max(img.width, img.height);
  const w = Math.max(8, Math.round(img.width * r)), h = Math.max(8, Math.round(img.height * r));
  const c = canvasOf(w, h); const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  // border colour clusters (simple bucketing)
  const buckets = new Map();
  const push = (x, y) => { const i = (y * w + x) * 4; const k = ((d[i] >> 5) << 6) | ((d[i + 1] >> 5) << 3) | (d[i + 2] >> 5); const b = buckets.get(k) || [0, 0, 0, 0]; b[0] += d[i]; b[1] += d[i + 1]; b[2] += d[i + 2]; b[3]++; buckets.set(k, b); };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
  const refs = [...buckets.values()].sort((a, b) => b[3] - a[3]).slice(0, 6).map((b) => [b[0] / b[3], b[1] / b[3], b[2] / b[3]]);
  const T = 48 * 48;
  const near = (i) => refs.some((rf) => { const a = d[i] - rf[0], b = d[i + 1] - rf[1], cc = d[i + 2] - rf[2]; return a * a + b * b + cc * cc < T; });
  const bg = new Uint8Array(w * h); const q = [];
  const seed = (x, y) => { const p = y * w + x; if (!bg[p] && near(p * 4)) { bg[p] = 1; q.push(p); } };
  for (let x = 0; x < w; x++) { seed(x, 0); seed(x, h - 1); }
  for (let y = 0; y < h; y++) { seed(0, y); seed(w - 1, y); }
  while (q.length) {
    const p = q.pop(); const x = p % w, y = (p / w) | 0;
    if (x > 0) seed(x - 1, y); if (x < w - 1) seed(x + 1, y); if (y > 0) seed(x, y - 1); if (y < h - 1) seed(x, y + 1);
  }
  // keep largest foreground component
  const lab = new Int32Array(w * h); let best = 0, bestN = 0, cur = 0;
  for (let p = 0; p < w * h; p++) {
    if (bg[p] || lab[p]) continue; cur++; let n = 0; const st = [p]; lab[p] = cur;
    while (st.length) { const s = st.pop(); n++; const x = s % w, y = (s / w) | 0; const nb = [x > 0 && s - 1, x < w - 1 && s + 1, y > 0 && s - w, y < h - 1 && s + w]; for (const t of nb) if (t !== false && !bg[t] && !lab[t]) { lab[t] = cur; st.push(t); } }
    if (n > bestN) { bestN = n; best = cur; }
  }
  let mask = new Uint8Array(w * h);
  for (let p = 0; p < w * h; p++) mask[p] = lab[p] === best ? 255 : 0;
  // fill holes: background pixels not reachable from the border become garment
  const out = new Uint8Array(w * h); const st2 = [];
  const pushO = (p) => { if (!out[p] && !mask[p]) { out[p] = 1; st2.push(p); } };
  for (let x = 0; x < w; x++) { pushO(x); pushO((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { pushO(y * w); pushO(y * w + w - 1); }
  while (st2.length) { const p = st2.pop(); const x = p % w, y = (p / w) | 0; if (x > 0) pushO(p - 1); if (x < w - 1) pushO(p + 1); if (y > 0) pushO(p - w); if (y < h - 1) pushO(p + w); }
  for (let p = 0; p < w * h; p++) if (!out[p]) mask[p] = 255;
  // smooth ragged edges with a 5x5 majority filter (twice)
  for (let it = 0; it < 2; it++) {
    const m2 = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let n = 0, c = 0;
      for (let dy = -2; dy <= 2; dy++) { const yy = y + dy; if (yy < 0 || yy >= h) continue; for (let dx = -2; dx <= 2; dx++) { const xx = x + dx; if (xx < 0 || xx >= w) continue; c++; if (mask[yy * w + xx]) n++; } }
      m2[y * w + x] = n * 2 > c ? 255 : 0;
    }
    mask = m2;
  }
  // if the fill ate almost nothing or almost everything, fall back to a full panel
  const frac = bestN / (w * h);
  if (frac < 0.08 || frac > 0.97) return null;
  const mc = canvasOf(w, h); const mctx = mc.getContext('2d'); const md = mctx.createImageData(w, h);
  for (let p = 0; p < w * h; p++) { md.data[p * 4 + 3] = mask[p]; }
  mctx.putImageData(md, 0, 0);
  return mc;
}

function roundedPanelMask(w, h) {
  const c = canvasOf(w, h); const ctx = c.getContext('2d');
  const r = Math.min(w, h) * 0.06; ctx.fillStyle = '#000';
  ctx.beginPath(); ctx.roundRect ? ctx.roundRect(0, 0, w, h, r) : ctx.rect(0, 0, w, h); ctx.fill();
  return c;
}

// Chamfer distance transform -> pillow profile, returned as Uint8 heightmap (RGBA for WebGL)
function depthFromAlpha(alphaCanvas, size, profile = 'pillow') {
  const r = size / Math.max(alphaCanvas.width, alphaCanvas.height);
  const w = Math.max(4, Math.round(alphaCanvas.width * r)), h = Math.max(4, Math.round(alphaCanvas.height * r));
  const c = canvasOf(w, h); const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(alphaCanvas, 0, 0, w, h);
  const a = ctx.getImageData(0, 0, w, h).data;
  const INF = 1e9; const dist = new Float32Array(w * h);
  for (let p = 0; p < w * h; p++) dist[p] = a[p * 4 + 3] > 127 ? INF : 0;
  const D1 = 1, D2 = 1.4142;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const p = y * w + x; if (!dist[p]) continue; let v = dist[p];
    if (x > 0) v = Math.min(v, dist[p - 1] + D1); else v = Math.min(v, D1);
    if (y > 0) { v = Math.min(v, dist[p - w] + D1); if (x > 0) v = Math.min(v, dist[p - w - 1] + D2); if (x < w - 1) v = Math.min(v, dist[p - w + 1] + D2); } else v = Math.min(v, D1);
    dist[p] = v;
  }
  for (let y = h - 1; y >= 0; y--) for (let x = w - 1; x >= 0; x--) {
    const p = y * w + x; if (!dist[p]) continue; let v = dist[p];
    if (x < w - 1) v = Math.min(v, dist[p + 1] + D1); else v = Math.min(v, D1);
    if (y < h - 1) { v = Math.min(v, dist[p + w] + D1); if (x < w - 1) v = Math.min(v, dist[p + w + 1] + D2); if (x > 0) v = Math.min(v, dist[p + w - 1] + D2); } else v = Math.min(v, D1);
    dist[p] = v;
  }
  let max = 0; for (let p = 0; p < w * h; p++) if (dist[p] > max) max = dist[p];
  const ref = profile === 'panel' ? Math.min(max, size * 0.05) : max * 0.85;
  let hgt = new Float32Array(w * h);
  for (let p = 0; p < w * h; p++) { const x = Math.min(1, dist[p] / (ref || 1)); hgt[p] = dist[p] ? Math.sqrt(1 - (1 - x) * (1 - x)) : 0; }
  // soften with two box-blur passes (keeps silhouette edge at 0)
  for (let pass = 0; pass < 2; pass++) {
    const out = new Float32Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const p = y * w + x; if (!dist[p]) continue; let s = 0, n = 0;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue; s += hgt[yy * w + xx]; n++; }
      out[p] = s / n;
    }
    hgt = out;
  }
  const data = new Uint8Array(w * h * 4);
  for (let p = 0; p < w * h; p++) { const v = Math.round(Math.min(1, hgt[p]) * 255); data[p * 4] = v; data[p * 4 + 1] = v; data[p * 4 + 2] = v; data[p * 4 + 3] = 255; }
  return { data, w, h };
}

function dominantColour(canvas) {
  const s = 96; const r = s / Math.max(canvas.width, canvas.height);
  const w = Math.max(2, Math.round(canvas.width * r)), h = Math.max(2, Math.round(canvas.height * r));
  const c = canvasOf(w, h); const ctx = c.getContext('2d', { willReadFrequently: true }); ctx.drawImage(canvas, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data; const b = new Map();
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 200) continue;
    const k = ((d[i] >> 4) << 8) | ((d[i + 1] >> 4) << 4) | (d[i + 2] >> 4);
    const v = b.get(k) || [0, 0, 0, 0]; v[0] += d[i]; v[1] += d[i + 1]; v[2] += d[i + 2]; v[3]++; b.set(k, v);
  }
  let best = null; for (const v of b.values()) if (!best || v[3] > best[3]) best = v;
  if (!best) return [0.5, 0.5, 0.5];
  return [best[0] / best[3] / 255, best[1] / best[3] / 255, best[2] / best[3] / 255];
}

// Build the colour canvas (with alpha) for any of the three modes
async function buildColour(src, mode) {
  const img = await loadImage(src);
  const max = 1024; const r = Math.min(1, max / Math.max(img.width, img.height));
  const w = Math.round(img.width * r), h = Math.round(img.height * r);
  const c = canvasOf(w, h); const ctx = c.getContext('2d');
  let usedMode = mode;
  if (mode === 'auto') {
    const m = autoMask(img);
    if (m) {
      ctx.filter = `blur(${Math.max(1, w / 400)}px)`;
      ctx.drawImage(m, 0, 0, w, h); // alpha (softened so the edge is smooth)
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(img, 0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
    } else usedMode = 'panel';
  }
  if (usedMode === 'panel') {
    ctx.drawImage(roundedPanelMask(w, h), 0, 0);
    ctx.globalCompositeOperation = 'source-in'; ctx.drawImage(img, 0, 0, w, h); ctx.globalCompositeOperation = 'source-over';
  } else if (usedMode === 'cutout') {
    ctx.drawImage(img, 0, 0, w, h);
  }
  return { canvas: trim(c), mode: usedMode };
}

// crop to the visible garment with a small margin
function trim(c) {
  const ctx = c.getContext('2d', { willReadFrequently: true });
  const { width: w, height: h } = c; const d = ctx.getImageData(0, 0, w, h).data;
  let x0 = w, y0 = h, x1 = 0, y1 = 0;
  for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) if (d[(y * w + x) * 4 + 3] > 40) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (x1 <= x0 || y1 <= y0) return c;
  const pad = Math.round(Math.max(w, h) * 0.01);
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(w, x1 + pad); y1 = Math.min(h, y1 + pad);
  const out = canvasOf(x1 - x0, y1 - y0); out.getContext('2d').drawImage(c, x0, y0, x1 - x0, y1 - y0, 0, 0, x1 - x0, y1 - y0);
  return out;
}

export async function prepareGarment({ front, back, mode = 'cutout' }) {
  const key = `${front}|${back}|${mode}`;
  if (cache.has(key)) return cache.get(key);
  const job = (async () => {
    const f = await buildColour(front, mode === 'panel' ? 'panel' : mode);
    let b = null;
    if (back) { try { b = await buildColour(back, mode === 'panel' ? 'panel' : mode === 'auto' ? 'auto' : 'cutout'); } catch { b = null; } }
    const depth = depthFromAlpha(f.canvas, 256, f.mode === 'panel' ? 'panel' : 'pillow');
    return { front: f.canvas, back: b?.canvas || null, depth, aspect: f.canvas.width / f.canvas.height, dominant: dominantColour(f.canvas), mode: f.mode };
  })();
  cache.set(key, job);
  job.catch(() => cache.delete(key));
  return job;
}
