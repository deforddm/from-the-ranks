/* ============ Book Five, Chapter 7 art: The Seventh Closure — the Drownings District at night, the footbridge, the Low Walk ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d/81b-86b, lit from the left: a looter of the last night (a city man with a sack and a
   cooper's mallet); the pack's biggest (a Jheck wolf, too big, grey to the muzzle); the Drownings court's man (thin, a dark coat, the
   court's brass tag, a list); an Edur patrol far off at a street's end (three tall silhouettes, no faces); a canal child with a holed dock
   on a cord; a citizen of Letheras in a good coat with a wager-slate. Grounds (TILEX): the Drownings District at night (setts, rubble,
   burned houses with embers in them, an overturned cart, a brazier, a bell-station, a broken shopfront, your street's door with the tally
   on the lintel, a fallen shutter); the footbridge over the Quillas (setts, the Low Walk's steps, the canal, a barricade of carts, the
   footbridge's deck, the arch, the brazier, the tiers with their benches, the street's end); the same by night; the Low Walk at evening;
   and for fights the Low Walk with the canal as '#', and the barricade's street with burned walls as '#'. In fights 't' is cover.
   Backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still): b5_letheras (80's, redrawn: the footbridge and
   its barricade, night, day or dusk by the chapter's phase), b5_c7_night (the city in disorder, fires over the roofs, starlings round a
   dark tower), b5_c7_walls (citizens along the white walls watching the west road), b5_c7_sorcery (a darkness coming down a street with
   the lamps going out ahead of it, the barricade in front: no figures in it), b5_c7_under (under the footbridge's arch: green water, light
   on the steps), b5_c7_finale (the Low Walk at dusk after the fall, the squad small on the steps). Grim things far off: the dead in the
   streets are never drawn, the sorcery is a dark with the lamps going out, the windows behind it are only dark. And the chapter's gear on
   Book Five's ground. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* a looter of the last night: a city man in a rough coat, a sack over one shoulder, a cooper's mallet */
  b5_c7_looter(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.06, 1.02); const k = b2Pick(o, [0, 1, 2]), sk = b2Pick(o, ['#b08a6a', '#9a7656', '#c09a7a']);
    h.legs('#2a2622'); h.torso(['#5a4a3a', '#4a4a44', '#5a3a2e'][k], '#1e1a16', 6.4); ctx.fillStyle = '#2a1e14'; ctx.fillRect(-6, 2.6, 12, 1.3);
    poly(ctx, [[-9.6, -8], [-2.4, -9.4], [-1.6, -3], [-8.6, -1.6]], '#7a6a4a'); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-8, -6.4, 5, .8); // a sack over the shoulder
    h.head(sk, 4.4, -11.2); h.look(); ctx.fillStyle = '#2a2018'; ctx.beginPath(); ctx.arc(0, -12.6, 4.8, Math.PI, 0); ctx.fill(); // a cap of dark hair
    if (k === 1) { ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-3.4, -8.6, 6.8, 1.6); }
    B2F.line(ctx, '#6a4a2a', 1.6, [[6, 4], [10.4, -6.6]]); ctx.fillStyle = '#5a3a20'; ctx.fillRect(8.4, -9.6, 5.2, 3.6); ctx.fillStyle = 'rgba(255,240,200,.18)'; ctx.fillRect(8.4, -9.6, 5.2, .8); // the mallet
    ctx.restore(); },
  /* the pack's biggest: a Jheck wolf, too big, grey to the muzzle */
  b5_c7_greatwolf(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.5, 1.42); FIGX.b5_jheck(ctx, h, t, o);
    poly(ctx, [[10.4, -1.6], [14.4, -.4], [13, 1.6], [10.6, 1.4]], '#a8a49c'); ell(ctx, 12.6, -1.2, .7, .6, '#f0d878'); // the grey muzzle, the eye
    ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(-5 + i*2.6, -2.6); ctx.lineTo(-4.4 + i*2.6, 0); } ctx.stroke(); // the ruff
    ctx.restore(); },
  /* the Drownings court's man: thin, a long dark coat, the court's brass tag, a folded list */
  b5_c7_courtman(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .9, 1.08);
    poly(ctx, [[-5.4, -6], [5.4, -6], [6.6, 11], [-6.6, 11]], h.armor('#2e3038', '#101116')); h.legs('#1a1a1e');
    ctx.fillStyle = '#c9a35a'; ctx.fillRect(2.4, -4.6, 2.2, 1.6); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(3, -4.2, 1, .6); // the court's brass tag, a scale on it
    h.head('#c8a88a', 4, -11.4); h.look('rgba(20,14,10,.85)', -11.6); ctx.fillStyle = '#1a1612'; ctx.fillRect(-4.6, -15.6, 9.2, 2.4); ctx.fillRect(-6.4, -13.6, 12.8, 1); // a flat hat
    ctx.fillStyle = '#e8dcc0'; ctx.fillRect(6, -3, 4.4, 6); ctx.strokeStyle = 'rgba(40,30,20,.6)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(6.6, -2 + i*1.4); ctx.lineTo(9.8, -2 + i*1.4); } ctx.stroke(); // the list
    ctx.restore(); },
  /* an Edur patrol at a street's end, far: three tall silhouettes, no faces, a handcart of swords */
  b5_c7_patrol(ctx, h, t, o){ const sw = o.still ? 0 : Math.sin(t/600 + (o.phase || 0))*.4;
    [[-9, 0], [0, -1.2], [9, .4]].forEach(([dx, dy], i) => { ctx.save(); ctx.translate(dx, dy); ctx.fillStyle = 'rgba(14,14,20,.92)';
      ctx.fillRect(-2.2, -14 + (i === 1 ? -2 : 0), 4.4, 26 + (i === 1 ? 2 : 0)); ell(ctx, 0, -16 + (i === 1 ? -2 : 0), 2.6, 3, 'rgba(14,14,20,.92)');
      B2F.line(ctx, 'rgba(14,14,20,.92)', 1, [[2.6, 2], [4.6 + sw, -20]]); ctx.restore(); }); // tall, long-legged, a spear each
    ctx.fillStyle = 'rgba(20,18,16,.9)'; ctx.fillRect(13, 4, 9, 5); ctx.strokeStyle = 'rgba(160,160,170,.5)'; ctx.lineWidth = .6; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(14 + i*1.7, 4); ctx.lineTo(15 + i*1.7, -2); } ctx.stroke(); }, // the handcart, swords stacked in it
  /* a canal child of the Drownings District, bare feet, a holed dock on a cord */
  b5_c7_child(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .7, .72); const k = b2Pick(o, [0, 1, 2]), sk = b2Pick(o, ['#c09a7a', '#a8805e', '#b08a6a']);
    ctx.fillStyle = sk; ctx.fillRect(-4, 8, 3, 5); ctx.fillRect(1, 8, 3, 5); poly(ctx, [[-5.6, -6], [5.6, -6], [6.4, 9], [-6.4, 9]], h.armor(['#5a6878', '#7a5a4a', '#6a6a5a'][k], '#22262a'));
    h.head(sk, 4.6, -11); h.look(); B2F.cap(ctx, ['#2a1e14', '#4a3420', '#1a1612'][k], 4.8, -12.2, 1.02, 1.98);
    B2F.line(ctx, '#6a5030', .6, [[-2, -6], [0, -1], [2, -6]]); ell(ctx, 0, -.6, 1.6, 1.6, '#b87a3a'); ell(ctx, 0, -.6, .5, .5, '#1a120a'); // the holed dock on its cord
    ctx.restore(); },
  /* a citizen of Letheras in a good coat, with a wager-slate and chalk */
  b5_c7_citizen(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1.02);
    poly(ctx, [[-6, -6], [6, -6], [7, 10], [-7, 10]], h.armor('#4a5a6e', '#1a2028')); h.legs('#2a2a2e'); ctx.fillStyle = '#c9a35a'; ctx.fillRect(-.6, -5, 1.2, 1.2); ctx.fillRect(-.6, -1.6, 1.2, 1.2); // a good coat, brass buttons
    h.head('#c8a88a', 4.3, -11.2); h.look(); ctx.fillStyle = '#3a3a3a'; ctx.beginPath(); ctx.arc(0, -12.8, 4.8, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#8a8a8a'; ctx.fillRect(-4.6, -12, 1.2, 2.6); ctx.fillRect(3.4, -12, 1.2, 2.6); // grey at the temples
    ctx.fillStyle = '#2a2c30'; ctx.fillRect(5.4, -4.4, 6.4, 5); ctx.strokeStyle = '#5a4a32'; ctx.lineWidth = .8; ctx.strokeRect(5.4, -4.4, 6.4, 5); ctx.fillStyle = 'rgba(240,236,224,.75)'; ctx.fillRect(6.2, -3.4, 3, .5); ctx.fillRect(6.2, -2, 4.4, .5); ctx.fillRect(6.2, -.6, 2.4, .5); // the slate, chalked
    ctx.restore(); },
});
/* the shared figures, in case an earlier chapter's art is not loaded (the brief's guarded placeholders) */
FIGX.b5_c1_ennic ??= FIGX.b5_letherii; FIGX.b5_c1_clerk ??= FIGX.b5_letherii; FIGX.b5_c1_tilewoman ??= FIGX.b5_letherii; FIGX.b5_c5_quartermaster ??= FIGX.b5_letherii;

/* ---------------- the grounds (TILEX) ---------------- */
const B57G = {sett:'#5a564e', settD:'#24242a', char:'#1a1614', charL:'#2e2620', ember:'255,110,40', wood:'#4a3624', woodD:'#22180e', stone:'#7a766c', stoneD:'#34343a'};
const b57aIs = (x, y, s) => s.includes(b2Tile(x, y));
/* rubble on the setts: broken tiles, a charred beam, ash */
function b57aRubble(ctx, x, y, T, dark){ const px = x*T, py = y*T; b51Setts(ctx, x, y, T, dark);
  for (let i = 0; i < 6; i++) { const sx = px + T*(.08 + hash(x, y, 1901 + i)*.8), sy = py + T*(.1 + hash(x, y, 1907 + i)*.8); ctx.fillStyle = ['#5a3a2a', '#3a3230', '#6a5a48', '#2a2420', '#7a4a32', '#4a4440'][i]; ctx.fillRect(sx, sy, T*(.08 + hash(x, y, 1913 + i)*.1), T*.05); }
  if (hash(x, y, 1919) > .55) B2F.line(ctx, dark ? '#120e0a' : '#2a1e14', Math.max(1, T*.07), [[px + T*.12, py + T*.7], [px + T*.8, py + T*.5]]); // a charred beam
  ctx.fillStyle = 'rgba(40,36,34,.35)'; ell(ctx, px + T*.5, py + T*.6, T*.3, T*.12, ctx.fillStyle); }
/* a burned house: charred walls, an empty window, embers still in it */
const b57aBurnAt = (x, y) => b2Tile(x, y) === '#';
function b57aBurned(ctx, x, y, T, dark, t){ const px = x*T, py = y*T, P = B57G, front = !b57aBurnAt(x, y + 1), top = front ? py + T*.4 : py + T;
  ctx.fillStyle = hash(x, y, 1921) > .5 ? P.char : '#221c18'; ctx.fillRect(px, py, T, T); // the roof gone: the black inside
  ctx.save(); ctx.beginPath(); ctx.rect(px, py, T, top - py); ctx.clip(); for (let i = 0; i < 3; i++) B2F.line(ctx, '#0c0a08', Math.max(1, T*.06), [[px + T*(.1 + i*.3), py + T*hash(x, y, 1922 + i)*.3], [px + T*(.2 + i*.3), py + T*.9]]); // fallen rafters
  if (hash(x, y, 1926) > .5) { const k = REDUCE() || !t ? .8 : .6 + Math.sin(t/300 + x*3 + y)*.3; glow(ctx, px + T*.5, py + T*.5, T*.5, '#ff6a2a', .22*k); ctx.fillStyle = `rgba(${P.ember},${(.7*k).toFixed(2)})`; ctx.fillRect(px + T*.4, py + T*.55, T*.12, T*.05); } ctx.restore();
  if (front) { ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(px, top, T, T*.05); ctx.fillStyle = P.charL; ctx.fillRect(px, top + T*.05, T, py + T - top - T*.05);
    ctx.fillStyle = '#0a0806'; ctx.fillRect(px + T*.3, top + T*.12, T*.36, T*.24); // an empty window
    ctx.fillStyle = 'rgba(0,0,0,.4)'; for (let i = 0; i < 3; i++) ctx.fillRect(px + T*(.08 + i*.32), top + T*.06, T*.06, py + T - top); // scorch streaks
    if (dark) b2Mottle(ctx, x, y, T, .04, .1, '255,120,60', .8); } }
/* an overturned cart: its bed on its side, a wheel in the air */
function b57aCart(ctx, x, y, T, dark){ const px = x*T, py = y*T; b51Setts(ctx, x, y, T, dark); ell(ctx, px + T*.5, py + T*.86, T*.44, T*.1, 'rgba(0,0,0,.5)');
  ctx.fillStyle = dark ? '#2a1e14' : '#5a4228'; ctx.fillRect(px + T*.12, py + T*.34, T*.76, T*.44); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px + T*.12, py + T*(.34 + i*.11)); ctx.lineTo(px + T*.88, py + T*(.34 + i*.11)); ctx.stroke(); } // the bed's boards
  ctx.strokeStyle = dark ? '#3a2a1a' : '#6a5030'; ctx.lineWidth = Math.max(1, T*.04); ctx.beginPath(); ctx.arc(px + T*.66, py + T*.24, T*.18, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(px + T*.48, py + T*.24); ctx.lineTo(px + T*.84, py + T*.24); ctx.moveTo(px + T*.66, py + T*.06); ctx.lineTo(px + T*.66, py + T*.42); ctx.stroke(); } // a wheel in the air
/* a brazier: an iron pot on legs, burning */
function b57aBrazier(ctx, x, y, T, dark, low){ const px = x*T, py = y*T; ctx.fillStyle = '#2a2420'; ctx.fillRect(px + T*.3, py + T*.5, T*.4, T*.34); ctx.fillStyle = '#1a1410'; ctx.fillRect(px + T*.26, py + T*.46, T*.48, T*.06);
  if (low) { glow(ctx, px + T*.5, py + T*.5, T*.5, '#ff6a2a', .22); ctx.fillStyle = 'rgba(255,110,40,.8)'; ctx.fillRect(px + T*.36, py + T*.44, T*.28, T*.04); } else b2Flames(ctx, px + T*.5, py + T*.46, T, .9); }
/* the City Garrison's bell-station: a post, a frame, a bell */
function b57aBell(ctx, x, y, T, dark){ const px = x*T, py = y*T; b51Setts(ctx, x, y, T, dark); ell(ctx, px + T*.5, py + T*.88, T*.3, T*.08, 'rgba(0,0,0,.5)');
  ctx.fillStyle = '#2a2a2e'; ctx.fillRect(px + T*.2, py + T*.1, T*.07, T*.78); ctx.fillRect(px + T*.73, py + T*.1, T*.07, T*.78); ctx.fillRect(px + T*.16, py + T*.08, T*.68, T*.07);
  ctx.fillStyle = '#9a7a3a'; ctx.beginPath(); ctx.moveTo(px + T*.36, py + T*.46); ctx.quadraticCurveTo(px + T*.36, py + T*.18, px + T*.5, py + T*.18); ctx.quadraticCurveTo(px + T*.64, py + T*.18, px + T*.64, py + T*.46); ctx.fill(); ctx.fillStyle = 'rgba(255,230,160,.3)'; ctx.fillRect(px + T*.4, py + T*.22, T*.05, T*.2); // the bell
  if (dark) glow(ctx, px + T*.24, py + T*.5, T*.6, '#ffc070', .25); }
/* a broken shopfront: a doorway with its shutters torn off, dark inside, a lantern on the floor */
function b57aShop(ctx, x, y, T, dark){ const px = x*T, py = y*T; b51Wall(ctx, x, y, T, dark); ctx.fillStyle = '#0a0806'; ctx.fillRect(px + T*.18, py + T*.2, T*.64, T*.8);
  ctx.save(); ctx.translate(px + T*.1, py + T*.6); ctx.rotate(-.5); ctx.fillStyle = dark ? '#2a2014' : '#4a3620'; ctx.fillRect(0, 0, T*.36, T*.12); ctx.restore(); // a shutter hanging off
  glow(ctx, px + T*.5, py + T*.86, T*.5, '#ffb060', .3); ctx.fillStyle = 'rgba(255,200,120,.9)'; ctx.fillRect(px + T*.46, py + T*.8, T*.08, T*.08); }
/* your street: a narrow house door, shut and barred, and the family's tally cut on the lintel */
function b57aDoor(ctx, x, y, T, dark){ const px = x*T, py = y*T; b51Wall(ctx, x, y, T, dark); ctx.fillStyle = dark ? '#1a120a' : '#3a2814'; ctx.fillRect(px + T*.26, py + T*.3, T*.48, T*.7);
  ctx.fillStyle = '#2a2a2e'; ctx.fillRect(px + T*.26, py + T*.58, T*.48, T*.05); ctx.fillStyle = dark ? '#3a3a40' : '#6a665e'; ctx.fillRect(px + T*.2, py + T*.22, T*.6, T*.08); // the bar, the lintel
  ctx.strokeStyle = dark ? 'rgba(200,190,170,.5)' : 'rgba(40,30,20,.75)'; ctx.lineWidth = 1; ctx.beginPath(); for (let i = 0; i < 9; i++) { ctx.moveTo(px + T*(.24 + i*.06), py + T*.23); ctx.lineTo(px + T*(.24 + i*.06), py + T*.29); } ctx.stroke(); } // a notch for every year somebody paid
TILEX.b5_c7_streets = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, t = (typeof performance !== 'undefined' ? performance.now() : 0);
  if (ch === '#') return b57aBurned(ctx, x, y, T, dark, t);
  if (ch === 'c') return b57aCart(ctx, x, y, T, dark);
  if (ch === 'b') return b57aBell(ctx, x, y, T, dark);
  if (ch === 'x') return b57aShop(ctx, x, y, T, dark);
  if (ch === 'h') return b57aDoor(ctx, x, y, T, dark);
  if (ch === ',' || ch === 'p') { b57aRubble(ctx, x, y, T, dark); if (ch === 'p') { ctx.save(); ctx.translate(px + T*.5, py + T*.56); ctx.rotate(.3); ctx.fillStyle = dark ? '#2a2014' : '#4a3620'; ctx.fillRect(-T*.36, -T*.14, T*.72, T*.28); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; ctx.strokeRect(-T*.36 + .5, -T*.14 + .5, T*.72 - 1, T*.28 - 1); ctx.restore(); ctx.fillStyle = '#6a4a2a'; ctx.fillRect(px + T*.62, py + T*.7, T*.12, T*.08); } return; } // a fallen shutter, the corner of a purse under it
  b51Setts(ctx, x, y, T, dark);
  if (ch === 'F') return b57aBrazier(ctx, x, y, T, dark, false);
  if (ch === 'v') { ctx.fillStyle = 'rgba(255,240,200,.12)'; ctx.fillRect(px, py + T*.2, T, T*.6); ctx.fillStyle = dark ? 'rgba(80,120,110,.3)' : 'rgba(120,160,150,.4)'; ctx.fillRect(px, py + T*.7, T*.3, T*.3); } // the way down to the canal, a glint of it
  if (dark) b2Firelit(ctx, x, y, T, .2, 2.6, '255,130,60'); });
/* the footbridge over the Quillas: the barricade of carts, the bridge's stone deck with its rail, the arch over the water */
function b57aBarricade(ctx, x, y, T, dark){ const px = x*T, py = y*T; b51Setts(ctx, x, y, T, dark); ell(ctx, px + T*.5, py + T*.88, T*.48, T*.1, 'rgba(0,0,0,.5)');
  ctx.fillStyle = dark ? '#2a1e14' : '#5a4228'; ctx.fillRect(px, py + T*.3, T, T*.46); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(px, py + T*(.3 + i*.15)); ctx.lineTo(px + T, py + T*(.3 + i*.15)); ctx.stroke(); }
  if (!b57aIs(x - 1, y, '=')) { ctx.fillStyle = dark ? '#1a120a' : '#3a2a18'; ctx.beginPath(); ctx.arc(px + T*.2, py + T*.76, T*.16, 0, 7); ctx.fill(); }
  if (!b57aIs(x + 1, y, '=')) { ctx.fillStyle = dark ? '#1a120a' : '#3a2a18'; ctx.beginPath(); ctx.arc(px + T*.8, py + T*.76, T*.16, 0, 7); ctx.fill(); }
  if (hash(x, y, 1931) > .6) { ctx.fillStyle = dark ? '#3a3430' : '#7a6a54'; ctx.fillRect(px + T*.2, py + T*.14, T*.26, T*.18); } } // a crate on top
function b57aDeck(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B57G; ctx.fillStyle = dark ? P.stoneD : P.stone; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .12, '230,226,214', 1);
  ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; for (let r = 1; r < 3; r++) { ctx.beginPath(); ctx.moveTo(px, py + T*r/3); ctx.lineTo(px + T, py + T*r/3); ctx.stroke(); }
  const left = !b57aIs(x - 1, y, '-'), right = !b57aIs(x + 1, y, '-'); ctx.fillStyle = dark ? '#2a2a30' : '#5e5a52';
  if (left) ctx.fillRect(px, py, T*.1, T); if (right) ctx.fillRect(px + T*.9, py, T*.1, T); } // the rail
TILEX.b5_c7_canal = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '~') return b51Water(ctx, x, y, T, dark);
  if (ch === '#') { if (b2Tile(x, y + 1) === '~' || b2Tile(x, y - 1) === '~') return b51Water(ctx, x, y, T, dark); return b51Wall(ctx, x, y, T, dark); }
  if (ch === '=') return b57aBarricade(ctx, x, y, T, dark);
  if (ch === '-') return b57aDeck(ctx, x, y, T, dark);
  if (ch === 'a') { b51Water(ctx, x, y, T, dark); ctx.fillStyle = 'rgba(4,10,8,.6)'; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + T, py); ctx.lineTo(px + T, py + T*.3); ctx.quadraticCurveTo(px + T*.5, py - T*.1, px, py + T*.3); ctx.fill(); ctx.fillStyle = dark ? '#3a3a40' : '#7a766c'; ctx.fillRect(px, py + T*.72, T, T*.08); return; } // the arch's shadow, the ledge under the water
  if (ch === ',' || ch === 'J') { TILEX.b5_c1_canal(ctx, ',', x, y, T, dark); if (ch === 'J') { for (let i = 0; i < 2; i++) { ctx.fillStyle = dark ? '#2a1e14' : '#5a4228'; ctx.fillRect(px + T*.1, py + T*(.18 + i*.34), T*.8, T*.08); } if (hash(x, y, 1941) > .5) { ctx.save(); ctx.translate(px + T*.5, py + T*.7); ctx.rotate(.6); ctx.fillStyle = dark ? '#2a1e14' : '#5a4228'; ctx.fillRect(-T*.3, -T*.04, T*.6, T*.08); ctx.restore(); } } return; } // the tiers' benches, one kicked over
  b51Setts(ctx, x, y, T, dark);
  if (ch === 'F') return b57aBrazier(ctx, x, y, T, dark, !!(S && S.area === 'b5_c7_walk'));
  if (ch === '^' || ch === 'E' || ch === 'P') { ctx.fillStyle = ch === 'E' ? 'rgba(0,0,0,.25)' : 'rgba(255,240,200,.1)'; ctx.fillRect(px + T*.15, py, T*.7, T); if (ch === 'P') { ctx.fillStyle = 'rgba(20,18,16,.85)'; ctx.fillRect(px + T*.3, py + T*.5, T*.4, T*.22); ctx.strokeStyle = 'rgba(160,160,170,.5)'; ctx.lineWidth = 1; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(px + T*(.34 + i*.1), py + T*.5); ctx.lineTo(px + T*(.38 + i*.1), py + T*.24); } ctx.stroke(); } return; } // the street's end; on the evening, the patrol's handcart of swords
  if (dark) { b2Mottle(ctx, x, y, T, .05, .1, '255,192,112', 1.1); b2Firelit(ctx, x, y, T, .3, 3, '255,140,60'); } });
TILEX.b5_c7_canalnight = TILEX.b5_c7_canal;
/* the Low Walk at evening: the same ground, quieter, with the dusk on it */
TILEX.b5_c7_walk = (ctx, ch, x, y, T, dark) => { TILEX.b5_c7_canal(ctx, ch, x, y, T, dark); if (!dark) b2Clip(ctx, x, y, T, () => { ctx.fillStyle = 'rgba(60,40,70,.18)'; ctx.fillRect(x*T, y*T, T, T); }); };
/* fights: the Low Walk with the canal as '#'; the barricade's street with burned walls as '#' */
TILEX.b5_c7_lowwalk = (ctx, ch, x, y, T, dark) => ch === '#' ? b2Clip(ctx, x, y, T, () => { b51Water(ctx, x, y, T, dark); if (b2Tile(x + 1, y) && b2Tile(x + 1, y) !== '#') { ctx.fillStyle = '#8a8478'; ctx.fillRect(x*T + T*.86, y*T, T*.14, T); } }) : TILEX.b5_c7_canal(ctx, ch === 't' ? '.' : ch, x, y, T, dark);
TILEX.b5_c7_barricade = (ctx, ch, x, y, T, dark) => ch === '#' ? b2Clip(ctx, x, y, T, () => b57aBurned(ctx, x, y, T, dark, 0)) : TILEX.b5_c7_streets(ctx, ch === 't' ? '.' : ch, x, y, T, dark);
/* in fights: 't' is cover (a barrel in the street, a tier's bench or a mooring post on the Low Walk, a cart of the barricade) */
function b57aCover(ctx, x, y, T, dark, st){ const px = x*T, py = y*T; ell(ctx, px + T*.5, py + T*.86, T*.42, T*.1, 'rgba(0,0,0,.5)');
  if (st === 'b5_c7_lowwalk') { ctx.fillStyle = '#2a2a2e'; ctx.fillRect(px + T*.34, py + T*.2, T*.32, T*.66); ctx.fillStyle = '#4a4a50'; ctx.fillRect(px + T*.34, py + T*.2, T*.1, T*.66); ell(ctx, px + T*.5, py + T*.2, T*.18, T*.07, '#5a5a62'); ctx.fillStyle = 'rgba(120,80,50,.7)'; ctx.fillRect(px + T*.34, py + T*.44, T*.32, T*.05); return; } // a mooring post
  if (st === 'b5_c7_barricade') return b55Cart(ctx, px, py, T, dark); // a cart of the barricade
  for (let i = 0; i < 2; i++) { const bx = px + T*(.12 + i*.4); ctx.fillStyle = dark ? '#3a2a1a' : '#5a4228'; ctx.fillRect(bx, py + T*.34, T*.34, T*.5); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(bx, py + T*.46, T*.34, T*.04); ctx.fillRect(bx, py + T*.7, T*.34, T*.04); ell(ctx, bx + T*.17, py + T*.34, T*.17, T*.05, dark ? '#4a3a26' : '#6a5234'); } } // the cooper's barrels
{ const B57ST = ['b5_c7_streets', 'b5_c7_lowwalk', 'b5_c7_barricade', 'b5_c7_canal', 'b5_c7_walk'], _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (ch === 't' && B57ST.includes(style)) return b57aCover(ctx, x, y, T, dark, style); return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
const b57aPh = () => (S && S.f && S.f.b5_c7_ph) || 1;
function b57aSky(x, W, hz, sky){ const st = sky === 'night' ? [[0,'#05070f'],[.7,'#141a2a'],[1,'#3a2420']] : sky === 'day' ? [[0,'#8a96a4'],[1,'#c8c4b8']] : [[0,'#2a2440'],[.5,'#5a3e5a'],[.85,'#b0684a'],[1,'#d08a52']];
  x.fillStyle = vgrad(x, 0, hz, st); x.fillRect(0, 0, W, hz + 2);
  if (sky === 'night') for (let i = 0; i < 50; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 5721)*.4).toFixed(2)})`; x.fillRect(hash(i, 5722)*W, Math.pow(hash(i, 5723), 1.4)*hz*.6, 1, 1); } }
/* starlings round a dark tower: a slow ring of specks, never still unless motion is reduced */
function b57aStarlings(ctx, cx, cy, r, t, n, col){ const mo = REDUCE() ? 0 : 1; ctx.fillStyle = col;
  for (let i = 0; i < n; i++) { const a = hash(i, 5731)*6.283 + (mo ? t/(2600 + hash(i, 5732)*1800) : 0), rr = r*(.5 + hash(i, 5733)*.7), yy = cy + Math.sin(a*2 + i)*r*.18; ctx.fillRect(cx + Math.cos(a)*rr, yy + Math.sin(a)*rr*.35, 1.2, 1); } }
/* the Quillas from the Low Walk: the far bank, the canal, the footbridge's arch over it */
function b57aCanalView(x, W, H, hz, wl, wb, sky){ const night = sky === 'night', dusk = sky === 'dusk';
  x.fillStyle = night ? '#1a1a20' : dusk ? '#3e3640' : '#5a5a5e'; x.fillRect(0, hz, W, wl - hz); // the far bank's houses
  for (let i = 0; i < 18; i++) { const bx = i*W/18, bh = H*(.04 + hash(i, 5741)*.05); x.fillStyle = night ? (hash(i, 5742) > .5 ? '#14141a' : '#1c1c22') : dusk ? (hash(i, 5742) > .5 ? '#342e38' : '#3e3842') : (hash(i, 5742) > .5 ? '#4a4a50' : '#56545a'); x.fillRect(bx, hz - bh, W/18 + 1, bh + 2);
    if (hash(i, 5743) > .55) { x.fillStyle = night ? 'rgba(255,190,110,.75)' : 'rgba(30,30,34,.8)'; x.fillRect(bx + W*.02, hz + H*.02, W*.012, H*.022); } }
  for (let s = 0; s < 4; s++) { const yy = wl - H*.07 + s*H*.016; x.fillStyle = night ? (s % 2 ? '#26262a' : '#2e2e32') : (s % 2 ? '#6e6a62' : '#7a766c'); x.fillRect(0, yy, W, H*.016); } // the far tiers, empty
  x.fillStyle = night ? '#3a3a40' : '#8a8478'; x.fillRect(0, wl - H*.01, W, H*.012); // the far Low Walk's kerb
  x.fillStyle = vgrad(x, wl, wb, night ? [[0,'#0e1c1a'],[1,'#081210']] : dusk ? [[0,'#2a3438'],[1,'#141e1e']] : [[0,'#2e4a44'],[1,'#162a26']]); x.fillRect(0, wl, W, wb - wl); // the canal
  x.fillStyle = night ? '#3a3a40' : '#8a8478'; x.fillRect(0, wb, W, H*.022); x.fillStyle = night ? '#26262a' : '#6a665e'; x.fillRect(0, wb + H*.022, W, H - wb); // the near Low Walk
  const bx0 = W*.36, bx1 = W*.64, deck = wl - H*.1, sp = wb - wl; // the footbridge: a stone arch over the water
  x.fillStyle = night ? '#2e2e34' : dusk ? '#544a52' : '#7a766c'; x.beginPath(); x.moveTo(bx0 - W*.04, wb + H*.02); x.lineTo(bx0, deck); x.lineTo(bx1, deck); x.lineTo(bx1 + W*.04, wb + H*.02);
  x.lineTo(bx1 - W*.02, wb + H*.02); x.quadraticCurveTo((bx0 + bx1)/2, wl - sp*.1, bx0 + W*.02, wb + H*.02); x.closePath(); x.fill();
  x.fillStyle = night ? '#1e1e24' : dusk ? '#3a3238' : '#5e5a52'; x.fillRect(bx0, deck - H*.03, bx1 - bx0, H*.03); for (let i = 0; i <= 8; i++) x.fillRect(lerp(bx0, bx1, i/8) - 1, deck - H*.05, 2, H*.05); // the rail
  x.fillStyle = 'rgba(0,0,0,.5)'; x.beginPath(); x.moveTo(bx0 + W*.02, wb + H*.02); x.quadraticCurveTo((bx0 + bx1)/2, wl - sp*.1, bx1 - W*.02, wb + H*.02); x.closePath(); x.fill(); } // the dark under the arch
/* the footbridge and its barricade (80's b5_letheras, redrawn): night with the brazier, day, or dusk after the fall, by the phase */
SCENEX.b5_letheras = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, p = b57aPh(), sky = p >= 4 ? 'dusk' : p === 3 ? 'day' : 'night', hz = H*.32, wl = H*.52, wb = H*.74, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b57:bridge' + sky, W, H, (x, W, H) => { b57aSky(x, W, hz, sky); b51Skyline(x, W, hz - H*.06, H*.1, sky === 'night' ? '#0c0e16' : sky === 'dusk' ? '#2a2234' : '#6a6e76', sky === 'night' ? '255,190,110' : null, null); b57aCanalView(x, W, H, hz, wl, wb, sky);
    for (let i = 0; i < 6; i++) { const cx = W*(.02 + i*.065) + (i > 2 ? W*.55 : 0); x.fillStyle = sky === 'night' ? '#1a120a' : '#4a3620'; x.fillRect(cx, wb + H*.04, W*.06, H*.06); x.fillStyle = sky === 'night' ? '#0e0a06' : '#2a1e12'; x.beginPath(); x.arc(cx + W*.015, wb + H*.1, H*.02, 0, 7); x.fill(); x.beginPath(); x.arc(cx + W*.045, wb + H*.1, H*.02, 0, 7); x.fill(); } }), 0, 0, W, H); // the barricade's carts, near, either side of the gap
  if (sky === 'night') { [[.22, .6], [.5, .9], [.8, .7]].forEach(([u, k], i) => { ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*u, hz - H*.06, H*.18*k, '#ff6a2a', (.3 + (mo ? Math.sin(t/300 + i*2)*.08 : 0))*k); ctx.globalCompositeOperation = 'source-over'; }); // fires over the roofs
    b57aStarlings(ctx, W*.86, hz - H*.14, W*.06, t, 70, 'rgba(10,10,14,.75)'); }
  for (let i = 0; i < 24; i++) { const k = hash(i, 5751), y = lerp(wl + H*.02, wb - H*.02, k), xx = ((hash(i, 5752)*W + t*mo*(.006 + k*.01)) % (W + 30)) - 15; ctx.fillStyle = sky === 'night' ? `rgba(255,192,112,${(.08 + .14*hash(i, 5753)).toFixed(2)})` : `rgba(214,232,222,${(.12 + .18*hash(i, 5753)).toFixed(2)})`; ctx.fillRect(xx, y, 5 + 12*hash(i, 5754), 1); } // the water's glints
  const bx = W*.5, by = wb + H*.07; if (p < 3) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, bx, by, H*.3, '#ff8a3a', .3*fl); ctx.globalCompositeOperation = 'source-over'; poly(ctx, [[bx - 6, by], [bx - 2, by - 13*fl], [bx + 1, by - 6], [bx + 4, by - 11*fl], [bx + 7, by]], 'rgba(255,150,60,.95)'); } // the brazier in the gap
  else if (p >= 4) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, bx, by, H*.1, '#ff6a2a', .2); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,110,40,.8)'; ctx.fillRect(bx - 4, by - 2, 8, 2); b57aStarlings(ctx, W*.86, hz - H*.14, W*.05, t, 40, 'rgba(20,16,24,.8)'); } // coals; the starlings again
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const side = i % 2 ? 1 : -1, j = Math.floor(i/2); drawFigure(ctx, id, bx + side*(22 + j*18), H*.97, 1.7, t, {phase:i, dir:-side, still:!mo}); });
  vign(ctx, W, H, sky === 'night' ? .7 : .5, .5); };
/* the night: the city in disorder from a street in the Drownings District: burned house-fronts, fires over the roofs in three places,
   smoke lying in the street, and starlings in their thousands round a dark tower apart */
SCENEX.b5_c7_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46;
  ctx.drawImage(sceneLayer('b57:night', W, H, (x, W, H) => { b57aSky(x, W, hz, 'night'); b51Skyline(x, W, hz, H*.13, '#0a0c14', '255,170,90', 'rgba(40,40,56,.6)');
    x.fillStyle = vgrad(x, hz, H, [[0,'#1a1816'],[1,'#0c0b0a']]); x.fillRect(0, hz, W, H - hz); // the street
    [[0, .3], [.7, 1]].forEach(([a, b], s) => { const x0 = W*a, x1 = W*b; for (let i = 0; i < 4; i++) { const u0 = lerp(x0, x1, i/4), u1 = lerp(x0, x1, (i + 1)/4), top = hz - H*(.1 + hash(i, 5761 + s)*.12); x.fillStyle = hash(i, 5763 + s) > .5 ? '#16120e' : '#1e1814'; x.fillRect(u0, top, u1 - u0 + 1, H*.62);
      x.fillStyle = '#060504'; x.fillRect(u0 + (u1 - u0)*.3, top + H*.06, (u1 - u0)*.35, H*.08); if (hash(i, 5765 + s) > .4) { x.fillStyle = 'rgba(255,110,40,.4)'; x.fillRect(u0 + (u1 - u0)*.36, top + H*.12, (u1 - u0)*.2, H*.015); }
      x.strokeStyle = '#0a0806'; x.lineWidth = 2; x.beginPath(); x.moveTo(u0, top); x.lineTo(u0 + (u1 - u0)*.5, top - H*.04*hash(i, 5767 + s)); x.lineTo(u1, top + H*.02); x.stroke(); } }); // burned house-fronts both sides, their roofs gone
    x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 1; for (let c = -4; c <= 4; c++) { x.beginPath(); x.moveTo(W/2 + c*W*.03, hz); x.lineTo(W/2 + c*W*.2, H); x.stroke(); } // the setts in perspective
  }), 0, 0, W, H);
  [[.18, .9], [.46, .6], [.66, 1.1]].forEach(([u, k], i) => { const fl = mo ? .7 + Math.sin(t/260 + i*1.7)*.3 : .85; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*u, hz - H*.08, H*.26*k, '#ff5a1a', .38*fl*k); ctx.globalCompositeOperation = 'source-over';
    for (let j = 0; j < 5; j++) { const sy = hz - H*.14 - j*H*.06 - (mo ? (t/90 + j*40) % (H*.06) : 0); ctx.fillStyle = `rgba(30,24,24,${(.3 - j*.05).toFixed(2)})`; ell(ctx, W*u + j*4, sy, 14 + j*6, 6 + j*2, ctx.fillStyle); } }); // fires over the roofs, and their smoke
  b57aStarlings(ctx, W*.86, hz - H*.2, W*.09, t, 140, 'rgba(6,6,10,.85)'); // the starlings round the dark tower apart
  ctx.fillStyle = 'rgba(40,34,30,.25)'; for (let i = 0; i < 4; i++) ell(ctx, W*(.2 + i*.2) + (mo ? Math.sin(t/3000 + i)*10 : 0), H*.78, W*.2, H*.04, ctx.fillStyle); // smoke lying in the street
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.36 + i*18, H*.95, 1.7, t, {phase:i, dir:1, still:!mo}));
  vign(ctx, W, H, .7, .55); };
/* the walls: citizens along the white walls in their hundreds, watching the west road, slates among them; far off on the road, a dark line */
SCENEX.b5_c7_walls = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4, wt = H*.5, wbase = H*.78;
  ctx.drawImage(sceneLayer('b57:walls', W, H, (x, W, H) => { b57aSky(x, W, hz, 'day'); for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(240,240,236,.3)'; x.beginPath(); x.ellipse(hash(i, 5771)*W, hz*(.2 + hash(i, 5772)*.4), W*.12, hz*.06, 0, 0, 7); x.fill(); }
    x.fillStyle = '#8a8a6a'; x.fillRect(0, hz, W, wt - hz); x.fillStyle = '#7a7a5c'; x.beginPath(); x.moveTo(W*.3, wt); x.lineTo(W*.52, hz); x.lineTo(W*.56, hz); x.lineTo(W*.5, wt); x.fill(); // the country beyond, the west road coming in
    x.fillStyle = vgrad(x, wt, wbase, [[0,'#e8e4d8'],[1,'#b8b4a8']]); x.fillRect(0, wt, W, wbase - wt); for (let i = 0; i < 26; i++) { x.fillStyle = '#e8e4d8'; x.fillRect(i*W/26, wt - H*.02, W/52, H*.02); } // the white walls and their merlons
    x.strokeStyle = 'rgba(0,0,0,.12)'; x.lineWidth = 1; for (let r = 1; r < 5; r++) { x.beginPath(); x.moveTo(0, wt + (wbase - wt)*r/5); x.lineTo(W, wt + (wbase - wt)*r/5); x.stroke(); }
    x.fillStyle = vgrad(x, wbase, H, [[0,'#5a564e'],[1,'#3a3832']]); x.fillRect(0, wbase, W, H - wbase); // the roofs inside, below
    for (let i = 0; i < 220; i++) { const u = hash(i, 5773), cx = u*W, cy = wt - H*.02 - hash(i, 5774)*H*.03; x.fillStyle = ['#3a3430', '#4a3e34', '#2e3238', '#5a4a3a', '#6a3a2a'][i % 5]; x.fillRect(cx, cy - 4, 3, 5); ell(x, cx + 1.5, cy - 5.5, 1.6, 1.6, '#a88a6a'); if (hash(i, 5775) > .9) { x.fillStyle = '#2a2c30'; x.fillRect(cx + 2, cy - 4, 4, 3); } } // the citizens, some with slates
  }), 0, 0, W, H);
  const k = mo ? (t % 20000)/20000 : .5; ctx.fillStyle = 'rgba(20,18,22,.7)'; ctx.fillRect(lerp(W*.52, W*.4, k) - 12, lerp(hz + 2, wt - H*.06, k), 24, 2); // something dark on the west road, coming
  for (let i = 0; i < 12; i++) { const u = hash(i, 5776), bob = mo ? Math.sin(t/300 + i*2)*1.2 : 0; ctx.fillStyle = 'rgba(40,40,44,.9)'; ctx.fillRect(u*W, wt - H*.06 + bob, 2, 3); } // children on shoulders
  vign(ctx, W, H, .4, .5); };
/* the sorcery: a darkness coming down a street toward the barricade, the lamps along the house-fronts going out ahead of it. No figures. */
SCENEX.b5_c7_sorcery = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, vx = W*.5, vy = H*.36;
  ctx.drawImage(sceneLayer('b57:sorc', W, H, (x, W, H) => { x.fillStyle = vgrad(x, 0, vy, [[0,'#5a5e68'],[1,'#8a8a88']]); x.fillRect(0, 0, W, vy + 2);
    x.fillStyle = vgrad(x, vy, H, [[0,'#4a4844'],[1,'#2a2826']]); x.beginPath(); x.moveTo(vx - W*.04, vy); x.lineTo(vx + W*.04, vy); x.lineTo(W, H); x.lineTo(0, H); x.fill(); // the street
    [-1, 1].forEach(s => { x.fillStyle = s < 0 ? '#3a3a3e' : '#323236'; x.beginPath(); x.moveTo(vx + s*W*.04, vy); x.lineTo(vx + s*W*.04, vy - H*.14); x.lineTo(s < 0 ? 0 : W, -H*.2); x.lineTo(s < 0 ? 0 : W, H); x.fill(); // house-fronts both sides
      for (let i = 0; i < 8; i++) { const k = 1 - i/8, ex = vx + s*(W*.04 + (W*.46)*Math.pow(k, 1.2)), ey = vy - H*.02 - H*.26*Math.pow(k, 1.2); x.fillStyle = 'rgba(0,0,0,.6)'; x.fillRect(ex - 2*k - 1, ey + 6*k, 4*k + 2, 10*k + 2); } }); // the windows
    for (let i = 0; i < 6; i++) { const cx = W*(.04 + i*.16); x.fillStyle = '#3a2a1a'; x.fillRect(cx, H*.84, W*.13, H*.1); x.fillStyle = '#1e140c'; x.beginPath(); x.arc(cx + W*.03, H*.95, H*.03, 0, 7); x.fill(); x.beginPath(); x.arc(cx + W*.1, H*.95, H*.03, 0, 7); x.fill(); } // the barricade's carts, near
  }), 0, 0, W, H);
  const k = mo ? (t % 14000)/14000 : .45, edge = .15 + k*.55; // how far down the street the dark has come (0 far, 1 near)
  [-1, 1].forEach(s => { for (let i = 0; i < 9; i++) { const u = i/9, kk = 1 - u, lx = vx + s*(W*.04 + W*.46*Math.pow(kk, 1.2)), ly = vy - H*.04 - H*.24*Math.pow(kk, 1.2); const lit = kk > edge; // a lamp on each house-front
    if (lit) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, 6 + kk*14, '#ffc070', .4); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,220,150,.95)'; ctx.fillRect(lx - 1, ly - 1, 2 + kk*2, 2 + kk*2); } else { ctx.fillStyle = 'rgba(20,18,18,.9)'; ctx.fillRect(lx - 1, ly - 1, 2 + kk*2, 2 + kk*2); } } });
  const dy = lerp(vy, H*.8, edge), dw = lerp(W*.08, W*1.1, edge); const g = ctx.createLinearGradient(0, vy - H*.3, 0, dy); g.addColorStop(0, 'rgba(2,2,6,.98)'); g.addColorStop(.85, 'rgba(4,4,10,.92)'); g.addColorStop(1, 'rgba(6,6,14,0)'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(vx - W*.05, vy - H*.3); ctx.lineTo(vx + W*.05, vy - H*.3); ctx.lineTo(vx + dw/2, dy); for (let i = 0; i <= 10; i++) { const u = i/10; ctx.lineTo(vx + dw/2 - dw*u, dy + (mo ? Math.sin(t/400 + u*9)*H*.01 : 0)); } ctx.closePath(); ctx.fill(); // the dark, coming down the street at a walk
  vign(ctx, W, H, .55, .5); };
/* under the footbridge's arch: green water to the chin, the stones dripping, daylight on the steps beyond the arch's mouth */
SCENEX.b5_c7_under = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, wl = H*.62, f = (S && S.f) || {}, dark = (f.b5_c7_day || 0) >= 2 && !f.b5_c7_stopped;
  ctx.drawImage(sceneLayer('b57:under' + (dark ? 1 : 0), W, H, (x, W, H) => { x.fillStyle = dark ? '#0a0c10' : '#8a9088'; x.fillRect(W*.2, H*.12, W*.6, wl - H*.12); // the mouth of the arch: daylight, or the dark across it
    if (!dark) { for (let s = 0; s < 5; s++) { x.fillStyle = s % 2 ? '#7a766c' : '#8a8478'; x.fillRect(W*.2, wl - H*.06 - s*H*.06, W*.6, H*.05); } } // the Low Walk's steps in the light
    x.fillStyle = '#1e2226'; x.beginPath(); x.moveTo(0, 0); x.lineTo(W, 0); x.lineTo(W, H); x.lineTo(W*.82, H); x.lineTo(W*.82, wl); x.quadraticCurveTo(W*.82, H*.06, W*.5, H*.06); x.quadraticCurveTo(W*.18, H*.06, W*.18, wl); x.lineTo(W*.18, H); x.lineTo(0, H); x.fill(); // the arch's stones, framing
    x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 1; for (let i = 0; i < 12; i++) { const a = Math.PI + i*Math.PI/12; x.beginPath(); x.moveTo(W*.5 + Math.cos(a)*W*.32, wl + Math.sin(a)*(wl - H*.06)); x.lineTo(W*.5 + Math.cos(a)*W*.42, wl + Math.sin(a)*(wl - H*.02)); x.stroke(); } // voussoirs
    x.fillStyle = vgrad(x, wl, H, [[0,'#2e4a44'],[1,'#0c1a18']]); x.fillRect(0, wl, W, H - wl); x.fillStyle = 'rgba(200,226,214,.18)'; x.fillRect(0, wl, W, 1.5); // the green water
    x.fillStyle = '#3a3a40'; x.fillRect(0, wl + H*.06, W*.18, H*.02); x.fillRect(W*.82, wl + H*.06, W*.18, H*.02); }), 0, 0, W, H); // the ledge, under the surface
  for (let i = 0; i < 6; i++) { const k = mo ? ((t/1600 + hash(i, 5781)) % 1) : .5, dx = W*(.22 + hash(i, 5782)*.56), dy = lerp(H*.08, wl, k); ctx.fillStyle = `rgba(200,226,214,${(.6*(1 - k)).toFixed(2)})`; ctx.fillRect(dx, dy, 1, 3); } // drips
  for (let i = 0; i < 20; i++) { const kk = hash(i, 5783), xx = ((hash(i, 5784)*W + t*mo*(.004 + kk*.006)) % W); ctx.fillStyle = `rgba(200,226,214,${(.1 + .12*kk).toFixed(2)})`; ctx.fillRect(xx, wl + H*.02 + kk*H*.3, 4 + 8*kk, 1); }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => { const hx = W*(.08 + i*.14) + (i >= 3 ? W*.12 : 0), bob = mo ? Math.sin(t/700 + i)*1.2 : 0; ell(ctx, hx, wl - 2 + bob, 6, 7, id === 'thegg' ? '#6a5040' : '#3a2e26'); ell(ctx, hx, wl + 1 + bob, 8, 2, 'rgba(200,226,214,.25)'); }); // the squad's heads above the water, along the ledge
  vign(ctx, W, H, .6, .5); };
/* the finale: the Low Walk at dusk after the fall, the canal going under the footbridge as it always has, the squad small on the steps */
SCENEX.b5_c7_finale = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.34, wl = H*.54, wb = H*.74;
  ctx.drawImage(sceneLayer('b57:fin', W, H, (x, W, H) => { b57aSky(x, W, hz, 'dusk'); b51Skyline(x, W, hz - H*.05, H*.11, '#241e2c', '255,190,120', null); b57aCanalView(x, W, H, hz, wl, wb, 'dusk');
    for (let s = 0; s < 3; s++) { const yy = wb + H*.06 + s*H*.06; x.fillStyle = s % 2 ? '#4a4648' : '#545052'; x.fillRect(0, yy, W, H*.06); x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(0, yy + H*.055, W, H*.005); } }), 0, 0, W, H); // the near steps
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.44, H*.12, H*.3, '#ff9a5a', .12); ctx.globalCompositeOperation = 'source-over';
  b57aStarlings(ctx, W*.86, hz - H*.12, W*.05, t, 60, 'rgba(20,16,24,.8)');
  for (let i = 0; i < 22; i++) { const k = hash(i, 5791), y = lerp(wl + H*.02, wb - H*.02, k), xx = ((hash(i, 5792)*W + t*mo*(.005 + k*.008)) % (W + 30)) - 15; ctx.fillStyle = `rgba(230,180,140,${(.1 + .14*hash(i, 5793)).toFixed(2)})`; ctx.fillRect(xx, y, 5 + 10*hash(i, 5794), 1); } // the canal going by, catching the dusk
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.12 + i*15, wb + H*.13 + (i % 2)*H*.06, 1.25, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .55, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Five's ground ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on dark canal-slate with a thin dock-gold rim (Claude's call) */
function b57aItem(key, label, body){ const w = 240, h = 130, id = 'c57-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#34444a"></stop><stop offset=".7" stop-color="#1a2428"></stop><stop offset="1" stop-color="#0e1214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a holed dock from the Low Walk: a worn copper dock with a hole bored through it, on a wet cord */
b57aItem('b5_c7_dock', 'A holed dock from the Low Walk', '<ellipse cx="124" cy="112" rx="44" ry="5" fill="#000" opacity=".35"/>'
  + '<path d="M60 18 Q92 40 104 60" fill="none" stroke="#3a2e20" stroke-width="3.4" stroke-linecap="round"/><path d="M188 22 Q156 42 144 60" fill="none" stroke="#3a2e20" stroke-width="3.4" stroke-linecap="round"/><path d="M62 20 Q92 41 103 58" fill="none" stroke="#8a7a5a" stroke-width="1" opacity=".5"/>'
  + '<circle cx="124" cy="78" r="30" fill="#8a5a2e"/><circle cx="124" cy="78" r="26" fill="none" stroke="#b07a40" stroke-width="2"/><circle cx="124" cy="78" r="30" fill="none" stroke="#5a3a1a" stroke-width="1.5"/>'
  + '<g fill="#5a3a1a" opacity=".6"><rect x="106" y="70" width="6" height="2"/><rect x="136" y="70" width="6" height="2"/><rect x="108" y="88" width="32" height="2"/></g>'
  + '<circle cx="124" cy="66" r="6.5" fill="#0e1214"/><circle cx="124" cy="66" r="6.5" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".6"/>'
  + '<path d="M104 60 Q114 56 120 61 M144 60 Q134 56 128 61" fill="none" stroke="#3a2e20" stroke-width="3" stroke-linecap="round"/>'
  + '<path d="M102 66 Q108 54 122 50" fill="none" stroke="#e8c088" stroke-width="2" opacity=".55"/><circle cx="96" cy="100" r="1.4" fill="#9ac0b8" opacity=".7"/><circle cx="150" cy="104" r="1.2" fill="#9ac0b8" opacity=".6"/>');
/* a canal lamp off the Low Walk: a small iron lamp with a horn window, green with canal water */
b57aItem('b5_c7_lamp', 'A canal lamp off the Low Walk', '<ellipse cx="120" cy="114" rx="40" ry="5" fill="#000" opacity=".35"/>'
  + '<path d="M120 10 Q110 14 112 24 L128 24 Q130 14 120 10 Z" fill="none" stroke="#2e3a36" stroke-width="3"/><path d="M96 30 L144 30 L136 22 L104 22 Z" fill="#2e3a36"/>'
  + '<rect x="98" y="30" width="44" height="64" rx="3" fill="#24302c"/><rect x="104" y="38" width="32" height="48" rx="2" fill="#b8a870" opacity=".55"/><rect x="104" y="38" width="32" height="48" rx="2" fill="none" stroke="#1a2420" stroke-width="2"/>'
  + '<path d="M120 38 L120 86 M104 62 L136 62" stroke="#1a2420" stroke-width="2"/><path d="M92 94 L148 94 L142 106 L98 106 Z" fill="#2e3a36"/>'
  + '<g fill="#4a6a5a" opacity=".75"><ellipse cx="102" cy="100" rx="6" ry="3"/><ellipse cx="140" cy="44" rx="4" ry="6"/><ellipse cx="112" cy="30" rx="5" ry="2"/><ellipse cx="134" cy="98" rx="5" ry="2.5"/></g>'
  + '<path d="M100 36 L100 88" stroke="#6a7a72" stroke-width="1.2" opacity=".6"/><path d="M106 42 L106 70" stroke="#f0e8c8" stroke-width="1.4" opacity=".35"/>'
  + '<path d="M120 106 L120 116" stroke="#9ac0b8" stroke-width="1.2" opacity=".5"/><circle cx="120" cy="118" r="1.4" fill="#9ac0b8" opacity=".6"/>');
/* the Sixth's page from the paybook: a single ruled page, columns of names and numbers, a line through every one */
b57aItem('b5_c7_ledgerpage', 'The Sixth\'s page from the paybook', '<ellipse cx="122" cy="116" rx="70" ry="5" fill="#000" opacity=".35"/>'
  + '<path d="M62 12 L180 14 L176 112 L58 110 Z" fill="#e0d4b4"/><path d="M62 12 L66 16 L62 22 L66 28 L62 34 L66 40 L62 46 L66 52 L62 58" fill="none" stroke="#b8a888" stroke-width="1.2"/>'
  + '<g stroke="#8a9ab0" stroke-width=".7" opacity=".7">' + [0,1,2,3,4,5,6,7,8].map(i => `<path d="M68 ${26 + i*9.4} L172 ${27.4 + i*9.4}"/>`).join('') + '</g><path d="M138 18 L136 108" stroke="#b05a4a" stroke-width=".8" opacity=".6"/>'
  + '<g fill="#3a2e22" opacity=".8">' + [0,1,2,3,4,5,6,7].map(i => `<rect x="${72 + (i % 3)*2}" y="${21 + i*9.4}" width="${30 + (i*7 % 22)}" height="2.4"/><rect x="${146 + (i % 2)*3}" y="${21.6 + i*9.4}" width="${12 + (i*5 % 10)}" height="2.4"/>`).join('') + '</g>'
  + '<g stroke="#2a2018" stroke-width="1.3">' + [0,1,2,3,4,5,6,7].map(i => `<path d="M70 ${22.4 + i*9.4} L168 ${23.6 + i*9.4}"/>`).join('') + '</g>'
  + '<path d="M64 14 L120 16" stroke="#fff8e0" stroke-width="1.4" opacity=".5"/><ellipse cx="150" cy="96" rx="9" ry="5" fill="#4a3a2a" opacity=".25"/>');
