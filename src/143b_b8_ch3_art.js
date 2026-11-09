/* ============ Book Eight, Chapter 3 art: Black Coral — the dark city, the harbour, the Great Barrow and its camp ============ */
/* Book Eight's look (140b): night slate-blue, lamp white and gold, the moon's bone white. Black Coral's own: a night with no stars and no
   moon in it, only the lamps, white and steady on iron arms; Coral's black dressed stone patched with the pale porous coral-stone; tall
   shapes on the walls, far off, there and then not (never close, never a face). Outside the landward gate, a grey that never finishes.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     edrem           (replaces 140's simple sprite) the pilgrims' road keeper: old Pannion grey scale with the marks filed bright, the
                     pilgrim's cloak over the left shoulder, the iron-shod mace slung over the right, the coral token at the throat, grey
                     stubble (the bust's kit, 140b)
     b8_c3_thessaly  the Andii-sworn clerk: a dark coat with a silver thread at the cuff, ink on the fingers, a ledger under one arm
     b8_c3_priestess a Redeemer priestess at the barrow's edge: a plain grey shift muddy to the knee, a bowl and a cloth
   Ground: TILEX.b8_c3_mound (the barrow's ground: 'M' the barrow heaped with gifts, 'l' a lamp on a pole, 'p' a pilgrim's mat, 'k' the
   sellers' tent; everything else is Book Three's field at night, b67Field).
   Five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b8_blackcoral  the harbour street under the night: black and pale stone fronts, lamps on iron arms, no sky but dark, a tall shape on
                    the wall far off
     b8_barrow      the Great Barrow heaped with gifts, lamps round it on poles, rows of pilgrims kneeling in the mud, the camp's tents, the
                    city a dark smudge behind
     b8_c3_lodging  the room over the chandler's: a wide stone sill, the shutters open, lamps on their arms outside, the night over them
     b8_c3_harbour  the harbour wall and the black bay, lamps reflected upside down, and far out a broken black shape in the water with the
                    fishing boats' lamps in a ring round it (never named)
     b8_c3_tavern   a low harbour tavern of lamps; in the far corner two small figures at a board, a tall one and one in a grey cloak
   The chapter's gear in the series' 200×150 item style, on Book Eight's ground: night slate-blue (#2a3038 → #0a0c10), gas-blue rim light.
   No bodies anywhere; the kelyk is a stain and a jar, never a face. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Edrem: forty-one, heavy, grey in the stubble; old Pannion grey scale, its marks filed bright; the pilgrim's cloak over the left shoulder;
     the long iron-shod mace slung over the right, its head above the shoulder; a bit of coral on a cord at the throat */
  edrem(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.08, 1.04);
    h.legs('#26262a'); ctx.fillStyle = '#1a1814'; ctx.fillRect(-4.8, 9.6, 3.8, 3.4); ctx.fillRect(1, 9.6, 3.8, 3.4); // boots
    B2F.line(ctx, '#3a2c1c', 1.8, [[4.6, 6], [8.4, -15]]); ell(ctx, 8.8, -16.4, 2.6, 2.8, '#3a3a3e'); ell(ctx, 8.2, -17.2, 1, .9, 'rgba(220,224,230,.5)'); // the mace over the right shoulder
    poly(ctx, [[-6.6,-6.2],[6.6,-6.2],[7.2,8.4],[-7.2,8.4]], h.armor('#7e8288', '#26282c')); // the scale
    ctx.fillStyle = 'rgba(0,0,0,.28)'; for (let y = -4.6; y < 8; y += 2) for (let x = -6 + ((y + 5) % 4 ? 1 : 0); x < 6; x += 2) ctx.fillRect(x, y, 1.4, .6); // rows of scale
    ctx.fillStyle = 'rgba(230,234,240,.5)'; [[-3, -2.6], [2.4, -1.4], [-.4, 2.6]].forEach(([x, y]) => ctx.fillRect(x, y, 1.6, .7)); // where the marks were filed off
    poly(ctx, [[-7.8,-6.4],[-3.4,-6.4],[-5.4,11],[-8.8,11]], '#5e5038'); B2F.line(ctx, 'rgba(20,14,8,.5)', .5, [[-6.4, -5], [-7, 10]]); // the pilgrim's cloak
    ctx.strokeStyle = '#5a5a5e'; ctx.lineWidth = .6; ctx.beginPath(); ctx.arc(-3.6, -5.6, .9, 0, 7); ctx.stroke(); // the iron ring at the collarbone
    B2F.line(ctx, '#3a2a1c', .9, [[5.6, -5.4], [-3, 5]]); // the mace's strap across the chest
    ctx.fillStyle = '#1e1810'; ctx.fillRect(-7, 3.4, 14, 1.2); // the belt
    ctx.fillStyle = '#9a7a5e'; ctx.fillRect(5.6, -.8, 2.2, 3); // a big hand, empty
    B2F.line(ctx, '#2a2018', .4, [[-1.6, -6.4], [0, -4.4], [1.6, -6.4]]); ell(ctx, 0, -4.2, .8, 1, '#d87a6a'); // the coral token
    h.head('#9a7a5e', 4.6, -11.2); h.look('rgba(20,12,10,.85)', -11.4);
    ctx.fillStyle = 'rgba(80,76,72,.75)'; ctx.fillRect(-4.2, -9.4, 8.4, 2.4); // grey stubble
    ctx.fillStyle = '#7a766e'; ctx.beginPath(); ctx.arc(0, -12.8, 4.7, Math.PI*.98, Math.PI*2.02); ctx.fill(); // cropped grey hair
    ctx.restore(); },
  /* Thessaly: forty or so, a clerk; a long dark coat with a silver thread at the cuff, her hair pinned up, a ledger under her arm, ink on
     the fingers */
  b8_c3_thessaly(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.02);
    B2F.robe(ctx, h, '#2a2c36', '#0c0c12', 6, 7.4);
    ctx.fillStyle = 'rgba(200,210,230,.7)'; ctx.fillRect(-7.4, 3.2, 2.4, .6); ctx.fillRect(5, 3.2, 2.4, .6); // the silver thread at the cuffs
    ctx.fillStyle = '#b08a6c'; ctx.fillRect(-7.2, 3.8, 2.2, 2.2); ctx.fillStyle = '#1a1a2a'; ctx.fillRect(-6.8, 5, 1.6, 1); // a hand, the ink
    poly(ctx, [[3.4,-2.6],[8.6,-3.4],[9,3.6],[3.8,4.2]], '#5a3a22'); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(4.2, -2.2, 4.2, .6); // the ledger under her arm
    poly(ctx, [[-3.2,-6.2],[3.2,-6.2],[2.6,-8],[-2.6,-8]], '#20222a'); // the collar
    h.head('#b08a6c', 4.3, -11.4); h.look('rgba(24,14,10,.85)', -11.6);
    ctx.fillStyle = '#3a2a20'; ctx.beginPath(); ctx.arc(0, -12.8, 4.6, Math.PI*.95, Math.PI*2.05); ctx.fill(); ell(ctx, 0, -17, 2.2, 1.8, '#3a2a20'); // hair, pinned up
    ctx.restore(); },
  /* a Redeemer priestess: young, a plain grey shift with the barrow's mud to the knee, bare-armed, a wooden bowl and a cloth */
  b8_c3_priestess(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1);
    B2F.robe(ctx, h, '#8a8a86', '#3a3a38', 6, 7.6);
    ctx.fillStyle = 'rgba(40,30,20,.75)'; ctx.fillRect(-7.4, 6.6, 14.8, 5.6); // mud to the knee
    ctx.fillStyle = '#b0886c'; ctx.fillRect(-8, -3, 2.4, 6); ctx.fillRect(5.6, -3, 2.4, 6); // bare arms
    ell(ctx, 0, 3.6, 4.4, 1.6, '#5a4028'); ell(ctx, 0, 3, 3.6, .9, '#8aa4c0'); // the bowl of water
    ctx.fillStyle = '#d8d0c0'; ctx.fillRect(5.4, 2.6, 1.6, 3.4); // the cloth
    h.head('#b0886c', 4.2, -11.2); h.look('rgba(24,14,10,.85)', -11.4);
    ctx.fillStyle = '#5a4030'; ctx.beginPath(); ctx.arc(0, -12.6, 4.5, Math.PI*.9, Math.PI*2.1); ctx.fill(); ctx.fillRect(-4.6, -12.6, 1.4, 6); // dark hair, tied back
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* the Andii's night: no stars, no moon, a dark that is faintly blue toward the top and deeper than black where it meets the roofs */
function b83Night(x, W, H, hz){ x.fillStyle = vgrad(x, 0, hz, [[0,'#06080e'],[.55,'#04050a'],[1,'#020306']]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 5; i++) { x.fillStyle = `rgba(30,40,70,${(.05 + hash(i, 8301)*.04).toFixed(3)})`; x.beginPath(); x.ellipse(W*hash(i, 8302), hz*(.2 + hash(i, 8303)*.5), W*.4, hz*.12, 0, 0, 7); x.fill(); } } // the dark is not quite even: slow folds in it
/* a Black Coral lamp on an iron arm: dark glass in a cage, burning white and steady, a little halo; no flicker (it uses no oil) */
function b83Lamp(ctx, lx, ly, s, side = 1){ ctx.fillStyle = '#0c0d10'; ctx.fillRect(lx - (side > 0 ? 7*s : 0), ly - 9*s, 7*s, 1.2*s); // the arm
  ctx.fillStyle = '#16181e'; ctx.fillRect(lx - 2.6*s, ly - 8*s, 5.2*s, 7*s); ctx.fillStyle = 'rgba(236,240,250,.95)'; ctx.fillRect(lx - 1.8*s, ly - 7*s, 3.6*s, 5*s);
  ctx.fillStyle = '#0c0d10'; ctx.fillRect(lx - .3*s, ly - 7*s, .6*s, 5*s); ctx.fillRect(lx - 1.8*s, ly - 4.8*s, 3.6*s, .5*s); // the cage
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly - 4.5*s, 30*s, '#a8c0f0', .16); glow(ctx, lx, ly - 4.5*s, 4*s, '#ffffff', .6); ctx.globalCompositeOperation = 'source-over'; }
/* a front of old Coral's black dressed stone, patched with the pale porous coral-stone, lit windows (lamp-white) */
function b83Front(x, x0, x1, base, top, seed){ x.fillStyle = vgrad(x, top, base, [[0,'#16161c'],[1,'#08080a']]); x.fillRect(x0, top, x1 - x0, base - top);
  for (let i = 0; i < 6; i++) { const px = x0 + hash(i, seed)*(x1 - x0)*.8, py = top + hash(i, seed + 1)*(base - top)*.8, w = (x1 - x0)*(.08 + hash(i, seed + 2)*.14), hh = (base - top)*(.06 + hash(i, seed + 3)*.1); x.fillStyle = 'rgba(110,96,96,.35)'; x.fillRect(px, py, w, hh); } // coral-stone patches
  x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = .6; for (let r = 1; r < 8; r++) { x.beginPath(); x.moveTo(x0, top + (base - top)*r/8); x.lineTo(x1, top + (base - top)*r/8); x.stroke(); } // courses
  const n = Math.max(1, Math.round((x1 - x0)/26)); for (let i = 0; i < n; i++) { const wx = x0 + (x1 - x0)*(i + .5)/n - 4, wy = top + (base - top)*.24; x.fillStyle = hash(i, seed + 4) > .35 ? 'rgba(220,228,240,.5)' : '#050506'; x.fillRect(wx, wy, 8, 11); x.fillStyle = '#0a0a0c'; x.fillRect(wx + 3.6, wy, .8, 11); }
  x.fillStyle = '#050506'; x.fillRect(x0 - 2, top - 3, x1 - x0 + 4, 3); }
/* a tall shape on a wall, far off: there, and then not (never close, never a face) */
function b83Tall(ctx, x, y, s, t, mo, i = 0){ const a = mo ? Math.max(0, Math.sin(t/4200 + i*2.1))*.8 : .55; if (a < .02) return;
  ctx.fillStyle = `rgba(4,4,8,${a.toFixed(2)})`; ctx.fillRect(x - 1.2*s, y - 13*s, 2.4*s, 13*s); ctx.beginPath(); ctx.arc(x, y - 14*s, 1.3*s, 0, 7); ctx.fill(); // long and thin
  ctx.fillStyle = `rgba(160,180,220,${(a*.18).toFixed(2)})`; ctx.fillRect(x - 1.2*s, y - 13*s, .5*s, 13*s); } // a little lamplight down one edge
/* pilgrims kneeling, small, in a row: a hump of back, a bowed head */
function b83Kneel(x, cx, cy, s, col){ x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy - 2.4*s, 2.4*s, 2.2*s, 0, Math.PI, 0); x.fill(); x.fillRect(cx - 2.4*s, cy - 2.4*s, 4.8*s, 2.4*s); x.beginPath(); x.arc(cx + 1.8*s, cy - 3.8*s, 1*s, 0, 7); x.fill(); }
/* the barrow, made of gifts: a long mound, dark, with its surface all small shapes catching lamplight (stones, blades, helms, coins) */
function b83Mound(x, bx, by, bw, bh, seed, lit = '230,226,210'){ x.fillStyle = '#16141a'; x.beginPath(); x.moveTo(bx - bw, by); for (let i = 0; i <= 30; i++) { const k = i/30; x.lineTo(bx - bw + k*bw*2, by - bh*Math.pow(Math.sin(k*Math.PI), .7)*(1 + (hash(i, seed) - .5)*.08)); } x.closePath(); x.fill();
  for (let i = 0; i < 420; i++) { const k = hash(i, seed + 1), px = bx - bw*.96 + k*bw*1.92, top = by - bh*Math.pow(Math.sin(k*Math.PI), .7), py = top + 1 + Math.pow(hash(i, seed + 2), 1.4)*(by - top - 2), kind = hash(i, seed + 3), l = .2 + hash(i, seed + 4)*.5;
    if (kind < .35) { x.fillStyle = `rgba(${lit},${(l*.5).toFixed(2)})`; x.beginPath(); x.ellipse(px, py, 1.6, 1, 0, 0, 7); x.fill(); } // stones polished on sleeves
    else if (kind < .55) { x.strokeStyle = `rgba(${lit},${(l*.45).toFixed(2)})`; x.lineWidth = .6; x.beginPath(); x.moveTo(px - 2, py + 1); x.lineTo(px + 2, py - 1); x.stroke(); } // blades
    else if (kind < .7) { x.fillStyle = `rgba(90,86,96,${(.5 + l*.4).toFixed(2)})`; x.beginPath(); x.arc(px, py, 1.3, Math.PI, 0); x.fill(); } // helms
    else if (kind < .82) { x.fillStyle = `rgba(210,180,100,${(l*.6).toFixed(2)})`; x.fillRect(px, py, 1, 1); } // coins
    else { x.fillStyle = `rgba(70,52,40,${(.5 + l*.3).toFixed(2)})`; x.fillRect(px - 1.4, py - .7, 2.8, 1.4); } } } // boots, bundles, a wooden toy

/* ---------------- ground: the barrow's ground ---------------- */
function b83MoundTile(ctx, ch, x, y, T, N){ const px = x*T, py = y*T, h = hash(x, y, 8310);
  b67Field(ctx, ch === 'M' || ch === 'l' || ch === 'p' ? ',' : ch === 'k' ? '=' : ch, x, y, T, N);
  if (ch === 'M') { // the barrow: heaped gifts to the tile's top, a lamplit lip
    ctx.fillStyle = '#16141a'; ctx.fillRect(px, py + T*.08, T, T*.92); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px, py + T*.86, T, T*.14);
    for (let i = 0; i < 26; i++) { const gx = px + hash(x, y, i + 1)*T, gy = py + T*(.12 + hash(x, y, i + 2)*.7), k = hash(x, y, i + 3);
      ctx.fillStyle = k < .4 ? 'rgba(220,216,200,.32)' : k < .6 ? 'rgba(210,180,100,.4)' : k < .8 ? 'rgba(90,86,96,.8)' : 'rgba(90,64,44,.7)'; ctx.fillRect(gx, gy, Math.max(1, T*.05), Math.max(1, T*.035)); }
    ctx.fillStyle = 'rgba(200,210,240,.18)'; ctx.fillRect(px, py + T*.08, T, Math.max(1, T*.03)); }
  else if (ch === 'l') { ctx.fillStyle = '#0e0d10'; ctx.fillRect(px + T*.46, py + T*.2, T*.08, T*.7); ell(ctx, px + T*.52, py + T*.88, T*.2, T*.05, 'rgba(0,0,0,.4)'); // a lamp on a pole
    ctx.fillStyle = 'rgba(236,240,250,.95)'; ctx.fillRect(px + T*.42, py + T*.1, T*.16, T*.14); glow(ctx, px + T*.5, py + T*.17, T*.9, '#b8c8f0', .18); }
  else if (ch === 'p') { ell(ctx, px + T*.5, py + T*.6, T*.34, T*.16, N ? '#3a3020' : '#6a5a3a'); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = Math.max(.6, T*.02); ctx.strokeRect(px + T*.22, py + T*.5, T*.56, T*.2); // a mat
    if (h > .4) { ctx.fillStyle = N ? '#24201c' : '#4a3e30'; ctx.beginPath(); ctx.ellipse(px + T*.5, py + T*.54, T*.16, T*.14, 0, Math.PI, 0); ctx.fill(); ell(ctx, px + T*.64, py + T*.42, T*.06, T*.06, N ? '#24201c' : '#4a3e30'); } } // and someone on it, kneeling
  else if (ch === 'k') { ctx.fillStyle = 'rgba(80,30,40,.55)'; ctx.fillRect(px + T*.14, py + T*.5, T*.72, T*.08); // the wine-coloured awning
    ctx.fillStyle = 'rgba(255,200,120,.9)'; ctx.fillRect(px + T*.46, py + T*.46, T*.08, T*.08); glow(ctx, px + T*.5, py + T*.5, T*.6, '#ffb070', .2); // the lamp hung low
    ell(ctx, px + T*.3, py + T*.9, T*.18, T*.05, 'rgba(70,20,30,.4)'); } } // the stain on the ground
TILEX.b8_c3_mound = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b83MoundTile(ctx, ch, x, y, T, !!dark));

/* ---------------- the backdrops ---------------- */
/* the harbour street under the night (140's caption): Coral's fronts in black and pale stone either side, lamps on iron arms, no sky but
   the dark, the street paved black and holding the lamplight, a tall shape on the wall at the top of the street; the squad small */
SCENEX.b8_blackcoral = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4;
  ctx.drawImage(sceneLayer('b83:city', W, H, (x, W, H) => {
    b83Night(x, W, H, hz); x.fillStyle = '#060608'; x.fillRect(0, hz, W, H - hz);
    // the city wall far off at the top of the street, and the towers behind it, black on black
    x.fillStyle = '#0a0a0e'; x.fillRect(W*.3, hz - H*.06, W*.4, H*.08); for (let i = 0; i < 6; i++) { const cx = W*(.32 + i*.07), th = H*(.05 + hash(i, 8320)*.08); x.fillRect(cx, hz - H*.06 - th, W*.02, th); }
    for (let i = 0; i < 14; i++) { x.fillStyle = 'rgba(230,236,250,.6)'; x.fillRect(W*(.3 + hash(i, 8321)*.4), hz - H*(.02 + hash(i, 8322)*.1), 1, 1); } // lamps high in the city
    x.fillStyle = vgrad(x, hz, H, [[0,'#121218'],[1,'#040406']]); x.fillRect(0, hz, W, H - hz); // the black paving
    for (let i = 0; i < 80; i++) { const d = hash(i, 8323), yy = hz + Math.pow(d, .7)*(H - hz), cx = W*.5 + (hash(i, 8324) - .5)*W*(.2 + d*.9); x.fillStyle = `rgba(${36 + Math.round(d*24)},${36 + Math.round(d*26)},${44 + Math.round(d*34)},.4)`; x.fillRect(cx - (2 + d*5), yy, (2 + d*5)*2, 1 + d*1.4); } // flags
    b83Front(x, -4, W*.3, H*.88, H*.16, 8325); b83Front(x, W*.3, W*.4, H*.6, H*.3, 8326);
    b83Front(x, W*.7, W + 4, H*.88, H*.18, 8327); b83Front(x, W*.6, W*.7, H*.6, H*.32, 8328);
    x.fillStyle = 'rgba(160,180,220,.08)'; x.beginPath(); x.ellipse(W*.5, H*.8, W*.2, H*.03, 0, 0, 7); x.fill(); // lamplight lying on the paving
  }), 0, 0, W, H);
  [[.27, .5, 1], [.73, .52, -1], [.38, .38, 1], [.63, .4, -1]].forEach(([u, v, sd], i) => b83Lamp(ctx, W*u, H*v, H/(i < 2 ? 220 : 400), sd));
  b83Tall(ctx, W*.44, hz - H*.06, H/300, t, mo, 0); b83Tall(ctx, W*.6, hz - H*.06, H/320, t, mo, 1);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.4 + i*Math.min(.06, .3/sq.length)), H*.95 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .74, .5); };

/* the Great Barrow (140's caption): the long mound heaped with gifts to its crown, lamps round it on poles, rows of pilgrims kneeling in
   the mud before it, tents and cookfires either side, and behind it all the dark of the city's night standing over the plain like a wall */
SCENEX.b8_barrow = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, bx = W*.5, by = H*.62, bw = Math.min(W*.36, H*.7), bh = H*.22;
  ctx.drawImage(sceneLayer('b83:barrow', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#020306'],[.45,'#14161c'],[1,'#3a3a40']]); x.fillRect(0, 0, W, hz + 2); // the night above, the grey below it
    x.fillStyle = 'rgba(2,3,6,.9)'; x.beginPath(); x.moveTo(0, 0); x.lineTo(W, 0); x.lineTo(W, H*.12); for (let i = 20; i >= 0; i--) x.lineTo(W*i/20, H*(.14 + Math.sin(i*.9)*.02)); x.closePath(); x.fill(); // the Andii's night, its edge
    x.fillStyle = '#18181c'; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 20; i++) x.lineTo(W*i/20, hz - H*(.015 + hash(i, 8330)*.02)); x.lineTo(W, hz); x.closePath(); x.fill(); // the low line of the plain
    x.fillStyle = vgrad(x, hz, H, [[0,'#2a2826'],[.4,'#1a1816'],[1,'#0a0908']]); x.fillRect(0, hz, W, H - hz); // mud
    b83Mound(x, bx, by, bw, bh, 8331);
    // tents and shacks either side, low
    for (let i = 0; i < 14; i++) { const side = i % 2 ? 1 : -1, cx = bx + side*(bw*1.05 + hash(i, 8332)*W*.3), cy = by + H*(.02 + hash(i, 8333)*.08), s = H*(.03 + hash(i, 8334)*.02);
      poly(x, [[cx - s, cy], [cx, cy - s*1.2], [cx + s, cy]], i % 3 ? '#3a3428' : '#2a2620'); poly(x, [[cx, cy - s*1.2], [cx + s, cy], [cx + s*.2, cy]], 'rgba(0,0,0,.3)'); }
    // the pilgrims kneeling in rows before it
    for (let r = 0; r < 4; r++) { const yy = by + H*(.1 + r*.07), s = H/(170 - r*30), n = 9 + r*3; for (let i = 0; i < n; i++) { if (hash(i, r + 8335) < .12) continue; b83Kneel(x, W*(.12 + (i + (r % 2)*.5)/n*.76), yy + (hash(i, r + 8336) - .5)*2, s, r < 2 ? '#24221e' : '#141210'); } }
  }), 0, 0, W, H);
  // lamps round the barrow on poles
  [[-1.02, .02], [-.6, -.5], [0, -.82], [.6, -.5], [1.02, .02]].forEach(([u, v], i) => { const lx = bx + u*bw, ly = by + v*bh; ctx.fillStyle = '#0c0b0e'; ctx.fillRect(lx - 1, ly - H*.08, 2, H*.08);
    ctx.fillStyle = 'rgba(236,240,250,.95)'; ctx.fillRect(lx - 2.4, ly - H*.09, 4.8, 4); ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly - H*.085, H*.12, '#b8c8f0', .16); ctx.globalCompositeOperation = 'source-over'; });
  // the cookfires in the camp, and their smoke
  [[.12, .7], [.88, .68]].forEach(([u, v], i) => { const fl = b2Fl(t + i*300); ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*u, H*v, H*.08, '#ff8a3a', .2*fl); ctx.globalCompositeOperation = 'source-over';
    poly(ctx, [[W*u - 4, H*v], [W*u, H*v - 8*fl], [W*u + 4, H*v]], 'rgba(255,150,60,.9)');
    if (mo) for (let k = 0; k < 4; k++) { const q = ((t/3000 + k/4 + i*.3) % 1); ctx.fillStyle = `rgba(120,120,130,${(.14*(1 - q)).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(W*u + Math.sin(t/900 + k)*4, H*v - 10 - q*H*.12, 4 + q*10, 2 + q*5, 0, 0, 7); ctx.fill(); } });
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.06, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .66, .5); };

/* the pilgrims' road: the old Domin flat and grey under a light that never finishes, no shadows; the road going east with pilgrims on it,
   small, in twos and threes; dead trees; far east the smudge of the barrow's lamps; and west, behind, the Andii's night standing on the plain
   like a wall, its edge as sharp as a drawn line */
SCENEX.b8_c3_road = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5;
  ctx.drawImage(sceneLayer('b83:road', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#3a3c42'],[.7,'#55565a'],[1,'#626260']]); x.fillRect(0, 0, W, hz + 2); // a grey that never finishes
    x.fillStyle = '#020306'; x.fillRect(0, 0, W*.16, hz + 2); x.fillStyle = vgrad(x, 0, hz, [[0,'rgba(2,3,6,.9)'],[1,'rgba(2,3,6,.6)']]); x.fillRect(W*.16, 0, W*.02, hz); // the night, west, its edge
    for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(230,236,250,.7)'; x.fillRect(W*(.02 + hash(i, 8370)*.12), hz - H*(.02 + hash(i, 8371)*.08), 1, 1); } // the city's lamps inside it
    x.fillStyle = '#4a4a48'; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 20; i++) x.lineTo(W*i/20, hz - H*(.006 + hash(i, 8372)*.012)); x.lineTo(W, hz); x.closePath(); x.fill();
    x.fillStyle = vgrad(x, hz, H, [[0,'#4a4844'],[1,'#26241f']]); x.fillRect(0, hz, W, H - hz); // stubble and dead earth
    for (let i = 0; i < 160; i++) { const d = hash(i, 8373), yy = hz + Math.pow(d, .8)*(H - hz); x.fillStyle = `rgba(30,28,24,${(.2 + d*.3).toFixed(2)})`; x.fillRect(hash(i, 8374)*W, yy, 1 + d*2, 1); }
    x.fillStyle = '#5a5850'; x.beginPath(); x.moveTo(W*.4, H); x.lineTo(W*.62, H); x.lineTo(W*.86, hz); x.lineTo(W*.84, hz); x.closePath(); x.fill(); // the road, going east
    [[.18, .62, 1], [.72, .58, .7], [.9, .7, 1.2]].forEach(([u, v, k]) => { x.strokeStyle = '#1e1c1a'; x.lineWidth = 1.6*k; x.beginPath(); x.moveTo(W*u, H*v); x.lineTo(W*u, H*v - 26*k); x.moveTo(W*u, H*v - 14*k); x.lineTo(W*u + 9*k, H*v - 22*k); x.moveTo(W*u, H*v - 18*k); x.lineTo(W*u - 7*k, H*v - 25*k); x.stroke(); }); // dead trees
    for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(240,244,252,.8)'; x.fillRect(W*(.85 + i*.012), hz - 3 - (i % 2), 1, 1); } glow(x, W*.87, hz - 3, H*.06, '#c8d4f0', .2); // the barrow's lamps, far off
    x.fillStyle = '#2a2622'; x.save(); x.translate(W*.56, H*.74); x.rotate(.3); x.fillRect(-12, -5, 24, 8); x.restore(); ell(x, W*.5, H*.79, 5, 5, '#1a1612'); // the cart, over, a wheel off
  }), 0, 0, W, H);
  // pilgrims on the road, small, going east, slowly
  for (let i = 0; i < 9; i++) { const k = (hash(i, 8375) + (mo ? t/90000 : 0)) % 1, u = .5 + k*.35, v = 1 - k*.48, s = 1.4 - k; const px = W*(u + (hash(i, 8376) - .5)*.04), py = H*v;
    ctx.fillStyle = 'rgba(30,26,22,.9)'; ctx.fillRect(px - 1.4*s, py - 6*s, 2.8*s, 6*s); ctx.beginPath(); ctx.arc(px, py - 7*s, 1.2*s, 0, 7); ctx.fill(); if (i % 3 === 0) { ctx.fillStyle = 'rgba(70,60,44,.9)'; ctx.fillRect(px - 2.6*s, py - 6*s, 1.4*s, 3*s); } }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.08 + i*Math.min(.06, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .55, .5); };

/* the room over the chandler's: a narrow room of whitewash gone grey, two beds, the window with its wide stone sill and the shutters open,
   and outside on iron arms the lamps burning against the night; the reading's place */
SCENEX.b8_c3_lodging = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fy = H*.8;
  ctx.drawImage(sceneLayer('b83:lodging', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, fy, [[0,'#16161a'],[1,'#26241e']]); x.fillRect(0, 0, W, fy); // grey whitewash
    for (let i = 0; i < 30; i++) ell(x, hash(i, 8340)*W, hash(i, 8341)*fy, 8 + hash(i, 8342)*14, 3 + hash(i, 8343)*5, 'rgba(50,48,44,.2)');
    x.fillStyle = vgrad(x, fy, H, [[0,'#2a2218'],[1,'#100c08']]); x.fillRect(0, fy, W, H - fy); // the boards
    for (let i = 1; i < 6; i++) { x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, fy + (H - fy)*i/6); x.lineTo(W, fy + (H - fy)*i/6); x.stroke(); }
    // the window: deep reveal, the night outside
    const wx = W*.36, wy = H*.16, ww = W*.28, wh = H*.4; x.fillStyle = '#0a0a0c'; x.fillRect(wx - W*.02, wy - H*.02, ww + W*.04, wh + H*.04);
    x.fillStyle = vgrad(x, wy, wy + wh, [[0,'#020306'],[1,'#080a12']]); x.fillRect(wx, wy, ww, wh);
    b83Front(x, wx, wx + ww*.45, wy + wh, wy + wh*.3, 8344); b83Front(x, wx + ww*.6, wx + ww, wy + wh, wy + wh*.36, 8345); // the street's far side, through the window
    x.fillStyle = '#3a3630'; x.fillRect(wx - W*.04, wy + wh, ww + W*.08, H*.035); x.fillStyle = '#4a463e'; x.fillRect(wx - W*.04, wy + wh, ww + W*.08, H*.006); // the wide stone sill
    x.fillStyle = '#2a1e12'; x.fillRect(wx - W*.1, wy, W*.08, wh); x.fillRect(wx + ww + W*.02, wy, W*.08, wh); // the shutters, open
    // two beds, a jug
    x.fillStyle = '#3a2c1e'; x.fillRect(W*.02, H*.62, W*.26, H*.06); x.fillStyle = '#5a5046'; x.fillRect(W*.02, H*.6, W*.26, H*.03);
    x.fillStyle = '#3a2c1e'; x.fillRect(W*.72, H*.62, W*.26, H*.06); x.fillStyle = '#5a5046'; x.fillRect(W*.72, H*.6, W*.26, H*.03);
    ell(x, wx + ww*.85, wy + wh - H*.02, W*.012, H*.024, '#6a5440');
  }), 0, 0, W, H);
  const wx = W*.36, wy = H*.16, ww = W*.28, wh = H*.4;
  ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip(); b83Lamp(ctx, wx + ww*.2, wy + wh*.5, H/300, 1); b83Lamp(ctx, wx + ww*.78, wy + wh*.56, H/340, -1); b83Tall(ctx, wx + ww*.5, wy + wh*.3, H/600, t, mo, 2); ctx.restore();
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.5, wy + wh, H*.4, '#a8c0f0', .08); ctx.globalCompositeOperation = 'source-over'; // the lamps' white on the sill
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, W*.5 + side*(W*.1 + j*W*.07), H*.96 - (j % 2)*3, 1.85, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .7, .5); };

/* the harbour wall and the black bay: the wall along the bottom with its lamps on poles, the water flat and black with the lamps standing in
   it upside down, and far out a broken black shape, tilted, huge, like a cliff that fell into the sea, the fishing boats' lamps in a ring
   round it, keeping away. Never named. */
SCENEX.b8_c3_harbour = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, wall = H*.78;
  ctx.drawImage(sceneLayer('b83:harbour', W, H, (x, W, H) => {
    b83Night(x, W, H, hz);
    x.fillStyle = vgrad(x, hz, wall, [[0,'#141a28'],[1,'#0a0c14']]); x.fillRect(0, hz, W, wall - hz); // the bay
    glow(x, W*.64, hz, W*.42, '#4a5a80', .22); x.fillStyle = 'rgba(70,86,120,.25)'; x.fillRect(0, hz - 1, W, 2); // a faint haze along the horizon, so the shape stands against it
    // the shape in the water, far out: a broken black mass, tilted, with jagged spires, and its reflection
    const sx = W*.64, sy = hz + H*.085, s = Math.min(W, H*1.6)*.00024;
    const shape = [[-60, 0], [-52, -14], [-40, -18], [-34, -38], [-28, -20], [-12, -26], [-6, -52], [0, -30], [14, -34], [22, -62], [28, -36], [44, -28], [52, -12], [64, 0]];
    x.save(); x.translate(sx, sy); x.rotate(-.08); x.fillStyle = '#010102'; x.beginPath(); shape.forEach(([px, py], i) => i ? x.lineTo(px*s*10, py*s*10) : x.moveTo(px*s*10, py*s*10)); x.closePath(); x.fill();
    x.strokeStyle = 'rgba(150,170,210,.45)'; x.lineWidth = 1; x.beginPath(); shape.slice(0, 8).forEach(([px, py], i) => i ? x.lineTo(px*s*10, py*s*10) : x.moveTo(px*s*10, py*s*10)); x.stroke(); // a little lamplight on its landward face
    x.globalAlpha = .35; x.scale(1, -.5); x.beginPath(); shape.forEach(([px, py], i) => i ? x.lineTo(px*s*10, py*s*10) : x.moveTo(px*s*10, py*s*10)); x.closePath(); x.fill(); x.restore();
    // the harbour wall: black stone patched pale, along the bottom
    x.fillStyle = vgrad(x, wall, H, [[0,'#1a1a20'],[1,'#08080a']]); x.fillRect(0, wall, W, H - wall); x.fillStyle = '#2a2a32'; x.fillRect(0, wall, W, H*.012);
    for (let i = 0; i < 12; i++) { x.fillStyle = 'rgba(110,96,96,.3)'; x.fillRect(hash(i, 8350)*W, wall + H*(.02 + hash(i, 8351)*.12), W*(.03 + hash(i, 8352)*.05), H*.03); }
    for (let i = 0; i < 14; i++) { x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = .6; x.beginPath(); x.moveTo(W*i/14, wall); x.lineTo(W*i/14, H); x.stroke(); }
  }), 0, 0, W, H);
  // the fishing boats' lamps in a long ring round the shape, far off, keeping away, rising and falling a little on the swell
  const sx = W*.64, sy = hz + H*.085;
  for (let i = 0; i < 9; i++) { const a = i/9*Math.PI*2, bob = mo ? Math.sin(t/1400 + i)*1 : 0, lx = sx + Math.cos(a)*W*.2, ly = sy + Math.sin(a)*H*.035 + bob; if (ly < hz + 2) continue;
    ctx.fillStyle = 'rgba(255,210,150,.85)'; ctx.fillRect(lx - 1, ly - 1, 2, 2); ctx.fillStyle = 'rgba(255,210,150,.25)'; ctx.fillRect(lx - .5, ly + 2, 1, 5 + (mo ? Math.sin(t/300 + i)*1.5 : 0)); }
  // the wall's lamps on poles, and each one standing upside down in the water
  [.1, .3, .5, .7, .9].forEach((u, i) => { const lx = W*u, ly = wall; ctx.fillStyle = '#0c0c10'; ctx.fillRect(lx - 1, ly - H*.12, 2, H*.12);
    ctx.fillStyle = 'rgba(236,240,250,.95)'; ctx.fillRect(lx - 2.6, ly - H*.14, 5.2, H*.025); ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly - H*.13, H*.12, '#b0c4f0', .16); ctx.globalCompositeOperation = 'source-over';
    const wob = mo ? Math.sin(t/700 + i*1.3)*1.4 : 0; ctx.fillStyle = 'rgba(200,214,240,.25)'; for (let k = 0; k < 6; k++) ctx.fillRect(lx - 2 + wob*(k % 2 ? 1 : -1), ly - H*.02 - k*H*.03, 4, H*.012); });
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.12 + i*Math.min(.065, .36/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .45); };

/* a low harbour tavern: lamps on hooks, benches, a counter, carters and clerks as shapes; in the far corner, small and apart, a table with a
   board on it, a tall figure on one side and a figure in a grey cloak on the other. Never close, never a face. */
SCENEX.b8_c3_tavern = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fy = H*.78;
  ctx.drawImage(sceneLayer('b83:tavern', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, fy, [[0,'#141418'],[1,'#2a2622']]); x.fillRect(0, 0, W, fy);
    for (let i = 0; i < 4; i++) { x.fillStyle = '#0a0a0c'; x.fillRect(0, H*(.05 + i*.002), W, H*.03); x.fillRect(W*(.08 + i*.28), 0, W*.02, H*.09); } // the beams
    x.fillStyle = vgrad(x, fy, H, [[0,'#24201a'],[1,'#0c0a08']]); x.fillRect(0, fy, W, H - fy);
    // the counter, left, and its jugs
    x.fillStyle = '#2a2016'; x.fillRect(W*.02, H*.56, W*.26, H*.06); x.fillStyle = '#1a140c'; x.fillRect(W*.02, H*.62, W*.26, fy - H*.62);
    [.06, .11, .16, .22].forEach((u, i) => ell(x, W*u, H*.545, W*.012, H*.02, ['#4a3a2a', '#3a3a3e', '#5a4030', '#2e2e34'][i]));
    // benches and the room's shapes: carters and clerks, small, a silver glint at a cuff here and there
    x.fillStyle = '#20180e'; x.fillRect(W*.3, H*.66, W*.34, H*.025); x.fillRect(W*.34, H*.6, W*.26, H*.03);
    for (let i = 0; i < 7; i++) { const cx = W*(.32 + i*.045), cy = H*.6; x.fillStyle = '#121014'; x.fillRect(cx - 3, cy - 12, 6, 12); x.beginPath(); x.arc(cx, cy - 14, 3, 0, 7); x.fill(); if (i % 3 === 0) { x.fillStyle = 'rgba(200,210,230,.6)'; x.fillRect(cx + 2, cy - 6, 1.4, .8); } }
    // the far corner, right: the table apart, the board, the two figures
    x.fillStyle = '#100e0c'; x.fillRect(W*.7, H*.24, W*.28, H*.36); // the corner's shadow
    x.fillStyle = '#2a2016'; x.fillRect(W*.78, H*.5, W*.12, H*.02); x.fillRect(W*.8, H*.52, W*.01, H*.06); x.fillRect(W*.87, H*.52, W*.01, H*.06);
    x.fillStyle = '#3a3226'; x.fillRect(W*.815, H*.49, W*.05, H*.012); for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#c8c0b0' : '#1a1a1e'; x.fillRect(W*(.82 + hash(i, 8360)*.04), H*.484, 1.4, 1.4); } // the board and its pieces
    x.fillStyle = '#060608'; x.fillRect(W*.755, H*.3, W*.022, H*.2); x.beginPath(); x.arc(W*.766, H*.285, W*.011, 0, 7); x.fill(); // the tall one, seated, still taller than anyone in the room
    x.fillStyle = '#4a4a4c'; x.beginPath(); x.moveTo(W*.905, H*.5); x.lineTo(W*.91, H*.38); x.lineTo(W*.935, H*.37); x.lineTo(W*.94, H*.5); x.closePath(); x.fill(); x.beginPath(); x.arc(W*.922, H*.36, W*.01, 0, 7); x.fill(); // the man in the grey cloak
  }), 0, 0, W, H);
  // lamps on hooks: white, steady
  [[.18, .22], [.5, .2], [.84, .26]].forEach(([u, v], i) => { const lx = W*u, ly = H*v; B2F.line(ctx, '#0a0a0c', .6, [[lx, H*.08], [lx, ly - 4]]); ctx.fillStyle = 'rgba(236,240,250,.95)'; ctx.fillRect(lx - 2.4, ly - 4, 4.8, 5);
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*(i === 2 ? .14 : .26), '#c0ccf0', i === 2 ? .08 : .14); ctx.globalCompositeOperation = 'source-over'; });
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.24 + i*Math.min(.06, .34/sq.length)), H*.97 - (i % 2)*2, 1.8, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* ---------------- the chapter's gear (200×150, Book Eight's ground: night slate-blue, gas-blue rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#2a3038"/><stop offset=".62" stop-color="#161a20"/><stop offset="1" stop-color="#0a0c10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* the Black Coral knife: a long blade of dark iron that takes no shine, a grip of pale porous coral-stone, pitted, pinkish */
  ART['item/b8_c3_coralknife'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A Black Coral knife">${bg('b83ck')}
<linearGradient id="b83ck-bl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34363c"/><stop offset=".5" stop-color="#1c1d22"/><stop offset="1" stop-color="#0c0c0e"/></linearGradient>
<linearGradient id="b83ck-gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8aca6"/><stop offset="1" stop-color="#7a625e"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b83ck-bg)"/><ellipse cx="100" cy="114" rx="72" ry="8" fill="url(#b83ck-sh)"/>
<path d="M62 84 L170 56 Q182 54 186 58 Q176 64 166 66 L66 96 Z" fill="url(#b83ck-bl)" stroke="#050506" stroke-width="1.2"/>
<path d="M68 86 L168 59 L184 58" stroke="#8ab8ff" stroke-width=".9" fill="none" opacity=".4"/>
<rect x="56" y="80" width="6" height="22" rx="1.5" transform="rotate(-15 59 91)" fill="#2a2a30" stroke="#050506"/>
<path d="M18 104 Q16 96 24 94 L58 86 L62 98 L28 108 Q20 110 18 104 Z" fill="url(#b83ck-gr)" stroke="#2a1e1c" stroke-width="1.2"/>
<g fill="#5e4a46" opacity=".8"><circle cx="28" cy="100" r="1.4"/><circle cx="36" cy="97" r="1"/><circle cx="42" cy="99" r="1.6"/><circle cx="50" cy="94" r="1.1"/><circle cx="33" cy="104" r="1"/><circle cx="46" cy="102" r="1.2"/><circle cx="54" cy="96" r=".9"/></g>
<path d="M22 98 L56 89" stroke="#e8d4cc" stroke-width=".8" opacity=".5"/>
<ellipse cx="110" cy="74" rx="60" ry="26" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c3_coralknife'] = [200, 150];
  /* the pilgrim's token: a bit of red-pink coral, rough, on a plain cord, lying in a loop on dark stone */
  ART['item/b8_c3_pilgrimtoken'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A pilgrim's token">${bg('b83pt')}
<radialGradient id="b83pt-c" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#f0a898"/><stop offset=".6" stop-color="#c8665a"/><stop offset="1" stop-color="#6a2e2a"/></radialGradient></defs>
<rect width="200" height="150" fill="url(#b83pt-bg)"/><ellipse cx="100" cy="108" rx="58" ry="9" fill="url(#b83pt-sh)"/>
<path d="M52 60 Q60 22 100 24 Q142 26 148 62 Q150 82 120 92" fill="none" stroke="#6a5a42" stroke-width="2.2" stroke-linecap="round"/>
<path d="M52 60 Q50 80 78 92" fill="none" stroke="#6a5a42" stroke-width="2.2" stroke-linecap="round"/>
<path d="M54 58 Q62 26 100 27" fill="none" stroke="#a89a7a" stroke-width=".7" opacity=".6"/>
<path d="M84 90 Q80 80 88 76 Q86 66 96 66 Q100 58 108 64 Q118 62 116 74 Q124 80 116 88 Q118 100 104 100 Q96 108 90 100 Q78 100 84 90 Z" fill="url(#b83pt-c)" stroke="#3a1a18" stroke-width="1"/>
<g fill="#7a3430" opacity=".75"><circle cx="94" cy="78" r="1.6"/><circle cx="104" cy="74" r="1.2"/><circle cx="110" cy="84" r="1.8"/><circle cx="98" cy="90" r="1.3"/><circle cx="106" cy="94" r="1"/><circle cx="90" cy="86" r=".9"/></g>
<path d="M88 78 Q96 68 108 66" stroke="#ffd8cc" stroke-width="1" fill="none" opacity=".55"/>
<path d="M78 92 Q82 88 84 90 M116 88 Q120 90 120 92" stroke="#6a5a42" stroke-width="2" fill="none" stroke-linecap="round"/>
<ellipse cx="100" cy="70" rx="56" ry="40" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c3_pilgrimtoken'] = [200, 150];
  /* the Andii lamp: a small lamp of dark glass in an iron cage with a ring to carry it by, burning white and steady, no flame to be seen */
  ART['item/b8_c3_lamp'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="An Andii lamp">${bg('b83lp')}
<radialGradient id="b83lp-g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#e4ecfa"/><stop offset="1" stop-color="#5a6a8a"/></radialGradient>
<radialGradient id="b83lp-h" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#c8d8ff" stop-opacity=".45"/><stop offset="1" stop-color="#c8d8ff" stop-opacity="0"/></radialGradient></defs>
<rect width="200" height="150" fill="url(#b83lp-bg)"/><ellipse cx="100" cy="76" rx="70" ry="60" fill="url(#b83lp-h)"/><ellipse cx="100" cy="124" rx="40" ry="6" fill="url(#b83lp-sh)"/>
<circle cx="100" cy="22" r="7" fill="none" stroke="#2a2c32" stroke-width="2.6"/>
<path d="M86 34 L114 34 L118 40 L82 40 Z" fill="#1a1c22" stroke="#050506"/>
<rect x="84" y="40" width="32" height="64" rx="4" fill="url(#b83lp-g)" opacity=".92"/>
<rect x="84" y="40" width="32" height="64" rx="4" fill="none" stroke="#0c0d10" stroke-width="2"/>
<path d="M100 40 L100 104 M84 62 L116 62 M84 84 L116 84" stroke="#0c0d10" stroke-width="2.4"/>
<path d="M82 104 L118 104 L122 114 L78 114 Z" fill="#1a1c22" stroke="#050506"/><path d="M80 112 L120 112" stroke="#8ab8ff" stroke-width=".8" opacity=".4"/>
<path d="M86 44 L86 100" stroke="#ffffff" stroke-width="1.2" opacity=".5"/></svg>`;
  ART_SIZE['item/b8_c3_lamp'] = [200, 150];
}
