/* ============ Book Five, Chapter 2 art: Trate — the harbour front after the wave, the first hulk, the strand and the Shake boats ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d/81b, lit from the left: the harbour's looters, the rival wreckers and their boss, the
   shape in a drowned man's coat (a shadow wearing it; no face, no feet: never a raised corpse), the old pilot, the harbour master, and the
   Shake fisherfolk on the strand. Four grounds (TILEX: the harbour front, the first hulk's slanted deck and flooded hold, the strand,
   and the wharf as a fight ground with the harbour along one side); battle cover ('t') drawn per ground. Four backdrops (SCENEX,
   sceneLayer for the still parts, REDUCE() holding the rest still): b5_trate_harbour (80's, redrawn), b5_c2_wrecks, b5_c2_hold,
   b5_c2_strand. And the chapter's gear on Book Five's ground: dark canal-slate with a thin dock-gold rim. Trate is Lether in sea-light:
   blue-grey, green water, wet stone, lamp-gold; the lighthouse and the Tarancede Tower always seen from outside, far off. The shapes in the
   rigging stay shapes. The dead stay under sailcloth, at a distance. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* a harbour looter: thin, quick, wet to the knee; a rag tied over the head, a sack over one shoulder, a gutting knife held low */
  b5_c2_looter(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, .96); const c = b2Pick(o, [['#4a4438', '#18160e'], ['#3a4440', '#121816'], ['#4a3a34', '#1a1210']]);
    h.legs('#2a2622'); ctx.fillStyle = 'rgba(40,70,70,.55)'; ctx.fillRect(-4.5, 9, 3.4, 4); ctx.fillRect(1.1, 9, 3.4, 4); // wet to the knee
    poly(ctx, [[-5.6,-6],[5.6,-6],[6,6],[-6,6]], h.armor(c[0], c[1])); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-2, -2, 1, 3); ctx.fillRect(2.4, 1, 1.4, 1); // a patched shirt
    poly(ctx, [[-9.6,-7],[-3,-8],[-2.4,1],[-8.6,3.4]], '#6a5e44'); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-9, -2, 6, .8); // a full sack on the shoulder
    ctx.fillStyle = '#a88a6c'; ctx.fillRect(5.6, -3.4, 2, 6); B2F.line(ctx, '#c4c0b6', 1, [[7, 3], [10.8, .6]]); // a gutting knife, low
    h.head('#b48e70', 4, -11.2); h.look('rgba(24,14,10,.85)', -11.6);
    ctx.fillStyle = b2Pick(o, ['#7a3a2a', '#3a4a5a', '#6a6a3a']); ctx.beginPath(); ctx.arc(0, -12.4, 4.6, Math.PI, 0); ctx.fill(); ctx.fillRect(-4.6, -12.8, 9.2, 1.2); poly(ctx, [[-4.4,-12],[-7,-9.4],[-5.6,-8.6],[-3.6,-11]], ctx.fillStyle); // a rag over the head, its tail
    ctx.restore(); },
  /* a wrecker: a docker in a leather apron and sea-boots, a boathook, a cloth cap */
  b5_c2_wrecker(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1); const c = b2Pick(o, ['#5a5040', '#4a4a44', '#5a4a3a']);
    ctx.fillStyle = '#1a1816'; ctx.fillRect(-4.8, 6, 3.8, 7); ctx.fillRect(1, 6, 3.8, 7); ctx.fillStyle = 'rgba(160,170,170,.2)'; ctx.fillRect(-4.8, 6, 1, 7); // sea-boots to the knee
    h.torso(c, '#1e1a14', 6.4); poly(ctx, [[-5.4,-3],[5.4,-3],[6,9],[-6,9]], h.armor('#5a3e26', '#1e140c')); ctx.fillStyle = 'rgba(255,240,200,.1)'; ctx.fillRect(-5, -2, 1.4, 10); // the apron
    ctx.fillStyle = '#a8866a'; ctx.fillRect(-8, -4, 2.2, 6.4); ctx.fillRect(5.8, -4, 2.2, 6); // bare forearms
    B2F.line(ctx, '#7a5a3a', 1.5, [[-7, 6], [9, -15]]); B2F.line(ctx, '#5a5a5e', 1.1, [[9, -15], [10.6, -17], [11.4, -15.2], [10.2, -14]]); // the boathook
    h.head('#b08868', 4.4, -11); h.look('rgba(20,10,6,.86)', -11.2); ctx.fillStyle = 'rgba(40,30,24,.5)'; ctx.fillRect(-3.4, -8.4, 7, 1.6); // stubble
    ctx.beginPath(); ctx.arc(0, -12.6, 4.8, Math.PI*1.02, Math.PI*1.98); ctx.fillStyle = '#3a3630'; ctx.fill(); ctx.fillRect(-1, -13, 6.6, 1.2); // a cloth cap
    ctx.restore(); },
  /* the wreckers' boss: big, broad, a docker's apron over a good shirt, a mallet over the shoulder, a sealed chit in the other fist */
  b5_c2_wreckboss(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.2, 1.12);
    ctx.fillStyle = '#1a1816'; ctx.fillRect(-4.8, 6, 3.8, 7); ctx.fillRect(1, 6, 3.8, 7);
    h.torso('#8a7a62', '#2a2218', 7.2); poly(ctx, [[-6,-2],[6,-2],[6.6,9],[-6.6,9]], h.armor('#4e3420', '#180e08')); ctx.fillStyle = '#c9a35a'; ctx.fillRect(-.6, 1, 1.2, 1.2); // apron, a brass ring
    ctx.fillStyle = '#a8866a'; ctx.fillRect(-9, -4.6, 2.6, 7); ell(ctx, -7.8, 3, 1.8, 1.6, '#a8866a'); ctx.fillStyle = '#e8e0cc'; ctx.fillRect(-11, 1.4, 4, 3); ell(ctx, -9, 3, .9, .9, '#8a2a20'); // the fist, the chit, its seal
    B2F.line(ctx, '#5a3e24', 1.8, [[6.4, -1], [10.6, -13]]); ctx.fillStyle = '#4a3420'; ctx.fillRect(7.6, -17.6, 6.4, 4.4); ctx.fillStyle = 'rgba(255,240,200,.12)'; ctx.fillRect(7.6, -17.6, 6.4, 1); // the mallet over the shoulder
    h.head('#b48a6a', 4.9, -11.2); h.look('rgba(20,10,6,.88)', -11.2); ctx.fillStyle = '#3a2618'; ctx.fillRect(-4, -8.6, 8.4, 2.6); ctx.fillRect(-4.6, -15.4, 9.2, 2); // a beard, a heavy brow
    ctx.restore(); },
  /* the shape in a drowned man's coat: a shadow wearing a sodden poacher's coat, buttoned to the neck; nothing in the collar but dark and
     two pale points; the hem trails off into nothing where feet would be */
  b5_c2_drowned(ctx, h, t, o){ const fl = o.still ? 0 : Math.sin(t/260 + (o.phase || 0));
    ctx.save(); ctx.globalAlpha *= .92;
    poly(ctx, [[-7,-12],[7,-12],[8.6,6 + fl],[5,11],[2,7 + fl],[-1.4,12],[-4.6,7],[-8.6,6 - fl]], 'rgba(14,12,20,.9)'); // the dark under it
    poly(ctx, [[-6.4,-7],[6.4,-7],[7.6,8 + fl*.6],[3.6,6.6],[0,8.8],[-3.6,6.6],[-7.6,8 - fl*.6]], h.armor('#3e4a46', '#121a18')); // the coat, sodden, hanging
    ctx.fillStyle = 'rgba(160,190,180,.18)'; ctx.fillRect(-6, -6, 1.4, 12); ctx.fillStyle = '#7a6a4a'; for (let i = 0; i < 4; i++) ell(ctx, .8, -5 + i*3, .6, .6, '#8a7a56'); // a wet sheen, horn buttons
    ctx.fillStyle = 'rgba(20,30,28,.85)'; ctx.fillRect(-9.4, -6, 3, 9); ctx.fillRect(6.4, -6, 3, 9); poly(ctx, [[-9.4,3],[-6.4,3],[-7,5.4],[-9,6]], 'rgba(14,12,20,.95)'); poly(ctx, [[6.4,3],[9.4,3],[9,6],[7,5.4]], 'rgba(14,12,20,.95)'); // sleeves, empty dark at the cuffs
    ctx.fillStyle = '#2e3a36'; ctx.fillRect(-4.6, -8.6, 9.2, 2.2); // the collar, turned up
    ell(ctx, 0, -12, 4.2, 4.6, 'rgba(10,8,16,.96)'); ctx.fillStyle = 'rgba(210,225,255,.8)'; ctx.fillRect(-2, -12.6, 1.2, 1); ctx.fillRect(1, -12.6, 1.2, 1); // no face: dark, and two pale points
    ctx.fillStyle = 'rgba(150,190,180,.35)'; if (!o.still) { const k = (t/700 + (o.phase || 0)) % 1; ctx.fillRect(4.6, 7 + k*5, .7, 1.2); ctx.fillRect(-5.4, 6 + ((k + .5) % 1)*5, .7, 1.2); } // water still running off it
    ctx.restore(); },
  /* an old harbour pilot: stooped, an oiled and patched pilot's coat to the knee, a knitted cap, a squint, a short pipe, a stick */
  b5_c2_pilot(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, .94);
    B2F.line(ctx, '#5a4430', 1.3, [[8.4, 12.6], [7.8, -4]]); // the stick
    h.legs('#2a2a2c'); poly(ctx, [[-5.8,-6],[5.8,-6],[7,10],[-7,10]], h.armor('#4a5a5a', '#141c1c')); ctx.fillStyle = 'rgba(220,240,230,.14)'; ctx.fillRect(-5.4, -5, 1.4, 14); ctx.fillStyle = '#5a6a5a'; ctx.fillRect(1, 2, 3, 2.4); ctx.fillRect(-4, 5, 2.4, 2); // the oiled coat, patches
    ctx.fillStyle = '#2a1e14'; ctx.fillRect(-6, 2.4, 12, 1.2);
    ctx.fillStyle = '#a07e62'; ctx.fillRect(6, -3, 2, 5);
    h.head('#a8866c', 4.2, -10.6); ctx.fillStyle = 'rgba(20,10,6,.85)'; ctx.fillRect(-.9, -11, 1.4, .6); ctx.fillRect(2, -11, 1.4, .6); // a squint
    ctx.fillStyle = 'rgba(210,206,196,.75)'; ctx.fillRect(-3.4, -7.8, 7, 1.6); // a white beard, short
    B2F.line(ctx, '#3a2a1a', .8, [[3, -8.4], [6, -8], [6.4, -9.2]]); ell(ctx, 6.5, -9.6, .8, .6, '#3a2a1a'); // a short pipe
    ctx.beginPath(); ctx.arc(0, -12.4, 4.6, Math.PI, 0); ctx.fillStyle = '#5a2e2a'; ctx.fill(); ctx.fillRect(-4.8, -12.8, 9.6, 1.6); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 4; i++) ctx.fillRect(-3.6 + i*2.2, -16, .6, 3.4); // a knitted cap
    ctx.restore(); },
  /* the harbour master: grey and square, a salt-stained blue coat, a ledger under one arm, a harbour gaff in the other hand, a tricorn-ish hat */
  b5_c2_harbourmaster(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.06, 1.02);
    h.legs('#2a2a2e'); ctx.fillStyle = '#141210'; ctx.fillRect(-4.5, 10.4, 3.4, 2.6); ctx.fillRect(1.1, 10.4, 3.4, 2.6);
    poly(ctx, [[-6.6,-6],[6.6,-6],[7.4,9.6],[-7.4,9.6]], h.armor('#3e4c5e', '#121822')); ctx.fillStyle = 'rgba(230,226,210,.22)'; ctx.fillRect(-6, 6, 3, 1.4); ctx.fillRect(2, 7.4, 4, 1); ctx.fillRect(-2, 3, 2, .8); // salt stains
    ctx.fillStyle = '#c9a35a'; for (let i = 0; i < 4; i++) ell(ctx, 1.4, -4 + i*2.8, .55, .55, '#c9a35a'); // brass buttons
    poly(ctx, [[-11,-3],[-4,-4.2],[-3.6,1.8],[-10.4,3]], '#5a3a24'); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-10.4, -2.2, 6.4, .7); // the ledger under the arm
    B2F.line(ctx, '#8a6a46', 1.4, [[6.6, 12], [8.6, -16]]); B2F.line(ctx, '#5a5a5e', 1.1, [[8.6, -16], [9.6, -18.4], [10.8, -17], [9.8, -15.8]]); B2F.line(ctx, '#5a5a5e', 1, [[8.6, -16], [8.8, -19]]); // the gaff, hook and spike
    ctx.fillStyle = '#a07e62'; ctx.fillRect(6.4, -2, 2.2, 3);
    h.head('#b89878', 4.6, -11.2); h.look('rgba(24,14,10,.8)', -11.4); ctx.fillStyle = 'rgba(200,196,186,.7)'; ctx.fillRect(-4.4, -9.8, 1.4, 3); ctx.fillRect(3.2, -9.8, 1.4, 3); // grey side-whiskers
    ctx.fillStyle = '#1c1e26'; poly(ctx, [[-7,-14],[7,-14],[5,-16.4],[0,-18.4],[-5,-16.4]], '#1c1e26'); ctx.fillStyle = 'rgba(201,163,90,.55)'; ctx.fillRect(-6, -14.6, 12, .7); // a low hat, a gold cord
    ctx.restore(); },
  /* Shake fisherfolk: dark hair long and braided, a sealskin vest over a shirt, a net over the shoulder; some with an oar, some a fish-spear */
  b5_c2_shake(ctx, h, t, o){ ctx.save(); const woman = b2Pick(o, [1, 0, 1, 0, 1]), sk = b2Pick(o, ['#9a7a62', '#8a6a52', '#a48268']); B2F.grow(ctx, woman ? .94 : 1.02, woman ? .96 : 1.02);
    ctx.fillStyle = sk; ctx.fillRect(-4.5, 7, 3.4, 6); ctx.fillRect(1.1, 7, 3.4, 6); ctx.fillStyle = '#2a2622'; ctx.fillRect(-4.5, 5, 3.4, 3); ctx.fillRect(1.1, 5, 3.4, 3); // bare-legged below the knee
    h.torso('#8a8478', '#2e2a24', 6); poly(ctx, [[-6.2,-6],[6.2,-6],[5.6,4],[-5.6,4]], h.armor('#5a5a5e', '#1a1a1e')); ctx.fillStyle = 'rgba(200,210,220,.18)'; ctx.fillRect(-5.6, -5, 1.2, 8); // the sealskin vest
    ctx.strokeStyle = 'rgba(180,170,140,.7)'; ctx.lineWidth = .5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-8 + i*1.4, -7); ctx.lineTo(-3 + i*1.4, 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-8, -5 + i*2.6); ctx.lineTo(-2, -6 + i*2.6); ctx.stroke(); } // a net over the shoulder
    if (b2Pick(o, [1, 0, 0])) { B2F.line(ctx, '#7a5a3a', 1.2, [[7.4, 12.6], [9, -16]]); B2F.line(ctx, '#8a8a8e', 1, [[9, -16], [9.4, -19.6]]); B2F.line(ctx, '#8a8a8e', .7, [[9.4, -19.6], [10.6, -17.8]]); } // a fish-spear
    else { B2F.line(ctx, '#7a5a3a', 1.2, [[7.4, 12.6], [8.6, -10]]); poly(ctx, [[7.2,-10],[10,-10],[9.6,-17],[7.8,-17]], '#6a4a2e'); } // an oar, blade up
    ctx.fillStyle = sk; ctx.fillRect(6, -3, 2, 5);
    h.head(sk, 4.2, -11); h.look('rgba(20,12,8,.88)', -11.2);
    ctx.fillStyle = '#1a1412'; B2F.cap(ctx, '#1a1412', 4.4, -12.2); if (woman) { ctx.fillRect(-5.2, -12, 1.8, 13); ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let i = 0; i < 6; i++) ctx.fillRect(-5.2, -10 + i*2, 1.8, .5); } else { ctx.fillRect(-4.8, -12, 1.6, 6); } // a long braid, or hair to the jaw
    ctx.fillStyle = '#e8e4da'; ell(ctx, -1, -6.4, .6, .5, '#e8e4da'); ell(ctx, 1, -6.2, .6, .5, '#e8e4da'); ell(ctx, .1, -5.6, .6, .5, '#2a2a2e'); // shells at the throat, one black
    ctx.restore(); },
});

/* ---------------- the grounds (TILEX) ---------------- */
const B52G = {plank:'#5a4c3c', plankL:'#6e5e4a', plankD:'#2a241e', stone:'#4a4a4c', stoneD:'#26262a', sea:'#1e3a3e', seaL:'#2e5254', seaD:'#0c1a1e', shed:'#3a3634', shedD:'#22201e', sand:'#8a7e66', sandD:'#3a362c', shingle:'#5e5a52', lamp:'255,196,120', tar:'#16141a'};
/* harbour planking: boards running across, wet, nail-heads, a sheen */
function b52Planks(ctx, x, y, T, dark, k = 0){ const px = x*T, py = y*T, P = B52G, h = hash(x, y, 521);
  ctx.fillStyle = dark ? P.plankD : (h > .5 ? P.plank : '#56493a'); ctx.fillRect(px, py, T, T);
  ctx.strokeStyle = 'rgba(0,0,0,.42)'; ctx.lineWidth = Math.max(1, T*.025); for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px, py + i*T/4 + k); ctx.lineTo(px + T, py + i*T/4 + k); ctx.stroke(); }
  const j = (hash(x, y, 522)*.6 + .2)*T; ctx.beginPath(); ctx.moveTo(px + j, py); ctx.lineTo(px + j, py + T/4); ctx.moveTo(px + T - j, py + T/2); ctx.lineTo(px + T - j, py + T*.75); ctx.stroke(); // board ends
  ctx.fillStyle = 'rgba(20,16,12,.6)'; ctx.fillRect(px + j - T*.05, py + T*.11, Math.max(1, T*.03), Math.max(1, T*.03)); ctx.fillRect(px + T - j + T*.03, py + T*.61, Math.max(1, T*.03), Math.max(1, T*.03)); // nails
  if (hash(x, y, 523) > .6) { ctx.fillStyle = dark ? 'rgba(150,170,200,.1)' : 'rgba(210,226,230,.16)'; ctx.fillRect(px + T*.1, py + T*(.3 + hash(x, y, 524)*.4), T*.6, T*.05); } } // a wet sheen
/* wet stone setts behind the quay */
function b52Stone(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B52G; ctx.fillStyle = dark ? P.stoneD : P.stone; ctx.fillRect(px, py, T, T);
  ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let r = 0; r < 3; r++) { const yy = py + r*T/3; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); ctx.stroke(); for (let c = 0; c < 3; c++) { const xx = px + T*((c + (r % 2)*.5)/3); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx, yy + T/3); ctx.stroke(); } }
  if (hash(x, y, 525) > .55) ell(ctx, px + T*(.3 + hash(x, y, 526)*.4), py + T*(.4 + hash(x, y, 527)*.3), T*.2, T*.07, dark ? 'rgba(120,140,170,.14)' : 'rgba(170,196,200,.28)'); } // a puddle
/* harbour water: green-grey, glints, a slow swell line */
function b52Sea(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B52G; const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, dark ? P.seaD : P.seaL); g.addColorStop(1, dark ? '#081216' : P.sea); ctx.fillStyle = g; ctx.fillRect(px, py, T, T);
  for (let i = 0; i < 3; i++) { const yy = py + T*(.18 + i*.3 + hash(x, y, 530 + i)*.1), xx = px + T*hash(x, y, 533 + i)*.6; ctx.fillStyle = dark ? `rgba(${B52G.lamp},.16)` : 'rgba(210,232,226,.24)'; ctx.fillRect(xx, yy, T*(.18 + hash(x, y, 536 + i)*.24), Math.max(1, T*.025)); } }
/* the quay's edge where planking meets water: a timber kerb, a fender, weed */
function b52Kerb(ctx, px, py, T, side){ ctx.fillStyle = '#3a2e22'; if (side === 'n') { ctx.fillRect(px, py, T, T*.1); ctx.fillStyle = 'rgba(60,90,60,.5)'; ctx.fillRect(px, py + T*.1, T, T*.04); }
  else if (side === 'e') { ctx.fillRect(px + T*.88, py, T*.12, T); ctx.fillStyle = 'rgba(60,90,60,.5)'; ctx.fillRect(px + T*.84, py, T*.04, T); }
  else if (side === 'w') { ctx.fillRect(px, py, T*.12, T); ctx.fillStyle = 'rgba(60,90,60,.5)'; ctx.fillRect(px + T*.12, py, T*.04, T); } }
/* wreckage in the water: broken timbers, a spar, a torn sail */
function b52Wreck(ctx, x, y, T, dark){ const px = x*T, py = y*T; b52Sea(ctx, x, y, T, dark); const h = hash(x, y, 540);
  ctx.save(); ctx.translate(px + T/2, py + T/2); ctx.rotate((h - .5)*1.4); ctx.fillStyle = dark ? '#2a2018' : '#4a3a28'; ctx.fillRect(-T*.42, -T*.08, T*.84, T*.16); ctx.fillStyle = 'rgba(255,240,200,.1)'; ctx.fillRect(-T*.42, -T*.08, T*.84, T*.03); ctx.restore();
  ctx.save(); ctx.translate(px + T*.5, py + T*.6); ctx.rotate((hash(x, y, 541) - .5)*2.4); ctx.fillStyle = dark ? '#221a14' : '#3a2e20'; ctx.fillRect(-T*.3, -T*.05, T*.6, T*.1); ctx.restore();
  if (h > .5) poly(ctx, [[px + T*.1, py + T*.2], [px + T*.5, py + T*.1], [px + T*.4, py + T*.45]], dark ? 'rgba(120,120,110,.4)' : 'rgba(200,196,180,.55)'); } // a rag of sail
/* a harbour-front shed: board walls, a tide-line across them at chest height, a burst door */
const b52ShedAt = (x, y) => { const c = b2Tile(x, y); return c === '#' || c === 'D' || c === 'M'; };
function b52Shed(ctx, ch, x, y, T, dark){ const px = x*T, py = y*T, P = B52G, front = !b52ShedAt(x, y + 1) && y < (tileMap ? tileMap.length - 1 : 99), top = front ? py + T*.36 : py + T;
  ctx.fillStyle = dark ? '#1e1c1e' : (hash(x, y, 545) > .5 ? '#3a3a40' : '#34343a'); ctx.fillRect(px, py, T, T); // a slate roof seen from above
  ctx.save(); ctx.beginPath(); ctx.rect(px, py, T, top - py); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let r = 0; r < 4; r++) { const yy = py + r*T/4; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); ctx.stroke(); } ctx.restore();
  if (!front) return;
  ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(px, top, T, T*.05); ctx.fillStyle = dark ? P.shedD : P.shed; ctx.fillRect(px, top + T*.05, T, py + T - top - T*.05);
  ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px + i*T/4, top); ctx.lineTo(px + i*T/4, py + T); ctx.stroke(); }
  ctx.fillStyle = 'rgba(90,110,100,.45)'; ctx.fillRect(px, py + T*.66, T, T*.05); ctx.fillStyle = 'rgba(30,40,36,.35)'; ctx.fillRect(px, py + T*.71, T, py + T - (py + T*.71)); // the tide-line, and the wet below it
  if (ch === 'D') { ctx.fillStyle = '#0c0a0a'; ctx.fillRect(px + T*.24, top + T*.12, T*.52, py + T - top - T*.12); ctx.save(); ctx.translate(px + T*.76, top + T*.12); ctx.rotate(.5); ctx.fillStyle = '#4a3624'; ctx.fillRect(0, 0, T*.1, T*.46); ctx.restore(); ctx.fillStyle = 'rgba(80,120,120,.3)'; ctx.fillRect(px + T*.24, py + T*.9, T*.52, T*.1); } // the burst door, water on the sill
  if (ch === 'M') { ctx.fillStyle = '#2a2018'; ctx.fillRect(px + T*.06, top + T*.24, T*.88, T*.24); for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? '#d8ccb0' : '#5a6a5a'; ctx.fillRect(px + T*(.04 + i*.23), top - T*.06, T*.23, T*.18); } // an awning out from the wall, a counter
    for (let i = 0; i < 5; i++) ell(ctx, px + T*(.16 + i*.17), top + T*.22, T*.04, T*.025, ['#e8dcc0', '#c8b080', '#8a6a4a', '#e0d8c0', '#6a5a4a'][i]); } } // bones and beadwork on the counter
/* the cart of the drowned: a two-wheeled cart under sailcloth, a mule asleep in the shafts */
function b52Cart(ctx, x, y, T, dark){ const px = x*T, py = y*T;
  ell(ctx, px + T*.5, py + T*.86, T*.46, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#2a2018' : '#4a3a28'; ctx.fillRect(px + T*.12, py + T*.38, T*.62, T*.28);
  ctx.fillStyle = dark ? '#4a4a46' : '#b8b2a2'; ctx.beginPath(); ctx.moveTo(px + T*.12, py + T*.38); ctx.quadraticCurveTo(px + T*.43, py + T*.14, px + T*.74, py + T*.38); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px + T*.28, py + T*.3); ctx.lineTo(px + T*.3, py + T*.38); ctx.moveTo(px + T*.5, py + T*.26); ctx.lineTo(px + T*.52, py + T*.38); ctx.stroke(); // sailcloth over the load
  ctx.fillStyle = '#1a140e'; ctx.beginPath(); ctx.arc(px + T*.4, py + T*.72, T*.15, 0, 7); ctx.fill(); ctx.strokeStyle = '#5a4630'; ctx.lineWidth = Math.max(1, T*.03); ctx.stroke(); // a wheel
  ctx.strokeStyle = '#3a2a1a'; ctx.beginPath(); ctx.moveTo(px + T*.74, py + T*.5); ctx.lineTo(px + T*.98, py + T*.56); ctx.stroke(); ell(ctx, px + T*.94, py + T*.5, T*.07, T*.1, '#5a4e44'); } // the shafts, the mule's head
/* fish on the planks, where the water left them */
function b52Fish(ctx, x, y, T){ const px = x*T, py = y*T; for (let i = 0; i < 3; i++) { const fx = px + T*(.2 + hash(x, y, 550 + i)*.6), fy = py + T*(.25 + hash(x, y, 553 + i)*.55), a = hash(x, y, 556 + i)*6.28;
  ctx.save(); ctx.translate(fx, fy); ctx.rotate(a); ell(ctx, 0, 0, T*.1, T*.035, '#b8c4c8'); poly(ctx, [[T*.09, 0], [T*.15, -T*.04], [T*.15, T*.04]], '#9aa8ac'); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(-T*.06, -T*.02, T*.1, Math.max(1, T*.012)); ctx.restore(); } }
/* the plank up to the first hulk: a gangplank with cleats over the water, and the hull's side rising */
function b52Gang(ctx, x, y, T, dark){ const px = x*T, py = y*T; b52Sea(ctx, x, y, T, dark);
  ctx.fillStyle = dark ? '#1a1612' : '#2e2620'; poly(ctx, [[px, py], [px + T, py], [px + T, py + T*.3], [px, py + T*.42]], ctx.fillStyle); // the hull's black side
  ctx.fillStyle = dark ? '#3a3024' : '#6a5a44'; ctx.fillRect(px + T*.34, py + T*.1, T*.32, T*.9); ctx.fillStyle = '#2a2018'; for (let i = 0; i < 5; i++) ctx.fillRect(px + T*.34, py + T*(.2 + i*.17), T*.32, Math.max(1, T*.03)); // the plank, its cleats
  ctx.strokeStyle = dark ? '#5a4a36' : '#8a7650'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(px + T*.3, py + T); ctx.lineTo(px + T*.3, py + T*.1); ctx.moveTo(px + T*.7, py + T); ctx.lineTo(px + T*.7, py + T*.1); ctx.stroke(); } // a hand-rope each side
TILEX.b5_c2_quay = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '~') return b52Sea(ctx, x, y, T, dark);
  if (ch === 'w') return b52Wreck(ctx, x, y, T, dark);
  if (ch === 'H') return b52Gang(ctx, x, y, T, dark);
  if (ch === '#' || ch === 'D' || ch === 'M') return b52Shed(ctx, ch, x, y, T, dark);
  if (ch === ',' || ch === '<') b52Stone(ctx, x, y, T, dark); else b52Planks(ctx, x, y, T, dark);
  if (ch === '<') { ctx.fillStyle = 'rgba(200,180,140,.18)'; ctx.fillRect(px, py + T*.3, T, T*.4); } // the way down to the strand
  const up = b2Tile(x, y - 1); if (ch !== ',' && (up === '~' || up === 'w' || up === 'H')) b52Kerb(ctx, px, py, T, 'n');
  if (ch === 'f') b52Fish(ctx, x, y, T);
  if (ch === 'c') b52Cart(ctx, x, y, T, dark); });
/* the wharf as a fight ground: '#' is the harbour, along one side, with the quay's kerb against it */
TILEX.b5_c2_wharf = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '#') { b52Sea(ctx, x, y, T, dark); const r = b2Tile(x + 1, y), l = b2Tile(x - 1, y); if (x < 7 && r && r !== '#') { ctx.fillStyle = '#3a2e22'; ctx.fillRect(px + T*.86, py, T*.14, T); ctx.fillStyle = 'rgba(60,90,60,.5)'; ctx.fillRect(px + T*.82, py, T*.04, T); } if (x > 0 && l && l !== '#') { ctx.fillStyle = '#3a2e22'; ctx.fillRect(px, py, T*.14, T); ctx.fillStyle = 'rgba(60,90,60,.5)'; ctx.fillRect(px + T*.14, py, T*.04, T); } return; }
  b52Planks(ctx, x, y, T, dark);
  if (dark) b2Mottle(ctx, x, y, T, .04, .1, B52G.lamp, 1.2); });

/* the first hulk: her deck on a slant (the boards run diagonal), the open hold with black water in it, bulkheads and rails, masts with
   rigging, the hatch; in a fight the hold's floor is a hand of water over the planks ('-') */
const b52HulkWall = (x, y) => b2Tile(x, y) === '#';
function b52Deck(ctx, x, y, T, dark){ const px = x*T, py = y*T; ctx.fillStyle = dark ? '#2a2420' : '#4a3e30'; ctx.fillRect(px, py, T, T);
  ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = Math.max(1, T*.025); for (let i = -2; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px + i*T/3, py + T); ctx.lineTo(px + i*T/3 + T*.5, py); ctx.stroke(); } // boards on the slant
  if (hash(x, y, 560) > .6) { ctx.fillStyle = 'rgba(120,160,150,.12)'; ell(ctx, px + T*.5, py + T*.6, T*.3, T*.08, ctx.fillStyle); } // water run down the slope
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(px, py + T*.8, T, T*.2); } // the slope going down to starboard
function b52Hold(ctx, x, y, T, dark){ const px = x*T, py = y*T; b52Deck(ctx, x, y, T, true);
  const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, 'rgba(10,22,24,.7)'); g.addColorStop(1, 'rgba(6,14,16,.82)'); ctx.fillStyle = g; ctx.fillRect(px, py, T, T); // a hand of black water over the planks
  for (let i = 0; i < 2; i++) { ctx.fillStyle = 'rgba(160,200,200,.12)'; ctx.fillRect(px + T*hash(x, y, 562 + i)*.6, py + T*(.3 + i*.35), T*.3, Math.max(1, T*.02)); } }
function b52Mast(ctx, px, py, T, dark){ ell(ctx, px + T*.5, py + T*.6, T*.3, T*.12, 'rgba(0,0,0,.5)'); ctx.fillStyle = '#2a2018'; ctx.beginPath(); ctx.arc(px + T*.5, py + T*.5, T*.24, 0, 7); ctx.fill(); ctx.fillStyle = '#4a3a28'; ctx.beginPath(); ctx.arc(px + T*.46, py + T*.46, T*.17, 0, 7); ctx.fill(); // the mast's foot, seen from above
  ctx.strokeStyle = dark ? 'rgba(140,130,110,.55)' : 'rgba(110,96,70,.75)'; ctx.lineWidth = 1; [[-.5, -.5], [.5, -.5], [-.5, .5], [.5, .5]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(px + T*.5, py + T*.5); ctx.lineTo(px + T*(.5 + dx), py + T*(.5 + dy)); ctx.stroke(); }); } // stays
TILEX.b5_c2_hulk = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '#') { const alone = !b52HulkWall(x - 1, y) && !b52HulkWall(x + 1, y) && !b52HulkWall(x, y - 1) && !b52HulkWall(x, y + 1);
    if (alone) { b52Deck(ctx, x, y, T, dark); return b52Mast(ctx, px, py, T, dark); } // a mast's foot, or a rib, standing alone
    ctx.fillStyle = dark ? '#16120e' : '#2a2018'; ctx.fillRect(px, py, T, T); ctx.fillStyle = dark ? '#2a2018' : '#4a3a28'; ctx.fillRect(px, py, T, T*.18); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(px, py + T*i/3); ctx.lineTo(px + T, py + T*i/3); ctx.stroke(); } ctx.fillStyle = 'rgba(255,230,190,.06)'; ctx.fillRect(px, py, T, Math.max(1, T*.04)); return; } // the rail, the bulkheads
  if (ch === '-') return b52Hold(ctx, x, y, T, dark);
  b52Deck(ctx, x, y, T, dark);
  if (ch === 'm') b52Mast(ctx, px, py, T, dark);
  if (ch === 'h') { ctx.fillStyle = '#1a140e'; ctx.fillRect(px + T*.12, py + T*.12, T*.76, T*.76); ctx.fillStyle = '#060a0c'; ctx.fillRect(px + T*.2, py + T*.2, T*.6, T*.6); ctx.fillStyle = 'rgba(120,170,170,.18)'; ctx.fillRect(px + T*.26, py + T*.6, T*.4, Math.max(1, T*.03)); ctx.strokeStyle = '#6a5a44'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px + T*.4, py + T*.2); ctx.lineTo(px + T*.4, py + T*.8); ctx.moveTo(px + T*.6, py + T*.2); ctx.lineTo(px + T*.6, py + T*.8); ctx.stroke(); } // the hatch: a ladder down into black water
  if (ch === '<') { ctx.fillStyle = '#6a5a44'; ctx.fillRect(px + T*.34, py + T*.2, T*.32, T*.8); ctx.fillStyle = '#2a2018'; for (let i = 0; i < 4; i++) ctx.fillRect(px + T*.34, py + T*(.3 + i*.17), T*.32, Math.max(1, T*.03)); } }); // the plank, going down

/* the strand: sand, shingle, the sea with a line of foam, the Shake boats drawn up, the Sixth's fire, the dune bank */
function b52Sand(ctx, x, y, T, dark, shingle){ const px = x*T, py = y*T, P = B52G; ctx.fillStyle = shingle ? (dark ? '#2a2826' : P.shingle) : (dark ? P.sandD : P.sand); ctx.fillRect(px, py, T, T);
  if (shingle) { for (let i = 0; i < 9; i++) ell(ctx, px + T*hash(x, y, 570 + i), py + T*hash(x, y, 580 + i), T*.05, T*.035, dark ? ['#3a3834', '#24221e', '#46423c'][i % 3] : ['#7a766c', '#4e4a44', '#8a8478'][i % 3]); }
  else { b2Mottle(ctx, x, y, T, .05, .1, dark ? '120,130,150' : '240,230,200', 1); if (hash(x, y, 590) > .75) { ctx.strokeStyle = dark ? 'rgba(80,80,70,.4)' : 'rgba(110,100,80,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(px + T*.5, py + T*.5, T*.1, 0, Math.PI); ctx.stroke(); } } }
function b52Boat(ctx, x, y, T, dark){ const px = x*T, py = y*T; b52Sand(ctx, x, y, T, dark, true);
  ell(ctx, px + T*.5, py + T*.72, T*.5, T*.14, 'rgba(0,0,0,.5)');
  ctx.fillStyle = B52G.tar; ctx.beginPath(); ctx.moveTo(px - T*.2, py + T*.56); ctx.quadraticCurveTo(px + T*.5, py + T*.86, px + T*1.2, py + T*.56); ctx.lineTo(px + T*1.1, py + T*.36); ctx.quadraticCurveTo(px + T*.5, py + T*.46, px - T*.1, py + T*.36); ctx.fill(); // the long black hull, drawn up
  ctx.fillStyle = 'rgba(160,170,190,.18)'; ctx.fillRect(px - T*.05, py + T*.37, T*1.1, Math.max(1, T*.03)); ctx.fillStyle = '#2a2420'; ctx.fillRect(px + T*.1, py + T*.42, T*.8, T*.08); // the gunwale's sheen, a thwart
  ctx.fillStyle = B52G.tar; poly(ctx, [[px + T*1.08, py + T*.4], [px + T*1.22, py + T*.04], [px + T*1.18, py + T*.42]], B52G.tar); } // the high prow
TILEX.b5_c2_strand = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '~') { b52Sea(ctx, x, y, T, dark); const dn = b2Tile(x, y + 1); if (dn && dn !== '~') { const k = REDUCE() ? 0 : Math.sin(performance.now()/900 + x)*T*.04; ctx.fillStyle = dark ? 'rgba(200,214,230,.32)' : 'rgba(240,248,246,.6)'; ctx.fillRect(px, py + T*.82 + k, T, T*.08); } return; } // foam where the wash comes in
  if (ch === '#') { ctx.fillStyle = dark ? '#1e2018' : '#5a5a3e'; ctx.fillRect(px, py, T, T); ctx.strokeStyle = dark ? 'rgba(90,100,70,.5)' : 'rgba(150,160,100,.7)'; ctx.lineWidth = 1; for (let i = 0; i < 6; i++) { const gx = px + T*hash(x, y, 600 + i); ctx.beginPath(); ctx.moveTo(gx, py + T); ctx.lineTo(gx + T*.06, py + T*.5); ctx.stroke(); } return; } // the dune bank, its grass
  if (ch === 'B') return b52Boat(ctx, x, y, T, dark);
  b52Sand(ctx, x, y, T, dark, ch === ',');
  if (ch === '>') { ctx.fillStyle = 'rgba(200,190,160,.16)'; ctx.fillRect(px, py + T*.36, T, T*.3); }
  b2Firelit(ctx, x, y, T, .3, 3.6, '255,150,70');
  if (ch === 'F') { for (let i = 0; i < 7; i++) { const a = i/7*6.283; ell(ctx, px + T*.5 + Math.cos(a)*T*.28, py + T*.6 + Math.sin(a)*T*.18, T*.07, T*.05, i % 2 ? '#4a4844' : '#5a5650'); } ctx.strokeStyle = '#4a3a28'; ctx.lineWidth = Math.max(1, T*.05); ctx.beginPath(); ctx.moveTo(px + T*.3, py + T*.66); ctx.lineTo(px + T*.7, py + T*.54); ctx.moveTo(px + T*.32, py + T*.54); ctx.lineTo(px + T*.68, py + T*.66); ctx.stroke(); b2Flames(ctx, px + T*.5, py + T*.58, T, .9); ctx.fillStyle = 'rgba(120,220,170,.4)'; ctx.fillRect(px + T*.56, py + T*.46, T*.04, T*.06); } }); // wreck-wood burning, green at the edges with the salt

/* battle cover ('t') on these grounds: nets and crates in the sheds, salvage chests on the wharf under a tarpaulin, cargo and benches in the hold */
function b52Cover(ctx, x, y, T, dark, st){ const px = x*T, py = y*T;
  ell(ctx, px + T*.5, py + T*.86, T*.4, T*.1, 'rgba(0,0,0,.5)');
  if (st === 'b5_c2_hulk') { if (b2Tile(x, y) === 't' && hash(x, y, 610) > .5) { ctx.fillStyle = '#3a2c1e'; ctx.fillRect(px + T*.06, py + T*.46, T*.88, T*.16); ctx.fillStyle = '#241a12'; ctx.fillRect(px + T*.12, py + T*.62, T*.08, T*.22); ctx.fillRect(px + T*.8, py + T*.62, T*.08, T*.22); B2F.line(ctx, '#5a4630', Math.max(1, T*.04), [[px + T*.2, py + T*.44], [px + T*.9, py + T*.2]]); return; } // an oar-bench, an oar across it
    for (let i = 0; i < 2; i++) { const bx = px + T*(.1 + i*.38), by = py + T*(.34 - i*.08); ctx.fillStyle = dark ? '#4a4434' : '#7a6e52'; ctx.fillRect(bx, by, T*.44, T*.4); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; ctx.strokeRect(bx + .5, by + .5, T*.44 - 1, T*.4 - 1); ctx.strokeStyle = '#5a4630'; ctx.beginPath(); ctx.moveTo(bx + T*.22, by); ctx.lineTo(bx + T*.22, by + T*.4); ctx.stroke(); } return; } // bales of skins, roped
  if (st === 'b5_c2_wharf') { ctx.fillStyle = dark ? '#3a2c1c' : '#5a4228'; ctx.fillRect(px + T*.1, py + T*.42, T*.38, T*.4); ctx.fillRect(px + T*.5, py + T*.48, T*.4, T*.34); ctx.fillStyle = 'rgba(201,163,90,.6)'; ctx.fillRect(px + T*.1, py + T*.56, T*.38, Math.max(1, T*.03)); ctx.fillRect(px + T*.5, py + T*.6, T*.4, Math.max(1, T*.03)); // two iron-bound chests
    ctx.fillStyle = dark ? 'rgba(70,74,70,.85)' : 'rgba(120,124,112,.85)'; ctx.beginPath(); ctx.moveTo(px + T*.06, py + T*.5); ctx.quadraticCurveTo(px + T*.5, py + T*.12, px + T*.94, py + T*.52); ctx.lineTo(px + T*.9, py + T*.6); ctx.quadraticCurveTo(px + T*.5, py + T*.3, px + T*.1, py + T*.58); ctx.fill(); return; } // the tarpaulin half over them
  ctx.fillStyle = dark ? '#3a3020' : '#5a4a30'; ctx.fillRect(px + T*.14, py + T*.4, T*.42, T*.42); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; ctx.strokeRect(px + T*.14 + .5, py + T*.4 + .5, T*.42 - 1, T*.42 - 1); // a crate
  ctx.strokeStyle = 'rgba(200,190,150,.6)'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(px + T*.66, py + T*.66, T*(.08 + i*.05), Math.PI*1.1, Math.PI*1.9); ctx.stroke(); } } // a heap of net
{ const B52ST = ['b5_c2_quay', 'b5_c2_wharf', 'b5_c2_hulk'], _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (ch === 't' && B52ST.includes(style)) return b52Cover(ctx, x, y, T, dark, style); return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* Trate from the harbour: the town climbing behind its wall, the lighthouse on the harbour front, the Tarancede Tower black on its rocks to
   the south (right), the sea wall, the water. light: 'eve' (sunset), 'dusk', 'dawn' */
function b52Town(x, W, H, base, col, lit){ x.fillStyle = col;
  for (let i = 0; i < 26; i++) { const bx = hash(i, 5201)*W*.8, bw = W*(.03 + hash(i, 5202)*.05), bh = H*(.05 + hash(i, 5203)*.12) + (W*.5 - Math.abs(bx - W*.35))*.05; x.fillRect(bx, base - bh, bw, bh + 2); x.beginPath(); x.moveTo(bx - 2, base - bh); x.lineTo(bx + bw/2, base - bh - H*.02); x.lineTo(bx + bw + 2, base - bh); x.fill(); } // roofs climbing the hill
  x.fillRect(0, base - H*.02, W*.82, H*.02 + 2); for (let i = 0; i < 30; i++) x.fillRect(i*W*.82/30, base - H*.035, W*.012, H*.016); // the harbour wall, crenellated
  if (lit) for (let i = 0; i < 40; i++) { if (hash(i, 5204) > .5) continue; x.fillStyle = `rgba(${lit},${(.4 + hash(i, 5205)*.5).toFixed(2)})`; x.fillRect(hash(i, 5206)*W*.78, base - H*(.03 + hash(i, 5207)*.14), 1.4, 1.6); } }
function b52Lighthouse(ctx, x, base, h, col, lampA){ const w = h*.16; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x - w, base); ctx.lineTo(x - w*.62, base - h); ctx.lineTo(x + w*.62, base - h); ctx.lineTo(x + w, base); ctx.fill();
  ctx.fillRect(x - w*.8, base - h - h*.04, w*1.6, h*.04); ctx.fillRect(x - w*.5, base - h - h*.14, w, h*.1); ctx.beginPath(); ctx.moveTo(x - w*.6, base - h - h*.14); ctx.lineTo(x, base - h - h*.24); ctx.lineTo(x + w*.6, base - h - h*.14); ctx.fill(); // the gallery, the lantern room, the cap
  if (lampA > 0) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, x, base - h - h*.09, h*.3, '#ffd890', lampA); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = `rgba(255,232,170,${Math.min(1, lampA*2).toFixed(2)})`; ctx.fillRect(x - w*.3, base - h - h*.12, w*.6, h*.05); } }
function b52Tower(ctx, x, base, h, col){ const w = h*.17; ctx.fillStyle = '#121216'; ctx.beginPath(); ctx.moveTo(x - w*2.6, base + h*.04); ctx.quadraticCurveTo(x - w*1.6, base - h*.08, x, base - h*.06); ctx.quadraticCurveTo(x + w*1.8, base - h*.1, x + w*2.8, base + h*.04); ctx.fill(); // the island of rocks
  ctx.fillStyle = col; ctx.fillRect(x - w, base - h, w*2, h); for (let i = 1; i < 7; i++) { ctx.fillStyle = 'rgba(255,255,255,.035)'; ctx.fillRect(x - w, base - h + i*h/7, w*2, 1); } // seven storeys of black stone, no door, no window
  ctx.fillStyle = 'rgba(60,64,80,.6)'; ctx.fillRect(x - w, base - h, w*2, h*.03); } // a dull ring at the top (the tiles, not shown as anything)
SCENEX.b5_trate_harbour = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, f = (S && S.f) || {}, late = !!(f.b5_c2_war), night = (f.b5_c2_ph || 1) >= 4 && !late;
  ctx.drawImage(sceneLayer('b52:harb' + (late ? 'd' : night ? 'n' : ''), W, H, (x, W, H) => {
    const sky = late ? [[0,'#4a5a74'],[.6,'#a6a4a0'],[1,'#e8cfa8']] : night ? [[0,'#070a16'],[1,'#1a2034']] : [[0,'#2e3a5a'],[.5,'#8a6a6a'],[.85,'#e09a5a'],[1,'#f2c27a']]; // dawn for the barges, night, or a summer evening
    x.fillStyle = vgrad(x, 0, hz, sky); x.fillRect(0, 0, W, hz + 2);
    if (!night) for (let i = 0; i < 5; i++) { x.fillStyle = late ? 'rgba(240,236,230,.35)' : 'rgba(255,200,150,.28)'; x.beginPath(); x.ellipse(hash(i, 5211)*W, hz*(.2 + hash(i, 5212)*.4), W*.14, hz*.04, 0, 0, 7); x.fill(); }
    else for (let i = 0; i < 50; i++) { x.fillStyle = `rgba(220,226,250,${(.15 + hash(i, 5213)*.4).toFixed(2)})`; x.fillRect(hash(i, 5214)*W, Math.pow(hash(i, 5215), 1.3)*hz*.7, 1, 1); }
    if (!night && !late) { x.globalCompositeOperation = 'lighter'; glow(x, W*.08, hz, H*.3, '#ffb060', .35); x.globalCompositeOperation = 'source-over'; } // the last of the sun, west
    b52Town(x, W, H, hz, night ? '#12141e' : late ? '#4a4e5a' : '#2e2a34', night ? '255,196,120' : late ? null : '255,210,150');
    x.fillStyle = vgrad(x, hz, H, night ? [[0,'#0e1a22'],[1,'#060c10']] : late ? [[0,'#6a7e86'],[1,'#2a3a40']] : [[0,'#8a7468'],[.3,'#3a4a50'],[1,'#1a2a30']]); x.fillRect(0, hz, W, H - hz); // the water
    // the wrecks on the quays: one on her side, one bow up, one far out on the rocks
    x.fillStyle = night ? '#0a0a0e' : '#1a1820'; x.save(); x.translate(W*.24, hz + H*.13); x.rotate(-.5); x.fillRect(-W*.1, -H*.03, W*.2, H*.06); x.restore(); x.save(); x.translate(W*.26, hz + H*.1); x.rotate(-1.05); x.fillRect(0, -1, H*.22, 2.2); x.fillRect(H*.08, -1, 2, H*.06); x.restore();
    x.beginPath(); x.moveTo(W*.44, hz + H*.18); x.lineTo(W*.6, hz + H*.1); x.lineTo(W*.62, hz + H*.16); x.lineTo(W*.46, hz + H*.22); x.fill(); x.fillRect(W*.52, hz - H*.06, 2, H*.2); x.save(); x.translate(W*.52, hz - H*.06); x.rotate(.3); x.fillRect(0, 0, W*.06, 1.4); x.restore();
    x.fillRect(W*.7, hz + H*.02, W*.07, H*.03); x.save(); x.translate(W*.73, hz + H*.02); x.rotate(.4); x.fillRect(0, -H*.12, 1.6, H*.12); x.restore();
    // the near quay: planking, bollards, a coil of rope, fish
    x.fillStyle = night ? '#1a1612' : '#3e3428'; x.fillRect(0, H*.8, W, H*.2); x.fillStyle = night ? '#2a2018' : '#5a4a38'; x.fillRect(0, H*.8, W, H*.015); x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 1; for (let i = 1; i < 6; i++) { x.beginPath(); x.moveTo(0, H*(.8 + i*.035)); x.lineTo(W, H*(.8 + i*.035)); x.stroke(); }
    [[.12, 1], [.66, 1], [.9, 0]].forEach(([u, rope]) => { const bx = W*u; x.fillStyle = '#1e1a16'; x.fillRect(bx - 5, H*.76, 10, H*.06); x.fillStyle = '#3a342c'; x.fillRect(bx - 6, H*.755, 12, 3); if (rope) { x.strokeStyle = '#8a7650'; x.lineWidth = 2; for (let k = 0; k < 3; k++) { x.beginPath(); x.ellipse(bx + 16, H*.86, 9 - k*2, 3 - k*.6, 0, 0, 7); x.stroke(); } } });
    for (let i = 0; i < 9; i++) { const fx = W*(.2 + hash(i, 5216)*.6), fy = H*(.86 + hash(i, 5217)*.1); x.save(); x.translate(fx, fy); x.rotate(hash(i, 5218)*6); x.fillStyle = night ? '#4a5258' : '#a8b4b8'; x.beginPath(); x.ellipse(0, 0, 5, 1.8, 0, 0, 7); x.fill(); x.restore(); }
  }), 0, 0, W, H);
  // the lighthouse on the harbour front, and the Tarancede Tower out on its rocks, south (right)
  b52Lighthouse(ctx, W*.4, hz - H*.01, H*.3, night ? '#1a1a22' : late ? '#8a8a92' : '#4a4048', night ? .35 + (mo ? Math.sin(t/700)*.08 : 0) : late ? 0 : .12);
  b52Tower(ctx, W*.86, hz + H*.04, H*.24, night ? '#060608' : '#0e0e12');
  // the water's glints, and the swell
  for (let i = 0; i < 24; i++) { const k = hash(i, 5219), y = lerp(hz + H*.04, H*.78, k), xx = ((hash(i, 5220)*W + t*mo*(.006 + k*.01)) % (W + 30)) - 15; ctx.fillStyle = night ? `rgba(255,214,150,${(.08 + .14*hash(i, 5221)).toFixed(2)})` : late ? `rgba(240,240,230,${(.1 + .16*hash(i, 5221)).toFixed(2)})` : `rgba(255,200,140,${(.1 + .2*hash(i, 5221)).toFixed(2)})`; ctx.fillRect(xx, y, 5 + 12*hash(i, 5222), 1); }
  // the gulls
  if (!night) for (let i = 0; i < 5; i++) { const k = mo ? ((t/14000 + i*.21) % 1) : hash(i, 5223), gx = lerp(-20, W + 20, k), gy = H*(.16 + hash(i, 5224)*.2) + (mo ? Math.sin(t/400 + i)*3 : 0), wg = mo ? Math.sin(t/120 + i)*2 : 1; ctx.strokeStyle = 'rgba(30,30,40,.7)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(gx - 5, gy - wg); ctx.quadraticCurveTo(gx - 2, gy - 2, gx, gy); ctx.quadraticCurveTo(gx + 2, gy - 2, gx + 5, gy - wg); ctx.stroke(); }
  // the squad on the near quay
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.56 + i*18, H*.98, 1.8, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .55, .5); };

/* the harvest ships broken on the quays at dusk, close: a hull on her side across the frame, the masts leaning, the rigging in a black net
   against the sky, the shapes in it; the lighthouse lit behind and the Tower far off */
SCENEX.b5_c2_wrecks = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.56, f = (S && S.f) || {}, gone = !!(f.b5_c2_hulkDone && (f.b5_c2_tideDone || f.b5_c2_ph >= 4));
  ctx.drawImage(sceneLayer('b52:wrecks', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#141a2e'],[.55,'#3a3448'],[.85,'#7a4a46'],[1,'#a86a4a']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 5231)*.35).toFixed(2)})`; x.fillRect(hash(i, 5232)*W, Math.pow(hash(i, 5233), 1.4)*hz*.45, 1, 1); }
    b52Town(x, W, H, hz, '#16141c', '255,196,120');
    b52Tower(x, W*.9, hz + H*.02, H*.16, '#0a0a0e');
    x.fillStyle = vgrad(x, hz, H, [[0,'#2a2a32'],[1,'#0a1014']]); x.fillRect(0, hz, W, H - hz);
    // the first hulk on her side across the frame: the hull's flank, her keel toward us, the deck tilted away
    x.fillStyle = '#0e0c0e'; x.beginPath(); x.moveTo(W*.04, H*.86); x.quadraticCurveTo(W*.2, H*.6, W*.56, H*.6); x.lineTo(W*.82, H*.64); x.quadraticCurveTo(W*.9, H*.74, W*.86, H*.88); x.lineTo(W*.1, H*.92); x.fill();
    x.strokeStyle = 'rgba(120,110,100,.25)'; x.lineWidth = 1; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(W*.08, H*(.86 - i*.03)); x.quadraticCurveTo(W*.4, H*(.66 - i*.01), W*.84, H*(.7 + i*.03)); x.stroke(); } // strakes
    x.fillStyle = '#1a1612'; x.beginPath(); x.moveTo(W*.18, H*.66); x.lineTo(W*.36, H*.58); x.lineTo(W*.4, H*.6); x.lineTo(W*.24, H*.68); x.fill(); // a split in her side
    // the quay in front, a bollard, the plank
    x.fillStyle = '#1e1a16'; x.fillRect(0, H*.9, W, H*.1); x.fillStyle = '#2e2620'; x.fillRect(0, H*.9, W, 2); x.fillStyle = '#14100c'; x.fillRect(W*.92, H*.86, 9, H*.06);
    x.fillStyle = '#3a3024'; x.beginPath(); x.moveTo(W*.62, H*.92); x.lineTo(W*.66, H*.92); x.lineTo(W*.7, H*.64); x.lineTo(W*.67, H*.64); x.fill();
  }), 0, 0, W, H);
  // the lighthouse behind, its lamp lit, the beam going round
  b52Lighthouse(ctx, W*.66, hz - H*.01, H*.22, '#16161c', .35); if (mo) { const a = (t/3000) % (Math.PI*2), bx = W*.66, by = hz - H*.25; ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(bx, by, 0, bx, by, W*.5); g.addColorStop(0, 'rgba(255,230,170,.18)'); g.addColorStop(1, 'rgba(255,230,170,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(bx, by); ctx.arc(bx, by, W*.5, a - .12, a + .12); ctx.fill(); ctx.globalCompositeOperation = 'source-over'; }
  // the masts leaning out over the quay, and the rigging: a black net against the sky
  const mast = (x0, y0, x1, y1) => { ctx.strokeStyle = '#08080a'; ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); return [x1, y1]; };
  const [ax, ay] = mast(W*.4, H*.62, W*.12, H*.08), [bx2, by2] = mast(W*.58, H*.62, W*.36, H*.14);
  ctx.strokeStyle = 'rgba(8,8,10,.85)'; ctx.lineWidth = 1; for (let i = 0; i < 9; i++) { const k = i/8; ctx.beginPath(); ctx.moveTo(lerp(W*.4, ax, k), lerp(H*.62, ay, k)); ctx.lineTo(lerp(W*.58, bx2, k), lerp(H*.62, by2, k)); ctx.stroke(); }
  for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(W*(.5 + i*.06), H*.62); ctx.stroke(); ctx.beginPath(); ctx.moveTo(bx2, by2); ctx.lineTo(W*(.62 + i*.04), H*.64); ctx.stroke(); }
  ctx.save(); ctx.translate(lerp(W*.4, ax, .6), lerp(H*.62, ay, .6)); ctx.rotate(.3); ctx.fillStyle = 'rgba(160,150,130,.35)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W*.12, H*.02); ctx.lineTo(W*.06, H*.14); ctx.fill(); ctx.restore(); // a torn sail
  // the shapes in the rigging: there when you look away
  if (!gone) for (let i = 0; i < 6; i++) { const k = .25 + hash(i, 5234)*.6, sx = lerp(lerp(W*.4, ax, k), lerp(W*.58, bx2, k), hash(i, 5235)), sy = lerp(lerp(H*.62, ay, k), lerp(H*.62, by2, k), hash(i, 5235)) + 6,
      a = .3 + (mo ? (Math.sin(t/(1100 + i*170) + i*2) + 1)*.25 : .25); ctx.globalAlpha = a; drawFigure(ctx, 'b5_wraith', sx, sy + 10, 1.05, t, {still:true, air:true, phase:i}); ctx.globalAlpha = 1; }
  vign(ctx, W, H, .65, .5); };

/* inside a flooded hold: black water to the thigh, the ribs of the hull, light coming through a split in her side, the benches where the
   crew sat (empty, or with sailcloth shapes far back in the dark) */
SCENEX.b5_c2_hold = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, wl = H*.66;
  ctx.drawImage(sceneLayer('b52:hold', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, H, [[0,'#0a0a0e'],[.5,'#16141a'],[1,'#08080a']]); x.fillRect(0, 0, W, H);
    for (let i = 0; i < 9; i++) { const rx = W*(i + .5)/9; x.strokeStyle = '#1e1a18'; x.lineWidth = W*.022; x.beginPath(); x.moveTo(rx - W*.02, wl + H*.1); x.quadraticCurveTo(rx - W*.05, H*.3, rx, H*.02); x.stroke(); x.strokeStyle = 'rgba(160,140,110,.08)'; x.lineWidth = 1; x.beginPath(); x.moveTo(rx - W*.03, wl); x.quadraticCurveTo(rx - W*.055, H*.3, rx - W*.01, H*.02); x.stroke(); } // the ribs
    x.fillStyle = '#121012'; x.fillRect(0, 0, W, H*.06); x.fillStyle = 'rgba(0,0,0,.4)'; for (let i = 0; i < 12; i++) x.fillRect(i*W/12, H*.06, 2, H*.02); // the deck-beams overhead
    for (let i = 0; i < 4; i++) { const by = wl - H*(.02 + i*.012), bx0 = W*(.1 + i*.08), bx1 = W*(.9 - i*.08); x.fillStyle = `rgba(40,34,28,${(.9 - i*.18).toFixed(2)})`; x.fillRect(bx0, by - H*.02, bx1 - bx0, H*.02); } // oar-benches going back into the dark
    x.fillStyle = 'rgba(150,146,130,.18)'; for (let i = 0; i < 4; i++) { x.beginPath(); x.ellipse(W*(.36 + i*.08), wl - H*.075, W*.02, H*.022, 0, 0, 7); x.fill(); } // far back, sailcloth shapes on the benches, barely there
    x.fillStyle = vgrad(x, wl, H, [[0,'#0e1c1e'],[1,'#040808']]); x.fillRect(0, wl, W, H - wl); // the water
  }), 0, 0, W, H);
  // light through the split in her side, falling on the water
  const sx = W*.78, sy = H*.22; ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(sx, sy, W*.56, wl); g.addColorStop(0, 'rgba(220,180,150,.32)'); g.addColorStop(1, 'rgba(220,180,150,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(sx - W*.02, sy); ctx.lineTo(sx + W*.03, sy + H*.04); ctx.lineTo(W*.66, wl); ctx.lineTo(W*.44, wl); ctx.fill();
  ctx.fillStyle = 'rgba(255,220,180,.85)'; ctx.fillRect(sx - W*.02, sy, W*.05, 2); glow(ctx, W*.55, wl + 4, W*.12, '#e8b890', .12); ctx.globalCompositeOperation = 'source-over';
  // the water moving, slow
  for (let i = 0; i < 16; i++) { const k = hash(i, 5241), y = lerp(wl + 3, H*.96, k), xx = ((hash(i, 5242)*W + t*mo*.004*(1 + k)) % (W + 20)) - 10; ctx.fillStyle = `rgba(160,200,200,${(.05 + .12*hash(i, 5243)).toFixed(2)})`; ctx.fillRect(xx, y, 8 + 12*hash(i, 5244), 1); }
  // the ladder up to the hatch, and its square of evening
  ctx.fillStyle = 'rgba(120,100,120,.4)'; ctx.fillRect(W*.16, 0, W*.1, H*.05); ctx.strokeStyle = '#3a2e22'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W*.18, H*.04); ctx.lineTo(W*.17, wl + H*.08); ctx.moveTo(W*.24, H*.04); ctx.lineTo(W*.23, wl + H*.08); ctx.stroke(); ctx.lineWidth = 1.5; for (let i = 0; i < 9; i++) { const y = H*(.1 + i*.065); ctx.beginPath(); ctx.moveTo(W*.18, y); ctx.lineTo(W*.24, y); ctx.stroke(); }
  vign(ctx, W, H, .8, .5); };

/* the strand at night: the Shake boats drawn up on the shingle, long and black with high prows, their fires, the Sixth's fire near with
   the squad round it, the sea coming in and going out, the town and the lighthouse far off to the north */
SCENEX.b5_c2_strand = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b52:strand', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#060814'],[.8,'#141a2c'],[1,'#20283a']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 70; i++) { x.fillStyle = `rgba(220,226,250,${(.15 + hash(i, 5251)*.5).toFixed(2)})`; x.fillRect(hash(i, 5252)*W, Math.pow(hash(i, 5253), 1.3)*hz*.85, 1, 1); }
    x.fillStyle = '#0c0e16'; x.fillRect(0, hz - H*.03, W*.36, H*.03 + 2); for (let i = 0; i < 16; i++) { if (hash(i, 5254) > .5) { x.fillStyle = 'rgba(255,196,120,.7)'; x.fillRect(hash(i, 5255)*W*.34, hz - H*(.01 + hash(i, 5256)*.02), 1.3, 1.3); } } x.fillStyle = '#0c0e16'; // the town, far off north (left)
    x.fillStyle = vgrad(x, hz, H*.62, [[0,'#141e2a'],[1,'#0a121a']]); x.fillRect(0, hz, W, H*.62 - hz); // the sea
    x.fillStyle = vgrad(x, H*.62, H, [[0,'#2a2620'],[1,'#141210']]); x.fillRect(0, H*.62, W, H*.38); // the shingle
    for (let i = 0; i < 140; i++) { x.fillStyle = ['#36322c', '#2a2622', '#423c34'][i % 3]; x.beginPath(); x.ellipse(hash(i, 5257)*W, H*(.64 + hash(i, 5258)*.36), 2 + hash(i, 5259)*2, 1.2 + hash(i, 5260), 0, 0, 7); x.fill(); }
    // the Shake boats drawn up along the shingle, high prows to the sea
    for (let b = 0; b < 5; b++) { const bx = W*(.06 + b*.21), by = H*(.66 + (b % 2)*.04), bw = W*.15, s = 1 + (b % 2)*.1; x.fillStyle = '#08080c'; x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(bx + bw*.5, by + H*.05*s, bx + bw, by); x.lineTo(bx + bw*.96, by - H*.03*s); x.quadraticCurveTo(bx + bw*.5, by - H*.005, bx + bw*.04, by - H*.03*s); x.fill(); poly(x, [[bx + bw*.94, by - H*.025], [bx + bw*1.06, by - H*.1*s], [bx + bw*1.02, by - H*.02]], '#08080c'); x.fillStyle = 'rgba(150,160,190,.16)'; x.fillRect(bx + bw*.06, by - H*.028*s, bw*.88, 1); }
  }), 0, 0, W, H);
  // the lighthouse far off, its lamp
  b52Lighthouse(ctx, W*.3, hz - H*.02, H*.12, '#0e1018', .4 + (mo ? Math.sin(t/700)*.08 : 0));
  // the wash coming in and going out
  const wk = mo ? (Math.sin(t/2200) + 1)/2 : .5, wy = H*(.6 + wk*.025); ctx.fillStyle = 'rgba(200,214,230,.22)'; ctx.beginPath(); ctx.moveTo(0, wy); for (let i = 0; i <= 20; i++) ctx.lineTo(i*W/20, wy + Math.sin(i*1.3 + t*mo/600)*2); ctx.lineTo(W, wy + 3); ctx.lineTo(0, wy + 3); ctx.fill();
  for (let i = 0; i < 18; i++) { const k = hash(i, 5261), y = lerp(hz + 3, H*.58, k), xx = ((hash(i, 5262)*W + t*mo*.005) % (W + 20)) - 10; ctx.fillStyle = `rgba(200,214,240,${(.06 + .12*hash(i, 5263)).toFixed(2)})`; ctx.fillRect(xx, y, 6 + 10*hash(i, 5264), 1); }
  // the Shake's fires by their boats, small, with figures round them
  [[.18, .74], [.6, .76], [.92, .72]].forEach(([u, v], i) => { const fx = W*u, fy = H*v; ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, H*.1, '#ff8a3a', .25*fl); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,170,80,.9)'; ctx.fillRect(fx - 2, fy - 3*fl, 4, 3*fl);
    drawFigure(ctx, 'b5_c2_shake', fx + (i % 2 ? -12 : 12), fy + 6, 1.1, t, {still:true, dir:i % 2 ? 1 : -1, phase:i}); });
  // the Sixth's fire, near, wreck-wood burning green at the edges, with the squad round it
  const cx = W*.48, cy = H*.92; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.38, '#ff8a3a', .3*fl); glow(ctx, cx + 6, cy - 4, H*.08, '#60e0a0', .16*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*14, cy + Math.sin(a)*4, 3, 2, '#3a3834'); } poly(ctx, [[cx - 8, cy], [cx - 2, cy - 16*fl], [cx + 1, cy - 7], [cx + 4, cy - 13*fl], [cx + 8, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - 4, cy], [cx, cy - 9*fl], [cx + 4, cy]], 'rgba(255,230,150,.95)'); ctx.fillStyle = 'rgba(110,230,160,.7)'; ctx.fillRect(cx + 4, cy - 7*fl, 2, 4);
  if (mo) for (let i = 0; i < 5; i++) { const k = ((t/1400 + i/5) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*4, cy - 10 - k*30, 1, 1); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(26 + j*22), H*.99 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .7, .55); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Five's ground ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on dark canal-slate with a thin dock-gold rim (Claude's call) */
function b52Item(key, label, body){ const w = 240, h = 130, id = 'c52-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#34444a"></stop><stop offset=".7" stop-color="#1a2428"></stop><stop offset="1" stop-color="#0e1214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a poacher's sealskin coat: a short coat of grey sealskin, oiled, with bone toggles */
b52Item('b5_c2_sealcoat', 'A poacher\'s sealskin coat', '<ellipse cx="120" cy="70" rx="70" ry="36" fill="#b8c8cc" opacity=".05"/>'
  + '<path d="M96 30 L80 36 L58 70 L66 76 L82 56 L84 108 L156 108 L158 56 L174 76 L182 70 L160 36 L144 30 Q132 40 120 40 Q108 40 96 30 Z" fill="#6a7074"/>'
  + '<path d="M96 30 L80 36 L58 70 L66 76 L82 56 L84 108 L120 108 L120 40 Q108 40 96 30 Z" fill="#7a8286"/><path d="M82 56 L84 108" stroke="#4a5054" stroke-width="1.4"/><path d="M158 56 L156 108" stroke="#4a5054" stroke-width="1.4"/>'
  + '<path d="M100 32 Q110 46 120 44 Q130 46 140 32" fill="none" stroke="#4a5054" stroke-width="2"/><path d="M120 44 L120 108" stroke="#3a4044" stroke-width="1.6"/>'
  + '<path d="M86 50 Q90 70 88 98" stroke="#c8d4d8" stroke-width="1.4" fill="none" opacity=".45"/><path d="M62 70 L80 40" stroke="#c8d4d8" stroke-width="1" opacity=".35"/>'
  + '<g fill="#e8e0cc"><rect x="113" y="54" width="14" height="4" rx="2"/><rect x="113" y="70" width="14" height="4" rx="2"/><rect x="113" y="86" width="14" height="4" rx="2"/></g><g stroke="#8a7a5a" stroke-width="1"><path d="M110 56 L113 56 M127 56 L130 56 M110 72 L113 72 M127 72 L130 72 M110 88 L113 88 M127 88 L130 88"/></g>'
  + '<g stroke="#5a6064" stroke-width=".8" opacity=".6"><path d="M92 64 l4 2 M100 80 l4 2 M140 64 l4 2 M146 84 l4 2 M96 96 l4 2 M138 98 l4 2"/></g>');
/* a tooth nobody can name: a long curved tooth, yellowed, bound at the root with copper wire */
b52Item('b5_c2_tooth', 'A tooth nobody can name', '<ellipse cx="120" cy="70" rx="72" ry="30" fill="#e8dcb8" opacity=".05"/>'
  + '<path d="M58 84 Q70 70 98 62 Q140 50 172 30 Q186 22 190 26 Q188 34 176 42 Q146 64 104 78 Q80 86 66 94 Z" fill="#d8c898"/>'
  + '<path d="M70 82 Q100 68 140 54 Q166 42 184 28" stroke="#f4ecd0" stroke-width="2" fill="none" opacity=".6"/><path d="M66 94 Q82 86 104 78 Q146 64 176 42" stroke="#9a8858" stroke-width="1.6" fill="none"/>'
  + '<path d="M120 62 Q124 66 122 70 M148 50 Q152 54 150 58" stroke="#a89060" stroke-width=".8" fill="none" opacity=".6"/>'
  + '<g stroke="#b8642a" stroke-width="2.2"><path d="M60 80 L68 94"/><path d="M64 78 L72 92"/><path d="M68 76 L76 90"/><path d="M72 74 L80 88"/></g><g stroke="#e8a060" stroke-width=".8" opacity=".7"><path d="M61 79 L66 88"/><path d="M69 75 L74 84"/></g>'
  + '<path d="M58 86 Q48 92 46 104 Q50 110 56 104 Q58 96 64 92" fill="none" stroke="#b8642a" stroke-width="1.6"/>');
/* a harbour gaff: a long ash pole with an iron hook and a spike */
b52Item('b5_c2_gaff', 'A harbour gaff', '<ellipse cx="120" cy="70" rx="90" ry="26" fill="#c8d8d0" opacity=".05"/><g transform="rotate(-14 120 66)">'
  + '<rect x="22" y="62" width="160" height="8" rx="3" fill="#b89a6a"/><rect x="22" y="62" width="160" height="2.5" rx="1" fill="#e0c898" opacity=".6"/><path d="M40 70 L176 70" stroke="#7a5e3a" stroke-width="1"/>'
  + '<g stroke="#5a4428" stroke-width="1.6"><path d="M150 61 L152 71 M156 61 L158 71 M162 61 L164 71"/></g>'
  + '<rect x="178" y="60" width="12" height="12" rx="2" fill="#5a5a5e"/><path d="M190 66 L222 66" stroke="#6a6a6e" stroke-width="4" stroke-linecap="round"/><path d="M190 66 L222 66" stroke="#b8b8bc" stroke-width="1.2" opacity=".7"/>'
  + '<path d="M196 64 Q198 44 214 42 Q226 42 226 52 Q226 58 220 58" fill="none" stroke="#5a5a5e" stroke-width="4.4" stroke-linecap="round"/><path d="M198 60 Q200 46 214 44" fill="none" stroke="#b8b8bc" stroke-width="1.2" opacity=".6"/><path d="M220 58 L216 54" stroke="#5a5a5e" stroke-width="3" stroke-linecap="round"/>'
  + '<path d="M22 63 Q16 66 22 70" fill="#7a5e3a"/></g>');
/* a cord of Shake burial shells: small white shells on a knotted cord, one of them black */
b52Item('b5_c2_shells', 'A cord of Shake burial shells', '<ellipse cx="120" cy="72" rx="74" ry="32" fill="#e8e4da" opacity=".05"/>'
  + '<path d="M40 44 Q60 100 120 102 Q180 100 200 44" fill="none" stroke="#8a7650" stroke-width="2.2"/><path d="M40 44 Q60 100 120 102" fill="none" stroke="#b8a070" stroke-width=".7" opacity=".7"/>'
  + '<g fill="#8a7650"><circle cx="40" cy="44" r="3"/><circle cx="200" cy="44" r="3"/><circle cx="64" cy="80" r="2.4"/><circle cx="176" cy="80" r="2.4"/></g>'
  + [[54, 66, 0], [70, 84, 0], [88, 94, 0], [106, 100, 0], [124, 102, 1], [142, 100, 0], [160, 94, 0], [176, 84, 0], [190, 66, 0]].map(([x, y, blk], i) =>
      `<g transform="translate(${x} ${y}) rotate(${(i - 4)*10})"><path d="M-7 -2 Q0 -12 7 -2 Q6 8 0 9 Q-6 8 -7 -2 Z" fill="${blk ? '#1a1a1e' : '#ece6d8'}"/><path d="M-4 -3 Q0 -9 4 -3 M-3 1 Q0 -4 3 1" fill="none" stroke="${blk ? '#4a4a52' : '#b8b0a0'}" stroke-width=".9"/><path d="M-6 -2 Q-2 -9 2 -8" fill="none" stroke="${blk ? '#6a6a72' : '#ffffff'}" stroke-width=".8" opacity=".6"/></g>`).join(''));
