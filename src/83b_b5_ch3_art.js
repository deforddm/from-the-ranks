/* ============ Book Five, Chapter 3 art: Kraig's Landing — the dock and the regiment's camp, the barges at night, the upriver bank, the fire ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d/81b/82b, lit from the left: the river thieves, the one with a bargeman's pole and their
   boss with a cargo-hook; a regiment soldier drunk and celebrating; a Nerek hauler with the tow-rope; a Faraed scout; a young mage of the
   Snakebelt cadre in grey piping; the Trate grain trader's man; and a bargeman for the knucklebones. Three grounds (TILEX: the Landing,
   the barges tied three deep, the upriver bank at night); in fights 't' is cover per ground and 'o' is the river. Four backdrops (SCENEX,
   sceneLayer for the still parts, REDUCE() holding the rest still): b5_landing (80's, redrawn: dusk, day, night or dawn by the chapter's
   flags), b5_c3_greenfire (the curtain of green fire over the far mountains, the dock and the cheering camp as shapes in front),
   b5_c3_tents (the mages' tents with the banners, seen from the barges), b5_c3_collapse (the outlying shed fallen in, lanterns, men
   digging). And the chapter's gear on Book Five's ground: dark canal-slate with a thin dock-gold rim. The river is never named. The fire
   is a curtain of light over far mountains; what is under it is never shown. The mages are tents, never faces. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* a river thief: lean, wet to the waist, a dark knitted cap, a short coat, a knife held low */
  b5_c3_riverman(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, .98); const c = b2Pick(o, [['#3a3e3a', '#121412'], ['#44403a', '#16140e'], ['#383a44', '#101218']]);
    h.legs('#22221e'); ctx.fillStyle = 'rgba(40,70,80,.55)'; ctx.fillRect(-4.5, 5, 3.4, 8); ctx.fillRect(1.1, 5, 3.4, 8); // wet to the waist
    poly(ctx, [[-5.8,-6],[5.8,-6],[6.2,7],[-6.2,7]], h.armor(c[0], c[1])); ctx.fillStyle = 'rgba(160,200,210,.16)'; ctx.fillRect(-5.4, -5, 1.2, 11); // the short coat, wet
    ctx.fillStyle = '#2a2018'; ctx.fillRect(-6, 3, 12, 1.2); ctx.fillStyle = '#a8866a'; ctx.fillRect(5.8, -3.4, 2, 6); B2F.line(ctx, '#c4c0b6', 1, [[7, 3], [11, .4]]); // a belt, the knife low
    h.head('#ae8a6c', 4, -11.2); h.look('rgba(24,14,10,.86)', -11.4); ctx.fillStyle = 'rgba(30,20,14,.5)'; ctx.fillRect(-3.2, -8.6, 6.6, 1.4); // stubble
    ctx.fillStyle = b2Pick(o, ['#1a1c22', '#2a1e18', '#22261e']); ctx.beginPath(); ctx.arc(0, -12.4, 4.7, Math.PI, 0); ctx.fill(); ctx.fillRect(-4.8, -12.8, 9.6, 1.6); // a knitted cap
    ctx.restore(); },
  /* the thief with a bargeman's pole: broad, bare-armed, a long iron-shod pole held across */
  b5_c3_pole(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.08, 1.04);
    B2F.line(ctx, '#7a5a38', 1.8, [[-10, 10], [12, -20]]); B2F.line(ctx, '#5a5a5e', 2, [[11, -18.6], [12.6, -21]]); // the pole, iron-shod
    h.legs('#26241e'); ctx.fillStyle = 'rgba(40,70,80,.5)'; ctx.fillRect(-4.5, 8, 3.4, 5); ctx.fillRect(1.1, 8, 3.4, 5);
    h.torso('#5a5244', '#1e1a14', 6.8); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-1, -6, 2, 13); ctx.fillRect(-6.4, 2.6, 12.8, 1.4); // a jerkin, a belt
    ctx.fillStyle = '#a8866a'; ctx.fillRect(-8.6, -4.6, 2.4, 7); ctx.fillRect(6.2, -4.6, 2.4, 6); ell(ctx, -7.4, 2.6, 1.6, 1.4, '#a8866a'); ell(ctx, 7.4, 1.6, 1.6, 1.4, '#a8866a'); // bare arms on the pole
    h.head('#a88464', 4.5, -11); h.look('rgba(20,10,6,.86)', -11.2); ctx.fillStyle = '#2a1e14'; ctx.fillRect(-4, -8.6, 8, 2.4); // a beard
    B2F.cap(ctx, '#2a2018', 4.6, -12.2); ctx.restore(); },
  /* the thieves' boss: big, a long oiled coat, a cargo-hook in one fist, a gold ring in the ear, laughing */
  b5_c3_riverboss(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.2, 1.12);
    ctx.fillStyle = '#1a1816'; ctx.fillRect(-4.8, 6, 3.8, 7); ctx.fillRect(1, 6, 3.8, 7); // sea-boots
    poly(ctx, [[-6.8,-6],[6.8,-6],[8,11],[-8,11]], h.armor('#3a3a34', '#0e0e0c')); ctx.fillStyle = 'rgba(200,210,200,.14)'; ctx.fillRect(-6.4, -5, 1.4, 15); ctx.fillStyle = '#5a4630'; ctx.fillRect(-.8, -6, 1.6, 16); // the long coat, open
    ctx.fillStyle = '#7a5a3a'; ctx.fillRect(-5, -4, 10, 8); ctx.fillStyle = '#2a1e14'; ctx.fillRect(-5.6, 3, 11.2, 1.6); ctx.fillStyle = '#c9a35a'; ctx.fillRect(-.8, 3, 1.6, 1.6); // a waistcoat, a belt, a brass buckle
    ctx.fillStyle = '#a8866a'; ctx.fillRect(6.6, -3.4, 2.4, 6); B2F.line(ctx, '#6a4a2a', 1.6, [[8, 3], [9.4, -5]]); B2F.line(ctx, '#6a6a6e', 1.4, [[9.4, -5], [11.6, -8.2], [13.6, -6], [12.6, -3.4]]); // the cargo-hook
    h.head('#b08a6a', 4.9, -11.2); h.look('rgba(20,10,6,.88)', -11.4); ctx.fillStyle = '#3a2618'; ctx.fillRect(-4.2, -8.8, 8.8, 2.8); ctx.fillStyle = 'rgba(255,240,220,.6)'; ctx.fillRect(-1.6, -8.2, 3.6, .8); // a beard, and teeth: laughing
    ell(ctx, -4.6, -10.2, .7, .7, '#e8c070'); // a gold ring in the ear
    ctx.fillStyle = '#1c1a18'; ctx.beginPath(); ctx.arc(0, -13, 5.2, Math.PI, 0); ctx.fill(); ctx.fillRect(-7, -13.4, 14, 1.4); // a wide hat
    ctx.restore(); },
  /* a regiment soldier, drunk and celebrating: helm pushed back, coat open, a jug held up, cheering */
  b5_c3_drunk(ctx, h, t, o){ ctx.save(); const sw = o.still ? 0 : Math.sin(t/300 + (o.phase || 0))*.06; ctx.rotate(sw); const c = b2Pick(o, ['#4a5664', '#4a5248', '#565a62']);
    h.legs('#2a2a2c'); poly(ctx, [[-6,-6],[6,-6],[6.6,7],[-6.6,7]], h.armor(c, '#16181c')); ctx.fillStyle = '#7a7a76'; ctx.fillRect(-3, -5, 6, 10); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 4; i++) ctx.fillRect(-3, -4 + i*2.4, 6, .5); // the coat open on scale
    ctx.fillStyle = '#a8866a'; ctx.fillRect(-8.4, -12, 2.2, 8); ell(ctx, -7.4, -12.6, 1.6, 1.6, '#a8866a'); poly(ctx, [[-9.4,-19],[-5.6,-19],[-5,-14],[-10,-14]], '#7a5a3a'); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-8.4, -20.4, 2, 1.6); // an arm up, a jug in it
    ctx.fillStyle = '#a8866a'; ctx.fillRect(6, -3, 2, 6);
    h.head('#b88e70', 4.3, -11); h.look('rgba(24,14,10,.84)', -11.4); ctx.fillStyle = '#3a1a14'; ell(ctx, .8, -8.2, 1.6, 1.1, '#3a1a14'); // mouth open: singing
    ctx.save(); ctx.translate(1.4, -13.6); ctx.rotate(.5); ctx.beginPath(); ctx.arc(0, 0, 4.6, Math.PI, 0); ctx.fillStyle = h.armor('#8a8a86', '#2a2a28'); ctx.fill(); ctx.restore(); // the helm pushed back
    ctx.restore(); },
  /* a Nerek hauler: small and spare, bare feet, a ragged shirt, the tow-rope's broad strap over one shoulder, black hair tied back */
  b5_c3_nerek(ctx, h, t, o){ ctx.save(); const woman = b2Pick(o, [0, 1, 0, 1, 1]), old = b2Pick(o, [0, 0, 1, 0, 0]), sk = b2Pick(o, ['#8a6248', '#7a5640', '#94684c']); B2F.grow(ctx, .88, old ? .86 : .92);
    ctx.fillStyle = sk; ctx.fillRect(-4.5, 7, 3.4, 6); ctx.fillRect(1.1, 7, 3.4, 6); ctx.fillStyle = '#3a3026'; ctx.fillRect(-4.5, 4, 3.4, 4); ctx.fillRect(1.1, 4, 3.4, 4); // bare feet, ragged trousers
    h.torso(woman ? '#6a5a48' : '#5a5040', '#1e1a14', 5.6); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(3, 2, 2, 1); ctx.fillRect(-4, 4, 3, .8); // a ragged shirt
    poly(ctx, [[-6,-6],[-3.4,-6.4],[5.4,6],[2.8,6.6]], '#8a7650'); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-1, -1, 4, .6); // the tow-rope's strap, across
    B2F.line(ctx, '#9a8458', 1.2, [[4.6, 6], [11, 8], [14, 6]]); // the rope, trailing
    ctx.fillStyle = sk; ctx.fillRect(-7.6, -3, 2, 5); ctx.fillRect(5.6, -3, 2, 5);
    h.head(sk, 4, -11); h.look('rgba(20,12,8,.88)', -11.2); if (old) { ctx.strokeStyle = 'rgba(40,24,16,.5)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(-2.6, -9.6); ctx.lineTo(2.6, -9.4); ctx.moveTo(-3, -12.8); ctx.lineTo(3, -12.8); ctx.stroke(); } // lines in an old face
    B2F.cap(ctx, old ? '#8a8682' : '#0e0a08', 4.2, -12.2); ctx.fillStyle = old ? '#8a8682' : '#0e0a08'; ctx.fillRect(-5, -12, 1.8, woman ? 9 : 4); // hair tied back, grey on the old
    ctx.restore(); },
  /* a Faraed scout at the fire: a boy in hide over wool, a hood back, a bundle of light spears, sitting or standing easy */
  b5_c3_faraed(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .84, .94); const sk = b2Pick(o, ['#9a7050', '#8a6448', '#a27858']);
    for (let i = 0; i < 2; i++) B2F.line(ctx, '#7a5a34', .8, [[8 + i*.9, 12], [9.6 + i*.9, -18]]); poly(ctx, [[9, -21], [8.6, -17.6], [10, -17.6]], '#c8c0b0'); // spears stuck upright beside him
    h.legs('#3a2e22'); h.torso(b2Pick(o, ['#8a6a44', '#7a6040', '#6a5a3a']), '#2a1c0e', 5); ctx.fillStyle = 'rgba(220,200,160,.4)'; for (let i = 0; i < 5; i++) ctx.fillRect(-4 + i*1.8, 5.4, .5, 1.6); // hide, fringed
    ctx.fillStyle = sk; ctx.fillRect(-7, -3, 2, 5); ctx.fillRect(5, -3, 2, 5);
    h.head(sk, 3.9, -11.2); h.look('rgba(20,10,6,.86)', -11.4); poly(ctx, [[-5,-8],[-4.6,-14],[0,-16],[4.6,-14],[5,-8],[3.8,-12.4],[-3.8,-12.4]], '#5a4a34'); // the hood, back
    B2F.cap(ctx, '#140c08', 3.8, -12.6, 1.05, 1.95); ctx.fillStyle = '#c8c0b0'; ctx.fillRect(-4.4, -12, 1, 1.6); // a bird-bone in the hair
    ctx.restore(); },
  /* a young mage of the Snakebelt cadre: a long grey coat with darker piping down the front and at the cuffs, a satchel, ink on her fingers */
  b5_c3_cadremage(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1);
    B2F.robe(ctx, h, '#6a6e72', '#24262a', 6, 7.6); ctx.fillStyle = '#3a3e44'; ctx.fillRect(-1.2, -6, 1.2, 18); ctx.fillRect(-6, 1.6, 12, 1); // the piping, down the front and at the waist
    poly(ctx, [[-7.6,-2],[-4,-3],[-3.4,5],[-7.2,6]], '#5a4230'); B2F.line(ctx, '#3a2a1a', .8, [[-4.6, -6], [-6.8, -2]]); // a satchel
    ctx.fillStyle = '#b8967a'; ctx.fillRect(5.4, -3, 2, 5); ctx.fillStyle = '#1a1a2a'; ctx.fillRect(5.6, 1, 1.6, .8); // ink on the fingers
    h.head('#bc9a7c', 4.1, -11.2); h.look('rgba(24,14,10,.84)', -11.4);
    ctx.fillStyle = '#4a3020'; B2F.cap(ctx, '#4a3020', 4.4, -12.2); ctx.fillRect(-4.4, -12.4, 1.6, 6); ctx.fillRect(2.8, -12.4, 1.6, 6); // hair to the jaw
    ctx.fillStyle = '#3a3e44'; ctx.fillRect(-3.6, -7.6, 7.2, 1); // the coat's high collar
    ctx.restore(); },
  /* the Trate grain trader's man: a good coat that has been up a river, a small book open in one hand, a pencil, a flat cap */
  b5_c3_trader(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1);
    h.legs('#2e2a26'); ctx.fillStyle = '#1a1612'; ctx.fillRect(-4.5, 11, 3.4, 2); ctx.fillRect(1.1, 11, 3.4, 2);
    poly(ctx, [[-6.2,-6],[6.2,-6],[7,9],[-7,9]], h.armor('#5a4a3a', '#1e1610')); ctx.fillStyle = 'rgba(180,170,150,.25)'; ctx.fillRect(-6, 6, 4, 1); ctx.fillRect(2, 7.4, 3, .8); // river mud at the hem
    ctx.fillStyle = '#c9a35a'; for (let i = 0; i < 3; i++) ell(ctx, 1.2, -3 + i*3, .5, .5, '#c9a35a');
    ctx.fillStyle = '#a8866a'; ctx.fillRect(-8.4, -2, 2, 4); poly(ctx, [[-11,-1],[-5,-2],[-5,2.6],[-11,3.4]], '#3a2818'); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-10.4, -.6, 5, 3); // the small book, open
    ctx.fillStyle = '#a8866a'; ctx.fillRect(6, -3, 2, 4); B2F.line(ctx, '#4a3a2a', .7, [[7, 1], [9, -2]]); // the pencil
    h.head('#c09a7a', 4.3, -11.2); h.look('rgba(24,14,10,.84)', -11.4); ctx.fillStyle = 'rgba(30,20,14,.6)'; ctx.fillRect(-1.4, -8.8, 3.4, .8); // a thin moustache
    ctx.fillStyle = '#3a3430'; ctx.beginPath(); ctx.arc(0, -12.6, 4.8, Math.PI, 0); ctx.fill(); ctx.fillRect(-2, -13, 8.2, 1.4); // a flat cap, the peak forward
    ctx.restore(); },
  /* a bargeman: broad, a rolled-sleeve shirt, a leather apron, a scarf at the neck, a hood up against the river damp */
  b5_c3_bargeman(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1); const c = b2Pick(o, ['#6a5a48', '#5a5a52', '#6a6052']);
    h.legs('#2a2622'); h.torso(c, '#1e1a14', 6.4); poly(ctx, [[-5,-2],[5,-2],[5.6,8],[-5.6,8]], h.armor('#4e3a26', '#160e08')); // the apron
    ctx.fillStyle = '#a8866a'; ctx.fillRect(-8, -4, 2.2, 6.4); ctx.fillRect(5.8, -4, 2.2, 6);
    ctx.fillStyle = b2Pick(o, ['#7a2a22', '#2a4a5a', '#6a6a2a']); ctx.fillRect(-4, -7.6, 8, 1.6); // a scarf
    h.head('#b08868', 4.4, -11); h.look('rgba(20,10,6,.86)', -11.2); ctx.fillStyle = 'rgba(40,30,24,.5)'; ctx.fillRect(-3.4, -8.4, 7, 1.6);
    poly(ctx, [[-5.8,-9],[-5,-15],[0,-17],[5,-15],[5.8,-9],[4.2,-13],[-4.2,-13]], h.armor('#4a463e', '#1a1814')); // the hood
    ctx.restore(); },
});
/* the shared figures, in case Chapter One's art is not loaded yet (the brief's guarded placeholders) */
FIGX.b5_c1_ennic ??= FIGX.b5_letherii; FIGX.b5_c1_clerk ??= FIGX.b5_letherii; FIGX.b5_c1_tilewoman ??= FIGX.b5_c3_nerek;

/* ---------------- the grounds (TILEX) ---------------- */
const B53G = {earth:'#5a4a36', earthD:'#2a2219', mud:'#3e3226', mudD:'#1c1712', plank:'#5e4e3c', plankD:'#2a231c', river:'#22383a', riverL:'#2e4a48', riverD:'#0c1618', tent:'#9a9284', tentD:'#3a3832',
  wall:'#4a4036', wallD:'#221e1a', roof:'#3a3430', roofD:'#1a1816', deck:'#6a5a44', deckD:'#2e271e', reed:'#4a5a34', reedD:'#1a2214', path:'#7a6a50', pathD:'#2e2820', rock:'#4a4a4a', rockD:'#202022', lamp:'255,196,120'};
/* the river: dark green-grey, glints, a slow line of current */
function b53River(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B53G; const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, dark ? P.riverD : P.riverL); g.addColorStop(1, dark ? '#081012' : P.river); ctx.fillStyle = g; ctx.fillRect(px, py, T, T);
  ctx.fillStyle = dark ? 'rgba(255,200,140,.08)' : 'rgba(200,220,220,.14)'; for (let i = 0; i < 2; i++) ctx.fillRect(px + T*hash(x, y, 701 + i)*.7, py + T*(.25 + i*.4), T*(.2 + hash(x, y, 703 + i)*.2), Math.max(1, T*.03)); }
/* trampled earth and mud */
function b53Earth(ctx, x, y, T, dark, mud){ const px = x*T, py = y*T, P = B53G; ctx.fillStyle = mud ? (dark ? P.mudD : P.mud) : (dark ? P.earthD : P.earth); ctx.fillRect(px, py, T, T);
  b2Mottle(ctx, x, y, T, .05, .14, '220,200,160', 1); if (mud) { ctx.fillStyle = dark ? 'rgba(180,200,210,.06)' : 'rgba(180,200,210,.14)'; ell(ctx, px + T*(.3 + hash(x, y, 711)*.4), py + T*(.4 + hash(x, y, 712)*.3), T*.18, T*.06, ctx.fillStyle); }
  else { ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 3; i++) ell(ctx, px + T*(.2 + hash(x, y, 713 + i)*.6), py + T*(.2 + hash(x, y, 716 + i)*.6), T*.05, T*.03, ctx.fillStyle); } } // boot-prints
/* dock planking: boards across, nail-heads, a sheen */
function b53Planks(ctx, x, y, T, dark, base){ const px = x*T, py = y*T, P = B53G; ctx.fillStyle = dark ? (base === 'deck' ? P.deckD : P.plankD) : (base === 'deck' ? P.deck : P.plank); ctx.fillRect(px, py, T, T);
  ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px, py + i*T/4); ctx.lineTo(px + T, py + i*T/4); ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,240,210,.06)'; ctx.fillRect(px, py + T*.02, T, Math.max(1, T*.04)); ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let i = 0; i < 4; i++) ctx.fillRect(px + T*(hash(x, y, 721 + i) > .5 ? .1 : .86), py + T*(.1 + i*.25), 1.4, 1.4); }
/* a building, seen from above with its front wall: board walls, a roof of split shingles; the hostel's windows lit */
const b53WallAt = (x, y) => b2Tile(x, y) === '#';
function b53Building(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B53G, front = !b53WallAt(x, y + 1) && y < (tileMap ? tileMap.length - 1 : 99);
  ctx.fillStyle = dark ? P.roofD : P.roof; ctx.fillRect(px, py, T, front ? T*.5 : T); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(px, py + i*T/5); ctx.lineTo(px + T, py + i*T/5); ctx.stroke(); } // shingle courses
  if (!b53WallAt(x, y - 1)) { ctx.fillStyle = 'rgba(255,240,210,.08)'; ctx.fillRect(px, py, T, T*.06); }
  if (front) { ctx.fillStyle = dark ? P.wallD : P.wall; ctx.fillRect(px, py + T*.5, T, T*.5); ctx.strokeStyle = 'rgba(0,0,0,.4)'; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px + i*T/4, py + T*.5); ctx.lineTo(px + i*T/4, py + T); ctx.stroke(); } // board walls
    const hostel = x <= 2 && y <= 1; if (hostel || hash(x, y, 731) > .6) { ctx.fillStyle = hostel ? `rgba(${P.lamp},${dark ? .85 : .55})` : 'rgba(20,16,12,.8)'; ctx.fillRect(px + T*.34, py + T*.6, T*.3, T*.22); if (hostel && dark) glow(ctx, px + T*.5, py + T*.7, T*.6, '#ffc078', .2); } } }
/* a regiment tent, from above and in front: a ridge, guy-ropes, the flap */
function b53Tent(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B53G; b53Earth(ctx, x, y, T, dark, false); const left = b2Tile(x - 1, y) !== '=', right = b2Tile(x + 1, y) !== '=';
  ctx.fillStyle = dark ? P.tentD : P.tent; ctx.fillRect(px + (left ? T*.08 : 0), py + T*.18, T - (left ? T*.08 : 0) - (right ? T*.08 : 0), T*.66);
  ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(px + (left ? T*.08 : 0), py + T*.5, T - (left ? T*.08 : 0) - (right ? T*.08 : 0), T*.34); ctx.fillStyle = 'rgba(255,250,235,.12)'; ctx.fillRect(px, py + T*.18, T, T*.04); // the two slopes, the ridge
  if (left) { B2F.line(ctx, 'rgba(200,190,160,.5)', 1, [[px + T*.08, py + T*.3], [px, py + T*.1]]); } if (right) { B2F.line(ctx, 'rgba(200,190,160,.5)', 1, [[px + T*.92, py + T*.3], [px + T, py + T*.1]]); ctx.fillStyle = dark ? '#1a1814' : '#5a5448'; poly(ctx, [[px + T*.66, py + T*.84], [px + T*.8, py + T*.5], [px + T*.92, py + T*.84]], ctx.fillStyle); } }
/* a fire: stones, embers, flame (the barge crews' on the dock, the scouts' with a ring of stones on the earth) */
function b53Fire(ctx, x, y, T, dark, ring){ const px = x*T, py = y*T, cx = px + T*.5, cy = py + T*.6; glow(ctx, cx, cy, T*1.2, '#ff8a3a', dark ? .3 : .16);
  if (ring) for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*T*.3, cy + Math.sin(a)*T*.16, T*.07, T*.05, '#5a5650'); }
  ell(ctx, cx, cy, T*.22, T*.1, '#1a0e08'); poly(ctx, [[cx - T*.16, cy], [cx - T*.04, cy - T*.4], [cx + T*.02, cy - T*.18], [cx + T*.08, cy - T*.34], [cx + T*.16, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - T*.07, cy], [cx, cy - T*.2], [cx + T*.07, cy]], '#fff1c2'); }
TILEX.b5_c3_dock = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '~') return b53River(ctx, x, y, T, dark);
  if (ch === '#') return b53Building(ctx, x, y, T, dark);
  if (ch === '=') return b53Tent(ctx, x, y, T, dark);
  if (ch === 'B') { b53River(ctx, x, y, T, dark); ctx.fillStyle = dark ? '#3a3024' : '#6a5a44'; ctx.fillRect(px + T*.3, py, T*.4, T); ctx.fillStyle = '#2a2018'; for (let i = 0; i < 5; i++) ctx.fillRect(px + T*.3, py + T*(.1 + i*.2), T*.4, Math.max(1, T*.03)); return; } // the gangplank down to the barges
  if (ch === 'd') { b53Planks(ctx, x, y, T, dark); if (b2Tile(x, y + 1) === '~') { ctx.fillStyle = '#2a2018'; ctx.fillRect(px, py + T*.9, T, T*.1); } if (hash(x, y, 741) > .82) { ctx.fillStyle = '#2a2420'; ctx.beginPath(); ctx.arc(px + T*.5, py + T*.5, T*.12, 0, 7); ctx.fill(); ctx.fillStyle = '#4a423a'; ctx.beginPath(); ctx.arc(px + T*.48, py + T*.46, T*.08, 0, 7); ctx.fill(); } return; } // a bollard here and there
  if (ch === ',') return b53Earth(ctx, x, y, T, dark, true);
  b53Earth(ctx, x, y, T, dark, false);
  if (ch === 'F') b53Fire(ctx, x, y, T, dark, false);
  if (ch === 'S') { b53Fire(ctx, x, y, T, dark, true); for (let i = 0; i < 3; i++) B2F.line(ctx, '#7a5a34', Math.max(1, T*.03), [[px + T*(.78 + i*.06), py + T*.9], [px + T*(.74 + i*.06), py + T*.12]]); } // the scouts' spears stuck upright by their fire
  if (ch === 'T') { ctx.fillStyle = dark ? 'rgba(60,80,50,.5)' : 'rgba(110,130,80,.6)'; ell(ctx, px + T*.5, py + T*.6, T*.46, T*.3, ctx.fillStyle); ctx.fillStyle = 'rgba(255,250,220,.1)'; ell(ctx, px + T*.42, py + T*.5, T*.3, T*.14, ctx.fillStyle); } }); // the rise: a grassy hump
/* the barges: decks of boards with a gunwale where they meet the water, cargo under tarpaulin, rope coils, gangplanks between */
const b53DeckAt = (x, y) => { const c = b2Tile(x, y); return c && c !== '~' && c !== '^' && c !== 'o'; };
function b53Cargo(ctx, px, py, T, dark){ ell(ctx, px + T*.5, py + T*.86, T*.42, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#3a4036' : '#5a6250'; ctx.beginPath(); ctx.moveTo(px + T*.08, py + T*.84); ctx.lineTo(px + T*.14, py + T*.24); ctx.quadraticCurveTo(px + T*.5, py + T*.1, px + T*.86, py + T*.24); ctx.lineTo(px + T*.92, py + T*.84); ctx.closePath(); ctx.fill(); // a tarpaulin over bales
  ctx.fillStyle = 'rgba(255,255,240,.08)'; ctx.fillRect(px + T*.16, py + T*.26, T*.3, T*.04); ctx.strokeStyle = '#8a7650'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px + T*.1, py + T*.56); ctx.lineTo(px + T*.9, py + T*.5); ctx.moveTo(px + T*.5, py + T*.14); ctx.lineTo(px + T*.52, py + T*.86); ctx.stroke(); } // roped
function b53Coil(ctx, px, py, T){ ctx.strokeStyle = '#9a8458'; ctx.lineWidth = Math.max(1, T*.04); for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(px + T*.5, py + T*.55, T*(.28 - k*.07), T*(.16 - k*.04), 0, 0, 7); ctx.stroke(); } B2F.line(ctx, '#9a8458', Math.max(1, T*.04), [[px + T*.78, py + T*.55], [px + T, py + T*.4]]); } // a coil, its line going off to the next barge
TILEX.b5_c3_barges = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '~' || ch === '^' || ch === '#') { b53River(ctx, x, y, T, dark); if (ch === '^') { ctx.fillStyle = dark ? '#3a3024' : '#6a5a44'; ctx.fillRect(px + T*.3, py, T*.4, T); ctx.fillStyle = 'rgba(200,180,140,.2)'; ctx.fillRect(px + T*.3, py, T*.4, T*.3); } return; } // the plank up to the dock
  if (ch === '-') { const water = b2Tile(x - 1, y) === '~' || b2Tile(x + 1, y) === '~'; if (water) b53River(ctx, x, y, T, dark); else b53Planks(ctx, x, y, T, dark, 'deck');
    ctx.fillStyle = dark ? '#4a3c2c' : '#7a6650'; ctx.fillRect(px + T*.28, py, T*.44, T); ctx.fillStyle = '#2a2018'; for (let i = 0; i < 4; i++) ctx.fillRect(px + T*.28, py + T*(.12 + i*.25), T*.44, Math.max(1, T*.03)); return; } // a gangplank between barges
  b53Planks(ctx, x, y, T, dark, 'deck');
  ctx.fillStyle = dark ? '#2a2218' : '#4a3a28'; if (!b53DeckAt(x, y - 1)) ctx.fillRect(px, py, T, T*.12); if (!b53DeckAt(x, y + 1)) ctx.fillRect(px, py + T*.88, T, T*.12); if (!b53DeckAt(x - 1, y)) ctx.fillRect(px, py, T*.12, T); if (!b53DeckAt(x + 1, y)) ctx.fillRect(px + T*.88, py, T*.12, T); // the gunwale
  if (ch === 'c') b53Cargo(ctx, px, py, T, dark);
  if (ch === 'r') b53Coil(ctx, px, py, T); });
/* the upriver bank at night: a pale path, reeds, rock, a dead tree white in the dark */
function b53Reeds(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B53G; ctx.fillStyle = dark ? '#141a10' : '#2a3420'; ctx.fillRect(px, py, T, T);
  for (let i = 0; i < 9; i++) { const rx = px + T*(.06 + hash(x, y, 751 + i)*.88), top = py + T*(.02 + hash(x, y, 761 + i)*.3); B2F.line(ctx, dark ? P.reedD : P.reed, Math.max(1, T*.035), [[rx, py + T], [rx + T*(hash(x, y, 771 + i) - .5)*.14, top]]); if (hash(x, y, 781 + i) > .6) ell(ctx, rx, top + T*.04, T*.03, T*.07, dark ? '#3a2a1a' : '#5a4228'); } } // reeds, a few bulrush heads
TILEX.b5_c3_bank = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, P = B53G;
  if (ch === '~') return b53River(ctx, x, y, T, dark);
  if (ch === ',') return b53Reeds(ctx, x, y, T, dark);
  ctx.fillStyle = dark ? P.pathD : P.path; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .12, '220,210,180', 1);
  if (ch === '#') { ell(ctx, px + T*.5, py + T*.84, T*.44, T*.12, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? P.rockD : P.rock; ctx.beginPath(); ctx.moveTo(px + T*.06, py + T*.86); ctx.lineTo(px + T*.16, py + T*.3); ctx.lineTo(px + T*.5, py + T*.1); ctx.lineTo(px + T*.86, py + T*.28); ctx.lineTo(px + T*.94, py + T*.86); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(200,210,220,.1)'; poly(ctx, [[px + T*.16, py + T*.3], [px + T*.5, py + T*.1], [px + T*.5, py + T*.5]], ctx.fillStyle); return; }
  if (ch === 'x') { ell(ctx, px + T*.5, py + T*.88, T*.3, T*.08, 'rgba(0,0,0,.45)'); B2F.line(ctx, dark ? '#b8b2a4' : '#d8d0bc', Math.max(1.4, T*.08), [[px + T*.5, py + T*.9], [px + T*.46, py + T*.4], [px + T*.56, py + T*.06]]); B2F.line(ctx, dark ? '#a8a294' : '#c8c0ac', Math.max(1, T*.04), [[px + T*.47, py + T*.46], [px + T*.2, py + T*.2]]); B2F.line(ctx, dark ? '#a8a294' : '#c8c0ac', Math.max(1, T*.04), [[px + T*.5, py + T*.3], [px + T*.82, py + T*.16]]); ctx.fillStyle = '#e8c073'; ctx.fillRect(px + T*.44, py + T*.56, T*.08, T*.03); return; } // a dead tree, a fresh cut on its trunk
  if (ch === '^' || ch === 'v') { ctx.fillStyle = 'rgba(220,200,160,.16)'; ctx.fillRect(px + T*.3, py, T*.4, T); } });
/* in fights: 't' is cover (cargo on the barges, crates and barrels on the dock, a stand of reeds on the bank), 'o' is the river */
function b53Cover(ctx, x, y, T, dark, st){ const px = x*T, py = y*T;
  if (st === 'b5_c3_barges') return b53Cargo(ctx, px, py, T, dark);
  if (st === 'b5_c3_bank') { ell(ctx, px + T*.5, py + T*.86, T*.4, T*.1, 'rgba(0,0,0,.5)'); for (let i = 0; i < 14; i++) { const rx = px + T*(.12 + hash(x, y, 791 + i)*.76); B2F.line(ctx, dark ? '#2e3a22' : '#4a5a34', Math.max(1, T*.04), [[rx, py + T*.9], [rx + T*(hash(x, y, 811 + i) - .5)*.2, py + T*(.04 + hash(x, y, 801 + i)*.2)]]); } return; }
  ell(ctx, px + T*.5, py + T*.86, T*.42, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#3a2c1c' : '#5a4428'; ctx.fillRect(px + T*.08, py + T*.4, T*.44, T*.44); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; ctx.strokeRect(px + T*.08 + .5, py + T*.4 + .5, T*.44 - 1, T*.44 - 1); // a crate
  ctx.fillStyle = dark ? '#2a2a26' : '#4a4a40'; ctx.beginPath(); ctx.ellipse(px + T*.72, py + T*.5, T*.18, T*.08, 0, 0, 7); ctx.fill(); ctx.fillRect(px + T*.54, py + T*.5, T*.36, T*.34); ctx.fillStyle = 'rgba(201,163,90,.5)'; ctx.fillRect(px + T*.54, py + T*.6, T*.36, Math.max(1, T*.03)); ctx.fillRect(px + T*.54, py + T*.76, T*.36, Math.max(1, T*.03)); } // a barrel
{ const B53ST = ['b5_c3_dock', 'b5_c3_barges', 'b5_c3_bank'], _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (B53ST.includes(style)) { if (ch === 't') return b53Cover(ctx, x, y, T, dark, style); if (ch === 'o') return b2Clip(ctx, x, y, T, () => b53River(ctx, x, y, T, dark)); } return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* the mountains to the north, very close: two ranges, the far one paler */
function b53Mountains(x, W, H, base, near, far){ x.fillStyle = far; x.beginPath(); x.moveTo(0, base); for (let i = 0; i <= 24; i++) x.lineTo(W*i/24, base - H*(.16 + hash(i, 5301)*.12 + Math.sin(i*.7)*.03)); x.lineTo(W, base); x.fill();
  x.fillStyle = near; x.beginPath(); x.moveTo(0, base + 2); for (let i = 0; i <= 16; i++) x.lineTo(W*i/16, base - H*(.06 + hash(i, 5302)*.08)); x.lineTo(W, base + 2); x.fill(); }
/* the Landing from the river: the slope with the regiment's tents and the cadre's above, the three buildings, the dock, the ships with their
   banners. sky: 'dusk', 'day', 'night', 'dawn' */
function b53Slope(x, W, H, hz, sky){ const lit = sky === 'night' || sky === 'dusk', dk = sky === 'night' ? '#0e1210' : sky === 'dawn' ? '#3a3e3a' : sky === 'day' ? '#4a5038' : '#262420';
  x.fillStyle = dk; x.beginPath(); x.moveTo(0, hz); x.quadraticCurveTo(W*.4, hz - H*.1, W, hz - H*.04); x.lineTo(W, H*.7); x.lineTo(0, H*.7); x.fill(); // the slope up from the river
  for (let i = 0; i < 34; i++) { const tx = hash(i, 5311)*W, ty = hz - H*.02 + hash(i, 5312)*H*.16, s = H*(.012 + hash(i, 5313)*.01); x.fillStyle = sky === 'night' ? '#2a2a26' : '#8a8478'; poly(x, [[tx - s*1.6, ty], [tx, ty - s*1.4], [tx + s*1.6, ty]], x.fillStyle); if (lit && hash(i, 5314) > .55) { x.fillStyle = `rgba(255,170,90,${(.5 + hash(i, 5315)*.4).toFixed(2)})`; x.fillRect(tx + s*2, ty - 1.5, 1.6, 1.6); } } // the regiment's tents, and their fires
  for (let i = 0; i < 3; i++) { const tx = W*(.62 + i*.07), ty = hz - H*.07 + i*H*.008, s = H*.03; poly(x, [[tx - s*1.5, ty], [tx, ty - s*1.3], [tx + s*1.5, ty]], sky === 'night' ? '#30302c' : '#a8a498'); x.fillStyle = sky === 'night' ? '#1a1a1a' : '#5a5e62'; x.fillRect(tx - s*1.5, ty - s*.1, s*3, s*.12); x.fillRect(tx - .5, ty - s*1.3, 1, s*1.3); } } // the cadre's three large tents, grey piping
function b53Buildings(x, W, H, base, sky, fallen){ const c = sky === 'night' ? '#0c0c0e' : sky === 'dawn' ? '#2a2826' : '#1e1a18', win = sky === 'night' || sky === 'dusk';
  x.fillStyle = c; x.fillRect(W*.08, base - H*.12, W*.14, H*.12); poly(x, [[W*.07, base - H*.12], [W*.15, base - H*.17], [W*.23, base - H*.12]], c); // the hostel, two storeys
  if (win) for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { x.fillStyle = `rgba(255,196,120,${(.6 + hash(r*4 + i, 5321)*.3).toFixed(2)})`; x.fillRect(W*(.095 + i*.032), base - H*(.1 - r*.05), W*.012, H*.02); }
  x.fillStyle = c; x.fillRect(W*.27, base - H*.07, W*.1, H*.07); poly(x, [[W*.26, base - H*.07], [W*.32, base - H*.1], [W*.38, base - H*.07]], c); // the storehouse, its roof sagging
  if (fallen) { for (let i = 0; i < 7; i++) { x.save(); x.translate(W*(.42 + hash(i, 5322)*.07), base - H*.01); x.rotate((hash(i, 5323) - .5)*1.6); x.fillStyle = c; x.fillRect(-W*.025, -1.2, W*.05, 2.4); x.restore(); } } // the shed by the water, a heap of boards
  else { x.fillStyle = c; x.save(); x.translate(W*.41, base); x.rotate(-.12); x.fillRect(0, -H*.05, W*.08, H*.05); poly(x, [[-W*.004, -H*.05], [W*.04, -H*.075], [W*.084, -H*.05]], c); x.restore(); } } // the shed, leaning
function b53Ships(ctx, W, H, base, sky, t, mo){ const c = sky === 'night' ? '#08080a' : '#1a1a1e';
  [[.66, .13], [.84, .11]].forEach(([u, w], i) => { const sx = W*u, sw = W*w; ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(sx - sw/2, base - H*.03); ctx.lineTo(sx + sw/2, base - H*.03); ctx.lineTo(sx + sw*.42, base); ctx.lineTo(sx - sw*.42, base); ctx.fill(); ctx.fillRect(sx - 1, base - H*.24, 2, H*.21); ctx.fillRect(sx - sw*.3, base - H*.18, sw*.6, 1.4); // hull, mast, yard
    const fl = mo ? Math.sin(t/500 + i*2)*1.5 : 0, bx = sx + 1, by = base - H*.24; ctx.fillStyle = i ? '#2a2a3a' : '#6a5420'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + W*.02, by + fl, bx + W*.04, by + 2 + fl); ctx.lineTo(bx + W*.04, by + H*.035 + fl); ctx.quadraticCurveTo(bx + W*.02, by + H*.035, bx, by + H*.033); ctx.fill(); // the banners: the King's, and the Ceda's
    ctx.fillStyle = i ? 'rgba(200,200,220,.35)' : 'rgba(255,220,140,.45)'; ctx.fillRect(bx + W*.012, by + H*.012 + fl*.5, W*.012, H*.01); }); }
/* the barges, tied three deep along the dock, in the foreground */
function b53Barges(x, W, H, top, sky){ const c = sky === 'night' ? '#16120e' : sky === 'dawn' ? '#3a3228' : '#2a2218', lc = sky === 'night' ? '#241e18' : '#4a3e30';
  for (let b = 0; b < 3; b++) { const y = top + b*H*.07, x0 = W*(.02 + b*.03), x1 = W*(.92 - b*.02); x.fillStyle = c; x.beginPath(); x.moveTo(x0, y); x.lineTo(x1, y); x.lineTo(x1 - W*.02, y + H*.05); x.lineTo(x0 + W*.02, y + H*.05); x.fill(); x.fillStyle = lc; x.fillRect(x0, y, x1 - x0, 2);
    for (let i = 0; i < 4; i++) { const cx = x0 + (x1 - x0)*(.12 + i*.22 + hash(b*4 + i, 5331)*.06); x.fillStyle = sky === 'night' ? '#1e221c' : '#3e463a'; x.beginPath(); x.moveTo(cx - W*.05, y); x.quadraticCurveTo(cx, y - H*.05, cx + W*.05, y); x.fill(); } } } // cargo under tarpaulins
SCENEX.b5_landing = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, ph = f.b5_c3_ph || 1, hz = H*.46;
  const sky = ph >= 3 ? 'dawn' : (f.b5_c3_key && !(f.b5_c3_cheerDone || f.b5_c3_bankDone)) || (f.b5_c3_watch && !f.b5_c3_riverDone) ? 'night' : ph === 2 ? 'day' : 'dusk', fallen = !!(f.b5_c3_collapse || f.b5_c3_ranOut || ph >= 3);
  ctx.drawImage(sceneLayer('b53:land' + sky + (fallen ? 'f' : ''), W, H, (x, W, H) => {
    const st = sky === 'night' ? [[0,'#05070e'],[1,'#141a28']] : sky === 'dawn' ? [[0,'#4a5250'],[.6,'#8a9a8a'],[1,'#b8c4b0']] : sky === 'day' ? [[0,'#6a84a0'],[1,'#c8ccc0']] : [[0,'#2a2a4a'],[.5,'#7a5a6a'],[.85,'#d88a5a'],[1,'#e8a868']];
    x.fillStyle = vgrad(x, 0, hz, st); x.fillRect(0, 0, W, hz + 2);
    if (sky === 'night') for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 5341)*.45).toFixed(2)})`; x.fillRect(hash(i, 5342)*W, Math.pow(hash(i, 5343), 1.4)*hz*.6, 1, 1); }
    if (sky === 'dawn') { x.fillStyle = 'rgba(150,200,160,.12)'; x.fillRect(0, 0, W, hz); } // the green-grey haze of the ash
    b53Mountains(x, W, H, hz - H*.06, sky === 'night' ? '#080a0c' : sky === 'dawn' ? '#4a524c' : sky === 'day' ? '#4a5462' : '#2a2434', sky === 'night' ? '#121620' : sky === 'dawn' ? '#6a746c' : sky === 'day' ? '#7a8494' : '#4a3e52');
    b53Slope(x, W, H, hz, sky); b53Buildings(x, W, H, H*.62, sky, fallen);
    x.fillStyle = vgrad(x, H*.62, H, sky === 'night' ? [[0,'#0c161a'],[1,'#060c0e']] : sky === 'dawn' ? [[0,'#5a6a64'],[1,'#2a3634']] : sky === 'day' ? [[0,'#5a7478'],[1,'#22383a']] : [[0,'#6a5a5a'],[.4,'#2e3e40'],[1,'#162224']]); x.fillRect(0, H*.62, W, H*.38); // the river
    x.fillStyle = sky === 'night' ? '#1a1612' : '#3a3026'; x.fillRect(0, H*.615, W*.6, H*.02); for (let i = 0; i < 12; i++) x.fillRect(W*i*.05, H*.62, 2, H*.04); // the dock on its piles
    b53Barges(x, W, H, H*.74, sky);
    if (sky === 'dawn') for (let i = 0; i < 120; i++) { x.fillStyle = `rgba(190,210,190,${(.15 + hash(i, 5344)*.25).toFixed(2)})`; x.fillRect(hash(i, 5345)*W, H*(.74 + hash(i, 5346)*.24), 1.2, 1); } // ash on the cargo
  }), 0, 0, W, H);
  b53Ships(ctx, W, H, H*.63, sky, t, mo);
  for (let i = 0; i < 20; i++) { const k = hash(i, 5347), y = lerp(H*.64, H*.98, k), xx = ((hash(i, 5348)*W + t*mo*(.008 + k*.01)) % (W + 30)) - 15; ctx.fillStyle = sky === 'night' ? `rgba(255,200,140,${(.06 + .12*hash(i, 5349)).toFixed(2)})` : `rgba(230,236,230,${(.08 + .14*hash(i, 5349)).toFixed(2)})`; ctx.fillRect(xx, y, 5 + 12*hash(i, 5350), 1); } // the river going past
  if (sky === 'night' || sky === 'dusk') { const lx = W*.5, ly = H*.86, fl = b2Fl(t); ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.12, '#ffc078', .3*fl); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#2a2018'; ctx.fillRect(lx - 3, ly - 4, 6, 7); ctx.fillStyle = `rgba(255,214,150,${(.8*fl).toFixed(2)})`; ctx.fillRect(lx - 2, ly - 3, 4, 4); } // a hooded lantern on the outer barge
  if (sky !== 'night') for (let i = 0; i < 4; i++) { const k = mo ? ((t/16000 + i*.25) % 1) : hash(i, 5351), gx = lerp(-20, W + 20, k), gy = H*(.12 + hash(i, 5352)*.16) + (mo ? Math.sin(t/400 + i)*3 : 0), wg = mo ? Math.sin(t/120 + i)*2 : 1; ctx.strokeStyle = 'rgba(30,30,40,.6)'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(gx - 4, gy - wg); ctx.quadraticCurveTo(gx - 1.6, gy - 2, gx, gy); ctx.quadraticCurveTo(gx + 1.6, gy - 2, gx + 4, gy - wg); ctx.stroke(); } // birds over the river
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.22 + i*18, H*.8, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, sky === 'night' ? .6 : .45, .5); };
/* the green fire: a curtain of green light hanging over the far mountains from one end of the sky to the other; the camp, the dock and the
   barges as black shapes in front, the crowd with its arms up; the river lit green. What is under it is never shown. */
SCENEX.b5_c3_greenfire = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, f = (S && S.f) || {}, fading = !!(f.b5_c3_collapse || f.b5_c3_ranOut);
  ctx.drawImage(sceneLayer('b53:green', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#020604'],[.6,'#08160e'],[1,'#123222']]); x.fillRect(0, 0, W, hz + 2);
  }), 0, 0, W, H);
  // the curtain: vertical bands, rising and hanging, swaying slowly
  const A = fading ? .5 : 1; ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 42; i++) { const u = i/41, bx = W*u, sw = mo ? Math.sin(t/1600 + i*.5)*W*.01 : 0, top = H*(.04 + hash(i, 5361)*.12 + (mo ? Math.sin(t/2100 + i*.3)*.02 : 0)), bot = hz - H*.1 - hash(i, 5362)*H*.05;
    const g = ctx.createLinearGradient(0, top, 0, bot); g.addColorStop(0, 'rgba(80,255,150,0)'); g.addColorStop(.35, `rgba(70,240,140,${(.1*A).toFixed(3)})`); g.addColorStop(.9, `rgba(120,255,170,${(.32*A).toFixed(3)})`); g.addColorStop(1, `rgba(200,255,210,${(.5*A).toFixed(3)})`);
    ctx.fillStyle = g; ctx.fillRect(bx + sw - W*.014, top, W*.028, bot - top); }
  glow(ctx, W*.5, hz - H*.12, W*.6, '#40e090', .22*A); ctx.globalCompositeOperation = 'source-over';
  // the mountains, black against it
  ctx.fillStyle = '#020403'; ctx.beginPath(); ctx.moveTo(0, hz); for (let i = 0; i <= 24; i++) ctx.lineTo(W*i/24, hz - H*(.06 + hash(i, 5363)*.08)); ctx.lineTo(W, hz); ctx.fill();
  ctx.fillStyle = 'rgba(150,255,190,.5)'; ctx.beginPath(); ctx.moveTo(0, hz - H*.06); for (let i = 0; i <= 24; i++) ctx.lineTo(W*i/24, hz - H*(.06 + hash(i, 5363)*.08)); for (let i = 24; i >= 0; i--) ctx.lineTo(W*i/24, hz - H*(.06 + hash(i, 5363)*.08) + 1.4); ctx.fill(); // the ridge-line, lit
  // the camp: tents, and the crowd with its arms up
  ctx.fillStyle = '#030605'; ctx.fillRect(0, hz, W, H*.18); for (let i = 0; i < 26; i++) { const tx = hash(i, 5364)*W, ty = hz + H*(.02 + hash(i, 5365)*.08), s = H*.02; poly(ctx, [[tx - s*1.6, ty], [tx, ty - s*1.4], [tx + s*1.6, ty]], '#060c08'); }
  for (let i = 0; i < 60; i++) { const px = hash(i, 5366)*W, py = hz + H*(.12 + hash(i, 5367)*.06), up = mo ? Math.sin(t/260 + i)*.7 : 0, s = H*.012; ctx.fillStyle = '#020403'; ctx.fillRect(px - s*.4, py - s*2.4, s*.8, s*2.4); ell(ctx, px, py - s*2.8, s*.45, s*.45, '#020403');
    if (hash(i, 5368) > .35) { ctx.fillRect(px - s*.9, py - s*(3.6 + up), s*.3, s*1.4); ctx.fillRect(px + s*.6, py - s*(3.4 - up), s*.3, s*1.4); } } // arms up: cheering
  // the river, lit green; the dock and barges black
  ctx.fillStyle = vgrad(ctx, H*.68, H, [[0,'#0e2a1c'],[1,'#030a06']]); ctx.fillRect(0, H*.68, W, H*.32);
  for (let i = 0; i < 26; i++) { const k = hash(i, 5369), y = lerp(H*.7, H*.98, k), xx = ((hash(i, 5370)*W + t*mo*.01) % (W + 30)) - 15; ctx.fillStyle = `rgba(140,255,180,${((.1 + .2*hash(i, 5371))*A).toFixed(2)})`; ctx.fillRect(xx, y, 6 + 14*hash(i, 5372), 1); }
  ctx.fillStyle = '#020302'; ctx.fillRect(0, H*.67, W*.55, H*.02); for (let b = 0; b < 3; b++) { const y = H*(.78 + b*.07); ctx.beginPath(); ctx.moveTo(W*(.04 + b*.03), y); ctx.lineTo(W*(.9 - b*.02), y); ctx.lineTo(W*(.88 - b*.02), y + H*.045); ctx.lineTo(W*(.06 + b*.03), y + H*.045); ctx.fill(); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.3 + i*18, H*.84, 1.7, t, {phase:i, dir:1, still:true}));
  ctx.fillStyle = 'rgba(60,220,130,.08)'; ctx.fillRect(0, 0, W, H); // everything lit green
  vign(ctx, W, H, .6, .45); };
/* the mages' tents seen from the barges at evening: three large tents on their own ground above the camp, grey piping, guards facing
   outward; the ships at the dock with the King's banner and the Ceda's; a barge's deck and a coil of rope in front */
SCENEX.b5_c3_tents = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.36, f = (S && S.f) || {}, after = !!(f.b5_c3_cheerDone || f.b5_c3_bankDone || (f.b5_c3_ph || 1) >= 3), night = !!f.b5_c3_key && !after;
  ctx.drawImage(sceneLayer('b53:tents' + (night ? 'n' : after ? 'a' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, night ? [[0,'#04060c'],[1,'#141a26']] : after ? [[0,'#4a5250'],[1,'#a8b4a4']] : [[0,'#3a3a5a'],[.6,'#9a6a6a'],[1,'#e09a62']]); x.fillRect(0, 0, W, hz + 2);
    b53Mountains(x, W, H, hz, night ? '#06080a' : after ? '#4a524c' : '#2e2838', night ? '#10141c' : after ? '#6a746c' : '#544458');
    x.fillStyle = night ? '#0a0e0c' : after ? '#3e443e' : '#2e2c24'; x.beginPath(); x.moveTo(0, hz + H*.02); x.quadraticCurveTo(W*.5, hz - H*.06, W, hz + H*.04); x.lineTo(W, H*.7); x.lineTo(0, H*.7); x.fill(); // the slope
    for (let i = 0; i < 20; i++) { const tx = hash(i, 5381)*W, ty = hz + H*(.12 + hash(i, 5382)*.14), s = H*.022; poly(x, [[tx - s*1.6, ty], [tx, ty - s*1.4], [tx + s*1.6, ty]], night ? '#24241e' : '#7a766a'); } // the regiment's tents below
    for (let i = 0; i < 3; i++) { const tx = W*(.34 + i*.16), ty = hz + H*.1, s = H*.1; poly(x, [[tx - s*1.5, ty], [tx, ty - s*1.2], [tx + s*1.5, ty]], night ? '#3a3a34' : after ? '#8a8a82' : '#b0aca0'); x.fillStyle = night ? '#1a1a1a' : '#4a4e54'; x.fillRect(tx - s*1.5, ty - s*.14, s*3, s*.12); x.fillRect(tx - .8, ty - s*1.2, 1.6, s*1.2); x.fillRect(tx - s*.2, ty - s*.6, s*.4, s*.6); // the cadre's three large tents, grey piping, a flap
      if (night) { x.fillStyle = 'rgba(255,200,130,.5)'; x.fillRect(tx - s*.18, ty - s*.55, s*.36, s*.5); } }
  }), 0, 0, W, H);
  [.2, .26, .74, .8, .42, .58].forEach((u, i) => drawFigure(ctx, 'b5_letherii', W*u, hz + H*(.17 + (i > 3 ? .03 : 0)), .5, t, {still:true, dir:u < .5 ? -1 : 1, phase:i})); // guards round the three, facing outward
  ctx.fillStyle = vgrad(ctx, H*.68, H, night ? [[0,'#0c161a'],[1,'#060c0e']] : [[0,'#4a5a5a'],[1,'#1a2a2c']]); ctx.fillRect(0, H*.68, W, H*.32); b53Ships(ctx, W, H, H*.68, night ? 'night' : 'day', t, mo); // the river, the ships at the dock
  ctx.fillStyle = night ? '#16120e' : '#3a3024'; ctx.beginPath(); ctx.moveTo(0, H*.84); ctx.lineTo(W, H*.8); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.4)'; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, H*(.84 + i*.035)); ctx.lineTo(W, H*(.8 + i*.04)); ctx.stroke(); } // the barge's deck, near
  ctx.strokeStyle = '#8a7650'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.ellipse(W*.82, H*.92, 16 - k*4, 5 - k*1.2, 0, 0, 7); ctx.stroke(); } // a coil of rope
  vign(ctx, W, H, night ? .6 : .45, .5); };
/* the outlying shed fallen in on itself at night: boards at angles, lanterns round it, men digging; the green light fading over the
   mountains behind; nobody shown hurt */
SCENEX.b5_c3_collapse = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b53:coll', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#03060a'],[.7,'#0a1a14'],[1,'#163626']]); x.fillRect(0, 0, W, hz + 2);
    x.globalCompositeOperation = 'lighter'; glow(x, W*.5, hz - H*.04, W*.7, '#30c080', .28); x.globalCompositeOperation = 'source-over'; // the fire fading over the mountains
    b53Mountains(x, W, H, hz, '#020403', '#0a1610');
    x.fillStyle = vgrad(x, hz, H, [[0,'#14120e'],[1,'#0a0806']]); x.fillRect(0, hz, W, H - hz); // the ground by the water
    x.fillStyle = vgrad(x, hz, H, [[0,'#16302a'],[1,'#08140f']]); x.fillRect(W*.8, hz, W*.2, H - hz); for (let i = 0; i < 14; i++) { x.fillStyle = `rgba(140,230,180,${(.08 + hash(i, 5394)*.14).toFixed(2)})`; x.fillRect(W*(.81 + hash(i, 5395)*.17), H*(.45 + hash(i, 5396)*.5), 4 + hash(i, 5397)*8, 1); } // the river, at the edge, a little green in it
    for (let i = 0; i < 16; i++) { x.save(); x.translate(W*(.3 + hash(i, 5391)*.4), H*(.6 + hash(i, 5392)*.14)); x.rotate((hash(i, 5393) - .5)*1.8); x.fillStyle = ['#2a2018', '#1e1812', '#342a1e'][i % 3]; x.fillRect(-W*.06, -2, W*.12, 4); x.restore(); } // the boards, fallen in
    x.fillStyle = '#1a140e'; x.save(); x.translate(W*.36, H*.58); x.rotate(-.5); x.fillRect(0, 0, W*.02, H*.18); x.restore(); x.save(); x.translate(W*.62, H*.56); x.rotate(.4); x.fillRect(0, 0, W*.02, H*.16); x.restore(); // two posts still standing, leaning
  }), 0, 0, W, H);
  [[.3, .66], [.5, .58], [.7, .68], [.42, .8]].forEach(([u, v], i) => { const lx = W*u, ly = H*v; ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.14, '#ffb060', .3*fl); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#2a2018'; ctx.fillRect(lx - 2, ly - 4, 4, 6); ctx.fillStyle = `rgba(255,214,150,${(.85*fl).toFixed(2)})`; ctx.fillRect(lx - 1.4, ly - 3, 2.8, 3.4); }); // lanterns
  [[.26, .78, 1], [.38, .7, -1], [.56, .72, 1], [.66, .8, -1], [.48, .86, 1]].forEach(([u, v, d], i) => { const dig = mo ? Math.sin(t/300 + i*1.4) : 0; drawFigure(ctx, i === 2 ? 'b5_letherii' : 'b5_c3_bargeman', W*u, H*v, 1.3, t, {still:true, dir:d, phase:i}); B2F.line(ctx, '#6a4a2a', 1.6, [[W*u + d*8, H*v - 6 + dig*2], [W*u + d*16, H*v + 10 + dig*3]]); }); // men digging, spades going in
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.12 + i*16, H*.96, 1.6, t, {phase:i, dir:1}));
  vign(ctx, W, H, .65, .55); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Five's ground ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on dark canal-slate with a thin dock-gold rim (Claude's call) */
function b53Item(key, label, body){ const w = 240, h = 130, id = 'c53-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#34444a"></stop><stop offset=".7" stop-color="#1a2428"></stop><stop offset="1" stop-color="#0e1214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a cadre's spare tile: a small square of black stone, polished, blank, a hairline crack across one corner */
b53Item('b5_c3_cadretile', 'A cadre\'s spare tile', '<ellipse cx="120" cy="70" rx="60" ry="34" fill="#a8c0c8" opacity=".05"/>'
  + '<g transform="rotate(-8 120 64)"><rect x="88" y="34" width="64" height="64" rx="6" fill="#06080a" opacity=".55" transform="translate(4 6)"/>'
  + '<rect x="88" y="34" width="64" height="64" rx="6" fill="#16181c"/><rect x="88" y="34" width="64" height="64" rx="6" fill="none" stroke="#3a3e46" stroke-width="1.6"/>'
  + '<path d="M93 40 L140 40 Q132 46 96 72 Z" fill="#ffffff" opacity=".07"/><path d="M92 38 L146 38" stroke="#9aa4b0" stroke-width="1" opacity=".55"/><path d="M90 40 L90 92" stroke="#6a7480" stroke-width=".8" opacity=".5"/>'
  + '<path d="M131 98 L136 88 L134 82 L141 76 L144 69 L152 64" fill="none" stroke="#5a6068" stroke-width="1" opacity=".9"/><path d="M132 97 L137 87" fill="none" stroke="#c8d0d8" stroke-width=".5" opacity=".5"/></g>');
/* a Faraed throwing-spear: a slim spear with a leaf-shaped iron head and a bird-feather tuft */
b53Item('b5_c3_spear', 'A Faraed throwing-spear', '<ellipse cx="120" cy="66" rx="94" ry="24" fill="#d8c8a8" opacity=".05"/><g transform="rotate(-12 120 66)">'
  + '<rect x="20" y="63" width="168" height="5" rx="2.5" fill="#a07a48"/><rect x="20" y="63" width="168" height="1.8" rx=".9" fill="#d8b480" opacity=".6"/><path d="M30 67 L184 67" stroke="#5a3e22" stroke-width=".8"/>'
  + '<g fill="#3a2a1a" opacity=".55"><rect x="60" y="63" width="3" height="5"/><rect x="96" y="63" width="2" height="5"/><rect x="132" y="63" width="3" height="5"/></g>'
  + '<rect x="182" y="61" width="10" height="9" rx="1.5" fill="#6a5034"/><path d="M182 62 L192 62 M182 69 L192 69" stroke="#3a2a18" stroke-width="1"/>'
  + '<path d="M192 65.5 Q204 56 226 65.5 Q204 75 192 65.5 Z" fill="#7a7c80"/><path d="M194 65.5 Q206 59 224 65.5" fill="none" stroke="#d0d4d8" stroke-width="1" opacity=".7"/><path d="M192 65.5 L226 65.5" stroke="#4a4c50" stroke-width=".8"/>'
  + '<g transform="translate(26 66)"><path d="M0 0 Q-10 -12 -18 -8 Q-10 -4 0 0" fill="#3a5a6a"/><path d="M0 0 Q-12 -2 -20 6 Q-10 6 0 0" fill="#c8b070"/><path d="M0 0 Q-8 8 -14 14 Q-4 8 0 0" fill="#2a3a4a"/><path d="M-2 -1 Q-10 -8 -16 -7" stroke="#e8e0cc" stroke-width=".6" fill="none" opacity=".6"/></g>'
  + '<path d="M22 64 Q16 66 22 68" fill="#7a5a34"/></g>');
/* green ash in a paper twist: a twist of brown paper, a pinch of grey-green ash at the open end */
b53Item('b5_c3_ash', 'Green ash in a paper twist', '<ellipse cx="120" cy="72" rx="70" ry="28" fill="#9ae0b8" opacity=".05"/>'
  + '<path d="M70 82 Q96 58 132 54 L152 50 Q166 52 170 62 Q168 74 154 78 L132 80 Q98 92 76 92 Q66 90 70 82 Z" fill="#8a6a46"/>'
  + '<path d="M72 84 Q98 64 134 58 L152 54" fill="none" stroke="#b8946a" stroke-width="1.4" opacity=".7"/><path d="M78 90 Q104 86 132 78 L152 74" fill="none" stroke="#5a422a" stroke-width="1.2"/>'
  + '<path d="M70 82 Q62 84 58 90 Q64 94 76 92" fill="#7a5c3c"/><path d="M60 89 L54 92 M62 92 L57 97" stroke="#7a5c3c" stroke-width="2" stroke-linecap="round"/>'
  + '<g stroke="#5a422a" stroke-width=".8" opacity=".6"><path d="M96 74 L104 64 M112 70 L118 60 M126 66 L130 58"/></g>'
  + '<ellipse cx="164" cy="64" rx="13" ry="10" fill="#2a2a26"/><ellipse cx="166" cy="62" rx="11" ry="8" fill="#7a8478"/>'
  + '<g fill="#a8c0a8"><circle cx="160" cy="60" r="1.6"/><circle cx="168" cy="58" r="1.2"/><circle cx="172" cy="64" r="1.4"/><circle cx="163" cy="66" r="1"/></g><g fill="#7ad8a0" opacity=".55"><circle cx="165" cy="61" r="2.2"/><circle cx="170" cy="60" r="1.4"/></g>'
  + '<g fill="#a8b8a8" opacity=".6"><circle cx="182" cy="72" r="1"/><circle cx="188" cy="78" r=".8"/><circle cx="178" cy="80" r=".9"/><circle cx="194" cy="74" r=".7"/></g>');
