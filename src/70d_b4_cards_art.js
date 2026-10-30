/* ============ Book Four art: the two new cards of High House Chains, and the looks of the five new soldiers ============
   Cards (20 drawCard calls CARDART[id]): the Knight of Chains and the Leper, both faceless (hoc-canon §10 rule 8), in High House Chains'
   frame of iron links over the gold (as Book Three's Chains cards wear it, 60d). Every other card Book Four deals is one the earlier books
   already paint. Looks: a battle figure (FIGX, 18) and a painted bust (POR, 19) for Tallow, Hessa, Tebbet, Darrut and Orvas, each told
   apart from the others and from Book Two's four by its silhouette: Tallow's big helm and bright new kit, Hessa's tall worm-rimmed
   shield and temple spear, Tebbet's long bow and hood, Darrut's great round Guard shield and plume-less helm, Orvas's black tears and
   horse-tail. Same rules as Books Two and Three: lantern low on the left, the squadmate's own colour as a rim on the right. */
{
  const frame = (P) => { const X = x => P.px + x / 100 * P.pw, Y = y => P.py + y / 100 * P.ph, u = P.pw / 100; return {X, Y, u}; };
  const sky = (ctx, P, c0, c1) => { const g = ctx.createLinearGradient(0, P.py, 0, P.gy); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; ctx.fillRect(P.px, P.py, P.pw, P.gy - P.py); };
  /* a broken chain hanging from a wrist: links alternately face-on and edge-on, the last one open */
  const chainDown = (ctx, x, y, n, r, col) => { for (let i = 0; i < n; i++) { const yy = y + i * r * 1.5; ctx.save(); ctx.translate(x + Math.sin(i * .8) * r * .3, yy);
    if (i % 2) { ctx.fillStyle = col; ctx.fillRect(-r * .22, -r * .6, r * .44, r * 1.2); } else { ctx.strokeStyle = col; ctx.lineWidth = r * .4; ctx.beginPath(); ctx.ellipse(0, 0, r * .55, r * .85, 0, i === n - 1 ? .6 : 0, i === n - 1 ? 5.6 : 7); ctx.stroke(); } ctx.restore(); } };

  /* the Knight of Chains: a tall figure in a chain hauberk on an empty plain at dusk, a broken chain from each wrist; under the helm, nothing */
  CARDART.b4c_knightchains = (ctx, P) => { const {X, Y, u} = frame(P), t = P.t;
    sky(ctx, P, '#1a120e', '#6a3a24'); glow(ctx, P.cx, P.gy, 44*u, '#d07040', .22 + Math.sin(t/1300)*.04);
    ctx.fillStyle = '#1a110c'; ctx.fillRect(P.px, P.gy - 3*u, P.pw, P.ph); // the plain
    for (let i = 0; i < 6; i++) { const k = ((t/5200) + i/6) % 1; ell(ctx, P.px + k*P.pw, P.gy - 4*u - hash(i, 61)*12*u, (8 + k*10)*u, 1.4*u, `rgba(200,140,90,${.18*(1 - Math.abs(k - .5)*2)})`); } // dust going past
    const cx = P.cx, top = Y(16), fy = P.gy;
    poly(ctx, [[cx - 10*u, fy], [cx - 13*u, top + 26*u], [cx - 12*u, top + 13*u], [cx - 5*u, top + 9*u], [cx + 5*u, top + 9*u], [cx + 12*u, top + 13*u], [cx + 13*u, top + 26*u], [cx + 10*u, fy]], PR.lin(ctx, cx - 13*u, 0, cx + 13*u, 0, [[0,'#5a4a40'], [.45,'#2a221e'], [1,'#0a0808']])); // the hauberk, long
    ctx.strokeStyle = 'rgba(200,170,140,.22)'; ctx.lineWidth = .7; for (let r = 0; r < 14; r++) for (let c = 0; c < 8; c++) { ctx.beginPath(); ctx.arc(cx - 10*u + c*2.8*u + (r % 2)*1.4*u, top + 14*u + r*3.2*u, .9*u, 0, Math.PI); ctx.stroke(); } // the rings of it
    ctx.fillStyle = '#1a1410'; ctx.fillRect(cx - 2*u, top + 40*u, 4*u, fy - top - 40*u); // the parting of the skirts
    ell(ctx, cx - 14*u, top + 14*u, 4.6*u, 3.4*u, '#3a2e28'); ell(ctx, cx + 14*u, top + 14*u, 4.6*u, 3.4*u, '#181210');
    ctx.strokeStyle = '#2a221e'; ctx.lineWidth = 4*u; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - 14*u, top + 16*u); ctx.lineTo(cx - 18*u, top + 36*u); ctx.moveTo(cx + 14*u, top + 16*u); ctx.lineTo(cx + 18*u, top + 36*u); ctx.stroke(); ctx.lineCap = 'butt'; // the arms, hanging
    ell(ctx, cx - 18*u, top + 37*u, 2.4*u, 2.4*u, '#4a3a32'); ell(ctx, cx + 18*u, top + 37*u, 2.4*u, 2.4*u, '#4a3a32'); // shackles at the wrists
    const sw = Math.sin(t/1400)*.6*u; chainDown(ctx, cx - 18*u + sw, top + 40*u, 5, 2.2*u, '#6a564a'); chainDown(ctx, cx + 18*u - sw, top + 40*u, 4, 2.2*u, '#6a564a'); // broken chains
    ell(ctx, cx, top + 4*u, 6*u, 7*u, PR.lin(ctx, cx - 6*u, 0, cx + 6*u, 0, [[0,'#6a5a50'], [1,'#141010']])); // the helm
    ell(ctx, cx, top + 6*u, 3.6*u, 4.4*u, '#050304'); // and the dark under it: no face
    ctx.strokeStyle = 'rgba(240,180,120,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, top + 4*u, 6.2*u, Math.PI*.8, Math.PI*1.5); ctx.stroke();
    glow(ctx, cx, top + 30*u, 16*u, P.hue, .1); };

  /* the Leper: a figure wrapped in grey rags walking a pale road toward us with a bell; the bandages cover the whole head; no face */
  CARDART.b4c_leper = (ctx, P) => { const {X, Y, u} = frame(P), t = P.t;
    sky(ctx, P, '#2a261c', '#7a6a4c'); glow(ctx, X(78), Y(30), 26*u, '#e0d0a0', .16);
    ctx.fillStyle = '#2e2618'; ctx.fillRect(P.px, P.gy - 4*u, P.pw, P.ph);
    poly(ctx, [[X(44), P.gy - 4*u], [X(54), P.gy - 4*u], [X(86), P.py + P.ph], [X(14), P.py + P.ph]], '#c8bc9c'); // the road gone pale behind it
    ctx.globalAlpha = .4; poly(ctx, [[X(44), P.gy - 4*u], [X(54), P.gy - 4*u], [X(60), P.gy + 10*u], [X(40), P.gy + 10*u]], '#3a3020'); ctx.globalAlpha = 1; // where it has not walked yet
    const cx = P.cx, fy = P.gy + 8*u, st = Math.sin(t/800)*1.2*u;
    poly(ctx, [[cx - 7*u, fy - 40*u], [cx + 7*u, fy - 40*u], [cx + 10*u, fy - 4*u], [cx + 4*u, fy], [cx, fy - 5*u], [cx - 4*u, fy], [cx - 10*u, fy - 4*u]], PR.lin(ctx, cx - 10*u, 0, cx + 10*u, 0, [[0,'#9a8e78'], [1,'#3a3428']])); // rags
    ctx.strokeStyle = 'rgba(230,220,196,.55)'; ctx.lineWidth = 1.2*u; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(cx - 7*u, fy - (36 - i*6)*u); ctx.lineTo(cx + 7*u, fy - (33 - i*6)*u); ctx.stroke(); } // bandages wound round the body
    ell(ctx, cx, fy - 45*u, 4.8*u, 5.6*u, '#d8ccb0'); ctx.strokeStyle = 'rgba(120,104,80,.7)'; ctx.lineWidth = .9; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(cx - 4.6*u, fy - (49 - i*1.8)*u); ctx.lineTo(cx + 4.6*u, fy - (47.6 - i*1.8)*u); ctx.stroke(); } // the head wrapped all round: no slit, no face
    poly(ctx, [[cx - 6.4*u, fy - 51*u], [cx + 6.4*u, fy - 51*u], [cx + 8.4*u, fy - 38*u], [cx - 8.4*u, fy - 38*u]], 'rgba(100,88,64,.85)'); // the hood
    ctx.strokeStyle = '#9a8e78'; ctx.lineWidth = 2*u; ctx.beginPath(); ctx.moveTo(cx + 6*u, fy - 36*u); ctx.lineTo(cx + 13*u, fy - 30*u); ctx.stroke();
    const bx = cx + 14*u - st*.4, by = fy - 27*u; ctx.strokeStyle = '#3a3020'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(cx + 13*u, fy - 30*u); ctx.lineTo(bx, by); ctx.stroke(); poly(ctx, [[bx - 2.4*u, by + 4*u], [bx - 1.6*u, by], [bx + 1.6*u, by], [bx + 2.4*u, by + 4*u]], '#8a7a4a'); // the bell
    if (Math.abs(st) > 1) for (let i = 0; i < 3; i++) { ctx.strokeStyle = `rgba(230,210,160,${.35 - i*.1})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.arc(bx, by + 3*u, (5 + i*3)*u, -Math.PI*.3, Math.PI*.3); ctx.stroke(); }
    glow(ctx, cx, fy - 30*u, 22*u, P.hue, .08); };

  /* High House Chains' frame on Book Four's two Chains cards: iron links over the gold, rust, a shackle at each corner (Book Three's look, 60d) */
  const CH4 = new Set(['b4c_knightchains', 'b4c_leper']);
  const chainFrame4 = (ctx, W, H) => { ctx.save(); ctx.beginPath(); ctx.roundRect ? ctx.roundRect(0, 0, W, H, W*.06) : ctx.rect(0, 0, W, H); ctx.clip();
    ctx.strokeStyle = '#3a1e16'; ctx.lineWidth = W*.034; ctx.strokeRect(W*.05, H*.035, W*.9, H*.93);
    const r = W*.024, side = (x0, y0, x1, y1) => { const n = Math.round(Math.hypot(x1 - x0, y1 - y0)/(r*1.7)); for (let i = 0; i <= n; i++) { const k = i/n, x = lerp(x0, x1, k), y = lerp(y0, y1, k), a = Math.atan2(y1 - y0, x1 - x0);
      ctx.save(); ctx.translate(x, y); ctx.rotate(a); if (i % 2) { ctx.fillStyle = '#4a3a32'; ctx.fillRect(-r, -r*.24, r*2, r*.48); } else { ctx.strokeStyle = '#5e4c42'; ctx.lineWidth = r*.46; ctx.beginPath(); ctx.ellipse(0, 0, r, r*.6, 0, 0, 7); ctx.stroke(); }
      if (hash(i, Math.round(x0 + y0)) > .7) { ctx.fillStyle = 'rgba(140,60,30,.55)'; ctx.fillRect(-r*.3, r*.1, r*.5, r*.4); } ctx.restore(); } };
    const x0 = W*.05, y0 = H*.035, x1 = W*.95, y1 = H*.965; side(x0, y0, x1, y0); side(x1, y0, x1, y1); side(x1, y1, x0, y1); side(x0, y1, x0, y0);
    [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].forEach(([x, y]) => { ell(ctx, x, y, W*.04, W*.04, '#2a1a14'); ctx.strokeStyle = '#6a564a'; ctx.lineWidth = W*.012; ctx.beginPath(); ctx.arc(x, y, W*.03, 0, 7); ctx.stroke(); ell(ctx, x, y, W*.01, W*.01, '#0e0806'); });
    ctx.restore(); };
  const drawCardB3 = drawCard; drawCard = function(ctx, id, W, H, face, t = 0){ drawCardB3(ctx, id, W, H, face, t); if (face && CH4.has(id)) chainFrame4(ctx, W, H); };
}

/* ---------------- the five new soldiers: battle figures (FIGX, in the ~32px frame drawFigure sets up) ---------------- */
Object.assign(FIGX, {
  /* Tallow: tall and new, kit too bright, a helm a size too big, and (v7.1) a sling swinging from his hand and a pouch of beach stones */
  tallow(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.1); const sw = o.still ? 0 : Math.sin(t/180 + (o.phase || 0))*1.4;
    B2F.line(ctx, '#6a5030', .7, [[7, 1], [8.4 + sw*.3, 6], [9.6 + sw, 9.4]]); B2F.line(ctx, '#6a5030', .7, [[7, 1], [10.6 + sw*.4, 5.4], [9.6 + sw, 9.4]]); ell(ctx, 9.8 + sw, 9.8, 1.5, 1.1, '#5a4028'); ell(ctx, 9.6 + sw, 9.4, .8, .6, '#b8b0a0'); // the sling, a stone in it
    h.legs('#3a3428'); h.torso('#a8865a', '#4a3620', 6.2); ctx.fillStyle = 'rgba(255,240,210,.25)'; ctx.fillRect(-5.6, -5.6, 2, 10); // new leather, still pale
    ctx.fillStyle = '#5a4630'; ctx.fillRect(-6.2, 3.6, 12.4, 1.2); B2F.line(ctx, '#3a2a18', .5, [[-2, -6], [.4, -2.6], [2.6, -6]]); ell(ctx, .4, -2, .7, 1.2, '#e8dcc0'); // the finger bone on its thong
    h.head('#d0a888', 4.3, -11); h.look('rgba(24,14,10,.82)', -11.2);
    ctx.beginPath(); ctx.arc(0, -12.6, 6, Math.PI*.98, Math.PI*2.02); ctx.fillStyle = h.armor('#a09a8c', '#3a3830'); ctx.fill(); ctx.fillRect(-6.4, -12.8, 12.8, 1.6); ctx.fillStyle = 'rgba(255,255,250,.3)'; ctx.fillRect(-3.6, -17.4, 3, 1); // the helm, too big, down over the brows
    ctx.fillStyle = '#7a6040'; ctx.fillRect(-7.4, 2.6, 3.2, 3.4); ctx.fillStyle = '#8a7050'; ctx.fillRect(-7.4, 2.6, 3.2, 1); // the pouch of stones
    ctx.restore(); },
  /* Hessa: square and still; a tall shield with a worm carved round the rim; a long-bladed temple spear held upright */
  hessa(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.1, 1.06);
    B2F.line(ctx, '#5a4632', 1.5, [[8.4, 12], [8.4, -22]]); poly(ctx, [[8.4,-29],[6.6,-21],[8.4,-19],[10.2,-21]], '#d8d0bc'); // the temple spear, a long blade
    h.legs('#2e2a22'); h.torso('#6a7458', '#23281a', 7); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-6.6, -4 + i*2); ctx.lineTo(6.6, -4 + i*2); } ctx.stroke(); // scale over the padded coat
    h.head('#9a7454', 4.6, -11.2); h.look('rgba(20,10,6,.85)', -11.4); B2F.cap(ctx, '#1a120a', 4.8, -12.6); ctx.fillStyle = '#1a120a'; ctx.fillRect(-4.8, -12.6, 2.2, 6); // dark hair cropped close, a temple guard's
    poly(ctx, [[-12.4,-8],[-3.4,-8],[-3.4,8],[-7.9,11],[-12.4,8]], h.armor('#5a5a44', '#1c1c12')); // the tall shield
    ctx.strokeStyle = 'rgba(220,206,170,.7)'; ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(-12, -7); for (let i = 0; i <= 8; i++) ctx.lineTo(-12 + (i % 2 ? 1 : 0), -7 + i*1.9); ctx.stroke(); // the worm, round the rim
    ell(ctx, -7.9, 1, 1.4, 1.4, '#8a8470'); ctx.restore(); },
  /* Tebbet: long in the arm, narrow, hooded; a tall recurve strung and held low */
  tebbet(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .9, 1.12);
    h.legs('#2a2620'); h.torso('#6a5a44', '#26201a', 5.4); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-5.4, 3, 10.8, 1.1); ctx.fillStyle = '#5a4430'; ctx.fillRect(-8.6, -5, 2.2, 8); poly(ctx, [[-8.6,-5],[-7.5,-8.4],[-6.4,-5]], '#c8b898'); // the quiver, fletching up
    h.head('#6e4a32', 4.1, -11.2); h.look('rgba(230,214,190,.55)', -11.4);
    poly(ctx, [[-5.6,-6],[-4.4,-15.4],[0,-17.4],[4.4,-15.4],[5.6,-6],[3.6,-8],[3.4,-13],[-3.4,-13],[-3.6,-8]], '#5a4a36'); // the cloth hood against the sun
    ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(9, -14); ctx.quadraticCurveTo(12.6, -8, 10.6, -2); ctx.quadraticCurveTo(12.6, 4, 9, 10); ctx.stroke(); ctx.strokeStyle = 'rgba(230,220,200,.6)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(9, -14); ctx.lineTo(9, 10); ctx.stroke(); // the Dal Honese recurve
    ctx.restore(); },
  /* Darrut: broad, thick-necked; the Aren Guard's great round shield with the badge scraped off; a helm with the plume cut away */
  darrut(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.16, 1.04);
    h.legs('#2e2a26'); h.torso('#8a8478', '#2c2a26', 7.4); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = .6; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(-7, -3.6 + i*2.4); ctx.lineTo(7, -3.6 + i*2.4); } ctx.stroke(); // patched Guard mail
    ctx.fillStyle = '#7a4a2a'; ctx.fillRect(-1.6, -2, 3.2, 2.4); // a patch
    h.head('#a07c60', 4.7, -11); h.look(); ctx.fillStyle = 'rgba(30,20,14,.6)'; ctx.fillRect(-3, -8.6, 7, 1.6); // a heavy jaw, stubbled
    ctx.beginPath(); ctx.arc(0, -12.2, 5.4, Math.PI, 0); ctx.fillStyle = h.armor('#8a8680', '#2a2826'); ctx.fill(); ctx.fillRect(-5.8, -12.6, 11.6, 1.4); ctx.fillStyle = '#4a4640'; ctx.fillRect(-.8, -18.4, 1.6, 1.4); // the helm, a stub where the plume was
    ctx.beginPath(); ctx.arc(-7.4, 0, 8.4, 0, 7); ctx.fillStyle = h.armor('#9a8a62', '#2e2818'); ctx.fill(); ctx.strokeStyle = '#151210'; ctx.lineWidth = 1.1; ctx.stroke(); // the great round shield
    ctx.fillStyle = 'rgba(200,190,160,.3)'; ctx.fillRect(-9.4, -2.2, 4, 4); ell(ctx, -7.4, 0, 1.6, 1.6, '#6b6155'); // the bright patch where the badge was
    h.sword(); ctx.restore(); },
  /* Orvas: lean, half turned to a horse that isn't there; lacquered leather and horsehair; black tears down both cheeks; the short lance with the clan's rag */
  orvas(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1.08); const fl = o.still ? 0 : Math.sin(t/220 + (o.phase || 0))*.8;
    B2F.line(ctx, '#6a4a2a', 1.4, [[7.6, 12], [9.4, -20]]); poly(ctx, [[9.4,-24],[8.4,-19],[10.4,-19]], '#d8d0bc'); poly(ctx, [[9.2,-18],[13.6,-17 + fl],[13,-14 + fl],[9.4,-15]], '#a83a2a'); // the lance and the clan's rag
    h.legs('#2a1e14'); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-4.5, 8.6, 3.4, 4.4); ctx.fillRect(1.1, 8.6, 3.4, 4.4); // riding boots
    h.torso('#7a3a24', '#2a120a', 6); ctx.fillStyle = 'rgba(255,200,160,.2)'; ctx.fillRect(-5.4, -5, 1.6, 9); ctx.fillStyle = '#c8b898'; for (let i = 0; i < 5; i++) ctx.fillRect(-5 + i*2.4, 6, .6, 2.4); // lacquered leather, horsehair tassels
    h.head('#8a5a3a', 4.2, -11.2); h.look('rgba(20,10,6,.88)', -11.6); ctx.fillStyle = '#0a0606'; ctx.fillRect(-.6, -10.6, .8, 3.4); ctx.fillRect(2.4, -10.6, .8, 3.4); // the black tears
    B2F.cap(ctx, '#0e0a08', 4.5, -12.6); poly(ctx, [[-4.4,-13],[-9.4,-10 + fl],[-10,-5 + fl],[-5.6,-9]], '#1a1410'); // a black horse-tail of hair, blown back
    ctx.restore(); },
  /* v7.1 (70e). Mirrel: small and quick, a padded jack with the sleeves cut off, a hospice bag with a red hand, hair in a knot, a roll of linen */
  mirrel(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, .98);
    h.legs('#3a3428'); h.torso('#9a967a', '#3a382a', 5.8); ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(-5.4, -4 + i*2.6); ctx.lineTo(5.4, -4 + i*2.6); } ctx.stroke(); // the quilted jack
    ctx.fillStyle = '#c8a080'; ctx.fillRect(-7.4, -5, 1.6, 4); ctx.fillRect(5.8, -5, 1.6, 4); // bare forearms
    B2F.line(ctx, '#4a3420', .7, [[-7.4, .6], [2.4, -6]]); ctx.fillStyle = '#6a5236'; ctx.fillRect(-10, .2, 5, 5.6); ctx.fillStyle = '#7a6044'; ctx.fillRect(-10, .2, 5, 1.6); ell(ctx, -7.5, 3.4, 1, 1.1, '#b23a2a'); // the hospice bag, its red hand
    h.head('#c8a080', 4.2, -11.2); h.look('rgba(24,14,10,.82)', -11.4); B2F.cap(ctx, '#3a2418', 4.4, -12.4); ell(ctx, .4, -16.6, 2, 1.6, '#3a2418'); // dark hair, in a knot
    ctx.fillStyle = '#ece6d4'; ctx.fillRect(6.2, -1, 2.4, 3.6); ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.fillRect(6.2, .4, 2.4, .5); // a roll of clean linen
    ctx.restore(); },
  /* Yorin: thin and windburnt, a sky-blue sash, a copper vane at the chest, hair blown back, one hand up to the sky with a thread of lightning at the fingers */
  yorin(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1.08); const fl = o.still ? 1 : (Math.sin(t/140 + (o.phase || 0)) + 1)/2;
    h.legs('#2e3038'); h.torso('#6a6a62', '#24241e', 5.4); poly(ctx, [[-5.4,-6],[-2.8,-6],[5,5.4],[2.4,5.4]], '#6fa8d8'); // the sash the quartermaster dislikes
    ell(ctx, -2.6, -2.4, 1.3, 1.3, '#c87a3a'); ctx.fillStyle = '#e8a060'; ctx.fillRect(-2.9, -4.4, .6, 1.6); // the copper vane
    h.head('#c09a7a', 4.1, -11.2); h.look('rgba(24,14,10,.82)', -11.6); B2F.cap(ctx, '#6a4a2a', 4.3, -12.4, 1.05, 1.95); poly(ctx, [[-4,-14.6],[-8.4,-15.6],[-4.6,-12.4]], '#6a4a2a'); // hair blown back
    B2F.line(ctx, '#6a6a62', 1.6, [[5, -4], [8, -10]]); B2F.line(ctx, '#c09a7a', 1.2, [[8, -10], [9, -14]]); // the arm up
    ctx.globalAlpha = .45 + fl*.55; B2F.line(ctx, '#e4f0ff', .7, [[9, -15], [10.6, -17.6], [9.4, -19], [11.2, -22]]); ctx.globalAlpha = 1; // lightning at the fingers
    ctx.restore(); },
  /* Rasp: compact, a scorched apron, the satchel, the file at her belt, cropped red-brown hair, a marine crossbow with a filed cradle */
  rasp(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1);
    h.legs('#2a2420'); h.torso('#4a3e30', '#1a140e', 5.8); poly(ctx, [[-4.6,-3],[4.6,-3],[5.6,10],[-5.6,10]], h.armor('#7a5a3a', '#2e1e10')); ell(ctx, 1.6, 5, 1.4, 1, 'rgba(10,6,4,.55)'); // the apron, scorched
    ctx.fillStyle = '#4a3622'; ctx.fillRect(-10, -1, 5, 6.6); ctx.fillStyle = '#5e4630'; ctx.fillRect(-10, -1, 5, 1.6); ctx.fillStyle = '#d0864a'; ctx.fillRect(-8.2, 1, 1.2, 1.2); // the satchel
    ctx.fillStyle = '#9a968c'; ctx.fillRect(3.2, 3.4, .8, 5.2); ctx.fillStyle = '#5a3e22'; ctx.fillRect(3, 2.2, 1.2, 1.4); // the file at her belt
    h.head('#c89a78', 4.2, -11.2); h.look('rgba(24,14,10,.82)', -11.4); B2F.cap(ctx, '#8a4a24', 4.4, -12.6, 1.02, 1.98); ctx.fillStyle = 'rgba(140,60,30,.55)'; ctx.fillRect(-1.6, -9.8, .6, .6); ctx.fillRect(2.4, -9.4, .6, .6); ctx.fillRect(.6, -8.8, .5, .5); // cropped hair, burn-freckles
    ctx.strokeStyle = '#4a3320'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(2, -.6); ctx.lineTo(12.6, -2.4); ctx.stroke(); ctx.strokeStyle = '#8d8a86'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(9.4, -6.8); ctx.lineTo(9.4, 1.4); ctx.stroke(); // the crossbow
    ctx.fillStyle = '#7a7466'; ctx.fillRect(7, -1.2, 3.6, 1.4); ctx.fillStyle = 'rgba(255,255,240,.35)'; ctx.fillRect(7, -1.2, 3.6, .4); // the cradle, filed bright
    ctx.restore(); },
});

/* ---------------- their busts (POR): in bust units, shoulders at y = 0, the face about y = −74 ---------------- */
Object.assign(POR, {
  tallow(ctx){ const F = {cy:-74, w:12.2, h:19.4, jaw:.72, chin:4.4, skin:'#d0a888', iris:'#5a6a7a', lip:'#a0685a', browCol:'#7a5a3a', browW:1.15, arch:1.1, browL:.5, browR:.5, rim:'#c9b27a', rimA:.18, nose:.95, look:.3, open:1.12, smileL:.1, smileR:.35, mouthW:3.6, flush:'#d07a6a'};
    PR.neck(ctx, F, 8); const B = BP.body(ctx, F, {wide:36, drop:4, trap:2, ny:F.cy + 15.4, cb:F.cy + 20.6, c1:'#b08c5e', c2:'#3a2a16'}); // new boiled leather, still pale, creasing
    ctx.save(); B.path(); ctx.clip(); PR.stroke(ctx, 'rgba(60,40,20,.35)', .8, () => { for (let i = 0; i < 5; i++) { ctx.moveTo(-30 + i*12, -40); ctx.quadraticCurveTo(-28 + i*12, -20, -32 + i*12, 0); } }); PR.soft(ctx, -20, -30, 16, 10, '#fff0d0', .12); ctx.restore(); BP.light(ctx, F, B); BP.band(ctx, B, -1, 4); ctx.fillStyle = PR.lit(ctx, '#8a6a42', '#2a1a0c', -B.nx - 3, B.nx + 3); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 4); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .5);// the leather rolled at the neck 
    PR.stroke(ctx, '#3a2a18', .9, () => { ctx.moveTo(-8, -46); ctx.quadraticCurveTo(0, -32, 8, -46); }); ctx.save(); ctx.translate(0, -33); ctx.rotate(.2); ctx.fillStyle = PR.lin(ctx, -2, 0, 2, 0, [[0,'#f0e8d0'], [1,'#8a7e66']]); ctx.fillRect(-1.4, -4, 2.8, 8); ell(ctx, 0, -4, 1.8, 1.4, '#e8dcc0'); ell(ctx, 0, 4, 1.8, 1.4, '#e8dcc0'); ctx.restore(); // the finger bone on its thong
    PR.face(ctx, F);
    // the helm a size too big, down to the brows
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-15.6, F.cy - 6); ctx.bezierCurveTo(-16.4, top - 6, 16.4, top - 6, 15.6, F.cy - 6); ctx.lineTo(16.8, F.cy - 4); ctx.lineTo(-16.8, F.cy - 4); ctx.closePath();
    ctx.fillStyle = PR.lin(ctx, -16, 0, 16, 0, [[0,'#d8d4c8'], [.35,'#9a968a'], [.75,'#3a3830'], [1,'#121210']]); ctx.fill(); PR.stroke(ctx, 'rgba(255,255,250,.35)', 1, () => { ctx.moveTo(-10, top + 1); ctx.quadraticCurveTo(-4, top - 1.6, 2, top - .6); });
    PR.soft(ctx, 0, F.cy - 3, 12, 2.4, '#140806', .5); return F; },
  hessa(ctx){ const F = {cy:-75, w:13.4, h:20.2, jaw:.92, chin:6, skin:'#9a7454', iris:'#3a2a1a', lip:'#7a4a3a', browCol:'#140a06', browW:1.6, arch:.4, rim:'#8a9a6a', rimA:.16, nose:1.1, look:0, smileL:-.25, smileR:-.25, mouthW:4};
    // the tall shield behind her right shoulder, the worm carved round its rim
    ctx.save(); ctx.translate(34, -40); ctx.fillStyle = PR.lin(ctx, -18, 0, 18, 0, [[0,'#6a6a52'], [.5,'#3a3a2a'], [1,'#121208']]); PR.path(ctx, [[-16, -40], [16, -40], [16, 30], [0, 44], [-16, 30]]); ctx.fill();
    PR.stroke(ctx, 'rgba(220,206,170,.55)', 1.6, () => { ctx.moveTo(-13, -36); for (let i = 0; i <= 14; i++) ctx.lineTo(-13 + (i % 2 ? 2 : 0), -36 + i*4.6); }); ctx.restore();
    PR.neck(ctx, F, 9.4); const B = BP.body(ctx, F, {wide:44, drop:2, trap:5, ny:F.cy + 15.6, cb:F.cy + 21, c1:'#6a7458', c2:'#1c2014'}); 
    ctx.save(); B.path(); ctx.clip(); BP.scales(ctx, -46, 46, -68, 2, 5.6, '#7a8466', 31); ctx.restore(); BP.light(ctx, F, B); BP.band(ctx, B, -1, 4.6); ctx.fillStyle = PR.lit(ctx, '#4a4a30', '#141408', -B.nx - 3, B.nx + 3); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 4.6); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .5);// the leather collar the scale hangs from 
    ell(ctx, 0, B.cb + 3.4, 3, 3, PR.rad(ctx, -1, B.cb + 2.4, .3, 3.2, [[0,'#f0e0b0'], [1,'#5a4a20']])); // the temple seal, at the throat
    PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-13.6, F.cy - 4); ctx.bezierCurveTo(-14.4, top - 1, 14.4, top - 1, 13.6, F.cy - 4); ctx.quadraticCurveTo(12, F.cy - 14, 0, F.cy - 16.6); ctx.quadraticCurveTo(-12, F.cy - 14, -13.6, F.cy - 4); // hair cropped close
    ctx.fillStyle = PR.lin(ctx, -14, 0, 14, 0, [[0,'#3a2a1a'], [.5,'#1a100a'], [1,'#060402']]); ctx.fill(); return F; },
  tebbet(ctx){ const F = {cy:-73, w:11.6, h:20, jaw:.7, chin:4.6, skin:'#6e4a32', iris:'#1e140c', lip:'#5a3428', browCol:'#0a0604', browW:1.3, arch:.8, rim:'#b7895a', rimA:.2, nose:1.05, look:-.3, open:.9, smileL:.15, smileR:.1, mouthW:3.6};
    // the recurve, strung, over his left shoulder
    ctx.save(); ctx.translate(-28, -50); ctx.rotate(-.3); PR.stroke(ctx, '#6a4a2a', 3, () => { ctx.moveTo(0, -46); ctx.quadraticCurveTo(10, -24, 4, 0); ctx.quadraticCurveTo(10, 24, 0, 46); }); PR.stroke(ctx, 'rgba(230,220,200,.6)', .6, () => { ctx.moveTo(0, -46); ctx.lineTo(0, 46); }); ctx.restore();
    PR.neck(ctx, F, 7.4); const B = BP.body(ctx, F, {wide:32, drop:6, trap:1.5, ny:F.cy + 15.6, cb:F.cy + 20.8, c1:'#6a5a44', c2:'#1e1810'}); // the padded jack
    ctx.save(); B.path(); ctx.clip(); PR.stroke(ctx, 'rgba(0,0,0,.3)', .7, () => { for (let i = 0; i < 7; i++) { ctx.moveTo(-32, -47 + i*7); ctx.lineTo(32, -47 + i*7); } }); ctx.restore(); BP.light(ctx, F, B);
    PR.face(ctx, F);
    // the cloth hood against the sun, over the head and down round the jaw
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-24, -38); ctx.bezierCurveTo(-22, -50, -18, F.cy, -15, F.cy - 8); ctx.bezierCurveTo(-15, top - 9, 15, top - 9, 15, F.cy - 8); ctx.bezierCurveTo(18, F.cy, 22, -50, 24, -38); ctx.quadraticCurveTo(0, -30, -24, -38); ctx.closePath();
    ctx.moveTo(0, F.cy - 16); ctx.bezierCurveTo(9, F.cy - 16, 12.2, F.cy - 8, 12, F.cy); ctx.bezierCurveTo(12, F.cy + 10, 6, F.cy + 18, 0, F.cy + 19); ctx.bezierCurveTo(-6, F.cy + 18, -12, F.cy + 10, -12, F.cy); ctx.bezierCurveTo(-12.2, F.cy - 8, -9, F.cy - 16, 0, F.cy - 16); ctx.closePath();
    ctx.fillStyle = PR.lin(ctx, -24, 0, 24, 0, [[0,'#8a7656'], [.4,'#5a4a36'], [1,'#14100a']]); ctx.fill('evenodd'); return F; },
  darrut(ctx){ const F = {cy:-76, w:14.6, h:20.4, jaw:.98, chin:6.8, skin:'#a07c60', iris:'#4a3a2a', lip:'#8a5a4a', browCol:'#2a1a10', browW:1.7, arch:.5, rim:'#9a8c70', rimA:.15, nose:1.2, age:.5, look:.1, smileL:.4, smileR:.6, mouthW:4.4};
    // the great round shield behind him, the bright patch where the badge was scraped off
    ctx.save(); ctx.translate(-30, -34); ell(ctx, 0, 0, 36, 38, '#141210'); ell(ctx, 0, 0, 33, 35, PR.lin(ctx, -33, -35, 30, 35, [[0,'#b0a07a'], [.5,'#6a5a3a'], [1,'#1a160e']])); PR.soft(ctx, -4, -6, 10, 10, '#e8dcc0', .3); ell(ctx, 6, 4, 6, 6.4, PR.rad(ctx, 5, 3, .5, 6.4, [[0,'#e0dccc'], [.4,'#8a867c'], [1,'#22201c']])); ctx.restore();
    PR.neck(ctx, F, 11.4); const B = BP.body(ctx, F, {wide:52, trap:7, ny:F.cy + 15.8, cb:F.cy + 21, c1:'#8a8478', c2:'#262420'}); 
    ctx.save(); B.path(); ctx.clip(); PR.mail(ctx, -54, 54, -68, 2, '#8a8478', 2); ctx.fillStyle = PR.lit(ctx, '#7a4a2a', '#3a2010', 8, 22); ctx.fillRect(8, -30, 14, 10); PR.stitch(ctx, '#2a1408', .7, () => { ctx.rect(8, -30, 14, 10); }); PR.soft(ctx, 34, -18, 26, 22, '#000000', .45); ctx.restore(); BP.light(ctx, F, B); PR.stroke(ctx, '#3a2a1a', 1.6, B.top); // the mail up to the jaw, bound in leather; patched Guard mail
    F.under = (ctx, F) => PR.dots(ctx, F, 160, 'rgba(50,30,20,.42)', .5, [6, 19, (x, y) => y > 8]); // the stubble on a heavy jaw
    PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-16, F.cy - 5); ctx.bezierCurveTo(-17, top - 5, 17, top - 5, 16, F.cy - 5); ctx.lineTo(17.4, F.cy - 2.6); ctx.lineTo(-17.4, F.cy - 2.6); ctx.closePath(); // the Guard helm, the plume cut off
    ctx.fillStyle = PR.lin(ctx, -17, 0, 17, 0, [[0,'#c8c4b8'], [.35,'#8a867c'], [.75,'#2e2c28'], [1,'#0e0e0c']]); ctx.fill(); ctx.fillStyle = '#3a3630'; ctx.fillRect(-2, top - 8, 4, 3.4); return F; },
  orvas(ctx){ const F = {cy:-74, w:11.8, h:19.6, jaw:.74, chin:4.6, skin:'#8a5a3a', iris:'#1a1008', lip:'#6a3a2a', browCol:'#0a0604', browW:1.4, arch:1.1, browL:.4, rim:'#a85a3a', rimA:.2, nose:1, look:.45, smileL:.6, smileR:.9, mouthW:3.8, teeth:1};
    // the horse-tail standard behind him, his father's
    PR.stroke(ctx, '#4a3220', 2.4, () => { ctx.moveTo(30, 4); ctx.lineTo(36, -120); }); for (let i = 0; i < 9; i++) PR.stroke(ctx, i % 2 ? '#1a1410' : '#3a2e24', 1.4, () => { ctx.moveTo(35.6, -112); ctx.quadraticCurveTo(44 + i, -96, 40 + i*1.6, -76 + i*2); });
    PR.neck(ctx, F, 8.2); const B = BP.body(ctx, F, {wide:34, drop:4, trap:2.5, ny:F.cy + 15.4, cb:F.cy + 21, c1:'#8a4228', c2:'#24100a'}); // lacquered leather
    ctx.save(); B.path(); ctx.clip(); PR.soft(ctx, -18, -34, 14, 8, '#ffd0a0', .2); for (let i = 0; i < 9; i++) PR.stroke(ctx, '#d8c8a8', .8, () => { ctx.moveTo(-24 + i*6, -10); ctx.lineTo(-25 + i*6, 2); }); ctx.restore(); BP.light(ctx, F, B); BP.band(ctx, B, -1, 4); ctx.fillStyle = PR.lit(ctx, '#6a2a16', '#1a0804', -B.nx - 3, B.nx + 3); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 4); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .5); PR.stroke(ctx, 'rgba(240,200,120,.5)', .4, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 2); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); // the lacquered collar, gold-stitched // horsehair tassels
    F.under = (ctx, F) => { const u = F.h/20; [-1, 1].forEach(sd => { const x = sd*F.w*.4; ctx.fillStyle = 'rgba(8,4,4,.92)'; ctx.beginPath(); ctx.moveTo(x - .9, F.cy + 1*u); ctx.quadraticCurveTo(x - 1.4, F.cy + 7*u, x, F.cy + 10*u); ctx.quadraticCurveTo(x + 1.4, F.cy + 7*u, x + .9, F.cy + 1*u); ctx.closePath(); ctx.fill(); }); }; // the black tears, inked
    PR.face(ctx, F);
    // black hair, long, tied back and blown
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-12.4, F.cy - 2); ctx.bezierCurveTo(-13.6, top - 1, 13.6, top - 1, 12.4, F.cy - 2); ctx.quadraticCurveTo(11.4, F.cy - 13, 0, F.cy - 16.4); ctx.quadraticCurveTo(-11.4, F.cy - 13, -12.4, F.cy - 2);
    ctx.fillStyle = PR.lin(ctx, -13, 0, 13, 0, [[0,'#2a1e16'], [.5,'#0e0a08'], [1,'#040302']]); ctx.fill();
    PR.stroke(ctx, '#0e0a08', 4, () => { ctx.moveTo(-10, F.cy - 6); ctx.quadraticCurveTo(-22, F.cy + 4, -26, F.cy + 26); }); return F; },
  /* v7.1 (70e) */
  mirrel(ctx){ const F = {cy:-73, w:11.8, h:19.2, jaw:.7, chin:4.2, skin:'#c8a080', iris:'#4a3a24', lip:'#9a5a4a', browCol:'#2a1810', browW:1.25, arch:.9, browL:.55, rim:'#8fbfa0', rimA:.2, nose:1, look:-.25, open:1, smileL:.2, smileR:.05, mouthW:3.5};
    PR.neck(ctx, F, 7.6); const B = BP.body(ctx, F, {wide:32, drop:6, trap:1, ny:F.cy + 15.6, cb:F.cy + 20.8, c1:'#a29e82', c2:'#2e2c20'}); // the quilted jack
    ctx.save(); B.path(); ctx.clip(); PR.stroke(ctx, 'rgba(0,0,0,.25)', .7, () => { for (let i = 0; i < 7; i++) { ctx.moveTo(-34, -49 + i*7); ctx.lineTo(34, -49 + i*7); } });
    PR.stroke(ctx, '#4a3420', 3.2, () => { ctx.moveTo(-26, -6); ctx.lineTo(18, -46); }); PR.soft(ctx, 24, -20, 18, 18, '#000000', .4); ctx.restore(); BP.light(ctx, F, B); BP.band(ctx, B, -1, 3.6); ctx.fillStyle = PR.lit(ctx, '#8a8670', '#22201a', -B.nx - 3, B.nx + 3); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 3.6); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .5); // the bag's strap
    ctx.save(); ctx.translate(-20, -12); ctx.fillStyle = PR.lit(ctx, '#7a6044', '#2e2010', -10, 10); ctx.fillRect(-10, -6, 20, 14); ell(ctx, 0, 1, 3, 3.4, '#b23a2a'); PR.stroke(ctx, '#b23a2a', 1.1, () => { for (let i = -2; i <= 2; i++) { ctx.moveTo(i*1.2, -1); ctx.lineTo(i*1.6, -4.6); } }); ctx.restore(); // the red hand on the flap
    PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-12.4, F.cy - 2); ctx.bezierCurveTo(-13.4, top - 1, 13.4, top - 1, 12.4, F.cy - 2); ctx.quadraticCurveTo(11.2, F.cy - 13, 0, F.cy - 16); ctx.quadraticCurveTo(-11.2, F.cy - 13, -12.4, F.cy - 2);
    ctx.fillStyle = PR.lin(ctx, -13, 0, 13, 0, [[0,'#4a3020'], [.5,'#2a1810'], [1,'#0a0604']]); ctx.fill(); ell(ctx, 2, top - 3, 6, 4.6, PR.rad(ctx, 0, top - 4, .5, 6, [[0,'#4a3020'], [1,'#140c06']])); return F; }, // hair pulled back into a knot
  yorin(ctx){ const F = {cy:-74, w:11.4, h:20, jaw:.68, chin:4.2, skin:'#c09a7a', iris:'#5a7a9a', lip:'#8a5a4a', browCol:'#5a3a1a', browW:1.1, arch:1.3, browL:.7, browR:.4, rim:'#9fc4e8', rimA:.24, nose:1.05, look:.5, open:1.15, smileL:.35, smileR:.1, mouthW:3.6};
    PR.neck(ctx, F, 7.6); const B = BP.body(ctx, F, {wide:31, drop:5, trap:1.5, nx:10.2, ny:-51.6, cb:-47, c1:'#6e6e66', c2:'#1c1c18'}); // the padded jack, a round neck
    ctx.save(); B.path(); ctx.clip(); ctx.fillStyle = PR.lin(ctx, -30, -40, 30, 0, [[0,'#8ac0ee'], [.6,'#4f86b8'], [1,'#1e3650']]); PR.path(ctx, [[-30, -40], [-18, -52], [30, -4], [30, 8]]); ctx.fill(); PR.soft(ctx, 22, -18, 18, 18, '#000000', .45); ctx.restore(); BP.light(ctx, F, B, true); BP.band(ctx, B, -.6, 1.6); ctx.fillStyle = PR.lit(ctx, '#4a4a44', '#141410', -12, 12); ctx.fill(); // the sky-blue sash
    PR.stroke(ctx, '#2a2018', .6, () => { ctx.moveTo(-5, -47); ctx.quadraticCurveTo(-4, -38, 0, -33); ctx.moveTo(5, -47); ctx.quadraticCurveTo(4, -38, 0, -33); }); ell(ctx, 0, -30, 3.6, 3.6, PR.rad(ctx, -1, -31, .4, 3.6, [[0,'#f0b070'], [1,'#7a3a12']])); PR.stroke(ctx, '#f8d0a0', .8, () => { ctx.moveTo(0, -30); ctx.lineTo(2.6, -33.4); }); // the copper vane at his throat
    PR.face(ctx, F);
    [-1, 1].forEach(sd => PR.strands(ctx, 16, ['#7a5a3a', '#5a3a1a', '#3a2410'], .6, 50 + sd, (i, r) => { const x = sd*(6 + r()*6), y = F.cy - 16 + r()*3; return [x, y, x - 8 - r()*6, y - 4, x - 14 - r()*8, y - 2 + r()*4]; })); // hair blown back by a wind nobody else feels
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-12, F.cy - 4); ctx.bezierCurveTo(-13, top, 12, top - 2, 12.4, F.cy - 4); ctx.quadraticCurveTo(10, F.cy - 13, 0, F.cy - 15.6); ctx.quadraticCurveTo(-10, F.cy - 13, -12, F.cy - 4);
    ctx.fillStyle = PR.lin(ctx, -13, 0, 13, 0, [[0,'#7a5a3a'], [.5,'#4a3018'], [1,'#1a1008']]); ctx.fill(); return F; },
  rasp(ctx){ const F = {cy:-74, w:12.2, h:19.6, jaw:.8, chin:5, skin:'#c89a78', iris:'#3a4a3a', lip:'#8a4a3a', browCol:'#6a3010', browW:1.35, arch:.7, browL:.3, browR:.6, rim:'#d0864a', rimA:.2, nose:1.05, look:.2, smileL:.5, smileR:-.1, mouthW:3.8};
    // the marine crossbow behind her right shoulder, the cradle filed bright
    ctx.save(); ctx.translate(26, -46); ctx.rotate(.22); ctx.fillStyle = PR.lin(ctx, -3, 0, 4, 0, [[0,'#8a6440'], [.5,'#5a3e22'], [1,'#1e140a']]); ctx.fillRect(-3, -44, 6, 70);
    ctx.strokeStyle = PR.lin(ctx, -22, 0, 22, 0, [[0,'#9a968c'], [.5,'#4a4640'], [1,'#141210']]); ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, -30); ctx.bezierCurveTo(-12, -38, -4, -40, 0, -40); ctx.bezierCurveTo(4, -40, 12, -38, 20, -30); ctx.stroke(); ctx.lineCap = 'butt';
    ctx.fillStyle = '#8a8476'; ctx.fillRect(-4.6, -18, 9.2, 5); ctx.fillStyle = 'rgba(255,255,240,.4)'; ctx.fillRect(-4.6, -18, 9.2, 1.2); ctx.restore();
    PR.neck(ctx, F, 8); const B = BP.body(ctx, F, {wide:34, drop:4, trap:2, ny:F.cy + 15.4, cb:F.cy + 20.8, c1:'#4e3e2c', c2:'#1a120a'}); // the jerkin
    ctx.save(); B.path(); ctx.clip(); ctx.fillStyle = PR.lit(ctx, '#86603e', '#2e1e10', -20, 20); PR.path(ctx, [[-20, -30], [20, -30], [24, 6], [-24, 6]]); ctx.fill(); // the leather apron
    PR.soft(ctx, -8, -16, 6, 4, '#120a04', .5); PR.soft(ctx, 10, -8, 5, 3, '#120a04', .4); PR.stroke(ctx, '#3a2412', 1.4, () => { ctx.moveTo(-20, -30); ctx.quadraticCurveTo(-14, -46, -11, -56); ctx.moveTo(20, -30); ctx.quadraticCurveTo(14, -46, 11, -56); }); PR.soft(ctx, 26, -18, 18, 18, '#000000', .45); ctx.restore(); BP.light(ctx, F, B); BP.band(ctx, B, -1, 4); ctx.fillStyle = PR.lit(ctx, '#5a4834', '#1a120a', -B.nx - 3, B.nx + 3); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.5)', .5, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 4); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .5); // scorch marks, the apron's straps
    F.under = (ctx, F) => PR.dots(ctx, F, 40, 'rgba(150,70,40,.4)', .55, [-4, 10]); // burn-freckles
    PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-13.4, F.cy - 4); ctx.bezierCurveTo(-14.4, top - 2, 14.4, top - 2, 13.4, F.cy - 4); ctx.quadraticCurveTo(11.4, F.cy - 12.6, 0, F.cy - 15.8); ctx.quadraticCurveTo(-11.4, F.cy - 12.6, -13.4, F.cy - 4); // hair cropped short, red-brown
    ctx.fillStyle = PR.lin(ctx, -14, 0, 14, 0, [[0,'#a85a2a'], [.5,'#6a3410'], [1,'#200c04']]); ctx.fill(); return F; },
});
