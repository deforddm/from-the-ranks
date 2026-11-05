/* ============ Book Four: the visions' art (78) — backdrops VISBG b4v_* and b4deck, the figures FIGX b4v_* ============
   Drawn the way Books Two and Three draw theirs (56, 68b): a few strokes per place, figures in the ~32px frame lit from the left, and
   36b's drawVision laying the vision's own figure, the motes, the Deck's violet and the vignette over each backdrop. Distant and
   suggestive, never gory: the dragon in the pit is a spread dark shape and one eye; the head on the ledge is a small round in a patch
   of sun; the jade giants are tall green glows with dark mouths; what the dead do in the trenches is pale riders going down a ramp.
   Reused: lostara, leoman, toblakai, heboric, shaik (56), marrow (47b), tallow (70d), b4_c3_khundryl (73b), b4_c4_grub (74b). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Trull Sengar: Tiste Edur, tall and lean, dusky grey skin, his hair hacked off to the scalp, a torn leather harness, bare to the waist */
  b4v_trull(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.14); const sk = '#7a7e86';
    h.legs('#2a2622'); ctx.fillStyle = '#3a3026'; ctx.fillRect(-4.6, 10, 3.6, 3); ctx.fillRect(1, 10, 3.6, 3);
    poly(ctx, [[-6,-6],[6,-6],[5.2,7],[-5.2,7]], h.armor('#8a8e96', '#3a3c42')); // bare grey chest
    B2F.line(ctx, '#3a2a1a', 1.2, [[-5.4, -5.6], [4.6, 5.6]]); B2F.line(ctx, '#3a2a1a', 1, [[5, -5.6], [-3, 2]]); ctx.fillStyle = '#2a1e14'; ctx.fillRect(-5.4, 4.4, 10.8, 1.6); // the harness, torn
    ctx.fillStyle = sk; ctx.fillRect(-8.6, -5.4, 2.4, 9); ctx.fillRect(6.2, -5.4, 2.4, 9); ell(ctx, -7.4, 4, 1.4, 1.3, sk); ell(ctx, 7.4, 4, 1.4, 1.3, sk);
    if (o.chained) { ctx.fillStyle = '#4a4a50'; ctx.fillRect(-8.9, 1.6, 3, 1.6); ctx.fillRect(5.9, 1.6, 3, 1.6); }
    h.head(sk, 4.3, -11.6); h.look('rgba(10,12,16,.9)', -11.9); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(-3, -15.6, 3, .8);
    ctx.fillStyle = 'rgba(20,20,24,.55)'; ctx.beginPath(); ctx.arc(0, -12.6, 4.5, Math.PI*1.02, Math.PI*1.98); ctx.fill(); // the stubble where the hair was
    ctx.restore(); },
  /* Onrack: a T'lan Imass, short and broad, hide over bone, a stone sword, an arm set wrong, the jaw bound on, two dim points of light */
  b4v_onrack(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.12, .9); const bone = '#8a7a62', hide = '#5a4a36';
    h.legs('#3a2e22'); poly(ctx, [[-7,-6],[7,-6],[7.6,7],[-7.6,7]], h.armor('#6a5840', '#241c12')); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let i=0;i<3;i++) ctx.fillRect(-6.6, -3 + i*3.2, 13.2, .6); // hide wrappings, rotted
    ctx.fillStyle = hide; ctx.fillRect(-9.6, -5.4, 2.8, 7); ctx.save(); ctx.translate(8.2, -5); ctx.rotate(.5); ctx.fillRect(-1.4, 0, 2.8, 8); ctx.restore(); // one arm set wrong
    ell(ctx, -8.2, 2.2, 1.6, 1.4, bone);
    B2F.line(ctx, '#7a7670', 2.2, [[-8.4, 2], [-9.6, 12]], 'butt'); B2F.line(ctx, '#5a5650', 1, [[-9.6, 2.6], [-7.2, 2]]); // the stone sword, low
    h.head(bone, 4.4, -10.6); ctx.fillStyle = 'rgba(30,20,10,.6)'; ctx.fillRect(-2.6, -12.6, 6.4, 2.4); // the brow ridge, the sockets
    ctx.fillStyle = `rgba(200,220,255,${.6 + (o.still ? 0 : Math.sin(t/500)*.2)})`; ctx.fillRect(-1, -11.8, 1, 1); ctx.fillRect(2.2, -11.8, 1, 1); // two dim points
    B2F.line(ctx, '#3a2a18', .7, [[-3.6, -8.6], [4, -6.4]]); B2F.line(ctx, '#3a2a18', .7, [[-3.4, -6.4], [3.8, -8.8]]); // the jaw bound on
    ctx.fillStyle = '#3a3026'; ctx.beginPath(); ctx.arc(0, -12.4, 4.6, Math.PI*1.1, Math.PI*1.9); ctx.fill(); // a few hanks of old hair
    ctx.restore(); },
  /* Pearl: a lean man in plain dark travelling clothes, nothing to mark him, a small smile */
  b4v_pearl(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.06);
    h.legs('#1e1c1e'); B2F.robe(ctx, h, '#3a383e', '#141216', 5.6, 6.6); ctx.fillStyle = '#100e10'; ctx.fillRect(-5.6, 2.6, 11.2, 1.1);
    h.head('#b8967a', 4.2, -11.4); h.look('rgba(20,14,10,.9)', -11.7); ctx.fillStyle = 'rgba(60,30,20,.4)'; ctx.fillRect(.4, -8.6, 2.6, .5);
    B2F.cap(ctx, '#2a2018', 4.4, -12.6); ctx.restore(); },
  /* Havok: a Jhag horse, huge and rangy, dun, long-headed, a mane as white as snow; side-on, facing right */
  b4v_havok(ctx, h, t, o){ ctx.save(); const g = o.still ? 0 : Math.sin(t/150 + (o.phase || 0)), coat = '#8a6e46', dk = '#3a2c18', mane = '#f2eee4';
    B2F.line(ctx, mane, 2.2, [[-10.4, -3.6], [-13.4, 0], [-13 - g, 7]]); // the tail, white too
    ctx.strokeStyle = dk; ctx.lineWidth = 2.4; [[-7.6, g], [-5, -g], [5.4, -g], [8, g]].forEach(([x, k]) => { ctx.beginPath(); ctx.moveTo(x, 1); ctx.lineTo(x + k*2.4, 7); ctx.lineTo(x + k*1.6, 12.6); ctx.stroke(); }); // long legs
    ell(ctx, 0, -2, 11, 5, coat); ell(ctx, -1, 1, 9, 2, 'rgba(0,0,0,.2)'); ell(ctx, -3, -5, 6, 1.4, 'rgba(255,230,190,.2)'); // the barrel
    poly(ctx, [[6.4,-5.6],[10,-15],[12.6,-17],[14.2,-15.4],[10.6,-6],[9,-1]], coat); // the neck
    ctx.save(); ctx.translate(13, -16.4); ctx.rotate(.55); ell(ctx, 2.6, 0, 4.8, 2, coat); ctx.fillStyle = '#1a1208'; ctx.fillRect(1, -1.2, 1, .9); ctx.fillRect(6.2, .4, .8, .8); poly(ctx, [[-.6,-1.6],[.4,-4],[1.4,-1.6]], coat); ctx.restore(); // the long head, an ear
    poly(ctx, [[6,-6.4],[9.4,-15.6],[12.4,-18],[11.4,-14.6],[8.6,-6.6],[8.2,-3.6]], mane); for (let i=0;i<4;i++) B2F.line(ctx, mane, .8, [[8.6 - i*.7, -8 - i*2], [6.6 - i*.8 - g*.4, -5.6 - i*2]]); // the white mane, blowing
    ctx.restore(); },
  /* Heboric after the dream: the old priest, Treach's stripes on his arms, hands of jade at the wrists with a light moving in them */
  b4v_heboric_jade(ctx, h, t, o){ FIGX.heboric(ctx, h, t, o); const p = o.still ? .6 : .55 + Math.sin(t/400)*.2;
    ctx.fillStyle = 'rgba(20,14,8,.7)'; for (let i=0;i<3;i++){ ctx.fillRect(-8.4, -3 + i*2, 2.4, .6); ctx.fillRect(6, -3 + i*2, 2.4, .6); } // the stripes
    glow(ctx, -7.2, 3.6, 6, '#7aeaa0', .35*p); glow(ctx, 7.2, 3.6, 6, '#7aeaa0', .35*p);
    ell(ctx, -7.2, 3.8, 1.8, 2.4, `rgba(110,210,150,${.75})`); ell(ctx, 7.2, 3.8, 1.8, 2.4, `rgba(110,210,150,${.75})`); ctx.fillStyle = 'rgba(220,255,230,.6)'; ctx.fillRect(-7.8, 2.6, .6, 1.6); ctx.fillRect(6.6, 2.6, .6, 1.6); },
  /* Sha'ik in her predecessor's armour: a small figure in close dark scale, gauntlets, the visored helm with its web of chain */
  b4v_shaik_armour(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .86, .88);
    h.legs('#1a1618'); poly(ctx, [[-5.8,-6],[5.8,-6],[6.4,9],[-6.4,9]], h.armor('#4a4248', '#121014')); ctx.strokeStyle = 'rgba(160,150,170,.25)'; ctx.lineWidth = .4; ctx.beginPath(); for (let i=0;i<6;i++){ ctx.moveTo(-5.8, -4.4 + i*2.2); ctx.lineTo(5.8, -4.4 + i*2.2); } ctx.stroke(); // close scale
    ctx.fillStyle = '#2a2428'; ctx.fillRect(-8, -5.4, 2.4, 8); ctx.fillRect(5.6, -5.4, 2.4, 8); ell(ctx, -6.8, 3, 1.6, 1.5, '#3a3238'); ell(ctx, 6.8, 3, 1.6, 1.5, '#3a3238'); // gauntlets
    ctx.beginPath(); ctx.arc(0, -11.6, 5.2, Math.PI, 0); ctx.fillStyle = h.armor('#5a525a', '#16121a'); ctx.fill(); ctx.fillRect(-5.2, -11.6, 10.4, 5.4); // the helm
    ctx.fillStyle = '#060406'; ctx.fillRect(-3.6, -11.4, 7.2, 1.6); ctx.fillStyle = 'rgba(190,184,200,.55)'; for (let x=-3.4;x<=3.4;x+=1.1) for (let y=-11.2;y<=-6.2;y+=1.1) ctx.fillRect(x, y, .45, .45); // the web of chain over the slits
    ctx.restore(); },
  /* Gamet as he wakes: an old Fist in Malazan armour, grey-bearded, a little pale at the edges */
  b4v_gamet(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.04);
    h.legs('#3a3a40'); h.torso('#7a8088', '#2a2e34', 6.6); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<4;i++){ ctx.moveTo(-6, -3.6 + i*2.4); ctx.lineTo(6, -3.6 + i*2.4); } ctx.stroke(); // mail, banded
    ctx.fillStyle = '#5a4630'; ctx.fillRect(-6.6, 3.4, 13.2, 1.3); ctx.fillStyle = '#a89a6a'; ctx.fillRect(-6.6, -6, 2.6, 1.6); // a Fist's plain shoulder-knot
    h.head('#c0a48c', 4.4, -11.2); h.look('rgba(24,16,12,.8)', -11.5);
    poly(ctx, [[-3.4,-9.6],[4.2,-9.6],[3.6,-6.6],[.6,-5.4],[-2.4,-6.4]], '#b8b4ac'); // a grey beard
    h.capHelm('#5a5e64'); ctx.fillStyle = 'rgba(230,236,255,.14)'; ctx.fillRect(-3.8, -16, 3, 1);
    h.sword('#c8ccd0'); ctx.restore();
    ctx.strokeStyle = 'rgba(200,214,240,.22)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(0, -2, 9, 16, 0, 0, 7); ctx.stroke(); }, // the pale edge of him
  /* the Burned Tears' dead woman: dark-skinned, blue-eyed, black tears on her cheeks, hide and a lance; drawn pale by the backdrop */
  b4v_tearswoman(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1.06);
    B2F.line(ctx, '#4a3420', 1.2, [[8.4, 12.6], [10, -22]], 'butt'); poly(ctx, [[10.1,-27],[9.2,-22],[10.9,-22]], '#d0c8b4');
    h.legs('#2a2018'); poly(ctx, [[-6,-6],[6,-6],[6.8,8],[-6.8,8]], h.armor('#6a4a30', '#20140c')); ctx.fillStyle = 'rgba(214,190,140,.45)'; for (let i=0;i<6;i++) ctx.fillRect(-5.4 + i*2, 6.4, .5, 2);
    h.head('#5a3a26', 4.3, -11.3); ctx.fillStyle = 'rgba(140,190,255,.95)'; ctx.fillRect(-.9, -11.6, 1.2, 1); ctx.fillRect(2, -11.6, 1.2, 1); // the blue eyes
    ctx.fillStyle = '#060404'; ctx.fillRect(-.6, -10.4, .7, 2.2); ctx.fillRect(2.4, -10.4, .7, 2.2); // the black tears
    B2F.cap(ctx, '#0a0604', 4.6, -12.7); B2F.braids(ctx, '#0a0604', 9, -12.6); ctx.restore(); },
  /* the old soldier of the 9th who reads for a finger of rum: grey, stooped, a soldier's jerkin gone soft, his helm off, a tin cup */
  b4v_oldninth(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, .96); ctx.translate(0, .6); ctx.rotate(.04);
    h.legs('#3a3228'); h.torso('#6a5e48', '#2a241a', 6.4); ctx.fillStyle = '#4a3a26'; ctx.fillRect(-6.4, 3.4, 12.8, 1.3); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(-1, -5, 2, 9); // the jerkin, worn soft
    ctx.fillStyle = '#9a7e66'; ctx.fillRect(5.6, -3.6, 2.4, 6); ell(ctx, 7, 3, 1.4, 1.3, '#a88a70'); ctx.fillStyle = '#9a9a98'; ctx.fillRect(6.2, 1, 2.6, 2.8); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(6.4, 1.2, .6, 2.2); // the tin cup
    h.head('#b8987e', 4.3, -11); h.look('rgba(30,20,14,.85)', -11.2); ctx.fillStyle = 'rgba(80,50,40,.35)'; ctx.fillRect(-2.6, -8.2, 6, .5); // a lined face
    ctx.fillStyle = 'rgba(200,198,190,.75)'; for (let i=0;i<9;i++) ctx.fillRect(-3 + i*.8, -8 + (i%2)*.4, .4, 1.1); // grey stubble
    B2F.cap(ctx, '#b8b4aa', 4.4, -12.4, 1.05, 1.95); ctx.restore(); },
});

/* ---------------- backdrop helpers ---------------- */
const B4VB = {
  sky(ctx, W, y, stops){ ctx.fillStyle = vgrad(ctx, 0, y, stops); ctx.fillRect(0, 0, W, y + 1); },
  /* the sea: a flat band with slow swells, lit from above */
  sea(ctx, W, H, y, c1, c2, T, seed = 1){ ctx.fillStyle = vgrad(ctx, y, H, [[0, c1], [1, c2]]); ctx.fillRect(0, y, W, H - y);
    ctx.strokeStyle = 'rgba(220,226,232,.12)'; ctx.lineWidth = 1; for (let i=0;i<22;i++){ const yy = y + Math.pow(hash(i, seed), 1.6)*(H - y), d = (yy - y)/(H - y + 1), x = (hash(i, seed + 1)*W + (REDUCE() ? 0 : T*.004*(1 + d))) % (W + 40) - 20, w = 8 + d*40; ctx.beginPath(); ctx.moveTo(x, yy); ctx.quadraticCurveTo(x + w/2, yy - 1 - d*2, x + w, yy); ctx.stroke(); } },
  /* flat ash, with drifts */
  ash(ctx, W, H, y, c, T){ ctx.fillStyle = c; ctx.fillRect(0, y, W, H - y); for (let i=0;i<40;i++) ell(ctx, hash(i, 31)*W, y + hash(i, 32)*(H - y), 8 + hash(i, 33)*30, 1.2, 'rgba(30,28,26,.16)'); },
  /* a horse running far off, a silhouette (dir 1 faces right) */
  horse(ctx, x, y, s, col, T, ph = 0, dir = 1, mane = null){ ctx.save(); ctx.translate(x, y); ctx.scale(dir*s, s); const g = REDUCE() ? 0 : Math.sin(T/110 + ph);
    ell(ctx, 0, -6, 6.4, 2.6, col); poly(ctx, [[4,-7],[6.6,-11.6],[9,-12],[9.6,-10.6],[6.6,-6]], col);
    ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.beginPath(); [[-4.4, g], [-3, -g], [3, -g], [4.4, g]].forEach(([lx, k]) => { ctx.moveTo(lx, -4.6); ctx.lineTo(lx + k*2.2, 0); }); ctx.moveTo(-6.2, -6.6); ctx.lineTo(-9, -4 - g); ctx.stroke();
    if (mane) poly(ctx, [[4,-7.6],[6.4,-12],[7.6,-12.4],[6,-8]], mane); ctx.restore(); },
  /* a fire glow on the ground */
  fire(ctx, x, y, T, k = 1, col = '#ff8a30'){ const f = REDUCE() ? 1 : .86 + Math.sin(T/120 + x)*.07 + Math.sin(T/47)*.05; glow(ctx, x, y - 4*k, 40*k, col, .3*f); poly(ctx, [[x - 4*k, y],[x - 1.6*k, y - 9*k*f],[x, y - 3.6*k],[x + 1.8*k, y - 11*k*f],[x + 4*k, y]], '#e0642a'); poly(ctx, [[x - 2*k, y],[x, y - 6*k*f],[x + 2*k, y]], '#ffc060'); },
  /* a lamp with a halo */
  lamp(ctx, x, y, T, r = 40, a = .35, col = '#ffc070'){ const f = REDUCE() ? 1 : .9 + Math.sin(T/160)*.05 + Math.sin(T/53)*.03; glow(ctx, x, y, r, col, a*f); ctx.fillStyle = '#ffe0a0'; ctx.fillRect(x - 1.2, y - 2, 2.4, 3); },
  /* butterflies: pale flecks rising and settling */
  wings(ctx, W, x0, x1, y0, y1, T, n, a = .8){ for (let i=0;i<n;i++){ const ph = hash(i, 71)*6.3, sp = .4 + hash(i, 72), x = x0 + ((hash(i, 73)*(x1 - x0) + (REDUCE() ? 0 : Math.sin(T/1400*sp + ph)*16))), y = y0 + hash(i, 74)*(y1 - y0) + (REDUCE() ? 0 : Math.sin(T/600*sp + ph)*6), fl = REDUCE() ? 1 : .4 + Math.abs(Math.sin(T/90*sp + ph))*.6;
    ctx.fillStyle = `rgba(240,238,228,${a*(.5 + hash(i, 75)*.5)})`; ctx.fillRect(x - 1.4*fl, y - .6, 1.2*fl, 1.4); ctx.fillRect(x + .2, y - .6, 1.2*fl, 1.4); } },
};

Object.assign(VISBG, {
  /* the Nascent: a low grey sky, a grey sea to every edge, a long wall running out of the foreground to the horizon, things set into its
     face far along it. Steps 0-3: Trull chained in the face, the sea at his waist; from step 2 Onrack on the ledge above; step 4 the top of
     the wall, Onrack walking with Trull over his shoulder. */
  b4v_nascent(ctx, W, H, T, v){ const s = v.step || 0, top = s >= 4;
    B4VB.sky(ctx, W, H*.5, [[0, '#4a4e56'], [1, '#8a8e92']]); for (let i=0;i<3;i++) cloud(ctx, W*(.18 + i*.32), H*(.14 + i*.06), W*.34, 3, '#6a6e76', .16);
    B4VB.sea(ctx, W, H, H*.5, '#6a7076', '#2a3036', T, 3);
    if (!top) { // the wall's face, in front of us, running away to the right
      poly(ctx, [[0, H*.06],[W*.62, H*.36],[W, H*.47],[W, H*.5],[W*.62, H*.56],[0, H*.72]], '#3e3c3a'); poly(ctx, [[0, H*.02],[W*.62, H*.34],[W, H*.46],[W, H*.47],[W*.62, H*.36],[0, H*.06]], '#5a5652');
      ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = .8; for (let i=0;i<10;i++){ const x = W*i/10; ctx.beginPath(); ctx.moveTo(x, H*(.06 + i*.03)); ctx.lineTo(x, H*(.72 - i*.017)); ctx.stroke(); }
      for (let i=0;i<5;i++){ const x = W*(.34 + i*.12), y = H*(.48 - i*.012); ell(ctx, x, y, 2.6 - i*.3, 4 - i*.5, 'rgba(14,14,16,.7)'); } // the other things in the wall, far along it
      const tx = W*.2, ty = H*.62; for (const dx of [-12, 12]) { B2F.line(ctx, '#2a2a2e', 1.2, [[tx + dx, ty - 38], [tx + dx*.7, ty - 24]]); } // the chains into the stone
      drawFigure(ctx, 'b4v_trull', tx, ty, 2.2, T, {still:true, chained:true});
      const wl = H*(.6 - Math.min(s, 3)*.004); ctx.fillStyle = 'rgba(70,78,84,.86)'; ctx.fillRect(0, wl, W, H - wl); ctx.strokeStyle = 'rgba(220,226,232,.25)'; ctx.beginPath(); ctx.moveTo(0, wl); for (let x=0;x<=W;x+=8) ctx.lineTo(x, wl + Math.sin(x/14 + (REDUCE() ? 0 : T/700))*1.2); ctx.stroke(); // the sea at his waist
      if (s >= 2) { ctx.fillStyle = '#3a3834'; ctx.fillRect(W*.28, H*.18, W*.14, 4); drawFigure(ctx, 'b4v_onrack', W*.34, H*.17, 1.9, T, {still:s < 3, dir:-1}); } // the ledge, and the Imass on it
      if (s === 1) { ctx.fillStyle = 'rgba(40,40,44,.6)'; ctx.fillRect(W*.4, H*.2, 4, 2); }
      return {}; }
    // the top of the wall, running away to the horizon; Onrack walking along it, Trull over his shoulder
    poly(ctx, [[W*.1, H],[W*.58, H*.5],[W*.62, H*.5],[W*.62 + W*.02, H*.5],[W*.9, H]], '#4e4a46'); poly(ctx, [[W*.1, H],[W*.58, H*.5],[W*.6, H*.5],[W*.24, H]], '#3a3734');
    const ox = W*.44 + (REDUCE() ? 0 : Math.sin(T/3000)*4), oy = H*.8; drawFigure(ctx, 'b4v_onrack', ox, oy, 2.2, T, {dir:1, phase:1});
    ctx.save(); ctx.translate(ox + 4, oy - 24); ctx.rotate(-Math.PI/2); drawFigure(ctx, 'b4v_trull', 0, 0, 1.6, T, {still:true, air:true}); ctx.restore(); // over its shoulders, head down its back
    return {}; },

  /* the Imperial Warren: ash to every edge, an ash sky, the stumps of walls. Steps 1-2 the pit and the pinned shape in it (step 2 the eye);
     steps 3-4 a ledge with one patch of sun on it and a small dark round in the light. Lostara and Pearl in the foreground. */
  b4v_impwarren(ctx, W, H, T, v){ const s = v.step || 0, pit = s === 1 || s === 2, ledge = s >= 3;
    B4VB.sky(ctx, W, H*.56, [[0, '#6a6864'], [1, '#9a9690']]); for (let i=0;i<3;i++) cloud(ctx, W*(.2 + i*.3), H*(.16 + i*.05), W*.3, 3, '#7a7874', .14);
    B4VB.ash(ctx, W, H, H*.56, '#7a7672', T);
    for (let i=0;i<6;i++){ const x = W*(.04 + i*.17 + hash(i, 34)*.05), h = H*(.05 + hash(i, 35)*.1); ctx.fillStyle = '#56524e'; ctx.fillRect(x, H*.56 - h, 5 + hash(i, 36)*9, h); }
    for (let i=0;i<14;i++){ const x = (hash(i, 37)*W + (REDUCE() ? 0 : T*.01)) % W, y = H*(.1 + hash(i, 38)*.8); ctx.fillStyle = 'rgba(200,196,190,.35)'; ctx.fillRect(x, y, 1.2, 1.2); } // ash in the air
    if (pit) { const px = W*.66, py = H*.76; ell(ctx, px, py, W*.32, H*.17, '#5a5650'); ell(ctx, px, py + 3, W*.29, H*.14, '#1c1a18');
      ctx.save(); ctx.translate(px, py + 3); ctx.scale(1, .5); // the pinned shape, far down, wings spread
      const dc = '#6a645a'; poly(ctx, [[0,-8],[-W*.25,-30],[-W*.2,-14],[-W*.26, 2],[-W*.16, 4],[-W*.24, 22],[-8, 8],[8, 8],[W*.24, 22],[W*.16, 4],[W*.26, 2],[W*.2,-14],[W*.25,-30]], dc);
      ctx.strokeStyle = 'rgba(20,18,16,.6)'; ctx.lineWidth = 1; ctx.beginPath(); [-1, 1].forEach(k => { ctx.moveTo(0, -6); ctx.lineTo(k*W*.25, -30); ctx.moveTo(0, -4); ctx.lineTo(k*W*.26, 2); ctx.moveTo(0, 0); ctx.lineTo(k*W*.24, 22); }); ctx.stroke(); // the wing-bones
      ell(ctx, 0, 0, 13, 26, '#76705e'); B2F.line(ctx, dc, 7, [[0, -22], [-18, -44], [-34, -50]]); ell(ctx, -38, -51, 7, 4, dc); B2F.line(ctx, dc, 5, [[0, 24], [10, 40], [26, 44]]);
      ctx.fillStyle = '#1a1816'; [[-W*.23,-27],[W*.23,-27],[-W*.24, 2],[W*.24, 2],[-W*.21, 19],[W*.21, 19],[-8, 8],[8, 8]].forEach(([x, y]) => { ctx.fillRect(x - 2, y - 2, 4, 4); }); // the iron
      if (s === 2) { const o = REDUCE() ? 1 : Math.min(1, ((T % 9000)/2400)); glow(ctx, -38, -52, 12, '#d8c07a', .45*o); ell(ctx, -38, -52, 2.6, 1.4*o + .2, `rgba(230,210,130,${.95*o})`); }
      ctx.restore();
      if (s === 2 && !REDUCE()) { const a = .08 + Math.abs(Math.sin(T/1600))*.06; ell(ctx, px, py, W*.28, H*.11, `rgba(200,210,190,${a})`); } }
    if (ledge) { const lx = W*.7, ly = H*.44; poly(ctx, [[lx - 34, ly + 4],[lx + 30, ly],[lx + 38, ly + 30],[lx - 40, ly + 34]], '#5a5650'); ctx.fillStyle = '#6a6660'; ctx.fillRect(lx - 34, ly, 68, 4);
      const sun = s === 4 ? .5 + (REDUCE() ? 0 : Math.sin(T/2000)*.1) : 1; ctx.fillStyle = `rgba(255,226,150,${.22*sun})`; poly(ctx, [[lx - 14, 0],[lx + 6, 0],[lx + 16, ly],[lx - 12, ly]], ctx.fillStyle); glow(ctx, lx, ly, 30, '#ffe0a0', .4*sun);
      ell(ctx, lx, ly - 2.6, 3.2, 3.4, '#3a2e26'); } // the head, small, in the light
    drawFigure(ctx, 'b4v_pearl', W*.3, H*.92, 2.1, T, {dir:ledge ? 1 : -1, still:pit, phase:2});
    return {fx:W*.16, fy:H*.92, fs:2.2}; },

  /* the Jhag Odhan: a huge pale sky, grey-gold grass. Step 1 dust on the horizon; steps 2-3 the herd round him; step 3 the white-maned
     stallion near; step 4 (no vision figure) Karsa on Havok, running, the herd gone into its dust. */
  b4v_jhag(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.62, [[0, '#8aa0b4'], [1, '#e8d8b0']]); glow(ctx, W*.8, H*.2, W*.3, '#fff0c8', .25);
    ctx.fillStyle = vgrad(ctx, H*.6, H, [[0, '#b09a6a'], [1, '#6a5a3a']]); ctx.fillRect(0, H*.6, W, H*.4); B3VB.grass(ctx, W, H*.66, H, T, 80, 'rgba(70,56,30,.4)', 23);
    if (s >= 1) B3VB.dust(ctx, W*.6, H*.6, W*.8, H*.24, T, s === 1 ? .3 : .22, 3);
    if (s === 1) for (let i=0;i<30;i++) B4VB.horse(ctx, W*(.3 + hash(i, 51)*.6), H*(.6 + hash(i, 52)*.02), .7, 'rgba(50,40,26,.75)', T, i, -1);
    if (s === 2 || s === 3) { for (let i=0;i<46;i++){ const r = hash(i, 53), a = (REDUCE() ? 0 : T/9000) + i*.4, x = W*(.5 + Math.cos(a)*(.22 + r*.3)), y = H*(.68 + Math.sin(a)*.05 + r*.2), sc = .9 + (y/H - .6)*3; B4VB.horse(ctx, x, y, sc, `rgba(${60 + Math.round(r*40)},${48 + Math.round(r*30)},30,.85)`, T, i, Math.sin(a) > 0 ? -1 : 1); }
      if (s === 3) drawFigure(ctx, 'b4v_havok', W*.5, H*.84, 2.4, T, {still:true, dir:-1}); }
    if (s === 4) { B3VB.dust(ctx, W*.15, H*.62, W*.3, H*.14, T, .18, 8); for (let i=0;i<14;i++) B4VB.horse(ctx, W*(.04 + hash(i, 54)*.24), H*.61, .55, 'rgba(60,48,30,.6)', T, i, -1);
      const rx = W*.56 + (REDUCE() ? 0 : Math.sin(T/1800)*6), ry = H*.84; drawFigure(ctx, 'toblakai', rx - 1, ry - 30, 1.25, T, {still:true, air:true}); drawFigure(ctx, 'b4v_havok', rx, ry, 2.6, T, {phase:1}); }
    return {fx:W*.3, fy:H*.86, fs:1.8}; },

  /* the Malazan camp from the fold of ground: a ring of wagons and cook-fires far off, riders in the dark. Step 2 the lamps going over and
     the wagons burning; step 3 the column's horse coming out after them; step 4 dawn in the hills, a thin smoke far off. */
  b4v_camp(ctx, W, H, T, v){ const s = v.step || 0, dawn = s >= 4;
    B4VB.sky(ctx, W, H*.58, dawn ? [[0, '#4a5a7a'], [1, '#e0b080']] : [[0, '#06060e'], [1, '#1a1628']]); if (!dawn) B3VB.stars(ctx, W, H, T, 50, .5, .6, 41);
    ctx.fillStyle = dawn ? '#6a4e34' : '#100c10'; ctx.fillRect(0, H*.58, W, H*.42);
    const cx = W*.62, cy = H*.6, burn = s === 2 || s === 3;
    if (!dawn) { for (let i=0;i<16;i++){ const a = i/16*Math.PI*2, x = cx + Math.cos(a)*W*.2, y = cy + Math.sin(a)*H*.035; ctx.fillStyle = '#1e1816'; ctx.fillRect(x - 6, y - 5, 12, 5); ctx.fillStyle = 'rgba(232,146,58,.35)'; ctx.fillRect(x - 6, y - 5, 12, 1); if (burn && hash(i, 61) > .35) B4VB.fire(ctx, x, y - 4, T, .9); }
      for (let i=0;i<5;i++) glow(ctx, cx + (hash(i, 62) - .5)*W*.24, cy, 12, '#e8923a', .3); }
    else { ctx.strokeStyle = 'rgba(120,110,100,.45)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy); for (let k=0;k<10;k++) ctx.lineTo(cx + Math.sin(k + (REDUCE() ? 0 : T/2000))*4 + k*2, cy - k*H*.05); ctx.stroke(); }
    if (s === 2) for (let i=0;i<10;i++){ const p = ((REDUCE() ? .5 : T/1400) + hash(i, 63)) % 1, x0 = W*(.2 + hash(i, 64)*.2), x = x0 + (cx - x0 + (hash(i, 65) - .5)*W*.3)*p, y = H*.72 - Math.sin(p*Math.PI)*H*.3 + (cy - H*.72)*p; glow(ctx, x, y, 6, '#ffb050', .7); ctx.fillStyle = '#ffd890'; ctx.fillRect(x - 1, y - 1, 2, 2); } // the lamps turning over in the dark
    if (s === 3) for (let i=0;i<22;i++){ const x = cx - W*.12 - ((REDUCE() ? 0 : T*.02) + hash(i, 66)*W*.3) % (W*.5), y = H*(.64 + hash(i, 67)*.08); B3VB.rider(ctx, x, y, 1.2, '#2a2420', T, i, -1, true); }
    ctx.fillStyle = dawn ? '#4a3622' : '#08070a'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H*.72); ctx.quadraticCurveTo(W*.3, H*.64, W*.5, H*.8); ctx.lineTo(W*.5, H); ctx.fill(); // the fold of ground
    if (s <= 1) for (let i=0;i<9;i++) B3VB.rider(ctx, W*(.08 + i*.045), H*(.8 + hash(i, 68)*.04), 1.4, '#050406', T, i, 1, false);
    if (s === 1) for (let i=0;i<9;i++) glow(ctx, W*(.08 + i*.045), H*.76, 4, '#ff9040', .5);
    if (dawn) for (let i=0;i<8;i++) B3VB.rider(ctx, W*(.1 + i*.05), H*.84, 1.3, '#2a1e14', T, i, -1, false);
    return {fx:W*.36, fy:H*.9, fs:2.2}; },

  /* Heboric's night: step 0 the tent and its haloed lamp; steps 1-2 the grey with the jade giants going one way, something far ahead
     falling (step 2 the tiger in front of him); step 3 the tent again, waking, the stripes and the jade hands on the vision's figure. */
  b4v_raraku_dream(ctx, W, H, T, v){ const s = v.step || 0, dream = s === 1 || s === 2;
    if (!dream) { ctx.fillStyle = vgrad(ctx, 0, H, [[0, '#1a1210'], [1, '#0a0806']]); ctx.fillRect(0, 0, W, H); poly(ctx, [[0, 0],[W*.5, H*.08],[W, 0]], '#2a1e16');
      B4VB.lamp(ctx, W*.66, H*.5, T, s === 0 ? W*.32 : W*.22, s === 0 ? .4 : .28); ctx.fillStyle = '#140e0a'; ctx.fillRect(0, H*.84, W, H*.16); for (let i=0;i<5;i++) ell(ctx, W*(.5 + i*.1), H*.86, 18, 4, 'rgba(90,40,30,.3)');
      if (s === 3) glow(ctx, W*.1, H*.4, W*.3, '#e8c890', .12);
      return {fx:W*.34, fy:H*.86, fs:2.3}; }
    ctx.fillStyle = vgrad(ctx, 0, H, [[0, '#4a4c4a'], [1, '#2a2c2a']]); ctx.fillRect(0, 0, W, H);
    const giants = [...Array(16).keys()].map(i => ({i, d:hash(i, 81)})).sort((a, b) => b.d - a.d); // far ones first
    giants.forEach(({i, d}) => { const x = ((W*(hash(i, 82)*1.3 - .15)) + (REDUCE() ? 0 : T*.004*(1.2 - d))) % (W*1.3) - W*.15, y = H*(.62 + (1 - d)*.34), hh = H*(.22 + (1 - d)*.36), ww = hh*.26, a = .22 + (1 - d)*.4, c = `rgba(96,196,140,${a*.75})`, cl = `rgba(150,230,180,${a*.5})`;
      glow(ctx, x, y - hh*.5, hh*.5, '#5ac88a', a*.18);
      poly(ctx, [[x - ww*.5, y - hh*.78],[x + ww*.5, y - hh*.78],[x + ww*.36, y - hh*.38],[x + ww*.3, y],[x + ww*.06, y],[x, y - hh*.3],[x - ww*.06, y],[x - ww*.3, y],[x - ww*.36, y - hh*.38]], c); // the body, legs, perfect and plain
      B2F.line(ctx, c, ww*.16, [[x - ww*.5, y - hh*.76], [x - ww*.62, y - hh*.4]]); B2F.line(ctx, c, ww*.16, [[x + ww*.5, y - hh*.76], [x + ww*.62, y - hh*.4]]); // arms
      ell(ctx, x, y - hh*.88, ww*.22, ww*.26, c); ell(ctx, x - ww*.08, y - hh*.92, ww*.06, ww*.1, cl); ell(ctx, x, y - hh*.84, ww*.07, ww*.11, `rgba(8,18,12,${Math.min(.9, a*1.6)})`); }); // the head, and the open mouth
    const fy = ((REDUCE() ? .4 : T/5000) % 1); B2F.line(ctx, 'rgba(230,240,230,.35)', 2, [[W*.86, H*(fy*.8)], [W*.88, H*(fy*.8 + .14)]]); glow(ctx, W*.88, H*(fy*.8 + .14), 14, '#e8f0e0', .25); // far ahead, something falling
    if (s === 2) { glow(ctx, W*.62, H*.74, W*.2, '#e0a040', .12); ctx.save(); ctx.translate(W*.62, H*.9); ctx.scale(2.8, 2.8); const g = REDUCE() ? 0 : Math.sin(T/400); // the tiger, side-on, facing him
      ell(ctx, 0, -8, 12, 5, '#b8904a'); poly(ctx, [[-10,-10],[-15,-12],[-17,-8],[-15,-5],[-10,-6]], '#b8904a'); ctx.fillStyle = '#1a1208'; for (let i=0;i<6;i++) ctx.fillRect(-6 + i*2.6, -12.6, 1, 5.6); ctx.fillRect(-14, -11, .8, 3);
      ctx.strokeStyle = '#b8904a'; ctx.lineWidth = 2.2; [[-7, g], [-4, -g], [6, -g], [9, g]].forEach(([x, k]) => { ctx.beginPath(); ctx.moveTo(x, -5); ctx.lineTo(x + k, 0); ctx.stroke(); }); B2F.line(ctx, '#b8904a', 1.6, [[11, -10], [16, -14], [18, -10]]);
      glow(ctx, -15, -9.6, 3, '#ffd060', .8); ctx.fillStyle = 'rgba(255,230,140,1)'; ctx.fillRect(-15.6, -10, 1.2, .9); ctx.restore(); }
    return {fx:W*.26, fy:H*.88, fs:2.2, air:true}; },

  /* Sha'ik's tent: lamplight, rugs, cushions, the armour on its frame with the chain over the helm's slits; from step 3 the frame is bare */
  b4v_tent(ctx, W, H, T, v){ const s = v.step || 0, worn = s >= 3;
    ctx.fillStyle = vgrad(ctx, 0, H, [[0, '#1c1214'], [1, '#0c0808']]); ctx.fillRect(0, 0, W, H); poly(ctx, [[0, 0],[W*.5, H*.12],[W, 0]], '#2e1c1a'); B2F.line(ctx, '#3a2420', 2, [[W*.5, H*.12], [W*.5, H*.84]]);
    B4VB.lamp(ctx, W*.46, H*.56, T, W*.3, .38); ctx.fillStyle = '#2a1810'; ctx.fillRect(0, H*.84, W, H*.16); for (let i=0;i<4;i++){ ctx.fillStyle = ['#5a2a22', '#3a2a4a', '#4a3a1a', '#5a2a3a'][i]; ctx.fillRect(W*(.1 + i*.22), H*(.86 + (i%2)*.03), W*.2, 4); }
    const ax = W*.78, ay = H*.84; B2F.line(ctx, '#2a1e18', 1.6, [[ax, ay], [ax, ay - 46]]); B2F.line(ctx, '#2a1e18', 1.4, [[ax - 10, ay - 38], [ax + 10, ay - 38]]);
    if (!worn) { ctx.save(); ctx.globalAlpha = .9; drawFigure(ctx, 'b4v_shaik_armour', ax, ay - 2, 2, T, {still:true, air:true, dir:-1}); ctx.restore(); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(ax - 10, ay - 30, 20, 30); } // the empty armour, on its frame
    return {fx:W*.36, fy:H*.88, fs:2.3}; },

  /* the ramps before the oasis on the night: the trenches below, the ramps going down, the dead pale round him. Step 1 Grub at his knee and
     the woman with the blue eyes; step 2 the lamp in the command tent far behind; step 3 the butterflies over the trenches; step 4 the pale
     riders going down the ramp. */
  b4v_ramps(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.42, [[0, '#04040a'], [1, '#14121e']]); B3VB.stars(ctx, W, H, T, 60, .4, .6, 47);
    ctx.fillStyle = vgrad(ctx, H*.4, H, [[0, '#18141a'], [1, '#0a080a']]); ctx.fillRect(0, H*.42, W, H*.58);
    for (let i=0;i<4;i++){ const y = H*(.5 + i*.06); ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(W*.4, y, W*.6, 3); ctx.fillStyle = 'rgba(120,110,100,.18)'; ctx.fillRect(W*.4, y - 1, W*.6, 1); for (let k=0;k<10;k++) B2F.line(ctx, 'rgba(60,50,44,.7)', .8, [[W*(.42 + k*.06), y], [W*(.43 + k*.06), y - 4]]); } // the trenches and their stakes
    poly(ctx, [[W*.3, H*.42],[W*.38, H*.42],[W*.62, H*.82],[W*.5, H*.82]], 'rgba(60,54,50,.5)'); // the main ramp, going down
    glow(ctx, W*.9, H*.44, 40, '#c8b08a', .06 + (REDUCE() ? 0 : Math.abs(Math.sin(T/2200))*.05)); // sound a league off: a stir in the dark
    if (s === 2) { ctx.fillStyle = '#100c0c'; poly(ctx, [[W*.04, H*.5],[W*.1, H*.4],[W*.16, H*.5]], '#140e0e'); B4VB.lamp(ctx, W*.1, H*.47, T, 16, .5); }
    const ghost = (k, x, y, sc, a, dir = 1, ph = 0) => { drawFigure(ctx, k, x, y, sc, T, {dir, phase:ph, still:true, alpha:a}); };
    if (s <= 3) { for (let i=0;i<8;i++){ const x = i < 4 ? W*(.03 + i*.05) : W*(.72 + (i - 4)*.07); ghost(i % 3 ? 'b2soldier' : 'b4_c3_khundryl', x, H*(.8 + hash(i, 91)*.06), 1.3, .3, i % 2 ? 1 : -1, i); }
      for (let i=0;i<4;i++) B3VB.rider(ctx, W*(.56 + i*.1), H*.72, 1.4, 'rgba(200,210,230,.26)', T, i, -1, true); ctx.fillStyle = 'rgba(190,200,230,.06)'; ctx.fillRect(0, H*.66, W, H*.34); }
    if (s === 1 || s === 2) { ghost('b4v_tearswoman', W*.54, H*.88, 2, .75, -1); ghost('b4_c4_grub', W*.4, H*.94, 2, 1, -1); }
    if (s === 3) { ghost('b4v_tearswoman', W*.46, H*.84, 1.9, .7, 1); B4VB.wings(ctx, W, W*.38, W, H*.3, H*.62, T, 70, .8); }
    if (s >= 4) { B4VB.wings(ctx, W, W*.3, W, H*.3, H*.6, T, 50, .55); for (let i=0;i<9;i++){ const p = ((REDUCE() ? .5 : T/7000) + i/9) % 1; B3VB.rider(ctx, W*(.34 + p*.26), H*(.44 + p*.36), 1 + p*.8, `rgba(210,220,240,${.12 + p*.28})`, T, i, 1, true); } }
    return {fx:s >= 4 ? W*.24 : W*.28, fy:H*.9, fs:2.2}; },

  /* the reader, back at the chapter's reading place: 1 the barracks yard in Aren at night (flagstones, a lantern); 2 a fire off the Aren Way;
     3 the Khundryl feast fires; 4 the wounded Seti's fire, the burnt wagons beyond; 5 a fire short of the Wall, its brown roar a mile off;
     6 the picket at dusk, an upturned shield; 7 the coral island at dawn, the new sea. The card lies on whatever they read on. */
  b4deck(ctx, W, H, T, v){ const ch = (VISIONS[v.id] && VISIONS[v.id].ch) || 1;
    const SK = {1:[['#05060c', '#141828']], 2:[['#0a0808', '#2a1c16']], 3:[['#0a0806', '#2a1a10']], 4:[['#080606', '#1e1410']], 5:[['#1a140c', '#5a4630']], 6:[['#2a2030', '#a0644a']], 7:[['#3a4658', '#b8a49a']]}[ch][0];
    B4VB.sky(ctx, W, H*.66, [[0, SK[0]], [1, SK[1]]]); if (ch <= 4) B3VB.stars(ctx, W, H, T, 50, .5, .6, 17 + ch);
    const gnd = {1:'#3a3630', 2:'#2a2218', 3:'#2a1e14', 4:'#1e1812', 5:'#5a4a30', 6:'#3a2e24', 7:'#8a7c70'}[ch];
    ctx.fillStyle = gnd; ctx.fillRect(0, H*.66, W, H*.34);
    if (ch === 1) { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i=0;i<8;i++){ ctx.beginPath(); ctx.moveTo(0, H*(.7 + i*.04)); ctx.lineTo(W, H*(.7 + i*.04)); ctx.stroke(); } ctx.fillStyle = '#16141a'; ctx.fillRect(0, H*.3, W, H*.36); B4VB.lamp(ctx, W*.7, H*.6, T, 50, .4); }
    else if (ch === 7) { B4VB.sea(ctx, W, H, H*.6, '#7a8894', '#4a5864', T, 9); ctx.fillStyle = '#a09080'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H*.74); ctx.quadraticCurveTo(W*.5, H*.68, W, H*.78); ctx.lineTo(W, H); ctx.fill(); for (let i=0;i<6;i++) glow(ctx, W*(.1 + i*.16), H*.66, 40, '#f0e8e0', .08); }
    else { if (ch === 5) { ctx.fillStyle = 'rgba(120,90,50,.6)'; ctx.fillRect(0, H*.36, W, H*.3); B3VB.dust(ctx, W*.5, H*.66, W, H*.3, T, .14, 5); }
      if (ch === 4) for (let i=0;i<4;i++){ ctx.fillStyle = '#0c0a08'; ctx.fillRect(W*(.62 + i*.09), H*.6, 18, 7); glow(ctx, W*(.62 + i*.09) + 9, H*.58, 8, '#a05a30', .2); }
      if (ch === 3) for (let i=0;i<4;i++) B4VB.fire(ctx, W*(.76 + i*.06), H*.7, T, .5);
      B4VB.fire(ctx, W*.66, H*.88, T, ch === 6 ? 1.2 : 1.8); }
    if (ch === 6) { ctx.save(); ctx.translate(W*.48, H*.9); ctx.scale(1, .42); ctx.beginPath(); ctx.arc(0, 0, 18, 0, 7); ctx.fillStyle = '#4a3a2a'; ctx.fill(); ctx.strokeStyle = '#7a7266'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
    ctx.save(); ctx.translate(W*.48, H*.88); ctx.rotate(-.08); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-7, -10, 14, 20); ctx.fillStyle = 'rgba(150,120,220,.5)'; ctx.fillRect(-5.4, -8.4, 10.8, 16.8); ctx.restore(); // the card
    return {fx:W*.3, fy:H*.86, fs:2.4}; },
});
