/* ============ Book Four, Chapter 2 art: Coltaine's Fall — the Aren Way under the empty trees, the 9th's camp below the hill, the Fall ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/70d, lit from the left; two grounds (TILEX: the Aren Way on Book Two's Odhan hardpan, by
   day and by night, with its empty trees, carts, tents and fire; the hill, hung with braids and feathers and tokens, by lamplight); five
   backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still): b4_road_fire and b4_march redrawn, the empty trees,
   the Fall at dusk and at night, the standard far up the column; and the chapter's gear (ART['item/b4_c2_*']) on Book Four's sand-and-iron
   ground. Grim things stay distant: the trees are empty, spike holes are a dark dot, the hill has no body and no cross. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* a scavenger off the hill: a thin Seven Cities man out of Aren's poor quarters, a dirty head-cloth, a short ragged robe hitched up,
     bare shins, a knife, and a sack over the shoulder with red thread and a crow feather sticking out of its mouth */
  b4_c2_scavenger(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, .98); const c = b2Pick(o, [['#8a7458', '#2e2418'], ['#6e6252', '#22201a'], ['#7a5e44', '#281a10']]), sk = b2Pick(o, ['#8a6446', '#7a5a3e', '#94704e']);
    ell(ctx, -6.6, -2.6, 3.8, 5, h.armor('#7a6646', '#2a2014')); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-9.2, -6.4, 5, .7); // the sack, slung behind
    ctx.fillStyle = '#9a2a1e'; ctx.fillRect(-8.6, -8.6, .8, 3); ctx.fillRect(-7.4, -9.2, .7, 3.4); B2F.line(ctx, '#0c0a0e', .9, [[-6.2, -6.6], [-4.6, -11.4]]); // red thread, a crow feather, out of its mouth
    ctx.fillStyle = sk; ctx.fillRect(-4.4, 7, 3.2, 6); ctx.fillRect(1.2, 7, 3.2, 6); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-4.4, 11.8, 3.2, 1.2); ctx.fillRect(1.2, 11.8, 3.2, 1.2); // bare shins, bare feet
    poly(ctx, [[-6,-6],[6,-6],[6.8,7.6],[-6.8,7.6]], h.armor(c[0], c[1])); ctx.fillStyle = 'rgba(0,0,0,.24)'; for (let i = 0; i < 4; i++) ctx.fillRect(-6.4 + i*3.4, 6.4, 1.4, 1.4 + (i % 2)); // a short robe, ragged
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-6.2, 1.8, 12.4, 1.1); // a cord belt
    ctx.fillStyle = sk; ctx.fillRect(5.6, -3.6, 2, 6); B2F.line(ctx, '#a8a296', 1.1, [[6.8, 2.4], [11, -3.6]]); B2F.line(ctx, '#3a2414', 1.5, [[6, 3.4], [7.2, 1.8]]); // a bare arm, a knife
    h.head(sk, 4.2, -11.2); h.look('rgba(20,12,8,.9)', -11.4); ctx.fillStyle = 'rgba(30,18,10,.45)'; ctx.fillRect(-3, -8.2, 6.4, 1.6); // stubble
    B2F.cloth(ctx, b2Pick(o, ['#b8aa8a', '#9a8e74', '#a89070']), '#6a5e48'); ctx.fillStyle = 'rgba(60,44,28,.35)'; ctx.fillRect(-4, -15, 8, 1); ctx.restore(); }, // the head-cloth, dirty
  /* a tribal raider out of the hills: bare to the waist and painted in ochre and white bars, a wrapped kilt, a hide shield, a spear
     or a short curved blade, hair bound up in a knot, a bar of paint across the eyes */
  b4_c2_raider(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.02); const sk = b2Pick(o, ['#7a5236', '#6a4630', '#845a3c']), kilt = b2Pick(o, ['#5a3a24', '#4a4030', '#6a2e1e']);
    const spear = (o.phase || 0) % 2 === 0;
    if (spear) { B2F.line(ctx, '#5a4026', 1.2, [[8.4, 12], [9.8, -22]]); poly(ctx, [[10,-27],[9,-21.6],[10.8,-21.4]], '#c8c0ae'); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(9.8, -26, .3, 3.6); } // the spear
    ctx.fillStyle = sk; ctx.fillRect(-4.5, 5, 3.4, 8); ctx.fillRect(1.1, 5, 3.4, 8); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-4.5, 11.6, 3.4, 1.4); ctx.fillRect(1.1, 11.6, 3.4, 1.4); // bare legs
    poly(ctx, [[-6.2,1.6],[6.2,1.6],[7,8.2],[-7,8.2]], h.armor(kilt, shade(kilt, -.45))); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-.4, 1.6, .8, 6.6); // the wrapped kilt
    poly(ctx, [[-6,-6],[6,-6],[5.6,2],[-5.6,2]], h.armor(shade(sk, .12), shade(sk, -.35))); // bare chest
    ctx.fillStyle = 'rgba(200,120,50,.75)'; for (let i = 0; i < 3; i++) ctx.fillRect(-5, -4.6 + i*2.2, 10, .7); ctx.fillStyle = 'rgba(230,220,200,.55)'; ctx.fillRect(-.4, -5.6, .8, 7); // ochre bars, a white stripe down the breastbone
    ctx.fillStyle = sk; ctx.fillRect(-8.6, -5, 2.4, 6.6); ctx.fillRect(6.2, -5, 2.4, 6);
    if (!spear) B2F.curved(ctx, '#c0b8a8', .9); // a short curved blade
    ctx.beginPath(); ctx.ellipse(-8.2, -.6, 3.8, 4.6, 0, 0, 7); ctx.fillStyle = h.armor('#8a6a44', '#3a2614'); ctx.fill(); ctx.strokeStyle = '#1a1208'; ctx.lineWidth = .8; ctx.stroke(); ctx.fillStyle = 'rgba(230,220,200,.5)'; ctx.fillRect(-9.6, -2.2, 2.8, .7); ctx.fillRect(-9.6, .4, 2.8, .7); // a hide shield, painted
    h.head(sk, 4.4, -11.2); ctx.fillStyle = 'rgba(230,220,200,.7)'; ctx.fillRect(-3.2, -12.2, 7.4, 1.4); h.look('rgba(16,8,4,.95)', -11.8); // a bar of white paint across the eyes
    ctx.fillStyle = '#140c08'; ctx.beginPath(); ctx.arc(0, -13, 4.6, Math.PI, 0); ctx.fill(); ell(ctx, -.4, -17.4, 2.2, 1.8, '#140c08'); ctx.fillStyle = '#b87a3a'; ctx.fillRect(-1.6, -16.2, 2.6, .7); // hair knotted up, tied
    ctx.restore(); },
  /* an old Crow pilgrim: bent, in Wickan black gone grey with wear, white braids, a walking stick, a small clay lamp in the other hand */
  b4_c2_pilgrim(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .9, .88); const lit = o.still ? 1 : .85 + Math.sin(t/180 + (o.phase || 0))*.15;
    ctx.translate(0, 1); ctx.rotate(.06);
    B2F.line(ctx, '#6a5a44', 1.2, [[7.4, 12.6], [6.2, -8]]); ell(ctx, 6.2, -8.4, 1, .8, '#8a7656'); // the stick
    h.legs('#2a2622'); B2F.robe(ctx, h, '#4a4644', '#1a1818', 6.2, 7.8); ctx.fillStyle = 'rgba(200,190,170,.14)'; ctx.fillRect(-6.8, 9.6, 13.6, .8); // the black robe, gone grey
    ctx.fillStyle = 'rgba(200,180,140,.35)'; for (let i = 0; i < 5; i++) ctx.fillRect(-5 + i*2.2, -5.2, .5, 1.6); // faded beadwork at the yoke
    ctx.fillStyle = '#8a6a50'; ctx.fillRect(-8.2, -2, 2.2, 5); ell(ctx, -7.2, 4, 2, 1.1, '#6a4a2e'); // a hand, and the lamp in it
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, -7.2, 2.6, 6, '#ffb060', .5*lit); ctx.globalCompositeOperation = 'source-over'; ell(ctx, -7.2, 2.8, .8, 1.2, `rgba(255,220,150,${.9*lit})`);
    h.head('#8a6a50', 4.2, -10.8); h.look('rgba(30,20,14,.8)', -11); ctx.fillStyle = 'rgba(60,40,30,.4)'; ctx.fillRect(-2.6, -8.6, 6, .6); ctx.fillRect(-2, -12.8, 5, .5); // lines, a mouth gone thin
    B2F.cap(ctx, '#d8d2c6', 4.5, -12.2); B2F.braids(ctx, '#dcd6ca', 11, -12); ctx.fillStyle = '#0c0a0e'; ctx.fillRect(3.9, -1.4, 1.6, 2); // white braids, a black feather tied at one end
    ctx.restore(); },
  /* Temul a year on from the Chain: a boy in Wickan horsehide with ash under the eyes for the dead, braids copper-tied, and a Malazan
     sword at his hip much too long for him, its scabbard tip near the ground (Book Two's Temul carried a lance; on foot tonight he has none) */
  b4_c2_temul(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .9, .92); const sk = '#8a6448';
    B2F.line(ctx, '#2a1e14', 1.8, [[-5.6, 2.4], [-9.4, 12.4]]); B2F.line(ctx, '#8a7a5a', .6, [[-5.8, 2.6], [-9.2, 11.8]]); ell(ctx, -9.4, 12.4, 1, .8, '#6a5a40'); ctx.fillStyle = '#5a4630'; ctx.fillRect(-6.6, .6, 2.8, 1.4); // the sword, too long, the tip nearly trailing
    h.legs('#2e2418'); ctx.fillStyle = '#4a3a26'; ctx.fillRect(-4.5, 9, 3.4, 4); ctx.fillRect(1.1, 9, 3.4, 4);
    h.torso('#6a4e34', '#22160c', 5.8); ctx.fillStyle = 'rgba(230,220,200,.2)'; [[-3,-2.6],[2.4,0],[-1.4,3.2]].forEach(([x, y]) => ell(ctx, x, y, 1.2, .8, ctx.fillStyle)); // horsehide, a little pied
    ctx.fillStyle = 'rgba(200,180,140,.5)'; for (let i = 0; i < 6; i++) ctx.fillRect(-4.8 + i*1.9, 6, .5, 1.8);
    ctx.fillStyle = '#2a1a0e'; ctx.fillRect(-5.6, 2.8, 11.2, 1.1);
    B2F.line(ctx, '#6a4e34', 1.9, [[5, -4.4], [6.4, 2.6]]); ell(ctx, 6.4, 2.8, 1.1, 1.1, sk); // an arm held straight at his side
    h.head(sk, 4.2, -11.4); h.look('rgba(20,12,8,.9)', -11.8); ctx.fillStyle = '#3a2418'; ctx.fillRect(.6, -8.4, 2.4, .5);
    ctx.fillStyle = 'rgba(30,20,20,.55)'; ctx.fillRect(-1.2, -10.2, 5, .5); // ash under the eyes
    B2F.cap(ctx, '#0e0a08', 4.5, -12.8); B2F.braids(ctx, '#120e0c', 10, -12.6); ctx.fillStyle = '#b87a3a'; ctx.fillRect(-5.5, -3.4, 1.6, .8); ctx.fillRect(3.9, -3.4, 1.6, .8);
    ctx.restore(); },
});

/* ---------------- ground: TILEX ----------------
   b4_c2_way: the Aren Way on Book Two's Odhan hardpan (47b), day or night: '.' the road (pale, rutted, trampled), ',' the verge (Book Two's
     scrub), '#' rock; here also 'T' an empty tree (a dead trunk, the spike holes a dark dot, a braid and a little painted figure on it),
     'P' the same, close to the road, with more on it, 'c' a cart (71b's), 'k' a cairn on the verge, 'm' the last milestone, 'n' a tent,
     'F' the Third's fire (71b's ring), and '<' '>' '^' the road running on.
   b4_c2_fall: the hill by lamplight: '.' trodden earth and the ants' path, ',' old grass with braids on stakes and crow feathers stuck in
     the ground, 'a' an anthill heaped with tokens (blocks), '#' a stone, 'F' a pilgrim's clay lamp on a flat stone, 'v' the path down. */
const b42Lit = '255,160,80', b42Lamp = '255,190,110';
/* the road surface: Book Two's hardpan, paled and rutted along its length (the Way runs east-west across the map) */
function b42Road(ctx, x, y, T, N){ const px = x*T, py = y*T;
  ctx.fillStyle = N ? 'rgba(150,150,170,.07)' : 'rgba(255,240,210,.16)'; ctx.fillRect(px, py, T, T);
  ctx.strokeStyle = N ? 'rgba(0,0,0,.3)' : 'rgba(110,84,52,.34)'; ctx.lineWidth = Math.max(1, T*.05); for (const v of [.3, .7]) { ctx.beginPath(); ctx.moveTo(px, py + T*(v + (hash(x, y, 70) - .5)*.04)); ctx.lineTo(px + T, py + T*(v + (hash(x + 1, y, 70) - .5)*.04)); ctx.stroke(); } // wheel ruts
  ctx.fillStyle = N ? 'rgba(10,10,14,.35)' : 'rgba(100,76,48,.28)'; for (let i = 0; i < 5; i++) ell(ctx, px + hash(x, y, i + 71)*T, py + hash(y, x, i + 72)*T, T*.05, T*.03, ctx.fillStyle); } // hoof and boot prints
/* an empty tree: a dead trunk gone silver, lopped, a crossbar, two dark dots high up and a stain below; a braid and a little painted
   soldier nailed to the bark where a man was. 'P': nearer the road, with more on it */
function b42Tree(ctx, x, y, T, N, more){ const px = x*T, py = y*T, cx = px + T*(.5 + (hash(x, y, 80) - .5)*.12), base = py + T*.92, top = py + T*.04, h = hash(x, y, 81);
  ell(ctx, cx + T*.18, base, T*.32, T*.08, N ? 'rgba(0,0,0,.5)' : 'rgba(60,40,24,.4)');
  const g = ctx.createLinearGradient(cx - T*.1, 0, cx + T*.1, 0); g.addColorStop(0, N ? '#5a5a66' : '#d8d0bc'); g.addColorStop(.6, N ? '#34343e' : '#9a9282'); g.addColorStop(1, N ? '#1c1c24' : '#5a5448'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(cx - T*.1, base); ctx.lineTo(cx - T*.07, top + T*.1); ctx.lineTo(cx - T*.02, top); ctx.lineTo(cx + T*.06, top + T*.06); ctx.lineTo(cx + T*.09, base); ctx.closePath(); ctx.fill(); // the trunk
  ctx.fillRect(cx - T*.34, top + T*.18, T*.68, T*.07); ctx.fillStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(60,50,40,.35)'; ctx.fillRect(cx - T*.34, top + T*.23, T*.68, T*.02); // the crossbar
  if (h > .4) { B2F.line(ctx, N ? '#2a2a32' : '#7a7262', Math.max(1, T*.035), [[cx + T*.04, top + T*.3], [cx + T*.26, top + T*.14]]); } // a lopped branch
  ctx.fillStyle = N ? '#0a0a0e' : '#2a2018'; ell(ctx, cx - T*.24, top + T*.22, T*.022, T*.022, ctx.fillStyle); ell(ctx, cx + T*.24, top + T*.22, T*.022, T*.022, ctx.fillStyle); ell(ctx, cx, py + T*.62, T*.022, T*.022, ctx.fillStyle); // the holes
  ctx.fillStyle = N ? 'rgba(20,10,10,.3)' : 'rgba(90,40,30,.22)'; ctx.fillRect(cx - T*.04, py + T*.64, T*.07, T*.2); // and the stain, faint
  const braid = (bx, by, len) => { ctx.strokeStyle = N ? '#5a3a30' : '#a8302a'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(bx, by); for (let k = 1; k <= 4; k++) ctx.lineTo(bx + (k % 2 ? 1 : -1)*T*.02, by + len*k/4); ctx.stroke(); ctx.strokeStyle = N ? '#2a2420' : '#4a3a2a'; ctx.beginPath(); ctx.moveTo(bx + T*.015, by); for (let k = 1; k <= 4; k++) ctx.lineTo(bx + (k % 2 ? -1 : 1)*T*.02 + T*.015, by + len*k/4); ctx.stroke(); };
  braid(cx - T*.18, top + T*.26, T*.22); if (more) braid(cx + T*.2, top + T*.26, T*.26);
  const fig = (fx, fy) => { ctx.fillStyle = N ? '#3a3a40' : '#8a8478'; ctx.fillRect(fx - T*.035, fy, T*.07, T*.1); ctx.fillStyle = N ? '#6a4a40' : '#c87a5a'; ell(ctx, fx, fy - T*.025, T*.028, T*.028, ctx.fillStyle); ctx.fillStyle = N ? '#2a2a30' : '#5a5a5a'; ctx.fillRect(fx - T*.035, fy + T*.1, T*.025, T*.05); ctx.fillRect(fx + T*.01, fy + T*.1, T*.025, T*.05); }; // a little painted soldier: grey tunic, red face
  fig(cx, top + T*.36); if (more) { fig(cx - T*.04, py + T*.36); ctx.strokeStyle = N ? '#1a1a20' : '#2a2a2a'; ctx.lineWidth = 1; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(cx + T*.1, py + T*.3 + k*T*.04); ctx.lineTo(cx + T*.2, py + T*.24 + k*T*.05); ctx.stroke(); } } } // crow feathers tucked in the bark
function b42Cairn(ctx, x, y, T, N){ const px = x*T, py = y*T; ell(ctx, px + T*.56, py + T*.86, T*.38, T*.1, N ? 'rgba(0,0,0,.45)' : 'rgba(60,40,24,.4)');
  [[.3, .8, .2], [.7, .8, .18], [.5, .78, .22], [.4, .6, .17], [.62, .6, .16], [.52, .44, .14], [.5, .3, .1]].forEach(([u, v, r], i) => { ell(ctx, px + T*u, py + T*v, T*r, T*r*.72, N ? (i % 2 ? '#2e2e36' : '#3a3a44') : (i % 2 ? '#a08a68' : '#b89c78')); ell(ctx, px + T*(u - r*.3), py + T*(v - r*.3), T*r*.5, T*r*.3, N ? 'rgba(160,170,210,.12)' : 'rgba(255,244,220,.35)'); });
  ctx.strokeStyle = N ? '#5a3a30' : '#a8302a'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(px + T*.5, py + T*.22); ctx.lineTo(px + T*.46, py + T*.4); ctx.stroke(); } // a braid on top
function b42Mile(ctx, x, y, T, N){ const px = x*T, py = y*T; ell(ctx, px + T*.56, py + T*.86, T*.32, T*.09, N ? 'rgba(0,0,0,.45)' : 'rgba(60,40,24,.4)');
  const g = ctx.createLinearGradient(px + T*.25, 0, px + T*.75, 0); g.addColorStop(0, N ? '#4a4a54' : '#b4ac9c'); g.addColorStop(1, N ? '#24242c' : '#6a6458'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(px + T*.28, py + T*.86); ctx.lineTo(px + T*.3, py + T*.3); ctx.quadraticCurveTo(px + T*.5, py + T*.16, px + T*.7, py + T*.3); ctx.lineTo(px + T*.7, py + T*.5); ctx.lineTo(px + T*.6, py + T*.44); ctx.lineTo(px + T*.72, py + T*.86); ctx.closePath(); ctx.fill(); // the stone, a corner knocked off
  ctx.fillStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(40,30,20,.5)'; [[.38, .42], [.46, .42], [.38, .56], [.5, .56]].forEach(([u, v]) => ctx.fillRect(px + T*u, py + T*v, T*.06, T*.08)); // numerals, half gone
  ell(ctx, px + T*.8, py + T*.84, T*.08, T*.04, N ? '#3a3a44' : '#9a9484'); } // the chip at its foot
function b42Tent(ctx, x, y, T, N){ const px = x*T, py = y*T; ell(ctx, px + T*.55, py + T*.9, T*.46, T*.1, 'rgba(0,0,0,.45)');
  poly(ctx, [[px + T*.04, py + T*.9], [px + T*.5, py + T*.14], [px + T*.96, py + T*.9]], N ? '#3a3630' : '#a8987a'); poly(ctx, [[px + T*.5, py + T*.14], [px + T*.96, py + T*.9], [px + T*.62, py + T*.9]], N ? '#24221e' : '#7a6c54');
  poly(ctx, [[px + T*.4, py + T*.9], [px + T*.5, py + T*.5], [px + T*.6, py + T*.9]], N ? '#0c0a08' : '#2a2218'); ctx.fillStyle = N ? 'rgba(160,170,210,.1)' : 'rgba(255,246,220,.3)'; ctx.fillRect(px + T*.48, py + T*.14, T*.04, T*.7); } // a Malazan tent, its door
/* the ruts run only along the Way itself: the rows next to a row with an edge of the road on it ('<' or '>') */
const b42OnWay = y => !!tileMap && [-1, 0, 1].some(d => /[<>]/.test(tileMap[y + d] || ''));
TILEX.b4_c2_way = (ctx, ch, x, y, T, dark) => { const N = !!dark, base = TILEX[N ? 'odhan_night' : 'odhan'];
  if (ch === '#') return base(ctx, '#', x, y, T, dark);
  if (ch === ',' ) { base(ctx, ',', x, y, T, dark); if (N) b2Clip(ctx, x, y, T, () => b2Firelit(ctx, x, y, T, .3, 3.6, b42Lit)); return; }
  base(ctx, '.', x, y, T, dark);
  b2Clip(ctx, x, y, T, () => {
    if ('.<>^vF'.includes(ch) && b42OnWay(y)) b42Road(ctx, x, y, T, N);
    if (N) b2Firelit(ctx, x, y, T, .34, 3.6, b42Lit);
    if (ch === 'T' || ch === 'P') b42Tree(ctx, x, y, T, N, ch === 'P');
    else if (ch === 'c') b41Cart(ctx, x, y, T, N);
    else if (ch === 'k') b42Cairn(ctx, x, y, T, N);
    else if (ch === 'm') b42Mile(ctx, x, y, T, N);
    else if (ch === 'n') b42Tent(ctx, x, y, T, N);
    else if (ch === 'F') b41YardFire(ctx, x, y, T, 0); }); };
/* the hill by lamplight: dusty earth gone blue, the ants a dark shine on the path, braids on stakes, feathers in the ground */
const b42HN = {earth:'#2e2a2a', earthL:'#3c3634', grass:'#2a2c26', stone:'#3a3a40', stoneL:'#52525a', stoneD:'#1a1a1e', lit:'160,160,190'};
function b42Stake(ctx, bx, by, T, s, h){ B2F.line(ctx, '#2a2420', Math.max(1, T*.03), [[bx, by], [bx + T*.01, by - T*.3*s]]);
  ctx.strokeStyle = h > .5 ? '#7a2a24' : '#1a1416'; ctx.lineWidth = Math.max(1, T*.022); ctx.beginPath(); ctx.moveTo(bx + T*.01, by - T*.28*s); for (let k = 1; k <= 4; k++) ctx.lineTo(bx + T*.01 + (k % 2 ? 1 : -1)*T*.018 + T*.03*k/4, by - T*.28*s + T*.07*k*s); ctx.stroke(); } // a stake, a braid off it
function b42Feathers(ctx, px, py, T, n, seed){ ctx.strokeStyle = '#0c0a10'; ctx.lineWidth = Math.max(1, T*.03); for (let i = 0; i < n; i++) { const fx = px + hash(seed, i, 1)*T, fy = py + T*(.5 + hash(seed, i, 2)*.45); ctx.beginPath(); ctx.moveTo(fx, fy); ctx.quadraticCurveTo(fx - T*.02, fy - T*.08, fx + T*.02, fy - T*.17); ctx.stroke(); } }
function b42Hill(ctx, ch, x, y, T){ const px = x*T, py = y*T, P = b42HN, h = hash(x, y, 90);
  ctx.fillStyle = ch === ',' ? P.grass : P.earth; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .03, .18, P.lit, 1.2);
  if (ch === '.' || ch === 'v') { ctx.fillStyle = 'rgba(200,190,170,.06)'; ctx.fillRect(px + T*.15, py, T*.7, T); // the path, trodden paler
    ctx.fillStyle = 'rgba(10,6,6,.6)'; for (let i = 0; i < 26; i++) ctx.fillRect(px + T*(.3 + hash(x, y, i + 100)*.4), py + hash(y, x, i + 101)*T, Math.max(1, T*.025), Math.max(1, T*.015)); } // the ants, in a river
  if (ch === ',') { ctx.strokeStyle = 'rgba(90,92,70,.5)'; ctx.lineWidth = 1; for (let i = 0; i < 6; i++) { const gx = px + hash(x, y, i + 110)*T, gy = py + T*(.3 + hash(y, x, i + 111)*.6); ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + (hash(x, y, i + 112) - .5)*T*.08, gy - T*.12); ctx.stroke(); } // old grass
    if (h > .35) b42Stake(ctx, px + T*(.25 + hash(x, y, 113)*.5), py + T*(.7 + hash(x, y, 114)*.2), T, 1, hash(x, y, 115));
    if (h < .6) b42Feathers(ctx, px, py, T, 2 + Math.floor(hash(x, y, 116)*3), x*31 + y);
    if (h > .8) { ell(ctx, px + T*.66, py + T*.4, T*.07, T*.05, '#d8d0c0'); ctx.fillStyle = '#1a1412'; ctx.fillRect(px + T*.63, py + T*.39, T*.02, T*.02); ctx.fillRect(px + T*.68, py + T*.39, T*.02, T*.02); } } // a small dog skull, white, far off
  if (ch === 'a') { ell(ctx, px + T*.55, py + T*.86, T*.42, T*.1, 'rgba(0,0,0,.5)'); // an anthill, heaped with what the pilgrims left
    const g = ctx.createRadialGradient(px + T*.4, py + T*.45, T*.04, px + T*.5, py + T*.6, T*.45); g.addColorStop(0, '#5a4a3c'); g.addColorStop(1, '#241c16'); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(px + T*.08, py + T*.88); ctx.quadraticCurveTo(px + T*.3, py + T*.2, px + T*.52, py + T*.18); ctx.quadraticCurveTo(px + T*.76, py + T*.24, px + T*.94, py + T*.88); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(10,6,6,.6)'; for (let i = 0; i < 18; i++) ctx.fillRect(px + T*(.2 + hash(x, y, i + 120)*.6), py + T*(.3 + hash(y, x, i + 121)*.55), Math.max(1, T*.022), Math.max(1, T*.014)); // ants on it
    [[.3, .66, '#b8903a'], [.6, .5, '#c8a050'], [.7, .74, '#8a7a6a'], [.44, .4, '#d8d0c0']].forEach(([u, v, c]) => ell(ctx, px + T*u, py + T*v, T*.045, T*.03, c)); // tokens: copper, clay, bone
    b42Stake(ctx, px + T*.5, py + T*.24, T, .8, .7); b42Feathers(ctx, px + T*.2, py - T*.15, T*.6, 2, x*7 + y*13); }
  if (ch === '#') { ell(ctx, px + T*.58, py + T*.84, T*.4, T*.1, 'rgba(0,0,0,.5)'); const g = ctx.createLinearGradient(px, py, px + T, py + T); g.addColorStop(0, P.stoneL); g.addColorStop(.5, P.stone); g.addColorStop(1, P.stoneD); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(px + T*.08, py + T*.86); ctx.lineTo(px + T*.14, py + T*.32); ctx.quadraticCurveTo(px + T*.5, py + T*.14, px + T*.86, py + T*.3); ctx.lineTo(px + T*.92, py + T*.86); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(170,170,210,.12)'; ctx.fillRect(px + T*.18, py + T*.3, T*.5, Math.max(1, T*.03)); if (h > .5) b42Stake(ctx, px + T*.7, py + T*.3, T, .7, h); }
  if (ch === 'F') { ell(ctx, px + T*.5, py + T*.72, T*.26, T*.1, '#3a3a40'); ell(ctx, px + T*.5, py + T*.68, T*.24, T*.08, '#4a4a52'); // a flat stone, a clay lamp on it, and what the pilgrims brought round it
    ell(ctx, px + T*.5, py + T*.62, T*.1, T*.05, '#7a5a3a'); ell(ctx, px + T*.5, py + T*.57, T*.03, T*.05, 'rgba(255,230,160,.95)');
    [[.3, .7, '#a8302a'], [.72, .68, '#d8d0c0'], [.62, .78, '#c8a050']].forEach(([u, v, c]) => ell(ctx, px + T*u, py + T*v, T*.04, T*.025, c)); }
  b2Firelit(ctx, x, y, T, .32, 3.2, b42Lamp); }
TILEX.b4_c2_fall = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b42Hill(ctx, ch === 't' ? ',' : ch, x, y, T));
/* a battle's low cover: on the Way a cart (Book One's crates would be wrong on a desert road); on the hill a heap of tokens round a stake */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b4_c2_way') return b2Clip(ctx, x, y, T, () => b41Cart(ctx, x, y, T, !!dark));
    if (ch === 't' && style === 'b4_c2_fall') return b2Clip(ctx, x, y, T, () => b42Hill(ctx, 'a', x, y, T));
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* an empty tree seen at a distance, for the backdrops: a dead trunk, a crossbar, a braid hanging, and (near) a little pale figure on it */
function b42FarTree(x, cx, by, hh, col, lit, braid, fig){ const w = hh*.4; x.fillStyle = col; x.fillRect(cx - hh*.035, by - hh, Math.max(.7, hh*.07), hh); x.fillRect(cx - w, by - hh*.92, w*2, Math.max(.6, hh*.05)); // trunk, crossbar
  if (lit) { x.fillStyle = lit; x.fillRect(cx - hh*.035, by - hh, Math.max(.4, hh*.02), hh); }
  if (braid) { x.fillStyle = braid; x.fillRect(cx - w*.7, by - hh*.88, Math.max(.5, hh*.03), hh*.22); x.fillRect(cx + w*.6, by - hh*.88, Math.max(.5, hh*.03), hh*.16); }
  if (fig) { x.fillStyle = fig; x.fillRect(cx - hh*.04, by - hh*.7, hh*.08, hh*.12); x.fillStyle = 'rgba(200,110,80,.8)'; x.fillRect(cx - hh*.03, by - hh*.75, hh*.06, hh*.05); } }
/* a column of small soldiers going away up a road: ranks of four in file, from near (d = 1, low on the picture) to the vanishing point,
   smaller and paler with distance, spear-points catching the light, and gaps between the companies */
function b42Column(x, vx, hz, y1, x1, n, s1, seed, dusk){ for (let i = n - 1; i >= 0; i--) { const d = Math.pow(i/(n - 1), 1.7), py = lerp(hz + 1, y1, d), px = lerp(vx, x1, d), s = .35 + d*s1;
  if (hash(i, 0, seed) > .9) continue; // a gap between companies
  const fade = clamp(.35 + d*.6, 0, 1), col = dusk ? `rgba(30,26,28,${fade.toFixed(2)})` : `rgba(${Math.round(lerp(150, 64, d))},${Math.round(lerp(136, 56, d))},${Math.round(lerp(118, 48, d))},${fade.toFixed(2)})`;
  for (let j = 0; j < 4; j++) { const sx = px + (j - 1.5)*2.1*s + (hash(i, j, seed + 1) - .5)*.5*s;
    x.fillStyle = col; x.fillRect(sx - .55*s, py - 3.4*s, 1.1*s, 3.4*s); ell(x, sx, py - 3.9*s, .55*s, .5*s, col);
    if (!dusk) { x.fillStyle = `rgba(250,244,226,${(fade*.8).toFixed(2)})`; x.fillRect(sx - .5*s, py - 4.3*s, 1*s, .45*s); }
    if (hash(i, j, seed + 2) > .55) { x.fillStyle = col; x.fillRect(sx + .55*s, py - 6.6*s, .3*s, 3.4*s); } } } }
/* the Way in perspective, from the column, running away north between the trees */
const b42P = (W, H, vx, hz, side, k) => { const z = 1/(.12 + k*1.6); return [vx + side*W*.07*z, hz + H*.032*z*.5, z]; };

/* the empty trees: the Aren Way by day, the column going north under them in its own dust; every tree empty, every tree hung with
   something; a hot white sky, the trees silvered, braids red and dark, little painted soldiers on the near ones */
SCENEX.b4_c2_trees = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, vx = W*.52;
  ctx.drawImage(sceneLayer('b42:trees', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#8aa0b8'],[.5,'#d6ccb4'],[1,'#ecdcb8']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.24, hz*.3, W*.5, '#fff4dc', .45); // a hot white morning
    for (let i = 0; i < 3; i++) cloud(x, W*(.3 + i*.24), hz*(.22 + i*.1), W*.24, 2, '#ffffff', .1);
    x.fillStyle = 'rgba(170,150,120,.5)'; x.fillRect(0, hz - 2, W, 3); for (let i = 0; i < 9; i++) { const hx = hash(i, 901)*W; x.beginPath(); x.ellipse(hx, hz, W*(.05 + hash(i, 902)*.08), H*(.012 + hash(i, 903)*.02), 0, Math.PI, 0); x.fill(); } // the low hills far off
    x.fillStyle = vgrad(x, hz, H, [[0,'#c8b48c'],[.4,'#b49c74'],[1,'#7a6448']]); x.fillRect(0, hz, W, H - hz);
    x.beginPath(); x.moveTo(vx - 1, hz); x.lineTo(vx + 1, hz); x.lineTo(vx + W*.36, H); x.lineTo(vx - W*.4, H); x.closePath(); x.fillStyle = vgrad(x, hz, H, [[0,'rgba(236,222,190,.6)'],[1,'rgba(200,176,136,.7)']]); x.fill(); // the road, pale
    for (let i = 0; i < 40; i++) { const yy = hz + 2 + Math.pow(hash(i, 904), 1.4)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(110,84,52,${(.12 + d*.2).toFixed(2)})`; x.fillRect(hash(i, 905)*W, yy, 2 + d*14, .6 + d); } // ruts and scuffs
    // the trees, both sides, to the end of the road; empty; the near ones hung with braids and painted figures
    for (const side of [-1, 1]) for (let i = 36; i >= 0; i--) { const k = i/36, [px0, py, z] = b42P(W, H, vx, hz, side, k), px = px0 + side*hash(i, side + 910)*W*.01*z, hh = H*.034*z, a = clamp(.25 + (1 - k)*.75, 0, 1);
      if (px < -W*.1 || px > W*1.1) continue;
      b42FarTree(x, px, py, hh, `rgba(${Math.round(lerp(196, 120, k))},${Math.round(lerp(186, 116, k))},${Math.round(lerp(166, 108, k))},${a.toFixed(2)})`, k < .5 ? 'rgba(255,250,236,.55)' : null, k < .7 ? `rgba(150,40,30,${a.toFixed(2)})` : null, k < .3 ? 'rgba(110,110,110,.9)' : null);
      if (k < .3) { x.fillStyle = 'rgba(30,24,20,.7)'; const w = hh*.4; x.fillRect(px - w*.72, py - hh*.9, Math.max(.6, hh*.025), Math.max(.6, hh*.025)); x.fillRect(px + w*.72, py - hh*.9, Math.max(.6, hh*.025), Math.max(.6, hh*.025)); } } // the holes, a dot, on the near ones
    // the column, going away up the road: the 8th ahead, the 9th, and the wagons far up
    b42Column(x, vx, hz, H*.84, vx - W*.02, 34, 1.5, 911);
  }), 0, 0, W, H);
  for (let i = 0; i < 6; i++) { const k = ((t*mo/30000 + i/6) % 1); glow(ctx, lerp(-W*.2, W*1.2, k), hz + H*(.01 + (i % 3)*.03), W*.2, '#e8d8b4', .16*Math.sin(k*Math.PI) + (mo ? 0 : .05)); } // the column's dust, drifting
  for (let i = 0; i < 3; i++) { const side = i % 2 ? 1 : -1, k = .04 + i*.04, [px, py, z] = b42P(W, H, vx, hz, side, k), hh = H*.034*z, sw = mo ? Math.sin(t/700 + i)*hh*.03 : 0; ctx.fillStyle = 'rgba(160,40,30,.9)'; ctx.fillRect(px - hh*.28 + sw, py - hh*.88, Math.max(.8, hh*.035), hh*.24); } // a braid moving in the wind, near
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.3 + i*Math.min(28, W*.42/sq.length), H*.97 - (i % 2)*2, 2, t, {phase:i, dir:1}));
  vign(ctx, W, H, .42, .5); };

/* Coltaine's Fall: a low long hill above the Way grown a pelt of braids and stakes and feathers, the pilgrims' lamps going up it, the
   dark river of the ants on the path, Aren's walls low and pale behind; at dusk until the robbers are gone, then the night, all lamps */
SCENEX.b4_c2_fall = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.6, f = (S && S.f) || {}, night = (f.b4_c2_ph || 0) >= 3, fl = b2Fl(t);
  const crest = u => hz - H*(.26*Math.pow(Math.sin(clamp((u - .08)/.84, 0, 1)*Math.PI), .55)) + Math.sin(u*31)*H*.004; // the hill's back against the sky
  ctx.drawImage(sceneLayer('b42:fall' + (night ? 'n' : 'd'), W, H, (x, W, H) => {
    x.fillStyle = night ? vgrad(x, 0, hz, [[0,'#070a16'],[.7,'#141a2e'],[1,'#22263a']]) : vgrad(x, 0, hz, [[0,'#3a3a5a'],[.45,'#8a6a6a'],[.8,'#d08a5a'],[1,'#e8a860']]); x.fillRect(0, 0, W, hz + 2);
    if (night) for (let i = 0; i < 90; i++) { x.fillStyle = `rgba(220,226,250,${(.15 + hash(i, 921)*.5).toFixed(2)})`; x.fillRect(hash(i, 922)*W, Math.pow(hash(i, 923), 1.3)*hz*.8, 1, 1); }
    else { glow(x, W*.16, hz*.92, W*.45, '#ffb060', .5); glow(x, W*.16, hz*.94, 16, '#fff0c0', .8); } // the sun going down on the left
    // Aren's walls, low and pale on the left behind the hill, near enough to see the towers
    { const wb = hz + H*.01, wx0 = 0, wx1 = W*.3; x.fillStyle = night ? '#1c1e2a' : 'rgba(180,150,130,.8)'; x.fillRect(wx0, wb - H*.04, wx1 - wx0, H*.04); for (let i = 0; i < 6; i++) x.fillRect(wx0 + i*W*.055, wb - H*.065, W*.02, H*.065); for (let i = 0; i < 30; i++) x.fillRect(wx0 + i*W*.01, wb - H*.046, W*.005, H*.006);
      if (night) for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(255,190,110,.8)'; x.fillRect(W*(.03 + i*.055), wb - H*.05, 1.4, 1.4); } }
    // the hill, and its pelt
    x.beginPath(); x.moveTo(0, H); x.lineTo(0, hz + 2); for (let i = 0; i <= 60; i++) { const u = i/60; x.lineTo(u*W, crest(u)); } x.lineTo(W, hz + 2); x.lineTo(W, H); x.closePath(); x.fillStyle = night ? vgrad(x, hz - H*.26, H, [[0,'#1e1c22'],[1,'#0c0a0e']]) : vgrad(x, hz - H*.26, H, [[0,'#6a5444'],[1,'#2a2018']]); x.fill();
    if (!night) { x.save(); x.clip(); const g = x.createLinearGradient(0, 0, W*.5, 0); g.addColorStop(0, 'rgba(255,170,90,.3)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, hz - H*.3, W*.6, H*.4); x.restore(); } // the low sun on its left flank
    for (let i = 0; i < 260; i++) { const u = hash(i, 924), cy = crest(u), d = hash(i, 925), py = lerp(cy + 1, H*.95, Math.pow(d, 1.6)), s = .5 + (py - hz + H*.26)/H*2.2; if (py > H*.92) continue; // stakes with braids, feathers, dog skulls, all over it
      const kind = hash(i, 926); x.fillStyle = night ? 'rgba(10,8,12,.9)' : 'rgba(34,24,20,.9)';
      if (kind < .45) { x.fillRect(u*W, py - 5*s, Math.max(.5, .5*s), 5*s); x.fillStyle = night ? 'rgba(90,40,36,.8)' : 'rgba(150,40,30,.85)'; x.fillRect(u*W + .4*s, py - 4.6*s, Math.max(.5, .5*s), 2.6*s); } // a stake, a braid
      else if (kind < .8) { x.strokeStyle = x.fillStyle; x.lineWidth = Math.max(.5, .4*s); x.beginPath(); x.moveTo(u*W, py); x.quadraticCurveTo(u*W - .4*s, py - 2*s, u*W + .4*s, py - 3.6*s); x.stroke(); } // a crow feather stuck upright
      else { ell(x, u*W, py - .6*s, .9*s, .6*s, night ? 'rgba(150,150,160,.5)' : 'rgba(220,210,190,.85)'); } } // a small skull, white
    // the path, and the ants on it: a dark shine up the hill
    { x.strokeStyle = night ? 'rgba(160,150,140,.12)' : 'rgba(220,190,150,.3)'; x.lineWidth = H*.03; x.beginPath(); x.moveTo(W*.66, H); x.quadraticCurveTo(W*.56, hz + H*.1, W*.5, crest(.5) + 2); x.stroke(); x.strokeStyle = night ? 'rgba(0,0,0,.4)' : 'rgba(20,10,6,.5)'; x.lineWidth = H*.008; x.stroke(); }
    // a bare place near the top that the pilgrims keep back from (nothing else: no body, no cross)
    { const bx = W*.54, by = crest(.54) + H*.012; ell(x, bx, by, W*.05, H*.012, night ? 'rgba(60,56,60,.6)' : 'rgba(140,110,86,.6)'); }
    if (!night) for (let i = 0; i < 4; i++) { const tx = W*(.82 + i*.04), ty = H*.92 + (i % 2)*2; b42FarTree(x, tx, ty, H*.2, '#4a4038', 'rgba(255,190,120,.2)', 'rgba(140,40,30,.9)', i === 1 ? 'rgba(120,120,120,.9)' : null); } // the Way's trees, near, on the right
  }), 0, 0, W, H);
  // the pilgrims' lamps: a slow line going up the path at dusk; scattered all over the hill at night; a few with small dark people beside
  const lamps = night ? 22 : 9; ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < lamps; i++) { let lx, ly; if (night) { const u = .16 + hash(i, 931)*.72, cy = crest(u); lx = u*W; ly = lerp(cy + H*.02, H*.86, Math.pow(hash(i, 932), 1.3)); } else { const k = mo ? ((t/60000 + i/lamps) % 1) : i/lamps; lx = lerp(W*.66, W*.5, Math.sqrt(k)); ly = lerp(H*.98, crest(.5) + 4, k); }
    const ff = mo ? .8 + .2*Math.sin(t/(120 + i*13) + i) : 1; glow(ctx, lx, ly, H*(night ? .07 : .05), '#ffa050', .35*ff); glow(ctx, lx, ly, 2.4, '#ffe0a0', .95*ff); }
  ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < (night ? 10 : 6); i++) { let lx, ly; if (night) { const u = .16 + hash(i, 931)*.72, cy = crest(u); lx = u*W + 3; ly = lerp(cy + H*.02, H*.86, Math.pow(hash(i, 932), 1.3)) + 1; } else { const k = mo ? ((t/60000 + i/9) % 1) : i/9; lx = lerp(W*.66, W*.5, Math.sqrt(k)) + 3; ly = lerp(H*.98, crest(.5) + 4, k) + 1; }
    const s = .6 + (ly - hz + H*.26)/H*1.6; ctx.fillStyle = '#0a080a'; ctx.fillRect(lx - 1*s, ly - 4*s, 2*s, 4*s); ell(ctx, lx, ly - 4.8*s, .9*s, .9*s, '#0a080a'); B2F.line(ctx, '#0a080a', .5*s, [[lx + 1*s, ly], [lx + 1.6*s, ly - 5*s]]); } // old people with sticks
  if (!night && !f.b4_c2_robbersDone) { ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 3; i++) { const lx = W*(.56 + i*.04), ly = crest(.56 + i*.04) - 1, on = mo ? (Math.sin(t/300 + i*2) > -.3 ? 1 : .2) : 1; glow(ctx, lx, ly, 6, '#ffd080', .4*on); } ctx.globalCompositeOperation = 'source-over'; // shuttered lanterns at the crest, and men bending
    for (let i = 0; i < 5; i++) { const sx = W*(.54 + i*.022), sy = crest(.54 + i*.022) + 1, b = mo ? Math.sin(t/400 + i)*1.2 : 0; ctx.fillStyle = '#0c0808'; ctx.fillRect(sx - 1.2, sy - 5 + Math.max(0, b), 2.4, 5 - Math.max(0, b)); ell(ctx, sx + (b > 0 ? 1 : 0), sy - 5.6 + Math.max(0, b)*1.3, 1.1, 1.1, '#0c0808'); } }
  if (!night) b2Wheel(ctx, t*mo, W*.55, crest(.55) - H*.12, W*.12, H*.04, 5, .6, 'rgba(14,10,16,.85)', 933); // crows over the crest
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.06 + i*Math.min(26, W*.32/sq.length), H*.97 - (i % 2)*2, 1.9, t, {phase:i, dir:1}));
  if (night) { ctx.fillStyle = 'rgba(6,8,18,.3)'; ctx.fillRect(0, H*.88, W, H*.12); }
  vign(ctx, W, H, night ? .78 : .55, .5); };

/* the standard: the column from behind on the Way, a long way of it, and far up at the head, past the riders, a tall thin figure of
   wired pale bones on a pole holding up a bone, a smudge of sand behind it; noon haze; the trees along both sides */
SCENEX.b4_c2_standard = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.52, vx = W*.6;
  ctx.drawImage(sceneLayer('b42:standard', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#90a4ba'],[.55,'#dcd0b4'],[1,'#eedcb4']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.4, hz*.2, W*.6, '#fff8e4', .5);
    x.fillStyle = vgrad(x, hz, H, [[0,'#c8b48c'],[.5,'#a88e66'],[1,'#6e5840']]); x.fillRect(0, hz, W, H - hz);
    x.beginPath(); x.moveTo(vx - 1, hz); x.lineTo(vx + 1, hz); x.lineTo(vx + W*.3, H); x.lineTo(vx - W*.46, H); x.closePath(); x.fillStyle = 'rgba(232,214,180,.5)'; x.fill();
    for (const side of [-1, 1]) for (let i = 30; i >= 0; i--) { const k = i/30, [px, py, z] = b42P(W, H, vx, hz, side, k), hh = H*.03*z, a = clamp(.2 + (1 - k)*.7, 0, 1); if (px < -W*.1 || px > W*1.1) continue;
      b42FarTree(x, px, py, hh, `rgba(${Math.round(lerp(180, 130, k))},${Math.round(lerp(170, 124, k))},${Math.round(lerp(150, 112, k))},${a.toFixed(2)})`, null, k < .6 ? `rgba(150,40,30,${a.toFixed(2)})` : null, null); }
    b42Column(x, vx, hz, H*.86, vx - W*.08, 40, 1.6, 941);
    for (let i = 0; i < 7; i++) { const rx = vx - W*.01 + i*W*.006, ry = hz + H*.006; x.fillStyle = 'rgba(70,62,56,.85)'; x.fillRect(rx - 1.6, ry - 2, 3.2, 1.4); x.fillRect(rx - .4, ry - 3.6, .8, 1.6); } // the riders at the head
  }), 0, 0, W, H);
  // the standard itself, catching the light, very small: a pole, a thin figure of pale wired bones holding a bone up, a smear of sand behind
  { const sx = vx + W*.004, sy = hz + 1, sh = H*.22, sw = mo ? Math.sin(t/900)*.8 : 0;
    ctx.fillStyle = 'rgba(196,164,112,.42)'; ctx.beginPath(); ctx.ellipse(sx + sh*.12, sy - sh*.78, sh*.34, sh*.22, -.35, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(214,186,136,.35)'; ctx.beginPath(); ctx.ellipse(sx + sh*.2, sy - sh*.86, sh*.22, sh*.14, -.5, 0, 7); ctx.fill(); // the sandstorm behind it, worked in
    glow(ctx, sx, sy - sh*.8, sh*.4, '#fff8e0', .3);
    ctx.fillStyle = '#3a3028'; ctx.fillRect(sx - .7, sy - sh*.6, 1.4, sh*.6); ctx.fillRect(sx - sh*.1, sy - sh*.6, sh*.2, 1.2); // the pole, a cross-piece
    ctx.strokeStyle = 'rgba(246,240,222,.98)'; ctx.lineCap = 'round'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(sx, sy - sh*.6); ctx.lineTo(sx, sy - sh*.83); // a thin body of wired bones
    ctx.moveTo(sx - sh*.06, sy - sh*.6); ctx.lineTo(sx, sy - sh*.7); ctx.lineTo(sx + sh*.06, sy - sh*.6); ctx.stroke();
    ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(sx, sy - sh*.79); ctx.lineTo(sx + sh*.07 + sw, sy - sh*.96); ctx.moveTo(sx, sy - sh*.79); ctx.lineTo(sx - sh*.05, sy - sh*.7); ctx.stroke(); // one arm up, one down
    ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(sx + sh*.03 + sw, sy - sh*.99); ctx.lineTo(sx + sh*.13 + sw, sy - sh*.95); ctx.stroke(); ell(ctx, sx + sh*.03 + sw, sy - sh*.99, 1.4, 1.4, '#f6f0de'); ell(ctx, sx + sh*.13 + sw, sy - sh*.95, 1.4, 1.4, '#f6f0de'); ctx.lineCap = 'butt'; // the bone held up, its knuckle ends
    ell(ctx, sx, sy - sh*.87, 2, 2.2, '#f6f0de'); ctx.fillStyle = 'rgba(40,30,20,.6)'; ctx.fillRect(sx - 1, sy - sh*.875, .8, .8); ctx.fillRect(sx + .4, sy - sh*.875, .8, .8); } // a skull for a head
  for (let i = 0; i < 6; i++) { const k = ((t*mo/26000 + i/6) % 1); glow(ctx, lerp(-W*.2, W*1.2, k), hz + H*(.02 + (i % 3)*.04), W*.22, '#e8d4ac', .14*Math.sin(k*Math.PI) + (mo ? 0 : .05)); }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.12 + i*Math.min(28, W*.4/sq.length), H*.97 - (i % 2)*2, 2, t, {phase:i, dir:1}));
  vign(ctx, W, H, .42, .5); };

/* the fire off the Aren Way below the Fall at night (the chapter's fire and the Deck's table): the near fire and the squad round it, the
   hill above hung with braids and dotted with the pilgrims' lamps, the 9th's tents and fires along the road, an empty tree or two dark */
SCENEX.b4_road_fire = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46, fl = b2Fl(t);
  const crest = u => hz - H*.2*Math.pow(Math.sin(clamp((u - .3)/.66, 0, 1)*Math.PI), .6);
  ctx.drawImage(sceneLayer('b42:roadfire', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#060914'],[1,'#1a1e30']]); x.fillRect(0, 0, W, hz + 2); for (let i = 0; i < 80; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 951)*.5).toFixed(2)})`; x.fillRect(hash(i, 952)*W, Math.pow(hash(i, 953), 1.3)*hz*.85, 1, 1); }
    x.beginPath(); x.moveTo(W*.26, hz + 2); for (let i = 0; i <= 40; i++) { const u = .26 + i/40*.74; x.lineTo(u*W, crest(u)); } x.lineTo(W, hz + 2); x.closePath(); x.fillStyle = '#121016'; x.fill(); // the hill, black against the stars
    for (let i = 0; i < 140; i++) { const u = .3 + hash(i, 954)*.66, cy = crest(u), py = cy + hash(i, 955)*(hz - cy), s = .5 + (py - cy)/H*2; x.fillStyle = 'rgba(4,4,6,.9)'; x.fillRect(u*W, py - 3*s, Math.max(.5, .4*s), 3*s); if (hash(i, 956) > .55) { x.fillStyle = 'rgba(70,32,30,.7)'; x.fillRect(u*W + .4, py - 2.6*s, .6, 1.6*s); } } // stakes on its back
    x.fillStyle = vgrad(x, hz, H, [[0,'#1c1a1e'],[1,'#0e0c0e']]); x.fillRect(0, hz, W, H - hz);
    x.fillStyle = 'rgba(120,110,100,.08)'; x.beginPath(); x.moveTo(0, hz + H*.08); x.lineTo(W, hz + H*.03); x.lineTo(W, hz + H*.1); x.lineTo(0, hz + H*.18); x.closePath(); x.fill(); // the Way, a paler band
    for (let i = 0; i < 6; i++) { const tx = W*(.04 + i*.06), ty = hz + H*(.07 - i*.006); b42FarTree(x, tx, ty, H*(.12 - i*.01), '#0a0a0e', null, null, null); } // empty trees along it, black
    for (let i = 0; i < 9; i++) { const tx = W*(.34 + i*.075), ty = hz + H*(.06 + (i % 2)*.03), s = .7 + (i % 3)*.15; x.fillStyle = '#16141a'; x.beginPath(); x.moveTo(tx - 9*s, ty); x.lineTo(tx, ty - 9*s); x.lineTo(tx + 9*s, ty); x.closePath(); x.fill(); } // the 9th's tents
  }), 0, 0, W, H);
  // the pilgrims' lamps on the hill
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 16; i++) { const u = .34 + hash(i, 957)*.6, cy = crest(u), ly = cy + 3 + hash(i, 958)*(hz - cy - 4), ff = mo ? .75 + .25*Math.sin(t/(140 + i*11) + i) : 1; glow(ctx, u*W, ly, 7, '#ffa050', .3*ff); ctx.fillStyle = `rgba(255,224,160,${(.9*ff).toFixed(2)})`; ctx.fillRect(u*W - .6, ly - .6, 1.2, 1.2); }
  [[.42, .58], [.62, .56], [.84, .6]].forEach(([u, v], i) => { const ff = mo ? .8 + .2*Math.sin(t/(110 + i*23) + i) : 1; glow(ctx, W*u, H*v, H*.1, '#ff8a3a', .26*ff); glow(ctx, W*u, H*v, 3, '#ffe0a0', .9*ff); }); // the camp's other fires
  ctx.globalCompositeOperation = 'source-over';
  // the Third's fire, near
  const cx = W*.5, cy = H*.9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.4, '#ff8a3a', .32*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*14, cy + Math.sin(a)*4, 3, 2, '#3a3430'); } poly(ctx, [[cx - 8, cy], [cx - 2, cy - 16*fl], [cx + 1, cy - 7], [cx + 4, cy - 13*fl], [cx + 8, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - 4, cy], [cx, cy - 9*fl], [cx + 4, cy]], 'rgba(255,230,150,.95)');
  if (mo) for (let i = 0; i < 5; i++) { const k = ((t/1400 + i/5) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*4, cy - 10 - k*30, 1, 1); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(26 + j*22), H*.97 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .78, .55); };

/* the march (every later chapter's road between halts, 70's fallback): the column in the sun, a road of dust a league long running away
   into heat-haze, the wagons strung back along it, the squad in its place in the near files; no trees here, no hill: the open north */
SCENEX.b4_march = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, vx = W*.64;
  ctx.drawImage(sceneLayer('b42:march', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#8aa2bc'],[.6,'#dad0b8'],[1,'#f0e0bc']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.72, hz*.25, W*.45, '#fffae8', .55); glow(x, W*.72, hz*.25, 12, '#ffffff', .8); // the sun, high
    x.fillStyle = 'rgba(176,156,126,.55)'; for (let i = 0; i < 7; i++) { const hx = hash(i, 961)*W; x.beginPath(); x.ellipse(hx, hz + 1, W*(.08 + hash(i, 962)*.1), H*(.014 + hash(i, 963)*.02), 0, Math.PI, 0); x.fill(); } // low hills, far
    x.fillStyle = vgrad(x, hz, H, [[0,'#ccb88e'],[.5,'#b09872'],[1,'#7a6448']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 46; i++) { const yy = hz + 2 + Math.pow(hash(i, 964), 1.5)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(110,86,56,${(.1 + d*.2).toFixed(2)})`; x.fillRect(hash(i, 965)*W, yy, 2 + d*12, .6 + d); }
    for (let i = 0; i < 26; i++) { const yy = hz + 3 + Math.pow(hash(i, 966), 1.3)*(H - hz)*.9, d = (yy - hz)/(H - hz), bx = hash(i, 967)*W; if (Math.abs(bx - vx) < W*.18*d + 6) continue; ell(x, bx, yy, 2 + d*7, 1 + d*3, `rgba(${90 + Math.round(d*20)},${86 + Math.round(d*14)},60,.7)`); } // scrub
    x.beginPath(); x.moveTo(vx - 1, hz); x.lineTo(vx + 1, hz); x.lineTo(vx + W*.28, H); x.lineTo(vx - W*.5, H); x.closePath(); x.fillStyle = 'rgba(230,212,176,.5)'; x.fill(); // the road
    b42Column(x, vx, hz, H*.86, vx - W*.12, 44, 1.6, 968);
    for (let i = 0; i < 8; i++) { const k = .55 + i*.05, [, py] = b42P(W, H, vx, hz, 0, k), wx = vx + W*.03*(1 - k) + 5; x.fillStyle = 'rgba(90,72,52,.85)'; x.fillRect(wx - 3*(1.2 - k), py - 3*(1.2 - k), 6*(1.2 - k), 2.4*(1.2 - k)); } // wagons far back up the line
  }), 0, 0, W, H);
  for (let i = 0; i < 7; i++) { const k = ((t*mo/24000 + i/7) % 1); glow(ctx, lerp(-W*.2, W*1.2, k), hz + H*(.01 + (i % 3)*.035), W*.22, '#e8d6b0', .17*Math.sin(k*Math.PI) + (mo ? 0 : .05)); } // the column's dust
  if (mo) { ctx.globalAlpha = .06 + .03*Math.sin(t/700); ctx.fillStyle = '#fff6e0'; ctx.fillRect(0, hz - 3, W, 5); ctx.globalAlpha = 1; } // heat on the horizon
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.1 + i*Math.min(28, W*.42/sq.length), H*.97 - (i % 2)*2, 2, t, {phase:i, dir:1}));
  vign(ctx, W, H, .42, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Four's sand-and-iron ground (71b's frame) ---------------- */
function b42Item(key, label, body){ const w = 240, h = 130, id = 'c42-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#5a4a34"></stop><stop offset=".7" stop-color="#2a2218"></stop><stop offset="1" stop-color="#121214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a crow feather from the Fall: a long black flight feather, the vane split once near the tip, a twist of red wool round the quill */
b42Item('b4_c2_crowfeather', 'A crow feather from the Fall', '<ellipse cx="120" cy="68" rx="84" ry="34" fill="#c8d0e0" opacity=".05"/><g transform="rotate(-14 120 66)">'
  + '<path d="M38 70 Q90 50 196 58 Q150 64 118 72 Q80 80 38 70 Z" fill="#141218"/><path d="M38 70 Q90 50 196 58 Q150 58 118 62 Q80 66 38 70 Z" fill="#26242e"/>'
  + '<path d="M60 70 Q110 60 196 58" stroke="#3a3846" stroke-width="1" fill="none"/><path d="M150 60 L160 66 M170 59 L176 64" stroke="#0a080c" stroke-width="1.6"/>'
  + '<path d="M70 66 Q120 58 182 58" stroke="#8a90a8" stroke-width=".8" fill="none" opacity=".55"/><path d="M14 74 L44 69" stroke="#c8bca4" stroke-width="2.2" stroke-linecap="round"/>'
  + '<path d="M26 66 L30 78 M30 66 L34 78 M34 66 L38 77" stroke="#b8302a" stroke-width="2.4" stroke-linecap="round"/><path d="M28 66 L32 77" stroke="#e86a50" stroke-width=".8" opacity=".7"/></g>');
/* a braided fetish off the trees: a plait of dark horsehair and red thread, a little painted soldier knotted into it (grey tunic, red face) */
b42Item('b4_c2_fetish', 'A braided fetish off the trees', '<ellipse cx="120" cy="68" rx="76" ry="36" fill="#e0a080" opacity=".05"/>'
  + '<path d="M40 40 Q70 56 96 58" stroke="#1e1612" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M40 40 Q70 56 96 58" stroke="#a8302a" stroke-width="2" fill="none" stroke-dasharray="5 4"/>'
  + '<path d="M144 58 Q172 56 204 42" stroke="#1e1612" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M144 58 Q172 56 204 42" stroke="#a8302a" stroke-width="2" fill="none" stroke-dasharray="5 4"/>'
  + '<path d="M40 40 L30 62 M40 40 L36 66 M204 42 L210 64 M204 42 L200 66" stroke="#1e1612" stroke-width="2.2" stroke-linecap="round"/><path d="M31 56 L37 57 M206 56 L201 57" stroke="#a8302a" stroke-width="2"/>'
  + '<rect x="104" y="58" width="32" height="30" rx="3" fill="#8a8a86"/><rect x="104" y="58" width="9" height="30" fill="#b4b4ae" opacity=".7"/><rect x="104" y="84" width="32" height="4" fill="#4a4a46"/>'
  + '<circle cx="120" cy="50" r="9" fill="#c8765a"/><circle cx="117" cy="47" r="3" fill="#e8a088" opacity=".7"/><rect x="111" y="40" width="18" height="5" rx="2" fill="#4a4a4a"/>'
  + '<rect x="108" y="88" width="8" height="12" fill="#5a5a58"/><rect x="124" y="88" width="8" height="12" fill="#5a5a58"/><path d="M136 64 L150 54" stroke="#c8c0b0" stroke-width="2.2" stroke-linecap="round"/>'
  + '<circle cx="116" cy="50" r="1" fill="#1a1010"/><circle cx="123" cy="50" r="1" fill="#1a1010"/><path d="M96 58 Q120 64 144 58" stroke="#1e1612" stroke-width="3" fill="none"/>');
/* a chip of the last milestone: a flat grey stone, a broken edge, two cut numerals half gone, an oiled whetting face catching the light */
b42Item('b4_c2_milestone', 'A chip of the last milestone', '<ellipse cx="120" cy="72" rx="70" ry="32" fill="#d8d0c0" opacity=".05"/><ellipse cx="124" cy="96" rx="64" ry="9" fill="#000" opacity=".35"/>'
  + '<path d="M60 88 L66 52 Q100 38 150 42 L184 56 L176 74 L188 88 Q130 100 60 88 Z" fill="#7a766c"/><path d="M66 52 Q100 38 150 42 L184 56 Q140 50 100 54 Z" fill="#a8a296"/>'
  + '<path d="M176 74 L188 88 L172 86 Z" fill="#5a564e"/><path d="M150 42 L184 56 L176 74" stroke="#4a463e" stroke-width="1.2" fill="none"/>'
  + '<path d="M86 62 L86 80 M96 62 L96 80 M106 62 L112 80 L118 62" stroke="#3a362e" stroke-width="3.4" fill="none" stroke-linecap="square"/>'
  + '<path d="M128 60 Q150 58 166 66" stroke="#e8e2d2" stroke-width="2.4" fill="none" opacity=".55" stroke-linecap="round"/><path d="M130 66 Q150 64 162 70" stroke="#ffffff" stroke-width="1" fill="none" opacity=".4"/>');
