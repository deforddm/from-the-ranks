/* ============ Book Four, Chapter 4 art: Leoman's Raids — the column in the hottest sun, the oil raid, the Seti wounded, the barrow hills in fog ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/70d, lit from the left: the Whirlwind's desert raiders (veiled to the eyes, indigo and sand,
   never anyone with a face or a name; the lamp-thrower, the slinger, a leader with a red sash), the Seti of Quon Tali (young lancers with
   dyed horse-tails and a jackal's tail under the blade, women archers with short horn bows, an old cutter, an archer with her hand bound),
   and the boy with the bone, very small and far, for the noon halt's backdrop only. Two grounds (TILEX): the column's camp on Book Two's
   Odhan (wagons, burning wagons, tents, horse lines, a cook fire), and the barrow hills in fog. Five backdrops (SCENEX, sceneLayer for the
   still parts, REDUCE() holding the rest still): the column in the hottest sun, the raid, the Seti wounded's fire (70's b4_seti_fire,
   redrawn), the barrow hills in fog with one lantern, and the barrows at dawn with the empty helms. The chapter's gear on Book Four's
   sand-and-iron ground. Grim things stay distant: the wounded are shapes under blankets, the raid is fire and silhouettes. */

/* ---------------- figures ---------------- */
/* a desert raider of the Whirlwind: robes of indigo or sand, a long tail of cloth wrapped round the head and across the face to the eyes,
   a tulwar; variants carry two clay lamps on a cord (lit), a sling, or a leader's red sash and a longer blade. Never a face. */
function b44Raider(ctx, h, t, o, v){ const sw = o.still ? 0 : Math.sin(t/300 + (o.phase || 0)), c = b2Pick(o, [['#2e3448', '#0e1018'], ['#8a7a5a', '#2e2618'], ['#3a3040', '#121018'], ['#6a5a42', '#221a10']]), sk = b2Pick(o, ['#7a5a40', '#6a4a34', '#84603e']);
  if (v === 'lead') B2F.grow(ctx, 1.12, 1.08);
  h.legs('#1e1a16'); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-4.6, 10.4, 3.6, 2.6); ctx.fillRect(1, 10.4, 3.6, 2.6); // riding boots, soft
  poly(ctx, [[-6.4,-6],[6.4,-6],[7.6,9.4],[2.6,10.4],[0,8],[-2.6,10.4],[-7.6,9.4]], h.armor(c[0], c[1])); // a riding robe, split for the saddle
  ctx.fillStyle = 'rgba(255,240,210,.12)'; ctx.fillRect(-5.8, -5.4, 1.6, 13); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(-3, -5); ctx.lineTo(-4, 9); ctx.moveTo(3.4, -5); ctx.lineTo(4.6, 9); ctx.stroke(); // folds
  ctx.fillStyle = v === 'lead' ? '#8a2a20' : '#2a2016'; ctx.fillRect(-6.6, 2.4, 13.2, 1.6); if (v === 'lead') { poly(ctx, [[-6.6,2.4],[-8.4,9],[-6.6,9.4],[-5.4,4]], '#7a2218'); } // a sash; the leader's is red, its end hanging
  ctx.fillStyle = sk; ctx.fillRect(6, -4.6, 2.2, 6.2); ctx.fillRect(-8.2, -4.6, 2.2, 5.8); // forearms, bare
  h.head(sk, 4.3, -11.2);
  const wrap = b2Pick(o, ['#1e2232', '#4a4234', '#2a2430']), wl = shade(wrap, .12);
  ctx.fillStyle = wrap; ctx.beginPath(); ctx.arc(0, -12, 5.3, Math.PI*.9, Math.PI*2.1); ctx.fill(); // the wrap over the crown
  poly(ctx, [[-5.2,-10.6],[5.4,-10.6],[5.2,-6.2],[2,-5.2],[-2.4,-5.6],[-5.4,-7]], wrap); ctx.fillStyle = wl; ctx.fillRect(-5, -10.4, 10.2, .7); // and across the face, to the eyes
  ctx.fillStyle = 'rgba(255,236,200,.85)'; ctx.fillRect(-1.4, -12, 1.1, .8); ctx.fillRect(1.8, -12, 1.1, .8); // only the eyes
  poly(ctx, [[-5.2,-12],[-3,-12],[-6 + sw*.5,-2],[-8.4 + sw*.8,-3]], wrap); // its tail, behind, moving
  if (v === 'lamp') { // two clay lamps on a cord, lit, swinging; no blade
    const a = (o.still ? .6 : t/180 + (o.phase || 0)), lx = 7.4 + Math.cos(a)*5, ly = -12 + Math.sin(a)*4;
    B2F.line(ctx, '#5a4a30', .6, [[7.2, -3], [lx, ly]]); B2F.line(ctx, '#5a4a30', .6, [[lx, ly], [lx + Math.cos(a + 2.6)*4, ly + Math.sin(a + 2.6)*3]]);
    [[lx, ly], [lx + Math.cos(a + 2.6)*4, ly + Math.sin(a + 2.6)*3]].forEach(([x, y]) => { ell(ctx, x, y, 1.5, 1.2, '#a8784a'); glow(ctx, x, y - 1.4, 3.4, '#ff9a3a', .5); ell(ctx, x, y - 1.6, .5, .9, '#ffd890'); }); }
  else if (v === 'sling') { B2F.line(ctx, '#4a3a22', .6, [[7.4, -3.6], [9 + sw, 3], [8.4, 6]]); ell(ctx, 8.6, 6.4, 1, .8, '#8a8274'); ctx.fillStyle = '#4a3a22'; ctx.fillRect(-8.6, 3, 2.6, 3.2); } // a sling hanging, a stone in its cup; a pouch of stones
  else { B2F.curved(ctx, '#c8c0b0', v === 'lead' ? 1.15 : .95); }
  if (v === 'lead') { ctx.fillStyle = '#c8a050'; ctx.fillRect(-1.6, -13.4, 3.2, .8); } }
Object.assign(FIGX, {
  b4_c4_rider(ctx, h, t, o){ b44Raider(ctx, h, t, o, 'blade'); },
  b4_c4_lamper(ctx, h, t, o){ b44Raider(ctx, h, t, o, 'lamp'); },
  b4_c4_slinger(ctx, h, t, o){ b44Raider(ctx, h, t, o, 'sling'); },
  b4_c4_raidlead(ctx, h, t, o){ ctx.save(); b44Raider(ctx, h, t, o, 'lead'); ctx.restore(); },
  /* a Seti lancer: young, Quon-pale and sunburnt, bare-armed in a sleeveless jerkin of boiled leather with a society's marks burnt in it,
     hair drawn up in a horse-tail, a long lance with a dyed horse-tail and a jackal's tail under the blade, a knife at the belt */
  b4_c4_seti(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.02); const sk = b2Pick(o, ['#d0a07c', '#c49070', '#d8ac88']), jk = b2Pick(o, [['#8a5a32', '#2e1a0c'], ['#7a5a3a', '#261a0e'], ['#94643a', '#321e0c']]), sw = o.still ? 0 : Math.sin(t/480 + (o.phase || 0)), dye = b2Pick(o, ['#b03a2a', '#c8a040', '#3a6aa0']);
    B2F.line(ctx, '#6a4a28', 1.2, [[8.2, 12.4], [10, -24]]); poly(ctx, [[10.1,-29.4],[9.2,-23.6],[11,-23.6]], '#d8d4c8'); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(9.9, -28.4, .4, 4); // the lance
    B2F.line(ctx, dye, 1.3, [[9.9, -22.8], [11.4 + sw*.8, -19], [11 + sw*1.4, -15.6]]); // a dyed horse-tail
    B2F.line(ctx, '#8a6a42', 1.7, [[9.6, -21.6], [8.2 + sw*.6, -17.6]]); ctx.fillStyle = '#2a1e12'; ctx.fillRect(7.6 + sw*.6, -18, 1.2, 1.2); // a jackal's tail, black-tipped
    h.legs('#3a2e20'); ctx.fillStyle = '#4a3420'; ctx.fillRect(-4.6, 8.6, 3.6, 4.4); ctx.fillRect(1, 8.6, 3.6, 4.4); // riding boots
    poly(ctx, [[-6,-6],[6,-6],[6.6,6.8],[-6.6,6.8]], h.armor(jk[0], jk[1])); ctx.fillStyle = 'rgba(255,236,200,.18)'; ctx.fillRect(-5.4, -5.4, 1.6, 11); // the jerkin, boiled leather
    ctx.strokeStyle = 'rgba(30,16,8,.6)'; ctx.lineWidth = .55; ctx.beginPath(); ctx.moveTo(-2.6, -2); ctx.lineTo(-.6, -4); ctx.lineTo(1.4, -2); ctx.lineTo(-.6, 0); ctx.closePath(); ctx.stroke(); // a society's mark burnt in
    ctx.fillStyle = '#2a1a0e'; ctx.fillRect(-6.6, 3.6, 13.2, 1.2); ctx.fillStyle = '#c8b890'; ctx.fillRect(-4.6, 3.8, 1.4, .9); // belt, a knife's hilt
    ctx.fillStyle = sk; ctx.fillRect(-8.4, -5.6, 2.4, 8); ctx.fillRect(6, -5.6, 2.4, 7); ell(ctx, 7.8, 1.8, 1.2, 1.2, sk); // bare arms, the hand on the lance
    ctx.fillStyle = 'rgba(40,30,60,.45)'; for (let i = 0; i < 3; i++) ctx.fillRect(-8.4, -4.4 + i*1.4, 2.4, .4); // bands inked on an arm
    h.head(sk, 4.2, -11); h.look('rgba(20,12,8,.9)', -11.2); ctx.fillStyle = 'rgba(210,90,70,.3)'; ctx.fillRect(-.6, -10.4, 3.6, 1); // sunburn across the nose
    ctx.fillStyle = '#3a2414'; ctx.beginPath(); ctx.arc(0, -12.4, 4.8, Math.PI*1.02, Math.PI*1.98); ctx.fill(); ell(ctx, -.4, -17.4, 1.8, 1.4, '#3a2414'); B2F.line(ctx, '#3a2414', 1.3, [[-1, -17.4], [-4 + sw*.4, -14], [-5.6 + sw*.8, -8]]); // hair up in a horse-tail
    ctx.restore(); },
  /* the loudest of the young lancers: the same, a little bigger, the jackal-tail worn at the shoulder too, and drunk */
  b4_c4_lancechief(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.08, 1.06); FIGX.b4_c4_seti(ctx, h, t, Object.assign({}, o, {phase:2})); B2F.line(ctx, '#8a6a42', 2, [[-6, -6], [-7.6, -1]]); ctx.fillStyle = '#2a1e12'; ctx.fillRect(-8.2, -1.4, 1.4, 1.4); ctx.restore(); },
  /* a Seti woman archer: braids bound with cord, a quilted jerkin, a short recurved horn bow, lacquered dark, a quiver at the hip */
  b4_c4_setiarcher(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1); const sk = b2Pick(o, ['#d4a682', '#c8987a', '#dcb090']), jk = b2Pick(o, [['#6a5a3a', '#221a0e'], ['#5a4a3a', '#1c160e'], ['#7a6040', '#261c0e']]), bound = o.v === 'bound';
    h.legs('#3a2e20'); ctx.fillStyle = '#4a3420'; ctx.fillRect(-4.6, 8.8, 3.6, 4.2); ctx.fillRect(1, 8.8, 3.6, 4.2);
    poly(ctx, [[-5.8,-6],[5.8,-6],[6.8,8.4],[-6.8,8.4]], h.armor(jk[0], jk[1])); ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = .45; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-5.6, -4 + i*2.6); ctx.lineTo(5.6, -4 + i*2.6); } ctx.stroke(); // quilted, to the knee
    ctx.fillStyle = '#3a2614'; ctx.fillRect(5.2, 0, 2.6, 7); ctx.fillStyle = '#d8d0bc'; ctx.fillRect(5.6, -1.4, .5, 1.6); ctx.fillRect(6.6, -1.6, .5, 1.8); // a quiver at the hip, fletchings
    ctx.fillStyle = '#2a1a0e'; ctx.fillRect(-6.2, 2.4, 12.4, 1.1);
    if (bound) { ell(ctx, -7.6, 2, 2.6, 2.2, '#d8ccb4'); ctx.fillStyle = 'rgba(140,40,30,.55)'; ell(ctx, -7.2, 2.6, 1.4, 1.1, 'rgba(140,40,30,.55)'); B2F.line(ctx, '#c8bca2', .8, [[-7.6, 0], [-2, -5.6]]); } // the left hand bound in a lump of rag, red through, slung
    else { ctx.fillStyle = sk; ctx.fillRect(-8.2, -5, 2.2, 6.6); }
    // the short horn bow: recurved, lacquered dark, the tips turned back (held low in the right hand)
    ctx.strokeStyle = '#2a1a10'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(7.4, -12); ctx.quadraticCurveTo(9, -11, 10, -9); ctx.quadraticCurveTo(12, -3, 10, 3); ctx.quadraticCurveTo(9, 5, 7.4, 6); ctx.stroke(); ctx.strokeStyle = 'rgba(200,170,110,.55)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(10.4, -7); ctx.quadraticCurveTo(11.8, -3, 10.4, 1); ctx.stroke();
    ctx.strokeStyle = 'rgba(225,215,195,.8)'; ctx.lineWidth = .45; ctx.beginPath(); ctx.moveTo(7.6, -11.6); ctx.lineTo(7.6, 5.6); ctx.stroke(); ctx.fillStyle = '#c8a46a'; ctx.fillRect(10.6, -3.6, 1.4, 1.6); ell(ctx, 8.6, -2.4, 1.1, 1.1, sk);
    h.head(sk, 4.1, -11.2); h.look('rgba(20,12,8,.9)', -11.4); if (bound) { ctx.strokeStyle = 'rgba(120,60,50,.7)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(-2.6, -14.2); ctx.lineTo(-.6, -12.4); ctx.stroke(); } // a scar through the brow
    ctx.fillStyle = '#2a1a10'; ctx.beginPath(); ctx.arc(0, -12.4, 4.8, Math.PI*1.0, Math.PI*2.0); ctx.fill();
    for (let i = 0; i < 2; i++) { B2F.line(ctx, '#2a1a10', 1.2, [[-4.2 + i*8.4, -12], [-4.8 + i*9.4, -4]]); ctx.fillStyle = '#b8a070'; ctx.fillRect(-5.4 + i*9.6, -7, 1.4, .8); } // two braids, bound with cord
    ctx.restore(); },
  b4_c4_setiwounded(ctx, h, t, o){ FIGX.b4_c4_setiarcher(ctx, h, t, Object.assign({}, o, {v:'bound'})); },
  /* the old Seti cutter: grey braids tied up, a long apron dark with use, sleeves rolled, a knife and a pot; no lance */
  b4_c4_seticutter(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, .98); const sk = '#c49272';
    h.legs('#2e2418'); B2F.robe(ctx, h, '#6a5a44', '#221a10', 5.8, 7.6); poly(ctx, [[-4.2,-3],[4.2,-3],[5,11.6],[-5,11.6]], h.armor('#4a3428', '#1a1008')); ctx.fillStyle = 'rgba(90,30,20,.35)'; ell(ctx, 1, 5, 3, 3.6, 'rgba(90,30,20,.35)'); // the robe, the apron over it, stained
    ctx.fillStyle = sk; ctx.fillRect(-8, -5, 2.2, 7.4); ctx.fillRect(5.8, -5, 2.2, 7); ell(ctx, 7, 3, 1.6, 1.4, '#8a6a4a'); ctx.fillStyle = '#2a2018'; ctx.fillRect(6.2, 2, 1.6, .8); // bare forearms; a clay pot in one hand
    B2F.line(ctx, '#c8c4ba', .8, [[-7, 2.4], [-8.4, -1.4]]); // a small knife in the other
    h.head(sk, 4.2, -11); h.look('rgba(20,12,8,.9)', -11); ctx.strokeStyle = 'rgba(90,60,40,.5)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(-2.6, -9); ctx.lineTo(-1, -9.4); ctx.moveTo(1.4, -9.4); ctx.lineTo(3, -9); ctx.stroke(); // lines in the face
    ctx.fillStyle = '#a8a29a'; ctx.beginPath(); ctx.arc(0, -12.4, 4.8, Math.PI*1.0, Math.PI*2.0); ctx.fill(); ell(ctx, 0, -17, 2.6, 1.8, '#a8a29a'); ctx.fillStyle = '#6a5a44'; ctx.fillRect(-2, -16.4, 4, .7); // grey braids, tied up out of the way
    ctx.restore(); },
  /* the boy with the bone, as the noon halt sees him: very small and very far, fair-haired, in a shirt too big for him (decor only) */
  b4_c4_grub(ctx, h, t, o){ ctx.save(); ctx.scale(.62, .62); ctx.translate(0, 7.6);
    ctx.fillStyle = '#c8a888'; ctx.fillRect(-3.4, 6, 2.6, 7); ctx.fillRect(.8, 6, 2.6, 7); // bare legs
    poly(ctx, [[-5.6,-5],[5.6,-5],[6.8,8.6],[-6.8,8.6]], h.armor('#e4dccb', '#8a8270')); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(-6, 6, 12, 2.6); // a shirt too big, to the knees
    ctx.fillStyle = '#e4dccb'; ctx.fillRect(-7.6, -4.4, 2.4, 6.8); ctx.fillRect(5.2, -4.4, 2.4, 6.8); // its sleeves
    h.head('#e8c4a8', 4.8, -10.6); ctx.fillStyle = '#f0dc9a'; ctx.beginPath(); ctx.arc(0, -11.6, 5.1, Math.PI*.95, Math.PI*2.05); ctx.fill(); ctx.fillRect(-5, -12, 1.6, 2.6); // fair hair
    ctx.fillStyle = 'rgba(30,20,10,.6)'; ctx.fillRect(-1.6, -9.8, 1, .7); ctx.fillRect(1.4, -9.8, 1, .7); // eyes, head down
    ctx.restore(); },
});

/* ---------------- ground: TILEX ----------------
   b4_c4_camp: the column's camp on Book Two's Odhan (47b) by day and by night: '.' earth, 'W' a wagon, '=' a tent, 'h' the horse lines,
     'f' a cook fire (all the Odhan's own); here ',' is trampled grass, flattened and hoof-cut, and 'F' a burning wagon, its canvas going
     up off the hoops. In a fight '#' is a wagon (burning in the raid's first ground), 't' a stack of crates and saddles, and 'h' the
     horse lines' rope with the horses gone.
   b4_c4_hills: the barrow hills by night in fog: '.' hill grass, ',' scrub, '#' rock (the Odhan's), 'B' a barrow, a long low grassed mound
     with a half-sunk stone at one end, 'L' the picket's horn lantern on a spear. Fog lies over every tile in drifts. In a fight 't' is a
     low mound or a scatter of stones. */
const b44InBattle = () => typeof view !== 'undefined' && view === 'battle';
function b44Grass(ctx, x, y, T, N, flat){ const px = x*T, py = y*T; for (let c = 0; c < (flat ? 4 : 3); c++) { const bx = px + T*(.12 + hash(x, y, c + 140)*.76), by = py + T*(.35 + hash(y, x, c + 141)*.55);
    for (let i = 0; i < 5; i++) { const a = flat ? (hash(x, y, c*9 + i + 142) > .5 ? 1.2 : -1.2) + (hash(x, y, i + 143) - .5)*.4 : (i/4 - .5)*.9, l = T*(flat ? .1 : .12 + hash(x, y, c*7 + i + 144)*.1);
      ctx.strokeStyle = N ? (i % 2 ? 'rgba(66,72,80,.7)' : 'rgba(48,54,60,.8)') : (i % 2 ? 'rgba(196,176,120,.8)' : 'rgba(150,132,86,.75)'); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.sin(a)*l, by - Math.cos(a)*l*(flat ? .3 : 1)); ctx.stroke(); } }
  if (flat) for (let i = 0; i < 3; i++) { const hx = px + T*(.2 + hash(x, y, i + 146)*.6), hy = py + T*(.3 + hash(y, x, i + 147)*.6); ctx.strokeStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(90,64,40,.45)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(hx, hy, T*.05, Math.PI*.1, Math.PI*.9); ctx.stroke(); } } // hoof-cuts
/* a wagon on fire: the frame and the hoops black against the flames, the canvas going up off them in sheets, smoke */
function b44Burning(ctx, x, y, T, N, out){ const px = x*T, py = y*T, by = py + T*.78; ell(ctx, px + T*.56, by + T*.06, T*.46, T*.1, 'rgba(0,0,0,.45)');
  if (!out) { glow(ctx, px + T*.5, py + T*.45, T*.9, '#ff7a2a', N ? .32 : .2); } // its light
  ctx.fillStyle = '#140c08'; ctx.fillRect(px + T*.08, py + T*.48, T*.84, T*.22); // the bed, charred
  ctx.strokeStyle = '#0c0806'; ctx.lineWidth = Math.max(1, T*.04); for (let i = 0; i < 4; i++) { const hx = px + T*(.14 + i*.24); ctx.beginPath(); ctx.moveTo(hx, py + T*.5); ctx.quadraticCurveTo(hx + T*.02, py + T*.08, hx + T*.08, py + T*.06); ctx.stroke(); } // the hoops, bare
  if (!out) { b2Flames(ctx, px + T*.32, py + T*.46, T, .8); b2Flames(ctx, px + T*.68, py + T*.42, T, 1); poly(ctx, [[px + T*.5, py + T*.5], [px + T*.56, py + T*.02], [px + T*.66, py + T*.3], [px + T*.74, py - T*.02], [px + T*.86, py + T*.5]], 'rgba(255,170,70,.75)'); // flames up through the hoops
    for (let i = 0; i < 3; i++) ell(ctx, px + T*(.4 + i*.14), py - T*(.04 + i*.06), T*(.12 + i*.04), T*(.06 + i*.02), `rgba(${N ? '40,34,34' : '90,80,70'},${(.4 - i*.1).toFixed(2)})`); } // smoke
  else { for (let i = 0; i < 4; i++) ell(ctx, px + T*(.2 + hash(x, y, i + 150)*.6), py + T*(.5 + hash(y, x, i + 151)*.2), T*.04, T*.03, 'rgba(255,110,50,.55)'); ctx.fillStyle = 'rgba(90,80,70,.25)'; ctx.fillRect(px + T*.5, py - T*.1, T*.06, T*.5); } // embers, a thread of smoke
  [.24, .76].forEach(k => { ell(ctx, px + T*k, by, T*.12, T*.12, '#0a0604'); ctx.strokeStyle = '#2a1a10'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(px + T*k, by, T*.08, 0, 7); ctx.stroke(); }); }
/* crates, sacks and a saddle stacked waist-high: the camp's low cover in a fight */
function b44Crates(ctx, x, y, T, N){ const px = x*T, py = y*T; ell(ctx, px + T*.54, py + T*.86, T*.42, T*.09, 'rgba(0,0,0,.45)');
  const wood = N ? ['#3a2e22', '#1e1610'] : ['#a8845a', '#5a4028'];
  [[.12, .46, .4, .38], [.5, .52, .38, .32]].forEach(([u, v, w, hh]) => { const g = ctx.createLinearGradient(px + T*u, 0, px + T*(u + w), 0); g.addColorStop(0, wood[0]); g.addColorStop(1, wood[1]); ctx.fillStyle = g; ctx.fillRect(px + T*u, py + T*v, T*w, T*hh); ctx.strokeStyle = N ? 'rgba(0,0,0,.5)' : 'rgba(60,40,20,.5)'; ctx.lineWidth = 1; ctx.strokeRect(px + T*u + .5, py + T*v + .5, T*w - 1, T*hh - 1); ctx.beginPath(); ctx.moveTo(px + T*u, py + T*(v + hh/2)); ctx.lineTo(px + T*(u + w), py + T*(v + hh/2)); ctx.stroke(); });
  ell(ctx, px + T*.38, py + T*.4, T*.2, T*.12, N ? '#2e2a26' : '#c8b48c'); ell(ctx, px + T*.34, py + T*.36, T*.08, T*.04, N ? 'rgba(150,160,200,.1)' : 'rgba(255,250,235,.35)'); // a sack on top
  B2F.line(ctx, N ? '#2a1e14' : '#6a4a28', Math.max(1, T*.05), [[px + T*.56, py + T*.52], [px + T*.7, py + T*.4], [px + T*.86, py + T*.5]]); if (N) b2Firelit(ctx, x, y, T, .3, 3.2, '255,150,70'); } // a saddle over the end
function b44Rope(ctx, x, y, T, N){ const px = x*T, py = y*T; for (let i = 0; i < 6; i++) ell(ctx, px + T*(.1 + hash(x, y, i + 160)*.8), py + T*(.5 + hash(y, x, i + 161)*.45), T*.05, T*.035, N ? 'rgba(0,0,0,.45)' : 'rgba(90,64,40,.5)'); // churned ground
  ctx.strokeStyle = N ? '#4a4038' : '#8a7454'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.quadraticCurveTo(px + T*.5, py + T*.36, px + T, py + T*.3); ctx.stroke(); ctx.fillStyle = N ? '#2a2016' : '#5a4028'; if (x % 3 === 0) ctx.fillRect(px + T*.04, py + T*.18, T*.06, T*.4); // the rope, slack
  if (hash(x, y, 162) > .5) { ctx.strokeStyle = N ? '#4a4038' : '#8a7454'; ctx.beginPath(); ctx.moveTo(px + T*.5, py + T*.33); ctx.lineTo(px + T*.54, py + T*.5); ctx.stroke(); } } // a cut end hanging
TILEX.b4_c4_camp = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const N = !!dark;
  if (ch === '#') { if (!b44InBattle()) return b2Odhan(ctx, 'W', x, y, T, N); b2Odhan(ctx, '.', x, y, T, N); return b44Burning(ctx, x, y, T, N, !(typeof B !== 'undefined' && B && B.id === 'b4_c4_wagons' && !B.def.isStage2)); } // the ring of wagons; in a fight, a wagon (burning in the raid)
  if (ch === 'F') { b2Odhan(ctx, '.', x, y, T, N); return b44Burning(ctx, x, y, T, N, false); }
  if (ch === 'f') return b2Odhan(ctx, 'F', x, y, T, N);
  if (ch === 'h' && b44InBattle()) { b2Odhan(ctx, '.', x, y, T, N); return b44Rope(ctx, x, y, T, N); }
  if (ch === 't') ch = '.';
  if (ch === ',') { b2Odhan(ctx, '.', x, y, T, N); return b44Grass(ctx, x, y, T, N, true); }
  b2Odhan(ctx, ch, x, y, T, N); });
/* the hills: grass on the Odhan's hardpan, barrows, the lantern, and fog over all of it at night */
const b44FogA = (wx, wy) => .15 + .08*Math.sin(wx*.9 + wy*.35)*Math.cos(wy*1.3 - wx*.27) + .05*Math.sin(wx*2.1 + wy*1.7); // fog thickness, continuous over the whole map
function b44Fog(ctx, x, y, T, k){ const px = x*T, py = y*T, n = 6; for (let j = 0; j < n; j++) { const wy = y + (j + .5)/n, a0 = b44FogA(x, wy)*k, a1 = b44FogA(x + 1, wy)*k, g = ctx.createLinearGradient(px, 0, px + T, 0);
    g.addColorStop(0, `rgba(178,186,196,${a0.toFixed(3)})`); g.addColorStop(1, `rgba(178,186,196,${a1.toFixed(3)})`); ctx.fillStyle = g; ctx.fillRect(px, py + j*T/n, T, T/n + .6); } }
function b44Mounded(ctx, x, y, T, N){ const px = x*T, py = y*T, L = (dx) => tileMap && tileMap[y] && tileMap[y][x + dx] === 'B';
  const x0 = px - (L(-1) ? T*.1 : -T*.04), x1 = px + T + (L(1) ? T*.1 : -T*.04), top = py + T*.22, base = py + T*.88;
  ell(ctx, (x0 + x1)/2 + T*.06, base, (x1 - x0)/2 + T*.04, T*.1, 'rgba(0,0,0,.4)');
  const g = ctx.createLinearGradient(0, top, 0, base); g.addColorStop(0, N ? '#525a62' : '#9a9a6a'); g.addColorStop(1, N ? '#22282c' : '#5a5a3a'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(x0, base); ctx.quadraticCurveTo(x0 + T*.06, top + T*.06, (x0 + x1)/2, top); ctx.quadraticCurveTo(x1 - T*.06, top + T*.06, x1, base); ctx.closePath(); ctx.fill();
  ctx.fillStyle = N ? 'rgba(170,180,200,.12)' : 'rgba(255,250,220,.25)'; ctx.beginPath(); ctx.ellipse((x0 + x1)/2 - T*.12, top + T*.12, T*.3, T*.06, -.1, 0, 7); ctx.fill(); // the light on its back
  for (let i = 0; i < 6; i++) { const gx = x0 + (x1 - x0)*hash(x, y, i + 180), gy = top + T*.1 + (base - top)*hash(y, x, i + 181)*.7; ctx.strokeStyle = N ? 'rgba(70,80,84,.6)' : 'rgba(80,90,50,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + 1, gy - T*.08); ctx.stroke(); } // its grass
  if (!L(-1)) { const sx = px + T*.18, sy = base - T*.1; poly(ctx, [[sx - T*.08, sy + T*.04], [sx - T*.05, sy - T*.22], [sx + T*.06, sy - T*.24], [sx + T*.08, sy + T*.04]], N ? '#4a4c52' : '#a8a294'); ctx.strokeStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(60,50,40,.45)'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(sx - T*.03, sy - T*.16); ctx.lineTo(sx + T*.03, sy - T*.14); ctx.moveTo(sx - T*.03, sy - T*.1); ctx.lineTo(sx + T*.02, sy - T*.08); ctx.stroke(); } } // a half-sunk stone with marks on it
function b44Lantern(ctx, x, y, T, N){ const px = x*T, py = y*T, cx = px + T*.5; glow(ctx, cx, py + T*.3, T*1.6, '#ffc060', N ? .36 : .18);
  B2F.line(ctx, '#3a2a18', Math.max(1, T*.04), [[cx - T*.04, py + T*.92], [cx, py + T*.06]]); ctx.fillStyle = '#c8c0b0'; ctx.fillRect(cx - T*.02, py, T*.04, T*.08); // a spear driven in
  ctx.fillStyle = '#2a1e12'; ctx.fillRect(cx + T*.04, py + T*.18, T*.16, T*.04); ctx.fillStyle = 'rgba(255,214,140,.9)'; ctx.fillRect(cx + T*.06, py + T*.22, T*.12, T*.18); ctx.strokeStyle = '#2a1e12'; ctx.lineWidth = 1; ctx.strokeRect(cx + T*.06, py + T*.22, T*.12, T*.18); ell(ctx, cx + T*.12, py + T*.31, T*.03, T*.05, '#fff4c8'); } // a horn lantern hung off it
TILEX.b4_c4_hills = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const N = !!dark;
  if (ch === 'B') { b2Odhan(ctx, '.', x, y, T, N); b44Grass(ctx, x, y, T, N); b44Mounded(ctx, x, y, T, N); }
  else if (ch === 'L') { b2Odhan(ctx, '.', x, y, T, N); b44Grass(ctx, x, y, T, N); b44Lantern(ctx, x, y, T, N); }
  else { if (ch === 't') ch = '.'; b2Odhan(ctx, ch, x, y, T, N); if (ch === '.') b44Grass(ctx, x, y, T, N); }
  if (N) b44Fog(ctx, x, y, T, 1);
  if (N && tileMap) { let near = 9; for (let yy = 0; yy < tileMap.length; yy++) { const xx = tileMap[yy].indexOf('L'); if (xx >= 0) near = Math.min(near, Math.hypot(xx - x, yy - y)); } if (near < 3.4) { ctx.fillStyle = `rgba(255,190,100,${(.14*(1 - near/3.4)).toFixed(3)})`; ctx.fillRect(x*T, y*T, T, T); } } }); // the lantern's light in the fog
/* a low mound or a scatter of grey stones, for cover on the hills in a fight */
function b44Mound(ctx, x, y, T, N){ const px = x*T, py = y*T; ell(ctx, px + T*.54, py + T*.84, T*.44, T*.1, 'rgba(0,0,0,.45)');
  { const g = ctx.createLinearGradient(0, py + T*.48, 0, py + T*.76); g.addColorStop(0, N ? '#56606a' : '#a8a874'); g.addColorStop(1, N ? '#262c32' : '#6a6a44'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(px + T*.5, py + T*.76, T*.46, T*.3, 0, Math.PI, 0); ctx.fill(); }
  [[.3, .6, .14], [.62, .58, .12], [.48, .48, .1]].forEach(([u, v, r]) => { ell(ctx, px + T*u, py + T*v, T*r, T*r*.7, N ? '#6a7078' : '#a8a294'); ell(ctx, px + T*(u - .03), py + T*(v - .03), T*r*.5, T*r*.3, N ? 'rgba(170,180,210,.14)' : 'rgba(255,250,235,.35)'); }); }
{ const _df = drawFeature; drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (style === 'b4_c4_camp' && ch === 't') return b2Clip(ctx, x, y, T, () => b44Crates(ctx, x, y, T, !!dark));
    if (style === 'b4_c4_hills' && ch === 't') return b2Clip(ctx, x, y, T, () => { b44Mound(ctx, x, y, T, !!dark); if (dark) b44Fog(ctx, x, y, T, .5); });
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* a wagon side on, small and far: a bed, a hooped canvas, two wheels; burning if asked */
function b44FarWagon(x, cx, by, s, col, can, fire, fl){ x.fillStyle = col; x.fillRect(cx - 7*s, by - 3.4*s, 14*s, 2.2*s); [-4.4, 4.4].forEach(d => { x.beginPath(); x.arc(cx + d*s, by - .8*s, 1.6*s, 0, 7); x.fill(); });
  if (!fire) { x.fillStyle = can; x.beginPath(); x.moveTo(cx - 7*s, by - 3.4*s); x.quadraticCurveTo(cx, by - 12*s, cx + 7*s, by - 3.4*s); x.fill(); return; }
  x.strokeStyle = col; x.lineWidth = Math.max(.6, .7*s); for (let i = 0; i < 4; i++) { const hx = cx + (-5.4 + i*3.6)*s; x.beginPath(); x.moveTo(hx, by - 3.4*s); x.quadraticCurveTo(hx + .4*s, by - 9.6*s, hx + 1.6*s, by - 10*s); x.stroke(); }
  x.globalCompositeOperation = 'lighter'; glow(x, cx, by - 6*s, 18*s, '#ff7a2a', .34*fl); x.globalCompositeOperation = 'source-over';
  poly(x, [[cx - 6.6*s, by - 3*s], [cx - 4*s, by - 12*s*fl], [cx - 1.6*s, by - 7*s], [cx + .6*s, by - 15*s*fl], [cx + 3*s, by - 8*s], [cx + 5*s, by - 12.6*s*fl], [cx + 6.6*s, by - 3*s]], 'rgba(255,150,60,.92)');
  poly(x, [[cx - 4*s, by - 3*s], [cx - 1*s, by - 8*s*fl], [cx + 1.6*s, by - 5*s], [cx + 4*s, by - 3*s]], 'rgba(255,230,150,.95)'); }
/* the column in the hottest sun of the year: a white sky, the sun straight up, the flat pale to the edge of sight and swimming with heat;
   the wagons in a crawling line across the middle ground in their own dust; and beside one of them, far off, a small boy walking */
SCENEX.b4_c4_sun = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46, ry = H*.66;
  ctx.drawImage(sceneLayer('b44:sun', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#c8ccc8'],[.5,'#ece6d4'],[1,'#f6ecd4']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.5, H*.02, W*.6, '#ffffff', .7); glow(x, W*.5, H*.02, 16, '#ffffff', .95); // white, and the sun straight overhead
    x.fillStyle = 'rgba(200,184,150,.5)'; for (let i = 0; i < 5; i++) { const hx = hash(i, 1301)*W; x.beginPath(); x.ellipse(hx, hz + 1, W*(.1 + hash(i, 1302)*.12), H*(.008 + hash(i, 1303)*.012), 0, Math.PI, 0); x.fill(); } // the faintest of rises, far
    x.fillStyle = vgrad(x, hz, H, [[0,'#e0cca0'],[.4,'#ccb084'],[1,'#94785a']]); x.fillRect(0, hz, W, H - hz); // the flat
    for (let i = 0; i < 60; i++) { const yy = hz + 2 + Math.pow(hash(i, 1304), 1.6)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(130,104,70,${(.08 + d*.16).toFixed(2)})`; x.fillRect(hash(i, 1305)*W, yy, 3 + d*16, .6 + d); } // the hardpan's cracks and ripples
    for (let i = 0; i < 18; i++) { const yy = hz + 4 + Math.pow(hash(i, 1306), 1.2)*(H - hz)*.9, d = (yy - hz)/(H - hz), bx = hash(i, 1307)*W; ell(x, bx, yy, 1.4 + d*5, .8 + d*2, `rgba(${110 + Math.round(d*20)},${104 + Math.round(d*14)},70,.6)`); } // scrub, dead
    x.strokeStyle = 'rgba(236,222,186,.5)'; x.lineWidth = H*.04; x.beginPath(); x.moveTo(-10, ry + H*.02); x.lineTo(W + 10, ry - H*.06); x.stroke(); // the column's road, beaten pale
    for (let i = 0; i < 7; i++) { const u = (i + .5)/7, cx = lerp(-W*.02, W*1.02, u), by = lerp(ry + H*.03, ry - H*.05, u), s = 1.7 + (1 - u)*.8; b44FarWagon(x, cx, by, s, 'rgba(70,54,36,.92)', 'rgba(226,212,180,.96)'); x.fillStyle = 'rgba(70,54,36,.85)'; x.fillRect(cx + 7*s, by - 3*s, 4*s, .7*s); ell(x, cx + 13*s, by - 3*s, 2.6*s, 1.5*s, 'rgba(90,72,52,.9)'); x.fillRect(cx + 11*s, by - 2*s, .7*s, 2*s); x.fillRect(cx + 14.4*s, by - 2*s, .7*s, 2*s); } // the wagons, in a crawling line, an ox to each // the wagons, in a crawling line
    for (let i = 0; i < 16; i++) { const u = hash(i, 1308), cx = lerp(-W*.02, W*1.02, u), by = lerp(ry + H*.05, ry - H*.03, u) + H*.012; x.fillStyle = 'rgba(60,48,34,.8)'; x.fillRect(cx - 1, by - 5, 2, 5); ell(x, cx, by - 5.6, 1.1, 1.1, 'rgba(60,48,34,.8)'); } // carters and foot, walking beside them
  }), 0, 0, W, H);
  // the column's dust, drifting along the line; heat swimming on the flat
  for (let i = 0; i < 8; i++) { const k = ((t*mo/30000 + i/8) % 1); glow(ctx, lerp(-W*.2, W*1.2, k), lerp(ry, ry - H*.07, k) - H*.03, W*.16, '#eee0bc', .2*Math.sin(k*Math.PI) + (mo ? 0 : .06)); }
  if (mo) for (let i = 0; i < 3; i++) { ctx.globalAlpha = .05 + .04*Math.sin(t/(600 + i*170) + i); ctx.fillStyle = '#fffaf0'; ctx.fillRect(0, hz + H*(.01 + i*.05), W, 3); ctx.globalAlpha = 1; }
  // the boy: beside the fourth wagon's wheel, small, walking at its pace; a woman leaning out from the wagon with her arms held out
  { const u = 3.5/7, cx = lerp(-W*.02, W*1.02, u), by = lerp(ry + H*.03, ry - H*.05, u), s = 1.7 + (1 - u)*.8, step = mo ? Math.sin(t/700)*.6 : 0; ell(ctx, cx - 5*s, by - 11*s, 1.2*s, 1.2*s, 'rgba(110,80,56,.95)'); B2F.line(ctx, 'rgba(110,80,56,.95)', .8*s, [[cx - 4.4*s, by - 10.4*s], [cx - 1.6*s, by - 9.4*s]]); // a woman leaning out, her arm held out
    drawFigure(ctx, 'b4_c4_grub', cx + 2*s + step, by + 3.4*s, .5*s, t, {phase:1, dir:1, still:!mo}); }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.08 + i*Math.min(28, W*.4/sq.length), H*.97 - (i % 2)*2, 2, t, {phase:i, dir:1}));
  vign(ctx, W, H, .3, .5); };

/* the raid: night, the ring of wagons in silhouette across the flat with a dozen burning; riders going through the firelight as shapes;
   lamps turning over in the dark on their cords; smoke going up into the stars; the squad near, black against it */
SCENEX.b4_c4_fire = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, fl = b2Fl(t), ry = H*.62;
  const WG = Array.from({length:16}, (_, i) => { const u = (i + .3 + hash(i, 1401)*.4)/16; return {cx:u*W, by:ry - Math.sin(u*Math.PI)*H*.04 + hash(i, 1402)*H*.01, s:1.1 + hash(i, 1403)*.3, fire:hash(i, 1404) > .45}; });
  ctx.drawImage(sceneLayer('b44:fire', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#04050a'],[.7,'#0c0e18'],[1,'#1a1414']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 90; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 1405)*.5).toFixed(2)})`; x.fillRect(hash(i, 1406)*W, Math.pow(hash(i, 1407), 1.4)*hz*.9, 1, 1); }
    x.fillStyle = vgrad(x, hz, H, [[0,'#16120e'],[.5,'#0e0a08'],[1,'#060404']]); x.fillRect(0, hz, W, H - hz); // the flat, black
    for (let i = 0; i < 30; i++) { const yy = hz + 2 + Math.pow(hash(i, 1408), 1.4)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(80,50,30,${(.1 + d*.15).toFixed(2)})`; x.fillRect(hash(i, 1409)*W, yy, 3 + d*12, .6 + d); }
  }), 0, 0, W, H);
  // the glow of the burning ring on the smoke and the ground
  ctx.globalCompositeOperation = 'lighter'; WG.forEach(w => { if (w.fire) glow(ctx, w.cx, w.by - H*.04, H*.24, '#ff6a20', .16*fl); }); glow(ctx, W*.5, ry, W*.7, '#ff7a2a', .1*fl); ctx.globalCompositeOperation = 'source-over';
  // smoke, rising off the burning wagons and leaning with the wind
  WG.forEach((w, i) => { if (!w.fire) return; for (let k = 0; k < 6; k++) { const q = ((t*mo/7000 + k/6 + hash(i, 1410)) % 1), sy = w.by - H*.08 - q*H*.42, sx = w.cx + q*W*.08 + Math.sin(q*5 + i)*6; ell(ctx, sx, sy, (8 + q*30)*w.s, (5 + q*14)*w.s, `rgba(40,30,28,${(.4*(1 - q)).toFixed(3)})`); } });
  // the ring of wagons: black, some burning
  WG.forEach(w => b44FarWagon(ctx, w.cx, w.by, w.s, '#0a0706', '#2a2420', w.fire, fl*(.9 + hash(Math.round(w.cx), 1411)*.2)));
  // riders: shapes at a gallop along the outside of the ring, in front of the firelight, lamps swinging round their heads
  for (let i = 0; i < 7; i++) { const k = mo ? ((t/(5200 + i*500) + hash(i, 1412)) % 1) : hash(i, 1412), cx = lerp(W*1.1, -W*.1, k), cy = ry + H*(.06 + hash(i, 1413)*.06), s = .9 + hash(i, 1414)*.3, gait = Math.floor(t*mo/140 + i) % 2;
    b2Rider(ctx, cx, cy, s, '#080605', -1, gait, false);
    const a = mo ? t/150 + i : i, lx = cx + Math.cos(a)*7*s, ly = cy - 22*s + Math.sin(a)*4*s; ctx.strokeStyle = 'rgba(30,20,14,.9)'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(cx, cy - 16*s); ctx.lineTo(lx, ly); ctx.stroke();
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, 6*s, '#ffa040', .6); ctx.globalCompositeOperation = 'source-over'; ell(ctx, lx, ly, 1.3*s, 1.3*s, '#ffe0a0'); }
  // lamps in the air, turning over on their cords, arcing into the ring
  for (let i = 0; i < 5; i++) { const k = mo ? ((t/(2600 + i*400) + hash(i, 1415)) % 1) : .3 + i*.12, x0 = W*(.1 + hash(i, 1416)*.8), x1 = x0 + W*(hash(i, 1417) - .5)*.3, px = lerp(x0, x1, k), py = lerp(ry + H*.1, ry - H*.02, k) - Math.sin(k*Math.PI)*H*.22, a = k*12 + i;
    ctx.strokeStyle = 'rgba(40,26,16,.8)'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(px - Math.cos(a)*4, py - Math.sin(a)*4); ctx.lineTo(px + Math.cos(a)*4, py + Math.sin(a)*4); ctx.stroke();
    ctx.globalCompositeOperation = 'lighter'; [-1, 1].forEach(sg => glow(ctx, px + sg*Math.cos(a)*4, py + sg*Math.sin(a)*4, 5, '#ff9a3a', .65)); ctx.globalCompositeOperation = 'source-over'; }
  if (mo) for (let i = 0; i < 26; i++) { const k = ((t/1800 + i/26) % 1), w = WG[i % WG.length]; if (!w.fire) continue; ctx.fillStyle = `rgba(255,190,110,${(.85*(1 - k)).toFixed(2)})`; ctx.fillRect(w.cx + Math.sin(i*3 + t/400)*8, w.by - H*.06 - k*H*.3, 1.2, 1.2); } // sparks
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.1 + i*Math.min(30, W*.44/sq.length), H*.97 - (i % 2)*3, 2, t, {phase:i, dir:1}));
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, H*.86, W, H*.14); // the squad stands in the dark, between you and the fire
  vign(ctx, W, H, .6, .5); };

/* the wounded Seti's fire: night inside the 9th's wagons; awnings of canvas off the burnt wagons propped on lances, rows of shapes under
   blankets beneath them; a low fire in the middle with a helm upturned on the coals and a stained cloth beside it; the burnt wagons at the
   edge, still smoking; the Seti horses on a rope beyond, heads down; the squad round the fire */
SCENEX.b4_seti_fire = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4, fl = b2Fl(t), cx = W*.5, cy = H*.88;
  ctx.drawImage(sceneLayer('b44:setifire', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#04060c'],[.7,'#0c1020'],[1,'#161828']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 80; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 1501)*.5).toFixed(2)})`; x.fillRect(hash(i, 1502)*W, Math.pow(hash(i, 1503), 1.4)*hz, 1, 1); }
    x.fillStyle = vgrad(x, hz, H, [[0,'#14120e'],[.6,'#0e0c0a'],[1,'#080606']]); x.fillRect(0, hz, W, H - hz);
    // the burnt wagons at the edge, black frames, a thread of smoke off each
    for (let i = 0; i < 6; i++) { const wx = W*(.04 + i*.19 + hash(i, 1504)*.04), wy = hz + H*.04; b44FarWagon(x, wx, wy, .9, '#08060a', '#1a1614', true, .25); }
    // the horses on their rope, beyond, heads down
    for (let i = 0; i < 26; i++) { const px = W*(.52 + hash(i, 1505)*.46), py = hz + H*.07 + hash(i, 1506)*H*.02; b2Horse(x, px, py, .5 + hash(i, 1507)*.12, '#0a0908', hash(i, 1508) > .5 ? 1 : -1, true); }
    x.strokeStyle = '#1a1410'; x.lineWidth = 1; x.beginPath(); x.moveTo(W*.5, hz + H*.072); x.lineTo(W, hz + H*.08); x.stroke();
    // the awnings: canvas sheets on lances in two rows, and under them the wounded, shapes under blankets, side by side
    const AW = [[.06, .5, .34, .6], [.6, .5, .34, .6], [.0, .64, .38, 1], [.62, .64, .38, 1]];
    AW.forEach(([u, v, w, s], j) => { const ax = W*u, ay = H*v, aw = W*w, ah = H*.12*s, lit = j >= 2;
      // the wounded under it first: humps under blankets, a pale head-end on each, side by side, not all the same length
      for (let k = 0; k < 7; k++) { const bx = ax + aw*(.06 + k*.135), by = ay + ah*1.02, bl = aw*(.05 + hash(j, k, 1520)*.02); x.fillStyle = lit ? (k % 2 ? '#5a4a3c' : '#66544a') : (k % 2 ? '#3a322c' : '#443a32'); x.beginPath(); x.ellipse(bx, by, bl, ah*.17, 0, Math.PI, 0); x.fill(); x.fillRect(bx - bl, by - .5, bl*2, ah*.08);
        ell(x, bx - bl*.8, by - ah*.06, aw*.017, ah*.08, lit ? '#a88a6c' : '#6a5a4a'); }
      x.strokeStyle = '#1e1610'; x.lineWidth = 1.4*s; [[0, 1], [.5, 1.14], [1, 1]].forEach(([k, f]) => { x.beginPath(); x.moveTo(ax + aw*k, ay + ah*1.1); x.lineTo(ax + aw*k, ay - ah*.5*f); x.stroke(); }); // lances for poles
      const g = x.createLinearGradient(0, ay - ah*.6, 0, ay + ah*.2); g.addColorStop(0, lit ? '#8a7a62' : '#5e5444'); g.addColorStop(1, lit ? '#4e4436' : '#363028'); x.fillStyle = g;
      x.beginPath(); x.moveTo(ax - 5*s, ay + ah*.18); x.lineTo(ax + aw*.5, ay - ah*.62); x.lineTo(ax + aw + 5*s, ay + ah*.18); x.lineTo(ax + aw + 3*s, ay + ah*.3); x.lineTo(ax - 3*s, ay + ah*.3); x.closePath(); x.fill(); // canvas off a burnt wagon, pitched on the lances
      x.fillStyle = 'rgba(20,12,8,.55)'; x.beginPath(); x.moveTo(ax + aw*.7, ay - ah*.2); x.lineTo(ax + aw + 5*s, ay + ah*.18); x.lineTo(ax + aw + 3*s, ay + ah*.3); x.lineTo(ax + aw*.78, ay + ah*.1); x.fill(); // its scorched edge
      x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(ax - 3*s, ay + ah*.3, aw + 6*s, ah*.22); }); // the shade under it
  }), 0, 0, W, H);
  // the fire's light over the near rows
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy - H*.04, H*.5, '#ff7a30', .3*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 4; i++) { const k = ((t*mo/9000 + i/4) % 1); ell(ctx, W*(.08 + i*.26) + k*W*.04, H*(.44 - k*.12), 6 + k*16, 3 + k*6, `rgba(50,40,36,${(.3*(1 - k)).toFixed(3)})`); } // smoke off the burnt wagons
  // the fire: a ring of stones, wagon-wood, a helm upturned on the coals with water in it, a stained cloth beside
  for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*16, cy + Math.sin(a)*4.6, 3, 2, '#2e2a26'); }
  ctx.fillStyle = '#4a2a18'; ctx.fillRect(cx - 10, cy - 2, 20, 2.4);
  poly(ctx, [[cx - 9, cy], [cx - 4, cy - 10*fl], [cx - 1, cy - 5], [cx + 2, cy - 12*fl], [cx + 5, cy - 4], [cx + 8, cy]], 'rgba(255,140,60,.92)'); poly(ctx, [[cx - 4, cy], [cx - 1, cy - 6*fl], [cx + 3, cy]], 'rgba(255,224,150,.95)');
  ctx.fillStyle = '#5a5650'; ctx.beginPath(); ctx.ellipse(cx + 9, cy - 3, 5.4, 3, 0, 0, Math.PI); ctx.fill(); ell(ctx, cx + 9, cy - 3, 5.4, 1.4, '#7a7670'); ell(ctx, cx + 9, cy - 3, 4.2, .9, 'rgba(140,170,190,.6)'); // the helm, upturned, water steaming in it
  if (mo) for (let i = 0; i < 3; i++) { const k = ((t/2200 + i/3) % 1); ell(ctx, cx + 9 + Math.sin(k*6 + i)*2, cy - 6 - k*16, 1.6 + k*3, 1 + k*2, `rgba(220,220,220,${(.25*(1 - k)).toFixed(3)})`); } // steam
  poly(ctx, [[cx - 30, cy + 2], [cx - 14, cy + 1], [cx - 12, cy + 7], [cx - 32, cy + 8]], '#4a4038'); ell(ctx, cx - 22, cy + 4.6, 4, 1.6, 'rgba(90,26,20,.6)'); ctx.fillStyle = '#c8c4ba'; ctx.fillRect(cx - 28, cy + 3, 6, .8); // the cloth, a knife on it
  if (mo) for (let i = 0; i < 5; i++) { const k = ((t/1500 + i/5) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*4, cy - 10 - k*28, 1, 1); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(40 + j*22), H*.97 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .72, .55); };

/* the barrow hills in fog, before dawn: long low mounds on the crests going grey and then gone, fog in layers drifting across them; one
   horn lantern on a spear with its light in the fog; away to the left, very far, a flash in the white now and then: the marines' end */
function b44Hills(x, W, H, hz, N){ // the barrows' crests, in three bands, each paler than the one before (night or dawn)
  [[hz, .05, '#1a1e24', '#8a9078'], [hz + H*.12, .08, '#14181c', '#6a7258'], [hz + H*.26, .1, '#0e1114', '#4a5240']].forEach(([b, a, cn, cd], j) => { x.fillStyle = N ? cn : cd; x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W + 6; px += 6) x.lineTo(px, b - H*a*(.5 + .4*Math.sin(px/W*(3 + j) + j*2) + .1*Math.sin(px/W*13 + j))); x.lineTo(W, H); x.fill();
    for (let i = 0; i < 4 + j; i++) { const bx = W*(.08 + hash(i, 1601 + j)*.84), bw = W*(.06 + j*.03), base = b - H*a*(.5 + .4*Math.sin(bx/W*(3 + j) + j*2) + .1*Math.sin(bx/W*13 + j)); x.beginPath(); x.ellipse(bx, base + 1, bw, H*(.012 + j*.008), 0, Math.PI, 0); x.fill(); } }); } // and the mounds on them
SCENEX.b4_c4_fog = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.44, lx = W*.66, ly = H*.66;
  ctx.drawImage(sceneLayer('b44:fog', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#06080c'],[.7,'#10141a'],[1,'#1e2228']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(220,226,250,${(.06 + hash(i, 1611)*.2).toFixed(2)})`; x.fillRect(hash(i, 1612)*W, Math.pow(hash(i, 1613), 1.4)*hz*.7, 1, 1); } // a few stars through it
    b44Hills(x, W, H, hz, true);
    x.fillStyle = vgrad(x, H*.78, H, [[0,'#0c0e10'],[1,'#060708']]); x.beginPath(); x.moveTo(0, H*.84); for (let px = 0; px <= W + 6; px += 6) x.lineTo(px, H*.82 + Math.sin(px/W*4)*H*.012); x.lineTo(W, H); x.lineTo(0, H); x.fill(); // the crest the picket is on
  }), 0, 0, W, H);
  // the far end of the line, very far left: a flash in the fog now and then, muffled
  if (mo) { const k = (t % 5200)/5200; if (k < .08) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.06, hz + H*.1, W*.2, '#ffd890', .35*(1 - k/.08)); ctx.globalCompositeOperation = 'source-over'; } }
  else { ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.06, hz + H*.1, W*.16, '#ffd890', .12); ctx.globalCompositeOperation = 'source-over'; }
  // the fog, in layers, drifting across the hills
  for (let i = 0; i < 14; i++) { const k = ((t*mo/(40000 + i*3000) + hash(i, 1621)) % 1), fx = lerp(-W*.3, W*1.3, k), fy = hz + H*(.04 + hash(i, 1622)*.46), r = W*(.22 + hash(i, 1623)*.2); b2Soft(ctx, fx, fy, r, .28, '170,178,188', .22 + hash(i, 1624)*.1); }
  // the lantern on its spear, and its light in the fog
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly - H*.06, H*.3, '#ffb860', .3); glow(ctx, lx, ly - H*.06, H*.08, '#ffe0a0', .5); ctx.globalCompositeOperation = 'source-over';
  B2F.line(ctx, '#0a0806', 1.6, [[lx - 1, ly + H*.12], [lx + 1, ly - H*.14]]); ctx.fillStyle = 'rgba(255,214,140,.95)'; ctx.fillRect(lx + 2, ly - H*.07, 5, 7); ctx.strokeStyle = '#1a1208'; ctx.lineWidth = 1; ctx.strokeRect(lx + 2, ly - H*.07, 5, 7);
  for (let i = 0; i < 2; i++) drawFigure(ctx, 'b2soldier', lx + 16 + i*14, ly + H*.13, 1.3, t, {phase:i + 4, dir:-1, alpha:.8}); // the picket's regulars
  b2Soft(ctx, W*.5, H*.86, W*.7, .16, '160,168,178', .3); // fog round the squad's knees
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.08 + i*Math.min(26, W*.4/sq.length), H*.97 - (i % 2)*2, 1.9, t, {phase:i, dir:1}));
  b2Soft(ctx, W*.3, H*.98, W*.5, .12, '160,168,178', .22);
  vign(ctx, W, H, .68, .55); };

/* the morning after: the barrows on the hills in the thinning fog, grey-green in the first sun, and on their slopes the empty helms, small
   and dark, scattered; marines coming down off the crests in their squads, far off; the column forming up below */
SCENEX.b4_c4_morning = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4;
  ctx.drawImage(sceneLayer('b44:morning', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#8a9cb0'],[.6,'#d8d4c4'],[1,'#ece2c8']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.82, hz*.8, W*.4, '#fff2d0', .55); // a low sun, right
    b44Hills(x, W, H, hz, false);
    // the helms on the barrows' slopes: small dark domes, some upside down, a glint on each
    for (let i = 0; i < 26; i++) { const px = W*(.04 + hash(i, 1631)*.92), py = hz + H*(.04 + hash(i, 1632)*.28), s = .6 + (py - hz)/(H*.3)*.8;
      x.fillStyle = '#3a3832'; x.beginPath(); if (hash(i, 1633) > .5) x.arc(px, py, 2.4*s, Math.PI, 0); else x.arc(px, py - 1.2*s, 2.4*s, 0, Math.PI); x.fill(); x.fillStyle = 'rgba(255,240,210,.55)'; x.fillRect(px - 1.4*s, py - 2*s, 1.2*s, .6*s); }
    x.fillStyle = vgrad(x, H*.74, H, [[0,'#8a8460'],[1,'#4a4430']]); x.beginPath(); x.moveTo(0, H*.78); for (let px = 0; px <= W + 6; px += 6) x.lineTo(px, H*.76 + Math.sin(px/W*5)*H*.014); x.lineTo(W, H); x.lineTo(0, H); x.fill(); // the near slope
    // the column forming up below, small, on the flat beyond the near slope's foot
    for (let i = 0; i < 90; i++) { const px = W*(.02 + hash(i, 1634)*.96), py = H*(.72 + hash(i, 1635)*.02), s = .5 + hash(i, 1636)*.2; x.fillStyle = 'rgba(40,32,24,.8)'; x.fillRect(px - s, py - 4*s, 2*s, 4*s); }
  }), 0, 0, W, H);
  // the fog going off the hills in rags; marines coming down a crest, far
  for (let i = 0; i < 9; i++) { const k = ((t*mo/50000 + hash(i, 1641)) % 1), fx = lerp(-W*.2, W*1.2, k), fy = hz + H*(.06 + hash(i, 1642)*.22); b2Soft(ctx, fx, fy, W*(.16 + hash(i, 1643)*.14), .26, '236,236,228', .2*(1 - (mo ? k*.5 : .25))); }
  for (let i = 0; i < 8; i++) { const k = mo ? ((t/60000 + i*.04) % 1) : .3, px = W*(.2 + i*.02 + k*.05), py = hz + H*(.1 + k*.14) + (i % 2); ctx.fillStyle = 'rgba(40,34,26,.85)'; ctx.fillRect(px - .7, py - 3.4, 1.4, 3.4); ell(ctx, px, py - 3.9, .8, .8, 'rgba(40,34,26,.85)'); } // marines coming down
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.1 + i*Math.min(28, W*.42/sq.length), H*.97 - (i % 2)*2, 2, t, {phase:i, dir:1}));
  vign(ctx, W, H, .36, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Four's sand-and-iron ground (the same frame as 71b–73b) ---------------- */
function b44Item(key, label, body){ const w = 240, h = 130, id = 'c44-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#5a4a34"></stop><stop offset=".7" stop-color="#2a2218"></stop><stop offset="1" stop-color="#121214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* an unbroken oil bola: two clay lamps on a plaited horsehair cord, the wicks black, the wax seals whole; a faint sheen of oil */
b44Item('b4_c4_lampball', 'An unbroken oil bola', '<ellipse cx="120" cy="72" rx="86" ry="34" fill="#e8b070" opacity=".07"/>'
  + '<path d="M70 70 Q96 34 120 46 Q146 58 168 74" stroke="#2a1e12" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M70 70 Q96 34 120 46 Q146 58 168 74" stroke="#7a6446" stroke-width="3" fill="none" stroke-dasharray="2.4 2.2" stroke-linecap="round"/>'
  + '<g transform="translate(62 78)"><ellipse cx="0" cy="8" rx="24" ry="7" fill="#000" opacity=".35"/><path d="M-20 0 Q-22 -16 0 -18 Q22 -16 20 0 Q18 12 0 13 Q-18 12 -20 0 Z" fill="#a8784a"/><path d="M-16 -4 Q-14 -14 -2 -15" stroke="#e0b888" stroke-width="2" fill="none" opacity=".7"/><path d="M-20 2 Q0 8 20 2" stroke="#6a4424" stroke-width="1.4" fill="none"/>'
  + '<ellipse cx="0" cy="-17" rx="7" ry="3" fill="#d8c48a"/><ellipse cx="0" cy="-17.6" rx="4.6" ry="1.6" fill="#f0e0a8"/><path d="M0 -18 Q3 -24 1 -28" stroke="#1a1410" stroke-width="2" fill="none"/></g>'
  + '<g transform="translate(176 80) rotate(14)"><ellipse cx="0" cy="8" rx="22" ry="6.4" fill="#000" opacity=".35"/><path d="M-18 0 Q-20 -15 0 -17 Q20 -15 18 0 Q16 11 0 12 Q-16 11 -18 0 Z" fill="#9a6c42"/><path d="M-14 -4 Q-12 -13 -2 -14" stroke="#d8b080" stroke-width="2" fill="none" opacity=".7"/><path d="M-6 -2 L4 4 M2 -6 L-2 6" stroke="#5a3a1e" stroke-width=".9" opacity=".6"/>'
  + '<ellipse cx="0" cy="-16" rx="6.4" ry="2.8" fill="#d8c48a"/><path d="M0 -17 Q-3 -22 -1 -26" stroke="#1a1410" stroke-width="2" fill="none"/></g>'
  + '<path d="M40 104 Q60 100 82 104" stroke="#c8a060" stroke-width="1" fill="none" opacity=".25"/>');
/* a Seti horn bow: short, recurved, horn and sinew, lacquered dark, the tips turned back; a Seti woman's marks burnt into the grip */
b44Item('b4_c4_setibow', 'A Seti horn bow', '<ellipse cx="120" cy="66" rx="90" ry="34" fill="#d8b080" opacity=".06"/>'
  + '<path d="M30 52 Q40 40 52 46 Q86 70 120 70 Q154 70 188 46 Q200 40 210 52" stroke="#120c08" stroke-width="9" fill="none" stroke-linecap="round"/>'
  + '<path d="M30 52 Q40 40 52 46 Q86 70 120 70 Q154 70 188 46 Q200 40 210 52" stroke="#3a2416" stroke-width="6" fill="none" stroke-linecap="round"/>'
  + '<path d="M56 50 Q88 70 120 68 Q152 70 184 50" stroke="#8a6a3e" stroke-width="1.6" fill="none" opacity=".75"/><path d="M64 56 Q92 66 112 66" stroke="#e8c890" stroke-width="1" fill="none" opacity=".45"/>'
  + '<path d="M31 52 L209 52" stroke="#d8d0bc" stroke-width="1.1" opacity=".85"/>'
  + '<rect x="108" y="62" width="24" height="13" rx="3" fill="#5a3a20"/><path d="M112 65 l4 7 l4 -7 M124 65 l4 7" stroke="#1a0e08" stroke-width="1.2" fill="none"/><path d="M108 63 l24 0" stroke="#a87a4a" stroke-width=".8" opacity=".7"/>'
  + '<path d="M40 44 Q36 40 30 42 M200 44 Q204 40 210 42" stroke="#c8b088" stroke-width="1.4" fill="none"/>');
/* an empty helm from the barrows: a plain Malazan helm, dented over one ear, a cheek-guard bent, nobody in it; the dew on it */
b44Item('b4_c4_helm', 'An empty helm from the barrows', '<ellipse cx="120" cy="96" rx="62" ry="12" fill="#000" opacity=".35"/><ellipse cx="120" cy="66" rx="70" ry="36" fill="#c0c8d0" opacity=".05"/>'
  + '<path d="M72 88 Q70 40 120 32 Q170 40 168 88 Z" fill="#5e5a52"/><path d="M80 82 Q78 44 120 38 Q138 40 150 48" stroke="#9a968c" stroke-width="3" fill="none" opacity=".6"/>'
  + '<path d="M72 88 Q120 94 168 88 L168 92 Q120 98 72 92 Z" fill="#3a3832"/><path d="M118 34 Q120 60 120 92" stroke="#2e2c28" stroke-width="3" fill="none"/>'
  + '<path d="M146 50 Q156 56 154 66 Q148 62 142 60 Z" fill="#3a3832"/><path d="M146 52 l6 6" stroke="#8a867c" stroke-width="1" opacity=".6"/>'
  + '<path d="M74 86 L66 104 L82 100 Z" fill="#4a4740"/><path d="M166 86 L178 100 L166 106 Z" fill="#4a4740"/>'
  + '<ellipse cx="96" cy="52" rx="10" ry="5" fill="#fff" opacity=".16"/><circle cx="92" cy="70" r="1.6" fill="#d8e8f0" opacity=".7"/><circle cx="104" cy="78" r="1.2" fill="#d8e8f0" opacity=".6"/><circle cx="138" cy="74" r="1.4" fill="#d8e8f0" opacity=".55"/>');
/* a pot of Seti horse-salve: a small clay pot, plugged with a twist of rag, a cord round the neck, grey grease at the lip */
b44Item('b4_c4_salve', 'A pot of Seti horse-salve', '<ellipse cx="120" cy="100" rx="40" ry="9" fill="#000" opacity=".35"/><ellipse cx="120" cy="68" rx="60" ry="36" fill="#c8d0a0" opacity=".06"/>'
  + '<path d="M96 54 Q90 70 94 88 Q100 102 120 102 Q140 102 146 88 Q150 70 144 54 Z" fill="#8a5a36"/><path d="M100 60 Q96 76 102 92" stroke="#c8925e" stroke-width="3" fill="none" opacity=".55"/><path d="M96 80 Q120 86 146 80" stroke="#5a3a1e" stroke-width="1.2" fill="none" opacity=".7"/>'
  + '<ellipse cx="120" cy="54" rx="24" ry="6" fill="#6a4226"/><ellipse cx="120" cy="53" rx="18" ry="4" fill="#8a8a78"/><path d="M104 52 Q112 48 118 52" stroke="#b8b8a4" stroke-width="1.4" fill="none" opacity=".7"/>'
  + '<path d="M110 50 Q106 36 116 30 Q126 26 130 36 Q134 46 128 50 Z" fill="#c8bca0"/><path d="M114 34 Q120 30 126 36" stroke="#8a7e64" stroke-width="1" fill="none"/><path d="M128 32 Q140 26 146 32" stroke="#c8bca0" stroke-width="3" fill="none" stroke-linecap="round"/>'
  + '<path d="M96 58 Q120 64 144 58" stroke="#2a1a0e" stroke-width="1.6" fill="none"/><path d="M96 58 Q86 68 90 80" stroke="#2a1a0e" stroke-width="1.4" fill="none"/>');

/* the barrow hills keep 'B' for a barrow (the brief's ground), but a dark area's map animates every 'B' as a bonfire (30): not on these hills */
{ const _dfa = drawFireAt; drawFireAt = function(ctx, T, fx, fy, t, scale){ if (typeof view !== 'undefined' && view === 'explore' && S && S.area === 'b4_c4_hills' && scale === 1.3) return; return _dfa(ctx, T, fx, fy, t, scale); }; }
