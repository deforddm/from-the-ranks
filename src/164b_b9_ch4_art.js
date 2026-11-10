/* ============ Book Nine, Chapter 4 art: The Ration Book — the escort's train on the Wastes at dusk and at night, the noon halt on open
   country, a dry wash with a seep ============ */
/* Book Nine's look (160b) on the Wastes: dry grass and bare stone under a sky too big for it, a low warm light from the left by day, a red
   dusk, a slate-blue night with the cook-fires burning low on dung. Shared pieces borrowed from the earlier chapters' art: Ch 3's land and
   column (b93aLand, b93aColumn, b93aHorse) and Ch 2's wagons, barrels, oxen and tents (b92aWagon, b92aBarrels, b92aOx, b92aTent).
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     kaedra          (replaces 160's simple sprite) the border scout: a dun felted coat to the knee with dry grass stitched in loops at
                     the shoulders, the hood down round the neck, a blue bead at the throat, the horn bow held in the far hand, a quiver
                     at the hip, a scout's knife
     b9_c4_outrider  a Bluerose outrider on foot: blue-enamelled scale over a riding coat, an officer's dust-scarf over the mouth, a
                     lance cut short with a blue tassel
     b9_c4_runner    the quartermaster's runner: young, thin, a pale quartermaster's armband, a slate under the arm, a quick look over
                     the shoulder
   Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b9_wastes       open country by day: dry grass, bare stone, an old cairn, the foreigners' dust far ahead; in Ch 4 the escort halted
                     along the track at noon, Bluerose outriders on the flank, and before the stampede a brown smear of dust in the north
     b9_camp_night   the column's camp at night: wagons drawn in a ring, tents, cook-fires low, sentries on the dark side; in Ch 4 one
                     lamp at Yelt's tailboard and, before the raid, shapes under the water wagons
     b9_c4_dusk      the train's wagons drawn in at dusk, a red sky, ration crates at a tailboard (the reading's place), the squad's
                     fire; the tile-woman and Yelt in phase 1
     b9_c4_wash      a dry wash cut into the plain, a seep in its bed, bhederin round it and painted riders on the far lip (before the
                     forage fight); after it the outriders loading meat on the spare horses; smoke far off north
   Ground (TILEX): b9_c4_wastes (Ch 3's b9_c3_road underneath; 'W' a wagon of the ring, 'C' a ration crate, 'X' oxen on a picket, 'c' a
   water-cart, 's' the herd's track, 'e' a seep). Battle 't': ration crates, stacked. The gear in the series' 200×150 item style, on Book
   Nine's ground: dusk dust-brown (#4a3c2c → #140f0a), a low warm rim light. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Kaedra: twenty-six, lean; a dun felted coat to the knee with dry grass stitched at the shoulders, the hood down round the neck, a
     blue bead at the throat; the horn bow upright in the far hand, a quiver at the near hip, soft boots */
  kaedra(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.02); const sw = o.still ? 0 : Math.sin(t/480 + (o.phase || 0));
    ctx.strokeStyle = '#4a3218'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(8.4, 8); ctx.quadraticCurveTo(11.6, -3, 8.6, -15); ctx.stroke(); // the horn bow, upright
    ctx.strokeStyle = 'rgba(230,220,190,.55)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(8.4, 8); ctx.lineTo(8.6, -15); ctx.stroke(); // its string
    ell(ctx, 9.6, -3.6, .9, 1.2, '#cfd8e0'); // the horn's pale belly at the grip
    h.legs('#2e2a20'); ctx.fillStyle = '#3a2e20'; ctx.fillRect(-4.4, 8.4, 3.4, 4.6); ctx.fillRect(1, 8.4, 3.4, 4.6); // soft boots
    poly(ctx, [[-6.2,-6],[6.2,-6],[7.2 + sw*.3,10.4],[-7.2 + sw*.3,10.4]], h.armor('#7a7454', '#262418')); // the dun coat, to the knee
    ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(-.4, -3, .8, 13.4); // its opening
    ctx.strokeStyle = 'rgba(206,188,120,.75)'; ctx.lineWidth = .6; ctx.beginPath(); for (let i = 0; i < 6; i++) { const x0 = i < 3 ? -6 + i*1.4 : 2.6 + (i - 3)*1.4; ctx.moveTo(x0, -5.6); ctx.lineTo(x0 + (i % 2 ? .8 : -.6), -8.4); } ctx.stroke(); // dry grass in loops at the shoulders
    ctx.fillStyle = '#2a1e12'; ctx.fillRect(-6.8, 2.4, 13.6, 1.2); // the belt
    poly(ctx, [[-7.6,1.6],[-5.4,1.2],[-4.6,8.4],[-6.8,8.8]], '#4a3420'); ctx.strokeStyle = '#d8ccb0'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(-6.8, 1.4); ctx.lineTo(-7.4, -1); ctx.moveTo(-6, 1.3); ctx.lineTo(-6.2, -1.2); ctx.stroke(); // the quiver, fletchings
    ctx.fillStyle = '#7a7454'; ctx.fillRect(5.4, -4.6, 2.4, 4.4); ctx.fillStyle = '#b8946e'; ctx.fillRect(6.4, -.6, 2.2, 2.4); // the far arm up to the bow, the hand
    ctx.fillStyle = 'rgba(230,200,150,.14)'; ctx.fillRect(-6, -5.6, 1.2, 15); // the low warm light on the lit edge
    poly(ctx, [[-5.6,-6.4],[5.6,-6.4],[4.2,-8.6],[-4.2,-8.6]], '#6a6448'); // the hood, down round the neck
    ell(ctx, 0, -6.2, .8, .8, '#3a6ab0'); ell(ctx, -.3, -6.5, .25, .25, '#c8dcf0'); // the blue bead
    h.head('#b8946e', 4.1, -11.4); h.look('rgba(20,12,10,.85)', -11.6);
    ctx.fillStyle = '#1e140c'; ctx.beginPath(); ctx.arc(0, -12.8, 4.4, Math.PI*1.02, Math.PI*1.98); ctx.fill(); ctx.fillRect(-4.4, -12.8, 1.4, 4.6); // dark hair, tied back
    ell(ctx, -4.6, -9.8, 1.1, 1.6, '#1e140c'); // the tail of it at the nape
    ctx.restore(); },
  /* a Bluerose outrider on foot: the blue scale over a riding coat, a dust-scarf over the mouth, a lance cut short with a blue tassel */
  b9_c4_outrider(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.04);
    B2F.line(ctx, '#6a4a2a', 1.3, [[7.6, 10.6], [7.6, -15]]); poly(ctx, [[6.6,-15],[8.6,-15],[7.6,-20.4]], '#c8ccd4'); ell(ctx, 7.6, -13.6, 1.3, 1.6, '#4a6a9a'); // the lance, its tassel
    h.legs('#2e2a26'); ctx.fillStyle = '#1e1610'; ctx.fillRect(-4.6, 7.6, 3.6, 5.4); ctx.fillRect(1, 7.6, 3.6, 5.4); // riding boots
    poly(ctx, [[-6,-1],[6,-1],[7.2,9.6],[-7.2,9.6]], h.armor('#4a4038', '#1e1a16')); // the riding coat's skirts
    poly(ctx, [[-6.4,-6],[6.4,-6],[6.8,3.2],[-6.8,3.2]], h.armor('#4a6a9a', '#1a2438')); // the blue scale
    ctx.strokeStyle = 'rgba(10,16,30,.55)'; ctx.lineWidth = .55; for (let r = 0; r < 4; r++) { const yy = -4.4 + r*2.2; ctx.beginPath(); for (let k = 0; k < 6; k++) { const xx = -6 + k*2.4 + (r % 2)*1.2; ctx.moveTo(xx - 1.1, yy); ctx.quadraticCurveTo(xx, yy + 1.6, xx + 1.1, yy); } ctx.stroke(); }
    ctx.fillStyle = 'rgba(180,170,140,.18)'; ctx.fillRect(-6.4, -6, 12.8, 9.2); // dust on the scale
    ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-6.8, 2.6, 13.6, 1.3);
    ctx.fillStyle = '#4a6a9a'; ctx.fillRect(5.4, -5, 2.4, 3.4); ctx.fillStyle = '#b89878'; ctx.fillRect(6.4, -1.6, 2, 2.4);
    h.head('#b08a68', 4, -11.4); h.look('rgba(24,14,10,.86)', -11.8);
    poly(ctx, [[-4.2,-10.4],[4.2,-10.4],[3.6,-7.4],[-3.6,-7.4]], '#c8b48a'); // the dust-scarf over the mouth
    ell(ctx, 0, -14.6, 4.3, 2.1, '#7a7a76'); ctx.fillStyle = '#7a7a76'; ctx.fillRect(-4.3, -14.6, 1.2, 3); // grey hair, cropped
    ctx.restore(); },
  /* the quartermaster's runner: young, thin, a pale armband, a slate under the near arm */
  b9_c4_runner(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1);
    h.legs('#3a3228');
    poly(ctx, [[-5.8,-6],[5.8,-6],[6.4,8],[-6.4,8]], h.armor('#7a6a54', '#2a2218')); // a clerk's tunic
    ctx.fillStyle = '#d8d0b8'; ctx.fillRect(-6.8, -3.8, 2.2, 1.6); // the quartermaster's armband
    ctx.fillStyle = '#2a2a2c'; ctx.fillRect(-9, -2, 4, 6); ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = .6; ctx.strokeRect(-9, -2, 4, 6); // the slate, under the arm
    ctx.fillStyle = '#2a1e12'; ctx.fillRect(-6.4, 2.4, 12.8, 1);
    ctx.fillStyle = 'rgba(230,200,150,.12)'; ctx.fillRect(-5.8, -5.6, 1, 12);
    h.head('#c8a07e', 4, -11.2); h.look('rgba(20,12,10,.85)', -11.4);
    ctx.fillStyle = '#4a3420'; ctx.beginPath(); ctx.arc(0, -12.4, 4.2, Math.PI*1.04, Math.PI*1.96); ctx.fill();
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* a stack of ration crates at a tailboard, stencilled with the brigade's mark */
function b94aCrates(x, cx, cy, s, N){ const c = N ? ['#2a2016', '#22190f', '#30241a'] : ['#7a5e3c', '#6a5034', '#8a6a44'];
  [[-8, 0, 0], [4, 0, 1], [-2, -8, 2]].forEach(([dx, dy, i]) => { x.fillStyle = c[i]; x.fillRect(cx + dx*s, cy + dy*s - 8*s, 11*s, 8*s); x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = Math.max(.6, s*.5); x.strokeRect(cx + dx*s, cy + dy*s - 8*s, 11*s, 8*s);
    x.fillStyle = N ? 'rgba(200,190,170,.1)' : 'rgba(240,226,190,.4)'; x.fillRect(cx + dx*s + 3*s, cy + dy*s - 5*s, 5*s, 1*s); }); }
/* a cairn of grey stones */
function b94aCairn(x, cx, by, s, N){ for (let r = 0; r < 5; r++) for (let i = 0; i < 5 - r; i++) ell(x, cx + (i - (4 - r)/2)*4*s, by - r*3.2*s - 2*s, 2.4*s, 1.8*s, N ? '#2a2826' : ['#8a8478', '#7a7468', '#9a9488'][(i + r) % 3]);
  x.fillStyle = 'rgba(255,240,210,.12)'; x.fillRect(cx - 6*s, by - 14*s, 3*s, .8*s); }
/* a low dung-fire, breathing */
function b94aFire(ctx, fx, fy, fl, sc){ sc = sc || 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy - 4, 60*sc, '#ff7a30', .22*fl); ctx.globalCompositeOperation = 'source-over';
  ell(ctx, fx, fy, 8*sc, 2.6*sc, '#1a0e06'); poly(ctx, [[fx - 6*sc, fy], [fx - 2*sc, fy - 8*fl*sc], [fx + 1*sc, fy - 4*sc], [fx + 3*sc, fy - 7*fl*sc], [fx + 6*sc, fy]], 'rgba(255,140,50,.9)'); poly(ctx, [[fx - 2.6*sc, fy], [fx, fy - 4.6*fl*sc], [fx + 2.6*sc, fy]], 'rgba(255,220,140,.9)'); }
/* the ring of wagons seen from inside, a curve of tilts going round the back of the picture */
function b94aRing(x, W, H, hz, when, n){ for (let i = 0; i < n; i++) { const a = Math.PI*(.06 + .88*i/(n - 1)), cx = W*(.5 - Math.cos(a)*.52), cy = hz + H*(.06 + Math.sin(a)*.05), s = H/(300 - Math.sin(a)*60);
  b92aWagon(x, cx, cy, s, when, false); } }

/* ---------------- the backdrops ---------------- */
/* open country by day. In Ch 4: the escort halted along the track at noon, the train behind, outriders out on the flank, and before the
   stampede the brown smear of the herd's dust low on the northern sky (left). Otherwise: the empty plain, a cairn, the far dust. */
SCENEX.b9_wastes = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, c4 = !!(S && S.book === 'dod' && S.chapter === 4), f = (S && S.f) || {}, herd = c4 && (f.b9_c4_ph || 1) === 3 && !f.b9_c4_herdDone;
  ctx.drawImage(sceneLayer('b94:wastes' + (c4 ? '4' : ''), W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false);
    for (let i = 0; i < 8; i++) { x.fillStyle = `rgba(110,100,84,${(.4 + hash(i, 9401)*.3).toFixed(2)})`; ell(x, W*hash(i, 9402), hz + H*(.02 + hash(i, 9403)*.4), W*(.02 + hash(i, 9404)*.04), H*(.006 + hash(i, 9405)*.01), x.fillStyle); } // bare stone in the grass
    b94aCairn(x, W*.16, hz + H*.14, H/300, false);
    for (let i = 0; i < 7; i++) { const k = i/6; x.fillStyle = `rgba(206,184,140,${(.24 - k*.02).toFixed(2)})`; x.beginPath(); x.ellipse(W*(.82 - k*.03), hz - H*(.01 + k*.03), W*(.04 + k*.04), H*(.02 + k*.008), 0, 0, 7); x.fill(); } // the foreigners' dust far ahead, east
    if (c4) { x.fillStyle = 'rgba(176,154,114,.55)'; x.beginPath(); x.moveTo(0, hz + H*.3); x.lineTo(W, hz + H*.18); x.lineTo(W, hz + H*.22); x.lineTo(0, hz + H*.36); x.fill(); // the track
      for (let i = 0; i < 11; i++) { const k = i/10, cx = W*(.08 + k*.86), cy = hz + H*(.3 - k*.11), s = H/(150 + k*260); if (i % 4 === 2) b92aBarrels(x, cx, cy, s*1.2, 'day'); else b92aWagon(x, cx, cy, s, 'day', false); }
      for (let i = 0; i < 4; i++) b93aHorse(x, W*(.6 + i*.06), hz + H*.08, H/220, ['#6a4a2e', '#3a2a1a', '#8a6a4a'][i % 3], -1); } }), 0, 0, W, H); // the outriders' horses on the flank
  if (herd) for (let i = 0; i < 6; i++) { const k = ((t/7000*mo + i/6) % 1), hz = H*.44; ctx.fillStyle = `rgba(140,108,70,${(.5*(1 - k*.5)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.04 + i*.07) + k*W*.04, hz - H*(.01 + k*.05), W*(.08 + k*.04), H*(.03 + k*.015), 0, 0, 7); ctx.fill(); } // the herd's dust coming on
  for (let i = 0; i < 14; i++) { const k = ((t/9000*mo + hash(i, 9411)) % 1); ctx.fillStyle = `rgba(240,216,168,${(.4*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9412)*.8) + k*W*.08, H*(.55 + hash(i, 9413)*.35) - k*H*.06, 1.3, 1.3); } // dust on the air
  if (c4) { drawFigure(ctx, 'b9_c4_outrider', W*.78, H*.8, 1.2, t, {dir:-1, phase:2}); if (f.b9_c4_herdDone && !f.b9_c4_huntTried) drawFigure(ctx, 'b3_c2_bhederin', W*.9, H*.7, 1, t, {dir:-1, still:true}); }
  ctx.fillStyle = 'rgba(220,200,160,.06)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* the column's camp at night: the ring of wagons dark against the stars, tents, cook-fires low on dung, a sentry on the dark side. In Ch 4
   one lamp at Yelt's tailboard, and before the raid three shapes low under the water wagons. */
SCENEX.b9_camp_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), c4 = !!(S && S.book === 'dod' && S.chapter === 4), f = (S && S.f) || {};
  ctx.drawImage(sceneLayer('b94:night', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'night', false);
    ell(x, W*.84, H*.1, 6, 6, 'rgba(230,232,240,.75)'); glow(x, W*.84, H*.1, H*.18, '#c8d0e8', .08); // the moon
    for (let i = 0; i < 12; i++) { x.fillStyle = `rgba(255,140,60,${(.3 + hash(i, 9421)*.3).toFixed(2)})`; x.fillRect(W*(.04 + i*.08), hz - H*(.004 + hash(i, 9422)*.01), 1.4, 1.4); } // the column's fires going away for a league
    b94aRing(x, W, H, hz, 'night', 9);
    for (let i = 0; i < 4; i++) b92aTent(x, W*(.12 + i*.1), hz + H*(.26 + (i % 2)*.03), H/150, 'night');
    b92aBarrels(x, W*.76, hz + H*.28, H/170, 'night'); for (let i = 0; i < 3; i++) b92aOx(x, W*(.56 + i*.05), hz + H*.3, H/170, '#14120e', 1); }), 0, 0, W, H);
  [[.3, .78], [.62, .74]].forEach(([u, v], i) => b94aFire(ctx, W*u, H*v, b2Fl(t + i*700), 1.1)); // cook-fires, low
  drawFigure(ctx, 'b5_letherii', W*.94, H*.6, .85, t, {dir:-1, phase:3, alpha:.8}); // a sentry on the dark side
  if (c4) { const lx = W*.72, ly = H*.62; ctx.fillStyle = `rgba(255,190,110,${(.9*fl).toFixed(2)})`; ctx.fillRect(lx, ly, 3, 4); ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx + 1.5, ly + 2, H*.2, '#ffb060', .2*fl); ctx.globalCompositeOperation = 'source-over'; // Yelt's lamp
    drawFigure(ctx, 'b5_c1_clerk', W*.75, H*.76, 1.05, t, {dir:-1, still:true});
    if ((f.b9_c4_ph || 1) === 2 && !f.b9_c4_raidDone) [[.8, -1], [.85, 1], [.89, -1]].forEach(([u, d], i) => drawFigure(ctx, 'b6_bandit', W*u, H*.64, .8, t, {dir:d, phase:i + 3, alpha:.6})); } // shapes under the water wagons
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.04 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.6, t, {phase:i, dir:1}));
  vign(ctx, W, H, .8, .52); };

/* the train at dusk: the wagons drawn in a ring on open country under a red sky, ration crates at a tailboard, the squad's fire; in
   phase 1 the tile-woman on her crate and Yelt at the water wagon with his book; Orla's cart; Kaedra outside the light once she walks */
SCENEX.b9_c4_dusk = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), f = (S && S.f) || {}, c4 = !!(S && S.book === 'dod' && S.chapter === 4), ph = f.b9_c4_ph || 1;
  ctx.drawImage(sceneLayer('b94:dusk', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'eve', false);
    for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(120,60,50,.25)'; x.beginPath(); x.ellipse(W*(.2 + i*.22), hz*(.3 + hash(i, 9431)*.3), W*.14, hz*.03, 0, 0, 7); x.fill(); } // long red cloud
    b94aRing(x, W, H, hz, 'eve', 9);
    for (let i = 0; i < 3; i++) b92aTent(x, W*(.1 + i*.1), hz + H*(.24 + (i % 2)*.04), H/150, 'eve');
    b94aCrates(x, W*.6, hz + H*.3, H/170, false); b92aBarrels(x, W*.84, hz + H*.26, H/180, 'eve');
    for (let i = 0; i < 3; i++) b92aOx(x, W*(.42 + i*.05), hz + H*.22, H/180, ['#4a3420', '#3a2a1a', '#5a3e26'][i], 1); }), 0, 0, W, H);
  b94aFire(ctx, W*.36, H*.86, fl, 1.2);
  for (let i = 0; i < 3; i++) { const k = ((t/6000*mo + i/3) % 1); ctx.fillStyle = `rgba(180,170,160,${(.14*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*.36 + Math.sin(k*5 + i)*4, H*.8 - k*H*.24, 4 + k*10, 3 + k*6, 0, 0, 7); ctx.fill(); } // dung-smoke going up
  if (c4 && ph === 1) { drawFigure(ctx, 'b5_c1_tilewoman', W*.6, H*.72, 1.05, t, {dir:-1, still:true}); drawFigure(ctx, 'b5_c1_clerk', W*.8, H*.72, 1, t, {dir:-1, phase:2}); }
  if (c4 && ph !== 2) drawFigure(ctx, 'b9_c2_orla', W*.5, H*.76, 1.1, t, {dir:-1, phase:4});
  if (c4 && b9In('kaedra')) drawFigure(ctx, 'kaedra', W*.94, H*.86, 1.4, t, {dir:-1, phase:5});
  const sq = marchOrder(sceneSquad()).filter(id => !(c4 && id === 'kaedra')); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .66, .5); };

/* a dry wash cut into the plain: steep banks of dust and stone, a darker seep in its bed, bhederin round it, painted riders on the far lip
   against the sky before the fight; after it the outriders' spare horses loaded with meat; smoke standing up far off north */
SCENEX.b9_c4_wash = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, done = !!f.b9_c4_forageDone;
  ctx.drawImage(sceneLayer('b94:wash', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false);
    for (let i = 0; i < 3; i++) { x.fillStyle = 'rgba(90,84,80,.35)'; x.beginPath(); x.ellipse(W*(.7 + i*.02), hz - H*(.06 + i*.06), W*(.02 + i*.012), H*(.06 + i*.02), 0, 0, 7); x.fill(); } // smoke far off north
    x.fillStyle = vgrad(x, hz + H*.12, H*.8, [[0,'#7a6a50'],[1,'#4a3c2a']]); x.beginPath(); x.moveTo(0, hz + H*.14); x.quadraticCurveTo(W*.5, hz + H*.1, W, hz + H*.12); x.lineTo(W, H*.62); x.quadraticCurveTo(W*.5, H*.7, 0, H*.64); x.closePath(); x.fill(); // the far bank, falling into the wash
    x.fillStyle = '#9a8662'; x.beginPath(); x.moveTo(0, H*.64); x.quadraticCurveTo(W*.5, H*.7, W, H*.62); x.lineTo(W, H*.76); x.quadraticCurveTo(W*.5, H*.82, 0, H*.78); x.closePath(); x.fill(); // the wash's sandy bed
    ell(x, W*.56, H*.71, W*.1, H*.02, '#5a4a36'); ell(x, W*.56, H*.708, W*.05, H*.008, 'rgba(120,130,130,.6)'); // the seep, a gleam in it
    for (let i = 0; i < 20; i++) ell(x, W*hash(i, 9441), H*(.5 + hash(i, 9442)*.12), W*.012, H*.006, 'rgba(60,50,40,.4)'); // stones on the bank
    x.fillStyle = '#6a5a42'; x.beginPath(); x.moveTo(0, H*.78); x.quadraticCurveTo(W*.5, H*.82, W, H*.76); x.lineTo(W, H); x.lineTo(0, H); x.fill(); }), 0, 0, W, H); // the near bank
  if (!done) { [[.46, 1], [.52, -1], [.6, 1], [.66, -1], [.5, 1]].forEach(([u, d], i) => drawFigure(ctx, 'b3_c2_bhederin', W*u, H*(.7 + (i % 2)*.02), .9, t, {dir:d, phase:i, still:true})); // the herd at the seep
    [[.78, -1], [.84, -1], [.9, 1]].forEach(([u, d], i) => drawFigure(ctx, 'b3_barghast', W*u, H*.56, .85, t, {dir:d, phase:i + 2})); } // painted riders on the far lip
  else { [[.38, 1], [.46, 1]].forEach(([u, d], i) => b93aHorse(ctx, W*u, H*.76, H/90, ['#6a4a2e', '#3a2a1a'][i], d)); ctx.fillStyle = '#7a3a2a'; ctx.fillRect(W*.36, H*.67, W*.1, H*.012); drawFigure(ctx, 'b9_c4_outrider', W*.52, H*.8, 1.1, t, {dir:-1, phase:2}); } // the spare horses loaded with meat
  for (let i = 0; i < 10; i++) { const k = ((t/8000*mo + hash(i, 9451)) % 1); ctx.fillStyle = `rgba(240,216,168,${(.35*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9452)*.8) + k*W*.06, H*(.6 + hash(i, 9453)*.3) - k*H*.05, 1.3, 1.3); }
  ctx.fillStyle = 'rgba(220,200,160,.06)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* ---------------- the ground ---------------- */
/* Ch 3's road ground underneath (dry grass, the track, bare stone, thorn, tents, wagons, barrels, the horse picket, a fire, a cairn stone),
   and this chapter's pieces: a wagon of the ring, a ration crate, oxen on a picket, a water-cart, the herd's track, a seep */
TILEX.b9_c4_wastes = (ctx, ch, x, y, T, dark) => { const base = TILEX.b9_c3_road; if (!base) return; const N = !!dark;
  if ('W C X c s e'.split(' ').indexOf(ch) < 0) return base(ctx, ch, x, y, T, dark);
  base(ctx, '.', x, y, T, dark);
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === 'W') return b55Wagon(ctx, px, py, T, N);
    if (ch === 'c') return b55Cart(ctx, px, py, T, N);
    if (ch === 'C') { ell(ctx, px + T*.5, py + T*.88, T*.42, T*.08, 'rgba(0,0,0,.45)'); ctx.fillStyle = N ? '#2a2016' : '#7a5e3c'; ctx.fillRect(px + T*.2, py + T*.36, T*.6, T*.5); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = Math.max(1, T*.03); ctx.strokeRect(px + T*.2, py + T*.36, T*.6, T*.5);
      ctx.fillStyle = N ? 'rgba(200,190,170,.12)' : 'rgba(240,226,190,.45)'; ctx.fillRect(px + T*.34, py + T*.56, T*.32, T*.06); return; } // a ration crate, the brigade's mark
    if (ch === 'X') { const col = N ? '#16120e' : ['#5a3e26', '#6a4a2e', '#4a3420'][Math.floor(hash(x, y, 9461)*3)];
      ctx.strokeStyle = N ? 'rgba(150,130,100,.5)' : 'rgba(110,86,56,.8)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.lineTo(px + T, py + T*.3); ctx.stroke();
      b92aOx(ctx, px + T*.56, py + T*.86, T/26, col, hash(x, y, 9462) > .5 ? 1 : -1); return; } // thin oxen on their picket
    if (ch === 's') { for (let i = 0; i < 7; i++) { const hx = px + T*(.12 + hash(x, y, 9471 + i)*.76), hy = py + T*(.14 + hash(x, y, 9481 + i)*.72); ell(ctx, hx - T*.03, hy, T*.035, T*.05, N ? 'rgba(0,0,0,.35)' : 'rgba(70,54,34,.55)'); ell(ctx, hx + T*.03, hy, T*.035, T*.05, N ? 'rgba(0,0,0,.35)' : 'rgba(70,54,34,.55)'); } // cloven prints in the dust
      for (let i = 0; i < 4; i++) B2F.line(ctx, N ? 'rgba(90,96,70,.3)' : 'rgba(150,130,90,.6)', 1, [[px + T*(.1 + i*.24), py + T*.9], [px + T*(.2 + i*.24), py + T*.82]]); return; } // broken stems, all lying south
    if (ch === 'e') { ell(ctx, px + T*.5, py + T*.56, T*.4, T*.26, N ? '#1a1612' : '#5a4a36'); ell(ctx, px + T*.5, py + T*.54, T*.22, T*.1, N ? 'rgba(80,90,100,.4)' : 'rgba(130,140,140,.6)'); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(px + T*.42, py + T*.52, T*.1, Math.max(1, T*.02)); return; } // a seep
  }); };
/* low cover ('t') on this chapter's ground: ration crates, stacked */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b9_c4_wastes') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.88, T*.42, T*.1, 'rgba(0,0,0,.5)');
      [[.12, .5, 0], [.5, .5, 1], [.3, .2, 2]].forEach(([a, b, i]) => { ctx.fillStyle = N ? ['#2a2016', '#22190f', '#30241a'][i] : ['#7a5e3c', '#6a5034', '#8a6a44'][i]; ctx.fillRect(px + T*a, py + T*b, T*.38, T*.34); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = Math.max(1, T*.025); ctx.strokeRect(px + T*a, py + T*b, T*.38, T*.34); });
      ctx.fillStyle = N ? 'rgba(200,190,170,.1)' : 'rgba(255,240,210,.18)'; ctx.fillRect(px + T*.3, py + T*.2, T*.38, T*.03); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Nine's ground: dusk dust-brown, a low warm rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".42" cy=".44" r=".8"><stop offset="0" stop-color="#4a3c2c"/><stop offset=".6" stop-color="#2a2016"/><stop offset="1" stop-color="#140f0a"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a Bluerose lance-spear: a cavalry lance cut down for the foot, a long steel head, a blue tassel gone grey with dust under it, across
     dry grass, the warm light along the shaft */
  ART['item/b9_c4_bluerosespear'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A Bluerose lance-spear">${bg('b94bs')}
<linearGradient id="b94bs-h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef0f4"/><stop offset=".5" stop-color="#8a8e96"/><stop offset="1" stop-color="#2a2c30"/></linearGradient>
<linearGradient id="b94bs-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a878"/><stop offset="1" stop-color="#5a4430"/></linearGradient>
<linearGradient id="b94bs-t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a86b0"/><stop offset="1" stop-color="#5a5e66"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b94bs-bg)"/><path d="M0 120 L200 112 L200 150 L0 150 Z" fill="#2a2016"/>
<g stroke="#8a7a4a" stroke-width="1" opacity=".5">${Array.from({length:16}, (_, i) => `<path d="M${6 + i*12} ${132 - (i % 3)*3} l2 -${10 + (i % 4)*3}"/>`).join('')}</g>
<ellipse cx="100" cy="118" rx="80" ry="7" fill="url(#b94bs-sh)"/>
<path d="M24 122 L150 44" stroke="url(#b94bs-s)" stroke-width="6" stroke-linecap="round"/><path d="M26 120 L148 45" stroke="#f0d8a8" stroke-width="1" opacity=".5"/>
<path d="M146 46 L160 30 L190 8 L172 36 L156 54 Z" fill="url(#b94bs-h)" stroke="#140f0a" stroke-width="1.2"/><path d="M156 42 L186 12" stroke="#2a2c30" stroke-width=".8"/>
<rect x="140" y="44" width="14" height="9" rx="2" transform="rotate(-32 147 48)" fill="#4a4844" stroke="#140f0a"/>
<g transform="rotate(-32 140 58)"><path d="M132 56 Q136 76 130 86 M136 56 Q140 78 136 90 M140 56 Q142 76 142 88 M144 56 Q146 74 148 84" stroke="url(#b94bs-t)" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
<path d="M24 122 L14 130 L22 128 Z" fill="#5a5850" stroke="#140f0a"/>
<ellipse cx="110" cy="76" rx="70" ry="30" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c4_bluerosespear'] = [200, 150];
  /* a border scout's coat: a long dun felted coat laid over a ration crate, the hood falling back, dry grass stitched in loops at the
     shoulders, the warm light along its left edge */
  ART['item/b9_c4_scoutcoat'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A border scout's coat">${bg('b94sc')}
<linearGradient id="b94sc-c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a9470"/><stop offset=".55" stop-color="#6e6a4c"/><stop offset="1" stop-color="#2e2c1e"/></linearGradient>
<pattern id="b94sc-f" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r=".7" fill="#2a281c" opacity=".35"/><circle cx="5" cy="1" r=".5" fill="#c8c09a" opacity=".2"/></pattern></defs>
<rect width="200" height="150" fill="url(#b94sc-bg)"/><rect x="24" y="118" width="152" height="14" fill="#5a4430" stroke="#140f0a"/><path d="M60 122 L80 122" stroke="#d8ccb0" stroke-width="2" opacity=".4"/><ellipse cx="100" cy="118" rx="74" ry="7" fill="url(#b94sc-sh)"/>
<path d="M72 26 L128 26 L144 40 L152 118 L104 118 L100 50 L96 118 L48 118 L56 40 Z" fill="url(#b94sc-c)" stroke="#140f0a" stroke-width="1.6"/>
<path d="M72 26 L128 26 L144 40 L152 118 L104 118 L100 50 L96 118 L48 118 L56 40 Z" fill="url(#b94sc-f)"/>
<path d="M56 40 L40 76 L50 80 L62 50 Z M144 40 L160 76 L150 80 L138 50 Z" fill="url(#b94sc-c)" stroke="#140f0a" stroke-width="1.4"/>
<path d="M76 26 Q100 6 124 26 Q100 34 76 26 Z" fill="#5e5a40" stroke="#140f0a" stroke-width="1.2"/>
<g stroke="#d8c888" stroke-width="1.2" opacity=".8" fill="none">${[[58, 36], [64, 32], [70, 30], [130, 30], [136, 32], [142, 36]].map(([x, y], i) => `<path d="M${x} ${y} q${i < 3 ? -3 : 3} -10 ${i < 3 ? -1 : 1} -16"/><path d="M${x + 2} ${y} q${i < 3 ? -1 : 1} -8 ${i < 3 ? 2 : -2} -13"/>`).join('')}</g>
<circle cx="100" cy="30" r="3.2" fill="#3a6ab0" stroke="#140f0a" stroke-width=".8"/><circle cx="99" cy="29" r="1" fill="#c8dcf0"/>
<path d="M49 116 L57 42" stroke="#f0c888" stroke-width="1.2" opacity=".45"/><ellipse cx="96" cy="72" rx="60" ry="44" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c4_scoutcoat'] = [200, 150];
  /* a raider's bone whistle: a bird's leg-bone, polished brown, a cut mouth and one hole, on a greasy thong coiled on dry ground */
  ART['item/b9_c4_bonewhistle'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A raider's bone whistle">${bg('b94bw')}
<linearGradient id="b94bw-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d8b0"/><stop offset=".55" stop-color="#a8885a"/><stop offset="1" stop-color="#4a3420"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b94bw-bg)"/><path d="M0 110 Q100 100 200 108 L200 150 L0 150 Z" fill="#3a2e20"/>
<g fill="#5a4a36">${[[30, 124], [62, 132], [150, 128], [176, 120], [110, 136]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="3"/>`).join('')}</g>
<ellipse cx="100" cy="108" rx="70" ry="8" fill="url(#b94bw-sh)"/>
<path d="M40 100 Q30 80 52 70 Q80 60 70 86 Q62 104 96 98" fill="none" stroke="#4a3418" stroke-width="2.4"/>
<g transform="rotate(-12 120 84)"><path d="M86 78 L156 76 Q166 78 166 84 Q166 90 156 92 L86 90 Q78 84 86 78 Z" fill="url(#b94bw-b)" stroke="#140f0a" stroke-width="1.2"/>
<ellipse cx="164" cy="84" rx="3" ry="6" fill="#2a1a0e"/><path d="M88 80 L154 78" stroke="#fff4dc" stroke-width="1" opacity=".55"/>
<path d="M98 78 L106 78 L104 84 Z" fill="#1a1008"/><circle cx="130" cy="84" r="2.6" fill="#1a1008"/>
<ellipse cx="86" cy="84" rx="4" ry="6" fill="#c8b088" stroke="#2a1a0e"/><path d="M90 79 Q92 84 90 89" stroke="#4a3418" stroke-width="1.6" fill="none"/></g>
<ellipse cx="110" cy="80" rx="62" ry="30" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c4_bonewhistle'] = [200, 150];
}
