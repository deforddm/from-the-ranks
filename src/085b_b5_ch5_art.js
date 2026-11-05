/* ============ Book Five, Chapter 5 art: The Retreat — the road south through the burned country, a burned farm, Brans Keep's lines ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d/81b-84b, lit from the left: the deserters' leader (an army coat with the flash cut
   off, bareheaded, a beard, a heavier blade); refugees off the burned canal villages (a shawl and a bundle, an old man with a stick, a
   child, a handbarrow: varied by phase; decor); a Bluerose-horsed courier on foot (a short riding coat, a dispatch-case on a strap across
   the chest, a hand to a hurt arm); the house's factor (a good coat, a ledger, and his clerk at his shoulder with an umbrella); the
   Sixth's quartermaster (stout, an apron over scale, a tally-board, a pot of clay tokens at the belt); a Nerek family (Chapter 3's
   figure). Three grounds (TILEX: the road through the burned country, the burned farm, Brans Keep's lines); in fights 't' is cover per
   ground (a burned cart, a fallen beam, a wagon's crates) and '#' is a burned wall. Four backdrops (SCENEX, sceneLayer for the still parts,
   REDUCE() holding the rest still): b5_road_south (80's, redrawn: the straight road south, black fields to the hedges, boards on the
   gateposts, a long file of the disarmed), b5_c5_burned (a farmstead burned to the walls, its barn smoking, the black fields), b5_c5_cache
   (a leaning milestone in a burned copse, the cut in its side, jars coming up out of the ash), b5_c5_arrival (Brans Keep against its
   cliff, the lake, the dry channel, the army's tents in front: dusk, night or morning by the chapter's flags). Grim things far off and
   in silhouette; no bodies anywhere. And the chapter's gear on Book Five's ground. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* the deserters' leader: an army coat with the flash cut off the shoulder, bareheaded, black-bearded, a heavier blade */
  b5_c5_deserterboss(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.06, 1.04);
    poly(ctx, [[-5.6,-6],[-8.8,9.6],[-3,8.6],[-2,-6]], '#3e4652'); h.legs('#26262a'); ctx.fillStyle = '#1a1612'; ctx.fillRect(-4.5, 10.4, 3.4, 2.6); ctx.fillRect(1.1, 10.4, 3.4, 2.6);
    h.torso('#5a5a56', '#1e1e1c', 6.6); ctx.strokeStyle = 'rgba(0,0,0,.26)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-6.2, -4 + i*2.2); ctx.lineTo(6.2, -4 + i*2.2); } ctx.stroke(); // scale, unkempt
    ctx.fillStyle = '#6a5a48'; ctx.fillRect(3.4, -5.8, 3, 2.4); ctx.strokeStyle = 'rgba(230,220,200,.5)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(3.6, -5.6); ctx.lineTo(6.2, -3.6); ctx.stroke(); // the flash cut off, the stitches showing
    ctx.fillStyle = '#2a1e14'; ctx.fillRect(-6.4, 3.2, 12.8, 1.4); ctx.fillStyle = '#8a6a2a'; ctx.fillRect(-.8, 3, 1.6, 1.8);
    h.head('#a8805e', 4.5, -11.2); h.look('rgba(20,12,8,.9)', -11.6); ctx.fillStyle = 'rgba(30,20,14,.5)'; ctx.fillRect(-3.6, -13.2, 7.2, .6); // a scowl
    B2F.cap(ctx, '#1a1410', 4.7, -12.6, 1.02, 1.98); ctx.fillStyle = '#1a1410'; ell(ctx, .6, -7.6, 4.2, 2.8, '#1a1410'); ctx.fillRect(-3.8, -9.6, 7.6, 2.4); // black hair and a beard
    ctx.strokeStyle = '#d0c8b8'; ctx.lineWidth = 1.7; ctx.beginPath(); ctx.moveTo(7, 2); ctx.lineTo(13, -11); ctx.stroke(); ctx.strokeStyle = '#4a3a22'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(5.6, 4.6); ctx.lineTo(7.6, .6); ctx.stroke(); ctx.fillStyle = '#8a7040'; ctx.fillRect(5.2, .4, 4, 1); // a heavier blade
    ctx.restore(); },
  /* refugees off the burned canal villages: a woman with a shawl and a bundle, an old man with a stick, a child, a man with a handbarrow */
  b5_c5_refugee(ctx, h, t, o){ ctx.save(); const k = b2Pick(o, [0, 1, 2, 3, 0, 1]), sk = b2Pick(o, ['#b08a6a', '#a8805e', '#ba9272', '#9a7656']);
    if (k === 2) B2F.grow(ctx, .66, .66); else if (k === 1) { B2F.grow(ctx, .92, .9); ctx.rotate(.06); }
    h.legs('#2e2a26');
    if (k === 0) { B2F.robe(ctx, h, b2Pick(o, ['#6a5a4a', '#5a4e44', '#6e6252']), '#221c16', 6, 7.6); h.head(sk, 4.1, -11); h.look(); poly(ctx, [[-5.6,-15],[5.6,-15],[6.6,-3],[-6.6,-3]], b2Pick(o, ['#5a4a3a', '#4e4a40', '#6a5040'])); ell(ctx, .6, -10.6, 3.2, 3.6, sk); h.look(); // a shawl over the head
      ell(ctx, -6.6, 2.4, 4.8, 4.2, h.armor('#8a7a62', '#3a3026')); B2F.line(ctx, '#4a3a2a', .8, [[-9.4, 0], [-3.6, 4.8]]); } // a bundle in a cloth
    else if (k === 1) { h.torso('#5a5244', '#22201a', 5.4); h.head(sk, 4, -11); h.look(); B2F.cap(ctx, '#c8c4b8', 4.1, -12.4, 1.1, 1.9); ctx.fillStyle = '#c8c4b8'; ctx.fillRect(-3.4, -8.6, 6.8, 1.4); // white hair, a white beard
      B2F.line(ctx, '#5a4026', 1.2, [[7.4, 12.6], [6.4, -4]]); }
    else if (k === 2) { h.torso('#7a6a52', '#2a2218', 5); h.head(sk, 4.4, -11.2); h.look(); B2F.cap(ctx, '#2a1e14', 4.6, -12.6); }
    else { h.torso('#5e5648', '#201c16', 6); h.head(sk, 4.2, -11.2); h.look(); B2F.cap(ctx, '#3a2a1e', 4.4, -12.6);
      ctx.fillStyle = '#4a3a26'; ctx.fillRect(6, 1, 9, 5); ctx.fillStyle = '#6a5a3a'; ctx.fillRect(6.6, -1.6, 7.6, 2.6); ell(ctx, 13.4, 7.4, 2.4, 2.4, '#2a2016'); B2F.line(ctx, '#5a4026', 1, [[6, 2], [2, 4]]); } // a handbarrow with a sack on it
    ctx.restore(); },
  /* a courier on foot: a short blue-grey riding coat, a dispatch-case on a strap across his chest, a hand held to a hurt arm, riding boots */
  b5_c5_courier(ctx, h, t, o){ ctx.save();
    h.legs('#2a2a2c'); ctx.fillStyle = '#3a2618'; ctx.fillRect(-4.6, 7.4, 3.6, 5.6); ctx.fillRect(1, 7.4, 3.6, 5.6); // riding boots to the knee
    h.torso('#56677a', '#1c232c', 5.8); ctx.fillStyle = '#3a4656'; ctx.fillRect(-5.6, 4.4, 11.2, 2.6); // the riding coat's skirt
    B2F.line(ctx, '#4a3220', 1.1, [[-5, -5.6], [5, 3.6]]); ctx.fillStyle = '#5a3e26'; ctx.fillRect(3.4, 1.8, 4.6, 3.6); ctx.fillStyle = '#c9a35a'; ctx.fillRect(5.2, 3, 1.2, 1.2); // the dispatch-case and its strap
    ctx.fillStyle = '#b08a6a'; ell(ctx, -3.6, 0, 1.6, 1.6, '#b08a6a'); ctx.fillStyle = '#56677a'; ctx.fillRect(-6.6, -3.6, 2.4, 4.8); // a hand to the hurt arm
    h.head('#b48c6c', 4.2, -11.2); h.look(); B2F.cap(ctx, '#5a3e26', 4.4, -12.6, 1.04, 1.96); ctx.fillStyle = '#2a3442'; ctx.fillRect(-4.8, -13.6, 9.6, 1.4); // a riding cap's band
    ctx.restore(); },
  /* the house's factor: a good brown coat with a dark collar, a ledger open on his arm; his clerk at his shoulder holding an umbrella over the ledger */
  b5_c5_factor(ctx, h, t, o){ ctx.save();
    ctx.save(); ctx.translate(-8.4, 1.2); ctx.scale(.78, .78); // the clerk, behind and to the left
    ctx.fillStyle = '#2a2a2c'; ctx.fillRect(-4, 5, 3, 8); ctx.fillRect(1, 5, 3, 8); poly(ctx, [[-5,-6],[5,-6],[4.4,7],[-4.4,7]], '#3a3a40'); ell(ctx, 0, -11, 3.9, 4.1, '#b89a80'); ctx.fillStyle = 'rgba(24,14,10,.8)'; ctx.fillRect(-.9, -11.4, 1, 1); ctx.fillRect(1.8, -11.4, 1, 1); B2F.cap(ctx, '#3a2a1e', 4, -12.4);
    B2F.line(ctx, '#2a2016', 1, [[4, -1], [9, -24]]); ctx.restore();
    poly(ctx, [[-14,-19.6],[-2,-21.4],[4.6,-19],[-1,-17.4],[-8,-17]], '#1e2a2a'); B2F.line(ctx, 'rgba(160,190,180,.35)', .6, [[-12.6, -19.4], [3.6, -19]]); // the umbrella, held over the ledger
    h.legs('#2a2420'); ctx.fillStyle = '#16120e'; ctx.fillRect(-4.5, 11, 3.4, 2); ctx.fillRect(1.1, 11, 3.4, 2);
    poly(ctx, [[-6.4,-6],[6.4,-6],[7.6,10],[-7.6,10]], h.armor('#6a5038', '#241a10')); ctx.fillStyle = '#2a1e16'; ctx.fillRect(-6.4, -6.4, 12.8, 2.2); ctx.fillRect(-.6, -4, 1.2, 14); // the good coat, its collar
    ctx.fillStyle = '#c9a35a'; ctx.fillRect(-.4, -1, .8, .8); ctx.fillRect(-.4, 2, .8, .8); ctx.fillRect(-.4, 5, .8, .8); // brass buttons
    poly(ctx, [[2.4,-3.4],[10.6,-5],[11,1.6],[2.8,3]], '#e2d8c0'); B2F.line(ctx, '#7a6a52', .6, [[6.6, -4.2], [6.9, 2.4]]); ctx.fillStyle = 'rgba(40,30,20,.6)'; for (let i = 0; i < 3; i++) { ctx.fillRect(3.4, -2.4 + i*1.5, 2.6, .35); ctx.fillRect(7.4, -3 + i*1.5, 2.6, .35); } // the ledger, open
    h.head('#c09c80', 4.2, -11.2); h.look(); ctx.fillStyle = 'rgba(60,40,30,.4)'; ctx.fillRect(-.6, -9, 2.6, .6); // a pleasant face
    B2F.cap(ctx, '#8a8278', 4.3, -12.5, 1.08, 1.92); ctx.fillStyle = '#1a1612'; ctx.fillRect(-5, -15.4, 10, 1.4); ctx.fillRect(-3.4, -18.6, 6.8, 3.4); // grey hair, a hat
    ctx.restore(); },
  /* the Sixth's quartermaster: stout, older, a leather apron over scale, a tally-board, a pot of clay tokens at the belt */
  b5_c5_quartermaster(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.08, .98);
    poly(ctx, [[-5.4,-6],[-8.4,9.2],[-3,8.6],[-2,-6]], '#4a5664'); h.legs('#2a2a2c');
    h.torso('#6a6a66', '#262624', 7); ctx.strokeStyle = 'rgba(0,0,0,.24)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(-6.6, -4 + i*2.2); ctx.lineTo(6.6, -4 + i*2.2); } ctx.stroke();
    poly(ctx, [[-4.6,-3],[4.6,-3],[5.6,9.6],[-5.6,9.6]], h.armor('#7a5a3a', '#2e2014')); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-4.6, -3, 9.2, .8); // the apron
    ctx.fillStyle = '#5a3e26'; ell(ctx, -7, 4.6, 2.6, 2.8, '#6a4a2e'); ctx.fillStyle = '#c8b090'; for (let i = 0; i < 3; i++) ell(ctx, -7.8 + i*.9, 2.4, .7, .5, '#c8a888'); // the token pot, tokens at its neck
    poly(ctx, [[4,-4],[10,-5.4],[10.6,1.6],[4.6,2.8]], '#8a6e48'); ctx.fillStyle = 'rgba(30,20,12,.7)'; for (let i = 0; i < 4; i++) ctx.fillRect(5.6 + i*1.2, -3.6, .4, 4); // the tally-board, notched
    h.head('#b08a6a', 4.6, -11); h.look(); ctx.fillStyle = 'rgba(160,120,100,.4)'; ell(ctx, -1.6, -9.6, 1.2, .8, ctx.fillStyle); // a red nose
    B2F.cap(ctx, '#8a8a84', 4.7, -12.4, 1.06, 1.94); ctx.fillStyle = '#8a8a84'; ctx.fillRect(-4.6, -8.8, 1.2, 2.4); ctx.fillRect(3.4, -8.8, 1.2, 2.4); // grey, and side-whiskers
    ctx.restore(); },
});
/* the Nerek family on the road: Chapter Three's figure (the brief allows the alias) */
FIGX.b5_c5_nerek ??= (ctx, h, t, o) => (FIGX.b5_c3_nerek || FIGX.b5_letherii)(ctx, h, t, o);
/* the shared figures, in case an earlier chapter's art is not loaded (the brief's guarded placeholders) */
FIGX.b5_c1_ennic ??= FIGX.b5_letherii; FIGX.b5_c1_clerk ??= FIGX.b5_letherii; FIGX.b5_c1_tilewoman ??= FIGX.b5_letherii; FIGX.b5_c4_grassjacket ??= FIGX.b5_letherii;

/* ---------------- the grounds (TILEX) ---------------- */
const B55G = {ash:'#2e2a26', ashD:'#141210', ashL:'#4a4440', road:'#5e5444', roadD:'#221e18', char:'#121010', wall:'#4a4440', wallD:'#1e1c1a', yard:'#4a4034', yardD:'#1c1812',
  grass:'#4e5a36', grassD:'#1c2214', earth:'#5a4a36', earthD:'#221c14', canvas:'#6e7680', canvasD:'#262a30', stone:'#6a665e', stoneD:'#2a2826'};
/* ash: a black field burned to the root, grey drifts, a few stubs of stalk, now and then a coal */
function b55Ash(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B55G; ctx.fillStyle = dark ? P.ashD : P.ash; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .16, '200,190,180', 1);
  for (let i = 0; i < 3; i++) ell(ctx, px + T*(.15 + hash(x, y, 1501 + i)*.7), py + T*(.15 + hash(x, y, 1504 + i)*.7), T*(.12 + hash(x, y, 1507 + i)*.1), T*.05, dark ? 'rgba(90,86,80,.25)' : 'rgba(130,124,116,.35)'); // drifts of grey
  for (let i = 0; i < 5; i++) { const sx = px + T*(.08 + hash(x, y, 1511 + i)*.84), sy = py + T*(.3 + hash(x, y, 1516 + i)*.6); B2F.line(ctx, dark ? '#0a0908' : '#161412', Math.max(.8, T*.025), [[sx, sy], [sx + T*.01, sy - T*.1]]); } // stubble
  if (hash(x, y, 1521) > .86) { glow(ctx, px + T*.5, py + T*.5, T*.25, '#ff5a20', dark ? .3 : .16); ell(ctx, px + T*.5, py + T*.5, T*.04, T*.03, '#ff7a3a'); } } // a coal
/* the road: old paving gone grey under ash, ruts */
function b55Road(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B55G; ctx.fillStyle = dark ? P.roadD : P.road; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .12, '230,220,200', 1);
  ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 1; ctx.strokeRect(px + T*.06 + .5, py + T*.1 + .5, T*.42, T*.36); ctx.strokeRect(px + T*.52 + .5, py + T*.52 + .5, T*.42, T*.38);
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(px + T*.24, py, T*.07, T); ctx.fillRect(px + T*.68, py, T*.07, T); // ruts
  ctx.fillStyle = dark ? 'rgba(40,36,32,.4)' : 'rgba(60,56,50,.35)'; ell(ctx, px + T*.2, py + T*.7, T*.16, T*.06, ctx.fillStyle); } // ash blown over it
/* a burned wall: field-stone, blackened, its top broken */
function b55Wall(ctx, x, y, T, dark, isW){ const px = x*T, py = y*T, P = B55G, front = !isW(x, y + 1);
  ctx.fillStyle = dark ? P.wallD : P.wall; ctx.fillRect(px, py, T, T); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1;
  for (let r = 0; r < 3; r++) { ctx.beginPath(); ctx.moveTo(px, py + r*T/3); ctx.lineTo(px + T, py + r*T/3); ctx.stroke(); for (let k = 0; k < 2; k++) { const bx = px + T*((k + (r % 2)*.5)/2 + .2); ctx.beginPath(); ctx.moveTo(bx, py + r*T/3); ctx.lineTo(bx, py + (r + 1)*T/3); ctx.stroke(); } }
  const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, 'rgba(8,6,4,.85)'); g.addColorStop(.6, 'rgba(8,6,4,.25)'); g.addColorStop(1, 'rgba(8,6,4,0)'); ctx.fillStyle = g; ctx.fillRect(px, py, T, T); // soot, thickest at the top
  ctx.fillStyle = 'rgba(255,240,220,.05)'; ctx.fillRect(px, py, T*.1, T);
  if (front) { ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px, py + T*.84, T, T*.16); } }
/* a burned tree: a black trunk, a few black limbs, no crown */
function b55Tree(ctx, x, y, T, dark){ const px = x*T, py = y*T, cx = px + T*(.42 + hash(x, y, 1531)*.16);
  b55Ash(ctx, x, y, T, dark); ell(ctx, cx + T*.06, py + T*.88, T*.24, T*.07, 'rgba(0,0,0,.45)');
  B2F.line(ctx, dark ? '#060504' : '#0e0c0a', Math.max(2, T*.12), [[cx, py + T*.9], [cx + T*.02, py + T*.12]]);
  for (let i = 0; i < 3; i++) { const by = py + T*(.24 + i*.18), s = hash(x, y, 1532 + i) > .5 ? 1 : -1; B2F.line(ctx, dark ? '#060504' : '#121010', Math.max(1, T*.05), [[cx, by + T*.08], [cx + s*T*(.22 + hash(x, y, 1535 + i)*.14), by - T*.06]]); }
  ctx.fillStyle = 'rgba(255,230,200,.07)'; ctx.fillRect(cx - T*.06, py + T*.14, T*.03, T*.74); }
/* a refugees' cart from above: a box bed on two wheels, a tarpaulin over the load */
function b55Cart(ctx, px, py, T, dark){ ell(ctx, px + T*.5, py + T*.86, T*.44, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#2a1e14' : '#5a4228'; ctx.fillRect(px + T*.1, py + T*.24, T*.8, T*.56);
  ctx.fillStyle = dark ? '#2e3236' : '#5e6670'; ctx.beginPath(); ctx.moveTo(px + T*.14, py + T*.3); ctx.quadraticCurveTo(px + T*.5, py + T*.1, px + T*.86, py + T*.3); ctx.lineTo(px + T*.86, py + T*.72); ctx.lineTo(px + T*.14, py + T*.72); ctx.fill(); // the tarpaulin
  ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px + T*.14, py + T*.5); ctx.lineTo(px + T*.86, py + T*.5); ctx.stroke(); // its rope
  ctx.fillStyle = dark ? '#1a120a' : '#3a2a18'; ctx.fillRect(px + T*.02, py + T*.34, T*.1, T*.36); ctx.fillRect(px + T*.88, py + T*.34, T*.1, T*.36); } // the wheels, edge on
/* a milestone: a squat post of grey stone, the leagues cut in it, and low down the quartermaster's cut */
function b55Stone(ctx, px, py, T, dark, lean){ ell(ctx, px + T*.52, py + T*.86, T*.24, T*.07, 'rgba(0,0,0,.5)'); ctx.save(); ctx.translate(px + T*.5, py + T*.86); ctx.rotate(lean || 0);
  ctx.fillStyle = dark ? B55G.stoneD : B55G.stone; ctx.beginPath(); ctx.moveTo(-T*.16, 0); ctx.lineTo(-T*.16, -T*.5); ctx.quadraticCurveTo(0, -T*.68, T*.16, -T*.5); ctx.lineTo(T*.16, 0); ctx.fill();
  ctx.fillStyle = 'rgba(255,250,230,.12)'; ctx.fillRect(-T*.16, -T*.5, T*.05, T*.5); ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-T*.08, -T*.4); ctx.lineTo(T*.08, -T*.4); ctx.moveTo(-T*.06, -T*.32); ctx.lineTo(T*.06, -T*.32);
  ctx.moveTo(-T*.08, -T*.12); ctx.lineTo(T*.04, -T*.12); ctx.moveTo(-T*.04, -T*.16); ctx.lineTo(-T*.04, -T*.08); ctx.moveTo(0, -T*.16); ctx.lineTo(0, -T*.08); ctx.stroke(); ctx.restore(); } // the leagues, and the cut
/* a fire in the ash: a ring of fence-rail, coals, a flame */
function b55Fire(ctx, px, py, T, dark){ const cx = px + T*.5, cy = py + T*.6; glow(ctx, cx, cy, T*1.2, '#ff8a3a', dark ? .32 : .2); ell(ctx, cx, cy, T*.32, T*.18, dark ? '#2a2014' : '#3a3026'); ell(ctx, cx, cy, T*.22, T*.1, '#1a0e08');
  for (let i = 0; i < 4; i++) { const a = i*Math.PI/2 + .4; B2F.line(ctx, '#3a2414', Math.max(1, T*.05), [[cx + Math.cos(a)*T*.28, cy + Math.sin(a)*T*.14], [cx + Math.cos(a)*T*.08, cy + Math.sin(a)*T*.04]]); }
  poly(ctx, [[cx - T*.16, cy], [cx - T*.04, cy - T*.4], [cx + T*.02, cy - T*.18], [cx + T*.08, cy - T*.34], [cx + T*.16, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - T*.07, cy], [cx, cy - T*.2], [cx + T*.07, cy]], '#fff1c2'); }
const b55Is = (x, y, s) => s.includes(b2Tile(x, y));
TILEX.b5_c5_road = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '#') return b55Wall(ctx, x, y, T, dark, (a, b) => b55Is(a, b, '#'));
  if (ch === 'x') return b55Tree(ctx, x, y, T, dark);
  if (ch === '.' || ch === 'v') { b55Road(ctx, x, y, T, dark); if (ch === 'v') { ctx.fillStyle = 'rgba(255,240,200,.14)'; ctx.fillRect(px + T*.2, py, T*.6, T); } return; }
  b55Ash(ctx, x, y, T, dark);
  if (ch === 'c') return b55Cart(ctx, px, py, T, dark);
  if (ch === 'm') return b55Stone(ctx, px, py, T, dark, 0);
  if (ch === 'k') { for (let i = 0; i < 4; i++) B2F.line(ctx, '#0c0a08', Math.max(1, T*.05), [[px + T*(.1 + i*.26), py + T*.9], [px + T*(.12 + i*.26), py + T*(.18 + hash(x, y, 1541 + i)*.2)]]); b55Stone(ctx, px, py, T, dark, -.22); return; } // a burned copse, the old leaning stone
  if (ch === 'F') return b55Fire(ctx, px, py, T, dark);
  if (ch === 'f') { ctx.fillStyle = dark ? 'rgba(80,70,56,.4)' : 'rgba(110,98,80,.5)'; ctx.fillRect(px, py + T*.36, T, T*.3); B2F.line(ctx, '#1a1410', Math.max(1.4, T*.07), [[px + T*.8, py + T*.9], [px + T*.8, py + T*.24]]); ctx.fillStyle = dark ? '#3a3226' : '#6a5a42'; ctx.fillRect(px + T*.56, py + T*.22, T*.4, T*.16); ctx.fillStyle = 'rgba(20,14,8,.7)'; ctx.fillRect(px + T*.62, py + T*.26, T*.28, T*.03); ctx.fillRect(px + T*.62, py + T*.31, T*.2, T*.03); } }); // the farm lane, a gatepost with the army's board
TILEX.b5_c5_farm = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, P = B55G;
  if (ch === '#') return b55Wall(ctx, x, y, T, dark, (a, b) => b55Is(a, b, '#B'));
  if (ch === 'B') { b55Wall(ctx, x, y, T, dark, (a, b) => b55Is(a, b, '#B')); ctx.fillStyle = '#070605'; ctx.fillRect(px + T*.08, py + T*.22, T*.84, T*.78); ctx.fillStyle = dark ? '#1a120a' : '#2e2216'; ctx.fillRect(px + T*.08, py + T*.22, T*.84, T*.08); glow(ctx, px + T*.5, py + T*.8, T*.4, '#ff7a30', dark ? .2 : .1); return; } // the barn's black door, a fire somewhere inside
  if (ch === ',') return b55Ash(ctx, x, y, T, dark);
  ctx.fillStyle = dark ? P.yardD : P.yard; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .14, '220,200,170', 1); // the yard, trodden
  ctx.fillStyle = dark ? 'rgba(20,18,16,.4)' : 'rgba(40,36,32,.35)'; ell(ctx, px + T*(.3 + hash(x, y, 1551)*.4), py + T*(.4 + hash(x, y, 1552)*.3), T*.22, T*.08, ctx.fillStyle);
  if (hash(x, y, 1553) > .78) { ctx.fillStyle = 'rgba(0,0,0,.45)'; ell(ctx, px + T*.5, py + T*.52, T*.2, T*.12, ctx.fillStyle); ctx.fillStyle = dark ? '#3a3022' : '#6a5a42'; ell(ctx, px + T*.66, py + T*.4, T*.12, T*.05, ctx.fillStyle); } // a dug hole, its spoil
  if (ch === 'w') { ell(ctx, px + T*.5, py + T*.56, T*.38, T*.3, dark ? '#2a2826' : '#6a665e'); ell(ctx, px + T*.5, py + T*.54, T*.24, T*.18, '#050404'); B2F.line(ctx, '#0c0a08', Math.max(1.4, T*.06), [[px + T*.14, py + T*.56], [px + T*.16, py + T*.12]]); B2F.line(ctx, '#0c0a08', Math.max(1.4, T*.06), [[px + T*.86, py + T*.56], [px + T*.84, py + T*.16]]); } // the well, its windlass burned off
  if (ch === 'e') { ctx.fillStyle = 'rgba(255,240,200,.12)'; ctx.fillRect(px + T*.2, py, T*.6, T); } });
/* Brans Keep's lines: grass, trodden earth, the battalion's tents, wagons, the dry channel's lip, the fire, the carts */
function b55Tent(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B55G; b55Grass(ctx, x, y, T, dark, true); ell(ctx, px + T*.5, py + T*.92, T*.46, T*.08, 'rgba(0,0,0,.45)');
  ctx.fillStyle = dark ? P.canvasD : P.canvas; ctx.fillRect(px + T*.04, py + T*.1, T*.92, T*.82); ctx.fillStyle = dark ? '#1a1e22' : '#4e5660'; ctx.fillRect(px + T*.5, py + T*.1, T*.46, T*.82); // the canvas, its two slopes
  ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(px + T*.48, py + T*.1, T*.04, T*.82); // the ridge
  if (!b55Is(x, y + 1, '=')) { ctx.fillStyle = '#0a0c0e'; ctx.fillRect(px + T*.36, py + T*.62, T*.28, T*.3); } } // the door flap
function b55Grass(ctx, x, y, T, dark, trodden){ const px = x*T, py = y*T, P = B55G; ctx.fillStyle = trodden ? (dark ? P.earthD : P.earth) : (dark ? P.grassD : P.grass); ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .14, trodden ? '220,200,160' : '200,220,150', 1);
  if (!trodden) for (let i = 0; i < 5; i++) B2F.line(ctx, dark ? 'rgba(100,120,70,.4)' : 'rgba(150,170,90,.55)', 1, [[px + T*(.1 + hash(x, y, 1561 + i)*.8), py + T*(.6 + hash(x, y, 1566 + i)*.3)], [px + T*(.12 + hash(x, y, 1561 + i)*.8), py + T*(.45 + hash(x, y, 1566 + i)*.3)]]); }
function b55Wagon(ctx, px, py, T, dark){ ell(ctx, px + T*.5, py + T*.9, T*.46, T*.09, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#2a1e14' : '#5a4228'; ctx.fillRect(px + T*.08, py + T*.2, T*.84, T*.64);
  ctx.fillStyle = dark ? '#3a3a36' : '#c8c0a8'; ctx.beginPath(); ctx.moveTo(px + T*.1, py + T*.26); ctx.quadraticCurveTo(px + T*.5, py + T*.02, px + T*.9, py + T*.26); ctx.lineTo(px + T*.9, py + T*.74); ctx.lineTo(px + T*.1, py + T*.74); ctx.fill(); // a canvas tilt
  ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px + T*(.1 + i*.2), py + T*.2); ctx.lineTo(px + T*(.1 + i*.2), py + T*.74); ctx.stroke(); } // the hoops
  ctx.fillStyle = dark ? '#1a120a' : '#3a2a18'; ctx.fillRect(px + T*.02, py + T*.3, T*.08, T*.4); ctx.fillRect(px + T*.9, py + T*.3, T*.08, T*.4); }
TILEX.b5_c5_keep = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '=') return b55Tent(ctx, x, y, T, dark);
  if (ch === '~') { ctx.fillStyle = dark ? '#16140f' : '#3e382c'; ctx.fillRect(px, py, T, T); for (let i = 0; i < 7; i++) ell(ctx, px + T*(.1 + hash(x, y, 1571 + i)*.8), py + T*(.1 + hash(x, y, 1578 + i)*.8), T*(.05 + hash(x, y, 1585 + i)*.07), T*.04, dark ? '#2e2a24' : '#7a7266'); // the dry channel's stony floor
    if (!b55Is(x - 1, y, '~')) { ctx.fillStyle = dark ? 'rgba(80,100,50,.35)' : 'rgba(110,130,70,.6)'; ctx.fillRect(px, py, T*.14, T); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px + T*.14, py, T*.1, T); } return; } // the lip
  b55Grass(ctx, x, y, T, dark, ch !== '.');
  if (ch === 'w') return b55Wagon(ctx, px, py, T, dark);
  if (ch === 'F') return b55Fire(ctx, px, py, T, dark);
  if (ch === 'q') { ell(ctx, px + T*.5, py + T*.86, T*.44, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#3a2c1c' : '#6a5030'; ctx.fillRect(px + T*.08, py + T*.3, T*.84, T*.5); ctx.fillStyle = dark ? '#2a2016' : '#4a3820'; for (let i = 0; i < 3; i++) ctx.fillRect(px + T*(.14 + i*.26), py + T*.2, T*.2, T*.2); ctx.fillStyle = 'rgba(255,240,200,.14)'; ctx.fillRect(px + T*.08, py + T*.3, T*.84, T*.04); return; } // the battalion's carts, crates on the tailboards
  if (ch === '^') { ctx.fillStyle = 'rgba(255,240,200,.14)'; ctx.fillRect(px + T*.2, py, T*.6, T); } });
/* in fights: 't' is cover (a burned cart on the road, a fallen beam in the farm, crates off a wagon in the lines) */
function b55Cover(ctx, x, y, T, dark, st){ const px = x*T, py = y*T;
  if (st === 'b5_c5_road') return b55Cart(ctx, px, py, T, dark);
  if (st === 'b5_c5_keep') { ell(ctx, px + T*.5, py + T*.86, T*.44, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#3a2c1c' : '#6a5030'; ctx.fillRect(px + T*.1, py + T*.4, T*.46, T*.44); ctx.fillRect(px + T*.44, py + T*.24, T*.46, T*.4); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; ctx.strokeRect(px + T*.1 + .5, py + T*.4 + .5, T*.46 - 1, T*.44 - 1); ctx.strokeRect(px + T*.44 + .5, py + T*.24 + .5, T*.46 - 1, T*.4 - 1); return; } // crates
  ell(ctx, px + T*.5, py + T*.8, T*.46, T*.12, 'rgba(0,0,0,.5)'); ctx.save(); ctx.translate(px + T*.5, py + T*.6); ctx.rotate(.4); ctx.fillStyle = dark ? '#0e0a08' : '#1e1612'; ctx.fillRect(-T*.48, -T*.11, T*.96, T*.22); ctx.fillStyle = dark ? 'rgba(120,60,20,.3)' : 'rgba(160,80,30,.35)'; ctx.fillRect(-T*.3, -T*.11, T*.2, T*.05); ctx.fillRect(T*.1, -T*.11, T*.12, T*.05); ctx.restore(); } // a charred beam, still glowing in places
{ const B55ST = ['b5_c5_road', 'b5_c5_farm', 'b5_c5_keep'], _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (B55ST.includes(style) && ch === 't') return b55Cover(ctx, x, y, T, dark, style); return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* an overcast day over the burned country: grey cloud with a dirty orange under it, smoke columns far off */
function b55Sky(x, W, hz, night){ x.fillStyle = vgrad(x, 0, hz, night ? [[0,'#05060c'],[1,'#141822']] : [[0,'#3a3a40'],[.55,'#6a625a'],[.9,'#a0785a'],[1,'#b88a62']]); x.fillRect(0, 0, W, hz + 2);
  if (!night) for (let i = 0; i < 9; i++) { x.fillStyle = `rgba(50,48,50,${(.18 + hash(i, 5501)*.2).toFixed(2)})`; ell(x, hash(i, 5502)*W, hz*(.1 + hash(i, 5503)*.4), W*(.12 + hash(i, 5504)*.14), hz*.06, x.fillStyle); } }
function b55Smoke(ctx, W, H, hz, t, mo, n){ for (let i = 0; i < n; i++) { const sx = W*(.08 + hash(i, 5511)*.84), base = hz + H*.005; for (let k = 0; k < 7; k++) { const u = k/7, drift = (mo ? Math.sin(t/3000 + i + u*2) : 0)*6 + u*u*W*.06; ctx.fillStyle = `rgba(40,36,34,${(.2*(1 - u)).toFixed(3)})`; ell(ctx, sx + drift, base - u*H*.3, 4 + u*14, 3 + u*8, ctx.fillStyle); } } }
/* black fields both sides of a straight road, hedge-lines black, gateposts with the army's boards */
function b55Fields(x, W, H, hz, night){ x.fillStyle = vgrad(x, hz, H, night ? [[0,'#0c0b0a'],[1,'#050404']] : [[0,'#2a2622'],[1,'#141210']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 6; i++) { const y = hz + (H - hz)*Math.pow((i + 1)/7, 1.6); x.strokeStyle = night ? '#030303' : '#0a0908'; x.lineWidth = 1 + i*.5; x.beginPath(); x.moveTo(0, y); for (let k = 0; k <= 20; k++) x.lineTo(W*k/20, y - hash(i, k, 5521)*(2 + i)); x.stroke(); } // hedge-lines, burned
  for (let i = 0; i < 140; i++) { const u = hash(i, 5522), y = hz + (H - hz)*Math.pow(hash(i, 5523), 1.4); x.fillStyle = `rgba(150,140,130,${(.04 + u*.08).toFixed(3)})`; x.fillRect(hash(i, 5524)*W, y, 2 + u*6, 1); } // drifts of grey ash
  for (let i = 0; i < 26; i++) { const y = hz + (H - hz)*Math.pow(hash(i, 5525), 1.2), s = (y - hz)/(H - hz); if (hash(i, 5527) > .5) continue; x.strokeStyle = '#080706'; x.lineWidth = 1 + s*3; const tx = hash(i, 5526)*W; x.beginPath(); x.moveTo(tx, y); x.lineTo(tx, y - 6 - s*40); x.stroke(); x.lineWidth = .8 + s*1.2; x.beginPath(); x.moveTo(tx, y - 4 - s*24); x.lineTo(tx + 4 + s*12, y - 8 - s*34); x.stroke(); } } // burned trees, no crowns
function b55RoadPaint(x, W, H, hz, night){ x.fillStyle = night ? '#1e1a16' : '#5a5040'; x.beginPath(); x.moveTo(W*.48, hz); x.lineTo(W*.52, hz); x.lineTo(W*.78, H); x.lineTo(W*.22, H); x.fill(); x.fillStyle = 'rgba(0,0,0,.14)'; x.beginPath(); x.moveTo(W*.495, hz); x.lineTo(W*.505, hz); x.lineTo(W*.56, H); x.lineTo(W*.44, H); x.fill(); // the road going away, its crown
  [[.2, .64, 1], [.74, .7, -1], [.12, .82, 1], [.86, .86, -1]].forEach(([u, v, s]) => { const gx = W*u, gy = H*v, k = (gy - hz)/(H - hz); x.fillStyle = '#100c08'; x.fillRect(gx, gy - 30*k, 2.4*k + 1, 30*k); x.fillStyle = night ? '#2a2420' : '#6a5a42'; x.fillRect(gx + (s > 0 ? 2 : -14*k), gy - 30*k, 14*k + 2, 7*k + 1); x.fillStyle = 'rgba(30,20,12,.8)'; x.fillRect(gx + (s > 0 ? 4 : -12*k), gy - 27*k, 8*k, 1); }); } // gateposts, the army's boards nailed on
SCENEX.b5_road_south = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4;
  ctx.drawImage(sceneLayer('b55:road', W, H, (x, W, H) => { b55Sky(x, W, hz, false); b55Fields(x, W, H, hz, false); b55RoadPaint(x, W, H, hz, false); }), 0, 0, W, H);
  b55Smoke(ctx, W, H, hz, t, mo, 4);
  for (let i = 0; i < 30; i++) { const k = ((i/30) + (mo ? t/90000 : 0)) % 1, px = lerp(W*.505, W*.58, k), py = lerp(hz + H*.01, H*.86, k*k), s = lerp(.18, 1.15, k*k); drawFigure(ctx, i % 6 === 4 ? 'b5_c5_refugee' : i % 7 === 3 ? 'b5_c4_grassjacket' : 'b5_c4_garrison', px + (hash(i, 5531) - .5)*W*.03*s, py, s, t, {still:!mo, phase:i, dir:1}); } // a long file going south
  ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 18; i++) { const ax = (hash(i, 5532)*W + (mo ? t*.008*(1 + hash(i, 5533)) : 0)) % W, ay = H*(.1 + hash(i, 5534)*.8) + (mo ? Math.sin(t/900 + i)*6 : 0); ctx.fillStyle = 'rgba(200,190,180,.12)'; ctx.fillRect(ax, ay, 1.4, 1.4); } ctx.globalCompositeOperation = 'source-over'; // ash in the air
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.3 + i*17, H*.95, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };
/* a farmstead burned to its walls, the barn's roof fallen in and smoke coming out of it, the fields black behind */
SCENEX.b5_c5_burned = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46, f = (S && S.f) || {}, done = !!f.b5_c5_farmDone;
  ctx.drawImage(sceneLayer('b55:burned', W, H, (x, W, H) => { b55Sky(x, W, hz, false); b55Fields(x, W, H, hz, false);
    const wall = (x0, y0, w, h, col) => { x.fillStyle = col; x.beginPath(); x.moveTo(x0, y0 + h); for (let i = 0; i <= 8; i++) x.lineTo(x0 + w*i/8, y0 + hash(i, x0 | 0, 5541)*h*.35); x.lineTo(x0 + w, y0 + h); x.fill(); };
    wall(W*.08, H*.42, W*.3, H*.26, '#2a2624'); wall(W*.12, H*.5, W*.22, H*.2, '#1a1816'); x.fillStyle = '#0a0908'; x.fillRect(W*.16, H*.56, W*.04, H*.1); x.fillRect(W*.26, H*.56, W*.04, H*.1); // the house's walls, its window holes
    x.fillStyle = '#1e1a16'; x.fillRect(W*.52, H*.36, W*.34, H*.32); x.fillStyle = '#0c0a08'; x.beginPath(); x.moveTo(W*.5, H*.36); x.lineTo(W*.69, H*.24); x.lineTo(W*.88, H*.36); x.lineTo(W*.82, H*.36); x.lineTo(W*.69, H*.3); x.lineTo(W*.58, H*.4); x.fill(); // the barn, its roof-beams fallen in
    for (let i = 0; i < 6; i++) { x.strokeStyle = '#0a0806'; x.lineWidth = 2.4; x.beginPath(); x.moveTo(W*(.55 + i*.055), H*.36); x.lineTo(W*(.57 + i*.05), H*(.28 + hash(i, 5542)*.1)); x.stroke(); } // charred rafters
    x.fillStyle = '#050404'; x.fillRect(W*.64, H*.5, W*.1, H*.18); // the barn door, black
    x.fillStyle = '#2a2622'; ell(x, W*.42, H*.84, W*.06, H*.03, '#3a3632'); ell(x, W*.42, H*.83, W*.04, H*.018, '#050404'); // the well
    for (let i = 0; i < 5; i++) { ell(x, W*(.3 + i*.08), H*(.78 + hash(i, 5543)*.1), W*.025, H*.012, 'rgba(0,0,0,.5)'); ell(x, W*(.32 + i*.08), H*(.77 + hash(i, 5543)*.1), W*.018, H*.008, '#4a4034'); } // the deserters' holes, and their spoil
    x.strokeStyle = '#5a4630'; x.lineWidth = 1.6; x.beginPath(); x.moveTo(W*.46, H*.86); x.lineTo(W*.48, H*.76); x.stroke(); x.fillStyle = '#6a6a66'; x.fillRect(W*.47, H*.75, W*.012, H*.02); }), 0, 0, W, H); // a spade stuck in the ash
  if (!done) { b55Smoke(ctx, W, H, H*.3, t, mo, 0); for (let k = 0; k < 9; k++) { const u = k/9, sx = W*.69 + (mo ? Math.sin(t/1400 + u*3) : 0)*5 + u*u*W*.08; ctx.fillStyle = `rgba(60,56,52,${(.32*(1 - u)).toFixed(3)})`; ell(ctx, sx, H*.3 - u*H*.28, 5 + u*18, 4 + u*10, ctx.fillStyle); }
    const fl = b2Fl(t); ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.69, H*.62, H*.12, '#ff7a30', .3*fl); ctx.globalCompositeOperation = 'source-over'; } // smoke out of the barn, and its fire inside
  b55Smoke(ctx, W, H, hz, t, mo, 3);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.12 + i*17, H*.95, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .52, .5); };
/* a leaning milestone in a burned copse, the quartermaster's cut in its side, jars coming up out of the ash in a row */
SCENEX.b5_c5_cache = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, dug = !!(f.b5_c5_cache || (f.b5_c5_empty && !f.b5_c5_copse)), hz = H*.44;
  ctx.drawImage(sceneLayer('b55:cache' + (dug ? 'd' : ''), W, H, (x, W, H) => { b55Sky(x, W, hz, false); b55Fields(x, W, H, hz, false);
    for (let i = 0; i < 22; i++) { const tx = W*(.02 + hash(i, 5551)*.96), near = hash(i, 5552) > .6, top = H*(near ? .1 : .26) + hash(i, 5553)*H*.12; x.strokeStyle = near ? '#060504' : '#141210'; x.lineWidth = near ? 3 + hash(i, 5554)*3 : 1.6; x.beginPath(); x.moveTo(tx, H*(near ? .9 : .66)); x.lineTo(tx + (hash(i, 5555) - .5)*6, top); x.stroke();
      if (near) { x.lineWidth = 1.4; x.beginPath(); x.moveTo(tx, top + H*.12); x.lineTo(tx + (hash(i, 5556) > .5 ? 1 : -1)*W*.04, top + H*.06); x.stroke(); } } // the copse, burned to poles
    x.save(); x.translate(W*.44, H*.84); x.rotate(-.16); x.fillStyle = '#5a5650'; x.beginPath(); x.moveTo(-W*.04, 0); x.lineTo(-W*.04, -H*.3); x.quadraticCurveTo(0, -H*.38, W*.04, -H*.3); x.lineTo(W*.04, 0); x.fill(); x.fillStyle = 'rgba(255,250,230,.16)'; x.fillRect(-W*.04, -H*.3, W*.012, H*.3);
    x.strokeStyle = 'rgba(10,8,6,.85)'; x.lineWidth = 1.4; x.beginPath(); x.moveTo(-W*.02, -H*.24); x.lineTo(W*.02, -H*.24); x.moveTo(-W*.016, -H*.2); x.lineTo(W*.016, -H*.2); x.stroke(); x.lineWidth = 1.6; x.beginPath(); x.moveTo(-W*.024, -H*.08); x.lineTo(W*.016, -H*.08); x.moveTo(-W*.01, -H*.1); x.lineTo(-W*.01, -H*.06); x.moveTo(0, -H*.1); x.lineTo(0, -H*.06); x.moveTo(W*.016, -H*.08); x.quadraticCurveTo(W*.026, -H*.06, W*.016, -H*.04); x.stroke(); x.restore(); // the stone: the leagues, and low down the cut
  }), 0, 0, W, H);
  const jar = (jx, jy, s, open) => { ell(ctx, jx, jy + s*.5, s*.5, s*.12, 'rgba(0,0,0,.5)'); ctx.fillStyle = '#8a6a48'; ctx.beginPath(); ctx.moveTo(jx - s*.3, jy - s*.4); ctx.quadraticCurveTo(jx - s*.56, jy, jx - s*.3, jy + s*.5); ctx.lineTo(jx + s*.3, jy + s*.5); ctx.quadraticCurveTo(jx + s*.56, jy, jx + s*.3, jy - s*.4); ctx.fill();
    ctx.fillStyle = 'rgba(255,230,200,.2)'; ctx.fillRect(jx - s*.34, jy - s*.3, s*.08, s*.6); ctx.fillStyle = open ? '#1a120a' : '#6a4a30'; ell(ctx, jx, jy - s*.42, s*.24, s*.08, ctx.fillStyle); if (!open) { ctx.fillStyle = '#a07a50'; ell(ctx, jx, jy - s*.46, s*.1, s*.06, ctx.fillStyle); } };
  const s = Math.min(W*.06, H*.13); [.58, .66, .74, .82].forEach((u, i) => { ell(ctx, W*u, H*.83, s*.6, s*.2, 'rgba(0,0,0,.6)'); if (dug || !f.b5_c5_copse) jar(W*u, H*.78 - (i % 2)*H*.02, s, !!(f.b5_c5_empty && !f.b5_c5_copse) || !!f.b5_c5_cache); }); // the jars in a row
  ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 12; i++) { const ax = (hash(i, 5557)*W + (mo ? t*.006 : 0)) % W, ay = H*(.2 + hash(i, 5558)*.6); ctx.fillStyle = 'rgba(200,190,180,.1)'; ctx.fillRect(ax, ay, 1.4, 1.4); } ctx.globalCompositeOperation = 'source-over';
  drawFigure(ctx, 'b5_c5_quartermaster', W*.3, H*.9, 1.9, t, {still:true, dir:1});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.04 + i*15, H*.97, 1.5, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };
/* Brans Keep against its cliff, from the north road: the lake grey on the left, the dry channel on the right, the army's tents in front; dusk, night or morning */
SCENEX.b5_c5_arrival = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, ph = f.b5_c5_ph || 2, sky = f.b5_c5_nightDone ? 'morning' : ph >= 3 ? 'night' : 'dusk', hz = H*.42;
  ctx.drawImage(sceneLayer('b55:keep' + sky, W, H, (x, W, H) => {
    const st = sky === 'night' ? [[0,'#04060e'],[1,'#141a26']] : sky === 'morning' ? [[0,'#5a6270'],[.6,'#9aa0a0'],[1,'#c8c0a8']] : [[0,'#2a2a48'],[.5,'#5a4a62'],[.85,'#b07a5a'],[1,'#d0905a']];
    x.fillStyle = vgrad(x, 0, hz, st); x.fillRect(0, 0, W, hz + 2);
    if (sky === 'night') for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 5561)*.45).toFixed(2)})`; x.fillRect(hash(i, 5562)*W, Math.pow(hash(i, 5563), 1.4)*hz*.7, 1, 1); }
    const hill = sky === 'night' ? '#0a0a0e' : sky === 'morning' ? '#5a5a5a' : '#3a3040'; x.fillStyle = hill; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 24; i++) x.lineTo(W*i/24, hz - H*(.06 + hash(i, 5564)*.06)); x.lineTo(W, hz); x.fill(); // barren hills behind
    const cl = sky === 'night' ? '#0e0e12' : sky === 'morning' ? '#6a6662' : '#4a4048'; x.fillStyle = cl; x.beginPath(); x.moveTo(W*.36, hz + H*.02); x.lineTo(W*.4, hz - H*.24); x.lineTo(W*.58, hz - H*.28); x.lineTo(W*.66, hz - H*.16); x.lineTo(W*.68, hz + H*.02); x.fill(); // the cliff
    const kc = sky === 'night' ? '#08080a' : sky === 'morning' ? '#4a4844' : '#2a2630'; x.fillStyle = kc; x.fillRect(W*.42, hz - H*.12, W*.2, H*.14); x.fillRect(W*.4, hz - H*.18, W*.04, H*.2); x.fillRect(W*.6, hz - H*.18, W*.04, H*.2); // the keep, squat, its corner towers
    for (let i = 0; i < 6; i++) x.fillRect(W*(.425 + i*.034), hz - H*.14, W*.016, H*.02); // crenels
    x.fillStyle = vgrad(x, hz, H, sky === 'night' ? [[0,'#0c100a'],[1,'#050604']] : sky === 'morning' ? [[0,'#5a5a3a'],[1,'#3a3a24']] : [[0,'#4a4a2e'],[1,'#2a2a1a']]); x.fillRect(0, hz, W, H - hz); // the field
    x.fillStyle = sky === 'night' ? '#0e141c' : sky === 'morning' ? '#7a8490' : '#5a5a6a'; x.beginPath(); x.moveTo(0, hz + H*.01); x.lineTo(W*.36, hz + H*.01); x.lineTo(W*.3, hz + H*.08); x.lineTo(0, hz + H*.12); x.fill(); x.fillStyle = 'rgba(255,255,255,.08)'; x.fillRect(0, hz + H*.03, W*.3, 1); // Lake Brans, still
    x.fillStyle = sky === 'night' ? '#14120e' : '#3a3428'; x.beginPath(); x.moveTo(W*.7, hz + H*.02); x.lineTo(W*.74, hz + H*.02); x.lineTo(W*.98, H); x.lineTo(W*.82, H); x.fill(); x.fillStyle = 'rgba(0,0,0,.35)'; x.beginPath(); x.moveTo(W*.7, hz + H*.02); x.lineTo(W*.71, hz + H*.02); x.lineTo(W*.84, H); x.lineTo(W*.82, H); x.fill(); // the dry channel, running toward you
    for (let r = 0; r < 5; r++) for (let i = 0; i < 18; i++) { const y = hz + H*(.05 + r*.07), s = .5 + r*.35, tx = W*(.04 + i*.055) + (r % 2)*W*.02; if (tx > W*.68 && tx < W*.86 + r*W*.03) continue; x.fillStyle = sky === 'night' ? '#1c2026' : sky === 'morning' ? '#8a909a' : '#6a707a'; x.beginPath(); x.moveTo(tx - 5*s, y); x.lineTo(tx, y - 5*s); x.lineTo(tx + 5*s, y); x.fill(); } // the army's tents in lines
    x.fillStyle = sky === 'night' ? '#0a0a08' : '#2a2418'; x.beginPath(); x.moveTo(W*.4, H); x.lineTo(W*.47, H*.78); x.lineTo(W*.53, H*.78); x.lineTo(W*.6, H); x.fill(); // the north road, coming down to the lines
  }), 0, 0, W, H);
  if (sky !== 'morning') for (let r = 0; r < 5; r++) for (let i = 0; i < 9; i++) { const fx = W*(.06 + i*.11 + (r % 2)*.03), fy = hz + H*(.07 + r*.07), fl = mo ? .6 + Math.sin(t/180 + i + r*3)*.4 : .9; if (fx > W*.68 && fx < W*.88) continue; ctx.fillStyle = `rgba(255,160,80,${((sky === 'night' ? .85 : .5)*fl).toFixed(2)})`; ctx.fillRect(fx, fy, 1.6 + r*.4, 1.6 + r*.4); } // the army's fires coming out
  else for (let i = 0; i < 8; i++) { const sx = W*(.08 + i*.12); for (let k = 0; k < 4; k++) { const u = k/4; ctx.fillStyle = `rgba(200,196,190,${(.12*(1 - u)).toFixed(3)})`; ell(ctx, sx + (mo ? Math.sin(t/2000 + i) : 0)*4 + u*10, hz + H*.1 - u*H*.12, 3 + u*8, 2 + u*4, ctx.fillStyle); } } // breakfast smoke
  [[.43, '#c9a35a'], [.6, '#8a2a22'], [.78, '#e8e4d8'], [.88, '#e8e4d8']].forEach(([u, c], i) => { const sx = W*u, sy = hz - (u < .7 ? H*.18 : -H*.04), fl = mo ? Math.sin(t/420 + i*1.7) : 0; ctx.strokeStyle = '#1a1612'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, sy - H*.06); ctx.stroke(); poly(ctx, [[sx, sy - H*.06], [sx + 8 + fl, sy - H*.055], [sx + 7 + fl*1.4, sy - H*.035], [sx, sy - H*.03]], c); }); // banners on the towers, and the white of the battalion on the right
  if (sky === 'night') { ctx.fillStyle = 'rgba(2,2,6,.25)'; ctx.fillRect(0, 0, W, H); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.18 + i*17, H*.95, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, sky === 'night' ? .62 : .46, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Five's ground ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on dark canal-slate with a thin dock-gold rim (Claude's call) */
function b55Item(key, label, body){ const w = 240, h = 130, id = 'c55-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#34444a"></stop><stop offset=".7" stop-color="#1a2428"></stop><stop offset="1" stop-color="#0e1214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a cache shortsword, still in grease: the blade wrapped in greased cloth, the hilt out, a cache's clay seal on the cord */
b55Item('b5_c5_cacheblade', 'A cache shortsword, still in grease', '<ellipse cx="122" cy="104" rx="88" ry="7" fill="#000" opacity=".35"/>'
  + '<path d="M58 70 L176 58 Q186 58 192 62 Q186 66 176 68 L58 80 Z" fill="#7a7a72"/><path d="M60 72 L176 60" stroke="#e8e8e0" stroke-width="1.2" opacity=".55"/>'
  + '<path d="M84 64 Q100 58 118 60 Q138 56 160 56 Q172 58 178 62 Q172 70 158 72 Q138 74 118 76 Q98 80 84 80 Q78 72 84 64 Z" fill="#8a7a58" opacity=".92"/><path d="M84 64 Q100 58 118 60 Q138 56 160 56" fill="none" stroke="#c8b888" stroke-width="1" opacity=".55"/>'
  + '<g stroke="#5a4a30" stroke-width="1" opacity=".6"><path d="M96 62 L100 79"/><path d="M114 60 L118 77"/><path d="M134 58 L138 75"/><path d="M154 57 L157 72"/></g><path d="M92 70 Q120 66 150 64" fill="none" stroke="#e8e0c0" stroke-width="2" opacity=".25"/>'
  + '<rect x="50" y="64" width="10" height="24" rx="2" fill="#4a3a22"/><path d="M46 62 L64 60 L64 66 L46 68 Z" fill="#8a7040"/><path d="M47 63 L63 61" stroke="#e0c070" stroke-width=".8" opacity=".6"/>'
  + '<path d="M26 72 Q24 70 30 68 L50 66 L50 84 L30 84 Q24 82 26 76 Z" fill="#3a2a18"/><g stroke="#1e1610" stroke-width="1"><path d="M32 68 L32 84"/><path d="M38 67 L38 84"/><path d="M44 66 L44 84"/></g><circle cx="24" cy="76" r="5" fill="#8a7040"/>'
  + '<path d="M120 78 Q122 92 116 102" fill="none" stroke="#6a5030" stroke-width="1.4"/><ellipse cx="114" cy="106" rx="9" ry="7" fill="#9a6a44"/><ellipse cx="112" cy="104" rx="5" ry="3" fill="#b88a5e" opacity=".7"/><path d="M110 104 L118 108 M114 101 L114 111" stroke="#6a4428" stroke-width="1" opacity=".8"/>');
/* a cache bow, unstrung: a plain yew stave lashed to a bark tube, the waxed string coiled at the tube's mouth, a cache seal on the lashing */
b55Item('b5_c5_cachebow', 'A cache bow, unstrung', '<ellipse cx="120" cy="104" rx="92" ry="7" fill="#000" opacity=".35"/>'
  + '<path d="M28 80 Q120 50 212 80" fill="none" stroke="#8a5a2a" stroke-width="6" stroke-linecap="round"/><path d="M30 78 Q120 49 210 78" fill="none" stroke="#c89a5a" stroke-width="1.6" opacity=".6"/>'
  + '<rect x="110" y="56" width="20" height="10" rx="2" fill="#4a3220"/><path d="M26 82 L22 86 M214 82 L218 86" stroke="#5a3a1a" stroke-width="3" stroke-linecap="round"/>'
  + '<path d="M44 86 L196 86 Q204 86 204 94 Q204 102 196 102 L44 102 Q36 102 36 94 Q36 86 44 86 Z" fill="#6a5238"/><g stroke="#3a2a1a" stroke-width="1" opacity=".7"><path d="M60 87 Q62 94 58 101"/><path d="M90 87 Q88 94 92 101"/><path d="M130 87 Q132 94 128 101"/><path d="M170 87 Q168 94 172 101"/></g><path d="M44 88 L196 88" stroke="#a88a64" stroke-width="1" opacity=".5"/>'
  + '<ellipse cx="38" cy="94" rx="4" ry="8" fill="#2a1e14"/><path d="M36 90 Q30 92 32 96 Q36 100 30 102" fill="none" stroke="#e8dcb8" stroke-width="1.2"/>'
  + '<g stroke="#c8b088" stroke-width="2"><path d="M76 74 L78 104"/><path d="M164 74 L162 104"/></g><ellipse cx="164" cy="110" rx="8" ry="6" fill="#9a6a44"/><ellipse cx="162" cy="108" rx="4" ry="2.4" fill="#b88a5e" opacity=".7"/><path d="M160 108 L168 112 M164 105 L164 114" stroke="#6a4428" stroke-width="1" opacity=".8"/>');
/* the house's scale: bright new scale on a padded coat, a small stamp of a scale-balance inside the collar */
b55Item('b5_c5_housemail', 'The house\'s scale', '<ellipse cx="120" cy="114" rx="66" ry="6" fill="#000" opacity=".35"/>'
  + '<path d="M72 34 Q96 24 120 30 Q144 24 168 34 L182 52 L170 60 L168 110 L72 110 L70 60 L58 52 Z" fill="#4a4e56"/>'
  + '<g fill="#b8bcc4" stroke="#5a5e66" stroke-width=".8">' + (() => { let s = ''; for (let r = 0; r < 7; r++) for (let c = 0; c < 9; c++) { const x = 78 + c*10 + (r % 2)*5, y = 46 + r*9; if (x > 164) continue; s += `<path d="M${x} ${y} Q${x + 5} ${y + 9} ${x + 10} ${y} Z"/>`; } return s; })() + '</g>'
  + '<path d="M80 50 Q90 46 98 52" fill="none" stroke="#fff" stroke-width="1.4" opacity=".5"/><path d="M96 30 Q120 44 144 30 Q140 40 120 46 Q100 40 96 30 Z" fill="#2a2c32"/>'
  + '<g transform="translate(120 38)"><path d="M-6 -2 L6 -2 M0 -6 L0 4 M-4 4 L4 4" stroke="#c9a35a" stroke-width="1.1"/><path d="M-8 -2 L-6 2 L-4 -2 M4 -2 L6 2 L8 -2" fill="none" stroke="#c9a35a" stroke-width=".9"/></g>'
  + '<path d="M58 52 L70 60 L68 76 L56 66 Z M182 52 L170 60 L172 76 L184 66 Z" fill="#3a3e46"/><path d="M72 108 L168 108" stroke="#2a2c32" stroke-width="3"/>');
/* a Bluerose girth-strap, cut through: a leather strap with an iron buckle, cut most of the way through on the inside */
b55Item('b5_c5_girth', 'A Bluerose girth-strap, cut through', '<ellipse cx="120" cy="104" rx="90" ry="7" fill="#000" opacity=".35"/>'
  + '<path d="M30 70 Q80 60 120 66 Q160 72 210 62 L212 78 Q160 88 120 82 Q80 76 32 86 Z" fill="#6a4a2e"/><path d="M32 72 Q80 62 120 68 Q160 74 210 64" fill="none" stroke="#a8805a" stroke-width="1.2" opacity=".55"/>'
  + '<g stroke="#3a2614" stroke-width=".8" opacity=".6"><path d="M40 72 L40 84"/><path d="M60 69 L61 80"/><path d="M180 71 L180 82"/><path d="M196 67 L196 79"/></g>'
  + '<path d="M118 66 L124 66 L125 78 L120 82 L117 78 Z" fill="#1a120a"/><path d="M119 67 L123 67 L123 76 L120 79 L118 76 Z" fill="#c8a07a"/><path d="M121 67 L121 78" stroke="#e8d0b0" stroke-width=".6" opacity=".7"/>'
  + '<rect x="190" y="56" width="26" height="30" rx="4" fill="none" stroke="#5a5a56" stroke-width="5"/><rect x="190" y="56" width="26" height="30" rx="4" fill="none" stroke="#a8a8a0" stroke-width="1.2" opacity=".5"/><path d="M200 60 L200 82" stroke="#6a6a66" stroke-width="3"/>'
  + '<g fill="#2a1a0c"><circle cx="52" cy="78" r="2.2"/><circle cx="72" cy="74" r="2.2"/><circle cx="92" cy="72" r="2.2"/></g><path d="M112 92 Q120 98 128 92" fill="none" stroke="#e8c070" stroke-width="1" opacity=".5"/>');
