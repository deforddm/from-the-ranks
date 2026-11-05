/* ============ Book Three, Chapter 4 art: The Prisoners — the camp of the starving west of Capustan, the Gathering's dust, the Founders ============
   Figures (FIGX), the prisoners' camp (TILEX), three backdrops (SCENEX) and the chapter's item pictures (ART), drawn the way 60d and the
   Book Two chapters draw: lantern low on the left, a cold rim on the right, dusk and ash over everything. The camp is kept far off and humane:
   smoke, small shapes, the guards' fires on its edge. Nothing up close that should not be. */

/* ---------------- figures: FIGX[kind](ctx, h, t, o), the same ~32px frame as 18, 47b and 60d ---------------- */
Object.assign(FIGX, {
  /* a Pannion priest among the starving: better fed than the people round him, which says enough; a long dun robe belted with cord,
     the hood back, a shaven head, an iron chain of office, a staff shod with iron raised to preach; a fever-bright look */
  b3_c4_priest(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.06); const st = o.still ? 0 : t, sw = Math.sin(st/520 + (o.phase||0));
    B2F.line(ctx, '#3a2a1a', 1.4, [[-7.8, 13], [-8.6 + sw*.3, -19]]); ctx.fillStyle = '#5a5650'; ctx.fillRect(-9.6 + sw*.3, -21, 2, 2.4); ctx.fillStyle = 'rgba(255,250,240,.25)'; ctx.fillRect(-9.4 + sw*.3, -20.8, .6, 2); // the staff, iron-shod at the top
    h.legs('#2a2018');
    B2F.robe(ctx, h, '#6a5640', '#241a10', 6.4, 8); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(1.6, -5, .6, 17); ctx.fillRect(-3.6, -2, .5, 14); // the robe and its folds
    ctx.fillStyle = 'rgba(255,236,200,.1)'; ctx.fillRect(-7, -4, 1.4, 15); // its lit edge
    poly(ctx, [[-5.6, -6.4], [5.6, -6.4], [4, -3], [-4, -3]], '#4a3a28'); // the hood, fallen back on his shoulders
    ctx.strokeStyle = '#7a6a4a'; ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(-6.6, 3.2); ctx.lineTo(6.6, 3); ctx.stroke(); B2F.line(ctx, '#7a6a4a', .8, [[-1, 3.2], [-1.6, 8.4]]); B2F.line(ctx, '#7a6a4a', .8, [[.4, 3.2], [.8, 7.6]]); // a cord belt, its ends hanging
    ctx.strokeStyle = '#4a4844'; ctx.lineWidth = .8; for (let i=0;i<7;i++){ const k = i/6, x = -3.6 + k*7.2, y = -5.6 + Math.sin(k*Math.PI)*3.2; ctx.beginPath(); ctx.ellipse(x, y, .7, .45, k*1.2 - .6, 0, 7); ctx.stroke(); } // the iron chain of office
    poly(ctx, [[-1.2, -1.8], [1.2, -1.8], [1.6, .6], [0, 1.8], [-1.6, .6]], '#6a6660'); ctx.fillStyle = 'rgba(255,250,240,.35)'; ctx.fillRect(-.8, -1.4, .6, 1.4); // its plaque
    B2F.line(ctx, '#6a5640', 2, [[-5.8, -4.6], [-8.2, -9 + sw*.4]]); ell(ctx, -8.4, -9.6 + sw*.4, 1.1, 1.1, '#b08a6a'); // the arm that holds the staff up
    B2F.line(ctx, '#5a4834', 2, [[5.6, -4.6], [8.6, -2], [9.6, -6 + sw*.6]]); ell(ctx, 9.8, -6.8 + sw*.6, 1.1, 1.2, '#b08a6a'); // the other open, preaching
    h.head('#b08a6a', 4.2, -11.4); ell(ctx, -1.4, -13, 2.2, 1.4, 'rgba(255,240,220,.18)'); // a shaven head, the lamp on it
    ell(ctx, 1.2, -8.4, 1.1, .6, 'rgba(30,16,10,.75)'); // the mouth, open on a word
    const p = o.still ? .6 : .5 + Math.sin(t/300 + (o.phase||0))*.3; ctx.fillStyle = 'rgba(16,10,6,.9)'; ctx.fillRect(-.9, -11.8, 1.2, 1.1); ctx.fillRect(2, -11.8, 1.2, 1.1); ctx.fillStyle = `rgba(255,220,170,${p.toFixed(2)})`; ctx.fillRect(-.6, -11.7, .5, .5); ctx.fillRect(2.3, -11.7, .5, .5); // eyes too bright
    ctx.fillStyle = 'rgba(30,20,14,.6)'; ctx.fillRect(-1.6, -13.6, 2.2, .5); ctx.fillRect(1.6, -13.8, 2.2, .5); // brows drawn down
    ctx.restore(); },

  /* a zealot among the Tenescowri: a starving peasant like the rest, but the Seer's word has him: a strip of dirty ochre bound round the brow,
     a field sickle, leaning forward. Thin, not monstrous. */
  b3_c4_zealot(ctx, h, t, o){ const c = b2Pick(o, ['#5a4e3c', '#504838', '#625444']); ctx.save(); ctx.translate(1, 0); ctx.rotate(.06);
    ctx.fillStyle = '#6a5040'; ctx.fillRect(-3.8, 5, 1.8, 8); ctx.fillRect(1.8, 5, 1.8, 8); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-3.8, 11, 1.8, 2); ctx.fillRect(1.8, 11, 1.8, 2); // bare legs, too thin
    poly(ctx, [[-4.6,-6],[4.6,-6],[5.8,3.6],[4.2,7.4],[2.2,5.2],[.4,7.8],[-1.6,5.4],[-3.6,7.6],[-5.8,3.6]], h.armor(c, '#1c1812')); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-3, -3.4, 6, .5); ctx.fillRect(-2.8, -1, 5.2, .5); // rags
    ctx.strokeStyle = '#3a2e20'; ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(-5.4, 2.4); ctx.lineTo(5.4, 2.2); ctx.stroke(); // a rope for a belt
    ctx.fillStyle = '#6a5040'; ctx.fillRect(-5.6, -5, 1.4, 7); // the far arm
    B2F.line(ctx, '#6a5040', 1.5, [[4.4, -4.6], [7.4, -1.4], [8.4, -5]]); // the near arm, raised with the sickle
    B2F.line(ctx, '#4a3624', 1.3, [[8.4, -4.4], [8.8, -8.6]]); ctx.strokeStyle = '#8a8a82'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(8.8, -8.4); ctx.quadraticCurveTo(13.6, -9.6, 12.4, -14.4); ctx.quadraticCurveTo(11.2, -16.2, 9.4, -15.8); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,245,.4)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(9.4, -8.8); ctx.quadraticCurveTo(13, -10, 12, -14); ctx.stroke(); // the sickle
    h.head('#8a6a52', 3.8, -11); ctx.fillStyle = 'rgba(20,10,6,.45)'; ctx.fillRect(-2.8, -9.4, 1.2, 2.2); ctx.fillRect(2, -9.4, 1.2, 2.2); // hollow cheeks
    h.look('rgba(14,8,6,.95)', -11.6); ctx.fillStyle = 'rgba(240,220,190,.6)'; ctx.fillRect(2.2, -11.5, .4, .4); // a hard bright look
    B2F.cap(ctx, '#2a2018', 4, -12, 1.05, 1.95); ctx.fillStyle = '#2a2018'; ctx.fillRect(-4, -12, 1.2, 4); ell(ctx, -3.6, -6.6, .8, 1.6, '#2a2018'); // matted hair
    ctx.fillStyle = '#a07a3a'; ctx.fillRect(-4.1, -13.4, 8.2, 1.3); poly(ctx, [[-4.1, -13.4], [-6.4, -11.6], [-6, -9.6], [-3.6, -12.2]], '#8a6630'); // the ochre strip at the brow, its tail behind
    ctx.restore(); },

  /* a T'lan Imass, seen from a distance: short and broad, dust-grey all over, rotted hides, an antlered bone helm, a flint sword held low;
     hollow where the eyes should be, a pinprick of light in each; dust lifting off him */
  b3_c4_imass(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.08, .9); const st = o.still ? 0 : t;
    glow(ctx, 0, 0, 16, '#a8a49a', .08);
    const sk = '#8a8478', dk = '#4a463e', hide = '#6e665a';
    ctx.fillStyle = dk; ctx.fillRect(-4.8, 5, 3.8, 8); ctx.fillRect(1, 5, 3.8, 8); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-4.8, 11, 3.8, 2); ctx.fillRect(1, 11, 3.8, 2); // short legs bound in hide
    poly(ctx, [[-7.4,-6],[7.4,-6],[8.4,6],[5.6,9],[3,7],[0,9.4],[-3,7.2],[-5.8,9.2],[-8.4,6]], h.armor(hide, '#2a2620')); // furs, rotted to tatters at the hem
    ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let i=0;i<6;i++) ctx.fillRect(-6.4 + i*2.4, -4 + (i%2)*1.6, .5, 8); ctx.fillStyle = 'rgba(220,214,200,.12)'; ctx.fillRect(-7.2, -5.4, 1.4, 12); // the matted pelt
    poly(ctx, [[-8.6,-7.4],[-3.6,-7.8],[-4.4,-3.6],[-8.8,-3]], h.armor('#7a7266', '#34302a')); poly(ctx, [[8.6,-7.4],[3.6,-7.8],[4.4,-3.6],[8.8,-3]], h.armor('#5e584e', '#24221e')); // a fur over each shoulder
    ctx.fillStyle = sk; ctx.fillRect(-8.6, -3, 1.6, 6.4); ell(ctx, -7.8, 3.6, 1.1, 1.1, sk); // the far arm: skin like old leather over bone
    B2F.line(ctx, sk, 1.7, [[6.4, -4.6], [7.6, 1.6]]); ell(ctx, 7.6, 2.2, 1.2, 1.2, sk);
    poly(ctx, [[7.4, 2.8], [9.4, 3.2], [12.8, 7.6], [14, 11.6], [12.6, 12.4], [9.6, 8.6]], '#a49c8a'); ctx.strokeStyle = 'rgba(70,64,54,.7)'; ctx.lineWidth = .4; for (let i=0;i<4;i++){ ctx.beginPath(); ctx.moveTo(9 + i*1.1, 4.6 + i*1.8); ctx.lineTo(10.6 + i*1, 4.4 + i*1.9); ctx.stroke(); } ctx.fillStyle = 'rgba(240,236,222,.6)'; ctx.fillRect(9.6, 3.6, .5, 4); ctx.fillStyle = '#3a2e22'; ctx.fillRect(6.6, 1.6, 2, 1.4); // the flint sword, knapped, held low
    ell(ctx, 0, -11.2, 4.4, 4.6, '#7a7468'); ctx.fillStyle = 'rgba(30,26,22,.55)'; ctx.fillRect(-3.4, -9.4, 1.2, 2.6); ctx.fillRect(2.6, -9.4, 1.2, 2.6); // a withered face, the skin drawn to the skull
    ctx.fillStyle = '#16140f'; ctx.fillRect(-1.4, -12.2, 2, 1.6); ctx.fillRect(1.6, -12.2, 2, 1.6); ctx.fillStyle = '#1e1a14'; ctx.fillRect(-.8, -8.2, 3.6, .8); // empty sockets; teeth in a lipless mouth
    const g = o.still ? .5 : .35 + Math.sin(st/700 + (o.phase||0))*.2; ctx.fillStyle = `rgba(200,220,210,${g.toFixed(2)})`; ctx.fillRect(-.6, -11.6, .5, .5); ctx.fillRect(2.4, -11.6, .5, .5); // and something far back in them
    ctx.fillStyle = '#c8c0ac'; ctx.beginPath(); ctx.arc(0, -12.6, 4.8, Math.PI*1.02, Math.PI*1.98); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-4.8, -13, 9.6, .7); // a bone cap
    B2F.line(ctx, '#b8b09a', 1, [[-3, -16], [-5.4, -20], [-7.6, -21]]); B2F.line(ctx, '#b8b09a', .8, [[-5.2, -19.4], [-4.6, -22]]); B2F.line(ctx, '#a8a08a', 1, [[3, -16], [5.4, -20], [7.4, -21.4]]); B2F.line(ctx, '#a8a08a', .8, [[5.2, -19.6], [5.8, -22.2]]); // antlers
    B2F.line(ctx, '#3a342a', 1.1, [[-4, -10], [-5.2, -4.4]]); B2F.line(ctx, '#3a342a', 1.1, [[4, -10], [5, -5]]); // hair in dry ropes
    if (!o.still) for (let i=0;i<6;i++){ const k = ((st/2600 + i/6 + (o.phase||0)) % 1); ctx.fillStyle = `rgba(190,184,170,${(.4*(1 - k)).toFixed(2)})`; ctx.fillRect(-7 + hash(i, 11)*14 - k*4, 10 - k*20, .9, .9); } // dust lifting off him
    ctx.restore(); },

  /* decor: one of the great dugout canoes from under the Thrall's floor: a long black hull, split and ancient, packed earth in it,
     a wrapped shape laid along it and great pale bones over its side. Low and wide; it stands on the ground, not in the frame's height */
  b3_c4_canoe(ctx, h, t, o){ ctx.save(); if (typeof view !== 'undefined' && view === 'battle') { ctx.translate(0, 13); ctx.scale(.8, .8); ctx.translate(0, -13); }
    ell(ctx, 0, 12.6, 22, 3.4, 'rgba(0,0,0,.45)');
    const hull = () => { ctx.beginPath(); ctx.moveTo(-23, 3); ctx.quadraticCurveTo(-21, 1.4, -17, 2.2); ctx.lineTo(17, 2.2); ctx.quadraticCurveTo(21, 1.2, 23.4, 2.4); ctx.quadraticCurveTo(21, 10.6, 13, 11.6); ctx.lineTo(-13, 11.6); ctx.quadraticCurveTo(-21, 10.6, -23, 3); ctx.closePath(); };
    hull(); { const g = ctx.createLinearGradient(0, 2, 0, 12); g.addColorStop(0, '#4a3a2a'); g.addColorStop(1, '#14100a'); ctx.fillStyle = g; ctx.fill(); }
    ctx.save(); hull(); ctx.clip(); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = .6; for (let i=0;i<4;i++){ ctx.beginPath(); ctx.moveTo(-22, 4.6 + i*1.8); ctx.quadraticCurveTo(0, 5.4 + i*1.9, 22, 4.4 + i*1.8); ctx.stroke(); } // the grain of one great log
    ctx.strokeStyle = '#0a0806'; ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(6, 2.4); ctx.lineTo(8.6, 7); ctx.lineTo(7.6, 11); ctx.stroke(); // a split, long dry
    ctx.fillStyle = 'rgba(255,220,170,.14)'; ctx.fillRect(-22, 2.2, 44, 1); ctx.restore(); // the gunwale catching the light
    poly(ctx, [[-17, 2.6], [17, 2.6], [15, 4], [-15, 4]], '#2a2016'); // the hollow, packed with earth
    ell(ctx, -1, 1.6, 10, 2.2, '#5a4c3a'); ctx.strokeStyle = 'rgba(30,22,14,.6)'; ctx.lineWidth = .5; for (let i=0;i<5;i++){ ctx.beginPath(); ctx.moveTo(-9 + i*4, .2); ctx.lineTo(-7.6 + i*4, 3.2); ctx.stroke(); } // a long shape wrapped in hide, bound, laid along it
    B2F.line(ctx, '#d8cfb4', 1.6, [[-14, 1.6], [-20, -3.4]]); ell(ctx, -20.4, -3.8, 1.3, 1.1, '#d8cfb4'); ell(ctx, -14, 1.8, 1.2, 1, '#cfc6aa'); // a great thigh-bone over the side
    ctx.strokeStyle = '#cfc6aa'; ctx.lineWidth = 1; for (let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(10 + i*2.4, 2.4); ctx.quadraticCurveTo(12 + i*2.6, -3.6, 16 + i*2.2, -2.4); ctx.stroke(); } // ribs, curved, bigger than a man's
    ctx.fillStyle = 'rgba(255,250,236,.35)'; ctx.fillRect(-19, -3.4, 2.6, .5);
    ctx.strokeStyle = '#3a2e20'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-6, 2.6); ctx.lineTo(4, -2.8); ctx.stroke(); ell(ctx, 4.8, -3.2, 1.6, .8, '#3a2e20', -.5); // a paddle, laid on top
    ctx.fillStyle = '#7a1e14'; ctx.fillRect(-23.4, 2, 1.6, 1.4); ctx.fillStyle = '#c8b896'; ctx.fillRect(22.4, 2, 1.4, 1.2); // a smear of old ochre on the prow, a bead on the stern
    ctx.restore(); },
});

/* ---------------- ground: TILEX.b3_c4_camp — the prisoners' camp west of Capustan ----------------
   Keys: '.' trodden earth, ',' ash, '#' ditch and stake line (blocks), '=' a shelter of sticks and rags, 'F' fire, 'x' a dead tree,
   its bark stripped, 'c' a cart (the ration cart); anything else is earth with Book One's exit arrows. dark = dusk/night. */
function b3c4Camp(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y, 4), P = N ? {earth:'#24201c', earthL:'#322c26', ash:'#2a2a2a', ashL:'#3a3a38', post:'#18120c', postL:'#30261a', ditch:'#0c0a08', rag:'#3a342c', ragD:'#1e1a16', bark:'#2a2a26', lit:'200,206,220'}
                                                                 : {earth:'#6a5a48', earthL:'#806e58', ash:'#7a7672', ashL:'#9a9690', post:'#4a3624', postL:'#7a5e40', ditch:'#2a2018', rag:'#8a7a62', ragD:'#4e4434', bark:'#a8a090', lit:'255,240,220'};
  const fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const earth = () => { fill(shade(P.earth, (h - .5)*.05)); b2Mottle(ctx, x, y, T, N ? .03 : .06, N ? .22 : .16, P.lit, 1.2);
    ctx.fillStyle = N ? 'rgba(0,0,0,.28)' : 'rgba(40,30,20,.22)'; for (let i=0;i<5;i++){ const fx = px + hash(x,y,i+10)*T*.9, fy = py + hash(y,x,i+11)*T*.9; ctx.beginPath(); ctx.ellipse(fx, fy, T*.035, T*.06, hash(x,y,i)*3, 0, 7); ctx.fill(); } // bare feet, many of them
    ctx.fillStyle = N ? '#14120f' : '#4a3e30'; for (let i=0;i<4;i++) ctx.fillRect(px + hash(x,y,i+20)*T, py + hash(y,x,i+21)*T, Math.max(1, T*.04), Math.max(1, T*.03)); };
  const ash = () => { earth(); b2Soft(ctx, px + T*.5, py + T*.5, T*.62, .8, N ? '50,50,50' : '140,136,130', .85);
    ctx.fillStyle = N ? '#0e0e0e' : '#2a2622'; for (let i=0;i<6;i++){ const ax = px + T*(.12 + hash(x,y,i+30)*.76), ay = py + T*(.14 + hash(y,x,i+31)*.72); ctx.fillRect(ax, ay, T*(.04 + hash(x,y,i+32)*.08), Math.max(1, T*.025)); } // char, old fires
    ctx.fillStyle = N ? 'rgba(160,160,160,.12)' : 'rgba(220,216,210,.4)'; for (let i=0;i<8;i++) ctx.fillRect(px + hash(x,y,i+40)*T, py + hash(y,x,i+41)*T, Math.max(1, T*.03), Math.max(1, T*.02)); };
  if (ch === '#') { // the ditch and the stake line: the ground falls away dark, sharpened stakes slant outward along its lip
    earth(); poly(ctx, [[px, py + T*.38], [px + T, py + T*.4], [px + T, py + T*.86], [px, py + T*.84]], P.ditch); ctx.fillStyle = N ? 'rgba(80,90,110,.12)' : 'rgba(30,24,18,.45)'; ctx.fillRect(px, py + T*.6, T, T*.08); // the ditch, a scum of water in its bed
    ctx.fillStyle = N ? 'rgba(255,255,255,.04)' : 'rgba(255,240,210,.12)'; ctx.fillRect(px, py + T*.34, T, T*.05); // its near lip
    for (let i=0;i<3;i++){ const sx = px + (i + .5)*T/3 + (hash(x,y,i) - .5)*T*.06, w = T*.08, by = py + T*.4; ctx.save(); ctx.translate(sx, by); ctx.rotate(-.5 + (hash(x,y,i+3) - .5)*.2);
      ctx.fillStyle = P.post; ctx.fillRect(-w/2, -T*.42, w, T*.42); poly(ctx, [[-w/2, -T*.42], [0, -T*.54], [w/2, -T*.42]], P.post); ctx.fillStyle = P.postL; ctx.fillRect(-w/2, -T*.42, w*.35, T*.42); ctx.restore(); }
    B2F.line(ctx, N ? '#2a2016' : '#7a6448', Math.max(1, T*.025), [[px, py + T*.26], [px + T, py + T*.28]]); // a cord along them
    b2Firelit(ctx, x, y, T, N ? .3 : .12, N ? 3.4 : 2.4); return; }
  if (ch === ',') ash(); else earth();
  if (ch === '=') { const by = py + T*.86, ax = px + T*(.42 + (h - .5)*.1), ay = py + T*.4, rag2 = N ? '#2e2a2a' : ['#6a5a50', '#7a6a4a', '#5a5a52'][Math.floor(h*3) % 3]; ell(ctx, px + T*.52, by, T*.44, T*.08, 'rgba(0,0,0,.4)'); // a shelter: sticks crossed at the top, rags and a blanket thrown over, nothing square about it
    B2F.line(ctx, P.post, Math.max(1, T*.035), [[px + T*.14, by], [ax + T*.1, ay - T*.1]]); B2F.line(ctx, P.post, Math.max(1, T*.035), [[px + T*.84, by], [ax - T*.08, ay - T*.12]]); // the crossed sticks, poking out above
    poly(ctx, [[px + T*.12, by], [px + T*.2, by - T*.2], [ax, ay], [ax + T*.18, ay + T*.12], [px + T*.6, by - T*.18], [px + T*.56, by], [px + T*.46, by - T*.04], [px + T*.36, by + T*.01], [px + T*.24, by - T*.03]], P.rag); // the main sheet, its hem torn
    poly(ctx, [[ax, ay], [px + T*.88, by], [px + T*.8, by - T*.02], [px + T*.72, by + T*.01], [px + T*.62, by - T*.04], [ax + T*.12, ay + T*.16]], rag2); // a second piece, another colour
    poly(ctx, [[ax + T*.02, ay + T*.02], [px + T*.88, by], [px + T*.74, by]], P.ragD); // its shadow side
    poly(ctx, [[px + T*.34, by], [ax + T*.04, py + T*.56], [px + T*.56, by]], N ? '#070605' : '#1e1810'); // the dark inside
    ctx.fillStyle = N ? 'rgba(0,0,0,.3)' : 'rgba(50,40,30,.45)'; ctx.fillRect(px + T*.24, py + T*.66, T*.12, T*.08); ctx.fillStyle = N ? 'rgba(120,110,100,.12)' : 'rgba(220,200,170,.25)'; ctx.fillRect(px + T*.22, py + T*.62, T*.03, T*.12); // a patch, a stitched seam
    ell(ctx, px + T*.18, by - T*.01, T*.06, T*.035, N ? '#2a241c' : '#7a6a50'); } // a bowl by the door
  else if (ch === 'F') b2Flames(ctx, px + T*.5, py + T*.62, T, .9);
  else if (ch === 'x') { const cx = px + T*.5, by = py + T*.92; ell(ctx, cx, by, T*.2, T*.05, 'rgba(0,0,0,.45)'); // a dead tree, the bark stripped off it as high as an arm can reach
    [[-1, .34, .36, .035], [1, .28, .32, .03], [-1, .5, .24, .025], [1, .52, .2, .022]].forEach(([d, yk, l, w]) => B2F.line(ctx, P.post, Math.max(1, T*w), [[cx, py + T*yk], [cx + d*T*l*.6, py + T*(yk - l*.45)], [cx + d*T*l, py + T*(yk - l*.75)], [cx + d*T*l*1.1, py + T*(yk - l*.95)]])); // branches, bare
    poly(ctx, [[cx - T*.13, by], [cx - T*.08, py + T*.66], [cx - T*.06, py + T*.2], [cx + T*.04, py + T*.16], [cx + T*.07, py + T*.6], [cx + T*.14, by]], P.post); // a gnarled trunk, splayed at the root
    ctx.fillStyle = N ? 'rgba(255,255,255,.04)' : 'rgba(255,230,190,.12)'; ctx.fillRect(cx - T*.07, py + T*.22, T*.03, T*.68); // its lit side
    const g = ctx.createLinearGradient(0, py + T*.5, 0, py + T*.6); g.addColorStop(0, N ? 'rgba(80,76,68,0)' : 'rgba(176,164,140,0)'); g.addColorStop(1, N ? 'rgba(80,76,68,.8)' : 'rgba(176,164,140,.9)'); ctx.fillStyle = g; poly(ctx, [[cx - T*.09, by - T*.04], [cx - T*.075, py + T*.5], [cx + T*.065, py + T*.5], [cx + T*.1, by - T*.04]], g); // pale wood where the bark was
    ctx.strokeStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(110,90,70,.5)'; ctx.lineWidth = Math.max(1, T*.012); for (let i=0;i<4;i++){ ctx.beginPath(); ctx.moveTo(cx - T*.06 + i*T*.04, py + T*.6); ctx.lineTo(cx - T*.065 + i*T*.045, by - T*.05); ctx.stroke(); } } // knife marks down it
  else if (ch === 'c') { ell(ctx, px + T*.5, py + T*.84, T*.44, T*.09, 'rgba(0,0,0,.45)'); // the ration cart: a high-sided handcart, sacks in it, mostly empty
    ctx.fillStyle = N ? '#2a1e14' : '#6a4a2c'; ctx.fillRect(px + T*.12, py + T*.4, T*.72, T*.3); ctx.fillStyle = N ? '#3a2a1c' : '#8a6a44'; ctx.fillRect(px + T*.12, py + T*.4, T*.72, T*.05); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i=1;i<4;i++){ ctx.beginPath(); ctx.moveTo(px + T*(.12 + i*.18), py + T*.4); ctx.lineTo(px + T*(.12 + i*.18), py + T*.7); ctx.stroke(); }
    ell(ctx, px + T*.32, py + T*.38, T*.12, T*.07, N ? '#3e3628' : '#b8a882'); ell(ctx, px + T*.5, py + T*.4, T*.1, T*.05, N ? '#363022' : '#a89a76'); // two sacks, slack
    B2F.line(ctx, N ? '#2a1e14' : '#5a3e24', Math.max(1, T*.035), [[px + T*.84, py + T*.6], [px + T*.98, py + T*.5]]); // the shafts
    ell(ctx, px + T*.3, py + T*.74, T*.13, T*.13, N ? '#140e0a' : '#3a2a1a'); ell(ctx, px + T*.3, py + T*.74, T*.04, T*.04, N ? '#3a2e22' : '#8a6a44'); }
  else if (ch !== '.' && ch !== ',') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .3 : .12, N ? 3.4 : 2.4);
}
TILEX.b3_c4_camp = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c4Camp(ctx, ch, x, y, T, !!dark));
TILEX.b3_c4_camp_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c4Camp(ctx, ch, x, y, T, true));

/* ---------------- a stand-in for Chapter 3's Capustan streets, only if Chapter 3's artist has not drawn them (63b loads before this) ----------------
   Keys: '.' paving, ',' rubble, '#' wall (blocks), 'F' fire (blocks), 'D' door, '=' awning, 'w' well, 'c' cart, 't' temple step. */
function b3c4City(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y, 7), P = N ? {pave:'#2a2826', joint:'#141210', wall:'#3a342c', wallL:'#4a4238', roof:'#2a1e18', wood:'#1e1610', cloth:'#3a2a24', lit:'200,206,220'}
                                                           : {pave:'#8a8070', joint:'#4a4238', wall:'#b0a084', wallL:'#d0c0a0', roof:'#7a4a34', wood:'#5a3e26', cloth:'#8a3a2a', lit:'255,240,220'};
  const fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const pave = () => { fill(shade(P.pave, (h - .5)*.05)); ctx.strokeStyle = P.joint; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); for (let r=0;r<3;r++){ const yy = py + r*T/3; ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); const off = (r + y)%2 ? T*.25 : T*.75; ctx.moveTo(px + off, yy); ctx.lineTo(px + off, yy + T/3); } ctx.stroke(); b2Mottle(ctx, x, y, T, N ? .03 : .06, N ? .2 : .14, P.lit, 1.2); };
  if (ch === '#') { fill(P.wall); ctx.fillStyle = P.wallL; ctx.fillRect(px, py, T*.18, T); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let r=0;r<4;r++) ctx.fillRect(px, py + r*T/4, T, Math.max(1, T*.02)); ctx.fillStyle = P.roof; ctx.fillRect(px, py, T, T*.14); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px, py + T*.86, T, T*.14); return; }
  pave();
  if (ch === ',') for (let i=0;i<5;i++){ const bx = px + T*(.1 + hash(x,y,i+40)*.7), by = py + T*(.2 + hash(x,y,i+41)*.6), w = T*(.1 + hash(x,y,i+42)*.16); ctx.fillStyle = N ? '#3a3430' : '#9a8a70'; ctx.fillRect(bx, by, w, w*.6); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(bx, by + w*.6, w, Math.max(1, T*.02)); }
  else if (ch === 'F') { ctx.fillStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(30,20,14,.5)'; ctx.fillRect(px + T*.1, py + T*.6, T*.8, T*.3); b2Flames(ctx, px + T*.5, py + T*.62, T, 1.1); }
  else if (ch === 'D') { fill(P.wall); ctx.fillStyle = P.roof; ctx.fillRect(px, py, T, T*.14); ctx.fillStyle = P.wood; ctx.fillRect(px + T*.26, py + T*.3, T*.48, T*.7); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(px + T*.49, py + T*.3, Math.max(1, T*.02), T*.7); ell(ctx, px + T*.66, py + T*.66, T*.03, T*.03, N ? '#4a4030' : '#c8a860'); }
  else if (ch === '=') { poly(ctx, [[px, py + T*.04], [px + T, py + T*.04], [px + T, py + T*.34], [px, py + T*.4]], P.cloth); ctx.fillStyle = 'rgba(255,240,210,.12)'; for (let i=0;i<4;i++) ctx.fillRect(px + i*T/4, py + T*.04, T/8, T*.32); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(px, py + T*.4, T, T*.1); }
  else if (ch === 'w') { ell(ctx, px + T*.5, py + T*.56, T*.3, T*.2, N ? '#3a342c' : '#a09078'); ell(ctx, px + T*.5, py + T*.52, T*.2, T*.12, '#0a0a0c'); B2F.line(ctx, P.wood, Math.max(1, T*.04), [[px + T*.24, py + T*.5], [px + T*.24, py + T*.12], [px + T*.76, py + T*.12], [px + T*.76, py + T*.5]]); }
  else if (ch === 'c') { ctx.fillStyle = P.wood; ctx.fillRect(px + T*.14, py + T*.42, T*.7, T*.26); ell(ctx, px + T*.3, py + T*.72, T*.12, T*.12, N ? '#140e0a' : '#3a2a1a'); ell(ctx, px + T*.7, py + T*.72, T*.12, T*.12, N ? '#140e0a' : '#3a2a1a'); }
  else if (ch === 't') { for (let i=0;i<3;i++){ ctx.fillStyle = shade(N ? '#3a3632' : '#c8bca4', -i*.08); ctx.fillRect(px, py + T*(.1 + i*.3), T, T*.3); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(px, py + T*(.36 + i*.3), T, Math.max(1, T*.03)); } }
  else if (ch !== '.') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .3 : .12, N ? 3.4 : 2.4);
}
TILEX.b3_c3_city ??= (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c4City(ctx, ch, x, y, T, !!dark));

/* ---------------- backdrops: SCENEX[kind](canvas, t) — the still parts cached with sceneLayer, the frame adding what moves ---------------- */
/* tiny seated and standing people, far off: a dot of a head on a hump of a body; some lying down */
function b3c4Folk(x, px, py, s, col, kind){ x.fillStyle = col; if (kind < .55) { x.beginPath(); x.ellipse(px, py - 1.1*s, 1.3*s, 1.2*s, 0, Math.PI, 0); x.fill(); x.beginPath(); x.arc(px + .2*s, py - 2.7*s, .6*s, 0, 7); x.fill(); } // sitting, hunched
  else if (kind < .8) { x.fillRect(px - .6*s, py - 3.6*s, 1.2*s, 3.6*s); x.beginPath(); x.arc(px, py - 4.3*s, .65*s, 0, 7); x.fill(); } // standing
  else { x.beginPath(); x.ellipse(px, py - .5*s, 2*s, .6*s, 0, 0, 7); x.fill(); } } // lying down

/* the prisoners at dusk, from the guards' bank: the plain west of Capustan filled to the horizon with them, a few thin fires, low shelters;
   the stake line and the guards' fires along its edge, bright beside theirs; the city's domes far off on the right. Distance does the telling. */
SCENEX.b3_c4_prisoners = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, ly = H*.74;
  const LINE = u => ly - H*.03 + u*H*.05; // the stake line, falling a little to the right
  ctx.drawImage(sceneLayer('b3c4:prisoners', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#1a1c2a'],[.4,'#3a3446'],[.75,'#8a5a4e'],[1,'#c88a5a']]); x.fillRect(0, 0, W, hz + 2); // dusk
    glow(x, W*.1, hz*.9, W*.45, '#ffa060', .35); glow(x, W*.1, hz*.92, 10, '#ffd8a0', .7); // the sun going down on the left
    for (let i=0;i<5;i++) cloud(x, W*(.12 + hash(i, 61)*.8), hz*(.18 + i*.13), W*(.2 + hash(i, 62)*.22), 2 + i*.5, i%2 ? '#2a2432' : '#a0645a', .14);
    // Capustan, far off on the right: a low wall and the domes of its temples, smoke still over it
    { const cx = W*.82, by = hz + 1; x.fillStyle = 'rgba(40,34,40,.85)'; x.fillRect(cx - W*.14, by - H*.025, W*.3, H*.025); for (let i=0;i<7;i++){ const dx = cx - W*.12 + i*W*.04 + hash(i, 63)*W*.02, r = H*(.012 + hash(i, 64)*.016); x.beginPath(); x.arc(dx, by - H*.025, r, Math.PI, 0); x.fill(); x.fillRect(dx - .4, by - H*.025 - r - 3, .8, 3); }
      for (let k=0;k<14;k++){ const kk = k/14; glow(x, cx - kk*W*.1, by - H*.05 - kk*hz*.7, 6 + kk*20, '#3a3036', .18*(1 - kk*.5)); } }
    x.fillStyle = vgrad(x, hz, H, [[0,'#5a4a44'],[.35,'#3a302c'],[1,'#141010']]); x.fillRect(0, hz, W, H - hz); // the plain
    x.fillStyle = 'rgba(40,32,32,.9)'; x.fillRect(0, hz - 1, W, 2);
    // the camp: a dark tide of people from the stake line to the horizon, thinning into haze
    for (let i=0;i<2400;i++){ const d = Math.pow(hash(i, 71), 1.6), py = hz + 1.5 + d*(LINE(.5) - hz - H*.03), s = .35 + d*1.3, px = hash(i, 72)*W; if (px > W*.66 && py < hz + H*.02) continue;
      const c = 20 + Math.round(hash(i, 73)*22); b3c4Folk(x, px, py, s, `rgba(${c + 8},${c},${c - 2},${(.55 + d*.4).toFixed(2)})`, hash(i, 74)); }
    for (let i=0;i<120;i++){ const d = Math.pow(hash(i, 81), 1.4), py = hz + 2 + d*(LINE(.5) - hz - H*.04), s = .5 + d*1.6, px = hash(i, 82)*W; x.fillStyle = `rgba(${60 + Math.round(hash(i, 83)*30)},${50 + Math.round(hash(i, 83)*24)},40,${(.5 + d*.4).toFixed(2)})`; x.beginPath(); x.moveTo(px - 3*s, py); x.lineTo(px, py - 2.6*s); x.lineTo(px + 3*s, py); x.fill(); } // shelters, rags on sticks
    { const g = x.createLinearGradient(0, hz, 0, hz + H*.2); g.addColorStop(0, 'rgba(176,122,96,.75)'); g.addColorStop(.4, 'rgba(120,88,76,.35)'); g.addColorStop(1, 'rgba(120,88,76,0)'); x.fillStyle = g; x.fillRect(0, hz, W, H*.2); } // haze and smoke over the far part
    // the stake line: the ditch dark, the stakes slanting out toward the camp
    x.fillStyle = '#100c0a'; x.beginPath(); x.moveTo(0, LINE(0)); x.lineTo(W, LINE(1)); x.lineTo(W, LINE(1) + H*.025); x.lineTo(0, LINE(0) + H*.025); x.fill();
    for (let px=2; px<W; px+=4 + hash(Math.round(px), 91)*3){ const py = LINE(px/W); x.strokeStyle = '#1a120c'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(px, py + H*.02); x.lineTo(px - 3, py - H*.035); x.stroke(); }
    x.fillStyle = vgrad(x, ly, H, [[0,'#241a14'],[1,'#0a0806']]); x.beginPath(); x.moveTo(0, LINE(0) + H*.025); x.lineTo(W, LINE(1) + H*.025); x.lineTo(W, H); x.lineTo(0, H); x.fill(); // the guards' bank, our side
    x.fillStyle = 'rgba(255,170,110,.1)'; x.beginPath(); x.moveTo(0, LINE(0) + H*.025); x.lineTo(W, LINE(1) + H*.025); x.lineTo(W, LINE(1) + H*.03); x.lineTo(0, LINE(0) + H*.03); x.fill();
  }), 0, 0, W, H);
  // their fires: few, small, and thin smoke going up from each
  for (let i=0;i<16;i++){ const d = Math.pow(hash(i, 101), 1.3), py = hz + 3 + d*(LINE(.5) - hz - H*.06), px = hash(i, 102)*W, f = mo ? .7 + Math.sin(t/(90 + i*7) + i)*.3 : .8;
    ctx.fillStyle = `rgba(255,${150 + Math.round(f*40)},80,${(.5 + d*.4)*f})`; ctx.fillRect(px, py - 1, .8 + d*1.6, .8 + d*1.2);
    for (let k=0;k<10;k++){ const kk = ((k/10 + t*mo/12000 + hash(i, 103)) % 1); glow(ctx, px + kk*kk*W*.05, py - kk*H*.3, 2 + kk*10, '#4a3e40', .2*(1 - kk)); } }
  // the guards' fires along the line, and the guards: bigger, brighter, and on our side
  const gf = [.12, .38, .62, .88]; gf.forEach((u, i) => { const gx = W*u, gy = LINE(u) + H*.06, f = mo ? .8 + Math.sin(t/70 + i*2)*.12 + Math.sin(t/29 + i)*.08 : .9;
    ell(ctx, gx, gy + 2, 26, 5, `rgba(255,140,70,${(.16*f).toFixed(3)})`); ctx.globalCompositeOperation = 'lighter'; glow(ctx, gx, gy - 4, W*.1, '#ff8a3a', .26*f); ctx.globalCompositeOperation = 'source-over'; b2Flames(ctx, gx, gy, 24, f);
    [[-13, 0], [12, 1]].forEach(([dx, dy], k) => { const sx = gx + dx, sy = gy + dy + 4, s = 1.7; ctx.fillStyle = '#0c0806'; ctx.fillRect(sx - 1.3*s, sy - 7*s, 2.6*s, 7*s); ctx.beginPath(); ctx.arc(sx, sy - 8.3*s, 1.4*s, 0, 7); ctx.fill(); ctx.fillRect(sx - 2*s, sy - 6.4*s, 4*s, 2*s); ctx.fillRect(sx + (k ? -2.6 : 2)*s, sy - 15*s, .7*s, 14.6*s); poly(ctx, [[sx + (k ? -2.9 : 1.7)*s, sy - 15*s], [sx + (k ? -2.25 : 2.35)*s, sy - 17.4*s], [sx + (k ? -1.6 : 3)*s, sy - 15*s]], '#0c0806'); ctx.fillStyle = 'rgba(255,160,90,.4)'; ctx.fillRect(sx + (dx < 0 ? 1.2*s : -1.3*s), sy - 7*s, .7, 6*s); }); });
  squadLine(sceneSquad(), 1, (id, i) => drawFigure(ctx, id, W*.04 + i*Math.min(26, W*.3/Math.max(1, sceneSquad().length)) + 10, H*.97 - (i%2)*2, 2, t, {still:true, dir:1}));
  vign(ctx, W, H, .55, .5); };

/* the Gathering, from the camp's edge: the plain under a cold white sky, frost on the grass, and on the horizon to the south-east a wall of dust
   going up, more than any army raises, pale as bone where the low sun finds it. Nobody goes. The squad's breath shows. */
SCENEX.b3_c4_gathering = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.56, dx0 = W*.42, dx1 = W*.96;
  ctx.drawImage(sceneLayer('b3c4:gathering', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#48566a'],[.5,'#8a98a8'],[.85,'#c4c8c8'],[1,'#dcdad2']]); x.fillRect(0, 0, W, hz + 2); // a hard cold sky
    glow(x, W*.16, hz*.5, W*.3, '#f4f4ec', .3); ell(x, W*.16, hz*.5, 6, 6, 'rgba(250,250,244,.9)'); // a small white sun, no warmth in it
    for (let i=0;i<6;i++){ x.fillStyle = 'rgba(240,244,246,.16)'; x.fillRect(W*(hash(i, 111)*.8), hz*(.12 + i*.07), W*(.2 + hash(i, 112)*.3), 1.2); } // high thin cloud, combed out
    // the dust: a long low bank on the horizon with columns climbing out of it, tawny at the foot, bone-pale where the low sun finds the tops
    const puff = (px, py, r, rgb, a) => { const g = x.createRadialGradient(px - r*.35, py - r*.4, r*.1, px, py, r); g.addColorStop(0, 'rgba(236,230,214,1)'); g.addColorStop(.7, `rgba(${rgb},1)`); g.addColorStop(1, `rgba(${rgb},0)`); x.globalAlpha = a; x.fillStyle = g; x.beginPath(); x.arc(px, py, r, 0, 7); x.fill(); x.globalAlpha = 1; };
    for (let i=0;i<46;i++){ const u = (i + hash(i, 121))/46, px = lerp(dx0, dx1, u), k = Math.sin(u*Math.PI), hh = (H*.04 + Math.pow(hash(i, 122), 1.6)*H*.32)*(.35 + k*.9);
      for (let j=0;j<9;j++){ const jj = j/8, r = (4 + jj*14 + k*6)*(W > 600 ? 1.3 : 1), cy = hz - H*.01 - jj*hh, cx = px + jj*jj*W*.025 + (hash(i, j, 5) - .5)*r*.6; puff(cx, cy, r, `${Math.round(lerp(118, 186, jj))},${Math.round(lerp(102, 176, jj))},${Math.round(lerp(80, 158, jj))}`, (.55 - jj*.25)*(.5 + k*.6)); } }
    { const g = x.createLinearGradient(dx0, 0, dx1, 0); g.addColorStop(0, 'rgba(120,106,84,0)'); g.addColorStop(.15, 'rgba(120,106,84,.9)'); g.addColorStop(.85, 'rgba(120,106,84,.9)'); g.addColorStop(1, 'rgba(120,106,84,0)'); x.fillStyle = g; x.fillRect(dx0, hz - H*.035, dx1 - dx0, H*.04); } // the bank itself, hiding the horizon
    x.fillStyle = vgrad(x, hz, H, [[0,'#7a7464'],[.3,'#5a5446'],[1,'#22201a']]); x.fillRect(0, hz, W, H - hz); // the plain, winter-brown
    x.fillStyle = 'rgba(160,150,130,.5)'; x.fillRect(0, hz - .5, dx0, 1.5);
    for (let i=0;i<500;i++){ const d = Math.pow(hash(i, 131), 1.5), py = hz + 2 + d*(H - hz), px = hash(i, 132)*W, l = 1 + d*7; x.strokeStyle = `rgba(${130 + Math.round(hash(i, 133)*40)},${120 + Math.round(hash(i, 133)*30)},96,${(.3 + d*.5).toFixed(2)})`; x.lineWidth = .5 + d; x.beginPath(); x.moveTo(px, py); x.lineTo(px + l*.3, py - l); x.stroke(); } // dry grass
    for (let i=0;i<260;i++){ const d = Math.pow(hash(i, 141), 1.2), py = hz + 4 + d*(H - hz), px = hash(i, 142)*W; x.fillStyle = `rgba(230,236,240,${(.15 + d*.3).toFixed(2)})`; x.fillRect(px, py, 1 + d, .8); } // frost
    // the camp's edge on the left: two tents, a picket post, a dead fire
    [[.06, .8, 1.2], [.2, .74, .9]].forEach(([u, v, s]) => { const tx = W*u, ty = H*v; x.fillStyle = 'rgba(0,0,0,.3)'; x.beginPath(); x.ellipse(tx + 4*s, ty, 22*s, 3*s, 0, 0, 7); x.fill(); poly(x, [[tx - 18*s, ty], [tx, ty - 20*s], [tx + 18*s, ty]], '#7a7462'); poly(x, [[tx, ty - 20*s], [tx + 18*s, ty], [tx + 4*s, ty]], '#4a463a'); poly(x, [[tx - 4*s, ty], [tx, ty - 9*s], [tx + 3*s, ty]], '#1a1814'); });
    x.fillStyle = '#2a2218'; x.fillRect(W*.32, H*.66, 1.6, H*.12);
  }), 0, 0, W, H);
  // the dust climbing, slow, rolling over itself
  for (let i=0;i<22;i++){ const k = ((t*mo/16000 + hash(i, 151)) % 1), u = hash(i, 152), px = lerp(dx0 + W*.04, dx1 - W*.04, u) + k*W*.03, s = Math.sin(u*Math.PI); glow(ctx, px, hz - H*.06 - k*H*.3*(.5 + s*.6), 10 + k*24, '#cabca2', .2*Math.sin(k*Math.PI)*(.6 + s*.4)); }
  for (let i=0;i<7;i++){ const k = ((t*mo/(11000 + i*900) + hash(i, 161)) % 1), px = lerp(dx0 - W*.05, W*.05, k), py = hz - H*(.16 + hash(i, 162)*.12) - Math.sin(k*Math.PI)*H*.04; b2Bird(ctx, px, py, .6, Math.sin(t*mo/120 + i), 'rgba(30,30,34,.7)'); } // birds, going away from it
  if (typeof S !== 'undefined' && S && S.node === 'b3_c4_imass') { const rx = W*.6, ry = hz + H*.13; // the glimpse: on the low rise across the gully, somebody standing and watching
    ctx.fillStyle = '#4a4638'; ctx.beginPath(); ctx.moveTo(rx - W*.16, ry + H*.03); ctx.quadraticCurveTo(rx, ry - H*.04, rx + W*.18, ry + H*.035); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(230,234,236,.25)'; ctx.fillRect(rx - W*.1, ry - H*.005, W*.2, 1);
    ctx.globalAlpha = .9; drawFigure(ctx, 'b3_c4_imass', rx, ry - H*.008, 1.15, t, {dir:-1, phase:.3}); ctx.globalAlpha = 1;
    if (mo) for (let i=0;i<10;i++){ const k = ((t/3200 + i/10) % 1); ctx.fillStyle = `rgba(200,192,176,${(.45*(1 - k)).toFixed(2)})`; ctx.fillRect(rx - 6 + hash(i, 171)*12 + k*W*.08, ry - 4 - hash(i, 172)*26 - k*H*.06, 1.2, 1.2); } } // and dust going off it, south-east
  const sq = sceneSquad(); squadLine(sq, 1, (id, i) => { const fx = W*.08 + i*Math.min(26, W*.3/Math.max(1, sq.length)) + 14, fy = H*.97 - (i%2)*2; drawFigure(ctx, id, fx, fy, 2, t, {still:true, dir:1});
    if (mo) { const k = ((t/2600 + i*.37) % 1); glow(ctx, fx + 8 + k*10, fy - 50 - k*6, 4 + k*8, '#e8eef2', .22*Math.sin(k*Math.PI)); } }); // their breath
  vign(ctx, W, H, .45, .5); };

/* the Founders: the Thrall's floor torn up by the Barghast, flagstones heaved and stacked, and in the pit below them nine great canoes laid in
   rows, and great bones; Barghast at the rim with torches; the hall's pillars going back into the dark. By torchlight, from the edge. */
SCENEX.b3_c4_founders = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, vx = W*.56, py0 = H*.46, py1 = H*.84;
  const PIT = (u, v) => { const y = lerp(py0, py1, v), half = lerp(W*.26, W*.5, v); return [vx + (u - .5)*2*half, y, lerp(.5, 1.2, v)]; }; // pit floor in perspective: u across, v from far to near
  const torches = [[.16, .44], [.3, .4], [.8, .41], [.94, .46]];
  ctx.drawImage(sceneLayer('b3c4:founders', W, H, (x, W, H) => {
    x.fillStyle = '#070606'; x.fillRect(0, 0, W, H);
    // the hall: a back wall, pillars receding on both sides
    x.fillStyle = vgrad(x, 0, py0, [[0,'#0a0908'],[1,'#1e1a16']]); x.fillRect(0, 0, W, py0);
    for (let i=6;i>=0;i--){ const k = Math.pow(.72, i), pw = 22*k, ph = H*.62*k + H*.1, y = py0 + H*.02*k; [-1, 1].forEach(sd => { const px = vx + sd*W*.62*k; x.fillStyle = shade(sd < 0 ? '#4a4038' : '#2e2822', -1 + (1 - i*.12)); x.fillRect(px - pw/2, y - ph, pw, ph); x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(px + (sd < 0 ? pw*.2 : -pw/2), y - ph, pw*.3, ph); x.fillStyle = 'rgba(255,170,100,.08)'; x.fillRect(px - pw/2, y - ph, pw, pw*.3); }); }
    // the floor round the pit: flagstones, and the heaved ones stacked at the rim
    x.fillStyle = vgrad(x, py0 - H*.04, H, [[0,'#2a241e'],[1,'#120e0c']]); x.fillRect(0, py0 - H*.04, W, H - py0 + H*.04);
    x.strokeStyle = 'rgba(0,0,0,.45)'; x.lineWidth = 1; for (let r=0;r<8;r++){ const y = py0 - H*.04 + Math.pow(r/8, 1.6)*(H - py0 + H*.04); x.beginPath(); x.moveTo(0, y); x.lineTo(W, y); x.stroke(); }
    // the pit: dark earth, its far wall showing the cut layers
    const [a0x, a0y] = PIT(0, 0), [a1x] = PIT(1, 0), [b0x, b0y] = PIT(0, 1), [b1x] = PIT(1, 1);
    poly(x, [[a0x, a0y - H*.05], [a1x, a0y - H*.05], [a1x, a0y], [a0x, a0y]], '#3a2a1c'); x.fillStyle = 'rgba(0,0,0,.3)'; for (let i=0;i<3;i++) x.fillRect(a0x, a0y - H*.04 + i*H*.013, a1x - a0x, 1); // the far cut face
    poly(x, [[a0x, a0y], [a1x, a0y], [b1x, b0y], [b0x, b0y]], vgrad(x, a0y, b0y, [[0,'#2a1e14'],[1,'#3a2a1c']])); // the pit floor
    poly(x, [[a0x, a0y - H*.05], [a0x, a0y], [b0x, b0y], [b0x - W*.04, b0y - H*.04]], '#1a130c'); poly(x, [[a1x, a0y - H*.05], [a1x, a0y], [b1x, b0y], [b1x + W*.04, b0y - H*.04]], '#120c08'); // its side walls, cut earth
    for (let i=0;i<140;i++){ const [px, py, s] = PIT(hash(i, 171), hash(i, 172)); ell(x, px, py, 1.4*s, .6*s, 'rgba(0,0,0,.25)'); }
    [[.2, .5], [.85, .5]].forEach(([u, v]) => glow(x, W*u, lerp(py0, py1, v), W*.3, '#ff9a50', .14)); // the torchlight on the earth
    // nine canoes, in three rows of three
    for (let r=0;r<3;r++) for (let c=0;c<3;c++){ const [cx, cy, s] = PIT(.2 + c*.3 + (hash(r, c, 3) - .5)*.04, .18 + r*.32), L = 46*s*(W > 600 ? 1.4 : 1), D = 10*s, lit = .6 + (1 - c)*.2;
      ell(x, cx, cy + D*.5, L*1.04, D*.7, 'rgba(0,0,0,.45)');
      x.beginPath(); x.moveTo(cx - L*1.08, cy - D*1.1); x.quadraticCurveTo(cx - L*.9, cy - D*.3, cx - L*.6, cy - D*.35); x.quadraticCurveTo(cx, cy - D*.55, cx + L*.6, cy - D*.4); x.quadraticCurveTo(cx + L*.9, cy - D*.35, cx + L*1.08, cy - D*1.2); x.quadraticCurveTo(cx + L*.9, cy + D*.8, cx, cy + D*.8); x.quadraticCurveTo(cx - L*.9, cy + D*.8, cx - L*1.08, cy - D*1.1); x.closePath(); x.fillStyle = vgrad(x, cy - D, cy + D, [[0, shade('#2a2018', lit - .5)], [1, '#050403']]); x.fill(); // the hull, black wood, prow and stern raised
      x.beginPath(); x.ellipse(cx, cy - D*.38, L*.82, D*.24, 0, 0, 7); x.fillStyle = '#0a0705'; x.fill(); // the hollow
      x.strokeStyle = '#cfc5a8'; x.lineCap = 'round'; x.lineWidth = Math.max(.7, .9*s);
      for (let k=0;k<5;k++){ const rx = cx - L*.38 + k*L*.15, rh = D*(.9 - Math.abs(k - 2)*.14); x.beginPath(); x.moveTo(rx - L*.06, cy - D*.3); x.quadraticCurveTo(rx, cy - D*.3 - rh*2.6, rx + L*.06, cy - D*.3); x.stroke(); } // a rib-cage too big for any man, curving up out of the hollow
      x.lineWidth = Math.max(1, 1.6*s); x.beginPath(); x.moveTo(cx + L*.22, cy - D*.36); x.lineTo(cx + L*.72, cy - D*.5); x.stroke(); ell(x, cx + L*.74, cy - D*.5, 1.6*s, 1.3*s, '#cfc5a8'); ell(x, cx + L*.2, cy - D*.36, 1.5*s, 1.2*s, '#cfc5a8'); // a thigh bone half the canoe long
      ell(x, cx - L*.6, cy - D*.5, 3.2*s, 2.4*s, '#c4b99c'); x.fillStyle = '#0a0705'; x.fillRect(cx - L*.6 - 1.6*s, cy - D*.6, 1*s, .9*s); x.fillRect(cx - L*.6 + .4*s, cy - D*.6, 1*s, .9*s); x.lineCap = 'butt'; // a skull, at the prow end
      x.strokeStyle = `rgba(255,190,120,${(.25 + lit*.2).toFixed(2)})`; x.lineWidth = Math.max(.8, s); x.beginPath(); x.moveTo(cx - L*1.08, cy - D*1.1); x.quadraticCurveTo(cx - L*.9, cy - D*.3, cx - L*.6, cy - D*.35); x.quadraticCurveTo(cx, cy - D*.55, cx + L*.6, cy - D*.4); x.quadraticCurveTo(cx + L*.9, cy - D*.35, cx + L*1.08, cy - D*1.2); x.stroke(); }
    // great bones along the near rim: two vast ribs arching, a skull-long jaw half out of the earth
    [[.04, .9, 1], [.96, .88, -1]].forEach(([u, v, d]) => { for (let k=0;k<3;k++){ const bx = W*u + d*k*W*.035, by = H*v + k*H*.01, sc = 1 - k*.18;
      x.strokeStyle = shade('#c8bea2', -.1*k); x.lineWidth = 3.4*sc; x.lineCap = 'round'; x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(bx + d*W*.04*sc, by - H*.28*sc, bx + d*W*.13*sc, by - H*.24*sc); x.stroke();
      x.strokeStyle = 'rgba(255,220,170,.3)'; x.lineWidth = 1; x.beginPath(); x.moveTo(bx - d, by); x.quadraticCurveTo(bx + d*W*.04*sc - d, by - H*.28*sc, bx + d*W*.13*sc, by - H*.245*sc); x.stroke(); x.lineCap = 'butt'; } });
    // the heaved flagstones stacked along the rim, near
    for (let i=0;i<14;i++){ const u = i/13, px = lerp(b0x - W*.02, b1x + W*.02, u), py = b0y + H*.04 + hash(i, 181)*H*.04, w = W*.07, hh = H*.04; x.save(); x.translate(px, py); x.rotate((hash(i, 182) - .5)*.5); x.fillStyle = '#3a342c'; x.fillRect(-w/2, -hh, w, hh); x.fillStyle = 'rgba(255,180,110,.14)'; x.fillRect(-w/2, -hh, w, 1.4); x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(-w/2, -hh*.2, w, hh*.2); x.restore(); }
    x.fillStyle = vgrad(x, H*.88, H, [[0,'rgba(10,8,6,0)'],[1,'#0a0806']]); x.fillRect(0, H*.88, W, H*.12);
  }), 0, 0, W, H);
  // the torches: Barghast at the far rim holding them up, flame and its light breathing; sparks going up into the dark
  torches.forEach(([u, v], i) => { const tx = W*u, ty = H*v, f = mo ? .8 + Math.sin(t/60 + i*1.7)*.12 + Math.sin(t/23 + i)*.08 : .9;
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, tx, ty - 22, W*.22, '#ff8a3a', .2*f); glow(ctx, tx, ty - 22, 14, '#ffd08a', .5*f); ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#0a0706'; ctx.fillRect(tx - 2.6, ty - 15, 5.2, 15); ctx.beginPath(); ctx.arc(tx, ty - 17.6, 2.6, 0, 7); ctx.fill(); ctx.fillRect(tx - 4, ty - 14, 1.4, 9); // a big man, a Barghast, dark against his own torch
    B2F.line(ctx, '#0a0706', 1.6, [[tx + 2, ty - 13], [tx + 4, ty - 20]]); B2F.line(ctx, '#2a1a10', 1.2, [[tx + 4, ty - 20], [tx + 4.6, ty - 24]]);
    poly(ctx, [[tx + 2.6, ty - 24], [tx + 4.6 + (mo ? Math.sin(t/50 + i)*.8 : 0), ty - 30*f], [tx + 6.6, ty - 24]], '#ffb050'); ell(ctx, tx + 4.6, ty - 25, 1.2, 1.6, '#fff0c0');
    ctx.fillStyle = 'rgba(230,226,214,.5)'; ctx.fillRect(tx - 1.6, ty - 18.6, 1, .6); ctx.fillRect(tx + .4, ty - 18.6, 1, .6); // white face-paint, a glimpse
    if (mo) for (let k=0;k<5;k++){ const kk = ((t/1800 + k/5 + i*.13) % 1); ctx.fillStyle = `rgba(255,190,110,${(.7*(1 - kk)).toFixed(2)})`; ctx.fillRect(tx + 4.6 + Math.sin(kk*9 + k)*4, ty - 28 - kk*H*.2, .9, .9); } });
  if (mo) for (let i=0;i<30;i++){ const k = ((t/14000 + hash(i, 191)) % 1), px = hash(i, 192)*W + Math.sin(t/3000 + i)*6, py = H*(.2 + hash(i, 193)*.6) - k*20; ctx.fillStyle = `rgba(255,220,170,${(.25*Math.sin(k*Math.PI)).toFixed(2)})`; ctx.fillRect(px, py, .8, .8); } // dust in the torchlight
  const sq = sceneSquad(); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.04 + i*Math.min(24, W*.28/Math.max(1, sq.length)) + 10, H*.99 - (i%2)*2, 2, t, {still:true, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* ---------------- the chapter's items: ART['item/<key>'] in Book One's card manner, on its cold ground ----------------
   weapons and armour on a 200×150 board, trinkets on 240×130, each with its own gradient ids so they can share a page */
{
  const card = (key, label, [w, h], body, bg = ['#2a3442', '#0e0f12']) => { ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="b3c4-${key}-bg" cx="0.5" cy="0.5" r="0.62"><stop offset="0" stop-color="${bg[0]}"></stop><stop offset="1" stop-color="${bg[1]}"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#b3c4-${key}-bg)"></rect>\n${body.replace(/#ID/g, 'b3c4-' + key)}</svg>`;
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; };
  const PICS = {
    /* the Grey Swords' rope-and-hooks: a coil of grey rope, a long tail of it, two iron hooks back to back with a barb on each; a strip of grey cloth at the knot */
    rope: ['Grey Sword rope-and-hooks', [240, 130], `<g fill="none" stroke-linecap="round"><ellipse cx="88" cy="88" rx="46" ry="22" stroke="#5e605c" stroke-width="9"></ellipse><ellipse cx="88" cy="83" rx="37" ry="16" stroke="#7a7c78" stroke-width="8"></ellipse><ellipse cx="88" cy="78" rx="27" ry="10" stroke="#8e908a" stroke-width="7"></ellipse>
<ellipse cx="88" cy="88" rx="46" ry="22" stroke="#2e302c" stroke-width="1.4" stroke-dasharray="3 5"></ellipse><ellipse cx="88" cy="83" rx="37" ry="16" stroke="#3a3c38" stroke-width="1.2" stroke-dasharray="3 5"></ellipse><ellipse cx="88" cy="78" rx="27" ry="10" stroke="#4a4c48" stroke-width="1" stroke-dasharray="3 4"></ellipse>
<path d="M132 84 Q154 78 160 58 Q164 44 170 38" stroke="#7a7c78" stroke-width="7"></path><path d="M132 84 Q154 78 160 58 Q164 44 170 38" stroke="#2e302c" stroke-width="1.2" stroke-dasharray="3 5"></path></g>
<rect x="163" y="26" width="16" height="16" rx="3" fill="#4a4c50"></rect><path d="M165 30 h12 M165 34 h12 M165 38 h12" stroke="#2a2c30" stroke-width="1"></path>
<g fill="none" stroke="#5a5e66" stroke-width="5" stroke-linecap="round"><path d="M171 26 L171 12"></path><path d="M171 16 Q150 10 148 26 Q148 36 156 38"></path><path d="M171 16 Q192 10 194 26 Q194 36 186 38"></path></g>
<path d="M156 38 l-6 -2 l4 -6 Z M186 38 l6 -2 l-4 -6 Z" fill="#6a6e76"></path><g fill="none" stroke="#c8ccd4" stroke-width="1" opacity=".6"><path d="M170 15 Q152 11 150 24"></path><path d="M172 15 Q190 11 192 24"></path></g>
<path d="M162 40 Q150 52 146 66 L152 64 Q156 52 166 44 Z" fill="#a4a6a8"></path><path d="M164 42 Q158 58 160 72 L156 70 Q154 56 160 44 Z" fill="#8a8c90"></path><path d="M150 60 l3 2 M157 58 l2 3" stroke="#5a5c60" stroke-width="1"></path>`],
    /* a T'lan Imass flint sword out of the dust: long, leaf-shaped, knapped to an edge you could shave with; an antler haft bound in rotted hide; a cold light about it */
    flint: ["T'lan Imass flint blade", [200, 150], `<circle cx="112" cy="66" r="56" fill="url(#ID-cold)" class="ar-shimmer"></circle><defs><radialGradient id="ID-cold" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#d4e2e6" stop-opacity=".3"></stop><stop offset="1" stop-color="#d4e2e6" stop-opacity="0"></stop></radialGradient></defs>
<path d="M78 100 Q96 70 134 40 Q156 22 172 16 Q166 34 148 56 Q120 88 90 110 Z" fill="#b4ae9e"></path><path d="M78 100 Q96 70 134 40 Q156 22 172 16" fill="none" stroke="#ece6d6" stroke-width="1.2"></path>
<g fill="none" stroke="#7a7466" stroke-width="1" opacity=".8"><path d="M90 96 Q96 86 104 86"></path><path d="M100 84 Q106 74 114 74"></path><path d="M110 72 Q118 62 126 62"></path><path d="M122 60 Q130 50 138 50"></path><path d="M134 48 Q142 40 150 38"></path><path d="M146 38 Q154 30 162 26"></path><path d="M96 104 Q106 100 110 92"></path><path d="M110 94 Q120 90 122 80"></path><path d="M124 82 Q134 76 136 68"></path><path d="M138 68 Q146 62 148 54"></path></g>
<path d="M82 104 L64 120 Q56 126 52 134" stroke="#d8ccb0" stroke-width="8" stroke-linecap="round" fill="none"></path><path d="M60 124 L52 118 M56 128 L46 126" stroke="#c8bc9e" stroke-width="3" stroke-linecap="round"></path>
<g stroke="#4a3e2e" stroke-width="2.4"><path d="M74 106 L82 114"></path><path d="M70 110 L78 118"></path><path d="M66 114 L74 122"></path></g><path d="M80 112 Q86 124 82 136 M76 116 Q78 128 72 138" stroke="#5a4c38" stroke-width="1.6" fill="none"></path>
<g fill="#d8d2c4"><circle cx="150" cy="80" r="1.2" opacity=".6"></circle><circle cx="166" cy="62" r="1" opacity=".5"></circle><circle cx="58" cy="60" r="1.1" opacity=".45"></circle><circle cx="138" cy="102" r=".9" opacity=".5"></circle><circle cx="96" cy="40" r="1" opacity=".4"></circle></g>`],
    /* a Capan temple token: a worn bronze disc stamped with a domed temple and a ring of marks, verdigris in the hollows, on a knotted cord */
    token: ['Capan temple token', [240, 130], `<defs><radialGradient id="ID-br" cx="0.38" cy="0.34" r="0.7"><stop offset="0" stop-color="#e0b066"></stop><stop offset=".6" stop-color="#a87a3a"></stop><stop offset="1" stop-color="#5a3e1c"></stop></radialGradient></defs>
<path d="M120 34 Q96 14 70 22 Q52 28 50 44 M120 34 Q146 12 176 20 Q196 26 198 44" fill="none" stroke="#6a4a2c" stroke-width="2.6"></path><circle cx="120" cy="34" r="4" fill="#5a3e24"></circle>
<circle cx="120" cy="76" r="40" fill="url(#ID-br)"></circle><circle cx="120" cy="76" r="40" fill="none" stroke="#3a2610" stroke-width="2"></circle><circle cx="120" cy="76" r="33" fill="none" stroke="#7a5420" stroke-width="1.4"></circle>
<circle cx="120" cy="40" r="3.6" fill="#1a120a"></circle>
<g fill="#6a4818"><path d="M100 94 h40 v4 h-40 Z"></path><path d="M104 90 h32 v4 h-32 Z"></path><path d="M106 90 v-16 h3 v16 Z M114 90 v-16 h3 v16 Z M123 90 v-16 h3 v16 Z M131 90 v-16 h3 v16 Z"></path><path d="M104 74 h32 v-3 h-32 Z"></path><path d="M106 71 Q120 50 134 71 Z"></path><path d="M119 56 v-6 h2 v6 Z"></path></g>
<g fill="none" stroke="#f0d08a" stroke-width="1" opacity=".6"><path d="M106 71 Q114 58 120 56"></path><path d="M100 94 h14"></path></g>
<g fill="#6a4818"><circle cx="120" cy="47" r="1.4"></circle><circle cx="142" cy="54" r="1.4"></circle><circle cx="150" cy="76" r="1.4"></circle><circle cx="142" cy="98" r="1.4"></circle><circle cx="120" cy="106" r="1.4"></circle><circle cx="98" cy="98" r="1.4"></circle><circle cx="90" cy="76" r="1.4"></circle><circle cx="98" cy="54" r="1.4"></circle></g>
<g fill="#5a8a76" opacity=".7"><circle cx="104" cy="98" r="3"></circle><circle cx="138" cy="60" r="2.4"></circle><circle cx="146" cy="88" r="2"></circle><circle cx="96" cy="66" r="1.8"></circle></g>
<path d="M148 104 Q156 96 158 86" stroke="#2a1a0a" stroke-width="1" fill="none" opacity=".6"></path>`],
  };
  /* the keys the writer gives these (B3CH4.gear), matched by id or name; and the names the brief suggests, so nothing is ever without a picture */
  const pick = (id, name = '') => { const s = (id + ' ' + name).toLowerCase(); return /rope|hook/.test(s) ? 'rope' : /flint|imass|t'lan/.test(s) ? 'flint' : /token|temple|capan/.test(s) ? 'token' : null; };
  ['b3_c4_ropehooks', 'b3_c4_flint', 'b3_c4_token'].forEach(k => { const p = PICS[pick(k)]; if (p && !ART['item/' + k]) card(k, ...p); });
  const gear = typeof B3CH4 !== 'undefined' && B3CH4.gear ? B3CH4.gear : {};
  Object.entries(gear).forEach(([k, it]) => { const p = PICS[pick(k, it && it.name)]; if (p) card(k, (it && it.name) || p[0], p[1], p[2]); });
}

/* ---------------- the plain at night after the hunt, and the guards' bank at dawn after the Gathering ---------------- */
/* riding back in the dark with the Grey Swords: the cold come with them, frost glittering on the grass under hard stars, and low in the south-east
   a long patch of sky with no stars in it, where the dust stands that nobody can see now. Their breath goes up white */
SCENEX.b3_c4_cold_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.56, s = clamp(W/360, .9, 1.4);
  ctx.drawImage(sceneLayer('b3c4:coldnight', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#02040a'],[.55,'#0a1222'],[1,'#1a2638']]); x.fillRect(0, 0, W, hz + 2);
    for (let i=0;i<260;i++){ const px = hash(i, 1)*W, py = Math.pow(hash(i, 2), 1.3)*hz*.96, dx = (px - W*.72)/(W*.26), dy = (py - hz*.86)/(hz*.32); if (dx*dx + dy*dy < 1 && hash(i, 5) > .08) continue; x.fillStyle = `rgba(214,226,250,${(.15 + hash(i, 3)*.6).toFixed(2)})`; x.fillRect(px, py, hash(i, 4) > .92 ? 1.4 : .8, hash(i, 4) > .92 ? 1.4 : .8); } // the stars, and low in the south-east a place where there are none
    glow(x, W*.72, hz - H*.06, W*.3, '#04060a', .5);
    x.fillStyle = '#0a0e16'; x.beginPath(); x.moveTo(0, hz); for (let px=0;px<=W + 10;px+=10) x.lineTo(px, hz - 1 - Math.max(0, Math.sin(px/70 + 2))*2.4); x.lineTo(W, hz + 2); x.lineTo(0, hz + 2); x.fill();
    x.fillStyle = vgrad(x, hz, H, [[0,'#141a24'],[.4,'#0e121a'],[1,'#05070a']]); x.fillRect(0, hz, W, H - hz);
    for (let i=0;i<9;i++){ const yy = hz + H*(.03 + i*.045), w = W*(.2 + hash(i, 11)*.4); x.fillStyle = 'rgba(0,0,0,.35)'; x.fillRect(hash(i, 12)*W - w*.2, yy, w, 1.2 + i*.4); } // the gullies, darker lines
    for (let i=0;i<500;i++){ const d = Math.pow(hash(i, 21), 1.3), py = hz + 2 + d*(H - hz), px = hash(i, 22)*W, l = 1 + d*3; x.strokeStyle = `rgba(150,170,196,${(.05 + d*.13).toFixed(2)})`; x.lineWidth = .5 + d*.6; x.beginPath(); x.moveTo(px, py); x.lineTo(px + l*.3, py - l); x.stroke(); } // frosted grass, the starlight on it
    x.fillStyle = vgrad(x, H*.86, H, [[0,'rgba(2,3,6,0)'],[1,'rgba(2,3,6,.7)']]); x.fillRect(0, H*.86, W, H*.14);
  }), 0, 0, W, H);
  for (let i=0;i<120;i++){ const d = Math.pow(hash(i, 31), 1.2), py = hz + 3 + d*(H - hz)*.9, px = hash(i, 32)*W, tw = mo ? (Math.sin(t/(400 + hash(i, 33)*700) + i) + 1)/2 : .5; ctx.fillStyle = `rgba(220,236,255,${((.1 + d*.4)*tw).toFixed(2)})`; ctx.fillRect(px, py, 1, 1); } // frost, glittering
  // the Grey Swords riding back, heads down, a long file, ropes coiled on the saddles; their breath
  for (let i=0;i<10;i++){ const k = i/9, px = lerp(W*.98, W*.32, k) + (mo ? ((t/30000) % 1)*0 : 0), py = lerp(hz + H*.06, hz + H*.2, k), sc = lerp(.7, 1.4, k)*s, step = mo ? Math.floor(t/420 + i)%2 : i%2;
    b2Rider(ctx, px, py, sc, '#05070b', -1, step, false); ctx.fillStyle = 'rgba(140,150,170,.3)'; ctx.fillRect(px - 2*sc, py - 11*sc, 4*sc, .6*sc); // starlight on a helm
    if (mo) { const kk = ((t/2400 + i*.31) % 1); glow(ctx, px - 6*sc - kk*6, py - 13*sc - kk*5, 2 + kk*5*sc, '#c8d4e4', .14*Math.sin(kk*Math.PI)); } }
  const sq = marchOrder(sceneSquad()); ctx.save(); ctx.filter = 'brightness(.42) saturate(.5)'; sq.forEach((id, i) => drawFigure(ctx, id, W*.06 + i*Math.min(28, W*.36/sq.length), H*.96 - (i%2)*3, 2, t, {phase:i, dir:-1})); ctx.restore();
  ctx.fillStyle = 'rgba(140,160,200,.05)'; ctx.fillRect(0, 0, W, H);
  vign(ctx, W, H, .7, .5); };

/* the guards' bank at dawn: the frost going off the grass in the first sun, the horizon clear where the dust stood, the prisoners' camp grey and
   quiet across the ditch, the guards' fires down to smoke; and on this side, by the ration cart, the ones who came over the stakes in the night
   and did not go back, sitting in a long ragged row. Up the bank, a long way off, one man walking toward you */
SCENEX.b3_c4_dawn = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, ly = H*.7, s = clamp(W/360, .9, 1.4);
  const LINE = u => ly - H*.03 + u*H*.05;
  ctx.drawImage(sceneLayer('b3c4:dawn', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#2a3044'],[.4,'#6a6a7a'],[.8,'#c8a490'],[1,'#ecd2b0']]); x.fillRect(0, 0, W, hz + 2); // the first sun, and nothing in the sky but a few clouds
    glow(x, W*.86, hz, W*.45, '#ffd8a8', .45); glow(x, W*.86, hz - 2, 12, '#fff2d8', .8);
    for (let i=0;i<4;i++) cloud(x, W*(.1 + hash(i, 61)*.8), hz*(.2 + i*.14), W*(.24 + hash(i, 62)*.2), 2, '#e0b8a8', .12);
    { const cx = W*.82, by = hz + 1; x.fillStyle = 'rgba(70,64,74,.8)'; x.fillRect(cx - W*.14, by - H*.025, W*.3, H*.025); for (let i=0;i<7;i++){ const dx = cx - W*.12 + i*W*.04 + hash(i, 63)*W*.02, r = H*(.012 + hash(i, 64)*.016); x.beginPath(); x.arc(dx, by - H*.025, r, Math.PI, 0); x.fill(); } } // Capustan, far off, against the sun
    x.fillStyle = vgrad(x, hz, H, [[0,'#8a8478'],[.35,'#5e5850'],[1,'#1e1a16']]); x.fillRect(0, hz, W, H - hz);
    x.fillStyle = 'rgba(160,150,140,.6)'; x.fillRect(0, hz - 1, W, 2); // the horizon, clear: the dust is gone
    for (let i=0;i<2000;i++){ const d = Math.pow(hash(i, 71), 1.6), py = hz + 1.5 + d*(LINE(.5) - hz - H*.03), sc = .35 + d*1.3, px = hash(i, 72)*W; const c = 34 + Math.round(hash(i, 73)*22); b3c4Folk(x, px, py, sc, `rgba(${c + 8},${c + 2},${c},${(.5 + d*.4).toFixed(2)})`, hash(i, 74)); } // the prisoners, grey in the morning, very quiet
    for (let i=0;i<300;i++){ const d = Math.pow(hash(i, 75), 1.2), py = hz + 2 + d*(H - hz), px = hash(i, 76)*W, shade = (px/W); x.fillStyle = `rgba(232,238,244,${((.12 + d*.25)*(1 - shade*.7)).toFixed(2)})`; x.fillRect(px, py, 1 + d, .8); } // the frost, going off from the sun's side first
    { const g = x.createLinearGradient(0, hz, 0, hz + H*.14); g.addColorStop(0, 'rgba(236,210,180,.55)'); g.addColorStop(1, 'rgba(236,210,180,0)'); x.fillStyle = g; x.fillRect(0, hz, W, H*.14); } // mist off the plain in the sun
    x.fillStyle = '#16100c'; x.beginPath(); x.moveTo(0, LINE(0)); x.lineTo(W, LINE(1)); x.lineTo(W, LINE(1) + H*.025); x.lineTo(0, LINE(0) + H*.025); x.fill();
    for (let px=2; px<W; px+=4 + hash(Math.round(px), 91)*3){ const py = LINE(px/W); x.strokeStyle = '#2a201a'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(px, py + H*.02); x.lineTo(px - 3, py - H*.035); x.stroke(); x.fillStyle = 'rgba(240,244,248,.35)'; x.fillRect(px - 3, py - H*.035, 1, 1); } // the stakes, frost on their points
    x.fillStyle = vgrad(x, ly, H, [[0,'#4a4036'],[1,'#16120e']]); x.beginPath(); x.moveTo(0, LINE(0) + H*.025); x.lineTo(W, LINE(1) + H*.025); x.lineTo(W, H); x.lineTo(0, H); x.fill(); // our side
    // the ration cart, and by it the ones who came over in the night and did not go back: children mostly, the sick, the very old
    const cx = W*.62, cy = H*.86; x.fillStyle = '#2a2018'; x.fillRect(cx - 18*s, cy - 10*s, 36*s, 7*s); ell(x, cx - 12*s, cy - 2*s, 4.4*s, 4.4*s, '#1a1410'); ell(x, cx + 12*s, cy - 2*s, 4.4*s, 4.4*s, '#1a1410'); x.fillStyle = '#6a5a44'; x.fillRect(cx - 16*s, cy - 14*s, 10*s, 4*s); x.fillRect(cx - 4*s, cy - 13*s, 9*s, 3*s); x.fillRect(cx + 6*s, cy - 14*s, 9*s, 4*s); // sacks on it
    for (let i=0;i<16;i++){ const px = W*(.3 + i*.042) + hash(i, 81)*4, py = H*(.8 + (i%3)*.012) + hash(i, 82)*3, sc = (2 + hash(i, 83)*1.4)*s, c = 60 + Math.round(hash(i, 84)*30); if (Math.abs(px - cx) < 20*s) continue; b3c4Folk(x, px, py, sc, `rgb(${c + 10},${c + 2},${c - 6})`, hash(i, 85)*.5); } // sitting in a long ragged row
  }), 0, 0, W, H);
  // the guards' fires gone to smoke; the frost-smoke off the grass where the sun touches it
  [.12, .38, .88].forEach((u, i) => { const gx = W*u, gy = LINE(u) + H*.06; ell(ctx, gx, gy, 6, 2, '#2a1a10'); glow(ctx, gx, gy - 1, 6, '#ff8a3a', .2); for (let k=0;k<10;k++){ const kk = ((k/10 + t*mo/14000 + i*.3) % 1); glow(ctx, gx + kk*kk*W*.06, gy - kk*H*.3, 2 + kk*12, '#a8a0a0', .22*(1 - kk)); } });
  for (let i=0;i<16;i++){ const k = ((t*mo/9000 + hash(i, 101)) % 1), px = W*(.4 + hash(i, 102)*.6), py = hz + H*(.04 + hash(i, 103)*.24); glow(ctx, px, py - k*H*.06, 3 + k*8, '#f4ecdc', .12*Math.sin(k*Math.PI)); }
  // up the bank, a long way off, one man walking toward you, a little stiffly
  { const k = mo ? ((t/120000) % 1)*.3 : .15, px = lerp(W*.97, W*.84, k), py = LINE(1) + H*.07, sc = 1.3*s, step = mo ? Math.sin(t/300)*.6 : 0; ctx.fillStyle = '#16120e'; ctx.fillRect(px - 1*sc, py - 7*sc, 2*sc, 5*sc); ctx.fillRect(px - .9*sc + step, py - 2*sc, .8*sc, 2*sc); ctx.fillRect(px + .2*sc - step, py - 2*sc, .8*sc, 2*sc); ctx.beginPath(); ctx.arc(px, py - 8*sc, 1*sc, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,210,160,.4)'; ctx.fillRect(px + .6*sc, py - 7*sc, .5*sc, 5*sc); }
  squadLine(sceneSquad(), 1, (id, i) => drawFigure(ctx, id, W*.04 + i*Math.min(26, W*.3/Math.max(1, sceneSquad().length)) + 10, H*.97 - (i%2)*2, 2, t, {still:true, dir:1}));
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.86, H*.8, W*.4, '#ffb070', .05); ctx.globalCompositeOperation = 'source-over';
  vign(ctx, W, H, .45, .5); };
