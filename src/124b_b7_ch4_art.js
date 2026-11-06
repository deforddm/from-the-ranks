/* ============ Book Seven, Chapter 4 art: The Muster — the camp below Kravos Hill, a tent, the muster gate, the horse lines at night ============ */
/* Figure (FIGX) in the ~32px frame of 18/47b/80d, lit from the left:
     sorvan    the Bluerose lancer the cavalry left behind (the recruit): blue-enamelled scale laced in rows over a long riding coat,
               mended; riding boots; a cavalry sabre at the hip; a lance sawn short for fighting on foot; dark hair cut short, greying.
   The bust (POR.sorvan), as Ilsa's and Book Five's Perrit: lamp low left, a cool rim on the right; the blue scale in rows, the riding coat's
   collar turned up, a weathered face that trusts nobody's horse.
   Ground (TILEX.b7_c4_lines): Book Five's lines (b5_c6_lines) with three marks of this chapter's: 'H' a horse on its picket rope, 'w' the
   provost's wagon with its barred door, '^' the hill road going up between two posts.
   Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still), in Book Five's blue-grey, lamp-gold and
   dusk-green, gone military:
     b7_kravos          the camp below Kravos Hill at dusk: tents in rows up the slopes, the commanders' banners on the top, Edur fires on
                        the shoulder set apart, the Whitefinders' standard and the squad in the near lane
     b7_c4_tent         the Sixth's tent at night from inside: canvas, the pole, a lantern swinging, a blanket on the floor, the camp's
                        firelight through the canvas
     b7_c4_gate         the muster gate by day: a palisade, tables under striped awnings with clerks, the grey coat's table, a crowd beyond
                        the gate on the road
     b7_c4_horselines   the horse lines at night: two pickets of remounts, a lantern on a pole, the provost's wagon with its barred door
   Nothing grim close up. The chapter's gear in Book Five's 240×130 style on dark canal-slate with a thin dock-gold rim (the Letherii's items). */

/* ---------------- the figure ---------------- */
Object.assign(FIGX, {
  /* Sorvan: thirty-three, a rider's build; the blue-enamelled scale laced in rows to the hip over a long riding coat; riding boots; a sabre
     at the left hip; a lance sawn short, upright in the far hand; short dark hair gone grey at the sides */
  sorvan(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.04); const sw = o.still ? 0 : Math.sin(t/440 + (o.phase || 0));
    h.legs('#2e2a26'); ctx.fillStyle = '#1e1610'; ctx.fillRect(-4.6, 7.6, 3.6, 5.4); ctx.fillRect(1, 7.6, 3.6, 5.4); // riding boots to the knee
    poly(ctx, [[-6,-1],[6,-1],[7.4 + sw*.3,9.6],[-7.4 + sw*.3,9.6]], h.armor('#4a4038', '#1e1a16')); // the riding coat's skirts below the scale
    poly(ctx, [[-6.4,-6],[6.4,-6],[6.8,3.2],[-6.8,3.2]], h.armor('#4a6a9a', '#1a2438')); // the blue scale
    ctx.strokeStyle = 'rgba(10,16,30,.55)'; ctx.lineWidth = .55; for (let r = 0; r < 4; r++) { const yy = -4.4 + r*2.2; ctx.beginPath(); for (let k = 0; k < 6; k++) { const xx = -6 + k*2.4 + (r % 2)*1.2; ctx.moveTo(xx - 1.1, yy); ctx.quadraticCurveTo(xx, yy + 1.6, xx + 1.1, yy); } ctx.stroke(); } // the plates, in laced rows
    ctx.fillStyle = 'rgba(200,220,255,.16)'; ctx.fillRect(-6, -5.6, 1.3, 8.4); // lit edge
    ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-6.8, 2.6, 13.6, 1.3); ell(ctx, 0, 3.2, 1, .8, '#c9a35a'); // the belt, a brass buckle
    poly(ctx, [[-3.4,-6.6],[3.4,-6.6],[2.6,-4.6],[-2.6,-4.6]], '#3e362e'); // the coat's collar, turned up
    // the sabre at the left hip, in its scabbard, hilt forward
    B2F.line(ctx, '#2a2420', 1.5, [[-5.6, 3.6], [-9.4, 10.2]]); ell(ctx, -5.2, 3, 1.2, .9, '#b8a070');
    // the near arm down; the far arm up, holding the cut-down lance upright
    ctx.fillStyle = '#4a6a9a'; ctx.fillRect(-8, -5, 2.4, 3.4); ctx.fillStyle = '#3e362e'; ctx.fillRect(-8, -1.6, 2.4, 4.6); ell(ctx, -6.8, 3.6, 1.1, 1.1, '#b89878');
    ctx.fillStyle = '#4a6a9a'; ctx.fillRect(5.4, -5, 2.4, 3.4); ctx.fillStyle = '#3e362e'; ctx.fillRect(5.6, -1.6, 2.2, 2.4); ell(ctx, 7, .6, 1.1, 1.1, '#b89878');
    B2F.line(ctx, '#6a4a2a', 1.3, [[7.6, 10.6], [7.6, -16]]); poly(ctx, [[6.6,-16],[8.6,-16],[7.6,-21.4]], '#c8ccd4'); ctx.fillStyle = '#e8ecf4'; ctx.fillRect(7.4, -20, .5, 3.6); // the lance, sawn short, its head keen
    h.head('#b8946e', 4, -11.4); h.look('rgba(24,14,10,.86)', -11.6);
    ell(ctx, 0, -14.6, 4.3, 2.1, '#2a2420'); ctx.fillRect(-4.3, -14.6, 1.2, 3.2); ctx.fillRect(3.1, -14.6, 1.2, 3.2); ctx.fillStyle = 'rgba(190,190,196,.55)'; ctx.fillRect(-4.1, -13.2, 1, 2.2); ctx.fillRect(3.1, -13.2, 1, 2.2); // short dark hair, grey at the sides
    ctx.fillStyle = 'rgba(40,28,20,.6)'; ctx.fillRect(-1.6, -8.6, 3.2, .7); // a soldier's moustache, close-cut
    ctx.restore(); },
});

/* ---------------- the bust ---------------- */
POR.sorvan = function(ctx){ const F = {cy:-74, w:12.4, h:19.8, jaw:.88, chin:4.6, skin:'#b89470', iris:'#3a4250', lip:'#8a5a4c', browCol:'#2a2420', browW:1.35, arch:.4, browL:.6, browR:.7, rim:'#a8b8d8', rimA:.26, nose:1.1, look:.15, open:.86, smileL:-.15, smileR:-.05, mouthW:3.4, bags:.7, age:.45};
  PR.neck(ctx, F, 8.4);
  const B = BP.body(ctx, F, {wide:36, drop:5, trap:3, nx:11.6, ny:F.cy + 15, cb:-44, c1:'#4e6e9e', c2:'#141c2c'}); ctx.save(); B.path(); ctx.clip(); // the blue scale over the shoulders
    for (let r = 0; r < 9; r++) { const y = -44 + r*6.2; for (let k = -6; k <= 6; k++) { const x = k*6 + (r % 2)*3; ctx.beginPath(); ctx.moveTo(x - 3, y); ctx.quadraticCurveTo(x, y + 5, x + 3, y); ctx.lineWidth = .8; ctx.strokeStyle = 'rgba(8,12,24,.6)'; ctx.stroke();
        ctx.fillStyle = 'rgba(190,210,250,.10)'; ctx.fillRect(x - 2.2, y + .6, 1.2, 1.6); } } // the plates, laced in rows, each with a glint
    PR.stroke(ctx, 'rgba(60,40,24,.7)', 1.2, () => { for (let r = 0; r < 9; r++) { ctx.moveTo(-36, -41 + r*6.2); ctx.lineTo(36, -41 + r*6.2); } }); // the lacing
    PR.soft(ctx, -18, -36, 10, 6, '#dce8ff', .12); ctx.restore(); BP.light(ctx, F, B, false);
  BP.collar(ctx, F, '#5a4a3a', '#1e1812', 'rgba(20,14,8,.5)', {style:'fold', sw:22, sy:-42}); // the riding coat's collar turned up over the scale
  PR.face(ctx, F);
  PR.soft(ctx, -F.w*.32, F.cy + 7.4, 3, .9, '#3a2a20', .55); PR.soft(ctx, F.w*.32, F.cy + 7.4, 3, .9, '#3a2a20', .55); // the close-cut moustache
  PR.soft(ctx, -F.w*.62, F.cy - 1, 1.6, 3.2, '#8a6a50', .35); // an old scar by the eye, faded
  BP.hair(ctx, F, {c:['#3a322a', '#14100c', '#060504'], v:1.6, wx:1, hl:12, ey:-1.2, n:60, sw:.4, s:['#5a524a', '#1a1612', '#8a8a8e'], seed:124, sh:'#c8ccd8', shA:.24});
  PR.soft(ctx, -F.w*.82, F.cy - 6, 2.4, 4, '#9a9aa2', .55); PR.soft(ctx, F.w*.82, F.cy - 6, 2.4, 4, '#9a9aa2', .5); // grey at the sides
  return F; };

/* ---------------- the ground: Book Five's lines with a horse, a wagon and the hill road ---------------- */
TILEX.b7_c4_lines = (ctx, ch, x, y, T, dark) => {
  if (ch !== 'H' && ch !== 'w' && ch !== '^') return TILEX.b5_c6_lines(ctx, ch, x, y, T, dark);
  TILEX.b5_c6_lines(ctx, ',', x, y, T, dark);
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === 'H') { // a remount on its picket: the rope along the tile, a horse tethered to it
      ctx.strokeStyle = dark ? 'rgba(150,130,100,.6)' : 'rgba(110,86,56,.8)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.lineTo(px + T, py + T*.3); ctx.stroke();
      ell(ctx, px + T*.5, py + T*.9, T*.36, T*.07, 'rgba(0,0,0,.45)');
      const cols = dark ? ['#2a2018', '#3a3028', '#4a4844', '#1e1a16'] : ['#5a3e26', '#7a5a3a', '#8a8680', '#2e2620'];
      b41Horse(ctx, px + T*.44, py + T*.62, T/34, cols[Math.floor(hash(x, y, 1241)*4)], false, 0); return; }
    if (ch === 'w') { // the provost's wagon: high sides, the barred door at the back, a lantern on a pole
      ell(ctx, px + T*.5, py + T*.92, T*.46, T*.08, 'rgba(0,0,0,.5)');
      ctx.fillStyle = dark ? '#2a2018' : '#5a4228'; ctx.fillRect(px + T*.12, py + T*.2, T*.76, T*.56); ctx.fillStyle = dark ? '#1a120c' : '#3a2a18'; ctx.fillRect(px + T*.12, py + T*.2, T*.76, T*.06);
      ctx.fillStyle = '#0a0806'; ctx.fillRect(px + T*.36, py + T*.34, T*.28, T*.38); ctx.strokeStyle = dark ? '#6a6a70' : '#8a8a90'; ctx.lineWidth = Math.max(1, T*.03); for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px + T*(.36 + i*.07), py + T*.34); ctx.lineTo(px + T*(.36 + i*.07), py + T*.72); ctx.stroke(); } // the barred door
      ctx.fillStyle = dark ? '#1a120a' : '#3a2a18'; [.22, .78].forEach(k => { ctx.beginPath(); ctx.arc(px + T*k, py + T*.8, T*.12, 0, 7); ctx.fill(); }); // wheels
      if (dark) glow(ctx, px + T*.92, py + T*.14, T*.6, '#ffb060', .3); ctx.fillStyle = '#c9a35a'; ctx.fillRect(px + T*.9, py + T*.1, T*.06, T*.08); return; } // the lantern
    // '^' the hill road: a track going up between two posts, the banners far above
    ctx.fillStyle = dark ? 'rgba(90,80,60,.5)' : 'rgba(160,140,100,.6)'; ctx.beginPath(); ctx.moveTo(px + T*.3, py + T); ctx.lineTo(px + T*.44, py); ctx.lineTo(px + T*.62, py); ctx.lineTo(px + T*.74, py + T); ctx.closePath(); ctx.fill();
    ctx.fillStyle = dark ? '#2a2018' : '#4a3620'; ctx.fillRect(px + T*.18, py + T*.3, T*.08, T*.6); ctx.fillRect(px + T*.78, py + T*.3, T*.08, T*.6);
    ctx.fillStyle = '#8a2a2a'; ctx.fillRect(px + T*.5, py + T*.04, T*.12, T*.08); ctx.fillStyle = dark ? '#3a3a40' : '#6a6a70'; ctx.fillRect(px + T*.49, py + T*.04, T*.015, T*.2); }); }; // a banner, small, far up

/* ---------------- backdrops ---------------- */
/* the camp below Kravos Hill at dusk or dawn (120's caption; also the chapter card): sky, the hill with the commanders' banners on its top,
   tents in rows up the slopes, Edur fires on the shoulder set apart, the Whitefinders' lane near with its standard */
function b74Hill(x, W, H, dawn){ const hz = H*.5;
  x.fillStyle = vgrad(x, 0, hz, dawn ? [[0,'#3a4a66'],[.6,'#a89a9a'],[1,'#e0b890']] : [[0,'#141a2e'],[.6,'#4a3a4e'],[1,'#a06a52']]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 5; i++) { x.fillStyle = dawn ? 'rgba(240,210,190,.18)' : 'rgba(200,140,120,.16)'; x.beginPath(); x.ellipse(hash(i, 7411)*W, hz*(.2 + hash(i, 7412)*.4), W*.16, hz*.05, 0, 0, 7); x.fill(); }
  // the hill: a long rise from the left, its top at the middle-right, a shoulder below it to the right
  const top = H*.16; x.fillStyle = dawn ? '#3e4438' : '#1e2420'; x.beginPath(); x.moveTo(0, hz + H*.04); x.quadraticCurveTo(W*.34, hz - H*.06, W*.56, top); x.lineTo(W*.66, top + H*.01); x.quadraticCurveTo(W*.74, top + H*.1, W*.8, top + H*.16); x.quadraticCurveTo(W*.9, top + H*.2, W, hz - H*.04); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill();
  x.fillStyle = dawn ? 'rgba(255,230,200,.1)' : 'rgba(255,170,130,.08)'; x.beginPath(); x.moveTo(W*.56, top); x.lineTo(W*.66, top + H*.01); x.lineTo(W*.6, top + H*.06); x.closePath(); x.fill(); // the lit crest
  // tents in their thousands: rows of small pale triangles up the slopes
  for (let r = 0; r < 9; r++) { const yy = hz + H*.02 - r*H*.028, n = 26 - r*2; for (let i = 0; i < n; i++) { const xx = (i + (r % 2)*.5)/n*W*(.9 - r*.04) + W*.02; if (xx > W*.82 && r > 4) continue; const s = 4.2 - r*.32;
      x.fillStyle = dawn ? (hash(i, r, 7413) > .5 ? '#9a9484' : '#847e70') : (hash(i, r, 7413) > .5 ? '#4a4840' : '#3a3832'); x.beginPath(); x.moveTo(xx - s, yy); x.lineTo(xx, yy - s*1.1); x.lineTo(xx + s, yy); x.closePath(); x.fill(); } }
  // the near slope, the Whitefinders' lane, trodden
  x.fillStyle = vgrad(x, hz, H, dawn ? [[0,'#4a5236'],[1,'#2e3420']] : [[0,'#1e2418'],[1,'#10140c']]); x.fillRect(0, hz + H*.04, W, H - hz);
  x.fillStyle = dawn ? 'rgba(150,130,90,.5)' : 'rgba(80,70,50,.5)'; x.beginPath(); x.moveTo(W*.4, H); x.lineTo(W*.48, hz + H*.05); x.lineTo(W*.52, hz + H*.05); x.lineTo(W*.62, H); x.closePath(); x.fill();
  // near tents, larger, either side of the lane
  [[.06, .62, 1], [.2, .66, 1.2], [.76, .63, 1.1], [.9, .68, 1.3]].forEach(([k, yk, s]) => { const cx = W*k, cy = H*yk, w = W*.06*s, h = H*.08*s;
    x.fillStyle = dawn ? '#a8a290' : '#4a4840'; x.beginPath(); x.moveTo(cx - w, cy); x.lineTo(cx, cy - h); x.lineTo(cx + w, cy); x.closePath(); x.fill();
    x.fillStyle = dawn ? 'rgba(0,0,0,.18)' : 'rgba(0,0,0,.35)'; x.beginPath(); x.moveTo(cx, cy - h); x.lineTo(cx + w, cy); x.lineTo(cx + w*.1, cy); x.closePath(); x.fill(); x.fillStyle = '#100c08'; x.fillRect(cx - w*.12, cy - h*.36, w*.24, h*.36); });
  return {hz, top}; }
SCENEX.b7_kravos = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, dawn = !!(S && S.f && (S.f.b7_c4_ph || 0) >= 4), top = H*.16, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b74:hill' + (dawn ? 'd' : 'n'), W, H, (x, W, H) => { b74Hill(x, W, H, dawn); }), 0, 0, W, H);
  // the commanders' banners on the top, stirring
  [W*.57, W*.6, W*.63].forEach((bx, i) => { const by = top - H*.005, wv = mo ? Math.sin(t/500 + i)*1.4 : 0; ctx.fillStyle = '#2a2a2e'; ctx.fillRect(bx, by - H*.07, 1.2, H*.07);
    ctx.fillStyle = ['#8a2a2a', '#c9a35a', '#3a4a7a'][i]; ctx.beginPath(); ctx.moveTo(bx + 1.2, by - H*.07); ctx.lineTo(bx + W*.024, by - H*.064 + wv); ctx.lineTo(bx + 1.2, by - H*.052); ctx.closePath(); ctx.fill(); });
  // the Edur fires on the shoulder, apart, and their grey figures small
  if (!dawn) { ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 6; i++) { const ex = W*(.74 + i*.03), ey = top + H*(.15 + (i % 2)*.02); glow(ctx, ex, ey, 7, '#a8b4d0', .32*fl); glow(ctx, ex, ey, 1.6, '#e0e8ff', .8); } ctx.globalCompositeOperation = 'source-over'; }
  else for (let i = 0; i < 3; i++) { ctx.fillStyle = 'rgba(160,160,170,.35)'; ctx.fillRect(W*(.76 + i*.05), top + H*.12 - (mo ? (t/90 + i*20) % 14 : 6), 1, 4); } // the fires going out, smoke
  for (let i = 0; i < 4; i++) drawFigure(ctx, 'b5_edur', W*(.75 + i*.035), top + H*.17, .55, t, {still:true, dir:-1});
  // the Letherii fires down the slopes, small and many
  if (!dawn) { ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 18; i++) { const lx = hash(i, 7421)*W*.8, ly = H*(.36 + hash(i, 7422)*.14); glow(ctx, lx, ly, 5, '#ffb060', .28); } ctx.globalCompositeOperation = 'source-over'; }
  // the Whitefinders' standard in the lane: a pole, a pale banner with the white fingertip
  const sx = W*.56, sy = H*.84; ctx.fillStyle = '#2a2018'; ctx.fillRect(sx, sy - H*.22, 2, H*.22); ctx.fillStyle = '#5a6a7a'; ctx.fillRect(sx + 2, sy - H*.22, W*.05, H*.07); ell(ctx, sx + 2 + W*.025, sy - H*.185, 2.4, 3.2, '#f0eee6');
  // the Sixth's fire, near, and the squad round it
  const cx = W*.32, cy = H*.92; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.3, '#ff8a3a', (dawn ? .14 : .28)*fl); ctx.globalCompositeOperation = 'source-over';
  poly(ctx, [[cx - 6, cy], [cx - 2, cy - 10*fl], [cx + 1, cy - 4], [cx + 4, cy - 8*fl], [cx + 6, cy]], 'rgba(255,150,60,.95)');
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(24 + j*20), H*.97 - (j % 2)*3, 1.8, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, dawn ? .4 : .7, .55); };

/* the Sixth's tent at night, from inside: canvas walls sloping to the ridge, the pole, a lantern swinging on it, a blanket on the floor, the
   firelight of the camp outside showing through the canvas (B7READ[4]'s table scene) */
SCENEX.b7_c4_tent = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b74:tent', W, H, (x, W, H) => {
    x.fillStyle = '#1a1612'; x.fillRect(0, 0, W, H);
    // the canvas: two slopes up to the ridge, and the back wall, lit warm from inside
    poly(x, [[0, H*.7], [W*.5, H*.02], [W*.5, H*.14], [W*.14, H*.7]], '#4a4030'); poly(x, [[W, H*.7], [W*.5, H*.02], [W*.5, H*.14], [W*.86, H*.7]], '#3a3226');
    poly(x, [[W*.14, H*.7], [W*.5, H*.14], [W*.86, H*.7]], '#5a4e3a'); // the back wall
    x.strokeStyle = 'rgba(0,0,0,.25)'; x.lineWidth = 1; for (let i = 1; i < 6; i++) { x.beginPath(); x.moveTo(W*.5, H*.14); x.lineTo(W*(.14 + i*.12), H*.7); x.stroke(); } // the seams
    for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(255,170,90,.06)'; x.beginPath(); x.ellipse(W*(.2 + hash(i, 7431)*.6), H*(.4 + hash(i, 7432)*.2), W*.06, H*.05, 0, 0, 7); x.fill(); } // the camp's fires through the canvas
    // the floor: trodden grass, a ground-sheet, the blanket folded square in the middle
    x.fillStyle = vgrad(x, H*.7, H, [[0,'#2a2618'],[1,'#141208']]); x.fillRect(0, H*.7, W, H*.3);
    poly(x, [[W*.12, H], [W*.2, H*.74], [W*.8, H*.74], [W*.88, H]], '#3a3428');
    poly(x, [[W*.34, H*.94], [W*.38, H*.8], [W*.62, H*.8], [W*.66, H*.94]], '#5a4a6a'); x.strokeStyle = 'rgba(200,180,220,.25)'; x.beginPath(); x.moveTo(W*.36, H*.86); x.lineTo(W*.64, H*.86); x.stroke(); // the blanket
    // kit along the walls: packs, a shield with the white fingertip
    x.fillStyle = '#2e2618'; x.fillRect(W*.16, H*.74, W*.08, H*.08); x.fillRect(W*.78, H*.75, W*.07, H*.08);
    x.fillStyle = '#4a5a6a'; x.beginPath(); x.arc(W*.86, H*.68, H*.07, 0, 7); x.fill(); ell(x, W*.86, H*.68, 3, 4, '#f0eee6');
    // the pole, centre
    x.fillStyle = '#3a2a18'; x.fillRect(W*.495, H*.02, W*.012, H*.84); }), 0, 0, W, H);
  const sw = mo ? Math.sin(t/900)*.06 : 0, lx = W*.5 + Math.sin(sw)*H*.1, ly = H*.3 + (1 - Math.cos(sw))*H*.1, lf = mo ? .9 + .1*Math.sin(t/120) : 1;
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.55, '#ffc070', .3*lf); glow(ctx, lx, ly, 3, '#fff0c0', .9); ctx.globalCompositeOperation = 'source-over';
  B2F.line(ctx, '#1a1410', 1, [[W*.5, H*.2], [lx, ly - 5]]); ctx.fillStyle = '#c9a35a'; ctx.fillRect(lx - 3, ly - 5, 6, 8); ctx.fillStyle = 'rgba(255,240,190,.9)'; ctx.fillRect(lx - 1.6, ly - 3, 3.2, 4); // the lantern
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, W*.5 + side*(W*.2 + j*W*.07), H*.96 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .75, .45); };

/* the muster gate by day: a palisade across the back with the gate in it and the road beyond, a crowd on the road; inside, tables under
   striped awnings with clerks and a queue; one table with no battalion's colour, a grey coat at it */
SCENEX.b7_c4_gate = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.28, pb = H*.5;
  ctx.drawImage(sceneLayer('b74:gate', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#7a8ea6'],[1,'#c8c4b4']]); x.fillRect(0, 0, W, hz + 2);
    x.fillStyle = '#6a6a5a'; x.beginPath(); x.moveTo(0, hz); x.quadraticCurveTo(W*.3, hz - H*.05, W*.6, hz - H*.02); x.quadraticCurveTo(W*.8, hz - H*.06, W, hz - H*.01); x.lineTo(W, hz + 2); x.lineTo(0, hz + 2); x.fill(); // far hills
    x.fillStyle = vgrad(x, hz, pb, [[0,'#8a8462'],[1,'#6a6448']]); x.fillRect(0, hz, W, pb - hz); // the road country beyond
    x.fillStyle = '#a89a78'; poly(x, [[W*.44, pb], [W*.48, hz], [W*.52, hz], [W*.56, pb]], '#a89a78'); // the road
    // the palisade: stakes, with the gate gap in the middle
    for (let i = 0; i < 60; i++) { const sx = i/60*W, gap = sx > W*.42 && sx < W*.58; if (gap) continue; const h = H*(.16 + hash(i, 7441)*.02);
      x.fillStyle = i % 2 ? '#5a4630' : '#4a3a28'; x.fillRect(sx, pb - h, W/60 - 1, h); poly(x, [[sx, pb - h], [sx + W/120, pb - h - H*.02], [sx + W/60 - 1, pb - h]], i % 2 ? '#5a4630' : '#4a3a28'); }
    x.fillStyle = '#3a2a1a'; x.fillRect(W*.41, pb - H*.22, W*.012, H*.22); x.fillRect(W*.578, pb - H*.22, W*.012, H*.22); // the gateposts
    // the muster ground inside: trodden earth
    x.fillStyle = vgrad(x, pb, H, [[0,'#7a7056'],[1,'#5a523e']]); x.fillRect(0, pb, W, H - pb);
    // the tables under striped awnings, a row down the left
    [[.06, '#7a2a2a'], [.2, '#2a4a7a'], [.34, '#6a6a6a']].forEach(([k, col], i) => { const ax = W*k, ay = pb + H*.08, aw = W*.12;
      for (let s = 0; s < 4; s++) { x.fillStyle = s % 2 ? '#e4dcc8' : col; x.fillRect(ax + s*aw/4, ay, aw/4, H*.04); } // the awning
      x.fillStyle = '#3a2a1a'; x.fillRect(ax, ay, 2, H*.14); x.fillRect(ax + aw - 2, ay, 2, H*.14);
      x.fillStyle = '#6a5034'; x.fillRect(ax + aw*.1, ay + H*.1, aw*.8, H*.03); x.fillStyle = '#e8e0cc'; x.fillRect(ax + aw*.3, ay + H*.095, aw*.3, H*.012); }); // the table, a ledger open
    // a cart, right
    x.fillStyle = '#5a4228'; x.fillRect(W*.78, pb + H*.14, W*.14, H*.06); x.fillStyle = '#2a1e12'; x.beginPath(); x.arc(W*.8, pb + H*.21, H*.025, 0, 7); x.arc(W*.9, pb + H*.21, H*.025, 0, 7); x.fill(); }), 0, 0, W, H);
  // the crowd on the road beyond the gate, moving
  for (let i = 0; i < 16; i++) { const cx = W*(.4 + hash(i, 7451)*.2) + (mo ? Math.sin(t/700 + i)*2 : 0), cy = pb - H*(.01 + hash(i, 7452)*.06); ctx.fillStyle = ['#5a4a3a', '#4a4a4a', '#6a5a44', '#3a3430'][i % 4]; ctx.fillRect(cx - 2, cy - 7, 4, 7); ell(ctx, cx, cy - 8.6, 1.8, 1.8, '#a8886a'); }
  drawFigure(ctx, 'b5_letherii', W*.5, pb + H*.03, 1.1, t, {still:true, dir:-1}); // the press-gang's sergeant at the gate
  drawFigure(ctx, 'b7_agent', W*.39, pb + H*.24, 1.25, t, {still:true, dir:1}); // the grey coat at the table with no battalion
  drawFigure(ctx, 'b5_c1_clerk', W*.25, pb + H*.24, 1.2, t, {still:true, dir:1});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.9 - i*Math.min(.06, .34/sq.length)), H*.96 - (i % 2)*2, 1.7, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .32, .5); };

/* the horse lines at night: two pickets of remounts in the dark, a lantern on a pole, the provost's wagon with its barred door open, grey
   coats on its tailboard */
SCENEX.b7_c4_horselines = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.38;
  ctx.drawImage(sceneLayer('b74:horse', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#060812'],[1,'#141a28']]); x.fillRect(0, 0, W, hz + 2); for (let i = 0; i < 50; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 7461)*.4).toFixed(2)})`; x.fillRect(hash(i, 7462)*W, Math.pow(hash(i, 7463), 1.4)*hz*.8, 1, 1); }
    x.fillStyle = '#0e120e'; x.beginPath(); x.moveTo(0, hz); x.quadraticCurveTo(W*.3, hz - H*.12, W*.5, hz - H*.16); x.quadraticCurveTo(W*.7, hz - H*.1, W, hz - H*.02); x.lineTo(W, hz + 2); x.lineTo(0, hz + 2); x.fill(); // the hill's dark
    for (let i = 0; i < 12; i++) { x.fillStyle = 'rgba(255,180,100,.5)'; x.fillRect(hash(i, 7464)*W, hz - H*(.02 + hash(i, 7465)*.1), 2, 2); } // fires far up the slope
    x.fillStyle = vgrad(x, hz, H, [[0,'#141810'],[1,'#0a0c08']]); x.fillRect(0, hz, W, H - hz);
    // two picket ropes, far and near
    [[hz + H*.12, .6], [hz + H*.3, 1]].forEach(([py, s], r) => { x.strokeStyle = 'rgba(140,120,90,.5)'; x.lineWidth = 1; x.beginPath(); x.moveTo(W*.02, py); x.lineTo(W*.66, py); x.stroke();
      for (let i = 0; i < 9 - r*2; i++) { const hx = W*(.06 + i*(.62/(9 - r*2))), cols = ['#2a2018', '#3a3028', '#4a4844', '#1e1a16']; b41Horse(x, hx, py + H*.06*s, s*1.5, cols[i % 4], false, 0); } });
    // the provost's wagon, right: high sides, the barred door at the back standing open
    const wx = W*.74, wy = H*.6; x.fillStyle = '#2a2018'; x.fillRect(wx, wy, W*.2, H*.16); x.fillStyle = '#1a120c'; x.fillRect(wx, wy, W*.2, H*.02);
    x.fillStyle = '#080604'; x.fillRect(wx + W*.06, wy + H*.03, W*.08, H*.12); // the doorway, dark
    x.fillStyle = '#3a3a40'; x.save(); x.translate(wx + W*.06, wy + H*.03); x.rotate(-.5); x.fillRect(-W*.07, 0, W*.07, H*.12); x.restore(); // the door, swung open
    x.strokeStyle = '#6a6a70'; x.lineWidth = 1.4; x.save(); x.translate(wx + W*.06, wy + H*.03); x.rotate(-.5); for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(-i*W*.017, 0); x.lineTo(-i*W*.017, H*.12); x.stroke(); } x.restore(); // its bars
    x.fillStyle = '#1a120a'; x.beginPath(); x.arc(wx + W*.03, wy + H*.17, H*.03, 0, 7); x.arc(wx + W*.17, wy + H*.17, H*.03, 0, 7); x.fill(); }), 0, 0, W, H);
  // the lantern on its pole by the wagon
  const lx = W*.7, ly = H*.48, lf = mo ? .85 + .15*Math.sin(t/650) + .05*Math.sin(t/53) : 1;
  ctx.fillStyle = '#1a1410'; ctx.fillRect(lx - 1, ly, 2, H*.3); ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.32, '#ffb060', .3*lf); glow(ctx, lx, ly, 2.4, '#ffe0a0', .9*lf); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#c9a35a'; ctx.fillRect(lx - 3, ly - 4, 6, 7);
  // a horse tossing its head on the near line
  if (mo && Math.sin(t/1300) > .7) { ctx.fillStyle = 'rgba(200,190,170,.15)'; ctx.beginPath(); ctx.arc(W*.3, H*.66, 6, 0, 7); ctx.fill(); }
  // the grey coats on the tailboard, and the enforcer by the wheel
  drawFigure(ctx, 'b7_agent', W*.8, H*.76, 1.15, t, {still:true, dir:-1}); drawFigure(ctx, 'b7_agent', W*.86, H*.76, 1.15, t, {still:true, dir:-1}); drawFigure(ctx, 'bruiser', W*.93, H*.8, 1.2, t, {still:true, dir:-1});
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.08 + i*Math.min(.07, .4/sq.length)), H*.96 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .8, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Five's ground ----------------
   240×130, the same flat shapes and single highlight as Book Five, on dark canal-slate with a thin dock-gold rim (the Letherii's items) */
function b74Item(key, label, body){ const w = 240, h = 130, id = 'c74-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#34444a"></stop><stop offset=".7" stop-color="#1a2428"></stop><stop offset="1" stop-color="#0e1214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
if (typeof ART !== 'undefined') {
/* a Bluerose lance, cut down: a dark ash shaft sawn off square, a long leaf-shaped iron head, an empty pennon-ring below it */
b74Item('b7_c4_bluelance', 'A Bluerose lance, cut down', '<ellipse cx="120" cy="100" rx="96" ry="6" fill="#000" opacity=".35"/><g transform="rotate(-14 120 66)">'
  + '<rect x="22" y="62" width="150" height="8" rx="2" fill="#5a3e24"/><path d="M24 63.5 L170 63.5" stroke="#8a6a44" stroke-width="1.4" opacity=".7"/><rect x="20" y="61" width="4" height="10" fill="#3a2a18"/>'
  + '<path d="M60 62 L60 70 M100 62 L100 70" stroke="#3a2614" stroke-width="1" opacity=".6"/>'
  + '<rect x="170" y="60" width="10" height="12" rx="1.6" fill="#6a6e76"/><circle cx="168" cy="74" r="4.4" fill="none" stroke="#8a8e96" stroke-width="1.6"/>'
  + '<path d="M180 59 L214 63 Q222 66 214 69 L180 73 Z" fill="#c8ccd4"/><path d="M182 60.8 L214 64.2" stroke="#f4f6fa" stroke-width="1.2"/><path d="M182 71.6 L212 68.4" stroke="#6a6e76" stroke-width="1"/>'
  + '</g>');
/* Bluerose scale: a shirt of blue-enamelled plates laced in rows, laid flat, the lacing showing at the hem, one plate chipped to the iron */
b74Item('b7_c4_bluescale', 'Bluerose scale', '<ellipse cx="120" cy="114" rx="76" ry="6" fill="#000" opacity=".35"/>'
  + '<path d="M70 26 Q120 18 170 26 L182 44 L172 48 L170 108 Q120 114 70 108 L68 48 L58 44 Z" fill="#2a3a5a"/>'
  + Array.from({length:7}, (_, r) => Array.from({length:10}, (_, k) => { const x = 74 + k*10 + (r % 2)*5, y = 32 + r*11; if (x > 170) return ''; return `<path d="M${x - 5} ${y} Q${x} ${y + 9} ${x + 5} ${y} Z" fill="${(r + k) % 5 === 3 ? '#3e5c8e' : '#4a6a9e'}" stroke="#141c2c" stroke-width=".8"/><path d="M${x - 3} ${y + 1} L${x - 2} ${y + 3}" stroke="#c8d8f8" stroke-width=".8" opacity=".5"/>`; }).join('')).join('')
  + '<path d="M118 76 Q121 82 124 76" fill="#6a6e76"/>'
  + '<path d="M70 108 Q120 114 170 108" fill="none" stroke="#6a4a2a" stroke-width="2"/>' + [80, 96, 112, 128, 144, 160].map(x => `<path d="M${x} 109 L${x - 2} 116" stroke="#6a4a2a" stroke-width="1.4"/>`).join('')
  + '<path d="M74 30 Q120 22 166 30" fill="none" stroke="#e0ecff" stroke-width="1.4" opacity=".25"/>');
/* a muster badge: a lead tag on a cord, the white fingertip stamped in it and the Edur's mark struck crooked over it */
b74Item('b7_c4_musterbadge', 'A muster badge', '<ellipse cx="120" cy="104" rx="50" ry="5" fill="#000" opacity=".35"/>'
  + '<path d="M84 18 Q120 6 156 18 Q150 30 132 42" fill="none" stroke="#6a5034" stroke-width="2.4"/><path d="M84 18 Q96 34 108 42" fill="none" stroke="#6a5034" stroke-width="2.4"/>'
  + '<rect x="96" y="40" width="48" height="58" rx="6" fill="#7a7c80"/><rect x="99" y="43" width="42" height="52" rx="5" fill="none" stroke="#5a5c60" stroke-width="1.4"/><circle cx="120" cy="45" r="3" fill="#1a2428"/>'
  + '<path d="M120 52 L120 76" stroke="#e8e6de" stroke-width="5" stroke-linecap="round"/><path d="M115 74 Q120 84 125 74" fill="#e8e6de"/>'
  + '<g transform="rotate(-9 120 70)"><path d="M104 62 L136 62 M120 56 L120 88 M108 80 L132 80" stroke="#2a2c30" stroke-width="2.4"/><circle cx="120" cy="70" r="9" fill="none" stroke="#2a2c30" stroke-width="2"/></g>'
  + '<path d="M100 46 L104 92" stroke="#fff" stroke-width="1" opacity=".3"/>');
}
