/* ============ Book Ten: the visions' art (188) — backdrops VISBG b10v_* and b10deck, the figures FIGX b10v_* ============
   Drawn the way Books Three to Nine draw their visions (68b … 168b): a few strokes per place, figures in the ~32px frame lit from the
   left, and 36b's drawVision laying the vision's own figure, the motes, the violet and the vignette over each backdrop.
   Book Ten's look: night glass, blue-black (#2a3a52 → #070a10) with a cold starlight rim from the upper left; the stars thrown back by the
   ground on the glass; the southern road dry and dust-brown; the field before the city pale, the far tower white.
   Headline only: the battle is lines of small figures at a distance; the Kolansii are thin grey shapes walking away; the god of vision 7
   has no body drawn at all, only a banked light from below, a far shimmer of laughter and a book opening on nothing. The Aren Way is not
   drawn: Gesler's camp is the present, with the dog.
   Reused: gesler, stormy, bent (51b, 54b), b9v_aranict, b9v_brys (168b), b7_malregular (126b), the readers marrow, tallow, b4v_oldninth
   (78b), perrit, b5_c1_tilewoman (81b); the helpers B3VB (68b), B4VB (78b), B5VB (88b), B6VB (108b), B7VB (128b). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Cuttle: a thick-set sapper past his youth, in a stained leather jerkin over a grey shirt, a sapper's satchel at his hip, a battered
     helm pushed back, a heavy face and a short dark beard; o.sit: sitting by a fire, a bowl in his hands */
  b10v_cuttle(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.06, .98);
    h.legs('#2e2a24'); h.torso('#6a5034', '#2a1e12', 7); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-6.4, -1, 12.8, 1); // the jerkin
    poly(ctx, [[3.6,1],[8.4,1],[8.8,7],[3.2,7]], '#4a3a26'); B2F.line(ctx, '#3a2a18', .8, [[-5.4, -6], [6, 2]]); // the satchel and its strap
    h.head('#b08a6a', 4.5, -11.2); h.look('rgba(20,14,10,.9)', -11.2); ell(ctx, .6, -8.6, 3.4, 1.8, '#2a2018'); // the beard
    ctx.beginPath(); ctx.arc(-.6, -13.4, 4.8, Math.PI*1.02, Math.PI*1.98); ctx.fillStyle = '#5a5a5e'; ctx.fill(); ctx.fillStyle = '#3a3a3e'; ctx.fillRect(-5.4, -13.8, 9.6, 1); // the helm, pushed back
    if (o.sit) { ell(ctx, 1, 2.6, 3.2, 1.4, '#3a3026'); ell(ctx, 1, 2.2, 2.4, .7, '#1a1410'); } // the bowl
    ctx.restore(); },
  /* Shortnose: a very big heavy, broad as a door, a nose that was broken flat long ago, a sweat-dark shirt, a trace-strap across his
     chest from shoulder to hip, leaning forward into it */
  b10v_shortnose(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.28, 1.2); ctx.translate(0, 1); ctx.rotate(o.still ? .12 : .12 + Math.sin(t/700)*.02); // leaning in
    h.legs('#2a2622'); h.torso('#5a5244', '#1e1a14', 7.6); ctx.fillStyle = 'rgba(20,14,8,.3)'; ctx.fillRect(-5, -4, 10, 6);
    B2F.line(ctx, '#6a4a2a', 1.8, [[-7, -5.6], [7, 6]]); B2F.line(ctx, '#3a2614', .5, [[-7, -4.6], [7, 7]]); // the trace-strap
    h.head('#b48e6c', 4.8, -11.2); h.look('rgba(20,14,10,.9)', -11.2); ctx.fillStyle = 'rgba(80,50,30,.55)'; ctx.fillRect(3, -10.6, 2.2, 1.6); // the flattened nose
    B2F.cap(ctx, '#2a2018', 4.9, -12.4, 1.05, 1.95);
    ctx.restore(); },
  /* Bottle: a slight young marine, untidy brown hair, a plain shirt and a squad mage's frayed sash, sitting with his knees drawn up;
     something small and alive by his boot */
  b10v_bottle(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, .96);
    h.legs('#3a3428'); h.torso('#6a6656', '#2a2820', 5.6); B2F.line(ctx, '#7a4a3a', 1, [[-5, -5.6], [4.6, 5]]); // the sash
    h.head('#c09a7c', 4, -11.2); h.look('rgba(20,14,10,.85)', -11.4); ctx.fillStyle = '#5a3e26'; ctx.beginPath(); ctx.arc(0, -12.4, 4.3, Math.PI*.95, Math.PI*2.05); ctx.fill(); ctx.fillRect(-4.4, -12.6, 1.4, 3); // untidy hair
    const k = REDUCE() ? 0 : Math.sin(t/600)*.6; ell(ctx, 7 + k, 12, 1.8, .9, '#4a4036'); ell(ctx, 8.6 + k, 11.6, .7, .6, '#4a4036'); // a lizard by his boot
    ctx.restore(); },
  /* Spax: a big Barghast warchief no longer young, his face painted white and black, a coat of tortoise-shell plates, a heavy axe, one
     hand pressed to his side */
  b10v_spax(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.16, 1.08);
    h.legs('#3a2e22'); h.torso('#6a6a4a', '#2a2a1a', 7.2); for (let i=0;i<3;i++) for (let j=0;j<3;j++) ell(ctx, -4 + j*4, -3 + i*3.6, 1.8, 1.4, 'rgba(160,150,100,.55)'); // the shell plates
    h.head('#9a7454', 4.6, -11.2); ctx.fillStyle = 'rgba(236,232,220,.8)'; ctx.fillRect(-3, -13, 6.6, 2.2); ctx.fillStyle = 'rgba(20,16,12,.85)'; ctx.fillRect(-2.6, -10.6, 6, 1.2); h.look('rgba(20,14,10,.9)', -11.6); // the paint
    ctx.fillStyle = '#2a2018'; ctx.fillRect(-4.8, -15.6, 1.4, 6); ctx.fillRect(3.4, -15.6, 1.4, 6); // braids
    B2F.line(ctx, '#5a4026', 1.4, [[7, 4], [10, -10]]); poly(ctx, [[8.6,-12],[13,-9],[11.6,-6],[9.6,-8]], '#9aa0a8'); // the axe
    ell(ctx, -5.6, 2, 1.6, 2, '#9a7454'); // a hand pressed to the stitch in his side
    ctx.restore(); },
});

/* ---------------- backdrop helpers ---------------- */
const B10VB = {
  /* the glass by night: blue-black sky with stars, and the same stars thrown back by the ground */
  glass(ctx, W, H, T, y = .6, seed = 1101){ B4VB.sky(ctx, W, H*y, [[0, '#070a10'], [1, '#2a3a52']]); ctx.fillStyle = vgrad(ctx, H*y, H, [[0, '#1a2434'], [1, '#05070c']]); ctx.fillRect(0, H*y, W, H*(1 - y));
    B3VB.stars(ctx, W, H, T, 70, y*.95, .7, seed); for (let i=0;i<40;i++){ ctx.globalAlpha = .25 + .35*Math.abs(Math.sin(T/1300 + i)); ctx.fillStyle = '#c8d8ff'; ctx.fillRect(hash(i, seed + 7)*W, H*y + 2 + hash(i, seed + 8)*H*(1 - y), 1.1, 1.1); } ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(200,220,255,.12)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, H*y); ctx.lineTo(W, H*y); ctx.stroke(); },
  /* a small sitting figure in silhouette, for the ring round a fire */
  sitter(ctx, x, y, s, col){ ell(ctx, x, y - 3*s, 2.6*s, 3.2*s, col); ell(ctx, x, y - 7.4*s, 1.5*s, 1.6*s, col); ell(ctx, x, y, 3.6*s, 1.2*s, col); },
  /* a tall Che'Malle shape far off, standing in a row, still */
  lizard(ctx, x, y, s, col){ poly(ctx, [[x - 1.6*s, y],[x - 2*s, y - 9*s],[x - .4*s, y - 14*s],[x + 2.4*s, y - 15*s],[x + 3.2*s, y - 13.6*s],[x + 1.2*s, y - 12.4*s],[x + 1.6*s, y - 6*s],[x + 5*s, y - 2*s],[x + 1.4*s, y]], col); },
  /* a book lying open, its pages lifting */
  book(ctx, x, y, s, T, k){ const lift = REDUCE() ? .4 : .3 + Math.sin(T/900)*.1; glow(ctx, x, y - 4*s, 50*s, '#d8c8a0', .12 + .1*k);
    poly(ctx, [[x - 22*s, y],[x, y + 3*s],[x + 22*s, y],[x + 22*s, y - 2*s],[x, y + 1*s],[x - 22*s, y - 2*s]], '#2a2016');
    poly(ctx, [[x - 21*s, y - 2*s],[x - 1*s, y + .6*s],[x - 1*s, y - 12*s*k],[x - 20*s, y - 13*s*k]], '#e2d8c0'); poly(ctx, [[x + 21*s, y - 2*s],[x + 1*s, y + .6*s],[x + 1*s, y - 12*s*k],[x + 20*s, y - 13*s*k]], '#d8ccb0');
    if (k > .5) poly(ctx, [[x + 1*s, y - 12*s*k],[x + 12*s, y - 18*s*lift - 10*s],[x + 20*s, y - 13*s*k]], 'rgba(236,228,206,.8)'); },
};

Object.assign(VISBG, {
  /* the camp after the short-tails at night: tents dark against a blue-black sky, a small smoky fire, a ring of sitters with one gap on the
     left, the dark between the tents where people walk (figures pass far off; none comes near) */
  b10v_cuttle(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.6, [[0, '#070a10'], [1, '#22283a']]); ctx.fillStyle = '#16120e'; ctx.fillRect(0, H*.6, W, H*.4); B3VB.stars(ctx, W, H, T, 30, .4, .5, 1201);
    for (let i=0;i<7;i++) B3VB.tent(ctx, W*(.04 + i*.15), H*.62, 1.6 + hash(i, 1202)*.6, '#0e0c0e');
    for (let i=0;i<5;i++) glow(ctx, W*(.08 + i*.22), H*.6, 8, '#e08a40', .25);
    const fx = W*.58, fy = H*.82; B4VB.fire(ctx, fx, fy, T, .9); B7VB.smoke(ctx, W, H*.35, T, .18, 1203, 4);
    [[-.17, .02], [-.08, -.05], [.1, -.05], [.18, .02]].forEach(([dx, dy], i) => B10VB.sitter(ctx, fx + dx*W, fy + dy*H, 2.2, '#0a0806')); // the ring, a gap on the left
    if (s >= 3) for (let i=0;i<3;i++){ const x = ((hash(i, 1204)*W + (REDUCE() ? 0 : T*.012*(1 + i*.3))) % (W*1.1)) - W*.05; B3VB.walker(ctx, x, H*.66, 1.4, 'rgba(8,8,10,.8)', T, i); } // far off, between the tents
    return {fx:W*.3, fy:H*.9, fs:2.4}; },

  /* the southern march by day: a dry road going away, the Letherii tail with wagons and tired horses, two dust walls far ahead (grey and
     brown) leaning away; the Commander rides up in steps 2 and 3 */
  b10v_march(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.5, [[0, '#a8a8a0'], [1, '#d8c8a8']]); ctx.fillStyle = vgrad(ctx, H*.5, H, [[0, '#a08a64'], [1, '#6a5638']]); ctx.fillRect(0, H*.5, W, H*.5);
    const lean = s >= 3 ? 1.15 : 1; B3VB.dust(ctx, W*.82*lean, H*.5, 120, 60, T, .3, 1301); glow(ctx, W*.66*lean, H*.48, 50, '#a8a090', .3); B3VB.dust(ctx, W*.6, H*.52, 90, 40, T, .25, 1302);
    ctx.strokeStyle = 'rgba(80,64,40,.5)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-10, H*.98); ctx.quadraticCurveTo(W*.4, H*.6, W*.62, H*.52); ctx.stroke(); // the road
    for (let i=0;i<10;i++){ const k = i/9, x = W*(.08 + k*.5), y = H*(.92 - k*.36); if (i % 3 === 1) B3VB.wagon(ctx, x, y, .9 - k*.6, '#3a2a1a', '#8a7a5a', '#2a1e12'); else B3VB.walker(ctx, x, y, 1.6 - k*1, 'rgba(40,30,20,.85)', T, i, 1); }
    B4VB.horse(ctx, W*.14, H*.94, .7, '#5a4a36', T, 0, 1);
    if (s === 2 || s === 3) drawFigure(ctx, 'b9v_brys', W*.5, H*.9, 2.2, T, {still:true, dir:-1});
    return {fx:W*.3, fy:H*.92, fs:2.4}; },

  /* the glass by night: the column ahead, a supply wagon behind, two figures leaning in the traces (Shortnose and a woman beside him),
     the wheels' track on the glass */
  b10v_traces(ctx, W, H, T, v){ B10VB.glass(ctx, W, H, T, .56, 1401);
    for (let i=0;i<14;i++) B3VB.walker(ctx, W*(.62 + i*.028), H*(.6 + (i % 3)*.008), .9, 'rgba(10,12,18,.85)', T, i, 1); // the column ahead
    B3VB.wagon(ctx, W*.14, H*.9, 1.8, '#2a2016', '#4a4436', '#14100c'); B2F.line(ctx, '#3a2a18', 1.2, [[W*.2, H*.86], [W*.32, H*.84]]);
    ctx.strokeStyle = 'rgba(200,220,255,.1)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, H*.97); ctx.lineTo(W*.12, H*.95); ctx.stroke();
    drawFigure(ctx, 'b7_malregular', W*.42, H*.9, 2.2, T, {phase:1, dir:1}); // the woman beside him
    return {fx:W*.34, fy:H*.92, fs:2.6}; },

  /* Gesler's camp on the southern road at night: dry ground, hard stars, long rows of tall still lizard shapes far off, Stormy a heap in
     his blankets, Bent pressed against Gesler */
  b10v_night(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.62, [[0, s >= 3 ? '#1a1e2a' : '#05060a'], [1, s >= 3 ? '#4a4a56' : '#1a1c26']]); ctx.fillStyle = '#14110c'; ctx.fillRect(0, H*.62, W, H*.38); B3VB.stars(ctx, W, H, T, 80, .58, .6, 1501);
    for (let r=0;r<2;r++) for (let i=0;i<9;i++) B10VB.lizard(ctx, W*(.5 + i*.055 + r*.02), H*(.62 + r*.05), 1.1 + r*.2, `rgba(${10 + r*6},${12 + r*6},${16 + r*6},.95)`);
    ell(ctx, W*.74, H*.9, 26, 8, '#2a2620'); ell(ctx, W*.72, H*.88, 20, 6, '#3a342a'); ell(ctx, W*.8, H*.86, 4, 3.4, '#b08a5a'); ell(ctx, W*.8, H*.85, 4.2, 2, '#a05a2a'); // Stormy, a heap under blankets, his red hair showing
    drawFigure(ctx, 'bent', W*.42, H*.92, 1.8, T, {still:s >= 3, dir:-1});
    return {fx:W*.3, fy:H*.92, fs:2.4}; },

  /* the edge of a halt on the glass at night: the column in dark heaps behind, the glass with its thrown stars, Nom Kala sitting beside
     Bottle (an Imass shape of hide and dust, lit faintly from the left) */
  b10v_dust(ctx, W, H, T, v){ const s = v.step || 0; B10VB.glass(ctx, W, H, T, .58, 1601);
    for (let i=0;i<10;i++) ell(ctx, W*(.5 + i*.05), H*(.62 + hash(i, 1602)*.03), 8, 3, 'rgba(6,8,12,.9)'); // the column lying in heaps
    if (s >= 0) { glow(ctx, W*.46, H*.8, 30, '#8a7a60', .12); B3VB.imass(ctx, W*.46, H*.92, 4.2, '#6a5e46'); ell(ctx, W*.46, H*.92, 14, 3, 'rgba(0,0,0,.4)'); for (let i=0;i<8;i++){ const y = H*.9 - ((T*.01 + i*9) % 26); ctx.fillStyle = `rgba(160,140,110,${.3 - i*.03})`; ctx.fillRect(W*.46 + (hash(i, 1603) - .5)*20, y - 14, 1.2, 1.2); } } // dust lifting off her
    return {fx:W*.3, fy:H*.92, fs:2.4}; },

  /* the field before the city by day: a pale sky, the city low and brown with a far white tower; painted warriors running in toward a
     line of thin grey figures; from step 3 the grey figures turned and walking away toward the tower */
  b10v_field(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.55, [[0, '#c8ccd0'], [1, '#e2dac8']]); B5VB.skyline(ctx, W, H*.55, '#8a7a62', 1701, 0, T);
    ctx.fillStyle = '#e8e4dc'; ctx.fillRect(W*.7, H*.12, 6, H*.43); poly(ctx, [[W*.7 - 2, H*.12],[W*.7 + 3, H*.04],[W*.7 + 8, H*.12]], '#e8e4dc'); glow(ctx, W*.7 + 3, H*.2, 26, '#ffffff', .15); // the Spire
    ctx.fillStyle = vgrad(ctx, H*.55, H, [[0, '#9a9070'], [1, '#6a6046']]); ctx.fillRect(0, H*.55, W, H*.45); B7VB.grass(ctx, W, H*.6, H, 90, 'rgba(90,84,56,.5)', 0, T, 1702);
    const away = s >= 3; for (let i=0;i<26;i++){ const x = W*(.36 + (i % 13)*.045), y = H*(.66 + Math.floor(i/13)*.05) - (away && !REDUCE() ? ((T*.004 + i) % 10) : 0); B3VB.walker(ctx, x, y, 1.2, 'rgba(110,108,104,.9)', T, i, away ? 1 : -1); }
    if (s >= 1) for (let i=0;i<8;i++){ const x = W*(.1 + i*.03) + (REDUCE() ? 0 : (T*.02 % 20)); B3VB.walker(ctx, x, H*(.82 + (i % 2)*.03), 1.8, i < 2 ? '#3a2a20' : 'rgba(60,50,36,.95)', T, i, 1); } // the Gilk running in
    if (s >= 1) B3VB.walker(ctx, W*.3, H*.74, 3, '#4a3a2a', T, 0, 1); // a Teblor ahead
    return {fx:W*.2, fy:H*.94, fs:2.5}; },

  /* the Crippled God's place: a dark without walls, a banked light from below, the laughter a far thin shimmer from steps 2 on, the
     book: closed shape (1-2), open (3), opened and lit (4); no figure */
  b10v_god(ctx, W, H, T, v){ const s = v.step || 0;
    ctx.fillStyle = '#040306'; ctx.fillRect(0, 0, W, H); const pulse = REDUCE() ? 1 : .85 + Math.sin(T/1400)*.15;
    glow(ctx, W*.5, H*1.05, W*.6, '#8a2a1a', .28*pulse); glow(ctx, W*.5, H*1.1, W*.3, '#d0602a', .18*pulse);
    for (let i=0;i<14;i++){ const x = hash(i, 1801)*W, y = H*(.2 + hash(i, 1802)*.6); ctx.globalAlpha = .1 + .1*Math.abs(Math.sin(T/900 + i)); ctx.fillStyle = '#c87a5a'; ctx.fillRect(x, y, 1, 6 + hash(i, 1803)*10); } ctx.globalAlpha = 1; // the pain, as cracks of light
    if (s >= 2) for (let i=0;i<6;i++){ const k = REDUCE() ? .5 : ((T/1800 + i/6) % 1); ctx.strokeStyle = `rgba(236,222,190,${.18*(1 - k)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(W*.12, H*.3, 10 + k*W*.5, -.3, .5); ctx.stroke(); } // laughter, far off, rippling in
    B10VB.book(ctx, W*.56, H*.76, 3, T, s >= 4 ? 1 : s >= 3 ? .6 : .08);
    return {fx:W*.3, fy:H*.9, fs:2.4}; },

  /* the reader, back at the chapter's reading place (B10READ[n]): 1 an upturned water barrel at the burial lines at night; 2 a water
     wagon's tailboard on the rise by day, the glass's edge below; 3 the glass at grey light (the hard road's edge on 'south'); 4 a
     horse-blanket by the horse-lines at dusk; 5 the glass at first light; 6 a crate on a grey beach at dawn, ships at anchor (the camp's
     edge on 'adjunct'); 7 a shield on the dirt of the first fields at dusk. A card for the Third; a tile for the Letherii */
  b10deck(ctx, W, H, T, v){ const ch = (VISIONS[v.id] && VISIONS[v.id].ch) || 1, tiles = ch % 2 === 0, glass = b10vGlass();
    if ((ch === 3 || ch === 5) && glass) { B10VB.glass(ctx, W, H, T, .62, 1900 + ch); B4VB.sky(ctx, W, H*.2, [[0, ch === 5 ? 'rgba(200,170,170,.0)' : 'rgba(0,0,0,0)'], [1, ch === 5 ? 'rgba(220,180,170,.35)' : 'rgba(120,140,170,.3)']]);
      for (let i=0;i<6;i++){ const x = W*(.1 + i*.15); B2F.line(ctx, '#3a2e22', 1, [[x, H*.62], [x, H*.5]]); poly(ctx, [[x - 10, H*.5],[x + 10, H*.5],[x + 6, H*.54],[x - 6, H*.54]], '#2a2a30'); } } // the cloaks on spear-shafts
    else {
      const SK = {1:['#04050a', '#1a2030'], 2:['#b0a890', '#e0d0b0'], 3:['#2a2a34', '#8a7a6a'], 4:['#1a1620', '#7a4a34'], 5:['#3a3a44', '#b09a80'], 6:['#4a4e56', '#a8a29a'], 7:['#0a0a12', '#5a3a2a']}[ch];
      B4VB.sky(ctx, W, H*.64, [[0, SK[0]], [1, SK[1]]]);
      const gnd = {1:'#1e1a16', 2:'#8a7656', 3:'#5a4a34', 4:'#3a3024', 5:'#5a4a34', 6:'#6a665c', 7:'#2a2218'}[ch]; ctx.fillStyle = gnd; ctx.fillRect(0, H*.64, W, H*.36);
      if (ch === 1) { B3VB.stars(ctx, W, H, T, 24, .4, .4, 1911); for (let i=0;i<5;i++) ell(ctx, W*(.1 + i*.18), H*.7, 26, 4, '#2a241c'); for (let i=0;i<8;i++) glow(ctx, W*(.05 + i*.13), H*.62, 5, '#e09040', .35); ell(ctx, W*.5, H*.86, 16, 9, '#4a3a26'); } // the trenches, the allies' fires, the barrel
      else if (ch === 2) { ctx.fillStyle = 'rgba(220,226,236,.6)'; ctx.fillRect(0, H*.62, W, H*.04); for (let i=0;i<2;i++) B3VB.wagon(ctx, W*(.7 + i*.16), H*.66, 1, '#3a2a1a', '#8a7a5a', '#2a1e12'); ctx.fillStyle = '#5a4a36'; ctx.fillRect(W*.3, H*.82, W*.4, 6); } // the glass's edge below, the water wagons, the tailboard
      else if (ch === 3 || ch === 5) { for (let i=0;i<3;i++) B3VB.wagon(ctx, W*(.2 + i*.26), H*.66, .9, '#3a2a1a', '#7a6a4a', '#2a1e12'); } // the southern road's wagons
      else if (ch === 4) { for (let i=0;i<6;i++) B4VB.horse(ctx, W*(.1 + i*.15), H*.7, .5, '#4a3a2a', T, i, 1); B4VB.fire(ctx, W*.8, H*.8, T, .6); ell(ctx, W*.5, H*.88, W*.14, 8, '#6a4a2a'); } // the horse-lines, the fire, the blanket
      else if (ch === 6) { if (glass) { for (let i=0;i<14;i++) B3VB.walker(ctx, W*(.2 + i*.05), H*.66, 1, 'rgba(40,40,44,.85)', T, i); } else { B4VB.sea(ctx, W, H, H*.6, '#5a6470', '#3a4450', T, 1912); for (let i=0;i<3;i++) B5VB.ship(ctx, W*(.2 + i*.28), H*.6, .5, T); ctx.fillStyle = '#8a8070'; ctx.fillRect(0, H*.76, W, H*.24); }
        ctx.fillStyle = '#5a4a32'; ctx.fillRect(W*.4, H*.82, W*.2, H*.1); } // the line forming, or the sea and the King's ships; the crate
      else if (ch === 7) { for (let i=0;i<9;i++) B4VB.fire(ctx, W*(.06 + i*.11), H*.66, T, .3); ctx.fillStyle = '#100c10'; ctx.beginPath(); ctx.moveTo(0, H*.56); ctx.quadraticCurveTo(W*.5, H*.48, W, H*.58); ctx.lineTo(W, H*.62); ctx.lineTo(0, H*.62); ctx.fill(); // the regulars' fires, the ridge
        ell(ctx, W*.5, H*.88, W*.1, 8, '#5a4a30'); ctx.strokeStyle = '#8a7a50'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(W*.5, H*.88, W*.1, 8, 0, 0, 7); ctx.stroke(); } } // the shield
    if (tiles) B5VB.tile(ctx, W*.5, H*.88, 22, visReader().id !== 'perrit'); else B6VB.card(ctx, W*.5, H*.88);
    return {fx:W*.3, fy:H*.86, fs:2.4}; },
});

/* Cuttle sits with his bowl through the whole of b10v1 */
{ const _df = drawFigure; drawFigure = function(ctx, kind, x, y, s, t, o = {}){
    if (kind === 'b10v_cuttle' && VIS && VIS.id === 'b10v1' && o.sit == null) o = Object.assign({}, o, {sit:true});
    return _df(ctx, kind, x, y, s, t, o); }; }
