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
Object.assign(POR, {
  /* the Letherii sergeant: never gendered, so a face that could be either; scale, the blue-grey cloak, an open helm under the arm's line */
  sgt_mt(ctx){ const F = {cy:-74, w:12.8, h:20, jaw:.8, chin:5, skin:'#b08a6a', iris:'#3a3a40', lip:'#8a5a4a', browCol:'#2a1e16', browW:1.5, arch:.6, rim:'#d6a24a', nose:1.05, smileL:.05, smileR:-.05, mouthW:3.8, bags:.35, age:.4, look:.2, open:.9};
    ctx.save(); ctx.translate(-40, -40); ell(ctx, 0, 0, 28, 30, '#14181c'); ell(ctx, 0, 0, 25, 27, PR.lin(ctx, -25, -27, 22, 27, [[0,'#7a8898'], [.5,'#3e4a56'], [1,'#101418']])); ell(ctx, 2, 1, 6, 7, PR.rad(ctx, 1, 0, .5, 7, [[0,'#f4f0e4'], [.6,'#c8c4b8'], [1,'#4a4a48']])); ctx.restore(); // the round shield, the white fingertip on the boss
    PR.torsoPath(ctx, 46); ctx.fillStyle = PR.lit(ctx, '#4e5a68', '#161c22', -46, 32); ctx.fill(); // the blue-grey cloak
    ctx.save(); PR.torsoPath(ctx, 46); ctx.clip(); PR.path(ctx, [[-28, 2], [-26, -36], [-12, -42], [12, -42], [26, -36], [28, 2]]); ctx.fillStyle = PR.lit(ctx, '#8a8a84', '#2a2a28', -28, 26); ctx.fill(); PR.scales(ctx, -28, 28, -42, 2, 5, '#9a9a94'); PR.soft(ctx, 26, -18, 20, 22, '#000000', .45);
    ctx.fillStyle = PR.lin(ctx, -30, 0, -16, 0, [[0,'#f4c878'], [1,'#8a5a18']]); [0, 1].forEach(i => { ctx.save(); ctx.translate(-20 + i*5, -28 + i*1.6); ctx.rotate(.3); ctx.fillRect(-2.2, -.8, 4.4, 1.6); ctx.restore(); }); ctx.restore(); // the sergeant's two gold bars
    PR.neck(ctx, F, 7); PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-14.6, F.cy - 3); ctx.bezierCurveTo(-15.4, top - 3, 15.4, top - 3, 14.6, F.cy - 3); ctx.lineTo(15.8, F.cy - 1); ctx.lineTo(-15.8, F.cy - 1); ctx.closePath();
    ctx.fillStyle = PR.lin(ctx, -16, 0, 16, 0, [[0,'#d0d0cc'], [.35,'#8a8a86'], [.75,'#2e2e2c'], [1,'#0e0e0c']]); ctx.fill(); // the open helm
    [-1, 1].forEach(sd => { ctx.fillStyle = PR.lin(ctx, sd*12, 0, sd*16, 0, [[0,'#8a8a86'], [1,'#2a2a28']]); PR.path(ctx, [[sd*11.6, F.cy - 2], [sd*15.4, F.cy - 2], [sd*14.2, F.cy + 9], [sd*11, F.cy + 6]]); ctx.fill(); }); return F; }, // its cheek-guards
  tobet(ctx){ const F = {cy:-73, w:11.6, h:19.6, jaw:.7, chin:4.4, skin:'#c4a080', iris:'#4a5a48', lip:'#9a6a5a', browCol:'#5a3a1e', browW:1.2, arch:1, browL:.6, rim:'#b8a070', rimA:.2, nose:1, look:-.35, open:1, smileL:.15, smileR:.05, mouthW:3.5};
    ctx.save(); ctx.translate(-30, -52); ctx.rotate(-.25); PR.stroke(ctx, '#7a5a30', 3, () => { ctx.moveTo(0, -50); ctx.quadraticCurveTo(12, -24, 6, 0); ctx.quadraticCurveTo(12, 24, 0, 50); }); PR.stroke(ctx, 'rgba(230,220,200,.6)', .6, () => { ctx.moveTo(0, -50); ctx.lineTo(0, 50); }); ctx.restore(); // the yew bow
    PR.torsoPath(ctx, 32, 6); ctx.fillStyle = PR.lit(ctx, '#7a6a4c', '#1e1a10', -32, 24); ctx.fill(); ctx.save(); PR.torsoPath(ctx, 32, 6); ctx.clip(); PR.stroke(ctx, 'rgba(0,0,0,.3)', .7, () => { for (let i = 0; i < 6; i++) { ctx.moveTo(-34, -40 + i*7); ctx.lineTo(34, -40 + i*7); } }); ctx.fillStyle = PR.lit(ctx, '#4e5a68', '#141a20', 6, 30); PR.path(ctx, [[8, -44], [34, -30], [34, 6], [14, 6]]); ctx.fill(); ctx.restore(); // the padded jack; the cut-down cloak
    PR.neck(ctx, F, 5.6); PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-12.4, F.cy - 1); ctx.bezierCurveTo(-13.8, top - 2, 13.8, top - 2, 12.4, F.cy - 1); ctx.quadraticCurveTo(10, F.cy - 13, 0, F.cy - 15.6); ctx.quadraticCurveTo(-10, F.cy - 13, -12.4, F.cy - 1);
    ctx.fillStyle = PR.lin(ctx, -13, 0, 13, 0, [[0,'#7a5a34'], [.5,'#4a3018'], [1,'#1a1008']]); ctx.fill(); PR.strands(ctx, 10, ['#6a4a2a', '#4a3018'], .6, 61, (i, r) => { const x = -10 + r()*20, y = F.cy - 15 + r()*2; return [x, y, x + (r() - .5)*6, y + 4, x + (r() - .5)*8, y + 7]; }); return F; }, // brown hair, unkempt
  thegg(ctx){ const F = {cy:-76, w:15.6, h:21.6, jaw:1.02, chin:7.2, skin:'#a07a5a', iris:'#2a2016', lip:'#7a4a3a', browCol:'#1a100a', browW:2, arch:.3, rim:'#9a8466', rimA:.16, nose:1.3, age:.3, look:0, open:.8, smileL:.15, smileR:.2, mouthW:4.8};
    ctx.save(); ctx.translate(-38, -30); ctx.fillStyle = PR.lin(ctx, -24, 0, 22, 0, [[0,'#8a7454'], [.5,'#4a3a26'], [1,'#120e08']]); PR.path(ctx, [[-22, -50], [20, -50], [20, 48], [-22, 48]]); ctx.fill(); ell(ctx, 0, 0, 6, 7.4, PR.rad(ctx, -1, -1, .5, 7, [[0,'#f4f0e4'], [.6,'#c8c4b8'], [1,'#4a4a48']])); ctx.restore(); // the tower shield behind his left shoulder
    PR.torsoPath(ctx, 58, 0); ctx.fillStyle = PR.lit(ctx, '#8a8478', '#22201c', -58, 42); ctx.fill();
    ctx.save(); PR.torsoPath(ctx, 58, 0); ctx.clip(); PR.scales(ctx, -60, 60, -50, 4, 6, '#9a948a'); PR.stroke(ctx, 'rgba(0,0,0,.55)', 1.4, () => { ctx.moveTo(0, -50); ctx.lineTo(0, 4); }); for (let i = 0; i < 6; i++) ell(ctx, 0, -44 + i*8, 1.4, 1.4, '#5a5650'); PR.soft(ctx, 38, -20, 28, 24, '#000000', .45); ctx.restore(); // two sets of scale, riveted down the middle
    ell(ctx, -10, -40, 2.6, 2.6, '#8a5a3a'); ell(ctx, -4, -41, 2.6, 2.6, '#6a4a2e'); ell(ctx, 2, -41, 2.6, 2.6, '#8a5a3a'); ell(ctx, 8, -40, 2.6, 2.6, '#6a4a2e'); // his mother's clay beads
    PR.neck(ctx, F, 9.6); PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-15.6, F.cy - 6); ctx.bezierCurveTo(-16.4, top - 2, 16.4, top - 2, 15.6, F.cy - 6); ctx.quadraticCurveTo(13, F.cy - 15, 0, F.cy - 18); ctx.quadraticCurveTo(-13, F.cy - 15, -15.6, F.cy - 6);
    ctx.fillStyle = PR.lin(ctx, -16, 0, 16, 0, [[0,'#3a2a1a'], [.5,'#1a100a'], [1,'#060402']]); ctx.fill(); return F; },
  perrit(ctx){ const F = {cy:-73, w:11.2, h:19, jaw:.66, chin:4, skin:'#d0b098', iris:'#3a3a4a', lip:'#9a6a62', browCol:'#1a1418', browW:1.15, arch:1.1, browL:.55, browR:.6, rim:'#a8a0d8', rimA:.24, nose:.95, look:.1, open:.95, smileL:-.05, smileR:-.1, mouthW:3.2};
    PR.torsoPath(ctx, 30, 6); ctx.fillStyle = PR.lit(ctx, '#5a5a66', '#16161c', -30, 22); ctx.fill(); // the cadre coat
    ctx.save(); PR.torsoPath(ctx, 30, 6); ctx.clip(); PR.stroke(ctx, '#c0c0d0', 1.2, () => { ctx.moveTo(0, -48); ctx.lineTo(0, 6); ctx.moveTo(-14, -44); ctx.lineTo(-6, -36); ctx.moveTo(14, -44); ctx.lineTo(6, -36); }); PR.soft(ctx, 22, -18, 18, 18, '#000000', .45); ctx.restore(); // its grey piping
    ctx.save(); ctx.translate(-22, -10); ctx.fillStyle = PR.lit(ctx, '#6a5038', '#2a1c10', -8, 8); ctx.fillRect(-8, -6, 16, 12); [[-4, -2], [1, -3], [4, 1], [-2, 2]].forEach(([x, y]) => { ctx.fillStyle = '#0a0a0e'; ctx.fillRect(x, y, 3, 3); ctx.fillStyle = 'rgba(200,200,230,.3)'; ctx.fillRect(x, y, 3, .6); }); ctx.restore(); // the pouch, black tiles spilling
    PR.neck(ctx, F, 5.4); PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-12, F.cy - 2); ctx.bezierCurveTo(-13, top - 1, 13, top - 1, 12, F.cy - 2); ctx.quadraticCurveTo(10.6, F.cy - 13, 0, F.cy - 15.6); ctx.quadraticCurveTo(-10.6, F.cy - 13, -12, F.cy - 2);
    ctx.fillStyle = PR.lin(ctx, -13, 0, 13, 0, [[0,'#2a2428'], [.5,'#121014'], [1,'#040304']]); ctx.fill(); ell(ctx, 0, top - 3.4, 5.4, 4, PR.rad(ctx, -1, top - 4, .5, 5, [[0,'#2a2428'], [1,'#060506']])); return F; }, // black hair in a clerk's knot
  ammet(ctx){ const F = {cy:-74, w:12.6, h:19.4, jaw:.86, chin:5.4, skin:'#b89070', iris:'#3a2e1e', lip:'#8a5a46', browCol:'#4a4038', browW:1.5, arch:.5, rim:'#8fb39a', rimA:.18, nose:1.1, bags:.55, age:.6, look:-.15, open:.85, smileL:-.1, smileR:.05, mouthW:3.8};
    PR.torsoPath(ctx, 40, 2); ctx.fillStyle = PR.lit(ctx, '#6a6a5e', '#1e1e18', -40, 28); ctx.fill(); // the padded coat
    ctx.save(); PR.torsoPath(ctx, 40, 2); ctx.clip(); ctx.fillStyle = PR.lit(ctx, '#86603e', '#2a1a0c', -22, 22); PR.path(ctx, [[-22, -32], [22, -32], [26, 6], [-26, 6]]); ctx.fill(); PR.stroke(ctx, '#3a2412', 1.4, () => { ctx.moveTo(-22, -32); ctx.lineTo(-14, -48); ctx.moveTo(22, -32); ctx.lineTo(14, -48); }); // the leather apron
    ctx.fillStyle = '#4a3a28'; ctx.fillRect(-30, -14, 22, 10); for (let i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? '#b8b4a8' : '#8a867c'; ctx.fillRect(-28 + i*3.4, -18, 1.2, 6); } PR.soft(ctx, 28, -18, 20, 20, '#000000', .45); ctx.restore(); // the roll of tools
    PR.neck(ctx, F, 7); PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-13.4, F.cy - 4); ctx.bezierCurveTo(-14.4, top - 1, 14.4, top - 1, 13.4, F.cy - 4); ctx.quadraticCurveTo(11.4, F.cy - 13, 0, F.cy - 16); ctx.quadraticCurveTo(-11.4, F.cy - 13, -13.4, F.cy - 4);
    ctx.fillStyle = PR.lin(ctx, -14, 0, 14, 0, [[0,'#8a8478'], [.5,'#5a5048'], [1,'#1e1a16']]); ctx.fill(); return F; }, // greying hair, cropped
  ruuk(ctx){ const F = {cy:-72, w:11, h:19, jaw:.66, chin:4, skin:'#9a7050', iris:'#1e140c', lip:'#6a4030', browCol:'#140c08', browW:1.2, arch:1.2, browL:.6, rim:'#a88a5a', rimA:.22, nose:1, look:.5, open:1.1, smileL:.45, smileR:.6, mouthW:3.4, teeth:1};
    for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(28 + i*4, -40); ctx.rotate(.2); PR.stroke(ctx, '#7a5a34', 2, () => { ctx.moveTo(0, 40); ctx.lineTo(0, -70); }); ctx.fillStyle = '#c8c0b0'; PR.path(ctx, [[0, -80], [-2.4, -68], [2.4, -68]]); ctx.fill(); ctx.restore(); } // the light spears over his shoulder
    PR.torsoPath(ctx, 30, 6); ctx.fillStyle = PR.lit(ctx, '#8a6a44', '#2a1c0e', -30, 22); ctx.fill(); ctx.save(); PR.torsoPath(ctx, 30, 6); ctx.clip(); for (let i = 0; i < 10; i++) PR.stroke(ctx, 'rgba(230,210,170,.5)', .8, () => { ctx.moveTo(-24 + i*5, -8); ctx.lineTo(-25 + i*5, 2); }); ctx.restore(); // hide, fringed
    PR.neck(ctx, F, 5.4); PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-22, -36); ctx.bezierCurveTo(-20, -48, -16, F.cy + 4, -14, F.cy - 6); ctx.bezierCurveTo(-13, top - 6, 13, top - 6, 14, F.cy - 6); ctx.bezierCurveTo(16, F.cy + 4, 20, -48, 22, -36); ctx.quadraticCurveTo(0, -30, -22, -36); ctx.closePath();
    ctx.moveTo(0, F.cy - 14); ctx.bezierCurveTo(8, F.cy - 14, 11.4, F.cy - 6, 11.4, F.cy + 2); ctx.bezierCurveTo(11.4, F.cy + 12, 6, F.cy + 18, 0, F.cy + 19); ctx.bezierCurveTo(-6, F.cy + 18, -11.4, F.cy + 12, -11.4, F.cy + 2); ctx.bezierCurveTo(-11.4, F.cy - 6, -8, F.cy - 14, 0, F.cy - 14); ctx.closePath();
    ctx.fillStyle = PR.lin(ctx, -22, 0, 22, 0, [[0,'#7a6648'], [.4,'#5a4a34'], [1,'#14100a']]); ctx.fill('evenodd'); return F; }, // the hood, pushed back round his face
  brune(ctx){ const F = {cy:-74, w:11.8, h:20.2, jaw:.74, chin:4.6, skin:'#b08a6a', iris:'#3a4a50', lip:'#8a5a4a', browCol:'#2a2420', browW:1.3, arch:.7, rim:'#7a9aa0', rimA:.22, nose:1.05, look:-.2, open:.85, smileL:.05, smileR:.15, mouthW:3.6};
    ctx.save(); ctx.translate(30, -48); ctx.rotate(.1); PR.stroke(ctx, '#5a4632', 2.6, () => { ctx.moveTo(0, 50); ctx.lineTo(0, -72); }); ctx.fillStyle = '#c8c4b8'; PR.path(ctx, [[0, -86], [-3, -70], [3, -70]]); ctx.fill(); PR.stroke(ctx, '#c8c4b8', 1.2, () => { ctx.moveTo(-1, -76); ctx.lineTo(-5, -72); }); ctx.restore(); // the barbed fish-spear
    PR.torsoPath(ctx, 34, 4); ctx.fillStyle = PR.lit(ctx, '#3a4a50', '#0e1418', -34, 26); ctx.fill(); ctx.save(); PR.torsoPath(ctx, 34, 4); ctx.clip(); PR.soft(ctx, -18, -34, 14, 10, '#c8e8f0', .2); PR.soft(ctx, 24, -18, 18, 18, '#000000', .45); ctx.restore(); // oiled sealskin
    for (let i = 0; i < 7; i++) { const a = -1.1 + i * .37, x = Math.sin(a) * 12, y = -40 + Math.cos(a) * 6; ell(ctx, x, y, 1.8, 1.4, PR.rad(ctx, x - .5, y - .5, .2, 1.8, [[0,'#fff8ea'], [1,'#b0a48a']])); } // the cord of shells
    PR.neck(ctx, F, 5.8); PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-12.4, F.cy - 2); ctx.bezierCurveTo(-13.4, top - 1, 13.4, top - 1, 12.4, F.cy - 2); ctx.quadraticCurveTo(11.2, F.cy - 13, 0, F.cy - 16); ctx.quadraticCurveTo(-11.2, F.cy - 13, -12.4, F.cy - 2);
    ctx.fillStyle = PR.lin(ctx, -13, 0, 13, 0, [[0,'#4a4038'], [.5,'#2a2420'], [1,'#0a0806']]); ctx.fill(); PR.stroke(ctx, '#2a2420', 4, () => { ctx.moveTo(-10, F.cy - 4); ctx.quadraticCurveTo(-18, F.cy + 10, -16, F.cy + 34); }); return F; }, // dark hair, one long plait
  pessa(ctx){ const F = {cy:-74, w:12, h:19.6, jaw:.78, chin:4.8, skin:'#c09878', iris:'#4a3a2a', lip:'#8a5a46', browCol:'#3a2418', browW:1.4, arch:.8, browL:.35, browR:.65, rim:'#a8907a', rimA:.2, nose:1.05, look:.3, open:.95, smileL:-.15, smileR:.3, mouthW:3.7};
    ctx.save(); ctx.translate(-30, -50); PR.stroke(ctx, '#4a3a28', 3, () => { ctx.moveTo(0, 50); ctx.lineTo(0, -66); }); PR.stroke(ctx, '#7a7a78', 2.4, () => { ctx.moveTo(0, -66); ctx.lineTo(0, -74); ctx.quadraticCurveTo(6, -78, 8, -72); ctx.moveTo(0, -68); ctx.lineTo(6, -62); }); ctx.restore(); // the boathook
    PR.torsoPath(ctx, 40, 2); ctx.fillStyle = PR.lit(ctx, '#6a6050', '#1e1a14', -40, 28); ctx.fill(); ctx.save(); PR.torsoPath(ctx, 40, 2); ctx.clip(); ctx.fillStyle = PR.lit(ctx, '#3a4030', '#10120c', -40, -6); PR.path(ctx, [[-40, -40], [-8, -46], [-12, 6], [-40, 6]]); ctx.fill(); PR.soft(ctx, 26, -18, 20, 20, '#000000', .45); ctx.restore(); // the jack too big, the oilskin over it
    PR.neck(ctx, F, 6);
    F.under = (ctx, F) => { const u = F.h/20; ctx.fillStyle = 'rgba(150,80,60,.45)'; ctx.beginPath(); ctx.ellipse(F.w*.42, F.cy + 3*u, 2.6, 1.6, -.4, 0, 7); ctx.fill(); }; // the burn-scar on her cheek
    PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-13, F.cy + 2); ctx.bezierCurveTo(-14.4, top - 2, 14.4, top - 2, 13, F.cy - 2); ctx.quadraticCurveTo(11.2, F.cy - 13, 0, F.cy - 16); ctx.quadraticCurveTo(-11.2, F.cy - 13, -13, F.cy + 2);
    ctx.fillStyle = PR.lin(ctx, -14, 0, 14, 0, [[0,'#6a4430'], [.5,'#3a2418'], [1,'#100a06']]); ctx.fill(); PR.strands(ctx, 12, ['#5a3a24', '#3a2418'], .6, 63, (i, r) => { const x = -12 + r()*5, y = F.cy - 6 + r()*4; return [x, y, x - 2, y + 10, x - 1, y + 20]; }); return F; }, // hair loose, wind-tangled
});
