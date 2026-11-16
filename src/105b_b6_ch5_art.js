/* ============ Book Six, Chapter 5 art: The Kokakal Shore — Nok's transports at anchor, the boats, the army waiting to leave (105b) ============ */
/* No new figures this chapter (the brief): the deserters and looters use the engine's b6_ kinds, and the shore uses the shelf.
   One backdrop (SCENEX.b6_kokakal, replacing 100's borrowed b4_c1_quay): looking north over the Kokakal shore at a smoke-red dusk,
   the sun down behind the Odhan on the left. Nok's fleet at anchor out to the horizon (a far row of tiny hulls and masts, a nearer
   row with sails furled on the yards); the longboats going out and coming back; boats run up on the sand with the army's crates
   stacked by them and a file carrying; the Fourteenth's grey-green tents on the dunes to the right, cook-smoke going up; Wickan
   horse lines on the left, the riders standing about with nothing to say; and far off on the dune-crest a thin file walking in out
   of the desert. The still parts in sceneLayer; boats, surf, gulls, smoke, the carrying file and the walkers move unless REDUCE().
   And the chapter's gear (ART['item/<key>']): b6_c5_fingerbone, b6_c5_nokrope, on the Third's ground (dusk-umber with the same thin
   bone rim as the Fourth's chapters: Claude's call). */

/* ---------------- the backdrop ---------------- */
/* a small figure far off, in silhouette: a soldier walking, a crate on the shoulder if loaded */
function b65Tiny(ctx, px, py, s, col, load, step){ ctx.fillStyle = col; const lg = step || 0;
  ctx.fillRect(px - 1.6*s, py - 9*s, 3.2*s, 6*s); ell(ctx, px, py - 10.6*s, 1.6*s, 1.6*s, col); // body, head
  ctx.fillRect(px - 1.5*s, py - 3*s, 1.2*s, 3*s + lg*s); ctx.fillRect(px + .3*s, py - 3*s, 1.2*s, 3*s - lg*s); // legs
  if (load) { ctx.fillStyle = '#6a5034'; ctx.fillRect(px - 2.6*s, py - 14.4*s, 4.6*s, 3.4*s); ctx.fillStyle = 'rgba(255,230,190,.25)'; ctx.fillRect(px - 2.6*s, py - 14.4*s, 4.6*s, .6*s); } }
/* a ship's boat, low in the water: its hull, the rowers' heads, oars flicking */
function b65Boat(ctx, cx, cy, s, t, mo, i, beached){ ctx.fillStyle = '#2a1e16'; ctx.beginPath(); ctx.moveTo(cx - 12*s, cy - 2*s); ctx.quadraticCurveTo(cx - 9*s, cy + 2.4*s, cx, cy + 2.4*s); ctx.quadraticCurveTo(cx + 10*s, cy + 2.4*s, cx + 13*s, cy - 3*s); ctx.lineTo(cx - 12*s, cy - 2*s); ctx.fill();
  ctx.fillStyle = 'rgba(255,220,180,.22)'; ctx.fillRect(cx - 11*s, cy - 2.2*s, 23*s, .6*s); // the gunwale catching the light
  if (beached) { ctx.fillStyle = '#4a3624'; for (let k = 0; k < 4; k++) ctx.fillRect(cx - 9*s + k*.6*s, cy - 3*s - k*.5*s, 16*s, .6*s); return; } // oars shipped and stacked
  ctx.fillStyle = '#141012'; for (let k = 0; k < 5; k++) { ctx.fillRect(cx - 8*s + k*3.6*s, cy - 5*s, 1.8*s, 3*s); ell(ctx, cx - 7.1*s + k*3.6*s, cy - 5.8*s, 1*s, 1*s, '#141012'); } // rowers, and a crate or two between them
  const f = mo ? Math.sin(t/320 + i*2) : 0; ctx.strokeStyle = '#1e1612'; ctx.lineWidth = Math.max(.6, .5*s); ctx.beginPath(); for (let k = 0; k < 5; k++) { const ox = cx - 7*s + k*3.6*s; ctx.moveTo(ox, cy - 2*s); ctx.lineTo(ox - (3 + f*2)*s, cy + 2.6*s); } ctx.stroke();
  if (mo) { ctx.fillStyle = 'rgba(230,226,214,.35)'; for (let k = 0; k < 5; k++) ctx.fillRect(cx - 10*s + k*3.6*s - f*2*s, cy + 2.6*s, 1.6*s, .5); } } // the splash of the blades
SCENEX.b6_kokakal = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.34, wl = H*.6;
  ctx.drawImage(sceneLayer('b65:shore', W, H, (x, W, H) => {
    /* a smoke-red dusk; the sun down behind the Odhan on the left */
    x.fillStyle = vgrad(x, 0, hz, [[0,'#2a2228'],[.45,'#5a3e3c'],[.82,'#a46c50'],[1,'#d09468']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.06, hz, W*.44, '#ffb070', .4);
    for (let i = 0; i < 8; i++) ell(x, hash(i, 6501)*W, hz*(.12 + hash(i, 6502)*.6), W*(.1 + hash(i, 6503)*.16), hz*(.025 + hash(i, 6504)*.03), `rgba(54,36,40,${(.22 + hash(i, 6505)*.2).toFixed(2)})`); // bands of cloud
    /* the sea: grey, going green-dark toward the shore, the sun's track on it */
    x.fillStyle = vgrad(x, hz, wl, [[0,'#8a7a70'],[.18,'#5e625e'],[.6,'#424c4a'],[1,'#2e3836']]); x.fillRect(0, hz, W, wl - hz + 1);
    for (let i = 0; i < 46; i++) { const y = hz + Math.pow(hash(i, 6506), 1.6)*(wl - hz), k = (y - hz)/(wl - hz), sx = hash(i, 6507)*W, near = 1 - Math.min(1, sx/(W*.5)); x.fillStyle = `rgba(255,${190 + (near*40 | 0)},150,${(.05 + near*.22*(1 - k*.6)).toFixed(3)})`; x.fillRect(sx, y, 6 + k*22, .8 + k*.6); } // glints, gold toward the sun
    /* Nok's fleet: a far row out to the horizon, tiny, and a nearer row with the sails furled on the yards */
    for (let i = 0; i < 52; i++) { const cx = W*(.01 + hash(i, 6508)*.98), cy = hz + H*(.004 + hash(i, 6509)*.022), s = .12 + hash(i, 6510)*.1 + (cy - hz)/H*2.4; b7Ship(x, cx, cy, s, `rgba(${40 + (hash(i, 6511)*20 | 0)},${32 + (hash(i, 6511)*14 | 0)},36,${(.6 + (cy - hz)/H*8).toFixed(2)})`, null, false); }
    [[.16, .07, .62], [.34, .1, .86], [.55, .065, .7], [.72, .11, 1], [.9, .075, .66], [.46, .13, .5]].forEach(([u, v, s]) => { const cx = W*u, wy = hz + H*v;
      x.save(); x.globalAlpha = .18; x.translate(0, wy*2 + 1.5); x.scale(1, -1); b7Ship(x, cx, wy, s, '#1a2224', null, false); x.restore(); // its reflection
      b7Ship(x, cx, wy, s, '#2a2220', '#c8b89c', false); x.fillStyle = 'rgba(255,214,170,.32)'; x.fillRect(cx - 18*s, wy - 3.2*s, 14*s, .7*s); }); // the hull, the furled sail, the light along the wale
    /* the far headland on the right, low, and the shore line */
    x.fillStyle = '#4a3a34'; x.beginPath(); x.moveTo(W*.78, hz + 1); x.quadraticCurveTo(W*.9, hz - H*.035, W, hz - H*.02); x.lineTo(W, hz + 2); x.fill();
    /* the beach: wet and dark at the water, bone-pale sand up to the dunes */
    x.fillStyle = vgrad(x, wl, H, [[0,'#5e5040'],[.08,'#7a6a52'],[.2,'#b49c78'],[1,'#7e6648']]); x.fillRect(0, wl, W, H - wl);
    x.fillStyle = 'rgba(255,240,210,.18)'; x.fillRect(0, wl + H*.03, W, 1);
    for (let i = 0; i < 90; i++) { const y = wl + H*.05 + Math.pow(hash(i, 6512), 1.2)*(H - wl - H*.05), k = (y - wl)/(H - wl); x.fillStyle = `rgba(${hash(i, 6513) > .5 ? '60,44,30' : '240,226,196'},${(.06 + k*.08).toFixed(3)})`; x.fillRect(hash(i, 6514)*W, y, 2 + k*8, 1); } // ripples in the sand
    /* dunes on the right, the Fourteenth's tents in rows on them; scrub on the left where the horses are */
    x.fillStyle = '#9a8264'; x.beginPath(); x.moveTo(W*.56, wl + H*.08); x.quadraticCurveTo(W*.7, wl - H*.06, W*.84, wl - H*.05); x.quadraticCurveTo(W*.94, wl - H*.06, W, wl - H*.02); x.lineTo(W, wl + H*.16); x.fill();
    x.fillStyle = 'rgba(40,28,20,.25)'; x.beginPath(); x.moveTo(W*.7, wl - H*.01); x.quadraticCurveTo(W*.86, wl + H*.02, W, wl + H*.06); x.lineTo(W, wl + H*.16); x.lineTo(W*.62, wl + H*.1); x.fill(); // the dunes' shade side
    for (let r = 0; r < 3; r++) for (let i = 0; i < 7; i++) { const tx = W*(.68 + i*.052 + (r % 2)*.026), ty = wl - H*.035 + r*H*.04, s = 1.3 + r*.4; if (tx > W*1.02) continue;
      x.fillStyle = r === 1 ? '#7e7c62' : '#8a866a'; x.beginPath(); x.moveTo(tx - 5*s, ty); x.lineTo(tx, ty - 5*s); x.lineTo(tx + 5*s, ty); x.fill(); x.fillStyle = 'rgba(20,18,14,.45)'; x.beginPath(); x.moveTo(tx, ty - 5*s); x.lineTo(tx + 5*s, ty); x.lineTo(tx + 1*s, ty); x.fill(); } // grey-green canvas, lit from the west
    x.fillStyle = '#8a7656'; x.beginPath(); x.moveTo(0, wl + H*.04); x.quadraticCurveTo(W*.1, wl - H*.03, W*.26, wl + H*.01); x.lineTo(W*.28, wl + H*.06); x.lineTo(0, wl + H*.08); x.fill();
    for (let i = 0; i < 26; i++) { const sx = hash(i, 6515)*W*.3, sy = wl + H*(.0 + hash(i, 6516)*.06); ell(x, sx, sy, 2 + hash(i, 6517)*3, 1.2 + hash(i, 6517)*1.4, '#4a4630'); } // scrub
    x.strokeStyle = '#3a2a1c'; x.lineWidth = 1; x.beginPath(); x.moveTo(W*.02, wl + H*.035); x.lineTo(W*.25, wl + H*.03); x.stroke(); for (let i = 0; i < 8; i++) x.fillRect(W*(.02 + i*.033), wl + H*.02, 1, H*.02); // a picket line
    /* boats run up on the sand, the army's crates and barrels stacked by them */
    [[.3, .045, 1], [.44, .05, 1.15], [.56, .04, .95]].forEach(([u, v, s], i) => { ell(x, W*u, wl + H*v + 2.5*s, 13*s, 1.6*s, 'rgba(0,0,0,.35)'); b65Boat(x, W*u, wl + H*v, s, 0, 0, i, true); });
    const crate = (cx, cy, s) => { x.fillStyle = '#5a4430'; x.fillRect(cx, cy - 5*s, 6*s, 5*s); x.fillStyle = 'rgba(255,230,190,.22)'; x.fillRect(cx, cy - 5*s, 6*s, .8*s); x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = .6; x.strokeRect(cx + .3, cy - 5*s + .3, 6*s - .6, 5*s - .6); };
    [[.37, .13, 1.3], [.375, .1, 1.3], [.4, .13, 1.3], [.385, .07, 1.3], [.5, .14, 1.2], [.52, .14, 1.2], [.51, .11, 1.2]].forEach(([u, v, s]) => crate(W*u, wl + H*v, s));
    [[.42, .145], [.435, .15], [.62, .13]].forEach(([u, v]) => { ell(x, W*u, wl + H*v - 3.4, 2.6, 3.6, '#4a3424'); x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(W*u - 2.6, wl + H*v - 4.6, 5.2, .7); x.fillRect(W*u - 2.6, wl + H*v - 2.2, 5.2, .7); }); // barrels, hooped
    /* an officer's standard planted by the crates: the Fourteenth's, a plain grey square in this light */
    x.fillStyle = '#2a2018'; x.fillRect(W*.47, wl + H*.02, 1.2, H*.12); x.fillStyle = '#6a6e66'; x.fillRect(W*.47 + 1.2, wl + H*.02, W*.026, H*.034); x.fillStyle = 'rgba(255,230,190,.2)'; x.fillRect(W*.47 + 1.2, wl + H*.02, W*.026, 1);
  }), 0, 0, W, H);
  /* the surf: three lines of foam sliding up the sand and back */
  for (let k = 0; k < 3; k++) { const ph = mo ? (t/2600 + k/3) % 1 : k/3, y = wl - H*.004 + Math.sin(ph*Math.PI)*H*.022 + k*H*.006, a = .45*(1 - ph*.6); ctx.strokeStyle = `rgba(232,228,216,${a.toFixed(2)})`; ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.moveTo(0, y); for (let i = 0; i <= 24; i++) ctx.lineTo(W*i/24, y + Math.sin(i*1.7 + k*2 + (mo ? t/1800 : 0))*1.2); ctx.stroke(); }
  /* the longboats: out loaded to the ships, back empty, small and smaller with distance */
  for (let i = 0; i < 4; i++) { const k = mo ? (t/52000 + i/4) % 1 : (i/4 + .1), out = k < .5, v = out ? k/.5 : 1 - (k - .5)/.5, x0 = W*(.3 + i*.08), x1 = W*([.34, .55, .72, .46][i]), px = lerp(x0, x1, v), py = lerp(wl - H*.02, hz + H*([.1, .065, .11, .13][i]) + H*.012, v), s = lerp(1.05, .42, v);
    b65Boat(ctx, px, py, s, t, mo, i, false); }
  /* the carrying file: from the crates down to the nearest boat and back for more */
  for (let i = 0; i < 9; i++) { const k = mo ? (t/16000 + i/9) % 1 : i/9, back = k >= .5, v = back ? (k - .5)/.5 : k/.5, px = back ? lerp(W*.445, W*.385, v) : lerp(W*.39, W*.445, v), py = wl + H*(back ? .1 : .12) - (back ? 0 : v*H*.04), st = mo ? Math.sin(t/160 + i*1.3)*.7 : 0;
    b65Tiny(ctx, px, py, 1.15, '#2a2420', !back, st); }
  /* the Wickan horse lines on the left: horses on the picket, riders standing about, saying nothing */
  [[.05, 1, '#3a2c20'], [.09, 1, '#6a5a48'], [.13, 1, '#2a2018'], [.17, 1, '#5a4630'], [.21, 1, '#4a3a2a']].forEach(([u, s, c], i) => b41Horse(ctx, W*u, wl + H*.05, 1.05*s, c, false, mo ? Math.sin(t/900 + i*1.9)*.4 : 0));
  [[.075, 1.05], [.155, 1.0], [.24, 1.1]].forEach(([u, s], i) => drawFigure(ctx, 'wickan', W*u, wl + H*.12, s, t, {phase:i + 3, dir:i === 2 ? -1 : 1, still:!mo, alpha:.92}));
  /* far off on the dune-crest, a thin file walking in out of the desert */
  for (let i = 0; i < 12; i++) { const k = mo ? (t/90000 + i/12) % 1 : i/12, px = lerp(W*1.02, W*.8, k), py = wl - H*.055 + Math.sin(k*3)*H*.006 + k*H*.012, st = mo ? Math.sin(t/220 + i)*.5 : 0;
    b65Tiny(ctx, px, py, .42, 'rgba(60,46,38,.85)', false, st); }
  /* cook-smoke going up off the tent lines and leaning inland on the sea wind */
  [[.7, .02, 1], [.82, .01, 2], [.94, .03, 3]].forEach(([u, v, sd]) => b2Smoke(ctx, t*mo, W*u, wl - H*v, H*.22, H*.018, '#5a4a48', .16, 6520 + sd, -1));
  /* gulls over the boats */
  b2Wheel(ctx, t*mo, W*.48, hz - H*.06, W*.22, H*.05, 7, .6, 'rgba(236,230,220,.85)', 6530);
  /* the squad on the sand in front, watching the boats */
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.08 + i*17, H*.95, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .46, .5); };

/* ---------------- v13.33 (pictures against text): Book Two's Odhan replaced, and the 'sail' end page ----------------
   b6_c5_road: the Sotka road by day, scrub and stone toward the coast, the column halted along it, the company's tents and carts at the road's
   edge, and the smoke haze of Y'Ghatan still low in the west behind. b6_c5_dusk: a roofless square of mud-brick walls off the road, older than the
   Empire, a gap where the gate was, a thin smoke from inside and two heads flat on the wall (gone, and the fire ash, once it is over).
   b6_c5_village: a dry village off the road by day, its one street of low flat-roofed houses, every door shut with a white ring chalked on it at
   face height, the well in the street with its bucket on the wall, one door at the top standing open (shut again after). The chapter's end on
   the 'sail' key: from the transport at anchor, the Third at its rail and the beach crowded behind at dusk */
function b65Sky(x, W, H, hz, dusk){ x.fillStyle = vgrad(x, 0, hz, dusk ? [[0,'#2a2230'],[.5,'#6a4440'],[.85,'#c47a50'],[1,'#e09a62']] : [[0,'#6a86a4'],[.6,'#b0bcc0'],[1,'#e2d4b8']]); x.fillRect(0, 0, W, hz + 2);
  if (dusk) glow(x, W*.08, hz, W*.36, '#ffb070', .4); else { glow(x, W*.84, H*.08, W*.25, '#fffaee', .35); x.fillStyle = 'rgba(120,100,90,.18)'; x.beginPath(); x.ellipse(W*.06, hz - 8, W*.3, 12, 0, 0, 7); x.fill(); } } // dusk, or day with Y'Ghatan's smoke low in the west
function b65Ground(x, W, H, hz, dusk){ x.fillStyle = vgrad(x, hz, H, dusk ? [[0,'#6a5038'],[1,'#2a1e14']] : [[0,'#b49c78'],[.5,'#9a8260'],[1,'#6a5640']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 60; i++) { const yy = hz + 2 + Math.pow(hash(i, 6541), 1.4)*(H - hz), d = (yy - hz)/(H - hz); b61Bush(x, hash(i, 6542)*W, yy, .2 + d*1.2, dusk ? `rgba(${30 - Math.round(d*14)},${24 - Math.round(d*10)},${18 - Math.round(d*8)},.85)` : `rgba(${100 - Math.round(d*40)},${96 - Math.round(d*40)},${80 - Math.round(d*34)},.8)`); }
  for (let i = 0; i < 12; i++) { const yy = hz + 4 + Math.pow(hash(i, 6543), 1.2)*(H - hz)*.8, d = (yy - hz)/(H - hz), r = 2 + d*8; ell(x, hash(i, 6544)*W, yy, r, r*.5, dusk ? 'rgba(70,56,44,.8)' : 'rgba(150,136,116,.9)'); } } // stones
SCENEX.b6_c5_road = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46;
  const rd = k => [lerp(W*.06, W*.92, k), lerp(H*.82, hz + H*.01, Math.pow(k, .7))];
  ctx.drawImage(sceneLayer('b65:road', W, H, (x, W, H) => { b65Sky(x, W, H, hz, false); b65Ground(x, W, H, hz, false);
    { const L = [], R = []; for (let i = 0; i <= 24; i++) { const k = i/24, [px, py] = rd(k), w = lerp(14, 1.5, k); L.push([px, py - w]); R.push([px, py + w]); } poly(x, L.concat(R.reverse()), 'rgba(220,200,160,.55)'); } // the road, east to the coast
    for (let i = 0; i < 6; i++) { const tx = W*(.12 + i*.07), ty = H*.66 - i*H*.012, s = 1.4 - i*.08; x.fillStyle = '#7a7660'; x.beginPath(); x.moveTo(tx - 9*s, ty); x.lineTo(tx - 1*s, ty - 8*s); x.lineTo(tx + 8*s, ty); x.fill(); x.fillStyle = 'rgba(30,26,20,.35)'; x.beginPath(); x.moveTo(tx - 1*s, ty - 8*s); x.lineTo(tx + 8*s, ty); x.lineTo(tx + 1*s, ty); x.fill(); } // the company's tents at the road's edge
    for (let i = 0; i < 4; i++) { const cx = W*(.54 + i*.07), cy = H*.72 - i*H*.02, s = 1.2 - i*.12; x.fillStyle = '#4a3a28'; x.fillRect(cx - 8*s, cy - 7*s, 16*s, 5*s); ell(x, cx - 5*s, cy - 1.6*s, 2.2*s, 2.2*s, '#2a2018'); ell(x, cx + 5*s, cy - 1.6*s, 2.2*s, 2.2*s, '#2a2018'); x.fillStyle = '#6a6250'; x.beginPath(); x.ellipse(cx, cy - 7*s, 7*s, 3*s, 0, Math.PI, 0); x.fill(); } // the carts, covered
  }), 0, 0, W, H);
  for (let i = 0; i < 34; i++) { const k = .22 + i/34*.76, [px, py] = rd(k), s = lerp(1.1, .3, k); b65Tiny(ctx, px + (i % 2 ? 3 : -3)*s, py + 2*s, s, '#3a3226', false, 0); } // the column halted along it
  for (let i = 0; i < 3; i++) { const k = ((t*mo/30000 + i/3) % 1); glow(ctx, lerp(W*.9, W*1.1, k), hz - H*.02, W*.1, '#c8d4d8', .1*Math.sin(k*Math.PI) + (mo ? 0 : .04)); } // the sea air, coming up from the coast
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.08 + i*Math.min(24, W*.36/sq.length), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .4, .5); };
SCENEX.b6_c5_dusk = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, done = !!f.b6_c5_desDone, hz = H*.5, x0 = W*.42, x1 = W*.84, top = H*.38, foot = H*.66;
  ctx.drawImage(sceneLayer('b65:waystation' + (done ? ':d' : ''), W, H, (x, W, H) => { b65Sky(x, W, H, hz, true); b65Ground(x, W, H, hz, true);
    x.fillStyle = 'rgba(150,120,90,.4)'; x.beginPath(); x.moveTo(-2, H*.94); x.quadraticCurveTo(W*.3, H*.74, W*.36, hz + 1); x.lineTo(W*.4, hz + 1); x.quadraticCurveTo(W*.36, H*.8, W*.22, H + 2); x.lineTo(-2, H + 2); x.fill(); // the road, going on west past it
    // the way-station: a square of mud-brick walls, roofless, its far wall showing over the near, worn ragged along the top, a gap where the gate was
    x.fillStyle = '#4a3428'; x.fillRect(x0 + W*.03, top - H*.03, x1 - x0 - W*.06, H*.05); // the far wall, over the near
    x.fillStyle = vgrad(x, top, foot, [[0,'#8a6448'],[1,'#5a4030']]); x.beginPath(); x.moveTo(x0, foot); x.lineTo(x0, top); for (let px = x0; px <= x1; px += 6) x.lineTo(px, top - (hash(Math.round(px), 6551) > .7 ? H*.012 : 0) + Math.sin(px*.13)*1.2); x.lineTo(x1, foot); x.closePath(); x.fill();
    x.fillStyle = 'rgba(255,170,110,.22)'; x.fillRect(x0, top, W*.012, foot - top); // the west corner catching the last light
    x.fillStyle = '#1a120c'; x.fillRect(x0 + (x1 - x0)*.4, top + H*.1, (x1 - x0)*.12, foot - top - H*.1); // the gap where the gate was
    x.strokeStyle = 'rgba(40,26,18,.35)'; x.lineWidth = .6; x.beginPath(); for (let y = top + 5; y < foot; y += 5) { x.moveTo(x0, y); x.lineTo(x1, y); } x.stroke(); // the courses
    x.fillStyle = 'rgba(40,26,18,.6)'; [[.15, .3], [.7, .5], [.86, .2]].forEach(([u, v]) => x.fillRect(x0 + (x1 - x0)*u, top + (foot - top)*v, W*.02, H*.03)); // holes where the brick has gone
  }), 0, 0, W, H);
  if (!done) { b2Smoke(ctx, t*mo, x0 + (x1 - x0)*.55, top + H*.02, H*.34, H*.03, '#b0a090', .4, 6552, -1); // a thin smoke from inside
    [[.22], [.78]].forEach(([u]) => { const px = x0 + (x1 - x0)*u, py = top - 1; ell(ctx, px, py - 2.4, 3.2, 2.8, '#1a120e'); ctx.fillStyle = '#1a120e'; ctx.fillRect(px - 9, py - 1.8, 18, 2.2); }); } // two heads flat on the wall, and their bows
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.06 + i*Math.min(24, W*.34/sq.length), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };
SCENEX.b6_c5_village = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, done = !!f.b6_c5_villageDone, hz = H*.46;
  ctx.drawImage(sceneLayer('b65:village' + (done ? ':d' : ''), W, H, (x, W, H) => { b65Sky(x, W, H, hz, false); b65Ground(x, W, H, hz, false);
    x.fillStyle = 'rgba(200,180,140,.55)'; x.beginPath(); x.moveTo(W*.3, H); x.lineTo(W*.49, hz + H*.06); x.lineTo(W*.55, hz + H*.06); x.lineTo(W*.82, H); x.fill(); // the one street, dry
    const c = '#a08a68', cd = '#6e5c44';
    const shut = (hx, by, w, h, open) => { const dx = hx + w*.38, dw = w*.2, dh = h*.56; x.fillStyle = open ? '#0a0806' : '#5a3e26'; x.fillRect(dx, by - dh, dw, dh); if (!open) { x.fillStyle = 'rgba(0,0,0,.3)'; x.fillRect(dx + dw*.48, by - dh, .8, dh); x.strokeStyle = 'rgba(240,236,224,.9)'; x.lineWidth = Math.max(.7, w*.012); x.beginPath(); x.arc(dx + dw/2, by - dh*.72, Math.max(1.2, dw*.24), 0, 7); x.stroke(); } }; // a door, shut, the chalk ring on it
    const L = [[.02, .2, .26], [.2, .13, .17], [.31, .08, .1], [.4, .05, .06]], R = [[.6, .05, .06], [.66, .08, .1], [.76, .12, .17], [.86, .16, .26]];
    L.forEach(([u, w, hh], i) => { const by = lerp(H*.96, hz + H*.07, i/3.6); b62House(x, W*u, by, W*w, H*hh, c, cd, 0, i < 2 ? .14 : 0); shut(W*u, by, W*w, H*hh, !done && i === 3); });
    R.forEach(([u, w, hh], i) => { const by = lerp(hz + H*.07, H*.94, i/3.4); b62House(x, W*u, by, W*w, H*hh, shade(c, -.06), cd, 0, i > 1 ? .66 : 0); shut(W*u, by, W*w, H*hh, !done && i === 0); });
    // the well in the middle of the street, its stone lip, the bucket on the wall
    const wx = W*.54, wy = H*.74; ell(x, wx, wy + 2, W*.05, H*.018, 'rgba(60,44,30,.35)'); x.fillStyle = '#8a7a62'; x.fillRect(wx - W*.035, wy - H*.05, W*.07, H*.05); ell(x, wx, wy - H*.05, W*.035, H*.012, '#a8987c'); ell(x, wx, wy - H*.05, W*.025, H*.007, '#1a120c');
    x.fillStyle = '#5a4028'; x.fillRect(wx + W*.02, wy - H*.075, W*.012, H*.024); x.strokeStyle = '#6a5a40'; x.lineWidth = .6; x.beginPath(); x.moveTo(wx + W*.026, wy - H*.075); x.quadraticCurveTo(wx, wy - H*.09, wx - W*.01, wy - H*.05); x.stroke(); // the bucket on its rope
  }), 0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.06 + i*Math.min(24, W*.32/sq.length), H*.985 - (i % 2)*3, 1.6, t, {phase:i}));
  vign(ctx, W, H, .4, .5); };
/* the end on 'sail': the transport at anchor off the shore at dusk, the Third at its rail, the beach crowded behind */
{ const _kk = SCENEX.b6_kokakal; SCENEX.b6_kokakal = (cv, t) => { if (!(S && S.scene === 'chend' && S.chapter === 5 && ((S.chapters && S.chapters[5]) || (S.f && S.f.b6_c5_key)) === 'sail')) return _kk(cv, t);
  const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.34, sh = H*.56, deck = H*.84;
  ctx.drawImage(sceneLayer('b65:sail', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#2a2228'],[.45,'#5a3e3c'],[.82,'#a46c50'],[1,'#d09468']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.9, hz, W*.4, '#ffb070', .4); // the sun down behind the Odhan, now on the right: we look back at the shore
    x.fillStyle = '#5a4436'; x.beginPath(); x.moveTo(0, hz + 2); for (let i = 0; i <= 20; i++) x.lineTo(W*i/20, hz - H*(.01 + .015*Math.sin(i*1.3))); x.lineTo(W, hz + 2); x.fill(); // the Odhan's low line
    x.fillStyle = vgrad(x, hz, sh, [[0,'#9a8064'],[1,'#c0a47c']]); x.fillRect(0, hz, W, sh - hz); // the dunes and the beach
    for (let r = 0; r < 3; r++) for (let i = 0; i < 18; i++) { const tx = W*(.02 + i*.056 + (r % 2)*.028), ty = hz + H*(.03 + r*.025), s = .8 + r*.2; x.fillStyle = '#7e7c62'; x.beginPath(); x.moveTo(tx - 5*s, ty); x.lineTo(tx, ty - 5*s); x.lineTo(tx + 5*s, ty); x.fill(); } // the tents on the dunes
    x.fillStyle = vgrad(x, sh, deck, [[0,'#4a5654'],[1,'#26302e']]); x.fillRect(0, sh, W, deck - sh); x.fillStyle = 'rgba(232,228,216,.4)'; x.fillRect(0, sh, W, 1.2); // the water between, and the surf line
    for (let i = 0; i < 30; i++) { x.fillStyle = `rgba(255,200,150,${(.06 + hash(i, 6561)*.1).toFixed(2)})`; x.fillRect(hash(i, 6562)*W, sh + 3 + hash(i, 6563)*(deck - sh - 6), 4 + hash(i, 6564)*12, 1); }
    [[.12, .62], [.86, .6]].forEach(([u, v]) => b7Ship(x, W*u, H*v, .55, '#2a2220', '#c8b89c', false)); // other transports at anchor
  }), 0, 0, W, H);
  for (let i = 0; i < 140; i++) { const px = hash(i, 6565)*W, py = sh - H*(.005 + hash(i, 6566)*.07), s = .38 + (py - hz)/H*.9; b65Tiny(ctx, px, py, s, 'rgba(40,32,26,.9)', false, 0); } // the beach crowded with an army
  ctx.fillStyle = vgrad(ctx, deck, H, [[0,'#4a3e30'],[1,'#2a2218']]); ctx.fillRect(0, deck, W, H - deck); ctx.fillStyle = '#3a2e22'; ctx.fillRect(0, deck - H*.1, W, H*.022); ctx.fillStyle = 'rgba(255,220,180,.18)'; ctx.fillRect(0, deck - H*.1, W, 1.2);
  ctx.fillStyle = '#2e241a'; for (let i = 0; i < 9; i++) ctx.fillRect(W*(.02 + i*.12), deck - H*.08, W*.012, H*.08);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.12 + i*W*.08, deck + H*.14, 1.6, t, {phase:i, dir:1, still:!mo}));
  vign(ctx, W, H, .5, .5); }; }

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Six's ground for the Third ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on dusk-umber with the thin bone rim the Fourth's chapters use (Claude's call) */
function b65Item(key, label, body){ const w = 240, h = 130, id = 'c65-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#46362c"></stop><stop offset=".7" stop-color="#241a16"></stop><stop offset="1" stop-color="#120c0a"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#d8c8a4" stroke-width="1" opacity=".65"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* the finger bone: one bone of a finger, old and yellowed, drilled at the knuckle and hung on a leather thong tied in a soldier's knot;
   a smear of Y'Ghatan's soot still on it */
b65Item('b6_c5_fingerbone', 'A finger bone on a thong', '<ellipse cx="120" cy="110" rx="70" ry="6" fill="#000" opacity=".35"/>'
  + '<path d="M40 30 Q70 70 104 56 Q118 50 124 40" fill="none" stroke="#5a3e24" stroke-width="3.2" stroke-linecap="round"/><path d="M41 29 Q70 68 104 54" fill="none" stroke="#9a7650" stroke-width="1" opacity=".6"/>'
  + '<path d="M200 30 Q170 72 138 56 Q128 50 124 40" fill="none" stroke="#5a3e24" stroke-width="3.2" stroke-linecap="round"/><path d="M199 29 Q170 70 138 54" fill="none" stroke="#9a7650" stroke-width="1" opacity=".6"/>'
  + '<g transform="translate(124 40)"><ellipse cx="0" cy="0" rx="6.5" ry="5" fill="#4a321c"/><path d="M-5 -2 Q0 -6 5 -2 M-5 2 Q0 6 5 2" fill="none" stroke="#7a5a38" stroke-width="1.2"/><path d="M-2 4 L-5 16 M2 4 L6 15" stroke="#5a3e24" stroke-width="2.4" stroke-linecap="round"/></g>'
  + '<g transform="translate(124 62) rotate(-8)"><path d="M-2 -10 L-2 -2" stroke="#5a3e24" stroke-width="2.4"/>'
  + '<path d="M-9 0 Q-11 6 -7 9 Q-5 24 -5.5 34 Q-9 38 -8 43 Q-4 48 0 47 Q4 48 8 43 Q9 38 5.5 34 Q5 24 7 9 Q11 6 9 0 Q4 -4 0 -3 Q-4 -4 -9 0 Z" fill="#e2d4b4"/>'
  + '<circle cx="0" cy="3.4" r="2.2" fill="#2a1e14"/><path d="M-7.6 1.4 Q-8 6 -5.6 9 Q-4 22 -4.2 33" fill="none" stroke="#fff6e0" stroke-width="1.4" opacity=".55"/>'
  + '<path d="M5.4 12 Q4.4 24 4.6 33" fill="none" stroke="#a8946c" stroke-width="1.6" opacity=".7"/><path d="M-7 42 Q0 46 7 42" fill="none" stroke="#a8946c" stroke-width="1" opacity=".7"/>'
  + '<path d="M1 18 Q4 22 2 28 Q-1 26 -1 21 Z" fill="#2a2220" opacity=".35"/><ellipse cx="-2" cy="38" rx="3" ry="2" fill="#2a2220" opacity=".25"/></g>'
  + '<g fill="#d8c8a4" opacity=".16"><circle cx="70" cy="96" r="1"/><circle cx="160" cy="92" r="1.2"/><circle cx="178" cy="100" r=".8"/><circle cx="58" cy="88" r=".8"/></g>');
/* a coil of Nok's rope: navy cordage, tarred dark, three strands laid right, flaked in a coil; an eye spliced in one end and the
   other end whipped with pale twine; the fleet's lead tally-seal crimped on near the eye */
b65Item('b6_c5_nokrope', 'A coil of Nok\'s rope', '<ellipse cx="118" cy="110" rx="86" ry="7" fill="#000" opacity=".35"/>'
  + (() => { let s = ''; for (let r = 0; r < 4; r++) { const rx = 64 - r*12, ry = 30 - r*5.6, cy = 72 - r*1.2;
      s += `<ellipse cx="110" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#3a2a1a" stroke-width="10"/><ellipse cx="110" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#5a4228" stroke-width="7"/>`;
      for (let k = 0; k < 28; k++) { const a = k/28*Math.PI*2, x = 110 + Math.cos(a)*rx, y = cy + Math.sin(a)*ry, tx = -Math.sin(a), ty = Math.cos(a);
        s += `<path d="M${(x - tx*2.6 - 2.4).toFixed(1)} ${(y - ty*2.6 - 2.4).toFixed(1)} L${(x + tx*2.6 + 2.4).toFixed(1)} ${(y + ty*2.6 + 2.4).toFixed(1)}" stroke="#241810" stroke-width="1" opacity=".55"/>`; }
      s += `<path d="M${110 - rx + 3} ${cy - 4} Q110 ${cy - ry - 3} ${110 + rx - 3} ${cy - 4}" fill="none" stroke="#c8a87a" stroke-width="1.4" opacity=".45"/>`; } return s; })()
  + '<ellipse cx="110" cy="69" rx="24" ry="9" fill="#120c0a" opacity=".8"/>'
  + '<path d="M170 76 Q190 82 196 70 Q200 58 212 54" fill="none" stroke="#3a2a1a" stroke-width="10" stroke-linecap="round"/><path d="M170 76 Q190 82 196 70 Q200 58 212 54" fill="none" stroke="#5a4228" stroke-width="7" stroke-linecap="round"/>'
  + '<path d="M172 73 Q188 78 194 68" fill="none" stroke="#c8a87a" stroke-width="1.3" opacity=".45"/>'
  + '<ellipse cx="220" cy="46" rx="12" ry="9" fill="none" stroke="#3a2a1a" stroke-width="7"/><ellipse cx="220" cy="46" rx="12" ry="9" fill="none" stroke="#5a4228" stroke-width="4.4"/><path d="M210 42 Q216 35 226 37" fill="none" stroke="#c8a87a" stroke-width="1.2" opacity=".5"/>'
  + '<g stroke="#2a1c10" stroke-width="1" opacity=".6"><path d="M206 56 L210 60"/><path d="M202 60 L206 64"/><path d="M199 64 L203 68"/></g>'
  + '<rect x="193" y="62" width="9" height="11" rx="2" fill="#7a7c80" transform="rotate(-30 197 67)"/><path d="M194 64 L200 61" stroke="#c8ccd0" stroke-width="1" opacity=".6" transform="rotate(-30 197 67)"/><circle cx="197" cy="68" r="1.6" fill="#4a4c50"/>'
  + '<path d="M50 74 Q36 86 28 100 Q24 106 20 104" fill="none" stroke="#3a2a1a" stroke-width="10" stroke-linecap="round"/><path d="M50 74 Q36 86 28 100 Q24 106 20 104" fill="none" stroke="#5a4228" stroke-width="7" stroke-linecap="round"/>'
  + '<rect x="18" y="98" width="12" height="9" rx="2" fill="#d8ccac" transform="rotate(-20 24 102)"/><g stroke="#8a7a5a" stroke-width=".8" transform="rotate(-20 24 102)"><path d="M21 98 L21 107"/><path d="M24 98 L24 107"/><path d="M27 98 L27 107"/></g>'
  + '<path d="M14 106 L18 104 M15 102 L19 102 M16 109 L19 106" stroke="#5a4228" stroke-width="1.6" stroke-linecap="round"/>');
