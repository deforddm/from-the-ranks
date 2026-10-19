/* ============ the reading's table, deck and spread (v6.11.0) ============
   READTABLE: one table for every place the squad reads at, keyed book:chapter ('gotm:0' is the prologue, 'gotm:6self' Tuft's own draw in
   the garden, 'moi:7' resolves by the road taken). Each is {surf, p, light, lp, lc, props, air, dark}: the surface and its tuning, the
   light's kind, place and colour, the props laid about, what moves in the air, and the dark the text panel fades into.
   drawReadingTable paints it: the surface and the props once (offscreen, made again on resize), the light and the air every frame, and
   after the turn the House's light on the table (tblHouseLight).
   DECKBACK: the back of each reader's deck; 20's drawCard asks for DECKBACK[DECKBACK_NOW] when a card lies face down. Tuft's is the wheel.
   SPREADS: how each reader lays the cards. Tuft a row; Marrow the temple cross; Yedda the rope; the old Kanese a fan; Benna askew with a
   copper on the table; Sohra throws the bones into the smoke and the card rises out of it (21).
   TBL_SIGIL: the House's mark, drawn faint behind the card's words. */

/* ---- helpers ---- */
const tblSpeck = (W, H, n, s, f) => { for (let i = 0; i < n; i++) f(hash(i, 3, s) * W, hash(i, 4, s) * H, i); };
const tblHex = (hex, amt) => { const n = parseInt(hex.slice(1), 16), f = v => clamp(Math.round(v + (amt < 0 ? v * amt : (255 - v) * amt)), 0, 255); return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(v => f(v).toString(16).padStart(2, '0')).join(''); }; // shade, but a hex back (rgba needs one)
const tblMul = (ctx, W, H, fill) => { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = fill; ctx.fillRect(0, 0, W, H); ctx.restore(); };
const tblScreen = (ctx, W, H, fill) => { ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = fill; ctx.fillRect(0, 0, W, H); ctx.restore(); };
/* the light falls off from (x, y): everything multiplies toward `dark` by radius r */
const tblVig = (ctx, W, H, x, y, r, dark) => { const g = ctx.createRadialGradient(x, y, r * .08, x, y, r); g.addColorStop(0, '#ffffff'); g.addColorStop(.55, '#b8b0a8'); g.addColorStop(1, dark); tblMul(ctx, W, H, g); };

/* ---- the surfaces: each paints the whole canvas once; p is the table's own tuning ---- */
const TBL_SURF = {};
TBL_SURF.ground = (ctx, W, H, p) => {
  ctx.fillStyle = p.base; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 40; i++) { const lo = hash(i, 4, 7) < .5; glow(ctx, hash(i, 1, 7) * W, hash(i, 2, 7) * H, 30 + hash(i, 3, 7) * 90, lo ? p.dark : (p.lite || '#ffffff'), lo ? .2 : .05); }
  tblSpeck(W, H, 900, 11, (x, y, i) => { ctx.fillStyle = i % 3 ? rgba(p.dark, .5) : 'rgba(255,255,255,.1)'; ctx.fillRect(x, y, 1 + hash(i, 5) * 1.5, 1 + hash(i, 6) * 1.5); });
  if (p.ruts) { ctx.strokeStyle = rgba(p.dark, .4); ctx.lineWidth = 14; for (let i = 0; i < p.ruts; i++) { const y0 = hash(i, 1, 19) * H; ctx.beginPath(); ctx.moveTo(0, y0); ctx.bezierCurveTo(W * .3, y0 + 20, W * .7, y0 - 20, W, y0 + 10); ctx.stroke(); } }
  if (p.cracks) for (let i = 0; i < p.cracks; i++) { ctx.strokeStyle = rgba(p.dark, .8); ctx.lineWidth = 1; let x = hash(i, 1, 16) * W, y = hash(i, 2, 16) * H; ctx.beginPath(); ctx.moveTo(x, y); for (let j = 0; j < 6; j++) { x += (hash(i, j, 17) - .5) * 70; y += (hash(i, j, 18) - .5) * 70; ctx.lineTo(x, y); } ctx.stroke(); }
  if (p.stones) tblSpeck(W, H, p.stones, 12, (x, y, i) => { const r = 3 + hash(i, 7) * 9, a = hash(i, 8) * 3; ell(ctx, x + 2, y + 2, r, r * .6, 'rgba(0,0,0,.35)', a); ell(ctx, x, y, r, r * .6, shade(p.stone || p.base, (hash(i, 9) - .5) * .3), a); ell(ctx, x - r * .3, y - r * .2, r * .4, r * .2, 'rgba(255,255,255,.08)', a); });
  if (p.grass) tblSpeck(W, H, p.grass, 13, (x, y, i) => { ctx.strokeStyle = rgba(p.grassCol || '#5a6a3a', .5 + hash(i, 1) * .4); ctx.lineWidth = 1.2; for (let j = 0; j < 4; j++) { const a = (hash(i, j, 2) - .5) * 1.2; ctx.beginPath(); ctx.moveTo(x + j * 2, y); ctx.quadraticCurveTo(x + j * 2 + a * 6, y - 8, x + j * 2 + a * 14, y - 14 - hash(i, j, 3) * 10); ctx.stroke(); } });
  if (p.leaves) tblSpeck(W, H, p.leaves, 14, (x, y, i) => { const c = ['#6b4a22', '#8a6a2a', '#a07a30', '#4f4a24', '#7d3f1e'][i % 5], a = hash(i, 4) * 3.2, l = 5 + hash(i, 1) * 7; ell(ctx, x, y, l, 2.5 + hash(i, 2) * 3, shade(c, (hash(i, 3) - .5) * .3), a); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(x - Math.cos(a) * l, y - Math.sin(a) * l); ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke(); });
  if (p.ash) tblSpeck(W, H, p.ash, 15, (x, y, i) => ell(ctx, x, y, 2 + hash(i, 1) * 5, 1 + hash(i, 2) * 2, `rgba(190,185,175,${.08 + hash(i, 3) * .18})`, hash(i, 4) * 3));
};
/* a cloth laid down (a rotated sheet with its corners pulled, over the ground), or the whole table (p.full) */
TBL_SURF.cloth = (ctx, W, H, p) => {
  if (!p.full) TBL_SURF.ground(ctx, W, H, Object.assign({base:tblHex(p.dark, -.2), dark:tblHex(p.dark, -.5)}, p.under || {}));
  ctx.save();
  if (!p.full) { const m = Math.min(W, H) * .06, pts = [[m, m * 1.6], [W - m * 1.3, m], [W - m, H - m * 1.5], [m * 1.4, H - m]];
    ctx.translate(W / 2, H / 2); ctx.rotate(p.rot || .04); ctx.translate(-W / 2, -H / 2);
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; poly(ctx, pts, p.base); ctx.shadowColor = 'transparent';
    ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.clip(); }
  else { ctx.fillStyle = p.base; ctx.fillRect(0, 0, W, H); }
  const L = Math.max(W, H) * 1.5, st = p.weave || 4;
  ctx.strokeStyle = rgba(p.dark, .22); ctx.lineWidth = 1; for (let y = -L; y < L; y += st) { ctx.beginPath(); ctx.moveTo(-L, y); ctx.lineTo(L, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(255,255,255,.05)'; for (let x = -L; x < L; x += st) { ctx.beginPath(); ctx.moveTo(x, -L); ctx.lineTo(x, L); ctx.stroke(); }
  if (p.pattern === 'stripe') { ctx.fillStyle = rgba(p.pat || p.dark, .4); for (let x = -L; x < L; x += 46) { ctx.beginPath(); ctx.moveTo(x, -L); ctx.lineTo(x + 14, -L); ctx.lineTo(x + 14 + L * .3, L); ctx.lineTo(x + L * .3, L); ctx.closePath(); ctx.fill(); } }
  if (p.pattern === 'diamond') { ctx.strokeStyle = rgba(p.pat || p.dark, .45); ctx.lineWidth = 2; for (let x = -L * 2; x < L; x += 54) { ctx.beginPath(); ctx.moveTo(x, -L); ctx.lineTo(x + L * 2, L); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + L * 2, -L); ctx.lineTo(x, L); ctx.stroke(); } }
  if (p.pattern === 'hex') { ctx.strokeStyle = rgba(p.pat || p.dark, .5); ctx.lineWidth = 2; const r = 30, h = r * .866; for (let row = -2; row < H / (h * 2) + 2; row++) for (let col = -2; col < W / (r * 3) + 2; col++) { const cx = col * r * 3 + (row % 2 ? r * 1.5 : 0), cy = row * h * 2; ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + Math.PI / 6; k ? ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } ctx.closePath(); ctx.stroke(); } }
  const nf = p.folds == null ? 4 : p.folds; for (let i = 0; i < nf; i++) { ctx.save(); ctx.translate(hash(i, 2, 21) * W, hash(i, 3, 21) * H); ctx.rotate(hash(i, 1, 21) * Math.PI); const g = ctx.createLinearGradient(0, -30, 0, 30); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.4, rgba(p.dark, .4)); g.addColorStop(.55, 'rgba(255,255,255,.08)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(-L, -30, L * 2, 60); ctx.restore(); }
  if (p.wear) tblSpeck(W, H, p.wear, 22, (x, y, i) => glow(ctx, x, y, 20 + hash(i, 1) * 40, '#ffffff', .06));
  if (p.stains) tblSpeck(W, H, p.stains, 23, (x, y, i) => glow(ctx, x, y, 14 + hash(i, 1) * 30, p.stain || p.dark, .3));
  ctx.restore();
};
/* planks: a board (p.inset, a fraction: a lid, a tailboard) or the whole table */
TBL_SURF.wood = (ctx, W, H, p) => {
  if (p.inset) TBL_SURF.ground(ctx, W, H, Object.assign({base:tblHex(p.dark, -.2), dark:tblHex(p.dark, -.5)}, p.under || {}));
  ctx.save();
  const vert = p.dir === 'v', n = p.planks || 4, L = vert ? W : H;
  if (p.inset) { const m = Math.min(W, H) * p.inset; ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 8; ctx.fillStyle = p.dark; ctx.fillRect(m, m * 1.4, W - m * 2, H - m * 2.4); ctx.shadowColor = 'transparent'; ctx.beginPath(); ctx.rect(m, m * 1.4, W - m * 2, H - m * 2.4); ctx.clip(); }
  for (let i = 0; i < n; i++) {
    const a = i * L / n, w = L / n;
    ctx.fillStyle = shade(p.base, (hash(i, 1, 31) - .5) * .25); if (vert) ctx.fillRect(a, 0, w, H); else ctx.fillRect(0, a, W, w);
    ctx.strokeStyle = rgba(p.dark, .5); ctx.lineWidth = 1;
    for (let j = 0; j < 9; j++) { const q = a + hash(i, j, 32) * w, wob = 6 + hash(i, j, 33) * 14; ctx.beginPath(); if (vert) { ctx.moveTo(q, 0); ctx.bezierCurveTo(q + wob, H * .3, q - wob, H * .7, q + wob * .5, H); } else { ctx.moveTo(0, q); ctx.bezierCurveTo(W * .3, q + wob, W * .7, q - wob, W, q + wob * .5); } ctx.stroke(); }
    if (hash(i, 2, 34) < .5) { const kx = vert ? a + w * .5 : hash(i, 3, 34) * W, ky = vert ? hash(i, 3, 34) * H : a + w * .5, rot = vert ? 1.57 : 0; ell(ctx, kx, ky, 7, 4, shade(p.dark, -.2), rot); ctx.strokeStyle = rgba(p.dark, .7); ctx.beginPath(); ctx.ellipse(kx, ky, 11, 6.5, rot, 0, 7); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = 2; ctx.beginPath(); if (vert) { ctx.moveTo(a, 0); ctx.lineTo(a, H); } else { ctx.moveTo(0, a); ctx.lineTo(W, a); } ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.07)'; ctx.lineWidth = 1; ctx.beginPath(); if (vert) { ctx.moveTo(a + 2, 0); ctx.lineTo(a + 2, H); } else { ctx.moveTo(0, a + 2); ctx.lineTo(W, a + 2); } ctx.stroke();
  }
  if (p.straps) for (let i = 0; i < p.straps; i++) { const q = (i + .5) / p.straps; ctx.fillStyle = '#2a2622'; if (vert) ctx.fillRect(0, q * H - 9, W, 18); else ctx.fillRect(q * W - 9, 0, 18, H); for (let j = 0; j < 6; j++) { const r = (j + .5) / 6; ell(ctx, vert ? r * W : q * W, vert ? q * H : r * H, 3, 3, '#6a645a'); } }
  if (p.rings) tblSpeck(W, H, p.rings, 35, (x, y, i) => { ctx.strokeStyle = 'rgba(60,15,15,.4)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 18 + hash(i, 1) * 10, 0, 7); ctx.stroke(); });
  if (p.scorch) tblSpeck(W, H, p.scorch, 36, (x, y, i) => glow(ctx, x, y, 25 + hash(i, 1) * 40, '#000000', .4));
  ctx.restore();
};
/* a cask lid: a round of boards with two battens, on the ground */
TBL_SURF.lid = (ctx, W, H, p) => {
  TBL_SURF.ground(ctx, W, H, Object.assign({base:tblHex(p.dark, -.2), dark:tblHex(p.dark, -.5)}, p.under || {}));
  const cx = W / 2, cy = H * .45, rx = W * .54, ry = H * .44; ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10; ell(ctx, cx, cy, rx, ry, p.dark); ctx.shadowColor = 'transparent';
  ctx.beginPath(); ctx.ellipse(cx, cy, rx * .97, ry * .97, 0, 0, 7); ctx.clip();
  TBL_SURF.wood(ctx, W, H, {base:p.base, dark:p.dark, planks:5, dir:'v'});
  ctx.fillStyle = shade(p.base, -.25); ctx.fillRect(0, cy - ry * .45, W, 20); ctx.fillRect(0, cy + ry * .35, W, 20); ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 2; ctx.strokeRect(0, cy - ry * .45, W, 20); ctx.strokeRect(0, cy + ry * .35, W, 20); // the battens
  for (let i = 0; i < 5; i++) { const x = (i + .5) / 5 * W; ell(ctx, x, cy - ry * .45 + 10, 3, 3, '#201c18'); ell(ctx, x, cy + ry * .35 + 10, 3, 3, '#201c18'); }
  ctx.restore();
  ctx.strokeStyle = '#3a342c'; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(cx, cy, rx * .97, ry * .97, 0, 0, 7); ctx.stroke(); // the hoop
};
/* a flat cart-wheel: the felloe, twelve spokes, the hub */
TBL_SURF.wheel = (ctx, W, H, p) => {
  TBL_SURF.ground(ctx, W, H, Object.assign({base:tblHex(p.dark, -.1), dark:tblHex(p.dark, -.5)}, p.under || {}));
  const cx = W / 2, cy = H * .42, Rr = Math.max(W, H) * .6, m = Math.min(W, H); ctx.save();
  ctx.strokeStyle = '#3a3632'; ctx.lineWidth = m * .04; ctx.beginPath(); ctx.arc(cx, cy, Rr + m * .09, 0, 7); ctx.stroke(); // the iron tyre
  ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 8; ctx.strokeStyle = p.base; ctx.lineWidth = m * .15; ctx.beginPath(); ctx.arc(cx, cy, Rr, 0, 7); ctx.stroke(); ctx.shadowColor = 'transparent'; // the felloe
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2, c = Math.cos(a), s = Math.sin(a); ctx.strokeStyle = shade(p.base, (hash(i, 1, 41) - .5) * .3); ctx.lineWidth = m * .06; ctx.beginPath(); ctx.moveTo(cx + c * Rr * .14, cy + s * Rr * .14); ctx.lineTo(cx + c * Rr, cy + s * Rr); ctx.stroke(); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + c * Rr * .14 + 3, cy + s * Rr * .14 + 2); ctx.lineTo(cx + c * Rr + 3, cy + s * Rr + 2); ctx.stroke(); }
  ell(ctx, cx, cy, Rr * .16, Rr * .16, shade(p.base, .1)); ctx.strokeStyle = '#2a2622'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, Rr * .16, 0, 7); ctx.stroke(); ell(ctx, cx, cy, Rr * .06, Rr * .06, '#141210');
  if (p.mud) tblSpeck(W, H, p.mud, 42, (x, y, i) => glow(ctx, x, y, 10 + hash(i, 1) * 30, '#8a8a80', .35));
  ctx.restore();
};
/* stone: a flat stone (cracks, lichen), flags (p.flags), a roof of slates (p.slate), a step (p.riser, the one above throwing its shadow) */
TBL_SURF.stone = (ctx, W, H, p) => {
  ctx.fillStyle = p.base; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 60; i++) { const lo = hash(i, 4, 51) < .5; glow(ctx, hash(i, 1, 51) * W, hash(i, 2, 51) * H, 20 + hash(i, 3, 51) * 80, lo ? p.dark : '#ffffff', lo ? .3 : .07); }
  tblSpeck(W, H, 700, 52, (x, y, i) => { ctx.fillStyle = i % 2 ? rgba(p.dark, .5) : 'rgba(255,255,255,.08)'; ctx.fillRect(x, y, 1.2, 1.2); });
  if (p.slate) { const rh = Math.min(W, H) * .17, sw = rh * 1.1;
    for (let r = -1; r < H / rh + 1; r++) for (let c = -1; c < W / sw + 1; c++) { const x = c * sw + (r % 2 ? sw / 2 : 0), y = r * rh; ctx.fillStyle = shade(p.base, (hash(r, c, 53) - .5) * .3); ctx.fillRect(x + 1, y, sw - 2, rh * 1.3); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(x, y + rh * 1.3 - 3, sw, 3); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; ctx.strokeRect(x + .5, y + .5, sw - 1, rh * 1.3); if (hash(r, c, 54) < .25) glow(ctx, x + sw * .5, y + rh * .6, rh * .4, '#5a6a3a', .35); } }
  else if (p.flags) { ctx.strokeStyle = rgba(p.dark, .9); ctx.lineWidth = 5; let y = 0, r = 0; while (y < H) { const h = Math.min(W, H) * (.22 + hash(r, 1, 55) * .14); let x = r % 2 ? -40 : 0; while (x < W) { const w = Math.min(W, H) * (.25 + hash(r, x | 0, 56) * .2); ctx.strokeRect(x, y, w, h); x += w; } y += h; r++; } }
  else { for (let i = 0; i < (p.cracks == null ? 3 : p.cracks); i++) { let x = hash(i, 1, 57) * W, y = hash(i, 2, 57) * H; ctx.beginPath(); ctx.moveTo(x, y); for (let j = 0; j < 7; j++) { x += (hash(i, j, 58) - .5) * 90; y += (hash(i, j, 59) - .5) * 90; ctx.lineTo(x, y); } ctx.strokeStyle = rgba(p.dark, .85); ctx.lineWidth = 1.6; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.1)'; ctx.lineWidth = .8; ctx.stroke(); }
    if (p.lichen) tblSpeck(W, H, p.lichen, 60, (x, y, i) => ell(ctx, x, y, 8 + hash(i, 1) * 16, 7 + hash(i, 2) * 12, rgba(['#7a8a4a', '#9a9a5a', '#c0b060'][i % 3], .35))); }
  if (p.edge) { const g = ctx.createLinearGradient(0, H * .86, 0, H); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.3, 'rgba(0,0,0,.7)'); g.addColorStop(1, 'rgba(0,0,0,.95)'); ctx.fillStyle = g; ctx.fillRect(0, H * .86, W, H * .14); }
  if (p.riser) { const g = ctx.createLinearGradient(0, 0, 0, H * .22); g.addColorStop(0, 'rgba(0,0,0,.9)'); g.addColorStop(.6, 'rgba(0,0,0,.5)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * .22); ctx.fillStyle = shade(p.base, -.15); ctx.fillRect(0, 0, W, H * .05); }
};
/* a hide pegged flat on the grass: an irregular edge with the hair, mottled, pegs at four points */
TBL_SURF.hide = (ctx, W, H, p) => {
  TBL_SURF.ground(ctx, W, H, Object.assign({base:'#4a5a34', dark:'#242e18', grass:200, grassCol:'#7a8a48'}, p.under || {}));
  const n = 24, pts = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, r = .46 + (hash(i, 1, 61) - .5) * .08 + (i % 6 === 0 ? .05 : 0); pts.push([W / 2 + Math.cos(a) * W * r, H / 2 + Math.sin(a) * H * r]); }
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 6; poly(ctx, pts, p.base); ctx.shadowColor = 'transparent';
  ctx.strokeStyle = rgba(p.dark, .9); ctx.lineWidth = 1.2; pts.forEach(([x, y], i) => { for (let j = 0; j < 7; j++) { const a = Math.atan2(y - H / 2, x - W / 2) + (hash(i, j, 62) - .5) * .8, l = 6 + hash(i, j, 63) * 12; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke(); } });
  ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.clip();
  for (let i = 0; i < 50; i++) { const lo = hash(i, 4, 64) < .6; glow(ctx, hash(i, 1, 64) * W, hash(i, 2, 64) * H, 30 + hash(i, 3, 64) * 90, lo ? p.dark : '#ffffff', lo ? .25 : .08); }
  tblSpeck(W, H, 1400, 65, (x, y, i) => { ctx.strokeStyle = rgba(i % 3 ? p.dark : '#ffffff', .25); ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 3, y + 5); ctx.stroke(); });
  ctx.restore();
  [[.08, .1], [.92, .08], [.1, .9], [.9, .92]].forEach(([fx, fy]) => { const x = fx * W, y = fy * H; ell(ctx, x + 3, y + 3, 6, 6, 'rgba(0,0,0,.5)'); ell(ctx, x, y, 5, 5, '#5a4a32'); ell(ctx, x, y, 2.5, 2.5, '#2a2218'); });
};
/* an upturned shield: the hollow side, the rim, the grip and strap across it */
TBL_SURF.shield = (ctx, W, H, p) => {
  TBL_SURF.ground(ctx, W, H, Object.assign({base:'#3a3a30', dark:'#1a1a14', stones:40}, p.under || {}));
  const cx = W / 2, cy = H * .46, rx = W * .56, ry = H * .46; ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,.8)'; ctx.shadowBlur = 26; ctx.shadowOffsetY = 10; ell(ctx, cx, cy, rx, ry, '#2a2622'); ctx.shadowColor = 'transparent';
  ell(ctx, cx, cy, rx * .94, ry * .94, p.base);
  ctx.beginPath(); ctx.ellipse(cx, cy, rx * .94, ry * .94, 0, 0, 7); ctx.clip();
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx); g.addColorStop(0, 'rgba(255,255,255,.08)'); g.addColorStop(.7, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  tblSpeck(W, H, 500, 71, (x, y, i) => { ctx.strokeStyle = i % 2 ? 'rgba(0,0,0,.35)' : 'rgba(255,255,255,.08)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (hash(i, 1) - .5) * 30, y + (hash(i, 2) - .5) * 30); ctx.stroke(); });
  const bR = Math.min(rx, ry) * .2; ell(ctx, cx, cy, bR, bR * .9, '#1a1612'); const bg = ctx.createRadialGradient(cx - bR * .3, cy - bR * .3, 0, cx, cy, bR); bg.addColorStop(0, 'rgba(90,84,74,.6)'); bg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = bg; ctx.beginPath(); ctx.ellipse(cx, cy, bR, bR * .9, 0, 0, 7); ctx.fill(); // the boss, hollow from this side
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; ell(ctx, cx + Math.cos(a) * bR * 1.25, cy + Math.sin(a) * bR * 1.15, 3.5, 3, '#5a544a'); }
  ctx.fillStyle = '#3a2e22'; ctx.fillRect(cx - rx * .62, cy + ry * .3, rx * 1.24, 14); ctx.fillRect(cx - rx * .3, cy - ry * .46, rx * .6, 11); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(cx - rx * .62, cy + ry * .3, rx * 1.24, 3); ctx.fillRect(cx - rx * .3, cy - ry * .46, rx * .6, 2); // the arm strap and the hand strap, riveted to the rim
  [[-.62, .3], [.62, .3], [-.3, -.46], [.3, -.46]].forEach(([fx, fy]) => { const x = cx + fx * rx, y = cy + fy * ry + 6; ell(ctx, x, y, 5, 4, '#5a544a'); ell(ctx, x - 1, y - 1, 2, 1.5, '#8a8478'); });
  if (p.dent) glow(ctx, cx + rx * .3, cy - ry * .3, rx * .25, '#000000', .4);
  ctx.restore();
  ctx.strokeStyle = '#4a443c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(cx, cy, rx * .95, ry * .95, 0, 0, 7); ctx.stroke();
};
/* a ration sack laid flat: the coarse weave, a seam, a faded stamp */
TBL_SURF.sack = (ctx, W, H, p) => {
  TBL_SURF.ground(ctx, W, H, Object.assign({base:'#3a3a2a', dark:'#1a1a12', grass:80, grassCol:'#5a5a38', stones:20}, p.under || {}));
  ctx.save(); const m = Math.min(W, H) * .05, pts = [[m, m * 2], [W - m, m * 1.4], [W - m * 1.2, H - m], [m * 1.5, H - m * 1.6]];
  ctx.translate(W / 2, H / 2); ctx.rotate(-.03); ctx.translate(-W / 2, -H / 2);
  ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6; poly(ctx, pts, p.base); ctx.shadowColor = 'transparent';
  ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.clip();
  ctx.strokeStyle = rgba(p.dark, .5); ctx.lineWidth = 1.5; for (let y = 0; y < H; y += 5) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } for (let x = 0; x < W; x += 5) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  ctx.strokeStyle = rgba(p.dark, .9); ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(W * .5, 0); ctx.lineTo(W * .52, H); ctx.stroke(); ctx.setLineDash([]);
  for (let i = 0; i < 30; i++) { const lo = hash(i, 4, 81) < .5; glow(ctx, hash(i, 1, 81) * W, hash(i, 2, 81) * H, 20 + hash(i, 3, 81) * 60, lo ? p.dark : '#ffffff', lo ? .3 : .06); }
  ctx.save(); ctx.translate(W * .22, H * .2); ctx.rotate(-.3); ctx.strokeStyle = 'rgba(50,30,30,.45)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 34, 0, 7); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-18, 10); ctx.lineTo(0, -16); ctx.lineTo(18, 10); ctx.moveTo(-10, 2); ctx.lineTo(10, 2); ctx.stroke(); ctx.restore();
  ctx.restore();
};

/* ---- the props: small things laid about the table, painted once; (x, y) in fractions, s the size in px ---- */
const TBL_PROP = {
  lantern(ctx, x, y, s){ ctx.strokeStyle = '#1a1816'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - s * 3); ctx.lineTo(x, y - s * .9); ctx.stroke(); ell(ctx, x + s * .1, y + s * .2, s * .95, s * .5, 'rgba(0,0,0,.45)'); ell(ctx, x, y, s * .6, s * .6, '#3a3630'); ell(ctx, x, y, s * .42, s * .42, '#ffd27a'); ell(ctx, x, y, s * .2, s * .2, '#fff3c0'); ctx.strokeStyle = '#2a2622'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - s * .6, y); ctx.lineTo(x + s * .6, y); ctx.moveTo(x, y - s * .6); ctx.lineTo(x, y + s * .6); ctx.stroke(); },
  cup(ctx, x, y, s){ ell(ctx, x + s * .15, y + s * .2, s * .8, s * .7, 'rgba(0,0,0,.45)'); ell(ctx, x, y, s * .7, s * .62, '#7a766a'); ell(ctx, x, y, s * .55, s * .48, '#2a2622'); ell(ctx, x - s * .1, y - s * .08, s * .4, s * .3, '#4a4036'); ctx.strokeStyle = '#7a766a'; ctx.lineWidth = s * .14; ctx.beginPath(); ctx.arc(x + s * .8, y, s * .3, -1.4, 1.4); ctx.stroke(); },
  winecup(ctx, x, y, s){ ell(ctx, x + s * .15, y + s * .2, s * .8, s * .7, 'rgba(0,0,0,.45)'); ell(ctx, x, y, s * .7, s * .62, '#5a3a2a'); ell(ctx, x, y, s * .55, s * .48, '#3a0a10'); ell(ctx, x - s * .15, y - s * .12, s * .2, s * .12, 'rgba(255,200,160,.25)'); },
  jug(ctx, x, y, s){ ell(ctx, x + s * .2, y + s * .25, s * 1.1, s, 'rgba(0,0,0,.5)'); ell(ctx, x, y, s, s * .9, '#6a4a34'); ell(ctx, x, y, s * .8, s * .7, '#8a6a4a'); ell(ctx, x, y, s * .35, s * .3, '#1a0e0a'); ctx.strokeStyle = '#6a4a34'; ctx.lineWidth = s * .2; ctx.beginPath(); ctx.arc(x + s * 1.05, y, s * .35, -1.5, 1.5); ctx.stroke(); },
  candle(ctx, x, y, s){ ell(ctx, x + s * .1, y + s * .15, s * .7, s * .5, 'rgba(0,0,0,.45)'); ell(ctx, x, y, s * .55, s * .4, '#5a5048'); ell(ctx, x, y - s * .1, s * .32, s * .32, '#e8dcc0'); ell(ctx, x, y - s * .1, s * .14, s * .14, '#c8b890'); for (let i = 0; i < 5; i++) ell(ctx, x + (hash(i, 1, 91) - .5) * s * .9, y + s * .1 + hash(i, 2, 91) * s * .2, s * .12, s * .06, '#e8dcc0'); },
  knife(ctx, x, y, s, rot = -.5){ ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 3; poly(ctx, [[-s * 1.6, -s * .12], [s * .2, -s * .18], [s * .9, 0], [s * .2, s * .14], [-s * 1.6, s * .1]], '#b8b8c0'); ctx.shadowColor = 'transparent'; ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-s * 1.6, -s * .16, s * .9, s * .32); ctx.fillStyle = '#2a2622'; ctx.fillRect(-s * .7, -s * .22, s * .1, s * .44); ctx.restore(); },
  coin(ctx, x, y, s){ ell(ctx, x + 2, y + 2, s, s, 'rgba(0,0,0,.5)'); ell(ctx, x, y, s, s, '#8a5a2a'); ell(ctx, x, y, s * .8, s * .8, '#a8703a'); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, s * .55, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - s * .3, y + s * .2); ctx.lineTo(x, y - s * .3); ctx.lineTo(x + s * .3, y + s * .2); ctx.stroke(); ell(ctx, x - s * .3, y - s * .35, s * .25, s * .15, 'rgba(255,220,160,.3)', -.6); },
  rope(ctx, x, y, s){ ctx.save(); ctx.translate(x, y); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4; for (let i = 0; i < 4; i++) { ctx.strokeStyle = ['#8a7a52', '#9a8a60', '#7a6a46', '#a09068'][i]; ctx.lineWidth = s * .22; ctx.beginPath(); ctx.ellipse(0, 0, s * (.5 + i * .22), s * (.4 + i * .18), .2 + i * .1, 0, 7); ctx.stroke(); } ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; for (let i = 0; i < 40; i++) { const a = i / 40 * Math.PI * 2, r = s * (.5 + (i % 4) * .22); ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * .9, Math.sin(a) * r * .75); ctx.lineTo(Math.cos(a + .15) * r * 1.1, Math.sin(a + .15) * r * .9); ctx.stroke(); } ctx.restore(); },
  spear(ctx, x, y, s, rot = .3){ ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4; ctx.fillStyle = '#4a3a28'; ctx.fillRect(-s * 6, -s * .14, s * 12, s * .28); ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-s * 6, 0); ctx.lineTo(s * 6, 0); ctx.stroke(); ctx.fillStyle = '#2a2622'; for (let i = 0; i < 3; i++) ctx.fillRect(s * 4.2 + i * s * .3, -s * .2, s * .12, s * .4); ctx.restore(); },
  stake(ctx, x, y, s, rot = 0){ ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4; poly(ctx, [[-s * 2.5, -s * .3], [s * 1.6, -s * .3], [s * 2.5, 0], [s * 1.6, s * .3], [-s * 2.5, s * .3]], '#6a5438'); ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-s * 2.5, -s * .15 + i * s * .15); ctx.lineTo(s * 1.4, -s * .15 + i * s * .15); ctx.stroke(); } ctx.fillStyle = '#a89070'; poly(ctx, [[s * 1.6, -s * .3], [s * 2.5, 0], [s * 1.6, s * .3]], '#b8a080'); ctx.restore(); },
  cedar(ctx, x, y, s, rot = 0){ ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 5; ctx.strokeStyle = '#4a3a22'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(s * 4, 0); ctx.stroke(); for (let i = 0; i < 14; i++) { const q = i / 14 * s * 3.6 + s * .3, l = s * (.9 - i / 28); for (let d = -1; d <= 1; d += 2) { poly(ctx, [[q, 0], [q + l * .55, d * l], [q + l * .8, d * l * .55], [q + l * .5, d * l * .1]], i % 2 ? '#2e4a28' : '#3a5a30'); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(q, 0); ctx.lineTo(q + l * .55, d * l); ctx.stroke(); } } ctx.restore(); },
  papermoon(ctx, x, y, s, col = '#e8a040'){ ell(ctx, x + 3, y + 4, s, s * .9, 'rgba(0,0,0,.4)'); ell(ctx, x, y, s, s * .9, col); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.ellipse(x, y, s * (1 - Math.abs(i) * .18), s * .9, 0, 0, 7); ctx.stroke(); } ctx.strokeStyle = 'rgba(40,20,10,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - s * .3, y - s * .5); ctx.lineTo(x + s * .4, y - s * .1); ctx.stroke(); ell(ctx, x - s * .2, y - s * .3, s * .3, s * .2, 'rgba(255,240,200,.35)'); },
  bonecup(ctx, x, y, s){ ell(ctx, x + s * .15, y + s * .2, s * .85, s * .7, 'rgba(0,0,0,.45)'); ell(ctx, x, y, s * .75, s * .65, '#d8ccb0'); ell(ctx, x, y, s * .55, s * .46, '#2a2420'); ell(ctx, x, y + s * .05, s * .3, s * .22, '#4a3a2a'); for (let i = 0; i < 6; i++) ell(ctx, x + Math.cos(i) * s * .18, y + Math.sin(i * 1.3) * s * .12, s * .06, s * .04, '#ff8a30'); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, y, s * .66, s * .56, 0, 0, 7); ctx.stroke(); },
  pouch(ctx, x, y, s){ ell(ctx, x + s * .1, y + s * .25, s * .9, s * .75, 'rgba(0,0,0,.45)'); ell(ctx, x, y, s * .8, s * .7, '#5a4634'); ell(ctx, x - s * .15, y - s * .1, s * .45, s * .3, 'rgba(255,255,255,.07)'); ctx.strokeStyle = '#2a1e14'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - s * .5, y - s * .5); ctx.quadraticCurveTo(x, y - s * .2, x + s * .55, y - s * .55); ctx.stroke(); ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + s * .5, y - s * .55); ctx.lineTo(x + s * 1.1, y - s * .2); ctx.stroke(); },
  sacking(ctx, x, y, s){ ctx.save(); ctx.translate(x, y); ctx.rotate(.12); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; ctx.fillStyle = '#9a8a62'; ctx.fillRect(-s, -s * .9, s * 2, s * 1.8); ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; for (let i = -s; i < s; i += 4) { ctx.beginPath(); ctx.moveTo(i, -s * .9); ctx.lineTo(i, s * .9); ctx.stroke(); } for (let i = -s * .9; i < s * .9; i += 4) { ctx.beginPath(); ctx.moveTo(-s, i); ctx.lineTo(s, i); ctx.stroke(); } ctx.restore(); },
  prayercloth(ctx, x, y, s){ ctx.save(); ctx.translate(x, y); ctx.rotate(-.08); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; ctx.fillStyle = '#7a3a30'; ctx.fillRect(-s, -s * .8, s * 2, s * 1.6); ctx.shadowColor = 'transparent'; ctx.strokeStyle = '#c8a060'; ctx.lineWidth = 1.5; ctx.strokeRect(-s * .85, -s * .65, s * 1.7, s * 1.3); for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-s * .7 + i * s * .35, -s * .3); ctx.lineTo(-s * .5 + i * s * .35, s * .3); ctx.stroke(); } ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-s, -s * .8, s * 2, s * .1); ctx.restore(); },
  tub(ctx, x, y, s){ ctx.save(); ctx.strokeStyle = '#4a3a28'; ctx.lineWidth = s * .22; ctx.beginPath(); ctx.arc(x, y, s, 0, 7); ctx.stroke(); ctx.strokeStyle = '#2a2622'; ctx.lineWidth = s * .05; ctx.beginPath(); ctx.arc(x, y, s * 1.08, 0, 7); ctx.stroke(); ell(ctx, x, y, s * .88, s * .88, '#1e2a30'); for (let i = 0; i < 3; i++) { ctx.strokeStyle = `rgba(200,220,230,${.12 + i * .04})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, s * (.3 + i * .2), 0, 7); ctx.stroke(); } ell(ctx, x - s * .3, y - s * .3, s * .2, s * .1, 'rgba(255,255,255,.2)'); ctx.restore(); },
  helm(ctx, x, y, s){ ell(ctx, x + s * .15, y + s * .2, s, s * .9, 'rgba(0,0,0,.5)'); ell(ctx, x, y, s * .9, s * .85, '#3a3632'); ell(ctx, x, y, s * .72, s * .66, '#4e4a44'); ell(ctx, x - s * .25, y - s * .25, s * .3, s * .18, 'rgba(255,255,255,.1)', -.6); ctx.strokeStyle = '#2a2622'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - s * .9, y); ctx.lineTo(x + s * .9, y); ctx.stroke(); ell(ctx, x, y, s * .35, s * .3, '#1a1816'); },
  beam(ctx, x, y, s, rot = .06){ ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 8; ctx.fillStyle = '#3e3226'; ctx.fillRect(-s * 8, -s * .8, s * 16, s * 1.6); ctx.shadowColor = 'transparent'; ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-s * 8, -s * .6 + i * s * .25); ctx.bezierCurveTo(-s * 3, -s * .6 + i * s * .25 + 3, s * 3, -s * .6 + i * s * .25 - 3, s * 8, -s * .6 + i * s * .25 + 2); ctx.stroke(); } for (let i = 0; i < 9; i++) glow(ctx, -s * 7 + i * s * 1.8, (hash(i, 1, 93) - .5) * s, s * .9, '#000000', .35); ctx.restore(); },
  stoneedge(ctx, x, y, s){ ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 10; const pts = []; for (let i = 0; i <= 12; i++) pts.push([x - s * 6 + i * s, y + (hash(i, 1, 94) - .5) * s * .8]); pts.push([x + s * 6.5, y - s * 6], [x - s * 6.5, y - s * 6]); poly(ctx, pts, '#4a4a40'); ctx.shadowColor = 'transparent'; ctx.fillStyle = 'rgba(0,0,0,.35)'; pts.slice(0, 13).forEach(([px, py], i) => { if (i < 12) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(pts[i + 1][0], pts[i + 1][1]); ctx.lineTo(pts[i + 1][0], py + s * .4); ctx.closePath(); ctx.fill(); } }); for (let i = 0; i < 8; i++) ell(ctx, x - s * 5 + i * s * 1.4, y - s * (1 + hash(i, 2, 94) * 4), s * .5, s * .35, 'rgba(120,130,90,.3)'); ctx.restore(); },
};

/* ---- the tables, one per place ---- */
const READTABLE = {
  /* Book One: Tuft, at Pale and in Darujhistan */
  'gotm:0':{surf:'ground', p:{base:'#2a2622', dark:'#121010', stones:150, ash:220}, light:'lantern', lp:[.14, .1], lc:'#ffb866', air:'ash', dark:'#0a0908', props:[['beam', .5, .05, 22, .03], ['lantern', .14, .1, 16]]},
  'gotm:1':{surf:'ground', p:{base:'#3a2e24', dark:'#1a1410', stones:60, ash:90, ruts:1}, light:'coals', lp:[.86, .9], lc:'#ff6a30', air:'sparks', dark:'#0e0a08', props:[['helm', .1, .9, 22], ['cup', .9, .12, 14]]},
  'gotm:2':{surf:'cloth', p:{base:'#3a3430', dark:'#1a1614', under:{stones:30, grass:90, grassCol:'#4a5030'}, rot:.05, folds:5}, light:'fire', lp:[.1, .92], lc:'#ff9a3a', air:'sparks', dark:'#0c0a0a', props:[['stake', .9, .08, 10, .9], ['stake', .08, .12, 10, -1.2]]},
  'gotm:3':{surf:'wood', p:{base:'#4a2e1c', dark:'#1e120a', planks:3, rings:5}, light:'lamp', lp:[.82, .12], lc:'#ffd080', air:'none', dark:'#0e0806', props:[['winecup', .9, .1, 18], ['jug', .1, .1, 22], ['candle', .84, .9, 12], ['knife', .12, .88, 14, .4]]},
  'gotm:4':{surf:'stone', p:{base:'#2e3238', dark:'#14161a', slate:1}, light:'spawn', lp:[.5, -.2], lc:'#6a6ab0', air:'dust', dark:'#08090c', props:[]},
  'gotm:5':{surf:'ground', p:{base:'#3e4030', dark:'#1c1e16', grass:220, grassCol:'#5a5e38', stones:24}, light:'dusk', lp:[0, .5], lc:'#8aa0c0', air:'none', dark:'#0a0c0a', props:[['stoneedge', .5, .1, 30]]},
  'gotm:6':{surf:'stone', p:{base:'#4a4640', dark:'#201e1a', flags:1}, light:'lanterns', lp:[.5, 0], lc:'#ffb060', air:'none', dark:'#0c0b0a', props:[['papermoon', .1, .9, 24, '#e86040']]},
  'gotm:6self':{surf:'ground', p:{base:'#2e3a28', dark:'#141a10', grass:260, grassCol:'#4a6a3a', leaves:30}, light:'lantern', lp:[.86, .1], lc:'#ffd090', air:'none', dark:'#080c08', props:[['lantern', .86, .1, 15]]},
  'gotm:7':{surf:'stone', p:{base:'#55504a', dark:'#262420', riser:1, edge:1, cracks:4}, light:'dawn', lp:[.95, .3], lc:'#c8b0a0', air:'none', dark:'#0c0b0a', props:[]},
  /* Book Two: Seven Cities, the Chain of Dogs */
  'dg:1':{surf:'wood', p:{base:'#6a5a44', dark:'#2e2618', planks:3, straps:2, inset:.06, under:{base:'#5a4e3c', dark:'#2a2418', stones:30}}, light:'dawn', lp:[.05, .2], lc:'#b0b4c0', air:'dust', dark:'#0e0c08', props:[['cup', .9, .1, 14]]},
  'dg:2':{surf:'cloth', p:{base:'#5a4a36', dark:'#2a2016', under:{base:'#9a8a60', dark:'#5a4a36', stones:40}, rot:-.06, wear:30, folds:4}, light:'noon', lp:[.9, .05], lc:'#fff2d0', air:'dust', dark:'#14100a', props:[]},
  'dg:3':{surf:'lid', p:{base:'#4a3a28', dark:'#1e160e', under:{base:'#3a3028', dark:'#1a1410', stones:30}}, light:'torch', lp:[.1, .08], lc:'#ff9440', air:'sparks', dark:'#0c0906', props:[]},
  'dg:4':{surf:'stone', p:{base:'#7a6a52', dark:'#3a3024', cracks:4}, light:'dusk', lp:[0, .4], lc:'#e0a070', air:'dust', dark:'#120e0a', props:[]},
  'dg:5':{surf:'ground', p:{base:'#3a3220', dark:'#1a160e', leaves:260, stones:10}, light:'green', lp:[.5, 0], lc:'#b8d070', air:'leaves', dark:'#0a0c06', props:[]},
  'dg:6':{surf:'stone', p:{base:'#5a5048', dark:'#28221e', cracks:5, lichen:12, edge:1}, light:'ridgefires', lp:[.1, .92], lc:'#ff9a40', air:'sparks', dark:'#0c0a08', props:[]},
  'dg:7':{surf:'cloth', p:{base:'#7a3a30', dark:'#3a1a16', full:1, pattern:'stripe', pat:'#5a2a24', folds:5, wear:20}, light:'dusk', lp:[.5, 0], lc:'#d08060', air:'dust', dark:'#140a08', props:[]},
  /* Book Three: the north, the march to Coral */
  'moi:1':{surf:'shield', p:{base:'#5a4a38', dark:'#2a2218', under:{base:'#3a3a30', dark:'#1a1a14', stones:50, grass:60, grassCol:'#5a5a3a'}}, light:'fire', lp:[.9, .9], lc:'#ffa050', air:'mist', dark:'#0c0a08', props:[]},
  'moi:2':{surf:'hide', p:{base:'#8a6a48', dark:'#4a3624', under:{base:'#5a6a38', dark:'#2e3a1e', grass:260, grassCol:'#7a8a48'}}, light:'noon', lp:[.5, 0], lc:'#fff0c8', noShade:1, air:'dust', dark:'#14100a', props:[]},
  'moi:3':{surf:'shield', p:{base:'#4a4038', dark:'#221e1a', dent:1, under:{base:'#2a2a26', dark:'#121210', stones:40, ruts:1}}, light:'forge', lp:[.5, -.1], lc:'#ff5a30', air:'ash', dark:'#0a0808', props:[]},
  'moi:4':{surf:'sack', p:{base:'#7a6a4a', dark:'#3a3222'}, light:'fire', lp:[.12, .1], lc:'#ff9a40', air:'sparks', dark:'#0c0a08', props:[]},
  'moi:5':{surf:'wheel', p:{base:'#5a4a38', dark:'#3a3a34', mud:40, under:{base:'#4a4a44', dark:'#2a2a26', cracks:8}}, light:'noon', lp:[.5, 0], lc:'#f0ecd8', noShade:1, air:'none', dark:'#100f0c', props:[]},
  'moi:6':{surf:'cloth', p:{base:'#1e2428', dark:'#0c0f12', under:{base:'#2a2622', dark:'#141210', ruts:2}, pattern:'hex', pat:'#3a5048', rot:.03, folds:3}, light:'lantern', lp:[.1, .08], lc:'#ffc070', air:'none', dark:'#06080a', props:[['lantern', .1, .08, 14]]},
  'moi:7a':{surf:'stone', p:{base:'#4a4a44', dark:'#1e1e1a', cracks:3, lichen:8}, light:'fire', lp:[.88, .92], lc:'#ff8a30', air:'sparks', dark:'#0a0a08', props:[['cedar', .0, .04, 26, .3], ['cedar', .5, -.02, 24, .7], ['cedar', 1, .45, 24, 2.7], ['cedar', .9, .98, 22, -2.2]]},
  'moi:7b':{surf:'shield', p:{base:'#5a4a38', dark:'#2a2218', under:{base:'#4a5a34', dark:'#242e18', grass:300, grassCol:'#6a7a40'}}, light:'dawn', lp:[.9, .1], lc:'#d0c8c0', air:'none', dark:'#0a0c08', props:[]},
};
const readingTableKey = (opt = {}) => { const bk = (S && S.book) || 'gotm', ch = (S && S.chapter) || 0;
  if (bk === 'gotm') return opt.self ? 'gotm:6self' : `gotm:${ch}`;
  if (bk === 'moi' && ch === 7) return typeof b3c7Flew === 'function' && b3c7Flew() ? 'moi:7a' : 'moi:7b';
  return `${bk}:${ch}`; };
const readingTable = (opt) => READTABLE[readingTableKey(opt)] || READTABLE['gotm:1'];
const readingReader = () => (typeof visReader === 'function' ? visReader() : {id:'tuft'}).id || 'tuft';

/* ---- the readers' kit, laid by the deck (x, y: the deck's left edge and its foot; CW the card's width) ---- */
const TBL_KIT = {
  tuft(){}, marrow(ctx, x, y, CW){ TBL_PROP.candle(ctx, x - CW * .7, y - CW * .2, CW * .18); },
  yedda(ctx, x, y, CW){ TBL_PROP.sacking(ctx, x + CW * .5, y - CW * .7, CW * .95); TBL_PROP.rope(ctx, x - CW * .8, y - CW * .3, CW * .22); },
  kanese(ctx, x, y, CW){ TBL_PROP.prayercloth(ctx, x + CW * .5, y - CW * .7, CW * .95); },
  benna(ctx, x, y, CW){ TBL_PROP.tub(ctx, x - CW * 1.9, y + CW * .4, CW * 1.1); },
  sohra(ctx, x, y, CW){ TBL_PROP.pouch(ctx, x + CW * 1.6, y - CW * .4, CW * .26); },
};

/* ---- the light, every frame: the kind decides the fall-off, the flicker and what else burns; hm is the House's mood after the turn ---- */
const tblFlick = (t, a, b) => Math.sin(t / 90) * a + Math.sin(t / 37) * b + Math.sin(t / 230) * a * .5;
const TBL_LIGHT = {
  lantern(ctx, W, H, t, L, hm){ const f = 1 + tblFlick(t, .03, .015) * hm.flick; tblVig(ctx, W, H, L.x, L.y, Math.max(W, H) * .95 * f * hm.reach, hm.dark); glow(ctx, L.x, L.y, Math.min(W, H) * .5 * f, L.col, .3 * hm.bright); },
  lamp(ctx, W, H, t, L, hm){ const f = 1 + tblFlick(t, .02, .01) * hm.flick; tblVig(ctx, W, H, L.x, L.y, Math.max(W, H) * 1.05 * f * hm.reach, hm.dark); glow(ctx, L.x, L.y, Math.min(W, H) * .6 * f, L.col, .28 * hm.bright); },
  fire(ctx, W, H, t, L, hm){ const f = 1 + tblFlick(t, .1, .07) * hm.flick; tblVig(ctx, W, H, L.x, L.y, Math.max(W, H) * .9 * f * hm.reach, hm.dark); glow(ctx, L.x, L.y, Math.min(W, H) * .7 * f, L.col, .42 * hm.bright); glow(ctx, L.x, L.y, Math.min(W, H) * .25, '#fff0c0', .25 * f * hm.bright); },
  torch(ctx, W, H, t, L, hm){ const f = 1 + tblFlick(t, .14, .1) * hm.flick; tblVig(ctx, W, H, L.x, L.y, Math.max(W, H) * .85 * f * hm.reach, hm.dark); glow(ctx, L.x, L.y, Math.min(W, H) * .6 * f, L.col, .5 * hm.bright); },
  coals(ctx, W, H, t, L, hm){ const f = 1 + (Math.sin(t / 700) * .12 + tblFlick(t, .03, .02)) * hm.flick; tblVig(ctx, W, H, L.x, L.y, Math.max(W, H) * .8 * f * hm.reach, hm.dark); glow(ctx, L.x, L.y, Math.min(W, H) * .45 * f, L.col, .4 * hm.bright); for (let i = 0; i < 7; i++) glow(ctx, L.x + (hash(i, 1, 95) - .5) * W * .25, L.y + (hash(i, 2, 95) - .5) * H * .08, 8 + hash(i, 3, 95) * 10, '#ff4a20', (.3 + Math.sin(t / 300 + i) * .2) * hm.bright); },
  spawn(ctx, W, H, t, L, hm){ const f = 1 + Math.sin(t / 1600) * .06 * hm.flick; tblVig(ctx, W, H, L.x, L.y, Math.max(W, H) * 1.3 * f * hm.reach, hm.dark); tblScreen(ctx, W, H, `rgba(70,60,120,${.1 * hm.bright})`); glow(ctx, L.x, L.y, W * .9, L.col, .18 * f * hm.bright); },
  dawn(ctx, W, H, t, L, hm){ tblVig(ctx, W, H, L.x, L.y, Math.max(W, H) * 1.5 * hm.reach, hm.dark); const g = ctx.createLinearGradient(L.x, 0, W - L.x, 0); g.addColorStop(0, rgba(L.col, .22 * hm.bright)); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); },
  dusk(ctx, W, H, t, L, hm){ tblVig(ctx, W, H, L.x, L.y, Math.max(W, H) * 1.3 * hm.reach, hm.dark); tblMul(ctx, W, H, 'rgb(190,185,210)'); const g = ctx.createLinearGradient(L.x, L.y, W - L.x, H - L.y); g.addColorStop(0, rgba(L.col, .26 * hm.bright)); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); },
  noon(ctx, W, H, t, L, hm){ tblScreen(ctx, W, H, rgba(L.col, .16 * hm.bright)); if (!L.spec.noShade) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgb(120,115,125)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W * .78 + Math.sin(t / 2200) * 6, 0); ctx.lineTo(W * .55 + Math.sin(t / 2200) * 6, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); ctx.restore(); } tblVig(ctx, W, H, W * .5, H * .4, Math.max(W, H) * 1.6 * hm.reach, shade(hm.dark, .4)); },
  green(ctx, W, H, t, L, hm){ tblVig(ctx, W, H, W * .5, H * .4, Math.max(W, H) * 1.2 * hm.reach, hm.dark); ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 9; i++) { const x = (hash(i, 1, 96) + Math.sin(t / 1900 + i) * .05) * W, y = (hash(i, 2, 96) + Math.cos(t / 2300 + i * 1.3) * .04) * H; glow(ctx, x, y, 40 + hash(i, 3, 96) * 70, L.col, (.12 + Math.sin(t / 1100 + i) * .04) * hm.bright); } ctx.restore(); },
  lanterns(ctx, W, H, t, L, hm){ tblVig(ctx, W, H, W * .5, 0, Math.max(W, H) * 1.3 * hm.reach, hm.dark); ctx.save(); ctx.globalCompositeOperation = 'screen'; ['#ff7a40', '#ffd060', '#60c080', '#ff6080', '#80a0ff', '#ffa040'].forEach((c, i) => { const x = (i + .5) / 6 * W + Math.sin(t / 900 + i) * 12, f = 1 + tblFlick(t + i * 300, .05, .03) * hm.flick; glow(ctx, x, H * .02, Math.min(W, H) * .4 * f, c, .3 * hm.bright); }); ctx.restore(); },
  ridgefires(ctx, W, H, t, L, hm){ TBL_LIGHT.fire(ctx, W, H, t, L, hm); ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 7; i++) { const f = 1 + tblFlick(t + i * 500, .1, .05); glow(ctx, hash(i, 1, 97) * W, H * .01, 20 + hash(i, 2, 97) * 30, '#ff8a30', .5 * f * hm.bright); } ctx.restore(); },
  forge(ctx, W, H, t, L, hm){ tblVig(ctx, W, H, W * .5, H * .5, Math.max(W, H) * 1.1 * hm.reach, hm.dark); const p = .5 + Math.sin(t / 700) * .15 + Math.sin(t / 190) * .05, g = ctx.createLinearGradient(0, 0, 0, H * .7); g.addColorStop(0, rgba(L.col, .55 * p * hm.bright)); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); },
};

/* ---- what moves in the air, every frame ---- */
const TBL_AIR = {
  none(){},
  dust(ctx, W, H, t){ ctx.fillStyle = 'rgba(200,190,175,.3)'; for (let i = 0; i < 30; i++) ctx.fillRect((hash(i, 5) * W + t * .02 * (1 + hash(i, 7)) + Math.sin(t / 1200 + i) * 8) % W, hash(i, 6) * H + Math.sin(t / 900 + i * 2) * 6, 1.5, 1.5); },
  ash(ctx, W, H, t){ for (let i = 0; i < 24; i++) { const y = (hash(i, 6) * H + t * .025 * (1 + hash(i, 7))) % (H + 20) - 10; ell(ctx, hash(i, 5) * W + Math.sin(t / 1000 + i) * 14, y, 2 + hash(i, 8) * 2, 1 + hash(i, 9), `rgba(200,195,185,${.2 + hash(i, 1) * .25})`, t / 700 + i); } },
  sparks(ctx, W, H, t, L){ for (let i = 0; i < 16; i++) { const k = ((t / 1800 + hash(i, 1)) % 1), x = L.x + Math.sin(t / 400 + i * 2) * 30 * k + (hash(i, 2) - .5) * 40, y = L.y - k * H * .35; ell(ctx, x, y, 1.6 + (1 - k) * 1.2, 1.6 + (1 - k) * 1.2, `rgba(255,${150 + k * 80 | 0},60,${(1 - k) * .8})`); } },
  mist(ctx, W, H, t){ ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 6; i++) { const x = ((hash(i, 1, 98) + t / 30000 * (1 + hash(i, 2, 98))) % 1.4 - .2) * W, y = hash(i, 3, 98) * H; ctx.save(); ctx.translate(x, y); ctx.scale(1, .22 + Math.sin(t / 1300 + i) * .04); glow(ctx, 0, 0, W * .4, '#c8ccd0', .1); ctx.restore(); } ctx.restore(); },
  leaves(ctx, W, H, t){ for (let i = 0; i < 8; i++) { const k = ((t / 9000 + hash(i, 1)) % 1), x = hash(i, 2) * W + Math.sin(t / 700 + i) * 30, y = k * (H + 40) - 20; ell(ctx, x, y, 6, 3, ['#8a6a2a', '#a07a30', '#6b4a22'][i % 3], t / 500 + i); } },
};

/* ---- the House's light on the table after the turn: the mood for the light pass, then an overlay ---- */
const TBL_HOUSE = {
  'High House Death':{mood:k => ({flick:1 - k * .6, reach:1 - k * .1, bright:1 - k * .35, cold:k}), over(ctx, W, H, t, k){ tblMul(ctx, W, H, `rgb(${255 - k * 60 | 0},${255 - k * 35 | 0},${255 - k * 15 | 0})`); tblScreen(ctx, W, H, `rgba(150,180,220,${.07 * k})`); ctx.save(); ctx.strokeStyle = `rgba(210,230,250,${.5 * k})`; ctx.lineWidth = 1;
      for (let c = 0; c < 4; c++) { const ox = c % 2 ? W : 0, oy = c < 2 ? 0 : H; for (let i = 0; i < 7; i++) { const a = Math.atan2(H / 2 - oy, W / 2 - ox) + (hash(c, i, 99) - .5) * 1.2, len = Math.min(W, H) * (.12 + hash(c, i, 100) * .22) * k; ctx.beginPath(); ctx.moveTo(ox, oy); let x = ox, y = oy; for (let j = 1; j <= 5; j++) { x = ox + Math.cos(a) * len * j / 5 + (hash(i, j, c) - .5) * 8; y = oy + Math.sin(a) * len * j / 5 + (hash(j, i, c) - .5) * 8; ctx.lineTo(x, y); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a + 1) * 7 * k, y + Math.sin(a + 1) * 7 * k); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a - 1) * 7 * k, y + Math.sin(a - 1) * 7 * k); ctx.moveTo(x, y); } ctx.stroke(); } } ctx.restore(); }},
  'High House Dark':{mood:k => ({flick:1 - k * .7, reach:1 - k * .25, bright:1 - k * .5}), over(ctx, W, H, t, k){ tblMul(ctx, W, H, `rgb(${255 - k * 110 | 0},${255 - k * 120 | 0},${255 - k * 70 | 0})`); }},
  'High House Shadow':{mood:k => ({flick:1 + k * 2.5, reach:1 - k * .05, bright:1 - k * .15}), over(ctx, W, H, t, k){ const g = .6 + Math.sin(t / 110) * .25 + Math.sin(t / 43) * .15; tblMul(ctx, W, H, `rgb(${255 - k * 50 * g | 0},${255 - k * 70 * g | 0},${255 - k * 20 | 0})`); tblScreen(ctx, W, H, `rgba(110,80,200,${.07 * k})`); }},
  'High House Life':{mood:k => ({flick:1, reach:1 + k * .15, bright:1 + k * .25}), over(ctx, W, H, t, k){ tblScreen(ctx, W, H, `rgba(140,200,80,${.09 * k})`); }},
  'High House Chains':{mood:k => ({flick:1, reach:1 - k * .1, bright:1 - k * .1}), over(ctx, W, H, t, k){ const b = .5 + Math.max(0, Math.sin(t / 650)) * .5; tblMul(ctx, W, H, `rgb(${255 - k * 40 * b | 0},${255 - k * 110 * b | 0},${255 - k * 120 * b | 0})`); }},
  'High House Light':{mood:k => ({flick:1 - k * .5, reach:1 + k * .3, bright:1 + k * .4}), over(ctx, W, H, t, k){ tblScreen(ctx, W, H, `rgba(255,240,200,${.16 * k})`); }},
  'Unaligned':{mood:k => ({flick:1 + (1 - k) * 1.5, reach:1 + (1 - k) * .3, bright:1 + (1 - k) * 1.4}), over(ctx, W, H, t, k){ if (k < 1) tblScreen(ctx, W, H, `rgba(255,220,160,${.2 * (1 - k)})`); }},
};
const tblMood = (house, k) => { const hd = TBL_HOUSE[house], m = Object.assign({flick:1, reach:1, bright:1}, hd && k > 0 ? hd.mood(Math.min(1, k)) : {}); return m; };

/* ---- the House's mark, faint behind the words ---- */
const TBL_SIGIL = {
  'High House Dark'(ctx, r){ ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r * .72, 0, 7); ctx.arc(r * .3, -r * .15, r * .62, 0, 7, true); ctx.fill(); },
  'High House Death'(ctx, r){ ctx.lineWidth *= 1.6; ctx.beginPath(); ctx.moveTo(-r * .7, r); ctx.lineTo(-r * .7, -r * .5); ctx.arc(0, -r * .5, r * .7, Math.PI, 0); ctx.lineTo(r * .7, r); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-r * .45, r); ctx.lineTo(-r * .45, -r * .4); ctx.arc(0, -r * .4, r * .45, Math.PI, 0); ctx.lineTo(r * .45, r); ctx.stroke(); },
  'High House Shadow'(ctx, r){ ctx.beginPath(); ctx.arc(0, -r * .2, r * .55, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(r * .35, r * .55, r * .9, r * .28, .25, 0, 7); ctx.fill(); },
  'High House Life'(ctx, r){ ctx.lineWidth *= 1.4; ctx.beginPath(); ctx.moveTo(-r * .6, -r * .5); ctx.quadraticCurveTo(-r * .5, r * .3, 0, r * .35); ctx.quadraticCurveTo(r * .5, r * .3, r * .6, -r * .5); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, r * .35); ctx.lineTo(0, r * .8); ctx.moveTo(-r * .4, r * .9); ctx.lineTo(r * .4, r * .9); ctx.stroke(); for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * r * .3, -r * .5); ctx.quadraticCurveTo(i * r * .5, -r * .9, i * r * .25, -r * 1.1); ctx.stroke(); } },
  'High House Chains'(ctx, r){ ctx.lineWidth *= 1.6; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.ellipse(i * r * .62, 0, r * .4, r * .24, i ? 0 : 1.57, 0, 7); ctx.stroke(); } },
  'High House Light'(ctx, r){ ctx.beginPath(); ctx.arc(0, 0, r * .4, 0, 7); ctx.stroke(); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * .55, Math.sin(a) * r * .55); ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); ctx.stroke(); } },
  'Unaligned'(ctx, r){ ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); const pts = []; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, rr = i % 2 ? r * .25 : r * .7; pts.push([Math.cos(a) * rr, Math.sin(a) * rr]); } ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.stroke(); },
};
function drawHouseSigil(ctx, house, x, y, r, col, a){ const f = TBL_SIGIL[house]; if (!f || a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = Math.max(1.5, r * .06); f(ctx, r); ctx.restore(); }

/* ---- the decks' backs: 20's drawCard calls DECKBACK[DECKBACK_NOW] for a face-down card (Tuft's wheel stays as 20 draws it) ---- */
const DECKBACK = {
  marrow(ctx, W, H){ // a temple deck from Nap: ivory, the paint gone soft at the corners, Soliel's lamp
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#e2d6bc'); g.addColorStop(1, '#c8b896'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    [[0, 0], [W, 0], [0, H], [W, H]].forEach(([x, y], i) => glow(ctx, x, y, W * (.3 + hash(i, 1, 101) * .15), '#8a7a5a', .45));
    ctx.strokeStyle = '#5a6a8a'; ctx.lineWidth = W * .012; ctx.strokeRect(W * .07, H * .05, W * .86, H * .9); ctx.strokeStyle = 'rgba(90,106,138,.5)'; ctx.lineWidth = 1; ctx.strokeRect(W * .1, H * .07, W * .8, H * .86);
    const cx = W / 2, cy = H * .52, s = W * .3; ctx.strokeStyle = '#8a6a30'; ctx.lineWidth = W * .014; ctx.beginPath(); ctx.ellipse(cx, cy, s, s * .45, 0, 0, Math.PI); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - s, cy); ctx.lineTo(cx + s, cy); ctx.stroke(); // the lamp's bowl
    ctx.beginPath(); ctx.moveTo(cx + s, cy); ctx.lineTo(cx + s * 1.25, cy - s * .2); ctx.stroke(); // the spout
    poly(ctx, [[cx + s * 1.25, cy - s * .2], [cx + s * 1.1, cy - s * .55], [cx + s * 1.4, cy - s * .5]], '#c8963a'); // the flame
    ctx.fillStyle = 'rgba(138,106,48,.25)'; ctx.beginPath(); ctx.arc(cx, cy - s * .9, s * .5, 0, 7); ctx.fill(); // the light over it
    ctx.font = `${Math.round(W * .07)}px 'IM Fell English SC', serif`; ctx.fillStyle = 'rgba(90,106,138,.6)'; ctx.textAlign = 'center'; ctx.fillText('Soliel', cx, H * .82); },
  yedda(ctx, W, H){ // the cheap gate deck from Hissar: thin wood, the paint bright, a rope knot
    ctx.fillStyle = '#d8b060'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(120,80,30,.35)'; ctx.lineWidth = 1; for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.moveTo(i * W / 10 + 3, 0); ctx.bezierCurveTo(i * W / 10 + 8, H * .4, i * W / 10 - 4, H * .7, i * W / 10 + 5, H); ctx.stroke(); }
    ctx.strokeStyle = '#b8382a'; ctx.lineWidth = W * .05; ctx.strokeRect(W * .08, H * .055, W * .84, H * .89); ctx.strokeStyle = '#3a8a4a'; ctx.lineWidth = W * .018; ctx.strokeRect(W * .16, H * .11, W * .68, H * .78);
    const cx = W / 2, cy = H / 2, r = W * .22; ctx.strokeStyle = '#8a6a30'; ctx.lineWidth = W * .055; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.strokeStyle = '#5a4020'; ctx.lineWidth = 1.5; for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r * .8, cy + Math.sin(a) * r * .8); ctx.lineTo(cx + Math.cos(a + .25) * r * 1.2, cy + Math.sin(a + .25) * r * 1.2); ctx.stroke(); }
    ctx.strokeStyle = '#8a6a30'; ctx.lineWidth = W * .05; ctx.beginPath(); ctx.moveTo(cx - r * .9, cy + r * .5); ctx.quadraticCurveTo(cx, cy + r * 1.6, cx + r * .9, cy + r * .5); ctx.stroke(); // the tail of the knot
    [[.2, .14], [.8, .14], [.2, .86], [.8, .86]].forEach(([x, y]) => ell(ctx, W * x, H * y, W * .035, W * .035, '#b8382a')); },
  kanese(ctx, W, H){ // old cards wrapped in a prayer-cloth: a faded red, the lattice, a sign in the middle
    ctx.fillStyle = '#6e3a30'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 12; i++) glow(ctx, hash(i, 1, 102) * W, hash(i, 2, 102) * H, W * .25, hash(i, 3, 102) < .5 ? '#3a1a14' : '#a06a50', .3);
    ctx.strokeStyle = 'rgba(200,160,100,.35)'; ctx.lineWidth = 1.2; const d = W * .16; for (let x = -H; x < W + H; x += d) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + H, H); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + H, 0); ctx.lineTo(x, H); ctx.stroke(); }
    ctx.strokeStyle = '#c8a060'; ctx.lineWidth = W * .012; ctx.strokeRect(W * .09, H * .06, W * .82, H * .88);
    const cx = W / 2, cy = H / 2, r = W * .2; ell(ctx, cx, cy, r * 1.15, r * 1.15, '#6e3a30'); ctx.strokeStyle = '#c8a060'; ctx.lineWidth = W * .014; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
    ctx.lineWidth = W * .02; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(cx - r * .5, cy + i * r * .4); ctx.lineTo(cx + r * .5, cy + i * r * .4); ctx.stroke(); } ell(ctx, cx, cy - r * .75, r * .1, r * .1, '#c8a060');
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { const x = hash(i, 1, 103) * W, y = hash(i, 2, 103) < .5 ? 0 : H; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (hash(i, 3, 103) - .5) * 10, y + (y ? -1 : 1) * (4 + hash(i, 4, 103) * 10)); ctx.stroke(); } }, // frayed edges
  benna(ctx, W, H){ // a soldier's deck, greasy, thirty years in a wash-house: dark, scuffed, a stamp
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#34302a'); g.addColorStop(.5, '#4a443a'); g.addColorStop(1, '#2a2622'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 6; i++) glow(ctx, hash(i, 1, 104) * W, hash(i, 2, 104) * H, W * .3, '#8a8070', .14); // the grease shine
    for (let i = 0; i < 4; i++) { ctx.strokeStyle = 'rgba(120,110,90,.25)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(hash(i, 1, 105) * W, hash(i, 2, 105) * H, W * .18, 0, 7); ctx.stroke(); } // water rings
    ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = W * .02; ctx.strokeRect(W * .08, H * .05, W * .84, H * .9); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let i = 0; i < 20; i++) { const x = hash(i, 1, 106) * W, y = hash(i, 2, 106) * H; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (hash(i, 3, 106) - .5) * 30, y + (hash(i, 4, 106) - .5) * 30); ctx.stroke(); }
    const cx = W / 2, cy = H / 2, r = W * .2; ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = W * .03; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - r * .6, cy - r * .6); ctx.lineTo(cx + r * .6, cy + r * .6); ctx.moveTo(cx + r * .6, cy - r * .6); ctx.lineTo(cx - r * .6, cy + r * .6); ctx.stroke(); },
  sohra(ctx, W, H){ // the card the bones make: bone-white, the marks of the throw on it
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#d8d0bc'); g.addColorStop(1, '#b8ac94'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 9; i++) glow(ctx, hash(i, 1, 107) * W, hash(i, 2, 107) * H, W * .2, '#6a5a44', .25);
    ctx.strokeStyle = '#6a5a44'; ctx.lineWidth = W * .012; ctx.strokeRect(W * .07, H * .05, W * .86, H * .9);
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2 + .6, x = W / 2 + Math.cos(a) * W * .22, y = H / 2 + Math.sin(a) * W * .22; ell(ctx, x, y, W * .06, W * .045, '#8a7a62', a); ell(ctx, x, y, W * .035, W * .025, '#c8bca4', a); }
    ctx.strokeStyle = 'rgba(106,90,68,.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(W / 2, H / 2, W * .3, 0, 7); ctx.stroke(); },
};

/* ---- the spreads: where each reader lays the cards (dx in card widths from the middle, yy a fraction of the height, dy in card heights) ---- */
const SPREADS = {
  row3:{slots:[{dx:-1.05, yy:.5, rot:-.08, flip:2900}, {dx:1.05, yy:.5, rot:.08, flip:3900}, {dx:0, yy:.35, rot:0, ans:1}]},
  cross5:{slots:[{dx:0, yy:.36, dy:-.95, rot:0, sc:.78, flip:2600}, {dx:-1, yy:.36, rot:-.03, sc:.78, flip:3150}, {dx:1, yy:.36, rot:.03, sc:.78, flip:3700}, {dx:0, yy:.36, dy:.95, rot:0, sc:.78, flip:4250}, {dx:0, yy:.36, rot:0, ans:1}]},
  rope3:{slots:[{dx:-1.05, yy:.53, rot:-.2, flip:2900}, {dx:1.05, yy:.46, rot:.14, flip:3900}, {dx:0, yy:.35, rot:.03, ans:1}]},
  fan3:{slots:[{dx:-.72, yy:.46, rot:-.3, flip:2900}, {dx:.72, yy:.46, rot:.3, flip:3900}, {dx:0, yy:.36, rot:0, ans:1}]},
  askew3:{slots:[{dx:-1.08, yy:.5, rot:-.15, flip:2900}, {dx:1.02, yy:.53, rot:.1, flip:3900}, {dx:.02, yy:.36, rot:.05, ans:1}], coin:1},
  ring:{bones:1, slots:[0, 1, 2, 3, 4].map(i => { const a = i / 5 * Math.PI * 2 - Math.PI / 2 + .3; return {ring:a, dx:Math.cos(a) * 1.3, yy:.38, dy:Math.sin(a) * .85, rot:hash(i, 1, 108) * 6}; }).concat([{dx:0, yy:.38, rot:0, ans:1}])},
};
const READER_SPREAD = {tuft:'row3', marrow:'cross5', yedda:'rope3', kanese:'fan3', benna:'askew3', sohra:'ring'};
const readingSpread = reader => SPREADS[READER_SPREAD[reader]] || SPREADS.row3;
/* a knucklebone: ivory, waisted, lying as it fell */
function drawKnuckle(ctx, x, y, s, rot, t){ ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4;
  ell(ctx, -s * .62, 0, s * .5, s * .46, '#dcd0b4'); ell(ctx, s * .62, 0, s * .5, s * .46, '#dcd0b4'); ctx.fillStyle = '#d4c8ac'; ctx.fillRect(-s * .62, -s * .22, s * 1.24, s * .44); ctx.shadowColor = 'transparent';
  ell(ctx, -s * .62, -s * .34, s * .18, s * .09, '#ece4cc'); ell(ctx, s * .62, -s * .34, s * .18, s * .09, '#ece4cc'); ell(ctx, -s * .7, s * .16, s * .2, s * .13, 'rgba(90,70,50,.3)'); ell(ctx, s * .66, s * .14, s * .22, s * .14, 'rgba(90,70,50,.3)'); ctx.fillStyle = 'rgba(90,70,50,.22)'; ctx.fillRect(-s * .3, -s * .06, s * .6, s * .12); ctx.restore(); }

/* ---- the table, painted: the surface once into an offscreen canvas, then per frame the light, the air and the House ---- */
function makeReadingTable(spec, W, H, dpr, reader, lay){
  const cv = document.createElement('canvas'); cv.width = Math.max(1, W * dpr | 0); cv.height = Math.max(1, H * dpr | 0); const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  (TBL_SURF[spec.surf] || TBL_SURF.ground)(ctx, W, H, spec.p);
  (spec.props || []).forEach(([k, fx, fy, s, ...rest]) => { const f = TBL_PROP[k]; if (f) f(ctx, fx * W, fy * H, s * Math.min(W, H) / 390, ...rest); });
  const kit = TBL_KIT[reader]; if (kit && lay) kit(ctx, lay.deckX, lay.deckY + lay.CH, lay.CW);
  return cv;
}
function drawReadingTable(ctx, W, H, t, spec, img, st){
  if (img) ctx.drawImage(img, 0, 0, W, H); else { ctx.fillStyle = spec.dark; ctx.fillRect(0, 0, W, H); }
  const hm = tblMood(st.house, st.turned); hm.dark = spec.dark;
  const L = {x:(spec.lp ? spec.lp[0] : .2) * W, y:(spec.lp ? spec.lp[1] : .1) * H, col:spec.lc || '#ffb866', spec};
  (TBL_LIGHT[spec.light] || TBL_LIGHT.lantern)(ctx, W, H, t, L, hm);
  (TBL_AIR[spec.air] || TBL_AIR.none)(ctx, W, H, t, L);
  const hd = TBL_HOUSE[st.house]; if (hd && st.turned > 0) hd.over(ctx, W, H, t, Math.min(1, st.turned));
}
