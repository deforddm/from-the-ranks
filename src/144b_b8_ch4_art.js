/* ============ Book Eight, Chapter 4 art: The Pilgrims' Camp — the camp round the barrow outside Black Coral, under the kept night ============ */
/* Book Eight's look (140b) carried east: night slate-blue gone nearly black (Black Coral's dark is held over it, so no stars and no moon),
   the Andii city's lamps strung gold along its walls far off, the camp's small fires and lamps in tins, and through the rows a faint sweet
   haze, a dusty rose against the blue (kelyk: never pretty, a stain in the air). Everything at the camp is drawn at a distance: the barrow is
   a long dark heap with its lamps, the dancers in the rows are far-off shapes, the sick in Mossa's tent are blanket-humps along the wall.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     b8_c4_mossa    the Redeemer priestess at the edge: Domin coast, grey in a long braid, a plain undyed robe muddied to the knee, a bit of
                    coral on a cord, a clean cup in her cracked hands
     b8_c4_hurrin   the pilgrim from the north: thin, stooped with a cough, a patched brown coat, the bundle in sacking held to his chest
     b8_c4_carrier  a water-carrier: a yoke across the shoulders with two buckets, an ash-rag tied over the mouth and nose
   Ground (TILEX.b8_c4_camp): Book Three's camp at night (b3Camp) under the camp's own pieces: 's' a shack of wagon-boards and rag, 'T' Mossa's
   tent with its lamp in a tin, 'w' the water barrels on a handcart, 'r' the rope on stakes across the barrow end, 'x' a lean-to of stoppered
   jugs under oiled cloth, 'c' a handcart, 't' barrels and bundles (low cover); '<' '>' '^' 'v' the edge arrows.
   Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b8_camp_night  the far edge (140's): the last row of tents, the Fourth's fire, Mossa's lamp, the water-cart; the barrow far off with
                    its lamps, Black Coral's walls beyond with theirs, and the open dark of the old Domin to the right
     b8_c4_rows     the inner rows: shacks close on both sides, rag-lines across the lane, lamps at the corners, the sweet haze, far-off
                    dancers in a gap, the barrow at the lane's end
     b8_c4_yard     the store-yard: a stake fence, a lamp on the gate, lean-tos of jugs under oiled cloth (on 'burn', after: a black line
                    and smoke going up)
     b8_c4_tent     inside Mossa's tent: canvas walls, a lamp in a tin on the pole, cups by the door, the sick asleep along the wall
   The chapter's gear in the series' 200×150 item style, on Book Eight's ground: night slate-blue (#2a3038 → #0a0c10), gas-blue rim light. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Mossa: a woman of the Domin coast, middle years; a plain undyed robe, mud to the knee; grey in a long dark braid over one shoulder; a bit
     of coral on a cord at her throat; a washed cup held in both hands */
  b8_c4_mossa(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.02);
    B2F.robe(ctx, h, '#a89a80', '#4a4234', 6.2, 7.8);
    ctx.fillStyle = 'rgba(40,30,20,.6)'; ctx.fillRect(-7.6, 7.6, 15.2, 4.6); ctx.fillStyle = 'rgba(60,44,28,.5)'; for (let i = 0; i < 6; i++) ctx.fillRect(-7 + i*2.6, 6.4 + (i % 2), 1.6, 1.4); // the mud to the knee
    ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.fillRect(-.6, -5, 1, 12); ctx.fillStyle = '#6a5a40'; ctx.fillRect(-6.2, 1.8, 12.4, 1.1); // a cord belt
    ctx.fillStyle = '#9a7a5c'; ctx.fillRect(-2.4, -1.4, 4.8, 2.8); ell(ctx, 0, -2.2, 2, 1.6, '#cfc6b4'); ell(ctx, 0, -2.8, 1.6, .5, '#7a7060'); // the hands, the cup
    B2F.line(ctx, '#2a2018', .5, [[-2.2, -6], [0, -4.4], [2.2, -6]]); ell(ctx, 0, -4.2, .8, .9, '#d07a6a'); // the coral on its cord
    h.head('#9a7a5c', 4.4, -11.2); h.look('rgba(26,16,10,.85)', -11.4);
    ctx.fillStyle = '#3a3028'; ctx.beginPath(); ctx.arc(0, -12.4, 4.6, Math.PI*.95, Math.PI*2.05); ctx.fill(); // dark hair, drawn back
    ctx.fillStyle = 'rgba(190,186,176,.55)'; ctx.fillRect(-3, -16.4, 1, 3); ctx.fillRect(1, -16.6, .8, 3.2); // the grey in it
    B2F.line(ctx, '#3a3028', 1.8, [[3.6, -11], [5, -4], [4.4, 2]]); ctx.fillStyle = 'rgba(190,186,176,.5)'; ctx.fillRect(4.2, -6, .8, 2); // the braid over the shoulder
    ctx.restore(); },
  /* Hurrin: thin, stooped with the cough; a patched brown coat too big for him; the bundle in sacking held against his chest */
  b8_c4_hurrin(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, .98); ctx.translate(0, 13); ctx.rotate(.05); ctx.translate(0, -13); // the stoop
    h.legs('#2e2820'); poly(ctx, [[-6,-6],[6,-6],[7,9.4],[-7,9.4]], h.armor('#6a5038', '#2a1e12'));
    ctx.fillStyle = '#7a6a4a'; ctx.fillRect(-5, 1, 3, 2.6); ctx.fillStyle = '#4a3a28'; ctx.fillRect(3, 4, 2.4, 2.2); // patches
    poly(ctx, [[-4.4,-3.6],[4.6,-3.6],[5,3.4],[-4.8,3.4]], '#8a7a5a'); B2F.line(ctx, '#5a4a30', .6, [[-4.6, -.4], [4.8, -.4]]); B2F.line(ctx, '#5a4a30', .6, [[.2, -3.6], [0, 3.4]]); // the bundle, corded
    ctx.fillStyle = '#9a7a5e'; ctx.fillRect(-6, -2, 2, 3); ctx.fillRect(4.4, -2, 2, 3); // the hands round it
    h.head('#a08262', 4.1, -11); h.look('rgba(26,16,10,.85)', -11.2);
    ctx.fillStyle = '#5a5048'; ctx.beginPath(); ctx.arc(0, -12.2, 4.3, Math.PI*.9, Math.PI*2.1); ctx.fill(); ctx.fillStyle = 'rgba(30,24,20,.5)'; ctx.fillRect(-3, -8.6, 6, 1.6); // thin hair, a few days' stubble
    ctx.restore(); },
  /* a water-carrier: a yoke across the shoulders, a bucket hanging from each end on rope, an ash-rag tied over the mouth and nose */
  b8_c4_carrier(ctx, h, t, o){ const sw = o && o.still ? 0 : Math.sin(t/400 + ((o && o.phase) || 0))*.6; ctx.save(); B2F.grow(ctx, .96, 1);
    h.legs('#2a2620'); h.torso('#7a7260', '#2e2a20', 6.2); ctx.fillStyle = '#5a4a34'; ctx.fillRect(-6.2, 2.6, 12.4, 1);
    B2F.line(ctx, '#6a5234', 1.8, [[-13, -6.4], [13, -6.4]]); // the yoke
    [[-12, 1], [12, -1]].forEach(([bx, d]) => { B2F.line(ctx, '#8a7a5a', .5, [[bx, -6.4], [bx + sw*d, 1.6]]); poly(ctx, [[bx - 2.6 + sw*d, 1.6], [bx + 2.6 + sw*d, 1.6], [bx + 2.2 + sw*d, 6.4], [bx - 2.2 + sw*d, 6.4]], '#5a4630'); ctx.fillStyle = 'rgba(140,170,200,.4)'; ctx.fillRect(bx - 2.2 + sw*d, 1.8, 4.4, .8); }); // the buckets, water in them
    h.head('#a07a5a', 4.2, -11.2); h.look('rgba(26,16,10,.85)', -11.6);
    poly(ctx, [[-4.2,-10],[4.2,-10],[3.6,-7],[-3.6,-7]], '#8a8a80'); ctx.fillStyle = 'rgba(40,40,40,.35)'; ctx.fillRect(-3.6, -8.6, 7.2, .6); // the ash-rag over mouth and nose
    ctx.fillStyle = '#2a2018'; ctx.beginPath(); ctx.arc(0, -12.6, 4.4, Math.PI, Math.PI*2); ctx.fill();
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* Black Coral's sky: held dark, no stars and no moon, a faint grey-blue low on the horizon where the dark thins */
function b84Sky(x, W, hz){ x.fillStyle = vgrad(x, 0, hz, [[0,'#020306'],[.7,'#06080e'],[1,'#121620']]); x.fillRect(0, 0, W, hz + 2); }
/* the Andii city far off: walls and tall shapes, black, with lamps strung gold along the walls (no faces, no figures) */
function b84City(x, x0, x1, base, H, seed){ x.fillStyle = '#030406'; x.beginPath(); x.moveTo(x0, base);
  for (let i = 0; i <= 14; i++) { const u = i/14, px = x0 + u*(x1 - x0), ht = H*(.04 + hash(i, seed)*.05); x.lineTo(px, base - ht); x.lineTo(px + (x1 - x0)/28, base - ht); }
  x.lineTo(x1, base); x.closePath(); x.fill();
  for (let i = 0; i < 4; i++) { const tx = x0 + (x1 - x0)*(.1 + hash(i, seed + 2)*.8), th = H*(.12 + hash(i, seed + 3)*.08); x.fillRect(tx, base - th, (x1 - x0)*.012 + 1, th); } // tall shapes
  for (let i = 0; i < 34; i++) { const lx = x0 + hash(i, seed + 4)*(x1 - x0), ly = base - H*(.012 + hash(i, seed + 5)*.03); x.fillStyle = `rgba(232,190,110,${(.4 + hash(i, seed + 6)*.5).toFixed(2)})`; x.fillRect(lx, ly, 1.2, 1.2); }
  glow(x, (x0 + x1)/2, base, (x1 - x0)*.6, '#c8902a', .06); }
/* the barrow far off: a long low heap, the gifts on it a rough ragged crest, a few lamps at its foot */
function b84Barrow(x, cx, base, w, h, seed){ x.fillStyle = '#07080a'; x.beginPath(); x.moveTo(cx - w/2, base); x.quadraticCurveTo(cx - w*.3, base - h, cx, base - h*1.04); x.quadraticCurveTo(cx + w*.3, base - h, cx + w/2, base); x.closePath(); x.fill();
  for (let i = 0; i < 26; i++) { const u = hash(i, seed), px = cx - w*.4 + u*w*.8, py = base - h*(1 - Math.pow((u - .5)*2, 2)*.8) - 1; x.fillStyle = `rgba(${60 + Math.round(hash(i, seed + 1)*40)},${50 + Math.round(hash(i, seed + 2)*30)},${40 + Math.round(hash(i, seed + 3)*20)},.8)`; x.fillRect(px, py - hash(i, seed + 4)*3, 1.4 + hash(i, seed + 5)*2.4, 1.6); } // the gifts
  for (let i = 0; i < 6; i++) { const lx = cx - w*.45 + hash(i, seed + 6)*w*.9; x.fillStyle = 'rgba(240,200,120,.85)'; x.fillRect(lx, base - 2, 1.3, 1.3); glow(x, lx, base - 2, 6, '#e0a040', .25); } }
/* a far tent or shack in silhouette on the line of the camp */
function b84Far(x, px, base, s, kind){ if (kind) { x.fillStyle = '#0b0b0e'; x.fillRect(px - 5*s, base - 7*s, 10*s, 7*s); poly(x, [[px - 6*s, base - 7*s], [px + 6*s, base - 8.6*s], [px + 6*s, base - 7*s]], '#0e0d10'); }
  else poly(x, [[px - 6*s, base], [px, base - 9*s], [px + 6*s, base]], '#0d0d10'); }
/* the sweet haze: a faint dusty-rose stain lying over the rows, drifting a little */
function b84Haze(ctx, W, y, h, t, mo, a = .1){ for (let i = 0; i < 4; i++) { const dx = mo ? Math.sin(t/(6400 + i*800) + i*1.3)*W*.05 : 0;
  ctx.fillStyle = `rgba(150,96,110,${(a - i*.018).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.15 + i*.24) + dx, y + (i % 2)*h*.3, W*.3, h*.5, 0, 0, 7); ctx.fill(); } }
/* a lamp in a tin: a little gold light, breathing */
function b84Tin(ctx, lx, ly, s, t, mo, i = 0){ const fl = mo ? .84 + .1*Math.sin(t/230 + i*1.9) + .06*Math.sin(t/61 + i) : 1;
  ctx.fillStyle = '#1a1814'; ctx.fillRect(lx - 2*s, ly - 3*s, 4*s, 5*s); ctx.fillStyle = `rgba(255,200,110,${(.9*fl).toFixed(2)})`; ctx.fillRect(lx - 1.2*s, ly - 2*s, 2.4*s, 3*s);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, 26*s, '#e8a040', .2*fl); ctx.globalCompositeOperation = 'source-over'; }
/* a small fire on the ground */
function b84Fire(ctx, cx, cy, s, t){ const fl = b2Fl(t); ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, 60*s, '#ff8a3a', .22*fl); ctx.globalCompositeOperation = 'source-over';
  ell(ctx, cx, cy + 2*s, 9*s, 2.4*s, '#120a06'); poly(ctx, [[cx - 7*s, cy], [cx - 3*s, cy - 11*s*fl], [cx, cy - 5*s], [cx + 3*s, cy - 9*s*fl], [cx + 7*s, cy]], 'rgba(255,140,50,.95)'); poly(ctx, [[cx - 3*s, cy], [cx, cy - 6*s*fl], [cx + 3*s, cy]], 'rgba(255,220,140,.95)'); }
/* stoppered jugs in a row under a lean-to (x: the ground line, the lean-to's left, its width; n rows) */
function b84Jugs(x, x0, base, w, s, seed, rows = 2){ poly(x, [[x0 - 4*s, base - 22*s], [x0 + w + 4*s, base - 26*s], [x0 + w + 4*s, base - 20*s], [x0 - 4*s, base - 16*s]], '#2a2c2a'); // the oiled cloth
  x.fillStyle = 'rgba(160,170,160,.12)'; x.fillRect(x0 - 3*s, base - 22*s, w + 6*s, 1);
  x.fillStyle = '#18120c'; x.fillRect(x0 - 3*s, base - 18*s, 1.4*s, 18*s); x.fillRect(x0 + w + 2*s, base - 22*s, 1.4*s, 22*s); // the posts
  for (let r = 0; r < rows; r++) for (let i = 0; i < Math.floor(w/(5*s)); i++) { const jx = x0 + 2*s + i*5*s, jy = base - 2*s - r*6.4*s; ell(x, jx, jy, 2.2*s, 2.8*s, r ? '#4a2a22' : '#5a3226'); x.fillStyle = '#8a6a4a'; x.fillRect(jx - .8*s, jy - 4*s, 1.6*s, 1.4*s); }
  ell(x, x0 + w/2, base + 1, w*.6, 2*s, 'rgba(60,20,30,.4)'); } // the stain under them

/* ---------------- the ground ---------------- */
TILEX.b8_c4_camp = (ctx, ch, x, y, T, dark) => {
  const own = 'sTwrxct<>^v'.includes(ch); b2Clip(ctx, x, y, T, () => b3Camp(ctx, own ? (ch === 'r' ? ',' : '.') : ch, x, y, T, true));
  const px = x*T, py = y*T, h = hash(x, y, 84);
  if (ch === 's') { // a shack of wagon-boards and rag
    ell(ctx, px + T*.52, py + T*.88, T*.44, T*.08, 'rgba(0,0,0,.45)'); ctx.fillStyle = '#1e1810'; ctx.fillRect(px + T*.12, py + T*.38, T*.76, T*.5);
    ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px + T*(.12 + i*.19), py + T*.38); ctx.lineTo(px + T*(.12 + i*.19), py + T*.88); ctx.stroke(); }
    poly(ctx, [[px + T*.04, py + T*.42], [px + T*.5, py + T*.18], [px + T*.96, py + T*.4], [px + T*.9, py + T*.46], [px + T*.1, py + T*.48]], h > .5 ? '#3a3228' : '#4a3a30'); // the rag roof
    ctx.fillStyle = '#08070a'; ctx.fillRect(px + T*.42, py + T*.6, T*.16, T*.28); // the door gap
    if (h > .72) { ctx.fillStyle = 'rgba(240,190,110,.55)'; ctx.fillRect(px + T*.22, py + T*.52, T*.08, T*.06); } }
  else if (ch === 'T') { // Mossa's tent, with the lamp in its tin
    const cx = px + T*.5, by = py + T*.9; ell(ctx, cx, by, T*.48, T*.1, 'rgba(0,0,0,.45)');
    poly(ctx, [[px + T*.02, by], [cx, py + T*.08], [px + T*.98, by]], '#6a6250'); poly(ctx, [[cx, py + T*.08], [px + T*.98, by], [cx + T*.14, by]], '#3e3a30');
    poly(ctx, [[cx - T*.14, by], [cx, py + T*.4], [cx + T*.12, by]], 'rgba(255,200,120,.35)'); // the flap open, the light inside
    ctx.fillStyle = '#1a140e'; ctx.fillRect(cx - T*.02, py + T*.02, T*.04, T*.1);
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, px + T*.18, py + T*.5, T*.6, '#e8a040', .28); ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#1a1814'; ctx.fillRect(px + T*.14, py + T*.42, T*.08, T*.1); ctx.fillStyle = 'rgba(255,210,120,.95)'; ctx.fillRect(px + T*.16, py + T*.44, T*.04, T*.06); }
  else if (ch === 'w' || ch === 'c') { // a handcart; the water line's carries two barrels
    ell(ctx, px + T*.5, py + T*.86, T*.44, T*.08, 'rgba(0,0,0,.45)'); ctx.fillStyle = '#2a1e14'; ctx.fillRect(px + T*.1, py + T*.56, T*.8, T*.12);
    B2F.line(ctx, '#2a1e14', Math.max(1, T*.04), [[px + T*.88, py + T*.6], [px + T*1.02, py + T*.44]]);
    ell(ctx, px + T*.3, py + T*.76, T*.1, T*.1, '#120c08'); ell(ctx, px + T*.7, py + T*.76, T*.1, T*.1, '#120c08');
    if (ch === 'w') [[.32], [.64]].forEach(([k]) => { ctx.fillStyle = '#3a2a1a'; ctx.fillRect(px + T*(k - .12), py + T*.26, T*.24, T*.32); ctx.fillStyle = '#5a4630'; ctx.fillRect(px + T*(k - .12), py + T*.32, T*.24, T*.03); ctx.fillRect(px + T*(k - .12), py + T*.48, T*.24, T*.03); ell(ctx, px + T*k, py + T*.27, T*.12, T*.04, 'rgba(120,150,180,.45)'); });
    else { ctx.fillStyle = '#3a3428'; ctx.fillRect(px + T*.16, py + T*.4, T*.6, T*.16); } }
  else if (ch === 't') { // barrels and bundles: low cover
    ell(ctx, px + T*.5, py + T*.84, T*.4, T*.08, 'rgba(0,0,0,.4)'); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(px + T*.18, py + T*.42, T*.28, T*.4); ctx.fillStyle = '#5a4630'; ctx.fillRect(px + T*.18, py + T*.5, T*.28, T*.03); ctx.fillRect(px + T*.18, py + T*.7, T*.28, T*.03);
    ell(ctx, px + T*.66, py + T*.7, T*.2, T*.14, '#4a4234'); B2F.line(ctx, '#2a2418', 1, [[px + T*.5, py + T*.66], [px + T*.82, py + T*.74]]); }
  else if (ch === 'r') { // the rope on stakes across the barrow end; lamplight beyond it
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, px + T*.5, py, T*.7, '#e8a040', .12); ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#1a140e'; ctx.fillRect(px + T*.46, py + T*.36, T*.06, T*.5); B2F.line(ctx, '#8a7a5a', Math.max(1, T*.025), [[px, py + T*.44], [px + T*.5, py + T*.5], [px + T, py + T*.44]]); }
  else if (ch === 'x') { // a lean-to of stoppered jugs under oiled cloth
    ell(ctx, px + T*.5, py + T*.9, T*.46, T*.08, 'rgba(60,20,30,.45)'); poly(ctx, [[px + T*.02, py + T*.3], [px + T*.98, py + T*.18], [px + T*.98, py + T*.3], [px + T*.02, py + T*.42]], '#2a2c2a');
    ctx.fillStyle = '#18120c'; ctx.fillRect(px + T*.04, py + T*.36, T*.05, T*.52); ctx.fillRect(px + T*.9, py + T*.26, T*.05, T*.62);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { const jx = px + T*(.2 + i*.19), jy = py + T*(.8 - r*.2); ell(ctx, jx, jy, T*.07, T*.09, r ? '#4a2a22' : '#5a3226'); ctx.fillStyle = '#8a6a4a'; ctx.fillRect(jx - T*.025, jy - T*.13, T*.05, T*.04); } }
  else exitArrow(ctx, ch, px, py, T); };

/* ---------------- the backdrops ---------------- */
/* the far edge (140's caption): the last row of tents and the Fourth's fire in the near ground; Mossa's tent and its lamp, left; the water-
   cart, right; the barrow far off in the middle with its lamps, Black Coral's walls beyond it, and to the right the open dark of the old
   Domin, flat, unlit; the sweet haze lying over the rows */
SCENEX.b8_camp_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5;
  ctx.drawImage(sceneLayer('b84:edge', W, H, (x, W, H) => {
    b84Sky(x, W, hz); b84City(x, W*.02, W*.46, hz - H*.03, H, 8401); b84Barrow(x, W*.4, hz + H*.01, W*.3, H*.07, 8410);
    x.fillStyle = vgrad(x, hz, H, [[0,'#0c0d10'],[1,'#050506']]); x.fillRect(0, hz, W, H - hz); // the ground
    for (let i = 0; i < 22; i++) b84Far(x, W*(.02 + i*.03) + hash(i, 8420)*W*.02, hz + H*(.03 + hash(i, 8421)*.04), H/360*(1 + hash(i, 8422)*.5), hash(i, 8423) > .6); // the far rows
    for (let i = 0; i < 9; i++) { const fx = W*(.05 + hash(i, 8430)*.6), fy = hz + H*(.05 + hash(i, 8431)*.08); glow(x, fx, fy, H*.03, '#ff8a3a', .25); x.fillStyle = 'rgba(255,170,80,.85)'; x.fillRect(fx, fy, 1.5, 1.5); } // small fires among the rows
    x.fillStyle = 'rgba(18,22,30,.5)'; x.fillRect(W*.72, hz - 1, W*.28, 2); // the open dark, east: nothing on it at all
    // the near row: tents, left and centre
    [[.14, .74, 1.3], [.32, .7, 1], [.58, .72, 1.1]].forEach(([u, v, k]) => { const cx = W*u, by = H*v, s = H/150*k; poly(x, [[cx - 22*s, by], [cx, by - 26*s], [cx + 22*s, by]], '#24221c'); poly(x, [[cx, by - 26*s], [cx + 22*s, by], [cx + 5*s, by]], '#16150f'); poly(x, [[cx - 5*s, by], [cx, by - 12*s], [cx + 4*s, by]], '#060606'); });
    // the water-cart, right
    { const cx = W*.82, by = H*.76, s = H/160; x.fillStyle = '#1e160e'; x.fillRect(cx - 18*s, by - 8*s, 36*s, 5*s); [[-9], [7]].forEach(([d]) => { x.fillStyle = '#2a2016'; x.fillRect(cx + d*s - 6*s, by - 22*s, 12*s, 14*s); x.fillStyle = '#3e3022'; x.fillRect(cx + d*s - 6*s, by - 18*s, 12*s, 1.2*s); });
      ell(x, cx - 12*s, by - 1*s, 4*s, 4*s, '#0a0806'); ell(x, cx + 12*s, by - 1*s, 4*s, 4*s, '#0a0806'); }
    x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(0, H*.9, W, H*.1);
  }), 0, 0, W, H);
  b84Haze(ctx, W, H*.52, H*.08, t, mo, .09);
  b84Tin(ctx, W*.2, H*.62, H/300, t, mo, 0); // Mossa's lamp
  b84Fire(ctx, W*.48, H*.86, H/300, t);
  if (S && S.f && (S.f.b8_c4_ph || 1) < 4 && !S.f.b8_c4_waterDone) [[.78, 1], [.86, -1]].forEach(([u, d], i) => drawFigure(ctx, 'b4_c2_pilgrim', W*u, H*.8, 1.3, t, {dir:d, phase:i})); else drawFigure(ctx, 'b8_c4_carrier', W*.8, H*.8, 1.3, t, {dir:-1, phase:1});
  drawFigure(ctx, 'b8_c4_mossa', W*.24, H*.78, 1.35, t, {dir:1, phase:2, still:true});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.34 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .74, .5); };

/* the inner rows: shacks and tents close on both sides, rag-lines across the lane, lamps at the corners (one let go out), the sweet haze, far
   off in a gap three dancers as small dark shapes, and at the lane's end the barrow with its lamps */
SCENEX.b8_c4_rows = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46;
  ctx.drawImage(sceneLayer('b84:rows', W, H, (x, W, H) => {
    b84Sky(x, W, hz); b84Barrow(x, W*.5, hz + H*.02, W*.22, H*.06, 8450);
    x.fillStyle = vgrad(x, hz, H, [[0,'#0e0d0e'],[1,'#060506']]); x.fillRect(0, hz, W, H - hz);
    poly(x, [[W*.42, hz + H*.02], [W*.58, hz + H*.02], [W*.84, H], [W*.16, H]], '#141210'); // the lane, mud
    for (let i = 0; i < 40; i++) { const d = hash(i, 8460), yy = hz + H*.04 + Math.pow(d, .8)*(H - hz), cx = W*.5 + (hash(i, 8461) - .5)*W*(.1 + d*.5); ell(x, cx, yy, 2 + d*6, 1 + d*1.6, 'rgba(40,36,34,.5)'); } // ruts, puddles
    // the shacks both sides, getting nearer
    for (let side = -1; side <= 1; side += 2) for (let i = 0; i < 5; i++) { const k = i/5, w = W*(.05 + k*.1), h = H*(.06 + k*.22), cx = W*.5 + side*W*(.1 + k*.32), by = hz + H*(.04 + k*.44);
      x.fillStyle = shade('#1a1612', -k*.2); x.fillRect(cx - w/2, by - h, w, h); poly(x, [[cx - w*.6, by - h], [cx, by - h*1.3], [cx + w*.6, by - h]], hash(i, 8470 + side) > .5 ? '#2a2420' : '#322a24');
      x.fillStyle = '#060507'; x.fillRect(cx - w*.12, by - h*.6, w*.24, h*.6); }
    // rag-lines across the lane
    for (let i = 0; i < 3; i++) { const y0 = hz + H*(.1 + i*.1), xl = W*(.32 - i*.08), xr = W*(.68 + i*.08); x.strokeStyle = 'rgba(120,110,90,.5)'; x.lineWidth = 1; x.beginPath(); x.moveTo(xl, y0); x.quadraticCurveTo(W*.5, y0 + H*.03, xr, y0); x.stroke();
      for (let j = 0; j < 5; j++) { const u = (j + .5)/5, rx = xl + (xr - xl)*u, ry = y0 + H*.03*4*u*(1 - u); x.fillStyle = ['#4a3e34', '#3a3a40', '#5a4a3a', '#3e342e', '#44403a'][(i + j) % 5]; x.fillRect(rx - 3 - i, ry, 6 + i*2, 6 + i*3); } }
  }), 0, 0, W, H);
  b84Haze(ctx, W, H*.5, H*.14, t, mo, .13);
  b84Tin(ctx, W*.3, H*.56, H/320, t, mo, 0); b84Tin(ctx, W*.72, H*.6, H/300, t, mo, 1);
  // three far-off dancers in a gap, slow, small and dark
  for (let i = 0; i < 3; i++) { const sw = mo ? Math.sin(t/900 + i*2.1)*3 : 0, dx = W*(.56 + i*.025) + sw, dy = H*.52; ctx.fillStyle = '#0a0809'; ctx.fillRect(dx - 1.6, dy - 7, 3.2, 7); ell(ctx, dx, dy - 8.6, 1.6, 1.8, '#0a0809'); B2F.line(ctx, '#0a0809', 1, [[dx - 1.4, dy - 5.6], [dx - 3.4 - sw*.3, dy - 8]]); }
  if (S && S.f && !S.f.b8_c4_hurrinEnd) drawFigure(ctx, 'b8_c4_hurrin', W*.78, H*.82, 1.4, t, {dir:-1, still:true});
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.36 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .72, .5); };

/* the store-yard: a stake fence across the back, the gate and its lamp at the right, lean-tos along the fence with jugs stacked under oiled
   cloth; on the burn road, after the burning, a black line along the fence instead and smoke going up into a sky that does not notice */
SCENEX.b8_c4_yard = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4, fb = H*.66, burned = !!(S && S.f && S.f.b8_c4_burned);
  ctx.drawImage(sceneLayer('b84:yard' + (burned ? 'b' : ''), W, H, (x, W, H) => {
    b84Sky(x, W, hz); b84City(x, W*.6, W*.98, hz + H*.02, H, 8480);
    x.fillStyle = vgrad(x, hz, H, [[0,'#0e0c0c'],[1,'#060505']]); x.fillRect(0, hz, W, H - hz);
    // the stake fence
    for (let i = 0; i < 42; i++) { const sx = W*(i/42) + hash(i, 8490)*2, top = fb - H*(.16 + hash(i, 8491)*.03); x.fillStyle = '#16100a'; x.fillRect(sx, top, W*.016, fb - top); poly(x, [[sx, top], [sx + W*.008, top - H*.02], [sx + W*.016, top]], '#16100a'); }
    x.strokeStyle = '#2a1e12'; x.lineWidth = 1.4; x.beginPath(); x.moveTo(0, fb - H*.06); x.lineTo(W, fb - H*.065); x.moveTo(0, fb - H*.12); x.lineTo(W, fb - H*.125); x.stroke();
    x.fillStyle = '#070505'; x.fillRect(W*.8, fb - H*.18, W*.08, H*.18); // the gate
    if (burned) { x.fillStyle = '#050404'; x.fillRect(W*.02, fb - H*.05, W*.74, H*.06); for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(${90 + Math.round(hash(i, 8495)*60)},40,30,.5)`; x.fillRect(W*(.03 + hash(i, 8496)*.72), fb - H*(.01 + hash(i, 8497)*.04), 2, 1.4); } } // the black line, embers, shards
    else [[.04, .2], [.28, .22], [.54, .2]].forEach(([u, w], i) => b84Jugs(x, W*u, fb + H*.02, W*w, H/170, 8500 + i, 3));
    x.fillStyle = 'rgba(0,0,0,.28)'; x.fillRect(0, H*.9, W, H*.1);
  }), 0, 0, W, H);
  b84Tin(ctx, W*.84, fb - H*.2, H/280, t, mo, 0); // the lamp on the gate
  if (burned) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.4, fb, W*.4, '#c04020', .12*b2Fl(t)); ctx.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 6; i++) { const k = mo ? ((t/9000 + i/6) % 1) : i/6, sx = W*(.1 + i*.12) + (mo ? Math.sin(t/2400 + i)*W*.02 : 0); ctx.fillStyle = `rgba(60,56,58,${(.3*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(sx, fb - H*.06 - k*H*.5, W*.05 + k*W*.06, H*.03 + k*H*.03, 0, 0, 7); ctx.fill(); } } // the smoke
  else { b84Haze(ctx, W, fb - H*.04, H*.1, t, mo, .12); if (S && S.f && !S.f.b8_c4_storesDone) [[.36, 1], [.46, -1]].forEach(([u, d], i) => drawFigure(ctx, 'b6_cultist', W*u, H*.82, 1.35, t, {dir:d, phase:i})); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.56 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .72, .5); };

/* inside Mossa's tent: canvas walls slanting in to the pole, a lamp in a tin hung from it, mats along the walls with the sick asleep under
   blankets (humps only), a row of washed cups by the door, the flap tied back on the dark; Mossa by the cups */
SCENEX.b8_c4_tent = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fy = H*.78;
  ctx.drawImage(sceneLayer('b84:tent', W, H, (x, W, H) => {
    x.fillStyle = '#0a0806'; x.fillRect(0, 0, W, H);
    poly(x, [[0, fy], [W*.5, 0], [W, fy]], '#3a3226'); poly(x, [[0, fy], [W*.5, 0], [W*.18, fy]], '#2a241a'); poly(x, [[W, fy], [W*.5, 0], [W*.82, fy]], '#2e281e'); // the canvas
    x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 1; for (let i = 1; i < 6; i++) { x.beginPath(); x.moveTo(W*.5, 0); x.lineTo(W*(i/6), fy); x.stroke(); } // the seams
    for (let i = 0; i < 30; i++) ell(x, hash(i, 8520)*W, hash(i, 8521)*fy*.9 + fy*.1, 4 + hash(i, 8522)*10, 2 + hash(i, 8523)*4, 'rgba(20,16,10,.2)'); // stains on the canvas
    x.fillStyle = '#1a140c'; x.fillRect(W*.495, 0, W*.012, fy); // the pole
    x.fillStyle = vgrad(x, fy, H, [[0,'#1e1810'],[1,'#0a0806']]); x.fillRect(0, fy, W, H - fy); // the ground
    poly(x, [[W*.08, fy], [W*.2, fy - H*.36], [W*.28, fy]], '#050505'); // the flap tied back on the dark
    // mats along the walls, the sick asleep under blankets
    [[.34, .76], [.62, .76], [.78, .8], [.9, .84]].forEach(([u, v], i) => { const cx = W*u, cy = H*v; x.fillStyle = '#3a2e20'; x.fillRect(cx - W*.07, cy, W*.14, H*.02);
      ell(x, cx, cy - H*.012, W*.06, H*.028, ['#4a4434', '#3e3a30', '#4a4030', '#403a2e'][i]); ell(x, cx - W*.06, cy - H*.016, W*.014, H*.016, '#2a2218'); });
    x.fillStyle = '#6a604c'; for (let i = 0; i < 6; i++) { const cx = W*(.3 + i*.025); x.fillRect(cx, fy + H*.06, W*.014, H*.02); x.fillStyle = '#4a4232'; x.fillRect(cx, fy + H*.06, W*.014, H*.004); x.fillStyle = '#6a604c'; } // the cups
  }), 0, 0, W, H);
  b84Tin(ctx, W*.5, H*.3, H/200, t, mo, 0); ctx.strokeStyle = '#1a140c'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(W*.5, H*.24); ctx.lineTo(W*.5, H*.26); ctx.stroke();
  drawFigure(ctx, 'b8_c4_mossa', W*.4, H*.92, 1.9, t, {dir:1, still:true});
  const sq = marchOrder(sceneSquad()).slice(0, 3); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.6 + i*.08), H*.97 - (i % 2)*2, 1.8, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .7, .5); };

/* ---------------- the chapter's gear (200×150, Book Eight's ground: night slate-blue, gas-blue rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#2a3038"/><stop offset=".62" stop-color="#161a20"/><stop offset="1" stop-color="#0a0c10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* the camp's fire-hook: an iron hook, worn bright on its inside curve, on a long ash pole, laid on the diagonal */
  ART['item/b8_c4_camphook'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="The camp's fire-hook">${bg('b84fh')}
<linearGradient id="b84fh-p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a7e58"/><stop offset=".5" stop-color="#6a5236"/><stop offset="1" stop-color="#3a2a18"/></linearGradient>
<linearGradient id="b84fh-i" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a5c64"/><stop offset="1" stop-color="#1e1f24"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b84fh-bg)"/><ellipse cx="100" cy="116" rx="76" ry="8" fill="url(#b84fh-sh)"/>
<path d="M18 122 L150 44 L156 50 L24 128 Z" fill="url(#b84fh-p)" stroke="#120c06" stroke-width="1.2"/>
<path d="M30 112 L36 118 M70 88 L76 94 M110 64 L116 70" stroke="#2a1c10" stroke-width="2"/>
<path d="M146 46 L160 36 Q178 22 176 40 Q174 54 160 56 L158 50 Q168 48 168 40 Q168 32 160 40 L152 50 Z" fill="url(#b84fh-i)" stroke="#08080a" stroke-width="1.2"/>
<path d="M161 42 Q166 36 168 40" stroke="#b8c4d4" stroke-width="1.4" fill="none" opacity=".8"/>
<path d="M22 124 L152 47" stroke="#8ab8ff" stroke-width=".8" opacity=".3"/><rect x="142" y="44" width="12" height="9" rx="1.5" transform="rotate(-30 148 48)" fill="#2a2a2e" stroke="#08080a"/>
<ellipse cx="100" cy="80" rx="70" ry="34" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c4_camphook'] = [200, 150];
  /* old grey scale: a shirt of grey plates laid flat, every plate filed smooth where a mark was, the sacking it came in under one corner */
  { let plates = ''; for (let r = 0; r < 7; r++) for (let c = 0; c < 8 - (r > 4 ? 1 : 0); c++) { const px = 58 + c*11 + (r % 2)*5.5, py = 34 + r*10;
      plates += `<path d="M${px} ${py} h10 v6 q-5 5 -10 0 Z" fill="${(r + c) % 3 ? '#7a7e84' : '#8a8e94'}" stroke="#2a2c30" stroke-width=".8"/><path d="M${px + 3} ${py + 2.4} h4" stroke="#a8acb2" stroke-width=".8" opacity=".6"/>`; }
    ART['item/b8_c4_greyscale'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="Old grey scale">${bg('b84gs')}</defs>
<rect width="200" height="150" fill="url(#b84gs-bg)"/><ellipse cx="100" cy="122" rx="70" ry="8" fill="url(#b84gs-sh)"/>
<path d="M28 108 L70 98 L64 132 L22 130 Z" fill="#6a5a3e" stroke="#2a2014" stroke-width="1"/><path d="M30 112 L66 104 M28 120 L64 114" stroke="#4a3e2a" stroke-width="1"/>
<path d="M54 30 L38 44 L44 64 L56 58 L56 108 Q100 116 146 108 L146 58 L158 64 L164 44 L148 30 Q100 22 54 30 Z" fill="#3a3c40" stroke="#121316" stroke-width="1.4"/>
${plates}
<path d="M84 30 Q100 40 118 30" stroke="#1a1b1e" stroke-width="3" fill="none"/>
<path d="M54 32 L54 106" stroke="#8ab8ff" stroke-width=".9" opacity=".35"/>
<ellipse cx="100" cy="70" rx="56" ry="40" fill="#6a9ae0" opacity=".05"/></svg>`; }
  ART_SIZE['item/b8_c4_greyscale'] = [200, 150];
  /* a carrier's ash-rag: a strip of undyed cloth, grey with wood-ash and still damp, its two ties trailing, knotted once */
  ART['item/b8_c4_ashrag'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A carrier's ash-rag">${bg('b84ar')}
<linearGradient id="b84ar-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a49e90"/><stop offset=".6" stop-color="#7a766c"/><stop offset="1" stop-color="#4e4a44"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b84ar-bg)"/><ellipse cx="100" cy="112" rx="66" ry="8" fill="url(#b84ar-sh)"/>
<path d="M56 56 Q100 44 144 56 L140 92 Q100 102 60 92 Z" fill="url(#b84ar-c)" stroke="#2a2824" stroke-width="1.2"/>
<path d="M66 64 Q100 56 134 64 M64 76 Q100 68 136 76 M64 86 Q100 80 136 86" stroke="#5a564e" stroke-width="1" fill="none" opacity=".6"/>
<path d="M56 58 Q36 60 30 76 Q26 92 40 104" stroke="#8a8478" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M144 58 Q166 62 170 80 Q174 96 160 106" stroke="#8a8478" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="40" cy="104" r="5" fill="#7a7468" stroke="#2a2824"/>
<g fill="#2e2c2a" opacity=".55"><circle cx="82" cy="70" r="2"/><circle cx="104" cy="66" r="1.6"/><circle cx="120" cy="80" r="2.2"/><circle cx="92" cy="86" r="1.4"/><circle cx="74" cy="82" r="1.8"/></g>
<path d="M58 90 Q100 100 140 90" stroke="#8ab8ff" stroke-width=".8" fill="none" opacity=".35"/>
<ellipse cx="100" cy="74" rx="56" ry="30" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c4_ashrag'] = [200, 150];
}
