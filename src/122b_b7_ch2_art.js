/* ============ Book Seven, Chapter 2 art: The File — Letheras watched: the barracks under Edur eyes, a shuttered street, an alley, a bridge ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d, lit from the left:
     ilsa      the Patriotist clerk who comes to the squad (the recruit): thin, a desk stoop, a long grey clerk's coat to the knee, ink to the
               wrist on both cuffs, dark hair tied low at the neck, a penknife at the breast and a long knife at the belt she has not used.
     b7_agent  a Patriotist agent (the engine's b7_agent wears it from this chapter): a good grey coat buttoned high, a low grey hat, one hand
               hidden in the sleeve where the knife lives, a folder under the other arm.
   The bust (POR.ilsa), as Book Five's Perrit: lamp low left, a cool rim on the right; the grey coat's high collar, ink on the cuff she holds up.
   Five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still), in Book Five's blue-grey, canal-green,
   lamp-gold and wet stone, gone shuttered:
     b7_barracks         the Whitefinders' yard at night: eaves both sides with fewer lamps than there were, the city over the wall, and in
                         the gate arch two grey Edur, standing very still; the squad at the brazier with its back to them
     b7_c2_greymorning   the same yard by a grey morning: no lamps, the brazier cold, and in the open gate a man in a good grey coat with two
                         enforcers behind him
     b7_letheras         a street off the canal by day: shutters closed all down the row, a broadsheet torn off a wall, a shutter open a
                         hand's width across the way, the canal below
     b7_c2_alley         an alley off the canal at dusk: two blind walls in perspective, one lamp at the bend, a door at the end, grey coats
     b7_c2_bridge        a stone canal bridge at night: the arch over the water, lanterns at the far end, grey coats at the parapet
   Nothing grim close up. The chapter's gear in Book Five's 240×130 style on dark canal-slate with a thin dock-gold rim (the Letherii's items). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Ilsa: twenty-eight, thin, a desk stoop; the long grey clerk's coat, buttoned, to the knee; ink-black cuffs; dark hair tied low; a
     penknife clipped at the breast, a long knife in a plain sheath at the hip, worn high and a little wrong, as by somebody new to it */
  ilsa(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .9, 1.02); const sw = o.still ? 0 : Math.sin(t/420 + (o.phase || 0));
    h.legs('#2a2a30'); ctx.fillStyle = '#1a1a1e'; ctx.fillRect(-4.4, 10.8, 3.4, 2.2); ctx.fillRect(1, 10.8, 3.4, 2.2); // plain shoes
    poly(ctx, [[-5.6,-6],[5.6,-6],[7.2 + sw*.3,10.6],[-7.2 + sw*.3,10.6]], h.armor('#7a7c84', '#2a2a30')); // the long grey coat
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-.4, -6, .8, 16.6); for (let i = 0; i < 5; i++) { ell(ctx, 1.1, -4.4 + i*2.6, .45, .45, '#c8c8d0'); } // the closure, buttons to the throat
    ctx.fillStyle = 'rgba(230,232,240,.14)'; ctx.fillRect(-5.2, -5.4, 1.2, 15); // lit edge
    ctx.fillStyle = '#5a5c64'; poly(ctx, [[-3.2,-6.4],[3.2,-6.4],[2.4,-4.4],[-2.4,-4.4]], '#5a5c64'); // the high collar
    // the long knife, worn high on the left hip, plain sheath
    B2F.line(ctx, '#2a1e14', 1.6, [[-5.8, 2.6], [-8.6, 9.4]]); ell(ctx, -5.6, 2.2, 1, .8, '#8a8a90');
    // the penknife clipped at the breast
    ctx.fillStyle = '#c9a35a'; ctx.fillRect(2.6, -3.4, .6, 2.2);
    // arms: the near one down, the hand ink-black at the cuff; the far one bent, holding the coat closed
    ctx.fillStyle = '#6a6c74'; ctx.fillRect(-7.6, -5, 2.2, 7.4); ctx.fillStyle = '#121216'; ctx.fillRect(-7.6, 1.8, 2.2, 1.4); ell(ctx, -6.5, 3.8, 1.1, 1.1, '#c8a890');
    ctx.fillStyle = '#6a6c74'; ctx.fillRect(5.2, -5, 2.2, 5); ctx.fillStyle = '#121216'; ctx.fillRect(4, -.6, 2.6, 1.3); ell(ctx, 3.8, .2, 1, 1, '#c8a890');
    h.head('#d0b29c', 3.9, -11.4); h.look('rgba(24,14,10,.84)', -11.6);
    B2F.cap(ctx, '#2a1e18', 4.1, -12.5, 1.02, 1.9); ell(ctx, -.6, -9.2, 1.6, 1.3, '#2a1e18'); // dark hair, tied low behind
    ctx.fillStyle = 'rgba(30,30,40,.5)'; ctx.fillRect(2.4, -9.6, 1, .6); // an ink smudge on the cheek
    ctx.restore(); },
  /* a Patriotist agent: a good grey coat buttoned high, a low-crowned grey hat, the knife hand in the sleeve, a folder under the arm */
  b7_agent(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.02);
    h.legs('#26262a'); ctx.fillStyle = '#121214'; ctx.fillRect(-4.6, 10.8, 3.6, 2.2); ctx.fillRect(1, 10.8, 3.6, 2.2);
    poly(ctx, [[-6,-6],[6,-6],[7,10.4],[-7,10.4]], h.armor('#6e7078', '#22242a')); ctx.fillStyle = 'rgba(0,0,0,.32)'; ctx.fillRect(-.5, -6, 1, 16.4); // the coat
    ctx.fillStyle = 'rgba(230,232,240,.12)'; ctx.fillRect(-5.6, -5.4, 1.2, 15);
    ctx.fillStyle = '#4a4c54'; ctx.fillRect(-6.4, 3.2, 12.8, 1.1); // a grey belt
    // the folder under the near arm, tied with grey tape
    poly(ctx, [[-10.2,-3],[-3.6,-4],[-3.2,2],[-9.8,3]], '#8a8070'); ctx.fillStyle = '#5a5c62'; ctx.fillRect(-9.6, -1, 6.2, .7);
    ctx.fillStyle = '#62646c'; ctx.fillRect(-8, -5, 2.2, 5); ell(ctx, -6.9, 0, 1, 1, '#b8987e');
    // the far arm, the hand gone into the sleeve; the tip of a thin blade just showing
    ctx.fillStyle = '#62646c'; ctx.fillRect(5.4, -5, 2.4, 7.6); B2F.line(ctx, '#d8dce4', .6, [[6.6, 2.6], [7.4, 5.6]]);
    h.head('#c09a7e', 4.2, -11.2); h.look('rgba(24,14,10,.86)', -11.4);
    // the low-crowned hat, a short brim
    ctx.fillStyle = '#4a4c54'; ctx.fillRect(-6.4, -13.6, 12.8, 1.4); ctx.fillStyle = '#5a5c64'; ctx.beginPath(); ctx.moveTo(-4.4, -13.6); ctx.lineTo(-4, -17.4); ctx.lineTo(4, -17.4); ctx.lineTo(4.4, -13.6); ctx.fill();
    ctx.fillStyle = '#2a2c32'; ctx.fillRect(-4.3, -14.6, 8.6, .9); ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.fillRect(-4, -17.2, 2.2, 3.4);
    ctx.restore(); },
});

/* ---------------- the bust ---------------- */
POR.ilsa = function(ctx){ const F = {cy:-74, w:11.6, h:19.4, jaw:.7, chin:4.2, skin:'#d2b29a', iris:'#3a3428', lip:'#9a6460', browCol:'#2a1e18', browW:1.15, arch:1, browL:.4, browR:.55, rim:'#a8b0c8', rimA:.26, nose:.95, look:-.2, open:.92, smileL:-.1, smileR:.05, mouthW:3.2, bags:.55, age:.15};
  PR.neck(ctx, F, 7.6);
  const B = BP.body(ctx, F, {wide:31, drop:2, v:true, nx:F.w*.66 + 2.6, ny:F.cy + 14, cb:-46.4, c1:'#7c7e86', c2:'#18181e'}); ctx.save(); B.path(); ctx.clip(); // the grey clerk's coat, buttoned to the throat
    PR.stroke(ctx, 'rgba(0,0,0,.5)', 1.3, () => { ctx.moveTo(.6, -46); ctx.quadraticCurveTo(3, -20, 3, 6); });
    for (let i = 0; i < 6; i++){ const y = -42 + i*7.6, x = 1.2 + Math.sin((y + 46)/52*1.4)*1.6; ell(ctx, x, y, 1.15, 1.15, PR.rad(ctx, x - .4, y - .4, .1, 1.2, [[0, '#e8e8f0'], [1, '#5a5c66']])); } // the buttons
    PR.stroke(ctx, 'rgba(0,0,0,.35)', .8, () => { ctx.moveTo(-15, -30); ctx.quadraticCurveTo(-17, -12, -15, 6); ctx.moveTo(19, -30); ctx.quadraticCurveTo(21, -12, 19, 6); }); // the coat's fall
    PR.soft(ctx, -14, -2, 7, 4, '#2a2a32', .5); // the shine at the elbow-crease, worn
    ctx.fillStyle = 'rgba(30,26,22,.55)'; ctx.fillRect(9, -30, 7, 2); ctx.fillStyle = '#c9a35a'; ctx.fillRect(10, -38, 1.4, 9); // the penknife's clip at the breast
    PR.soft(ctx, -18, -36, 10, 6, '#e8ecf8', .1); ctx.restore(); BP.light(ctx, F, B, true);
  // the high collar, stood up close round the throat
  [-1, 1].forEach(sd => { ctx.beginPath(); ctx.moveTo(sd*2, -47); ctx.quadraticCurveTo(sd*(F.w*.62), -48.6, sd*(F.w*.62 + 1.4), -54); ctx.lineTo(sd*(F.w*.62 + 3.2), -46); ctx.quadraticCurveTo(sd*9, -44, sd*2, -44.6); ctx.closePath(); ctx.fillStyle = PR.lit(ctx, '#8a8c94', '#24242a', -F.w, F.w); ctx.fill(); });
  // the near hand raised a little at the bottom edge, its cuff black with ink
  ctx.save(); ctx.translate(-26, -2); ctx.rotate(-.18); ctx.fillStyle = PR.lin(ctx, -6, -4, 6, 4, [[0, '#6e7078'], [1, '#2a2a30']]); ctx.fillRect(-7, -4, 14, 9); ctx.fillStyle = PR.lin(ctx, -6, -2, 6, 2, [[0, '#18181e'], [1, '#060608']]); ctx.fillRect(-7, -5.6, 14, 3.2); // the inked cuff
    PR.soft(ctx, 0, -9, 6, 4, '#d2b29a', .95); PR.soft(ctx, -2, -10, 3, 2, '#f0d8c4', .4); ctx.restore();
  PR.face(ctx, F);
  const u = F.h/20, top = F.cy - 21*u;
  BP.hair(ctx, F, {c:['#4a3628', '#1e140e', '#080504'], v:1.5, wx:.8, hl:12.8, ey:-2.2, n:76, sw:.45, s:['#3a2a1e', '#100a06', '#5a4434'], seed:121, sh:'#c8b8c0', shA:.22});
  ell(ctx, -F.w*.2, top + F.h*.9, 3.6, 2.6, PR.rad(ctx, -F.w*.3, top + F.h*.86, .4, 4, [[0, '#4a3628'], [1, '#0c0806']])); // the knot, tied low behind
  PR.soft(ctx, F.w*.34, F.cy + 3, 1.4, .8, '#2a2a3a', .45); // an ink smudge on the cheek
  return F; };

/* ---------------- backdrops ---------------- */
/* the yard (night or a grey morning): sky, the city over the wall, the yard wall, the eaves down both sides, the flags, the gate arch at the right */
function b72Yard(x, W, H, day){ const hz = H*.44;
  x.fillStyle = vgrad(x, 0, hz, day ? [[0,'#7a828e'],[.7,'#a2a6aa'],[1,'#b4b2aa']] : [[0,'#060912'],[.7,'#12172a'],[1,'#1c2032']]); x.fillRect(0, 0, W, hz + 2);
  if (!day) for (let i = 0; i < 50; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 7211)*.4).toFixed(2)})`; x.fillRect(hash(i, 7212)*W, Math.pow(hash(i, 7213), 1.4)*hz*.7, 1, 1); }
  else for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(214,216,220,.4)'; x.beginPath(); x.ellipse(hash(i, 7214)*W, hz*(.15 + hash(i, 7215)*.45), W*.14, hz*.07, 0, 0, 7); x.fill(); }
  b51Skyline(x, W, hz - H*.07, H*.12, day ? '#6a6e78' : '#0e1018', day ? null : '255,196,130', day ? 'rgba(120,124,132,.7)' : 'rgba(60,64,80,.6)'); // the city over the wall
  x.fillStyle = day ? '#5a5c62' : '#20222a'; x.fillRect(0, hz - H*.07, W, H*.07 + 2); x.fillStyle = day ? 'rgba(240,240,236,.14)' : 'rgba(150,165,210,.1)'; x.fillRect(0, hz - H*.07, W, 1); // the yard wall
  x.fillStyle = vgrad(x, hz, H, day ? [[0,'#6a6a6c'],[1,'#3e3e42']] : [[0,'#1c1e24'],[1,'#101116']]); x.fillRect(0, hz, W, H - hz); // the flags
  x.strokeStyle = day ? 'rgba(20,20,24,.25)' : 'rgba(0,0,0,.35)'; x.lineWidth = 1; for (let r = 0; r < 8; r++) { const yy = hz + Math.pow(r/8, 1.4)*(H - hz); x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); }
  for (let c = -6; c <= 6; c++) { x.beginPath(); x.moveTo(W/2 + c*W*.03, hz); x.lineTo(W/2 + c*W*.22, H); x.stroke(); }
  // the eaves down the left, and a short run on the right before the gate
  [[0, .26], [.74, .82]].forEach(([a, b], s) => { const x0 = W*a, x1 = W*b, top = hz - H*.04, bot = hz + H*.2;
    x.fillStyle = day ? '#4a5260' : '#242e3a'; x.fillRect(x0, top - H*.04, x1 - x0, H*.06); // slate
    x.fillStyle = day ? '#56545c' : '#28262e'; x.fillRect(x0, top + H*.02, x1 - x0, bot - top);
    for (let i = 0; i < 4; i++) { const wx = lerp(x0, x1, (i + .5)/4); if (wx > x1 - 4) continue; const lit = !day && hash(i, s + 7216) > .62; // fewer lamps than there were
      x.fillStyle = lit ? 'rgba(255,192,112,.85)' : (day ? '#2e2c30' : '#141218'); x.fillRect(wx - 3, top + H*.07, 6, 7); x.fillStyle = day ? '#3a3a40' : '#1e1c22'; x.fillRect(wx - 4, top + H*.07, 1.4, 7); x.fillRect(wx + 2.6, top + H*.07, 1.4, 7); } }); // shutters
  // the gate arch, right: stone piers and the arch, the lane beyond
  const gx0 = W*.84, gx1 = W*.98, gt = hz - H*.16, gb = hz + H*.16;
  x.fillStyle = day ? '#8a8a88' : '#1a1a20'; x.fillRect(gx0 + W*.025, gt + H*.05, gx1 - gx0 - W*.05, gb - gt - H*.05); // the opening: the lane, lighter by day
  x.fillStyle = day ? '#5e5c5a' : '#2a2a30'; x.fillRect(gx0, gt, W*.025, gb - gt); x.fillRect(gx1 - W*.025, gt, W*.025, gb - gt); // the piers
  x.beginPath(); x.moveTo(gx0, gt + H*.05); x.quadraticCurveTo((gx0 + gx1)/2, gt - H*.04, gx1, gt + H*.05); x.lineTo(gx1, gt); x.lineTo(gx0, gt); x.closePath(); x.fill();
  x.fillStyle = day ? 'rgba(255,255,255,.08)' : 'rgba(150,165,210,.08)'; x.fillRect(gx0, gt, 2, gb - gt);
  return {hz, gx:(gx0 + gx1)/2, gb}; }

/* the Whitefinders' yard at night (120's caption; B7READ[2]'s table scene): fewer lamps, the city over the wall, two grey Edur in the gate */
SCENEX.b7_barracks = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t); let g = null;
  ctx.drawImage(sceneLayer('b72:yard', W, H, (x, W, H) => { g = b72Yard(x, W, H, false); }), 0, 0, W, H);
  const hz = H*.44, gx = W*.91, gb = hz + H*.16;
  // a few lamps in the city over the wall
  ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 4; i++) { const lx = W*(.3 + hash(i, 7221)*.4), ly = hz - H*.09 - hash(i, 7222)*H*.05; glow(ctx, lx, ly, 9, '#ffc890', .28); } ctx.globalCompositeOperation = 'source-over';
  // the Edur in the gate: two grey figures, one each side of the arch, still
  drawFigure(ctx, 'b5_edur', gx - W*.035, gb, Math.max(1, H/230), t, {still:true, dir:-1}); drawFigure(ctx, 'b5_edur', gx + W*.035, gb, Math.max(1, H/230), t, {still:true, dir:-1});
  // the Finadd's lamp under the eaves, left
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.12, hz + H*.14, H*.14, '#ffc070', .26); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#c9a35a'; ctx.fillRect(W*.11, hz + H*.1, 3, 6);
  // the brazier, near, the squad round it with its back to the gate
  const cx = W*.46, cy = H*.9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.36, '#ff8a3a', .28*fl); ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#2a2a2e'; ctx.fillRect(cx - 9, cy - 2, 18, 5); ctx.fillStyle = '#1a1a1e'; ctx.fillRect(cx - 7, cy + 3, 2, 6); ctx.fillRect(cx + 5, cy + 3, 2, 6); // the iron brazier
  poly(ctx, [[cx - 7, cy - 2], [cx - 2, cy - 14*fl], [cx + 1, cy - 6], [cx + 4, cy - 11*fl], [cx + 7, cy - 2]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - 3, cy - 2], [cx, cy - 8*fl], [cx + 3, cy - 2]], 'rgba(255,230,150,.95)');
  if (mo) for (let i = 0; i < 4; i++) { const k = ((t/1500 + i/4) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*4, cy - 12 - k*26, 1, 1); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(26 + j*22), H*.97 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .8, .55); };

/* the same yard by a grey morning: no lamps, the brazier cold, a man in a good grey coat in the open gate with two enforcers behind */
SCENEX.b7_c2_greymorning = (cv, t) => { const {ctx, W, H} = sceneFit(cv);
  ctx.drawImage(sceneLayer('b72:yardday', W, H, (x, W, H) => { b72Yard(x, W, H, true); }), 0, 0, W, H);
  const hz = H*.44, gx = W*.91, gb = hz + H*.16, k = Math.max(1, H/230);
  drawFigure(ctx, 'b5_edur', gx - W*.05, gb, k, t, {still:true, dir:-1}); drawFigure(ctx, 'b5_edur', gx + W*.05, gb, k, t, {still:true, dir:-1}); // the Edur, stood aside
  drawFigure(ctx, 'bruiser', W*.8, hz + H*.22, k*1.15, t, {still:true, dir:-1}); drawFigure(ctx, 'bruiser', W*.86, hz + H*.25, k*1.15, t, {still:true, dir:-1}); // the enforcers
  drawFigure(ctx, 'b7_agent', W*.72, hz + H*.26, k*1.25, t, {still:true, dir:-1}); // the man in the grey coat, in the yard as if he owned the flagstones
  const cx = W*.46, cy = H*.9; ctx.fillStyle = '#2a2a2e'; ctx.fillRect(cx - 9, cy - 2, 18, 5); ctx.fillStyle = '#1a1a1e'; ctx.fillRect(cx - 7, cy + 3, 2, 6); ctx.fillRect(cx + 5, cy + 3, 2, 6); ell(ctx, cx, cy - 2, 7, 1.6, '#4a4844'); // the brazier, cold
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.1 + i*Math.min(.075, .42/sq.length)), H*.96 - (i % 2)*3, 1.85, t, {phase:i, dir:1}));
  vign(ctx, W, H, .45, .5); };

/* a street off the canal by day (120's caption): shutters closed in the middle of the day, a broadsheet torn off a wall, a shutter open a
   hand's width across the way with a face at it, the canal below with the steps going down */
SCENEX.b7_letheras = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.18, wl = H*.74;
  ctx.drawImage(sceneLayer('b72:street', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#8a96a4'],[1,'#c4c4bc']]); x.fillRect(0, 0, W, hz + 2); // a hazy summer sky
    b51Skyline(x, W, hz, H*.08, '#6a6e76', null, 'rgba(120,120,126,.7)');
    // the row of houses across the lane: plaster over stone, two storeys, every shutter shut
    const ft = hz, fb = H*.56; x.fillStyle = vgrad(x, ft, fb, [[0,'#9a9488'],[1,'#7a746a']]); x.fillRect(0, ft, W, fb - ft);
    for (let i = 0; i < 7; i++) { const hx = i*W/7; x.fillStyle = i % 2 ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.04)'; x.fillRect(hx, ft, W/7, fb - ft); x.fillStyle = 'rgba(40,36,30,.5)'; x.fillRect(hx, ft, 1, fb - ft); // party walls
      for (let r = 0; r < 2; r++) { const wx = hx + W*.035, wy = ft + H*(.06 + r*.15), ww = W*.07, wh = H*.08, open = i === 4 && r === 0;
        x.fillStyle = '#2a2622'; x.fillRect(wx, wy, ww, wh); if (open) { x.fillStyle = '#100e0c'; x.fillRect(wx + ww*.42, wy, ww*.16, wh); } // the frame, and the one shutter open a hand's width
        x.fillStyle = ['#4a5a5a', '#5a4e40', '#4a4a54'][(i + r) % 3]; x.fillRect(wx + 1, wy + 1, open ? ww*.42 - 1 : ww/2 - 1.5, wh - 2); x.fillRect(open ? wx + ww*.58 : wx + ww/2 + .5, wy + 1, open ? ww*.42 - 1 : ww/2 - 1.5, wh - 2);
        x.strokeStyle = 'rgba(0,0,0,.3)'; x.lineWidth = .6; for (let s = 1; s < 4; s++) { x.beginPath(); x.moveTo(wx + 1, wy + s*wh/4); x.lineTo(wx + ww - 1, wy + s*wh/4); x.stroke(); } } // slats
      x.fillStyle = '#3a2e22'; x.fillRect(hx + W*.05, fb - H*.12, W*.04, H*.12); } // doors, shut
    x.fillStyle = '#5a5248'; x.fillRect(0, ft - H*.012, W, H*.014); // the cornice
    // the broadsheet on the wall, left, half torn off: black type on pale paper, the torn corner hanging
    const bx = W*.08, by = H*.42; x.fillStyle = '#e4dcc8'; poly(x, [[bx, by], [bx + W*.1, by], [bx + W*.1, by + H*.05], [bx + W*.06, by + H*.1], [bx, by + H*.1]], '#e4dcc8');
    x.fillStyle = '#1a1814'; x.fillRect(bx + W*.01, by + H*.012, W*.08, H*.012); for (let l = 0; l < 4; l++) x.fillRect(bx + W*.01, by + H*(.034 + l*.014), W*(.05 + hash(l, 7231)*.03), H*.005);
    poly(x, [[bx + W*.06, by + H*.1], [bx + W*.1, by + H*.05], [bx + W*.105, by + H*.12]], '#cfc6b0'); // the torn flap
    // the lane, setts, and the walk's kerb, and the canal below
    x.fillStyle = vgrad(x, fb, wl, [[0,'#6e6a62'],[1,'#56524c']]); x.fillRect(0, fb, W, wl - fb);
    x.strokeStyle = 'rgba(30,28,24,.3)'; for (let r = 0; r < 6; r++) { const yy = fb + Math.pow(r/6, 1.3)*(wl - fb); x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); }
    x.fillStyle = '#8a8478'; x.fillRect(0, wl - H*.02, W, H*.02); x.fillStyle = vgrad(x, wl, H, [[0,'#2e4a44'],[1,'#162a26']]); x.fillRect(0, wl, W, H - wl);
    for (let s = 0; s < 4; s++) { x.fillStyle = s % 2 ? '#6e6a62' : '#7a766c'; x.fillRect(W*.62 + s*W*.02, wl - H*.02 + s*H*.03, W*.12, H*.03); } // the canal steps going down
    x.fillStyle = '#2a2a2e'; x.fillRect(W*.4, wl - H*.06, 7, H*.05); // a mooring post
  }), 0, 0, W, H);
  // the face at the open shutter, looking, and then not
  const i = 4, wx = i*W/7 + W*.035 + W*.07*.42, wy = H*.18 + H*.06, look = mo ? (Math.sin(t/2600) > .3 ? 1 : 0) : 1;
  if (look) { ctx.fillStyle = '#b89a80'; ctx.fillRect(wx + 1, wy + H*.02, W*.07*.16 - 2, H*.03); ctx.fillStyle = 'rgba(200,196,186,.7)'; ctx.fillRect(wx + 1, wy + H*.015, W*.07*.16 - 2, H*.008); }
  for (let k = 0; k < 14; k++) { const yy = lerp(H*.76, H*.97, hash(k, 7232)), xx = ((hash(k, 7233)*W + t*mo*.01) % (W + 20)) - 10; ctx.fillStyle = 'rgba(214,232,222,.16)'; ctx.fillRect(xx, yy, 8 + 10*hash(k, 7234), 1); } // the canal's glints
  drawFigure(ctx, 'b7_agent', W*.3, H*.72, 1.5, t, {still:true, dir:1}); drawFigure(ctx, 'b7_agent', W*.34, H*.73, 1.5, t, {still:true, dir:-1}); // two men in grey, eating eels, watching
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, j) => drawFigure(ctx, id, W*(.92 - j*Math.min(.06, .34/sq.length)), H*.72 - (j % 2)*2, 1.6, t, {phase:j, dir:-1}));
  vign(ctx, W, H, .35, .5); };

/* an alley off the canal at dusk (this file's scene): two blind walls running away in perspective, one lamp at the bend, a door at the end */
SCENEX.b7_c2_alley = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, vx = W*.52, vy = H*.42;
  ctx.drawImage(sceneLayer('b72:alley', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, H*.3, [[0,'#141828'],[1,'#3a3040']]); x.fillRect(0, 0, W, H); // the dusk sky between the roofs
    // the left wall and the right wall converging on the bend
    x.fillStyle = vgrad(x, 0, 0, [[0,'#2a2a30'],[1,'#1a1a1e']]); poly(x, [[0, 0], [vx - W*.06, vy - H*.22], [vx - W*.06, vy + H*.12], [0, H]], '#24242a');
    poly(x, [[W, 0], [vx + W*.06, vy - H*.22], [vx + W*.06, vy + H*.12], [W, H]], '#1c1c22');
    for (let r = 0; r < 14; r++) { const k = r/14; x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, k*H); x.lineTo(vx - W*.06, lerp(vy - H*.22, vy + H*.12, k)); x.stroke(); x.beginPath(); x.moveTo(W, k*H); x.lineTo(vx + W*.06, lerp(vy - H*.22, vy + H*.12, k)); x.stroke(); } // courses
    // the alley floor, wet setts, and the end wall with its door
    poly(x, [[0, H], [vx - W*.06, vy + H*.12], [vx + W*.06, vy + H*.12], [W, H]], '#2a2a2c');
    for (let r = 0; r < 10; r++) { const k = Math.pow(r/10, 1.6), yy = lerp(vy + H*.12, H, k); x.strokeStyle = 'rgba(0,0,0,.3)'; x.beginPath(); x.moveTo(lerp(vx - W*.06, 0, k), yy); x.lineTo(lerp(vx + W*.06, W, k), yy); x.stroke(); }
    x.fillStyle = '#202026'; x.fillRect(vx - W*.06, vy - H*.22, W*.12, H*.34); x.fillStyle = '#100c0a'; x.fillRect(vx - W*.016, vy - H*.04, W*.032, H*.16); // the end wall, the door
    x.fillStyle = 'rgba(120,180,170,.12)'; poly(x, [[W*.2, H], [W*.38, H*.8], [W*.44, H*.82], [W*.3, H]], 'rgba(120,180,170,.1)'); // a wet gleam
  }), 0, 0, W, H);
  const lf = mo ? .85 + .15*Math.sin(t/600) + .05*Math.sin(t/47) : 1, lx = vx + W*.05, ly = vy - H*.1; // the one lamp at the bend
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.3, '#ffb060', .3*lf); glow(ctx, lx, ly, 2.4, '#ffe0a0', .9*lf); ctx.globalCompositeOperation = 'source-over';
  B2F.line(ctx, '#0e0c0a', 1.4, [[lx + W*.012, ly - 4], [lx + W*.03, ly - 4]]);
  drawFigure(ctx, 'b7_agent', vx - W*.02, vy + H*.12, 1.05, t, {still:true, dir:1}); drawFigure(ctx, 'b7_agent', vx + W*.025, vy + H*.12, 1.05, t, {still:true, dir:-1}); // grey coats at the bend
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.38 + i*Math.min(.06, .3/sq.length)), H*.98 - (i % 2)*3, 1.9, t, {phase:i, dir:1}));
  vign(ctx, W, H, .82, .5); };

/* a stone canal bridge at night (this file's scene): the arch over the water, lanterns at the far end, grey coats at the parapet */
SCENEX.b7_c2_bridge = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.36, wl = H*.6;
  ctx.drawImage(sceneLayer('b72:bridge', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#050810'],[1,'#161a2a']]); x.fillRect(0, 0, W, hz + 2); for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 7241)*.4).toFixed(2)})`; x.fillRect(hash(i, 7242)*W, Math.pow(hash(i, 7243), 1.4)*hz*.7, 1, 1); }
    b51Skyline(x, W, hz, H*.1, '#0c0e16', '255,196,130', 'rgba(60,64,80,.6)'); // the Pursers' quarter beyond
    x.fillStyle = '#1e2026'; x.fillRect(0, hz, W, wl - hz); // the far bank's buildings, low
    for (let i = 0; i < 9; i++) { if (hash(i, 7244) > .55) { x.fillStyle = 'rgba(255,190,110,.7)'; x.fillRect(W*(.05 + i*.11), hz + H*.06, 4, 5); } }
    x.fillStyle = vgrad(x, wl, H, [[0,'#14262a'],[1,'#081214']]); x.fillRect(0, wl, W, H - wl); // the canal
    // the bridge: a stone deck across, a parapet, and the arch below it with its reflection
    const dt = wl - H*.11, db = wl - H*.05; x.fillStyle = '#3a3a40'; x.fillRect(0, dt, W, db - dt); x.fillStyle = '#4a4a52'; x.fillRect(0, dt - H*.03, W, H*.03); x.fillStyle = 'rgba(200,210,230,.08)'; x.fillRect(0, dt - H*.03, W, 1); // the deck and the parapet
    x.fillStyle = '#2e2e34'; x.beginPath(); x.moveTo(W*.18, db); x.lineTo(W*.82, db); x.lineTo(W*.82, wl + H*.02); x.quadraticCurveTo(W*.5, wl - H*.06 + H*.11, W*.18, wl + H*.02); x.closePath(); x.fill(); // the spandrel
    x.fillStyle = '#081214'; x.beginPath(); x.moveTo(W*.26, wl + H*.05); x.quadraticCurveTo(W*.5, db + H*.005, W*.74, wl + H*.05); x.lineTo(W*.74, wl + H*.08); x.lineTo(W*.26, wl + H*.08); x.closePath(); x.fill(); // under the arch
    x.strokeStyle = 'rgba(200,220,220,.12)'; x.lineWidth = 1; x.beginPath(); x.moveTo(W*.26, wl + H*.12); x.quadraticCurveTo(W*.5, wl + H*.24, W*.74, wl + H*.12); x.stroke(); // the arch in the water
    // the near walk, setts, and the kerb
    x.fillStyle = '#2a2a2e'; x.fillRect(0, H*.86, W, H*.14); x.fillStyle = '#4a4a50'; x.fillRect(0, H*.86, W, H*.012);
  }), 0, 0, W, H);
  const dt = H*.6 - H*.11, lf = mo ? .85 + .15*Math.sin(t/700) : 1;
  [W*.8, W*.92].forEach((lx, i) => { const ly = dt - H*.08; B2F.line(ctx, '#0e0e10', 1.4, [[lx, dt - H*.03], [lx, ly + 4]]); ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.12, '#ffb060', .32*lf); glow(ctx, lx, ly, 2, '#ffe0a0', .9*lf); ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = `rgba(255,200,120,${(.18*lf).toFixed(2)})`; ctx.fillRect(lx - 3, H*.66 + i*4 + (mo ? Math.sin(t/400 + i)*2 : 0), 6, 1); }); // the lanterns, and their light on the water
  drawFigure(ctx, 'b7_agent', W*.78, dt - H*.03, 1.1, t, {still:true, dir:-1}); drawFigure(ctx, 'bruiser', W*.85, dt - H*.03, 1.15, t, {still:true, dir:-1}); drawFigure(ctx, 'b7_agent', W*.9, dt - H*.03, 1.1, t, {still:true, dir:-1});
  ctx.fillStyle = '#6a5a40'; ctx.fillRect(W*.82, dt - H*.05, 6, 4); // a satchel turned out on the parapet
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.08 + i*Math.min(.07, .4/sq.length)), H*.95 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .75, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Five's ground ----------------
   240×130, the same flat shapes and single highlight as Book Five, on dark canal-slate with a thin dock-gold rim (the Letherii's items) */
function b72Item(key, label, body){ const w = 240, h = 130, id = 'c72-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#34444a"></stop><stop offset=".7" stop-color="#1a2428"></stop><stop offset="1" stop-color="#0e1214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
if (typeof ART !== 'undefined') {
/* a page of the squad's file: a sheet of good paper, a column of names in a small upright hand, and down the left a column of marks:
   a stroke, a ring, a hook; one corner creased where it came out of a folder */
b72Item('b7_c2_filepage', 'A page of the squad\'s file', '<ellipse cx="120" cy="72" rx="70" ry="38" fill="#f0e8d8" opacity=".05"/><g transform="rotate(-5 120 66)">'
  + '<path d="M74 22 L170 20 L172 112 L76 114 Z" fill="#e8e0cc"/><path d="M74 22 L170 20 L170 26 L74 28 Z" fill="#f4eedc" opacity=".8"/><path d="M150 112 L172 112 L172 94 Z" fill="#cfc6b0"/>'
  + '<path d="M96 22 L98 114" stroke="#b8a8a0" stroke-width=".8" opacity=".7"/>'
  + [0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M104 ${36 + i*11} L${140 + (i*13 % 24)} ${35.5 + i*11}" stroke="#2a2420" stroke-width="1.4" opacity=".75"/>`).join('')
  + '<path d="M84 33 L84 40" stroke="#3a3048" stroke-width="1.8"/><circle cx="85" cy="48" r="3.2" fill="none" stroke="#3a3048" stroke-width="1.6"/><path d="M86 57 L86 64 Q86 67 83 66" fill="none" stroke="#3a3048" stroke-width="1.8"/>'
  + '<path d="M84 77 L84 84" stroke="#3a3048" stroke-width="1.8"/><path d="M82 84 L85 84" stroke="#3a3048" stroke-width="1.2"/><path d="M86 90 L86 97 Q86 100 83 99" fill="none" stroke="#3a3048" stroke-width="1.8"/><path d="M84 103 L84 110" stroke="#3a3048" stroke-width="1.8"/>'
  + '<path d="M78 24 L168 22" stroke="#fff" stroke-width="1" opacity=".4"/></g>');
/* a Patriotist's sleeve-knife: a thin plain blade, a flat steel grip with no mark, the spring clip of blackened steel beside it */
b72Item('b7_c2_agentknife', 'A Patriotist\'s sleeve-knife', '<ellipse cx="120" cy="96" rx="80" ry="6" fill="#000" opacity=".35"/><g transform="rotate(-12 120 64)">'
  + '<path d="M104 60 L196 57 Q204 58 206 61 Q204 64 196 65 L104 66 Z" fill="#c8ccd4"/><path d="M106 60.6 L196 58" stroke="#f4f6fa" stroke-width="1.2"/><path d="M104 65.4 L196 64.4" stroke="#6a6e76" stroke-width="1"/>'
  + '<rect x="98" y="56" width="7" height="14" rx="1.6" fill="#8a8e96"/><rect x="50" y="58.5" width="48" height="9" rx="2" fill="#5a5e66"/><path d="M54 60 L94 60" stroke="#9aa0a8" stroke-width="1" opacity=".7"/>'
  + '<circle cx="46" cy="63" r="4.4" fill="#6a6e76"/></g>'
  + '<g transform="rotate(8 120 100)"><path d="M78 96 L132 94 Q138 94 138 98 L138 104 Q138 108 132 108 L78 110 Q74 110 74 106 L74 100 Q74 96 78 96 Z" fill="none" stroke="#2a2c30" stroke-width="3"/><path d="M84 100 L128 99" stroke="#4a4c52" stroke-width="1.4"/></g>');
/* a clerk's grey coat, folded: good grey wool gone shiny, a row of small horn buttons, the cuff turned out to show the ink on it */
b72Item('b7_c2_greycoat', 'A clerk\'s grey coat', '<ellipse cx="120" cy="108" rx="78" ry="7" fill="#000" opacity=".35"/>'
  + '<path d="M50 44 Q90 32 128 38 Q166 44 194 34 L196 92 Q166 104 126 98 Q88 92 52 104 Z" fill="#6e7078"/><path d="M50 44 Q90 32 128 38 Q166 44 194 34 L195 50 Q166 60 127 54 Q88 48 51 60 Z" fill="#82848c"/>'
  + '<path d="M54 76 Q92 64 126 70 Q164 76 194 66" fill="none" stroke="#3a3c42" stroke-width="2.6" opacity=".6"/>'
  + [0, 1, 2, 3, 4].map(i => `<circle cx="${70 + i*24}" cy="${(57 - i*1.2 + (i % 2)).toFixed(1)}" r="2.6" fill="#c8c0a8"/><circle cx="${69.4 + i*24}" cy="${(56.4 - i*1.2 + (i % 2)).toFixed(1)}" r="1" fill="#fff" opacity=".5"/>`).join('')
  + '<path d="M164 84 Q184 80 198 86 L196 100 Q182 96 166 100 Z" fill="#5a5c64"/><path d="M168 92 Q184 88 196 92 L196 100 Q182 96 166 100 Z" fill="#14141a"/>'
  + '<path d="M60 48 Q92 38 124 42" fill="none" stroke="#f0f2f8" stroke-width="1.4" opacity=".22"/>');
}
