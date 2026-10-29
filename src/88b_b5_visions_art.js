/* ============ Book Five: the visions' art (88) — backdrops VISBG b5v_* and b5tiles, the figures FIGX b5v_* ============
   Drawn the way Book Four draws its visions (78b): a few strokes per place, figures in the ~32px frame lit from the left, and 36b's
   drawVision laying the vision's own figure, the motes, the violet and the vignette over each backdrop. Lether's look (80b, 80d):
   blue-grey, canal-green, lamp-gold and wet stone. Distant and suggestive, never gory: what passes under the longboat is a swell in
   the fog and nothing more; the wave at Trate is a wall of water seen from far off; the sea spirit is the sea rising, with no face;
   the pillars at Brans Keep are turning columns of dark; the Emperor is a small figure that catches the light, his sword never drawn.
   Reused: perrit (80d), b5_c1_tilewoman (81b), b5_edur, b5_wraith, b5_letherii (80d), B4VB (78b), B3VB (68b). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Trull Sengar before any of it: a Tiste Edur warrior, tall, grey-skinned, his long black hair braided down his back, a spear */
  b5v_trull(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.16);
    B2F.line(ctx, '#4a3a2a', 1.2, [[8.6, 12.6], [9.6, -21]]); poly(ctx, [[9.7,-26],[8.7,-20.6],[10.7,-20.6]], '#b8bcc4'); // the spear
    h.legs('#26262a'); h.torso('#4a4640', '#18161a', 5.8); B2F.line(ctx, '#2a2018', .9, [[-5, -6], [5, 6]]); ctx.fillStyle = '#2a2018'; ctx.fillRect(-5, 3.4, 10, 1.2); // harness, belt
    ctx.fillStyle = '#7a8088'; ctx.fillRect(-8.2, -5.4, 2.4, 9); ctx.fillRect(5.8, -5.4, 2.4, 9);
    h.head('#7a8088', 4.2, -11.4); h.look('rgba(10,10,14,.9)', -11.6);
    B2F.cap(ctx, '#0c0c10', 4.5, -12.8, 1.0, 2.0); B2F.line(ctx, '#0c0c10', 1.6, [[-3.4, -12.4], [-6.2, -4], [-6.8, 4]]); // the hair, long, braided back
    ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let i=0;i<4;i++) ctx.fillRect(-6.6 + i*.1, -8 + i*3, 1.4, .5);
    ctx.restore(); },
  /* Kuru Qan, the Ceda: a small old man in a dark robe gone soft with wear, a skullcap, hands in his sleeves */
  b5v_kuruqan(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .86, .9);
    h.legs('#1a1a1e'); B2F.robe(ctx, h, '#3a3a52', '#12121c', 6, 8); ctx.fillStyle = 'rgba(200,180,120,.35)'; ctx.fillRect(-.6, -6, 1.2, 17); // the robe, a thread of gold down it
    ell(ctx, 0, 1.6, 6, 2.2, '#2a2a40'); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-4.6, 1.2, 9.2, .8); // the hands in the sleeves
    h.head('#c0a48a', 4, -10.6); h.look('rgba(30,20,14,.85)', -10.9); ctx.fillStyle = 'rgba(90,60,40,.35)'; ctx.fillRect(-2.6, -8.2, 5.6, .5); ctx.fillRect(-2.4, -13, 5, .4); // an old face, lined
    B2F.cap(ctx, '#2a2a40', 4.2, -11.8, 1.02, 1.98); ctx.fillStyle = 'rgba(220,220,220,.6)'; ctx.fillRect(-4.2, -10.8, 1, 2.4); ctx.fillRect(3.4, -10.8, 1, 2.4); // a skullcap, white at the temples
    ctx.restore(); },
  /* Yan Tovis, Atri-Preda: a tall woman in Letherii scale and an officer's blue-grey cloak, her helm under her arm, dark hair cropped */
  b5v_yantovis(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.12);
    poly(ctx, [[-5.4,-6],[-8.6,10],[-3,9],[-2,-6]], '#4a5664'); // the cloak
    h.legs('#2a2a2c'); h.torso('#7a7a76', '#2a2a28', 5.8); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<4;i++){ ctx.moveTo(-5.4, -3.6 + i*2.4); ctx.lineTo(5.4, -3.6 + i*2.4); } ctx.stroke(); // scale
    ctx.fillStyle = '#c8b47a'; ctx.fillRect(-5.8, -6, 11.6, 1); // an officer's gilt edge
    ctx.beginPath(); ctx.arc(7.4, 1, 3.2, 0, 7); ctx.fillStyle = h.armor('#9a9a96', '#2a2a28'); ctx.fill(); ctx.fillStyle = '#1a1a1a'; ctx.fillRect(4.6, 1, 5.6, .8); // the helm under her arm
    h.head('#8a6a52', 4.1, -11.4); h.look('rgba(20,12,8,.85)', -11.6); B2F.cap(ctx, '#141012', 4.3, -12.4, 1.02, 1.98); ctx.fillRect(-4.3, -12.4, 1.2, 3);
    ctx.restore(); },
  /* Nekal Bara, sorceress of the Trate Legion: a cadre robe the colour of the sea at night, her hair bound up, sorcery round her hands */
  b5v_nekal(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1.04); const p = o.still ? .6 : .5 + Math.sin(t/220 + (o.phase || 0))*.3;
    h.legs('#141820'); B2F.robe(ctx, h, '#2a4a5a', '#0c1820', 5.6, 7.6); ctx.fillStyle = '#a8c0c8'; ctx.fillRect(-5.6, -6, 11.2, .9); // the cadre's edge
    ctx.fillStyle = '#2a4a5a'; ctx.fillRect(-8.2, -5.2, 2.4, 7); ctx.save(); ctx.translate(7, -5); ctx.rotate(-.9); ctx.fillRect(-1.2, 0, 2.4, 8); ctx.restore(); // one arm raised
    glow(ctx, 12.4, -10, 7, '#d8f0ff', .5*p); ctx.fillStyle = `rgba(230,246,255,${.7*p})`; ctx.fillRect(11.6, -10.8, 1.6, 1.6);
    h.head('#c8a890', 4, -11.2); h.look('rgba(20,20,30,.85)', -11.5); B2F.cap(ctx, '#3a2a24', 4.2, -12.4, 1.02, 1.98); ell(ctx, -.6, -16.6, 2.6, 1.8, '#3a2a24'); // hair bound up
    ctx.restore(); },
  /* Moroch Nevath, Finadd of the Prince's Guard: a hard man in good scale gone dirty, a red Guard's sash, the right leg bound.
     o.limp: walking south, no sword, a hedge-stick; otherwise on the bridge with his sword and a greave over the binding */
  b5v_moroch(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1.08); const limp = !!o.limp;
    h.legs('#2a2a2c'); ctx.fillStyle = limp ? '#8a7a64' : '#6a6a6a'; ctx.fillRect(1.1, 6.4, 3.4, 3.6); if (limp) { ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(1.1, 7.4, 3.4, .5); ctx.fillRect(1.1, 8.8, 3.4, .5); } // the bound leg
    h.torso('#7a7a76', '#262624', 6.4); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<4;i++){ ctx.moveTo(-6, -3.6 + i*2.4); ctx.lineTo(6, -3.6 + i*2.4); } ctx.stroke();
    B2F.line(ctx, '#7a2a24', 1.6, [[-6, -5.4], [5.6, 4.6]]); // the Guard's sash
    if (limp) { ctx.fillStyle = 'rgba(90,70,40,.35)'; ctx.fillRect(-6, 2, 12, 5); } // dust
    h.head('#b08a70', 4.3, -11.2); h.look('rgba(20,12,8,.85)', -11.4); ctx.fillStyle = 'rgba(40,30,24,.5)'; ctx.fillRect(-2.6, -8.4, 6, .9); // a hard mouth, stubble
    B2F.cap(ctx, '#2a2018', 4.4, -12.4, 1.02, 1.98);
    if (limp) B2F.line(ctx, '#5a4430', 1.2, [[8.2, 12.6], [7.2, -4]]); else { ctx.beginPath(); ctx.arc(0, -12.4, 5, Math.PI, 0); ctx.fillStyle = h.armor('#8a8a86', '#2a2a28'); ctx.fill(); h.sword('#d0d0cc'); }
    ctx.restore(); },
  /* Preda Unnutal Hebaz: taller than most women, fair, in her fortieth year; plain good armour, a commander's dark cloak, her hair bound back */
  b5v_preda(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.18);
    poly(ctx, [[-5.6,-6],[-9,11],[-2.6,10],[-2,-6]], '#2a2e3a'); // the cloak
    h.legs('#2a2a2e'); h.torso('#8a8c90', '#2a2c30', 6); ctx.fillStyle = '#c8b47a'; ctx.fillRect(-6, -6, 12, 1.1); ctx.fillRect(-1, -4.6, 2, 2); // a gilt edge, the Preda's badge
    h.head('#d8bca4', 4.2, -11.4); h.look('rgba(30,40,60,.85)', -11.6); B2F.cap(ctx, '#d0b070', 4.4, -12.6, 1.02, 1.98); ctx.fillStyle = '#d0b070'; ctx.fillRect(-4.6, -12, 1.4, 5); // fair hair, bound back
    if (o.sword) { B2F.line(ctx, '#d8d8d4', 1.3, [[7, -2], [10.4, -18]]); ctx.fillStyle = '#6b4f2a'; ctx.fillRect(6, -2, 2, 3); } else h.sword('#c8c8c4');
    ctx.restore(); },
  /* the Emperor, far off on the bridge: a young Edur covered in gold coins, catching the light; drawn small, never with his sword out */
  b5v_emperor(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1.12); const sh = o.still ? .5 : .5 + Math.sin(t/180 + (o.phase || 0))*.3;
    h.legs('#6a5a30'); h.torso('#a8903a', '#4a3a18', 5.6); h.head('#a89048', 4.1, -11.4); B2F.cap(ctx, '#0c0c10', 4.3, -12.8, 1.02, 1.98);
    ctx.fillStyle = `rgba(255,226,130,${.5 + sh*.4})`; for (let i=0;i<22;i++) ctx.fillRect(-5 + hash(i, 91)*10, -14 + hash(i, 92)*26, .9, .9); // the coins
    glow(ctx, 0, -2, 14, '#ffd870', .18 + sh*.12); ctx.restore(); },
});

/* ---------------- backdrop helpers ---------------- */
const B5VB = {
  /* fog: soft pale banks drifting */
  fog(ctx, W, H, y0, y1, T, a = .5, seed = 1){ for (let i=0;i<14;i++){ const x = ((hash(i, seed)*W*1.4 + (REDUCE() ? 0 : T*.006*(1 + hash(i, seed + 1)))) % (W*1.4)) - W*.2, y = y0 + hash(i, seed + 2)*(y1 - y0); ell(ctx, x, y, W*(.18 + hash(i, seed + 3)*.2), 10 + hash(i, seed + 4)*16, `rgba(210,214,216,${a*(.25 + hash(i, seed + 5)*.3)})`); } },
  /* a black Edur longboat, high in the prow, oars shipped; dir 1 faces right */
  longboat(ctx, x, y, s, dir = 1, col = '#0c0c10'){ ctx.save(); ctx.translate(x, y); ctx.scale(dir*s, s); poly(ctx, [[-30,-2],[26,-2],[34,-14],[30,-1],[24,4],[-24,4],[-32,-10]], col); ctx.fillStyle = 'rgba(0,0,0,.4)'; for (let i=0;i<8;i++) ctx.fillRect(-22 + i*6, -6, 2.2, 4); ctx.restore(); },
  /* a Letherii three-master, sails slack or full; burned: black and broken */
  ship(ctx, x, y, s, T, burned = false, full = false){ ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const hc = burned ? '#1a1614' : '#3a3026';
    poly(ctx, [[-22,0],[22,0],[18,7],[-18,7]], hc); [-10, 2, 13].forEach((mx, i) => { B2F.line(ctx, burned ? '#141010' : '#2a2018', 1, [[mx, 0], [mx, burned && i === 1 ? -14 : -26]]);
      if (!burned) { const bel = full ? 5 : 1 + (REDUCE() ? 0 : Math.sin(T/600 + i)*.8); poly(ctx, [[mx - 6, -24],[mx + 6, -24],[mx + 6 + bel, -10],[mx - 6 + bel, -10]], 'rgba(190,180,160,.75)'); }
      else if (i !== 1) poly(ctx, [[mx - 4, -22],[mx + 3, -21],[mx + 5, -12],[mx - 2, -14]], 'rgba(30,26,24,.8)'); });
    if (!burned) { glow(ctx, 20, -3, 6, '#ffc070', .4); } ctx.restore(); },
  /* a stone city's skyline in a band (towers, roofs), and fires in it */
  skyline(ctx, W, y, col, seed, fires = 0, T = 0){ ctx.fillStyle = col; for (let i=0;i<24;i++){ const x = i*W/22 - 6, hh = 10 + hash(i, seed)*30, w = W/22 + 3; ctx.fillRect(x, y - hh, w, hh + 2); if (hash(i, seed + 1) > .78) ctx.fillRect(x + w*.3, y - hh - 18, w*.4, 18); }
    for (let i=0;i<fires;i++){ const x = W*(.1 + hash(i, seed + 2)*.8); glow(ctx, x, y - 12, 40, '#ff7a30', .25 + (REDUCE() ? 0 : Math.sin(T/200 + i)*.05)); ctx.strokeStyle = 'rgba(60,50,46,.5)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.quadraticCurveTo(x + 10, y - 50, x + 30 + (REDUCE() ? 0 : Math.sin(T/900 + i)*6), y - 90); ctx.stroke(); } },
  /* a square tile on the ground, seen at a slant: the reader's tile (obsidian for Perrit, bone for the tile-woman) */
  tile(ctx, x, y, s, bone){ ctx.save(); ctx.translate(x, y); ctx.scale(1, .55); ctx.rotate(.12); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-s/2 + 2, -s/2 + 3, s, s);
    ctx.fillStyle = bone ? '#d8ccb0' : '#141418'; ctx.fillRect(-s/2, -s/2, s, s); ctx.strokeStyle = bone ? 'rgba(90,70,40,.6)' : 'rgba(170,160,220,.55)'; ctx.lineWidth = 1; ctx.strokeRect(-s/2 + 2, -s/2 + 2, s - 4, s - 4);
    ctx.fillStyle = 'rgba(150,120,220,.4)'; ctx.fillRect(-s/2 + 4, -s/2 + 4, s - 8, s - 8); ctx.restore(); },
};

Object.assign(VISBG, {
  /* Calach Bay: grey water, a fog bank, four black longboats sitting still. Step 1 the Letherii hulls dark in the white; step 2 a swell
     passing under the boats and nothing else; step 3 the fog thick and white (the screaming, seen as nothing); step 4 the fog thinned,
     the ships burned out and turning south under wraiths. */
  b5v_calach(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.5, [[0, '#7a7e82'], [1, '#b4b8b8']]);
    B4VB.sea(ctx, W, H, H*.5, '#6a7072', '#2a3034', T, 5);
    if (s >= 1) { const burned = s >= 4; for (let i=0;i<3;i++) { const x = W*(.56 + i*.15) + (burned && !REDUCE() ? -((T*.004 + i*8) % (W*.08)) : 0); ctx.save(); ctx.globalAlpha = s >= 4 ? 1 : .45; B5VB.ship(ctx, x, H*(.53 + i*.01), .9 - i*.12, T, burned); ctx.restore();
      if (burned) for (let k=0;k<3;k++) drawFigure(ctx, 'b5_wraith', x - 8 + k*8, H*(.5 + i*.01), .5, T, {air:true, phase:k + i}); } }
    if (s === 2) { const sw = REDUCE() ? .5 : (T % 5000)/5000; ell(ctx, W*(.1 + sw*.8), H*.78, 40, 4, 'rgba(10,14,16,.35)'); } // something passing under, only a swell
    B5VB.longboat(ctx, W*.3, H*.82, 1.6, 1); B5VB.longboat(ctx, W*.1, H*.68, .9, 1, '#16161a'); B5VB.longboat(ctx, W*.62, H*.7, .8, -1, '#18181c');
    for (let i=0;i<5;i++) drawFigure(ctx, 'b5_wraith', W*(.2 + i*.05), H*.77, 1, T, {air:true, phase:i, still:s === 3});
    drawFigure(ctx, 'b5_edur', W*.42, H*.76, 1.1, T, {still:true, dir:1}); // Hannan Mosag in the bow, small, a shape
    B5VB.fog(ctx, W, H, H*.3, H*.8, T, s === 3 ? .95 : s >= 4 ? .25 : .6, 7);
    if (s === 3) { ctx.fillStyle = 'rgba(220,222,224,.35)'; ctx.fillRect(0, 0, W, H); }
    return {fx:W*.24, fy:H*.86, fs:2}; },

  /* the Cedance: a dark chamber, a floor of tiles in perspective, one of them lit and in it the harbour at Trate. The picture in the tile
     changes with the steps: the sunny harbour and three ships; the scow backing off, dark in the rigging; the water rising; the wreck. */
  b5v_cedance(ctx, W, H, T, v){ const s = v.step || 0;
    ctx.fillStyle = vgrad(ctx, 0, H, [[0, '#06060a'], [1, '#14121c']]); ctx.fillRect(0, 0, W, H);
    for (let r=0;r<6;r++) for (let c=-6;c<=6;c++){ const y = H*.5 + r*r*4 + r*12, w = 18 + r*10, x = W*.5 + c*w; ctx.strokeStyle = 'rgba(120,110,160,.18)'; ctx.lineWidth = 1; ctx.strokeRect(x - w/2, y, w, 10 + r*6); }
    for (let i=0;i<8;i++) glow(ctx, W*(.1 + hash(i, 61)*.8), H*(.55 + hash(i, 62)*.4), 10, '#8a7ad0', .06); // other tiles, shut
    const tx = W*.62, ty = H*.58, tw = W*.3, th = H*.32; ctx.save(); ctx.beginPath(); ctx.rect(tx - tw/2, ty, tw, th); ctx.clip();
    const gold = s >= 4 ? '#8aa0b0' : '#a8c8e0'; ctx.fillStyle = vgrad(ctx, ty, ty + th, [[0, gold], [.45, '#e8dcc0'], [.46, '#4a7a94'], [1, '#2a4a5a']]); ctx.fillRect(tx - tw/2, ty, tw, th);
    const hy = ty + th*.46; ctx.fillStyle = '#5a5248'; ctx.fillRect(tx - tw/2, ty + th*.8, tw, th*.2); ctx.fillStyle = '#3a3a3e'; ctx.fillRect(tx + tw*.3, ty + th*.2, 4, th*.6); // the quay, the lighthouse
    if (s <= 2) for (let i=0;i<3;i++){ const sx = tx - tw*.3 + i*tw*.12 + (REDUCE() ? 0 : (s ? T*.002 % 10 : 0)); B5VB.ship(ctx, sx, hy - 1, .28, T, false, true); if (s === 2) { ctx.fillStyle = 'rgba(10,10,14,.8)'; for (let k=0;k<4;k++) ctx.fillRect(sx - 3 + k*2, hy - 6 - hash(k, i)*3, 1, 1.6); } }
    if (s <= 2) { const scx = tx + (s >= 2 ? tw*.04 : -tw*.02); poly(ctx, [[scx - 3, hy + 6],[scx + 3, hy + 6],[scx + 2, hy + 8],[scx - 2, hy + 8]], '#2a2018'); }
    if (s === 3) { const rise = REDUCE() ? .7 : Math.min(1, (T % 6000)/4000); poly(ctx, [[tx - tw/2, hy + 4],[tx - tw*.2, hy - th*.42*rise],[tx + tw*.2, hy - th*.36*rise],[tx + tw/2, hy + 4]], 'rgba(30,60,74,.92)'); for (let i=0;i<3;i++) B5VB.ship(ctx, tx - tw*.12 + i*tw*.1, hy - th*.4*rise, .26, T, false, true); }
    if (s >= 4) { for (let i=0;i<3;i++) { ctx.save(); ctx.translate(tx - tw*.1 + i*tw*.12, ty + th*.82); ctx.rotate(.3 - i*.2); B5VB.ship(ctx, 0, 0, .22, T, true); ctx.restore(); } }
    ctx.restore(); ctx.strokeStyle = 'rgba(220,200,140,.6)'; ctx.lineWidth = 1.4; ctx.strokeRect(tx - tw/2, ty, tw, th); glow(ctx, tx, ty + th/2, tw*.8, '#d8c890', .12); // its light on the dark
    return {fx:W*.26, fy:H*.9, fs:2.3}; },

  /* Fent Reach: a low grey northern sky, a wall and its harbour below, the sea; sails on it, more with each step; step 4 the flag down */
  b5v_fent(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.44, [[0, '#5a6066'], [1, '#9aa0a2']]); for (let i=0;i<3;i++) cloud(ctx, W*(.2 + i*.3), H*(.12 + i*.05), W*.32, 3, '#7a8086', .16);
    B4VB.sea(ctx, W, H, H*.44, '#5a6a70', '#24323a', T, 8);
    const n = [0, 18, 60, 90, 90][Math.min(s, 4)]; for (let i=0;i<n;i++){ const d = hash(i, 71), x = W*(.08 + hash(i, 72)*.9), y = H*(.45 + d*.14), sc = .3 + d*.5; B5VB.longboat(ctx, x, y, sc*.6, hash(i, 73) > .5 ? 1 : -1, `rgba(10,10,14,${.5 + d*.4})`); }
    if (s >= 2) { ctx.fillStyle = 'rgba(6,8,10,.25)'; ctx.fillRect(0, H*.5, W, H*.12); } // the sea darker under them
    ctx.fillStyle = '#4a4844'; ctx.fillRect(0, H*.74, W, H*.26); ctx.fillStyle = '#5a5852'; for (let i=0;i<14;i++) ctx.fillRect(i*W/13, H*.7, W/26, H*.05); // the wall and its merlons
    const fx0 = W*.86; B2F.line(ctx, '#2a2420', 1.4, [[fx0, H*.72], [fx0, H*.36]]); const fy = s >= 4 ? H*(.36 + (REDUCE() ? .2 : Math.min(.3, (T % 9000)/9000*.4))) : H*.36; poly(ctx, [[fx0, fy],[fx0 + 18, fy + 3 + (REDUCE() ? 0 : Math.sin(T/300)*2)],[fx0, fy + 10]], '#4a5a74'); ctx.fillStyle = '#c8b47a'; ctx.fillRect(fx0 + 3, fy + 3, 4, 3);
    if (s >= 2) for (let i=0;i<3;i++) drawFigure(ctx, 'b5_letherii', W*(.5 + i*.1), H*.76, 1.4, T, {still:true, dir:i % 2 ? 1 : -1, pick:i});
    return {fx:W*.3, fy:H*.8, fs:2.2}; },

  /* the Trate lighthouse at night: the gallery and the great lamp, the harbour below, the black fleet beyond. Step 1 Arahathan's small
     light on the harbour wall; step 2 his line of white fire and the sea heaving up; step 3 the sea turned toward the lighthouse; step 4
     the lamp out, the ships coming in. */
  b5v_lighthouse(ctx, W, H, T, v){ const s = v.step || 0, out = s >= 4;
    B4VB.sky(ctx, W, H*.55, [[0, '#04050a'], [1, '#141826']]); B3VB.stars(ctx, W, H, T, 40, .45, .5, 81);
    B4VB.sea(ctx, W, H, H*.55, '#14202a', '#060a0e', T, 9);
    for (let i=0;i<9;i++) B5VB.longboat(ctx, W*(.08 + i*.09) + (out && !REDUCE() ? (T*.003 % 20) : 0), H*(.6 + hash(i, 81)*.04), .45, -1, '#020204');
    ctx.fillStyle = '#0a0a0e'; ctx.fillRect(0, H*.78, W*.6, 5); // the breakwater
    if (s >= 1 && s <= 3) { glow(ctx, W*.34, H*.77, 12, '#e8f0ff', .5); }
    if (s === 2) { ctx.strokeStyle = 'rgba(240,248,255,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W*.34, H*.77); ctx.lineTo(W*.12, H*.6); ctx.stroke(); glow(ctx, W*.2, H*.66, 40, '#e0f0ff', .15); }
    if (s >= 2 && s <= 3) { const k = s === 3 ? 1 : .6, cx = s === 3 ? W*.62 : W*.28; ctx.fillStyle = 'rgba(8,16,22,.95)'; ctx.beginPath(); ctx.moveTo(cx - W*.3, H*.8); ctx.quadraticCurveTo(cx, H*(.8 - .5*k), cx + W*.3, H*.8); ctx.fill(); ctx.strokeStyle = 'rgba(150,190,210,.25)'; ctx.lineWidth = 1; ctx.stroke(); }
    const lx = W*.8; poly(ctx, [[lx - 16, H],[lx - 9, H*.32],[lx + 9, H*.32],[lx + 16, H]], '#1e1e24'); ctx.fillStyle = '#2a2a30'; ctx.fillRect(lx - 14, H*.3, 28, 4); ctx.fillRect(lx - 8, H*.2, 16, H*.1);
    if (!out) { const f = REDUCE() ? 1 : .9 + Math.sin(T/120)*.06; glow(ctx, lx, H*.25, 70, '#ffc870', .45*f); ctx.fillStyle = '#ffe8b0'; ctx.fillRect(lx - 4, H*.22, 8, 6); }
    else { ctx.fillStyle = 'rgba(10,20,26,.9)'; ctx.fillRect(lx - 10, H*.18, 20, H*.14); }
    return {fx:lx - 2, fy:H*.3, fs:1.5, air:true}; },

  /* the road south: a hot white sky, the road white with dust, black fields to either side, the column of the disarmed. Step 3 the
     burned farms close; step 4 Letheras, its towers over the haze and the gates open. */
  b5v_road(ctx, W, H, T, v){ const s = v.step || 0, city = s >= 4;
    B4VB.sky(ctx, W, H*.5, [[0, '#b8b4a8'], [1, '#e8e0cc']]); glow(ctx, W*.7, H*.12, W*.3, '#fff6dc', .25);
    if (city) { B5VB.skyline(ctx, W, H*.5, 'rgba(90,96,110,.75)', 21); ctx.fillStyle = 'rgba(60,64,76,.9)'; ctx.fillRect(W*.44, H*.4, W*.12, H*.1); ctx.fillStyle = '#1a1a1e'; ctx.fillRect(W*.48, H*.43, W*.04, H*.07); }
    ctx.fillStyle = s >= 2 ? '#1e1a16' : '#5a5a3a'; ctx.fillRect(0, H*.5, W, H*.5); // the fields; black from step 2
    if (s >= 2) { for (let i=0;i<4;i++){ const x = W*(.1 + i*.26), y = H*(.56 + hash(i, 91)*.06); ctx.fillStyle = '#0e0c0a'; ctx.fillRect(x, y - 8, 16, 8); poly(ctx, [[x - 2, y - 8],[x + 8, y - 14],[x + 18, y - 8]], '#0e0c0a'); glow(ctx, x + 8, y - 2, 10, '#ff6a30', .12); ctx.strokeStyle = 'rgba(80,70,60,.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 8, y - 10); ctx.lineTo(x + 14, y - 40); ctx.stroke(); } }
    poly(ctx, [[W*.42, H*.5],[W*.58, H*.5],[W*.9, H],[W*.1, H]], '#c8bc9a'); // the road
    for (let i=0;i<26;i++){ const d = i/26, x = W*(.5 + (hash(i, 92) - .5)*(.1 + d*.6)), y = H*(.52 + d*.4); B3VB.walker(ctx, x, y, .5 + d*1.4, `rgba(60,56,52,${.5 + d*.4})`, T, i, hash(i, 93) > .5 ? -1 : 1); }
    B3VB.dust(ctx, W*.5, H*.6, W*.7, H*.2, T, .14, 9);
    return {fx:W*.3, fy:H*.92, fs:2.3}; },

  /* Brans Keep: a keep against a cliff, a lake, two corner towers, the army in lines across the field, the dry channel on the right.
     Step 1 the wraiths and the white fire; step 2 the pillars rising far off; step 3 the towers gone, the pillars leaning; step 4 the
     same, with the Whitefinders still fighting far out on the right. */
  b5v_brans(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.5, s >= 2 ? [[0, '#3a3440'], [1, '#8a7a70']] : [[0, '#6a7890'], [1, '#d8c8b0']]);
    ctx.fillStyle = '#3a3a3e'; poly(ctx, [[0, H*.1],[W*.16, H*.14],[W*.2, H*.56],[0, H*.56]], '#3a3a3e'); // the cliff
    ctx.fillStyle = '#4a4a4e'; ctx.fillRect(W*.08, H*.3, W*.14, H*.26); // the keep
    const tw = s >= 3 ? 0 : 1; [[W*.06, H*.24], [W*.22, H*.26]].forEach(([x, y], i) => { if (tw) { ctx.fillStyle = '#56565a'; ctx.fillRect(x - 5, y, 10, H*.32); if (s === 1 && !REDUCE() && (Math.floor(T/700) + i) % 2) { ctx.strokeStyle = 'rgba(250,250,255,.85)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(W*(.5 + i*.2), H*.6); ctx.stroke(); } } else { ctx.fillStyle = '#2a2a2e'; ctx.fillRect(x - 6, y + H*.22, 12, H*.1); glow(ctx, x, y + H*.2, 30, '#ff8a40', .3); } });
    ctx.fillStyle = '#5a7088'; ctx.fillRect(0, H*.56, W*.08, H*.1); // the lake
    ctx.fillStyle = vgrad(ctx, H*.56, H, [[0, '#5a5a3a'], [1, '#2e2e20']]); ctx.fillRect(W*.08, H*.56, W, H*.44);
    ctx.fillStyle = '#2a2418'; ctx.fillRect(W*.74, H*.56, 6, H*.44); // the dry channel
    if (s >= 1) for (let i=0;i<30;i++){ const x = W*(.36 + hash(i, 101)*.56), y = H*(.6 + hash(i, 102)*.06); drawFigure(ctx, 'b5_wraith', x, y, .5, T, {air:true, phase:i}); }
    if (s === 1) for (let i=0;i<6;i++) glow(ctx, W*(.4 + hash(i, 103)*.4), H*.62, 20, '#f0f4ff', .2);
    if (s >= 2) { const lean = s >= 3 ? (REDUCE() ? .3 : .2 + Math.sin(T/3000)*.05) : 0; for (let i=0;i<4;i++){ const bx = W*(.48 + i*.14), top = H*(s === 2 ? .05 : .02); ctx.save(); ctx.translate(bx, H*.62); ctx.rotate(-lean*(i < 2 ? 1 : .4)); const g = ctx.createLinearGradient(-14, 0, 14, 0); g.addColorStop(0, 'rgba(8,6,12,.4)'); g.addColorStop(.5, 'rgba(8,6,12,.95)'); g.addColorStop(1, 'rgba(8,6,12,.4)'); ctx.fillStyle = g; ctx.fillRect(-12 - i*2, top - H*.62, 24 + i*4, H*.62 - top);
      ctx.strokeStyle = 'rgba(120,100,160,.25)'; ctx.lineWidth = 1; for (let k=0;k<6;k++){ const yy = -((T*.03*(REDUCE() ? 0 : 1) + k*30) % (H*.6)); ctx.beginPath(); ctx.moveTo(-12, yy); ctx.lineTo(12, yy - 8); ctx.stroke(); } ctx.restore(); } }
    for (let k=0;k<3;k++) for (let i=0;i<9;i++) drawFigure(ctx, 'b5_letherii', W*(.24 + i*.055 + k*.02), H*(.7 + k*.07), .7 + k*.12, T, {still:true, pick:i + k}); // the left and centre, in their lines
    if (s >= 3) for (let i=0;i<6;i++) { drawFigure(ctx, 'b5_letherii', W*(.8 + i*.03), H*.72, .8, T, {phase:i}); drawFigure(ctx, 'b5_edur', W*(.82 + i*.03), H*.7, .8, T, {phase:i, dir:-1}); } // the right, across the channel, hand to hand
    else for (let i=0;i<6;i++) drawFigure(ctx, 'b5_letherii', W*(.8 + i*.03), H*.72, .8, T, {still:true, pick:i});
    return {fx:W*.16, fy:H*.92, fs:2.3}; },

  /* the bridge over Main Canal: the city burning beyond, the canal green below, the shield wall across the bridge; the Emperor at the far
     end, small and catching the light, coming nearer with the steps; step 3 Moroch out in the middle alone. */
  b5v_bridge(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.46, [[0, '#2a2026'], [1, '#8a5a40']]); B5VB.skyline(ctx, W, H*.46, '#1a1618', 33, 4, T);
    ctx.fillStyle = '#2a4a42'; ctx.fillRect(0, H*.72, W, H*.28); ctx.fillStyle = 'rgba(255,140,60,.12)'; for (let i=0;i<12;i++) ctx.fillRect(hash(i, 111)*W, H*(.76 + hash(i, 112)*.2), 14, 1); // Main Canal
    poly(ctx, [[0, H*.62],[W, H*.5],[W, H*.56],[0, H*.72]], '#5a5450'); ctx.fillStyle = '#3a3634'; for (let i=0;i<5;i++) { const x = W*(.1 + i*.2), y = H*(.68 - i*.035); ctx.fillRect(x, y, 6, H*.08); } // the bridge, going away to the right, its piers
    B2F.line(ctx, '#6a6460', 2, [[0, H*.6], [W, H*.48]]); // the rail
    const near = [0, .15, .3, .5][Math.min(s, 3)];
    if (s >= 1) { const ex = W*(.92 - near*.4), ey = H*(.52 + near*.06), es = 1 + near*.8; for (let i=0;i<5;i++) drawFigure(ctx, 'b5_edur', ex + 10 + i*7, ey - 2, es*.8, T, {still:s >= 2, dir:-1, phase:i}); drawFigure(ctx, 'b5v_emperor', ex, ey, es, T, {still:s >= 2, dir:-1}); }
    const wx = s >= 3 ? W*.18 : W*.22; for (let i=0;i<7;i++) { drawFigure(ctx, 'b5_letherii', wx - i*9, H*(.66 + i*.01), 1.5, T, {still:true, dir:1, pick:i}); }
    return {fx:s >= 3 ? W*.42 : W*.3, fy:s >= 3 ? H*.66 : H*.7, fs:2}; },

  /* the reader, back at the chapter's reading place (B5READ): 1 the barracks yard at night; 2 the quay at Trate, mist; 3 the barge at
     Kraig's Landing, the regiment's fires on the bank; 4 the rampart at High Fort, the fires across the pasture; 5 the ash road, a farm's
     coals; 6 Brans Keep at first light, a shield on the grass; 7 the barricade by the Quillas Canal, the city burning. The tile lies on
     whatever they read on: black stone for Perrit, bone for the tile-woman. */
  b5tiles(ctx, W, H, T, v){ const ch = (VISIONS[v.id] && VISIONS[v.id].ch) || 1, bone = visReader().id !== 'perrit';
    const SK = {1:['#05060c', '#141828'], 2:['#3a3a44', '#a88a74'], 3:['#04060a', '#121a20'], 4:['#06060a', '#1a1814'], 5:['#2a2420', '#6a5a4a'], 6:['#4a4a5a', '#d8c0a8'], 7:['#140c0e', '#5a2a1e']}[ch];
    B4VB.sky(ctx, W, H*.64, [[0, SK[0]], [1, SK[1]]]); if (ch === 1 || ch === 3 || ch === 4) B3VB.stars(ctx, W, H, T, 40, .5, .5, 30 + ch);
    const gnd = {1:'#3a3832', 2:'#3a3028', 3:'#2e261c', 4:'#2a2e1c', 5:'#1e1a16', 6:'#4a4a30', 7:'#2e2e32'}[ch]; ctx.fillStyle = gnd; ctx.fillRect(0, H*.64, W, H*.36);
    if (ch === 1) { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i=0;i<8;i++){ ctx.beginPath(); ctx.moveTo(0, H*(.68 + i*.04)); ctx.lineTo(W, H*(.68 + i*.04)); ctx.stroke(); } ctx.fillStyle = '#16141a'; ctx.fillRect(0, H*.3, W, H*.34); B4VB.lamp(ctx, W*.7, H*.58, T, 50, .4); }
    else if (ch === 2 || ch === 3) { B4VB.sea(ctx, W, H, H*.6, ch === 2 ? '#5a6a70' : '#0e161c', ch === 2 ? '#2a3a40' : '#04080a', T, 11); ctx.fillStyle = gnd; ctx.fillRect(0, H*.76, W, H*.24); ctx.strokeStyle = 'rgba(0,0,0,.4)'; for (let i=0;i<5;i++){ ctx.beginPath(); ctx.moveTo(0, H*(.78 + i*.045)); ctx.lineTo(W, H*(.78 + i*.045)); ctx.stroke(); }
      B5VB.fog(ctx, W, H, H*.5, H*.8, T, .35, 13); if (ch === 3) { for (let i=0;i<5;i++) B4VB.fire(ctx, W*(.08 + i*.06), H*.62, T, .4); B4VB.lamp(ctx, W*.7, H*.74, T, 40, .4); } }
    else if (ch === 4) { for (let i=0;i<14;i++) glow(ctx, W*(.5 + hash(i, 121)*.46), H*(.6 + hash(i, 122)*.03), 5, '#ff9040', .35); ctx.fillStyle = '#0a0a08'; ctx.fillRect(W*.04, H*.2, W*.1, H*.44); B4VB.fire(ctx, W*.68, H*.88, T, 1.6); }
    else if (ch === 5) { for (let i=0;i<30;i++) ell(ctx, hash(i, 131)*W, H*(.66 + hash(i, 132)*.34), 6 + hash(i, 133)*20, 1.2, 'rgba(90,80,70,.25)'); glow(ctx, W*.7, H*.86, 30, '#ff6a30', .3); for (let i=0;i<6;i++) ell(ctx, W*(.66 + hash(i, 134)*.1), H*.88, 3, 1.6, '#ff7a3a'); }
    else if (ch === 6) { B3VB.dust(ctx, W*.6, H*.6, W*.7, H*.16, T, .2, 6); ctx.fillStyle = '#3a3a3e'; ctx.fillRect(W*.02, H*.24, W*.1, H*.4); ctx.save(); ctx.translate(W*.5, H*.88); ctx.scale(1, .42); ctx.beginPath(); ctx.arc(0, 0, 22, 0, 7); ctx.fillStyle = '#4a5664'; ctx.fill(); ctx.strokeStyle = '#7a7a76'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#f0ece0'; ctx.fillRect(-2, -20, 4, 8); ctx.restore(); }
    else if (ch === 7) { B5VB.skyline(ctx, W, H*.6, '#0e0c0e', 41, 3, T); ctx.fillStyle = '#1a2a28'; ctx.fillRect(0, H*.62, W, H*.08); ctx.fillStyle = '#2a201a'; for (let i=0;i<4;i++) ctx.fillRect(W*(.56 + i*.1), H*.6 - 12, W*.08, 14); B4VB.fire(ctx, W*.8, H*.7, T, .8); B4VB.lamp(ctx, W*.8, H*.64, T, 50, .3, '#ff9a50'); }
    B5VB.tile(ctx, W*.5, H*.88, 22, bone);
    if (ch === 7) { ctx.fillStyle = '#c8a050'; ctx.beginPath(); ctx.arc(W*.56, H*.9, 2.4, 0, 7); ctx.fill(); B2F.line(ctx, '#a8a8b0', 1, [[W*.42, H*.92], [W*.46, H*.9]]); } // the dock and the knife
    return {fx:W*.3, fy:H*.86, fs:2.4}; },
});

/* Moroch walks south with a stick and a bound leg (b5v5's steps); on the bridge (b5v7) he has his sword again */
{ const _df = drawFigure; drawFigure = function(ctx, kind, x, y, s, t, o = {}){ if (kind === 'b5v_moroch' && VIS && VIS.id === 'b5v5' && o.limp == null) o = Object.assign({}, o, {limp:true}); if (kind === 'b5v_preda' && VIS && VIS.id === 'b5v6' && VIS.step >= 4 && o.sword == null) o = Object.assign({}, o, {sword:true}); return _df(ctx, kind, x, y, s, t, o); }; }
