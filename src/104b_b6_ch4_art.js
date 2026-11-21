/* ============ Book Six, Chapter 4 art: G'danisban — the Host's camp before the city in the rain; Ressa; the chapter's gear ============ */
/* Ressa (the brief's one new figure for Ch4): a battle figure (FIGX, 18) and a painted bust (POR, 19). Lean, twenty-four, a dyer's apron
   over a quilted coat, two long knives, dark hair pulled back and wet; her fingers dyed blue to the wrist (the brief's "Ressa's blue
   fingers", and her TPL gear line: "a dyer's blue on her fingers that will not wash out"). Rim in her own colour (#9a8aa8).
   One backdrop (SCENEX.b6_gdanisban_rain, replacing 100's borrowed b3_c2_herds_rain): the Host's camp in the mud under a low sky, tent
   rows in Book Three's blue-grey canvas going back to a grey city on its rise; two thin smokes over the city, far off and nothing more;
   the surgeons' big tent near, a lamp in its flap; duckboards, puddles, rain. On S.f.b6_soliel (the morning the fever breaks for many,
   fixed by the brief) the rain thins to nothing and a pale light comes through. The plague is at a distance only: no sick shown,
   no pyres close, the temples a skyline. sceneLayer caches the still parts; REDUCE() holds the rain, ripples and lamp still.
   Item art (ART['item/<key>']) in the series look of 89f/89g: 200×150, light from the upper left, a soft ground shadow, a thin dark
   outline, long things on the lower-left to upper-right diagonal; Book Six's Fourth on a rain-slate vignette (Claude's call). */

/* ---------------- Ressa: the battle figure ---------------- */
FIGX.ressa = function(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1); const sway = o.still ? 0 : Math.sin(t/520 + (o.phase || 0))*.4;
  h.legs('#2a2630'); ctx.fillStyle = '#1a1612'; ctx.fillRect(-4.5, 10.6, 3.4, 2.4); ctx.fillRect(1.1, 10.6, 3.4, 2.4); // boots, wet through
  /* the far knife, held low and back */
  B2F.line(ctx, '#2a3466', 1.6, [[-6.4, 4.4], [-7.4, 2]]); B2F.line(ctx, '#c4c6c8', 1.1, [[-7.4, 2], [-11.6, -6 + sway]]);
  h.torso('#6a6274', '#221e28', 5.6); ctx.strokeStyle = 'rgba(0,0,0,.24)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(-5.4, -4 + i*2.6); ctx.lineTo(5.4, -4 + i*2.6); } ctx.stroke(); // the quilted coat
  poly(ctx, [[-3.4,-4.6],[3.4,-4.6],[4.6,9],[-4.6,9]], h.armor('#3e4a7a', '#141a34')); ctx.fillStyle = 'rgba(90,120,200,.35)'; ctx.fillRect(-2.6, 1.4, 2, 2.4); ctx.fillRect(1, 5, 2.4, 1.6); // the dyer's apron, splashed
  ctx.fillStyle = '#2a2018'; ctx.fillRect(-5.2, 2.6, 10.4, 1); // the apron's tie
  h.head('#b8906e', 4.1, -11.2); h.look('rgba(22,14,10,.86)', -11.4);
  B2F.cap(ctx, '#18120e', 4.4, -12.3, 1.02, 1.98); ell(ctx, -4.2, -11.6, 2, 2.2, '#18120e'); B2F.line(ctx, '#18120e', .7, [[1.4, -15], [3.4, -9.6]]); // dark hair pulled back to a knot; one wet strand loose
  ctx.fillStyle = 'rgba(200,210,230,.28)'; ctx.fillRect(-3, -16, 2.6, .7); // rain on it
  /* the near knife, held forward and low, in a blue hand */
  ctx.fillStyle = '#3a48a0'; ell(ctx, 6.6, 3.2, 1.7, 1.6, '#3a48a0'); ctx.fillStyle = '#5a6ad0'; ctx.fillRect(5.6, 2.2, 1, .8); // the hand, dyed
  B2F.line(ctx, '#2a3466', 1.6, [[6.6, 4], [7.6, 1.6]]); B2F.line(ctx, '#d0d2d4', 1.2, [[7.6, 1.6], [12.6, -5.4 - sway]]); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(9.4, -2, .6, .6);
  ell(ctx, -6.6, 4, 1.5, 1.4, '#3a48a0'); // the far hand
  ctx.restore(); };

/* ---------------- the priest of the Mistress (b6_c4_plaguepriest; art-reuse audit, Nov 15, 2026) ----------------
   Book Six's own figure for Poliel's priest at the camp's edge, who wore Book Three's Pannion priest until now. Looks only: the foe's
   kind stays 'b3_c4_priest' for the engine; FOES.b6_c4_plaguepriest.fig names this figure. No source describes her priests (open):
   sallow and shaven, an ash-and-ochre robe with a dull mustard stole, the hands bound in stained linen, an iron censer on a crook-headed
   staff with a grey-green thread of smoke. The marked are "pale healed scars, said once or twice" (bh-ch6-notes): two small marks, no more. */
FIGX.b6_c4_plaguepriest = function(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.04); const st = o.still ? 0 : t, sw = Math.sin(st/560 + (o.phase || 0));
  const cx = 11.6 + sw*.5; // the censer swings a little on its chain
  B2F.line(ctx, '#3a2c1c', 1.3, [[8.2, 13], [8.8, -18]]); B2F.line(ctx, '#3a2c1c', 1.2, [[8.8, -18], [10.4, -19.6], [11.8, -18.4]]); // the staff, its crook
  B2F.line(ctx, '#4a4640', .45, [[11.8, -18.4], [cx, -12]]); // the chain
  poly(ctx, [[cx - 1.9, -11.6], [cx + 1.9, -11.6], [cx + 1.5, -8.8], [cx - 1.5, -8.8]], '#3e3a34'); poly(ctx, [[cx - 1.4, -12.6], [cx + 1.4, -12.6], [cx + 1.9, -11.6], [cx - 1.9, -11.6]], '#56504a'); // the censer, pierced lid
  ctx.fillStyle = 'rgba(214,170,90,.55)'; ctx.fillRect(cx - .9, -10.8, .6, .6); ctx.fillRect(cx + .3, -10.2, .6, .6); // the coals through the holes
  for (let i = 0; i < 4; i++) { const k = ((st/700) + i/4) % 1; ell(ctx, cx + Math.sin(st/380 + i*1.7)*1.4 - k*1.6, -13 - k*9, .9 + k*1.6, .7 + k*1.1, `rgba(150,168,128,${(.42*(1 - k)).toFixed(3)})`); } // the smoke, grey-green, drifting back
  h.legs('#2a2418');
  B2F.robe(ctx, h, '#8e8060', '#2e2616', 6.4, 8.2); ctx.fillStyle = 'rgba(0,0,0,.24)'; ctx.fillRect(1.4, -4, .6, 15); ctx.fillRect(-4, -1, .5, 12); // the robe, the colour of old ash, its folds
  ctx.fillStyle = 'rgba(255,240,200,.1)'; ctx.fillRect(-7, -4, 1.4, 15); // its lit edge
  ctx.fillStyle = 'rgba(70,58,28,.45)'; ctx.fillRect(-7.6, 9.6, 15.2, 2.4); // the hem, stained
  poly(ctx, [[-3.4,-6],[-1.2,-6],[-1.6,11.6],[-3.8,11.6]], '#8a7224'); poly(ctx, [[1.4,-6],[3.6,-6],[3.6,11.6],[1.4,11.6]], '#7a6420'); // the stole, dull mustard, to the hem
  ctx.fillStyle = '#4a3c14'; ctx.fillRect(-3.8, 9.8, 2.2, .8); ctx.fillRect(1.4, 9.8, 2.2, .8); // its dark bands
  ell(ctx, 7.8, .2, 1.9, 1.8, '#c8bea4'); B2F.line(ctx, 'rgba(110,96,60,.7)', .4, [[6.4, -.4], [9.2, .8]]); // the hand on the staff, bound in linen
  poly(ctx, [[-6.4,-5.6],[-8.8,-4.4],[-9.2,2.2],[-6.8,2.2]], '#6e6248'); ell(ctx, -8, 3.2, 1.4, 1.3, '#c0b69c'); ctx.fillStyle = 'rgba(120,100,50,.5)'; ctx.fillRect(-9.2, 2.8, 2.4, .5); // the far sleeve, the hand bound too
  poly(ctx, [[-5.8,-6.6],[5.8,-6.6],[4.2,-3.4],[-4.2,-3.4]], '#5e5236'); // the cowl, fallen back on the shoulders
  h.head('#a89a70', 4.4, -11.2); ctx.fillStyle = 'rgba(70,60,36,.35)'; ctx.fillRect(-1.4, -10.4, 2, .9); ctx.fillRect(1.6, -10.4, 2, .9); // hollow under the eyes
  h.look('rgba(30,24,12,.9)', -11.6); ctx.fillStyle = 'rgba(255,250,220,.22)'; ctx.fillRect(-3, -15.4, 3.4, .8); // the shaven crown's shine
  ell(ctx, -2.6, -13.4, .9, .6, 'rgba(150,120,90,.75)'); ell(ctx, 2.8, -8.8, .7, .5, 'rgba(150,120,90,.7)'); // two marks, healed pale
  ctx.fillStyle = 'rgba(40,30,16,.55)'; ctx.fillRect(-.6, -8.4, 2.4, .6); // a thin mouth
  ctx.restore(); };

/* ---------------- Ressa: the bust (in bust units, shoulders at y = 0, the face about y = −74) ---------------- */
POR.ressa = function(ctx){ const F = {cy:-73, w:12, h:19, jaw:.68, chin:4, skin:'#c09676', iris:'#4a4038', lip:'#a0605a', browCol:'#2a1c16', browW:.85, arch:1.2, browL:.15, browR:0,
    rim:'#9a8aa8', rimA:.2, nose:.9, look:.15, open:.9, smileL:-.2, smileR:-.05, mouthW:3.4, bags:.55, age:0};
  PR.neck(ctx, F, 8.4); BP.throat(ctx, F, -44);
  const B = BP.body(ctx, F, {wide:38, drop:4, trap:1.5, v:true, nx:10.8, ny:F.cy + 16.4, cb:-41, c1:'#6e6678', c2:'#16141a'}); ctx.save(); B.path(); ctx.clip(); // the quilted coat
    BP.quilt(ctx, -44, 44, -62, 4, 6.2, 'rgba(20,16,26,.55)'); PR.soft(ctx, -22, -40, 14, 8, '#fff0d8', .1);
    const bib = () => { ctx.beginPath(); ctx.moveTo(-15, -36); ctx.lineTo(15, -36); ctx.lineTo(19, 6); ctx.lineTo(-19, 6); ctx.closePath(); }; // the dyer's apron, a bib over the coat
    bib(); ctx.fillStyle = PR.lit(ctx, '#465488', '#141a36', -19, 19); ctx.fill(); ctx.save(); bib(); ctx.clip();
      const r = PR.rng(131); for (let i = 0; i < 16; i++) PR.soft(ctx, -16 + r()*32, -34 + r()*38, 2 + r()*5, 1.6 + r()*4, i % 3 ? '#0a0e26' : '#7a90e0', i % 3 ? .35 : .28, r()*3); // the dye, in splashes and old stains
      PR.stroke(ctx, 'rgba(0,0,0,.35)', .8, () => { ctx.moveTo(-6, -36); ctx.quadraticCurveTo(-8, -14, -6, 6); ctx.moveTo(8, -36); ctx.quadraticCurveTo(10, -14, 9, 6); }); // folds
      PR.stitch(ctx, 'rgba(200,210,240,.3)', .4, () => { ctx.moveTo(-14.4, -35); ctx.lineTo(14.4, -35); }); ctx.restore();
    PR.stroke(ctx, 'rgba(0,0,0,.6)', .5, bib);
    [-1, 1].forEach(sd => { ctx.strokeStyle = PR.lit(ctx, '#3e4a7a', '#10142a', -10, 10); ctx.lineWidth = 3; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(sd*13.6, -35.4); ctx.lineTo(sd*B.nx*.9, B.ny + 4); ctx.stroke(); }); // the bib's straps, round the neck
    for (let i = 0; i < 9; i++) { const x = -30 + hash(i, 1311)*20, y = -42 + hash(i, 1312)*20; ell(ctx, x, y, .7, .9, 'rgba(220,230,250,.5)'); ell(ctx, x + .3, y + .4, .4, .4, 'rgba(255,255,255,.7)'); } // rain beading on the lit shoulder
  ctx.restore(); BP.light(ctx, F, B, true);
  F.under = (ctx, F) => { PR.soft(ctx, -5, F.cy + 1.6, 3.6, 2, '#2a1a24', .22); PR.soft(ctx, 5, F.cy + 1.6, 3.6, 2, '#2a1a24', .26); }; // hollows under the eyes: she sleeps sitting up
  PR.face(ctx, F);
  /* dark hair, wet, pulled back hard; a few strands stuck to the brow and cheek */
  ctx.beginPath(); ctx.moveTo(-13, F.cy + 1); ctx.bezierCurveTo(-14.6, F.cy - 14, -8.4, F.cy - 21.6, 0, F.cy - 21.4); ctx.bezierCurveTo(8.6, F.cy - 21.6, 14.4, F.cy - 14, 13, F.cy + 1);
  ctx.quadraticCurveTo(12.4, F.cy - 5.4, 4.6, F.cy - 8.9); ctx.quadraticCurveTo(0, F.cy - 9.8, -4.6, F.cy - 8.9); ctx.quadraticCurveTo(-12.4, F.cy - 5.4, -13, F.cy + 1); // v13.62.7: the hairline lower and the hair darker, so no scalp reads through it
  ctx.fillStyle = PR.lin(ctx, -14, 0, 14, 0, [[0, '#2e221c'], [.42, '#18100c'], [1, '#050303']]); ctx.fill();
  PR.strands(ctx, 34, ['#2e221c', '#120c0a', '#4a3a30'], .5, 133, (i, r) => { const sd = r() < .5 ? -1 : 1, x0 = sd*r()*3, y0 = F.cy - 9.6; return [x0, y0, x0 + sd*5, F.cy - 21, sd*(8 + r()*5), F.cy - 18 + r()*13]; });
  PR.strands(ctx, 8, ['#2e221c', '#120c0a', '#4a3a30'], .55, 139, (i, r) => { const sd = i % 2 ? 1 : -1, x = sd*(F.w + .4 + r()*1.2); return [x, F.cy - 8, x + sd*(1 + r()*1.4), F.cy + 2, x + sd*(.4 + r()*1.2), F.cy + 9 + r()*4]; }); // loose locks by the cheeks, wet, come out of the knot
  ell(ctx, -13.6, F.cy - 9, 4.4, 5.2, PR.lin(ctx, -18, 0, -9, 0, [[0, '#4a3a30'], [.5, '#22180f'], [1, '#080505']])); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { ctx.ellipse(-13.6, F.cy - 9, 4.4, 5.2, 0, 0, 7); });
  PR.stroke(ctx, 'rgba(120,90,70,.4)', .4, () => { ctx.ellipse(-13.6, F.cy - 9, 2.6, 3.4, .3, 3.4, 5.6); }); ctx.fillStyle = '#5a4a8a'; ctx.fillRect(-11.4, F.cy - 12, 1.6, 6); // the knot, tied with a strip of dyed cloth
  PR.stroke(ctx, 'rgba(200,214,236,.32)', .6, () => { ctx.moveTo(-9, F.cy - 17); ctx.quadraticCurveTo(-4, F.cy - 21, 2, F.cy - 20.6); }); // the wet sheen
  PR.strands(ctx, 3, ['#1a120e', '#2e221c'], .45, 137, (i, r) => { const x = 3 + i*1.6, y = F.cy - 9.2; return [x, y, x + 2, y + 3, x + 1.4 + r()*2, y + 10 + i*2.4]; }); // strands stuck to her brow
  /* a long knife held up by the left shoulder, in a hand dyed blue to the wrist */
  ctx.save(); ctx.translate(-29, -18); ctx.rotate(-.12);
    const bl = () => { ctx.beginPath(); ctx.moveTo(-2.2, -14); ctx.lineTo(2.4, -14); ctx.lineTo(2.2, -50); ctx.quadraticCurveTo(1.8, -58, -.6, -62); ctx.lineTo(-2.2, -50); ctx.closePath(); };
    ctx.save(); ctx.filter = 'blur(1px)'; ctx.translate(1.6, 1.4); bl(); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fill(); ctx.restore();
    bl(); ctx.fillStyle = PR.lin(ctx, -2.2, 0, 2.4, 0, [[0, '#eef0f2'], [.45, '#a8acb0'], [1, '#3a3e42']]); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.6)', .5, bl);
    PR.stroke(ctx, 'rgba(255,255,255,.6)', .4, () => { ctx.moveTo(-1.4, -16); ctx.lineTo(-1.4, -50); }); PR.soft(ctx, .4, -18, 1.6, 2.4, '#2a3a8a', .55); // a blue thumbprint on the steel
    ctx.fillStyle = PR.lin(ctx, -3.4, 0, 3.4, 0, [[0, '#8a7a5a'], [.5, '#4a3e2a'], [1, '#14100a']]); ctx.fillRect(-3.6, -15.6, 7.2, 2); ctx.restore();
  BP.grip(ctx, -29, -18, -.12, -6, 3.8, ['#4a5a9a', '#26305e', '#0a0e22'], {k:'glove', c:['#6a7ac8', '#34408a', '#0c1030']}, null, 0, -14); // the grip, stained; the hand, blue
  ctx.save(); ctx.translate(-29, -18); ctx.rotate(-.12); const cf = () => PR.path(ctx, [[-8.6, 4], [8, 4], [10, 26], [-10.6, 26]]); cf(); ctx.fillStyle = PR.lit(ctx, '#6e6678', '#16141a', -10, 10); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.6)', .5, cf);
    PR.stitch(ctx, 'rgba(20,16,26,.6)', .4, () => { for (let i = 0; i < 3; i++){ ctx.moveTo(-9, 9 + i*6); ctx.lineTo(9, 9 + i*6); } }); PR.soft(ctx, 3, 5, 6, 2, '#2a3a8a', .35); ctx.restore(); // the coat's sleeve, blue where the hand meets it
  return F; };

/* ---------------- the backdrop: b6_gdanisban_rain ---------------- */
/* a ridge tent in a Host line, s ~ 1 small and far: canvas lit on the left face */
function b64Tent(x, tx, ty, s, col, dk){ x.fillStyle = col; x.beginPath(); x.moveTo(tx - 3.2*s, ty); x.lineTo(tx - .4*s, ty - 3.4*s); x.lineTo(tx + .4*s, ty - 3.4*s); x.lineTo(tx + 3.2*s, ty); x.fill();
  x.fillStyle = dk; x.beginPath(); x.moveTo(tx + .4*s, ty - 3.4*s); x.lineTo(tx + 3.2*s, ty); x.lineTo(tx + .8*s, ty); x.fill(); x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(tx - .5*s, ty - 1.8*s, 1*s, 1.8*s); }
/* the city on its rise: a grey wall with square towers, flat roofs and a few domes above it, two thin smokes going up from inside */
function b64City(x, W, H, hz, clear){ const c0 = clear ? '#6e7276' : '#565c62', c1 = clear ? '#5a5e62' : '#464c52', x0 = W*.48, x1 = W*.96, wy = hz - H*.05;
  x.fillStyle = clear ? '#5e5c54' : '#4a4c4a'; x.beginPath(); x.moveTo(W*.36, hz + 1); x.quadraticCurveTo(W*.6, hz - H*.05, W*.72, hz - H*.055); x.quadraticCurveTo(W*.9, hz - H*.05, W*1.02, hz + 1); x.fill(); // the rise
  for (let i = 0; i < 26; i++) { const rx = x0 + W*.02 + hash(i, 6401)*(x1 - x0 - W*.04), rw = W*(.012 + hash(i, 6402)*.03), rh = H*(.02 + hash(i, 6403)*.04); x.fillStyle = i % 2 ? c1 : c0; x.fillRect(rx, wy - rh, rw, rh + 2); } // roofs behind the wall
  [[.6, .034], [.71, .046], [.8, .03]].forEach(([u, r]) => { x.fillStyle = c1; x.beginPath(); x.arc(W*u, wy - H*.045, W*r*.55, Math.PI, 0); x.fill(); x.fillRect(W*u - W*r*.55, wy - H*.046, W*r*1.1, H*.03); x.fillStyle = clear ? 'rgba(230,226,210,.18)' : 'rgba(200,206,214,.1)'; x.beginPath(); x.arc(W*u, wy - H*.045, W*r*.55, Math.PI, Math.PI*1.4); x.lineTo(W*u, wy - H*.045); x.fill(); }); // domes: temples, a skyline only
  x.fillStyle = c0; x.fillRect(x0, wy, x1 - x0, H*.04); for (let px = x0; px < x1; px += W*.012) x.fillRect(px, wy - H*.008, W*.006, H*.01); // the wall, crenellated
  for (let i = 0; i < 6; i++) { const tx = x0 + (x1 - x0)*i/5 - W*.012; x.fillStyle = c1; x.fillRect(tx, wy - H*.03, W*.024, H*.07); x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(tx + W*.016, wy - H*.03, W*.008, H*.07); } // towers
  x.fillStyle = 'rgba(0,0,0,.45)'; x.fillRect(W*.7, wy + H*.012, W*.016, H*.028); } // a gate, shut
/* rain: slanting streaks falling, in the frame */
function b64Rain(ctx, W, H, t, mo, n, a){ ctx.strokeStyle = `rgba(206,214,224,${a})`; ctx.lineWidth = .8; ctx.beginPath();
  for (let i = 0; i < n; i++) { const sp = 1 + hash(i, 6411)*.7, k = mo ? ((t/650*sp + hash(i, 6412)) % 1) : hash(i, 6412), px = hash(i, 6413)*W*1.2 - k*H*.22, py = k*H*1.1 - 10; ctx.moveTo(px, py); ctx.lineTo(px - 2.6, py + 9); } ctx.stroke(); }
/* v13.33 (pictures against text): the chapter's end page is "after the rain" (both captions): no rain, the sky lifting, and the Host gathered
   in the mud (vote, the Fourth at the back of it) or gathered round one tent behind the picket line (out) */
SCENEX.b6_gdanisban_rain = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, end = !!S && S.scene === 'chend' && S.chapter === 4, ek = end ? ((S.chapters && S.chapters[4]) || f.b6_c4_key || 'vote') : null, clear = !!f.b6_soliel || end, hz = H*.46;
  const puddles = [[.3, .72, .1], [.62, .78, .14], [.86, .7, .07], [.14, .86, .09], [.5, .9, .12]];
  ctx.drawImage(sceneLayer('b64:camp' + (clear ? 'c' : 'r') + (end ? 'e' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, clear ? [[0, '#3c4452'], [.45, '#76808a'], [.85, '#c4bea8'], [1, '#d6ccae']] : [[0, '#23272e'], [.5, '#454b54'], [1, '#737880']]); x.fillRect(0, 0, W, hz + 2);
    if (clear && !end) glow(x, W*.3, hz*.55, W*.32, '#fff2cc', .3); // a pale sun coming through, low in the east
    if (end) glow(x, W*.3, hz*.4, W*.4, '#f4f0e0', .18); // after the rain: the cloud lifting, no sun through it yet
    for (let i = 0; i < 12; i++) { const cx = hash(i, 6421)*W, cy = hz*(.08 + hash(i, 6422)*.6), w = W*(.12 + hash(i, 6423)*.24); x.fillStyle = clear ? `rgba(40,46,58,${(.1 + hash(i, 6424)*.12).toFixed(3)})` : `rgba(16,18,24,${(.1 + hash(i, 6424)*.16).toFixed(3)})`; x.beginPath(); x.ellipse(cx, cy, w, 4 + hash(i, 6425)*9, 0, 0, 7); x.fill(); } // torn cloud
    if (!clear) for (let i = 0; i < 4; i++) { const cx = W*(.1 + i*.26 + hash(i, 6426)*.1), cw = W*(.08 + hash(i, 6427)*.08); x.lineWidth = 1; for (let j = 0; j < 26; j++) { const lx = cx + hash(i, j, 6428)*cw, e = Math.sin(Math.PI*(lx - cx)/cw); x.strokeStyle = `rgba(28,32,38,${(.08 + .14*e).toFixed(3)})`; x.beginPath(); x.moveTo(lx, hz*(.34 + hash(i, j, 6429)*.1)); x.lineTo(lx - W*.02, hz - H*.01); x.stroke(); } } // grey curtains of rain hanging under the cloud
    [[.64, 1], [.76, .8]].forEach(([u, k], i) => { for (let j = 0; j < 7; j++) { const sx = W*u - j*W*.01*k, sy = hz - H*.09 - j*H*.026; x.fillStyle = `rgba(${clear ? '86,86,86' : '52,54,58'},${(.2 - j*.025).toFixed(3)})`; ell(x, sx, sy, W*(.005 + j*.003), H*(.008 + j*.003), x.fillStyle); } }); // two thin smokes over the city, far off
    b64City(x, W, H, hz, clear);
    x.fillStyle = vgrad(x, hz, H, clear ? [[0, '#5a5444'], [.4, '#4a4232'], [1, '#2a241a']] : [[0, '#45443e'], [.4, '#3a362c'], [1, '#1c1a14']]); x.fillRect(0, hz, W, H - hz); // the plain, mud
    for (let i = 0; i < 70; i++) { const py = hz + 3 + Math.pow(hash(i, 6431), 1.4)*(H - hz), d = (py - hz)/(H - hz); x.fillStyle = `rgba(14,12,8,${(.15 + d*.2).toFixed(2)})`; x.fillRect(hash(i, 6432)*W, py, 4 + d*26, .8 + d*1.2); } // ruts
    /* the tent rows, going back toward the city */
    for (let r = 0; r < 6; r++) { const k = r/5, ty = lerp(hz + H*.025, hz + H*.18, Math.pow(k, 1.4)), s = lerp(1, 2.3, k), n = Math.round(lerp(24, 11, k));
      for (let i = 0; i < n; i++) { const tx = W*(i/(n - 1)) + (r % 2)*W*.02 + (hash(r, i, 6433) - .5)*W*.03; if ((tx < W*.3 && r > 2) || hash(r, i, 6434) < .12) continue;
        b64Tent(x, tx, ty, s, clear ? ['#7a8494', '#8a92a0', '#6e7888'][i % 3] : ['#5c6674', '#66707e', '#525c6a'][i % 3], clear ? '#3a4250' : '#2a3038'); } }
    for (let i = 0; i < 5; i++) { const px = W*(.38 + i*.14), py = hz + H*.12; x.fillStyle = '#2a241c'; x.fillRect(px, py - H*.05, 1.2, H*.05); x.fillStyle = clear ? '#7a5a3a' : '#5a4630'; x.fillRect(px + 1.2, py - H*.05, W*.014, H*.016); } // standards on poles, hanging wet
    /* the surgeons' tent, big and near on the left: a long canvas roof, the flap tied open */
    const sx = W*.02, sw = W*.3, sb = H*.8, sh = H*.3; x.fillStyle = 'rgba(0,0,0,.4)'; x.beginPath(); x.ellipse(sx + sw*.5, sb + 2, sw*.6, H*.025, 0, 0, 7); x.fill();
    x.fillStyle = clear ? '#9a988a' : '#7a7a70'; x.beginPath(); x.moveTo(sx, sb); x.lineTo(sx + sw*.12, sb - sh*.62); x.lineTo(sx + sw*.5, sb - sh); x.lineTo(sx + sw*.88, sb - sh*.62); x.lineTo(sx + sw, sb); x.fill();
    x.fillStyle = clear ? '#6a685c' : '#4e4e46'; x.beginPath(); x.moveTo(sx + sw*.5, sb - sh); x.lineTo(sx + sw*.88, sb - sh*.62); x.lineTo(sx + sw, sb); x.lineTo(sx + sw*.56, sb); x.fill();
    x.strokeStyle = 'rgba(0,0,0,.3)'; x.lineWidth = .8; x.beginPath(); for (let i = 1; i < 5; i++) { x.moveTo(sx + sw*.5, sb - sh); x.lineTo(sx + sw*i/5, sb); } x.stroke(); // the seams
    x.fillStyle = 'rgba(30,24,16,.35)'; x.fillRect(sx, sb - H*.03, sw, H*.03); // mud splashed up the canvas
    x.fillStyle = '#120e0a'; x.beginPath(); x.moveTo(sx + sw*.34, sb); x.lineTo(sx + sw*.44, sb - sh*.62); x.lineTo(sx + sw*.56, sb - sh*.62); x.lineTo(sx + sw*.64, sb); x.fill(); // the open flap
    x.fillStyle = clear ? '#b0ae9e' : '#8a8a7e'; x.beginPath(); x.moveTo(sx + sw*.44, sb - sh*.62); x.lineTo(sx + sw*.3, sb - sh*.2); x.lineTo(sx + sw*.36, sb); x.lineTo(sx + sw*.38, sb - sh*.3); x.fill(); // tied back
    x.strokeStyle = '#2a2018'; x.lineWidth = 1; x.beginPath(); x.moveTo(sx + sw*.5, sb - sh); x.lineTo(sx + sw*.5, sb - sh - H*.04); x.moveTo(sx, sb); x.lineTo(sx - W*.02, sb + H*.01); x.moveTo(sx + sw, sb); x.lineTo(sx + sw + W*.03, sb + H*.012); x.stroke(); // pole and guys
    /* duckboards across the mud from the flap toward the viewer */
    for (let i = 0; i < 9; i++) { const k = i/8, bx = lerp(sx + sw*.5, W*.42, k), by = lerp(sb + H*.01, H*.99, k), bw = lerp(W*.04, W*.09, k); x.fillStyle = clear ? '#6a5a42' : '#4a3e2c'; x.fillRect(bx - bw/2, by, bw, 1.6 + k*2.2); x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(bx - bw/2, by + 1.4 + k*2, bw, .8); }
    /* puddles, holding the sky */
    puddles.forEach(([u, v, r]) => { const px = W*u, py = H*v; x.fillStyle = 'rgba(0,0,0,.35)'; x.beginPath(); x.ellipse(px, py + 1, W*r*1.06, H*.024, 0, 0, 7); x.fill(); x.fillStyle = vgrad(x, py - H*.02, py + H*.02, clear ? [[0, '#a8aaa0'], [1, '#6a6c66']] : [[0, '#6a7078'], [1, '#3a3e44']]); x.beginPath(); x.ellipse(px, py, W*r, H*.02, 0, 0, 7); x.fill(); x.fillStyle = clear ? 'rgba(255,246,214,.3)' : 'rgba(210,220,232,.16)'; x.fillRect(px - W*r*.5, py - H*.004, W*r*.6, .8); });
  }), 0, 0, W, H);
  /* the lamp in the surgeons' flap */
  { const lx = W*.02 + W*.3*.5, ly = H*.8 - H*.3*.3, fl = mo ? .82 + Math.sin(t/140)*.1 + Math.sin(t/53)*.06 : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.14, '#ffb060', (clear ? .2 : .38)*fl); ctx.globalCompositeOperation = 'source-over'; ell(ctx, lx, ly, 1.8, 2.4, `rgba(255,214,140,${(.9*fl).toFixed(2)})`); }
  /* a few of the Host far off between the rows, cloaked and hunched */
  for (let i = 0; i < 4; i++) { const k = mo ? ((t/50000 + hash(i, 6441)) % 1) : hash(i, 6441), px = W*(.36 + k*.5), py = hz + H*(.08 + hash(i, 6442)*.1), s = .32 + (py - hz)/H*.9;
    ctx.fillStyle = 'rgba(26,30,36,.85)'; ctx.fillRect(px - 2*s, py - 9*s, 4*s, 9*s); ell(ctx, px, py - 10*s, 1.8*s, 1.8*s, ctx.fillStyle); }
  /* ripples in the puddles while it rains */
  if (!clear) puddles.forEach(([u, v, r], j) => { for (let i = 0; i < 3; i++) { const k = mo ? ((t/900 + hash(j, i, 6451)) % 1) : .5, px = W*u + (hash(j, i, 6452) - .5)*W*r*1.2, py = H*v + (hash(j, i, 6453) - .5)*H*.016;
    ctx.strokeStyle = `rgba(220,228,238,${(.4*(1 - k)).toFixed(2)})`; ctx.lineWidth = .6; ctx.beginPath(); ctx.ellipse(px, py, 1 + k*5, .4 + k*1.4, 0, 0, 7); ctx.stroke(); } });
  if (end) { const tx = W*.66, ty = hz + H*.15; // the Host gathered: a dark crowd on the mud, every face one way
    if (ek === 'out') { ctx.fillStyle = '#8a8a7e'; ctx.beginPath(); ctx.moveTo(tx - W*.05, ty); ctx.lineTo(tx - W*.01, ty - H*.07); ctx.lineTo(tx + W*.01, ty - H*.07); ctx.lineTo(tx + W*.05, ty); ctx.fill(); ctx.fillStyle = '#5a5a50'; ctx.beginPath(); ctx.moveTo(tx + W*.01, ty - H*.07); ctx.lineTo(tx + W*.05, ty); ctx.lineTo(tx + W*.012, ty); ctx.fill(); ctx.fillStyle = '#1a1612'; ctx.fillRect(tx - W*.006, ty - H*.035, W*.012, H*.035); } // the one tent
    for (let i = 0; i < 260; i++) { const a = hash(i, 6461)*6.283, rr = Math.sqrt(hash(i, 6462)), px = ek === 'out' ? tx + Math.cos(a)*rr*W*.2 : W*(.34 + hash(i, 6461)*.64), py = ek === 'out' ? ty + Math.sin(a)*rr*H*.06 + H*.01 : hz + H*(.06 + Math.pow(hash(i, 6462), .8)*.16), s = .3 + (py - hz)/H*1.1;
      if (ek === 'out' && Math.abs(px - tx) < W*.055 && py < ty + 2) continue; ctx.fillStyle = `rgba(${22 + (i % 3)*6},${26 + (i % 3)*5},${32 + (i % 3)*4},.92)`; ctx.fillRect(px - 1.8*s, py - 8*s, 3.6*s, 8*s); ell(ctx, px, py - 9*s, 1.7*s, 1.7*s, ctx.fillStyle); } }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.5 + i*18, H*.95, 1.7, t, {phase:i, dir:1}));
  if (end && ek === 'out') { ctx.strokeStyle = '#2a2018'; ctx.lineWidth = 1.4; ctx.beginPath(); for (let i = 0; i < 12; i++) { const px = W*(.4 + i*.05); ctx.moveTo(px, H*.99); ctx.lineTo(px + 3, H*.86); } ctx.stroke(); } // the picket's stakes, the Fourth among them
  if (!clear) { b64Rain(ctx, W, H, t, mo, 170, .24); ctx.fillStyle = 'rgba(40,46,56,.12)'; ctx.fillRect(0, 0, W, H); } // the rain, and the grey it puts over everything
  vign(ctx, W, H, clear ? .4 : .55, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'], the series look on Book Six's rain slate ---------------- */
(function(){
  if (typeof ART === 'undefined') return;
  const O = 'stroke="#0b0806" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"';
  const sh = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#@sh)"/>`;
  const S = (d, fill, lit = '@lit') => `<path d="${d}" fill="${fill}"/><path d="${d}" fill="url(#${lit})"/><path d="${d}" fill="none" ${O}/>`;
  const lin = (id, stops, x2 = 1, y2 = 1) => `<linearGradient id="@${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  const BASE = `<radialGradient id="@bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#2e3840"/><stop offset=".62" stop-color="#1a2228"/><stop offset="1" stop-color="#0a0e12"/></radialGradient>`
    + `<radialGradient id="@sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset=".55" stop-color="#000" stop-opacity=".32"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`
    + lin('lit', [[0, '#fff', .2], [.45, '#fff', 0], [.6, '#000', 0], [1, '#000', .42]])
    + lin('st', [[0, '#eef1f3'], [.4, '#aab2b8'], [.75, '#687078'], [1, '#353b42']], 0, 1);
  function put(key, label, defs, body){
    const P = key.replace(/[^a-z0-9]/g, '') + '-';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="${label.replace(/"/g, '&quot;')}"><defs>${BASE}${defs}</defs><rect width="200" height="150" fill="url(#@bg)"/>${body}</svg>`;
    ART['item/' + key] = svg.replace(/@/g, P);
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [200, 150];
  }
  /* a drop of rain standing on waxed cloth */
  const bead = (x, y, r = 1.6) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.15}" fill="#cfd8e2" fill-opacity=".45"/><circle cx="${x - r * .35}" cy="${y - r * .4}" r="${r * .35}" fill="#fff" fill-opacity=".85"/>`;

  /* a Host rain-cloak: heavy wool waxed against the wet, Book Three's blue-grey, a deep hood, a plain bronze ring at the throat, rain standing on it */
  { const d = 'M100 14 Q82 14 76 30 Q72 42 78 50 L52 122 Q50 132 62 134 Q100 140 138 134 Q150 132 148 122 L122 50 Q128 42 124 30 Q118 14 100 14 Z';
    const hood = 'M100 18 Q86 18 82 32 Q80 42 86 48 Q94 40 100 40 Q106 40 114 48 Q120 42 118 32 Q114 18 100 18 Z';
    put('b6_c4_raincloak', 'A Host rain-cloak',
      lin('wl', [[0, '#7a8898'], [.5, '#566474'], [1, '#2a323c']]) + lin('br', [[0, '#f0d898'], [.45, '#b88a3e'], [1, '#5a3c14']]),
      sh(100, 136, 56, 6)
      + S(d, 'url(#@wl)')
      + `<path d="M88 52 Q80 92 74 132 M100 50 Q100 92 100 138 M112 52 Q120 92 126 132" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="5"/>`
      + `<path d="M84 54 Q76 92 68 130" fill="none" stroke="#e8f0f8" stroke-opacity=".22" stroke-width="3"/><path d="M106 52 Q108 92 110 136" fill="none" stroke="#e8f0f8" stroke-opacity=".12" stroke-width="2.4"/>`
      + `<path d="M60 128 Q100 136 140 128" fill="none" stroke="#d8e0e8" stroke-opacity=".45" stroke-width="1.2" stroke-dasharray="2 1.6"/>`
      + S(hood, '#4a5664') + `<path d="M88 44 Q94 36 100 36 Q106 36 112 44 Q106 40 100 40 Q94 40 88 44 Z" fill="#0e1218"/>`
      + `<path d="M86 30 Q90 20 100 20" fill="none" stroke="#e8f0f8" stroke-opacity=".3" stroke-width="1.6"/>`
      + `<circle cx="100" cy="52" r="6" fill="none" stroke="url(#@br)" stroke-width="3"/><circle cx="100" cy="52" r="6" fill="none" ${O}/><path d="M95 49 Q98 46 102 46.4" fill="none" stroke="#fff4d0" stroke-opacity=".7" stroke-width=".8"/>`
      + `<path d="M92 50 L108 54" stroke="#9a7438" stroke-width="2" stroke-linecap="round"/>`
      + [[70, 80, 1.8], [80, 104, 1.4], [92, 70, 1.6], [116, 86, 1.8], [128, 110, 1.5], [108, 120, 1.3], [64, 118, 1.6], [96, 30, 1.4], [110, 26, 1.2], [134, 96, 1.2]].map(([x, y, r]) => bead(x, y, r)).join('')
      + `<path d="M138 132 Q139 138 138 142" stroke="#cfd8e2" stroke-opacity=".5" stroke-width="1.2" stroke-linecap="round"/><ellipse cx="138" cy="143.4" rx="1.2" ry="1.5" fill="#cfd8e2" fill-opacity=".6"/>`); // a drip off the hem
  }

  /* a dyer's knives: two long single-edged knives from a G'danisban dye-yard, worn thin with the whetstone, the grips stained indigo and bound with cord, a blue print on the steel */
  { const knife = (dx, dy, k) => {
      const bl = `M${44 + dx} ${110 + dy} L${120 + dx} ${53 + dy} Q${130 + dx} ${46 + dy} ${136 + dx} ${43 + dy} Q${132 + dx} ${53 + dy} ${124 + dx} ${60 + dy} L${50 + dx} ${118 + dy} Z`;
      const gr = `M${22 + dx} ${126 + dy} L${44 + dx} ${108 + dy} L${51 + dx} ${117 + dy} L${29 + dx} ${135 + dy} Q${22 + dx} ${136 + dy} ${20 + dx} ${132 + dy} Q${19 + dx} ${128 + dy} ${22 + dx} ${126 + dy} Z`;
      return S(bl, 'url(#@st)')
        + `<path d="M${50 + dx} ${110 + dy} L${122 + dx} ${55 + dy}" stroke="#fff" stroke-opacity=".55" stroke-width=".9"/><path d="M${52 + dx} ${116 + dy} L${124 + dx} ${59 + dy}" stroke="#20262c" stroke-opacity=".5" stroke-width=".8"/>`
        + `<path d="M${82 + dx} ${86 + dy} L${94 + dx} ${77 + dy}" stroke="#8a929a" stroke-opacity=".5" stroke-width="2.4"/>` // a whetted hollow
        + `<ellipse cx="${60 + dx}" cy="${104 + dy}" rx="4.4" ry="3" transform="rotate(-37 ${60 + dx} ${104 + dy})" fill="#2a3a8a" fill-opacity="${k}"/>` // a blue thumbprint
        + `<path d="M${40 + dx} ${104 + dy} L${55 + dx} ${121 + dy}" stroke="#4a3e2a" stroke-width="3.4" stroke-linecap="round"/><path d="M${40 + dx} ${104 + dy} L${55 + dx} ${121 + dy}" fill="none" ${O}/>` // the bolster, plain iron
        + S(gr, 'url(#@gr)')
        + `<path d="M${28 + dx} ${121 + dy} L${34 + dx} ${129 + dy} M${32 + dx} ${118 + dy} L${38 + dx} ${126 + dy} M${36 + dx} ${115 + dy} L${42 + dx} ${123 + dy}" stroke="#c8bca0" stroke-opacity=".55" stroke-width="1.6"/>` // cord binding
        + `<circle cx="${24 + dx}" cy="${130 + dy}" r="1.4" fill="#c0c4c8"/>`; };
    put('b6_c4_dyerknives', 'A dyer\'s knives',
      lin('gr', [[0, '#5a6cb0'], [.5, '#2c3672'], [1, '#0e1230']]),
      sh(96, 132, 74, 6) + knife(14, 2, .5) + knife(-6, -12, .65)
      + `<path d="M120 56 Q125 61 121 68" fill="none" stroke="#5a6ad0" stroke-opacity=".35" stroke-width="1.4"/>`); // a smear of the blue on the near blade's back
  }
})();

/* ---------------- ground: TILEX.b6_c4_town — the streets outside G'danisban's walls, at night, in the rain ----------------
   A Seven Cities town: mud-brick houses plastered and flat-roofed, the odd small dome, the street packed earth gone to mud with the rain
   standing in it, the city's own wall along the north with its gate shut. Replaces Book Three's Capustan (b3_c3_city_night), which this
   chapter borrowed. The houses are 102b's b6MudWall, taller here, with window slits, nearly all of them dark. '.' the street, ',' rubble
   (broken brick, sherds, a beam), '#' a house or the city wall (blocks; the top row is the wall), 'G' the gate, shut, '=' a stall's awning,
   'w' a well, 'c' a handcart, 'p' the forward picket's post (a cart on its side, the picket's lamp); a battle's 't' is the engine's fallen
   stone. The picket's lamp is the only warm light in the street. N = night (the chapter's only use). */
const b64TP = N => N ? {mud:'#2c2925', mudL:'#38342e', grit:'#161412', sherd:'#4e3c2e', top:'#5e584e', topL:'#777064', face:'#2c2722', faceL:'#3e3832', brick:'#3a3028', brickD:'#1a1510',
    crack:'rgba(0,0,0,.35)', door:'#060504', wood:'#2a2018', woodL:'#3c2e22', iron:'#4a4c52', jar:'#3a2c22', mat:'#32302c', pool:'#14181e', poolL:'rgba(130,150,190,.24)', lit:'150,166,206', wet:'8,10,14',
    awn:[['#2a2e48', '#4a4438'], ['#4a3424', '#3e3a30']], lamp:'255,176,96', stone:'#4c4a46', stoneL:'#625f58'}
  : {mud:'#7e6e56', mudL:'#94846a', grit:'#4e4232', sherd:'#a86a44', top:'#c0ae8a', topL:'#d8caa8', face:'#988462', faceL:'#ae9a76', brick:'#8a6c4a', brickD:'#5a4630',
    crack:'rgba(90,70,44,.32)', door:'#1a120c', wood:'#5a4228', woodL:'#7a5c3a', iron:'#3a3a3e', jar:'#8a5a36', mat:'#a89a6a', pool:'#56626a', poolL:'rgba(220,230,236,.45)', lit:'255,246,226', wet:'40,32,24',
    awn:[['#34407a', '#d8ccb0'], ['#9a4a2a', '#c8a868']], lamp:'255,190,110', stone:'#a89c84', stoneL:'#c8bea6'};
const b64WallRow = y => y === 0 && !!tileMap && !!tileMap[0] && [...tileMap[0]].filter(c => c === '#' || c === 'G').length >= tileMap[0].length - 2; // the city's wall: the top row, when it is all wall and gate
function b64Lamplit(ctx, x, y, T, P, a){ if (!tileMap) return; for (let dy=-3; dy<=3; dy++) for (let dx=-3; dx<=3; dx++){ const r = tileMap[y + dy]; if (!r || r[x + dx] !== 'p') continue; // the picket's lamp, pooled on the mud round it
  const cx = (x + dx + .62)*T, cy = (y + dy + .3)*T, R = T*3.2, g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R); g.addColorStop(0, `rgba(${P.lamp},${a})`); g.addColorStop(.4, `rgba(${P.lamp},${a*.4})`); g.addColorStop(1, `rgba(${P.lamp},0)`); ctx.fillStyle = g; ctx.fillRect(x*T, y*T, T, T); } }
function b64Town(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y), P = b64TP(N), fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const mud = () => { fill(shade(P.mud, (h - .5)*.015)); b2Mottle(ctx, x, y, T, N ? .03 : .07, N ? .22 : .14, P.lit, 1.3);
    ctx.fillStyle = P.grit; for (let i=0;i<5;i++) ctx.fillRect(px + hash(x,y,i+20)*T, py + hash(y,x,i+21)*T, Math.max(1, T*.035), Math.max(1, T*.03));
    ctx.fillStyle = shade(P.mudL, .05); for (let i=0;i<3;i++) ctx.fillRect(px + hash(x,y,i+24)*T, py + hash(y,x,i+25)*T, Math.max(1, T*.04), Math.max(1, T*.025)); // a pale chip of plaster
    if (h > .84) { const cx = px + T*(.25 + hash(x,y,30)*.5), cy = py + T*(.3 + hash(x,y,31)*.4), rx = T*(.13 + hash(x,y,32)*.1); ell(ctx, cx, cy, rx*1.1, rx*.5, `rgba(${P.wet},.4)`); ell(ctx, cx, cy, rx, rx*.4, P.pool); ell(ctx, cx - rx*.3, cy - rx*.1, rx*.42, rx*.07, P.poolL); // rain standing in the ruts
      if (N) { ctx.strokeStyle = 'rgba(150,170,210,.25)'; ctx.lineWidth = 1; for (let i=0;i<2;i++){ ctx.beginPath(); ctx.ellipse(cx + (hash(x,y,i+33) - .5)*rx, cy, rx*.18, rx*.07, 0, 0, 7); ctx.stroke(); } } } // a ring where a drop lands
    else if (h < .3) b2Prints(ctx, x, y, T, 3, N, 11); };
  const rubble = () => { mud(); for (let i=0;i<6;i++){ const bx = px + T*(.08 + hash(x,y,i+40)*.7), by = py + T*(.12 + hash(x,y,i+41)*.7), w = T*(.1 + hash(x,y,i+42)*.14), hh = w*.6, sh = i%3 === 2; // broken mud-brick, a sherd or two of a jar
      ctx.save(); ctx.translate(bx, by); ctx.rotate((hash(x,y,i+43) - .5)*1.2); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(1, 2, w, hh); ctx.fillStyle = sh ? P.sherd : P.brick; ctx.fillRect(0, 0, w, hh); ctx.fillStyle = sh ? 'rgba(255,220,180,.15)' : P.topL; ctx.fillRect(0, 0, w, Math.max(1, hh*.25)); ctx.restore(); }
    if (h > .45) B2F.line(ctx, N ? '#141009' : '#3a2a1a', Math.max(1.6, T*.06), [[px + T*.12, py + T*.78], [px + T*.84, py + T*.58]]); }; // a roof-beam come down
  if (ch === '#' && b64WallRow(y)) { // the city's wall: a broad walk of plastered brick along the top, merlons on the street side, its tall face
    const fy = py + T*.36; ctx.fillStyle = shade(P.top, -.06); ctx.fillRect(px, py, T, fy - py); b2Mottle(ctx, x, y, T, .02, .2, P.lit, 1);
    for (let i=0;i<2;i++){ const mx = px + T*(.06 + i*.5); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(mx + T*.03, fy - T*.13, T*.3, T*.14); ctx.fillStyle = P.top; ctx.fillRect(mx, fy - T*.16, T*.3, T*.14); ctx.fillStyle = P.topL; ctx.fillRect(mx, fy - T*.16, T*.3, Math.max(1, T*.03)); } // merlons
    const g = ctx.createLinearGradient(0, fy, 0, py + T); g.addColorStop(0, P.faceL); g.addColorStop(1, P.face); ctx.fillStyle = g; ctx.fillRect(px, fy, T, py + T - fy);
    ctx.strokeStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(70,52,34,.3)'; ctx.lineWidth = 1; for (let r=1;r<5;r++){ const yy = fy + r*(py + T - fy)/5; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); ctx.stroke(); for (let c=0;c<3;c++){ const xx = px + ((c + (r%2)*.5)/2.5)*T; ctx.beginPath(); ctx.moveTo(xx, yy - (py + T - fy)/5); ctx.lineTo(xx, yy); ctx.stroke(); } } // big courses of brick, the plaster long gone
    ctx.fillStyle = N ? 'rgba(0,0,0,.25)' : 'rgba(60,44,30,.22)'; for (let i=0;i<3;i++) ctx.fillRect(px + hash(x,y,i+50)*T, fy + T*.02, T*(.04 + hash(x,y,i+51)*.05), (py + T - fy)*(.5 + hash(x,y,i+52)*.5)); // the rain's streaks
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px, py + T - Math.max(1, T*.05), T, Math.max(1, T*.05)); b64Lamplit(ctx, x, y, T, P, N ? .2 : .08); return; }
  if (ch === 'G') { mud(); // the gate, shut: a deep arch in the wall, two leaves of heavy timber banded in iron, the plaster round it
    const left = b2Tile(x - 1, y) !== 'G', right = b2Tile(x + 1, y) !== 'G', fy = py + T*.36;
    ctx.fillStyle = shade(P.top, -.06); ctx.fillRect(px, py, T, fy - py); ctx.fillStyle = P.face; ctx.fillRect(px, fy, T, py + T - fy);
    const ax0 = left ? px + T*.14 : px, ax1 = right ? px + T*.86 : px + T, ay = fy + T*.08; // the opening, its arch shared across the two gate tiles
    ctx.fillStyle = P.door; ctx.fillRect(ax0, ay + T*.06, ax1 - ax0, py + T - ay - T*.06); if (left) { ctx.beginPath(); ctx.moveTo(ax0, ay + T*.12); ctx.quadraticCurveTo(ax0 + T*.1, ay - T*.08, px + T, ay - T*.12); ctx.lineTo(px + T, ay + T*.12); ctx.fill(); } if (right) { ctx.beginPath(); ctx.moveTo(ax1, ay + T*.12); ctx.quadraticCurveTo(ax1 - T*.1, ay - T*.08, px, ay - T*.12); ctx.lineTo(px, ay + T*.12); ctx.fill(); }
    const lx0 = ax0 + T*.04, lx1 = ax1 - T*.04, ly = ay + T*.12; const lg = ctx.createLinearGradient(lx0, 0, lx1, 0); lg.addColorStop(0, left ? P.woodL : P.wood); lg.addColorStop(1, right ? shade(P.wood, -.2) : P.wood); ctx.fillStyle = lg; ctx.fillRect(lx0, ly, lx1 - lx0, py + T - ly); // the leaf
    ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; for (let i=1;i<4;i++){ const xx = lx0 + i*(lx1 - lx0)/4; ctx.beginPath(); ctx.moveTo(xx, ly); ctx.lineTo(xx, py + T); ctx.stroke(); } // planks
    ctx.fillStyle = P.iron; for (let i=0;i<3;i++) ctx.fillRect(lx0, ly + T*(.08 + i*.17), lx1 - lx0, Math.max(1.5, T*.04)); ctx.fillStyle = N ? 'rgba(150,166,206,.22)' : 'rgba(220,210,190,.6)'; for (let i=0;i<3;i++) for (let k=0;k<3;k++) ctx.fillRect(lx0 + T*(.1 + k*.28), ly + T*(.085 + i*.17), Math.max(1, T*.025), Math.max(1, T*.025)); // iron bands, studs
    if (right) { ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(px, ly, Math.max(1, T*.03), py + T - ly); } // where the two leaves meet
    ctx.fillStyle = P.topL; ctx.fillRect(px, fy, T, Math.max(1, T*.03)); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px, py + T - Math.max(1, T*.05), T, Math.max(1, T*.05)); b64Lamplit(ctx, x, y, T, P, N ? .2 : .08); return; }
  if (ch === '#') { mud(); const {face, fy} = b6MudWall(ctx, x, y, T, P, N, .52); const W = (dx, dy) => b6WallC(b2Tile(x + dx, y + dy));
    if (!face && x > 0 && y > 0 && tileMap && x < tileMap[0].length - 1 && W(0, -1) && W(0, 1) && W(-1, 0) && W(1, 0) && hash(x,y,60) > .7) { const cx = px + T*.5, cy = py + T*.5, r = T*.3; ell(ctx, cx + r*.2, cy + r*.22, r*1.02, r*.92, 'rgba(0,0,0,.35)'); const g = ctx.createRadialGradient(cx - r*.35, cy - r*.4, r*.05, cx, cy, r); g.addColorStop(0, P.topL); g.addColorStop(.6, P.top); g.addColorStop(1, shade(P.top, -.4)); ell(ctx, cx, cy, r, r, g); } // a small dome
    if (face && hash(x,y,61) > .4) { const wx = px + T*(.3 + hash(x,y,62)*.32), wt = fy + T*.1, lit = N && hash(x,y,63) > .9; ctx.fillStyle = lit ? 'rgba(255,170,90,.75)' : P.door; ctx.beginPath(); ctx.moveTo(wx, wt + T*.22); ctx.lineTo(wx, wt + T*.06); ctx.arc(wx + T*.06, wt + T*.06, T*.06, Math.PI, 0); ctx.lineTo(wx + T*.12, wt + T*.22); ctx.fill(); // a window slit, a lamp in one of them
      if (lit) glow(ctx, wx + T*.06, wt + T*.12, T*.3, '#ffa860', .2); ctx.fillStyle = P.wood; ctx.fillRect(wx - T*.02, wt + T*.22, T*.16, Math.max(1, T*.03)); }
    b64Lamplit(ctx, x, y, T, P, N ? .2 : .08); return; }
  if (ch === ',') rubble(); else mud();
  if (ch === '=') { const top = py + T*.12, bot = py + T*.58, [c0, c1] = P.awn[Math.floor(h*2) % 2]; ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px + T*.08, bot, T*.88, T*.28); // a stall's awning, sodden, sagging in the middle and dripping
    ctx.fillStyle = P.wood; ctx.fillRect(px + T*.05, top, T*.05, T*.78); ctx.fillRect(px + T*.9, top, T*.05, T*.78);
    for (let i=0;i<5;i++){ const x0 = px + i*T*.2, sag = Math.sin((i + .5)/5*Math.PI)*T*.06; ctx.fillStyle = i%2 ? c0 : c1; ctx.fillRect(x0, top + sag*.5, T*.2, bot - top); ctx.beginPath(); ctx.arc(x0 + T*.1, bot + sag*.5, T*.1, 0, Math.PI); ctx.fill(); }
    ctx.fillStyle = N ? 'rgba(150,166,206,.08)' : 'rgba(255,252,236,.25)'; ctx.fillRect(px, top, T, T*.06); ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(px, bot - T*.06, T, T*.08);
    ctx.fillStyle = N ? 'rgba(150,170,210,.45)' : 'rgba(200,214,224,.6)'; for (let i=0;i<4;i++) ctx.fillRect(px + T*(.14 + i*.22), bot + T*(.14 + hash(x,y,i+70)*.12), 1, Math.max(1.5, T*.04)); // drips
    if (hash(x,y,72) > .5) { ell(ctx, px + T*.34, py + T*.82, T*.07, T*.05, P.jar); ctx.fillStyle = P.stone; ctx.fillRect(px + T*.56, py + T*.76, T*.18, T*.12); } } // what is left on it to sell
  else if (ch === 'w') { const cx = px + T*.5, cy = py + T*.58, r = T*.3; // the square's well: a square curb of plastered brick, a frame and a pulley, the rope gone
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px + T*.18, py + T*.34, T*.74, T*.6); ctx.fillStyle = P.face; ctx.fillRect(px + T*.12, py + T*.3, T*.72, T*.6); ctx.fillStyle = P.top; ctx.fillRect(px + T*.12, py + T*.3, T*.72, T*.46); ctx.fillStyle = P.topL; ctx.fillRect(px + T*.12, py + T*.3, T*.72, Math.max(1, T*.03));
    ctx.fillStyle = '#050608'; ctx.fillRect(cx - r*.62, cy - r*.62, r*1.24, r*.9); ctx.fillStyle = N ? 'rgba(120,140,180,.25)' : 'rgba(150,170,180,.35)'; ctx.fillRect(cx - r*.4, cy - r*.3, r*.6, Math.max(1, T*.02)); // black water, the sky in it
    ctx.fillStyle = P.wood; ctx.fillRect(px + T*.14, py + T*.08, T*.05, T*.3); ctx.fillRect(px + T*.77, py + T*.08, T*.05, T*.3); ctx.fillRect(px + T*.12, py + T*.06, T*.72, T*.05); ell(ctx, cx, py + T*.09, T*.06, T*.06, P.woodL); ell(ctx, cx, py + T*.09, T*.025, T*.025, P.wood); } // the frame, the wheel
  else if (ch === 'c') { ell(ctx, px + T*.54, py + T*.8, T*.42, T*.1, 'rgba(0,0,0,.45)'); ctx.save(); ctx.translate(px + T*.5, py + T*.52); ctx.rotate((h - .5)*.5); // a handcart, left where it stopped, an oilcloth over what is in it
    ctx.fillStyle = P.wood; ctx.fillRect(-T*.36, -T*.18, T*.6, T*.36); ctx.fillStyle = P.woodL; ctx.fillRect(-T*.36, -T*.18, T*.6, T*.05); ctx.fillStyle = P.wood; ctx.fillRect(T*.24, -T*.04, T*.24, T*.04); ctx.fillRect(T*.24, T*.06, T*.24, T*.04); // bed, shafts
    ctx.fillStyle = N ? '#2e2e30' : '#5a5a4e'; ctx.beginPath(); ctx.moveTo(-T*.34, -T*.14); ctx.quadraticCurveTo(-T*.06, -T*.3, T*.22, -T*.14); ctx.lineTo(T*.22, T*.14); ctx.lineTo(-T*.34, T*.14); ctx.fill(); ctx.fillStyle = N ? 'rgba(150,166,206,.18)' : 'rgba(230,236,240,.3)'; ctx.fillRect(-T*.2, -T*.2, T*.24, Math.max(1, T*.025)); // the oilcloth, wet
    ell(ctx, -T*.18, T*.24, T*.12, T*.05, '#120c08'); ell(ctx, T*.1, T*.24, T*.12, T*.05, '#120c08'); ctx.restore(); }
  else if (ch === 'p') { const by = py + T*.82; // the forward picket's post: a cart on its side across the street, a spear stood against it, the picket's hooded lamp on a pole
    ell(ctx, px + T*.5, by + T*.04, T*.5, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = shade(P.wood, -.1); ctx.fillRect(px + T*.04, py + T*.42, T*.92, T*.4); ctx.fillStyle = P.woodL; ctx.fillRect(px + T*.04, py + T*.42, T*.92, Math.max(1, T*.05)); // the bed, on edge
    ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; for (let i=1;i<5;i++){ ctx.beginPath(); ctx.moveTo(px + T*.04, py + T*(.42 + i*.08)); ctx.lineTo(px + T*.96, py + T*(.42 + i*.08)); ctx.stroke(); } // its boards
    [.24, .72].forEach(k => { ell(ctx, px + T*k, py + T*.42, T*.14, T*.05, '#120c08'); ctx.strokeStyle = P.woodL; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.ellipse(px + T*k, py + T*.42, T*.13, T*.045, 0, 0, 7); ctx.stroke(); }); // the wheels, up in the air
    B2F.line(ctx, N ? '#5a5a62' : '#8a8a90', Math.max(1, T*.025), [[px + T*.14, by], [px + T*.3, py + T*.1]]); poly(ctx, [[px + T*.3, py + T*.1],[px + T*.33, py + T*.02],[px + T*.32, py + T*.13]], N ? '#8a8a96' : '#c8c8d0'); // a spear
    ctx.fillStyle = P.wood; ctx.fillRect(px + T*.6, py + T*.08, T*.04, T*.36); ctx.fillRect(px + T*.6, py + T*.08, T*.12, T*.03); ctx.fillStyle = '#1a1612'; ctx.fillRect(px + T*.68, py + T*.12, T*.08, T*.1); ctx.fillStyle = `rgba(${P.lamp},.95)`; ctx.fillRect(px + T*.69, py + T*.17, T*.06, T*.05); glow(ctx, px + T*.72, py + T*.2, T*.5, '#ffb060', N ? .45 : .2); } // the lamp
  else if (ch !== '.' && ch !== ',') exitArrow(ctx, ch, px, py, T);
  b64Lamplit(ctx, x, y, T, P, N ? .2 : .08);
}
TILEX.b6_c4_town = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b64Town(ctx, ch, x, y, T, !!dark));
TILEX.b6_c4_town_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b64Town(ctx, ch, x, y, T, true));
/* a battle's low cover in these streets: the front of a house come down in a heap of mud-brick, a big storage jar still standing in it */
function b64Heap(ctx, x, y, T, N){ const px = x*T, py = y*T, P = b64TP(N), h = hash(x, y);
  ell(ctx, px + T*.52, py + T*.86, T*.46, T*.11, 'rgba(0,0,0,.5)');
  poly(ctx, [[px + T*.04, py + T*.88],[px + T*.16, py + T*.56],[px + T*.36, py + T*.4],[px + T*.6, py + T*.44],[px + T*.82, py + T*.56],[px + T*.96, py + T*.88]], P.brickD);
  for (let i=0;i<10;i++){ const bx = px + T*(.12 + hash(x,y,i+160)*.66), by = py + T*(.46 + hash(x,y,i+161)*.34), w = T*(.12 + hash(x,y,i+162)*.08); ctx.save(); ctx.translate(bx, by); ctx.rotate((hash(x,y,i+163) - .5)*1.1);
    ctx.fillStyle = i%4 === 3 ? P.top : P.brick; ctx.fillRect(0, 0, w, w*.55); ctx.fillStyle = i%4 === 3 ? P.topL : 'rgba(255,230,200,.12)'; ctx.fillRect(0, 0, w, Math.max(1, w*.14)); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; ctx.strokeRect(.5, .5, w - 1, w*.55 - 1); ctx.restore(); } // bricks, a slab of the plaster still on some
  const jx = px + T*(h > .5 ? .3 : .68), jy = py + T*.5; ell(ctx, jx + T*.05, jy + T*.24, T*.14, T*.05, 'rgba(0,0,0,.4)'); const g = ctx.createRadialGradient(jx - T*.06, jy - T*.04, T*.02, jx, jy, T*.2); g.addColorStop(0, N ? '#6a5040' : '#c88a5a'); g.addColorStop(1, N ? '#2a1c14' : '#6a3e22'); // a big jar, its shoulder broken
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(jx - T*.06, jy - T*.2); ctx.quadraticCurveTo(jx - T*.2, jy - T*.12, jx - T*.15, jy + T*.12); ctx.quadraticCurveTo(jx, jy + T*.28, jx + T*.15, jy + T*.12); ctx.quadraticCurveTo(jx + T*.2, jy - T*.12, jx + T*.06, jy - T*.2); ctx.lineTo(jx + T*.02, jy - T*.14); ctx.lineTo(jx - T*.02, jy - T*.18); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#0a0806'; ell(ctx, jx, jy - T*.18, T*.05, T*.02, '#0a0806'); ctx.fillStyle = N ? 'rgba(150,166,206,.22)' : 'rgba(255,240,220,.4)'; ctx.fillRect(jx - T*.12, jy - T*.08, Math.max(1, T*.025), T*.14); // the wet shine on it
  b64Lamplit(ctx, x, y, T, P, N ? .2 : .08); }
{ const _feat = drawFeature; drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (ch === 't' && (style === 'b6_c4_town' || style === 'b6_c4_town_night')) return b2Clip(ctx, x, y, T, () => b64Heap(ctx, x, y, T, style === 'b6_c4_town_night' || !!dark)); return _feat(ctx, ch, x, y, T, dark, style, map); }; }
/* v13.21 (David, Nov 15: "yes" to the Book Six ground fix): the talk backdrop for the outer streets, which had borrowed Capustan's walls.
   G'danisban outside its own wall at night: flat-roofed mud-brick houses, dark windows, the wall and its shut gate behind, a wet street,
   rain, and one warm lamp at the picket's post. The same country as the b6_c4_town_night ground. */
SCENEX.b6_c4_outer = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, x = ctx, hz = H*.5;
  let g = x.createLinearGradient(0, 0, 0, hz); g.addColorStop(0, '#07080e'); g.addColorStop(1, '#1a1a22'); x.fillStyle = g; x.fillRect(0, 0, W, hz + 2);
  // the city wall across the back, crenellated, the gate shut
  const wy = H*.34; x.fillStyle = '#211c1a'; x.fillRect(0, wy, W, hz - wy + 2); for (let px = 0; px < W; px += W*.03) x.fillRect(px, wy - H*.025, W*.016, H*.026);
  x.fillStyle = '#16120f'; const gx = W*.58; x.beginPath(); x.moveTo(gx - W*.05, hz); x.lineTo(gx - W*.05, wy + H*.06); x.quadraticCurveTo(gx, wy - H*.01, gx + W*.05, wy + H*.06); x.lineTo(gx + W*.05, hz); x.fill();
  x.strokeStyle = 'rgba(120,96,70,.35)'; x.lineWidth = 1; x.beginPath(); x.moveTo(gx, wy + H*.03); x.lineTo(gx, hz); x.stroke();
  // the street, wet, running up to the gate
  g = x.createLinearGradient(0, hz, 0, H); g.addColorStop(0, '#2a241f'); g.addColorStop(1, '#14100d'); x.fillStyle = g; x.fillRect(0, hz, W, H - hz);
  // houses on both sides: flat roofs, parapets, a dome, dark slits
  const house = (x0, w, h, dome, near) => { const y0 = hz + (near ? H*.16 : H*.02), top = y0 - h;
    x.fillStyle = near ? '#2c2520' : '#241e1a'; x.fillRect(x0, top, w, h + 2);
    x.fillStyle = near ? '#352c25' : '#2b2420'; x.fillRect(x0 - 2, top - 3, w + 4, 4); // the parapet
    if (dome) { x.beginPath(); x.arc(x0 + w*.5, top - 2, w*.22, Math.PI, 0); x.fill(); }
    x.fillStyle = '#0c0a08'; for (let i = 0; i < 2; i++) x.fillRect(x0 + w*(.25 + i*.4), top + h*.3, Math.max(2, w*.08), h*.18); // the windows, dark
    x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(x0 + w*.82, top, w*.18, h); };
  house(W*.02, W*.16, H*.13, false, false); house(W*.19, W*.12, H*.1, true, false); house(W*.72, W*.13, H*.12, false, false); house(W*.86, W*.12, H*.09, true, false);
  house(-W*.04, W*.24, H*.3, false, true); house(W*.8, W*.26, H*.27, false, true);
  // puddles holding the sky
  [[.32, .78, .09], [.55, .7, .06], [.46, .9, .12], [.68, .84, .07]].forEach(([px, py, r]) => { x.fillStyle = 'rgba(70,80,100,.35)'; x.beginPath(); x.ellipse(W*px, H*py, W*r, H*r*.18, 0, 0, Math.PI*2); x.fill(); });
  // the picket's lamp, by an overturned cart, the one warm light
  const lx = W*.7, ly = H*.66, fl = .85 + (mo ? .15*Math.sin(t/220) : 0); g = x.createRadialGradient(lx, ly, 0, lx, ly, W*.2); g.addColorStop(0, `rgba(255,190,110,${.42*fl})`); g.addColorStop(1, 'rgba(255,160,80,0)'); x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.fillStyle = '#100c0a'; x.fillRect(lx - W*.08, ly + H*.02, W*.1, H*.05); x.beginPath(); x.arc(lx - W*.06, ly + H*.07, H*.03, 0, Math.PI*2); x.fill(); // the cart on its side
  x.fillStyle = '#ffd890'; x.fillRect(lx + W*.025, ly - H*.01, 3, 4); x.strokeStyle = '#100c0a'; x.beginPath(); x.moveTo(lx + W*.03, ly - H*.01); x.lineTo(lx + W*.03, ly - H*.12); x.stroke(); // lamp and spear
  b64Rain(ctx, W, H, t, mo, 70, .22); };

/* ---------------- v13.33 (pictures against text): b6_c4_edge, its own picture (it had borrowed Book Three's starlit camp) ----------------
   The Seventh's edge of the camp at night, the third night of the rain: low cloud with no star or moon in it, G'danisban a dark rise on the
   right with a light or two; the open ground black between, and on it a scatter of lamps where nobody should be, a few of them gathered at a
   post hung with rags just past the gap; the ditch and its bank of earth across the frame with a gap in it a cart wide; the picket fire low in
   a scrape behind the bank, the squad by it; the rain over all. After the cult (b6_c4_cultDone) the post is down and most lamps are gone */
SCENEX.b6_c4_edge = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, done = !!f.b6_c4_cultDone, hz = H*.42, bank = H*.7, gx = W*.62, gw = W*.06, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b64:edge' + (done ? ':d' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0, '#07080b'], [.6, '#12151a'], [1, '#1e2228']]); x.fillRect(0, 0, W, hz + 2); // night, the cloud down low
    for (let i = 0; i < 10; i++) { x.fillStyle = `rgba(30,34,40,${(.25 + hash(i, 6471)*.25).toFixed(2)})`; x.beginPath(); x.ellipse(hash(i, 6472)*W, hz*(.15 + hash(i, 6473)*.7), W*(.14 + hash(i, 6474)*.2), 5 + hash(i, 6475)*9, 0, 0, 7); x.fill(); } // cloud, a little lighter than the dark
    // the city on its rise, right, black, a light or two in it
    x.fillStyle = '#0c0e10'; x.beginPath(); x.moveTo(W*.5, hz + 1); x.quadraticCurveTo(W*.72, hz - H*.05, W*1.02, hz - H*.04); x.lineTo(W + 2, hz + 1); x.fill();
    for (let i = 0; i < 18; i++) { const rx = W*(.6 + hash(i, 6476)*.38), rh = H*(.02 + hash(i, 6477)*.03); x.fillRect(rx, hz - H*.04 - rh, W*(.012 + hash(i, 6478)*.02), rh + H*.04); }
    [[.72, .03]].forEach(([u, r]) => { x.beginPath(); x.arc(W*u, hz - H*.075, W*r*.55, Math.PI, 0); x.fill(); });
    // the open ground toward it: black mud, puddles holding what light there is
    x.fillStyle = vgrad(x, hz, bank, [[0, '#121310'], [1, '#0a0a08']]); x.fillRect(0, hz, W, bank - hz);
    for (let i = 0; i < 18; i++) { const px = hash(i, 6479)*W, py = hz + H*(.03 + Math.pow(hash(i, 6480), 1.3)*.22), r = W*(.01 + hash(i, 6481)*.03)*(1 + (py - hz)/H*2); ell(x, px, py, r, r*.16, 'rgba(70,76,86,.35)'); }
    // the ditch, a black line under the bank's lip, and the bank: raw earth, a gap in it a cart wide
    x.fillStyle = '#060605'; x.fillRect(0, bank - H*.1, W, H*.02);
    x.fillStyle = vgrad(x, bank - H*.09, bank + H*.02, [[0, '#2e261c'], [1, '#16120c']]);
    [[-2, gx - gw/2], [gx + gw/2, W + 2]].forEach(([a, b]) => { x.beginPath(); x.moveTo(a, bank + H*.02); x.lineTo(a, bank - H*.06); for (let px = a; px <= b; px += 8) x.lineTo(px, bank - H*(.07 + .01*Math.sin(px*.07))); x.lineTo(b, bank - H*.05); x.lineTo(b + (a < 0 ? W*.01 : 0), bank + H*.02); x.closePath(); x.fill(); });
    x.fillStyle = 'rgba(160,140,110,.12)'; x.fillRect(0, bank - H*.072, gx - gw/2, 1); x.fillRect(gx + gw/2, bank - H*.072, W - gx - gw/2, 1); // the wet lip catching the fire
    x.fillStyle = '#100e0a'; x.beginPath(); x.moveTo(gx - gw/2, bank + H*.02); x.lineTo(gx - gw*.3, bank - H*.07); x.lineTo(gx + gw*.3, bank - H*.07); x.lineTo(gx + gw/2, bank + H*.02); x.fill(); // the gap: ruts going out through it
    // the near ground inside the camp: mud, the scrape for the fire
    x.fillStyle = vgrad(x, bank, H, [[0, '#1a1610'], [1, '#0c0a08']]); x.fillRect(0, bank + H*.02, W, H - bank);
    for (let i = 0; i < 40; i++) { const py = bank + H*.03 + hash(i, 6482)*(H - bank), d = (py - bank)/(H - bank); x.fillStyle = `rgba(0,0,0,${(.2 + d*.2).toFixed(2)})`; x.fillRect(hash(i, 6483)*W, py, 4 + d*20, .8 + d); }
    if (!done) { // the post past the gap, hung with rags, and the bowls set out in rows in the mud
      const px = gx + W*.03, py = bank - H*.12; x.fillStyle = '#16120e'; x.fillRect(px, py - H*.12, 2, H*.12);
      for (let i = 0; i < 5; i++) { x.fillStyle = ['#4a3e34', '#3a3a3e', '#5a4a3a'][i % 3]; x.beginPath(); x.moveTo(px + 2, py - H*(.11 - i*.018)); x.lineTo(px + 8 + hash(i, 6484)*5, py - H*(.1 - i*.018) + 3); x.lineTo(px + 2, py - H*(.1 - i*.018)); x.fill(); }
      for (let i = 0; i < 12; i++) ell(x, px - W*.04 + (i % 6)*W*.016, py + H*(.012 + Math.floor(i/6)*.014), 2, .9, 'rgba(110,90,70,.6)'); }
    else { x.fillStyle = '#16120e'; x.save(); x.translate(gx + W*.03, bank - H*.12); x.rotate(1.3); x.fillRect(0, 0, 2, H*.12); x.restore(); } // the post, down
  }), 0, 0, W, H);
  // the lamps on the open ground: many, coming a little closer every night; gathered at the post; after, a few going back toward the city
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = 'rgba(255,190,120,.7)'; [[.68, .05], [.83, .045]].forEach(([u, v]) => ctx.fillRect(W*u, hz - H*v, 1.4, 1.4)); // a light or two in the city
  const nl = done ? 6 : 26; for (let i = 0; i < nl; i++) { const k = hash(i, 6491), px = done ? W*(.62 + k*.3) : (i < 9 ? gx + W*(-.04 + hash(i, 6492)*.12) : W*(.08 + k*.88)), py = done ? hz + H*(.02 + hash(i, 6493)*.05) : (i < 9 ? bank - H*(.11 + hash(i, 6493)*.04) : hz + H*(.02 + Math.pow(hash(i, 6493), 1.3)*.2)), ff = mo ? .8 + .2*Math.sin(t/(300 + i*37) + i) : 1, d = (py - hz)/(bank - hz);
    glow(ctx, px, py, 5 + d*10, '#ffb060', .35*ff); glow(ctx, px, py, 1.2 + d*1.4, '#ffe0a0', .9*ff); }
  ctx.globalCompositeOperation = 'source-over';
  if (!done) for (let i = 0; i < 9; i++) { const px = gx + W*(-.04 + hash(i, 6492)*.12), py = bank - H*(.11 + hash(i, 6493)*.04) + 9, s = .9; ctx.fillStyle = 'rgba(8,8,8,.9)'; ctx.fillRect(px - 2*s, py - 9*s, 4*s, 9*s); ell(ctx, px, py - 10*s, 1.7*s, 1.7*s, ctx.fillStyle); } // the robed ones under their lamps, hands out
  // the picket fire, low, in its scrape behind the bank; the squad round it
  const cx = W*.3, cy = H*.86; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.3, '#ff8a3a', .24*fl); ctx.globalCompositeOperation = 'source-over';
  ell(ctx, cx, cy + 2, 14, 4, '#0a0806'); poly(ctx, [[cx - 6, cy], [cx - 1, cy - 9*fl], [cx + 1, cy - 4], [cx + 3, cy - 7*fl], [cx + 6, cy]], 'rgba(255,140,60,.9)'); poly(ctx, [[cx - 3, cy], [cx, cy - 5*fl], [cx + 3, cy]], 'rgba(255,220,140,.9)');
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(26 + j*24), H*.97 - (j % 2)*3, 1.8, t, {phase:i, dir:-side}); });
  b64Rain(ctx, W, H, t, mo, 150, .2); ctx.fillStyle = 'rgba(20,24,32,.14)'; ctx.fillRect(0, 0, W, H);
  vign(ctx, W, H, .7, .5); };
