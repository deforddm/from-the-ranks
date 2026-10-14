/* ============ Book Three, Chapter 6 art: The Night Lift — the Black Moranth take the Host away by night ============ */
/* Figures (FIGX), the hidden entrenchments and the Maurik bank (TILEX), three backdrops (SCENEX) and the chapter's item pictures,
   drawn the way 60b/60d and Book Two draw: lantern low on the left, blue-black by night, a cold rim on the right. The lift is
   lantern-less on purpose, so the night here is starlight and chitin-sheen; the river is dawn mist and woodsmoke. The Condors stay
   far and dark: a shape, a wrong eye, nothing more. */

/* ---------------- figures: FIGX[kind](ctx, h, t, o), the same ~32px frame as 18/47b/60d ---------------- */
const B3C6 = {
  /* one condor wing, seen from the side: shoulder at the origin, reaching up (−y) L long; e = how far it is raised (1 up, −1 down,
     near 0 edge-on); the primaries spread into fingers at the end, the secondaries ragged along the trailing edge */
  wing(ctx, L, e, top, under, rim){ const s = Math.sign(e || 1) * Math.max(.16, Math.abs(e)); ctx.save(); ctx.scale(1, s);
    const fing = [[5.6, -L*1.02, 3.8], [2.6, -L*1.07, 1.4], [-.6, -L*1.06, -.8], [-3.8, -L*1.0, -3], [-6.8, -L*.9, -5]]; // five long fingered primaries: tip, and where each leaves the hand
    ctx.beginPath(); ctx.moveTo(3.6, 0); ctx.quadraticCurveTo(6.6, -L*.38, 5.2, -L*.7); // the leading edge, the wrist
    fing.forEach(([fx, fy, bx], i) => { const by = -L*.7 + i*L*.035; ctx.lineTo(bx + .9, by); ctx.lineTo(fx + .5, fy + .6); ctx.lineTo(fx - .4, fy); ctx.lineTo(bx - .7, by + .8); });
    ctx.quadraticCurveTo(-8.6, -L*.5, -8.4, -L*.32); for (let i=0;i<4;i++){ const yy = lerp(-L*.3, -L*.05, i/3); ctx.lineTo(-8.8 + i*.3, yy + 1.4); ctx.lineTo(-7.6 + i*.3, yy + 2.6); } // the secondaries, a little ragged
    ctx.lineTo(-5, 1.6); ctx.closePath(); ctx.fillStyle = s > 0 ? top : under; ctx.fill();
    ctx.strokeStyle = rim; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(3.6, 0); ctx.quadraticCurveTo(6.6, -L*.38, 5.2, -L*.7); ctx.stroke(); // light along the leading edge
    ctx.fillStyle = s > 0 ? 'rgba(200,192,180,.14)' : 'rgba(214,208,196,.24)'; ctx.beginPath(); ctx.moveTo(-6.4, -L*.06); ctx.quadraticCurveTo(-2, -L*.4, 4.4, -L*.66); ctx.lineTo(-1.6, -L*.68); ctx.quadraticCurveTo(-7.4, -L*.42, -8, -L*.1); ctx.fill(); // the pale band of the coverts
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = .5; ctx.beginPath(); fing.forEach(([fx, fy, bx]) => { ctx.moveTo(bx, -L*.64); ctx.lineTo(fx, fy + 1.4); }); ctx.stroke();
    ctx.restore(); },
  /* a little cold wrongness hanging about a thing: smoke that does not rise right */
  wisp(ctx, x, y, t, n, a){ for (let i=0;i<n;i++){ const k = ((t/2400 + i/n) % 1), r = 1.6 + k*3.4; ell(ctx, x - k*14 - i*.6, y - Math.sin(k*3 + i)*2.4 - k*2, r, r*.7, `rgba(40,20,48,${a*(1 - k)})`); } },
};
Object.assign(FIGX, {
  /* a demon-ridden Condor of the Domin: a carrion bird the size of a quorl and more, black-brown, a dirty ruff, a bare red-grey head and an
     ivory hook of a beak. The eyes are wrong — three to a side, cold as the Seer's light — and a smoke that is not smoke hangs off it.
     It flies: it hovers and beats slowly, its shadow left on the ground (unless o.air) */
  b3_c6_condor(ctx, h, t, o){ const st = !!o.still, ph = o.phase || 0, fl = st ? .7 : .15 + .78*Math.sin(t/330 + ph*2), hov = st ? -2 : Math.sin(t/760 + ph)*2.4 - 3, gl = st ? .8 : .7 + Math.sin(t/190 + ph)*.2;
    if (!o.air) ell(ctx, -2, 12.6, 20, 3, `rgba(0,0,0,${.22 - hov*.004})`); // its shadow, on the ground below it
    ctx.save(); ctx.translate(0, hov + 2); ctx.scale(1.3, 1.3); ctx.translate(0, 9); // huge: bigger than a quorl across the wings
    const top = h.armor('#2e241e', '#0a0806'), under = h.armor('#1e1814', '#060504');
    ctx.save(); ctx.translate(-1.4, -15.8); ctx.rotate(-.85 + (fl < 0 ? 1.2 : 0)); B3C6.wing(ctx, 28, fl, '#16110e', '#0e0b09', 'rgba(150,140,130,.25)'); ctx.restore(); // the far wing, behind
    // the tail, a dark fan
    poly(ctx, [[-10, -15], [-21, -17.6], [-22.4, -14.6], [-21.6, -11.6], [-10, -11.4]], '#120e0b'); ctx.strokeStyle = 'rgba(120,110,100,.25)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<4;i++){ ctx.moveTo(-11, -14 + i*.8); ctx.lineTo(-21.6, -16.4 + i*1.6); } ctx.stroke();
    // the talons, hung
    ctx.strokeStyle = '#6a625a'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(-2.4, -10.6); ctx.lineTo(-3.6, -5.4); ctx.moveTo(.6, -10.6); ctx.lineTo(-.2, -5.2); ctx.stroke();
    ctx.strokeStyle = '#2a2420'; ctx.lineWidth = .7; ctx.beginPath(); [[-3.6, -5.4], [-.2, -5.2]].forEach(([x, y]) => { ctx.moveTo(x, y); ctx.lineTo(x + 1.8, y + 1.2); ctx.moveTo(x, y); ctx.lineTo(x - 1.2, y + 1.6); ctx.moveTo(x, y); ctx.lineTo(x + .4, y + 2); }); ctx.stroke();
    // the body: heavy, hunched
    ctx.beginPath(); ctx.moveTo(-11, -16); ctx.quadraticCurveTo(-4, -21.4, 5.4, -18.6); ctx.quadraticCurveTo(9, -15, 6.4, -10.4); ctx.quadraticCurveTo(-2, -7.4, -11, -11); ctx.closePath(); ctx.fillStyle = top; ctx.fill();
    ctx.fillStyle = 'rgba(160,150,140,.14)'; ctx.beginPath(); ctx.moveTo(-9, -15.8); ctx.quadraticCurveTo(-3, -19.6, 4.6, -17.6); ctx.quadraticCurveTo(-2, -17.6, -9, -15.8); ctx.fill(); // sheen on the back
    // the ruff, dirty white and soft
    ell(ctx, 6.6, -16.6, 3.2, 3.6, '#8a847a', .3); ell(ctx, 6, -17.4, 2.2, 2.4, '#aaa498', .3); ctx.fillStyle = 'rgba(30,26,22,.35)'; ell(ctx, 7.6, -14.2, 1.8, 1.2, ctx.fillStyle);
    // the bare neck and head, red-grey, wrinkled; the hooked beak
    ctx.fillStyle = '#4e3634'; ctx.beginPath(); ctx.moveTo(7.6, -19); ctx.quadraticCurveTo(10, -22.4, 12.8, -21.8); ctx.lineTo(13.4, -19); ctx.quadraticCurveTo(11, -18.2, 9.4, -16.4); ctx.closePath(); ctx.fill();
    ell(ctx, 13.2, -20.6, 2.7, 2.1, '#5e403c'); ell(ctx, 12.6, -21.6, 1.6, .7, 'rgba(160,120,110,.25)'); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(10.4, -20.2, 1.6, .4); ctx.fillRect(11, -19.2, 1.4, .4); // wrinkles
    poly(ctx, [[15.2, -21.8], [18.6, -20.6], [19, -18.6], [17.8, -18.8], [17.6, -19.6], [15.2, -19.2]], '#d8ccb0'); ctx.fillStyle = '#4a3e30'; ctx.fillRect(15.4, -20.6, 1, .9); // the beak, its hook, the nostril
    // the eyes: too many, and wrong
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, 13.6, -21.2, 4.6, '#b8f0d8', .35*gl); ctx.restore();
    [[14.2, -21.6, .8], [12.6, -21.9, .55], [13.4, -20.4, .5]].forEach(([x, y, r]) => { ell(ctx, x, y, r, r, `rgba(220,255,236,${.75*gl + .2})`); ctx.fillStyle = '#0a0a08'; ctx.fillRect(x - .12, y - r*.8, .24, r*1.6); });
    B3C6.wisp(ctx, 10, -21.6, st ? 0 : t, 4, .3); // the demon's smoke, drifting back off it
    ctx.save(); ctx.translate(1.6, -16.4); ctx.rotate(-.55 + (fl < 0 ? 1.1 : 0)); B3C6.wing(ctx, 31, fl, top, under, 'rgba(200,190,176,.35)'); ctx.restore(); // the near wing
    if (!st) { ctx.save(); ctx.globalAlpha *= .5; B3C6.wisp(ctx, -8, -16 - fl*20, t + 900, 3, .45); ctx.restore(); } // off the wingtips too
    ctx.restore(); },

  /* Achievant Twist, commander of the Black Moranth: the same faceless black chitin, finer — the plates ridged and edged, a helm with a low
     crest and flared cheek-guards, a short cape cut from a quorl's shed wing (it takes the light like oil); a chitin blade at his side,
     his gauntlet resting on its hilt */
  b3_c6_twist(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1.1); const sw = o.still ? 0 : Math.sin(t/900 + (o.phase||0)), sh = (x0, y0, x1, y1, a = .38) => { ctx.strokeStyle = `rgba(120,165,175,${a})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); };
    // the cape: a quorl-wing, veined, translucent, with an oil-sheen moving on it
    ctx.save(); const cg = ctx.createLinearGradient(-8, -6, 4, 12); cg.addColorStop(0, 'rgba(36,40,52,.92)'); cg.addColorStop(1, 'rgba(110,130,160,.22)'); poly(ctx, [[-6.8, -6.4], [6.4, -6.4], [8.2 + sw*.4, 11.6], [-9.4 + sw*.6, 11.2]], cg);
    ctx.strokeStyle = 'rgba(170,200,220,.22)'; ctx.lineWidth = .5; ctx.beginPath(); [-6, -2.4, 1.4, 5].forEach((x, i) => { ctx.moveTo(x*.6, -6); ctx.lineTo(x*1.2 + sw*.5, 11.2); }); ctx.moveTo(-8, 4); ctx.lineTo(7.6, 3.4); ctx.stroke();
    ell(ctx, -3 + sw, 4, 3.4, 1.6, `rgba(${170 + Math.round(sw*50)},140,${210 - Math.round(sw*30)},.16)`); ctx.restore();
    h.legs('#08080a'); ctx.fillStyle = '#1e2024'; ctx.fillRect(-4.6, 7.6, 3.6, 1.2); ctx.fillRect(1, 7.6, 3.6, 1.2); ctx.fillRect(-4.6, 10.4, 3.6, .7); ctx.fillRect(1, 10.4, 3.6, .7); sh(-4.2, 5.8, -4.2, 12, .25); sh(1.4, 5.8, 1.4, 12, .25); // greaves, banded
    h.torso('#24262c', '#040405', 7.2);
    for (let i=0;i<4;i++){ ctx.fillStyle = 'rgba(0,0,0,.65)'; ctx.fillRect(-6.8 + i*.3, -3.2 + i*2.9, 13.6 - i*.6, .9); sh(-5.2 + i*.3, -4 + i*2.9, 4.6 - i*.3, -4 + i*2.9); } // segmented, as all of them are
    ctx.strokeStyle = 'rgba(150,190,200,.3)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(0, -5.6); ctx.lineTo(0, 6.4); ctx.stroke(); // a keel down the breastplate
    poly(ctx, [[-9.6,-7.6],[-4,-8.8],[-3.8,-3],[-8.6,-1.4],[-10.2,-4]], '#16171b'); poly(ctx, [[9.6,-7.6],[4,-8.8],[3.8,-3],[8.6,-1.4],[10.2,-4]], '#16171b'); sh(-9, -7, -4.4, -8.2, .5); sh(9, -7, 4.4, -8.2, .5); // the pauldrons, flared, edged
    ctx.fillStyle = '#0c0c0e'; ctx.fillRect(-5.6, 3.2, 11.2, 1.3); ell(ctx, 0, 3.8, 1.3, 1, '#3a3e48'); // a belt, a boss
    // the blade at his right hip, sheathed in chitin, and his gauntlet on the hilt
    ctx.save(); ctx.translate(5.6, 3.6); ctx.rotate(-.42); ctx.fillStyle = '#0e0f12'; ctx.fillRect(-.9, 0, 1.8, 10.4); sh(-.5, .6, -.5, 9.8, .3); ctx.fillStyle = '#2a2c32'; ctx.fillRect(-2.2, -.6, 4.4, 1.1); ctx.fillStyle = '#141418'; ctx.fillRect(-.6, -3.6, 1.2, 3); ctx.restore();
    ctx.fillStyle = '#16171b'; ctx.fillRect(6.4, -6, 2.8, 8.4); sh(7, -5.4, 7.2, 1.6, .3); ell(ctx, 7.6, 2.4, 1.8, 1.6, '#1e2026'); // the right arm down, the hand on it
    ctx.fillRect(-9.2, -6, 2.8, 8.6); ell(ctx, -7.8, 2.8, 1.7, 1.5, '#1a1b20'); // the left arm
    // the helm: faceless, a low crest, cheek-guards flaring like mandibles
    ctx.beginPath(); ctx.ellipse(0, -12, 5.3, 6.1, 0, 0, 7); ctx.fillStyle = h.armor('#30323a', '#050506'); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.85)'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(-4.6, -10.4); ctx.quadraticCurveTo(0, -8.8, 4.6, -10.4); ctx.stroke();
    poly(ctx, [[2.6, -9.4], [6.6, -8.2], [5.4, -5.4], [3, -6.6]], '#141519'); poly(ctx, [[-2.6, -9.4], [-6.4, -8.2], [-5.2, -5.4], [-3, -6.6]], '#101114'); sh(3, -9, 6.2, -8, .45);
    ctx.fillStyle = '#0e0f12'; ctx.beginPath(); ctx.moveTo(-4.6, -14.6); ctx.quadraticCurveTo(-2, -20.2, 2.6, -19.2); ctx.quadraticCurveTo(5.2, -18, 5, -14.8); ctx.quadraticCurveTo(1, -17.6, -4.6, -14.6); ctx.fill(); sh(-2, -19.4, 3, -18.8, .5); // the crest, a low ridge front to back
    ell(ctx, 1.8, -14.4, 1.8, 1, 'rgba(160,195,205,.24)'); sh(-2.5, -16.8, 2.8, -16.4);
    ctx.restore(); },

  /* a Pannion raider: lighter than a Beklite line soldier, out at night to burn what the enemy builds — a quilted coat gone the colour of
     mud, a leather cap with a nasal, the face wrapped to the eyes; a short curved sword, and a pitch-torch in the other hand */
  b3_c6_raider(ctx, h, t, o){ const c = b2Pick(o, [['#5a5240', '#221e14'], ['#4e4a3e', '#1c1a14'], ['#62563e', '#261e12']]), sk = b2Pick(o, ['#a07e62', '#8e6c52', '#9a7458']), fl = o.still ? 1 : .8 + Math.sin(t/90 + (o.phase||0)*3)*.12 + Math.sin(t/37)*.08;
    // the torch, in the off hand, held back and low
    B2F.line(ctx, '#3a2a18', 1.4, [[-7.4, 3], [-9.6, -7]]); ell(ctx, -9.8, -7.6, 1.3, 1.1, '#1a1008');
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, -10, -10, 8, '#ff8a30', .35*fl); ctx.restore();
    poly(ctx, [[-11.4, -8], [-10.6 - fl*.4, -12.6*fl], [-9.8, -10.2], [-9 + fl*.3, -13.8*fl], [-8.4, -8]], '#e8642a'); poly(ctx, [[-10.8, -8], [-10, -11*fl], [-9, -8]], '#ffc060');
    h.legs('#2a261c'); ctx.fillStyle = '#3a2e20'; ctx.fillRect(-4.6, 9.6, 3.6, 3.4); ctx.fillRect(1, 9.6, 3.6, 3.4); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<3;i++){ ctx.moveTo(-4.6, 10.2 + i); ctx.lineTo(-1, 10.6 + i); ctx.moveTo(1, 10.2 + i); ctx.lineTo(4.6, 10.6 + i); } ctx.stroke(); // wrapped shins
    poly(ctx, [[-6, -6], [6, -6], [6.8, 8.4], [-6.8, 8.4]], h.armor(c[0], c[1])); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = .6; ctx.beginPath(); for (let i=0;i<5;i++){ ctx.moveTo(-6 + i*.1, -3.6 + i*2.6); ctx.lineTo(6.2 + i*.1, -3.6 + i*2.6); } for (let i=0;i<4;i++){ ctx.moveTo(-3.6 + i*2.8, -6); ctx.lineTo(-3.8 + i*2.9, 8.4); } ctx.stroke(); // the quilting
    ctx.fillStyle = '#2a1e12'; ctx.fillRect(-6.4, 2.4, 12.8, 1.4); ctx.fillStyle = '#8a7a5a'; ctx.fillRect(-.8, 2.5, 1.6, 1.2); // a belt
    ell(ctx, -7, 2.4, 1.3, 1.3, sk); // the hand on the torch
    // the sword, short and curved, out
    ctx.strokeStyle = '#b8b4a8'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(7, 1.4); ctx.quadraticCurveTo(11.6, -1.6, 11.8, -8.6); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(7.6, .8); ctx.quadraticCurveTo(11.4, -2, 11.4, -8); ctx.stroke();
    ctx.fillStyle = '#4a3a22'; ctx.fillRect(5.6, 1, 2.4, 1); ell(ctx, 6.6, 3, 1.3, 1.3, sk);
    // the head: cap and nasal, the face wrapped to the eyes
    h.head(sk, 4.3, -11.2); poly(ctx, [[-4.2, -10.4], [4.4, -10.4], [4, -7], [1, -5.6], [-3.4, -6.6]], c[1]); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(-3.6, -10, 3, 1.2);
    h.look('rgba(20,12,8,.9)', -11.8);
    ctx.fillStyle = '#3a2c1c'; ctx.beginPath(); ctx.arc(0, -12.4, 4.9, Math.PI, 0); ctx.fill(); ctx.fillRect(-4.9, -13, 9.8, 1.2); ctx.fillStyle = '#5a4630'; ctx.fillRect(1.2, -13, 1, 3.4); ctx.fillStyle = 'rgba(255,240,210,.14)'; ctx.fillRect(-3.4, -16, 2.6, .9); // the cap, its nasal
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; glow(ctx, -5, -6, 9, '#ff7a2a', .12*fl); ctx.restore(); } // the torch on his own side
});

/* ---------------- ground: TILEX.b3_c6_mountain / _night — the hidden entrenchments in the mountains above Coral ----------------
   The Moranth dug in where nobody would look: grey granite under old moss, cedars cut and woven into screens over the trench mouths,
   fires sunk in pits behind hide so no light shows downhill, and the quorls roosting on the flat rocks between. Keys: '.' rock,
   ',' moss, '#' cliff (blocks), '=' cedar screen, 'T' trench mouth, 'F' shielded fire, 'q' quorl roost; anything else is rock with
   Book One's exit arrows. dark = night (the usual; the fires are hidden, so they light only their own pit). */
const b3c6MP = N => N ? {rock:'#252830', rockL:'#363b46', rockD:'#101217', moss:'#1c2622', mossL:'#2a3a30', lit:'150,170,210', crack:'rgba(0,0,0,.45)', lichen:'rgba(150,170,160,.16)', face:'#1a1c22', faceL:'#2c303a', ced:'#0e1a16', cedL:'#1a2c24', cedD:'#060c0a', post:'#14100c', hide:'#2a2018', hideL:'#3a2e22'}
                       : {rock:'#5e605c', rockL:'#80827c', rockD:'#3a3b36', moss:'#4a5a32', mossL:'#6a7c44', lit:'235,240,245', crack:'rgba(20,20,18,.45)', lichen:'rgba(200,196,140,.4)', face:'#4a4b48', faceL:'#6e706a', ced:'#22382a', cedL:'#3a5a3a', cedD:'#101c14', post:'#3a2a1a', hide:'#6a5038', hideL:'#8a6c4c'};
/* a cedar spray: a flat, drooping fan of scale-leaf, the way cut cedar lies */
function b3c6Spray(ctx, x, y, len, ang, c, cL){ ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len*.5, -len*.22, len, len*.06); ctx.quadraticCurveTo(len*.5, len*.2, 0, 0); ctx.fill();
  ctx.strokeStyle = cL; ctx.lineWidth = Math.max(.8, len*.03); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len*.5, -len*.04, len*.95, len*.05); for (let i=1;i<5;i++){ const k = i/5; ctx.moveTo(len*k, -len*.02*k); ctx.lineTo(len*(k + .1), -len*.12); ctx.moveTo(len*k, len*.0); ctx.lineTo(len*(k + .1), len*.12); } ctx.stroke(); ctx.restore(); }
function b3c6Mountain(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y), P = b3c6MP(N), fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const rock = () => { fill(shade(P.rock, (h - .5)*.05)); b2Mottle(ctx, x, y, T, N ? .035 : .08, N ? .24 : .18, P.lit, 1.4);
    ctx.strokeStyle = P.crack; ctx.lineWidth = Math.max(1, T*.022); for (let i=0;i<2;i++){ if (hash(x,y,i+5) < .35) continue; const sx = px + hash(x,y,i+6)*T, sy = py + hash(y,x,i+7)*T, a = hash(x,y,i+8)*3; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(a)*T*.22, sy + Math.sin(a)*T*.18); ctx.lineTo(sx + Math.cos(a + .6)*T*.38, sy + Math.sin(a + .6)*T*.3); ctx.stroke(); } // the granite's joints
    for (let i=0;i<3;i++){ if (hash(x,y,i+14) < .45) continue; const bx = px + hash(x,y,i+10)*T, by = py + hash(y,x,i+11)*T, r = T*(.04 + hash(x,y,i+12)*.08); ell(ctx, bx + r*.3, by + r*.5, r*1.1, r*.5, 'rgba(0,0,0,.28)'); ell(ctx, bx, by, r, r*.7, shade(P.rockL, (hash(x,y,i+13) - .5)*.1)); ctx.fillStyle = N ? 'rgba(150,170,210,.12)' : 'rgba(255,255,250,.22)'; ctx.fillRect(bx - r*.6, by - r*.5, r*.8, Math.max(1, r*.25)); } // loose stones
    ctx.fillStyle = P.lichen; for (let i=0;i<4;i++) ell(ctx, px + hash(x,y,i+20)*T, py + hash(y,x,i+21)*T, T*.03, T*.022, ctx.fillStyle); }; // lichen
  const moss = () => { rock(); b2Soft(ctx, px + T*.5, py + T*.5, T*.52, .9, N ? '28,40,34' : '74,92,50', .95); b2Soft(ctx, px + T*(.4 + h*.2), py + T*.45, T*.3, .8, N ? '34,48,40' : '96,116,62', .6);
    for (let i=0;i<14;i++){ const mx = px + T*(.12 + hash(x,y,i+30)*.76), my = py + T*(.12 + hash(y,x,i+31)*.76); ctx.fillStyle = i%3 ? P.moss : P.mossL; ctx.beginPath(); ctx.arc(mx, my, T*(.025 + hash(x,y,i+32)*.03), 0, 7); ctx.fill(); } }; // a cushion of it, knobbly
  if (ch === '#') { // a crag: the top lip mossed, then the face dropping away, jointed, a shadow at its foot
    fill(P.face); b2Mottle(ctx, x, y, T, N ? .03 : .06, .2, P.lit, 1.2);
    const lip = py + T*(.3 + (hash(x,y,3) - .5)*.08), up = !b2At(x, y-1, '#');
    if (up) { ctx.fillStyle = shade(P.rock, .02); ctx.fillRect(px, py, T, lip - py); b2Soft(ctx, px + T*.5, py + T*.12, T*.5, .4, N ? '28,40,34' : '74,92,50', .8); ctx.fillStyle = N ? 'rgba(150,170,210,.18)' : 'rgba(255,255,250,.3)'; ctx.fillRect(px, lip - Math.max(1, T*.03), T, Math.max(1, T*.03)); }
    const g = ctx.createLinearGradient(0, up ? lip : py, 0, py + T); g.addColorStop(0, P.faceL); g.addColorStop(1, P.face); ctx.fillStyle = g; ctx.fillRect(px, up ? lip : py, T, py + T - (up ? lip : py));
    ctx.strokeStyle = P.crack; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); for (let i=0;i<3;i++){ const cx = px + T*(.15 + i*.32 + (hash(x,y,i+40) - .5)*.12); ctx.moveTo(cx, up ? lip : py); ctx.lineTo(cx + T*(hash(x,y,i+41) - .5)*.12, py + T*(.6 + hash(x,y,i+42)*.3)); ctx.lineTo(cx + T*(hash(x,y,i+43) - .5)*.1, py + T); } ctx.stroke(); // vertical joints
    ctx.strokeStyle = N ? 'rgba(150,170,210,.1)' : 'rgba(255,255,250,.14)'; ctx.lineWidth = Math.max(1, T*.015); ctx.beginPath(); for (let i=0;i<2;i++){ const yy = py + T*(.55 + i*.22) + (hash(x,y,i+44) - .5)*T*.06; ctx.moveTo(px, yy); ctx.lineTo(px + T, yy + (hash(x,y,i+45) - .5)*T*.08); } ctx.stroke(); // the strata catching light
    if (!b2At(x, y+1, '#')) { const sg = ctx.createLinearGradient(0, py + T*.8, 0, py + T); sg.addColorStop(0, 'rgba(0,0,0,0)'); sg.addColorStop(1, 'rgba(0,0,0,.4)'); ctx.fillStyle = sg; ctx.fillRect(px, py + T*.8, T, T*.2); }
    return; }
  if (ch === ',') moss(); else rock();
  if (ch === '=') { // a cedar screen: boughs cut and woven on a frame of poles, hiding what is behind from anyone below
    ell(ctx, px + T*.56, py + T*.9, T*.5, T*.1, 'rgba(0,0,0,.4)');
    ctx.fillStyle = P.post; ctx.fillRect(px + T*.1, py + T*.12, T*.06, T*.8); ctx.fillRect(px + T*.84, py + T*.12, T*.06, T*.8); ctx.fillRect(px, py + T*.3, T, T*.04); ctx.fillRect(px, py + T*.62, T, T*.04);
    poly(ctx, [[px, py + T*.2], [px + T, py + T*.16], [px + T, py + T*.84], [px, py + T*.86]], P.cedD); // the mass of it
    for (let r=0;r<4;r++) for (let i=0;i<6;i++){ const sx = px + T*(-.22 + i*.22 + hash(x,y,r*6+i)*.06), sy = py + T*(.14 + r*.2 + hash(y,x,r*6+i)*.05); b3c6Spray(ctx, sx, sy, T*(.42 + hash(x,y,r*6+i+50)*.14), .25 + hash(x,y,r*6+i+60)*.45, r < 2 ? P.cedL : r === 2 ? P.ced : P.cedD, r < 2 ? (N ? 'rgba(90,120,100,.4)' : 'rgba(150,180,120,.55)') : 'rgba(0,0,0,.25)'); }
    ctx.fillStyle = N ? 'rgba(130,150,190,.08)' : 'rgba(255,250,220,.14)'; ctx.fillRect(px, py + T*.18, T*.5, T*.08); return; }
  if (ch === 'T') { // a trench mouth: a slot cut down into the rock, revetted with cedar logs, steps going down into the dark, a bough over half of it
    const x0 = px + T*.14, x1 = px + T*.86, y0 = py + T*.16, y1 = py + T*.92;
    ctx.fillStyle = P.rockD; ctx.fillRect(x0 - T*.04, y0 - T*.04, x1 - x0 + T*.08, y1 - y0 + T*.06);
    const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, N ? '#06070a' : '#141410'); g.addColorStop(1, N ? '#0e1014' : '#2a2a24'); ctx.fillStyle = g; ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    for (let i=0;i<4;i++){ const sy = y0 + (y1 - y0)*(.32 + i*.17); ctx.fillStyle = N ? 'rgba(60,64,74,.6)' : 'rgba(110,108,100,.7)'; ctx.fillRect(x0 + T*.08, sy, x1 - x0 - T*.16, T*.035); } // the steps, going down
    ctx.fillStyle = P.post; ctx.fillRect(x0, y0, T*.07, y1 - y0); ctx.fillRect(x1 - T*.07, y0, T*.07, y1 - y0); ctx.fillStyle = N ? '#2a2018' : '#6a5034'; ctx.fillRect(x0 - T*.04, y0 - T*.06, x1 - x0 + T*.08, T*.07); ctx.fillStyle = N ? 'rgba(150,170,210,.15)' : 'rgba(255,240,210,.3)'; ctx.fillRect(x0 - T*.04, y0 - T*.06, x1 - x0 + T*.08, Math.max(1, T*.015)); // the lintel log
    for (let i=0;i<4;i++) b3c6Spray(ctx, px + T*(.48 + i*.1), py + T*(.1 + i*.05), T*.46, .5 + i*.18, i%2 ? P.ced : P.cedL, 'rgba(0,0,0,.25)'); // a bough dragged over it
    return; }
  if (ch === 'F') { // a fire sunk in a pit, a hide stretched on stakes on the downhill side: no light shows to anyone below
    const cx = px + T*.5, cy = py + T*.6; ell(ctx, cx, cy + T*.04, T*.3, T*.15, N ? '#0a0a0c' : '#2a2824');
    for (let i=0;i<9;i++){ const a = i/9*6.283; ell(ctx, cx + Math.cos(a)*T*.3, cy + T*.04 + Math.sin(a)*T*.15, T*.06, T*.045, shade(P.rockL, (hash(x,y,i+70) - .5)*.2)); } // a ring of stones
    b2Flames(ctx, cx, cy + T*.02, T, .75);
    ctx.fillStyle = P.post; [[.14, .7], [.5, .82], [.86, .7]].forEach(([k, yy]) => ctx.fillRect(px + T*k - T*.022, py + T*(yy - .12), T*.044, T*.2)); // stakes on the downhill side
    ctx.fillStyle = P.hide; ctx.beginPath(); ctx.moveTo(px + T*.12, py + T*.62); ctx.quadraticCurveTo(px + T*.5, py + T*.9, px + T*.88, py + T*.62); ctx.lineTo(px + T*.88, py + T*.72); ctx.quadraticCurveTo(px + T*.5, py + T*1.0, px + T*.12, py + T*.72); ctx.closePath(); ctx.fill(); // the hide, a low curtain round the fire's front
    ctx.strokeStyle = 'rgba(255,150,70,.35)'; ctx.lineWidth = Math.max(1, T*.015); ctx.beginPath(); ctx.moveTo(px + T*.14, py + T*.62); ctx.quadraticCurveTo(px + T*.5, py + T*.89, px + T*.86, py + T*.62); ctx.stroke(); // lit only along its inner edge
    b2Firelit(ctx, x, y, T, N ? .16 : .06, 1.1); return; }
  if (ch === 'q') { // a quorl roost: a flat slab, a tether peg, and a quorl on it, wings folded down, resting
    ell(ctx, px + T*.5, py + T*.66, T*.44, T*.2, 'rgba(0,0,0,.35)'); ell(ctx, px + T*.5, py + T*.6, T*.42, T*.18, shade(P.rockL, -.04)); ctx.fillStyle = N ? 'rgba(150,170,210,.14)' : 'rgba(255,255,250,.25)'; ell(ctx, px + T*.42, py + T*.54, T*.26, T*.06, ctx.fillStyle);
    ctx.fillStyle = P.post; ctx.fillRect(px + T*.1, py + T*.5, T*.04, T*.2); B2F.line(ctx, N ? 'rgba(120,110,90,.5)' : 'rgba(150,130,90,.8)', Math.max(.8, T*.012), [[px + T*.12, py + T*.52], [px + T*.32, py + T*.56]]);
    drawFigure(ctx, 'quorl', px + T*(h > .5 ? .6 : .4), py + T*.5, T/78, 0, {still:true, air:true, dir: h > .5 ? 1 : -1});
    return; }
  if (ch !== '.' && ch !== ',') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .16 : .06, 1.2);
}
TILEX.b3_c6_mountain = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c6Mountain(ctx, ch, x, y, T, !!dark));
TILEX.b3_c6_mountain_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c6Mountain(ctx, ch, x, y, T, true));

/* ---------------- ground: TILEX.b3_c6_river — the Maurik bank, the barge camp at dawn ----------------
   Mud churned by four thousand boots, reed-beds, the river deep and brown and quick in its channel, shallows over gravel, logs
   stacked, fires, and the barges on their slips, half ribs and half planking. Keys: '.' mud, ',' reeds, '~' deep river (blocks),
   '-' shallows, 'b' barge under construction (blocks; neighbouring b tiles make one hull), 'l' logs, 'F' fire. dark = night. */
const b3c6RW = c => c === '~' || c === '-', b3c6RD = c => c === '~' ? 2 : c === '-' ? 1 : 0;
const b3c6RP = N => N ? {mud:'#26221e', mudL:'#3a342c', lit:'150,165,200', wetRGB:'8,8,10', reed:'#24301e', reedL:'#3a4a2c', head:'#2a2018', w0:'#2a2c2e', w1:'#1c2228', w2:'#0e141a', glint:'rgba(150,170,210,.22)', lip:'rgba(150,170,210,.18)', wood:'#2e2216', woodL:'#4a3824', woodD:'#120c08', end:'#5a4a34', mist:'150,165,200'}
                       : {mud:'#5a4a3c', mudL:'#7a6652', lit:'255,226,200', wetRGB:'40,30,22', reed:'#5e6a3a', reedL:'#8a9458', head:'#6a4a2a', w0:'#7a6a58', w1:'#5a5852', w2:'#3a4248', glint:'rgba(255,226,210,.4)', lip:'rgba(255,230,210,.35)', wood:'#7a5a3a', woodL:'#a8845a', woodD:'#3a2814', end:'#d0b48a', mist:'236,226,222'};
function b3c6Barge(ctx, x, y, T, N, P){ // find the run of b tiles this belongs to and draw one hull across it, this tile's part
  let x0 = x, x1 = x, y0 = y, y1 = y; while (b2At(x0 - 1, y, 'b')) x0--; while (b2At(x1 + 1, y, 'b')) x1++; while (b2At(x, y0 - 1, 'b')) y0--; while (b2At(x, y1 + 1, 'b')) y1++;
  const L = x0*T, R = (x1 + 1)*T, U = y0*T, D = (y1 + 1)*T, hz = (R - L) >= (D - U); ctx.save(); if (!hz) { ctx.translate(L + (R - L)/2, U + (D - U)/2); ctx.rotate(Math.PI/2); ctx.translate(-(L + (R - L)/2), -(U + (D - U)/2)); }
  const cx = (L + R)/2, cy = (U + D)/2, len = (hz ? R - L : D - U) - T*.16, wid = Math.min(T*1.2, (hz ? D - U : R - L) - T*.24), a = cx - len/2, b = cx + len/2, t0 = cy - wid/2, b0 = cy + wid/2;
  ell(ctx, cx + T*.1, b0 + T*.06, len*.52, T*.14, 'rgba(0,0,0,.4)'); // its shadow
  for (let i=0;i<3;i++){ const sx = lerp(a + T*.3, b - T*.6, i/2); ctx.fillStyle = P.woodD; ctx.fillRect(sx - T*.05, t0 - T*.16, T*.1, wid + T*.32); } // the trestles under it
  const bowL = T*.5; // a raked, blunt bow at the right end; a square transom at the left
  const hull = c => { c.beginPath(); c.moveTo(a, t0 + T*.04); c.lineTo(b - bowL, t0); c.quadraticCurveTo(b - T*.08, t0 + wid*.08, b, cy - wid*.18); c.lineTo(b, cy + wid*.18); c.quadraticCurveTo(b - T*.08, b0 - wid*.08, b - bowL, b0); c.lineTo(a, b0 - T*.04); c.closePath(); };
  hull(ctx); ctx.fillStyle = N ? '#1a140e' : '#4a3826'; ctx.fill(); // the floor inside, in shadow
  ctx.save(); hull(ctx); ctx.clip(); for (let yy = t0; yy < b0; yy += T*.16){ ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(a, yy, len, Math.max(1, T*.012)); } ctx.restore(); // the floor's seams
  const planked = a + len*.5; // planked from the stern, bare ribs at the bow
  for (let sx = a + T*.14; sx < b - T*.12; sx += T*.17){ const k = (sx - a)/len, inset = k > .72 ? (k - .72)/.28*wid*.2 : 0; // the ribs: frames standing up out of the hull, their tops showing past the gunwale
    ctx.fillStyle = P.woodD; ctx.fillRect(sx - T*.005, t0 - T*.1 + inset, T*.06, wid + T*.2 - inset*2); ctx.fillStyle = P.woodL; ctx.fillRect(sx, t0 - T*.1 + inset, T*.04, wid + T*.2 - inset*2); ctx.fillStyle = N ? 'rgba(150,165,200,.12)' : 'rgba(255,236,210,.3)'; ctx.fillRect(sx, t0 - T*.1 + inset, T*.04, T*.03); }
  ctx.save(); ctx.beginPath(); ctx.rect(a - T*.1, t0 - T*.2, planked - a + T*.1, wid + T*.4); ctx.clip(); hull(ctx); ctx.fillStyle = P.wood; ctx.fill(); hull(ctx); ctx.clip(); // the planking (strakes, lengthways), over the after half
  for (let yy = t0; yy < b0; yy += T*.1){ ctx.fillStyle = shade(P.wood, (hash(Math.round(yy), x0, 3) - .5)*.16); ctx.fillRect(a, yy, planked - a, T*.09); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(a, yy + T*.088, planked - a, Math.max(1, T*.012)); }
  ctx.fillStyle = 'rgba(0,0,0,.4)'; for (let yy = t0 + T*.05; yy < b0; yy += T*.1) ctx.fillRect(a + T*.3 + hash(Math.round(yy), 7)*T*.4, yy, Math.max(1, T*.015), T*.02); // treenails
  ctx.fillStyle = N ? 'rgba(150,165,200,.08)' : 'rgba(255,236,210,.18)'; ctx.fillRect(a, t0, planked - a, T*.08); ctx.restore();
  ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(planked - T*.02, t0, T*.04, wid); // the ragged edge of the planking
  ctx.fillStyle = P.wood; ctx.fillRect(a + T*.1, cy - T*.035, len - bowL, T*.07); ctx.fillStyle = P.woodL; ctx.fillRect(a + T*.1, cy - T*.035, len - bowL, Math.max(1, T*.018)); // the keelson down the middle
  hull(ctx); ctx.strokeStyle = P.woodL; ctx.lineWidth = Math.max(1, T*.035); ctx.stroke(); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = Math.max(1, T*.012); ctx.stroke(); // the gunwale
  ctx.fillStyle = P.end; ctx.fillRect(planked + T*.2, b0 + T*.14, T*.6, T*.05); ctx.fillStyle = N ? '#3a3a3e' : '#8a8a8e'; ctx.fillRect(planked + T*.84, b0 + T*.11, T*.12, T*.1); // a plank laid by, an adze
  ctx.restore(); }
function b3c6River(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y), P = b3c6RP(N), fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const wcol = v => v <= 1 ? b2Mix(P.w0, P.w1, v) : b2Mix(P.w1, P.w2, v - 1);
  const mud = () => { fill(shade(P.mud, (h - .5)*.05)); b2Mottle(ctx, x, y, T, N ? .03 : .08, N ? .22 : .16, P.lit, 1.3);
    ctx.fillStyle = N ? 'rgba(0,0,0,.24)' : 'rgba(40,28,18,.28)'; for (let i=0;i<4;i++) ell(ctx, px + hash(x,y,i+30)*T, py + hash(y,x,i+31)*T, T*(.06 + hash(x,y,i+32)*.08), T*.035, ctx.fillStyle, hash(x,y,i+33) - .5); // boot-churn
    ctx.fillStyle = N ? 'rgba(20,16,12,.5)' : 'rgba(150,120,80,.5)'; for (let i=0;i<3;i++) ctx.fillRect(px + hash(x,y,i+36)*T, py + hash(y,x,i+37)*T, T*.07, Math.max(1, T*.018)); // wood chips: the shipwrights are here
    if (!N && h > .7) { ctx.fillStyle = 'rgba(255,214,200,.22)'; ell(ctx, px + T*(.3 + hash(x,y,9)*.4), py + T*(.4 + hash(x,y,10)*.3), T*.12, T*.03, ctx.fillStyle); } // the dawn in a puddle
    b2WetEdges(ctx, x, y, T, b3c6RW, P.wetRGB, N ? .5 : .5, .4); };
  if (b3c6RW(ch)) { mud(); ctx.fillStyle = `rgba(${P.wetRGB},.6)`; ctx.fillRect(px, py, T, T);
    const S = b2WaterShape(x, y, T, b3c6RW, 1.2); ctx.save(); S.path(ctx); ctx.clip(); b2WaterFill(ctx, x, y, T, b3c6RD, wcol);
    ctx.lineCap = 'round'; const deep = ch === '~'; for (let i=0;i<(deep ? 4 : 3);i++){ const sx = px + hash(x,y,i+40)*T, sy = py + hash(y,x,i+41)*T, len = T*(deep ? .3 + hash(x,y,i+42)*.35 : .12 + hash(x,y,i+42)*.16);
      ctx.strokeStyle = deep ? (N ? 'rgba(120,140,180,.12)' : 'rgba(255,222,210,.22)') : P.glint; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + len/2, sy + T*.02*(hash(x,y,i+43) - .5), sx + len, sy); ctx.stroke(); } // the current, going east
    if (ch === '-') for (let i=0;i<3;i++){ const cx = px + T*(.15 + hash(x,y,i+60)*.7), cy = py + T*(.15 + hash(y,x,i+61)*.7), r = T*(.03 + hash(x,y,i+62)*.04); ell(ctx, cx, cy, r*1.3, r, N ? 'rgba(70,72,80,.7)' : 'rgba(120,108,90,.75)'); ctx.strokeStyle = P.glint; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - r*1.6, cy - r*1.1); ctx.quadraticCurveTo(cx + r, cy - r*1.6, cx + r*3.4, cy - r*.5); ctx.stroke(); } // gravel showing, water parting round it
    b2Soft(ctx, px + T*(.2 + h*.6), py + T*.5, T*.9, .35, P.mist, N ? .08 : .22); // the morning mist, lying on the water
    ctx.lineCap = 'butt'; ctx.restore(); b2Lip(ctx, S, T, N ? 'rgba(0,0,0,.4)' : 'rgba(40,30,18,.45)', P.lip); b2BankCorners(ctx, x, y, T, b3c6RW, `rgba(${P.wetRGB},.6)`, 1.2); return; }
  mud();
  if (ch === ',') { b2Soft(ctx, px + T*.5, py + T*.6, T*.6, .6, N ? '30,40,26' : '84,96,52', .7); ctx.lineCap = 'round'; // a reed-bed
    for (let i=0;i<16;i++){ const rx = px + T*(.06 + hash(x,y,i+80)*.88), ry = py + T*(.4 + hash(y,x,i+81)*.56), l = T*(.3 + hash(x,y,i+82)*.3), lean = (hash(x,y,i+83) - .3)*T*.1;
      B2F.line(ctx, i%3 ? P.reed : P.reedL, Math.max(1, T*.022), [[rx, ry], [rx + lean, ry - l]]); if (i%4 === 0) ell(ctx, rx + lean, ry - l - T*.03, T*.018, T*.06, P.head); } }
  else if (ch === 'b') b3c6Barge(ctx, x, y, T, N, P);
  else if (ch === 'l') { const n = 3; for (let r=0;r<2;r++) for (let i=0;i<n - r;i++){ const cx = px + T*(.24 + i*.26 + r*.13), cy = py + T*(.72 - r*.2), rr = T*.13; // logs, stacked, trimmed, the ends sawn
      ctx.fillStyle = P.woodD; ctx.fillRect(cx - T*.04, cy - rr, T*.04, rr*2); ell(ctx, cx + T*.04, cy + rr*.9, rr*1.2, rr*.35, 'rgba(0,0,0,.3)');
      ell(ctx, cx, cy, rr*.85, rr, P.end); ctx.strokeStyle = 'rgba(90,60,30,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, rr*.5, rr*.6, 0, 0, 7); ctx.stroke(); ell(ctx, cx, cy, rr*.12, rr*.14, 'rgba(90,60,30,.7)'); ctx.strokeStyle = P.wood; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.ellipse(cx, cy, rr*.85, rr, 0, 0, 7); ctx.stroke(); }
    ctx.fillStyle = P.wood; ctx.fillRect(px + T*.05, py + T*.2, T*.9, T*.08); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(px + T*.05, py + T*.27, T*.9, Math.max(1, T*.02)); } // and one lying behind
  else if (ch === 'F') b2Flames(ctx, px + T*.5, py + T*.62, T, 1);
  else if (ch !== '.') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .3 : .1, N ? 3.2 : 2.2);
}
TILEX.b3_c6_river = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c6River(ctx, ch, x, y, T, !!dark));

/* ---------------- backdrops: SCENEX[kind](canvas, t) — the still parts cached with sceneLayer, the frame adding what moves ---------------- */
/* a quorl far off in the dark: a long body, two pairs of wings blurred, a rider low on it (60b's title flier, turned to go up and away) */
function b3c6Far(ctx, x, y, s, t, ang, a = 1, sheen = .4){ ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(ang); const f = .6 + Math.abs(Math.sin(t/38))*.4;
  [[-2, 1], [2, .86]].forEach(([wx, wl]) => { ell(ctx, wx, -15*wl*f, 2.4, 15*wl*f, `rgba(170,196,220,${.3*a*sheen})`); ell(ctx, wx, 13*wl*f, 2.2, 13*wl*f, `rgba(150,180,210,${.24*a*sheen})`); });
  ctx.fillStyle = `rgba(5,7,11,${a})`; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(-30, -1.6, 8, -2.6); ctx.quadraticCurveTo(16, -3, 16, 0); ctx.quadraticCurveTo(16, 3, 8, 2.6); ctx.quadraticCurveTo(-30, 1.6, -40, 0); ctx.fill();
  ell(ctx, 19, 0, 4, 3.4, ctx.fillStyle); ctx.fillRect(1, -10, 4.4, 8); ell(ctx, 3.2, -12, 2.2, 2.2, ctx.fillStyle); ctx.fillRect(-8, -8.6, 4, 6.6); ell(ctx, -6, -10.4, 2, 2, ctx.fillStyle); // the rider, and a soldier behind him
  ctx.strokeStyle = `rgba(138,164,192,${.4*a*sheen})`; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(-30, -1.6, 8, -2.6); ctx.stroke(); ctx.restore(); }
/* a sky of stars over hz */
function b3c6Stars(x, W, hz, n, seed){ for (let i=0;i<n;i++){ const y = Math.pow(hash(i, seed), 1.5)*hz*.94, b = hash(i, seed + 1); x.fillStyle = `rgba(214,226,244,${.25 + b*.6})`; const r = b > .93 ? 1.6 : 1; x.fillRect(hash(i, seed + 2)*W, y, r, r); } }
/* the far mountains: 60b's ridge line filled, snow on the caps */
function b3c6Range(x, W, H, base, amp, seed, peaks, col, cap){ const pts = moiRidge(W, H, base, amp, seed, peaks); x.beginPath(); x.moveTo(0, base + 2); pts.forEach(([px, py]) => x.lineTo(px, py)); x.lineTo(W, base + 2); x.closePath(); x.fillStyle = col; x.fill();
  if (cap) for (let i=1;i<pts.length - 1;i++){ const [px, py] = pts[i]; if (!(py < pts[i-1][1] && py <= pts[i+1][1]) || base - py < amp*.6) continue; const d = (base - py)*.18; x.fillStyle = cap; x.beginPath(); x.moveTo(px, py); x.lineTo(px - d*1.3, py + d*1.1); x.lineTo(px - d*.5, py + d*.8); x.lineTo(px + d*.4, py + d*1.2); x.lineTo(px + d*.9, py + d*.8); x.closePath(); x.fill(); }
  return pts; }

/* a cedar bough hanging into the frame: a curving stem, and all along it flat drooping sprays of scale-leaf */
function b3c6Bough(ctx, x, y, len, ang, droop, col, colL, w = 1){ ctx.save(); ctx.translate(x, y); ctx.rotate(ang); const P = k => [len*k, droop*k*k*len];
  /* a cedar spray: flat, lacy, drooping; a blunt scalloped frond of scale-leaves, not a fern's long leaflets */
  const spray = (l, wd) => { ctx.beginPath(); ctx.moveTo(0, -wd*.3); const n = 5; for (let j=1;j<=n;j++){ const q = j/n, hw = wd*(1 - q*.75); ctx.quadraticCurveTo(l*(q - .1), -hw*1.25, l*q, -hw*.55); } ctx.quadraticCurveTo(l*1.06, 0, l, wd*.12);
    for (let j=n;j>=1;j--){ const q = (j - 1)/n, hw = wd*(1 - q*.75); ctx.quadraticCurveTo(l*(q + .1), hw*1.25, l*q, hw*.55); } ctx.closePath(); ctx.fill(); };
  ctx.strokeStyle = col; ctx.lineWidth = 1.8*w; ctx.lineCap = 'round'; ctx.beginPath(); for (let i=0;i<=12;i++){ const [px, py] = P(i/12); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.fillStyle = col; for (let i=1;i<15;i++){ const k = i/15, [px, py] = P(k), side = i%2 ? 1 : -1, l = len*(.2 + .12*Math.sin(k*Math.PI))*(1 - k*.35), a = side*(.7 - k*.2) + droop*.9*k + .25;
    ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.lineWidth = .9*w; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(l*.5, l*.06, l, l*.2); ctx.stroke(); // the branchlet, sagging
    for (let j=0;j<5;j++){ const q = .18 + j*.19, sx = l*q, sy = l*.2*q*q, sl = l*(.42 - j*.05), sd = side*(j%2 ? 1 : -1); ctx.save(); ctx.translate(sx, sy); ctx.rotate(sd*(.55 - j*.06) + .3); spray(sl, sl*.3); ctx.restore(); }
    ctx.save(); ctx.translate(l, l*.2); ctx.rotate(.25); spray(l*.34, l*.1); ctx.restore(); // the leading spray
    ctx.strokeStyle = colL; ctx.lineWidth = .55*w; ctx.beginPath(); for (let j=0;j<5;j++){ const q = .18 + j*.19; ctx.moveTo(l*q, l*.2*q*q - .6*w); ctx.lineTo(l*(q + .1), l*.2*(q + .1)*(q + .1) - .6*w); } ctx.stroke(); ctx.strokeStyle = col; // a little sky-light along the top
    ctx.restore(); }
  ctx.restore(); }
/* a soldier in silhouette, standing, kit on his back and a spear up: s ~ 1 is about 8px tall */
function b3c6Man(x, px, py, s, col, spear){ x.fillStyle = col; x.fillRect(px - s, py - 6*s, 2*s, 6*s); x.fillRect(px - .8*s, py - 7.9*s, 1.6*s, 1.7*s); x.fillRect(px - 1.9*s, py - 5.6*s, 1.2*s, 2.6*s); if (spear) { x.fillRect(px + 1*s, py - 12*s, .45*s + .3, 9*s); } }

/* The night lift: a company waiting in the dark on open ground, no lantern anywhere, and the quorls coming down out of the stars for
   them two and three at a time; the ones already loaded going up and away north-east over the mountains, smaller and smaller. */
SCENEX.b3_c6_lift = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.58, M = Math.min(H, W*.62), Z = Math.min(1.5, Math.max(.8, W/700));
  ctx.drawImage(sceneLayer('b3c6:lift', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0, '#020308'], [.5, '#070c18'], [.85, '#111a2b'], [1, '#18222f']]); x.fillRect(0, 0, W, hz + 2);
    b3c6Stars(x, W, hz, Math.round(W*.32), 601); // starlight, and nothing else
    for (let i=0;i<90;i++){ const u = hash(i, 611), yy = hz*(.06 + u*.6) + Math.sin(u*7)*H*.05; x.fillStyle = `rgba(180,196,224,${.025 + hash(i, 612)*.035})`; x.fillRect(W*(.25 + u*.65) + (hash(i, 613) - .5)*W*.08, yy, 2 + hash(i, 614)*7, 1); } // a smear of the galaxy
    b3c6Range(x, W, H, hz, M*.2, 621, [[.18, .6, .14], [.5, .9, .16], [.8, .5, .12]], '#0b111a', 'rgba(150,168,190,.12)'); // the mountains the quorls go over
    b3c6Range(x, W, H, hz + 2, M*.07, 631, [[.3, .5, .14], [.7, .4, .16]], '#070a10', null);
    x.fillStyle = vgrad(x, hz, H, [[0, '#1a2230'], [.3, '#111823'], [1, '#05070a']]); x.fillRect(0, hz, W, H - hz); // frost on the grass, under the stars
    for (let i=0;i<50;i++){ const d = Math.pow(hash(i, 641), 1.4), y = hz + 4 + d*(H - hz)*.9; ell(x, hash(i, 642)*W, y, W*(.02 + hash(i, 643)*.05)*(.4 + d*1.4), 1 + d*2.4, `rgba(120,140,170,${.03 + hash(i, 644)*.04})`); } // starlight on frost in the grass
    // the company, waiting: block after block of them, dark on dark, spears up; nearer blocks bigger
    [[.04, .07, .7], [.3, .05, .6], [.56, .09, .8], [.8, .06, .65], [.14, .2, 1.3], [.42, .24, 1.5]].forEach(([fx, fy, sz], b) => { const s = sz*Z, by = hz + H*fy;
      for (let r=0;r<4;r++) for (let c=0;c<10;c++){ if (hash(b*40 + r*10 + c, 655) < .12) continue; const px = W*fx + c*4.4*s + r*1.8*s + (hash(b, r, c) - .5)*s, py = by + r*2.4*s; b3c6Man(x, px, py, s, r === 0 ? '#04050a' : '#020306', (c + r)%2 === 0); x.fillStyle = 'rgba(150,170,205,.22)'; x.fillRect(px - .8*s, py - 7.9*s, 1.6*s, .5); }
      x.fillStyle = 'rgba(170,190,220,.3)'; for (let c=0;c<10;c+=2) x.fillRect(W*fx + c*4.4*s + 1*s, by - 12*s, .7, 1.4*s); }); // starlight on helms and spear-points // starlight on the spear-points
  }), 0, 0, W, H);
  // quorls going up and away over the mountains, smaller and smaller
  for (let i=0;i<7;i++){ const u = ((t*mo/(26000 + i*1700) + hash(i, 651)) % 1), x = W*(.2 + hash(i, 652)*.5) + u*W*.34, y = hz - H*.04 - u*hz*.66 - Math.sin(u*4 + i)*H*.02, s = Math.max(.08, (1 - u)*.5)*Z;
    b3c6Far(ctx, x, y, s, t + i*80, -.3, Math.min(1, (1 - u)*3), .6); }
  // one coming down for the next of them, and one on the ground, loading: two of ours climbing up behind the rider
  const hv = Math.sin(t*mo/800)*2, dx = W*.7, dy = H*.86;
  ctx.save(); ctx.filter = 'brightness(.55) saturate(.7)';
  drawFigure(ctx, 'quorl', W*.42, H*.3 + Math.sin(t*mo/700 + 1)*4, 1.3*Z, t, {phase:4, dir:-1, air:true}); drawFigure(ctx, 'b3_moranth', W*.42 + 6*Z, H*.3 - 12*Z + Math.sin(t*mo/700 + 1)*4, .5*Z, t, {still:true, dir:-1});
  drawFigure(ctx, 'quorl', dx, dy + hv, 2*Z, t, {phase:2, dir:-1}); drawFigure(ctx, 'b3_moranth', dx + 6*Z, dy - 16*Z + hv, .7*Z, t, {still:true, dir:-1});
  ctx.restore();
  ctx.fillStyle = '#05070a'; [[dx + 26*Z, dy - 11*Z, 1.5], [dx + 34*Z, dy + 4*Z, 1.6]].forEach(([px, py, k], i) => { b3c6Man(ctx, px, py + hv*(1 - i), k*Z, '#05070a', false); if (!i) B2F.line(ctx, '#05070a', 1.4*Z, [[px - 1*Z, py - 9*Z], [px - 6*Z, py - 13*Z + hv]]); }); // climbing up
  const sq = sceneSquad(); ctx.save(); ctx.filter = 'brightness(.42) saturate(.5)'; squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.05 + i*Math.min(26, W*.45/sq.length), H*.96 - (i%2)*2, 1.7, t, {phase:i, dir:1})); ctx.restore(); // the Fourth, in the dark, waiting their turn
  ctx.fillStyle = 'rgba(140,164,200,.04)'; ctx.fillRect(0, 0, W, H); // starlight over everything
  vign(ctx, W, H, .7, .5); };

/* The entrenchments: a trench cut into the mountainside under cedar boughs and old moss, the Moranth in it; and over the lip, a long way
   down through the haze, Coral on its bay — walls, the Seer's Keep standing up out of it, smoke, and that wrong cold light over the water. */
SCENEX.b3_c6_entrench = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.3, cx = W*.58, cy = H*.52, cw = Math.min(W*.36, 300);
  ctx.drawImage(sceneLayer('b3c6:entrench', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0, '#262e3a'], [.6, '#4e5864'], [1, '#7e868e']]); x.fillRect(0, 0, W, hz + 2); // a low grey sky
    [[.1, .08, .6], [.5, .16, .5], [.0, .22, .4]].forEach(([fx, fy, w]) => ell(x, W*(fx + w/2), H*fy, W*w/2, H*.014, 'rgba(30,36,46,.4)')); // cloud bars
    b3c6Range(x, W, H, hz, H*.08, 661, [[.15, .5, .14], [.85, .7, .16]], '#56606a', 'rgba(220,232,240,.3)'); // the far shore's mountains
    x.fillStyle = vgrad(x, hz, H*.62, [[0, '#8a949e'], [.5, '#6a7682'], [1, '#4e5a66']]); x.fillRect(0, hz, W, H*.62 - hz); // the bay, flat and grey, a long way down
    glow(x, cx, cy - H*.06, W*.28, '#d4eeff', .2); // the Seer's cold light over the water
    x.fillStyle = 'rgba(220,236,248,.22)'; for (let i=0;i<40;i++) x.fillRect(W*hash(i, 671), hz + H*(.02 + Math.pow(hash(i, 672), 1.3)*.28), 3 + hash(i, 673)*12, 1); // light on the water
    // Coral: a headland, walls round it, roofs packed down to the water, the Keep a dark stepped tower in the middle
    x.fillStyle = '#4a5058'; x.beginPath(); x.moveTo(cx - cw*.6, cy + H*.06); x.quadraticCurveTo(cx - cw*.4, cy - H*.04, cx, cy - H*.045); x.quadraticCurveTo(cx + cw*.4, cy - H*.04, cx + cw*.55, cy + H*.03); x.lineTo(cx + cw*.7, cy + H*.08); x.closePath(); x.fill();
    for (let i=0;i<160;i++){ const u = hash(i, 681), v = hash(i, 682), px = cx - cw*.5 + u*cw, py = cy - H*.03 + v*H*.08 - Math.sin(u*Math.PI)*H*.015; const w = 2 + hash(i, 683)*4, hh = 2 + hash(i, 684)*3;
      x.fillStyle = v > .6 ? '#6a7078' : v > .3 ? '#5a6068' : '#4e545c'; x.fillRect(px, py - hh, w, hh); x.fillStyle = 'rgba(30,32,38,.6)'; x.fillRect(px + w - 1, py - hh, 1, hh); }
    x.strokeStyle = '#7a8088'; x.lineWidth = 1.4; x.beginPath(); x.moveTo(cx - cw*.56, cy + H*.05); x.quadraticCurveTo(cx - cw*.3, cy - H*.06, cx, cy - H*.065); x.quadraticCurveTo(cx + cw*.35, cy - H*.06, cx + cw*.52, cy + H*.03); x.stroke(); // the wall
    for (let i=0;i<7;i++){ const u = i/6, px = lerp(cx - cw*.5, cx + cw*.5, u), py = cy - H*.06 + Math.pow(u - .5, 2)*H*.3; x.fillStyle = '#3e444c'; x.fillRect(px - 2, py - 5, 4, 6); } // its towers
    const kx = cx + cw*.04, ky = cy - H*.02, ks = Math.min(1.4, cw/180); x.fillStyle = '#1a1e24'; [[12, 7], [9, 7], [6.4, 7], [4, 8]].reduce((yy, [hw, hh]) => { x.fillRect(kx - hw*ks, yy - hh*ks, hw*2*ks, hh*ks); return yy - hh*ks; }, ky); x.fillRect(kx - 1, ky - 36*ks, 2, 8*ks); // the Keep
    x.fillStyle = 'rgba(160,170,180,.3)'; x.fillRect(kx - 12*ks, ky - 7*ks, 2*ks, 7*ks); x.fillRect(kx - 9*ks, ky - 14*ks, 2*ks, 7*ks); x.fillRect(kx - 6.4*ks, ky - 21*ks, 1.6*ks, 7*ks);
    x.fillStyle = 'rgba(160,170,180,.35)'; x.fillRect(0, H*.5, W, H*.14); // haze, lying between here and there
    // the mountain falling away on both sides, down toward the bay: it is a long way down
    const flank = (pts, col) => { x.beginPath(); x.moveTo(pts[0][0], pts[0][1]); pts.slice(1).forEach(p => x.lineTo(p[0], p[1])); x.closePath(); x.fillStyle = col; x.fill(); };
    flank([[0, H*.36], [W*.14, H*.44], [W*.26, H*.58], [W*.34, H*.7], [0, H*.7]], '#4a5450'); flank([[W, H*.4], [W*.86, H*.48], [W*.78, H*.62], [W*.7, H*.72], [W, H*.72]], '#46504c');
    flank([[0, H*.5], [W*.2, H*.6], [W*.44, H*.74], [0, H*.76]], '#343c38'); flank([[W, H*.56], [W*.78, H*.66], [W*.56, H*.76], [W, H*.78]], '#323a36');
    for (let i=0;i<40;i++){ const left = i%2 === 0, u = hash(i, 701), px = left ? W*u*.36 : W*(1 - u*.38), py = left ? H*(.5 + u*.2) + hash(i, 702)*H*.06 : H*(.56 + u*.18) + hash(i, 702)*H*.05, hh = 6 + (py/H - .5)*40 + hash(i, 703)*6;
      x.fillStyle = py > H*.62 ? '#1a221e' : '#2a3430'; for (let k=0;k<4;k++){ const w = (4 - k)*hh*.12; x.beginPath(); x.moveTo(px - w, py - k*hh/4); x.lineTo(px, py - (k + 1.5)*hh/4); x.lineTo(px + w, py - k*hh/4); x.fill(); } } // cedars, down the slopes
    // the trench: its far wall a revetment of cedar logs laid flat, moss over the lip
    x.fillStyle = '#1e1a16'; x.fillRect(0, H*.72, W, H*.28);
    for (let r=0;r<4;r++){ const yy = H*.74 + r*H*.045; x.fillStyle = r%2 ? '#3e2e1e' : '#4a3622'; x.fillRect(0, yy, W, H*.04); x.fillStyle = 'rgba(255,240,210,.1)'; x.fillRect(0, yy, W, 1); for (let i=0;i<W/60;i++){ const ex = (i*60 + r*23) % W; ell(x, ex, yy + H*.02, 3, H*.018, '#6a5034'); } }
    x.fillStyle = '#3a4234'; x.beginPath(); x.moveTo(0, H*.74); for (let i=0;i<=20;i++) x.lineTo(i/20*W, H*(.72 + Math.sin(i*1.7)*.006)); x.lineTo(W, H*.745); x.closePath(); x.fill(); // moss along the lip
    for (let i=0;i<80;i++){ ell(x, hash(i, 711)*W, H*(.715 + hash(i, 712)*.03), 1.5 + hash(i, 713)*4, .8 + hash(i, 714)*1.2, i%3 ? 'rgba(62,80,44,.85)' : 'rgba(92,110,62,.6)'); }
  }), 0, 0, W, H);
  // smoke from Coral, going up slow and leaning
  for (let c=0;c<3;c++){ const bx = cx - cw*.25 + c*cw*.22, by = cy - H*.02; for (let i=0;i<10;i++){ const k = ((t*mo/(14000 + c*2000) + i/10) % 1), r = 2 + k*10; glow(ctx, bx + k*k*30, by - k*H*.22, r*1.4, '#3a3e44', .32*(1 - k)); } }
  glow(ctx, cx, cy - H*.06, W*.12, '#e0f4ff', (.07 + Math.sin(t*mo/2600)*.04)); // the cold light, breathing
  for (let i=0;i<3;i++){ const k = ((t*mo/30000 + i/3) % 1); ell(ctx, W*(k*1.4 - .2), H*(.46 + i*.06), W*.25, H*.02, 'rgba(176,186,196,.16)'); } // mist moving below
  const sq = sceneSquad().slice(0, 5); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.06 + i*Math.min(24, W*.08), H*.9 - (i%2)*1.5, 1.7, t, {phase:i, dir:1})); // the Fourth in the trench, looking down
  drawFigure(ctx, 'b3_moranth', W*.62, H*.89, 1.6, t, {dir:-1}); drawFigure(ctx, 'b3_c6_twist', W*.7, H*.9, 1.6, t, {dir:-1});
  ctx.fillStyle = '#3e423c'; ctx.beginPath(); ctx.moveTo(0, H*.95); ctx.quadraticCurveTo(W*.3, H*.92, W*.6, H*.95); ctx.quadraticCurveTo(W*.8, H*.97, W, H*.93); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill(); // the trench floor's lip in front of them
  ctx.fillStyle = 'rgba(70,88,48,.75)'; for (let i=0;i<30;i++) ell(ctx, hash(i, 721)*W, H*(.94 + hash(i, 722)*.05), 1.5 + hash(i, 723)*4, .8 + hash(i, 724)*1.2, ctx.fillStyle);
  // cedar boughs hanging over from above: the screen they dug in under, moving a little
  const B = Math.min(H*.5, W*.4);
  [[-.04, -.06, 1.1, .3, .2], [-.02, .02, .9, .6, .3], [.1, -.06, .8, .7, .4], [.22, -.08, .6, 1, .5], [.36, -.08, .45, 1.2, .5]].forEach(([fx, fy, l, a, d], i) => b3c6Bough(ctx, W*fx, H*fy, B*l, a + Math.sin(t*mo/2200 + i)*.03, d, i%2 ? '#1a2a20' : '#12201a', 'rgba(120,150,110,.35)', Math.max(1.4, B/60)));
  [[1.04, -.04, 1, 2.7, -.25], [1.02, .04, .8, 2.5, -.3], [.88, -.07, .6, 2.2, -.4]].forEach(([fx, fy, l, a, d], i) => b3c6Bough(ctx, W*fx, H*fy, B*l, a + Math.sin(t*mo/2400 + i + 2)*.03, d, i%2 ? '#16241c' : '#101c16', 'rgba(120,150,110,.3)', Math.max(1.4, B/60)));
  vign(ctx, W, H, .6, .5); };

/* The barge camp on the Maurik at dawn: the river wide and brown and quick, mist lying on it, the far bank's trees a grey wall; on this
   side the hulls on their slips, ribs and half-planking, the log piles, the fires and their smoke, and men already at it with adze and saw. */
function b3c6Hull(x, x0, x1, y0, hh, pk){ // a barge's hull in profile on its slip: flat bottom, a square stern at the left, the bow raked up at the right; planked to pk (0..1)
  const bow = x1, stern = x0, bot = y0 + hh*.5, sheer = k => y0 - hh*.5 - k*k*hh*.35, B = k => k < .12 ? bot - (1 - k/.12)*hh*.25 : k < .72 ? bot : bot - Math.pow((k - .72)/.28, 1.6)*hh*1.15, X = k => lerp(stern, bow, k);
  x.fillStyle = '#100c08'; for (let i=0;i<4;i++){ const px = X(.1 + i*.24); x.fillRect(px - 2, bot, 4, hh*.5); } x.fillRect(stern - 4, bot + hh*.5, bow - stern + 8, 2); // the slip: trestles and a way
  x.beginPath(); for (let i=0;i<=20;i++){ const k = i/20*pk; i ? x.lineTo(X(k), sheer(k)) : x.moveTo(X(k), sheer(k)); } for (let i=20;i>=0;i--){ const k = i/20*pk; x.lineTo(X(k), B(k)); } x.closePath(); x.fillStyle = '#4e3a26'; x.fill(); // the planking
  x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 1; for (let j=1;j<5;j++){ x.beginPath(); for (let i=0;i<=20;i++){ const k = i/20*pk; const yy = lerp(sheer(k), B(k), j/5); i ? x.lineTo(X(k), yy) : x.moveTo(X(k), yy); } x.stroke(); } // the strakes
  x.fillStyle = 'rgba(255,200,150,.25)'; x.beginPath(); for (let i=0;i<=20;i++){ const k = i/20*pk; i ? x.lineTo(X(k), sheer(k)) : x.moveTo(X(k), sheer(k)); } x.lineTo(X(pk), sheer(pk) + 2); x.lineTo(X(0), sheer(0) + 2); x.fill(); // dawn along the top strake
  x.strokeStyle = '#7a5a3a'; x.lineWidth = Math.max(1.2, hh*.08); for (let k = pk + .03; k < .99; k += .055){ x.beginPath(); x.moveTo(X(k), B(k)); x.quadraticCurveTo(X(k) - hh*.06, (B(k) + sheer(k))/2, X(k), sheer(k) - hh*.06); x.stroke(); } // the bare ribs
  x.strokeStyle = '#2a1e12'; x.lineWidth = Math.max(1.6, hh*.1); x.beginPath(); for (let i=0;i<=24;i++){ const k = i/24; i ? x.lineTo(X(k), B(k)) : x.moveTo(X(k), B(k)); } x.lineTo(bow + hh*.06, sheer(1) - hh*.1); x.stroke(); // the keel and stem
  x.strokeStyle = '#8a6a44'; x.lineWidth = Math.max(1, hh*.05); x.beginPath(); for (let i=0;i<=20;i++){ const k = i/20; i ? x.lineTo(X(k), sheer(k)) : x.moveTo(X(k), sheer(k)); } x.stroke(); // a batten along the sheer, where the planks will go
  x.fillStyle = '#3a2a1a'; x.fillRect(stern - hh*.04, sheer(0), hh*.1, bot - sheer(0)); } // the transom
SCENEX.b3_c6_barges = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), hz = H*.4, sx = W*.82, Z = Math.min(1.6, Math.max(.8, W/600));
  const fires = [[W*.24, H*.8], [W*.47, H*.74], [W*.94, H*.82]];
  ctx.drawImage(sceneLayer('b3c6:barges', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0, '#1e2232'], [.45, '#4a4656'], [.78, '#a87a6e'], [1, '#e2b08a']]); x.fillRect(0, 0, W, hz + 2); // dawn, coming up the river
    glow(x, sx, hz, W*.4, '#ffcf9a', .35); glow(x, sx, hz, W*.08, '#fff0d0', .5);
    [[.04, .12, .5], [.4, .2, .55], [.6, .06, .34]].forEach(([fx, fy, w]) => { ell(x, W*(fx + w/2), H*fy, W*w/2, H*.014, 'rgba(60,50,66,.5)'); x.fillStyle = 'rgba(255,190,150,.25)'; x.fillRect(W*(fx + .04), H*fy + H*.008, W*(w - .08), 1); }); // clouds, lit underneath
    // the far bank: low hills, then a long line of trees, grey with distance
    b3c6Range(x, W, H, hz - 4, H*.06, 741, [[.2, .5, .2], [.6, .4, .2]], '#6a6070', null);
    x.fillStyle = '#4e4856'; x.beginPath(); x.moveTo(0, hz + 2); for (let i=0;i<=90;i++){ const px = i/90*W; x.lineTo(px, hz - 4 - hash(i, 742)*7 - Math.sin(i*.3)*2); } x.lineTo(W, hz + 2); x.closePath(); x.fill();
    x.fillStyle = 'rgba(230,200,190,.22)'; x.fillRect(0, hz - 3, W, 5);
    // the river: wide, brown-grey, the sky on it
    x.fillStyle = vgrad(x, hz, H*.64, [[0, '#b08a7a'], [.25, '#7a6660'], [1, '#3e3a3a']]); x.fillRect(0, hz, W, H*.64 - hz);
    for (let i=0;i<70;i++){ const y = hz + Math.pow(hash(i, 751), 1.4)*(H*.22), px = hash(i, 752)*W; x.fillStyle = `rgba(255,214,180,${.08 + hash(i, 753)*.18})`; x.fillRect(px, y, 6 + hash(i, 754)*24, 1); } // the current, catching the light
    glow(x, sx, hz + H*.06, W*.2, '#ffc890', .2); x.fillStyle = 'rgba(255,220,180,.35)'; for (let i=0;i<12;i++) x.fillRect(sx - 20 + hash(i, 755)*40 - i*2, hz + 3 + i*3.4, 8 + hash(i, 756)*10, 1); // the sun's road on the water
    // this bank: mud, sloping up out of the water
    x.fillStyle = '#3a3028'; x.beginPath(); x.moveTo(0, H*.6); x.quadraticCurveTo(W*.3, H*.58, W*.6, H*.61); x.quadraticCurveTo(W*.8, H*.63, W, H*.6); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill();
    x.fillStyle = 'rgba(255,200,160,.2)'; x.beginPath(); x.moveTo(0, H*.6); x.quadraticCurveTo(W*.3, H*.58, W*.6, H*.61); x.quadraticCurveTo(W*.8, H*.63, W, H*.6); x.lineTo(W, H*.605); x.quadraticCurveTo(W*.3, H*.585, 0, H*.605); x.fill();
    x.fillStyle = vgrad(x, H*.63, H, [[0, '#3e342a'], [1, '#16110c']]); x.fillRect(0, H*.64, W, H*.36);
    // shelters further along the bank, and the column's carts
    for (let i=0;i<8;i++){ const px = W*(.6 + i*.05), py = H*.63 + (i%2)*2, s = 1.2*Z; x.fillStyle = '#241c16'; x.beginPath(); x.moveTo(px - 6*s, py); x.lineTo(px, py - 6*s); x.lineTo(px + 6*s, py); x.fill(); }
    // the hulls on their slips
    b3c6Hull(x, W*.06, W*.06 + Math.min(W*.4, 190*Z), H*.72, H*.15*Z, .5); b3c6Hull(x, W*.52, W*.52 + Math.min(W*.28, 140*Z), H*.67, H*.11*Z, .7);
    // log piles, a sawpit with its trestle, chips everywhere
    [[.34, .9], [.66, .9], [.02, .97]].forEach(([fx, fy]) => { const r0 = 3.4*Z; for (let r=0;r<3;r++) for (let c=0;c<5 - r;c++){ const px = W*fx + c*r0*2.1 + r*r0, py = H*fy - r*r0*1.8; ell(x, px, py, r0, r0, '#2a1e14'); ell(x, px, py, r0*.75, r0*.75, '#8a6c4a'); ell(x, px, py, r0*.2, r0*.2, '#4a3420'); } });
    const tx = W*.78, ty = H*.9; x.fillStyle = '#140e0a'; x.fillRect(tx, ty - 10*Z, 40*Z, 3*Z); x.fillRect(tx + 2*Z, ty - 10*Z, 2.4*Z, 10*Z); x.fillRect(tx + 36*Z, ty - 10*Z, 2.4*Z, 10*Z); x.fillStyle = '#7a5a3a'; x.fillRect(tx - 6*Z, ty - 13*Z, 52*Z, 3*Z); // the sawpit trestle, a log on it
    for (let i=0;i<90;i++){ x.fillStyle = `rgba(200,160,110,${.15 + hash(i, 761)*.25})`; x.fillRect(hash(i, 762)*W, H*(.66 + hash(i, 763)*.32), 2, 1); }
  }), 0, 0, W, H);
  // the fires, and their smoke going up into the dawn and lying along the river
  fires.forEach(([fx, fy], c) => { ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, 22*Z, '#ff8a3a', .32*fl); ctx.globalCompositeOperation = 'source-over'; b2Flames(ctx, fx, fy, 16*Z, fl);
    for (let i=0;i<12;i++){ const k = ((t*mo/(9000 + c*1500) + i/12) % 1), r = 3 + k*14; glow(ctx, fx + k*k*W*.12, fy - 6 - k*H*.42, r*1.3, '#6a6068', .26*(1 - k)); } });
  for (let i=0;i<4;i++){ const k = ((t*mo/(36000 + i*5000) + i/4) % 1); ell(ctx, W*(k*1.5 - .25), hz + H*(.03 + i*.045), W*(.22 + i*.04), H*(.016 + i*.004), `rgba(236,222,220,${.2 - i*.02})`); } // mist lying on the water, drifting downstream
  for (let i=0;i<10;i++){ const k = ((t*mo/(4000 + hash(i, 771)*3000) + hash(i, 772)) % 1); ctx.fillStyle = `rgba(255,226,190,${Math.sin(k*Math.PI)*.4})`; ctx.fillRect(W*hash(i, 773) + k*30, hz + H*(.03 + hash(i, 774)*.15), 7, 1); } // glints, moving
  // the shipwrights at it: adzes going up and down on the hulls, a top-sawyer on the trestle
  const ad = k => Math.abs(Math.sin(t*mo/380 + k*1.7)); [[W*.12, H*.72 - H*.09*Z, 0], [W*.28, H*.72 - H*.1*Z, 1], [W*.62, H*.67 - H*.07*Z, 2]].forEach(([px, py, i]) => { b3c6Man(ctx, px, py, 1.1*Z, '#0c0a08', false); B2F.line(ctx, '#0c0a08', 1.1*Z, [[px + 1*Z, py - 5*Z], [px + 4*Z, py - 6*Z - ad(i)*4*Z]]); });
  const sw = Math.sin(t*mo/260)*2.4*Z; b3c6Man(ctx, W*.78 + 20*Z, H*.9 - 13*Z, 1.1*Z, '#0c0a08', false); B2F.line(ctx, 'rgba(180,180,180,.6)', .8, [[W*.78 + 22*Z, H*.9 - 18*Z + sw], [W*.78 + 22*Z, H*.9 + sw]]); // a top-sawyer
  const sq = sceneSquad(); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.36 + i*Math.min(24, W*.38/sq.length), H*.97 - (i%2)*2, 1.7, t, {phase:i, dir:1}));
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, sx, H*.8, W*.4, '#ff9a5a', .05); ctx.globalCompositeOperation = 'source-over'; // the dawn on their faces
  vign(ctx, W, H, .55, .5); };

/* ---------------- the chapter's items: ART['item/<key>'], drawn like Book Two's boards (tools/art_dg_items.py) ----------------
   weapons and armour on 200x150, trinkets (the vambrace and the feather) on 240x130; each on its own dark ground, lit from the upper left */
{ const bg = (id, w, h, c0, c1) => `<defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.62"><stop offset="0" stop-color="${c0}"></stop><stop offset="1" stop-color="${c1}"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect>`;
  const svg = (label, w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;
  const B3C6_ART = {
    /* a Black Moranth vambrace: black chitin over the forearm in overlapping plates, an oil-sheen on the edges, two straps */
    vambrace: label => svg(label, 240, 130, bg('a6-vbg', 240, 130, '#36404e', '#0b0d11') + '<g transform="translate(36 -2) scale(.86)">' +
      '<ellipse cx="104" cy="112" rx="66" ry="8" fill="#000" opacity=".35"/>' +
      '<path d="M40 50 Q96 34 160 50 L152 98 Q100 110 46 104 Z" fill="#0a0b0e"/>' +
      '<path d="M44 52 Q62 46 78 44 L80 104 Q60 104 48 102 Z" fill="#26282f"/><path d="M82 43 Q100 40 116 41 L114 106 Q98 107 84 105 Z" fill="#2c2f37"/><path d="M120 41 Q140 43 156 50 L150 96 Q134 102 118 105 Z" fill="#23252b"/>' +
      '<path d="M46 56 Q62 50 76 49 L77 66 Q62 66 47 70 Z M84 47 Q100 44 114 45 L113 62 Q98 61 85 63 Z M121 45 Q140 47 154 54 L152 68 Q136 63 120 62 Z" fill="#454a56"/>' +
      '<path d="M44 52 Q62 46 78 44 M82 43 Q100 40 116 41 M120 41 Q140 43 156 50" fill="none" stroke="#9fd0dc" stroke-width="1.8" opacity=".7"/>' +
      '<path d="M54 84 Q100 76 146 80" fill="none" stroke="#b08ad8" stroke-width="6" opacity=".18"/><path d="M50 60 L72 56 M88 52 L108 50 M126 51 L146 56" stroke="#e8f6fa" stroke-width="1.2" opacity=".55"/>' +
      '<rect x="62" y="40" width="8" height="68" rx="2" fill="#5a3e26"/><rect x="132" y="42" width="8" height="62" rx="2" fill="#5a3e26"/><rect x="60" y="70" width="12" height="8" rx="1" fill="#a8aab0"/><rect x="130" y="68" width="12" height="8" rx="1" fill="#a8aab0"/>' +
      '<path d="M156 50 Q176 58 172 74 Q176 90 152 96" fill="none" stroke="#2e313a" stroke-width="6" stroke-linecap="round"/><path d="M158 52 Q172 60 170 70" fill="none" stroke="#9fd0dc" stroke-width="1" opacity=".5"/></g>'),
    /* a barge-builder's axe: a long ash haft, a broad thin bearded blade for squaring timber, a shaving still curled on it */
    axe: label => svg(label, 200, 150, bg('a6-abg', 200, 150, '#4a3a28', '#120d09') +
      '<path d="M40 140 L150 30" stroke="#8a6a40" stroke-width="8" stroke-linecap="round"/><path d="M44 136 L148 32" stroke="#b8945e" stroke-width="2" opacity=".6"/>' +
      '<path d="M128 24 L150 46 Q168 72 158 104 Q140 96 124 80 Q120 60 112 52 Z" fill="#9a9a96"/><path d="M158 104 Q168 72 150 46" fill="none" stroke="#e8eae6" stroke-width="2"/>' +
      '<path d="M124 30 L142 48" stroke="#4a4a48" stroke-width="5"/><circle cx="137" cy="40" r="3" fill="#2a2a28"/>' +
      '<path d="M60 128 Q64 116 74 118 Q70 126 78 130" fill="none" stroke="#e0c08a" stroke-width="3" opacity=".8"/><path d="M26 112 l10 -3 M30 124 l8 2 M170 124 l10 -4 M176 112 l6 3" stroke="#d0b07a" stroke-width="2.4" opacity=".7"/>' +
      '<path d="M44 140 L52 132" stroke="#2a1c10" stroke-width="10" stroke-linecap="round"/>'),
    /* a Condor's feather: a long black primary, the quill ivory, the barbs ragged — and cold to hold, with a light in it that is not there */
    feather: label => svg(label, 240, 130, bg('a6-fbg', 240, 130, '#2a2e36', '#08090b') +
      '<ellipse cx="178" cy="40" rx="26" ry="16" fill="#c8ffe8" opacity=".1"/><ellipse cx="120" cy="66" rx="70" ry="22" fill="#9ae8c8" opacity=".05" transform="rotate(-24 120 66)"/>' +
      '<path d="M34 106 Q70 70 130 50 Q176 34 206 26 Q196 44 170 60 Q150 74 118 86 Q80 100 46 110 Z" fill="#1a1714"/>' +
      '<path d="M34 106 Q74 86 122 70 Q170 50 206 26 Q178 32 140 42 Q90 58 50 92 Z" fill="#2e2924"/>' +
      '<path d="M60 92 l2 14 M80 84 l4 14 M100 76 l6 13 M122 68 l6 12 M144 58 l6 11 M164 48 l5 9 M74 80 l-6 -12 M96 72 l-5 -12 M118 64 l-4 -12 M142 54 l-3 -11" stroke="#0a0908" stroke-width="2.6"/>' +
      '<path d="M54 92 Q90 76 130 62" fill="none" stroke="#6a5e52" stroke-width="1" opacity=".5"/>' +
      '<path d="M18 116 Q100 84 206 26" fill="none" stroke="#d8ccb0" stroke-width="2.8" stroke-linecap="round"/><path d="M18 116 L36 108" stroke="#efe6d0" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M196 34 Q210 22 220 26" fill="none" stroke="#b8f0d8" stroke-width="1.6" opacity=".7"/><circle cx="200" cy="30" r="2.4" fill="#e0fff0" opacity=".7"/>' +
      '<path d="M50 104 Q34 96 22 102 Q34 88 56 94" fill="#3a2a40" opacity=".35"/><path d="M150 64 Q176 70 194 62" fill="none" stroke="#6a4a7a" stroke-width="5" opacity=".2"/>'),
  };
  globalThis.B3C6_ART = B3C6_ART;
  const put = (key, kind, label) => { if (typeof ART !== 'undefined') { ART['item/' + key] = B3C6_ART[kind](label); ART_SIZE['item/' + key] = kind === 'axe' ? [200, 150] : [240, 130]; } };
  put('b3_c6_vambrace', 'vambrace', 'A Moranth chitin vambrace'); put('b3_c6_axe', 'axe', "A barge-builder's axe"); put('b3_c6_feather', 'feather', 'A Condor feather');
}
