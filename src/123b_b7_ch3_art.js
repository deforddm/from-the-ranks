/* ============ Book Seven, Chapter 3 art: Night Raids — farm country inland under no moon, a column in the ditches, a factor's house ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d, lit from the left: Wenna, the Shake fisher who guides the Third (the recruit): lean and
   brown, oiled sealskin over blue-grey wool, a cord of shells at the throat, bare feet, dark hair tied back with tarred cord, a gaff on a
   line over the shoulder and a coil of cord at the hip. The bust (POR.wenna), as Book Six's women: lamp low left, a cool sea-rim right.
   Six backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still), in 120b's night palette (blue-black sky, no moon,
   the barley grey-green, plaster pale, lamp-gold where a window is lit):
     b7_camp_night   the column's lie-up in a wood: tall trunks, soldiers asleep in their cloaks, a sentry, no fire
     b7_march_night  a file of soldiers on a farm track between hedges in the dark, a far farm, stars
     b7_farm_night   a dark farm behind a stone wall: house, barn, cart shed, a banked glow, the barley
     b7_c3_floor     inside an empty farmhouse at dusk: plank floor, closed shutters with light at the cracks, a cold hearth, a heavy table
     b7_c3_gate      a village's wattle wall and split-pole gate, thatch behind, one lamp behind the gate (out once the village shuts)
     b7_c3_house     a factor's house of dressed stone behind a yard wall, lamps in every window, a long barn, an orchard; at dawn after
                     the key the lamps are out, and on 'ledger' a column of smoke stands up from the back of the house
   Nothing burns close; no bodies, ever.
   The chapter's gear in the series' 200×150 item style (089g), on Book Six's smoke-umber ground (the Third's items). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Wenna: thirty, lean and brown, oiled sealskin jerkin over a blue-grey wool smock to the knee, bare feet, a cord of white shells at the
     throat, dark hair tied back with tarred cord; the gaff's pole over the right shoulder with its iron hook behind, the line looped down;
     a coil of tarred cord at the left hip, a short fish-knife in the belt */
  wenna(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1.02); const sw = o.still ? 0 : Math.sin(t/380 + (o.phase || 0));
    h.legs('#7a5a40'); ctx.fillStyle = '#8a6448'; ctx.fillRect(-4.6, 10.8, 3.6, 1.8); ctx.fillRect(1, 10.8, 3.6, 1.8); // bare feet, brown
    poly(ctx, [[-6,-6],[6,-6],[6.8 + sw*.2,9.4],[-6.8 + sw*.2,9.4]], h.armor('#5e6a74', '#22282e')); // the wool smock
    poly(ctx, [[-5.8,-5.6],[5.8,-5.6],[5.2,3.6],[-5.2,3.6]], h.armor('#4a3e32', '#141008')); // the sealskin jerkin
    ctx.fillStyle = 'rgba(220,230,240,.22)'; ctx.fillRect(-5, -5, 1, 8); ctx.fillRect(2.4, -4.4, .8, 6); // the oil's sheen
    ctx.fillStyle = '#1e160e'; ctx.fillRect(-6, 2.6, 12, 1.1); // the belt
    B2F.line(ctx, '#c8c8c0', .7, [[3.6, 2.4], [4.4, 5.6]]); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(3.2, 1.6, 1, 1.2); // the fish-knife
    // the coil of tarred cord at the left hip
    ctx.strokeStyle = '#2a2014'; ctx.lineWidth = .8; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-5.6, 5.2, 2 - i*.3, 1.4 - i*.2, .2, 0, 7); ctx.stroke(); }
    // arms: the back arm bare to the elbow, down; the front arm up to the shoulder, holding the gaff
    ctx.fillStyle = '#4a3e32'; ctx.fillRect(-8, -5, 2.2, 3.6); ctx.fillStyle = '#9a6c4a'; ctx.fillRect(-7.8, -1.6, 2, 4.2); ell(ctx, -6.8, 3, 1.1, 1.1, '#8a6040');
    ctx.fillStyle = '#4a3e32'; ctx.fillRect(5, -5.2, 2.2, 3.2); ctx.fillStyle = '#9a6c4a'; ctx.fillRect(5.2, -2.2, 2, 2.4); ell(ctx, 6.2, -.2, 1.2, 1.2, '#8a6040');
    // the gaff: the pole up over the shoulder and back, the iron hook behind the head, the line looping down
    B2F.line(ctx, '#8a7050', 1.1, [[6.6, 1.2], [-3.6, -18.4]]);
    ctx.strokeStyle = '#7a7a78'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(-4.4, -16.6, 2, Math.PI*1.25, Math.PI*.4, true); ctx.stroke(); // the hook
    ctx.strokeStyle = 'rgba(40,30,18,.8)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(-3.6, -18.2); ctx.quadraticCurveTo(-8 + sw, -6, -6.4, 3.8); ctx.stroke(); // the line
    h.head('#9a6c4a', 3.9, -11.4); h.look('rgba(20,12,6,.86)', -11.6);
    B2F.cap(ctx, '#1a120c', 4.1, -12.6, 1.02, 1.8); ell(ctx, -1, -9, 1.3, 2.2, '#1a120c'); B2F.line(ctx, '#3a2a14', .6, [[-2, -10], [0, -10]]); // dark hair, tied back with cord
    for (let i = 0; i < 5; i++) ell(ctx, -2.4 + i*1.2, -6.4 + Math.abs(i - 2)*.3, .45, .4, '#e8e4d8'); // the cord of shells
    ctx.restore(); },
});

/* ---------------- the bust ---------------- */
POR.wenna = function(ctx){ const F = {cy:-74, w:11.8, h:19.6, jaw:.74, chin:4.3, skin:'#9a6c4c', iris:'#2a2018', lip:'#7a4a3a', browCol:'#1e140e', browW:1.3, arch:.7, browL:.2, browR:.35, rim:'#9ab8c8', rimA:.28, nose:1.1, look:.25, open:.9, smileL:.05, smileR:.15, mouthW:3.3, bags:.3, age:.2};
  PR.neck(ctx, F, 7.6);
  const B = BP.body(ctx, F, {wide:32, drop:3, nx:F.w*.66 + 2.4, ny:F.cy + 14, cb:-45, c1:'#4e4236', c2:'#120e08'}); ctx.save(); B.path(); ctx.clip(); // the oiled sealskin
    for (let i = 0; i < 26; i++) { const r = PR.rng(i + 731); PR.soft(ctx, -30 + r()*60, -44 + r()*46, 2 + r()*5, 1 + r()*2, '#d8e4ee', .06 + r()*.06); } // the oil's sheen
    PR.stroke(ctx, 'rgba(0,0,0,.45)', .9, () => { ctx.moveTo(-14, -40); ctx.quadraticCurveTo(-16, -16, -13, 6); ctx.moveTo(16, -40); ctx.quadraticCurveTo(18, -16, 15, 6); }); // the seams
    ctx.fillStyle = 'rgba(94,106,116,.75)'; ctx.fillRect(-7, -46, 14, 52); // the wool smock showing at the opening
    PR.soft(ctx, 20, -16, 14, 12, '#000000', .4); PR.soft(ctx, -18, -34, 10, 6, '#e8f0f8', .1);
    ctx.restore(); BP.light(ctx, F, B, false);
  // the cord of shells at the throat
  for (let i = 0; i < 9; i++) { const a = Math.PI*(.18 + i*.08), x = Math.cos(a)*-14, y = -44 + Math.sin(a)*4; ell(ctx, x*.9 + 0, y + 2, 1.8, 1.4, PR.rad(ctx, x - .5, y + 1.5, .1, 2, [[0, '#f8f4ea'], [1, '#8a8478']])); }
  // the gaff's pole over the right shoulder
  PR.stroke(ctx, '#3a2a18', 3, () => { ctx.moveTo(32, 4); ctx.lineTo(16, -116); }); PR.stroke(ctx, '#8a7050', 2, () => { ctx.moveTo(32, 4); ctx.lineTo(16, -116); }); PR.stroke(ctx, 'rgba(255,240,210,.3)', .6, () => { ctx.moveTo(30.6, 4); ctx.lineTo(14.8, -114); });
  F.under = (ctx, F) => { PR.dots(ctx, F, 30, 'rgba(18,10,6,.25)', .45, [5, 18]); PR.soft(ctx, -5, F.cy + 3, 3.4, 2, '#8a3a28', .1); PR.soft(ctx, 5, F.cy + 3, 3.4, 2, '#8a3a28', .1); };
  PR.face(ctx, F);
  const u = F.h/20, top = F.cy - 21*u;
  BP.hair(ctx, F, {c:['#2a1e14', '#120c08', '#040302'], v:1.4, wx:.9, hl:12.4, ey:-2.4, n:70, sw:.45, s:['#1e1610', '#0a0604', '#3a2c20'], seed:733, sh:'#a8b8c0', shA:.2});
  ell(ctx, -F.w*.15, top + F.h*.92, 3.4, 2.4, PR.rad(ctx, -F.w*.25, top + F.h*.86, .4, 4, [[0, '#2a1e14'], [1, '#060403']])); // the knot, tied back
  PR.stroke(ctx, '#3a2a14', 1, () => { ctx.moveTo(-F.w*.15 - 3.4, top + F.h*.92); ctx.lineTo(-F.w*.15 + 3.4, top + F.h*.92); }); // the tarred cord round it
  return F; };

/* ---------------- shared drawing for the valley ---------------- */
/* a night sky with no moon: blue-black, stars, a faint greyness at the horizon */
function b73aSky(x, W, hz, seed, warm){ x.fillStyle = vgrad(x, 0, hz, [[0,'#03050a'],[.7,'#0c1220'],[1, warm ? '#1e1a1e' : '#161c28']]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 120; i++) { x.fillStyle = `rgba(226,230,250,${(.1 + hash(i, seed)*.55).toFixed(2)})`; const sz = hash(i, seed + 3) > .94 ? 1.4 : 1; x.fillRect(hash(i, seed + 1)*W, Math.pow(hash(i, seed + 2), 1.3)*hz*.92, sz, sz); } }
/* low hills along the horizon */
function b73aHills(x, W, H, hz, col, amp, seed){ x.fillStyle = col; x.beginPath(); x.moveTo(0, hz + 2); for (let i = 0; i <= 24; i++) { const u = i/24; x.lineTo(u*W, hz - H*(amp + amp*.8*Math.sin(u*5 + seed) + amp*.4*Math.sin(u*13 + seed*2))); } x.lineTo(W, hz + 2); x.closePath(); x.fill(); }
/* the barley: grey-green strokes, denser and taller toward the viewer */
function b73aBarley(x, W, H, y0, y1, n, seed){ for (let i = 0; i < n; i++) { const yy = y0 + Math.pow(hash(i, seed), 1.2)*(y1 - y0), d = (yy - y0)/(y1 - y0); x.strokeStyle = `rgba(${70 + Math.round(d*20)},${78 + Math.round(d*20)},${52},${(.3 + d*.45).toFixed(2)})`; x.lineWidth = .6 + d*1.1; const gx = hash(i, seed + 1)*W; x.beginPath(); x.moveTo(gx, yy); x.lineTo(gx + 1 + d*2, yy - 3 - d*11); x.stroke(); } }
/* a hedge: a long dark mound with lumps along its top */
function b73aHedge(x, x0, x1, y, h, col, seed){ x.fillStyle = col; x.beginPath(); x.moveTo(x0, y); for (let i = 0; i <= 18; i++) { const u = i/18; x.lineTo(x0 + (x1 - x0)*u, y - h*(.7 + .3*Math.sin(u*9 + seed) + .2*hash(i, seed))); } x.lineTo(x1, y + 2); x.lineTo(x0, y + 2); x.closePath(); x.fill(); }
/* a plaster-and-thatch building: pale wall, a dark thatch roof, a door and shuttered windows; lit gives a window of lamp-gold */
function b73aCot(x, bx, by, w, h, lit, pale){ x.fillStyle = pale || '#3a3a36'; x.fillRect(bx, by - h, w, h); x.fillStyle = 'rgba(255,255,240,.06)'; x.fillRect(bx, by - h, w*.2, h);
  poly(x, [[bx - w*.08, by - h], [bx + w*.5, by - h - h*.9], [bx + w*1.08, by - h]], '#141410'); x.strokeStyle = 'rgba(80,74,56,.35)'; x.lineWidth = .6; x.beginPath(); for (let i = 1; i < 5; i++) { const k = i/5; x.moveTo(bx - w*.08 + w*.58*k, by - h - h*.9*k); x.lineTo(bx + w*1.08 - w*.58*k, by - h - h*.9*k); } x.stroke(); // thatch courses
  x.fillStyle = '#0c0a08'; x.fillRect(bx + w*.42, by - h*.62, w*.16, h*.62); // the door
  x.fillStyle = lit ? 'rgba(255,200,110,.85)' : '#121210'; x.fillRect(bx + w*.12, by - h*.7, w*.16, h*.22); x.fillRect(bx + w*.72, by - h*.7, w*.16, h*.22); }

/* ---------------- backdrops ---------------- */
/* the column's lie-up in a wood (120's caption): tall trunks against a sky with no moon, soldiers asleep in their cloaks between the roots,
   a sentry standing, no fire */
SCENEX.b7_camp_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.6;
  ctx.drawImage(sceneLayer('b73:camp', W, H, (x, W, H) => {
    b73aSky(x, W, hz, 7310, false);
    x.fillStyle = vgrad(x, hz, H, [[0,'#10120c'],[1,'#060604']]); x.fillRect(0, hz, W, H - hz); // the wood floor
    for (let i = 0; i < 90; i++) { const yy = hz + Math.pow(hash(i, 7311), 1.2)*(H - hz), d = (yy - hz)/(H - hz); ell(x, hash(i, 7312)*W, yy, 3 + d*8, 1 + d*2, `rgba(${40 + Math.round(d*20)},${36 + Math.round(d*14)},${22},${(.3 + d*.3).toFixed(2)})`); } // leaf litter
    // trunks, far to near: thin and grey far, thick and black near; the canopy a black mass across the top
    for (let layer = 0; layer < 3; layer++) { const n = 9 - layer*2; for (let i = 0; i < n; i++) { const tx = W*(hash(i + layer*20, 7313)*1.04 - .02), tw = W*(.012 + layer*.018 + hash(i, 7314 + layer)*.01), base = hz + H*(.02 + layer*.12 + hash(i, 7315)*.04);
      x.fillStyle = ['#161a1c', '#0e1010', '#050606'][layer]; x.fillRect(tx - tw/2, 0, tw, base); ell(x, tx, base, tw*.9, tw*.25, x.fillStyle); // the trunk, its root-flare
      if (layer === 2) { x.fillStyle = 'rgba(160,170,190,.07)'; x.fillRect(tx - tw/2, 0, tw*.18, base); } } }
    x.fillStyle = '#040505'; x.beginPath(); x.moveTo(0, 0); x.lineTo(W, 0); x.lineTo(W, H*.12); for (let i = 24; i >= 0; i--) { const u = i/24; x.lineTo(u*W, H*(.1 + .08*Math.sin(u*7) + .05*hash(i, 7316))); } x.closePath(); x.fill(); // the canopy
    // soldiers asleep between the roots: long dark lumps of cloak, a helm, a pack
    for (let i = 0; i < 9; i++) { const sx = W*(.06 + hash(i, 7317)*.88), sy = hz + H*(.08 + hash(i, 7318)*.2), s = .7 + (sy - hz)/(H - hz)*1.4;
      ell(x, sx, sy, 16*s, 4.6*s, '#1a1e18'); ell(x, sx - 12*s, sy - 1.6*s, 3.4*s, 3*s, '#22261e'); ell(x, sx + 4*s, sy - 2.6*s, 9*s, 2.2*s, 'rgba(110,130,100,.08)'); }
  }), 0, 0, W, H);
  // a sentry standing at the wood's edge, breathing; starlight on his helm
  const sx = W*.8, sy = H*.66, br = mo ? Math.sin(t/900)*.6 : 0; ctx.fillStyle = '#08090a'; ctx.fillRect(sx - 3, sy - 22 + br, 6, 22); ell(ctx, sx, sy - 25 + br, 3.2, 3.2, '#08090a'); B2F.line(ctx, '#08090a', 1.2, [[sx + 3, sy - 16], [sx + 6, sy - 34]]); ctx.fillStyle = 'rgba(180,190,210,.25)'; ctx.fillRect(sx - 2, sy - 28 + br, 2, 1);
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.14 + i*Math.min(.075, .46/sq.length)), H*.97 - (i % 2)*2, 1.8, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .75, .55); };

/* the column on the move (120's caption): a farm track pale under the stars between two hedges, running away to a far farm; a file of
   soldiers in the ditch beside it, dark, no lamps; the barley either side */
SCENEX.b7_march_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46;
  ctx.drawImage(sceneLayer('b73:march', W, H, (x, W, H) => {
    b73aSky(x, W, hz, 7330, false);
    b73aHills(x, W, H, hz, '#0a0c10', .02, 1.3);
    x.fillStyle = vgrad(x, hz, H, [[0,'#12140e'],[1,'#070806']]); x.fillRect(0, hz, W, H - hz);
    // the far farm on the track, a dark cluster
    b73aCot(x, W*.58, hz + 2, W*.05, H*.03, false, '#1e1e1c'); b73aCot(x, W*.64, hz + 3, W*.035, H*.024, false, '#1a1a18');
    // the track: a pale band narrowing to the farm
    x.fillStyle = 'rgba(150,140,110,.2)'; x.beginPath(); x.moveTo(W*.3, H); x.lineTo(W*.6, hz + 4); x.lineTo(W*.62, hz + 4); x.lineTo(W*.78, H); x.closePath(); x.fill();
    b73aBarley(x, W, H, hz + 4, H, 260, 7331);
    // the hedges either side of the track, converging
    for (let i = 0; i < 2; i++) { const sd = i ? 1 : -1; x.fillStyle = '#060805'; x.beginPath(); x.moveTo(W*(.5 + sd*.62), H); for (let k = 0; k <= 16; k++) { const u = k/16, px = W*(.5 + sd*(.62 - .5*u)), py = H - (H - hz - 4)*u; x.lineTo(px, py - H*(.08 - .06*u)*(.8 + .4*hash(k + i*17, 7332))); } x.lineTo(W*(.5 + sd*.12), hz + 4); x.lineTo(W*(.5 + sd*.62), H); x.closePath(); x.fill(); }
  }), 0, 0, W, H);
  // the file in the ditch along the left hedge, small and dark, moving
  for (let i = 0; i < 11; i++) { const k = i/10, u = .62 - .5*k, mx = W*(.5 - u + .04) + (mo ? ((t/90) % 6) : 0)*(1 - k)*.4, my = H - (H - hz - 4)*k + 2, s = (1 - k*.75)*H/360; ctx.fillStyle = '#050605'; ctx.fillRect(mx - 2.2*s, my - 12*s, 4.4*s, 10*s); ell(ctx, mx, my - 14*s, 2.4*s, 2.4*s, '#050605'); B2F.line(ctx, '#050605', Math.max(.5, .9*s), [[mx + 2*s, my - 7*s], [mx + 3*s, my - 21*s]]); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.56 + i*Math.min(.07, .38/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .75, .55); };

/* a farm off the road (120's caption): a long dark farm behind a fieldstone wall, a house, a barn with its doors a hand's width open and a
   banked red glow inside, a cart shed with a ridged roof, the barley in front; no light anywhere else */
SCENEX.b7_farm_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5;
  ctx.drawImage(sceneLayer('b73:farm', W, H, (x, W, H) => {
    b73aSky(x, W, hz, 7350, false);
    b73aHills(x, W, H, hz, '#0b0d10', .025, 2.1);
    x.fillStyle = vgrad(x, hz, H, [[0,'#14160f'],[1,'#080906']]); x.fillRect(0, hz, W, H - hz);
    // the house (left), the cart shed (middle), the barn (right, big)
    b73aCot(x, W*.14, hz + H*.1, W*.2, H*.1, false, '#2a2a26');
    x.fillStyle = '#1a1a16'; x.fillRect(W*.4, hz + H*.04, W*.14, H*.06); poly(x, [[W*.39, hz + H*.04], [W*.47, hz - H*.01], [W*.55, hz + H*.04]], '#0e0e0c'); x.fillStyle = '#050505'; x.fillRect(W*.42, hz + H*.06, W*.1, H*.04); // the cart shed, open-fronted
    x.fillStyle = '#22221e'; x.fillRect(W*.6, hz - H*.02, W*.3, H*.14); poly(x, [[W*.58, hz - H*.02], [W*.75, hz - H*.13], [W*.92, hz - H*.02]], '#101010'); // the barn
    x.fillStyle = '#050404'; x.fillRect(W*.72, hz + H*.04, W*.06, H*.08); // its doors, ajar
    // the fieldstone wall across the front
    const wy = hz + H*.16; x.fillStyle = vgrad(x, wy - H*.05, wy, [[0,'#3a3832'],[1,'#1a1916']]); x.fillRect(0, wy - H*.05, W, H*.05);
    for (let i = 0; i < 80; i++) ell(x, hash(i, 7351)*W, wy - H*.05 + hash(i, 7352)*H*.05, 3 + hash(i, 7353)*4, 1.4 + hash(i, 7354), 'rgba(100,96,86,.3)');
    b73aBarley(x, W, H, wy + 2, H, 240, 7355);
  }), 0, 0, W, H);
  // the banked fire inside the barn, a red breath at the gap
  const lf = mo ? .7 + .3*Math.sin(t/800) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.75, H*.58, H*.05, '#ff4a20', .35*lf); ctx.globalCompositeOperation = 'source-over';
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.1 + i*Math.min(.07, .4/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .72, .5); };

/* the farmhouse floor (this file's scene; B7READ[3]'s table scene): a bare room at dusk, the shutters closed with gold-grey light at their
   cracks, a heavy table nobody could carry, a cold hearth with no oven door, plank floor; the squad on the boards */
SCENEX.b7_c3_floor = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fy = H*.62;
  ctx.drawImage(sceneLayer('b73:floor', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, fy, [[0,'#141210'],[1,'#22201c']]); x.fillRect(0, 0, W, fy); // the plaster wall in near-dark
    for (let i = 0; i < 40; i++) ell(x, hash(i, 7370)*W, hash(i, 7371)*fy, 8 + hash(i, 7372)*20, 3 + hash(i, 7373)*8, 'rgba(0,0,0,.12)'); // damp, smoke
    x.fillStyle = '#0c0a08'; x.fillRect(0, H*.06, W, H*.04); for (let i = 0; i < 5; i++) x.fillRect(W*(.1 + i*.2), 0, W*.03, H*.1); // the ceiling beams
    x.fillStyle = vgrad(x, fy, H, [[0,'#2a2016'],[1,'#120e0a']]); x.fillRect(0, fy, W, H - fy); // the plank floor
    x.strokeStyle = 'rgba(0,0,0,.45)'; x.lineWidth = 1; for (let i = 0; i < 9; i++) { const k = i/8; x.beginPath(); x.moveTo(W*.5 + (k - .5)*W*.5, fy); x.lineTo(W*.5 + (k - .5)*W*2.2, H); x.stroke(); } // planks, in perspective
    // the hearth, left: a stone surround, a black mouth, the oven beside it with no door
    x.fillStyle = '#2e2a24'; x.fillRect(W*.04, fy - H*.3, W*.24, H*.3); x.fillStyle = '#050403'; x.fillRect(W*.07, fy - H*.18, W*.12, H*.18); x.fillStyle = '#0a0806'; x.fillRect(W*.2, fy - H*.14, W*.06, H*.07);
    for (let i = 0; i < 20; i++) ell(x, W*(.04 + hash(i, 7374)*.24), fy - H*.3 + hash(i, 7375)*H*.3, 3 + hash(i, 7376)*3, 1.6, 'rgba(90,84,74,.3)');
    ell(x, W*.13, fy - H*.01, W*.04, H*.01, '#1a1612'); // cold ash
    // the heavy table, right
    x.fillStyle = '#2a1e12'; x.fillRect(W*.6, fy - H*.06, W*.3, H*.03); x.fillStyle = '#1a120a'; x.fillRect(W*.62, fy - H*.03, W*.02, H*.12); x.fillRect(W*.86, fy - H*.03, W*.02, H*.12); x.fillStyle = 'rgba(255,220,160,.08)'; x.fillRect(W*.6, fy - H*.06, W*.3, H*.006);
  }), 0, 0, W, H);
  // the shutters, closed, the dusk at their cracks going from gold to grey
  const g = mo ? .75 + .25*Math.sin(t/3000) : .9;
  [[.36, .2], [.5, .2]].forEach(([u, v]) => { const sx = W*u, sy = H*v, sw = W*.1, sh = H*.2; ctx.fillStyle = '#1a140e'; ctx.fillRect(sx, sy, sw, sh); ctx.fillStyle = '#0e0a06'; ctx.fillRect(sx + sw*.48, sy, sw*.04, sh);
    ctx.fillStyle = `rgba(220,180,120,${(.55*g).toFixed(2)})`; ctx.fillRect(sx + sw*.47, sy + 2, 1, sh - 4); ctx.fillRect(sx, sy + sh*.5, sw, 1); ctx.fillRect(sx + 2, sy, 1, sh); ctx.fillRect(sx + sw - 3, sy, 1, sh);
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, sx + sw*.5, sy + sh*.5, H*.14, '#c8a070', .07*g); ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = `rgba(200,170,120,${(.05*g).toFixed(2)})`; ctx.beginPath(); ctx.moveTo(sx + sw*.47, sy + sh); ctx.lineTo(sx + sw*.53, sy + sh); ctx.lineTo(sx + sw*.9, H); ctx.lineTo(sx + sw*.1, H); ctx.closePath(); ctx.fill(); }); // a thin blade of light on the floor
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.3 + i*Math.min(.08, .5/sq.length)), H*.96 - (i % 2)*3, 1.9, t, {phase:i, dir:i % 2 ? 1 : -1, still:true}));
  vign(ctx, W, H, .82, .6); };

/* a village gate (this file's scene): a wattle wall on stakes round plaster-and-thatch houses, a gate of split poles, one lamp behind the gate
   (out once the village has shut against the Third), the barley and the track in front */
SCENEX.b7_c3_gate = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, wy = H*.68;
  ctx.drawImage(sceneLayer('b73:gate', W, H, (x, W, H) => {
    b73aSky(x, W, hz, 7390, false);
    b73aHills(x, W, H, hz, '#0a0c10', .02, .7);
    x.fillStyle = vgrad(x, hz, H, [[0,'#14160f'],[1,'#080906']]); x.fillRect(0, hz, W, H - hz);
    // the houses behind the wall, roofs showing over it
    [[.08, .1, .07], [.2, .12, .09], [.36, .09, .06], [.62, .11, .08], [.76, .13, .1], [.9, .09, .06]].forEach(([u, w, h], i) => b73aCot(x, W*u, wy - H*.02, W*w, H*h, false, i % 2 ? '#2c2c28' : '#32322e'));
    // the wattle wall: stakes and woven withies
    x.fillStyle = '#1a160e'; x.fillRect(0, wy - H*.1, W, H*.1);
    x.strokeStyle = 'rgba(80,66,40,.5)'; x.lineWidth = 1; for (let r = 0; r < 6; r++) { x.beginPath(); for (let i = 0; i <= 60; i++) { const u = i/60; x.lineTo(u*W, wy - H*.1 + H*(.012 + r*.016) + Math.sin(u*120 + r)*1.2); } x.stroke(); }
    for (let i = 0; i < 40; i++) { const sx = i/39*W; x.fillStyle = '#0e0a06'; x.fillRect(sx - 1.2, wy - H*.12 - hash(i, 7391)*H*.02, 2.4, H*.12); }
    // the gate: split poles, bound, in the middle
    const gx = W*.46, gw = W*.08; x.fillStyle = '#0a0806'; x.fillRect(gx - 2, wy - H*.14, gw + 4, H*.14);
    for (let i = 0; i < 7; i++) { x.fillStyle = i % 2 ? '#2a2216' : '#241c12'; x.fillRect(gx + i*gw/7, wy - H*.13, gw/7 - 1, H*.13); }
    x.fillStyle = '#3a2e1c'; x.fillRect(gx, wy - H*.1, gw, H*.01); x.fillRect(gx, wy - H*.04, gw, H*.01); // the cross-bars
    // the track to the gate, pale
    x.fillStyle = 'rgba(150,140,110,.18)'; x.beginPath(); x.moveTo(gx, wy); x.lineTo(gx + gw, wy); x.lineTo(W*.72, H); x.lineTo(W*.28, H); x.closePath(); x.fill();
    b73aBarley(x, W, H, wy + 2, H, 180, 7392);
  }), 0, 0, W, H);
  // the lamp behind the gate, through the poles: lit unless the village has shut
  if (!(S && S.f && S.f.b7_c3_village === 'shut')) { const lf = mo ? .8 + .2*Math.sin(t/600) + .05*Math.sin(t/47) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.5, H*.6, H*.1, '#ffb060', .3*lf); glow(ctx, W*.5, H*.6, 2, '#ffe0a0', .9*lf); ctx.globalCompositeOperation = 'source-over'; }
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.12 + i*Math.min(.07, .3/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .72, .5); };

/* a factor's house (this file's scene): two floors of dressed stone with a slate roof behind a yard wall, every window lit; a long barn to
   the right, an orchard of round black trees to the left; at dawn after the key the lamps are out and the sky is grey, and on 'ledger' a
   column of smoke stands straight up from the back of the house */
SCENEX.b7_c3_house = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.54, dawn = !!(S && S.f && S.f.b7_c3_key), smoke = !!(S && S.f && S.f.b7_c3_key === 'ledger');
  ctx.drawImage(sceneLayer('b73:house' + (dawn ? 'd' : 'n'), W, H, (x, W, H) => {
    if (dawn) { x.fillStyle = vgrad(x, 0, hz, [[0,'#1a2030'],[.6,'#3a4048'],[1,'#6a6058']]); x.fillRect(0, 0, W, hz + 2); } else b73aSky(x, W, hz, 7410, false);
    b73aHills(x, W, H, hz, dawn ? '#22262a' : '#0b0d10', .02, 1.7);
    x.fillStyle = vgrad(x, hz, H, dawn ? [[0,'#2a2c22'],[1,'#121410']] : [[0,'#14160f'],[1,'#080906']]); x.fillRect(0, hz, W, H - hz);
    // the orchard, left: round dark trees in rows
    for (let r = 0; r < 3; r++) for (let i = 0; i < 5; i++) { const ox = W*(.02 + i*.07 + r*.02), oy = hz + H*(.02 + r*.04), s = .8 + r*.3; B2F.line(x, dawn ? '#1a1a14' : '#0a0a08', 1.4*s, [[ox, oy], [ox, oy - 8*s]]); ell(x, ox, oy - 12*s, 9*s, 7*s, dawn ? '#1e2418' : '#0a0e08'); }
    // the house: two floors, a slate roof, a chimney
    const hx0 = W*.36, hx1 = W*.68, hb = hz + H*.06, ht = hb - H*.2; x.fillStyle = vgrad(x, ht, hb, dawn ? [[0,'#5a5850'],[1,'#3a3832']] : [[0,'#3e3c36'],[1,'#1e1d1a']]); x.fillRect(hx0, ht, hx1 - hx0, hb - ht);
    x.strokeStyle = dawn ? 'rgba(30,28,24,.35)' : 'rgba(0,0,0,.35)'; x.lineWidth = .6; for (let r = 1; r < 10; r++) { x.beginPath(); x.moveTo(hx0, ht + (hb - ht)*r/10); x.lineTo(hx1, ht + (hb - ht)*r/10); x.stroke(); } // the courses of dressed stone
    poly(x, [[hx0 - W*.02, ht], [hx0 + W*.05, ht - H*.08], [hx1 - W*.05, ht - H*.08], [hx1 + W*.02, ht]], dawn ? '#2a2e34' : '#14161a');
    x.fillStyle = dawn ? '#2e2c28' : '#121210'; x.fillRect(hx0 + (hx1 - hx0)*.7, ht - H*.12, W*.02, H*.06); // the chimney
    x.fillStyle = '#0c0a08'; x.fillRect(hx0 + (hx1 - hx0)*.46, hb - H*.07, W*.025, H*.07); // the door
    // the barn, right, long and low
    x.fillStyle = dawn ? '#3a3830' : '#1c1c18'; x.fillRect(W*.72, hz - H*.02, W*.26, H*.1); poly(x, [[W*.71, hz - H*.02], [W*.85, hz - H*.1], [W*.99, hz - H*.02]], dawn ? '#24241e' : '#0e0e0c');
    // the yard wall across the front, the gate in it
    const wy = hz + H*.14; x.fillStyle = vgrad(x, wy - H*.05, wy, dawn ? [[0,'#5a564c'],[1,'#3a3630']] : [[0,'#3a3832'],[1,'#1a1916']]); x.fillRect(0, wy - H*.05, W, H*.05);
    for (let i = 0; i < 80; i++) ell(x, hash(i, 7411)*W, wy - H*.05 + hash(i, 7412)*H*.05, 3 + hash(i, 7413)*4, 1.4 + hash(i, 7414), dawn ? 'rgba(120,114,100,.3)' : 'rgba(100,96,86,.3)');
    x.fillStyle = '#0a0908'; x.fillRect(W*.5, wy - H*.05, W*.06, H*.05); // the gate
    x.fillStyle = 'rgba(150,140,110,.16)'; x.beginPath(); x.moveTo(W*.5, wy); x.lineTo(W*.56, wy); x.lineTo(W*.74, H); x.lineTo(W*.32, H); x.closePath(); x.fill(); // the lane
  }), 0, 0, W, H);
  // the windows: every one lit by night; dark at dawn
  if (!dawn) { const lf = mo ? .85 + .15*Math.sin(t/700) : 1, hx0 = W*.36, hx1 = W*.68, hb = H*.54 + H*.06, ht = hb - H*.2;
    for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { if (r === 1 && i === 2) continue; const wx = hx0 + (hx1 - hx0)*(.08 + i*.19), wyy = ht + (hb - ht)*(.18 + r*.46);
      ctx.fillStyle = `rgba(255,${196 + Math.round(lf*24)},110,${(.85*lf).toFixed(2)})`; ctx.fillRect(wx, wyy, W*.024, H*.04); ctx.fillStyle = 'rgba(40,24,10,.7)'; ctx.fillRect(wx + W*.011, wyy, 1, H*.04);
      ctx.globalCompositeOperation = 'lighter'; glow(ctx, wx + W*.012, wyy + H*.02, H*.05, '#ffb060', .12*lf); ctx.globalCompositeOperation = 'source-over'; } }
  // the smoke from the counting room on 'ledger', straight up in the still dawn air, slowly widening
  if (smoke) { const sx = W*.6, sy = H*.4; for (let i = 0; i < 14; i++) { const k = ((mo ? t/9000 : 0) + i/14) % 1, r = H*(.02 + k*.07); ctx.fillStyle = `rgba(80,78,76,${(.35*(1 - k)).toFixed(2)})`; ell(ctx, sx + Math.sin(k*4 + i)*W*.01, sy - k*H*.42, r, r*.8, ctx.fillStyle); } }
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.1 + i*Math.min(.07, .3/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .72, .5); };

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
    + lin('st', [[0, '#e9edf0'], [.35, '#a9b1b8'], [.7, '#69717a'], [1, '#353b42']], 0, 1)
    + lin('wd', [[0, '#9c7649'], [.5, '#6e4f2e'], [1, '#3c2916']], 0, 1);
  function put(key, label, defs, body){
    const P = key.replace(/[^a-z0-9]/g, '') + '-';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="${label.replace(/"/g, '&quot;')}"><defs>${BASE}${defs}</defs><rect width="200" height="150" fill="url(#@bg)"/>${body}</svg>`;
    ART['item/' + key] = svg.replace(/@/g, P);
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [200, 150];
  }

  /* the Letherii field crossbow: a short heavy stock of oiled ash seen side-on, a steel prod across the fore-end, the string spanned, a
     crank-hook hung from it on a thong; notches cut all along the stock */
  { let notches = ''; for (let i = 0; i < 18; i++) notches += `<path d="M${(70 + i*4.2).toFixed(1)} 84 l1 5" stroke="#1a1006" stroke-width="1" stroke-opacity=".8"/>`;
    put('b7_c3_letherxbow', 'A Letherii field crossbow', '',
      sh(100, 120, 80, 7)
      + `<g transform="rotate(-6 100 80)">`
      + S('M30 82 L150 78 L156 84 L150 92 L64 94 Q50 104 36 100 Q28 92 30 82 Z', 'url(#@wd)')
      + notches
      + `<path d="M40 86 L148 82" stroke="#fff" stroke-opacity=".18" stroke-width="1"/>`
      + S('M150 56 Q160 80 150 104 L146 104 Q155 80 146 56 Z', 'url(#@st)')
      + `<path d="M148 58 L96 81 L148 102" fill="none" stroke="#d8d0b8" stroke-width="1"/>`
      + `<rect x="92" y="78" width="10" height="7" rx="1.5" fill="#3a3e44" ${O}/><path d="M98 85 L101 96" stroke="#2a2a2e" stroke-width="2.4" stroke-linecap="round"/>`
      + S('M100 80 L148 79 L148 82 L100 83 Z', '#5a4428')
      + `<path d="M118 80.5 L142 80" stroke="#c8c8c0" stroke-width="1.2"/><path d="M142 78.6 L147 80 L142 81.6 Z" fill="#a8acb0"/>`
      + `</g>`
      + `<path d="M150 40 Q154 52 148 62" fill="none" stroke="#3a2a18" stroke-width="1.2"/><path d="M144 62 Q150 70 156 62 Q158 56 154 52" fill="none" stroke="url(#@st)" stroke-width="3"/>`);
  }

  /* the Finadd's Edur mail: a long shirt of close-linked mail, dark as wet slate with a faint blue-grey sheen, laid flat, short sleeves,
     laced at the side where somebody cut it down for Letherii shoulders */
  { const d = 'M64 30 L136 30 L160 44 L152 60 L140 54 L142 128 L58 128 L60 54 L48 60 L40 44 Z';
    let rings = ''; for (let r = 0; r < 18; r++) for (let c = 0; c < 16; c++) { const x = 60 + c*5.4 + (r % 2)*2.7, y = 34 + r*5.2; if (x < 58 || x > 142) continue; rings += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9" fill="none" stroke="#7a8a98" stroke-opacity="${(.22 + ((r + c) % 3)*.08).toFixed(2)}" stroke-width=".7"/>`; }
    put('b7_c3_edurmail', 'The Finadd\'s Edur mail',
      lin('ml', [[0, '#4a5462'], [.5, '#2a3038'], [1, '#14181e']], 0, 1),
      sh(100, 134, 66, 6)
      + S(d, 'url(#@ml)')
      + `<g clip-path="none">${rings}</g>`
      + `<path d="M84 30 Q100 40 116 30" fill="none" stroke="#0a0c10" stroke-width="3"/>`
      + Array.from({length: 6}, (_, i) => `<path d="M140 ${66 + i*10} l5 3 l-5 3" fill="none" stroke="#8a6a40" stroke-width="1.2"/>`).join('')
      + `<path d="M70 40 Q90 34 104 38" fill="none" stroke="#c8d8e8" stroke-opacity=".22" stroke-width="2"/>`);
  }

  /* a corner of the debt-roll: a charred triangle of parchment, three ruled lines in a steward's hand, the figures beside them gone to
     brown stain; a scrap of faded ribbon still tied through a hole at the corner */
  { const d = 'M50 34 L156 40 Q160 42 158 48 L120 118 Q114 124 108 118 L46 46 Q44 38 50 34 Z';
    let lines = ''; for (let i = 0; i < 3; i++) { const y = 52 + i*12; lines += `<path d="M${62 + i*10} ${y} L${146 - i*16} ${y + 2}" stroke="#5a3a1c" stroke-opacity=".35" stroke-width=".6"/><path d="M${64 + i*10} ${y - 2} q4 -2 8 0 t8 0 t7 0 t6 0" fill="none" stroke="#2a1608" stroke-opacity=".7" stroke-width=".8"/><ellipse cx="${132 - i*16}" cy="${y - 1}" rx="${8 - i}" ry="3" fill="#4a2a10" fill-opacity=".45"/>`; }
    put('b7_c3_ledgerash', 'A corner of the debt-roll',
      `<radialGradient id="@pg" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#e0c898"/><stop offset=".5" stop-color="#b08850"/><stop offset=".8" stop-color="#4a2a12"/><stop offset="1" stop-color="#120804"/></radialGradient>`,
      sh(104, 126, 52, 5)
      + `<g transform="rotate(6 100 76)">${S(d, 'url(#@pg)')}${lines}`
      + `<path d="M120 118 Q130 100 128 92 Q138 80 140 72 L158 48 L120 118 Z" fill="#0e0602"/><path d="M108 118 Q98 110 96 100 Q86 94 84 86 L46 46 L108 118 Z" fill="#0e0602" fill-opacity=".85"/>`
      + Array.from({length: 4}, (_, i) => `<circle cx="${(124 + i*8).toFixed(1)}" cy="${(108 - i*14).toFixed(1)}" r="1" fill="#ff7a30" fill-opacity=".7"/>`).join('')
      + `<circle cx="56" cy="40" r="2.6" fill="#120804"/><path d="M56 40 Q46 30 38 34 M56 40 Q50 52 40 54" fill="none" stroke="#8a5a6a" stroke-width="3" stroke-linecap="round"/><path d="M56 40 Q46 30 38 34" fill="none" stroke="#c8a0a8" stroke-opacity=".3" stroke-width="1"/>`
      + `</g>`);
  }
})();
