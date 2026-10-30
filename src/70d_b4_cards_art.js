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

/* ---------------- their busts (POR): in bust units, shoulders at y = 0, the face about y = −74 ----------------
   Repainted to Book Five's standard with the shared bust helpers (BP, 19_portraits.js): hair with volume, the garment rising to the jaw
   in one piece, textured kit. Two of Book Four's own: a helm (Tallow's too big, Darrut's with the Guard's plume cut off) and lacquered lamellar (Orvas) */
const B4P = {
  /* an open bowl helm: o {c:[light, mid, dark], b:[brim light, brim dark], r: past the temples, y: brim height (u above cy), h: bowl height, n: rivets, stub: the plume's socket, dent} */
  helm(ctx, F, o){ const u = F.h/20, R = F.w + (o.r ?? 2.6), y = F.cy - (o.y ?? 7)*u, H = o.h ?? 15;
    const bowl = () => { ctx.beginPath(); ctx.ellipse(0, y, R, H, 0, Math.PI, 0); ctx.closePath(); };
    if (o.stub) { ctx.fillStyle = PR.lit(ctx, '#7a766c', '#1a1814', -2, 2); ctx.fillRect(-1.8, y - H - 3.4, 3.6, 4); ctx.fillStyle = '#d8d0b8'; ctx.fillRect(-1.6, y - H - 3.6, 3.2, .8); PR.stroke(ctx, 'rgba(40,20,10,.8)', .4, () => { for (let i = 0; i < 4; i++){ ctx.moveTo(-1.4 + i, y - H - 3.6); ctx.lineTo(-1.6 + i*1.1, y - H - 4.6); } }); } // the plume's socket, the plume cut off
    bowl(); ctx.fillStyle = PR.lin(ctx, -R, y - H, R*.9, y, [[0, o.c[0]], [.3, o.c[1]], [.65, o.c[2]], [1, '#0a0b0c']]); ctx.fill();
    ctx.save(); bowl(); ctx.clip(); PR.soft(ctx, -R*.42, y - H*.66, R*.42, H*.16, '#ffffff', .42, -.55); PR.soft(ctx, R*.62, y - H*.36, R*.5, H*.5, '#000000', .45);
      if (o.dent) { PR.soft(ctx, R*.25, y - H*.55, 3, 2, '#000000', .45, .4); PR.stroke(ctx, 'rgba(255,255,255,.3)', .4, () => { ctx.arc(R*.25 - .6, y - H*.55, 2.6, 3.4, 4.6); }); }
      if (o.ridge) { ctx.fillStyle = PR.lin(ctx, -2, 0, 2, 0, [[0, '#e0e0d8'], [.5, '#5a5850'], [1, '#141412']]); ctx.fillRect(-1.4, y - H, 2.8, H); } ctx.restore();
    PR.stroke(ctx, 'rgba(255,240,210,.35)', .5, () => { ctx.ellipse(0, y, R - .8, H - .8, 0, Math.PI*1.08, Math.PI*1.4); });
    ctx.fillStyle = PR.lin(ctx, -R, 0, R, 0, [[0, o.b[0]], [.45, o.b[1]], [1, '#121110']]); ctx.beginPath(); ctx.moveTo(-R - .8, y - 2.2); ctx.quadraticCurveTo(0, y - 3.6, R + .8, y - 2.2); ctx.lineTo(R + .8, y + 1.6); ctx.quadraticCurveTo(0, y + .2, -R - .8, y + 1.6); ctx.closePath(); ctx.fill(); // the brim
    for (let i = 0; i < (o.n ?? 9); i++){ const x = -R + 1.6 + i*(2*R - 3.2)/((o.n ?? 9) - 1); ell(ctx, x, y - .4 - (1 - Math.abs(x)/R)*1.1, .55, .55, x < 3 ? '#f4eee0' : '#3a3834'); }
    PR.soft(ctx, 0, y + 3, F.w*.95, 2.6, '#000000', .5); },
  /* lacquered lamellar: little plates laced in rows, the bottom row first so each row laps the one below; the lacquer holds the lantern */
  lam(ctx, x0, x1, y0, y1, pw, ph, col, seed = 3){ const r = PR.rng(seed), rows = Math.ceil((y1 - y0)/(ph*.74));
    for (let j = rows; j >= 0; j--){ const y = y0 + j*ph*.74; for (let x = x0 + (j%2)*pw*.5; x < x1 + pw; x += pw){ const k = clamp((x - x0)/(x1 - x0), 0, 1), jt = (r() - .5)*.12;
      ctx.beginPath(); ctx.moveTo(x - pw*.47, y); ctx.lineTo(x + pw*.47, y); ctx.lineTo(x + pw*.47, y + ph*.82); ctx.quadraticCurveTo(x + pw*.47, y + ph, x + pw*.3, y + ph); ctx.lineTo(x - pw*.3, y + ph); ctx.quadraticCurveTo(x - pw*.47, y + ph, x - pw*.47, y + ph*.82); ctx.closePath();
      ctx.fillStyle = PR.lin(ctx, x - pw*.5, y, x + pw*.3, y + ph, [[0, shade(col, .3 - k*.6 + jt)], [.6, shade(col, -.1 - k*.5 + jt)], [1, shade(col, -.55 - k*.35)]]); ctx.fill(); ctx.strokeStyle = 'rgba(8,4,2,.85)'; ctx.lineWidth = .4; ctx.stroke();
      if (k < .6) PR.stroke(ctx, `rgba(255,236,210,${.6*(1 - k/.6)})`, .35, () => { ctx.moveTo(x - pw*.32, y + ph*.25); ctx.lineTo(x - pw*.32, y + ph*.8); });
      ell(ctx, x - pw*.18, y + ph*.16, .32, .32, '#e8d8b0'); ell(ctx, x + pw*.18, y + ph*.16, .32, .32, '#e8d8b0'); } } }, // the lacing
  /* a strap across the chest, with a stitched edge */
  strap(ctx, x0, y0, x1, y1, c, w = 3.2){ ctx.lineCap = 'butt'; ctx.strokeStyle = PR.lit(ctx, c, '#120a04', -24, 26); ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); PR.stitch(ctx, 'rgba(230,200,150,.42)', .3, () => { ctx.moveTo(x0 - .3, y0 - w*.36); ctx.lineTo(x1 - .3, y1 - w*.36); }); },
  /* a line along the neckline, offset below it */
  along(ctx, B, off, col, w){ PR.stroke(ctx, col, w, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, off); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); },
};
Object.assign(POR, {
  /* Tallow: eighteen, the Quon coast; tall for it and not used to it. New boiled leather that creaks, a helm a size too big down to his brows, fair hair sticking out under it, the sling and its pouch of beach stones, the finger bone, a short sword still bright */
  tallow(ctx){ const F = {cy:-74, w:12.2, h:19.4, jaw:.72, chin:4.4, skin:'#d4ac8c', iris:'#5a6e82', lip:'#a46a5a', browCol:'#a88050', browW:1.15, arch:1.3, browL:.7, browR:.4, rim:'#c9b27a', rimA:.2, nose:.92, look:.3, open:1.14, smileL:.15, smileR:.4, mouthW:3.6, flush:'#d87a6a'};
    BP.back(ctx, F, '#b89a62', '#3a2a12', 14, 2.6); PR.neck(ctx, F, 8);
    const B = BP.body(ctx, F, {wide:36, drop:4, trap:2, ny:F.cy + 15.4, cb:F.cy + 20.6, c1:'#c09c68', c2:'#3a2a16'}); ctx.save(); B.path(); ctx.clip(); // new boiled leather, still pale
      [-1, 1].forEach(sd => { ctx.beginPath(); ctx.moveTo(sd*16, -48); ctx.bezierCurveTo(sd*30, -48, sd*38, -40, sd*38, -26); ctx.lineTo(sd*31, -24); ctx.bezierCurveTo(sd*30, -34, sd*24, -40, sd*15, -42); ctx.closePath(); ctx.fillStyle = sd < 0 ? PR.lin(ctx, -38, -48, -16, -26, [[0, '#e0c490'], [1, '#8a6a3e']]) : PR.lin(ctx, 16, 0, 38, 0, [[0, '#5a4226'], [1, '#120c06']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = .5; ctx.stroke(); }); // the shoulder cops, stiff
      PR.path(ctx, [[-27, 4], [-25, -36], [-12, -42], [12, -42], [25, -36], [27, 4]]); ctx.fillStyle = PR.lit(ctx, '#d0ae78', '#3e2c16', -26, 24); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = .7; ctx.stroke(); // the breast, one piece and stiff
      PR.stitch(ctx, 'rgba(90,60,30,.6)', .45, () => { ctx.moveTo(-24, -34); ctx.lineTo(-11.6, -39.6); ctx.lineTo(11.6, -39.6); ctx.lineTo(24, -34); });
      PR.stroke(ctx, 'rgba(90,60,30,.35)', .6, () => { ctx.moveTo(-18, -30); ctx.quadraticCurveTo(-14, -26, -16, -18); ctx.moveTo(-8, -36); ctx.quadraticCurveTo(-6, -30, -9, -24); }); PR.stroke(ctx, 'rgba(255,240,210,.3)', .45, () => { ctx.moveTo(-17.4, -30.4); ctx.quadraticCurveTo(-13.4, -26.4, -15.4, -18.4); }); // where it creases, and shines
      PR.soft(ctx, -16, -32, 12, 7, '#fff4d8', .2); ctx.fillStyle = PR.lit(ctx, '#6a4a2a', '#1e140a', -30, 30); ctx.fillRect(-40, -8, 80, 4); ell(ctx, -4, -6, 2.2, 1.8, '#c8c0a8'); // the belt, its buckle
      ctx.restore(); BP.light(ctx, F, B); BP.band(ctx, B, -1, 4); ctx.fillStyle = PR.lit(ctx, '#a08458', '#2a1a0c', -B.nx - 3, B.nx + 3); ctx.fill(); B4P.along(ctx, B, 4, 'rgba(0,0,0,.5)', .5); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .5); // the leather rolled at the neck
    B4P.strap(ctx, -20, -46, 22, 2, '#5a3a1e', 2.4); // the sling's pouch on its strap
    ctx.save(); ctx.translate(20, -4); ctx.fillStyle = PR.lit(ctx, '#7a5634', '#1e1208', -6, 6); ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(6, -4); ctx.quadraticCurveTo(7, 6, 0, 7); ctx.quadraticCurveTo(-7, 6, -6, -4); ctx.fill(); [[-2.4, -4.6], [.6, -5.4], [3, -4.4]].forEach(([x, y], i) => ell(ctx, x, y, 1.6, 1.3, PR.rad(ctx, x - .5, y - .5, .1, 1.7, [[0, ['#e8e4dc', '#c8bca8', '#9a9a94'][i]], [1, '#3a3630']]))); ctx.restore(); // beach stones from home
    PR.stroke(ctx, '#4a2e16', 1, () => { ctx.moveTo(-24, -40); ctx.bezierCurveTo(-30, -30, -20, -22, -26, -14); ctx.bezierCurveTo(-30, -8, -22, -4, -24, 2); }); ctx.save(); ctx.translate(-26.6, -14); ctx.rotate(.3); ell(ctx, 0, 0, 2, 3.2, PR.lit(ctx, '#8a6440', '#2a1a0c', -2, 2)); ctx.restore(); // the sling itself, hung over the shoulder
    ell(ctx, -30, -1, 2.4, 2.4, PR.rad(ctx, -30.8, -1.8, .2, 2.6, [[0, '#ffffff'], [.4, '#c8ccd0'], [1, '#3a3c40']])); ctx.fillStyle = PR.lit(ctx, '#4a3420', '#140c06', -32, -28); ctx.fillRect(-31, 1.4, 2, 4); // the short sword's pommel, still bright
    PR.stroke(ctx, '#3a2a18', .7, () => { ctx.moveTo(-6, -49); ctx.quadraticCurveTo(0, -38, 6, -49); }); ctx.save(); ctx.translate(0, -38.6); ctx.rotate(.2); ctx.fillStyle = PR.lin(ctx, -1.6, 0, 1.6, 0, [[0, '#f4ecd8'], [1, '#8a7e66']]); ctx.fillRect(-1.1, 0, 2.2, 6.4); ell(ctx, 0, 0, 1.5, 1.1, '#ece0c4'); ell(ctx, 0, 6.4, 1.5, 1.1, '#d8ccb0'); ctx.restore(); // the finger bone, like everyone else
    F.under = (ctx, F) => { PR.dots(ctx, F, 40, 'rgba(170,90,60,.3)', .5, [-2, 8, (x, y) => Math.abs(x) > F.w*.8]); PR.soft(ctx, -1, F.cy + 17, 4, 1.6, '#ffe0c8', .12); }; // freckles; a chin that has not needed much shaving
    PR.face(ctx, F);
    PR.strands(ctx, 40, ['#d8bc80', '#b0904e', '#8a6a34', '#e8d098'], .7, 71, (i, r) => { const sd = i%2 ? 1 : -1, x = sd*(F.w - 1 + r()*2.6), y = F.cy - 8 + r()*3; return [x, y, x + sd*(1.4 + r()*2), y + 4, x + sd*(1 + r()*3.4), y + 7 + r()*6]; }); // fair hair sticking out under it
    PR.strands(ctx, 12, ['#d8bc80', '#b0904e'], .7, 73, (i, r) => { const x = -8 + r()*14, y = F.cy - 11; return [x, y, x + (r() - .5)*2, y + 1.6, x + (r() - .5)*3, y + 3 + r()*1.6]; });
    B4P.helm(ctx, F, {c:['#e0ddd4', '#a09c92', '#3e3c36'], b:['#b8b4aa', '#5a5852'], r:3.4, y:8.4, h:16.4, n:10, dent:1}); return F; }, // the helm a size too big, down to the brows
  /* Hessa: thirty-one, Kartool; a battle-priest of D'rek. Square, heavy in the shoulder, still as a door; hair cropped to the skull, the Worm's ring inked on her brow; Malazan scale over a temple guard's coat, the temple seal at the throat, a long-bladed temple spear and the tall shield with the worm carved round its rim */
  hessa(ctx){ const F = {cy:-75, w:13.6, h:20.4, jaw:.94, chin:6.2, skin:'#9e7656', iris:'#3a2a1a', lip:'#7a4a3a', browCol:'#140a06', browW:1.8, arch:.35, rim:'#8a9a6a', rimA:.2, nose:1.15, look:0, open:.86, smileL:-.3, smileR:-.25, mouthW:4, age:.25, bags:.3};
    ctx.save(); ctx.translate(-30, 4); ctx.rotate(-.05); ctx.lineCap = 'butt'; ctx.strokeStyle = PR.lin(ctx, -1.6, 0, 1.6, 0, [[0, '#a07a50'], [.5, '#5a4028'], [1, '#1a1008']]); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(0, -98); ctx.stroke(); // the temple spear
      ctx.fillStyle = PR.lin(ctx, -4, 0, 4, 0, [[0, '#f0ece4'], [.45, '#9a968c'], [1, '#22201e']]); PR.path(ctx, [[-1.8, -98], [1.8, -98], [3.4, -112], [0, -130], [-3.4, -112]]); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.5)', .4, () => { ctx.moveTo(0, -99); ctx.lineTo(0, -127); }); PR.stroke(ctx, 'rgba(255,255,255,.6)', .3, () => { ctx.moveTo(-.6, -100); ctx.lineTo(-2.4, -112); });
      PR.stroke(ctx, '#3a5a3a', 1, () => { for (let k = 0; k < 5; k++){ ctx.moveTo(-1.8, -96 + k*1.2); ctx.lineTo(1.8, -95.4 + k*1.2); } }); ctx.restore(); // its binding, worm-green
    ctx.save(); ctx.translate(36, -42); const sh = () => { ctx.beginPath(); ctx.moveTo(-17, -42); ctx.quadraticCurveTo(0, -46, 17, -42); ctx.lineTo(17, 30); ctx.quadraticCurveTo(8, 42, 0, 46); ctx.quadraticCurveTo(-8, 42, -17, 30); ctx.closePath(); }; // the tall shield behind her
      sh(); ctx.fillStyle = PR.lin(ctx, -17, -40, 17, 40, [[0, '#7a8462'], [.45, '#46503a'], [1, '#0e100a']]); ctx.fill(); ctx.save(); sh(); ctx.clip(); PR.soft(ctx, -8, -24, 8, 18, '#e8f0d8', .14);
        ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(30,36,22,.8)'; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 40; i++){ const t = i/40, y = -40 + t*80, x = -12.6 + Math.sin(t*28)*1.4; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); // the worm, carved round the rim and painted over
        ctx.strokeStyle = 'rgba(220,226,190,.4)'; ctx.lineWidth = .7; ctx.stroke(); ctx.restore();
      ctx.strokeStyle = PR.lin(ctx, -17, -40, 17, 40, [[0, '#b0aa98'], [.5, '#5a5648'], [1, '#121210']]); ctx.lineWidth = 2; sh(); ctx.stroke(); ctx.restore();
    PR.neck(ctx, F, 9.6);
    const B = BP.body(ctx, F, {wide:45, drop:2, trap:6, ny:F.cy + 15.6, cb:F.cy + 21, c1:'#6a7458', c2:'#1c2014'}); ctx.save(); B.path(); ctx.clip();
      BP.scales(ctx, -47, 47, -68, 2, 5.4, '#8a9474', 31); ctx.fillStyle = PR.lit(ctx, '#3e5a3a', '#0e140c', -40, 40); ctx.fillRect(-48, -5, 96, 7); PR.stroke(ctx, 'rgba(200,220,170,.3)', .5, () => { ctx.moveTo(-48, -4.4); ctx.lineTo(48, -4.4); }); // the temple coat's green below the scale
      PR.soft(ctx, -22, -40, 16, 8, '#f0f8e0', .12); ctx.restore(); BP.light(ctx, F, B);
    BP.band(ctx, B, -1, 5); ctx.fillStyle = PR.lit(ctx, '#4a5236', '#10140a', -B.nx - 3, B.nx + 3); ctx.fill(); B4P.along(ctx, B, 5, 'rgba(0,0,0,.6)', .6); PR.stitch(ctx, 'rgba(210,220,170,.45)', .35, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 2.6); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .55); // the temple coat's collar
    { const x = 0, y = B.cb + 3.4; ell(ctx, x + .5, y + .6, 3.6, 3.6, 'rgba(0,0,0,.5)'); ell(ctx, x, y, 3.4, 3.4, PR.rad(ctx, x - 1.2, y - 1.2, .3, 3.6, [[0, '#fff0c0'], [.4, '#c8a050'], [1, '#4a3410']])); PR.stroke(ctx, 'rgba(60,40,10,.8)', .45, () => { ctx.arc(x, y, 1.8, .4, 5.9); }); } // the temple seal: the Worm, eating its tail
    F.under = (ctx, F) => { const u = F.h/20; PR.stroke(ctx, 'rgba(40,70,50,.6)', .7, () => { ctx.arc(0, F.cy - 11*u, 2.2, .5, 5.8); }); ell(ctx, 2.1, F.cy - 11*u + 1.1, .5, .4, 'rgba(40,70,50,.7)'); // the Worm's ring, inked on her brow
      PR.soft(ctx, 0, F.cy - 6*u, F.w*.9, 2.2, '#140806', .3); PR.dots(ctx, F, 30, 'rgba(30,16,10,.2)', .5, [8, 18]); };
    PR.face(ctx, F);
    const hs = BP.hair(ctx, F, {c:['#3a2c20', '#140c08', '#050302'], v:1.2, wx:.8, hl:14.6, ey:-3, n:30, sw:.4, seed:81, sh:'#a0a088', shA:.18, wisp:0}); // cropped to the skull, the temple's way
    { const r = PR.rng(83); ctx.save(); hs(); ctx.clip(); for (let i = 0; i < 200; i++){ const x = (r() - .5)*2*(F.w + 1), y = F.cy - 22 + r()*14; ell(ctx, x, y, .3, .3, r() < .5 ? 'rgba(10,6,4,.6)' : 'rgba(80,64,50,.4)'); } ctx.restore(); }
    return F; },
  /* Tebbet: twenty-six, Dal Hon's hill country; long in the arm and narrow, very still before he looses. A cloth hood against the sun, wound round the head and the jaw; a padded jack, a bracer worn smooth; the recurve his uncle made, rebuilt twice */
  tebbet(ctx){ const F = {cy:-73, w:11.8, h:20, jaw:.7, chin:4.6, skin:'#6a4630', iris:'#1e140c', lip:'#5a3428', browCol:'#0a0604', browW:1.4, arch:.7, rim:'#b7895a', rimA:.24, nose:1.05, look:-.3, open:.82, smileL:.1, smileR:.05, mouthW:3.6};
    ctx.save(); ctx.translate(-30, -52); ctx.rotate(-.22); ctx.lineCap = 'round'; const bow = () => { ctx.beginPath(); ctx.moveTo(-6, -50); ctx.quadraticCurveTo(0, -46, 4, -38); ctx.quadraticCurveTo(10, -18, 4, 0); ctx.quadraticCurveTo(10, 18, 4, 38); ctx.quadraticCurveTo(0, 46, -6, 50); }; // the recurve, its tips turned
      ctx.strokeStyle = '#140c06'; ctx.lineWidth = 3.8; bow(); ctx.stroke(); ctx.strokeStyle = PR.lin(ctx, -2, 0, 10, 0, [[0, '#c89a5a'], [.5, '#7a5228'], [1, '#2a1808']]); ctx.lineWidth = 2.6; bow(); ctx.stroke();
      [[-6, -50], [-6, 50]].forEach(([x, y]) => ell(ctx, x, y, 1.4, 1.2, '#e8dcc0')); ctx.fillStyle = '#2a1a0c'; ctx.fillRect(4, -5, 4.4, 10); PR.stroke(ctx, 'rgba(220,190,130,.6)', .35, () => { for (let i = 0; i < 6; i++){ ctx.moveTo(4, -4 + i*1.6); ctx.lineTo(8.4, -3.2 + i*1.6); } }); // horn tips; the grip, wrapped
      PR.stroke(ctx, 'rgba(240,232,210,.75)', .45, () => { ctx.moveTo(-5.4, -49); ctx.lineTo(-5.4, 49); }); ctx.restore();
    PR.strands(ctx, 6, ['#d8d0c0', '#5a5040', '#a89c84'], 1.1, 91, (i, r) => { const x = 20 + i*1.9, y = -60 + (i%2)*2; return [x, y + 10, x + .4, y + 4, x + .8 + r(), y - 1]; }); ctx.fillStyle = PR.lit(ctx, '#5a3a20', '#1a1008', 16, 30); PR.path(ctx, [[17, -52], [30, -55], [32, -47], [19, -44]]); ctx.fill(); // the quiver
    PR.neck(ctx, F, 7.6);
    const B = BP.body(ctx, F, {wide:32, drop:6, trap:1.5, ny:F.cy + 15.6, cb:F.cy + 20.8, c1:'#7a6a50', c2:'#1e1810'}); ctx.save(); B.path(); ctx.clip(); BP.quilt(ctx, -36, 36, -60, 4, 5.6, 'rgba(30,20,10,.55)'); // the padded jack
      B4P.strap(ctx, 20, -48, -26, 4, '#4a3018', 3); PR.soft(ctx, -18, -34, 12, 7, '#ffe8c8', .12); ctx.restore(); BP.light(ctx, F, B);
    F.under = (ctx, F) => { PR.dots(ctx, F, 60, 'rgba(10,6,4,.4)', .45, [9, 19, (x, y) => Math.abs(x) < 4.4 && y > 10.4 && y < 14]); PR.stroke(ctx, 'rgba(10,6,4,.6)', .8, () => { ctx.moveTo(-4.6, F.cy + 10.6); ctx.quadraticCurveTo(0, F.cy + 9.6, 4.6, F.cy + 10.6); }); }; // a thin moustache, a few days' beard
    PR.face(ctx, F);
    const u = F.h/20, top = F.cy - 21*u, hood = () => { ctx.beginPath(); ctx.moveTo(-26, -40); ctx.bezierCurveTo(-24, -52, -19, F.cy + 4, -16, F.cy - 8); ctx.bezierCurveTo(-16, top - 9, 16, top - 9, 16, F.cy - 8); ctx.bezierCurveTo(19, F.cy + 4, 24, -52, 26, -40); ctx.quadraticCurveTo(0, -33, -26, -40); ctx.closePath();
      ctx.moveTo(0, F.cy - 15.6); ctx.bezierCurveTo(9, F.cy - 15.6, 12.4, F.cy - 8, 12.2, F.cy); ctx.bezierCurveTo(12, F.cy + 10, 7, F.cy + 17, 0, F.cy + 18.4); ctx.bezierCurveTo(-7, F.cy + 17, -12, F.cy + 10, -12.2, F.cy); ctx.bezierCurveTo(-12.4, F.cy - 8, -9, F.cy - 15.6, 0, F.cy - 15.6); ctx.closePath(); }; // the cloth hood, round the head and the jaw
    hood(); ctx.fillStyle = PR.lin(ctx, -26, top, 26, -40, [[0, '#c8a878'], [.35, '#9a7a50'], [.75, '#4a3820'], [1, '#120c06']]); ctx.fill('evenodd');
    ctx.save(); hood(); ctx.clip('evenodd'); PR.stroke(ctx, 'rgba(40,26,10,.55)', .8, () => { for (let i = 0; i < 6; i++){ ctx.moveTo(-15 - i*1.4, F.cy - 4 + i*5); ctx.quadraticCurveTo(-6, F.cy + 22 + i*2, 15 + i*1.4, F.cy - 2 + i*5); } for (let i = 0; i < 4; i++){ ctx.moveTo(-14 + i*2, top - 6 + i*2); ctx.quadraticCurveTo(0, top - 10 + i*3, 14 - i*2, top - 6 + i*2); } }); // its winding
      PR.stroke(ctx, 'rgba(255,236,200,.25)', .6, () => { for (let i = 0; i < 5; i++){ ctx.moveTo(-15.6 - i*1.4, F.cy - 4.6 + i*5); ctx.quadraticCurveTo(-8, F.cy + 18 + i*2, -2, F.cy + 18 + i*3); } }); PR.soft(ctx, 16, F.cy, 10, 18, '#000000', .45); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, F.cy + 1.4, 12.2, 17.4, 0, 0, 7); ctx.clip(); PR.soft(ctx, 0, F.cy - 13, 12, 4, '#0a0604', .5); ctx.restore(); // its shadow on the brow
    PR.stroke(ctx, 'rgba(255,230,190,.35)', .5, () => { ctx.moveTo(-12.4, F.cy + 4); ctx.bezierCurveTo(-12.6, F.cy - 8, -9, F.cy - 16, 0, F.cy - 16); }); return F; },
  /* Darrut: thirty-four, Aren's Old Quarter; one of the Aren Guard who followed Blistig. Broad, thick in the neck, slower than he can be; a heavy stubbled jaw and a nose broken on the wall; the Guard's mail patched, its helm with the plume cut off, the great round shield with the badge scraped away */
  darrut(ctx){ const F = {cy:-75, w:15, h:20.4, jaw:1, chin:7, skin:'#a27e60', iris:'#4a3a2a', lip:'#8a5a4a', browCol:'#2a1a10', browW:2, arch:.4, rim:'#9a8c70', rimA:.16, nose:1.3, age:.55, bags:.6, look:.1, open:.84, smileL:.45, smileR:.7, mouthW:4.4, earS:1.12};
    ctx.save(); ctx.translate(-34, -36); ell(ctx, 2, 2, 37, 39, 'rgba(0,0,0,.5)'); ell(ctx, 0, 0, 35, 37, '#141210'); ell(ctx, 0, 0, 32.6, 34.6, PR.lin(ctx, -32, -34, 30, 34, [[0, '#c0aa7a'], [.45, '#7a6640'], [1, '#1a160e']])); // the great round shield
      ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 32.6, 34.6, 0, 0, 7); ctx.clip(); PR.stroke(ctx, 'rgba(0,0,0,.3)', .6, () => { for (let i = -4; i <= 4; i++){ ctx.moveTo(i*8, -36); ctx.lineTo(i*8 + 1, 36); } }); ell(ctx, -6, -8, 11, 11, 'rgba(240,226,190,.35)'); PR.stroke(ctx, 'rgba(60,46,20,.5)', .5, () => { for (let i = 0; i < 12; i++){ const a = i*.5; ctx.moveTo(-6 + Math.cos(a)*4, -8 + Math.sin(a)*4); ctx.lineTo(-6 + Math.cos(a)*10, -8 + Math.sin(a)*10); } }); ctx.restore(); // the bright patch where the badge was scraped off
      ctx.strokeStyle = PR.lin(ctx, -34, -34, 34, 34, [[0, '#c8c4b8'], [.5, '#5a5850'], [1, '#121210']]); ctx.lineWidth = 2.4; ctx.beginPath(); ctx.ellipse(0, 0, 33.6, 35.6, 0, 0, 7); ctx.stroke(); for (let i = 0; i < 14; i++){ const a = i/14*6.283; ell(ctx, Math.cos(a)*33.6, Math.sin(a)*35.6, .7, .7, a > 1.8 && a < 4.4 ? '#e8e4da' : '#4a4640'); }
      ell(ctx, 7, 4, 6.4, 6.8, PR.rad(ctx, 5, 2, .5, 7, [[0, '#f0ece0'], [.4, '#8a867c'], [1, '#22201c']])); ctx.restore(); // the boss
    PR.neck(ctx, F, 12);
    const B = BP.body(ctx, F, {wide:53, trap:8, ny:F.cy + 15.8, cb:F.cy + 21, c1:'#8a8478', c2:'#262420'}); ctx.save(); B.path(); ctx.clip(); PR.mail(ctx, -55, 55, -70, 2, '#8a8478', 2); // the Guard's mail, up to the jaw
      PR.soft(ctx, -24, -40, 18, 9, '#fff4e0', .14); ctx.fillStyle = PR.lit(ctx, '#8a5a32', '#3a2010', 8, 22); ctx.fillRect(8, -30, 14, 10); PR.stitch(ctx, '#2a1408', .7, () => { ctx.rect(8.6, -29.4, 12.8, 8.8); }); PR.soft(ctx, 10, -27, 3, 1.4, '#ffe8c8', .3); // patched with what there was
      ctx.fillStyle = PR.lin(ctx, 13, -18, 25, -6, [[0, '#9a968c'], [1, '#3a3834']]); ctx.fillRect(13, -18, 12, 12); PR.mail(ctx, 13, 25, -18, -6, '#6a6660', 1.6); PR.stitch(ctx, 'rgba(20,20,20,.7)', .5, () => { ctx.rect(13, -18, 12, 12); }); // and with someone else's mail
      ctx.fillStyle = PR.lit(ctx, '#5a3e22', '#140c04', -40, 40); ctx.fillRect(-56, -7, 112, 5); ctx.fillStyle = '#b0a890'; ctx.fillRect(-3, -7.4, 6, 5.8); ctx.restore(); BP.light(ctx, F, B); // the belt
    PR.stroke(ctx, '#3a2a1a', 2, B.top); B4P.along(ctx, B, -.8, 'rgba(220,180,130,.35)', .5); // the mail bound in leather at the neck
    F.under = (ctx, F) => { const u = F.h/20; PR.dots(ctx, F, 240, 'rgba(40,26,18,.4)', .5, [5, 19, (x, y) => (Math.abs(x) < 4.6 && y > 10.4 && y < 14.2)]); // the stubble on a heavy jaw
      PR.soft(ctx, -1.6, F.cy + 1, 1.8, 1.4, '#ffe0c8', .36); PR.soft(ctx, 1.2, F.cy + 2.2, 1.6, 1.4, '#2a100a', .3); PR.stroke(ctx, 'rgba(40,16,10,.45)', .5, () => { ctx.moveTo(-.6, F.cy - .6); ctx.lineTo(.8, F.cy + 3); }); // the nose, broken on the wall
      PR.stroke(ctx, 'rgba(230,190,170,.4)', .6, () => { ctx.moveTo(F.w*.62, F.cy - 6*u); ctx.lineTo(F.w*.5, F.cy - 1*u); }); };
    PR.face(ctx, F);
    PR.strands(ctx, 26, ['#3a2a1e', '#1a120c', '#5a4434'], .7, 101, (i, r) => { const sd = i%2 ? 1 : -1, x = sd*(F.w - 1.4 + r()*1.6), y = F.cy - 8; return [x, y, x + sd*.6, y + 3, x + sd*(.4 + r()), y + 6 + r()*4]; }); // dark at the temples, going grey
    PR.strands(ctx, 6, ['#9a948a'], .6, 103, (i, r) => { const sd = i%2 ? 1 : -1, x = sd*(F.w - 1 + r()), y = F.cy - 7; return [x, y, x + sd*.4, y + 3, x + sd*.6, y + 6]; });
    B4P.helm(ctx, F, {c:['#d4d0c4', '#8a867c', '#2e2c28'], b:['#c8b890', '#6a5a3a'], r:2.4, y:6.6, h:15.4, n:11, stub:1, ridge:1}); return F; }, // the Guard helm, its plume cut off
  /* Orvas: twenty-three, the Khundryl Burned Tears; lean as a tent-pole, always half turned toward his horse, a grin. The black tears inked down both cheeks; long black hair tied back and blowing; lacquered lamellar and horsehair; his father's horse-tail standard behind him */
  orvas(ctx){ const F = {cy:-74, w:11.8, h:19.8, jaw:.76, chin:4.6, skin:'#8e5e3e', iris:'#1a1008', lip:'#6a3a2a', browCol:'#0a0604', browW:1.45, arch:1.2, browL:.5, browR:.2, rim:'#a85a3a', rimA:.24, nose:1.05, look:.5, open:1.02, smileL:.65, smileR:.95, mouthW:3.8, teeth:1};
    ctx.lineCap = 'butt'; ctx.strokeStyle = PR.lin(ctx, 31, 0, 37, 0, [[0, '#8a6440'], [.5, '#4a3220'], [1, '#140c06']]); ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(30, 4); ctx.lineTo(36, -118); ctx.stroke(); // his father's standard
    ell(ctx, 36, -119, 2.2, 2.2, PR.rad(ctx, 35.4, -119.6, .2, 2.4, [[0, '#f0d8a0'], [1, '#6a4a14']])); PR.stroke(ctx, '#c8a050', 1, () => { for (let k = 0; k < 4; k++){ ctx.moveTo(34.4, -113 + k*1.4); ctx.lineTo(37.4, -112.6 + k*1.4); } });
    PR.strands(ctx, 40, ['#2a1e16', '#120c08', '#4a3a2c', '#0a0604', '#6a5444'], 1, 105, (i, r) => { const k = r(); return [35.6, -112, 44 + k*8, -98 + k*6, 38 + k*14 + r()*4, -70 + k*10 + r()*8]; }); // the horse's tail
    BP.back(ctx, F, '#2a1e16', '#0a0604', 14, 2.2); PR.neck(ctx, F, 8.4);
    const B = BP.body(ctx, F, {wide:34, drop:4, trap:2.5, ny:F.cy + 15.4, cb:F.cy + 21, c1:'#9a4a2a', c2:'#24100a'}); ctx.save(); B.path(); ctx.clip(); B4P.lam(ctx, -36, 36, -64, 2, 4.2, 3.6, '#a84a2c', 107); // lacquered lamellar
      PR.soft(ctx, -20, -38, 12, 6, '#ffd8b0', .24); ctx.fillStyle = PR.lit(ctx, '#2a1a10', '#080402', -36, 36); ctx.fillRect(-38, -8, 76, 4.4); for (let i = 0; i < 10; i++) ell(ctx, -27 + i*6, -5.8, .8, .8, '#c8a050'); ctx.restore(); BP.light(ctx, F, B); // a black belt, brass-studded
    BP.band(ctx, B, -1, 4); ctx.fillStyle = PR.lit(ctx, '#5a1e10', '#140402', -B.nx - 3, B.nx + 3); ctx.fill(); B4P.along(ctx, B, 4, 'rgba(0,0,0,.6)', .5); PR.stitch(ctx, 'rgba(240,200,120,.55)', .4, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 2); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .55); // the collar, gold-stitched
    [-1, 1].forEach(sd => PR.strands(ctx, 34, sd < 0 ? ['#c8b898', '#8a7a5e', '#5a4a3a', '#e0d4bc'] : ['#5a4a3a', '#3a2e22', '#7a6a52'], .5, 109 + sd, (i, r) => { const x = sd*(21 + r()*9), y = -45 + r()*3; return [x, y, x + sd*(2 + r()*2), y + 5, x + sd*(3 + r()*3), y + 9 + r()*5]; })); // horsehair on the shoulders
    F.under = (ctx, F) => { const u = F.h/20; [-1, 1].forEach(sd => { const x = sd*F.w*.4; ctx.fillStyle = 'rgba(8,4,4,.9)'; ctx.beginPath(); ctx.moveTo(x - .9, F.cy + 1*u); ctx.quadraticCurveTo(x - 1.4, F.cy + 7*u, x, F.cy + 10.4*u); ctx.quadraticCurveTo(x + 1.4, F.cy + 7*u, x + .9, F.cy + 1*u); ctx.closePath(); ctx.fill(); ell(ctx, x, F.cy + 11.6*u, .8, 1, 'rgba(8,4,4,.85)'); }); // the black tears
      PR.dots(ctx, F, 30, 'rgba(10,6,4,.35)', .45, [9, 18, (x, y) => Math.abs(x) < 4.4 && y > 10.4 && y < 14]); };
    PR.face(ctx, F);
    BP.hair(ctx, F, {c:['#3a2c22', '#120c08', '#040302'], v:2.6, wx:1.4, hl:13.4, ey:1, n:70, sw:.55, s:['#2a1e16', '#0a0604', '#4a3a2c'], seed:111, sh:'#c8a890', shA:.3, part:-1, wisp:5}); // black, pulled back
    ctx.fillStyle = '#c8a050'; ctx.fillRect(-F.w - 3.2, F.cy - 5, 3, 1.6); // the tie
    ctx.lineCap = 'round'; ctx.fillStyle = PR.lin(ctx, -40, 0, -F.w, 0, [[0, '#0a0604'], [.6, '#1a120c'], [1, '#2a1e16']]); ctx.beginPath(); ctx.moveTo(-F.w - 1, F.cy - 6); ctx.bezierCurveTo(-F.w - 10, F.cy - 2, -28, F.cy + 6, -38, F.cy + 4); ctx.bezierCurveTo(-30, F.cy + 12, -20, F.cy + 10, -F.w - 1, F.cy - 2); ctx.closePath(); ctx.fill(); // the tail, blown back
    PR.strands(ctx, 24, ['#2a1e16', '#4a3a2c', '#0a0604'], .5, 113, (i, r) => { const k = r(); return [-F.w - 1, F.cy - 4, -F.w - 10 - k*8, F.cy + k*4, -30 - k*10, F.cy + 3 + r()*6]; }); return F; },
  /* Mirrel: thirty-four, Li Heng; a Denul healer, small, quick, always slightly ahead. A warm, tired face; dark hair up in a knot, bound with a strip of linen; a padded jack with the sleeves cut off at the elbow, rolled linen at her shoulder, the hospice bag with the red hand on the flap */
  mirrel(ctx){ const F = {cy:-73, w:12, h:19.2, jaw:.72, chin:4.4, skin:'#caa282', iris:'#4a3a24', lip:'#a05e4e', browCol:'#2a1810', browW:1.25, arch:1, browL:.6, browR:.3, rim:'#8fbfa0', rimA:.24, nose:.98, look:-.25, open:1, smileL:.35, smileR:.15, mouthW:3.5, bags:.6, age:.3, flush:'#c87a6a'};
    PR.neck(ctx, F, 7.8);
    const B = BP.body(ctx, F, {wide:32, drop:6, trap:1, ny:F.cy + 15.6, cb:F.cy + 20.8, c1:'#b4b098', c2:'#2e2c20'}); ctx.save(); B.path(); ctx.clip(); BP.quilt(ctx, -36, 36, -60, 4, 5.4, 'rgba(40,40,26,.5)'); // the padded jack
      [-1, 1].forEach(sd => { ctx.fillStyle = sd < 0 ? PR.lin(ctx, -34, 0, -26, 0, [[0, '#d8c8b0'], [1, '#8a7a64']]) : '#3a3428'; PR.path(ctx, [[sd*36, -24], [sd*28, -26], [sd*29, 4], [sd*37, 4]]); ctx.fill(); PR.stitch(ctx, 'rgba(60,40,20,.6)', .35, () => { ctx.moveTo(sd*28.6, -25); ctx.lineTo(sd*29.4, 4); }); }); // the sleeves cut off at the elbow, the shirt under
      B4P.strap(ctx, 20, -48, -26, -4, '#5a3e22', 3.2); PR.soft(ctx, -16, -34, 12, 7, '#ffffff', .14); ctx.restore(); BP.light(ctx, F, B);
    BP.band(ctx, B, -1, 3.6); ctx.fillStyle = PR.lit(ctx, '#9a967e', '#22201a', -B.nx - 3, B.nx + 3); ctx.fill(); B4P.along(ctx, B, 3.6, 'rgba(0,0,0,.5)', .5); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .5); // its collar
    ctx.save(); ctx.translate(-22, -8); ctx.rotate(-.06); ctx.fillStyle = PR.lin(ctx, -11, -8, 11, 8, [[0, '#a08060'], [.5, '#6a5038'], [1, '#1e140a']]); ctx.beginPath(); ctx.moveTo(-11, -7); ctx.lineTo(11, -7); ctx.lineTo(10.4, 8); ctx.quadraticCurveTo(0, 10, -10.4, 8); ctx.closePath(); ctx.fill(); // the hospice bag
      ctx.fillStyle = PR.lin(ctx, -11, -8, 11, 2, [[0, '#b89470'], [1, '#4a3420']]); ctx.beginPath(); ctx.moveTo(-11.4, -7.6); ctx.lineTo(11.4, -7.6); ctx.lineTo(9.6, 1.6); ctx.quadraticCurveTo(0, 3, -9.6, 1.6); ctx.closePath(); ctx.fill(); PR.stitch(ctx, 'rgba(240,220,180,.5)', .35, () => { ctx.moveTo(-10.4, -6.8); ctx.lineTo(-8.8, .8); ctx.quadraticCurveTo(0, 2, 8.8, .8); ctx.lineTo(10.4, -6.8); });
      ctx.fillStyle = '#c23a2a'; ctx.beginPath(); ctx.ellipse(0, -1.6, 2.6, 2.8, 0, 0, 7); ctx.fill(); [-2.2, -1, .2, 1.4].forEach((x, i) => { ctx.save(); ctx.translate(x, -3.6); ctx.rotate((i - 1.5)*.12); ctx.fillRect(-.5, -3.8 + Math.abs(i - 1.5)*.6, 1, 4); ctx.restore(); }); ctx.save(); ctx.translate(2.6, -1); ctx.rotate(.9); ctx.fillRect(-.5, -3, 1, 3); ctx.restore(); // the red hand
      PR.soft(ctx, -4, -4, 4, 2, '#ffe0d0', .2); ctx.restore();
    F.under = (ctx, F) => { PR.soft(ctx, -6, F.cy + 6, 3.4, 2.4, '#d07060', .12); }; // warm, even tired
    PR.face(ctx, F);
    BP.hair(ctx, F, {c:['#5a3c28', '#2a1810', '#0a0604'], v:2.4, wx:1.2, hl:13.2, ey:-1, n:70, sw:.5, s:['#4a3020', '#1a100a', '#6a4a34'], seed:121, sh:'#e8c8a8', shA:.28, part:0, wisp:6}); // pulled up and back
    const u = F.h/20, top = F.cy - 21*u; ell(ctx, 1, top - 4.6, 6.4, 4.8, PR.rad(ctx, -1, top - 6, .4, 6.6, [[0, '#6a4a34'], [.5, '#2a1810'], [1, '#0a0604']])); // the knot
    PR.strands(ctx, 20, ['#5a3c28', '#2a1810', '#7a5a40'], .45, 123, (i, r) => { const a = r()*6.28; return [1 + Math.cos(a)*2, top - 4.6 + Math.sin(a)*1.6, 1 + Math.cos(a + 1)*5, top - 4.6 + Math.sin(a + 1)*3.6, 1 + Math.cos(a + 2)*5.6, top - 4.6 + Math.sin(a + 2)*4]; });
    ctx.fillStyle = PR.lin(ctx, -6, 0, 8, 0, [[0, '#f4f0e4'], [1, '#8a8474']]); ctx.beginPath(); ctx.moveTo(-5.6, top - 3.4); ctx.quadraticCurveTo(1, top - 1.4, 7.4, top - 3.4); ctx.lineTo(7.2, top - 1.8); ctx.quadraticCurveTo(1, top + .2, -5.4, top - 1.8); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(6, top - 2.6); ctx.quadraticCurveTo(10, top - 1, 9.6, top + 4); ctx.lineTo(8.4, top + 4); ctx.quadraticCurveTo(8.6, top, 5.4, top - 2); ctx.fill(); // a strip of linen round it
    PR.strands(ctx, 4, ['#3a2416'], .45, 125, (i, r) => { const x = -F.w + 1.4 + i*.8, y = F.cy - 12; return [x, y, x - 1.4, y + 6, x - .6 - r(), y + 12 + i*2]; }); return F; }, // a strand loose, always
  /* Yorin: twenty-seven, Cawn; the squad's Serc mage. Thin, windburnt, always looking a little above whoever he is talking to; brown hair blown back by a wind nobody else feels; a padded jack, the sky-blue sash he has twice been told to take off, a copper wind-vane on a cord */
  yorin(ctx){ const F = {cy:-74, w:11.6, h:20.2, jaw:.66, chin:4.2, skin:'#c69e7e', iris:'#5a86b0', eyeGlow:'#9fc4e8', lip:'#8a5a4a', browCol:'#5a3a1a', browW:1.1, arch:1.5, browL:.8, browR:.5, rim:'#9fc4e8', rimA:.3, nose:1.08, look:.55, open:1.18, smileL:.4, smileR:.1, mouthW:3.6, flush:'#d0705a'};
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; { const r = PR.rng(135); for (let i = 0; i < 9; i++){ const y = -108 + r()*56, x = -36 + r()*30, l = 14 + r()*24; PR.stroke(ctx, `rgba(159,196,232,${.06 + r()*.08})`, .6 + r()*.6, () => { ctx.moveTo(x, y); ctx.bezierCurveTo(x + l*.3, y - 3, x + l*.7, y + 2, x + l, y - 2 - r()*3); }); } } ctx.restore(); // the wind he hears
    PR.neck(ctx, F, 7.6);
    const B = BP.body(ctx, F, {wide:31, drop:5, trap:1.5, nx:10.2, ny:-51.6, cb:-47, c1:'#76766c', c2:'#1c1c18'}); ctx.save(); B.path(); ctx.clip(); BP.quilt(ctx, -34, 34, -58, 4, 6, 'rgba(20,20,16,.5)'); // the padded jack, a round neck
      ctx.fillStyle = PR.lin(ctx, -30, -40, 30, 0, [[0, '#b0dcff'], [.5, '#5a96cc'], [1, '#1e3650']]); PR.path(ctx, [[-32, -40], [-20, -52], [32, -6], [32, 8]]); ctx.fill(); // the sky-blue sash
      PR.stroke(ctx, 'rgba(20,40,70,.5)', .7, () => { for (let i = 0; i < 3; i++){ ctx.moveTo(-28 + i*4, -42 - i*2.6); ctx.lineTo(30, -4 + i*2.4); } }); PR.stroke(ctx, 'rgba(255,255,255,.4)', .5, () => { ctx.moveTo(-30, -42); ctx.lineTo(-10, -26); }); ctx.restore(); BP.light(ctx, F, B, true);
    BP.band(ctx, B, -.6, 1.8); ctx.fillStyle = PR.lit(ctx, '#56564e', '#141410', -12, 12); ctx.fill(); // the jack's bound neck
    PR.stroke(ctx, '#2a2018', .6, () => { ctx.moveTo(-6, -50); ctx.quadraticCurveTo(-4, -40, 0, -35); ctx.moveTo(6, -50); ctx.quadraticCurveTo(4, -40, 0, -35); });
    ctx.save(); ctx.translate(0, -31); ctx.rotate(-.5); ctx.fillStyle = PR.lin(ctx, -6, -2, 6, 2, [[0, '#ffd0a0'], [.4, '#d08848'], [1, '#5a2a0a']]); ctx.beginPath(); ctx.moveTo(-6.4, 0); ctx.lineTo(4, -.8); ctx.lineTo(4, -2.8); ctx.lineTo(7.4, 0); ctx.lineTo(4, 2.8); ctx.lineTo(4, .8); ctx.lineTo(-6.4, 0); ctx.closePath(); ctx.fill(); PR.path(ctx, [[-6.4, 0], [-8.6, -2.6], [-7.4, 0], [-8.6, 2.6]]); ctx.fill(); ell(ctx, 0, 0, 1.2, 1.2, '#7a3a12'); ctx.restore(); // the copper wind-vane
    F.under = (ctx, F) => { PR.soft(ctx, -6, F.cy + 3, 4.4, 2.6, '#d06a50', .2); PR.soft(ctx, 6, F.cy + 3, 4.4, 2.6, '#a04a3a', .2); PR.soft(ctx, 0, F.cy + 1, 2.6, 1.6, '#d0705a', .2); }; // windburnt
    PR.face(ctx, F);
    BP.hair(ctx, F, {c:['#9a7244', '#5a3a1a', '#1a1008'], v:4.4, wx:2, hl:14.6, ey:-2, n:60, sw:.55, s:['#8a6a40', '#4a3018', '#b08a58'], seed:131, sh:'#ffe8c8', shA:.32, part:4, wisp:0}); // swept back hard
    PR.strands(ctx, 46, ['#9a7244', '#6a4a24', '#4a3018', '#b88c58'], .7, 133, (i, r) => { const x = -F.w + r()*F.w*2, y = F.cy - 21 + Math.abs(x)*.25 - r()*2; return [x, y, x + 6 + r()*6, y - 3 - r()*3, x + 12 + r()*12, y - 1 - r()*6 + Math.abs(x)*.2]; }); // blown by a wind nobody else feels
    return F; },
  /* Rasp: twenty-nine, Malaz City; a marine-trained sapper. Compact, burn-freckled; red-brown hair cropped short and singed at the ends; a leather apron over a jerkin, the satchel of Moranth munitions, the file on her belt, the marine crossbow with its cradle filed to her own pattern */
  rasp(ctx){ const F = {cy:-74, w:12.6, h:19.4, jaw:.84, chin:5, skin:'#cc9e7c', iris:'#3a5a3a', lip:'#8a4a3a', browCol:'#7a3810', browW:1.4, arch:.6, browL:.3, browR:.8, rim:'#d0864a', rimA:.24, nose:1.02, look:.25, open:.92, smileL:.55, smileR:-.1, mouthW:3.8};
    ctx.save(); ctx.translate(27, -46); ctx.rotate(.22); ctx.fillStyle = PR.lin(ctx, -3, 0, 4, 0, [[0, '#9a7048'], [.5, '#5a3e22'], [1, '#1e140a']]); ctx.fillRect(-3, -44, 6, 72); // the marine crossbow behind her shoulder
      ctx.strokeStyle = PR.lin(ctx, -22, 0, 22, 0, [[0, '#c8c4b8'], [.5, '#5a5650'], [1, '#141210']]); ctx.lineWidth = 2.8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-21, -29); ctx.bezierCurveTo(-12, -38, -4, -40.6, 0, -40.6); ctx.bezierCurveTo(4, -40.6, 12, -38, 21, -29); ctx.stroke(); ctx.lineCap = 'butt'; PR.stroke(ctx, 'rgba(230,224,210,.7)', .4, () => { ctx.moveTo(-21, -29); ctx.lineTo(0, -16); ctx.lineTo(21, -29); });
      ctx.fillStyle = '#9a9488'; ctx.fillRect(-4.6, -18, 9.2, 5); ctx.fillStyle = 'rgba(255,255,240,.55)'; ctx.fillRect(-4.6, -18, 9.2, 1.2); PR.stroke(ctx, 'rgba(40,36,30,.7)', .3, () => { for (let i = 0; i < 6; i++){ ctx.moveTo(-4 + i*1.6, -16.6); ctx.lineTo(-3.4 + i*1.6, -13.4); } }); ctx.restore(); // the cradle, filed bright to her pattern
    BP.back(ctx, F, '#8a3a18', '#2a0c04', 10, 2); PR.neck(ctx, F, 8.4);
    const B = BP.body(ctx, F, {wide:35, drop:4, trap:2.5, ny:F.cy + 15.4, cb:F.cy + 20.8, c1:'#5e4a34', c2:'#1a120a'}); ctx.save(); B.path(); ctx.clip(); // the jerkin
      PR.stroke(ctx, 'rgba(0,0,0,.35)', .8, () => { for (let i = 0; i < 4; i++){ ctx.moveTo(-30 + i*20, -44); ctx.quadraticCurveTo(-31 + i*20, -20, -30 + i*20, 4); } });
      const ap = () => { ctx.beginPath(); ctx.moveTo(-14, -36); ctx.lineTo(14, -36); ctx.quadraticCurveTo(16, -28, 22, -24); ctx.lineTo(26, 6); ctx.lineTo(-26, 6); ctx.lineTo(-22, -24); ctx.quadraticCurveTo(-16, -28, -14, -36); ctx.closePath(); };
      ap(); ctx.fillStyle = PR.lit(ctx, '#9a6c40', '#24160a', -26, 24); ctx.fill(); ctx.save(); ap(); ctx.clip(); [[-18, -4, 6, 2.6], [14, -18, 4, 2.6], [-12, -26, 3.4, 2], [10, 0, 5, 2]].forEach(([x, y, a, b], i) => { PR.soft(ctx, x, y, a, b, '#120a04', .5, i); }); PR.soft(ctx, -14, -30, 9, 10, '#ffe8c8', .14); ctx.restore(); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = .6; ap(); ctx.stroke(); // the apron, scorched
      PR.stitch(ctx, 'rgba(230,190,130,.5)', .35, () => { ctx.moveTo(-13, -34.6); ctx.lineTo(13, -34.6); });
      B4P.strap(ctx, -22, -48, 26, 2, '#4a3018', 3.4); ctx.restore(); BP.light(ctx, F, B);
    BP.band(ctx, B, -1, 4); ctx.fillStyle = PR.lit(ctx, '#6a5640', '#1a120a', -B.nx - 3, B.nx + 3); ctx.fill(); B4P.along(ctx, B, 4, 'rgba(0,0,0,.5)', .5); PR.soft(ctx, 1.4, B.cb + 1.2, F.w*.8, 3, '#0a0604', .5); // the jerkin's collar
    PR.stroke(ctx, '#3a2412', 1.6, () => { ctx.moveTo(-14, -36); ctx.quadraticCurveTo(-13, -48, -11, -56); ctx.moveTo(14, -36); ctx.quadraticCurveTo(13, -48, 11, -56); }); // the apron's straps
    ctx.save(); ctx.translate(22, -4); ctx.fillStyle = PR.lit(ctx, '#6a4a2a', '#1a1008', -9, 9); ctx.fillRect(-9, -7, 18, 13); PR.stitch(ctx, 'rgba(230,200,150,.45)', .35, () => { ctx.rect(-8.4, -6.4, 16.8, 11.8); }); // the satchel
      [[-5, -9.6, '#c8b088'], [0, -10.6, '#a89878'], [5, -9.4, '#c0a880']].forEach(([x, y, c], i) => { ell(ctx, x, y, 2.8, 3, PR.rad(ctx, x - 1, y - 1, .3, 3.2, [[0, '#f0e4c8'], [.4, c], [1, '#3a2e1e']])); ctx.fillStyle = '#7a1e14'; ctx.fillRect(x - 1, y - 3.8, 2, 1.2); }); ctx.restore(); // Moranth clay, wax-sealed
    ctx.fillStyle = PR.lin(ctx, -32, 0, -28, 0, [[0, '#d8d4c8'], [1, '#5a5850']]); ctx.save(); ctx.translate(-30, -8); ctx.rotate(-.2); ctx.fillRect(-.8, -8, 1.6, 10); PR.stroke(ctx, 'rgba(40,40,40,.6)', .25, () => { for (let i = 0; i < 8; i++){ ctx.moveTo(-.8, -7 + i*1.1); ctx.lineTo(.8, -6.4 + i*1.1); } }); ctx.fillStyle = '#5a3e22'; ctx.fillRect(-1, 2, 2, 3.4); ctx.restore(); // the file
    F.under = (ctx, F) => { PR.dots(ctx, F, 70, 'rgba(160,70,40,.42)', .55, [-4, 10]); PR.soft(ctx, F.w*.5, F.cy + 7, 2.6, 1.6, '#c06050', .2); PR.stroke(ctx, 'rgba(255,220,200,.3)', .4, () => { ctx.moveTo(F.w*.36, F.cy + 6.4); ctx.lineTo(F.w*.64, F.cy + 7.6); }); }; // burn-freckles; a burn on the jaw, healed shiny
    PR.face(ctx, F);
    BP.hair(ctx, F, {c:['#c46a32', '#7a3812', '#200c04'], v:3.4, wx:1.6, hl:13.6, ey:-2, n:60, sw:.55, s:['#d07a3a', '#6a2e0e', '#a85a24'], seed:141, sh:'#ffc890', shA:.3, part:-2, wisp:5}); // red-brown, cropped short
    PR.strands(ctx, 14, ['#2a1408', '#3a1a0a'], .5, 143, (i, r) => { const sd = i%2 ? 1 : -1, a = -1.4 + r()*1.4, x = sd*(F.w*.4 + r()*F.w*.6), y = F.cy - 20 + Math.abs(x)*.3; return [x, y, x + sd*.6, y - 1.2, x + sd*(.6 + r()), y - 2 - r()]; }); return F; }, // singed at the ends
});
