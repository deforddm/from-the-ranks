/* ============ Book Five, Chapter 6 art: Brans Keep — the Whitefinders' lines, the dry channel, the hills, the Dissent road ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d/81b-85b, lit from the left: a Whitefinder of the battalion (scale, the blue-grey cloak,
   a round shield with the white fingertip on the boss; three faces by phase); the old drill-sergeant (grey to the eyebrows, a paint-pot
   and brush, a long drill-pole). Five grounds (TILEX): the lines on the eve (grass, trodden earth, tents, the fire, the dry channel and
   its crossing, the path to the lake), the dry channel in battle (its stony floor, the banks, the crossing, dropped shields, the far
   lip), the hills behind the keep (scrub, scree, rock, thorn, a wayside shrine of the Errant's, a wolf trail, the ridge), the Dissent
   road (road, grass, field walls, an abandoned cart), and the lake shore for the eve's fight (shingle, reeds, the lake). In fights 't'
   is cover per ground. Five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still): b5_branskeep (80's,
   redrawn: the keep against its cliff from across the dry channel, dusk on the eve or dawn with dust), b5_c6_eve (the army's fires at
   night, the towers, the lake, the Edur's fires on the hills), b5_c6_pillars (dark pillars rising over the left and the centre, very
   far; the towers down once the sorceries have met), b5_c6_break (the right going back over the channel, a pillar's shadow on the
   field), b5_c6_barrow (a long mound raised on the field at night under torches, the keep burning, from far off). Grim things far off
   and in silhouette: the pillars are columns of dark on the horizon, the rain from them a haze; no bodies anywhere. And the chapter's
   gear on Book Five's ground. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* a Whitefinder of the battalion: scale over a padded coat, the blue-grey cloak, an open helm, a round shield with the white fingertip */
  b5_c6_whitefinder(ctx, h, t, o){ const k = b2Pick(o, [0, 1, 2]), sk = b2Pick(o, ['#b08a6a', '#a8805e', '#c09a7a']), fl = o.still ? 0 : Math.sin(t/260 + (o.phase || 0)*2)*.6;
    poly(ctx, [[-5.4,-6],[-8.4,9.6 + fl],[-3,8.8],[-2,-6]], '#4a5664'); h.legs('#2a2a2e');
    h.torso('#767672', '#282826', 6.2); ctx.strokeStyle = 'rgba(0,0,0,.26)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-5.8, -4 + i*2.2); ctx.lineTo(5.8, -4 + i*2.2); } ctx.stroke(); // scale
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-6, 3, 12, 1.3);
    h.head(sk, 4.3, -11.2); h.look();
    ctx.beginPath(); ctx.arc(0, -12.4, 5.1, Math.PI, 0); ctx.fillStyle = h.armor('#8e8e8a', '#2a2a28'); ctx.fill(); ctx.fillRect(-5.5, -12.8, 11, 1.2); // an open helm
    if (k === 1) { ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-3.6, -8.4, 7.2, 1.6); } // a beard
    if (k === 2) { ctx.fillStyle = 'rgba(160,60,40,.45)'; ctx.fillRect(1.6, -10.6, 2.6, .6); } // a fresh cut
    h.shield('#5a6878', '#1c2228', 6, -7.4, 0); ell(ctx, -7.4, 0, 1.6, 2.2, '#e8e4d8'); ell(ctx, -7.1, -1.2, .6, .7, '#ffffff'); // the white fingertip on the boss
    h.sword(); },
  /* the old drill-sergeant: grey to the eyebrows, a heavy coat over old scale, a paint-pot in one hand and a brush, a drill-pole over the shoulder */
  b5_c6_drillsgt(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.02);
    poly(ctx, [[-5.6,-6],[-8.6,9.6],[-3,9],[-2,-6]], '#46505c'); h.legs('#2a2a2c'); ctx.fillStyle = '#1a1612'; ctx.fillRect(-4.5, 10.4, 3.4, 2.6); ctx.fillRect(1.1, 10.4, 3.4, 2.6);
    h.torso('#5e5e5a', '#22221e', 6.6); ctx.strokeStyle = 'rgba(0,0,0,.24)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-6.2, -4 + i*2.2); ctx.lineTo(6.2, -4 + i*2.2); } ctx.stroke(); // old scale
    poly(ctx, [[-6.6,-6.4],[6.6,-6.4],[7.4,2],[-7.4,2]], h.armor('#5a4a38', '#1e1810')); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-.5, -6, 1, 8); // a heavy coat, open
    ctx.fillStyle = '#d6a24a'; ctx.fillRect(3, -6.4, 3.4, 1.2); ctx.fillRect(3, -4.6, 3.4, 1.2); // two sergeant's golds, old
    h.head('#b08a6a', 4.4, -11.2); h.look('rgba(20,12,8,.9)', -11.4); ctx.fillStyle = '#c8c4b8'; ctx.fillRect(-3.8, -13, 7.6, 1.1); // grey eyebrows, a hard line
    B2F.cap(ctx, '#c8c4b8', 4.5, -12.6, 1.04, 1.94); ctx.fillStyle = '#c8c4b8'; ctx.fillRect(-4.4, -8.8, 1.2, 2.6); ctx.fillRect(3.2, -8.8, 1.2, 2.6); // grey hair cropped, side-whiskers
    B2F.line(ctx, '#7a5a30', 1.3, [[-9.6, 12], [7.6, -20]]); // the drill-pole over the shoulder
    ell(ctx, 7.8, 4.6, 2.4, 2.6, '#8a6a4a'); ell(ctx, 7.8, 2.4, 2.2, .8, '#f0ece0'); B2F.line(ctx, '#5a4026', .8, [[7, 2.2], [5.6, -2.6]]); ctx.fillStyle = '#f0ece0'; ctx.fillRect(5.2, -3.4, 1.2, 1.2); // the paint-pot, white at the rim, a brush
    ctx.restore(); },
});
/* the shared figures, in case an earlier chapter's art is not loaded (the brief's guarded placeholders) */
FIGX.b5_c1_ennic ??= FIGX.b5_letherii; FIGX.b5_c1_clerk ??= FIGX.b5_letherii; FIGX.b5_c1_tilewoman ??= FIGX.b5_letherii; FIGX.b5_c5_factor ??= FIGX.b5_letherii; FIGX.b5_c5_quartermaster ??= FIGX.b5_letherii;

/* ---------------- the grounds (TILEX) ---------------- */
const B56G = {grass:'#4e5a36', grassD:'#1c2214', earth:'#5a4a36', earthD:'#221c14', canvas:'#6e7680', canvasD:'#262a30', bed:'#6a665c', bedD:'#26241f', stone:'#8a8678', stoneD:'#34322c',
  bank:'#5a4a34', bankD:'#201a12', scrub:'#5a5640', scrubD:'#1e1c14', scree:'#7a746a', screeD:'#2a2824', rock:'#5e5a54', rockD:'#22201e', road:'#6a5e4a', roadD:'#26221a', lake:'#3a4a54', lakeD:'#10161a', shingle:'#706a60', shingleD:'#24221e'};
const b56aIs = (x, y, s) => s.includes(b2Tile(x, y));
/* grass, or trodden earth */
function b56aGrass(ctx, x, y, T, dark, trodden){ const px = x*T, py = y*T, P = B56G; ctx.fillStyle = trodden ? (dark ? P.earthD : P.earth) : (dark ? P.grassD : P.grass); ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .14, trodden ? '220,200,160' : '200,220,150', 1);
  if (!trodden) for (let i = 0; i < 5; i++) B2F.line(ctx, dark ? 'rgba(100,120,70,.4)' : 'rgba(150,170,90,.55)', 1, [[px + T*(.1 + hash(x, y, 1661 + i)*.8), py + T*(.6 + hash(x, y, 1666 + i)*.3)], [px + T*(.12 + hash(x, y, 1661 + i)*.8), py + T*(.45 + hash(x, y, 1666 + i)*.3)]]); }
/* a battalion tent from above, its two slopes and its ridge */
function b56aTent(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B56G; b56aGrass(ctx, x, y, T, dark, true); ell(ctx, px + T*.5, py + T*.92, T*.46, T*.08, 'rgba(0,0,0,.45)');
  ctx.fillStyle = dark ? P.canvasD : P.canvas; ctx.fillRect(px + T*.04, py + T*.1, T*.92, T*.82); ctx.fillStyle = dark ? '#1a1e22' : '#4e5660'; ctx.fillRect(px + T*.5, py + T*.1, T*.46, T*.82);
  ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(px + T*.48, py + T*.1, T*.04, T*.82);
  if (!b56aIs(x, y + 1, '=')) { ctx.fillStyle = '#0a0c0e'; ctx.fillRect(px + T*.36, py + T*.62, T*.28, T*.3); }
  if (!b56aIs(x, y - 1, '=') && !b56aIs(x - 1, y, '=')) { ctx.fillStyle = '#e8e4d8'; ell(ctx, px + T*.22, py + T*.3, T*.05, T*.07, '#e8e4d8'); } } // a white fingertip painted on the canvas by somebody bored
/* the dry channel's floor: pale stones, a few big ones, dry weed */
function b56aBed(ctx, x, y, T, dark, big){ const px = x*T, py = y*T, P = B56G; ctx.fillStyle = dark ? P.bedD : P.bed; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .14, '230,220,200', 1);
  for (let i = 0; i < (big ? 5 : 9); i++) { const sx = px + T*(.08 + hash(x, y, 1671 + i)*.84), sy = py + T*(.08 + hash(x, y, 1681 + i)*.84), r = T*(big ? .1 + hash(x, y, 1691 + i)*.08 : .04 + hash(x, y, 1691 + i)*.05);
    ell(ctx, sx + r*.2, sy + r*.3, r, r*.7, 'rgba(0,0,0,.25)'); ell(ctx, sx, sy, r, r*.72, dark ? P.stoneD : P.stone); ell(ctx, sx - r*.3, sy - r*.3, r*.4, r*.25, dark ? 'rgba(200,190,170,.12)' : 'rgba(255,250,235,.3)'); }
  if (hash(x, y, 1699) > .8) B2F.line(ctx, dark ? 'rgba(90,100,60,.4)' : 'rgba(130,140,80,.6)', 1, [[px + T*.3, py + T*.8], [px + T*.34, py + T*.6]]); }
/* a bank of the channel: earth, a grass lip on top, roots */
function b56aBank(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B56G, top = !b56aIs(x, y - 1, '#'), bot = !b56aIs(x, y + 1, '#');
  ctx.fillStyle = dark ? P.bankD : P.bank; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .06, .16, '200,170,120', 1);
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(px, py + T*(.3 + i*.24)); ctx.lineTo(px + T, py + T*(.28 + i*.24 + hash(x, y, 1701 + i)*.04)); ctx.stroke(); } // strata
  if (top) { ctx.fillStyle = dark ? P.grassD : P.grass; ctx.fillRect(px, py, T, T*.18); for (let i = 0; i < 4; i++) B2F.line(ctx, dark ? 'rgba(100,120,70,.5)' : 'rgba(160,180,100,.7)', 1, [[px + T*(.1 + i*.24), py + T*.18], [px + T*(.12 + i*.24), py + T*.04]]); }
  if (bot) { ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px, py + T*.84, T, T*.16); } }
/* a round shield dropped on the stones, the white fingertip on its boss (decor) */
function b56aShield(ctx, px, py, T, dark, rot){ ell(ctx, px + T*.52, py + T*.58, T*.32, T*.2, 'rgba(0,0,0,.4)'); ctx.save(); ctx.translate(px + T*.5, py + T*.52); ctx.rotate(rot || 0);
  ell(ctx, 0, 0, T*.3, T*.22, dark ? '#20262c' : '#4a5664'); ell(ctx, 0, 0, T*.26, T*.18, dark ? '#2a323a' : '#5a6878'); ell(ctx, 0, 0, T*.07, T*.06, dark ? '#9a988e' : '#e8e4d8'); ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fillRect(-T*.2, -T*.1, T*.12, T*.03); ctx.restore(); }
/* scrub on the hills: low grey-green bushes on stony ground */
function b56aScrub(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B56G; ctx.fillStyle = dark ? P.scrubD : P.scrub; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .14, '210,200,160', 1);
  for (let i = 0; i < 3; i++) { const sx = px + T*(.15 + hash(x, y, 1711 + i)*.7), sy = py + T*(.2 + hash(x, y, 1714 + i)*.6); ell(ctx, sx, sy + T*.04, T*.1, T*.04, 'rgba(0,0,0,.3)'); ell(ctx, sx, sy, T*.09, T*.07, dark ? '#2a3020' : '#6a7048'); } }
function b56aScree(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B56G; ctx.fillStyle = dark ? P.screeD : P.scree; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .16, '230,220,200', 1);
  for (let i = 0; i < 10; i++) { const sx = px + T*(.06 + hash(x, y, 1721 + i)*.88), sy = py + T*(.06 + hash(x, y, 1731 + i)*.88); poly(ctx, [[sx - T*.04, sy + T*.02], [sx, sy - T*.04], [sx + T*.05, sy + T*.01], [sx + T*.01, sy + T*.04]], dark ? '#3a3834' : '#9a948a'); } }
function b56aRock(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B56G; b56aScree(ctx, x, y, T, dark); ell(ctx, px + T*.54, py + T*.88, T*.44, T*.1, 'rgba(0,0,0,.5)');
  ctx.fillStyle = dark ? P.rockD : P.rock; ctx.beginPath(); ctx.moveTo(px + T*.06, py + T*.9); ctx.lineTo(px + T*.14, py + T*.3); ctx.lineTo(px + T*.46, py + T*.08); ctx.lineTo(px + T*.84, py + T*.22); ctx.lineTo(px + T*.94, py + T*.9); ctx.fill();
  ctx.fillStyle = dark ? 'rgba(200,190,170,.08)' : 'rgba(255,250,235,.18)'; ctx.beginPath(); ctx.moveTo(px + T*.14, py + T*.3); ctx.lineTo(px + T*.46, py + T*.08); ctx.lineTo(px + T*.42, py + T*.4); ctx.fill(); }
function b56aThorn(ctx, x, y, T, dark){ const px = x*T, py = y*T; b56aScrub(ctx, x, y, T, dark); ell(ctx, px + T*.5, py + T*.84, T*.4, T*.1, 'rgba(0,0,0,.45)');
  for (let i = 0; i < 9; i++) { const a = -Math.PI*(.1 + hash(x, y, 1741 + i)*.8); B2F.line(ctx, dark ? '#14120c' : '#2e2a1a', Math.max(1, T*.04), [[px + T*.5, py + T*.82], [px + T*.5 + Math.cos(a)*T*(.3 + hash(x, y, 1751 + i)*.15), py + T*.82 + Math.sin(a)*T*(.36 + hash(x, y, 1761 + i)*.2)]]); } }
function b56aRoad(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B56G; ctx.fillStyle = dark ? P.roadD : P.road; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .12, '230,220,200', 1); ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.fillRect(px + T*.24, py, T*.07, T); ctx.fillRect(px + T*.68, py, T*.07, T); }
/* a field wall: dry stone, waist high */
function b56aWall(ctx, x, y, T, dark){ const px = x*T, py = y*T; b56aGrass(ctx, x, y, T, dark, false); ell(ctx, px + T*.5, py + T*.84, T*.48, T*.1, 'rgba(0,0,0,.45)');
  for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) { const sx = px + T*(.06 + i*.24 + (r % 2)*.1), sy = py + T*(.3 + r*.18); ell(ctx, sx + T*.1, sy, T*.12, T*.08, dark ? '#2e2c28' : '#7a7468'); ell(ctx, sx + T*.07, sy - T*.03, T*.05, T*.025, dark ? 'rgba(200,190,170,.08)' : 'rgba(255,250,235,.25)'); } }
/* the shore: shingle, reeds, the lake */
function b56aShingle(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B56G; ctx.fillStyle = dark ? P.shingleD : P.shingle; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .14, '230,225,210', 1);
  for (let i = 0; i < 12; i++) ell(ctx, px + T*(.05 + hash(x, y, 1771 + i)*.9), py + T*(.05 + hash(x, y, 1781 + i)*.9), T*.035, T*.025, dark ? '#3e3c38' : (hash(x, y, 1791 + i) > .5 ? '#8e887c' : '#5e5a52')); }
function b56aReeds(ctx, x, y, T, dark){ const px = x*T, py = y*T; b56aShingle(ctx, x, y, T, dark); for (let i = 0; i < 12; i++) { const sx = px + T*(.05 + hash(x, y, 1801 + i)*.9); B2F.line(ctx, dark ? 'rgba(80,90,50,.7)' : 'rgba(130,140,70,.85)', 1, [[sx, py + T*.95], [sx + T*.03, py + T*(.15 + hash(x, y, 1811 + i)*.3)]]); } }
function b56aLake(ctx, x, y, T, dark, t){ const px = x*T, py = y*T, P = B56G; ctx.fillStyle = dark ? P.lakeD : P.lake; ctx.fillRect(px, py, T, T);
  ctx.fillStyle = dark ? 'rgba(160,180,200,.06)' : 'rgba(220,230,240,.14)'; for (let i = 0; i < 3; i++) ctx.fillRect(px + T*(.1 + hash(x, y, 1821 + i)*.6), py + T*(.2 + i*.28), T*(.18 + hash(x, y, 1824 + i)*.2), 1);
  if (!b56aIs(x, y + 1, '#') || !b56aIs(x + 1, y, '#')) { ctx.fillStyle = 'rgba(230,230,220,.18)'; ctx.fillRect(px, py + T*.9, T, T*.1); } } // the still edge
TILEX.b5_c6_lines = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '=') return b56aTent(ctx, x, y, T, dark);
  if (ch === '~') { b56aBed(ctx, x, y, T, dark, false); if (!b56aIs(x + 1, y, '~-')) { ctx.fillStyle = dark ? 'rgba(80,100,50,.4)' : 'rgba(110,130,70,.6)'; ctx.fillRect(px + T*.86, py, T*.14, T); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px + T*.76, py, T*.1, T); } return; } // the dry channel, its near lip
  if (ch === '-') { b56aBed(ctx, x, y, T, dark, true); ctx.fillStyle = 'rgba(255,240,200,.12)'; ctx.fillRect(px, py + T*.2, T, T*.6); return; } // the crossing: flat stones
  b56aGrass(ctx, x, y, T, dark, ch !== '.');
  if (ch === 'F') return b55Fire(ctx, px, py, T, dark);
  if (ch === 'L') { ctx.fillStyle = 'rgba(255,240,200,.14)'; ctx.fillRect(px + T*.3, py, T*.4, T); ctx.fillStyle = dark ? 'rgba(80,110,130,.35)' : 'rgba(120,150,170,.5)'; ctx.fillRect(px + T*.7, py, T*.3, T*.3); } }); // the path down to the lake, a glint of water
TILEX.b5_c6_channel = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '#') return b56aBank(ctx, x, y, T, dark);
  if (ch === 'n') { b56aGrass(ctx, x, y, T, dark, true); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px, py + T*.8, T, T*.2); b56aShield(ctx, px, py - T*.1, T*.9, dark, 0); return; } // the far lip, the battalion's shields along it
  if (ch === '-') { b56aBed(ctx, x, y, T, dark, true); ctx.fillStyle = 'rgba(255,240,200,.12)'; ctx.fillRect(px, py, T, T); return; }
  b56aBed(ctx, x, y, T, dark, ch === ',');
  if (ch === 's') b56aShield(ctx, px, py, T, dark, hash(x, y, 1831)*2 - 1); });
TILEX.b5_c6_hills = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '#') return b56aRock(ctx, x, y, T, dark);
  if (ch === 'x') return b56aThorn(ctx, x, y, T, dark);
  if (ch === ',' || ch === 'J') { b56aScree(ctx, x, y, T, dark); if (ch === 'J') for (let i = 0; i < 4; i++) { const sx = px + T*(.2 + i*.18), sy = py + T*(.3 + (i % 2)*.3); ell(ctx, sx, sy, T*.05, T*.04, 'rgba(0,0,0,.45)'); for (let k = 0; k < 3; k++) ell(ctx, sx - T*.04 + k*T*.04, sy - T*.06, T*.015, T*.015, 'rgba(0,0,0,.45)'); } return; } // a wolf's prints, too big
  b56aScrub(ctx, x, y, T, dark);
  if (ch === 'o') { ell(ctx, px + T*.5, py + T*.86, T*.4, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#2e2c28' : '#7a746a'; ctx.fillRect(px + T*.2, py + T*.36, T*.6, T*.5); poly(ctx, [[px + T*.14, py + T*.38], [px + T*.5, py + T*.14], [px + T*.86, py + T*.38]], dark ? '#24221e' : '#6a645a'); ctx.fillStyle = '#0a0806'; ctx.fillRect(px + T*.4, py + T*.56, T*.2, T*.3);
    ctx.strokeStyle = dark ? '#8a7040' : '#c9a35a'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.arc(px + T*.5, py + T*.46, T*.06, 0, 7); ctx.stroke(); ell(ctx, px + T*.5, py + T*.92, T*.14, T*.04, dark ? '#4a3a24' : '#9a6a44'); return; } // a wayside shrine, a holed dock carved over the door, a clay dish
  if (ch === 'v') { ctx.fillStyle = 'rgba(255,240,200,.14)'; ctx.fillRect(px + T*.2, py, T*.6, T); } });
TILEX.b5_c6_dissent = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '#') return b56aWall(ctx, x, y, T, dark);
  if (ch === '.' || ch === 'v') { b56aRoad(ctx, x, y, T, dark); if (ch === 'v') { ctx.fillStyle = 'rgba(255,240,200,.14)'; ctx.fillRect(px, py + T*.2, T, T*.6); } return; }
  b56aGrass(ctx, x, y, T, dark, ch === 'J');
  if (ch === 'c') return b55Cart(ctx, px, py, T, dark);
  if (ch === 'J') { ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(px + T*hash(x, y, 1841 + i), py); ctx.lineTo(px + T*hash(x, y, 1846 + i), py + T); ctx.stroke(); } } }); // grass trodden flat by running
TILEX.b5_c6_shore = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => {
  if (ch === '#') return b56aLake(ctx, x, y, T, dark);
  if (ch === ',') return b56aReeds(ctx, x, y, T, dark);
  b56aShingle(ctx, x, y, T, dark); });
/* in fights: 't' is cover (the foragers' crates on the shore, a heap of the dead's shields in the channel, a boulder in the hills, a cart on the Dissent road) */
function b56aCover(ctx, x, y, T, dark, st){ const px = x*T, py = y*T;
  if (st === 'b5_c6_dissent') return b55Cart(ctx, px, py, T, dark);
  if (st === 'b5_c6_hills') return b56aRock(ctx, x, y, T, dark);
  if (st === 'b5_c6_channel') { ell(ctx, px + T*.5, py + T*.84, T*.44, T*.12, 'rgba(0,0,0,.5)'); for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(px + T*(.32 + i*.18), py + T*(.66 - i*.1)); ctx.rotate(-.6 + i*.5); ell(ctx, 0, 0, T*.24, T*.2, dark ? '#20262c' : '#4a5664'); ell(ctx, 0, 0, T*.2, T*.16, dark ? '#2a323a' : '#5a6878'); ell(ctx, 0, 0, T*.05, T*.05, dark ? '#9a988e' : '#e8e4d8'); ctx.restore(); } return; } // shields, heaped
  ell(ctx, px + T*.5, py + T*.86, T*.44, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#3a2c1c' : '#6a5030'; ctx.fillRect(px + T*.1, py + T*.4, T*.46, T*.44); ctx.fillRect(px + T*.44, py + T*.24, T*.46, T*.4); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; ctx.strokeRect(px + T*.1 + .5, py + T*.4 + .5, T*.46 - 1, T*.44 - 1); ctx.strokeRect(px + T*.44 + .5, py + T*.24 + .5, T*.46 - 1, T*.4 - 1); } // the foragers' meal sacks on a crate
{ const B56ST = ['b5_c6_lines', 'b5_c6_channel', 'b5_c6_hills', 'b5_c6_dissent', 'b5_c6_shore'], _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (B56ST.includes(style) && ch === 't') return b56aCover(ctx, x, y, T, dark, style); return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* the field from the right: the keep squat against its cliff to the left, its two corner towers, Lake Brans beyond, the army's lines in front
   of it, the dry channel coming toward you on the right, the old lake beds going away north-east */
function b56aSky(x, W, hz, sky){ const st = sky === 'night' ? [[0,'#04060e'],[1,'#121824']] : sky === 'dawn' ? [[0,'#4a5262'],[.6,'#a09a98'],[1,'#d8c0a0']] : sky === 'day' ? [[0,'#5a6068'],[.6,'#8a8a84'],[1,'#a8a090']] : [[0,'#2a2a48'],[.5,'#5a4a62'],[.85,'#b07a5a'],[1,'#d0905a']];
  x.fillStyle = vgrad(x, 0, hz, st); x.fillRect(0, 0, W, hz + 2);
  if (sky === 'night') for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 5661)*.45).toFixed(2)})`; x.fillRect(hash(i, 5662)*W, Math.pow(hash(i, 5663), 1.4)*hz*.7, 1, 1); } }
function b56aKeep(x, W, H, hz, sky, towers){ const cl = sky === 'night' ? '#0e0e12' : sky === 'dawn' ? '#5a5862' : sky === 'day' ? '#5e5c5a' : '#4a4048', kc = sky === 'night' ? '#08080a' : sky === 'dawn' ? '#3a3a42' : sky === 'day' ? '#46443f' : '#2a2630';
  x.fillStyle = sky === 'night' ? '#0a0a0e' : sky === 'day' ? '#4e4c48' : '#3a3442'; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 24; i++) x.lineTo(W*.6*i/24, hz - H*(.05 + hash(i, 5664)*.05)); x.lineTo(W*.6, hz); x.fill(); // the barren hills behind
  x.fillStyle = cl; x.beginPath(); x.moveTo(W*.1, hz + H*.02); x.lineTo(W*.14, hz - H*.22); x.lineTo(W*.32, hz - H*.25); x.lineTo(W*.4, hz - H*.14); x.lineTo(W*.42, hz + H*.02); x.fill(); // the cut cliff
  x.fillStyle = kc; x.fillRect(W*.16, hz - H*.1, W*.2, H*.12); for (let i = 0; i < 6; i++) x.fillRect(W*(.165 + i*.034), hz - H*.12, W*.016, H*.02); // the keep, squat, crenellated
  if (towers) { x.fillRect(W*.14, hz - H*.17, W*.04, H*.19); x.fillRect(W*.34, hz - H*.17, W*.04, H*.19); } // the corner towers
  else { poly(x, [[W*.14, hz + H*.02], [W*.14, hz - H*.07], [W*.155, hz - H*.05], [W*.17, hz - H*.09], [W*.18, hz + H*.02]], kc); poly(x, [[W*.34, hz + H*.02], [W*.34, hz - H*.05], [W*.36, hz - H*.08], [W*.375, hz - H*.04], [W*.38, hz + H*.02]], kc); } } // the towers, fallen
function b56aField(x, W, H, hz, sky){ x.fillStyle = vgrad(x, hz, H, sky === 'night' ? [[0,'#0c100a'],[1,'#050604']] : sky === 'dawn' ? [[0,'#4a4a36'],[1,'#2a2a1e']] : sky === 'day' ? [[0,'#5a5a42'],[1,'#3a3a28']] : [[0,'#4a4a2e'],[1,'#2a2a1a']]); x.fillRect(0, hz, W, H - hz);
  x.fillStyle = sky === 'night' ? '#0e141c' : sky === 'dawn' ? '#7a8490' : sky === 'day' ? '#6a747c' : '#5a5a6a'; x.beginPath(); x.moveTo(W*.4, hz + H*.01); x.lineTo(W*.62, hz + H*.01); x.lineTo(W*.6, hz + H*.05); x.lineTo(W*.42, hz + H*.06); x.fill(); x.fillStyle = 'rgba(255,255,255,.08)'; x.fillRect(W*.43, hz + H*.025, W*.16, 1); // Lake Brans, still, beyond the keep
  x.fillStyle = sky === 'night' ? '#14120e' : '#5a5448'; x.beginPath(); x.moveTo(W*.66, hz + H*.02); x.lineTo(W*.7, hz + H*.02); x.lineTo(W*.98, H); x.lineTo(W*.8, H); x.fill(); x.fillStyle = 'rgba(0,0,0,.35)'; x.beginPath(); x.moveTo(W*.66, hz + H*.02); x.lineTo(W*.67, hz + H*.02); x.lineTo(W*.82, H); x.lineTo(W*.8, H); x.fill(); // the dry channel, running toward you
  x.fillStyle = sky === 'night' ? '#1a1a16' : sky === 'day' ? '#7a786a' : '#6a6658'; x.beginPath(); x.moveTo(W*.72, hz + H*.02); x.lineTo(W, hz + H*.01); x.lineTo(W, hz + H*.12); x.lineTo(W*.86, hz + H*.1); x.fill(); } // the old lake beds, grey and flat, going away north-east
function b56aLines(x, W, H, hz, sky, gone){ for (let r = 0; r < 5; r++) for (let i = 0; i < 18; i++) { const y = hz + H*(.05 + r*.07), s = .5 + r*.35, tx = W*(.04 + i*.055) + (r % 2)*W*.02; if (tx > W*.64 && tx < W*.84 + r*W*.03) continue; if (gone && tx < W*.64) continue;
    x.fillStyle = sky === 'night' ? '#1c2026' : sky === 'dawn' ? '#7a808a' : sky === 'day' ? '#7a808a' : '#6a707a'; x.beginPath(); x.moveTo(tx - 5*s, y); x.lineTo(tx, y - 5*s); x.lineTo(tx + 5*s, y); x.fill(); } } // the army's tents in lines
SCENEX.b5_branskeep = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, sky = (f.b5_c6_ph || 1) >= 2 ? 'dawn' : 'dusk', hz = H*.42;
  ctx.drawImage(sceneLayer('b56:keep' + sky, W, H, (x, W, H) => { b56aSky(x, W, hz, sky); b56aKeep(x, W, H, hz, sky, true); b56aField(x, W, H, hz, sky); b56aLines(x, W, H, hz, sky, false);
    x.fillStyle = sky === 'dawn' ? '#2a2618' : '#1a1810'; x.fillRect(0, H*.86, W, H*.14); for (let i = 0; i < 30; i++) B2F.line(x, sky === 'dawn' ? 'rgba(160,170,100,.5)' : 'rgba(110,120,70,.5)', 1, [[hash(i, 5671)*W, H*.88 + hash(i, 5672)*H*.1], [hash(i, 5671)*W + 1, H*.85 + hash(i, 5672)*H*.1]]); }), 0, 0, W, H); // the near grass
  if (sky === 'dusk') for (let r = 0; r < 5; r++) for (let i = 0; i < 9; i++) { const fx = W*(.06 + i*.11 + (r % 2)*.03), fy = hz + H*(.07 + r*.07), fl = mo ? .6 + Math.sin(t/180 + i + r*3)*.4 : .9; if (fx > W*.64 && fx < W*.86) continue; ctx.fillStyle = `rgba(255,160,80,${(.5*fl).toFixed(2)})`; ctx.fillRect(fx, fy, 1.6 + r*.4, 1.6 + r*.4); } // the army's fires coming out
  else for (let i = 0; i < 7; i++) { const sx = W*(.7 + i*.045), sy = hz - H*.01; for (let k = 0; k < 6; k++) { const u = k/6, dr = (mo ? Math.sin(t/1500 + i + u*3) : 0)*5; ctx.fillStyle = `rgba(150,130,100,${(.18*(1 - u)).toFixed(3)})`; ell(ctx, sx + dr + u*W*.02, sy - u*H*.18, 6 + u*16, 3 + u*7, ctx.fillStyle); } } // dust coming up to the north-east
  [[.16, '#c9a35a'], [.36, '#8a2a22'], [.76, '#e8e4d8'], [.86, '#e8e4d8']].forEach(([u, c], i) => { const sx = W*u, sy = hz - (u < .5 ? H*.17 : -H*.04), fl = mo ? Math.sin(t/420 + i*1.7) : 0; ctx.strokeStyle = '#1a1612'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, sy - H*.06); ctx.stroke(); poly(ctx, [[sx, sy - H*.06], [sx + 8 + fl, sy - H*.055], [sx + 7 + fl*1.4, sy - H*.035], [sx, sy - H*.03]], c); }); // banners on the towers; the white of the Whitefinders on the right
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.2 + i*17, H*.95, 1.7, t, {phase:i, dir:1, still:!mo}));
  vign(ctx, W, H, sky === 'dawn' ? .42 : .5, .5); };
/* the eve: the army's fires across the field at night, the keep's towers black against the cliff, the lake still, the Edur's fires on the hills */
SCENEX.b5_c6_eve = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42;
  ctx.drawImage(sceneLayer('b56:eve', W, H, (x, W, H) => { b56aSky(x, W, hz, 'night'); b56aKeep(x, W, H, hz, 'night', true); b56aField(x, W, H, hz, 'night'); b56aLines(x, W, H, hz, 'night', false);
    x.fillStyle = '#08080a'; x.beginPath(); x.moveTo(W*.6, hz); for (let i = 0; i <= 16; i++) x.lineTo(W*(.6 + .4*i/16), hz - H*(.08 + hash(i, 5681)*.06)); x.lineTo(W, hz); x.fill(); // the hills to the north-east
    x.fillStyle = '#16140e'; x.fillRect(0, H*.86, W, H*.14); }), 0, 0, W, H);
  for (let r = 0; r < 5; r++) for (let i = 0; i < 9; i++) { const fx = W*(.06 + i*.11 + (r % 2)*.03), fy = hz + H*(.07 + r*.07), fl = mo ? .6 + Math.sin(t/180 + i + r*3)*.4 : .9; if (fx > W*.64 && fx < W*.86) continue; ctx.fillStyle = `rgba(255,160,80,${(.85*fl).toFixed(2)})`; ctx.fillRect(fx, fy, 1.6 + r*.4, 1.6 + r*.4); } // the army's fires
  for (let i = 0; i < 46; i++) { const fx = W*(.62 + hash(i, 5682)*.37), fy = hz - H*(.02 + hash(i, 5683)*.07), fl = mo ? .5 + Math.sin(t/220 + i*1.3)*.5 : .8; ctx.fillStyle = `rgba(255,170,90,${(.7*fl).toFixed(2)})`; ctx.fillRect(fx, fy, 1.2, 1.2); } // the Edur's fires on the hills, not fewer
  ctx.fillStyle = 'rgba(255,240,200,.1)'; ctx.fillRect(W*.43, hz + H*.025, W*.16, 1); // starlight on the lake
  const fx = W*.5, fy = H*.9, fl = mo ? b2Fl(t) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, H*.4, '#ff8a3a', .3*fl); ctx.globalCompositeOperation = 'source-over'; poly(ctx, [[fx - 9, fy], [fx - 3, fy - 16*fl], [fx + 1, fy - 7], [fx + 5, fy - 13*fl], [fx + 9, fy]], 'rgba(255,150,60,.95)'); // the Sixth's fire
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.5 + (i % 2 ? 1 : -1)*(18 + Math.floor(i/2)*16), H*.97, 1.6, t, {phase:i, dir:i % 2 ? -1 : 1, still:true}));
  vign(ctx, W, H, .62, .5); };
/* the day: dark pillars rising over the left and the centre, very far; before the sorceries meet the towers stand and dust streams up;
   after, the towers are down and the pillars lean over the field */
SCENEX.b5_c6_pillars = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, after = (f.b5_c6_day || 0) >= 1, hz = H*.46;
  ctx.drawImage(sceneLayer('b56:pillars' + (after ? 1 : 0), W, H, (x, W, H) => { b56aSky(x, W, hz, 'day'); b56aKeep(x, W, H, hz, 'day', !after); b56aField(x, W, H, hz, 'day'); b56aLines(x, W, H, hz, 'day', after);
    x.fillStyle = '#4a3e2c'; x.fillRect(0, H*.84, W, H*.16); x.fillStyle = '#2a2218'; x.fillRect(0, H*.84, W, H*.02); }), 0, 0, W, H); // the channel's far lip, in front
  for (let i = 0; i < 4; i++) { const px = W*(.08 + i*.12), sway = mo ? Math.sin(t/2600 + i)*W*.004 : 0, top = after ? hz - H*.4 : hz - H*(.18 + i*.05), lean = after ? (i - 1.5)*W*.03 : 0; // the pillars, columns of dark on the horizon
    const g = ctx.createLinearGradient(px, top, px, hz); g.addColorStop(0, 'rgba(10,8,14,.15)'); g.addColorStop(.3, 'rgba(14,10,18,.8)'); g.addColorStop(1, 'rgba(20,14,20,.95)'); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(px - W*.025 + sway, hz); ctx.lineTo(px - W*.018 + lean + sway, top); ctx.lineTo(px + W*.018 + lean + sway, top); ctx.lineTo(px + W*.025 + sway, hz); ctx.fill(); }
  if (!after) { const k = mo ? (t % 4200)/4200 : .5; ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(240,240,255,${(.18 + .12*Math.sin(k*Math.PI)).toFixed(2)})`; ctx.fillRect(W*.04, hz - H*.06, W*.56*k, H*.04); ctx.globalCompositeOperation = 'source-over'; } // the white fire going out across the field
  else { for (let i = 0; i < 12; i++) { const sx = W*(.04 + hash(i, 5691)*.56); for (let k = 0; k < 5; k++) { const u = k/5; ctx.fillStyle = `rgba(30,24,22,${(.25*(1 - u)).toFixed(3)})`; ell(ctx, sx + (mo ? Math.sin(t/1800 + i) : 0)*4, hz - u*H*.12, 4 + u*12, 2 + u*6, ctx.fillStyle); } } ctx.fillStyle = 'rgba(255,120,60,.5)'; ctx.fillRect(W*.17, hz - H*.06, W*.18, H*.03); } // smoke where the centre was; the keep alight
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.62 + i*17, H*.95, 1.7, t, {phase:i, dir:-1, still:true}));
  vign(ctx, W, H, .48, .5); };
/* the break: the right going back over the dry channel in a long spill, a pillar's shadow coming across the field, the keep burning */
SCENEX.b5_c6_break = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.44;
  ctx.drawImage(sceneLayer('b56:break', W, H, (x, W, H) => { b56aSky(x, W, hz, 'day'); b56aKeep(x, W, H, hz, 'day', false); b56aField(x, W, H, hz, 'day');
    x.fillStyle = 'rgba(255,110,50,.55)'; x.fillRect(W*.17, hz - H*.06, W*.18, H*.03); // the keep alight
    x.fillStyle = '#3e3424'; x.beginPath(); x.moveTo(0, H*.7); x.lineTo(W, H*.62); x.lineTo(W, H*.78); x.lineTo(0, H*.86); x.fill(); x.fillStyle = '#5a5444'; x.beginPath(); x.moveTo(0, H*.74); x.lineTo(W, H*.66); x.lineTo(W, H*.74); x.lineTo(0, H*.82); x.fill(); // the dry channel across the front, its stony bed
    x.fillStyle = '#2a2418'; x.fillRect(0, H*.86, W, H*.14); }), 0, 0, W, H);
  const sx = W*(.3 + (mo ? ((t/60000) % .2) : .1)); const g = ctx.createLinearGradient(sx - W*.2, 0, sx + W*.3, 0); g.addColorStop(0, 'rgba(6,4,10,0)'); g.addColorStop(.4, 'rgba(6,4,10,.55)'); g.addColorStop(1, 'rgba(6,4,10,.25)'); ctx.fillStyle = g; ctx.fillRect(0, hz, W, H*.3); // the pillar's shadow on the field
  ctx.fillStyle = 'rgba(14,10,18,.92)'; ctx.beginPath(); ctx.moveTo(sx - W*.03, hz); ctx.lineTo(sx - W*.02, 0); ctx.lineTo(sx + W*.03, 0); ctx.lineTo(sx + W*.04, hz); ctx.fill(); // the pillar, coming
  for (let i = 0; i < 36; i++) { const k = ((i/36) + (mo ? t/30000 : 0)) % 1, px = lerp(W*.95, W*.05, k), py = lerp(H*.66, H*.8, k) + (hash(i, 5701) - .5)*H*.06, s = .7 + hash(i, 5702)*.3; drawFigure(ctx, i % 5 === 2 ? 'b5_letherii' : 'b5_c6_whitefinder', px, py, s, t, {phase:i, dir:-1, still:!mo}); } // the right going back over
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.6 + i*17, H*.96, 1.7, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .5, .5); };
/* the barrow: a long mound being raised on the field at night under torches, the keep burning behind it, seen from far off */
SCENEX.b5_c6_barrow = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, hz = H*.48, done = (f.b5_c6_ph || 1) >= 4;
  ctx.drawImage(sceneLayer('b56:barrow', W, H, (x, W, H) => { b56aSky(x, W, hz, 'night'); b56aKeep(x, W, H, hz, 'night', false); b56aField(x, W, H, hz, 'night');
    x.fillStyle = '#0a0a08'; x.beginPath(); x.moveTo(0, H); x.lineTo(0, H*.8); x.quadraticCurveTo(W*.3, H*.7, W*.55, H*.78); x.quadraticCurveTo(W*.8, H*.84, W, H*.76); x.lineTo(W, H); x.fill(); }), 0, 0, W, H); // the slope in front, where the squad is
  ctx.globalCompositeOperation = 'lighter'; const kf = mo ? .7 + Math.sin(t/240)*.3 : .9; glow(ctx, W*.26, hz - H*.05, H*.22, '#ff6a2a', .35*kf); ctx.globalCompositeOperation = 'source-over'; // the keep burning
  for (let i = 0; i < 5; i++) { const fx = W*(.18 + i*.04), fy = hz - H*.08, fl = mo ? Math.sin(t/150 + i*2) : 0; poly(ctx, [[fx - 3, fy], [fx, fy - 8 - fl*3], [fx + 3, fy]], 'rgba(255,140,60,.8)'); }
  const mx0 = W*.36, mx1 = W*.86, my = hz + H*.08; ctx.fillStyle = '#16140e'; ctx.beginPath(); ctx.moveTo(mx0, my); ctx.quadraticCurveTo((mx0 + mx1)/2, my - H*(done ? .07 : .04), mx1, my); ctx.lineTo(mx1, my + H*.01); ctx.lineTo(mx0, my + H*.01); ctx.fill(); // the mound
  for (let i = 0; i < 40; i++) { const u = hash(i, 5711), tx = lerp(mx0 - W*.02, mx1 + W*.02, u), ty = my - Math.sin(u*Math.PI)*H*(done ? .07 : .04) - 2 + (hash(i, 5712) - .5)*H*.03, fl = mo ? .6 + Math.sin(t/120 + i*1.9)*.4 : .9; if (done && hash(i, 5713) > .35) continue; ctx.fillStyle = `rgba(255,190,110,${(.9*fl).toFixed(2)})`; ctx.fillRect(tx, ty, 1.4, 1.4); } // torches along it
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.12 + i*17, H*.93, 1.6, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .64, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Five's ground ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on dark canal-slate with a thin dock-gold rim (Claude's call) */
function b56aItem(key, label, body){ const w = 240, h = 130, id = 'c56-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#34444a"></stop><stop offset=".7" stop-color="#1a2428"></stop><stop offset="1" stop-color="#0e1214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* an Edur sword from the channel: a long, slightly curved blade of dark iron, grey leather on the grip, a plain guard */
b56aItem('b5_c6_edurblade', 'An Edur sword from the channel', '<ellipse cx="122" cy="106" rx="96" ry="7" fill="#000" opacity=".35"/>'
  + '<path d="M66 72 Q140 58 214 40 Q206 50 196 54 Q132 72 68 82 Z" fill="#3a3e46"/><path d="M68 74 Q140 60 210 43" fill="none" stroke="#9aa0ac" stroke-width="1.2" opacity=".6"/><path d="M70 79 Q132 68 196 53" fill="none" stroke="#14161a" stroke-width="1" opacity=".7"/>'
  + '<path d="M58 64 L72 60 L76 90 L62 94 Z" fill="#4a4c50"/><path d="M60 66 L71 63" stroke="#a8acb4" stroke-width=".8" opacity=".6"/>'
  + '<path d="M22 84 Q20 80 26 78 L62 74 L64 86 L28 92 Q22 92 22 88 Z" fill="#6a6c6e"/><g stroke="#3a3c40" stroke-width="1.4" opacity=".8"><path d="M30 78 L32 91"/><path d="M38 77 L40 90"/><path d="M46 76 L48 89"/><path d="M54 75 L56 88"/></g><path d="M26 80 L60 76" stroke="#a8aaa8" stroke-width=".8" opacity=".5"/>'
  + '<circle cx="18" cy="87" r="6" fill="#3a3e46"/><circle cx="16" cy="85" r="2" fill="#9aa0ac" opacity=".6"/>');
/* a pot of white paint: a small clay pot, its rim white, a frayed brush tied to its neck with string */
b56aItem('b5_c6_paint', 'A pot of white paint', '<ellipse cx="120" cy="112" rx="56" ry="6" fill="#000" opacity=".35"/>'
  + '<path d="M92 50 Q88 40 98 38 L142 38 Q152 40 148 50 Q160 70 154 96 Q150 110 120 110 Q90 110 86 96 Q80 70 92 50 Z" fill="#9a6a44"/><path d="M96 52 Q90 74 94 96" fill="none" stroke="#c89a6a" stroke-width="2" opacity=".5"/>'
  + '<ellipse cx="120" cy="40" rx="26" ry="6" fill="#f0ece0"/><ellipse cx="120" cy="41" rx="20" ry="3.6" fill="#d8d4c8"/><path d="M98 42 Q100 52 104 50 M134 44 Q136 54 140 50 M116 45 Q118 58 120 54" fill="none" stroke="#f0ece0" stroke-width="2.4" stroke-linecap="round"/>'
  + '<path d="M94 54 Q120 62 146 54" fill="none" stroke="#6a4a2e" stroke-width="1.6"/><path d="M146 54 Q160 50 168 58" fill="none" stroke="#6a4a2e" stroke-width="1.2"/>'
  + '<path d="M156 30 L186 90" stroke="#7a5a30" stroke-width="5" stroke-linecap="round"/><path d="M182 82 L196 102 L188 106 L176 88 Z" fill="#c8b890"/><path d="M186 96 L198 108 M190 94 L200 104 M184 98 L192 110" stroke="#f0ece0" stroke-width="1.2" opacity=".85"/><path d="M180 84 L184 80" stroke="#3a2a18" stroke-width="2"/>'
  + '<g transform="translate(120 82)"><ellipse cx="0" cy="0" rx="7" ry="9" fill="none" stroke="#f0ece0" stroke-width="1.4" opacity=".7"/></g>');
/* a stone from the old lake bed: a flat banded stone, pale grey with a darker ring */
b56aItem('b5_c6_lakestone', 'A stone from the old lake bed', '<ellipse cx="122" cy="98" rx="62" ry="8" fill="#000" opacity=".38"/>'
  + '<path d="M70 70 Q74 44 118 40 Q166 38 176 62 Q182 84 150 94 Q112 102 86 92 Q66 84 70 70 Z" fill="#9a9890"/>'
  + '<path d="M84 70 Q88 52 120 50 Q156 48 164 64 Q168 80 146 86 Q116 92 96 86 Q80 80 84 70 Z" fill="none" stroke="#5a5a56" stroke-width="5" opacity=".75"/>'
  + '<path d="M98 70 Q102 60 122 59 Q146 58 150 68 Q152 76 138 79 Q118 82 106 79 Q96 76 98 70 Z" fill="#b0aea6"/>'
  + '<path d="M80 60 Q96 46 122 44" fill="none" stroke="#e8e6dc" stroke-width="2" opacity=".55"/><path d="M150 90 Q164 86 172 76" fill="none" stroke="#5a5852" stroke-width="1.4" opacity=".6"/>');
