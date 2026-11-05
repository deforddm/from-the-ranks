/* ============ Book Six, Chapter 2 art: The North Coast — the Host's camp above the sea in the rain, the empty villages inland ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d, lit from the left: Brannoc, Falari, loaned to the Seventh (red hair, a red beard he is
   proud of, mail under the Host's blue-grey, the broad Falari axe, a tin whistle at his throat); and the followers of the Chosen (b6_cultist):
   ragged ash-grey robes, faces wrapped to the eyes, a cord of prayer-knots, a hooked knife; never sick in close-up, nothing shown under the
   wrappings. Brannoc's portrait (POR) in the bust style of 019. Two backdrops replacing the borrowed placeholders (SCENEX, sceneLayer for the
   still parts, REDUCE() holding the rest still): b6_coast (the Host's tents in rows above a grey beach at night, rain on the sea, transports
   at anchor, the few lamps of a city gone quiet on its headland) and b6_plague_village (a mud-brick village inland in the rain, doors open and
   nobody in them, a well, a dog that will not come near). One more for the writer and the lead to use if they want it: b6_c2_burning (the
   village burning at a distance, from the road, in the rain). Book Six's coast is rain, grey sea, mud and canvas; the Host wears Book
   Three's blue-grey. The chapter's gear on Book Six's item ground: dark ash with a thin bone rim (Claude's call, after 100b's walls). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Brannoc: a big Falari, red hair tied back and a red beard to the collarbone; mail under a blue-grey surcoat (the Host's colour, Sweetcreek's
     red edging at the hem); the broad-bladed Falari axe held up on the shoulder; a tin whistle on a cord at his throat */
  brannoc(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.08, 1.04);
    B2F.line(ctx, '#6a4a2c', 1.6, [[5.4, 6], [9.6, -15]]); ctx.fillStyle = '#7a3a22'; ctx.fillRect(5.6, 2.6, 1.8, 2.4); // the haft, wrapped red at the grip
    poly(ctx, [[8.4,-13],[14.6,-17.6],[15.4,-11.6],[13.4,-8.4],[10.4,-9.4]], '#9a9890'); poly(ctx, [[14.6,-17.6],[15.4,-11.6],[14.4,-10.4],[13.8,-15.8]], '#d8d4c8'); ctx.fillStyle = '#b8642a'; ctx.fillRect(8.6, -13.4, 2, 1.2); // the broad blade, its lit edge; a copper band
    h.legs('#2e2c2a'); ctx.fillStyle = '#1a1614'; ctx.fillRect(-4.6, 10.6, 3.6, 2.4); ctx.fillRect(1, 10.6, 3.6, 2.4); // boots
    h.torso('#9a968c', '#34322e', 7.2); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 4; i++){ ctx.moveTo(-7, -4 + i*2.4); ctx.lineTo(7, -4 + i*2.4); } ctx.stroke(); // mail
    poly(ctx, [[-4.6,-5.6],[4.6,-5.6],[5.4,7.6],[-5.4,7.6]], h.armor('#6e7e8c', '#26303a')); ctx.fillStyle = '#8a3a24'; ctx.fillRect(-5.4, 6.4, 10.8, 1.2); ctx.fillStyle = 'rgba(220,230,240,.12)'; ctx.fillRect(-4.4, -5, 1.2, 11); // the blue-grey surcoat, red at the hem
    ctx.fillStyle = '#4a3420'; ctx.fillRect(-5.6, 2, 11.2, 1.3); ctx.fillStyle = '#b8a070'; ctx.fillRect(-.8, 1.9, 1.6, 1.5); // the belt
    ctx.fillStyle = '#c49c80'; ctx.fillRect(-9, -4.6, 2.2, 5.6); ell(ctx, 6.6, 3.4, 1.7, 1.5, '#c49c80'); // a bare forearm, the fist on the haft
    h.head('#c89e80', 4.6, -11.2); h.look('rgba(24,14,10,.85)', -11.6); ctx.fillStyle = 'rgba(160,80,50,.35)'; ctx.fillRect(-2.4, -10.4, 1, .6); ctx.fillRect(2.6, -10.2, 1, .6); // freckles under the eyes
    poly(ctx, [[-4.4,-9.4],[4.6,-9.4],[4.4,-6.4],[2.6,-3.4],[0,-2.6],[-2.6,-3.4],[-4.2,-6.4]], '#b4482a'); ctx.fillStyle = 'rgba(240,150,90,.35)'; ctx.fillRect(-3.6, -8.6, 1.2, 4); ctx.fillStyle = '#6a2414'; ctx.fillRect(-1.6, -8, 3.4, .7); // the red beard, the mouth in it
    B2F.cap(ctx, '#c0502e', 4.8, -12.2, 1.02, 1.98); ctx.fillStyle = '#c0502e'; ctx.fillRect(-5.6, -12.4, 1.8, 4.8); ell(ctx, -6.4, -7, 1.3, 1.6, '#a8402a'); ctx.fillStyle = 'rgba(255,190,130,.35)'; ctx.fillRect(-3.6, -16.2, 3.4, .7); // red hair, tied back
    ctx.strokeStyle = '#c8c4b8'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(-2, -5.6); ctx.lineTo(1.2, -1.4); ctx.stroke(); ctx.fillStyle = '#d0ccc0'; ctx.fillRect(.6, -1.8, 2.6, .9); // the tin whistle on its cord
    ctx.restore(); },
  /* a follower of the Chosen: a ragged robe the colour of ash, a cord of prayer-knots, the face wrapped to the eyes; a hooked knife held low,
     or the hands bare and reaching; some hooded, some with the head shaved and smeared grey */
  b6_cultist(ctx, h, t, o){ ctx.save(); const k = b2Pick(o, [0, 1, 2, 1, 0]), sway = o.still ? 0 : Math.sin(t/300 + (o.phase || 0))*.5; B2F.grow(ctx, .96, 1 + k*.02);
    ctx.fillStyle = '#1e1a16'; ctx.fillRect(-4.2, 8, 3, 5); ctx.fillRect(1.2, 8, 3, 5); // bare shins, dark with mud
    poly(ctx, [[-5.8,-6],[5.8,-6],[7.6,9.4],[5,11.6],[2.6,9.6],[0,11.8],[-2.6,9.8],[-5.2,11.4],[-7.6,9.4]], h.armor(b2Pick(o, ['#6a6258', '#5a5650', '#6e6456']), '#1c1a16')); // the robe, ragged at the hem
    ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(-3, -2, 1, 9); ctx.fillRect(2.4, 0, 1, 8); ctx.fillStyle = 'rgba(230,220,200,.1)'; ctx.fillRect(-5.2, -5, 1.4, 12); // folds
    B2F.line(ctx, '#3a2e22', .8, [[-5, -5], [4.6, 3]]); for (let i = 0; i < 5; i++) ell(ctx, -4 + i*2.1, -4.2 + i*1.6, .7, .7, '#4a3a28'); // the cord of prayer-knots
    if (k === 2) { ctx.fillStyle = '#9a8a74'; ctx.fillRect(-8.6 - sway, -5, 2.2, 6); ctx.fillRect(6.4 + sway, -5, 2.2, 6); B2F.line(ctx, '#9a8a74', .8, [[-7.6 - sway, 1], [-9 - sway, 3.4]]); B2F.line(ctx, '#9a8a74', .8, [[7.6 + sway, 1], [9 + sway, 3.4]]); } // bare hands, reaching
    else { ctx.fillStyle = '#9a8a74'; ctx.fillRect(5.8, -3, 2, 5.6); B2F.line(ctx, '#3a2a1a', 1.1, [[6.8, 3], [7.4, 5]]); B2F.line(ctx, '#b8b4aa', 1, [[7.4, 5], [10.6, 2.6], [11.4, -.4]]); } // a hooked knife, low
    h.head('#a08a70', 4.3, -11.2);
    ctx.fillStyle = '#b0a48c'; ctx.fillRect(-4.4, -10.6, 8.8, 5.4); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(-4.4, -8.4, 8.8, .5); ctx.fillRect(-4.4, -6.6, 8.8, .4); poly(ctx, [[-4.4,-9.6],[-7.4,-5.6],[-6.2,-4.8],[-4,-7.6]], '#a09478'); // the face wrapped to the eyes, a loose tail
    ctx.fillStyle = 'rgba(16,10,8,.9)'; ctx.fillRect(-1, -12, 1.2, 1); ctx.fillRect(2, -12, 1.2, 1); // the eyes, over the wrapping
    if (k === 1) { poly(ctx, [[-5.8,-6],[-4.6,-15.6],[0,-17.6],[4.6,-15.6],[5.8,-6],[4.4,-12.4],[-4.4,-12.4]], '#4e4840'); ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.fillRect(-4.6, -14, 1.2, 7); } // hooded
    else { ctx.fillStyle = 'rgba(150,146,138,.55)'; ctx.beginPath(); ctx.arc(0, -12.4, 4.4, Math.PI, 0); ctx.fill(); ctx.fillStyle = 'rgba(60,56,50,.5)'; ctx.fillRect(-1, -16.4, 1.2, 3.6); } // shaved, smeared with ash, a mark at the brow
    ctx.restore(); },
});
if (FOES.b6_cultist) FOES.b6_cultist.kind = 'b6_cultist'; // the engine borrowed b4_c7_fleer until this figure existed (100)

/* ---------------- Brannoc's portrait (019's bust units: about 120 tall, shoulders at y = 0, the lantern on the left) ---------------- */
POR.brannoc = function(ctx){ const F = {cy:-75, w:14.8, h:20.8, jaw:.94, chin:6.4, skin:'#caa082', iris:'#5a7a8a', lip:'#a0604c', browCol:'#a0442a', browW:1.7, arch:.9, browL:.6, browR:.3, rim:'#e0a060', rimA:.22, nose:1.2, look:.2, open:1, smileL:.55, smileR:.75, mouthW:4.2, teeth:1, flush:'#d07a60', age:.2};
  /* the Falari axe over his right shoulder: an ash haft wrapped with red leather, and a broad bearded blade up beside his head */
  ctx.save(); ctx.translate(30, 6); ctx.rotate(.24); ctx.lineCap = 'butt';
    ctx.strokeStyle = PR.lin(ctx, -2, 0, 2, 0, [[0, '#b8925e'], [.5, '#6a4c2c'], [1, '#1e140a']]); ctx.lineWidth = 4.2; ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0, -108); ctx.stroke();
    ctx.fillStyle = PR.lin(ctx, -2.4, 0, 2.4, 0, [[0, '#c86a3a'], [.5, '#7a321a'], [1, '#2a0e06']]); ctx.fillRect(-2.4, -34, 4.8, 22); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { for (let i = 0; i < 9; i++){ ctx.moveTo(-2.4, -33 + i*2.5); ctx.lineTo(2.4, -31.6 + i*2.5); } }); // the red grip-wrap
    ctx.fillStyle = PR.lin(ctx, -3, 0, 3, 0, [[0, '#f0b070'], [.5, '#b8642a'], [1, '#4a2008']]); ctx.fillRect(-2.8, -98, 5.6, 3.4); ctx.fillRect(-2.8, -84, 5.6, 2.4); // copper bands at the eye
    const blade = () => { ctx.beginPath(); ctx.moveTo(1.6, -100); ctx.bezierCurveTo(10, -102, 18, -110, 22, -120); ctx.quadraticCurveTo(28, -100, 25, -76); ctx.bezierCurveTo(19, -80, 12, -84, 6, -82); ctx.lineTo(1.6, -84); ctx.closePath(); };
    blade(); ctx.fillStyle = PR.lin(ctx, 2, -110, 26, -80, [[0, '#d8d6d0'], [.4, '#8e8c86'], [1, '#26241f']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = .6; blade(); ctx.stroke();
    PR.stroke(ctx, 'rgba(255,255,250,.7)', .8, () => { ctx.moveTo(22.4, -118); ctx.quadraticCurveTo(27.4, -100, 24.6, -78); }); // the edge, honed bright
    ctx.save(); blade(); ctx.clip(); const r = PR.rng(211); for (let i = 0; i < 10; i++) PR.soft(ctx, 6 + r()*16, -110 + r()*30, 1 + r()*2, .6 + r(), '#3a2414', .35, r()*3); ctx.restore(); // the rust of a wet coast, scrubbed at
    PR.stroke(ctx, 'rgba(60,40,30,.6)', .5, () => { ctx.moveTo(6, -96); ctx.bezierCurveTo(10, -96, 14, -100, 16, -104); ctx.moveTo(7, -91); ctx.bezierCurveTo(11, -91, 15, -94, 17, -98); }); // a wave cut in the steel, Falari work
  ctx.restore();
  BP.back(ctx, F, '#b4482a', '#3a1206', 20, 2); PR.neck(ctx, F, 11.2);
  /* mail to the throat under a blue-grey surcoat, a padded collar, a leather baldric */
  const B = BP.body(ctx, F, {wide:58, drop:1, trap:7, ny:F.cy + 15.8, cb:F.cy + 21, c1:'#94908a', c2:'#2a2826'}); ctx.save(); B.path(); ctx.clip();
    PR.mail(ctx, -60, 60, -66, 2, '#94908a', 2.1); PR.soft(ctx, 34, -24, 30, 26, '#000000', .45); PR.soft(ctx, -30, -34, 22, 12, '#f0e6d8', .12);
    PR.path(ctx, [[-34, 4], [-30, -30], [-16, -36], [16, -36], [30, -30], [34, 4]]); ctx.fillStyle = PR.lit(ctx, '#66788a', '#222c36', -34, 30); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.55)', .7, () => { ctx.moveTo(-34, 4); ctx.lineTo(-30, -30); ctx.lineTo(-16, -36); ctx.moveTo(16, -36); ctx.lineTo(30, -30); ctx.lineTo(34, 4); }); // the surcoat, the Host's blue-grey
    PR.stroke(ctx, 'rgba(220,232,240,.3)', .6, () => { ctx.moveTo(-29, -28); ctx.lineTo(-32, 2); }); PR.soft(ctx, -20, -18, 8, 14, '#dfe8f0', .1); const r2 = PR.rng(223); for (let i = 0; i < 18; i++) PR.soft(ctx, -30 + r2()*60, -32 + r2()*32, .6 + r2()*1.4, .6 + r2()*1.4, '#c8dce8', .25); // rain on it
    ctx.fillStyle = PR.lit(ctx, '#9a3a22', '#3a1006', -34, 30); PR.path(ctx, [[-34, -4], [34, -4], [34, 4], [-34, 4]]); ctx.fill(); // Sweetcreek's red at the hem
    ctx.fillStyle = PR.lit(ctx, '#6a4a2e', '#22160a', -30, 30); PR.path(ctx, [[-34, -38], [-28, -42], [38, 2], [30, 2]]); ctx.fill(); PR.stitch(ctx, 'rgba(220,180,120,.4)', .35, () => { ctx.moveTo(-31, -38.6); ctx.lineTo(33.6, 1.4); }); // the baldric
    ctx.fillStyle = '#b8642a'; ctx.fillRect(2, -19, 5, 5); ctx.fillStyle = '#3a1a08'; ctx.fillRect(3.2, -17.8, 2.6, 2.6); // a copper buckle
  ctx.restore(); BP.light(ctx, F, B);
  BP.spaulder(ctx, {wide:58, drop:1, rise:3, n:3, c:['#a88458', '#6a4a2c', '#2a1a0c'], style:'leather', rivet:'#e0b880'}); // boiled-leather shoulders, riveted with copper
  BP.band(ctx, B, -1, 6.8); ctx.fillStyle = PR.lit(ctx, '#7a8a96', '#2a323a', -B.nx - 3, B.nx + 3); ctx.fill(); ctx.save(); BP.band(ctx, B, -1, 6.8); ctx.clip(); BP.quilt(ctx, -B.nx - 6, B.nx + 6, B.ny - 2, B.cb + 9, 3.4, 'rgba(0,0,0,.45)'); ctx.restore(); // the padded collar
  PR.stroke(ctx, 'rgba(0,0,0,.5)', .6, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1.05 + i/20*2.1, 6.8); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } });
  /* freckles, and the beard's shadow under the face: a red beard, full, trimmed square by somebody who cared */
  F.under = (ctx, F) => { const u = F.h/20, r = PR.rng(229), cy = F.cy, w = F.w; ctx.lineCap = 'round';
    PR.dots(ctx, F, 70, 'rgba(170,80,40,.35)', .55, [-4, 4, (x, y) => Math.abs(x) < 3]); // freckles across the cheeks
    ctx.beginPath(); ctx.moveTo(-w - 2, cy + 1*u); ctx.quadraticCurveTo(-w*.6, cy + 7.6*u, -5.4, cy + 9.2*u); ctx.lineTo(5.4, cy + 9.2*u); ctx.quadraticCurveTo(w*.6, cy + 7.6*u, w + 2, cy + 1*u); ctx.lineTo(w + 2, cy + 24*u); ctx.lineTo(-w - 2, cy + 24*u); ctx.closePath();
    ctx.ellipse(0, cy + 12.4*u, 4.8, 1.8*u, 0, 0, Math.PI*2); ctx.fillStyle = PR.lin(ctx, -w, 0, w, 0, [[0, 'rgba(214,110,60,.8)'], [.45, 'rgba(160,64,30,.86)'], [1, 'rgba(50,16,6,.92)']]); ctx.fill('evenodd');
    for (let i = 0; i < 420; i++){ const x = (r() - .5)*2*w, yy = 3 + r()*16 + Math.abs(x)/w*2.4, y = cy + yy*u; if (Math.abs(x) < 4.8 && yy > 10.4 && yy < 14.4) continue; if (yy < 9.2 && Math.abs(x) < 5.4) continue;
      ctx.strokeStyle = x < 0 ? (r() < .3 ? 'rgba(250,170,110,.55)' : 'rgba(190,80,40,.6)') : 'rgba(70,22,8,.6)'; ctx.lineWidth = .45; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (r() - .5)*.7, y + 1 + r()*.9); ctx.stroke(); }
    PR.stroke(ctx, 'rgba(120,40,16,.9)', .8, () => { for (let i = 0; i < 16; i++){ const k = i/15, x = lerp(-5.6, 5.6, k); ctx.moveTo(x*.5, cy + 9.4*u); ctx.lineTo(x*1.08, cy + 11.4*u + Math.abs(x)*.12); } }); }; // the moustache
  PR.face(ctx, F);
  /* the beard below the jaw, over the collar: square-cut, lit on the lantern side */
  const bd = () => { ctx.beginPath(); ctx.moveTo(-F.w*.96, F.cy + 8); ctx.bezierCurveTo(-F.w*1.02, F.cy + 22, -F.w*.7, F.cy + 31, 0, F.cy + 33); ctx.bezierCurveTo(F.w*.7, F.cy + 31, F.w*1.02, F.cy + 22, F.w*.96, F.cy + 8); ctx.bezierCurveTo(F.w*.7, F.cy + 18, F.w*.3, F.cy + 20, 0, F.cy + 20.4); ctx.bezierCurveTo(-F.w*.3, F.cy + 20, -F.w*.7, F.cy + 18, -F.w*.96, F.cy + 8); ctx.closePath(); };
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 2; bd(); ctx.fillStyle = PR.lin(ctx, -F.w, 0, F.w, 0, [[0, '#d0683a'], [.45, '#a0401e'], [1, '#2a0c04']]); ctx.fill(); ctx.restore();
  ctx.save(); bd(); ctx.clip(); PR.strands(ctx, 110, ['#e88a52', '#b04a22', '#7a2a10', '#3a1006', '#c8602e'], .55, 233, (i, r) => { const x = -F.w + r()*F.w*2, y0 = F.cy + 8 + Math.abs(x)*.2 + r()*10; return [x, y0, x*1.06, y0 + 8, x*.7, F.cy + 34]; }); ctx.restore();
  PR.soft(ctx, -6, F.cy + 20, 4, 6, '#ffd0a0', .18);
  /* the tin whistle and his mother's copper ring, on one cord over the collar */
  PR.stroke(ctx, '#3a2414', .7, () => { ctx.moveTo(-12, F.cy + 19); ctx.quadraticCurveTo(-6, F.cy + 40, 2, F.cy + 44); ctx.moveTo(12, F.cy + 19); ctx.quadraticCurveTo(8, F.cy + 38, 2, F.cy + 44); });
  ctx.save(); ctx.translate(2, F.cy + 44); ctx.rotate(.5); ctx.fillStyle = PR.lin(ctx, -1.4, 0, 1.4, 0, [[0, '#f0eee6'], [.5, '#a8a49a'], [1, '#3a3834']]); ctx.fillRect(-1.3, 0, 2.6, 13); ctx.fillStyle = '#26241f'; [4, 7, 10].forEach(y => ell(ctx, 0, y, .55, .55, '#26241f')); ctx.fillRect(-1.3, 0, 2.6, 1.4); ctx.restore(); // the whistle
  ctx.lineWidth = 1.3; ctx.strokeStyle = PR.lin(ctx, -4, 0, 2, 0, [[0, '#f8c080'], [.6, '#b8642a'], [1, '#4a1e06']]); ctx.beginPath(); ctx.arc(-1.4, F.cy + 45.4, 2, 0, 7); ctx.stroke(); // the copper ring
  /* red hair, thick, tied back, a few strands come loose in the wet */
  BP.hair(ctx, F, {c:['#e07a46', '#b0441e', '#3a1006'], v:3.8, wx:1.8, hl:15.4, ey:-1.6, n:90, sw:.6, s:['#f09a60', '#a03a18', '#5a1a08'], seed:239, sh:'#ffd0a0', shA:.3});
  PR.strands(ctx, 8, ['#c05a2a', '#e88a52'], .6, 241, (i, r) => { const x = -F.w + r()*4, y = F.cy - 10; return [x, y, x - 2.6, y + 8, x - 1.6 + r()*2, y + 16 + r()*4]; });
  return F; };

/* ---------------- backdrops ---------------- */
const B62 = {sky:'#0c0e14', skyL:'#262a32', sea:'#2a3238', seaD:'#10161a', sand:'#4a443a', mud:'#2a241e', canvas:'#7a7466', canvasD:'#3a3630', lamp:'255,190,110', brick:'#7a6a56', brickD:'#4a3e32', rain:'200,212,226'};
/* rain over a whole frame: long fine streaks leaning with the wind off the sea; held still, the same streaks without the fall */
function b62Rain(ctx, W, H, t, mo, n = 90, a = .22, lean = .18){ ctx.strokeStyle = `rgba(${B62.rain},${a})`; ctx.lineWidth = .7; ctx.beginPath();
  for (let i = 0; i < n; i++){ const sp = .5 + hash(i, 6201)*.5, len = 8 + sp*12, fall = mo ? t*.32*sp : 0, y = ((hash(i, 6203)*(H + 40) + fall) % (H + 40)) - 20,
      xx = ((((hash(i, 6202)*(W + 60) - fall*lean) % (W + 60)) + W + 60) % (W + 60)) - 30; ctx.moveTo(xx, y); ctx.lineTo(xx - lean*len, y + len); }
  ctx.stroke(); }
/* a ridge tent seen from the end: the canvas lit by a lamp inside, or dark; rain-dark at the hem */
function b62Tent(x, cx, by, s, lit, dk){ const w = 14*s, h = 11*s; x.fillStyle = dk ? '#16161a' : '#2a2a2c'; x.beginPath(); x.moveTo(cx - w*1.5, by); x.lineTo(cx - w*.3, by - h); x.lineTo(cx + w*.3, by - h); x.lineTo(cx + w*1.2, by); x.fill(); // the long side, going back
  x.fillStyle = lit ? `rgba(${B62.lamp},${(.5 + lit*.3).toFixed(2)})` : (dk ? '#3a3834' : B62.canvasD); x.beginPath(); x.moveTo(cx - w*.5, by); x.lineTo(cx - w*.3 + w*.3, by - h); x.lineTo(cx + w*.5, by); x.fill(); // the end, facing
  if (lit) { x.fillStyle = 'rgba(80,40,20,.55)'; x.beginPath(); x.moveTo(cx - w*.1, by); x.lineTo(cx, by - h*.6); x.lineTo(cx + w*.1, by); x.fill(); } // the door-flap, lamplight through it
  x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(cx - w*.5, by - h*.12, w, h*.12); x.strokeStyle = 'rgba(20,18,16,.8)'; x.lineWidth = .7*s; x.beginPath(); x.moveTo(cx, by - h); x.lineTo(cx, by - h - 2.4*s); x.stroke(); }
/* mud-brick houses of an inland village: flat roofs, a parapet, roof-beams poking out, the doorway a dark square; seen along a lane */
function b62House(x, hx, by, w, h, c, cd, door, win){ x.fillStyle = c; x.fillRect(hx, by - h, w, h); x.fillStyle = cd; x.fillRect(hx + w*.82, by - h, w*.18, h); // the lit face and its dark return
  x.fillStyle = shade(c, -.18); x.fillRect(hx - 1, by - h - 2, w + 2, 3); for (let i = 0; i < 4; i++) x.fillRect(hx + w*(.12 + i*.22), by - h + 1.6, 1.4, 1.6); // the parapet, the beam-ends
  x.fillStyle = 'rgba(0,0,0,.22)'; x.fillRect(hx, by - h*.28, w*.82, h*.28); // the wet climbing the wall from the mud
  if (door) { x.fillStyle = '#0a0806'; x.fillRect(hx + w*door, by - h*.56, w*.18, h*.56); x.fillStyle = shade(c, -.3); x.save(); x.translate(hx + w*door, by - h*.56); x.transform(1, -.12, 0, 1, 0, 0); x.fillRect(-w*.12, 0, w*.12, h*.56); x.restore(); } // the doorway, open, the door swung back
  if (win) { x.fillStyle = '#0e0a08'; x.fillRect(hx + w*win, by - h*.82, w*.12, h*.16); } }

/* the Host's camp above the beach, at night, in the rain: transports at anchor on a grey sea, the few lamps of Ehrlitan on its headland to the
   west, the tents in rows on the bluff going back, a cook-fire under an awning in front with the squad round it */
SCENEX.b6_coast = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b62:coast', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#07080c'],[.55,'#14171e'],[1,'#2a2e34']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 10; i++) { x.fillStyle = `rgba(4,5,8,${(.3 + hash(i, 6211)*.3).toFixed(2)})`; x.beginPath(); x.ellipse(hash(i, 6212)*W, hz*(.1 + hash(i, 6213)*.6), W*(.14 + hash(i, 6214)*.12), hz*.06, 0, 0, 7); x.fill(); } // the rain-cloud, low
    // Ehrlitan on its headland to the west: the hill of the old city, walls, a few lamps (the city has gone quiet)
    x.fillStyle = '#191c24'; x.beginPath(); x.moveTo(0, hz + 2); x.lineTo(0, hz - H*.08); x.quadraticCurveTo(W*.1, hz - H*.16, W*.2, hz - H*.1); x.quadraticCurveTo(W*.28, hz - H*.05, W*.34, hz + 2); x.fill();
    for (let i = 0; i < 16; i++) { const bx = hash(i, 6215)*W*.28, bh = H*(.02 + hash(i, 6216)*.04), top = hz - H*.08 - Math.sin(bx/(W*.3)*Math.PI)*H*.06; x.fillRect(bx, top - bh, W*(.012 + hash(i, 6217)*.02), bh + 2); }
    for (let i = 0; i < 7; i++) { x.fillStyle = `rgba(${B62.lamp},${(.6 + hash(i, 6218)*.4).toFixed(2)})`; x.fillRect(W*(.03 + hash(i, 6219)*.24), hz - H*(.04 + hash(i, 6220)*.1), 1.6, 1.8); }
    // the sea: grey, swell lines, a lighter band under the cloud's edge
    x.fillStyle = vgrad(x, hz, H*.62, [[0,'#2c3238'],[.4,'#1e252a'],[1,'#0e1418']]); x.fillRect(0, hz, W, H*.62 - hz);
    x.strokeStyle = 'rgba(160,176,190,.12)'; x.lineWidth = 1; for (let i = 0; i < 14; i++) { const y = lerp(hz + 2, H*.6, Math.pow(i/13, 1.5)); x.beginPath(); for (let j = 0; j <= 16; j++) { const xx = j*W/16, yy = y + Math.sin(j*1.7 + i)*(.6 + i*.08); j ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
    // the transports at anchor: hulls, bare masts, a stern lantern on some
    [[.42, .012, 1], [.55, .02, .8], [.7, .008, 1.1], [.86, .016, .9], [.5, .05, 1.4]].forEach(([u, v, s], i) => { const sx = W*u, sy = hz + H*v; x.fillStyle = '#0a0c10'; x.beginPath(); x.moveTo(sx - 12*s, sy); x.lineTo(sx + 12*s, sy); x.lineTo(sx + 9*s, sy + 3.4*s); x.lineTo(sx - 10*s, sy + 3.4*s); x.fill();
      x.fillRect(sx - 1*s, sy - 16*s, 1.1*s, 16*s); x.fillRect(sx + 5*s, sy - 11*s, 1*s, 11*s); x.fillRect(sx - 5*s, sy - 12*s, 9*s, .7*s); if (i % 2 === 0) { x.fillStyle = `rgba(${B62.lamp},.7)`; x.fillRect(sx + 10*s, sy - 1.6*s, 1.4, 1.4); } });
    // the beach: wet grey sand, a dark line of weed, a boat drawn up
    x.fillStyle = vgrad(x, H*.6, H*.68, [[0,'#3a3832'],[1,'#26241f']]); x.fillRect(0, H*.6, W, H*.08); x.fillStyle = 'rgba(10,12,10,.6)'; for (let i = 0; i < 40; i++) x.fillRect(hash(i, 6221)*W, H*(.635 + hash(i, 6222)*.01), 4 + hash(i, 6223)*8, 1);
    x.fillStyle = '#0e0e10'; x.beginPath(); x.moveTo(W*.14, H*.655); x.quadraticCurveTo(W*.18, H*.675, W*.22, H*.655); x.lineTo(W*.215, H*.645); x.lineTo(W*.145, H*.645); x.fill();
    // the bluff the camp stands on: a rise of mud and trodden grass from the beach, left to right
    x.fillStyle = vgrad(x, H*.62, H, [[0,'#1e1c18'],[.3,'#17150f'],[1,'#0a0908']]); x.beginPath(); x.moveTo(W*.3, H); x.lineTo(W*.3, H*.7); x.quadraticCurveTo(W*.42, H*.64, W*.6, H*.63); x.lineTo(W, H*.62); x.lineTo(W, H); x.fill();
    x.fillStyle = vgrad(x, H*.72, H, [[0,'#1a1814'],[1,'#080706']]); x.fillRect(0, H*.78, W*.32, H*.22); x.beginPath(); x.moveTo(0, H*.8); x.quadraticCurveTo(W*.16, H*.72, W*.34, H*.71); x.lineTo(W*.34, H*.8); x.fill(); // the near ground, mud
    // the tents in rows, going back along the bluff: small and many at the back, a few big at the front; some lit
    for (let row = 0; row < 5; row++) { const by = H*(.64 + row*.045 + row*row*.006), s = .34 + row*.17, n = 9 - row, x0 = W*(.42 - row*.02);
      for (let i = 0; i < n; i++) { const cx = x0 + i*(W*.62/n) + (row % 2)*W*.03; if (cx > W + 20) continue; const lit = hash(row*13 + i, 6224) > .62 ? hash(row, i + 6225) : 0; b62Tent(x, cx, by, s, lit, row < 2); } }
    // the lane between the rows: puddles holding what light there is
    for (let i = 0; i < 9; i++) { x.fillStyle = `rgba(150,160,176,${(.08 + hash(i, 6226)*.1).toFixed(2)})`; x.beginPath(); x.ellipse(W*(.36 + hash(i, 6227)*.6), H*(.8 + hash(i, 6228)*.16), 8 + hash(i, 6229)*14, 1.4 + hash(i, 6230)*1.6, 0, 0, 7); x.fill(); }
    // the awning over the squad's fire: a sheet of canvas on two poles, sagging with water
    x.fillStyle = '#2e2c28'; x.beginPath(); x.moveTo(W*.04, H*.7); x.quadraticCurveTo(W*.18, H*.74, W*.32, H*.69); x.lineTo(W*.33, H*.72); x.quadraticCurveTo(W*.18, H*.78, W*.03, H*.73); x.fill(); x.fillStyle = 'rgba(200,190,170,.08)'; x.fillRect(W*.05, H*.705, W*.26, 1);
    x.fillStyle = '#1a140e'; x.fillRect(W*.05, H*.71, 2.2, H*.25); x.fillRect(W*.31, H*.7, 2.2, H*.26);
  }), 0, 0, W, H);
  // the swell coming in on the beach, slow
  const wk = mo ? (Math.sin(t/2600) + 1)/2 : .5, wy = H*(.6 + wk*.012); ctx.fillStyle = 'rgba(190,200,210,.2)'; ctx.beginPath(); ctx.moveTo(0, wy); for (let i = 0; i <= 24; i++) ctx.lineTo(i*W/24, wy + Math.sin(i*1.1 + t*mo/700)*1.4); ctx.lineTo(W, wy + 2.4); ctx.lineTo(0, wy + 2.4); ctx.fill();
  // the lamps in the tents breathing a little, and the ships' lanterns
  ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 7; i++) glow(ctx, W*(.4 + hash(i, 6231)*.56), H*(.64 + hash(i, 6232)*.16), H*.05, '#ffb060', .08 + (mo ? Math.sin(t/900 + i*2)*.03 : 0)); glow(ctx, W*.12, hz - H*.08, H*.12, '#ffb060', .06); ctx.globalCompositeOperation = 'source-over';
  // the fire under the awning, guttering in the wet, and the squad round it
  const cx = W*.24, cy = H*.93; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy - 6, H*.3, '#ff8a3a', .26*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 7; i++) { const a = i/7*6.283; ell(ctx, cx + Math.cos(a)*11, cy + Math.sin(a)*3.4, 2.6, 1.8, '#2e2c28'); } poly(ctx, [[cx - 6, cy], [cx - 2, cy - 11*fl], [cx + 1, cy - 5], [cx + 3, cy - 9*fl], [cx + 6, cy]], 'rgba(255,140,60,.9)'); poly(ctx, [[cx - 3, cy], [cx, cy - 6*fl], [cx + 3, cy]], 'rgba(255,220,140,.9)');
  if (mo) for (let i = 0; i < 4; i++) { const k = ((t/1800 + i/4) % 1); ctx.fillStyle = `rgba(150,146,140,${(.3*(1 - k)).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(cx + 4 + k*16, cy - 12 - k*26, 3 + k*6, 2 + k*3, 0, 0, 7); ctx.fill(); } // smoke, flattened by the rain
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(20 + j*21), H*.99 - (j % 2)*3, 1.6, t, {phase:i, dir:-side}); });
  b62Rain(ctx, W, H, t, mo, 110, .2);
  vign(ctx, W, H, .65, .5); };

/* a village inland from the coast, in the rain, by day: flat-roofed mud-brick houses along a lane going back to a well, every door open and
   nobody in the doorways; a palm with its fronds hanging, a cart left with its shafts down, a dog sitting far off that will not come near */
function b62Village(x, W, H, hz, burning){
  x.fillStyle = vgrad(x, 0, hz, burning ? [[0,'#2a2624'],[.6,'#4a3e36'],[1,'#6a5444']] : [[0,'#3e4246'],[.6,'#5e6264'],[1,'#7a7c78']]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 8; i++) { x.fillStyle = burning ? 'rgba(30,24,22,.35)' : 'rgba(40,44,48,.3)'; x.beginPath(); x.ellipse(hash(i, 6241)*W, hz*(.15 + hash(i, 6242)*.5), W*(.16 + hash(i, 6243)*.1), hz*.07, 0, 0, 7); x.fill(); } // the cloud, low and grey
  x.fillStyle = burning ? '#3a3430' : '#565a58'; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 12; i++) x.lineTo(i*W/12, hz - H*(.02 + hash(i, 6244)*.03)); x.lineTo(W, hz + 2); x.lineTo(0, hz + 2); x.fill(); // low hills, far
  x.fillStyle = vgrad(x, hz, H, burning ? [[0,'#3a3226'],[1,'#14100c']] : [[0,'#5a5246'],[.4,'#3e382e'],[1,'#1e1a14']]); x.fillRect(0, hz, W, H - hz); // the ground, mud and scrub
  for (let i = 0; i < 60; i++) { x.fillStyle = ['#3a3a2a', '#4a4632', '#2e2c22'][i % 3]; const sx = hash(i, 6245)*W, sy = lerp(hz + 2, H, Math.pow(hash(i, 6246), 1.6)); x.beginPath(); x.ellipse(sx, sy, 2 + (sy - hz)/H*8, 1 + (sy - hz)/H*3, 0, 0, 7); x.fill(); } // scrub
}
function b62Houses(x, W, H, hz, burning){ const c = burning ? '#5a4a3a' : B62.brick, cd = burning ? '#2e261e' : B62.brickD;
  // the lane goes back toward a well at the village's middle; houses on both sides, smaller as they go
  x.fillStyle = burning ? 'rgba(60,50,40,.6)' : 'rgba(90,82,70,.55)'; x.beginPath(); x.moveTo(W*.36, H); x.lineTo(W*.5, hz + H*.06); x.lineTo(W*.56, hz + H*.06); x.lineTo(W*.78, H); x.fill(); // the lane
  [[.04, .2, .28], [.22, .13, .18], [.33, .08, .1], [.42, .05, .06]].forEach(([u, w, hh], i) => b62House(x, W*u, lerp(H*.96, hz + H*.07, i/3.6), W*w, H*hh, c, cd, i < 3 ? .5 : 0, i < 2 ? .14 : 0)); // the left side
  [[.6, .05, .06], [.66, .08, .1], [.76, .12, .17], [.86, .16, .26]].forEach(([u, w, hh], i) => b62House(x, W*u, lerp(hz + H*.07, H*.94, i/3.4), W*w, H*hh, shade(c, -.06), cd, i > 0 ? .2 : 0, i > 1 ? .66 : 0)); // the right side
  // the well at the lane's end, its frame and a bucket on the rope
  const wx = W*.53, wy = hz + H*.075; x.fillStyle = shade(c, -.1); x.fillRect(wx - 6, wy - 4, 12, 4); x.fillStyle = '#2a2018'; x.fillRect(wx - 6, wy - 13, 1.2, 9); x.fillRect(wx + 5, wy - 13, 1.2, 9); x.fillRect(wx - 6.6, wy - 13.6, 13.4, 1.2); x.fillRect(wx - .3, wy - 12.4, .6, 4.6); x.fillStyle = '#4a3a28'; x.fillRect(wx - 1.2, wy - 8, 2.4, 2);
}
SCENEX.b6_plague_village = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46;
  ctx.drawImage(sceneLayer('b62:village', W, H, (x, W, H) => {
    b62Village(x, W, H, hz, false);
    // a palm, behind the right-hand houses, its fronds hanging heavy with water
    const px = W*.72, py = hz + H*.02; x.strokeStyle = '#2a241c'; x.lineWidth = 3; x.beginPath(); x.moveTo(px, py + H*.1); x.quadraticCurveTo(px + 4, py - H*.12, px - 2, py - H*.26); x.stroke();
    x.strokeStyle = '#2e3426'; x.lineWidth = 2; for (let i = 0; i < 7; i++) { const a = -2.6 + i*.5, ex = px - 2 + Math.cos(a)*22, ey = py - H*.26 + Math.sin(a)*8 + 14; x.beginPath(); x.moveTo(px - 2, py - H*.26); x.quadraticCurveTo(px - 2 + Math.cos(a)*14, py - H*.26 + Math.sin(a)*6 - 2, ex, ey); x.stroke(); }
    b62Houses(x, W, H, hz, false);
    // left behind: a cart with its shafts down, a jar on its side, washing still on a line between two houses
    x.fillStyle = '#2a2018'; x.fillRect(W*.24, H*.8, W*.08, H*.03); x.strokeStyle = '#2a2018'; x.lineWidth = 1.6; x.beginPath(); x.moveTo(W*.32, H*.82); x.lineTo(W*.37, H*.88); x.moveTo(W*.32, H*.81); x.lineTo(W*.38, H*.86); x.stroke(); x.beginPath(); x.arc(W*.27, H*.84, H*.03, 0, 7); x.stroke();
    x.fillStyle = '#7a5a3a'; x.beginPath(); x.ellipse(W*.66, H*.82, 5, 3.4, .4, 0, 7); x.fill(); x.fillStyle = '#0a0806'; x.beginPath(); x.ellipse(W*.69, H*.8, 1.6, 1.2, .4, 0, 7); x.fill();
    x.strokeStyle = 'rgba(30,26,20,.8)'; x.lineWidth = .6; x.beginPath(); x.moveTo(W*.24, H*.72); x.quadraticCurveTo(W*.29, H*.75, W*.34, H*.73); x.stroke(); [['#8a7a64', .26], ['#6a6e78', .29], ['#8a6a5a', .32]].forEach(([c, u]) => { x.fillStyle = c; x.fillRect(W*u, H*.735, 4, 6); });
    // a rag tied to a doorpost: the ones who left, leaving word
    x.fillStyle = '#c8bca0'; x.fillRect(W*.86 + W*.16*.2 - 2, H*.94 - H*.26*.5, 2, 5);
    // puddles in the lane
    for (let i = 0; i < 8; i++) { const k = hash(i, 6251), py2 = lerp(hz + H*.1, H*.98, k), half = lerp(W*.03, W*.2, k); x.fillStyle = `rgba(150,156,160,${(.12 + hash(i, 6252)*.12).toFixed(2)})`; x.beginPath(); x.ellipse(lerp(W*.53, W*.57, hash(i, 6253)) + (hash(i, 6254) - .5)*half, py2, 4 + k*14, 1 + k*2, 0, 0, 7); x.fill(); }
  }), 0, 0, W, H);
  // the dog, far down the lane by the well, sitting; it lifts its head now and then and will not come
  const dx = W*.585, dy = hz + H*.085, up = mo ? (Math.sin(t/2400) > .6 ? 1 : 0) : 0; ctx.fillStyle = '#1e1812'; ctx.beginPath(); ctx.ellipse(dx, dy - 2, 3.4, 2.2, -.5, 0, 7); ctx.fill(); ctx.fillRect(dx + 1, dy - 2, 1, 2.4); ctx.fillRect(dx - 2.6, dy - 1, 1, 1.6);
  ctx.beginPath(); ctx.ellipse(dx + 2.4, dy - 4.6 - up, 1.6, 1.2, 0, 0, 7); ctx.fill(); ctx.fillRect(dx + 3.2, dy - 4.4 - up, 1.8, .9); ctx.fillRect(dx + 1.6, dy - 6.2 - up, .7, 1.2); ctx.fillRect(dx - 3.4, dy - 1.4, 2.4, .6); // head, muzzle, an ear; the tail
  // rain rings in the puddles
  if (mo) for (let i = 0; i < 10; i++) { const k = ((t/900 + hash(i, 6255)) % 1), rx = W*(.45 + hash(i, 6256)*.2), ry = lerp(hz + H*.14, H*.96, hash(i, 6257)); ctx.strokeStyle = `rgba(200,210,220,${(.3*(1 - k)).toFixed(2)})`; ctx.lineWidth = .6; ctx.beginPath(); ctx.ellipse(rx, ry, 1 + k*5, .4 + k*1.4, 0, 0, 7); ctx.stroke(); }
  // the squad coming up the lane, in front
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.06 + i*24, H*.985 - (i % 2)*3, 1.6, t, {phase:i}));
  b62Rain(ctx, W, H, t, mo, 100, .24, .1);
  vign(ctx, W, H, .55, .5); };

/* the same village from the road, burning at a distance: smoke leaning inland, fire behind the roofs and in the doorways, the rain not putting it
   out; the squad on the road in front with their backs to it, small. Never a figure in the fire (an extra scene for the 'burn' road, if wanted) */
SCENES.b6_c2_burning = {loc:'Inland from the coast', sub:'The village burning · rain', cap:'Smoke going up into the rain, the roofs alight one after another, and the road going on.', amb:'explore'};
SCENEX.b6_c2_burning = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b62:burning', W, H, (x, W, H) => {
    b62Village(x, W, H, hz, true);
    x.save(); x.translate(W*.5, hz + H*.02); x.scale(.55, .55); x.translate(-W*.5, -hz - H*.02); b62Houses(x, W, H, hz, true); x.restore(); // the village, further off
    x.globalCompositeOperation = 'lighter'; glow(x, W*.52, hz + H*.02, H*.36, '#ff7a2a', .35); x.globalCompositeOperation = 'source-over';
    // the road in front, toward the right
    x.fillStyle = 'rgba(80,66,50,.6)'; x.beginPath(); x.moveTo(0, H*.9); x.quadraticCurveTo(W*.5, H*.78, W, H*.82); x.lineTo(W, H*.9); x.quadraticCurveTo(W*.5, H*.86, 0, H); x.fill();
  }), 0, 0, W, H);
  // smoke columns, leaning inland, rising slow
  for (let c = 0; c < 3; c++) { const bx = W*(.42 + c*.08); for (let i = 0; i < 9; i++) { const k = mo ? ((t/6000 + i/9 + c*.13) % 1) : i/9, y = hz - k*H*.5, xx = bx + k*W*.2 + Math.sin(i + c)*4, r = 6 + k*28; ctx.fillStyle = `rgba(${30 + c*6},${26 + c*4},${24},${(.55*(1 - k*.8)).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(xx, y, r, r*.7, 0, 0, 7); ctx.fill(); } }
  // fire in the roofs, far off: a few houses alight, each its own ragged flame
  [[.44, .9], [.49, 1.3], [.53, 1.6], [.57, 1.1], [.61, .8]].forEach(([u, k], i) => { const fx = W*u, fy = hz + H*(.03 + hash(i, 6261)*.015), fh = H*.05*k*fl*(mo ? 1 + Math.sin(t/170 + i*2)*.12 : 1), fw = W*.012*(1 + k*.5);
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy - fh*.4, fh*1.4, '#ff7a2a', .3); ctx.globalCompositeOperation = 'source-over';
    poly(ctx, [[fx - fw, fy], [fx - fw*.7, fy - fh*.5], [fx - fw*.3, fy - fh*.4], [fx - fw*.1, fy - fh], [fx + fw*.25, fy - fh*.55], [fx + fw*.5, fy - fh*.8], [fx + fw*.8, fy - fh*.35], [fx + fw, fy]], 'rgba(255,130,40,.9)');
    poly(ctx, [[fx - fw*.5, fy], [fx - fw*.1, fy - fh*.55], [fx + fw*.4, fy - fh*.3], [fx + fw*.5, fy]], 'rgba(255,214,120,.9)'); });
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.52, hz, H*.14, '#ffb050', .2*fl); ctx.globalCompositeOperation = 'source-over';
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.56 + i*W*.06, H*.88 - i*H*.004, 1.6, t, {phase:i}));
  b62Rain(ctx, W, H, t, mo, 90, .2, .1);
  vign(ctx, W, H, .6, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Six's ground ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on dark ash with a thin bone rim (Claude's call: 100b's walls) */
function b62Item(key, label, body){ const w = 240, h = 130, id = 'c62-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#3a322c"></stop><stop offset=".7" stop-color="#1e1a16"></stop><stop offset="1" stop-color="#100d0b"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c8b08a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a Falari axe: an ash haft wrapped in red leather at the grip, copper bands, a broad bearded blade with a wave cut in it */
b62Item('b6_c2_falariaxe', 'A Falari axe', '<ellipse cx="120" cy="70" rx="92" ry="28" fill="#e8d8c0" opacity=".05"/><g transform="rotate(-12 120 66)">'
  + '<rect x="24" y="62" width="150" height="8" rx="3" fill="#b8925e"/><rect x="24" y="62" width="150" height="2.5" rx="1" fill="#e2c490" opacity=".6"/><path d="M30 70 L172 70" stroke="#6a4c2c" stroke-width="1"/>'
  + '<rect x="30" y="61" width="40" height="10" rx="2" fill="#8a3a1e"/><g stroke="#3a1206" stroke-width="1.2"><path d="M34 61 L38 71 M40 61 L44 71 M46 61 L50 71 M52 61 L56 71 M58 61 L62 71 M64 61 L68 71"/></g><rect x="30" y="61" width="40" height="2" fill="#d86a3a" opacity=".5"/>'
  + '<rect x="146" y="59.5" width="5" height="13" rx="1" fill="#b8642a"/><rect x="162" y="59.5" width="5" height="13" rx="1" fill="#b8642a"/><rect x="146" y="59.5" width="5" height="3" fill="#f0b070" opacity=".7"/><rect x="162" y="59.5" width="5" height="3" fill="#f0b070" opacity=".7"/>'
  + '<path d="M168 58 Q186 54 196 30 Q214 58 208 104 Q196 94 186 90 Q176 82 168 74 Z" fill="#8e8c86"/><path d="M168 58 Q186 54 196 30 Q200 40 202 50 Q186 62 172 66 Z" fill="#c8c6c0" opacity=".55"/>'
  + '<path d="M196 30 Q214 58 208 104" fill="none" stroke="#f4f2ea" stroke-width="2"/><path d="M168 58 Q186 54 196 30 Q214 58 208 104 Q196 94 186 90 Q176 82 168 74 Z" fill="none" stroke="#26241f" stroke-width="1.2"/>'
  + '<path d="M176 66 Q186 64 192 56 M178 74 Q188 72 194 64" fill="none" stroke="#4a3a30" stroke-width="1.1"/><g fill="#5a3a22" opacity=".45"><circle cx="184" cy="80" r="1.6"/><circle cx="190" cy="48" r="1.1"/><circle cx="200" cy="88" r="1.3"/></g>'
  + '<path d="M24 63 Q18 66 24 70" fill="#6a4c2c"/></g>');
/* an oilskin cape: a short hooded cape of oiled canvas, waxed to a sheen, beaded with rain, horn toggles at the throat */
b62Item('b6_c2_oilskin', 'An oilskin cape', '<ellipse cx="120" cy="72" rx="78" ry="34" fill="#c8d4dc" opacity=".05"/>'
  + '<path d="M120 22 Q100 22 94 40 L64 104 Q92 114 120 112 Q148 114 176 104 L146 40 Q140 22 120 22 Z" fill="#5a5a3e"/>'
  + '<path d="M120 22 Q100 22 94 40 L64 104 Q92 114 120 112 L120 40 Z" fill="#6e6c4a"/><path d="M104 30 Q120 44 136 30 Q132 50 120 52 Q108 50 104 30 Z" fill="#3a3a26"/>'
  + '<path d="M94 40 L64 104" stroke="#a8a678" stroke-width="1.6" opacity=".55"/><path d="M100 46 Q92 78 84 104" stroke="#c8c69a" stroke-width="2.4" fill="none" opacity=".35"/><path d="M140 52 Q150 80 158 104" stroke="#2a2a1a" stroke-width="1.4" fill="none" opacity=".6"/>'
  + '<path d="M120 52 L120 112" stroke="#2e2e1e" stroke-width="1.4"/><g fill="#e0d4b8"><rect x="114" y="56" width="12" height="3.6" rx="1.8"/><rect x="114" y="68" width="12" height="3.6" rx="1.8"/></g>'
  + '<g fill="#dce8f0" opacity=".7">' + [[86, 70], [96, 88], [104, 62], [134, 74], [150, 92], [76, 96], [142, 58], [112, 96], [128, 100], [160, 98]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.4" ry="2"/>`).join('') + '</g>'
  + '<g fill="#ffffff" opacity=".85">' + [[86, 70], [104, 62], [150, 92], [128, 100]].map(([x, y]) => `<circle cx="${x - .4}" cy="${y - .7}" r=".5"/>`).join('') + '</g>');
/* a D'rek charm: a disc of old bone with the Worm of Autumn carved coiling into itself, on a knotted cord, a bead of dull bronze */
b62Item('b6_c2_drekcharm', 'A D\'rek charm', '<ellipse cx="120" cy="72" rx="64" ry="34" fill="#e8dcc0" opacity=".05"/>'
  + '<path d="M70 26 Q96 50 112 52 M170 26 Q144 50 128 52" fill="none" stroke="#6a5438" stroke-width="2"/><path d="M70 26 Q96 50 112 52" fill="none" stroke="#a88a5e" stroke-width=".7" opacity=".7"/>'
  + '<circle cx="120" cy="52" r="4" fill="#8a6a3a"/><circle cx="118.8" cy="50.8" r="1.4" fill="#d8b070" opacity=".6"/>'
  + '<circle cx="120" cy="84" r="28" fill="#cfc2a2"/><circle cx="120" cy="84" r="28" fill="none" stroke="#7a6a4a" stroke-width="1.6"/><path d="M98 70 Q108 60 124 58" fill="none" stroke="#f0e8d0" stroke-width="2" opacity=".6"/>'
  + '<path d="M120 64 Q140 64 140 84 Q140 102 120 102 Q102 102 102 86 Q102 72 118 72 Q130 72 130 84 Q130 94 120 94 Q112 94 112 86 Q112 80 119 80" fill="none" stroke="#5a4a32" stroke-width="3.4" stroke-linecap="round"/>'
  + '<path d="M120 64 Q140 64 140 84 Q140 102 120 102 Q102 102 102 86" fill="none" stroke="#3a2e1e" stroke-width="1" opacity=".6"/><circle cx="119" cy="80" r="2.2" fill="#3a2e1e"/>'
  + '<g stroke="#5a4a32" stroke-width=".8" opacity=".55"><path d="M124 63 l1 2.6 M132 66 l-.4 2.6 M138 74 l-2.4 1 M140 86 l-2.6 0 M136 96 l-2 -1.6 M126 101 l-1 -2.4 M112 100 l.6 -2.4 M104 92 l2.4 -1"/></g>'
  + '<g fill="#8a7650" opacity=".35"><circle cx="100" cy="98" r="1.2"/><circle cx="142" cy="72" r=".9"/></g>');
