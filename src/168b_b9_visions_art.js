/* ============ Book Nine: the visions' art (168) — backdrops VISBG b9v_* and b9deck, the figures FIGX b9v_* ============
   Drawn the way Books Three to Eight draw their visions (68b, 78b, 88b, 108b, 128b, 148b): a few strokes per place, figures in the ~32px
   frame lit from the left, and 36b's drawVision laying the vision's own figure, the motes, the violet and the vignette over each backdrop.
   Book Nine's look: Letheras by night (88b's blue-grey and lamp-gold) for the reading room and the camp outside the walls; the road east
   in dust-ochre; the Wastes pale and wide under a white sky by day and a hard black one by night; the field from very high up, a pale
   cloth with marks on it.
   Headline only: what stirs in the city is felt, not drawn (the dogs, a far roof going in as a puff of dust over the roofline); the sick
   are blanket shapes in the carts; the field is a white heap, a dark ring, a fan of small dark marks and a scuffed trail, seen from so
   high that nothing on it has a face. No card face is drawn: the cards on the table are backs, and the one under Fiddler's hand is
   never turned.
   Reused: b7v_fiddler (128b), keneb (54b), b7_malregular (126b), b2soldier (47b), b5_letherii (80d), b9_c3_healer (163b), the readers marrow, tallow,
   b4v_oldninth (78b), perrit, b5_c1_tilewoman (81b); the helpers B3VB (68b), B4VB (78b), B5VB (88b), B6VB (108b), B7VB (128b). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Brys Beddict: a tall, lean Letherii in his shirtsleeves and a plain dark coat, dark hair cut short, clean-shaven, a long sword at
     his hip; nothing of rank on him but the cut of the coat */
  b9v_brys(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.12); const sw = o.still ? 0 : Math.sin(t/800 + (o.phase || 0))*.3;
    h.legs('#22242a'); poly(ctx, [[-6,-6.2],[5.6,-6.2],[6.4,9.6 + sw],[-6.8 - sw,9.8]], h.armor('#2a3040', '#0e1016')); // the coat
    poly(ctx, [[-2.4,-6.2],[2.4,-6.2],[1.6,4],[-1.6,4]], '#c8c2b4'); ctx.fillStyle = '#16120e'; ctx.fillRect(-6, 3.2, 12, 1.1); // the shirt, the belt
    B2F.line(ctx, '#9aa0aa', 1.1, [[-5.4, 3.4], [-9, 12.6]]); B2F.line(ctx, '#3a2a1a', 1.6, [[-5, 2.4], [-5.8, 4.4]]); // the sword, hilt up
    h.head('#c09e82', 4, -11.4); h.look('rgba(20,16,12,.9)', -11.6); B2F.cap(ctx, '#1a1410', 4.2, -12.6, 1, 2); ctx.fillStyle = '#1a1410'; ctx.fillRect(-4.2, -12.6, 1.1, 2.4); // short dark hair
    ctx.restore(); },
  /* Koryk: a big half-Seti marine, shaven-headed, in a sweat-dark shirt, finger bones knotted on cords at his belt; o.sick: lying back,
     shaking, a blanket to the chest */
  b9v_koryk(ctx, h, t, o){ ctx.save(); const sick = !!o.sick, sh = sick && !REDUCE() ? Math.sin(t/38)*.35 : 0;
    if (sick) { ctx.translate(0, 9); ctx.rotate(-Math.PI/2 + .12); ctx.translate(-1 + sh, -2); }
    B2F.grow(ctx, 1.1, 1.08);
    h.legs('#3a3228'); h.torso('#6a5a44', '#2a2216', 6.8); ctx.fillStyle = 'rgba(20,14,8,.3)'; ctx.fillRect(-4, -4, 8, 6); // the shirt, sweat-dark
    ctx.fillStyle = '#1e160e'; ctx.fillRect(-6.6, 3.2, 13.2, 1.2); for (let i=0;i<5;i++){ B2F.line(ctx, '#3a2a1a', .4, [[-5 + i*2.4, 4.4], [-5.2 + i*2.4, 7.6]]); ell(ctx, -5.2 + i*2.4, 8, .5, .9, '#e2d8c0'); } // the bones on cords
    h.head('#9a7454', 4.4, -11.2); h.look('rgba(24,14,8,.9)', -11.4); ctx.fillStyle = 'rgba(40,28,20,.35)'; ctx.beginPath(); ctx.arc(0, -12.6, 4.4, Math.PI*1.05, Math.PI*1.95); ctx.fill(); // shaven, a shadow of stubble
    if (sick) poly(ctx, [[-7.4,-3],[7.4,-3],[7.8,12],[-7.8,12]], h.armor('#5a5244', '#24201a')); // the blanket
    ctx.restore(); },
  /* Aranict: a Letherii woman past her first youth, slight, brown hair pinned up untidily, a long grey-blue robe of the cadre under a
     travelling coat; a stick of rustleaf at her lips with its thread of smoke */
  b9v_aranict(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .9, 1);
    h.legs('#2a2a30'); B2F.robe(ctx, h, '#5a6478', '#20242e', 5.6, 7.6); poly(ctx, [[-5.8,-6],[-2,-6],[-3,10.4],[-7,10.4]], '#3a3a3e'); poly(ctx, [[2,-6],[5.8,-6],[7,10.4],[3,10.4]], '#3a3a3e'); // the coat over the robe
    h.head('#c4a28a', 3.9, -11.2); h.look('rgba(22,14,10,.85)', -11.4); B2F.cap(ctx, '#5a3a24', 4.1, -12.4); ell(ctx, -1, -16.6, 2.6, 1.8, '#5a3a24'); // hair pinned up
    B2F.line(ctx, '#e8e0cc', .7, [[2.6, -9.2], [6.2, -9.6]]); glow(ctx, 6.4, -9.6, 3, '#ff9a40', .6); // the rustleaf stick, lit
    const k = REDUCE() ? 0 : (t/1400) % 1; ctx.strokeStyle = `rgba(200,200,210,${.4*(1 - k)})`; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(6.4, -10.4); ctx.quadraticCurveTo(8 + Math.sin(t/700)*1.5, -15 - k*4, 6.6, -20 - k*6); ctx.stroke(); // its smoke
    ctx.restore(); },
  /* Henar Vygulf: a very tall, rangy young Letherii soldier in a padded jerkin and a brigade's grey-green cloak, fair hair cropped,
     bending a little at the neck as if under a roof */
  b9v_henar(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.3); ctx.translate(0, 1); ctx.rotate(o.still ? .06 : .06 + Math.sin(t/900)*.01);
    poly(ctx, [[-6,-6.4],[5.4,-6.4],[6.4,11.2],[-7.4,11.6]], h.armor('#4a5444', '#1a2018')); // the cloak
    h.legs('#2a2a24'); h.torso('#7a6a4c', '#2e2618', 5.4); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let i=0;i<4;i++) ctx.fillRect(-4.6, -4 + i*2.6, 9.2, .5); // padding
    ctx.fillStyle = '#1e160e'; ctx.fillRect(-5.4, 3.2, 10.8, 1.1);
    h.head('#d0aa8a', 3.9, -11.4); h.look('rgba(30,20,14,.85)', -11.6); B2F.cap(ctx, '#c8a464', 4.1, -12.6, 1, 2); // fair hair, cropped
    ctx.restore(); },
  /* Gu'Rull: a long, lean hunter of the high air, seen from below: a narrow reptilian body and long neck, a tail like a rudder, two great
     thin-membraned wings, dark above and grey-pale beneath; wings beating slowly or held in a glide */
  b9v_gurull(ctx, h, t, o){ ctx.save(); const fl = REDUCE() || o.still ? .2 : Math.sin(t/520 + (o.phase || 0))*.55;
    ctx.translate(0, -4);
    const wing = sd => { poly(ctx, [[sd*1.5,-2],[sd*9,-7 - fl*7],[sd*17,-5 - fl*10],[sd*15,-1 - fl*6],[sd*11,1 - fl*3],[sd*6,1.4],[sd*1.5,2]], '#2a2c30');
      B2F.line(ctx, 'rgba(150,152,160,.6)', .5, [[sd*1.5, -1], [sd*16, -4.8 - fl*10]]); B2F.line(ctx, 'rgba(150,152,160,.4)', .4, [[sd*3, 0], [sd*12, .4 - fl*3]]); };
    wing(-1); wing(1);
    ctx.fillStyle = '#3a3c40'; ell(ctx, 0, 0, 2.4, 6, '#3a3c40'); poly(ctx, [[-1,-5],[1,-5],[.6,-11],[-.6,-11]], '#3a3c40'); ell(ctx, 0, -12.2, 1.4, 2, '#4a4c50'); // body, neck, head
    poly(ctx, [[-1.2,5],[1.2,5],[.4,15],[-.4,15]], '#2e3034'); poly(ctx, [[-.4,14],[.4,14],[2.4,17],[-2.4,17]], '#2e3034'); // the tail
    ctx.fillStyle = 'rgba(220,200,120,.8)'; ctx.fillRect(-.9, -12.8, .6, .5); ctx.fillRect(.3, -12.8, .6, .5); // the eyes
    ctx.restore(); },
});

/* ---------------- backdrop helpers ---------------- */
const B9VB = {
  /* the inside of a field tent: canvas walls sloping to a ridge-pole, a pole in the middle, a camp table with a lamp */
  tent(ctx, W, H, T, lamp = 1){ ctx.fillStyle = '#1a1612'; ctx.fillRect(0, 0, W, H);
    poly(ctx, [[0, H*.8],[0, H*.36],[W*.5, 0],[W, H*.36],[W, H*.8]], '#3a3226'); poly(ctx, [[W*.5, 0],[W, H*.36],[W, H*.8],[W*.5, H*.8]], '#2e281e');
    ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; for (let i=1;i<6;i++){ ctx.beginPath(); ctx.moveTo(W*.5, 0); ctx.lineTo(W*(i/6), H*.8); ctx.stroke(); } // the seams
    ctx.fillStyle = '#4a3a24'; ctx.fillRect(W*.5 - 2, 0, 4, H*.8); ctx.fillStyle = '#2a2016'; ctx.fillRect(0, H*.8, W, H*.2); // the pole, the ground-cloth
    ctx.fillStyle = '#4a3a26'; ctx.fillRect(W*.58, H*.72, W*.26, 4); ctx.fillRect(W*.6, H*.74, 3, H*.14); ctx.fillRect(W*.81, H*.74, 3, H*.14); // the camp table
    if (lamp) { B4VB.lamp(ctx, W*.71, H*.69, T, 80*lamp, .32); glow(ctx, W*.71, H*.6, W*.4, '#e8a050', .12*lamp); } },
  /* a far city roofline puff: a roof going in, a column of dust and a little fire under it */
  rooffall(ctx, x, y, T, k){ if (k <= 0) return; for (let i=0;i<6;i++){ const yy = y - i*7*k - (REDUCE() ? 0 : Math.sin(T/600 + i)*1.5); ell(ctx, x + (hash(i, 901) - .5)*10, yy, 6 + i*2.4*k, 4 + i*1.6*k, `rgba(150,140,130,${.32*(1 - i/7)})`); } glow(ctx, x, y + 2, 16, '#ff8a40', .25*k); },
  /* the field from very high: a ring pressed into the ground */
  crater(ctx, x, y, r){ ell(ctx, x, y, r, r*.62, '#2a2622'); ell(ctx, x, y, r*.8, r*.48, '#4a4238'); ctx.strokeStyle = 'rgba(10,8,6,.6)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.ellipse(x, y, r, r*.62, 0, 0, 7); ctx.stroke(); },
};

Object.assign(VISBG, {
  /* a low room at night: one lamp on the table, the cards in a cross (backs only), dark faces round it, the shutters on the city with the
     dogs; step 2 the first card down in front of a place; step 3 the cards spreading and the lamp leaning; step 4 a far roof going in
     through the shutter's gap, and the lamp leaning hard */
  b9v_reading(ctx, W, H, T, v){ const s = v.step || 0, lean = s >= 4 ? .18 : s >= 3 ? .06 : 0;
    ctx.fillStyle = '#0c0a0c'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#08070a'; for (let i=0;i<4;i++) ctx.fillRect(0, H*(.04 + i*.07), W, 4); // the beams
    ctx.fillStyle = '#05060c'; ctx.fillRect(W*.04, H*.12, W*.2, H*.34); B3VB.stars(ctx, W*.2, H*.4, T, 10, .5, .4, 911); ctx.save(); ctx.translate(W*.04, H*.12); B6VB.roofs(ctx, W*.2, H*.32, '#0e0e18', 912, 3, T); ctx.restore(); // the window on the city
    if (s >= 4) b9vRoof(ctx, W, H, T); ctx.fillStyle = '#1a1410'; for (let i=0;i<4;i++) ctx.fillRect(W*(.04 + i*.066), H*.12, 3, H*.34); // the shutters, open a crack
    ctx.fillStyle = '#2a1e14'; ctx.fillRect(W*.3, H*.72, W*.5, 6); ctx.fillStyle = '#1a120c'; ctx.fillRect(W*.34, H*.74, 4, H*.2); ctx.fillRect(W*.74, H*.74, 4, H*.2); // the table
    ctx.save(); ctx.translate(W*.55, H*.7); ctx.rotate(lean); B4VB.lamp(ctx, 0, -4, T, 90, .34); ctx.fillStyle = '#3a2a18'; ctx.fillRect(-3, -2, 6, 3); ctx.restore(); glow(ctx, W*.55, H*.66, W*.45, '#e8a050', .1); // the lamp, leaning
    const n = s <= 1 ? 1 : s === 2 ? 3 : 7; [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1], [-2, 0], [2, 0]].slice(0, n).forEach(([dx, dy], i) => B6VB.card(ctx, W*(.55 + dx*.05), H*(.735 + dy*.02), -.1 + hash(i, 913)*.2)); // the cards, backs up
    for (let i=0;i<5;i++){ const x = W*(.34 + i*.11), y = H*.66; if (i === 2) continue; ell(ctx, x, y - 14, 4.6, 5.4, 'rgba(10,8,8,.95)'); poly(ctx, [[x - 8, y + 8],[x - 6, y - 8],[x + 6, y - 8],[x + 8, y + 8]], 'rgba(10,8,8,.95)'); glow(ctx, x, y - 14, 8, '#e8a050', .08); } // the faces round it, in shadow
    for (let i=0;i<4;i++) B7VB.mark(ctx, W*(.86 + i*.035), H*.62, 2.2, 'rgba(8,6,8,.9)'); // the others, along the wall
    return {fx:W*.2, fy:H*.94, fs:2.4}; },

  /* the Commander's tent the night before the march: canvas walls, the camp table and the lamp, maps and lists; the sword against the pole.
     Steps 0-2 the lamp up; step 3 the flap open on the camp's fires; step 4 the lamp down to an ember */
  b9v_tent(ctx, W, H, T, v){ const s = v.step || 0; B9VB.tent(ctx, W, H, T, s >= 4 ? .3 : 1);
    ctx.fillStyle = '#c8bca0'; ctx.fillRect(W*.62, H*.705, W*.08, 3); ctx.fillStyle = '#b0a488'; ctx.fillRect(W*.72, H*.71, W*.06, 2.4); // the lists, a map
    B2F.line(ctx, '#8a909a', 1.2, [[W*.5 + 3, H*.5], [W*.5 + 5, H*.8]]); // the sword against the pole
    if (s === 3) { poly(ctx, [[W*.1, H*.8],[W*.16, H*.4],[W*.28, H*.8]], '#05060c'); B3VB.stars(ctx, W, H, T, 6, .1, .4, 921); for (let i=0;i<3;i++) B4VB.fire(ctx, W*(.15 + i*.04), H*.78, T, .3); } // the flap open on the camp
    if (s >= 4) { ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, 0, W, H); }
    return {fx:W*.4, fy:H*.94, fs:2.4}; },

  /* the fever-carts on the road east: a dust-yellow sky, the road running off east, open carts with blanket shapes, the column's dust
     ahead. Step 0-1 by day (Koryk in the cart, Smiles walking); step 2 dusk, the healer with her bucket; steps 3-4 dawn, the sick sitting
     up, the column moving off */
  b9v_carts(ctx, W, H, T, v){ const s = v.step || 0, dusk = s === 2, dawn = s >= 3;
    B4VB.sky(ctx, W, H*.56, dusk ? [[0, '#1a1420'], [1, '#8a4a30']] : dawn ? [[0, '#5a6070'], [1, '#d8b890']] : [[0, '#a89070'], [1, '#d8c49a']]);
    ctx.fillStyle = dusk ? '#3a2a1c' : '#7a6646'; ctx.fillRect(0, H*.54, W, H*.46); ctx.fillStyle = dusk ? '#4a3626' : '#9a8460'; ctx.beginPath(); ctx.moveTo(0, H*.86); ctx.lineTo(W*.7, H*.56); ctx.lineTo(W*.78, H*.56); ctx.lineTo(W*.4, H); ctx.lineTo(0, H); ctx.fill(); // the road east
    B3VB.dust(ctx, W*.84, H*.56, 70, 50, T, dusk ? .12 : .3, 931); for (let i=0;i<9;i++) B3VB.walker(ctx, W*(.74 + i*.012), H*(.57 - i*.002), .6, 'rgba(40,30,20,.7)', T, i, 1); // the column ahead, in its dust
    if (!dawn) for (let i=0;i<3;i++){ const x = W*(.1 + i*.06), y = H*.58; ctx.fillStyle = '#3a3020'; ctx.fillRect(x, y - 6, 10, 6); poly(ctx, [[x - 2, y - 6],[x + 2, y - 14],[x + 6, y - 9],[x + 12, y - 6]], '#4a3e2a'); } // the last farms, behind
    for (let i=0;i<3;i++){ const x = W*(.5 + i*.13), y = H*(.84 - i*.07), k = 1 - i*.2; ctx.fillStyle = '#4a3420'; ctx.fillRect(x - 18*k, y - 7*k, 36*k, 6*k); [x - 12*k, x + 12*k].forEach(wx => { ctx.strokeStyle = '#2a1e12'; ctx.lineWidth = 1.6*k; ctx.beginPath(); ctx.arc(wx, y, 4*k, 0, 7); ctx.stroke(); });
      for (let j=0;j<2;j++) ell(ctx, x - 8*k + j*14*k, y - 9*k - (dawn ? 3*k : 0), 6*k, (dawn ? 3.6 : 2.4)*k, dawn ? '#6a5e4a' : '#5a5244'); } // the carts, the blanket shapes (sitting up at dawn)
    if (s === 1) drawFigure(ctx, 'b7_malregular', W*.3, H*.92, 1.9, T, {dir:1}); // Smiles walking beside
    if (s === 2) { drawFigure(ctx, 'b9_c3_healer', W*.72, H*.94, 2, T, {still:true, dir:-1}); for (let i=0;i<4;i++) B4VB.fire(ctx, W*(.86 + i*.03), H*(.8 - i*.03), T, .4); }
    if (s === 3) drawFigure(ctx, 'b2soldier', W*.62, H*.86, 1.6, T, {still:true, dir:-1}); // Bottle on the cart's tail
    return s >= 4 ? {fx:W*.34, fy:H*.94, fs:2.3} : s === 3 ? {fx:W*.5, fy:H*.8, fs:2} : {fx:W*.5, fy:H*.74, fs:2}; }, // Koryk lies in the nearest cart (steps 0-2), sits up in it at dawn (3)

  /* the escort's camp at night in the Wastes: a hard black sky, rows of tents to the dark, dung-fires at the row ends, sentries; the
     soldier's fire (step 2) close by; step 4 the end of the lines and the dark beyond */
  b9v_lines(ctx, W, H, T, v){ const s = v.step || 0, end = s >= 4;
    B4VB.sky(ctx, W, H*.56, [[0, '#020206'], [1, '#12121c']]); B3VB.stars(ctx, W, H, T, 70, .5, .6, 941);
    ctx.fillStyle = '#16140e'; ctx.fillRect(0, H*.54, W, H*.46);
    const rows = end ? 1 : 3; for (let r=0;r<rows;r++) for (let i=0;i<9;i++){ const k = .5 + r*.25, x = W*(end ? .02 + i*.05 : .04 + i*.12 + r*.03), y = H*(.6 + r*.1); B3VB.tent(ctx, x, y, k, '#2a2620'); }
    for (let i=0;i<(end ? 1 : 4);i++) B4VB.fire(ctx, W*(.1 + i*.27), H*(.68 + (i % 2)*.1), T, .5); // dung-fires, small
    if (!end) for (let i=0;i<3;i++) B7VB.mark(ctx, W*(.2 + i*.3), H*.66, 1.4, 'rgba(10,10,10,.9)'); // sentries
    if (s === 2) { B4VB.fire(ctx, W*.74, H*.9, T, 1); for (let i=0;i<4;i++) drawFigure(ctx, 'b5_letherii', W*(.62 + i*.06), H*(.96 - (i % 2)*.03), 1.4, T, {still:true, dir:i < 2 ? 1 : -1, phase:i}); }
    drawFigure(ctx, 'b9v_brys', W*(end ? .5 : .34), H*.94, 2.2, T, {still:end, dir:end ? 1 : -1});
    return {fx:W*(end ? .42 : .26), fy:H*.94, fs:2.2}; },

  /* a rise in the Wastes at midday: a high white sky, the pale plain, the army's dust far behind, a horse cropping; bhederin far to the
     south (step 2); a rider's dust coming from the column (steps 3-4) */
  b9v_rise(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.5, [[0, '#e8e8e4'], [1, '#d4ccb8']]);
    ctx.fillStyle = '#b8a888'; ctx.fillRect(0, H*.48, W, H*.52); ctx.fillStyle = '#a89878'; ctx.beginPath(); ctx.moveTo(0, H); ctx.quadraticCurveTo(W*.4, H*.66, W, H*.8); ctx.lineTo(W, H); ctx.fill(); // the rise
    B3VB.dust(ctx, W*.06, H*.5, 90, 70, T, .35, 951); // the army's dust behind
    B7VB.grass(ctx, W, H*.7, H, 140, 'rgba(140,128,90,.6)', .2, T, 952);
    if (s >= 2) for (let i=0;i<6;i++) B4VB.horse(ctx, W*(.62 + i*.04), H*(.53 + hash(i, 953)*.01), .5, 'rgba(40,30,22,.8)', T, i, -1); // bhederin far off (a herd in silhouette)
    if (s >= 3) { const k = s >= 4 ? 1 : .55; B3VB.dust(ctx, W*(.06 + k*.14), H*.56, 30, 24, T, .4, 954); B3VB.rider(ctx, W*(.06 + k*.14), H*.58, .6 + k*.4, '#2a2018', T, 0, 1, false); } // the runner
    B4VB.horse(ctx, W*.66, H*.86, 1.8, '#4a3626', T, 2, -1, '#2a1e14'); // his horse, cropping
    return {fx:W*.4, fy:H*.92, fs:2.4}; },

  /* the Commander's tent the night before the battle: canvas walls, the lamp low, the Atri-Ceda in the corner with her smoke (all steps);
     the Commander at the table (steps 1-3); the night outside and the rows asleep (step 4) */
  b9v_stories(ctx, W, H, T, v){ const s = v.step || 0;
    if (s >= 4) { B4VB.sky(ctx, W, H*.6, [[0, '#020208'], [1, '#141420']]); B3VB.stars(ctx, W, H, T, 90, .55, .7, 961); ctx.fillStyle = '#12100c'; ctx.fillRect(0, H*.58, W, H*.42);
      for (let r=0;r<2;r++) for (let i=0;i<10;i++) B3VB.tent(ctx, W*(.04 + i*.1 + r*.05), H*(.66 + r*.1), .6 + r*.2, '#24201a');
      ctx.fillStyle = 'rgba(255,200,120,.35)'; ctx.fillRect(W*.82, H*.62, W*.06, H*.18); glow(ctx, W*.86, H*.7, 30, '#e8a050', .2); // the tent behind him, lit
      B3VB.dust(ctx, W*.52, H*.54, 120, 20, T, .05, 962); // something on the northern dark, very faint
      return {fx:W*.4, fy:H*.94, fs:2.4}; }
    B9VB.tent(ctx, W, H, T, .6);
    drawFigure(ctx, 'b9v_aranict', W*.9, H*.92, 1.9, T, {still:true, dir:-1});
    if (s >= 1 && s <= 3) drawFigure(ctx, 'b9v_brys', W*.68, H*.94, 2.1, T, {still:true, dir:-1});
    return {fx:W*.34, fy:H*.96, fs:2.3}; },

  /* the field from very high up: a pale cloth of a plain, a dark ring pressed into it, a white heap near the middle, a fan of small dark
     marks on one flank, and a broad scuffed trail away to the edge (steps 3-4). Lower (b9v7_low) the marks are bigger; the hunter in
     the air above all of it */
  b9v_field(ctx, W, H, T, v){ const s = v.step || 0, low = s >= 2 && S && S.f && S.f.b9v7_low === 'low' ? 1.5 : 1;
    ctx.fillStyle = vgrad(ctx, 0, H, [[0, '#c8bca2'], [1, '#a89c80']]); ctx.fillRect(0, 0, W, H);
    for (let i=0;i<30;i++) ell(ctx, W*hash(i, 971), H*hash(i, 972), 20 + hash(i, 973)*50, 4 + hash(i, 974)*8, 'rgba(120,108,84,.14)'); // the plain's folds
    if (s >= 1) { B9VB.crater(ctx, W*.52, H*.58, 34*low); for (let i=0;i<30;i++) ell(ctx, W*(.42 + hash(i, 975)*.08), H*(.5 + hash(i, 976)*.08), (1.4 + hash(i, 977)*1.6)*low, (.9 + hash(i, 978))*low, '#ece6d8'); } // the ring; the white heap
    if (s >= 2) for (let i=0;i<34;i++){ const a = -.5 + hash(i, 979)*1, r = (16 + hash(i, 980)*60)*low; ctx.fillStyle = 'rgba(40,30,24,.75)'; ctx.fillRect(W*.82 - Math.cos(a)*r, H*.3 + Math.sin(a)*r*.5, 2.2*low, 1.2*low); } // the broken charge, a fan
    if (s >= 3) { ctx.strokeStyle = 'rgba(90,78,60,.55)'; ctx.lineWidth = 18*low; ctx.beginPath(); ctx.moveTo(W*.46, H*.68); ctx.quadraticCurveTo(W*.3, H*.86, -10, H*.96); ctx.stroke();
      ctx.strokeStyle = 'rgba(70,60,46,.4)'; ctx.lineWidth = 1; for (let i=0;i<6;i++){ ctx.beginPath(); ctx.moveTo(W*.46, H*(.66 + i*.008)); ctx.quadraticCurveTo(W*.3, H*(.84 + i*.008), -10, H*(.93 + i*.01)); ctx.stroke(); } } // the trail, scuffed, going away
    for (let i=0;i<8;i++){ const x = ((hash(i, 981)*W + (REDUCE() ? 0 : T*.02)) % (W + 60)) - 30; ell(ctx, x, H*hash(i, 982), 30, 8, 'rgba(240,240,244,.12)'); } // thin high cloud below him
    const cx = REDUCE() ? W*.3 : W*(.3 + Math.sin(T/3000)*.08), cy = H*(.3 + Math.cos(T/2400)*.05);
    return {fx:cx, fy:cy, fs:s >= 4 ? 1.8 : 2.4, air:true}; },

  /* the reader, back at the chapter's reading place (B9READ[n]): 1 a kit-crate in the emptied barracks yard, Letheras at night, the dogs;
     2 a supply wagon's tailboard at the muster, evening lamplight; 3 a flat stone by the road at the fever-fire, the sick on blankets;
     4 a ration crate at the train at dusk, the wagons drawn in; 5 bare ground under the stars by a dung-fire; 6 a shield on the plain at
     dawn, a brown smear on the northern sky; 7 the plain after dark, lit by burning wagons. A card for the Third; a tile for the
     Letherii (obsidian for Perrit, bone for the tile-woman) */
  b9deck(ctx, W, H, T, v){ const ch = (VISIONS[v.id] && VISIONS[v.id].ch) || 1, tiles = ch % 2 === 0;
    const SK = {1:['#04040a', '#141628'], 2:['#0a0a12', '#3a2a24'], 3:['#14101a', '#6a3a26'], 4:['#100c14', '#5a3a2a'], 5:['#020206', '#0e0e18'], 6:['#4a4a56', '#c0a080'], 7:['#040306', '#2a140e']}[ch];
    B4VB.sky(ctx, W, H*.64, [[0, SK[0]], [1, SK[1]]]);
    const gnd = {1:'#2a2a30', 2:'#3a3024', 3:'#4a3a28', 4:'#3a3024', 5:'#1e1a14', 6:'#6a5e44', 7:'#1a1410'}[ch]; ctx.fillStyle = gnd; ctx.fillRect(0, H*.64, W, H*.36);
    if (ch === 1) { B3VB.stars(ctx, W, H, T, 20, .3, .4, 991); B6VB.roofs(ctx, W, H*.64, '#0c0c16', 992, 4, T); ctx.fillStyle = '#16141a'; ctx.fillRect(W*.7, H*.2, W*.3, H*.44); for (let i=0;i<4;i++){ ctx.fillStyle = '#06060a'; ctx.fillRect(W*(.73 + i*.07), H*.3, 8, 10); } b9vRoof(ctx, W, H, T, .6); ctx.fillStyle = '#4a3a24'; ctx.fillRect(W*.4, H*.82, W*.22, H*.08); B4VB.fire(ctx, W*.12, H*.8, T, .8); } // the empty bunk-house, a far roof, the crate, the fire
    else if (ch === 2) { for (let i=0;i<3;i++) B3VB.wagon(ctx, W*(.6 + i*.15), H*.64, .9, '#2a2016', '#6a5e48', '#1a140e'); for (let i=0;i<3;i++) B4VB.lamp(ctx, W*(.58 + i*.15), H*.5, T, 30, .3); ctx.fillStyle = '#5a4a36'; ctx.fillRect(W*.3, H*.8, W*.4, 6); } // the train loading by lamplight, the tailboard
    else if (ch === 3) { B4VB.fire(ctx, W*.78, H*.76, T, 1.2); for (let i=0;i<5;i++) ell(ctx, W*(.08 + i*.1), H*(.72 + (i % 2)*.04), 12, 4, '#5a5040'); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(W*.04, H*.58, W*.3, 5); ell(ctx, W*.5, H*.86, W*.12, 7, '#6a6050'); } // the fire, the sick on blankets, a cart, the stone
    else if (ch === 4) { for (let i=0;i<4;i++) B3VB.wagon(ctx, W*(.08 + i*.22), H*.64, .8, '#2a2016', '#5a5040', '#1a140e'); for (let i=0;i<3;i++) B4VB.fire(ctx, W*(.2 + i*.3), H*.72, T, .4); ctx.fillStyle = '#5a4a32'; ctx.fillRect(W*.38, H*.8, W*.24, H*.1); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(W*.38, H*.84, W*.24, 1); } // the wagons drawn in, low fires, the crate
    else if (ch === 5) { B3VB.stars(ctx, W, H, T, 90, .6, .7, 993); B4VB.fire(ctx, W*.76, H*.8, T, .6); ell(ctx, W*.5, H*.88, W*.14, 6, '#2a241a'); for (let i=0;i<4;i++) glow(ctx, W*(.1 + i*.12), H*.62, 6, '#e08040', .3); } // stars, the dung-fire, smoothed ground, the column's other fires
    else if (ch === 6) { ctx.fillStyle = 'rgba(120,90,60,.4)'; ell(ctx, W*.5, H*.42, W*.5, H*.08, 'rgba(120,90,60,.35)'); B3VB.dust(ctx, W*.5, H*.5, 160, 40, T, .12, 994); B7VB.grass(ctx, W, H*.66, H, 120, 'rgba(120,110,70,.5)', 0, T, 995); for (let i=0;i<12;i++) B7VB.mark(ctx, W*(.04 + i*.08), H*.66, 1.4, 'rgba(30,26,20,.85)'); ell(ctx, W*.5, H*.88, W*.1, 8, '#5a4a30'); ctx.strokeStyle = '#8a7a50'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(W*.5, H*.88, W*.1, 8, 0, 0, 7); ctx.stroke(); } // the smear on the northern sky, the line forming, the shield
    else if (ch === 7) { B7VB.smoke(ctx, W, H*.3, T, .35, 996, 6); for (let i=0;i<4;i++){ const x = W*(.1 + i*.24); B3VB.wagon(ctx, x, H*.64, .8, '#1a120c', '#2a1e14', '#0e0a06'); B4VB.fire(ctx, x, H*.6, T, 1.1); } for (let i=0;i<5;i++) ell(ctx, W*(.2 + i*.14), H*.8, 7, 3, '#3a3634'); } // the burning wagons, smoke, shields on the ground
    if (tiles) B5VB.tile(ctx, W*.5, H*.88, 22, visReader().id !== 'perrit'); else B6VB.card(ctx, W*.5, H*.88);
    return {fx:W*.3, fy:H*.86, fs:2.4}; },
});

/* a far roof going in over a roofline (b9v1's last step through the shutters, and the barracks yard on the first night) */
function b9vRoof(ctx, W, H, T, k = 1){ B9VB.rooffall(ctx, W*.14, H*.36, T, k); }

/* Koryk lies sick in the cart through b9v3's first three steps; Fiddler sits at the table through b9v1 */
{ const _df = drawFigure; drawFigure = function(ctx, kind, x, y, s, t, o = {}){
    if (kind === 'b9v_koryk' && VIS && VIS.id === 'b9v3' && o.sick == null) o = Object.assign({}, o, {sick:VIS.step <= 2});
    return _df(ctx, kind, x, y, s, t, o); }; }
