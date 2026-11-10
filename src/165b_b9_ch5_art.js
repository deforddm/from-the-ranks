/* ============ Book Nine, Chapter 5 art: Short Rations — a dry camp under the stars, the noon halt on open country, a dry wash with a
   dead sutler's cart, and first light with dust on the horizon ============ */
/* Book Nine's look (160b) deep in the Wastes: bone-pale grass and long low backs of bare stone under a sky too big for them; a slate-blue
   night with too many stars and the dung-fires low; a hard noon; a grey-gold first light. Shared pieces borrowed from the earlier chapters'
   art, by calling them: Ch 3's land, column and horses (b93aLand, b93aColumn, b93aHorse), Ch 2's wagons, barrels and tents (b92aWagon,
   b92aBarrels, b92aTent), Ch 4's crates, cairn and dung-fire (b94aCrates, b94aCairn, b94aFire) and its ground (TILEX.b9_c4_wastes).
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     tegra   (replaces 160's simple sprite) the Barghast guide: painted hide over a quilted shirt, two white bars under the eyes, the long
             braid over the left shoulder, the string of small bones at the throat, one throwing-axe held low in the near hand and the
             other in the belt, a gourd on a thong; 160b's bust kept
   Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b9_wastes_night  the column's camp on open ground at night: too many stars, tents in rows, the wagons drawn in, the column's fires
                      going away for a league, the Third's dung-fire; in Ch 5 Harro's wagon, the guides' fire at the edge with Tegra at
                      it until she walks (and while she waits), the old marine at his own small fire
     b9_dust          first light: a grey-gold sky, the column forming on its track with its own dust going up, and far off at the
                      bottom of the sky a low brown smear that is not the column's; in Ch 5 Tegra on a back of stone looking at it
     b9_c5_plain      the noon halt: the column drawn up along its track, the sappers' wagons apart, a lone rider far out east on a rise
                      (and, once he has been seen, a second rider with him coming back); the old bull out south until it is dealt with
     b9_c5_wash       a dry wash: grey stone banks, a pale sandy bed, the sutler's blue cart on its side with a wheel lying flat, the
                      shade under the south bank (a cairn with a hat on it once it is built), the hole where the water came up, dogs up
                      the wash, men on the lip before the fight, the heavy with his yoke of skins
   Ground (TILEX): b9_c5_wastes (Ch 4's b9_c4_wastes underneath; 'K' the sutler's cart on its side, 'd' the wash's sandy bed; '#' drawn as
   bare stone). Battle 't' on this ground: a boulder. The gear in the series' 200×150 item style, on Book Nine's ground: dusk dust-brown
   (#4a3c2c → #140f0a), a low warm rim light. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Tegra: twenty-nine, a Barghast woman, lean and strong; painted hide over a quilted shirt, the paint in red and bone-white strokes; two
     white bars under the eyes; dark hair in a long braid over the left shoulder; small bones strung at the throat; a throwing-axe held low
     in the near hand, the other in the belt; a gourd on a thong at the far hip; soft hide boots */
  tegra(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1.02); const sw = o.still ? 0 : Math.sin(t/520 + (o.phase || 0));
    ell(ctx, 7.8, 5.4, 2, 2.6, '#8a7040'); ell(ctx, 7.4, 4.6, .8, 1, 'rgba(255,230,180,.35)'); B2F.line(ctx, '#3a2a18', .5, [[7.8, 2.8], [6.4, 1.2]]); // the gourd at the far hip
    h.legs('#3a2e22'); ctx.fillStyle = '#4a3624'; ctx.fillRect(-4.4, 9, 3.4, 4); ctx.fillRect(1, 9, 3.4, 4); // soft hide boots
    poly(ctx, [[-6.2,-6],[6.2,-6],[6.8 + sw*.2,9.6],[-6.8 + sw*.2,9.6]], h.armor('#8a7454', '#2e2418')); // the painted hide
    ctx.strokeStyle = 'rgba(200,80,50,.7)'; ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(-5, -2.4); ctx.lineTo(-1, -3.6); ctx.moveTo(1.6, 4.6); ctx.lineTo(5.4, 3.4); ctx.stroke(); // red strokes
    ctx.strokeStyle = 'rgba(232,222,192,.7)'; ctx.beginPath(); ctx.moveTo(-4.6, 1.2); ctx.lineTo(-.6, 0); ctx.moveTo(1.4, -3.4); ctx.lineTo(5, -4.4); ctx.stroke(); // bone-white strokes
    ctx.fillStyle = '#6a5a44'; ctx.fillRect(-6.4, -6.6, 12.8, 1.4); // the quilted shirt's collar under the hide
    ctx.fillStyle = '#2a1e12'; ctx.fillRect(-6.6, 2.6, 13.2, 1.3); // the belt
    B2F.line(ctx, '#4a3420', 1.2, [[3, 3.2], [4.2, 9]]); poly(ctx, [[3.2,2.2],[6,1.4],[5.6,4.6]], '#7a7a7a'); // the belted axe, head up
    B2F.line(ctx, '#4a3420', 1.3, [[-7.2, -1], [-8.4, 7.4]]); poly(ctx, [[-9.8,6.6],[-6.8,7],[-7.6,10.4],[-10.2,9.6]], '#8a8a8a'); ctx.fillStyle = 'rgba(255,240,220,.5)'; ctx.fillRect(-9.8, 6.8, .6, 2.6); // the near axe, held low
    ctx.fillStyle = '#a07a5a'; ctx.fillRect(-8, -2.6, 2, 2.2); // the near hand on its haft
    ctx.fillStyle = 'rgba(230,200,150,.15)'; ctx.fillRect(-6.2, -5.6, 1.2, 14); // the low warm light on the lit edge
    for (let i = 0; i < 7; i++) ell(ctx, -3 + i, -6 + Math.abs(i - 3)*.25, .45, .75, '#e8dcc0'); // the small bones at the throat
    h.head('#a07a5a', 4.3, -11.4); h.look('rgba(20,12,10,.85)', -11.6);
    ctx.fillStyle = 'rgba(240,236,220,.9)'; [-1, 1].forEach(sd => { ctx.fillRect(sd*1.9 - .9, -10.4, 1.8, .45); ctx.fillRect(sd*1.9 - .9, -9.6, 1.8, .45); }); // two white bars under each eye
    ctx.fillStyle = '#140e08'; ctx.beginPath(); ctx.arc(0, -12.8, 4.5, Math.PI*1.02, Math.PI*1.98); ctx.fill(); // dark hair, drawn back
    B2F.line(ctx, '#140e08', 1.8, [[-3.8, -11], [-5.6, -6], [-5, 1]]); for (let i = 0; i < 4; i++) ell(ctx, -5.4 + i*.1, -6.4 + i*1.9, 1.1, .8, '#2a1e14'); // the braid over the left shoulder
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* a dung-fire with a ring of stones round it */
function b95aRing(x, fx, fy, s, N){ for (let i = 0; i < 9; i++) { const a = i/9*Math.PI*2; ell(x, fx + Math.cos(a)*9*s, fy + Math.sin(a)*2.8*s, 1.8*s, 1.2*s, N ? '#2a2622' : '#7a7266'); } }
/* a sutler's mule-cart on its side, Kartool blue gone grey: the bed up on edge, one wheel still on its axle-stub, the other lying flat */
function b95aWreck(x, cx, cy, s, N){ ell(x, cx, cy + 2*s, 26*s, 4*s, 'rgba(0,0,0,.4)');
  x.fillStyle = N ? '#1a2028' : '#4a6a84'; x.save(); x.translate(cx, cy); x.rotate(-.18); x.fillRect(-20*s, -14*s, 34*s, 12*s); // the bed on edge
  x.fillStyle = N ? '#10141a' : '#36506a'; for (let i = 0; i < 4; i++) x.fillRect(-20*s + i*9*s, -14*s, 1.2*s, 12*s); // its boards
  x.fillStyle = 'rgba(255,240,220,.14)'; x.fillRect(-20*s, -14*s, 34*s, 1.4*s); x.restore();
  x.strokeStyle = N ? '#0c0a08' : '#2a1e12'; x.lineWidth = 1.6*s; x.beginPath(); x.arc(cx + 10*s, cy - 16*s, 6.4*s, 0, 7); x.stroke(); // the wheel still on, up in the air
  for (let i = 0; i < 6; i++) { const a = i/6*Math.PI; x.beginPath(); x.moveTo(cx + 10*s - Math.cos(a)*6*s, cy - 16*s - Math.sin(a)*6*s); x.lineTo(cx + 10*s + Math.cos(a)*6*s, cy - 16*s + Math.sin(a)*6*s); x.stroke(); }
  x.beginPath(); x.ellipse(cx - 24*s, cy + 1*s, 7*s, 1.8*s, 0, 0, 7); x.stroke(); // the other wheel, lying flat in the sand
  B2F.line(x, N ? '#1a140e' : '#5a4228', 1.4*s, [[cx - 14*s, cy - 2*s], [cx - 30*s, cy - 10*s]]); // a shaft
  [[-6, '#c8b890'], [2, '#7a6a5a'], [8, '#8a5a3a']].forEach(([d, c]) => ell(x, cx + d*s, cy + 3*s, 2.6*s, 1.4*s, N ? '#2a2420' : c)); } // the strewn load
/* the column's camp at night, far: tents in rows, wagons, a line of small fires going away east */
function b95aCamp(x, W, H, hz, n){ for (let i = 0; i < n; i++) { x.fillStyle = `rgba(255,140,60,${(.3 + hash(i, 9521)*.35).toFixed(2)})`; x.fillRect(W*(.08 + i*.84/n), hz - H*(.002 + hash(i, 9522)*.008), 1.4, 1.4); }
  for (let i = 0; i < 6; i++) b92aTent(x, W*(.1 + i*.14), hz + H*(.06 + (i % 2)*.02), H/260, 'night');
  for (let i = 0; i < 3; i++) b92aWagon(x, W*(.62 + i*.1), hz + H*.1, H/240, 'night', false); }

/* ---------------- the backdrops ---------------- */
/* the column's camp on open ground at night, deep in the Wastes: too many stars, the column's fires going away for a league, tents and
   wagons dark, and the Third's dung-fire in its ring of stones. In Ch 5 Harro's wagon by the ration wagons, the guides' fire at the camp's
   edge (right) with Tegra at it until she walks, and the old marine at his own small fire. */
SCENEX.b9_wastes_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), c5 = !!(S && S.book === 'dod' && S.chapter === 5), f = (S && S.f) || {};
  ctx.drawImage(sceneLayer('b95:night' + (c5 ? '5' : ''), W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'night', false);
    for (let i = 0; i < 90; i++) { x.fillStyle = `rgba(230,234,255,${(.12 + hash(i, 9511)*.5).toFixed(2)})`; const r = hash(i, 9512) > .92 ? 1.6 : 1; x.fillRect(hash(i, 9513)*W, Math.pow(hash(i, 9514), 1.3)*hz*.92, r, r); } // too many stars
    x.fillStyle = 'rgba(200,210,240,.05)'; x.beginPath(); x.ellipse(W*.6, hz*.4, W*.6, hz*.12, -.35, 0, 7); x.fill(); // the long smear of the sky's river
    for (let i = 0; i < 8; i++) ell(x, W*hash(i, 9515), hz + H*(.05 + hash(i, 9516)*.3), W*(.03 + hash(i, 9517)*.05), H*.008, 'rgba(60,62,70,.5)'); // backs of bare stone
    b95aCamp(x, W, H, hz, 14);
    if (c5) { b92aWagon(x, W*.56, hz + H*.22, H/170, 'night', false); [[.5, '#3a2a1a'], [.56, '#2a3020'], [.62, '#3a2a1a']].forEach(([u, c]) => ell(x, W*u, hz + H*.16, 2, 2, c)); // Harro's wagon, its pots
      b92aBarrels(x, W*.18, hz + H*.24, H/190, 'night'); } }), 0, 0, W, H);
  const hz = H*.44;
  b95aRing(ctx, W*.4, H*.86, H/240, true); b94aFire(ctx, W*.4, H*.86, fl, 1.15); // the Third's dung-fire
  for (let i = 0; i < 3; i++) { const k = ((t/6400*mo + i/3) % 1); ctx.fillStyle = `rgba(170,170,180,${(.12*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*.4 + Math.sin(k*5 + i)*4, H*.8 - k*H*.26, 4 + k*10, 3 + k*6, 0, 0, 7); ctx.fill(); } // dung-smoke going up
  if (c5) { b94aFire(ctx, W*.88, hz + H*.3, b2Fl(t + 900), .55); // the guides' fire at the camp's edge
    if (!b9In('tegra')) drawFigure(ctx, 'tegra', W*.9, hz + H*.36, .95, t, {dir:-1, phase:4, still:f.b9_tegraDone == null});
    b94aFire(ctx, W*.72, H*.74, b2Fl(t + 400), .6); drawFigure(ctx, 'b2soldier', W*.75, H*.76, 1.05, t, {dir:-1, still:true}); // the old marine at his own small fire
    if ((f.b9_c5_ph || 1) === 1 && !f.b9_c5_orders1) drawFigure(ctx, 'b9_c1_thallo', W*.62, H*.7, 1.1, t, {dir:-1, phase:2}); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.6, t, {phase:i, dir:1}));
  vign(ctx, W, H, .82, .52); };

/* first light on the Wastes: a grey-gold sky, the column forming on its track with its own dust going up, and far off along the bottom of
   the sky to the south-east (right) a low brown smear of dust that is not the column's, breathing very slowly. In Ch 5 Tegra on a back of
   stone looking at it, once she walks. */
SCENEX.b9_dust = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, c5 = !!(S && S.book === 'dod' && S.chapter === 5);
  ctx.drawImage(sceneLayer('b95:dust', W, H, (x, W, H) => { const hz = H*.46;
    x.fillStyle = vgrad(x, 0, hz, [[0,'#4a4c58'],[.5,'#8a8278'],[.85,'#c8a878'],[1,'#e0bc84']]); x.fillRect(0, 0, W, hz + 2); // first light, grey to gold
    glow(x, W*.22, hz, W*.5, '#f0c888', .3);
    for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(70,64,70,.22)'; x.beginPath(); x.ellipse(W*(.1 + i*.24), hz*(.3 + hash(i, 9531)*.3), W*.16, hz*.025, 0, 0, 7); x.fill(); } // thin high cloud
    x.fillStyle = vgrad(x, hz, H, [[0,'#8a7a5e'],[.5,'#6a5a42'],[1,'#3a2e20']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 110; i++) { const d = hash(i, 9532), yy = hz + Math.pow(d, .8)*(H - hz); x.fillStyle = `rgba(${170 + Math.round(d*40)},${150 + Math.round(d*30)},${110 + Math.round(d*20)},.18)`; x.fillRect(hash(i, 9533)*W, yy, 2 + d*9, 1); }
    for (let i = 0; i < 6; i++) ell(x, W*hash(i, 9534), hz + H*(.06 + hash(i, 9535)*.32), W*(.04 + hash(i, 9536)*.06), H*.01, 'rgba(90,82,70,.5)'); // backs of bare stone
    b93aColumn(x, W, H, hz, W*.34, 34, 'day'); }), 0, 0, W, H); // the column forming and going away east, its own dust over it
  const hz = H*.46, br = mo ? .5 + .5*Math.sin(t/4200) : .5;
  for (let i = 0; i < 9; i++) { const k = i/8; ctx.fillStyle = `rgba(122,92,62,${(.32 + br*.06 - k*.02).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.62 + k*.36), hz - H*(.004 + .012*Math.sin(k*3)), W*(.06 + k*.02), H*(.012 + .006*Math.sin(k*5 + 1)), 0, 0, 7); ctx.fill(); } // the far dust, low along the bottom of the sky
  ctx.fillStyle = 'rgba(122,92,62,.12)'; ctx.fillRect(W*.6, hz - H*.03, W*.4, H*.03);
  for (let i = 0; i < 12; i++) { const k = ((t/9000*mo + hash(i, 9537)) % 1); ctx.fillStyle = `rgba(240,216,168,${(.35*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9538)*.8) + k*W*.06, H*(.6 + hash(i, 9539)*.3) - k*H*.05, 1.3, 1.3); } // dust on the air
  if (c5 && b9In('tegra')) { ell(ctx, W*.84, H*.82, W*.08, H*.02, '#5a5044'); drawFigure(ctx, 'tegra', W*.84, H*.8, 1.3, t, {dir:1, still:true}); }
  const sq = marchOrder(sceneSquad()).filter(id => !(c5 && id === 'tegra')); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .46, .5); };

/* the noon halt on open country: the column drawn up along its track from near left to far right, wagons among the files, the sappers'
   wagons set apart with their canvas lashed down; far out east on a rise a lone rider with his back to the column (and, once he has been
   seen, a second rider beside him, both coming back); the old bull out south until it is dealt with */
SCENEX.b9_c5_plain = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {};
  ctx.drawImage(sceneLayer('b95:plain', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false);
    for (let i = 0; i < 9; i++) ell(x, W*hash(i, 9541), hz + H*(.03 + hash(i, 9542)*.4), W*(.03 + hash(i, 9543)*.06), H*(.006 + hash(i, 9544)*.01), 'rgba(116,106,90,.55)'); // backs of bare stone
    ell(x, W*.86, hz - H*.004, W*.07, H*.014, '#8a7a5c'); // the far rise
    x.fillStyle = 'rgba(176,154,114,.5)'; x.beginPath(); x.moveTo(0, hz + H*.34); x.lineTo(W, hz + H*.12); x.lineTo(W, hz + H*.15); x.lineTo(0, hz + H*.4); x.fill(); // the track
    for (let i = 0; i < 12; i++) { const k = i/11, cx = W*(.04 + k*.9), cy = hz + H*(.36 - k*.22), s = H/(140 + k*280);
      if (i % 3 === 1) b92aWagon(x, cx, cy, s, 'day', false); else { const hh = H*(.05 - k*.036); for (let j = -1; j <= 1; j++) { x.fillStyle = '#3a2e22'; x.fillRect(cx + j*hh*.7 - hh*.12, cy - hh*.7, hh*.24, hh*.7); ell(x, cx + j*hh*.7, cy - hh*.82, hh*.13, hh*.13, '#3a2e22'); } } } // the column halted, files sitting
    for (let i = 0; i < 2; i++) { const cx = W*(.26 + i*.08), cy = hz + H*.14, s = H/220; b92aWagon(x, cx, cy, s, 'day', false); x.fillStyle = 'rgba(120,110,90,.7)'; x.fillRect(cx - 12*s, cy - 15*s, 24*s, 2*s); } // the sappers' wagons, set apart, canvas lashed
    for (let i = 0; i < 7; i++) { const k = i/6; x.fillStyle = `rgba(206,184,140,${(.22 - k*.02).toFixed(2)})`; x.beginPath(); x.ellipse(W*(.96 - k*.03), hz - H*(.01 + k*.03), W*(.03 + k*.03), H*(.016 + k*.006), 0, 0, 7); x.fill(); } }), 0, 0, W, H); // the front of the column's dust, far east
  const hz = H*.44;
  if (!f.b9_c5_rise) b93aHorse(ctx, W*.86, hz - H*.012, H/520, '#2a2018', 1); // the lone rider, his back to the column
  else { const k = mo ? ((t/30000) % 1) : .4; [[0, '#2a2018'], [.015, '#3a2a1a']].forEach(([d, c]) => b93aHorse(ctx, W*(.84 - k*.06 + d), hz - H*.006 + k*H*.02, H/500, c, -1)); } // two riders, coming back
  if (!f.b9_c5_bullDone) drawFigure(ctx, 'b3_c2_bhederin', W*.84, H*.74, 1.05, t, {dir:-1, phase:3});
  for (let i = 0; i < 14; i++) { const k = ((t/9000*mo + hash(i, 9545)) % 1); ctx.fillStyle = `rgba(240,216,168,${(.4*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9546)*.8) + k*W*.08, H*(.55 + hash(i, 9547)*.35) - k*H*.06, 1.3, 1.3); } // dust on the air
  if (!f.b9_c5_orders2) drawFigure(ctx, 'b9_c1_thallo', W*.6, H*.8, 1.2, t, {dir:-1, phase:2});
  ctx.fillStyle = 'rgba(230,210,170,.07)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* a dry wash cut into the plain: grey stone banks falling to a pale sandy bed, the sutler's cart on its side in it with a wheel lying flat,
   the shade under the south bank (near, right) with a cairn and a hat once it is built, the hole where the water came up, dogs up the wash
   until they are dealt with, men on the north lip before the fight, and the heavy with his yoke of skins */
SCENEX.b9_c5_wash = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {};
  ctx.drawImage(sceneLayer('b95:wash', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false);
    x.fillStyle = vgrad(x, hz + H*.06, H*.6, [[0,'#8a7e6a'],[1,'#5a5040']]); x.beginPath(); x.moveTo(0, hz + H*.08); x.quadraticCurveTo(W*.5, hz + H*.04, W, hz + H*.07); x.lineTo(W, H*.58); x.quadraticCurveTo(W*.5, H*.64, 0, H*.6); x.closePath(); x.fill(); // the north bank, grey stone falling into the wash
    for (let i = 0; i < 26; i++) { x.fillStyle = `rgba(${60 + Math.round(hash(i, 9551)*30)},${56 + Math.round(hash(i, 9552)*26)},${50 + Math.round(hash(i, 9553)*20)},.45)`; x.fillRect(W*hash(i, 9554), hz + H*(.08 + hash(i, 9555)*.44), W*(.02 + hash(i, 9556)*.05), H*.006); } // its ledges
    x.fillStyle = vgrad(x, H*.58, H*.8, [[0,'#c8b896'],[1,'#a8946e']]); x.beginPath(); x.moveTo(0, H*.6); x.quadraticCurveTo(W*.5, H*.64, W, H*.58); x.lineTo(W, H*.82); x.quadraticCurveTo(W*.5, H*.86, 0, H*.8); x.closePath(); x.fill(); // the pale sandy bed
    for (let i = 0; i < 3; i++) { x.strokeStyle = 'rgba(120,104,76,.35)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, H*(.66 + i*.04)); x.quadraticCurveTo(W*.5, H*(.69 + i*.04), W, H*(.63 + i*.04)); x.stroke(); } // old tide-lines of grit
    b95aWreck(x, W*.44, H*.7, H/150, false);
    x.fillStyle = '#6a5c46'; x.beginPath(); x.moveTo(0, H*.8); x.quadraticCurveTo(W*.5, H*.86, W, H*.82); x.lineTo(W, H); x.lineTo(0, H); x.fill(); // the near (south) bank
    x.fillStyle = 'rgba(30,26,34,.35)'; x.beginPath(); x.moveTo(W*.66, H*.82); x.quadraticCurveTo(W*.84, H*.76, W, H*.78); x.lineTo(W, H*.86); x.quadraticCurveTo(W*.84, H*.86, W*.66, H*.84); x.fill(); }), 0, 0, W, H); // the shade under the south bank
  if (f.b9_c5_dug) { ell(ctx, W*.68, H*.72, W*.04, H*.012, '#4a3c2a'); if (f.b9_c5_dug === 'ok') { ell(ctx, W*.68, H*.718, W*.022, H*.005, 'rgba(130,140,140,.75)'); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fillRect(W*.665, H*.716, W*.01, 1); } } // the hole, water standing in it
  else ell(ctx, W*.68, H*.72, W*.035, H*.01, 'rgba(110,94,70,.6)'); // the darker sand
  if (f.b9_c5_cairn) { b94aCairn(ctx, W*.86, H*.82, H/220, false); ell(ctx, W*.86, H*.766, W*.024, H*.006, '#4a3a26'); ell(ctx, W*.86, H*.758, W*.01, H*.008, '#5a4630'); } // the cairn, the hat on it
  if (!f.b9_c5_dogsDone) [[.78, -1], [.82, 1], [.86, -1], [.9, 1]].forEach(([u, d], i) => drawFigure(ctx, 'b5_c7_greatwolf', W*u, H*.64, .62, t, {dir:d, phase:i, alpha:.92})); // dogs up the wash
  if (f.b9_c5_searched && !f.b9_c5_cacheDone) [['b5_letherii', .3], ['b5_letherii', .36], ['b6_bandit', .42], ['b6_bandit', .48], ['b5_letherii', .54]].forEach(([k, u], i) => drawFigure(ctx, k, W*u, H*.53, .8, t, {dir:1, phase:i + 2, alpha:.9})); // men on the north lip, against the sky
  drawFigure(ctx, 'b2soldier', W*.58, H*.8, 1.2, t, {dir:-1, still:true}); ctx.fillStyle = '#5a4430'; ctx.fillRect(W*.58 - H*.04, H*.8 - H*.13, H*.08, H*.008); [[-1], [1]].forEach(([d]) => ell(ctx, W*.58 + d*H*.04, H*.8 - H*.11, H*.012, H*.02, f.b9_c5_dug ? '#6a4a2a' : '#8a6a4a')); // Thallo's heavy and his yoke of skins
  for (let i = 0; i < 10; i++) { const k = ((t/8000*mo + hash(i, 9557)) % 1); ctx.fillStyle = `rgba(240,216,168,${(.35*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 9558)*.8) + k*W*.06, H*(.6 + hash(i, 9559)*.3) - k*H*.05, 1.3, 1.3); }
  ctx.fillStyle = 'rgba(230,210,170,.06)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.05, .26/sq.length)), H*.97 - (i % 2)*2, 1.6, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* ---------------- the ground ---------------- */
/* Ch 4's ground underneath (dry grass, the track, bare stone, tents, wagons, the ring's wagons, crates, a fire, a seep), and this chapter's
   pieces: the sutler's cart on its side, the wash's sandy bed; '#' (a battle's wall) as bare stone */
TILEX.b9_c5_wastes = (ctx, ch, x, y, T, dark) => { const base = TILEX.b9_c4_wastes; if (!base) return; const N = !!dark;
  if (ch === '#') return base(ctx, 'r', x, y, T, dark);
  if (ch !== 'K' && ch !== 'd') return base(ctx, ch, x, y, T, dark);
  const px = x*T, py = y*T;
  ctx.fillStyle = N ? '#2a2620' : '#c0ae8a'; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .12, '250,236,200', 1); // pale sand
  if (hash(x, y, 9561) > .7) { ctx.strokeStyle = N ? 'rgba(0,0,0,.2)' : 'rgba(130,112,80,.35)'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(px, py + T*.6); ctx.quadraticCurveTo(px + T*.5, py + T*.66, px + T, py + T*.58); ctx.stroke(); } // a tide-line of grit
  if (ch === 'd') return;
  b2Clip(ctx, x, y, T, () => { const left = !!(hash(x, y, 9562) > .5); b95aWreck(ctx, px + T*(left ? .62 : .38), py + T*.8, T/58, N); }); };
/* low cover ('t') on this chapter's ground: a boulder */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b9_c5_wastes') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.86, T*.44, T*.1, 'rgba(0,0,0,.45)');
      ell(ctx, px + T*.5, py + T*.6, T*.38, T*.3, N ? '#3a3632' : '#8a8274'); ell(ctx, px + T*.36, py + T*.66, T*.2, T*.16, N ? '#2e2a26' : '#7a7266');
      ctx.fillStyle = N ? 'rgba(200,200,220,.08)' : 'rgba(255,240,210,.22)'; ctx.fillRect(px + T*.24, py + T*.38, T*.34, T*.05); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Nine's ground: dusk dust-brown, a low warm rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".42" cy=".44" r=".8"><stop offset="0" stop-color="#4a3c2c"/><stop offset=".6" stop-color="#2a2016"/><stop offset="1" stop-color="#140f0a"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a Barghast throwing-axe: a short dark haft wrapped in sinew at the grip, marks burned into it, a bearded head; laid on bare stone,
     the warm light along the blade's edge */
  ART['item/b9_c5_barghastaxe'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A Barghast throwing-axe">${bg('b95ax')}
<linearGradient id="b95ax-h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8e4dc"/><stop offset=".45" stop-color="#8a8680"/><stop offset="1" stop-color="#2a2826"/></linearGradient>
<linearGradient id="b95ax-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4a30"/><stop offset="1" stop-color="#2a1a0e"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b95ax-bg)"/><path d="M0 116 Q60 104 120 110 Q170 114 200 106 L200 150 L0 150 Z" fill="#4a4238"/><path d="M20 120 Q80 112 140 118" stroke="#6a6052" stroke-width="2" fill="none" opacity=".5"/>
<ellipse cx="100" cy="114" rx="76" ry="8" fill="url(#b95ax-sh)"/>
<path d="M40 112 L150 44" stroke="url(#b95ax-w)" stroke-width="7" stroke-linecap="round"/><path d="M42 110 L148 46" stroke="#c89a68" stroke-width="1" opacity=".45"/>
<g stroke="#c8b890" stroke-width="1.4" opacity=".8">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${52 + i*4} ${98 - i*2.4} l5 3"/>`).join('')}</g>
<g fill="none" stroke="#1a0e06" stroke-width="1.4" opacity=".8"><path d="M96 78 l4 -6 l3 4"/><path d="M110 70 l2 -6 l4 2"/><path d="M122 62 l5 -3"/></g>
<path d="M136 52 Q150 22 176 18 Q170 34 172 52 Q166 70 150 76 Q148 62 140 58 Z" fill="url(#b95ax-h)" stroke="#140f0a" stroke-width="1.4"/>
<path d="M176 18 Q170 34 172 52 Q166 70 150 76" stroke="#fff4e0" stroke-width="1.2" fill="none" opacity=".6"/>
<path d="M140 58 L132 64 L136 52 Z" fill="#4a4844" stroke="#140f0a"/><circle cx="148" cy="48" r="2.4" fill="#2a2826"/>
<ellipse cx="110" cy="70" rx="64" ry="30" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c5_barghastaxe'] = [200, 150];
  /* a sutler's pack: oiled canvas gone dark with handling, pockets on pockets, a brass buckle worn bright, a needle and a twist of salt
     spilled from an open flap, on dry sand */
  ART['item/b9_c5_sutlerspack'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A sutler's pack">${bg('b95sp')}
<linearGradient id="b95sp-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a8a62"/><stop offset=".6" stop-color="#6a5c3e"/><stop offset="1" stop-color="#2e2618"/></linearGradient>
<linearGradient id="b95sp-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset=".5" stop-color="#c8a050"/><stop offset="1" stop-color="#5a4018"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b95sp-bg)"/><path d="M0 116 Q100 108 200 114 L200 150 L0 150 Z" fill="#6a5a40"/><ellipse cx="100" cy="118" rx="70" ry="8" fill="url(#b95sp-sh)"/>
<path d="M56 116 Q50 64 64 40 Q100 28 136 40 Q150 64 144 116 Z" fill="url(#b95sp-c)" stroke="#140f0a" stroke-width="1.6"/>
<path d="M62 46 Q100 34 138 46 L134 70 Q100 78 66 70 Z" fill="#7a6a48" stroke="#140f0a" stroke-width="1.2"/>
<rect x="70" y="82" width="26" height="24" rx="3" fill="#5e5034" stroke="#140f0a"/><rect x="104" y="82" width="26" height="24" rx="3" fill="#5e5034" stroke="#140f0a"/>
<rect x="74" y="86" width="18" height="8" rx="2" fill="#4a3e28" stroke="#140f0a" stroke-width=".8"/>
<rect x="92" y="62" width="16" height="12" rx="2" fill="url(#b95sp-b)" stroke="#140f0a"/><rect x="97" y="66" width="6" height="4" fill="#2a1e0e"/>
<path d="M100 74 L100 84" stroke="#3a2a18" stroke-width="3"/>
<path d="M144 112 L170 120" stroke="#d8d4c8" stroke-width="1.2"/><circle cx="171" cy="120" r="1.2" fill="none" stroke="#d8d4c8" stroke-width=".8"/>
<path d="M150 124 Q160 118 168 126 Q160 130 150 124 Z" fill="#e8e4d8" opacity=".85"/>
<path d="M58 112 L64 46" stroke="#f0c888" stroke-width="1.2" opacity=".4"/><ellipse cx="96" cy="76" rx="60" ry="40" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c5_sutlerspack'] = [200, 150];
  /* a dust-scarf: a long strip of loose-woven dun linen, loosely coiled on a back of stone, its fringed end trailing, a little dust
     lifting off it in the warm light */
  ART['item/b9_c5_dustscarf'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A dust-scarf">${bg('b95ds')}
<linearGradient id="b95ds-l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8c8a0"/><stop offset=".55" stop-color="#a8946a"/><stop offset="1" stop-color="#4a3e2a"/></linearGradient>
<pattern id="b95ds-w" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 2 H4 M2 0 V4" stroke="#3a3020" stroke-width=".4" opacity=".35"/></pattern></defs>
<rect width="200" height="150" fill="url(#b95ds-bg)"/><path d="M0 112 Q60 100 110 106 Q160 112 200 104 L200 150 L0 150 Z" fill="#4a4238"/><ellipse cx="100" cy="112" rx="74" ry="8" fill="url(#b95ds-sh)"/>
<path d="M44 104 Q40 78 70 72 Q104 66 120 80 Q134 92 112 100 Q88 108 72 96 Q64 88 80 84 Q100 80 104 90" fill="none" stroke="url(#b95ds-l)" stroke-width="18" stroke-linecap="round"/>
<path d="M44 104 Q40 78 70 72 Q104 66 120 80 Q134 92 112 100 Q88 108 72 96 Q64 88 80 84 Q100 80 104 90" fill="none" stroke="url(#b95ds-w)" stroke-width="18" stroke-linecap="round"/>
<path d="M120 80 Q150 92 170 96" fill="none" stroke="url(#b95ds-l)" stroke-width="14"/><path d="M120 80 Q150 92 170 96" fill="none" stroke="url(#b95ds-w)" stroke-width="14"/>
<g stroke="#a8946a" stroke-width="1.2">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${168 + (i % 2)} ${89 + i*2.4} l9 ${1 + (i % 3)}"/>`).join('')}</g>
<path d="M50 96 Q52 80 70 74" stroke="#fff0d0" stroke-width="1.4" fill="none" opacity=".45"/>
<g fill="#e8d0a0" opacity=".35">${[[70, 60], [86, 54], [100, 58], [112, 50], [94, 46]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2"/>`).join('')}</g>
<ellipse cx="100" cy="80" rx="64" ry="30" fill="#e8b878" opacity=".05"/></svg>`;
  ART_SIZE['item/b9_c5_dustscarf'] = [200, 150];
}
