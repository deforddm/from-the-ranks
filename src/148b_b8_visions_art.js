/* ============ Book Eight: the visions' art (148) — backdrops VISBG b8v_* and b8deck, the figures FIGX b8v_* ============
   Drawn the way Books Three to Seven draw their visions (68b, 78b, 88b, 108b, 128b): a few strokes per place, figures in the ~32px frame
   lit from the left, and 36b's drawVision laying the vision's own figure, the motes, the violet and the vignette over each backdrop.
   Book Eight's look: Darujhistan's blue lamps and lake mist; the Domin's pale sky and the hard green of the fields; Black Coral's night
   that does not lift, with its lamps on iron arms; the Lamatath's grass under torchlight; the last night's fires and the broken moon; a
   grey place going soft at the edges.
   Headline only: what falls in Picker's lane is never drawn, the lane is empty when it happens; the scarecrows are rag shapes on poles at
   a distance, a dark streak down each pole and nothing else; the barrow is a long mound with offerings; the crossroads stops with two
   blades up; the storm in the last vision is a grey wall of nothing, the old dead fading where it touches them.
   Reused: b4_c7_karsa (77b), kallor and greysword (60d), b3_c7_bridgeburner (67b), b3_c4_priest (64b), b3_andii (60d), b3v_benna and the
   readers tuft and sohra; the helpers B3VB (68b), B4VB (78b), B5VB (88b), B6VB (108b), B7VB (128b). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Picker, retired: a broad-shouldered woman in a plain shirt and a leather vest, sleeves rolled, cropped brown hair, a knife at her belt,
     a market basket on her arm. No torcs and no Bridgeburner green any more */
  b8v_picker(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1.02);
    h.legs('#2e2a24'); ctx.fillStyle = '#3a2e22'; ctx.fillRect(-4.5, 9, 3.4, 4); ctx.fillRect(1.1, 9, 3.4, 4);
    ctx.fillStyle = '#9a7656'; ctx.fillRect(-8.6, -4.4, 2.6, 7); ctx.fillRect(6, -4.4, 2.6, 7); // forearms, sleeves rolled
    ctx.fillStyle = '#b8ac94'; ctx.fillRect(-8.8, -6, 3, 2); ctx.fillRect(5.8, -6, 3, 2); // the rolled sleeves
    poly(ctx, [[-6,-6],[6,-6],[6,6.6],[-6,6.6]], h.armor('#a89a80', '#4a4232')); poly(ctx, [[-6,-6],[-2,-6],[-2.6,6.6],[-6,6.6]], h.armor('#5a4430', '#22180e')); poly(ctx, [[2,-6],[6,-6],[6,6.6],[2.6,6.6]], h.armor('#5a4430', '#22180e')); // shirt under a vest
    ctx.fillStyle = '#1e140c'; ctx.fillRect(-6, 3, 12, 1.2); ctx.fillStyle = '#6a6a70'; ctx.fillRect(4, 3.6, 1, 4); // the belt, a knife
    h.head('#b48a6a', 4.2, -11.4); h.look('rgba(22,12,8,.9)', -11.7); B2F.cap(ctx, '#3a2414', 4.5, -12.6, 1, 2); ctx.fillStyle = '#3a2414'; ctx.fillRect(-4.5, -12.6, 1.2, 2.6);
    if (!(VIS && VIS.id === 'b8v1' && VIS.step === 4 && S && S.f && S.f.b8v1_basket !== 'keep')) { ctx.strokeStyle = '#6a4a28'; ctx.lineWidth = .9; ctx.beginPath(); ctx.arc(-8.4, 1.6, 3.2, Math.PI, 0); ctx.stroke(); poly(ctx, [[-12,2],[-4.8,2],[-5.6,6.4],[-11.2,6.4]], '#8a6a3a'); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-11.6, 3.8, 6.4, .5); ell(ctx, -9.6, 1.8, 1, .8, '#e8dcc4'); ell(ctx, -7.4, 1.6, 1, .8, '#e8dcc4'); } // the basket, eggs
    ctx.restore(); },
  /* Nimander: a young Tiste Andii, tall and slight, black-skinned, long black hair loose, a travel-worn dark cloak over a plain tunic,
     a sword at his hip. o.phase gives the kin behind him a different cloak */
  b8v_nimander(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1.14); const sw = o.still ? 0 : Math.sin(t/700 + (o.phase || 0))*.4, k = b2Pick(o, [['#2a2830', '#0c0b10'], ['#30282a', '#100c0c'], ['#262c2c', '#0a0e0e']]);
    poly(ctx, [[-6,-6.4],[5.6,-6.4],[6.8,11.4 + sw],[-8.4 - sw,11.8]], h.armor(k[0], k[1])); // the cloak, road-worn
    h.legs('#1a1a20'); h.torso('#3a3840', '#141418', 5.4); ctx.fillStyle = 'rgba(160,140,110,.25)'; ctx.fillRect(-5.4, 8, 10.8, 1.4); // dust at the hem
    B2F.line(ctx, '#8a8e98', 1, [[5.2, 3.4], [8.4, 11.6]]); // the sword
    h.head('#2a2630', 4, -11.6); h.look('rgba(200,200,220,.55)', -11.8); B2F.cap(ctx, '#050508', 4.2, -12.8);
    ctx.fillStyle = '#050508'; ctx.fillRect(-4.6, -12.8, 1.6, 9.6); ctx.fillRect(3, -12.8, 1.4, 8.4); // the hair, long and loose
    ctx.restore(); },
  /* the Seerdomin: a big man past his prime, grey-stubbled, heavy-shouldered, in a plain grey-brown coat with no badge, a cloak over it;
     o.kneel: on his knees, head bowed */
  b8v_seerdomin(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.1, o.kneel ? .78 : 1.06); if (o.kneel) ctx.translate(0, 2.8);
    poly(ctx, [[-7,-6.4],[6.6,-6.4],[7.8,11.6],[-8.6,12]], h.armor('#4a4438', '#1a1814')); // the cloak
    h.legs('#2a2620'); h.torso('#6a5e4a', '#2a2418', 7); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-6, -1.6, 2.4, 1.6); // a darker patch where a badge was cut off
    ctx.fillStyle = '#2a2016'; ctx.fillRect(-6.4, 3.2, 12.8, 1.4);
    const hy = o.kneel ? -10.4 : -11.4; h.head('#a88a6c', 4.6, hy); if (!o.kneel) h.look('rgba(20,14,10,.9)', hy - .2);
    ctx.fillStyle = 'rgba(140,134,124,.75)'; ctx.fillRect(-3.6, hy + 2.2, 8, 2); ctx.fillStyle = '#5a5248'; ctx.beginPath(); ctx.arc(0, hy - 1.2, 4.6, Math.PI*1.05, Math.PI*1.95); ctx.fill(); // grey stubble, cropped grey hair
    if (o.kneel) { ell(ctx, 3.4, 9.6, 2.2, 1.4, '#a88a6c'); ell(ctx, -2.4, 9.8, 2.2, 1.4, '#a88a6c'); }
    ctx.restore(); },
  /* Spinnock Durav: a tall Tiste Andii warrior, black-skinned, iron-grey hair tied back, a long dark leather coat over mail, a long sword;
     o.draw: the sword up in both hands */
  b8v_spinnock(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.2); const sw = o.still ? 0 : Math.sin(t/800 + (o.phase || 0))*.3;
    poly(ctx, [[-6.4,-6.4],[6,-6.4],[7,11.4 + sw],[-7.8 - sw,11.8]], h.armor('#2a2420', '#0c0a08')); // the long coat
    h.legs('#18161a'); h.torso('#4a4e56', '#1a1c22', 5.8); ctx.fillStyle = 'rgba(200,210,230,.15)'; for (let i=0;i<4;i++) ctx.fillRect(-4.6, -4 + i*2.4, 9.2, .5); // the mail
    ctx.fillStyle = '#1a1210'; ctx.fillRect(-5.8, 3.4, 11.6, 1.2);
    if (o.draw) { B2F.line(ctx, '#c8ccd4', 1.3, [[3, 0], [9, -16]]); B2F.line(ctx, '#3a2a1a', 1.8, [[2.2, 2], [3.4, -.6]]); }
    else { B2F.line(ctx, '#8a8e98', 1.1, [[-5.4, 3], [-9.4, 13]]); } // the sword: up, or sheathed
    h.head('#22202a', 4.1, -11.6); h.look('rgba(210,210,230,.55)', -11.8); B2F.cap(ctx, '#6a6a70', 4.3, -12.8);
    B2F.line(ctx, '#6a6a70', 1.6, [[-3.8, -11.4], [-5.6, -5.4]]); // the iron-grey hair, tied back
    ctx.restore(); },
  /* Samar Dev: a dark-haired woman of Seven Cities in a travel-stained robe and a long vest, hands to her temples (o.hands) */
  b8v_samar(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, .98);
    h.legs('#3a3028'); B2F.robe(ctx, h, '#8a6a48', '#3a2a18', 5.8, 7.6); poly(ctx, [[-5.8,-6],[-2,-6],[-3,11],[-7.2,11]], '#4a3a2a'); poly(ctx, [[2,-6],[5.8,-6],[7.2,11],[3,11]], '#4a3a2a'); // the vest
    h.head('#a07656', 4, -11.2); h.look('rgba(20,10,6,.9)', -11.4); B2F.cap(ctx, '#140c08', 4.3, -12.4); ctx.fillStyle = '#140c08'; ctx.fillRect(-4.3, -12.4, 1.6, 7.6); ctx.fillRect(2.8, -12.4, 1.4, 6.4);
    if (o.hands) { ell(ctx, -4.6, -11, 1.6, 1.8, '#a07656'); ell(ctx, 4.6, -11, 1.6, 1.8, '#a07656'); B2F.line(ctx, '#8a6a48', 2, [[-5, -5], [-4.6, -9.4]]); B2F.line(ctx, '#8a6a48', 2, [[5, -5], [4.6, -9.4]]); }
    else { ctx.fillStyle = '#a07656'; ctx.fillRect(-7.6, -2, 2.2, 5); ctx.fillRect(5.4, -2, 2.2, 5); }
    ctx.restore(); },
  /* a young woman from the pilgrims' camp: slight, in plain undyed pilgrim's clothes with the dust on them, hair under a cloth */
  b8v_pilgrimgirl(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .84, .9);
    h.legs('#4a4038'); B2F.robe(ctx, h, '#a89a82', '#5a5040', 5.4, 7); ctx.fillStyle = 'rgba(120,100,70,.35)'; ctx.fillRect(-6.4, 8.6, 12.8, 2.4); // dust at the hem
    h.head('#c09c7e', 3.8, -11.2); h.look('rgba(30,18,12,.85)', -11.4); B2F.cloth(ctx, '#8a7e6a', 'rgba(40,34,26,.5)');
    ctx.restore(); },
  /* Iskar Jarak: a soldier in old campaign kit gone grey with dust, a short grey beard, a helm, a sword at his hip, the weight on one leg
     (he limps); the colour washed out of all of it, a little of the background through him */
  b8v_iskar(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.06); ctx.globalAlpha *= .9; const lean = o.still ? .04 : .04 + Math.sin(t/900 + (o.phase || 0))*.02; ctx.rotate(lean);
    h.legs('#4a4a4c'); ctx.fillStyle = '#5a5a5c'; ctx.fillRect(1.1, 9, 3.4, 4); // one leg bearing less
    h.torso('#7a7a76', '#3a3a3a', 6.2); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-6.2, -1, 12.4, .6); ctx.fillRect(-5.8, 3.2, 11.6, 1.2);
    B2F.line(ctx, '#9a9a96', 1.1, [[5.6, 3.4], [9, 12.4]]); // the sword, sheathed
    h.head('#a8a29a', 4.2, -11.2); h.look('rgba(30,30,34,.85)', -11.4); poly(ctx, [[-3.4,-9.4],[4.2,-9.4],[3.6,-6.6],[.6,-5.6],[-2.2,-6.2],[-3.2,-7.6]], '#8a8680'); // the beard, grey
    B2F.cap(ctx, '#5e5e60', 4.6, -12.2, 1, 2); ctx.fillStyle = '#4e4e50'; ctx.fillRect(-4.8, -12.6, 9.6, 1.4); // the helm
    ctx.restore(); },
});

/* ---------------- backdrop helpers ---------------- */
const B8VB = {
  /* a torch on a tall pole, burning */
  torch(ctx, x, y, h, T, seed = 0){ ctx.fillStyle = '#2a1e14'; ctx.fillRect(x - 1, y - h, 2, h); const f = REDUCE() ? 1 : .85 + Math.sin(T/70 + seed)*.1 + Math.sin(T/27 + seed*2)*.05;
    glow(ctx, x, y - h - 3, 40, '#ff9a40', .35*f); B4VB.fire(ctx, x, y - h + 1, T, .45); },
  /* a scarecrow: a pole, a cross-bar, a rag-wrapped shape, and the dark streak down to the ground */
  scarecrow(ctx, x, y, s, col = '#3a3428'){ ctx.fillStyle = '#2a2218'; ctx.fillRect(x - .6*s, y - 22*s, 1.2*s, 22*s); ctx.fillRect(x - 5*s, y - 18*s, 10*s, 1*s);
    poly(ctx, [[x - 3*s, y - 19*s],[x + 3*s, y - 19*s],[x + 2.4*s, y - 8*s],[x - 2.4*s, y - 8*s]], col); ell(ctx, x, y - 20.6*s, 2*s, 2.2*s, col);
    ctx.fillStyle = 'rgba(14,10,8,.55)'; ctx.fillRect(x - .4*s, y - 8*s, .8*s, 8*s); },
  /* a lamp on an iron arm, Black Coral */
  armlamp(ctx, x, y, T, r = 26, dir = 1){ ctx.strokeStyle = '#141418'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x, y + 30); ctx.lineTo(x, y); ctx.lineTo(x + 7*dir, y); ctx.stroke(); B4VB.lamp(ctx, x + 7*dir, y + 3, T, r, .4, '#9ab8ff'); ctx.fillStyle = '#d8e4ff'; ctx.fillRect(x + 7*dir - 1.2, y + 1.6, 2.4, 3); },
  /* a broken moon: pieces apart in the dark, one sliding east (right) */
  moon(ctx, x, y, r, T, broken){ if (!broken) { glow(ctx, x, y, r*3, '#e8e8f0', .18); ell(ctx, x, y, r, r, '#d8d8e0'); B2F.line(ctx, 'rgba(40,40,60,.7)', .8, [[x - r*.6, y - r*.7], [x - r*.1, y], [x + r*.3, y + r*.8]]); return; }
    glow(ctx, x, y, r*3.4, '#e8e8f0', .14); const slide = REDUCE() ? 3 : (T/400) % 30;
    [[-.5, -.4, .55, 0], [.45, -.5, .45, 0], [-.3, .5, .5, 0], [.5, .45, .4, 1]].forEach(([dx, dy, k, mv], i) => { const px = x + dx*r*1.5 + (mv ? slide : 0), py = y + dy*r*1.5 + (mv ? slide*.3 : 0);
      poly(ctx, [[px - k*r, py - k*r*.3],[px - k*r*.2, py - k*r],[px + k*r*.9, py - k*r*.4],[px + k*r*.6, py + k*r*.8],[px - k*r*.6, py + k*r*.7]], i % 2 ? '#cfd0d8' : '#e0e0e8'); }); },
  /* the storm that is the end of a place: a grey wall without colour, eating the far edge */
  storm(ctx, W, H, x, T, a = 1){ const g = ctx.createLinearGradient(x - W*.2, 0, x + W*.1, 0); g.addColorStop(0, 'rgba(140,140,148,0)'); g.addColorStop(.6, `rgba(150,150,158,${.55*a})`); g.addColorStop(1, `rgba(196,196,204,${.95*a})`);
    ctx.fillStyle = g; ctx.fillRect(x - W*.2, 0, W, H); ctx.fillStyle = `rgba(200,200,208,${.95*a})`; ctx.fillRect(x + W*.1, 0, W, H);
    for (let i=0;i<10;i++){ const y = H*hash(i, 801), w = 30 + hash(i, 802)*60; ctx.fillStyle = `rgba(230,230,236,${.25*a})`; ctx.fillRect(x - w*.5 + (REDUCE() ? 0 : Math.sin(T/600 + i)*8), y, w, 1.4); } },
};

Object.assign(VISBG, {
  /* a Daru street at dusk: the lake-blue sky, the roofline with the blue gas lamps coming on, the crowd, a garland across the street; the
     lane past the tannery opens on the right. Steps 0-2 the crowd and the brown cloak behind; step 3 the lane, the corner, no lamp;
     step 4 the lane empty, then the bar's lamp far up the street */
  b8v_market(ctx, W, H, T, v){ const s = v.step || 0, lane = s >= 3;
    B4VB.sky(ctx, W, H*.6, [[0, '#0a0c1c'], [.7, '#2a2a4a'], [1, '#4a3a4a']]); B3VB.stars(ctx, W, H, T, 18, .3, .4, 811);
    B6VB.roofs(ctx, W, H*.5, '#0c0c14', 812, 8, T);
    for (let i=0;i<7;i++) { const x = W*(.06 + i*.15); ctx.fillStyle = '#16141c'; ctx.fillRect(x, H*.5, 1.4, H*.3); glow(ctx, x, H*.5, 18, '#6aa0ff', .35 + (REDUCE() ? 0 : Math.sin(T/500 + i)*.04)); ctx.fillStyle = '#bcd6ff'; ctx.fillRect(x - 1.2, H*.5 - 1.6, 2.4, 2.4); } // the blue lamps
    ctx.fillStyle = '#2a2630'; ctx.fillRect(0, H*.8, W, H*.2);
    if (!lane) { ctx.strokeStyle = 'rgba(180,120,90,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, H*.36); ctx.quadraticCurveTo(W*.5, H*.48, W, H*.36); ctx.stroke(); for (let i=0;i<12;i++){ const x = W*(i/11), y = H*.36 + Math.sin(i/11*Math.PI)*H*.1; ell(ctx, x, y + 2, 2, 2.6, ['#a04a3a', '#c8a050', '#5a7a4a'][i % 3]); } // a garland
      for (let i=0;i<16;i++) B7VB.mark(ctx, W*(.04 + hash(i, 813)*.92), H*(.86 + hash(i, 814)*.08), 1.2 + hash(i, 815)*.4, `rgba(16,14,22,${.7 + hash(i, 816)*.3})`); // the crowd
      if (s >= 1) drawFigure(ctx, 'b2soldier', W*.74, H*.94, 1.5, T, {still:true, dir:-1, alpha:.75}); } // the brown cloak, behind
    else { ctx.fillStyle = '#0c0a10'; ctx.fillRect(W*.62, H*.36, W*.38, H*.64); ctx.fillStyle = '#121018'; ctx.fillRect(W*.62, H*.36, 6, H*.64); // the lane's blind wall, the corner
      if (s === 4) { glow(ctx, W*.12, H*.62, 30, '#ffc070', .3); ctx.fillStyle = '#ffd890'; ctx.fillRect(W*.12 - 1.2, H*.62, 2.4, 3.6); } } // the bar's lamp, far up the street
    return lane ? {fx:W*.58, fy:H*.92, fs:2.4} : {fx:W*.36, fy:H*.92, fs:2.3}; },

  /* the scarecrow fields: a thin milk sky, the rows of green running away, scarecrows on poles to the horizon; the kin on the rise behind
     (steps 0-2); the half-built town and the priest on the road (steps 3-4) */
  b8v_fields(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.46, [[0, '#a8aab0'], [1, '#d8d6cc']]);
    ctx.fillStyle = '#4a5a30'; ctx.fillRect(0, H*.44, W, H*.56);
    for (let r=0;r<9;r++){ const y = H*(.46 + r*r*.0068), k = .3 + r*.09; ctx.fillStyle = `rgba(${40 + r*4},${90 + r*6},${30 + r*2},.9)`; for (let i=0;i<24;i++) ell(ctx, (i + (r % 2)*.5)/23*W, y, 3*k*2, 1.6*k*2, ctx.fillStyle); } // the rows, nearer and bigger
    for (let i=0;i<40;i++){ const r = hash(i, 821), y = H*(.46 + r*r*.5), x = W*hash(i, 822); B8VB.scarecrow(ctx, x, y, .25 + r*.9, '#3a3428'); } // the scarecrows, thousands
    if (s >= 3) { ctx.fillStyle = '#6a6252'; ctx.fillRect(W*.7, H*.38, W*.24, H*.07); for (let i=0;i<5;i++) ctx.fillRect(W*(.71 + i*.05), H*(.34 - hash(i, 823)*.04), W*.03, H*.06); B7VB.smoke(ctx, W, H*.3, T, .15, 824, 4); // the town, going up
      drawFigure(ctx, 'b3_c4_priest', W*.62, H*.8, 1.6, T, {still:s === 4, dir:-1}); }
    if (s <= 2) for (let i=0;i<3;i++) drawFigure(ctx, 'b8v_nimander', W*(.12 + i*.07), H*(.86 + i*.02), 1.6, T, {still:true, dir:1, phase:i + 1}); // his kin behind him
    return {fx:W*.34, fy:H*.92, fs:2.3}; },

  /* the Great Barrow: Black Coral's night, the city's lamps behind, the long mound heaped with offerings, pilgrims kneeling along it;
     the Seerdomin kneels (steps 1-2); the priestess stands on the road (step 3); the camp's fires along the road (step 4) */
  b8v_barrow(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.6, [[0, '#020208'], [1, '#0c0e1c']]); B3VB.stars(ctx, W, H, T, 8, .3, .25, 831);
    B5VB.skyline(ctx, W, H*.42, '#06060c', 832, 0, T); for (let i=0;i<9;i++) B4VB.lamp(ctx, W*(.04 + hash(i, 833)*.5), H*(.32 + hash(i, 834)*.08), T, 10, .4, '#9ab8ff'); // the city behind, its lamps
    ctx.fillStyle = '#0e0e14'; ctx.fillRect(0, H*.48, W, H*.52);
    ctx.fillStyle = vgrad(ctx, H*.46, H*.76, [[0, '#3a3a40'], [1, '#1a1a1e']]); ctx.beginPath(); ctx.moveTo(W*.3, H*.74); ctx.quadraticCurveTo(W*.62, H*.36, W*1.05, H*.6); ctx.lineTo(W*1.05, H*.76); ctx.fill(); // the barrow
    ctx.strokeStyle = 'rgba(154,184,255,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(W*.32, H*.73); ctx.quadraticCurveTo(W*.62, H*.37, W*1.05, H*.6); ctx.stroke(); // lamp-light along its back
    for (let i=0;i<60;i++){ const x = W*(.32 + hash(i, 835)*.7), y = H*(.66 + hash(i, 836)*.1); ctx.fillStyle = ['#8a7a4a', '#6a5a4a', '#a89a7a', '#4a4a5a'][i % 4]; ctx.fillRect(x, y, 1.6 + hash(i, 837)*2, 1.4); } // the offerings
    for (let i=0;i<8;i++) B7VB.mark(ctx, W*(.36 + i*.08), H*(.8 + hash(i, 838)*.04), .9, 'rgba(20,20,26,.9)'); // pilgrims kneeling
    if (s >= 4) for (let i=0;i<7;i++) B4VB.fire(ctx, W*(.04 + i*.08), H*(.84 + hash(i, 839)*.06), T, .4); // the camp, along the road
    if (s === 3) drawFigure(ctx, 'b8_c3_priestess', W*.5, H*.92, 2.1, T, {still:true, dir:-1});
    return s === 3 || s >= 4 ? {fx:W*.24, fy:H*.92, fs:2.4} : {fx:W*.22, fy:H*.9, fs:2.4}; },

  /* a tavern in Black Coral: low beams, a lamp on every table, the corner table with the board between two cups, the door on the night;
     the friend across the board (steps 0-3); the young woman in the door (step 3); the street under the lamps (step 4) */
  b8v_tavern(ctx, W, H, T, v){ const s = v.step || 0;
    if (s >= 4) { B4VB.sky(ctx, W, H, [[0, '#020208'], [1, '#0e1020']]); ctx.fillStyle = '#0a0a10'; ctx.fillRect(0, H*.2, W*.3, H*.7); ctx.fillRect(W*.7, H*.24, W*.3, H*.66); ctx.fillStyle = '#16161c'; ctx.fillRect(0, H*.86, W, H*.14);
      B8VB.armlamp(ctx, W*.28, H*.36, T, 34, 1); B8VB.armlamp(ctx, W*.72, H*.4, T, 30, -1); ctx.fillStyle = 'rgba(255,200,120,.5)'; ctx.fillRect(W*.06, H*.5, W*.1, H*.3); // the street, the tavern's lit door
      const k = REDUCE() ? .5 : ((T/14000) % 1); drawFigure(ctx, 'b8v_pilgrimgirl', W*(.5 + k*.4), H*(.9 - k*.12), 1.6 - k*.8, T, {dir:1}); return {fx:W*.34, fy:H*.94, fs:2.4}; }
    ctx.fillStyle = '#16120e'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#0e0a08'; for (let i=0;i<4;i++) ctx.fillRect(0, H*(.04 + i*.07), W, 5);
    ctx.fillStyle = '#221a12'; ctx.fillRect(0, H*.78, W, H*.22);
    ctx.fillStyle = '#04040a'; ctx.fillRect(W*.82, H*.3, W*.14, H*.5); B4VB.lamp(ctx, W*.89, H*.36, T, 10, .3, '#9ab8ff'); // the door, the night beyond it and a lamp on its arm
    for (let i=0;i<3;i++){ const x = W*(.12 + i*.2); ctx.fillStyle = '#2a2016'; ctx.fillRect(x - 12, H*.7, 24, 4); B4VB.lamp(ctx, x, H*.68, T, 18, .3); ctx.fillStyle = '#ffd890'; ctx.fillRect(x - 1, H*.67, 2, 3); } // the other tables
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(W*.42, H*.8, W*.24, 5); ctx.fillStyle = '#5a4a32'; ctx.fillRect(W*.47, H*.775, W*.14, 4); // the corner table, the board
    ctx.fillStyle = s >= 2 ? 'rgba(20,16,12,.9)' : '#c8b88a'; for (let i=0;i<6;i++) ctx.fillRect(W*(.48 + (i % 3)*.04), H*(.765 - (i > 2 ? .01 : 0)), 2, 3); // the pieces (yielded, after)
    B4VB.lamp(ctx, W*.54, H*.74, T, 30, .35); ctx.fillStyle = '#7a6a4a'; ctx.fillRect(W*.44, H*.77, 3, 4); ctx.fillRect(W*.64, H*.77, 3, 4); // the lamp, the cups
    drawFigure(ctx, 'b8v_seerdomin', W*.72, H*.94, 2.1, T, {still:true, dir:-1});
    if (s === 3) drawFigure(ctx, 'b8v_pilgrimgirl', W*.86, H*.82, 1.9, T, {still:true, dir:-1});
    return {fx:W*.36, fy:H*.94, fs:2.3}; },

  /* a crossroads in the grass at night: two roads, four torches on tall poles, the wind in the grass; the old man on the far road (step
     1 on, nearer by step 3); the jug at the foot of a pole (step 3 on); both blades up (step 4) */
  b8v_crossroads(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.5, [[0, '#020206'], [1, '#14121c']]); B3VB.stars(ctx, W, H, T, 60, .45, .6, 841);
    ctx.fillStyle = '#16140c'; ctx.fillRect(0, H*.46, W, H*.54); B7VB.grass(ctx, W, H*.48, H, 200, 'rgba(90,84,50,.55)', s >= 4 ? 0 : .3, T, 842);
    ctx.fillStyle = '#3a3426'; ctx.beginPath(); ctx.moveTo(W*.48, H*.47); ctx.lineTo(W*.52, H*.47); ctx.lineTo(W*.78, H); ctx.lineTo(W*.22, H); ctx.fill(); ctx.beginPath(); ctx.moveTo(0, H*.7); ctx.lineTo(W, H*.62); ctx.lineTo(W, H*.7); ctx.lineTo(0, H*.8); ctx.fill(); // the roads
    [[.26, .74], [.74, .66], [.3, .96], [.76, .9]].forEach(([x, y], i) => B8VB.torch(ctx, W*x, H*y, H*(.3 + y*.12), T, i));
    if (s >= 3) { ell(ctx, W*.78, H*.9, 2.6, 3.6, '#5a3a24'); ctx.fillStyle = '#3a2416'; ctx.fillRect(W*.78 - 1, H*.9 - 5, 2, 2); } // the jug
    if (s >= 1) { const near = s >= 3, x = W*(near ? .62 : .51), y = H*(near ? .86 : .5); drawFigure(ctx, 'kallor', x, y, near ? 2.2 : .8, T, {still:true, dir:-1});
      if (s >= 4) { B2F.line(ctx, '#c8ccd4', 2, [[x - 4, y - 18], [x - 26, y - 46]]); } } // the old man; his blade up
    return {fx:W*.4, fy:H*.88, fs:2.3}; },

  /* the broken wall on the last night: a black sky, the moon cracked and then in pieces (step 4), the wall's gap and the rubble, fires in
     the city beyond, smoke; Samar Dev holding her head (steps 0-2), straight again (step 3 on) */
  b8v_wall(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.6, [[0, '#04030a'], [.7, '#1a0e14'], [1, '#4a1e14']]); B3VB.stars(ctx, W, H, T, 30, .35, .5, 851);
    B8VB.moon(ctx, W*.74, H*.16, H*.07, T, s >= 4);
    B5VB.skyline(ctx, W, H*.6, '#0c080a', 852, 6, T); B7VB.smoke(ctx, W, H*.4, T, .35, 853, 6);
    ctx.fillStyle = '#2a2624'; ctx.fillRect(0, H*.36, W*.3, H*.4); ctx.fillRect(W*.7, H*.36, W*.3, H*.4); // the wall, either side of the gap
    for (let i=0;i<5;i++){ ctx.fillStyle = '#1a1816'; ctx.fillRect(W*(.3 - i*.012), H*(.36 + i*.06), 6, 8); ctx.fillRect(W*(.7 + i*.012) - 6, H*(.36 + i*.07), 6, 8); } // broken edges
    ctx.fillStyle = '#3a3430'; ctx.beginPath(); ctx.moveTo(W*.18, H); ctx.quadraticCurveTo(W*.5, H*.62, W*.84, H); ctx.fill(); for (let i=0;i<30;i++) ell(ctx, W*(.22 + hash(i, 854)*.58), H*(.78 + hash(i, 855)*.2), 3 + hash(i, 856)*5, 2 + hash(i, 857)*3, '#4a4440'); // the rubble
    for (let i=0;i<3;i++){ const x = W*(.36 + i*.12), y = H*(.8 + hash(i, 858)*.06); ell(ctx, x, y, 10, 4, 'rgba(10,8,8,.6)'); } // the prints, in the stone
    drawFigure(ctx, 'b8v_samar', W*.62, H*.9, 2, T, {still:true, dir:-1, hands:s <= 2});
    return {fx:W*.42, fy:H*.92, fs:2.6}; },

  /* a place that is ending: a grey plain cracking and going soft, a storm without colour on the far side; the column of the dead behind
     Iskar Jarak (steps 0-2), set in lines (step 3), the storm on the line (step 4: the oldest dead fading where it touches) */
  b8v_dead(ctx, W, H, T, v){ const s = v.step || 0, near = s >= 3;
    B4VB.sky(ctx, W, H*.55, [[0, '#4a4a52'], [1, '#7a7a80']]);
    ctx.fillStyle = '#5a5a5c'; ctx.fillRect(0, H*.5, W, H*.5); ctx.strokeStyle = 'rgba(30,30,34,.5)'; ctx.lineWidth = .8; ctx.beginPath(); for (let i=0;i<14;i++){ const x = W*hash(i, 861), y = H*(.55 + hash(i, 862)*.4); ctx.moveTo(x, y); ctx.lineTo(x + 20*(hash(i, 863) - .5), y + 6); ctx.lineTo(x + 30*(hash(i, 864) - .5), y + 14); } ctx.stroke(); // the cracks
    B8VB.storm(ctx, W, H, W*(s >= 4 ? .78 : near ? .9 : .98), T, s >= 4 ? 1 : .8);
    if (!near) for (let i=0;i<26;i++){ const r = hash(i, 865); drawFigure(ctx, i < 8 ? 'b3_c7_bridgeburner' : i % 3 ? 'b2soldier' : 'greysword', W*(.06 + r*.5), H*(.62 + hash(i, 866)*.28), .7 + hash(i, 866)*.7, T, {phase:i, dir:1, alpha:.55}); } // the column
    else for (let row=0;row<3;row++) for (let i=0;i<10;i++){ const x = W*(.18 + i*.055 + row*.02), y = H*(.62 + row*.1), fade = s >= 4 && row === 2 ? .2 : .6; drawFigure(ctx, row === 0 ? 'b3_c7_bridgeburner' : 'b2soldier', x, y, .9 + row*.2, T, {still:true, dir:1, alpha:fade, phase:i}); } // in their lines
    drawFigure(ctx, 'greysword', W*(near ? .2 : .44), H*(near ? .92 : .9), 2, T, {still:near, dir:1, alpha:.7}); // Brukhalian
    return {fx:W*(near ? .66 : .3), fy:H*.94, fs:2.4}; },

  /* the reader, back at the chapter's reading place (B8READ[n]): 1 the table at the Fourth's door, winter, the bar across it; 2 a wagon's
     tailboard by the caravan fire; 3 a stone sill under Black Coral's lamps; 4 a pilgrim's mat at the camp's edge; 5 the grass at dusk;
     6 the Fourth's step on the Fete's last evening, lanterns and the cracked moon; 7 the shingle by the lake at first light. A card on the
     surface; for Sohra, the bones */
  b8deck(ctx, W, H, T, v){ const ch = (VISIONS[v.id] && VISIONS[v.id].ch) || 1;
    const SK = {1:['#08060a', '#1e1410'], 2:['#04040a', '#1a1620'], 3:['#020208', '#0e1020'], 4:['#04040a', '#14101a'], 5:['#2a2a3a', '#a07060'], 6:['#06060e', '#2a1a1e'], 7:['#3a3a46', '#a8a0a8']}[ch];
    B4VB.sky(ctx, W, H*.64, [[0, SK[0]], [1, SK[1]]]);
    const gnd = {1:'#3a2a1c', 2:'#4a3a28', 3:'#2e3038', 4:'#3a3024', 5:'#5a5236', 6:'#3a3c44', 7:'#6a665c'}[ch]; ctx.fillStyle = gnd; ctx.fillRect(0, H*.64, W, H*.36);
    if (ch === 1) { ctx.fillStyle = '#1a120c'; ctx.fillRect(0, 0, W, H*.64); ctx.fillStyle = '#2a1e14'; ctx.fillRect(W*.74, H*.14, W*.16, H*.5); ctx.fillStyle = '#4a3a24'; ctx.fillRect(W*.72, H*.36, W*.2, 4); B4VB.fire(ctx, W*.12, H*.62, T, .9); B4VB.lamp(ctx, W*.12, H*.56, T, 60, .3); } // the door, barred; the fire
    else if (ch === 2) { B3VB.stars(ctx, W, H, T, 40, .45, .5, 871); for (let i=0;i<3;i++) B3VB.wagon(ctx, W*(.62 + i*.14), H*.62, .8, '#2a2016', '#5a5040', '#1a140e'); B4VB.fire(ctx, W*.18, H*.7, T, 1.2); ctx.fillStyle = '#5a4a36'; ctx.fillRect(W*.3, H*.8, W*.4, 6); } // the ring of wagons, the fire, the tailboard
    else if (ch === 3) { ctx.fillStyle = '#0a0a10'; ctx.fillRect(0, 0, W, H*.64); ctx.fillStyle = '#04040a'; ctx.fillRect(W*.2, H*.1, W*.6, H*.5); B8VB.armlamp(ctx, W*.34, H*.24, T, 30, 1); B8VB.armlamp(ctx, W*.66, H*.28, T, 26, -1); ctx.fillStyle = '#3a3c44'; ctx.fillRect(W*.16, H*.6, W*.68, 6); } // the window, the lamps, the sill
    else if (ch === 4) { B3VB.stars(ctx, W, H, T, 10, .3, .3, 872); for (let i=0;i<6;i++) B3VB.tent(ctx, W*(.08 + i*.17), H*.64, .7 + hash(i, 873)*.3, '#2a2420'); for (let i=0;i<3;i++) B4VB.fire(ctx, W*(.2 + i*.3), H*.7, T, .5); ctx.save(); ctx.translate(W*.5, H*.86); ctx.rotate(.04); ctx.fillStyle = '#5a4a3a'; ctx.fillRect(-W*.2, -8, W*.4, 16); ctx.restore(); } // tents, small fires, the mat
    else if (ch === 5) { B7VB.grass(ctx, W, H*.64, H, 220, 'rgba(110,104,60,.6)', .4, T, 874); ctx.fillStyle = '#3a3426'; ctx.fillRect(0, H*.6, W, 3); for (let i=0;i<4;i++){ const x = W*(.84 + i*.02); ctx.fillStyle = '#1a140c'; ctx.fillRect(x, H*.5, .8, H*.1); glow(ctx, x, H*.5, 5, '#ff9a40', .3); } } // the grass, the road, four tiny torches far off
    else if (ch === 6) { B3VB.stars(ctx, W, H, T, 20, .3, .4, 875); B8VB.moon(ctx, W*.78, H*.16, H*.06, T, false); B6VB.roofs(ctx, W, H*.5, '#0c0a10', 876, 6, T); ctx.strokeStyle = 'rgba(200,160,100,.6)'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(0, H*.3); ctx.quadraticCurveTo(W*.5, H*.42, W, H*.3); ctx.stroke(); for (let i=0;i<9;i++){ const x = W*(i/8), y = H*.3 + Math.sin(i/8*Math.PI)*H*.1; glow(ctx, x, y + 4, 10, '#ffb060', .4); ell(ctx, x, y + 4, 2.4, 3, '#e8a050'); } ctx.fillStyle = '#4a4c54'; ctx.fillRect(W*.2, H*.8, W*.6, 6); } // the moon, cracked; lanterns; the step
    else if (ch === 7) { B4VB.sea(ctx, W, H, H*.46, '#6a6a74', '#3a3a44', T, 877); B7VB.smoke(ctx, W, H*.3, T, .3, 878, 4); for (let i=0;i<2;i++) B6VB.boat(ctx, W*(.7 + i*.12), H*.66, .6, false); for (let i=0;i<40;i++) ell(ctx, W*hash(i, 879), H*(.7 + hash(i, 880)*.28), 1.6, 1, '#8a8478'); } // the lake, smoke from the Gadrobi side, boats, the shingle
    if (visReader().id === 'sohra') { for (let i=0;i<7;i++){ const x = W*(.44 + hash(i, 881)*.12), y = H*(.86 + hash(i, 882)*.06); ell(ctx, x, y, 2.2, 1.2, '#e8e0cc'); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(x - 1, y, 2, .5); } ctx.fillStyle = 'rgba(200,200,210,.08)'; ctx.fillRect(W*.48, H*.5, 6, H*.36); } // the bones, a thread of smoke
    else B6VB.card(ctx, W*.5, H*.88);
    return {fx:W*.3, fy:H*.86, fs:2.4}; },
});

/* the Seerdomin kneels at the barrow (b8v3 steps 1-2); Spinnock's sword comes up at the crossroads (b8v5 steps 3-4) */
{ const _df = drawFigure; drawFigure = function(ctx, kind, x, y, s, t, o = {}){
    if (kind === 'b8v_seerdomin' && VIS && VIS.id === 'b8v3' && o.kneel == null) o = Object.assign({}, o, {kneel:VIS.step >= 1 && VIS.step <= 2});
    if (kind === 'b8v_spinnock' && VIS && VIS.id === 'b8v5' && o.draw == null) o = Object.assign({}, o, {draw:VIS.step >= 3});
    return _df(ctx, kind, x, y, s, t, o); }; }
