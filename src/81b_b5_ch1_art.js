/* ============ Book Five, Chapter 1 art: The Drownings — the Whitefinders' barracks yard, the Low Walk of the Quillas Canal, the pit town ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d, lit from the left: the three shared ones every later chapter uses (b5_c1_ennic,
   b5_c1_clerk, b5_c1_tilewoman) and the chapter's own (the rope-man, the bookmaker, a cutpurse, a pit-town drunk). Four grounds (TILEX:
   the barracks yard at night, the Low Walk by day and lamplight, the pit town, and the Low Walk as a fight ground with the canal along
   one side); battle cover ('t') drawn per ground. Five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest
   still): b5_barracks (80's, redrawn), b5_c1_lowwalk, b5_c1_pittown, b5_c1_court, b5_c1_festival. And the chapter's gear on Book Five's
   ground: dark canal-slate with a thin dock-gold rim. Lether's look: blue-grey, canal-green, lamp-gold and wet stone. Anything grim stays
   far off: a Drowning is a rope going taut over dark water and a crowd on the tiers. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Finadd Ravel Ennic: about forty, neat; the blue-grey officer's cloak, scale under it, a good sword at the hip that stays in its
     scabbard, a ledger held flat under the left arm, no helm, hair neatly cut and going grey at the sides */
  b5_c1_ennic(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1.06);
    poly(ctx, [[-5.6,-6],[-9,11],[-2.6,10],[-2,-6]], '#4a5664'); poly(ctx, [[5.4,-6],[8,10],[3,9.6],[2,-6]], '#3e4856'); // the cloak, both sides
    h.legs('#26282e'); ctx.fillStyle = '#16120e'; ctx.fillRect(-4.5, 10.4, 3.4, 2.6); ctx.fillRect(1.1, 10.4, 3.4, 2.6); // good boots
    h.torso('#8a8a86', '#2c2c2a', 6.2); ctx.strokeStyle = 'rgba(0,0,0,.26)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-5.8, -4 + i*2.2); ctx.lineTo(5.8, -4 + i*2.2); } ctx.stroke(); // scale
    ctx.fillStyle = '#c9a35a'; ctx.fillRect(-6, -6, 12, 1.2); ctx.fillRect(-.6, -6, 1.2, 12.6); // an officer's gold edging
    ctx.fillStyle = '#2a1e14'; ctx.fillRect(-6, 3.2, 12, 1.4); // the belt
    B2F.line(ctx, '#3a2a1a', 1.8, [[5.4, 4.2], [9.4, 11]]); ell(ctx, 5.2, 3.8, 1.2, 1, '#c9a35a'); // the sword, sheathed, the gilt hilt
    poly(ctx, [[-10.6,-3],[-3.6,-4.4],[-3,1.6],[-10,3]], '#6a4a2a'); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-10, -2.2, 6.4, .7); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-10.4, 1.4, 7, .8); // the ledger under the arm, its page edges
    h.head('#c8a488', 4.3, -11.2); h.look('rgba(24,14,10,.8)', -11.4); B2F.cap(ctx, '#4a3e34', 4.4, -12.6, 1.05, 1.95); ctx.fillStyle = 'rgba(200,196,186,.55)'; ctx.fillRect(-4.4, -12.4, 1.4, 2.6); ctx.fillRect(3.2, -12.4, 1.2, 2.2); // neat hair, grey at the sides
    ctx.restore(); },
  /* the company clerk: thin, a little stooped, Indebted; a plain brown coat, ink to the wrist, the oilskin paybook case held tight to the chest */
  b5_c1_clerk(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .9, 1.02);
    h.legs('#2a2622'); poly(ctx, [[-5.4,-6],[5.4,-6],[6.6,9],[-6.6,9]], h.armor('#6a5a46', '#241e16')); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(-.5, -6, 1, 15); // the long plain coat
    poly(ctx, [[-6,-3],[4,-4],[4.6,4.6],[-5.4,5.4]], h.armor('#3a4a44', '#121a18')); ctx.fillStyle = 'rgba(220,230,220,.18)'; ctx.fillRect(-5.6, -3, 9, .8); ctx.fillStyle = '#c9a35a'; ctx.fillRect(-1.6, .4, 2.2, 1.2); // the oilskin case, its brass clasp
    ctx.fillStyle = '#c8aa90'; ctx.fillRect(-7.4, -2, 2, 3.4); ctx.fillRect(4.2, -1, 2, 3.4); ctx.fillStyle = '#1a1820'; ctx.fillRect(-7.4, .6, 2, 1.6); ctx.fillRect(4.2, 1.6, 2, 1.6); // hands round the case, ink to the wrist
    h.head('#d0b29a', 3.9, -11.6); h.look('rgba(24,14,10,.8)', -11.8); B2F.cap(ctx, '#3a3028', 4, -12.8, 1.1, 1.9); ctx.fillStyle = 'rgba(30,30,40,.6)'; ctx.fillRect(3, -9.4, 1.2, .7); // thin hair; an ink smudge on the cheek
    B2F.line(ctx, '#e8e0cc', .5, [[4, -15], [6.4, -18.6]]); // a pen behind the ear
    ctx.restore(); },
  /* the tile-woman: old, small, bent; a dark shawl over the head and shoulders, a bag of oiled cloth in both hands, a staff-stick */
  b5_c1_tilewoman(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .86, .88); ctx.translate(.6, 0);
    B2F.line(ctx, '#5a4430', 1.4, [[8.6, 12.6], [7.6, -10]]); // the stick
    ctx.fillStyle = '#2a221c'; ctx.fillRect(-4.5, 7, 3.4, 6); ctx.fillRect(1.1, 7, 3.4, 6); // feet under the skirts
    poly(ctx, [[-6.2,-5],[5.6,-5],[8,12.6],[-8,12.6]], h.armor('#4a3e3a', '#1a1412')); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-7.4, 10.8, 15, 1.8); // the skirts to the ground
    poly(ctx, [[-7,-6],[6.4,-6],[7.6,2.4],[-7.6,3]], h.armor('#3a3446', '#141018')); ctx.fillStyle = 'rgba(160,150,190,.18)'; for (let i = 0; i < 4; i++) ctx.fillRect(-6.6 + i*3.4, 1.6, 1.6, 1.4); // the shawl, a fringe
    ell(ctx, -1, 3.6, 3.6, 2.8, '#7a6a44'); ctx.fillStyle = 'rgba(255,240,200,.25)'; ctx.fillRect(-3.6, 2.2, 3.4, .7); ctx.fillStyle = '#d8c8a0'; ctx.fillRect(-1.4, 1, 1, 1.2); // the bag of oiled cloth, a bone tile peeping
    h.head('#b8987e', 3.8, -10.4); h.look('rgba(24,14,10,.85)', -10.4); ctx.fillStyle = 'rgba(80,50,40,.35)'; ctx.fillRect(-2.6, -8.4, 5.6, .6); // lined
    poly(ctx, [[-5.6,-4],[-4.6,-13.6],[0,-15.6],[4.4,-13.4],[5.4,-4],[3.4,-6.4],[3,-11.4],[-3,-11.4],[-3.6,-6.4]], '#3a3446'); // the shawl over the head
    ctx.fillStyle = 'rgba(220,214,204,.6)'; ctx.fillRect(-3, -11.4, 1.4, 1.6); // a wisp of white hair
    ctx.restore(); },
  /* an old rope-man of the Drownings: broad, bow-legged; a tarred apron to the knee, bare forearms rope-burned, a coil of wet rope on the
     shoulder with an iron hook at the end, a hooked knife at the belt, a cloth cap */
  b5_c1_ropeman(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, .96);
    h.legs('#2e2a24'); h.torso('#6a5e4a', '#26221a', 6.6); poly(ctx, [[-5.6,-3],[5.6,-3],[6.4,9.4],[-6.4,9.4]], h.armor('#2a2622', '#0c0a08')); ctx.fillStyle = 'rgba(255,240,200,.12)'; ctx.fillRect(-5.4, -2, 1.6, 10); // the tarred apron, shining a little
    ctx.fillStyle = '#a07e60'; ctx.fillRect(-8.4, -5, 2.4, 7.6); ctx.fillRect(6, -5, 2.4, 7); ctx.fillStyle = 'rgba(120,40,30,.4)'; ctx.fillRect(-8.4, -1, 2.4, .8); ctx.fillRect(6, 0, 2.4, .8); // bare forearms, rope-burned
    ctx.strokeStyle = '#8a7650'; ctx.lineWidth = 1.6; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-5.6, -5.4, 4.4 - i*.3, 3 - i*.2, -.5, 0, 7); ctx.stroke(); } ctx.strokeStyle = 'rgba(30,40,40,.5)'; ctx.lineWidth = .6; ctx.beginPath(); ctx.ellipse(-5.6, -5.4, 4.2, 2.8, -.5, .2, 2.4); ctx.stroke(); // the coil over the shoulder, wet at the bottom
    B2F.line(ctx, '#8a7650', 1.4, [[-8.6, -2.6], [-9.6, 4.6]]); B2F.line(ctx, '#4a4a4c', 1.2, [[-9.6, 4.6], [-9, 7], [-7.8, 6.4]]); // the end, and its hook
    B2F.line(ctx, '#9a948a', .9, [[4.6, 4], [6.6, 7], [5.6, 8]]); // the hooked knife
    h.head('#a8866a', 4.4, -11); h.look('rgba(20,10,6,.86)', -11.2); ctx.fillStyle = 'rgba(210,206,196,.7)'; ctx.fillRect(-3.6, -8.2, 7.6, 1.8); // a white stubble beard
    ctx.beginPath(); ctx.arc(0, -12.6, 4.8, Math.PI*1.02, Math.PI*1.98); ctx.fillStyle = '#4a3e2e'; ctx.fill(); ctx.fillRect(-1, -13, 7, 1.2); // a cloth cap with a short peak
    ctx.restore(); },
  /* a Low Walk bookmaker: a good coat, too good; a chalk board under one arm with odds on it; a weighted cane; rings */
  b5_c1_bookman(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1.02);
    h.legs('#2a2420'); poly(ctx, [[-6.2,-6],[6.2,-6],[7.6,9.6],[-7.6,9.6]], h.armor('#5a2e3a', '#1e0c12')); ctx.fillStyle = '#c9a35a'; for (let i = 0; i < 4; i++) ell(ctx, 1.2, -4 + i*2.8, .55, .55, '#c9a35a'); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-.5, -6, 1, 15.6); // a wine-dark coat, brass buttons
    ctx.fillStyle = '#e0d8c8'; ctx.fillRect(-2.4, -6, 4.8, 2.2); // a white stock at the throat
    poly(ctx, [[-12.4,-5],[-4.6,-6.4],[-4,4.6],[-11.8,6]], '#1e2420'); ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = .9; ctx.strokeRect(-12.2, -5.4, 7.6, 10.8); ctx.fillStyle = 'rgba(236,232,220,.7)'; for (let i = 0; i < 4; i++) ctx.fillRect(-11.2, -3.6 + i*2.4, 3 + (i % 2)*2, .6); // the chalk board, odds on it
    B2F.line(ctx, '#2a1e14', 1.3, [[6.6, 3], [10.6, 12.4]]); ell(ctx, 6.4, 2.4, 1.2, 1.2, '#c9a35a'); // the weighted cane
    h.head('#c09c80', 4.5, -11.2); h.look('rgba(24,14,10,.8)', -11.4); ctx.fillStyle = '#2a1e16'; ctx.fillRect(-1.6, -8.6, 4.8, .9); // a thin moustache
    ctx.fillStyle = '#1a1210'; ctx.fillRect(-5.4, -14, 10.8, 1.4); ctx.fillRect(-3.6, -18, 7.2, 4.2); ctx.fillStyle = 'rgba(201,163,90,.6)'; ctx.fillRect(-3.6, -14.8, 7.2, .7); // a tall hat, a gold band
    ctx.restore(); },
  /* a festival cutpurse: young, thin, quick; a short dark jacket, a cap pulled low, a thin knife held low; one in three is a girl with a braid */
  b5_c1_cutpurse(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .88, .96); const c = b2Pick(o, [['#3a3e46', '#14161a'], ['#4a3a30', '#1a120e'], ['#2e3a36', '#101614']]), girl = b2Pick(o, [0, 0, 1]);
    h.legs('#22201e'); poly(ctx, [[-5.4,-6],[5.4,-6],[5.8,5],[-5.8,5]], h.armor(c[0], c[1])); ctx.fillStyle = 'rgba(255,240,210,.12)'; ctx.fillRect(-5, -5, 1.4, 9); // a short jacket
    ctx.fillStyle = '#b08a6e'; ctx.fillRect(5.4, -3.6, 2, 6); B2F.line(ctx, '#b8b4ac', .9, [[7, 3], [10.6, 1]]); // a thin knife, low
    ctx.fillStyle = '#b08a6e'; ctx.fillRect(-7.4, -3, 2, 5.4); ell(ctx, -6.4, 3, 1.4, 1, '#5a4a2a'); // a purse that is not theirs
    h.head('#c09a80', 4, -11.2); h.look('rgba(24,14,10,.85)', -11.6);
    if (girl) { B2F.cap(ctx, '#2a1a12', 4.2, -12.4); ctx.fillStyle = '#2a1a12'; ctx.fillRect(-5, -12, 1.6, 9); }
    else { ctx.beginPath(); ctx.arc(0, -12.6, 4.8, Math.PI, 0); ctx.fillStyle = shade(c[0], -.2); ctx.fill(); ctx.fillRect(-1, -12.8, 6.8, 1.3); } // a cap pulled low
    ctx.restore(); },
  /* a pit-town drunk: Tarthenal, the size of a door; a sleeveless jerkin, huge bare arms, a bench-leg in one fist, a heavy brow */
  b5_c1_drunk(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.32, 1.22); const sk = b2Pick(o, ['#a07a5a', '#8e6a4e', '#a8846a']);
    h.legs('#2a241e'); h.torso('#5a4a36', '#1e180e', 7.8); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-.6, -6, 1.2, 13); ctx.fillStyle = 'rgba(80,60,40,.6)'; ctx.fillRect(-4, 0, 3, 2); // a stained jerkin
    ctx.fillStyle = sk; ctx.fillRect(-10.4, -5.6, 3, 9); ctx.fillRect(7.4, -5.6, 3, 8); ell(ctx, -8.9, 3.6, 1.8, 1.8, sk); // great bare arms
    B2F.line(ctx, '#5a3e24', 2.4, [[8.6, 1.4], [11.6, -8.4]]); ell(ctx, 11.8, -9, 1.6, 1.4, '#4a321c'); // a bench-leg
    h.head(sk, 5, -11); h.look('rgba(20,10,6,.9)', -10.8); ctx.fillStyle = '#2a1a10'; ctx.fillRect(-5, -14.4, 10, 2.4); ctx.fillStyle = 'rgba(40,24,14,.5)'; ctx.fillRect(-3.6, -8, 7.4, 2); // a heavy brow, a beard
    ctx.restore(); },
});

/* ---------------- the grounds (TILEX) ---------------- */
const B51G = {flag:'#3a3c42', flagL:'#4a4c54', flagD:'#22242a', wall:'#2a2c32', wallL:'#3e4048', slate:'#3a4450', slateL:'#4e5a68', lamp:'255,192,112', canal:'#1c3430', canalL:'#2e5048', sett:'#5a564e', settL:'#6e6a60', mud:'#2e261e', mudL:'#3e3428'};
/* wet flagstones: big squares, dark joints, a sheen here and there */
function b51Flags(ctx, x, y, T, dark, k = 1){ const px = x*T, py = y*T, P = B51G, h = hash(x, y, 511);
  ctx.fillStyle = dark ? P.flagD : P.flag; ctx.fillRect(px, py, T, T);
  ctx.fillStyle = dark ? 'rgba(80,90,110,.18)' : 'rgba(150,156,170,.2)'; ctx.fillRect(px + T*.04, py + T*.04, T*.44, T*.44); ctx.fillRect(px + T*.52, py + T*.52, T*.44, T*.44);
  ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px + T*.5, py); ctx.lineTo(px + T*.5, py + T); ctx.moveTo(px, py + T*.5); ctx.lineTo(px + T, py + T*.5); ctx.stroke();
  if (h > .7 * k) { ctx.fillStyle = dark ? 'rgba(140,160,200,.12)' : 'rgba(220,226,236,.18)'; ell(ctx, px + T*(.2 + hash(x, y, 512)*.5), py + T*(.2 + hash(x, y, 513)*.5), T*.18, T*.06, ctx.fillStyle); } } // a puddle's sheen
/* a stone wall course, the top lit */
function b51Wall(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B51G; ctx.fillStyle = dark ? '#1c1e24' : P.wall; ctx.fillRect(px, py, T, T);
  ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let r = 0; r < 3; r++) { const yy = py + T*(r + 1)/3; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); ctx.stroke(); const off = (r % 2) * .5; ctx.beginPath(); ctx.moveTo(px + T*(.25 + off*.5), yy - T/3); ctx.lineTo(px + T*(.25 + off*.5), yy); ctx.stroke(); }
  ctx.fillStyle = dark ? 'rgba(120,130,160,.14)' : 'rgba(200,204,214,.18)'; ctx.fillRect(px, py, T, Math.max(1, T*.05)); }
/* the barracks' deep eaves: slate, blue-grey; the front edge shows the wall under it, with a lit window or a door */
const b51EaveAt = (x, y) => { const c = b2Tile(x, y); return c === '=' || c === 'b'; };
function b51Eave(ctx, ch, x, y, T, dark){ const px = x*T, py = y*T, P = B51G, front = !b51EaveAt(x, y + 1), top = front ? py + T*.5 : py + T;
  ctx.fillStyle = dark ? '#262e38' : P.slate; ctx.fillRect(px, py, T, T);
  ctx.save(); ctx.beginPath(); ctx.rect(px, py, T, top - py); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1;
  for (let r = 0; r < 4; r++) { const yy = py + r*T/4; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); ctx.stroke(); for (let c = 0; c < 3; c++) { const xx = px + T*((c + (r % 2)*.5)/3); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx, yy + T/4); ctx.stroke(); } }
  ctx.fillStyle = 'rgba(150,170,200,.1)'; ctx.fillRect(px, py, T, Math.max(1, T*.03)); ctx.restore();
  if (front) { ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(px, top, T, T*.06); const g = ctx.createLinearGradient(0, top, 0, py + T); g.addColorStop(0, '#2c2a30'); g.addColorStop(1, '#1c1a20'); ctx.fillStyle = g; ctx.fillRect(px, top + T*.06, T, py + T - top - T*.06);
    if (ch === 'b') { const dx = px + T*.26, dw = T*.48, dy = top + T*.1; const lg = ctx.createLinearGradient(0, dy, 0, py + T); lg.addColorStop(0, `rgba(${P.lamp},.95)`); lg.addColorStop(1, 'rgba(200,120,60,.85)'); ctx.fillStyle = lg; ctx.fillRect(dx, dy, dw, py + T - dy); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(dx - T*.04, dy - T*.04, dw + T*.08, T*.05); }
    else if (hash(x, y, 514) > .5) { const wx = px + T*(.32 + hash(x, y, 515)*.24), wy = top + T*.16; ctx.fillStyle = `rgba(${P.lamp},${dark ? .85 : .5})`; ctx.fillRect(wx, wy, T*.14, T*.16); ctx.fillStyle = 'rgba(30,20,10,.7)'; ctx.fillRect(wx + T*.065, wy, Math.max(1, T*.015), T*.16); } } }
function b51Fire(ctx, x, y, T){ const px = x*T, py = y*T, cx = px + T*.5, cy = py + T*.6;
  for (let i = 0; i < 9; i++) { const a = i/9*6.283; ell(ctx, cx + Math.cos(a)*T*.3, cy + Math.sin(a)*T*.2, T*.07, T*.05, i % 2 ? '#3a3a3e' : '#4a4a50'); }
  ell(ctx, cx, cy, T*.22, T*.13, '#140a06'); ell(ctx, cx, cy, T*.15, T*.08, '#7a3010');
  poly(ctx, [[cx - T*.14, cy], [cx - T*.04, cy - T*.36], [cx + T*.02, cy - T*.14], [cx + T*.08, cy - T*.3], [cx + T*.15, cy]], 'rgba(255,150,60,.9)'); poly(ctx, [[cx - T*.07, cy], [cx, cy - T*.22], [cx + T*.07, cy]], 'rgba(255,230,150,.95)'); }
/* the clerk's table: a trestle under a lamp, the paybooks squared on it, the oilskin case */
function b51Table(ctx, x, y, T){ const px = x*T, py = y*T; glow(ctx, px + T*.5, py + T*.3, T*1.1, '#ffc070', .3);
  ell(ctx, px + T*.5, py + T*.86, T*.44, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = '#4a3624'; ctx.fillRect(px + T*.08, py + T*.4, T*.84, T*.12); ctx.fillStyle = '#2a1e14'; ctx.fillRect(px + T*.14, py + T*.52, T*.06, T*.32); ctx.fillRect(px + T*.8, py + T*.52, T*.06, T*.32); // the trestle
  ctx.fillStyle = '#e8dcc0'; ctx.fillRect(px + T*.2, py + T*.32, T*.2, T*.1); ctx.fillRect(px + T*.44, py + T*.3, T*.2, T*.12); ctx.fillStyle = '#6a2a20'; ctx.fillRect(px + T*.44, py + T*.38, T*.2, T*.04); // two paybooks, one open
  ctx.fillStyle = '#2e3a36'; ctx.fillRect(px + T*.68, py + T*.28, T*.18, T*.14); ctx.fillStyle = '#c9a35a'; ctx.fillRect(px + T*.75, py + T*.33, T*.04, T*.03); // the oilskin case
  ctx.fillStyle = '#c9a35a'; ctx.fillRect(px + T*.28, py + T*.14, T*.08, T*.16); ctx.fillStyle = 'rgba(255,220,150,.95)'; ctx.fillRect(px + T*.3, py + T*.16, T*.04, T*.08); } // the lamp
TILEX.b5_c1_barracks = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => {
  if (ch === '=' || ch === 'b') return b51Eave(ctx, ch, x, y, T, dark);
  if (ch === '#') return b51Wall(ctx, x, y, T, dark);
  b51Flags(ctx, x, y, T, dark);
  if (ch === '>') { ctx.fillStyle = '#3a2a1a'; ctx.fillRect(x*T + T*.66, y*T, T*.18, T); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(x*T + T*.66, y*T, T*.04, T); } // the gate's leaf, open
  b2Firelit(ctx, x, y, T, .3, 3.6, '255,150,70');
  if (ch === 'F') b51Fire(ctx, x, y, T);
  if (ch === 't') b51Table(ctx, x, y, T); });

/* the Low Walk: setts on the street and walk, the tiers' steps, the kerb with its rope burns, the canal */
function b51Setts(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B51G; ctx.fillStyle = dark ? '#26262a' : P.sett; ctx.fillRect(px, py, T, T);
  ctx.strokeStyle = dark ? 'rgba(0,0,0,.5)' : 'rgba(30,28,24,.45)'; ctx.lineWidth = 1; for (let r = 0; r < 4; r++) { const yy = py + r*T/4; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); ctx.stroke(); for (let c = 0; c < 3; c++) { const xx = px + T*((c + (r % 2)*.5)/3); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx, yy + T/4); ctx.stroke(); } }
  if (!dark) { ctx.fillStyle = 'rgba(255,250,236,.08)'; ctx.fillRect(px, py, T, T*.5); } }
function b51Water(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B51G; const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, dark ? '#0e1c1a' : P.canalL); g.addColorStop(1, dark ? '#081210' : P.canal); ctx.fillStyle = g; ctx.fillRect(px, py, T, T);
  for (let i = 0; i < 3; i++) { const yy = py + T*(.2 + i*.3 + hash(x, y, 520 + i)*.1), xx = px + T*hash(x, y, 523 + i)*.6; ctx.fillStyle = dark ? `rgba(${B51G.lamp},.18)` : 'rgba(200,226,214,.22)'; ctx.fillRect(xx, yy, T*(.2 + hash(x, y, 526 + i)*.25), Math.max(1, T*.025)); } }
TILEX.b5_c1_canal = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, P = B51G;
  if (ch === '~') return b51Water(ctx, x, y, T, dark);
  if (ch === '#') return b51Wall(ctx, x, y, T, dark);
  if (ch === ',') { ctx.fillStyle = dark ? '#28282c' : '#64605a'; ctx.fillRect(px, py, T, T); for (let s = 0; s < 3; s++) { const yy = py + s*T/3; ctx.fillStyle = dark ? 'rgba(120,130,150,.14)' : 'rgba(240,236,224,.22)'; ctx.fillRect(px, yy, T, Math.max(1, T*.06)); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px, yy + T/3 - T*.06, T, T*.06); } return; } // the tiers' steps
  if (ch === '-') { b51Setts(ctx, x, y, T, dark); ctx.fillStyle = dark ? '#3a3a40' : '#8a8478'; ctx.fillRect(px, py + T*.62, T, T*.38); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px, py + T*.92, T, T*.08); ctx.fillStyle = 'rgba(90,60,40,.5)'; if (hash(x, y, 530) > .5) ctx.fillRect(px + T*.4, py + T*.62, T*.12, T*.06); return; } // the kerb, a rope burn
  b51Setts(ctx, x, y, T, dark);
  if (ch === 'P') { ell(ctx, px + T*.5, py + T*.84, T*.26, T*.08, 'rgba(0,0,0,.5)'); ctx.fillStyle = '#2a2a2e'; ctx.fillRect(px + T*.34, py + T*.24, T*.32, T*.6); ctx.fillStyle = '#4a4a50'; ctx.fillRect(px + T*.34, py + T*.24, T*.1, T*.6); ell(ctx, px + T*.5, py + T*.24, T*.18, T*.07, '#5a5a62'); ctx.fillStyle = 'rgba(120,80,50,.7)'; ctx.fillRect(px + T*.34, py + T*.46, T*.32, T*.05); ctx.fillRect(px + T*.34, py + T*.6, T*.32, T*.04); } // a mooring post, rope-burned
  if (ch === 's') { ctx.fillStyle = '#3a2a1a'; ctx.fillRect(px + T*.06, py + T*.5, T*.88, T*.3); for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#e8dcc0' : '#4a5664'; ctx.fillRect(px + T*(.04 + i*.23), py + T*.1, T*.23, T*.22); } ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px + T*.04, py + T*.32, T*.92, T*.05); if (dark) { ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(px + T*.06, py + T*.36, T*.88, T*.44); } else { ell(ctx, px + T*.3, py + T*.5, T*.08, T*.04, '#6a7a6a'); ell(ctx, px + T*.6, py + T*.5, T*.1, T*.04, '#8a5a3a'); } } // a striped awning; shuttered at night
  if (ch === 'n') { ctx.fillStyle = '#3a2a1a'; ctx.fillRect(px + T*.46, py + T*.3, T*.08, T*.6); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(px + T*.14, py + T*.12, T*.72, T*.3); ctx.strokeStyle = '#4a3a2a'; ctx.lineWidth = 1; ctx.strokeRect(px + T*.14 + .5, py + T*.12 + .5, T*.72 - 1, T*.3 - 1); ctx.fillStyle = '#3a2a1e'; ctx.fillRect(px + T*.24, py + T*.2, T*.5, T*.06); ctx.fillRect(px + T*.32, py + T*.3, T*.34, T*.04); } // the builder's board
  if (ch === 'D') { ctx.fillStyle = dark ? '#24242a' : '#4a4a50'; ctx.fillRect(px, py, T, T*.7); ctx.fillStyle = dark ? `rgba(${P.lamp},.85)` : '#1a1614'; ctx.fillRect(px + T*.28, py + T*.24, T*.44, T*.46); ctx.strokeStyle = '#c9a35a'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px + T*.3, py + T*.1); ctx.lineTo(px + T*.7, py + T*.1); ctx.moveTo(px + T*.5, py + T*.04); ctx.lineTo(px + T*.5, py + T*.12); ctx.stroke(); ell(ctx, px + T*.32, py + T*.15, T*.06, T*.025, '#c9a35a'); ell(ctx, px + T*.68, py + T*.13, T*.06, T*.025, '#c9a35a'); if (dark) glow(ctx, px + T*.5, py + T*.6, T*.9, '#ffc070', .3); } // the court's door, the brass scale painted over it
  if (dark && ch !== 'D') { b2Mottle(ctx, x, y, T, .05, .1, P.lamp, 1.2); } });
/* the Low Walk as a fight ground: the canal is the '#' along one side */
TILEX.b5_c1_walk = (ctx, ch, x, y, T, dark) => ch === '#' ? b2Clip(ctx, x, y, T, () => { b51Water(ctx, x, y, T, dark); if (b2Tile(x + 1, y) && b2Tile(x + 1, y) !== '#') { ctx.fillStyle = '#8a8478'; ctx.fillRect(x*T + T*.86, y*T, T*.14, T); } }) : TILEX.b5_c1_canal(ctx, ch, x, y, T, dark);

/* the pit town: mud, rubbish, board-and-canvas shacks, a door with the light in it, carts, braziers */
const b51ShackAt = (x, y) => b2Tile(x, y) === '#' || b2Tile(x, y) === 'D';
function b51Shack(ctx, ch, x, y, T, dark){ const px = x*T, py = y*T, front = !b51ShackAt(x, y + 1), top = front ? py + T*.44 : py + T;
  ctx.fillStyle = hash(x, y, 540) > .5 ? '#2e2a26' : '#3a3026'; ctx.fillRect(px, py, T, T); // the roof: canvas and old boards
  ctx.save(); ctx.beginPath(); ctx.rect(px, py, T, top - py); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(px + T*(i/3 + hash(x, y, 541 + i)*.1), py); ctx.lineTo(px + T*(i/3 + .1), py + T); ctx.stroke(); } if (hash(x, y, 545) > .6) { ctx.fillStyle = 'rgba(120,110,90,.3)'; ctx.fillRect(px + T*.2, py + T*.2, T*.4, T*.2); } ctx.restore();
  if (front) { ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(px, top, T, T*.05); ctx.fillStyle = '#241e18'; ctx.fillRect(px, top + T*.05, T, py + T - top - T*.05); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px + i*T/4, top); ctx.lineTo(px + i*T/4, py + T); ctx.stroke(); } // board walls
    if (ch === 'D') { const dx = px + T*.24, dw = T*.52, dy = top + T*.08; const lg = ctx.createLinearGradient(0, dy, 0, py + T); lg.addColorStop(0, 'rgba(255,190,110,.95)'); lg.addColorStop(1, 'rgba(210,110,50,.9)'); ctx.fillStyle = lg; ctx.fillRect(dx, dy, dw, py + T - dy); ctx.fillStyle = 'rgba(30,16,8,.8)'; ctx.fillRect(dx + dw*.6, dy + T*.08, dw*.24, py + T - dy - T*.08); glow(ctx, px + T*.5, py + T, T*1.2, '#ffa050', .3); }
    else if (hash(x, y, 546) > .7) { ctx.fillStyle = 'rgba(255,170,90,.6)'; ctx.fillRect(px + T*.4, top + T*.14, T*.14, T*.1); } } }
TILEX.b5_c1_pittown = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, P = B51G;
  if (ch === '#' || ch === 'D') return b51Shack(ctx, ch, x, y, T, dark);
  ctx.fillStyle = dark ? '#1e1a14' : P.mud; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .2, '180,160,130', 1.1); // mud
  for (let i = 0; i < 3; i++) { if (hash(x, y, 550 + i) > .6) { ctx.fillStyle = 'rgba(60,50,40,.6)'; ell(ctx, px + T*hash(x, y, 553 + i), py + T*hash(x, y, 556 + i), T*.12, T*.04, ctx.fillStyle); } } // ruts and puddles
  if (ch === ',') { for (let i = 0; i < 5; i++) { ctx.fillStyle = ['#4a3e30', '#5a4e3a', '#3a3a3e', '#6a5a40', '#4a4438'][i]; ctx.fillRect(px + T*(.1 + hash(x, y, 560 + i)*.7), py + T*(.2 + hash(x, y, 565 + i)*.6), T*.14, T*.06); } } // rubbish: boards, a broken jar
  if (ch === '^') { ctx.fillStyle = 'rgba(80,70,56,.6)'; ctx.fillRect(px + T*.2, py, T*.6, T); } // the road back
  b2Firelit(ctx, x, y, T, .34, 3.2, '255,140,60');
  if (ch === 'c') { ell(ctx, px + T*.5, py + T*.84, T*.42, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = '#4a3624'; ctx.fillRect(px + T*.1, py + T*.36, T*.8, T*.32); ctx.fillStyle = '#2a1e12'; ctx.beginPath(); ctx.arc(px + T*.3, py + T*.72, T*.16, 0, 7); ctx.fill(); ctx.strokeStyle = '#5a4630'; ctx.lineWidth = Math.max(1, T*.03); ctx.stroke(); for (let i = 0; i < 3; i++) ell(ctx, px + T*(.3 + i*.2), py + T*.32, T*.07, T*.09, '#8a6a4a'); } // a cart, its jars
  if (ch === 'F') { ctx.fillStyle = '#2a2420'; ctx.fillRect(px + T*.3, py + T*.5, T*.4, T*.34); ctx.fillStyle = '#1a1410'; ctx.fillRect(px + T*.26, py + T*.46, T*.48, T*.06); b2Flames(ctx, px + T*.5, py + T*.46, T, .9); } }); // a brazier: an old iron pot on legs

/* battle cover ('t') on these grounds: a stall barrow on the Low Walk's market, a tavern table in the pit town, a stack of barrels in
   the barracks lane, a mooring post on the walk */
function b51Cover(ctx, x, y, T, dark, st){ const px = x*T, py = y*T;
  ell(ctx, px + T*.5, py + T*.86, T*.4, T*.1, 'rgba(0,0,0,.5)');
  if (st === 'b5_c1_walk') { ctx.fillStyle = '#2a2a2e'; ctx.fillRect(px + T*.34, py + T*.2, T*.32, T*.66); ctx.fillStyle = '#4a4a50'; ctx.fillRect(px + T*.34, py + T*.2, T*.1, T*.66); ell(ctx, px + T*.5, py + T*.2, T*.18, T*.07, '#5a5a62'); ctx.fillStyle = 'rgba(120,80,50,.7)'; ctx.fillRect(px + T*.34, py + T*.44, T*.32, T*.05); return; }
  if (st === 'b5_c1_pittown') { ctx.fillStyle = '#4a3420'; ctx.fillRect(px + T*.08, py + T*.4, T*.84, T*.14); ctx.fillStyle = '#2a1c10'; ctx.fillRect(px + T*.14, py + T*.54, T*.07, T*.3); ctx.fillRect(px + T*.79, py + T*.54, T*.07, T*.3); ell(ctx, px + T*.32, py + T*.38, T*.07, T*.08, '#7a5a3a'); ell(ctx, px + T*.62, py + T*.36, T*.06, T*.1, '#5a6a5a'); return; } // a tavern table, jars on it
  if (st === 'b5_c1_barracks') { for (let i = 0; i < 2; i++) { const bx = px + T*(.12 + i*.4); ctx.fillStyle = dark ? '#3a2a1a' : '#5a4228'; ctx.fillRect(bx, py + T*.34, T*.34, T*.5); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(bx, py + T*.46, T*.34, T*.04); ctx.fillRect(bx, py + T*.7, T*.34, T*.04); ell(ctx, bx + T*.17, py + T*.34, T*.17, T*.05, dark ? '#4a3a26' : '#6a5234'); } return; } // barrels
  ctx.fillStyle = '#3a2a1a'; ctx.fillRect(px + T*.08, py + T*.42, T*.84, T*.36); for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#e8dcc0' : '#4a5664'; ctx.fillRect(px + T*(.06 + i*.22), py + T*.18, T*.22, T*.2); } ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px + T*.06, py + T*.38, T*.88, T*.05); } // a market stall, its awning
{ const B51ST = ['b5_c1_canal', 'b5_c1_walk', 'b5_c1_pittown', 'b5_c1_barracks'], _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (ch === 't' && B51ST.includes(style)) return b51Cover(ctx, x, y, T, dark, style); return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* a skyline of Letheras: the old palace among three old towers, the new palace's great dome under scaffolding, one dark round tower apart */
function b51Skyline(x, W, base, h, col, lit, scaf){ x.fillStyle = col;
  for (let i = 0; i < 30; i++) { const bx = hash(i, 5101)*W, bw = W*(.02 + hash(i, 5102)*.05), bh = h*(.25 + hash(i, 5103)*.5); x.fillRect(bx, base - bh, bw, bh + 2); } // roofs
  [[.18, .9, .02], [.25, 1.1, .018], [.31, .8, .02]].forEach(([u, k, w]) => { x.fillRect(W*u, base - h*1.4*k, W*w, h*1.4*k); x.fillRect(W*u - W*.004, base - h*1.4*k - 3, W*(w + .008), 3); }); // three old towers
  const dx = W*.58, dr = h*.7; x.beginPath(); x.arc(dx, base - h*.5, dr, Math.PI, 0); x.fill(); x.fillRect(dx - dr, base - h*.5, dr*2, h*.5); // the dome
  if (scaf) { x.strokeStyle = scaf; x.lineWidth = 1; for (let i = -4; i <= 4; i++) { x.beginPath(); x.moveTo(dx + i*dr/4, base - h*.5 - Math.sqrt(Math.max(0, 1 - (i/4.2)**2))*dr - 4); x.lineTo(dx + i*dr/4, base); x.stroke(); } for (let j = 0; j < 4; j++) { x.beginPath(); x.moveTo(dx - dr, base - h*.12 - j*dr*.24); x.lineTo(dx + dr, base - h*.12 - j*dr*.24); x.stroke(); } } // scaffolding
  x.beginPath(); x.arc(W*.86, base - h*1.1, W*.016, Math.PI, 0); x.fill(); x.fillRect(W*.86 - W*.016, base - h*1.1, W*.032, h*1.1); // a round dark tower, apart
  if (lit) { for (let i = 0; i < 60; i++) { if (hash(i, 5104) > .5) continue; x.fillStyle = `rgba(${lit},${(.4 + hash(i, 5105)*.5).toFixed(2)})`; x.fillRect(hash(i, 5106)*W, base - hash(i, 5107)*h*.5, 1.4, 1.4); } } }

/* the Whitefinders' barracks yard at night (80's b5_barracks, redrawn): the deep eaves down both sides, lamps in the windows, the clerk's
   lamp by the west wall, the city's glow over the wall (the festival's lanterns when it has begun), and the Sixth's fire near */
SCENEX.b5_barracks = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.44, f = (S && S.f) || {}, fest = (f.b5_c1_ph || 1) >= 3 || (S && S.chapter > 1), fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b51:yard' + (fest ? 'f' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#070a16'],[.7,'#141a2e'],[1, fest ? '#3a2a2a' : '#1e2236']]); x.fillRect(0, 0, W, hz + 2); for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(220,226,250,${(.15 + hash(i, 5111)*.45).toFixed(2)})`; x.fillRect(hash(i, 5112)*W, Math.pow(hash(i, 5113), 1.4)*hz*.7, 1, 1); }
    b51Skyline(x, W, hz - H*.07, H*.12, '#10121c', fest ? '255,190,110' : '255,200,140', 'rgba(60,64,80,.6)'); // the city over the wall
    x.fillStyle = '#22242c'; x.fillRect(0, hz - H*.07, W, H*.07 + 2); x.fillStyle = 'rgba(150,165,210,.12)'; x.fillRect(0, hz - H*.07, W, 1); // the yard wall
    x.fillStyle = vgrad(x, hz, H, [[0,'#1e2026'],[1,'#121318']]); x.fillRect(0, hz, W, H - hz); // the flags
    x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 1; for (let r = 0; r < 8; r++) { const yy = hz + Math.pow(r/8, 1.4)*(H - hz); x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); }
    for (let c = -6; c <= 6; c++) { x.beginPath(); x.moveTo(W/2 + c*W*.03, hz); x.lineTo(W/2 + c*W*.22, H); x.stroke(); }
    [[0, .26], [.74, 1]].forEach(([a, b], s) => { const x0 = W*a, x1 = W*b, top = hz - H*.04, bot = hz + H*.2; x.fillStyle = '#26303c'; x.beginPath(); x.moveTo(x0, top - H*.04); x.lineTo(x1, top - H*.04); x.lineTo(x1, top + H*.02); x.lineTo(x0, top + H*.02); x.fill(); // the slate eaves
      x.fillStyle = '#2a2830'; x.fillRect(x0, top + H*.02, x1 - x0, bot - top); for (let i = 0; i < 4; i++) { const wx = lerp(x0, x1, (i + .5)/4); if (hash(i, s + 5114) > .3) { x.fillStyle = 'rgba(255,192,112,.85)'; x.fillRect(wx - 3, top + H*.07, 6, 7); x.fillStyle = 'rgba(40,20,10,.7)'; x.fillRect(wx - .5, top + H*.07, 1, 7); } } });
    x.fillStyle = 'rgba(255,190,110,.85)'; x.fillRect(W*.84, hz + H*.08, 10, H*.12); // a bunk-house door open on lamplight
    // the clerk's table by the west wall, its lamp, and the clerk at it
    x.fillStyle = '#3a2a1a'; x.fillRect(W*.06, hz + H*.18, W*.12, 4); x.fillRect(W*.07, hz + H*.18 + 4, 2, H*.06); x.fillRect(W*.17, hz + H*.18 + 4, 2, H*.06); x.fillStyle = '#e8dcc0'; x.fillRect(W*.08, hz + H*.18 - 2, W*.04, 2);
  }), 0, 0, W, H);
  // the city's glow over the wall: festival lanterns once it has begun, moving a little
  ctx.globalCompositeOperation = 'lighter'; const nl = fest ? 14 : 4; for (let i = 0; i < nl; i++) { const k = mo ? (Math.sin(t/(4000 + i*600) + i*2) + 1)/2 : hash(i, 5115), lx = W*(.28 + hash(i, 5116)*.46 + (k - .5)*.02), ly = hz - H*.09 - hash(i, 5117)*H*.05; glow(ctx, lx, ly, 10, fest ? '#ffb060' : '#ffc890', .32); ctx.fillStyle = 'rgba(255,224,160,.9)'; ctx.fillRect(lx - .6, ly - .6, 1.2, 1.4); }
  glow(ctx, W*.12, hz + H*.14, H*.16, '#ffc070', .3); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#c9a35a'; ctx.fillRect(W*.11, hz + H*.1, 3, 6);
  drawFigure(ctx, 'b5_c1_clerk', W*.13, hz + H*.26, Math.max(.8, H/260), t, {still:true, dir:1});
  // the Sixth's fire, near, with the squad round it
  const cx = W*.5, cy = H*.9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.4, '#ff8a3a', .3*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*14, cy + Math.sin(a)*4, 3, 2, '#3a3a3e'); } poly(ctx, [[cx - 8, cy], [cx - 2, cy - 16*fl], [cx + 1, cy - 7], [cx + 4, cy - 13*fl], [cx + 8, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - 4, cy], [cx, cy - 9*fl], [cx + 4, cy]], 'rgba(255,230,150,.95)');
  if (mo) for (let i = 0; i < 5; i++) { const k = ((t/1400 + i/5) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*4, cy - 10 - k*30, 1, 1); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(26 + j*22), H*.97 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .78, .55); };

/* the Quillas Canal from the tiers: the far bank's tiers and buildings, a hundred paces of dark green water, the court's rope out over
   it from a post on the near Low Walk, the crowd on the near tiers as shapes. By day; the rope is slack unless a Drowning is on. */
SCENEX.b5_c1_lowwalk = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.3, wl = H*.5, wb = H*.76, f = (S && S.f) || {}, taut = (f.b5_c1_ph || 0) >= 4 && !f.b5_c1_tiers;
  ctx.drawImage(sceneLayer('b51:walk', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#8a98a8'],[1,'#c8c8c0']]); x.fillRect(0, 0, W, hz + 2); // a hazy summer sky
    for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(240,240,236,.35)'; x.beginPath(); x.ellipse(hash(i, 5121)*W, hz*(.2 + hash(i, 5122)*.4), W*.12, hz*.06, 0, 0, 7); x.fill(); }
    b51Skyline(x, W, hz, H*.1, '#6a6e76', null, 'rgba(120,120,126,.7)'); // the city beyond, pale in the haze
    // the far bank: buildings with their backs to the water, then the tiers stepping down to the far Low Walk
    x.fillStyle = '#5a5a5e'; x.fillRect(0, hz, W, H*.08); for (let i = 0; i < 18; i++) { x.fillStyle = hash(i, 5123) > .5 ? '#4a4a50' : '#56545a'; x.fillRect(i*W/18, hz - H*.03*hash(i, 5124), W/18 + 1, H*.03*hash(i, 5124) + 2); if (hash(i, 5125) > .5) { x.fillStyle = '#2a2a2e'; x.fillRect(i*W/18 + W*.02, hz + H*.02, W*.012, H*.025); } }
    for (let s = 0; s < 6; s++) { const yy = hz + H*.08 + s*H*.018; x.fillStyle = s % 2 ? '#6e6a62' : '#7a766c'; x.fillRect(0, yy, W, H*.018); x.fillStyle = 'rgba(0,0,0,.2)'; x.fillRect(0, yy + H*.015, W, H*.003); }
    for (let i = 0; i < 140; i++) { const u = hash(i, 5126), s = Math.floor(hash(i, 5127)*6), yy = hz + H*.08 + s*H*.018 - 2; x.fillStyle = ['#3a3430', '#4a3e34', '#2e3238', '#5a4a3a'][i % 4]; x.fillRect(u*W, yy, 2, 3); } // the far crowd, dots
    x.fillStyle = '#8a8478'; x.fillRect(0, wl - H*.02, W, H*.02); // the far Low Walk's kerb
    x.fillStyle = vgrad(x, wl, wb, [[0,'#2e4a44'],[.5,'#1e3632'],[1,'#162a26']]); x.fillRect(0, wl, W, wb - wl); // the canal, a hundred paces
    // the near Low Walk and the near tiers going up out of the frame, with the crowd's heads along them
    x.fillStyle = '#8a8478'; x.fillRect(0, wb, W, H*.025); x.fillStyle = '#6a665e'; x.fillRect(0, wb + H*.025, W, H*.07); x.strokeStyle = 'rgba(0,0,0,.3)'; for (let i = 0; i < 20; i++) { x.beginPath(); x.moveTo(i*W/20, wb + H*.025); x.lineTo(i*W/20, wb + H*.095); x.stroke(); }
    for (let s = 0; s < 3; s++) { const yy = wb + H*.095 + s*H*.05; x.fillStyle = s % 2 ? '#5a5650' : '#66625a'; x.fillRect(0, yy, W, H*.05); x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(0, yy + H*.045, W, H*.005); }
    for (let i = 0; i < 70; i++) { const u = hash(i, 5128), s = Math.floor(hash(i, 5129)*3), yy = wb + H*.095 + s*H*.05; x.fillStyle = ['#1e1c1a', '#2a2420', '#22262c'][i % 3]; x.beginPath(); x.ellipse(u*W, yy + H*.01, 4 + s, 5 + s, 0, Math.PI, 0); x.fill(); x.fillRect(u*W - 4 - s, yy + H*.01, 8 + 2*s, H*.04); } // the near crowd, shoulders and heads
    // a mooring post on the near walk, and the court's rope from it
    const px = W*.22; x.fillStyle = '#2a2a2e'; x.fillRect(px - 5, wb - H*.05, 10, H*.07); x.fillStyle = '#4a4a50'; x.fillRect(px - 5, wb - H*.05, 3, H*.07);
    x.fillStyle = '#8a8478'; x.fillRect(W*.78, wb - H*.02, W*.08, H*.02); for (let s = 0; s < 4; s++) { x.fillStyle = s % 2 ? '#7a766c' : '#8a8478'; x.fillRect(W*.62 + s*W*.03, wl - H*.02 - s*H*.006, W*.03, H*.008); } // the far steps
  }), 0, 0, W, H);
  // the water's glints, moving
  for (let i = 0; i < 26; i++) { const k = hash(i, 5130), y = lerp(H*.52, H*.74, k), xx = ((hash(i, 5131)*W + t*mo*(.008 + k*.012)) % (W + 30)) - 15; ctx.fillStyle = `rgba(214,232,222,${(.12 + .2*hash(i, 5132)).toFixed(2)})`; ctx.fillRect(xx, y, 6 + 14*hash(i, 5133), 1); }
  // the rope, out over the water from the post: slack in a curve, or taut when the list is on
  const px = W*.22, py = H*.76 - H*.04, ex = W*.62, ey = taut ? H*.62 : H*.68; ctx.strokeStyle = '#8a7650'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); if (taut) ctx.lineTo(ex, ey); else ctx.quadraticCurveTo(W*.42, H*.74, ex, ey); ctx.stroke();
  if (taut) { const ph = mo ? Math.sin(t/300)*.6 : 0; ctx.strokeStyle = 'rgba(214,232,222,.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(ex, ey + 2, 6 + ph, 1.4, 0, 0, 7); ctx.stroke(); } // a ring on the water where it goes in
  else { ctx.fillStyle = '#8a7650'; ctx.fillRect(ex - 1, ey, 2, 3); }
  vign(ctx, W, H, .5, .5); };

/* the pit town at night: the white walls of Letheras behind, shacks of boards and canvas in front, smoke going up, braziers, one lit door */
SCENEX.b5_c1_pittown = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b51:pit', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#070810'],[1,'#1a1c26']]); x.fillRect(0, 0, W, hz + 2); for (let i = 0; i < 50; i++) { x.fillStyle = `rgba(220,226,250,${(.15 + hash(i, 5141)*.4).toFixed(2)})`; x.fillRect(hash(i, 5142)*W, Math.pow(hash(i, 5143), 1.4)*hz*.5, 1, 1); }
    b51Skyline(x, W, hz - H*.14, H*.1, '#14161e', '255,200,140', null); // the city's towers over its walls
    x.fillStyle = vgrad(x, hz - H*.14, hz, [[0,'#c8c4b8'],[1,'#8a887e']]); x.fillRect(0, hz - H*.14, W, H*.14); x.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 24; i++) x.fillRect(i*W/24, hz - H*.155, W/48, H*.015); // the white walls, crenellated, pale in the dark
    x.fillStyle = vgrad(x, hz, H, [[0,'#1e1a14'],[1,'#120e0a']]); x.fillRect(0, hz, W, H - hz); // the mud
    for (let row = 0; row < 3; row++) { const by = hz + H*(.06 + row*.12), s = 1 + row*.5; for (let i = 0; i < 9 - row*2; i++) { const bx = hash(i, row + 5144)*W, bw = W*(.07 + hash(i, row + 5145)*.06)*s, bh = H*(.06 + hash(i, row + 5146)*.04)*s;
      x.fillStyle = row === 2 ? '#1a1612' : '#14120e'; x.fillRect(bx, by - bh, bw, bh); x.beginPath(); x.moveTo(bx - 2, by - bh); x.lineTo(bx + bw*.5, by - bh - H*.02*s); x.lineTo(bx + bw + 2, by - bh); x.fill(); // a shack, a sagging roof
      if (hash(i, row + 5147) > .6) { x.fillStyle = 'rgba(255,170,90,.7)'; x.fillRect(bx + bw*.3, by - bh*.6, bw*.12, bh*.18); x.fillStyle = row === 2 ? '#1a1612' : '#14120e'; } } }
    // the tavern: the one lit door
    const tx = W*.62, ty = hz + H*.34; x.fillStyle = '#1e1a14'; x.fillRect(tx - W*.12, ty - H*.18, W*.24, H*.18); x.beginPath(); x.moveTo(tx - W*.13, ty - H*.18); x.lineTo(tx, ty - H*.24); x.lineTo(tx + W*.13, ty - H*.18); x.fill();
    const lg = x.createLinearGradient(0, ty - H*.12, 0, ty); lg.addColorStop(0, 'rgba(255,190,110,.95)'); lg.addColorStop(1, 'rgba(210,110,50,.9)'); x.fillStyle = lg; x.fillRect(tx - W*.025, ty - H*.12, W*.05, H*.12);
  }), 0, 0, W, H);
  // smoke going up from the shacks, slowly
  for (let i = 0; i < 6; i++) { const sx = W*(.1 + hash(i, 5148)*.8), k = mo ? ((t/9000 + hash(i, 5149)) % 1) : .5; for (let j = 0; j < 4; j++) { const kk = (k + j*.25) % 1; ctx.fillStyle = `rgba(120,116,110,${(.12*(1 - kk)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(sx + Math.sin(kk*4 + i)*8, hz + H*.04 - kk*H*.36, 6 + kk*14, 4 + kk*8, 0, 0, 7); ctx.fill(); } }
  // braziers in the lane, with big slow shapes round them
  [[.18, .82], [.4, .72], [.86, .86]].forEach(([u, v], i) => { const bx = W*u, by = H*v; ctx.globalCompositeOperation = 'lighter'; glow(ctx, bx, by, H*.16, '#ff8a3a', .3*fl); ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#2a2420'; ctx.fillRect(bx - 6, by, 12, 8); ctx.fillStyle = 'rgba(255,170,80,.9)'; ctx.fillRect(bx - 4, by - 3*fl, 8, 3*fl);
    for (let k = 0; k < 2; k++) { const fx = bx + (k ? 14 : -14), fs = 1.3; drawFigure(ctx, 'b5_c1_drunk', fx, by + 8, fs, t, {still:true, dir:k ? -1 : 1, phase:i + k}); } });
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.62, hz + H*.34, H*.22, '#ffa050', .28); ctx.globalCompositeOperation = 'source-over';
  vign(ctx, W, H, .7, .55); };

/* the fines court: a low stone hall, lamps on chains, the bench along the wall with shapes on it, the high desk with the clerk, and the
   brass scale with docks in one pan */
SCENEX.b5_c1_court = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b51:court', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, H, [[0,'#16161a'],[.6,'#24242a'],[1,'#141416']]); x.fillRect(0, 0, W, H);
    for (let i = 0; i < 5; i++) { const ax = W*(i + .5)/5; x.strokeStyle = '#2e2e34'; x.lineWidth = W*.02; x.beginPath(); x.arc(ax, H*.42, W*.1, Math.PI, 0); x.stroke(); } // low vaults
    x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 1; for (let r = 0; r < 10; r++) { const yy = H*.42 + r*H*.035; x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); } // the wall's courses
    x.fillStyle = '#1c1a1c'; x.fillRect(0, H*.78, W, H*.22); x.strokeStyle = 'rgba(0,0,0,.4)'; for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(W/2 + (i - 6)*W*.04, H*.78); x.lineTo(W/2 + (i - 6)*W*.16, H); x.stroke(); } // the floor
    // the bench along the left wall, and the waiting on it: shapes, heads bowed
    x.fillStyle = '#3a2a1a'; x.fillRect(W*.02, H*.68, W*.42, H*.03); for (let i = 0; i < 6; i++) { const bx = W*(.05 + i*.065); x.fillStyle = '#121214'; x.beginPath(); x.ellipse(bx, H*.6, W*.014, H*.03, 0, 0, 7); x.fill(); x.fillRect(bx - W*.018, H*.62, W*.036, H*.07); }
    // the high desk at the far end, the ledger on it
    x.fillStyle = '#2e2218'; x.fillRect(W*.58, H*.5, W*.24, H*.28); x.fillStyle = '#3e2e20'; x.fillRect(W*.56, H*.48, W*.28, H*.03); x.fillStyle = '#e8dcc0'; x.fillRect(W*.62, H*.46, W*.08, H*.02);
    x.fillStyle = '#121214'; x.beginPath(); x.ellipse(W*.7, H*.4, W*.02, H*.04, 0, 0, 7); x.fill(); x.fillRect(W*.68, H*.43, W*.04, H*.05); // the court's clerk, writing
  }), 0, 0, W, H);
  // lamps on chains, swinging a very little
  [[.2, .2], [.5, .16], [.8, .2]].forEach(([u, v], i) => { const sw = mo ? Math.sin(t/1600 + i)*2 : 0, lx = W*u + sw, ly = H*v; ctx.strokeStyle = 'rgba(120,110,90,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(W*u, 0); ctx.lineTo(lx, ly); ctx.stroke();
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.3, '#ffb060', .22); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#c9a35a'; ctx.fillRect(lx - 3, ly, 6, 7); ctx.fillStyle = 'rgba(255,224,150,.95)'; ctx.fillRect(lx - 1.5, ly + 1.5, 3, 4); });
  // the brass scale beside the desk: a beam, two pans, the heavy one down with docks in it
  const sx = W*.88, sy = H*.5, bw = W*.07, tilt = .18; ctx.strokeStyle = '#c9a35a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, H*.78); ctx.lineTo(sx, sy); ctx.stroke(); ctx.fillStyle = '#8a6a2a'; ctx.fillRect(sx - 8, H*.77, 16, 4);
  const lx = sx - Math.cos(tilt)*bw, ly = sy + Math.sin(tilt)*bw, rx = sx + Math.cos(tilt)*bw, ry = sy - Math.sin(tilt)*bw; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry); ctx.stroke();
  [[lx, ly, 1], [rx, ry, 0]].forEach(([px, py, full]) => { ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 8, py + H*.08); ctx.moveTo(px, py); ctx.lineTo(px + 8, py + H*.08); ctx.stroke(); ctx.fillStyle = '#b8902a'; ctx.beginPath(); ctx.ellipse(px, py + H*.08, 10, 3, 0, 0, Math.PI); ctx.fill();
    if (full) for (let k = 0; k < 6; k++) { ell(ctx, px - 6 + k*2.4, py + H*.08 - 1 - (k % 2)*1.4, 2, 1.1, k % 2 ? '#d8b860' : '#c8a040'); } });
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, sx, sy, H*.14, '#e8c073', .14); ctx.globalCompositeOperation = 'source-over';
  vign(ctx, W, H, .7, .5); };

/* the Errant's festival at night: the old towers and the dome against the last of the light, lanterns strung across a canal and along
   its walks, their lights in the water, boats with lanterns, and far off on the palace side a lit balcony with small figures on it */
SCENEX.b5_c1_festival = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46, wl = H*.62;
  ctx.drawImage(sceneLayer('b51:fest', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#0a0c1c'],[.6,'#2a2440'],[1,'#6a4a48']]); x.fillRect(0, 0, W, hz + 2); for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(220,226,250,${(.15 + hash(i, 5151)*.4).toFixed(2)})`; x.fillRect(hash(i, 5152)*W, Math.pow(hash(i, 5153), 1.3)*hz*.5, 1, 1); }
    b51Skyline(x, W, hz, H*.16, '#141420', '255,196,120', 'rgba(70,64,80,.7)');
    // the palace side's balcony, lit, far off right of the dome
    x.fillStyle = '#1a1820'; x.fillRect(W*.66, hz - H*.1, W*.1, H*.1); x.fillStyle = 'rgba(255,200,120,.7)'; x.fillRect(W*.67, hz - H*.075, W*.08, H*.02); x.fillStyle = '#c9a35a'; x.fillRect(W*.665, hz - H*.056, W*.09, 1.5);
    for (let i = 0; i < 7; i++) { x.fillStyle = '#0c0a10'; x.fillRect(W*(.675 + i*.011), hz - H*.088, 1.6, H*.016); } x.fillRect(W*.752, hz - H*.092, 1.8, H*.02); // small figures, and one apart
    // the near bank's houses each side of the canal, lit windows
    [[0, .3], [.7, 1]].forEach(([a, b], s) => { x.fillStyle = '#12101a'; x.beginPath(); x.moveTo(W*a, wl); x.lineTo(W*a, hz - H*.02 - s*H*.03); x.lineTo(W*b, hz + H*.04); x.lineTo(W*b, wl); x.fill(); for (let i = 0; i < 10; i++) { if (hash(i, s + 5154) > .45) { x.fillStyle = 'rgba(255,190,110,.8)'; x.fillRect(W*(a + hash(i, s + 5155)*(b - a)), lerp(hz, wl, .2 + hash(i, s + 5156)*.6), 3, 4); } } });
    x.fillStyle = vgrad(x, hz + H*.04, H, [[0,'#1a2030'],[1,'#0a0c12']]); x.fillRect(W*.28, hz + H*.04, W*.44, H); x.fillRect(0, wl, W, H - wl); // the water
    x.fillStyle = '#3a3a40'; x.fillRect(0, wl, W*.3, 3); x.fillRect(W*.7, wl, W*.3, 3);
  }), 0, 0, W, H);
  // strings of lanterns across the canal, swaying, and their lights broken in the water
  for (let s = 0; s < 3; s++) { const y0 = hz - H*.04 + s*H*.07, sag = H*.04; for (let i = 0; i <= 14; i++) { const k = i/14, lx = lerp(W*.06, W*.94, k), ly = y0 + Math.sin(k*Math.PI)*sag + (mo ? Math.sin(t/1200 + i + s)*1.2 : 0), col = ['#ffb060', '#ff8a5a', '#ffd890'][(i + s) % 3];
      ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, 7, col, .45); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = col; ctx.fillRect(lx - 1.2, ly - 1.5, 2.4, 3);
      if (lx > W*.28 && lx < W*.72) { const ry = lerp(wl, H, .2 + s*.15) + (mo ? Math.sin(t/300 + i)*1.5 : 0); ctx.fillStyle = rgba(col, .35); ctx.fillRect(lx - 2, ry, 4, 1); ctx.fillRect(lx - 1, ry + 3, 2, 1); } } }
  // two boats with lanterns, drifting
  for (let b = 0; b < 2; b++) { const k = mo ? ((t/40000 + b*.5) % 1) : .3 + b*.4, bx = lerp(W*.3, W*.7, k), by = H*(.74 + b*.1); ctx.fillStyle = '#0a0a10'; ctx.beginPath(); ctx.moveTo(bx - 18, by); ctx.lineTo(bx + 18, by); ctx.lineTo(bx + 12, by + 5); ctx.lineTo(bx - 12, by + 5); ctx.fill(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, bx, by - 6, 12, '#ffb060', .4); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#ffd890'; ctx.fillRect(bx - 1, by - 8, 2, 3); }
  vign(ctx, W, H, .6, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Five's ground ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on dark canal-slate with a thin dock-gold rim (Claude's call) */
function b51Item(key, label, body){ const w = 240, h = 130, id = 'c51-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#34444a"></stop><stop offset=".7" stop-color="#1a2428"></stop><stop offset="1" stop-color="#0e1214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a rope-man's hook-knife: a short blade with a back-turned hook, a cord-wrapped grip, the court's brass tag on the pommel */
b51Item('b5_c1_hookknife', 'A rope-man\'s hook-knife', '<ellipse cx="120" cy="70" rx="80" ry="30" fill="#c8d8d0" opacity=".05"/><g transform="rotate(-16 120 66)">'
  + '<path d="M120 60 L170 56 Q186 55 190 62 Q192 68 186 72 L180 70 Q184 66 180 63 Q176 62 170 64 L120 72 Z" fill="#b8b8b4"/><path d="M122 61 L170 57 Q184 56 188 62" stroke="#f0f0ec" stroke-width="1.6" fill="none" opacity=".7"/><path d="M120 71 L170 64" stroke="#6a6a68" stroke-width="1.2"/>'
  + '<rect x="112" y="58" width="9" height="16" rx="2" fill="#5a4a34"/><rect x="62" y="60" width="52" height="12" rx="4" fill="#4a3a26"/>'
  + '<path d="M66 60 L70 72 M74 60 L78 72 M82 60 L86 72 M90 60 L94 72 M98 60 L102 72 M106 60 L110 72" stroke="#8a7650" stroke-width="2.6"/><path d="M66 60 L70 72 M82 60 L86 72 M98 60 L102 72" stroke="#a8946a" stroke-width="1" opacity=".7"/>'
  + '<circle cx="58" cy="66" r="6" fill="#4a3a26"/><path d="M52 66 Q46 66 44 74 L42 86 L52 84 L54 72 Z" fill="#c9a35a"/><path d="M45 76 L51 75 M44 80 L50 79" stroke="#7a5a1a" stroke-width="1"/><circle cx="52" cy="70" r="1.6" fill="#1a1410"/></g>');
/* a wager-chit from the Low Walk: a small oblong of pale wood, a rope and a wave burned in, a chalk number */
b51Item('b5_c1_chit', 'A wager-chit from the Low Walk', '<ellipse cx="120" cy="70" rx="64" ry="30" fill="#e8dcc0" opacity=".06"/><g transform="rotate(-8 120 66)">'
  + '<rect x="72" y="40" width="96" height="52" rx="5" fill="#d8c8a0"/><rect x="72" y="40" width="96" height="6" rx="3" fill="#f0e4c4" opacity=".7"/><path d="M78 86 L162 86" stroke="#a89068" stroke-width="2"/>'
  + '<path d="M80 50 Q90 46 96 52 Q102 58 110 52" stroke="#a89068" stroke-width="1" fill="none" opacity=".6"/><circle cx="80" cy="66" r="4" fill="#5a3a1e"/>'
  + '<path d="M92 56 Q96 64 92 72 Q88 80 94 86" stroke="#4a2e16" stroke-width="2.4" fill="none"/><path d="M98 74 Q106 66 114 74 Q122 82 130 74 Q138 66 146 74" stroke="#4a2e16" stroke-width="2.4" fill="none"/>'
  + '<path d="M126 52 L134 52 L128 62 Q136 60 136 66 Q136 72 128 72 M144 52 L144 72 M140 56 L144 52" stroke="#f4f0e8" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".85"/></g>');
/* the fines court's receipt: a folded square of heavy paper, a blob of grey wax, the court's cord through it */
b51Item('b5_c1_receipt', 'The fines court\'s receipt', '<ellipse cx="120" cy="70" rx="64" ry="34" fill="#f0e8d8" opacity=".06"/><g transform="rotate(6 120 64)">'
  + '<path d="M80 34 L160 34 L164 96 L84 98 Z" fill="#e4dac4"/><path d="M80 34 L160 34 L162 62 L82 64 Z" fill="#f0e8d4"/><path d="M82 64 L162 62" stroke="#b8ac90" stroke-width="1.4"/>'
  + '<path d="M92 44 L148 43 M92 50 L136 49 M92 56 L144 55" stroke="#6a5a40" stroke-width="1.2" opacity=".55"/><path d="M96 74 L130 73 M96 80 L122 80" stroke="#6a5a40" stroke-width="1.2" opacity=".4"/>'
  + '<path d="M40 82 Q80 70 112 68 Q150 66 196 88" stroke="#6a5a40" stroke-width="2.2" fill="none"/><path d="M40 82 Q80 70 112 68" stroke="#9a8a68" stroke-width=".8" fill="none" opacity=".7"/>'
  + '<path d="M112 56 Q100 58 102 68 Q104 80 118 80 Q132 80 132 68 Q132 56 120 56 Z" fill="#7a7a7e"/><circle cx="117" cy="68" r="7" fill="#8e8e92"/><path d="M112 66 L122 66 M117 61 L117 71" stroke="#5a5a5e" stroke-width="1.4"/><path d="M106 60 Q110 57 116 57" stroke="#c8c8cc" stroke-width="1.4" fill="none" opacity=".7"/></g>');
/* the weight-sack: wet-dark canvas, its mouth cord knotted, an iron ring for the rope */
b51Item('b5_c1_weightbag', 'The weight-sack', '<ellipse cx="120" cy="74" rx="66" ry="32" fill="#a8c0b8" opacity=".05"/>'
  + '<path d="M90 50 Q84 70 88 92 Q94 106 120 106 Q148 106 154 92 Q158 72 150 50 Q138 44 120 44 Q102 44 90 50 Z" fill="#4a4a3e"/><path d="M92 54 Q88 74 92 92" stroke="#6a6a5a" stroke-width="2" fill="none" opacity=".6"/>'
  + '<path d="M100 66 Q118 72 140 64 M98 82 Q120 88 146 80" stroke="#2e2e26" stroke-width="1.4" fill="none" opacity=".7"/><path d="M96 96 Q120 102 148 94" stroke="#262620" stroke-width="2" fill="none"/>'
  + '<path d="M104 48 Q112 38 120 36 Q128 38 136 48" fill="#3a3a30"/><path d="M104 48 Q120 54 136 48" stroke="#8a7650" stroke-width="3" fill="none"/><circle cx="112" cy="50" r="3" fill="#8a7650"/><path d="M110 52 Q104 60 108 66 M114 52 Q116 60 112 64" stroke="#8a7650" stroke-width="2" fill="none"/>'
  + '<circle cx="128" cy="26" r="9" fill="none" stroke="#4a4a4e" stroke-width="3.6"/><circle cx="128" cy="26" r="9" fill="none" stroke="#7a7a7e" stroke-width="1" opacity=".7"/><path d="M124 34 Q122 40 120 38" stroke="#8a7650" stroke-width="2.4" fill="none"/>'
  + '<path d="M150 98 Q152 104 150 108 M100 104 Q98 108 100 112" stroke="#9ab8b0" stroke-width="1.2" opacity=".4"/>');
