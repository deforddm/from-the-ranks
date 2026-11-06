/* ============ Book Seven: the visions' art (128) — backdrops VISBG b7v_* and b7deck, the figures FIGX b7v_* ============
   Drawn the way Books Four to Six draw their visions (78b, 88b, 108b): a few strokes per place, figures in the ~32px frame lit from the
   left, and 36b's drawVision laying the vision's own figure, the motes, the violet and the vignette over each backdrop. Book Seven's look:
   Lether again (88b's blue-grey, canal-green, lamp-gold and wet stone) for the roof, the sea floor and the plain; the Malazan coast and
   the inland roads in smoke-orange and hedge-black; the river after the battle in dusk and drifting smoke.
   Headline only: the burning transports are hulls with fire on them, far off; what the villagers wanted done is a lump under a cloth on a
   table at the back; the wave off the ridge is a band of grey distortion flattening the grass; Beak is nowhere on the canvas, only the
   silver dome over the ring and then its absence; the killing after the river battle is smoke and small figures far off. The pillar's
   names are scratches; no letter is legible.
   Reused: keneb (54b), b5_edur (80d), b7_malregular (126b), b2soldier (47b), b5_letherii (80d), the readers marrow, tallow, perrit,
   b4v_oldninth (78b), b5_c1_tilewoman (81b); the helpers B4VB (78b), B3VB (68b), B5VB (88b), B6VB (108b). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Tehol Beddict: thin, long-limbed, dark-haired, wrapped in a grey blanket and little else. o.lie: lying on his back on the roof bed */
  b7v_tehol(ctx, h, t, o){ ctx.save(); if (o.lie) { ctx.translate(0, 9); ctx.rotate(-Math.PI/2); ctx.translate(-1, -2); } B2F.grow(ctx, .9, 1.06);
    h.legs('#b89a7e'); poly(ctx, [[-6,-6],[5.6,-6.4],[6.4,9.4],[-7,9.8]], h.armor('#6a6a66', '#2a2a28')); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-6, 1, 12, .6); ctx.fillRect(-5.6, 5.6, 11.6, .6); // the blanket, folds
    ell(ctx, -5.6, -5, 1.6, 1.4, '#b89a7e'); // a bare shoulder
    h.head('#c4a68a', 3.9, -11.2); h.look('rgba(20,14,10,.9)', -11.4); B2F.cap(ctx, '#1e1612', 4.1, -12.4, 1, 2); ctx.fillStyle = '#1e1612'; ctx.fillRect(-4.1, -12.6, 1.2, 3.4); ctx.fillRect(3, -12.6, 1.1, 2.8); // dark hair, untidy
    ctx.fillStyle = 'rgba(255,230,200,.25)'; ctx.fillRect(1.4, -9.6, 1.4, .6); // the start of a smile
    ctx.restore(); },
  /* Fiddler: a sergeant of marines, grey in his beard, a battered helm, a leather jerkin, a crossbow on his back, a satchel of munitions.
     o.kneel: on his knees in the road, hands down at the hole */
  b7v_fiddler(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, o.kneel ? .8 : 1.02); if (o.kneel) ctx.translate(0, 2.6);
    B2F.line(ctx, '#4a3624', 1.2, [[-7, -8], [5, 2]]); B2F.line(ctx, '#6a5a44', 1, [[-8.6, -9.6], [-4.4, -6.2]]); // the crossbow on his back
    ell(ctx, 6.4, 4.4, 3, 2.6, '#5a4630'); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(4, 3.6, 5, .6); // the satchel
    h.legs('#3a3428'); h.torso('#5e4a34', '#22180e', 6); ctx.fillStyle = '#2a1e14'; ctx.fillRect(-6, 3, 12, 1.2);
    h.head('#b08c6e', 4.2, -11.2); h.look('rgba(20,14,10,.9)', -11.4); poly(ctx, [[-3.6,-9.4],[4.4,-9.4],[3.8,-6],[.8,-4.8],[-2.2,-5.4],[-3.4,-7.2]], '#8a8478'); // the beard, grey in it
    B2F.cap(ctx, '#5a5c5e', 4.6, -12.2, 1, 2); ctx.fillStyle = '#4a4c4e'; ctx.fillRect(-4.8, -12.6, 9.6, 1.4); // the helm
    if (o.kneel) { ell(ctx, 4.4, 9, 2, 1.4, '#b08c6e'); ell(ctx, -3, 9.4, 2, 1.4, '#b08c6e'); }
    ctx.restore(); },
  /* Bruthen Trana, dead and walking: a Tiste Edur warrior, grey-skinned and tall, his long black hair lifting in the water, a harness
     and a sword, paler than the living; the silt drifting off him */
  b7v_bruthen(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.14); const dr = o.still ? 0 : Math.sin(t/900 + (o.phase || 0));
    ctx.globalAlpha *= .92;
    h.legs('#2a2e34'); h.torso('#46484c', '#16181c', 5.8); B2F.line(ctx, '#2a2420', .9, [[-5, -6], [5, 6]]); B2F.line(ctx, '#2a2420', .9, [[5, -6], [-5, 6]]); // the harness
    ctx.strokeStyle = '#8a9098'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(-6.6, 3); ctx.lineTo(-8.6, 13); ctx.stroke(); // the sword, sheathed and hanging
    h.head('#8a929c', 4.2, -11.4); h.look('rgba(150,190,220,.7)', -11.6); B2F.cap(ctx, '#0e1014', 4.4, -12.8, 1.02, 1.98);
    ctx.strokeStyle = '#0e1014'; ctx.lineWidth = 1.4; ctx.beginPath(); for (let i=0;i<3;i++){ ctx.moveTo(-3 + i*2.4, -15.6); ctx.quadraticCurveTo(-4 + i*2 + dr*2, -20, -2 + i*2.6 + dr*3, -23 - i); } ctx.stroke(); // the hair, lifting
    ctx.restore(); },
  /* Hellian: a sergeant, a woman of middle height in a stained leather jerkin and a helm pushed back, a crossbow slung, a jug in one hand */
  b7v_hellian(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1); const sw = o.still ? 0 : Math.sin(t/800 + (o.phase || 0))*.06; ctx.rotate(sw);
    B2F.line(ctx, '#4a3624', 1.1, [[-6.6, -7], [4.6, 1.6]]); // the crossbow's strap
    h.legs('#3a3026'); h.torso('#6a5034', '#2a1c10', 5.6); ctx.fillStyle = 'rgba(30,20,10,.35)'; ctx.fillRect(-3, -1, 3, 2.2); ctx.fillRect(1, 4, 2.2, 1.6); // stains
    ctx.fillStyle = '#2a1e14'; ctx.fillRect(-5.6, 3, 11.2, 1.2);
    h.head('#c09a7c', 3.9, -11.2); h.look('rgba(30,16,10,.85)', -11.2); B2F.cap(ctx, '#6a3a20', 4.1, -12.2, 1, 2); ctx.fillStyle = '#6a3a20'; ctx.fillRect(-4.1, -12.4, 1.4, 5.4); ctx.fillRect(2.9, -12.4, 1.2, 4.6); // hair, reddish brown
    ctx.fillStyle = '#5a5c5e'; ctx.beginPath(); ctx.arc(0, -13.8, 4, Math.PI*1.05, Math.PI*1.95); ctx.fill(); // the helm, pushed back
    ell(ctx, 7.6, 2.4, 2.4, 3, '#7a5a3a'); ctx.fillStyle = '#4a3420'; ctx.fillRect(6.8, -1.6, 1.6, 1.8); ell(ctx, 6.4, 1.6, 1.2, 1.2, '#c09a7c'); // the jug
    ctx.restore(); },
  /* Hanradi Khalag: an older Tiste Edur chief, tall, grey-skinned, grey in his black braids, a long dark cloak over a harness, a sword */
  b7v_hanradi(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1.16); const sw = o.still ? 0 : Math.sin(t/700 + (o.phase || 0))*.4;
    poly(ctx, [[-6.4,-6.4],[5.8,-6.4],[7,11.6 + sw],[-8.6 - sw,12]], h.armor('#26262c', '#0a0a0e')); // the cloak
    h.legs('#22222a'); h.torso('#4a4640', '#18161a', 5.8); B2F.line(ctx, '#2a2018', .9, [[-5, -6], [5, 6]]); ctx.fillStyle = '#8a8070'; ctx.fillRect(-2.4, -6.6, 4.8, 1); // harness; a torc of office
    h.head('#767c84', 4.2, -11.4); h.look('rgba(10,10,14,.9)', -11.6); B2F.cap(ctx, '#1a1a1e', 4.4, -12.8, 1.02, 1.98); B2F.line(ctx, '#3a3a40', 1.4, [[-3.6, -12.6], [-6.6, -1]]); B2F.line(ctx, '#6a6a70', .5, [[-3.4, -12.4], [-6, -2]]); // braids, grey in them
    ctx.strokeStyle = '#a8a8b0'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(7, 3); ctx.lineTo(10.4, 12.4); ctx.stroke(); ctx.strokeStyle = '#2a2018'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(6.4, 2); ctx.lineTo(7.4, 4.6); ctx.stroke(); // the sword, point down
    ctx.restore(); },
  /* Lostara Yil: a Pardu woman, dark-skinned, black hair tied back, the faint tattoos on her cheeks, a grey-green cloak over dark leather
     (no longer the red of the Red Blades), a sword at her hip */
  b7v_lostara(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.04); const sw = o.still ? 0 : Math.sin(t/650 + (o.phase || 0))*.4;
    poly(ctx, [[-5.8,-6.2],[5.2,-6.2],[6.4,11 + sw],[-7.6 - sw,11.4]], h.armor('#4a5448', '#1a1e18')); // the cloak
    h.legs('#22201c'); h.torso('#3a3028', '#141010', 5.6); ctx.fillStyle = '#1a1410'; ctx.fillRect(-5.6, 3.2, 11.2, 1.2);
    B2F.line(ctx, '#6a6a70', 1, [[5.6, 3.6], [8.6, 11]]); // the sword at her hip
    h.head('#8a5a3c', 4.1, -11.3); h.look('rgba(16,8,4,.9)', -11.6); ctx.strokeStyle = 'rgba(30,40,60,.6)'; ctx.lineWidth = .45; ctx.beginPath(); ctx.moveTo(-1.6, -9.6); ctx.lineTo(.4, -8.2); ctx.moveTo(3.6, -9.8); ctx.lineTo(2.2, -8); ctx.stroke(); // the tattoos
    B2F.cap(ctx, '#0c0806', 4.4, -12.6); ctx.fillStyle = '#0c0806'; ctx.fillRect(-4.4, -12.6, 1.6, 6);
    ctx.restore(); },
});

/* ---------------- backdrop helpers ---------------- */
const B7VB = {
  /* a hedge band: lumpy dark along a line from (x0,y0) to (x1,y1) */
  hedge(ctx, x0, y0, x1, y1, n, r0, r1, col, seed = 1){ for (let i=0;i<=n;i++){ const k = i/n, x = x0 + (x1 - x0)*k, y = y0 + (y1 - y0)*k, r = r0 + (r1 - r0)*k; ell(ctx, x, y - r*.4, r*(1 + hash(i, seed)*.4), r*(.7 + hash(i, seed + 1)*.3), col); } },
  /* flat grass blades over a band; flat: 0 upright .. 1 laid down to the right */
  grass(ctx, W, y0, y1, n, col, flat = 0, T = 0, seed = 5){ ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.beginPath(); for (let i=0;i<n;i++){ const x = hash(i, seed)*W, y = y0 + hash(i, seed + 1)*(y1 - y0), l = 3 + hash(i, seed + 2)*4, sw = (REDUCE() ? 0 : Math.sin(T/700 + i)*.3) + flat*1.3;
    ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(sw)*l, y - Math.cos(sw)*l); } ctx.stroke(); },
  /* drifting smoke along a line */
  smoke(ctx, W, y, T, a = .3, seed = 9, n = 8){ for (let i=0;i<n;i++){ const x = ((hash(i, seed)*W*1.3 + (REDUCE() ? 0 : T*.008*(1 + hash(i, seed + 1)))) % (W*1.3)) - W*.15; ell(ctx, x, y + hash(i, seed + 2)*20 - 10, 40 + hash(i, seed + 3)*50, 7 + hash(i, seed + 4)*6, `rgba(70,64,62,${a})`); } },
  /* a tiny far figure: a dark upright mark with a head */
  mark(ctx, x, y, s, col){ ctx.fillStyle = col; ctx.fillRect(x - .9*s, y - 5*s, 1.8*s, 5*s); ell(ctx, x, y - 5.8*s, .9*s, .9*s, col); },
  /* a burning hull far out on the bay */
  pyre(ctx, x, y, s, T, k, seed){ B5VB.ship(ctx, x, y, s, T, true); const f = REDUCE() ? 1 : .85 + Math.sin(T/80 + seed)*.1 + Math.sin(T/31 + seed)*.05;
    glow(ctx, x, y - 6*s, 40*s*k, '#ff7a30', .4*f*k); B4VB.fire(ctx, x - 6*s, y - 1*s, T, .5*s*k); B4VB.fire(ctx, x + 7*s, y - 1*s, T, .45*s*k, '#ffa040');
    ctx.strokeStyle = `rgba(40,34,30,${.4*k})`; ctx.lineWidth = 6*s; ctx.beginPath(); ctx.moveTo(x, y - 10*s); ctx.quadraticCurveTo(x + 10*s, y - 40*s, x + 30*s + (REDUCE() ? 0 : Math.sin(T/900 + seed)*4), y - 70*s); ctx.stroke(); },
};

Object.assign(VISBG, {
  /* the coast of Lether at night: a sky lit orange from below, the bay full of burning hulls, the beach, the dunes with the column going
     into them. Step 2 a sergeant wading ashore with a cask; steps 3-4 the column forming; step 5 the hulls burned to the waterline. */
  b7v_beach(ctx, W, H, T, v){ const s = v.step || 0, low = s >= 5 ? .55 : 1;
    B4VB.sky(ctx, W, H*.5, [[0, '#06060c'], [.6, '#2a1410'], [1, '#6a3018']]); B3VB.stars(ctx, W, H, T, 24, .3, .4, 141);
    B4VB.sea(ctx, W, H, H*.5, '#2a1a14', '#0a0808', T, 142);
    for (let i=0;i<6;i++){ const x = W*(.08 + i*.17 + hash(i, 143)*.05), y = H*(.52 + hash(i, 144)*.06); B7VB.pyre(ctx, x, y + (s >= 5 ? 3 : 0), .55 + hash(i, 145)*.25, T, low, i); }
    ctx.fillStyle = 'rgba(255,140,60,.12)'; for (let i=0;i<10;i++) ctx.fillRect(hash(i, 146)*W, H*(.6 + hash(i, 147)*.06), 18, 1.2); // the fire on the water
    ctx.fillStyle = '#4a3a2a'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H*.7); ctx.quadraticCurveTo(W*.5, H*.66, W, H*.72); ctx.lineTo(W, H); ctx.fill(); // the beach
    ctx.fillStyle = '#2a2018'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H*.86); for (let x=0;x<=W;x+=W/10) ctx.lineTo(x, H*(.84 + hash(Math.round(x), 148)*.05)); ctx.lineTo(W, H); ctx.fill(); // the dunes
    if (s === 2) { B3VB.walker(ctx, W*.62, H*.66, 1.6, '#1a1210', T, 0, -1, 1); B3VB.walker(ctx, W*.68, H*.67, 2, '#1a1210', T, 1, -1, 1); ctx.fillStyle = 'rgba(42,26,20,.9)'; ctx.fillRect(W*.58, H*.655, W*.14, 3); } // wading, waist-deep
    const n = s >= 3 ? 14 : 6; for (let i=0;i<n;i++) B3VB.walker(ctx, W*(.5 + hash(i, 149)*.46), H*(.8 + hash(i, 150)*.06), 1.2, s >= 4 ? 'rgba(20,16,12,.55)' : '#1a1410', T, i, 1); // the column; Mockra on them from step 3
    return {fx:W*.26, fy:H*.92, fs:2.3}; },

  /* a roof in Letheras at dusk: a red-violet sky, the city's towers and smoke, a flat roof with a low parapet, a bed under a sagging net
     on four poles. Tehol lies in it; Bugg comes up the ladder on step 1; the patrol passes below on step 3. */
  b7v_roof(ctx, W, H, T, v){ const s = v.step || 0, late = s >= 3;
    B4VB.sky(ctx, W, H*.62, late ? [[0, '#0c0a18'], [.7, '#3a2030'], [1, '#6a3a30']] : [[0, '#2a1a2a'], [.6, '#8a4a3a'], [1, '#d08a5a']]);
    if (late) B3VB.stars(ctx, W, H, T, 30, .35, .5, 151);
    B5VB.skyline(ctx, W, H*.62, late ? '#0e0c12' : '#2a1e22', 152, 2, T);
    for (let i=0;i<12;i++){ const x = W*hash(i, 153), y = H*(.5 + hash(i, 154)*.1); if (late || i < 5) B4VB.lamp(ctx, x, y, T, 8, .4); }
    ctx.fillStyle = late ? '#2a2420' : '#5a4a3a'; ctx.fillRect(0, H*.66, W, H*.34); ctx.fillStyle = late ? '#1a1612' : '#3a2e24'; ctx.fillRect(0, H*.64, W, H*.04); // the roof, the parapet
    const bx = W*.36, by = H*.86; ctx.fillStyle = '#3a2a1e'; ctx.fillRect(bx - 36, by - 6, 72, 8); ctx.fillStyle = '#7a6a5a'; ctx.fillRect(bx - 34, by - 9, 68, 4); // the bed
    [-36, 34].forEach(dx => { ctx.fillStyle = '#2a2018'; ctx.fillRect(bx + dx, by - 44, 2, 40); });
    ctx.fillStyle = 'rgba(220,214,200,.16)'; ctx.beginPath(); ctx.moveTo(bx - 36, by - 2); ctx.lineTo(bx - 36, by - 44); ctx.quadraticCurveTo(bx, by - 30, bx + 36, by - 44); ctx.lineTo(bx + 36, by - 2); ctx.fill(); // the netting, sagging
    ctx.strokeStyle = 'rgba(220,214,200,.25)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<8;i++){ ctx.moveTo(bx - 36 + i*10, by - 2); ctx.lineTo(bx - 36 + i*10, by - 42 + Math.sin(i/7*Math.PI)*12); } ctx.stroke();
    for (let i=0;i<10;i++){ const a = (REDUCE() ? i : T/300 + i)*1.7, x = bx + Math.cos(a)*44 + hash(i, 155)*10, y = by - 30 + Math.sin(a*1.3)*14; ctx.fillStyle = 'rgba(20,16,12,.7)'; ctx.fillRect(x, y, 1.4, 1.4); } // the insects, outside
    if (s >= 1 && s <= 2) { ctx.fillStyle = '#2a2018'; ctx.fillRect(W*.82, H*.62, 2, H*.3); ctx.fillRect(W*.86, H*.62, 2, H*.3); for (let i=0;i<5;i++) ctx.fillRect(W*.82, H*(.66 + i*.06), W*.04 + 2, 1.4); drawFigure(ctx, 'b5_letherii', W*.78, H*.9, 1.5, T, {still:true, dir:-1, pick:1}); } // the ladder; Bugg
    if (s === 3) for (let i=0;i<5;i++) drawFigure(ctx, i === 4 ? 'b5_edur' : 'b5_letherii', W*(.62 + i*.07), H*.66, .55, T, {still:true, dir:1, pick:i}); // the patrol, in the street below
    return {fx:bx + 24, fy:by - 33, fs:1.6}; },

  /* a road inland at night: hedges converging, the road pale between them, a farm's lights far down it, the hole in the road's middle.
     Cuttle crouched at the path's end (steps 1-4); the squad a shimmer behind the hedge (step 2 on); the lantern and horses on step 4. */
  b7v_road(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.5, [[0, '#04050a'], [1, '#141824']]); B3VB.stars(ctx, W, H, T, 60, .45, .6, 161);
    ctx.fillStyle = '#10140e'; ctx.fillRect(0, H*.48, W, H*.52);
    ctx.fillStyle = '#3a3628'; ctx.beginPath(); ctx.moveTo(W*.48, H*.5); ctx.lineTo(W*.52, H*.5); ctx.lineTo(W*.86, H); ctx.lineTo(W*.14, H); ctx.fill(); // the road
    B7VB.hedge(ctx, W*.46, H*.5, W*.02, H*.98, 16, 3, 22, '#080a06', 162); B7VB.hedge(ctx, W*.54, H*.5, W*.98, H*.98, 16, 3, 22, '#080a06', 163);
    for (let i=0;i<3;i++) B4VB.lamp(ctx, W*(.49 + i*.012), H*.49, T, 8, .45); // the farm, far down the road
    ell(ctx, W*.5, H*.92, 12, 3.4, '#14100a'); // the hole
    if (s >= 1) drawFigure(ctx, 'b2soldier', W*.82, H*.84, 1.2, T, {still:true, dir:-1}); // Cuttle, at the path's end
    if (s >= 2) for (let i=0;i<4;i++) drawFigure(ctx, 'b2soldier', W*(.08 + i*.05), H*(.8 + i*.02), 1.1, T, {still:true, dir:1, alpha:.18}); // the squad, under Mockra
    if (s >= 4) { const k = REDUCE() ? .5 : (Math.sin(T/1600) + 1)/2; B4VB.lamp(ctx, W*.505, H*(.53 + k*.02), T, 16, .6); for (let i=0;i<3;i++) B4VB.horse(ctx, W*(.495 + i*.008), H*(.54 + k*.02), .25, '#0a0a08', T, i, 1); }
    return s >= 3 ? {fx:W*.22, fy:H*.9, fs:2.2} : {fx:W*.5, fy:H*.94, fs:2.3}; },

  /* the floor of the sea: black-blue water, silt drifting, the ribs of old hulls, and the pale pillar growing nearer (near from step 3) */
  b7v_seafloor(ctx, W, H, T, v){ const s = v.step || 0, near = s >= 3;
    B4VB.sky(ctx, W, H, [[0, '#010308'], [.6, '#04101a'], [1, '#0a1a20']]);
    for (let i=0;i<5;i++){ const x = W*(.1 + i*.2) + (REDUCE() ? 0 : Math.sin(T/3000 + i)*10); ctx.fillStyle = 'rgba(80,140,170,.035)'; ctx.beginPath(); ctx.moveTo(x - 10, 0); ctx.lineTo(x + 10, 0); ctx.lineTo(x + 40, H*.7); ctx.lineTo(x - 20, H*.7); ctx.fill(); } // what is not light, coming down
    ctx.fillStyle = '#121a1a'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H*.72); for (let x=0;x<=W;x+=W/12) ctx.lineTo(x, H*(.7 + hash(Math.round(x), 171)*.04)); ctx.lineTo(W, H); ctx.fill(); // the silt plain
    for (let i=0;i<4;i++){ const x = W*(.08 + i*.26 + hash(i, 172)*.06), y = H*(.76 + hash(i, 173)*.1), sc = .6 + hash(i, 174)*.5; ctx.strokeStyle = 'rgba(30,40,38,.9)'; ctx.lineWidth = 1.6*sc; ctx.beginPath(); for (let r=0;r<5;r++){ ctx.moveTo(x + r*7*sc, y); ctx.quadraticCurveTo(x + r*7*sc - 4*sc, y - 14*sc, x + r*7*sc + 2*sc, y - 22*sc); } ctx.stroke(); ctx.fillStyle = 'rgba(22,30,28,.9)'; ctx.fillRect(x - 3*sc, y - 2*sc, 36*sc, 3*sc); } // old hulls on their sides
    const px = near ? W*.72 : W*.8, pw = near ? 26 : 8, top = near ? H*.02 : H*.36, pb = H*.74; const g = ctx.createLinearGradient(px - pw, 0, px + pw, 0); g.addColorStop(0, '#9aa4a6'); g.addColorStop(.5, '#c8ccc4'); g.addColorStop(1, '#5a6466'); ctx.fillStyle = g; ctx.fillRect(px - pw/2, top, pw, pb - top); glow(ctx, px, (top + pb)/2, near ? 70 : 30, '#a8c8d0', near ? .12 : .08); // the pillar
    if (near) { ctx.fillStyle = 'rgba(40,46,48,.55)'; for (let i=0;i<70;i++){ const y = top + 6 + i*((pb - top - 10)/70), x0 = px - pw/2 + 2 + hash(i, 175)*4; ctx.fillRect(x0, y, pw - 6 - hash(i, 176)*8, .8); } } // the names, as scratches
    if (s === 4) glow(ctx, px - 4, H*.36, 10, '#e0f0ff', .5 + (REDUCE() ? 0 : Math.sin(T/400)*.1)); // the one name
    ctx.fillStyle = 'rgba(160,190,190,.3)'; for (let i=0;i<40;i++){ const x = (hash(i, 177)*W + (REDUCE() ? 0 : T*.004*(1 + hash(i, 178)))) % W, y = H*(.2 + hash(i, 179)*.75) + (REDUCE() ? 0 : Math.sin(T/1200 + i)*4); ctx.fillRect(x, y, 1.2, 1.2); } // silt that does not settle
    return {fx:near ? W*.56 : W*.34, fy:H*.86, fs:2.3}; },

  /* a village tavern: low beams, a lamp, the open shutter on the street and the tree line beyond, the end table with its cloth at the back.
     Urb in the door (steps 1-3); the boy (step 2); the Edur coming out of the trees (steps 3-4). */
  b7v_tavern(ctx, W, H, T, v){ const s = v.step || 0;
    ctx.fillStyle = '#1e1610'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#140e0a'; for (let i=0;i<4;i++) ctx.fillRect(0, H*(.04 + i*.07), W, 5); // the beams
    ctx.fillStyle = '#2a2016'; ctx.fillRect(0, H*.78, W, H*.22); ctx.fillStyle = 'rgba(0,0,0,.3)'; for (let i=0;i<5;i++) ctx.fillRect(0, H*(.8 + i*.04), W, 1); // the floor
    const wx = W*.58, wy = H*.26, ww = W*.32, wh = H*.32;
    const sg = ctx.createLinearGradient(0, wy, 0, wy + wh); sg.addColorStop(0, '#3a2a3a'); sg.addColorStop(1, '#8a5a3a'); ctx.fillStyle = sg; ctx.fillRect(wx, wy, ww, wh); // the dusk, through the shutter
    ctx.fillStyle = '#4a3a28'; ctx.fillRect(wx, wy + wh*.62, ww, wh*.38); // the fields
    ctx.fillStyle = '#0e0c0a'; for (let i=0;i<12;i++) ell(ctx, wx + i*ww/11, wy + wh*.6, ww/14, wh*.12, '#0e0c0a'); // the tree line
    if (s >= 3) for (let i=0;i<18;i++){ const k = REDUCE() ? .5 : ((T/9000 + hash(i, 181)) % 1), x = wx + 4 + hash(i, 182)*(ww - 8), y = wy + wh*(.66 + k*.22 + hash(i, 183)*.04); B7VB.mark(ctx, x, y, .8, 'rgba(110,116,124,.9)'); } // grey shapes, walking
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(wx - 4, wy - 4, ww + 8, 4); ctx.fillRect(wx - 4, wy + wh, ww + 8, 4); ctx.fillRect(wx - 4, wy, 4, wh); ctx.fillRect(wx + ww, wy, 4, wh); ctx.fillStyle = '#2a1e14'; ctx.fillRect(wx + ww + 4, wy, 10, wh); // frame, the shutter open
    ctx.fillStyle = '#2e2216'; ctx.fillRect(W*.06, H*.6, W*.2, 6); ctx.fillRect(W*.08, H*.6, 3, H*.2); ctx.fillRect(W*.23, H*.6, 3, H*.2); ell(ctx, W*.16, H*.58, W*.07, 5, '#4a4436'); // the end table, its cloth
    B4VB.lamp(ctx, W*.4, H*.3, T, 70, .3); ctx.fillStyle = '#ffd890'; ctx.fillRect(W*.4 - 1.4, H*.3, 2.8, 5);
    if (s >= 1 && s <= 3) drawFigure(ctx, 'b2soldier', W*(s === 3 ? .66 : .9), H*.88, 2.4, T, {still:true, dir:-1}); // Urb
    if (s === 2) drawFigure(ctx, 'b5_letherii', W*.78, H*.9, 1.4, T, {still:true, dir:-1, pick:2}); // the boy
    return {fx:W*.42, fy:H*.9, fs:2.3}; },

  /* the plain before Letheras: a hard pale sky, the ridge to the west with its line of robed mages and the officers behind, the ring of
     marines in the middle, the Edur near it. Step 2 the wave rolls in from the left; step 3 the silver dome; step 4 the dome gone, the
     grass laid flat, a sergeant getting up; step 5 the Edur walking away north (off to the right and up). */
  b7v_field(ctx, W, H, T, v){ const s = v.step || 0;
    B4VB.sky(ctx, W, H*.56, s >= 4 ? [[0, '#3a3c44'], [1, '#8a8a88']] : [[0, '#5a5e68'], [1, '#c8c4bc']]);
    ctx.fillStyle = '#2a2a1c'; poly(ctx, [[0, H*.32],[W*.1, H*.3],[W*.22, H*.38],[W*.3, H*.56],[0, H*.6]], '#2a2a22'); // the ridge
    for (let i=0;i<9;i++) B7VB.mark(ctx, W*(.03 + i*.025), H*(.31 + i*.008), 1.2, '#16141a'); // the mages, robed
    if (s <= 2) for (let i=0;i<9;i++) { const x = W*(.03 + i*.025), y = H*(.31 + i*.008) - 7; ctx.strokeStyle = '#16141a'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, y + 2); ctx.lineTo(x - 2, y - 3); ctx.moveTo(x, y + 2); ctx.lineTo(x + 2, y - 3); ctx.stroke(); } // arms raised
    ctx.fillStyle = '#4a4a30'; ctx.fillRect(0, H*.56, W, H*.44); B7VB.grass(ctx, W, H*.58, H, 160, 'rgba(110,110,70,.6)', s >= 4 ? 1 : 0, T, 186);
    const rx = W*.66, ry = H*.66; for (let i=0;i<22;i++){ const a = i/22*Math.PI*2; B7VB.mark(ctx, rx + Math.cos(a)*W*.09, ry + Math.sin(a)*H*.05, 1, '#2a2e2a'); } // the ring
    if (s <= 4) for (let i=0;i<10;i++) drawFigure(ctx, 'b5_edur', W*(.42 + hash(i, 187)*.12), H*(.7 + hash(i, 188)*.12), .7, T, {still:true, dir:1, pick:i}); // Hanradi's warriors, near the ring
    if (s === 2) { const k = REDUCE() ? .5 : ((T/5000) % 1), x = W*(.2 + k*.35); const g = ctx.createLinearGradient(x - 60, 0, x + 20, 0); g.addColorStop(0, 'rgba(120,120,130,0)'); g.addColorStop(.7, 'rgba(160,160,175,.5)'); g.addColorStop(1, 'rgba(230,230,240,.7)'); ctx.fillStyle = g; ctx.fillRect(x - 60, H*.3, 80, H*.7); } // the wave
    if (s === 3) { const f = REDUCE() ? 1 : .85 + Math.sin(T/60)*.1; ctx.save(); ctx.beginPath(); ctx.ellipse(W*.6, H*.76, W*.3, H*.42, 0, Math.PI, 0); ctx.fillStyle = `rgba(210,220,240,${.28*f})`; ctx.fill(); ctx.strokeStyle = `rgba(240,245,255,${.8*f})`; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); glow(ctx, W*.6, H*.6, W*.3, '#d8e4ff', .2*f);
      ctx.fillStyle = 'rgba(160,160,175,.4)'; ctx.fillRect(0, H*.3, W*.28, H*.7); } // the dome, and the wave breaking on it
    if (s === 4) drawFigure(ctx, 'b7_malregular', W*.72, H*.84, 1.6, T, {still:true, dir:-1}); // the sergeant, getting up
    if (s >= 5) for (let i=0;i<10;i++) drawFigure(ctx, 'b5_edur', W*(.7 + i*.03), H*(.62 + i*.006), .5, T, {phase:i, dir:1}); // walking home
    return {fx:s >= 5 ? W*.6 : W*.36, fy:H*.88, fs:2.3}; },

  /* the Lether River after the battle: a dusk sky, the river with smoke lying on it, ships drawn up on the mud, the field beyond with small
     figures and fires; the Adjunct a grey shape on the bank above (steps 0-3); the fires along the bank at night (step 3 on). */
  b7v_river(ctx, W, H, T, v){ const s = v.step || 0, night = s >= 3;
    B4VB.sky(ctx, W, H*.5, night ? [[0, '#06060c'], [1, '#2a1a1a']] : [[0, '#2a2028'], [.7, '#7a4a3a'], [1, '#b0704a']]);
    if (night) B3VB.stars(ctx, W, H, T, 30, .35, .45, 191);
    ctx.fillStyle = night ? '#16140e' : '#3a3424'; ctx.fillRect(0, H*.44, W, H*.12); // the field across the river
    for (let i=0;i<14;i++) B7VB.mark(ctx, W*(.05 + hash(i, 192)*.9), H*(.5 + hash(i, 193)*.04), .7, night ? 'rgba(10,10,8,.8)' : '#1a1610');
    for (let i=0;i<5;i++) B4VB.fire(ctx, W*(.1 + hash(i, 194)*.8), H*.5, T, .3);
    B4VB.sea(ctx, W, H, H*.56, night ? '#141a1c' : '#3a4448', '#0a0e10', T, 195); B7VB.smoke(ctx, W, H*.6, T, night ? .25 : .35, 196);
    for (let i=0;i<3;i++) B5VB.ship(ctx, W*(.18 + i*.24), H*.74, .6, T, false); // drawn up on the mud
    ctx.fillStyle = '#2a2418'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H*.8); ctx.quadraticCurveTo(W*.5, H*.76, W, H*.82); ctx.lineTo(W, H); ctx.fill(); // the bank
    if (night) for (let i=0;i<6;i++) B4VB.fire(ctx, W*(.08 + i*.17), H*(.86 + hash(i, 197)*.04), T, .6);
    if (s <= 3) { const ax = W*.58, ay = H*.9; poly(ctx, [[ax - 4, ay],[ax - 3, ay - 22],[ax, ay - 26],[ax + 3, ay - 22],[ax + 4, ay]], '#4a4c50'); ell(ctx, ax, ay - 28, 3, 3.2, '#8a7a6a'); ctx.fillStyle = '#2a2420'; ctx.fillRect(ax - 3, ay - 31, 6, 2); } // the Adjunct, plain and grey
    if (s === 2) { drawFigure(ctx, 'b2soldier', W*.86, H*.86, 1.3, T, {still:true, dir:-1}); ell(ctx, W*.16, H*.88, 10, 3, '#2a2016'); drawFigure(ctx, 'b5_letherii', W*.16, H*.86, 1.2, T, {still:true, dir:1, pick:0}); } // Blistig on the mud; Banaschar on his boat
    return {fx:W*.46, fy:H*.92, fs:2.3}; },

  /* the reader, back at the chapter's reading place (B7READ[n]): 1 above the beach the night the ships burned; 2 the barracks yard under
     the lamp; 3 a farmhouse floor, no lamp; 4 the Sixth's tent below Kravos Hill; 5 the factor's cellar by a rushlight; 6 a shield in
     the grass of the line, dawn; 7 a doorstep in Letheras by a brazier. A card for the Deck, a tile for the Letherii. */
  b7deck(ctx, W, H, T, v){ const ch = (VISIONS[v.id] && VISIONS[v.id].ch) || 1, tiles = ch % 2 === 0;
    const SK = {1:['#06060c', '#3a1810'], 2:['#08090c', '#1e2026'], 3:['#060504', '#1c1610'], 4:['#08090a', '#22242a'], 5:['#08070a', '#1e1a16'], 6:['#2a2a34', '#a8a0a8'], 7:['#0c0a0c', '#4a2a1e']}[ch];
    B4VB.sky(ctx, W, H*.64, [[0, SK[0]], [1, SK[1]]]);
    const gnd = {1:'#3a3024', 2:'#2e2e32', 3:'#3a2e22', 4:'#2e3036', 5:'#3a332a', 6:'#3a3c2a', 7:'#2e2e34'}[ch]; ctx.fillStyle = gnd; ctx.fillRect(0, H*.64, W, H*.36);
    if (ch === 1) { B3VB.stars(ctx, W, H, T, 30, .4, .5, 201); for (let i=0;i<4;i++) B7VB.pyre(ctx, W*(.5 + i*.12), H*.6, .35, T, .7, i); B6VB.scrub(ctx, W, H*.66, H, 18, '#1a140e', 202); }
    else if (ch === 2) { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i=0;i<6;i++){ ctx.beginPath(); ctx.moveTo(0, H*(.68 + i*.055)); ctx.lineTo(W, H*(.68 + i*.055)); ctx.stroke(); } ctx.fillStyle = '#16161a'; ctx.fillRect(0, H*.26, W, H*.38); ctx.fillStyle = '#0c0c10'; ctx.fillRect(W*.8, H*.36, W*.12, H*.28); drawFigure(ctx, 'b5_edur', W*.84, H*.64, .8, T, {still:true, dir:-1}); drawFigure(ctx, 'b5_edur', W*.89, H*.64, .8, T, {still:true, dir:-1}); B4VB.lamp(ctx, W*.12, H*.3, T, 60, .4); }
    else if (ch === 3) { ctx.fillStyle = '#0e0a08'; ctx.fillRect(0, 0, W, H*.64); for (let i=0;i<3;i++){ ctx.fillStyle = 'rgba(200,170,120,.12)'; ctx.fillRect(W*(.2 + i*.3), H*.2, 2, H*.3); } ctx.strokeStyle = 'rgba(0,0,0,.4)'; for (let i=0;i<5;i++){ ctx.beginPath(); ctx.moveTo(0, H*(.7 + i*.06)); ctx.lineTo(W, H*(.7 + i*.06)); ctx.stroke(); } } // shutter-light, boards
    else if (ch === 4) { ctx.fillStyle = '#2a2c30'; poly(ctx, [[0, H*.64],[W*.5, 0],[W, H*.64]], '#2a2c30'); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let i=0;i<4;i++) poly(ctx, [[W*(.1 + i*.22), H*.64],[W*.5, 0],[W*(.16 + i*.22), H*.64]], 'rgba(0,0,0,.18)'); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(W*.5 - 1, 0, 2, H*.64); B4VB.lamp(ctx, W*.88, H*.12, T, 60, .4); ctx.fillStyle = '#5a5a4a'; ctx.fillRect(W*.3, H*.82, W*.4, H*.08); } // the tent, the blanket
    else if (ch === 5) { ctx.fillStyle = '#100c0a'; ctx.fillRect(0, 0, W, H*.64); for (let i=0;i<4;i++){ ell(ctx, W*(.08 + i*.12), H*.6, 18, 24, '#3a2a1a'); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(W*(.08 + i*.12) - 18, H*.52, 36, 2); } ctx.fillStyle = 'rgba(255,220,150,.3)'; ctx.fillRect(W*.7, H*.06, W*.16, 2); B4VB.fire(ctx, W*.84, H*.8, T, .3); B4VB.lamp(ctx, W*.84, H*.76, T, 50, .35); } // barrels, the trap's edge, the rushlight
    else if (ch === 6) { poly(ctx, [[0, H*.3],[W*.14, H*.28],[W*.3, H*.4],[W*.4, H*.64],[0, H*.64]], '#2a2a26'); for (let i=0;i<7;i++) B7VB.mark(ctx, W*(.03 + i*.03), H*(.3 + i*.01), 1, '#141418'); B7VB.grass(ctx, W, H*.66, H, 120, 'rgba(110,110,70,.5)', 0, T, 203); for (let i=0;i<6;i++) glow(ctx, W*(.6 + i*.05), H*.62, 8, '#ff9a50', .3); ctx.save(); ctx.translate(W*.5, H*.88); ctx.scale(1, .42); ctx.beginPath(); ctx.arc(0, 0, 22, 0, 7); ctx.fillStyle = '#4a5664'; ctx.fill(); ctx.strokeStyle = '#7a7a76'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); } // the ridge, the foreign fires, the shield
    else if (ch === 7) { B5VB.skyline(ctx, W, H*.6, '#0e0c0e', 204, 4, T); B7VB.smoke(ctx, W, H*.3, T, .4, 205); ctx.fillStyle = '#3a3630'; ctx.fillRect(W*.2, H*.8, W*.5, H*.06); B4VB.fire(ctx, W*.8, H*.84, T, .7); B4VB.lamp(ctx, W*.8, H*.8, T, 50, .35, '#ff9a50'); } // smoke, the step, the brazier
    if (tiles) B5VB.tile(ctx, W*.5, H*.88, 22, visReader().id !== 'perrit'); else B6VB.card(ctx, W*.5, H*.88);
    return {fx:W*.3, fy:H*.86, fs:2.4}; },
});

/* Tehol lies abed through b7v2; Fiddler kneels in the road through b7v3 */
{ const _df = drawFigure; drawFigure = function(ctx, kind, x, y, s, t, o = {}){
    if (kind === 'b7v_tehol' && VIS && VIS.id === 'b7v2' && o.lie == null) o = Object.assign({}, o, {lie:true, still:true});
    if (kind === 'b7v_fiddler' && VIS && VIS.id === 'b7v3' && o.kneel == null) o = Object.assign({}, o, {kneel:VIS.step <= 2});
    return _df(ctx, kind, x, y, s, t, o); }; }
