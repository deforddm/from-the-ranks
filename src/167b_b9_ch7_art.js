/* ============ Book Nine, Chapter 7 art: The Rearguard — the heavies' stretch late in the day, the plain after dark lit by what burns, a
   grey morning on the retreat trail, the retreat camp days after, and the road out (the finale) ============ */
/* Book Nine's look (160b) on the Wastes, at the end of the day and after it: the sky gone red-brown under the dust, then dark with only the
   burning wagons for light, then grey and flat, then dusk. The battle stays at a distance (the brief): dust, smoke, shields, and shapes
   in the dust taller than any soldier; never close, never lurid. After the rearguard the fallen are cloaks in a row, and nothing more.
   Shared pieces borrowed from earlier chapters' art: Ch 3's land and column (b93aLand, b93aColumn), Ch 2's wagons and tents (b92aWagon,
   b92aTent), Ch 4's fire (b94aFire), Ch 6's line, shapes, dust and copper sky (b96aLine, b96aShapes, b96aDust, b96aCopper).
   Five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b9_c7_late    the heavies' stretch late in the day from behind the shields: a red-brown sky under the dust, the cut bank on the left,
                   the burned wagons smoking on the right, the dust wall close with tall shapes in it (before the rearguard); after it,
                   the dust drawn back and the light going
     b9_dark       (160's) the plain after dark: a line of wagons burning for the light, the heavies' shields along it, the dark past
                   the light with the faint shapes of plate in it, and far behind, south, the column's lamps going away. In Ch 7, once
                   the fallen are laid by the wagons, a row of cloaks beside them
     b9_retreat    (160's) a grey morning: the army's trail of boots and ruts going away north-east to the horizon, stragglers small on
                   it, a wheel, a broken pike, a cook-pot, and far behind, low, the last of the dust
     b9_c7_camp    the retreat camp days after, at dusk: tents in rows with gaps in them, dung-fires, the cook-wagon and its pot, the
                   surgeons' lines at the far end with lamps
     b9_c7_road    the finale's road page, by the key: east (the column going away into blank country under a huge sky), south (the
                   Letherii wagons turning south on a fork of the trail), home (a small squad walking west into the last of the sun)
   Ground (TILEX): b9_c7_field (Ch 6's b9_c6_field underneath; 'K' a burned wagon, embers alight after dark). Battle 't': a burned wagon's
   wreck, a wheel and charred boards. The gear in the series' 200×150 item style, on Book Nine's ground: dusk dust-brown (#4a3c2c →
   #140f0a), a low warm rim light. */

/* ---------------- shared pieces ---------------- */
/* a burned wagon side-on: charred bed and ribs, one wheel, smoke; lit embers when 'lit' */
function b97aWreck(x, cx, cy, s, lit, t, mo){ ell(x, cx, cy + 1*s, 22*s, 3*s, 'rgba(0,0,0,.45)');
  x.fillStyle = '#1a120c'; x.fillRect(cx - 18*s, cy - 9*s, 34*s, 5*s); // the charred bed
  for (let i = 0; i < 5; i++) B2F.line(x, '#120c08', 1.2*s, [[cx - 16*s + i*8*s, cy - 9*s], [cx - 15*s + i*8*s + (hash(i, 9701) - .5)*3*s, cy - 18*s + hash(i, 9702)*4*s]]); // its ribs, burned short
  x.strokeStyle = '#140e0a'; x.lineWidth = 1.6*s; x.beginPath(); x.arc(cx - 10*s, cy - 3*s, 5*s, 0, 7); x.stroke(); for (let i = 0; i < 6; i++) { const a = i/6*Math.PI*2; B2F.line(x, '#140e0a', .8*s, [[cx - 10*s, cy - 3*s], [cx - 10*s + Math.cos(a)*5*s, cy - 3*s + Math.sin(a)*5*s]]); } // a wheel
  B2F.line(x, '#140e0a', 1.4*s, [[cx + 12*s, cy - 2*s], [cx + 20*s, cy + 1*s]]); // the tongue, down
  if (lit) { const fl = mo ? .75 + .25*Math.sin(t/180 + cx) : .85; x.globalCompositeOperation = 'lighter'; glow(x, cx, cy - 8*s, 26*s, '#ff7a30', .32*fl); x.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 7; i++) { const k = mo ? ((t/1400 + hash(i, 9703)) % 1) : hash(i, 9704); x.fillStyle = `rgba(255,${150 + Math.round(hash(i, 9705)*80)},70,${(.9 - k*.7).toFixed(2)})`; x.beginPath(); x.ellipse(cx - 14*s + hash(i, 9706)*28*s, cy - 10*s - k*10*s, (2.6 - k*1.6)*s, (4 - k*2.4)*s, 0, 0, 7); x.fill(); } } // flames
  else for (let i = 0; i < 3; i++) { const k = mo ? ((t/7000 + i/3) % 1) : i/3; x.fillStyle = `rgba(60,52,46,${(.32*(1 - k)).toFixed(3)})`; x.beginPath(); x.ellipse(cx - 6*s + i*6*s + k*6*s, cy - 14*s - k*30*s, (3 + k*8)*s, (2.4 + k*5)*s, 0, 0, 7); x.fill(); } } // smoke
/* a row of cloaks laid on the ground, boots at one end; never more than that */
function b97aRow(x, cx, cy, s, n){ for (let i = 0; i < n; i++) { const px = cx + i*9*s; ell(x, px, cy, 4*s, 1.6*s, 'rgba(0,0,0,.4)'); poly(x, [[px - 3.6*s, cy - 1*s], [px + 3.6*s, cy - 1*s], [px + 3*s, cy - 3*s], [px - 3*s, cy - 3*s]], '#3a3530'); ell(x, px, cy - 3.6*s, 1*s, .6*s, '#1a1612'); } }
/* the night sky with the dust still in it */
function b97aNight(x, W, H, hz){ x.fillStyle = vgrad(x, 0, hz, [[0,'#06070c'],[.7,'#12121a'],[1,'#22201e']]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 50; i++) { x.fillStyle = `rgba(220,226,250,${(.06 + hash(i, 9711)*.3).toFixed(2)})`; x.fillRect(hash(i, 9712)*W, Math.pow(hash(i, 9713), 1.5)*hz*.6, 1, 1); } // a few stars, the rest under the dust
  x.fillStyle = vgrad(x, hz, H, [[0,'#1a1612'],[1,'#080606']]); x.fillRect(0, hz, W, H - hz); }
/* a grey flat morning */
function b97aGrey(x, W, H, hz){ x.fillStyle = vgrad(x, 0, hz, [[0,'#5e6066'],[.7,'#8a8880'],[1,'#a8a294']]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(110,110,116,.28)'; x.beginPath(); x.ellipse(W*hash(i, 9721), hz*(.2 + hash(i, 9722)*.5), W*.22, hz*.04, 0, 0, 7); x.fill(); }
  x.fillStyle = vgrad(x, hz, H, [[0,'#7a7060'],[.5,'#5e5444'],[1,'#30281e']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 110; i++) { const d = hash(i, 9723), yy = hz + Math.pow(d, .8)*(H - hz); x.fillStyle = `rgba(${150 + Math.round(d*30)},${140 + Math.round(d*26)},${110 + Math.round(d*20)},.16)`; x.fillRect(hash(i, 9724)*W, yy, 2 + d*9, 1); } }
/* the trail going away: a wide trampled band from the foreground to a point on the horizon, ruts and prints in it */
function b97aTrail(x, W, H, hz, vx, col){ x.fillStyle = col; x.beginPath(); x.moveTo(vx - W*.02, hz); x.lineTo(vx + W*.02, hz); x.lineTo(W*.86, H); x.lineTo(W*.22, H); x.closePath(); x.fill();
  for (let i = 0; i < 4; i++) { const o = (i - 1.5)*.1; x.strokeStyle = 'rgba(40,32,24,.3)'; x.lineWidth = 1; x.beginPath(); x.moveTo(vx + (i - 1.5)*W*.006, hz); x.lineTo(W*(.54 + o), H); x.stroke(); } // ruts
  for (let i = 0; i < 60; i++) { const d = hash(i, 9731), py = hz + Math.pow(d, 1.4)*(H - hz), w = (py - hz)/(H - hz), px = vx + (hash(i, 9732) - .5)*(W*.04 + w*W*.6); ell(x, px, py, 1 + w*3, .5 + w*1.2, 'rgba(40,32,24,.35)'); } } // prints
/* a straggler, far: a small standing or sitting figure */
function b97aStraggler(x, px, py, s, sit){ const c = '#2a241e'; if (sit) { x.fillStyle = c; x.fillRect(px - 1.4*s, py - 3*s, 2.8*s, 3*s); ell(x, px, py - 3.8*s, 1*s, 1*s, c); B2F.line(x, c, .8*s, [[px + 1*s, py - .4*s], [px + 3.4*s, py]]); }
  else { x.fillStyle = c; x.fillRect(px - .8*s, py - 6*s, 1.6*s, 6*s); ell(x, px, py - 6.8*s, .9*s, .9*s, c); x.fillStyle = '#4a4238'; x.fillRect(px - 1.6*s, py - 5*s, 1.2*s, 2.4*s); } }

/* ---------------- the backdrops ---------------- */
/* the heavies' stretch late in the day: before the rearguard the dust wall close with shapes in it; after it, drawn back, the light going */
SCENEX.b9_c7_late = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, done = !!(S && S.book === 'dod' && S.chapter === 7 && f.b9_c7_rearDone), hz = H*.46;
  ctx.drawImage(sceneLayer('b97:late:' + (done ? 'b' : 'a'), W, H, (x, W, H) => { b96aCopper(x, W, H, hz, done ? .9 : .75);
    x.fillStyle = 'rgba(120,40,30,.18)'; x.fillRect(0, 0, W, hz); // the sky gone red-brown
    x.fillStyle = vgrad(x, H*.3, H, [[0,'#5a4a36'],[1,'#2a2016']]); x.beginPath(); x.moveTo(0, H*.3); x.lineTo(W*.12, H*.42); x.lineTo(W*.16, H); x.lineTo(0, H); x.closePath(); x.fill(); // the cut bank, west
    x.strokeStyle = 'rgba(200,170,120,.25)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, H*.3); x.lineTo(W*.12, H*.42); x.stroke();
    for (let i = 0; i < 3; i++) b97aWreck(x, W*(.8 + i*.08), H*(.66 + i*.02), H/220, false, 0, 0); // the burned wagons, east
    b96aLine(x, W*.14, W*.78, H*.72, H/160, 'eve', true); }), 0, 0, W, H);
  for (let i = 0; i < 3; i++) { const k = mo ? ((t/7000 + i/3) % 1) : i/3; ctx.fillStyle = `rgba(50,44,40,${(.3*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.82 + i*.05) + k*W*.03, H*.5 - k*H*.3, W*.02 + k*W*.03, H*.03 + k*H*.03, 0, 0, 7); ctx.fill(); } // the wagons still smoking
  if (!done) { b96aDust(ctx, W, H, hz + H*.06, .4, .8, t, mo, .1, 1.05); const k = mo ? (t/14000) % 1 : .5;
    b96aShapes(ctx, [[W*(.24 + k*.03), H*.62, 1], [W*.42, H*.6, -1], [W*(.58 - k*.02), H*.63, 1], [W*.72, H*.61, 1]], H/105, .68);
    for (let i = 0; i < 3; i++) { const on = mo ? (Math.sin(t/360 + i*2.3) > .8) : i === 1; if (!on) continue; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*(.3 + i*.2), H*(.5 + hash(i, 9741)*.06), H*.05, '#c8dce8', .4); ctx.globalCompositeOperation = 'source-over'; } } // pale light in the dust
  else { b96aDust(ctx, W, H, hz, .1, .5, t, mo, .1, 1); ctx.fillStyle = 'rgba(10,8,16,.32)'; ctx.fillRect(0, 0, W, H); } // drawn back; the light going
  for (let i = 0; i < 14; i++) { const k = ((t/9000*mo + hash(i, 9742)) % 1); ctx.fillStyle = `rgba(240,200,150,${(.3*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9743)*.8) + k*W*.08, H*(.5 + hash(i, 9744)*.4) - k*H*.06, 1.3, 1.3); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.2 + i*Math.min(.06, .34/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* after dark: the burning wagons for light, the shields along them, the dark past it, the column's lamps far behind */
SCENEX.b9_dark = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, c7 = !!(S && S.book === 'dod' && S.chapter === 7), hz = H*.44,
    fell = c7 ? Object.keys((S && S.dead) || {}).filter(k => S.dead[k] && S.dead[k].ch === 7 && !S.dead[k].from).length : 0, row = c7 && f.b9_c7_rearDone ? Math.min(9, 4 + fell) : 0;
  ctx.drawImage(sceneLayer('b97:dark:' + row, W, H, (x, W, H) => { b97aNight(x, W, H, hz);
    b96aLine(x, W*.02, W*.98, H*.62, H/190, 'night', true);
    if (row) b97aRow(x, W*.54, H*.86, H/150, row); }), 0, 0, W, H);
  ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 4; i++) glow(ctx, W*(.12 + i*.24), H*.68, H*.34, '#ff6a20', .16); ctx.globalCompositeOperation = 'source-over'; // the ground lit round them
  for (let i = 0; i < 4; i++) b97aWreck(ctx, W*(.12 + i*.24), H*(.68 + (i % 2)*.03), H/120, true, t, mo); // the wagons burning, for the light
  for (let i = 0; i < 3; i++) { const on = mo ? (Math.sin(t/2600 + i*1.9) > .2) : true; if (!on) continue; ctx.save(); ctx.globalAlpha = .28; b96aShapes(ctx, [[W*(.2 + i*.3), hz + H*.08, i % 2 ? -1 : 1]], H/150, 1); ctx.restore(); } // plate catching fire-glow, out past the light
  for (let i = 0; i < 12; i++) { ctx.fillStyle = `rgba(255,200,120,${(.4 + .3*(mo ? Math.sin(t/500 + i) : 0)).toFixed(2)})`; ctx.fillRect(W*(.62 + i*.026), hz + H*.02 - hash(i, 9751)*H*.012, 1.2, 1.2); } // the column's lamps going away south
  for (let i = 0; i < 16; i++) { const k = ((t/3000*mo + hash(i, 9752)) % 1); ctx.fillStyle = `rgba(255,170,90,${(.6*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9753)*.8) + Math.sin(k*6 + i)*4, H*.62 - k*H*.3, 1.2, 1.2); } // sparks going up
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .75, .55); };

/* a grey morning on the retreat trail */
SCENEX.b9_retreat = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, vx = W*.7;
  ctx.drawImage(sceneLayer('b97:retreat', W, H, (x, W, H) => { b97aGrey(x, W, H, hz);
    b97aTrail(x, W, H, hz, vx, 'rgba(94,82,64,.7)');
    b93aColumn(x, W, H, hz, vx, 26, 'day');
    [[.36, .66, 0], [.3, .74, 1], [.82, .6, 1], [.88, .7, 0], [.44, .58, 0]].forEach(([u, v, sit]) => b97aStraggler(x, W*u, H*v, H/130, !!sit)); // stragglers
    x.strokeStyle = '#2a2018'; x.lineWidth = 1.4; x.beginPath(); x.arc(W*.46, H*.84, H*.03, 0, 7); x.stroke(); B2F.line(x, '#2a2018', 1, [[W*.4, H*.9], [W*.52, H*.86]]); // a wheel, a broken pike
    ell(x, W*.66, H*.9, H*.022, H*.012, '#3a3028'); }), 0, 0, W, H); // a cook-pot with its bottom out
  ctx.save(); ctx.globalAlpha = .5; b96aDust(ctx, W, H, hz, .05, .4, t, mo, 0, .3); ctx.restore(); // far behind, low, the last of the dust
  for (let i = 0; i < 10; i++) { const k = ((t/11000*mo + hash(i, 9761)) % 1); ctx.fillStyle = `rgba(220,210,190,${(.22*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9762)*.8) + k*W*.05, H*(.5 + hash(i, 9763)*.4) - k*H*.04, 1.2, 1.2); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.12 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* the retreat camp days after, at dusk */
SCENEX.b9_c7_camp = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b97:camp', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'eve', false);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { if (hash(i, r + 9771) > .66) continue; b92aTent(x, W*(.06 + i*.11 + r*.03), hz + H*(.06 + r*.07), H/(260 - r*50), 'eve'); } // tents in rows, with gaps in them
    b92aWagon(x, W*.18, H*.74, H/150, 'eve', false); // the cook-wagon
    B2F.line(x, '#1a120c', 1.2, [[W*.22, H*.78], [W*.24, H*.7]]); ell(x, W*.235, H*.7, H*.02, H*.012, '#2a2018'); // the pot on its tailboard
    for (let i = 0; i < 8; i++) { const px = W*(.78 + (i % 4)*.05), py = H*(.62 + Math.floor(i/4)*.05); ell(x, px, py, H*.022, H*.008, '#4a4036'); } }), 0, 0, W, H); // the surgeons' lines, blankets in rows
  for (let i = 0; i < 5; i++) { const px = W*(.1 + i*.2), py = H*(.58 + hash(i, 9772)*.06); ctx.globalCompositeOperation = 'lighter'; glow(ctx, px, py, H*.05, '#ff8a3a', .18); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,170,90,.8)'; ctx.fillRect(px - 1, py - 1, 2, 2); } // dung-fires along the lines
  for (let i = 0; i < 3; i++) { const on = mo ? Math.sin(t/900 + i*2) > -.3 : true; if (on) { ctx.fillStyle = 'rgba(255,220,150,.8)'; ctx.fillRect(W*(.8 + i*.05), H*.6, 1.6, 1.6); } } // healers' lamps going down the rows
  b94aFire(ctx, W*.5, H*.86, fl, 1.1);
  for (let i = 0; i < 3; i++) { const k = ((t/6000*mo + i/3) % 1); ctx.fillStyle = `rgba(180,170,160,${(.12*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*.5 + Math.sin(k*5 + i)*4, H*.8 - k*H*.22, 4 + k*10, 3 + k*6, 0, 0, 7); ctx.fill(); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .62, .5); };

/* the road out, by the key (the finale's road page) */
SCENEX.b9_c7_road = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, k = (S && S.chapters && S.chapters[7]) || (S && S.f && S.f.b9_c7_key) || 'adjunct', hz = H*.46;
  ctx.drawImage(sceneLayer('b97:road:' + k, W, H, (x, W, H) => {
    if (k === 'home') { b93aLand(x, W, H, 'eve', false); glow(x, W*.12, hz, W*.5, '#f0a060', .3); b97aTrail(x, W, H, hz, W*.14, 'rgba(70,56,40,.6)'); } // west, into the last of the sun
    else if (k === 'south') { b93aLand(x, W, H, 'day', false); b97aTrail(x, W, H, hz, W*.72, 'rgba(110,94,70,.55)');
      x.fillStyle = 'rgba(110,94,70,.55)'; x.beginPath(); x.moveTo(W*.5, H*.7); x.lineTo(W*.56, H*.68); x.lineTo(W*.18, H); x.lineTo(W*.02, H); x.closePath(); x.fill(); // the fork, south
      for (let i = 0; i < 5; i++) b92aWagon(x, W*(.42 - i*.08), H*(.74 + i*.05), H/(220 - i*25), 'day', false); // the Letherii wagons, turning south
      b93aColumn(x, W, H, hz, W*.72, 14, 'day'); }
    else { b93aLand(x, W, H, 'day', false); x.fillStyle = 'rgba(255,250,240,.06)'; x.fillRect(0, 0, W, hz); b93aColumn(x, W, H, hz, W*.66, 30, 'day'); } }), 0, 0, W, H); // east, the column into blank country
  for (let i = 0; i < 10; i++) { const q = ((t/10000*mo + hash(i, 9781)) % 1); ctx.fillStyle = `rgba(240,216,168,${(.25*(1 - q)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9782)*.8) + q*W*.05, H*(.55 + hash(i, 9783)*.35) - q*H*.04, 1.3, 1.3); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, k === 'home' ? W*(.5 - i*Math.min(.055, .3/sq.length)) : W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.6, t, {phase:i, dir:k === 'home' ? -1 : 1}));
  vign(ctx, W, H, k === 'home' ? .62 : .5, .5); };

/* ---------------- the ground ---------------- */
TILEX.b9_c7_field = (ctx, ch, x, y, T, dark) => { const base = TILEX.b9_c6_field || TILEX.b9_c4_wastes; if (!base) return; const N = !!dark;
  if (ch !== 'K') return base(ctx, ch, x, y, T, dark);
  base(ctx, '.', x, y, T, dark);
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T; ell(ctx, px + T*.5, py + T*.88, T*.46, T*.1, 'rgba(0,0,0,.5)');
    ctx.fillStyle = '#1a120c'; ctx.fillRect(px + T*.08, py + T*.42, T*.84, T*.3); ctx.strokeStyle = '#0c0806'; ctx.lineWidth = Math.max(1, T*.03); ctx.strokeRect(px + T*.08, py + T*.42, T*.84, T*.3); // a charred wagon-bed
    for (let i = 0; i < 4; i++) B2F.line(ctx, '#120c08', Math.max(1, T*.04), [[px + T*(.14 + i*.22), py + T*.42], [px + T*(.16 + i*.22), py + T*(.18 + hash(x, y, 9791 + i)*.1)]]); // ribs, burned short
    ctx.strokeStyle = '#140e0a'; ctx.lineWidth = Math.max(1, T*.04); ctx.beginPath(); ctx.arc(px + T*.3, py + T*.76, T*.13, 0, 7); ctx.stroke(); // a wheel
    if (N) { glow(ctx, px + T*.5, py + T*.5, T*.9, '#ff7a30', .22); for (let i = 0; i < 4; i++) ell(ctx, px + T*(.2 + i*.2), py + T*(.4 + hash(x, y, 9795 + i)*.1), T*.05, T*.09, ['#ffb060', '#ff8a3a', '#ffd080', '#ff9a4a'][i]); } // alight after dark
    else for (let i = 0; i < 5; i++) ell(ctx, px + T*(.15 + i*.17), py + T*.5, T*.03, T*.02, 'rgba(255,120,60,.45)'); }); }; // embers
/* low cover ('t') on this chapter's ground: a burned wagon's wreck, a wheel and charred boards */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b9_c7_field') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.88, T*.44, T*.1, 'rgba(0,0,0,.5)');
      [[.12, -.18], [.5, .12]].forEach(([a, r], i) => { ctx.save(); ctx.translate(px + T*(a + .2), py + T*.8); ctx.rotate(r); ctx.fillStyle = ['#1e140c', '#24180e'][i]; ctx.fillRect(-T*.22, -T*.1, T*.44, T*.14); ctx.restore(); }); // charred boards
      ctx.strokeStyle = '#140e0a'; ctx.lineWidth = Math.max(1.2, T*.05); ctx.beginPath(); ctx.ellipse(px + T*.56, py + T*.52, T*.2, T*.26, -.3, 0, 7); ctx.stroke(); // a wheel on its side, leaning
      for (let i = 0; i < 5; i++) { const a = i/5*Math.PI*2; B2F.line(ctx, '#140e0a', Math.max(.8, T*.025), [[px + T*.56, py + T*.52], [px + T*.56 + Math.cos(a)*T*.18, py + T*.52 + Math.sin(a)*T*.24]]); }
      if (N) glow(ctx, px + T*.5, py + T*.7, T*.5, '#ff7a30', .14); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Nine's ground: dusk dust-brown, a low warm rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".42" cy=".44" r=".8"><stop offset="0" stop-color="#4a3c2c"/><stop offset=".6" stop-color="#2a2016"/><stop offset="1" stop-color="#140f0a"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* the rearguard's cloak: thick grey wool hung over a broken wagon-rail, scale sewn over the shoulders and down the back, dust in the folds */
  const scales = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { const x = 70 + c*10 + (r % 2)*5, y = 38 + r*9; if (x > 136) continue; scales.push(`<path d="M${x - 5} ${y} Q${x} ${y + 8} ${x + 5} ${y} Q${x} ${y + 3} ${x - 5} ${y} Z" fill="url(#b97rc-s)" stroke="#1a1410" stroke-width=".7"/>`); }
  ART['item/b9_c7_rearguardcloak'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A rearguard's cloak">${bg('b97rc')}
<linearGradient id="b97rc-w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a8680"/><stop offset=".5" stop-color="#5a5650"/><stop offset="1" stop-color="#26241f"/></linearGradient>
<linearGradient id="b97rc-s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8b4ac"/><stop offset=".5" stop-color="#6a6862"/><stop offset="1" stop-color="#2a2824"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b97rc-bg)"/><path d="M0 120 Q100 112 200 118 L200 150 L0 150 Z" fill="#3a2e20"/>
<rect x="34" y="26" width="132" height="8" rx="3" fill="#3a2a1a" stroke="#140f0a"/><path d="M40 30 L160 30" stroke="#d8b080" stroke-width="1" opacity=".25"/>
<ellipse cx="100" cy="124" rx="70" ry="7" fill="url(#b97rc-sh)"/>
<path d="M58 30 L142 30 Q156 70 150 122 Q126 116 100 124 Q74 116 50 122 Q44 70 58 30 Z" fill="url(#b97rc-w)" stroke="#141210" stroke-width="1.6"/>
<path d="M72 36 Q70 80 66 118 M100 36 Q100 82 100 122 M128 36 Q130 80 134 118" fill="none" stroke="#1a1814" stroke-width="1.4" opacity=".55"/>
${scales.join('')}
<path d="M52 118 Q76 112 100 120 Q124 112 148 118" fill="none" stroke="#a89a7a" stroke-width="2" opacity=".3"/>
<path d="M57 34 L52 118" stroke="#f0c888" stroke-width="1.4" opacity=".4"/><ellipse cx="96" cy="70" rx="50" ry="40" fill="#e8b878" opacity=".04"/></svg>`;
  ART_SIZE['item/b9_c7_rearguardcloak'] = [200, 150];
  /* the squad's roll, notched: a stick of hard wood with a row of notches, a few with a line cut across, on dust, a knife beside it */
  const notches = []; for (let i = 0; i < 14; i++) { const x = 40 + i*9; notches.push(`<path d="M${x} 66 L${x + 3} 74 L${x + 6} 66" fill="#2a1a0c" stroke="#140c06" stroke-width=".6"/>`); if (i === 3 || i === 9) notches.push(`<path d="M${x - 1} 76 L${x + 7} 62" stroke="#140c06" stroke-width="1.4"/>`); }
  ART['item/b9_c7_rollstick'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="The squad's roll, notched">${bg('b97rs')}
<linearGradient id="b97rs-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a070"/><stop offset=".5" stop-color="#8a6438"/><stop offset="1" stop-color="#4a3018"/></linearGradient>
<linearGradient id="b97rs-k" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8d8d0"/><stop offset="1" stop-color="#6a6a66"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b97rs-bg)"/><path d="M0 100 Q100 92 200 98 L200 150 L0 150 Z" fill="#3a2e20"/>
<g fill="#5a4a36">${[[22, 118], [64, 132], [150, 126], [180, 112], [108, 140]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="2.6"/>`).join('')}</g>
<ellipse cx="100" cy="94" rx="76" ry="7" fill="url(#b97rs-sh)"/>
<path d="M30 64 Q30 60 34 60 L168 60 Q172 60 174 64 L176 80 Q174 84 170 84 L34 84 Q30 84 30 80 Z" fill="url(#b97rs-w)" stroke="#2a1a0c" stroke-width="1.6"/>
<path d="M36 80 L170 80" stroke="#2a1a0c" stroke-width=".8" opacity=".5"/><path d="M34 63 L170 63" stroke="#f0d0a0" stroke-width="1" opacity=".4"/>
${notches.join('')}
<path d="M120 104 L176 96 L178 100 L122 108 Z" fill="url(#b97rs-k)" stroke="#2a2a28" stroke-width=".8"/><rect x="100" y="104" width="22" height="7" rx="2" fill="#3a2a1a" stroke="#140f0a" transform="rotate(-8 111 107)"/>
<path d="M31 80 L33 64" stroke="#f0c888" stroke-width="1.4" opacity=".45"/></svg>`;
  ART_SIZE['item/b9_c7_rollstick'] = [200, 150];
}
