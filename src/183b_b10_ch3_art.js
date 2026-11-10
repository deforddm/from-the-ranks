/* ============ Book Ten, Chapter 3 art: Night Marches — the glass by day and by night, the column under its cloaks, the traces ============ */
/* Book Ten's ground: the Glass Desert. By day a pale, heat-bleached sky and a floor of glass to the horizon, white with glare, cracked in
   long seams, glints everywhere, the air wobbling over it; the column lying up as a long low village of cloaks thrown over spear-shafts,
   wagons between, thin oxen with their heads down. By night Book Ten's own sky, blue-black, starlight from the upper left, and the same
   stars thrown back by the glass, flattened, so the column walks between two skies; no lamps anywhere. Nothing living in the glass.
   Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b10_glass        lying up by day (180's caption): glare to the horizon, cloaks on spear-shafts in rows going away, wagons, oxen,
                      the heat shimmer
     b10_glass_night  the night march (180's caption): stars above and below, the column a thin dark line walking east without a light
     b10_traces       the wagons in the traces (180's caption): a water wagon side on, its yokes empty on the tongue, the squad leaning
                      into the straps two by two, starlight on the barrels
     b10_c3_city      the night glass with, very far off on the northern horizon, a long broken wall with towers: never closer
   Ground (TILEX): b10_c3_ground: the glass (pale by day, starry-dark by night) or on 'south' Book Nine's road ground (163b), with 'c' a
   cloak on a spear-shaft, 'W' the water wagon (on the second lie-up only if it came through; else a row of skins on shafts), 'w' another
   wagon, 'x' an ox at its picket, 'F' the squad's circle (packs in a ring, no fire), 'v' a low rise of glass, '#' a ridge of shards.
   Battle 't' is a shard of glass standing up (a stone on 'south').
   The chapter's gear in the series' 200×150 item style on Book Ten's ground: night glass, blue-black (#2a3a52 → #070a10), a cold
   starlight rim from the upper left. */

/* ---------------- shared pieces ---------------- */
const b103aSouth = () => !!(S && S.f && S.f.b10_tRoad === 'south');
/* the glass by day: a pale burnt sky, the floor of glass white with glare, long seams, glints; returns the horizon */
function b103aDay(x, W, H){ const hz = H*.4;
  x.fillStyle = vgrad(x, 0, hz, [[0,'#8e9cae'],[.55,'#c8cfd6'],[1,'#ece9e0']]); x.fillRect(0, 0, W, hz + 2);
  glow(x, W*.12, H*.04, W*.5, '#ffffff', .35); // the sun, high and left, too bright to look at
  x.fillStyle = vgrad(x, hz, H, [[0,'#f2f2ee'],[.18,'#d8dee4'],[.6,'#aeb8c4'],[1,'#7e8a98']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 46; i++) { const d = Math.pow(hash(i, 10301), 1.4), yy = hz + d*(H - hz), x0 = hash(i, 10302)*W, len = W*(.04 + d*.22); // long seams in the glass, in perspective
    x.strokeStyle = hash(i, 10303) > .5 ? 'rgba(90,104,124,.28)' : 'rgba(255,255,255,.5)'; x.lineWidth = Math.max(.6, d*1.6); x.beginPath(); x.moveTo(x0, yy); x.lineTo(x0 + len, yy + (hash(i, 10304) - .5)*H*.02*d); x.stroke(); }
  for (let i = 0; i < 70; i++) { const d = Math.pow(hash(i, 10305), 1.2); x.fillStyle = 'rgba(255,255,255,.85)'; const r = .6 + d*1.8; x.fillRect(hash(i, 10306)*W, hz + d*(H - hz), r*1.6, r*.6); } // glints
  x.fillStyle = 'rgba(255,255,255,.55)'; x.fillRect(0, hz - 1, W, H*.012); // the horizon burning white
  return hz; }
/* the glass by night: Book Ten's sky (182b's), and the same stars thrown back by the glass, flattened; returns the horizon */
function b103aNight(x, W, H){ const hz = H*.44; b102aNight(x, W, H, hz);
  x.fillStyle = vgrad(x, hz, H, [[0,'#1a2436'],[.35,'#0e1420'],[1,'#05070c']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 150; i++) { const k = hash(i, 10201), sy = Math.pow(hash(i, 10204), 1.2)*hz*.96, d = 1 - sy/hz; // the sky's own stars, thrown back
    const yy = hz + d*d*(H - hz)*.9 + 2, r = .5 + Math.pow(hash(i, 10202), 3)*1.2; x.fillStyle = `rgba(210,222,250,${((.08 + k*.4)*(1 - d*.5)).toFixed(2)})`; x.fillRect(hash(i, 10203)*W, yy, r*1.4, r*.5); }
  for (let i = 0; i < 30; i++) { const d = Math.pow(hash(i, 10307), 1.3), yy = hz + d*(H - hz), x0 = hash(i, 10308)*W; x.strokeStyle = 'rgba(140,160,200,.12)'; x.lineWidth = Math.max(.5, d*1.2); x.beginPath(); x.moveTo(x0, yy); x.lineTo(x0 + W*(.05 + d*.2), yy); x.stroke(); } // seams catching starlight
  glow(x, 0, hz, W*.5, '#8aa0c8', .07); x.fillStyle = 'rgba(180,196,230,.18)'; x.fillRect(0, hz - .5, W, 1); // starlight along the horizon from the left
  return hz; }
/* a cloak thrown over a spear-shaft at a lie-up: the shaft, the cloak draped to the ground (dark outside, chalked pale inside), feet out */
function b103aCloak(x, cx, by, s, night){ const out = night ? '#141820' : '#3a3c44', inn = night ? '#3a4050' : '#e8e4da';
  ell(x, cx, by + 1*s, 9*s, 1.6*s, night ? 'rgba(0,0,0,.4)' : 'rgba(60,70,90,.3)');
  B2F.line(x, night ? '#22201c' : '#5a4630', Math.max(1, .8*s), [[cx, by], [cx + .6*s, by - 13*s]]); // the shaft
  x.fillStyle = out; x.beginPath(); x.moveTo(cx + .6*s, by - 12*s); x.lineTo(cx + 9*s, by); x.lineTo(cx - 8*s, by); x.closePath(); x.fill(); // the cloak
  x.fillStyle = inn; x.beginPath(); x.moveTo(cx + .6*s, by - 10*s); x.lineTo(cx + 3*s, by); x.lineTo(cx - 1.4*s, by); x.closePath(); x.fill(); // the pale inside at the open end
  x.fillStyle = night ? 'rgba(160,180,220,.16)' : 'rgba(255,255,255,.3)'; x.beginPath(); x.moveTo(cx + .6*s, by - 12*s); x.lineTo(cx - 8*s, by); x.lineTo(cx - 6*s, by); x.closePath(); x.fill(); // the lit edge, left
  x.fillStyle = night ? '#0a0a0c' : '#2a2018'; x.fillRect(cx - 1*s, by - 1.2*s, 1.6*s, 1.2*s); x.fillRect(cx + 1.2*s, by - 1.2*s, 1.6*s, 1.2*s); } // boots sticking out
/* a thin ox with its head down, standing, small (162b's ox, thinner) */
function b103aOx(x, cx, by, s, night, dir){ b92aOx(x, cx, by, s, night ? '#14120e' : '#6a5a48', dir || 1); x.fillStyle = night ? 'rgba(0,0,0,.25)' : 'rgba(255,255,255,.18)'; for (let i = 0; i < 4; i++) x.fillRect(cx + (i - 1.5)*2.2*s, by - 10*s, .6*s, 4*s); } // its ribs
/* the column walking east on the night glass without a light: files and wagons going away to the right, small */
function b103aColumn(x, W, H, hz, n){ for (let i = 0; i < n; i++) { const u = i/(n - 1), px = W*(.02 + u*.98), py = hz + H*(.2 - u*.17), s = .3 + (1 - u)*1.4;
    if (i % 7 === 4) { b92aWagon(x, px, py, s*.32, 'night', false); continue; }
    for (let j = 0; j < 3; j++) { x.fillStyle = '#07080c'; x.fillRect(px + j*2.4*s, py - 5*s, 1.3*s, 5*s); ell(x, px + j*2.4*s + .6*s, py - 5.8*s, .8*s, .8*s, '#07080c'); x.fillStyle = 'rgba(150,170,210,.18)'; x.fillRect(px + j*2.4*s, py - 5*s, .4*s, 4*s); } } }

/* ---------------- the backdrops ---------------- */
/* lying up by day (180's caption): the column under its cloaks to the horizon, the wagons and oxen, the glare, the shimmer */
SCENEX.b10_glass = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b103:glass', W, H, (x, W, H) => { const hz = b103aDay(x, W, H);
    for (let r = 0; r < 6; r++) { const k = r/5, cy = hz + (H - hz)*(.03 + Math.pow(k, 1.6)*.62), s = .3 + k*1.5; // the cloaks, in loose rows going away
      for (let c = 0; c < 9; c++) { if (hash(c, r, 10311) > .7) continue; b103aCloak(x, W*(.04 + c*.12 + (r % 2)*.05 + hash(c, r, 10312)*.03), cy, s, false); } }
    b92aWagon(x, W*.62, hz + H*.1, H/300, 'day', false); b92aWagon(x, W*.24, hz + H*.06, H/420, 'day', false); // wagons between the cloaks
    b103aOx(x, W*.74, hz + H*.14, H/320, false, -1); b103aOx(x, W*.79, hz + H*.15, H/320, false, -1); // oxen at a picket, heads down
    b92aWagon(x, W*.82, H*.72, H/150, 'day', false); b92aBarrels(x, W*.82, H*.7, H/200, 'day'); }), 0, 0, W, H); // the company's water wagon, near
  const hz = H*.4;
  for (let i = 0; i < 5; i++) { const yy = hz + H*(.004 + i*.008), sh = mo ? Math.sin(t/340 + i*1.3)*W*.004 : 0; ctx.fillStyle = `rgba(255,255,255,${(.18 - i*.03).toFixed(2)})`; ctx.fillRect(sh, yy, W, H*.004); } // the air wobbling over the glass
  for (let i = 0; i < 12; i++) { const on = mo ? (Math.sin(t/260 + i*2.1) > .6) : i % 3 === 0; if (!on) continue; const px = W*hash(i, 10313), py = hz + H*(.06 + hash(i, 10314)*.5); ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.fillRect(px - 2, py, 4, 1); ctx.fillRect(px, py - 2, 1, 4); } // glints flashing
  ctx.fillStyle = 'rgba(255,252,240,.06)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .4, .5); };

/* the night march (180's caption): two skies, and the column between them without a lamp */
SCENEX.b10_glass_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b103:glassn', W, H, (x, W, H) => { const hz = b103aNight(x, W, H); b103aColumn(x, W, H, hz, 34); }), 0, 0, W, H);
  const hz = H*.44;
  for (let i = 0; i < 18; i++) { const tw = mo ? (.5 + .5*Math.sin(t/(500 + i*37) + i)) : .6; ctx.fillStyle = `rgba(230,236,255,${(.25 + tw*.5).toFixed(2)})`; const px = W*hash(i, 10321), py = hz*.9*Math.pow(hash(i, 10322), 1.3); ctx.fillRect(px, py, 1.6, 1.6); // a few stars twinkling
    const d = 1 - py/hz; ctx.fillStyle = `rgba(210,222,250,${(.1 + tw*.2).toFixed(2)})`; ctx.fillRect(px, hz + d*d*(H - hz)*.9 + 2, 2, .8); } // and their twins in the glass
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .72, .5); };

/* the dead city far off on the northern horizon: the night glass, and a long broken wall with towers, very small */
SCENEX.b10_c3_city = (cv, t) => { const {ctx, W, H} = sceneFit(cv);
  ctx.drawImage(sceneLayer('b103:city', W, H, (x, W, H) => { const hz = b103aNight(x, W, H);
    const x0 = W*.22, x1 = W*.7, top = hz - H*.016; x.fillStyle = '#0a0d14';
    x.beginPath(); x.moveTo(x0, hz); for (let px = x0; px <= x1; px += W*.008) { const k = hash(Math.round(px), 10331); x.lineTo(px, top + (k > .82 ? H*.012 : k > .7 ? -H*.002 : 0)); } x.lineTo(x1, hz); x.closePath(); x.fill(); // the wall, broken in places
    [[.27, .05], [.34, .07], [.41, .04], [.5, .085], [.58, .05], [.66, .06]].forEach(([u, h], i) => { if (i === 2) { x.fillRect(W*u, hz - H*h*.6, W*.008, H*h*.6); return; } // a tower, broken off
      x.fillRect(W*u, hz - H*h, W*.01, H*h); x.fillRect(W*u - W*.002, hz - H*h, W*.014, H*.006); }); // towers along it
    x.fillStyle = 'rgba(150,170,210,.22)'; x.fillRect(x0, top, x1 - x0, 1); // starlight along its top, from the left
    x.fillStyle = 'rgba(160,180,220,.1)'; x.fillRect(x0, hz + 2, x1 - x0, H*.008); }), 0, 0, W, H); // its reflection, faint
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .72, .5); };

/* the traces (180's caption): a water wagon side on in the night glass, its yokes empty on the tongue, the squad leaning into the straps */
SCENEX.b10_traces = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b103:traces', W, H, (x, W, H) => { const hz = b103aNight(x, W, H); b103aColumn(x, W, H, hz - H*.01, 14);
    const wx = W*.62, wy = H*.74, s = H/120; // the wagon, side on
    ell(x, wx, wy + 4*s, 26*s, 3*s, 'rgba(0,0,0,.5)');
    x.fillStyle = '#1c150e'; x.fillRect(wx - 22*s, wy - 12*s, 44*s, 7*s); x.fillStyle = 'rgba(160,180,220,.18)'; x.fillRect(wx - 22*s, wy - 12*s, 44*s, 1*s); // the bed
    for (let i = 0; i < 5; i++) { const bx = wx - 18*s + i*9*s; ell(x, bx, wy - 16*s, 4*s, 5*s, '#2a2016'); x.fillStyle = '#120e0a'; x.fillRect(bx - 4*s, wy - 18*s, 8*s, .8*s); x.fillRect(bx - 4*s, wy - 14*s, 8*s, .8*s); x.fillStyle = 'rgba(170,190,230,.22)'; x.fillRect(bx - 3.6*s, wy - 20*s, 1*s, 8*s); } // barrels
    x.fillStyle = '#16181e'; x.beginPath(); x.moveTo(wx - 23*s, wy - 17*s); x.quadraticCurveTo(wx, wy - 30*s, wx + 23*s, wy - 17*s); x.lineTo(wx + 23*s, wy - 15*s); x.lineTo(wx - 23*s, wy - 15*s); x.closePath(); x.fill(); // the tilt, half off
    [[-15, 8], [15, 8]].forEach(([dx, r]) => { x.strokeStyle = '#0c0a08'; x.lineWidth = 1.6*s; x.beginPath(); x.arc(wx + dx*s, wy - 2*s, r*s, 0, 7); x.stroke(); x.strokeStyle = 'rgba(160,180,220,.25)'; x.lineWidth = .6*s; x.beginPath(); x.arc(wx + dx*s, wy - 2*s, r*s, Math.PI*.9, Math.PI*1.5); x.stroke(); // wheels
      for (let k = 0; k < 6; k++) B2F.line(x, '#0c0a08', Math.max(1, .6*s), [[wx + dx*s, wy - 2*s], [wx + dx*s + Math.cos(k)*r*s, wy - 2*s + Math.sin(k)*r*s]]); });
    B2F.line(x, '#2a2016', 1.4*s, [[wx - 22*s, wy - 6*s], [wx - 52*s, wy - 2*s]]); // the tongue, forward
    [[-36], [-48]].forEach(([dx]) => { x.strokeStyle = '#2a2016'; x.lineWidth = 1.2*s; x.beginPath(); x.arc(wx + dx*s, wy - 5*s, 3*s, Math.PI, 0); x.stroke(); }); }), 0, 0, W, H); // the empty yokes
  const wx = W*.62, wy = H*.74, s = H/120, sq = marchOrder(sceneSquad()), lean = mo ? Math.sin(t/700)*.03 : 0;
  sq.slice(0, 6).forEach((id, i) => { const row = i % 2, col = Math.floor(i/2), fx = wx - 58*s - col*12*s + row*3*s, fy = wy + (row ? 6 : -1)*s;
    B2F.line(ctx, '#3a2a18', Math.max(1, .7*s), [[fx + 2*s, fy - 14*s], [wx - 30*s - col*6*s, wy - 4*s]]); // the strap back to the tongue
    ctx.save(); ctx.translate(fx, fy); ctx.rotate(-.22 - lean); drawFigure(ctx, id, 0, 0, 1.55, t, {phase:i, dir:-1}); ctx.restore(); }); // leaning into it, facing east
  vign(ctx, W, H, .72, .5); };

/* ---------------- ground ---------------- */
const B103G = {glass:'#d6dce2', glassD:'#121a28'};
/* a tile of the glass: pale and glinting by day, dark with thrown-back stars by night */
function b103aGlassT(ctx, x, y, T, N){ const px = x*T, py = y*T; ctx.fillStyle = N ? B103G.glassD : B103G.glass; ctx.fillRect(px, py, T, T);
  b2Mottle(ctx, x, y, T, .04, .1, N ? '140,160,200' : '255,255,255', 1);
  if (hash(x, y, 10341) > .45) { ctx.strokeStyle = N ? 'rgba(130,150,190,.2)' : 'rgba(110,124,144,.35)'; ctx.lineWidth = Math.max(.5, T*.02); ctx.beginPath(); ctx.moveTo(px + T*hash(x, y, 10342), py + T*hash(x, y, 10343)); ctx.lineTo(px + T*hash(x, y, 10344), py + T*hash(x, y, 10345)); ctx.stroke(); } // a seam
  for (let i = 0; i < 2; i++) { if (hash(x, y, 10346 + i) < .5) continue; ctx.fillStyle = N ? 'rgba(220,230,255,.5)' : 'rgba(255,255,255,.95)'; ctx.fillRect(px + T*hash(x, y, 10348 + i), py + T*hash(x, y, 10350 + i), Math.max(1, T*.05), Math.max(1, T*.02)); } } // a glint, or a star in it
TILEX.b10_c3_ground = (ctx, ch, x, y, T, dark) => { const N = !!dark, south = b103aSouth(), base = TILEX.b9_c3_road;
  const ground = c => { if (south && base) base(ctx, c, x, y, T, dark); else b2Clip(ctx, x, y, T, () => { b103aGlassT(ctx, x, y, T, N);
    if (c === '<' || c === '>' || c === 'X' || c === 'r') { ctx.fillStyle = N ? 'rgba(170,190,230,.08)' : 'rgba(255,255,255,.3)'; ctx.fillRect(x*T + T*.2, y*T, T*.6, T); } // the column's track at the edge
    if (c === '#') { const px = x*T, py = y*T; for (let i = 0; i < 3; i++) { const sx = px + T*(.15 + i*.3 + hash(x, y, 10361 + i)*.1), h = T*(.3 + hash(x, y, 10364 + i)*.4); // a ridge of shards
        ctx.fillStyle = N ? '#26324a' : '#a8b4c4'; ctx.beginPath(); ctx.moveTo(sx - T*.12, py + T*.9); ctx.lineTo(sx, py + T*.9 - h); ctx.lineTo(sx + T*.1, py + T*.9); ctx.closePath(); ctx.fill();
        ctx.fillStyle = N ? 'rgba(170,190,230,.3)' : 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.moveTo(sx - T*.12, py + T*.9); ctx.lineTo(sx, py + T*.9 - h); ctx.lineTo(sx - T*.03, py + T*.9); ctx.closePath(); ctx.fill(); } } }); };
  if (!'cWwxFv'.includes(ch)) return ground(ch);
  ground('.');
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === 'c') return b103aCloak(ctx, px + T*.5, py + T*.86, T/16, N);
    if (ch === 'w') return b55Wagon(ctx, px, py, T, N);
    if (ch === 'W') { const f = (S && S.f) || {}, gone = f.b10_c3_ph >= 4 && f.b10_c3_key === 'cut';
      if (gone) { for (let i = 0; i < 3; i++) { const sx = px + T*(.2 + i*.3); B2F.line(ctx, N ? '#22201c' : '#5a4630', Math.max(1, T*.04), [[sx, py + T*.9], [sx, py + T*.2]]); ell(ctx, sx, py + T*.5, T*.1, T*.16, N ? '#2a2016' : '#7a5a38'); } return; } // skins hung on shafts where the wagon would be
      b55Wagon(ctx, px, py, T, N); [[.3], [.5], [.7]].forEach(([k]) => { ell(ctx, px + T*k, py + T*.4, T*.1, T*.12, N ? '#2a2016' : '#7a5a38'); ctx.fillStyle = N ? '#14100c' : '#3a2a1a'; ctx.fillRect(px + T*(k - .1), py + T*.38, T*.2, Math.max(1, T*.03)); }); return; } // the water wagon, its barrels
    if (ch === 'x') { ctx.strokeStyle = N ? 'rgba(150,130,100,.5)' : 'rgba(110,86,56,.8)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.lineTo(px + T, py + T*.3); ctx.stroke(); // the picket line
      const ph = (S && S.f && S.f.b10_c3_ph) || 1; if (ph >= 2) return; return b103aOx(ctx, px + T*.56, py + T*.86, T/26, N, hash(x, y, 10371) > .5 ? 1 : -1); }
    if (ch === 'F') { for (let i = 0; i < 7; i++) { const a = i/7*Math.PI*2; ell(ctx, px + T*(.5 + Math.cos(a)*.32), py + T*(.56 + Math.sin(a)*.22), T*.1, T*.07, N ? '#2a2620' : '#6a5a48'); } // packs in a ring, no fire
      ctx.fillStyle = N ? '#1a1610' : '#5a4630'; ctx.fillRect(px + T*.44, py + T*.5, T*.12, T*.06); return; } // a skin in the middle
    if (ch === 'v') { ell(ctx, px + T*.5, py + T*.7, T*.48, T*.24, N ? '#1e2a40' : '#e6eaee'); ell(ctx, px + T*.42, py + T*.62, T*.3, T*.12, N ? 'rgba(170,190,230,.16)' : 'rgba(255,255,255,.7)'); return; } }); }; // a low rise of glass, lit from the left
/* low cover ('t') on this chapter's ground: a shard of glass standing up (a stone on 'south') */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b10_c3_ground') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.88, T*.4, T*.09, 'rgba(0,0,0,.5)');
      if (b103aSouth()) { ell(ctx, px + T*.5, py + T*.62, T*.36, T*.26, N ? '#2a2826' : '#8a8478'); ctx.fillStyle = 'rgba(255,240,220,.14)'; ctx.fillRect(px + T*.22, py + T*.48, T*.24, T*.06); return; }
      ctx.fillStyle = N ? '#2a3854' : '#b4c0ce'; ctx.beginPath(); ctx.moveTo(px + T*.2, py + T*.88); ctx.lineTo(px + T*.42, py + T*.12); ctx.lineTo(px + T*.6, py + T*.3); ctx.lineTo(px + T*.8, py + T*.88); ctx.closePath(); ctx.fill();
      ctx.fillStyle = N ? 'rgba(180,200,240,.32)' : 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.moveTo(px + T*.2, py + T*.88); ctx.lineTo(px + T*.42, py + T*.12); ctx.lineTo(px + T*.36, py + T*.88); ctx.closePath(); ctx.fill(); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Ten's ground: night glass, blue-black, a cold starlight rim from the upper left) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".38" cy=".36" r=".85"><stop offset="0" stop-color="#2a3a52"/><stop offset=".6" stop-color="#141c2a"/><stop offset="1" stop-color="#070a10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a knife knapped from the glass: a stick handle bound with gut, a leaf-shaped blade of pale translucent glass flaked in facets, an
     edge of light along it; lying on the ground at an angle */
  { let fac = ''; for (let i = 0; i < 9; i++) { const u = 112 + i*8; fac += `<path d="M${u} ${60 + (i % 2)*2} q4 ${6 + (i % 3)} 8 0" fill="none" stroke="#eaf2ff" stroke-width=".8" opacity="${(.35 + hash(i, 10381)*.35).toFixed(2)}"/><path d="M${u} ${80 - (i % 2)*2} q4 -${6 + (i % 3)} 8 0" fill="none" stroke="#5a6a84" stroke-width=".8" opacity=".6"/>`; }
  ART['item/b10_c3_glassknife'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A knife knapped from the glass">${bg('b103gk')}
<linearGradient id="b103gk-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6eefa" stop-opacity=".95"/><stop offset=".45" stop-color="#9eb0c8" stop-opacity=".8"/><stop offset="1" stop-color="#3a4a62" stop-opacity=".9"/></linearGradient>
<linearGradient id="b103gk-h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a46"/><stop offset="1" stop-color="#3a2614"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b103gk-bg)"/><path d="M0 116 L200 108 L200 150 L0 150 Z" fill="#141a26"/><path d="M0 116 L200 108" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/><ellipse cx="104" cy="112" rx="78" ry="7" fill="url(#b103gk-sh)"/>
<g transform="rotate(-16 100 72)"><rect x="34" y="64" width="72" height="12" rx="5" fill="url(#b103gk-h)" stroke="#0a0c10" stroke-width="1.2"/>
<path d="M92 63 L104 63 M92 66 L104 66 M92 69 L104 69 M92 72 L104 72 M92 75 L104 75" stroke="#c8b48a" stroke-width="1.6" opacity=".85"/>
<path d="M104 60 Q140 52 182 70 Q140 88 104 80 Z" fill="url(#b103gk-b)" stroke="#0c1220" stroke-width="1.2"/>${fac}
<path d="M104 60 Q140 52 182 70" fill="none" stroke="#ffffff" stroke-width="1.4" opacity=".85"/><path d="M38 65 L100 65" stroke="#dce6f8" stroke-width=".8" opacity=".4"/></g>
<ellipse cx="120" cy="58" rx="60" ry="26" fill="#c8d4f0" opacity=".05"/></svg>`;
  ART_SIZE['item/b10_c3_glassknife'] = [200, 150]; }
  /* a lie-up cloak: a long cloak thrown over a spear-shaft, dark outside, the pale chalked inside showing at the open end, the hem on the
     ground; starlight down its left side */
  ART['item/b10_c3_nightcloak'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A lie-up cloak">${bg('b103nc')}
<linearGradient id="b103nc-o" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a6274"/><stop offset=".35" stop-color="#262a34"/><stop offset="1" stop-color="#0e1016"/></linearGradient>
<linearGradient id="b103nc-i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8e4da"/><stop offset="1" stop-color="#a8a49a"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b103nc-bg)"/><path d="M0 120 L200 114 L200 150 L0 150 Z" fill="#141a26"/><path d="M0 120 L200 114" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/><ellipse cx="100" cy="120" rx="84" ry="8" fill="url(#b103nc-sh)"/>
<path d="M96 120 L102 16" stroke="#5a4630" stroke-width="4" stroke-linecap="round"/><path d="M95 120 L101 16" stroke="#c8d4ea" stroke-width="1" opacity=".4"/>
<path d="M101 22 Q60 60 22 122 L176 120 Q140 60 101 22 Z" fill="url(#b103nc-o)" stroke="#06080c" stroke-width="1.6"/>
<path d="M101 34 Q90 80 82 121 L124 120 Q112 78 101 34 Z" fill="url(#b103nc-i)" stroke="#2a2a2a" stroke-width=".8"/>
<path d="M88 118 L90 112 M98 119 L99 113 M110 118 L109 112" stroke="#6a665e" stroke-width="1" opacity=".6"/>
<path d="M101 22 Q60 60 22 122" fill="none" stroke="#dce6f8" stroke-width="1.4" opacity=".55"/><path d="M60 80 Q70 90 66 112 M140 84 Q132 96 136 116" fill="none" stroke="#06080c" stroke-width="1.2" opacity=".6"/>
<rect x="92" y="114" width="7" height="6" fill="#1a1410"/><rect x="104" y="114" width="7" height="6" fill="#1a1410"/>
<ellipse cx="80" cy="60" rx="56" ry="36" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c3_nightcloak'] = [200, 150];
  /* a trace-strap: a long oiled leather strap coiled loosely on the ground, an iron ring at one end and a buckle at the other, worn dark
     and smooth where a shoulder leaned */
  ART['item/b10_c3_tracestrap'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A trace-strap">${bg('b103ts')}
<linearGradient id="b103ts-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a7448"/><stop offset=".5" stop-color="#5a3e22"/><stop offset="1" stop-color="#2a1a0c"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b103ts-bg)"/><path d="M0 118 L200 112 L200 150 L0 150 Z" fill="#141a26"/><path d="M0 118 L200 112" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/><ellipse cx="100" cy="114" rx="80" ry="8" fill="url(#b103ts-sh)"/>
<ellipse cx="100" cy="86" rx="58" ry="22" fill="none" stroke="url(#b103ts-l)" stroke-width="13"/><ellipse cx="100" cy="86" rx="58" ry="22" fill="none" stroke="#0a0c10" stroke-width="1" opacity=".5"/>
<ellipse cx="96" cy="78" rx="40" ry="15" fill="none" stroke="url(#b103ts-l)" stroke-width="12"/><path d="M58 76 Q60 66 78 64" fill="none" stroke="#2a1a0c" stroke-width="5" opacity=".7"/>
<path d="M150 88 Q166 96 176 92" fill="none" stroke="url(#b103ts-l)" stroke-width="12" stroke-linecap="round"/>
<circle cx="182" cy="90" r="9" fill="none" stroke="#6a6e76" stroke-width="3.4"/><circle cx="182" cy="90" r="9" fill="none" stroke="#dce6f8" stroke-width=".8" opacity=".5"/>
<rect x="40" y="62" width="16" height="12" rx="2" fill="none" stroke="#8a8a86" stroke-width="2.6"/><path d="M48 62 L48 74" stroke="#8a8a86" stroke-width="2"/>
<path d="M44 82 Q60 104 100 108" fill="none" stroke="#dce6f8" stroke-width="1.2" opacity=".45"/><path d="M58 70 Q76 60 100 62" fill="none" stroke="#e8c8a0" stroke-width="1" opacity=".4"/>
<ellipse cx="86" cy="70" rx="54" ry="30" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c3_tracestrap'] = [200, 150];
}
