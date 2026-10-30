/* ============ Book Five art: the Tiles of the Holds, and the looks of the Sixth Company and its enemies ============
   Tiles (80c's drawCardFlip calls drawHoldTile): square tiles, not cards. Perrit's cadre set is black stone with the image cut into it and
   filled with gold; the tile-woman's is old bone with the lines burnt in. A face carries its Hold above and its name below; the image is
   a few cut lines, and never a being's face (mt-canon §10 rule 41). Backs: Perrit's carved with the Cedance's spiral, the tile-woman's with
   a burnt ring. Looks: a battle figure (FIGX, 18) and a painted bust (POR, 19) for the Letherii sergeant (sgt_mt), Tobet, Thegg, Perrit,
   Ammet, Ruuk, Brune and Pessa, each told apart by silhouette; figures for the Edur warrior and unblooded, the K'risnan, the shadow
   wraith, the Jheck wolf, the bound demon, and Letherii soldiers (deserters, press-gangs). Same rules as the other books: lantern low
   on the left, the squadmate's own colour as a rim on the right. */

/* ---------------- the tiles ---------------- */
/* drawHoldTile(ctx, id, S, face, t): one tile, S pixels square, at the origin (80c's drawCardFlip places and turns it) */
let drawHoldTile = null;
{
  /* each tile's image: line work in a unit box (0..1), drawn with the current stroke and fill */
  const L = (ctx, pts) => { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke(); };
  const GLYPH = {
    b5t_throne(ctx){ L(ctx, [[.36, .82], [.36, .2], [.64, .2], [.64, .82]]); L(ctx, [[.28, .58], [.72, .58]]); L(ctx, [[.3, .58], [.3, .82]]); L(ctx, [[.7, .58], [.7, .82]]); L(ctx, [[.4, .26], [.6, .26]]); },
    b5t_watcher(ctx){ ctx.beginPath(); ctx.moveTo(.3, .86); ctx.lineTo(.3, .34); ctx.arc(.5, .34, .2, Math.PI, 0); ctx.lineTo(.7, .86); ctx.stroke(); ctx.beginPath(); ctx.arc(.5, .48, .05, 0, 7); ctx.fill(); L(ctx, [[.43, .8], [.46, .55], [.54, .55], [.57, .8]]); },
    b5t_walker(ctx){ L(ctx, [[.18, .9], [.47, .3]]); L(ctx, [[.82, .9], [.53, .3]]); L(ctx, [[.47, .3], [.53, .3]]); ctx.beginPath(); ctx.arc(.5, .38, .025, 0, 7); ctx.fill(); L(ctx, [[.5, .41], [.5, .48]]); },
    b5t_saviour(ctx){ L(ctx, [[.08, .62], [.36, .6], [.48, .64]]); [[.48, .64, .82, .52], [.5, .58, .84, .42], [.48, .53, .78, .34], [.45, .5, .66, .3]].forEach(([a, b, c, d]) => L(ctx, [[a, b], [c, d]])); L(ctx, [[.36, .6], [.52, .76], [.62, .74]]); },
    b5t_betrayer(ctx){ [.36, .62].forEach(x => { ctx.beginPath(); ctx.arc(x, .3, .05, 0, 7); ctx.stroke(); L(ctx, [[x, .35], [x, .66]]); L(ctx, [[x, .66], [x - .07, .86]]); L(ctx, [[x, .66], [x + .07, .86]]); }); L(ctx, [[.36, .44], [.62, .44]]); L(ctx, [[.62, .44], [.76, .52]]); L(ctx, [[.72, .5], [.84, .66]]); },
    b5t_boneperch(ctx){ L(ctx, [[.5, .88], [.5, .14]]); [.26, .4, .54].forEach((y, i) => { L(ctx, [[.32 + i * .03, y], [.68 - i * .03, y]]); ctx.beginPath(); ctx.arc(.32 + i * .03, y, .025, 0, 7); ctx.arc(.68 - i * .03, y, .025, 0, 7); ctx.fill(); }); },
    b5t_hunter(ctx){ L(ctx, [[.16, .86], [.84, .18]]); L(ctx, [[.84, .18], [.74, .22], [.8, .28], [.84, .18]]); for (let i = 0; i < 9; i++) { const x = .12 + i * .1; L(ctx, [[x, .9], [x + .03, .72 - (i % 3) * .04]]); } },
    b5t_seer(ctx){ ctx.beginPath(); ctx.ellipse(.5, .55, .14, .08, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(.5, .55, .04, 0, 7); ctx.fill(); [-1, 1].forEach(d => { L(ctx, [[.5 + d * .12, .46], [.5 + d * .22, .22]]); L(ctx, [[.5 + d * .18, .32], [.5 + d * .3, .3]]); L(ctx, [[.5 + d * .2, .26], [.5 + d * .16, .14]]); }); },
    b5t_gate(ctx){ ctx.strokeRect(.22, .24, .14, .62); ctx.strokeRect(.64, .24, .14, .62); ctx.beginPath(); ctx.moveTo(.42, .86); ctx.quadraticCurveTo(.4, .6, .5, .44); ctx.quadraticCurveTo(.56, .6, .52, .7); ctx.quadraticCurveTo(.62, .62, .58, .86); ctx.stroke(); },
    b5t_heartstone(ctx){ ctx.beginPath(); ctx.ellipse(.5, .56, .24, .2, 0, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(.5, .56, .07, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(.5, .56, .13, 0, 7); ctx.stroke(); },
    b5t_wall(ctx){ for (let r = 0; r < 5; r++) { const y = .22 + r * .13; L(ctx, [[.16, y], [.84, y]]); for (let c = 0; c < 4; c++) { const x = .16 + c * .17 + (r % 2 ? .085 : 0); if (x < .84) L(ctx, [[x, y], [x, y + .13]]); } } L(ctx, [[.16, .87], [.84, .87]]); },
    b5t_barrow(ctx){ ctx.beginPath(); ctx.moveTo(.1, .82); ctx.quadraticCurveTo(.5, .4, .9, .82); ctx.stroke(); ctx.strokeRect(.46, .32, .08, .2); L(ctx, [[.1, .82], [.9, .82]]); },
    b5t_seed(ctx){ L(ctx, [[.5, .14], [.76, .4], [.66, .84], [.34, .84], [.24, .4], [.5, .14]]); ctx.beginPath(); ctx.ellipse(.5, .56, .07, .11, .3, 0, 7); ctx.fill(); L(ctx, [[.5, .45], [.54, .34]]); },
    b5t_axe(ctx){ ctx.strokeRect(.22, .66, .56, .2); L(ctx, [[.5, .66], [.62, .22]]); ctx.beginPath(); ctx.moveTo(.6, .28); ctx.quadraticCurveTo(.42, .22, .4, .38); ctx.lineTo(.56, .42); ctx.closePath(); ctx.stroke(); },
    b5t_whitecrow(ctx){ L(ctx, [[.14, .72], [.86, .66]]); ctx.beginPath(); ctx.moveTo(.42, .64); ctx.quadraticCurveTo(.36, .44, .5, .36); ctx.quadraticCurveTo(.6, .3, .66, .36); ctx.lineTo(.74, .36); ctx.lineTo(.66, .4); ctx.quadraticCurveTo(.66, .56, .58, .64); ctx.lineTo(.62, .76); ctx.lineTo(.42, .64); ctx.closePath(); ctx.fill(); },
    b5t_dolmen(ctx){ ctx.strokeRect(.24, .46, .12, .4); ctx.strokeRect(.44, .48, .12, .38); ctx.strokeRect(.64, .46, .12, .4); L(ctx, [[.18, .46], [.82, .4], [.82, .32], [.18, .38], [.18, .46]]); },
  };
  const HOLDW = {'The Empty Hold':'The Empty Hold', 'The Beast Hold':'The Beast Hold', 'The Dragon Hold':'The Dragon Hold', 'The Azath Hold':'The Azath Hold', 'The Hold of Ice':'The Hold of Ice', 'The Fulcra':'The Fulcra', 'The Holds':'Of the Holds'};
  const rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath(); };
  /* the stone or the bone, and its bevel */
  const body = (ctx, S, bone, t) => { rr(ctx, 0, 0, S, S, S * .07); ctx.save(); ctx.clip();
    const g = ctx.createLinearGradient(0, 0, S, S); if (bone) { g.addColorStop(0, '#e6dcc0'); g.addColorStop(.6, '#cbbc96'); g.addColorStop(1, '#a8966e'); } else { g.addColorStop(0, '#2a2a30'); g.addColorStop(.5, '#0e0e12'); g.addColorStop(1, '#050507'); }
    ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
    if (bone) { ctx.strokeStyle = 'rgba(120,96,60,.18)'; ctx.lineWidth = 1; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(0, S * (i / 14) + hash(i, 1, 141) * 6); ctx.bezierCurveTo(S * .3, S * (i / 14) + hash(i, 2, 141) * 9, S * .7, S * (i / 14) - hash(i, 3, 141) * 9, S, S * (i / 14) + hash(i, 4, 141) * 6); ctx.stroke(); } [[0, 0], [S, 0], [0, S], [S, S]].forEach(([x, y], i) => glow(ctx, x, y, S * .3, '#7a6440', .35)); }
    else { const sh = ((t || 0) / 4000) % 1; const hg = ctx.createLinearGradient(S * (sh * 2 - 1), 0, S * (sh * 2 - .4), S); hg.addColorStop(0, 'rgba(255,255,255,0)'); hg.addColorStop(.5, 'rgba(200,210,230,.1)'); hg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = hg; ctx.fillRect(0, 0, S, S); glow(ctx, S * .3, S * .25, S * .35, '#8a8aa0', .12); }
    ctx.restore();
    ctx.strokeStyle = bone ? 'rgba(80,60,30,.55)' : 'rgba(140,140,160,.4)'; ctx.lineWidth = S * .012; rr(ctx, S * .02, S * .02, S * .96, S * .96, S * .06); ctx.stroke(); // the bevel
    ctx.strokeStyle = bone ? 'rgba(255,250,235,.35)' : 'rgba(255,255,255,.12)'; ctx.lineWidth = S * .008; ctx.beginPath(); ctx.moveTo(S * .08, S * .03); ctx.lineTo(S * .92, S * .03); ctx.stroke(); };
  /* face down: Perrit's black stone with the Cedance's spiral cut in; the tile-woman's bone with a burnt ring and a thumb-worn hollow */
  const back = (ctx, S, bone, t) => { body(ctx, S, bone, t); const cx = S / 2, cy = S / 2;
    if (bone) { ctx.strokeStyle = 'rgba(70,40,20,.7)'; ctx.lineWidth = S * .03; ctx.beginPath(); ctx.arc(cx, cy, S * .26, 0, 7); ctx.stroke(); glow(ctx, cx, cy, S * .16, '#6a5030', .3); }
    else { ctx.strokeStyle = 'rgba(201,161,90,.55)'; ctx.lineWidth = S * .016; ctx.beginPath(); for (let a = 0; a < Math.PI * 6; a += .12) { const r = S * .03 + a * S * .019; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; a ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); } };
  drawHoldTile = function(ctx, id, S, face, t = 0){ const bone = DECKBACK_NOW === 'tilewoman'; ctx.save();
    if (!face) { back(ctx, S, bone, t); ctx.restore(); return; }
    const c = CARDS[id] || {name:'?', house:'The Holds', hue:'#a09a8a'}; body(ctx, S, bone, t);
    const ink = bone ? '#4a2e16' : '#d8b070';
    if (!bone) glow(ctx, S * .5, S * .52, S * .38, c.hue, .14 + Math.sin(t / 900) * .04); // the Hold's colour, deep in the stone
    ctx.save(); ctx.translate(S * .18, S * .2); ctx.scale(S * .64, S * .58); ctx.lineWidth = .028; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (!bone) { ctx.strokeStyle = 'rgba(0,0,0,.7)'; ctx.fillStyle = 'rgba(0,0,0,.7)'; ctx.save(); ctx.translate(.01, .012); (GLYPH[id] || GLYPH.b5t_dolmen)(ctx); ctx.restore(); } // the cut, a shadow under the gold
    ctx.strokeStyle = ink; ctx.fillStyle = ink; (GLYPH[id] || GLYPH.b5t_dolmen)(ctx); ctx.restore();
    ctx.fillStyle = bone ? 'rgba(74,46,22,.85)' : 'rgba(216,176,112,.85)'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    let fs = Math.round(S * .085); ctx.font = `${fs}px 'IM Fell English SC', serif`; while (fs > 7 && ctx.measureText(c.name).width > S * .84) { fs--; ctx.font = `${fs}px 'IM Fell English SC', serif`; } ctx.fillText(c.name, S / 2, S * .89);
    ctx.font = `italic ${Math.round(S * .055)}px 'IM Fell English', serif`; ctx.fillStyle = bone ? 'rgba(90,64,36,.7)' : 'rgba(170,160,190,.65)'; ctx.fillText(HOLDW[c.house] || c.house || '', S / 2, S * .1);
    ctx.restore(); };
}

/* ---------------- the squad's battle figures (FIGX, in the ~32px frame drawFigure sets up) ---------------- */
Object.assign(FIGX, {
  /* the Letherii sergeant: scale over a padded coat, the blue-grey cloak, a round shield with the white fingertip on the boss, an open helm */
  sgt_mt(ctx, h, t, o){ const fl = o.still ? 0 : Math.sin(t/260 + (o.phase||0)*2)*.6;
    poly(ctx, [[-5.4,-6],[-8.6,10 + fl],[-3,9],[-2,-6]], '#4a5664'); // the cloak, behind
    h.legs('#2a2a2e'); h.torso('#7a7a76', '#2a2a28', 6.4); ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-6, -4 + i*2.2); ctx.lineTo(6, -4 + i*2.2); } ctx.stroke(); // scale
    ctx.fillStyle = '#d6a24a'; ctx.fillRect(3, -6, 3.6, 1.3); ctx.fillRect(4.6, -6, 1.3, 3); // the sergeant's gold, at the shoulder
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-6.2, 3, 12.4, 1.4); ell(ctx, 2.4, 4.6, 1.4, 1.8, '#5a4428'); // the belt, the purse
    h.head('#b08a6a', 4.4, -11.2); h.look('rgba(24,14,10,.85)', -11.4);
    ctx.beginPath(); ctx.arc(0, -12.4, 5.2, Math.PI, 0); ctx.fillStyle = h.armor('#9a9a96', '#2e2e2c'); ctx.fill(); ctx.fillRect(-5.6, -12.8, 11.2, 1.3); ctx.fillStyle = '#7a7a76'; ctx.fillRect(-4.8, -12.4, 1.2, 3.6); ctx.fillRect(3.6, -12.4, 1.2, 3.6); // an open helm with cheek-guards
    h.shield('#5a6878', '#1c2228', 6.2, -7.6, 0); ell(ctx, -7.6, 0, 1.6, 2.2, '#e8e4d8'); // the white fingertip on the boss
    h.sword(); },
  /* Tobet: narrow, quick, a padded jack, a cut-down cloak, a tall yew bow held at his side, the bone-handled knife */
  tobet(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1.04);
    h.legs('#3a3428'); h.torso('#7a6a4c', '#2a2418', 5.4); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(-5, -3.6 + i*2.4); ctx.lineTo(5, -3.6 + i*2.4); } ctx.stroke(); // the padded jack
    poly(ctx, [[-5,-6],[-6.6,4],[-3.4,3],[-2.6,-6]], '#4a5664'); ctx.fillStyle = '#5a4430'; ctx.fillRect(-8.4, -5, 2, 8); poly(ctx, [[-8.4,-5],[-7.4,-8],[-6.4,-5]], '#d8d0b8'); // the cloak, cut down; the quiver
    h.head('#c4a080', 4.1, -11.2); h.look('rgba(24,14,10,.82)', -11.4); B2F.cap(ctx, '#5a3a1e', 4.3, -12.4, 1.04, 1.96); ctx.fillStyle = '#5a3a1e'; ctx.fillRect(-4.3, -12.4, 1.4, 3.4); // brown hair, unkempt
    ctx.strokeStyle = '#7a5a30'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(8.6, -16); ctx.quadraticCurveTo(12.4, -4, 8.6, 10); ctx.stroke(); ctx.strokeStyle = 'rgba(230,220,200,.6)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(8.6, -16); ctx.lineTo(8.6, 10); ctx.stroke(); // the yew bow
    ctx.fillStyle = '#e8dcc0'; ctx.fillRect(3.6, 3.6, 1, 3); ctx.restore(); },
  /* Thegg: head and shoulders over the company; two sets of scale riveted into one; a tower shield; a broadsword like a knife in his hand */
  thegg(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.3, 1.24);
    h.legs('#2e2a24'); h.torso('#8a8478', '#2a2824', 7.8); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 6; i++) { ctx.moveTo(-7.4, -4.4 + i*2); ctx.lineTo(7.4, -4.4 + i*2); } ctx.moveTo(0, -6); ctx.lineTo(0, 7); ctx.stroke(); // two sets of scale, the seam down the middle
    h.head('#a07a5a', 4.8, -11); h.look('rgba(20,10,6,.86)', -11.2); ctx.fillStyle = '#2a1a10'; ctx.fillRect(-4.8, -14.6, 9.6, 2.2); ctx.fillRect(-4.8, -14.6, 1.6, 5); ctx.fillStyle = 'rgba(40,24,14,.5)'; ctx.fillRect(-3.4, -8.4, 7.4, 1.8); // heavy brows, dark hair, a heavy jaw
    poly(ctx, [[-13.4,-9],[-3.6,-9],[-3.6,9],[-13.4,9]], h.armor('#6a5a44', '#1e1810')); ctx.strokeStyle = '#141210'; ctx.lineWidth = 1; ctx.strokeRect(-13.4, -9, 9.8, 18); ell(ctx, -8.5, 0, 1.6, 2.2, '#e8e4d8'); // the tower shield, the white fingertip
    h.sword('#d4ccbc'); ctx.restore(); },
  /* Perrit: small and upright; the cadre's grey-piped coat; a pouch of black tiles at the hip; one hand up with a thread of lightning */
  perrit(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .88, .96); const fl = o.still ? 1 : (Math.sin(t/150 + (o.phase || 0)) + 1)/2;
    h.legs('#2a2a30'); poly(ctx, [[-5.6,-6],[5.6,-6],[7,11],[-7,11]], h.armor('#5a5a66', '#1e1e26')); ctx.fillStyle = '#b8b8c8'; ctx.fillRect(-.4, -6, .8, 17); ctx.fillRect(-7, 10, 14, .8); // the long cadre coat, grey piping
    ctx.fillStyle = '#4a3a2a'; ctx.fillRect(3.4, 2.4, 3.4, 3); ctx.fillStyle = '#0a0a0e'; ctx.fillRect(4, 3, 1, 1); ctx.fillRect(5.4, 3.4, 1, 1); // the pouch of tiles
    h.head('#d0b098', 3.9, -11.4); h.look('rgba(24,14,10,.82)', -11.6); B2F.cap(ctx, '#1a1418', 4.1, -12.6, 1, 2); ell(ctx, 0, -16.4, 2.2, 1.4, '#1a1418'); // black hair pinned up, a clerk's knot
    B2F.line(ctx, '#5a5a66', 1.5, [[-5, -4], [-8.4, -10]]); B2F.line(ctx, '#d0b098', 1.1, [[-8.4, -10], [-9.4, -13.4]]);
    ctx.globalAlpha = .4 + fl*.6; B2F.line(ctx, '#e0e4ff', .7, [[-9.6, -14.4], [-11.2, -17], [-9.8, -18.4], [-11.6, -21.4]]); ctx.globalAlpha = 1; ctx.restore(); },
  /* Ammet: short and broad in the forearm; a leather apron; the roll of tools at her belt; sleeves rolled; a needle glinting */
  ammet(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, .94);
    h.legs('#34302a'); h.torso('#6a6a5e', '#26241e', 6.2); poly(ctx, [[-4.6,-4],[4.6,-4],[5.6,10],[-5.6,10]], h.armor('#7a5a3a', '#2a1c10')); // the apron
    ctx.fillStyle = '#b89070'; ctx.fillRect(-7.4, -5, 1.8, 4.6); ctx.fillRect(5.6, -5, 1.8, 4.6); // forearms, sleeves rolled
    ctx.fillStyle = '#4a3a28'; ctx.fillRect(-9.6, 2, 4.6, 3.6); ctx.fillStyle = '#9a968c'; for (let i = 0; i < 4; i++) ctx.fillRect(-9.2 + i*1.1, 1.2, .4, 1.4); // the roll of tools
    h.head('#b89070', 4.3, -11.2); h.look('rgba(24,14,10,.84)', -11.4); B2F.cap(ctx, '#5a5048', 4.5, -12.4, 1.02, 1.98); ctx.fillStyle = 'rgba(200,200,190,.4)'; ctx.fillRect(-3, -15.6, 4, .6); // greying hair cropped short
    ctx.strokeStyle = '#e8e8f0'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(7.2, -1); ctx.lineTo(9.4, -4.6); ctx.stroke(); ctx.restore(); },
  /* Ruuk: thin and wiry, hide over wool, a hood back, a bundle of light spears over the shoulder */
  ruuk(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .86, .98);
    for (let i = 0; i < 3; i++) B2F.line(ctx, '#7a5a34', .8, [[-6 + i * .8, 8], [-9.4 + i * .8, -20]]); for (let i = 0; i < 3; i++) poly(ctx, [[-9.4 + i*.8, -23], [-10 + i*.8, -19.6], [-8.8 + i*.8, -19.6]], '#c8c0b0'); // the light spears
    h.legs('#3a2e22'); h.torso('#8a6a44', '#3a2a18', 5.2); ctx.fillStyle = 'rgba(220,200,160,.4)'; for (let i = 0; i < 6; i++) ctx.fillRect(-4.6 + i*1.6, 5.4, .5, 1.6); // hide, fringed
    h.head('#9a7050', 3.9, -11.2); h.look('rgba(20,10,6,.86)', -11.4); poly(ctx, [[-5,-8],[-4.6,-14],[0,-16],[4.6,-14],[5,-8],[3.8,-12.4],[-3.8,-12.4]], '#5a4a34'); // the hood, back
    B2F.cap(ctx, '#140c08', 3.8, -12.6, 1.05, 1.95); ctx.restore(); },
  /* Brune: long-limbed; oiled sealskin; a cord of shells; a barbed fish-spear held short */
  brune(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1.08);
    B2F.line(ctx, '#5a4632', 1.3, [[7.6, 10], [9.6, -16]]); poly(ctx, [[9.6,-21],[8.6,-15],[10.6,-15]], '#c8c4b8'); B2F.line(ctx, '#c8c4b8', .6, [[9, -17.6], [7.8, -16.4]]); // the fish-spear, barbed
    h.legs('#2a2e30'); h.torso('#3a4a50', '#141c20', 5.8); ctx.fillStyle = 'rgba(200,230,240,.18)'; ctx.fillRect(-5.2, -5, 1.6, 10); // oiled sealskin, a sheen
    for (let i = 0; i < 5; i++) ell(ctx, -2.4 + i*1.2, -5.4 + Math.abs(i - 2)*.4, .6, .5, '#e8e0d0'); // the cord of shells
    h.head('#b08a6a', 4, -11.2); h.look('rgba(20,10,6,.86)', -11.4); B2F.cap(ctx, '#2a2420', 4.2, -12.4, 1.02, 1.98); B2F.line(ctx, '#2a2420', 1.2, [[-3.8, -12], [-6.4, -4]]); // dark hair, one long plait
    ctx.restore(); },
  /* Pessa: lean, boatwoman's shoulders, a jack two sizes too big, an oilskin over it, the boathook held upright like a pole */
  pessa(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1);
    B2F.line(ctx, '#4a3a28', 1.4, [[8.4, 12], [8.4, -22]]); B2F.line(ctx, '#6a6a6a', 1.1, [[8.4, -22], [8.4, -24.6], [10.6, -25.2]]); B2F.line(ctx, '#6a6a6a', 1, [[8.4, -22.4], [10.4, -20.4]]); // the boathook, iron-shod
    h.legs('#2e2a26'); poly(ctx, [[-6.8,-6],[6.8,-6],[7.6,8],[-7.6,8]], h.armor('#6a6050', '#24201a')); poly(ctx, [[-7.2,-6],[-2,-6],[-3,8],[-8.4,8]], '#3a4030'); // the jack too big; the oilskin over one side
    h.head('#c09878', 4.1, -11.2); h.look('rgba(24,14,10,.84)', -11.4); ctx.fillStyle = 'rgba(120,60,40,.6)'; ctx.fillRect(2.2, -10, 1.6, 1.4); // the burn-scar on her cheek
    B2F.cap(ctx, '#4a3020', 4.3, -12.4, 1.02, 1.98); ctx.fillStyle = '#4a3020'; ctx.fillRect(-4.3, -12.4, 1.6, 6); ctx.restore(); },

  /* ---- the enemy: the Edur, their sorcerers and their bound things; Letherii soldiers on the wrong side of the road ---- */
  /* a Tiste Edur warrior: tall, grey-skinned, long hair braided back, a leather harness, a long sword */
  b5_edur(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.14);
    h.legs('#2a2a2e'); h.torso('#4a4640', '#1a1816', 5.8); B2F.line(ctx, '#2a2018', .9, [[-5, -6], [5, 6]]); B2F.line(ctx, '#2a2018', .9, [[5, -6], [-5, 6]]); // the harness
    h.head('#7a8088', 4.2, -11.4); h.look('rgba(10,10,14,.9)', -11.6); B2F.cap(ctx, '#0e0e12', 4.4, -12.8, 1.02, 1.98); B2F.line(ctx, '#0e0e12', 1.4, [[-3.6, -12.6], [-6.4, -2]]); // grey skin, black hair braided down the back
    ctx.strokeStyle = '#a8a8b0'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(7, 2); ctx.lineTo(13.4, -13); ctx.stroke(); ctx.strokeStyle = '#2a2018'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(6, 4); ctx.lineTo(7.6, .5); ctx.stroke(); ctx.restore(); },
  /* an unblooded Edur: younger, lighter, a spear */
  b5_unblooded(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1.06);
    B2F.line(ctx, '#4a3a2a', 1.2, [[8, 12], [9, -20]]); poly(ctx, [[9,-24],[8,-19],[10,-19]], '#b8b8c0');
    h.legs('#2a2a2e'); h.torso('#5a5048', '#1e1a16', 5.2); h.head('#848a92', 4, -11.2); h.look('rgba(10,10,14,.9)', -11.4); B2F.cap(ctx, '#121216', 4.2, -12.6, 1.05, 1.95); ctx.restore(); },
  /* a K'risnan: hunched, the body twisted, one shoulder high, the hand too long; dark sorcery smoking off it */
  b5_krisnan(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, .9); const fl = o.still ? 0 : Math.sin(t/300 + (o.phase || 0));
    for (let i = 0; i < 4; i++) ell(ctx, -2 + Math.sin(t/400 + i)*3, -14 - i*3 - (fl + 1)*1.5, 3 - i*.5, 2 - i*.3, `rgba(30,24,40,${.5 - i*.1})`); // the smoke of it
    h.legs('#1e1c20'); poly(ctx, [[-7,-8],[5,-4],[6.4,10],[-7.6,10]], h.armor('#3a3440', '#0e0c12')); // a robe over a body that is wrong
    ell(ctx, -5.4, -7.6, 3.4, 2.4, '#3a3440'); // the high shoulder
    ctx.save(); ctx.translate(1.6, -9.4); ctx.rotate(.35); ell(ctx, 0, 0, 3.6, 3.9, '#6a7078'); ctx.restore(); ctx.fillStyle = 'rgba(180,170,220,.7)'; ctx.fillRect(2.4, -10.4, 1, .9); // the head, set aside on the neck
    B2F.line(ctx, '#6a7078', 1.1, [[5, -2], [10.6, 1], [12.4, 5.6]]); B2F.line(ctx, '#6a7078', .6, [[12.4, 5.6], [13.6, 6.2]]); B2F.line(ctx, '#6a7078', .6, [[12.4, 5.6], [12.8, 7.2]]); // the hand, too long
    ctx.restore(); },
  /* a shadow wraith: no feet, a torn cloak of dark, two pale points */
  b5_wraith(ctx, h, t, o){ const fl = o.still ? 0 : Math.sin(t/240 + (o.phase || 0));
    ctx.globalAlpha *= .8; poly(ctx, [[-6,-14],[6,-14],[7.4,4 + fl],[4,10],[1,6 + fl],[-2,11],[-5,6],[-7.4,4 - fl]], 'rgba(16,14,22,.92)'); ell(ctx, 0, -14, 4.4, 4.6, 'rgba(16,14,22,.95)');
    ctx.fillStyle = 'rgba(210,220,255,.75)'; ctx.fillRect(-2, -14.6, 1.2, 1); ctx.fillRect(1, -14.6, 1.2, 1); ctx.globalAlpha = 1; },
  /* a Jheck wolf: big, grey, low, head forward */
  b5_jheck(ctx, h, t, o){ const g = o.still ? 0 : Math.sin(t/160 + (o.phase || 0));
    ell(ctx, 0, 2, 9, 4.6, '#6a6660'); ell(ctx, -1, 1, 8, 3.6, '#8a847c'); // the body
    poly(ctx, [[7,-1],[13,-3],[14.4,0],[12,2],[8,3]], '#6a6660'); poly(ctx, [[9,-3],[10,-6],[11,-3]], '#5a5650'); ell(ctx, 12.6, -1.2, .6, .5, '#e8d080'); // the head, ears, an eye
    poly(ctx, [[-8.6,0],[-13,-3 + g],[-12,1]], '#6a6660'); // the tail
    ctx.fillStyle = '#5a5650'; [-6, -3, 3, 6].forEach((x, i) => ctx.fillRect(x + (i % 2 ? g : -g)*.6, 4, 1.6, 8)); },
  /* a bound demon (Kenryll'ah): huge, armoured in plates, a crested head, no face anyone wants to look at */
  b5_demon(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.7, 1.6);
    h.legs('#2a2220'); poly(ctx, [[-8,-7],[8,-7],[9,8],[-9,8]], h.armor('#6a4a3a', '#1a100c')); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = .6; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-8.4, -5 + i*2.6); ctx.lineTo(8.4, -5 + i*2.6); } ctx.stroke(); // the plates
    ell(ctx, -9, -6, 3.4, 3, '#5a3a2e'); ell(ctx, 9, -6, 3.4, 3, '#4a2e24'); // the shoulders
    ell(ctx, 0, -11.6, 4.6, 4.2, '#4a2e24'); poly(ctx, [[-4,-14],[0,-20],[4,-14]], '#3a2018'); ctx.fillStyle = '#e8702a'; ctx.fillRect(-2.4, -12, 1.4, 1); ctx.fillRect(1, -12, 1.4, 1); // the crest, the eyes
    B2F.line(ctx, '#4a2e24', 2.4, [[9, -4], [12, 4]]); ell(ctx, 12.4, 5, 2.4, 2.2, '#5a3a2e'); ctx.restore(); },
  /* a Letherii soldier: scale, the blue-grey cloak, an open helm; for deserters and press-gangs */
  b5_letherii(ctx, h, t, o){ const c = b2Pick(o, ['#4a5664', '#5a5048', '#4a4a3e']);
    poly(ctx, [[-5.2,-6],[-8,9],[-3,8],[-2,-6]], c); h.legs('#2a2a2c'); h.torso('#6a6a66', '#262624', 6); h.head('#b08a6a', 4.3, -11.2); h.look();
    ctx.beginPath(); ctx.arc(0, -12.4, 5, Math.PI, 0); ctx.fillStyle = h.armor('#8a8a86', '#2a2a28'); ctx.fill(); ctx.fillRect(-5.4, -12.8, 10.8, 1.2);
    h.shield('#5a6878', '#1c2228', 5.6, -7.4, 0); h.sword(); },
  b5_letherii_bow(ctx, h, t, o){ poly(ctx, [[-5,-6],[-7.6,8],[-3,7],[-2,-6]], '#4a5664'); h.legs('#2a2a2c'); h.torso('#6a5a44', '#26201a', 5.4); h.head('#b08a6a', 4.1, -11.2); h.look(); B2F.cap(ctx, '#3a2a1a', 4.2, -12.4); B2F.bow(ctx, 8.4, -13, 9); },
});

/* ---------------- the busts (POR): in bust units, shoulders at y = 0, the face about y = −74 ---------------- */
/* Book Five's own painting helpers (Book One's PR is untouched): hair with volume over the skull, scale that hangs row over row,
   quilting, and a round shield with the battalion's white fingertip on the boss */
const B5P = {
  /* hair over the skull. o: {c:[light, mid, dark], v: height over the skull, wx: width past the temples, hl: hairline (u above cy), ey: where the sides end (u below cy),
     s: strand colours, n: strands, sh: sheen colour, spiky: tufts past the outline} */
  hair(ctx, F, o){ const u = F.h/20, w = F.w, top = F.cy - 21*u, v = o.v ?? 3.5, W = w + (o.wx ?? 1.6), hl = F.cy - (o.hl ?? 12.5)*u, ey = F.cy + (o.ey ?? -1)*u, r = PR.rng(o.seed || 5);
    const cb = (a, b, c, d, t) => (1-t)**3*a + 3*(1-t)**2*t*b + 3*(1-t)*t*t*c + t**3*d, edge = t => t < .5 ? [cb(-W, -W - 1, -W*.62, 0, t*2), cb(ey, top + 4, top - v, top - v, t*2)] : [cb(0, W*.62, W + 1, W, t*2 - 1), cb(top - v, top - v, top + 4, ey, t*2 - 1)];
    const shape = () => { ctx.beginPath(); ctx.moveTo(-W, ey); ctx.bezierCurveTo(-W - 1, top + 4, -W*.62, top - v, 0, top - v); ctx.bezierCurveTo(W*.62, top - v, W + 1, top + 4, W, ey);
      ctx.lineTo(w - .7, ey); ctx.bezierCurveTo(w - .1, hl + 3.4*u, w*.62, hl - .9, 0, hl - .9); ctx.bezierCurveTo(-w*.62, hl - .9, -w + .1, hl + 3.4*u, -w + .7, ey); ctx.closePath(); };
    if (o.spiky) PR.strands(ctx, o.spiky, [o.c[1], o.c[2], o.c[1]], .8, (o.seed || 5) + 1, (i, rr) => { const [x, y] = edge(.04 + rr()*.92), dx = x*.08 + (rr() - .5)*2.4, dy = (y - F.cy)*.1 - 1 - rr()*1.6; return [x*.9, y + 2, x + dx*.5, y + dy*.5, x + dx, y + dy]; });
    shape(); ctx.fillStyle = PR.lin(ctx, -W, top - v, W*.8, ey, [[0, o.c[0]], [.38, o.c[1]], [.8, o.c[2]], [1, '#050403']]); ctx.fill();
    ctx.save(); shape(); ctx.clip();
    const pt = o.part ?? -3, sc = (o.s || o.c).map(c => rgba(c, .6));
    PR.strands(ctx, o.n ?? 60, sc, o.sw ?? .5, (o.seed || 5) + 2, (i, rr) => { const k = rr(), x1 = lerp(-W - 1, W + 1, k), y1 = hl + Math.pow(Math.abs(x1)/W, 2.4)*(ey - hl) + 1.4 + rr()*1.4, x0 = pt + (rr() - .5)*2; return [x0, top - v + .6, x1*.92 + (x1 - pt)*.12, lerp(top - v, y1, .3), x1, y1]; }); // from the crown, over the skull
    PR.soft(ctx, -W*.38, top - v*.3 + 2.5, W*.55, 2.6, o.sh || '#f0d8b0', o.shA ?? .3, -.35); PR.soft(ctx, W*.62, F.cy - 6*u, W*.55, 10, '#000000', .5);
    ctx.restore();
    PR.strands(ctx, o.wisp ?? 8, sc, (o.sw ?? .5)*.8, (o.seed || 5) + 3, (i, rr) => { const x = (rr() - .5)*w*1.5, y = hl + Math.pow(Math.abs(x)/W, 2.4)*(ey - hl); return [x, y - 1.6, x + (rr() - .5)*2, y + 1, x + (rr() - .5)*3, y + 1.6 + rr()*2]; }); // a few loose at the brow
    PR.stroke(ctx, rgba(F.rim, .22), .8, () => { ctx.moveTo(W*.4, top - v*.86); ctx.bezierCurveTo(W*.8, top - v*.5, W + .8, top + 4, W, ey); }); return shape; },
  /* scale that hangs: the bottom row first, so each row overlaps the one below like slates; lit from the left, a glint on each lit edge */
  scales(ctx, x0, x1, y0, y1, sw, col, seed = 7){ const r = PR.rng(seed), rows = Math.ceil((y1 - y0)/(sw*.58));
    for (let j = rows; j >= 0; j--){ const y = y0 + j*sw*.58; for (let x = x0 + (j%2)*sw*.5; x < x1 + sw*.5; x += sw){ const k = clamp((x - x0)/(x1 - x0), 0, 1), jt = (r() - .5)*.16;
      ctx.beginPath(); ctx.moveTo(x - sw*.5, y); ctx.lineTo(x - sw*.5, y + sw*.42); ctx.quadraticCurveTo(x - sw*.48, y + sw*.98, x, y + sw*1.06); ctx.quadraticCurveTo(x + sw*.48, y + sw*.98, x + sw*.5, y + sw*.42); ctx.lineTo(x + sw*.5, y); ctx.closePath();
      ctx.fillStyle = PR.lin(ctx, x - sw*.5, y, x + sw*.35, y + sw, [[0, shade(col, .28 - k*.62 + jt)], [.55, shade(col, -.12 - k*.5 + jt)], [1, shade(col, -.55 - k*.35)]]); ctx.fill(); ctx.strokeStyle = 'rgba(6,5,4,.85)'; ctx.lineWidth = .42; ctx.stroke();
      PR.stroke(ctx, 'rgba(0,0,0,.35)', .3, () => { ctx.moveTo(x, y + sw*.15); ctx.lineTo(x, y + sw*.8); }); // the ridge down each scale
      if (k < .62) PR.stroke(ctx, `rgba(255,244,220,${.55*(1 - k/.62)})`, .38, () => { ctx.moveTo(x - sw*.4, y + sw*.5); ctx.quadraticCurveTo(x - sw*.36, y + sw*.92, x - sw*.05, y + sw*.98); }); } } },
  /* quilted padding: two sets of stitched diagonals, and the puff of each diamond catching the lantern on the lit side */
  quilt(ctx, x0, x1, y0, y1, st, col){ for (let y = y0; y < y1; y += st) for (let x = x0 + ((y - y0)/st % 2)*st*.5; x < x1; x += st){ const k = clamp((x - x0)/(x1 - x0), 0, 1); if (k < .7) PR.soft(ctx, x - st*.1, y + st*.4, st*.36, st*.28, '#fff0d8', .14*(1 - k)); }
    PR.stitch(ctx, col, .4, () => { for (let x = x0 - (y1 - y0); x < x1; x += st){ ctx.moveTo(x, y0); ctx.lineTo(x + (y1 - y0), y1); ctx.moveTo(x + (y1 - y0), y0); ctx.lineTo(x, y1); } }); },
  /* the Whitefinder round shield: planks under blue-grey paint, an iron rim, an iron boss with the white fingertip painted on it */
  shield(ctx, x, y, rx, ry, paint){ ctx.save(); ctx.translate(x, y); ell(ctx, 1.5, 2, rx + 2, ry + 2, 'rgba(0,0,0,.5)'); ell(ctx, 0, 0, rx, ry, PR.lin(ctx, -rx, -ry, rx, ry, [[0, shade(paint, .2)], [.45, paint], [1, '#0a0c0e']]));
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 7); ctx.clip(); PR.stroke(ctx, 'rgba(0,0,0,.32)', .5, () => { for (let i = -3; i <= 3; i++){ ctx.moveTo(i*rx/3.6, -ry); ctx.lineTo(i*rx/3.6 + 1, ry); } });
    const r = PR.rng(11); for (let i = 0; i < 9; i++){ const sx = (r() - .6)*rx*1.6, sy = (r() - .5)*ry*1.6; PR.soft(ctx, sx, sy, 2 + r()*4, 1 + r()*2, '#6a4a2c', .55, r()*3); } // the paint worn through to the wood
    PR.soft(ctx, -rx*.4, -ry*.45, rx*.5, ry*.3, '#e8eef4', .14, -.6); ctx.restore();
    ctx.strokeStyle = PR.lin(ctx, -rx, -ry, rx, ry, [[0, '#c8c8c0'], [.4, '#6a6a66'], [1, '#141412']]); ctx.lineWidth = 2.6; ctx.beginPath(); ctx.ellipse(0, 0, rx - .6, ry - .6, 0, 0, 7); ctx.stroke();
    for (let i = 0; i < 12; i++){ const a = i/12*Math.PI*2; ell(ctx, Math.cos(a)*(rx - .6), Math.sin(a)*(ry - .6), .7, .7, a > 1.8 && a < 4.4 ? '#e8e4da' : '#4a4844'); }
    const bx = rx*.06, br = Math.min(rx, ry)*.26; ell(ctx, bx + .8, 1, br + .8, br + .8, 'rgba(0,0,0,.55)'); ell(ctx, bx, 0, br, br, PR.rad(ctx, bx - br*.35, -br*.35, .3, br*1.1, [[0, '#f0ece4'], [.35, '#9a9a94'], [1, '#262624']]));
    ctx.save(); ctx.translate(bx + br*.1, -br*.05); ctx.rotate(-.25); ell(ctx, 0, 0, br*.24, br*.55, '#f4f0e6'); PR.stroke(ctx, 'rgba(120,110,100,.6)', .3, () => { ctx.ellipse(0, -br*.3, br*.15, br*.16, 0, 3.2, 6.2); }); ctx.restore(); // the white fingertip
    ctx.restore(); },
  /* the garment rising from the shoulders to meet the jaw (trapezius under cloth, a high collar), so the head sits in the clothes, not on a post:
     its top edge runs up to the jaw's corner at the sides (o.drop lowers it) and dips under the chin; a lit edge, a dark edge, the jaw's cast shadow on it */
  collar(ctx, F, c1, c2, lines, o = {}){ const u = F.h/20, x = F.x || 0, jw = F.w*(F.jaw ?? .8), jy = F.cy + 13*u + (o.drop || 0), cb = F.cy + 19*u + 1 + (o.drop || 0)*.5, sw = o.sw ?? 28, sy = o.sy ?? -38;
    const top = () => { ctx.moveTo(x - jw - 1.4, jy); ctx.quadraticCurveTo(x - jw*.5, cb - .6, x, cb); ctx.quadraticCurveTo(x + jw*.5, cb - .6, x + jw + 1.4, jy); };
    const shape = () => { ctx.beginPath(); ctx.moveTo(x - sw, sy); ctx.bezierCurveTo(x - sw*.5, sy - 6, x - jw - 2.2, jy + 10, x - jw - 1.4, jy); ctx.quadraticCurveTo(x - jw*.5, cb - .6, x, cb); ctx.quadraticCurveTo(x + jw*.5, cb - .6, x + jw + 1.4, jy);
      ctx.bezierCurveTo(x + jw + 2.2, jy + 10, x + sw*.5, sy - 6, x + sw, sy); ctx.quadraticCurveTo(x, sy + 5, x - sw, sy); ctx.closePath(); };
    ctx.save(); shape(); ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 3; ctx.shadowOffsetY = 1; ctx.fillStyle = PR.lit(ctx, c1, c2, x - sw, x + sw); ctx.fill(); ctx.restore();
    ctx.save(); shape(); ctx.clip(); PR.soft(ctx, x + sw*.55, sy - 6, sw*.6, 12, '#000000', .5); PR.soft(ctx, x - sw*.45, sy - 6, sw*.35, 5, '#fff0d8', .12);
      const st = o.style || 'rib';
      if (lines && st === 'rib') PR.stroke(ctx, lines, .5, () => { for (let i = -3; i <= 3; i++){ const k = i/3.4; ctx.moveTo(x + k*(jw + 1), cb - (1 - k*k)*.2 - Math.abs(k)*(cb - jy)*.9 + 1); ctx.quadraticCurveTo(x + k*(jw + 4), sy - 6, x + k*sw*.8, sy + 2); } }); // quilted
      if (lines && st === 'wrap') PR.stroke(ctx, lines, .7, () => { for (let i = 1; i <= 3; i++){ const d = i*2.8; ctx.moveTo(x - jw - 1.6 - i*1.6, jy + d); ctx.quadraticCurveTo(x, cb + d*1.15, x + jw + 1.6 + i*1.6, jy + d - .6); } }); // wound round
      if (lines && st === 'fold') PR.stroke(ctx, lines, .8, () => { [-1, 1].forEach(sd => { for (let i = 0; i < 2; i++){ ctx.moveTo(x + sd*(jw*.35 + i*4), cb + .6); ctx.quadraticCurveTo(x + sd*(jw + 1 + i*4), cb + 4, x + sd*(jw + 6 + i*6), sy - 1); } }); }); // folds
      PR.soft(ctx, x + 1.4, cb + 1, jw*.9, 3.2, '#0a0604', .62); ctx.restore(); // the jaw's shadow on the cloth
    ctx.lineCap = 'round'; PR.stroke(ctx, 'rgba(0,0,0,.6)', .7, top); ctx.save(); ctx.beginPath(); ctx.rect(x - sw - 4, -200, sw*.95, 400); ctx.clip(); PR.stroke(ctx, o.pip || 'rgba(255,236,200,.32)', o.pip ? .7 : .5, () => { ctx.moveTo(x - jw - 1.2, jy + .4); ctx.quadraticCurveTo(x - jw*.5, cb - .2, x, cb + .4); }); ctx.restore();
    if (o.pip) PR.stroke(ctx, o.pip, .5, () => { ctx.moveTo(x + jw + 1.2, jy + .4); ctx.quadraticCurveTo(x + jw*.5, cb - .2, x, cb + .4); }); },
  /* hair at the back of the head, falling behind the neck to the collar, so the head and the shoulders are one shape */
  back(ctx, F, c1, c2, len = 18, wx = 1.4){ const W = F.w + wx; ctx.beginPath(); ctx.moveTo(-W, F.cy - 6); ctx.quadraticCurveTo(-W - 1, F.cy + len*.6, -W + 1.6, F.cy + len); ctx.lineTo(W - 1.6, F.cy + len); ctx.quadraticCurveTo(W + 1, F.cy + len*.6, W, F.cy - 6); ctx.closePath();
    ctx.fillStyle = PR.lin(ctx, -W, 0, W, 0, [[0, c1], [.5, c2], [1, '#040302']]); ctx.fill(); },
};
Object.assign(POR, {
  /* the Letherii sergeant: never gendered, so a face that could be either and no beard; scale over a padded coat, the blue-grey cloak, an open helm with cheek-guards, the round shield */
  sgt_mt(ctx){ const F = {cy:-73, w:13.2, h:20, jaw:.82, chin:5, skin:'#b48c6c', iris:'#4a4a54', lip:'#8e5c4c', browCol:'#2a1e16', browW:1.6, arch:.7, rim:'#d6a24a', nose:1.05, smileL:0, smileR:.15, mouthW:3.9, bags:.45, age:.45, look:.25, open:.92, flush:'#c07060'};
    B5P.shield(ctx, -50, -52, 25, 28, '#4e6072');
    const cloak = () => { ctx.beginPath(); ctx.moveTo(-14, -50); ctx.quadraticCurveTo(-42, -50, -52, -28); ctx.lineTo(-58, 4); ctx.lineTo(58, 4); ctx.lineTo(52, -28); ctx.quadraticCurveTo(42, -50, 14, -50); ctx.closePath(); };
    cloak(); ctx.fillStyle = PR.lit(ctx, '#5a6a7c', '#141a22', -58, 44); ctx.fill(); // the cloak, behind
    PR.torsoPath(ctx, 44); ctx.fillStyle = '#26282a'; ctx.fill(); ctx.save(); PR.torsoPath(ctx, 44); ctx.clip();
    B5P.scales(ctx, -46, 46, -49, 2, 4.4, '#a4aaae', 21); PR.soft(ctx, 30, -16, 26, 26, '#000000', .5); PR.soft(ctx, -20, -36, 16, 9, '#fff0d8', .1);
    [-1, 1].forEach(sd => { ctx.beginPath(); ctx.moveTo(sd*12, -49); ctx.quadraticCurveTo(sd*32, -48, sd*46, -30); ctx.lineTo(sd*47, 4); ctx.lineTo(sd*33, 4); ctx.bezierCurveTo(sd*30, -14, sd*28, -32, sd*14, -43); ctx.closePath(); // the cloak over each shoulder, open on the chest
      ctx.fillStyle = sd < 0 ? PR.lin(ctx, -46, -40, -14, -10, [[0, '#7a8ca0'], [.5, '#55667a'], [1, '#2a3440']]) : PR.lin(ctx, 14, 0, 46, 0, [[0, '#2e3a46'], [1, '#080a0e']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = .6; ctx.stroke();
      PR.stroke(ctx, sd < 0 ? 'rgba(10,14,20,.45)' : 'rgba(0,0,0,.5)', .9, () => { for (let i = 0; i < 3; i++){ ctx.moveTo(sd*(26 + i*6), -44 + i*3); ctx.quadraticCurveTo(sd*(34 + i*4), -22, sd*(36 + i*3), 4); } });
      if (sd < 0) PR.stroke(ctx, 'rgba(200,220,240,.2)', .6, () => { ctx.moveTo(-14.6, -43); ctx.bezierCurveTo(-28, -32, -30, -14, -33.4, 4); }); });
    ell(ctx, -15, -44, 3, 3, PR.rad(ctx, -16, -45, .3, 3.2, [[0, '#f4d898'], [.5, '#b0802e'], [1, '#3a2408']])); ell(ctx, -15, -44, 1.1, 1.1, '#4a3010'); // the cloak pin
    [0, 1].forEach(i => { const bx = -24, by = -30 + i*3.4; ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(bx - 4.6, by - .6, 9.6, 2.6); ctx.fillStyle = PR.lin(ctx, bx - 4.6, by - 1, bx + 4.6, by + 1, [[0, '#fbe4a4'], [.45, '#d6a24a'], [1, '#6a4410']]); ctx.fillRect(bx - 4.8, by - 1, 9.6, 2.2); ell(ctx, bx - 3.6, by + .1, .45, .45, '#4a3010'); ell(ctx, bx + 3.6, by + .1, .45, .45, '#4a3010'); }); // two brass bars: a sergeant
    ctx.restore();
    PR.neck(ctx, F, 9.4); B5P.collar(ctx, F, '#6a7484', '#161c24', 'rgba(0,0,0,.24)', {sw:32}); PR.face(ctx, F); // the padded coat's collar up under the jaw
    PR.strands(ctx, 16, ['#2a1e16', '#4a3626', '#140e0a'], .6, 31, (i, r) => { const sd = i%2 ? 1 : -1, x = sd*(F.w - 1.6 + r()*1.4), y = F.cy - 9; return [x, y, x + sd*.6, y + 3, x + sd*(.2 + r()), y + 5 + r()*3]; }); // dark hair cropped at the temples, under the helm
    const capY = F.cy - 8.6, R = F.w + 2.6;
    [-1, 1].forEach(sd => { const g = () => PR.path(ctx, [[sd*(F.w - 1.8), capY + 1], [sd*(R + .2), capY + 1], [sd*(R - .2), F.cy + 9], [sd*(F.w + .6), F.cy + 16.4], [sd*(F.w - 2.6), F.cy + 12.4], [sd*(F.w - 2.2), F.cy + 7.4]]); // the cheek-guards, hinged
      g(); ctx.fillStyle = sd < 0 ? PR.lin(ctx, -R, 0, -F.w + 2, 0, [[0, '#b8bec2'], [.5, '#6a7074'], [1, '#2a2e30']]) : PR.lin(ctx, F.w - 2, 0, R, 0, [[0, '#2a2e30'], [1, '#08090a']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = .5; ctx.stroke();
      ell(ctx, sd*(F.w + .4), F.cy + 2, .6, .6, sd < 0 ? '#e8e4da' : '#4a4844'); ell(ctx, sd*(F.w + .2), F.cy + 9, .6, .6, sd < 0 ? '#e8e4da' : '#4a4844'); });
    PR.stroke(ctx, '#2a1a0e', 1.1, () => { ctx.moveTo(-F.w + .2, F.cy + 15); ctx.quadraticCurveTo(0, F.cy + 21.6, F.w - .2, F.cy + 15); }); PR.stroke(ctx, 'rgba(200,160,110,.35)', .35, () => { ctx.moveTo(-F.w + .2, F.cy + 14.6); ctx.quadraticCurveTo(-5, F.cy + 19.6, -1, F.cy + 20.6); }); // the chin strap
    ctx.beginPath(); ctx.ellipse(0, capY, R, 14.6, 0, Math.PI, 0); ctx.closePath(); ctx.fillStyle = PR.lin(ctx, -R, capY - 14, R*.9, capY, [[0, '#c4cace'], [.3, '#7c8488'], [.65, '#30363a'], [1, '#0a0c0d']]); ctx.fill(); // the bowl
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, capY, R, 14.6, 0, Math.PI, 0); ctx.clip(); PR.soft(ctx, -7, capY - 10, 6.4, 2.6, '#ffffff', .4, -.55); PR.soft(ctx, 9, capY - 6, 8, 7, '#000000', .45);
      ctx.fillStyle = PR.lin(ctx, -2, 0, 2, 0, [[0, '#d8dee0'], [.5, '#5a6064'], [1, '#141618']]); ctx.fillRect(-1.6, capY - 15, 3.2, 15); ctx.restore(); // the comb, front to back
    PR.stroke(ctx, 'rgba(255,240,210,.35)', .5, () => { ctx.ellipse(0, capY, R - .8, 13.8, 0, Math.PI*1.08, Math.PI*1.4); });
    ctx.fillStyle = PR.lin(ctx, -R, 0, R, 0, [[0, '#f0d08a'], [.4, '#b8862e'], [.8, '#4a300c'], [1, '#140c04']]); ctx.beginPath(); ctx.moveTo(-R - .6, capY - 2.4); ctx.quadraticCurveTo(0, capY - 4, R + .6, capY - 2.4); ctx.lineTo(R + .6, capY + 1.4); ctx.quadraticCurveTo(0, capY, -R - .6, capY + 1.4); ctx.closePath(); ctx.fill(); // the brass brow-band
    for (let i = 0; i < 9; i++){ const x = -R + 1.6 + i*(R*2 - 3.2)/8; ell(ctx, x, capY - .6 - (1 - Math.abs(x)/R)*1.2, .55, .55, x < 4 ? '#fff0c0' : '#3a2808'); }
    PR.soft(ctx, 0, capY + 3, F.w*.9, 2.6, '#000000', .4); return F; },
  /* Tobet: twenty-two, Indebted, narrow and quick; shaggy straw hair, a quilted jack, the company cloak cut down, his yew bow and the tally-stick */
  tobet(ctx){ const F = {cy:-73, w:12.2, h:19.4, jaw:.72, chin:4.3, skin:'#c8a282', iris:'#5a6a48', lip:'#a06c5c', browCol:'#6a4626', browW:1.15, arch:1.2, browL:.7, browR:.3, rim:'#b8a070', rimA:.22, nose:.95, look:-.35, open:1.05, smileL:-.1, smileR:.25, mouthW:3.4, flush:'#d08070'};
    PR.strands(ctx, 7, ['#d8d0c0', '#a8a094', '#e8e2d4'], 1.1, 41, (i, r) => { const x = 18 + i*1.8, y = -60 + (i%2)*2; return [x, y + 10, x + .5, y + 4, x + 1 + r(), y - 1]; }); // the quiver's fletching over his right shoulder
    ctx.fillStyle = PR.lit(ctx, '#5a4024', '#1a1008', 16, 30); PR.path(ctx, [[15, -52], [29, -56], [31, -48], [17, -44]]); ctx.fill();
    ctx.save(); ctx.translate(-36, -50); ctx.rotate(-.06); ctx.lineCap = 'round'; const limb = () => { ctx.beginPath(); ctx.moveTo(4, -60); ctx.quadraticCurveTo(-8, -30, -1, 0); ctx.quadraticCurveTo(-8, 30, 4, 56); };
      ctx.strokeStyle = '#140c06'; ctx.lineWidth = 3.8; limb(); ctx.stroke(); ctx.strokeStyle = PR.lin(ctx, -6, 0, 2, 0, [[0, '#e0b068'], [.5, '#a8682a'], [1, '#4a2a10']]); ctx.lineWidth = 2.6; limb(); ctx.stroke(); // the yew, sapwood and heart
      PR.stroke(ctx, 'rgba(255,236,190,.6)', .5, () => { ctx.moveTo(2.4, -58); ctx.quadraticCurveTo(-8.6, -30, -2.4, -2); });
      PR.stroke(ctx, 'rgba(230,222,200,.7)', .45, () => { ctx.moveTo(4, -60); ctx.lineTo(4, 56); }); ctx.fillStyle = '#3a2416'; ctx.fillRect(-3.4, -5, 4.6, 10); PR.stroke(ctx, 'rgba(200,170,120,.5)', .35, () => { for (let i = 0; i < 6; i++){ ctx.moveTo(-3.4, -4 + i*1.6); ctx.lineTo(1.2, -3.2 + i*1.6); } }); ctx.restore(); // the string; the grip
    PR.torsoPath(ctx, 33, 5); ctx.fillStyle = PR.lit(ctx, '#9a8250', '#221a0c', -33, 26); ctx.fill(); ctx.save(); PR.torsoPath(ctx, 33, 5); ctx.clip(); B5P.quilt(ctx, -36, 36, -48, 4, 6, 'rgba(40,28,12,.55)'); PR.soft(ctx, 24, -18, 20, 22, '#000000', .5);
      ctx.fillStyle = PR.lit(ctx, '#56687a', '#10161c', 4, 34); ctx.beginPath(); ctx.moveTo(8, -48); ctx.quadraticCurveTo(26, -46, 34, -30); ctx.lineTo(35, 6); ctx.lineTo(18, 6); ctx.quadraticCurveTo(20, -20, 8, -48); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.45)', .8, () => { ctx.moveTo(22, -40); ctx.quadraticCurveTo(26, -18, 26, 6); }); // the cloak, cut down, over one shoulder
      PR.stroke(ctx, 'rgba(255,230,180,.4)', .5, () => { ctx.moveTo(18, 6); ctx.quadraticCurveTo(20, -20, 8.6, -47); });
      ctx.strokeStyle = PR.lit(ctx, '#6a4a2a', '#1e1208', -20, 26); ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(20, -46); ctx.lineTo(-26, 4); ctx.stroke(); PR.stitch(ctx, 'rgba(220,190,140,.45)', .3, () => { ctx.moveTo(19, -47.4); ctx.lineTo(-27.4, 2.6); }); ctx.restore(); // the quiver strap
    B5P.back(ctx, F, '#6a4a24', '#2a1a0c', 17, 2); PR.neck(ctx, F, 8.4); B5P.collar(ctx, F, '#9a8250', '#221a0c', 'rgba(40,28,12,.45)', {sw:25, sy:-36});
    PR.stroke(ctx, '#2a1a10', .45, () => { ctx.moveTo(-6, -49); ctx.quadraticCurveTo(-5, -42, -3.4, -38); ctx.moveTo(6, -49); ctx.quadraticCurveTo(0, -40, -3, -38); }); ctx.save(); ctx.translate(-3.2, -37.4); ctx.rotate(.12); ctx.fillStyle = PR.lit(ctx, '#d8c49a', '#6a5634', -1, 1); ctx.fillRect(-.9, 0, 1.8, 8.6); PR.stroke(ctx, 'rgba(40,24,10,.8)', .3, () => { for (let i = 0; i < 6; i++){ ctx.moveTo(-.9, 1.2 + i*1.2); ctx.lineTo(.3, 1.2 + i*1.2); } }); ctx.restore(); // the tally-stick on its thong
    PR.face(ctx, F);
    B5P.hair(ctx, F, {c:['#b08a52', '#6a4a24', '#22160a'], v:4.2, wx:2.2, hl:13, ey:4, n:70, sw:.6, s:['#c09858', '#5a3c1c', '#8a6634', '#3a2410'], spiky:9, seed:13, sh:'#ffe0a0', shA:.3, part:2, wisp:4});
    PR.strands(ctx, 30, ['#a07a44', '#6a4a24', '#c09858', '#4a3018'], .7, 17, (i, r) => { const x = -10 + r()*18, y = F.cy - 19; return [x, y, x - 1 + r()*2, y + 4, x - 2.5 + r()*2.6, y + 8 + r()*3]; }); return F; }, // the fringe, in his eyes
  /* Thegg: half Tarthenal, huge and calm; a heavy jaw, black hair dragged back, two sets of scale riveted into one, his mother's clay beads, the tower shield */
  thegg(ctx){ const F = {cy:-75, w:16.2, h:21.4, jaw:1.04, chin:7.6, skin:'#a27c5c', iris:'#3a2a1a', lip:'#7e4c3c', browCol:'#1a100a', browW:2.4, arch:.25, rim:'#9a8466', rimA:.18, nose:1.4, age:.35, look:-.05, open:.76, smileL:.1, smileR:.15, mouthW:5, earS:1.15};
    ctx.save(); ctx.translate(-56, -52); ctx.rotate(-.05); const ts = () => { ctx.beginPath(); ctx.moveTo(-22, -54); ctx.quadraticCurveTo(0, -60, 22, -54); ctx.lineTo(22, 56); ctx.lineTo(-22, 56); ctx.closePath(); };
      ts(); ctx.fillStyle = PR.lin(ctx, -22, -50, 22, 40, [[0, '#647688'], [.45, '#3e4c5a'], [1, '#0a0c10']]); ctx.fill(); ctx.save(); ts(); ctx.clip(); // the tower shield behind his left shoulder, made twice
      PR.stroke(ctx, 'rgba(0,0,0,.35)', .6, () => { for (let i = -2; i <= 2; i++){ ctx.moveTo(i*8.8, -60); ctx.lineTo(i*8.8, 60); } }); const r = PR.rng(19); for (let i = 0; i < 12; i++) PR.soft(ctx, -20 + r()*36, -50 + r()*100, 2 + r()*5, 1 + r()*2, '#6a4a2c', .6, r()*3);
      PR.soft(ctx, -10, -36, 12, 26, '#e0e8f0', .12); ctx.fillStyle = PR.lin(ctx, -22, 0, 22, 0, [[0, '#a8a8a0'], [.5, '#4a4a46'], [1, '#121210']]); ctx.fillRect(-22, -8, 44, 4); ctx.restore(); // the iron band
      ctx.strokeStyle = PR.lin(ctx, -22, -50, 22, 50, [[0, '#c0c0b8'], [.5, '#5a5a56'], [1, '#121210']]); ctx.lineWidth = 2.4; ts(); ctx.stroke(); for (let i = 0; i < 9; i++){ ell(ctx, -20.6, -50 + i*12, .7, .7, '#e0dcd0'); ell(ctx, 20.6, -50 + i*12, .7, .7, '#3a3834'); }
      ctx.restore();
    { ctx.save(); ctx.translate(-56, -58); const br = 7; ell(ctx, .8, 1, br + .8, br + .8, 'rgba(0,0,0,.55)'); ell(ctx, 0, 0, br, br, PR.rad(ctx, -br*.35, -br*.35, .3, br*1.1, [[0, '#f0ece4'], [.35, '#9a9a94'], [1, '#262624']])); ctx.rotate(-.25); ell(ctx, 0, 0, br*.24, br*.55, '#f4f0e6'); ctx.restore(); } // the white fingertip on the boss
    PR.torsoPath(ctx, 60, 0); ctx.fillStyle = '#26241f'; ctx.fill(); ctx.save(); PR.torsoPath(ctx, 60, 0); ctx.clip();
      B5P.scales(ctx, -62, -2, -50, 2, 5.4, '#aaa292', 23); B5P.scales(ctx, 2, 62, -50, 2, 5.4, '#8a8476', 24); PR.soft(ctx, 40, -18, 30, 30, '#000000', .5); PR.soft(ctx, -30, -36, 22, 10, '#fff0d8', .1);
      ctx.fillStyle = PR.lit(ctx, '#5a4028', '#1a1008', -4, 4); ctx.fillRect(-3.2, -50, 6.4, 54); for (let i = 0; i < 7; i++){ ell(ctx, -1.4, -44 + i*7, .9, .9, '#d8d0c0'); ell(ctx, 1.6, -42 + i*7, .9, .9, '#5a5650'); } // the riveted seam where two coats became one
      ctx.fillStyle = PR.lit(ctx, '#6a4a30', '#1a1008', -50, 50); [-1, 1].forEach(sd => { PR.path(ctx, [[sd*20, -48], [sd*30, -46], [sd*28, 4], [sd*18, 4]]); ctx.fill(); }); ctx.restore(); // the shoulder straps
    B5P.back(ctx, F, '#2a2018', '#0e0a08', 16, 2.2); PR.neck(ctx, F, 12); B5P.collar(ctx, F, '#7a6a52', '#1a140c', 'rgba(0,0,0,.32)', {sw:36, sy:-40});
    for (let i = 0; i < 11; i++){ const k = i/10 - .5, x = k*28, y = -49 + (1 - 4*k*k)*8.6, c = ['#b0623a', '#8a4428', '#c07a48', '#7a3a22'][i%4]; ell(ctx, x + .5, y + 1, 2.4, 2.1, 'rgba(0,0,0,.5)'); ell(ctx, x, y, 2.3, 2.1, PR.rad(ctx, x - .8, y - .8, .2, 2.6, [[0, shade(c, .35)], [.5, c], [1, shade(c, -.6)]])); } // his mother's clay beads
    F.under = (ctx, F) => { PR.dots(ctx, F, 260, 'rgba(26,16,10,.32)', .5, [7, 19, (x, y) => (Math.abs(x) < 4.6 && y > 10 && y < 14.6)]); PR.soft(ctx, 0, F.cy - 6, F.w*.9, 2.6, '#140806', .35); }; // stubble; the heavy brow's shadow
    PR.face(ctx, F);
    B5P.hair(ctx, F, {c:['#4a3a2e', '#1c140e', '#070504'], v:5, wx:2, hl:12, ey:1, n:90, sw:.6, s:['#3a2c22', '#120c08', '#5a4838'], seed:29, sh:'#c0a890', shA:.28}); return F; },
  /* Perrit: small, upright, precise; black hair in a clerk's knot with a stylus through it, a high-collared cadre coat buttoned to the throat with the grey piping, the calfskin pouch of black tiles */
  perrit(ctx){ const F = {cy:-73, w:11.8, h:19.2, jaw:.68, chin:4, skin:'#d4b49c', iris:'#3a3a52', lip:'#a06a64', browCol:'#141016', browW:1.1, arch:1.3, browL:.5, browR:.7, rim:'#a8a0d8', rimA:.28, nose:.9, look:.05, open:.95, smileL:-.15, smileR:-.05, mouthW:3.1};
    PR.torsoPath(ctx, 31, 6); ctx.fillStyle = PR.lit(ctx, '#46465e', '#0c0c14', -31, 22); ctx.fill(); ctx.save(); PR.torsoPath(ctx, 31, 6); ctx.clip(); // the cadre coat
      const pip = 'rgba(196,192,214,.85)'; PR.stroke(ctx, 'rgba(0,0,0,.55)', 1.4, () => { ctx.moveTo(4, -48); ctx.quadraticCurveTo(7, -20, 6, 6); }); PR.stroke(ctx, pip, .7, () => { ctx.moveTo(3, -48); ctx.quadraticCurveTo(6, -20, 5, 6); }); // the closure, off the middle
      for (let i = 0; i < 6; i++){ const y = -44 + i*7.6, x = 3.4 + Math.sin((y + 48)/54*1.6)*2.4; ell(ctx, x - .3, y, 1.25, 1.25, '#0a0a10'); ell(ctx, x - .5, y - .2, 1, 1, PR.rad(ctx, x - .9, y - .6, .1, 1.2, [[0, '#e8e6f0'], [1, '#5a5870']])); } // the buttons
      PR.stroke(ctx, pip, .6, () => { [-1, 1].forEach(sd => { ctx.moveTo(sd*12, -47); ctx.quadraticCurveTo(sd*22, -44, sd*28, -36); }); }); PR.stroke(ctx, 'rgba(0,0,0,.4)', .8, () => { ctx.moveTo(-14, -30); ctx.quadraticCurveTo(-16, -12, -14, 6); ctx.moveTo(20, -30); ctx.quadraticCurveTo(22, -12, 20, 6); });
      PR.soft(ctx, 22, -18, 18, 22, '#000000', .5); PR.soft(ctx, -18, -36, 10, 6, '#c8c0f0', .12); ctx.restore();
    ctx.save(); ctx.translate(-21, -12); ctx.rotate(-.08); ctx.fillStyle = PR.lin(ctx, -8, -6, 8, 8, [[0, '#d8b88a'], [.5, '#a07a4e'], [1, '#3a2614']]); ctx.beginPath(); ctx.moveTo(-8, -5); ctx.lineTo(8, -5); ctx.lineTo(7.4, 6); ctx.quadraticCurveTo(0, 8.4, -7.4, 6); ctx.closePath(); ctx.fill(); // the calfskin pouch
      [[-4, -1, 3, 2], [3, 2, 2.6, 1.8], [-1, 4, 2, 1.4]].forEach(([x, y, a, b]) => PR.soft(ctx, x, y, a, b, '#2a1a0c', .5)); // the calf's dapple
      [[-5, -8, -.2], [-1, -9, .1], [3, -8.4, .3]].forEach(([x, y, a]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = '#060608'; ctx.fillRect(-1.8, -1.8, 3.6, 4.4); ctx.fillStyle = 'rgba(220,220,255,.45)'; ctx.fillRect(-1.8, -1.8, 3.6, .5); PR.stroke(ctx, 'rgba(232,190,90,.75)', .25, () => { ctx.moveTo(-.8, -.6); ctx.lineTo(.6, .8); ctx.lineTo(-.6, 1.8); }); ctx.restore(); }); // black tiles, gold in the cuts
      ctx.fillStyle = PR.lin(ctx, -8, -5, 8, 0, [[0, '#c8a474'], [1, '#4a3018']]); ctx.beginPath(); ctx.moveTo(-8.4, -5.6); ctx.lineTo(8.4, -5.6); ctx.lineTo(6, 0); ctx.quadraticCurveTo(0, 1.6, -6, 0); ctx.closePath(); ctx.fill(); ell(ctx, 0, .4, 1.1, 1.1, '#e0dcd0'); PR.stitch(ctx, 'rgba(60,40,20,.7)', .3, () => { ctx.moveTo(-7.4, -4.6); ctx.lineTo(-5.4, -.4); ctx.quadraticCurveTo(0, 1, 5.4, -.4); }); ctx.restore();
    PR.neck(ctx, F, 7.8); B5P.collar(ctx, F, '#4e4e68', '#0c0c14', null, {sw:23, sy:-36, pip:'rgba(196,192,214,.85)'}); ell(ctx, -.1, F.cy + 23.4, .9, .9, '#c8c6d8'); // the high collar, piped, hooked at the throat
    PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ell(ctx, 0, top - 4.2, 5.6, 4.2, PR.rad(ctx, -1.6, top - 6, .4, 6, [[0, '#4a4458'], [.5, '#16121a'], [1, '#040304']])); // the knot
    PR.stroke(ctx, 'rgba(160,150,200,.4)', .45, () => { ctx.ellipse(0, top - 4.2, 4, 2.8, 0, 3.4, 5.4); ctx.moveTo(-3.6, top - 2.6); ctx.quadraticCurveTo(0, top - 6, 4, top - 3.4); });
    B5P.hair(ctx, F, {c:['#3e3848', '#141018', '#040304'], v:1.6, wx:.9, hl:13.6, ey:-2.4, n:80, sw:.45, s:['#2a2432', '#0c0a0e', '#4a4458'], seed:37, sh:'#b8b0e8', shA:.32});
    ctx.lineCap = 'round'; PR.stroke(ctx, '#7a5a20', .9, () => { ctx.moveTo(-7.6, top - 8.6); ctx.lineTo(7, top - 1); }); PR.stroke(ctx, '#f0d088', .35, () => { ctx.moveTo(-7.6, top - 8.9); ctx.lineTo(1, top - 4.8); }); return F; }, // the brass stylus through it
  /* Ammet: forty-one, the battalion's surgeon; a broad, tired, unsentimental face, grey hair cropped close, a leather apron over a quilted coat, the roll of instruments */
  ammet(ctx){ const F = {cy:-73, w:13.6, h:19.6, jaw:.9, chin:5.6, skin:'#b88e6e', iris:'#4a3a26', lip:'#8a5846', browCol:'#7a726a', browW:1.7, arch:.45, rim:'#8fb39a', rimA:.2, nose:1.15, bags:.9, age:.85, look:-.15, open:.82, smileL:-.25, smileR:.05, mouthW:3.7};
    PR.torsoPath(ctx, 42, 2); ctx.fillStyle = PR.lit(ctx, '#6e7e6c', '#141a14', -42, 30); ctx.fill(); ctx.save(); PR.torsoPath(ctx, 42, 2); ctx.clip(); // the quilted coat
      for (let x = -40; x < 42; x += 5.2) { const k = (x + 40)/82; PR.soft(ctx, x + 2.6, -20, 2, 28, '#e8f0e0', .1*(1 - k)); } PR.stitch(ctx, 'rgba(10,16,10,.55)', .45, () => { for (let x = -40; x < 42; x += 5.2){ ctx.moveTo(x, -46); ctx.lineTo(x + 1, 4); } });
      const ap = () => { ctx.beginPath(); ctx.moveTo(-13, -40); ctx.lineTo(13, -40); ctx.quadraticCurveTo(15, -30, 23, -24); ctx.lineTo(27, 6); ctx.lineTo(-27, 6); ctx.lineTo(-23, -24); ctx.quadraticCurveTo(-15, -30, -13, -40); ctx.closePath(); };
      ap(); ctx.fillStyle = PR.lit(ctx, '#9a6c40', '#24160a', -26, 24); ctx.fill(); ctx.save(); ap(); ctx.clip(); const r = PR.rng(43); for (let i = 0; i < 8; i++) PR.soft(ctx, -20 + r()*36, -34 + r()*36, 2 + r()*4, 1.4 + r()*3, i < 3 ? '#3a0e08' : '#1a0e06', .45, r()*3); // stains, old and older
        PR.soft(ctx, -14, -30, 10, 12, '#ffe8c8', .14); ctx.restore(); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = .6; ap(); ctx.stroke(); PR.stitch(ctx, 'rgba(230,190,130,.5)', .35, () => { ctx.moveTo(-12, -38.6); ctx.lineTo(12, -38.6); ctx.moveTo(-21.6, -23); ctx.lineTo(-25.4, 5); });
      ctx.fillStyle = PR.lit(ctx, '#5a3e22', '#1a0e06', -14, 14); PR.path(ctx, [[-10, -12], [10, -12], [10, 0], [-10, 0]]); ctx.fill(); PR.stitch(ctx, 'rgba(230,190,130,.45)', .3, () => { ctx.moveTo(-9.4, -11.4); ctx.lineTo(9.4, -11.4); }); // the pocket
      PR.soft(ctx, 30, -18, 22, 24, '#000000', .5); ctx.restore();
    PR.stroke(ctx, '#3a2412', 1.8, () => { ctx.moveTo(-12.6, -40); ctx.quadraticCurveTo(-13, -50, -11.6, -58); ctx.moveTo(12.6, -40); ctx.quadraticCurveTo(13, -50, 11.6, -58); }); // the apron's neck strap
    ctx.save(); ctx.translate(-15, -20); ctx.rotate(-.12); ctx.fillStyle = PR.lit(ctx, '#7a5634', '#24160a', -11, 11); ctx.fillRect(-11, -4.6, 22, 9.2); // the roll of instruments, half untied
      for (let i = 0; i < 7; i++){ const x = -8.6 + i*2.8, h2 = 5 + (i%3)*1.4; ctx.fillStyle = PR.lin(ctx, x - .6, 0, x + .6, 0, [[0, '#f4f2ec'], [.5, '#a8a8a4'], [1, '#3a3a38']]); ctx.fillRect(x - .55, -4.6 - h2, 1.1, h2 + 2); if (i%2) ell(ctx, x, -4.6 - h2, .9, .5, '#d8d8d0'); }
      PR.stitch(ctx, 'rgba(230,190,130,.5)', .3, () => { ctx.moveTo(-10.4, -3.6); ctx.lineTo(10.4, -3.6); }); PR.stroke(ctx, '#2a1808', .8, () => { ctx.moveTo(4, -4.6); ctx.lineTo(5, 4.6); ctx.moveTo(5, 4.6); ctx.quadraticCurveTo(7, 9, 4, 11); }); ctx.restore();
    PR.neck(ctx, F, 9.6); B5P.collar(ctx, F, '#76866e', '#141a14', 'rgba(10,16,10,.38)', {sw:32});
    F.under = (ctx, F) => { PR.soft(ctx, 0, F.cy - 14, F.w*.7, 1.6, '#2a120c', .25); PR.soft(ctx, -6.6, F.cy + 7, 3.4, 3, '#2a120c', .2); }; // a frown worn in; the cheek fallen a little
    PR.face(ctx, F);
    const hs = B5P.hair(ctx, F, {c:['#b8b2a8', '#7a746a', '#2a2622'], v:2, wx:1.2, hl:14.4, ey:-3, n:40, sw:.5, seed:47, sh:'#ffffff', shA:.2, wisp:0});
    { const u = F.h/20, r = PR.rng(49); ctx.save(); hs(); ctx.clip(); ctx.lineCap = 'round'; for (let i = 0; i < 260; i++){ const a = Math.PI*(1.02 + r()*.96), rr = .55 + r()*.45, x = Math.cos(a)*(F.w + .8)*rr, y = F.cy - 6*u + Math.sin(a)*(15.6*u + 1.6)*rr; if (y > F.cy - 12.6*u && Math.abs(x) < F.w - 1.2) continue;
      const c = r() < .25 ? 'rgba(230,226,218,.45)' : r() < .6 ? 'rgba(30,28,24,.5)' : 'rgba(140,134,124,.5)'; PR.stroke(ctx, c, .4, () => { ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a)*1.1, y + Math.sin(a)*1.1 - .3); }); } ctx.restore(); } // the crop: salt, pepper and iron
    return F; },
  /* Ruuk: seventeen, Faraed, a step ahead; a quick grin, black hair every which way with a hawk's feather in it, the hood pushed back, hide over wool, the bundle of throwing-spears */
  ruuk(ctx){ const F = {cy:-72, w:11.8, h:19, jaw:.7, chin:4.2, skin:'#9c7252', iris:'#1e140c', lip:'#6e4232', browCol:'#140c08', browW:1.3, arch:1.4, browL:.8, browR:.5, rim:'#a88a5a', rimA:.26, nose:1, look:.55, open:1.1, smileL:.7, smileR:.9, mouthW:3.6, teeth:1};
    for (let i = 0; i < 4; i++){ ctx.save(); ctx.translate(22 + i*3.6, 2); ctx.rotate(.2 - i*.03); ctx.lineCap = 'butt'; ctx.strokeStyle = PR.lin(ctx, -1, 0, 1, 0, [[0, '#c8a06a'], [.5, '#7a5a34'], [1, '#2a1c0e']]); ctx.lineWidth = 1.9; ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(0, -104 + i*4); ctx.stroke(); // the throwing-spears
      const hy = -104 + i*4; PR.path(ctx, [[0, hy - 13], [2.2, hy - 5], [.8, hy], [-.8, hy], [-2.2, hy - 5]]); ctx.fillStyle = PR.lin(ctx, -2.2, 0, 2.2, 0, [[0, '#f0ece4'], [.45, '#a09c94'], [1, '#2a2826']]); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.4)', .3, () => { ctx.moveTo(0, hy - 12); ctx.lineTo(0, hy); });
      PR.stroke(ctx, '#d8c8a0', .5, () => { for (let k = 0; k < 3; k++){ ctx.moveTo(-1.1, hy + 1 + k*.9); ctx.lineTo(1.1, hy + 1.4 + k*.9); } }); ctx.restore(); }
    PR.stroke(ctx, '#3a2614', 1.2, () => { ctx.moveTo(11, -46); ctx.quadraticCurveTo(26, -50, 34, -44); }); // the bundle's thong
    PR.torsoPath(ctx, 31, 6); ctx.fillStyle = PR.lit(ctx, '#5e5444', '#14100a', -31, 22); ctx.fill(); ctx.save(); PR.torsoPath(ctx, 31, 6); ctx.clip(); // wool under
      [-1, 1].forEach(sd => { ctx.beginPath(); ctx.moveTo(sd*9, -46); ctx.quadraticCurveTo(sd*24, -46, sd*32, -34); ctx.lineTo(sd*34, 6); ctx.lineTo(sd*7, 6); ctx.quadraticCurveTo(sd*10, -22, sd*9, -46); ctx.closePath(); // the hide, over it
        ctx.fillStyle = sd < 0 ? PR.lin(ctx, -32, -40, -8, 0, [[0, '#c09a68'], [.5, '#8a6a42'], [1, '#3a2814']]) : PR.lin(ctx, 8, 0, 32, 0, [[0, '#5a4226'], [1, '#100a04']]); ctx.fill();
        const r = PR.rng(53 + sd); for (let i = 0; i < 10; i++) PR.soft(ctx, sd*(12 + r()*18), -38 + r()*40, 1 + r()*2.4, .8 + r()*1.4, '#2a1808', .35); // the hide's marks
        PR.stroke(ctx, 'rgba(230,206,160,.55)', .6, () => { for (let i = 0; i < 9; i++){ const y = -10 + i*.4, x = sd*(8 + i*2.9); ctx.moveTo(x, y); ctx.lineTo(x + sd*.4, y + 6 + (i%2)*2); } }); }); // the fringe
      PR.stroke(ctx, '#2a1808', .6, () => { for (let i = 0; i < 4; i++){ const y = -38 + i*7; ctx.moveTo(-8.6, y); ctx.lineTo(8.6, y + 3); ctx.moveTo(8.6, y); ctx.lineTo(-8.6, y + 3); } }); PR.soft(ctx, 22, -18, 18, 22, '#000000', .45); ctx.restore(); // laced across
    PR.neck(ctx, F, 8.2); B5P.collar(ctx, F, '#8a7656', '#16120a', 'rgba(0,0,0,.42)', {sw:24, sy:-36, style:'fold'}); // the hood's fall round his neck, in folds
    PR.face(ctx, F);
    B5P.hair(ctx, F, {c:['#3a2c22', '#140c08', '#050302'], v:5, wx:2.2, hl:12.6, ey:1.6, n:60, sw:.6, s:['#2a1e16', '#0c0806', '#4a3a2c'], spiky:20, seed:59, part:3, wisp:4, sh:'#d8b890', shA:.26});
    PR.strands(ctx, 9, ['#1a120c', '#3a2a1e'], .8, 61, (i, r) => { const x = -6 + r()*12, y = F.cy - 18.6; return [x, y, x + 2, y + 3, x + 3 + r()*2, y + 4 + r()*3]; }); // a lock fallen forward
    ctx.save(); ctx.translate(-F.w - 1.4, F.cy - 10); ctx.rotate(-.55); ctx.fillStyle = PR.lin(ctx, -1.6, 0, 1.6, 0, [[0, '#f0e8d8'], [1, '#8a7a64']]); ctx.beginPath(); ctx.moveTo(0, 2); ctx.quadraticCurveTo(-2.2, -6, 0, -14); ctx.quadraticCurveTo(2, -6, 0, 2); ctx.fill(); // the hawk's feather
      PR.stroke(ctx, 'rgba(60,40,24,.85)', .55, () => { for (let i = 0; i < 4; i++){ ctx.moveTo(-1.4, -2 - i*3); ctx.lineTo(1.2, -3 - i*3); } }); PR.stroke(ctx, '#3a2a1a', .3, () => { ctx.moveTo(0, 3); ctx.lineTo(0, -13); }); ctx.restore(); return F; },
  /* Brune: twenty-four, of the Shake; long-limbed and sea-weathered, dark hair pulled back with one long lock over the shoulder, oiled sealskin, the cord of burial shells (one black), the barbed fish-spear */
  brune(ctx){ const F = {cy:-74, w:12.4, h:20.4, jaw:.76, chin:4.8, skin:'#a88262', iris:'#3a5058', lip:'#8a584a', browCol:'#2a201c', browW:1.35, arch:.6, rim:'#7a9aa0', rimA:.26, nose:1.05, age:.3, look:-.25, open:.82, smileL:-.05, smileR:.1, mouthW:3.6};
    ctx.save(); ctx.translate(33, 4); ctx.rotate(.05); ctx.lineCap = 'butt'; ctx.strokeStyle = PR.lin(ctx, -1.6, 0, 1.6, 0, [[0, '#a8865a'], [.5, '#5a4228'], [1, '#1a1208']]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(0, -98); ctx.stroke(); // the fish-spear, shortened for the press
      PR.stroke(ctx, '#c8b890', .6, () => { for (let k = 0; k < 7; k++){ ctx.moveTo(-1.6, -96 + k*1.1); ctx.lineTo(1.6, -95.4 + k*1.1); } });
      ctx.fillStyle = PR.lin(ctx, -4, 0, 4, 0, [[0, '#f0ece4'], [.45, '#a09c94'], [1, '#22201e']]); PR.path(ctx, [[-1.2, -98], [1.2, -98], [.9, -118], [0, -124], [-.9, -118]]); ctx.fill(); // the tine
      [[-1, -106], [1, -112]].forEach(([sd, y]) => { PR.path(ctx, [[sd*.6, y + 2], [sd*.8, y - 1], [sd*4.4, y + 3.6], [sd*1, y + .4]]); ctx.fill(); }); PR.stroke(ctx, 'rgba(255,255,255,.5)', .3, () => { ctx.moveTo(-.4, -99); ctx.lineTo(-.3, -121); }); ctx.restore(); // the barbs
    PR.torsoPath(ctx, 36, 4); ctx.fillStyle = PR.lit(ctx, '#4e5e62', '#0a1012', -36, 26); ctx.fill(); ctx.save(); PR.torsoPath(ctx, 36, 4); ctx.clip(); // oiled sealskin
      PR.soft(ctx, -22, -32, 12, 5, '#e8f8ff', .3, -.5); PR.soft(ctx, -16, -12, 6, 14, '#d0e8f0', .14, .2); PR.soft(ctx, 8, -30, 6, 3, '#d0e8f0', .1, -.3); // the oil's shine
      PR.stitch(ctx, 'rgba(200,220,220,.35)', .4, () => { ctx.moveTo(-34, -24); ctx.quadraticCurveTo(-24, -34, -11, -42); ctx.moveTo(34, -24); ctx.quadraticCurveTo(24, -34, 11, -42); ctx.moveTo(-6, -42); ctx.quadraticCurveTo(-10, -20, -8, 6); });
      PR.stroke(ctx, 'rgba(0,0,0,.4)', .8, () => { ctx.moveTo(-6.6, -42); ctx.quadraticCurveTo(-10.6, -20, -8.6, 6); }); PR.soft(ctx, 24, -18, 18, 22, '#000000', .5); ctx.restore();
    B5P.back(ctx, F, '#3a2e26', '#120c0a', 18, 1.8); PR.neck(ctx, F, 8.6); B5P.collar(ctx, F, '#8a8470', '#1e1c16', 'rgba(0,0,0,.32)', {sw:27, sy:-37, style:'wrap'}); // undyed wool at the throat
    const sh = k => [(k - .5)*24, -49 + Math.sin(k*Math.PI)*10.6]; PR.stroke(ctx, '#3a2c1c', .6, () => { for (let i = 0; i <= 20; i++){ const [x, y] = sh(i/20); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } });
    for (let i = 0; i < 9; i++){ const [x, y] = sh(.08 + i/8*.84), blk = i === 5; ctx.save(); ctx.translate(x, y + 1.4); ctx.rotate((i/8 - .5)*-.9); ell(ctx, .4, .5, 1.3, 1.9, 'rgba(0,0,0,.5)'); ell(ctx, 0, 0, 1.25, 1.85, PR.rad(ctx, -.4, -.6, .1, 2, blk ? [[0, '#5a5650'], [1, '#08080a']] : [[0, '#ffffff'], [.6, '#e0d8c4'], [1, '#8a806a']])); PR.stroke(ctx, blk ? 'rgba(160,160,170,.5)' : 'rgba(90,70,50,.6)', .3, () => { ctx.moveTo(0, -1.4); ctx.lineTo(0, 1.4); }); ctx.restore(); } // the burial shells, one of them black
    F.under = (ctx, F) => { PR.dots(ctx, F, 50, 'rgba(70,36,20,.24)', .5, [-3, 8, (x, y) => Math.abs(x) > F.w*.8]); PR.soft(ctx, -7, F.cy + 6, 3.4, 2, '#ffd8b8', .12); }; // weather
    PR.face(ctx, F);
    B5P.hair(ctx, F, {c:['#4a3c32', '#1e1612', '#060404'], v:3.2, wx:1.6, hl:13, ey:2, n:70, sw:.55, s:['#3a2e26', '#120c0a', '#5a4a3e'], seed:67, sh:'#b8d8e0', shA:.3});
    const lock = () => { ctx.beginPath(); ctx.moveTo(-F.w - 1, F.cy - 6); ctx.bezierCurveTo(-F.w - 6.4, F.cy + 8, -F.w - 3.6, F.cy + 26, -F.w - 7, F.cy + 46); ctx.quadraticCurveTo(-F.w - 4.4, F.cy + 50, -F.w - 1.4, F.cy + 46); ctx.bezierCurveTo(-F.w + 2, F.cy + 26, -F.w - .4, F.cy + 8, -F.w + 1.4, F.cy - 4); ctx.closePath(); }; // the long lock over her shoulder
    lock(); ctx.fillStyle = PR.lin(ctx, -F.w - 6, 0, -F.w + 2, 0, [[0, '#5a4a3e'], [.5, '#2a2018'], [1, '#0a0806']]); ctx.fill();
    PR.strands(ctx, 26, ['#7a6656', '#2a2018', '#4a3a30', '#0e0a08'], .5, 71, (i, r) => { const d = -2.6 + r()*4.4; return [-F.w + d*.4, F.cy - 4, -F.w - 4.4 + d, F.cy + 18 + r()*6, -F.w - 4.6 + d*.6, F.cy + 44 + r()*4]; });
    ctx.fillStyle = '#c8b890'; ctx.fillRect(-F.w - 4.6, F.cy + 24, 4.2, 1.6); ell(ctx, -F.w - 2.6, F.cy + 27.4, 1, 1.5, '#f0e8d8'); return F; }, // tied with a cord and a shell
  /* Pessa: thirty-three, pressed on the road south; a boatwoman's face under a faded kerchief, a burn-scar on her cheek, a jack two sizes too big under her own oilskin, the canal boathook held like a pole */
  pessa(ctx){ const F = {cy:-73, w:12.8, h:19.6, jaw:.8, chin:4.8, skin:'#c09676', iris:'#4a3a2a', lip:'#8a5646', browCol:'#3a2418', browW:1.5, arch:.6, browL:-.2, browR:.5, rim:'#a8907a', rimA:.24, nose:1.1, look:.3, open:.9, smileL:-.3, smileR:.2, mouthW:3.6, bags:.5, age:.25};
    ctx.save(); ctx.translate(-35, 4); ctx.rotate(-.04); ctx.lineCap = 'butt'; ctx.strokeStyle = PR.lin(ctx, -2, 0, 2, 0, [[0, '#a88a62'], [.5, '#5a4630'], [1, '#1a140c']]); ctx.lineWidth = 3.4; ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(0, -100); ctx.stroke(); // the boathook's pole, ash gone grey
      ctx.fillStyle = PR.lin(ctx, -2.4, 0, 2.4, 0, [[0, '#9a9a94'], [.5, '#4a4a46'], [1, '#141412']]); ctx.fillRect(-2.2, -106, 4.4, 8); PR.stroke(ctx, 'rgba(0,0,0,.6)', .5, () => { ctx.moveTo(-2.2, -102); ctx.lineTo(2.2, -102); }); // the iron socket
      ctx.lineCap = 'round'; ctx.strokeStyle = '#141412'; ctx.lineWidth = 2.8; const hook = () => { ctx.beginPath(); ctx.moveTo(0, -105); ctx.lineTo(0, -120); ctx.moveTo(0, -108); ctx.bezierCurveTo(-4, -110, -10, -112, -10, -118); ctx.quadraticCurveTo(-10, -123, -6, -122); }; hook(); ctx.stroke();
      ctx.strokeStyle = PR.lin(ctx, -10, 0, 2, 0, [[0, '#d8d8d0'], [.6, '#7a7a74'], [1, '#2a2a28']]); ctx.lineWidth = 1.8; hook(); ctx.stroke(); PR.stroke(ctx, 'rgba(255,255,255,.55)', .4, () => { ctx.moveTo(-.5, -119); ctx.lineTo(-.5, -106); ctx.moveTo(-9.4, -114); ctx.quadraticCurveTo(-10, -121, -7, -121.4); });
      PR.stroke(ctx, '#b8a074', .6, () => { for (let k = 0; k < 6; k++){ ctx.moveTo(-1.8, -96 + k*1.1); ctx.lineTo(1.8, -95.2 + k*1.1); } }); ctx.restore(); // a twist of tarred line under the socket
    PR.strands(ctx, 30, ['#4a3020', '#2a1a10', '#6a4a30'], .8, 79, (i, r) => { const sd = i%2 ? 1 : -1, x = sd*(F.w - 1 + r()*3); return [x, F.cy - 4, x + sd*(2 + r()*2), F.cy + 12, x + sd*(1 + r()*4), -46 + r()*6]; }); // her hair, loose under the kerchief, down to the shoulders
    PR.torsoPath(ctx, 41, 5); ctx.fillStyle = PR.lit(ctx, '#7a6c56', '#1a160e', -41, 28); ctx.fill(); ctx.save(); PR.torsoPath(ctx, 41, 5); ctx.clip(); // the jack, two sizes too big
      PR.stroke(ctx, 'rgba(0,0,0,.4)', 1, () => { for (let i = 0; i < 5; i++){ ctx.moveTo(-20 + i*10, -44); ctx.quadraticCurveTo(-24 + i*11, -20, -22 + i*11, 6); } }); PR.stitch(ctx, 'rgba(230,210,170,.3)', .35, () => { for (let i = 0; i < 5; i++){ ctx.moveTo(-17 + i*10, -44); ctx.quadraticCurveTo(-21 + i*11, -20, -19 + i*11, 6); } });
      [-1, 1].forEach(sd => { ctx.beginPath(); ctx.moveTo(sd*8, -48); ctx.quadraticCurveTo(sd*30, -48, sd*42, -30); ctx.lineTo(sd*44, 8); ctx.lineTo(sd*15, 8); ctx.quadraticCurveTo(sd*12, -18, sd*8, -48); ctx.closePath(); // her own oilskin, open over it
        ctx.fillStyle = sd < 0 ? PR.lin(ctx, -40, -40, -8, 0, [[0, '#6a7048'], [.5, '#424828'], [1, '#14160a']]) : PR.lin(ctx, 8, 0, 40, 0, [[0, '#2a2e18'], [1, '#060704']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = .6; ctx.stroke(); });
      PR.soft(ctx, -26, -32, 10, 4, '#f0f4d8', .28, -.6); PR.soft(ctx, -20, -14, 4, 10, '#e0e8c0', .12, .2); // the oilskin's sheen
      ctx.save(); ctx.translate(-26, -16); ctx.rotate(.2); ctx.fillStyle = PR.lit(ctx, '#7a5a3a', '#2a1a0c', -5, 5); ctx.fillRect(-5, -4, 10, 8); PR.stitch(ctx, 'rgba(230,210,170,.6)', .35, () => { ctx.rect(-4.4, -3.4, 8.8, 6.8); }); ctx.restore(); // a patch, sewn on with what there was
      PR.soft(ctx, 28, -18, 20, 22, '#000000', .45); ctx.restore();
    PR.neck(ctx, F, 9); B5P.collar(ctx, F, '#8a7a60', '#1a160e', 'rgba(0,0,0,.36)', {sw:32, style:'wrap'});
    F.under = (ctx, F) => { const u = F.h/20, x = -F.w*.5, y = F.cy + 5.4*u, r = PR.rng(83); ctx.fillStyle = 'rgba(178,104,92,.38)'; ctx.beginPath(); ctx.moveTo(x - 3.8, y - 1.6); ctx.bezierCurveTo(x - 2, y - 3.6, x + 2.4, y - 3, x + 3.2, y - 1); ctx.bezierCurveTo(x + 3.6, y + 1.6, x + 1, y + 3.6, x - 1.6, y + 3); ctx.bezierCurveTo(x - 4, y + 2.4, x - 4.6, y, x - 3.8, y - 1.6); ctx.fill(); // the burn-scar
      for (let i = 0; i < 7; i++) PR.soft(ctx, x - 2.6 + r()*5, y - 2 + r()*4.4, .8 + r()*1.2, .6 + r(), i%2 ? '#ffe4d8' : '#7a3428', i%2 ? .42 : .2); PR.stroke(ctx, 'rgba(255,220,200,.35)', .35, () => { ctx.moveTo(x - 3, y - 1.4); ctx.quadraticCurveTo(x, y - 2.6, x + 2.6, y - .8); }); }; // shiny where it healed, puckered where it didn't
    PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u, kf = () => { ctx.beginPath(); ctx.moveTo(-F.w - 2, F.cy - 2); ctx.bezierCurveTo(-F.w - 3, top - 1, -F.w*.6, top - 5, 0, top - 5); ctx.bezierCurveTo(F.w*.6, top - 5, F.w + 3, top - 1, F.w + 2, F.cy - 2); ctx.lineTo(F.w - .4, F.cy - 4); ctx.bezierCurveTo(F.w - 1, F.cy - 13.4*u, F.w*.5, F.cy - 15.4*u, 0, F.cy - 15.2*u); ctx.bezierCurveTo(-F.w*.5, F.cy - 15.4*u, -F.w + 1, F.cy - 13.4*u, -F.w + .4, F.cy - 4); ctx.closePath(); };
    PR.strands(ctx, 12, ['#4a3020', '#6a4a30', '#2a1a10'], .6, 89, (i, r) => { const x = -F.w + 1 + r()*F.w*1.4, y = F.cy - 14.6*u; return [x, y, x - 1 + r()*2, y + 2.4, x - 2 + r()*3, y + 3.6 + r()*2.4]; }); // hair escaping at the brow
    kf(); ctx.fillStyle = PR.lin(ctx, -F.w - 3, top - 5, F.w + 3, F.cy, [[0, '#b07a66'], [.4, '#80524a'], [.8, '#2e1a16'], [1, '#0a0605']]); ctx.fill(); // the kerchief, madder once
    ctx.save(); kf(); ctx.clip(); PR.stroke(ctx, 'rgba(30,12,10,.45)', .7, () => { for (let i = 0; i < 5; i++){ ctx.moveTo(-F.w + i*2, F.cy - 4 - i*1.6); ctx.quadraticCurveTo(-4 + i*3, top - 2 + i, 6 + i*2, top - 3 + i*.4); } });
      PR.stroke(ctx, 'rgba(240,200,180,.18)', .5, () => { for (let i = 0; i < 6; i++){ ctx.moveTo(-F.w - 2 + i*3.6, top + 8); ctx.lineTo(-F.w - 1 + i*3.6, top - 6); } }); PR.soft(ctx, -6, top - 1, 7, 2.4, '#ffe0d0', .26, -.3); PR.soft(ctx, F.w*.6, F.cy - 6, 8, 10, '#000000', .45);
      ctx.fillStyle = 'rgba(90,70,60,.7)'; ctx.fillRect(3, top - 1, 4, 3); PR.stitch(ctx, 'rgba(220,200,180,.5)', .3, () => { ctx.rect(3, top - 1, 4, 3); }); ctx.restore(); // darned
    PR.stroke(ctx, 'rgba(180,140,120,.5)', .5, () => { ctx.moveTo(-F.w + .4, F.cy - 4); ctx.bezierCurveTo(-F.w + 1, F.cy - 13.4*u, -F.w*.5, F.cy - 15.4*u, 0, F.cy - 15.2*u); }); return F; },
});
