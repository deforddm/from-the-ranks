/* ============ Book Eight, Chapter 7 art: The Toll — Darujhistan the morning after, the road behind the cart, the lake shore ============ */
/* Book Eight's look (140b) on a grey day: the night slate-blue gone to ash-grey and pewter, Darujhistan's gas-blue only in the shore lamps at
   dusk, smoke going up from the Gadrobi side, and every bell tower drawn with its bell swinging. Everything that matters is at a distance:
   the cart on the road is a speck at the head of a crowd of tens of thousands drawn as a field of small dark heads; no Andii, no barrow
   sealed, no street of the night. The moon is not in this sky.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     b8_c7_guardian  a soldier in old grey kit, dust on all of it, a helm with the badge scraped off and the face in its shadow, a long
                     sword in a pale scabbard at the hip, hands loose
     b8_c7_benna     old Benna, a Daru washerwoman now: a dark shawl, a grey skirt, a basket of washing on her hip
   Backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b8_lakeshore   (140's) the shingle and the grey lake, boats drawn up, the city behind on its hill with smoke; at first light (phases
                    1-2) pewter and rose; at dusk (phase 3) slate, the blue lamps coming on along the shore
     b8_morning     (140's) the road out of the city behind the crowd: a long rise, the crowd going away up it in a dark river of heads,
                    the speck of a cart at the head of it, the city behind with its bell towers and smoke
     b8_c7_street   the Fourth's street the morning after: grey light, shutters hanging, a Fete pole with its string of masks turned by
                    the wind, a cart on its side, smoke beyond the roofs
   The chapter's gear in the series' 200×150 item style, on Book Eight's ground: night slate-blue (#2a3038 → #0a0c10), gas-blue rim light. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* the soldier at the back: old grey kit under dust, a plain helm with the badge scraped off, the face only shadow; a long sword in a pale
     scabbard at the left hip; the hands loose at the sides */
  b8_c7_guardian(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1.06);
    h.legs('#3e3e3c'); poly(ctx, [[-6.4,-6],[6.4,-6],[7,9.4],[-7,9.4]], h.armor('#6e6e6a', '#262624')); // the grey kit
    ctx.fillStyle = 'rgba(190,180,160,.16)'; for (let i = 0; i < 9; i++) ctx.fillRect(-6 + hash(i, 8701)*12, -5 + hash(i, 8702)*14, 1.2, .8); // dust
    poly(ctx, [[-7.4,-6.4],[-3,-6.4],[-4.4,11],[-8.4,11]], '#4e4c48'); // a short cloak over one shoulder, grey
    ctx.fillStyle = '#2a2826'; ctx.fillRect(-6.8, 2.6, 13.6, 1.3); ctx.fillStyle = 'rgba(120,110,96,.6)'; ctx.fillRect(1.4, -3.4, 2.2, 1.6); // the belt; the scraped place where a badge was
    B2F.line(ctx, '#bdb6a6', 1.6, [[-5.6, 3.4], [-9.4, 12.4]]); B2F.line(ctx, '#3a342c', 1.6, [[-5, 2], [-6.2, 4.4]]); // the pale scabbard, the hilt
    ctx.fillStyle = '#7a6a58'; ctx.fillRect(5.6, 2.6, 2, 2.6); ctx.fillRect(-7.6, 2.6, 2, 2.6); // the hands, loose
    h.head('#6a5e52', 4.4, -11.2);
    ctx.fillStyle = '#5a5a58'; ctx.beginPath(); ctx.arc(0, -12, 5.2, Math.PI*1.02, Math.PI*1.98); ctx.fill(); ctx.fillRect(-5.2, -12.4, 10.4, 2.6); // the helm
    ctx.fillStyle = 'rgba(8,8,10,.9)'; ctx.fillRect(-3.8, -10.4, 7.6, 4.2); // the face, in its shadow
    ctx.fillStyle = 'rgba(200,196,186,.25)'; ctx.fillRect(-5, -14.6, 2, 1); // a glint on the helm
    ctx.restore(); },
  /* old Benna: stooped, a dark shawl, grey hair under a kerchief, a grey skirt; a basket of washing on her hip */
  b8_c7_benna(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, .94); ctx.translate(0, 13); ctx.rotate(.04); ctx.translate(0, -13);
    B2F.robe(ctx, h, '#6a6660', '#2a2826', 6.4, 8.2); poly(ctx, [[-6.6,-6],[6.6,-6],[5,2],[-5,2]], '#2e2a30'); // the skirt, the shawl
    ell(ctx, 7.6, 2.4, 4.4, 3, '#8a6a42'); ctx.strokeStyle = '#5a4428'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = -1; i <= 1; i++) { ctx.moveTo(4.2, 2.4 + i*1.2); ctx.lineTo(11, 2.4 + i*1.2); } ctx.stroke(); // the basket
    ell(ctx, 7, .2, 3.4, 1.6, '#d8d2c4'); ell(ctx, 8.6, -.4, 2, 1, '#a8b4c0'); // the washing in it
    ctx.fillStyle = '#9a7a5c'; ctx.fillRect(4.4, -1, 2, 2.6); // the hand on the basket
    h.head('#a8866a', 4.2, -10.8); h.look('rgba(30,18,10,.85)', -11);
    ctx.fillStyle = '#4a4248'; ctx.beginPath(); ctx.arc(0, -12, 4.6, Math.PI*.9, Math.PI*2.1); ctx.fill(); ctx.fillStyle = 'rgba(200,196,190,.6)'; ctx.fillRect(-4, -11, 1.2, 2.4); // the kerchief, grey hair at the edge
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* a grey sky: pewter overhead going to a pale band at the horizon; dusk takes it to slate with a last bruise of rose */
function b87Sky(x, W, hz, dusk){ x.fillStyle = vgrad(x, 0, hz, dusk ? [[0,'#141a26'],[.6,'#2a3040'],[.9,'#5a4a54'],[1,'#7a6060']] : [[0,'#3a3e46'],[.55,'#6a6c72'],[.9,'#a8a098'],[1,'#c4b4a8']]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 7; i++) { x.fillStyle = dusk ? 'rgba(30,34,46,.35)' : 'rgba(80,82,90,.28)'; x.beginPath(); x.ellipse(W*(.1 + hash(i, 8711)*.8), hz*(.18 + hash(i, 8712)*.5), W*(.12 + hash(i, 8713)*.18), hz*.05, 0, 0, 7); x.fill(); } }
/* the city on its hill seen from outside or from the lake: the upper city's domes and towers grey, smoke going up from the Gadrobi side */
function b87City(x, x0, x1, base, H, seed, dusk){ const w = x1 - x0; x.fillStyle = dusk ? '#0c0e14' : '#4a4c52';
  x.beginPath(); x.moveTo(x0, base); for (let i = 0; i <= 24; i++) { const u = i/24, px = x0 + u*w, ht = H*(.04 + Math.sin(u*Math.PI)*.08 + hash(i, seed)*.03); x.lineTo(px, base - ht); x.lineTo(px + w/48, base - ht); } x.lineTo(x1, base); x.closePath(); x.fill();
  for (let i = 0; i < 5; i++) { const cx = x0 + w*(.2 + hash(i, seed + 1)*.6), r = H*(.012 + hash(i, seed + 2)*.012), top = base - H*(.11 + hash(i, seed + 3)*.04); x.beginPath(); x.arc(cx, top, r, Math.PI, 0); x.lineTo(cx + r, base); x.lineTo(cx - r, base); x.closePath(); x.fill(); } // domes
  if (dusk) for (let i = 0; i < 70; i++) { x.fillStyle = `rgba(110,180,255,${(.3 + hash(i, seed + 4)*.5).toFixed(2)})`; x.fillRect(x0 + hash(i, seed + 5)*w, base - hash(i, seed + 6)*H*.1, 1, 1); } }
/* a bell tower with its bell swinging (the moving part is the bell) */
function b87Tower(ctx, tx, base, s, t, mo, i, dusk){ ctx.fillStyle = dusk ? '#0a0c12' : '#3e4046'; ctx.fillRect(tx - 2.2*s, base - 26*s, 4.4*s, 26*s); poly(ctx, [[tx - 3.4*s, base - 26*s], [tx, base - 32*s], [tx + 3.4*s, base - 26*s]], dusk ? '#0a0c12' : '#36383e');
  ctx.fillStyle = dusk ? '#141820' : '#5a5c62'; ctx.fillRect(tx - 1.6*s, base - 24*s, 3.2*s, 4*s); // the belfry opening
  const sw = mo ? Math.sin(t/(520 + i*90) + i)*.5 : 0; ctx.save(); ctx.translate(tx, base - 24*s); ctx.rotate(sw); ell(ctx, 0, 2.4*s, 1.2*s, 1.4*s, '#a08040'); ctx.restore(); }
/* smoke going up in a slow column */
function b87Smoke(ctx, sx, sy, W, H, t, mo, a = .3){ for (let i = 0; i < 7; i++) { const k = mo ? ((t/12000 + i/7) % 1) : i/7, dx = mo ? Math.sin(t/3000 + i)*W*.015 : 0;
  ctx.fillStyle = `rgba(70,68,70,${(a*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(sx + dx + k*W*.06, sy - k*H*.42, W*.03 + k*W*.07, H*.03 + k*H*.04, 0, 0, 7); ctx.fill(); } }

/* ---------------- the backdrops ---------------- */
/* the lake shore (140's caption): grey water to a far shore lost in haze, boats drawn up on the shingle, a jetty, and behind on the right
   the city on its hill with smoke going up from the Gadrobi side; at first light pewter and rose, at dusk slate with the blue lamps coming on */
SCENEX.b8_lakeshore = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, dusk = !!(S && S.book === 'tth' && S.f && (S.f.b8_c7_ph || 1) >= 3 && S.chapter === 7);
  ctx.drawImage(sceneLayer('b87:shore' + (dusk ? 'd' : ''), W, H, (x, W, H) => {
    b87Sky(x, W, hz, dusk); b87City(x, W*.56, W*1.02, hz + H*.02, H, 8720, dusk);
    x.fillStyle = vgrad(x, hz, H*.7, dusk ? [[0,'#262c38'],[1,'#141820']] : [[0,'#8a8a8c'],[1,'#4a4e56']]); x.fillRect(0, hz, W, H*.7 - hz); // the water
    x.strokeStyle = dusk ? 'rgba(120,150,190,.18)' : 'rgba(220,210,200,.22)'; x.lineWidth = 1; for (let i = 0; i < 40; i++) { const yy = hz + H*.02 + Math.pow(hash(i, 8730), .7)*(H*.66 - hz), xx = hash(i, 8731)*W; x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx + 6 + hash(i, 8732)*20, yy); x.stroke(); } // ripples
    x.fillStyle = vgrad(x, H*.68, H, dusk ? [[0,'#2a2c30'],[1,'#121316']] : [[0,'#6a6660'],[1,'#3a3834']]); x.fillRect(0, H*.68, W, H*.32); // the shingle
    for (let i = 0; i < 160; i++) { const d = hash(i, 8740); ell(x, hash(i, 8741)*W, H*.69 + d*H*.31, 1 + d*2.4, .6 + d*1.2, dusk ? 'rgba(80,84,92,.4)' : 'rgba(150,144,134,.45)'); } // the stones
    x.fillStyle = dusk ? '#16120e' : '#3a2e22'; x.fillRect(W*.14, H*.62, W*.012, H*.1); x.fillRect(W*.06, H*.66, W*.2, H*.012); // the jetty
    [[.32, .72, 1], [.46, .75, 1.2], [.7, .73, .9]].forEach(([u, v, k]) => { const cx = W*u, cy = H*v, s = H/160*k; poly(x, [[cx - 22*s, cy - 4*s], [cx + 22*s, cy - 6*s], [cx + 16*s, cy + 3*s], [cx - 16*s, cy + 3*s]], dusk ? '#1a140e' : '#4a3a28'); x.fillStyle = dusk ? '#2a2016' : '#6a5438'; x.fillRect(cx - 21*s, cy - 5.5*s, 42*s, 1.6*s); }); // boats drawn up
  }), 0, 0, W, H);
  b87Smoke(ctx, W*.82, hz - H*.06, W, H, t, mo, dusk ? .22 : .3);
  [[.64, 1], [.74, .8], [.88, 1.1], [.95, .9]].forEach(([u, k], i) => b87Tower(ctx, W*u, hz + H*.01 - H*.06*k, H/320*k, t, mo, i, dusk));
  if (dusk) [[.08, .67], [.22, .66], [.5, .67], [.9, .66]].forEach(([u, v], i) => b81Lamp(ctx, W*u, H*v, H/380, t, mo, i));
  if (!dusk) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.2, hz, W*.4, '#e0a088', .1); ctx.globalCompositeOperation = 'source-over'; } // the light coming up over the water
  else if (typeof b84Fire === 'function') b84Fire(ctx, W*.4, H*.88, H/300, t);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.3 + i*Math.min(.06, .34/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .74, .45); };

/* the road behind the cart (140's caption): a long rise going away north; the crowd on it, hedge to hedge and over the fields either side,
   a dark river of heads thinning to dots; at the head of it, far off on the skyline, the speck of a cart and an ox and a man; behind, at
   the left edge, the city with its towers and its bells and the smoke; the Fourth at the very front of the picture, at the very back */
SCENEX.b8_morning = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4;
  ctx.drawImage(sceneLayer('b87:road', W, H, (x, W, H) => {
    b87Sky(x, W, hz, false); b87City(x, -W*.04, W*.26, hz + H*.04, H, 8750, false);
    x.fillStyle = vgrad(x, hz, H, [[0,'#5a5e48'],[1,'#2e3226']]); x.fillRect(0, hz, W, H - hz); // the fields
    poly(x, [[W*.5, hz + H*.01], [W*.53, hz + H*.01], [W*.82, H], [W*.18, H]], '#6a6450'); // the road going away
    // the crowd: heads in rows, thick near, thin to dots on the rise
    for (let i = 0; i < 900; i++) { const d = Math.pow(hash(i, 8760), 1.4), yy = hz + H*.015 + d*(H*.86 - hz), spread = W*(.04 + d*.62), cx = W*.515 + (hash(i, 8761) - .5)*spread*1.6;
      const r = .7 + d*2.6; ell(x, cx, yy, r, r*.9, hash(i, 8762) > .85 ? '#3a2e26' : hash(i, 8762) > .6 ? '#26282c' : '#1c1c20'); }
    // the cart at the head of it, a speck on the skyline: an ox, a cart, a big man at the ox's head
    { const cx = W*.515, cy = hz + H*.006, s = H/700; x.fillStyle = '#1a1814'; x.fillRect(cx - 6*s, cy - 3*s, 9*s, 3*s); ell(x, cx + 5*s, cy - 2*s, 3*s, 2*s, '#1a1814'); x.fillRect(cx + 9*s, cy - 6*s, 1.6*s, 6*s); }
    x.fillStyle = 'rgba(0,0,0,.22)'; x.fillRect(0, H*.9, W, H*.1);
  }), 0, 0, W, H);
  b87Smoke(ctx, W*.18, hz - H*.02, W, H, t, mo, .24);
  [[.04, .9], [.12, 1], [.2, .8]].forEach(([u, k], i) => b87Tower(ctx, W*u, hz + H*.04 - H*.04*k, H/360*k, t, mo, i, false));
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.36 + i*Math.min(.06, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:-1}));
  if (S && S.f && S.f.b8_c7_ph === 2 && S.f.b8_c7_road && !S.f.b8_c7_guardian) drawFigure(ctx, 'b8_c7_guardian', W*.86, H*.98, 1.8, t, {dir:-1, still:true});
  vign(ctx, W, H, .72, .45); };

/* the Fourth's street the morning after: grey light down a Gadrobi street, house fronts both sides with shutters hanging, a Fete pole with
   its string of masks turned every way by the wind, a cart on its side, masks in the gutter, smoke beyond the roofs to the south */
SCENEX.b8_c7_street = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42;
  ctx.drawImage(sceneLayer('b87:street', W, H, (x, W, H) => {
    b87Sky(x, W, hz, false);
    x.fillStyle = vgrad(x, hz, H, [[0,'#4a4a4c'],[1,'#26262a']]); x.fillRect(0, hz, W, H - hz); // the street
    for (let i = 0; i < 90; i++) { const d = hash(i, 8770), yy = hz + Math.pow(d, .7)*(H - hz), cx = W*.5 + (hash(i, 8771) - .5)*W*(.2 + d*.9); ell(x, cx, yy, 2 + d*5, 1 + d*1.8, 'rgba(110,108,104,.35)'); } // cobbles
    const front = (x0, x1, base, top, seed) => { x.fillStyle = vgrad(x, top, base, [[0,'#5a5856'],[1,'#3a3836']]); x.fillRect(x0, top, x1 - x0, base - top); x.fillStyle = '#2a2826'; x.fillRect(x0 - 2, top - 3, x1 - x0 + 4, 3);
      const n = Math.max(1, Math.round((x1 - x0)/22)); for (let i = 0; i < n; i++) { const wx = x0 + (x1 - x0)*(i + .5)/n - 4, wy = top + (base - top)*.22; x.fillStyle = '#1a1a1c'; x.fillRect(wx, wy, 8, 10);
        if (hash(i, seed) > .5) { x.save(); x.translate(wx - 3, wy); x.rotate(.5); x.fillStyle = '#4a3a2c'; x.fillRect(0, 0, 3, 10); x.restore(); } else { x.fillStyle = '#4a3a2c'; x.fillRect(wx - 3, wy, 3, 10); } x.fillStyle = '#4a3a2c'; x.fillRect(wx + 8, wy, 3, 10); } }; // shutters, some hanging
    front(-4, W*.3, H*.86, H*.18, 8780); front(W*.3, W*.4, H*.62, H*.3, 8781); front(W*.7, W + 4, H*.86, H*.2, 8782); front(W*.6, W*.7, H*.62, H*.32, 8783);
    x.fillStyle = '#2a2826'; x.fillRect(W*.47, H*.26, W*.008, H*.42); // a Fete pole
    x.strokeStyle = 'rgba(80,70,56,.7)'; x.lineWidth = 1; x.beginPath(); x.moveTo(W*.3, H*.28); x.quadraticCurveTo(W*.47, H*.36, W*.7, H*.3); x.stroke(); // its string, across the street
    for (let i = 0; i < 9; i++) { const u = (i + .5)/9, mx = W*.3 + u*W*.4, my = H*.28 + Math.sin(u*Math.PI)*H*.06; ell(x, mx, my + 4, 3, 3.6, ['#d8d0c0', '#c04a3a', '#3a5a8a', '#e0c060'][i % 4]); x.fillStyle = '#1a1816'; x.fillRect(mx - 1.6, my + 3, 1, 1); x.fillRect(mx + .6, my + 3, 1, 1); } // masks on the string, turned every way
    poly(x, [[W*.12, H*.9], [W*.26, H*.82], [W*.3, H*.88], [W*.16, H*.96]], '#3a2c1e'); ell(x, W*.27, H*.9, W*.025, W*.025, '#1a140e'); // a cart on its side
    [[.4, .9], [.55, .94], [.63, .88]].forEach(([u, v], i) => { ell(x, W*u, H*v, 4, 3, ['#d8d0c0', '#3a5a8a', '#c04a3a'][i]); x.fillStyle = '#1a1816'; x.fillRect(W*u - 2, H*v - 1, 1, 1); x.fillRect(W*u + 1, H*v - 1, 1, 1); }); // masks in the gutter
  }), 0, 0, W, H);
  b87Smoke(ctx, W*.55, H*.24, W, H, t, mo, .34);
  b81Sign(ctx, W*.8, H*.36, H/420, mo ? Math.sin(t/1700)*.06 : 0);
  if (S && S.f && !S.f.b8_c7_benlo) drawFigure(ctx, 'b8_c1_benlo', W*.66, H*.8, 1.4, t, {dir:-1, still:true});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.34 + i*Math.min(.06, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .72, .45); };

/* ---------------- the chapter's gear (200×150, Book Eight's ground: night slate-blue, gas-blue rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#2a3038"/><stop offset=".62" stop-color="#161a20"/><stop offset="1" stop-color="#0a0c10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a small brass bell off a Fete pole: a dent in its lip from the cobbles, the clapper showing, a bit of the pole's string still knotted
     through the crown */
  ART['item/b8_c7_bell'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A small brass bell">${bg('b87bl')}
<linearGradient id="b87bl-b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8c878"/><stop offset=".45" stop-color="#b08a3a"/><stop offset="1" stop-color="#5a4218"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b87bl-bg)"/><ellipse cx="100" cy="118" rx="52" ry="7" fill="url(#b87bl-sh)"/>
<path d="M92 28 Q100 20 108 28" stroke="#8a7a5a" stroke-width="2.4" fill="none"/><path d="M100 22 Q86 14 74 18 M100 22 Q118 12 132 20" stroke="#8a7a5a" stroke-width="1.4" fill="none" opacity=".8"/>
<rect x="94" y="28" width="12" height="8" rx="2" fill="#7a5a24" stroke="#2a1c08"/>
<path d="M100 36 Q72 38 70 74 Q68 96 58 104 L142 104 Q132 96 130 74 Q128 38 100 36 Z" fill="url(#b87bl-b)" stroke="#2a1c08" stroke-width="1.4"/>
<path d="M58 104 Q100 112 142 104 L142 108 Q100 116 58 108 Z" fill="#8a6a2a" stroke="#2a1c08" stroke-width="1.2"/>
<path d="M120 105 Q126 100 132 106" stroke="#3a2a10" stroke-width="2" fill="none"/>
<ellipse cx="100" cy="112" rx="6" ry="5" fill="#4a3614" stroke="#1a1004"/>
<path d="M80 50 Q78 70 76 90" stroke="#fff4d0" stroke-width="2.2" fill="none" opacity=".45"/>
<path d="M60 104 Q100 110 140 104" stroke="#8ab8ff" stroke-width=".8" fill="none" opacity=".35"/>
<ellipse cx="100" cy="72" rx="56" ry="34" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c7_bell'] = [200, 150];
  /* a dyer's mourning band: a strip of black-dyed cloth, knotted into a loop the size of an arm, the dye uneven, a blue thread at the edge
     where the vat was last used for blue */
  ART['item/b8_c7_mourningband'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A dyer's mourning band">${bg('b87mb')}
<linearGradient id="b87mb-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a42"/><stop offset=".6" stop-color="#1a1a20"/><stop offset="1" stop-color="#08080a"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b87mb-bg)"/><ellipse cx="100" cy="114" rx="66" ry="8" fill="url(#b87mb-sh)"/>
<ellipse cx="100" cy="76" rx="56" ry="30" fill="none" stroke="url(#b87mb-c)" stroke-width="18"/>
<ellipse cx="100" cy="76" rx="56" ry="30" fill="none" stroke="#000" stroke-width="1" opacity=".5"/>
<path d="M54 64 Q100 40 146 64" stroke="#5a5a66" stroke-width="1.2" fill="none" opacity=".5"/>
<path d="M150 84 Q166 92 170 108 M150 84 Q158 100 154 118" stroke="#1a1a20" stroke-width="7" fill="none" stroke-linecap="round"/>
<circle cx="150" cy="84" r="7" fill="#22222a" stroke="#000"/>
<path d="M48 82 Q100 112 152 82" stroke="#3a5a9a" stroke-width="1.2" fill="none" opacity=".7"/>
<g fill="#2a2a32" opacity=".7"><circle cx="72" cy="60" r="2.2"/><circle cx="118" cy="56" r="1.6"/><circle cx="96" cy="100" r="2"/></g>
<path d="M46 76 Q48 96 70 102" stroke="#8ab8ff" stroke-width=".8" fill="none" opacity=".35"/>
<ellipse cx="100" cy="76" rx="60" ry="34" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c7_mourningband'] = [200, 150];
}
