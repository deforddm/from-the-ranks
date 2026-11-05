/* ============ Book Four, Chapter 5 art: The Wall — the Whirlwind Wall, the old sea floor of Raraku, the seep, the canal city ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/70d, lit from the left: the Whirlwind's riders (veiled to the eyes in robes the colour of
   the storm, the tails of the veil and robe blown out behind), their water-master, and the deserters out of Sha'ik's army (the green cloth
   gone to a rag, pale squares where the badges were cut off). Three grounds (TILEX): the sand short of the Wall and the Wall itself, the
   white shell floor of the old sea, and the canal city's paving, ruins and dry canals. Six backdrops (SCENEX, sceneLayer for the still
   parts, REDUCE() holding the rest still): b4_wall_fire redrawn, the Wall over the column, the Wall drawing back a mile off, the old sea
   floor, the seep under its coral, the canal city at dusk. And the chapter's gear on Book Four's sand-and-iron ground. Grim things stay
   distant: the 10th's dead are never drawn, the road of standing stones is stones. */

/* ---------------- figures ---------------- */
/* a veil wound the deep-desert way: over the crown, round the jaw and across the mouth and nose, a slit for the eyes, a tail blown back */
function b45Veil(ctx, c, sh, sw, grey){ ctx.fillStyle = c; ctx.beginPath(); ctx.arc(0, -11.8, 5.3, Math.PI*.9, Math.PI*2.1); ctx.fill(); ctx.fillRect(-5.3, -12.4, 10.6, 8.6); ell(ctx, 0, -6.6, 5.1, 3.2, c); // the head wound round
  ctx.fillStyle = sh; ctx.fillRect(-5.1, -9.2, 10.2, .7); ctx.fillRect(-4.6, -7, 9.2, .5); ctx.fillStyle = 'rgba(255,240,210,.18)'; ctx.fillRect(-5, -15.4, 3, 7); // its folds, lit from the left
  ctx.fillStyle = grey ? '#7a6a5a' : '#5a3e2a'; ctx.fillRect(-3.8, -12.2, 8.4, 2.1); h45Eyes(ctx, -11.2); // the eye-slit, the skin of the brow in it, and the eyes
  poly(ctx, [[-4.6, -12.6], [-6.2, -10.2], [-11 - sw*1.4, -8.6 - sw], [-12.2 - sw*1.8, -6.4 - sw*.6], [-8.4 - sw, -7.4], [-5, -8]], c); ctx.fillStyle = sh; poly(ctx, [[-6.2, -10.2], [-11 - sw*1.4, -8.6 - sw], [-10.4 - sw*1.2, -7.8 - sw*.8], [-6, -9.2]], sh); } // the tail, streaming
function h45Eyes(ctx, y){ ctx.fillStyle = 'rgba(255,236,200,.85)'; ctx.fillRect(-2.4, y - .5, 1.6, .9); ctx.fillRect(1.6, y - .5, 1.6, .9); ctx.fillStyle = '#140c08'; ctx.fillRect(-1.7, y - .5, .9, .9); ctx.fillRect(2.3, y - .5, .9, .9); }
/* the grit going by a figure in the wind, low and fast (still when motion is reduced) */
function b45Grit(ctx, t, o){ if (o.still || REDUCE()) return; for (let i = 0; i < 3; i++) { const k = ((t/700 + i/3 + (o.phase || 0)*.13) % 1), y = 6 + i*2.6; ctx.fillStyle = `rgba(232,210,160,${(.35*Math.sin(k*Math.PI)).toFixed(2)})`; ctx.fillRect(14 - k*30, y, 5, .5); } }
function b45Rider(ctx, h, t, o, kind){ ctx.save(); B2F.grow(ctx, 1, 1.04);
  const robe = kind === 'water' ? ['#8a8680', '#3a3834'] : b2Pick(o, [['#a8885c', '#4a3820'], ['#8a6e4e', '#3a2a1a'], ['#b0946a', '#5a4428'], ['#7a6650', '#2e2418']]), sw = o.still ? 0 : Math.sin(t/260 + (o.phase || 0))*.8 + .6;
  const veil = kind === 'water' ? ['#9a968e', '#5a5650'] : b2Pick(o, [['#b8a888', '#6a5a40'], ['#9a8a6e', '#4a3e2a'], ['#c0aa80', '#6e5a3a']]), sash = b2Pick(o, ['#7a2a1e', '#2a3a5a', '#5a3a1a', '#6a5a2a']);
  if (kind === 'blade' && (o.phase || 0) % 3 === 1) { B2F.line(ctx, '#5a4026', 1.2, [[8.4, 12.6], [10, -23]]); poly(ctx, [[10.2,-28.6],[9.3,-22.6],[11,-22.6]], '#cfc8b6'); B2F.line(ctx, sash, .9, [[10, -22], [10.8 - sw*1.6, -20.4], [10.2 - sw*2.2, -18]]); } // a lance, a strip of cloth at the blade
  if (kind === 'water') { B2F.line(ctx, '#1e1814', 1.5, [[8.6, 12.6], [9.6, -20]]); ell(ctx, 9.6, -20.6, 1.4, 1.1, '#2a221c'); ctx.strokeStyle = 'rgba(220,210,190,.45)'; ctx.lineWidth = .4; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(8.8 + i*.2, 4 - i*5); ctx.lineTo(10 + i*.2, 3.4 - i*5); } ctx.stroke(); } // the sea-wood staff, marked
  if (kind === 'bow') { ctx.fillStyle = '#4a3420'; poly(ctx, [[-7.6, -7.6], [-5.8, -8.4], [-3.4, 4], [-5.4, 4.6]], '#4a3420'); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-7.4, -9.6, .6, 2.4); ctx.fillRect(-6.4, -10, .6, 2.6); } // a quiver across the back
  // the robe, to the ankle, its hem blown back behind
  ctx.fillStyle = '#3a2c1e'; ctx.fillRect(-4.5, 9, 3.4, 4); ctx.fillRect(1.1, 9, 3.4, 4); // boots under it
  poly(ctx, [[-6.4, -6], [6.4, -6], [7.4, 9.6], [2, 10.4], [-2, 9.8], [-7.2 - sw*1.4, 10.8], [-10.4 - sw*2.4, 9 + sw*.4], [-7.6, 6]], h.armor(robe[0], robe[1]));
  ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(-2, -4); ctx.lineTo(-3.6 - sw, 9.4); ctx.moveTo(2.6, -4); ctx.lineTo(3.2, 9.6); ctx.stroke(); ctx.fillStyle = 'rgba(255,240,210,.14)'; ctx.fillRect(-6, -5.4, 1.6, 12); // folds
  ctx.fillStyle = sash; ctx.fillRect(-6.8, 1.6, 13.6, 1.8); poly(ctx, [[-6.6, 2], [-9 - sw*1.6, 3.6 + sw*.4], [-8.6 - sw*1.2, 5], [-6.4, 3.4]], sash); // a sash, its end blown out
  ctx.fillStyle = robe[0]; ctx.fillRect(-8.6, -5, 2.4, 6.4); ctx.fillRect(6.2, -5, 2.4, 6.2); ell(ctx, 7.4, 1.6, 1.2, 1.2, '#6a4a32'); // sleeves, a hand
  if (kind === 'blade' && (o.phase || 0) % 3 !== 1) B2F.curved(ctx, '#cac2b0', .95); // a tulwar
  if (kind === 'bow') { ctx.save(); ctx.translate(.4, 0); B2F.bow(ctx, 8.4, -12, 7); ctx.restore(); } // a short horn bow
  if (kind === 'blade' && o.phase % 2 === 0) { ctx.beginPath(); ctx.ellipse(-8.2, -.4, 3.4, 4.2, 0, 0, 7); ctx.fillStyle = h.armor('#6a5a44', '#2a2014'); ctx.fill(); ctx.strokeStyle = '#a8905a'; ctx.lineWidth = .6; ctx.stroke(); } // a small round hide shield, studded
  b45Veil(ctx, veil[0], veil[1], sw, kind === 'water');
  if (kind === 'water') { ctx.strokeStyle = 'rgba(200,196,186,.5)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(-3, -3.6); ctx.lineTo(-2.4, -1); ctx.moveTo(-.6, -3.4); ctx.lineTo(-.4, -.6); ctx.stroke(); } // a grey beard escaping the veil
  b45Grit(ctx, t, o); ctx.restore(); }
function b45Deserter(ctx, h, t, o, kind){ ctx.save(); B2F.grow(ctx, .97, 1);
  const rb = b2Pick(o, [['#6a5a44', '#2a2218'], ['#5a4e3e', '#221c14'], ['#74604a', '#2e2418']]), sk = b2Pick(o, ['#8a6448', '#7a5a40', '#946e4e']), lead = kind === 'lead', sw = o.still ? 0 : Math.sin(t/400 + (o.phase || 0))*.5;
  if (!lead) { ell(ctx, -6.6, -2, 3.8, 5, h.armor('#5a4a32', '#20180e')); ctx.fillStyle = 'rgba(190,186,170,.5)'; ctx.fillRect(-8.6, -6.2, 1, .6); ctx.fillRect(-7, -6.6, 1.2, .6); ctx.fillStyle = '#2a1e12'; ctx.fillRect(-7.4, -7.2, 2.2, 1); } // a sack on the back, tied off, something iron at the mouth
  ctx.fillStyle = sk; ctx.fillRect(-4.5, 6, 3.4, 7); ctx.fillRect(1.1, 6, 3.4, 7); ctx.fillStyle = '#5a4a36'; ctx.fillRect(-4.6, 8.6, 3.6, 1); ctx.fillRect(1, 9.4, 3.6, 1); ctx.fillRect(-4.6, 11.4, 3.6, .9); ctx.fillStyle = '#2a2014'; ctx.fillRect(-4.6, 12, 3.6, 1); ctx.fillRect(1, 12, 3.6, 1); // shins bound in rag, sandals
  poly(ctx, [[-6.2, -6], [6.2, -6], [7, 7], [4.4, 8.4], [3, 7.2], [1, 8.6], [-1.4, 7.4], [-3.6, 8.8], [-5.2, 7.2], [-7, 7.8]], h.armor(rb[0], rb[1])); // a robe to the knee, its hem in tatters
  ctx.fillStyle = 'rgba(214,200,170,.28)'; ctx.fillRect(-4.8, -4.4, 2.6, 2.2); ctx.fillRect(1.8, -4.6, 2.6, 2.2); ctx.strokeStyle = 'rgba(30,20,10,.6)'; ctx.lineWidth = .3; ctx.strokeRect(-4.8, -4.4, 2.6, 2.2); ctx.strokeRect(1.8, -4.6, 2.6, 2.2); // pale squares where the badges were cut off
  if (lead) { ctx.fillStyle = '#8a2a1e'; poly(ctx, [[-6, -6], [-3.4, -6], [6.4, 4.6], [5.6, 6.4]], '#8a2a1e'); ctx.fillStyle = 'rgba(255,200,170,.2)'; poly(ctx, [[-6, -6], [-4.8, -6], [5.8, 5.2], [5.6, 6.4]], ctx.fillStyle); ctx.fillStyle = 'rgba(230,214,180,.45)'; [[-1.8, -2.4], [.6, 0], [3, 2.4]].forEach(([x, y]) => ctx.fillRect(x, y, 1.4, 1.4)); } // an officer's sash, the badges gone off it
  ctx.fillStyle = '#2a5e28'; ctx.fillRect(-6.6, 1.4, 13.2, 1.4); poly(ctx, [[-6.4, 1.6], [-8.6, 5.4 + sw], [-7.8, 5.8 + sw], [-6.8, 4.2], [-7.4, 6.6 + sw], [-6.2, 2.8]], '#3e8a3a'); // the green cloth, gone to a rag at the waist
  ctx.fillStyle = rb[0]; ctx.fillRect(-8.6, -5, 2.4, 6.4); ctx.fillRect(6.2, -5, 2.4, 6.2); ell(ctx, 7.4, 1.6, 1.2, 1.2, sk);
  if (kind === 'sling') { const a = o.still ? .6 : t/160 + (o.phase || 0), ex = 7.4 + Math.cos(a)*3.8, ey = -2 + Math.sin(a)*3.8; ctx.strokeStyle = '#6a5438'; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(7.4, 1.2); ctx.lineTo(ex, ey); ctx.stroke(); ell(ctx, ex, ey, 1.1, 1, '#8a8478'); } // a sling, whirling
  else B2F.curved(ctx, lead ? '#d0c8b6' : '#a8a092', lead ? 1.1 : .9); // a tulwar, notched
  h.head(sk, 4.3, -11.2); h.look('rgba(16,10,6,.9)', -11.4); ctx.fillStyle = 'rgba(40,24,16,.45)'; ctx.fillRect(-3.4, -8.8, 7, 1.6); // stubble, hollow cheeks
  B2F.cloth(ctx, lead ? '#5a4a3a' : b2Pick(o, ['#7a6a52', '#6a5e4a', '#5a4a38']), '#2a2016'); // a head-cloth, dirty
  if (lead) { ctx.fillStyle = '#1a120c'; ctx.fillRect(-3.4, -7.4, 7, 2); } // a beard
  ctx.restore(); }
Object.assign(FIGX, {
  /* a rider of the Whirlwind in the sand: veiled to the eyes, a robe the colour of the storm, a sash, a tulwar or a lance, a hide shield */
  b4_c5_rider(ctx, h, t, o){ b45Rider(ctx, h, t, o, 'blade'); },
  /* the same, with a short horn bow and a quiver across the back */
  b4_c5_riderbow(ctx, h, t, o){ b45Rider(ctx, h, t, o, 'bow'); },
  /* the water-master at the seep: older, a grey veil, a grey beard escaping it, a staff of black sea-wood cut with marks */
  b4_c5_waterman(ctx, h, t, o){ b45Rider(ctx, h, t, o, 'water'); },
  /* a deserter out of Sha'ik's army: a robe to the knee in tatters, the green cloth a rag at the waist, the badges cut off, a sack, a tulwar */
  b4_c5_deserter(ctx, h, t, o){ b45Deserter(ctx, h, t, o, 'blade'); },
  /* the same, with a sling */
  b4_c5_desbow(ctx, h, t, o){ b45Deserter(ctx, h, t, o, 'sling'); },
  /* their leader: bigger, bearded, an officer's sash with the badges gone off it, a heavy tulwar */
  b4_c5_desleader(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.08, 1.06); b45Deserter(ctx, h, t, o, 'lead'); ctx.restore(); },
});

/* ---------------- ground: TILEX ----------------
   b4_c5_wall: the sand short of the Wall, and the Wall: '.' sand in ripples, ',' blown sand going by in streaks, '#' or 'R' a red rock, wind-cut, with sand
     drifted to its knee, 'S' drift: a dune's flank where it meets the camp, the Wall itself where the S lies two deep, 'F'/'f'
     fires, '=' a tent, 'W' a water wagon (the Odhan's), 'L' a lookout cairn of red stones, 'P' the picket's sharpened stakes.
   b4_c5_seabed: the floor of the old sea: '.' white shell ground fine as meal, ',' whole shells, '#' a coral head, 's' a ship turned to
     stone (its hull read from its neighbours), 'w' the seep, 'r' the old road of fitted stone, 'c' a bank of shells with a big conch,
     'm' a marker stone cut with the water-sellers' marks. In a fight 't' is a great fish's rib-arch standing out of the shell (at the rearguard, a water wagon).
   b4_c5_canal: the canal city: '.' paving, '#' ruin (fitted blocks, broken at the top), '~' a dry canal (its walls read from its
     neighbours), '-' a broken bridge over it, 'g' a standing stone of the western road. In a fight 'o' is the dry canal and 't' fallen
     masonry. Dark is dusk here: the stone goes rose and violet, not blue. */
const b45At = (x, y, c) => !!tileMap && !!tileMap[y] && tileMap[y][x] === c;
const b45In = (x, y, cs) => !!tileMap && !!tileMap[y] && cs.includes(tileMap[y][x]);
function b45Ripples(ctx, x, y, T, col, k = 1){ const px = x*T, py = y*T; ctx.strokeStyle = col; ctx.lineWidth = Math.max(1, T*.022); // ripples laid in world space, so they run on across tiles, wavering
  for (let i = 0; i < 2; i++) { const yy = py + T*(.28 + i*.46) + Math.sin(x*.9 + y*1.3 + i*2)*T*.08; ctx.beginPath(); ctx.moveTo(px, yy + Math.sin(x*1.9 + y*.7 + i)*T*.07);
    ctx.bezierCurveTo(px + T*.33, yy - T*.1*k + Math.sin(x*3.1 + i)*T*.05, px + T*.66, yy + T*.06*k + Math.sin(x*2.3 + y + i)*T*.05, px + T, yy + Math.sin((x + 1)*1.9 + y*.7 + i)*T*.07); ctx.stroke(); } }
function b45Sand(ctx, x, y, T, N){ const px = x*T, py = y*T, h = hash(x, y);
  ctx.fillStyle = N ? shade('#3a3532', (h - .5)*.06) : shade('#c8ae7e', (h - .5)*.05); ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, N ? .06 : .12, N ? .26 : .1, N ? '214,196,180' : '255,240,205', 1.3);
  b45Ripples(ctx, x, y, T, N ? 'rgba(10,6,4,.4)' : 'rgba(140,108,66,.22)'); b45Ripples(ctx, x, y + .05, T, N ? 'rgba(200,180,160,.1)' : 'rgba(255,244,214,.26)');
  ctx.fillStyle = N ? '#18161a' : '#8a7050'; for (let i = 0; i < 3; i++) ctx.fillRect(px + hash(x, y, i + 20)*T, py + hash(y, x, i + 21)*T, Math.max(1, T*.035), Math.max(1, T*.035)); }
function b45Blown(ctx, x, y, T, N){ b45Sand(ctx, x, y, T, N); const px = x*T, py = y*T; for (let i = 0; i < 5; i++) { const yy = py + T*(.1 + hash(x, y, i + 50)*.8), x0 = px + hash(y, x, i + 51)*T*.5, l = T*(.3 + hash(x, y, i + 52)*.5);
    const g = ctx.createLinearGradient(x0, 0, x0 + l, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.5, N ? 'rgba(160,150,170,.16)' : 'rgba(250,236,200,.5)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x0, yy, l, Math.max(1, T*.025)); } }
function b45Drift(ctx, x, y, T, N){ const px = x*T, py = y*T, up = b45At(x, y - 1, 'S'), dn = b45At(x, y + 1, 'S'), row = tileMap && tileMap[y], full = !N && !!row && /^S+$/.test(row);
  if (full) { // a full row of it by day is the Wall itself (the camp's drifts are its border at night) // the Wall itself: a river of sand going sideways, brass-dark, streaked
    const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, N ? '#1a1614' : '#6a4e30'); g.addColorStop(1, N ? '#241e1a' : '#8a6a42'); ctx.fillStyle = g; ctx.fillRect(px, py, T, T);
    for (let i = 0; i < 7; i++) { const yy = py + hash(x, y, i + 60)*T, l = T*(.4 + hash(x, y, i + 61)*.9); ctx.fillStyle = N ? `rgba(90,74,54,${(.2 + hash(x, y, i + 62)*.2).toFixed(2)})` : `rgba(214,170,104,${(.2 + hash(x, y, i + 62)*.3).toFixed(2)})`; ctx.fillRect(px - T*.2 + hash(y, x, i + 63)*T*.6, yy, l, Math.max(1, T*.03)); }
    if (!(row && tileMap[y + 1] && /^S+$/.test(tileMap[y + 1]))) { const g2 = ctx.createLinearGradient(0, py + T*.5, 0, py + T); g2.addColorStop(0, 'rgba(0,0,0,0)'); g2.addColorStop(1, N ? 'rgba(60,50,44,.6)' : 'rgba(220,190,140,.75)'); ctx.fillStyle = g2; ctx.fillRect(px, py + T*.5, T, T*.5); } // where it drops what it carries
    return; }
  b45Sand(ctx, x, y, T, N); // a drift's flank: a rounded hump of sand with its crest lit and its lee in shadow, its open sides falling away
  const l = b45At(x - 1, y, 'S'), r = b45At(x + 1, y, 'S'), top = up ? py : py + T*(.12 + hash(x, y, 70)*.12), g = ctx.createLinearGradient(px, top, px + T*.4, py + T); g.addColorStop(0, N ? '#4a423e' : '#dcc496'); g.addColorStop(1, N ? '#2a2422' : '#a88a5c'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(px, py + T); if (l) ctx.lineTo(px, top + T*.08); else ctx.quadraticCurveTo(px + T*.04, top + T*.3, px + T*.3, top + T*.06);
  ctx.quadraticCurveTo(px + T*.5, top - T*.04, r ? px + T : px + T*.7, top + T*(r ? .1 : .06)); if (r) ctx.lineTo(px + T, py + T); else ctx.quadraticCurveTo(px + T*.96, top + T*.3, px + T, py + T); ctx.closePath(); ctx.fill();
  if (!up) { ctx.strokeStyle = N ? 'rgba(200,180,170,.16)' : 'rgba(255,246,222,.6)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(l ? px : px + T*.3, top + T*.07); ctx.quadraticCurveTo(px + T*.5, top - T*.04, r ? px + T : px + T*.7, top + T*.08); ctx.stroke(); }
  if (!dn) { ctx.fillStyle = N ? 'rgba(0,0,0,.3)' : 'rgba(90,64,36,.22)'; ctx.fillRect(px, py + T*.86, T, T*.14); } }
function b45Cairn(ctx, x, y, T, N){ const px = x*T, py = y*T, cx = px + T*.5, by = py + T*.88; ell(ctx, cx + T*.08, by, T*.34, T*.08, N ? 'rgba(0,0,0,.5)' : 'rgba(80,50,26,.35)');
  [[0, 0, .3], [-.17, -.05, .17], [.17, -.04, .16], [-.07, -.22, .18], [.09, -.24, .15], [0, -.4, .13], [0, -.53, .09]].forEach(([dx, dy, r], i) => { ell(ctx, cx + dx*T, by + dy*T - T*.06, r*T*.62, r*T*.44, N ? (i % 2 ? '#3a2c2a' : '#2c2220') : (i % 2 ? '#a8603c' : '#8a4a2e')); ell(ctx, cx + dx*T - r*T*.16, by + dy*T - T*.1, r*T*.3, r*T*.16, N ? 'rgba(200,160,140,.12)' : 'rgba(255,226,196,.35)'); }); }
function b45Stakes(ctx, x, y, T, N){ const px = x*T, py = y*T; ctx.fillStyle = N ? 'rgba(0,0,0,.3)' : 'rgba(110,80,48,.3)'; ctx.fillRect(px, py + T*.78, T, T*.12); // the scrape behind them
  for (let i = 0; i < 3; i++) { const bx = px + T*(.18 + i*.32), by = py + T*.82, tx = bx + T*.14, ty = py + T*(.18 + hash(x, y, i)*.1); ctx.strokeStyle = N ? '#3a2e24' : '#6a4a2a'; ctx.lineWidth = Math.max(1.4, T*.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(tx, ty); ctx.stroke(); ctx.strokeStyle = N ? '#5a4c40' : '#c8a878'; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); ctx.moveTo(tx - T*.03, ty + T*.08); ctx.lineTo(tx, ty); ctx.stroke(); ctx.lineCap = 'butt'; } } // sharpened stakes leaning out toward the Wall
function b45Boulder(ctx, x, y, T, N, k){ const px = x*T, py = y*T, cx = px + T*.5, by = py + T*.9, h = hash(x, y, 77); ell(ctx, cx + T*.1, by, T*.44*k, T*.1, N ? 'rgba(0,0,0,.5)' : 'rgba(90,60,30,.35)');
  const g = ctx.createRadialGradient(cx - T*.18, by - T*.5*k, T*.04, cx, by - T*.3*k, T*.5*k); g.addColorStop(0, N ? '#5a3c32' : '#c87a52'); g.addColorStop(.6, N ? '#3a241e' : '#9a5236'); g.addColorStop(1, N ? '#1a100c' : '#5a2c1a'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(cx - T*.42*k, by); ctx.quadraticCurveTo(cx - T*.46*k, by - T*.5*k, cx - T*.16*k, by - T*(.66 + h*.12)*k); ctx.quadraticCurveTo(cx + T*.14*k, by - T*.78*k, cx + T*.36*k, by - T*.5*k); ctx.quadraticCurveTo(cx + T*.48*k, by - T*.2*k, cx + T*.4*k, by); ctx.closePath(); ctx.fill(); // a wind-cut red rock
  ctx.strokeStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(80,36,20,.4)'; ctx.lineWidth = Math.max(1, T*.025); for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(cx - T*.38*k, by - T*(.22 + i*.2)*k); ctx.quadraticCurveTo(cx, by - T*(.28 + i*.2)*k, cx + T*.4*k, by - T*(.2 + i*.2)*k); ctx.stroke(); } // its bedding
  ctx.fillStyle = N ? 'rgba(58,53,50,.95)' : 'rgba(212,186,138,.95)'; ctx.beginPath(); ctx.moveTo(cx - T*.46*k, by + T*.02); ctx.quadraticCurveTo(cx - T*.3*k, by - T*.24*k, cx - T*.08*k, by - T*.1*k); ctx.quadraticCurveTo(cx + T*.2*k, by - T*.02, cx + T*.46*k, by + T*.02); ctx.closePath(); ctx.fill(); } // sand drifted to its knee
function b45Tent(ctx, x, y, T, N){ const px = x*T, py = y*T, cx = px + T*.5, by = py + T*.86; ell(ctx, cx + T*.1, by, T*.46, T*.1, N ? 'rgba(0,0,0,.45)' : 'rgba(70,46,26,.35)'); // a tent of the 9th, the flap tied back
  poly(ctx, [[px + T*.06, by], [cx, py + T*.14], [px + T*.94, by]], N ? '#3e3834' : '#c8b48c'); poly(ctx, [[cx, py + T*.14], [px + T*.94, by], [cx + T*.14, by]], N ? '#221e1c' : '#8a7454'); poly(ctx, [[cx - T*.12, by], [cx, py + T*.5], [cx + T*.1, by]], N ? '#0a0806' : '#2a1e12');
  ctx.fillStyle = N ? 'rgba(80,70,64,.6)' : 'rgba(212,190,140,.7)'; ctx.fillRect(px + T*.1, by - T*.06, T*.8, T*.06); } // sand drifted against its skirts
function b45Fire(ctx, x, y, T, N){ const cx = x*T + T*.5, cy = y*T + T*.6; for (let i = 0; i < 7; i++) { const a = i/7*6.28; ell(ctx, cx + Math.cos(a)*T*.26, cy + Math.sin(a)*T*.16, T*.07, T*.05, N ? '#2e2a2a' : '#7a6a54'); } // a fire in its ring of stones
  if (N) b2Flames(ctx, cx, cy, T, 1); else { ell(ctx, cx, cy, T*.15, T*.08, '#2a1c10'); b2Flames(ctx, cx, cy, T, .55); } }
function b45WallTile(ctx, ch, x, y, T, N){ const px = x*T, py = y*T;
  if (ch === 'S') return b45Drift(ctx, x, y, T, N);
  if (ch === ',') return b45Blown(ctx, x, y, T, N);
  if (ch === 'L') { b45Sand(ctx, x, y, T, N); return b45Cairn(ctx, x, y, T, N); }
  if (ch === 'P') { b45Sand(ctx, x, y, T, N); return b45Stakes(ctx, x, y, T, N); }
  if (ch === '#' || ch === 'R') { b45Sand(ctx, x, y, T, N); b45Boulder(ctx, x, y, T, N, 1); return; } // red rock, sand drifted up its foot ('R' in the maps: a rock that stands free, without the wall-shadow the engine lays under '#')
  if ('F=Wf'.includes(ch)) { b45Sand(ctx, x, y, T, N); if (ch === 'W') b2Wagon(ctx, px, py, T, N); else if (ch === '=') b45Tent(ctx, x, y, T, N); else b45Fire(ctx, x, y, T, N); if (N) b2Firelit(ctx, x, y, T, .34, 3.2, '255,150,70'); return; } // fires, tents and wagons on the sand
  b45Sand(ctx, x, y, T, N); if (ch !== '.' && ch !== 't' && ch !== 'o') exitArrow(ctx, ch, px, py, T); if (N) b2Firelit(ctx, x, y, T, .34, 3.2, '255,150,70'); }
TILEX.b4_c5_wall = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { b45WallTile(ctx, ch, x, y, T, !!dark); if (dark && !'F=Wf.'.includes(ch)) b2Firelit(ctx, x, y, T, .34, 3.2, '255,150,70'); }); // the fires light the rocks and drifts too

function b45Shell(ctx, x, y, T, N){ const px = x*T, py = y*T, h = hash(x, y);
  ctx.fillStyle = N ? shade('#3a3a40', (h - .5)*.05) : shade('#c6bca6', (h - .5)*.06); ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, N ? .03 : .16, N ? .2 : .16, N ? '200,206,230' : '255,252,240', 1.4);
  for (let i = 0; i < 9; i++) { const sx = px + hash(x, y, i + 10)*T, sy = py + hash(y, x, i + 11)*T; ctx.fillStyle = N ? (i % 2 ? '#4a4a52' : '#28282e') : (i % 3 ? 'rgba(255,255,250,.8)' : 'rgba(120,110,92,.6)'); ctx.fillRect(sx, sy, Math.max(1, T*.035), Math.max(1, T*.025)); } // shell grit
  ctx.strokeStyle = N ? 'rgba(0,0,0,.18)' : 'rgba(150,136,110,.22)'; ctx.lineWidth = 1; ctx.beginPath(); for (let i = 0; i < 2; i++) { const sx = px + hash(x, y, i + 30)*T, sy = py + hash(y, x, i + 31)*T; ctx.moveTo(sx, sy); ctx.lineTo(sx + (hash(x, y, i + 32) - .5)*T*.4, sy + (hash(x, y, i + 33) - .5)*T*.3); } ctx.stroke(); // hairline cracks in the crust
  b45PoolOver(ctx, x, y, T, N);
  if (b45In(x - 1, y, '#s')) { const g = ctx.createLinearGradient(px, 0, px + T*.4, 0); g.addColorStop(0, N ? 'rgba(0,0,0,.4)' : 'rgba(90,80,70,.28)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(px, py, T*.4, T); } }
function b45Spiral(ctx, cx, cy, r, a, N, pink){ ctx.save(); ctx.translate(cx, cy); ctx.rotate(a); ell(ctx, r*.1, r*.2, r*1.05, r*.5, N ? 'rgba(0,0,0,.35)' : 'rgba(110,96,80,.3)');
  ctx.fillStyle = N ? '#5a5860' : '#f0e6d4'; ctx.beginPath(); ctx.moveTo(-r, 0); ctx.quadraticCurveTo(-r*.2, -r*.9, r*.9, -r*.2); ctx.quadraticCurveTo(r*.5, r*.6, -r, 0); ctx.fill();
  if (pink) { ctx.fillStyle = N ? '#6a5a60' : '#e8a898'; ctx.beginPath(); ctx.moveTo(-r*.6, 0); ctx.quadraticCurveTo(0, -r*.4, r*.6, -r*.1); ctx.quadraticCurveTo(r*.2, r*.3, -r*.6, 0); ctx.fill(); }
  ctx.strokeStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(150,120,96,.6)'; ctx.lineWidth = Math.max(.6, r*.08); ctx.beginPath(); for (let i = 0; i < 3; i++) { ctx.moveTo(-r*(.7 - i*.25), -r*.05); ctx.quadraticCurveTo(-r*(.5 - i*.25), -r*.5, -r*(.2 - i*.25), -r*.55); } ctx.stroke(); ctx.restore(); }
function b45Shells(ctx, x, y, T, N){ b45Shell(ctx, x, y, T, N); const px = x*T, py = y*T; for (let i = 0; i < 4; i++) b45Spiral(ctx, px + T*(.2 + hash(x, y, i + 80)*.6), py + T*(.2 + hash(y, x, i + 81)*.6), T*(.06 + hash(x, y, i + 82)*.05), hash(x, y, i + 83)*6, N, false);
  ctx.fillStyle = N ? '#4a4a52' : '#f6f0e4'; for (let i = 0; i < 6; i++) ctx.fillRect(px + hash(x, y, i + 90)*T, py + hash(y, x, i + 91)*T, Math.max(1, T*.05), Math.max(1, T*.03)); } // broken bits
function b45Coral(ctx, x, y, T, N){ b45Shell(ctx, x, y, T, N); const px = x*T, py = y*T, cx = px + T*.5, by = py + T*.92; ell(ctx, cx + T*.1, by, T*.46, T*.1, N ? 'rgba(0,0,0,.5)' : 'rgba(90,76,66,.35)');
  const lobes = [[-.24, -.2, .22], [.2, -.22, .24], [0, -.44, .26], [-.12, -.66, .17], [.16, -.62, .16], [0, -.82, .11]]; lobes.forEach(([dx, dy, r], i) => { const g = ctx.createRadialGradient(cx + dx*T - r*T*.4, by + dy*T - r*T*.4, 0, cx + dx*T, by + dy*T, r*T*1.1); g.addColorStop(0, N ? '#5a5258' : '#d8c4bc'); g.addColorStop(1, N ? '#24202a' : '#8a746e'); ell(ctx, cx + dx*T, by + dy*T, r*T, r*T*.86, g); });
  ctx.fillStyle = N ? 'rgba(0,0,0,.5)' : 'rgba(70,54,50,.5)'; for (let i = 0; i < 14; i++) { const l = lobes[i % lobes.length]; ell(ctx, cx + (l[0] + (hash(x, y, i + 100) - .5)*l[2])*T, by + (l[1] + (hash(y, x, i + 101) - .5)*l[2])*T, T*.016, T*.014, ctx.fillStyle); } } // pitted
function b45Ship(ctx, x, y, T, N){ b45Shell(ctx, x, y, T, N); const px = x*T, py = y*T, up = b45At(x, y - 1, 's'), dn = b45At(x, y + 1, 's'), l = b45At(x - 1, y, 's'), r = b45At(x + 1, y, 's');
  const top = up ? py : py + T*.18, bot = dn ? py + T : py + T*.84, x0 = l ? px : px + T*.1, x1 = r ? px + T : px + T*.9;
  if (!dn) ell(ctx, (x0 + x1)/2 + T*.06, bot, (x1 - x0)*.55, T*.08, N ? 'rgba(0,0,0,.5)' : 'rgba(90,80,70,.35)');
  const g = ctx.createLinearGradient(x0, top, x1, bot); g.addColorStop(0, N ? '#4a4850' : '#a8a296'); g.addColorStop(1, N ? '#1e1e24' : '#6a665c'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(x0, bot); ctx.lineTo(x0, top + (l ? 0 : T*.1)); ctx.quadraticCurveTo((x0 + x1)/2, top - (up ? 0 : T*.06), x1, top + (r ? 0 : T*.1)); ctx.lineTo(x1, bot); ctx.closePath(); ctx.fill(); // the hull, turned to stone
  ctx.save(); ctx.clip(); ctx.strokeStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(60,56,48,.45)'; ctx.lineWidth = Math.max(1, T*.025); for (let i = 0; i < 5; i++) { const yy = py + T*(i*.22 + .08) + (x % 2)*T*.05; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy + T*.08); ctx.stroke(); } // the planking
  ctx.strokeStyle = N ? 'rgba(130,130,150,.18)' : 'rgba(230,226,214,.45)'; ctx.lineWidth = Math.max(1, T*.02); for (let i = 0; i < 5; i++) { const yy = py + T*(i*.22 + .1) + (x % 2)*T*.05; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy + T*.08); ctx.stroke(); }
  if (hash(x, y, 5) > .45) { ctx.fillStyle = N ? '#121216' : '#4a463e'; ctx.beginPath(); ctx.ellipse(px + T*(.3 + hash(x, y, 6)*.4), py + T*.5, T*.1, T*.14, .3, 0, 7); ctx.fill(); ctx.strokeStyle = N ? '#6a6878' : '#c8c2b4'; ctx.lineWidth = Math.max(1, T*.04); ctx.beginPath(); ctx.moveTo(px + T*.2, py + T*.3); ctx.quadraticCurveTo(px + T*.5, py + T*.1, px + T*.62, py + T*.86); ctx.stroke(); } // a gap in the planks, a rib showing through
  ctx.restore(); if (!up) { ctx.strokeStyle = N ? 'rgba(160,160,190,.2)' : 'rgba(250,246,236,.6)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(x0, top + (l ? 0 : T*.1)); ctx.quadraticCurveTo((x0 + x1)/2, top - T*.06, x1, top + (r ? 0 : T*.1)); ctx.stroke(); } } // the gunwale, lit
let b45PoolSrc = null, b45PoolG = null; // the seep's shape, worked out once per map
function b45Pool(){ if (!tileMap) return null; if (tileMap === b45PoolSrc) return b45PoolG; b45PoolSrc = tileMap; let x0 = 99, y0 = 99, x1 = -1, y1 = -1;
  tileMap.forEach((row, y) => [...row].forEach((c, x) => { if (c === 'w') { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); } }));
  return (b45PoolG = x1 < 0 ? null : {cx:(x0 + x1 + 1)/2, cy:(y0 + y1 + 1)/2, rx:(x1 - x0 + 1)/2, ry:(y1 - y0 + 1)/2}); }
function b45PoolOver(ctx, x, y, T, N){ const P = b45Pool(); if (!P) return; const cx = P.cx*T, cy = P.cy*T, rx = P.rx*T, ry = P.ry*T;
  if (Math.abs(x + .5 - P.cx) > P.rx + 1.2 || Math.abs(y + .5 - P.cy) > P.ry + 1.2) return;
  ell(ctx, cx, cy, rx + T*.75, ry + T*.6, N ? 'rgba(30,28,30,.5)' : 'rgba(150,140,124,.45)'); // the shell gone grey and soft round it
  ell(ctx, cx, cy, rx + T*.28, ry + T*.22, N ? '#1c1a1a' : '#4e443a'); // the mud lip
  const g = ctx.createRadialGradient(cx - rx*.3, cy - ry*.3, 0, cx, cy, Math.max(rx, ry)); g.addColorStop(0, N ? '#10121a' : '#1a2224'); g.addColorStop(1, N ? '#040406' : '#060808'); ell(ctx, cx, cy, rx - T*.04, ry - T*.06, g); // black water
  ctx.fillStyle = N ? 'rgba(150,160,200,.2)' : 'rgba(214,230,236,.45)'; ctx.fillRect(cx - rx*.5, cy - ry*.3, rx*.6, Math.max(1, T*.03)); ctx.fillRect(cx + rx*.05, cy + ry*.25, rx*.35, Math.max(1, T*.02)); } // the sky in it
function b45Seep(ctx, x, y, T, N){ b45Shell(ctx, x, y, T, N); if (b45Pool()) return; const px = x*T, py = y*T, cx = px + T*.5, cy = py + T*.5; b45Shell(ctx, x, y, T, N);
  const wet = (dx, dy) => b45At(x + dx, y + dy, 'w'); ctx.fillStyle = N ? '#1c1a1a' : '#5a5046'; ctx.fillRect(px + (wet(-1, 0) ? 0 : T*.06), py + (wet(0, -1) ? 0 : T*.06), T - (wet(-1, 0) ? 0 : T*.06) - (wet(1, 0) ? 0 : T*.06), T - (wet(0, -1) ? 0 : T*.06) - (wet(0, 1) ? 0 : T*.06)); // the mud lip, soft and dark
  ctx.fillStyle = N ? '#060608' : '#0e1010'; ctx.fillRect(px + (wet(-1, 0) ? 0 : T*.2), py + (wet(0, -1) ? 0 : T*.2), T - (wet(-1, 0) ? 0 : T*.2) - (wet(1, 0) ? 0 : T*.2), T - (wet(0, -1) ? 0 : T*.2) - (wet(0, 1) ? 0 : T*.2)); // black water
  ctx.fillStyle = N ? 'rgba(150,160,200,.18)' : 'rgba(210,226,230,.4)'; ctx.fillRect(cx - T*.22, cy - T*.1 + hash(x, y)*T*.2, T*.3, Math.max(1, T*.02)); ctx.fillRect(cx - T*.04, cy + T*.12, T*.18, Math.max(1, T*.015)); } // the sky in it
function b45Road(ctx, x, y, T, N){ const px = x*T, py = y*T; ctx.fillStyle = N ? '#3a3840' : '#c8bea8'; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, N ? .03 : .1, N ? .2 : .08, N ? '200,206,230' : '255,250,236', .9);
  ctx.strokeStyle = N ? 'rgba(0,0,0,.45)' : 'rgba(110,96,74,.5)'; ctx.lineWidth = Math.max(1, T*.025); const rows = 3; for (let r = 0; r < rows; r++) { const yy = py + r*T/rows; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); ctx.stroke(); const off = ((y*rows + r) % 2)*.5; for (let k = 0; k < 2; k++) { const xx = px + T*((k + off) % 1.0001 + .25); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx, yy + T/rows); ctx.stroke(); } } // fitted stones, smooth
  ctx.fillStyle = N ? 'rgba(160,166,200,.08)' : 'rgba(255,252,240,.3)'; for (let r = 0; r < rows; r++) ctx.fillRect(px, py + r*T/rows + 1, T, Math.max(1, T*.02));
  if (!b45In(x - 1, y, 'rm')) { ctx.fillStyle = N ? 'rgba(58,58,64,.8)' : 'rgba(220,212,194,.8)'; ctx.fillRect(px, py, T*.1, T); } if (!b45In(x + 1, y, 'rm')) { ctx.fillStyle = N ? 'rgba(58,58,64,.8)' : 'rgba(220,212,194,.8)'; ctx.fillRect(px + T*.9, py, T*.1, T); } } // shell drifted over its edges
function b45Conch(ctx, x, y, T, N){ b45Shells(ctx, x, y, T, N); const px = x*T, py = y*T; for (let i = 0; i < 7; i++) b45Spiral(ctx, px + T*(.15 + hash(x, y, i + 110)*.7), py + T*(.35 + hash(y, x, i + 111)*.5), T*(.07 + hash(x, y, i + 112)*.05), hash(x, y, i + 113)*6, N, i % 3 === 0);
  b45Spiral(ctx, px + T*.52, py + T*.5, T*.22, -.4, N, true); } // the big conch on top of the bank
function b45Marker(ctx, x, y, T, N){ b45Road(ctx, x, y, T, N); const px = x*T, py = y*T, cx = px + T*.5, by = py + T*.9; ell(ctx, cx + T*.1, by, T*.32, T*.08, N ? 'rgba(0,0,0,.5)' : 'rgba(90,76,60,.4)');
  const g = ctx.createLinearGradient(cx - T*.28, 0, cx + T*.28, 0); g.addColorStop(0, N ? '#5a5864' : '#c8c0b0'); g.addColorStop(1, N ? '#26242c' : '#7a7266'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - T*.26, by); ctx.lineTo(cx - T*.28, py + T*.34); ctx.quadraticCurveTo(cx, py + T*.04, cx + T*.28, py + T*.32); ctx.lineTo(cx + T*.26, by); ctx.closePath(); ctx.fill(); // a marker stone, worn round as a loaf
  ctx.strokeStyle = N ? 'rgba(10,10,14,.7)' : 'rgba(60,50,40,.7)'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.arc(cx - T*.1, py + T*.42, T*.06, 0, 7); ctx.moveTo(cx - T*.17, py + T*.42); ctx.lineTo(cx - T*.03, py + T*.42); // a circle with a line through it
  ctx.moveTo(cx + T*.02, py + T*.56); for (let i = 0; i < 4; i++) ctx.quadraticCurveTo(cx + T*(.05 + i*.05), py + T*(.52 + (i % 2)*.08), cx + T*(.07 + i*.05), py + T*.56); ctx.moveTo(cx - T*.16, py + T*.7); ctx.lineTo(cx + T*.08, py + T*.7); ctx.lineTo(cx + T*.03, py + T*.66); ctx.moveTo(cx + T*.08, py + T*.7); ctx.lineTo(cx + T*.03, py + T*.74); ctx.stroke(); // a wavy line, an arrow
  ctx.fillStyle = N ? 'rgba(10,10,14,.7)' : 'rgba(60,50,40,.7)'; [0, 1, 2].forEach(i => ell(ctx, cx + T*(.08 + i*.06), py + T*.4, T*.02, T*.02, ctx.fillStyle)); } // three dots
function b45Bones(ctx, x, y, T, N){ const px = x*T, py = y*T, bc = N ? '#6a6a74' : '#efe8d8'; ell(ctx, px + T*.55, py + T*.86, T*.42, T*.08, N ? 'rgba(0,0,0,.5)' : 'rgba(90,80,70,.3)'); ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) { const bx = px + T*(.18 + i*.3); ctx.strokeStyle = bc; ctx.lineWidth = Math.max(1.6, T*.06); ctx.beginPath(); ctx.moveTo(bx, py + T*.86); ctx.quadraticCurveTo(bx + T*.04, py + T*(.2 + i*.04), bx + T*.24, py + T*(.12 + i*.06)); ctx.stroke(); ctx.strokeStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(150,136,110,.5)'; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); ctx.moveTo(bx + T*.03, py + T*.86); ctx.quadraticCurveTo(bx + T*.07, py + T*(.24 + i*.04), bx + T*.24, py + T*(.16 + i*.06)); ctx.stroke(); } ctx.lineCap = 'butt'; } // a great fish's ribs, standing out of the shell
function b45WaterWagon(ctx, x, y, T, N){ const px = x*T, py = y*T; b2Wagon(ctx, px, py, T, N); [.3, .52, .74].forEach(k => { ell(ctx, px + T*k, py + T*.42, T*.09, T*.12, N ? '#2a2018' : '#6a4a2a'); ctx.fillStyle = N ? '#4a4038' : '#9a8a6a'; ctx.fillRect(px + T*k - T*.09, py + T*.38, T*.18, T*.025); }); } // barrels lashed on the bed
function b45SeaTile(ctx, ch, x, y, T, N){ const px = x*T, py = y*T;
  if (ch === ',') return b45Shells(ctx, x, y, T, N);
  if (ch === '#') return b45Coral(ctx, x, y, T, N);
  if (ch === 's') return b45Ship(ctx, x, y, T, N);
  if (ch === 'w') return b45Seep(ctx, x, y, T, N);
  if (ch === 'r') return b45Road(ctx, x, y, T, N);
  if (ch === 'c') return b45Conch(ctx, x, y, T, N);
  if (ch === 'm') return b45Marker(ctx, x, y, T, N);
  b45Shell(ctx, x, y, T, N); if (ch !== '.' && ch !== 't' && ch !== 'o') exitArrow(ctx, ch, px, py, T); }
TILEX.b4_c5_seabed = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b45SeaTile(ctx, ch, x, y, T, !!dark));

/* the canal city: by day pale gold stone; at dusk (dark) rose and violet, the stone holding the last of the light */
const b45CP = N => N ? {pave:'#6a5258', paveL:'#8a6a6a', joint:'rgba(30,18,26,.55)', lit:'255,180,170', wall:'#7a5a5e', wallL:'#a07a76', wallD:'#3a2830', bed:'#2e2228', bedL:'#4a3a3e', shell:'rgba(220,190,190,.4)'}
                             : {pave:'#cabea4', paveL:'#e4d8bc', joint:'rgba(110,94,70,.5)', lit:'255,250,236', wall:'#bcae94', wallL:'#e0d2b4', wallD:'#7a6c58', bed:'#8a7c64', bedL:'#a8987c', shell:'rgba(250,246,236,.6)'};
function b45Pave(ctx, x, y, T, N){ const P = b45CP(N), px = x*T, py = y*T; ctx.fillStyle = shade(P.pave, (hash(x, y) - .5)*.06); ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, N ? .06 : .1, .1, P.lit, 1);
  ctx.strokeStyle = P.joint; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(px, py + T*.5); ctx.lineTo(px + T, py + T*.5); const o = (x + y) % 2 ? .3 : .7; ctx.moveTo(px + T*o, py); ctx.lineTo(px + T*o, py + T*.5); ctx.moveTo(px + T*(1 - o), py + T*.5); ctx.lineTo(px + T*(1 - o), py + T); ctx.stroke();
  if (hash(x, y, 9) > .88) { ctx.strokeStyle = P.joint; ctx.beginPath(); const fx = px + T*.5, fy = py + T*.26; ctx.ellipse(fx, fy, T*.14, T*.06, 0, 0, 7); ctx.moveTo(fx + T*.14, fy); ctx.lineTo(fx + T*.22, fy - T*.05); ctx.lineTo(fx + T*.22, fy + T*.05); ctx.closePath(); ctx.stroke(); } // a fish carved in a flag, worn soft
  ctx.fillStyle = P.shell; for (let i = 0; i < 3; i++) ctx.fillRect(px + hash(x, y, i + 40)*T, py + hash(y, x, i + 41)*T, Math.max(1, T*.03), Math.max(1, T*.02)); }
function b45Ruin(ctx, x, y, T, N){ const P = b45CP(N), px = x*T, py = y*T, up = b45At(x, y - 1, '#'), dn = b45At(x, y + 1, '#');
  b45Pave(ctx, x, y, T, N); const top = up ? py : py + T*(.06 + hash(x, y, 3)*.2), g = ctx.createLinearGradient(px, top, px + T, py + T); g.addColorStop(0, P.wallL); g.addColorStop(.55, P.wall); g.addColorStop(1, P.wallD); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(px, py + T); ctx.lineTo(px, top + (up ? 0 : T*.1*hash(x, y, 4))); if (!up) for (let i = 1; i <= 4; i++) ctx.lineTo(px + T*i/4, top + T*(hash(x, y, i + 4)*.16)); else ctx.lineTo(px + T, top); ctx.lineTo(px + T, py + T); ctx.closePath(); ctx.fill(); // fitted blocks, broken at the top
  ctx.strokeStyle = N ? 'rgba(20,10,18,.5)' : 'rgba(90,76,56,.45)'; ctx.lineWidth = Math.max(1, T*.022); for (let r = 1; r < 4; r++) { const yy = py + T*r/4; if (yy < top + T*.08) continue; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); ctx.stroke(); const o = ((y*4 + r) % 2)*.5 + .25; ctx.beginPath(); ctx.moveTo(px + T*o, yy - T/4); ctx.lineTo(px + T*o, yy); ctx.stroke(); }
  if (!up && hash(x, y, 7) > .5) { ctx.fillStyle = P.wallD; for (let i = 0; i < 3; i++) ctx.fillRect(px + T*(.2 + i*.24), top + T*.3, T*.08, T*.14); } // the carving: a row of worn shapes
  if (!dn) { ctx.fillStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(80,66,48,.3)'; ctx.fillRect(px, py + T*.88, T, T*.12); } }
function b45Canal(ctx, x, y, T, N){ const P = b45CP(N), px = x*T, py = y*T, wet = (dx, dy) => b45In(x + dx, y + dy, '~-o');
  const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, P.bed); g.addColorStop(1, shade(P.bed, -.1)); ctx.fillStyle = g; ctx.fillRect(px, py, T, T);
  ctx.fillStyle = P.shell; for (let i = 0; i < 6; i++) ctx.fillRect(px + hash(x, y, i + 50)*T, py + T*(.4 + hash(y, x, i + 51)*.55), Math.max(1, T*.04), Math.max(1, T*.02)); // the bed: shell and black weed gone to dust
  ctx.fillStyle = N ? 'rgba(10,6,10,.5)' : 'rgba(40,34,24,.45)'; for (let i = 0; i < 3; i++) { const wx = px + hash(x, y, i + 60)*T; ctx.fillRect(wx, py + T*.7, T*.14, T*.04); }
  if (!wet(0, -1)) { const fg = ctx.createLinearGradient(0, py, 0, py + T*.55); fg.addColorStop(0, P.wallD); fg.addColorStop(1, shade(P.wallD, -.35)); ctx.fillStyle = fg; ctx.fillRect(px, py, T, T*.55); ctx.strokeStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(60,50,36,.45)'; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); ctx.moveTo(px, py + T*.28); ctx.lineTo(px + T, py + T*.28); ctx.stroke(); ctx.fillStyle = P.wallL; ctx.fillRect(px, py, T, Math.max(1, T*.05)); } // the far wall's face, in its own shadow
  if (!wet(0, 1)) { ctx.fillStyle = P.wallL; ctx.fillRect(px, py + T*.92, T, T*.08); } // the near lip, lit
  if (!wet(-1, 0)) { ctx.fillStyle = N ? 'rgba(0,0,0,.3)' : 'rgba(70,58,42,.3)'; ctx.fillRect(px, py, T*.12, T); } if (!wet(1, 0)) { ctx.fillStyle = N ? 'rgba(255,190,180,.08)' : 'rgba(255,250,236,.2)'; ctx.fillRect(px + T*.88, py, T*.12, T); } }
function b45Bridge(ctx, x, y, T, N){ b45Canal(ctx, x, y, T, N); const P = b45CP(N), px = x*T, py = y*T, up = b45In(x, y - 1, '-'), dn = b45In(x, y + 1, '-');
  ell(ctx, px + T*.56, py + T*.62, T*.46, T*.2, N ? 'rgba(0,0,0,.4)' : 'rgba(40,30,20,.35)');
  const g = ctx.createLinearGradient(px + T*.1, 0, px + T*.9, 0); g.addColorStop(0, P.wallL); g.addColorStop(1, P.wall); ctx.fillStyle = g; ctx.fillRect(px + T*.1, py, T*.8, T);
  ctx.strokeStyle = N ? 'rgba(20,10,18,.5)' : 'rgba(90,76,56,.5)'; ctx.lineWidth = Math.max(1, T*.022); ctx.beginPath(); for (let i = 1; i < 3; i++) { ctx.moveTo(px + T*.1, py + T*i/3); ctx.lineTo(px + T*.9, py + T*i/3); } ctx.moveTo(px + T*.32, py + T*.2); ctx.lineTo(px + T*.5, py + T*.46); ctx.lineTo(px + T*.44, py + T*.7); ctx.stroke(); // its slabs, and a crack
  ctx.fillStyle = P.wallD; ctx.fillRect(px + T*.1, py, T*.06, T); ctx.fillRect(px + T*.84, py, T*.06, T); // the parapet stubs
  if (!up && !dn && hash(x, y, 2) > .3) { ctx.fillStyle = P.bed; ctx.beginPath(); ctx.moveTo(px + T*.9, py + T*.1); ctx.lineTo(px + T*.62, py + T*.24); ctx.lineTo(px + T*.76, py + T*.5); ctx.lineTo(px + T*.9, py + T*.44); ctx.fill(); } } // a bite out of the side where it broke
function b45Standing(ctx, x, y, T, N){ b45Pave(ctx, x, y, T, N); const px = x*T, py = y*T, cx = px + T*.5, by = py + T*.92, lean = (hash(x, y) - .5)*.3; ell(ctx, cx + T*.14, by, T*.24, T*.07, N ? 'rgba(0,0,0,.55)' : 'rgba(80,66,48,.4)');
  ctx.save(); ctx.translate(cx, by); ctx.rotate(lean); const g = ctx.createLinearGradient(-T*.12, 0, T*.12, 0); g.addColorStop(0, N ? '#8a7076' : '#b8b0a2'); g.addColorStop(1, N ? '#3a2a32' : '#6a6458'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(-T*.12, 0); ctx.lineTo(-T*.13, -T*.6); ctx.quadraticCurveTo(-T*.08, -T*.86, 0, -T*.9); ctx.quadraticCurveTo(T*.1, -T*.86, T*.12, -T*.62); ctx.lineTo(T*.11, 0); ctx.closePath(); ctx.fill(); // tall as a man, narrow as a man
  ctx.fillStyle = N ? 'rgba(255,190,180,.1)' : 'rgba(255,250,236,.25)'; ctx.fillRect(-T*.11, -T*.82, T*.04, T*.78); ctx.restore(); }
function b45CanalTile(ctx, ch, x, y, T, N){ const px = x*T, py = y*T;
  if (ch === '#') return b45Ruin(ctx, x, y, T, N);
  if (ch === '~' || ch === 'o') return b45Canal(ctx, x, y, T, N);
  if (ch === '-') return b45Bridge(ctx, x, y, T, N);
  if (ch === 'g') return b45Standing(ctx, x, y, T, N);
  b45Pave(ctx, x, y, T, N); if (ch !== '.' && ch !== 't') exitArrow(ctx, ch, px, py, T); }
TILEX.b4_c5_canal = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b45CanalTile(ctx, ch, x, y, T, !!dark));
/* a fight's low cover: at the Wall a red rock with sand drifted to its shoulder, on the sea floor a great fish's ribs, in the canal city a
   heap of fallen masonry; the canal city's drop is the dry canal itself */
function b45Rubble(ctx, x, y, T, N){ const P = b45CP(N), px = x*T, py = y*T; ell(ctx, px + T*.56, py + T*.86, T*.44, T*.1, N ? 'rgba(0,0,0,.5)' : 'rgba(80,66,48,.4)');
  [[.3, .7, .2, .14], [.62, .72, .22, .15], [.46, .5, .2, .13], [.7, .48, .12, .1]].forEach(([dx, dy, w, hh], i) => { ctx.fillStyle = i % 2 ? P.wall : P.wallL; ctx.fillRect(px + T*(dx - w), py + T*(dy - hh), T*w*2, T*hh*2); ctx.fillStyle = P.wallD; ctx.fillRect(px + T*(dx - w), py + T*(dy + hh*.6), T*w*2, T*hh*.4); }); }
{ const _df = drawFeature; drawFeature = function(ctx, ch, x, y, T, dark, style, map){ const N = !!dark;
    if (style === 'b4_c5_wall' && ch === 't') return b2Clip(ctx, x, y, T, () => b45Boulder(ctx, x, y, T, N, .85));
    if (style === 'b4_c5_seabed' && ch === 't') return b2Clip(ctx, x, y, T, () => B && B.id === 'b4_c5_rearguard' ? b45WaterWagon(ctx, x, y, T, N) : b45Bones(ctx, x, y, T, N)); // at the rearguard, the column's water wagons
    if (style === 'b4_c5_canal' && (ch === 't' || ch === 'o')) return b2Clip(ctx, x, y, T, () => ch === 'o' ? b45Canal(ctx, x, y, T, N) : b45Rubble(ctx, x, y, T, N));
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* the Wall across the whole north: a band of brass-dark sand standing up off the desert, its face streaked and moving, its top lost in
   its own haze. base is where its foot meets the ground, top where the eye loses it; lit is how much the sun is on it */
function b45WallBand(x, W, base, top, dark, lit, seed){ const g = x.createLinearGradient(0, top, 0, base); g.addColorStop(0, rgba(dark[0], .0)); g.addColorStop(.18, rgba(dark[0], .8)); g.addColorStop(.6, dark[1]); g.addColorStop(1, dark[2]); x.fillStyle = g;
  x.beginPath(); x.moveTo(0, base); for (let px = 0; px <= W + 8; px += 8) x.lineTo(px, top + Math.sin(px/W*9 + seed)*(base - top)*.05 + Math.sin(px/W*23 + seed*2)*(base - top)*.02); x.lineTo(W, base); x.closePath(); x.fill();
  for (let i = 0; i < 90; i++) { const yy = top + (base - top)*(.12 + Math.pow(hash(i, seed), .8)*.88), l = W*(.06 + hash(i, seed + 1)*.3); x.fillStyle = `rgba(${lit},${(.05 + hash(i, seed + 2)*.12).toFixed(2)})`; x.fillRect(hash(i, seed + 3)*W - l*.3, yy, l, 1 + hash(i, seed + 4)*2); } // streaks of moving sand, sideways
  for (let i = 0; i < 14; i++) { const cx = hash(i, seed + 5)*W, cy = top + (base - top)*(.3 + hash(i, seed + 6)*.5); glow(x, cx, cy, (base - top)*(.2 + hash(i, seed + 7)*.3), dark[0], .25); } } // billows, darker
/* the Wall's face as billows: great soft heaps of sand-cloud piled on each other, lit on their tops, dark underneath */
function b45Billows(x, W, top, base, lit, mid, dark, seed, n = 46){ for (let i = 0; i < n; i++) { const k = hash(i, seed), cx = hash(i, seed + 1)*W*1.2 - W*.1, cy = lerp(base - (base - top)*.1, top + (base - top)*.15, Math.pow(k, .9)), r = (base - top)*(.16 + hash(i, seed + 2)*.16);
    x.save(); x.translate(cx, cy); x.scale(2.1, .8); const g = x.createRadialGradient(-r*.15, -r*.55, r*.1, 0, 0, r); g.addColorStop(0, lit); g.addColorStop(.6, mid); g.addColorStop(1, rgba(dark, 0)); x.fillStyle = g; x.beginPath(); x.arc(0, 0, r, 0, 7); x.fill(); x.restore(); } } // broad and flat, overlapping into one mass
function b45Streaks(ctx, W, top, base, t, n, col, speed){ if (REDUCE()) return; for (let i = 0; i < n; i++) { const k = ((t/speed + hash(i, 731)) % 1), yy = top + (base - top)*hash(i, 732), l = W*(.1 + hash(i, 733)*.25); ctx.fillStyle = col.replace('A', (.08 + .14*Math.sin(k*Math.PI)).toFixed(2)); ctx.fillRect(W*1.2 - k*W*1.6, yy, l, 1.2); } }
/* the camp's fire short of the Wall: night; the Wall across the north, a dull brass light with no moon in it; tents in the hollow; a red
   rock between the fire and the storm; the flames leaning north; sand coming over the rock in a fine hiss; the squad round the fire */
SCENEX.b4_wall_fire = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b45:wallfire', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#0a0806'],[.5,'#1e160e'],[1,'#3a2a18']]); x.fillRect(0, 0, W, hz + 2);
    b45WallBand(x, W, hz + 2, H*.06, ['#1e160e', '#3a2a18', '#5a4226'], '200,160,96', 41); b45Billows(x, W, H*.1, hz, 'rgba(120,90,56,.3)', 'rgba(70,52,32,.3)', '#2a1e12', 43, 60); glow(x, W*.5, hz - H*.08, W*.6, '#8a6436', .22); // the Wall, dull brass, lit from inside by nothing
    x.fillStyle = vgrad(x, hz, H, [[0,'#2a221a'],[.4,'#1a1410'],[1,'#0c0a08']]); x.fillRect(0, hz, W, H - hz); // the sand a mile to it
    for (let i = 0; i < 40; i++) { const yy = hz + 2 + Math.pow(hash(i, 741), 1.4)*(H - hz)*.6; x.fillStyle = `rgba(150,120,80,${(.05 + hash(i, 742)*.08).toFixed(2)})`; x.fillRect(hash(i, 743)*W, yy, 6 + hash(i, 744)*20, 1); } // ripples catching the Wall's light
    for (let i = 0; i < 14; i++) { const px = hash(i, 745)*W, py = hz + H*.04 + hash(i, 746)*H*.16, s = .5 + (py - hz)/(H*.2)*.6; x.fillStyle = '#100c0a'; x.beginPath(); x.moveTo(px - 8*s, py); x.lineTo(px, py - 8*s); x.lineTo(px + 8*s, py); x.fill(); } // the 9th's tents in the hollow
    const rx = W*.72, ry = H*.92; x.fillStyle = vgrad(x, H*.46, H, [[0,'#3a1e14'],[.5,'#2a140e'],[1,'#120806']]); x.beginPath(); x.moveTo(rx - W*.22, H); x.lineTo(rx - W*.2, ry - H*.24); x.quadraticCurveTo(rx - W*.12, H*.46, rx + W*.02, H*.5); x.quadraticCurveTo(rx + W*.18, H*.48, rx + W*.3, H*.62); x.lineTo(W + 4, H*.66); x.lineTo(W + 4, H); x.closePath(); x.fill(); // the red rock
    x.strokeStyle = 'rgba(120,70,44,.5)'; x.lineWidth = 1; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(rx - W*.18, H*(.62 + i*.07)); x.lineTo(W, H*(.6 + i*.07) + Math.sin(i)*3); x.stroke(); } // its layers
    x.fillStyle = 'rgba(120,96,64,.5)'; x.beginPath(); x.moveTo(rx - W*.12, H*.5); x.quadraticCurveTo(rx + W*.02, H*.47, rx + W*.16, H*.49); x.quadraticCurveTo(rx + W*.02, H*.5, rx - W*.12, H*.52); x.fill(); // sand lying on its crest
  }), 0, 0, W, H);
  b45Streaks(ctx, W, H*.12, hz, t, 12, 'rgba(220,180,120,A)', 5000); // the Wall moving
  if (mo) for (let i = 0; i < 26; i++) { const k = ((t/900 + hash(i, 751)) % 1), sx = W*.62 + k*W*-.5 + Math.sin(i)*8, sy = H*.48 + k*H*.3 + hash(i, 752)*H*.1; ctx.fillStyle = `rgba(230,200,150,${(.5*(1 - k)).toFixed(2)})`; ctx.fillRect(sx, sy, 2, .7); } // sand coming over the rock in a hiss
  const cx = W*.4, cy = H*.9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.46, '#ff8a3a', .3*fl); glow(ctx, W*.72, H*.7, H*.3, '#ff7a30', .1*fl); ctx.globalCompositeOperation = 'source-over'; // its light on the rock
  for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*14, cy + Math.sin(a)*4, 3, 2, '#3a2a22'); }
  const lean = mo ? 3 + Math.sin(t/300)*1.4 : 3; poly(ctx, [[cx - 8, cy], [cx - 2 - lean, cy - 17*fl], [cx + 1, cy - 7], [cx + 4 - lean*1.3, cy - 14*fl], [cx + 8, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - 4, cy], [cx - lean*.6, cy - 9*fl], [cx + 4, cy]], 'rgba(255,230,150,.95)'); // the flames lean north, toward the storm
  if (mo) for (let i = 0; i < 6; i++) { const k = ((t/1100 + i/6) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx - k*16 + Math.sin(i*2 + t/500)*4, cy - 10 - k*30, 1, 1); } // sparks, blown
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(28 + j*22), H*.97 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .8, .55); };
/* the Wall over the column: day under a sky gone the colour of brass; the Wall from one edge of the world to the other, dark at the foot,
   brass above, lost in its own haze at the top; the plain in front; the column very small, a line of specks with its own dust */
SCENEX.b4_c5_wall = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.72;
  ctx.drawImage(sceneLayer('b45:wall', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#8a6a40'],[.4,'#b08a56'],[1,'#c8a470']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.2, H*.12, W*.3, '#fff0c8', .3); // a sky the colour of the storm, the sun a smear in it
    b45WallBand(x, W, hz + 1, H*.02, ['#5a3e22', '#6e4c2a', '#3a2614'], '236,196,130', 17); b45Billows(x, W, H*.04, hz, 'rgba(226,186,124,.32)', 'rgba(130,94,56,.28)', '#3a2614', 19, 80); b45Billows(x, W, hz*.55, hz, 'rgba(150,110,66,.3)', 'rgba(60,40,22,.35)', '#2a1a0e', 21, 40);
    x.fillStyle = 'rgba(214,178,120,.45)'; x.fillRect(0, hz - H*.03, W, H*.03); // where it drops what it carries
    x.fillStyle = vgrad(x, hz, H, [[0,'#b8955e'],[.5,'#a0804e'],[1,'#6e5434']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 40; i++) { const yy = hz + 2 + Math.pow(hash(i, 761), 1.4)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(90,66,40,${(.12 + d*.2).toFixed(2)})`; x.fillRect(hash(i, 762)*W, yy, 3 + d*14, .6 + d); }
    const path = k => [lerp(W*.08, W*.86, k), hz + H*.12 - k*H*.06]; b2Column(x, W, H, path, 60, '#2a1e12', 'rgba(200,170,120,.35)'); // the column, small under it
  }), 0, 0, W, H);
  b45Streaks(ctx, W, H*.05, hz, t, 16, 'rgba(240,206,140,A)', 4200); b45Streaks(ctx, W, hz*.6, hz, t + 1300, 8, 'rgba(60,40,20,A)', 3000); // the face of it, moving sideways
  if (!REDUCE()) for (let i = 0; i < 5; i++) { const k = ((t/9000 + i/5) % 1); glow(ctx, lerp(W*1.1, -W*.1, k), hz - H*.08 - hash(i, 763)*H*.3, H*.18, '#4a3018', .18*Math.sin(k*Math.PI)); } // billows rolling along it
  vign(ctx, W, H, .55, .5); };
/* the Wall goes back: a mile off along the plain, the Wall drawing away north like a tide going out, lower and paler, a long bare strip
   of rippled sand where it stood; the army drawn up in front, in its legions, very small; at its head a single dot, far out alone */
SCENEX.b4_c5_withdraw = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.5, back = REDUCE() ? 1 : .5 + .5*Math.min(1, (t % 24000)/16000);
  ctx.drawImage(sceneLayer('b45:withdraw', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#a8b4bc'],[.6,'#d8d0bc'],[1,'#e8dcc0']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.66, H*.1, W*.4, '#fffae8', .5);
    x.fillStyle = vgrad(x, hz, H, [[0,'#cdb48a'],[.5,'#b89c70'],[1,'#86704e']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 70; i++) { const yy = hz + 2 + Math.pow(hash(i, 771), 1.6)*(H - hz), d = (yy - hz)/(H - hz); x.strokeStyle = `rgba(120,94,60,${(.1 + d*.25).toFixed(2)})`; x.lineWidth = .6 + d; x.beginPath(); const x0 = hash(i, 772)*W; x.moveTo(x0, yy); x.quadraticCurveTo(x0 + 10 + d*30, yy - 1 - d*2, x0 + 20 + d*60, yy); x.stroke(); } // the rippled strip where it stood
    for (let lg = 0; lg < 3; lg++) { const lx = W*(.06 + lg*.3), ly = H*(.74 + lg*.012); glow(x, lx + W*.1, ly, W*.12, '#c8b08a', .35); for (let r = 0; r < 5; r++) for (let i = 0; i < 34; i++) { if (hash(i, r, lg + 70) > .86) continue; const bx = lx + i*1.5 + (r % 2)*.7 + (hash(i, r, lg + 71) - .5), by = ly + r*1.7; x.fillStyle = `rgba(46,34,24,${(.6 + hash(i, r, lg + 72)*.35).toFixed(2)})`; x.fillRect(bx, by - 2.2, .9, 2.2); } } // the army in its legions, very small, its own dust over it
    x.fillStyle = '#5a1e14'; x.fillRect(W*.58, H*.72, 1, 7); x.fillRect(W*.58, H*.72, 4, 2.4); // the standard
  }), 0, 0, W, H);
  // the Wall itself, drawing back: lower and paler as it goes
  const top = lerp(H*.04, hz - H*.16, back), base = hz + 1; ctx.save(); ctx.globalAlpha = lerp(1, .55, back); b45WallBand(ctx, W, base, top, ['#7a5a36', '#8a6a42', '#a8864e'], '250,226,180', 23); b45Billows(ctx, W, top, base, 'rgba(240,214,170,.3)', 'rgba(150,116,74,.25)', '#7a5a36', 25, 40); ctx.restore();
  ctx.fillStyle = 'rgba(232,214,180,.5)'; ctx.fillRect(0, base - 2, W, 3); // the haze where it was
  const rx = W*.6, ry = lerp(H*.64, H*.6, back); ctx.fillStyle = '#2a2420'; ctx.fillRect(rx, ry - 3, 1.6, 3); ctx.fillRect(rx - .8, ry - 4.4, 3.2, 1.6); // a grey rider, far out, alone
  b45Streaks(ctx, W, top, base, t, 12, 'rgba(250,230,190,A)', 6000); vign(ctx, W, H, .45, .5); };
/* the old sea floor: a white plain of shell going away to a pale haze, great fish's bones standing out of it, a ship of stone on its side,
   an old road running dead straight away to the horizon with the column on it; the seep scene puts the coral reef and the black water near */
function b45SeaFloor(x, W, H, hz, seed){ x.fillStyle = vgrad(x, 0, hz, [[0,'#b8c0c4'],[.6,'#e2dccc'],[1,'#f0eadc']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.3, H*.08, W*.4, '#fffcf0', .55);
  x.fillStyle = vgrad(x, hz, H, [[0,'#e8e0cc'],[.4,'#d8ceb6'],[1,'#a89c84']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 90; i++) { const yy = hz + 2 + Math.pow(hash(i, seed), 1.5)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(${hash(i, seed + 1) > .5 ? '255,255,250' : '140,128,104'},${(.15 + d*.3).toFixed(2)})`; ell(x, hash(i, seed + 2)*W, yy, 1 + d*4, .5 + d*1.6, x.fillStyle); } // shell, near and far
  x.fillStyle = 'rgba(255,252,240,.35)'; x.fillRect(0, hz - 2, W, 5); } // the haze on the horizon
function b45FishBones(x, cx, by, s, col){ x.strokeStyle = col; x.lineCap = 'round'; x.lineWidth = 1.6*s; x.beginPath(); x.moveTo(cx - 20*s, by - 3*s); x.quadraticCurveTo(cx, by - 6*s, cx + 22*s, by - 2*s); x.stroke(); // a spine, half in the shell
  for (let i = 0; i < 7; i++) { const rx = cx - 16*s + i*5.6*s; x.lineWidth = 1.1*s; x.beginPath(); x.moveTo(rx, by - 4*s); x.quadraticCurveTo(rx - 2*s, by - (14 + i*1.2)*s, rx + 5*s, by - (18 + i*1.6)*s); x.stroke(); } x.lineCap = 'butt'; } // the ribs, standing up
function b45StoneShip(x, cx, by, s, col, lit){ x.fillStyle = col; x.beginPath(); x.moveTo(cx - 34*s, by); x.quadraticCurveTo(cx - 30*s, by - 16*s, cx - 8*s, by - 18*s); x.lineTo(cx + 22*s, by - 20*s); x.lineTo(cx + 34*s, by - 30*s); x.lineTo(cx + 36*s, by - 12*s); x.quadraticCurveTo(cx + 30*s, by, cx + 10*s, by + 2*s); x.closePath(); x.fill(); // the hull on its side, high-sterned
  x.strokeStyle = lit; x.lineWidth = .7*s; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(cx - 30*s + i*2*s, by - 3*s - i*4*s); x.quadraticCurveTo(cx, by - 5*s - i*4*s, cx + 32*s, by - 8*s - i*5*s); x.stroke(); } // planking
  x.fillStyle = 'rgba(40,40,36,.7)'; for (let i = 0; i < 4; i++) x.fillRect(cx - 18*s + i*9*s, by - 13*s, 2*s, 8*s); // ribs showing through
  x.fillStyle = '#3a6a5a'; x.beginPath(); x.arc(cx + 30*s, by - 20*s, 2.4*s, 0, 7); x.fill(); x.fillStyle = 'rgba(200,240,220,.6)'; x.fillRect(cx + 29*s, by - 21*s, 1*s, 1*s); } // the stern-light, its green glass still in it
SCENEX.b4_c5_seabed = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.46, vx = W*.56;
  ctx.drawImage(sceneLayer('b45:seabed', W, H, (x, W, H) => { b45SeaFloor(x, W, H, hz, 781);
    x.fillStyle = 'rgba(200,190,170,.6)'; x.beginPath(); x.moveTo(vx - 1, hz); x.lineTo(vx + 1, hz); x.lineTo(vx + W*.2, H); x.lineTo(vx - W*.26, H); x.closePath(); x.fill(); // the old road, dead straight
    x.strokeStyle = 'rgba(120,108,88,.35)'; x.lineWidth = .7; for (let i = 1; i < 14; i++) { const k = Math.pow(i/14, 1.8), yy = hz + k*(H - hz); x.beginPath(); x.moveTo(vx - W*.26*k, yy); x.lineTo(vx + W*.2*k, yy); x.stroke(); } // its stones
    [[.16, .62, .6], [.86, .56, .4], [.3, .52, .25], [.74, .5, .18]].forEach(([fx, fy, s], i) => b45FishBones(x, W*fx, H*fy, s*1.4, `rgba(${i < 2 ? '244,238,224' : '226,220,206'},.95)`)); // great fish's bones
    b45StoneShip(x, W*.24, H*.86, .9, '#8a8478', 'rgba(220,214,200,.6)');
    const path = k => [vx + (1 - k)*W*-.03, hz + (1 - k)*H*.28]; b2Column(x, W, H, path, 46, '#4a4034', 'rgba(220,210,190,.4)'); // the column on the road
  }), 0, 0, W, H);
  if (!REDUCE()) for (let i = 0; i < 6; i++) { const k = ((t/20000 + i/6) % 1); glow(ctx, lerp(-W*.2, W*1.2, k), hz + H*(.02 + (i % 3)*.04), W*.24, '#f4ead4', .16*Math.sin(k*Math.PI)); } // dust drifting over the floor, thin
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.56 + i*Math.min(26, W*.4/sq.length), H*.97 - (i % 2)*2, 2, t, {phase:i, dir:1}));
  vign(ctx, W, H, .4, .5); };
SCENEX.b4_c5_seep = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.42, done = !!((S && S.f) || {}).b4_c5_seepDone, cx = W*.5, cy = H*.78;
  ctx.drawImage(sceneLayer('b45:seep' + (done ? 'd' : ''), W, H, (x, W, H) => { b45SeaFloor(x, W, H, hz, 791);
    // the reef: a long ragged wall of grey coral standing out of the floor, like a jaw with half its teeth gone
    for (let i = 0; i < 30; i++) { const cx0 = (i/29)*W*1.04 - W*.02, gap = hash(i, 792) < .3, ht = gap ? H*(.06 + hash(i, 793)*.06) : H*(.16 + hash(i, 794)*.26), wd = W*(.025 + hash(i, 795)*.035), by = H*.7; // lumpy coral heads, some fallen
      const g = x.createLinearGradient(cx0 - wd, 0, cx0 + wd, 0); g.addColorStop(0, '#c0aca2'); g.addColorStop(.5, '#8a766e'); g.addColorStop(1, '#4e403c'); x.fillStyle = g; x.beginPath(); x.moveTo(cx0 - wd*1.3, by);
      for (let k = 0; k <= 6; k++) { const a = Math.PI - k/6*Math.PI, rr = wd*(1 + .25*Math.sin(k*2.3 + i)); x.lineTo(cx0 + Math.cos(a)*rr*(k === 3 ? .8 : 1.1), by - ht + (1 - Math.sin(a))*ht*.25 - Math.sin(a)*rr*.6 + (k % 2 ? ht*.08 : 0)); }
      x.lineTo(cx0 + wd*1.3, by); x.closePath(); x.fill(); for (let k = 0; k < 4; k++) { const ky = by - ht*(.2 + k*.2); ell(x, cx0 + wd*(hash(i, k + 796) - .5), ky, wd*(.5 + hash(i, k + 797)*.3), ht*.06, 'rgba(255,240,230,.14)'); } }
    x.fillStyle = 'rgba(40,30,28,.4)'; for (let i = 0; i < 90; i++) ell(x, hash(i, 798)*W, H*(.4 + hash(i, 799)*.28), .8 + hash(i, 800)*1.2, .6 + hash(i, 801)*.8, x.fillStyle); // pitted
    x.fillStyle = 'rgba(90,76,64,.55)'; x.fillRect(0, H*.7, W, H*.03);
    // the seep: a black wet mouth in the white floor, a lip of dark mud, the shell gone grey round it
    ell(x, cx, cy, W*.26, H*.1, 'rgba(140,128,110,.5)'); ell(x, cx, cy, W*.18, H*.07, '#4a4036'); ell(x, cx, cy + 1, W*.13, H*.05, '#0a0c0c'); x.fillStyle = 'rgba(210,226,232,.45)'; x.fillRect(cx - W*.06, cy - 1, W*.07, 1); x.fillRect(cx + W*.01, cy + 3, W*.04, 1);
    if (!done) { x.strokeStyle = '#2a2018'; x.lineWidth = .8; x.beginPath(); x.moveTo(W*.7, H*.74); x.lineTo(W*.99, H*.74); x.stroke(); for (let i = 0; i < 6; i++) b2Horse(x, W*(.73 + i*.045), H*.78 + (i % 2)*2, 1.05, i % 3 ? '#3a2a1e' : '#6a5a46', i % 2 ? 1 : -1, hash(i, 802) > .5); } // the riders' horse picket, heads down
    for (let i = 0; i < 6; i++) ell(x, W*(.3 + i*.03), H*(.83 + (i % 2)*.02), 4, 2.4, done ? '#5a4a34' : '#7a6448'); // skins, stacked
  }), 0, 0, W, H);
  if (!REDUCE()) { const k = (t % 6000)/6000; ctx.strokeStyle = `rgba(220,236,240,${(.25*(1 - k)).toFixed(2)})`; ctx.lineWidth = .8; ctx.beginPath(); ctx.ellipse(cx, cy + 1, W*.13*k, H*.05*k, 0, 0, 7); ctx.stroke(); } // a ring on the water
  vign(ctx, W, H, .45, .55); };
/* the canal city at dusk: a city of pale stone on dry canals, towers without tops, bridges broken, the red of the last light on it; on the
   left the road of standing stones going away west into the dusk; the column's fires going up in the squares */
SCENEX.b4_c5_canal = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.56, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b45:canal', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#1e1a34'],[.45,'#5a3048'],[.8,'#b05a3e'],[1,'#e08a4a']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.18, hz, W*.3, '#ffb070', .45); // dusk, the sun down in the west
    for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(240,230,250,${(.2 + hash(i, 801)*.4).toFixed(2)})`; x.fillRect(hash(i, 802)*W, Math.pow(hash(i, 803), 1.6)*hz*.4, 1, 1); }
    // the city: pale blocks and towers broken at the top, lit rose on their west faces
    for (let i = 0; i < 34; i++) { const bx = W*(.3 + hash(i, 804)*.72), bw = W*(.03 + hash(i, 805)*.06), bh = H*(.06 + Math.pow(hash(i, 806), 2)*.3), top = hz - bh; x.fillStyle = '#5a3e48'; x.fillRect(bx, top, bw, bh + 2);
      x.fillStyle = 'rgba(240,150,120,.45)'; x.fillRect(bx, top, bw*.3, bh); x.fillStyle = '#3a2632'; x.beginPath(); x.moveTo(bx, top); for (let k = 1; k <= 3; k++) x.lineTo(bx + bw*k/3, top - hash(i, 807 + k)*H*.03); x.lineTo(bx + bw, top + 2); x.lineTo(bx, top + 2); x.fill(); // broken at the top
      if (hash(i, 811) > .6) { x.fillStyle = '#1a1220'; for (let k = 0; k < 3; k++) x.fillRect(bx + bw*.3, top + bh*(.2 + k*.25), bw*.2, bh*.1); } } // empty windows
    x.fillStyle = vgrad(x, hz, H, [[0,'#6a4a50'],[.5,'#4a343c'],[1,'#22181e']]); x.fillRect(0, hz, W, H - hz); // the paving, the last light on it
    // a dry canal across the foreground, its far wall in shadow, a broken bridge over it
    x.fillStyle = '#1e1418'; x.fillRect(0, H*.74, W, H*.08); x.fillStyle = '#3a2830'; x.fillRect(0, H*.74, W, H*.025); x.fillStyle = 'rgba(240,170,150,.3)'; x.fillRect(0, H*.82, W, 1.4);
    x.fillStyle = '#7a5a60'; x.beginPath(); x.moveTo(W*.56, H*.82); x.quadraticCurveTo(W*.62, H*.7, W*.68, H*.72); x.lineTo(W*.69, H*.76); x.quadraticCurveTo(W*.63, H*.74, W*.6, H*.82); x.fill(); x.fillRect(W*.74, H*.72, W*.08, H*.1); x.fillStyle = 'rgba(240,160,140,.3)'; x.fillRect(W*.74, H*.72, W*.08, 1.4); // the bridge, half of it gone
    // the road of standing stones, west, going away into the dusk
    for (let i = 0; i < 22; i++) { const k = Math.pow(i/22, 1.3), px = lerp(W*.3, W*.02, k), py = lerp(H*.7, hz + 2, k), s = lerp(1.6, .3, k); [-1, 1].forEach(sd => { const sx = px + sd*lerp(14, 2, k); x.fillStyle = '#2e2028'; x.save(); x.translate(sx, py); x.rotate(-sd*.08); x.fillRect(-1.6*s, -12*s, 3.2*s, 12*s); x.beginPath(); x.arc(0, -12*s, 1.6*s, Math.PI, 0); x.fill(); x.restore(); }); }
  }), 0, 0, W, H);
  ctx.globalCompositeOperation = 'lighter'; [[.5, .66], [.78, .63], [.92, .68], [.4, .61]].forEach(([fx, fy], i) => { const ff = REDUCE() ? 1 : .8 + .2*Math.sin(t/(120 + i*13) + i); glow(ctx, W*fx, H*fy, 16, '#ff8a3a', .3*ff); glow(ctx, W*fx, H*fy, 2.4, '#ffe0a0', .9*ff); }); ctx.globalCompositeOperation = 'source-over'; // the column's fires in the squares
  if (!REDUCE()) { const k = (t % 14000)/14000, i = Math.floor(t/14000) % 22, kk = Math.pow(i/22, 1.3); ctx.fillStyle = `rgba(200,190,210,${(.18*Math.sin(k*Math.PI)).toFixed(2)})`; ctx.fillRect(lerp(W*.3, W*.02, kk) + 2, lerp(H*.7, hz + 2, kk) - 12*lerp(1.6, .3, kk), 2.2*lerp(1.6, .3, kk), 12*lerp(1.6, .3, kk)); } // one of the stones, now and then, is lighter than the others
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.44 + i*Math.min(24, W*.36/sq.length), H*.97 - (i % 2)*2, 1.9, t, {phase:i, dir:1}));
  vign(ctx, W, H, .6, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Four's sand-and-iron ground (71b's frame) ---------------- */
function b45Item(key, label, body){ const w = 240, h = 130, id = 'c45-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#5a4a34"></stop><stop offset=".7" stop-color="#2a2218"></stop><stop offset="1" stop-color="#121214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a conch from the sea bed: a big spiral shell, knobbed, cream outside, its lip flared open and pink as a mouth inside */
b45Item('b4_c5_conch', 'A conch from the sea bed', '<ellipse cx="120" cy="72" rx="76" ry="34" fill="#f0e0d0" opacity=".06"/><g transform="rotate(-16 120 66)">'
  + '<path d="M58 66 Q70 36 112 34 Q160 32 186 52 Q196 62 184 76 Q160 96 120 96 Q80 96 62 82 Z" fill="#e8dcc6"/><path d="M60 66 Q74 40 112 38 Q156 36 180 54" stroke="#fffaf0" stroke-width="2.2" fill="none" opacity=".8"/>'
  + '<path d="M70 70 Q66 56 76 50 M88 82 Q80 62 92 46 M110 88 Q100 64 114 40 M134 90 Q124 66 138 40 M156 86 Q148 68 160 44" stroke="#b8a488" stroke-width="1.4" fill="none" opacity=".7"/>'
  + '<circle cx="84" cy="44" r="4" fill="#d8c8ac"/><circle cx="108" cy="36" r="4.4" fill="#d8c8ac"/><circle cx="134" cy="35" r="4.4" fill="#d8c8ac"/><circle cx="158" cy="40" r="4" fill="#d8c8ac"/><circle cx="83" cy="43" r="1.6" fill="#fffaf0" opacity=".8"/><circle cx="107" cy="35" r="1.6" fill="#fffaf0" opacity=".8"/>'
  + '<path d="M58 66 Q44 70 40 80 Q52 78 62 82 Z" fill="#cdbca0"/><path d="M40 80 Q30 82 26 88" stroke="#b8a488" stroke-width="3" stroke-linecap="round" fill="none"/>'
  + '<path d="M150 62 Q186 52 196 70 Q194 92 160 96 Q132 98 128 84 Q134 70 150 62 Z" fill="#e89a88"/><path d="M152 66 Q182 58 190 72 Q186 88 160 92 Q140 92 136 84 Q142 72 152 66 Z" fill="#f4c0ae"/><path d="M150 70 Q170 66 178 76" stroke="#fff0e8" stroke-width="1.6" fill="none" opacity=".8"/><path d="M144 82 Q160 86 176 82" stroke="#c07868" stroke-width="1.2" fill="none" opacity=".7"/></g>'
  + '<path d="M60 112 Q120 106 180 112" stroke="#c8b8a0" stroke-width="1" fill="none" opacity=".2"/>');
/* a lens of old sea-glass: a thick green disc, clouded at the rim, clear at the heart, with the light in it, and a flake of the stone frame */
b45Item('b4_c5_seaglass', 'A lens of old sea-glass', '<defs><radialGradient id="c45g" cx="0.42" cy="0.4" r="0.6"><stop offset="0" stop-color="#d8f4e4"/><stop offset=".35" stop-color="#6ab894"/><stop offset=".8" stop-color="#2e6a54"/><stop offset="1" stop-color="#8ab4a0"/></radialGradient></defs>'
  + '<ellipse cx="120" cy="68" rx="60" ry="38" fill="#a8e8c8" opacity=".07"/><ellipse cx="124" cy="96" rx="40" ry="7" fill="#000" opacity=".35"/>'
  + '<circle cx="120" cy="64" r="34" fill="url(#c45g)"/><circle cx="120" cy="64" r="34" fill="none" stroke="#b8d8c8" stroke-width="5" opacity=".45"/><circle cx="120" cy="64" r="28" fill="none" stroke="#e8f8ee" stroke-width="1" opacity=".3"/>'
  + '<path d="M98 50 Q108 38 124 38" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".75"/><ellipse cx="112" cy="56" rx="6" ry="4" fill="#ffffff" opacity=".6"/>'
  + '<path d="M138 84 Q148 76 150 64" stroke="#1e4a3a" stroke-width="2" fill="none" opacity=".6"/><path d="M90 64 Q92 82 108 92" stroke="#cfe8dc" stroke-width="1.4" fill="none" opacity=".4"/>'
  + '<path d="M162 86 L176 82 L180 90 L168 96 Z" fill="#8a8478"/><path d="M162 86 L176 82 L174 85 L164 89 Z" fill="#c8c2b4"/>');
/* a desert rider's veil: a long strip of fine grey cotton, wound and folded, its end hanging loose, a loop of red thread at the end */
b45Item('b4_c5_veil', 'A desert rider\'s veil', '<ellipse cx="120" cy="70" rx="84" ry="34" fill="#e0d4bc" opacity=".05"/>'
  + '<path d="M44 48 Q90 30 150 40 Q196 48 202 66 Q190 80 150 72 Q100 64 58 76 Q36 66 44 48 Z" fill="#9a968c"/><path d="M48 50 Q92 34 150 44 Q190 50 198 64" stroke="#cfcac0" stroke-width="2.4" fill="none" opacity=".8"/>'
  + '<path d="M60 62 Q100 50 150 58 M64 70 Q104 60 148 66" stroke="#6a665e" stroke-width="1.2" fill="none" opacity=".7"/>'
  + '<path d="M58 76 Q100 66 150 74 Q170 78 176 92 Q150 98 120 94 Q86 90 66 98 Q50 90 58 76 Z" fill="#b0aca2"/><path d="M62 80 Q100 70 150 78 Q166 82 172 90" stroke="#e0dcd2" stroke-width="2" fill="none" opacity=".7"/><path d="M70 90 Q104 82 150 88" stroke="#7a766e" stroke-width="1" fill="none" opacity=".6"/>'
  + '<path d="M176 92 Q190 96 196 108 Q186 112 178 104 Q180 98 176 92 Z" fill="#a8a49a"/>'
  + '<path d="M196 108 Q206 112 204 120 Q196 124 192 116 Q192 110 196 108" stroke="#b02a22" stroke-width="2.2" fill="none"/><path d="M197 109 Q203 113 202 118" stroke="#e86a50" stroke-width=".8" fill="none" opacity=".7"/>'
  + '<path d="M70 96 Q120 92 170 96" stroke="#d8c8a0" stroke-width="1" fill="none" opacity=".25"/>');
