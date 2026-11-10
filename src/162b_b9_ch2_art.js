/* ============ Book Nine, Chapter 2 art: The Escort — the escort's muster ground outside the landward gate of Letheras, the drill
   field, the supply train by day and by night, and the road east at first light ============ */
/* Book Nine's look (160b) outside Letheras: a plain of trodden grass going to dust, the city a low line of towers to the west, the
   Malazan lines a smudge of fires and dust to the east. Evening is a dusk sky over lamplit tailboards; day is a tired pale sky with Book
   Nine's dust in it and a low warm light from the left; night is slate-blue with one lamp at a tailboard.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     brennet      (replaces 160's simple sprite) the carter: a leather apron studded with iron, a padded cap, the iron wagon-pin
                  as long as his arm in the near hand, a carter's knife at the belt, heavy boots
     b9_c2_orla   the water-cart driver: a long oiled carter's coat with studs at the shoulders, a headscarf, sleeves rolled, a cudgel
     b9_c2_saffa  the field cook: broad, an apron over a dun dress, scarred forearms, a ladle she points with
   Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b9_muster        the muster ground: by day (the drill), brigades in blocks on the beaten square, the Malazan sergeant walking the
                      front rank, the train behind; on the first evening (phase 1), tents in rows, the drill over, lamps going up at
                      the tailboards, the city's towers dark to the west
     b9_wagons        the supply train by day: wagons in a line longer than the eye goes, water barrels lashed three high, oxen,
                      clerks at the tailboards (later Letherii chapters' card falls back to it: the city is drawn only in Ch 1–2)
     b9_c2_yardnight  the train's yard at night: wagons in rows with their tilts dark, oxen on the picket, barrels, one lamp
     b9_c2_road       the road east at first light: the escort's files and wagons going out of the landward gate, the Malazans'
                      dust standing up far ahead
   Ground (TILEX): b9_c2_muster (Book Five's lines, 86b, with Book Nine's dust over the grass; 'w' a supply wagon, 'o' water barrels,
   'x' oxen, 'c' the water-cart, 'T' a tailboard with a lamp, 'r' a rack of wooden swords, 'P' the drill post, '#' a rail fence,
   '<' '>' a track off the ground). Battle 't': lashed barrels. The chapter's gear in the series' 200×150 item style, on Book Nine's
   ground: dusk dust-brown (#4a3c2c → #140f0a), a low warm rim light. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Brennet: thirty-one, broad; a carter's leather apron studded with iron over a dun shirt, a padded cap, heavy boots, the iron wagon-pin
     held upright in the near hand, a carter's knife at the belt */
  brennet(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1.02);
    B2F.line(ctx, '#5a5a5c', 2, [[8, 9], [9.4, -15]]); ell(ctx, 9.5, -15.8, 1.6, 1.2, '#7a7a7c'); // the wagon-pin, its head
    h.legs('#3a3024'); ctx.fillStyle = '#2a2018'; ctx.fillRect(-5, 10, 4, 3); ctx.fillRect(1, 10, 4, 3); // heavy boots
    poly(ctx, [[-6.6,-6.2],[6.6,-6.2],[6.4,7],[-6.4,7]], h.armor('#8a7a62', '#2a2216')); // the shirt
    poly(ctx, [[-5.2,-3.4],[5.2,-3.4],[5.8,10.4],[-5.8,10.4]], h.armor('#6e5238', '#22180e')); // the apron, to the knee
    ctx.fillStyle = '#a8a8a8'; for (let y = -1.6; y < 9; y += 2.8) for (let x = -3.6; x <= 3.6; x += 3.6) ctx.fillRect(x - .4, y, .9, .9); // its iron studs
    B2F.line(ctx, '#2a1a0e', .8, [[-4.6, -3.4], [-4, -6.2]]); B2F.line(ctx, '#2a1a0e', .8, [[4.6, -3.4], [4, -6.2]]); // the straps
    ctx.fillStyle = '#2a2018'; ctx.fillRect(-6.4, 2.4, 12.8, 1.2); ctx.fillStyle = '#8a8478'; ctx.fillRect(-5.6, 3.6, 1, 3); // the belt, the knife
    ctx.fillStyle = '#b48e6a'; ctx.fillRect(6.4, -1.4, 2.6, 3); // the hand on the pin
    ctx.fillStyle = 'rgba(230,200,150,.14)'; ctx.fillRect(-6.4, -6, 1.2, 12); // the low warm light on the lit edge
    h.head('#c09a78', 4.5, -11.3); h.look('rgba(20,12,10,.85)', -11.5);
    ctx.fillStyle = '#5a4a38'; ctx.beginPath(); ctx.arc(0, -12.6, 5, Math.PI*1.02, Math.PI*1.98); ctx.fill(); ctx.fillRect(-5.2, -13, 10.4, 1.6); // the padded cap
    ctx.fillStyle = 'rgba(0,0,0,.25)'; [-2.6, 0, 2.6].forEach(x => ctx.fillRect(x, -16.6, .5, 3.6)); // its quilting
    ctx.restore(); },
  /* Orla: the water-cart driver. A long oiled carter's coat with studs at the shoulders, a headscarf knotted at the nape, sleeves rolled, a
     cudgel in the near hand */
  b9_c2_orla(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1);
    B2F.line(ctx, '#4a3420', 1.8, [[7.6, 6], [9.6, -4]]); ell(ctx, 9.8, -4.8, 1.5, 1.6, '#4a3420'); // the cudgel
    h.legs('#2e2620');
    poly(ctx, [[-6.4,-6],[6.4,-6],[7.6,11.6],[-7.6,11.6]], h.armor('#7a6c52', '#26201a')); // the long coat
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-.4, -4, .8, 15.6); // its opening
    ctx.fillStyle = '#9a9a9a'; [[-5.4,-5.4],[-4,-5.4],[4,-5.4],[5.4,-5.4]].forEach(([x, y]) => ctx.fillRect(x - .4, y, .8, .8)); // the shoulder studs
    ctx.fillStyle = '#c09a78'; ctx.fillRect(6.2, -3, 2, 3.4); // the rolled sleeve, the forearm
    ctx.fillStyle = 'rgba(230,200,150,.14)'; ctx.fillRect(-6.2, -5.6, 1.2, 15);
    h.head('#c8a07e', 4.2, -11.2); h.look('rgba(20,12,10,.85)', -11.4);
    ctx.fillStyle = '#7a3a2a'; ctx.beginPath(); ctx.arc(0, -12.2, 4.7, Math.PI*.98, Math.PI*2.02); ctx.fill(); poly(ctx, [[-4.4,-12],[-6.2,-9],[-4,-10.4]], '#6a3020'); // the headscarf, its knot
    ctx.restore(); },
  /* Saffa: the field cook. Broad; a pale apron over a dun dress to the ground, the forearms bare and scarred, a ladle held up to point */
  b9_c2_saffa(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.12, .98);
    ctx.fillStyle = '#2a221c'; ctx.fillRect(-4.6, 9, 3.6, 4); ctx.fillRect(1, 9, 3.6, 4);
    poly(ctx, [[-6.8,-5.8],[6.8,-5.8],[8.2,12],[-8.2,12]], h.armor('#7a6a52', '#2a2218')); // the dress
    poly(ctx, [[-4.6,-3],[4.6,-3],[5.6,10.6],[-5.6,10.6]], h.armor('#d8ccb0', '#6a604c')); ctx.fillStyle = 'rgba(120,80,40,.35)'; ell(ctx, 1.4, 4, 2, 1.4, 'rgba(120,80,40,.35)'); // the apron, a stain
    ctx.fillStyle = '#b8906c'; ctx.fillRect(-8.6, -2, 2.4, 6); ctx.fillStyle = 'rgba(140,70,50,.5)'; ctx.fillRect(-8.4, 0, 2, 1.2); // the far forearm, its scar
    B2F.line(ctx, '#8a8478', 1.2, [[7, 0], [11, -9]]); ell(ctx, 11.4, -10, 2, 1.4, '#9a9488'); ctx.fillStyle = '#b8906c'; ctx.fillRect(6, -1, 2.4, 3); // the ladle, pointing
    ctx.fillStyle = 'rgba(230,200,150,.14)'; ctx.fillRect(-6.6, -5.4, 1.2, 15);
    h.head('#c09a78', 4.6, -11); h.look('rgba(20,12,10,.85)', -11.2);
    ctx.fillStyle = '#3a2a1e'; ctx.beginPath(); ctx.arc(0, -12.6, 4.8, Math.PI*1.04, Math.PI*1.96); ctx.fill(); ell(ctx, 0, -16.4, 2.2, 1.6, '#3a2a1e'); // hair up in a knot
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* the plain outside the landward gate: sky (eve, day, night, dawn), the city low in the west, the land going to dust. Returns the horizon. */
function b92aPlain(x, W, H, when, city){ const hz = H*.46;
  const sky = {eve:[[0,'#1a1c2e'],[.55,'#5a4a4e'],[.9,'#b4805a'],[1,'#d09a62']], day:[[0,'#8a8a84'],[.7,'#b8ac94'],[1,'#ccbc9c']], night:[[0,'#04060c'],[.7,'#0e1224'],[1,'#181a2a']], dawn:[[0,'#3a4256'],[.5,'#8a7a70'],[.85,'#d8a878'],[1,'#ecc490']]}[when];
  x.fillStyle = vgrad(x, 0, hz, sky); x.fillRect(0, 0, W, hz + 2);
  if (when === 'night' || when === 'eve') for (let i = 0; i < (when === 'night' ? 60 : 20); i++) { x.fillStyle = `rgba(220,226,250,${(.08 + hash(i, 9211)*.35).toFixed(2)})`; x.fillRect(hash(i, 9212)*W, Math.pow(hash(i, 9213), 1.5)*hz*.6, 1, 1); }
  if (when === 'day') { glow(x, W*.18, hz, W*.6, '#e8c890', .22); for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(220,206,180,.28)'; x.beginPath(); x.ellipse(hash(i, 9214)*W, hz*(.2 + hash(i, 9215)*.4), W*.16, hz*.05, 0, 0, 7); x.fill(); } }
  if (when === 'eve') glow(x, W*.1, hz, W*.5, '#e89a5a', .3);
  if (when === 'dawn') glow(x, W*.92, hz, W*.6, '#f0c080', .4);
  if (city) { const col = {eve:'#2a2028', day:'#8a8070', night:'#0a0c14', dawn:'#4a4048'}[when];
    x.fillStyle = col; for (let i = 0; i < 22; i++) { const bx = W*(.01 + i*.012), bh = H*(.02 + hash(i, 9216)*.05); x.fillRect(bx, hz - bh, W*.011, bh + 1); }
    x.fillRect(W*.05, hz - H*.11, W*.012, H*.11); x.beginPath(); x.arc(W*.15, hz - H*.05, W*.03, Math.PI, 0); x.fill(); // a tower, the new dome
    if (when === 'eve' || when === 'night') for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(255,190,110,.6)'; x.fillRect(W*(.02 + hash(i, 9217)*.24), hz - H*(.01 + hash(i, 9218)*.04), 1.2, 1.2); } }
  const land = {eve:[[0,'#5a4a3a'],[1,'#1e1812']], day:[[0,'#9a8a6a'],[1,'#5a4a36']], night:[[0,'#1a1c20'],[1,'#0c0c0e']], dawn:[[0,'#7a6a52'],[1,'#2a2218']]}[when];
  x.fillStyle = vgrad(x, hz, H, land); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 90; i++) { const d = hash(i, 9219), yy = hz + Math.pow(d, .8)*(H - hz); x.fillStyle = when === 'night' ? 'rgba(80,84,96,.18)' : `rgba(${150 + Math.round(d*40)},${130 + Math.round(d*30)},${90 + Math.round(d*20)},.18)`; x.fillRect(hash(i, 9220)*W, yy, 2 + d*8, 1); } // trodden grass and dust
  return hz; }
/* a supply wagon, side on: a canvas tilt, the bed, two wheels, shafts down; lit picks the light (day, eve, night) */
function b92aWagon(x, cx, cy, s, when, lamp){ const N = when === 'night', E = when === 'eve';
  const wd = N ? '#1a140c' : E ? '#3a2a1a' : '#5a4430', tilt = N ? '#2a2a2a' : E ? '#8a7a64' : '#c8b896';
  ell(x, cx, cy + 2*s, 26*s, 3*s, 'rgba(0,0,0,.35)');
  x.fillStyle = tilt; x.beginPath(); x.moveTo(cx - 20*s, cy - 12*s); x.quadraticCurveTo(cx, cy - 27*s, cx + 20*s, cy - 12*s); x.closePath(); x.fill();
  x.strokeStyle = N ? 'rgba(0,0,0,.5)' : 'rgba(60,44,28,.4)'; x.lineWidth = Math.max(1, s*.8); [-10, 0, 10].forEach(d => { x.beginPath(); x.moveTo(cx + d*s, cy - 12*s); x.quadraticCurveTo(cx + d*s, cy - 20*s, cx + d*s*.9, cy - (23 - Math.abs(d)*.3)*s); x.stroke(); }); // the hoops
  x.fillStyle = wd; x.fillRect(cx - 21*s, cy - 12*s, 42*s, 6*s); B2F.line(x, wd, 1.6*s, [[cx + 21*s, cy - 7*s], [cx + 34*s, cy - 1*s]]);
  [-12, 12].forEach(d => { x.strokeStyle = N ? '#0c0a08' : '#2a1e12'; x.lineWidth = 1.6*s; x.beginPath(); x.arc(cx + d*s, cy - 3*s, 5*s, 0, 7); x.stroke(); x.beginPath(); x.moveTo(cx + d*s - 5*s, cy - 3*s); x.lineTo(cx + d*s + 5*s, cy - 3*s); x.moveTo(cx + d*s, cy - 8*s); x.lineTo(cx + d*s, cy + 2*s); x.stroke(); });
  if (lamp) { x.fillStyle = 'rgba(255,196,112,.95)'; x.fillRect(cx - 23*s, cy - 15*s, 2.4*s, 3*s); glow(x, cx - 22*s, cy - 13*s, 22*s, '#ffb060', N ? .4 : .3); } }
/* water barrels lashed three high on a flat wagon */
function b92aBarrels(x, cx, cy, s, when){ const N = when === 'night', st = N ? '#2a2016' : when === 'eve' ? '#4a3622' : '#7a5a38', hoop = N ? '#14100c' : '#3a2a1a';
  x.fillStyle = N ? '#1a120c' : '#4a3420'; x.fillRect(cx - 18*s, cy - 3*s, 36*s, 3*s);
  [[-12, 0], [0, 0], [12, 0], [-6, 1], [6, 1], [0, 2]].forEach(([dx, r]) => { const bx = cx + dx*s, by = cy - 3*s - r*8*s - 4*s; ell(x, bx, by, 5*s, 4*s, st); x.fillStyle = hoop; x.fillRect(bx - 5*s, by - 1.4*s, 10*s, .8*s); x.fillRect(bx - 5*s, by + .8*s, 10*s, .8*s); });
  x.strokeStyle = N ? 'rgba(120,110,90,.3)' : 'rgba(180,160,120,.5)'; x.lineWidth = Math.max(1, s*.6); x.beginPath(); x.moveTo(cx - 17*s, cy - 3*s); x.lineTo(cx, cy - 26*s); x.lineTo(cx + 17*s, cy - 3*s); x.stroke(); } // the rope over
/* an ox, side on, small: a heavy body, a hump, short horns, head low */
function b92aOx(x, cx, cy, s, col, dir){ x.save(); x.translate(cx, cy); x.scale(dir || 1, 1); x.fillStyle = col;
  x.beginPath(); x.ellipse(0, -6*s, 8*s, 4*s, 0, 0, 7); x.fill(); x.beginPath(); x.ellipse(-4*s, -9*s, 3*s, 2*s, 0, 0, 7); x.fill(); // the body, the hump
  x.fillRect(-7*s, -4*s, 1.8*s, 4*s); x.fillRect(-3*s, -4*s, 1.8*s, 4*s); x.fillRect(3*s, -4*s, 1.8*s, 4*s); x.fillRect(6*s, -4*s, 1.8*s, 4*s); // legs
  x.beginPath(); x.ellipse(-10*s, -5.4*s, 2.6*s, 2*s, .3, 0, 7); x.fill(); // the head, low
  x.strokeStyle = 'rgba(220,210,180,.6)'; x.lineWidth = Math.max(1, s*.6); x.beginPath(); x.moveTo(-10*s, -7*s); x.quadraticCurveTo(-12*s, -9.6*s, -13.4*s, -8.4*s); x.stroke(); x.restore(); }
/* a tent of the escort, from the side: new canvas, the old battalion mark painted out */
function b92aTent(x, cx, by, s, when){ const c = {eve:['#7a6e60', '#3e362e'], day:['#b8ac94', '#7a7060'], night:['#2a2a2e', '#14141a'], dawn:['#8a7e6c', '#4a4238']}[when];
  x.fillStyle = c[0]; x.beginPath(); x.moveTo(cx - 12*s, by); x.lineTo(cx - 2*s, by - 11*s); x.lineTo(cx + 2*s, by - 11*s); x.lineTo(cx + 12*s, by); x.closePath(); x.fill();
  x.fillStyle = c[1]; x.beginPath(); x.moveTo(cx + 2*s, by - 11*s); x.lineTo(cx + 12*s, by); x.lineTo(cx + 4*s, by); x.closePath(); x.fill();
  x.fillStyle = 'rgba(0,0,0,.45)'; x.beginPath(); x.moveTo(cx - 2*s, by); x.lineTo(cx, by - 6*s); x.lineTo(cx + 2*s, by); x.fill();
  x.fillStyle = 'rgba(255,255,255,.08)'; x.fillRect(cx - 7*s, by - 6*s, 3*s, 2*s); } // the painted-out mark
/* the drill-square's companies, far: blocks of small figures in their ranks, shields on */
function b92aBlock(x, cx, cy, s, rows, cols){ for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const px = cx + (c - cols/2)*3.4*s + r*.6*s, py = cy + r*2.6*s;
  x.fillStyle = '#3a2e22'; x.fillRect(px - .8*s, py - 4*s, 1.6*s, 4*s); ell(x, px, py - 4.8*s, .9*s, .9*s, '#3a2e22'); x.fillStyle = r === rows - 1 ? '#5a6878' : '#4a4a48'; x.fillRect(px - 1.4*s, py - 3*s, 1.2*s, 2*s); } }

/* ---------------- the backdrops ---------------- */
/* the muster ground. Phase 1 (the first evening): tents in rows, the drill over, lamps going up at the tailboards of the train, the city's
   towers dark in the west. Otherwise (the drill field by day): the companies in blocks on the beaten square, the Malazan sergeant walking
   the front rank, the train behind, the dust up. */
SCENEX.b9_muster = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, eve = (S && S.book === 'dod' && S.chapter === 2) ? (f.b9_c2_ph || 1) === 1 : false, fl = b2Fl(t);
  if (eve) {
    ctx.drawImage(sceneLayer('b92:eve', W, H, (x, W, H) => { const hz = b92aPlain(x, W, H, 'eve', true);
      for (let i = 0; i < 7; i++) b92aWagon(x, W*(.5 + i*.075), hz + H*.06, H/(360 - i*8), 'eve', i % 2 === 0);
      for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) b92aTent(x, W*(.06 + i*.075 + r*.03), hz + H*(.1 + r*.1), H/(200 - r*40), 'eve');
      b92aBarrels(x, W*.82, hz + H*.2, H/200, 'eve'); }), 0, 0, W, H);
    const fx = W*.42, fy = H*.86; ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy - 4, H*.34, '#ff8a3a', .24*fl); ctx.globalCompositeOperation = 'source-over';
    ell(ctx, fx, fy, 9, 3, '#1a0e06'); poly(ctx, [[fx - 7, fy], [fx - 2, fy - 12*fl], [fx + 1, fy - 6], [fx + 4, fy - 11*fl], [fx + 7, fy]], 'rgba(255,150,60,.95)'); poly(ctx, [[fx - 3, fy], [fx, fy - 7*fl], [fx + 3, fy]], 'rgba(255,230,150,.95)');
    for (let i = 0; i < 4; i++) { const lx = W*(.5 + i*.15) - H*.06, ly = H*.44; ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.08, '#ffb060', .2*fl); ctx.globalCompositeOperation = 'source-over'; } // the tailboard lamps breathing
    drawFigure(ctx, 'b5_c1_tilewoman', W*.62, H*.66, 1.05, t, {dir:-1, still:true}); drawFigure(ctx, 'b5_c1_clerk', W*.74, H*.64, 1, t, {dir:-1, phase:2});
    const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.08 + i*Math.min(.055, .3/sq.length)), H*.96 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
    vign(ctx, W, H, .68, .5); return; }
  ctx.drawImage(sceneLayer('b92:drill', W, H, (x, W, H) => { const hz = b92aPlain(x, W, H, 'day', true);
    for (let i = 0; i < 8; i++) b92aWagon(x, W*(.46 + i*.07), hz + H*.04, H/(420 - i*10), 'day', false); // the train, behind
    x.fillStyle = 'rgba(120,100,70,.25)'; x.beginPath(); x.ellipse(W*.5, H*.74, W*.46, H*.14, 0, 0, 7); x.fill(); // the beaten square
    b92aBlock(x, W*.26, hz + H*.14, H/150, 4, 10); b92aBlock(x, W*.56, hz + H*.13, H/160, 4, 10); b92aBlock(x, W*.84, hz + H*.15, H/150, 3, 8);
    x.fillStyle = '#4a3420'; x.fillRect(W*.12, H*.7, W*.06, H*.012); for (let i = 0; i < 6; i++) B2F.line(x, '#6a5034', 1.4, [[W*(.125 + i*.009), H*.7], [W*(.13 + i*.009), H*.62]]); }), 0, 0, W, H); // a rack of wooden swords
  for (let i = 0; i < 6; i++) { const k = ((t/9000*mo + i/6) % 1); ctx.fillStyle = `rgba(200,180,140,${(.12*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.2 + i*.12) + k*W*.05, H*.72 - k*H*.1, W*.08*(1 + k), H*.03*(1 + k), 0, 0, 7); ctx.fill(); } // dust off the square
  const sx = W*(.4 + (mo ? Math.sin(t/4200)*.08 : 0)); drawFigure(ctx, 'b7_malsgt', sx, H*.78, 1.3, t, {dir:mo && Math.cos(t/4200) < 0 ? -1 : 1, phase:1}); // the Malazan sergeant walking the front rank
  [[.62, -1, 2], [.7, -1, 3]].forEach(([u, d, p]) => drawFigure(ctx, 'b2soldier', W*u, H*.8, 1.2, t, {dir:d, phase:p}));
  ctx.fillStyle = 'rgba(220,200,160,.07)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.05 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* the supply train by day: wagons in a line going back further than the eye goes, water barrels lashed three high, oxen being walked up,
   clerks at the tailboards. The city is drawn only while the escort is still outside Letheras (Ch 1–2). */
SCENEX.b9_wagons = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, city = !!(S && S.book === 'dod' && (S.chapter || 0) <= 2);
  ctx.drawImage(sceneLayer('b92:train' + (city ? 'c' : ''), W, H, (x, W, H) => { const hz = b92aPlain(x, W, H, 'day', city);
    for (let i = 13; i >= 0; i--) { const k = i/13, cx = W*(.96 - k*.7), cy = hz + H*(.36 - Math.pow(k, .7)*.32), s = H/(110 + k*380);
      if (i % 4 === 1) b92aBarrels(x, cx, cy, s, 'day'); else b92aWagon(x, cx, cy, s, 'day', false); }
    for (let i = 0; i < 9; i++) b92aOx(x, W*(.1 + i*.05), hz + H*(.3 + (i % 2)*.03), H/150, ['#5a3e26', '#6a4a2e', '#4a3420'][i % 3], 1); // a file of oxen walked up
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(210,190,150,${(.05 + hash(i, 9231)*.08).toFixed(2)})`; x.fillRect(hash(i, 9232)*W, hz + hash(i, 9233)*(H - hz), 2, 1); } }), 0, 0, W, H);
  drawFigure(ctx, 'b5_c1_clerk', W*.72, H*.82, 1.25, t, {dir:-1, phase:1}); drawFigure(ctx, 'b5_letherii', W*.84, H*.8, 1.2, t, {dir:-1, phase:3}); // a clerk with a tally; a carter with a sack
  if (S && S.book === 'dod' && S.chapter === 2) drawFigure(ctx, 'b9_c2_orla', W*.6, H*.84, 1.25, t, {dir:-1, phase:4});
  for (let i = 0; i < 4; i++) { const k = ((t/11000*mo + i/4) % 1); ctx.fillStyle = `rgba(210,190,150,${(.1*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.2 + i*.2) - k*W*.06, H*.7 - k*H*.08, W*.1*(1 + k), H*.03*(1 + k), 0, 0, 7); ctx.fill(); } // the train's dust
  ctx.fillStyle = 'rgba(220,200,160,.06)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .55, .5); };

/* the train's yard at night: wagons in rows with their tilts dark, oxen on the picket, barrels lashed three high, one lamp at Yelt's
   tailboard. Before the thieves are dealt with, three dark shapes at the far water wagon. */
SCENEX.b9_c2_yardnight = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), f = (S && S.f) || {};
  ctx.drawImage(sceneLayer('b92:yard', W, H, (x, W, H) => { const hz = b92aPlain(x, W, H, 'night', true);
    ell(x, W*.8, H*.12, 7, 7, 'rgba(230,232,240,.8)'); glow(x, W*.8, H*.12, H*.2, '#c8d0e8', .1); // the moon
    for (let i = 0; i < 6; i++) b92aWagon(x, W*(.1 + i*.16), hz + H*.08, H/300, 'night', false); // the far row
    b92aBarrels(x, W*.84, hz + H*.2, H/190, 'night');
    for (let i = 0; i < 5; i++) b92aOx(x, W*(.08 + i*.06), hz + H*.3, H/160, '#14120e', 1);
    b92aWagon(x, W*.5, hz + H*.36, H/150, 'night', false); b92aWagon(x, W*.16, hz + H*.42, H/120, 'night', false); }), 0, 0, W, H); // the near row
  const lx = W*.62, ly = H*.66; ctx.fillStyle = `rgba(255,190,110,${(.9*fl).toFixed(2)})`; ctx.fillRect(lx, ly, 4, 5); ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx + 2, ly + 3, H*.3, '#ffb060', .22*fl); ctx.globalCompositeOperation = 'source-over'; // Yelt's lamp
  drawFigure(ctx, 'b5_c1_clerk', W*.66, H*.8, 1.15, t, {dir:-1, phase:2});
  if (!f.b9_c2_wagonsDone) [[.82, -1], [.87, 1], [.9, -1]].forEach(([u, d], i) => drawFigure(ctx, 'b5_letherii', W*u, H*.66, .9, t, {dir:d, phase:i + 3, alpha:.75})); // shapes at the barrels
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.04 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.6, t, {phase:i, dir:1}));
  vign(ctx, W, H, .78, .52); };

/* the road east at first light: the landward gate and the city behind (left), the escort's files and wagons going out along the road,
   and far ahead, east, the Malazans' dust standing up over the road in the morning */
SCENEX.b9_c2_road = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b92:road', W, H, (x, W, H) => { const hz = b92aPlain(x, W, H, 'dawn', true);
    x.fillStyle = '#3a3238'; x.fillRect(W*.02, hz - H*.13, W*.1, H*.13); x.fillStyle = '#1a141a'; x.beginPath(); x.moveTo(W*.05, hz); x.lineTo(W*.05, hz - H*.07); x.quadraticCurveTo(W*.07, hz - H*.1, W*.09, hz - H*.07); x.lineTo(W*.09, hz); x.fill(); // the landward gate
    x.fillStyle = 'rgba(140,116,84,.6)'; x.beginPath(); x.moveTo(W*.08, hz + 1); x.lineTo(W*.86, hz - 1); x.lineTo(W*.9, hz + 2); x.lineTo(W*.6, H); x.lineTo(W*.22, H); x.closePath(); x.fill(); // the road, east
    for (let i = 0; i < 9; i++) { const k = i/8, cx = W*(.88 - k*.02), cy = hz - H*(.02 + k*.04); x.fillStyle = `rgba(200,170,120,${(.32 - k*.03).toFixed(2)})`; x.beginPath(); x.ellipse(cx - k*W*.06, cy, W*(.06 + k*.06), H*(.03 + k*.012), 0, 0, 7); x.fill(); } // the foreigners' dust, far ahead
    for (let i = 0; i < 30; i++) { const k = i/29, px = W*(.3 + k*.5), py = hz + H*(.22 - k*.2), s = H/(140 + k*500);
      if (i % 6 === 2) b92aWagon(x, px, py, s*1.1, 'dawn', false);
      else for (let j = -1; j <= 1; j++) { x.fillStyle = '#2a2018'; x.fillRect(px + j*3*s - .8*s, py - 6*s, 1.6*s, 6*s); ell(x, px + j*3*s, py - 7*s, .9*s, .9*s, '#2a2018'); } } }), 0, 0, W, H); // the escort going out in files
  for (let i = 0; i < 20; i++) { const k = ((t/8000*mo + hash(i, 9241)) % 1); ctx.fillStyle = `rgba(240,216,168,${(.5*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9242)*.6) + k*W*.1, H*(.6 + hash(i, 9243)*.3) - k*H*.08, 1.4, 1.4); } // motes in the low light
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.18 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* ---------------- the ground ---------------- */
/* Book Five's lines (86b) with Book Nine's dust over the grass, and the train's pieces: wagons, barrels, oxen, the water-cart, a tailboard
   with a lamp, a rack of wooden swords, the drill post, a rail fence, a track off the ground */
function b92aDust(ctx, x, y, T, dark){ ctx.fillStyle = dark ? 'rgba(60,50,40,.22)' : 'rgba(190,160,110,.26)'; ctx.fillRect(x*T, y*T, T, T); }
TILEX.b9_c2_muster = (ctx, ch, x, y, T, dark) => { const base = TILEX.b5_c6_lines; if (!base) return;
  if (ch === '=' || ch === ',' || ch === '.' || ch === 'F') { base(ctx, ch, x, y, T, dark); if (ch !== '=' && ch !== 'F') b92aDust(ctx, x, y, T, dark); return; }
  base(ctx, '.', x, y, T, dark); b92aDust(ctx, x, y, T, dark);
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, N = !!dark;
    if (ch === '#') { ctx.fillStyle = N ? '#2a2016' : '#6a5034'; ctx.fillRect(px, py + T*.36, T, T*.08); ctx.fillRect(px, py + T*.62, T, T*.08); ctx.fillRect(px + T*.42, py + T*.24, T*.12, T*.66); ell(ctx, px + T*.5, py + T*.92, T*.4, T*.06, 'rgba(0,0,0,.35)'); return; } // a rail fence
    if (ch === '<' || ch === '>') { ctx.fillStyle = N ? 'rgba(90,80,60,.4)' : 'rgba(160,140,100,.55)'; ctx.fillRect(px, py + T*.3, T, T*.4); return; } // a track off the ground
    ell(ctx, px + T*.5, py + T*.9, T*.46, T*.09, 'rgba(0,0,0,.45)');
    if (ch === 'w' || ch === 'T') { ctx.fillStyle = N ? '#2e2a24' : '#c8b896'; ctx.beginPath(); ctx.moveTo(px + T*.06, py + T*.5); ctx.quadraticCurveTo(px + T*.5, py + T*.02, px + T*.94, py + T*.5); ctx.closePath(); ctx.fill(); // the tilt
      ctx.fillStyle = N ? '#1e160e' : '#5a4430'; ctx.fillRect(px + T*.04, py + T*.5, T*.92, T*.2); ctx.fillStyle = 'rgba(230,220,200,.5)'; if (!N) ctx.fillRect(px + T*.4, py + T*.54, T*.16, T*.08); // the bed, a chalked number
      [.24, .76].forEach(k => { ctx.strokeStyle = N ? '#0c0a08' : '#3a2a1a'; ctx.lineWidth = Math.max(1, T*.05); ctx.beginPath(); ctx.arc(px + T*k, py + T*.78, T*.13, 0, 7); ctx.stroke(); });
      if (ch === 'T') { ctx.fillStyle = 'rgba(255,196,112,.95)'; ctx.fillRect(px + T*.86, py + T*.36, T*.08, T*.1); glow(ctx, px + T*.9, py + T*.4, T*.8, '#ffb060', N ? .35 : .15); } return; } // the tailboard's lamp
    if (ch === 'o') { [[.26, .6], [.74, .6], [.5, .32]].forEach(([a, b]) => { ell(ctx, px + T*a, py + T*b, T*.2, T*.16, N ? '#2a2016' : '#7a5a38'); ctx.fillStyle = N ? '#14100c' : '#3a2a1a'; ctx.fillRect(px + T*(a - .2), py + T*(b - .04), T*.4, Math.max(1, T*.03)); }); return; } // barrels lashed
    if (ch === 'x') { const col = N ? '#16120e' : ['#5a3e26', '#6a4a2e', '#4a3420'][Math.floor(hash(x, y, 9251)*3)];
      ctx.strokeStyle = N ? 'rgba(150,130,100,.5)' : 'rgba(110,86,56,.8)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.lineTo(px + T, py + T*.3); ctx.stroke(); // the picket line
      b92aOx(ctx, px + T*.56, py + T*.86, T/26, col, hash(x, y, 9252) > .5 ? 1 : -1); return; }
    if (ch === 'c') { ctx.fillStyle = N ? '#1e160e' : '#5a4228'; ctx.fillRect(px + T*.14, py + T*.5, T*.64, T*.14); B2F.line(ctx, ctx.fillStyle, Math.max(1, T*.05), [[px + T*.78, py + T*.58], [px + T*.98, py + T*.68]]);
      ell(ctx, px + T*.46, py + T*.4, T*.28, T*.18, N ? '#2a2016' : '#7a5a38'); ctx.fillStyle = N ? '#14100c' : '#3a2a1a'; ctx.fillRect(px + T*.2, py + T*.38, T*.52, Math.max(1, T*.03));
      ctx.strokeStyle = N ? '#0c0a08' : '#3a2a1a'; ctx.lineWidth = Math.max(1, T*.05); ctx.beginPath(); ctx.arc(px + T*.46, py + T*.74, T*.14, 0, 7); ctx.stroke(); return; } // the water-cart
    if (ch === 'r') { ctx.fillStyle = N ? '#2a1e12' : '#4a3420'; ctx.fillRect(px + T*.08, py + T*.66, T*.84, T*.08); ctx.fillRect(px + T*.12, py + T*.3, T*.06, T*.44); ctx.fillRect(px + T*.82, py + T*.3, T*.06, T*.44);
      for (let i = 0; i < 6; i++) B2F.line(ctx, N ? '#3a2a1a' : '#8a6a44', Math.max(1, T*.04), [[px + T*(.22 + i*.11), py + T*.68], [px + T*(.24 + i*.11), py + T*.16]]); return; } // a rack of wooden swords
    if (ch === 'P') { ctx.fillStyle = N ? '#2a1e12' : '#5a4228'; ctx.fillRect(px + T*.44, py + T*.1, T*.12, T*.78); ctx.fillStyle = N ? '#3a2a1a' : '#8a6a44'; ctx.fillRect(px + T*.3, py + T*.2, T*.4, T*.06); return; } // the drill post
  }); };
/* low cover ('t') on this chapter's ground: water barrels, lashed */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b9_c2_muster') { const px = x*T, py = y*T; ell(ctx, px + T*.5, py + T*.88, T*.42, T*.1, 'rgba(0,0,0,.5)');
      [[.3, .62], [.7, .62], [.5, .36]].forEach(([a, b]) => { ell(ctx, px + T*a, py + T*b, T*.2, T*.17, dark ? '#2e2216' : '#7a5a38'); ctx.fillStyle = dark ? '#14100c' : '#3a2a1a'; ctx.fillRect(px + T*(a - .2), py + T*(b - .05), T*.4, Math.max(1, T*.03)); ctx.fillRect(px + T*(a - .2), py + T*(b + .05), T*.4, Math.max(1, T*.03)); });
      ctx.strokeStyle = dark ? 'rgba(120,110,90,.4)' : 'rgba(190,170,130,.6)'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(px + T*.12, py + T*.7); ctx.lineTo(px + T*.5, py + T*.2); ctx.lineTo(px + T*.88, py + T*.7); ctx.stroke(); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Nine's ground: dusk dust-brown, a low warm rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".42" cy=".44" r=".8"><stop offset="0" stop-color="#4a3c2c"/><stop offset=".6" stop-color="#2a2016"/><stop offset="1" stop-color="#140f0a"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a carter's coat: a long coat of oiled canvas laid over a tailboard, quilted, iron studs at the shoulders, a deep tally pocket, the warm
     light along its left edge */
  ART['item/b9_c2_carterscoat'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A carter's coat">${bg('b92cc')}
<linearGradient id="b92cc-c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a8a6a"/><stop offset=".55" stop-color="#6a5c44"/><stop offset="1" stop-color="#2e261c"/></linearGradient>
<pattern id="b92cc-q" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10 L10 0" stroke="#3a3024" stroke-width=".8" opacity=".5"/></pattern></defs>
<rect width="200" height="150" fill="url(#b92cc-bg)"/><rect x="18" y="120" width="164" height="12" fill="#3a2a1a" stroke="#140f0a"/><ellipse cx="100" cy="120" rx="76" ry="7" fill="url(#b92cc-sh)"/>
<path d="M70 20 L130 20 L146 34 L156 118 L104 118 L100 46 L96 118 L44 118 L54 34 Z" fill="url(#b92cc-c)" stroke="#140f0a" stroke-width="1.6"/>
<path d="M70 20 L130 20 L146 34 L156 118 L104 118 L100 46 L96 118 L44 118 L54 34 Z" fill="url(#b92cc-q)"/>
<path d="M54 34 L36 70 L46 76 L60 46 Z M146 34 L164 70 L154 76 L140 46 Z" fill="url(#b92cc-c)" stroke="#140f0a" stroke-width="1.4"/>
<path d="M84 20 Q100 34 116 20" fill="none" stroke="#2a2016" stroke-width="3"/>
<g fill="#c8c4b8">${[[60,30],[66,28],[72,26],[128,26],[134,28],[140,30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2"/>`).join('')}</g>
<rect x="112" y="76" width="26" height="20" rx="2" fill="#4a3c2c" stroke="#140f0a"/><rect x="118" y="70" width="4" height="12" fill="#c8b890" stroke="#2a2016" stroke-width=".6"/>
<path d="M45 116 L55 36" stroke="#f0c888" stroke-width="1.2" opacity=".45"/><ellipse cx="96" cy="70" rx="60" ry="44" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c2_carterscoat'] = [200, 150];
  /* Yelt's spare tally: a stick of pale ash notched in a small exact hand, lying across the open ration book, a stub of charcoal */
  ART['item/b9_c2_tallystick'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="Yelt's spare tally">${bg('b92ts')}
<linearGradient id="b92ts-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8dcc0"/><stop offset=".6" stop-color="#b8a882"/><stop offset="1" stop-color="#6a5e46"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b92ts-bg)"/><ellipse cx="100" cy="118" rx="74" ry="8" fill="url(#b92ts-sh)"/>
<path d="M30 100 L100 92 L170 100 L170 116 L100 108 L30 116 Z" fill="#3a2e22" stroke="#140f0a"/>
<path d="M34 98 L100 90 L100 106 L34 112 Z" fill="#cfc4a8" stroke="#2a2016" stroke-width=".8"/><path d="M100 90 L166 98 L166 112 L100 106 Z" fill="#bfb498" stroke="#2a2016" stroke-width=".8"/>
<g stroke="#5a5040" stroke-width=".6" opacity=".7">${[0,1,2,3,4].map(i => `<path d="M42 ${100 + i*2.4} L92 ${94 + i*2.4}"/><path d="M108 ${95 + i*2.4} L158 ${101 + i*2.4}"/>`).join('')}</g>
<g transform="rotate(-14 100 70)"><rect x="34" y="62" width="132" height="12" rx="3" fill="url(#b92ts-w)" stroke="#2a2016" stroke-width="1.2"/>
<g stroke="#3a2e22" stroke-width="1.4">${Array.from({length:18}, (_, i) => `<path d="M${44 + i*6.6} 62 L${44 + i*6.6} ${i % 5 === 4 ? 70 : 67}"/>`).join('')}</g>
<path d="M36 63 L164 63" stroke="#fff4dc" stroke-width="1" opacity=".55"/></g>
<rect x="138" y="112" width="22" height="5" rx="2" transform="rotate(10 149 114)" fill="#1a1612"/>
<ellipse cx="100" cy="76" rx="62" ry="34" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c2_tallystick'] = [200, 150];
  /* an escort spear: a long ash shaft with a leaf head and a butt-spike, lying diagonally across the frame on dry grass, unstamped socket */
  ART['item/b9_c2_escortspear'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="An escort spear">${bg('b92es')}
<linearGradient id="b92es-h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8d0c0"/><stop offset=".5" stop-color="#7a766c"/><stop offset="1" stop-color="#2a2824"/></linearGradient>
<linearGradient id="b92es-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a878"/><stop offset="1" stop-color="#6a5034"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b92es-bg)"/><path d="M0 118 L200 110 L200 150 L0 150 Z" fill="#2a2016"/>
<g stroke="#8a7a4a" stroke-width="1" opacity=".5">${Array.from({length:16}, (_, i) => `<path d="M${8 + i*12} ${130 - (i % 3)*3} l2 -${10 + (i % 4)*3}"/>`).join('')}</g>
<ellipse cx="100" cy="116" rx="80" ry="7" fill="url(#b92es-sh)"/>
<path d="M20 124 L164 36" stroke="url(#b92es-s)" stroke-width="5" stroke-linecap="round"/><path d="M22 122 L162 37" stroke="#f0d8a8" stroke-width="1" opacity=".5"/>
<path d="M160 40 L170 26 L186 12 L176 32 L168 44 Z" fill="url(#b92es-h)" stroke="#140f0a" stroke-width="1.2"/><path d="M168 36 L184 14" stroke="#2a2824" stroke-width=".8"/>
<rect x="154" y="38" width="12" height="8" rx="2" transform="rotate(-31 160 42)" fill="#4a4844" stroke="#140f0a"/>
<path d="M22 122 L12 132 L18 128 Z" fill="#5a5850" stroke="#140f0a"/>
<path d="M40 113 L46 110 M44 115 L50 112" stroke="#3a2a1a" stroke-width="1.6"/>
<ellipse cx="110" cy="76" rx="70" ry="30" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c2_escortspear'] = [200, 150];
}
