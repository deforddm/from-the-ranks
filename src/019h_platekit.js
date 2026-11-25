/* v13.69.1 (David, Nov 25, 2026: "make moonspawn look consistent across all artwork"): ONE Moon's Spawn. The outline is Book One's title's (019g, the
   same hash seeds 121 to 126): a crown of basalt spires above the waist, a long ragged cone hanging below. Every drawing of the rock takes it from here:
   the chapter plates (PK.spawn), the scene backdrops (drawSpawn, 023), the canvas title and Coral's sky (paintTitleSpawn, 022), the visions (036b).
   Points are in half-widths: x from -1 to 1, y = 0 at the waist, negative up. top runs left to right, bot right to left. */
function spawnOutline(){ if (spawnOutline.c) return spawnOutline.c; const h = hash, HW = 310, top = [[-1, 0]]; let x = -HW;
  for (let i = 0; x < HW - 10; i++) { const t = (x + HW) / (2 * HW), env = Math.pow(Math.sin(t * Math.PI), .7), bw = 12 + h(i, 121) * 28, ht = env * (30 + Math.pow(h(i, 122), 2) * 120) + 8, lean = (h(i, 123) - .5) * 10;
    top.push([(x + bw * .2) / HW, (-10 - ht * .35) / HW], [(x + bw * .45 + lean) / HW, (-14 - ht) / HW], [(x + bw * .62) / HW, (-10 - ht * .55) / HW]); x += bw; }
  top.push([1, 0]); const bot = [], n = 28;
  for (let i = n; i >= 0; i--) { const t = i / n, xx = -HW + t * 2 * HW, d = Math.pow(Math.sin(t * Math.PI), 2.2) * 190 * (.7 + h(i, 124) * .6) + 14 + h(i, 125) * 18; bot.push([(xx + (h(i, 126) - .5) * 14) / HW, d / HW]); }
  return spawnOutline.c = {top, bot}; }
/* trace it on a canvas: centre x, the waist's y, the half-width */
function spawnPath(ctx, MX, WY, HW){ const O = spawnOutline(); ctx.beginPath(); O.top.forEach(([x, y], i) => i ? ctx.lineTo(MX + x * HW, WY + y * HW) : ctx.moveTo(MX + x * HW, WY + y * HW)); O.bot.forEach(([x, y]) => ctx.lineTo(MX + x * HW, WY + y * HW)); ctx.closePath(); }
/* and paint it as the title paints it: rock lit from the left, hanging facets, the light of what lies below on its belly, a faint rim on the crown, blue lamps */
function spawnPaint(ctx, MX, WY, HW, o = {}){ const O = spawnOutline(), K = HW / 310, h = hash, g = ctx.createLinearGradient(MX - HW, 0, MX + HW, 0); g.addColorStop(0, o.top || '#2a2a3a'); g.addColorStop(.3, '#0c0c14'); g.addColorStop(1, '#040408');
  spawnPath(ctx, MX, WY, HW); ctx.fillStyle = o.flat || g; ctx.fill(); if (o.flat) return;
  ctx.save(); spawnPath(ctx, MX, WY, HW); ctx.clip();
  for (let i = 0; i < 24; i++) { const t = h(i, 131), xx = MX - HW + 24 * K + t * (2 * HW - 48 * K), y0 = WY + (-20 + h(i, 132) * 26) * K, len = (40 + Math.pow(Math.sin(t * Math.PI), 2) * 140 * h(i, 133)) * K, w = (7 + h(i, 134) * 15) * K;
    ctx.fillStyle = t < .45 ? `rgba(58,60,82,${.32 * (1 - t)})` : 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.moveTo(xx, y0); ctx.lineTo(xx + w, y0 + 6 * K); ctx.lineTo(xx + w * .4, y0 + len); ctx.closePath(); ctx.fill(); }
  ctx.restore(); ctx.lineJoin = 'round';
  if (o.under) { ctx.strokeStyle = o.under; ctx.globalAlpha = o.underA ?? .4; ctx.lineWidth = Math.max(1, 2 * K); ctx.beginPath(); O.bot.forEach(([x, y], i) => i ? ctx.lineTo(MX + x * HW, WY + y * HW) : ctx.moveTo(MX + x * HW, WY + y * HW)); ctx.stroke(); ctx.globalAlpha = 1; }
  ctx.strokeStyle = o.rim || '#8a90b4'; ctx.globalAlpha = .25; ctx.lineWidth = Math.max(.6, 1.2 * K); ctx.beginPath(); O.top.forEach(([x, y], i) => i ? ctx.lineTo(MX + x * HW, WY + y * HW) : ctx.moveTo(MX + x * HW, WY + y * HW)); ctx.stroke(); ctx.globalAlpha = 1;
  const n = o.lights ?? 8; for (let i = 0; i < n; i++) { const p = o.t == null ? .6 : (Math.sin(o.t / 900 + i * 1.9) + 1) / 2; ctx.fillStyle = `rgba(168,204,255,${.25 + p * .5})`; const r = Math.max(1.2, 1.6 * K); ctx.fillRect(MX - 220 * K + h(i, 141) * 440 * K, WY + (-20 + h(i, 142) * 60) * K, r, r); } }

/* ============ the plate kit (v13.6): shared pieces for the painted chapter plates of every book (019i files) ============
   A chapter opening shows one painted plate (artPlate, 019d) above the chapter's caption; the plate is the caption drawn. Book One had
   eight simple plates since v1; v13.6 redraws them and adds the other nine books' sixty-three, all from this kit, in the titles' style
   (019f, 180b): a layered sky, ridges fading into the distance, texture on the ground, far figures a few pixels high, and now and then a
   squadmate in the foreground seen from behind (TK.back). Everything is drawn by Claude for this game from seeded generators: no image is
   copied. No canon character's face is ever drawn; the plates show places and soldiers from the ranks.
   A plate is 660 x 400 (330 x 200 doubled, Book One's old shape). Every id inside a plate is prefixed with the plate's own id, since
   several SVGs can sit in one page. PK.plate(key, label, fn) registers a lazy getter: the SVG is built the first time it is shown.
   Motion: .pk-fl (a flame's flicker), .pk-tw (a star's twinkle), .pk-dr (smoke drifting); held still under prefers-reduced-motion. */
const PK = {
  W: 660, H: 400,
  f: n => Math.round(n * 10) / 10,
  CSS: `<style>.pk-fl{animation:pk-fl 2.6s ease-in-out infinite}.pk-tw{animation:pk-tw 5s ease-in-out infinite}.pk-dr{animation:pk-dr 9s ease-in-out infinite}
@keyframes pk-fl{0%,100%{opacity:1}40%{opacity:.78}70%{opacity:.92}}@keyframes pk-tw{0%,100%{opacity:.3}50%{opacity:1}}@keyframes pk-dr{0%,100%{transform:translate(0,0)}50%{transform:translate(4px,-2px)}}
@media (prefers-reduced-motion:reduce){.pk-fl,.pk-tw,.pk-dr{animation:none}}.reduce .pk-fl,.reduce .pk-tw,.reduce .pk-dr{animation:none}</style>`,
  /* register a plate: fn(P) returns the inner SVG; P carries the id prefix and the def helpers */
  plate(key, label, fn){
    let cache = null;
    Object.defineProperty(ART, key, {enumerable: true, configurable: true, get(){
      if (cache) return cache;
      const id = 'p' + key.replace(/[^a-z0-9]/gi, ''), defs = [], P = PK.ctx(id, defs);
      let body = ''; try { body = fn(P); } catch (e) { console.warn('plate', key, e); body = `<rect width="660" height="400" fill="#0c0a08"/>`; }
      return cache = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label.replace(/"/g, '&quot;')}">${PK.CSS}<defs>${defs.join('')}</defs>${body}${PK.vignette(P)}</svg>`; }});
    if (typeof ART_SIZE === 'object') ART_SIZE[key] = [660, 400];
  },
  ctx(id, defs){
    const P = {id, n: 0,
      /* a vertical gradient: stops as [[offset, colour, opacity?], ...]; returns url(#..) */
      lin(stops, x2 = 0, y2 = 1){ const g = `${id}g${P.n++}`; defs.push(`<linearGradient id="${g}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}"${s[2] != null ? ` stop-opacity="${s[2]}"` : ''}/>`).join('')}</linearGradient>`); return `url(#${g})`; },
      rad(stops, cx = .5, cy = .5, r = .5){ const g = `${id}g${P.n++}`; defs.push(`<radialGradient id="${g}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(s => `<stop offset="${s[0]}" stop-color="${s[1]}"${s[2] != null ? ` stop-opacity="${s[2]}"` : ''}/>`).join('')}</radialGradient>`); return `url(#${g})`; },
      blur(sd){ const g = `${id}b${P.n++}`; defs.push(`<filter id="${g}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${sd}"/></filter>`); return g; },
      /* a glow: a radial gradient of one colour fading out, reused per colour */
      glows: {}, glow(col){ return P.glows[col] ??= P.rad([[0, col, .85], [.35, col, .32], [1, col, 0]]); },
    };
    return P;
  },
  vignette(P){ return `<rect width="660" height="400" fill="${P.rad([[.55, '#000', 0], [1, '#000', .5]], .5, .45, .75)}" pointer-events="none"/>`; },
  sky(P, stops){ return `<rect width="660" height="400" fill="${P.lin(stops)}"/>`; },
  /* a soft band of light or haze across the sky or the ground */
  haze(P, y, h, col, op, x = 330, w = 420){ return `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="${col}" opacity="${op}" filter="url(#${P.blur(Math.max(6, h * .5))})"/>`; },
  stars(n, seed, y0, y1, col = '#e8ecfa'){ return TK.stars(n, seed, y0, y1, 660, col, 'pk-tw'); },
  moon(P, x, y, r, col = '#d8dce8', crack = false){ const f = PK.f;
    return `<circle cx="${x}" cy="${y}" r="${r * 4}" fill="${P.glow(col)}" opacity=".5"/><circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/><circle cx="${f(x - r * .3)}" cy="${f(y - r * .2)}" r="${f(r * .28)}" fill="#000" opacity=".07"/><circle cx="${f(x + r * .35)}" cy="${f(y + r * .3)}" r="${f(r * .2)}" fill="#000" opacity=".08"/>`
      + (crack ? `<path d="M${f(x - r * .98)} ${f(y - r * .2)} L${f(x - r * .6)} ${f(y - r * .12)} L${f(x - r * .35)} ${f(y + r * .05)} L${f(x - r * .05)} ${f(y + r * .02)} L${f(x + r * .25)} ${f(y + r * .18)} L${f(x + r * .55)} ${f(y + r * .12)} L${f(x + r * .97)} ${f(y + r * .25)}" stroke="#2a1a1a" stroke-width="${f(r * .045)}" fill="none" stroke-linejoin="bevel" opacity=".85"/>` : ''); },
  sun(P, x, y, r, col, op = 1){ return `<circle cx="${x}" cy="${y}" r="${r * 5}" fill="${P.glow(col)}" opacity="${op * .7}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${col}" opacity="${op}"/>`; },
  /* a ridge line across the width: base y, amplitude, seed; returns a closed path filled down to 400 */
  ridgeD(y, amp, seed, rough = 1, x0 = -10, x1 = 670, step = 6){ const f = PK.f, a = hash(seed, 1) * 6.28, b = hash(seed, 2) * 6.28, c = hash(seed, 3) * 6.28;
    let d = `M${x0} 400 L${x0} ${f(y)}`;
    for (let x = x0; x <= x1; x += step) { const t = x / 660; const v = .55 * Math.sin(t * 5.1 + a) + .3 * Math.sin(t * 11.3 + b) + .15 * Math.sin(t * 23.7 + c) * rough + (hash(Math.round(x), seed) - .5) * .12 * rough;
      d += ` L${x} ${f(y - v * amp)}`; }
    return d + ` L${x1} 400 Z`; },
  ridge(y, amp, seed, col, rough = 1, op = 1){ return `<path d="${PK.ridgeD(y, amp, seed, rough)}" fill="${col}"${op < 1 ? ` opacity="${op}"` : ''}/>`; },
  /* the light along a ridge's crest */
  crest(y, amp, seed, col, w = 1.2, op = .5, rough = 1){ const d = PK.ridgeD(y, amp, seed, rough).replace(/^M-10 400 L/, 'M').replace(/ L670 400 Z$/, ''); return `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" opacity="${op}"/>`; },
  /* grass or scrub: n short strokes between y0 and y1, longer nearer */
  grass(n, seed, y0, y1, col, op = .7, lean = 2){ const f = PK.f; let d = '';
    for (let i = 0; i < n; i++) { const x = hash(i, seed) * 680 - 10, t = hash(i, seed + 1), y = y0 + t * t * (y1 - y0), h = 2 + t * t * 16 * (.6 + hash(i, seed + 2) * .8), l = (hash(i, seed + 3) - .3) * lean * (1 + t * 2);
      d += `M${f(x)} ${f(y)}q${f(l * .3)} ${f(-h * .6)} ${f(l)} ${f(-h)}`; }
    return `<path d="${d}" stroke="${col}" stroke-width="1.1" fill="none" stroke-linecap="round" opacity="${op}"/>`; },
  /* speckle on dry ground: stones and tufts */
  stones(n, seed, y0, y1, col, op = .5){ const f = PK.f; let s = '';
    for (let i = 0; i < n; i++) { const t = hash(i, seed + 1), y = y0 + t * t * (y1 - y0), r = .6 + t * 3 * hash(i, seed + 2); s += `<ellipse cx="${f(hash(i, seed) * 660)}" cy="${f(y)}" rx="${f(r * 1.6)}" ry="${f(r * .7)}"/>`; }
    return `<g fill="${col}" opacity="${op}">${s}</g>`; },
  /* a fire: a glow and a small flickering flame */
  fire(P, x, y, k = 1, col = '#ff9a3a', i = 0){ const f = PK.f;
    return `<g class="pk-fl" style="animation-delay:-${f(hash(i, 91) * 2.6)}s"><circle cx="${f(x)}" cy="${f(y - 2 * k)}" r="${f(26 * k)}" fill="${P.glow(col)}"/><path d="M${f(x - 3 * k)} ${f(y)} Q${f(x - 4 * k)} ${f(y - 6 * k)} ${f(x)} ${f(y - 11 * k)} Q${f(x + 4 * k)} ${f(y - 6 * k)} ${f(x + 3 * k)} ${f(y)} Z" fill="#ffd27a"/></g>`; },
  /* a dot of light: a lamp, a window, a far fire */
  lamp(P, x, y, r, col, i = 0, flick = true){ const f = PK.f; return `<g${flick ? ` class="pk-fl" style="animation-delay:-${f(hash(i, 92) * 2.6)}s"` : ''}><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 7)}" fill="${P.glow(col)}" opacity=".7"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${col}"/></g>`; },
  /* a far column on the march: n walkers along a line from (x0,y0) to (x1,y1), scale k0 to k1 */
  column(x0, y0, x1, y1, n, k0, k1, fill, seed = 1, o = {}){ let s = '';
    for (let i = 0; i < n; i++) { const t = (i + hash(i, seed) * .6) / n, k = k0 + (k1 - k0) * t, x = x0 + (x1 - x0) * t + (hash(i, seed + 9) - .5) * (o.jx || 0) * k, y = y0 + (y1 - y0) * t; s += TK.walker(x, y, k, i + seed * 100, fill, o); }
    return s; },
  /* a wagon side-on: box, wheels, a canvas hood if hood */
  wagon(x, y, k, fill, hood = true, i = 0){ const f = PK.f, w = 40 * k, h = 12 * k;
    return `<g fill="${fill}"><rect x="${f(x - w / 2)}" y="${f(y - h - 7 * k)}" width="${f(w)}" height="${f(h)}"/>${hood ? `<path d="M${f(x - w / 2 + 2 * k)} ${f(y - h - 7 * k)} L${f(x - w / 2 + 2 * k)} ${f(y - h - 19 * k)} Q${f(x)} ${f(y - h - 27 * k)} ${f(x + w / 2 - 2 * k)} ${f(y - h - 19 * k)} L${f(x + w / 2 - 2 * k)} ${f(y - h - 7 * k)} Z"${typeof hood === 'string' ? ` fill="${hood}"` : ' opacity=".85"'}/>` : ''}<circle cx="${f(x - w * .3)}" cy="${f(y - 5 * k)}" r="${f(5.5 * k)}"/><circle cx="${f(x + w * .3)}" cy="${f(y - 5 * k)}" r="${f(5.5 * k)}"/><path d="M${f(x + w / 2)} ${f(y - 10 * k)} L${f(x + w / 2 + 14 * k)} ${f(y - 8 * k)}" stroke="${fill}" stroke-width="${f(1.4 * k)}"/></g>`; },
  /* a horse and rider on a skyline, facing right (flip for left); lance if lance */
  rider(x, y, k, fill, lance = false, flip = false, bare = false){ const f = PK.f;
    const d = `M-15 -15 Q-14 -20 -6 -19 L6 -19 Q10 -20 12 -24 L15 -30 Q18 -31 19 -28 L17 -24 Q14 -18 12 -12 L11 0 L9 0 L8 -10 L4 -10 L3 0 L1 0 L0 -10 L-6 -10 L-7 0 L-9 0 L-10 -11 Q-13 -9 -18 -2 Q-17 -9 -15 -15 Z` + (bare ? '' : ` M-5 -19 L-4 -29 Q-1 -32 2 -29 L3 -19 Z`);
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${flip ? -k : k} ${k})" fill="${fill}"><path d="${d}"/>${bare ? '' : '<circle cx="-1" cy="-33" r="3"/>'}${lance ? `<path d="M2 -26 L12 -54" stroke="${fill}" stroke-width="1.2"/>` : ''}</g>`; },
  /* a tent: a ridge tent seen end-on; lit gives it a warm doorway */
  tent(P, x, y, k, fill, lit, i = 0){ const f = PK.f, w = 22 * k, h = 15 * k, dx = 16 * k, dy = -5 * k;
    return `<path d="M${f(x)} ${f(y - h)} L${f(x + dx)} ${f(y - h + dy)} L${f(x + w / 2 + dx)} ${f(y + dy)} L${f(x + w / 2)} ${f(y)} Z" fill="${fill}" opacity=".7"/><path d="M${f(x - w / 2)} ${f(y)} L${f(x)} ${f(y - h)} L${f(x + w / 2)} ${f(y)} Z" fill="${fill}"/><path d="M${f(x)} ${f(y - h)} L${f(x + dx)} ${f(y - h + dy)}" stroke="#000" stroke-width="${f(.8 * k)}" opacity=".5"/>`
      + (lit ? `<path d="M${f(x - 3 * k)} ${f(y)} L${f(x)} ${f(y - 9 * k)} L${f(x + 3 * k)} ${f(y)} Z" fill="#e8a050" class="pk-fl" style="animation-delay:-${f(hash(i, 93) * 2.6)}s"/><circle cx="${f(x)}" cy="${f(y - 3 * k)}" r="${f(10 * k)}" fill="${P.glow('#e8a050')}" opacity=".5"/>` : `<path d="M${f(x)} ${f(y)} L${f(x)} ${f(y - 9 * k)}" stroke="#000" stroke-width="${f(.8 * k)}" opacity=".6"/>`); },
  tents(P, x0, x1, y, rows, n, k, fill, lit = .3, seed = 5){ let s = '';
    for (let r = 0; r < rows; r++) { const rk = k * (1 + r * .35), ry = y + r * 16 * k; for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * (i + .5 + (hash(i, seed + r) - .5) * .4) / n; s += PK.tent(P, x, ry, rk, fill, hash(i, seed + r + 30) < lit, i + r * 50); } }
    return s; },
  /* a tree: 'pine' a dark spire, 'old' a broad crown, 'dead' bare branches */
  tree(x, y, h, fill, kind = 'old', seed = 0){ const f = PK.f;
    if (kind === 'pine') return `<path d="M${f(x)} ${f(y - h)} L${f(x + h * .2)} ${f(y - h * .45)} L${f(x + h * .14)} ${f(y - h * .45)} L${f(x + h * .27)} ${f(y)} L${f(x - h * .27)} ${f(y)} L${f(x - h * .14)} ${f(y - h * .45)} L${f(x - h * .2)} ${f(y - h * .45)} Z" fill="${fill}"/>`;
    if (kind === 'dead') { let d = `M${f(x)} ${f(y)} L${f(x)} ${f(y - h)}`; for (let i = 0; i < 5; i++) { const by = y - h * (.4 + i * .12), s = (i % 2 ? 1 : -1) * h * (.18 + hash(i, seed) * .15); d += ` M${f(x)} ${f(by)} L${f(x + s)} ${f(by - h * .16)}`; } return `<path d="${d}" stroke="${fill}" stroke-width="${f(Math.max(1, h * .04))}" fill="none" stroke-linecap="round"/>`; }
    let s = `<path d="M${f(x - h * .04)} ${f(y)} L${f(x - h * .03)} ${f(y - h * .5)} L${f(x + h * .03)} ${f(y - h * .5)} L${f(x + h * .04)} ${f(y)} Z" fill="${fill}"/>`;
    for (let i = 0; i < 6; i++) s += `<circle cx="${f(x + (hash(i, seed + 7) - .5) * h * .55)}" cy="${f(y - h * (.55 + hash(i, seed + 8) * .35))}" r="${f(h * (.16 + hash(i, seed + 9) * .12))}" fill="${fill}"/>`;
    return s; },
  /* a city skyline between x0 and x1 standing on base: blocks, domes, towers; lit windows (lit colour) with chance p */
  skyline(P, x0, x1, base, seed, o = {}){ const f = PK.f, fill = o.fill || '#121620', lit = o.lit || '#e8b060', p = o.p ?? .25, hmax = o.h || 70; let s = '', win = '';
    let x = x0, i = 0;
    while (x < x1) { const w = 10 + hash(i, seed) * (o.wide || 26), hh = hmax * (.25 + hash(i, seed + 1) * .55), kind = hash(i, seed + 2);
      s += `<rect x="${f(x)}" y="${f(base - hh)}" width="${f(w + .6)}" height="${f(hh + 2)}"/>`;
      if (kind < (o.domes ?? .15)) s += `<path d="M${f(x)} ${f(base - hh)} Q${f(x + w / 2)} ${f(base - hh - w * .9)} ${f(x + w)} ${f(base - hh)} Z"/>`;
      else if (kind < (o.domes ?? .15) + (o.towers ?? .12)) { const tw = Math.max(4, w * .4); s += `<rect x="${f(x + w / 2 - tw / 2)}" y="${f(base - hh - hmax * .45)}" width="${f(tw)}" height="${f(hmax * .45)}"/>` + (o.spires ? `<path d="M${f(x + w / 2 - tw / 2)} ${f(base - hh - hmax * .45)} L${f(x + w / 2)} ${f(base - hh - hmax * .65)} L${f(x + w / 2 + tw / 2)} ${f(base - hh - hmax * .45)} Z"/>` : ''); }
      else if (kind < .55 && o.roofs !== false) s += `<path d="M${f(x - 1)} ${f(base - hh)} L${f(x + w / 2)} ${f(base - hh - w * .35)} L${f(x + w + 1)} ${f(base - hh)} Z"/>`;
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) if (hash(i * 13 + r * 3 + c, seed + 5) < p && base - hh + 6 + r * 9 < base - 4) win += PK.lamp(P, x + 3 + c * (w - 6) / 2, base - hh + 6 + r * 9, .9, lit, i * 13 + r * 3 + c, hash(i * 13 + r * 3 + c, seed + 6) < .3);
      x += w + (hash(i, seed + 3) < .2 ? 3 : 0); i++; }
    return `<g fill="${fill}">${s}</g>${win}`; },
  /* a wall with crenels from x0 to x1, top y, down to base; gate at gx (width gw) if given */
  wall(x0, x1, y, base, fill, o = {}){ const f = PK.f; let d = `M${x0} ${base} L${x0} ${y}`;
    const cw = o.cw || 8; for (let x = x0; x < x1; x += cw * 2) d += ` L${x} ${f(y - cw * .7)} L${Math.min(x1, x + cw)} ${f(y - cw * .7)} L${Math.min(x1, x + cw)} ${y} L${Math.min(x1, x + cw * 2)} ${y}`;
    d += ` L${x1} ${base} Z`; let s = `<path d="${d}" fill="${fill}"/>`;
    if (o.towers) for (const tx of o.towers) s += `<rect x="${f(tx - (o.tw || 14) / 2)}" y="${f(y - (o.th || 22))}" width="${o.tw || 14}" height="${f(base - y + (o.th || 22))}" fill="${fill}"/>` + `<path d="M${f(tx - (o.tw || 14) / 2 - 2)} ${f(y - (o.th || 22))} L${f(tx + (o.tw || 14) / 2 + 2)} ${f(y - (o.th || 22))}" stroke="${fill}" stroke-width="4"/>`;
    if (o.gx != null) s += `<path d="M${f(o.gx - o.gw / 2)} ${base} L${f(o.gx - o.gw / 2)} ${f(base - o.gh * .7)} Q${o.gx} ${f(base - o.gh)} ${f(o.gx + o.gw / 2)} ${f(base - o.gh * .7)} L${f(o.gx + o.gw / 2)} ${base} Z" fill="${o.gcol || '#050506'}"/>`;
    if (o.edge) s += `<path d="${d.replace(/ L\d+ \d+ Z$/, '').replace(/^M\S+ \S+ L/, 'M')}" stroke="${o.edge}" stroke-width="1" fill="none" opacity=".5"/>`;
    return s; },
  /* a ship side-on: hull, mast, sail (furled if !sail), stern lamp if lampc */
  ship(P, x, y, k, fill, sail = '#2a2a30', lampc = '', i = 0){ const f = PK.f;
    return `<g><path d="M${f(x - 40 * k)} ${f(y - 8 * k)} L${f(x + 44 * k)} ${f(y - 10 * k)} L${f(x + 34 * k)} ${f(y)} L${f(x - 32 * k)} ${f(y)} Z" fill="${fill}"/><path d="M${f(x)} ${f(y - 9 * k)} L${f(x)} ${f(y - 62 * k)} M${f(x - 30 * k)} ${f(y - 8 * k)} L${f(x - 30 * k)} ${f(y - 36 * k)}" stroke="${fill}" stroke-width="${f(1.6 * k)}"/>`
      + (sail ? `<path d="M${f(x - 18 * k)} ${f(y - 56 * k)} Q${f(x - 2 * k)} ${f(y - 34 * k)} ${f(x - 18 * k)} ${f(y - 16 * k)} L${f(x + 22 * k)} ${f(y - 16 * k)} Q${f(x + 30 * k)} ${f(y - 36 * k)} ${f(x + 22 * k)} ${f(y - 56 * k)} Z" fill="${sail}"/>` : `<path d="M${f(x - 20 * k)} ${f(y - 54 * k)} L${f(x + 22 * k)} ${f(y - 54 * k)}" stroke="${fill}" stroke-width="${f(3 * k)}"/>`)
      + (lampc ? PK.lamp(P, x - 38 * k, y - 14 * k, 1.4 * k, lampc, i) : '') + `</g>`; },
  /* water from y down: a gradient with light streaks (reflect: x of a light to lay down the water) */
  water(P, y, top, bot, o = {}){ const f = PK.f; let s = `<rect y="${y}" width="660" height="${400 - y}" fill="${P.lin([[0, top], [1, bot]])}"/>`, d = '';
    for (let i = 0; i < (o.n || 40); i++) { const t = hash(i, 71), yy = y + 3 + t * t * (400 - y), w = 8 + t * 60 * hash(i, 72), x = hash(i, 73) * 680 - 10; d += `M${f(x)} ${f(yy)}h${f(w)}`; }
    s += `<path d="${d}" stroke="${o.line || '#9ab0c8'}" stroke-width="1" opacity="${o.op || .25}" stroke-linecap="round"/>`;
    if (o.reflect) for (const [rx, rc, rw] of o.reflect) { let r = ''; for (let i = 0; i < 14; i++) { const yy = y + 4 + i * (400 - y) / 14, w = (rw || 14) * (.5 + hash(i, rx) * .9) * (1 + i * .08); r += `M${f(rx - w / 2 + (hash(i, rx + 1) - .5) * 8)} ${f(yy)}h${f(w)}`; } s += `<path d="${r}" stroke="${rc}" stroke-width="1.6" opacity=".55" stroke-linecap="round"/>`; }
    return s; },
  smoke(P, x, y, h, w, dx, col, op, seed){ return `<g class="pk-dr">${TK.smoke(x, y, h, w, dx, col, op, seed, P.blur(Math.max(3, w * .35)))}</g>`; },
  /* a banner on a pole */
  banner(x, y, h, pole, cloth, wave = 1){ const f = PK.f; return `<path d="M${f(x)} ${f(y)} L${f(x)} ${f(y - h)}" stroke="${pole}" stroke-width="1.4"/><path d="M${f(x)} ${f(y - h)} Q${f(x + h * .2)} ${f(y - h + h * .06 * wave)} ${f(x + h * .4)} ${f(y - h + h * .02)} L${f(x + h * .4)} ${f(y - h * .7)} Q${f(x + h * .2)} ${f(y - h * .72 + h * .06 * wave)} ${f(x)} ${f(y - h * .7)} Z" fill="${cloth}"/>`; },
  /* a squadmate in the foreground, seen from behind (TK.back), feet at x,y, k ~ .35 to .6 */
  back(x, y, k, o){ return `<g transform="translate(${PK.f(x)} ${PK.f(y)}) scale(${k})">${TK.back(o)}</g>`; },
  /* a blue gas lamp on a post (Darujhistan) */
  gaslamp(P, x, y, h, i = 0, post = '#1a2030'){ const f = PK.f; return `<path d="M${f(x)} ${f(y)} L${f(x)} ${f(y - h)}" stroke="${post}" stroke-width="${f(Math.max(1.4, h * .05))}"/>` + PK.lamp(P, x, y - h - 2, Math.max(1.6, h * .06), '#8ec8ff', i); },
  /* a string of paper lanterns along a sagging line */
  lanterns(P, x0, y0, x1, y1, sag, n, cols, seed){ const f = PK.f; let s = `<path d="M${x0} ${y0} Q${f((x0 + x1) / 2)} ${f((y0 + y1) / 2 + sag * 2)} ${x1} ${y1}" stroke="#3a2a1a" stroke-width="1" fill="none"/>`;
    for (let i = 0; i < n; i++) { const t = (i + .5) / n, x = x0 + (x1 - x0) * t, y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * ((y0 + y1) / 2 + sag * 2) + t * t * y1, c = cols[Math.floor(hash(i, seed) * cols.length)], r = 4 + hash(i, seed + 1) * 2.5;
      s += `<g class="pk-fl" style="animation-delay:-${f(hash(i, seed + 2) * 2.6)}s"><circle cx="${f(x)}" cy="${f(y + r + 2)}" r="${f(r * 3.4)}" fill="${P.glow(c)}" opacity=".55"/><ellipse cx="${f(x)}" cy="${f(y + r + 2)}" rx="${f(r)}" ry="${f(r * 1.2)}" fill="${c}"/></g>`; }
    return s; },
  /* Moon's Spawn: a black mountain afloat, crown of basalt spires on top, a long ragged cone beneath; underc lights its belly */
  spawn(P, MX, MY, HW, o = {}){ const f = PK.f, h = hash, sd = o.seed || 7, K = HW / 310, O = spawnOutline(), pt = ([x, y]) => `${f(MX + x * HW)} ${f(MY + 40 * K + y * HW)}`;
    const top = 'M' + O.top.map(pt).join(' L'), bot = O.bot.map(p => ' L' + pt(p)).join(''); // v13.69.1: one outline everywhere (spawnOutline), whatever the seed; the seed still places the facets and lights
    const rock = P.lin([[0, o.top || '#2a2c3a'], [.35, '#121320'], [1, '#040408']]);
    let s = `<path d="${top + bot} Z" fill="#000" opacity=".5" filter="url(#${P.blur(10 * K)})" transform="translate(0 ${f(14 * K)})"/><path d="${top + bot} Z" fill="${rock}"/>`;
    for (let i = 0; i < 18; i++) { const t = h(i, sd + 6), xx = MX - HW + 20 * K + t * (2 * HW - 40 * K), y0 = MY + (20 + h(i, sd + 7) * 26) * K, len = (40 + Math.pow(Math.sin(t * Math.PI), 2) * 140 * h(i, sd + 8)) * K, w = (7 + h(i, sd + 9) * 15) * K;
      s += `<path d="M${f(xx)} ${f(y0)} L${f(xx + w)} ${f(y0 + 6 * K)} L${f(xx + w * .4)} ${f(y0 + len)} Z" fill="${t < .45 ? '#3a3c52' : '#000'}" opacity="${t < .45 ? .28 : .35}"/>`; }
    if (o.under) s += `<path d="${bot.replace(/^ L/, 'M')}" stroke="${o.under}" stroke-width="${f(2 * K + .4)}" fill="none" opacity=".35"/>`;
    s += `<path d="${top}" stroke="${o.rim || '#8a90b4'}" stroke-width="${f(1.2 * K + .3)}" fill="none" opacity=".3"/>`;
    if (o.lights) for (let i = 0; i < o.lights; i++) s += PK.lamp(P, MX - HW * .7 + h(i, sd + 10) * HW * 1.4, MY + (20 + h(i, sd + 11) * 60) * K, 1.2 * K + .4, '#a8ccff', i);
    return s; },
  /* the tents and heaps of a camp seen from above, on a slope: used by several plates */
  fires(P, pts, k = 1, col = '#ff9a3a'){ return pts.map((p, i) => PK.fire(P, p[0], p[1], p[2] || k, col, i)).join(''); },
};
