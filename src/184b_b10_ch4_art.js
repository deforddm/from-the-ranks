/* ============ Book Ten, Chapter 4 art: The Long Way Round — the train's horse-lines at dusk, the road south at night ============ */
/* Book Nine's road ground and train (163b's land, road and horses, 162b's wagons and barrels), and Book Ten's sky (182b), drier and later:
   the long way round. At dusk, the light going out behind the train, the horse-lines with every head down, a horse lying at the near end
   and a horse-blanket spread on the ground beside it (the reading's place); on 'adjunct' the same hour on the glass (183b's glass), the
   column lying up under its cloaks to the horizon and at its tail a few Letherii carts and a picket of thin horses. At night, Book Ten's
   sky, blue-black, starlight from the upper left; the road a pale line going away south, the brigades' fires in a long line along it, a
   farrier's lamp at the horse-lines.
   Two backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b10_c4_dusk      the horse-lines at dusk (this chapter's), road-aware
     b10_south_night  the column's camp on the road south at night (180's caption; Ch 3's 'south' road uses it too)
   Ground (TILEX): b10_c4_ground, on Ch 2's b10_c2_ground for the road ('W', 'B', 'c', 'k', 'X' are its), with 'H' the horse-lines (a
   trigger), 'R' the column's rear on the track, 'v' a low rise of stones on the road's east side, 's' a dry wash with white stones and old
   bones; on 'adjunct' the open ground is the glass (183b's tile), with cloaks, carts, the picket and a ring of packs for the circle.
   Battle 't' is a pack-saddle on the ground, girths trailing.
   The chapter's gear in the series' 200×150 item style on Book Ten's ground: night glass, blue-black (#2a3a52 → #070a10), a cold
   starlight rim from the upper left. */

const b104aAdj = () => !!(S && S.f && S.f.b10_lRoad === 'adjunct');

/* ---------------- shared pieces ---------------- */
/* a horse lying down, side on: the body low, the legs folded under, the neck up and the head low (deciding) */
function b104aDown(x, cx, cy, s, col, dir){ x.save(); x.translate(cx, cy); x.scale(dir || 1, 1); x.fillStyle = col;
  x.beginPath(); x.ellipse(0, -3.6*s, 7.4*s, 3.2*s, 0, 0, 7); x.fill(); // the body, low
  x.fillRect(-5*s, -1.2*s, 4*s, 1.2*s); x.fillRect(2*s, -1.2*s, 4.4*s, 1.2*s); // the legs folded under
  x.beginPath(); x.moveTo(5*s, -5*s); x.lineTo(8.4*s, -8.6*s); x.lineTo(10*s, -7.6*s); x.lineTo(7.4*s, -3.4*s); x.fill(); // the neck
  x.beginPath(); x.ellipse(10.4*s, -6.2*s, 2.6*s, 1.3*s, 1.1, 0, 7); x.fill(); // the head, low, nearly to the ground
  x.fillRect(-8*s, -4*s, 1*s, 3.6*s); x.restore(); } // the tail
/* a horse-blanket spread on the ground, in perspective: a coarse striped wool, a corner turned up */
function b104aBlanket(x, cx, cy, s, N){ const base = N ? '#2a2632' : '#6a3e2e', st = N ? '#3a3a4c' : '#a8805a';
  ell(x, cx, cy + 1*s, 15*s, 3*s, 'rgba(0,0,0,.35)');
  x.fillStyle = base; x.beginPath(); x.moveTo(cx - 14*s, cy); x.lineTo(cx + 12*s, cy - .6*s); x.lineTo(cx + 9*s, cy - 6*s); x.lineTo(cx - 11*s, cy - 5.4*s); x.closePath(); x.fill();
  x.fillStyle = st; for (let i = 0; i < 3; i++) { const k = .22 + i*.26; x.beginPath(); x.moveTo(cx - 14*s + k*3*s, cy - k*5.4*s); x.lineTo(cx + 12*s - k*3*s, cy - .6*s - k*5.4*s); x.lineTo(cx + 12*s - k*3*s, cy - .6*s - (k + .07)*5.4*s); x.lineTo(cx - 14*s + k*3*s, cy - (k + .07)*5.4*s); x.closePath(); x.fill(); }
  x.fillStyle = N ? '#1a1820' : '#4a2a1e'; x.beginPath(); x.moveTo(cx + 9*s, cy - 6*s); x.lineTo(cx + 12*s, cy - .6*s); x.lineTo(cx + 14*s, cy - 4*s); x.closePath(); x.fill(); } // the corner turned up
/* the brigades' fires in a long line going away south down the road to its vanishing point */
function b104aFires(x, W, H, hz, vx, n){ for (let i = 0; i < n; i++) { const k = Math.pow(hash(i, 10401), 1.5), px = vx + (W*.4 - vx)*(1 - k)*.0 + (hash(i, 10402) - .5)*W*.5*(1 - k), py = hz + (H*.62 - hz)*(1 - k)*.5 + H*.004;
    x.fillStyle = `rgba(255,${150 + Math.round(hash(i, 10403)*60)},90,${(.35 + hash(i, 10404)*.5).toFixed(2)})`; const r = .8 + (1 - k)*1.8; x.fillRect(px, py, r*1.4, r); }
  glow(x, vx, hz + H*.02, W*.3, '#ff9a50', .06); }

/* ---------------- the backdrops ---------------- */
/* the horse-lines at dusk: the light going, every head on the picket down, a horse lying at the near end, a horse-blanket beside it, the
   train's wagons along the road; on 'adjunct' the glass at the day's end and the column's tail */
SCENEX.b10_c4_dusk = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, adj = b104aAdj(), up = !!(S && S.f && S.f.b10_c4_farrierOk);
  ctx.drawImage(sceneLayer('b104:dusk:' + (adj ? 1 : 0) + (up ? 1 : 0), W, H, (x, W, H) => { const hz = H*.44, s = H/210;
    if (adj) { x.fillStyle = vgrad(x, 0, hz, [[0,'#141828'],[.5,'#3e3a4e'],[.85,'#a07a6a'],[1,'#d0a07a']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.02, hz, W*.55, '#e8945a', .28);
      for (let i = 0; i < 22; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 10411)*.35).toFixed(2)})`; x.fillRect(hash(i, 10412)*W, Math.pow(hash(i, 10413), 1.5)*hz*.45, 1, 1); }
      x.fillStyle = vgrad(x, hz, H, [[0,'#d8b8a0'],[.25,'#8a7c88'],[.6,'#3e4254'],[1,'#1a1e2a']]); x.fillRect(0, hz, W, H - hz); // the glass giving back the last light
      for (let i = 0; i < 40; i++) { const d = Math.pow(hash(i, 10414), 1.4), yy = hz + d*(H - hz), x0 = hash(i, 10415)*W; x.strokeStyle = hash(i, 10416) > .5 ? 'rgba(60,64,84,.3)' : 'rgba(255,220,190,.22)'; x.lineWidth = Math.max(.6, d*1.4); x.beginPath(); x.moveTo(x0, yy); x.lineTo(x0 + W*(.04 + d*.2), yy); x.stroke(); } // seams
      for (let r = 0; r < 4; r++) { const k = r/3, cy = hz + (H - hz)*(.02 + Math.pow(k, 1.7)*.22), sc = .3 + k*.8; for (let c = 0; c < 10; c++) { if (hash(c, r, 10417) > .65) continue; b103aCloak(x, W*(.3 + c*.075 + (r % 2)*.03), cy, sc, true); } } // the column under its cloaks, going away east
      b92aWagon(x, W*.18, hz + H*.2, H/230, 'eve', false); b55Cart(x, W*.06, hz + H*.14, H*.12, true); // the Sixth's carts at the tail
      b102aPicket(x, W*.04, W*.34, hz + H*.36, s*.9, true); }
    else { const hz2 = b93aLand(x, W, H, 'eve', false); b93aRoad(x, W, H, hz2, 'eve', W*.7);
      b104aFires(x, W, H, hz2, W*.7, 24); // the brigades' fires coming up south along the road
      x.fillStyle = 'rgba(214,180,140,.24)'; x.fillRect(W*.66, hz2 - H*.04, W*.03, H*.04); // the Grey Helms' dust, far, catching the last light
      b92aWagon(x, W*.5, hz2 + H*.16, H/220, 'eve', true); b92aWagon(x, W*.82, hz2 + H*.2, H/190, 'eve', false); b92aBarrels(x, W*.9, H*.74, H/160, 'eve');
      for (let i = 0; i < 2; i++) b92aTent(x, W*(.6 + i*.12), hz2 + H*.3, H/260, 'eve');
      b102aPicket(x, W*.04, W*.4, hz2 + H*.32, s, false); }
    const py = H*.8;
    if (!up) b104aDown(x, W*.14, py, s*1.4, adj ? '#2a201a' : '#5a5048', 1); // the grey mare, lying down, deciding
    b104aBlanket(x, W*.32, py + H*.06, s*1.3, adj); }), 0, 0, W, H);
  const hz = H*.44;
  if (up) { const py = H*.8; b93aHorse(ctx, W*.14, py, H/150, adj ? '#2a201a' : '#6a6058', 1); ctx.fillStyle = 'rgba(220,220,210,.6)'; ctx.fillRect(W*.14 + H/150*9, py - H/150*15.5, H/150*3.4, H/150*1.4); } // up, a wet cloth over her eyes
  for (let i = 0; i < 10; i++) { const q = ((t/14000*mo + hash(i, 10421)) % 1); ctx.fillStyle = `rgba(230,200,170,${(.16*(1 - q)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 10422)*.8) + q*W*.03, H*(.55 + hash(i, 10423)*.35) - q*H*.03, 1.2, 1.2); } // dust in the last light
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.46 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .58, .5); };

/* the column's camp on the road south at night (180's caption): the road a pale line going south, the brigades' fires along it, the
   horse-lines quiet, a farrier's lamp still going */
SCENEX.b10_south_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), fl = b2Fl(t), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b104:southn', W, H, (x, W, H) => { const hz = H*.44; b102aNight(x, W, H, hz);
    x.fillStyle = vgrad(x, hz, H, [[0,'#1c1c20'],[1,'#08080a']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 90; i++) { const d = hash(i, 10431), yy = hz + Math.pow(d, .8)*(H - hz); x.fillStyle = 'rgba(90,96,110,.14)'; x.fillRect(hash(i, 10432)*W, yy, 2 + d*8, 1); } // dry grass and grit under starlight
    b93aRoad(x, W, H, hz, 'night', W*.62); x.fillStyle = 'rgba(170,180,200,.06)'; x.beginPath(); x.moveTo(W*.615, hz); x.lineTo(W*.625, hz); x.lineTo(W*.86, H); x.lineTo(W*.34, H); x.closePath(); x.fill(); // the road pale in the starlight
    b104aFires(x, W, H, hz, W*.62, 46); // the brigades' fires in a long line south
    x.fillStyle = 'rgba(180,196,230,.14)'; x.fillRect(0, hz - .5, W*.3, 1); // the far north, where the glass is: nothing, a faint line
    b92aWagon(x, W*.16, hz + H*.18, H/230, 'night', false); b92aWagon(x, W*.44, hz + H*.14, H/260, 'night', false); b92aWagon(x, W*.9, hz + H*.22, H/200, 'night', false);
    b92aBarrels(x, W*.94, H*.72, H/170, 'night');
    b102aPicket(x, W*.02, W*.36, hz + H*.34, H/220, true); }), 0, 0, W, H);
  const hz = H*.44, lx = W*.38, ly = hz + H*.24; ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.14, '#ffb060', .22*fl); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,210,140,.95)'; ctx.fillRect(lx - 1.2, ly - 1.6, 2.4, 3.2); // the farrier's lamp
  for (let i = 0; i < 8; i++) { const tw = mo ? (.5 + .5*Math.sin(t/(600 + i*41) + i)) : .6; ctx.fillStyle = `rgba(255,190,110,${(.2 + tw*.4).toFixed(2)})`; const k = hash(i, 10441); ctx.fillRect(W*.62 + (hash(i, 10442) - .5)*W*.3*(1 - k), hz + H*.004 + (1 - k)*H*.05, 1.4, 1.2); } // a few of the far fires flickering
  b94aFire(ctx, W*.6, H*.86, fl, 1);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* ---------------- ground ---------------- */
/* the road ground is Ch 2's (b10_c2_ground, on Book Nine's road); on 'adjunct' the glass (183b's tile) with this chapter's few things on it */
TILEX.b10_c4_ground = (ctx, ch, x, y, T, dark) => { const N = !!dark, base = TILEX.b10_c2_ground, road = TILEX.b9_c3_road;
  if (!b104aAdj()) { if (!base || !road) return;
    if (ch === 'H') return base(ctx, 'h', x, y, T, dark);
    if (ch === 'R') return road(ctx, ',', x, y, T, dark);
    if (ch === 'v' || ch === 's') { road(ctx, ch === 's' ? '>' : '.', x, y, T, dark);
      return b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
        if (ch === 'v') { for (let i = 0; i < 3; i++) ell(ctx, px + T*(.24 + i*.26), py + T*(.7 - (i % 2)*.1), T*.14, T*.1, N ? '#2a2824' : '#9a8a6c'); ctx.fillStyle = N ? 'rgba(160,180,210,.12)' : 'rgba(255,240,210,.3)'; ctx.fillRect(px + T*.16, py + T*.58, T*.5, T*.04); return; } // a low rise of stones
        ctx.fillStyle = N ? 'rgba(10,10,12,.35)' : 'rgba(90,74,50,.25)'; ctx.fillRect(px, py + T*.2, T, T*.6); // the wash's bed
        for (let i = 0; i < 5; i++) ell(ctx, px + T*hash(x, y, 10451 + i), py + T*(.3 + hash(x, y, 10456 + i)*.4), T*.06, T*.04, N ? '#5a5a58' : '#e8e2d2'); // white stones
        B2F.line(ctx, N ? '#6a6a66' : '#ddd6c4', Math.max(1, T*.03), [[px + T*.3, py + T*.56], [px + T*.62, py + T*.5]]); B2F.line(ctx, N ? '#6a6a66' : '#ddd6c4', Math.max(1, T*.02), [[px + T*.4, py + T*.48], [px + T*.44, py + T*.62]]); }); } // an old bone
    return base(ctx, ch, x, y, T, dark); }
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T; b103aGlassT(ctx, x, y, T, N);
    if ('<>Xv'.includes(ch)) { ctx.fillStyle = N ? 'rgba(170,190,230,.08)' : 'rgba(255,255,255,.3)'; ctx.fillRect(px + T*.2, py, T*.6, T); return; } // the column's track at the edge
    if (ch === '#') { for (let i = 0; i < 3; i++) { const sx = px + T*(.15 + i*.3 + hash(x, y, 10461 + i)*.1), h = T*(.3 + hash(x, y, 10464 + i)*.4); // a ridge of shards
        ctx.fillStyle = N ? '#26324a' : '#a8b4c4'; ctx.beginPath(); ctx.moveTo(sx - T*.12, py + T*.9); ctx.lineTo(sx, py + T*.9 - h); ctx.lineTo(sx + T*.1, py + T*.9); ctx.closePath(); ctx.fill(); } return; }
    if (ch === 'T') return b103aCloak(ctx, px + T*.5, py + T*.86, T/16, N);
    if (ch === 'w') return b55Wagon(ctx, px, py, T, N);
    if (ch === 'W' || ch === 'c') return b55Cart(ctx, px, py, T, N); // the Sixth's carts; the foreigners' water-cart
    if (ch === 'h' || ch === 'H') { ctx.strokeStyle = N ? 'rgba(150,130,100,.5)' : 'rgba(110,86,56,.8)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.lineTo(px + T, py + T*.3); ctx.stroke();
      return b93aHorse(ctx, px + T*.46, py + T*.88, T/30, N ? '#16120e' : '#4a3a2c', hash(x, y, 10471) > .5 ? 1 : -1); } // a thin horse on the picket
    if (ch === 'k') { if (S && S.f && S.f.b10_c4_farrierOk) return b93aHorse(ctx, px + T*.46, py + T*.88, T/30, N ? '#2a241e' : '#6a6058', 1); return b104aDown(ctx, px + T*.42, py + T*.86, T/30, N ? '#2a241e' : '#5a5048', 1); }
    if (ch === 'F') { for (let i = 0; i < 7; i++) { const a = i/7*Math.PI*2; ell(ctx, px + T*(.5 + Math.cos(a)*.32), py + T*(.56 + Math.sin(a)*.22), T*.1, T*.07, N ? '#2a2620' : '#6a5a48'); } // packs in a ring, no fire
      ctx.fillStyle = N ? '#1a1610' : '#5a4630'; ctx.fillRect(px + T*.44, py + T*.5, T*.12, T*.06); return; } }); };
/* on the road, the horse that has gone down ('k') is Ch 2's dead horse until she is up: draw her lying (alive) or standing */
{ const _g = TILEX.b10_c4_ground;
  TILEX.b10_c4_ground = (ctx, ch, x, y, T, dark) => { if (ch !== 'k' || b104aAdj() || !TILEX.b9_c3_road) return _g(ctx, ch, x, y, T, dark);
    TILEX.b9_c3_road(ctx, '.', x, y, T, dark); const N = !!dark, up = !!(S && S.f && S.f.b10_c4_farrierOk);
    b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T; ell(ctx, px + T*.5, py + T*.88, T*.42, T*.08, 'rgba(0,0,0,.4)');
      if (up) b93aHorse(ctx, px + T*.46, py + T*.88, T/30, N ? '#2a241e' : '#7a7068', 1); else b104aDown(ctx, px + T*.42, py + T*.86, T/30, N ? '#2a241e' : '#7a7068', 1);
      b104aBlanket(ctx, px + T*.5, py + T*.98, T/44, N); }); }; }
/* low cover ('t') on this chapter's ground: a pack-saddle on the ground, girths trailing */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b10_c4_ground') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.88, T*.42, T*.09, 'rgba(0,0,0,.5)');
      ctx.fillStyle = N ? '#2a2016' : '#6a4a2c'; ctx.beginPath(); ctx.moveTo(px + T*.14, py + T*.82); ctx.quadraticCurveTo(px + T*.5, py + T*.22, px + T*.86, py + T*.82); ctx.closePath(); ctx.fill(); // the saddle's tree, an arch
      ctx.fillStyle = N ? '#3a2e22' : '#8a6a44'; ctx.fillRect(px + T*.22, py + T*.6, T*.56, T*.08); // a pack-board across it
      B2F.line(ctx, N ? '#1a140e' : '#3a2a1a', Math.max(1, T*.03), [[px + T*.2, py + T*.8], [px + T*.06, py + T*.94]]); B2F.line(ctx, N ? '#1a140e' : '#3a2a1a', Math.max(1, T*.03), [[px + T*.8, py + T*.8], [px + T*.94, py + T*.92]]); // the girths
      ctx.fillStyle = N ? 'rgba(160,180,210,.16)' : 'rgba(255,240,210,.28)'; ctx.beginPath(); ctx.moveTo(px + T*.14, py + T*.82); ctx.quadraticCurveTo(px + T*.32, py + T*.4, px + T*.5, py + T*.38); ctx.lineTo(px + T*.5, py + T*.44); ctx.quadraticCurveTo(px + T*.32, py + T*.48, px + T*.2, py + T*.82); ctx.closePath(); ctx.fill(); return; } // the lit edge, left
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Ten's ground: night glass, blue-black, a cold starlight rim from the upper left) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".38" cy=".36" r=".85"><stop offset="0" stop-color="#2a3a52"/><stop offset=".6" stop-color="#141c2a"/><stop offset="1" stop-color="#070a10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a horse-bow: short, recurved, horn and sinew in bands, a leather grip, the string taut; lying on the ground with two arrows */
  ART['item/b10_c4_horsebow'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A horse-bow">${bg('b104hb')}
<linearGradient id="b104hb-h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8b08a"/><stop offset=".5" stop-color="#8a6a44"/><stop offset="1" stop-color="#3a2a1a"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b104hb-bg)"/><path d="M0 120 L200 112 L200 150 L0 150 Z" fill="#1a1c22"/><path d="M0 120 L200 112" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/><ellipse cx="100" cy="116" rx="80" ry="7" fill="url(#b104hb-sh)"/>
<g transform="rotate(-8 100 72)"><path d="M34 40 Q46 30 40 22 M166 40 Q154 30 160 22" fill="none" stroke="#2a1c10" stroke-width="5" stroke-linecap="round"/>
<path d="M40 22 Q30 34 46 46 Q100 98 154 46 Q170 34 160 22" fill="none" stroke="#0a0c10" stroke-width="9" stroke-linecap="round"/>
<path d="M40 22 Q30 34 46 46 Q100 98 154 46 Q170 34 160 22" fill="none" stroke="url(#b104hb-h)" stroke-width="6.4" stroke-linecap="round"/>
<path d="M58 58 L62 54 M70 66 L73 61 M128 66 L131 61 M140 58 L143 54" stroke="#4a3420" stroke-width="2.2"/><path d="M50 50 L54 47 M146 50 L150 47" stroke="#d8c8a8" stroke-width="1.6" opacity=".7"/>
<rect x="92" y="66" width="16" height="10" rx="2" fill="#3a2a1a" stroke="#0a0c10"/><path d="M95 67 L95 75 M99 67 L99 75 M103 67 L103 75" stroke="#5a4430" stroke-width=".8"/>
<path d="M40 22 L160 22" stroke="#d8d0c0" stroke-width="1" opacity=".8"/>
<path d="M42 26 Q48 42 62 52" fill="none" stroke="#eef4ff" stroke-width="1" opacity=".55"/></g>
<path d="M30 106 L168 96" stroke="#7a6448" stroke-width="2"/><path d="M168 96 L176 94 L170 99 Z" fill="#6a7280"/><path d="M30 106 L24 102 M30 106 L24 109" stroke="#c8c0b0" stroke-width="1.4"/>
<path d="M44 112 L172 104" stroke="#6a5438" stroke-width="2"/><path d="M172 104 L180 103 L173 107 Z" fill="#6a7280"/><path d="M44 112 L38 108 M44 112 L38 115" stroke="#c8c0b0" stroke-width="1.4"/>
<ellipse cx="80" cy="56" rx="60" ry="30" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c4_horsebow'] = [200, 150];
  /* a farrier's rasp: a long flat file, cross-cut in a diamond pattern, worn thin and bright in the middle, a wooden handle, on a thong */
  { let teeth = ''; for (let i = 0; i < 22; i++) { const u = 52 + i*4.6; teeth += `<path d="M${u.toFixed(1)} 64 L${(u + 3).toFixed(1)} 80 M${(u + 3).toFixed(1)} 64 L${u.toFixed(1)} 80" stroke="${i > 8 && i < 14 ? '#a8b4c8' : '#3a404c'}" stroke-width=".9" opacity=".8"/>`; }
  ART['item/b10_c4_rasp'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A farrier's rasp">${bg('b104ra')}
<linearGradient id="b104ra-m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8d2e2"/><stop offset=".5" stop-color="#6a7282"/><stop offset="1" stop-color="#2a2e38"/></linearGradient>
<linearGradient id="b104ra-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a88a5e"/><stop offset="1" stop-color="#4a3420"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b104ra-bg)"/><path d="M0 118 L200 110 L200 150 L0 150 Z" fill="#1a1c22"/><path d="M0 118 L200 110" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/><ellipse cx="100" cy="112" rx="78" ry="7" fill="url(#b104ra-sh)"/>
<g transform="rotate(-10 100 72)"><path d="M48 62 L154 62 Q160 72 154 82 L48 82 Z" fill="url(#b104ra-m)" stroke="#0a0c10" stroke-width="1.2"/>
<path d="M90 63 Q100 70 112 63 L112 81 Q100 75 90 81 Z" fill="#dce4f0" opacity=".18"/>${teeth}
<rect x="18" y="66" width="32" height="12" rx="5" fill="url(#b104ra-w)" stroke="#0a0c10"/><path d="M24 67 L24 77 M30 67 L30 77" stroke="#3a2a1a" stroke-width=".8"/>
<path d="M48 62 L154 62" stroke="#eef4ff" stroke-width="1.1" opacity=".7"/><path d="M20 67 L48 67" stroke="#dce6f8" stroke-width=".7" opacity=".4"/>
<path d="M18 72 Q4 92 22 108 Q40 120 58 110" fill="none" stroke="#5a4028" stroke-width="2.2" stroke-linecap="round"/></g>
<ellipse cx="86" cy="62" rx="58" ry="26" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c4_rasp'] = [200, 150]; }
  /* a dust veil: a long strip of loose-woven cloth, the colour of the road, wound loosely into a coil with one end trailing, its weave
     showing, dust in the folds */
  { let weave = ''; for (let i = 0; i < 18; i++) weave += `<path d="M${40 + i*7} 52 L${46 + i*7} 108" stroke="#5a4c38" stroke-width=".6" opacity=".45"/>`;
  ART['item/b10_c4_veil'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A dust veil">${bg('b104ve')}
<linearGradient id="b104ve-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d0bc98"/><stop offset=".55" stop-color="#9a8462"/><stop offset="1" stop-color="#4a3e2c"/></linearGradient>
<clipPath id="b104ve-k"><path d="M38 70 Q60 44 100 50 Q150 46 164 72 Q170 96 140 104 Q100 112 62 104 Q30 96 38 70 Z"/></clipPath></defs>
<rect width="200" height="150" fill="url(#b104ve-bg)"/><ellipse cx="100" cy="118" rx="76" ry="8" fill="url(#b104ve-sh)"/>
<path d="M38 70 Q60 44 100 50 Q150 46 164 72 Q170 96 140 104 Q100 112 62 104 Q30 96 38 70 Z" fill="url(#b104ve-c)" stroke="#0a0c10" stroke-width="1.4"/>
<g clip-path="url(#b104ve-k)">${weave}<path d="M40 66 Q100 56 162 70 M38 80 Q100 70 166 84 M44 94 Q100 86 156 98" fill="none" stroke="#3e3424" stroke-width="2.4" opacity=".55"/>
<path d="M40 66 Q100 56 162 70" fill="none" stroke="#f0e4cc" stroke-width="1" opacity=".5" transform="translate(0 -2)"/></g>
<path d="M140 104 Q160 112 170 128 Q176 136 168 140 L160 130 Q150 118 130 108 Z" fill="url(#b104ve-c)" stroke="#0a0c10" stroke-width="1.2"/>
<path d="M162 132 L158 140 M166 130 L166 140 M170 132 L172 140" stroke="#8a7656" stroke-width="1"/>
<path d="M40 68 Q58 48 98 52" fill="none" stroke="#eef4ff" stroke-width="1.1" opacity=".5"/>
<ellipse cx="84" cy="62" rx="56" ry="28" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c4_veil'] = [200, 150]; }
}
