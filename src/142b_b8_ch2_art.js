/* ============ Book Eight, Chapter 2 art: The Black Coral Road — the old Domin at winter's end, the caravan, the scarecrow fields ============ */
/* Book Eight's look (140b) carried out of the city: the road east is grey and flat under a pale winter sky; the caravan's nights are the
   slate-blue of the city's with no gas-light in them, only one fire; the scarecrow fields are the only green for days, dark and glossy, and
   the shapes on their poles stand against the sky at a distance, rag-wrapped, nothing more. Kelyk's colour is a bruised plum, kept small.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     b8_c2_calder  the caravan master: thin, Daru, a long road coat the colour of the road, a flat hat, the ledger under his arm
     b8_c2_carter  a carter (and Calder's man): a wool cap, a leather jerkin over a shirt, a club or a whip
     b8_c2_drover  the drover: broad, a red scarf over her hair, a smock, the long goad held upright
   Ground (TILEX), Book Three's Domin (65b) and camp (60d) underneath:
     b8_c2_camp    the caravan's ring at night: the camp's wagons, tents, fire, horse lines; 'K' the last wagon, its tarp tarred and roped;
                   '#' the dark beyond the ring (dead grass going black)
     b8_c2_road    the Domin road by day: Book Three's earth, field walls, dead trees; 'W' the wagons, 'L' the lead wagon, chains in its bed
     b8_c2_town    a Pannion town coming back: the walls whitewashed again with the soot coming through; 'T' the temple steps
     b8_c2_fields  the halt beside the fields, at night: 'g' the green rows, 'y' a pole with its rags, 'e' the gap trodden through the rows
     b8_c2_rowsb   the fields' battle ground: ',' the green rows (walkable), '.' the verge, '#' a wattle hurdle
   Five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still): b8_road_east, b8_fields, b8_caravan_night (140's
   placeholders, replaced), b8_c2_town, b8_c2_rows. No bodies anywhere; the poles are far off or small.
   The chapter's gear in the series' 200×150 item style, on Book Eight's ground: night slate-blue (#2a3038 → #0a0c10), gas-blue rim light. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Calder: thin, a long road coat the colour of the road, belted, open at the knee; a flat broad hat; the ledger under the left arm */
  b8_c2_calder(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1.04);
    h.legs('#2a2620'); ctx.fillStyle = '#1a1612'; ctx.fillRect(-4.5, 11, 3.4, 2); ctx.fillRect(1.1, 11, 3.4, 2); // road boots
    poly(ctx, [[-6,-6],[6,-6],[7.4,11],[1,11],[0,5],[-1,11],[-7.4,11]], h.armor('#7a6a50', '#2a2218')); // the long coat, split at the knee
    ctx.fillStyle = 'rgba(200,190,160,.2)'; ctx.fillRect(-6.8, 8, 4, 1); ctx.fillRect(3, 9.4, 3.6, .8); // dust at the hem
    ctx.fillStyle = '#3a2a18'; ctx.fillRect(-6.4, 1.6, 12.8, 1.2); ell(ctx, 0, 2.2, .9, .8, '#8a7448'); // the belt, its buckle
    poly(ctx, [[-10.6,-3],[-5,-3.6],[-5,4],[-10.6,4.6]], '#4a2e1a'); ctx.fillStyle = '#e0d4b4'; ctx.fillRect(-10.2, -2.2, .7, 6); // the ledger under the arm, its page edge
    ctx.fillStyle = '#a8866a'; ctx.fillRect(5.6, -1, 2, 3.2); // the free hand
    h.head('#b89878', 4.1, -11.2); h.look('rgba(24,14,10,.84)', -11.4); ctx.fillStyle = 'rgba(40,28,18,.55)'; ctx.fillRect(-1.6, -8.4, 3.2, .7); // a thin mouth
    ell(ctx, 0, -14.4, 7.4, 1.5, '#3a3226'); ctx.fillStyle = '#4a4030'; ctx.beginPath(); ctx.arc(0, -14.6, 3.8, Math.PI, 0); ctx.fill(); // the flat broad hat
    ctx.restore(); },
  /* a carter: a wool cap, a leather jerkin over a pale shirt, rolled sleeves, a club in the hand (Calder's man carries one too) */
  b8_c2_carter(ctx, h, t, o){ const c = b2Pick(o, [['#5a4630', '#7a6a50'], ['#4a3e2e', '#6a5e48'], ['#5e4a34', '#8a7a5a']]); ctx.save(); B2F.grow(ctx, 1.02, .98);
    h.legs('#2e2a24'); h.torso('#b8ac90', '#5a5040', 6.4); poly(ctx, [[-5.6,-5.4],[5.6,-5.4],[6,7],[-6,7]], h.armor(c[0], '#1e1810')); // shirt, jerkin
    ctx.fillStyle = '#b08a6a'; ctx.fillRect(-8.2, -2, 2.2, 5); ctx.fillRect(6, -2, 2.2, 5); // bare forearms
    B2F.line(ctx, '#3a2a1a', 1.8, [[7.6, 3], [9.6, -5]]); ell(ctx, 9.8, -5.6, 1.4, 1.6, '#4a3622'); // a club
    h.head('#b08a6a', 4.4, -11.2); h.look('rgba(24,14,10,.84)', -11.4); ctx.fillStyle = 'rgba(40,30,20,.5)'; ctx.fillRect(-3.6, -9.4, 7.2, 2.2); // stubble
    ctx.fillStyle = c[1]; ctx.beginPath(); ctx.arc(0, -13, 4.7, Math.PI, 0); ctx.fill(); ctx.fillRect(-4.7, -13.4, 9.4, 1.2); // the wool cap
    ctx.restore(); },
  /* the drover: a broad woman, a red scarf over her hair, a brown smock to the shin, the long ash goad held upright, its iron at the top */
  b8_c2_drover(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.12, 1.02);
    B2F.robe(ctx, h, '#6a4e34', '#2a1c10', 6.8, 8.4); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-1, -4, 1, 14); // the smock
    ctx.fillStyle = '#a07a5a'; ctx.fillRect(-8.6, -3, 2.6, 6); ctx.fillRect(6, -3, 2.6, 6); // forearms
    B2F.line(ctx, '#2a1a0e', 1.4, [[7.4, 11], [8.4, -20]]); poly(ctx, [[7.6,-20],[8.6,-24],[9.2,-20]], '#8a8a90'); B2F.line(ctx, '#8a8a90', .8, [[8.6, -18.6], [10.4, -17.4]]); // the goad: ash, the point, the hook
    h.head('#a07a5a', 4.6, -11.2); h.look('rgba(26,14,10,.88)', -11.4);
    ctx.fillStyle = '#a82a22'; ctx.beginPath(); ctx.arc(0, -12.4, 5, Math.PI*.92, Math.PI*2.08); ctx.fill(); poly(ctx, [[-5,-12],[-6.6,-6],[-3.4,-8.6]], '#8a2018'); // the red scarf, its tail
    ctx.restore(); },
});

/* ---------------- ground ---------------- */
/* the green rows: glossy dark leaves in two ridged rows a tile, pale where the pollen has settled; N = night */
function b82Rows(ctx, x, y, T, N){ const px = x*T, py = y*T;
  ctx.fillStyle = N ? '#14120e' : '#3a3428'; ctx.fillRect(px, py, T, T); // the furrow's earth, dark and wet
  for (let r = 0; r < 2; r++) { const ry = py + T*(.3 + r*.46);
    ctx.fillStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(20,16,10,.35)'; ctx.fillRect(px, ry + T*.1, T, T*.06);
    for (let i = 0; i < 5; i++) { const lx = px + T*(i + .5)/5 + (hash(x, y, r*7 + i) - .5)*T*.06, s = T*(.12 + hash(y, x, r*7 + i)*.05);
      ell(ctx, lx, ry, s*1.2, s*.9, N ? '#18281a' : '#2a4428'); ell(ctx, lx - s*.4, ry - s*.4, s*.7, s*.5, N ? '#22382a' : '#3e6236'); // a clump, its lit side
      ctx.fillStyle = N ? 'rgba(150,200,160,.18)' : 'rgba(220,240,200,.28)'; ctx.fillRect(lx - s*.6, ry - s*.7, Math.max(1, s*.3), Math.max(1, s*.12)); } } // the gloss
  ctx.fillStyle = N ? 'rgba(200,190,140,.08)' : 'rgba(240,230,170,.16)'; for (let i = 0; i < 4; i++) ctx.fillRect(px + hash(x, y, i + 40)*T, py + hash(y, x, i + 41)*T, 1, 1); } // pollen
/* a pole in the rows: a dark post leaning a little, a bundle of grey rag bound at the top, its strips lifting. Nothing more is drawn. */
function b82Pole(ctx, x, y, T, N){ const px = x*T, py = y*T, lean = (hash(x, y, 5) - .5)*.16; b82Rows(ctx, x, y, T, N);
  ctx.save(); ctx.translate(px + T*.5, py + T*.92); ctx.rotate(lean); ell(ctx, 0, 0, T*.16, T*.05, 'rgba(0,0,0,.4)');
  ctx.fillStyle = N ? '#0e0c0a' : '#2a2018'; ctx.fillRect(-T*.03, -T*.84, T*.06, T*.84); ctx.fillRect(-T*.18, -T*.62, T*.36, T*.04); // the post, the crossbar
  ell(ctx, 0, -T*.68, T*.15, T*.2, N ? '#3a3632' : '#7a7064'); ell(ctx, -T*.04, -T*.74, T*.08, T*.1, N ? '#4a4640' : '#8e8476'); // the rag bundle
  ctx.strokeStyle = N ? 'rgba(90,86,78,.7)' : 'rgba(150,140,124,.8)'; ctx.lineWidth = Math.max(1, T*.025);
  for (let i = 0; i < 4; i++) { const a = -T*.14 + i*T*.09; ctx.beginPath(); ctx.moveTo(a, -T*.6); ctx.quadraticCurveTo(a - T*.08, -T*.48, a - T*.04 + hash(x, y, i)*T*.06, -T*.4); ctx.stroke(); } // strips
  ctx.restore(); }
/* the last wagon: a camp wagon (60d) with a dark tarred tarp over the bed, roped at every corner */
function b82LastWagon(ctx, x, y, T, N){ b3Camp(ctx, 'W', x, y, T, N); const px = x*T, py = y*T;
  poly(ctx, [[px + T*.1, py + T*.5], [px + T*.2, py + T*.26], [px + T*.8, py + T*.26], [px + T*.9, py + T*.5]], N ? '#14100e' : '#2e2620');
  ctx.strokeStyle = N ? 'rgba(120,100,70,.6)' : 'rgba(160,140,100,.8)'; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath();
  ctx.moveTo(px + T*.14, py + T*.44); ctx.lineTo(px + T*.86, py + T*.3); ctx.moveTo(px + T*.14, py + T*.3); ctx.lineTo(px + T*.86, py + T*.44); ctx.stroke(); // ropes across
  [[.14, .48], [.86, .48]].forEach(([u, v]) => ell(ctx, px + T*u, py + T*v, T*.03, T*.03, '#0a0806')); // tarred knots
  ctx.fillStyle = 'rgba(120,70,100,.12)'; ctx.fillRect(px + T*.2, py + T*.3, T*.6, T*.16); } // the faint bruise of what is under it
/* the lead wagon's chains: heavy iron coiled in the bed, a hook */
function b82Chains(ctx, x, y, T, N){ const px = x*T, py = y*T; ctx.strokeStyle = N ? '#3a3c40' : '#5a5c62'; ctx.lineWidth = Math.max(1, T*.03);
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(px + T*(.34 + i*.16), py + T*.42, T*.08, T*.05, 0, 0, 7); ctx.stroke(); }
  B2F.line(ctx, N ? '#4a4c52' : '#7a7c82', Math.max(1, T*.03), [[px + T*.8, py + T*.42], [px + T*.92, py + T*.7], [px + T*.86, py + T*.76]]); }

TILEX.b8_c2_camp = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => {
  if (ch === 'K') return b82LastWagon(ctx, x, y, T, true);
  if (ch === '#') { b3c5Domin(ctx, ',', x, y, T, true); ctx.fillStyle = 'rgba(2,3,6,.55)'; ctx.fillRect(x*T, y*T, T, T); return; } // the dark beyond the ring
  b3Camp(ctx, ch, x, y, T, true); });
TILEX.b8_c2_road = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => {
  if (ch === 'W' || ch === 'L') { b3c5Domin(ctx, '.', x, y, T, !!dark); b3Camp(ctx, 'W', x, y, T, !!dark); if (ch === 'L') b82Chains(ctx, x, y, T, !!dark); return; }
  b3c5Domin(ctx, ch, x, y, T, !!dark); });
/* the town: Book Three's burnt walls, whitewashed again, the soot coming through in the shape of the old flames; the temple's pale steps */
TILEX.b8_c2_town = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === 'T') { b3c5Domin(ctx, '.', x, y, T, !!dark);
    for (let i = 0; i < 4; i++) { ctx.fillStyle = shade('#c8c0b0', -i*.08); ctx.fillRect(px, py + T*(.1 + i*.22), T, T*.2); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(px, py + T*(.28 + i*.22), T, T*.03); }
    ell(ctx, px + T*(.3 + hash(x, y, 3)*.4), py + T*.6, T*.14, T*.05, 'rgba(70,30,50,.35)'); return; } // a dark stain on a step
  b3c5Domin(ctx, ch, x, y, T, !!dark);
  if (ch === '#') { ctx.fillStyle = 'rgba(228,222,208,.62)'; ctx.fillRect(px, py + T*.08, T, T*.56); // the whitewash over the stone
    ctx.fillStyle = 'rgba(40,36,34,.22)'; for (let i = 0; i < 2; i++) { const fx = px + T*(.2 + hash(x, y, i + 9)*.6); poly(ctx, [[fx - T*.12, py + T*.64], [fx - T*.04, py + T*.3], [fx, py + T*.12], [fx + T*.05, py + T*.34], [fx + T*.12, py + T*.64]], ctx.fillStyle); } } }); // soot ghosts of flames
TILEX.b8_c2_fields = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === 'g') return b82Rows(ctx, x, y, T, true);
  if (ch === 'y') return b82Pole(ctx, x, y, T, true);
  if (ch === 'e') { b82Rows(ctx, x, y, T, true); ctx.fillStyle = '#1e1a14'; ctx.fillRect(px + T*.3, py, T*.4, T); // the gap, trodden through
    for (let i = 0; i < 3; i++) ell(ctx, px + T*(.42 + (i % 2)*.14), py + T*(.2 + i*.3), T*.05, T*.07, 'rgba(0,0,0,.6)'); return; } // boot-prints going in
  if (ch === 'K') return b82LastWagon(ctx, x, y, T, true);
  if (ch === 'W' || ch === 'F') return b3Camp(ctx, ch, x, y, T, true);
  b3c5Domin(ctx, ch, x, y, T, true); });
TILEX.b8_c2_rowsb = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === ',') return b82Rows(ctx, x, y, T, !!dark);
  if (ch === '#') { b82Rows(ctx, x, y, T, !!dark); ell(ctx, px + T*.5, py + T*.86, T*.44, T*.08, 'rgba(0,0,0,.45)'); // a wattle hurdle the tenders stand in the rows
    ctx.fillStyle = dark ? '#2a2016' : '#5a4630'; for (let i = 0; i < 5; i++) ctx.fillRect(px + T*(.08 + i*.2), py + T*.2, T*.05, T*.66);
    ctx.strokeStyle = dark ? '#3a2e20' : '#7a6444'; ctx.lineWidth = Math.max(1, T*.05); for (let r = 0; r < 4; r++) { ctx.beginPath(); ctx.moveTo(px + T*.06, py + T*(.3 + r*.14)); for (let i = 1; i <= 4; i++) ctx.lineTo(px + T*(.06 + i*.22), py + T*(.3 + r*.14) + ((i + r) % 2 ? T*.03 : -T*.03)); ctx.stroke(); }
    return; }
  b3c5Domin(ctx, '.', x, y, T, !!dark); });

/* ---------------- shared pieces ---------------- */
/* the old Domin to the horizon: flat grey country, broken field walls running off in lines, stumps; k the light (1 day, 0 night) */
function b82Plain(x, W, H, hz, seed, k = 1){ const c = (d, n) => k ? d : n;
  x.fillStyle = vgrad(x, hz, H, [[0, c('#8a8476', '#14161c')], [1, c('#4e4a40', '#06070a')]]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 8; i++) { const yy = hz + Math.pow((i + 1)/9, 1.7)*(H - hz); x.strokeStyle = c('rgba(60,56,48,.35)', 'rgba(0,0,0,.35)'); x.lineWidth = .6 + i*.15; x.beginPath(); // the field walls, down and broken
    let on = true; for (let j = 0; j <= 20; j++) { const px = j/20*W, py = yy + Math.sin(j*.9 + i)*.6; if (hash(i*30 + j, seed) > .78) on = !on; if (on) x.lineTo(px, py); else x.moveTo(px, py); } x.stroke(); }
  for (let i = 0; i < 26; i++) { const d = hash(i, seed + 1), px = hash(i, seed + 2)*W, py = hz + Math.pow(d, 1.5)*(H - hz)*.9, s = .6 + d*2.4; // stumps and dead trees
    x.fillStyle = c('#3a342a', '#08090c'); x.fillRect(px, py - s*3, s*.7, s*3); if (d > .6) { x.strokeStyle = x.fillStyle; x.lineWidth = s*.3; x.beginPath(); x.moveTo(px, py - s*2.4); x.lineTo(px - s*1.4, py - s*3.6); x.moveTo(px + s*.4, py - s*2.8); x.lineTo(px + s*1.6, py - s*4); x.stroke(); } } }
/* a wagon in silhouette or lit: bed, tilt, two wheels; s the scale, dir 1 facing right; tarp = the last wagon */
function b82Wagon(x, cx, by, s, lit, tarp){ const dk = lit ? '#3a2a1a' : '#07080a';
  x.fillStyle = dk; x.fillRect(cx - 14*s, by - 9*s, 28*s, 5*s);
  x.fillStyle = tarp ? (lit ? '#2a221c' : '#050506') : (lit ? '#b8ac8a' : '#0a0b0e'); x.beginPath(); x.moveTo(cx - 13*s, by - 9*s); x.quadraticCurveTo(cx, by - 22*s, cx + 13*s, by - 9*s); x.closePath(); x.fill();
  if (tarp && lit) { x.strokeStyle = 'rgba(140,120,80,.6)'; x.lineWidth = .6*s; x.beginPath(); x.moveTo(cx - 12*s, by - 10*s); x.lineTo(cx + 12*s, by - 14*s); x.moveTo(cx - 12*s, by - 14*s); x.lineTo(cx + 12*s, by - 10*s); x.stroke(); }
  [[-8], [8]].forEach(([d]) => { x.strokeStyle = dk; x.lineWidth = 1.2*s; x.beginPath(); x.arc(cx + d*s, by - 2.6*s, 3.2*s, 0, 7); x.stroke(); });
  x.strokeStyle = dk; x.lineWidth = 1*s; x.beginPath(); x.moveTo(cx + 14*s, by - 6*s); x.lineTo(cx + 22*s, by - 3*s); x.stroke(); }
/* poles on the fields, small and far, standing up against the sky in rows to the horizon: never closer than this */
function b82FarPoles(x, W, H, hz, seed, n, col){ for (let i = 0; i < n; i++) { const d = Math.pow(hash(i, seed), 1.8), py = hz + d*(H - hz)*.55, px = hash(i, seed + 1)*W, s = .4 + d*2.2;
  x.fillStyle = col; x.fillRect(px - s*.15, py - s*5, s*.3, s*5); x.fillRect(px - s*1.1, py - s*4, s*2.2, s*.3); ell(x, px, py - s*4.6, s*.7, s*.9, col); } }

/* ---------------- the backdrops ---------------- */
/* the road east (140's caption): a pale winter sky, the grey country flat to its edge, the hills of home small behind (west, left), the
   caravan's wagons in a line on a rutted road going right, a farm with a new roof on an old shell and smoke from it, riders on a far ridge */
SCENEX.b8_road_east = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5;
  ctx.drawImage(sceneLayer('b82:road', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#6a7484'],[.6,'#a8aaa4'],[1,'#c8c2b0']]); x.fillRect(0, 0, W, hz + 2); // a pale winter sky
    for (let i = 0; i < 5; i++) ell(x, W*(.1 + hash(i, 8201)*.8), H*(.1 + hash(i, 8202)*.22), W*(.1 + hash(i, 8203)*.12), H*.025, 'rgba(230,228,220,.35)'); // high thin cloud
    x.fillStyle = '#5a5e64'; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 10; i++) { const u = i/10*.34; x.lineTo(u*W, hz - H*(.05 + .03*Math.sin(i*1.3))*(1 - u*2)); } x.lineTo(W*.34, hz); x.closePath(); x.fill(); // the hills of home, behind
    x.fillStyle = '#6e6a60'; x.beginPath(); x.moveTo(W*.56, hz); x.quadraticCurveTo(W*.78, hz - H*.06, W, hz - H*.03); x.lineTo(W, hz); x.closePath(); x.fill(); // a long ridge, north-east
    b82Plain(x, W, H, hz, 8210, 1);
    x.fillStyle = '#6e6658'; x.beginPath(); x.moveTo(0, H*.8); x.quadraticCurveTo(W*.5, H*.66, W, H*.6); x.lineTo(W, H*.64); x.quadraticCurveTo(W*.5, H*.72, 0, H*.88); x.closePath(); x.fill(); // the road, rutted
    x.strokeStyle = 'rgba(40,36,30,.35)'; x.lineWidth = .8; x.beginPath(); x.moveTo(0, H*.84); x.quadraticCurveTo(W*.5, H*.7, W, H*.62); x.stroke();
    // a farm with a new roof on an old shell, right of centre
    x.fillStyle = '#4a4440'; x.fillRect(W*.66, hz + H*.02, W*.06, H*.05); x.fillStyle = '#7a6a4a'; poly(x, [[W*.655, hz + H*.022], [W*.69, hz - H*.01], [W*.725, hz + H*.022]], '#8a7a56'); x.fillStyle = '#1a1612'; x.fillRect(W*.68, hz + H*.04, W*.01, H*.03);
    [[.2, .74, .6], [.32, .7, .66], [.44, .67, .72], [.56, .65, .78], [.68, .63, .84]].forEach(([u, v, s], i) => b82Wagon(x, W*u, H*v, s*H/240, true, i === 0)); // the line, the last wagon at the back
  }), 0, 0, W, H);
  if (mo) for (let i = 0; i < 6; i++) { const k = ((t/3000 + i/6) % 1); ctx.fillStyle = `rgba(200,196,190,${(.35*(1 - k)).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(W*.685 + k*8 + Math.sin(t/900 + i)*2, hz - H*.02 - k*H*.12, 2 + k*6, 1.4 + k*3, 0, 0, 7); ctx.fill(); } // smoke from the farm's chimney
  // riders on the ridge, small, against the sky
  for (let i = 0; i < 5; i++) { const rx = W*(.8 + i*.03) + (mo ? Math.sin(t/2400 + i)*1 : 0), ry = hz - H*.05 + i*.4; ctx.fillStyle = '#2a2824'; ctx.fillRect(rx - 2, ry - 1.4, 4, 1.6); ctx.fillRect(rx - .4, ry - 3.6, 1, 2.2); ctx.fillRect(rx + 1.4, ry - 2.6, 1, 1); }
  if (mo) for (let i = 0; i < 10; i++) { const k = ((t/2200 + i/10) % 1); ctx.fillStyle = `rgba(190,180,160,${(.18*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + i*.08) - k*20, H*(.78 - i*.012), 6 + k*10, 1.2); } // dust off the road, blowing south
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.34 + i*Math.min(.06, .3/sq.length)), H*.95 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .45, .5); };

/* the scarecrow fields (140's caption): dusk; the green rows going away north in perspective to the edge of the sky, dark and glossy; the
   poles among them small and far, thousands toward the horizon; the pollen hanging in the low light like smoke; the verge in front, the
   wagons drawn up at the right, the squad with its back to the rows */
SCENEX.b8_fields = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42;
  ctx.drawImage(sceneLayer('b82:fields', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#1e2436'],[.5,'#4a4458'],[.85,'#8a6a5a'],[1,'#b08a64']]); x.fillRect(0, 0, W, hz + 2); // dusk
    x.fillStyle = vgrad(x, hz, H*.82, [[0,'#2a3426'],[1,'#121a12']]); x.fillRect(0, hz, W, H*.82 - hz); // the green, to the horizon
    for (let i = 0; i < 26; i++) { const u = (i + .5)/26, vx = W*.5 + (u - .5)*W*4; x.strokeStyle = i % 2 ? 'rgba(10,16,10,.55)' : 'rgba(80,120,70,.18)'; x.lineWidth = 1 + (i % 3)*.4; // the rows converging north
      x.beginPath(); x.moveTo(W*.5 + (u - .5)*W*.3, hz); x.lineTo(vx, H*.82); x.stroke(); }
    for (let i = 0; i < 220; i++) { const d = Math.pow(hash(i, 8221), 1.6), py = hz + d*(H*.82 - hz), px = W*.5 + (hash(i, 8222) - .5)*W*(.3 + d*2.6); ell(x, px, py, .6 + d*3.6, .4 + d*1.6, `rgba(${60 + Math.round(d*40)},${100 + Math.round(d*50)},${64 + Math.round(d*30)},.4)`); } // leaves catching the low light
    b82FarPoles(x, W, H*.82, hz, 8230, 160, 'rgba(26,24,22,.85)'); // the poles, small and far: the nearest still a long stone's throw off
    x.fillStyle = 'rgba(200,170,120,.12)'; x.fillRect(0, hz - H*.02, W, H*.1); // pollen haze along the horizon
    x.fillStyle = vgrad(x, H*.8, H, [[0,'#3a3428'],[1,'#16140e']]); x.fillRect(0, H*.8, W, H*.2); // the verge
    for (let i = 0; i < 40; i++) { x.strokeStyle = 'rgba(110,100,70,.4)'; x.lineWidth = .6; const gx = hash(i, 8240)*W, gy = H*(.82 + hash(i, 8241)*.16); x.beginPath(); x.moveTo(gx, gy); x.lineTo(gx + 1, gy - 3); x.stroke(); } // dead grass
    b82Wagon(x, W*.82, H*.86, H/220, true, false); b82Wagon(x, W*.94, H*.84, H/240, true, true);
  }), 0, 0, W, H);
  if (mo) for (let i = 0; i < 40; i++) { const k = ((t/(6000 + (i % 5)*900) + i/40) % 1), px = (hash(i, 8250)*W + k*W*.2) % W, py = hz + hash(i, 8251)*H*.4 - Math.sin(k*6 + i)*4; // the pollen, drifting
    ctx.fillStyle = `rgba(230,210,150,${(.3*Math.sin(k*Math.PI)).toFixed(2)})`; ctx.fillRect(px, py, 1, 1); }
  if (mo) { const s = .5 + .5*Math.sin(t/1700); ctx.fillStyle = `rgba(200,180,140,${(.04 + .04*s).toFixed(3)})`; ctx.fillRect(0, hz, W, H*.38); } // the song, breathing in the haze
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.22 + i*Math.min(.06, .32/sq.length)), H*.96 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .62, .5); };

/* the caravan's fire at night (140's caption): wagons drawn in a ring, black against the stars; one fire in the middle; carters asleep
   under the axles, lumps of blanket; the dark beyond the ring very wide; the squad round the fire */
SCENEX.b8_caravan_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), hz = H*.46, fy = H*.82;
  ctx.drawImage(sceneLayer('b82:caravan', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#02030a'],[.7,'#0a1020'],[1,'#141c2c']]); x.fillRect(0, 0, W, hz + 2); // the sky, no city in it
    for (let i = 0; i < 180; i++) { x.fillStyle = `rgba(226,232,250,${(.1 + hash(i, 8260)*.6).toFixed(2)})`; x.fillRect(hash(i, 8261)*W, Math.pow(hash(i, 8262), 1.3)*hz*.95, hash(i, 8263) > .95 ? 1.6 : 1, 1); } // more stars than the city ever lets anyone see
    x.fillStyle = 'rgba(180,190,220,.05)'; x.beginPath(); x.ellipse(W*.6, H*.18, W*.5, H*.05, -.3, 0, 7); x.fill(); // the road of stars across the sky
    b82Plain(x, W, H, hz, 8270, 0);
    x.fillStyle = vgrad(x, hz, H, [[0,'#0c0e12'],[1,'#141210']]); x.fillRect(0, H*.62, W, H*.38); // the ground in the ring
    // the far side of the ring: wagons in silhouette, small
    [.08, .22, .38, .62, .78, .92].forEach((u, i) => b82Wagon(x, W*u, H*.62 - Math.sin(u*Math.PI)*H*.03, H/360, false, i === 5));
    for (let i = 0; i < 6; i++) ell(x, W*(.16 + i*.14), H*.625, W*.02, H*.008, 'rgba(60,54,44,.5)'); // carters under the axles, blankets
    x.fillStyle = '#060608'; [[.3, .66], [.52, .65]].forEach(([u, v]) => { poly(x, [[W*u - 10, H*v], [W*u, H*v - 14], [W*u + 10, H*v]], '#1a1814'); }); // carters' tents
  }), 0, 0, W, H);
  // the near wagons, either side, lit by the fire
  const cx = W*.5, cy = fy;
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy - 6, H*.6, '#ff8a3a', .2*fl); ctx.globalCompositeOperation = 'source-over';
  b82Wagon(ctx, W*.1, H*.84, H/200, true, false); b82Wagon(ctx, W*.9, H*.84, H/200, true, true);
  poly(ctx, [[cx - 14, cy], [cx - 6, cy - 20*fl], [cx, cy - 9], [cx + 6, cy - 17*fl], [cx + 14, cy]], 'rgba(255,140,50,.95)'); poly(ctx, [[cx - 6, cy], [cx, cy - 11*fl], [cx + 6, cy]], 'rgba(255,220,140,.95)');
  if (mo) for (let i = 0; i < 6; i++) { const k = ((t/1300 + i/6) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*6, cy - 14 - k*50, 1, 1); } // sparks going up into all that dark
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(W*.09 + j*W*.07), H*.97 - (j % 2)*3, 1.8, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .7, .55); };

/* a Pannion town coming back (b8_c2_town): dusk; a square of houses whitewashed again, the soot coming through in grey flames; a well;
   people at their doors, small, still; the temple's dome at the top of a flight of pale steps; the priest on the steps while he stands */
SCENEX.b8_c2_town = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5;
  ctx.drawImage(sceneLayer('b82:town', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#2a2c40'],[.55,'#7a6070'],[.9,'#c08a6a'],[1,'#d8a07a']]); x.fillRect(0, 0, W, hz + 2); // dusk, warm low
    // the temple at the top, a dome, steps down
    const tx = W*.5, ty = H*.3; x.fillStyle = '#d8d0c0'; x.fillRect(tx - W*.12, ty, W*.24, H*.16); x.beginPath(); x.arc(tx, ty, W*.08, Math.PI, 0); x.fill();
    x.fillStyle = 'rgba(60,50,48,.25)'; poly(x, [[tx - W*.1, ty + H*.16], [tx - W*.08, ty + H*.04], [tx - W*.06, ty + H*.16]], 'rgba(60,50,48,.25)'); // soot through the whitewash
    x.fillStyle = '#2a1e1e'; x.fillRect(tx - W*.025, ty + H*.07, W*.05, H*.09); // the doors
    for (let i = 0; i < 6; i++) { x.fillStyle = shade('#c8c0b0', -i*.05); x.fillRect(tx - W*(.1 + i*.02), ty + H*(.16 + i*.025), W*(.2 + i*.04), H*.025); } // the steps
    // the houses round the square, whitewashed, with the old flames coming through
    const house = (x0, x1, top, base, seed) => { x.fillStyle = '#d4ccbc'; x.fillRect(x0, top, x1 - x0, base - top); x.fillStyle = '#5a4a40'; poly(x, [[x0 - 2, top], [(x0 + x1)/2, top - (x1 - x0)*.2], [x1 + 2, top]], '#6a5446');
      for (let i = 0; i < 2; i++) { const fx = x0 + (x1 - x0)*(.25 + hash(i, seed)*.5); poly(x, [[fx - 6, base], [fx - 2, top + (base - top)*.4], [fx, top + 3], [fx + 3, top + (base - top)*.45], [fx + 6, base]], 'rgba(70,60,56,.22)'); }
      x.fillStyle = '#1a1412'; x.fillRect((x0 + x1)/2 - 3, base - (base - top)*.45, 6, (base - top)*.45); }; // the door
    house(-2, W*.22, H*.42, H*.72, 8281); house(W*.2, W*.34, H*.48, H*.68, 8282); house(W*.66, W*.8, H*.48, H*.68, 8283); house(W*.78, W + 2, H*.42, H*.72, 8284);
    x.fillStyle = vgrad(x, H*.68, H, [[0,'#7a6e5c'],[1,'#3a3428']]); x.fillRect(0, H*.7, W, H*.3); // the square's beaten earth
    // the well
    ell(x, W*.5, H*.8, W*.07, H*.025, '#8a8270'); ell(x, W*.5, H*.795, W*.05, H*.015, '#1a1612'); x.fillStyle = '#4a3a28'; x.fillRect(W*.45, H*.72, W*.006, H*.08); x.fillRect(W*.545, H*.72, W*.006, H*.08); x.fillRect(W*.45, H*.72, W*.1, H*.006);
    for (let i = 0; i < 12; i++) { const a = i/12*Math.PI*2; ell(x, W*.5 + Math.cos(a)*W*.085, H*.82 + Math.sin(a)*H*.03, 1.2, .9, '#5a3a3e'); } // the ring of cups
  }), 0, 0, W, H);
  // people at their doors, small, still, smiling: the town
  [[.11, .72], [.27, .68], [.73, .68], [.89, .72]].forEach(([u, v], i) => drawFigure(ctx, 'b3_c5_villager', W*u, H*v, 1.1, t, {phase:i, still:true, dir:i < 2 ? 1 : -1}));
  if (!(S && S.f && S.f.b8_c2_townDone)) drawFigure(ctx, 'priest', W*.5, H*.48, 1.2, t, {still:true, dir:1});
  if (mo) for (let i = 0; i < 8; i++) { const k = ((t/4200 + i/8) % 1); ctx.fillStyle = `rgba(160,90,120,${(.07*Math.sin(k*Math.PI)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.4 + hash(i, 8290)*.2), H*(.56 - k*.12), 4 + k*10, 2 + k*4, 0, 0, 7); ctx.fill(); } // the sweet air off the steps, faint
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.28 + i*Math.min(.065, .34/sq.length)), H*.96 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .55, .5); };

/* the scarecrow fields at night (b8_c2_rows): the rows black under the stars, the poles small against the sky, shaded lanterns moving
   down the rows toward the road; the last wagon at the verge with its tarp; on 'fields' the verge burning out and smoke going up */
SCENEX.b8_c2_rows = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.44, burned = !!(S && S.f && S.f.b8_c2_kelyk === 'burned');
  ctx.drawImage(sceneLayer('b82:rows' + (burned ? 'b' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#02030a'],[1,'#121a2a']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 140; i++) { x.fillStyle = `rgba(226,232,250,${(.1 + hash(i, 8300)*.5).toFixed(2)})`; x.fillRect(hash(i, 8301)*W, Math.pow(hash(i, 8302), 1.3)*hz*.95, 1, 1); }
    x.fillStyle = vgrad(x, hz, H*.84, [[0,'#0c140e'],[1,'#060a06']]); x.fillRect(0, hz, W, H*.84 - hz);
    for (let i = 0; i < 22; i++) { const u = (i + .5)/22; x.strokeStyle = i % 2 ? 'rgba(0,0,0,.6)' : 'rgba(60,90,60,.12)'; x.lineWidth = 1; x.beginPath(); x.moveTo(W*.5 + (u - .5)*W*.3, hz); x.lineTo(W*.5 + (u - .5)*W*4, H*.84); x.stroke(); }
    b82FarPoles(x, W, H*.84, hz, 8310, 140, 'rgba(2,3,6,.9)');
    x.fillStyle = vgrad(x, H*.82, H, [[0, burned ? '#1a1410' : '#16140e'],[1,'#080806']]); x.fillRect(0, H*.82, W, H*.18);
    if (burned) { x.fillStyle = '#0a0806'; x.fillRect(0, H*.72, W*.6, H*.12); for (let i = 0; i < 30; i++) ell(x, hash(i, 8320)*W*.6, H*(.74 + hash(i, 8321)*.08), 2, 1, 'rgba(60,40,30,.5)'); } // the burnt rows nearest the road
    b82Wagon(x, W*.76, H*.88, H/200, true, true); b82Wagon(x, W*.94, H*.86, H/240, true, false);
  }), 0, 0, W, H);
  if (!burned) for (let i = 0; i < 5; i++) { const k = mo ? ((t/9000 + i/5) % 1) : .5, lx = W*(.2 + i*.1) + (W*.72 - W*(.2 + i*.1))*k*.6, ly = hz + H*.06 + k*H*.3; // lanterns, shaded, coming down the rows
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, 10, '#ffb060', .35); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,200,120,.9)'; ctx.fillRect(lx - 1, ly - 1, 2, 2); }
  else { if (mo) for (let i = 0; i < 8; i++) { const k = ((t/3600 + i/8) % 1); ctx.fillStyle = `rgba(120,110,110,${(.25*(1 - k)).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(W*(.1 + i*.07) + k*10, H*(.74 - k*.3), 4 + k*14, 2 + k*6, 0, 0, 7); ctx.fill(); } // smoke off the burnt rows
    for (let i = 0; i < 10; i++) { const fl = mo ? .6 + .4*Math.sin(t/200 + i*1.3) : 1; ctx.fillStyle = `rgba(255,120,40,${(.6*fl).toFixed(2)})`; ctx.fillRect(hash(i, 8330)*W*.6, H*(.76 + hash(i, 8331)*.06), 1.4, 1.4); } } // embers
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.24 + i*Math.min(.06, .32/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .75, .5); };

/* ---------------- the chapter's gear (200×150, Book Eight's ground: night slate-blue, gas-blue rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#2a3038"/><stop offset=".62" stop-color="#161a20"/><stop offset="1" stop-color="#0a0c10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* the caravan mail: a riveted shirt on a quilted backing, short-sleeved, the rings dull iron; three mended patches in brighter rings;
     a quilted collar; the gas-blue rim on its lit edge */
  const rings = (() => { let r = ''; for (let y = 34; y < 120; y += 5) for (let x = 52; x < 150; x += 5) { const inBody = x > 62 && x < 138 || (y < 62 && x > 40 && x < 160); if (!inBody) continue; const p = (x - 52)*(y - 34) % 7 === 0;
      r += `<circle cx="${x + (y % 10 ? 2.5 : 0)}" cy="${y}" r="2.1" fill="none" stroke="${p ? '#8a8e96' : '#4a4e56'}" stroke-width="1"/>`; } return r; })();
  ART['item/b8_c2_caravanmail'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A coat of caravan mail">${bg('b82cm')}
<clipPath id="b82cm-c"><path d="M64 30 L136 30 L162 46 L156 70 L138 62 L138 120 L62 120 L62 62 L44 70 L38 46 Z"/></clipPath></defs>
<rect width="200" height="150" fill="url(#b82cm-bg)"/><ellipse cx="100" cy="128" rx="64" ry="7" fill="url(#b82cm-sh)"/>
<path d="M64 30 L136 30 L162 46 L156 70 L138 62 L138 120 L62 120 L62 62 L44 70 L38 46 Z" fill="#2a2a2e" stroke="#08080a" stroke-width="1.4"/>
<g clip-path="url(#b82cm-c)">${rings}
<rect x="72" y="70" width="18" height="16" fill="#6a6e76" opacity=".35"/><rect x="112" y="92" width="16" height="14" fill="#6a6e76" opacity=".35"/><rect x="48" y="50" width="12" height="10" fill="#6a6e76" opacity=".3"/></g>
<path d="M84 30 Q100 42 116 30 L114 26 Q100 34 86 26 Z" fill="#5a4a34" stroke="#1a140c"/><path d="M88 29 Q100 36 112 29" stroke="#2a2014" stroke-width=".8" fill="none"/>
<path d="M62 120 L138 120" stroke="#3a2e20" stroke-width="3"/><path d="M40 46 L64 32 L64 118" stroke="#8ab8ff" stroke-width="1" fill="none" opacity=".4"/>
<ellipse cx="100" cy="76" rx="56" ry="44" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c2_caravanmail'] = [200, 150];
  /* the drover's goad: a long ash pole across the frame, worn black at the grip, an iron point at the head and a hook behind it */
  ART['item/b8_c2_drovergoad'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A drover's goad">${bg('b82dg')}
<linearGradient id="b82dg-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b09a74"/><stop offset=".5" stop-color="#7a6648"/><stop offset="1" stop-color="#3a2e20"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b82dg-bg)"/><ellipse cx="100" cy="118" rx="76" ry="7" fill="url(#b82dg-sh)"/>
<path d="M14 118 L160 34 L164 40 L18 124 Z" fill="url(#b82dg-w)" stroke="#120e0a" stroke-width="1"/>
<path d="M14 118 L52 96 L56 102 L18 124 Z" fill="#1a140e"/><path d="M22 116 L48 101" stroke="#3a2e22" stroke-width="1" opacity=".8"/>
<path d="M158 34 L184 18 L166 42 Z" fill="#7a7e88" stroke="#121418" stroke-width="1"/><path d="M160 35 L182 20" stroke="#cfd4dc" stroke-width=".8" opacity=".6"/>
<path d="M150 44 Q142 30 152 24 L156 28 Q150 32 155 42 Z" fill="#6a6e78" stroke="#121418" stroke-width="1"/>
<rect x="154" y="34" width="10" height="6" transform="rotate(-30 159 37)" fill="#3a3c42"/>
<path d="M18 120 L160 38" stroke="#8ab8ff" stroke-width=".8" opacity=".35"/><ellipse cx="100" cy="72" rx="60" ry="30" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c2_drovergoad'] = [200, 150];
}
