/* ============ Book Four, Chapter 3 art: The Burned Tears — the Vathar Hills, the Khundryl feast, Vathar Crossing, the butte over Ubaryd ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/70d, lit from the left: the Burned Tears (Book Two's Khundryl, a year on, the ochre gone and
   black tears inked down the cheeks instead), their war chief, river scavengers and a river-tribe warrior. Two grounds (TILEX): the hills
   on Book Two's Odhan, and the ford on Book Two's Vathar, with its bone-banks lying dark under the water and the tribes' poles on the bank.
   Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still): b4_feast redrawn, the riders on the ridge, the
   ford at dusk, the butte over Ubaryd with the Whirlwind on the horizon. And the chapter's gear on Book Four's sand-and-iron ground.
   Grim things stay distant: the ford's dead are a dark bank under the water, the poles carry shapes, not carcasses. */

/* ---------------- figures ---------------- */
/* the black tears: two inked tracks from under each eye to the jaw (never explained), with the faint sheen of fresh ink on the young */
function b43Tears(ctx, x0, x1, y0, len, fresh){ ctx.fillStyle = '#050304'; [x0, x1].forEach(x => { ctx.beginPath(); ctx.moveTo(x - .5, y0); ctx.lineTo(x + .5, y0); ctx.lineTo(x + .4, y0 + len*.7); ctx.quadraticCurveTo(x, y0 + len + .9, x - .4, y0 + len*.7); ctx.closePath(); ctx.fill(); ell(ctx, x, y0 + len*.82, .7, .8, '#050304'); });
  if (fresh) { ctx.fillStyle = 'rgba(200,120,100,.35)'; [x0, x1].forEach(x => ctx.fillRect(x - .9, y0 - .2, 1.8, .5)); } }
Object.assign(FIGX, {
  /* a Burned Tear rider: Book Two's Khundryl a year on, in the same horsehide and horsehair, a lance with a black mane-tail under the
     blade, braids with bone beads; the red ochre gone, and down both cheeks the black tears, inked; ash rubbed into the braids */
  b4_c3_khundryl(ctx, h, t, o){ const sk = b2Pick(o, ['#a47c5c', '#94704e', '#ac8462', '#8c6a4c']), hide = b2Pick(o, [['#5a4634','#1e160e'], ['#6a4a2e','#22160c'], ['#4a3e34','#16120e']]), sw = o.still ? 0 : Math.sin(t/520 + (o.phase||0)), old = hash(Math.round((o.phase || 0)*7), 11) > .7;
    B2F.line(ctx, '#4a3420', 1.3, [[8.4, 12.6], [10.2, -24]], 'butt'); poly(ctx, [[10.3,-30.4],[9.4,-24],[11.2,-24]], '#d0c8b4'); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(10, -29.4, .4, 4.6); // a long lance, a leaf blade
    B2F.line(ctx, '#0e0a08', 1.6, [[10, -23], [10.6 + sw*.8, -19], [10.2 + sw*1.4, -15]]); B2F.line(ctx, '#1e1410', .9, [[10.6, -23], [11.8 + sw*.9, -19.4], [11.6 + sw*1.6, -16.2]]); // its black horse-tail, moving
    h.legs('#3a2a1c'); ctx.fillStyle = '#4a3a26'; ctx.fillRect(-4.6, 8.4, 3.6, 4.6); ctx.fillRect(1, 8.4, 3.6, 4.6); ctx.fillStyle = 'rgba(214,190,140,.5)'; for (let i=0;i<4;i++){ ctx.fillRect(-4.6 + i*.9, 12.4, .4, 1.2); ctx.fillRect(1 + i*.9, 12.4, .4, 1.2); } // riding boots, fringed
    poly(ctx, [[-6.4,-6],[6.4,-6],[7.2,8],[1,8],[0,5.4],[-1,8],[-7.2,8]], h.armor(hide[0], hide[1])); ctx.fillStyle = 'rgba(230,220,200,.2)'; [[-4,-1.6,1.4],[-1.6,3.6,1],[3.4,.2,1.2],[-5,5,.9]].forEach(([x, y, r]) => ell(ctx, x, y, r, r*.7, ctx.fillStyle)); // a coat of dappled horsehide, split for the saddle
    ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = .4; ctx.beginPath(); for (let r=0;r<3;r++){ ctx.moveTo(-5.6, -3.6 + r*2.2); ctx.lineTo(5.6, -3.6 + r*2.2); } ctx.stroke(); // grey scale glimpsed under it
    ctx.fillStyle = '#2a1a0e'; ctx.fillRect(-6.8, 2.8, 13.6, 1.3); ctx.fillStyle = '#9a6a3a'; for (let i=0;i<4;i++) ctx.fillRect(-5.6 + i*3.2, 2.9, 1.4, 1.1); // a belt of copper plaques
    ctx.strokeStyle = '#0e0a08'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<5;i++){ ctx.moveTo(-6.6 + i*.5, -5.6); ctx.lineTo(-7.2 + i*.4 + sw*.2, -1.6 + (i%2)); ctx.moveTo(6.6 - i*.5, -5.6); ctx.lineTo(7.4 - i*.4 + sw*.2, -2 + (i%2)); } ctx.stroke(); // horsehair at the shoulders
    ell(ctx, 8.6, 1.6, 1.2, 1.2, sk); // the hand on the lance
    h.head(sk, 4.4, -11.2); ctx.fillStyle = 'rgba(255,210,180,.14)'; ctx.fillRect(-3, -10.6, 2.4, 3); // the face, bare of paint now
    h.look('rgba(255,236,200,.9)', -11.8); b43Tears(ctx, -.4, 2.8, -10.6, 4.6, !old); // the black tears
    ctx.fillStyle = old ? '#8a8480' : '#0e0a08'; ctx.beginPath(); ctx.arc(0, -12.4, 4.9, Math.PI*1.02, Math.PI*1.98); ctx.fill(); ctx.fillRect(-4.9, -12.8, 2, 2.6); // hair drawn back, grey on the old ones
    ell(ctx, -.6, -17.6, 2.2, 1.7, old ? '#8a8480' : '#0e0a08'); ctx.fillStyle = '#9a6a3a'; ctx.fillRect(-2.2, -16.4, 3.2, .7); // the topknot, copper-bound
    for (let i=0;i<3;i++){ B2F.line(ctx, old ? '#6a6460' : '#120c0a', .9, [[-4.4 + i*.7, -12], [-5.2 + i*.6 + sw*.15, -4], [-5.6 + i*.8 + sw*.3, 2.4 - i]]); ctx.fillStyle = '#e8e0cc'; ctx.fillRect(-5.6 + i*.7 + sw*.2, -3 + i*1.6, .7, .8); } // braids to the waist, bone beads
    ctx.fillStyle = 'rgba(190,186,180,.35)'; ctx.fillRect(-5.4, -6, 1.8, 2); // ash rubbed into them
    ctx.strokeStyle = '#9a6a3a'; ctx.lineWidth = .9; ctx.beginPath(); ctx.arc(.4, -6.4, 3.6, Math.PI*.1, Math.PI*.9); ctx.stroke(); }, // a copper torque
  /* the war chief of the Burned Tears, far off at the feast and near at the Third's fire: huge, bronze scale under a horsehide mantle edged in
     mane, grey come into his braids and beard, no helm tonight, and the tears thick and fresh, black to the jaw */
  b4_c3_warchief(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.2, 1.14); const sk = '#9a7252', sw = o.still ? 0 : Math.sin(t/600 + (o.phase||0));
    poly(ctx, [[-6.6,-7],[6.6,-7],[8.6,11.6],[3,12.6],[0,11],[-3.4,12.8],[-9.4,11.4]], h.armor('#4a3424', '#120a06')); ctx.strokeStyle = '#140e0a'; ctx.lineWidth = .6; ctx.beginPath(); for (let i=0;i<9;i++){ const x = -9 + i*2.1; ctx.moveTo(x, 11.4 + (i%2)*.8); ctx.lineTo(x - .6 + sw*.3, 13.4 + (i%3)*.4); } ctx.stroke(); // the mantle behind him, mane at its hem
    h.legs('#2e2218'); ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-4.8, 8, 3.8, 5); ctx.fillRect(1, 8, 3.8, 5);
    poly(ctx, [[-6.8,-6.4],[6.8,-6.4],[7.4,7.6],[-7.4,7.6]], h.armor('#7a5a2a', '#2a1a08')); b2Scales(ctx, -6, 6.4, -5.6, 8, 1.8, '#b8864a', '#5a3e18'); ctx.fillStyle = 'rgba(255,236,190,.14)'; ctx.fillRect(-6.4, -5.8, 1.6, 12.6); // bronze scale, dulled
    ctx.fillStyle = '#2a1a0e'; ctx.fillRect(-7.2, 2.4, 14.4, 1.8); ctx.fillStyle = '#a8803a'; for (let i=0;i<5;i++) ctx.fillRect(-6.4 + i*2.8, 2.6, 1.6, 1.4); // a war-belt
    poly(ctx, [[-8.6,-7.6],[-3,-7.4],[-4.6,-2],[-9.6,-1.6]], h.armor('#5a3e2a', '#1a0e06')); // the mantle over one shoulder
    B2F.line(ctx, '#5a3e2a', 2.2, [[-6, -4], [-8.4, 2], [-8.4, 6.6]]); ell(ctx, -8.4, 7.2, 1.4, 1.3, sk); // an arm down
    ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(6.6, 3.8); ctx.quadraticCurveTo(9.6, 1, 10.4, -3); ctx.stroke(); ctx.fillStyle = '#a8803a'; ctx.fillRect(9.2, -4.4, 2.8, 1.4); ell(ctx, 6.8, 3.6, 1.4, 1.4, sk); // a drinking horn held up, copper-capped
    h.head(sk, 4.8, -11.4); ctx.fillStyle = 'rgba(40,24,16,.4)'; ctx.fillRect(-1, -14.6, 3.6, .5); h.look('rgba(255,236,200,.9)', -11.8); b43Tears(ctx, -.6, 3, -10.8, 5.8, true); ctx.fillStyle = 'rgba(10,6,6,.5)'; ctx.fillRect(-1.6, -10.6, .5, 4.4); ctx.fillRect(3.9, -10.6, .5, 4); // the tears, thick, more than two
    poly(ctx, [[-1.6,-6.4],[3.6,-6.4],[3,-1.4],[1.2,-.4],[-.6,-2]], '#2a2420'); ctx.strokeStyle = 'rgba(200,196,186,.6)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(.2, -6); ctx.lineTo(.6, -1.4); ctx.moveTo(2.2, -6); ctx.lineTo(2, -1.6); ctx.stroke(); // a braided beard, grey in it
    ctx.fillStyle = '#16100c'; ctx.beginPath(); ctx.arc(0, -12.6, 5.2, Math.PI*1.02, Math.PI*1.98); ctx.fill(); ctx.fillStyle = 'rgba(180,176,170,.5)'; ctx.fillRect(-4.6, -14, 2.4, 1); ctx.fillRect(1.4, -16.6, 2, .8); // hair, grey coming in
    for (let i=0;i<3;i++) B2F.line(ctx, i ? '#2a2420' : '#8a8480', 1, [[-4.6 + i*.8, -12.2], [-5.6 + i*.7 + sw*.2, -4], [-6 + i*.9 + sw*.4, 3 - i]]); // braids
    ell(ctx, 5, -10, .8, .8, '#d8b050'); ctx.restore(); },
  /* a river scavenger: a ford-picker of the Vathar's banks, soaked to the chest, a short wet tunic gone the river's colour, a head-cloth,
     a gutting knife or a boat-hook, and a sack across the back that hangs heavy with iron */
  b4_c3_scavenger(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1); const c = b2Pick(o, [['#5a5240', '#1e1a12'], ['#4a4a3e', '#16160e'], ['#5e4a36', '#20160c']]), sk = b2Pick(o, ['#8a6448', '#7a5a42', '#94704e']), hook = hash(Math.round((o.phase || 0)*7), 5) > .5;
    ell(ctx, -6.4, -1.6, 3.8, 5.2, h.armor('#5a4a32', '#1e160c')); ctx.fillStyle = 'rgba(160,160,150,.5)'; for (let i=0;i<3;i++) ctx.fillRect(-8.4 + i*1.6, -5.8 + (i%2), .8, .5); // the sack, iron showing at the mouth
    ctx.fillStyle = sk; ctx.fillRect(-4.5, 5, 3.4, 8); ctx.fillRect(1.1, 5, 3.4, 8); ctx.fillStyle = 'rgba(20,26,30,.55)'; ctx.fillRect(-4.5, 4.4, 3.4, 5.4); ctx.fillRect(1.1, 4.4, 3.4, 5.4); // bare legs, wet dark to the thigh
    poly(ctx, [[-5.8,-6],[5.8,-6],[6.4,6.4],[-6.4,6.4]], h.armor(c[0], c[1])); ctx.fillStyle = 'rgba(20,26,30,.4)'; ctx.fillRect(-6.4, 1.6, 12.8, 4.8); ctx.fillStyle = 'rgba(200,210,220,.18)'; ctx.fillRect(-6.4, 1.4, 12.8, .5); // a short tunic, soaked below the waterline
    ctx.fillStyle = '#2a2014'; ctx.fillRect(-6, 1, 12, 1); // a rope belt
    ctx.fillStyle = sk; ctx.fillRect(6, -4.6, 2.2, 6.4);
    if (hook) { B2F.line(ctx, '#5a4428', 1.2, [[7.2, 10], [10.4, -20]]); ctx.strokeStyle = '#7a7670'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(10.4, -20); ctx.lineTo(11, -23); ctx.quadraticCurveTo(13.4, -22.6, 12.6, -19.8); ctx.stroke(); } // a long boat-hook
    else { B2F.line(ctx, '#9a948a', 1.1, [[7.4, 1.6], [11.4, -4]]); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(6.6, 1, 1.6, 2.4); } // a gutting knife
    h.head(sk, 4.2, -11.2); h.look('rgba(20,12,8,.9)', -11.2); ctx.fillStyle = 'rgba(40,24,16,.45)'; ctx.fillRect(-3.4, -8.8, 7, 1.4); // stubble
    B2F.cloth(ctx, '#7a7058', '#3a3426'); ctx.restore(); },
  /* a river-tribe warrior of the Vathar's banks: bare to the waist, white clay and river mud painted in bars, a kilt of reed-woven cloth,
     shells and fishbone at the throat, a hooked sword or a fishing spear, a short bow on the archers; braids with river shells in them */
  b4_c3_tribesman(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.04); const sk = b2Pick(o, ['#6a4632', '#5a3c2a', '#7a5238']), v = Math.floor(hash(Math.round((o.phase || 0)*7), 9)*3), old = o.kind === 'headman';
    h.legs('#3a2a1c'); ctx.fillStyle = sk; ctx.fillRect(-4.5, 7, 3.4, 6); ctx.fillRect(1.1, 7, 3.4, 6); // bare shins
    poly(ctx, [[-6.4,1.6],[6.4,1.6],[7.4,9],[-7.4,9]], h.armor('#7a7048', '#2a2614')); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<6;i++){ ctx.moveTo(-6.6 + i*2.6, 2); ctx.lineTo(-7.2 + i*2.8, 9); } ctx.stroke(); // a kilt of woven reed
    poly(ctx, [[-6.2,-6],[6.2,-6],[6,2],[-6,2]], sk); ctx.fillStyle = 'rgba(255,220,190,.16)'; ctx.fillRect(-5.6, -5.4, 2, 7); // bare chest
    ctx.fillStyle = 'rgba(232,226,212,.75)'; for (let i=0;i<3;i++) ctx.fillRect(-5.4, -4.4 + i*2.2, 10.8, .9); ctx.fillStyle = 'rgba(60,44,30,.5)'; ctx.fillRect(-1, -6, 2, 8); // white clay in bars, mud down the middle
    ctx.strokeStyle = '#e8e0cc'; ctx.lineWidth = .6; ctx.beginPath(); ctx.arc(0, -5.6, 3.4, Math.PI*.15, Math.PI*.85); ctx.stroke(); ctx.fillStyle = '#e8e0cc'; for (let i=0;i<5;i++) ell(ctx, -2.6 + i*1.3, -3.4 + Math.abs(i - 2)*-.4, .5, .7, '#e8e0cc'); // shells and fishbone at the throat
    ctx.fillStyle = sk; ctx.fillRect(-8.4, -5, 2.2, 7); ctx.fillRect(6.2, -5, 2.2, 6.6);
    if (v === 0) { ctx.strokeStyle = '#a8a49a'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(7.4, 1.4); ctx.lineTo(10.4, -7); ctx.quadraticCurveTo(12.4, -9, 10.6, -10.4); ctx.stroke(); ctx.fillStyle = '#3a2414'; ctx.fillRect(6.6, .8, 1.8, 2.6); } // a hooked sword
    else if (v === 1) { B2F.line(ctx, '#6a5030', 1.2, [[7.4, 12], [9.6, -22]]); ctx.strokeStyle = '#c8c0b0'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(9.2, -22); ctx.lineTo(8.6, -26); ctx.moveTo(9.6, -22); ctx.lineTo(9.8, -26.4); ctx.moveTo(10, -22); ctx.lineTo(11, -25.8); ctx.stroke(); } // a fishing spear, three-tined
    else { ctx.strokeStyle = '#5a4026'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.arc(8.4, -2, 7, -Math.PI*.42, Math.PI*.42); ctx.stroke(); ctx.strokeStyle = 'rgba(220,210,190,.6)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(10.6, -8.6); ctx.lineTo(10.6, 4.6); ctx.stroke(); } // a short bow
    h.head(sk, 4.4, -11.2); ctx.fillStyle = 'rgba(232,226,212,.8)'; ctx.fillRect(-3.4, -12.4, 7.6, 1); ctx.fillRect(-2.6, -9.4, 1, 2.4); ctx.fillRect(2.6, -9.4, 1, 2.4); h.look('rgba(20,12,8,.9)', -11.4); // white clay over the brow and down the cheeks
    ctx.fillStyle = '#120c08'; ctx.beginPath(); ctx.arc(0, -12.6, 4.8, Math.PI*1.02, Math.PI*1.98); ctx.fill();
    for (let i=0;i<4;i++){ B2F.line(ctx, '#120c0a', .9, [[-4 + i*.6, -12.4], [-5 + i*.6, -6]]); ell(ctx, -5 + i*.6, -5.6, .55, .7, '#e0d8c4'); } // braids, a shell at each end
    ctx.restore(); },
});
/* the river people's headman shares the tribesman's frame: older, a staff hung with braids and a dog's skull */
FIGX.b4_c3_headman = (ctx, h, t, o) => { FIGX.b4_c3_tribesman(ctx, h, t, Object.assign({}, o, {phase:1})); B2F.line(ctx, '#4a3420', 1.3, [[-8.6, 12], [-9.6, -20]]); ell(ctx, -9.8, -21.4, 1.8, 1.4, '#e0d8c4'); ctx.fillStyle = '#1a120c'; ctx.fillRect(-10.6, -21.8, .7, .7); ctx.fillRect(-9.2, -21.8, .7, .7);
  for (let i=0;i<3;i++) B2F.line(ctx, i%2 ? '#6a2a1a' : '#2a2014', .8, [[-9.6, -19], [-10.6 - i*.6, -14], [-10.4 - i*.8, -10]]); };

/* ---------------- ground: TILEX ----------------
   b4_c3_hills: the Vathar Hills on Book Two's Odhan (47b), by day and by night: '.' dry grass (the hardpan, with grass standing in it),
     ',' scree, '#' red rock, '=' a hide tent, 'F' and 'f' fires, 'h' the horse lines, 'W' a 9th's wagon (all the Odhan's own); 'k' a
     cairn of grey stones with a horse skull on it.
   b4_c3_ford: Vathar Crossing on Book Two's Vathar (51b): '.' bank, ',' reeds, '~' deep water, '-' shallows, '#' the steep far bank;
     'b' a bone-bank, a long dark bar under shallow water with pale shapes in it, never more; 'p' an offering pole, braids and a dark shape
     at the top; 'r' the old ferry post and its black rope; 'F' a fire. In a battle 'o' is the deep channel and 't' a bone-bank (in the
     water) or a pole (on the bank). */
function b43Grass(ctx, x, y, T, N){ const px = x*T, py = y*T; for (let c = 0; c < 3; c++) { const bx = px + T*(.15 + hash(x, y, c + 90)*.7), by = py + T*(.4 + hash(y, x, c + 91)*.5);
    for (let i = 0; i < 6; i++) { const a = (i/5 - .5)*.9 + (hash(x, y, c*9 + i)*.2 - .1), l = T*(.12 + hash(x, y, c*7 + i + 3)*.12); ctx.strokeStyle = N ? (i % 2 ? 'rgba(70,76,84,.7)' : 'rgba(50,56,62,.8)') : (i % 2 ? 'rgba(210,190,130,.85)' : 'rgba(170,150,96,.8)'); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + Math.sin(a)*l*.5, by - l*.6, bx + Math.sin(a)*l, by - Math.cos(a)*l); ctx.stroke(); } } }
function b43Cairn(ctx, x, y, T, N){ const px = x*T, py = y*T, cx = px + T*.5, by = py + T*.9; ctx.save(); ctx.translate(cx, by); ctx.scale(1.3, 1.3); ctx.translate(-cx, -by); ell(ctx, cx + T*.08, by, T*.36, T*.08, N ? 'rgba(0,0,0,.45)' : 'rgba(70,46,26,.35)');
  [[0, 0, .3], [-.18, -.04, .16], [.18, -.03, .17], [-.08, -.2, .18], [.1, -.22, .16], [0, -.36, .14]].forEach(([dx, dy, r], i) => { ell(ctx, cx + dx*T, by + dy*T - T*.06, r*T*.6, r*T*.42, N ? (i % 2 ? '#3a3a42' : '#2c2c34') : (i % 2 ? '#a8a294' : '#8a8478')); ell(ctx, cx + dx*T - r*T*.15, by + dy*T - T*.1, r*T*.3, r*T*.16, N ? 'rgba(160,170,210,.12)' : 'rgba(255,250,235,.35)'); });
  const sy = by - T*.52; ell(ctx, cx, sy, T*.11, T*.07, N ? '#6a6a72' : '#ece4d0'); ctx.fillStyle = N ? '#5a5a62' : '#ddd4bc'; ctx.fillRect(cx - T*.03, sy, T*.06, T*.12); ctx.fillStyle = N ? '#14141a' : '#3a2c1e'; ctx.fillRect(cx - T*.06, sy - T*.01, T*.03, T*.025); ctx.fillRect(cx + T*.03, sy - T*.01, T*.03, T*.025); // the horse skull
  B2F.line(ctx, N ? '#3a3028' : '#6a5030', Math.max(1, T*.025), [[cx + T*.14, by - T*.36], [cx + T*.18, by - T*.82]]); poly(ctx, [[cx + T*.18, by - T*.82], [cx + T*.42, by - T*.76], [cx + T*.36, by - T*.66], [cx + T*.17, by - T*.7]], N ? '#4a3a3a' : '#a83a2a'); ctx.restore(); } // a rag on a stick
TILEX.b4_c3_hills = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const N = !!dark;
  if (ch === 'k') { b2Odhan(ctx, ',', x, y, T, N); return b43Cairn(ctx, x, y, T, N); }
  if (ch === ',') { b2Odhan(ctx, 'r', x, y, T, N); return; } // scree: loose stones on the hardpan
  if (ch === 'f') return b2Odhan(ctx, 'F', x, y, T, N);
  if (ch === 't') ch = '.';
  b2Odhan(ctx, ch, x, y, T, N); if (ch === '.') b43Grass(ctx, x, y, T, N); });
/* a fight's low cover in the hills: a pile of red boulders, waist high, grass at its foot */
function b43Boulders(ctx, x, y, T, N){ const px = x*T, py = y*T; ell(ctx, px + T*.56, py + T*.84, T*.44, T*.1, N ? 'rgba(0,0,0,.5)' : 'rgba(70,46,26,.4)');
  [[.32, .66, .26], [.66, .68, .24], [.5, .44, .22], [.2, .78, .12], [.84, .8, .1]].forEach(([u, v, r], i) => { const cx = px + T*u, cy = py + T*v; ell(ctx, cx + r*T*.2, cy + r*T*.3, r*T, r*T*.66, N ? 'rgba(0,0,0,.35)' : 'rgba(70,46,26,.3)');
    const g = ctx.createLinearGradient(cx - r*T, cy - r*T, cx + r*T, cy + r*T); g.addColorStop(0, N ? '#3a3a44' : '#c8a070'); g.addColorStop(.55, N ? '#24242c' : '#9a7452'); g.addColorStop(1, N ? '#101014' : '#4a3222'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(cx, cy, r*T, r*T*.78, (i - 2)*.3, 0, 7); ctx.fill();
    ctx.fillStyle = N ? 'rgba(170,180,220,.1)' : 'rgba(255,240,210,.3)'; ctx.beginPath(); ctx.ellipse(cx - r*T*.3, cy - r*T*.3, r*T*.4, r*T*.2, -.4, 0, 7); ctx.fill(); }); b43Grass(ctx, x, y, T, N); }
{ const _df = drawFeature; drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (style === 'b4_c3_hills' && ch === 't') return b2Clip(ctx, x, y, T, () => b43Boulders(ctx, x, y, T, !!dark)); return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* the ford: Book Two's Vathar, read through a translated map so the water finds its own shape round the bone-banks and the poles */
let b43XSrc = null, b43XMap = null;
const b43Wet = c => c === '~' || c === '-' || c === 'b' || c === 'o';
function b43Xlat(m){ if (m === b43XSrc && b43XMap) return b43XMap; b43XSrc = m;
  b43XMap = m ? m.map((r, y) => [...r].map((c, x) => { if (c === 'o') return '~'; if (c === 'b') { let d = 0, w = 0; [[0,-1],[1,0],[0,1],[-1,0]].forEach(([dx, dy]) => { const q = ((m[y + dy] || '')[x + dx]) || ''; if (q === '~' || q === 'o') d++; else if (q === '-') w++; }); return d > w ? '~' : '-'; } if (c === 'p' || c === 'r' || c === 'F') return '.';
    if (c === 't') { const near = [[0,-1],[1,0],[0,1],[-1,0]].some(([dx, dy]) => b43Wet(((m[y + dy] || '')[x + dx]) || '')); return near ? '-' : '.'; } return c; }).join('')) : m; return b43XMap; }
function b43Ford(ctx, ch, x, y, T, N){ const keep = tileMap; tileMap = b43Xlat(keep); try { b2Vathar(ctx, ch, x, y, T, N); } finally { tileMap = keep; }
  const px = x*T, py = y*T, m = tileMap, dv = (xx, yy) => { const c = m && m[clamp(yy, 0, m.length - 1)] && m[clamp(yy, 0, m.length - 1)][clamp(xx, 0, (m[0] || '').length - 1)]; return c === '~' || c === 'o' ? 1 : c === '-' || c === 'b' || c === 't' ? 0 : -1; };
  if (ch === '-' || ch === '~') { const cv = (cx, cy) => { let a = 0, n = 0; [[0,0],[-1,0],[0,-1],[-1,-1]].forEach(([dx, dy]) => { const v = dv(cx + dx, cy + dy); if (v >= 0) { a += v; n++; } }); return n ? a/n : 0; };
    const c00 = cv(x, y), c10 = cv(x + 1, y), c01 = cv(x, y + 1), c11 = cv(x + 1, y + 1), K = 4; // the depth at the tile's corners, so the dark of the channel fades into the shallows instead of stopping at a tile's edge
    for (let j = 0; j < K; j++) for (let i = 0; i < K; i++) { const u = (i + .5)/K, v = (j + .5)/K, d = lerp(lerp(c00, c10, u), lerp(c01, c11, u), v);
      ctx.fillStyle = d > .5 ? (N ? `rgba(0,2,10,${(.36*(d - .5)*2).toFixed(3)})` : `rgba(10,20,24,${(.26*(d - .5)*2).toFixed(3)})`) : (N ? `rgba(150,165,200,${(.1*(1 - d*2)).toFixed(3)})` : `rgba(240,226,190,${(.14*(1 - d*2)).toFixed(3)})`); ctx.fillRect(px + i*T/K, py + j*T/K, T/K + .5, T/K + .5); } }
  if (ch === '-') { for (let i = 0; i < 4; i++) ell(ctx, px + T*(.15 + hash(x, y, i + 70)*.7), py + T*(.2 + hash(y, x, i + 71)*.6), T*.05, T*.03, N ? 'rgba(90,96,110,.4)' : 'rgba(130,110,80,.4)'); } // shallow: stones showing through
  else if (ch === '~') { ctx.strokeStyle = N ? 'rgba(120,140,190,.14)' : 'rgba(220,230,226,.2)'; ctx.lineWidth = 1; for (let i = 0; i < 2; i++) { const yy = py + T*(.3 + i*.4 + (hash(x, y, i + 72) - .5)*.1); ctx.beginPath(); ctx.moveTo(px + T*.1, yy); ctx.quadraticCurveTo(px + T*.5, yy - T*.06, px + T*.9, yy); ctx.stroke(); } } } // deep: darker, the current showing
function b43BoneBank(ctx, x, y, T, N){ const px = x*T, py = y*T, h = hash(x, y), isB = (dx) => { const c = tileMap && tileMap[y] && tileMap[y][x + dx]; return c === 'b' || c === 't'; }; // a long dark bank under the water, joined to its neighbours like a weir; pale flecks in it, never more
  const l = isB(-1) ? -1 : T*.08, r = isB(1) ? T + 1 : T*.92, cy = py + T*(.5 + (h - .5)*.08), th = T*.2;
  ctx.fillStyle = N ? 'rgba(4,4,8,.42)' : 'rgba(30,22,16,.38)'; ctx.beginPath(); ctx.moveTo(px + l, cy - th*.6); for (let i = 0; i <= 6; i++) { const u = i/6; ctx.lineTo(px + lerp(l, r, u), cy - th*(.8 + .4*Math.sin(u*6 + x*2.1))); } for (let i = 6; i >= 0; i--) { const u = i/6; ctx.lineTo(px + lerp(l, r, u), cy + th*(.8 + .3*Math.cos(u*5 + x*1.7))); } ctx.closePath(); ctx.fill();
  if (!isB(-1)) ell(ctx, px + l + T*.04, cy, T*.08, th*.8, N ? 'rgba(4,4,8,.42)' : 'rgba(30,22,16,.38)'); if (!isB(1)) ell(ctx, px + r - T*.04, cy, T*.08, th*.8, N ? 'rgba(4,4,8,.42)' : 'rgba(30,22,16,.38)');
  for (let i = 0; i < 4; i++) { const bx = px + T*(.1 + hash(x, y, i + 20)*.8), by = cy + (hash(y, x, i + 21) - .5)*th, k = hash(x, y, i + 22); ctx.strokeStyle = N ? 'rgba(150,154,170,.22)' : 'rgba(214,206,186,.34)'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath();
    if (k < .55) { ctx.moveTo(bx - T*.07, by); ctx.lineTo(bx + T*.07, by + T*.015); } else ctx.arc(bx, by, T*.045, Math.PI*1.1, Math.PI*1.9); ctx.stroke(); }
  ctx.strokeStyle = N ? 'rgba(140,160,200,.16)' : 'rgba(240,240,226,.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px + Math.max(0, l), cy - th*1.15); ctx.quadraticCurveTo(px + T*.5, cy - th*1.5, px + Math.min(T, r), cy - th*1.1); ctx.stroke(); } // the river humping over it
function b43Pole(ctx, x, y, T, N){ const px = x*T, py = y*T, cx = px + T*(.42 + hash(x, y, 3)*.16), by = py + T*.9, top = py - T*.05, h = hash(x, y), tx = cx + (h - .5)*T*.1;
  ell(ctx, cx + T*.14, by, T*.26, T*.06, N ? 'rgba(0,0,0,.55)' : 'rgba(50,34,20,.45)');
  B2F.line(ctx, N ? '#241e18' : '#3a2a18', Math.max(2, T*.08), [[cx, by], [tx, top + T*.14]]); ctx.strokeStyle = N ? 'rgba(255,170,100,.3)' : 'rgba(255,240,210,.35)'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(cx - T*.03, by); ctx.lineTo(tx - T*.03, top + T*.16); ctx.stroke(); // the pole, a lit edge on it
  ctx.fillStyle = N ? '#120e0e' : '#2a1e16'; ctx.beginPath(); ctx.ellipse(tx, top + T*.2, T*.17, T*.11, (h - .5), 0, 7); ctx.fill(); ctx.fillStyle = N ? 'rgba(255,170,100,.18)' : 'rgba(255,240,210,.2)'; ctx.beginPath(); ctx.ellipse(tx - T*.05, top + T*.16, T*.08, T*.04, (h - .5), 0, 7); ctx.fill(); // a dark shape at the top: what was put up there; never more than a shape
  for (let i = 0; i < 5; i++) B2F.line(ctx, N ? (i % 2 ? '#3a2020' : '#2a2420') : (i % 2 ? '#8a2e1c' : '#3a2a1a'), Math.max(.9, T*.025), [[tx + T*(-.08 + i*.04), top + T*.28], [tx + T*(-.1 + i*.05), top + T*(.46 + hash(x, y, i)*.18)]]); // braids hung from it
  ctx.fillStyle = N ? 'rgba(200,196,190,.45)' : 'rgba(226,218,196,.85)'; for (let i = 0; i < 3; i++) ctx.fillRect(tx + T*.06, top + T*(.32 + i*.06), Math.max(1, T*.035), Math.max(1, T*.035)); } // knucklebones threaded on a string
function b43Ferry(ctx, x, y, T, N){ const px = x*T, py = y*T; ell(ctx, px + T*.56, py + T*.84, T*.26, T*.06, N ? 'rgba(0,0,0,.5)' : 'rgba(50,34,20,.4)');
  ctx.fillStyle = N ? '#14120e' : '#2a2016'; ctx.beginPath(); ctx.moveTo(px + T*.36, py + T*.86); ctx.lineTo(px + T*.5, py + T*.86); ctx.lineTo(px + T*.62, py + T*.08); ctx.lineTo(px + T*.48, py + T*.06); ctx.closePath(); ctx.fill(); // the post, leaning out over the water
  ctx.fillStyle = N ? 'rgba(150,160,200,.1)' : 'rgba(255,240,210,.18)'; ctx.fillRect(px + T*.48, py + T*.1, Math.max(1, T*.03), T*.7);
  ctx.strokeStyle = N ? '#0a0808' : '#1a140e'; ctx.lineWidth = Math.max(1.4, T*.05); ctx.beginPath(); ctx.moveTo(px + T*.56, py + T*.24); ctx.quadraticCurveTo(px + T*.7, py + T*.1, px + T*.8, py - T*.3); ctx.stroke(); // the black rope, away out over the river
  for (let i = 0; i < 4; i++) { ctx.strokeStyle = N ? '#1a1612' : '#3a2c1c'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px + T*.47, py + T*(.2 + i*.03)); ctx.lineTo(px + T*.6, py + T*(.22 + i*.03)); ctx.stroke(); } } // turns of it round the post
function b43FordFire(ctx, x, y, T, N){ const cx = x*T + T*.5, cy = y*T + T*.6; for (let i = 0; i < 7; i++) { const a = i/7*6.28; ell(ctx, cx + Math.cos(a)*T*.26, cy + Math.sin(a)*T*.16, T*.07, T*.05, N ? '#2a2a30' : '#7a6a54'); } b2Flames(ctx, cx, cy, T, N ? 1 : .55); }
TILEX.b4_c3_ford = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const N = !!dark;
  if (ch === 'b') { b43Ford(ctx, '-', x, y, T, N); return b43BoneBank(ctx, x, y, T, N); }
  if (ch === 'p') { b43Ford(ctx, '.', x, y, T, N); return b43Pole(ctx, x, y, T, N); }
  if (ch === 'r') { b43Ford(ctx, '.', x, y, T, N); return b43Ferry(ctx, x, y, T, N); }
  if (ch === 'F') { b43Ford(ctx, '.', x, y, T, N); if (N) b2Firelit(ctx, x, y, T, .22, 3, '255,150,70'); b43FordFire(ctx, x, y, T, N); return; }
  if (ch === 'o') ch = '~';
  b43Ford(ctx, ch, x, y, T, N); if (N && ch !== '~' && ch !== '-') b2Firelit(ctx, x, y, T, .22, 3, '255,150,70'); });
/* in a fight at the ford the deep channel is water, not a pit, and low cover is a bone-bank in the river or a pole on the bank */
{ const _df = drawFeature; drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (style === 'b4_c3_ford' && (ch === 'o' || ch === 't')) return b2Clip(ctx, x, y, T, () => { const N = !!dark;
      if (ch === 'o') return b43Ford(ctx, '~', x, y, T, N);
      const wet = [[0,-1],[1,0],[0,1],[-1,0]].some(([dx, dy]) => b43Wet(((map && map[y + dy]) || '')[x + dx] || ''));
      if (wet) { b43Ford(ctx, '-', x, y, T, N); b43BoneBank(ctx, x, y, T, N); } else b43Pole(ctx, x, y, T, N); });
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* a Khundryl rider small and far, side on, a lance up with its tail, from Book Two's riders */
function b43FarRider(x, cx, cy, s, col, d, k){ b2Rider(x, cx, cy, s, col, d, k, true); x.strokeStyle = col; x.lineWidth = .6*s; x.beginPath(); x.moveTo(cx, cy - 12*s); x.lineTo(cx - d*.8*s, cy - 24*s); x.stroke(); x.lineWidth = .8*s; x.beginPath(); x.moveTo(cx - d*.8*s, cy - 23*s); x.quadraticCurveTo(cx - d*3*s, cy - 21*s, cx - d*3.6*s, cy - 17*s); x.stroke(); }
/* a ridge line of dry hills: f(u) gives the height; filled down to the bottom */
function b43Ridge(x, W, H, base, amp, seed, col, f){ x.fillStyle = col; x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W + 8; px += 6) { const u = px/W; x.lineTo(px, base - amp*(f ? f(u) : .5 + .3*Math.sin(u*7 + seed) + .2*Math.sin(u*17 + seed*2))); } x.lineTo(W, H); x.closePath(); x.fill(); }
/* the hills by day, and on the far ridge dust with riders in it, keeping pace: the column in the fold below */
SCENEX.b4_c3_shadow = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4, f = (S && S.f) || {}, come = !!f.b4_c3_raidersDone;
  const ridge = u => hz + H*.035 - H*.05*(.6 + .25*Math.sin(u*6 + 1) + .15*Math.sin(u*15));
  ctx.drawImage(sceneLayer('b43:shadow', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz + H*.1, [[0,'#a8b0b4'],[.55,'#e0dccc'],[1,'#f0e4c8']]); x.fillRect(0, 0, W, hz + H*.1); glow(x, W*.7, H*.08, W*.5, '#fffaf0', .5); // a white sky, the sun high in it
    b43Ridge(x, W, H, hz + H*.02, H*.05, 3, '#b8a888'); // the far hills
    x.fillStyle = '#9a8a6a'; x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W + 8; px += 5) x.lineTo(px, ridge(px/W)); x.lineTo(W, H); x.fill(); // the ridge the riders are on
    b43Ridge(x, W, H, hz + H*.24, H*.12, 7, '#a08a62', u => .5 + .4*Math.sin(u*3.2 + 2) + .1*Math.sin(u*11)); // a nearer fold
    x.fillStyle = vgrad(x, hz + H*.26, H, [[0,'#b49a6e'],[.5,'#9a7e56'],[1,'#5a4430']]); x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W + 8; px += 5) x.lineTo(px, hz + H*.36 + H*.05*Math.sin(px/W*4 + 1)); x.lineTo(W, H); x.fill(); // the near slope
    for (let i = 0; i < 140; i++) { const yy = hz + H*.3 + Math.pow(hash(i, 931), 1.2)*(H*.7), px = hash(i, 932)*W, d = (yy - hz)/(H - hz); x.strokeStyle = `rgba(${hash(i, 933) > .5 ? '210,188,128' : '120,100,64'},${(.3 + d*.4).toFixed(2)})`; x.lineWidth = .6 + d; for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(px + k*2, yy); x.lineTo(px + k*2 + (k - 1)*1.4*d, yy - 3 - d*8); x.stroke(); } } // dry grass, standing
    for (let i = 0; i < 20; i++) { const px = hash(i, 934)*W, py = hz + H*.4 + hash(i, 935)*H*.5, r = 2 + hash(i, 936)*6*((py - hz)/(H - hz)); ell(x, px + r*.4, py + r*.3, r*1.1, r*.4, 'rgba(70,50,30,.35)'); ell(x, px, py, r, r*.6, '#8a7458'); ell(x, px - r*.3, py - r*.2, r*.5, r*.3, '#b8a07a'); } // scree and stones
    // the column, in the fold below, small, wagons and a road of its own dust
    x.strokeStyle = 'rgba(214,196,150,.5)'; x.lineWidth = H*.03; x.lineCap = 'round'; x.beginPath(); x.moveTo(-10, hz + H*.42); x.quadraticCurveTo(W*.4, hz + H*.36, W*1.05, hz + H*.2); x.stroke(); x.lineCap = 'butt'; // the column's road, beaten pale
    b2Column(x, W, H, k => { const u = 1 - k; return [u*u*(-W*.02) + 2*u*k*(W*.4) + k*k*(W*1.02), u*u*(hz + H*.42) + 2*u*k*(hz + H*.36) + k*k*(hz + H*.2)]; }, 170, 'rgba(58,44,30,.85)', 'rgba(220,200,160,.1)'); // the column, receding along it
    for (let i = 0; i < 10; i++) { const k = .2 + i*.08, u = 1 - k; ell(x, u*u*(-W*.02) + 2*u*k*(W*.4) + k*k*(W*1.02), u*u*(hz + H*.42) + 2*u*k*(hz + H*.36) + k*k*(hz + H*.2) - H*.03, W*.06, H*.02, 'rgba(230,214,176,.14)'); } // and its own dust over it
  }), 0, 0, W, H);
  // the dust on the ridge: a long smear, drifting, and the riders in it, keeping pace (after the fight, coming down toward the column)
  for (let i = 0; i < 22; i++) { const k = ((t*mo/40000 + hash(i, 941)) % 1), u = (hash(i, 942)*.8 + .1 + k*.06) % 1, px = u*W, py = ridge(u) - H*(.02 + hash(i, 944)*.03); ell(ctx, px, py, W*.1 + hash(i, 943)*W*.08, H*.035, `rgba(232,216,180,${(.26 + .12*Math.sin(k*Math.PI)).toFixed(3)})`); } // the long smear of their dust along the ridge
  const NR = 110; for (let i = 0; i < NR; i++) { const u0 = hash(i, 951), u = come ? u0 : (u0 + t*mo/260000) % 1, px = u*W, by = ridge(u) + (come ? H*.04 + hash(i, 952)*H*.08 : hash(i, 953)*H*.01), s = come ? .55 + hash(i, 954)*.3 : .3 + hash(i, 954)*.12;
    if (!come && hash(i, 955) > .6) continue; b2Fleck(ctx, px, by, s, `rgba(${40 + Math.round(hash(i, 956)*20)},${30 + Math.round(hash(i, 957)*14)},20,.88)`, hash(i, 958) > .8); }
  for (let i = 0; i < 4; i++) { const u = (hash(i, 961)*.8 + .1 + (come ? 0 : t*mo/260000)) % 1; b43FarRider(ctx, u*W, ridge(u) - .5 + (come ? H*.06 : 0), .32, 'rgba(36,26,18,.85)', 1, Math.floor(t*mo/240 + i) % 2); }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.08 + i*Math.min(28, W*.36/sq.length), H*.97 - (i % 2)*3, 2, t, {phase:i, dir:1}));
  vign(ctx, W, H, .35, .5); };

/* the Khundryl feast at night: dark hills under stars, a hundred fires over the slopes, tents of hide, the horse lines along the skyline,
   people round every fire; near, the Third's fire, a Khundryl at it weeping with his head back and the black tears shining, the squad */
SCENEX.b4_feast = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.38, fl = b2Fl(t), late = !!((S && S.f) || {}).b4_c3_brawlDone;
  const F = Array.from({length:46}, (_, i) => { const d = Math.pow(hash(i, 1011), .8); return [hash(i, 1012)*W, hz + H*.04 + d*H*.42, .3 + d*1.1]; });
  ctx.drawImage(sceneLayer('b43:feast', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz + H*.1, [[0,'#05070e'],[.7,'#0e1426'],[1,'#1c2030']]); x.fillRect(0, 0, W, hz + H*.1);
    for (let i = 0; i < 110; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 1001)*.55).toFixed(2)})`; x.fillRect(hash(i, 1002)*W, Math.pow(hash(i, 1003), 1.4)*hz, hash(i, 1004) > .94 ? 1.5 : 1, 1); }
    b43Ridge(x, W, H, hz + H*.02, H*.06, 5, '#0e1018'); // the far hills
    for (let i = 0; i < 60; i++) { const px = hash(i, 1005)*W, py = hz - H*.01 + Math.sin(px/W*7 + 5)*H*.006; b2Horse(x, px, py, .35 + hash(i, 1006)*.15, '#06070a', hash(i, 1007) > .5 ? 1 : -1, hash(i, 1008) > .6); } // the horse lines along the skyline, against the stars
    x.fillStyle = vgrad(x, hz + H*.02, H, [[0,'#14141a'],[.5,'#100e12'],[1,'#08070a']]); x.beginPath(); x.moveTo(0, H); for (let px = 0; px <= W + 8; px += 6) x.lineTo(px, hz + H*.03 + H*.02*Math.sin(px/W*5 + 2)); x.lineTo(W, H); x.fill(); // the slopes the camp is on
    for (let i = 0; i < 26; i++) { const px = hash(i, 1009)*W, py = hz + H*.05 + Math.pow(hash(i, 1010), .9)*H*.38, s = .4 + (py - hz)/(H - hz)*1.4; x.fillStyle = '#1c1816'; x.beginPath(); x.moveTo(px - 8*s, py); x.lineTo(px, py - 9*s); x.lineTo(px + 8*s, py); x.fill(); x.fillStyle = '#0c0a0a'; x.beginPath(); x.moveTo(px - 1.6*s, py); x.lineTo(px, py - 4*s); x.lineTo(px + 1.4*s, py); x.fill(); } // hide tents
  }), 0, 0, W, H);
  // the fires, a great many, breathing; people round each, the near ones larger, somebody with an arm up
  ctx.globalCompositeOperation = 'lighter';
  F.forEach(([fx, fy, s], i) => { if (late && hash(i, 1013) > .55) return; const ff = mo ? .78 + .22*Math.sin(t/(100 + i*7) + i) : 1; glow(ctx, fx, fy, 22*s + 10, '#ff8a3a', .22*ff); glow(ctx, fx, fy, 2 + 2*s, '#ffe0a0', .9*ff); });
  ctx.globalCompositeOperation = 'source-over';
  F.forEach(([fx, fy, s], i) => { if (late && hash(i, 1013) > .55) return; for (let k = 0; k < 5; k++) { const a = k/5*6.283 + i, sx = fx + Math.cos(a)*9*s, sy = fy + Math.sin(a)*3*s + 1; ctx.fillStyle = '#0a0808'; ctx.fillRect(sx - 1.6*s, sy - 6*s, 3.2*s, 6*s); ell(ctx, sx, sy - 7*s, 1.6*s, 1.6*s, '#0a0808');
    if (hash(i, k + 1014) > .8) { const up = mo ? Math.sin(t/700 + i + k)*.5 + .5 : .6; ctx.fillRect(sx + 1.2*s, sy - 9*s - up*2*s, .8*s, 4*s); } } }); // an arm up, a horn up
  // the Third's own fire, near
  const cx = W*.5, cy = H*.9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.42, '#ff8a3a', .34*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*14, cy + Math.sin(a)*4, 3, 2, '#3a3430'); } poly(ctx, [[cx - 8, cy], [cx - 2, cy - 17*fl], [cx + 1, cy - 7], [cx + 4, cy - 14*fl], [cx + 8, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - 4, cy], [cx, cy - 9*fl], [cx + 4, cy]], 'rgba(255,230,150,.95)');
  if (mo) for (let i = 0; i < 6; i++) { const k = ((t/1300 + i/6) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*5, cy - 10 - k*34, 1, 1); } // sparks
  // a Khundryl across the fire from the squad, head back, grieving out loud: the tears catch the light
  drawFigure(ctx, 'b4_c3_khundryl', cx + 4, H*.83, 1.7, t, {phase:3, dir:-1});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(28 + j*22), H*.97 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .78, .55); };

/* Vathar Crossing at dusk: the river wide and slow and going red, the ford a pale bar under it with dark banks lying across it, trees on
   the far side, and along the near shore the tribes' poles, black against the water, with shapes at their tops; no detail in any of it */
function b43FordScene(cv, t, mode){ const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, clean = mode === 'cross', night = mode === 'night';
  const m = clean ? 'cross' : night ? 'night' : 'dusk', P = B2VBANK[m], hz = H*.3, r0 = H*.42, r1 = H*.74;
  ctx.drawImage(sceneLayer('b43:ford:' + m, W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, r0, P.sky); x.fillRect(0, 0, W, r0 + 2); glow(x, W*P.sun[0], H*P.sun[1] + hz*.5, W*.4, P.sun[2], P.sun[3]);
    if (m !== 'cross') for (let i = 0; i < (m === 'night' ? 80 : 18); i++) { x.fillStyle = `rgba(230,230,250,${(.1 + hash(i, 1101)*.4).toFixed(2)})`; x.fillRect(hash(i, 1102)*W, Math.pow(hash(i, 1103), 1.5)*hz, 1, 1); }
    x.fillStyle = P.wood; x.beginPath(); x.moveTo(0, r0 + 2); for (let px = 0; px <= W + 8; px += 4) x.lineTo(px, r0 - H*(.03 + .04*hash(Math.floor(px/7), 1104)) - H*.02*Math.sin(px/W*9)); x.lineTo(W, r0 + 2); x.fill(); // the far trees
    x.fillStyle = P.crown; for (let i = 0; i < 40; i++) { const px = hash(i, 1105)*W, py = r0 - H*(.04 + hash(i, 1106)*.05); ell(x, px, py, W*.02 + hash(i, 1107)*W*.03, H*.02, P.crown); }
    x.fillStyle = vgrad(x, r0, r1, P.river); x.fillRect(0, r0, W, r1 - r0); // the river
    for (let i = 0; i < 30; i++) { const yy = lerp(r0, r1, Math.pow(hash(i, 1108), 1.4)), px = hash(i, 1109)*W, w = W*(.04 + hash(i, 1110)*.1)*(1 + (yy - r0)/(r1 - r0)); x.fillStyle = `rgba(${P.glint},${(.08 + hash(i, 1111)*.12).toFixed(2)})`; x.fillRect(px, yy, w, 1); } // light on the water
    if (!clean) for (let b = 0; b < 4; b++) { const yy = lerp(r0 + H*.03, r1 - H*.04, b/3), th = 2 + b*2.4; x.fillStyle = m === 'night' ? 'rgba(2,2,6,.55)' : 'rgba(30,14,12,.5)'; x.beginPath(); x.moveTo(-4, yy); for (let px = 0; px <= W + 8; px += 8) x.lineTo(px, yy + Math.sin(px/W*11 + b*2)*th*.4 + (hash(Math.floor(px/8), b + 1112) - .5)*th*.5); x.lineTo(W + 4, yy + th); x.lineTo(-4, yy + th); x.fill();
      x.fillStyle = `rgba(${P.glint},.14)`; x.fillRect(0, yy - 1, W, 1); for (let i = 0; i < 6 + b*3; i++) { const px = hash(i, b + 1113)*W; x.fillStyle = 'rgba(200,190,170,.18)'; x.fillRect(px, yy - .5, 1 + b*.4, 1); } } // the bone-banks: dark bars humping the water the width of the ford; a fleck or two of pale in them, no more
    x.fillStyle = vgrad(x, r1, H, P.bank); x.beginPath(); x.moveTo(0, r1 + 4); for (let px = 0; px <= W + 8; px += 6) x.lineTo(px, r1 + 2 + Math.sin(px/W*6)*H*.01); x.lineTo(W, H); x.lineTo(0, H); x.fill(); // the near bank
    for (let i = 0; i < 60; i++) { const px = hash(i, 1114)*W, py = r1 + H*.02 + hash(i, 1115)*H*.06, l = 4 + hash(i, 1116)*10; x.strokeStyle = P.fig; x.lineWidth = .8; x.beginPath(); x.moveTo(px, py); x.lineTo(px + (hash(i, 1117) - .5)*4, py - l); x.stroke(); } // reeds
    // the poles along the near shore, leaning; a dark shape on each; braids hanging
    for (let i = 0; i < 11; i++) { const px = W*(.04 + i*.09 + (hash(i, 1118) - .5)*.04), by = r1 + H*(.04 + hash(i, 1119)*.08), ht = H*(.16 + hash(i, 1120)*.1), lean = (hash(i, 1121) - .5)*.2;
      x.strokeStyle = P.fig; x.lineWidth = 2.2; x.beginPath(); x.moveTo(px, by); x.lineTo(px + lean*ht, by - ht); x.stroke(); x.fillStyle = P.fig; x.beginPath(); x.ellipse(px + lean*ht, by - ht + 3, 4 + hash(i, 1122)*4, 3 + hash(i, 1123)*2, lean*2, 0, 7); x.fill();
      x.lineWidth = .8; for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(px + lean*ht - 2 + k*2, by - ht + 6); x.lineTo(px + lean*ht - 3 + k*2.4, by - ht + 14 + hash(i, k + 1124)*8); x.stroke(); } }
  }), 0, 0, W, H);
  // the water moving over the ford; a bird or two wheeling
  for (let i = 0; i < 24; i++) { const k = ((t*mo/9000 + hash(i, 1131)) % 1), yy = lerp(r0 + H*.02, r1 - H*.02, hash(i, 1132)), px = (hash(i, 1133)*W + k*W*.3) % W; ctx.fillStyle = `rgba(${P.glint},${(.16*Math.sin(k*Math.PI)).toFixed(3)})`; ctx.fillRect(px, yy, 6 + hash(i, 1134)*14, 1); }
  if (!night) b2Wheel(ctx, t*mo, W*.6, hz*.9, W*.18, hz*.3, 4, .9, 'rgba(20,12,12,.7)', 77);
  if (clean) for (let i = 0; i < 40; i++) { const u = ((hash(i, 1141) + t*mo/120000) % 1), px = lerp(W*.1, W*.94, u), py = lerp(r1 - H*.01, r0 + H*.02, u); b2Fleck(ctx, px, py, .5 + (1 - u)*.6, 'rgba(30,22,16,.85)', false); } // the army crossing, small, toward the far trees
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.1 + i*Math.min(28, W*.36/sq.length), H*.97 - (i % 2)*3, 2, t, {phase:i, dir:1}));
  if (night) { ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 5; i++) { const k = mo ? (Math.sin(t/(4000 + i*900) + i*2) + 1)/2 : hash(i, 1151), lx = W*(.55 + hash(i, 1152)*.4 + (k - .5)*.04), ly = lerp(r0 + H*.04, r1 - H*.06, hash(i, 1153)); glow(ctx, lx, ly, 10, '#ffb060', .3); ctx.fillStyle = 'rgba(255,220,150,.9)'; ctx.fillRect(lx - .6, ly - .6, 1.2, 1.4); } ctx.globalCompositeOperation = 'source-over'; } // lanterns out on the bone-banks, where nobody of the 9th is
  vign(ctx, W, H, night ? .7 : .45, .5); }
SCENEX.b4_c3_ford = (cv, t) => b43FordScene(cv, t, 'dusk');
SCENEX.b4_c3_fordnight = (cv, t) => b43FordScene(cv, t, 'night');
SCENEX.b4_c3_crossing = (cv, t) => b43FordScene(cv, t, 'cross');

/* the butte north of the Vathar in the morning: the land falling away to the coast, a white city round a harbour far below with ships
   crowded in it, and away on the horizon a wall of brass-coloured dust standing up off the desert, so far it does not seem to move */
SCENEX.b4_c3_butte = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.36, cx = W*.36, cy = H*.56;
  ctx.drawImage(sceneLayer('b43:butte', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#8aa0b4'],[.6,'#cfd2c8'],[1,'#e8dcc0']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.2, H*.1, W*.5, '#fff8e8', .4);
    // the Whirlwind: a wall of dust on the north horizon, brass-coloured, standing up into the sky and fading into it; no edge to it anywhere
    for (let i = 0; i < 90; i++) { const u = hash(i, 1201), px = W*(.36 + u*.7), top = hz - H*(.06 + .26*Math.pow(Math.sin(Math.min(1, (px - W*.36)/(W*.5))*Math.PI*.5), .8)), py = lerp(hz, top, Math.pow(hash(i, 1202), .7)), r = W*(.03 + hash(i, 1203)*.06)*(1 + (hz - py)/(H*.3));
      glow(x, px, py, r, hash(i, 1204) > .5 ? '#c8a060' : '#b08850', .16 + (py - top)/(hz - top + 1)*.18); }
    { const g = x.createLinearGradient(0, hz - H*.2, 0, hz); g.addColorStop(0, 'rgba(190,150,90,0)'); g.addColorStop(1, 'rgba(176,136,80,.55)'); x.fillStyle = g; x.fillRect(W*.4, hz - H*.2, W*.6, H*.2); } // its foot, thickest at the ground
    x.strokeStyle = 'rgba(150,110,60,.18)'; x.lineWidth = 2; for (let i = 0; i < 14; i++) { const px = W*(.5 + hash(i, 1205)*.5); x.beginPath(); x.moveTo(px, hz); x.quadraticCurveTo(px - 6, hz - H*.1, px + 4, hz - H*(.16 + hash(i, 1206)*.1)); x.stroke(); } // streaks where the wind lifts it
    x.fillStyle = 'rgba(150,140,120,.5)'; x.beginPath(); x.moveTo(W*.3, hz); for (let px = W*.3; px <= W + 6; px += 6) x.lineTo(px, hz - 2 - Math.max(0, Math.sin(px/31))*4); x.lineTo(W, hz + 1); x.lineTo(W*.3, hz + 1); x.fill(); // low land in front of it, far
    x.fillStyle = '#9aa0a0'; x.fillRect(0, hz, W, H*.03); // the sea's edge, far
    x.fillStyle = vgrad(x, hz + H*.02, cy + H*.06, [[0,'#7a9aa4'],[1,'#5a7a84']]); x.beginPath(); x.moveTo(0, hz + H*.02); x.lineTo(W, hz + H*.02); x.lineTo(W, cy - H*.02); x.quadraticCurveTo(W*.7, cy - H*.06, cx + W*.1, cy - H*.01); x.quadraticCurveTo(cx, cy + H*.02, 0, cy + H*.04); x.fill(); // the sea, and the bay
    for (let i = 0; i < 30; i++) { x.fillStyle = 'rgba(240,244,240,.25)'; x.fillRect(hash(i, 1204)*W, hz + H*.03 + hash(i, 1205)*(cy - hz - H*.06), 4 + hash(i, 1206)*10, 1); }
    // the coast and the land falling to it
    x.fillStyle = vgrad(x, cy - H*.04, H, [[0,'#b0a080'],[.4,'#8a7656'],[1,'#4a3a26']]); x.beginPath(); x.moveTo(0, cy + H*.04); x.quadraticCurveTo(cx, cy + H*.02, cx + W*.1, cy - H*.01); x.quadraticCurveTo(W*.7, cy - H*.06, W, cy - H*.02); x.lineTo(W, H); x.lineTo(0, H); x.fill();
    // Ubaryd: white walls, roofs and domes round the harbour, small
    x.fillStyle = 'rgba(236,228,210,.9)'; for (let i = 0; i < 60; i++) { const px = cx - W*.12 + hash(i, 1207)*W*.26, py = cy - H*.005 + hash(i, 1208)*H*.05, w = 2 + hash(i, 1209)*4, hh = 1.5 + hash(i, 1210)*3; x.fillRect(px, py - hh, w, hh); if (hash(i, 1211) > .85) { x.beginPath(); x.ellipse(px + w/2, py - hh, w*.4, w*.45, 0, Math.PI, 0); x.fill(); } }
    x.fillStyle = 'rgba(120,108,90,.6)'; for (let i = 0; i < 60; i++) { const px = cx - W*.12 + hash(i, 1207)*W*.26, py = cy - H*.005 + hash(i, 1208)*H*.05, w = 2 + hash(i, 1209)*4; x.fillRect(px + w*.6, py - .5, w*.4, 1); } // their shadowed sides
    x.strokeStyle = 'rgba(220,210,190,.8)'; x.lineWidth = 1; x.beginPath(); x.moveTo(cx - W*.13, cy + H*.03); x.lineTo(cx - W*.13, cy - H*.01); x.lineTo(cx + W*.15, cy - H*.025); x.stroke(); // the wall's line
    // the ships, crowded in the harbour and out on the water: hulls and masts, the Empire's colours a fleck on each
    for (let i = 0; i < 34; i++) { const inH = i < 20, px = inH ? cx - W*.04 + hash(i, 1212)*W*.14 : cx + W*.08 + hash(i, 1213)*W*.4, py = inH ? cy - H*.02 + hash(i, 1214)*H*.02 : hz + H*.06 + hash(i, 1215)*(cy - hz - H*.1), s = inH ? .8 : .6 + (py - hz)/(cy - hz)*.4;
      x.fillStyle = '#2a2620'; x.fillRect(px - 3*s, py - 1.2*s, 6*s, 1.4*s); x.fillRect(px - .25*s, py - 7*s, .5*s, 6*s); x.fillStyle = 'rgba(240,236,224,.7)'; x.fillRect(px - 2*s, py - 6.6*s, 1.8*s, 3*s); x.fillStyle = 'rgba(140,40,30,.8)'; x.fillRect(px - .2*s, py - 7.6*s, 1.6*s, .8*s); }
    // the butte's top, near: rock and dry grass, its edge, and the land dropping away below
    x.fillStyle = vgrad(x, H*.78, H, [[0,'#8a7454'],[1,'#3a2c1c']]); x.beginPath(); x.moveTo(0, H*.8); for (let px = 0; px <= W + 8; px += 6) x.lineTo(px, H*.8 + Math.sin(px/W*5)*H*.012 + (hash(Math.floor(px/6), 1216) - .5)*H*.008); x.lineTo(W, H); x.lineTo(0, H); x.fill();
    x.fillStyle = 'rgba(255,240,210,.25)'; x.fillRect(0, H*.8 - 1, W, 1.5);
    for (let i = 0; i < 60; i++) { const px = hash(i, 1217)*W, py = H*.82 + hash(i, 1218)*H*.16; x.strokeStyle = 'rgba(200,180,120,.6)'; x.lineWidth = .8; for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(px + k*2, py); x.lineTo(px + k*2 + (k - 1)*1.4, py - 4 - hash(i, k)*4); x.stroke(); } }
  }), 0, 0, W, H);
  // the Whirlwind breathing, very slowly; gulls over the harbour
  for (let i = 0; i < 8; i++) { const k = mo ? (Math.sin(t/(9000 + i*1300) + i) + 1)/2 : .5; ell(ctx, W*(.56 + i*.06), hz - H*(.08 + k*.1), W*.06, H*.05, `rgba(200,160,96,${(.06 + .05*k).toFixed(3)})`); }
  b2Wheel(ctx, t*mo, cx + W*.04, cy - H*.08, W*.08, H*.04, 5, .5, 'rgba(250,250,245,.7)', 91);
  // the army along the butte's edge, small, looking north; the squad nearest
  for (let i = 0; i < 70; i++) { const px = hash(i, 1221)*W, py = H*.8 + hash(i, 1222)*H*.02, s = .6 + hash(i, 1223)*.3; ctx.fillStyle = 'rgba(30,22,16,.85)'; ctx.fillRect(px - s, py - 5*s, 2*s, 5*s); ell(ctx, px, py - 5.8*s, s*.9, s*.9, 'rgba(30,22,16,.85)'); }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.12 + i*Math.min(28, W*.36/sq.length), H*.97 - (i % 2)*3, 2, t, {phase:i, dir:1}));
  vign(ctx, W, H, .35, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Four's sand-and-iron ground (the same frame as 71b) ---------------- */
function b43Item(key, label, body){ const w = 240, h = 130, id = 'c43-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#5a4a34"></stop><stop offset=".7" stop-color="#2a2218"></stop><stop offset="1" stop-color="#121214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a Khundryl knife: a long curved blade, a horn grip wound in horsehair, a black bead on a thong at the pommel */
b43Item('b4_c3_khundrylknife', 'A Khundryl knife', '<ellipse cx="120" cy="70" rx="80" ry="34" fill="#e8d8b0" opacity=".06"/><g transform="rotate(-10 120 66)">'
  + '<path d="M96 62 Q150 50 206 40 Q196 58 160 68 Q128 74 96 72 Z" fill="#c8c4ba"/><path d="M98 63 Q150 52 200 42" stroke="#f4f2ea" stroke-width="2" fill="none" opacity=".8"/><path d="M98 71 Q130 72 160 66" stroke="#7a766e" stroke-width="1.4" fill="none"/>'
  + '<rect x="88" y="58" width="10" height="18" rx="2" fill="#a8803a"/><rect x="88" y="58" width="3" height="18" fill="#e0c070" opacity=".6"/>'
  + '<path d="M40 64 Q64 60 88 62 L88 72 Q64 74 40 72 Q34 68 40 64 Z" fill="#3a2e24"/><path d="M42 65 Q64 62 86 63" stroke="#7a6a58" stroke-width="1.4" fill="none" opacity=".8"/>'
  + '<path d="M48 63 l0 10 M56 62 l0 11 M64 62 l0 11 M72 62 l0 11 M80 62 l0 11" stroke="#1a1410" stroke-width="2.2"/><path d="M48 63 l0 10 M64 62 l0 11 M80 62 l0 11" stroke="#5a4a3a" stroke-width=".8"/>'
  + '<path d="M38 68 Q24 76 22 92" stroke="#4a3420" stroke-width="1.6" fill="none"/><circle cx="22" cy="96" r="5.4" fill="#0e0a0a"/><circle cx="20.4" cy="94.2" r="1.6" fill="#8a8480" opacity=".7"/></g>');
/* a bead from the ford: small, of bone, drilled, worn smooth by the river, on a scrap of faded blue thread */
b43Item('b4_c3_bonebead', 'A bead from the ford', '<ellipse cx="120" cy="70" rx="56" ry="34" fill="#c0c8d0" opacity=".06"/><path d="M60 40 Q90 70 110 68 M180 40 Q150 70 130 68" stroke="#3a5a7a" stroke-width="1.6" fill="none" opacity=".75"/><path d="M60 40 Q90 70 110 68" stroke="#7a9ab8" stroke-width=".6" fill="none" opacity=".6"/>'
  + '<ellipse cx="120" cy="72" rx="15" ry="13" fill="#e4dcc6"/><ellipse cx="116" cy="67" rx="7" ry="4.6" fill="#fffaf0" opacity=".7"/><ellipse cx="124" cy="78" rx="9" ry="4" fill="#a89c82" opacity=".5"/><ellipse cx="120" cy="72" rx="4" ry="3.6" fill="#2a2418"/>'
  + '<path d="M108 76 Q112 82 118 83" stroke="#c8bca2" stroke-width="1" fill="none"/><path d="M104 96 Q120 92 136 96" stroke="#6a7a84" stroke-width="1" fill="none" opacity=".35"/><path d="M98 102 Q120 98 142 102" stroke="#6a7a84" stroke-width="1" fill="none" opacity=".2"/>');
/* a Khundryl horn cup: a drinking horn cut short, copper-capped at the rim, a little dented, a leather thong */
b43Item('b4_c3_cup', 'A Khundryl horn cup', '<ellipse cx="120" cy="72" rx="64" ry="32" fill="#e8c890" opacity=".06"/><g transform="rotate(-14 120 70)">'
  + '<path d="M80 52 Q118 50 150 58 Q176 66 186 86 Q160 80 140 82 Q110 86 82 82 Z" fill="#3a2a1c"/><path d="M82 56 Q120 54 150 62 Q172 70 182 82" stroke="#8a6a46" stroke-width="2" fill="none" opacity=".8"/><path d="M84 80 Q112 82 140 79" stroke="#1a120a" stroke-width="1.4" fill="none"/>'
  + '<path d="M100 60 Q104 70 100 80 M120 60 Q124 70 120 82 M140 64 Q144 72 140 80" stroke="#5a4430" stroke-width="1" fill="none" opacity=".6"/>'
  + '<ellipse cx="80" cy="67" rx="8" ry="15.5" fill="#a8703a"/><ellipse cx="80" cy="67" rx="5" ry="12" fill="#1a120a"/><path d="M75 54 Q72 67 75 80" stroke="#e0a868" stroke-width="1.6" fill="none" opacity=".8"/><path d="M86 58 l-2 4" stroke="#6a4420" stroke-width="1.4"/>'
  + '<path d="M150 60 Q160 40 176 38" stroke="#5a4026" stroke-width="1.6" fill="none"/></g>');
/* a length of the old ferry rope: thick black hemp, set hard, a fresh-cut end gone pale, knotted once */
b43Item('b4_c3_ferryrope', 'A length of the old ferry rope', '<ellipse cx="120" cy="72" rx="80" ry="34" fill="#c8b080" opacity=".06"/>'
  + '<g fill="none" stroke-linecap="round"><ellipse cx="112" cy="68" rx="46" ry="22" stroke="#16120e" stroke-width="12"/><ellipse cx="124" cy="64" rx="40" ry="18" stroke="#1c1712" stroke-width="12"/>'
  + '<ellipse cx="112" cy="68" rx="46" ry="22" stroke="#4a3e30" stroke-width="10" stroke-dasharray="1.6 3.4" transform="rotate(0)"/><ellipse cx="124" cy="64" rx="40" ry="18" stroke="#52463a" stroke-width="10" stroke-dasharray="1.6 3.4"/>'
  + '<path d="M80 52 Q100 44 124 46" stroke="#7a6a54" stroke-width="2" opacity=".5"/><path d="M150 82 Q176 90 204 84" stroke="#16120e" stroke-width="12"/><path d="M150 82 Q176 90 204 84" stroke="#4a3e30" stroke-width="10" stroke-dasharray="1.6 3.4"/>'
  + '<path d="M64 78 Q48 92 34 90" stroke="#16120e" stroke-width="12"/><path d="M64 78 Q48 92 34 90" stroke="#4a3e30" stroke-width="10" stroke-dasharray="1.6 3.4"/></g>'
  + '<ellipse cx="206" cy="84" rx="6.6" ry="6" fill="#c8b48a"/><ellipse cx="206" cy="84" rx="4" ry="3.6" fill="#a8946a"/><path d="M202 81 l8 6 M204 78 l5 10" stroke="#e8d8b0" stroke-width=".8" opacity=".7"/>'
  + '<path d="M34 90 l-6 -3 M34 90 l-7 2 M35 91 l-4 6" stroke="#2a221a" stroke-width="1.6"/>');
