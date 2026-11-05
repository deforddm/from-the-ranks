/* ============ Book Six, Chapter 3 art: Y'Ghatan — the city burning, seen from the reserve line; the barrow field the night after ============ */
/* No new figures (the brief lists none for Chapter 3): the rebels and fanatics use the engine's kinds. Two backdrops (SCENEX, replacing the
   borrowed b2_hissar_burning and b2_geleen_moon; sceneLayer for the still parts, REDUCE() holding the rest still):
   - b6_ghatan_fire: Y'Ghatan from the 9th's reserve line at dusk. The bone-coloured walls dark against the light inside them, the breach,
     flame showing over the walls only as a ragged line of light along the roofs, smoke in columns leaning west, embers. The reserve line and
     the squad in front, all far from it. Once the chapter's key is set the light is stronger and the sky goes the wrong colour. The fire is
     never closer than the walls, and nobody is shown in it.
   - b6_barrows: the barrow field the night after. Old mounds ringed with stones, put back if Chapter 1 buried the dead (b6_c1_key 'bury'
     or unset) or still cut open with their stones thrown about if the squad left them ('leave'); one new mound, long, fresh earth, spears
     planted at its head; the barrow-side fire; the city on the horizon still smoking. No bodies.
   And the chapter's gear on Book Six's ground (Claude's call): dark smoke-brown with a thin bone rim. */

/* ---------------- the city burning, from the reserve line ---------------- */
const B63 = {bone:'#c8b08a', boneD:'#7a6248', wallDusk:['#8a7258', '#3e3024'], wallLate:['#5a4234', '#1e1610'], ground:'#3e2c1e', groundD:'#120c08'};
/* the wall line of Y'Ghatan: a crenellated top, square towers, the breach (bx..bx+bw), and the bones of older cities in the courses */
function b63Wall(x, W, top, foot, cols, bx, bw, lit){
  const g = x.createLinearGradient(0, top, 0, foot); g.addColorStop(0, cols[0]); g.addColorStop(1, cols[1]); x.fillStyle = g;
  x.beginPath(); x.moveTo(0, foot); x.lineTo(0, top);
  for (let i = 0; i * 8 <= W; i++) { const cx = i*8, up = i % 2 ? 0 : 2.2; if (cx > bx && cx < bx + bw) continue; x.lineTo(cx, top - up); x.lineTo(cx + 4, top - up); x.lineTo(cx + 4, top); x.lineTo(cx + 8, top); }
  x.lineTo(W, top); x.lineTo(W, foot); x.closePath(); x.fill();
  [.08, .27, .44, .74, .9].forEach((u, i) => { const tx = W*u, th = (foot - top)*(1.5 + (i % 2)*.4), tw = 14 + (i % 3)*3; x.fillStyle = g; x.fillRect(tx - tw/2, foot - th, tw, th); x.fillStyle = shade(cols[0], -.25); x.fillRect(tx - tw/2 - 1.5, foot - th - 2.4, tw + 3, 2.4); // towers
    x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(tx + tw*.16, foot - th, tw*.34, th); }); // the shadow side
  x.fillStyle = lit; x.beginPath(); x.moveTo(bx, top); x.lineTo(bx + bw*.18, top + (foot - top)*.55); x.lineTo(bx + bw*.4, top + (foot - top)*.3); x.lineTo(bx + bw*.62, top + (foot - top)*.7); x.lineTo(bx + bw*.82, top + (foot - top)*.25); x.lineTo(bx + bw, top); x.lineTo(bx + bw, foot); x.lineTo(bx, foot); x.closePath(); x.fill(); // the breach, light behind it
  x.fillStyle = shade(cols[1], -.2); x.beginPath(); x.moveTo(bx - 6, foot); x.quadraticCurveTo(bx + bw*.5, foot - (foot - top)*.45, bx + bw + 6, foot); x.closePath(); x.fill(); // the tumbled stone
  for (let i = 0; i < 40; i++) { const px = hash(i, 6301)*W, py = lerp(top + 2, foot - 2, hash(i, 6302)); if (px > bx - 4 && px < bx + bw + 4) continue; x.fillStyle = `rgba(232,220,196,${(.12 + hash(i, 6303)*.16).toFixed(2)})`;
    if (hash(i, 6304) > .7) { x.beginPath(); x.arc(px, py, .9, 0, 7); x.fill(); } else x.fillRect(px, py, 1.6 + hash(i, 6305)*2.4, .6); } } // bones in the courses, small
/* the city behind its walls: domes, flat roofs and a few towers, black, the light coming up behind them */
function b63Roofs(x, W, base, h, col){ x.fillStyle = col;
  for (let i = 0; i < 26; i++) { const rx = hash(i, 6311)*W, rw = 12 + hash(i, 6312)*26, rh = h*(.25 + hash(i, 6313)*.55); x.fillRect(rx, base - rh, rw, rh + 2);
    if (hash(i, 6314) > .62) { x.beginPath(); x.ellipse(rx + rw/2, base - rh, rw*.4, rw*.36, 0, Math.PI, 0); x.fill(); } }
  [.2, .52, .66, .83].forEach((u, i) => { x.fillRect(W*u, base - h*(1 + i % 2 * .2), 4, h*(1 + i % 2 * .2)); }); }
SCENEX.b6_ghatan_fire = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), f = (S && S.f) || {}, late = !!f.b6_c3_key, hz = H*.56, top = hz - H*.075, bx = W*.55, bw = W*.075;
  ctx.drawImage(sceneLayer('b63:fire' + (late ? 'l' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, late ? [[0,'#0a0408'],[.35,'#2e0c0a'],[.7,'#8a2a12'],[1,'#e0662a']] : [[0,'#1a1014'],[.45,'#5a2418'],[.8,'#b0502a'],[1,'#d88a4a']]); x.fillRect(0, 0, W, hz + 2);
    if (late) { x.fillStyle = 'rgba(120,40,10,.18)'; x.fillRect(0, 0, W, hz); } // the sky gone the wrong colour
    for (let i = 0; i < 18; i++) { x.fillStyle = `rgba(240,220,210,${(.12 + hash(i, 6321)*.25).toFixed(2)})`; x.fillRect(hash(i, 6322)*W, Math.pow(hash(i, 6323), 1.6)*hz*.22, 1, 1); } // a few stars the smoke has not reached
    x.fillStyle = late ? '#2a120c' : '#4a2a1e'; x.beginPath(); x.moveTo(0, hz - H*.03); for (let i = 0; i <= 16; i++) x.lineTo(W*i/16, hz - H*(.03 + hash(i, 6324)*.025)); x.lineTo(W, hz); x.lineTo(0, hz); x.fill(); // the Odhan's far edge either side
    glow(x, W*.5, top, W*.5, '#ff7a30', late ? .5 : .32); glow(x, bx + bw/2, top, W*.18, '#ffb060', late ? .4 : .25); // the light inside the walls
    b63Roofs(x, W, top + 1, H*.07, late ? '#140806' : '#2a1610');
    x.fillStyle = late ? 'rgba(255,150,60,.55)' : 'rgba(255,170,90,.32)'; for (let i = 0; i < 26; i++) { const rx = hash(i, 6311)*W, rw = 12 + hash(i, 6312)*26, rh = H*.07*(.25 + hash(i, 6313)*.55); x.fillRect(rx, top + 1 - rh, rw, .9); } // the roofs' edges caught by the light
    b63Wall(x, W, top, hz, late ? B63.wallLate : B63.wallDusk, bx, bw, late ? '#ffa04a' : '#e0783a');
    x.fillStyle = vgrad(x, hz, H, [[0, late ? '#2e1e14' : B63.ground], [1, B63.groundD]]); x.fillRect(0, hz, W, H - hz); // the plain before the walls
    x.fillStyle = late ? 'rgba(255,120,50,.1)' : 'rgba(255,140,70,.08)'; x.fillRect(0, hz, W, H*.05); // the light on the ground under the walls
    x.fillStyle = 'rgba(10,6,4,.7)'; x.fillRect(0, H*.66, W, H*.018); for (let i = 0; i < W/9; i++) { x.save(); x.translate(i*9 + hash(i, 6325)*3, H*.665); x.rotate(-.5); x.fillRect(0, -H*.025, 1.2, H*.03); x.restore(); } // the siege trench, its stakes
    x.fillStyle = 'rgba(200,170,130,.035)'; x.beginPath(); x.moveTo(bx + bw*.3, hz); x.lineTo(bx - W*.06, H*.78); x.lineTo(bx + bw + W*.04, H*.78); x.lineTo(bx + bw*.7, hz); x.fill(); // the trodden way to the breach
    for (let i = 0; i < 46; i++) { const px = W*(.04 + i*.02) + hash(i, 6326)*3, py = H*.745 + (i % 3)*1.4, s = .9; x.fillStyle = '#0c0806'; x.fillRect(px - 1.4*s, py - 6*s, 2.8*s, 6*s); x.beginPath(); x.arc(px, py - 7*s, 1.5*s, 0, 7); x.fill(); x.fillRect(px + 1.6*s, py - 12*s, .7, 12*s); } // the 9th on the reserve line, spears up
    x.fillStyle = '#0a0604'; x.beginPath(); x.moveTo(0, H); x.lineTo(0, H*.84); x.quadraticCurveTo(W*.35, H*.79, W*.62, H*.85); x.quadraticCurveTo(W*.85, H*.9, W, H*.85); x.lineTo(W, H); x.fill(); // the near rise
    x.fillStyle = 'rgba(255,140,70,.14)'; x.beginPath(); x.moveTo(0, H*.84); x.quadraticCurveTo(W*.35, H*.79, W*.62, H*.85); x.quadraticCurveTo(W*.85, H*.9, W, H*.85); x.lineTo(W, H*.86); x.quadraticCurveTo(W*.85, H*.91, W*.62, H*.86); x.quadraticCurveTo(W*.35, H*.8, 0, H*.85); x.fill(); // its crest, lit
  }), 0, 0, W, H);
  /* the light over the walls: a ragged line along the roofs, breathing; brighter in the breach */
  const A = late ? 1 : .6; ctx.globalCompositeOperation = 'lighter';
  glow(ctx, W*.5, top - H*.02, W*.5, '#ff5a1a', .16*A*fl); glow(ctx, bx + bw/2, hz - H*.03, W*.09, '#ffc070', .35*A*fl);
  for (let i = 0; i < 30; i++) { if (!late && hash(i, 6331) > .55) continue; const u = hash(i, 6332), fx = W*u, base = top - H*.01 - hash(i, 6333)*H*.04, k = mo ? .7 + .3*Math.sin(t/(140 + hash(i, 6334)*90) + i*2.1) : .85, fh = H*(.012 + hash(i, 6335)*.026)*k*(late ? 1.3 : 1), fw = 3 + hash(i, 6336)*6;
    ctx.fillStyle = `rgba(255,${120 + Math.round(hash(i, 6337)*70)},40,${(.55*A).toFixed(2)})`; ctx.beginPath(); ctx.moveTo(fx - fw, base); ctx.quadraticCurveTo(fx - fw*.3, base - fh*.5, fx, base - fh); ctx.quadraticCurveTo(fx + fw*.3, base - fh*.5, fx + fw, base); ctx.fill(); }
  ctx.globalCompositeOperation = 'source-over';
  /* smoke: columns leaning west on the wind, the low ones lit from under */
  const cols = late ? 5 : 3;
  for (let c = 0; c < cols; c++) { const sx0 = W*(.2 + c*(late ? .15 : .22) + hash(c, 6341)*.05), sy0 = top - H*.02;
    for (let i = 0; i < 16; i++) { const k = ((t*mo/(10000 + c*1500) + i/16) % 1), r = 6 + k*30, sx = sx0 - k*k*W*.22 + Math.sin(t*mo/2200 + i*1.7)*(2 + k*5), sy = sy0 - k*hz*1.05;
      glow(ctx, sx, sy, r*1.3, '#1a0c0a', .5*(1 - k*.55)); glow(ctx, sx + r*.2, sy + r*.3, r*.7, '#9a3a18', .18*(1 - k)*A); } }
  for (let i = 0; i < 22; i++) { const k = ((t*mo/(5200 + hash(i, 6342)*4000) + hash(i, 6343)) % 1), ex = W*(.3 + hash(i, 6344)*.45) - k*W*.08 + Math.sin(t/700 + i)*3, ey = top - k*hz*.7; ctx.fillStyle = `rgba(255,${150 + Math.round(hash(i, 6345)*80)},70,${((1 - k)*.8*A).toFixed(2)})`; ctx.fillRect(ex, ey, 1.2, 1.2); } // embers going up
  const sq = sceneSquad(); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.08 + i*Math.min(26, W*.5/Math.max(1, sq.length)), H*.93 - (i % 2)*2, 1.6, t, {phase:i, dir:1}));
  ctx.fillStyle = `rgba(255,110,40,${(.05*fl*A).toFixed(3)})`; ctx.fillRect(0, 0, W, H); // everything a little lit by it
  vign(ctx, W, H, .55, .5); };

/* ---------------- the barrow field, the night after ---------------- */
/* an old barrow: a long low mound ringed with stones; open (the rebels' work, left) or put back with a little cairn on top */
function b63Mound(x, cx, cy, rw, open, seed){ const rh = rw*.26;
  ell(x, cx, cy + rh*.25, rw*1.06, rh*.5, 'rgba(0,0,0,.45)');
  x.fillStyle = vgrad(x, cy - rh, cy + rh*.3, [[0,'#3a2c20'],[1,'#1a120c']]); x.beginPath(); x.ellipse(cx, cy, rw, rh, 0, Math.PI, 0); x.lineTo(cx - rw, cy); x.fill();
  x.fillStyle = 'rgba(200,170,130,.08)'; x.beginPath(); x.ellipse(cx - rw*.15, cy - rh*.2, rw*.7, rh*.6, 0, Math.PI, Math.PI*1.6); x.fill(); // the faint sky-light on its top
  const n = Math.round(rw/5);
  for (let i = 0; i < n; i++) { const a = Math.PI + Math.PI*i/(n - 1), out = open && hash(seed, i, 6351) > .55, sx = cx + Math.cos(a)*rw*(out ? 1.2 + hash(seed, i, 6352)*.5 : 1.02) + (out ? (hash(seed, i, 6353) - .5)*rw*.4 : 0), sy = cy + (out ? rh*(.1 + hash(seed, i, 6354)*.5) : Math.sin(a)*rh*.08);
    ell(x, sx, sy, 2.2, 1.4, out ? '#6a6052' : '#857a68'); ell(x, sx - .5, sy - .5, 1.1, .6, 'rgba(230,220,200,.25)'); } // the ring of stones; thrown about if open
  if (open) { x.fillStyle = '#080504'; x.beginPath(); x.moveTo(cx - rw*.22, cy - rh*.82); x.quadraticCurveTo(cx, cy - rh*.3, cx + rw*.26, cy - rh*.8); x.quadraticCurveTo(cx + rw*.05, cy - rh*1.02, cx - rw*.22, cy - rh*.82); x.fill(); // the cut in its top, black
    x.fillStyle = '#4a3624'; x.beginPath(); x.ellipse(cx + rw*.48, cy - rh*.38, rw*.18, rh*.24, -.3, 0, 7); x.fill(); } // the spoil thrown aside
  else { [[0, 0, 3], [-2.6, 1.4, 2.2], [2.6, 1.4, 2.2], [0, -2.6, 1.8]].forEach(([dx, dy, r]) => { ell(x, cx + dx, cy - rh - 1 + dy, r, r*.7, '#8a8070'); }); } } // a cairn, set back
SCENEX.b6_barrows = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), f = (S && S.f) || {}, open = f.b6_c1_key === 'leave', hz = H*.5, cx = W*.8, fx = W*.2, fy = H*.86;
  ctx.drawImage(sceneLayer('b63:bar' + (open ? 'o' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#04040a'],[.6,'#120a12'],[1,'#3a1810']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 70; i++) { const sx = hash(i, 6361)*W; if (sx > W*.45) { if (hash(i, 6365) > .4) continue; } x.fillStyle = `rgba(220,220,240,${(.1 + hash(i, 6362)*.45).toFixed(2)})`; x.fillRect(sx, Math.pow(hash(i, 6363), 1.3)*hz*.8, 1, 1); } // stars, fewer where the smoke lies
    glow(x, cx, hz, W*.32, '#c04a1a', .3); // the city's glow, low and dull now
    x.fillStyle = '#0c0806'; x.fillRect(cx - W*.17, hz - H*.05, W*.34, H*.05); for (let i = 0; i < 18; i++) x.fillRect(cx - W*.17 + i*W*.02, hz - H*.058, W*.01, H*.01); // the walls, far, black
    [-.13, -.04, .09].forEach((u, i) => x.fillRect(cx + W*u, hz - H*(.08 + (i % 2)*.015), W*.022, H*.08));
    x.fillStyle = 'rgba(255,120,50,.5)'; x.fillRect(cx - W*.02, hz - H*.05, W*.035, H*.05); // the breach, still red
    x.fillStyle = vgrad(x, hz, H, [[0,'#1e1610'],[1,'#080604']]); x.fillRect(0, hz, W, H - hz); // the ground
    for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(150,130,100,${(.05 + hash(i, 6364)*.08).toFixed(2)})`; x.fillRect(hash(i, 6366)*W, lerp(hz, H, Math.pow(hash(i, 6367), .8)), 2 + hash(i, 6368)*4, 1); } // scrub and stones
    [[.5, .57, 40], [.2, .58, 34], [.74, .6, 46], [.04, .66, 40], [.93, .68, 44], [.38, .66, 52]].forEach(([u, v, r], i) => b63Mound(x, W*u, H*v, r, open, i + 1)); // the old barrows, far to near
    /* the new one: long, fresh earth, near, spears at its head */
    const nx = W*.62, ny = H*.83, nw = W*.27, nh = H*.065;
    ell(x, nx, ny + nh*.4, nw*1.04, nh*.5, 'rgba(0,0,0,.5)');
    x.fillStyle = vgrad(x, ny - nh, ny + nh*.2, [[0,'#6a4a30'],[1,'#2a1a10']]); x.beginPath(); x.ellipse(nx, ny, nw, nh, 0, Math.PI, 0); x.lineTo(nx - nw, ny); x.fill();
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(${hash(i, 6371) > .5 ? '140,104,70' : '40,26,16'},${(.4 + hash(i, 6372)*.4).toFixed(2)})`; const a = Math.PI + hash(i, 6373)*Math.PI, r = hash(i, 6374)*.9; x.fillRect(nx + Math.cos(a)*nw*r, ny + Math.sin(a)*nh*r, 2, 1.2); } // clods, fresh
    [[.97, .2], [.92, -.25], [.86, .55]].forEach(([u, lean], i) => { const sx = nx + nw*u, sy = ny - nh*.1; x.save(); x.translate(sx, sy); x.rotate(lean*.25); x.fillStyle = '#2a1c12'; x.fillRect(-.8, -H*.2, 1.6, H*.2); x.fillStyle = '#8a8a86'; x.beginPath(); x.moveTo(-1.8, -H*.2); x.lineTo(0, -H*.2 - 6); x.lineTo(1.8, -H*.2); x.fill(); x.restore(); }); // spears planted at its head
    { const hx = nx + nw*.97 + Math.sin(.05)*H*.13, hy = ny - nh*.1 - H*.14; x.fillStyle = '#5a5e58'; x.beginPath(); x.ellipse(hx, hy, 4.4, 4, 0, Math.PI, 0); x.fill(); x.fillRect(hx - 4.8, hy, 9.6, 1.6); x.fillStyle = 'rgba(255,170,110,.35)'; x.fillRect(hx - 3.4, hy - 3.2, 1.4, 2.6); } // a helm hung on the middle one
  }), 0, 0, W, H);
  /* the smoke still going up off the city and lying across the sky */
  for (let i = 0; i < 14; i++) { const k = ((t*mo/14000 + i/14) % 1), r = 8 + k*26, sx = cx - k*W*.4 + Math.sin(t*mo/2600 + i)*3, sy = hz - H*.05 - k*hz*.7; glow(ctx, sx, sy, r*1.3, '#3a2220', .4*(1 - k*.6)); glow(ctx, sx + r*.2, sy + r*.4, r*.6, '#a03a18', .16*(1 - k)); }
  /* the barrow-side fire */
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy - 4, H*.3, '#ff8a3a', .22*fl); glow(ctx, fx, fy - 3, H*.08, '#ffc070', .4*fl); ctx.globalCompositeOperation = 'source-over';
  ell(ctx, fx, fy + 2, 11, 3, '#100806'); B2F.line(ctx, '#2a1a10', 2, [[fx - 9, fy + 2], [fx + 7, fy - 1]]); B2F.line(ctx, '#2a1a10', 2, [[fx - 7, fy - 1], [fx + 9, fy + 2]]);
  for (let j = 0; j < 4; j++) { const k = mo ? .75 + .25*Math.sin(t/(110 + j*30) + j*2) : .9, fw = 4 - j*.6, fh = (10 - j*1.6)*k, ox = (j - 1.5)*2.6; ctx.fillStyle = ['#c8401a', '#ff7a2a', '#ffb04a', '#ffe0a0'][j]; ctx.beginPath(); ctx.moveTo(fx + ox - fw, fy); ctx.quadraticCurveTo(fx + ox - fw*.2, fy - fh*.6, fx + ox, fy - fh); ctx.quadraticCurveTo(fx + ox + fw*.2, fy - fh*.6, fx + ox + fw, fy); ctx.fill(); }
  for (let i = 0; i < 8; i++) { const k = ((t*mo/(2600 + hash(i, 6381)*1800) + hash(i, 6382)) % 1); ctx.fillStyle = `rgba(255,${170 + Math.round(hash(i, 6383)*60)},90,${((1 - k)*.8).toFixed(2)})`; ctx.fillRect(fx + (hash(i, 6384) - .5)*8 + Math.sin(t/500 + i)*2, fy - 10 - k*H*.18, 1.1, 1.1); } // sparks
  const sq = sceneSquad(); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.06 + i*Math.min(22, W*.32/Math.max(1, sq.length)) + (i > 1 ? W*.12 : 0), H*.93 - (i % 2)*2, 1.5, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .6, .55); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Six's ground ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on dark smoke-brown with a thin bone rim (Claude's call) */
function b63Item(key, label, body){ const w = 240, h = 130, id = 'c63-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#4a3428"></stop><stop offset=".7" stop-color="#22160f"></stop><stop offset="1" stop-color="#0e0a08"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#d8c8a4" stroke-width="1" opacity=".6"></rect>\n${body.replace(/@@/g, id)}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* scorched mail: a Fourteenth issue hauberk, short-sleeved, the rings soot-black and heat-tinted from the hem up, the collar's leather
   cracked, a few rings gone at one sleeve */
b63Item('b6_c3_scorchedmail', 'Scorched mail', '<defs><pattern id="@@-r" width="5" height="4.4" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.2" r="1.7" fill="none" stroke="#c8ccc8" stroke-width=".8" opacity=".55"/><circle cx="0" cy="0" r="1.7" fill="none" stroke="#c8ccc8" stroke-width=".8" opacity=".55"/><circle cx="5" cy="0" r="1.7" fill="none" stroke="#c8ccc8" stroke-width=".8" opacity=".55"/><circle cx="0" cy="4.4" r="1.7" fill="none" stroke="#c8ccc8" stroke-width=".8" opacity=".55"/><circle cx="5" cy="4.4" r="1.7" fill="none" stroke="#c8ccc8" stroke-width=".8" opacity=".55"/></pattern>'
  + '<linearGradient id="@@-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a807c"/><stop offset=".45" stop-color="#5a5a58"/><stop offset=".62" stop-color="#6a5a7a"/><stop offset=".74" stop-color="#8a7240"/><stop offset=".86" stop-color="#2a2420"/><stop offset="1" stop-color="#14100e"/></linearGradient>'
  + '<clipPath id="@@-c"><path d="M92 26 L148 26 L176 36 L188 64 L170 70 L162 52 L160 112 Q140 116 120 112 Q100 116 80 112 L78 52 L70 70 L52 64 L64 36 Z"/></clipPath></defs>'
  + '<ellipse cx="120" cy="70" rx="80" ry="40" fill="#ffb070" opacity=".04"/><path d="M96 30 L150 30 L178 40 L190 68 L172 74 L164 56 L162 116 Q142 120 122 116 Q102 120 82 116 L80 56 L72 74 L54 68 L66 40 Z" fill="#000" opacity=".35"/>'
  + '<g clip-path="url(#@@-c)"><rect x="40" y="20" width="160" height="100" fill="url(#@@-s)"/><rect x="40" y="20" width="160" height="100" fill="url(#@@-r)"/>'
  + '<path d="M78 112 Q90 98 84 86 Q100 94 104 80 Q112 96 124 84 Q130 98 142 88 Q146 100 160 92 L160 120 L78 120 Z" fill="#0e0a08" opacity=".7"/>' // soot from the hem up
  + '<path d="M162 52 L188 64 L176 36 Z" fill="#0e0a08" opacity=".55"/><rect x="64" y="34" width="4" height="78" fill="#ffffff" opacity=".07"/></g>'
  + '<g fill="#22160f"><circle cx="58" cy="62" r="2"/><circle cx="63" cy="65" r="1.8"/><circle cx="60" cy="58" r="1.4"/></g>' // rings gone at the sleeve
  + '<path d="M100 26 Q120 40 140 26 L136 22 Q120 32 104 22 Z" fill="#4a3220"/><path d="M106 25 L110 28 M118 29 L120 32 M130 28 L133 25" stroke="#1a100a" stroke-width=".9"/>' // the collar, its leather cracked
  + '<path d="M96 30 L66 40 L54 66" fill="none" stroke="#d8dcd8" stroke-width=".8" opacity=".45"/><path d="M80 112 Q100 116 120 112 Q140 116 160 112" fill="none" stroke="#3a2a1e" stroke-width="1.6"/>');
/* a fanatic's knife: long, a little curved, a plain bar guard, the grip wound with dark cloth and a strip of red hanging off it; soot along
   the spine, the edge bright */
b63Item('b6_c3_fanaticknife', 'A fanatic\'s knife', '<defs><linearGradient id="@@-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2624"/><stop offset=".35" stop-color="#7a7a76"/><stop offset=".8" stop-color="#b8bcb8"/><stop offset="1" stop-color="#e8ece8"/></linearGradient></defs>'
  + '<ellipse cx="120" cy="68" rx="96" ry="22" fill="#ffb070" opacity=".04"/><g transform="rotate(-10 120 64)">'
  + '<path d="M96 70 Q150 72 196 60 Q214 54 222 46 Q212 62 196 68 Q150 82 96 78 Z" fill="#000" opacity=".3" transform="translate(3 5)"/>'
  + '<path d="M96 60 Q150 64 196 54 Q212 50 222 44 Q212 60 196 66 Q150 78 96 74 Z" fill="url(#@@-b)"/>' // the blade
  + '<path d="M98 61 Q150 65 196 55 Q210 51 220 45" fill="none" stroke="#14100e" stroke-width="2" opacity=".7"/>' // soot on the spine
  + '<path d="M100 72 Q150 76 196 64 Q210 59 220 46" fill="none" stroke="#ffffff" stroke-width=".8" opacity=".55"/>' // the edge
  + '<rect x="88" y="54" width="8" height="26" rx="1.5" fill="#5a4a3a"/><rect x="88" y="54" width="2" height="26" fill="#a8946e" opacity=".5"/>' // the bar guard
  + '<rect x="40" y="61" width="48" height="12" rx="4" fill="#2a1e18"/>'
  + '<g stroke="#140e0a" stroke-width="1.2" opacity=".8"><path d="M46 61 L50 73 M54 61 L58 73 M62 61 L66 73 M70 61 L74 73 M78 61 L82 73"/></g>' // cloth wound on the grip
  + '<circle cx="36" cy="67" r="6" fill="none" stroke="#5a4a3a" stroke-width="3"/>' // a ring pommel
  + '<path d="M60 73 Q56 88 46 98 Q52 100 58 96 Q64 86 66 73 Z" fill="#7a2018"/><path d="M60 74 Q57 86 50 95" fill="none" stroke="#b03a28" stroke-width=".8" opacity=".7"/></g>'); // a strip of red cloth hanging off it
