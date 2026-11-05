/* ============ Book Four, Chapter 7 art: The Convergence — the flank picket at Pan'arak, the night the dead rode, the morning, the flood,
   the coral island, and the end of Book Four ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/70d/75b, lit from the left: the desert warriors running out of Raraku before dawn (robes
   hitched up, the head-cloth come loose and streaming, leaning into the run), their leader with the good sword; a ghost rider (light and
   dust, a horse and a rider made of it, and where the face would be only a soft brightness: no face is ever drawn); a giant on a horse,
   far off (a silhouette, nothing more). Three grounds (TILEX): the picket's hard sand, scrub and screen at night and in the morning; the
   end of the line before dawn; the coral island in the new sea. Backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the
   rest still): the basin at night with the dark above the oasis changing; the ride as light and dust going by toward the ramps; the end of
   the line before dawn; the silent morning; the duel as two specks on a plain; the giant going west; the flood; the island (b4_coral,
   redrawn); the finale. Grim things stay distant: the trenches are dark lines, the dead are never drawn, the duel is two specks. */

/* ---------------- figures ---------------- */
/* a desert warrior running: a robe hitched into the sash, bare shins and sandals, the head-cloth come loose and streaming back, leaning
   forward into the run; kind 'blade' (a tulwar), 'bow' (a horn bow in the fist), 'chief' (bigger: mail under the robe, a straight sword) */
function b47Fleer(ctx, h, t, o, kind){ ctx.save(); const chief = kind === 'chief';
  const rb = b2Pick(o, [['#9a7a52', '#3e2c18'], ['#7e684e', '#30241a'], ['#a68a62', '#4a3820'], ['#6e5a44', '#2a2016']]), sk = b2Pick(o, ['#7a5438', '#8a6244', '#6a4a32']), cl = b2Pick(o, ['#c0a878', '#9a8a6a', '#b49a70']);
  const k = o.still ? .3 : (t/150 + (o.phase || 0)*1.7) % (Math.PI*2), st = Math.sin(k), fl = o.still ? .4 : .5 + .5*Math.sin(t/110 + (o.phase || 0));
  ctx.translate(0, 13); ctx.rotate(.12); ctx.translate(0, -13); // leaning into the run
  if (chief) B2F.grow(ctx, 1.08, 1.06);
  // legs in stride: one forward, one back, the shins bare, sandals
  ctx.fillStyle = sk; ctx.save(); ctx.translate(-1.6, 5); ctx.rotate(.5*st); ctx.fillRect(-1.6, 0, 3.2, 8); ctx.fillStyle = '#2a1c10'; ctx.fillRect(-1.8, 7, 3.8, 1.2); ctx.restore();
  ctx.fillStyle = shade(sk, -.08); ctx.save(); ctx.translate(1.8, 5); ctx.rotate(-.5*st); ctx.fillRect(-1.6, 0, 3.2, 8); ctx.fillStyle = '#2a1c10'; ctx.fillRect(-1.6, 7, 3.8, 1.2); ctx.restore();
  // the robe, hitched up into the sash, its back hem flying
  poly(ctx, [[-6.2, -6], [6, -6], [6.4, 5], [2, 6.2], [-2.4, 5.6], [-8.4 - fl*1.6, 7.4], [-9.6 - fl*2, 4.6], [-7, 2]], h.armor(rb[0], rb[1]));
  ctx.fillStyle = 'rgba(255,236,200,.13)'; ctx.fillRect(-5.8, -5.4, 1.6, 9); ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(-2, -4); ctx.lineTo(-4.6 - fl, 5); ctx.moveTo(2.4, -4); ctx.lineTo(3, 5.4); ctx.stroke();
  if (chief) { ctx.fillStyle = 'rgba(170,170,176,.55)'; for (let r = 0; r < 3; r++) for (let i = 0; i < 5; i++) ctx.fillRect(-4.4 + i*2 + (r % 2)*.8, -4.6 + r*1.6, 1.2, .8); } // mail at the breast, under the robe
  ctx.fillStyle = b2Pick(o, ['#6a2a1e', '#3a3a2a', '#5a4020']); ctx.fillRect(-6.6, 1.4, 13, 1.6); // the sash
  // arms: the back one pumping, the front one with the blade or the bow
  ctx.fillStyle = rb[0]; ctx.save(); ctx.translate(-6.6, -4.6); ctx.rotate(-.6*st - .2); ctx.fillRect(-1.2, 0, 2.4, 6.4); ell(ctx, 0, 6.6, 1.1, 1.1, sk); ctx.restore();
  ctx.fillRect(6, -5, 2.4, 5.6); ell(ctx, 7.2, 1, 1.2, 1.2, sk);
  if (kind === 'bow') { ctx.save(); ctx.translate(.6, 1.4); B2F.bow(ctx, 8.2, -10.4, 7); ctx.restore(); ctx.fillStyle = '#3a2814'; ctx.fillRect(-7.8, -8, 1.6, 7.4); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-7.6, -9.6, .6, 2); ctx.fillRect(-6.8, -9.8, .6, 2.2); } // a horn bow, a quiver
  else if (chief) { B2F.line(ctx, '#d8d2c6', 1.3, [[7.2, .8], [13, -9.4]]); B2F.line(ctx, '#7a5a2a', 1.8, [[6.2, 3.2], [7.6, .4]]); ctx.fillStyle = '#c8a050'; ctx.fillRect(5.8, .2, 3.6, .9); } // the good sword, straight, a gilt guard
  else B2F.curved(ctx, '#c8c0ae', .95); // a tulwar
  // the head: face, eyes, and the cloth come loose round the jaw and streaming back
  h.head(sk, 4.2, -11.2); h.look('rgba(16,10,6,.9)', -11.4); ctx.fillStyle = 'rgba(40,24,16,.4)'; ctx.fillRect(-3.4, -8.8, 7, 1.4);
  ctx.fillStyle = cl; ctx.beginPath(); ctx.arc(0, -12, 5, Math.PI*.9, Math.PI*2.08); ctx.fill(); ctx.fillRect(-5, -12.6, 10, 1.3); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(-5, -11.6, 10, .6);
  poly(ctx, [[-4.4, -12.4], [-6.4, -10.4], [-12 - fl*2.4, -9.6 + fl], [-14 - fl*2.8, -7.4 + fl*1.4], [-9.4 - fl, -7.6], [-5, -8.6]], cl); poly(ctx, [[-6.4, -10.4], [-12 - fl*2.4, -9.6 + fl], [-11 - fl*2, -8.8 + fl], [-6, -9.4]], shade(cl, -.2)); // the tail of it, streaming
  if (chief) { ctx.fillStyle = '#1a120c'; ctx.fillRect(-3.4, -7.6, 7, 2.2); } // a beard
  // the dust they kick up, behind (still when motion is reduced)
  if (!o.still && !REDUCE()) for (let i = 0; i < 3; i++) { const q = ((t/500 + i/3 + (o.phase || 0)*.21) % 1); ctx.fillStyle = `rgba(200,180,140,${(.32*(1 - q)).toFixed(2)})`; ell(ctx, -6 - q*10, 12 - q*2, 1.6 + q*3, 1 + q*1.4, ctx.fillStyle); }
  ctx.restore(); }

/* a ghost rider: a horse and a rider made of grey light and dust, going at the gallop with no weight; a soft brightness where the face would
   be; dust streaming off it behind. Drawn added onto the ground (lighter), and pale enough that the ground shows through. */
function b47Ghost(ctx, h, t, o){ ctx.save(); const ph = o.phase || 0, g = o.still ? 0 : (t/140 + ph) % (Math.PI*2), lift = o.still ? 0 : Math.sin(g)*.8, a0 = ctx.globalAlpha;
  const flick = o.still || REDUCE() ? .85 : .75 + .25*Math.sin(t/90 + ph*3), L = (a, c = '230,224,206') => `rgba(${c},${(a*flick).toFixed(3)})`;
  ctx.globalCompositeOperation = 'lighter'; ctx.translate(0, lift);
  glow(ctx, 0, 0, 16, '#d8d0b8', .14*flick); // the light it carries
  // the dust it leaves, streaming back low
  if (!o.still && !REDUCE()) for (let i = 0; i < 7; i++) { const q = ((t/420 + i/7 + ph*.17) % 1); ctx.fillStyle = L(.22*(1 - q), '210,196,166'); ell(ctx, -8 - q*18, 6 + Math.sin(i*2.1)*3 - q*3, 2 + q*4, 1.2 + q*2, ctx.fillStyle); }
  else for (let i = 0; i < 4; i++) { ctx.fillStyle = L(.14, '210,196,166'); ell(ctx, -10 - i*4, 6 - i, 3 + i, 1.6 + i*.5, ctx.fillStyle); }
  // the horse: a barrel, a neck stretched out, legs reaching, a tail streaming; all of it soft light
  ctx.fillStyle = L(.42); ctx.beginPath(); ctx.ellipse(0, 3, 9, 3.6, -.05, 0, 7); ctx.fill();
  ctx.fillStyle = L(.36); poly(ctx, [[6.6, 1.4], [11.6, -3.6], [14, -3], [9.6, 4]], ctx.fillStyle); ctx.beginPath(); ctx.ellipse(13.6, -3.4, 2.6, 1.5, .4, 0, 7); ctx.fill(); // neck and head, reaching
  ctx.strokeStyle = L(.36); ctx.lineWidth = 1.5; ctx.lineCap = 'round'; const sw = Math.sin(g)*3;
  [[5, 5, 9 + sw, 11], [3, 5, 2 - sw, 11.6], [-5, 5, -2 + sw, 11], [-7, 5, -11 - sw, 10.4]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); }); // legs at the gallop
  ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-8.6, 1.6); ctx.quadraticCurveTo(-13, 0 - lift, -16, 2.4); ctx.stroke(); ctx.lineCap = 'butt'; // the tail
  ctx.strokeStyle = L(.3); ctx.lineWidth = .8; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(8 + i, -1 - i*.8); ctx.lineTo(5 + i*.6 - sw*.3, -3.6 - i*.8); } ctx.stroke(); // the mane, blowing
  // the rider: low over the neck, a cloak streaming, a lance or nothing
  ctx.fillStyle = L(.46); poly(ctx, [[-3.6, 0], [3.4, -.6], [5.2, -8.6], [1, -11.6], [-3, -9]], ctx.fillStyle);
  ctx.fillStyle = L(.26); poly(ctx, [[-2.6, -9.4], [-9 - sw, -8], [-15 - sw*1.4, -4.4], [-8, -4.6], [-3, -3]], ctx.fillStyle); // the cloak
  if (ph % 3 === 1) { ctx.strokeStyle = L(.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-2, -5); ctx.lineTo(18, -12); ctx.stroke(); } // a lance, couched
  if (ph % 3 === 2) { ctx.fillStyle = L(.3); poly(ctx, [[1.4, -10.4], [-1.6, -12.4], [-3.4, -9], [-1, -8.4]], ctx.fillStyle); } // braids, or crow feathers
  glow(ctx, 3.4, -13.6, 4.2, '#fff6e0', .5*flick); ctx.fillStyle = L(.55, '255,248,232'); ell(ctx, 3.4, -13.6, 2.8, 3, ctx.fillStyle); // the head: a brightness, no face
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = a0; ctx.restore(); }

/* a giant on a horse, very far off: a silhouette, the horse bigger than any horse, the rider as tall again, something long across his back */
function b47Giant(ctx, h, t, o){ ctx.save(); const s = o.still ? 0 : Math.sin(t/300 + (o.phase || 0)), col = '#1c1612', rim = 'rgba(232,206,160,.28)';
  ctx.translate(0, -4); ctx.scale(1.5, 1.5); ctx.translate(0, 4);
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 1.6, 11.6, 4.6, 0, 0, 7); ctx.fill(); // the horse's barrel, bigger than any horse
  poly(ctx, [[-8, -.6], [-12.4, -7.6], [-15.6, -7.4], [-13.4, 1.4]], col); ctx.beginPath(); ctx.ellipse(-15.6, -7, 3.2, 1.7, -.4, 0, 7); ctx.fill(); poly(ctx, [[-13.6, -8.4], [-12.8, -10.4], [-12.4, -8.2]], col); // neck and head up, an ear (facing left)
  ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.lineCap = 'round'; [[-7.4, 5, -8.2 + s, 13], [-5, 5, -4.2 - s, 13], [6, 5, 6.8 - s, 13], [8.4, 5, 7.8 + s, 13]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); });
  ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(11, 0); ctx.quadraticCurveTo(14.4, 3, 13.6, 8); ctx.stroke(); // the tail, hanging
  poly(ctx, [[-3.4, -1], [3.6, -1], [4.4, -10], [2, -16], [-2.4, -16], [-4.2, -10]], col); ell(ctx, -.2, -18.6, 2.6, 2.8, col); poly(ctx, [[-2.8, -1], [-4.4, 4], [-2.4, 4.4], [-1.2, -1]], col); // the rider, upright, huge, a leg down the horse's side
  ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-6.4, -7); ctx.lineTo(6.4, -20); ctx.stroke(); ctx.lineCap = 'butt'; // something long across his back
  ctx.strokeStyle = rim; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(-3, -16); ctx.lineTo(-4.2, -10); ctx.lineTo(-3.4, -1); ctx.moveTo(-11, .6); ctx.quadraticCurveTo(-4, -3, 8, -2.4); ctx.stroke(); // the low sun on its edge
  ctx.restore(); }
Object.assign(FIGX, {
  /* a desert warrior running out of Raraku before dawn: robe hitched up, the head-cloth come loose and streaming, a tulwar */
  b4_c7_fleer(ctx, h, t, o){ b47Fleer(ctx, h, t, o, 'blade'); },
  /* the same with a horn bow */
  b4_c7_fleerbow(ctx, h, t, o){ b47Fleer(ctx, h, t, o, 'bow'); },
  /* their leader: bigger, bearded, mail under the robe, the good sword */
  b4_c7_fleechief(ctx, h, t, o){ b47Fleer(ctx, h, t, o, 'chief'); },
  /* a ghost rider: light and dust, no face */
  b4_c7_ghost(ctx, h, t, o){ b47Ghost(ctx, h, t, o); },
  /* a giant on a horse, far off: a silhouette only */
  b4_c7_karsa(ctx, h, t, o){ b47Giant(ctx, h, t, o); },
});

/* ---------------- ground: TILEX ----------------
   b4_c7_picket: the flank picket's ground, at night and in the morning (the same map): '.' hard sand (75b's), ',' scrub (thorn and dry tufts),
     '#' rock, '=' the picket screen (stakes with brush and hide lashed between, the basin seen through the gaps), 't' the scrape behind it
     (a shallow trench with its spoil thrown up forward), 'L' the lookout rock, 'F' the shielded fire (a hide on stakes over a pit of coals).
   b4_c7_breach: the end of the line before dawn: the same sand going blue-grey, scrub, rock, '=' the last stakes of the screen; the
     east (the right) a little paler.
   b4_c7_isle: the coral island: '.' pale coral, pitted, ',' wet sand at the water's edge, '~' the new sea (shallow and clear at the edge,
     grey further out, foam where it meets the coral), 'c' a head of coral, 'F' the Third's driftwood fire. In a fight 'o' is the water and
     't' a coral head; on the picket 't' is a stretch of the screen, at the breach a stake. */
const b47At = (x, y, c) => !!tileMap && !!tileMap[y] && tileMap[y][x] === c;
const b47In = (x, y, cs) => !!tileMap && !!tileMap[y] && cs.includes(tileMap[y][x]);
/* the picket's sand: 75b's, and before dawn at the breach cooled toward blue, with the east end paler */
function b47Sand(ctx, x, y, T, N, dawn){ b45Sand(ctx, x, y, T, N); if (dawn) { const px = x*T, py = y*T, k = clamp(x/15, 0, 1); ctx.fillStyle = `rgba(90,110,150,${(.16 - k*.06).toFixed(3)})`; ctx.fillRect(px, py, T, T); ctx.fillStyle = `rgba(200,190,200,${(k*.08).toFixed(3)})`; ctx.fillRect(px, py, T, T); } }
function b47Scrub(ctx, x, y, T, N, dawn){ b47Sand(ctx, x, y, T, N, dawn); const px = x*T, py = y*T;
  for (let i = 0; i < 3; i++) { const cx = px + T*(.2 + hash(x, y, i + 40)*.6), by = py + T*(.4 + hash(y, x, i + 41)*.5), r = T*(.08 + hash(x, y, i + 42)*.08);
    ell(ctx, cx + r*.4, by + r*.2, r*1.1, r*.35, N ? 'rgba(0,0,0,.4)' : 'rgba(90,64,36,.3)');
    ctx.strokeStyle = N ? '#2a2620' : '#6a5a36'; ctx.lineWidth = Math.max(1, T*.022); ctx.beginPath(); for (let j = 0; j < 6; j++) { const a = -Math.PI*(.15 + j/6*.7); ctx.moveTo(cx, by); ctx.lineTo(cx + Math.cos(a)*r*1.6, by + Math.sin(a)*r*1.6); } ctx.stroke(); // thorn, dry
    ctx.fillStyle = N ? '#3a3628' : '#8a7a48'; for (let j = 0; j < 3; j++) ctx.fillRect(cx + (hash(x, j, i) - .5)*r*2, by - r*(.6 + hash(j, y, i)*.8), Math.max(1, T*.03), Math.max(1, T*.03)); } }
/* the screen: sharpened stakes with brush and hide lashed between them, the gaps showing the dark beyond */
function b47Screen(ctx, x, y, T, N, last, piece){ const px = x*T, py = y*T;
  if (!piece) { ctx.fillStyle = N ? '#121014' : '#8a7454'; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, N ? .04 : .1, N ? .3 : .14, N ? '180,170,180' : '255,236,200', 1); }
  if (!last) { ctx.fillStyle = N ? '#26201a' : '#6a5a3a'; ctx.fillRect(px, py + T*.36, T, T*.4); // the brush, a long low bank of it
    ctx.strokeStyle = N ? '#3a3226' : '#8a7444'; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); for (let i = 0; i < 10; i++) { const bx = px + hash(x, y, i + 60)*T, by = py + T*(.38 + hash(y, x, i + 61)*.34); ctx.moveTo(bx, by); ctx.lineTo(bx + (hash(x, y, i + 62) - .5)*T*.3, by - T*(.1 + hash(x, y, i + 63)*.18)); } ctx.stroke();
    if (hash(x, y, 70) > .5) { ctx.fillStyle = N ? '#3a2c22' : '#9a7a52'; ctx.fillRect(px + T*.12, py + T*.42, T*.5, T*.26); ctx.fillStyle = N ? 'rgba(0,0,0,.3)' : 'rgba(60,40,20,.3)'; ctx.fillRect(px + T*.12, py + T*.62, T*.5, T*.06); } } // a hide lashed across
  for (let i = 0; i < (last ? 2 : 3); i++) { const bx = px + T*(.16 + i*(last ? .5 : .34)), by = py + T*.86, tx = bx + T*.05, ty = py + T*(.12 + hash(x, y, i)*.12); ctx.strokeStyle = N ? '#3a2e24' : '#6a4a2a'; ctx.lineWidth = Math.max(1.4, T*.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(tx, ty); ctx.stroke(); ctx.lineCap = 'butt'; } // the stakes, upright, sharpened
  if (!piece) { ctx.fillStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(70,50,30,.3)'; ctx.fillRect(px, py + T*.84, T, T*.16); } } // the shadow it throws back on the scrape
/* the scrape: a shallow trench, its spoil thrown up forward */
function b47Scrape(ctx, x, y, T, N){ const px = x*T, py = y*T; b45Sand(ctx, x, y, T, N);
  ctx.fillStyle = N ? '#1a1614' : '#9a8058'; ctx.fillRect(px, py + T*.1, T, T*.22); ctx.fillStyle = N ? 'rgba(200,180,160,.08)' : 'rgba(255,240,210,.3)'; ctx.fillRect(px, py + T*.1, T, T*.05); // the spoil bank, lit on its crest
  ctx.fillStyle = N ? '#0c0a0c' : '#6a5436'; ctx.fillRect(px, py + T*.34, T, T*.46); const g = ctx.createLinearGradient(0, py + T*.34, 0, py + T*.8); g.addColorStop(0, N ? 'rgba(0,0,0,.6)' : 'rgba(40,26,12,.5)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(px, py + T*.34, T, T*.46); } // the hollow, in its own shadow
/* the shielded fire: a hide on four stakes over a pit, a little light escaping under it, more smoke than flame */
function b47Shielded(ctx, x, y, T, N, t){ const px = x*T, py = y*T, cx = px + T*.5, cy = py + T*.62; b45Sand(ctx, x, y, T, N);
  ell(ctx, cx, cy, T*.3, T*.12, '#0a0604'); if (N) { glow(ctx, cx, cy, T*.5, '#ff7a30', .28); ell(ctx, cx, cy, T*.16, T*.05, 'rgba(255,150,70,.7)'); } else { ell(ctx, cx, cy, T*.18, T*.06, 'rgba(90,80,70,.8)'); } // the coals, or cold ash
  ctx.strokeStyle = N ? '#3a2e24' : '#6a4a2a'; ctx.lineWidth = Math.max(1, T*.035); ctx.beginPath(); [[-.32, .1], [.32, .1], [-.26, -.1], [.28, -.1]].forEach(([dx, dy]) => { ctx.moveTo(cx + dx*T, cy + dy*T + T*.06); ctx.lineTo(cx + dx*T, cy + dy*T - T*.3); }); ctx.stroke();
  poly(ctx, [[cx - T*.38, cy - T*.28], [cx + T*.36, cy - T*.34], [cx + T*.34, cy - T*.18], [cx - T*.36, cy - T*.12]], N ? '#3a2c22' : '#9a7a52'); // the hide over it
  if (N) { ctx.fillStyle = 'rgba(255,150,70,.22)'; ctx.fillRect(cx - T*.34, cy - T*.14, T*.68, T*.04); } } // the light under its edge
function b47Lookout(ctx, x, y, T, N){ b45Sand(ctx, x, y, T, N); b45Boulder(ctx, x, y, T, N, 1.15); }
function b47PicketTile(ctx, ch, x, y, T, N, dawn){ const px = x*T, py = y*T;
  if (ch === ',') return b47Scrub(ctx, x, y, T, N, dawn);
  if (ch === '=') return b47Screen(ctx, x, y, T, N, dawn);
  if (ch === 't') return b47Scrape(ctx, x, y, T, N);
  if (ch === 'F') return b47Shielded(ctx, x, y, T, N);
  if (ch === 'L') return b47Lookout(ctx, x, y, T, N);
  if (ch === '#') { b47Sand(ctx, x, y, T, N, dawn); b45Boulder(ctx, x, y, T, N, .95); return; }
  b47Sand(ctx, x, y, T, N, dawn); if (ch !== '.' && ch !== 'o') exitArrow(ctx, ch, px, py, T); }
TILEX.b4_c7_picket = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { b47PicketTile(ctx, ch, x, y, T, !!dark, false); if (dark && ch !== 'F') b2Firelit(ctx, x, y, T, .22, 2.6, '255,140,60'); }); // the shielded fire lights little
TILEX.b4_c7_breach = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b47PicketTile(ctx, ch, x, y, T, !!dark, true));
/* the coral island */
function b47CoralGround(ctx, x, y, T, N){ b45Shell(ctx, x, y, T, N); const px = x*T, py = y*T;
  ctx.fillStyle = N ? 'rgba(80,60,70,.12)' : 'rgba(232,180,168,.16)'; ctx.fillRect(px, py, T, T); // coral's flush, not shell's grey
  ctx.fillStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(110,84,76,.4)'; for (let i = 0; i < 7; i++) ell(ctx, px + hash(x, y, i + 120)*T, py + hash(y, x, i + 121)*T, T*(.018 + hash(x, y, i + 122)*.02), T*.016, ctx.fillStyle); } // pitted
function b47Wet(ctx, x, y, T, N){ b45Shell(ctx, x, y, T, N); const px = x*T, py = y*T; ctx.fillStyle = N ? 'rgba(20,30,40,.35)' : 'rgba(96,104,100,.3)'; ctx.fillRect(px, py, T, T);
  const g = ctx.createLinearGradient(px, py, px + T, py + T); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, N ? 'rgba(200,210,230,.08)' : 'rgba(255,252,240,.22)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(px, py, T, T); } // a sheen
function b47Water(ctx, x, y, T, N){ const px = x*T, py = y*T, land = (dx, dy) => { const r = tileMap && tileMap[y + dy]; const c = r && r[x + dx]; return !!c && c !== '~' && c !== 'o'; };
  const shore = land(-1, 0) || land(1, 0) || land(0, -1) || land(0, 1);
  ctx.fillStyle = N ? '#1c2630' : '#6e8c92'; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, N ? .03 : .08, N ? .1 : .06, N ? '180,200,230' : '230,244,240', 1.6); // one water, grey-green, moving light on it
  [[-1, 0, 'x', 0], [1, 0, 'x', 1], [0, -1, 'y', 0], [0, 1, 'y', 1]].forEach(([dx, dy, ax, far]) => { if (!land(dx, dy) || N) return; const g = ax === 'x' ? ctx.createLinearGradient(px + far*T, 0, px + (1 - far)*T, 0) : ctx.createLinearGradient(0, py + far*T, 0, py + (1 - far)*T); g.addColorStop(0, 'rgba(176,200,190,.75)'); g.addColorStop(.6, 'rgba(150,180,176,.2)'); g.addColorStop(1, 'rgba(150,180,176,0)'); ctx.fillStyle = g; ctx.fillRect(px, py, T, T); }); // shallow and clear toward the coral
  ctx.strokeStyle = N ? 'rgba(180,200,230,.12)' : 'rgba(255,255,250,.35)'; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); for (let i = 0; i < 3; i++) { const yy = py + T*(.2 + i*.3) + Math.sin(x*1.3 + i)*T*.04; ctx.moveTo(px + T*.1, yy); ctx.quadraticCurveTo(px + T*.5, yy - T*.05, px + T*.9, yy); } ctx.stroke(); // ripples
  [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => { if (!land(dx, dy)) return; ctx.strokeStyle = N ? 'rgba(200,210,230,.14)' : 'rgba(250,248,240,.5)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); for (let i = 0; i < 4; i++) { const k = (i + .5)/4, wob = (hash(x, y, i + 140) - .5)*T*.05; if (dx) { const xx = px + (dx < 0 ? T*.06 : T*.94) + wob; ctx.moveTo(xx, py + (k - .1)*T); ctx.quadraticCurveTo(xx - dx*T*.05, py + k*T, xx, py + (k + .1)*T); } else { const yy = py + (dy < 0 ? T*.06 : T*.94) + wob; ctx.moveTo(px + (k - .1)*T, yy); ctx.quadraticCurveTo(px + k*T, yy - dy*T*.05, px + (k + .1)*T, yy); } } ctx.stroke(); }); } // a lace of foam where it meets the coral
function b47IsleFire(ctx, x, y, T, N){ b47CoralGround(ctx, x, y, T, N); const cx = x*T + T*.5, cy = y*T + T*.6; for (let i = 0; i < 7; i++) { const a = i/7*6.28; ell(ctx, cx + Math.cos(a)*T*.26, cy + Math.sin(a)*T*.16, T*.07, T*.05, N ? '#3a3036' : '#d8c4b8'); } b2Flames(ctx, cx, cy, T, .9); }
function b47IsleTile(ctx, ch, x, y, T, N){ const px = x*T, py = y*T;
  if (ch === '~' || ch === 'o') return b47Water(ctx, x, y, T, N);
  if (ch === ',') return b47Wet(ctx, x, y, T, N);
  if (ch === 'c' || ch === '#') { b47CoralGround(ctx, x, y, T, N); return b45Coral(ctx, x, y, T, N); }
  if (ch === 'F') return b47IsleFire(ctx, x, y, T, N);
  b47CoralGround(ctx, x, y, T, N); if (ch !== '.' && ch !== 't') exitArrow(ctx, ch, px, py, T); }
TILEX.b4_c7_isle = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b47IsleTile(ctx, ch, x, y, T, !!dark));
{ const _df = drawFeature; drawFeature = function(ctx, ch, x, y, T, dark, style, map){ const N = !!dark;
    if (style === 'b4_c7_picket' && ch === 't') return b2Clip(ctx, x, y, T, () => { b45Sand(ctx, x, y, T, N); b47Screen(ctx, x, y, T, N, false, true); }); // a stretch of brush screen in the scrub
    if (style === 'b4_c7_breach' && ch === 't') return b2Clip(ctx, x, y, T, () => { b47Sand(ctx, x, y, T, N, true); b47Screen(ctx, x, y, T, N, true, true); }); // the last stakes
    if (style === 'b4_c7_isle' && (ch === 't' || ch === 'o')) return b2Clip(ctx, x, y, T, () => ch === 'o' ? b47Water(ctx, x, y, T, N) : b45Coral(ctx, x, y, T, N));
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* the basin before Pan'arak: the dead city on its rise with its towers, three ramps going up to it pale against the dark, the trenches dark
   lines along their faces, the Dogslayers' fires (fires: 1 lit, 0 out), and over the oasis behind the city a dark that is not the sky's.
   hz is the horizon; sky = [top, mid, low] */
function b47Basin(x, W, H, hz, sky, ground, fires, light){
  x.fillStyle = vgrad(x, 0, hz, [[0, sky[0]], [.6, sky[1]], [1, sky[2]]]); x.fillRect(0, 0, W, hz + 2);
  const cx = W*.56, ct = hz - H*.2; // the dead city: a rise, walls, towers without tops
  x.fillStyle = light ? '#5a4a3a' : '#0c0a0c'; x.beginPath(); x.moveTo(W*.24, hz); x.quadraticCurveTo(W*.34, hz - H*.12, cx - W*.14, ct + H*.04); x.lineTo(cx + W*.2, ct + H*.02); x.quadraticCurveTo(W*.86, hz - H*.1, W*.96, hz); x.closePath(); x.fill();
  for (let i = 0; i < 14; i++) { const bx = cx - W*.14 + i*W*.024, bh = H*(.03 + hash(i, 811)*.07), bw = W*(.012 + hash(i, 812)*.012); x.fillRect(bx, ct + H*.04 - bh, bw, bh + 2); } // towers and walls, broken off
  if (light) { x.fillStyle = 'rgba(255,236,200,.12)'; for (let i = 0; i < 14; i++) { const bx = cx - W*.14 + i*W*.024, bh = H*(.03 + hash(i, 811)*.07); x.fillRect(bx, ct + H*.04 - bh, 1, bh); } }
  x.fillStyle = vgrad(x, hz, H, ground); x.fillRect(0, hz, W, H - hz); // the basin floor
  [[.34, .46], [.52, .58], [.7, .7]].forEach(([a, b], i) => { // the three ramps: a pale wedge up the rise, a trench along its face
    x.fillStyle = light ? 'rgba(200,176,136,.5)' : 'rgba(70,60,56,.6)'; x.beginPath(); x.moveTo(W*(a - .05), hz + H*.06); x.lineTo(W*(a + .05), hz + H*.06); x.lineTo(W*(b + .015), ct + H*.08); x.lineTo(W*(b - .015), ct + H*.08); x.closePath(); x.fill();
    x.strokeStyle = light ? 'rgba(40,30,20,.8)' : 'rgba(0,0,0,.85)'; x.lineWidth = 1.6; x.beginPath(); x.moveTo(W*(a - .06), hz + H*.015); x.quadraticCurveTo(W*a, hz - H*.01 - i*H*.005, W*(a + .07), hz + H*.01); x.stroke(); // the trench
    if (fires) for (let j = 0; j < 7; j++) { const fx = W*(a - .05 + j*.018), fy = hz - H*.006 + hash(i, j, 813)*H*.02; glow(x, fx, fy, 6, '#ff7a30', .45); x.fillStyle = '#ffb060'; x.fillRect(fx - .7, fy - .7, 1.4, 1.4); } });
  if (fires) for (let i = 0; i < 24; i++) { const fx = W*(.3 + hash(i, 814)*.5), fy = ct + H*.02 + hash(i, 815)*H*.1; glow(x, fx, fy, 4, '#ff8a3a', .3); } } // fires behind, in the city
/* dust in the air over a scene: drifting grit (still when motion is reduced) */
function b47Grit(ctx, W, H, t, n, col, fall){ if (REDUCE()) return; for (let i = 0; i < n; i++) { const k = ((t/(fall ? 9000 : 6000) + hash(i, 821)) % 1), xx = fall ? hash(i, 822)*W + Math.sin(t/2000 + i)*6 : W*1.1 - k*W*1.3, yy = fall ? k*H : hash(i, 822)*H; ctx.fillStyle = col.replace('A', (.12 + .2*Math.sin(k*Math.PI)).toFixed(2)); ctx.fillRect(xx, yy, fall ? 1.2 : 3 + hash(i, 823)*6, fall ? 1.2 : .8); } }
/* the picket's screen across the foreground, in silhouette, the basin seen through its gaps */
function b47ScreenBand(x, W, H, y0, col){ x.fillStyle = col; x.beginPath(); x.moveTo(0, H); x.lineTo(0, y0 + 6); for (let px = 0; px <= W; px += 6) x.lineTo(px, y0 + Math.sin(px*.37)*3 + hash(px, 831)*5); x.lineTo(W, H); x.closePath(); x.fill();
  x.strokeStyle = col; x.lineWidth = 1.6; x.lineCap = 'round'; for (let i = 0; i < 18; i++) { const sx = (i + .3 + hash(i, 832)*.4)*W/18; x.beginPath(); x.moveTo(sx, y0 + 8); x.lineTo(sx + (hash(i, 833) - .5)*3, y0 - 8 - hash(i, 834)*7); x.stroke(); } x.lineCap = 'butt';
  x.lineWidth = .7; x.beginPath(); for (let i = 0; i < 60; i++) { const sx = hash(i, 835)*W, sy = y0 + hash(i, 836)*6; x.moveTo(sx, sy); x.lineTo(sx + (hash(i, 837) - .5)*8, sy - 4 - hash(i, 838)*5); } x.stroke(); }
/* the night at the flank picket: the basin, the fires, the dark above the oasis; after the sounds, it changes, and there are butterflies
   over the trenches and a Wickan standard on the shoulder of a ramp */
SCENEX.b4_c7_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.6, f = (S && S.f) || {}, changed = !!f.b4_c7_heard, after = (f.b4_c7_ph || 1) >= 3;
  ctx.drawImage(sceneLayer('b47:night' + (changed ? 'c' : '') + (after ? 'a' : ''), W, H, (x, W, H) => {
    b47Basin(x, W, H, hz, ['#0a0910', '#1c161a', '#3a2a20'], [[0, '#2a221c'], [.5, '#1a1612'], [1, '#0c0a08']], !after, false); glow(x, W*.56, hz - H*.16, W*.3, '#6a4a30', .18); // the dust over the city holding the fires' light
    glow(x, W*.6, hz - H*.34, W*.26, '#000000', .7); // the dark over the oasis: darker than the rest of the sky
    if (changed && !after) { // the standard on the ramp's shoulder: a lance, a crow's wings, a horse's tail
      const sx = W*.39, sy = hz - H*.035; glow(x, sx, sy - H*.05, H*.08, '#c8c4d0', .25); x.fillStyle = '#c8c0b0'; x.strokeStyle = '#c8c0b0'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx, sy - H*.1); x.stroke(); poly(x, [[sx, sy - H*.1], [sx - 7, sy - H*.088], [sx - 10, sy - H*.07], [sx, sy - H*.08]], '#c8c0b0'); poly(x, [[sx, sy - H*.1], [sx + 7, sy - H*.088], [sx + 10, sy - H*.07], [sx, sy - H*.08]], '#c8c0b0'); x.beginPath(); x.moveTo(sx, sy - H*.075); x.quadraticCurveTo(sx + 3, sy - H*.05, sx + 1.5, sy - H*.025); x.stroke(); } // pale in the changed light
    b47ScreenBand(x, W, H, H*.88, '#050405');
  }), 0, 0, W, H);
  if (changed && !after) { const br = REDUCE() ? .6 : .6 + .3*Math.sin(t/2400); glow(ctx, W*.6, hz - H*.32, W*.34, '#9a9ab4', .2*br); glow(ctx, W*.62, hz - H*.26, W*.2, '#d8d0e8', .14*br); // the dark above the oasis, thinning
    for (let i = 0; i < 40; i++) { const k = REDUCE() ? hash(i, 841) : ((t/8000 + hash(i, 841)) % 1), bx = W*(.3 + hash(i, 842)*.46) + Math.sin(t/700 + i*1.7)*6, by = hz - H*.02 - hash(i, 843)*H*.12 - Math.sin(k*6.28)*4, fl = REDUCE() ? .5 : Math.abs(Math.sin(t/120 + i));
      ctx.fillStyle = `rgba(244,240,226,${(.45 + .45*hash(i, 844)).toFixed(2)})`; ctx.fillRect(bx - 2*fl, by - .6, 2*fl, 1.6); ctx.fillRect(bx + .3, by - .6, 2*fl, 1.6); ctx.fillRect(bx - .2, by - .4, .5, 1.6); } } // butterflies over the trenches, wings opening and shutting
  if (!after) { const fl = b2Fl(t); ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.18, H*.97, H*.16, '#ff7a30', .1*fl); ctx.globalCompositeOperation = 'source-over'; } // the shielded fire behind the screen, just showing
  b47Grit(ctx, W, H, t, 30, 'rgba(150,120,90,A)'); vign(ctx, W, H, .8, .5); };
/* the ride: grey light low on the ground, coming out of the dark from the left behind the picket and going right toward the ramps, dust
   going up off it in a wall, riders in it with no faces; the light climbing the ramps; no fires */
SCENEX.b4_c7_ride = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.6, mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b47:ride', W, H, (x, W, H) => {
    b47Basin(x, W, H, hz, ['#08070c', '#14121a', '#2a2628'], [[0, '#22201e'], [.5, '#16140f'], [1, '#0a0908']], false, false);
    glow(x, W*.6, hz - H*.28, W*.34, '#6a6a80', .14); // the dark over the oasis, gone grey
  }), 0, 0, W, H);
  // the river of light, low across the basin, rising toward the ramps
  const band = k => hz + H*.2 - k*H*.18; ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 9; i++) { const k = i/8; glow(ctx, W*(-.05 + k*.8), band(k), H*(.18 - k*.08), '#c8c4b0', .12); }
  for (let i = 0; i < 3; i++) glow(ctx, W*(.36 + i*.18), hz - H*.03 - i*H*.02, H*.08, '#d8d4c0', .16 + .06*Math.sin(t/600 + i)*mo); // the light going up into the trenches
  for (let i = 0; i < 70; i++) { const k = ((t/(5200) + hash(i, 851)) % 1), kk = mo ? k : hash(i, 851), xx = W*(-.1 + kk*.9), yy = band(kk) - hash(i, 852)*H*.16 - kk*H*.04; ctx.fillStyle = `rgba(214,204,180,${(.06 + .1*Math.sin(kk*Math.PI)).toFixed(3)})`; ctx.fillRect(xx, yy, 6 + hash(i, 853)*10, 1.2); } // the dust going up off it
  ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 22; i++) { const k = ((t/7000 + hash(i, 855)) % 1), kk = mo ? k : hash(i, 855), s = lerp(1.3, .4, kk)*(.8 + hash(i, 856)*.35); drawFigure(ctx, 'b4_c7_ghost', W*(-.08 + kk*.84), band(kk) + 6 - hash(i, 854)*H*.12*(1 - kk*.6), s, t, {phase:i, alpha:(.55 - kk*.25)*(.6 + hash(i, 857)*.4), still:!mo}); } // riders, no faces, half lost in their own dust
  ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 6; i++) { const k = i/5; glow(ctx, W*(-.02 + k*.78), band(k) - H*.06, H*(.12 - k*.05), '#d8d0bc', .08); } ctx.globalCompositeOperation = 'source-over'; // dust over them
  b47ScreenBand(ctx, W, H, H*.9, '#050405'); vign(ctx, W, H, .75, .5); };
/* the end of the line before dawn: the last stakes of the screen on the left, the open desert going east under a sky just losing its black,
   a pale band on the eastern horizon; shapes running out of the dark (until the fight is done or let go) */
SCENEX.b4_c7_predawn = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.62, f = (S && S.f) || {}, gone = !!(f.b4_c7_breakDone || f.b4_c7_letGo), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b47:predawn', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0, '#0a0c16'], [.6, '#1e2232'], [1, '#4a4a58']]); x.fillRect(0, 0, W, hz + 2);
    const g = x.createLinearGradient(W*.4, 0, W, 0); g.addColorStop(0, 'rgba(160,150,160,0)'); g.addColorStop(1, 'rgba(190,176,170,.35)'); x.fillStyle = g; x.fillRect(0, hz - H*.08, W, H*.08); // the east, paling
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(220,220,240,${(.2 + hash(i, 861)*.4).toFixed(2)})`; x.fillRect(hash(i, 862)*W, hash(i, 863)*hz*.6, 1, 1); } // the last stars
    x.fillStyle = vgrad(x, hz, H, [[0, '#3a3a40'], [.5, '#26262a'], [1, '#121214']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 50; i++) { const yy = hz + 2 + Math.pow(hash(i, 864), 1.5)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(20,20,24,${(.3 + d*.3).toFixed(2)})`; ell(x, hash(i, 865)*W, yy, 2 + d*6, .6 + d*1.4, x.fillStyle); } // scrub, near and far
    x.strokeStyle = '#08080a'; x.lineWidth = 2.4; x.lineCap = 'round'; [[.05, .98, .07, .62], [.15, .96, .16, .66], [.25, .95, .25, .7]].forEach(([a, b, c, d]) => { x.beginPath(); x.moveTo(W*a, H*b); x.lineTo(W*c, H*d); x.stroke(); }); x.lineCap = 'butt'; // the last stakes
    poly(x, [[W*.05, H*.84], [W*.16, H*.8], [W*.16, H*.9], [W*.05, H*.92]], '#0c0a0c'); // a hide sagging between two of them
  }), 0, 0, W, H);
  if (!gone) for (let i = 0; i < 12; i++) { const k = mo ? ((t/16000 + hash(i, 866)) % 1) : hash(i, 866), xx = W*(.4 + hash(i, 867)*.36) + k*W*.3, yy = hz + H*(.015 + hash(i, 868)*.07), s = .3 + hash(i, 868)*.22; drawFigure(ctx, i % 4 === 0 ? 'b4_c7_fleerbow' : 'b4_c7_fleer', xx, yy, s, t, {phase:i, alpha:.75, still:!mo}); } // running, east
  b47Grit(ctx, W, H, t, 14, 'rgba(160,160,170,A)'); vign(ctx, W, H, .7, .55); };
/* the morning after: grey light, the trenches on their ramps quiet, no fires, no smoke; the dust coming down out of the air; once the duel
   is done, the air clear and the far side sharp */
SCENEX.b4_c7_morning = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.6, clear = !!((S && S.f) || {}).b4_c7_duel;
  ctx.drawImage(sceneLayer('b47:morning' + (clear ? 'c' : ''), W, H, (x, W, H) => {
    b47Basin(x, W, H, hz, clear ? ['#9aa8b4', '#c8c8c0', '#dcd2bc'] : ['#7a7470', '#9a8e80', '#b0a088'], clear ? [[0, '#c8b48c'], [.5, '#a8946c'], [1, '#6e5c40']] : [[0, '#9a8a6a'], [.5, '#7a6a50'], [1, '#4a3e2e']], false, true);
    if (!clear) { x.fillStyle = 'rgba(170,150,120,.35)'; x.fillRect(0, 0, W, H); } // dust still in the air
    for (let i = 0; i < 10; i++) { x.fillStyle = '#6a2a20'; x.fillRect(W*(.4 + i*.012), hz + H*.07, 1.2, 2.6); } // the Red Blades at the ramps' foot, not going in
    b47ScreenBand(x, W, H, H*.9, clear ? '#3a2e22' : '#2a2018');
  }), 0, 0, W, H);
  b47Grit(ctx, W, H, t, clear ? 10 : 50, clear ? 'rgba(220,206,176,A)' : 'rgba(200,184,150,A)', true); vign(ctx, W, H, .45, .5); };
/* an army's lines far off: a dark band in the haze, a little of its own dust over it, spear points ticking up out of it */
function b47Lines(x, x0, y0, w, h, seed){ glow(x, x0 + w/2, y0, w*.6, '#c8b08a', .3); x.fillStyle = 'rgba(46,36,26,.62)'; x.fillRect(x0, y0, w, h); x.fillStyle = 'rgba(46,36,26,.3)'; x.fillRect(x0 + 1, y0 - .8, w - 2, .8);
  x.fillStyle = 'rgba(40,32,24,.55)'; for (let i = 0; i < w; i += 1.6) if (hash(i|0, seed, 3) > .4) x.fillRect(x0 + i, y0 - 1.6 - hash(i|0, seed, 4)*1.4, .5, 1.6); }
/* the duel: a wide plain between the armies in the morning, the Fourteenth's lines on the left a long way off, the dead city's ramps on the
   right; in the middle, very small, a grey horse and a rider down off it, and a figure in armour; after, one of them on the ground */
SCENEX.b4_c7_duel = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.52, done = !!((S && S.f) || {}).b4_c7_duel, mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b47:duel' + (done ? 'd' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0, '#8a98a6'], [.6, '#c0bcb0'], [1, '#d6c8aa']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.7, H*.12, W*.3, '#fff4d8', .3);
    x.fillStyle = '#7a6a54'; x.beginPath(); x.moveTo(W*.7, hz); x.quadraticCurveTo(W*.8, hz - H*.1, W*.9, hz - H*.09); x.lineTo(W + 4, hz - H*.05); x.lineTo(W + 4, hz); x.closePath(); x.fill(); // the dead city's rise, far right
    for (let i = 0; i < 8; i++) { x.fillRect(W*(.8 + i*.02), hz - H*(.11 + hash(i, 871)*.05), W*.01, H*.06); }
    x.fillStyle = vgrad(x, hz, H, [[0, '#c4ae84'], [.5, '#a89064'], [1, '#76603e']]); x.fillRect(0, hz, W, H - hz);
    for (let lg = 0; lg < 4; lg++) b47Lines(x, W*(.01 + lg*.06), hz + H*(.03 + lg*.03), W*.1, 3, lg + 872); // the Fourteenth, in its lines, far off left
    x.fillStyle = '#5a1e14'; x.fillRect(W*.18, hz + H*.02, 1, 6); x.fillRect(W*.18, hz + H*.02, 4, 2); // the Adjunct's standard
    for (let i = 0; i < 40; i++) { const yy = hz + 2 + Math.pow(hash(i, 874), 1.5)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(110,86,56,${(.12 + d*.2).toFixed(2)})`; x.fillRect(hash(i, 875)*W, yy, 4 + d*16, .6 + d); }
  }), 0, 0, W, H);
  const cx = W*.5, cy = hz + H*.16; ell(ctx, cx - 10, cy + 1, 4, 1, 'rgba(0,0,0,.25)');
  ctx.fillStyle = '#8a8680'; ctx.fillRect(cx - 16, cy - 4, 6, 2.6); ctx.fillRect(cx - 16, cy - 1.6, .8, 2); ctx.fillRect(cx - 11, cy - 1.6, .8, 2); ctx.fillRect(cx - 10.4, cy - 6, 1.4, 2.4); // the grey horse, waiting
  ctx.fillStyle = '#2a2420'; ctx.fillRect(cx - 6, cy - 5.6, 1.6, 5.6); ell(ctx, cx - 5.2, cy - 6.4, .9, .9, '#2a2420'); // the Adjunct, down off it
  if (!done) { const step = mo ? Math.min(1, (t % 30000)/24000) : .6; ctx.fillStyle = '#3a3a3e'; ctx.fillRect(cx + 16 - step*12, cy - 5.6, 1.8, 5.6); ell(ctx, cx + 16.9 - step*12, cy - 6.4, 1, 1, '#4a4a50'); } // the one in armour, walking out across the sand
  else { ctx.fillStyle = '#3a3a3e'; ctx.fillRect(cx + 1, cy - .8, 5, 1.4); } // and after, on the sand
  vign(ctx, W, H, .4, .5); };
/* the giant going west: the plain clear in the morning, the army's lines far right, and far off left a giant on a horse, walking away */
SCENEX.b4_c7_giant = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.56, mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b47:giant', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0, '#9aa8b6'], [.6, '#ccc8bc'], [1, '#e0d4b8']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.2, H*.14, W*.3, '#fff6dc', .32);
    x.fillStyle = vgrad(x, hz, H, [[0, '#cab48a'], [.5, '#ac9468'], [1, '#78623e']]); x.fillRect(0, hz, W, H - hz);
    for (let lg = 0; lg < 3; lg++) b47Lines(x, W*(.64 + lg*.1), hz + H*(.03 + lg*.02), W*.09, 3, lg + 881); // the Fourteenth's lines, right
    for (let i = 0; i < 40; i++) { const yy = hz + 2 + Math.pow(hash(i, 883), 1.5)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(110,86,56,${(.12 + d*.2).toFixed(2)})`; x.fillRect(hash(i, 884)*W, yy, 4 + d*16, .6 + d); }
  }), 0, 0, W, H);
  const k = mo ? ((t % 40000)/40000) : .4, gx = lerp(W*.5, W*.12, k); drawFigure(ctx, 'b4_c7_karsa', gx, hz + H*.05, .42, t, {dir:1, still:!mo}); // far off, going west
  if (mo) for (let i = 0; i < 6; i++) { const q = ((t/900 + i/6) % 1); ctx.fillStyle = `rgba(200,180,140,${(.25*(1 - q)).toFixed(2)})`; ell(ctx, gx + 6 + q*10, hz + H*.05 + 5 - q*2, 1.4 + q*3, .8 + q, ctx.fillStyle); } // a little dust behind
  vign(ctx, W, H, .35, .5); };
/* the flood: the old sea floor white under a grey morning, the coral islands standing up ahead (right), and across the floor from the left a
   grey sheet of water coming fast with a froth of shell at its front; the army running, small, toward the islands */
SCENEX.b4_c7_flood = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.48, mo = REDUCE() ? 0 : 1, done = !!((S && S.f) || {}).b4_c7_flood;
  ctx.drawImage(sceneLayer('b47:flood' + (done ? 'd' : ''), W, H, (x, W, H) => { b45SeaFloor(x, W, H, hz, 891);
    [[.62, .1, .05], [.78, .14, .07], [.92, .08, .06], [.5, .06, .03]].forEach(([a, w, h], i) => { x.fillStyle = vgrad(x, hz - H*h, hz + H*.02, [[0, '#d8c8c0'], [1, '#9a8a84']]); x.beginPath(); x.moveTo(W*(a - w), hz + H*.02); x.quadraticCurveTo(W*(a - w*.4), hz - H*h, W*a, hz - H*h*1.1); x.quadraticCurveTo(W*(a + w*.5), hz - H*h, W*(a + w), hz + H*.02); x.closePath(); x.fill(); }); // coral islands, humped
    if (done) { x.fillStyle = vgrad(x, hz, H, [[0, '#8a9a9c'], [1, '#4a5a60']]); x.fillRect(0, hz + H*.02, W, H - hz); } // all water now
  }), 0, 0, W, H);
  if (!done) { const k = mo ? Math.min(1, (t % 20000)/14000) : .5, front = lerp(-W*.1, W*.62, k);
    const g = ctx.createLinearGradient(0, 0, front, 0); g.addColorStop(0, '#4a5a60'); g.addColorStop(.85, '#7a8c90'); g.addColorStop(1, '#a8b4b0'); ctx.fillStyle = g; ctx.fillRect(0, hz + H*.04, Math.max(0, front), H - hz); // the sheet of water
    for (let i = 0; i < 30; i++) { const yy = hz + H*.04 + hash(i, 892)*(H - hz), ff = front + Math.sin(i*1.7 + t/300)*4*mo; ctx.fillStyle = `rgba(250,246,236,${(.4 + hash(i, 893)*.4).toFixed(2)})`; ell(ctx, ff, yy, 3 + hash(i, 894)*5, 1 + hash(i, 894)*1.4, ctx.fillStyle); } // its froth
    const run = k => [lerp(W*.5, W*.78, k), hz + H*.12 - k*H*.06]; b2Column(ctx, W, H, run, 50, '#2a2420', 'rgba(220,214,200,.3)'); } // the army, running for the coral
  vign(ctx, W, H, .4, .5); };
/* the coral island after the flood, at dawn: mist on the water, the sun through it, the next islands with soldiers on them, and on the near
   coral the Third round its driftwood fire (70's b4_coral, redrawn) */
function b47Sea(x, W, H, hz, warm){ x.fillStyle = vgrad(x, 0, hz, warm ? [[0, '#5a6a80'], [.5, '#c8a888'], [1, '#f0d0a0']] : [[0, '#7a8a9a'], [.6, '#c8c4b8'], [1, '#e8dcc0']]); x.fillRect(0, 0, W, hz + 2);
  glow(x, W*.72, hz - H*.06, W*.3, '#fff0c8', warm ? .6 : .3); x.fillStyle = vgrad(x, hz, H, warm ? [[0, '#c8b8a0'], [.3, '#7a8a90'], [1, '#3a4a52']] : [[0, '#b8c0bc'], [.3, '#8a9a9c'], [1, '#4a5a60']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 60; i++) { const yy = hz + 2 + Math.pow(hash(i, 901), 1.6)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(255,246,226,${(.08 + (1 - d)*.18).toFixed(2)})`; x.fillRect(hash(i, 902)*W, yy, 6 + d*24, .6 + d*.8); } // light on the water
  glow(x, W*.72, hz + H*.04, W*.18, '#fff0c8', warm ? .3 : .12); // the sun's road
  [[.16, .08, .03], [.36, .1, .04], [.88, .07, .03]].forEach(([a, w, h], i) => { x.fillStyle = warm ? '#8a706a' : '#9a8c86'; x.beginPath(); x.moveTo(W*(a - w), hz + 1); x.quadraticCurveTo(W*a, hz - H*h, W*(a + w), hz + 1); x.closePath(); x.fill();
    for (let j = 0; j < 12; j++) { x.fillStyle = 'rgba(30,24,20,.6)'; x.fillRect(W*(a - w*.6) + j*W*w*.1, hz - H*h*.5 - hash(i, j, 903)*2, .8, 1.6); } }); } // the next islands, with the army on them
function b47Mist(ctx, W, H, hz, t, a){ const mo = REDUCE() ? 0 : 1; for (let i = 0; i < 8; i++) { const k = mo ? ((t/30000 + hash(i, 911)) % 1) : hash(i, 911); glow(ctx, lerp(-W*.2, W*1.2, k), hz + H*(.02 + hash(i, 912)*.08), W*(.18 + hash(i, 913)*.1), '#f4eee4', a); } }
function b47Isle(x, W, H){ x.fillStyle = vgrad(x, H*.7, H, [[0, '#d8c8bc'], [.5, '#c0aca0'], [1, '#8a7872']]); x.beginPath(); x.moveTo(0, H*.8); x.quadraticCurveTo(W*.3, H*.66, W*.6, H*.72); x.quadraticCurveTo(W*.85, H*.76, W + 4, H*.7); x.lineTo(W + 4, H); x.lineTo(0, H); x.closePath(); x.fill(); // the near coral
  for (let i = 0; i < 50; i++) { x.fillStyle = 'rgba(110,84,76,.35)'; ell(x, hash(i, 921)*W, H*(.76 + hash(i, 922)*.22), 1 + hash(i, 923)*1.6, .7, x.fillStyle); } // pitted
  [[.1, .78], [.86, .74]].forEach(([a, b]) => { [[0, 0, 7], [5, -4, 5], [-4, -5, 4]].forEach(([dx, dy, r]) => { const g = x.createRadialGradient(W*a + dx - r*.4, H*b + dy - r*.4, 0, W*a + dx, H*b + dy, r); g.addColorStop(0, '#e8d8cc'); g.addColorStop(1, '#9a847a'); ell(x, W*a + dx, H*b + dy, r, r*.86, g); }); }); } // coral heads
SCENEX.b4_coral = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.5, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b47:coral', W, H, (x, W, H) => { b47Sea(x, W, H, hz, true); b47Isle(x, W, H); }), 0, 0, W, H);
  b47Mist(ctx, W, H, hz, t, .22);
  const cx = W*.44, cy = H*.9; glow(ctx, cx, cy, H*.3, '#ff9a4a', .2*fl); for (let i = 0; i < 7; i++) { const a = i/7*6.283; ell(ctx, cx + Math.cos(a)*12, cy + Math.sin(a)*3.4, 2.6, 1.8, '#c8b4a8'); }
  poly(ctx, [[cx - 7, cy], [cx - 2, cy - 14*fl], [cx + 1, cy - 6], [cx + 4, cy - 11*fl], [cx + 7, cy]], 'rgba(255,160,70,.9)'); poly(ctx, [[cx - 3, cy], [cx, cy - 7*fl], [cx + 3, cy]], 'rgba(255,232,160,.95)');
  if (!REDUCE()) for (let i = 0; i < 5; i++) { const k = ((t/2200 + i/5) % 1); ctx.fillStyle = `rgba(200,196,190,${(.25*(1 - k)).toFixed(2)})`; ell(ctx, cx + Math.sin(i + t/900)*4 + k*8, cy - 14 - k*26, 3 + k*5, 2 + k*3, ctx.fillStyle); } // driftwood smoke
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(26 + j*21), H*.97 - (j % 2)*3, 1.8, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .45, .55); };
/* the finale: a coral island at dawn, the new sea, and on the far shore the Fourteenth forming up under its standard (a thin figure holding
   up a bone before a sandstorm); on the horse road the riders going out ahead; on the ledger road a few small figures wading away south */
SCENEX.b4_c7_finale = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.52, key = (S && ((S.chapters && S.chapters[7]) || (S.f && S.f.b4_c7_key))) || 'line', mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b47:finale:' + key, W, H, (x, W, H) => { b47Sea(x, W, H, hz, true);
    x.fillStyle = '#a8946c'; x.fillRect(0, hz - 1, W*.7, 3); // the far shore, a strip of desert at the sea's edge
    if (key !== 'ledger') { b47Lines(x, W*.06, hz - 3, W*.52, 2.4, 931); b47Lines(x, W*.14, hz - 4.6, W*.3, 1.4, 932);
      const sx = W*.6, sy = hz - 2; x.fillStyle = '#2a221c'; x.fillRect(sx, sy - 12, .8, 12); x.fillRect(sx - 1.6, sy - 13, .9, 3.6); x.fillRect(sx - 1.8, sy - 14.6, .6, 1.8); // the standard: a thin figure, an arm up, a bone in the hand
      x.fillStyle = 'rgba(200,170,120,.3)'; x.beginPath(); x.moveTo(sx + 2, sy - 16); x.quadraticCurveTo(sx + 12, sy - 18, sx + 16, sy - 8); x.lineTo(sx + 2, sy - 8); x.closePath(); x.fill(); } // the sandstorm behind it, painted
    if (key === 'horse') for (let i = 0; i < 22; i++) { const rx = W*(.64 + i*.012) + hash(i, 931)*4, ry = hz - 1 - hash(i, 932)*2; x.fillStyle = '#2a1e16'; x.fillRect(rx, ry - 2.2, 3, 1.4); x.fillRect(rx + .8, ry - 4, .8, 2); } // the riders out ahead
    b47Isle(x, W, H);
  }), 0, 0, W, H);
  b47Mist(ctx, W, H, hz, t, .16);
  if (key === 'ledger') { const k = mo ? ((t % 60000)/60000) : .3; for (let i = 0; i < 5; i++) { ctx.fillStyle = '#2a2420'; const wx = W*(.2 + k*.25) + i*4, wy = hz + H*.08 + i*.6; ctx.fillRect(wx, wy - 3, 1.2, 3); ell(ctx, wx + .6, wy - 3.6, .7, .7, '#2a2420'); ctx.fillStyle = 'rgba(240,236,226,.4)'; ctx.fillRect(wx - 1, wy, 3.2, .6); } } // a few small figures wading south, away
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.56 + i*15, H*.95 - (i % 2)*2, 1.5, t, {phase:i, dir:key === 'ledger' ? -1 : 1}));
  vign(ctx, W, H, .4, .55); };

/* ---------------- the chapter's gear: on Book Four's sand-and-iron ground (75b's b45Item, 71b's frame) ---------------- */
/* a piece of coral stone: a knuckle of pale coral, pitted all over, lit from the left, a little flush of pink in the pits */
b45Item('b4_c7_coral', 'A piece of coral stone', '<defs><radialGradient id="c47c" cx="0.38" cy="0.34" r="0.7"><stop offset="0" stop-color="#f4e8dc"/><stop offset=".55" stop-color="#d4beb2"/><stop offset="1" stop-color="#8a726a"/></radialGradient></defs>'
  + '<ellipse cx="120" cy="68" rx="70" ry="34" fill="#f0e0d4" opacity=".05"/><ellipse cx="124" cy="100" rx="46" ry="7" fill="#000" opacity=".35"/>'
  + '<path d="M78 92 Q70 66 86 50 Q96 36 116 40 Q130 28 148 38 Q166 44 166 62 Q176 74 164 88 Q150 100 120 98 Q92 100 78 92 Z" fill="url(#c47c)"/>'
  + '<path d="M86 52 Q96 40 114 43 Q128 32 146 41" stroke="#fffaf2" stroke-width="2" fill="none" opacity=".7"/>'
  + [[96,60,3.2],[110,52,2.6],[126,48,3],[142,54,2.4],[154,66,2.8],[104,76,3.4],[120,70,2.6],[136,72,3],[150,82,2.4],[92,84,2.6],[116,88,3],[132,86,2.4],[146,46,2],[100,66,2]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.8}" fill="#7a5e56" opacity=".55"/><ellipse cx="${x - .6}" cy="${y - .6}" rx="${r*.5}" ry="${r*.4}" fill="#c89088" opacity=".4"/>`).join('')
  + '<path d="M162 88 Q150 100 120 98 Q100 99 86 94" stroke="#5a4640" stroke-width="2" fill="none" opacity=".5"/>');
/* a Dogslayer's sword: a Malazan short sword, long in the blade, the hilt's marks filed to bright scratches, the grip rewound in dark leather */
b45Item('b4_c7_dogslayerblade', 'A Dogslayer\'s sword', '<ellipse cx="120" cy="66" rx="92" ry="30" fill="#d8d0c0" opacity=".05"/><g transform="rotate(-14 120 66)">'
  + '<path d="M58 62 L182 58 L198 64 L182 70 L58 68 Z" fill="#b8b8b4"/><path d="M58 62 L182 58 L198 64 L60 64 Z" fill="#e0e0da"/><path d="M64 65 L182 64" stroke="#7a7a78" stroke-width=".8" opacity=".7"/>'
  + '<path d="M120 59 L132 59.6 M146 60 L150 60.2" stroke="#8a8a84" stroke-width=".8" opacity=".6"/>'
  + '<rect x="50" y="52" width="9" height="26" rx="2" fill="#6a5a3a"/><rect x="51" y="53" width="3" height="24" fill="#9a845a" opacity=".6"/>'
  + '<path d="M52 56 L57 58 M52 62 L57 60 M52 68 L57 70 M52 74 L57 72" stroke="#e8e0c8" stroke-width=".9" opacity=".9"/>'
  + '<rect x="24" y="60" width="26" height="9" rx="2" fill="#2a1e16"/>' + [28,33,38,43].map(x => `<path d="M${x} 60 L${x + 3} 69" stroke="#4a3a2a" stroke-width="1.4"/>`).join('')
  + '<circle cx="21" cy="64.5" r="5" fill="#6a5a3a"/><circle cx="20" cy="63.5" r="2" fill="#a8945e" opacity=".7"/></g>'
  + '<path d="M40 108 Q120 102 200 108" stroke="#c8b8a0" stroke-width="1" fill="none" opacity=".18"/>');
/* a black bead: a tear of black glass on a thong, a hard white glint on it, the thong knotted the Khundryl way */
b45Item('b4_c7_tear', 'A black bead', '<defs><radialGradient id="c47t" cx="0.36" cy="0.32" r="0.7"><stop offset="0" stop-color="#5a5a62"/><stop offset=".4" stop-color="#16161a"/><stop offset="1" stop-color="#040406"/></radialGradient></defs>'
  + '<ellipse cx="120" cy="66" rx="60" ry="34" fill="#e0d8c8" opacity=".05"/><ellipse cx="124" cy="104" rx="22" ry="5" fill="#000" opacity=".4"/>'
  + '<path d="M40 30 Q80 56 112 48 M200 30 Q160 56 128 48" stroke="#7a5a3a" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M40 30 Q80 56 112 48" stroke="#a8845a" stroke-width=".9" fill="none" opacity=".6"/>'
  + '<path d="M112 48 Q116 42 120 46 Q124 42 128 48 Q124 52 120 50 Q116 52 112 48 Z" fill="#5a3e26"/>'
  + '<path d="M120 50 Q104 74 108 88 Q112 100 120 100 Q128 100 132 88 Q136 74 120 50 Z" fill="url(#c47t)"/>'
  + '<path d="M114 72 Q113 82 116 90" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" fill="none" opacity=".75"/><circle cx="114" cy="70" r="1.6" fill="#ffffff" opacity=".85"/>'
  + '<path d="M128 92 Q131 86 130 78" stroke="#3a3a44" stroke-width="1.2" fill="none" opacity=".6"/>');
