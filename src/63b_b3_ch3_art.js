/* ============ Book Three, Chapter 3 art: Capustan — the field by the walls, the city's streets, the dragon ============
   Figures (FIGX) in the ~32px frame of 18/47b/60d, lit from the left; the trampled field below the walls and the Capustan streets (TILEX);
   three backdrops (SCENEX): the walls and domes with smoke, the black dragon over the breaking army seen from far below, the Thrall at dusk;
   and the chapter's item pictures (ART['item/<key>']) on Book Three's cold ground. The grim parts are far off and in silhouette. */

/* ---------------- figures ---------------- */
const B3C3 = {
  /* a cutlass held in hand at (x, y), the blade swept toward angle a; short, broad, a little curved, a knuckle-bow */
  cutlass(ctx, x, y, a, len = 10.5){ ctx.save(); ctx.translate(x, y); ctx.rotate(a);
    ctx.beginPath(); ctx.moveTo(0, -.9); ctx.quadraticCurveTo(len*.6, -1.6, len, -.2); ctx.lineTo(len - 1.4, .9); ctx.quadraticCurveTo(len*.5, .9, 0, .9); ctx.closePath(); ctx.fillStyle = '#c8c4b8'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,250,.5)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(.6, -.6); ctx.quadraticCurveTo(len*.6, -1.3, len - .4, -.2); ctx.stroke();
    ctx.strokeStyle = '#8a7a4a'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(-.2, -1.6); ctx.quadraticCurveTo(-2.6, 0, -.2, 1.8); ctx.stroke(); // the knuckle-bow
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-2.8, -.6, 2.6, 1.2); ctx.restore(); },
  /* tiger stripes over a patch of skin: dark bars, slightly curved, across the long axis */
  stripes(ctx, x0, y0, w, hh, n, seed = 0){ ctx.strokeStyle = 'rgba(26,14,6,.85)'; ctx.lineWidth = .55; ctx.lineCap = 'round';
    for (let i=0;i<n;i++){ const y = y0 + (i + .5)*hh/n + (hash(i, seed) - .5)*.5, l = w*(.55 + hash(seed, i)*.4), s = x0 + (hash(i, seed + 1) > .5 ? 0 : w - l); ctx.beginPath(); ctx.moveTo(s, y); ctx.quadraticCurveTo(s + l/2, y + .6, s + l, y - .2); ctx.stroke(); } ctx.lineCap = 'butt'; },
};
Object.assign(FIGX, {
  /* Gruntle: a big caravan guard gone over to Trake — sleeveless leather, bare arms, the tiger's stripes come up on his skin and face; two cutlasses, held low and easy */
  b3_c3_gruntle(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.16, 1.14);
    const skin = '#b48654', skinD = '#7a5634';
    h.legs('#3a3026'); ctx.fillStyle = '#4a3624'; ctx.fillRect(-4.6, 9.2, 3.6, 3.8); ctx.fillRect(1, 9.2, 3.6, 3.8); // travel boots
    ctx.fillStyle = skinD; ctx.fillRect(-9.4, -5.6, 3, 9.6); B3C3.stripes(ctx, -9.4, -5, 3, 9, 5, 3); // the far arm, in shadow
    poly(ctx, [[-7,-6.4],[7,-6.4],[6.6,7.4],[-6.6,7.4]], h.armor('#7a5e3e', '#2a1e12')); // a sleeveless leather jerkin, sweat-dark
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-.3, -6, .6, 13); ctx.fillStyle = 'rgba(230,210,170,.18)'; for (let i=0;i<4;i++) ctx.fillRect(-.9, -4.6 + i*2.6, 1.8, .5); // laced up the front
    poly(ctx, [[-1.6,-6.4],[1.6,-6.4],[0,-3.6]], skin); B3C3.stripes(ctx, -1.2, -6.2, 2.4, 2.4, 2, 9); // a vee of striped chest
    ctx.fillStyle = '#2a1c10'; ctx.fillRect(-6.8, 3, 13.6, 1.5); ctx.fillStyle = '#9a8a5a'; ctx.fillRect(-1, 3, 2, 1.5); // belt, an old buckle
    ctx.fillStyle = '#2a1c10'; ctx.fillRect(-6, 4.4, 1.4, 3.6); ctx.fillRect(4.6, 4.4, 1.4, 3.6); // two empty scabbards
    ctx.fillStyle = skin; ctx.fillRect(6.4, -5.6, 3.2, 9.6); B3C3.stripes(ctx, 6.4, -5, 3.2, 9, 5, 5); // the near arm, bare, banded
    ell(ctx, 8, 4.4, 1.7, 1.6, skin); ell(ctx, -7.9, 4.4, 1.6, 1.5, skinD);
    B3C3.cutlass(ctx, 8, 4.4, 1.12, 8.4); B3C3.cutlass(ctx, -7.9, 4.4, 2.1, 7.8); // a cutlass in each hand, points down
    h.head(skin, 4.7, -11.4); h.look('rgba(30,18,6,.92)', -11.8); ctx.fillStyle = 'rgba(214,170,60,.9)'; ctx.fillRect(-.7, -11.8, .7, .6); ctx.fillRect(2.2, -11.8, .7, .6); // amber in the eyes
    ctx.strokeStyle = 'rgba(26,14,6,.8)'; ctx.lineWidth = .55; ctx.beginPath(); ctx.moveTo(-4.4, -12.6); ctx.lineTo(-2.4, -12); ctx.moveTo(-4.6, -10.4); ctx.lineTo(-2.6, -10); ctx.moveTo(4.2, -13); ctx.lineTo(3.2, -12.2); ctx.moveTo(4.6, -10.6); ctx.lineTo(3.6, -10.2); ctx.stroke(); // the stripes across his cheeks
    poly(ctx, [[-3.6,-9.4],[4.2,-9.4],[3.8,-7.2],[1.4,-6],[-1.4,-6.2],[-3.2,-7.4]], '#2a1c10'); // a short dark beard
    B2F.cap(ctx, '#1e140c', 4.8, -12.6, 1.02, 1.98); ctx.fillStyle = 'rgba(30,20,12,.7)'; ctx.fillRect(-4.7, -12.6, 1.2, 2.2); // hair cropped to the skull
    ctx.restore(); },

  /* Itkovian, Shield Anvil of the Grey Swords: grey plate, dented and smoke-dark, the grey surcoat in rags; bare-headed, drawn, and standing very straight,
     both hands on the pommel of the sword planted before him */
  b3_c3_itkovian(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.12);
    h.legs('#4a4a4c'); ctx.fillStyle = '#6a6a6a'; ctx.fillRect(-4.6, 5.4, 3.6, 5); ctx.fillRect(1, 5.4, 3.6, 5); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-4.6, 5.4, 1, 5); ctx.fillRect(1, 5.4, 1, 5); // greaves
    poly(ctx, [[-6.4,-6.4],[6.4,-6.4],[6,6],[-6,6]], h.armor('#a2a4a6', '#3c3e42')); // the breastplate
    ctx.fillStyle = 'rgba(0,0,0,.3)'; for (let i=0;i<3;i++) ctx.fillRect(-6, -1 + i*2.4, 12, .45); ctx.fillStyle = 'rgba(20,18,16,.45)'; [[-3.4, -3.6, 1.6], [2.6, 1, 1.2], [-1, 3.4, 1]].forEach(([x, y, r]) => ell(ctx, x, y, r, r*.7, 'rgba(20,18,16,.4)')); // lames; dents, soot
    poly(ctx, [[-4.4,-2],[4.4,-2],[5.4,11],[1.4,10.2],[0,11.6],[-1.6,10],[-5.4,11]], h.armor('#8e9092', '#3a3c3e')); ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(-.3, -1, .6, 11); // the grey surcoat, torn ragged at the hem
    ctx.fillStyle = 'rgba(60,40,30,.35)'; ctx.fillRect(-4, 6.6, 3, 1.2); ctx.fillRect(1.6, 8.4, 2.4, 1); // stains, not looked at
    ell(ctx, -6.6, -5.6, 2.8, 2.2, '#8a8c8e'); ell(ctx, 6.6, -5.6, 2.8, 2.2, '#5a5c60'); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(-8.4, -6.6, 2.4, .7); // pauldrons, square on the shoulders
    // the sword, planted point-down before him, both gauntlets on the pommel
    B2F.line(ctx, '#2a2420', 2.2, [[0, 1], [0, 12.6]]); B2F.line(ctx, '#c4c2ba', 1.4, [[0, 1], [0, 12.6]]); B2F.line(ctx, 'rgba(255,255,250,.45)', .4, [[-.3, 1.4], [-.3, 12.2]]);
    ctx.fillStyle = '#5a5248'; ctx.fillRect(-3.4, .2, 6.8, 1.1); ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-.7, -3.2, 1.4, 3.4);
    B2F.line(ctx, '#7a7c80', 2.4, [[-6.4, -4.6], [-2, -3.4]]); B2F.line(ctx, '#55575a', 2.4, [[6.4, -4.6], [2, -3.4]]); ell(ctx, 0, -3.6, 2.6, 1.6, '#6e7074'); ell(ctx, -.6, -4, 1.2, .6, 'rgba(255,255,255,.25)'); // arms in, the hands closed over the pommel
    h.head('#b8a08e', 4.1, -11.6); h.look('rgba(18,12,10,.9)', -11.9); ctx.fillStyle = 'rgba(40,30,40,.35)'; ctx.fillRect(-1.2, -10.8, 1.8, .6); ctx.fillRect(1.8, -10.8, 1.8, .6); // the eyes sunk, rings under them
    ctx.fillStyle = 'rgba(60,40,30,.3)'; ctx.fillRect(-3.4, -9.6, 1, 2.2); ctx.fillRect(3.2, -9.6, 1, 2.2); // the cheeks drawn in
    B2F.cap(ctx, '#4a3a2c', 4.3, -12.7, 1.04, 1.96); ctx.fillStyle = 'rgba(74,58,44,.6)'; ctx.fillRect(-4.2, -12.7, 1.2, 2); // cropped brown hair
    ctx.restore(); },

  /* a Capan townsman: a long tunic, a sash, a head-cloth or bare; a fire-bucket, a cudgel, or empty-handed. Colours vary in a crowd (o.phase) */
  b3_c3_capan(ctx, h, t, o){ ctx.save(); const k = Math.abs(Math.round((o.phase || 0)*7));
    const coat = [['#8a6a3e', '#3a2a16'], ['#5a6a6e', '#20282a'], ['#8a4a34', '#3a1a10'], ['#7a7a5a', '#2e2e1e']][k % 4], sash = ['#b8402a', '#c8a24a', '#3a5a7a', '#6a2a4a'][(k + 1) % 4], skin = ['#a8805a', '#b88c64', '#946c4a'][k % 3];
    B2F.grow(ctx, .96, .98);
    h.legs('#3a3026'); ctx.fillStyle = '#5a4630'; ctx.fillRect(-4.4, 11, 3.2, 2); ctx.fillRect(1.2, 11, 3.2, 2); // sandals
    poly(ctx, [[-5.8,-6],[5.8,-6],[6.8,9.6],[-6.8,9.6]], h.armor(coat[0], coat[1])); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(-6.4, 8.2, 12.8, 1.4); // the long tunic
    ctx.fillStyle = sash; ctx.fillRect(-5.8, 1.6, 11.6, 1.6); poly(ctx, [[-4.4, 3], [-3, 3], [-3.6, 7], [-5, 6.6]], sash); // a sash, its end hanging
    ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.fillRect(-5.8, -6, 11.6, 1); ctx.fillStyle = 'rgba(40,30,20,.3)'; ctx.fillRect(-2, 5, 3, 1.4); ctx.fillRect(2, -1, 1.6, 1.6); // soot, smears
    h.head(skin, 4.2, -11.4); h.look('rgba(22,14,8,.85)', -11.6);
    if (k % 3 === 0) B2F.cloth(ctx, '#d8ccb0', 'rgba(120,100,70,.6)'); else { B2F.cap(ctx, '#1a120c', 4.4, -12.6, 1, 2); if (k % 3 === 2) poly(ctx, [[-3.4,-9.2],[4,-9.2],[3.4,-6.6],[.6,-5.6],[-2.6,-6.8]], '#2a1c12'); } // a head-cloth, or black hair (and a beard)
    if (k % 2 === 0) { B2F.line(ctx, '#6a5a44', .6, [[5.6, -1], [8.6, 3.6], [11.6, -1]]); poly(ctx, [[7, 2.6], [10.4, 2.6], [9.8, 8], [7.6, 8]], h.armor('#7a6046', '#3a2a1a')); ctx.fillStyle = 'rgba(160,190,210,.6)'; ctx.fillRect(7.2, 2.6, 3, .6); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(7.4, 5, 2.8, .5); } // a leather fire-bucket
    else { B2F.line(ctx, '#5a3e24', 1.4, [[6.6, 4], [10.4, -7]]); ell(ctx, 10.6, -7.6, 1.2, 1.6, '#4a3220', .3); } // a cudgel
    ell(ctx, 6.6, 3.2, 1.3, 1.3, skin);
    ctx.restore(); },

  /* a Gidrath gate-soldier: the Prince's own; a domed helm with cheek-plates and a horsehair plume, a scale coat over a dark red tabard,
     a long spear and a tall oval shield with the city's gold dome on it */
  b3_c3_gidrath(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.06);
    B2F.line(ctx, '#5a3e24', 1.3, [[8.2, 13], [8.2, -21]]); poly(ctx, [[8.2, -26], [6.8, -20], [9.6, -20]], '#cfcac0'); ctx.fillStyle = '#7a1e1a'; ctx.fillRect(7.4, -20, 1.6, 1.4); // the spear, a red tassel under the head
    h.legs('#2e2622'); ctx.fillStyle = '#7a6a48'; ctx.fillRect(-4.6, 6, 3.6, 4.4); ctx.fillRect(1, 6, 3.6, 4.4); // bronzed greaves
    poly(ctx, [[-6,-6],[6,-6],[6.4,8.6],[-6.4,8.6]], h.armor('#8a2a22', '#341010')); // the dark red tabard
    poly(ctx, [[-6,-6],[6,-6],[5.6,3],[-5.6,3]], h.armor('#9a8a62', '#3a3020')); ctx.fillStyle = 'rgba(0,0,0,.28)'; for (let r=0;r<6;r++) for (let c=0;c<7;c++) ctx.fillRect(-5.4 + c*1.6 + (r%2)*.8, -5.2 + r*1.4, .9, .5); // scale over the chest
    ctx.fillStyle = '#2a1a12'; ctx.fillRect(-6, 2.8, 12, 1.3);
    ell(ctx, 7, 2.4, 1.3, 1.3, '#a07c5c');
    h.head('#a07c5c', 4.2, -11.2); h.look('rgba(20,12,8,.9)', -11.6);
    ctx.beginPath(); ctx.arc(0, -12.2, 5.1, Math.PI, 0); ctx.fillStyle = h.armor('#b8a46e', '#5a4a2a'); ctx.fill(); ctx.fillRect(-5.3, -12.6, 10.6, 1.4); // the domed helm, bronze
    poly(ctx, [[-5.2,-11.4],[-3.2,-11.4],[-3,-7.4],[-4.8,-7.8]], '#8a7a4c'); poly(ctx, [[3.2,-11.4],[5.2,-11.4],[4.8,-7.8],[3,-7.4]], '#6a5a34'); // cheek-plates
    ctx.fillStyle = '#d8cfa0'; ctx.fillRect(-.5, -18.4, 1, 1.4); for (let i=0;i<7;i++) B2F.line(ctx, i%2 ? '#5a1410' : '#8a2420', .8, [[0, -17.4], [-1.6 - i*.5, -18 + i*.3], [-4.6 - i*.4, -15.6 + i*.7]]); // the plume, falling back
    ctx.fillStyle = 'rgba(255,250,220,.3)'; ctx.fillRect(-3.4, -16, 2.6, .7);
    ctx.save(); ctx.translate(-6.8, .6); ell(ctx, 0, 0, 4.8, 7.6, h.armor('#7a2420', '#2a0c0a')); ctx.strokeStyle = '#a89058'; ctx.lineWidth = .9; ctx.beginPath(); ctx.ellipse(0, 0, 4.8, 7.6, 0, 0, 7); ctx.stroke(); // the tall oval shield
    ctx.fillStyle = '#c8a850'; ctx.beginPath(); ctx.arc(.2, .8, 2.2, Math.PI, 0); ctx.fill(); ctx.fillRect(-2, .8, 4.4, 1.6); ctx.fillRect(-.1, -2.8, .6, 1.4); ctx.restore(); // the gold dome of Capustan on it
    ctx.restore(); },
});

/* ---------------- ground ---------------- */
/* TILEX.b3_c3_field — the open ground below Capustan's walls, trampled flat by two armies.
   '.' trampled earth, ',' trodden grass, '#' earthwork and old siege-bank (blocks), 'x' broken stake-line, 'd' dropped kit (shields, a spear, a helm),
   's' a standard on its pole, 'F' fire, '=' a tent or a shelter, 'c' a cart, 'r' rubble from the walls, 'w' a well; anything else is earth with Book One's exit arrows.
   dark = dusk/night; fires light their neighbours either way. */
function b3c3Field(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y), fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const P = N ? {earth:'#26231f', earthL:'#34302a', grass:'#1e261c', blade:'rgba(70,84,64,.6)', bank:'#1e1b18', bankF:'#16130f', bankD:'#080706', post:'#1a140e', postL:'#3a2e22', lit:'190,200,220', rut:'rgba(0,0,0,.32)', ash:'rgba(10,10,12,.5)', metal:'#5a5c62', metalL:'#8a8c94'}
                  : {earth:'#6e604c', earthL:'#8a7a62', grass:'#5e6a3e', blade:'rgba(120,132,74,.75)', bank:'#5e5040', bankF:'#4a3e30', bankD:'#221a12', post:'#4a3624', postL:'#7a5e40', lit:'255,244,222', rut:'rgba(50,38,24,.32)', ash:'rgba(40,34,30,.35)', metal:'#8a8c90', metalL:'#d0d2d6'};
  const earth = () => { fill(shade(P.earth, (h - .5)*.05)); b2Mottle(ctx, x, y, T, N ? .03 : .07, N ? .22 : .16, P.lit, 1.2);
    ctx.strokeStyle = P.rut; ctx.lineWidth = Math.max(1, T*.025); for (let i=0;i<4;i++){ const sx = px + hash(x,y,i+3)*T, sy = py + hash(y,x,i+4)*T, a = hash(x,y,i+5)*6.28, l = T*(.08 + hash(x,y,i+6)*.1); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + Math.cos(a)*l, sy + Math.sin(a)*l*.6 + T*.03, sx + Math.cos(a)*l*2, sy + Math.sin(a)*l); ctx.stroke(); } // churn: boot-heels, hooves, every way at once
    if (h > .55) b2Prints(ctx, x, y, T, 2 + Math.floor(hash(x,y,9)*3), N);
    if (hash(x,y,11) > .78) { ell(ctx, px + T*(.3 + hash(x,y,12)*.4), py + T*(.4 + hash(x,y,13)*.3), T*.2, T*.07, N ? '#101216' : '#3e3a34'); ctx.fillStyle = N ? 'rgba(150,170,200,.14)' : 'rgba(200,210,220,.3)'; ctx.fillRect(px + T*(.22 + hash(x,y,12)*.4), py + T*(.38 + hash(x,y,13)*.3), T*.12, 1); } // a hoof-pool with sky in it
    if (hash(x,y,14) > .82) b2Soft(ctx, px + T*(.3 + hash(x,y,15)*.4), py + T*(.3 + hash(x,y,16)*.4), T*.3, .7, N ? '0,0,0' : '30,26,22', .35); // a scorch, an old fire's ground
    ctx.fillStyle = N ? '#14120f' : '#4a3e30'; for (let i=0;i<4;i++) ctx.fillRect(px + hash(x,y,i+20)*T, py + hash(y,x,i+21)*T, Math.max(1, T*.035), Math.max(1, T*.03)); };
  const grass = () => { earth(); b2Soft(ctx, px + T*.5, py + T*.5, T*.62, .8, N ? '30,38,28' : '94,106,62', .45);
    ctx.strokeStyle = P.blade; ctx.lineWidth = Math.max(1, T*.022); for (let i=0;i<10;i++){ const gx = px + hash(x,y,i+30)*T, gy = py + T*(.15 + hash(y,x,i+31)*.8), l = T*(.04 + hash(x,y,i+32)*.06), lean = (hash(x,y,i+33) - .5)*T*.12; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + lean, gy - l); ctx.stroke(); } }; // grass trodden flat, lying every way
  if (ch === '#') { // an earthwork: the besiegers' old bank, packed earth with a cut face and stakes along the top
    const face = b2Tile(x, y + 1) !== '#', fy = py + (face ? T*.5 : T);
    fill(shade(P.bank, (h - .5)*.05)); b2Mottle(ctx, x, y, T, N ? .02 : .06, .18, P.lit, 1);
    ctx.strokeStyle = N ? 'rgba(0,0,0,.25)' : 'rgba(70,50,30,.3)'; ctx.lineWidth = 1; for (let i=0;i<4;i++){ const sx = px + hash(x,y,i+60)*T, sy = py + hash(y,x,i+61)*(fy - py); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + T*.14, sy + T*.01); ctx.stroke(); } // spade-marks
    if (b2Tile(x, y - 1) !== '#') { ctx.fillStyle = N ? 'rgba(150,160,200,.08)' : 'rgba(255,246,220,.2)'; ctx.fillRect(px, py, T, T*.06); }
    if (b2Tile(x - 1, y) !== '#') { ctx.fillStyle = N ? 'rgba(150,160,200,.05)' : 'rgba(255,246,220,.12)'; ctx.fillRect(px, py, T*.05, fy - py); } if (b2Tile(x + 1, y) !== '#') { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(px + T*.95, py, T*.05, fy - py); }
    if (face) { ctx.fillStyle = vgrad(ctx, fy, py + T, [[0, P.bankF], [1, P.bankD]]); ctx.fillRect(px, fy, T, py + T - fy);
      for (let i=0;i<3;i++){ ctx.fillStyle = N ? 'rgba(0,0,0,.25)' : `rgba(${i%2 ? '40,26,14' : '150,120,84'},.25)`; ctx.fillRect(px, fy + T*(.08 + i*.13), T, Math.max(1, T*.03)); }
      ctx.strokeStyle = N ? 'rgba(150,160,200,.12)' : 'rgba(255,240,200,.28)'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(px, fy); ctx.lineTo(px + T, fy); ctx.stroke();
      for (let i=0;i<2;i++){ const sx = px + T*(.22 + i*.46 + hash(x,y,i+68)*.1); B2F.line(ctx, P.post, Math.max(1.2, T*.035), [[sx, fy + T*.16], [sx + T*.1, fy - T*.04]]); poly(ctx, [[sx + T*.08, fy - T*.02],[sx + T*.14, fy - T*.1],[sx + T*.12, fy]], N ? '#4a4038' : '#a08a62'); } } // stakes, angled out
    return; }
  if (ch === ',') grass(); else earth();
  if (ch === 'x') { // a stake-line knocked flat: posts snapped and leaning, one still standing
    for (let i=0;i<3;i++){ const sx = px + T*(.18 + i*.3 + hash(x,y,i+40)*.06), by = py + T*(.7 + hash(x,y,i+41)*.12), lean = (i === 1 ? -.1 : 1) * (.5 + hash(x,y,i+42)*.6), l = T*(.3 + (i === 1 ? .2 : 0)); const ex = sx + Math.sin(lean)*l, ey = by - Math.cos(lean)*l;
      ell(ctx, (sx + ex)/2 + T*.06, by + T*.04, l*.5, T*.04, 'rgba(0,0,0,.35)'); B2F.line(ctx, P.post, Math.max(1.6, T*.06), [[sx, by], [ex, ey]]); B2F.line(ctx, P.postL, Math.max(1, T*.02), [[sx - T*.015, by], [ex - T*.015, ey]]); poly(ctx, [[ex - T*.03, ey], [ex + Math.sin(lean)*T*.08, ey - Math.cos(lean)*T*.08], [ex + T*.03, ey]], N ? '#4a4038' : '#a08a62'); }
    B2F.line(ctx, N ? 'rgba(90,80,60,.4)' : 'rgba(120,100,70,.6)', 1, [[px, py + T*.55], [px + T*.4, py + T*.62], [px + T, py + T*.5]]); } // a slack withy
  else if (ch === 'd') { // what men drop when they run: a round shield face-down, a spear, a helm
    const cx = px + T*(.36 + hash(x,y,50)*.1), cy = py + T*(.46 + hash(x,y,51)*.1); ell(ctx, cx + T*.04, cy + T*.05, T*.2, T*.08, 'rgba(0,0,0,.35)'); ell(ctx, cx, cy, T*.19, T*.12, N ? '#2e2a24' : '#6a5a44'); ell(ctx, cx, cy, T*.16, T*.095, N ? '#3a342c' : '#8a7458'); ell(ctx, cx, cy - T*.01, T*.04, T*.025, P.metal); // a shield, its back up
    B2F.line(ctx, P.post, Math.max(1.2, T*.03), [[px + T*.08, py + T*.82], [px + T*.9, py + T*.66]]); poly(ctx, [[px + T*.9, py + T*.62], [px + T*.98, py + T*.64], [px + T*.9, py + T*.7]], P.metalL); // a spear across the ground
    if (h > .4) { const hx = px + T*.72, hy = py + T*.36; ell(ctx, hx + T*.03, hy + T*.05, T*.1, T*.04, 'rgba(0,0,0,.35)'); ctx.beginPath(); ctx.arc(hx, hy + T*.04, T*.085, Math.PI, 0); ctx.fillStyle = P.metal; ctx.fill(); ctx.fillStyle = P.metalL; ctx.fillRect(hx - T*.06, hy - T*.02, T*.03, T*.02); } } // a helm, on its side
  else if (ch === 's') { const cx = px + T*.44; ell(ctx, cx, py + T*.9, T*.16, T*.05, 'rgba(0,0,0,.4)'); ctx.fillStyle = P.post; ctx.fillRect(cx - T*.025, py + T*.02, T*.05, T*.88); ell(ctx, cx, py + T*.03, T*.04, T*.04, '#8d8a86');
    poly(ctx, [[cx + T*.025, py + T*.08], [cx + T*.46, py + T*.1], [cx + T*.38, py + T*.24], [cx + T*.46, py + T*.38], [cx + T*.025, py + T*.36]], N ? '#1e1e24' : '#3e3a36'); ell(ctx, cx + T*.2, py + T*.22, T*.06, T*.06, N ? 'rgba(200,180,140,.25)' : 'rgba(200,186,150,.6)'); } // the Host's standard, dark, swallow-tailed
  else if (ch === 'F') b2Flames(ctx, px + T*.5, py + T*.62, T, 1.05);
  else if (ch === '=') b2Tent(ctx, px, py, T, N, x, y);
  else if (ch === 'c') b2Wagon(ctx, px, py, T, N);
  else if (ch === 'r') { for (let i=0;i<5;i++){ const bx = px + T*(.1 + hash(x,y,i+40)*.7), by = py + T*(.2 + hash(x,y,i+41)*.6), w = T*(.12 + hash(x,y,i+42)*.18), hh = w*.6; ell(ctx, bx + w*.5, by + hh + T*.02, w*.6, hh*.3, 'rgba(0,0,0,.35)'); ctx.fillStyle = N ? '#3e3a34' : '#a89a80'; ctx.fillRect(bx, by, w, hh); ctx.fillStyle = N ? '#4e4a42' : '#c8baa0'; ctx.fillRect(bx, by, w, hh*.3); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; ctx.strokeRect(bx, by, w, hh); } } // dressed stone thrown down from the walls
  else if (ch === 'w') b3c3Well(ctx, px, py, T, N);
  else if (ch !== '.' && ch !== ',') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .3 : .12, N ? 3.4 : 2.4);
}
/* a well: a stone ring with a timber frame and a bucket */
function b3c3Well(ctx, px, py, T, N){ const cx = px + T*.5, cy = py + T*.58;
  ell(ctx, cx + T*.05, cy + T*.1, T*.34, T*.14, 'rgba(0,0,0,.4)'); ell(ctx, cx, cy, T*.3, T*.18, N ? '#3a3732' : '#9a9080'); ell(ctx, cx, cy - T*.02, T*.2, T*.11, N ? '#06080a' : '#141a1c'); ell(ctx, cx - T*.04, cy - T*.03, T*.07, T*.03, N ? 'rgba(140,160,200,.2)' : 'rgba(180,200,210,.35)');
  ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; for (let i=0;i<8;i++){ const a = i/8*6.28; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a)*T*.2, cy + Math.sin(a)*T*.11); ctx.lineTo(cx + Math.cos(a)*T*.3, cy + Math.sin(a)*T*.18); ctx.stroke(); }
  const post = N ? '#2a2018' : '#5a4028'; ctx.fillStyle = post; ctx.fillRect(cx - T*.3, cy - T*.42, T*.05, T*.42); ctx.fillRect(cx + T*.25, cy - T*.42, T*.05, T*.42); ctx.fillRect(cx - T*.32, cy - T*.44, T*.64, T*.05);
  B2F.line(ctx, N ? 'rgba(120,110,90,.5)' : '#8a7a5a', 1, [[cx + T*.04, cy - T*.4], [cx + T*.04, cy - T*.16]]); ctx.fillStyle = N ? '#3a2e22' : '#7a5a3a'; ctx.fillRect(cx - T*.02, cy - T*.18, T*.12, T*.1); }

/* TILEX.b3_c3_city — Capustan's streets after the siege: pale paving, rubble, house walls of whitewashed stone, fires still going.
   '.' paving, ',' rubble, '#' wall (blocks), 'F' fire (blocks), 'D' door, '=' awning, 'w' well, 'c' cart, 't' temple step; anything else is paving with exit arrows. */
function b3c3City(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y), fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const P = N ? {pave:'#2e2c2a', paveL:'#3a3834', joint:'rgba(0,0,0,.45)', wall:'#3a3632', wallL:'#4a4640', wallD:'#1a1816', roof:'#3a2420', roofL:'#4a3028', door:'#1e140e', doorL:'#3a2a1c', awn:['#3a2422', '#2a3236', '#3a3420'], lit:'190,200,220', soot:'rgba(0,0,0,.55)', stone:'#3e3a34', stoneL:'#4e4a42', step:'#3e3c38', stepL:'#54524c'}
                  : {pave:'#aa9c84', paveL:'#c8baa2', joint:'rgba(60,50,40,.4)', wall:'#cfc4ae', wallL:'#e6dcc6', wallD:'#8a7e68', roof:'#9a5a3a', roofL:'#b87050', door:'#4a3220', doorL:'#7a5a3a', awn:['#a8402a', '#3a6a7a', '#c8a24a'], lit:'255,246,226', soot:'rgba(30,24,20,.5)', stone:'#a89a80', stoneL:'#c8baa0', step:'#b8b0a0', stepL:'#d8d0c0'};
  const pave = () => { fill(shade(P.pave, (h - .5)*.05)); const rows = 3, off = (y % 2)*.5; ctx.strokeStyle = P.joint; ctx.lineWidth = Math.max(1, T*.02); // big worn flags, in courses
    for (let r=0;r<rows;r++){ const yy = py + r*T/rows; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); ctx.stroke(); const n = 2; for (let c=0;c<=n;c++){ const xx = px + ((c + off + (r%2)*.5) % n)/n*T; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx, yy + T/rows); ctx.stroke(); } }
    for (let i=0;i<3;i++){ const fx = px + hash(x,y,i+3)*T*.8, fy = py + hash(y,x,i+4)*T*.8; ctx.fillStyle = hash(x,y,i+5) > .5 ? `rgba(${P.lit},${N ? .04 : .12})` : 'rgba(0,0,0,.08)'; ctx.fillRect(fx, fy, T*.3, T/rows - 2); } // one flag paler, one darker
    b2Mottle(ctx, x, y, T, N ? .02 : .06, N ? .2 : .12, P.lit, 1);
    if (hash(x,y,8) > .8) b2Soft(ctx, px + T*(.3 + hash(x,y,9)*.4), py + T*(.3 + hash(x,y,10)*.4), T*.34, .7, N ? '0,0,0' : '30,26,22', .4); // soot from something that burned here
    if (hash(x,y,12) > .7) for (let i=0;i<3;i++) ell(ctx, px + T*(.2 + hash(x,y,i+13)*.6), py + T*(.2 + hash(y,x,i+14)*.6), T*.03, T*.022, N ? '#4a4640' : '#8a8070'); }; // grit
  if (ch === '#') { // a house wall: whitewashed stone, a tiled roof edge where it meets the street, soot up its face
    const face = b2Tile(x, y + 1) !== '#' && b2Tile(x, y + 1) !== 'D', fy = py + (face ? T*.42 : T);
    fill(shade(P.roof, (h - .5)*.06)); // the roofs, seen from above
    ctx.strokeStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(80,40,24,.4)'; ctx.lineWidth = Math.max(1, T*.025); for (let i=1;i<5;i++){ ctx.beginPath(); ctx.moveTo(px, py + i*T/5); ctx.lineTo(px + T, py + i*T/5); ctx.stroke(); } // tile courses
    for (let r=0;r<5;r++) for (let c=0;c<4;c++) { const tx = px + (c + (r%2)*.5)*T/4, ty = py + r*T/5; ctx.fillStyle = (hash(x*7 + c, y*5 + r) > .5) ? P.roofL : 'rgba(0,0,0,.1)'; ctx.fillRect(tx + 1, ty + 1, T/4 - 3, T/5 - 3); } // the curved tiles
    if (h > .93 && !N) { ctx.fillStyle = 'rgba(20,14,10,.6)'; ell(ctx, px + T*.5, py + T*.3, T*.22, T*.14, 'rgba(20,14,10,.55)'); } // a hole burnt through
    if (b2Tile(x, y - 1) !== '#') { ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(px, py, T, T*.05); }
    if (face) { ctx.fillStyle = vgrad(ctx, fy, py + T, [[0, P.wallL], [.5, P.wall], [1, P.wallD]]); ctx.fillRect(px, fy, T, py + T - fy);
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px, fy, T, Math.max(1, T*.04)); // the eave's shadow
      ctx.strokeStyle = N ? 'rgba(0,0,0,.2)' : 'rgba(120,100,80,.25)'; ctx.lineWidth = 1; for (let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(px, fy + T*(.14 + i*.14)); ctx.lineTo(px + T, fy + T*(.14 + i*.14)); ctx.stroke(); } // stone courses under the lime
      if (hash(x,y,20) > .5) { const wx = px + T*(.3 + hash(x,y,21)*.3); ctx.fillStyle = N ? '#0a0806' : '#2a2018'; ctx.fillRect(wx, fy + T*.12, T*.16, T*.2); ctx.fillStyle = N ? '#3a2a1c' : '#6a4a2c'; ctx.fillRect(wx - T*.03, fy + T*.12, T*.03, T*.2); ctx.fillRect(wx + T*.16, fy + T*.12, T*.03, T*.2); } // a shuttered window
      if (hash(x,y,22) > .55) { const g = ctx.createLinearGradient(0, py + T, 0, fy); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, P.soot); ctx.fillStyle = g; ctx.beginPath(); const sx = px + T*hash(x,y,23)*.6; ctx.moveTo(sx, py + T); ctx.quadraticCurveTo(sx + T*.1, fy + T*.2, sx + T*.2, fy); ctx.lineTo(sx + T*.5, fy); ctx.quadraticCurveTo(sx + T*.4, fy + T*.3, sx + T*.3, py + T); ctx.fill(); } // soot licked up the wall from a fire below
      ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(px, py + T - Math.max(1, T*.03), T, Math.max(1, T*.03)); }
    if (b2Tile(x - 1, y) !== '#' && b2Tile(x - 1, y) !== 'D') { ctx.fillStyle = N ? 'rgba(150,160,200,.06)' : 'rgba(255,246,220,.15)'; ctx.fillRect(px, py, T*.05, T); } if (b2Tile(x + 1, y) !== '#' && b2Tile(x + 1, y) !== 'D') { ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(px + T*.95, py, T*.05, T); }
    return; }
  if (ch === 'D') { // a door in a house wall: the wall face continued, a heavy door in it, iron-studded, the step worn
    const above = b2Tile(x, y - 1) === '#';
    if (above) { pave(); ctx.fillStyle = vgrad(ctx, py, py + T, [[0, P.wallL], [.5, P.wall], [1, P.wallD]]); ctx.fillRect(px, py, T, T*.82); } else pave();
    const dx = px + T*.24, dw = T*.52, dt = py + T*.12; ctx.fillStyle = N ? '#0c0806' : '#2a1c12'; ctx.fillRect(dx - T*.04, dt - T*.04, dw + T*.08, T*.76); ctx.beginPath(); ctx.arc(dx + dw/2, dt + T*.04, dw/2 + T*.04, Math.PI, 0); ctx.fill(); // the arch
    ctx.fillStyle = vgrad(ctx, dt, dt + T*.7, [[0, P.doorL], [1, P.door]]); ctx.fillRect(dx, dt + T*.04, dw, T*.66); ctx.beginPath(); ctx.arc(dx + dw/2, dt + T*.04, dw/2, Math.PI, 0); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 1; for (let i=1;i<4;i++){ ctx.beginPath(); ctx.moveTo(dx + i*dw/4, dt - T*.1); ctx.lineTo(dx + i*dw/4, dt + T*.7); ctx.stroke(); } // planks
    ctx.fillStyle = N ? '#5a5650' : '#2a2620'; for (let r=0;r<3;r++) for (let c=0;c<3;c++) ctx.fillRect(dx + T*(.08 + c*.16), dt + T*(.12 + r*.2), Math.max(1, T*.03), Math.max(1, T*.03)); // studs
    ctx.fillStyle = N ? '#3a3834' : '#a89e8c'; ctx.fillRect(dx - T*.08, py + T*.82, dw + T*.16, T*.08); return; }
  if (ch === 'F') { // a house still burning: the wall's footing, timbers fallen in, flames
    pave(); b2Firelit(ctx, x, y, T, N ? .32 : .14, N ? 3.4 : 2.6); b2Soft(ctx, px + T*.5, py + T*.56, T*.46, .8, N ? '6,4,3' : '24,18,14', .9); ell(ctx, px + T*.5, py + T*.6, T*.36, T*.28, N ? '#0a0706' : '#1e1612');
    for (let i=0;i<4;i++){ const bx = px + T*(.1 + hash(x,y,i+30)*.6), by = py + T*(.3 + hash(x,y,i+31)*.5); B2F.line(ctx, '#140a06', Math.max(2, T*.07), [[bx, by], [bx + T*(.2 + hash(x,y,i+32)*.2), by - T*(.1 + hash(x,y,i+33)*.2)]]); } // charred beams
    b2Flames(ctx, px + T*.5, py + T*.68, T, 1.0); b2Flames(ctx, px + T*.3, py + T*.5, T, .62); return; }
  if (ch === ',') { pave(); // rubble: fallen stone, roof-tile shards, a beam
    for (let i=0;i<6;i++){ const bx = px + T*(.08 + hash(x,y,i+40)*.7), by = py + T*(.12 + hash(x,y,i+41)*.7), w = T*(.1 + hash(x,y,i+42)*.18), hh = w*.62; ell(ctx, bx + w*.5, by + hh + T*.02, w*.6, hh*.3, 'rgba(0,0,0,.35)'); ctx.fillStyle = i%3 === 2 ? P.roof : P.stone; ctx.fillRect(bx, by, w, hh); ctx.fillStyle = i%3 === 2 ? P.roofL : P.stoneL; ctx.fillRect(bx, by, w, hh*.3); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 1; ctx.strokeRect(bx, by, w, hh); }
    if (h > .5) B2F.line(ctx, N ? '#1a120c' : '#3a2a1c', Math.max(1.6, T*.06), [[px + T*.1, py + T*.8], [px + T*.8, py + T*.6]]);
    b2Firelit(ctx, x, y, T, N ? .32 : .14, 3); return; }
  pave();
  if (ch === '=') { // a market awning over the street: striped cloth on poles, torn
    const col = P.awn[Math.floor(h*3) % 3]; ell(ctx, px + T*.55, py + T*.82, T*.48, T*.1, 'rgba(0,0,0,.3)');
    ctx.fillStyle = N ? '#2a2018' : '#5a4028'; ctx.fillRect(px + T*.06, py + T*.18, T*.05, T*.66); ctx.fillRect(px + T*.89, py + T*.18, T*.05, T*.66);
    poly(ctx, [[px + T*.02, py + T*.2], [px + T*.98, py + T*.16], [px + T*.98, py + T*.5], [px + T*.6, py + T*.56], [px + T*.5, py + T*.46], [px + T*.4, py + T*.58], [px + T*.02, py + T*.54]], col);
    ctx.fillStyle = N ? 'rgba(160,160,170,.12)' : 'rgba(240,230,210,.6)'; for (let i=0;i<4;i++) ctx.fillRect(px + T*(.08 + i*.24), py + T*.18, T*.1, T*.34); // stripes
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(px + T*.02, py + T*.46, T*.96, T*.06); }
  else if (ch === 'w') b3c3Well(ctx, px, py, T, N);
  else if (ch === 'c') b2Wagon(ctx, px, py, T, N);
  else if (ch === 't') { // a temple's steps: three broad pale treads rising away, a bronze lamp-stand beside them
    for (let i=0;i<3;i++){ const ty = py + T*(.68 - i*.26); ctx.fillStyle = shade(P.step, -i*.03); ctx.fillRect(px, ty, T, T*.24); ctx.fillStyle = P.stepL; ctx.fillRect(px, ty, T, Math.max(1, T*.04)); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(px, ty + T*.2, T, Math.max(1, T*.04)); }
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(px + T*.4, py, T*.2, T); // worn in the middle
    if (h > .5) { const lx = px + T*.86; ctx.fillStyle = N ? '#4a3e28' : '#8a6a32'; ctx.fillRect(lx - T*.015, py + T*.3, T*.03, T*.6); ell(ctx, lx, py + T*.3, T*.06, T*.025, N ? '#6a5a3a' : '#b8903e'); if (N) glow(ctx, lx, py + T*.26, T*.3, '#ffb060', .35); } }
  else if (ch !== '.') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .32 : .14, N ? 3.4 : 2.6);
}
TILEX.b3_c3_field = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c3Field(ctx, ch, x, y, T, !!dark));
TILEX.b3_c3_field_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c3Field(ctx, ch, x, y, T, true));
TILEX.b3_c3_city = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c3City(ctx, ch, x, y, T, !!dark));
TILEX.b3_c3_city_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c3City(ctx, ch, x, y, T, true));

/* ---------------- backdrops ---------------- */
/* Capustan's skyline at scale s along a baseline: a curtain wall with square towers, and behind it the temple domes crowded together (gilt, green
   copper, blue tile), the Thrall's old bulk, a few spires. Returns the fires' places (for smoke and glow). lit: 0 day-haze, 1 dusk. */
function b3c3Skyline(x, W, base, s, seed, cols, opt = {}){ const fires = [], wallH = 16*s, dome = (cx, by, r, c, rib) => {
    x.fillStyle = c[1]; x.fillRect(cx - r*.92, by - r*.5, r*1.84, r*.5 + 1); // the drum
    x.beginPath(); x.ellipse(cx, by - r*.5, r, r*1.08, 0, Math.PI, 0); x.fillStyle = c[0]; x.fill();
    const g = x.createLinearGradient(cx - r, 0, cx + r, 0); g.addColorStop(0, 'rgba(255,240,210,' + (.22*(opt.light ?? 1)) + ')'); g.addColorStop(.45, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.35)'); x.fillStyle = g; x.beginPath(); x.ellipse(cx, by - r*.5, r, r*1.08, 0, Math.PI, 0); x.fill();
    if (rib && r > 5) { x.strokeStyle = 'rgba(0,0,0,.25)'; x.lineWidth = .6; for (let k=-2;k<=2;k++){ x.beginPath(); x.moveTo(cx + k*r*.36, by - r*.5); x.quadraticCurveTo(cx + k*r*.2, by - r*1.3, cx, by - r*1.58); x.stroke(); } }
    x.fillStyle = c[0]; x.fillRect(cx - .5*s, by - r*1.58 - 4*s, 1*s, 4*s); }; // its finial
  // behind the wall: the domes and towers, back to front
  for (let row=0; row<2; row++){ let px = -20; let i = 0; while (px < W + 20) { const k = hash(i, seed + row*7), w = (18 + k*30)*s, bh = (10 + hash(seed, i + row*13)*22)*s*(row ? .8 : 1.15), by = base - wallH*.6 - (row ? 0 : 6*s);
      x.fillStyle = cols.mass[row]; x.fillRect(px, by - bh, w, bh + wallH);
      if (k > .5) dome(px + w/2, by - bh, w*.36, cols.dome[Math.floor(hash(i, seed + 3)*cols.dome.length)], true);
      else if (k < .12) { x.fillStyle = cols.mass[row]; x.fillRect(px + w*.4, by - bh - 30*s, w*.2, 30*s); x.beginPath(); x.moveTo(px + w*.38, by - bh - 30*s); x.lineTo(px + w*.5, by - bh - 42*s); x.lineTo(px + w*.62, by - bh - 30*s); x.fill(); } // a spire
      if (opt.windows && hash(i, seed, row + 9) > .55) { x.fillStyle = rgba('#ffa050', .4 + hash(i, seed, 5)*.4); x.fillRect(px + w*(.3 + hash(i, seed, 6)*.3), by - bh*(.3 + hash(i, seed, 7)*.4), 1.4*s, 2*s); }
      if (hash(i, seed, row + 20) > .8) fires.push([px + w/2, by - bh*.6, s]);
      px += w - 3*s; i++; } }
  // the Thrall: an old square keep, bigger than anything else, a great flattened dome on it
  if (opt.thrall != null) { const tx = opt.thrall, tw = 70*s, th = 46*s; x.fillStyle = cols.mass[1]; x.fillRect(tx - tw/2, base - wallH - th, tw, th + wallH); [[-1], [1]].forEach(([d]) => x.fillRect(tx + d*tw/2 - (d > 0 ? 12*s : 0), base - wallH - th - 14*s, 12*s, th + 14*s));
    dome(tx, base - wallH - th, 22*s, cols.dome[0], true); }
  // the curtain wall: square towers, crenellations, the gate
  x.fillStyle = cols.wall; x.fillRect(-10, base - wallH, W + 20, wallH + 2);
  for (let px=-10; px<W + 10; px+=3.4*s) x.fillRect(px, base - wallH - 2.4*s, 2*s, 2.4*s);
  for (let i=0, px=-8; px<W + 10; i++, px+=(60 + hash(i, seed + 40)*50)*s){ x.fillStyle = cols.tower || cols.wall; x.fillRect(px, base - wallH - 9*s, 13*s, wallH + 9*s); for (let j=0;j<4;j++) x.fillRect(px + j*3.6*s, base - wallH - 11.4*s, 2.2*s, 2.4*s);
    x.fillStyle = cols.wallLit; x.fillRect(px, base - wallH - 9*s, 3.4*s, wallH + 9*s); x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(px + 10*s, base - wallH - 9*s, 3*s, wallH + 9*s); x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(px + 5.6*s, base - wallH - 4*s, 1.4*s, 3*s); }
  x.fillStyle = cols.wallLit; x.fillRect(-10, base - wallH, W + 20, 1.2*s);
  if (opt.gate != null) { const gx = opt.gate; x.fillStyle = cols.wall; x.fillRect(gx - 16*s, base - wallH - 14*s, 32*s, wallH + 14*s); x.fillStyle = '#0a0806'; x.beginPath(); x.moveTo(gx - 6*s, base); x.lineTo(gx - 6*s, base - 8*s); x.arc(gx, base - 8*s, 6*s, Math.PI, 0); x.lineTo(gx + 6*s, base); x.fill(); }
  return fires; }
/* a column of smoke from (sx, sy), leaning downwind; puffs drift up it with time */
function b3c3Smoke(ctx, sx, sy, s, t, mo, i, col, a, lean = 1){ for (let j=0;j<14;j++){ const k = ((j/14 + t*mo/26000 + hash(i, 5)*.7) % 1), y = sy - k*150*s, xx = sx + lean*Math.pow(k, 1.6)*110*s + Math.sin(k*6 + i)*6*s, r = (6 + k*34)*s; glow(ctx, xx, y, r, col, a*(1 - k)*Math.min(1, k*6)); } }

SCENEX.b3_c3_walls = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.62, s = Math.max(.75, Math.min(1.25, W/700));
  let fires = [];
  ctx.drawImage(sceneLayer('b3c3:walls', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0, '#4a4a52'], [.4, '#7a6e64'], [.8, '#b89a76'], [1, '#c8a880']]); x.fillRect(0, 0, W, hz + 2); // late afternoon through the smoke: brown-gold, low
    glow(x, W*.82, hz - H*.16, W*.4, '#ffd8a0', .4); ell(x, W*.82, hz - H*.16, 8, 8, 'rgba(255,236,200,.85)'); // the sun, a disc through haze
    for (let i=0;i<4;i++) cloud(x, W*(.1 + i*.27), H*(.1 + hash(i, 4)*.12), W*.34, 6, '#2a2624', .14); // smoke lying over the city in a flat shelf
    x.fillStyle = 'rgba(160,140,120,.35)'; x.fillRect(0, hz - H*.2, W, H*.2);
    b3c3Skyline(x, W, hz - H*.06, s*.62, 31, {mass:['#7e6e60', '#8c7c6c'], dome:[['#a49070', '#7e6e5c']], wall:'#8a7a68', wallLit:'#a8987e'}, {light:.4}); // the far side of the city, hazed
    fires = b3c3Skyline(x, W, hz, s, 7, {mass:['#4a3e36', '#5a4c40'], dome:[['#9a8452', '#5e5034'], ['#587a70', '#36504a'], ['#55667a', '#323e50'], ['#7e665a', '#544238']], wall:'#6a5c4c', wallLit:'rgba(255,226,180,.22)', tower:'#4a4036'}, {thrall: W*.62, gate: W*.3});
    x.fillStyle = vgrad(x, hz - 90*s, hz, [[0, 'rgba(180,150,116,.0)'], [.6, 'rgba(180,150,116,.16)'], [1, 'rgba(200,170,130,.3)']]); x.fillRect(0, hz - 90*s, W, 90*s); // haze, thickening at the foot of the walls
    // the field before the walls: trampled, scarred with the besiegers' trenches, a wrecked siege tower, ladders still against the wall
    x.fillStyle = vgrad(x, hz, H, [[0, '#7a6a54'], [.3, '#5e5040'], [1, '#2a2218']]); x.fillRect(0, hz, W, H - hz);
    for (let i=0;i<6;i++){ const y = hz + H*(.04 + i*.06), w = W*(.3 + hash(i, 61)*.5); x.fillStyle = 'rgba(30,22,14,.35)'; x.fillRect(hash(i, 62)*W - w*.3, y, w, 1.4 + i*.5); x.fillStyle = 'rgba(220,190,150,.12)'; x.fillRect(hash(i, 62)*W - w*.3, y - 1, w, 1); } // trench lines
    for (let i=0;i<5;i++){ const lx = W*(.08 + i*.2 + hash(i, 63)*.06); x.strokeStyle = 'rgba(40,30,20,.7)'; x.lineWidth = 1; x.beginPath(); x.moveTo(lx, hz + 2); x.lineTo(lx + 5*s, hz - 15*s); x.moveTo(lx + 3*s, hz + 2); x.lineTo(lx + 8*s, hz - 15*s); x.stroke(); } // ladders against the wall
    { const sx = W*.47, sy = hz + H*.08; x.fillStyle = '#1e1610'; poly(x, [[sx - 10*s, sy], [sx - 6*s, sy - 44*s], [sx + 9*s, sy - 38*s], [sx + 13*s, sy]], '#1e1610'); x.strokeStyle = '#1e1610'; x.lineWidth = 1.4; for (let j=0;j<4;j++){ x.beginPath(); x.moveTo(sx + 9*s - j*2, sy - 38*s + j*9*s); x.lineTo(sx + 22*s - j*2, sy - 30*s + j*9*s); x.stroke(); } } // a siege tower, burnt and broken-backed
    for (let i=0;i<160;i++){ const d = Math.pow(hash(i, 71), .8), y = hz + 4 + d*(H - hz)*.9, px = hash(i, 72)*W; x.fillStyle = `rgba(30,22,16,${.25 + d*.3})`; x.fillRect(px, y, 1 + d*3, .8 + d*1.2); } // debris, ruts, the ground's litter
    // the near foreground: the allies' own line, dark, and a broken stake-row
    x.fillStyle = '#1a140e'; x.beginPath(); x.moveTo(0, H); x.lineTo(0, H*.9); x.quadraticCurveTo(W*.4, H*.86, W, H*.9); x.lineTo(W, H); x.fill();
    for (let i=0;i<14;i++){ const px = W*(.02 + i*.072 + hash(i, 81)*.02), py = H*(.89 - Math.sin(i)*.005), a = (hash(i, 82) - .5)*.9; x.strokeStyle = '#120c08'; x.lineWidth = 2.2; x.beginPath(); x.moveTo(px, py + 6); x.lineTo(px + Math.sin(a)*18, py - Math.cos(a)*18); x.stroke(); }
    vign(x, W, H, .45, .5); }), 0, 0, W, H);
  // what moves: the smoke going up from the fires inside, and leaning away on the wind; fire-glow at their feet; crows turning over the walls
  const cityFires = [[.18, .66], [.4, .7], [.55, .62], [.74, .68], [.9, .64]];
  cityFires.forEach(([fx, fh], i) => { const sx = W*fx, sy = hz - 24*s - hash(i, 3)*10*s; glow(ctx, sx, sy, 16*s, '#ff7a30', (.35 + Math.sin(t*mo/(160 + i*30) + i)*.08)); b3c3Smoke(ctx, sx, sy, s*(.8 + hash(i, 9)*.5), t, mo, i, '#1e1a18', .5, .9); });
  for (let i=0;i<9;i++){ const a = t*mo/(2600 + i*170) + i*.7, cx = W*(.36 + hash(i, 91)*.3) + Math.cos(a)*30*s, cy = hz - 60*s - hash(i, 92)*30*s + Math.sin(a*1.3)*10*s, f = Math.sin(t*mo/120 + i)*1.4; ctx.strokeStyle = 'rgba(16,12,10,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - 3, cy + f); ctx.lineTo(cx, cy); ctx.lineTo(cx + 3, cy + f); ctx.stroke(); } // crows
  { const sq = sceneSquad(); ctx.save(); ctx.filter = 'brightness(.3) saturate(.5)'; squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.05 + i*Math.min(22, W*.34/Math.max(1, sq.length)), H*.905 - 19 - (i%2)*1.5, 1.45, t, {phase:i, dir:1})); ctx.restore(); } // the Fourth on the near bank, looking at it
  vign(ctx, W, H, .25, .5); };

/* the black dragon over the field, from far below. Anomander Rake in his other shape: a span wider than the eye can take in, flying out over the
   Pannion army, the light coming through the membranes at the edges; under it, the field a strip of dust and tiny men breaking every way. */
function b3c3Dragon(x, cx, cy, sx, sy, beat, t, mo){
  const P = (px, py) => { const k = 1 + py*.3; return [cx + px*sx*k, cy + py*sy]; }; // the near (lower) parts a little wider: we are under it and behind
  const Q = p => P(p[0], p[1]), INK = '#050507';
  const wing = d => { const b = beat, sh = [d*.06, -.02], ec = [d*.2, -.2 + b*.04], el = [d*.35, -.22 + b*.08], wr = [d*.6, -.1 + b*.17],
      tips = [[d*1.04, -.24 + b*.32], [d*1.0, .16 + b*.27], [d*.84, .44 + b*.19], [d*.58, .55 + b*.11]], hip = [d*.09, .36];
    const edge = () => { x.beginPath(); x.moveTo(...Q(sh)); x.quadraticCurveTo(...Q(ec), ...Q(el)); x.lineTo(...Q(wr)); x.lineTo(...Q(tips[0])); let prev = tips[0];
      [...tips.slice(1), hip].forEach(tp => { const m = [(prev[0] + tp[0])/2, (prev[1] + tp[1])/2], c = [m[0] + (wr[0] - m[0])*.34, m[1] + (wr[1] - m[1])*.34]; x.quadraticCurveTo(...Q(c), ...Q(tp)); prev = tp; }); x.closePath(); };
    edge(); const [wx, wy] = Q(wr), g = x.createRadialGradient(wx, wy, 0, wx, wy, sx*.6); g.addColorStop(0, 'rgba(6,6,9,.99)'); g.addColorStop(.55, 'rgba(12,11,15,.97)'); g.addColorStop(.85, 'rgba(34,28,32,.9)'); g.addColorStop(1, 'rgba(70,56,52,.8)'); x.fillStyle = g; x.fill(); // membrane: near black, the light through its thin far edges
    x.save(); edge(); x.clip(); tips.slice(1).forEach((tp, i) => { const [ax, ay] = Q(wr), [bx, by] = Q(tp), [ox, oy] = Q(tips[i]); x.fillStyle = 'rgba(90,70,60,.08)'; x.beginPath(); x.moveTo(ax, ay); x.lineTo(ox, oy); x.lineTo(bx, by); x.fill(); }); x.restore(); // each panel a shade apart
    x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = INK; x.lineWidth = Math.max(2.4, sx*.03); x.beginPath(); x.moveTo(...Q(sh)); x.quadraticCurveTo(...Q(ec), ...Q(el)); x.lineTo(...Q(wr)); x.stroke(); // the arm: shoulder, elbow, wrist
    x.lineWidth = Math.max(1.6, sx*.016); x.beginPath(); x.moveTo(...Q(wr)); x.lineTo(...Q(tips[0])); x.stroke(); // the long first finger along the leading edge
    x.lineWidth = Math.max(1, sx*.009); tips.slice(1).forEach(tp => { const m = [(wr[0] + tp[0])/2 + d*.03, (wr[1] + tp[1])/2 - .03]; x.beginPath(); x.moveTo(...Q(wr)); x.quadraticCurveTo(...Q(m), ...Q(tp)); x.stroke(); }); // the finger-bones fanning to the trailing edge
    x.strokeStyle = 'rgba(200,180,170,.2)'; x.lineWidth = Math.max(.7, sx*.004); x.beginPath(); x.moveTo(...Q([sh[0], sh[1] - .018])); x.quadraticCurveTo(...Q([ec[0], ec[1] - .018]), ...Q([el[0], el[1] - .018])); x.lineTo(...Q([wr[0], wr[1] - .018])); x.lineTo(...Q([tips[0][0], tips[0][1] - .01])); x.stroke(); // a thread of light on the leading edge
    [tips[0]].forEach(tp => { const [tx, ty] = Q(tp); x.strokeStyle = INK; x.lineWidth = Math.max(1, sx*.006); x.beginPath(); x.moveTo(tx, ty); x.lineTo(tx + d*sx*.025, ty - sy*.03); x.stroke(); }); // the claw at the wingtip
    const [kx, ky] = Q(wr); ell(x, kx, ky, sx*.016, sx*.012, INK); x.lineCap = 'butt'; x.lineJoin = 'miter'; };
  wing(-1); wing(1);
  // the body from below, along a centreline: the neck going away (up, narrowing), chest and belly, the long tail coming down toward us and curling off
  const sway = Math.sin(t*mo/2600)*.04, N = 48, C = u => { const y = lerp(-.46, .9, u), tk = Math.max(0, (u - .58)/.42); return [Math.sin(u*2.2)*.006 + tk*tk*(.15 + sway) + Math.sin(tk*5 + t*mo/2600)*.02*tk, y]; },
    Wd = u => u < .08 ? .022 : u < .3 ? lerp(.022, .03, (u - .08)/.22) : u < .4 ? lerp(.03, .068, (u - .3)/.1) : u < .52 ? .068 - (u - .4)*.05 : u < .62 ? lerp(.07, .045, (u - .52)/.1) : lerp(.045, .002, Math.pow((u - .62)/.38, .8));
  const L = [], R = []; for (let i=0;i<=N;i++){ const u = i/N, [a, y] = C(u), [a2, y2] = C(Math.min(1, u + .01)), [a0, y0] = C(Math.max(0, u - .01)), dx = a2 - a0, dy = y2 - y0, l = Math.hypot(dx, dy*sy/sx) || 1, nx = -dy*sy/sx/l, w = Wd(u); L.push(Q([a + nx*w, y + dx/l*w*sx/sy])); R.push(Q([a - nx*w, y - dx/l*w*sx/sy])); }
  x.beginPath(); L.forEach((p, i) => i ? x.lineTo(...p) : x.moveTo(...p)); for (let i=R.length - 1;i>=0;i--) x.lineTo(...R[i]); x.closePath(); x.fillStyle = INK; x.fill();
  { const [bx, by] = Q([0, .1]), g = x.createRadialGradient(bx - sx*.02, by, 0, bx, by, sx*.12); g.addColorStop(0, 'rgba(90,70,60,.22)'); g.addColorStop(1, 'rgba(90,70,60,0)'); x.fillStyle = g; x.fill(); } // a little warm light off the field on its belly
  for (let i=0;i<13;i++){ const u = .33 + i*.022, [a, y] = C(u), w = Wd(u)*.8, [lx, ly] = Q([a - w, y]), [rx, ry] = Q([a + w, y]); x.strokeStyle = 'rgba(150,130,130,.13)'; x.lineWidth = .8; x.beginPath(); x.moveTo(lx, ly); x.quadraticCurveTo((lx + rx)/2, (ly + ry)/2 + sy*.012, rx, ry); x.stroke(); } // the belly-plates, banded
  for (let i=0;i<10;i++){ const u = .66 + i*.03, [a, y] = C(u), [px, py] = Q([a, y]); x.fillStyle = INK; x.beginPath(); x.moveTo(px - sx*.006, py); x.lineTo(px + sx*.016*(i%2 ? 1 : -1), py + sy*.006); x.lineTo(px + sx*.006, py + sy*.012); x.fill(); } // spines along the tail
  { const [a, y] = C(1), [tx, ty] = Q([a, y]); x.fillStyle = INK; x.beginPath(); x.moveTo(tx, ty); x.lineTo(tx + sx*.03, ty - sy*.03); x.lineTo(tx + sx*.012, ty + sy*.03); x.closePath(); x.fill(); } // the tail's barb
  // the head, far off and small: a long wedge pointing away; the horns swept back from the crown
  { const [hx, hy] = Q([0, -.47]); x.fillStyle = INK; x.beginPath(); x.moveTo(hx - sx*.026, hy + sy*.02); x.quadraticCurveTo(hx - sx*.02, hy - sy*.06, hx, hy - sy*.1); x.quadraticCurveTo(hx + sx*.02, hy - sy*.06, hx + sx*.026, hy + sy*.02); x.closePath(); x.fill();
    x.strokeStyle = INK; x.lineWidth = Math.max(1.2, sx*.008); x.lineCap = 'round'; x.beginPath(); x.moveTo(hx - sx*.016, hy - sy*.01); x.quadraticCurveTo(hx - sx*.032, hy + sy*.01, hx - sx*.034, hy + sy*.07); x.moveTo(hx + sx*.016, hy - sy*.01); x.quadraticCurveTo(hx + sx*.032, hy + sy*.01, hx + sx*.034, hy + sy*.07); x.stroke(); }
  // the hind legs drawn up under it, claws open; the forelegs folded at the chest
  [-1, 1].forEach(d => { const [ax, ay] = Q([d*.05, .3]), [kx, ky] = Q([d*.12, .34]), [bx, by] = Q([d*.11, .43]); x.strokeStyle = INK; x.lineWidth = Math.max(2.4, sx*.026); x.beginPath(); x.moveTo(ax, ay); x.lineTo(kx, ky); x.lineWidth = Math.max(1.6, sx*.014); x.lineTo(bx, by); x.stroke();
    x.lineWidth = Math.max(.8, sx*.005); for (let k=-1;k<=1;k++){ x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(bx + k*sx*.012, by + sy*.03, bx + k*sx*.016 + d*sx*.006, by + sy*.05); x.stroke(); }
    const [fx, fy] = Q([d*.07, .02]), [gx, gy] = Q([d*.11, .08]), [hx2, hy2] = Q([d*.08, .13]); x.lineWidth = Math.max(1.6, sx*.014); x.beginPath(); x.moveTo(fx, fy); x.lineTo(gx, gy); x.lineTo(hx2, hy2); x.stroke(); x.lineCap = 'butt'; }); }

SCENEX.b3_c3_dragon = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.82, fh = H - hz;
  const sx = Math.max(H*1.3, W*.56), sy = H*.56, cx = W*.5 + Math.sin(t*mo/9000)*W*.012, cy = H*.33 + Math.sin(t*mo/5200)*2, beat = Math.sin(t*mo/1700);
  const mass = (a) => .55 + .45*(.5 + .5*Math.sin(a*3 + 1.3))*(.6 + .4*Math.sin(a*7 + .4)); // the army's ragged edge, by angle
  ctx.drawImage(sceneLayer('b3c3:dragon', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0, '#2e3038'], [.3, '#5a5862'], [.68, '#a09284'], [1, '#d4b896']]); x.fillRect(0, 0, W, hz + 2); // a high, pale, smoke-stained sky; the sun low and behind us
    for (let i=0;i<7;i++) cloud(x, W*hash(i, 3), H*(.04 + hash(i, 4)*.42), W*(.34 + hash(i, 5)*.3), 18, i%2 ? '#e8dccc' : '#3a3842', .13); // cloud-banks, lit and shadowed
    glow(x, W*.5, H*.55, W*.6, '#f0d8b4', .16);
    for (let i=0;i<3;i++){ const sx0 = W*(.08 + i*.06), g = x.createLinearGradient(0, hz, 0, H*.1); g.addColorStop(0, 'rgba(40,34,32,.5)'); g.addColorStop(1, 'rgba(40,34,32,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(sx0 - 3, hz); x.quadraticCurveTo(sx0 + 10, H*.5, sx0 + 60 + i*20, H*.1); x.lineTo(sx0 + 100 + i*20, H*.1); x.quadraticCurveTo(sx0 + 20, H*.5, sx0 + 5, hz); x.fill(); } // Capustan's smoke, leaning off over the plain
    x.fillStyle = '#6a5e58'; x.beginPath(); x.moveTo(0, hz); for (let px=0;px<=W;px+=10) x.lineTo(px, hz - 3 - Math.sin(px*.013)*2.4 - hash(Math.round(px), 2)*1.6); x.lineTo(W, hz + 2); x.lineTo(0, hz + 2); x.fill();
    b3c3Skyline(x, W*.22, hz - 1, .3, 5, {mass:['#5a504a', '#605650'], dome:[['#6a6056', '#5a504a']], wall:'#585048', wallLit:'#6a6058'}, {light:.2});
    // the field: a strip of dust; the Pannion army breaking under it, a dark ragged mass coming apart into men running every way; the alliance's ranks to the right
    x.fillStyle = vgrad(x, hz, H, [[0, '#8a7a64'], [1, '#463a2c']]); x.fillRect(0, hz, W, fh);
    glow(x, W*.48, hz + fh*.45, W*.36, '#2a221c', .55); // the shadow it throws, the dust they raise
    for (let i=0;i<1400;i++){ const a = hash(i, 12)*6.283, r = Math.pow(hash(i, 11), .55)*mass(a)*(hash(i, 13) > .9 ? 1.5 : 1), px = W*.46 + Math.cos(a)*r*W*.3, py = hz + 2 + (.5 + .5*Math.sin(a))*r*fh*.85 + fh*.06; if (py > H - 1 || py < hz + 1 || px < 0 || px > W) continue; const d = (py - hz)/fh; x.fillStyle = `rgba(14,10,8,${.45 + (1 - Math.min(1, r))*.45})`; x.fillRect(px, py - 1 - d*1.6, .8 + d*.7, 1 + d*1.6); } // men: thick at the heart, thinning, broken off in knots
    for (let i=0;i<3;i++){ const bx = W*(.83 + i*.04), by = hz + fh*(.25 + i*.24); x.fillStyle = 'rgba(14,12,10,.85)'; x.fillRect(bx, by - 2, W*.14, 2.4 + i*.6); for (let j=0;j<10;j++) x.fillRect(bx + j*W*.014, by - 6 - i, .6, 4 + i); } // the alliance's ranks, in order, spears up
    vign(x, W, H, .4, .45); }), 0, 0, W, H);
  // darkness falling out of it onto the army: Kurald Galain, a soft curtain, not a flame
  ctx.save(); ctx.globalCompositeOperation = 'multiply';
  for (let j=0;j<12;j++){ const k = j/11, y = lerp(cy + sy*.3, hz + fh*.4, k); glow(ctx, cx + (j%2 ? 1 : -1)*sx*.01, y, sx*(.07 + k*.16), '#46444c', .26); }
  for (let i=0;i<18;i++){ const k = ((t*mo/3400 + hash(i, 41)) % 1), px = cx + (hash(i, 42) - .5)*sx*.3*(.3 + k), py = lerp(cy + sy*.3, hz + fh*.3, k); glow(ctx, px, py, sx*(.02 + k*.05), '#3a3840', .5*Math.sin(k*Math.PI)); }
  ctx.restore();
  // the running: men breaking away from the edge of the mass, going out in every direction
  for (let i=0;i<60;i++){ const a = hash(i, 51)*6.283, k = ((t*mo/16000 + hash(i, 52)) % 1), r = mass(a)*(.8 + k*.9), px = W*.46 + Math.cos(a)*r*W*.3, py = hz + 2 + (.5 + .5*Math.sin(a))*r*fh*.85 + fh*.06; if (py > H - 1 || py < hz + 1) continue; const d = (py - hz)/fh, step = Math.sin(t*mo/90 + i)*.4; ctx.fillStyle = `rgba(14,10,8,${.9*Math.min(1, (1 - k)*3)})`; ctx.fillRect(px, py - 1.4 - d*1.6, .9 + d*.6, 1.4 + d*1.6 + step); }
  b3c3Dragon(ctx, cx, cy, sx, sy, beat, t, mo);
  for (let i=0;i<3;i++){ const k = ((t*mo/40000 + i/3) % 1); cloud(ctx, W*(1.2 - k*1.4), H*(.46 + i*.08), W*.3, 12, '#d8ccbc', .1); } // cloud drifting across under it: it is up in the weather
  vign(ctx, W, H, .3, .4); };

/* the Thrall at dusk: the old fortress-palace at the city's heart, its great flat dome against a red sky, smoke, a few windows lit, torches at the gate */
SCENEX.b3_c3_thrall = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, base = H*.8, s = Math.max(.8, Math.min(1.3, W/650)), tx = W*.55, tw = Math.min(W*.62, 300*s), th = H*.38;
  ctx.drawImage(sceneLayer('b3c3:thrall', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, base, [[0, '#14141e'], [.35, '#3a2a34'], [.7, '#8a4a34'], [1, '#c87a44']]); x.fillRect(0, 0, W, base + 2); // dusk: indigo going to a smoky red
    x.fillStyle = 'rgba(230,220,240,.5)'; for (let i=0;i<30;i++){ const y = Math.pow(hash(i, 3), 1.8)*H*.3; x.fillRect(hash(i, 2)*W, y, 1, 1); } // the first stars
    for (let i=0;i<4;i++) cloud(x, W*(.1 + i*.28), H*(.18 + hash(i, 4)*.14), W*.36, 7, '#1a1416', .22); // smoke-bands across it
    b3c3Skyline(x, W, base - 4, s*.72, 13, {mass:['#2a1e20', '#24191a'], dome:[['#3e2c28', '#2a1e1c'], ['#2e3432', '#1e2422']], wall:'#2a1e1e', wallLit:'#3a2a26'}, {windows:true, light:.3}); // the roofs around it
    // the Thrall: a broad old keep of dark stone, four square towers, a long wall of narrow windows, the great low dome
    const L = tx - tw/2, R = tx + tw/2, top = base - th;
    x.fillStyle = '#16100f'; x.fillRect(L, top, tw, th + 2);
    [[L - 8*s, 22*s, 30*s], [R - 14*s, 22*s, 30*s], [L + tw*.3, 18*s, 16*s], [R - tw*.3 - 18*s, 18*s, 16*s]].forEach(([px, w, extra]) => { x.fillStyle = '#130e0d'; x.fillRect(px, top - extra, w, th + extra + 2); for (let j=0;j<w/(4*s) - 1;j++) x.fillRect(px + j*4*s, top - extra - 3*s, 2.4*s, 3*s); x.fillStyle = 'rgba(200,110,60,.14)'; x.fillRect(px, top - extra, 2*s, th + extra); }); // towers, the red light along their west faces
    x.fillStyle = '#16100f'; x.beginPath(); x.ellipse(tx, top, tw*.26, th*.5, 0, Math.PI, 0); x.fill(); x.fillRect(tx - tw*.27, top - 6*s, tw*.54, 8*s); // the great dome, flattened
    { const g = x.createLinearGradient(tx - tw*.26, 0, tx + tw*.26, 0); g.addColorStop(0, 'rgba(220,120,60,.3)'); g.addColorStop(.5, 'rgba(0,0,0,0)'); x.fillStyle = g; x.beginPath(); x.ellipse(tx, top, tw*.26, th*.5, 0, Math.PI, 0); x.fill();
      x.strokeStyle = 'rgba(220,130,80,.18)'; x.lineWidth = 1; for (let k=-3;k<=3;k++){ x.beginPath(); x.moveTo(tx + k*tw*.07, top - 6*s); x.quadraticCurveTo(tx + k*tw*.04, top - th*.36, tx, top - th*.5); x.stroke(); } }
    for (let r=0;r<2;r++) for (let i=0;i<14;i++){ const wx = L + tw*(.06 + i*.064), wy = top + th*(.2 + r*.26), k = .7 + hash(i, r + 40)*.3; glow(x, wx + s, wy + 2.5*s, 7*s, '#ff9a4a', .22*k); x.fillStyle = `rgba(255,${150 + Math.round(k*40)},80,${.55 + k*.35})`; x.fillRect(wx, wy, 2*s, 5*s); x.fillStyle = 'rgba(40,20,10,.6)'; x.fillRect(wx, wy + 2.2*s, 2*s, .6*s); } // rows of narrow windows, every one lit: the Council sits late
    for (let px=L; px<R; px+=4*s) x.fillRect(px, top - 3*s, 2.4*s, 3*s); // crenels along the roof-walk
    for (let i=1;i<8;i++){ const bx = L + tw*i/8; x.fillStyle = 'rgba(200,110,60,.09)'; x.fillRect(bx - 3*s, top, 1.4*s, th); x.fillStyle = 'rgba(0,0,0,.3)'; x.fillRect(bx - 1.6*s, top, 3*s, th); } // buttresses, lit on their west faces
    [.42, .7].forEach(k => { x.fillStyle = 'rgba(200,110,60,.12)'; x.fillRect(L, top + th*k, tw, 1.2*s); }); // string-courses catching the last light
    { const gw = 46*s, gh = th*.62; x.fillStyle = '#1c1412'; x.fillRect(tx - gw/2, base - gh, gw, gh); [[-1], [1]].forEach(([d]) => { const ox = tx + d*gw/2 - (d > 0 ? 9*s : 0); x.fillRect(ox, base - gh - 10*s, 9*s, gh + 10*s); for (let j=0;j<2;j++) x.fillRect(ox + j*5*s, base - gh - 13*s, 3*s, 3*s); });
      x.fillStyle = 'rgba(200,110,60,.16)'; x.fillRect(tx - gw/2, base - gh, 2*s, gh); x.fillStyle = 'rgba(0,0,0,.35)'; for (let j=0;j<3;j++) x.fillRect(tx - 12*s + j*10*s, base - gh + 6*s, 3*s, 6*s); } // the gatehouse, standing forward
    x.fillStyle = '#060404'; x.beginPath(); x.moveTo(tx - 10*s, base); x.lineTo(tx - 10*s, base - 16*s); x.arc(tx, base - 16*s, 10*s, Math.PI, 0); x.lineTo(tx + 10*s, base); x.fill(); // the gate
    // the square before it: paving catching the last red, a broken fountain, a few figures
    x.fillStyle = vgrad(x, base, H, [[0, '#3a2a24'], [1, '#120c0a']]); x.fillRect(0, base, W, H - base);
    x.strokeStyle = 'rgba(200,120,80,.1)'; x.lineWidth = 1; for (let i=1;i<6;i++){ const y = base + (H - base)*Math.pow(i/6, 1.4); x.beginPath(); x.moveTo(0, y); x.lineTo(W, y); x.stroke(); } for (let i=-12;i<=12;i++){ x.beginPath(); x.moveTo(tx + i*14*s, base); x.lineTo(tx + i*46*s, H); x.stroke(); }
    { const fx = W*.22, fy = base + (H - base)*.5; ell(x, fx, fy, 22*s, 6*s, '#1a1210'); ell(x, fx, fy - 2*s, 18*s, 4.4*s, '#0a0606'); x.fillStyle = '#1a1210'; x.fillRect(fx - 2*s, fy - 16*s, 4*s, 14*s); x.fillRect(fx - 7*s, fy - 18*s, 9*s, 2.4*s); } // a fountain, dry, its basin cracked
    vign(x, W, H, .5, .5); }), 0, 0, W, H);
  // torches at the gate and along the square, flickering; Gidrath on the steps, small and black against the light; a few windows lit high up
  const torch = (px, py, i) => { const f = .8 + (Math.sin(t*mo/(110 + i*13) + i)*.12 + Math.sin(t*mo/47 + i*3)*.08); glow(ctx, px, py, 26*s, '#ff8a3a', .45*f); glow(ctx, px, py, 6*s, '#ffe0a0', .8*f); ctx.fillStyle = '#100a08'; ctx.fillRect(px - .8*s, py, 1.6*s, 10*s); };
  [[tx - 18*s, base - 18*s], [tx + 18*s, base - 18*s], [W*.12, base + (H - base)*.3], [W*.9, base + (H - base)*.4]].forEach(([px, py], i) => torch(px, py, i));
  [-30, -24, 24, 30].forEach((dx, i) => { const gx = tx + dx*s, gy = base; ctx.fillStyle = '#0a0606'; ctx.fillRect(gx - 1.6*s, gy - 9*s, 3.2*s, 9*s); ctx.beginPath(); ctx.arc(gx, gy - 10.4*s, 1.8*s, 0, 7); ctx.fill(); ctx.fillRect(gx + 2*s, gy - 20*s, .7*s, 20*s); }); // the gate-guard
  for (let i=0;i<5;i++){ const a = .5 + .5*Math.sin(t*mo/(1800 + i*400) + i*2); ctx.fillStyle = `rgba(255,170,90,${.35 + a*.4})`; ctx.fillRect(tx - tw/2 + tw*(.1 + hash(i, 31)*.8), base - th*(.5 + hash(i, 32)*.25), 2*s, 4*s); }
  b3c3Smoke(ctx, tx + tw*.6, base - th*.7, s*.9, t, mo, 3, '#0e0a0a', .45, .8);
  vign(ctx, W, H, .3, .5); };

/* ---------------- the chapter's kit: ART['item/<key>'], Book One's card manner on Book Three's cold ground ----------------
   Weapons and armour on a 200×150 card, trinkets on 240×130, a radial ground of night-blue going to black; the drawings are flat shapes with a
   light stroke or two, like Book One's and Book Two's. B3C3_ART holds the drawings by what they are; the keys below hang them on the items. */
const B3C3_ART = {
  /* a Capan round shield: boards under painted leather, dark red, the city's gold dome on it, a bronze rim and boss; scarred */
  shield: ['A Capan round shield', 'a', '<ellipse cx="102" cy="78" rx="58" ry="60" fill="#140c0a" opacity=".5"/><circle cx="98" cy="74" r="58" fill="#6e221c"/><circle cx="98" cy="74" r="58" fill="none" stroke="#a88a50" stroke-width="6"/>'
    + '<circle cx="98" cy="74" r="52" fill="none" stroke="#3a120e" stroke-width="2"/><path d="M58 40 Q80 22 112 20" stroke="#e8c88a" stroke-width="2" fill="none" opacity=".55"/>'
    + '<path d="M70 92 Q70 62 98 60 Q126 62 126 92 Z" fill="#c8a24a"/><rect x="66" y="92" width="64" height="8" fill="#c8a24a"/><rect x="96" y="48" width="4" height="12" fill="#c8a24a"/><path d="M78 88 Q80 68 98 66" stroke="#f0d890" stroke-width="2" fill="none" opacity=".6"/>'
    + '<circle cx="98" cy="74" r="9" fill="#a88a50"/><circle cx="95" cy="71" r="3" fill="#e8d4a0" opacity=".7"/>'
    + '<path d="M128 40 L146 30 M60 108 L72 118 M120 112 L132 104" stroke="#1e0a08" stroke-width="2.4"/><path d="M134 50 L156 42" stroke="#6a5030" stroke-width="2"/><path d="M152 40 L162 36 L158 46 Z" fill="#c8c4b8"/>'],
  /* a Grey Sword's surcoat: grey wool, split at the hem and torn, the boar's head picked out in black thread on the breast, the thread cut where Fener was */
  surcoat: ["A Grey Sword's surcoat", 'a', '<path d="M66 20 L134 20 L150 44 L138 52 L144 132 L118 128 L104 136 L92 126 L70 134 L56 132 L62 52 L50 44 Z" fill="#8a8c8e"/>'
    + '<path d="M66 20 L134 20 L150 44 L138 52 L144 132 L118 128 L104 136 L92 126 L70 134 L56 132 L62 52 L50 44 Z" fill="none" stroke="#3a3c3e" stroke-width="2"/>'
    + '<path d="M86 20 Q100 34 114 20" fill="#1a1a1c"/><path d="M100 36 L100 132" stroke="#5a5c5e" stroke-width="2"/><path d="M62 52 Q100 60 138 52" stroke="#a8aaac" stroke-width="1.5" fill="none"/>'
    + '<path d="M80 70 L90 60 L96 48 L102 58 L112 56 L122 64 L124 76 L114 84 L100 86 L88 82 Z" fill="#242426" opacity=".9"/><circle cx="110" cy="68" r="2.4" fill="#8a8c8e"/><path d="M88 78 Q80 80 78 72 M100 84 Q96 92 90 90" stroke="#e8e4da" stroke-width="2.4" fill="none"/><path d="M124 76 Q132 84 128 94" stroke="#242426" stroke-width="1.2" fill="none"/>'
    + '<path d="M70 120 L64 132 M120 126 L126 136 M132 118 L140 128" stroke="#5a5c5e" stroke-width="1.5"/><path d="M74 104 Q82 100 86 108" stroke="#4a3a34" stroke-width="3" fill="none" opacity=".5"/>'],
  /* a Beklite's spear: a long ash haft, a broad leaf blade of black iron, a grey rag knotted under it */
  spear: ["A Beklite's spear", 'w', '<path d="M24 138 L150 36" stroke="#7a5a36" stroke-width="5" stroke-linecap="round"/><path d="M24 138 L150 36" stroke="#a8875a" stroke-width="1.2" opacity=".6"/>'
    + '<path d="M146 40 Q158 18 182 10 Q176 34 156 48 Z" fill="#4a4c52"/><path d="M150 40 L178 14" stroke="#c8ccd4" stroke-width="1.4"/><rect x="138" y="40" width="14" height="7" rx="2" fill="#2a2a2e" transform="rotate(-39 145 43)"/>'
    + '<path d="M138 50 Q126 58 120 74 Q130 66 140 62 Z" fill="#8a8a86"/><path d="M134 54 Q124 66 126 80" stroke="#6a6a66" stroke-width="3" fill="none"/><path d="M24 138 L30 132" stroke="#2a2a2e" stroke-width="7"/>'],
  /* Treach's stripe: a strip of tiger-hide on a thong, from Trake's Legion; amber and black, a bone bead */
  stripe: ["Treach's stripe", 't', '<path d="M60 44 Q120 22 180 44" stroke="#3a2a1a" stroke-width="2" fill="none"/><circle cx="120" cy="30" r="5" fill="#e0d4b8"/>'
    + '<path d="M104 34 Q120 30 136 34 L142 108 Q120 120 98 108 Z" fill="#c8862e"/><path d="M104 34 Q120 30 136 34 L142 108 Q120 120 98 108 Z" fill="none" stroke="#6a3a10" stroke-width="2"/>'
    + '<path d="M102 48 Q114 52 126 46 M108 62 Q122 68 138 60 M100 76 Q112 80 122 76 M114 90 Q126 96 140 88 M102 100 Q114 106 124 102" stroke="#140a04" stroke-width="5" stroke-linecap="round" fill="none"/>'
    + '<path d="M106 40 L104 104" stroke="#f0c070" stroke-width="1.4" opacity=".5"/><circle cx="120" cy="66" r="44" fill="none" stroke="#ffc060" stroke-width="1" opacity=".18"/>'],
};
const b3c3Card = ([label, kind, body]) => { const tk = kind === 't', w = tk ? 240 : 200, h = tk ? 130 : 150, id = tk ? 'c3-tbg' : kind === 'a' ? 'c3-abg' : 'c3-wbg';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="${tk ? .65 : .62}"><stop offset="0" stop-color="#2c3340"></stop><stop offset="1" stop-color="#0a0c10"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect>\n${body}</svg>`; };
/* the items' keys (the writer's CH.gear ids in 63) -> the drawing */
Object.entries({b3_c3_shield:'shield', b3_c3_surcoat:'surcoat', b3_c3_spear:'spear', b3_c3_stripe:'stripe'}).forEach(([k, d]) => { ART['item/' + k] = b3c3Card(B3C3_ART[d]); });
