/* ============ Book Nine, Chapter 3 art: The Road East — the road among the last farms of Lether, the column on the march, the last farm,
   the fever-camp by night, and the last water at the Wastes' edge ============ */
/* Book Nine's look (160b) out of Lether: the green giving out to dust, field walls with gaps in them, a pale tired sky with dust in it and
   a low warm light from the left; at night slate-blue, the camp's fires strung away east in a line, the fever-carts at the back.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     b9_c3_healer  the Letherii healer: a pale linen coat to the shin, sleeves tied back, a headcloth, a copper pot on its bail in the
                   near hand, a satchel at the hip
     b9_c3_harro   the sutler: lean, a wide-brimmed hat, a long dun coat, a pack hung with pots and skins and twists of cloth
     b9_c3_duvo    the Akrynnai horse-trader: a long felt coat, a leather cap with its ear-flaps tied up, grey braids, a sash with a
                   horn-gripped knife, a quirt
   Five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b9_road_east     the road among the last farms by day: mud-brick farms set back behind field walls with gaps in them, fields gone
                      to dust, the column halted along the road, its dust standing up ahead
     b9_column        the column on the march by day: files going away east on a track that is mostly dust, wagons among them, the
                      sun hard (later Third chapters' card falls back to it: no farm, no fever-cart drawn)
     b9_c3_farm       the last farm by afternoon: the house, the barn, the well with its bucket gone, the fields to the sky; the
                      deserters' cart in the barn door until the yard is cleared
     b9_c3_fevercamp  the camp by the road at night: tents, drawn-in wagons, the fever-carts with their sick in rows and the Letherii
                      pots steaming on tripods, the column's fires going away east, the Third's fire by a flat stone
     b9_c3_edge       the last water before the Wastes, by day: a thin stream with a few thorn trees, the grass giving out to stone on
                      the far bank, a horse-trader's string on a picket and his felt tent, the column watering along the bank
   Ground (TILEX): b9_c3_road (dry grass with Book Nine's dust, the road, scrub, a field wall, wagons, fever-carts, the sutler's wagon,
   tents, a fire, a flat stone, barrels, a horse picket, a felt tent, bare stone, the road off the map) and b9_c3_farm (the same, with the
   farmhouse, its door, the barn, its door, the well, a cart, a woodstack). Battle 't': a drystone wall end. The chapter's gear in the
   series' 200×150 item style, on Book Nine's ground: dusk dust-brown (#4a3c2c → #140f0a), a low warm rim light. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* the Letherii healer: fifty or so; a pale linen coat to the shin with the sleeves tied back, a headcloth, a copper pot on its bail in the
     near hand, a satchel on a strap at the far hip */
  b9_c3_healer(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1);
    h.legs('#3a3228');
    poly(ctx, [[-6.2,-6],[6.2,-6],[7.4,11.4],[-7.4,11.4]], h.armor('#d8d0bc', '#6a6452')); // the linen coat
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-.4, -4, .8, 15); // its opening
    B2F.line(ctx, '#5a4a32', .8, [[-5.6, -5.6], [4.8, 4.6]]); ell(ctx, -5.6, 5.6, 2.4, 2, '#6a5434'); // the satchel strap, the satchel
    ctx.fillStyle = '#c09a78'; ctx.fillRect(6, -2.6, 2, 3.6); // the bare forearm
    B2F.line(ctx, '#3a2a1a', .7, [[7.2, 1], [8.6, 4.4]]); B2F.line(ctx, '#3a2a1a', .7, [[9.8, 1], [8.6, 4.4]]); // the bail
    ell(ctx, 8.6, 6.2, 2.6, 2, '#a8643a'); ell(ctx, 8, 5.6, 1, .6, 'rgba(255,220,180,.5)'); // the copper pot, its glint
    ctx.fillStyle = 'rgba(230,200,150,.14)'; ctx.fillRect(-6, -5.6, 1.2, 15);
    h.head('#c8a07e', 4.2, -11.2); h.look('rgba(20,12,10,.85)', -11.4);
    ctx.fillStyle = '#b8b09a'; ctx.beginPath(); ctx.arc(0, -12.2, 4.8, Math.PI*.96, Math.PI*2.04); ctx.fill(); poly(ctx, [[3.6,-12],[5.6,-8.4],[3.4,-9.6]], '#a8a08a'); // the headcloth, its tail
    ctx.restore(); },
  /* Harro the sutler: lean, a wide hat, a long dun coat, a pack high on the back hung with pots, skins and twists of cloth */
  b9_c3_harro(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1.02);
    poly(ctx, [[-8.4,-8],[-2,-8],[-2,4],[-8.6,4]], '#5a4630'); // the pack, behind
    ell(ctx, -9, -4, 2.2, 1.8, '#8a5a34'); ell(ctx, -9.2, 1, 1.8, 2.2, '#6a7a5a'); ctx.fillStyle = '#c8b890'; ctx.fillRect(-7.6, -10.4, 4, 2.4); // a pot, a skin, a roll of cloth on top
    h.legs('#2e2820');
    poly(ctx, [[-6,-6],[6,-6],[7,11],[-7,11]], h.armor('#7a6a4e', '#2a2418')); // the long coat
    ctx.fillStyle = '#2a2018'; ctx.fillRect(-6, 2.6, 12, 1.1); // the belt
    [[-1, 4], [1.6, 5], [3.6, 4.4]].forEach(([x, y], i) => { ctx.fillStyle = ['#c8b890', '#8a3a2a', '#c8b890'][i]; ctx.fillRect(x, y, 1.2, 2.6); }); // twists of cloth at the belt
    ctx.fillStyle = '#a07a58'; ctx.fillRect(5.6, -2, 2, 3); // the near hand, held out to sell
    ctx.fillStyle = 'rgba(230,200,150,.14)'; ctx.fillRect(-5.8, -5.6, 1.2, 15);
    h.head('#a8805e', 4.2, -11.2); h.look('rgba(20,12,10,.85)', -11.4);
    ell(ctx, 0, -14.2, 8, 1.6, '#4a3a26'); ctx.fillStyle = '#5a4630'; ctx.beginPath(); ctx.arc(0, -14.4, 3.8, Math.PI, 0); ctx.fill(); // the wide hat
    ctx.restore(); },
  /* Duvo the Akrynnai: a long felt coat, a leather cap with the ear-flaps tied up, grey braids, a red sash with the horn-gripped knife,
     a quirt hanging from the near wrist */
  b9_c3_duvo(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.02);
    h.legs('#3a2e22'); ctx.fillStyle = '#2a1e14'; ctx.fillRect(-5, 9.6, 3.8, 3.4); ctx.fillRect(1.2, 9.6, 3.8, 3.4); // riding boots
    poly(ctx, [[-6.6,-6.2],[6.6,-6.2],[8,11.6],[-8,11.6]], h.armor('#7a6448', '#2a2216')); // the felt coat
    poly(ctx, [[-6.4,-6],[0,3],[-1,3.6],[-6.6,-2]], 'rgba(0,0,0,.2)'); // its wrap
    ctx.fillStyle = '#8a3a26'; ctx.fillRect(-6.8, 2.2, 13.6, 2); // the sash
    ctx.fillStyle = '#d8c8a0'; ctx.fillRect(1.4, 1, 1.2, 3.6); ctx.fillStyle = '#8a8478'; ctx.fillRect(1.6, 4.4, .8, 3); // the horn grip, the blade's sheath
    ctx.fillStyle = '#9a6e4e'; ctx.fillRect(6.2, -1.6, 2.2, 3); B2F.line(ctx, '#2a1a0e', .8, [[7.4, 1.4], [9.6, 8]]); // the hand, the quirt
    ctx.fillStyle = 'rgba(230,200,150,.14)'; ctx.fillRect(-6.4, -5.6, 1.2, 15);
    h.head('#9a6e4e', 4.4, -11.2); h.look('rgba(20,12,10,.85)', -11.4);
    ctx.fillStyle = '#4a3420'; ctx.beginPath(); ctx.arc(0, -12.8, 4.9, Math.PI*1.02, Math.PI*1.98); ctx.fill(); // the leather cap
    poly(ctx, [[-4.8,-12.6],[-6.2,-13.6],[-5.6,-15]], '#3a2818'); poly(ctx, [[4.8,-12.6],[6.2,-13.6],[5.6,-15]], '#3a2818'); // the ear-flaps, tied up
    B2F.line(ctx, '#a8a8a0', 1, [[-4.2, -10.6], [-4.8, -4.6]]); B2F.line(ctx, '#a8a8a0', 1, [[4.2, -10.6], [4.8, -4.6]]); // the grey braids
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* the country east of Lether: sky (day, eve, night), the land going from tired green to dust. Returns the horizon. */
function b93aLand(x, W, H, when, green){ const hz = H*.44;
  const sky = {day:[[0,'#8e8c84'],[.65,'#bcb098'],[1,'#d2c4a2']], eve:[[0,'#1c1e30'],[.55,'#5e4c4c'],[.9,'#b88258'],[1,'#d49c62']], night:[[0,'#04060c'],[.7,'#0e1224'],[1,'#1a1c2c']]}[when];
  x.fillStyle = vgrad(x, 0, hz, sky); x.fillRect(0, 0, W, hz + 2);
  if (when === 'night') { for (let i = 0; i < 70; i++) { x.fillStyle = `rgba(220,226,250,${(.08 + hash(i, 9311)*.4).toFixed(2)})`; x.fillRect(hash(i, 9312)*W, Math.pow(hash(i, 9313), 1.5)*hz*.8, 1, 1); } }
  if (when === 'day') { glow(x, W*.14, hz*.9, W*.6, '#ecd094', .24); for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(224,210,184,.28)'; x.beginPath(); x.ellipse(hash(i, 9314)*W, hz*(.2 + hash(i, 9315)*.5), W*.18, hz*.05, 0, 0, 7); x.fill(); } }
  if (when === 'eve') glow(x, W*.08, hz, W*.55, '#e89a5a', .32);
  const land = when === 'night' ? [[0,'#181a1e'],[1,'#0a0a0c']] : when === 'eve' ? [[0,'#5a4a36'],[1,'#1e1812']] : green ? [[0,'#8a8a62'],[.4,'#9a8c64'],[1,'#5e4e36']] : [[0,'#a08e6a'],[1,'#5a4a34']];
  x.fillStyle = vgrad(x, hz, H, land); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 110; i++) { const d = hash(i, 9316), yy = hz + Math.pow(d, .8)*(H - hz); x.fillStyle = when === 'night' ? 'rgba(80,84,96,.16)' : `rgba(${160 + Math.round(d*40)},${140 + Math.round(d*30)},${96 + Math.round(d*20)},.2)`; x.fillRect(hash(i, 9317)*W, yy, 2 + d*9, 1); } // dry grass and dust
  return hz; }
/* a road going away east to a vanishing point right of centre */
function b93aRoad(x, W, H, hz, when, vx){ vx = vx ?? W*.62; x.fillStyle = when === 'night' ? '#1e1c18' : when === 'eve' ? '#4a3c2c' : '#b09a72';
  x.beginPath(); x.moveTo(vx - W*.008, hz); x.lineTo(vx + W*.008, hz); x.lineTo(W*.9, H); x.lineTo(W*.3, H); x.closePath(); x.fill();
  x.fillStyle = when === 'night' ? 'rgba(0,0,0,.2)' : 'rgba(120,100,70,.25)'; for (let i = 0; i < 2; i++) { const o = i ? .12 : -.12; x.beginPath(); x.moveTo(vx, hz); x.lineTo(W*(.6 + o), H); x.lineTo(W*(.6 + o + .02), H); x.closePath(); x.fill(); } } // the ruts
/* a mud-brick farm far off: a low house, a barn, a wall round it */
function b93aFarm(x, cx, by, s, when){ const N = when === 'night', wall = N ? '#2a2620' : '#8a7458', dk = N ? '#1a1612' : '#6a5640', th = N ? '#2a2a22' : '#9a8e6c';
  x.fillStyle = dk; x.fillRect(cx - 18*s, by - 3*s, 36*s, 3*s); // the yard wall
  x.fillStyle = wall; x.fillRect(cx - 14*s, by - 12*s, 12*s, 10*s); poly(x, [[cx - 15*s, by - 12*s], [cx - 8*s, by - 18*s], [cx - 1*s, by - 12*s]], th); // the house, its thatch
  x.fillStyle = dk; x.fillRect(cx + 2*s, by - 15*s, 14*s, 13*s); poly(x, [[cx + 1*s, by - 15*s], [cx + 9*s, by - 21*s], [cx + 17*s, by - 15*s]], th); // the barn
  x.fillStyle = N ? '#0a0806' : '#2a2018'; x.fillRect(cx - 10*s, by - 7*s, 3*s, 5*s); x.fillRect(cx + 7*s, by - 9*s, 4*s, 7*s); } // a door, the barn door
/* a field wall with gaps, running across the land */
function b93aWall(x, x0, x1, y, s, when){ x.fillStyle = when === 'night' ? '#22201c' : '#7a6a52'; for (let px = x0; px < x1; px += 14*s) { if (hash(Math.round(px), 9321) > .78) continue; x.fillRect(px, y - 3*s, 12*s, 3*s); x.fillStyle = 'rgba(255,240,210,.1)'; x.fillRect(px, y - 3*s, 12*s, .8*s); x.fillStyle = when === 'night' ? '#22201c' : '#7a6a52'; } }
/* the column far off: files of small figures going away along the road toward the vanishing point, wagons among them, its dust over it */
function b93aColumn(x, W, H, hz, vx, n, when){ const N = when === 'night', col = N ? '#0c0c10' : '#3a2e22';
  for (let i = n - 1; i >= 0; i--) { const u = i/(n - 1), py = hz + 2 + H*.3*Math.pow(1 - u, 1.7), d = (py - hz)/(H - hz), px = vx + (W*.6 - vx)*d + (hash(i, 9331) - .5)*W*.02*d, s = .25 + d*2.4;
    if (i % 6 === 3) b92aWagon(x, px, py, s*.3, N ? 'night' : 'day', false);
    else for (let j = -1; j <= 1; j++) { x.fillStyle = col; x.fillRect(px + j*2.6*s - .7*s, py - 5*s, 1.4*s, 5*s); ell(x, px + j*2.6*s, py - 6*s, .8*s, .8*s, col); x.fillStyle = N ? '#14141a' : '#5a6070'; x.fillRect(px + j*2.6*s - 1.2*s, py - 4*s, 1*s, 1.8*s); } }
  if (!N) for (let i = 0; i < 9; i++) { const k = i/8; x.fillStyle = `rgba(206,184,140,${(.3 - k*.02).toFixed(2)})`; x.beginPath(); x.ellipse(vx - k*W*.04, hz - H*(.01 + k*.035), W*(.04 + k*.05), H*(.02 + k*.01), 0, 0, 7); x.fill(); } } // the column's own dust
/* a fever-cart, side on: a farm cart with its sides down, blankets in the bed, the shapes of the sick in rows, an awning pole */
function b93aFeverCart(x, cx, cy, s, N){ const wd = N ? '#1c140c' : '#5a4228';
  ell(x, cx, cy + 2*s, 22*s, 3*s, 'rgba(0,0,0,.35)'); x.fillStyle = wd; x.fillRect(cx - 18*s, cy - 9*s, 36*s, 4*s); // the bed
  [[-12, '#6a5a4a'], [-4, '#7a6a5a'], [4, '#5a5a6a'], [12, '#6a5a4a']].forEach(([d, c]) => { ell(x, cx + d*s, cy - 10*s, 4*s, 1.8*s, N ? '#2a2826' : c); ell(x, cx + d*s - 3.4*s, cy - 10.6*s, 1.4*s, 1.2*s, N ? '#3a3028' : '#b8906c'); }); // the sick under blankets, heads
  B2F.line(x, wd, 1.2*s, [[cx - 17*s, cy - 9*s], [cx - 17*s, cy - 20*s]]); B2F.line(x, wd, 1.2*s, [[cx + 17*s, cy - 9*s], [cx + 17*s, cy - 20*s]]);
  x.fillStyle = N ? 'rgba(60,60,60,.6)' : 'rgba(200,190,160,.7)'; x.beginPath(); x.moveTo(cx - 18*s, cy - 20*s); x.quadraticCurveTo(cx, cy - 23*s, cx + 18*s, cy - 20*s); x.lineTo(cx + 18*s, cy - 17*s); x.lineTo(cx - 18*s, cy - 17*s); x.fill(); // the awning
  [-11, 11].forEach(d => { x.strokeStyle = N ? '#0c0a08' : '#2a1e12'; x.lineWidth = 1.4*s; x.beginPath(); x.arc(cx + d*s, cy - 3*s, 4.4*s, 0, 7); x.stroke(); }); }
/* a Letherii pot on a tripod over a small fire, steaming */
function b93aPot(x, cx, cy, s, t, mo, N){ B2F.line(x, '#2a1e12', s, [[cx - 5*s, cy], [cx, cy - 10*s]]); B2F.line(x, '#2a1e12', s, [[cx + 5*s, cy], [cx, cy - 10*s]]); B2F.line(x, '#2a1e12', s, [[cx + 1*s, cy + 1*s], [cx, cy - 10*s]]);
  ell(x, cx, cy - 4*s, 3.4*s, 2.6*s, '#8a5430'); ell(x, cx - 1*s, cy - 5*s, 1*s, .6*s, 'rgba(255,220,180,.5)');
  ell(x, cx, cy, 3*s, 1.2*s, N ? 'rgba(255,140,60,.9)' : 'rgba(255,170,90,.7)'); if (N) glow(x, cx, cy - 2*s, 14*s, '#ff8a3a', .22);
  for (let i = 0; i < 3; i++) { const k = ((t/2600*mo + i/3) % 1); x.fillStyle = `rgba(230,230,230,${(.22*(1 - k)).toFixed(3)})`; x.beginPath(); x.ellipse(cx + Math.sin(k*6 + i)*2*s, cy - 7*s - k*14*s, (1.6 + k*3)*s, (1.2 + k*2)*s, 0, 0, 7); x.fill(); } } // steam
/* a horse, side on, small: for the trader's string */
function b93aHorse(x, cx, cy, s, col, dir){ x.save(); x.translate(cx, cy); x.scale(dir || 1, 1); x.fillStyle = col;
  x.beginPath(); x.ellipse(0, -8*s, 7*s, 3.4*s, 0, 0, 7); x.fill(); // the body
  [-5, -3, 3, 5].forEach(d => x.fillRect(d*s - .6*s, -6*s, 1.2*s, 6*s)); // legs
  x.beginPath(); x.moveTo(5*s, -10*s); x.lineTo(9*s, -15*s); x.lineTo(11*s, -14*s); x.lineTo(7.6*s, -8*s); x.fill(); // the neck
  x.beginPath(); x.ellipse(10.6*s, -14*s, 2.6*s, 1.4*s, .5, 0, 7); x.fill(); // the head
  x.fillRect(-7.6*s, -9*s, 1*s, 5*s); x.restore(); } // the tail

/* ---------------- the backdrops ---------------- */
/* the road among the last farms by day: farms set back behind field walls with gaps in them, fields gone to dust, the column halted along
   the road ahead with its dust standing up; Harro's wagon by the road in Ch 3 */
SCENEX.b9_road_east = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, vx = W*.64;
  ctx.drawImage(sceneLayer('b93:road', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', true);
    b93aFarm(x, W*.14, hz + H*.04, H/260, 'day'); b93aFarm(x, W*.88, hz + H*.03, H/320, 'day'); b93aFarm(x, W*.4, hz + H*.015, H/520, 'day');
    for (let i = 0; i < 4; i++) { const tx = W*(.06 + i*.26), ty = hz + H*(.02 + hash(i, 9341)*.02); B2F.line(x, '#4a3a26', 1.4, [[tx, ty], [tx + 1, ty - H*.06]]); ell(x, tx + 1, ty - H*.07, H*.03, H*.022, '#6a6a46'); } // the last trees
    b93aWall(x, 0, W*.5, hz + H*.12, H/240, 'day'); b93aWall(x, W*.72, W, hz + H*.14, H/220, 'day'); b93aWall(x, 0, W*.36, hz + H*.3, H/150, 'day');
    b93aRoad(x, W, H, hz, 'day', vx); b93aColumn(x, W, H, hz, vx, 26, 'day');
    for (let i = 0; i < 4; i++) b92aWagon(x, W*(.78 + i*.05) - i*W*.02, hz + H*(.22 - i*.04), H/(180 + i*60), 'day', false); }), 0, 0, W, H); // wagons drawn up along the road
  for (let i = 0; i < 6; i++) { const k = ((t/9000*mo + i/6) % 1); ctx.fillStyle = `rgba(214,194,150,${(.12*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.3 + i*.1) + k*W*.06, H*.8 - k*H*.1, W*.08*(1 + k), H*.025*(1 + k), 0, 0, 7); ctx.fill(); } // dust on the road
  if (S && S.book === 'dod' && S.chapter === 3) drawFigure(ctx, 'b9_c3_harro', W*.2, H*.86, 1.3, t, {dir:1, phase:2});
  ctx.fillStyle = 'rgba(224,204,164,.06)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.34 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* the column on the march by day: files going away east on a track that is mostly dust, wagons among them, the sun hard. Generic, for any
   Third chapter's card. */
SCENEX.b9_column = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, vx = W*.7;
  ctx.drawImage(sceneLayer('b93:col', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false);
    for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(120,104,80,.35)'; x.beginPath(); x.ellipse(W*(.1 + i*.17), hz + H*.01, W*.08, H*.012, 0, 0, 7); x.fill(); } // low ground far off
    b93aRoad(x, W, H, hz, 'day', vx); b93aColumn(x, W, H, hz, vx, 40, 'day');
    for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(110,90,62,${(.2 + hash(i, 9351)*.2).toFixed(2)})`; ell(x, hash(i, 9352)*W, hz + H*(.06 + hash(i, 9353)*.5), 1.6 + hash(i, 9354)*3, 1, x.fillStyle); } }), 0, 0, W, H); // stones
  glow(ctx, W*.12, H*.12, W*.3, '#f4dca0', .14);
  for (let i = 0; i < 8; i++) { const k = ((t/7000*mo + i/8) % 1); ctx.fillStyle = `rgba(214,194,150,${(.16*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.5 + (i % 4)*.1) - k*W*.08, H*.7 - k*H*.16, W*.09*(1 + k), H*.03*(1 + k), 0, 0, 7); ctx.fill(); } // the column's dust, rising
  for (let i = 0; i < 4; i++) drawFigure(ctx, 'b2soldier', W*(.66 + i*.06), H*.82 - i*H*.04, 1.25 - i*.12, t, {dir:1, phase:i + 2}); // heavies ahead in the file
  ctx.fillStyle = 'rgba(232,212,170,.07)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.06, .34/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .48, .5); };

/* the last farm by afternoon: the house with its grey thatch, the barn bigger than the house, the well with its bucket gone, the fields to
   the sky; the deserters' cart in the barn door until the yard is cleared, the old woman at her door after */
SCENEX.b9_c3_farm = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, done = !!f.b9_c3_farmDone;
  ctx.drawImage(sceneLayer('b93:farm', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false), by = H*.72;
    glow(x, W*.1, hz, W*.5, '#e8b878', .14);
    x.fillStyle = vgrad(x, hz - H*.28, by, [[0,'#9a8262'],[1,'#7a6448']]); x.fillRect(W*.06, by - H*.26, W*.32, H*.26); // the house
    poly(x, [[W*.04, by - H*.26], [W*.22, by - H*.42], [W*.4, by - H*.26]], '#8a806a'); for (let i = 0; i < 12; i++) B2F.line(x, 'rgba(60,52,40,.4)', 1, [[W*(.06 + i*.028), by - H*.27], [W*(.12 + i*.02), by - H*.36]]); // the grey thatch
    x.fillStyle = '#2a2018'; x.fillRect(W*.18, by - H*.16, W*.05, H*.16); x.fillRect(W*.29, by - H*.2, W*.04, H*.05); // the door, a window
    x.fillStyle = vgrad(x, hz - H*.32, by, [[0,'#7a6448'],[1,'#5a4834']]); x.fillRect(W*.58, by - H*.32, W*.38, H*.32); // the barn
    poly(x, [[W*.56, by - H*.32], [W*.77, by - H*.48], [W*.98, by - H*.32]], '#8a806a');
    x.fillStyle = '#1a140e'; x.fillRect(W*.7, by - H*.24, W*.12, H*.24); // the barn door
    x.fillStyle = '#7a6a52'; x.fillRect(0, by - H*.02, W, H*.02); // the yard's edge
    ell(x, W*.47, by + H*.1, W*.05, H*.025, '#6a6458'); x.fillStyle = '#5a564a'; x.fillRect(W*.42, by + H*.04, W*.1, H*.06); ell(x, W*.47, by + H*.04, W*.05, H*.02, '#141210'); // the well
    B2F.line(x, '#3a2a1a', 2, [[W*.43, by + H*.04], [W*.43, by - H*.06]]); B2F.line(x, '#3a2a1a', 2, [[W*.51, by + H*.04], [W*.51, by - H*.06]]); B2F.line(x, '#3a2a1a', 1.6, [[W*.42, by - H*.06], [W*.52, by - H*.06]]); // its post and bar, no bucket
    for (let i = 0; i < 20; i++) { x.fillStyle = 'rgba(150,130,96,.25)'; x.fillRect(hash(i, 9361)*W, by + H*(.06 + hash(i, 9362)*.2), 6, 1); } }), 0, 0, W, H);
  if (!done) { const cx = W*.76, cy = H*.72; ctx.fillStyle = '#4a3420'; ctx.fillRect(cx - W*.07, cy - H*.06, W*.14, H*.04); [[-.04], [.04]].forEach(([d]) => { ctx.strokeStyle = '#2a1e12'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx + W*d, cy - H*.01, H*.03, 0, 7); ctx.stroke(); }); B2F.line(ctx, '#4a3420', 2, [[cx - W*.07, cy - H*.04], [cx - W*.12, cy - H*.12]]); [[-.03], [0], [.03]].forEach(([d]) => ell(ctx, cx + W*d, cy - H*.08, W*.018, H*.025, '#c8b890')); // the cart in the barn door, sacks
    [[.24, 1], [.3, -1]].forEach(([u, d], i) => drawFigure(ctx, 'b5_letherii', W*u, H*.74, 1.05, t, {dir:d, phase:i + 1})); }
  else drawFigure(ctx, 'b5_c5_refugee', W*.21, H*.74, 1.1, t, {dir:1, still:true});
  for (let i = 0; i < 4; i++) { const k = ((t/12000*mo + i/4) % 1); ctx.fillStyle = `rgba(214,194,150,${(.1*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.1 + i*.25) + k*W*.1, H*.62 - k*H*.06, W*.12*(1 + k), H*.02*(1 + k), 0, 0, 7); ctx.fill(); } // dust off the fields
  ctx.fillStyle = 'rgba(232,206,160,.06)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.05 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .52, .5); };

/* the camp by the road at night: tents in rows, drawn-in wagons, the fever-carts with their sick in rows and the Letherii pots steaming on
   tripods, the column's fires going away east in a line, the Third's small fire by a flat stone */
SCENEX.b9_c3_fevercamp = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b93:camp', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'night', false);
    ell(x, W*.84, H*.1, 6, 6, 'rgba(230,232,240,.75)'); glow(x, W*.84, H*.1, H*.18, '#c8d0e8', .1); // the moon
    b93aRoad(x, W, H, hz, 'night', W*.7);
    for (let i = 0; i < 18; i++) { const k = i/17, fx = W*(.7 - (1 - k)*.02) + (hash(i, 9371) - .5)*W*.3*(1 - k), fy = hz + H*.24*Math.pow(1 - k, 2.4) + 1; x.fillStyle = `rgba(255,170,90,${(.5 + (1 - k)*.4).toFixed(2)})`; x.fillRect(fx, fy, 1 + (1 - k)*2, 1 + (1 - k)*1.4); } // the column's fires, away east
    for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) b92aTent(x, W*(.04 + i*.08 + r*.03), hz + H*(.08 + r*.08), H/(260 - r*50), 'night');
    b93aFeverCart(x, W*.6, hz + H*.2, H/230, true); b93aFeverCart(x, W*.84, hz + H*.22, H/210, true);
    b92aWagon(x, W*.36, hz + H*.18, H/260, 'night', false);
    x.fillStyle = '#2a2826'; x.beginPath(); x.moveTo(W*.3, H*.84); x.lineTo(W*.31, H*.74); x.lineTo(W*.42, H*.73); x.lineTo(W*.43, H*.84); x.closePath(); x.fill(); x.fillStyle = 'rgba(255,220,180,.08)'; x.fillRect(W*.31, H*.74, W*.11, H*.01); }), 0, 0, W, H); // the flat stone
  b93aPot(ctx, W*.7, H*.7, H/120, t, mo, true); b93aPot(ctx, W*.93, H*.72, H/140, t, mo, true); // the Letherii pots
  drawFigure(ctx, 'b9_c3_healer', W*.76, H*.76, 1.1, t, {dir:-1, phase:3});
  const fx = W*.5, fy = H*.86; ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy - 4, H*.36, '#ff8a3a', .26*fl); ctx.globalCompositeOperation = 'source-over';
  ell(ctx, fx, fy, 9, 3, '#1a0e06'); poly(ctx, [[fx - 7, fy], [fx - 2, fy - 12*fl], [fx + 1, fy - 6], [fx + 4, fy - 11*fl], [fx + 7, fy]], 'rgba(255,150,60,.95)'); poly(ctx, [[fx - 3, fy], [fx, fy - 7*fl], [fx + 3, fy]], 'rgba(255,230,150,.95)'); // the Third's fire
  const sick = S && S.book === 'dod' && S.chapter === 3 && S.f && S.f.b9_c3_sick && TPL[S.f.b9_c3_sick] && b9In(S.f.b9_c3_sick) && !(S.f.b9_c3_feverBroke) ? S.f.b9_c3_sick : null;
  if (sick) { ell(ctx, W*.58, H*.9, W*.06, H*.022, '#5a4e40'); ell(ctx, W*.53, H*.885, H*.016, H*.014, '#b8906c'); } // the sick one in a blanket on the warm side
  const sq = marchOrder(sceneSquad()).filter(id => id !== sick); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.6, t, {phase:i, dir:1}));
  vign(ctx, W, H, .76, .52); };

/* the last water before the Wastes, by day: a thin stream with a few thorn trees, the grass giving out to stone on the far bank, the
   trader's string on a picket and his felt tent, the column watering along the bank */
SCENEX.b9_c3_edge = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b93:edge', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false);
    for (let i = 0; i < 50; i++) { x.fillStyle = `rgba(130,116,94,${(.3 + hash(i, 9381)*.3).toFixed(2)})`; ell(x, hash(i, 9382)*W, hz + H*(.01 + Math.pow(hash(i, 9383), 1.6)*.2), 2 + hash(i, 9384)*5, 1 + hash(i, 9385)*1.4, x.fillStyle); } // the far side: stone
    const sy = hz + H*.26; x.fillStyle = vgrad(x, sy - H*.03, sy + H*.03, [[0,'#7a8a8a'],[1,'#4a5a5e']]); x.beginPath(); x.moveTo(0, sy); for (let px = 0; px <= W; px += W/20) x.lineTo(px, sy + Math.sin(px/W*7)*H*.012); x.lineTo(W, sy + H*.03); for (let px = W; px >= 0; px -= W/20) x.lineTo(px, sy + H*.03 + Math.sin(px/W*7 + 1)*H*.01); x.closePath(); x.fill(); // the thin stream
    for (let i = 0; i < 5; i++) { const tx = W*(.12 + i*.2), ty = sy - H*.01; B2F.line(x, '#3a2a1a', 1.6, [[tx, ty], [tx + 2, ty - H*.08]]); B2F.line(x, '#3a2a1a', 1, [[tx + 1, ty - H*.05], [tx + W*.02, ty - H*.09]]); ell(x, tx + 3, ty - H*.09, W*.03, H*.02, '#5a5a3a'); } // thorn trees
    for (let i = 0; i < 9; i++) { const px = W*(.05 + i*.11); for (let j = -1; j <= 1; j++) { x.fillStyle = '#3a2e22'; x.fillRect(px + j*4 - 1, sy + H*.01 - 8, 2, 8); ell(x, px + j*4, sy + H*.01 - 9, 1.2, 1.2, '#3a2e22'); } } // the column watering along the bank
    b92aTent(x, W*.74, hz + H*.18, H/170, 'day'); x.fillStyle = '#6a5a44'; x.fillRect(W*.705, hz + H*.135, W*.07, H*.045); // Duvo's felt tent
    x.strokeStyle = 'rgba(90,70,50,.8)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(W*.36, hz + H*.2); x.lineTo(W*.66, hz + H*.2); x.stroke(); // the picket line
    [['#6a4a2e', 1], ['#3a2a1a', -1], ['#8a6a4a', 1], ['#4a3a2a', 1], ['#7a5a3a', -1], ['#2a2018', 1]].forEach(([c, d], i) => b93aHorse(x, W*(.38 + i*.05), hz + H*.22, H/150, c, d)); }), 0, 0, W, H); // the string
  if (mo) for (let i = 0; i < 12; i++) { const k = ((t/5000 + hash(i, 9391)) % 1); ctx.fillStyle = `rgba(230,240,240,${(.3*(1 - k)).toFixed(2)})`; ctx.fillRect(W*hash(i, 9392) + k*W*.04, H*.7 + Math.sin(i)*H*.01, 2, 1); } // light on the stream
  drawFigure(ctx, 'b9_c3_duvo', W*.8, H*.74, 1.15, t, {dir:-1, phase:1});
  if (S && S.book === 'dod' && S.chapter === 3) drawFigure(ctx, 'b9_c3_harro', W*.18, H*.8, 1.15, t, {dir:1, phase:3});
  ctx.fillStyle = 'rgba(232,212,170,.06)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.32 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* ---------------- the ground ---------------- */
const B93G = {grass:'#8a7c58', grassD:'#22201a', road:'#a08c68', roadD:'#2a2620', stone:'#7a7062', stoneD:'#2a2826'};
function b93aGrass(ctx, x, y, T, dark){ const px = x*T, py = y*T; ctx.fillStyle = dark ? B93G.grassD : B93G.grass; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .14, '220,200,160', 1);
  for (let i = 0; i < 4; i++) B2F.line(ctx, dark ? 'rgba(90,96,70,.35)' : 'rgba(180,160,110,.55)', 1, [[px + T*(.1 + hash(x, y, 9401 + i)*.8), py + T*(.65 + hash(x, y, 9405 + i)*.3)], [px + T*(.12 + hash(x, y, 9401 + i)*.8), py + T*(.45 + hash(x, y, 9409 + i)*.2)]]); }
function b93aRoadT(ctx, x, y, T, dark){ const px = x*T, py = y*T; ctx.fillStyle = dark ? B93G.roadD : B93G.road; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .12, '240,224,190', 1);
  ctx.fillStyle = dark ? 'rgba(0,0,0,.2)' : 'rgba(110,90,60,.25)'; ctx.fillRect(px, py + T*.28, T, T*.06); ctx.fillRect(px, py + T*.66, T, T*.06); } // the ruts
const b93Is = (x, y, s) => s.includes(b2Tile(x, y));
/* mud brick (the farm's house, barn and yard wall): courses of brick, a lit top where the wall meets the sky, a shadowed foot */
function b93aBrick(ctx, x, y, T, N, set, barn){ const px = x*T, py = y*T; ctx.fillStyle = N ? (barn ? '#1e1812' : '#2a2218') : (barn ? '#6e5a42' : '#8a7052'); ctx.fillRect(px, py, T, T);
  ctx.fillStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(60,44,28,.35)'; for (let r = 0; r < 4; r++) { ctx.fillRect(px, py + T*(r*.25 + .23), T, Math.max(1, T*.025)); const o = r % 2 ? .25 : .5; for (let c = o; c < 1; c += .5) ctx.fillRect(px + T*c, py + T*r*.25, Math.max(1, T*.025), T*.25); }
  if (!b93Is(x, y - 1, set)) { ctx.fillStyle = N ? 'rgba(200,190,170,.12)' : 'rgba(255,236,200,.3)'; ctx.fillRect(px, py, T, T*.08); }
  if (!b93Is(x, y + 1, set)) { ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px, py + T*.88, T, T*.12); } }
/* a drystone field wall across a tile of grass */
function b93aDry(ctx, x, y, T, N){ const px = x*T, py = y*T; b93aGrass(ctx, x, y, T, N); ell(ctx, px + T*.5, py + T*.84, T*.5, T*.1, 'rgba(0,0,0,.4)');
  for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) ell(ctx, px + T*(.12 + i*.25 + (r % 2)*.12), py + T*(.74 - r*.17), T*.13, T*.09, N ? '#2e2a24' : ['#8a7a62', '#7a6a52', '#9a8a70'][Math.floor(hash(x + i, y + r, 9451)*3)]); }
TILEX.b9_c3_road = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, N = !!dark;
  if (ch === ',' || ch === '<' || ch === '>') { b93aRoadT(ctx, x, y, T, N); if (ch !== ',') { ctx.fillStyle = N ? 'rgba(200,190,160,.1)' : 'rgba(255,240,200,.16)'; ctx.fillRect(px + T*.2, py, T*.6, T); } return; }
  if (ch === 'r') { ctx.fillStyle = N ? B93G.stoneD : B93G.stone; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .06, .2, '230,220,200', 1); ell(ctx, px + T*.5, py + T*.6, T*.4, T*.26, N ? '#3a3632' : '#8e8474'); ctx.fillStyle = 'rgba(255,240,220,.12)'; ctx.fillRect(px + T*.18, py + T*.4, T*.3, T*.06); return; } // bare stone
  b93aGrass(ctx, x, y, T, N); if (ch === '.') return;
  if (ch === '#') return b93aDry(ctx, x, y, T, N);
  if (ch === 'x') { ell(ctx, px + T*.5, py + T*.84, T*.4, T*.1, 'rgba(0,0,0,.4)'); for (let i = 0; i < 5; i++) B2F.line(ctx, N ? '#14100c' : '#4a3a26', Math.max(1, T*.04), [[px + T*.5, py + T*.84], [px + T*(.16 + i*.17), py + T*(.3 + hash(x, y, 9431 + i)*.2)]]); // a thorn bush: stems
    for (let i = 0; i < 6; i++) ell(ctx, px + T*(.2 + hash(x, y, 9441 + i)*.6), py + T*(.3 + hash(x, y, 9447 + i)*.36), T*.14, T*.1, N ? '#1e2018' : ['#6a6a42', '#7a704a', '#5a5a38'][i % 3]); return; } // its dry leaves
  if (ch === 'F') return b55Fire(ctx, px, py, T, N);
  if (ch === 'm') return b55Stone(ctx, px, py, T, N, .08);
  if (ch === 'T') return b55Tent(ctx, x, y, T, N);
  if (ch === 'w') return b55Wagon(ctx, px, py, T, N);
  if (ch === 'H') { b55Wagon(ctx, px, py, T, N); [[.2, '#8a5a34'], [.5, '#6a7a5a'], [.78, '#8a5a34']].forEach(([k, c]) => { B2F.line(ctx, '#2a1e12', 1, [[px + T*k, py + T*.24], [px + T*k, py + T*.34]]); ell(ctx, px + T*k, py + T*.4, T*.07, T*.06, N ? '#2a2420' : c); }); return; } // the sutler's wagon, pots hung on it
  if (ch === 'v') { b55Cart(ctx, px, py, T, N); [[.3], [.56], [.8]].forEach(([k]) => ell(ctx, px + T*k, py + T*.4, T*.1, T*.06, N ? '#3a3028' : '#b8906c')); return; } // a fever-cart, the sick's heads under the awning
  if (ch === 'o') { [[.28, .62], [.72, .62], [.5, .36]].forEach(([a, b]) => { ell(ctx, px + T*a, py + T*b, T*.19, T*.15, N ? '#2a2016' : '#7a5a38'); ctx.fillStyle = N ? '#14100c' : '#3a2a1a'; ctx.fillRect(px + T*(a - .19), py + T*(b - .03), T*.38, Math.max(1, T*.03)); }); return; } // water barrels
  if (ch === 'h') { ctx.strokeStyle = N ? 'rgba(150,130,100,.5)' : 'rgba(110,86,56,.8)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.lineTo(px + T, py + T*.3); ctx.stroke(); // the picket line
    b93aHorse(ctx, px + T*.46, py + T*.88, T/30, N ? '#16120e' : ['#6a4a2e', '#3a2a1a', '#8a6a4a'][Math.floor(hash(x, y, 9411)*3)], hash(x, y, 9412) > .5 ? 1 : -1); return; }
  if (ch === 'D') { ell(ctx, px + T*.5, py + T*.9, T*.46, T*.08, 'rgba(0,0,0,.45)'); ctx.fillStyle = N ? '#2a2420' : '#6a5a44'; ctx.beginPath(); ctx.moveTo(px + T*.06, py + T*.9); ctx.quadraticCurveTo(px + T*.5, py - T*.04, px + T*.94, py + T*.9); ctx.fill(); // a felt tent, domed
    ctx.fillStyle = '#0c0a08'; ctx.fillRect(px + T*.4, py + T*.56, T*.2, T*.34); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px + T*.2, py + T*.5); ctx.lineTo(px + T*.8, py + T*.5); ctx.stroke(); return; }
});
/* the last farm: the same ground, and the house, the barn, their doors, the well, a cart, a woodstack */
TILEX.b9_c3_farm = (ctx, ch, x, y, T, dark) => { const N = !!dark;
  if (ch === '#') return b2Clip(ctx, x, y, T, () => b93aBrick(ctx, x, y, T, N, '#', false));
  if (ch === 'Q' || ch === 'D' || ch === 'b' || ch === 'a') return b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, barn = ch === 'b' || ch === 'a';
    b93aBrick(ctx, x, y, T, N, barn ? 'ba' : 'QD', barn); // mud brick, the barn darker
    if (ch === 'D' || ch === 'a') { ctx.fillStyle = '#0a0806'; ctx.fillRect(px + T*.18, py + T*.24, T*.64, T*.76); ctx.fillStyle = N ? '#2a1e14' : '#5a4228'; ctx.fillRect(px + T*.18, py + T*.24, T*.64, T*.08); } }); // a door
  return b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === 'W') { b93aGrass(ctx, x, y, T, N); ell(ctx, px + T*.5, py + T*.6, T*.36, T*.28, N ? '#2a2826' : '#6a665e'); ell(ctx, px + T*.5, py + T*.56, T*.22, T*.16, '#050404'); B2F.line(ctx, '#2a1e12', Math.max(1.4, T*.06), [[px + T*.16, py + T*.6], [px + T*.16, py + T*.1]]); B2F.line(ctx, '#2a1e12', Math.max(1.4, T*.06), [[px + T*.84, py + T*.6], [px + T*.84, py + T*.1]]); B2F.line(ctx, '#2a1e12', Math.max(1, T*.05), [[px + T*.14, py + T*.12], [px + T*.86, py + T*.12]]); return; } // the well, no bucket
    if (ch === 'c') { b93aGrass(ctx, x, y, T, N); return b55Cart(ctx, px, py, T, N); }
    if (ch === 'k') { b93aGrass(ctx, x, y, T, N); for (let i = 0; i < 3; i++) for (let j = 0; j < 3 - i; j++) ell(ctx, px + T*(.28 + j*.22 + i*.11), py + T*(.74 - i*.18), T*.11, T*.09, N ? '#2a2016' : '#7a5a38'); return; } // a woodstack
    TILEX.b9_c3_road(ctx, ch, x, y, T, dark); }); };
/* low cover ('t') on this chapter's ground: the end of a drystone field wall */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && (style === 'b9_c3_road' || style === 'b9_c3_farm')) { const px = x*T, py = y*T; ell(ctx, px + T*.5, py + T*.86, T*.44, T*.1, 'rgba(0,0,0,.5)');
      for (let r = 0; r < 3; r++) for (let i = 0; i < 4 - r; i++) { const sx = px + T*(.12 + i*.22 + r*.11), sy = py + T*(.74 - r*.16); ell(ctx, sx, sy, T*.12, T*.08, dark ? '#2e2a24' : ['#8a7a62', '#7a6a52', '#9a8a70'][Math.floor(hash(x + i, y + r, 9421)*3)]); }
      ctx.fillStyle = 'rgba(255,240,210,.12)'; ctx.fillRect(px + T*.2, py + T*.4, T*.6, T*.03); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Nine's ground: dusk dust-brown, a low warm rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".42" cy=".44" r=".8"><stop offset="0" stop-color="#4a3c2c"/><stop offset=".6" stop-color="#2a2016"/><stop offset="1" stop-color="#140f0a"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* an Akrynnai knife: a long single-edged blade worn narrow in the middle from the stone, a horn grip wrapped in rawhide, lying across a
     fold of felt, the warm light along its back */
  ART['item/b9_c3_akrynknife'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="An Akrynnai knife">${bg('b93ak')}
<linearGradient id="b93ak-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8e4d8"/><stop offset=".5" stop-color="#9a968c"/><stop offset="1" stop-color="#3a3834"/></linearGradient>
<linearGradient id="b93ak-h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8dcc0"/><stop offset=".6" stop-color="#b8a882"/><stop offset="1" stop-color="#6a5e46"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b93ak-bg)"/><path d="M14 112 Q100 96 188 108 L188 132 Q100 120 14 134 Z" fill="#6a5a44" stroke="#140f0a"/><path d="M14 112 Q100 96 188 108" stroke="#8a7a5e" stroke-width="2" fill="none"/>
<ellipse cx="100" cy="106" rx="80" ry="8" fill="url(#b93ak-sh)"/>
<g transform="rotate(-10 100 80)"><path d="M86 72 L176 70 Q184 74 176 80 L134 82 Q120 78 104 82 L86 82 Z" fill="url(#b93ak-b)" stroke="#140f0a" stroke-width="1.2"/>
<path d="M90 73 L174 71" stroke="#fff4dc" stroke-width="1" opacity=".6"/><path d="M118 80 Q126 77 134 81" stroke="#3a3834" stroke-width=".8" fill="none"/>
<rect x="78" y="68" width="10" height="18" rx="2" fill="#5a5850" stroke="#140f0a"/>
<rect x="26" y="70" width="54" height="14" rx="6" fill="url(#b93ak-h)" stroke="#2a2016" stroke-width="1.2"/>
<g stroke="#6a4a2e" stroke-width="2" opacity=".8">${[34, 42, 50, 58, 66].map(x => `<path d="M${x} 70 L${x + 4} 84"/>`).join('')}</g>
<ellipse cx="24" cy="77" rx="4" ry="7" fill="#c8b890" stroke="#2a2016"/></g>
<ellipse cx="104" cy="74" rx="66" ry="28" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c3_akrynknife'] = [200, 150];
  /* a healer's boiling-pot: a small blackened copper pot with a bail handle and a fitted lid, on three stones over a few coals, a thread
     of steam, the warm light on its copper flank */
  ART['item/b9_c3_boilingpot'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A healer's boiling-pot">${bg('b93bp')}
<linearGradient id="b93bp-c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e09a5a"/><stop offset=".45" stop-color="#9a5a30"/><stop offset="1" stop-color="#2a160c"/></linearGradient>
<radialGradient id="b93bp-f" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc070"/><stop offset=".5" stop-color="#e0602a" stop-opacity=".7"/><stop offset="1" stop-color="#e0602a" stop-opacity="0"/></radialGradient></defs>
<rect width="200" height="150" fill="url(#b93bp-bg)"/><ellipse cx="100" cy="124" rx="70" ry="9" fill="url(#b93bp-sh)"/>
<ellipse cx="100" cy="122" rx="40" ry="10" fill="url(#b93bp-f)"/>
<g fill="#5a5448" stroke="#140f0a">${[[64, 120], [100, 126], [136, 120]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="8"/>`).join('')}</g>
<path d="M68 76 Q66 116 100 118 Q134 116 132 76 Z" fill="url(#b93bp-c)" stroke="#140f0a" stroke-width="1.6"/>
<path d="M68 76 Q66 116 100 118 Q134 116 132 76 Z" fill="#000" opacity=".22"/>
<ellipse cx="100" cy="76" rx="33" ry="8" fill="#5a3a20" stroke="#140f0a" stroke-width="1.2"/><ellipse cx="100" cy="73" rx="27" ry="5" fill="#3a2414"/><rect x="95" y="64" width="10" height="7" rx="2" fill="#2a1a10"/>
<path d="M66 80 Q100 28 134 80" fill="none" stroke="#3a2a1a" stroke-width="3"/>
<path d="M72 82 Q70 108 86 114" stroke="#ffd8a0" stroke-width="2" opacity=".5" fill="none"/>
<path d="M104 62 Q96 52 106 42 Q114 32 104 20" stroke="#e8e8e0" stroke-width="3" opacity=".22" fill="none"/>
<ellipse cx="96" cy="86" rx="60" ry="34" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c3_boilingpot'] = [200, 150];
  /* a twist of fever-bark: an oiled cloth opened on a tailboard, curls of bitter red bark in it, one curl broken to show the pale inside,
     the cloth's tie */
  ART['item/b9_c3_feverbark'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A twist of fever-bark">${bg('b93fb')}
<linearGradient id="b93fb-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c8b890"/><stop offset=".6" stop-color="#8a7a5a"/><stop offset="1" stop-color="#4a3e2c"/></linearGradient>
<linearGradient id="b93fb-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c86a44"/><stop offset=".5" stop-color="#8a3a22"/><stop offset="1" stop-color="#4a1c10"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b93fb-bg)"/><rect x="10" y="114" width="180" height="16" fill="#3a2a1a" stroke="#140f0a"/><ellipse cx="100" cy="114" rx="80" ry="8" fill="url(#b93fb-sh)"/>
<path d="M30 110 Q36 60 74 50 Q120 40 160 58 Q176 86 168 112 Q100 122 30 110 Z" fill="url(#b93fb-c)" stroke="#140f0a" stroke-width="1.4"/>
<path d="M44 104 Q50 70 80 62" stroke="#e8dcc0" stroke-width="1.2" opacity=".5" fill="none"/>
<g stroke="#140f0a" stroke-width="1">${[[66, 84, -12], [92, 78, 8], [118, 88, -4], [140, 80, 18], [84, 98, 2], [110, 100, -16]].map(([x, y, r]) => `<g transform="rotate(${r} ${x} ${y})"><path d="M${x - 14} ${y} Q${x} ${y - 9} ${x + 14} ${y} Q${x} ${y - 3} ${x - 14} ${y} Z" fill="url(#b93fb-b)"/></g>`).join('')}</g>
<g transform="rotate(10 130 98)"><path d="M120 98 Q130 92 140 98" fill="none" stroke="#e8c8a0" stroke-width="2.4"/></g>
<path d="M160 58 Q178 46 186 54 Q178 62 168 64" fill="none" stroke="#6a5034" stroke-width="2.4"/>
<ellipse cx="98" cy="82" rx="62" ry="30" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c3_feverbark'] = [200, 150];
}
