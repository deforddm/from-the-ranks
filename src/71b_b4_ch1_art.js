/* ============ Book Four, Chapter 1 art: The Muster — Aren's marshaling ground and harbour streets, the 9th's barracks yard, the old cemetery ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/70d, lit from the left; the three grounds (TILEX: the streets on Book Two's Aren paving,
   the barracks yard at night, the old cemetery by lantern); five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the
   rest still), b4_aren_yard redrawn for the chapter; and the chapter's gear (ART['item/b4_c1_*']) on Book Four's sand-and-iron ground.
   Grim things stay distant: the bones are small and white and far off, the open graves are dark earth, the dead are boards. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* a relic thief: a grave-robber out of the harbour quarter, in a hooded rag-cloak gone the colour of turned earth, a sack over the
     shoulder that rattles, a long knife, dirt to the elbows */
  b4_c1_thief(ctx, h, t, o){ const c = b2Pick(o, [['#4a3e30', '#16110c'], ['#3e3a34', '#121010'], ['#52422e', '#1a120a']]);
    ell(ctx, -6.4, -2.4, 3.6, 4.8, h.armor('#6a5638', '#22180e')); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-9, -6, 4.6, .7); // the sack behind the shoulder
    ctx.fillStyle = 'rgba(230,220,196,.7)'; ell(ctx, -7.6, -5.6, .8, .45, ctx.fillStyle); ell(ctx, -5.6, -6.2, .7, .4, ctx.fillStyle); // something pale at the sack's mouth
    h.legs('#241e18'); ctx.fillStyle = 'rgba(60,44,30,.6)'; ctx.fillRect(-4.5, 9, 3.4, 2); ctx.fillRect(1.1, 9.4, 3.4, 1.8); // earth to the shins
    poly(ctx, [[-6,-6],[6,-6],[7.4,8.6],[-7.4,8.6]], h.armor(c[0], c[1])); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 4; i++) ctx.fillRect(-6.8 + i*3.6, 7.2, 1.6, 1.8 + (i % 2)); // the cloak, ragged at the hem
    ctx.fillStyle = 'rgba(70,52,34,.5)'; ctx.fillRect(4.4, -1, 2.2, 5); // dirt up the sleeve
    B2F.line(ctx, '#8a8478', 1.1, [[6, 2.4], [11.4, -4.6]]); B2F.line(ctx, '#3a2a1a', 1.6, [[5.2, 3.6], [6.4, 1.8]]); // the long knife
    h.head('#8a6a52', 4.2, -11.2); poly(ctx, [[-6.2,-5],[-4.4,-15.6],[0,-17.6],[4.6,-15.2],[6.2,-5],[3.8,-7.4],[3.4,-12.8],[-3.2,-12.8],[-3.8,-7.6]], c[0]); // the hood
    ell(ctx, .6, -10.4, 3.2, 3.4, 'rgba(10,8,6,.72)'); h.look('rgba(230,210,180,.55)', -11); ctx.fillStyle = 'rgba(255,240,210,.08)'; ctx.fillRect(-4, -15.4, 2.6, 1); },
  /* a hired tough: a big harbour man with bare forearms, a leather jerkin over nothing, a head-cloth, a club of hard wood, a broken nose */
  b4_c1_tough(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.12, 1.05); const sk = b2Pick(o, ['#8e6a4e', '#7a5640', '#9a7656']), cl = b2Pick(o, ['#6a2a1e', '#4a4434', '#2e3a44']);
    h.legs('#2a241c'); h.torso('#5a4430', '#1e160e', 7.2); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(-.6, -6, 1.2, 12); ctx.fillStyle = 'rgba(255,230,190,.16)'; ctx.fillRect(-6.4, -5.6, 2, 9); // the jerkin, laced
    ctx.fillStyle = '#2a1c10'; ctx.fillRect(-6.6, 3.6, 13.2, 1.4); ell(ctx, 0, 4.3, 1.2, .9, '#8a7a5a'); // a belt
    ctx.fillStyle = sk; ctx.fillRect(-9, -5, 2.6, 8.4); ctx.fillRect(6.4, -5, 2.6, 7); ell(ctx, -7.7, 3.6, 1.6, 1.6, sk); // bare forearms
    B2F.line(ctx, '#4a3220', 2.4, [[7.6, 1.6], [10.4, -9.6]]); ell(ctx, 10.6, -10.4, 1.8, 2.2, '#5a3e26'); ctx.fillStyle = 'rgba(255,230,190,.25)'; ctx.fillRect(9.4, -10.6, .8, 3); // the club, knotted at the head
    h.head(sk, 4.8, -11); h.look('rgba(18,10,6,.9)', -11.4); ctx.fillStyle = 'rgba(40,24,16,.5)'; ctx.fillRect(-3.4, -8.6, 7.6, 1.8); poly(ctx, [[1.6,-11],[3.4,-9.8],[1.8,-8.8]], shade(sk, -.25)); // stubble, a nose that has been broken
    B2F.cloth(ctx, cl, shade(cl, -.3)); ctx.restore(); },
  /* a durhang runner: a thin harbour boy, a short tunic and bare legs, a cloth round the head, a satchel of clay pipes and resin, a knife */
  b4_c1_runner(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .88, .94); const c = b2Pick(o, [['#b8a07a', '#5a4a30'], ['#8a6a4a', '#3a2818'], ['#a8a090', '#4a463c']]);
    ctx.fillStyle = '#7a5a3e'; ctx.fillRect(-4.5, 5, 3.4, 8); ctx.fillRect(1.1, 5, 3.4, 8); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-4.5, 11.6, 3.4, 1.4); ctx.fillRect(1.1, 11.6, 3.4, 1.4); // bare legs, bare feet
    poly(ctx, [[-5.6,-6],[5.6,-6],[6.2,6.4],[-6.2,6.4]], h.armor(c[0], c[1])); ctx.fillStyle = '#3a2a18'; ctx.fillRect(-5.8, 1.6, 11.6, 1.2); // a short tunic, a cord belt
    B2F.line(ctx, '#3a2414', .8, [[-5, -6], [5, 2]]); poly(ctx, [[3.4,1],[8.6,1],[8,6],[4,6]], h.armor('#6a4a2a', '#2a1a0c')); ctx.fillStyle = '#c8b090'; for (let i = 0; i < 3; i++) ctx.fillRect(4.4 + i*1.3, -.4, .7, 2); // the satchel, pipe stems out of it
    ctx.fillStyle = '#7a5a3e'; ctx.fillRect(-8, -4.6, 2.2, 7); B2F.line(ctx, '#9a948a', 1, [[-7, 2.6], [-10.6, -2]]); // a bare arm, a knife low
    h.head('#8a6448', 4, -11); h.look('rgba(20,12,8,.9)', -11.2); B2F.cloth(ctx, '#d8ccb0', '#8a7a5a'); ctx.restore(); },
  /* Captain Hollet: thin, Genabackan, a garrison clerk made a captain; the 9th's grey-blue officer's coat a size too big, a wax tablet
     in one hand and a stylus in the other, no helm (it is under the awning), thin hair, the cough in the shoulders */
  b4_c1_hollet(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1.1); const cough = o.still ? 0 : Math.max(0, Math.sin(t/700)) * .5;
    h.legs('#26282c'); ctx.fillStyle = '#1a1612'; ctx.fillRect(-4.5, 10.6, 3.4, 2.4); ctx.fillRect(1.1, 10.6, 3.4, 2.4); // boots
    poly(ctx, [[-6,-6],[6,-6],[6.8,9],[-6.8,9]], h.armor('#5a6474', '#1e222a')); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-.5, -6, 1, 15); ctx.fillStyle = '#c8a050'; for (let i = 0; i < 4; i++) ell(ctx, 1.2, -4 + i*3, .5, .5, '#c8a050'); // the long coat, brass buttons
    ctx.fillStyle = '#8a2a20'; ctx.fillRect(-6, 2, 12, 1.6); // a captain's sash
    ctx.fillStyle = '#d8c09a'; poly(ctx, [[-9.6,-3],[-4.6,-4],[-4,2.6],[-9,3.4]], '#c8a878'); ctx.strokeStyle = '#5a4630'; ctx.lineWidth = .5; ctx.strokeRect(-8.8, -2.4, 3.6, 4.6); ctx.strokeStyle = 'rgba(60,40,20,.5)'; ctx.beginPath(); for (let i = 0; i < 3; i++) { ctx.moveTo(-8.2, -1.4 + i*1.3); ctx.lineTo(-5.8, -1.6 + i*1.3); } ctx.stroke(); // the wax tablet
    B2F.line(ctx, '#e8dcc0', .7, [[5.6, -1], [8.4, -5.4]]); // the stylus
    ctx.translate(0, cough); h.head('#d0b498', 4.2, -11.2); h.look('rgba(28,18,12,.8)', -11.4); ctx.fillStyle = 'rgba(120,80,60,.35)'; ctx.fillRect(-2.8, -8.6, 5.6, .8); // a thin mouth
    B2F.cap(ctx, '#8a7a62', 4.4, -12.8, 1.05, 1.95); ctx.fillStyle = 'rgba(210,180,150,.5)'; ctx.fillRect(-1, -16.4, 2.2, 1.4); ctx.restore(); }, // thin hair, the scalp showing through
  /* Sergeant Radde: a bald Falari, stocky, sunburnt scalp, a red-gold moustache going grey; Malazan scale; the company roll (a book the
     size of a brick) under one arm and the pointing stick in the other hand */
  b4_c1_radde(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.08, 1);
    h.legs('#2a2622'); h.torso('#7a7466', '#2a2824', 7); ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-6.6, -4.4 + i*2.2); ctx.lineTo(6.6, -4.4 + i*2.2); } ctx.stroke(); // scale
    ctx.fillStyle = '#4a3a26'; ctx.fillRect(-6.4, 3.4, 12.8, 1.4); ctx.fillStyle = '#d8a858'; ctx.fillRect(-6.4, -6, 3, 2.2); // belt, a sergeant's flash
    poly(ctx, [[-10.4,-4.6],[-4.2,-5.4],[-3.8,3],[-10,3.8]], h.armor('#6a4a2a', '#2a1a0e')); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-4.4, -4.8, .7, 7.6); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = .5; ctx.strokeRect(-10, -4.4, 5.8, 7.8); // the roll, its pages showing
    B2F.line(ctx, '#7a5a36', 1.2, [[6.4, 3], [11, -8]]); // the stick
    h.head('#d09070', 4.8, -11); ctx.fillStyle = 'rgba(255,220,190,.35)'; ell(ctx, -1.6, -14.2, 2, 1.2, ctx.fillStyle); ctx.fillStyle = 'rgba(200,70,40,.25)'; ell(ctx, .4, -13.6, 3.6, 2, ctx.fillStyle); // bald, and burnt by it
    h.look('rgba(24,14,10,.85)', -11.6); poly(ctx, [[-2.6,-9.4],[4.2,-9.4],[4.6,-7.6],[3,-8.6],[.8,-8.4],[-1.4,-8.6],[-3,-7.6]], '#b8703a'); ctx.fillStyle = 'rgba(220,210,190,.4)'; ctx.fillRect(2.6, -9.2, 1.4, .8); // the moustache, going grey at one end
    ctx.restore(); },
  /* a raw Quon recruit: sunburnt across the nose, new leather that creaks, a helm a size too big, a spear held like a broom, a round
     shield borrowed from the stores, and the finger bone on its thong like everyone else */
  b4_c1_recruit(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1.04); const sk = b2Pick(o, ['#d8b094', '#c89878', '#e0bca0', '#b88868']), lt = b2Pick(o, [['#b0905e', '#4e3a20'], ['#a88a62', '#463420'], ['#9a8460', '#3a3020']]);
    B2F.line(ctx, '#8b7355', 1.2, [[7.6, 12], [9.6, -19]]); poly(ctx, [[9.8,-23],[8.6,-18],[10.8,-17.6]], '#d8d4c4'); // the spear, held at a slant, wrong
    h.legs('#3a3428'); h.torso(lt[0], lt[1], 6); ctx.fillStyle = 'rgba(255,244,214,.22)'; ctx.fillRect(-5.4, -5.6, 1.8, 10); // new leather, still pale
    ctx.fillStyle = '#5a4630'; ctx.fillRect(-6, 3.6, 12, 1.1); B2F.line(ctx, '#3a2a18', .45, [[-2, -6], [.4, -2.8], [2.6, -6]]); ell(ctx, .4, -2.2, .6, 1.1, '#eee4cc'); // the bone at the throat
    h.head(sk, 4.2, -11); h.look('rgba(24,14,10,.85)', -11); ctx.fillStyle = 'rgba(210,90,70,.35)'; ctx.fillRect(-.6, -10.4, 3.4, 1); // sunburn across the nose
    if (hash(Math.round((o.phase || 0) * 7), 3) > .5) { ctx.fillStyle = 'rgba(150,80,40,.5)'; for (let i = 0; i < 4; i++) ctx.fillRect(-1 + i*1.1, -9.6 + (i % 2)*.5, .5, .5); } // freckles, on some
    ctx.beginPath(); ctx.arc(0, -12.3, 6, Math.PI*.96, Math.PI*2.04); ctx.fillStyle = h.armor('#a8a294', '#3a3830'); ctx.fill(); ctx.fillRect(-6.4, -12.4, 12.8, 1.5); ctx.fillStyle = 'rgba(255,255,250,.3)'; ctx.fillRect(-3.6, -17.2, 3, 1); // the helm, too big
    h.shield('#7a6448', '#2a2218', 5.4, -7, .8); ctx.restore(); },
});

/* ---------------- ground: TILEX ----------------
   b4_c1_aren: Aren's harbour streets and the marshaling ground's edge, on Book Two's Aren paving (54b, TILEX.aren) by day: '.' paving,
     ',' sand blown in, '#' wall, '=' awning, 'w' well (all Book Two's); here also 'c' a cart under an oiled hide, 's' the relic stall,
     'D' the 9th's barracks gate with its bars down.
   b4_c1_barracks: the 9th's barracks yard at night: '.' flags, ',' grit, '#' the yard wall (Book Two's night paving and wall-walk), '='
     the flat mud-brick roofs of the bunk-houses, 'b' a bunk-house door under its lintel, lamplit, 'F' the Third's fire in its ring.
   b4_c1_graves: the old cemetery at night: '.' earth, ',' dug earth, '#' old tombs, 'o' open graves, 'x' dead trees, 'F' lanterns. */
const b41Fire = '255,150,70';
function b41Cart(ctx, x, y, T, N){ const px = x*T, py = y*T; // a two-wheeled cart, its load under an oiled hide roped down, shafts on the ground
  ell(ctx, px + T*.54, py + T*.86, T*.46, T*.1, 'rgba(0,0,0,.45)');
  ctx.fillStyle = N ? '#2a2016' : '#5a3e24'; ctx.fillRect(px + T*.12, py + T*.3, T*.74, T*.46); ctx.fillStyle = N ? '#3a2c1e' : '#7a5a36'; ctx.fillRect(px + T*.12, py + T*.3, T*.74, T*.05); // the bed
  const hg = ctx.createLinearGradient(px, py + T*.16, px + T, py + T*.7); hg.addColorStop(0, N ? '#3a3a32' : '#8a7e5a'); hg.addColorStop(1, N ? '#1a1a16' : '#4a4230'); ctx.fillStyle = hg;
  ctx.beginPath(); ctx.moveTo(px + T*.14, py + T*.34); ctx.quadraticCurveTo(px + T*.5, py + T*.08, px + T*.84, py + T*.34); ctx.lineTo(px + T*.84, py + T*.62); ctx.lineTo(px + T*.14, py + T*.62); ctx.closePath(); ctx.fill(); // the hide over the crates
  ctx.fillStyle = N ? 'rgba(150,165,210,.08)' : 'rgba(255,250,220,.28)'; ctx.beginPath(); ctx.moveTo(px + T*.18, py + T*.32); ctx.quadraticCurveTo(px + T*.4, py + T*.16, px + T*.56, py + T*.17); ctx.lineTo(px + T*.5, py + T*.22); ctx.quadraticCurveTo(px + T*.36, py + T*.22, px + T*.2, py + T*.36); ctx.fill(); // its oiled sheen
  ctx.strokeStyle = N ? 'rgba(120,110,90,.5)' : 'rgba(200,180,130,.8)'; ctx.lineWidth = Math.max(1, T*.03); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(px + T*(.26 + i*.22), py + T*.2); ctx.lineTo(px + T*(.24 + i*.22), py + T*.62); ctx.stroke(); } // ropes
  [[.24, .74], [.76, .74]].forEach(([u, v]) => { ell(ctx, px + T*u, py + T*v, T*.12, T*.12, N ? '#1a140e' : '#3a2814'); ctx.strokeStyle = N ? '#4a4030' : '#9a7a4a'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.arc(px + T*u, py + T*v, T*.1, 0, 7); ctx.stroke(); ell(ctx, px + T*u, py + T*v, T*.03, T*.03, N ? '#4a4030' : '#9a7a4a'); }); // the wheels
  B2F.line(ctx, N ? '#2a2016' : '#5a3e24', Math.max(1.4, T*.05), [[px + T*.86, py + T*.5], [px + T*1.02, py + T*.9]]); }
function b41Stall(ctx, x, y, T, N){ const px = x*T, py = y*T; // the relic stall: the awning, a trestle with a cloth, and on it feathers, braids, small glass phials
  TILEX.aren(ctx, '=', x, y, T, N);
  ctx.fillStyle = N ? '#2a2420' : '#d8ccb0'; ctx.fillRect(px + T*.12, py + T*.66, T*.76, T*.18); ctx.fillStyle = N ? '#1a1612' : '#a89a7a'; ctx.fillRect(px + T*.12, py + T*.8, T*.76, T*.04); // the cloth on the trestle
  for (let i = 0; i < 5; i++) { const fx = px + T*(.18 + i*.15), fy = py + T*.74; ctx.fillStyle = N ? '#e8dcc0' : 'rgba(255,255,250,.9)'; ctx.fillRect(fx, fy - T*.06, T*.035, T*.08); ell(ctx, fx + T*.017, fy - T*.065, T*.03, T*.012, N ? '#a8955a' : '#c8a040'); // phials, wax-stoppered
    ctx.fillStyle = '#9a2a1e'; ctx.fillRect(fx - T*.005, fy - T*.02, T*.045, T*.012); if (!N) { ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fillRect(fx + T*.006, fy - T*.05, T*.008, T*.03); } } // the red rag at each neck; a glint
  ctx.strokeStyle = '#141018'; ctx.lineWidth = Math.max(1, T*.03); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(px + T*(.2 + i*.08), py + T*.8); ctx.quadraticCurveTo(px + T*(.22 + i*.08), py + T*.7, px + T*(.26 + i*.08), py + T*.68); ctx.stroke(); } } // crow feathers, in threes
function b41Gate(ctx, x, y, T, N){ const px = x*T, py = y*T; // the 9th's barracks gate: Book Two's gate passage, with iron bars down across it
  TILEX.aren(ctx, 'g', x, y, T, N);
  ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px + T*.08, py + T*.2, T*.84, T*.06);
  for (let i = 0; i < 6; i++) { const bx = px + T*(.12 + i*.15); ctx.fillStyle = N ? '#2a2c34' : '#2a2a2e'; ctx.fillRect(bx, py + T*.06, Math.max(1.4, T*.05), T*.9); ctx.fillStyle = N ? 'rgba(150,165,210,.15)' : 'rgba(255,240,210,.35)'; ctx.fillRect(bx, py + T*.06, Math.max(1, T*.015), T*.9); }
  ctx.fillStyle = N ? '#2a2c34' : '#2a2a2e'; ctx.fillRect(px + T*.08, py + T*.4, T*.84, Math.max(1.4, T*.05)); ctx.fillRect(px + T*.08, py + T*.76, T*.84, Math.max(1.4, T*.05)); } // cross-bars
TILEX.b4_c1_aren = (ctx, ch, x, y, T, dark) => {
  if (ch === 'c') { TILEX.aren(ctx, '.', x, y, T, dark); return b2Clip(ctx, x, y, T, () => b41Cart(ctx, x, y, T, !!dark)); }
  if (ch === 's') return b2Clip(ctx, x, y, T, () => b41Stall(ctx, x, y, T, !!dark));
  if (ch === 'D') return b2Clip(ctx, x, y, T, () => b41Gate(ctx, x, y, T, !!dark));
  if (ch === 't') return TILEX.aren(ctx, '.', x, y, T, dark); // never a tower here (a battle's low cover is drawn by drawFeature)
  return TILEX.aren(ctx, ch, x, y, T, dark); };

/* the barracks yard: Book Two's night paving and wall, the bunk-houses' flat roofs, their doors, the fire */
const b41RoofAt = (x, y) => { const c = b2Tile(x, y); return c === '=' || c === 'b'; };
function b41Roof(ctx, ch, x, y, T){ const px = x*T, py = y*T, front = !b41RoofAt(x, y + 1), back = !b41RoofAt(x, y - 1), l = !b41RoofAt(x - 1, y), r = !b41RoofAt(x + 1, y);
  const top = front ? py + T*.46 : py + T; // where the roof stops and the front wall begins
  ctx.fillStyle = '#2c2a30'; ctx.fillRect(px, py, T, T); // the roof, mud plaster over brick, gone blue in the dark
  ctx.save(); ctx.beginPath(); ctx.rect(px, py, T, top - py); ctx.clip();
  b2Mottle(ctx, x, y, T, .03, .18, '150,165,210', 1.2); for (let i = 0; i < 3; i++) { ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; ctx.beginPath(); const cx = px + hash(x, y, i + 5)*T, cy = py + hash(y, x, i + 6)*T; ctx.moveTo(cx, cy); ctx.lineTo(cx + T*.2, cy + T*.06); ctx.stroke(); } // cracks in the plaster
  const lip = Math.max(2, T*.1); ctx.fillStyle = '#3e3c46'; if (back) ctx.fillRect(px, py, T, lip); if (l) ctx.fillRect(px, py, lip, T); if (r) ctx.fillRect(px + T - lip, py, lip, T); // the parapet lip round the roof's edge
  ctx.fillStyle = 'rgba(150,165,210,.14)'; if (back) ctx.fillRect(px, py, T, Math.max(1, T*.03)); if (l) ctx.fillRect(px, py, Math.max(1, T*.03), T);
  if (hash(x, y, 9) > .7 && !l && !r) { ctx.fillStyle = '#1a181e'; ctx.fillRect(px + T*.3, py + T*.2, T*.22, T*.18); ctx.fillStyle = 'rgba(150,165,210,.12)'; ctx.fillRect(px + T*.3, py + T*.2, T*.22, Math.max(1, T*.025)); } // a hatch
  ctx.restore();
  if (front) { ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(px, top - T*.03, T, T*.05); // the lip's shadow
    const g = ctx.createLinearGradient(0, top, 0, py + T); g.addColorStop(0, '#3a3438'); g.addColorStop(1, '#221e22'); ctx.fillStyle = g; ctx.fillRect(px, top, T, py + T - top); // the front wall, mud brick
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let k = 1; k < 3; k++) { ctx.beginPath(); ctx.moveTo(px, top + k*(py + T - top)/3); ctx.lineTo(px + T, top + k*(py + T - top)/3); ctx.stroke(); }
    if (ch === 'b') { const dx = px + T*.28, dw = T*.44, dy = top + T*.06; ctx.fillStyle = '#4a3a2a'; ctx.fillRect(dx - T*.04, dy - T*.04, dw + T*.08, T*.06); // the lintel
      const lg = ctx.createLinearGradient(0, dy, 0, py + T); lg.addColorStop(0, 'rgba(255,190,110,.95)'); lg.addColorStop(1, 'rgba(200,110,50,.85)'); ctx.fillStyle = lg; ctx.fillRect(dx, dy + T*.02, dw, py + T - dy - T*.02); // the door open on lamplight
      ctx.fillStyle = 'rgba(40,24,14,.8)'; ctx.fillRect(dx + dw*.55, dy + T*.08, dw*.3, py + T - dy - T*.08); } // somebody in it
    else if (hash(x, y, 11) > .45) { const wx = px + T*(.3 + hash(x, y, 12)*.3), wy = top + T*.12; ctx.fillStyle = 'rgba(255,180,100,.85)'; ctx.fillRect(wx, wy, T*.12, T*.14); ctx.fillStyle = 'rgba(40,20,10,.7)'; ctx.fillRect(wx + T*.055, wy, Math.max(1, T*.015), T*.14); } } } // a shuttered window, lit
function b41YardFire(ctx, x, y, T, t){ const px = x*T, py = y*T, cx = px + T*.5, cy = py + T*.58;
  for (let i = 0; i < 9; i++) { const a = i/9*6.283; ell(ctx, cx + Math.cos(a)*T*.3, cy + Math.sin(a)*T*.2, T*.07, T*.05, i % 2 ? '#3a3632' : '#4a4640'); } // the ring of stones
  ell(ctx, cx, cy, T*.22, T*.13, '#1a0e08'); ell(ctx, cx, cy, T*.16, T*.09, '#6a2a10');
  poly(ctx, [[cx - T*.14, cy], [cx - T*.04, cy - T*.36], [cx + T*.02, cy - T*.14], [cx + T*.08, cy - T*.3], [cx + T*.15, cy]], 'rgba(255,150,60,.9)'); poly(ctx, [[cx - T*.07, cy], [cx, cy - T*.22], [cx + T*.07, cy]], 'rgba(255,230,150,.95)'); // the flames (still: the map is prerendered)
  ell(ctx, cx + T*.28, cy + T*.04, T*.07, T*.05, '#2a2420'); ctx.fillStyle = '#3a3430'; ctx.fillRect(cx + T*.2, cy - T*.08, T*.14, T*.1); } // a pot by it
TILEX.b4_c1_barracks = (ctx, ch, x, y, T, dark) => {
  if (ch === '=' || ch === 'b') return b2Clip(ctx, x, y, T, () => b41Roof(ctx, ch, x, y, T));
  TILEX.aren(ctx, ch === 'F' ? '.' : ch === 't' ? '.' : ch, x, y, T, true);
  b2Clip(ctx, x, y, T, () => { if (ch !== '#') b2Firelit(ctx, x, y, T, .34, 3.6, b41Fire); if (ch === 'F') b41YardFire(ctx, x, y, T, 0); }); };

/* the old cemetery by night: earth gone blue-grey, dry grass, old box-tombs, open graves with their spoil heaped beside, dead trees, lanterns */
const b41GN = {earth:'#26242a', earthL:'#34323a', dug:'#1c1814', dugL:'#3a3028', stone:'#34343c', stoneL:'#4a4a54', stoneD:'#1c1c22', lit:'150,160,200'};
function b41Graves(ctx, ch, x, y, T){ const px = x*T, py = y*T, P = b41GN, h = hash(x, y);
  const earth = () => { ctx.fillStyle = P.earth; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .03, .16, P.lit, 1.3);
    for (let i = 0; i < 6; i++) { const gx = px + hash(x, y, i + 30)*T, gy = py + hash(y, x, i + 31)*T; ctx.strokeStyle = 'rgba(110,110,90,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx - T*.03, gy - T*.08); ctx.moveTo(gx, gy); ctx.lineTo(gx + T*.03, gy - T*.07); ctx.stroke(); } // dry grass
    if (h > .82) { ctx.fillStyle = 'rgba(90,90,100,.6)'; ctx.fillRect(px + T*.3, py + T*.5, T*.2, T*.06); } }; // a sunk marker stone
  const dug = () => { ctx.fillStyle = P.dug; ctx.fillRect(px, py, T, T); for (let i = 0; i < 10; i++) ell(ctx, px + hash(x, y, i + 40)*T, py + hash(y, x, i + 41)*T, T*(.04 + hash(x, y, i + 42)*.06), T*(.03 + hash(y, x, i + 43)*.04), i % 3 ? P.dugL : '#100c0a'); // turned clods
    ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px + T*.2, py + T*.3); ctx.lineTo(px + T*.36, py + T*.34); ctx.moveTo(px + T*.56, py + T*.7); ctx.lineTo(px + T*.74, py + T*.66); ctx.stroke(); }; // spade cuts
  if (ch === ',' ) { dug(); }
  else if (ch === '#') { // an old box-tomb from above: a lid of grey stone, lit on its top-left edge, its face where it stands over open ground
    ctx.fillStyle = P.earth; ctx.fillRect(px, py, T, T);
    const below = b2Tile(x, y + 1) !== '#', top = below ? py + T*.66 : py + T, l = b2Tile(x - 1, y) !== '#', r = b2Tile(x + 1, y) !== '#', up = b2Tile(x, y - 1) !== '#';
    ctx.fillStyle = P.stone; ctx.fillRect(px + (l ? T*.06 : 0), py + (up ? T*.08 : 0), T - (l ? T*.06 : 0) - (r ? T*.06 : 0), top - py - (up ? T*.08 : 0));
    ctx.fillStyle = 'rgba(170,180,210,.12)'; if (up) ctx.fillRect(px + (l ? T*.06 : 0), py + T*.08, T, Math.max(1, T*.03)); if (l) ctx.fillRect(px + T*.06, py + (up ? T*.08 : 0), Math.max(1, T*.03), top - py);
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; if (hash(x, y, 3) > .5) { ctx.beginPath(); ctx.moveTo(px + T*.3, py + T*.2); ctx.lineTo(px + T*.5, py + T*.36); ctx.lineTo(px + T*.46, py + T*.56); ctx.stroke(); } // a crack
    ctx.fillStyle = 'rgba(80,100,70,.3)'; for (let i = 0; i < 3; i++) ell(ctx, px + T*hash(x, y, i + 50), py + T*(.2 + hash(y, x, i + 51)*.4), T*.06, T*.03, ctx.fillStyle); // lichen
    if (below) { const g = ctx.createLinearGradient(0, top, 0, py + T); g.addColorStop(0, P.stoneD); g.addColorStop(1, '#141418'); ctx.fillStyle = g; ctx.fillRect(px + (l ? T*.06 : 0), top, T - (l ? T*.06 : 0) - (r ? T*.06 : 0), py + T - top); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px, top, T, Math.max(1, T*.03)); }
    if (r) { ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px + T*.94, py, T*.06, T); } }
  else if (ch === 'o') { earth(); // an open grave: a dark slot in the earth, its spoil heaped along one side
    ell(ctx, px + T*.52, py + T*.2, T*.38, T*.13, P.dugL); for (let i = 0; i < 6; i++) ell(ctx, px + T*(.22 + hash(x, y, i + 60)*.6), py + T*(.14 + hash(y, x, i + 61)*.1), T*.06, T*.04, P.dug); // the heap
    ctx.fillStyle = '#060506'; ctx.fillRect(px + T*.22, py + T*.34, T*.56, T*.54); const g = ctx.createLinearGradient(0, py + T*.34, 0, py + T*.6); g.addColorStop(0, 'rgba(60,48,36,.8)'); g.addColorStop(1, 'rgba(60,48,36,0)'); ctx.fillStyle = g; ctx.fillRect(px + T*.22, py + T*.34, T*.56, T*.26); // the slot, its near wall lit
    ctx.fillStyle = 'rgba(150,160,200,.12)'; ctx.fillRect(px + T*.22, py + T*.86, T*.56, Math.max(1, T*.025)); B2F.line(ctx, '#5a4a32', Math.max(1, T*.04), [[px + T*.82, py + T*.1], [px + T*.9, py + T*.5]]); } // the far lip, a spade left standing
  else if (ch === 'x') { earth(); const cx = px + T*.5, cy = py + T*.82; ell(ctx, cx + T*.12, cy, T*.3, T*.08, 'rgba(0,0,0,.45)'); // a dead tree: a grey trunk, bare limbs
    ctx.strokeStyle = '#18161a'; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2, T*.1); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.quadraticCurveTo(cx - T*.06, cy - T*.3, cx + T*.02, cy - T*.56); ctx.stroke();
    ctx.lineWidth = Math.max(1, T*.04); [[-.3, -.7, -.42, -.84], [.04, -.6, .3, -.78], [-.06, -.44, -.28, -.5], [.02, -.5, .18, -.56]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(cx + a*T*.2, cy + b*T*.8); ctx.quadraticCurveTo(cx + (a + c)*T*.5, cy + (b + d)*T*.5 - T*.04, cx + c*T, cy + d*T); ctx.stroke(); });
    ctx.strokeStyle = 'rgba(150,160,200,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - T*.04, cy - T*.04); ctx.quadraticCurveTo(cx - T*.09, cy - T*.3, cx - T*.02, cy - T*.54); ctx.stroke(); ctx.lineCap = 'butt'; }
  else if (ch === 'F') { earth(); const cx = px + T*.5, top = py + T*.18; // a lantern on a post
    ell(ctx, cx, py + T*.86, T*.12, T*.04, 'rgba(0,0,0,.5)'); ctx.fillStyle = '#2a2018'; ctx.fillRect(cx - T*.025, top + T*.1, T*.05, T*.76); ctx.fillRect(cx - T*.025, top + T*.1, T*.14, T*.03);
    ctx.fillStyle = '#3a2e20'; ctx.fillRect(cx + T*.06, top + T*.12, T*.12, T*.16); ctx.fillStyle = 'rgba(255,200,110,.95)'; ctx.fillRect(cx + T*.08, top + T*.15, T*.08, T*.1); }
  else { earth(); if (exitArrow(ctx, ch, px, py, T)) return; }
  if (ch !== '#') b2Firelit(ctx, x, y, T, .3, 3.2, '255,170,90'); // lantern light over the near ground
  else b2Firelit(ctx, x, y, T, .14, 3.2, '255,170,90');
  if (ch === 'F') glow(ctx, px + T*.62, py + T*.38, T*.5, '#ffc070', .4); }
TILEX.b4_c1_graves = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b41Graves(ctx, ch === 't' ? '.' : ch, x, y, T));
/* a battle's low cover in the streets and the yard is crates (drawFeature's city kind); among the graves it stays a fallen stone */
{ const _df = drawFeature; drawFeature = function(ctx, ch, x, y, T, dark, style, map){ return _df(ctx, ch, x, y, T, dark, style === 'b4_c1_aren' || style === 'b4_c1_barracks' ? 'city' : style, map); }; }

/* ---------------- backdrops ---------------- */
/* a crowd of soldiers far off, as the eye sees a legion across a parade ground: a block of short strokes, helmets catching the light */
function b41Ranks(x, x0, y0, w, rows, s, col, lit, seed){ for (let r = 0; r < rows; r++) { const yy = y0 + r*2.2*s, n = Math.floor(w/(1.6*s)); for (let i = 0; i < n; i++) { if (hash(i, r, seed) > .93) continue; const xx = x0 + i*1.6*s + (r % 2)*.8*s + (hash(i, r, seed + 1) - .5)*.6*s;
  x.fillStyle = col; x.fillRect(xx, yy - 3*s, 1*s, 3*s); x.fillStyle = lit; x.fillRect(xx, yy - 3.4*s, 1*s, .7*s); } } }
/* Aren's walls and towers seen low across the ground from the far side of it: a pale band, crenels, a gate-tower, roofs and domes behind */
function b41Walls(x, W, base, h, pale, dark, s){ x.fillStyle = dark; for (let i = 0; i < 26; i++) { const bx = hash(i, 801)*W, bw = W*(.02 + hash(i, 802)*.04), bh = h*(.6 + hash(i, 803)*1.2); x.fillRect(bx, base - h - bh, bw, bh); if (hash(i, 804) > .7) { x.beginPath(); x.ellipse(bx + bw/2, base - h - bh, bw*.4, bw*.45, 0, Math.PI, 0); x.fill(); } } // roofs and domes behind the wall
  x.fillStyle = pale; x.fillRect(0, base - h, W, h); for (let i = 0; i < W/(5*s); i++) x.fillRect(i*5*s, base - h - 1.6*s, 2.6*s, 1.6*s); // the curtain wall, merlons
  x.fillStyle = 'rgba(0,0,0,.18)'; x.fillRect(0, base - h*.35, W, h*.35); }
/* the marshaling ground from the 9th's line: the 8th drawn up across it to the right, the Adjunct's riders far off under a standard, Aren's
   walls low behind, heat and dust; after the blast, a dust cloud standing over the 8th; at Grub's walk-on, a small figure in the open */
SCENEX.b4_c1_review = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, f = (S && S.f) || {}, blast = !!f.b4_c1_blast, grub = !!f.b4_c1_grub;
  ctx.drawImage(sceneLayer('b41:review', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#8a9cb0'],[.55,'#d4ccb8'],[1,'#ecdcbc']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.3, hz*.3, W*.5, '#fff4dc', .4); // a hot white morning sky
    b41Walls(x, W, hz + 2, H*.05, '#c8b494', 'rgba(150,134,110,.7)', 1);
    { const lx = W*.16; x.fillStyle = '#b8a484'; x.fillRect(lx, hz - H*.1, W*.05, H*.1); x.fillRect(lx - 2, hz - H*.11, W*.05 + 4, 3); x.fillStyle = 'rgba(0,0,0,.2)'; x.fillRect(lx + W*.035, hz - H*.1, W*.015, H*.1); } // a gate-tower
    x.fillStyle = vgrad(x, hz, H, [[0,'#c8b48c'],[.4,'#b09870'],[1,'#7a6448']]); x.fillRect(0, hz, W, H - hz); // the ground: packed dust
    for (let i = 0; i < 40; i++) x.fillRect(hash(i, 811)*W, hz + Math.pow(hash(i, 812), 1.6)*(H - hz), 4 + hash(i, 813)*12, 1); // ruts and scuffs
    x.fillStyle = 'rgba(90,70,50,.25)'; for (let i = 0; i < 40; i++) x.fillRect(hash(i, 811)*W, hz + Math.pow(hash(i, 812), 1.6)*(H - hz), 4 + hash(i, 813)*12, 1);
    b41Ranks(x, W*.5, hz + H*.04, W*.46, 6, 1, 'rgba(70,60,52,.8)', 'rgba(230,224,210,.8)', 821); // the 8th, across the ground to the right
    b41Ranks(x, W*.06, hz + H*.025, W*.3, 4, .8, 'rgba(90,80,70,.6)', 'rgba(230,224,210,.6)', 822); // the 10th, far left
    // the Adjunct's riders far off under a standard: a handful of dark shapes on horses, a pole and a pennant
    for (let i = 0; i < 6; i++) { const rx = W*.76 + i*W*.012, ry = hz + H*.01; x.fillStyle = 'rgba(60,54,50,.85)'; x.fillRect(rx - 2.2, ry - 2.4, 4.4, 1.8); x.fillRect(rx - 1.6, ry - .6, .6, 2); x.fillRect(rx + 1, ry - .6, .6, 2); x.fillRect(rx - .5, ry - 4.6, 1, 2.4); }
    x.fillStyle = '#3a3430'; x.fillRect(W*.8, hz - H*.07, 1, H*.07);
  }), 0, 0, W, H);
  ctx.fillStyle = 'rgba(160,40,30,.85)'; const pw = mo ? Math.sin(t/500)*1.2 : 0; poly(ctx, [[W*.8 + 1, hz - H*.07], [W*.8 + 9, hz - H*.06 + pw], [W*.8 + 1, hz - H*.048]], ctx.fillStyle); // the standard's pennant
  for (let i = 0; i < 8; i++) { const k = ((t*mo/14000 + i/8) % 1); ell(ctx, lerp(-W*.2, W*1.2, k), hz + H*(.02 + (i % 4)*.05), W*.18, 4 + (i % 3)*2, `rgba(220,200,160,${(.16*Math.sin(k*Math.PI) + (mo ? 0 : .06)).toFixed(3)})`); } // heat and dust going past
  if (blast && !grub) { const bx = W*.64, by = hz + H*.06; for (let i = 0; i < 10; i++) { const a = i*.7 + (mo ? t/2600 : 0); glow(ctx, bx + Math.cos(a)*W*.03 + (i - 5)*W*.008, by - i*H*.022 - Math.sin(a)*H*.01, H*(.05 + i*.008), '#e8dcc4', .32); } // the dust standing up over the 8th
    glow(ctx, bx, by, H*.07, '#fffaf0', .35 + (mo ? .15*Math.sin(t/300) : 0)); ctx.fillStyle = 'rgba(90,80,70,.5)'; ctx.fillRect(bx - W*.07, by + 1, W*.14, 2); } // the flattened stretch, getting up
  if (grub) { const gx = W*(.58 + (mo ? ((t/40000) % 1)*.1 : .05)), gy = hz + H*.14; ell(ctx, gx, gy + 1, 2.2, .7, 'rgba(0,0,0,.35)'); ctx.fillStyle = '#4a4038'; ctx.fillRect(gx - .8, gy - 4, 1.6, 4); ell(ctx, gx, gy - 4.8, 1.1, 1.1, '#e8d8a0'); ctx.fillStyle = '#f0ece0'; ctx.fillRect(gx + .6, gy - 4.6, 3.2, .9); } // a small fair head, and something pale and long in his arms
  // the 9th's line in front: a row of the company's helms and spear-points, and the squad
  for (let i = 0; i < 26; i++) { const sx = W*(i/25), sy = H*.8 + (i % 2)*2; ctx.fillStyle = '#3a3028'; ctx.fillRect(sx - 3, sy - 8, 6, 10); ell(ctx, sx, sy - 9, 3, 3, '#6a6458'); ctx.fillStyle = 'rgba(255,250,230,.4)'; ctx.fillRect(sx - 2, sy - 11, 2, 1); if (i % 3 === 0) { ctx.fillStyle = '#5a4630'; ctx.fillRect(sx + 3, sy - 22, .9, 14); ctx.fillStyle = '#d8d4c4'; ctx.fillRect(sx + 2.8, sy - 24, 1.3, 2.4); } }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.08 + i*Math.min(28, W*.4/sq.length), H*.97 - (i % 2)*2, 2, t, {phase:i, dir:1}));
  vign(ctx, W, H, .42, .5); };

/* the relic market: a harbour street of awnings in Aren's indigo and undyed, and under one of them a cloth of the Chain in pieces */
SCENEX.b4_c1_market = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, gy = H*.62;
  ctx.drawImage(sceneLayer('b41:market', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, H*.4, [[0,'#7a9ab8'],[1,'#e0d4b8']]); x.fillRect(0, 0, W, H*.42);
    for (let i = 0; i < 9; i++) { const bx = i*W*.12 - W*.02, bw = W*.13, bh = H*(.24 + hash(i, 831)*.14), c = 190 + Math.round(hash(i, 832)*30); x.fillStyle = `rgb(${c},${c - 14},${c - 40})`; x.fillRect(bx, gy - bh, bw, bh); x.fillStyle = 'rgba(0,0,0,.2)'; x.fillRect(bx + bw*.72, gy - bh, bw*.28, bh); // the houses across the street, pale, flat-roofed
      x.fillStyle = 'rgba(40,30,22,.75)'; for (let k = 0; k < 2; k++) if (hash(i, k + 833) > .3) x.fillRect(bx + bw*(.2 + k*.4), gy - bh*.7, 3, 4.4); if (hash(i, 834) > .7) { x.fillStyle = `rgb(${c + 6},${c - 6},${c - 30})`; x.beginPath(); x.ellipse(bx + bw/2, gy - bh, bw*.3, bw*.3, 0, Math.PI, 0); x.fill(); } }
    x.fillStyle = vgrad(x, gy, H, [[0,'#b8a482'],[1,'#7a6848']]); x.fillRect(0, gy, W, H - gy); // the street
    x.fillStyle = 'rgba(80,60,40,.2)'; for (let i = 0; i < 30; i++) x.fillRect(hash(i, 835)*W, gy + hash(i, 836)*(H - gy), 10 + hash(i, 837)*18, 1);
  }), 0, 0, W, H);
  // the awnings, striped, stirring a little
  [[.02, .34], [.36, .32], [.7, .36]].forEach(([u, w], j) => { const ax = W*u, aw = W*w, ay = H*.3, sw = mo ? Math.sin(t/900 + j)*1 : 0; for (let i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? '#34407a' : '#e0d6c0'; ctx.fillRect(ax + i*aw/6, ay, aw/6 + .5, H*.06 + sw); ctx.beginPath(); ctx.arc(ax + (i + .5)*aw/6, ay + H*.06 + sw, aw/12, 0, Math.PI); ctx.fill(); }
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(ax, ay + H*.06 + sw, aw, H*.3); ctx.fillStyle = '#5a3e24'; ctx.fillRect(ax + 1, ay, 1.6, gy - ay); ctx.fillRect(ax + aw - 2.6, ay, 1.6, gy - ay); });
  // the relic stall under the middle awning: a trestle, a cloth, and on it the Chain in pieces
  const tx = W*.38, tw = W*.28, ty = gy - H*.02; drawFigure(ctx, 'hissari_m', tx + tw*.5, ty - H*.01, 1.9, t, {phase:2, dir:-1}); // the seller, behind it
  ctx.fillStyle = '#4a3420'; ctx.fillRect(tx + 2, ty, 2, H*.06); ctx.fillRect(tx + tw - 4, ty, 2, H*.06); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(tx, ty - 3, tw, 5); ctx.fillStyle = '#b8a888'; ctx.fillRect(tx, ty + 2, tw, H*.05); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(tx, ty + 2 + H*.05, tw, 2);
  for (let i = 0; i < 7; i++) { const px = tx + tw*(.12 + i*.12), py = ty - 2; ctx.fillStyle = 'rgba(240,240,236,.85)'; ctx.fillRect(px, py - 7, 2.6, 7); ctx.fillStyle = 'rgba(110,80,50,.8)'; ctx.fillRect(px + .6, py - 5, 1.4, 4); ctx.fillStyle = '#c8a040'; ctx.fillRect(px - .3, py - 8.2, 3.2, 1.4); ctx.fillStyle = '#9a2a1e'; ctx.fillRect(px - .5, py - 6.4, 3.6, 1); // the phials
    if (mo && Math.sin(t/400 + i*1.7) > .8) { ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(px + .4, py - 4.6, .6, 2); } }
  ctx.strokeStyle = '#141018'; ctx.lineWidth = 1; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(tx + 3 + i*2.2, ty - 2); ctx.quadraticCurveTo(tx + 4 + i*2.2, ty - 7, tx + 6 + i*2.2, ty - 8); ctx.stroke(); } // crow feathers
  ctx.fillStyle = '#2a1e14'; for (let i = 0; i < 3; i++) ctx.fillRect(tx + tw - 12 + i*3, ty - 6, 1.2, 4); // braids
  for (let i = 0; i < 6; i++) { const k = ((t*mo/20000 + i/6) % 1), px = lerp(W*1.1, -W*.1, k), py = gy + H*.04 + (i % 2)*3; drawFigure(ctx, i % 2 ? 'b4_c1_recruit' : 'b2soldier', px, py, 1.1, t, {phase:i, dir:-1, alpha:.7}); } // soldiers going past with their silver
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.06 + i*Math.min(26, W*.32/sq.length), H*.97 - (i % 2)*2, 1.9, t, {phase:i, dir:1}));
  vign(ctx, W, H, .45, .5); };

/* the quay: three ships warped in against the stone, horses coming down the gangplanks with their eyes covered, dogs, riders in black;
   along the quay a boy standing straight by a grey mare with some forty youths behind him, and the riders walking past */
function b41Horse(x, cx, cy, s, col, blind, step){ const lg = step || 0; x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy, 7*s, 3.4*s, 0, 0, 7); x.fill(); // the barrel
  x.fillRect(cx - 6*s, cy, 1.4*s, 6*s + lg); x.fillRect(cx - 3.6*s, cy, 1.4*s, 6*s - lg); x.fillRect(cx + 3*s, cy, 1.4*s, 6*s - lg); x.fillRect(cx + 5.2*s, cy, 1.4*s, 6*s + lg); // legs
  x.beginPath(); x.moveTo(cx + 5*s, cy - 2*s); x.lineTo(cx + 9*s, cy - 8*s); x.lineTo(cx + 11.6*s, cy - 7*s); x.lineTo(cx + 8*s, cy); x.closePath(); x.fill(); x.beginPath(); x.ellipse(cx + 11*s, cy - 7.4*s, 2.6*s, 1.4*s, .4, 0, 7); x.fill(); // the neck and head
  if (blind) { x.fillStyle = '#d8ccb0'; x.fillRect(cx + 9.6*s, cy - 9*s, 2.6*s, 1.6*s); } // the eye-cloth
  x.fillStyle = col; x.beginPath(); x.moveTo(cx - 7*s, cy - 1*s); x.quadraticCurveTo(cx - 10*s, cy + 1*s, cx - 9*s, cy + 5*s); x.lineTo(cx - 8*s, cy + 1*s); x.fill(); } // the tail
SCENEX.b4_c1_quay = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.34, wl = H*.6, qy = wl + H*.06;
  ctx.drawImage(sceneLayer('b41:quay', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#5a7896'],[.6,'#b8bcb8'],[1,'#e4d6b8']]); x.fillRect(0, 0, W, wl); glow(x, W*.85, hz*.4, W*.4, '#ffe4b8', .4); for (let i = 0; i < 3; i++) cloud(x, W*(.2 + hash(i, 841)*.6), hz*(.25 + i*.15), W*.22, 2, '#ffffff', .12);
    x.fillStyle = 'rgba(110,130,150,.7)'; x.fillRect(0, hz - 1, W, 2); x.fillStyle = vgrad(x, hz, H, [[0,'#6a8ca0'],[.4,'#3a5a70'],[1,'#142430']]); x.fillRect(0, hz, W, H - hz); // the bay
    // the three ships, warped in, their reflections
    [[.24, 1.25], [.52, 1.1], [.8, 1.3]].forEach(([u, s]) => { const cx = W*u, wy = wl - H*.01; x.save(); x.globalAlpha = .22; x.translate(0, wy*2 + 2); x.scale(1, -1); b7Ship(x, cx, wy, s, '#1a2a34', null, false); x.restore(); b7Ship(x, cx, wy, s, '#2e261e', '#c8bca0', false); x.fillStyle = 'rgba(255,236,200,.3)'; x.fillRect(cx - 18*s, wy - 3*s, 16*s, .7*s); });
    x.fillStyle = vgrad(x, qy, H, [[0,'#8a7a60'],[1,'#5a4a38']]); x.fillRect(0, qy, W, H - qy); x.fillStyle = 'rgba(255,236,200,.35)'; x.fillRect(0, qy, W, 1.2); x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(0, qy + 1.2, W, 2); // the quay's stone, its edge
    x.fillStyle = 'rgba(0,0,0,.2)'; for (let i = 0; i < 12; i++) x.fillRect(i*W*.09, qy + 3, 1, H*.4); for (let i = 0; i < 5; i++) { ell(x, W*(.1 + i*.2), qy + 4, 2.6, 1.6, '#2a2018'); x.fillRect(W*(.1 + i*.2) - 1, qy - 1, 2, 5); } // bollards
    [[.24, 1.25], [.52, 1.1], [.8, 1.3]].forEach(([u, s]) => { const cx = W*u + 8*s, wy = wl - H*.01; x.fillStyle = '#4a3a28'; x.beginPath(); x.moveTo(cx, wy - 4*s); x.lineTo(cx + 3*s, wy - 4*s); x.lineTo(cx + 12*s, qy + 2); x.lineTo(cx + 8*s, qy + 2); x.closePath(); x.fill(); x.fillStyle = 'rgba(255,236,200,.25)'; x.fillRect(cx + 1, wy - 4*s, 1, 4); }); // gangplanks
  }), 0, 0, W, H);
  // horses coming down the plank of the middle ship, eyes covered; a rider in black at the head of each; dogs between their legs
  for (let i = 0; i < 3; i++) { const k = ((t*mo/9000 + i/3) % 1), s = 1.4, px = lerp(W*.55, W*.66, k), py = lerp(wl - H*.03, qy + H*.04, k), st = mo ? Math.sin(t/180 + i)*.8 : 0; b41Horse(ctx, px, py, s*.7, i % 2 ? '#2a2018' : '#5a4630', true, st);
    ctx.fillStyle = '#141014'; ctx.fillRect(px + 9*s, py - 2, 2.4, 6); ell(ctx, px + 10.2*s, py - 3.4, 1.4, 1.4, '#6a4a34'); ctx.fillStyle = '#0c0a0c'; ctx.fillRect(px + 8.8*s, py - 3, .8, 5); } // the rider leading, in black, braids
  // the Crow already ashore, walking along the quay to the right with their horses
  for (let i = 0; i < 5; i++) { const k = ((t*mo/26000 + i/5) % 1), px = lerp(W*.68, W*1.08, k), py = qy + H*.1 + (i % 2)*3; b41Horse(ctx, px, py, 1.05, i % 3 ? '#3a2c20' : '#6a5a48', false, mo ? Math.sin(t/200 + i)*.6 : 0); ctx.fillStyle = '#121012'; ctx.fillRect(px - 2, py - 5, 3, 8); ell(ctx, px - .5, py - 6.4, 1.6, 1.6, '#6a4a34'); }
  for (let i = 0; i < 4; i++) { const k = ((t*mo/7000 + i/4) % 1), px = lerp(W*.6, W*.95, k), py = qy + H*.17 + (i % 2)*2; ctx.fillStyle = '#4a3a28'; ctx.beginPath(); ctx.ellipse(px, py, 3.2, 1.4, 0, 0, 7); ctx.fill(); ctx.fillRect(px + 2, py - 2.4, 1.6, 2); } // dogs
  // the boy by the grey mare, very straight, and the youths behind him
  { const bx = W*.42, by = qy + H*.14; b41Horse(ctx, bx - 12, by, 1.1, '#9a9690', false, 0); drawFigure(ctx, 'temul', bx + 6, by + 4, 1.4, t, {still:true, dir:1}); for (let i = 0; i < 9; i++) drawFigure(ctx, 'wickan', bx - 26 - i*6, by + 2 - (i % 2)*2, 1.05, t, {phase:i, alpha:.85}); }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.04 + i*Math.min(24, W*.3/sq.length), H*.97 - (i % 2)*2, 1.8, t, {phase:i, dir:1}));
  b2Wheel(ctx, t*mo, W*.5, hz - H*.14, W*.2, H*.06, 6, .6, 'rgba(240,236,228,.85)', 851); // gulls
  vign(ctx, W, H, .45, .5); };

/* the old cemetery at night: tombs going black under a starred sky, the yard's wall behind with its firelight over the top, lanterns
   among the graves, open earth heaped everywhere, and soldiers on their knees in it, small and dark */
SCENEX.b4_c1_graveyard = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, f = (S && S.f) || {}, quiet = (f.b4_c1_ph || 0) >= 3;
  ctx.drawImage(sceneLayer('b41:graves' + (quiet ? 'q' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#0a0e1c'],[.7,'#1a2034'],[1,'#2a2a38']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 80; i++) { x.fillStyle = `rgba(220,226,250,${(.15 + hash(i, 861)*.5).toFixed(2)})`; x.fillRect(hash(i, 862)*W, Math.pow(hash(i, 863), 1.4)*hz*.9, 1, 1); }
    ell(x, W*.82, hz*.3, 5, 5, 'rgba(236,232,214,.85)'); ell(x, W*.82 + 2, hz*.3 - 1, 4.4, 4.4, '#141a2c'); glow(x, W*.82, hz*.3, 30, '#e0dcc8', .12); // a thin moon
    b41Walls(x, W, hz + 2, H*.04, '#2a2a34', 'rgba(20,20,28,.9)', 1); // Aren's roofs and walls, black against the sky
    x.fillStyle = vgrad(x, hz, H, [[0,'#22222a'],[1,'#141318']]); x.fillRect(0, hz, W, H - hz);
    // the tombs: grey boxes and leaning stones going back into the dark, smaller toward the wall
    for (let i = 0; i < 46; i++) { const k = Math.pow(hash(i, 864), .8), tx = hash(i, 865)*W, ty = hz + 4 + k*(H*.32), s = .5 + k*1.6, kind = hash(i, 866); x.fillStyle = `rgb(${34 + k*24 | 0},${34 + k*24 | 0},${42 + k*26 | 0})`;
      if (kind > .6) { x.fillRect(tx, ty - 6*s, 12*s, 6*s); x.fillStyle = 'rgba(160,170,210,.18)'; x.fillRect(tx, ty - 6*s, 12*s, 1); } else if (kind > .25) { x.save(); x.translate(tx, ty); x.rotate((hash(i, 867) - .5)*.3); x.fillRect(-2*s, -8*s, 4*s, 8*s); x.beginPath(); x.arc(0, -8*s, 2*s, Math.PI, 0); x.fill(); x.restore(); } else { x.fillRect(tx - .6*s, ty - 9*s, 1.2*s, 9*s); x.fillRect(tx - 3*s, ty - 7*s, 6*s, 1.2*s); } }
    if (!quiet) for (let i = 0; i < 14; i++) { const k = hash(i, 868), tx = hash(i, 869)*W, ty = hz + 8 + k*H*.3, s = .6 + k*1.3; ell(x, tx, ty, 7*s, 2*s, '#2e261c'); x.fillStyle = '#060506'; x.fillRect(tx - 3*s, ty - .5*s, 6*s, 2*s); } // open earth, heaped
    { const tx = W*.12, ty = H*.72; x.strokeStyle = '#0c0a0e'; x.lineWidth = 3; x.lineCap = 'round'; x.beginPath(); x.moveTo(tx, ty); x.quadraticCurveTo(tx - 4, ty - 30, tx + 3, ty - 52); x.stroke(); x.lineWidth = 1.6; [[-.2, -40, -16, -58], [.1, -36, 18, -50], [0, -24, -12, -30]].forEach(([a, b, c, d]) => { x.beginPath(); x.moveTo(tx + a*10, ty + b); x.quadraticCurveTo(tx + c*.5, ty + (b + d)/2 - 4, tx + c, ty + d); x.stroke(); }); x.lineCap = 'butt'; } // a dead tree, near
  }), 0, 0, W, H);
  // lanterns among the graves, and the ones digging by them: small kneeling shapes in the warm light
  const lan = quiet ? [[.62, .66]] : [[.28, .62], [.46, .58], [.62, .66], [.78, .6], [.9, .7], [.36, .74]];
  ctx.globalCompositeOperation = 'lighter'; lan.forEach(([u, v], i) => { const fl = mo ? .8 + .2*Math.sin(t/(130 + i*17) + i) : 1; glow(ctx, W*u, H*v, H*.16, '#ff9a40', .3*fl); glow(ctx, W*u, H*v, 6, '#ffe0a0', .9*fl); }); ctx.globalCompositeOperation = 'source-over';
  lan.forEach(([u, v], i) => { if (quiet && i === 0) { for (let k = 0; k < 4; k++) { const sx = W*u - 16 + k*9, sy = H*v + 8; ctx.fillStyle = '#0e0c0e'; ctx.fillRect(sx - 2, sy - 6, 4, 6); ell(ctx, sx, sy - 7.4, 2, 2, '#0e0c0e'); B2F.line(ctx, '#0e0c0e', 1, [[sx + 2, sy - 4], [sx + 5, sy - 10 + (mo ? Math.sin(t/500 + k)*1.5 : 0)]]); } return; } // the dig detail, quietly, at the Chain's corner
    for (let k = 0; k < 2; k++) { const sx = W*u + (k ? 7 : -8), sy = H*v + 6, bow = mo ? Math.sin(t/600 + i + k)*1 : 0; ctx.fillStyle = '#0e0c0e'; ctx.beginPath(); ctx.ellipse(sx, sy - 2, 3.4, 2.6, 0, 0, 7); ctx.fill(); ell(ctx, sx + (k ? -2 : 2), sy - 5 + bow, 1.8, 1.8, '#0e0c0e'); } }); // soldiers on their knees
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.05 + i*Math.min(26, W*.32/sq.length), H*.97 - (i % 2)*2, 1.9, t, {phase:i, dir:1}));
  ctx.fillStyle = 'rgba(6,8,18,.35)'; ctx.fillRect(0, H*.86, W, H*.14);
  vign(ctx, W, H, .8, .5); };

/* the 9th's barracks yard at night (the chapter's fire and the Deck's table): long flat-roofed bunk-houses with lamplit doors and windows,
   the flags, fires across the yard with soldiers round them, the back wall, and over it the cemetery's lanterns moving among the tombs */
SCENEX.b4_aren_yard = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, f = (S && S.f) || {}, late = (f.b4_c1_ph || 0) >= 3, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b41:yard', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#080c1a'],[1,'#1e2236']]); x.fillRect(0, 0, W, hz + 2); for (let i = 0; i < 70; i++) { x.fillStyle = `rgba(220,226,250,${(.15 + hash(i, 871)*.5).toFixed(2)})`; x.fillRect(hash(i, 872)*W, Math.pow(hash(i, 873), 1.3)*hz*.8, 1, 1); }
    for (let i = 0; i < 20; i++) { const k = hash(i, 874), tx = hash(i, 875)*W, s = .5 + k*.5; x.fillStyle = '#16161e'; if (k > .5) x.fillRect(tx, hz - H*.06 - 5*s, 8*s, 5*s); else { x.fillRect(tx - .5, hz - H*.06 - 8*s, 1, 8*s); x.fillRect(tx - 2.5*s, hz - H*.06 - 6*s, 5*s, 1); } } // tombs over the wall
    x.fillStyle = '#24222a'; x.fillRect(0, hz - H*.06, W, H*.06 + 2); x.fillStyle = 'rgba(150,165,210,.12)'; x.fillRect(0, hz - H*.06, W, 1); // the back wall
    x.fillStyle = vgrad(x, hz, H, [[0,'#1c1c22'],[1,'#121216']]); x.fillRect(0, hz, W, H - hz); // the flags
    x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 1; for (let r = 0; r < 8; r++) { const yy = hz + Math.pow(r/8, 1.4)*(H - hz); x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); }
    // the bunk-houses down both sides, long and low, flat roofs, a lamp in a window here and there, a door open on lamplight
    [[0, .3, -1], [.72, 1, 1]].forEach(([a, b, side]) => { const x0 = W*a, x1 = W*b, top = hz - H*.02, bot = hz + H*.18; x.fillStyle = '#2a2630'; x.fillRect(x0, top, x1 - x0, bot - top); x.fillStyle = '#34303a'; x.fillRect(x0, top - 3, x1 - x0, 3); x.fillStyle = 'rgba(150,165,210,.1)'; x.fillRect(x0, top - 3, x1 - x0, 1);
      for (let i = 0; i < 4; i++) { const wx = lerp(x0, x1, (i + .5)/4); if (hash(i, side + 876) > .35) { x.fillStyle = 'rgba(255,180,100,.85)'; x.fillRect(wx - 3, top + H*.05, 6, 6); x.fillStyle = 'rgba(40,20,10,.7)'; x.fillRect(wx - .5, top + H*.05, 1, 6); } } });
    x.fillStyle = 'rgba(255,170,90,.85)'; x.fillRect(W*.12, hz + H*.06, 10, H*.12); x.fillStyle = 'rgba(30,16,8,.8)'; x.fillRect(W*.12 + 5, hz + H*.08, 4, H*.1); // a door open on lamplight, somebody in it
  }), 0, 0, W, H);
  // lanterns over the wall in the cemetery, moving (fewer the second night)
  ctx.globalCompositeOperation = 'lighter'; const nl = late ? 1 : 6; for (let i = 0; i < nl; i++) { const k = mo ? (Math.sin(t/(5000 + i*700) + i*2) + 1)/2 : hash(i, 877), lx = W*(.32 + hash(i, 878)*.36 + (k - .5)*.06), ly = hz - H*.08 - hash(i, 879)*H*.04; glow(ctx, lx, ly, 12, '#ffb060', .35); ctx.fillStyle = 'rgba(255,220,150,.9)'; ctx.fillRect(lx - .6, ly - .6, 1.2, 1.4); }
  // the other fires across the yard, and the company round them
  [[.4, .5], [.62, .52], [.82, .62], [.24, .58]].forEach(([u, v], i) => { const fx = W*u, fy = H*v, ff = mo ? .8 + .2*Math.sin(t/(110 + i*23) + i) : 1; glow(ctx, fx, fy, H*.14, '#ff8a3a', .3*ff); glow(ctx, fx, fy, 4, '#ffe0a0', .9*ff); });
  ctx.globalCompositeOperation = 'source-over';
  [[.4, .5], [.62, .52], [.82, .62], [.24, .58]].forEach(([u, v], i) => { for (let k = 0; k < 4; k++) { const a = k/4*6.283 + i, sx = W*u + Math.cos(a)*9, sy = H*v + Math.sin(a)*3 + 2; ctx.fillStyle = '#0c0a0c'; ctx.fillRect(sx - 2, sy - 6, 4, 6); ell(ctx, sx, sy - 7, 2, 2, '#0c0a0c'); } });
  // the Third's own fire, near, with the squad round it
  const cx = W*.5, cy = H*.9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.4, '#ff8a3a', .32*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*14, cy + Math.sin(a)*4, 3, 2, '#3a3430'); } poly(ctx, [[cx - 8, cy], [cx - 2, cy - 16*fl], [cx + 1, cy - 7], [cx + 4, cy - 13*fl], [cx + 8, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - 4, cy], [cx, cy - 9*fl], [cx + 4, cy]], 'rgba(255,230,150,.95)');
  if (mo) for (let i = 0; i < 5; i++) { const k = ((t/1400 + i/5) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*4, cy - 10 - k*30, 1, 1); } // sparks
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(26 + j*22), H*.97 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .78, .55); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Four's sand-and-iron ground ----------------
   trinkets 240×130, the same flat shapes and single highlight as Books Two and Three, on a warm sand radial that goes to iron at the edge */
function b41Item(key, label, body){ const w = 240, h = 130, id = 'c41-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#5a4a34"></stop><stop offset=".7" stop-color="#2a2218"></stop><stop offset="1" stop-color="#121214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* the finger bone, drilled and tied on a leather thong the way the order says */
/* Fourteenth issue mail: new links, still oiled, a tin tag at the collar */
b41Item('b4_c1_issuemail', 'Fourteenth issue mail', '<defs><pattern id="c41imr" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.8" fill="none" stroke="#c8ccd2" stroke-width=".9"/></pattern></defs><ellipse cx="120" cy="114" rx="56" ry="7" fill="#000" opacity=".35"/>'
  + '<path d="M92 18 L108 14 Q120 24 132 14 L148 18 L176 44 L162 56 L156 50 L156 110 L84 110 L84 50 L78 56 L64 44 Z" fill="#5a5e66"/><path d="M92 18 L108 14 Q120 24 132 14 L148 18 L176 44 L162 56 L156 50 L156 110 L84 110 L84 50 L78 56 L64 44 Z" fill="url(#c41imr)"/>'
  + '<rect x="112" y="20" width="16" height="9" rx="1" fill="#c8c0a8"/><path d="M114 24 L126 24" stroke="#6a6250" stroke-width="1.2"/><path d="M84 104 L156 104" stroke="#3a3e44" stroke-width="2"/><circle cx="100" cy="36" r="8" fill="#fff" opacity=".07"/>');
b41Item('b4_c1_finger', 'A finger bone on a thong', '<g transform="translate(120 66) scale(1.4) translate(-120 -66)"><ellipse cx="120" cy="72" rx="70" ry="34" fill="#f0e0b0" opacity=".06"/><path d="M40 30 Q80 62 112 66 M200 30 Q160 62 128 66" stroke="#6a4626" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M40 30 Q80 62 112 66" stroke="#9a7048" stroke-width="1" fill="none" opacity=".7"/>'
  + '<g transform="rotate(-8 120 80)"><path d="M104 66 Q100 60 106 58 Q114 57 118 62 L146 64 Q154 60 160 64 Q164 70 158 76 Q154 80 146 76 L118 78 Q112 84 104 80 Q98 74 104 66 Z" fill="#e8dcc0"/><path d="M118 66 L146 67" stroke="#fff8e8" stroke-width="2" opacity=".7"/><path d="M118 75 L146 74" stroke="#a8987a" stroke-width="1.6"/>'
  + '<circle cx="110" cy="70" r="3.4" fill="#2a1c10"/><path d="M112 64 Q116 70 112 76" stroke="#c8b898" stroke-width="1" fill="none"/></g><path d="M112 66 Q116 72 110 74 Q104 72 108 66" stroke="#6a4626" stroke-width="2.4" fill="none"/></g>');
/* "Coltaine's finger": a small glass phial, wax-sealed, a scrap of red cloth tied round the neck, something dried and brown inside */
b41Item('b4_c1_relic', '"Coltaine\'s finger"', '<ellipse cx="120" cy="70" rx="58" ry="36" fill="#d0b080" opacity=".06"/><g transform="rotate(-18 120 66)"><rect x="96" y="44" width="66" height="26" rx="12" fill="#c8d4d0" opacity=".28"/><rect x="96" y="44" width="66" height="26" rx="12" fill="none" stroke="#e8f0ec" stroke-width="1.4" opacity=".7"/>'
  + '<path d="M104 58 Q112 52 128 54 Q142 55 146 58 Q142 62 128 62 Q112 64 104 58 Z" fill="#6a4a2a"/><path d="M110 56 Q122 53 136 55" stroke="#8a6a44" stroke-width="1.2" fill="none"/><rect x="160" y="48" width="14" height="18" rx="2" fill="#b8902a"/><rect x="160" y="48" width="4" height="18" fill="#e0c060" opacity=".6"/>'
  + '<path d="M154 44 L158 70 L152 70 L150 44 Z" fill="#9a2a1e"/><path d="M152 66 L146 82 L150 82 L156 68 M156 68 L160 84 L163 82 L158 66" fill="#9a2a1e"/><path d="M100 48 Q120 44 150 47" stroke="#ffffff" stroke-width="2" opacity=".45" fill="none"/></g>');
/* a Red Blade's cast-off sash: red silk folded long, the frayed end where a badge was cut off, a lighter patch the badge left */
b41Item('b4_c1_redsash', 'A Red Blade\'s cast-off sash', '<ellipse cx="120" cy="70" rx="72" ry="36" fill="#e08060" opacity=".06"/><path d="M34 54 Q80 40 130 50 Q170 58 206 46 L210 66 Q172 80 128 70 Q80 62 38 76 Z" fill="#a8241c"/><path d="M34 54 Q80 40 130 50 Q170 58 206 46" stroke="#e06a50" stroke-width="2" fill="none" opacity=".7"/>'
  + '<path d="M38 76 Q80 62 128 70 Q172 80 210 66" stroke="#5a0e0a" stroke-width="2" fill="none"/><path d="M60 60 Q100 52 140 60" stroke="#c8402e" stroke-width="1" fill="none" opacity=".6"/><rect x="150" y="54" width="22" height="16" rx="2" fill="#d0503a" opacity=".55" transform="rotate(-6 161 62)"/>'
  + '<path d="M150 56 l-3 -4 M156 54 l-1 -5 M162 54 l1 -5 M168 55 l2 -4 M172 70 l3 4 M164 72 l1 5 M156 72 l-1 5" stroke="#e8b8a0" stroke-width="1" opacity=".8"/><path d="M206 46 l6 -2 M208 52 l7 0 M209 58 l7 2 M210 64 l6 3" stroke="#a8241c" stroke-width="1.6"/>');
/* a confiscated durhang pipe: a short clay pipe, a brass cap on the bowl, a dark smear of resin, a thread of smoke */
b41Item('b4_c1_durhangpipe', 'A confiscated durhang pipe', '<ellipse cx="120" cy="72" rx="62" ry="32" fill="#c8a878" opacity=".06"/><path d="M60 84 Q110 80 150 70 L154 78 Q112 90 62 92 Q54 88 60 84 Z" fill="#d8ccb4"/><path d="M62 86 Q110 82 150 72" stroke="#f4ecdc" stroke-width="1.6" fill="none" opacity=".7"/>'
  + '<path d="M146 60 Q144 84 160 88 Q178 90 180 66 Z" fill="#c8b89a"/><path d="M148 62 Q148 82 160 86" stroke="#8a7a60" stroke-width="1.2" fill="none"/><ellipse cx="163" cy="62" rx="18" ry="5" fill="#b8902a"/><ellipse cx="163" cy="61" rx="13" ry="3" fill="#2a1a10"/><path d="M147 61 Q160 57 178 61" stroke="#e8c870" stroke-width="1.2" fill="none" opacity=".8"/>'
  + '<path d="M160 56 Q154 44 164 36 Q172 28 166 18" stroke="#d8d0c0" stroke-width="2" fill="none" opacity=".3"/><path d="M164 58 Q170 48 162 40" stroke="#d8d0c0" stroke-width="1.4" fill="none" opacity=".2"/><ellipse cx="96" cy="86" rx="10" ry="2.4" fill="#3a2a14" opacity=".5"/>');
