/* ============ Book Nine, Chapter 1 art: Letheras, Emptied — the Malazan barracks and the quarter behind it, the night the barracks
   emptied and the days after ============ */
/* Book Nine's look (160b) in Letheras: Book Seven's city (122b, 81b), emptied and quiet. Night is slate-blue with the barracks dark, one fire,
   the old towers and the new dome black over the wall, and, after the roof goes in, a pale column of dust standing over the roofs to the
   south in the moonlight (never what made it). Day is a tired pale sky with Book Nine's dust in it and a low warm light.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     brask        (replaces 160's simple sprite) the heavy of the 9th: big, heavy scale doubled at the shoulders, a round helm with the
                  cheek-guards bent back, the heavy sword slung over the right shoulder, a mace on a thong, the tally-stick at the belt
     b9_c1_thallo the drill sergeant's corporal: as big as a door, scale, a broken nose, bare-headed, a ring of keys at the belt and a
                  heel of bread in the front fist
   Six backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b9_letheras_night  the barracks yard at night (160's caption): the bunk-houses dark, kit-crates, the Third's small fire, the city over
                        the wall, and after the roof goes in, the dust standing over the roofs
     b9_barracks        the same yard by day: wagons backed up to the gate, kit in heaps, heavies counting crates
     b9_c1_street       the quarter behind the barracks at night: shuttered plaster houses, not one lamp but the woman's at her door, a
                        stable-yard gate, the canal glint at the lane's end
     b9_c1_stable       a stable yard at night: a lean-to, a cart with its shafts down, straw, a lantern; the dead horse lying under a
                        sheet, or standing, dark, head up (on 'stores' the night it stood); never close, never more than a shape
     b9_c1_lanes        the quarter by day: shutters open on empty rooms, a door broken in off one hinge, a chair alone in the lane, a
                        handcart with a wheel off
     b9_c1_tavern       a soldiers' taproom: low beams, a counter, a lamp on a hook, the old Letherii soldiers at the back table
   Ground (TILEX): b9_c1_barracks (Book Five's b5_c1_barracks, with 'S' the stores door, 'h' the stable gate, 'w' a wagon, 'k' kit-crates),
   b9_c1_quarter (the lanes), b9_c1_taproom (the brawl). The chapter's gear in the series' 200×150 item style, on Book Nine's ground: dusk
   dust-brown (#4a3c2c → #140f0a), a low warm rim light. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Brask: thirty-five, big; heavy scale with the shoulders doubled, a round helm with the cheek-guards bent back so he can hear, the heavy
     infantry sword slung over the right shoulder like a carter's pole, a mace on a thong at the hip, his old squad's tally-stick in the belt */
  brask(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.1, 1.06);
    B2F.line(ctx, '#3a3228', 1.8, [[5.4, 4], [9.6, -16]]); B2F.line(ctx, '#cfc8b8', 2.2, [[8.6, -11], [11.6, -24]]); ctx.fillStyle = '#6a5a3a'; ctx.fillRect(7.4, -11.6, 4, 1.4); // the heavy sword over the shoulder, its guard
    h.legs('#2a2622'); ctx.fillStyle = '#3a342c'; ctx.fillRect(-4.8, 9.6, 3.8, 3.4); ctx.fillRect(1, 9.6, 3.8, 3.4); // heavy boots
    poly(ctx, [[-7,-6.4],[7,-6.4],[6.6,7.8],[-6.6,7.8]], h.armor('#7e7868', '#2a2822'));
    ctx.fillStyle = 'rgba(0,0,0,.28)'; for (let y = -4.6; y < 7; y += 2) ctx.fillRect(-6.6, y, 13.2, .6); // the scale's rows
    poly(ctx, [[-8.6,-7],[-3.4,-7],[-3.8,-2.6],[-8.8,-3]], h.armor('#8e887a', '#3a362e')); poly(ctx, [[8.6,-7],[3.4,-7],[3.8,-2.6],[8.8,-3]], h.armor('#8e887a', '#3a362e')); // the doubled shoulders
    ctx.fillStyle = 'rgba(230,200,150,.14)'; ctx.fillRect(-6.6, -6, 1.2, 12); // the low warm light on the lit edge
    ctx.fillStyle = '#2a2018'; ctx.fillRect(-6.8, 3.4, 13.6, 1.3); ctx.fillStyle = '#c8b890'; ctx.fillRect(-3.4, 2.6, .9, 3.6); ctx.fillStyle = '#5a4a32'; ctx.fillRect(-3.4, 3.6, .9, .4); // the belt, the tally-stick
    B2F.line(ctx, '#4a3c2a', .7, [[-6.2, 4.2], [-7.8, 8]]); ell(ctx, -7.9, 8.6, 1.5, 1.5, '#5a5850'); // the mace on its thong
    h.head('#b08a6a', 4.6, -11.2); h.look('rgba(20,12,10,.85)', -11.4);
    ctx.fillStyle = '#5a5850'; ctx.beginPath(); ctx.arc(0, -12.4, 5.2, Math.PI, 0); ctx.fill(); ctx.fillRect(-5.6, -12.8, 11.2, 1.2); // the round helm
    poly(ctx, [[-5.2,-12],[-4,-12],[-6.6,-8.6],[-7.4,-9.4]], '#4a4842'); poly(ctx, [[5.2,-12],[4,-12],[6.6,-8.6],[7.4,-9.4]], '#4a4842'); // the cheek-guards, bent back
    ctx.fillStyle = 'rgba(255,240,210,.18)'; ctx.fillRect(-4, -16.6, 3, 1);
    ctx.restore(); },
  /* Thallo: the drill sergeant's corporal. Very big, bare-headed with cropped hair, a broken nose, scale, a ring of keys at the belt, a heel
     of bread in the front fist */
  b9_c1_thallo(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.14, 1.08);
    h.legs('#2a2420'); poly(ctx, [[-7.2,-6.2],[7.2,-6.2],[7,8],[-7,8]], h.armor('#746e60', '#26241e'));
    ctx.fillStyle = 'rgba(0,0,0,.26)'; for (let y = -4.4; y < 7; y += 2.1) ctx.fillRect(-7, y, 14, .6);
    ctx.fillStyle = '#2a2018'; ctx.fillRect(-7, 3.6, 14, 1.3);
    ctx.strokeStyle = '#a89a78'; ctx.lineWidth = .7; ctx.beginPath(); ctx.arc(-4.6, 6.4, 1.6, 0, 7); ctx.stroke(); ctx.fillStyle = '#a89a78'; ctx.fillRect(-5, 7.6, .7, 2); ctx.fillRect(-4, 7.8, .7, 1.6); // the ring of keys
    ctx.fillStyle = '#b48a68'; ctx.fillRect(6, -1.4, 2.6, 3.2); ell(ctx, 8.6, -1.8, 2.4, 1.6, '#c89a5a'); ell(ctx, 8.4, -2.2, 1.6, .9, '#e0b878'); // the fist, the heel of bread
    h.head('#b48a68', 4.8, -11.2); h.look('rgba(20,12,10,.85)', -11.4);
    ctx.fillStyle = '#2a2018'; ctx.beginPath(); ctx.arc(0, -12.8, 4.9, Math.PI*1.02, Math.PI*1.98); ctx.fill(); // cropped hair
    ctx.fillStyle = '#9a7056'; ctx.fillRect(2.6, -11, 1.4, 2.2); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(3, -10.4, .7, 1); // the broken nose
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* the barracks yard (Book Seven's b72Yard, redrawn for the night it emptied): every bunk-house window dark at night (lit=false), the
   stores' iron-bound door at the head of the yard, the city over the wall, the gate arch right. Returns the horizon. */
function b91aYard(x, W, H, day){ const hz = H*.44;
  x.fillStyle = vgrad(x, 0, hz, day ? [[0,'#8a8478'],[.7,'#b4a890'],[1,'#c8b898']] : [[0,'#05070e'],[.7,'#10142a'],[1,'#1a1c2c']]); x.fillRect(0, 0, W, hz + 2);
  if (!day) for (let i = 0; i < 50; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 9111)*.4).toFixed(2)})`; x.fillRect(hash(i, 9112)*W, Math.pow(hash(i, 9113), 1.4)*hz*.7, 1, 1); }
  else { glow(x, W*.2, hz, W*.6, '#e8c890', .25); for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(220,206,180,.3)'; x.beginPath(); x.ellipse(hash(i, 9114)*W, hz*(.2 + hash(i, 9115)*.4), W*.16, hz*.06, 0, 0, 7); x.fill(); } } // a tired sky with dust in it
  b51Skyline(x, W, hz - H*.07, H*.12, day ? '#7a7466' : '#0c0e16', null, day ? 'rgba(120,112,96,.7)' : 'rgba(50,54,70,.6)'); // the city over the wall: no lamps tonight
  x.fillStyle = day ? '#6a6458' : '#1c1e26'; x.fillRect(0, hz - H*.07, W, H*.07 + 2); x.fillStyle = day ? 'rgba(255,236,200,.16)' : 'rgba(150,165,210,.1)'; x.fillRect(0, hz - H*.07, W, 1); // the yard wall
  x.fillStyle = vgrad(x, hz, H, day ? [[0,'#7a7266'],[1,'#4a443a']] : [[0,'#1a1c22'],[1,'#0e0f13']]); x.fillRect(0, hz, W, H - hz); // the flags
  x.strokeStyle = day ? 'rgba(30,24,16,.22)' : 'rgba(0,0,0,.35)'; x.lineWidth = 1; for (let r = 0; r < 8; r++) { const yy = hz + Math.pow(r/8, 1.4)*(H - hz); x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); }
  for (let c = -6; c <= 6; c++) { x.beginPath(); x.moveTo(W/2 + c*W*.03, hz); x.lineTo(W/2 + c*W*.22, H); x.stroke(); }
  [[0, .3], [.62, .8]].forEach(([a, b], s) => { const x0 = W*a, x1 = W*b, top = hz - H*.04, bot = hz + H*.2;
    x.fillStyle = day ? '#5a5a60' : '#222a36'; x.fillRect(x0, top - H*.04, x1 - x0, H*.06); // slate
    x.fillStyle = day ? '#6a645c' : '#26242c'; x.fillRect(x0, top + H*.02, x1 - x0, bot - top);
    for (let i = 0; i < 4; i++) { const wx = lerp(x0, x1, (i + .5)/4); if (wx > x1 - 4) continue;
      x.fillStyle = day ? '#3a342e' : '#100e14'; x.fillRect(wx - 3, top + H*.07, 6, 7); x.fillStyle = day ? '#4a443c' : '#1c1a20'; x.fillRect(wx - 4, top + H*.07, 1.4, 7); x.fillRect(wx + 2.6, top + H*.07, 1.4, 7); }
    if (s === 1) { const dx = (x0 + x1)/2 - W*.03; x.fillStyle = day ? '#3a2a1a' : '#1a120c'; x.fillRect(dx, top + H*.06, W*.06, bot - top - H*.06); // the stores door, iron-bound
      x.fillStyle = day ? '#5a5248' : '#2e2a28'; [.12, .5, .86].forEach(k => x.fillRect(dx, top + H*.06 + (bot - top - H*.06)*k, W*.06, 1.6));
      x.strokeStyle = day ? '#8a8270' : '#4a4640'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(dx + W*.01, top + H*.12); x.quadraticCurveTo(dx + W*.03, top + H*.16, dx + W*.05, top + H*.12); x.stroke(); } }); // the chain
  const gx0 = W*.84, gx1 = W*.98, gt = hz - H*.16, gb = hz + H*.16;
  x.fillStyle = day ? '#9a9080' : '#16161c'; x.fillRect(gx0 + W*.025, gt + H*.05, gx1 - gx0 - W*.05, gb - gt - H*.05); // the lane through the gate
  x.fillStyle = day ? '#6a6458' : '#28282e'; x.fillRect(gx0, gt, W*.025, gb - gt); x.fillRect(gx1 - W*.025, gt, W*.025, gb - gt);
  x.beginPath(); x.moveTo(gx0, gt + H*.05); x.quadraticCurveTo((gx0 + gx1)/2, gt - H*.04, gx1, gt + H*.05); x.lineTo(gx1, gt); x.lineTo(gx0, gt); x.closePath(); x.fill();
  return hz; }
/* kit-crates in a heap, lit or not */
function b91aCrates(x, cx, cy, s, day){ const c = day ? ['#6a5034', '#5a4430', '#7a5e3c'] : ['#2a2016', '#22190f', '#30241a'];
  ell(x, cx, cy + 1*s, 18*s, 3*s, 'rgba(0,0,0,.4)');
  [[-14, -10, 12, 10, 0], [-1, -10, 14, 10, 1], [-8, -19, 12, 9, 2]].forEach(([dx, dy, w, hh, i]) => { x.fillStyle = c[i]; x.fillRect(cx + dx*s, cy + dy*s, w*s, hh*s); x.strokeStyle = 'rgba(0,0,0,.5)'; x.lineWidth = 1; x.strokeRect(cx + dx*s + .5, cy + dy*s + .5, w*s - 1, hh*s - 1);
    x.beginPath(); x.moveTo(cx + dx*s, cy + dy*s); x.lineTo(cx + (dx + w)*s, cy + (dy + hh)*s); x.stroke(); }); }
/* a supply wagon backed up, side on: bed, tilt, two wheels, shafts down */
function b91aWagon(x, cx, cy, s, day){ const wd = day ? '#5a4430' : '#20180e';
  x.fillStyle = day ? '#c8b896' : '#3a362c'; x.beginPath(); x.moveTo(cx - 20*s, cy - 12*s); x.quadraticCurveTo(cx, cy - 26*s, cx + 20*s, cy - 12*s); x.closePath(); x.fill(); // the tilt
  x.fillStyle = wd; x.fillRect(cx - 21*s, cy - 12*s, 42*s, 6*s); B2F.line(x, wd, 1.6*s, [[cx + 21*s, cy - 7*s], [cx + 34*s, cy - 1*s]]);
  [-12, 12].forEach(d => { x.strokeStyle = day ? '#3a2a1a' : '#100c08'; x.lineWidth = 1.6*s; x.beginPath(); x.arc(cx + d*s, cy - 3*s, 5*s, 0, 7); x.stroke(); x.beginPath(); x.moveTo(cx + d*s - 5*s, cy - 3*s); x.lineTo(cx + d*s + 5*s, cy - 3*s); x.moveTo(cx + d*s, cy - 8*s); x.lineTo(cx + d*s, cy + 2*s); x.stroke(); }); }
/* the dust of a roof gone in, standing over the city to the south: a pale slow column in the moonlight (after S.f.b9_c1_roof) */
function b91aDust(ctx, x0, base, W, H, t, mo){ for (let i = 0; i < 6; i++) { const k = i/6, dx = mo ? Math.sin(t/3000 + i)*W*.006 : 0;
  ctx.fillStyle = `rgba(190,188,196,${(.12 - k*.08).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(x0 + dx + k*k*W*.08, base - k*H*.14, W*(.025 + k*k*.09), H*(.035 + k*.02), 0, 0, 7); ctx.fill(); } } // a soft plume, leaning with the night air
/* a Letheras house front, plaster over brick, a tile roof's edge, shutters closed (or open on a dark room, by day: open) */
function b91aFront(x, x0, x1, base, top, seed, day, open){ x.fillStyle = vgrad(x, top, base, day ? [[0,'#8a7c66'],[1,'#5e5446']] : [[0,'#1e1e26'],[1,'#0c0c10']]); x.fillRect(x0, top, x1 - x0, base - top);
  x.fillStyle = day ? '#6a3e2a' : '#140c0a'; x.fillRect(x0 - 2, top - 4, x1 - x0 + 4, 4); // the tile eave
  const n = Math.max(1, Math.round((x1 - x0)/24)); for (let r = 0; r < 2; r++) for (let i = 0; i < n; i++) { const wx = x0 + (x1 - x0)*(i + .5)/n - 4, wy = top + (base - top)*(.16 + r*.34);
    const op = open && hash(i + r*7, seed) > .4; x.fillStyle = op ? (day ? '#1e1a16' : '#050507') : (day ? '#5a4632' : '#1a1410'); x.fillRect(wx, wy, 8, 10);
    if (op) { x.fillStyle = day ? '#6a5236' : '#221a12'; x.fillRect(wx - 5, wy, 4, 10); x.fillRect(wx + 9, wy, 4, 10); } else { x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(wx + 3.6, wy, .8, 10); } }
  for (let i = 0; i < 14; i++) ell(x, x0 + hash(i, seed + 1)*(x1 - x0), top + hash(i, seed + 2)*(base - top), 2 + hash(i, seed + 3)*3, 1.2, day ? 'rgba(60,46,30,.14)' : 'rgba(90,96,110,.1)'); }

/* ---------------- the backdrops ---------------- */
/* the barracks yard at night (160's caption; B9READ[1]'s scene): the bunk-houses dark, kit-crates, the Third's small fire, the city over the
   wall with no lamps in it; after the roof goes in, its dust standing pale over the roofs to the south */
SCENEX.b9_letheras_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), hz = H*.44, f = (S && S.f) || {};
  ctx.drawImage(sceneLayer('b91:yardn', W, H, (x, W, H) => { b91aYard(x, W, H, false); b91aCrates(x, W*.62, H*.82, H/150, false); b91aCrates(x, W*.12, H*.74, H/220, false); }), 0, 0, W, H);
  if (f.b9_c1_roof || (S && S.chapter > 1)) b91aDust(ctx, W*.4, hz - H*.08, W, H, t, mo);
  const fx = W*.46, fy = H*.86; ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy - 4, H*.36, '#ff8a3a', .24*fl); ctx.globalCompositeOperation = 'source-over';
  ell(ctx, fx, fy, 9, 3, '#1a0e06'); poly(ctx, [[fx - 7, fy], [fx - 2, fy - 12*fl], [fx + 1, fy - 6], [fx + 4, fy - 11*fl], [fx + 7, fy]], 'rgba(255,150,60,.95)'); poly(ctx, [[fx - 3, fy], [fx, fy - 7*fl], [fx + 3, fy]], 'rgba(255,230,150,.95)');
  if (S && S.f && S.f.b9_c1_ph && !(S.f.b9_c1_ph >= 3)) drawFigure(ctx, 'b9_c1_thallo', W*.72, H*.66, 1.15, t, {dir:-1});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.1 + i*Math.min(.055, .3/sq.length)), H*.96 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .74, .5); };

/* the barracks yard by day, the days after: wagons backed up to the gate in a line, kit in heaps, heavies at the crates */
SCENEX.b9_barracks = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.44;
  ctx.drawImage(sceneLayer('b91:yardd', W, H, (x, W, H) => { b91aYard(x, W, H, true); b91aWagon(x, W*.66, hz + H*.22, H/180, true); b91aWagon(x, W*.84, hz + H*.18, H/220, true);
    b91aCrates(x, W*.3, H*.8, H/160, true); b91aCrates(x, W*.5, H*.7, H/240, true);
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(200,180,140,${(.05 + hash(i, 9131)*.08).toFixed(2)})`; x.fillRect(hash(i, 9132)*W, hz + hash(i, 9133)*(H - hz), 2, 1); } }), 0, 0, W, H); // dust on the flags
  [[.38, 1, 0], [.54, -1, 1], [.74, 1, 2]].forEach(([u, d, i]) => drawFigure(ctx, 'b2soldier', W*u, H*.74 + i*2, 1.2, t, {dir:d, phase:i + 3}));
  ctx.fillStyle = 'rgba(220,200,160,.06)'; ctx.fillRect(0, 0, W, H); // the day's dust over everything
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .55, .5); };

/* the quarter behind the barracks at night: shuttered plaster houses closing in, not one lamp but the woman's at her door, the stable-yard
   gate on the right, the canal's glint at the lane's end, and the dust of the fallen roof over the roofs once it has gone in */
SCENEX.b9_c1_street = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, f = (S && S.f) || {}, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b91:street', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#04060c'],[.7,'#0e1224'],[1,'#181a2a']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 9141)*.4).toFixed(2)})`; x.fillRect(hash(i, 9142)*W, Math.pow(hash(i, 9143), 1.5)*hz*.8, 1, 1); }
    ell(x, W*.78, H*.1, 7, 7, 'rgba(230,232,240,.8)'); glow(x, W*.78, H*.1, H*.2, '#c8d0e8', .12); // the moon
    b51Skyline(x, W, hz, H*.1, '#0a0c14', null, null);
    x.fillStyle = vgrad(x, hz, H, [[0,'#16161c'],[1,'#08080a']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 80; i++) { const d = hash(i, 9144), yy = hz + Math.pow(d, .7)*(H - hz), cx = W*.5 + (hash(i, 9145) - .5)*W*(.2 + d*.9); ell(x, cx, yy, 2 + d*5, 1 + d*1.6, `rgba(${46 + Math.round(d*24)},${48 + Math.round(d*26)},${60 + Math.round(d*40)},.35)`); } // setts
    b91aFront(x, -4, W*.3, H*.86, H*.16, 9150, false, false); b91aFront(x, W*.3, W*.42, H*.6, H*.3, 9151, false, false);
    b91aFront(x, W*.7, W + 4, H*.86, H*.18, 9152, false, false); b91aFront(x, W*.58, W*.7, H*.6, H*.3, 9153, false, false);
    x.fillStyle = '#0e1a1a'; x.fillRect(W*.42, H*.56, W*.16, H*.04); x.fillStyle = 'rgba(120,150,170,.25)'; x.fillRect(W*.44, H*.575, W*.12, 1); // the canal at the lane's end
    x.fillStyle = '#1a140e'; x.fillRect(W*.76, H*.5, W*.12, H*.36); x.fillStyle = 'rgba(0,0,0,.5)'; x.fillRect(W*.818, H*.5, 1.4, H*.36); [.56, .74].forEach(k => { x.fillStyle = '#2a2018'; x.fillRect(W*.76, H*k, W*.12, 2); }); // the stable-yard gate
    x.fillStyle = '#20160e'; x.fillRect(W*.14, H*.56, W*.07, H*.3); }), 0, 0, W, H); // the household's door
  if (f.b9_c1_roof) b91aDust(ctx, W*.32, hz - H*.02, W, H, t, mo);
  const lx = W*.235, ly = H*.6; ctx.fillStyle = '#100c0a'; ctx.fillRect(lx - 1, ly - 8, 4, 1.2); ctx.fillStyle = `rgba(255,190,110,${(.85*fl).toFixed(2)})`; ctx.fillRect(lx, ly - 6, 3.4, 5); // the woman's lamp on its hook
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx + 1.7, ly - 3, H*.22, '#ffb060', .22*fl); ctx.globalCompositeOperation = 'source-over';
  if (S && S.f && S.f.b9_c1_key === 'street' && !S.f.b9_c1_dawn) drawFigure(ctx, 'b5_c5_refugee', W*.2, H*.88, 1.3, t, {dir:1, phase:2});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.36 + i*Math.min(.055, .28/sq.length)), H*.96 - (i % 2)*2, 1.6, t, {phase:i, dir:1}));
  vign(ctx, W, H, .76, .5); };

/* a stable yard at night: a lean-to of stalls, a cart with its shafts down, straw, a lantern on a hook. The dead horse is a shape: under a
   sheet in the straw, or (on 'stores', the night it stood, until the thieves) standing dark with its head up. Never closer than this. */
SCENEX.b9_c1_stable = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), f = (S && S.f) || {}, hz = H*.36;
  ctx.drawImage(sceneLayer('b91:stable', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#04060c'],[1,'#141828']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 9161)*.35).toFixed(2)})`; x.fillRect(hash(i, 9162)*W, hash(i, 9163)*hz*.8, 1, 1); }
    x.fillStyle = vgrad(x, hz, H, [[0,'#1c1812'],[1,'#0c0a08']]); x.fillRect(0, hz, W, H - hz); // the yard's beaten earth
    for (let i = 0; i < 90; i++) { const yy = hz + H*.2 + hash(i, 9164)*(H - hz - H*.2); x.strokeStyle = `rgba(150,120,60,${(.12 + hash(i, 9165)*.18).toFixed(2)})`; x.lineWidth = 1; x.beginPath(); const sx = hash(i, 9166)*W; x.moveTo(sx, yy); x.lineTo(sx + (hash(i, 9167) - .5)*10, yy - 2); x.stroke(); } // straw
    x.fillStyle = '#100c08'; poly(x, [[0, hz - H*.06], [W*.7, hz - H*.06], [W*.74, hz + H*.04], [0, hz + H*.04]], '#120e0a'); // the lean-to roof
    x.fillStyle = '#0a0806'; x.fillRect(0, hz + H*.04, W*.72, H*.3); for (let i = 0; i < 5; i++) { x.fillStyle = '#1a140e'; x.fillRect(W*(.02 + i*.14), hz + H*.04, W*.012, H*.3); } // the stalls
    x.fillStyle = '#1a140e'; x.fillRect(W*.76, H*.6, W*.18, H*.1); B2F.line(x, '#1a140e', 2, [[W*.76, H*.66], [W*.66, H*.84]]); B2F.line(x, '#1a140e', 2, [[W*.78, H*.68], [W*.7, H*.86]]); // the cart, shafts down
    [W*.8, W*.92].forEach(cx => { x.strokeStyle = '#120e0a'; x.lineWidth = 2; x.beginPath(); x.arc(cx, H*.72, H*.06, 0, 7); x.stroke(); }); }), 0, 0, W, H);
  const lx = W*.36, ly = hz + H*.08; ctx.fillStyle = `rgba(255,190,110,${(.8*fl).toFixed(2)})`; ctx.fillRect(lx, ly, 3.4, 5); ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx + 1.7, ly + 3, H*.3, '#ffa050', .18*fl); ctx.globalCompositeOperation = 'source-over';
  const standing = f.b9_c1_horse && f.b9_c1_key !== 'street' && !f.b9_c1_storesDone, gone = f.b9_c1_horseOut === 'out' && S && S.node !== 'b9_c1_horse_ok' && f.b9_c1_key === 'street';
  if (!gone) { if (standing) b2Horse(ctx, W*.5, H*.8, H/70, '#08070a', 1, false);
    else { ell(ctx, W*.5, H*.8, W*.1, H*.04, 'rgba(0,0,0,.5)'); ctx.fillStyle = f.b9_c1_horse ? '#0c0a0c' : '#5a564c'; ctx.beginPath(); ctx.ellipse(W*.5, H*.77, W*.09, H*.04, 0, Math.PI, 0); ctx.fill(); // a long low shape in the straw (a sheet over it until it stood)
      if (!f.b9_c1_horse) { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(W*.43, H*.765, W*.14, 1); } } }
  if (f.b9_c1_key === 'street' && !f.b9_c1_dawn) drawFigure(ctx, 'b5_c5_refugee', W*.86, H*.86, 1.2, t, {dir:-1, phase:3});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.04 + i*Math.min(.05, .24/sq.length)), H*.97 - (i % 2)*2, 1.55, t, {phase:i, dir:1}));
  vign(ctx, W, H, .8, .55); };

/* the quarter by day: shutters open on empty rooms, a door broken in off one hinge, a chair alone in the lane, a handcart with a wheel off,
   a tired sky with dust in it */
SCENEX.b9_c1_lanes = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42;
  ctx.drawImage(sceneLayer('b91:lanes', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#8a8478'],[.7,'#b8ac94'],[1,'#ccbc9c']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.3, hz, W*.5, '#e8c890', .22);
    b51Skyline(x, W, hz, H*.1, '#8a8070', null, null);
    x.fillStyle = vgrad(x, hz, H, [[0,'#7a7060'],[1,'#4a4236']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 80; i++) { const d = hash(i, 9174), yy = hz + Math.pow(d, .7)*(H - hz), cx = W*.5 + (hash(i, 9175) - .5)*W*(.2 + d*.9); ell(x, cx, yy, 2 + d*5, 1 + d*1.6, `rgba(${70 + Math.round(d*30)},${62 + Math.round(d*26)},${50 + Math.round(d*20)},.4)`); }
    b91aFront(x, -4, W*.3, H*.86, H*.16, 9180, true, true); b91aFront(x, W*.3, W*.42, H*.6, H*.3, 9181, true, true);
    b91aFront(x, W*.7, W + 4, H*.86, H*.18, 9182, true, true); b91aFront(x, W*.58, W*.7, H*.6, H*.3, 9183, true, false);
    x.fillStyle = '#0e0a08'; x.fillRect(W*.8, H*.56, W*.08, H*.3); x.save(); x.translate(W*.8, H*.56); x.rotate(-.35); x.fillStyle = '#5a4430'; x.fillRect(-W*.07, 0, W*.07, H*.28); x.restore(); // the door broken in, hanging off a hinge
    x.fillStyle = '#4a3622'; x.fillRect(W*.47, H*.76, W*.03, H*.04); x.fillRect(W*.47, H*.68, W*.006, H*.1); x.fillRect(W*.494, H*.78, W*.006, H*.06); x.fillRect(W*.47, H*.78, W*.006, H*.06); // a chair alone in the lane
    x.fillStyle = '#5a4430'; x.save(); x.translate(W*.22, H*.86); x.rotate(.12); x.fillRect(-W*.06, -H*.06, W*.12, H*.04); x.restore(); x.strokeStyle = '#3a2a1a'; x.lineWidth = 2; x.beginPath(); x.arc(W*.27, H*.88, H*.03, 0, 7); x.stroke(); // the handcart, its wheel off
    for (let i = 0; i < 50; i++) { x.fillStyle = `rgba(210,190,150,${(.05 + hash(i, 9184)*.08).toFixed(2)})`; x.fillRect(hash(i, 9185)*W, hz + hash(i, 9186)*(H - hz), 2, 1); } }), 0, 0, W, H);
  if (S && S.f && !S.f.b9_c1_lootersDone) drawFigure(ctx, 'b5_letherii', W*.84, H*.86, 1.2, t, {dir:-1, phase:4});
  ctx.fillStyle = 'rgba(220,200,160,.06)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.34 + i*Math.min(.055, .28/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .55, .5); };

/* a soldiers' taproom by the barracks: low beams, a counter, a lamp on a hook, the old Letherii soldiers at the back table */
SCENEX.b9_c1_tavern = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), fy = H*.78;
  ctx.drawImage(sceneLayer('b91:tavern', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, fy, [[0,'#1a120c'],[1,'#2a1e14']]); x.fillRect(0, 0, W, fy); x.fillStyle = vgrad(x, fy, H, [[0,'#2a2016'],[1,'#120c08']]); x.fillRect(0, fy, W, H - fy);
    for (let i = 0; i < 5; i++) { x.fillStyle = '#0e0a06'; x.fillRect(0, H*(.06 + i*.02) + i*2, W, H*.03); } // the low beams
    for (let r = 0; r < 6; r++) { x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 1; x.beginPath(); const yy = fy + Math.pow(r/6, 1.3)*(H - fy); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke(); } // the boards
    x.fillStyle = '#2e2014'; x.fillRect(W*.62, H*.52, W*.38, H*.26); x.fillStyle = '#4a3420'; x.fillRect(W*.62, H*.5, W*.38, H*.03); // the counter
    [[.7, '#5a4430'], [.78, '#3a4a3a'], [.86, '#6a5030']].forEach(([u, c]) => { ell(x, W*u, H*.48, 3.4, 4.4, c); }); // jugs on it
    x.fillStyle = '#3a2818'; x.fillRect(W*.12, H*.6, W*.36, H*.05); x.fillRect(W*.14, H*.65, W*.012, H*.12); x.fillRect(W*.46, H*.65, W*.012, H*.12); }), 0, 0, W, H); // the back table
  const lx = W*.3, ly = H*.24; ctx.fillStyle = '#100a06'; ctx.fillRect(lx + 1, H*.12, 1, ly - H*.12); ctx.fillStyle = `rgba(255,190,110,${(.9*fl).toFixed(2)})`; ctx.fillRect(lx - 2, ly, 6, 7);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx + 1, ly + 4, H*.5, '#ffa050', .24*fl); ctx.globalCompositeOperation = 'source-over';
  if (!(S && S.f && S.f.b9_c1_brawlDone && S.node === 'b9_c1_brawl_after')) [[.18, 1], [.28, -1], [.38, -1], [.46, -1]].forEach(([u, d], i) => drawFigure(ctx, 'b5_letherii', W*u, H*.66, 1.15, t, {dir:d, phase:i + 1, still:true}));
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.5 + i*Math.min(.05, .26/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .72, .5); };

/* ---------------- ground ---------------- */
/* the barracks yard: Book Five's Whitefinders' yard (b5_c1_barracks, 81b), with the heavies' stores door, the stable gate, wagons and crates */
function b91aCratesT(ctx, x, y, T, dark){ const px = x*T, py = y*T; ell(ctx, px + T*.5, py + T*.86, T*.42, T*.1, 'rgba(0,0,0,.5)');
  [[.08, .44, .44, .4], [.5, .44, .42, .4], [.26, .14, .44, .32]].forEach(([a, b, w, hh], i) => { ctx.fillStyle = dark ? ['#2e2216', '#261c12', '#34261a'][i] : ['#6a5034', '#5a4430', '#7a5e3c'][i]; ctx.fillRect(px + T*a, py + T*b, T*w, T*hh);
    ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; ctx.strokeRect(px + T*a + .5, py + T*b + .5, T*w - 1, T*hh - 1); }); }
TILEX.b9_c1_barracks = (ctx, ch, x, y, T, dark) => {
  const base = TILEX.b5_c1_barracks; if (!base) return;
  if (ch === 'S') { base(ctx, '=', x, y, T, dark); return b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T; ctx.fillStyle = dark ? '#1a120c' : '#3a2a1a'; ctx.fillRect(px + T*.12, py + T*.56, T*.76, T*.44);
    ctx.fillStyle = dark ? '#3a3632' : '#6a645a'; [.62, .8, .94].forEach(k => ctx.fillRect(px + T*.12, py + T*k, T*.76, Math.max(1, T*.04)));
    ctx.strokeStyle = dark ? '#5a5650' : '#8a8478'; ctx.lineWidth = Math.max(1, T*.04); ctx.beginPath(); ctx.moveTo(px + T*.2, py + T*.7); ctx.quadraticCurveTo(px + T*.5, py + T*.82, px + T*.8, py + T*.7); ctx.stroke(); }); } // the stores door, iron-bound and chained
  if (ch === 'h') { base(ctx, '#', x, y, T, dark); return b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T; ctx.fillStyle = dark ? '#1e160e' : '#4a3622'; ctx.fillRect(px + T*.1, py + T*.06, T*.8, T*.88);
    ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(px + T*.49, py + T*.06, Math.max(1, T*.03), T*.88); ctx.fillStyle = dark ? '#2e2216' : '#5a4430'; [.3, .7].forEach(k => ctx.fillRect(px + T*.1, py + T*k, T*.8, T*.06)); }); } // the stable gate
  if (ch === 'w' || ch === 'k') { base(ctx, '.', x, y, T, dark); return b2Clip(ctx, x, y, T, () => { if (ch === 'k') return b91aCratesT(ctx, x, y, T, dark);
    const px = x*T, py = y*T; ell(ctx, px + T*.5, py + T*.9, T*.46, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#3a362c' : '#c8b896'; ctx.beginPath(); ctx.moveTo(px + T*.06, py + T*.5); ctx.quadraticCurveTo(px + T*.5, py + T*.02, px + T*.94, py + T*.5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = dark ? '#20180e' : '#5a4430'; ctx.fillRect(px + T*.04, py + T*.5, T*.92, T*.2); [.24, .76].forEach(k => { ctx.strokeStyle = dark ? '#100c08' : '#3a2a1a'; ctx.lineWidth = Math.max(1, T*.05); ctx.beginPath(); ctx.arc(px + T*k, py + T*.76, T*.13, 0, 7); ctx.stroke(); }); }); } // a wagon, its tilt up
  return base(ctx, ch, x, y, T, dark); };

/* the quarter's lanes: setts, the gutter, plaster house fronts with shutters (closed at night, some open by day), the household's door, a
   stable-yard gate, the tavern's lit door, a looted door hanging open, an alley mouth, a handcart */
function b91aWallT(ctx, x, y, T, dark){ const px = x*T, py = y*T, top = b2Tile(x, y - 1) !== '#' && b2Tile(x, y - 1) != null, low = b2Tile(x, y + 1) !== '#';
  ctx.fillStyle = dark ? '#1e1e24' : '#8a7c66'; ctx.fillRect(px, py, T, T);
  if (top || y === 0) { ctx.fillStyle = dark ? '#1a100c' : '#6a3e2a'; ctx.fillRect(px, py, T, T*.18); }
  if (low) { const wx = px + T*.3, wy = py + T*.36, op = !dark && hash(x, y, 9190) > .55; ctx.fillStyle = op ? '#1e1a16' : (dark ? '#14100c' : '#5a4632'); ctx.fillRect(wx, wy, T*.4, T*.36);
    if (!op) { ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(px + T*.49, wy, Math.max(1, T*.025), T*.36); } else { ctx.fillStyle = '#6a5236'; ctx.fillRect(wx - T*.16, wy, T*.14, T*.36); ctx.fillRect(wx + T*.42, wy, T*.14, T*.36); }
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px, py + T*.9, T, T*.1); } }
function b91aDoorT(ctx, ch, x, y, T, dark){ const px = x*T, py = y*T; b91aWallT(ctx, x, y, T, dark); ctx.fillStyle = dark ? '#1a120c' : '#7a7060'; ctx.fillRect(px + T*.14, py + T*.3, T*.72, T*.7); // clear the window
  if (ch === 'Y') { ctx.fillStyle = dark ? '#1e160e' : '#4a3622'; ctx.fillRect(px + T*.06, py + T*.24, T*.88, T*.76); ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(px + T*.49, py + T*.24, Math.max(1, T*.03), T*.76); return; } // the yard gate
  if (ch === 'L') { ctx.fillStyle = '#060504'; ctx.fillRect(px + T*.26, py + T*.32, T*.48, T*.68); ctx.save(); ctx.translate(px + T*.74, py + T*.32); ctx.rotate(.5); ctx.fillStyle = dark ? '#2a2016' : '#5a4430'; ctx.fillRect(0, 0, T*.12, T*.6); ctx.restore(); return; } // broken in
  if (ch === 'g') { ctx.fillStyle = '#050405'; ctx.fillRect(px + T*.18, py + T*.2, T*.64, T*.8); return; } // the alley mouth
  ctx.fillStyle = dark ? '#20160e' : '#4a3420'; ctx.fillRect(px + T*.26, py + T*.32, T*.48, T*.68); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px + T*.26, py + T*.32, T*.48, T*.04);
  if (ch === 'T' || (ch === 'D' && dark && S && S.f && S.f.b9_c1_key === 'street' && !S.f.b9_c1_dawn)) { const lx = px + (ch === 'T' ? T*.5 : T*.82), ly = py + T*.36; ctx.fillStyle = 'rgba(255,190,110,.95)'; ctx.fillRect(lx - T*.05, ly, T*.1, T*.12); glow(ctx, lx, ly + T*.06, T*.7, '#ffb060', .3); } // the tavern's lamp; the woman's, on the night
  if (ch === 'T') { ctx.fillStyle = '#3a2818'; ctx.fillRect(px + T*.08, py + T*.12, T*.84, T*.14); } } // the tavern's blank board
TILEX.b9_c1_quarter = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '#') return b91aWallT(ctx, x, y, T, dark);
  if ('DYLgT'.includes(ch)) return b91aDoorT(ctx, ch, x, y, T, dark);
  b51Setts(ctx, x, y, T, dark);
  if (!dark) { ctx.fillStyle = 'rgba(200,180,140,.12)'; ctx.fillRect(px, py, T, T); } // the day's dust
  if (ch === ',') { ctx.fillStyle = dark ? 'rgba(10,12,16,.6)' : 'rgba(40,34,26,.45)'; ctx.fillRect(px, py + T*.4, T, T*.2); }
  if (ch === 'c') { ell(ctx, px + T*.5, py + T*.86, T*.42, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#2a2016' : '#5a4430'; ctx.fillRect(px + T*.1, py + T*.4, T*.8, T*.26); ctx.strokeStyle = dark ? '#120e0a' : '#3a2a1a'; ctx.lineWidth = Math.max(1, T*.05); ctx.beginPath(); ctx.arc(px + T*.3, py + T*.74, T*.14, 0, 7); ctx.stroke(); B2F.line(ctx, ctx.strokeStyle, Math.max(1, T*.05), [[px + T*.9, py + T*.5], [px + T, py + T*.7]]); } // a handcart
  if (dark && b2Tile(x, y - 1) === 'D' && S && S.f && S.f.b9_c1_key === 'street' && !S.f.b9_c1_dawn) glow(ctx, px + T*.8, py, T*1.4, '#ffb060', .12); });

/* the soldiers' taproom: boards, plaster walls with a lamp bracket, tables and benches for cover */
TILEX.b9_c1_taproom = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '#') { ctx.fillStyle = '#3a2a1c'; ctx.fillRect(px, py, T, T); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(px, py + T*.8, T, T*.2); if (hash(x, y, 9195) > .6) { ctx.fillStyle = 'rgba(255,190,110,.9)'; ctx.fillRect(px + T*.44, py + T*.3, T*.12, T*.16); glow(ctx, px + T*.5, py + T*.38, T*.9, '#ffa050', .25); } return; }
  ctx.fillStyle = '#3e2c1c'; ctx.fillRect(px, py, T, T); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px, py + T*i/4); ctx.lineTo(px + T, py + T*i/4); ctx.stroke(); }
  if (hash(x, y, 9196) > .8) ell(ctx, px + T*.5, py + T*.5, T*.2, T*.08, 'rgba(120,90,40,.3)'); }); // spilt beer
/* low cover ('t') on this chapter's grounds: a handcart and crates in the lanes, a table and its bench in the taproom */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b9_c1_quarter') { const px = x*T, py = y*T; ell(ctx, px + T*.5, py + T*.86, T*.42, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#2a2016' : '#5a4430'; ctx.fillRect(px + T*.08, py + T*.38, T*.84, T*.3); ctx.fillStyle = dark ? '#34261a' : '#7a5e3c'; ctx.fillRect(px + T*.2, py + T*.16, T*.36, T*.24);
      ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; ctx.strokeRect(px + T*.2 + .5, py + T*.16 + .5, T*.36 - 1, T*.24 - 1); ctx.beginPath(); ctx.arc(px + T*.76, py + T*.74, T*.12, 0, 7); ctx.stroke(); return; }
    if (ch === 't' && style === 'b9_c1_taproom') { const px = x*T, py = y*T; ell(ctx, px + T*.5, py + T*.86, T*.42, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = '#5a4028'; ctx.fillRect(px + T*.08, py + T*.32, T*.84, T*.16); ctx.fillStyle = '#2a1c10'; ctx.fillRect(px + T*.14, py + T*.48, T*.07, T*.3); ctx.fillRect(px + T*.79, py + T*.48, T*.07, T*.3);
      ctx.fillStyle = '#4a3422'; ctx.fillRect(px + T*.12, py + T*.66, T*.76, T*.08); ell(ctx, px + T*.36, py + T*.3, T*.06, T*.07, '#6a5236'); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Nine's ground: dusk dust-brown, a low warm rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".42" cy=".44" r=".8"><stop offset="0" stop-color="#4a3c2c"/><stop offset=".6" stop-color="#2a2016"/><stop offset="1" stop-color="#140f0a"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a heavy's scale: a long shirt of Malazan heavy scale laid out on a crate lid, the shoulders doubled, the rows of plates, a warm light on
     the left edge of every row */
  ART['item/b9_c1_heavyscale'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A heavy's scale">${bg('b91hs')}
<linearGradient id="b91hs-p" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a49c88"/><stop offset=".5" stop-color="#6e685a"/><stop offset="1" stop-color="#2e2a24"/></linearGradient>
<pattern id="b91hs-r" width="9" height="7" patternUnits="userSpaceOnUse"><path d="M0 0 Q4.5 7 9 0" fill="url(#b91hs-p)" stroke="#1a1814" stroke-width=".8"/></pattern></defs>
<rect width="200" height="150" fill="url(#b91hs-bg)"/><rect x="24" y="118" width="152" height="14" fill="#3a2a1a" stroke="#140f0a"/><ellipse cx="100" cy="118" rx="74" ry="7" fill="url(#b91hs-sh)"/>
<path d="M62 24 L138 24 L150 40 L144 116 L56 116 L50 40 Z" fill="url(#b91hs-r)" stroke="#140f0a" stroke-width="1.6"/>
<path d="M44 22 L84 22 L80 46 L40 44 Z M156 22 L116 22 L120 46 L160 44 Z" fill="url(#b91hs-r)" stroke="#140f0a" stroke-width="1.4"/>
<path d="M84 22 Q100 34 116 22" fill="none" stroke="#2a2016" stroke-width="3"/><path d="M58 70 L142 70" stroke="#3a2a1a" stroke-width="5"/>
<path d="M51 42 L57 114" stroke="#f0c888" stroke-width="1.2" opacity=".45"/><path d="M42 26 L41 42" stroke="#f0c888" stroke-width="1" opacity=".4"/>
<ellipse cx="96" cy="70" rx="60" ry="44" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c1_heavyscale'] = [200, 150];
  /* a mess-tin of the 9th: a dented oval tin with its lid beaten back into shape, the folding handle out, the 9th's stamp on the base,
     tipped toward the light */
  ART['item/b9_c1_messtin'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A mess-tin of the 9th">${bg('b91mt')}
<linearGradient id="b91mt-t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8b0a0"/><stop offset=".55" stop-color="#6a645a"/><stop offset="1" stop-color="#2a2620"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b91mt-bg)"/><ellipse cx="100" cy="116" rx="64" ry="8" fill="url(#b91mt-sh)"/>
<ellipse cx="92" cy="84" rx="52" ry="30" fill="url(#b91mt-t)" stroke="#140f0a" stroke-width="1.6"/><ellipse cx="92" cy="78" rx="46" ry="24" fill="#3a3630" stroke="#1a1612"/>
<path d="M62 74 Q70 70 76 76 M104 66 Q112 64 116 70" stroke="#1a1612" stroke-width="1.4" fill="none" opacity=".7"/>
<ellipse cx="146" cy="52" rx="28" ry="16" transform="rotate(-24 146 52)" fill="url(#b91mt-t)" stroke="#140f0a" stroke-width="1.4"/><path d="M132 48 Q140 42 150 50" stroke="#2a2620" stroke-width="1.2" fill="none"/>
<path d="M40 86 L14 98 L12 92 L38 80" fill="#5a544a" stroke="#140f0a"/>
<g transform="rotate(-24 146 52)"><text x="146" y="57" text-anchor="middle" font-family="serif" font-size="13" font-weight="bold" fill="#2a2620" opacity=".8">IX</text></g>
<path d="M44 80 Q50 64 72 56" stroke="#f0c888" stroke-width="1.4" fill="none" opacity=".5"/><ellipse cx="96" cy="76" rx="56" ry="36" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c1_messtin'] = [200, 150];
  /* a gutter-knife: a short broad Letherii knife, canal iron honed thin, a cord-wrapped grip, lying on setts */
  ART['item/b9_c1_gutterknife'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A gutter-knife">${bg('b91gk')}
<linearGradient id="b91gk-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b0a898"/><stop offset=".5" stop-color="#5a564e"/><stop offset="1" stop-color="#22201c"/></linearGradient>
<pattern id="b91gk-c" width="5" height="4" patternUnits="userSpaceOnUse"><path d="M0 0 L5 4 M5 0 L0 4" stroke="#6a5236" stroke-width="1.2"/></pattern></defs>
<rect width="200" height="150" fill="url(#b91gk-bg)"/><path d="M0 116 L200 108 L200 150 L0 150 Z" fill="#241c14"/><path d="M0 116 L200 108" stroke="#8a7050" stroke-width=".8" opacity=".35"/>
<ellipse cx="100" cy="112" rx="72" ry="8" fill="url(#b91gk-sh)"/>
<path d="M78 86 L156 58 Q170 54 172 60 Q160 74 82 98 Z" fill="url(#b91gk-b)" stroke="#0e0b08" stroke-width="1.4"/>
<path d="M84 90 L160 62 Q168 59 170 61" stroke="#f0d0a0" stroke-width="1" fill="none" opacity=".55"/>
<rect x="72" y="80" width="8" height="24" rx="2" transform="rotate(-20 76 92)" fill="#3a3028" stroke="#0e0b08"/>
<rect x="30" y="92" width="44" height="13" rx="3" transform="rotate(-20 52 98)" fill="#4a3826" stroke="#0e0b08"/><rect x="30" y="92" width="44" height="13" rx="3" transform="rotate(-20 52 98)" fill="url(#b91gk-c)" opacity=".8"/>
<circle cx="28" cy="110" r="4" fill="#3a3028" stroke="#0e0b08"/><ellipse cx="110" cy="80" rx="60" ry="26" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c1_gutterknife'] = [200, 150];
}
