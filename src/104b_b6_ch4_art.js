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
  ctx.quadraticCurveTo(12.2, F.cy - 10, 4.6, F.cy - 13.8); ctx.quadraticCurveTo(0, F.cy - 15, -4.6, F.cy - 13.8); ctx.quadraticCurveTo(-12.2, F.cy - 10, -13, F.cy + 1);
  ctx.fillStyle = PR.lin(ctx, -14, 0, 14, 0, [[0, '#3a2c24'], [.42, '#1a120e'], [1, '#050303']]); ctx.fill();
  PR.strands(ctx, 34, ['#2e221c', '#120c0a', '#4a3a30'], .5, 133, (i, r) => { const sd = r() < .5 ? -1 : 1, x0 = sd*r()*3, y0 = F.cy - 14.4; return [x0, y0, x0 + sd*5, F.cy - 21, sd*(8 + r()*5), F.cy - 18 + r()*13]; });
  PR.strands(ctx, 8, ['#2e221c', '#120c0a', '#4a3a30'], .55, 139, (i, r) => { const sd = i % 2 ? 1 : -1, x = sd*(F.w + .4 + r()*1.2); return [x, F.cy - 8, x + sd*(1 + r()*1.4), F.cy + 2, x + sd*(.4 + r()*1.2), F.cy + 9 + r()*4]; }); // loose locks by the cheeks, wet, come out of the knot
  ell(ctx, -13.6, F.cy - 9, 4.4, 5.2, PR.lin(ctx, -18, 0, -9, 0, [[0, '#4a3a30'], [.5, '#22180f'], [1, '#080505']])); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { ctx.ellipse(-13.6, F.cy - 9, 4.4, 5.2, 0, 0, 7); });
  PR.stroke(ctx, 'rgba(120,90,70,.4)', .4, () => { ctx.ellipse(-13.6, F.cy - 9, 2.6, 3.4, .3, 3.4, 5.6); }); ctx.fillStyle = '#5a4a8a'; ctx.fillRect(-11.4, F.cy - 12, 1.6, 6); // the knot, tied with a strip of dyed cloth
  PR.stroke(ctx, 'rgba(200,214,236,.32)', .6, () => { ctx.moveTo(-9, F.cy - 17); ctx.quadraticCurveTo(-4, F.cy - 21, 2, F.cy - 20.6); }); // the wet sheen
  PR.strands(ctx, 3, ['#1a120e', '#2e221c'], .45, 137, (i, r) => { const x = 3 + i*1.6, y = F.cy - 14; return [x, y, x + 2.4, y + 5, x + 1.4 + r()*2, y + 10 + i*2.4]; }); // strands stuck to her brow
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
SCENEX.b6_gdanisban_rain = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, clear = !!f.b6_soliel, hz = H*.46;
  const puddles = [[.3, .72, .1], [.62, .78, .14], [.86, .7, .07], [.14, .86, .09], [.5, .9, .12]];
  ctx.drawImage(sceneLayer('b64:camp' + (clear ? 'c' : 'r'), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, clear ? [[0, '#3c4452'], [.45, '#76808a'], [.85, '#c4bea8'], [1, '#d6ccae']] : [[0, '#23272e'], [.5, '#454b54'], [1, '#737880']]); x.fillRect(0, 0, W, hz + 2);
    if (clear) glow(x, W*.3, hz*.55, W*.32, '#fff2cc', .3); // a pale sun coming through, low in the east
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
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.5 + i*18, H*.95, 1.7, t, {phase:i, dir:1}));
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
