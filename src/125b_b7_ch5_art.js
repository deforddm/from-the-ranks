/* ============ Book Seven, Chapter 5 art: The Village — a road by a river under Edur fires, a mill village of plaster and thatch, a factor's cellar, the riverbank after ============ */
/* Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still), in 120b's night palette (blue-black sky, no moon,
   the barley grey-green, plaster pale, lamp-gold where a light is lit), and by day a washed grey-gold:
     b7_village     (120's) the mill village: a square with a well, plaster-and-thatch houses, the meeting house with its bell-cote, the mill
                    and its wheel on the race, the factor's house the only one in stone at the top of the square. Grey morning in phase 2;
                    dusk in phase 3; on 'hold' after the fight, night, and if the roof was rigged the factor's house has no roof and a thin
                    smoke goes up from it, and a lantern by the mill-race
     b7_c5_lane     a road by night along a wide river, hedges, and on the ridge to the north a long line of small fires (the Edur), far off
     b7_c5_cellar   the factor's cellar: a stone vault, barrels on their sides, sacks, a rack of bottles, a rushlight on a barrel-head, steps
                    up to a trapdoor with daylight at its edge
     b7_c5_river    the riverbank at night: reeds, a willow, the water with the stars in it, and across the fields the village: on 'hold' dark
                    with one lantern and the mill; on 'slip' a long red glow over the trees and a smoke going up into it
   Nothing burns close; no bodies, ever. The village's burning is a light over trees, far off.
   The chapter's gear in the series' 200×150 item style (089g), on Book Six's smoke-umber ground (the Third's items). */

/* ---------------- shared drawing ---------------- */
/* the sky: night (blue-black with stars), day (a washed grey morning going gold at the horizon), dusk (violet to ember) */
function b75aSky(x, W, hz, seed, mode){
  if (mode === 'day') { x.fillStyle = vgrad(x, 0, hz, [[0,'#5a6874'],[.6,'#8a9298'],[1,'#c8b892']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 6; i++) { const cx = hash(i, seed)*W, cy = hz*(.15 + hash(i, seed + 1)*.4); ell(x, cx, cy, W*(.08 + hash(i, seed + 2)*.1), hz*.04, 'rgba(230,226,214,.22)'); } return; }
  if (mode === 'dusk') { x.fillStyle = vgrad(x, 0, hz, [[0,'#1a1830'],[.5,'#4a3048'],[.85,'#a0583a'],[1,'#d0844a']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(226,230,250,${(.1 + hash(i, seed)*.4).toFixed(2)})`; x.fillRect(hash(i, seed + 1)*W, hash(i, seed + 2)*hz*.35, 1, 1); } return; }
  x.fillStyle = vgrad(x, 0, hz, [[0,'#03050a'],[.7,'#0c1220'],[1,'#161c28']]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 120; i++) { x.fillStyle = `rgba(226,230,250,${(.1 + hash(i, seed)*.55).toFixed(2)})`; const sz = hash(i, seed + 3) > .94 ? 1.4 : 1; x.fillRect(hash(i, seed + 1)*W, Math.pow(hash(i, seed + 2), 1.3)*hz*.92, sz, sz); } }
/* low hills or a ridge along the horizon */
function b75aHills(x, W, H, hz, col, amp, seed){ x.fillStyle = col; x.beginPath(); x.moveTo(0, hz + 2); for (let i = 0; i <= 24; i++) { const u = i/24; x.lineTo(u*W, hz - H*(amp + amp*.8*Math.sin(u*5 + seed) + amp*.4*Math.sin(u*13 + seed*2))); } x.lineTo(W, hz + 2); x.closePath(); x.fill(); }
/* the barley or the reeds: strokes, denser and taller toward the viewer */
function b75aStalks(x, W, H, y0, y1, n, seed, rgb){ for (let i = 0; i < n; i++) { const yy = y0 + Math.pow(hash(i, seed), 1.2)*(y1 - y0), d = (yy - y0)/(y1 - y0); x.strokeStyle = `rgba(${rgb[0] + Math.round(d*20)},${rgb[1] + Math.round(d*20)},${rgb[2]},${(.3 + d*.45).toFixed(2)})`; x.lineWidth = .6 + d*1.1; const gx = hash(i, seed + 1)*W; x.beginPath(); x.moveTo(gx, yy); x.lineTo(gx + 1 + d*2, yy - 3 - d*14); x.stroke(); } }
/* a plaster-and-thatch house: pale wall, a thatch roof, a door, shuttered windows; lit gives a window of lamp-gold */
function b75aCot(x, bx, by, w, h, lit, wall, thatch){ x.fillStyle = wall; x.fillRect(bx, by - h, w, h); x.fillStyle = 'rgba(255,255,240,.06)'; x.fillRect(bx, by - h, w*.2, h);
  poly(x, [[bx - w*.08, by - h], [bx + w*.5, by - h - h*.85], [bx + w*1.08, by - h]], thatch); x.strokeStyle = 'rgba(0,0,0,.22)'; x.lineWidth = .6; x.beginPath(); for (let i = 1; i < 5; i++) { const k = i/5; x.moveTo(bx - w*.08 + w*.58*k, by - h - h*.85*k); x.lineTo(bx + w*1.08 - w*.58*k, by - h - h*.85*k); } x.stroke();
  x.fillStyle = '#0c0a08'; x.fillRect(bx + w*.42, by - h*.62, w*.16, h*.62);
  x.fillStyle = lit ? 'rgba(255,200,110,.85)' : 'rgba(18,16,14,.85)'; x.fillRect(bx + w*.12, by - h*.7, w*.16, h*.22); x.fillRect(bx + w*.72, by - h*.7, w*.16, h*.22); }
/* the light of the moment, for the village: 'day', 'dusk' or 'night' */
const b75aMode = () => { const f = (S && S.f) || {}; if (f.b7_c5_holdDone || (f.b7_c5_ph || 1) >= 4) return 'night'; if ((f.b7_c5_ph || 1) >= 3) return 'dusk'; if ((f.b7_c5_ph || 1) >= 2) return 'day'; return 'night'; };

/* ---------------- backdrops ---------------- */
/* the mill village (120's caption): the square with the well in front, plaster-and-thatch houses either side, the factor's house of dressed
   stone at the top of the square with a slate roof (gone on 'hold' if the roof was rigged), the meeting house with a bell-cote right, the
   mill and its wheel on the race left, the orchards and the ridge behind */
SCENEX.b7_village = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, md = b75aMode(), f = (S && S.f) || {}, roofless = !!(f.b7_c5_roof && f.b7_c5_holdDone);
  const day = md === 'day', dusk = md === 'dusk', wallC = day ? '#9a9284' : dusk ? '#6a5a50' : '#34322e', thC = day ? '#5a4a30' : dusk ? '#3a2c20' : '#141410', stC = day ? ['#8a8478', '#5e5a52'] : dusk ? ['#5e5048', '#3a322c'] : ['#3a3832', '#1c1b18'];
  ctx.drawImage(sceneLayer('b75:village:' + md + (roofless ? 'r' : ''), W, H, (x, W, H) => {
    b75aSky(x, W, hz, 7510, md);
    b75aHills(x, W, H, hz, day ? '#5a6050' : dusk ? '#2a2026' : '#0a0c10', .04, 1.1); // the ridge to the north
    for (let i = 0; i < 18; i++) { const ox = W*(.04 + i*.055), oy = hz + H*.01 + hash(i, 7511)*H*.02; ell(x, ox, oy - 6, 10, 7, day ? '#4a5438' : dusk ? '#22201c' : '#0a0e08'); } // the orchards
    x.fillStyle = vgrad(x, hz, H, day ? [[0,'#8a806a'],[1,'#5a5242']] : dusk ? [[0,'#4a3c32'],[1,'#221c18']] : [[0,'#16150f'],[1,'#080806']]); x.fillRect(0, hz, W, H - hz); // the square's beaten earth
    for (let i = 0; i < 70; i++) ell(x, hash(i, 7512)*W, hz + H*.1 + hash(i, 7513)*(H - hz - H*.1), 4 + hash(i, 7514)*10, 1.2 + hash(i, 7515)*2, day ? 'rgba(60,50,36,.18)' : 'rgba(0,0,0,.18)');
    // the factor's house: two floors of dressed stone at the top of the square
    const hx0 = W*.38, hx1 = W*.62, hb = hz + H*.14, ht = hb - H*.17;
    x.fillStyle = vgrad(x, ht, hb, [[0, stC[0]], [1, stC[1]]]); x.fillRect(hx0, ht, hx1 - hx0, hb - ht);
    x.strokeStyle = 'rgba(0,0,0,.25)'; x.lineWidth = .6; for (let r = 1; r < 9; r++) { x.beginPath(); x.moveTo(hx0, ht + (hb - ht)*r/9); x.lineTo(hx1, ht + (hb - ht)*r/9); x.stroke(); }
    if (!roofless) { poly(x, [[hx0 - W*.015, ht], [hx0 + W*.04, ht - H*.07], [hx1 - W*.04, ht - H*.07], [hx1 + W*.015, ht]], day ? '#3e4450' : dusk ? '#2a2830' : '#121418'); x.fillStyle = day ? '#4e4a44' : '#141210'; x.fillRect(hx1 - W*.06, ht - H*.1, W*.018, H*.05); }
    else { // the roof gone: the gable's broken edge, a black inside, a beam end sticking out
      x.fillStyle = '#070605'; x.fillRect(hx0 + 2, ht, hx1 - hx0 - 4, H*.02); poly(x, [[hx0, ht], [hx0 + W*.03, ht - H*.03], [hx0 + W*.05, ht - H*.01], [hx0 + W*.07, ht - H*.035], [hx0 + W*.08, ht]], stC[1]);
      B2F.line(x, '#1a120a', 2, [[hx1 - W*.03, ht + 2], [hx1 + W*.02, ht - H*.04]]); for (let i = 0; i < 26; i++) ell(x, W*(.36 + hash(i, 7516)*.28), hb + H*(.02 + hash(i, 7517)*.06), 3 + hash(i, 7518)*4, 1.4, 'rgba(60,62,70,.55)'); } // slates in the square
    for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { const wx = hx0 + (hx1 - hx0)*(.1 + i*.22), wy = ht + (hb - ht)*(.16 + r*.46); x.fillStyle = '#100e0c'; x.fillRect(wx, wy, W*.026, H*.04); x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(wx + W*.012, wy, 1, H*.04); } // the shutters, closed
    x.fillStyle = '#0a0806'; x.fillRect(hx0 + (hx1 - hx0)*.45, hb - H*.06, W*.024, H*.06); // the door
    // the houses either side of the square, plaster and thatch
    [[.22, .12, .09], [.8, .14, .12]].forEach(([u, w, h], i) => b75aCot(x, W*u, hz + H*(.2 + i*.02), W*w, H*h, !day && i === 1 && !dusk, wallC, thC));
    // the meeting house with its bell-cote, right of the factor's
    { const mx = W*.66, mb = hz + H*.13, mw = W*.1, mh = H*.08; b75aCot(x, mx, mb, mw, mh, false, wallC, thC); x.fillStyle = thC; x.fillRect(mx + mw*.44, mb - mh - mh*.85 - H*.04, mw*.12, H*.04); ell(x, mx + mw*.5, mb - mh - mh*.85 - H*.025, W*.005, H*.008, day ? '#8a6a3a' : '#2a2010'); }
    // the mill on its race, left: a tall plaster mill with a thatch, the race running under it, the wheel drawn live
    { const mx = W*.02, mb = hz + H*.12; b75aCot(x, mx, mb, W*.12, H*.13, false, wallC, thC); x.fillStyle = day ? 'rgba(90,110,120,.6)' : 'rgba(20,30,40,.7)'; x.fillRect(0, mb + 2, W*.24, H*.025); }
    // the well in the square, front middle: a stone head and a windlass
    { const wx = W*.74, wy = H*.84; ell(x, wx, wy + H*.02, W*.08, H*.025, 'rgba(0,0,0,.35)'); x.fillStyle = day ? '#7a746a' : dusk ? '#4a423c' : '#24221e'; x.fillRect(wx - W*.06, wy - H*.04, W*.12, H*.06); ell(x, wx, wy - H*.04, W*.06, H*.015, day ? '#8a847a' : '#2e2c28'); ell(x, wx, wy - H*.04, W*.045, H*.01, '#050404');
      B2F.line(x, '#1a140c', 2, [[wx - W*.055, wy - H*.04], [wx - W*.05, wy - H*.13]]); B2F.line(x, '#1a140c', 2, [[wx + W*.055, wy - H*.04], [wx + W*.05, wy - H*.13]]); B2F.line(x, '#2a2016', 1.6, [[wx - W*.05, wy - H*.12], [wx + W*.05, wy - H*.12]]); B2F.line(x, '#1a140c', .8, [[wx, wy - H*.12], [wx, wy - H*.06]]); }
  }), 0, 0, W, H);
  // the mill wheel, turning slowly on the race
  { const cx = W*.165, cy = H*.42 + H*.1, r = H*.055, a = mo ? t/2200 : 0; ctx.strokeStyle = day ? '#3a2a18' : dusk ? '#2a1c12' : '#120c08'; ctx.lineWidth = Math.max(1.2, H*.006); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
    for (let i = 0; i < 8; i++) { const k = a + i*Math.PI/4; B2F.line(ctx, ctx.strokeStyle, Math.max(1, H*.004), [[cx, cy], [cx + Math.cos(k)*r, cy + Math.sin(k)*r]]); ctx.fillStyle = ctx.strokeStyle; ctx.fillRect(cx + Math.cos(k)*r - 2, cy + Math.sin(k)*r - 2, 4, 4); } }
  // the light: a lantern by the race at night after 'hold'; the window at dusk going gold; a thin smoke from the roofless house
  if (md === 'night' && f.b7_c5_holdDone) { const lf = mo ? .8 + .2*Math.sin(t/500) + .05*Math.sin(t/41) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.2, H*.58, H*.08, '#ffb060', .3*lf); glow(ctx, W*.2, H*.58, 2, '#ffe0a0', .9*lf); ctx.globalCompositeOperation = 'source-over'; }
  if (dusk) { const lf = mo ? .85 + .15*Math.sin(t/700) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.85, H*.5, H*.05, '#ffa050', .2*lf); ctx.globalCompositeOperation = 'source-over'; }
  if (roofless) { const sx = W*.5, sy = H*.3; for (let i = 0; i < 12; i++) { const k = ((mo ? t/9000 : 0) + i/12) % 1, r = H*(.015 + k*.05); ell(ctx, sx + Math.sin(k*4 + i)*W*.012, sy - k*H*.28, r, r*.8, `rgba(70,70,74,${(.3*(1 - k)).toFixed(2)})`); } }
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.14 + i*Math.min(.07, .3/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, day ? .5 : .72, day ? .3 : .5); };

/* the river road by night (this file's scene): a pale road between hedges going down toward a wide black river on the right with the stars in
   it; on the ridge to the north a long line of small fires, many, far off, flickering */
SCENEX.b7_c5_lane = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.44;
  ctx.drawImage(sceneLayer('b75:lane', W, H, (x, W, H) => {
    b75aSky(x, W, hz, 7530, 'night');
    b75aHills(x, W, H, hz, '#0b0d12', .05, 2.4); // the ridge
    x.fillStyle = vgrad(x, hz, H, [[0,'#12140e'],[1,'#070806']]); x.fillRect(0, hz, W, H - hz);
    // the river, wide, along the right and coming round toward the viewer
    x.fillStyle = vgrad(x, hz, H, [[0,'#0e1622'],[1,'#060a10']]); x.beginPath(); x.moveTo(W*.56, hz + 3); x.lineTo(W, hz + 3); x.lineTo(W, H); x.lineTo(W*.8, H); x.quadraticCurveTo(W*.66, H*.7, W*.56, hz + 3); x.closePath(); x.fill();
    for (let i = 0; i < 60; i++) { const yy = hz + 6 + Math.pow(hash(i, 7531), 1.3)*(H - hz - 6), d = (yy - hz)/(H - hz), xx = W*(.6 + d*.25) + hash(i, 7532)*W*(.4 - d*.2); x.fillStyle = `rgba(200,210,240,${(.08 + hash(i, 7533)*.2).toFixed(2)})`; x.fillRect(xx, yy, 1 + d*3, 1); } // stars in the water
    // the strip of reeds along the river's near edge
    for (let i = 0; i < 90; i++) { const u = hash(i, 7534), yy = hz + 4 + u*(H - hz), xx = W*.56 + (W*.24)*Math.pow(u, 1.4) - 6 + hash(i, 7535)*10, d = u; B2F.line(x, `rgba(40,48,30,${(.4 + d*.4).toFixed(2)})`, .6 + d, [[xx, yy], [xx + 1, yy - 4 - d*12]]); }
    // the road, pale, from bottom left down toward the river
    x.fillStyle = 'rgba(150,140,110,.18)'; x.beginPath(); x.moveTo(W*.02, H); x.lineTo(W*.38, H); x.lineTo(W*.56, hz + 6); x.lineTo(W*.5, hz + 6); x.closePath(); x.fill();
    b75aStalks(x, W*.5, H, hz + 6, H, 160, 7536, [70, 78, 52]); // the barley left of the road
    // the hedge on the left
    x.fillStyle = '#050704'; x.beginPath(); x.moveTo(0, H); for (let k = 0; k <= 14; k++) { const u = k/14, px = W*(.0 + .46*u), py = H - (H - hz - 6)*u; x.lineTo(px, py - H*(.09 - .07*u)*(.8 + .4*hash(k, 7537))); } x.lineTo(W*.46, hz + 6); x.lineTo(0, hz + 6); x.closePath(); x.fill();
  }), 0, 0, W, H);
  // the Edur fires along the ridge: a long line, small, each breathing on its own
  for (let i = 0; i < 34; i++) { const u = .06 + i*.027 + hash(i, 7538)*.01; if (u > .98) break; const fx = W*u, fy = hz - H*(.05 + .04*Math.sin(u*5 + 2.4) + .02*Math.sin(u*13 + 4.8)) + 2, lf = mo ? .6 + .4*Math.sin(t/(300 + hash(i, 7539)*400) + i) : .9;
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, H*.012, '#ff8a3a', .35*lf); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = `rgba(255,190,110,${(.7*lf).toFixed(2)})`; ctx.fillRect(fx - .5, fy - .5, 1.2, 1.2); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.12 + i*Math.min(.065, .32/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .75, .55); };

/* the factor's cellar (this file's scene; B7READ[5]'s table scene): a vault of cut stone, barrels on their sides along the left, sacks along
   the back, a rack of the factor's bottles, a rushlight on a barrel-head, and the steps going up right to a trapdoor with daylight at its edge */
SCENEX.b7_c5_cellar = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fy = H*.66;
  ctx.drawImage(sceneLayer('b75:cellar', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, fy, [[0,'#0e0c0a'],[1,'#1e1a16']]); x.fillRect(0, 0, W, fy); // the back wall
    for (let r = 0; r < 8; r++) for (let i = 0; i < 12; i++) { const bx = W*(i/12 + (r % 2)*.04), by = fy*(r/8); x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = .8; x.strokeRect(bx, by, W/12, fy/8); if (hash(i, r, 7550) > .7) { x.fillStyle = 'rgba(120,110,96,.06)'; x.fillRect(bx, by, W/12, fy/8); } } // cut stone courses
    // the vault: two dark arcs over the top
    x.fillStyle = '#060504'; x.beginPath(); x.moveTo(0, 0); x.lineTo(W, 0); x.lineTo(W, H*.08); x.quadraticCurveTo(W*.75, -H*.04, W*.5, H*.1); x.quadraticCurveTo(W*.25, -H*.04, 0, H*.08); x.closePath(); x.fill();
    x.fillStyle = vgrad(x, fy, H, [[0,'#24201a'],[1,'#0e0c0a']]); x.fillRect(0, fy, W, H - fy); // the flags
    x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 1; for (let i = 0; i < 7; i++) { const k = i/6; x.beginPath(); x.moveTo(W*.5 + (k - .5)*W*.6, fy); x.lineTo(W*.5 + (k - .5)*W*2, H); x.stroke(); } for (let r = 1; r < 4; r++) { const yy = fy + (H - fy)*(r/4)*(r/4); x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); }
    // barrels on their sides along the left, two tiers
    for (let r = 0; r < 2; r++) for (let i = 0; i < 3; i++) { const bx = W*(.03 + i*.1 + r*.05), by = fy - H*(.06 + r*.11), br = H*.055;
      ell(x, bx + br*.2, by + br*.9, br*1.1, br*.25, 'rgba(0,0,0,.35)'); x.fillStyle = '#2a1c10'; x.fillRect(bx - br*.2, by - br, br*1.6, br*2); ell(x, bx + br*1.4, by, br*.55, br, '#3a2814'); ell(x, bx + br*1.4, by, br*.4, br*.8, '#2a1a0c');
      x.fillStyle = '#141414'; x.fillRect(bx + br*.1, by - br, br*.12, br*2); x.fillRect(bx + br*.9, by - br, br*.12, br*2); }
    // sacks along the back, slumped
    for (let i = 0; i < 6; i++) { const sx = W*(.36 + i*.06), sy = fy - H*.01; ell(x, sx, sy - H*.04, W*.03, H*.05, i % 2 ? '#4a4030' : '#3e3628'); ell(x, sx - W*.008, sy - H*.06, W*.012, H*.012, 'rgba(255,240,210,.06)'); }
    // the rack of the factor's bottles
    x.fillStyle = '#1a120a'; x.fillRect(W*.36, fy - H*.36, W*.2, H*.02); x.fillRect(W*.36, fy - H*.24, W*.2, H*.02);
    for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) ell(x, W*(.375 + i*.021), fy - H*(.31 - r*.12), W*.007, H*.02, i % 3 ? '#1e2a1a' : '#2a1a1e');
    // the steps going up on the right to the trapdoor
    for (let i = 0; i < 8; i++) { const sx = W*(.66 + i*.035), sy = fy - H*.06*i; x.fillStyle = i % 2 ? '#2a2620' : '#24201a'; x.fillRect(sx, sy - H*.06, W*.2, H*.06); x.fillStyle = 'rgba(255,240,210,.05)'; x.fillRect(sx, sy - H*.06, W*.2, 1); }
    x.fillStyle = '#0a0806'; x.fillRect(W*.86, H*.12, W*.12, H*.04); // the trapdoor
  }), 0, 0, W, H);
  // the daylight at the trapdoor's edge, and its thin fall down the steps
  { const dl = mo ? .85 + .15*Math.sin(t/4000) : .9; ctx.fillStyle = `rgba(255,230,170,${(.7*dl).toFixed(2)})`; ctx.fillRect(W*.86, H*.118, W*.12, 1.4); ctx.fillRect(W*.86, H*.16, W*.12, 1); ctx.fillRect(W*.86, H*.12, 1, H*.04);
    ctx.fillStyle = `rgba(255,230,170,${(.05*dl).toFixed(2)})`; ctx.beginPath(); ctx.moveTo(W*.86, H*.16); ctx.lineTo(W*.98, H*.16); ctx.lineTo(W*.92, H*.62); ctx.lineTo(W*.7, H*.62); ctx.closePath(); ctx.fill(); }
  // the rushlight on a barrel-head, left of middle
  { const rx = W*.3, ry = H*.56, lf = mo ? .8 + .15*Math.sin(t/180) + .05*Math.sin(t/37) : .9; ctx.fillStyle = '#2a1c10'; ctx.fillRect(rx - W*.03, ry, W*.06, H*.1); ell(ctx, rx, ry, W*.03, H*.012, '#3a2814');
    B2F.line(ctx, '#1a1208', 1, [[rx, ry], [rx + 1, ry - H*.03]]); ctx.globalCompositeOperation = 'lighter'; glow(ctx, rx + 1, ry - H*.035, H*.22, '#ffa050', .22*lf); glow(ctx, rx + 1, ry - H*.035, 2.5, '#ffe0a0', .95*lf); ctx.globalCompositeOperation = 'source-over'; }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.18 + i*Math.min(.075, .44/sq.length)), H*.96 - (i % 2)*3, 1.9, t, {phase:i, dir:i % 2 ? 1 : -1, still:true}));
  vign(ctx, W, H, .85, .62); };

/* the riverbank at night (this file's scene): reeds in front, a willow left, the river wide and black with stars in it across the bottom, and
   back across the fields the village: on 'hold' a dark huddle with the mill and one lantern; on 'slip' a long red glow over the trees and a
   smoke going up into it, far off */
SCENEX.b7_c5_river = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46, f = (S && S.f) || {}, slip = f.b7_c5_key === 'slip' && (f.b7_c5_ph || 1) >= 4, held = f.b7_c5_key === 'hold' && !!f.b7_c5_holdDone;
  ctx.drawImage(sceneLayer('b75:river:' + (slip ? 's' : held ? 'h' : 'n'), W, H, (x, W, H) => {
    b75aSky(x, W, hz, 7570, 'night');
    if (slip) { x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(W*.66, hz, 0, W*.66, hz, W*.3); g.addColorStop(0, 'rgba(200,70,30,.45)'); g.addColorStop(.5, 'rgba(120,40,20,.18)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, W, hz + 4); x.globalCompositeOperation = 'source-over'; }
    // the fields across, and the village far off: a huddle of roofs, the mill, trees
    x.fillStyle = vgrad(x, hz, H*.7, [[0,'#12140e'],[1,'#0a0b08']]); x.fillRect(0, hz, W, H*.7 - hz);
    for (let i = 0; i < 14; i++) { const tx = W*(.5 + i*.035), ty = hz + 1; ell(x, tx, ty - 4, 7 + hash(i, 7571)*5, 5, slip ? '#120806' : '#080a07'); } // the trees round the village
    for (let i = 0; i < 7; i++) { const bx = W*(.56 + i*.04), bw = W*.03, bh = H*.02; x.fillStyle = slip ? '#1a0c08' : '#0e0e0c'; x.fillRect(bx, hz - bh + 2, bw, bh); poly(x, [[bx - 2, hz - bh + 2], [bx + bw/2, hz - bh*2], [bx + bw + 2, hz - bh + 2]], slip ? '#140806' : '#0a0a08'); }
    // the river across the bottom, wide and still, stars in it
    const ry = H*.7; x.fillStyle = vgrad(x, ry, H, [[0,'#0c1420'],[1,'#04070c']]); x.fillRect(0, ry, W, H - ry);
    for (let i = 0; i < 80; i++) { const yy = ry + 2 + Math.pow(hash(i, 7572), 1.2)*(H - ry - 2), xx = hash(i, 7573)*W; x.fillStyle = `rgba(200,210,240,${(.06 + hash(i, 7574)*.2).toFixed(2)})`; x.fillRect(xx, yy, 1 + (yy - ry)/(H - ry)*4, 1); }
    // the near bank: a dark strip, the willow left with its hanging fall, reeds thick in front
    x.fillStyle = '#070806'; x.beginPath(); x.moveTo(0, ry + 4); for (let i = 0; i <= 20; i++) { const u = i/20; x.lineTo(u*W, ry - H*(.04 + .02*Math.sin(u*9))); } x.lineTo(W, ry + 4); x.closePath(); x.fill();
    x.fillStyle = '#050604'; x.fillRect(W*.1, H*.22, W*.03, ry - H*.22); for (let i = 0; i < 40; i++) { const a = hash(i, 7575)*Math.PI, r = W*(.06 + hash(i, 7576)*.12), sx = W*.115 + Math.cos(a)*r, sy = H*.24 - Math.sin(a)*H*.06; B2F.line(x, 'rgba(20,28,16,.8)', 1, [[sx, sy], [sx + (hash(i, 7577) - .5)*6, sy + H*(.2 + hash(i, 7578)*.25)]]); } // the willow and its fall
    b75aStalks(x, W, H, ry - H*.06, H, 260, 7579, [38, 48, 30]);
  }), 0, 0, W, H);
  // the far light: on 'slip' the glow breathing and a smoke going up into it; on 'hold' a lantern by the mill-race
  if (slip) { const lf = mo ? .8 + .2*Math.sin(t/900) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.66, hz - 2, H*.06, '#ff6a2a', .25*lf); ctx.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 12; i++) { const k = ((mo ? t/12000 : 0) + i/12) % 1, r = H*(.015 + k*.05); ell(ctx, W*.66 + Math.sin(k*3 + i)*W*.02, hz - 6 - k*H*.3, r, r*.8, `rgba(60,40,36,${(.35*(1 - k)).toFixed(2)})`); } }
  else if (held) { const lf = mo ? .8 + .2*Math.sin(t/500) + .05*Math.sin(t/43) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.6, hz - 1, H*.03, '#ffb060', .3*lf); glow(ctx, W*.6, hz - 1, 1.6, '#ffe0a0', .9*lf); ctx.globalCompositeOperation = 'source-over'; }
  // a little moving light on the water
  if (mo) for (let i = 0; i < 6; i++) { const yy = H*(.74 + i*.04), xx = (W*hash(i, 7580) + t/(60 + i*20)) % W; ctx.fillStyle = 'rgba(200,210,240,.12)'; ctx.fillRect(xx, yy, 6 + i*2, 1); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.2 + i*Math.min(.07, .34/sq.length)), H*.68 - (i % 2)*2, 1.6, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .78, .58); };

/* ---------------- the chapter's gear: ART['item/<key>'] in the series' 200×150 item style (089g), on Book Six's smoke-umber ground ---------------- */
(function(){
  if (typeof ART === 'undefined') return;
  const O = 'stroke="#0b0806" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"';
  const sh = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#@sh)"/>`;
  const S = (d, fill, lit = '@lit') => `<path d="${d}" fill="${fill}"/><path d="${d}" fill="url(#${lit})"/><path d="${d}" fill="none" ${O}/>`;
  const lin = (id, stops, x2 = 1, y2 = 1) => `<linearGradient id="@${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  const BASE = `<radialGradient id="@bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#40291f"/><stop offset=".62" stop-color="#22150f"/><stop offset="1" stop-color="#100907"/></radialGradient>`
    + `<radialGradient id="@sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset=".55" stop-color="#000" stop-opacity=".32"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`
    + lin('lit', [[0, '#fff', .2], [.45, '#fff', 0], [.6, '#000', 0], [1, '#000', .42]])
    + lin('ir', [[0, '#8a8e94'], [.4, '#5a5e64'], [.8, '#34383e'], [1, '#1e2024']], 0, 1)
    + lin('wd', [[0, '#9c7649'], [.5, '#6e4f2e'], [1, '#3c2916']], 0, 1);
  function put(key, label, defs, body){
    const P = key.replace(/[^a-z0-9]/g, '') + '-';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="${label.replace(/"/g, '&quot;')}"><defs>${BASE}${defs}</defs><rect width="200" height="150" fill="url(#@bg)"/>${body}</svg>`;
    ART['item/' + key] = svg.replace(/@/g, P);
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [200, 150];
  }

  /* the village's old shield: a wide oval of oak planks bound in iron, faced with bullock hide gone the colour of old tea, a heron painted on
     it in a faded blue, standing on one leg; iron studs round the rim, a split in one plank mended with a strip of iron */
  { const ov = 'M100 18 C146 18 168 46 168 76 C168 106 146 134 100 134 C54 134 32 106 32 76 C32 46 54 18 100 18 Z';
    let studs = ''; for (let i = 0; i < 18; i++) { const a = i/18*Math.PI*2, x = 100 + Math.cos(a)*63, y = 76 + Math.sin(a)*53; studs += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="url(#@ir)" ${O}/>`; }
    put('b7_c5_villageshield', 'The village\'s old shield',
      `<radialGradient id="@hd" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#b08a5a"/><stop offset=".6" stop-color="#7a5a36"/><stop offset="1" stop-color="#3a2614"/></radialGradient>`,
      sh(100, 140, 70, 6)
      + S(ov, 'url(#@hd)')
      + [52, 76, 100, 124, 148].map(x => `<path d="M${x} ${x === 52 || x === 148 ? 34 : 20} L${x} ${x === 52 || x === 148 ? 118 : 132}" stroke="#2a1a0c" stroke-opacity=".4" stroke-width="1"/>`).join('') // the plank seams under the hide
      + `<path d="${ov}" fill="none" stroke="url(#@ir)" stroke-width="6"/><path d="${ov}" fill="none" ${O}/>`
      + `<path d="M34 76 L166 76" stroke="url(#@ir)" stroke-width="4" stroke-opacity=".85"/>`
      + `<path d="M58 92 L84 96 L83 100 L57 97 Z" fill="url(#@ir)" ${O}/>` // the iron mend
      // the heron, faded blue: a long neck in an S, the bill, one leg down, the other tucked
      + `<g fill="none" stroke="#6a8aa8" stroke-opacity=".75" stroke-linecap="round" stroke-linejoin="round">`
      + `<path d="M92 104 Q80 96 86 84 Q92 72 104 74 Q112 76 108 66 Q104 56 94 54" stroke-width="5"/>`
      + `<path d="M94 54 L76 50" stroke-width="2.4"/>`
      + `<path d="M84 106 Q100 116 124 104 Q128 94 114 88 Q98 86 88 96 Z" fill="#6a8aa8" fill-opacity=".7" stroke-width="2"/><path d="M124 104 L136 110" stroke-width="2"/>`
      + `<path d="M104 108 L104 124 M104 124 L98 128 M104 124 L110 127" stroke-width="2"/>`
      + `</g>`
      + `<circle cx="93" cy="55" r="1.4" fill="#1a1410"/>`
      + studs
      + `<path d="M60 36 Q80 26 100 26" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="3"/>`);
  }

  /* an Edur long blade: a long single-edged blade of dark grey iron laid on the diagonal, a slight curve at the tip, a long two-hand grip bound
     in black cord, a small square guard; a line of small marks cut into the spine near the hilt */
  { let marks = ''; for (let i = 0; i < 9; i++) marks += `<path d="M${(76 + i*5.2).toFixed(1)} ${(80.6 - i*2.62).toFixed(1)} l-1.6 -3.4" stroke="#c8ccd2" stroke-opacity=".55" stroke-width=".9"/>`;
    put('b7_c5_edurblade', 'An Edur long blade',
      lin('bl', [[0, '#9aa0a8'], [.45, '#5a6068'], [1, '#22262c']], 0, 1),
      sh(104, 126, 82, 6)
      + `<g transform="rotate(-27 100 76)">`
      + S('M60 72 L176 70 Q186 72 182 76 Q176 82 160 82 L60 80 Z', 'url(#@bl)')
      + `<path d="M62 79 L162 80.5" stroke="#e8ecf0" stroke-opacity=".5" stroke-width=".8"/>` // the edge
      + `<path d="M62 73.4 L174 71.2" stroke="#101216" stroke-opacity=".7" stroke-width="1"/>` // the spine
      + `</g>`
      + marks
      + `<g transform="rotate(-27 100 76)">`
      + S('M52 66 L60 66 L60 86 L52 86 Z', 'url(#@ir)')
      + S('M14 72 L52 72 L52 80 L14 80 Z', '#1a1612')
      + Array.from({length: 8}, (_, i) => `<path d="M${18 + i*4.4} 72 l2.4 8" stroke="#3a342c" stroke-width="1.2"/>`).join('')
      + S('M8 70 L15 70 L15 82 L8 82 Z', 'url(#@ir)')
      + `</g>`);
  }
})();
