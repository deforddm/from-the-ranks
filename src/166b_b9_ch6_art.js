/* ============ Book Nine, Chapter 6 art: Dust on the Horizon — the escort's line on a plain in the Wastes at first light, the dust-storm
   that is not a storm coming on, the battle at a distance, the supply train at the line's back, the rise at dusk ============ */
/* Book Nine's look (160b) on the Wastes: dry grass and bare stone under a sky too big for it, a low warm light from the left. First light
   grey to gold; the day gone copper and brown under the dust; dusk red over the rise. The battle is always at a distance (the brief): dust,
   smoke, shields, and shapes in the dust taller than any soldier. Nothing close, nothing lurid. Shared pieces borrowed from the earlier
   chapters' art: Ch 3's land (b93aLand) and horses, Ch 2's wagons, barrels, oxen and tents (b92aWagon, b92aBarrels, b92aOx, b92aTent),
   Ch 4's crates and fire (b94aCrates, b94aFire).
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     b9_nahruk       the short-tail body, for both scales (the brief): taller than any soldier, upright on thick backward-kneed legs, a short
                     thick tail, dark plate from the crown to the heel in overlapping bands, a long plated head with a pale slit of an eye,
                     a great blade held low in both hands. The engine's short-tails keep kind 'khell' (Blood-Iron's bonus and the engine
                     test read it), so while Book Nine is open FIGX.khell draws this body (an art change only, guarded by S.book === 'dod').
   Five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b9_line         the escort's stretch by day, seen from behind the shields: in Ch 6 first light with the dust low and far (phase 1),
                     the wall of dust as high as the sky with tall shapes in it (the morning), the dust drifting back and the foreigners'
                     fight far off east under its own cloud (after the line); elsewhere the line and the dust on the horizon
     b9_battle       the battle at a distance from a low swell: a plain under dust and smoke, thin lines of shields, tall dark shapes in the
                     dust, pale lights that come and go in it
     b9_c6_dawn      the squad's fire behind the line at first light, the line forming, a shield laid flat on the grass (the reading's
                     place) with the tile-woman beside it in phase 1, the brown smear low on the northern sky
     b9_c6_wagons    the supply train at the line's back by day, wagons, oxen, barrels, dust blowing in from the east; on the 'train' road
                     before the fight two tall shapes in it
     b9_c6_dusk      the rise at dusk: the new line along its crest against a red sky, the Commander's banner small at the west end, the
                     train drawn in below, the squad's fire, and far off east a brown cloud lit from inside
   Ground (TILEX): b9_c6_field (Ch 4's b9_c4_wastes underneath; 'L' the shield line, 'B' its banner, 'E' its east end, 'S' a shield laid
   flat, ';' the plain in front of the line, hazed with dust, 'd' the dry wash's lip). Battle 't': spare shields and spears driven into
   the ground. The gear in the series' 200×150 item style, on Book Nine's ground: dusk dust-brown (#4a3c2c → #140f0a), a low warm rim
   light. */

/* ---------------- the short-tail ---------------- */
Object.assign(FIGX, {
  b9_nahruk(ctx, h, t, o){ ctx.save(); const bat = typeof view !== 'undefined' && view === 'battle', SC = bat ? .86 : 1, st = o.still ? 0 : t, br = Math.sin(st/1100 + (o.phase || 0)), sw = Math.sin(st/1500 + (o.phase || 0));
    ctx.translate(0, 13); ctx.scale(SC, SC); ctx.translate(0, -13);
    ell(ctx, 0, 13, 15, 3.6, 'rgba(0,0,0,.45)');
    const gr = (x0, y0, x1, y1, c1, c2) => { const g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, c1); g.addColorStop(1, c2); return g; };
    const P = '#2c2e33', PD = '#121317', PL = '#5c606a';
    poly(ctx, [[-5,-10],[-13,-7 + sw*.4],[-18,-2 + sw*.8],[-17,.4 + sw*.8],[-11,-3.2],[-5,-4]], gr(-18, -8, -5, -2, PD, P)); // the short thick tail
    ctx.strokeStyle = 'rgba(150,156,170,.25)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 3; i++) { ctx.moveTo(-7 - i*3.2, -9.4 + i*.9); ctx.lineTo(-7.6 - i*3.2, -3.6 + i*.6); } ctx.stroke(); // its bands
    poly(ctx, [[-3.4,-9],[2.4,-9],[3,-2],[.8,5],[1.6,10.6],[6,12.6],[-1.2,13],[-2,8.4],[-3.2,0]], gr(-3, -9, 3, 13, '#1e2024', '#0c0d10')); // the far leg, backward-kneed
    poly(ctx, [[-7.6,-6],[5.4,-6],[8.4,-13],[9.6,-22.6],[4,-27.6],[-5.4,-26],[-9.4,-16]], gr(-9, -27, 9, -6, PL, PD)); // the body, plated, leaning a little forward
    ctx.strokeStyle = 'rgba(8,8,10,.7)'; ctx.lineWidth = .7; ctx.beginPath(); for (let i = 0; i < 5; i++) { const y = -10 - i*3.4; ctx.moveTo(-8.6 + i*.3, y); ctx.quadraticCurveTo(0, y + 1.4, 8.6 - i*.1, y - .6); } ctx.stroke(); // the overlapping bands of plate
    ctx.strokeStyle = 'rgba(170,176,190,.22)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 5; i++) { const y = -10.8 - i*3.4; ctx.moveTo(-8 + i*.3, y); ctx.quadraticCurveTo(0, y + 1.2, 8 - i*.1, y - .6); } ctx.stroke(); // their edges catching the light
    poly(ctx, [[-4,-8],[2.8,-8],[3.8,-1.4],[1.6,5.6],[2.6,10.8],[7.4,12.6],[-.6,13.2],[-1.8,8.6],[-3.6,.4]], gr(-4, -8, 4, 13, '#3e4148', '#141519')); // the near leg
    poly(ctx, [[-.6,13.2],[7.4,12.6],[8.8,13.2],[-1,13.6]], '#0a0a0c'); poly(ctx, [[8.8,13.2],[10.4,13.4],[8.6,12.2]], '#8a8478'); // a foot, a claw
    ell(ctx, .6, -22.4, 5.6, 3.8, gr(-5, -26, 6, -19, '#6a6e78', '#1a1b20')); // the shoulder plate
    poly(ctx, [[3.4,-26],[8.4,-31.4 + br*.3],[15.4,-30.6 + br*.3],[18.6,-27.4 + br*.3],[15.6,-24.2],[7.4,-23]], gr(4, -31, 18, -23, '#4a4e58', '#101114')); // the long plated head
    ctx.strokeStyle = 'rgba(6,6,8,.8)'; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(7.6, -27.8 + br*.3); ctx.lineTo(17.4, -27.2 + br*.3); ctx.stroke(); // the jaw-seam of the plate
    ctx.fillStyle = `rgba(214,226,220,${(.55 + (o.still ? .15 : Math.sin(t/500)*.2)).toFixed(2)})`; ctx.fillRect(11.4, -29.6 + br*.3, 2.6, .7); // a pale slit of an eye
    const blade = gr(0, -1, 0, 2, '#9a9ea6', '#3a3c42');
    poly(ctx, [[8.4,-12.4],[10.6,-13.6],[19.6,6.4],[15.4,7.6]], blade); B2F.line(ctx, 'rgba(240,244,250,.35)', .4, [[10.2,-13], [18.8,6.2]]); // the great blade, held low
    ctx.fillStyle = '#1a1b1f'; ctx.fillRect(7.4, -14.6, 3.6, 2.6); // the grip, in both hands
    poly(ctx, [[2.2,-21],[5.4,-20],[10,-13.6],[7.6,-12]], gr(2, -21, 10, -12, '#3a3d44', '#141519')); // the far arm, down to the grip
    poly(ctx, [[-2.2,-19.6],[1.4,-20.4],[8.6,-12.4],[6,-10.8]], gr(-2, -20, 9, -11, '#565a64', '#1a1b20')); // the near arm, down to the grip
    ctx.fillStyle = 'rgba(232,196,140,.16)'; ctx.fillRect(-9.2, -24, 1.2, 17); // the low warm light along the lit edge
    ctx.restore(); },
});
/* in Book Nine, the short-tails (kind 'khell', the engine's) wear this body */
{ const _k = FIGX.khell; FIGX.khell = function(ctx, h, t, o){ if (S && S.book === 'dod') return FIGX.b9_nahruk(ctx, h, t, o); return _k ? _k.call(this, ctx, h, t, o) : undefined; }; }

/* ---------------- shared pieces ---------------- */
/* the escort's line seen from behind: grounded or raised shields rim to rim, helmets over them, spears up. y0 the shields' foot. */
function b96aLine(x, x0, x1, y0, s, when, up){ const N = when === 'night', E = when === 'eve', sh = N ? '#14100c' : E ? '#3a2416' : '#6a3a24', rim = N ? '#2a2620' : E ? '#6a5030' : '#a88a50', hm = N ? '#0c0c0e' : E ? '#2a2420' : '#4a4640';
  const step = 9*s, hgt = (up ? 14 : 11)*s;
  for (let px = x0; px < x1; px += step) { const j = hash(Math.round(px), 9611), lift = up ? 0 : (j - .5)*2*s;
    B2F.line(x, N ? '#0a0806' : '#4a3420', Math.max(.6, .7*s), [[px + 4*s, y0 - hgt - 2*s], [px + 4.6*s + (j - .5)*2*s, y0 - hgt - 14*s]]); // the spear
    ell(x, px + 4.5*s, y0 - hgt - 2.2*s + lift, 3*s, 2.6*s, hm); // a helmet over the rim
    x.fillStyle = sh; x.fillRect(px, y0 - hgt + lift, step - .6*s, hgt); x.strokeStyle = rim; x.lineWidth = Math.max(.6, .8*s); x.strokeRect(px, y0 - hgt + lift, step - .6*s, hgt); // the shield from behind
    x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(px + step*.4, y0 - hgt + lift, 1.2*s, hgt); } // its grip-bar
  x.fillStyle = 'rgba(0,0,0,.28)'; x.fillRect(x0, y0 - .8*s, x1 - x0, 1.6*s); }
/* tall dark shapes in the dust, at a distance: never close. k is their alpha. */
function b96aShapes(ctx, pts, s, k){ pts.forEach(([px, py, d]) => { ctx.save(); ctx.globalAlpha = k; ctx.translate(px, py); ctx.scale(d*s, s); ctx.fillStyle = '#1c1a18';
  ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(-3.4, -12); ctx.lineTo(-6, -20); ctx.lineTo(-2, -30); ctx.lineTo(4, -32); ctx.lineTo(9, -29); ctx.lineTo(4, -26); ctx.lineTo(5, -14); ctx.lineTo(4, 0); ctx.closePath(); ctx.fill(); // a body, upright, a long head
  ctx.beginPath(); ctx.moveTo(-5, -12); ctx.lineTo(-12, -6); ctx.lineTo(-10, -4); ctx.lineTo(-4, -8); ctx.fill(); // the short tail
  ctx.strokeStyle = '#1c1a18'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(3, -16); ctx.lineTo(10, -2); ctx.stroke(); ctx.restore(); }); } // the blade, low
/* the wall of dust: h is how high it stands above the horizon (a fraction of H), dark how much it has eaten the light */
function b96aDust(ctx, W, H, hz, h, dark, t, mo, x0 = 0, x1 = 1){ const top = hz - H*h;
  for (let i = 0; i < 14; i++) { const k = i/13, bx = W*(x0 + (x1 - x0)*hash(i, 9621)), by = top + (hz - top)*(.2 + hash(i, 9622)*.8), dx = mo ? Math.sin(t/5000 + i)*W*.01 : 0;
    ctx.fillStyle = `rgba(${Math.round(120 - dark*60)},${Math.round(92 - dark*48)},${Math.round(62 - dark*34)},${(.22 + dark*.12 + hash(i, 9623)*.1).toFixed(3)})`;
    ctx.beginPath(); ctx.ellipse(bx + dx, by, W*(.12 + hash(i, 9624)*.14)*(x1 - x0 + .2), (hz - top)*(.3 + hash(i, 9625)*.3) + H*.01, 0, 0, 7); ctx.fill(); }
  ctx.fillStyle = vgrad(ctx, top, hz + H*.02, [[0, 'rgba(110,84,56,0)'], [.5, `rgba(110,84,56,${(.3 + dark*.2).toFixed(2)})`], [1, `rgba(90,70,48,${(.45 + dark*.2).toFixed(2)})`]]); ctx.fillRect(W*x0, top, W*(x1 - x0), hz - top + H*.02); }
/* a sky for first light, grey to gold, the sun low on the left */
function b96aDawn(x, W, H, hz){ x.fillStyle = vgrad(x, 0, hz, [[0,'#4a4c58'],[.5,'#8a8278'],[.85,'#c8a878'],[1,'#e0bc84']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.08, hz, W*.5, '#f0c888', .3);
  for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(70,64,70,.22)'; x.beginPath(); x.ellipse(W*(.1 + i*.24), hz*(.3 + hash(i, 9631)*.3), W*.16, hz*.025, 0, 0, 7); x.fill(); }
  x.fillStyle = vgrad(x, hz, H, [[0,'#8a7a5e'],[.5,'#6a5a42'],[1,'#3a2e20']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 110; i++) { const d = hash(i, 9632), yy = hz + Math.pow(d, .8)*(H - hz); x.fillStyle = `rgba(${170 + Math.round(d*40)},${150 + Math.round(d*30)},${110 + Math.round(d*20)},.18)`; x.fillRect(hash(i, 9633)*W, yy, 2 + d*9, 1); } }
/* a sky gone copper under the dust */
function b96aCopper(x, W, H, hz, k){ x.fillStyle = vgrad(x, 0, hz, [[0, k > .5 ? '#3a2e26' : '#6a5e52'],[.6, k > .5 ? '#6a4c32' : '#9a8468'],[1, k > .5 ? '#8a6440' : '#b89a72']]); x.fillRect(0, 0, W, hz + 2);
  glow(x, W*.18, hz*.5, W*.3, '#e8a860', .18 + k*.1); ell(x, W*.18, hz*.5, 7, 7, `rgba(240,190,120,${(.55 - k*.3).toFixed(2)})`); // a copper sun through it
  x.fillStyle = vgrad(x, hz, H, [[0,'#7a6a4e'],[.5,'#5e4e38'],[1,'#30261a']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 110; i++) { const d = hash(i, 9641), yy = hz + Math.pow(d, .8)*(H - hz); x.fillStyle = `rgba(${150 + Math.round(d*40)},${130 + Math.round(d*30)},${96 + Math.round(d*20)},.16)`; x.fillRect(hash(i, 9642)*W, yy, 2 + d*9, 1); } }
/* a low line of the brigades far off, and the foreigners' own cloud further east */
function b96aFar(x, W, H, hz, s, when){ x.fillStyle = when === 'eve' ? 'rgba(20,14,10,.6)' : 'rgba(40,34,28,.45)'; for (let i = 0; i < 60; i++) x.fillRect(W*(.52 + i*.008), hz - 2*s - hash(i, 9651)*1.2*s, 1.2*s, 2*s + hash(i, 9651)*1.2*s); }

/* ---------------- the backdrops ---------------- */
SCENEX.b9_line = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, c6 = !!(S && S.book === 'dod' && S.chapter === 6), ph = c6 ? (f.b9_c6_ph || 1) : 2,
    dawn = c6 && ph === 1, coming = c6 && ph >= 2 && !f.b9_c6_lineDone, after = c6 && !!f.b9_c6_lineDone, v = dawn ? 'dawn' : coming ? 'coming' : after ? 'after' : 'gen', hz = H*.46;
  ctx.drawImage(sceneLayer('b96:line:' + v, W, H, (x, W, H) => {
    if (dawn) b96aDawn(x, W, H, hz); else b96aCopper(x, W, H, hz, coming ? .8 : after ? .4 : .3);
    b96aFar(x, W, H, hz, H/300, 'day');
    for (let i = 0; i < 6; i++) ell(x, W*hash(i, 9661), hz + H*(.04 + hash(i, 9662)*.12), W*(.03 + hash(i, 9663)*.05), H*.008, 'rgba(80,70,58,.5)'); // stone in the grass in front
    if (after) for (let i = 0; i < 9; i++) ell(x, W*(.1 + hash(i, 9664)*.8), H*(.56 + hash(i, 9665)*.05), W*.012, H*.006, 'rgba(20,18,16,.6)'); // dark shapes that do not move, far out in the grass
    b96aLine(x, -W*.02, W*1.02, H*.7, H/150, 'day', !dawn); }), 0, 0, W, H);
  // the dust on the horizon: low and far at first light; a wall to the sky in the morning; drifting back after, the foreigners' cloud east
  if (dawn) b96aDust(ctx, W, H, hz, .035, 0, t, mo, .3, 1);
  else if (coming) { b96aDust(ctx, W, H, hz, .4, .7, t, mo, -.1, 1.1); const k = mo ? (t/14000) % 1 : .5;
    b96aShapes(ctx, [[W*(.16 + k*.04), H*.6, 1], [W*.38, H*.58, -1], [W*(.57 - k*.03), H*.61, 1], [W*.76, H*.585, 1], [W*(.92 + k*.02), H*.6, -1]], H/120, .62); }
  else if (after) { b96aDust(ctx, W, H, hz, .08, .3, t, mo, .1, .7); b96aDust(ctx, W, H, hz, .2, .5, t, mo, .66, 1.05);
    for (let i = 0; i < 3; i++) { const k = ((t/9000*mo + i/3) % 1); ctx.fillStyle = `rgba(60,52,46,${(.3*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.8 + i*.05), hz - H*(.05 + k*.15), W*.02 + k*W*.03, H*.04 + k*H*.03, 0, 0, 7); ctx.fill(); } } // smoke over the foreigners' fight
  else b96aDust(ctx, W, H, hz, .08, .3, t, mo, .3, 1);
  for (let i = 0; i < 14; i++) { const k = ((t/9000*mo + hash(i, 9666)) % 1); ctx.fillStyle = `rgba(240,216,168,${(.35*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9667)*.8) + k*W*.08, H*(.55 + hash(i, 9668)*.35) - k*H*.06, 1.3, 1.3); } // dust on the air
  if (coming) { ctx.fillStyle = 'rgba(60,40,20,.14)'; ctx.fillRect(0, 0, W, H); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, coming ? .7 : .5, .5); };

/* the battle at a distance: from a low swell, a plain under dust and smoke, thin lines of shields, tall shapes in the dust, pale lights */
SCENEX.b9_battle = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42;
  ctx.drawImage(sceneLayer('b96:battle', W, H, (x, W, H) => { b96aCopper(x, W, H, hz, .55);
    for (let r = 0; r < 3; r++) { const y = hz + H*(.05 + r*.06), s = H/(420 - r*90); for (let px = W*(.04 + r*.03); px < W*(.96 - r*.02); px += 3.4*s) { if (hash(Math.round(px), r + 9671) > .86) continue; x.fillStyle = r === 2 ? '#3a2a1c' : '#2a2018'; x.fillRect(px, y - 4*s, 2.6*s, 4*s); ell(x, px + 1.3*s, y - 4.8*s, 1.2*s, 1*s, '#1a1612'); } } // lines of shields, far off
    ell(x, W*.5, H*.95, W*.7, H*.12, 'rgba(40,30,20,.5)'); x.fillStyle = vgrad(x, H*.78, H, [[0,'rgba(70,56,40,0)'],[1,'rgba(44,34,24,.9)']]); x.fillRect(0, H*.78, W, H*.22); }), 0, 0, W, H); // the swell in the foreground
  b96aDust(ctx, W, H, hz + H*.04, .3, .6, t, mo, .2, 1.05);
  const k = mo ? (t/16000) % 1 : .5; b96aShapes(ctx, [[W*(.34 + k*.02), hz + H*.1, 1], [W*.5, hz + H*.09, -1], [W*(.63 - k*.02), hz + H*.11, 1], [W*.78, hz + H*.08, 1]], H/190, .55);
  for (let i = 0; i < 4; i++) { const k2 = ((t/8000*mo + i/4) % 1); ctx.fillStyle = `rgba(50,44,40,${(.34*(1 - k2)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.3 + i*.17), hz - H*(.02 + k2*.2), W*.02 + k2*W*.04, H*.04 + k2*H*.04, 0, 0, 7); ctx.fill(); } // smoke going up
  for (let i = 0; i < 5; i++) { const on = mo ? (Math.sin(t/300 + i*2.7) > .85) : i === 2; if (!on) continue; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*(.36 + hash(i, 9672)*.5), hz + H*(.03 + hash(i, 9673)*.06), H*.06, '#c8dce8', .4); ctx.globalCompositeOperation = 'source-over'; } // pale lights in the dust
  for (let i = 0; i < 12; i++) { const k3 = ((t/9000*mo + hash(i, 9674)) % 1); ctx.fillStyle = `rgba(240,216,168,${(.3*(1 - k3)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9675)*.8) + k3*W*.06, H*(.6 + hash(i, 9676)*.3) - k3*H*.05, 1.3, 1.3); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .66, .5); };

/* first light behind the line: the fire, the line forming, a shield laid flat (the reading), the tile-woman beside it in phase 1 */
SCENEX.b9_c6_dawn = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), f = (S && S.f) || {}, c6 = !!(S && S.book === 'dod' && S.chapter === 6), hz = H*.46;
  ctx.drawImage(sceneLayer('b96:dawn', W, H, (x, W, H) => { b96aDawn(x, W, H, hz); b96aFar(x, W, H, hz, H/300, 'day');
    b96aLine(x, W*.02, W*.98, H*.6, H/210, 'day', false);
    for (let i = 0; i < 3; i++) b92aWagon(x, W*(.78 + i*.08), H*.68, H/200, 'day', false); // the train drawing in
    ell(x, W*.62, H*.8, W*.07, H*.022, '#6a3a24'); ell(x, W*.62, H*.795, W*.055, H*.015, '#7a4a2c'); ell(x, W*.62, H*.797, W*.012, H*.006, '#b8985a'); x.strokeStyle = '#a88a50'; x.lineWidth = 1.2; x.beginPath(); x.ellipse(W*.62, H*.8, W*.07, H*.022, 0, 0, 7); x.stroke(); // a shield laid flat on the grass
    for (let i = 0; i < 9; i++) { const a = i/9*Math.PI*2; ell(x, W*.3 + Math.cos(a)*14, H*.86 + Math.sin(a)*4, 2.4, 1.6, '#6a6458'); } }), 0, 0, W, H); // the ring of stones
  b96aDust(ctx, W, H, hz, .035, 0, t, mo, .3, 1); // the brown smear, low on the northern sky
  b94aFire(ctx, W*.3, H*.86, fl, 1.1);
  for (let i = 0; i < 3; i++) { const k = ((t/6000*mo + i/3) % 1); ctx.fillStyle = `rgba(180,170,160,${(.14*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*.3 + Math.sin(k*5 + i)*4, H*.8 - k*H*.24, 4 + k*10, 3 + k*6, 0, 0, 7); ctx.fill(); }
  if (c6 && (f.b9_c6_ph || 1) === 1) drawFigure(ctx, 'b5_c1_tilewoman', W*.7, H*.8, 1.1, t, {dir:-1, still:true});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* the supply train at the line's back: wagons, oxen, barrels, dust blowing in from the east (right); two tall shapes in it on the 'train'
   road before the fight; Yelt at a tailboard, Orla at her cart */
SCENEX.b9_c6_wagons = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, c6 = !!(S && S.book === 'dod' && S.chapter === 6), ph = c6 ? (f.b9_c6_ph || 1) : 1,
    tr = c6 && f.b9_c6_key === 'train' && ph === 3 && !f.b9_c6_trainDone, hz = H*.44;
  ctx.drawImage(sceneLayer('b96:wagons:' + (ph === 1 ? 'a' : 'b'), W, H, (x, W, H) => { if (ph === 1) b96aDawn(x, W, H, hz); else b96aCopper(x, W, H, hz, .5);
    for (let i = 0; i < 7; i++) { const k = i/6, cx = W*(.08 + k*.82), cy = hz + H*(.18 + (i % 2)*.03), s = H/(190 - (i % 2)*20); if (i === 3) b92aBarrels(x, cx, cy, s*1.2, 'day'); else b92aWagon(x, cx, cy, s, 'day', false); }
    for (let i = 0; i < 4; i++) b92aOx(x, W*(.3 + i*.07), hz + H*.32, H/150, ['#5a3e26', '#6a4a2e', '#4a3420', '#5a3e26'][i], i % 2 ? -1 : 1);
    b94aCrates(x, W*.62, hz + H*.36, H/160, false); b92aBarrels(x, W*.18, hz + H*.36, H/150, 'day'); }), 0, 0, W, H);
  if (ph === 1) b96aDust(ctx, W, H, hz, .035, 0, t, mo, .3, 1);
  else { b96aDust(ctx, W, H, hz + H*.2, .26, .5, t, mo, .7, 1.1); if (tr) b96aShapes(ctx, [[W*.82, hz + H*.3, -1], [W*.93, hz + H*.32, -1]], H/120, .6); }
  for (let i = 0; i < 14; i++) { const k = ((t/7000*mo + hash(i, 9681)) % 1); ctx.fillStyle = `rgba(230,206,160,${(.32*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(1 - k*.9), H*(.45 + hash(i, 9682)*.45), 1.4, 1.4); } // dust blowing in from the east
  if (c6) { drawFigure(ctx, 'b5_c1_clerk', W*.5, H*.8, 1.1, t, {dir:1, still:true}); if (ph === 1) drawFigure(ctx, 'b9_c2_orla', W*.68, H*.84, 1.15, t, {dir:-1, phase:3}); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, tr ? .66 : .5, .5); };

/* the rise at dusk: the new line on the crest against a red sky, the Commander's banner small at its west end, the train drawn in below,
   the squad's fire, and far off east the brown cloud lit from inside */
SCENEX.b9_c6_dusk = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b96:dusk', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'eve', false);
    for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(120,60,50,.25)'; x.beginPath(); x.ellipse(W*(.18 + i*.22), hz*(.3 + hash(i, 9691)*.3), W*.14, hz*.03, 0, 0, 7); x.fill(); } // long red cloud
    x.fillStyle = vgrad(x, H*.4, H, [[0,'#4a3a2a'],[1,'#1a140e']]); x.beginPath(); x.moveTo(0, H*.56); x.quadraticCurveTo(W*.45, H*.44, W, H*.5); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill(); // the rise
    const crest = u => H*(.56 - .12*u*(2 - u)) + H*.06*u*u; // along the crest
    for (let i = 0; i < 40; i++) { const u = i/39, px = W*u, py = crest(u) + H*.005; ell(x, px, py - H*.028, H*.006, H*.006, '#120c08'); x.fillStyle = '#1a120c'; x.fillRect(px - H*.009, py - H*.024, H*.018, H*.024); B2F.line(x, '#120c08', 1, [[px + H*.006, py - H*.026], [px + H*.008, py - H*.07]]); } // the line on the crest, against the sky
    B2F.line(x, '#0e0a06', 1.4, [[W*.05, crest(.05) - H*.02], [W*.05, crest(.05) - H*.14]]); poly(x, [[W*.05, crest(.05) - H*.14], [W*.11, crest(.05) - H*.12], [W*.05, crest(.05) - H*.1]], '#2a1e2a'); // the Commander's banner, small, far west
    for (let i = 0; i < 5; i++) b92aWagon(x, W*(.2 + i*.15), H*.74, H/180, 'eve', false); }), 0, 0, W, H);
  const gx = W*.9, gy = H*.44, br = mo ? .7 + .3*Math.sin(t/1700) : .8;
  for (let i = 0; i < 6; i++) { ctx.fillStyle = `rgba(90,64,44,${(.4 - i*.04).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(gx - i*W*.03, gy - H*(.03 + i*.02), W*(.08 + i*.02), H*(.04 + i*.01), 0, 0, 7); ctx.fill(); } // the foreigners' cloud, far off east
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, gx - W*.04, gy, H*.18, '#ff7a30', .22*br); ctx.globalCompositeOperation = 'source-over'; // lit from inside by what burns under it
  for (let i = 0; i < 6; i++) { ctx.fillStyle = `rgba(255,170,90,${(.5 + .4*(mo ? Math.sin(t/400 + i*1.9) : 0)).toFixed(2)})`; ctx.fillRect(gx - W*(.12 - hash(i, 9692)*.16), gy + H*.01 - hash(i, 9693)*H*.02, 1.4, 1.4); } // small as lamps
  b94aFire(ctx, W*.34, H*.88, fl, 1.15);
  for (let i = 0; i < 3; i++) { const k = ((t/6000*mo + i/3) % 1); ctx.fillStyle = `rgba(180,170,160,${(.12*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*.34 + Math.sin(k*5 + i)*4, H*.82 - k*H*.22, 4 + k*10, 3 + k*6, 0, 0, 7); ctx.fill(); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* ---------------- the ground ---------------- */
TILEX.b9_c6_field = (ctx, ch, x, y, T, dark) => { const base = TILEX.b9_c4_wastes || TILEX.b9_c3_road; if (!base) return; const N = !!dark;
  if ('L B E S ; d'.split(' ').indexOf(ch) < 0) return base(ctx, ch, x, y, T, dark);
  base(ctx, '.', x, y, T, dark);
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === ';') { ctx.fillStyle = N ? 'rgba(20,16,12,.3)' : 'rgba(150,120,80,.22)'; ctx.fillRect(px, py, T, T); for (let i = 0; i < 3; i++) ell(ctx, px + T*hash(x, y, 9701 + i), py + T*hash(x, y, 9711 + i), T*.2, T*.06, N ? 'rgba(0,0,0,.2)' : 'rgba(180,150,104,.25)'); return; } // the plain in front, hazed
    if (ch === 'S') { ell(ctx, px + T*.5, py + T*.6, T*.38, T*.2, N ? '#2a1a10' : '#6a3a24'); ctx.strokeStyle = N ? '#3a3026' : '#a88a50'; ctx.lineWidth = Math.max(1, T*.04); ctx.beginPath(); ctx.ellipse(px + T*.5, py + T*.6, T*.38, T*.2, 0, 0, 7); ctx.stroke(); ell(ctx, px + T*.5, py + T*.58, T*.07, T*.04, N ? '#4a4030' : '#c8a868'); return; } // a shield laid flat
    if (ch === 'd') { ctx.fillStyle = N ? '#1a1612' : '#7a6a50'; ctx.beginPath(); ctx.moveTo(px, py + T*.4); ctx.quadraticCurveTo(px + T*.5, py + T*.3, px + T, py + T*.45); ctx.lineTo(px + T, py + T); ctx.lineTo(px, py + T); ctx.fill(); // the wash's lip falling away
      ctx.fillStyle = N ? '#24201a' : '#a08a62'; ctx.fillRect(px, py + T*.72, T, T*.28); for (let i = 0; i < 4; i++) ell(ctx, px + T*(.15 + i*.22), py + T*(.55 + hash(x, y, 9721 + i)*.3), T*.06, T*.04, N ? '#100c08' : '#5a4a36'); return; }
    /* the shield line, seen from above and behind: two shields rim to rim, a helmet behind each, spear shafts up */
    for (let i = 0; i < 2; i++) { const sx = px + T*(.04 + i*.5), j = hash(x, y, 9731 + i);
      ell(ctx, sx + T*.22, py + T*.86, T*.24, T*.06, 'rgba(0,0,0,.4)');
      B2F.line(ctx, N ? '#0e0a06' : '#4a3420', Math.max(1, T*.03), [[sx + T*.3, py + T*.3], [sx + T*(.34 + (j - .5)*.08), py - T*.06]]); // the spear
      ell(ctx, sx + T*.22, py + T*.3, T*.12, T*.1, N ? '#141416' : '#4a4640'); // a helmet
      ctx.fillStyle = N ? '#1e1410' : '#6a3a24'; ctx.fillRect(sx, py + T*.36, T*.44, T*.48); ctx.strokeStyle = N ? '#3a3026' : '#a88a50'; ctx.lineWidth = Math.max(1, T*.035); ctx.strokeRect(sx, py + T*.36, T*.44, T*.48); // the shield from behind
      ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(sx + T*.2, py + T*.36, T*.04, T*.48); }
    if (ch === 'B') { B2F.line(ctx, N ? '#0e0a06' : '#3a2a1a', Math.max(1.2, T*.05), [[px + T*.82, py + T*.9], [px + T*.82, py - T*.3]]); poly(ctx, [[px + T*.82, py - T*.3], [px + T*1.1, py - T*.18], [px + T*.82, py - T*.04]], N ? '#1e1620' : '#3a2a44'); ctx.strokeStyle = N ? '#4a4030' : '#c8a868'; ctx.lineWidth = Math.max(.6, T*.02); ctx.beginPath(); ctx.moveTo(px + T*.82, py - T*.3); ctx.lineTo(px + T*1.1, py - T*.18); ctx.stroke(); } // the Commander's banner
    if (ch === 'E') ell(ctx, px + T*.82, py + T*.74, T*.16, T*.1, N ? '#2a2826' : '#8a8478'); // a stone at the line's end
  }); };
/* low cover ('t') on this chapter's ground: spare shields and spears driven into the ground */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b9_c6_field') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.88, T*.42, T*.1, 'rgba(0,0,0,.5)');
      [[.18, -.2], [.62, .2]].forEach(([a, r]) => { B2F.line(ctx, N ? '#0e0a06' : '#4a3420', Math.max(1, T*.035), [[px + T*(a + .1), py + T*.88], [px + T*(a + .1 + r*.5), py + T*.1]]); }); // two spears, crossed
      [[.08, 0], [.46, 1]].forEach(([a, i]) => { ctx.save(); ctx.translate(px + T*(a + .22), py + T*.84); ctx.rotate(i ? .14 : -.14); ctx.fillStyle = N ? '#1e1410' : ['#6a3a24', '#5a3220'][i]; ctx.fillRect(-T*.2, -T*.5, T*.4, T*.5); ctx.strokeStyle = N ? '#3a3026' : '#a88a50'; ctx.lineWidth = Math.max(1, T*.03); ctx.strokeRect(-T*.2, -T*.5, T*.4, T*.5); ell(ctx, 0, -T*.25, T*.05, T*.05, N ? '#4a4030' : '#c8a868'); ctx.restore(); }); // two spare shields, leaning
      return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Nine's ground: dusk dust-brown, a low warm rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".42" cy=".44" r=".8"><stop offset="0" stop-color="#4a3c2c"/><stop offset=".6" stop-color="#2a2016"/><stop offset="1" stop-color="#140f0a"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* escort scale: a shirt of Letherii scale, bronze leaves on a leather back, laid over a ration crate, the warm light along its left edge */
  const leaves = [];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 9; c++) { const x = 58 + c*10 + (r % 2)*5, y = 34 + r*10; if (x > 146 - (r < 2 ? 8 : 0) || (r < 1 && (c < 1 || c > 7))) continue; leaves.push(`<path d="M${x - 5} ${y} Q${x} ${y + 9} ${x + 5} ${y} Q${x} ${y + 3} ${x - 5} ${y} Z" fill="url(#b96es-l)" stroke="#2a1a0c" stroke-width=".7"/>`); }
  ART['item/b9_c6_escortscale'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="Escort scale">${bg('b96es')}
<linearGradient id="b96es-l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8c888"/><stop offset=".5" stop-color="#a8783c"/><stop offset="1" stop-color="#4a2e14"/></linearGradient>
<linearGradient id="b96es-k" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4a2a"/><stop offset="1" stop-color="#2a1a0e"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b96es-bg)"/><rect x="28" y="112" width="144" height="22" fill="#5a4430" stroke="#140f0a"/><path d="M64 120 L96 120" stroke="#d8ccb0" stroke-width="2" opacity=".35"/><ellipse cx="100" cy="112" rx="76" ry="7" fill="url(#b96es-sh)"/>
<path d="M62 24 L138 24 L150 34 L152 112 L48 112 L50 34 Z" fill="url(#b96es-k)" stroke="#140f0a" stroke-width="1.6"/>
<path d="M50 34 L32 70 L44 76 L56 46 Z M150 34 L168 70 L156 76 L144 46 Z" fill="url(#b96es-k)" stroke="#140f0a" stroke-width="1.4"/>
${leaves.join('')}
<path d="M78 24 Q100 34 122 24" fill="none" stroke="#2a1a0c" stroke-width="2.4"/><path d="M78 24 Q100 32 122 24" fill="none" stroke="#c8a060" stroke-width=".8" opacity=".6"/>
<path d="M51 110 L52 36" stroke="#f0c888" stroke-width="1.4" opacity=".45"/><ellipse cx="96" cy="70" rx="60" ry="40" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c6_escortscale'] = [200, 150];
  /* a short-tail's plate: a curved piece of dark armour, broken off along one edge, cold grey-blue where the light catches it, on dust */
  ART['item/b9_c6_plate'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A short-tail's plate">${bg('b96pl')}
<linearGradient id="b96pl-p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a707c"/><stop offset=".45" stop-color="#2c2e34"/><stop offset="1" stop-color="#0e0f12"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b96pl-bg)"/><path d="M0 108 Q100 98 200 106 L200 150 L0 150 Z" fill="#3a2e20"/>
<g fill="#5a4a36">${[[26, 122], [58, 132], [152, 128], [178, 118], [112, 138]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="3"/>`).join('')}</g>
<ellipse cx="100" cy="108" rx="66" ry="9" fill="url(#b96pl-sh)"/>
<path d="M50 96 Q58 54 100 40 Q138 30 156 52 L148 60 L152 66 L142 72 L148 80 L136 86 L140 94 Q100 108 50 96 Z" fill="url(#b96pl-p)" stroke="#08080a" stroke-width="1.6"/>
<path d="M60 90 Q66 58 102 46 Q130 38 146 54" fill="none" stroke="#9aa2b0" stroke-width="1.2" opacity=".5"/>
<path d="M56 80 Q90 70 132 74 M54 66 Q86 56 124 60" fill="none" stroke="#08080a" stroke-width="1.4" opacity=".7"/>
<path d="M56 79 Q90 69 132 73" fill="none" stroke="#c8d0dc" stroke-width=".5" opacity=".35"/>
<path d="M51 94 L58 58" stroke="#f0c888" stroke-width="1.2" opacity=".35"/><ellipse cx="104" cy="70" rx="58" ry="30" fill="#c8d8e8" opacity=".04"/></svg>`;
  ART_SIZE['item/b9_c6_plate'] = [200, 150];
}
