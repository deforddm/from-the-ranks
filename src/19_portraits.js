/* ============ portraits ============ */
/* A painted bust of each squadmate, lit by a lantern low on the left, with a rim of the squadmate's own colour on the right.
   The figure is painted once into a cached layer (it changes only with state: the sergeant's alley scar, Tuft's grey lock);
   each frame draws the dark, the ash and the breathing light around it, and Tuft's shadow. */
const PORTRAIT_CACHE = new Map();
function portraitState(id){ const f = (typeof S !== 'undefined' && S && S.f) || {}; return id === 'sgt' ? (f.sgtScar ? 'scar' : '') : id === 'tuft' ? (f.c5_tuftMarked ? 'marked' : '') : ''; }
function drawPortrait(ctx, id, W, H, t){
  const c = TPL[id] || TPL.sgt, hue = c.col, st = portraitState(id), key = `${id}|${W}x${H}|${st}|${BOOK}`, mo = REDUCE() ? 0 : 1;
  let layer = PORTRAIT_CACHE.get(key);
  if (!layer) { layer = document.createElement('canvas'); layer.width = W; layer.height = H; paintPortrait(layer.getContext('2d'), id, W, H, st); if (PORTRAIT_CACHE.size > 24) PORTRAIT_CACHE.clear(); PORTRAIT_CACHE.set(key, layer); }
  const fl = 1 + (Math.sin(t/130)*.05 + Math.sin(t/57)*.03)*mo;
  ctx.clearRect(0,0,W,H);
  const bg = ctx.createLinearGradient(0,0,0,H); bg.addColorStop(0,'#0c0a09'); bg.addColorStop(1,'#040303'); ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);
  glow(ctx, W*.58, H*.38, H*.5, hue, .12 + Math.sin(t/900)*.03*mo); // the squadmate's own colour, behind
  glow(ctx, W*.5 - H*.42, H*.95, H*.75, '#e8923a', .2*fl); // the lantern, low and to the left
  const ashAt = (i, n) => [hash(i,n+3)*W + Math.sin(t/1500 + i)*6*mo, ((hash(i,n+1)*H) + t*(.01 + hash(i,n+2)*.02)*mo) % H];
  ctx.fillStyle = 'rgba(200,190,175,.22)'; for (let i=0;i<22;i++){ const [x, y] = ashAt(i, 0); ctx.fillRect(x, y, 1.5, 1.5); }
  ctx.drawImage(layer, 0, 0);
  if (mo) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.5 - H*.3, H*.7, H*.55, '#e8a050', .035*(fl - .9)*8); ctx.globalCompositeOperation = 'source-over'; } // the lantern breathing on the lit side
  if (id === 'tuft') { const s = H/120, ox = W/2, oy = H*.98; // shadow, never still, threading up round her
    for (let i=0;i<5;i++){ const a = t/800*(mo || .01) + i*1.3; ctx.strokeStyle = `rgba(160,141,224,${.2 + Math.sin(a)*.12})`; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(ox + Math.cos(a)*30*s, oy - (8 + Math.sin(a)*10)*s); ctx.bezierCurveTo(ox + Math.cos(a + 1)*44*s, oy - 40*s, ox + Math.cos(a + 1.8)*34*s, oy - 70*s, ox + Math.cos(a + 2.4)*22*s, oy - (98 + Math.sin(a*.7)*6)*s); ctx.stroke(); } }
  ctx.fillStyle = 'rgba(210,200,185,.35)'; for (let i=0;i<7;i++){ const [x, y] = ashAt(i + 40, 7); ctx.fillRect(x, y, 2.2, 2.2); } // a little ash nearer than they are
  const v = ctx.createRadialGradient(W/2, H*.46, H*.28, W/2, H*.5, H*.86); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0,0,W,H);
}
/* painting helpers, in bust units (the bust is about 120 units tall, shoulders at y = 0) */
const PR = {
  lin(ctx, x0, y0, x1, y1, stops){ const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(([k, c]) => g.addColorStop(k, c)); return g; },
  rad(ctx, x, y, r0, r1, stops){ const g = ctx.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([k, c]) => g.addColorStop(k, c)); return g; },
  /* a soft elliptical blot of colour: light, shadow, soot, blush */
  soft(ctx, x, y, rx, ry, col, a, rot = 0){ ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, ry/rx); const g = ctx.createRadialGradient(0,0,0,0,0,rx); g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g; ctx.fillRect(-rx, -rx, rx*2, rx*2); ctx.restore(); },
  /* lit from the left: light colour, then the base, then the dark */
  lit(ctx, c1, c2, x0, x1){ const g = ctx.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, shade(c1, .12)); g.addColorStop(.35, c1); g.addColorStop(.72, c2); g.addColorStop(1, '#060505'); return g; },
  path(ctx, pts){ ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); },
  stroke(ctx, col, w, f){ ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); f(); ctx.stroke(); },
  /* shoulders and chest: sloped, rounded at the deltoid; returns nothing, leaves the path for clipping */
  torsoPath(ctx, wide, drop = 0){ ctx.beginPath(); ctx.moveTo(-wide - 2, 2); ctx.lineTo(-wide, -20 + drop); ctx.bezierCurveTo(-wide, -34 + drop, -wide*.82, -41 + drop, -wide*.52, -43 + drop); ctx.quadraticCurveTo(-19, -46 + drop*.3, -9, -50);
    ctx.lineTo(9, -50); ctx.quadraticCurveTo(19, -46 + drop*.3, wide*.52, -43 + drop); ctx.bezierCurveTo(wide*.82, -41 + drop, wide, -34 + drop, wide, -20 + drop); ctx.lineTo(wide + 2, 2); ctx.closePath(); },
  neck(ctx, F, w = 7.2){ const {cy, skin} = F, u = F.h/20, x = F.x || 0; ctx.fillStyle = PR.lin(ctx, x - w, 0, x + w, 0, [[0, shade(skin, -.05)], [.45, shade(skin, -.25)], [1, shade(skin, -.8)]]);
    PR.path(ctx, [[x - w*.86, cy + 10*u], [x + w*.86, cy + 10*u], [x + w*1.05, -46], [x + w*1.6, -41], [x - w*1.6, -41], [x - w*1.05, -46]]); ctx.fill();
    ctx.save(); ctx.clip(); PR.soft(ctx, x + 1, cy + 19*u, w*1.5, 5, '#140806', .8); PR.stroke(ctx, 'rgba(30,12,8,.3)', .8, () => { ctx.moveTo(x - w*.5, cy + 17*u); ctx.quadraticCurveTo(x - w*.2, -52, x - 1.5, -46); ctx.moveTo(x + w*.5, cy + 17*u); ctx.quadraticCurveTo(x + w*.3, -52, x + 1.5, -46); }); ctx.restore(); },
  /* the face: head shape, planes, nose, mouth, eyes and brows. F: {cy, w, h, jaw, chin, skin, iris, lip, browCol, ...} */
  face(ctx, F){
    const {cy, w, skin} = F, u = F.h/20, jaw = F.jaw ?? .8, chin = F.chin ?? 5, top = cy - 21*u, bot = cy + 19*u, x = F.x || 0, nz = F.nose ?? 1;
    ctx.save(); ctx.translate(x, 0);
    const path = () => { ctx.beginPath(); ctx.moveTo(0, top); ctx.bezierCurveTo(w*.62, top, w*.97, top + 7*u, w, cy - 3*u); ctx.bezierCurveTo(w*1.02, cy + 4*u, w*jaw*1.04, cy + 9*u, w*jaw, cy + 12.5*u); ctx.bezierCurveTo(w*jaw*.88, cy + 16.5*u, chin*1.3, bot, 0, bot);
      ctx.bezierCurveTo(-chin*1.3, bot, -w*jaw*.88, cy + 16.5*u, -w*jaw, cy + 12.5*u); ctx.bezierCurveTo(-w*jaw*1.04, cy + 9*u, -w*1.02, cy + 4*u, -w, cy - 3*u); ctx.bezierCurveTo(-w*.97, top + 7*u, -w*.62, top, 0, top); ctx.closePath(); };
    if (F.ears !== false) [-1, 1].forEach(sd => { const ex = sd*(w + .3), ey = cy + 1.8*u; ell(ctx, ex, ey, 2.4*(F.earS || 1), 4.5*u*(F.earS || 1), sd < 0 ? shade(skin, -.1) : shade(skin, -.62)); ell(ctx, ex + sd*.3, ey + .3, 1.2*(F.earS || 1), 2.9*u*(F.earS || 1), sd < 0 ? shade(skin, -.42) : shade(skin, -.8)); });
    path(); ctx.fillStyle = PR.lin(ctx, -w, 0, w, 0, [[0, shade(skin, .14)], [.4, skin], [.74, shade(skin, -.46)], [1, shade(skin, -.74)]]); ctx.fill();
    ctx.save(); path(); ctx.clip();
    ctx.fillStyle = PR.rad(ctx, -w*.28, cy - 1*u, w*.4, w*1.5, [[0,'rgba(24,10,8,0)'],[1,'rgba(24,10,8,.62)']]); ctx.fillRect(-w - 2, top - 2, w*2 + 4, bot - top + 4); // round, falling away from the light
    ctx.fillStyle = PR.lin(ctx, 0, cy + 11*u, 0, bot, [[0,'rgba(24,10,8,0)'],[1,'rgba(24,10,8,.38)']]); ctx.fillRect(-w - 2, cy + 11*u, w*2 + 4, bot - cy);
    PR.soft(ctx, -w*.4, cy - 1*u, w*.36, 3.6*u, '#2a120c', .5); PR.soft(ctx, w*.4, cy - 1*u, w*.36, 3.6*u, '#160806', .65); // eye sockets
    PR.soft(ctx, -w*.42, cy - 5.8*u, w*.36, 1.7*u, '#ffe0c0', .16); PR.soft(ctx, -w*.56, cy + 4.8*u, w*.3, 2.5*u, '#ffd8b0', .17); // brow and cheekbone catching the lantern
    PR.soft(ctx, w*.62, cy + 6*u, w*.3, 3.4*u, '#160806', .32); PR.soft(ctx, -w*.2, cy - 12*u, w*.5, 4*u, '#ffe8d0', .08); // the far cheek's hollow; the forehead
    if (F.flush) PR.soft(ctx, -w*.5, cy + 6*u, w*.28, 2.4*u, F.flush, .18);
    // nose: a lit plane, a shadow plane, the tip, the nostrils, the shadow under it
    PR.path(ctx, [[-1.3, cy - 2*u], [-.1, cy - 2.2*u], [.5*nz, cy + 7*u], [-2.6*nz, cy + 7.2*u]]); ctx.fillStyle = 'rgba(255,226,196,.13)'; ctx.fill();
    PR.path(ctx, [[.3, cy - 2*u], [1.5, cy - 1.2*u], [3.3*nz, cy + 7.3*u], [.9, cy + 7.9*u]]); ctx.fillStyle = 'rgba(28,10,6,.34)'; ctx.fill();
    PR.soft(ctx, -.5, cy + 7.2*u, 2.3*nz, 1.8*u, '#ffdcc0', .2); ell(ctx, -1.9*nz, cy + 8.5*u, .95*nz, .5, 'rgba(40,14,10,.55)'); ell(ctx, 1.8*nz, cy + 8.5*u, .95*nz, .5, 'rgba(20,6,4,.72)'); PR.soft(ctx, 1, cy + 9.7*u, 3.6*nz, 1.1*u, '#140604', .42);
    if (F.age) { ctx.lineCap = 'round'; PR.stroke(ctx, `rgba(36,14,8,${.3*F.age})`, .6, () => { [-1, 1].forEach(sd => { ctx.moveTo(sd*2.9*nz, cy + 8.2*u); ctx.quadraticCurveTo(sd*4.9, cy + 10.6*u, sd*5.3, cy + 13.6*u); }); });
      PR.stroke(ctx, `rgba(36,14,8,${.26*F.age})`, .45, () => { for (let i=0;i<3;i++){ ctx.moveTo(-w*.55, cy - (9.5 + i*2.2)*u); ctx.quadraticCurveTo(0, cy - (10.6 + i*2.2)*u, w*.55, cy - (9.3 + i*2.2)*u); } [-1, 1].forEach(sd => { for (let i=0;i<3;i++){ ctx.moveTo(sd*w*.64, cy - .6*u); ctx.lineTo(sd*(w*.78 + i*.3), cy + (-1.8 + i*1.4)*u); } }); }); }
    // mouth: upper lip, the line, lower lip and its light, the shadow under it
    const my = cy + 12.3*u, mw = F.mouthW ?? 4.2, sl = F.smileL ?? 0, sr = F.smileR ?? 0, lip = F.lip || '#8a5a4a';
    ctx.beginPath(); ctx.moveTo(-mw, my - sl); ctx.quadraticCurveTo(-mw*.5, my - 1.7, 0, my - .95); ctx.quadraticCurveTo(mw*.5, my - 1.7, mw, my - sr); ctx.quadraticCurveTo(0, my + .5 - (sl + sr)*.4, -mw, my - sl); ctx.fillStyle = shade(lip, -.3); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-mw*.8, my + .15 - sl*.6); ctx.quadraticCurveTo(0, my + 3.1, mw*.8, my + .15 - sr*.6); ctx.quadraticCurveTo(0, my + .9 - (sl + sr)*.3, -mw*.8, my + .15 - sl*.6); ctx.fillStyle = PR.lin(ctx, -mw, 0, mw, 0, [[0, shade(lip, .08)], [.6, lip], [1, shade(lip, -.5)]]); ctx.fill();
    ctx.lineCap = 'round'; PR.stroke(ctx, 'rgba(34,10,6,.85)', .75, () => { ctx.moveTo(-mw - .2, my - sl*1.1); ctx.quadraticCurveTo(0, my + .7 - (sl + sr)*.45, mw + .2, my - sr*1.1); });
    if (F.teeth) { ctx.fillStyle = 'rgba(226,214,196,.8)'; ctx.fillRect(-mw*.35, my - .15 - (sl + sr)*.2, mw*.9, .55); }
    PR.soft(ctx, -.9, my + 1.4, 1.7, .5, '#ffe8d8', .26); PR.soft(ctx, 0, my + 3.6*u, 3.6, 1.1*u, '#140604', .36); PR.soft(ctx, -1.4, bot - 4*u, 3.2, 2*u, '#ffdcc0', .1);
    if (F.under) F.under(ctx, F, path, top, bot);
    ctx.restore();
    ctx.save(); path(); ctx.clip(); ctx.beginPath(); ctx.rect(w*.3, top - 4, w + 6, bot - top + 8); ctx.clip(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = rgba(F.rim, F.rimA ?? .2); ctx.lineWidth = 2.4; ctx.translate(-1.2, 0); path(); ctx.stroke(); ctx.restore(); // rim light
    [-1, 1].forEach(sd => PR.eye(ctx, F, sd)); [-1, 1].forEach(sd => PR.brow(ctx, F, sd));
    ctx.restore(); },
  eye(ctx, F, sd){ const u = F.h/20, ex = sd*F.w*.4, ey = F.cy - 1*u, ew = F.w*.2, eh = 1.35*u*(F.open ?? 1), look = F.look ?? .25, far = sd > 0;
    const almond = () => { ctx.beginPath(); ctx.moveTo(ex - ew, ey + .2); ctx.quadraticCurveTo(ex - ew*.1, ey - eh*2.1, ex + ew, ey - .1); ctx.quadraticCurveTo(ex + ew*.1, ey + eh*1.5, ex - ew, ey + .2); ctx.closePath(); };
    almond(); ctx.fillStyle = far ? '#54483e' : '#a09080'; ctx.fill();
    ctx.save(); almond(); ctx.clip(); const ix = ex + look*ew*.4, iy = ey - .2*u, ir = eh*1.08;
    ell(ctx, ix, iy, ir, ir, far ? shade(F.iris, -.45) : F.iris); PR.soft(ctx, ix, iy, ir, ir, '#050303', .45); ell(ctx, ix, iy, ir*.46, ir*.46, '#060303');
    ctx.fillStyle = 'rgba(20,8,5,.5)'; ctx.fillRect(ex - ew - 1, ey - eh*2.4, ew*2 + 2, eh*1.3); ctx.restore(); // the lid's shadow across the eye
    ctx.lineCap = 'round'; PR.stroke(ctx, '#170a06', .95, () => { ctx.moveTo(ex - ew, ey + .2); ctx.quadraticCurveTo(ex - ew*.1, ey - eh*2.1, ex + ew, ey - .1); });
    PR.stroke(ctx, 'rgba(40,16,10,.36)', .5, () => { ctx.moveTo(ex - ew*.9, ey + .5); ctx.quadraticCurveTo(ex, ey + eh*1.45, ex + ew*.9, ey + .2); });
    PR.stroke(ctx, 'rgba(40,16,10,.42)', .55, () => { ctx.moveTo(ex - ew*.85, ey - 1.15*u); ctx.quadraticCurveTo(ex, ey - eh*2.3 - .9*u, ex + ew*.9, ey - 1.25*u); });
    if (F.bags) PR.stroke(ctx, `rgba(50,20,24,${.3*F.bags})`, .7, () => { ctx.moveTo(ex - ew*.8, ey + 1.6*u); ctx.quadraticCurveTo(ex, ey + 2.8*u, ex + ew*.9, ey + 1.4*u); });
    if (F.eyeGlow) glow(ctx, ix, iy, 4.5, F.eyeGlow, far ? .3 : .45);
    ctx.fillStyle = `rgba(255,244,228,${far ? .45 : .9})`; ctx.beginPath(); ctx.arc(ix - ir*.38, iy - ir*.38, .4, 0, 7); ctx.fill(); },
  brow(ctx, F, sd){ const u = F.h/20, x0 = sd*1.7, x1 = sd*F.w*.8, y = F.cy - 4.7*u, lift = sd < 0 ? (F.browL || 0) : (F.browR || 0), arch = F.arch ?? 1.1;
    ctx.lineCap = 'round'; for (let i=0;i<3;i++){ ctx.strokeStyle = i ? rgba(F.browCol, .7) : F.browCol; ctx.lineWidth = (F.browW ?? 1.4)*(1 - i*.3); ctx.beginPath(); ctx.moveTo(x0 + sd*i*.9, y + .4 - i*.12 - lift*.4); ctx.quadraticCurveTo(sd*F.w*.4, y - arch - lift - i*.15, x1 - sd*i*.3, y + .7 - lift*.6); ctx.stroke(); } },
  /* fine dots in the lower face: stubble, freckles */
  dots(ctx, F, n, col, sz, zone){ const u = F.h/20, r = PR.rng(n*7 + F.w*13); ctx.fillStyle = col;
    for (let i=0;i<n;i++){ const x = (r() - .5)*2*F.w, y = F.cy + zone[0]*u + r()*(zone[1] - zone[0])*u; if (zone[2] && zone[2](x, (y - F.cy)/u)) continue; ctx.fillRect(x, y, sz, sz); } }, // called from inside face(), already moved to F.x
  rng(seed){ let a = seed >>> 0 || 1; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; },
  /* mail: rows of rings, lit on the left */
  mail(ctx, x0, x1, y0, y1, col, step = 1.5){ const hi = rgba('#f0e8d8', .18), lo = 'rgba(8,6,4,.55)';
    for (let pass=0;pass<2;pass++){ ctx.strokeStyle = pass ? hi : lo; ctx.lineWidth = pass ? .35 : .55; ctx.beginPath();
      for (let y=y0, r=0; y<y1; y+=step*.72, r++) for (let x=x0 + (r%2)*step*.5; x<x1; x+=step){ const k = (x - x0)/(x1 - x0); if (pass && k > .55) continue; ctx.moveTo(x + step*.46, y); ctx.arc(x, y, step*.46, pass ? Math.PI*1.1 : 0, pass ? Math.PI*1.6 : Math.PI*2); }
      ctx.stroke(); } },
  /* overlapping scales, row by row from the top */
  scales(ctx, x0, x1, y0, rows, sw, col){ for (let r=0;r<rows;r++){ const y = y0 + r*sw*.62; for (let x=x0 + (r%2)*sw*.5; x<x1; x+=sw){ const k = clamp((x - x0)/(x1 - x0), 0, 1);
      ctx.beginPath(); ctx.moveTo(x - sw*.5, y); ctx.lineTo(x - sw*.5, y + sw*.4); ctx.quadraticCurveTo(x - sw*.5, y + sw*.95, x, y + sw); ctx.quadraticCurveTo(x + sw*.5, y + sw*.95, x + sw*.5, y + sw*.4); ctx.lineTo(x + sw*.5, y); ctx.closePath();
      ctx.fillStyle = PR.lin(ctx, x - sw*.5, y, x + sw*.4, y + sw, [[0, shade(col, .2 - k*.5)], [1, shade(col, -.35 - k*.45)]]); ctx.fill(); ctx.strokeStyle = 'rgba(10,8,6,.7)'; ctx.lineWidth = .35; ctx.stroke(); } } },
  stitch(ctx, col, w, f){ ctx.save(); ctx.setLineDash([.9, .9]); PR.stroke(ctx, col, w, f); ctx.restore(); },
  /* hair as many fine strokes following a flow: f(i, r) returns [x0, y0, cx, cy, x1, y1] */
  strands(ctx, n, cols, w, seed, f){ const r = PR.rng(seed); ctx.lineCap = 'round'; for (let i=0;i<n;i++){ const p = f(i, r); ctx.strokeStyle = cols[i % cols.length]; ctx.lineWidth = w*(.6 + r()*.6); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.quadraticCurveTo(p[2], p[3], p[4], p[5]); ctx.stroke(); } },
};
/* bust helpers shared by every book (first written for Book Five): hair with volume over the skull, hanging scale, quilting, the Whitefinder shield,
   and the garment that rises from the shoulders to the neckline in one piece (body, band, light) */
const BP = {
  /* hair over the skull. o: {c:[light, mid, dark], v: height over the skull, wx: width past the temples, hl: hairline (u above cy), ey: where the sides end (u below cy),
     s: strand colours, n: strands, sh: sheen colour, spiky: tufts past the outline} */
  hair(ctx, F, o){ const u = F.h/20, w = F.w, top = F.cy - 21*u, v = o.v ?? 3.5, W = w + (o.wx ?? 1.6), hl = F.cy - (o.hl ?? 12.5)*u, ey = F.cy + (o.ey ?? -1)*u, r = PR.rng(o.seed || 5);
    const cb = (a, b, c, d, t) => (1-t)**3*a + 3*(1-t)**2*t*b + 3*(1-t)*t*t*c + t**3*d, edge = t => t < .5 ? [cb(-W, -W - 1, -W*.62, 0, t*2), cb(ey, top + 4, top - v, top - v, t*2)] : [cb(0, W*.62, W + 1, W, t*2 - 1), cb(top - v, top - v, top + 4, ey, t*2 - 1)];
    const shape = () => { ctx.beginPath(); ctx.moveTo(-W, ey); ctx.bezierCurveTo(-W - 1, top + 4, -W*.62, top - v, 0, top - v); ctx.bezierCurveTo(W*.62, top - v, W + 1, top + 4, W, ey);
      ctx.lineTo(w - .7, ey); ctx.bezierCurveTo(w - .1, hl + 3.4*u, w*.62, hl - .9, 0, hl - .9); ctx.bezierCurveTo(-w*.62, hl - .9, -w + .1, hl + 3.4*u, -w + .7, ey); ctx.closePath(); };
    if (o.spiky) PR.strands(ctx, o.spiky, [o.c[1], o.c[2], o.c[1]], .8, (o.seed || 5) + 1, (i, rr) => { const [x, y] = edge(.04 + rr()*.92), dx = x*.08 + (rr() - .5)*2.4, dy = (y - F.cy)*.1 - 1 - rr()*1.6; return [x*.9, y + 2, x + dx*.5, y + dy*.5, x + dx, y + dy]; });
    shape(); ctx.fillStyle = PR.lin(ctx, -W, top - v, W*.8, ey, [[0, o.c[0]], [.38, o.c[1]], [.8, o.c[2]], [1, '#050403']]); ctx.fill();
    ctx.save(); shape(); ctx.clip();
    const pt = o.part ?? -3, sc = (o.s || o.c).map(c => rgba(c, .6));
    PR.strands(ctx, o.n ?? 60, sc, o.sw ?? .5, (o.seed || 5) + 2, (i, rr) => { const k = rr(), x1 = lerp(-W - 1, W + 1, k), y1 = hl + Math.pow(Math.abs(x1)/W, 2.4)*(ey - hl) + 1.4 + rr()*1.4, x0 = pt + (rr() - .5)*2; return [x0, top - v + .6, x1*.92 + (x1 - pt)*.12, lerp(top - v, y1, .3), x1, y1]; }); // from the crown, over the skull
    PR.soft(ctx, -W*.38, top - v*.3 + 2.5, W*.55, 2.6, o.sh || '#f0d8b0', o.shA ?? .3, -.35); PR.soft(ctx, W*.62, F.cy - 6*u, W*.55, 10, '#000000', .5);
    ctx.restore();
    PR.strands(ctx, o.wisp ?? 8, sc, (o.sw ?? .5)*.8, (o.seed || 5) + 3, (i, rr) => { const x = (rr() - .5)*w*1.5, y = hl + Math.pow(Math.abs(x)/W, 2.4)*(ey - hl); return [x, y - 1.6, x + (rr() - .5)*2, y + 1, x + (rr() - .5)*3, y + 1.6 + rr()*2]; }); // a few loose at the brow
    PR.stroke(ctx, rgba(F.rim, .22), .8, () => { ctx.moveTo(W*.4, top - v*.86); ctx.bezierCurveTo(W*.8, top - v*.5, W + .8, top + 4, W, ey); }); return shape; },
  /* scale that hangs: the bottom row first, so each row overlaps the one below like slates; lit from the left, a glint on each lit edge */
  scales(ctx, x0, x1, y0, y1, sw, col, seed = 7){ const r = PR.rng(seed), rows = Math.ceil((y1 - y0)/(sw*.58));
    for (let j = rows; j >= 0; j--){ const y = y0 + j*sw*.58; for (let x = x0 + (j%2)*sw*.5; x < x1 + sw*.5; x += sw){ const k = clamp((x - x0)/(x1 - x0), 0, 1), jt = (r() - .5)*.16;
      ctx.beginPath(); ctx.moveTo(x - sw*.5, y); ctx.lineTo(x - sw*.5, y + sw*.42); ctx.quadraticCurveTo(x - sw*.48, y + sw*.98, x, y + sw*1.06); ctx.quadraticCurveTo(x + sw*.48, y + sw*.98, x + sw*.5, y + sw*.42); ctx.lineTo(x + sw*.5, y); ctx.closePath();
      ctx.fillStyle = PR.lin(ctx, x - sw*.5, y, x + sw*.35, y + sw, [[0, shade(col, .28 - k*.62 + jt)], [.55, shade(col, -.12 - k*.5 + jt)], [1, shade(col, -.55 - k*.35)]]); ctx.fill(); ctx.strokeStyle = 'rgba(6,5,4,.85)'; ctx.lineWidth = .42; ctx.stroke();
      PR.stroke(ctx, 'rgba(0,0,0,.35)', .3, () => { ctx.moveTo(x, y + sw*.15); ctx.lineTo(x, y + sw*.8); }); // the ridge down each scale
      if (k < .62) PR.stroke(ctx, `rgba(255,244,220,${.55*(1 - k/.62)})`, .38, () => { ctx.moveTo(x - sw*.4, y + sw*.5); ctx.quadraticCurveTo(x - sw*.36, y + sw*.92, x - sw*.05, y + sw*.98); }); } } },
  /* quilted padding: two sets of stitched diagonals, and the puff of each diamond catching the lantern on the lit side */
  quilt(ctx, x0, x1, y0, y1, st, col){ for (let y = y0; y < y1; y += st) for (let x = x0 + ((y - y0)/st % 2)*st*.5; x < x1; x += st){ const k = clamp((x - x0)/(x1 - x0), 0, 1); if (k < .7) PR.soft(ctx, x - st*.1, y + st*.4, st*.36, st*.28, '#fff0d8', .14*(1 - k)); }
    PR.stitch(ctx, col, .4, () => { for (let x = x0 - (y1 - y0); x < x1; x += st){ ctx.moveTo(x, y0); ctx.lineTo(x + (y1 - y0), y1); ctx.moveTo(x + (y1 - y0), y0); ctx.lineTo(x, y1); } }); },
  /* the Whitefinder round shield: planks under blue-grey paint, an iron rim, an iron boss with the white fingertip painted on it */
  shield(ctx, x, y, rx, ry, paint){ ctx.save(); ctx.translate(x, y); ell(ctx, 1.5, 2, rx + 2, ry + 2, 'rgba(0,0,0,.5)'); ell(ctx, 0, 0, rx, ry, PR.lin(ctx, -rx, -ry, rx, ry, [[0, shade(paint, .2)], [.45, paint], [1, '#0a0c0e']]));
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 7); ctx.clip(); PR.stroke(ctx, 'rgba(0,0,0,.32)', .5, () => { for (let i = -3; i <= 3; i++){ ctx.moveTo(i*rx/3.6, -ry); ctx.lineTo(i*rx/3.6 + 1, ry); } });
    const r = PR.rng(11); for (let i = 0; i < 9; i++){ const sx = (r() - .6)*rx*1.6, sy = (r() - .5)*ry*1.6; PR.soft(ctx, sx, sy, 2 + r()*4, 1 + r()*2, '#6a4a2c', .55, r()*3); } // the paint worn through to the wood
    PR.soft(ctx, -rx*.4, -ry*.45, rx*.5, ry*.3, '#e8eef4', .14, -.6); ctx.restore();
    ctx.strokeStyle = PR.lin(ctx, -rx, -ry, rx, ry, [[0, '#c8c8c0'], [.4, '#6a6a66'], [1, '#141412']]); ctx.lineWidth = 2.6; ctx.beginPath(); ctx.ellipse(0, 0, rx - .6, ry - .6, 0, 0, 7); ctx.stroke();
    for (let i = 0; i < 12; i++){ const a = i/12*Math.PI*2; ell(ctx, Math.cos(a)*(rx - .6), Math.sin(a)*(ry - .6), .7, .7, a > 1.8 && a < 4.4 ? '#e8e4da' : '#4a4844'); }
    const bx = rx*.06, br = Math.min(rx, ry)*.26; ell(ctx, bx + .8, 1, br + .8, br + .8, 'rgba(0,0,0,.55)'); ell(ctx, bx, 0, br, br, PR.rad(ctx, bx - br*.35, -br*.35, .3, br*1.1, [[0, '#f0ece4'], [.35, '#9a9a94'], [1, '#262624']]));
    ctx.save(); ctx.translate(bx + br*.1, -br*.05); ctx.rotate(-.25); ell(ctx, 0, 0, br*.24, br*.55, '#f4f0e6'); PR.stroke(ctx, 'rgba(120,110,100,.6)', .3, () => { ctx.ellipse(0, -br*.3, br*.15, br*.16, 0, 3.2, 6.2); }); ctx.restore(); // the white fingertip
    ctx.restore(); },
  /* the garment rising from the shoulders to meet the jaw (trapezius under cloth, a high collar), so the head sits in the clothes, not on a post:
     its top edge runs up to the jaw's corner at the sides (o.drop lowers it) and dips under the chin; a lit edge, a dark edge, the jaw's cast shadow on it */
  collar(ctx, F, c1, c2, lines, o = {}){ const u = F.h/20, x = F.x || 0, jw = F.w*(F.jaw ?? .8), jy = F.cy + 13*u + (o.drop || 0), cb = F.cy + 19*u + 1 + (o.drop || 0)*.5, sw = o.sw ?? 28, sy = o.sy ?? -38;
    const top = () => { ctx.moveTo(x - jw - 1.4, jy); ctx.quadraticCurveTo(x - jw*.5, cb - .6, x, cb); ctx.quadraticCurveTo(x + jw*.5, cb - .6, x + jw + 1.4, jy); };
    const shape = () => { ctx.beginPath(); ctx.moveTo(x - sw, sy); ctx.bezierCurveTo(x - sw*.5, sy - 6, x - jw - 2.2, jy + 10, x - jw - 1.4, jy); ctx.quadraticCurveTo(x - jw*.5, cb - .6, x, cb); ctx.quadraticCurveTo(x + jw*.5, cb - .6, x + jw + 1.4, jy);
      ctx.bezierCurveTo(x + jw + 2.2, jy + 10, x + sw*.5, sy - 6, x + sw, sy); ctx.quadraticCurveTo(x, sy + 5, x - sw, sy); ctx.closePath(); };
    ctx.save(); shape(); ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 3; ctx.shadowOffsetY = 1; ctx.fillStyle = PR.lit(ctx, c1, c2, x - sw, x + sw); ctx.fill(); ctx.restore();
    ctx.save(); shape(); ctx.clip(); PR.soft(ctx, x + sw*.55, sy - 6, sw*.6, 12, '#000000', .5); PR.soft(ctx, x - sw*.45, sy - 6, sw*.35, 5, '#fff0d8', .12);
      const st = o.style || 'rib';
      if (lines && st === 'rib') PR.stroke(ctx, lines, .5, () => { for (let i = -3; i <= 3; i++){ const k = i/3.4; ctx.moveTo(x + k*(jw + 1), cb - (1 - k*k)*.2 - Math.abs(k)*(cb - jy)*.9 + 1); ctx.quadraticCurveTo(x + k*(jw + 4), sy - 6, x + k*sw*.8, sy + 2); } }); // quilted
      if (lines && st === 'wrap') PR.stroke(ctx, lines, .7, () => { for (let i = 1; i <= 3; i++){ const d = i*2.8; ctx.moveTo(x - jw - 1.6 - i*1.6, jy + d); ctx.quadraticCurveTo(x, cb + d*1.15, x + jw + 1.6 + i*1.6, jy + d - .6); } }); // wound round
      if (lines && st === 'fold') PR.stroke(ctx, lines, .8, () => { [-1, 1].forEach(sd => { for (let i = 0; i < 2; i++){ ctx.moveTo(x + sd*(jw*.35 + i*4), cb + .6); ctx.quadraticCurveTo(x + sd*(jw + 1 + i*4), cb + 4, x + sd*(jw + 6 + i*6), sy - 1); } }); }); // folds
      PR.soft(ctx, x + 1.4, cb + 1, jw*.9, 3.2, '#0a0604', .62); ctx.restore(); // the jaw's shadow on the cloth
    ctx.lineCap = 'round'; PR.stroke(ctx, 'rgba(0,0,0,.6)', .7, top); ctx.save(); ctx.beginPath(); ctx.rect(x - sw - 4, -200, sw*.95, 400); ctx.clip(); PR.stroke(ctx, o.pip || 'rgba(255,236,200,.32)', o.pip ? .7 : .5, () => { ctx.moveTo(x - jw - 1.2, jy + .4); ctx.quadraticCurveTo(x - jw*.5, cb - .2, x, cb + .4); }); ctx.restore();
    if (o.pip) PR.stroke(ctx, o.pip, .5, () => { ctx.moveTo(x + jw + 1.2, jy + .4); ctx.quadraticCurveTo(x + jw*.5, cb - .2, x, cb + .4); }); },
  /* hair at the back of the head, falling behind the neck to the collar, so the head and the shoulders are one shape */
  back(ctx, F, c1, c2, len = 18, wx = 1.4){ const W = F.w + wx; ctx.beginPath(); ctx.moveTo(-W, F.cy - 6); ctx.quadraticCurveTo(-W - 1, F.cy + len*.6, -W + 1.6, F.cy + len); ctx.lineTo(W - 1.6, F.cy + len); ctx.quadraticCurveTo(W + 1, F.cy + len*.6, W, F.cy - 6); ctx.closePath();
    ctx.fillStyle = PR.lin(ctx, -W, 0, W, 0, [[0, c1], [.5, c2], [1, '#040302']]); ctx.fill(); },
  /* one garment from the shoulders up to the neckline in one piece (Ammet's lesson): the trapezius rises into it, no seam where collar meets shoulder.
     o: {wide, drop, trap: how hard the trapezius rises, nx: half-width where it meets the neck, ny: how high it climbs at the neck's sides, cb: the neckline's low point in front, v: a V opening, c1, c2}.
     Returns {path, top (the neckline as a sub-path), topIn (the same, continuing a path from (−nx, ny)), pt(t, off): a point on the neckline, t −1..1, off pushes down, nx, ny, cb, wd}.
     Draw the neck first, then this, then textures clipped to B.path, then BP.light; any bust in any book can use it. */
  body(ctx, F, o){ const u = F.h/20, wd = o.wide, dr = o.drop || 0, nx = o.nx ?? F.w*(F.jaw ?? .8) + 1.6, ny = o.ny ?? F.cy + 15*u, cb = o.cb ?? F.cy + 20*u, tr = o.trap ?? 0, v = o.v;
    const topIn = () => { if (v) { ctx.lineTo(0, cb); ctx.lineTo(nx, ny); } else { ctx.quadraticCurveTo(-nx*.6, cb, 0, cb); ctx.quadraticCurveTo(nx*.6, cb, nx, ny); } };
    const path = () => { ctx.beginPath(); ctx.moveTo(-wd - 2, 2); ctx.lineTo(-wd, -20 + dr); ctx.bezierCurveTo(-wd, -34 + dr, -wd*.82, -41 + dr, -wd*.52, -43 + dr); ctx.bezierCurveTo(-wd*.3, -44 + dr - tr, -nx - 2 - tr*.3, ny + 8 - tr*.4, -nx, ny); topIn();
      ctx.bezierCurveTo(nx + 2 + tr*.3, ny + 8 - tr*.4, wd*.3, -44 + dr - tr, wd*.52, -43 + dr); ctx.bezierCurveTo(wd*.82, -41 + dr, wd, -34 + dr, wd, -20 + dr); ctx.lineTo(wd + 2, 2); ctx.closePath(); };
    const pt = (t, off = 0) => { const sd = t < 0 ? -1 : 1, s = 1 - Math.min(1, Math.abs(t)), q = (1 - s)*(1 - s); const x = v ? sd*nx*(1 - s) : sd*nx*(q + 2*(1 - s)*s*.6), y = v ? lerp(ny, cb, s) : q*ny + (1 - q)*cb; return [x*(1 + off*.05), y + off]; };
    path(); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 1; ctx.fillStyle = PR.lit(ctx, o.c1, o.c2, -wd, wd*.75); ctx.fill(); ctx.restore();
    return {path, topIn, top: () => { ctx.moveTo(-nx, ny); topIn(); }, pt, nx, ny, cb, wd}; },
  /* a band following the neckline from off0 to off1 below it (a collar, a binding): leaves the path for filling */
  band(ctx, B, o0, o1){ ctx.beginPath(); for (let i = 0; i <= 24; i++){ const [x, y] = B.pt(-1.05 + i/24*2.1, o0); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } for (let i = 24; i >= 0; i--){ const [x, y] = B.pt(-1.05 + i/24*2.1, o1); ctx.lineTo(x, y); } ctx.closePath(); },
  /* the garment's light: the lit trapezius, the dark side, the jaw's shadow (not on an open neck, where PR.neck has it), a dark top edge and a lit one on the lantern side */
  light(ctx, F, B, open){ ctx.save(); B.path(); ctx.clip(); PR.soft(ctx, -B.nx - 7, B.ny + 9, 9, 4, '#fff0d8', .14, -.6); PR.soft(ctx, B.nx + 9, B.ny + 10, 12, 8, '#000000', .42); PR.soft(ctx, B.wd*.62, -16, B.wd*.5, 24, '#000000', .5);
    if (!open) PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3.2, '#0a0604', .6); ctx.restore();
    ctx.lineCap = 'round'; PR.stroke(ctx, 'rgba(0,0,0,.6)', .7, B.top); ctx.save(); ctx.beginPath(); ctx.rect(-80, -200, 79, 400); ctx.clip(); ctx.translate(0, .5); PR.stroke(ctx, 'rgba(255,236,200,.3)', .5, B.top); ctx.restore(); },
};

/* each squadmate: the face, the kit, the things that say who they are */
const POR = {
  sgt(ctx, st){ const F = {cy:-74, w:13.6, h:20, jaw:.84, chin:5.4, skin:'#a8826a', iris:'#5e4c38', lip:'#8a5a4a', browCol:'#1e140e', browW:1.9, arch:.5, rim:'#d6a24a', nose:1.05, smileL:-.3, smileR:-.2, bags:.6, age:.7, look:.35};
    // the shield from Nathilog behind the right shoulder: a battered heater, its paint gone to the ghost of a gold cross
    ctx.save(); ctx.translate(35, -46); ctx.rotate(.14);
    const hs = () => { ctx.beginPath(); ctx.moveTo(-21, -25); ctx.lineTo(21, -25); ctx.lineTo(21, 2); ctx.bezierCurveTo(21, 19, 8, 33, 0, 41); ctx.bezierCurveTo(-8, 33, -21, 19, -21, 2); ctx.closePath(); };
    hs(); ctx.fillStyle = PR.lin(ctx, -21, -25, 21, 30, [[0,'#5e4632'], [.5,'#2e2218'], [1,'#0a0806']]); ctx.fill();
    ctx.save(); hs(); ctx.clip(); ctx.fillStyle = 'rgba(190,146,70,.11)'; ctx.fillRect(-3.5, -25, 7, 70); ctx.fillRect(-21, -7, 42, 6.5); ctx.restore();
    ctx.strokeStyle = PR.lin(ctx, -21, 0, 21, 0, [[0,'#8a8276'], [.5,'#4a4640'], [1,'#161412']]); ctx.lineWidth = 2.6; hs(); ctx.stroke();
    [[-17, -21], [17, -21], [-18, 4], [18, 4]].forEach(([x, y]) => ell(ctx, x, y, .9, .9, x < 0 ? '#b0a898' : '#4a4640'));
    PR.stroke(ctx, 'rgba(0,0,0,.5)', .8, () => { ctx.moveTo(-10, -15); ctx.lineTo(-4, -9); ctx.moveTo(5, 9); ctx.lineTo(11, 17); }); ctx.restore(); // two sword-bites
    // quilting under boiled leather
    PR.neck(ctx, F, 9.6); const B = BP.body(ctx, F, {wide:44, trap:5, ny:F.cy + 15.6, cb:F.cy + 21, c1:'#7a5634', c2:'#3a2616'});
    ctx.save(); B.path(); ctx.clip();
    PR.path(ctx, [[-30, 2], [-28, -34], [-12, -41], [12, -41], [28, -34], [30, 2]]); ctx.fillStyle = PR.lit(ctx, '#6b4a2e', '#2e1f12', -30, 26); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; ctx.stroke(); // the cuirass
    PR.stitch(ctx, 'rgba(200,170,120,.35)', .45, () => { ctx.moveTo(-27, -31); ctx.lineTo(-12, -38); ctx.lineTo(12, -38); ctx.lineTo(27, -31); ctx.moveTo(-1, -38); ctx.lineTo(-1, 0); });
    for (let i=0;i<14;i++){ const r = PR.rng(i + 5); ell(ctx, -26 + r()*50, -30 + r()*28, 1 + r()*2.5, .5 + r(), 'rgba(0,0,0,.18)'); } // scuffs
    [-1, 1].forEach(sd => { ctx.beginPath(); ctx.moveTo(sd*25, -43); ctx.bezierCurveTo(sd*36, -46, sd*46, -38, sd*46, -24); ctx.lineTo(sd*40, -22); ctx.bezierCurveTo(sd*39, -32, sd*34, -37, sd*24, -38); ctx.closePath(); ctx.fillStyle = sd < 0 ? PR.lin(ctx, -46, -44, -26, -24, [[0,'#8a6440'], [1,'#4a3220']]) : PR.lin(ctx, 24, 0, 46, 0, [[0,'#3a2616'], [1,'#0e0906']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.lineWidth = .6; ctx.stroke();
      PR.stroke(ctx, 'rgba(0,0,0,.4)', .5, () => { ctx.moveTo(sd*28, -40.5); ctx.bezierCurveTo(sd*38, -42, sd*43, -34, sd*43.4, -26); }); }); // boiled-leather pauldrons
    ctx.lineCap = 'round'; ctx.strokeStyle = PR.lin(ctx, -44, 0, -24, 0, [[0,'#f4c878'], [.6,'#d6a24a'], [1,'#7a5418']]); ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(-26, -41.6); ctx.bezierCurveTo(-34, -44, -41, -40, -43.6, -30); ctx.stroke(); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-27, -39.6); ctx.bezierCurveTo(-34, -41.4, -39.6, -38, -41.6, -30); ctx.stroke(); // the sergeant's gold, braided on the shoulder
    PR.stroke(ctx, 'rgba(60,36,10,.6)', .35, () => { for (let i=0;i<7;i++){ const k = i/6, x = lerp(-27, -42.6, k), y = lerp(-41.4, -30, k*k); ctx.moveTo(x - .8, y - .6); ctx.lineTo(x + .6, y + .8); } });
    ctx.strokeStyle = PR.lit(ctx, '#4a3422', '#1a1008', -20, 30); ctx.lineWidth = 3.6; ctx.beginPath(); ctx.moveTo(24, -42); ctx.lineTo(-18, 2); ctx.stroke(); ell(ctx, 8, -24, 2, 1.6, '#8a8276'); ell(ctx, 8, -24, 1, .8, '#2a2622'); // the shield strap and its buckle
    PR.stroke(ctx, 'rgba(180,170,150,.5)', .35, () => { ctx.moveTo(-4, -46); ctx.quadraticCurveTo(-8, -30, -12, -22); }); ctx.fillStyle = '#8a8276'; ctx.save(); ctx.translate(-12.4, -21); ctx.rotate(.5); ctx.fillRect(-.8, 0, 1.6, 4.4); ctx.restore(); // the Second Army whistle, no longer used
    ctx.restore(); BP.light(ctx, F, B);
    BP.band(ctx, B, -1, 6.6); ctx.fillStyle = PR.lit(ctx, '#8a8272', '#3a362e', -B.nx - 3, B.nx + 3); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.35)', .45, () => { for (let i = -4; i <= 4; i++){ const [x0, y0] = B.pt(i/4.4, -.6), [x1, y1] = B.pt(i/4.4, 6.6); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); } }); // the gambeson collar, up under the beard
    PR.stroke(ctx, 'rgba(0,0,0,.5)', .6, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1.05 + i/20*2.1, 6.6); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } });
    F.under = (ctx, F) => { const u = F.h/20, r = PR.rng(77), cy = F.cy, w = F.w; ctx.lineCap = 'round'; // a short dark beard, kept with a knife, grey coming in at the chin
      ctx.beginPath(); ctx.moveTo(-w - 2, cy + 3.5*u); ctx.quadraticCurveTo(-w*.6, cy + 8.2*u, -4.9, cy + 9.6*u); ctx.lineTo(4.9, cy + 9.6*u); ctx.quadraticCurveTo(w*.6, cy + 8.2*u, w + 2, cy + 3.5*u); ctx.lineTo(w + 2, cy + 24*u); ctx.lineTo(-w - 2, cy + 24*u); ctx.closePath();
      ctx.ellipse(0, cy + 12.4*u, 4.5, 1.7*u, 0, 0, Math.PI*2); ctx.fillStyle = PR.lin(ctx, -w, 0, w, 0, [[0, 'rgba(70,48,32,.62)'], [.45, 'rgba(40,26,18,.72)'], [1, 'rgba(12,8,6,.85)']]); ctx.fill('evenodd');
      for (let i=0;i<380;i++){ const x = (r() - .5)*2*w, yy = 6 + r()*13.6 + Math.abs(x)/w*2.4, y = cy + yy*u; if (Math.abs(x) < 4.5 && yy > 10.6 && yy < 14.2) continue; if (yy < 9.6 && Math.abs(x) < 4.6) continue;
        const grey = yy > 16 && Math.abs(x) < 4 && r() < .22; ctx.strokeStyle = grey ? 'rgba(150,140,128,.45)' : x < 0 ? 'rgba(84,58,38,.55)' : 'rgba(20,12,8,.6)'; ctx.lineWidth = .45; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (r() - .5)*.6, y + .9 + r()*.8); ctx.stroke(); }
      PR.stroke(ctx, 'rgba(30,20,12,.85)', .75, () => { for (let i=0;i<14;i++){ const k = i/13, x = lerp(-5, 5, k); ctx.moveTo(x*.55, cy + 9.8*u); ctx.lineTo(x, cy + 11.3*u + Math.abs(x)*.1); } }); // the moustache
      PR.stroke(ctx, 'rgba(220,170,150,.45)', .55, () => { ctx.moveTo(-8.8, F.cy - 8.2); ctx.lineTo(-6.8, F.cy - 2.6); }); // an old cut through the brow
      if (st === 'scar') { ctx.lineCap = 'round'; PR.stroke(ctx, 'rgba(110,50,42,.6)', 1.3, () => { ctx.moveTo(10.4, F.cy + 1); ctx.quadraticCurveTo(8.4, F.cy + 8, 5.4, F.cy + 15.5); }); PR.stroke(ctx, 'rgba(210,150,130,.4)', .45, () => { ctx.moveTo(10, F.cy + 1.2); ctx.quadraticCurveTo(8, F.cy + 8, 5, F.cy + 15.3); });
        PR.stroke(ctx, 'rgba(90,30,26,.6)', .35, () => { for (let i=0;i<5;i++){ const k = i/4, x = lerp(10.2, 5.6, k) - k*k*.6, y = F.cy + 1.5 + k*13.6; ctx.moveTo(x - 1.1, y - .5); ctx.lineTo(x + 1.1, y + .4); } }); } }; // the alley, stitched by Ohl
    PR.face(ctx, F);
    // the iron cap with leather cheek-flaps
    const capY = F.cy - 8.2; [-1, 1].forEach(sd => { ctx.fillStyle = sd < 0 ? PR.lin(ctx, -17, 0, -11, 0, [[0,'#5a4028'], [1,'#2e2014']]) : '#1a120a'; PR.path(ctx, [[sd*15.8, capY], [sd*11.8, capY + .5], [sd*12.8, F.cy + 6], [sd*13.2, F.cy + 11.5], [sd*16.6, F.cy + 10.4], [sd*16.8, capY + 2]]); ctx.fill(); PR.stitch(ctx, 'rgba(200,170,120,.3)', .35, () => { ctx.moveTo(sd*13, capY + 1.5); ctx.lineTo(sd*13.9, F.cy + 10); }); });
    ctx.beginPath(); ctx.ellipse(0, capY, 16.2, 16.6, 0, Math.PI, 0); ctx.closePath(); ctx.fillStyle = PR.lin(ctx, -16, capY - 12, 16, capY, [[0,'#8e8a82'], [.35,'#5a5750'], [.75,'#262422'], [1,'#0e0d0c']]); ctx.fill();
    PR.soft(ctx, -7, capY - 10, 6, 3, '#e8e0d0', .28, -.5); PR.soft(ctx, 4, capY - 6, 2.5, 1.5, '#000000', .35); PR.stroke(ctx, 'rgba(0,0,0,.4)', .5, () => { ctx.arc(3, capY - 5, 3, 3.6, 4.6); ctx.moveTo(0, capY - 16.4); ctx.lineTo(0, capY); });
    ctx.fillStyle = PR.lin(ctx, -17, 0, 17, 0, [[0,'#7a766e'], [.5,'#44413c'], [1,'#121110']]); ctx.fillRect(-17.2, capY - 1.6, 34.4, 3.6); for (let i=0;i<9;i++){ const x = -15 + i*3.75; ell(ctx, x, capY + .2, .6, .6, i < 5 ? '#b0aa9e' : '#4a4640'); }
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-16, capY + 2, 32, .8);
    return F; },
  brisk(ctx){ const F = {cy:-77, w:15.6, h:20.6, jaw:.97, chin:7.2, skin:'#c49c80', iris:'#7e90a2', lip:'#9a6258', browCol:'#6e5230', browW:1.6, arch:.55, rim:'#cfc6b4', rimA:.14, nose:1.25, smileL:-.4, smileR:-.3, mouthW:4.3, age:.3, earS:1.05};
    // the spear, upright behind her right shoulder: an ash shaft, a long iron leaf
    ctx.lineCap = 'butt'; ctx.strokeStyle = PR.lin(ctx, 35, 0, 42, 0, [[0,'#9a7a50'], [.5,'#5a4428'], [1,'#1e160c']]); ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(41, 4); ctx.lineTo(38, -104); ctx.stroke();
    ctx.fillStyle = '#34302a'; PR.path(ctx, [[35.8, -104], [40.2, -104], [39.8, -110], [36.2, -110]]); ctx.fill(); // the socket, bound with wire
    PR.stroke(ctx, 'rgba(200,190,170,.5)', .4, () => { for (let i=0;i<3;i++){ ctx.moveTo(35.9, -105 - i*1.6); ctx.lineTo(40.1, -105.6 - i*1.6); } });
    PR.path(ctx, [[38, -134], [41.6, -121], [39.8, -110], [36.2, -110], [34.4, -121]]); ctx.fillStyle = PR.lin(ctx, 34, 0, 42, 0, [[0,'#e4ded2'], [.45,'#9a968c'], [1,'#262420']]); ctx.fill();
    PR.stroke(ctx, 'rgba(0,0,0,.45)', .5, () => { ctx.moveTo(38, -132); ctx.lineTo(38, -111); });
    // the shield behind her left shoulder: big, round, iron-rimmed, painted oxblood with a band of bone, and it has stopped a great deal
    ctx.save(); ctx.translate(-36, -30); ell(ctx, 0, 0, 30, 33, '#141210');
    ell(ctx, 0, 0, 27.4, 30.4, PR.lin(ctx, -26, -30, 22, 30, [[0,'#9a3a2c'], [.45,'#6a2418'], [1,'#1c0a06']]));
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 27.4, 30.4, 0, 0, 7); ctx.clip(); ctx.rotate(-.5); ctx.fillStyle = PR.lin(ctx, -30, 0, 30, 0, [[0,'#d8ccb0'], [.5,'#9a8e76'], [1,'#3a3428']]); ctx.fillRect(-40, -4.5, 80, 9); ctx.restore(); // the bone band
    ctx.strokeStyle = PR.lin(ctx, -28, -30, 28, 30, [[0,'#b0aa9e'], [.5,'#5a5650'], [1,'#161412']]); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, 28.6, 31.6, 0, 0, 7); ctx.stroke(); // the rim
    for (let i=0;i<10;i++){ const a = i/10*Math.PI*2; ell(ctx, Math.cos(a)*28.6, Math.sin(a)*31.6, .7, .7, a > 1.6 && a < 4.2 ? '#d8d2c6' : '#4a4640'); }
    PR.stroke(ctx, 'rgba(30,10,6,.55)', .8, () => { for (let i=0;i<9;i++){ const r = PR.rng(i + 31); const x = -20 + r()*34, y = -22 + r()*40; ctx.moveTo(x, y); ctx.lineTo(x + 2 + r()*4, y + 1 + r()*3); } }); // gouges through the paint
    ell(ctx, 7, 2, 6, 6.6, PR.rad(ctx, 5.4, .4, .5, 6.4, [[0,'#e8e4d8'], [.4,'#8e8a82'], [1,'#262420']])); ctx.restore(); // the boss
    // shoulders a doorway wide: mail over a padded oxblood tunic
    PR.neck(ctx, F, 10.4); const B = BP.body(ctx, F, {wide:56, drop:2, trap:6, ny:F.cy + 16, cb:F.cy + 21, c1:'#8e8a82', c2:'#302e2a'});
    ctx.save(); B.path(); ctx.clip(); PR.mail(ctx, -58, 58, -66, 2, '#8e8a82', 2.1); PR.soft(ctx, 32, -20, 30, 26, '#000000', .5); PR.soft(ctx, -28, -32, 22, 12, '#e8dcc0', .12);
    ctx.fillStyle = PR.lit(ctx, '#7a2a1e', '#240c08', -58, 40); ctx.fillRect(-60, -9, 120, 12); PR.stroke(ctx, 'rgba(0,0,0,.5)', .6, () => { ctx.moveTo(-60, -9); ctx.lineTo(60, -9); }); // the tunic below the mail's hem
    ctx.fillStyle = PR.lit(ctx, '#5a4028', '#241810', -30, 30); PR.path(ctx, [[-32, -41], [-27, -44], [36, 2], [28, 2]]); ctx.fill(); ctx.fillStyle = '#9a9488'; ctx.fillRect(4, -21, 4.4, 4.4); ctx.fillStyle = '#34322e'; ctx.fillRect(5.1, -19.9, 2.2, 2.2); ctx.restore(); BP.light(ctx, F, B); // the baldric and its buckle
    // the scale gorget: a collar round the neck in one piece with the mail, each row hanging over the one below like slates
    { BP.band(ctx, B, -1, 12); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 2; ctx.fillStyle = '#2a2722'; ctx.fill(); ctx.restore();
      ctx.save(); BP.band(ctx, B, -1, 12); ctx.clip(); BP.scales(ctx, -B.nx*1.7, B.nx*1.7, B.ny - 2, B.cb + 12, 4.4, '#8a8274', 17); PR.soft(ctx, B.nx, B.ny + 8, 14, 10, '#000000', .4); PR.soft(ctx, -B.nx*.7, B.ny + 4, 7, 4, '#e8dcc0', .12); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3.2, '#0a0604', .55); ctx.restore();
      ctx.lineCap = 'round'; PR.stroke(ctx, '#3a2618', 2.4, B.top); ctx.save(); ctx.translate(0, -.6); PR.stroke(ctx, 'rgba(200,160,110,.3)', .6, B.top); ctx.restore(); // the leather it's riveted to, rolled at the top
      for (let i = 1; i < 10; i++){ const [x, y] = B.pt(-1 + i/5, .2); ell(ctx, x, y, .75, .75, x < 3 ? '#c8c0b0' : '#6a645a'); }
      PR.stroke(ctx, 'rgba(10,8,6,.7)', .7, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1.05 + i/20*2.1, 12); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); } // the hem's dark edge
    F.under = (ctx, F) => { const u = F.h/20; PR.dots(ctx, F, 70, 'rgba(150,80,50,.22)', .5, [-4, 8, (x, y) => Math.abs(x) > F.w*.8]); // freckles, sun-faded
      PR.soft(ctx, 2, F.cy + 16, 5.5, 2, '#140806', .22);
      ctx.lineCap = 'round'; PR.stroke(ctx, 'rgba(236,196,176,.4)', .5, () => { ctx.moveTo(-6.2, F.cy + 16.4*u); ctx.lineTo(-3.8, F.cy + 17.6*u); }); // a nick on the chin that healed pale
      PR.soft(ctx, -1.2, F.cy + .6*u, 1.6, 1.3, '#ffe0c8', .34); PR.soft(ctx, .9, F.cy + 1.4*u, 1.3, 1.2, '#2a100a', .3); }; // the nose, broken once and set by someone in a hurry
    PR.face(ctx, F);
    // wheat-pale hair scraped back hard, and plaited into a crown so no helm can pull it
    const u = F.h/20, top = F.cy - 21*u, hl = F.cy - 12.6*u, W2 = F.w + 1.2;
    ctx.beginPath(); ctx.moveTo(-W2, F.cy - 1*u); ctx.bezierCurveTo(-W2 - .4, top + 2, -W2*.55, top - 2.6, 0, top - 2.8); ctx.bezierCurveTo(W2*.55, top - 2.6, W2 + .4, top + 2, W2, F.cy - 1*u);
    ctx.lineTo(W2 - 1.4, F.cy - 2*u); ctx.bezierCurveTo(W2 - 2.4, hl - 1, W2*.5, hl - 1.6, 0, hl); ctx.bezierCurveTo(-W2*.5, hl - 1.6, -W2 + 2.4, hl - 1, -W2 + 1.4, F.cy - 2*u); ctx.closePath();
    ctx.fillStyle = PR.lin(ctx, -W2, 0, W2, 0, [[0,'#e0c890'], [.35,'#c0a468'], [.75,'#6a5430'], [1,'#1e160a']]); ctx.fill();
    PR.strands(ctx, 46, ['rgba(250,230,180,.55)', 'rgba(120,90,50,.55)', 'rgba(70,52,28,.5)'], .45, 11, (i, r) => { const k = i/45, x0 = lerp(-W2 + 2, W2 - 2, k), y0 = hl - 1 + Math.abs(x0)*.14; return [x0, y0, x0*1.02, y0 - 5, x0*.8, top + 3 + r()*2]; }); // combed back
    const cb = k => { const a = Math.PI*(1.04 - k*1.08); return [Math.cos(a)*(W2 - 1.2), top + 6.8 - Math.sin(a)*8.6, a]; }; // the crown plait, ear to ear over the top of the head
    ctx.lineCap = 'round'; ctx.strokeStyle = '#4a3818'; ctx.lineWidth = 5.2; ctx.beginPath(); for (let i=0;i<=24;i++){ const [x, y] = cb(i/24); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    for (let i=0;i<24;i++){ const [x, y, a] = cb((i + .5)/24), th = a - Math.PI/2, sd = i%2 ? 1 : -1, lit = x < 5, ox = Math.cos(a)*sd*.85, oy = -Math.sin(a)*sd*.85;
      ctx.save(); ctx.translate(x + ox, y + oy); ctx.rotate(th + sd*.95); ell(ctx, 0, 0, 2.2, 1.55, PR.lin(ctx, -2.5, -1.2, 2.5, 1.2, lit ? [[0,'#f2dfae'], [.55,'#bc9c60'], [1,'#5a4622']] : [[0,'#a08450'], [.6,'#62502c'], [1,'#1e160a']])); ctx.restore(); }
    return F; },
  kettle(ctx){ const F = {cy:-71, w:13.4, h:19, jaw:.76, chin:4.8, skin:'#c29a7e', iris:'#6a7a3a', lip:'#b0645a', browCol:'#8a3a1c', browW:1.1, arch:1.4, browL:.9, browR:-.1, rim:'#e07a45', nose:.95, smileL:-.1, smileR:1.1, teeth:true, look:.1, flush:'#d0685a'};
    PR.neck(ctx, F, 8); const B = BP.body(ctx, F, {wide:36, drop:4, trap:1.5, nx:10.4, ny:F.cy + 15.4, cb:F.cy + 21.6, c1:'#9a5230', c2:'#3a1c0e'});
    ctx.save(); B.path(); ctx.clip();
    PR.stroke(ctx, 'rgba(30,14,6,.55)', .7, () => { ctx.moveTo(-3, -46); ctx.lineTo(-2, 2); ctx.moveTo(3, -46); ctx.lineTo(2, 2); }); PR.stroke(ctx, '#2a1a0e', .5, () => { for (let i=0;i<6;i++){ ctx.moveTo(-3, -42 + i*6); ctx.lineTo(3, -39 + i*6); ctx.moveTo(3, -42 + i*6); ctx.lineTo(-3, -39 + i*6); } }); // the jerkin's laces
    [[-20, -22, 3], [-26, -34, 2.2], [20, -14, 3.6], [12, -36, 2]].forEach(([x, y, r], i) => { PR.soft(ctx, x, y, r*2.6, r*1.8, '#140a04', .55, i); if (i%2 === 0) { ell(ctx, x + .4, y, r*.4, r*.3, '#0a0604', i); ctx.strokeStyle = 'rgba(255,150,70,.4)'; ctx.lineWidth = .35; ctx.beginPath(); ctx.ellipse(x + .4, y, r*.4, r*.3, i, 0, 7); ctx.stroke(); } }); // scorch, and a hole or two
    ctx.strokeStyle = PR.lit(ctx, '#3a2616', '#140c06', -20, 30); ctx.lineWidth = 4.2; ctx.beginPath(); ctx.moveTo(-22, -44); ctx.lineTo(28, 2); ctx.stroke(); // the munitions satchel's strap
    [[-8, -30], [-1, -23.5]].forEach(([x, y], i) => { ell(ctx, x, y + 3.4, 3.4, 3.6, PR.rad(ctx, x - 1.2, y + 2, .5, 4, [[0,'#b8a888'], [1,'#4a3e2e']])); ctx.fillStyle = '#6a1e14'; ctx.fillRect(x - 1.4, y - 1, 2.8, 1.6); PR.stroke(ctx, '#2a2018', .5, () => { ctx.moveTo(x, y - 1); ctx.quadraticCurveTo(x + 1.5, y - 3, x + .5, y - 4.4); }); }); // two sharpers, wax-sealed
    ctx.strokeStyle = '#8a7450'; ctx.lineWidth = .7; for (let i=0;i<4;i++){ ctx.beginPath(); ctx.ellipse(11, -15 + i*.6, 4.6 - i*.4, 2.2, .7, 0, 7); ctx.stroke(); } // a coil of trip-cord
    ctx.fillStyle = '#9a9488'; ctx.save(); ctx.translate(-27, -10); ctx.rotate(-.35); ctx.fillRect(-.5, -7, 1, 7); ell(ctx, 0, -8, 1.3, 1.9, '#9a9488'); ctx.restore(); // the spoon
    ctx.restore(); BP.light(ctx, F, B, true); BP.band(ctx, B, -.6, 1.6); ctx.fillStyle = PR.lit(ctx, '#7a3c1c', '#2a1006', -12, 12); ctx.fill(); // the jerkin's bound neck
    F.under = (ctx, F) => { PR.dots(ctx, F, 90, 'rgba(150,70,40,.4)', .5, [-3, 8, (x, y) => Math.abs(x) > F.w*.72]); // freckles, under the soot
      PR.soft(ctx, -8, F.cy + 6, 5, 2.4, '#140a06', .45, .3); PR.soft(ctx, 3, F.cy + 3.5, 5, 1.2, '#140a06', .35, -.2); PR.soft(ctx, 6, F.cy - 11, 6, 2.4, '#140a06', .4); PR.soft(ctx, 9, F.cy + 13, 4, 2.6, '#140a06', .4); }; // soot
    PR.face(ctx, F);
    // red hair, cut short with a knife, sticking out every way, soot in it
    ctx.fillStyle = PR.lin(ctx, -14, 0, 14, 0, [[0,'#c8562e'], [.5,'#9a3a1c'], [1,'#3a140a']]); ctx.beginPath(); ctx.moveTo(-14.6, F.cy + 2); ctx.bezierCurveTo(-16.4, F.cy - 12, -12, F.cy - 22.6, 0, F.cy - 22.2); ctx.bezierCurveTo(12, F.cy - 22.6, 16.4, F.cy - 12, 14.6, F.cy + 2); ctx.lineTo(13, F.cy - 6); ctx.lineTo(10, F.cy - 10.6); ctx.lineTo(6, F.cy - 9); ctx.lineTo(2, F.cy - 11.4); ctx.lineTo(-3, F.cy - 9.4); ctx.lineTo(-7, F.cy - 11.6); ctx.lineTo(-11, F.cy - 8.4); ctx.lineTo(-13.2, F.cy - 4); ctx.closePath(); ctx.fill();
    PR.strands(ctx, 70, ['#d8683a', '#b8482a', '#8a2e14', '#e07a45', '#4a2014'], .7, 11, (i, r) => { const a = Math.PI*(1.04 + r()*.92), rr = 14.6 + r()*2, x0 = Math.cos(a)*10, y0 = F.cy - 8 + Math.sin(a)*11.5, x1 = Math.cos(a)*rr*(1.02 + r()*.12), y1 = F.cy - 8 + Math.sin(a)*rr*.95 + r()*4; return [x0, y0, (x0 + x1)/2 + (r() - .5)*4, (y0 + y1)/2, x1, y1]; });
    PR.strands(ctx, 26, ['#c8562e', '#e07a45', '#9a3a1c'], .7, 12, (i, r) => { const x = -12 + r()*22, y = F.cy - 13 + r()*3; return [x, y, x + (r() - .5)*3, y + 2.5, x + (r() - .4)*4, y + 4 + r()*2.6]; }); // the fringe
    PR.soft(ctx, 8, F.cy - 16, 6, 4, '#0c0604', .5); PR.soft(ctx, -10, F.cy - 4, 3, 5, '#0c0604', .35);
    // goggles pushed up on her head, the lenses full of the lantern
    PR.stroke(ctx, '#2a1a10', 2.2, () => { ctx.moveTo(-15.4, F.cy - 11); ctx.quadraticCurveTo(0, F.cy - 19.6, 15.4, F.cy - 11); });
    [-1, 1].forEach(sd => { const gx = sd*5.6, gy = F.cy - 16.6; ell(ctx, gx, gy, 4.4, 3.8, '#1a1208'); ctx.strokeStyle = PR.lin(ctx, gx - 4, 0, gx + 4, 0, [[0,'#e8c078'], [.5,'#a07838'], [1,'#3a2a14']]); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.ellipse(gx, gy, 3.8, 3.2, 0, 0, 7); ctx.stroke();
      ell(ctx, gx, gy, 3.1, 2.6, PR.rad(ctx, gx - 1, gy - 1, .3, 3.4, [[0,'#5a3a24'], [1,'#0e1014']])); PR.soft(ctx, gx - 1.2, gy - 1, 1.6, 1, '#ffc080', sd < 0 ? .7 : .35, -.4); });
    ctx.fillStyle = '#6a5030'; ctx.fillRect(-1.8, F.cy - 17.4, 3.6, 1.4);
    return F; },
  tuft(ctx, st){ const F = {cy:-73, w:12.4, h:18.6, jaw:.7, chin:4.2, skin:'#c9b5a6', iris:'#a896e0', eyeGlow:'#a08de0', lip:'#a07068', browCol:'#241a18', browW:1.05, arch:1.2, rim:'#a08de0', nose:.85, mouthW:3.4, bags:1, open:1.12, look:0, smileL:.15, smileR:.05};
    // the grey cloak, which is sometimes not there: its hem goes to smoke
    const cloak = () => { ctx.beginPath(); ctx.moveTo(-38, 4); ctx.bezierCurveTo(-37, -20, -33, -38, -22, -46); ctx.quadraticCurveTo(-18, -80, 0, -97); ctx.quadraticCurveTo(18, -80, 22, -46); ctx.bezierCurveTo(33, -38, 37, -20, 38, 4); ctx.closePath(); };
    cloak(); ctx.fillStyle = PR.lit(ctx, '#4a4558', '#141118', -38, 30); ctx.fill();
    ctx.save(); cloak(); ctx.clip(); PR.stroke(ctx, 'rgba(0,0,0,.4)', 1.4, () => { for (let i=-2;i<=2;i++){ ctx.moveTo(i*8, -44); ctx.quadraticCurveTo(i*12, -20, i*16, 4); } }); PR.stroke(ctx, 'rgba(190,180,220,.07)', 1, () => { for (let i=-2;i<=1;i++){ ctx.moveTo(i*8 + 2, -44); ctx.quadraticCurveTo(i*12 + 2, -20, i*16 + 3, 4); } });
    ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = PR.lin(ctx, 0, -18, 0, 4, [[0,'rgba(0,0,0,0)'], [1,'rgba(0,0,0,.85)']]); ctx.fillRect(-40, -18, 80, 24); ctx.globalCompositeOperation = 'source-over'; ctx.restore();
    PR.neck(ctx, F, 7.4); { const B = BP.body(ctx, F, {wide:30, drop:4, ny:F.cy + 14.6, cb:F.cy + 20.4, c1:'#4a4558', c2:'#141118'}); // the cloak, drawn up to the throat
      ctx.save(); B.path(); ctx.clip(); PR.stroke(ctx, 'rgba(0,0,0,.4)', 1.2, () => { for (let i = -2; i <= 2; i++){ ctx.moveTo(i*4, B.cb + 2); ctx.quadraticCurveTo(i*8, -24, i*12, 4); } }); ctx.restore(); BP.light(ctx, F, B);
      ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = PR.lin(ctx, 0, -18, 0, 4, [[0,'rgba(0,0,0,0)'], [1,'rgba(0,0,0,.85)']]); ctx.fillRect(-40, -18, 80, 24); ctx.restore(); // and it goes to smoke
      ell(ctx, 0, B.cb + 3.4, 1.8, 1.8, '#6a6478'); ell(ctx, -.4, B.cb + 3, .7, .7, '#c8c0d8'); } // the clasp
    F.under = (ctx, F, path, top, bot) => { PR.soft(ctx, 1, bot - 1, F.w*.9, 6, '#a08de0', .22); PR.soft(ctx, 0, F.cy - 12, F.w*1.2, 8, '#08060c', .62); }; // warren-light from below; the hood's shadow on her brow
    PR.face(ctx, F);
    // dark hair from under the hood, and (if she has come back from the threshold) one lock gone grey
    PR.strands(ctx, 30, ['#241a18', '#2e221e', '#1a1210'], .8, 21, (i, r) => { const sd = i%2 ? 1 : -1, x = sd*(6.5 + r()*5.5), y = F.cy - 15 + r()*2; return [x, y, x + sd*(1 + r()*2), y + 6, x + sd*(2.5 + r()*3), y + 12 + r()*10]; });
    if (st === 'marked') PR.strands(ctx, 10, ['rgba(200,194,204,.8)', 'rgba(164,158,170,.8)', 'rgba(220,216,224,.7)'], .6, 23, (i, r) => { const x = -7 + r()*2.4, y = F.cy - 15.6; return [x, y, x - 2.6 + r(), y + 8, x - 3.8 - r()*1.6, y + 15 + r()*7]; });
    // the hood's rim round her face
    ctx.beginPath(); ctx.moveTo(-24, -42); ctx.quadraticCurveTo(-22, -86, 0, -99); ctx.quadraticCurveTo(22, -86, 24, -42); ctx.lineTo(16.4, -46); ctx.quadraticCurveTo(17.4, F.cy - 15, 0, F.cy - 19.6); ctx.quadraticCurveTo(-17.4, F.cy - 15, -16.4, -46); ctx.closePath(); ctx.fillStyle = PR.lit(ctx, '#565068', '#16131c', -24, 20); ctx.fill();
    PR.stroke(ctx, 'rgba(210,200,240,.16)', .7, () => { ctx.moveTo(-16.2, -47); ctx.quadraticCurveTo(-17.2, F.cy - 15, 0, F.cy - 19.4); });
    return F; },
  ohl(ctx){ const F = {cy:-67, x:2, w:14, h:20, jaw:.8, chin:5.4, skin:'#9a7658', iris:'#56442a', lip:'#7a4a3e', browCol:'#d0c8b8', browW:2, arch:1.3, rim:'#7fb394', nose:1.3, age:1, bags:1.2, open:.85, earS:1.18, smileL:0, smileR:0};
    // stooped: the shoulders round and the head comes forward and down
    const body = () => { ctx.beginPath(); ctx.moveTo(-44, 2); ctx.lineTo(-43, -18); ctx.bezierCurveTo(-42, -32, -34, -40, -20, -44); ctx.quadraticCurveTo(-8, -49, 0, -48); ctx.quadraticCurveTo(10, -49, 22, -43); ctx.bezierCurveTo(36, -38, 42, -30, 42, -16); ctx.lineTo(44, 2); ctx.closePath(); };
    body(); ctx.fillStyle = PR.lit(ctx, '#5a6b56', '#1c231b', -44, 30); ctx.fill();
    ctx.save(); body(); ctx.clip(); PR.stroke(ctx, 'rgba(0,0,0,.35)', 1.4, () => { for (let i=-3;i<=3;i++){ ctx.moveTo(i*8, -44); ctx.quadraticCurveTo(i*11, -22, i*14, 4); } });
    ctx.save(); PR.path(ctx, [[-10, -47], [10, -47], [0, -28]]); ctx.fillStyle = '#2e261e'; ctx.fill(); ctx.clip(); PR.mail(ctx, -10, 10, -47, -28, '#6a5a44', 1.4); ctx.restore(); // the old hauberk, not washed
    ctx.fillStyle = PR.lin(ctx, 10, -26, 20, -18, [[0,'#c8b888'], [1,'#6a5a3a']]); ctx.save(); ctx.translate(15, -22); ctx.rotate(-.18); ctx.fillRect(-5, -6, 10, 12); ctx.fillStyle = 'rgba(40,30,20,.5)'; for (let i=0;i<7;i++) ctx.fillRect(-3.6, -4.6 + i*1.5, 5 + (i%3), .45); ctx.restore(); // the list, in oilcloth
    ctx.restore();
    ctx.beginPath(); ctx.moveTo(-26, -40); ctx.bezierCurveTo(-28, -56, -18, -62, 0, -60); ctx.bezierCurveTo(18, -62, 30, -56, 28, -40); ctx.quadraticCurveTo(14, -48, 2, -47); ctx.quadraticCurveTo(-12, -48, -26, -40); ctx.fillStyle = PR.lit(ctx, '#4e5e4a', '#141a14', -28, 22); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.4)', .8, () => { ctx.moveTo(-20, -52); ctx.quadraticCurveTo(0, -50, 22, -52); ctx.moveTo(-16, -56); ctx.quadraticCurveTo(0, -55, 18, -56); }); // the hood, down
    PR.neck(ctx, F, 7);
    F.under = (ctx, F) => { const r = PR.rng(9); for (let i=0;i<9;i++) PR.soft(ctx, -8 + r()*14, F.cy - 17 + r()*6, .8 + r()*1.2, .6 + r(), '#3a2414', .5); PR.soft(ctx, -3, F.cy - 16, 7, 3, '#ffe4c8', .12); }; // age spots on the crown, and the lamp on it
    PR.face(ctx, F);
    [-1, 1].forEach(sd => PR.strands(ctx, 24, ['#d8d0c0', '#a8a090', '#8a8478'], .7, sd*5 + 30, (i, r) => { const x = F.x + sd*(11 + r()*3.6), y = F.cy - 8 + r()*8; return [x, y, x + sd*(1 + r()*2), y + 3, x + sd*(1.6 + r()*2.4), y + 5 + r()*4]; })); // a white fringe, over the ears
    // a long grey beard, and a moustache over the mouth
    const bx = F.x, by = F.cy; ctx.beginPath(); ctx.moveTo(bx - 11.6, by + 5); ctx.bezierCurveTo(bx - 12, by + 18, bx - 8, by + 30, bx + 1, by + 38); ctx.bezierCurveTo(bx + 8, by + 30, bx + 12.4, by + 18, bx + 11.6, by + 5); ctx.bezierCurveTo(bx + 8, by + 16, bx + 5, by + 18, bx, by + 18); ctx.bezierCurveTo(bx - 5, by + 18, bx - 8, by + 16, bx - 11.6, by + 5); ctx.fillStyle = PR.lin(ctx, bx - 12, 0, bx + 12, 0, [[0,'#d8d0c0'], [.45,'#a8a090'], [1,'#3a3630']]); ctx.fill();
    PR.strands(ctx, 110, ['#e8e0d0', '#b8b0a0', '#8a8478', '#6a665e'], .45, 41, (i, r) => { const x0 = bx + (r() - .5)*20, y0 = by + 8 + r()*10, x1 = bx + (x0 - bx)*.35 + (r() - .5)*4, y1 = y0 + 10 + r()*16; return [x0, y0, (x0 + x1)/2 + (r() - .5)*2, (y0 + y1)/2, x1, Math.min(y1, by + 36)]; });
    ctx.beginPath(); ctx.moveTo(bx - .4, by + 9.8); ctx.bezierCurveTo(bx - 3, by + 9, bx - 6.6, by + 10.6, bx - 7.4, by + 15.4); ctx.quadraticCurveTo(bx - 4, by + 12.6, bx - .4, by + 12.2); ctx.quadraticCurveTo(bx + 4, by + 12.6, bx + 7.4, by + 15.4); ctx.bezierCurveTo(bx + 6.6, by + 10.6, bx + 3, by + 9, bx + .4, by + 9.8); ctx.fillStyle = PR.lin(ctx, bx - 7, 0, bx + 7, 0, [[0,'#e0d8c8'], [.5,'#b0a898'], [1,'#4a463e']]); ctx.fill();
    return F; },
  ellis(ctx){ const F = {cy:-74, w:12.8, h:19.5, jaw:.74, chin:4.6, skin:'#b89a80', iris:'#6a806c', lip:'#9a6458', browCol:'#2a1c12', browW:1.15, arch:.5, browL:.2, rim:'#8fb3a0', rimA:.15, nose:.95, look:-.75, smileL:-.1, smileR:.55, mouthW:3.8};
    // the quiver over her right shoulder, grey fletching
    ctx.fillStyle = PR.lit(ctx, '#4a3624', '#1a120a', 18, 34); ctx.save(); ctx.translate(26, -40); ctx.rotate(.32); ctx.fillRect(-4.5, -12, 9, 40); ctx.restore();
    for (let i=0;i<7;i++){ const x = 19 + i*1.9, y = -54 + i*.7 + (i%2)*1.2, c = ['#9a9a92','#7a7a74','#b8b8b0'][i%3]; PR.stroke(ctx, '#3a2a1a', .6, () => { ctx.moveTo(x + 1, y + 10); ctx.lineTo(x, y - 2); }); ell(ctx, x - .3, y + 2, .9, 3.6, c, -.12); ell(ctx, x + .5, y + 2.2, .6, 3.2, shade(c, -.4), -.1); } // grey fletching
    PR.neck(ctx, F, 7.8); const B = BP.body(ctx, F, {wide:34, drop:3, trap:1.5, ny:F.cy + 15.6, cb:F.cy + 20.4, c1:'#66784e', c2:'#1f2618'});
    ctx.save(); B.path(); ctx.clip(); PR.stroke(ctx, 'rgba(0,0,0,.3)', .8, () => { ctx.moveTo(-18, -40); ctx.quadraticCurveTo(-14, -20, -20, 2); ctx.moveTo(18, -40); ctx.quadraticCurveTo(15, -20, 20, 2); }); PR.stitch(ctx, 'rgba(200,210,170,.25)', .45, () => { ctx.moveTo(-12, -44); ctx.lineTo(-10, 2); });
    ctx.strokeStyle = PR.lit(ctx, '#4a3624', '#1a120a', -20, 30); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-26, -40); ctx.lineTo(30, -4); ctx.stroke(); ctx.restore(); BP.light(ctx, F, B); // the quiver strap
    BP.band(ctx, B, -1, 5); ctx.fillStyle = PR.lit(ctx, '#5a6b44', '#1a2014', -B.nx - 3, B.nx + 3); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 5); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); // the laced collar
    PR.stroke(ctx, '#2a2018', .5, () => { for (let i = 0; i < 3; i++){ ctx.moveTo(-2, B.cb + .6 + i*2.2); ctx.lineTo(2, B.cb + 1.6 + i*2.2); } }); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .5);
    PR.stroke(ctx, 'rgba(160,140,110,.8)', .4, () => { ctx.moveTo(-5.6, -50); ctx.quadraticCurveTo(-3, -45, 1.6, -44.6); }); ctx.fillStyle = 'rgba(200,180,140,.8)'; ctx.fillRect(1.4, -44.8, .3, 1.2); ctx.fillRect(1.9, -44.9, .3, .9); // a cord at her throat, cut
    F.under = (ctx, F) => { PR.soft(ctx, -7, F.cy + 5, 3, 3.6, '#1a0a06', .25); PR.dots(ctx, F, 30, 'rgba(90,50,30,.2)', .4, [2, 8]); };
    PR.face(ctx, F);
    // dark hair pulled back hard, a few strands loose; the tail over her shoulder
    ctx.beginPath(); ctx.moveTo(-13.4, F.cy + 1); ctx.bezierCurveTo(-15, F.cy - 14, -9, F.cy - 21.8, 0, F.cy - 21.6); ctx.bezierCurveTo(9, F.cy - 21.8, 15, F.cy - 14, 13.4, F.cy + 1); ctx.quadraticCurveTo(12.6, F.cy - 10, 5, F.cy - 13.6); ctx.quadraticCurveTo(0, F.cy - 14.8, -5, F.cy - 13.6); ctx.quadraticCurveTo(-12.6, F.cy - 10, -13.4, F.cy + 1); ctx.fillStyle = PR.lin(ctx, -14, 0, 14, 0, [[0,'#4a3626'], [.4,'#2a1c12'], [1,'#0a0604']]); ctx.fill();
    PR.strands(ctx, 40, ['#3a2a1c', '#1a120a', '#5a4430'], .5, 61, (i, r) => { const sd = r() < .5 ? -1 : 1, x0 = sd*r()*4, y0 = F.cy - 14, x1 = sd*(8 + r()*5), y1 = F.cy - 17 + r()*14; return [x0, y0, x0 + sd*5, F.cy - 21, x1, y1]; });
    ctx.fillStyle = '#2a1c12'; ctx.beginPath(); ctx.moveTo(12, F.cy - 6); ctx.bezierCurveTo(20, F.cy, 22, F.cy + 20, 18, F.cy + 34); ctx.lineTo(15, F.cy + 33); ctx.bezierCurveTo(17, F.cy + 20, 14, F.cy + 6, 10.6, F.cy - 2); ctx.fill(); ctx.fillStyle = '#6a5a3a'; ctx.fillRect(12.2, F.cy - 2.4, 3.4, 1.6); // the tail, tied
    PR.strands(ctx, 3, ['#3a2a1c'], .45, 62, (i, r) => { const x = -9.6 + i*1.2, y = F.cy - 12; return [x, y, x - 2, y + 6, x - 1 - r(), y + 12 + i*2]; });
    // the horn bow, held; and the glove
    ctx.lineCap = 'round'; ctx.strokeStyle = PR.lin(ctx, -40, 0, -26, 0, [[0,'#d8c8a0'], [1,'#6a5a3a']]); ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(-30, -98); ctx.bezierCurveTo(-44, -76, -36, -40, -34, -24); ctx.bezierCurveTo(-32, -8, -40, 4, -38, 12); ctx.stroke();
    PR.stroke(ctx, 'rgba(230,220,200,.55)', .4, () => { ctx.moveTo(-30, -98); ctx.lineTo(-38, 12); });
    ctx.fillStyle = PR.lin(ctx, -40, 0, -28, 0, [[0,'#3a2a1c'], [.5,'#1e1610'], [1,'#0a0806']]); ctx.beginPath(); ctx.moveTo(-40, -26); ctx.bezierCurveTo(-41, -30, -35, -32, -30, -30); ctx.bezierCurveTo(-27, -28, -27, -20, -30, -18); ctx.bezierCurveTo(-34, -16, -40, -18, -40, -22); ctx.closePath(); ctx.fill(); // the gloved fist on the grip
    PR.stroke(ctx, 'rgba(120,100,80,.5)', .4, () => { for (let i=0;i<3;i++){ ctx.moveTo(-31, -28 + i*3); ctx.quadraticCurveTo(-33, -27 + i*3, -36, -28 + i*3); } }); PR.soft(ctx, -36, -28, 3, 1.6, '#ffe0b0', .2);
    ctx.fillStyle = '#1a120c'; PR.path(ctx, [[-42, -20], [-30, -19], [-28, -10], [-40, -8]]); ctx.fill(); PR.stitch(ctx, 'rgba(160,130,90,.45)', .35, () => { ctx.moveTo(-41, -12); ctx.lineTo(-29.5, -13.5); });
    return F; },
  /* Vell: seventeen, Daru, Ocelot's rope boy. Soot, a stitched cut along the cheekbone, a mop of black curls, and the tarred line coiled over his shoulder with the hook on the end of it */
  vell(ctx){ const F = {cy:-73, w:12.2, h:18.6, jaw:.66, chin:4, skin:'#c9a48a', iris:'#5a4a3a', lip:'#a06a5a', browCol:'#1a120c', browW:1.25, arch:.9, browL:.1, rim:'#b0a0c8', rimA:.14, nose:.9, look:.55, smileL:.15, smileR:.35, mouthW:3.6};
    // the coil of tarred rope over his left shoulder, across the chest, and the hook hanging off it
    PR.neck(ctx, F, 8); const B = BP.body(ctx, F, {wide:32, drop:3, trap:2, ny:F.cy + 16, cb:F.cy + 20.6, c1:'#3e3a46', c2:'#121016'});
    ctx.save(); B.path(); ctx.clip();
    PR.stroke(ctx, 'rgba(0,0,0,.35)', .8, () => { ctx.moveTo(-6, -46); ctx.quadraticCurveTo(-4, -20, -8, 2); ctx.moveTo(16, -40); ctx.quadraticCurveTo(14, -20, 18, 2); }); // the coat's front edges
    PR.stitch(ctx, 'rgba(190,180,210,.22)', .45, () => { ctx.moveTo(-5, -44); ctx.lineTo(-7, 2); });
    for (let i=0;i<5;i++){ ctx.strokeStyle = PR.lin(ctx, -30, 0, 30, 0, [[0,'#6a5434'], [.5,'#3a2c18'], [1,'#120c06']]); ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(-30, -40 + i*1.6); ctx.bezierCurveTo(-10, -30 + i*2, 10, -12 + i*2, 30, -2 + i*1.4); ctx.stroke();
      PR.stroke(ctx, 'rgba(220,190,130,.18)', .5, () => { for (let k=0;k<9;k++){ const tt = k/9, x = -30 + 60*tt, y = -40 + i*1.6 + (38 + i*.2)*tt*tt*.9 + Math.sin(tt*3)*4; ctx.moveTo(x - 1, y - 1); ctx.lineTo(x + 1.2, y + 1.2); } }); } // the lay of the strands
    ctx.restore(); BP.light(ctx, F, B);
    // the hook: black iron, three tines, hanging by his hip on the right
    ctx.lineCap = 'round'; ctx.strokeStyle = '#2a2a30'; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(22, -26); ctx.lineTo(23, -12); ctx.stroke();
    ctx.lineWidth = 2; [-1, 0, 1].forEach(dx => { ctx.beginPath(); ctx.moveTo(23, -12); ctx.quadraticCurveTo(23 + dx*7, -10, 23 + dx*6, -18); ctx.stroke(); });
    PR.stroke(ctx, 'rgba(210,210,230,.45)', .5, () => { ctx.moveTo(22, -25); ctx.lineTo(23.2, -13); ctx.moveTo(16.4, -17); ctx.quadraticCurveTo(16.6, -11, 22, -11.6); });
    BP.band(ctx, B, -1, 6.4); ctx.fillStyle = PR.lit(ctx, '#4a4656', '#0e0c12', -B.nx - 3, B.nx + 3); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.55)', .6, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 6.4); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); // the collar, turned up
    PR.stroke(ctx, 'rgba(190,180,210,.25)', .5, () => { for (let i = 0; i <= 10; i++){ const [x, y] = B.pt(-1 + i/10, 5.6); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .5);
    F.under = (ctx, F) => { PR.soft(ctx, 6, F.cy + 4, 4, 3, '#1a1410', .3); PR.soft(ctx, -6, F.cy + 7, 3.4, 2.4, '#1a1410', .22); PR.dots(ctx, F, 24, 'rgba(40,30,30,.25)', .45, [1, 9]); }; // soot
    PR.face(ctx, F);
    // the cut along the left cheekbone, stitched (Ohl's)
    PR.stroke(ctx, 'rgba(120,40,30,.75)', .6, () => { ctx.moveTo(-9.6, F.cy + 1.4); ctx.quadraticCurveTo(-6.6, F.cy + 3.4, -3.8, F.cy + 3.2); });
    PR.stroke(ctx, 'rgba(30,20,20,.8)', .35, () => { for (let i=0;i<4;i++){ const x = -9 + i*1.6, y = F.cy + 1.9 + i*.42; ctx.moveTo(x - .2, y - 1); ctx.lineTo(x + .2, y + 1); } });
    // a mop of black curls
    ctx.beginPath(); ctx.moveTo(-13, F.cy + 1); ctx.bezierCurveTo(-15, F.cy - 15, -8, F.cy - 22.4, 0, F.cy - 22); ctx.bezierCurveTo(9, F.cy - 22.4, 15, F.cy - 15, 13, F.cy + 1); ctx.quadraticCurveTo(12, F.cy - 9, 4, F.cy - 12.6); ctx.quadraticCurveTo(0, F.cy - 13.6, -4, F.cy - 12.6); ctx.quadraticCurveTo(-12, F.cy - 9, -13, F.cy + 1);
    ctx.fillStyle = PR.lin(ctx, -14, 0, 14, 0, [[0,'#3a2c26'], [.45,'#1a1210'], [1,'#060404']]); ctx.fill();
    for (let i=0;i<26;i++){ const a = Math.PI*(.95 + i/25*1.1), r0 = 12.6 + (i%3)*.9, x = Math.cos(a)*r0*1.02, y = F.cy - 7 + Math.sin(a)*r0*1.12, rr = 2.2 + (i%4)*.5;
      ctx.fillStyle = ['#2a1e18','#140e0a','#3c2e26'][i%3]; ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill(); PR.stroke(ctx, 'rgba(120,100,90,.25)', .35, () => { ctx.arc(x - .4, y - .3, rr*.6, 3.6, 5.4); }); }
    for (let i=0;i<4;i++){ const x = -6 + i*3.6, y = F.cy - 15.4 + (i%2)*1.1; ctx.fillStyle = ['#2a1e18','#1a1210'][i%2]; ctx.beginPath(); ctx.arc(x, y, 2.1, 0, 7); ctx.fill(); } // a curl or two over the brow
    return F; },
};
function paintPortrait(ctx, id, W, H, st){
  const s = H/120; ctx.clearRect(0,0,W,H); ctx.save(); ctx.translate(W/2, H*.98); ctx.scale(s, s);
  (id === 'sgt' && BOOK === 'mt' && POR.sgt_mt ? POR.sgt_mt : id === 'sgt' && (BOOK === 'dg' || BOOK === 'hoc') && POR.sgt_dg ? POR.sgt_dg : POR[id] || POR.sgt)(ctx, st); // Book Two has its own sergeant (55b)
  ctx.restore();
}
