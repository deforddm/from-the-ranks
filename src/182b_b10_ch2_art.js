/* ============ Book Ten, Chapter 2 art: The Parting — the brigades' train on the rise, the glass below, the first night south, the road ============ */
/* Book Nine's road ground and train (163b's land and horses, 162b's wagons, barrels and tents, 164b's fire), drier: a low rise of scrub and
   grit above the glass's edge. By day a pale, heat-flattened sky; the glass a band of white shine on the north-east horizon with the
   foreigners lying up at its edge as a dark smear. At dusk the sky shut like a door in the west, the glass catching the last light, and a
   long dark line walking out onto it without a lamp (on 'adjunct', the other way: from the glass, the brigades going over the rise against
   the last light). By night Book Ten's own sky, blue-black, starlight from the upper left.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     tirren       (replaces 180's simple sprite) the Letherii's recruit: a young farrier in a scarred leather apron over a quilted shirt; a
                  dust-scarf over her hair, a long braid over the left shoulder; a rasp on a thong at the belt, the farrier's hammer in
                  the right hand (180b's bust kit)
   Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b10_train    the train on the rise by day (180's caption): wagons, water barrels, the horse-lines with heads down; in Chapter 2
                  the glass's shine on the horizon and the foreigners lying up at its edge
     b10_south    the column on the road south by day (180's caption): dry scrub, the road, small files and wagons, the Grey Helms'
                  straight dust far ahead; the big ones along the east flank once they have joined (far, small, never close)
     b10_c2_dusk  the rise at dusk: the last light, the glass pale, the long dark line going out onto it; on 'adjunct' the companies
                  going over the rise against the light
     b10_c2_halt  the first night's halt south: wagons in a rough ring, the horse-lines, a farrier's lamp, the brigades' fires going away
                  south, and to the north, no light at all
   Ground (TILEX): b10_c2_ground, on Book Nine's road ground (163b's b9_c3_road), with 'W' a water wagon with a lamp at its tailboard,
   'B' water barrels on a flat wagon, 'c' Orla's water-cart, 'X' the rise's edge (the track's edge), 'k' a dead horse under a blanket;
   on the 'adjunct' halt the open ground is the glass. Battle 't' is a water barrel on its side.
   The chapter's gear in the series' 200×150 item style on Book Ten's ground: night glass, blue-black (#2a3a52 → #070a10), a cold
   starlight rim from the upper left. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Tirren: twenty-one, light; a scarred leather farrier's apron over a quilted shirt, a dust-scarf over the hair, the braid over the left
     shoulder, a rasp on a thong at the belt, the hammer in the right hand */
  tirren(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, .98);
    h.legs('#2e2218'); ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-4.6, 9.6, 3.6, 3.2); ctx.fillRect(1, 9.6, 3.6, 3.2); // boots
    poly(ctx, [[-6,-6.2],[6,-6.2],[6.4,6],[-6.4,6]], h.armor('#8a8068', '#2a261c')); // the quilted shirt
    ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let y = -4.4; y < 5; y += 2.2) ctx.fillRect(-6, y, 12, .5); // its rows
    poly(ctx, [[-4.4,-3.6],[4.4,-3.6],[5.6,10.4],[-5.6,10.4]], h.armor('#7a5634', '#24180e')); // the leather apron, long
    ctx.fillStyle = 'rgba(30,18,10,.55)'; [[-2.4, 2], [1.6, 4.4], [-.6, 7.2]].forEach(([a, b]) => ctx.fillRect(a, b, 1.6, .5)); // hot-iron scars
    B2F.line(ctx, '#3a2818', .8, [[-4.4, -3.6], [-2, -6.4]]); B2F.line(ctx, '#3a2818', .8, [[4.4, -3.6], [2, -6.4]]); // the apron's neck-strap
    ctx.fillStyle = '#2a1c10'; ctx.fillRect(-6.2, 2.6, 12.4, 1.2); // the belt
    B2F.line(ctx, '#4a3624', .7, [[-5.6, 3.4], [-6.6, 7]]); ctx.fillStyle = '#8a8a86'; ctx.fillRect(-7.4, 6.8, 1.6, 4); // the rasp on its thong
    ctx.fillStyle = 'rgba(200,214,240,.14)'; ctx.fillRect(-6.2, -5.8, 1.1, 11); // the cold light on the lit edge
    B2F.line(ctx, '#5a4028', 1.2, [[6.4, -1], [8.6, 6.4]]); ctx.fillStyle = '#6e6e6c'; ctx.fillRect(7, 5.4, 3.6, 2.2); // the hammer, held
    h.head('#c49a76', 4.2, -11.4); h.look('rgba(20,12,10,.85)', -11.6);
    ctx.fillStyle = '#8a6a4a'; ctx.beginPath(); ctx.arc(0, -12.8, 4.7, Math.PI*1.02, Math.PI*1.98); ctx.fill(); ctx.fillRect(-4.8, -13, 9.6, 1.6); // the dust-scarf
    ctx.fillStyle = '#5a3e26'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(-3.8 - i*.2, -7.4 + i*2.2, 1, 1.3, .2, 0, 7); ctx.fill(); } // the braid, over the left shoulder
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* Book Ten's night sky (181b's), here without the camp's ground: blue-black, the band of stars, starlight from the upper left */
function b102aNight(x, W, H, hz){ x.fillStyle = vgrad(x, 0, hz, [[0,'#05070f'],[.6,'#0d1426'],[1,'#1c2a40']]); x.fillRect(0, 0, W, hz + 2);
  x.save(); x.translate(W*.55, hz*.4); x.rotate(-.24); x.fillStyle = 'rgba(200,212,240,.05)'; x.beginPath(); x.ellipse(0, 0, W*.7, hz*.12, 0, 0, 7); x.fill(); x.restore();
  for (let i = 0; i < 150; i++) { const k = hash(i, 10201); x.fillStyle = `rgba(222,230,250,${(.15 + k*.6).toFixed(2)})`; const r = .5 + Math.pow(hash(i, 10202), 3)*1.4; x.fillRect(hash(i, 10203)*W, Math.pow(hash(i, 10204), 1.2)*hz*.96, r, r); }
  glow(x, 0, 0, W*.6, '#9ab0d0', .08); }
/* the glass seen from the rise: a band of flat shine from x0 to x1 on the horizon, narrowing to it */
function b102aGlassBand(x, W, H, hz, x0, when){ const c = when === 'eve' ? [[0,'#e8c8a0'],[1,'#8a7a70']] : [[0,'#f4f0e4'],[1,'#c8c4b4']];
  x.fillStyle = vgrad(x, hz - 1, hz + H*.1, c); x.beginPath(); x.moveTo(W*x0, hz); x.lineTo(W, hz); x.lineTo(W, hz + H*.12); x.lineTo(W*(x0 + .1), hz + H*.06); x.closePath(); x.fill();
  if (when !== 'eve') { glow(x, W*.84, hz + H*.02, W*.3, '#ffffff', .14); for (let i = 0; i < 20; i++) { x.fillStyle = 'rgba(255,255,255,.5)'; x.fillRect(W*(x0 + .05 + hash(i, 10211)*(.9 - x0)), hz + H*(.004 + hash(i, 10212)*.05), 1.4, .7); } } }
/* the foreigners lying up at the glass's edge: a long dark smear with wagons in it and a few horsemen apart */
function b102aLyingUp(x, W, H, hz, x0){ x.fillStyle = 'rgba(40,34,28,.6)'; for (let i = 0; i < 90; i++) x.fillRect(W*(x0 + i*.0042), hz + H*(.008 + hash(i, 10221)*.012), W*.003, H*.005);
  for (let i = 0; i < 7; i++) { x.fillStyle = '#4a4034'; x.fillRect(W*(x0 + .04 + i*.05), hz + H*.004, W*.012, H*.008); } // wagons
  for (let i = 0; i < 5; i++) { x.fillStyle = '#2e2620'; x.fillRect(W*(x0 - .06 + i*.008), hz + H*(.012 + (i % 2)*.004), W*.005, H*.006); } } // the horsemen apart
/* a big one, far: upright and leaning forward, a long head, a long tail held out, grey-green (never close) */
function b102aBigOne(x, cx, cy, s, ph){ const c = '#4e5a4a', st = Math.sin(ph)*1.2;
  x.fillStyle = c; x.beginPath(); x.ellipse(cx, cy - 13*s, 3*s, 6*s, .55, 0, 7); x.fill(); // the body, leaning
  x.beginPath(); x.moveTo(cx - 2*s, cy - 10*s); x.lineTo(cx - 12*s, cy - 9*s); x.lineTo(cx - 2*s, cy - 13*s); x.closePath(); x.fill(); // the tail, held out
  x.beginPath(); x.ellipse(cx + 5*s, cy - 19*s, 3.4*s, 1.3*s, .2, 0, 7); x.fill(); // the long head
  B2F.line(x, c, 1.6*s, [[cx, cy - 9*s], [cx - 1*s + st*s, cy]]); B2F.line(x, c, 1.6*s, [[cx + 1*s, cy - 9*s], [cx + 2*s - st*s, cy]]); // the legs, a long stride
  x.fillStyle = 'rgba(200,214,240,.12)'; x.fillRect(cx - 2*s, cy - 18*s, 1*s, 8*s); }
/* a horse picket, side on: the line and the horses on it, heads down */
function b102aPicket(x, x0, x1, cy, s, N){ x.strokeStyle = N ? 'rgba(150,130,100,.4)' : 'rgba(110,86,56,.8)'; x.lineWidth = Math.max(1, s*.5); x.beginPath(); x.moveTo(x0, cy - 12*s); x.lineTo(x1, cy - 12*s); x.stroke();
  for (let px = x0 + 8*s, i = 0; px < x1 - 6*s; px += 18*s, i++) b93aHorse(x, px, cy, s, N ? '#14100c' : ['#6a4a2e', '#3a2a1a', '#8a6a4a', '#5a4a3a'][i % 4], i % 2 ? 1 : -1); }

/* ---------------- the backdrops ---------------- */
/* the train on the rise by day (180's caption): wagons, barrels, the horse-lines; in Chapter 2 the glass on the horizon and the foreigners */
SCENEX.b10_train = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, glass = !!(S && S.book === 'tcg' && S.chapter === 2);
  ctx.drawImage(sceneLayer('b102:train:' + (glass ? 1 : 0), W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false);
    if (glass) { b102aGlassBand(x, W, H, hz, .5, 'day'); b102aLyingUp(x, W, H, hz, .52); }
    x.fillStyle = 'rgba(150,130,96,.35)'; x.beginPath(); x.moveTo(0, hz + H*.12); x.quadraticCurveTo(W*.5, hz + H*.06, W, hz + H*.14); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill(); // the rise
    b102aPicket(x, W*.02, W*.36, hz + H*.24, H/230, false);
    b92aWagon(x, W*.5, hz + H*.22, H/200, 'day', false); b92aWagon(x, W*.72, hz + H*.24, H/180, 'day', false);
    b92aBarrels(x, W*.62, H*.76, H/150, 'day'); b92aBarrels(x, W*.86, H*.8, H/140, 'day');
    for (let i = 0; i < 3; i++) b92aTent(x, W*(.1 + i*.14), hz + H*.36, H/260, 'day'); }), 0, 0, W, H);
  drawFigure(ctx, 'b5_c1_clerk', W*.58, H*.82, 1.05, t, {dir:-1, phase:1}); // Yelt at the barrels
  for (let i = 0; i < 12; i++) { const q = ((t/14000*mo + hash(i, 10231)) % 1); ctx.fillStyle = `rgba(230,214,180,${(.2*(1 - q)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 10232)*.8) + q*W*.04, H*(.5 + hash(i, 10233)*.4) - q*H*.03, 1.2, 1.2); } // dust in the heat
  ctx.fillStyle = 'rgba(240,226,190,.06)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .48, .5); };

/* the column on the road south by day (180's caption): the road, files and wagons, the Grey Helms' dust far ahead; the big ones once joined */
SCENEX.b10_south = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, big = !!(S && S.book === 'tcg' && (f.b10_c2_joined || (S.chapter || 0) > 2));
  ctx.drawImage(sceneLayer('b102:south', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false); b93aRoad(x, W, H, hz, 'day', W*.46);
    x.fillStyle = 'rgba(214,196,160,.5)'; x.fillRect(W*.44, hz - H*.05, W*.04, H*.05); glow(x, W*.46, hz - H*.03, W*.06, '#e8dcc0', .3); // the Grey Helms' dust, very straight
    x.fillStyle = 'rgba(200,180,140,.3)'; x.beginPath(); x.ellipse(W*.48, hz - H*.01, W*.08, H*.02, 0, 0, 7); x.fill(); // the Bolkando's, behind it
    for (let i = 0; i < 40; i++) { const u = hash(i, 10241), k = Math.pow(u, 1.6), px = W*(.46 + (i % 2 ? 1 : -1)*k*.06), py = hz + (H - hz)*k*.5, s = .4 + k*1.2; x.fillStyle = '#3a2e22'; x.fillRect(px, py - 4*s, 1.4*s, 4*s); } // files on the road
    for (let i = 0; i < 30; i++) { const px = hash(i, 10242)*W, py = hz + H*(.04 + hash(i, 10243)*.4); x.fillStyle = 'rgba(90,96,60,.45)'; x.beginPath(); x.ellipse(px, py, 4 + hash(i, 10244)*8, 2 + hash(i, 10245)*3, 0, 0, 7); x.fill(); } // scrub
    b92aWagon(x, W*.3, H*.7, H/170, 'day', false); b93aHorse(x, W*.18, H*.78, H/180, '#6a4a2e', 1); b93aHorse(x, W*.12, H*.8, H/180, '#3a2a1a', 1); }), 0, 0, W, H);
  if (big) { const hz = H*.44; for (let i = 0; i < 7; i++) { const k = i/6, px = W*(.62 + k*.3), py = hz + H*(.04 + k*.12), s = H/(520 - k*240); b102aBigOne(ctx, px, py, s, t/220*mo + i*1.3); } // the big ones along the flank, far
    for (let i = 0; i < 2; i++) { ctx.fillStyle = '#2e2620'; ctx.fillRect(W*(.68 + i*.05), hz + H*.06, H*.012, H*.012); } } // two riders among them, small
  for (let i = 0; i < 10; i++) { const q = ((t/12000*mo + hash(i, 10246)) % 1); ctx.fillStyle = `rgba(230,214,180,${(.18*(1 - q)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 10247)*.8) + q*W*.04, H*(.5 + hash(i, 10248)*.4) - q*H*.03, 1.2, 1.2); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* the rise at dusk: the glass catching the last light and the long line going out onto it; on 'adjunct' the companies going over the rise */
SCENEX.b10_c2_dusk = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, adj = !!(S && S.f && S.f.b10_lRoad === 'adjunct'), f = (S && S.f) || {};
  const gone = adj ? false : !!(f.b10_c2_watchDone || f.b10_c2_countDone);
  ctx.drawImage(sceneLayer('b102:dusk:' + (adj ? 1 : 0), W, H, (x, W, H) => { const hz = H*.46;
    x.fillStyle = vgrad(x, 0, hz, [[0,'#141828'],[.5,'#4a3e48'],[.85,'#b07a58'],[1,'#d89a62']]); x.fillRect(0, 0, W, hz + 2); glow(x, 0, hz, W*.55, '#e8945a', .34);
    for (let i = 0; i < 26; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 10251)*.35).toFixed(2)})`; x.fillRect(hash(i, 10252)*W, Math.pow(hash(i, 10253), 1.5)*hz*.5, 1, 1); }
    if (adj) { x.fillStyle = vgrad(x, hz, H, [[0,'#c8b8a8'],[.3,'#7a7480'],[1,'#2a2c36']]); x.fillRect(0, hz, W, H - hz); // the glass underfoot, catching the light
      x.fillStyle = '#2a221c'; x.beginPath(); x.moveTo(0, hz + H*.02); x.quadraticCurveTo(W*.35, hz - H*.07, W*.7, hz + H*.01); x.lineTo(W, hz + H*.02); x.lineTo(W, hz + H*.04); x.lineTo(0, hz + H*.05); x.closePath(); x.fill(); // the rise, dark against the last light
      for (let i = 0; i < 4; i++) { x.fillStyle = `rgba(200,170,130,${(.22 - i*.04).toFixed(2)})`; x.beginPath(); x.ellipse(W*(.18 - i*.05), hz - H*(.02 + i*.012), W*.06, H*.016, 0, 0, 7); x.fill(); } } // the brigades' dust going south
    else { x.fillStyle = vgrad(x, hz, H, [[0,'#4a3c30'],[1,'#141010']]); x.fillRect(0, hz, W, H - hz);
      x.fillStyle = vgrad(x, hz - 1, hz + H*.14, [[0,'#e8c8a0'],[1,'#8a7068']]); x.beginPath(); x.moveTo(W*.34, hz); x.lineTo(W, hz); x.lineTo(W, hz + H*.2); x.lineTo(W*.5, hz + H*.1); x.closePath(); x.fill(); // the glass, catching the last light
      x.fillStyle = '#1e1814'; x.beginPath(); x.moveTo(0, H*.62); x.quadraticCurveTo(W*.4, H*.56, W*.62, H*.66); x.lineTo(W*.62, H); x.lineTo(0, H); x.closePath(); x.fill(); // the rise, near
      b92aWagon(x, W*.16, H*.66, H/170, 'eve', false); b92aWagon(x, W*.4, H*.64, H/190, 'eve', true); b92aBarrels(x, W*.28, H*.72, H/160, 'eve'); } }), 0, 0, W, H);
  const hz = H*.46;
  if (adj) { for (let i = 0; i < 46; i++) { const k = i/45, px = W*(.32 + k*.36) - (mo ? (t/4000 % 1)*W*.008 : 0), py = hz - H*.05 + Math.abs(k - .5)*H*.06 + (k > .5 ? H*.012 : 0); if (px > W*.7) continue; ctx.fillStyle = '#16120e'; ctx.fillRect(px, py - H*.012, W*.0035, H*.012); } // a company going over the rise
    const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.6 + i*Math.min(.05, .28/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:-1})); }
  else { if (!gone) for (let i = 0; i < 70; i++) { const k = i/69, d = ((k + (mo ? t/60000 : 0)) % 1), px = W*(.66 + d*.3), py = hz + H*(.14 - d*.13), s = 1 - d*.8; ctx.fillStyle = 'rgba(16,12,10,.9)'; ctx.fillRect(px, py - 6*s, Math.max(1, 2*s), 6*s); } // the long line going out onto the glass, no lamp
    else for (let i = 0; i < 6; i++) { ctx.fillStyle = 'rgba(60,46,36,.6)'; ctx.fillRect(W*(.66 + i*.05), hz + H*(.13 - i*.02), W*.03, 1); } // wheel-ruts going over the line onto the pale
    const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1})); }
  vign(ctx, W, H, .6, .5); };

/* the first night's halt south: wagons in a rough ring, the horse-lines, a farrier's lamp, the brigades' fires going away south */
SCENEX.b10_c2_halt = (cv, t) => { const {ctx, W, H} = sceneFit(cv), fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b102:halt', W, H, (x, W, H) => { const hz = H*.44; b102aNight(x, W, H, hz);
    x.fillStyle = vgrad(x, hz, H, [[0,'#1a1c20'],[1,'#08090c']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 60; i++) { const k = Math.pow(hash(i, 10261), 1.4); x.fillStyle = `rgba(255,${150 + Math.round(hash(i, 10262)*60)},90,${(.3 + hash(i, 10263)*.5).toFixed(2)})`; x.fillRect(W*(.55 + k*.42), hz + H*(.004 + (1 - k)*.03), 1.4, 1.2); } // the brigades' fires, south
    glow(x, W*.78, hz + H*.02, W*.3, '#ff9a50', .06);
    b92aWagon(x, W*.2, hz + H*.18, H/220, 'night', false); b92aWagon(x, W*.5, hz + H*.15, H/240, 'night', false); b92aWagon(x, W*.86, hz + H*.22, H/200, 'night', false);
    b102aPicket(x, W*.04, W*.4, hz + H*.34, H/220, true);
    ell(x, W*.44, hz + H*.36, H*.05, H*.016, '#0c0a08'); }), 0, 0, W, H); // the dead horse at the picket's end, dark
  const hz = H*.44, lx = W*.42, ly = hz + H*.26; ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.14, '#ffb060', .24*fl); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,210,140,.95)'; ctx.fillRect(lx - 1.2, ly - 1.6, 2.4, 3.2); // the farrier's lamp
  b94aFire(ctx, W*.62, H*.86, fl, 1.1);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* ---------------- ground ---------------- */
/* the rise's ground: Book Nine's road ground (163b) with the water wagon, the barrel wagons, Orla's cart, the rise's edge and a dead horse
   drawn on top; on the 'adjunct' halt the open ground is the glass */
function b102aGlassT(ctx, x, y, T, N){ const px = x*T, py = y*T; ctx.fillStyle = vgrad(ctx, py, py + T, [[0,'#141c2a'],[1,'#0a0e16']]); ctx.fillRect(px, py, T, T);
  for (let i = 0; i < 3; i++) { if (hash(x, y, 10271 + i) > .55) continue; ctx.fillStyle = `rgba(210,222,250,${(.25 + hash(x, y, 10274 + i)*.5).toFixed(2)})`; ctx.fillRect(px + T*hash(x, y, 10277 + i), py + T*hash(x, y, 10280 + i), 1, 1); } // stars thrown back up
  ctx.fillStyle = 'rgba(160,180,210,.05)'; ctx.fillRect(px, py, T, T*.05); }
TILEX.b10_c2_ground = (ctx, ch, x, y, T, dark) => { const base = TILEX.b9_c3_road; if (!base) return; const N = !!dark;
  const glass = !!(S && S.book === 'tcg' && S.area === 'b10_c2_halt' && S.f && S.f.b10_lRoad === 'adjunct');
  if (glass && (ch === '.' || ch === '>')) return b2Clip(ctx, x, y, T, () => { b102aGlassT(ctx, x, y, T, N); if (ch === '>') { ctx.fillStyle = 'rgba(200,214,240,.1)'; ctx.fillRect(x*T + T*.2, y*T, T*.6, T); } });
  if (ch === 'X') return base(ctx, '>', x, y, T, dark);
  if (!'WBck'.includes(ch)) { if (!glass) return base(ctx, ch, x, y, T, dark);
    return b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T; b102aGlassT(ctx, x, y, T, N);
      if (ch === '#') { ctx.fillStyle = 'rgba(4,6,10,.55)'; ctx.fillRect(px, py, T, T); return; } // the dark beyond the halt
      if (ch === 'w') return b55Wagon(ctx, px, py, T, N);
      if (ch === 'F') return b55Fire(ctx, px, py, T, N);
      if (ch === 'h') { ctx.strokeStyle = 'rgba(150,130,100,.5)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.lineTo(px + T, py + T*.3); ctx.stroke(); b93aHorse(ctx, px + T*.46, py + T*.88, T/30, '#16120e', hash(x, y, 10285) > .5 ? 1 : -1); } }); }
  if (glass) b2Clip(ctx, x, y, T, () => b102aGlassT(ctx, x, y, T, N)); else base(ctx, '.', x, y, T, dark);
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === 'W') { b55Wagon(ctx, px, py, T, N); [[.3], [.56]].forEach(([k]) => { ell(ctx, px + T*k, py + T*.34, T*.12, T*.1, N ? '#2a2016' : '#7a5a38'); }); // a water wagon, its barrels
      ctx.fillStyle = 'rgba(255,196,112,.95)'; ctx.fillRect(px + T*.84, py + T*.3, T*.08, T*.1); glow(ctx, px + T*.88, py + T*.34, T*.9, '#ffb060', N ? .35 : .14); return; } // the lamp at its tailboard
    if (ch === 'B') { ell(ctx, px + T*.5, py + T*.9, T*.46, T*.09, 'rgba(0,0,0,.45)'); ctx.fillStyle = N ? '#1a120c' : '#4a3420'; ctx.fillRect(px + T*.04, py + T*.72, T*.92, T*.1);
      [[.24, .58], [.5, .58], [.76, .58], [.37, .36], [.63, .36]].forEach(([a, b]) => { ell(ctx, px + T*a, py + T*b, T*.13, T*.12, N ? '#2a2016' : '#7a5a38'); ctx.fillStyle = N ? '#14100c' : '#3a2a1a'; ctx.fillRect(px + T*(a - .13), py + T*(b - .02), T*.26, Math.max(1, T*.025)); });
      ctx.fillStyle = N ? 'rgba(90,80,64,.4)' : 'rgba(170,150,110,.55)'; ctx.fillRect(px + T*.1, py + T*.22, T*.8, T*.06); return; } // barrels lashed on a flat wagon, wet sacking over
    if (ch === 'c') return b55Cart(ctx, px, py, T, N); // Orla's water-cart
    if (ch === 'k') { ell(ctx, px + T*.5, py + T*.84, T*.46, T*.1, 'rgba(0,0,0,.45)'); ctx.fillStyle = N ? '#14100c' : '#5a4028'; ctx.beginPath(); ctx.ellipse(px + T*.5, py + T*.66, T*.36, T*.16, 0, 0, 7); ctx.fill(); // a dead horse on its side
      B2F.line(ctx, ctx.fillStyle, Math.max(1, T*.05), [[px + T*.3, py + T*.74], [px + T*.16, py + T*.9]]); B2F.line(ctx, ctx.fillStyle, Math.max(1, T*.05), [[px + T*.62, py + T*.76], [px + T*.74, py + T*.92]]);
      if (S && S.f && S.f.b10_c2_dogsDone) { ctx.fillStyle = N ? '#2a2a30' : '#7a6e5a'; ctx.fillRect(px + T*.72, py + T*.5, T*.2, T*.16); } return; } }); }; // a blanket over its head, after
/* low cover ('t') on this chapter's ground: a water barrel on its side */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b10_c2_ground') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.88, T*.44, T*.1, 'rgba(0,0,0,.5)');
      ctx.fillStyle = N ? '#2a2016' : '#7a5a38'; ctx.beginPath(); ctx.ellipse(px + T*.5, py + T*.6, T*.38, T*.24, 0, 0, 7); ctx.fill();
      ctx.fillStyle = N ? '#14100c' : '#3a2a1a'; [.32, .68].forEach(k => ctx.fillRect(px + T*k - T*.02, py + T*.38, T*.04, T*.44));
      ell(ctx, px + T*.16, py + T*.6, T*.06, T*.2, N ? '#3a2e20' : '#9a7a50'); ctx.fillStyle = N ? 'rgba(160,180,210,.12)' : 'rgba(255,240,210,.22)'; ctx.fillRect(px + T*.2, py + T*.4, T*.5, T*.04); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Ten's ground: night glass, blue-black, a cold starlight rim from the upper left) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".38" cy=".36" r=".85"><stop offset="0" stop-color="#2a3a52"/><stop offset=".6" stop-color="#141c2a"/><stop offset="1" stop-color="#070a10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a train-guard's spear: a long ash shaft across the frame, the leaf head with an iron crossbar below it, a leather grip, the butt-spike */
  ART['item/b10_c2_spear'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A train-guard's spear">${bg('b102sp')}
<linearGradient id="b102sp-h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a88a5e"/><stop offset="1" stop-color="#4a3420"/></linearGradient>
<linearGradient id="b102sp-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8e2f0"/><stop offset=".5" stop-color="#6a7280"/><stop offset="1" stop-color="#1c2028"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b102sp-bg)"/><path d="M0 122 L200 114 L200 150 L0 150 Z" fill="#1a1c22"/><path d="M0 122 L200 114" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/><ellipse cx="100" cy="116" rx="86" ry="7" fill="url(#b102sp-sh)"/>
<g transform="rotate(-20 100 76)"><rect x="8" y="73" width="150" height="6" rx="3" fill="url(#b102sp-h)" stroke="#0a0c10" stroke-width="1"/><path d="M6 72 L-4 76 L6 80 Z" fill="#5a5e66" stroke="#0a0c10"/>
<rect x="64" y="71" width="18" height="10" rx="2" fill="#3a2a1a" stroke="#0a0c10"/><path d="M66 72 L66 80 M70 72 L70 80 M74 72 L74 80 M78 72 L78 80" stroke="#5a4430" stroke-width=".8"/>
<rect x="150" y="62" width="4" height="28" rx="1" fill="#4a4e58" stroke="#0a0c10"/><path d="M154 70 L164 70 Q190 76 164 82 L154 82 Z" fill="url(#b102sp-b)" stroke="#070a10" stroke-width="1.2"/>
<path d="M156 71 L168 71 Q186 76 168 76" fill="none" stroke="#eef4ff" stroke-width="1" opacity=".75"/><path d="M151 63 L151 89" stroke="#dce6f8" stroke-width=".8" opacity=".5"/><path d="M10 74 L148 74" stroke="#dce6f8" stroke-width=".7" opacity=".4"/></g>
<ellipse cx="96" cy="66" rx="70" ry="28" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c2_spear'] = [200, 150];
  /* a quilted dust-coat: a long coat laid out, stitched in rows, padded at the shoulders, dust in the seams */
  ART['item/b10_c2_coat'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A quilted dust-coat">${bg('b102co')}
<linearGradient id="b102co-c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8a888"/><stop offset=".5" stop-color="#8a7a5e"/><stop offset="1" stop-color="#4a4030"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b102co-bg)"/><ellipse cx="100" cy="132" rx="70" ry="7" fill="url(#b102co-sh)"/>
<path d="M78 16 L122 16 L150 30 L170 76 L156 82 L142 56 L146 132 L54 132 L58 56 L44 82 L30 76 L50 30 Z" fill="url(#b102co-c)" stroke="#0a0c10" stroke-width="1.6"/>
<path d="M78 16 Q100 30 122 16" fill="none" stroke="#3a3020" stroke-width="3"/><path d="M100 26 L100 132" stroke="#3a3020" stroke-width="1.6"/>
<path d="M60 48 L140 48 M60 62 L140 62 M58 76 L142 76 M58 90 L142 90 M56 104 L144 104 M56 118 L144 118" stroke="#5a4c36" stroke-width="1" stroke-dasharray="3 2"/>
<path d="M50 30 L78 18 L82 34 L56 44 Z M150 30 L122 18 L118 34 L144 44 Z" fill="#a0906e" stroke="#2a2418" stroke-width="1"/>
<path d="M51 32 L44 80" stroke="#dce6f8" stroke-width="1.1" opacity=".45"/><path d="M60 50 L56 130" stroke="#dce6f8" stroke-width="1" opacity=".35"/><path d="M80 17 L120 17" stroke="#dce6f8" stroke-width=".8" opacity=".35"/>
<ellipse cx="80" cy="60" rx="54" ry="40" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c2_coat'] = [200, 150];
  /* a water-tally: a hank of knotted cord in a loose coil, a knot for every barrel and a bead for every ten */
  { let kn = ''; for (let i = 0; i < 26; i++) { const a = i/26*Math.PI*1.7 + .3, r = 38 - i*.6, cx = 100 + Math.cos(a)*r*1.4, cy = 74 + Math.sin(a)*r*.7; kn += i % 10 === 9 ? `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.2" fill="#6a8aa8" stroke="#0a0c10" stroke-width=".8"/><circle cx="${(cx - 1.2).toFixed(1)}" cy="${(cy - 1.4).toFixed(1)}" r="1.2" fill="#dce6f8" opacity=".7"/>` : `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="2.6" fill="#a8946c" stroke="#2a2418" stroke-width=".6"/>`; }
  let path = ''; for (let i = 0; i <= 60; i++) { const a = i/60*Math.PI*1.7 + .3, r = 38 - i*.26, cx = 100 + Math.cos(a)*r*1.4, cy = 74 + Math.sin(a)*r*.7; path += (i ? ' L' : 'M') + cx.toFixed(1) + ' ' + cy.toFixed(1); }
  ART['item/b10_c2_tally'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A water-tally">${bg('b102ta')}</defs>
<rect width="200" height="150" fill="url(#b102ta-bg)"/><ellipse cx="100" cy="112" rx="72" ry="8" fill="url(#b102ta-sh)"/>
<path d="${path}" fill="none" stroke="#8a7656" stroke-width="2.6" stroke-linecap="round"/><path d="${path}" fill="none" stroke="#dce6f8" stroke-width=".7" opacity=".3" transform="translate(-.8 -.8)"/>${kn}
<path d="M42 96 Q30 112 40 124" fill="none" stroke="#8a7656" stroke-width="2.4" stroke-linecap="round"/>
<ellipse cx="86" cy="62" rx="56" ry="30" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c2_tally'] = [200, 150]; }
}
