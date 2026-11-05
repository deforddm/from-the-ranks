/* ============ Book Six, Chapter 1 art: The Lato Odhan — the Fourteenth's night camp on the scrub, Y'Ghatan's bone walls at dusk ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d, lit from the left: Mehet, the potter's son of Y'Ghatan who stayed (the recruit), and two
   new foe kinds, Leoman's rebel (b6_rebel: dust robes, a face-wrap, a tulwar and a hide buckler) and the fanatic with a torch (b6_fanatic:
   thin, ragged, the torch held high). Both replace the borrowed Book Four runner (b4_c7_fleer) on the engine's foes. The bust (POR.mehet),
   lantern low left, a rim on the right. Two backdrops replace their placeholders (SCENEX, sceneLayer for the still parts, REDUCE() holding
   the rest still): b6_odhan_night (the Deck's table too) and b6_ghatan_walls. And the chapter's gear in the series' 200×150 item style
   (089g) on Book Six's ground: a smoke-umber vignette, the Odhan's dust gone red at dusk (Claude's call).
   Book Six's look for the Third: bone-coloured walls, scrub, smoke-red dusk; the Fourteenth in grey-green cloaks over mail. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Mehet: thirty-one, lean, never with his back to a wall; a long quilted coat the colour of the potters' street, a dark scarf up over
     his mouth, short black hair, a sling in the front hand with the stone in its cup, a pouch of fired-clay shot and the ring of keys at the belt */
  mehet(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .93, 1); const sw = o.still ? 0 : Math.sin(t/260 + (o.phase || 0));
    h.legs('#3a3026'); ctx.fillStyle = '#5a4630'; ctx.fillRect(-4.6, 10.4, 3.6, 2.6); ctx.fillRect(1, 10.4, 3.6, 2.6); // soft boots, dust to the ankle
    poly(ctx, [[-6,-6],[6,-6],[7.2,9.4],[-7.2,9.4]], h.armor('#b8986e', '#3a2c1c')); // the quilted coat to the knee
    ctx.strokeStyle = 'rgba(40,26,14,.32)'; ctx.lineWidth = .45; ctx.beginPath(); for (let i = -3; i < 4; i++) { ctx.moveTo(-6 + i*3, -6); ctx.lineTo(-1 + i*3, 9.4); ctx.moveTo(6 + i*3, -6); ctx.lineTo(1 + i*3, 9.4); } ctx.stroke(); // the quilting
    ctx.fillStyle = 'rgba(255,240,210,.14)'; ctx.fillRect(-5.6, -5.4, 1.4, 14); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(-.5, -6, 1, 15.4); // lit edge, the coat's front
    ctx.fillStyle = '#3a2614'; ctx.fillRect(-6.4, 2.2, 12.8, 1.4); // the belt
    ell(ctx, 3.8, 4.6, 1.8, 2, '#6a4a2a'); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(2.2, 4.8, 3.4, .6); // the pouch of shot
    ctx.strokeStyle = '#a89a7a'; ctx.lineWidth = .55; ctx.beginPath(); ctx.arc(-3.4, 5, 1.6, 0, 7); ctx.stroke(); B2F.line(ctx, '#c8b88a', .6, [[-4.2, 6], [-4.6, 8]]); B2F.line(ctx, '#9a8a6a', .6, [[-2.8, 6.2], [-2.4, 8.2]]); B2F.line(ctx, '#b8a87a', .6, [[-3.5, 6.4], [-3.5, 8.6]]); // the ring of keys
    ctx.fillStyle = '#b8986e'; ctx.fillRect(-7.6, -4.6, 2.2, 6.4); ell(ctx, -6.5, 2.2, 1.1, 1.1, '#9a7454'); // the back arm, close
    // the sling: the front hand low, the cords and the cup swinging
    ctx.fillStyle = '#a88a68'; ctx.fillRect(5.4, -4, 2.2, 5.6); ell(ctx, 6.6, 2, 1.1, 1.1, '#9a7454');
    const cx = 9.4 + sw*1.6, cy = 8.6 - Math.abs(sw)*.8; B2F.line(ctx, '#5a4a32', .5, [[6.6, 2.2], [cx - .8, cy]]); B2F.line(ctx, '#5a4a32', .5, [[6.8, 2.2], [cx + .8, cy]]); ell(ctx, cx, cy + .4, 1.4, .9, '#4a3420'); ell(ctx, cx, cy - .1, .8, .7, '#b0603a');
    h.head('#9a7454', 4.3, -11.2); h.look('rgba(20,12,8,.88)', -11.6);
    ctx.fillStyle = '#121010'; ctx.beginPath(); ctx.arc(0, -12.4, 4.7, Math.PI*1.02, Math.PI*1.98); ctx.fill(); ctx.fillRect(-4.6, -12.6, 1.6, 2.6); // short black hair
    poly(ctx, [[-4.6,-10],[4.6,-10],[4.4,-6.4],[2.8,-5.2],[-3,-5.2],[-4.6,-6.6]], '#3a4256'); ctx.fillStyle = 'rgba(200,210,230,.16)'; ctx.fillRect(-4.2, -9.6, 3.6, .7); // the scarf up over his mouth
    poly(ctx, [[-4.4,-6.4],[-7.4,-3.4],[-6.4,-1],[-3.8,-5]], '#2e3446'); // its tail over the shoulder
    ctx.restore(); },
  /* Leoman's rebel: a desert fighter of the last army in Seven Cities; robes the colour of the Odhan, a sash, a head-cloth wound into a
     face-wrap so only the eyes show, a tulwar held up and out, a small round hide buckler on the back arm. A little variety from o.phase */
  b6_rebel(ctx, h, t, o){ ctx.save(); const rb = b2Pick(o, [['#a68a62', '#3e2c18'], ['#8a7252', '#2e2216'], ['#b49a72', '#4a3820'], ['#7a6a52', '#2a2018']]),
      wr = b2Pick(o, ['#2a2422', '#5a4a3a', '#3a2a22', '#6a2a1e']), sk = b2Pick(o, ['#7a5438', '#8a6244', '#6a4a32']), sa = b2Pick(o, ['#6a2a1e', '#3a3a2a', '#5a4020']);
    const br = o.still ? 0 : Math.sin(t/380 + (o.phase || 0)*1.3)*.5;
    ctx.fillStyle = sk; ctx.fillRect(-4.4, 8.4, 3.2, 3.4); ctx.fillRect(1.2, 8.4, 3.2, 3.4); ctx.fillStyle = '#2a1c10'; ctx.fillRect(-4.6, 11.6, 3.6, 1.4); ctx.fillRect(1, 11.6, 3.6, 1.4); // bare shins, sandals
    poly(ctx, [[-6.2,-6],[6,-6],[7.4,9],[2,8.4],[-2,9],[-7.6,9.4]], h.armor(rb[0], rb[1])); // the robe, to the shin
    ctx.fillStyle = 'rgba(255,236,200,.13)'; ctx.fillRect(-5.8, -5.4, 1.6, 13); ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(-2, -3); ctx.lineTo(-3.4, 8.6); ctx.moveTo(2.6, -3); ctx.lineTo(3.4, 8.4); ctx.stroke(); // folds
    ctx.fillStyle = sa; ctx.fillRect(-6.6, 1.2, 13, 1.8); ctx.fillRect(-3.6, 3, 1.4, 3.4); // the sash and its tail
    // the buckler on the back arm: hide over a wicker frame, a dark rim, a boss
    ctx.beginPath(); ctx.arc(-7.4, -.4 + br, 4.6, 0, 7); ctx.fillStyle = h.armor('#a08058', '#3a2814'); ctx.fill(); ctx.strokeStyle = '#1a120a'; ctx.lineWidth = .9; ctx.stroke(); ell(ctx, -7.4, -.4 + br, 1.2, 1.2, '#8a7a5a');
    ctx.strokeStyle = 'rgba(60,40,20,.5)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.arc(-7.4, -.4 + br, 3, 0, 7); ctx.stroke();
    ctx.fillStyle = rb[0]; ctx.fillRect(5.4, -4.4, 2.2, 5.4); ell(ctx, 6.6, 1.4, 1.1, 1.1, sk); // the sword arm
    ctx.save(); ctx.translate(0, br); B2F.curved(ctx, '#cfc6b2', 1.05); ctx.restore(); // the tulwar
    h.head(sk, 4.4, -11.2);
    ctx.fillStyle = wr; ctx.beginPath(); ctx.arc(0, -11.8, 5.3, Math.PI*.92, Math.PI*2.08); ctx.fill(); ctx.fillRect(-5.3, -12.2, 10.6, 3); // the head-cloth
    poly(ctx, [[-5,-10],[5.2,-10],[4.8,-6],[2.6,-4.6],[-3,-4.6],[-5.2,-6.4]], wr); poly(ctx, [[-4.8,-9.6],[-8.4,-6.4],[-7.6,-4],[-4.4,-6.8]], shade(wr, -.2)); // wound into a face-wrap, a tail behind
    ctx.fillStyle = sk; ctx.fillRect(-2.6, -12.4, 6.2, 2); h.look('rgba(16,8,4,.92)', -11.8); // only the eyes show
    ctx.fillStyle = 'rgba(255,240,210,.12)'; ctx.fillRect(-4.6, -15.4, 3, .8);
    ctx.restore(); },
  /* a fanatic with a torch: thinner, younger, ragged; a pale robe gone grey with ash, a cloth band round a shaved head, a long knife low in
     the back hand, the torch held up high in the front one, the flame breathing (a torch only: nobody burns) */
  b6_fanatic(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1.02); const rb = b2Pick(o, [['#bcae92', '#4a4030'], ['#a89a80', '#3a3226'], ['#c4b496', '#544632']]), sk = b2Pick(o, ['#8a6244', '#7a5438', '#9a7050']),
      fl = o.still ? 1 : .82 + Math.sin(t/90 + (o.phase || 0)*2)*.1 + Math.sin(t/37)*.08, lean = o.still ? 0 : Math.sin(t/300 + (o.phase || 0))*.04;
    ctx.translate(0, 13); ctx.rotate(.08 + lean); ctx.translate(0, -13); // leaning in
    ctx.fillStyle = sk; ctx.fillRect(-4.4, 6, 3, 6); ctx.fillRect(1.4, 6, 3, 6); ctx.fillStyle = '#2a1c10'; ctx.fillRect(-4.6, 11.8, 3.4, 1.2); ctx.fillRect(1.2, 11.8, 3.4, 1.2); // bare legs
    poly(ctx, [[-5.6,-6],[5.4,-6],[6.4,7],[3.6,8.6],[1,6.8],[-2.2,8.8],[-4.6,6.8],[-6.6,8]], h.armor(rb[0], rb[1])); // the robe, ragged at the hem
    ctx.fillStyle = 'rgba(40,36,32,.28)'; for (let i = 0; i < 5; i++) ell(ctx, -3 + hash(i, 61)*6, -2 + hash(i, 62)*8, 1.2, .8, 'rgba(40,36,32,.3)'); // ash on it
    ctx.fillStyle = '#5a2a1e'; ctx.fillRect(-5.8, 1, 11.6, 1.2); // a cord belt
    ctx.fillStyle = rb[0]; ctx.fillRect(-7.4, -4, 2, 6.4); ell(ctx, -6.4, 2.6, 1.1, 1.1, sk); B2F.line(ctx, '#b8b2a6', .9, [[-6.4, 3], [-8.6, 8.4]]); B2F.line(ctx, '#3a2a1a', 1.2, [[-6.2, 2.4], [-6.6, 3.6]]); // a long knife, low
    ctx.fillStyle = rb[0]; ctx.save(); ctx.translate(5.4, -4.6); ctx.rotate(-2.4); ctx.fillRect(-1.1, 0, 2.2, 7.4); ell(ctx, 0, 7.6, 1.1, 1.1, sk); ctx.restore(); // the arm up
    const tx = 10.2, ty = -10.2; B2F.line(ctx, '#4a3420', 1.3, [[9.4, -7.4], [11, -15.4]]); ell(ctx, 11.1, -15.8, 1.3, .9, '#2a1a10'); // the torch: a stave, rag wound at the head
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, tx + 1, ty - 7, 9, '#ff8a30', .38*fl); ctx.globalCompositeOperation = 'source-over';
    poly(ctx, [[9.6, -16], [10.4, -19.4*fl - 1], [11, -17.4], [11.8, -21*fl], [12.6, -16]], 'rgba(255,140,50,.95)'); poly(ctx, [[10.4, -16], [11.1, -18.6*fl], [11.8, -16]], 'rgba(255,230,150,.95)');
    if (!o.still) for (let i = 0; i < 2; i++) { const k = ((t/700 + i/2 + (o.phase || 0)*.3) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(11 + Math.sin(i*3 + t/300)*1.4, -20 - k*7, .7, .7); } // sparks
    h.head(sk, 4, -11.2); h.look('rgba(16,8,4,.95)', -11.6); ctx.fillStyle = 'rgba(255,236,200,.5)'; ctx.fillRect(-.9, -11.6, .6, .4); ctx.fillRect(2, -11.6, .6, .4); // shaved; eyes wide and catching the flame
    ctx.fillStyle = 'rgba(30,20,14,.35)'; ctx.beginPath(); ctx.arc(0, -12.2, 4.2, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#7a2a1e'; ctx.fillRect(-4.2, -13.4, 8.4, 1.3); poly(ctx, [[-4.2,-13.4],[-6.8,-11.4],[-6.2,-10.4],[-3.8,-12.2]], '#6a2418'); // a stubble scalp, a red band, its ends
    ctx.fillStyle = 'rgba(20,12,8,.4)'; ctx.fillRect(-2.4, -8.2, 5.6, 1.4); // a thin young beard
    ctx.restore(); },
});
/* the engine's foes wear them (100 borrowed Book Four's runner until this file) */
if (typeof FOES !== 'undefined') { if (FOES.b6_rebel) FOES.b6_rebel.kind = 'b6_rebel'; if (FOES.b6_fanatic) FOES.b6_fanatic.kind = 'b6_fanatic'; }

/* the rest of the rebels and the Odhan's bandits (added on the lead's ask): the archer and the captain share the rebel's body (b61Rebel);
   the bandit is his own, rougher thing */
function b61Rebel(ctx, h, t, o, kind){ ctx.save(); const chief = kind === 'chief';
  const rb = chief ? ['#7a2e22', '#2a0e0a'] : b2Pick(o, [['#a68a62', '#3e2c18'], ['#8a7252', '#2e2216'], ['#b49a72', '#4a3820'], ['#7a6a52', '#2a2018']]),
    wr = chief ? '#e0d4b8' : b2Pick(o, ['#2a2422', '#5a4a3a', '#3a2a22', '#6a2a1e']), sk = b2Pick(o, ['#7a5438', '#8a6244', '#6a4a32']), sa = chief ? '#c9a35a' : b2Pick(o, ['#6a2a1e', '#3a3a2a', '#5a4020']);
  const br = o.still ? 0 : Math.sin(t/380 + (o.phase || 0)*1.3)*.5;
  if (chief) B2F.grow(ctx, 1.12, 1.08);
  if (kind === 'bow') { ctx.fillStyle = '#4a3420'; ctx.fillRect(-7.4, -7, 2.6, 9); for (let i = 0; i < 3; i++) { B2F.line(ctx, '#6a5434', .5, [[-6.8 + i*.8, -7], [-7.4 + i*.8, -10.4]]); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-7.8 + i*.8, -11.4, .9, 1.2); } } // the quiver, behind
  ctx.fillStyle = sk; ctx.fillRect(-4.4, 8.4, 3.2, 3.4); ctx.fillRect(1.2, 8.4, 3.2, 3.4); ctx.fillStyle = chief ? '#3a2a1a' : '#2a1c10'; ctx.fillRect(-4.6, chief ? 9 : 11.6, 3.6, chief ? 4 : 1.4); ctx.fillRect(1, chief ? 9 : 11.6, 3.6, chief ? 4 : 1.4); // sandals; the captain's boots
  poly(ctx, [[-6.2,-6],[6,-6],[7.4,9],[2,8.4],[-2,9],[-7.6,9.4]], h.armor(rb[0], rb[1]));
  ctx.fillStyle = 'rgba(255,236,200,.13)'; ctx.fillRect(-5.8, -5.4, 1.6, 13); ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(-2, -3); ctx.lineTo(-3.4, 8.6); ctx.moveTo(2.6, -3); ctx.lineTo(3.4, 8.4); ctx.stroke();
  if (chief) { ctx.fillStyle = 'rgba(170,170,176,.7)'; for (let r = 0; r < 4; r++) for (let i = 0; i < 5; i++) ctx.fillRect(-4.6 + i*2 + (r % 2)*.8, -5.2 + r*1.5, 1.2, .8); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-.5, -6, 1, 15); } // mail at the breast, the coat open over it
  ctx.fillStyle = sa; ctx.fillRect(-6.6, 1.2, 13, 1.8); if (!chief) ctx.fillRect(-3.6, 3, 1.4, 3.4);
  if (kind === 'bow') { ctx.fillStyle = rb[0]; ctx.fillRect(-7.4, -4, 2.2, 5.4); ell(ctx, -6.3, 1.4, 1.1, 1.1, sk); ctx.fillStyle = rb[0]; ctx.fillRect(5.4, -4.6, 2.2, 5); ell(ctx, 6.6, .6, 1.1, 1.1, sk);
    B2F.bow(ctx, 8.4, -11.4, 6.6); B2F.line(ctx, '#d8ccb0', .55, [[6.6, -2.4], [11.6, -2.4]]); } // the horn bow, an arrow on the string
  else { ctx.beginPath(); ctx.arc(-7.6, -.4 + br, chief ? 5.8 : 4.6, 0, 7); ctx.fillStyle = chief ? h.armor('#8a3a2a', '#2a0e08') : h.armor('#a08058', '#3a2814'); ctx.fill(); ctx.strokeStyle = chief ? '#8a7a5a' : '#1a120a'; ctx.lineWidth = chief ? 1.2 : .9; ctx.stroke(); ell(ctx, -7.6, -.4 + br, chief ? 1.8 : 1.2, chief ? 1.8 : 1.2, chief ? '#c9a35a' : '#8a7a5a'); // the captain's round shield, a brass boss
    ctx.fillStyle = rb[0]; ctx.fillRect(5.4, -4.4, 2.2, 5.4); ell(ctx, 6.6, 1.4, 1.1, 1.1, sk); ctx.save(); ctx.translate(0, br); B2F.curved(ctx, chief ? '#e4dccc' : '#cfc6b2', chief ? 1.15 : 1.05); ctx.restore(); }
  h.head(sk, 4.4, -11.2);
  if (chief) { h.look('rgba(16,8,4,.92)', -11.6); poly(ctx, [[-3.6,-9.4],[4.4,-9.4],[4,-6.4],[1.6,-4.6],[-1.4,-5],[-3.4,-7]], '#1a120c'); // a black beard, cut square
    ctx.fillStyle = wr; ctx.beginPath(); ctx.arc(0, -12.6, 5.6, Math.PI*.9, Math.PI*2.1); ctx.fill(); ctx.fillRect(-5.6, -13, 11.2, 2.2); ctx.fillStyle = 'rgba(120,100,70,.4)'; for (let i = 0; i < 3; i++) ctx.fillRect(-5 + i*.6, -15.6 + i*1.4, 10, .5); // a wound head-cloth, pale
    poly(ctx, [[-5.4,-11],[-8.8,-6],[-7.6,-3.6],[-4.6,-8.6]], shade(wr, -.25)); ell(ctx, 1.4, -14.6, .9, .9, '#c9a35a'); } // its tail; a brass pin
  else { ctx.fillStyle = wr; ctx.beginPath(); ctx.arc(0, -11.8, 5.3, Math.PI*.92, Math.PI*2.08); ctx.fill(); ctx.fillRect(-5.3, -12.2, 10.6, 3);
    poly(ctx, [[-5,-10],[5.2,-10],[4.8,-6],[2.6,-4.6],[-3,-4.6],[-5.2,-6.4]], wr); poly(ctx, [[-4.8,-9.6],[-8.4,-6.4],[-7.6,-4],[-4.4,-6.8]], shade(wr, -.2));
    ctx.fillStyle = sk; ctx.fillRect(-2.6, -12.4, 6.2, 2); h.look('rgba(16,8,4,.92)', -11.8); }
  ctx.fillStyle = 'rgba(255,240,210,.12)'; ctx.fillRect(-4.6, -15.4, 3, .8);
  ctx.restore(); }
Object.assign(FIGX, {
  /* a rebel archer: the rebel's robes and face-wrap, a horn bow with an arrow on the string, a quiver on the back */
  b6_rebelbow(ctx, h, t, o){ b61Rebel(ctx, h, t, o, 'bow'); },
  /* a rebel captain: bigger; a red coat open over mail, a pale head-cloth with a brass pin, a square black beard, boots, a red round shield
     with a brass boss and the good tulwar */
  b6_rebelchief(ctx, h, t, o){ b61Rebel(ctx, h, t, o, 'chief'); },
  /* a plague-road bandit of the Odhan: no army's colours; a patched hooded cloak over bare arms, a scavenged iron cap on one in three, a
     dirty scarf, a waterskin, a heavy-bladed hatchet, and a stoop. Rougher and greyer than the rebels */
  b6_bandit(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, .97); const cl = b2Pick(o, [['#5a5046', '#1e1a16'], ['#6a5a44', '#241c12'], ['#4a463e', '#181612']]), sk = b2Pick(o, ['#8a6244', '#6a4a32', '#9a7454']), cap = b2Pick(o, [1, 0, 0]),
      sw = o.still ? 0 : Math.sin(t/340 + (o.phase || 0)*1.5)*.6;
    ctx.translate(0, 13); ctx.rotate(.06); ctx.translate(0, -13); // a stoop
    h.legs('#3a3026'); ctx.fillStyle = '#5a4a36'; ctx.fillRect(-4.8, 6, 3.8, 1.2); ctx.fillRect(1, 7.4, 3.8, 1.2); // rag-wrapped legs
    poly(ctx, [[-6.6,-6],[6.2,-6],[7.6,7.6],[4,8.6],[1.4,7],[-2,8.8],[-5,7.2],[-8,8.4]], h.armor(cl[0], cl[1])); // the cloak, torn at the hem
    ctx.fillStyle = 'rgba(140,110,70,.35)'; ctx.fillRect(-4, -1, 3, 3); ctx.fillRect(2, 3.4, 2.6, 2.4); ctx.strokeStyle = 'rgba(20,14,8,.5)'; ctx.lineWidth = .35; ctx.strokeRect(-4, -1, 3, 3); ctx.strokeRect(2, 3.4, 2.6, 2.4); // patches
    ctx.fillStyle = '#2a1e12'; ctx.fillRect(-6.2, 1.6, 12.4, 1.2); // a rope belt
    ell(ctx, -5.4, 5, 2, 2.8, '#6a4a2a'); ctx.fillStyle = 'rgba(255,230,190,.18)'; ctx.fillRect(-6.6, 3.4, .8, 3); // a waterskin at the hip
    ctx.fillStyle = sk; ctx.fillRect(-8, -4.4, 2.2, 6.4); ell(ctx, -6.9, 2, 1.2, 1.2, sk); // bare arms
    ctx.fillStyle = sk; ctx.save(); ctx.translate(6, -4.4); ctx.rotate(-.5 + sw*.3); ctx.fillRect(-1.1, 0, 2.4, 6.6); ell(ctx, .1, 6.8, 1.2, 1.2, shade(sk, -.1));
    B2F.line(ctx, '#4a3420', 1.3, [[.1, 8.6], [.1, -4]]); poly(ctx, [[.1, -4.6], [4, -5.6], [4.6, -1.6], [.1, -1.6]], '#8a8478'); ctx.fillStyle = 'rgba(255,250,240,.4)'; ctx.fillRect(3.8, -5.2, .6, 3.4); ctx.restore(); // the hatchet, raised
    h.head(sk, 4.3, -10.8); h.look('rgba(16,8,4,.92)', -11.2);
    poly(ctx, [[-4.6,-9.6],[4.6,-9.6],[4.2,-6],[2.4,-5],[-2.8,-5],[-4.6,-6.4]], '#7a6a52'); ctx.fillStyle = 'rgba(40,30,20,.3)'; ctx.fillRect(-4, -7.6, 8, .6); // a dirty scarf over the mouth
    if (cap) { ctx.beginPath(); ctx.arc(0, -12, 5.2, Math.PI, 0); ctx.fillStyle = '#4a4640'; ctx.fill(); ctx.fillStyle = '#3a3630'; ctx.fillRect(-5.8, -12.4, 11.6, 1.4); ctx.fillStyle = 'rgba(140,60,30,.45)'; ctx.fillRect(1, -15, 2.4, 1.6); } // a dead soldier's iron cap, rusting
    else { poly(ctx, [[-6.4,-4],[-5,-15],[0,-17.6],[5,-15],[6.4,-4],[4.4,-9.6],[4,-13.4],[-4,-13.4],[-4.4,-9.6]], shade(cl[0], -.08)); } // the hood up
    ctx.restore(); },
});
if (typeof FOES !== 'undefined') ['b6_rebelbow', 'b6_rebelchief', 'b6_bandit'].forEach(k => { if (FOES[k]) FOES[k].kind = k; });

/* ---------------- the bust ---------------- */
/* Mehet: thirty-one, a narrow watchful face, burnt brown, close black hair, a few days' beard; the quilted coat of the potters' street
   in faded madder and dust, the dark indigo scarf pulled down round his throat for once, its end over the shoulder; the sling's cords
   over the other shoulder, and the ring of keys to doors that are no longer there, held up a little in his left hand */
POR.mehet = function(ctx){ const F = {cy:-76, w:11.8, h:20, jaw:.78, chin:4.6, skin:'#94704e', iris:'#20140a', lip:'#7a4a38', browCol:'#0e0806', browW:1.6, arch:.5, browL:.2, rim:'#e0a060', rimA:.22, nose:1.2, look:.45, smileL:-.25, smileR:-.05, mouthW:3.7, age:.2, bags:.45, open:.86};
  PR.neck(ctx, F, 7.2);
  const B = BP.body(ctx, F, {wide:32, drop:5, trap:2, nx:10.6, ny:F.cy + 15, cb:-44, c1:'#a87e58', c2:'#2e1e12'});
  ctx.save(); B.path(); ctx.clip();
  BP.quilt(ctx, -40, 40, -50, 4, 5.4, 'rgba(40,24,12,.55)'); // the quilting
  ctx.fillStyle = 'rgba(150,60,40,.16)'; ctx.fillRect(-40, -50, 80, 56); // the madder, nearly gone
  PR.stroke(ctx, 'rgba(20,12,6,.6)', .8, () => { ctx.moveTo(2, -44); ctx.lineTo(4, 4); }); PR.stroke(ctx, 'rgba(255,236,200,.25)', .5, () => { ctx.moveTo(.8, -44); ctx.lineTo(2.8, 4); }); // the coat's front edge
  for (let i = 0; i < 12; i++) { const r = PR.rng(i + 210); PR.soft(ctx, -30 + r()*60, -40 + r()*42, 2 + r()*4, 1.4 + r()*2.4, '#d0b48a', .13); } // dust
  PR.soft(ctx, 22, -18, 16, 14, '#000000', .45); PR.soft(ctx, -20, -36, 12, 7, '#ffe0b0', .1);
  ctx.restore(); BP.light(ctx, F, B, false);
  // the sling's cords over the right shoulder, the cup hanging behind
  PR.stroke(ctx, '#4a3820', 1.1, () => { ctx.moveTo(14, -48); ctx.quadraticCurveTo(22, -30, 30, -6); }); PR.stroke(ctx, '#6a5434', .7, () => { ctx.moveTo(12, -48); ctx.quadraticCurveTo(19, -30, 26, -4); });
  // the scarf wound round the throat, the end down over the left shoulder
  BP.collar(ctx, F, '#4a5470', '#141826', 'rgba(10,12,22,.55)', {style:'wrap', sw:26, sy:-40});
  ctx.beginPath(); ctx.moveTo(-12, -50); ctx.bezierCurveTo(-18, -44, -24, -30, -22, -8); ctx.lineTo(-13, -10); ctx.bezierCurveTo(-14, -28, -10, -40, -5, -46); ctx.closePath(); ctx.fillStyle = PR.lit(ctx, '#4e5874', '#161a28', -24, -6); ctx.fill();
  PR.stroke(ctx, 'rgba(10,12,22,.5)', .6, () => { ctx.moveTo(-15, -44); ctx.quadraticCurveTo(-19, -30, -18, -12); }); PR.strands(ctx, 9, ['rgba(120,130,160,.6)', 'rgba(40,46,66,.8)'], .5, 221, (i, r) => { const x = -22 + i, y = -8 - i*.2; return [x, y, x + (r() - .5), y + 2, x + (r() - .5)*1.4, y + 4 + r()*2]; }); // its fringe
  F.under = (ctx, F) => { PR.dots(ctx, F, 70, 'rgba(18,10,6,.38)', .5, [5, 19]); PR.soft(ctx, 8, F.cy + 6, 4, 4, '#140806', .25); };
  PR.face(ctx, F);
  // close black hair, cut short with a knife
  BP.hair(ctx, F, {c:['#3a302a', '#141010', '#050404'], v:2.8, wx:1.2, hl:13, ey:-2, n:80, sw:.45, seed:233, sh:'#c0a080', shA:.18});
  // the ring of keys, held up in his left hand: an iron ring, five old keys of iron and bronze
  ctx.save(); ctx.translate(-30, -14);
  ell(ctx, 0, 8, 6, 5.4, PR.lin(ctx, -6, 0, 6, 0, [[0, '#b08a68'], [.6, '#7a5638'], [1, '#2a1a10']])); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { ctx.ellipse(0, 8, 6, 5.4, 0, 0, 7); }); // the fist
  ctx.strokeStyle = PR.lin(ctx, -6, 0, 6, 0, [[0, '#c8c0b0'], [.5, '#6a645a'], [1, '#222018']]); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.ellipse(0, -2, 5.4, 4.4, 0, 0, 7); ctx.stroke();
  [[-4, -1, .5, '#8a7a5a'], [-1.6, 2, .15, '#b08a48'], [1, 2.4, -.1, '#7a7268'], [3.4, 1, -.5, '#a07a3a'], [4.6, -2.6, -.9, '#6a665e']].forEach(([x, y, a, c]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a);
    ctx.strokeStyle = c; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 1.2, 1.3, 0, 7); ctx.stroke(); ctx.fillStyle = c; ctx.fillRect(-.45, 2.4, .9, 7); ctx.fillRect(-.45, 7.4, 2.2, .9); ctx.fillRect(-.45, 9, 1.6, .9);
    PR.stroke(ctx, 'rgba(255,240,210,.45)', .3, () => { ctx.moveTo(-.3, 2.6); ctx.lineTo(-.3, 9); }); ctx.restore(); });
  ctx.restore();
  return F; };

/* ---------------- backdrops ---------------- */
/* a scrub bush of the Odhan: a low dark tangle, a few twigs over the top */
function b61Bush(x, bx, by, s, col){ x.fillStyle = col; for (let i = 0; i < 4; i++) { x.beginPath(); x.ellipse(bx + (i - 1.5)*3*s, by - 1.6*s - (i % 2)*1.2*s, 3.4*s, 2.2*s, 0, 0, 7); x.fill(); }
  x.strokeStyle = col; x.lineWidth = Math.max(.4, .4*s); x.beginPath(); for (let i = 0; i < 5; i++) { const a = -2.4 + i*.4; x.moveTo(bx, by - 2*s); x.lineTo(bx + Math.cos(a)*7*s, by - 2*s + Math.sin(a)*6*s); } x.stroke(); }
/* a picket horse in silhouette, head down or up */
function b61Horse(ctx, hx, hy, s, col, up){ ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(hx, hy - 10*s, 8.4*s, 3.8*s, 0, 0, 7); ctx.fill();
  [[-6.4, 0], [-4.6, .4], [4.6, 0], [6.4, .4]].forEach(([dx, k]) => ctx.fillRect(hx + dx*s - .7*s, hy - 8*s, 1.4*s, 8*s + k*s));
  poly(ctx, up ? [[hx + 5*s, hy - 12.4*s], [hx + 8.6*s, hy - 19*s], [hx + 9.6*s, hy - 21*s], [hx + 13.6*s, hy - 18.6*s], [hx + 13*s, hy - 17*s], [hx + 10.4*s, hy - 17.4*s], [hx + 8.6*s, hy - 9*s]]
    : [[hx + 5*s, hy - 12.6*s], [hx + 9.4*s, hy - 11*s], [hx + 12.4*s, hy - 4.6*s], [hx + 13.4*s, hy - 2*s], [hx + 11*s, hy - 1.4*s], [hx + 9.6*s, hy - 4.6*s], [hx + 7*s, hy - 8*s]], col); // neck and head
  if (up) poly(ctx, [[hx + 9.6*s, hy - 21*s], [hx + 9.8*s, hy - 23*s], [hx + 10.8*s, hy - 21*s]], col); // an ear
  ctx.beginPath(); ctx.moveTo(hx - 8*s, hy - 11*s); ctx.quadraticCurveTo(hx - 11*s, hy - 8*s, hx - 10*s, hy - 3*s); ctx.lineWidth = 1.4*s; ctx.strokeStyle = col; ctx.stroke(); } // the tail

/* the Fourteenth's first night camp on the Lato Odhan (100's caption; the Deck's table, B6DECK[1]): stars over flat scrub, a far low line
   of hills, and on the horizon ahead a dark long shape with three faint lights in it, the old city waiting; cook-fires in a long line
   across the scrub, the tents behind them, the picket line of horses; the Third's fire near, the squad round it */
SCENEX.b6_odhan_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b61:odhan', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#05070f'],[.7,'#141a2a'],[1,'#2a2228']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 110; i++) { x.fillStyle = `rgba(226,230,250,${(.1 + hash(i, 1101)*.55).toFixed(2)})`; const sz = hash(i, 1104) > .93 ? 1.4 : 1; x.fillRect(hash(i, 1102)*W, Math.pow(hash(i, 1103), 1.4)*hz*.9, sz, sz); }
    glow(x, W*.2, hz*.2, W*.18, '#6070a0', .05); // the milk of the sky
    x.fillStyle = '#0e0d12'; x.beginPath(); x.moveTo(0, hz + 1); for (let i = 0; i <= 30; i++) { const u = i/30; x.lineTo(u*W, hz - H*(.012 + .02*Math.sin(u*7.3) + .012*Math.sin(u*19))); } x.lineTo(W, hz + 1); x.closePath(); x.fill(); // far low hills
    // the city, far: a long low dark shape on the horizon with a tower or two; nothing more of it can be seen at night
    { const cx0 = W*.68, cx1 = W*.84, cb = hz - H*.008, wh = H*.022; x.fillStyle = '#09080b'; x.beginPath(); x.moveTo(cx0 - W*.02, cb + 1); x.lineTo(cx0, cb - wh);
      for (let i = 0, n = 18; i <= n; i++) { const u = lerp(cx0, cx1, i/n), tw = i % 5 === 2; x.lineTo(u, cb - wh - (tw ? H*.016 : (i % 2)*H*.003)); x.lineTo(u + (cx1 - cx0)/n*.6, cb - wh - (tw ? H*.016 : (i % 2)*H*.003)); x.lineTo(u + (cx1 - cx0)/n*.6, cb - wh); }
      x.lineTo(cx1, cb - wh); x.lineTo(cx1 + W*.02, cb + 1); x.closePath(); x.fill();
      x.fillStyle = 'rgba(120,96,80,.12)'; x.fillRect(cx0, cb - wh, cx1 - cx0, .8); } // the city, far: a wall and its towers against the stars, nothing more of it at night
    x.fillStyle = vgrad(x, hz, H, [[0,'#1a1714'],[.5,'#14110e'],[1,'#0a0807']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 70; i++) { const yy = hz + 2 + Math.pow(hash(i, 1106), 1.4)*(H - hz), d = (yy - hz)/(H - hz); b61Bush(x, hash(i, 1107)*W, yy, .25 + d*1.4, `rgba(${6 + Math.round(d*4)},${6 + Math.round(d*4)},${5 + Math.round(d*3)},.92)`); } // the scrub
    for (let i = 0; i < 14; i++) { const k = i/13, tx = W*(.03 + k*.94), ty = hz + H*(.03 + (1 - k)*.05) - 2, s = .55 + (1 - k)*.5; x.fillStyle = '#100e12'; x.beginPath(); x.moveTo(tx - 10*s, ty); x.lineTo(tx - 2*s, ty - 9*s); x.lineTo(tx + 8*s, ty); x.closePath(); x.fill(); x.fillStyle = 'rgba(80,70,60,.12)'; x.beginPath(); x.moveTo(tx - 10*s, ty); x.lineTo(tx - 2*s, ty - 9*s); x.lineTo(tx - 4*s, ty); x.closePath(); x.fill(); } // the tents, a long row
    x.strokeStyle = 'rgba(30,26,24,.9)'; x.lineWidth = .7; x.beginPath(); x.moveTo(W*.02, hz + H*.125); x.lineTo(W*.36, hz + H*.105); x.stroke(); // the picket line
  }), 0, 0, W, H);
  // the city's three lights, faint, and the camp's cook-fires in a long line
  ctx.globalCompositeOperation = 'lighter';
  [[.71, .7], [.76, .3], [.82, .55]].forEach(([u, a], i) => { const ff = mo ? .7 + .3*Math.sin(t/(900 + i*170) + i) : 1; glow(ctx, W*u, hz - H*.028, 5, '#ffa860', .3*a*ff); });
  for (let i = 0; i < 14; i++) { const k = i/13, fx = W*(.05 + k*.93), fy = hz + H*(.06 + (1 - k)*.06), ff = mo ? .78 + .22*Math.sin(t/(120 + i*13) + i*1.7) : 1, r = H*(.03 + (1 - k)*.05);
    glow(ctx, fx, fy, r*1.8, '#ff7a30', .17*ff); glow(ctx, fx, fy, 1.6 + (1 - k)*1.4, '#ffe0a0', .9*ff); }
  ctx.globalCompositeOperation = 'source-over';
  // the picket horses, small, one tossing its head now and then
  for (let i = 0; i < 6; i++) { const hx = W*(.05 + i*.055), hy = hz + H*(.15 - i*.004), s = .7 - i*.03, up = mo ? Math.sin(t/1700 + i*2.3) > .6 : i % 3 === 0; b61Horse(ctx, hx, hy, s, '#0c0a0a', up); }
  // the Third's fire, near: stones, flame, sparks; the squad round it
  const cx = W*.5, cy = H*.9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.42, '#ff8a3a', .32*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*14, cy + Math.sin(a)*4, 3, 2, '#3e3630'); }
  B2F.line(ctx, '#2a1a10', 1.6, [[cx - 9, cy + 1], [cx + 7, cy - 3]]); B2F.line(ctx, '#2a1a10', 1.6, [[cx + 9, cy + 1], [cx - 6, cy - 2]]); // scrub-root for wood
  poly(ctx, [[cx - 8, cy], [cx - 2, cy - 16*fl], [cx + 1, cy - 7], [cx + 4, cy - 13*fl], [cx + 8, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - 4, cy], [cx, cy - 9*fl], [cx + 4, cy]], 'rgba(255,230,150,.95)');
  if (mo) for (let i = 0; i < 6; i++) { const k = ((t/1400 + i/6) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*4 - k*6, cy - 10 - k*34, 1, 1); } // sparks, drifting west
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(26 + j*22), H*.97 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .78, .55); };

/* Y'Ghatan under the walls at dusk (100's caption): a smoke-red sky; the walls the colour of old bone across the whole width, crenellated,
   with square towers and the bones of older cities set in the courses; a thin smoke going up from inside; in front the siege lines
   dug in (a raw earth bank, stakes, the Fourteenth's tents and a standard), and the barrows of the Empire's dead along the road, two of
   them broken open and dark; the squad in the near files, small, looking up at it */
SCENEX.b6_ghatan_walls = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, wb = H*.5, wt = H*.3;
  ctx.drawImage(sceneLayer('b61:walls', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, wb, [[0,'#1a1014'],[.45,'#5a2418'],[.82,'#b0502a'],[1,'#d88a4a']]); x.fillRect(0, 0, W, wb + 2);
    glow(x, W*.32, wb - H*.04, W*.4, '#ffb060', .3); // the sun gone down behind the city
    for (let i = 0; i < 5; i++) { x.fillStyle = `rgba(40,20,18,${(.18 + hash(i, 1111)*.14).toFixed(2)})`; x.beginPath(); x.ellipse(hash(i, 1112)*W, H*(.08 + hash(i, 1113)*.14), W*(.14 + hash(i, 1114)*.16), H*(.012 + hash(i, 1115)*.016), 0, 0, 7); x.fill(); } // long smoke-stained cloud
    for (let i = 0; i < 3; i++) { const sx = W*(.4 + i*.17); for (let k = 0; k < 9; k++) { const kk = k/9, yy = wt - kk*H*.26, xx = sx - kk*W*.08 + Math.sin(kk*5 + i)*3; ell(x, xx, yy, 4 + kk*18, 3 + kk*8, `rgba(44,26,22,${(.28*(1 - kk)).toFixed(2)})`); } } // thin smoke going up from inside, leaning west
    // the walls: one bone-coloured line, crenellated, towers on it
    const crenel = W/46; x.fillStyle = vgrad(x, wt, wb, [[0,'#c8b08a'],[1,'#7a6248']]); x.beginPath(); x.moveTo(0, wb + 1); x.lineTo(0, wt);
    for (let u = 0; u < W; u += crenel*2) { x.lineTo(u, wt - crenel*.6); x.lineTo(u + crenel, wt - crenel*.6); x.lineTo(u + crenel, wt); x.lineTo(u + crenel*2, wt); } x.lineTo(W, wb + 1); x.closePath(); x.fill();
    [.08, .3, .56, .78, .96].forEach((u, i) => { const tw = W*.07, th = H*(.1 + (i % 2)*.03), tx = W*u - tw/2, ty = wt - th; x.fillStyle = vgrad(x, ty, wb, [[0,'#bca27c'],[1,'#6e5840']]); x.fillRect(tx, ty, tw, wb - ty);
      x.fillStyle = '#8a7458'; x.fillRect(tx - 2, ty - 3, tw + 4, 4); for (let k = 0; k < 4; k++) x.fillRect(tx - 2 + k*(tw + 4)/3.5, ty - 6, (tw + 4)/7, 3); x.fillStyle = 'rgba(30,18,12,.75)'; x.fillRect(tx + tw*.42, ty + th*.3, tw*.16, th*.22); // a slit, dark
      x.fillStyle = 'rgba(60,30,20,.22)'; x.fillRect(tx + tw*.6, ty, tw*.4, wb - ty); }); // the shadowed face, the light from the west
    x.fillStyle = 'rgba(255,200,140,.12)'; x.fillRect(0, wt, W, 2); // the wall-walk catching the last light
    // the bones of the older cities in the courses
    for (let i = 0; i < 60; i++) { const bx = hash(i, 1116)*W, by = wt + 4 + hash(i, 1117)*(wb - wt - 8); x.save(); x.globalAlpha = .4;
      if (hash(i, 1118) > .7) { ell(x, bx, by, 2.2, 2.5, '#ece0c8'); x.fillStyle = '#4a3424'; x.fillRect(bx - 1.2, by - .6, .9, .9); x.fillRect(bx + .4, by - .6, .9, .9); }
      else { x.translate(bx, by); x.rotate((hash(i, 1119) - .5)*.6); x.fillStyle = '#ece0c8'; x.fillRect(-3 - hash(i, 1120)*3, -.5, 6 + hash(i, 1120)*6, 1.1); } x.restore(); }
    x.strokeStyle = 'rgba(70,50,34,.25)'; x.lineWidth = .5; x.beginPath(); for (let y = wt + 6; y < wb; y += 6) { x.moveTo(0, y); x.lineTo(W, y); } x.stroke(); // the courses
    x.fillStyle = 'rgba(40,26,18,.5)'; x.fillRect(W*.43, wb - H*.08, W*.05, H*.08); x.beginPath(); x.arc(W*.455, wb - H*.08, W*.025, Math.PI, 0); x.fill(); // the gate, shut
    // the ground: the road out from the gate, the siege lines, the barrows
    x.fillStyle = vgrad(x, wb, H, [[0,'#6a5038'],[.4,'#4a3828'],[1,'#1e1610']]); x.fillRect(0, wb, W, H - wb);
    x.fillStyle = 'rgba(160,130,96,.28)'; x.beginPath(); x.moveTo(W*.44, wb); x.lineTo(W*.47, wb); x.lineTo(W*.66, H); x.lineTo(W*.36, H); x.closePath(); x.fill(); // the road
    // the barrows along the road: old grass-dark mounds, two broken open
    [[.2, .6, .1], [.31, .57, .07], [.6, .58, .08], [.74, .62, .11], [.12, .72, .13], [.88, .7, .12]].forEach(([u, v, r], i) => { const bx = W*u, by = H*v, rw = W*r;
      ell(x, bx, by, rw, rw*.22, '#3e2e20'); ell(x, bx - rw*.1, by - rw*.06, rw*.8, rw*.16, '#4e3a28'); ell(x, bx - rw*.3, by - rw*.1, rw*.35, rw*.05, 'rgba(255,200,140,.12)');
      if (i === 1 || i === 3) { ell(x, bx + rw*.1, by - rw*.04, rw*.22, rw*.07, '#120c08'); for (let k = 0; k < 4; k++) ell(x, bx + rw*(.4 + k*.1), by + rw*(.02 + (k % 2)*.04), rw*.06, rw*.03, '#6a5440'); } }); // dug into, the spoil thrown out
    // the siege lines: a raw earth bank across the field with stakes, tents behind it, a standard
    const by = H*.66; x.fillStyle = '#5a4430'; x.beginPath(); x.moveTo(0, by); for (let i = 0; i <= 24; i++) x.lineTo(i/24*W, by - H*(.012 + .008*Math.sin(i*1.7))); x.lineTo(W, by + H*.03); x.lineTo(0, by + H*.03); x.closePath(); x.fill();
    x.fillStyle = 'rgba(255,200,150,.16)'; x.fillRect(0, by - H*.016, W, 1.4);
    x.strokeStyle = '#2a1e14'; x.lineWidth = 1; x.beginPath(); for (let i = 0; i < 40; i++) { const sx = (i + .5)/40*W; if (Math.abs(sx - W*.5) < W*.06) continue; x.moveTo(sx, by - H*.01); x.lineTo(sx + 2.4, by - H*.045); } x.stroke(); // the stakes, slanted at the city
    for (let i = 0; i < 9; i++) { const tx = W*(.06 + i*.11), ty = H*.78 + (i % 2)*H*.02, s = 1 + (i % 3)*.15; x.fillStyle = i % 2 ? '#5a5a4a' : '#4a4c3e'; x.beginPath(); x.moveTo(tx - 11*s, ty); x.lineTo(tx - 1*s, ty - 10*s); x.lineTo(tx + 10*s, ty); x.closePath(); x.fill(); x.fillStyle = 'rgba(255,210,160,.14)'; x.beginPath(); x.moveTo(tx - 11*s, ty); x.lineTo(tx - 1*s, ty - 10*s); x.lineTo(tx - 3*s, ty); x.closePath(); x.fill(); } // the Fourteenth's tents, grey-green canvas
  }), 0, 0, W, H);
  const fx = W*.53, fy = H*.64, wv = mo ? Math.sin(t/500)*1.4 : 0; B2F.line(ctx, '#1e140c', 1.2, [[fx, fy], [fx, fy - H*.13]]); poly(ctx, [[fx, fy - H*.13], [fx + 13, fy - H*.125 + wv], [fx + 12, fy - H*.09 + wv*.6], [fx, fy - H*.095]], '#4a4c3a'); ell(ctx, fx + 6, fy - H*.11 + wv*.6, 2, 2, '#c8b890'); // the 9th's standard
  // the squad in the near files, small, looking at the walls
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.16 + i*Math.min(.075, .5/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .55, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] in the series' 200×150 item style (089g), on Book Six's smoke-umber ground ---------------- */
(function(){
  if (typeof ART === 'undefined') return;
  const O = 'stroke="#0b0806" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"';
  const sh = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#@sh)"/>`;
  const S = (d, fill, lit = '@lit') => `<path d="${d}" fill="${fill}"/><path d="${d}" fill="url(#${lit})"/><path d="${d}" fill="none" ${O}/>`;
  const ol = d => `<path d="${d}" fill="none" ${O}/>`;
  const lin = (id, stops, x2 = 1, y2 = 1) => `<linearGradient id="@${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  const BASE = `<radialGradient id="@bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#40291f"/><stop offset=".62" stop-color="#22150f"/><stop offset="1" stop-color="#100907"/></radialGradient>`
    + `<radialGradient id="@sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset=".55" stop-color="#000" stop-opacity=".32"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`
    + lin('lit', [[0, '#fff', .2], [.45, '#fff', 0], [.6, '#000', 0], [1, '#000', .42]])
    + lin('st', [[0, '#e9edf0'], [.35, '#a9b1b8'], [.7, '#69717a'], [1, '#353b42']], 0, 1)
    + lin('wd', [[0, '#9c7649'], [.5, '#6e4f2e'], [1, '#3c2916']], 0, 1)
    + lin('brs', [[0, '#f2d58f'], [.45, '#bb8e3e'], [1, '#634416']]);
  function put(key, label, defs, body){
    const P = key.replace(/[^a-z0-9]/g, '') + '-';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="${label.replace(/"/g, '&quot;')}"><defs>${BASE}${defs}</defs><rect width="200" height="150" fill="url(#@bg)"/>${body}</svg>`;
    ART['item/' + key] = svg.replace(/@/g, P);
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [200, 150];
  }

  /* the Odhan veil: a long head-and-face cloth of sand-grey cotton, folded over on itself, an indigo stripe along each edge, knotted
     fringes, and two small fired-clay weights sewn in at the corners so it hangs in a wind and turns a shot that is nearly spent */
  { const d = 'M30 70 Q60 52 96 58 Q130 64 168 46 L176 64 Q140 84 102 80 Q64 76 36 94 Z';
    const d2 = 'M44 92 Q74 78 104 84 Q136 90 166 70 L170 88 Q140 108 106 104 Q74 100 50 112 Z';
    put('b6_c1_odhanveil', 'The Odhan veil',
      lin('cl', [[0, '#d8ccb0'], [.5, '#b0a284'], [1, '#6e624c']], 0, 1) + lin('cl2', [[0, '#c4b698'], [.5, '#9c8e70'], [1, '#5a4e3a']], 0, 1),
      sh(102, 122, 72, 7)
      + S(d2, 'url(#@cl2)') + `<path d="M48 108 Q76 96 106 100 Q138 104 168 85" fill="none" stroke="#2e3a5a" stroke-width="2.6" stroke-opacity=".85"/>`
      + S(d, 'url(#@cl)') + `<path d="M33 76 Q62 60 96 64 Q130 70 170 52" fill="none" stroke="#2e3a5a" stroke-width="2.6" stroke-opacity=".85"/><path d="M35 90 Q64 72 100 76 Q136 80 174 60" fill="none" stroke="#2e3a5a" stroke-width="2.2" stroke-opacity=".75"/>`
      + `<path d="M60 64 Q70 72 66 84 M120 66 Q128 74 124 80 M90 60 Q96 70 92 78" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="3"/><path d="M50 66 Q80 56 104 62" fill="none" stroke="#fff6e0" stroke-opacity=".25" stroke-width="1.6"/>`
      + Array.from({length: 9}, (_, i) => { const x = 168 + i*1.1, y = 47 + i*2; return `<path d="M${x} ${y} l${7 + (i % 2)*2} ${-3 + (i % 3)}" stroke="#a89a7c" stroke-width="1" stroke-linecap="round"/>`; }).join('')
      + Array.from({length: 9}, (_, i) => { const x = 31 + i*.7, y = 71 + i*2.6; return `<path d="M${x} ${y} l${-7 - (i % 2)*2} ${2 + (i % 3)}" stroke="#a89a7c" stroke-width="1" stroke-linecap="round"/>`; }).join('')
      + `<circle cx="174" cy="66" r="4" fill="#a8603a" ${O}/><circle cx="173" cy="65" r="1.4" fill="#e09a6a" fill-opacity=".6"/><circle cx="37" cy="95" r="4" fill="#a8603a" ${O}/><circle cx="36" cy="94" r="1.4" fill="#e09a6a" fill-opacity=".6"/>`);
  }

  /* well rope: a coil of old hemp from an Odhan well, grey with years and dark where it was wet, an iron hook spliced into one end and a
     worn wooden toggle on the other */
  { let coil = ''; for (let i = 0; i < 6; i++) { const rx = 50 - i*3.4, ry = 22 - i*1.4, cy = 84 - i*3.2; coil += `<ellipse cx="96" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#2a2016" stroke-width="7.4"/><ellipse cx="96" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="url(#@rp)" stroke-width="5.6"/><ellipse cx="96" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#4a3a26" stroke-width="5.6" stroke-dasharray="2.2 2.6" stroke-opacity=".55"/>`; }
    put('b6_c1_wellrope', 'Well rope from the Odhan',
      lin('rp', [[0, '#d0c09a'], [.5, '#a08e6a'], [1, '#5e5038']], 0, 1),
      sh(100, 112, 64, 7) + coil
      + `<path d="M96 104 Q90 110 72 100" fill="none" stroke="#2a1e14" stroke-opacity=".4" stroke-width="6"/>`
      + `<path d="M140 84 Q156 92 160 108 Q162 118 170 120" fill="none" stroke="#2a2016" stroke-width="7.2" stroke-linecap="round"/><path d="M140 84 Q156 92 160 108 Q162 118 170 120" fill="none" stroke="url(#@rp)" stroke-width="5.4" stroke-linecap="round"/><path d="M140 84 Q156 92 160 108 Q162 118 170 120" fill="none" stroke="#4a3a26" stroke-width="5.4" stroke-dasharray="2.2 2.6" stroke-opacity=".55"/>`
      + `<path d="M150 100 Q156 104 158 110" fill="none" stroke="#3a2c1c" stroke-opacity=".5" stroke-width="5"/>` // wet-dark at the end that went down
      + `<rect x="166" y="114" width="8" height="10" rx="1.5" fill="#3a3632" ${O}/>`
      + S('M170 124 L170 132 Q170 142 160 142 Q151 142 151 133 L154 133 Q154 138 160 138 Q166 138 166 131 L166 124 Z', 'url(#@st)')
      + `<path d="M48 82 Q36 74 30 60" fill="none" stroke="#2a2016" stroke-width="7.2" stroke-linecap="round"/><path d="M48 82 Q36 74 30 60" fill="none" stroke="url(#@rp)" stroke-width="5.4" stroke-linecap="round"/>`
      + `<g transform="rotate(-28 28 54)">${S('M16 50 Q16 46 20 46 L36 46 Q40 46 40 50 L40 58 Q40 62 36 62 L20 62 Q16 62 16 58 Z', 'url(#@wd)')}<path d="M19 50 L37 50" stroke="#e8d0a0" stroke-opacity=".35" stroke-width="1.2"/></g>`
      + `<path d="M62 70 Q76 62 92 62" fill="none" stroke="#fff4dc" stroke-opacity=".18" stroke-width="2"/>`);
  }

  /* a rebel's tulwar: a broad curved blade widening to the point, a steel guard with short quillons, a grip bound in dark leather, a disc
     pommel, and a rag of the rebellion's faded green knotted at the hilt (Book Two's green, B2F.green) */
  { const blade = 'M58 104 Q100 82 138 54 Q160 36 178 22 Q176 40 160 56 Q134 82 64 112 Z';
    put('b6_c1_rebeltulwar', 'A rebel\'s tulwar',
      lin('gr', [[0, '#3a2418'], [.5, '#22140c'], [1, '#0e0806']]) + lin('rg', [[0, '#6a8a52'], [.6, '#3e5a30'], [1, '#1e2e18']]),
      sh(104, 126, 76, 6)
      + S(blade, 'url(#@st)') + `<path d="M62 106 Q104 84 140 58 Q160 42 176 25" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1"/><path d="M80 100 Q114 80 146 54" fill="none" stroke="#3a4048" stroke-opacity=".5" stroke-width="1.4"/>`
      + `<path d="M150 62 Q164 50 176 30" fill="none" stroke="#fff8e8" stroke-opacity=".4" stroke-width=".8"/>`
      + S('M50 98 L58 92 L74 114 L66 120 Z', 'url(#@st)') + `<circle cx="51" cy="97" r="2.2" fill="#a9b1b8" ${O}/><circle cx="72" cy="119" r="2.2" fill="#a9b1b8" ${O}/>`
      + S('M38 120 L58 106 L64 113 L44 128 Z', 'url(#@gr)') + `<path d="M42 122 L60 109 M44 125 L62 112 M40 118 L57 107" stroke="#5a3a24" stroke-width=".8" stroke-opacity=".7"/>`
      + `<circle cx="36" cy="127" r="7" fill="url(#@brs)" ${O}/><circle cx="34" cy="125" r="2.4" fill="#fff4cc" fill-opacity=".5"/>`
      + S('M56 108 Q50 116 44 132 L50 134 Q54 120 60 112 Z', 'url(#@rg)') + S('M60 110 Q66 120 64 138 L58 138 Q60 122 56 112 Z', 'url(#@rg)')
      + ol('M53 106 Q58 102 62 108 Q58 114 53 110 Z') + `<path d="M53 106 Q58 102 62 108 Q58 114 53 110 Z" fill="#4a6a3a"/>`);
  }
})();
