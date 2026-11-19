/* ============ Book Six, Chapter 2 art: The North Coast — the Host's camp above the sea in the rain, the empty villages inland ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d, lit from the left: Brannoc, Falari, loaned to the Seventh (red hair, a red beard he is
   proud of, mail under the Host's blue-grey, two Falari boarding axes and a coil of tarred line (v13.51), a tin whistle at his throat); and the followers of the Chosen (b6_cultist):
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
     red edging at the hem); a Falari boarding axe on the shoulder and its twin in the left fist, the tarred line coiled at the belt (v13.51); a tin whistle on a cord at his throat */
  brannoc(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.08, 1.04);
    B2F.line(ctx, '#6a4a2c', 1.5, [[5.4, 6], [9.4, -14.4]]); ctx.fillStyle = '#7a3a22'; ctx.fillRect(5.6, 2.6, 1.8, 2.4); // the haft, wrapped red at the grip
    poly(ctx, [[8.4,-13],[12.8,-16.2],[13.6,-11.4],[12,-9],[10,-9.8]], '#9a9890'); poly(ctx, [[12.8,-16.2],[13.6,-11.4],[12.8,-10.4],[12.2,-14.8]], '#d8d4c8'); poly(ctx, [[8.4,-13.6],[5.2,-14.8],[8,-11.4]], '#8a8880'); ctx.fillStyle = '#b8642a'; ctx.fillRect(8.4, -13.2, 1.8, 1.1); // a boarding axe: the short bit, its lit edge, the spike behind; a copper band (v13.51)
    h.legs('#2e2c2a'); ctx.fillStyle = '#1a1614'; ctx.fillRect(-4.6, 10.6, 3.6, 2.4); ctx.fillRect(1, 10.6, 3.6, 2.4); // boots
    h.torso('#9a968c', '#34322e', 7.2); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 4; i++){ ctx.moveTo(-7, -4 + i*2.4); ctx.lineTo(7, -4 + i*2.4); } ctx.stroke(); // mail
    poly(ctx, [[-4.6,-5.6],[4.6,-5.6],[5.4,7.6],[-5.4,7.6]], h.armor('#6e7e8c', '#26303a')); ctx.fillStyle = '#8a3a24'; ctx.fillRect(-5.4, 6.4, 10.8, 1.2); ctx.fillStyle = 'rgba(220,230,240,.12)'; ctx.fillRect(-4.4, -5, 1.2, 11); // the blue-grey surcoat, red at the hem
    ctx.fillStyle = '#4a3420'; ctx.fillRect(-5.6, 2, 11.2, 1.3); ctx.fillStyle = '#b8a070'; ctx.fillRect(-.8, 1.9, 1.6, 1.5); // the belt
    ctx.fillStyle = '#c49c80'; ctx.fillRect(-9, -4.6, 2.2, 5.6); ell(ctx, 6.6, 3.4, 1.7, 1.5, '#c49c80'); // a bare forearm, the fist on the haft
    B2F.line(ctx, '#6a4a2c', 1.4, [[-7.6, 3.6], [-10, -9.4]]); poly(ctx, [[-10.2,-9.6],[-13.8,-11.2],[-14.2,-6.8],[-11.2,-5.6]], '#9a9890'); poly(ctx, [[-13.8,-11.2],[-14.2,-6.8],[-13.4,-6.6],[-13,-10.6]], '#d8d4c8'); poly(ctx, [[-9.6,-9.4],[-6.8,-10.6],[-9.2,-7.4]], '#8a8880'); ell(ctx, -7.9, 1.2, 1.5, 1.4, '#c49c80'); // the second axe, head up in the left fist
    ctx.strokeStyle = '#1e1810'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(3.4, 5.2, 1.9, 2.6, 0, 0, Math.PI*2); ctx.stroke(); ctx.strokeStyle = '#4a3a26'; ctx.lineWidth = .5; ctx.beginPath(); ctx.ellipse(3.4, 5.2, 1.2, 1.9, 0, 0, Math.PI*2); ctx.stroke(); // the boarding line, coiled at the belt
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
  /* a Falari boarding axe slung behind each shoulder, the hafts leaning in (v13.51): ash hafts wrapped with red leather, a short bearded bit and a spike behind it for the other ship's planking */
  const axe = sx => { ctx.save(); ctx.translate(41*sx, 6); ctx.scale(sx, 1); ctx.rotate(-.2); ctx.lineCap = 'butt';
    ctx.strokeStyle = PR.lin(ctx, -2, 0, 2, 0, [[0, '#b8925e'], [.5, '#6a4c2c'], [1, '#1e140a']]); ctx.lineWidth = 3.8; ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0, -106); ctx.stroke();
    ctx.fillStyle = PR.lin(ctx, -2.2, 0, 2.2, 0, [[0, '#c86a3a'], [.5, '#7a321a'], [1, '#2a0e06']]); ctx.fillRect(-2.2, -34, 4.4, 22); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { for (let i = 0; i < 9; i++){ ctx.moveTo(-2.2, -33 + i*2.5); ctx.lineTo(2.2, -31.6 + i*2.5); } }); // the red grip-wrap
    ctx.fillStyle = PR.lin(ctx, -3, 0, 3, 0, [[0, '#f0b070'], [.5, '#b8642a'], [1, '#4a2008']]); ctx.fillRect(-2.6, -99, 5.2, 3); ctx.fillRect(-2.6, -86, 5.2, 2.2); // copper bands at the eye
    const blade = () => { ctx.beginPath(); ctx.moveTo(1.6, -99); ctx.bezierCurveTo(8, -100, 13, -106, 16, -113); ctx.quadraticCurveTo(20.6, -98, 18, -80); ctx.bezierCurveTo(14, -84, 10, -87, 6, -86); ctx.lineTo(1.6, -86); ctx.closePath(); };
    const spike = () => { ctx.beginPath(); ctx.moveTo(-1.6, -98); ctx.lineTo(-14, -93.6); ctx.lineTo(-1.6, -88.4); ctx.closePath(); };
    spike(); ctx.fillStyle = PR.lin(ctx, -14, -98, -2, -88, [[0, '#c8c6c0'], [1, '#3a3832']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = .6; spike(); ctx.stroke();
    blade(); ctx.fillStyle = PR.lin(ctx, 2, -108, 20, -82, [[0, '#d8d6d0'], [.4, '#8e8c86'], [1, '#26241f']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = .6; blade(); ctx.stroke();
    PR.stroke(ctx, 'rgba(255,255,250,.7)', .8, () => { ctx.moveTo(16.4, -111); ctx.quadraticCurveTo(20, -98, 17.6, -82); }); // the edge, honed bright
    ctx.save(); blade(); ctx.clip(); const r = PR.rng(211 + (sx < 0 ? 7 : 0)); for (let i = 0; i < 8; i++) PR.soft(ctx, 5 + r()*12, -106 + r()*22, 1 + r()*2, .6 + r(), '#3a2414', .35, r()*3); ctx.restore(); // the rust of a wet coast, scrubbed at
    PR.stroke(ctx, 'rgba(60,40,30,.6)', .5, () => { ctx.moveTo(5, -96); ctx.bezierCurveTo(8, -96, 11, -99, 12.6, -102); ctx.moveTo(6, -91.6); ctx.bezierCurveTo(9, -91.6, 12, -94, 13.6, -97); }); // a wave cut in the steel, Falari work
  ctx.restore(); };
  axe(-1); axe(1);
  BP.back(ctx, F, '#b4482a', '#3a1206', 20, 2); PR.neck(ctx, F, 11.2);
  /* mail to the throat under a blue-grey surcoat, a padded collar, a leather baldric */
  const B = BP.body(ctx, F, {wide:58, drop:1, trap:7, ny:F.cy + 15.8, cb:F.cy + 21, c1:'#94908a', c2:'#2a2826'}); ctx.save(); B.path(); ctx.clip();
    PR.mail(ctx, -60, 60, -66, 2, '#94908a', 2.1); PR.soft(ctx, 34, -24, 30, 26, '#000000', .45); PR.soft(ctx, -30, -34, 22, 12, '#f0e6d8', .12);
    PR.path(ctx, [[-34, 4], [-30, -30], [-16, -36], [16, -36], [30, -30], [34, 4]]); ctx.fillStyle = PR.lit(ctx, '#66788a', '#222c36', -34, 30); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.55)', .7, () => { ctx.moveTo(-34, 4); ctx.lineTo(-30, -30); ctx.lineTo(-16, -36); ctx.moveTo(16, -36); ctx.lineTo(30, -30); ctx.lineTo(34, 4); }); // the surcoat, the Host's blue-grey
    PR.stroke(ctx, 'rgba(220,232,240,.3)', .6, () => { ctx.moveTo(-29, -28); ctx.lineTo(-32, 2); }); PR.soft(ctx, -20, -18, 8, 14, '#dfe8f0', .1); const r2 = PR.rng(223); for (let i = 0; i < 18; i++) PR.soft(ctx, -30 + r2()*60, -32 + r2()*32, .6 + r2()*1.4, .6 + r2()*1.4, '#c8dce8', .25); // rain on it
    ctx.fillStyle = PR.lit(ctx, '#9a3a22', '#3a1006', -34, 30); PR.path(ctx, [[-34, -4], [34, -4], [34, 4], [-34, 4]]); ctx.fill(); // Sweetcreek's red at the hem
    ctx.fillStyle = PR.lit(ctx, '#6a4a2e', '#22160a', -30, 30); PR.path(ctx, [[-34, -38], [-28, -42], [38, 2], [30, 2]]); ctx.fill(); PR.stitch(ctx, 'rgba(220,180,120,.4)', .35, () => { ctx.moveTo(-31, -38.6); ctx.lineTo(33.6, 1.4); }); // the baldric
    { const rr = PR.rng(241); for (let k = 0; k < 4; k++){ const o = 5.4 + k*3.1; PR.stroke(ctx, '#17120c', 2.7, () => { ctx.moveTo(-36, -37 + o); ctx.lineTo(36, 3 + o); }); PR.stroke(ctx, 'rgba(150,120,84,.5)', .5, () => { for (let q = 0; q < 20; q++){ const x = -34 + q*3.5 + rr(); ctx.moveTo(x, -36.6 + o + (x + 36)*.555); ctx.lineTo(x + 1.5, -37.4 + o + (x + 37.5)*.555); } }); } } // the boarding line, tarred, coiled bandolier-wise under the baldric (v13.51)
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

/* v13.33 (pictures against text): the chapter's end page, "the column on the road south in the rain", the village small behind it: burnt, a smudge
   of smoke going flat in the wind (burn), or with its roofs on and one chimney going (pass) */
{ const _pv = SCENEX.b6_plague_village; SCENEX.b6_plague_village = (cv, t) => { if (!(S && S.scene === 'chend' && S.chapter === 2)) return _pv(cv, t);
  const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, burnt = ((S.chapters && S.chapters[2]) || (S.f && S.f.b6_c2_key)) !== 'pass', hz = H*.5;
  const rd = k => [lerp(-W*.02, W*1.02, k), lerp(H*.9, H*.66, k) + Math.sin(k*4)*H*.02];
  ctx.drawImage(sceneLayer('b62:end' + (burnt ? 'b' : 'p'), W, H, (x, W, H) => {
    b62Village(x, W, H, hz, false);
    x.save(); x.translate(W*.22, hz + H*.02); x.scale(.32, .32); x.translate(-W*.5, -hz - H*.02); b62Houses(x, W, H, hz, burnt); x.restore(); // the village, behind, small
    if (burnt) { x.fillStyle = 'rgba(30,24,20,.35)'; x.fillRect(W*.06, hz + H*.005, W*.3, H*.04); } // its roofs gone, black
    { const L = [], R = []; for (let i = 0; i <= 24; i++) { const k = i/24, [px, py] = rd(k), w = lerp(16, 9, k); L.push([px, py - w]); R.push([px, py + w]); } poly(x, L.concat(R.reverse()), 'rgba(80,72,60,.6)'); } // the road south, across the frame
  }), 0, 0, W, H);
  if (burnt) for (let i = 0; i < 26; i++) { const k = mo ? ((t/9000 + i/26) % 1) : i/26; ell(ctx, W*.2 + k*W*.55, hz - H*.03 - k*H*.05 + Math.sin(i*1.7)*2, 12 + k*44, 4 + k*7, `rgba(34,30,30,${(.26*(1 - k*.7)).toFixed(2)})`); } // a smudge of smoke going flat in the wind
  else for (let i = 0; i < 16; i++) { const k = mo ? ((t/7000 + i/16) % 1) : i/16; ell(ctx, W*.235 + k*W*.04, hz - H*.02 - k*H*.18, 2 + k*6, 1.6 + k*4, `rgba(170,170,166,${(.3*(1 - k*.8)).toFixed(2)})`); } // one chimney going
  for (let i = 0; i < 26; i++) { const k = .3 + i/26*.7, [px, py] = rd(k), s = lerp(1.6, 1, k); b65Tiny(ctx, px, py + 2, s, '#262420', false, mo ? Math.sin(t/220 + i)*.5 : 0); } // the column, going on south
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const [px, py] = rd(.04 + i*.045); drawFigure(ctx, id, px, py - 2, 1.5, t, {phase:i, dir:1}); });
  b62Rain(ctx, W, H, t, mo, 100, .24, .1);
  vign(ctx, W, H, .55, .5); }; }

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

/* ---------------- ground: Seven Cities mud-brick, shared with 104b (G'danisban) ----------------
   b6MudWall draws a wall or a house from above: a flat plastered top with a raised lip on its open sides and, where it stands over open
   ground to the south, its face: plaster gone in patches to the brick under it, the rain's dark streaks down it. Light from the upper left. */
const b6WallC = c => c === '#' || c === 'D' || c === 'E' || c === 'G';
function b6MudWall(ctx, x, y, T, P, N, tall = .44){
  const px = x*T, py = y*T, h = hash(x, y), W = (dx, dy) => b6WallC(b2Tile(x + dx, y + dy)), face = !W(0, 1), fy = face ? py + T*(1 - tall) : py + T;
  ctx.fillStyle = shade(P.top, (h - .5)*.07); ctx.fillRect(px, py, T, fy - py); b2Mottle(ctx, x, y, T, N ? .03 : .07, N ? .2 : .13, P.lit, 1.1); // the roof or the wall's top, plastered flat
  ctx.strokeStyle = P.crack; ctx.lineWidth = 1; for (let i=0;i<2;i++){ const sx = px + hash(x,y,i+20)*T, sy = py + hash(y,x,i+21)*(fy - py); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + (hash(x,y,i+22) - .5)*T*.36, sy + hash(x,y,i+23)*T*.2); ctx.stroke(); } // cracks in the plaster
  const lip = Math.max(2, T*.07); // the parapet: lit where it faces up and left, in shade where it faces right
  if (!W(0, -1)) { ctx.fillStyle = P.topL; ctx.fillRect(px, py, T, lip); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(px, py + lip, T, Math.max(1, T*.025)); }
  if (!W(-1, 0)) { ctx.fillStyle = P.topL; ctx.fillRect(px, py, lip, fy - py); }
  if (!W(1, 0)) { ctx.fillStyle = shade(P.top, -.22); ctx.fillRect(px + T - lip, py, lip, fy - py); }
  if (!face && W(0, -1) && W(-1, 0) && W(1, 0) && hash(x,y,5) > .55) { // on a roof inside the block: a hatch, a jar, a mat drying
    const k = hash(x,y,6); if (k > .66) { ctx.fillStyle = N ? shade(P.top, -.45) : P.door; ctx.fillRect(px + T*.3, py + T*.32, T*.24, T*.22); ctx.fillStyle = P.topL; ctx.fillRect(px + T*.3, py + T*.32, T*.24, Math.max(1, T*.025)); }
    else if (k > .33) { ell(ctx, px + T*.56, py + T*.62, T*.1, T*.08, 'rgba(0,0,0,.3)'); ell(ctx, px + T*.52, py + T*.56, T*.09, T*.09, P.jar); ell(ctx, px + T*.5, py + T*.53, T*.03, T*.03, N ? 'rgba(160,170,200,.2)' : 'rgba(255,240,210,.45)'); }
    else { ctx.fillStyle = P.mat; ctx.fillRect(px + T*.18, py + T*.24, T*.5, T*.34); ctx.strokeStyle = 'rgba(0,0,0,.18)'; for (let i=1;i<5;i++){ ctx.beginPath(); ctx.moveTo(px + T*.18, py + T*(.24 + i*.068)); ctx.lineTo(px + T*.68, py + T*(.24 + i*.068)); ctx.stroke(); } } }
  if (!face) return {face, fy};
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px, fy - T*.03, T, T*.04); // the lip's shadow on the face
  const g = ctx.createLinearGradient(0, fy, 0, py + T); g.addColorStop(0, P.faceL); g.addColorStop(1, P.face); ctx.fillStyle = g; ctx.fillRect(px, fy, T, py + T - fy);
  for (let i=0;i<2;i++) if (hash(x,y,i+30) > .45) { const bx = px + hash(x,y,i+31)*T*.66, by = fy + (py + T - fy)*(.12 + hash(x,y,i+32)*.4), bw = T*(.18 + hash(x,y,i+33)*.14), bh = (py + T - fy)*.36; // plaster gone, the brick under it
    ctx.fillStyle = P.brickD; ctx.fillRect(bx, by, bw, bh); ctx.fillStyle = P.brick; for (let r=0;r<3;r++) for (let c=0;c<3;c++){ const cx = bx + (c + (r%2)*.5)*bw/3, cy = by + r*bh/3; if (cx + bw/3 - 1 > bx + bw) continue; ctx.fillRect(cx + .5, cy + .5, bw/3 - 1.5, bh/3 - 1.5); } }
  ctx.fillStyle = N ? 'rgba(0,0,0,.22)' : 'rgba(60,44,30,.2)'; for (let i=0;i<3;i++){ const sx = px + hash(x,y,i+40)*T, w = T*(.04 + hash(x,y,i+41)*.05); ctx.fillRect(sx, fy + T*.02, w, (py + T - fy)*(.4 + hash(x,y,i+42)*.6)); } // rain streaks down from the lip
  if (!W(-1, 0)) { ctx.fillStyle = N ? 'rgba(160,170,210,.06)' : 'rgba(255,246,224,.18)'; ctx.fillRect(px, fy, T*.05, py + T - fy); } if (!W(1, 0)) { ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(px + T*.95, fy, T*.05, py + T - fy); }
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(px, py + T - Math.max(1, T*.04), T, Math.max(1, T*.04)); // damp at the foot
  return {face, fy}; }
/* a doorway in a wall's face: the dark of a house with its door open, or (shut) the door pulled to and a line of light under it at night */
function b6Door(ctx, x, y, T, P, N, fy, shut){ const px = x*T, py = y*T, cx = px + T*.5, w = T*.36, top = fy + T*.06;
  ctx.fillStyle = P.door; ctx.beginPath(); ctx.moveTo(cx - w/2, py + T); ctx.lineTo(cx - w/2, top + w*.3); ctx.quadraticCurveTo(cx, top - w*.12, cx + w/2, top + w*.3); ctx.lineTo(cx + w/2, py + T); ctx.fill(); // the opening, a low arch
  if (shut) { ctx.fillStyle = P.wood; ctx.fillRect(cx - w*.42, top + w*.28, w*.84, py + T - top - w*.28); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; for (let i=1;i<3;i++){ ctx.beginPath(); ctx.moveTo(cx - w*.42 + i*w*.28, top + w*.3); ctx.lineTo(cx - w*.42 + i*w*.28, py + T); ctx.stroke(); }
    if (N) { ctx.fillStyle = 'rgba(255,190,110,.75)'; ctx.fillRect(cx - w*.4, py + T - Math.max(1.5, T*.035), w*.8, Math.max(1.5, T*.03)); glow(ctx, cx, py + T, T*.4, '#ffb060', .22); } }
  else { ctx.fillStyle = P.wood; ctx.beginPath(); ctx.moveTo(cx + w/2, py + T); ctx.lineTo(cx + w/2, top + w*.3); ctx.lineTo(cx + w*.82, top + w*.42); ctx.lineTo(cx + w*.82, py + T + T*.02); ctx.fill(); } // the door, standing open against the wall
  ctx.strokeStyle = P.topL; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(cx - w/2 - 1, top + w*.3); ctx.quadraticCurveTo(cx, top - w*.16, cx + w/2 + 1, top + w*.3); ctx.stroke(); // the plastered reveal round the arch
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(cx - w*.6, py + T*.92, w*1.2, T*.08); }

/* ---------------- ground: TILEX.b6_c2_coast — the north coast of Seven Cities inland from Ehrlitan, in the rain ----------------
   Dry hill country gone damp: pale soil, grey-green thorn scrub, limestone breaking through, a track worn white with puddles in it, the
   hamlets mud-brick and plaster with flat roofs; a cool light off the sea from the north. Replaces Book Three's Pannion farm ground
   (b3_c5_domin), which this chapter borrowed. '.' the track or the yard, ',' scrub and stony ground, '#' a mud-brick wall (blocks),
   'D' a house with its door open, 'E' the last house (its door shut), 'w' a well, 'x' a dead tamarisk, 'F' a fire on the march; a battle's
   't' is the engine's fallen stone. N = night (the village, the headland). */
const b62CP = N => N ? {soil:'#34322e', track:'#383530', grit:'#1c1b1a', pebble:'#55524c', scrub:'#222a24', scrubL:'#34403a', scrubD:'#121614', lime:'#56565a', limeL:'#6e6f74', limeD:'#26262a',
    top:'#5e5950', topL:'#767064', face:'#2c2824', faceL:'#3e3933', brick:'#3e342a', brickD:'#1c1712', crack:'rgba(0,0,0,.35)', door:'#060504', wood:'#2a2018', jar:'#3a2c22', mat:'#34302a',
    bark:'#5c5e66', barkD:'#24252a', pool:'#1a1e24', poolL:'rgba(130,150,190,.22)', lit:'160,176,214', sea:'90,120,165', wet:'10,12,16'}
  : {soil:'#9c8a68', track:'#a4936f', grit:'#6e604a', pebble:'#d0c6ae', scrub:'#5e6650', scrubL:'#868c6e', scrubD:'#363c2e', lime:'#bdb39a', limeL:'#dcd4be', limeD:'#7e7462',
    top:'#bca882', topL:'#d6c6a0', face:'#957f5c', faceL:'#ad9772', brick:'#8a6e4c', brickD:'#5e4a32', crack:'rgba(90,70,44,.32)', door:'#1a120c', wood:'#5a4228', jar:'#8a5a36', mat:'#a89a6a',
    bark:'#d2c8b2', barkD:'#7e7462', pool:'#6e6e66', poolL:'rgba(220,230,236,.4)', lit:'255,248,232', sea:'176,198,214', wet:'40,34,26'};
function b62Coast(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y), P = b62CP(N), fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const rows = (tileMap && tileMap.length) || 12;
  const seaLight = () => { const k = Math.pow(1 - clamp(y/rows, 0, 1), 1.6), g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, `rgba(${P.sea},${(N ? .08 : .1)*k})`); g.addColorStop(1, `rgba(${P.sea},${(N ? .08 : .1)*Math.pow(1 - clamp((y + 1)/rows, 0, 1), 1.6)})`); ctx.fillStyle = g; ctx.fillRect(px, py, T, T); }; // cool light off the sea, from the north
  const soil = () => { fill(shade(P.soil, (h - .5)*.015)); b2Mottle(ctx, x, y, T, N ? .03 : .08, N ? .16 : .1, P.lit, 1.3);
    ctx.fillStyle = P.grit; for (let i=0;i<5;i++) ctx.fillRect(px + hash(x,y,i+20)*T, py + hash(y,x,i+21)*T, Math.max(1, T*.035), Math.max(1, T*.03));
    ctx.fillStyle = P.pebble; for (let i=0;i<4;i++) ctx.fillRect(px + hash(x,y,i+26)*T, py + hash(y,x,i+27)*T, Math.max(1, T*.04), Math.max(1, T*.03)); // pale chips of the stone under it
    if (h > .82) { const cx = px + T*(.25 + hash(x,y,8)*.5), cy = py + T*(.3 + hash(x,y,9)*.4), r = T*(.1 + hash(x,y,10)*.08); ell(ctx, cx + r*.3, cy + r*.35, r*1.1, r*.5, 'rgba(0,0,0,.25)'); ell(ctx, cx, cy, r, r*.62, P.lime); ell(ctx, cx - r*.25, cy - r*.2, r*.5, r*.28, P.limeL); } }; // a knuckle of limestone
  const track = () => { fill(shade(P.track, (h - .5)*.015)); b2Mottle(ctx, x, y, T, N ? .03 : .08, N ? .16 : .1, P.lit, 1.3);
    ctx.fillStyle = P.grit; for (let i=0;i<4;i++) ctx.fillRect(px + hash(x,y,i+50)*T, py + hash(y,x,i+51)*T, Math.max(1, T*.03), Math.max(1, T*.025));
    ctx.fillStyle = P.pebble; for (let i=0;i<5;i++) ctx.fillRect(px + hash(x,y,i+56)*T, py + hash(y,x,i+57)*T, Math.max(1, T*.035), Math.max(1, T*.025));
    if (h > .88) { const cx = px + T*(.3 + hash(x,y,60)*.4), cy = py + T*(.35 + hash(x,y,61)*.3), rx = T*(.12 + hash(x,y,62)*.1); ell(ctx, cx, cy, rx, rx*.42, `rgba(${P.wet},.3)`); ell(ctx, cx, cy, rx*.86, rx*.3, P.pool); ell(ctx, cx - rx*.25, cy - rx*.08, rx*.36, rx*.06, P.poolL); } // rain standing in a hollow, the grey sky in it
    else if (h < .2) b2Prints(ctx, x, y, T, 3, N, 7); };
  const scrub = () => { soil(); const bush = (cx, cy, r) => { ell(ctx, cx + r*.45, cy + r*.45, r*1.15, r*.5, N ? 'rgba(0,0,0,.4)' : 'rgba(60,46,30,.3)');
      for (let i=0;i<7;i++){ const a = i/7*6.28 + h*4; ell(ctx, cx + Math.cos(a)*r*.48, cy + Math.sin(a)*r*.38, r*.42, r*.34, i < 4 ? P.scrub : P.scrubD); } ell(ctx, cx - r*.2, cy - r*.24, r*.42, r*.26, P.scrubL);
      ctx.fillStyle = N ? 'rgba(150,160,190,.12)' : 'rgba(240,236,214,.35)'; for (let i=0;i<4;i++) ctx.fillRect(cx + (hash(x,y,i+70) - .5)*r*1.4, cy + (hash(y,x,i+71) - .6)*r, 1, 1); }; // thorn, grey-green, a few pale spines
    if (h > .12) bush(px + T*(.3 + hash(x,y,80)*.2), py + T*(.34 + hash(x,y,81)*.22), T*(.17 + hash(x,y,82)*.07)); if (h > .5) bush(px + T*(.68 + hash(x,y,83)*.12), py + T*(.68 + hash(x,y,84)*.12), T*.11);
    ctx.strokeStyle = N ? 'rgba(70,80,74,.55)' : 'rgba(150,140,100,.7)'; ctx.lineWidth = 1; for (let i=0;i<6;i++){ const gx = px + hash(x,y,i+90)*T, gy = py + T*.3 + hash(y,x,i+91)*T*.65; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + (hash(x,y,i+92) - .5)*3, gy - T*.1); ctx.stroke(); } }; // dry grass between
  if (b6WallC(ch)) { soil(); const {fy} = b6MudWall(ctx, x, y, T, P, N, .4); if (ch === 'D' || ch === 'E') b6Door(ctx, x, y, T, P, N, fy, ch === 'E'); seaLight(); b2Firelit(ctx, x, y, T, N ? .26 : .1, 3); return; }
  if (ch === ',') scrub(); else if (ch === '.') track(); else soil();
  if (ch === 'w') { const cx = px + T*.5, cy = py + T*.58, r = T*.3; // a hill well: a round curb of rough stone plastered over, a beam on two posts, a rope, a stone trough beside it
    ell(ctx, cx + T*.05, cy + T*.1, r*1.2, r*.58, 'rgba(0,0,0,.35)'); ell(ctx, cx, cy, r*1.06, r*.66, P.limeD); ell(ctx, cx, cy - T*.03, r*1.02, r*.6, P.lime); ell(ctx, cx - r*.3, cy - r*.32, r*.5, r*.16, P.limeL);
    ell(ctx, cx, cy - T*.03, r*.68, r*.36, '#06070a'); ell(ctx, cx + r*.12, cy - T*.04, r*.32, r*.1, N ? 'rgba(110,130,170,.28)' : 'rgba(170,186,196,.4)'); // the water, low
    ctx.fillStyle = P.wood; ctx.fillRect(cx - r*1.06, cy - T*.44, T*.05, T*.42); ctx.fillRect(cx + r*.96, cy - T*.44, T*.05, T*.42); ctx.fillRect(cx - r*1.08, cy - T*.46, r*2.16, T*.05);
    B2F.line(ctx, N ? '#4a4438' : '#a8946a', Math.max(1, T*.02), [[cx + T*.04, cy - T*.42], [cx + T*.04, cy - T*.08]]);
    ctx.fillStyle = P.limeD; ctx.fillRect(px + T*.66, py + T*.8, T*.3, T*.12); ctx.fillStyle = P.lime; ctx.fillRect(px + T*.66, py + T*.78, T*.3, T*.04); }
  else if (ch === 'x') { const cx = px + T*(.42 + hash(x,y,120)*.16), by = py + T*.9; // a dead tamarisk: low and twisted, the bark gone silver, a hundred fine twigs
    ell(ctx, cx + T*.06, by, T*.2, T*.05, 'rgba(0,0,0,.32)'); ctx.lineCap = 'round';
    const br = (x0, y0, a, l, w, d) => { const x1 = x0 + Math.cos(a)*l, y1 = y0 + Math.sin(a)*l; ctx.strokeStyle = d > 1 ? P.bark : shade(P.bark, -.1); ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo((x0 + x1)/2 + (hash(x, y, d*7) - .5)*l*.4, (y0 + y1)/2, x1, y1); ctx.stroke();
      ctx.strokeStyle = P.barkD; ctx.lineWidth = w*.35; ctx.beginPath(); ctx.moveTo(x0 + w*.3, y0); ctx.lineTo(x1 + w*.3, y1); ctx.stroke();
      if (d > 0) { br(x1, y1, a - .45 - hash(x, y, d*3)*.3, l*.7, w*.62, d - 1); br(x1, y1, a + .4 + hash(y, x, d*3)*.3, l*.66, w*.6, d - 1); } };
    br(cx, by, -Math.PI/2 - .25 + (hash(x,y,121) - .5)*.3, T*.34, Math.max(2, T*.1), 3); ctx.lineCap = 'butt'; }
  else if (ch === 'F') { const cx = px + T*.5, cy = py + T*.6; for (let i=0;i<7;i++){ const a = i/7*6.28; ell(ctx, cx + Math.cos(a)*T*.26, cy + Math.sin(a)*T*.16, T*.07, T*.05, i%2 ? P.lime : P.limeD); } // the march fire, in a ring of the hill's stones
    ell(ctx, cx, cy, T*.16, T*.08, '#1a120a'); b2Flames(ctx, cx, cy, T, N ? 1 : .7); if (!N) for (let i=0;i<3;i++) b2Soft(ctx, cx + T*(.04 + i*.06), cy - T*(.32 + i*.18), T*(.08 + i*.04), 1.2, '200,196,186', .3 - i*.07); } // by day, its smoke
  else if (ch !== '.' && ch !== ',') exitArrow(ctx, ch, px, py, T);
  seaLight(); b2Firelit(ctx, x, y, T, N ? .3 : .1, 3);
}
TILEX.b6_c2_coast = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b62Coast(ctx, ch, x, y, T, !!dark));
TILEX.b6_c2_coast_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b62Coast(ctx, ch, x, y, T, true));
/* a battle's low cover on this ground: a waist-high knuckle of the hill's pale limestone, a thorn bush grown up against it */
function b62Boulder(ctx, x, y, T, N){ const px = x*T, py = y*T, P = b62CP(N), h = hash(x, y), fl = h > .5 ? 1 : -1;
  ell(ctx, px + T*.54, py + T*.84, T*.46, T*.11, N ? 'rgba(0,0,0,.5)' : 'rgba(50,38,24,.4)');
  const rock = (k, ox, oy, s) => { const pts = [[.06,.86],[.08,.64],[.2,.5],[.36,.44],[.5,.36],[.68,.4],[.84,.5],[.94,.68],[.92,.86]].map(([a, b], i) => [px + T*(ox + (.5 + (a - .5)*fl)*s + (hash(x,y,i+130+k) - .5)*.06*s), py + T*(oy + b*s + (hash(y,x,i+131+k) - .5)*.07*s)]);
    const g = ctx.createLinearGradient(px + T*ox, py + T*(oy + .3*s), px + T*(ox + s), py + T*(oy + .9*s)); g.addColorStop(0, P.limeL); g.addColorStop(.5, P.lime); g.addColorStop(1, P.limeD); poly(ctx, pts, g);
    ctx.save(); poly(ctx, pts); ctx.clip(); ctx.strokeStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(80,66,46,.4)'; ctx.lineWidth = Math.max(1, T*.02);
      ctx.beginPath(); ctx.moveTo(px + T*(ox + .3*s), py + T*(oy + .44*s)); ctx.lineTo(px + T*(ox + .42*s), py + T*(oy + .66*s)); ctx.lineTo(px + T*(ox + .38*s), py + T*(oy + .9*s)); ctx.stroke(); // a fissure
      ctx.fillStyle = N ? 'rgba(0,0,0,.25)' : 'rgba(60,46,30,.22)'; for (let i=0;i<5;i++) ell(ctx, px + T*(ox + (.2 + hash(x,y,i+150+k)*.6)*s), py + T*(oy + (.55 + hash(y,x,i+151+k)*.3)*s), T*.03*s, T*.02*s, ctx.fillStyle); // pitting
      ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(px, py + T*(oy + .74*s), T, T*s); ctx.restore(); }; // its shaded foot
  rock(0, 0, 0, 1); rock(9, fl > 0 ? .6 : 0, .42, .42); // the knuckle, and a smaller stone broken off it
  const bx = px + T*(fl > 0 ? .2 : .8), by = py + T*.8, r = T*.13; for (let i=0;i<6;i++){ const a = i/6*6.28 + h*4; ell(ctx, bx + Math.cos(a)*r*.5, by + Math.sin(a)*r*.38, r*.44, r*.34, i < 3 ? P.scrub : P.scrubD); } ell(ctx, bx - r*.2, by - r*.24, r*.4, r*.24, P.scrubL); }
{ const _feat = drawFeature; drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (ch === 't' && (style === 'b6_c2_coast' || style === 'b6_c2_coast_night')) return b2Clip(ctx, x, y, T, () => b62Boulder(ctx, x, y, T, style === 'b6_c2_coast_night' || !!dark)); return _feat(ctx, ch, x, y, T, dark, style, map); }; }
