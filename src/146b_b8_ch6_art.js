/* ============ Book Eight, Chapter 6 art: The Night of the Hounds — the Fete's last night in the Gadrobi District ============ */
/* Book Eight's look (140b): night slate-blue, Darujhistan's gas-fire blue in the lamps and the windows, lamp gold indoors, the moon's bone
   white. The last night: the Fete's paper lanterns (red, amber, green; never blue) across the street at evening; then fire on the Gadrobi
   roofs, smoke, the moon in pieces; toward morning the sky white where the moon was (rule 81: never why). Everything at a distance: the wall,
   the moon, the Hound. No bodies anywhere.
   Shared pieces from Ch 1 (141b): b81Sky, b81Upper, b81Front, b81Lamp, b81Fog, b81Sign.
   Three backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b8_c6_fete     the Fourth's street on the Fete's last evening: house fronts, paper lanterns strung across, masks small in the street, and
                    over the roofs the moon with a crack across it
     b8_c6_burning  the same street after the night broke: lanterns burned out, two streets over the roofs on fire, smoke across the sky,
                    the moon in pieces; while a Hound is in the street (key 'street', before the fight is won) its dark shape goes by the
                    far end, low and long, and the lamps along that wall go out as it passes. After the moon bursts, the sky is white.
     b8_wall_night  (140's, replaced) the east wall from the Gadrobi side: a long wall, a gap a cart wide full of fallen stone, the plain
                    dark beyond it, smoke and fire glow over the roofs behind, the watch's brazier on its side, the moon in pieces
   The chapter's gear in the series' 200×150 item style, on Book Eight's ground: night slate-blue (#2a3038 → #0a0c10), gas-blue rim light. */

/* ---------------- shared pieces ---------------- */
/* the moon by the night's hour: 'crack' (one clean crack, a sliver standing apart), 'pieces' (hanging apart, still bright), 'burst' (gone:
   a white place in the sky, the light trailing east) */
const b86MoonState = () => { const f = (S && S.f) || {}; return f.b8_c6_burst ? 'burst' : (f.b8_c6_ph || 1) >= 2 || f.b8_c6_turned ? 'pieces' : 'crack'; };
function b86Moon(ctx, cx, cy, r, t, mo, state = b86MoonState()){
  ctx.globalCompositeOperation = 'lighter';
  if (state === 'burst') { glow(ctx, cx, cy, r*9, '#f4f0e2', .22); glow(ctx, cx, cy, r*3, '#ffffff', .3);
    for (let i = 0; i < 7; i++) { const a = -.35 + i*.12, len = r*(6 + hash(i, 8601)*5); ctx.strokeStyle = `rgba(244,240,226,${(.12 + hash(i, 8602)*.12).toFixed(2)})`; ctx.lineWidth = 1 + hash(i, 8603)*2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a)*len, cy + Math.sin(a)*len*.4); ctx.stroke(); } // the light going east, in pieces
    ctx.globalCompositeOperation = 'source-over'; return; }
  glow(ctx, cx, cy, r*3.4, '#cfc8b4', .16); ctx.globalCompositeOperation = 'source-over';
  if (state === 'crack') { ell(ctx, cx, cy, r, r, '#e8e2d0'); ell(ctx, cx - r*.25, cy - r*.2, r*.32, r*.26, 'rgba(160,150,130,.35)'); ell(ctx, cx + r*.3, cy + r*.25, r*.22, r*.18, 'rgba(160,150,130,.3)');
    ctx.strokeStyle = '#2a2a30'; ctx.lineWidth = Math.max(1, r*.07); ctx.beginPath(); ctx.moveTo(cx - r*.9, cy - r*.3); ctx.lineTo(cx - r*.2, cy + r*.05); ctx.lineTo(cx + r*.25, cy - r*.15); ctx.lineTo(cx + r*.95, cy + r*.25); ctx.stroke(); // the crack
    poly(ctx, [[cx + r*.98, cy - r*.4], [cx + r*1.18, cy - r*.22], [cx + r*1.08, cy - r*.02]], '#d8d2c0'); return; } // the sliver standing a little apart
  const bob = mo ? Math.sin(t/2400)*r*.04 : 0; // pieces, hanging apart from each other, still bright
  [[-.55, -.35, .55, 0], [.4, -.45, .48, 1], [-.2, .45, .5, 2], [.6, .4, .32, 3], [-.85, .3, .22, 4], [.05, -.05, .2, 5]].forEach(([dx, dy, k, i]) => {
    const px = cx + dx*r*1.3, py = cy + dy*r*1.3 + bob*(i % 2 ? 1 : -1), rr = r*k;
    poly(ctx, [[px - rr, py - rr*.2], [px - rr*.3, py - rr], [px + rr*.8, py - rr*.6], [px + rr, py + rr*.4], [px + rr*.1, py + rr], [px - rr*.8, py + rr*.6]], i % 2 ? '#e0dac8' : '#d4ceba');
    ctx.strokeStyle = 'rgba(40,40,48,.6)'; ctx.lineWidth = 1; ctx.stroke(); }); }
/* smoke drifting across the sky, lit from below by the fire */
function b86Smoke(ctx, W, H, y0, t, mo, a = .22){ for (let i = 0; i < 6; i++) { const dx = mo ? ((t/(9000 + i*1300) + i*.17) % 1)*W*.3 : i*W*.05;
  ctx.fillStyle = `rgba(${40 + i*6},${30 + i*4},${30 + i*4},${(a - i*.025).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(-.1 + i*.22) + dx, y0 + (i % 3)*H*.04, W*.34, H*.06, -.08, 0, 7); ctx.fill(); } }
/* roofs on fire beyond the near fronts: a band of orange glow, flame tongues, sparks going up */
function b86Fire(ctx, x0, x1, base, H, t, mo, seed){ ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 7; i++) { const big = .5 + hash(i, seed + 5)*1.1, fx = x0 + (x1 - x0)*(i + .5)/7 + (hash(i, seed) - .5)*(x1 - x0)*.1, fl = mo ? .8 + .2*Math.sin(t/(170 + i*30) + i) : 1;
    glow(ctx, fx, base, H*.16*big, '#ff7a2a', .2*fl); if (big > .9) glow(ctx, fx, base - H*.02, H*.05*big, '#ffd080', .35*fl);
    for (let j = 0; j < 3; j++) { const h = H*(.015 + hash(i*3 + j, seed + 1)*.05)*fl*big, w = H*.012*big; ctx.fillStyle = `rgba(255,${150 + j*30},70,.7)`; ctx.beginPath(); ctx.moveTo(fx + (j - 1)*w*1.6 - w, base); ctx.quadraticCurveTo(fx + (j - 1)*w*1.6, base - h*1.3, fx + (j - 1)*w*1.6 + w, base); ctx.fill(); } }
  if (mo) for (let i = 0; i < 18; i++) { const k = ((t/(1800 + i*90) + hash(i, seed + 2)) % 1), sx = x0 + hash(i, seed + 3)*(x1 - x0) + Math.sin(t/400 + i)*6; ctx.fillStyle = `rgba(255,200,120,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(sx, base - k*H*.3, 1.5, 1.5); }
  ctx.globalCompositeOperation = 'source-over'; }
/* a string of Fete lanterns across the street between two points, sagging; out = burned to the string */
function b86Lanterns(ctx, x0, y0, x1, y1, n, s, t, mo, out, seed){ const sag = Math.abs(x1 - x0)*.08;
  ctx.strokeStyle = 'rgba(20,16,12,.9)'; ctx.lineWidth = Math.max(1, s*.5); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1)/2, (y0 + y1)/2 + sag, x1, y1); ctx.stroke();
  const cols = ['#d84a2a', '#e8a038', '#4a9a4a', '#e0c050'];
  for (let i = 1; i < n; i++) { const u = i/n, px = x0 + (x1 - x0)*u, py = y0 + (y1 - y0)*u + sag*4*u*(1 - u) + 3*s, sw = mo ? Math.sin(t/900 + i + seed)*s*.6 : 0;
    if (out) { if (hash(i, seed) > .5) { ctx.fillStyle = 'rgba(30,24,20,.8)'; ctx.fillRect(px + sw - s*1.2, py, s*2.4, s*2); } continue; }
    const c = cols[(i + seed) % 4]; ctx.globalCompositeOperation = 'lighter'; glow(ctx, px + sw, py + s*1.6, s*6, c, .18); ctx.globalCompositeOperation = 'source-over';
    ell(ctx, px + sw, py + s*1.6, s*1.6, s*2, c); ctx.fillStyle = 'rgba(255,240,200,.45)'; ctx.fillRect(px + sw - s*.4, py + s*.8, s*.8, s*1.6); } }

/* ---------------- the backdrops ---------------- */
/* the Fourth's street on the Fete's last evening (the scene's caption): the fronts both sides, lit; paper lanterns across; the moon with its
   crack over the roofs; masks dancing small far down the street; the squad near */
SCENEX.b8_c6_fete = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42;
  ctx.drawImage(sceneLayer('b86:fete', W, H, (x, W, H) => {
    b81Sky(x, W, H, hz, 8611, '#24304c'); b81Upper(x, W, H, hz, 8612, .8);
    x.fillStyle = vgrad(x, hz, H, [[0,'#181c26'],[1,'#07080b']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 90; i++) { const d = hash(i, 8613), yy = hz + Math.pow(d, .7)*(H - hz), cx = W*.5 + (hash(i, 8614) - .5)*W*(.2 + d*.9); ell(x, cx, yy, 2 + d*5, 1 + d*1.8, `rgba(${60 + Math.round(d*40)},${56 + Math.round(d*30)},${70 + Math.round(d*40)},.3)`); } // cobbles, warm-lit
    b81Front(x, -4, W*.3, H*.86, H*.2, 8615, true); b81Front(x, W*.3, W*.41, H*.62, H*.31, 8616, true);
    b81Front(x, W*.7, W + 4, H*.86, H*.22, 8617, true); b81Front(x, W*.59, W*.7, H*.62, H*.33, 8618, true);
    poly(x, [[0, H*.2], [W*.3, H*.2], [W*.41, H*.31], [W*.59, H*.33], [W*.7, H*.22], [W, H*.22], [W, H*.15], [0, H*.15]], '#06070a'); // the roofline
    x.fillStyle = 'rgba(232,170,90,.5)'; x.fillRect(W*.2, H*.66, W*.05, H*.2); // the Fourth's door, open a crack
  }), 0, 0, W, H);
  b86Moon(ctx, W*.66, H*.1, H*.045, t, mo, 'crack');
  b86Lanterns(ctx, -4, H*.24, W + 4, H*.27, 11, H/200, t, mo, false, 1); b86Lanterns(ctx, W*.3, H*.36, W*.7, H*.38, 7, H/320, t, mo, false, 2);
  b81Lamp(ctx, W*.28, H*.52, H/220, t, mo, 0); b81Lamp(ctx, W*.73, H*.54, H/220, t, mo, 1);
  for (let i = 0; i < 6; i++) { const ph = i*.7, dx = mo ? Math.sin(t/700 + ph)*W*.01 : 0; drawFigure(ctx, 'reveller', W*(.4 + i*.04) + dx, H*(.66 + (i % 2)*.02), .8, t, {phase:i, dir:i % 2 ? 1 : -1}); } // masks, far down the street
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.12 + i*Math.min(.06, .3/sq.length)), H*.96 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .66, .5); };

/* the same street after the night broke: the lanterns out, fire over the roofs, smoke, the moon in pieces (or the white sky after it burst);
   a Hound going by the far end while one is in the street */
SCENEX.b8_c6_burning = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, st = b86MoonState(), white = st === 'burst';
  ctx.drawImage(sceneLayer('b86:burning' + (white ? 'w' : ''), W, H, (x, W, H) => {
    if (white) { x.fillStyle = vgrad(x, 0, hz, [[0,'#3a3c44'],[.6,'#5a5a60'],[1,'#6a5a50']]); x.fillRect(0, 0, W, hz + 2); }
    else b81Sky(x, W, H, hz, 8621, '#3a2420');
    b81Upper(x, W, H, hz, 8622, .8);
    x.fillStyle = vgrad(x, hz, H, [[0,'#1a1414'],[1,'#07070a']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 80; i++) { const d = hash(i, 8623), yy = hz + Math.pow(d, .7)*(H - hz), cx = W*.5 + (hash(i, 8624) - .5)*W*(.2 + d*.9); ell(x, cx, yy, 2 + d*5, 1 + d*1.8, `rgba(${70 + Math.round(d*40)},${44 + Math.round(d*20)},${40 + Math.round(d*20)},.3)`); } // cobbles, fire-lit
    b81Front(x, -4, W*.3, H*.86, H*.2, 8625, false); b81Front(x, W*.3, W*.41, H*.62, H*.31, 8626, false);
    b81Front(x, W*.7, W + 4, H*.86, H*.22, 8627, false); b81Front(x, W*.59, W*.7, H*.62, H*.33, 8628, true);
    poly(x, [[0, H*.2], [W*.3, H*.2], [W*.41, H*.31], [W*.59, H*.33], [W*.7, H*.22], [W, H*.22], [W, H*.15], [0, H*.15]], '#06070a');
    // the street's litter: a lantern on the cobbles, a water-butt over, a mask
    ell(x, W*.36, H*.8, W*.02, H*.012, '#4a2a1a'); x.fillStyle = '#2a1e14'; x.fillRect(W*.62, H*.7, W*.04, H*.03); ell(x, W*.48, H*.88, W*.012, H*.008, '#c8b890');
    x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(W*.2, H*.66, W*.05, H*.2); // the Fourth's door, barred
  }), 0, 0, W, H);
  if (!white) b86Fire(ctx, W*.32, W*.68, H*.31, H, t, mo, 8630);
  b86Moon(ctx, W*.66, H*.1, H*.065, t, mo, st);
  b86Smoke(ctx, W, H, H*.14, t, mo, white ? .12 : .24);
  b86Lanterns(ctx, -4, H*.24, W + 4, H*.27, 11, H/200, t, mo, true, 1);
  b81Lamp(ctx, W*.28, H*.52, H/220, t, mo, 0);
  /* the Hound's passing: low and long across the far end of the street, darker than the smoke; the lamp on that side is out */
  const f = (S && S.f) || {};
  if (f.b8_c6_key === 'street' && !f.b8_c6_streetDone && (f.b8_c6_ph || 1) === 2) { const k = mo ? ((t/5200) % 1) : .5, hx = W*(.36 + k*.3), hy = H*.6;
    const a = mo ? Math.min(1, Math.sin(k*Math.PI)*1.6) : 1; ctx.save(); ctx.globalAlpha = a;
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, hx, hy - H*.02, H*.09, '#3a5a9a', .12); ctx.globalCompositeOperation = 'source-over';
    drawFigure(ctx, 'hound', hx, hy, 1.5, t, {dir:1, phase:0}); ctx.restore();
    if (mo) for (let i = 0; i < 5; i++) { const tk = ((t/700 + i/5) % 1); ctx.fillStyle = `rgba(10,10,14,${(.35*(1 - tk)*a).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(hx - tk*W*.08, hy - H*.01, W*.03*(1 - tk*.5), H*.02, 0, 0, 7); ctx.fill(); } } // the dark coming off it, behind
  else b81Lamp(ctx, W*.73, H*.54, H/220, t, mo, 1);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.12 + i*Math.min(.06, .3/sq.length)), H*.96 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .74, .5); };

/* the east wall from the Gadrobi side (140's caption): a long wall, the gap full of fallen stone with the dark plain through it, the watch's
   brazier on its side, fire and smoke over the roofs behind, the moon in pieces; the squad small at the foot */
SCENEX.b8_wall_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, wt = H*.3, wb = H*.66, gx0 = W*.46, gx1 = W*.62, st = b86MoonState(), white = st === 'burst';
  ctx.drawImage(sceneLayer('b86:wall' + (white ? 'w' : '') + (S && S.f && S.f.b8_c6_cartSet ? 'c' : ''), W, H, (x, W, H) => {
    if (white) { x.fillStyle = vgrad(x, 0, wb, [[0,'#3a3c44'],[1,'#5a5450']]); x.fillRect(0, 0, W, wb); }
    else b81Sky(x, W, H, wb, 8641, '#2a2024');
    x.fillStyle = '#05060a'; x.fillRect(gx0, wb - H*.04, gx1 - gx0, H*.04); // the plain through the gap, flat and dark
    // the wall: dressed stone, two tones, with a walk along the top and crenels
    const wall = (a, b) => { x.fillStyle = vgrad(x, wt, wb, [[0,'#2a2a30'],[1,'#141418']]); x.fillRect(a, wt, b - a, wb - wt);
      x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 1; for (let r = 0; r < 9; r++) { const yy = wt + (wb - wt)*r/9; x.beginPath(); x.moveTo(a, yy); x.lineTo(b, yy); x.stroke();
        for (let c = 0; c < (b - a)/14; c++) { const xx = a + c*14 + (r % 2)*7; x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx, yy + (wb - wt)/9); x.stroke(); } }
      for (let c = a; c < b - 6; c += 14) { x.fillStyle = '#2e2e34'; x.fillRect(c, wt - 8, 8, 8); } };
    wall(-4, gx0); wall(gx1, W + 4);
    // the broken ends: ragged, stone tumbling into the gap
    poly(x, [[gx0 - 2, wt - 8], [gx0 + 10, wt + 30], [gx0 + 4, wt + 70], [gx0 + 18, wb - 20], [gx0 - 2, wb]], '#1c1c22'); poly(x, [[gx1 + 2, wt - 8], [gx1 - 14, wt + 40], [gx1 - 6, wt + 90], [gx1 - 20, wb - 10], [gx1 + 2, wb]], '#1c1c22');
    for (let i = 0; i < 40; i++) { const u = hash(i, 8642), v = hash(i, 8643), rx = gx0 - W*.06 + u*(gx1 - gx0 + W*.12), ry = wb - H*.02 + v*H*.12, rr = 3 + hash(i, 8644)*10; // the fall
      poly(x, [[rx - rr, ry], [rx - rr*.4, ry - rr*.8], [rx + rr*.7, ry - rr*.6], [rx + rr, ry + rr*.3]], hash(i, 8645) > .5 ? '#2a2a30' : '#36363c'); }
    x.fillStyle = vgrad(x, wb, H, [[0,'#141216'],[1,'#060608']]); x.fillRect(0, wb + H*.06, W, H - wb - H*.06);
    // the watch's brazier on its side, its coals spilled; a cart over
    x.fillStyle = '#1a1612'; x.save(); x.translate(W*.24, H*.82); x.rotate(1.2); x.fillRect(-8, -14, 16, 18); x.restore(); for (let i = 0; i < 8; i++) { x.fillStyle = `rgba(255,${120 + i*10},60,.7)`; x.fillRect(W*.25 + i*4, H*.84 + (i % 2)*2, 2, 2); }
    if (S && S.f && S.f.b8_c6_cartSet) { x.fillStyle = '#2a1e14'; x.fillRect(gx0 + 6, wb + H*.02, gx1 - gx0 - 12, H*.04); ell(x, gx0 + 20, wb + H*.06, 8, 8, '#120c08'); }
  }), 0, 0, W, H);
  if (!white) b86Fire(ctx, -W*.02, W*.3, H*.29, H, t, mo, 8650); // the Gadrobi roofs burning behind, left
  b86Moon(ctx, W*.72, H*.12, H*.065, t, mo, st);
  b86Smoke(ctx, W, H, H*.1, t, mo, white ? .1 : .22);
  if (!white) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.26, H*.84, H*.1, '#ff8a3a', mo ? .16 + .04*Math.sin(t/200) : .16); ctx.globalCompositeOperation = 'source-over'; }
  drawFigure(ctx, 'guard', W*.36, H*.8, 1.2, t, {dir:1, still:true});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.5 + i*Math.min(.055, .28/sq.length)), H*.96 - (i % 2)*2, 1.6, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .7, .5); };

/* ---------------- the chapter's gear (200×150, Book Eight's ground: night slate-blue, gas-blue rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#2a3038"/><stop offset=".62" stop-color="#161a20"/><stop offset="1" stop-color="#0a0c10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a Guild crossbow: short, blackened all over, the stock wrapped in dark cord, a quiver of quarrels with the fletching cut low, laid flat */
  ART['item/b8_c6_guildbow'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A Guild crossbow">${bg('b86gb')}
<linearGradient id="b86gb-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a42"/><stop offset="1" stop-color="#121216"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b86gb-bg)"/><ellipse cx="100" cy="118" rx="74" ry="8" fill="url(#b86gb-sh)"/>
<path d="M36 82 L150 74 L152 84 L40 92 Z" fill="url(#b86gb-s)" stroke="#060608" stroke-width="1.2"/>
<path d="M36 82 L22 90 L26 100 L44 92 Z" fill="#1a1a1e" stroke="#060608"/>
<g stroke="#2a2630" stroke-width="2.2"><path d="M54 80 L56 92"/><path d="M60 80 L62 91"/><path d="M66 79 L68 91"/><path d="M72 79 L74 90"/><path d="M78 78 L80 90"/></g>
<path d="M140 50 Q156 79 140 108" stroke="#4a4c56" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M141 51 Q155 79 141 107" stroke="#7a7e8a" stroke-width="1.2" fill="none" opacity=".7"/>
<path d="M141 52 L118 79 L141 106" stroke="#8a8a90" stroke-width=".9" fill="none" opacity=".7"/>
<rect x="112" y="76" width="10" height="6" rx="1" fill="#2a2a30" stroke="#060608"/>
<path d="M118 79 L176 76" stroke="#3a3a42" stroke-width="2"/><path d="M174 73 L184 76 L174 79 Z" fill="#6a6e78"/>
<g transform="rotate(-14 70 118)"><rect x="40" y="108" width="56" height="12" rx="3" fill="#1e1a18" stroke="#060608"/>
<path d="M96 110 L118 110 M96 114 L120 114 M96 118 L118 118" stroke="#3a3a42" stroke-width="1.6"/><path d="M116 108 L122 110 L116 112 M118 112 L124 114 L118 116 M116 116 L122 118 L116 120" fill="#4a4a52"/></g>
<path d="M40 84 L148 76" stroke="#8ab8ff" stroke-width=".9" opacity=".35"/><path d="M138 54 Q152 79 138 104" stroke="#8ab8ff" stroke-width=".7" fill="none" opacity=".3"/>
<ellipse cx="100" cy="82" rx="66" ry="30" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c6_guildbow'] = [200, 150];
  /* a stone from the wall: a fist-sized block, dressed flat on one face, broken on the others, old mortar on an edge, a scorch across it */
  ART['item/b8_c6_wallstone'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A stone from the wall">${bg('b86ws')}
<linearGradient id="b86ws-f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a8680"/><stop offset=".6" stop-color="#5e5a56"/><stop offset="1" stop-color="#36332f"/></linearGradient>
<linearGradient id="b86ws-b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a4642"/><stop offset="1" stop-color="#26231f"/></linearGradient>
<radialGradient id="b86ws-sc" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#0a0806" stop-opacity=".8"/><stop offset="1" stop-color="#0a0806" stop-opacity="0"/></radialGradient></defs>
<rect width="200" height="150" fill="url(#b86ws-bg)"/><ellipse cx="100" cy="116" rx="60" ry="9" fill="url(#b86ws-sh)"/>
<path d="M58 62 L116 50 L142 70 L84 84 Z" fill="url(#b86ws-f)" stroke="#1a1816" stroke-width="1.2"/>
<path d="M58 62 L84 84 L88 112 L74 108 L66 96 L60 100 L54 84 Z" fill="url(#b86ws-b)" stroke="#1a1816" stroke-width="1.2"/>
<path d="M84 84 L142 70 L146 84 L138 90 L144 100 L120 108 L104 104 L88 112 Z" fill="#3a3632" stroke="#1a1816" stroke-width="1.2"/>
<path d="M60 64 L114 52 L118 55 L62 67 Z" fill="#a8a092" opacity=".6"/>
<path d="M74 98 L82 92 M96 100 L104 94 M118 96 L128 88 M64 84 L70 90" stroke="#1e1c1a" stroke-width="1.2"/>
<ellipse cx="104" cy="68" rx="26" ry="9" transform="rotate(-12 104 68)" fill="url(#b86ws-sc)"/>
<path d="M60 62 L116 50" stroke="#8ab8ff" stroke-width=".9" opacity=".4"/><path d="M58 64 L56 84" stroke="#8ab8ff" stroke-width=".7" opacity=".3"/>
<ellipse cx="100" cy="80" rx="50" ry="30" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c6_wallstone'] = [200, 150];
}
