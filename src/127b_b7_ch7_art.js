/* ============ Book Seven, Chapter 7 art: Letheras — the walls and the gate, the square inside it, the city's last day, three weeks on ============ */
/* Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still), in 120b's night palette for the road (blue-black
   sky, lamp-gold, the smoke lit from under) and Book Five's Letheras by day for the city (blue-grey stone, canal-green, slate roofs):
     b7_c7_gate       the walls of Letheras and a great gatehouse with two towers; night with refugees on the road and the column's
                      shapes in the ditches (phase 1); first light, the towers black against a white east (phase 2); after the fight,
                      the wicket broken and a thin smoke in the arch, and light through it
     b7_c7_square     inside the gate: cobbles, the inner arch behind with the gatehouse over it, tall narrow shuttered houses, a cart,
                      the garrison sitting against the wall far off, morning
     b7_city_burning  (120's) a Letheras street on the city's last day: tall narrow houses either side going away, towers beyond, smoke
                      columns, the crowd at the street's far end, a brazier at the corner; once the ground has moved, a white light under
                      one quarter to the north; while the dragon is being looked at, a white winged shape small over the towers
     b7_c7_after      three weeks on: a canal street in the morning, a stone footbridge, washing on lines, the towers clean of smoke,
                      a few people on the bridge
   Nothing burns close; no bodies, ever. The white light is a glow behind roofs; the dragon a pale shape at a great distance.
   The chapter's gear in the series' 200×150 item style (089g), on Book Six's smoke-umber ground (the Third's items). */

/* ---------------- shared drawing ---------------- */
/* the towers of Letheras along a horizon: tall, narrow, some with domes, some with spires; col fills them */
function b77aTowers(x, W, base, H, col, seed, lit){ x.fillStyle = col;
  for (let i = 0; i < 14; i++) { const tx = W*(.03 + i*.072 + (hash(i, seed) - .5)*.03), tw = W*(.018 + hash(i, seed + 1)*.022), th = H*(.1 + hash(i, seed + 2)*.22);
    x.fillRect(tx - tw/2, base - th, tw, th);
    const top = hash(i, seed + 3); if (top > .66) { x.beginPath(); x.ellipse(tx, base - th, tw*.7, tw*.6, 0, Math.PI, 0); x.fill(); }
    else if (top > .33) poly(x, [[tx - tw*.55, base - th], [tx, base - th - H*.06], [tx + tw*.55, base - th]], col);
    if (lit && hash(i, seed + 4) > .5) { x.fillStyle = 'rgba(255,190,110,.55)'; x.fillRect(tx - 1, base - th*.7, 2, 2); x.fillStyle = col; } }
  x.fillRect(0, base - H*.05, W, H*.05 + 2); }
/* a column of smoke going up and drifting, lit from under */
function b77aSmoke(ctx, sx, sy, h, W, t, mo, col, a){ for (let i = 0; i < 9; i++) { const k = i/9, dx = Math.sin(k*3 + (mo ? t/2400 : 0) + sx)*W*.03 + k*W*.05, r = W*(.012 + k*.04);
    ctx.fillStyle = `rgba(${col},${(a*(1 - k*.8)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(sx + dx, sy - k*h, r, r*.7, 0, 0, 7); ctx.fill(); } }
/* a tall narrow Letheras house front: stone, a slate roof, shuttered windows in rows */
function b77aHouse(x, bx, by, w, h, wall, roof, shut, seed){ x.fillStyle = wall; x.fillRect(bx, by - h, w, h);
  poly(x, [[bx - w*.04, by - h], [bx + w*.5, by - h - w*.45], [bx + w*1.04, by - h]], roof);
  const rows = Math.max(2, Math.round(h/(w*.55))); for (let r = 0; r < rows; r++) for (let c = 0; c < 2; c++) { const wx = bx + w*(.18 + c*.42), wy = by - h + h*(.1 + r*.82/rows);
    x.fillStyle = shut; x.fillRect(wx, wy, w*.22, h*.5/rows); if (hash(r*3 + c, seed) > .82) { x.fillStyle = 'rgba(0,0,0,.6)'; x.fillRect(wx + w*.11, wy, 1, h*.5/rows); } }
  x.fillStyle = 'rgba(0,0,0,.55)'; x.fillRect(bx + w*.38, by - h*.12, w*.24, h*.12); }
/* cobbles in perspective toward a vanishing point */
function b77aCobbles(x, W, H, y0, col, seed){ for (let i = 0; i < 160; i++) { const yy = y0 + Math.pow(hash(i, seed), 1.4)*(H - y0), d = (yy - y0)/(H - y0); ell(x, hash(i, seed + 1)*W, yy, 2 + d*7, .8 + d*2.6, col); } }
/* the phase-light of the road: 'night' (phase 1), 'dawn' (phase 2 before the gate is taken), 'after' (the gate taken) */
const b77aGateMode = () => { const f = (S && S.f) || {}; if (f.b7_c7_gateDone) return 'after'; if ((f.b7_c7_ph || 1) >= 2) return 'dawn'; return 'night'; };

/* ---------------- backdrops ---------------- */
/* the walls of Letheras and its gate: the gatehouse fills the middle with two square towers and a black arch; the walls run off either side
   with towers along them; the city's towers stand up behind with smoke between; the road comes to the gate across trampled fields */
SCENEX.b7_c7_gate = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, wb = H*.6, md = b77aGateMode(), fl = b2Fl(t);
  const night = md === 'night', stone = night ? '#14141a' : '#1c1a20', stoneL = night ? '#1c1c24' : '#2a262c';
  ctx.drawImage(sceneLayer('b77:gate:' + md, W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, wb, night ? [[0,'#05060c'],[.6,'#121420'],[1,'#2a1c1c']] : [[0,'#1a2030'],[.55,'#5a5a6a'],[.85,'#c8b8a0'],[1,'#e8dcc4']]); x.fillRect(0, 0, W, wb);
    if (night) for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 7701)*.35).toFixed(2)})`; x.fillRect(hash(i, 7702)*W, Math.pow(hash(i, 7703), 1.4)*wb*.5, 1, 1); }
    b77aTowers(x, W, wb - H*.2, H, night ? '#0a0a10' : '#2a2832', 7704, night);
    // the walls across, with towers, and the battlements
    x.fillStyle = stone; x.fillRect(0, wb - H*.2, W, H*.2);
    [.05, .2, .8, .95].forEach((k, i) => { const tx = W*k, tw = W*.06, th = H*.3; x.fillStyle = stoneL; x.fillRect(tx - tw/2, wb - th, tw, th); for (let m = 0; m < 3; m++) x.fillRect(tx - tw/2 + m*tw*.38, wb - th - H*.015, tw*.22, H*.015); });
    x.fillStyle = stone; for (let m = 0; m < 50; m++) x.fillRect(m/50*W, wb - H*.215, W/100, H*.016);
    x.strokeStyle = 'rgba(0,0,0,.3)'; x.lineWidth = .6; for (let r = 1; r < 6; r++) { x.beginPath(); x.moveTo(0, wb - H*.2 + r*H*.033); x.lineTo(W, wb - H*.2 + r*H*.033); x.stroke(); }
    // the gatehouse: two square towers and the block between them over the arch
    const gx = W*.5, gw = W*.26; x.fillStyle = stoneL; x.fillRect(gx - gw/2, wb - H*.34, gw, H*.34);
    [-1, 1].forEach(s => { const tx = gx + s*gw*.42, tw = W*.08; x.fillStyle = night ? '#1a1a22' : '#322e36'; x.fillRect(tx - tw/2, wb - H*.44, tw, H*.44); for (let m = 0; m < 3; m++) x.fillRect(tx - tw/2 + m*tw*.38, wb - H*.455, tw*.22, H*.016);
      x.fillStyle = 'rgba(0,0,0,.6)'; x.fillRect(tx - 1.5, wb - H*.38, 3, H*.04); x.fillRect(tx - 1.5, wb - H*.28, 3, H*.04); });
    // the arch and its leaves
    x.fillStyle = '#060506'; x.beginPath(); x.moveTo(gx - W*.06, wb); x.lineTo(gx - W*.06, wb - H*.13); x.quadraticCurveTo(gx, wb - H*.2, gx + W*.06, wb - H*.13); x.lineTo(gx + W*.06, wb); x.closePath(); x.fill();
    if (md !== 'after') { x.fillStyle = night ? '#1a120c' : '#2a1c12'; x.fillRect(gx - W*.055, wb - H*.13, W*.11, H*.13); x.strokeStyle = 'rgba(0,0,0,.6)'; x.lineWidth = 1; x.beginPath(); x.moveTo(gx, wb - H*.15); x.lineTo(gx, wb); x.stroke();
      for (let r = 1; r < 4; r++) { x.fillStyle = 'rgba(60,60,64,.7)'; x.fillRect(gx - W*.055, wb - H*.13 + r*H*.032, W*.11, 2); }
      x.fillStyle = '#0e0a08'; x.fillRect(gx - W*.045, wb - H*.06, W*.022, H*.06); } // the wicket
    else { x.fillStyle = 'rgba(220,200,170,.35)'; x.fillRect(gx - W*.04, wb - H*.12, W*.08, H*.12); x.fillStyle = '#1a120c'; poly(x, [[gx - W*.055, wb], [gx - W*.055, wb - H*.13], [gx - W*.035, wb - H*.12], [gx - W*.03, wb]], '#1a120c'); } // open, light through
    // the fields and the road
    x.fillStyle = vgrad(x, wb, H, night ? [[0,'#14120e'],[1,'#060605']] : [[0,'#3a3426'],[1,'#16140e']]); x.fillRect(0, wb, W, H - wb);
    x.fillStyle = night ? 'rgba(80,70,50,.45)' : 'rgba(120,104,76,.55)'; x.beginPath(); x.moveTo(gx - W*.05, wb); x.lineTo(gx + W*.05, wb); x.lineTo(gx + W*.22, H); x.lineTo(gx - W*.22, H); x.closePath(); x.fill();
    for (let i = 0; i < 50; i++) ell(x, hash(i, 7705)*W, wb + H*.04 + Math.pow(hash(i, 7706), 1.2)*(H - wb), 3 + hash(i, 7707)*8, 1, 'rgba(0,0,0,.2)'); // trampled
    [[.18, .66], [.82, .68]].forEach(([k, yk]) => { x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(W*(k - .12), H*yk, W*.24, H*.012); }); // the ditches
  }), 0, 0, W, H);
  // lamps on the walls nobody tends; the glow over the city and the smoke going up from inside
  if (md === 'night') { ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 10; i++) glow(ctx, W*(.04 + i*.1), wb - H*.22, 6, '#ffb060', .5*fl); glow(ctx, W*.3, wb - H*.32, W*.25, '#ff7030', .18*fl); glow(ctx, W*.72, wb - H*.3, W*.2, '#ff7030', .16*fl); ctx.globalCompositeOperation = 'source-over'; }
  [[.3, .42], [.66, .4], [.78, .44]].forEach(([k, yk], i) => b77aSmoke(ctx, W*k, H*yk, H*.4, W, t + i*900, mo, md === 'night' ? '50,40,40' : '70,66,66', md === 'night' ? .3 : .38));
  if (md === 'after') b77aSmoke(ctx, W*.5, wb - H*.08, H*.18, W, t, mo, '120,110,100', .3);
  // refugees on the road at night, coming out, and the column's shapes in the ditches
  if (md === 'night') { const off = mo ? (t/140) % (H*.18) : H*.06; for (let i = 0; i < 3; i++) { const py = wb + H*.06 + off + i*H*.05, px = W*(.53 + i*.025); if (py > H*.86) continue; drawFigure(ctx, 'b5_c5_refugee', px, py, .7 + i*.1, t, {still:true, dir:1}); } }
  for (let i = 0; i < 5; i++) drawFigure(ctx, 'b2soldier', W*(.1 + i*.04), H*.68 - (i % 2), .7, t, {still:true, dir:1, phase:i});
  for (let i = 0; i < 4; i++) drawFigure(ctx, 'b2soldier', W*(.76 + i*.04), H*.7 - (i % 2), .7, t, {still:true, dir:-1, phase:i + 3});
  // the Third, near, on the road
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.36 + i*Math.min(.06, .3/sq.length)), H*.93 - (i % 2)*3, 1.6, t, {phase:i, dir:1, still:md !== 'dawn'}));
  vign(ctx, W, H, md === 'night' ? .78 : .55, md === 'night' ? .55 : .35); };

/* inside the gate: the inner arch and the gatehouse behind, morning light through the arch; tall shuttered houses round a cobbled square;
   a cart; the garrison sitting against the wall far off under two marines */
SCENEX.b7_c7_square = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5;
  ctx.drawImage(sceneLayer('b77:square', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#5a6474'],[.7,'#9aa0a6'],[1,'#c8c0ae']]); x.fillRect(0, 0, W, hz);
    // the gatehouse behind, the inner arch with the road's light in it
    x.fillStyle = '#3a3840'; x.fillRect(W*.34, hz - H*.38, W*.32, H*.38); x.fillStyle = '#44424a'; [-1, 1].forEach(s => x.fillRect(W*.5 + s*W*.14 - W*.04, hz - H*.46, W*.08, H*.46));
    for (let m = 0; m < 10; m++) { x.fillStyle = '#3a3840'; x.fillRect(W*(.34 + m*.032), hz - H*.4, W*.016, H*.02); }
    x.fillStyle = '#1a1816'; x.beginPath(); x.moveTo(W*.44, hz); x.lineTo(W*.44, hz - H*.16); x.quadraticCurveTo(W*.5, hz - H*.24, W*.56, hz - H*.16); x.lineTo(W*.56, hz); x.closePath(); x.fill();
    x.fillStyle = vgrad(x, hz - H*.2, hz, [[0,'rgba(240,230,210,.2)'],[1,'rgba(240,230,210,.55)']]); x.fillRect(W*.46, hz - H*.16, W*.08, H*.16);
    // houses either side, tall and narrow, shutters shut
    [[0, .11, .36], [.11, .1, .3], [.21, .12, .34], [.67, .11, .32], [.78, .1, .38], [.88, .12, .3]].forEach(([u, w, h], i) => b77aHouse(x, W*u, hz + H*.04, W*w, H*h, ['#6a6a70', '#7a746c', '#5e6268'][i % 3], '#2e3440', '#3a3026', 7710 + i));
    // cobbles
    x.fillStyle = vgrad(x, hz, H, [[0,'#6a6660'],[1,'#3a3834']]); x.fillRect(0, hz + H*.04, W, H - hz);
    b77aCobbles(x, W, H, hz + H*.05, 'rgba(30,28,26,.22)', 7711);
    // a cart left in the square
    x.fillStyle = '#3a2a1a'; x.fillRect(W*.12, H*.7, W*.14, H*.05); x.strokeStyle = '#1a120a'; x.lineWidth = 2; x.beginPath(); x.arc(W*.15, H*.77, H*.035, 0, 7); x.stroke(); x.beginPath(); x.arc(W*.23, H*.77, H*.035, 0, 7); x.stroke();
  }), 0, 0, W, H);
  // the garrison sitting against the gatehouse wall, far off, and two marines over them
  for (let i = 0; i < 5; i++) drawFigure(ctx, 'b5_letherii', W*(.6 + i*.025), hz + H*.06, .55, t, {still:true, dir:-1, phase:i});
  drawFigure(ctx, 'b2soldier', W*.58, hz + H*.08, .6, t, {still:true, dir:1}); drawFigure(ctx, 'b2soldier', W*.74, hz + H*.08, .6, t, {still:true, dir:-1});
  // dust in the light through the arch
  if (mo) { ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 12; i++) { const k = ((t/5000 + hash(i, 7712)) % 1); ctx.fillStyle = `rgba(255,240,210,${(.25*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.47 + hash(i, 7713)*.06), hz - H*.15 + k*H*.2, 1.2, 1.2); } ctx.globalCompositeOperation = 'source-over'; }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.34 + i*Math.min(.065, .32/sq.length)), H*.9 - (i % 2)*3, 1.7, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .6, .35); };

/* the city's last day (120's caption): a street going away between tall houses; towers beyond with smoke columns; the crowd at the far end;
   a brazier at the near corner; after the earthquake, a white light behind the roofs to the left (north); while the dragon is looked at,
   a pale winged shape small over the towers */
SCENEX.b7_city_burning = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46, f = (S && S.f) || {}, quake = !!f.b7_c7_quake, dragon = quake && !f.b7_c7_sky && S && S.node === 'b7_c7_sky', fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b77:city:' + (quake ? 'q' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#3a3a46'],[.6,'#6a5e5a'],[1,'#a08068']]); x.fillRect(0, 0, W, hz);
    b77aTowers(x, W, hz, H, '#2a2830', 7720, false);
    // the street: houses either side converging on the far end
    const vx = W*.5, vy = hz + H*.04;
    for (let i = 0; i < 6; i++) { const k = i/6, w = W*(.16 - k*.02), h = H*(.5 - k*.3), lx = W*(.0 + k*.36), rx = W - lx - w; const shade = Math.round(70 + k*30);
      b77aHouse(x, lx, H*(.98 - k*.46), w*(1 - k*.6), h, `rgb(${shade},${shade - 2},${shade + 4})`, '#262c36', '#2a241c', 7721 + i);
      b77aHouse(x, rx + w*k*.6, H*(.98 - k*.46), w*(1 - k*.6), h, `rgb(${shade + 4},${shade},${shade - 4})`, '#262c36', '#2a241c', 7731 + i); }
    // the paving converging, and a canal glint far off
    x.fillStyle = vgrad(x, vy, H, [[0,'#5a5650'],[1,'#2a2824']]); x.beginPath(); x.moveTo(vx - W*.06, vy); x.lineTo(vx + W*.06, vy); x.lineTo(W*.86, H); x.lineTo(W*.14, H); x.closePath(); x.fill();
    for (let i = 0; i < 90; i++) { const d = Math.pow(hash(i, 7740), 1.5), yy = vy + d*(H - vy), half = W*(.06 + d*.36); ell(x, vx - half + hash(i, 7741)*half*2, yy, 1.5 + d*6, .6 + d*2, 'rgba(20,18,16,.25)'); }
    // broken glass and a torn broadsheet in the gutter
    for (let i = 0; i < 14; i++) { x.fillStyle = 'rgba(220,230,240,.5)'; x.fillRect(W*(.2 + hash(i, 7742)*.15), H*(.9 + hash(i, 7743)*.08), 2, 1); }
    poly(x, [[W*.7, H*.94], [W*.76, H*.92], [W*.78, H*.97], [W*.71, H*.98]], 'rgba(210,200,180,.7)');
  }), 0, 0, W, H);
  // the white light under one quarter, to the north (left), behind the roofs: steady, not fire
  if (quake) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.2, hz - H*.02, W*.32, '#e8f0ff', .45); glow(ctx, W*.2, hz, W*.14, '#ffffff', .5); ctx.globalCompositeOperation = 'source-over'; }
  // smoke columns over the towers, lit from under
  [[.34, .36], [.62, .34], [.82, .38]].forEach(([k, yk], i) => b77aSmoke(ctx, W*k, H*yk, H*.34, W, t + i*700, mo, '60,54,54', .4));
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.62, hz - H*.08, W*.12, '#ff8a40', .16*fl); ctx.globalCompositeOperation = 'source-over';
  // the dragon, small and pale, over the towers, only while it is being watched
  if (dragon) { const dx = W*(.7 + (mo ? Math.sin(t/1600)*.06 : 0)), dy = H*.14, wf = mo ? Math.sin(t/220) : 0; ctx.fillStyle = 'rgba(236,240,246,.85)';
    poly(ctx, [[dx - W*.06, dy - wf*H*.03], [dx - W*.01, dy], [dx, dy + H*.012], [dx + W*.01, dy], [dx + W*.06, dy - wf*H*.03], [dx + W*.012, dy + H*.01], [dx, dy + H*.03], [dx - W*.012, dy + H*.01]], 'rgba(236,240,246,.85)'); }
  // the crowd at the street's far end, moving like water
  for (let i = 0; i < 18; i++) { const cx = W*(.42 + hash(i, 7744)*.16), cy = hz + H*.06 + hash(i, 7745)*H*.03 + (mo ? Math.sin(t/400 + i)*1.2 : 0); ell(ctx, cx, cy, 3, 6, 'rgba(30,26,24,.75)'); ell(ctx, cx, cy - 7, 2.2, 2.2, 'rgba(40,34,30,.8)'); }
  // the brazier at the near corner
  const bx = W*.84, by = H*.86; ctx.fillStyle = '#1a1612'; ctx.fillRect(bx - 8, by - 10, 16, 10); ctx.fillRect(bx - 6, by, 2, 10); ctx.fillRect(bx + 4, by, 2, 10);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, bx, by - 10, H*.18, '#ff8a3a', .32*fl); ctx.globalCompositeOperation = 'source-over'; poly(ctx, [[bx - 6, by - 10], [bx - 2, by - 20*fl], [bx + 1, by - 13], [bx + 4, by - 18*fl], [bx + 6, by - 10]], 'rgba(255,150,60,.95)');
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.24 + i*Math.min(.06, .3/sq.length)), H*.94 - (i % 2)*3, 1.6, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .62, .4); };

/* three weeks on: a canal street in the morning: the canal across the bottom third, a stone footbridge humped over it, houses along the far
   bank with washing out, the towers beyond with no smoke on them, people on the bridge */
SCENEX.b7_c7_after = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.36, wy = H*.66;
  ctx.drawImage(sceneLayer('b77:after', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#7a9ab4'],[.7,'#b8c8d0'],[1,'#e0d8c4']]); x.fillRect(0, 0, W, hz);
    for (let i = 0; i < 5; i++) ell(x, hash(i, 7750)*W, hz*(.2 + hash(i, 7751)*.4), W*(.08 + hash(i, 7752)*.08), hz*.05, 'rgba(255,255,250,.4)');
    b77aTowers(x, W, hz + H*.04, H, '#6a7080', 7753, false);
    // houses along the far bank, washing on lines between them
    for (let i = 0; i < 8; i++) b77aHouse(x, W*(i*.125), wy - H*.02, W*.12, H*(.22 + hash(i, 7754)*.1), ['#a8a090', '#9a9a94', '#b0a48c'][i % 3], '#4a5262', '#5a6a6a', 7755 + i);
    for (let l = 0; l < 3; l++) { const y0 = wy - H*(.16 + l*.04), x0 = W*(.1 + l*.3); x.strokeStyle = 'rgba(40,36,30,.5)'; x.lineWidth = .7; x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo(x0 + W*.1, y0 + H*.02, x0 + W*.2, y0); x.stroke();
      for (let c = 0; c < 5; c++) { x.fillStyle = ['#d8d0c0', '#8a9ab0', '#c0a080', '#e8e4dc', '#a0786a'][(c + l) % 5]; x.fillRect(x0 + W*(.02 + c*.035), y0 + H*.006 + Math.sin(c)*1.5, W*.018, H*.025); } }
    // the near quay
    x.fillStyle = '#8a847a'; x.fillRect(0, wy - H*.02, W, H*.02);
    // the canal
    x.fillStyle = vgrad(x, wy, H, [[0,'#3a5a5a'],[1,'#1a2a2c']]); x.fillRect(0, wy, W, H - wy);
    // the footbridge: a stone hump with a rail
    x.fillStyle = '#9a9288'; x.beginPath(); x.moveTo(W*.34, wy); x.quadraticCurveTo(W*.5, wy - H*.14, W*.66, wy); x.lineTo(W*.66, wy + H*.04); x.quadraticCurveTo(W*.5, wy - H*.06, W*.34, wy + H*.04); x.closePath(); x.fill();
    x.fillStyle = '#1a2a2c'; x.beginPath(); x.moveTo(W*.4, wy + H*.06); x.quadraticCurveTo(W*.5, wy - H*.03, W*.6, wy + H*.06); x.closePath(); x.fill();
    x.strokeStyle = '#6a645c'; x.lineWidth = 2; x.beginPath(); x.moveTo(W*.34, wy - H*.02); x.quadraticCurveTo(W*.5, wy - H*.17, W*.66, wy - H*.02); x.stroke();
  }), 0, 0, W, H);
  // the water moving
  for (let i = 0; i < 16; i++) { const k = (hash(i, 7760) + (mo ? t/9000 : 0)) % 1; ctx.fillStyle = 'rgba(220,240,240,.18)'; ctx.fillRect(k*W, wy + H*(.06 + hash(i, 7761)*.28), W*.05, 1); }
  // people on the bridge
  for (let i = 0; i < 3; i++) { const k = ((hash(i, 7762) + (mo ? t/30000 : 0)) % 1), px = W*(.36 + k*.28), py = wy - H*.06 - Math.sin(k*Math.PI)*H*.07; drawFigure(ctx, 'b5_c5_refugee', px, py, .6, t, {still:true, dir:i % 2 ? 1 : -1, phase:i}); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.12 + i*Math.min(.06, .26/sq.length)), H*.62 - (i % 2)*2, 1.4, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .5, .3); };

/* ---------------- the chapter's gear: ART['item/<key>'] in the series' 200×150 item style (089g), on Book Six's smoke-umber ground ---------------- */
(function(){
  if (typeof ART === 'undefined') return;
  const O = 'stroke="#0b0806" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"';
  const sh = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#@sh)"/>`;
  const S = (d, fill, lit = '@lit') => `<path d="${d}" fill="${fill}"/><path d="${d}" fill="url(#${lit})"/><path d="${d}" fill="none" ${O}/>`;
  const lin = (id, stops, x2 = 1, y2 = 1) => `<linearGradient id="@${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  const BASE = `<radialGradient id="@bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#40291f"/><stop offset=".62" stop-color="#22150f"/><stop offset="1" stop-color="#100907"/></radialGradient>`
    + `<radialGradient id="@sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset=".55" stop-color="#000" stop-opacity=".32"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`
    + lin('lit', [[0, '#fff', .2], [.45, '#fff', 0], [.6, '#000', 0], [1, '#000', .42]])
    + lin('gd', [[0, '#f4d88a'], [.45, '#c89a3a'], [1, '#6a4a14']], 1, 1);
  function put(key, label, defs, body){
    const P = key.replace(/[^a-z0-9]/g, '') + '-';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="${label.replace(/"/g, '&quot;')}"><defs>${BASE}${defs}</defs><rect width="200" height="150" fill="url(#@bg)"/>${body}</svg>`;
    ART['item/' + key] = svg.replace(/@/g, P);
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [200, 150];
  }

  /* a Letherii officer's cloak: a long grey-blue riding cloak folded in a heap as it was handed over, the oiled-silk lining showing at the
     turned edge, and at the throat the Finadd's clasp, two gold fish nose to tail */
  put('b7_c7_lethcloak', 'A Letherii officer\'s cloak',
    lin('wl', [[0, '#7a8ca0'], [.5, '#4a5a6e'], [1, '#222a36']], 1, 0) + lin('sk', [[0, '#d8d0b8'], [1, '#8a8270']], 0, 1),
    sh(100, 136, 74, 6)
    // the cloak hung from its clasp: narrow at the collar, falling wide to a wavy hem, the right front turned back to show the lining
    + S('M84 30 Q100 24 116 30 L132 40 Q150 80 166 128 Q150 134 136 128 Q122 136 108 129 Q94 136 80 129 Q66 136 52 128 Q40 133 34 128 Q50 80 68 40 Z', 'url(#@wl)')
    + S('M116 30 L132 40 Q150 80 166 128 Q150 134 136 128 Q132 96 124 64 Q120 46 116 30 Z', 'url(#@sk)')
    + `<path d="M84 44 Q76 86 66 128 M96 40 Q94 86 92 130 M106 40 Q110 86 116 128" fill="none" stroke="#141a24" stroke-opacity=".45" stroke-width="1.6"/>`
    + `<path d="M84 30 Q100 38 116 30" fill="none" stroke="#1a2230" stroke-width="5" stroke-linecap="round"/>` // the collar
    // the clasp: two gold fish nose to tail, on a ring, at the throat
    + `<g transform="translate(100 34) scale(.9)"><circle r="11" fill="none" stroke="url(#@gd)" stroke-width="3" ${O}/>`
    + S('M-9 -2 C-5 -7 3 -7 6 -2 L10 -6 L10 2 L6 -1 C3 3 -5 3 -9 -2 Z', 'url(#@gd)')
    + S('M9 4 C5 9 -3 9 -6 4 L-10 8 L-10 0 L-6 3 C-3 -1 5 -1 9 4 Z', 'url(#@gd)')
    + `<circle cx="-6" cy="-3" r=".9" fill="#2a1a08"/><circle cx="6" cy="5" r=".9" fill="#2a1a08"/></g>`
    + `<path d="M70 50 Q64 80 56 110" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="3"/>`);

  /* a coin with no face: two new-struck Letherii coins, one showing the city's towers and a canal under them, the other turned to show its
     other face, bright and blank; a milled rim on both */
  { const mill = (cx, cy, r) => { let s = ''; for (let i = 0; i < 40; i++) { const a = i/40*Math.PI*2; s += `<path d="M${(cx + Math.cos(a)*(r - 2.5)).toFixed(1)} ${(cy + Math.sin(a)*(r - 2.5)).toFixed(1)} L${(cx + Math.cos(a)*r).toFixed(1)} ${(cy + Math.sin(a)*r).toFixed(1)}" stroke="#6a4a14" stroke-opacity=".7" stroke-width="1"/>`; } return s; };
    put('b7_c7_kingscoin', 'A coin with no face', `<radialGradient id="@fc" cx=".38" cy=".34" r=".8"><stop offset="0" stop-color="#fff0c0"/><stop offset=".5" stop-color="#d8aa48"/><stop offset="1" stop-color="#7a5418"/></radialGradient>`,
      sh(96, 128, 72, 7)
      // the towers face, behind, tilted
      + `<g transform="translate(74 74) rotate(-14)">` + `<circle r="40" fill="url(#@gd)" ${O}/>` + mill(0, 0, 40) + `<circle r="33" fill="none" stroke="#6a4a14" stroke-opacity=".55" stroke-width="1"/>`
      + `<g fill="#7a5418" fill-opacity=".75"><rect x="-20" y="-10" width="6" height="22"/><rect x="-11" y="-20" width="6" height="32"/><path d="M-11 -20 Q-8 -27 -5 -20 Z"/><rect x="-2" y="-14" width="7" height="26"/><rect x="8" y="-24" width="5" height="36"/><path d="M8 -24 L10.5 -31 L13 -24 Z"/><rect x="16" y="-6" width="6" height="18"/></g>`
      + `<path d="M-26 16 Q-13 12 0 16 Q13 20 26 16" fill="none" stroke="#7a5418" stroke-opacity=".7" stroke-width="1.6"/><path d="M-22 22 Q-8 18 6 22 Q16 25 22 22" fill="none" stroke="#7a5418" stroke-opacity=".55" stroke-width="1.2"/></g>`
      // the blank face, in front
      + `<g transform="translate(128 84) rotate(10)"><circle r="38" fill="url(#@fc)" ${O}/>` + mill(0, 0, 38) + `<circle r="31" fill="none" stroke="#6a4a14" stroke-opacity=".5" stroke-width="1"/>`
      + `<ellipse cx="-10" cy="-12" rx="14" ry="8" fill="#fff" fill-opacity=".35" transform="rotate(-30)"/></g>`);
  }
})();
