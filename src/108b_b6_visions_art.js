/* ============ Book Six: the visions' art (108) — backdrops VISBG b6v_* and b6deck, the figures FIGX b6v_* ============
   Drawn the way Books Four and Five draw their visions (78b, 88b): a few strokes per place, figures in the ~32px frame lit from the left,
   and 36b's drawVision laying the vision's own figure, the motes, the violet and the vignette over each backdrop. Book Six's look (the
   brief, "What is different (artists)"): bone-coloured walls, scrub and smoke-red dusk for the Odhan and Y'Ghatan; rain, grey sea, mud
   and canvas for the north coast and G'danisban; grey water, crowded jetties and Mock's Hold on its rock for Malaz City.
   Headline only: Y'Ghatan's fire is orange in the temple's high windows and smoke along its ceiling, never a burning figure; the sick are
   a shape under a blanket at a lamp's distance; the falling lights are twelve points of light and nothing more; Mock's Hold is a black
   silhouette on its rock. The shades in Shadow are thin grey breath, with no shape that says what they are.
   Reused: leoman (56), keneb (54b), hurlochel (60d), b4_c4_grub (74b), b2soldier (47b), b6_rioter (107b), shade (18), the readers
   marrow, tallow, tuft, sohra, b4v_oldninth (78b), b3v_benna (68b); the helpers B4VB (78b), B3VB (68b), B5VB (88b). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Apsalar: slight, dark-haired, in close dark clothes and a dark travelling cloak with the hood back; a knife low in each hand */
  b6v_apsalar(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .9, 1.02); const sw = o.still ? 0 : Math.sin(t/500 + (o.phase || 0))*.4;
    poly(ctx, [[-5.4,-6],[5,-6],[6.6,11 + sw],[-7.6 - sw,11.4]], h.armor('#2a2a32', '#08080c')); // the cloak
    h.legs('#141418'); h.torso('#26262e', '#0c0c10', 5); ctx.fillStyle = '#1a1612'; ctx.fillRect(-5, 3, 10, 1); // belt
    poly(ctx, [[-5.6,-6.6],[-3.6,-9.6],[3.6,-9.6],[5.6,-6.6]], '#1e1e26'); // the hood, back on her shoulders
    h.head('#c8a88e', 3.9, -11.4); h.look('rgba(14,10,10,.9)', -11.6); B2F.cap(ctx, '#0e0a0a', 4.1, -12.4, 1.02, 1.98); ctx.fillStyle = '#0e0a0a'; ctx.fillRect(-4.1, -12.4, 1.4, 5); // dark hair, tied back
    B2F.line(ctx, '#c8ccd4', .8, [[6.4, 3.6], [8.8, 7.6]]); B2F.line(ctx, '#c8ccd4', .8, [[-6.4, 3.6], [-8.6, 7.4]]); ell(ctx, 6, 3, 1, 1, '#c8a88e'); ell(ctx, -6, 3, 1, 1, '#c8a88e'); // the knives, held low
    ctx.restore(); },
  /* Corabb Bhilan Thenu'alas: a big broad desert warrior, a sun-dark face and a black beard, a dun robe scorched at the hem over mail,
     a scarf wound round his head, a heavy sword sheathed at his hip. o.child: a small child on his left hip */
  b6v_corabb(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.1, 1.08);
    h.legs('#3a2e22'); B2F.robe(ctx, h, '#8a7656', '#3a2e1e', 7, 8.6); ctx.fillStyle = 'rgba(20,14,10,.55)'; ctx.fillRect(-8.4, 10.2, 16.8, 2.2); // the robe, scorched at the hem
    ctx.fillStyle = 'rgba(120,120,124,.6)'; ctx.fillRect(-6, -6, 12, 2.4); // mail at the neck
    ctx.fillStyle = '#2a1e14'; ctx.fillRect(-7, 2.6, 14, 1.4); ctx.fillStyle = '#1a1410'; ctx.fillRect(5.6, 3, 2, 9); ctx.fillStyle = '#8a7a5a'; ctx.fillRect(5, 2.2, 3.2, .9); // belt, the sheathed sword
    h.head('#7a5236', 4.5, -11.2); h.look('rgba(14,8,6,.9)', -11.4); poly(ctx, [[-3.6,-9.6],[4.6,-9.6],[4,-6.2],[1.4,-4.8],[-1.8,-5.2],[-3.4,-7]], '#140e0a'); // the black beard
    B2F.cap(ctx, '#c8b48c', 4.9, -12.4, 1, 2); ctx.fillStyle = '#c8b48c'; ctx.fillRect(-5.2, -12.8, 10.4, 1.8); poly(ctx, [[-5.2,-12],[-3,-12],[-4.6,-5],[-6.6,-6]], '#b8a47c'); // the head-scarf
    if (o.child) { ell(ctx, -6.4, -1, 2.6, 3.6, '#6a5a44'); ell(ctx, -6.2, -5.6, 1.9, 2, '#8a6044'); ctx.fillStyle = '#1a120c'; ctx.beginPath(); ctx.arc(-6.2, -6.2, 2, Math.PI, 0); ctx.fill(); B2F.line(ctx, '#7a5236', 1.6, [[-5.6, -4], [-8.4, 1.4]]); }
    ctx.restore(); },
  /* Noto Boil, chief cutter of Onearm's Host: a thin man going bald, in the Host's blue-grey with a cutter's stained leather apron over it,
     a bag on a strap across him. o.kneel: sitting on a wagon tongue, his tools on a cloth */
  b6v_noto(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1.06);
    B2F.line(ctx, '#3a2a1a', 1, [[-5.4, -6], [5.6, 3]]); ell(ctx, 6.4, 4.6, 3, 2.6, '#5a4430'); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(4, 4, 5, .6); // the bag
    h.legs('#2a2c34'); h.torso('#5a6474', '#22262e', 5.4); poly(ctx, [[-3.8,-3],[3.8,-3],[4.4,9],[-4.4,9]], '#6a5440'); ctx.fillStyle = 'rgba(60,24,18,.35)'; ctx.fillRect(-2.6, 2, 3, 2.4); ctx.fillRect(.4, 5.6, 2.4, 1.6); // the apron, stained
    h.head('#c4a48a', 4, -11.2); h.look('rgba(30,20,14,.85)', -11.4); ctx.fillStyle = '#4a3a2e'; ctx.fillRect(-4.2, -12.6, 1.4, 3); ctx.fillRect(3, -12.6, 1.2, 2.4); // bald on top, a fringe at the sides
    ctx.fillStyle = 'rgba(255,240,220,.2)'; ctx.fillRect(-1.4, -15, 3, 1); // light on the scalp
    if (o.tools) { ctx.fillStyle = '#d8d0c0'; ctx.fillRect(-10, 11.6, 20, 2.4); ctx.fillStyle = '#9aa0a8'; for (let i=0;i<5;i++) ctx.fillRect(-8.4 + i*3.6, 12, 2, .6); }
    ctx.restore(); },
  /* Dunsparrow, seen across the temple: a woman in a dark desert robe and a veil let down, arms folded */
  b6v_dunsparrow(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1.04);
    h.legs('#2a2018'); B2F.robe(ctx, h, '#4a3a2e', '#1a140e', 5.6, 7.4); ell(ctx, 0, .4, 5.6, 1.8, '#3a2c22'); // arms folded
    h.head('#a07a5a', 4, -11.2); h.look('rgba(14,8,6,.9)', -11.4); poly(ctx, [[-4.6,-12],[0,-17.6],[4.6,-12],[4.8,-5],[-4.8,-5]], 'rgba(40,30,24,.9)'); ell(ctx, .6, -10.6, 3, 3.2, '#a07a5a'); h.look('rgba(14,8,6,.9)', -11.2);
    ctx.restore(); },
});

/* ---------------- backdrop helpers ---------------- */
const B6VB = {
  /* scrub on flat ground: low dark tufts */
  scrub(ctx, W, y0, y1, n, col, seed = 1){ for (let i=0;i<n;i++){ const d = hash(i, seed), x = hash(i, seed + 1)*W, y = y0 + d*(y1 - y0), s = 1.5 + d*5; ell(ctx, x, y, s*1.6, s*.7, col); ell(ctx, x + s*.8, y - s*.3, s, s*.6, col); } },
  /* rain: slanting streaks */
  rain(ctx, W, H, T, n = 60, a = .22, seed = 3){ ctx.strokeStyle = `rgba(200,212,226,${a})`; ctx.lineWidth = 1; ctx.beginPath(); for (let i=0;i<n;i++){ const x = (hash(i, seed)*W*1.2 + (REDUCE() ? 0 : T*.05)) % (W*1.2) - W*.1, y = (hash(i, seed + 1)*H + (REDUCE() ? 0 : T*.35)) % H; ctx.moveTo(x, y); ctx.lineTo(x - 3, y + 9); } ctx.stroke(); },
  /* flat roofs of a Seven Cities town in a band, with lit windows */
  roofs(ctx, W, y, col, seed, lit = 6, T = 0){ ctx.fillStyle = col; for (let i=0;i<20;i++){ const x = i*W/18 - 8, hh = 8 + hash(i, seed)*22, w = W/18 + 4; ctx.fillRect(x, y - hh, w, hh + 2); if (hash(i, seed + 1) > .82) { ctx.beginPath(); ctx.arc(x + w/2, y - hh, w*.3, Math.PI, 0); ctx.fill(); } }
    for (let i=0;i<lit;i++){ const x = W*hash(i, seed + 2), yy = y - 4 - hash(i, seed + 3)*14; glow(ctx, x, yy, 8, '#ffb060', .35 + (REDUCE() ? 0 : Math.sin(T/700 + i)*.05)); ctx.fillStyle = 'rgba(255,200,120,.8)'; ctx.fillRect(x - 1, yy - 1, 2, 2); } },
  /* Mock's Hold on its rock: a silhouette only */
  hold(ctx, x, y, s, col){ poly(ctx, [[x - 40*s, y],[x - 30*s, y - 22*s],[x - 16*s, y - 34*s],[x + 6*s, y - 38*s],[x + 22*s, y - 30*s],[x + 34*s, y - 16*s],[x + 44*s, y]], col);
    ctx.fillStyle = col; ctx.fillRect(x - 14*s, y - 50*s, 26*s, 14*s); ctx.fillRect(x - 6*s, y - 60*s, 9*s, 12*s); ctx.fillRect(x + 8*s, y - 56*s, 6*s, 8*s); for (let i=0;i<5;i++) ctx.fillRect(x - 14*s + i*6*s, y - 53*s, 3*s, 3*s); },
  /* a small rowing boat, low in the water, loaded or empty */
  boat(ctx, x, y, s, full, col = '#2a2018'){ poly(ctx, [[x - 9*s, y - 2*s],[x + 9*s, y - 2*s],[x + 7*s, y + 1.4*s],[x - 7*s, y + 1.4*s]], col); if (full) for (let i=0;i<4;i++) ell(ctx, x - 5*s + i*3.4*s, y - 4*s, 1.2*s, 1.5*s, '#3a3a34'); },
  /* a card lying on the reading surface, its back violet */
  card(ctx, x, y, r = -.08){ ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-6, -9, 14, 20); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-7, -10, 14, 20); ctx.fillStyle = 'rgba(150,120,220,.5)'; ctx.fillRect(-5.4, -8.4, 10.8, 16.8); ctx.restore(); },
  /* the twelve lights in a curve below the moon; k 0..1 how far they have come down */
  lights(ctx, W, H, T, mx, my, k){ for (let i=0;i<12;i++){ const a = Math.PI*(.18 + i*.058), r = W*.22, x = mx + Math.cos(a)*r*1.2 - r*.05, y = my + Math.sin(a)*r*.5 + H*.12 + k*H*.12 + (REDUCE() ? 0 : Math.sin(T/400 + i)*.6);
    glow(ctx, x, y, 14, '#fff4dc', .5); ctx.fillStyle = '#ffffff'; ctx.fillRect(x - 1.2, y - 1.2, 2.4, 2.4); } },
};

Object.assign(VISBG, {
  /* the well on the Lato Odhan: a smoke-red dusk, the flat with its scrub, the remnant camped round a ring of old stones. Step 1 the book on
     the well's lip and Corabb in the scrub; step 2 Corabb chewing; step 3 night, Corabb talking to the stars (a shimmer round him); step 4
     the fires down among the men, Corabb gone to them. */
  b6v_well(ctx, W, H, T, v){ const s = v.step || 0, night = s >= 3;
    B4VB.sky(ctx, W, H*.62, night ? [[0, '#06060c'], [.7, '#1a1420'], [1, '#3a2018']] : [[0, '#2a1c22'], [.6, '#8a4430'], [1, '#c87a4a']]);
    if (night) B3VB.stars(ctx, W, H, T, 70, .55, .8, 61); else glow(ctx, W*.18, H*.6, W*.3, '#ff9050', .3);
    ctx.fillStyle = night ? '#1a1610' : '#5a4630'; ctx.fillRect(0, H*.62, W, H*.38); ctx.fillStyle = night ? '#120e0a' : '#3a2e20'; ctx.fillRect(0, H*.62, W, 3);
    B6VB.scrub(ctx, W, H*.64, H, 40, night ? '#0c0a08' : '#2a2216', 63);
    for (let i=0;i<9;i++){ const x = W*(.06 + hash(i, 64)*.88), y = H*(.64 + hash(i, 65)*.06); B3VB.tent(ctx, x, y, .5 + hash(i, 66)*.3, night ? '#0e0c0a' : '#3a2c1e'); }
    for (let i=0;i<5;i++) B4VB.horse(ctx, W*(.72 + i*.04), H*.66, .6, night ? '#0a0806' : '#2a2016', T, i, -1);
    if (s >= 3) for (let i=0;i<5;i++) B4VB.fire(ctx, W*(.1 + i*.17), H*(.66 + hash(i, 67)*.03), T, .45);
    const wx = W*.54, wy = H*.82; ell(ctx, wx, wy + 2, 30, 7, 'rgba(0,0,0,.35)'); ctx.fillStyle = night ? '#4a4034' : '#9a8a6a'; ctx.beginPath(); ctx.ellipse(wx, wy, 26, 7, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#060504'; ctx.beginPath(); ctx.ellipse(wx, wy - 1, 18, 4.4, 0, 0, 7); ctx.fill(); // the ring of stones
    ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; for (let i=0;i<8;i++){ const a = i/8*Math.PI*2; ctx.beginPath(); ctx.moveTo(wx + Math.cos(a)*18, wy + Math.sin(a)*4.4); ctx.lineTo(wx + Math.cos(a)*26, wy + Math.sin(a)*7); ctx.stroke(); }
    B2F.line(ctx, night ? '#2a2018' : '#6a5030', 1.2, [[wx + 8, wy - 18], [wx + 8, wy - 2]]); B2F.line(ctx, night ? '#2a2018' : '#5a4028', 1.6, [[wx - 4, wy - 20], [wx + 20, wy - 16]]); // the rope and its beam
    if (s >= 1 && s <= 3) { ctx.fillStyle = '#2a1a10'; ctx.fillRect(wx - 22, wy - 7, 9, 5); ctx.fillStyle = '#c8b48c'; ctx.fillRect(wx - 21.4, wy - 6.4, 7.8, 1); } // the book on the lip
    if (s >= 1 && s <= 3) { const cx = W*.8, cy = H*.86; drawFigure(ctx, 'b6v_corabb', cx, cy, 1.6, T, {still:true, dir:-1});
      if (s === 3) for (let i=0;i<10;i++){ const a = T/900 + i*.63, x = cx + Math.cos(a)*18, y = cy - 24 + Math.sin(a*1.3)*10; ctx.fillStyle = `hsla(${(i*37 + T/20) % 360},70%,70%,${.35 + .3*Math.sin(T/300 + i)})`; ctx.fillRect(x, y, 1.6, 1.6); } } // the toad's dreams
    return {fx:W*.4, fy:H*.86, fs:2.2}; },

  /* Ehrlitan: step 0-1 the city at night, flat roofs and lamps, the old broken hill of Jen'rahb behind, one tavern window lit; step 2
     Shadow, grey and cold, chains across the ground, two shackled shapes and two thin shades rising; step 3 Jen'rahb's ruins close, a
     dark doorway, the shades waiting; step 4 the same, with the bay beyond and the Host's lamps in the rain along it. */
  b6v_ehrlitan(ctx, W, H, T, v){ const s = v.step || 0;
    if (s === 2) { ctx.fillStyle = vgrad(ctx, 0, H, [[0, '#3a3a42'], [1, '#18181e']]); ctx.fillRect(0, 0, W, H);
      for (let i=0;i<9;i++){ const x = ((hash(i, 71)*W + (REDUCE() ? 0 : T*.008*(1 + hash(i, 72)))) % (W + 80)) - 40; ell(ctx, x, H*(.4 + hash(i, 73)*.5), 40 + hash(i, 74)*50, 8, 'rgba(130,128,140,.12)'); }
      ctx.strokeStyle = 'rgba(14,14,18,.8)'; ctx.lineWidth = 1.4; for (let i=0;i<10;i++){ ctx.beginPath(); ctx.moveTo(hash(i, 75)*W, H); ctx.quadraticCurveTo(W*hash(i, 76), H*(.6 + hash(i, 77)*.2), hash(i, 78)*W, H*.55); ctx.stroke(); } // the chains
      for (let i=0;i<2;i++){ const x = W*(.62 + i*.16), y = H*.84; ell(ctx, x, y, 14, 3, '#101014'); ell(ctx, x - 12, y - 1, 3, 2.4, '#101014'); B2F.line(ctx, '#2a2a30', 1, [[x + 12, y], [x + 26, y + 6]]);
        drawFigure(ctx, 'shade', x, y - 10 - (REDUCE() ? 4 : (Math.sin(T/700 + i)*3 + 4)), 1.3, T, {air:true, phase:i, alpha:.45}); }
      return {fx:W*.3, fy:H*.88, fs:2.2}; }
    B4VB.sky(ctx, W, H*.6, [[0, '#04050a'], [1, '#161a28']]); B3VB.stars(ctx, W, H, T, 50, .45, .6, 71);
    if (s >= 3) { // Jen'rahb, close: the broken hill, its walls, a doorway
      poly(ctx, [[0, H*.7],[W*.2, H*.44],[W*.5, H*.36],[W*.8, H*.46],[W, H*.6],[W, H],[0, H]], '#1e1a18');
      [[.2, .5, 18, 30], [.34, .4, 24, 40], [.6, .4, 30, 46], [.78, .48, 16, 24]].forEach(([x, y, w, hh], i) => { ctx.fillStyle = '#2e2824'; ctx.fillRect(W*x, H*y - hh, w, hh); poly(ctx, [[W*x, H*y - hh],[W*x + w*.4, H*y - hh - 6],[W*x + w, H*y - hh + 3]], '#2e2824'); });
      ctx.fillStyle = '#050404'; ctx.fillRect(W*.62, H*.52, 14, 22); glow(ctx, W*.62 + 7, H*.6, 14, '#1a1418', .4);
      for (let i=0;i<2;i++) drawFigure(ctx, 'shade', W*(.78 + i*.06), H*(.78 - i*.02), 1, T, {air:true, phase:i, alpha:.35});
      if (s >= 4) { B4VB.sea(ctx, W, H, H*.62, '#141a22', '#06080c', T, 7); ctx.fillStyle = '#1e1a18'; ctx.fillRect(0, H*.74, W, H*.26); for (let i=0;i<12;i++) glow(ctx, W*(.72 + i*.022), H*(.6 - i*.004), 5, '#ffb070', .3); B6VB.rain(ctx, W, H*.66, T, 30, .12, 7); }
      return {fx:W*.4, fy:H*.9, fs:2.2}; }
    poly(ctx, [[W*.5, H*.6],[W*.62, H*.36],[W*.74, H*.3],[W*.86, H*.38],[W, H*.5],[W, H*.6]], '#100e12'); // Jen'rahb behind
    B6VB.roofs(ctx, W, H*.72, '#0c0b0e', 77, 8, T); ctx.fillStyle = '#0e0c10'; ctx.fillRect(0, H*.72, W, H*.28);
    const lit = s === 1; ctx.fillStyle = lit ? 'rgba(255,190,110,.9)' : 'rgba(255,190,110,.6)'; ctx.fillRect(W*.62, H*.52, 8, 9); glow(ctx, W*.62 + 4, H*.56, lit ? 30 : 20, '#ffb060', .35); // the tavern's upstairs window
    glow(ctx, W*.66, H*.84, 26, '#ffb060', .2); ctx.fillStyle = '#ffd090'; ctx.fillRect(W*.66 - 2, H*.8, 4, 8); // the door below
    return {fx:W*.34, fy:H*.9, fs:2.2}; },

  /* the temple of the Queen of Dreams: pale stone pillars, an altar, high windows orange with the fire outside, smoke along the ceiling
     (lower with each step). Steps 0-2 Leoman and Dunsparrow by the inner door; step 2 the door lit with a light that is not firelight;
     step 3 the door shut and dark, the children behind the altar; step 4 the side door open on smoke and the Malazans in it. */
  b6v_temple(ctx, W, H, T, v){ const s = v.step || 0, f = REDUCE() ? 1 : .85 + Math.sin(T/90)*.08 + Math.sin(T/37)*.05;
    ctx.fillStyle = vgrad(ctx, 0, H, [[0, '#1e1612'], [1, '#3a2e24']]); ctx.fillRect(0, 0, W, H);
    for (let i=0;i<5;i++){ const x = W*(.1 + i*.2); ctx.fillStyle = `rgba(255,${120 + i*8},50,${.75*f})`; ctx.fillRect(x, H*.1, 10, 18); glow(ctx, x + 5, H*.1 + 9, 40, '#ff7a30', .25*f); } // the high windows
    ctx.fillStyle = '#c8b89c'; ctx.fillRect(0, H*.7, W, H*.3); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let i=0;i<10;i++) ctx.fillRect(0, H*(.72 + i*.03), W, 1); // the pale floor
    ctx.fillStyle = 'rgba(255,130,60,.12)'; ctx.fillRect(0, H*.7, W, H*.3);
    [.06, .28, .72, .94].forEach((x, i) => { ctx.fillStyle = vgrad(ctx, 0, H*.7, [[0, '#8a7a62'], [1, '#c8b89c']]); ctx.fillRect(W*x - 7, H*.18, 14, H*.52); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(W*x + 3, H*.18, 4, H*.52); }); // pillars
    ctx.fillStyle = '#a89878'; ctx.fillRect(W*.5, H*.6, W*.14, H*.12); ctx.fillStyle = '#8a7a5e'; ctx.fillRect(W*.49, H*.58, W*.16, 4); glow(ctx, W*.57, H*.56, 12, '#e8d8ff', .15); // the altar
    const dx = W*.82, dy = H*.36; ctx.fillStyle = '#1a120c'; ctx.fillRect(dx - 12, dy, 24, H*.34); // the inner door
    if (s === 2) { const g = REDUCE() ? 1 : .8 + Math.sin(T/200)*.2; ctx.fillStyle = `rgba(230,224,255,${.75*g})`; ctx.fillRect(dx - 10, dy + 2, 20, H*.34 - 2); glow(ctx, dx, dy + H*.17, 50, '#d8d0ff', .3*g); }
    if (s <= 2) { drawFigure(ctx, 'leoman', dx - 22, H*.72, 1.6, T, {still:true, dir:-1}); drawFigure(ctx, 'b6v_dunsparrow', dx + 18, H*.72, 1.5, T, {still:true, dir:-1}); }
    if (s >= 3) for (let i=0;i<5;i++) B3VB.walker(ctx, W*(.52 + i*.025), H*.72, .9 + hash(i, 81)*.3, '#2a2016', T, i, i % 2 ? 1 : -1); // the children
    if (s >= 4) { ctx.fillStyle = 'rgba(255,140,60,.9)'; ctx.fillRect(W*.16, H*.4, 22, H*.3); glow(ctx, W*.16 + 11, H*.55, 50, '#ff7a30', .4*f); for (let i=0;i<4;i++) drawFigure(ctx, 'b2soldier', W*(.16 + i*.03) + 4, H*.72, 1.2, T, {still:true, dir:1, alpha:.85}); ctx.fillStyle = 'rgba(40,30,26,.5)'; ctx.fillRect(W*.1, H*.36, 50, 20); }
    const sm = [.12, .16, .2, .26, .32][Math.min(s, 4)]; ctx.fillStyle = vgrad(ctx, 0, H*sm*1.6, [[0, 'rgba(40,30,24,.95)'], [1, 'rgba(60,46,36,0)']]); ctx.fillRect(0, 0, W, H*sm*1.6); // the smoke along the ceiling
    for (let i=0;i<6;i++) ell(ctx, ((hash(i, 82)*W + (REDUCE() ? 0 : T*.01)) % (W + 60)) - 30, H*sm, 50, 6, 'rgba(50,38,30,.4)');
    return {fx:W*.34, fy:H*.86, fs:2.2}; },

  /* the field hospital before G'danisban: a long tent, canvas sagging under rain, lamps down its length, cots receding, and in the
     foreground the screened cot with the High Fist under a blanket. Step 3 the cutter at the next cot, the Fist at the foot if sent for;
     step 4 outside, the tents in the rain and the hospital's lamps through its canvas. */
  b6v_hospital(ctx, W, H, T, v){ const s = v.step || 0;
    if (s >= 4) { B4VB.sky(ctx, W, H*.5, [[0, '#14161c'], [1, '#3a3e44']]); ctx.fillStyle = '#2a241e'; ctx.fillRect(0, H*.5, W, H*.5);
      for (let i=0;i<7;i++){ const x = W*(.05 + i*.15), y = H*(.56 + (i % 2)*.03); poly(ctx, [[x - 26, y + 14],[x - 18, y - 6],[x + 18, y - 6],[x + 26, y + 14]], i === 4 ? '#7a7466' : '#4a4640'); if (i === 4) glow(ctx, x, y + 4, 30, '#ffc070', .3); }
      for (let i=0;i<18;i++) ell(ctx, hash(i, 91)*W, H*(.78 + hash(i, 92)*.2), 10 + hash(i, 93)*16, 1.4, 'rgba(140,150,160,.18)'); // puddles
      B6VB.rain(ctx, W, H, T, 90, .3, 93); return {fx:W*.4, fy:H*.92, fs:2.2}; }
    ctx.fillStyle = vgrad(ctx, 0, H, [[0, '#4a4438'], [1, '#1a1814']]); ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; for (let i=0;i<9;i++){ ctx.beginPath(); ctx.moveTo(W*i/8, 0); ctx.quadraticCurveTo(W*.5, H*.3, W*.5, H*.42); ctx.stroke(); } // the canvas, its seams running to the far end
    B6VB.rain(ctx, W, H*.36, T, 26, .06, 94);
    ctx.fillStyle = '#2a2620'; ctx.fillRect(0, H*.62, W, H*.38);
    for (let r=0;r<5;r++){ const k = 1 - r*.17, y = H*(.62 + (4 - r)*.06), w = 30*k; for (const side of [-1, 1]) { const x = W*.5 + side*W*(.12 + (4 - r)*.08); ctx.fillStyle = '#4a4234'; ctx.fillRect(x - w/2, y - 4*k, w, 4*k); ell(ctx, x, y - 5*k, w*.42, 2.4*k, '#6a6050'); } if (r < 4) B4VB.lamp(ctx, W*.5, H*(.3 + r*.04), T, 26*k, .3); } // cots and lamps, receding
    const cx = W*.62, cy = H*.86; ctx.fillStyle = '#3a3026'; ctx.fillRect(cx - 40, cy - 10, 80, 10); ctx.fillStyle = '#2a2018'; ctx.fillRect(cx - 38, cy, 4, 8); ctx.fillRect(cx + 34, cy, 4, 8); // the cot
    poly(ctx, [[cx - 36, cy - 10],[cx + 30, cy - 10],[cx + 28, cy - 18],[cx - 30, cy - 18]], '#5a5a50'); ell(ctx, cx + 30, cy - 15, 7, 5, '#d8d0c0'); ell(ctx, cx + 30, cy - 16, 4.4, 3.6, '#b08c70'); ctx.fillStyle = '#d8d8d0'; ctx.fillRect(cx + 27, cy - 20, 6, 2); // blanket, pillow, his face, white hair
    ctx.fillStyle = '#7a7466'; ctx.fillRect(cx + 46, cy - 50, 3, 50); ctx.fillStyle = 'rgba(160,150,130,.55)'; ctx.fillRect(cx + 46, cy - 50, 24, 44); // the screen
    B4VB.lamp(ctx, cx + 40, cy - 30, T, 40, .4);
    if (s === 3) { drawFigure(ctx, 'b6v_noto', W*.2, H*.8, 1.6, T, {still:true, dir:1}); if (S && S.f && S.f.b6v4_fist === 'send') B3VB.walker(ctx, cx - 4, cy - 14, 3.2, '#2a2e36', T, 0, -1); }
    return {fx:W*.4, fy:H*.9, fs:2.2}; },

  /* the Kokakal shore: a high pale sky, the grey sea, Nok's transports at anchor, boats going out loaded; Grub by Keneb (step 1) and down
     the beach at a crab (step 2); step 3 the boats drawn up on the sand, the ships riding light; step 4 late light and dust on the Sotka
     road, the marines walking in. */
  b6v_kokakal(ctx, W, H, T, v){ const s = v.step || 0, late = s >= 4;
    B4VB.sky(ctx, W, H*.5, late ? [[0, '#6a6a80'], [1, '#e8b88a']] : [[0, '#9aa4ac'], [1, '#e4e0d4']]);
    B4VB.sea(ctx, W, H, H*.5, late ? '#7a7a80' : '#6a7a80', '#3a4a52', T, 13);
    for (let i=0;i<7;i++) B5VB.ship(ctx, W*(.1 + i*.13), H*(.5 + hash(i, 101)*.03), .5 + hash(i, 102)*.25, T, false, false);
    if (s <= 2) for (let i=0;i<4;i++){ const x = W*(.2 + i*.18) + (REDUCE() ? 0 : ((T*.004 + i*20) % 30)); B6VB.boat(ctx, x, H*(.6 + i*.015), 1, true); }
    ctx.fillStyle = late ? '#b8a07a' : '#c8b898'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H*.66); ctx.quadraticCurveTo(W*.5, H*.62, W, H*.7); ctx.lineTo(W, H); ctx.fill(); // the beach
    ctx.strokeStyle = 'rgba(240,240,236,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, H*.66); ctx.quadraticCurveTo(W*.5, H*.62, W, H*.7); ctx.stroke();
    if (s >= 3) for (let i=0;i<5;i++) B6VB.boat(ctx, W*(.5 + i*.09), H*(.7 + (i % 2)*.02), 1.3, false);
    for (let i=0;i<18;i++){ const x = W*(.44 + hash(i, 103)*.54), y = H*(.72 + hash(i, 104)*.2); B3VB.walker(ctx, x, y, 1 + hash(i, 105), 'rgba(60,64,56,.75)', T, i, hash(i, 106) > .5 ? 1 : -1); }
    if (s === 1) drawFigure(ctx, 'b4_c4_grub', W*.38, H*.9, 1.5, T, {still:true, dir:1});
    if (s === 2) drawFigure(ctx, 'b4_c4_grub', W*.7, H*.84, 1.2, T, {still:true, dir:-1});
    if (late) { B3VB.dust(ctx, W*.12, H*.66, W*.2, H*.14, T, .24, 9); for (let i=0;i<14;i++) B3VB.walker(ctx, W*(.04 + i*.018), H*(.68 + (i % 3)*.012), .9 + i*.04, 'rgba(50,40,30,.85)', T, i, 1); }
    return {fx:W*.3, fy:H*.92, fs:2.3}; },

  /* north-east of G'danisban: a deep blue sky and a pale moon, the plain, the Host's column on the road. Step 1 Sweetcreek riding up the
     column; step 2 the twelve lights in a curve below the moon; step 3 the same, lower, the column halted; step 4 riders gone off the road,
     the cutter's cloth laid out. */
  b6v_lights(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.6, [[0, '#0a1024'], [1, '#2a3450']]); B3VB.stars(ctx, W, H, T, 40, .5, .5, 111);
    const mx = W*.6, my = H*.14; glow(ctx, mx, my, 30, '#e8ecf4', .25); ell(ctx, mx, my, 9, 9, '#e8ecf0'); ell(ctx, mx + 2, my - 1, 2, 2, 'rgba(160,170,180,.5)');
    if (s >= 2) B6VB.lights(ctx, W, H, T, mx, my, s >= 3 ? .6 + (REDUCE() ? 0 : Math.min(.3, (T % 20000)/60000)) : 0);
    B3VB.ridge(ctx, W, H, H*.6, 8, 113, '#121418'); ctx.fillStyle = '#1a1c1e'; ctx.fillRect(0, H*.62, W, H*.38);
    poly(ctx, [[W*.48, H*.62],[W*.52, H*.62],[W*.9, H],[W*.3, H]], '#2a2a26'); // the road
    const halt = s >= 3; for (let i=0;i<22;i++){ const d = i/22, x = W*(.5 + (hash(i, 114) - .5)*.04 + d*.12), y = H*(.63 + d*.3); B3VB.walker(ctx, x, y, .5 + d*1.4, `rgba(40,44,56,${.5 + d*.4})`, halt ? 0 : T, i, 1); }
    B3VB.wagon(ctx, W*.66, H*.88, 1.1, '#3a3026', '#6a6458', '#1a1610');
    if (s === 1) B3VB.rider(ctx, W*.52, H*.74, 1.4, '#2a2420', T, 0, -1, false);
    if (s >= 4) for (let i=0;i<5;i++) B3VB.rider(ctx, W*(.3 - i*.04), H*(.66 + i*.006), .9, '#1a1814', T, i, -1, false);
    return {fx:W*.34, fy:H*.92, fs:2.2}; },

  /* Malaz City harbour: a grey sky, Mock's Hold black on its rock, the roofs of the city, the jetty with the marines across it and the
     crowd with torches at its landward end, the Froth Wolf and the black ship moored. Step 1 burning arrows arc over; step 4 the torches
     coming down the street again. */
  b6v_jetty(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.5, [[0, '#4a4e56'], [1, '#8a8a88']]); for (let i=0;i<3;i++) cloud(ctx, W*(.2 + i*.3), H*(.14 + i*.04), W*.3, 3, '#6a6e74', .2);
    B6VB.hold(ctx, W*.78, H*.42, 1, '#141416');
    B5VB.skyline(ctx, W, H*.52, '#2a2a2e', 121, 0, T); ctx.fillStyle = '#2a2a2e'; ctx.fillRect(0, H*.5, W, H*.06);
    for (let i=0;i<3;i++) { ctx.strokeStyle = 'rgba(70,70,74,.5)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(W*(.2 + i*.2), H*.5); ctx.quadraticCurveTo(W*(.24 + i*.2), H*.3, W*(.3 + i*.2) + (REDUCE() ? 0 : Math.sin(T/900 + i)*4), H*.16); ctx.stroke(); }
    B4VB.sea(ctx, W, H, H*.56, '#5a6266', '#2a3236', T, 17);
    B5VB.ship(ctx, W*.86, H*.66, 1.4, T, false, false); B5VB.ship(ctx, W*.66, H*.62, 1, T, true, false); // the Froth Wolf; the black ship beyond
    poly(ctx, [[W*.02, H*.56],[W*.12, H*.56],[W*.46, H],[W*.1, H]], '#4a3e30'); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; for (let i=0;i<10;i++){ const k = i/10; ctx.beginPath(); ctx.moveTo(W*(.02 + k*.08), H*(.56 + k*.44)); ctx.lineTo(W*(.12 + k*.34), H*(.56 + k*.44)); ctx.stroke(); } // the jetty
    const tor = s >= 4 ? .9 : .6; for (let i=0;i<14;i++){ const x = W*(.02 + hash(i, 122)*.12), y = H*(.56 + hash(i, 123)*.02); drawFigure(ctx, 'b6_rioter', x, y, .5, T, {still:true, pick:i, dir:1}); if (i % 3 === 0) { glow(ctx, x + 2, y - 12, 8, '#ff8a3a', tor*.6); ctx.fillStyle = '#ffc070'; ctx.fillRect(x + 1.6, y - 13, 1.4, 1.6); } }
    for (let i=0;i<6;i++) drawFigure(ctx, 'b2soldier', W*(.12 + i*.035), H*(.68 + i*.01), .9, T, {still:true, dir:-1});
    if (s === 1 && !REDUCE()) for (let i=0;i<4;i++){ const k = ((T/1600) + i*.25) % 1, x = W*(.08 + k*.78), y = H*(.5 - Math.sin(k*Math.PI)*.22); glow(ctx, x, y, 6, '#ff9040', .6); ctx.strokeStyle = 'rgba(255,170,90,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 8, y + (k < .5 ? 4 : -4)); ctx.stroke(); }
    return {fx:W*.36, fy:H*.9, fs:2.2}; },

  /* the reader, back at the chapter's reading place (B6DECK[n]): 1 a cook-fire on the Lato Odhan; 2 a tent fly on the north coast, rain,
     Ehrlitan's lamps along the bay; 3 the barrow field outside Y'Ghatan, the city still smoking; 4 a medicine crate by the surgeons' tents,
     rain; 5 the bluff above the Kokakal shore, the transports' lanterns below; 6 a shield on the halted road, the lights below the moon;
     7 a hatch cover at sea, a lantern on a stay. The card lies on whatever they read on. */
  b6deck(ctx, W, H, T, v){ const ch = (VISIONS[v.id] && VISIONS[v.id].ch) || 1;
    const SK = {1:['#06060c', '#2a1810'], 2:['#0c0e14', '#262a32'], 3:['#0a0806', '#3a1e12'], 4:['#14161c', '#3a3e44'], 5:['#06080e', '#1a2230'], 6:['#0a1024', '#2a3450'], 7:['#1a1e24', '#4a5058']}[ch];
    B4VB.sky(ctx, W, H*.64, [[0, SK[0]], [1, SK[1]]]); if (ch === 1 || ch === 3 || ch === 5 || ch === 6) B3VB.stars(ctx, W, H, T, 40, .5, .5, 130 + ch);
    const gnd = {1:'#3a3024', 2:'#2a241e', 3:'#2e2218', 4:'#2a241e', 5:'#4a4232', 6:'#1a1c1e', 7:'#4a3e30'}[ch]; ctx.fillStyle = gnd; ctx.fillRect(0, H*.64, W, H*.36);
    if (ch === 1) { B6VB.scrub(ctx, W, H*.66, H, 24, '#1a140e', 131); B4VB.fire(ctx, W*.7, H*.88, T, 1.8); }
    else if (ch === 2) { B4VB.sea(ctx, W, H, H*.58, '#1e262c', '#0a0e12', T, 132); ctx.fillStyle = gnd; ctx.fillRect(0, H*.72, W, H*.28); for (let i=0;i<14;i++) glow(ctx, W*(.5 + i*.03), H*(.56 + i*.002), 5, '#ffb070', .35); poly(ctx, [[0, H*.3],[W*.4, H*.36],[W*.42, H*.42],[0, H*.38]], '#4a4640'); B4VB.lamp(ctx, W*.74, H*.68, T, 40, .35); B6VB.rain(ctx, W, H, T, 60, .2, 133); }
    else if (ch === 3) { B3VB.ridge(ctx, W, H, H*.64, 10, 134, '#1a120c'); for (let i=0;i<4;i++) ell(ctx, W*(.15 + i*.22), H*.66, 30, 8, '#241a12'); glow(ctx, W*.85, H*.5, W*.25, '#ff6a30', .2); ctx.strokeStyle = 'rgba(60,46,36,.6)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(W*.85, H*.6); ctx.quadraticCurveTo(W*.8, H*.3, W*.7 + (REDUCE() ? 0 : Math.sin(T/900)*6), H*.05); ctx.stroke(); B4VB.fire(ctx, W*.66, H*.9, T, 1.2, '#ff6a30'); }
    else if (ch === 4) { for (let i=0;i<5;i++){ const x = W*(.1 + i*.2); poly(ctx, [[x - 24, H*.68],[x - 16, H*.5],[x + 16, H*.5],[x + 24, H*.68]], i === 3 ? '#7a7466' : '#4a4640'); } ctx.fillStyle = '#5a4a36'; ctx.fillRect(W*.4, H*.84, 40, 14); B4VB.lamp(ctx, W*.78, H*.6, T, 40, .35); B6VB.rain(ctx, W, H, T, 80, .26, 135); }
    else if (ch === 5) { B4VB.sea(ctx, W, H, H*.56, '#0e161e', '#04080c', T, 136); for (let i=0;i<9;i++) B4VB.lamp(ctx, W*(.08 + i*.11), H*(.6 + hash(i, 137)*.04), T, 10, .5); ctx.fillStyle = gnd; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H*.76); ctx.lineTo(W, H*.72); ctx.lineTo(W, H); ctx.fill(); }
    else if (ch === 6) { const mx = W*.6, my = H*.14; ell(ctx, mx, my, 9, 9, '#e8ecf0'); B6VB.lights(ctx, W, H, T, mx, my, .5); poly(ctx, [[W*.48, H*.64],[W*.52, H*.64],[W*.9, H],[W*.3, H]], '#2a2a26'); ctx.save(); ctx.translate(W*.5, H*.9); ctx.scale(1, .42); ctx.beginPath(); ctx.arc(0, 0, 18, 0, 7); ctx.fillStyle = '#4a4e5a'; ctx.fill(); ctx.strokeStyle = '#7a7e86'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
    else if (ch === 7) { B4VB.sea(ctx, W, H, H*.5, '#4a565e', '#1e262c', T, 138); ctx.fillStyle = '#5a4a36'; ctx.fillRect(0, H*.7, W, H*.3); ctx.fillStyle = 'rgba(0,0,0,.3)'; for (let i=0;i<6;i++) ctx.fillRect(0, H*(.72 + i*.05), W, 1); ctx.fillStyle = '#3a2e22'; ctx.fillRect(W*.34, H*.82, W*.3, H*.14); B4VB.lamp(ctx, W*.2, H*.5, T, 40, .4); B2F.line(ctx, '#2a2018', 1, [[W*.12, 0], [W*.2, H*.48]]); }
    B6VB.card(ctx, W*.5, H*.88);
    return {fx:W*.3, fy:H*.86, fs:2.4}; },
});

/* Corabb has the smallest child on his hip at the end of b6v3; Noto Boil has his tools out at the end of b6v6 */
{ const _df = drawFigure; drawFigure = function(ctx, kind, x, y, s, t, o = {}){
    if (kind === 'b6v_corabb' && VIS && VIS.id === 'b6v3' && VIS.step === 4 && o.child == null) o = Object.assign({}, o, {child:true});
    if (kind === 'b6v_noto' && VIS && VIS.id === 'b6v6' && VIS.step === 4 && o.tools == null) o = Object.assign({}, o, {tools:true});
    return _df(ctx, kind, x, y, s, t, o); }; }
