/* ============ Book Six, Chapter 7 art: Malaz City — the transport at sea, the waterfront under Mock's Hold ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d, lit from the left: Ottar, the Grey Helm sent across from the Perish (tall, grey plate
   over mail, a helm with a wolf's brow, the tall shield with the wolf on it, a long single-edged sword); a rioter of Malaz City (a
   dockside man or woman with a club, a stave or a gutting knife, picked by phase); and a City Guard of Malaz (mail, a dark surcoat,
   an open helm with a nasal, a round shield with a pale band, a short sword). Ottar's bust (POR, 19) in Book Five's standard with the
   shared bust helpers. FOES.b6_rioter and FOES.b6_cityguard (100) take these kinds in place of the borrowed b2soldier.
   Backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still): b6_sea (a transport's deck: grey water, a grey
   sky, the fleet strung out behind, the squad at the rail) and b6_malaz (the waterfront: Mock's Hold only as a silhouette on its rock
   over the harbour, the city's roofs stepping up to it, smoke from the streets at a distance, the jetties crowded, the fleet at anchor,
   the squad on the neighbouring jetty). The pogrom is smoke over roofs and a crowd too far off to have faces; nobody burns.
   Item art (ART['item/<key>']) for the chapter's two items on Book Four's umber ground with a thin bone rim (Book Six, Claude's call). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Ottar: a Grey Helm of the Perish, thirty-eight, nineteen years in the order. Tall; grey plate over mail; a helm with a wolf's brow;
     the tall shield with the wolf on it; a long single-edged sword. Told apart from Dannet (Book Three's Grey Sword) by the helm and the tall shield */
  ottar(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.06, 1.12); const fl = o.still ? 0 : Math.sin(t/300 + (o.phase || 0)*2)*.5;
    poly(ctx, [[-5,-6],[-8.4,11 + fl],[-2.6,10],[-1.6,-6]], '#4e545a'); // a grey cloak, behind
    h.legs('#3a3c40'); ctx.fillStyle = '#5a5e64'; ctx.fillRect(-4.5, 8, 3.4, 2.4); ctx.fillRect(1.1, 8, 3.4, 2.4); // greaves
    poly(ctx, [[-6.4,1],[6.4,1],[7,8],[-7,8]], h.armor('#8a8e92', '#2e3034')); B3F.mail(ctx, -6.6, 6.6, 2, 8); // the mail skirt under the plate
    poly(ctx, [[-6.8,-6.4],[6.8,-6.4],[6,3],[-6,3]], h.armor('#c4c8cc', '#3e4246')); // the breastplate, grey steel
    ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(0, 2.6); ctx.moveTo(-6.2, -1); ctx.lineTo(6.2, -1); ctx.stroke(); // its ridge and the lame at the waist
    ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(-5.6, -5.6, 2.2, 6);
    ell(ctx, -6.6, -5.4, 2.8, 2, h.armor('#d0d4d8', '#5a5e62')); ell(ctx, 6.6, -5.4, 2.8, 2, '#4a4e52'); // pauldrons
    ctx.fillStyle = '#2a2420'; ctx.fillRect(-6.2, 2.4, 12.4, 1.2); ctx.fillStyle = '#e8e0d0'; ctx.fillRect(1.6, -5.2, .8, 1.8); // the belt; the wolf's tooth on its thong
    h.head('#b89478', 4.2, -11.2); h.look('rgba(24,16,12,.85)', -11.2); ctx.fillStyle = '#6a5a48'; ctx.fillRect(-3.4, -8.6, 7, 1.6); // a short beard going grey
    ctx.beginPath(); ctx.arc(0, -12.2, 5.3, Math.PI, 0); ctx.fillStyle = h.armor('#b4b8bc', '#3a3e42'); ctx.fill(); ctx.fillRect(-5.6, -12.6, 11.2, 1.4); // the helm's bowl
    poly(ctx, [[-1.6,-12.4],[5.6,-13.4],[6.8,-11.6],[1,-11.4]], '#8a8e92'); // the wolf's brow, jutting over the eyes
    poly(ctx, [[-3.6,-16.6],[-2.6,-19.6],[-1.2,-16.8]], '#9a9ea2'); poly(ctx, [[1.4,-17],[2.8,-19.8],[3.8,-16.6]], '#7a7e82'); // its ears
    ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(-3.6, -16.2, 2.6, .8);
    ctx.strokeStyle = '#d4d0c4'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(7, 2); ctx.quadraticCurveTo(10.6, -5, 13.4, -13.6); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(7.6, 1); ctx.quadraticCurveTo(10.8, -5.4, 13.2, -13); ctx.stroke(); // the long single-edged sword, a little curved
    ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 1.7; ctx.beginPath(); ctx.moveTo(5.6, 4.6); ctx.lineTo(7.4, 1); ctx.stroke(); ctx.fillStyle = '#6a6e72'; ctx.fillRect(5.8, .6, 3.2, 1);
    // the tall shield: grey, an iron rim kept sharp, the wolf's head on it in white
    poly(ctx, [[-13.6,-10],[-3.4,-10],[-3.2,6],[-8.4,11],[-13.8,6]], h.armor('#7a8088', '#262a2e')); ctx.strokeStyle = '#141618'; ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(-13.6,-10); ctx.lineTo(-3.4,-10); ctx.lineTo(-3.2,6); ctx.lineTo(-8.4,11); ctx.lineTo(-13.8,6); ctx.closePath(); ctx.stroke();
    ctx.strokeStyle = 'rgba(230,234,238,.55)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(-13.2, -9.6); ctx.lineTo(-13.4, 5.8); ctx.stroke(); // the lit rim
    poly(ctx, [[-11.4,-3],[-10.6,-7.4],[-9.2,-4.6],[-7.8,-7.6],[-7,-4.2],[-5.2,-2.6],[-5.4,-1.2],[-7.4,-.4],[-8.6,2.4],[-10.8,1.6]], 'rgba(232,236,238,.9)'); ell(ctx, -7.8, -3.2, .5, .4, '#1a1c1e'); // the wolf
    ctx.restore(); },

  /* a rioter of Malaz City: dockside folk in a mob, a scarf over the mouth, a club, a stave or a gutting knife; who they are picked by phase */
  b6_rioter(ctx, h, t, o){ ctx.save(); const k = b2Pick(o, [0, 1, 2, 3]), sk = b2Pick(o, ['#c09a7a', '#a8805e', '#d0ae8e', '#8a6a4e']), sw = o.still ? 0 : Math.sin(t/180 + (o.phase || 0)*3)*.08;
    B2F.grow(ctx, [1, .94, 1.08, .96][k], [1, .98, 1.04, 1][k]);
    h.legs(['#2e2a26', '#3a3026', '#26282c', '#3a2e2a'][k]); if (k === 1) poly(ctx, [[-6,0],[6,0],[7.4,11],[-7.4,11]], '#5a3e3a'); // a skirt
    h.torso(['#5a4a3a', '#6a4a44', '#3e4a56', '#5a5a48'][k], '#1e1a16', [6.2, 5.6, 6.8, 6][k]);
    if (k === 2) { ctx.fillStyle = 'rgba(230,226,214,.3)'; for (let i = 0; i < 4; i++) ctx.fillRect(-6, -4.4 + i*2.6, 12, 1); } // a sailor's striped shirt
    if (k === 3) { poly(ctx, [[-4.4,-4],[4.4,-4],[5.2,8],[-5.2,8]], '#7a6a52'); } // a fish-market apron
    ctx.fillStyle = '#2a1e14'; ctx.fillRect(-6, 2.6, 12, 1.2);
    h.head(sk, 4.3, -11.2); h.look('rgba(20,12,8,.88)', -11.4);
    ctx.fillStyle = ['#7a3a2a', '#4a4a5a', '#8a6a3a', '#3a4a3a'][k]; ctx.fillRect(-4.3, -9.4, 8.6, 2.8); // a scarf over the mouth and nose
    if (k === 2) { ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-4.6, -16, 9.2, 2.4); ctx.fillRect(-5.8, -14, 11.6, 1); } // a sailor's knit cap
    else B2F.cap(ctx, ['#2a1e14', '#4a3420', '#1a1612', '#6a6460'][k], 4.5, -12.4, 1.02, 1.98);
    if (k === 1) B2F.line(ctx, '#4a3420', 1.4, [[-3.6, -12.4], [-5.8, -5]]); // her hair down the back
    ctx.save(); ctx.translate(6.4, 3.6); ctx.rotate(sw);
    if (k === 0 || k === 3) { B2F.line(ctx, '#5a3e22', 2, [[0, 0], [3.4, -13]]); ell(ctx, 3.6, -13.6, 1.8, 2.4, '#4a3018'); } // a club, a belaying pin's worth of oak
    else if (k === 1) { B2F.line(ctx, '#6a5030', 1.3, [[-1, 6], [4.4, -20]]); } // a stave
    else { B2F.line(ctx, '#3a2a1a', 1.8, [[0, 0], [1, -3]]); poly(ctx, [[.4,-3],[2.6,-3.4],[3,-10],[1.2,-9]], '#c8c4b8'); } // a gutting knife
    ctx.restore();
    if (k === 0) { B2F.line(ctx, sk, 1.4, [[-5.6, -4], [-8.6, -12]]); ell(ctx, -8.8, -12.8, 1.2, 1.2, sk); } // a fist in the air
    ctx.restore(); },

  /* a City Guard of Malaz: mail, a dark sea-blue surcoat with a pale band, an open helm with a nasal, a round shield banded pale, a short sword */
  b6_cityguard(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.06);
    h.legs('#2a2c30'); ctx.fillStyle = '#3a2a1e'; ctx.fillRect(-4.5, 10, 3.4, 3); ctx.fillRect(1.1, 10, 3.4, 3); // boots
    poly(ctx, [[-6.6,-6],[6.6,-6],[6.8,7],[-6.8,7]], h.armor('#8e9094', '#34363a')); B3F.mail(ctx, -6.4, 6.4, -5.6, 7); // the hauberk
    poly(ctx, [[-4.8,-5.6],[4.8,-5.6],[5.6,9.4],[-5.6,9.4]], h.armor('#2e3a4a', '#10161e')); ctx.fillStyle = 'rgba(214,206,186,.75)'; ctx.fillRect(-4.9, -1.6, 9.8, 1.4); // the surcoat, its pale band
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-.3, 1, .6, 8.4); ctx.fillStyle = '#2a2018'; ctx.fillRect(-5.4, 3.4, 10.8, 1.2); ctx.fillStyle = '#a89a78'; ctx.fillRect(-.8, 3.4, 1.6, 1.2);
    h.head('#b8967a', 4.2, -11.2); h.look('rgba(24,14,10,.85)', -11.4);
    ctx.beginPath(); ctx.arc(0, -12.2, 5.2, Math.PI, 0); ctx.fillStyle = h.armor('#a4a6a8', '#3a3c3e'); ctx.fill(); ctx.fillRect(-5.6, -12.6, 11.2, 1.3); ctx.fillStyle = '#7a7c7e'; ctx.fillRect(1.6, -12.4, 1.1, 4.2); // an open helm, the nasal
    ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(-3.8, -16, 3, .9);
    h.sword('#c4c0b4');
    ctx.save(); ctx.translate(-7.2, .4); ctx.beginPath(); ctx.arc(0, 0, 6.4, 0, 7); ctx.fillStyle = h.armor('#3a4656', '#12181e'); ctx.fill(); ctx.strokeStyle = '#0e1012'; ctx.lineWidth = 1; ctx.stroke(); // the round shield
    ctx.beginPath(); ctx.arc(0, 0, 5.6, 0, 7); ctx.clip(); ctx.fillStyle = 'rgba(214,206,186,.7)'; ctx.fillRect(-7, -1, 14, 2); ctx.restore(); ell(ctx, -7.2, .4, 1.4, 1.4, '#7a7a76'); // its pale band, the boss
    ctx.restore(); },
});

/* ---------------- Ottar's bust (POR): shoulders at y = 0, the face about y = −74; lantern low left, his grey as a rim on the right ----------------
   Weathered, grey-eyed, a short beard going grey; mail to the jaw; grey plate pauldrons; the helm with a wolf's brow, worn; the shield's rim behind
   his left shoulder; the wolf's tooth on its thong */
POR.ottar = function(ctx){ const F = {cy:-75, w:13.4, h:20, jaw:.88, chin:5.8, skin:'#b89478', iris:'#7a8a96', lip:'#8a5a4c', browCol:'#4a3e32', browW:1.8, arch:.4, rim:'#a4b0bc', rimA:.2, nose:1.2, look:.15, smileL:-.25, smileR:-.15, mouthW:4, age:.55, bags:.55, open:.86};
  // the tall shield behind his left shoulder (our right): its upper edge and the wolf's ear just showing
  ctx.save(); ctx.translate(30, -46); ctx.rotate(.12); ctx.fillStyle = PR.lin(ctx, -14, 0, 18, 0, [[0, '#6a7078'], [.5, '#3a3e44'], [1, '#0e1012']]); PR.path(ctx, [[-12, -18], [20, -18], [22, 60], [-10, 60]]); ctx.fill();
    ctx.strokeStyle = PR.lin(ctx, -12, 0, 22, 0, [[0, '#c8ccd0'], [1, '#2a2c2e']]); ctx.lineWidth = 2.2; ctx.stroke();
    ctx.fillStyle = 'rgba(214,220,224,.55)'; PR.path(ctx, [[-2, 4], [1, -6], [4, 2], [8, -7], [10, 4]]); ctx.fill(); ctx.restore(); // the wolf's ears, painted
  PR.neck(ctx, F, 10);
  const B = BP.body(ctx, F, {wide:42, drop:2, trap:6, ny:F.cy + 15.4, cb:F.cy + 21, c1:'#8a8c8e', c2:'#2a2c2e'});
  ctx.save(); B.path(); ctx.clip(); PR.mail(ctx, -46, 46, -68, 4, '#8a8c8e', 1.9); // mail, an aventail up to the jaw
    ctx.fillStyle = PR.lit(ctx, '#b8bcc0', '#2e3236', -30, 30); PR.path(ctx, [[-28, -40], [-14, -44], [0, -42], [14, -44], [28, -40], [30, 4], [-30, 4]]); ctx.fill(); // the breastplate
    PR.stroke(ctx, 'rgba(0,0,0,.45)', .7, () => { ctx.moveTo(0, -42); ctx.lineTo(0, 4); }); PR.stroke(ctx, 'rgba(255,255,255,.3)', .6, () => { ctx.moveTo(-1.2, -41); ctx.lineTo(-1.2, 4); }); // its ridge
    PR.stroke(ctx, 'rgba(0,0,0,.35)', .6, () => { ctx.moveTo(-28, -40); ctx.quadraticCurveTo(0, -36, 28, -40); }); PR.soft(ctx, -16, -30, 10, 12, '#ffffff', .2); PR.soft(ctx, 22, -18, 18, 20, '#000000', .45);
    for (let i = 0; i < 5; i++) ell(ctx, -24 + i*12, -37.6 + Math.abs(i - 2)*.6, .7, .7, i < 2 ? '#f0f0ec' : '#3a3c3e'); // rivets along the top edge
    ctx.restore(); BP.light(ctx, F, B);
  BP.spaulder(ctx, {wide:42, drop:2, n:3, rise:3, c:['#e4e8ec', '#9aa0a6', '#34383c'], style:'plate', rivet:'#ffffff'});
  PR.stroke(ctx, '#2a2018', .8, () => { ctx.moveTo(-7, -49); ctx.quadraticCurveTo(-2, -40, 4, -49); }); ctx.save(); ctx.translate(-1.6, -41); ctx.rotate(-.15); ctx.fillStyle = PR.lin(ctx, -2, 0, 2, 0, [[0, '#f4ecd8'], [1, '#9a8a6a']]); ctx.beginPath(); ctx.moveTo(-1.6, 0); ctx.quadraticCurveTo(-1.2, 6, 0, 9); ctx.quadraticCurveTo(1.2, 6, 1.6, 0); ctx.closePath(); ctx.fill(); ctx.restore(); // the wolf's tooth
  F.under = (ctx, F) => { const u = F.h/20; // a short beard going grey, close along the jaw
    ctx.save(); ctx.beginPath(); ctx.moveTo(-F.w*.92, F.cy + 2*u); ctx.quadraticCurveTo(-F.w*.8, F.cy + 15*u, 0, F.cy + 20*u); ctx.quadraticCurveTo(F.w*.8, F.cy + 15*u, F.w*.92, F.cy + 2*u); ctx.quadraticCurveTo(F.w*.5, F.cy + 10*u, 0, F.cy + 10*u); ctx.quadraticCurveTo(-F.w*.5, F.cy + 10*u, -F.w*.92, F.cy + 2*u); ctx.closePath();
    ctx.fillStyle = PR.lin(ctx, -F.w, 0, F.w, 0, [[0, 'rgba(120,104,88,.75)'], [.5, 'rgba(80,66,52,.8)'], [1, 'rgba(20,16,12,.85)']]); ctx.fill(); ctx.clip(); PR.dots(ctx, F, 50, 'rgba(210,204,194,.3)', .35, [6, 22, () => false]); ctx.restore();
    PR.stroke(ctx, 'rgba(120,70,50,.35)', .6, () => { ctx.moveTo(F.w*.5, F.cy - 5*u); ctx.lineTo(F.w*.62, F.cy + 3*u); }); }; // an old cut across the cheek
  PR.face(ctx, F);
  // the helm with a wolf's brow: a ridged bowl, the brow jutting over the eyes, two short ears on top
  B4P.helm(ctx, F, {c:['#e2e6ea', '#9aa0a6', '#3a3e42'], b:['#b4b8bc', '#4a4e52'], r:3, y:6.6, h:16, n:9, ridge:1});
  const u = F.h/20, by = F.cy - 6.6*u; ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 3; ctx.shadowOffsetY = 2;
  ctx.fillStyle = PR.lin(ctx, -F.w, by - 3, F.w, by + 3, [[0, '#d4d8dc'], [.5, '#7a7e82'], [1, '#141618']]); ctx.beginPath(); ctx.moveTo(-F.w - 2.6, by - 1.6); ctx.quadraticCurveTo(-F.w*.4, by - 2.6, 0, by + 2.4); ctx.quadraticCurveTo(F.w*.4, by - 2.6, F.w + 2.6, by - 1.6); ctx.lineTo(F.w + 2, by + 1.2); ctx.quadraticCurveTo(F.w*.4, by + .6, 0, by + 5); ctx.quadraticCurveTo(-F.w*.4, by + .6, -F.w - 2, by + 1.2); ctx.closePath(); ctx.fill(); ctx.restore(); // the brow, a wolf's, coming to a point over the nose
  PR.stroke(ctx, 'rgba(255,248,232,.5)', .5, () => { ctx.moveTo(-F.w - 2, by - 1.4); ctx.quadraticCurveTo(-F.w*.4, by - 2.2, -.6, by + 2); });
  [-1, 1].forEach(sd => { const x = sd*6.4, y = F.cy - 6.6*u - 15.4; ctx.fillStyle = sd < 0 ? PR.lin(ctx, x - 3, y, x + 3, y, [[0, '#e0e4e8'], [1, '#6a6e72']]) : PR.lin(ctx, x - 3, y, x + 3, y, [[0, '#5a5e62'], [1, '#141618']]); ctx.beginPath(); ctx.moveTo(x - 3.2, y + 2); ctx.lineTo(x + sd*.6, y - 6.4); ctx.lineTo(x + 3.2, y + 2); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = .5; ctx.stroke(); }); // the ears
  return F; };

/* the foes take their own bodies (100 lends them Book Two's soldier until now) */
if (typeof FOES !== 'undefined') { if (FOES.b6_rioter) FOES.b6_rioter.kind = 'b6_rioter'; if (FOES.b6_cityguard) FOES.b6_cityguard.kind = 'b6_cityguard'; }

/* ---------------- backdrops ---------------- */
/* a transport or a far ship, side-on: hull, a mast, a yard, a sail set (grey canvas) or furled */
function b67Ship(x, cx, wy, s, col, sail, set){ x.fillStyle = col; x.beginPath(); x.moveTo(cx - 22*s, wy - 5*s); x.quadraticCurveTo(cx - 14*s, wy + 2*s, cx, wy + 2*s); x.quadraticCurveTo(cx + 16*s, wy + 2*s, cx + 24*s, wy - 7*s); x.lineTo(cx + 19*s, wy - 4*s); x.lineTo(cx - 18*s, wy - 3*s); x.closePath(); x.fill();
  x.fillRect(cx - .6*s, wy - 36*s, 1.2*s, 34*s); x.fillRect(cx - 13*s, wy - 32*s, 26*s, 1*s);
  if (set) { x.fillStyle = sail; x.beginPath(); x.moveTo(cx - 12.4*s, wy - 31*s); x.quadraticCurveTo(cx - 14*s, wy - 18*s, cx - 11*s, wy - 8*s); x.lineTo(cx + 11*s, wy - 8*s); x.quadraticCurveTo(cx + 14*s, wy - 18*s, cx + 12.4*s, wy - 31*s); x.closePath(); x.fill(); }
  else if (sail) { x.fillStyle = sail; x.fillRect(cx - 12*s, wy - 32*s, 24*s, 2.2*s); }
  x.strokeStyle = col; x.lineWidth = .4*s; x.beginPath(); x.moveTo(cx, wy - 36*s); x.lineTo(cx - 22*s, wy - 5*s); x.moveTo(cx, wy - 36*s); x.lineTo(cx + 24*s, wy - 7*s); x.stroke(); }
/* a grey sky with low cloud in bands */
function b67Sky(x, W, hz, top, bot){ x.fillStyle = vgrad(x, 0, hz, [[0, top], [1, bot]]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 9; i++) { x.fillStyle = `rgba(${i % 2 ? '60,64,70' : '150,154,158'},${(.12 + hash(i, 6701)*.14).toFixed(2)})`; x.beginPath(); x.ellipse(hash(i, 6702)*W, hz*(.12 + hash(i, 6703)*.7), W*(.16 + hash(i, 6704)*.2), hz*(.03 + hash(i, 6705)*.04), 0, 0, 7); x.fill(); } }

/* at sea: a transport's deck, the rail and a mast near; grey water heaving; the fleet strung out behind to the horizon; gulls; the squad at the rail */
const B67FLEET = [[.08, .9, 1], [.2, .6, 1], [.3, .45, 0], [.42, .34, 1], [.52, .26, 1], [.6, .2, 0], [.67, .16, 1], [.73, .13, 1], [.79, .1, 0], [.84, .08, 1], [.89, .065, 1], [.93, .05, 0]]; // [x, size, sail set]
SCENEX.b6_sea = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4, deck = H*.8;
  const roll = mo ? Math.sin(t/1700)*.018 : 0, heave = mo ? Math.sin(t/1300)*H*.012 : 0;
  ctx.drawImage(sceneLayer('b67:sky', W, H, (x, W, H) => { b67Sky(x, W, H*.6, '#3e4248', '#9a9c9a'); glow(x, W*.24, H*.2, W*.3, '#e8e4d8', .16); }), 0, 0, W, H); // the sky does not roll
  ctx.save(); ctx.translate(W/2, deck); ctx.rotate(roll); ctx.translate(-W/2, -deck + heave);
  ctx.drawImage(sceneLayer('b67:water', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, hz, H*1.1, [[0, '#6a7276'], [.3, '#4a5458'], [1, '#1e2628']]); x.fillRect(-W*.1, hz, W*1.2, H*.8); // the grey sea
    x.fillStyle = 'rgba(200,206,206,.35)'; x.fillRect(-W*.1, hz, W*1.2, 1); // the horizon line
    B67FLEET.forEach(([u, s, set], i) => b67Ship(x, W*u, hz + H*.02 + s*H*.08, s*H*.009, `rgba(30,34,38,${(.5 + s*.5).toFixed(2)})`, `rgba(${set ? '170,170,164' : '120,120,116'},${(.4 + s*.5).toFixed(2)})`, set)); // the fleet, strung out behind
    for (let r = 0; r < 26; r++) { const y = hz + H*.03 + Math.pow(r/26, 1.6)*H*.5, k = r/26; x.strokeStyle = `rgba(${r % 3 ? '20,26,28' : '170,180,180'},${(.12 + k*.18).toFixed(2)})`; x.lineWidth = .6 + k*1.4; x.beginPath();
      for (let i = 0; i <= 20; i++) { const xx = -W*.1 + i*W*.06, yy = y + Math.sin(i*1.3 + r*2.1)*(1 + k*4); i ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); } // the swell, closer and bigger
  }), 0, 0, W, H);
  for (let i = 0; i < 30; i++) { const k = hash(i, 6711), y = hz + H*.04 + k*k*H*.4, xx = ((hash(i, 6712)*W*1.2 - t*mo*(.004 + k*.012)) % (W*1.2) + W*1.2) % (W*1.2) - W*.1; ctx.fillStyle = `rgba(226,232,232,${(.1 + .25*hash(i, 6713)*k).toFixed(2)})`; ctx.fillRect(xx, y, 3 + 14*k, 1 + k); } // whitecaps going by
  // the deck: planks, the rail, a stanchion or two, coiled rope, the mast and its shrouds at the right
  ctx.fillStyle = vgrad(ctx, deck - H*.06, H*1.05, [[0, '#4a3e30'], [1, '#2a2218']]); ctx.fillRect(-W*.1, deck, W*1.2, H*.3);
  ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-W*.1, deck + H*.035 + i*H*.045); ctx.lineTo(W*1.1, deck + H*.035 + i*H*.045); ctx.stroke(); }
  ctx.fillStyle = '#3a2e22'; ctx.fillRect(-W*.1, deck - H*.11, W*1.2, H*.022); ctx.fillStyle = 'rgba(255,240,210,.15)'; ctx.fillRect(-W*.1, deck - H*.11, W*1.2, 1.2); // the rail
  ctx.fillStyle = '#2e241a'; for (let i = 0; i < 9; i++) ctx.fillRect(W*(.02 + i*.12), deck - H*.09, W*.012, H*.09); // its stanchions
  ctx.fillStyle = '#2a2016'; ctx.fillRect(W*.86, -H*.1, W*.03, deck + H*.1); ctx.fillStyle = 'rgba(255,240,210,.12)'; ctx.fillRect(W*.86, -H*.1, 2, deck + H*.1); // the mast
  ctx.strokeStyle = 'rgba(30,24,18,.85)'; ctx.lineWidth = 1.2; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(W*.875, -H*.05); ctx.lineTo(W*(.66 + i*.035), deck - H*.1); } ctx.stroke(); // shrouds
  ctx.lineWidth = .6; ctx.beginPath(); for (let i = 1; i < 6; i++) { const y0 = -H*.05, y1 = deck - H*.1, y = y1 - i*(y1 - y0)/6, k = (y - y0)/(y1 - y0); ctx.moveTo(lerp(W*.875, W*.66, k), y); ctx.lineTo(lerp(W*.875, W*.765, k), y); } ctx.stroke(); // ratlines
  ctx.strokeStyle = '#6a5a3a'; ctx.lineWidth = 1.4; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(W*.78, deck + H*.06, W*.04 - i*W*.008, H*.018 - i*H*.004, 0, 0, 7); ctx.stroke(); } // a coil of rope
  ctx.restore();
  for (let i = 0; i < 4; i++) { const a = mo ? t/(1800 + i*300) + i*1.7 : i*1.7, gx = W*(.3 + i*.12) + Math.cos(a)*W*.06, gy = H*(.14 + i*.04) + Math.sin(a*1.3)*H*.03, f = mo ? Math.sin(t/140 + i*2)*1.6 : 1; // gulls following the fleet
    ctx.strokeStyle = 'rgba(30,32,36,.75)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx - 5, gy - f); ctx.quadraticCurveTo(gx - 2, gy - 2, gx, gy); ctx.quadraticCurveTo(gx + 2, gy - 2, gx + 5, gy - f); ctx.stroke(); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*.14 + i*W*.085, deck + H*.14 + heave*.5, 1.6, t, {phase:i, dir:-1, still:!mo})); // at the rail, looking back at the fleet
  for (let i = 0; i < 40; i++) { const k = mo ? ((t/900 + hash(i, 6721)) % 1) : hash(i, 6721), sx = hash(i, 6722)*W, sy = H*(.3 + k*.7); ctx.fillStyle = `rgba(210,216,220,${(.06 + .1*hash(i, 6723)).toFixed(2)})`; ctx.fillRect(sx - k*20, sy, 1, 4); } // a fine rain blown sideways
  vign(ctx, W, H, .5, .5); };

/* Malaz City's waterfront: Mock's Hold only as a silhouette on its rock over the harbour; the roofs stepping up to the rock; smoke from the
   streets at a distance, and a glow under it; the jetties crowded; the fleet at anchor; the squad on the neighbouring jetty, planks underfoot */
SCENEX.b6_malaz = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, wl = H*.6, jt = H*.84;
  const rockX = W*.3;
  ctx.drawImage(sceneLayer('b67:malaz', W, H, (x, W, H) => {
    b67Sky(x, W, hz, '#2e2a30', '#a07a62'); glow(x, W*.78, hz, W*.4, '#d8905a', .25); // an overcast dusk, the light low in the west
    // the rock and the Hold: one dark shape, no windows, no detail
    x.fillStyle = '#1a181c'; x.beginPath(); x.moveTo(rockX - W*.2, wl); x.lineTo(rockX - W*.14, H*.34); x.lineTo(rockX - W*.09, H*.26); x.lineTo(rockX - W*.06, H*.2); x.lineTo(rockX + W*.05, H*.19); x.lineTo(rockX + W*.09, H*.28); x.lineTo(rockX + W*.13, H*.4); x.lineTo(rockX + W*.2, wl); x.closePath(); x.fill(); // the rock
    x.beginPath(); x.moveTo(rockX - W*.07, H*.2); x.lineTo(rockX - W*.07, H*.12); x.lineTo(rockX - W*.055, H*.12); x.lineTo(rockX - W*.055, H*.09); x.lineTo(rockX - W*.035, H*.09); x.lineTo(rockX - W*.035, H*.12); x.lineTo(rockX - W*.01, H*.12);
    x.lineTo(rockX - W*.01, H*.06); x.lineTo(rockX + W*.005, H*.04); x.lineTo(rockX + W*.02, H*.06); x.lineTo(rockX + W*.02, H*.13); x.lineTo(rockX + W*.06, H*.13); x.lineTo(rockX + W*.06, H*.195); x.closePath(); x.fill(); // the Hold on top: walls and a keep against the sky
    x.fillStyle = 'rgba(200,140,100,.12)'; x.fillRect(rockX + W*.018, H*.06, 1, H*.07); // a rim of the dusk on the keep's edge, nothing more
    // the city's roofs, stepping up from the water to the rock and along the shore
    for (let r = 0; r < 4; r++) { const base = wl - r*H*.035, n = 34; for (let i = 0; i < n; i++) { const bx = i*W/n + (r % 2)*W/(n*2), d = Math.abs(bx - rockX)/W; if (r > 1 && d > .32) continue;
      const bh = H*(.02 + hash(i, r, 6731)*.03), top = base - bh - (d < .22 ? (.22 - d)*H*.25*(r/3) : 0); x.fillStyle = ['#3a3034', '#322a2e', '#2a2428', '#241e22'][r]; x.fillRect(bx, top, W/n + 1, wl - top);
      x.fillStyle = ['#4a3a36', '#40322e', '#382c2a', '#302624'][r]; x.beginPath(); x.moveTo(bx - 1, top); x.lineTo(bx + W/(n*2), top - bh*.4); x.lineTo(bx + W/n + 1, top); x.fill(); // a pitched roof
      if (hash(i, r, 6732) > .7) { x.fillStyle = 'rgba(255,190,120,.6)'; x.fillRect(bx + W/(n*3), top + bh*.4, 1.6, 1.6); } } } // a lit window here and there
    x.fillStyle = vgrad(x, wl, H, [[0, '#4a4648'], [1, '#1a1c20']]); x.fillRect(0, wl, W, H - wl); // the harbour water
    x.fillStyle = 'rgba(220,170,130,.25)'; x.fillRect(0, wl, W, 1);
    [[.62, .5, 0], [.74, .7, 1], [.86, .45, 0], [.95, .8, 1], [.54, .38, 0]].forEach(([u, s, set]) => b67Ship(x, W*u, wl + H*.03 + s*H*.03, s*H*.011, '#141418', 'rgba(110,104,100,.8)', false)); // the fleet at anchor
    // the far jetties: three fingers out from the quay, the marines' among them, crowded
    x.fillStyle = '#2a2420'; x.fillRect(0, wl + H*.02, W, H*.02); // the quay
    [[.42, .1], [.58, .12], [.72, .08]].forEach(([u, w]) => { const y0 = wl + H*.04, y1 = wl + H*.15; x.fillStyle = '#1a1612'; for (let k = 0; k <= 4; k++) { const f = k/4; x.fillRect(W*lerp(u - w*.1, u, 1 - f) - 1, lerp(y0, y1, f), 1.6, H*.025 + f*H*.01); x.fillRect(W*lerp(u + w*.35, u + w*.25, 1 - f), lerp(y0, y1, f), 1.6, H*.025 + f*H*.01); } // the piles
      x.fillStyle = '#4a3c2e'; x.beginPath(); x.moveTo(W*u, y0); x.lineTo(W*(u + w*.25), y0); x.lineTo(W*(u + w*.35), y1); x.lineTo(W*(u - w*.1), y1); x.closePath(); x.fill(); x.fillStyle = 'rgba(255,220,180,.18)'; x.fillRect(W*(u - w*.1), y1 - 1, W*w*.45, 1); }); // the deck of each, widening toward us
  }), 0, 0, W, H);
  // smoke from the streets, at a distance, and a low glow under it: the city has turned on someone
  [[.5, 1], [.66, .7], [.18, .8]].forEach(([u, k], i) => { const cx = W*u, by = wl - H*.08; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, by, H*.12*k, '#ff7a3a', (.16 + (mo ? Math.sin(t/400 + i*2)*.05 : 0))*k); ctx.globalCompositeOperation = 'source-over';
    for (let j = 0; j < 7; j++) { const rise = mo ? ((t/120 + j*18 + i*40) % (H*.4)) : j*H*.05, sy = by - rise, a = .55*(1 - rise/(H*.4)); ctx.fillStyle = `rgba(110,98,96,${a.toFixed(2)})`; ell(ctx, cx - rise*.5 + Math.sin(j + i)*4, sy, (10 + rise*.25)*k, (5 + rise*.08)*k, ctx.fillStyle); } }); // leaning west on the wind
  // the crowd on the far jetties: specks moving, no faces
  [[.42, .1, 16], [.58, .12, 22], [.72, .08, 12]].forEach(([u, w, n], j) => { for (let i = 0; i < n; i++) { const k = hash(i, j, 6741), f = Math.sqrt(hash(i, j, 6742)), yy = wl + H*.045 + f*H*.1, xx = W*lerp(lerp(u, u - w*.1, f), lerp(u + w*.25, u + w*.35, f), k), z = .7 + f*.7, bob = mo ? Math.sin(t/(200 + k*200) + i)*.6 : 0;
    ctx.fillStyle = 'rgba(14,12,14,.9)'; ctx.fillRect(xx, yy - 3.6*z + bob, 1.6*z, 3.6*z); ell(ctx, xx + .8*z, yy - 4.6*z + bob, .8*z, .8*z, ctx.fillStyle); } });
  for (let i = 0; i < 28; i++) { const k = hash(i, 6751), y = lerp(wl + H*.14, jt - H*.02, k), xx = ((hash(i, 6752)*W + t*mo*(.004 + k*.008)) % (W + 30)) - 15; ctx.fillStyle = `rgba(230,180,140,${(.08 + .14*hash(i, 6753)).toFixed(2)})`; ctx.fillRect(xx, y, 4 + 10*k, 1); } // the harbour catching the dusk
  // the near jetty, the squad's: planks running away to the left, a bollard, a coil of rope
  ctx.fillStyle = vgrad(ctx, jt, H, [[0, '#4a3c2e'], [1, '#2a2018']]); ctx.fillRect(0, jt, W, H - jt); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.moveTo(i*W/16, jt); ctx.lineTo(i*W/16 - W*.03, H); ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,230,190,.14)'; ctx.fillRect(0, jt, W, 1.2); ctx.fillStyle = '#1e1812'; ctx.fillRect(W*.9, jt - H*.05, W*.025, H*.06); ell(ctx, W*.9125, jt - H*.05, W*.016, H*.01, '#2e261c');
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.1 + i*W*.075, jt + H*.12, 1.55, t, {phase:i, dir:1, still:!mo}));
  vign(ctx, W, H, .55, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] ----------------
   240×130, the flat shapes and single highlight of the earlier books, on Book Four's umber ground (the Third's book) with a thin bone rim for Book Six */
function b67Item(key, label, body){ const w = 240, h = 130, id = 'c67-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#5a4a34"></stop><stop offset=".7" stop-color="#2a2218"></stop><stop offset="1" stop-color="#121214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#d8c8a4" stroke-width="1" opacity=".55"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a Grey Helm's shield: tall, grey steel over wood, an iron rim kept sharp, the wolf's head in white, scored by old blows */
b67Item('b6_c7_greyhelmshield', 'A Grey Helm\'s shield', '<ellipse cx="120" cy="118" rx="40" ry="5" fill="#000" opacity=".4"/>'
  + '<g transform="rotate(-8 120 64)"><path d="M88 10 L152 10 L154 82 Q154 104 120 120 Q86 104 86 82 Z" fill="#141618"/><path d="M91 13 L149 13 L151 81 Q151 101 120 116 Q89 101 89 81 Z" fill="#6e747c"/>'
  + '<path d="M120 13 L149 13 L151 81 Q151 101 120 116 Z" fill="#3e4248"/><path d="M93 16 L93 80" stroke="#d8dce0" stroke-width="1.6" opacity=".6"/>'
  + '<path d="M100 54 L104 30 L111 44 L118 28 L123 46 L134 52 L138 58 L130 62 L124 64 L120 80 L106 82 L102 66 Z" fill="#e6eaec"/><path d="M120 44 L123 46 L134 52 L138 58 L130 62 L124 64 L120 80 Z" fill="#b8bec2"/>'
  + '<ellipse cx="124" cy="52" rx="2" ry="1.4" fill="#141618"/><path d="M130 60 L124 61" stroke="#141618" stroke-width="1"/>'
  + '<g stroke="#2a2c2e" stroke-width="1" opacity=".6"><path d="M98 92 L112 86"/><path d="M134 30 L144 36"/><path d="M138 88 L146 80"/></g>'
  + '<path d="M91 13 L149 13" stroke="#f0f2f4" stroke-width="1.4" opacity=".55"/></g>');
/* a Malaz City cloak: dark sea-grey wool, a pewter clasp, salt gone white along the hem, hung from a peg */
b67Item('b6_c7_malazcloak', 'A cloak from Malaz City', '<ellipse cx="120" cy="120" rx="58" ry="5" fill="#000" opacity=".4"/>'
  + '<path d="M70 13 L170 13" stroke="#2a1e12" stroke-width="5" stroke-linecap="round"/><circle cx="120" cy="13" r="4" fill="#5a4028"/><path d="M100 20 Q120 8 140 20 Q146 40 132 44 Q120 36 108 44 Q94 40 100 20 Z" fill="#28303a"/>' // the peg rail; the hood hanging behind
  + '<path d="M96 18 Q120 12 144 18 L150 26 Q120 22 90 26 Z" fill="#323a42"/>'
  + '<path d="M92 24 Q120 20 148 24 Q166 66 170 114 Q146 120 120 116 Q94 120 70 114 Q74 66 92 24 Z" fill="#3a444e"/>'
  + '<path d="M120 22 Q132 70 128 116 M104 24 Q100 70 92 116 M138 24 Q148 70 152 116" stroke="#1e242a" stroke-width="3" fill="none" opacity=".7"/>'
  + '<path d="M96 28 Q86 70 80 110" stroke="#6a7a88" stroke-width="2" fill="none" opacity=".45"/><path d="M128 24 Q150 70 170 114 L152 116 Q140 70 124 24 Z" fill="#000" opacity=".25"/>'
  + '<path d="M70 112 Q94 118 120 114 Q146 118 170 112" stroke="#d8d4c8" stroke-width="2.4" fill="none" opacity=".45" stroke-dasharray="6 3"/>'
  + '<circle cx="120" cy="28" r="7" fill="#8a8c8a"/><circle cx="120" cy="28" r="7" fill="none" stroke="#3a3c3a" stroke-width="1.2"/><circle cx="118" cy="26" r="2.4" fill="#d4d6d2" opacity=".7"/><path d="M114 30 L126 30" stroke="#3a3c3a" stroke-width="1"/>');

/* ---------------- v13.33 (pictures against text): the borrowed backdrops replaced ----------------
   b6_c7_ambush (was the deck at sea, b6_sea): from the transport's rail, the fleet in the middle distance, the Edur's dark ships along both
   horizons; at b6_c7_ambush itself (and after) the sea to the north standing up in a wall of water the height of a hill, and between it and
   the fleet a raw brown wall of earth with the spray going up white off it. b6_c7_realm (was Book Three's starlit plain with riders): the
   sea that is not any sea, a green light, ice the size of hills on both sides, blue at the heart and white at the edge, the water roaring
   downhill and the fleet strung out down it, tilted bow-down; frost on the rail, the squad wrapped. b6_c7_finale (was the deck at sea): Malaz
   harbour at dusk, sails going out past the mole, the Hold on its rock and smoke over a Wickan street; the foreground by the road chosen:
   the jetty (no road yet, or 'jetty'), a transport's rail going out (adjunct), or the hill road above the city behind a Wickan family
   (wickans). b6_c7_last is the same at full dark. The finale's three pages (b6_fin_*) take the same painter with their own captions. */
function b67Wave(x, W, top, foot, a){ x.fillStyle = `rgba(70,86,92,${a})`; x.beginPath(); x.moveTo(-2, foot); for (let i = 0; i <= 40; i++) { const u = i/40; x.lineTo(u*W*1.02, top + Math.sin(u*9)*3 + Math.sin(u*23)*1.6 + (u < .1 ? (.1 - u)*90 : 0)); } x.lineTo(W + 2, foot); x.closePath(); x.fill();
  x.fillStyle = `rgba(226,236,236,${(a*.6).toFixed(2)})`; for (let i = 0; i < 40; i++) { const u = i/40; x.fillRect(u*W, top + Math.sin(u*9)*3 + Math.sin(u*23)*1.6 - 1.4, W/40 + 1, 1.6 + hash(i, 6761)*2); } } // the crest, white along the top
SCENEX.b6_c7_ambush = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.44, deck = H*.82, f = (S && S.f) || {}, up = !!f.b6_c7_ambushDone || (S && S.node === 'b6_c7_ambush');
  const roll = mo ? Math.sin(t/1500)*.02 : 0;
  ctx.drawImage(sceneLayer('b67:ambush' + (up ? ':up' : ''), W, H, (x, W, H) => {
    b67Sky(x, W, hz, '#2e3238', '#8a8e8c'); glow(x, W*.7, H*.12, W*.3, '#d8d8cc', .12);
    x.fillStyle = vgrad(x, hz, H, [[0, '#5a6468'], [.4, '#3e484c'], [1, '#1a2224']]); x.fillRect(0, hz, W, H - hz);
    if (up) { b67Wave(x, W*.62, hz - H*.27, hz + 2, .95); x.fillStyle = vgrad(x, hz - H*.24, hz, [[0, 'rgba(120,140,140,.35)'], [1, 'rgba(40,54,58,0)']]); x.fillRect(0, hz - H*.24, W*.62, H*.24); // the sea to the north, standing up
      // the wall of earth between: brown, raw, wet, rocks and roots in it, the water going up white off it
      x.fillStyle = '#4a3624'; x.beginPath(); x.moveTo(-2, hz + H*.04); for (let i = 0; i <= 24; i++) { const u = i/24; x.lineTo(u*W*.66, hz - H*(.1 + .03*Math.sin(u*11) + .02*hash(i, 6762))); } x.lineTo(W*.68, hz + H*.04); x.closePath(); x.fill();
      x.fillStyle = 'rgba(30,20,12,.6)'; for (let i = 0; i < 26; i++) ell(x, hash(i, 6763)*W*.64, hz - H*(.02 + hash(i, 6764)*.07), 2 + hash(i, 6765)*3, 1.2 + hash(i, 6765)*1.4, 'rgba(30,20,12,.6)'); // rocks in it
      x.strokeStyle = 'rgba(40,30,18,.8)'; x.lineWidth = .6; x.beginPath(); for (let i = 0; i < 18; i++) { const rx = hash(i, 6766)*W*.64, ry = hz - H*(.06 + hash(i, 6767)*.05); x.moveTo(rx, ry); x.lineTo(rx + (hash(i, 6768) - .5)*3, ry + 4 + hash(i, 6769)*5); } x.stroke(); // roots hanging off it
      x.fillStyle = 'rgba(160,140,110,.18)'; x.fillRect(0, hz - H*.12, W*.66, 1.4); }
    x.fillStyle = 'rgba(200,206,206,.3)'; x.fillRect(up ? W*.66 : 0, hz, W, 1);
    // the Edur along both horizons: long dark hulls, dark sails, more to the north than the eye can count
    for (let i = 0; i < (up ? 12 : 9); i++) { const u = up ? (i < 3 ? .03 + i*.06 : .69 + (i - 3)*.036) : .05 + i*.11, s = (.22 + hash(i, 6771)*.1)*H/240; b67Ship(x, W*u, hz + H*.01, s, 'rgba(14,16,18,.85)', 'rgba(40,40,44,.85)', true); }
    // the fleet in the middle distance, between: transports and their escorts, grey canvas
    [[.12, .5], [.26, .62], [.4, .48], [.55, .66], [.7, .52], [.86, .6]].forEach(([u, s], i) => b67Ship(x, W*u, hz + H*(.06 + s*.06), s*.7*H/240, 'rgba(34,36,40,.9)', 'rgba(176,176,168,.85)', i % 3 !== 1));
    for (let r = 0; r < 20; r++) { const y = hz + H*.08 + Math.pow(r/20, 1.5)*H*.5, k = r/20; x.strokeStyle = `rgba(${r % 3 ? '18,24,26' : '170,180,180'},${(.1 + k*.18).toFixed(2)})`; x.lineWidth = .6 + k*1.4; x.beginPath(); for (let i = 0; i <= 20; i++) { const xx = -W*.1 + i*W*.06, yy = y + Math.sin(i*1.4 + r*2.3)*(1 + k*4); i ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); }
  }), 0, 0, W, H);
  if (up) for (let i = 0; i < 16; i++) { const k = mo ? ((t/1600 + hash(i, 6772)) % 1) : hash(i, 6772), sx = W*(.02 + hash(i, 6773)*.62), sy = hz - H*.15 - k*H*.14; ell(ctx, sx, sy, 5 + k*12, 2 + k*5, `rgba(226,234,234,${(.3*(1 - k)).toFixed(2)})`); } // the spray going up off the earth
  // the transport's rail, near, rolling; the squad at it, watching north
  ctx.save(); ctx.translate(W/2, deck); ctx.rotate(roll); ctx.translate(-W/2, -deck);
  ctx.fillStyle = vgrad(ctx, deck, H*1.1, [[0, '#4a3e30'], [1, '#2a2218']]); ctx.fillRect(-W*.1, deck, W*1.2, H*.3);
  ctx.fillStyle = '#3a2e22'; ctx.fillRect(-W*.1, deck - H*.1, W*1.2, H*.022); ctx.fillStyle = 'rgba(255,240,210,.15)'; ctx.fillRect(-W*.1, deck - H*.1, W*1.2, 1.2);
  ctx.fillStyle = '#2e241a'; for (let i = 0; i < 9; i++) ctx.fillRect(W*(.02 + i*.12), deck - H*.08, W*.012, H*.08);
  ctx.restore();
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*.16 + i*W*.08, deck + H*.14, 1.6, t, {phase:i, dir:-1, still:!mo}));
  vign(ctx, W, H, .5, .5); };

SCENEX.b6_c7_realm = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.3, deck = H*.84;
  ctx.drawImage(sceneLayer('b67:realm', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, H*.62, [[0, '#0e1e1a'], [.45, '#2a5a48'], [.8, '#6aa88a'], [1, '#a8d4bc']]); x.fillRect(0, 0, W, H*.62); // the light gone green
    glow(x, W*.62, H*.5, W*.5, '#c8f0d8', .3);
    // the water, going downhill away from the bow: a slope falling to a low far point, white water streaking down it
    const fx = W*.64, fy = H*.56; x.fillStyle = vgrad(x, hz, H, [[0, '#9ccab4'], [.25, '#4a7a6a'], [.7, '#1e3a34'], [1, '#0e1c1a']]); x.beginPath(); x.moveTo(-2, H*.42); x.lineTo(fx - W*.08, fy); x.lineTo(fx + W*.08, fy); x.lineTo(W + 2, H*.4); x.lineTo(W + 2, H); x.lineTo(-2, H); x.closePath(); x.fill();
    for (let i = 0; i < 44; i++) { const k = hash(i, 6781), s = hash(i, 6782)*2 - 1, nx = fx + s*W*(.6 + k*.3), ny = H*(.62 + k*.38), mx = fx + s*W*.05; x.strokeStyle = `rgba(226,244,236,${(.1 + hash(i, 6783)*.22).toFixed(2)})`; x.lineWidth = .6 + k*1.6; x.beginPath(); x.moveTo(nx, ny); x.lineTo(lerp(nx, mx, .55 + hash(i, 6784)*.3), lerp(ny, fy, .55 + hash(i, 6784)*.3)); x.stroke(); } // the roaring water, streaming down toward the far point
    // the ice, the size of hills, on both sides: blue at the heart, white at the edges
    const berg = (pts, heart) => { poly(x, pts, '#e4f2f0'); const cx = pts.reduce((a, p) => a + p[0], 0)/pts.length, cy = pts.reduce((a, p) => a + p[1], 0)/pts.length; x.save(); x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.closePath(); x.clip();
      glow(x, cx, cy + H*.04, heart, '#3a7ab0', .75); x.fillStyle = 'rgba(20,50,70,.18)'; x.fillRect(cx, 0, W, H); x.restore(); };
    berg([[-4, H*.66], [-4, H*.08], [W*.06, H*.02], [W*.12, H*.16], [W*.2, H*.12], [W*.27, H*.3], [W*.33, H*.44], [W*.36, H*.58], [W*.3, H*.66]], W*.2);
    berg([[W*.42, H*.56], [W*.45, H*.4], [W*.49, H*.36], [W*.53, H*.44], [W*.55, H*.55]], W*.04);
    berg([[W*.74, H*.56], [W*.77, H*.3], [W*.83, H*.18], [W*.9, H*.22], [W*.95, H*.1], [W + 4, H*.14], [W + 4, H*.66], [W*.86, H*.64]], W*.18);
    x.fillStyle = 'rgba(240,250,248,.5)'; x.fillRect(0, H*.64, W*.32, 1.4); x.fillRect(W*.84, H*.63, W*.16, 1.4); // the foam at their feet
    // the fleet strung out ahead down the roaring water, each ship bow-down on the slope, smaller and lower as it goes
    [[.5, .62, .9], [.56, .6, .62], [.6, .58, .44], [.63, .565, .3], [.65, .56, .2]].forEach(([u, v, s]) => { x.save(); x.translate(W*u, H*v); x.rotate(.22); b67Ship(x, 0, 0, s*.8*H/240, 'rgba(20,30,28,.9)', 'rgba(200,220,210,.8)', true); x.restore(); });
  }), 0, 0, W, H);
  // frost on the rail; the lanterns lit at noon; the squad wrapped in every blanket the 9th owns
  ctx.fillStyle = vgrad(ctx, deck, H, [[0, '#4a4a46'], [1, '#22221e']]); ctx.fillRect(0, deck, W, H - deck);
  ctx.fillStyle = '#3a3a36'; ctx.fillRect(0, deck - H*.1, W, H*.022); ctx.fillStyle = 'rgba(236,248,246,.7)'; ctx.fillRect(0, deck - H*.1, W, 1.6); // the rail, frosted white along the top
  ctx.fillStyle = '#2e2e2a'; for (let i = 0; i < 9; i++) ctx.fillRect(W*(.02 + i*.12), deck - H*.08, W*.012, H*.08);
  ctx.fillStyle = 'rgba(236,248,246,.25)'; for (let i = 0; i < 30; i++) ctx.fillRect(hash(i, 6791)*W, deck + hash(i, 6792)*H*.15, 4 + hash(i, 6793)*8, 1); // rime on the deck
  { const lx = W*.92, ly = deck - H*.2; B2F.line(ctx, '#1a1a18', 1.2, [[lx, deck - H*.1], [lx, ly]]); ctx.fillStyle = '#2a2018'; ctx.fillRect(lx - 3, ly, 6, 7); ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly + 4, 16, '#ffc070', .5); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#ffe0a0'; ctx.fillRect(lx - 1.4, ly + 2, 2.8, 3.4); }
  for (let i = 0; i < 40; i++) { const k = mo ? ((t/2200 + hash(i, 6794)) % 1) : hash(i, 6794); ctx.fillStyle = `rgba(240,250,248,${(.25 + .3*hash(i, 6795)).toFixed(2)})`; ctx.fillRect(hash(i, 6796)*W + k*30, H*(.05 + k*.9), 1.2, 1.2); } // spray freezing, going by
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.14 + i*W*.08, deck + H*.12, 1.55, t, {phase:i, dir:1, still:!mo}));
  ctx.fillStyle = 'rgba(140,220,180,.08)'; ctx.fillRect(0, 0, W, H); // the green over everything
  vign(ctx, W, H, .5, .5); };

/* Malaz from the water at dusk (or full dark): the Hold on its rock at the left over the roofs, smoke and a glow over a Wickan street, the
   harbour, the mole running out on the right with a light at its end, and the sails going out past it toward the last of the light */
function b67Hold(x, W, H, rockX, wl, s, col){ x.save(); x.translate(rockX, wl); x.scale(s, s); x.translate(-rockX, -wl); x.fillStyle = col;
  x.beginPath(); x.moveTo(rockX - W*.2, wl); x.lineTo(rockX - W*.14, H*.34); x.lineTo(rockX - W*.09, H*.26); x.lineTo(rockX - W*.06, H*.2); x.lineTo(rockX + W*.05, H*.19); x.lineTo(rockX + W*.09, H*.28); x.lineTo(rockX + W*.13, H*.4); x.lineTo(rockX + W*.2, wl); x.closePath(); x.fill();
  x.beginPath(); x.moveTo(rockX - W*.07, H*.2); x.lineTo(rockX - W*.07, H*.12); x.lineTo(rockX - W*.055, H*.12); x.lineTo(rockX - W*.055, H*.09); x.lineTo(rockX - W*.035, H*.09); x.lineTo(rockX - W*.035, H*.12); x.lineTo(rockX - W*.01, H*.12);
  x.lineTo(rockX - W*.01, H*.06); x.lineTo(rockX + W*.005, H*.04); x.lineTo(rockX + W*.02, H*.06); x.lineTo(rockX + W*.02, H*.13); x.lineTo(rockX + W*.06, H*.13); x.lineTo(rockX + W*.06, H*.195); x.closePath(); x.fill(); x.restore(); }
function b67Roofs(x, W, H, x0, x1, wl, rockX, s, night){ for (let r = 0; r < 4; r++) { const base = wl - r*H*.035*s, n = Math.round(34*(x1 - x0)/W) + 2; for (let i = 0; i < n; i++) { const bx = x0 + i*(x1 - x0)/n + (r % 2)*(x1 - x0)/(n*2), d = Math.abs(bx - rockX)/W; if (r > 1 && d > .22*s + .06) continue;
    const bh = H*(.02 + hash(i, r, 6801)*.03)*s, top = base - bh - (d < .2 ? (.2 - d)*H*.25*(r/3)*s : 0), bw = (x1 - x0)/n + 1; x.fillStyle = night ? ['#141216', '#121014', '#100e12', '#0e0c10'][r] : ['#3a3034', '#322a2e', '#2a2428', '#241e22'][r]; x.fillRect(bx, top, bw, wl - top);
    x.fillStyle = night ? '#18161a' : ['#4a3a36', '#40322e', '#382c2a', '#302624'][r]; x.beginPath(); x.moveTo(bx - 1, top); x.lineTo(bx + bw/2, top - bh*.4); x.lineTo(bx + bw, top); x.fill();
    if (hash(i, r, 6802) > (night ? .6 : .72)) { x.fillStyle = 'rgba(255,190,120,.7)'; x.fillRect(bx + bw*.3, top + bh*.4, 1.4*s + .4, 1.4*s + .4); } } } }
function b67Harbour(x, W, H, o){ const hz = o.hz, wl = o.wl, rockX = o.rockX, s = o.s, night = o.night;
  if (night) { x.fillStyle = vgrad(x, 0, hz, [[0, '#04050a'], [.6, '#0c1020'], [1, '#1a1e2c']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 120; i++) { const yy = Math.pow(hash(i, 6811), 1.3)*hz*.92; x.fillStyle = `rgba(222,228,250,${(.12 + hash(i, 6812)*.5).toFixed(2)})`; const r = hash(i, 6813) > .93 ? 1.4 : .9; x.fillRect(hash(i, 6814)*W, yy, r, r); } }
  else { b67Sky(x, W, hz, '#2a2632', '#c4865a'); glow(x, W*.84, hz, W*.42, '#f0a060', .4); glow(x, W*.84, hz, 10, '#ffe0b0', .8); } // dusk, the light low in the west over the open sea
  x.fillStyle = vgrad(x, hz, H, night ? [[0, '#1a1e28'], [1, '#04060a']] : [[0, '#8a6a5a'], [.25, '#4a4448'], [1, '#1a1c20']]); x.fillRect(0, hz, W, H - hz); // the water
  x.fillStyle = night ? 'rgba(120,130,160,.3)' : 'rgba(255,200,150,.45)'; x.fillRect(W*.4, hz, W*.6, 1);
  b67Hold(x, W, H, rockX, wl, s, night ? '#0a090c' : '#1a181c');
  if (!night) { x.save(); x.translate(rockX, wl); x.scale(s, s); x.translate(-rockX, -wl); x.fillStyle = 'rgba(220,150,100,.14)'; x.fillRect(rockX + W*.018, H*.06, 1, H*.07); x.restore(); }
  b67Roofs(x, W, H, -W*.02, rockX + W*.3*s, wl, rockX, s, night);
  x.fillStyle = night ? '#0c0a0c' : '#2a2420'; x.fillRect(-2, wl, rockX + W*.3*s + 2, H*.012*s + 1); // the quay
  // the mole: a long low arm of stone running out from the right, a lamp at its end
  const my = o.moleY, mx0 = o.moleX; x.fillStyle = night ? '#0c0c10' : '#2e2a2a'; x.beginPath(); x.moveTo(W + 2, my + H*.03); x.lineTo(mx0, my + H*.004); x.lineTo(mx0, my - H*.012); x.lineTo(W + 2, my - H*.006); x.closePath(); x.fill();
  if (!night) { x.fillStyle = 'rgba(255,210,170,.22)'; x.fillRect(mx0, my - H*.012, W - mx0, 1); }
  x.fillStyle = night ? '#0c0c10' : '#2a2626'; x.fillRect(mx0 + 1, my - H*.05, W*.012, H*.04); // the lamp-tower on its end
  for (let i = 0; i < 26; i++) { const k = hash(i, 6815), y = lerp(wl + H*.02, H, k), xx = hash(i, 6816)*W; x.fillStyle = night ? `rgba(160,170,200,${(.05 + .08*hash(i, 6817)).toFixed(2)})` : `rgba(230,180,140,${(.08 + .14*hash(i, 6817)).toFixed(2)})`; x.fillRect(xx, y, 4 + 12*k, 1); } // the harbour catching the light
}
/* ships going out: past the mole and toward the horizon, sails set, smaller as they go; 'inner' adds the last two still inside, nearer */
function b67Going(x, W, H, hz, my, mx0, n, inner, night){ for (let i = 0; i < n; i++) { const k = i/(Math.max(1, n - 1)), u = lerp(mx0 - W*.02, W*.98, k*.92 + hash(i, 6821)*.06), s = lerp(.5, .14, k)*H/240;
    b67Ship(x, u, lerp(my - H*.004, hz + H*.006, k), s, night ? 'rgba(6,6,10,.9)' : 'rgba(26,22,26,.9)', night ? 'rgba(60,62,74,.85)' : 'rgba(196,170,150,.9)', true);
    if (night) { x.globalCompositeOperation = 'lighter'; glow(x, u - 20*s, lerp(my, hz, k) - 4*s, 5, '#ffb060', .5); x.globalCompositeOperation = 'source-over'; } } // a stern lantern each, at night
  if (inner) [[.62, .1, .9], [.74, .06, .7]].forEach(([u, dv, k]) => b67Ship(x, W*u, my + H*dv, k*H/240, night ? 'rgba(6,6,10,.95)' : '#1c181c', night ? 'rgba(60,62,74,.9)' : 'rgba(176,150,132,.95)', true)); }
function b67Smoke(ctx, W, H, t, mo, pts){ pts.forEach(([u, by, k], i) => { const cx = W*u; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, by, H*.12*k, '#ff7a3a', (.18 + (mo ? Math.sin(t/400 + i*2)*.05 : 0))*k); ctx.globalCompositeOperation = 'source-over';
  for (let j = 0; j < 7; j++) { const rise = mo ? ((t/120 + j*18 + i*40) % (H*.36)) : j*H*.045, a = .5*(1 - rise/(H*.36)); ell(ctx, cx - rise*.5 + Math.sin(j + i)*4, by - rise, (10 + rise*.26)*k, (5 + rise*.09)*k, `rgba(64,56,58,${(a*.55).toFixed(2)})`); } }); }
/* a family on the road, walking away up it: two women, a grandmother, children, and a boy of sixteen with a horse-bow at the front */
function b67Family(ctx, pt, t, mo){ [['wickan', 0, 1], ['b3_c5_villager', .07, 1], ['b5_c7_child', .1, .78], ['b3_c5_villager', .14, .96], ['b5_c7_child', .17, .74], ['b3_c5_villager', .21, .94], ['b5_c7_child', .24, .7]].forEach(([k, d, sz], i) => { const [px, py, s] = pt(d); drawFigure(ctx, k, px, py, s*sz, t, {phase:i + 3, dir:1, still:!mo}); }); }
function b67Fin(road, night){ return (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  const sq = marchOrder(sceneSquad());
  if (road === 'wickans') { const hz = H*.34, wl = H*.6;
    const rd = k => [lerp(W*.02, W*1.02, k), lerp(H*1.02, H*.5, Math.pow(k, .8)) + Math.sin(k*5)*H*.02, lerp(1.6, .8, k)]; // the hill road, climbing away to the right
    ctx.drawImage(sceneLayer('b67:fin-wickans' + (night ? ':n' : ''), W, H, (x, W, H) => {
      b67Harbour(x, W, H, {hz, wl, rockX:W*.16, s:.62, night, moleY:H*.5, moleX:W*.5});
      if (!night) b67Going(x, W, H, hz, H*.5, W*.5, 7, false, false);
      // the hillside, near, coming up from the bottom left: scrub and stone, the road on it pale
      x.fillStyle = vgrad(x, H*.4, H, night ? [[0, '#0e0e0c'], [1, '#040404']] : [[0, '#4a4430'], [.5, '#3a3426'], [1, '#1e1a12']]); x.beginPath(); x.moveTo(-2, H + 2); x.lineTo(-2, H*.86); x.quadraticCurveTo(W*.45, H*.66, W*.7, H*.48); x.quadraticCurveTo(W*.86, H*.4, W + 2, H*.36); x.lineTo(W + 2, H + 2); x.closePath(); x.fill();
      { const L = [], R = []; for (let i = 0; i <= 30; i++) { const k = i/30, [px, py] = rd(k), w = lerp(13, 3, k); L.push([px, py - w]); R.push([px, py + w]); } poly(x, L.concat(R.reverse()), night ? 'rgba(70,66,58,.5)' : 'rgba(178,162,128,.6)'); } // the road, pale, climbing
      for (let i = 0; i < 40; i++) { const k = hash(i, 6831), px = W*(.1 + hash(i, 6832)*.9), py = lerp(H, H*.42, Math.pow(k, .7)) + (px/W - .5)*H*.1; if (py < lerp(H*.86, H*.36, px/W) + 6) continue; { const kk = Math.min(1, Math.max(0, (px - W*.02)/(W))), ry = rd(kk)[1]; if (Math.abs(py - ry) < 18) continue; } b61Bush(x, px, py, .5 + (1 - k)*1.1, night ? 'rgba(4,4,4,.9)' : 'rgba(30,26,16,.85)'); } // scrub
    }), 0, 0, W, H);
    b67Smoke(ctx, W, H, t, mo, [[.26, H*.52, .7]]); // the Wickan street, still burning
    b67Family(ctx, k => { const [px, py, s] = rd(.62 + k); return [px, py - 6*s, s*.9]; }, t, mo);
    squadLine(sq, 1, (id, i) => { const [px, py, s] = rd(.06 + i*Math.min(.075, .44/sq.length)); drawFigure(ctx, id, px, py - 8*s, s*1.05, t, {phase:i, dir:1, still:!mo}); });
    if (night) { ctx.fillStyle = 'rgba(10,14,30,.25)'; ctx.fillRect(0, 0, W, H); }
    vign(ctx, W, H, night ? .7 : .5, .5); return; }
  const rail = road === 'adjunct', hz = H*.5, wl = rail ? H*.56 : H*.6, s = rail ? .7 : 1, rockX = rail ? W*.14 : W*.18, my = H*.6, mx0 = W*.56;
  const empty = road === 'jetty' && night, inner = !road && !night;
  ctx.drawImage(sceneLayer('b67:fin-' + (road || 'none') + (night ? ':n' : ''), W, H, (x, W, H) => {
    b67Harbour(x, W, H, {hz, wl, rockX, s, night, moleY:my, moleX:mx0});
    if (!empty) b67Going(x, W, H, hz, my, mx0, rail ? 9 : 6, inner, night);
  }), 0, 0, W, H);
  b67Smoke(ctx, W, H, t, mo, night ? [[rail ? .26 : .34, wl - H*.06*s, .6*s]] : [[rail ? .26 : .34, wl - H*.06*s, s], [rail ? .06 : .08, wl - H*.05*s, .7*s]]);
  if (rail) { const deck = H*.82; // the transport's rail going out, the squad at it, looking back at the city
    ctx.fillStyle = vgrad(ctx, deck, H*1.05, [[0, night ? '#1a1612' : '#4a3e30'], [1, '#14100c']]); ctx.fillRect(0, deck, W, H - deck);
    ctx.fillStyle = night ? '#16120e' : '#3a2e22'; ctx.fillRect(0, deck - H*.1, W, H*.022); ctx.fillStyle = night ? 'rgba(160,170,200,.12)' : 'rgba(255,220,180,.2)'; ctx.fillRect(0, deck - H*.1, W, 1.2);
    ctx.fillStyle = night ? '#120e0a' : '#2e241a'; for (let i = 0; i < 9; i++) ctx.fillRect(W*(.02 + i*.12), deck - H*.08, W*.012, H*.08);
    ctx.fillStyle = night ? '#0e0a08' : '#2a2016'; ctx.fillRect(W*.9, -2, W*.028, deck); ctx.strokeStyle = night ? 'rgba(8,6,4,.9)' : 'rgba(30,24,18,.85)'; ctx.lineWidth = 1.1; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(W*.912, 0); ctx.lineTo(W*(.72 + i*.04), deck - H*.1); } ctx.stroke(); // the mast and its shrouds
    squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*.12 + i*W*.08, deck + H*.14, 1.6, t, {phase:i, dir:-1, still:!mo}));
  } else { const jt = H*.84; // the jetty's foot: planks, a bollard; the squad on it, looking out at the sails
    ctx.fillStyle = vgrad(ctx, jt, H, [[0, night ? '#1e1812' : '#4a3c2e'], [1, '#14100c']]); ctx.fillRect(0, jt, W, H - jt); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let i = 0; i < 18; i++) { ctx.beginPath(); ctx.moveTo(i*W/16, jt); ctx.lineTo(i*W/16 - W*.03, H); ctx.stroke(); }
    ctx.fillStyle = night ? 'rgba(160,170,200,.1)' : 'rgba(255,230,190,.16)'; ctx.fillRect(0, jt, W, 1.2); ctx.fillStyle = '#1e1812'; ctx.fillRect(W*.94, jt - H*.05, W*.025, H*.06); ell(ctx, W*.9525, jt - H*.05, W*.016, H*.01, '#2e261c');
    if (inner) { // no road yet: the squad's own transport still alongside, the plank half in
      ctx.fillStyle = '#1a1410'; ctx.beginPath(); ctx.moveTo(W*.78, jt - H*.02); ctx.quadraticCurveTo(W*.73, jt - H*.12, W*.74, jt - H*.3); ctx.lineTo(W + 2, jt - H*.34); ctx.lineTo(W + 2, jt - H*.02); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(W*.745, jt - H*(.3 - i*.055)); ctx.lineTo(W + 2, jt - H*(.33 - i*.06)); ctx.stroke(); } // her strakes
      ctx.fillStyle = 'rgba(255,210,170,.16)'; ctx.fillRect(W*.74, jt - H*.3, W*.26, 1.2); ctx.fillStyle = '#120e0a'; ctx.fillRect(W*.86, -2, W*.02, jt - H*.3); // her side, her mast
      B2F.line(ctx, '#3a2e22', 3, [[W*.66, jt + H*.02], [W*.75, jt - H*.16]]); } // the plank, half in
    if (road === 'jetty' && !night) for (let i = 0; i < 6; i++) drawFigure(ctx, i % 3 === 2 ? 'b5_c7_child' : 'b3_c5_villager', W*(.03 + i*.045), jt + H*.05 - (i % 2)*2, i % 3 === 2 ? 1.05 : 1.3, t, {phase:i + 5, dir:1, still:!mo, alpha:night ? .55 : .9}); // the Wickan families, behind
    const x0 = road === 'jetty' ? W*.32 : W*.08; squadLine(sq, 1, (id, i) => drawFigure(ctx, id, x0 + i*W*.075, jt + H*.12, 1.55, t, {phase:i, dir:1, still:!mo})); }
  if (night) { ctx.fillStyle = 'rgba(8,12,28,.28)'; ctx.fillRect(0, 0, W, H); }
  vign(ctx, W, H, night ? .7 : .55, .5); }; }
const B67FINP = {none:b67Fin(null, false), adjunct:b67Fin('adjunct', false), jetty:b67Fin('jetty', false), wickans:b67Fin('wickans', false),
  adjunctN:b67Fin('adjunct', true), jettyN:b67Fin('jetty', true), wickansN:b67Fin('wickans', true)};
SCENEX.b6_c7_finale = (cv, t) => { const k = typeof b67Key === 'function' && S && S.f ? b67Key() : null, end = S && S.scene === 'chend', night = !end && S && S.node === 'b6_c7_last' && !!k;
  return (B67FINP[(k || 'none') + (night ? 'N' : '')] || B67FINP.none)(cv, t); };
SCENEX.b6_fin_adjunct = B67FINP.adjunctN; // "west out of Malaz harbour in the night"
SCENEX.b6_fin_jetty = B67FINP.jetty;
SCENEX.b6_fin_wickans = B67FINP.wickans;

/* b6_c7_lanes (it had borrowed Letheras's night street from Book Five): a lane behind Malaz waterfront at dusk, going up steeply away from the
   water, narrow and crooked, the upper floors leaning together over it, every door shut; a red light on the walls from a Wickan street burning
   to the north, and torches moving in the lanes two over; at the top of it the island's hills against the last of the sky */
SCENEX.b6_c7_lanes = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, vx = W*.56, vy = H*.3;
  ctx.drawImage(sceneLayer('b67:lanes', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, H*.4, [[0, '#14121c'], [.6, '#3a2430'], [1, '#7a3a2a']]); x.fillRect(0, 0, W, H*.4); // dusk, reddened from the north
    x.fillStyle = '#1a1418'; x.beginPath(); x.moveTo(W*.36, H*.32); x.quadraticCurveTo(W*.56, H*.2, W*.78, H*.3); x.lineTo(W*.78, H*.4); x.lineTo(W*.36, H*.4); x.fill(); // the hills above the town
    x.fillStyle = '#1e181a'; x.fillRect(0, H*.3, vx, H*.7); x.fillStyle = '#3a2822'; x.fillRect(vx, H*.3, W - vx, H*.7); // the near house-sides, behind everything
    // the lane: cobbles climbing away, stepped, toward the top
    x.fillStyle = vgrad(x, vy, H, [[0, '#2a2020'], [1, '#3a2e26']]); x.beginPath(); x.moveTo(vx - W*.03, vy); x.lineTo(vx + W*.03, vy); x.lineTo(W*.8, H); x.lineTo(W*.22, H); x.closePath(); x.fill();
    for (let i = 1; i < 14; i++) { const k = Math.pow(i/14, 1.6), y = lerp(vy, H, k), hw = lerp(W*.03, W*.29, k); x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(vx - hw, y, hw*2, 1 + k*2); x.fillStyle = 'rgba(255,150,100,.06)'; x.fillRect(vx - hw, y - 1 - k, hw*2, 1); } // the steps of it
    // the houses each side, leaning together as they go up; doors shut; a shutter or two
    // the house fronts each side, receding up the lane and leaning in as they go; doors shut, shutters closed
    const P = (sd, k) => { const fy = lerp(H*1.02, vy, k), ex = vx + sd*lerp(W*.3, W*.032, k), top = lerp(-H*.25, vy - H*.14, k), lean = sd*lerp(W*.07, W*.008, k); return {fy, ex, top, tx:ex - lean}; };
    [-1, 1].forEach(sd => { for (let i = 0; i < 8; i++) { const k0 = Math.pow(i/8, 1.3), k1 = Math.pow((i + 1)/8, 1.3), a = P(sd, k0), b = P(sd, k1);
      poly(x, [[a.ex, a.fy], [b.ex, b.fy], [b.tx, b.top], [a.tx, a.top]], sd < 0 ? ['#2a2024', '#30262a', '#26201e'][i % 3] : ['#4a3228', '#523a2e', '#46302a'][i % 3]);
      B2F.line(x, 'rgba(0,0,0,.35)', 1, [[a.ex, a.fy], [a.tx, a.top]]); // the joint between houses
      const d0 = .35, d1 = .6, q = (u, h) => [lerp(a.ex, b.ex, u) + (lerp(a.tx, b.tx, u) - lerp(a.ex, b.ex, u))*h, lerp(a.fy, b.fy, u) + (lerp(a.top, b.top, u) - lerp(a.fy, b.fy, u))*h];
      poly(x, [q(d0, 0), q(d1, 0), q(d1, .32), q(d0, .32)], '#140e0c'); // a door, shut
      poly(x, [q(d0 + .03, .55), q(d1 - .03, .55), q(d1 - .03, .68), q(d0 + .03, .68)], '#100a0a'); } }); // a shutter, closed
    x.fillStyle = 'rgba(255,90,40,.12)'; x.fillRect(W*.5, 0, W*.5, H); // the burning street's light on the right-hand walls
  }), 0, 0, W, H);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.86, H*.2, H*.5, '#ff6a2a', .22 + (mo ? Math.sin(t/300)*.04 : 0)); ctx.globalCompositeOperation = 'source-over'; // a Wickan street burning two lanes over
  for (let j = 0; j < 8; j++) { const rise = mo ? ((t/110 + j*20) % (H*.4)) : j*H*.05; ell(ctx, W*.86 - rise*.4, H*.14 - rise*.6, 10 + rise*.3, 5 + rise*.1, `rgba(60,44,44,${(.35*(1 - rise/(H*.4))).toFixed(2)})`); }
  for (let i = 0; i < 4; i++) { const k = mo ? ((t/9000 + i/4) % 1) : i/4, px = W*(.62 + i*.07), py = H*(.12 + k*.06), fl = mo ? .7 + Math.sin(t/150 + i*2)*.3 : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, px, py, 8, '#ffa050', .5*fl); ctx.globalCompositeOperation = 'source-over'; } // torches moving, over the roofs
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.4 + i*Math.min(22, W*.3/sq.length), H*.96 - i*H*.012, 1.6 - i*.04, t, {phase:i, dir:1}));
  vign(ctx, W, H, .6, .5); };
