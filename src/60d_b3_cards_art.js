/* ============ Book Three art: the people, the recruits' busts, and the Deck (v6.0) ============
   Figures (FIGX, 18) in the same ~32px frame as Book One's and Two's, lit from the left; the two recruits' busts (POR, 19) drawn the
   way 19 and 47b draw theirs; Book Three's Deck cards (CARDART, 20), the three of High House Chains in a frame of their own.
   Book One's own people (wj, qb, paran, dujek, moranth, quorl, rhivi, andii, crone, trotts, mallet, hedge, rake, kruppe, coll,
   murillio) are not redrawn: the chapters use those ids. 60b registered stand-ins for every name below first. */

/* ---------------- figures ---------------- */
const B3F = {
  /* a horn bow, short and deeply recurved, pale horn with dark tips */
  hornbow(ctx, x = 8.2, top = -12, bot = 7){ const m = (top + bot)/2; ctx.lineCap = 'round';
    ctx.strokeStyle = '#c8b48a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - 1.8, top - .6); ctx.quadraticCurveTo(x - .2, top + .4, x + .8, top + 2.4); ctx.quadraticCurveTo(x + 3.4, m, x + .8, bot - 2.4); ctx.quadraticCurveTo(x - .2, bot - .4, x - 1.8, bot + .6); ctx.stroke();
    ctx.strokeStyle = '#2a1e14'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x - 1.8, top - .6); ctx.lineTo(x - .9, top - .1); ctx.moveTo(x - 1.8, bot + .6); ctx.lineTo(x - .9, bot + .1); ctx.stroke();
    ctx.strokeStyle = 'rgba(230,220,200,.75)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(x - 1.4, top - .3); ctx.lineTo(x - 1.4, bot + .3); ctx.stroke(); ctx.fillStyle = '#6a4a2a'; ctx.fillRect(x + 1.4, m - 1, 1.4, 2); ctx.lineCap = 'butt'; },
  /* bone beads in a loop at the throat */
  beads(ctx, n = 7, y = -5.4, w = 3.6){ for (let i=0;i<n;i++){ const k = i/(n - 1), x = -w + k*w*2, yy = y + Math.sin(k*Math.PI)*2; ell(ctx, x, yy, .55, .55, i%2 ? '#e8dcc0' : '#c8b896'); } },
  /* mail: rows of tiny rings, darker on the shadow side */
  mail(ctx, x0, x1, y0, y1){ for (let y=y0, r=0; y<y1; y+=1.1, r++) for (let x=x0 + (r%2)*.6; x<x1; x+=1.2){ ctx.fillStyle = x < (x0 + x1)/2 ? 'rgba(220,220,214,.28)' : 'rgba(0,0,0,.3)'; ctx.fillRect(x, y, .6, .5); } },
  /* a long straight two-handed blade */
  blade(ctx, x0, y0, x1, y1, c = '#c8c6be', w = 1.6){ B2F.line(ctx, '#2a2420', w + .9, [[x0, y0], [x1, y1]]); B2F.line(ctx, c, w, [[x0, y0], [x1, y1]]); const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy), nx = -dy/l, ny = dx/l; B2F.line(ctx, 'rgba(255,255,250,.45)', .4, [[x0 + nx*.4, y0 + ny*.4], [x1 + nx*.4, y1 + ny*.4]]); },
};
Object.assign(FIGX, {
  /* ---- the recruits ---- */
  /* Sohra: Rhivi herd-rider and spirit-singer, about twenty; plains leathers, horn bow, bone beads, herd-staff, a pale spirit-mark across the eyes; small and quick */
  sohra(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .9, .95);
    B2F.line(ctx, '#7a5a36', 1.3, [[-7.6, 13], [-7.4, -17]]); B2F.line(ctx, '#7a5a36', 1.1, [[-7.4, -17], [-6.2, -19.4], [-4.6, -18.6]]); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-8.1, -12, 1.4, .7); ctx.fillRect(-8.1, -10.8, 1.4, .7); // the herd-staff, its crook, bone rings
    h.legs('#4a3624'); ctx.fillStyle = '#6a4a2e'; ctx.fillRect(-4.5, 9.4, 3.4, 3.6); ctx.fillRect(1.1, 9.4, 3.4, 3.6); // soft boots, bound at the calf
    h.torso('#9a7650', '#3e2a18', 5.8); poly(ctx, [[-5.8, 4], [5.8, 4], [6.6, 8.4], [-6.6, 8.4]], h.armor('#8a6644', '#33220f')); // the riding tunic, split for the saddle
    ctx.fillStyle = 'rgba(220,200,160,.65)'; for (let i=0;i<7;i++) ctx.fillRect(-6 + i*2, 8.2, .5, 1.4 + (i%2)*.8); // fringe
    ctx.fillStyle = '#5a3a20'; ctx.fillRect(-5.8, 2.6, 11.6, 1.1); ctx.fillStyle = '#b8402a'; ctx.fillRect(-1, 2.6, 2, 1.1); // belt, a red knot
    h.head('#8e6c4c', 4.1, -11.6);
    ctx.fillStyle = 'rgba(232,228,214,.82)'; ctx.fillRect(-4.1, -13, 8.2, 2.2); h.look('rgba(20,12,8,.9)', -12.4); // the spirit-mark: a pale band across the eyes
    B2F.cap(ctx, '#0e0a08', 4.4, -13, 1, 2); ctx.fillStyle = '#0e0a08'; ctx.fillRect(-4.4, -13, 1.3, 3); ell(ctx, -2.6, -17.4, 1.6, 1.2, '#0e0a08'); // black hair, a topknot
    B2F.line(ctx, '#0e0a08', 1.3, [[-3.6, -16.8], [-6.4, -12], [-6.8, -5]]); ell(ctx, -6.8, -4.4, .7, .9, '#e8dcc0'); // the long braid down her back, a bead at its end
    B3F.beads(ctx, 7, -5.6, 3.4);
    B3F.hornbow(ctx, 8.2, -11.4, 6.6);
    ctx.restore(); },
  /* Dannet: a Capan woman in her twenties, Grey Sword acolyte; grey surcoat over mail, the boar scraped off her shield and a wolf's head half-painted over it, a straight sword; hair shorn short */
  greysword(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1.02);
    h.legs('#3a3a3c'); ctx.fillStyle = '#2a2622'; ctx.fillRect(-4.5, 10, 3.4, 3); ctx.fillRect(1.1, 10, 3.4, 3);
    poly(ctx, [[-6.4,-6],[6.4,-6],[6.8,6],[-6.8,6]], h.armor('#9a9a96', '#3a3a38')); B3F.mail(ctx, -6.2, 6.2, -5.6, 6); // mail
    poly(ctx, [[-4.6,-6],[4.6,-6],[5.4,9.4],[-5.4,9.4]], h.armor('#a4a6a8', '#4a4c50')); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(-.3, -1, .6, 10.4); // the grey surcoat, split at the hem
    ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-5.2, 2.2, 10.4, 1.2); ctx.fillStyle = '#9a9488'; ctx.fillRect(-.8, 2.2, 1.6, 1.2);
    h.head('#c09a7c', 4.2, -11.4); h.look('rgba(24,14,10,.85)', -11.6);
    B2F.cap(ctx, '#3a2a1e', 4.4, -12.4, 1.02, 1.98); ctx.fillStyle = 'rgba(58,42,30,.6)'; ctx.fillRect(-4.3, -12.4, 1.2, 2.2); // shorn close, like the acolytes'
    h.sword('#c8c4b8');
    // the shield: the boar scraped off, the wolf half painted over it
    ctx.save(); ctx.translate(-7.2, .6); ctx.beginPath(); ctx.arc(0, 0, 6.4, 0, 7); ctx.fillStyle = h.armor('#6a645a', '#26221e'); ctx.fill(); ctx.strokeStyle = '#141210'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 5.4, 0, 7); ctx.clip();
    ctx.fillStyle = 'rgba(120,70,40,.45)'; ctx.fillRect(-4, -2.6, 6, 3.4); ctx.fillStyle = 'rgba(160,140,110,.35)'; for (let i=0;i<6;i++) ctx.fillRect(-4 + i*1.1, -3 + (i%2), .5, 4); // scraped: the old paint gone to scratches
    const wolf = () => { ctx.beginPath(); [[-2, -1.4], [-1, -5], [.6, -2.6], [1.4, -4.8], [2.2, -2.2], [3.2, -1.8], [5, -.6], [5.4, .3], [4.2, 1], [2.4, 1.6], [.8, 3.6], [-2.2, 3.8]].forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); };
    wolf(); ctx.strokeStyle = 'rgba(214,218,220,.7)'; ctx.lineWidth = .5; ctx.stroke(); // the wolf's head drawn in...
    ctx.save(); ctx.beginPath(); ctx.rect(.6, -6, 6, 12); ctx.clip(); wolf(); ctx.fillStyle = '#d4d8da'; ctx.fill(); ell(ctx, 3, -.9, .5, .4, '#1a1a1a'); ctx.restore(); // ...and only its front half painted yet
    ctx.restore(); ctx.beginPath(); ctx.arc(-7.2, .6, 6.4, 0, 7); ctx.strokeStyle = '#141210'; ctx.stroke(); ell(ctx, -7.2, .6, 1.1, 1.1, '#6b6155');
    ctx.restore(); },

  /* ---- the alliance ---- */
  /* Caladan Brood: huge, broad, plain; the great hammer on his back */
  brood(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.32, 1.36);
    B2F.line(ctx, '#3a2a1a', 1.9, [[7.4, 8], [-6.6, -15]]); poly(ctx, [[-10.6, -19.6], [-4.2, -21.8], [-2.4, -16.2], [-8.8, -14]], h.armor('#5a5650', '#1a1916')); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(-9.6, -19.4, 4, .8); // the hammer, slung across his back
    h.legs('#2a241c'); ctx.fillStyle = '#3a2e22'; ctx.fillRect(-4.6, 9.6, 3.6, 3.4); ctx.fillRect(1, 9.6, 3.6, 3.4);
    poly(ctx, [[-7.4,-6.4],[7.4,-6.4],[7,7],[-7,7]], h.armor('#6a5440', '#241a10')); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-.3, -6, .6, 13); // a plain leather coat
    ctx.fillStyle = '#2a1e14'; ctx.fillRect(-7, 3, 14, 1.4); B2F.line(ctx, '#3a2a1a', 1, [[-6.4, -6], [5.6, 6]]); // belt; the hammer's strap
    ctx.fillStyle = '#5a4430'; ctx.fillRect(6.2, -5.6, 2.8, 9); ctx.fillRect(-9, -5.6, 2.8, 9); ell(ctx, 7.6, 4, 1.6, 1.5, '#8a6a52'); ell(ctx, -7.6, 4, 1.6, 1.5, '#7a5a44'); // big arms, hanging
    h.head('#8a6a52', 4.8, -11.2); h.look('rgba(20,12,8,.9)', -11.4); ctx.fillStyle = 'rgba(40,24,14,.35)'; ctx.fillRect(-3.4, -8.6, 7, 2.2); // a broad flat face, heavy-jawed
    B2F.cap(ctx, '#120e0c', 5, -12.4, 1, 2); ctx.fillStyle = '#120e0c'; ctx.fillRect(-5, -12.4, 1.8, 7.6); // black hair, long, pulled back
    ctx.restore(); },
  /* Kallor: tall, gaunt, grey-bearded, in ancient armour, a two-handed sword on his shoulder, a fur-collared cloak */
  kallor(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.2);
    poly(ctx, [[-6.4,-6],[3,-6],[2,12.6],[-9,12.6]], h.armor('#2e2c2a', '#0c0b0a')); // the cloak behind
    h.legs('#2e2a26'); ctx.fillStyle = '#4a463e'; ctx.fillRect(-4.5, 6, 3.4, 4); ctx.fillRect(1.1, 6, 3.4, 4); // greaves
    poly(ctx, [[-5.6,-6],[5.6,-6],[5,7],[-5,7]], h.armor('#7a7462', '#26241e')); // old plate, the shape of no army now living
    ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let i=0;i<4;i++) ctx.fillRect(-5, -2.6 + i*2.6, 10, .5); ctx.fillStyle = 'rgba(30,24,16,.5)'; [[-3, -3], [2, 1], [-1, 4], [3, -4]].forEach(([x, y]) => ctx.fillRect(x, y, .8, .8)); // lames, pitting
    ctx.fillStyle = '#5a5244'; ctx.fillRect(-5.6, 6, 11.2, 2.2); // the skirt of plates
    B3F.blade(ctx, 6.4, -1, -8.4, -22.6, '#b8b6ae', 1.7); B2F.line(ctx, '#3a2a1a', 1.8, [[6.4, -1], [8.4, 2.4]]); B2F.line(ctx, '#6a6050', 1.4, [[4.4, -3.2], [8.2, .4]]); // the two-handed sword on his shoulder
    ell(ctx, 5.6, -.4, 1.5, 1.5, '#8a7a66'); // his gauntleted hand on the grip
    h.head('#a89a8a', 3.9, -11.6); h.look('rgba(16,10,8,.9)', -12); ctx.fillStyle = 'rgba(30,20,14,.4)'; ctx.fillRect(-3.4, -10.6, 1.4, 2.4); ctx.fillRect(2.4, -10.6, 1.4, 2.4); // gaunt: the cheeks fallen in
    poly(ctx, [[-3.4,-9.6],[3.8,-9.6],[3,-5],[.6,-1.6],[-1.4,-4.8],[-3,-6.6]], '#a8a49c'); ctx.fillStyle = 'rgba(60,56,50,.35)'; ctx.fillRect(-.2, -8.4, .5, 5.6); // the long grey beard
    B2F.cap(ctx, '#9a968e', 4.1, -12.8, 1.05, 1.95); // grey hair, thin
    poly(ctx, [[-7.6,-7.4],[-3,-8.6],[3,-8.6],[7,-7],[6,-4.6],[-6.4,-4.4]], '#5a5248'); ctx.fillStyle = 'rgba(200,190,170,.3)'; for (let i=0;i<8;i++) ctx.fillRect(-7 + i*1.7, -8 + (i%2)*.6, .6, 2.4); // the fur collar
    ctx.restore(); },
  /* Korlat: a Tiste Andii woman, dark-skinned, tall, a slim sword */
  korlat(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.14);
    h.legs('#0e0d14'); ctx.fillStyle = '#1a1822'; ctx.fillRect(-4.5, 9, 3.4, 4); ctx.fillRect(1.1, 9, 3.4, 4);
    poly(ctx, [[-5.6,-6],[5.6,-6],[6.8,10],[-6.8,10]], h.armor('#2e2c3c', '#08070e')); ctx.fillStyle = 'rgba(160,150,210,.18)'; ctx.fillRect(-5.2, -5, 1, 14); // a long coat of black leather, split for walking
    ctx.fillStyle = '#14121c'; ctx.fillRect(-5.6, 1.8, 11.2, 1.1); ctx.fillStyle = '#8a86a8'; ctx.fillRect(-.6, 1.8, 1.2, 1.1);
    B2F.line(ctx, '#bcbad0', .9, [[7.2, 2.6], [11.6, -13.4]]); B2F.line(ctx, '#2a2632', 1.6, [[6.4, 4.6], [7.4, 1.6]]); ctx.fillStyle = '#6a6680'; ctx.fillRect(5.8, 1.6, 3.2, .7); // the slim sword, held low and easy
    ell(ctx, 6.6, 3.4, 1.3, 1.3, '#3e3a4c');
    h.head('#423e52', 4, -11.8); ctx.fillStyle = 'rgba(206,200,240,.7)'; ctx.fillRect(-.8, -12.2, 1.3, .9); ctx.fillRect(2.1, -12.2, 1.3, .9); // dark skin; the Andii eyes, a little light in them
    B2F.cap(ctx, '#050408', 4.3, -13, 1, 2); ctx.fillStyle = '#050408'; ctx.fillRect(-4.3, -13, 1.6, 12); ctx.fillRect(2.9, -13, 1.4, 4); // long black hair down her back
    ctx.restore(); },
  /* the Mhybe: a Rhivi woman aged far beyond her years, on her feet with a stick */
  mhybe(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, .9);
    h.legs('#3a2e24');
    poly(ctx, [[-6.4,-5],[5,-6.4],[7.2,11],[-7.6,11]], h.armor('#7a5a3c', '#2e2014')); ctx.fillStyle = 'rgba(214,190,140,.55)'; for (let i=0;i<8;i++) ctx.fillRect(-7 + i*1.9, 10.6, .5, 1.6 + (i%2)*.6); // Rhivi leathers, hanging loose on her now
    poly(ctx, [[-7.2,-6.6],[4.6,-7.6],[6.4,-1],[-7.6,0]], h.armor('#8a4a30', '#3a1a10')); B3F.beads(ctx, 6, -2.6, 3); // a blanket over the shoulders, bone beads
    ctx.save(); ctx.translate(2.2, 2.6); h.head('#7a5c44', 3.9, -11.4); ctx.fillStyle = 'rgba(30,16,10,.3)'; ctx.fillRect(-2.4, -14.2, 4.6, .4); ctx.fillRect(1.6, -9.4, 2.2, .4); ctx.fillRect(-2.2, -8.2, 4, .35); // age, cut in deep
    h.look('rgba(20,12,8,.8)', -12); B2F.cap(ctx, '#d8d4cc', 4.1, -12.4, 1, 1.9); ctx.fillStyle = '#d8d4cc'; ctx.fillRect(-4.1, -12.4, 1.3, 6); ctx.fillStyle = 'rgba(216,212,204,.6)'; ctx.fillRect(-5, -9, 1, 5); ctx.restore(); // the head comes forward; thin white hair
    B2F.line(ctx, '#6a4e30', 1.4, [[9.4, 13], [8.2, -5]]); ell(ctx, 8.2, -4.6, 1.3, 1.3, '#7a5c44'); B2F.line(ctx, '#7a5c44', 1.4, [[5, -4], [8.2, -4.6]]); // the stick, both hands on it
    ctx.restore(); },
  /* Silverfox: a Rhivi girl, small, in red wool; old eyes in a child's face. Drawn plainly. */
  silverfox(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .7, .7);
    ctx.fillStyle = '#3a2a1e'; ctx.fillRect(-4, 6, 3, 7); ctx.fillRect(1, 6, 3, 7); ctx.fillStyle = '#5a4030'; ctx.fillRect(-4.2, 10.4, 3.4, 2.6); ctx.fillRect(.8, 10.4, 3.4, 2.6); // leggings, soft boots
    poly(ctx, [[-5,-6],[5,-6],[7,9],[-7,9]], h.armor('#a83a2a', '#4a1410')); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-6.6, 7.6, 13.2, 1.4); // a red wool smock to the knee
    ctx.fillStyle = '#d8c8a0'; ctx.fillRect(-5.4, -6, 10.8, 1.2); // its pale edging
    ctx.fillStyle = '#a83a2a'; ctx.fillRect(4.4, -5.4, 2.4, 6.4); ell(ctx, 5.6, 1.4, 1.3, 1.3, '#9a7454'); // an arm, a hand
    h.head('#9a7454', 4.6, -11.2); ctx.fillStyle = 'rgba(190,200,210,.85)'; ctx.fillRect(-.9, -11.7, 1.3, 1.2); ctx.fillRect(2, -11.7, 1.3, 1.2); ctx.fillStyle = 'rgba(20,14,10,.9)'; ctx.fillRect(-.4, -11.4, .6, .8); ctx.fillRect(2.5, -11.4, .6, .8); // eyes too old for the face
    B2F.cap(ctx, '#140e0a', 4.9, -12, 1, 2); ctx.fillStyle = '#140e0a'; ctx.fillRect(-4.9, -12, 1.8, 7); ctx.fillRect(3.4, -12, 1.5, 4.4); // black hair, cut at the shoulder
    ctx.restore(); },
  /* Artanthos: Dujek's standard bearer. An unremarkable man with a standard; nothing about him says anything. */
  artanthos(ctx, h, t, o){ const w = o.still ? 0 : Math.sin(t/700 + (o.phase||0))*.8;
    B2F.line(ctx, '#4a3a28', 1.4, [[7.6, 13], [7.6, -25]]); ell(ctx, 7.6, -25.6, 1, 1, '#8d8a86'); ctx.fillStyle = '#6a6458'; ctx.fillRect(7, -24.4, 11 + w, .9); // the pole, its finial and crossbar
    poly(ctx, [[8.2, -23.6], [18 + w, -23.6], [17.4 + w*1.4, -15], [13 + w, -13.4], [8.2, -15]], h.armor('#3e3a36', '#16140f')); ctx.fillStyle = 'rgba(200,190,170,.5)'; ell(ctx, 13 + w*.6, -19, 2, 2, 'rgba(200,190,170,.45)'); // the Host's standard, dark, the device faded
    h.legs('#2a2622'); h.torso('#7a7a74', '#2e2e2a', 6.2); B3F.mail(ctx, -6, 6, -5.6, 6); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(-6, 3, 12, 1.2);
    ctx.fillStyle = '#4a4440'; ctx.fillRect(5.6, -5.4, 2.4, 8); ell(ctx, 7.6, 1.8, 1.3, 1.3, '#a8866e'); // the arm holding the pole
    h.head('#a8866e', 4.4); h.look(); B2F.cap(ctx, '#5a4430', 4.6, -12.6, 1.05, 1.95); // brown hair, a forgettable face
    },
  /* Tav (Tavrin): Brisk's brother, a big Cawn man in Second Army heavy kit; the same wheat-pale hair */
  tav(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.14, 1.12);
    h.legs('#3a3a3c'); ctx.fillStyle = '#5a5850'; ctx.fillRect(-4.5, 6, 3.4, 4.4); ctx.fillRect(1.1, 6, 3.4, 4.4);
    h.torso('#9a968a', '#33302a', 7.8); B3F.mail(ctx, -7.4, 7.4, -5.6, 6.4);
    poly(ctx, [[-8.6,-6.8],[-3.4,-7.6],[-3,-3.4],[-8,-2.4]], h.armor('#a8a498', '#3a3830')); poly(ctx, [[8.6,-6.8],[3.4,-7.6],[3,-3.4],[8,-2.4]], h.armor('#8a867a', '#2a2822')); // heavy pauldrons
    ctx.fillStyle = '#6a2418'; ctx.fillRect(-6.6, 4.6, 13.2, 2); // the same red belt his sister wears
    h.sword('#c4c0b4');
    h.head('#c49c80', 4.6, -11.2); h.look(); ctx.fillStyle = 'rgba(200,170,110,.5)'; ctx.fillRect(-3.4, -8.6, 7.2, 2.4); // a pale stubble
    B2F.cap(ctx, '#c0a064', 4.8, -12.2, 1.04, 1.96); ctx.fillStyle = '#e4cc94'; ctx.fillRect(-3.4, -16, 5, 1); // wheat-pale hair, cropped
    poly(ctx, [[-13.2,-6],[-4,-6.6],[-4.4,7.8],[-12.6,8.4]], h.armor('#7a7468', '#2a2620')); ctx.strokeStyle = '#141210'; ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(-13.2, -6); ctx.lineTo(-4, -6.6); ctx.lineTo(-4.4, 7.8); ctx.lineTo(-12.6, 8.4); ctx.closePath(); ctx.stroke(); ctx.fillStyle = 'rgba(214,190,140,.4)'; ctx.fillRect(-9.4, -6, 1.2, 14); ctx.fillRect(-12.8, .2, 8.6, 1.1); // the heavy infantry's big shield
    ctx.restore(); },
  /* Hurlochel: a Host outrider, light kit */
  hurlochel(ctx, h, t, o){ const w = o.still ? 0 : Math.sin(t/600 + (o.phase||0))*.6;
    poly(ctx, [[-6,-6],[-1,-6],[-3,6 + w],[-9.4 - w,5]], h.armor('#4a4a3a', '#1a1a12')); // a short riding cloak
    h.legs('#3a3024'); ctx.fillStyle = '#5a4026'; ctx.fillRect(-4.5, 7.4, 3.4, 5.6); ctx.fillRect(1.1, 7.4, 3.4, 5.6); // riding boots to the knee
    h.torso('#7a6244', '#2e2416', 5.8); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-5.6, 2.4, 11.2, 1.1); B2F.line(ctx, '#3a2a1a', .8, [[-5, -5.6], [4.6, 2.6]]);
    ell(ctx, -4.6, 4.4, 1.8, 1.1, '#c8b48a'); B2F.line(ctx, '#2a1e14', .5, [[-6.2, 4], [-3, 4.8]]); // a horn at his hip
    B2F.curved(ctx, '#c0bcb0', 1);
    h.head('#b08a6e', 4.2, -11.4); h.look(); ctx.fillStyle = '#4a3a28'; ctx.beginPath(); ctx.arc(0, -12.6, 4.6, Math.PI, 0); ctx.fill(); ctx.fillRect(-4.8, -13, 9.6, 1.1); // a leather cap
    ctx.fillStyle = '#6a5a3a'; ctx.fillRect(-3.4, -7.8, 7, 1.6); // a scarf against the wind
    },
  /* a Rhivi rider on foot: a hide cloak, a long braid, the horn bow */
  b3_rhivi_rider(ctx, h, t, o){ const c = b2Pick(o, [['#86603e', '#3a2814'], ['#7a5a3e', '#30200f'], ['#92704a', '#3e2c18']]);
    poly(ctx, [[-6.2,-6],[2,-6],[0,9],[-8.4,9]], h.armor('#5a4430', '#1e140a')); ctx.fillStyle = 'rgba(200,180,140,.3)'; for (let i=0;i<5;i++) ctx.fillRect(-7.6 + i*1.6, 8.4, .5, 1.6); // a bhederin-hide cloak
    h.legs('#3a2a1c'); h.torso(c[0], c[1], 5.8); ctx.fillStyle = '#5a3a20'; ctx.fillRect(-5.8, 2.4, 11.6, 1.1); B3F.beads(ctx, 5, -5.4, 2.8);
    ctx.fillStyle = '#2a1e14'; ctx.fillRect(-6.6, -1.6, 1.8, 7); poly(ctx, [[-6.6, -1.6], [-4.8, -1.6], [-5.7, -3.8]], '#d8ccb0'); // a quiver, the fletchings
    h.head('#8a6a4a', 4.3, -11.4); h.look('rgba(20,12,8,.88)', -11.8); ctx.fillStyle = 'rgba(176,80,42,.5)'; ctx.fillRect(1.6, -10.4, 3, .7); // an ochre stroke on the cheek
    B2F.cap(ctx, '#120c08', 4.6, -12.6, 1, 2); B2F.line(ctx, '#120c08', 1.4, [[-3.6, -14], [-6, -8], [-6.2, -1]]); // black hair, one long braid
    B3F.hornbow(ctx, 8.4, -11.6, 7); },
  /* a White Face Barghast warrior: white face paint, bone and iron, a two-handed blade */
  b3_barghast(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.14, 1.14);
    B3F.blade(ctx, 7, 2, 12.6, -20, '#a8a49a', 2); B2F.line(ctx, '#3a2a1a', 2, [[6, 5.6], [7.4, 1.2]]); B2F.line(ctx, '#6a6050', 1.4, [[5, 1.2], [9.6, 2.6]]); // the two-handed blade
    h.legs('#3a2a1e'); ctx.fillStyle = '#5a4430'; ctx.fillRect(-4.5, 8.4, 3.4, 4.6); ctx.fillRect(1.1, 8.4, 3.4, 4.6); // hide wrappings
    poly(ctx, [[-7.2,-6],[7.2,-6],[6.4,6.6],[-6.4,6.6]], h.armor('#7a5a42', '#2a1a10')); // bare chest, broad
    poly(ctx, [[-5,-4],[5,-4],[4.4,2],[-4.4,2]], h.armor('#6a6660', '#22201c')); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(-4.6, -2, 9.2, .5); ctx.fillRect(-4.4, 0, 8.8, .5); // a breastplate of iron scraps
    ctx.fillStyle = '#e4dcc8'; for (let i=0;i<4;i++){ ctx.fillRect(-4.6 + i*2.8, 2.6, 1.2, 3.6); } ctx.fillRect(-6.4, -5.6, 2.4, 1.2); ctx.fillRect(4, -5.6, 2.4, 1.2); // bone plates and fetishes
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-6.4, 5.6, 12.8, 1.6); ell(ctx, 6.6, 3.8, 1.6, 1.5, '#7a5a42');
    h.head('#6a4e3a', 4.6, -11.4);
    ell(ctx, 0, -11.2, 4.4, 4.6, '#e8e4dc'); ctx.fillStyle = '#0c0a08'; ctx.fillRect(-1.6, -12.6, 2.4, 2); ctx.fillRect(1.6, -12.6, 2.4, 2); ctx.fillStyle = 'rgba(255,240,220,.75)'; ctx.fillRect(-.6, -12, .7, .6); ctx.fillRect(2.6, -12, .7, .6); ctx.fillStyle = '#0c0a08'; ctx.fillRect(-1.2, -8.6, 4.4, .7); // the white face paint, black round the eyes
    B2F.cap(ctx, '#140e0a', 4.9, -13, 1, 2); B2F.braids(ctx, '#140e0a', 10, -13); ctx.fillStyle = '#e4dcc8'; ctx.fillRect(-5.8, -6, 2.2, .9); ctx.fillRect(3.6, -6, 2.2, .9); poly(ctx, [[-1, -17.4], [0, -21], [1, -17.4]], '#e4dcc8'); // braids tied with bone; a bone through the topknot
    ctx.restore(); },
  /* a Tiste Andii swordsman: like Book One's, but with the sword up and the cold about him */
  b3_andii(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.1); const p = o.still ? .5 : (Math.sin(t/900 + (o.phase||0)) + 1)/2;
    glow(ctx, 2, -2, 15, '#8aa8d8', .1 + p*.06);
    h.legs('#0e0d12'); poly(ctx, [[-6.4,-6],[6.4,-6],[7.6,10.4],[-7.6,10.4]], h.armor('#22222e', '#07070c')); ctx.fillStyle = '#3a3a4c'; ctx.fillRect(-6.8, 2, 13.6, 1); ctx.fillStyle = 'rgba(170,180,230,.16)'; ctx.fillRect(-6, -5, 1, 14);
    B2F.line(ctx, '#c4c8dc', 1.2, [[6.6, -2], [11, -17.6]]); B2F.line(ctx, '#2a2632', 1.7, [[5.8, .6], [6.8, -2.6]]); ctx.fillStyle = '#6a6a80'; ctx.fillRect(5, -2.8, 3.6, .8); ell(ctx, 6, -1.4, 1.3, 1.3, '#4a4a58'); // the longsword, raised
    for (let i=0;i<4;i++){ const k = ((t/1800 + i/4 + (o.phase||0)) % 1); ctx.fillStyle = `rgba(200,220,255,${.5*(1 - k)})`; ctx.fillRect(9 + Math.sin(i*2 + t/500)*1.4, -15 + k*10, .9, .9); } // the cold coming off it
    h.head('#4a4a58', 4.3, -11.8); h.eyes('rgba(200,206,246,.7)');
    ctx.fillStyle = '#c8c8d4'; ctx.beginPath(); ctx.arc(0, -12.8, 4.6, Math.PI, 0); ctx.fill(); ctx.fillRect(-4.6, -12.8, 1.6, 7); ctx.fillRect(3, -12.8, 1.6, 3); // silver hair, shoulder length
    ctx.restore(); },
  /* a Grey Sword trooper: grey surcoat over mail, a grey helm, shield and sword */
  b3_greysword(ctx, h, t, o){ h.legs('#3a3a3c');
    poly(ctx, [[-6.4,-6],[6.4,-6],[6.6,5.6],[-6.6,5.6]], h.armor('#94948e', '#34342f')); B3F.mail(ctx, -6.2, 6.2, -5.6, 5.6);
    poly(ctx, [[-4.6,-6],[4.6,-6],[5.4,9],[-5.4,9]], h.armor('#9ea0a2', '#44464a')); ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-5.2, 2.2, 10.4, 1.2);
    h.head('#b8927a', 4.3, -11.2); h.look(); h.fullHelm('#8a8c8e'); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-4, -15.6, 3, .9);
    h.sword('#c8c4b8'); h.shield('#7e8084', '#2c2e30', 6, -7, .6); ctx.strokeStyle = 'rgba(40,40,44,.8)'; ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(-7, .6, 4, 0, 7); ctx.stroke(); },
  /* a Black Moranth soldier: Book One's, as it is */
  b3_moranth(ctx, h, t, o){ drawFigure(ctx, 'moranth', 0, 0, 1, t, {still:true, air:true}); },

  /* ---- the Pannion Domin ---- */
  /* a Beklite: Pannion line infantry, helmed, spear and shield, drab */
  beklite(ctx, h, t, o){ const c = b2Pick(o, [['#6a6448', '#2a2618'], ['#5e5a42', '#24221a'], ['#706650', '#2c2618']]);
    B2F.line(ctx, '#5a4a30', 1.3, [[7.8, 12], [8.6, -21]]); poly(ctx, [[8.6, -24.6], [7.6, -19.6], [9.6, -19.6]], '#a8a49a'); // the spear
    h.legs('#2e2a20'); h.torso(c[0], c[1], 6.2); ctx.fillStyle = 'rgba(0,0,0,.3)'; for (let r=0;r<4;r++) for (let i=0;i<5;i++) ctx.fillRect(-5.4 + i*2.3 + (r%2), -4.4 + r*2.4, 1.6, .5); // leather scale
    ctx.fillStyle = '#3a3020'; ctx.fillRect(-6.2, 3, 12.4, 1.2); ell(ctx, 7.8, .6, 1.3, 1.3, '#9a7a5e');
    h.head('#9a7a5e', 4.3, -11.2); h.look('rgba(24,14,10,.85)'); ctx.fillStyle = '#5a564a'; ctx.beginPath(); ctx.moveTo(-5, -11.6); ctx.quadraticCurveTo(-4.6, -17, 0, -18.6); ctx.quadraticCurveTo(4.6, -17, 5, -11.6); ctx.closePath(); ctx.fill(); ctx.fillRect(1.8, -12, 1, 3.4); // a conical helm, a nasal
    poly(ctx, [[-12.6,-5.4],[-3.6,-5.4],[-3.6,6.8],[-12.6,6.8]], h.armor('#6a5e44', '#221e14')); ctx.strokeStyle = '#141210'; ctx.lineWidth = .9; ctx.strokeRect(-12.6, -5.4, 9, 12.2); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-8.6, -5.4, 1, 12.2); }, // the shield, plain
  /* a Seerdomin: the Seer's warrior-mage, dark armour, a long mace, a cold grey shimmer */
  seerdomin(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1.1); const p = o.still ? .5 : (Math.sin(t/700 + (o.phase||0)) + 1)/2;
    glow(ctx, 0, -2, 17, '#b8c0c8', .1 + p*.08);
    poly(ctx, [[-6.4,-6],[3,-6],[1,12.6],[-9,12.6]], h.armor('#3a3c40', '#0e0e10')); // a grey cloak
    h.legs('#141416'); ctx.fillStyle = '#2a2a2e'; ctx.fillRect(-4.5, 6, 3.4, 4.6); ctx.fillRect(1.1, 6, 3.4, 4.6);
    h.torso('#38383e', '#08080a', 6.6); ctx.fillStyle = 'rgba(0,0,0,.5)'; for (let i=0;i<4;i++) ctx.fillRect(-6, -3 + i*2.4, 12, .5); ctx.fillStyle = 'rgba(180,190,200,.22)'; ctx.fillRect(-6, -5.4, 1, 11); // dark plate
    poly(ctx, [[-8.4,-6.8],[-3.4,-7.6],[-3,-3],[-8,-2.4]], h.armor('#44444a', '#0c0c0e')); poly(ctx, [[8.4,-6.8],[3.4,-7.6],[3,-3],[8,-2.4]], h.armor('#2e2e34', '#060608'));
    B2F.line(ctx, '#2a2420', 1.5, [[6.4, 8.4], [9.4, -15.4]]); poly(ctx, [[8.2, -14.4], [10.8, -15], [11.6, -20], [10.4, -21.6], [8, -21], [7.4, -16.2]], h.armor('#5a5a60', '#16161a')); ctx.fillStyle = '#16161a'; [[-1, 0], [1, -1], [-1.4, -2.6]].forEach(([dx, dy]) => poly(ctx, [[9.6 + dx, -18 + dy], [12.4 + dx, -18.6 + dy], [9.8 + dx, -16.6 + dy]], '#3a3a40')); // the long mace, flanged
    ell(ctx, 7, 3.4, 1.4, 1.4, '#2a2a2e');
    ctx.beginPath(); ctx.arc(0, -11.4, 5.3, Math.PI, 0); ctx.fillStyle = '#2a2a30'; ctx.fill(); ctx.fillRect(-5.3, -11.4, 10.6, 5.6); ctx.fillStyle = '#050506'; ctx.fillRect(-.4, -11.4, 5.2, 1.4); ctx.fillRect(1.6, -11.4, 1.2, 4.6); // a closed helm, a T of dark
    ctx.fillStyle = `rgba(210,220,230,${.45 + p*.4})`; ctx.fillRect(.4, -11, 1, .7); ctx.fillRect(3.2, -11, 1, .7); // and a cold light in it
    for (let i=0;i<5;i++){ const k = ((t/2200 + i/5 + (o.phase||0)) % 1); ctx.fillStyle = `rgba(200,206,214,${.45*(1 - k)})`; ctx.fillRect(-8 + hash(i, 7)*16, 8 - k*22, .8, .8); } // the grey sorcery, rising off him
    ctx.restore(); },
  /* one of the Tenescowri: a starving peasant of the Domin; rags, bone-thin, a club. Plain. */
  tenescowri(ctx, h, t, o){ const c = b2Pick(o, ['#5a5040', '#4e4636', '#625646']);
    ctx.fillStyle = '#6a5040'; ctx.fillRect(-3.6, 5, 1.8, 8); ctx.fillRect(1.6, 5, 1.8, 8); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-3.6, 11, 1.8, 2); ctx.fillRect(1.6, 11, 1.8, 2); // bare legs, too thin
    poly(ctx, [[-4.4,-6],[4.4,-6],[5.6,4],[4,7.6],[2.4,5.4],[.6,8],[-1.4,5.6],[-3.4,7.8],[-5.6,4]], h.armor(c, '#1e1a14')); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-3, -3, 6, .5); ctx.fillRect(-2.6, -.6, 5, .5); // rags, torn at the hem
    ctx.fillStyle = '#6a5040'; ctx.fillRect(4, -5, 1.4, 7.6); ctx.fillRect(-5.4, -5, 1.4, 7); // thin arms
    B2F.line(ctx, '#4a3a26', 1.6, [[4.8, 2], [9.4, -9]]); ell(ctx, 9.8, -9.8, 1.8, 1.6, '#4a3a26'); // a club
    h.head('#8a6a52', 3.8, -11); ctx.fillStyle = 'rgba(20,10,6,.45)'; ctx.fillRect(-2.8, -9.4, 1.2, 2.2); ctx.fillRect(2, -9.4, 1.2, 2.2); h.look('rgba(20,12,8,.85)', -11.6); // hollow cheeks
    B2F.cap(ctx, '#2a2018', 4, -12, 1.05, 1.95); ctx.fillStyle = '#2a2018'; ctx.fillRect(-4, -12, 1.2, 3.6); },
  /* a K'ell Hunter: K'Chain Che'Malle, the Matron's firstborn. Two-legged, long-tailed, grey; blades for hands; twice a man's height.
     Drawn in the same frame, so it stands over everything near it (not so tall on the battle map, where it starts near the top row). */
  khell(ctx, h, t, o){ ctx.save(); const bat = typeof view !== 'undefined' && view === 'battle', S = bat ? .82 : 1, st = o.still ? 0 : t, br = Math.sin(st/900 + (o.phase||0)), sw = Math.sin(st/1300 + (o.phase||0))*1.4;
    ctx.translate(0, 13); ctx.scale(S, S); ctx.translate(0, -13);
    ell(ctx, -2, 13, 20, 4.2, 'rgba(0,0,0,.5)');
    const sk = '#8a8e88', dk = '#3a3e3a', lt = '#b4b8b0', gr = (x0, y0, x1, y1, c1, c2) => { const g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, c1); g.addColorStop(1, c2); return g; };
    // the far leg
    poly(ctx, [[-4, -14], [2, -12], [1, -2], [4.6, 9], [6.4, 12.4], [1.6, 13], [.4, 10], [-3.6, -1]], gr(-4, -14, 4, 13, '#5a5e58', '#1e221e'));
    poly(ctx, [[1.6, 13], [8.4, 13], [9, 11.6], [3, 11.4]], '#2a2e2a');
    // the tail, long and level, swinging a little
    ctx.beginPath(); ctx.moveTo(-10, -22); ctx.quadraticCurveTo(-24, -20 + sw, -38, -14 + sw*1.6); ctx.quadraticCurveTo(-44, -11.4 + sw*1.8, -46, -10.4 + sw*2); ctx.quadraticCurveTo(-36, -9 + sw*1.4, -22, -10 + sw*.6); ctx.quadraticCurveTo(-14, -11, -8, -10); ctx.closePath(); ctx.fillStyle = gr(0, -24, 0, -9, sk, dk); ctx.fill();
    // the body: leaning forward, deep-chested
    ctx.beginPath(); ctx.moveTo(-12, -22); ctx.quadraticCurveTo(-4, -30 + br*.4, 8, -31 + br*.4); ctx.quadraticCurveTo(14, -30, 15, -24); ctx.quadraticCurveTo(13, -14, 4, -9); ctx.quadraticCurveTo(-6, -7, -11, -11); ctx.closePath(); ctx.fillStyle = gr(-10, -30, 6, -8, lt, dk); ctx.fill();
    ctx.fillStyle = 'rgba(30,34,30,.35)'; for (let i=0;i<5;i++) ctx.fillRect(-6 + i*3.2, -26 + i*.4, .6, 9 - i*.6); // ribs under the grey hide
    ctx.fillStyle = 'rgba(220,226,214,.25)'; for (let i=0;i<7;i++) ctx.fillRect(-9 + i*3, -29.4 + Math.abs(i - 3)*.5, 1.6, .7); // the ridge of the spine
    // the neck and head: long, low, a heavy snout, small cold eyes
    ctx.beginPath(); ctx.moveTo(8, -31 + br*.4); ctx.quadraticCurveTo(14, -38 + br, 20, -38.6 + br); ctx.lineTo(23, -34 + br); ctx.quadraticCurveTo(18, -31, 15, -24); ctx.closePath(); ctx.fillStyle = gr(8, -38, 18, -26, sk, dk); ctx.fill();
    ctx.beginPath(); ctx.moveTo(17, -40.4 + br); ctx.quadraticCurveTo(22, -43 + br, 28, -41 + br); ctx.lineTo(34, -38.2 + br); ctx.lineTo(33.6, -36.4 + br); ctx.lineTo(27, -35.6 + br); ctx.lineTo(29, -34 + br); ctx.lineTo(22, -33.4 + br); ctx.quadraticCurveTo(18, -34, 17, -40.4 + br); ctx.closePath(); ctx.fillStyle = gr(18, -43, 24, -33, lt, '#4a4e48'); ctx.fill();
    ctx.strokeStyle = '#141614'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(22.6, -36.6 + br); ctx.lineTo(33.4, -37.2 + br); ctx.stroke(); // the jaw line
    ctx.fillStyle = 'rgba(230,226,210,.8)'; for (let i=0;i<4;i++) poly(ctx, [[25 + i*2, -37 + br], [25.6 + i*2, -35.8 + br], [26.2 + i*2, -37 + br]], 'rgba(230,226,210,.75)');
    ell(ctx, 23.4, -39.6 + br, 1.3, .9, '#0c0e0c'); ctx.fillStyle = `rgba(214,232,226,${.5 + (o.still ? .2 : Math.sin(t/400)*.25)})`; ctx.fillRect(23.6, -40 + br, .9, .6); // a small eye, nothing behind it
    // the arms: short, and where the hands should be, swords
    const arm = (x0, y0, ang, near) => { ctx.save(); ctx.translate(x0, y0); ctx.rotate(ang);
      ctx.beginPath(); ctx.moveTo(-1.6, -1); ctx.lineTo(6, -1.4); ctx.lineTo(6.4, 2); ctx.lineTo(-1.2, 2.2); ctx.closePath(); ctx.fillStyle = near ? sk : '#4e524c'; ctx.fill();
      poly(ctx, [[5.4, -1.2], [24, -.6], [27, .4], [24, 1.4], [5.6, 1.8]], gr(0, -1, 0, 2, near ? '#dcdcd4' : '#8a8a84', near ? '#6a6a64' : '#3a3a36')); B2F.line(ctx, near ? 'rgba(255,255,250,.6)' : 'rgba(255,255,250,.2)', .4, [[6, -.8], [25, -.3]]); ctx.restore(); };
    arm(9, -20, .55 + sw*.03, false);
    // the near leg: a great thigh, a backward knee, three talons
    poly(ctx, [[-6, -16], [4, -14], [3.4, -4], [-.4, 0], [3.8, 10.4], [5.6, 12.6], [.6, 13], [-1.4, 10.6], [-5.2, 1], [-7.6, -8]], gr(-6, -16, 4, 13, lt, '#2e322e'));
    poly(ctx, [[.6, 13], [9.6, 13], [10.4, 11.8], [3.4, 11.2]], '#3a3e3a'); poly(ctx, [[9.6, 13], [11.6, 13.2], [10.4, 11.8]], '#d8d4c4'); poly(ctx, [[-1.4, 13], [-3.6, 13.2], [-1.2, 11.6]], '#d8d4c4');
    arm(11, -18, .3 - sw*.03, true);
    ctx.restore(); },
});

/* ---------------- the recruits' busts (POR, 19): lantern low on the left, a rim on the right ---------------- */
/* Sohra: about twenty, a Rhivi herd-rider; a pale spirit-mark across the eyes, black hair up in a topknot and one braid over the shoulder,
   a fringed hide tunic, three strands of bone beads, the horn bow's tip over her shoulder */
POR.sohra = function(ctx){ const F = {cy:-75, w:11.2, h:19.2, jaw:.72, chin:4.4, skin:'#9a7050', iris:'#24160c', lip:'#8a5440', browCol:'#120a06', browW:1.3, arch:.9, rim:'#c8d0b4', rimA:.2, nose:1, look:.2, smileL:.1, smileR:.3, mouthW:3.6};
  // the horn bow over her right shoulder: pale horn, dark tips, the string
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = PR.lin(ctx, 26, 0, 40, 0, [[0,'#e0ceaa'], [.5,'#b49a6e'], [1,'#4a3a24']]); ctx.lineWidth = 3.2; ctx.beginPath(); ctx.moveTo(24, 4); ctx.quadraticCurveTo(44, -40, 30, -86); ctx.quadraticCurveTo(27, -96, 33, -104); ctx.stroke();
  ctx.strokeStyle = '#1e140c'; ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(31, -100); ctx.lineTo(33, -104); ctx.stroke(); PR.stroke(ctx, 'rgba(230,220,196,.6)', .5, () => { ctx.moveTo(33, -104); ctx.lineTo(20, 4); }); ctx.restore();
  // the tunic: soft hide, a fringed yoke, open at the throat
  PR.neck(ctx, F, 7.6); const B = BP.body(ctx, F, {wide:31, drop:5, trap:1, ny:F.cy + 15.4, cb:F.cy + 20.6, c1:'#a07a52', c2:'#2e1c0c'});
  ctx.save(); B.path(); ctx.clip();
  ctx.fillStyle = PR.lit(ctx, '#8a6440', '#24160a', -30, 26); PR.path(ctx, [[-34, -30], [34, -30], [34, -24], [-34, -24]]); ctx.fill(); // the yoke's seam
  PR.strands(ctx, 40, ['rgba(220,196,150,.65)', 'rgba(150,108,70,.6)', 'rgba(60,34,16,.6)'], .7, 41, (i, r) => { const x = lerp(-31, 31, i/39), y = -26 + (1 - Math.pow((i/39 - .5)*2, 2))*4; return [x, y, x + (r() - .5), y + 3, x + (r() - .5)*1.4, y + 6 + r()*3]; });
  ctx.fillStyle = '#5a3a1e'; ctx.fillRect(-34, -4, 68, 3); ctx.fillStyle = '#b8402a'; ctx.fillRect(-3, -4.6, 6, 4.2); // the belt and its red knot
  PR.soft(ctx, 22, -18, 16, 14, '#000000', .45); PR.soft(ctx, -20, -36, 12, 7, '#ffe0b0', .1);
  ctx.restore(); BP.light(ctx, F, B); BP.band(ctx, B, -.6, 2.2); ctx.fillStyle = PR.lit(ctx, '#7a5634', '#1e1208', -B.nx - 2, B.nx + 2); ctx.fill(); // the hide's rolled neck
  // three strands of bone beads, long, short and between
  [[-46, 10, 9], [-43, 7, 13], [-40, 5, 17]].forEach(([y0, w, n], j) => { for (let i=0;i<n;i++){ const k = i/(n - 1), x = lerp(-w*1.6, w*1.6, k), y = y0 + Math.sin(k*Math.PI)*w*.9; ell(ctx, x, y, 1.2, 1.1, PR.rad(ctx, x - .4, y - .4, .1, 1.4, [[0, j === 1 ? '#f4ecd8' : '#e8dcc0'], [1, '#6a5e48']])); } });
  F.under = (ctx, F) => { PR.soft(ctx, -6, F.cy + 7, 4, 2, '#4a3018', .2); };
  PR.face(ctx, F);
  // the spirit-mark: white clay across the eyes and the bridge of the nose, thin enough that the skin shows through, the eyes dark in it
  { const u = F.h/20, y0 = F.cy - 3.6*u, y1 = F.cy + 1.4*u; ctx.save(); ctx.beginPath(); ctx.ellipse(0, F.cy + .4*u, F.w + .6, 22*u, 0, 0, 7); ctx.clip();
    ctx.fillStyle = PR.lin(ctx, -F.w, 0, F.w, 0, [[0,'rgba(244,240,228,.78)'], [.55,'rgba(222,218,206,.7)'], [1,'rgba(150,146,138,.6)']]); ctx.beginPath(); ctx.moveTo(-F.w - 1, y0 + .6); ctx.quadraticCurveTo(0, y0 - .8, F.w + 1, y0 + .2); ctx.lineTo(F.w + 1, y1); ctx.quadraticCurveTo(0, y1 + 1.2, -F.w - 1, y1 + .4); ctx.closePath(); ctx.fill();
    PR.stroke(ctx, 'rgba(160,150,130,.4)', .4, () => { for (let i=0;i<6;i++){ const x = -F.w + i*F.w*.4; ctx.moveTo(x, y1 + .4); ctx.lineTo(x + .6, y1 + 1.6 + (i%2)); } }); // where it ran a little
    [-1, 1].forEach(sd => PR.eye(ctx, F, sd)); ctx.restore(); }
  // black hair, drawn up tight into a topknot; one long braid over the left shoulder
  const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-11.8, F.cy - 1); ctx.bezierCurveTo(-13, top + 2, -6.4, top - 1.6, 0, top - 1.2); ctx.bezierCurveTo(6.4, top - 1.6, 13, top + 2, 11.8, F.cy - 1); ctx.quadraticCurveTo(10, F.cy - 11, 4, F.cy - 13.6); ctx.quadraticCurveTo(0, F.cy - 15, -4, F.cy - 13.6); ctx.quadraticCurveTo(-10, F.cy - 11, -11.8, F.cy - 1);
  ctx.fillStyle = PR.lin(ctx, -13, 0, 13, 0, [[0,'#3a3232'], [.4,'#141010'], [1,'#040303']]); ctx.fill();
  PR.strands(ctx, 30, ['rgba(110,100,110,.4)', '#1a1414', '#0a0808'], .5, 57, (i, r) => { const sd = i%2 ? 1 : -1; return [sd*(10 + r()*2), F.cy - 2 - r()*4, sd*7, top + 1, sd*r()*2, top - 1]; });
  ell(ctx, -1, top - 4.6, 5.4, 4.2, PR.lin(ctx, -6, 0, 5, 0, [[0,'#3a3232'], [.5,'#141010'], [1,'#040303']])); ell(ctx, -1, top - .8, 4, 1.2, '#b8402a'); // the topknot, tied with red
  ell(ctx, 1, top - 8.6, 1.4, 1.4, '#e8dcc0');
  for (let i=0;i<9;i++){ const k = i/8, x = lerp(-11, -19, k) + Math.sin(i*1.3)*.6, y = lerp(F.cy + 2, F.cy + 42, k); ell(ctx, x, y, 3 - k*.6, 3, PR.lin(ctx, x - 3, 0, x + 3, 0, [[0,'#3a3232'], [.5,'#141010'], [1,'#040303']]), .5); PR.stroke(ctx, 'rgba(110,100,110,.35)', .4, () => { ctx.moveTo(x - 2, y - 1); ctx.lineTo(x + 1.6, y + 1); }); } // the braid
  ell(ctx, -19.4, F.cy + 46, 1.6, 1.8, '#e8dcc0');
  return F; };

/* Dannet: a Capan second daughter, twenties, a Grey Sword acolyte; hair shorn close, a strong plain face, a grey surcoat over mail,
   and the rim of the round shield, the boar scraped off it and the wolf's head half painted over */
POR.greysword = function(ctx){ const F = {cy:-77, w:12.6, h:19.8, jaw:.86, chin:5.6, skin:'#c49a7a', iris:'#5a4a36', lip:'#8e5a4e', browCol:'#3a2a1c', browW:1.5, arch:.6, rim:'#b8c0c8', rimA:.18, nose:1.1, look:.1, smileL:-.2, smileR:0, mouthW:3.9, age:.1};
  // the shield behind her left shoulder
  ctx.save(); ctx.translate(-40, -38); ell(ctx, 0, 0, 27, 29, '#141210'); ell(ctx, 0, 0, 24.6, 26.6, PR.lin(ctx, -24, -26, 20, 26, [[0,'#8a8274'], [.5,'#5a5448'], [1,'#1a1814']]));
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 24.6, 26.6, 0, 0, 7); ctx.clip();
  PR.soft(ctx, -6, 2, 14, 10, '#7a4a2a', .5); PR.stroke(ctx, 'rgba(190,176,150,.45)', .5, () => { for (let i=0;i<26;i++){ const r = PR.rng(i + 77), x = -16 + r()*20, y = -8 + r()*18; ctx.moveTo(x, y); ctx.lineTo(x + 2 + r()*5, y + (r() - .5)*2); } }); // where the boar was, scraped to the wood
  const wolf = () => { ctx.beginPath(); [[-6, -4], [-3, -18], [2, -9], [5, -17], [8, -7], [12, -6], [20, -1], [21, 2.4], [16, 4.4], [9, 6], [4, 14], [-7, 15]].forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); };
  wolf(); ctx.strokeStyle = 'rgba(220,224,226,.65)'; ctx.lineWidth = .8; ctx.stroke(); // the wolf, drawn in charcoal-white...
  ctx.save(); ctx.beginPath(); ctx.rect(4, -30, 30, 60); ctx.clip(); wolf(); ctx.fillStyle = PR.lin(ctx, 4, 0, 22, 0, [[0,'#e4e8ea'], [1,'#9aa0a4']]); ctx.fill(); ctx.restore(); // ...and the front of it painted
  ell(ctx, 11.6, -3.4, 1.4, 1, '#141414'); PR.stroke(ctx, 'rgba(20,20,20,.6)', .6, () => { ctx.moveTo(16, 3); ctx.lineTo(10, 4.4); });
  PR.soft(ctx, 12, 12, 18, 14, '#000000', .4); ctx.restore();
  ctx.strokeStyle = PR.lin(ctx, -26, -28, 26, 28, [[0,'#a8a294'], [.5,'#5a5650'], [1,'#161412']]); ctx.lineWidth = 2.6; ctx.beginPath(); ctx.ellipse(0, 0, 25.8, 27.8, 0, 0, 7); ctx.stroke(); ctx.restore();
  // mail, and the grey surcoat over it
  PR.neck(ctx, F, 9.6); const B = BP.body(ctx, F, {wide:38, drop:3, trap:5, ny:F.cy + 15.6, cb:F.cy + 21, c1:'#8e8c86', c2:'#2e2c2a'});
  ctx.save(); B.path(); ctx.clip(); PR.mail(ctx, -40, 40, -66, 4, '#8e8c86', 1.9); // the mail, an aventail up to the jaw
  ctx.fillStyle = PR.lit(ctx, '#8a8c90', '#26282c', -26, 30); PR.path(ctx, [[-26, -46], [-11, -49], [-6, -36], [0, -30], [6, -36], [11, -49], [26, -46], [30, 4], [-30, 4]]); ctx.fill(); // the surcoat, its neck cut deep
  PR.stroke(ctx, 'rgba(20,20,22,.5)', .7, () => { ctx.moveTo(-11, -49); ctx.lineTo(-6, -36); ctx.lineTo(0, -30); ctx.lineTo(6, -36); ctx.lineTo(11, -49); });
  PR.stroke(ctx, 'rgba(0,0,0,.1)', 1.4, () => { for (let i=0;i<4;i++){ ctx.moveTo(-18 + i*12, -38); ctx.quadraticCurveTo(-20 + i*12.5, -16, -21 + i*13, 4); } }); // its folds
  ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-32, -6, 64, 3); ctx.fillStyle = '#9a9488'; ctx.fillRect(-2.4, -6.4, 4.8, 3.8); // the belt
  PR.soft(ctx, 26, -18, 20, 20, '#000000', .45); PR.soft(ctx, -20, -38, 12, 7, '#ffe8c8', .1);
  ctx.restore(); BP.light(ctx, F, B);
  F.under = (ctx, F) => { PR.soft(ctx, -6, F.cy + 7, 4, 2, '#5a3a24', .18); };
  PR.face(ctx, F);
  // hair shorn close: a dark cap fitted to the skull, the scalp showing through at the edges
  const u = F.h/20, top = F.cy - 21*u; ctx.save(); ctx.beginPath(); ctx.moveTo(-F.w - .4, F.cy - 2); ctx.bezierCurveTo(-F.w - 1, top + 3, -6, top - 1.4, 0, top - 1); ctx.bezierCurveTo(6, top - 1.4, F.w + 1, top + 3, F.w + .4, F.cy - 2);
  ctx.quadraticCurveTo(F.w - 1, F.cy - 9, 7, F.cy - 12.4); ctx.quadraticCurveTo(0, F.cy - 14.6, -7, F.cy - 12.4); ctx.quadraticCurveTo(-F.w + 1, F.cy - 9, -F.w - .4, F.cy - 2); ctx.closePath();
  ctx.fillStyle = PR.lin(ctx, -F.w, 0, F.w, 0, [[0,'#5a4432'], [.45,'#2e2218'], [1,'#0e0a06']]); ctx.fill(); ctx.clip();
  ctx.fillStyle = 'rgba(196,154,122,.22)'; for (let i=0;i<220;i++){ const r = PR.rng(i + 300), x = (r() - .5)*F.w*2.2, y = top - 1 + r()*(F.cy - top); ctx.fillRect(x, y, .45, .45); } // the scalp through the stubble
  ctx.restore();
  return F; };

/* ---------------- Book Three's cards: the picture panels (20 drawCard calls CARDART[id]) ----------------
   Each paints inside {px, py, pw, ph}; gy is the ground line, t the time for the slow movement. The three cards of High House Chains,
   new in the Deck this year and the Crippled God's, wear a frame of their own: iron links over the gold, rust, a dull red-brown. */
{
  const frame = (P) => { const X = x => P.px + x / 100 * P.pw, Y = y => P.py + y / 100 * P.ph, u = P.pw / 100; return {X, Y, u}; };
  const sky = (ctx, P, c0, c1) => { const g = ctx.createLinearGradient(0, P.py, 0, P.gy); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; ctx.fillRect(P.px, P.py, P.pw, P.gy - P.py); };
  const stars = (ctx, P, n, col, t, seed = 1) => { for (let i = 0; i < n; i++) { ctx.fillStyle = `rgba(${col},${.25 + Math.sin(t/800 + i*2.3)*.2})`; ctx.fillRect(P.px + hash(i, 40 + seed)*P.pw, P.py + hash(i, 41 + seed)*(P.gy - P.py)*.6, 1.2, 1.2); } };
  /* a dull chain hanging across the panel: links alternately face-on and edge-on */
  const chain = (ctx, x0, y0, x1, y1, n, r, col = '#6a5a50', sag = 0) => { for (let i = 0; i <= n; i++) { const k = i/n, x = lerp(x0, x1, k), y = lerp(y0, y1, k) + Math.sin(k*Math.PI)*sag, a = Math.atan2(y1 - y0 + Math.cos(k*Math.PI)*sag*Math.PI/n*n/(n || 1)*.0, x1 - x0);
      ctx.save(); ctx.translate(x, y); ctx.rotate(a); if (i % 2) { ctx.fillStyle = col; ctx.fillRect(-r, -r*.22, r*2, r*.44); } else { ctx.strokeStyle = col; ctx.lineWidth = r*.42; ctx.beginPath(); ctx.ellipse(0, 0, r, r*.62, 0, 0, 7); ctx.stroke(); ctx.strokeStyle = 'rgba(220,190,160,.25)'; ctx.lineWidth = r*.14; ctx.beginPath(); ctx.ellipse(0, -r*.1, r*.9, r*.5, 0, Math.PI*1.1, Math.PI*1.9); ctx.stroke(); } ctx.restore(); } };

  /* Knight of High House Dark: a tall figure in black armour facing us, the black sword point-down before him, both hands on the pommel; a night with no moon in it */
  CARDART.b3c_knight = (ctx, P) => { const {X, Y, u} = frame(P), t = P.t;
    sky(ctx, P, '#05040a', '#141022'); stars(ctx, P, 30, '210,200,250', t);
    glow(ctx, P.cx, Y(42), 40*u, '#7a66c0', .16 + Math.sin(t/1100)*.04);
    ctx.fillStyle = '#07060b'; ctx.fillRect(P.px, P.gy - 4*u, P.pw, P.ph); // black ground
    for (let i = 0; i < 8; i++) { const k = ((t/4000) + i/8) % 1; ell(ctx, P.cx + Math.sin(i*1.9 + t/1500)*(10 + k*14)*u, P.gy - 4*u - k*34*u, (3 + k*6)*u, (1.6 + k*3)*u, `rgba(30,26,46,${.5*(1 - k)})`); } // smoke off the blade
    const cx = P.cx, top = Y(14);
    poly(ctx, [[cx - 20*u, P.gy - 2*u], [cx - 16*u, top + 22*u], [cx - 11*u, top + 13*u], [cx - 5*u, top + 10*u], [cx + 5*u, top + 10*u], [cx + 11*u, top + 13*u], [cx + 16*u, top + 22*u], [cx + 20*u, P.gy - 2*u]], '#0b0a12'); // the cloak
    poly(ctx, [[cx - 11*u, top + 13*u], [cx + 11*u, top + 13*u], [cx + 9*u, top + 46*u], [cx - 9*u, top + 46*u]], PR.lin(ctx, cx - 11*u, 0, cx + 11*u, 0, [[0,'#3a3650'], [.4,'#1a1826'], [1,'#06050a']])); // black plate
    ctx.strokeStyle = 'rgba(160,150,210,.3)'; ctx.lineWidth = .8; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(cx - 9*u, top + (22 + i*6)*u); ctx.lineTo(cx + 9*u, top + (22 + i*6)*u); ctx.stroke(); }
    ell(ctx, cx - 12*u, top + 15*u, 5*u, 3.6*u, '#2a2838'); ell(ctx, cx + 12*u, top + 15*u, 5*u, 3.6*u, '#12101a'); // pauldrons
    ell(ctx, cx, top + 6*u, 5.4*u, 6.4*u, PR.lin(ctx, cx - 5*u, 0, cx + 5*u, 0, [[0,'#3a3650'], [1,'#06050a']])); ctx.fillStyle = '#020203'; ctx.fillRect(cx - 3.6*u, top + 5*u, 7.2*u, 1.6*u); // the helm, a slit
    ctx.fillStyle = `rgba(190,176,250,${.5 + Math.sin(t/900)*.25})`; ctx.fillRect(cx - 2.6*u, top + 5.4*u, 1.4*u, .8*u); ctx.fillRect(cx + 1.2*u, top + 5.4*u, 1.4*u, .8*u);
    ctx.strokeStyle = '#020203'; ctx.lineWidth = 3.4*u; ctx.beginPath(); ctx.moveTo(cx, top + 30*u); ctx.lineTo(cx, P.gy + 2*u); ctx.stroke(); ctx.strokeStyle = 'rgba(150,138,210,.45)'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(cx - 1*u, top + 34*u); ctx.lineTo(cx - 1*u, P.gy); ctx.stroke(); // the black sword
    ctx.fillStyle = '#16141e'; ctx.fillRect(cx - 9*u, top + 29*u, 18*u, 2.4*u); ell(ctx, cx, top + 26*u, 4.4*u, 3*u, '#2a2838'); // crossguard, hands on the pommel
    ctx.strokeStyle = 'rgba(170,150,240,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - 20*u, P.gy - 2*u); ctx.lineTo(cx - 16*u, top + 22*u); ctx.lineTo(cx - 11*u, top + 13*u); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, top + 6*u, 5.6*u, Math.PI*.8, Math.PI*1.5); ctx.stroke(); // a violet edge of light down one side
    glow(ctx, cx, top + 26*u, 14*u, P.hue, .12); };

  /* Soldier of High House Life: a soldier at rest behind a tall shield, a green shoot grown up through the rim of it, new grass at her feet, a dawn coming */
  CARDART.b3c_lifesoldier = (ctx, P) => { const {X, Y, u} = frame(P), t = P.t;
    sky(ctx, P, '#1a2230', '#c8b088'); glow(ctx, X(70), P.gy - 4*u, 50*u, '#f0d8a0', .35 + Math.sin(t/1400)*.05);
    for (let i = 0; i < 4; i++) ell(ctx, X(20 + i*22), Y(26 + i*7), 16*u, 1.6*u, 'rgba(240,220,180,.18)'); // cloud bars
    poly(ctx, [[P.px, P.gy - 10*u], [X(30), P.gy - 16*u], [X(64), P.gy - 12*u], [X(100), P.gy - 18*u], [X(100), P.py + P.ph], [P.px, P.py + P.ph]], '#2e3a22'); // low hills
    ctx.fillStyle = '#243018'; ctx.fillRect(P.px, P.gy - 4*u, P.pw, P.ph);
    ctx.strokeStyle = '#6a9a48'; ctx.lineWidth = 1; for (let i = 0; i < 40; i++) { const x = X(hash(i, 51)*100), h = (2 + hash(i, 52)*4)*u, w = Math.sin(t/1000 + i)*u*.6; ctx.beginPath(); ctx.moveTo(x, P.gy); ctx.quadraticCurveTo(x + w, P.gy - h*.6, x + w*1.6, P.gy - h); ctx.stroke(); } // new grass
    const cx = X(48), fy = P.gy - 1*u;
    ctx.fillStyle = '#3a3024'; ctx.fillRect(cx - 5*u, fy - 14*u, 3.6*u, 14*u); ctx.fillRect(cx + 1.4*u, fy - 14*u, 3.6*u, 14*u); // legs
    poly(ctx, [[cx - 7*u, fy - 38*u], [cx + 7*u, fy - 38*u], [cx + 7.6*u, fy - 13*u], [cx - 7.6*u, fy - 13*u]], PR.lin(ctx, cx - 7*u, 0, cx + 7*u, 0, [[0,'#a8a088'], [1,'#4a4434']])); // a mail shirt, a green tabard over it
    poly(ctx, [[cx - 4*u, fy - 38*u], [cx + 4*u, fy - 38*u], [cx + 5*u, fy - 12*u], [cx - 5*u, fy - 12*u]], PR.lin(ctx, cx - 5*u, 0, cx + 5*u, 0, [[0,'#6a8a4a'], [1,'#2a3a1c']]));
    ell(ctx, cx, fy - 43*u, 4.4*u, 5*u, '#b08a6a'); ctx.fillStyle = '#4a3a28'; ctx.beginPath(); ctx.arc(cx, fy - 44.4*u, 4.8*u, Math.PI, 0); ctx.fill(); // head, bare, hair tied back
    ctx.fillStyle = 'rgba(30,20,12,.8)'; ctx.fillRect(cx + .6*u, fy - 43.6*u, 1.2*u, .9*u); ctx.fillRect(cx + 3*u, fy - 43.6*u, 1.2*u, .9*u);
    const sx = cx - 13*u, sy = fy - 34*u; poly(ctx, [[sx - 8*u, sy], [sx + 8*u, sy], [sx + 8*u, sy + 24*u], [sx, sy + 32*u], [sx - 8*u, sy + 24*u]], PR.lin(ctx, sx - 8*u, 0, sx + 8*u, 0, [[0,'#d8ccaa'], [1,'#6a6248']])); // the tall shield, grounded
    ctx.strokeStyle = '#2a2418'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sx - 8*u, sy); ctx.lineTo(sx + 8*u, sy); ctx.lineTo(sx + 8*u, sy + 24*u); ctx.lineTo(sx, sy + 32*u); ctx.lineTo(sx - 8*u, sy + 24*u); ctx.closePath(); ctx.stroke();
    ctx.strokeStyle = '#4a7a30'; ctx.lineWidth = 1.4*u; ctx.beginPath(); ctx.moveTo(sx + 5*u, fy); ctx.quadraticCurveTo(sx + 12*u, sy + 10*u, sx + 6*u, sy - 6*u); ctx.stroke(); // a shoot, grown up past the shield's rim
    [[sx + 9*u, sy + 8*u, .6], [sx + 7*u, sy - 1*u, -.5], [sx + 6.4*u, sy - 6*u, .2]].forEach(([x, y, r]) => ell(ctx, x, y, 3*u, 1.4*u, '#7aaa4a', r + Math.sin(t/900)*.1)); // its leaves
    glow(ctx, sx + 6*u, sy - 4*u, 12*u, '#c8e8a0', .2 + Math.sin(t/800)*.06); };

  /* The Gate (High House Death): a low door in a black wall, ajar, a white light behind it; a soldier half through it, turning back */
  CARDART.b3c_gate = (ctx, P) => { const {X, Y, u} = frame(P), t = P.t;
    sky(ctx, P, '#2a2c2a', '#585c56'); ctx.fillStyle = '#3a3c38'; ctx.fillRect(P.px, P.gy - 4*u, P.pw, P.ph); // a grey plain under a grey sky
    poly(ctx, [[P.px, Y(30)], [X(100), Y(26)], [X(100), P.gy - 3*u], [P.px, P.gy - 3*u]], '#121412'); // the wall, the length of the world
    for (let i = 0; i < 8; i++) { ctx.fillStyle = 'rgba(80,84,78,.35)'; ctx.fillRect(P.px, Y(34 + i*6), P.pw, .7); } // its courses
    const dx = X(36), dw = 28*u, dt = Y(40), db = P.gy - 3*u;
    ctx.beginPath(); ctx.moveTo(dx, db); ctx.lineTo(dx, dt + 8*u); ctx.quadraticCurveTo(dx + dw/2, dt - 6*u, dx + dw, dt + 8*u); ctx.lineTo(dx + dw, db); ctx.closePath(); ctx.fillStyle = PR.lin(ctx, dx, 0, dx + dw, 0, [[0,'#ffffff'], [.6,'#f0f2ec'], [1,'#c8ccc4']]); ctx.fill(); // the light through it
    glow(ctx, dx + dw/2, dt + 24*u, 40*u, '#f4f6f0', .3 + Math.sin(t/1300)*.06);
    poly(ctx, [[dx + dw, db], [dx + dw, dt + 8*u], [dx + dw + 12*u, dt + 12*u], [dx + dw + 12*u, db + 2*u]], '#2a2c28'); // the door, swung open
    ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(dx + dw + 1*u, dt + (16 + i*10)*u); ctx.lineTo(dx + dw + 11*u, dt + (19 + i*10)*u); ctx.stroke(); }
    ell(ctx, dx + dw/2, db + 1*u, 26*u, 3*u, 'rgba(240,242,236,.25)'); // the light on the ground
    const fx = dx + dw*.62, fy = db; ctx.fillStyle = '#141412'; ctx.fillRect(fx - 3.6*u, fy - 12*u, 2.8*u, 12*u); ctx.fillRect(fx + .6*u, fy - 12*u, 2.8*u, 12*u); // a soldier in the doorway, dark against the white
    poly(ctx, [[fx - 5*u, fy - 26*u], [fx + 5*u, fy - 26*u], [fx + 5.6*u, fy - 11*u], [fx - 5.6*u, fy - 11*u]], '#141412'); ell(ctx, fx - 1*u, fy - 30*u, 3.6*u, 4*u, '#141412'); // turning back toward us
    ctx.strokeStyle = '#141412'; ctx.lineWidth = 2*u; ctx.beginPath(); ctx.moveTo(fx - 5*u, fy - 24*u); ctx.lineTo(fx - 12*u, fy - 18*u); ctx.stroke(); // a hand on the door's edge
    for (let i = 0; i < 10; i++) { const k = ((t/6000) + i/10) % 1; ctx.fillStyle = `rgba(250,250,246,${.6*(1 - k)})`; ctx.fillRect(dx + hash(i, 61)*dw, db - k*30*u, 1, 1); } };

  /* Obelisk: a standing stone on a frozen plain, rimed with ice, older than anyone's gods; a small figure at its foot for the size of it */
  CARDART.b3c_obelisk = (ctx, P) => { const {X, Y, u} = frame(P), t = P.t;
    sky(ctx, P, '#060a12', '#3a4a5a'); stars(ctx, P, 34, '220,232,250', t, 4);
    for (let i = 0; i < 3; i++) { ctx.fillStyle = `rgba(140,200,230,${.07 + Math.sin(t/1700 + i)*.03})`; ctx.beginPath(); ctx.moveTo(X(-10 + i*20), Y(8)); ctx.quadraticCurveTo(X(40 + i*10), Y(26 - i*4), X(110), Y(14 + i*6)); ctx.lineTo(X(110), Y(20 + i*6)); ctx.quadraticCurveTo(X(40 + i*10), Y(34 - i*4), X(-10 + i*20), Y(14)); ctx.fill(); } // ice-light in the sky
    ctx.fillStyle = '#1e2834'; ctx.fillRect(P.px, P.gy - 4*u, P.pw, P.ph); for (let i = 0; i < 9; i++) ell(ctx, X(hash(i, 71)*100), P.gy - 2*u + hash(i, 72)*8*u, (8 + hash(i, 73)*14)*u, 1.2*u, 'rgba(200,220,240,.12)'); // snow lying
    const cx = P.cx + 4*u, g = PR.lin(ctx, cx - 10*u, 0, cx + 10*u, 0, [[0,'#9aa4ae'], [.45,'#58626c'], [1,'#1e2630']]);
    poly(ctx, [[cx - 10*u, P.gy], [cx - 7*u, Y(16)], [cx - 1*u, Y(10)], [cx + 5*u, Y(14)], [cx + 9*u, P.gy]], g);
    ctx.strokeStyle = 'rgba(230,244,255,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - 7*u, Y(16)); ctx.lineTo(cx - 1*u, Y(10)); ctx.lineTo(cx + 5*u, Y(14)); ctx.stroke(); // rime on the top
    for (let i = 0; i < 12; i++) poly(ctx, [[cx - 9*u + i*1.5*u, Y(30 + (i%3)*14)], [cx - 8.4*u + i*1.5*u, Y(36 + (i%3)*14)], [cx - 7.8*u + i*1.5*u, Y(30 + (i%3)*14)]], 'rgba(220,236,250,.45)'); // icicles where the wind left them
    ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = .8; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(cx - 6*u, Y(22 + i*9)); ctx.lineTo(cx + 4*u, Y(21 + i*9)); ctx.stroke(); } // worn glyphs
    ctx.fillStyle = '#0a0e14'; ctx.fillRect(cx - 18*u, P.gy - 6*u, 1.6*u, 6*u); ell(ctx, cx - 17.2*u, P.gy - 7*u, 1*u, 1.1*u, '#0a0e14'); // someone at the foot of it
    glow(ctx, cx, Y(30), 30*u, '#bfe8ff', .1 + Math.sin(t/1200)*.04); };

  /* Mason of High House Death: a hooded mason fitting the last stone into a doorway, sealing it; cairns on the slope behind */
  CARDART.b3c_mason = (ctx, P) => { const {X, Y, u} = frame(P), t = P.t;
    sky(ctx, P, '#16120e', '#4a3e30'); glow(ctx, X(20), P.gy - 6*u, 40*u, '#d8a060', .2);
    poly(ctx, [[P.px, P.gy - 6*u], [X(40), Y(46)], [X(100), Y(40)], [X(100), P.gy], [P.px, P.gy]], '#241c14'); // the hillside
    [[18, 58], [30, 52], [80, 46], [92, 50]].forEach(([x, y]) => { for (let j = 0; j < 3; j++) ell(ctx, X(x), Y(y) - j*2.6*u, (4 - j)*u, 1.6*u, '#3a3024'); }); // cairns
    const wx = X(52), wy = Y(40), ww = 36*u, wh = P.gy - Y(40); ctx.fillStyle = '#4a4034'; ctx.fillRect(wx, wy, ww, wh); // the barrow's stone face
    for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) { const bx = wx + (c + (r%2)*.5)*9*u, by = wy + r*wh/7; if (bx > wx + ww - 3*u) continue; ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = .8; ctx.strokeRect(bx, by, 9*u, wh/7); }
    const ox = wx + 12*u, ow = 12*u, oy = wy + wh*.3; ctx.fillStyle = '#060504'; ctx.fillRect(ox, oy, ow, P.gy - oy); // the doorway, nearly closed
    for (let r = 0; r < 4; r++) { ctx.fillStyle = r % 2 ? '#6a5c4a' : '#5e5242'; ctx.fillRect(ox, P.gy - (r + 1)*wh*.14, ow, wh*.14 - .8); } // the new stones, laid to the knee
    ctx.fillStyle = '#0d0a07'; ctx.fillRect(P.px, P.gy, P.pw, P.ph);
    const mx = X(30), my = P.gy, sw = Math.sin(t/300), lift = Math.max(0, sw);
    poly(ctx, [[mx - 7*u, my], [mx - 8*u, my - 20*u], [mx - 3*u, my - 30*u], [mx + 5*u, my - 30*u], [mx + 8*u, my - 20*u], [mx + 7*u, my]], PR.lin(ctx, mx - 8*u, 0, mx + 8*u, 0, [[0,'#8a6e4e'], [.5,'#4a3c2c'], [1,'#1e1810']])); // the mason, hooded, from behind, lit from the west
    poly(ctx, [[mx - 3*u, my - 30*u], [mx + 1*u, my - 37*u], [mx + 5*u, my - 30*u]], '#5a4834'); ell(ctx, mx + 1*u, my - 31*u, 4*u, 4.4*u, '#5a4834'); ctx.fillStyle = '#a08a66'; ctx.fillRect(mx - 6*u, my - 12*u, 12*u, 2*u); // a dusty sash
    const ha = -1.1 - lift*.9, hx = mx + 5*u, hy = my - 24*u, ex = hx + Math.cos(ha)*13*u, ey = hy + Math.sin(ha)*13*u; ctx.strokeStyle = '#5a4834'; ctx.lineWidth = 2.6*u; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.save(); ctx.translate(ex, ey); ctx.rotate(ha + Math.PI/2); ctx.fillStyle = '#6a5a44'; ctx.fillRect(-4*u, -2.2*u, 8*u, 4.4*u); ctx.restore(); // the mallet
    const sx = ox + 1*u, sy = P.gy - 5*wh*.14 - 2*u + lift*2*u; ctx.fillStyle = '#7a6c58'; ctx.fillRect(sx, sy, ow - 2*u, wh*.13); // the last stone, going in
    for (let i = 0; i < 14; i++) { const k = ((t/7000) + hash(i, 91)) % 1; ell(ctx, X(hash(i, 92)*100), Y(84 - k*70), .7*u, .7*u, `rgba(200,170,130,${.3*(1 - k)})`); } };

  /* The King in Chains (High House Chains): a crowned figure on a broken seat, slumped, chained at the wrists and the neck; behind him a shape too big for the card */
  CARDART.b3c_kingchains = (ctx, P) => { const {X, Y, u} = frame(P), t = P.t;
    sky(ctx, P, '#120806', '#3a1e14'); glow(ctx, P.cx, Y(36), 50*u, '#a04a2a', .18 + Math.sin(t/1600)*.05);
    ctx.fillStyle = 'rgba(8,4,3,.7)'; ctx.beginPath(); ctx.moveTo(X(-10), P.gy); ctx.quadraticCurveTo(X(4), Y(10), X(50), Y(4)); ctx.quadraticCurveTo(X(96), Y(10), X(110), P.gy); ctx.fill(); // the shadow behind him, broken-shouldered, too big
    ctx.fillStyle = '#1a0e0a'; ctx.fillRect(P.px, P.gy - 4*u, P.pw, P.ph);
    const cx = P.cx, sy = P.gy - 3*u;
    poly(ctx, [[cx - 18*u, sy], [cx - 16*u, sy - 46*u], [cx - 10*u, sy - 50*u], [cx - 6*u, sy - 42*u], [cx + 8*u, sy - 48*u], [cx + 16*u, sy - 44*u], [cx + 18*u, sy]], '#2a1a14'); // the seat's back, cracked through
    ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - 6*u, sy - 42*u); ctx.lineTo(cx - 2*u, sy - 20*u); ctx.lineTo(cx - 5*u, sy - 6*u); ctx.stroke();
    poly(ctx, [[cx - 11*u, sy], [cx - 12*u, sy - 18*u], [cx - 9*u, sy - 30*u], [cx - 3*u, sy - 34*u], [cx + 5*u, sy - 33*u], [cx + 10*u, sy - 28*u], [cx + 12*u, sy - 16*u], [cx + 12*u, sy]], PR.lin(ctx, cx - 12*u, 0, cx + 12*u, 0, [[0,'#6a3a2a'], [.5,'#3a1e14'], [1,'#120806']])); // a robe once rich, slumped
    ell(ctx, cx + 2*u, sy - 36*u, 4.6*u, 5*u, '#8a6a58'); ctx.fillStyle = 'rgba(20,10,6,.6)'; ctx.fillRect(cx - 1*u, sy - 37*u, 6*u, 1.2*u); // the head, bowed
    poly(ctx, [[cx - 3*u, sy - 41*u], [cx - 2*u, sy - 45*u], [cx, sy - 42.4*u], [cx + 2*u, sy - 46*u], [cx + 4*u, sy - 42.4*u], [cx + 6*u, sy - 45*u], [cx + 7*u, sy - 41*u]], '#b08a3a'); // a crown, gone dull
    ell(ctx, cx - 6*u, sy - 14*u, 2.6*u, 2*u, '#8a6a58'); ell(ctx, cx + 7*u, sy - 14*u, 2.6*u, 2*u, '#7a5a48'); ctx.fillStyle = '#4a3a34'; ctx.fillRect(cx - 9*u, sy - 15.6*u, 5*u, 3*u); ctx.fillRect(cx + 5*u, sy - 15.6*u, 5*u, 3*u); // manacles
    chain(ctx, cx - 8*u, sy - 14*u, X(4), P.gy - 1*u, 9, 2*u, '#5a4a40', 6*u); chain(ctx, cx + 8*u, sy - 14*u, X(96), P.gy - 1*u, 9, 2*u, '#5a4a40', 6*u); // chained to the ground
    chain(ctx, cx + 2*u, sy - 31*u, cx + 26*u, Y(4), 10, 1.7*u, '#4a3a32', 4*u); // and at the neck, up into the dark
    glow(ctx, cx + 2*u, sy - 36*u, 16*u, P.hue, .1); };

  /* The Consort (High House Chains): a woman in a long veil at the empty seat's side, a chain for a girdle, holding out a cup */
  CARDART.b3c_consort = (ctx, P) => { const {X, Y, u} = frame(P), t = P.t;
    sky(ctx, P, '#140a08', '#40241a'); glow(ctx, X(40), Y(40), 44*u, '#b0603a', .16 + Math.sin(t/1500)*.04);
    ctx.fillStyle = '#1c100c'; ctx.fillRect(P.px, P.gy - 4*u, P.pw, P.ph);
    const tx = X(66), ty = P.gy - 3*u; poly(ctx, [[tx - 12*u, ty], [tx - 11*u, ty - 40*u], [tx - 6*u, ty - 44*u], [tx + 6*u, ty - 44*u], [tx + 11*u, ty - 40*u], [tx + 12*u, ty]], '#2a1a14'); poly(ctx, [[tx - 9*u, ty - 16*u], [tx + 9*u, ty - 16*u], [tx + 9*u, ty - 12*u], [tx - 9*u, ty - 12*u]], '#3a2418'); // the empty seat
    chain(ctx, tx - 11*u, ty - 30*u, tx + 11*u, ty - 30*u, 8, 1.4*u, '#5a4a40', 3*u);
    const cx = X(36), fy = P.gy - 2*u, w = Math.sin(t/1200)*.8*u;
    poly(ctx, [[cx - 4*u, fy - 46*u], [cx + 4*u, fy - 46*u], [cx + 8*u, fy - 30*u], [cx + 11*u + w, fy], [cx - 11*u + w, fy], [cx - 8*u, fy - 30*u]], PR.lin(ctx, cx - 11*u, 0, cx + 11*u, 0, [[0,'#8a4a34'], [.5,'#5a2a1c'], [1,'#1a0a06']])); // the gown
    ell(ctx, cx, fy - 50*u, 4.2*u, 4.8*u, '#a07a64');
    poly(ctx, [[cx - 4*u, fy - 55*u], [cx + 4*u, fy - 55*u], [cx + 9*u + w*2, fy - 20*u], [cx + 6*u + w*2, fy - 14*u], [cx + 3*u, fy - 40*u], [cx - 3*u, fy - 40*u], [cx - 7*u, fy - 20*u], [cx - 9*u, fy - 26*u]], 'rgba(200,170,150,.38)'); // the veil, to the knee
    chain(ctx, cx - 7*u, fy - 30*u, cx + 7*u, fy - 30*u, 7, 1.2*u, '#7a6658', 1.6*u); // a chain for a girdle
    ctx.strokeStyle = '#7a5a48'; ctx.lineWidth = 2*u; ctx.beginPath(); ctx.moveTo(cx + 4*u, fy - 40*u); ctx.lineTo(cx + 12*u, fy - 34*u); ctx.stroke(); // an arm, held out
    poly(ctx, [[cx + 11*u, fy - 39*u], [cx + 17*u, fy - 39*u], [cx + 15.6*u, fy - 35*u], [cx + 12.4*u, fy - 35*u]], '#b08a3a'); ctx.fillStyle = '#b08a3a'; ctx.fillRect(cx + 13.6*u, fy - 35*u, .8*u, 2.4*u); ctx.fillRect(cx + 12.4*u, fy - 32.8*u, 3.2*u, .8*u); // the cup
    ell(ctx, cx + 14*u, fy - 39*u, 2.4*u, .6*u, '#3a0e08'); glow(ctx, cx + 14*u, fy - 39*u, 10*u, P.hue, .14 + Math.sin(t/700)*.05); };

  /* The Leper (High House Chains): a figure wrapped in rags and bandages, a bell in one hand, a staff in the other, walking a road no one else is on */
  CARDART.b3c_leper = (ctx, P) => { const {X, Y, u} = frame(P), t = P.t;
    sky(ctx, P, '#2a2418', '#6a5a40'); glow(ctx, X(20), Y(60), 34*u, '#d8c090', .14);
    ctx.fillStyle = '#2a2216'; ctx.fillRect(P.px, P.gy - 4*u, P.pw, P.ph);
    poly(ctx, [[X(40), P.gy - 4*u], [X(56), P.gy - 4*u], [X(90), P.py + P.ph], [X(10), P.py + P.ph]], '#3a3020'); // the road, coming toward us
    for (let i = 0; i < 5; i++) { ctx.fillStyle = '#1a140c'; ctx.fillRect(X(6 + i*21), P.gy - (6 + hash(i, 3)*8)*u, .9*u, (6 + hash(i, 3)*8)*u); } // dead stalks by the road
    const cx = P.cx, fy = P.gy + 6*u, st = Math.sin(t/900)*1.2*u;
    ctx.strokeStyle = '#4a3a24'; ctx.lineWidth = 1.6*u; ctx.beginPath(); ctx.moveTo(cx + 11*u, fy); ctx.lineTo(cx + 9*u, fy - 52*u); ctx.stroke(); // the staff
    poly(ctx, [[cx - 6*u, fy - 40*u], [cx + 6*u, fy - 40*u], [cx + 9*u, fy - 6*u], [cx + 4*u, fy - 2*u], [cx + 1*u, fy - 6*u], [cx - 3*u, fy - 1*u], [cx - 9*u, fy - 6*u]], PR.lin(ctx, cx - 9*u, 0, cx + 9*u, 0, [[0,'#8a7c62'], [1,'#2a2418']])); // rags
    ctx.strokeStyle = 'rgba(220,206,170,.55)'; ctx.lineWidth = 1.1*u; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(cx - 6*u, fy - (36 - i*6)*u); ctx.lineTo(cx + 6*u, fy - (34 - i*6)*u); ctx.stroke(); } // bandages wound round
    ell(ctx, cx, fy - 45*u, 4.4*u, 5*u, '#c8b896'); ctx.strokeStyle = 'rgba(120,100,70,.6)'; ctx.lineWidth = .8; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(cx - 4.2*u, fy - (47 - i*2.4)*u); ctx.lineTo(cx + 4.2*u, fy - (46 - i*2.4)*u); ctx.stroke(); } // the head wrapped
    ctx.fillStyle = '#100c08'; ctx.fillRect(cx - .4*u, fy - 46.4*u, 4*u, 1.4*u); ctx.fillStyle = 'rgba(200,190,160,.7)'; ctx.fillRect(cx + .6*u, fy - 46*u, .9*u, .7*u); ctx.fillRect(cx + 2.4*u, fy - 46*u, .9*u, .7*u); // a slit for the eyes
    poly(ctx, [[cx - 6*u, fy - 50*u], [cx + 6*u, fy - 50*u], [cx + 8*u, fy - 38*u], [cx - 8*u, fy - 38*u]], 'rgba(90,76,54,.85)'); // a hood
    ctx.strokeStyle = '#8a7c62'; ctx.lineWidth = 2*u; ctx.beginPath(); ctx.moveTo(cx - 5*u, fy - 36*u); ctx.lineTo(cx - 12*u, fy - 30*u); ctx.stroke();
    const bx = cx - 13*u + st*.4, by = fy - 27*u; ctx.strokeStyle = '#3a3020'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(cx - 12*u, fy - 30*u); ctx.lineTo(bx, by); ctx.stroke(); poly(ctx, [[bx - 2.4*u, by + 4*u], [bx - 1.6*u, by], [bx + 1.6*u, by], [bx + 2.4*u, by + 4*u]], '#8a7a4a'); ell(ctx, bx + st*.3, by + 4.6*u, .8*u, .8*u, '#3a3020'); // the bell
    if (Math.abs(st) > 1) for (let i = 0; i < 3; i++) { ctx.strokeStyle = `rgba(220,200,150,${.35 - i*.1})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.arc(bx, by + 3*u, (5 + i*3)*u, Math.PI*.7, Math.PI*1.3); ctx.stroke(); } // and its sound
    glow(ctx, cx, fy - 30*u, 22*u, P.hue, .08); };

  /* High House Chains' frame: iron links laid over the gold border, rust in them, a dull red-brown ground between */
  const CHAINS = new Set(['b3c_kingchains', 'b3c_consort', 'b3c_leper']);
  const chainFrame = (ctx, W, H, t) => { ctx.save(); ctx.beginPath(); ctx.roundRect ? ctx.roundRect(0, 0, W, H, W*.06) : ctx.rect(0, 0, W, H); ctx.clip();
    ctx.strokeStyle = '#3a1e16'; ctx.lineWidth = W*.034; ctx.strokeRect(W*.05, H*.035, W*.9, H*.93); // the gold dulled to red-brown
    ctx.strokeStyle = 'rgba(120,60,40,.6)'; ctx.lineWidth = 1; ctx.strokeRect(W*.075, H*.052, W*.85, H*.896);
    const r = W*.024, side = (x0, y0, x1, y1) => { const n = Math.round(Math.hypot(x1 - x0, y1 - y0)/(r*1.7)); for (let i = 0; i <= n; i++) { const k = i/n, x = lerp(x0, x1, k), y = lerp(y0, y1, k), a = Math.atan2(y1 - y0, x1 - x0);
      ctx.save(); ctx.translate(x, y); ctx.rotate(a); if (i % 2) { ctx.fillStyle = '#4a3a32'; ctx.fillRect(-r, -r*.24, r*2, r*.48); ctx.fillStyle = 'rgba(200,170,140,.25)'; ctx.fillRect(-r*.8, -r*.24, r*1.6, r*.12); }
      else { ctx.strokeStyle = '#5e4c42'; ctx.lineWidth = r*.46; ctx.beginPath(); ctx.ellipse(0, 0, r, r*.6, 0, 0, 7); ctx.stroke(); ctx.strokeStyle = 'rgba(220,190,160,.28)'; ctx.lineWidth = r*.14; ctx.beginPath(); ctx.ellipse(0, -r*.1, r*.88, r*.48, 0, Math.PI*1.1, Math.PI*1.9); ctx.stroke(); }
      if (hash(i, Math.round(x0 + y0)) > .7) { ctx.fillStyle = 'rgba(140,60,30,.55)'; ctx.fillRect(-r*.3, r*.1, r*.5, r*.4); } ctx.restore(); } }; // rust
    const x0 = W*.05, y0 = H*.035, x1 = W*.95, y1 = H*.965; side(x0, y0, x1, y0); side(x1, y0, x1, y1); side(x1, y1, x0, y1); side(x0, y1, x0, y0);
    [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].forEach(([x, y]) => { ell(ctx, x, y, W*.04, W*.04, '#2a1a14'); ctx.strokeStyle = '#6a564a'; ctx.lineWidth = W*.012; ctx.beginPath(); ctx.arc(x, y, W*.03, 0, 7); ctx.stroke(); ell(ctx, x, y, W*.01, W*.01, '#0e0806'); }); // a shackle at each corner
    ctx.restore(); };
  const drawCardB2 = drawCard; drawCard = function(ctx, id, W, H, face, t = 0){ drawCardB2(ctx, id, W, H, face, t); if (face && CHAINS.has(id)) chainFrame(ctx, W, H, t); };
}

/* ---------------- ground: TILEX.b3camp — the Host's camp outside Pale in early spring (Chapter 1) ----------------
   Book One's 'pale' and 'camp_night' have no tents, fires, wagons or horse lines as ground, so this is new. Keys:
   '.' trampled mud, ',' new grass, '#' palisade and earthwork (blocks), '=' tent, 'F' fire, 'W' wagon, 'h' horse lines, 'r' rubble of Pale,
   's' a standard; anything else is mud with Book One's exit arrows. dark = dusk/night (fires light their neighbours either way). */
function b3Camp(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y), P = N ? {mud:'#24221e', mudL:'#34302a', wet:'#121418', grass:'#1e2a1c', blade:'#2e3e28', post:'#1a140e', postL:'#3a2e22', earth:'#2a241c', canvas:'#4a4638', canvasD:'#26241c', lit:'200,206,220'}
                                                              : {mud:'#5e5242', mudL:'#7a6c58', wet:'#3a3a3a', grass:'#4e6a36', blade:'#76944e', post:'#4a3624', postL:'#7a5e40', earth:'#6a5a44', canvas:'#c4b898', canvasD:'#7a7058', lit:'255,248,230'};
  const fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const mud = () => { fill(shade(P.mud, (h - .5)*.04)); b2Mottle(ctx, x, y, T, N ? .03 : .07, N ? .22 : .16, P.lit, 1.2);
    ctx.strokeStyle = N ? 'rgba(0,0,0,.3)' : 'rgba(40,30,20,.3)'; ctx.lineWidth = Math.max(1, T*.03); for (let i=0;i<3;i++){ const yy = py + T*(.15 + hash(x,y,i+3)*.7); ctx.beginPath(); ctx.moveTo(px, yy); ctx.quadraticCurveTo(px + T*.5, yy + (hash(x,y,i+5) - .5)*T*.2, px + T, yy + (hash(x,y,i+6) - .5)*T*.1); ctx.stroke(); } // ruts and boot-churn
    if (h > .7) { ell(ctx, px + T*(.3 + hash(x,y,9)*.4), py + T*(.4 + hash(x,y,10)*.3), T*.22, T*.08, P.wet); ctx.fillStyle = N ? 'rgba(160,180,210,.15)' : 'rgba(200,214,230,.35)'; ctx.fillRect(px + T*(.24 + hash(x,y,9)*.4), py + T*(.38 + hash(x,y,10)*.3), T*.14, 1); } // a puddle with the sky in it
    ctx.fillStyle = N ? '#14120f' : '#3e3428'; for (let i=0;i<4;i++) ctx.fillRect(px + hash(x,y,i+20)*T, py + hash(y,x,i+21)*T, Math.max(1, T*.04), Math.max(1, T*.04)); };
  const grass = () => { mud(); b2Soft(ctx, px + T*.5, py + T*.5, T*.7, .8, N ? '30,42,28' : '78,106,54', .9); ctx.strokeStyle = P.blade; ctx.lineWidth = Math.max(1, T*.025);
    for (let i=0;i<9;i++){ const gx = px + hash(x,y,i+30)*T, gy = py + T*(.2 + hash(y,x,i+31)*.75), l = T*(.06 + hash(x,y,i+32)*.08); ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + l*.3, gy - l); ctx.stroke(); } }; // first green coming through
  if (ch === '#') { // the palisade on its bank: sharpened stakes on an earth ramp, the ditch dark before it
    fill(P.earth); b2Mottle(ctx, x, y, T, .05, .2, P.lit); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px, py + T*.82, T, T*.18);
    const n = 4; for (let i=0;i<n;i++){ const sx = px + (i + .5)*T/n + (hash(x,y,i) - .5)*T*.04, w = T*.11, top = py + T*(.02 + hash(x,y,i+4)*.08);
      ctx.fillStyle = P.post; ctx.fillRect(sx - w/2, top + T*.12, w, T*.7); poly(ctx, [[sx - w/2, top + T*.12], [sx, top], [sx + w/2, top + T*.12]], P.post); ctx.fillStyle = P.postL; ctx.fillRect(sx - w/2, top + T*.12, w*.35, T*.7); }
    ctx.strokeStyle = N ? '#2a2016' : '#8a7050'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px, py + T*.36); ctx.lineTo(px + T, py + T*.38); ctx.moveTo(px, py + T*.62); ctx.lineTo(px + T, py + T*.6); ctx.stroke(); // withies binding them
    return; }
  if (ch === ',') grass(); else mud();
  if (ch === '=') { const cx = px + T*.5, by = py + T*.86; ell(ctx, cx + T*.06, by, T*.46, T*.1, 'rgba(0,0,0,.4)'); // a soldiers' tent: ridge pole, canvas to the ground, the flap tied back
    poly(ctx, [[px + T*.06, by], [cx, py + T*.16], [px + T*.94, by]], P.canvas); poly(ctx, [[cx, py + T*.16], [px + T*.94, by], [cx + T*.12, by]], P.canvasD);
    poly(ctx, [[cx - T*.12, by], [cx, py + T*.42], [cx + T*.1, by]], N ? '#0a0908' : '#2a241c'); ctx.strokeStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(80,70,50,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px + T*.06, by); ctx.lineTo(cx, py + T*.16); ctx.lineTo(px + T*.94, by); ctx.stroke();
    ctx.fillStyle = P.post; ctx.fillRect(cx - T*.02, py + T*.08, T*.04, T*.1); B2F.line(ctx, N ? 'rgba(160,150,120,.3)' : 'rgba(90,80,60,.6)', .6, [[px + T*.06, by], [px, py + T*.98]]); }
  else if (ch === 'F') b2Flames(ctx, px + T*.5, py + T*.62, T, 1.1);
  else if (ch === 'W') { ell(ctx, px + T*.54, py + T*.84, T*.46, T*.1, 'rgba(0,0,0,.45)'); // a supply wagon, a tilt over the bed
    ctx.fillStyle = N ? '#2a1e14' : '#6a4a2c'; ctx.fillRect(px + T*.08, py + T*.48, T*.84, T*.24); ctx.fillStyle = N ? '#3e3428' : '#b8ac8a'; ctx.beginPath(); ctx.moveTo(px + T*.1, py + T*.5); ctx.quadraticCurveTo(px + T*.5, py + T*.04, px + T*.9, py + T*.5); ctx.fill();
    ctx.strokeStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(90,80,60,.5)'; ctx.lineWidth = 1; for (let i=1;i<4;i++){ ctx.beginPath(); ctx.moveTo(px + T*(.1 + i*.2), py + T*.5); ctx.quadraticCurveTo(px + T*(.1 + i*.2), py + T*.2, px + T*(.12 + i*.2), py + T*.2); ctx.stroke(); }
    [[.24], [.76]].forEach(([k]) => { ell(ctx, px + T*k, py + T*.76, T*.13, T*.13, N ? '#140e0a' : '#3a2a1a'); ell(ctx, px + T*k, py + T*.76, T*.04, T*.04, N ? '#3a2e22' : '#8a6a44'); }); }
  else if (ch === 'h') { ctx.strokeStyle = P.post; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.lineTo(px + T, py + T*.3); ctx.stroke(); ctx.fillStyle = P.post; ctx.fillRect(px + T*.46, py + T*.22, T*.06, T*.2); // the picket line, and a horse at it
    if (h > .3) { const d = h > .65 ? 1 : -1, cx = px + T*.5, cy = py + T*.62, c = N ? '#1e1812' : ['#5a3a22', '#3a2a1e', '#7a6a58'][Math.floor(h*3) % 3];
      ell(ctx, cx, cy + T*.28, T*.36, T*.07, 'rgba(0,0,0,.4)'); ell(ctx, cx, cy, T*.28, T*.13, c); ctx.fillStyle = c; [[-.2], [-.1], [.12], [.22]].forEach(([k]) => ctx.fillRect(cx + k*T, cy + T*.06, T*.04, T*.2));
      poly(ctx, [[cx + d*T*.2, cy - T*.04], [cx + d*T*.34, cy - T*.26], [cx + d*T*.42, cy - T*.22], [cx + d*T*.28, cy + T*.04]], c); B2F.line(ctx, P.post, .6, [[cx + d*T*.38, cy - T*.22], [cx + d*T*.3, py + T*.3]]); B2F.line(ctx, c, Math.max(1, T*.03), [[cx - d*T*.26, cy - T*.02], [cx - d*T*.34, cy + T*.14]]); }
    ctx.fillStyle = N ? 'rgba(60,70,40,.4)' : 'rgba(150,140,80,.5)'; for (let i=0;i<3;i++) ell(ctx, px + T*(.2 + hash(x,y,i+70)*.6), py + T*.9, T*.06, T*.03, ctx.fillStyle); } // fodder
  else if (ch === 'r') { for (let i=0;i<5;i++){ const bx = px + T*(.1 + hash(x,y,i+40)*.7), by = py + T*(.2 + hash(x,y,i+41)*.6), w = T*(.12 + hash(x,y,i+42)*.18), hh = w*.6; // the rubble of Pale: dressed stone, broken
      ell(ctx, bx + w*.5, by + hh + T*.02, w*.6, hh*.3, 'rgba(0,0,0,.35)'); ctx.fillStyle = N ? '#3a3632' : '#8a8478'; ctx.fillRect(bx, by, w, hh); ctx.fillStyle = N ? '#4a4640' : '#aaa496'; ctx.fillRect(bx, by, w, hh*.3); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; ctx.strokeRect(bx, by, w, hh); }
    if (h > .5) { ctx.fillStyle = N ? 'rgba(20,16,12,.7)' : 'rgba(40,30,24,.5)'; ctx.fillRect(px + T*.5, py + T*.6, T*.3, T*.04); } } // a scorch
  else if (ch === 's') { const cx = px + T*.44; ell(ctx, cx, py + T*.9, T*.16, T*.05, 'rgba(0,0,0,.4)'); ctx.fillStyle = P.post; ctx.fillRect(cx - T*.025, py + T*.02, T*.05, T*.88); ell(ctx, cx, py + T*.03, T*.04, T*.04, '#8d8a86'); // a standard on its pole
    poly(ctx, [[cx + T*.025, py + T*.08], [cx + T*.48, py + T*.11], [cx + T*.42, py + T*.36], [cx + T*.025, py + T*.38]], N ? '#2a1e1e' : '#5a2a24'); ell(ctx, cx + T*.24, py + T*.23, T*.07, T*.07, N ? 'rgba(200,180,140,.3)' : 'rgba(220,200,150,.7)'); }
  else if (ch !== '.' && ch !== ',') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .3 : .12, N ? 3.4 : 2.4);
}
TILEX.b3camp = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3Camp(ctx, ch, x, y, T, !!dark));
TILEX.b3camp_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3Camp(ctx, ch, x, y, T, true));
