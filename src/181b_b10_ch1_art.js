/* ============ Book Ten, Chapter 1 art: Missing Is Not Dead — the camp after the short-tails, the burial lines, the night of the lamps ============ */
/* Book Nine's camp at the Wastes' edge (163b's land, 162b's tents and wagons, 164b's fire), emptier: rows of tents with gaps in them, the
   surgeons' long tents, the burial lines in long straight trenches with spoil heaps, a clerk with a slate at each. By day a tired pale sky
   with the allies' dust on the horizon (grey columns ruled on the plain, bright banners, a few horsemen); by night Book Ten's own sky,
   blue-black with starlight from the upper left, the big tent glowing like a lantern and the allies' fires in their hundreds on the plain.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     pruss        (replaces 180's simple sprite) the Third's recruit: a young heavy built like the back of a wagon; scale patched down one
                  side with a different colour; a carter's trace-strap across the chest; his old sergeant's helm slung behind on its
                  strap, crest-socket and no crest; a heavy sword over the right shoulder; a carter's maul on a thong at the hip; cropped
                  hair, a broad sunburned face (180b's bust kit)
   Five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b10_burial       the burial lines by day (180's caption): trenches receding in rows, spoil heaps, small diggers, a clerk at a trestle,
                      the upturned water barrel, the allies' dust on the horizon
     b10_camp         the camp by day: tents in rows with gaps, the surgeons' long tents, a cook-wagon, the allies' columns on the plain
     b10_camp_night   the camp at night: stars, dark tents, dung-fires, the big tent lit with shapes on its canvas (till the word is out),
                      the allies' fires on the plain
     b10_c1_linesn    the burial lines at night: open trenches (or, once every name is said, long low mounds), a clerk's lamp on a trestle
     b10_c1_wells     the sappers' wells in a dry wash at night: shored wells with lamps, a chain of hands up the bank, barrels on a flat
                      wagon
   Ground (TILEX): b10_c1_camp, on Book Nine's wastes ground (164b's b9_c4_wastes over 163b's b9_c3_road), with '=' a burial trench, 'u' a
   spoil heap, 'k' a clerk's trestle, 'B' the upturned water barrel, 'L' a surgeons' long tent, 'P' the officers' big tent, 'O' a sappers'
   well, 'X' the edge of the ground (drawn as the track's edge). Battle 't' is a spoil heap with a spade in it.
   The chapter's gear in the series' 200×150 item style on Book Ten's ground: night glass, blue-black (#2a3a52 → #070a10), a cold
   starlight rim from the upper left. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Pruss: twenty-four, broad; patched heavy scale (the left side a different, browner scale), a carter's trace-strap across the chest, his
     old sergeant's helm slung behind on its strap, the heavy sword over the right shoulder, a carter's maul on a thong at the left hip */
  pruss(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.1, 1.05);
    ctx.fillStyle = '#4e4c48'; ctx.beginPath(); ctx.arc(-5.6, -4.4, 3.6, 0, 7); ctx.fill(); ctx.fillStyle = '#3a3834'; ctx.fillRect(-9.2, -4.6, 7.2, 1); ctx.fillStyle = '#2a2826'; ctx.fillRect(-6, -8.4, .9, 1.6); // the old helm slung behind, its crest-socket
    B2F.line(ctx, '#3a3228', 1.8, [[5.2, 4], [9.4, -16]]); B2F.line(ctx, '#c8c4bc', 2.2, [[8.4, -11], [11.4, -24]]); ctx.fillStyle = '#5a4a32'; ctx.fillRect(7.2, -11.6, 4, 1.4); // the heavy sword over the shoulder
    h.legs('#2a2420'); ctx.fillStyle = '#3a3028'; ctx.fillRect(-4.8, 9.6, 3.8, 3.4); ctx.fillRect(1, 9.6, 3.8, 3.4); // boots
    poly(ctx, [[-7,-6.4],[7,-6.4],[6.6,7.8],[-6.6,7.8]], h.armor('#7a7466', '#28261e'));
    poly(ctx, [[-7,-6.4],[-1.4,-6.4],[-1.8,7.8],[-6.6,7.8]], h.armor('#8a7454', '#2e2418')); // the patch: somebody else's scale, browner
    ctx.fillStyle = 'rgba(0,0,0,.26)'; for (let y = -4.6; y < 7; y += 2) ctx.fillRect(-6.6, y, 13.2, .6); // the scale's rows
    B2F.line(ctx, '#5a3e22', 1.6, [[-6.2, -5.6], [6, 5.6]]); ctx.fillStyle = '#8a6a44'; ctx.fillRect(-.6, -.8, 1.6, 1.6); // the trace-strap, its ring
    ctx.fillStyle = 'rgba(200,214,240,.14)'; ctx.fillRect(-6.6, -6, 1.2, 12); // the cold light on the lit edge
    ctx.fillStyle = '#2a2018'; ctx.fillRect(-6.8, 3.4, 13.6, 1.3); // the belt
    B2F.line(ctx, '#4a3c2a', .8, [[-6.2, 4.2], [-7.4, 8.4]]); ctx.fillStyle = '#6a5a44'; ctx.fillRect(-9, 8.2, 3.4, 2.2); // the carter's maul on its thong
    h.head('#c09070', 4.6, -11.2); h.look('rgba(20,12,10,.85)', -11.4);
    ctx.fillStyle = '#5a4a3a'; ctx.beginPath(); ctx.arc(0, -12.6, 4.7, Math.PI*1.04, Math.PI*1.96); ctx.fill(); // cropped to the skull
    ctx.fillStyle = 'rgba(200,90,60,.18)'; ctx.fillRect(-3.6, -11, 7.2, 2); // sunburn
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* Book Ten's night sky over the camp: blue-black, the band of stars slanting, starlight from the upper left. Returns the horizon. */
function b101aNight(x, W, H){ const hz = H*.44;
  x.fillStyle = vgrad(x, 0, hz, [[0,'#05070f'],[.6,'#0d1426'],[1,'#1c2a40']]); x.fillRect(0, 0, W, hz + 2);
  x.save(); x.translate(W*.55, hz*.4); x.rotate(-.24); x.fillStyle = 'rgba(200,212,240,.05)'; x.beginPath(); x.ellipse(0, 0, W*.7, hz*.12, 0, 0, 7); x.fill(); x.restore(); // the band
  for (let i = 0; i < 150; i++) { const k = hash(i, 10101); x.fillStyle = `rgba(222,230,250,${(.15 + k*.6).toFixed(2)})`; const r = .5 + Math.pow(hash(i, 10102), 3)*1.4; x.fillRect(hash(i, 10103)*W, Math.pow(hash(i, 10104), 1.2)*hz*.96, r, r); }
  glow(x, 0, 0, W*.6, '#9ab0d0', .08); // starlight from the upper left
  x.fillStyle = vgrad(x, hz, H, [[0,'#1a1e26'],[1,'#08090c']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 90; i++) { const d = hash(i, 10105), yy = hz + Math.pow(d, .8)*(H - hz); x.fillStyle = 'rgba(90,100,120,.14)'; x.fillRect(hash(i, 10106)*W, yy, 2 + d*8, 1); }
  return hz; }
/* a burial trench seen from the side and above, at depth k (0 far, 1 near): a dark slot with a pale lip, the spoil heaped behind it */
function b101aTrench(x, cx, cy, w, s, night, filled){ const d = night ? '#040506' : '#24180e', lip = night ? '#5a6272' : '#d0b88a', heap = night ? '#2e333c' : '#7a6448';
  x.fillStyle = heap; x.beginPath(); x.moveTo(cx - w*.5, cy - 1*s); x.quadraticCurveTo(cx, cy - 7*s, cx + w*.5, cy - 1*s); x.closePath(); x.fill(); // the spoil heap behind
  if (filled) { x.fillStyle = night ? '#363c48' : '#9a8460'; x.beginPath(); x.moveTo(cx - w*.48, cy + 2*s); x.quadraticCurveTo(cx, cy - 1.6*s, cx + w*.48, cy + 2*s); x.closePath(); x.fill(); return; } // a long low mound
  x.fillStyle = lip; x.fillRect(cx - w*.5, cy, w, 1.4*s); x.fillStyle = d; x.fillRect(cx - w*.48, cy + 1*s, w*.96, 3.6*s); x.fillStyle = night ? 'rgba(150,170,200,.18)' : 'rgba(255,240,200,.3)'; x.fillRect(cx - w*.5, cy, w*.3, .8*s); }
/* a digger with a spade, tiny, at the trench's edge: a figure bent over, the spade's line */
function b101aDigger(x, cx, cy, s, night, ph){ const c = night ? '#0c0d10' : '#3a3228', b = Math.sin(ph)*.6;
  x.fillStyle = c; x.beginPath(); x.ellipse(cx, cy - 6*s, 1.6*s, 3.6*s, .4 + b*.3, 0, 7); x.fill(); x.beginPath(); x.arc(cx + 1.6*s, cy - 9.6*s, 1.3*s, 0, 7); x.fill(); x.fillRect(cx - 1.4*s, cy - 3*s, 1*s, 3*s); x.fillRect(cx + .6*s, cy - 3*s, 1*s, 3*s);
  B2F.line(x, night ? '#1a1c20' : '#6a5438', Math.max(1, .7*s), [[cx + 2*s, cy - 6*s], [cx + 4.4*s, cy + .4*s]]); }
/* a clerk's trestle with a slate on it and, at night, a lamp */
function b101aTrestle(x, cx, cy, s, night){ x.fillStyle = night ? '#1a1610' : '#5a4430'; x.fillRect(cx - 7*s, cy - 6*s, 14*s, 1.6*s); x.fillRect(cx - 6*s, cy - 4.4*s, 1*s, 4.4*s); x.fillRect(cx + 5*s, cy - 4.4*s, 1*s, 4.4*s);
  x.fillStyle = night ? '#24262a' : '#3a3c40'; x.fillRect(cx - 4*s, cy - 7.6*s, 4.6*s, 1.8*s); x.fillStyle = night ? 'rgba(200,200,190,.3)' : 'rgba(230,230,220,.6)'; x.fillRect(cx - 3.6*s, cy - 7.2*s, 3.6*s, .4*s);
  if (night) { x.fillStyle = 'rgba(255,200,120,.95)'; x.fillRect(cx + 2.6*s, cy - 9*s, 1.6*s, 2.4*s); glow(x, cx + 3.4*s, cy - 8*s, 30*s, '#ffb060', .32); } }
/* a surgeons' long tent, side on: a low ridge, sides rolled up on poles, rows of blankets inside */
function b101aLongTent(x, cx, by, w, s, night){ const c = night ? ['#2a2a30', '#141418'] : ['#b8ac94', '#7a7060'];
  x.fillStyle = c[0]; x.beginPath(); x.moveTo(cx - w*.5, by - 7*s); x.lineTo(cx - w*.46, by - 12*s); x.lineTo(cx + w*.46, by - 12*s); x.lineTo(cx + w*.5, by - 7*s); x.closePath(); x.fill();
  x.fillStyle = c[1]; x.fillRect(cx - w*.5, by - 7*s, w, 1.2*s); x.fillStyle = night ? '#0a0a0c' : '#3e362c'; x.fillRect(cx - w*.48, by - 6*s, w*.96, 6*s); // the shade under it
  for (let i = 0; i < Math.floor(w/(6*s)); i++) { x.fillStyle = night ? 'rgba(80,80,90,.4)' : 'rgba(180,170,150,.6)'; x.fillRect(cx - w*.44 + i*6*s, by - 2*s, 4*s, 1.4*s); } // blankets in a row
  for (let i = 0; i <= 4; i++) { x.fillStyle = night ? '#0c0c0e' : '#4a3a28'; x.fillRect(cx - w*.5 + i*w/4 - .5*s, by - 7*s, 1*s, 7*s); }
  if (night) for (let i = 0; i < 3; i++) { x.fillStyle = 'rgba(255,214,150,.8)'; x.fillRect(cx - w*.3 + i*w*.3, by - 5*s, 1.2*s, 1.2*s); glow(x, cx - w*.3 + i*w*.3, by - 4*s, 14*s, '#ffb060', .18); } }
/* the allies on the plain by day: grey columns ruled on the ground, a loose bright army, a few horsemen, their dust */
function b101aAllies(x, W, H, hz){ for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(200,180,140,.22)'; x.beginPath(); x.ellipse(W*(.08 + i*.09), hz - H*.012, W*.07, H*.02, 0, 0, 7); x.fill(); } // their dust
  for (let c = 0; c < 4; c++) for (let r = 0; r < 14; r++) { x.fillStyle = '#6e7278'; x.fillRect(W*(.1 + c*.035) + r*W*.004, hz + H*.006 + r*H*.0015, W*.003, H*.008); } // the grey knights, ruled
  for (let i = 0; i < 30; i++) { x.fillStyle = ['#7a6a4a', '#5a4a3a', '#8a7a5a'][i % 3]; x.fillRect(W*(.3 + hash(i, 10111)*.18), hz + H*(.004 + hash(i, 10112)*.012), W*.004, H*.008); } // the Bolkando, loose
  [[.34, '#b83a2a'], [.39, '#d0a030'], [.44, '#2a6a8a']].forEach(([u, c]) => { B2F.line(x, '#3a3028', 1, [[W*u, hz + H*.012], [W*u, hz - H*.012]]); x.fillStyle = c; x.fillRect(W*u, hz - H*.012, W*.012, H*.008); }); // banners
  for (let i = 0; i < 7; i++) { const hx = W*(.52 + i*.022), hy = hz + H*(.008 + (i % 2)*.004); x.fillStyle = '#3a2e22'; x.fillRect(hx, hy, W*.008, H*.006); x.fillRect(hx + W*.002, hy - H*.006, W*.002, H*.006); } } // a few horsemen, fewer than saddles
/* the allies' fires on the plain at night, in their hundreds */
function b101aAllyFires(x, W, H, hz){ for (let i = 0; i < 120; i++) { const u = hash(i, 10121), v = hash(i, 10122); x.fillStyle = `rgba(255,${150 + Math.round(v*60)},90,${(.35 + v*.5).toFixed(2)})`; x.fillRect(W*(.02 + u*.6), hz + H*(.004 + v*.03), 1.4, 1.2); }
  glow(x, W*.3, hz + H*.015, W*.35, '#ff9a50', .07); }

/* ---------------- the backdrops ---------------- */
/* the burial lines by day (180's caption): trenches in rows going away, spoil heaps, diggers, a clerk at a trestle, the barrel, the allies' dust */
SCENEX.b10_burial = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b101:burial', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false); b101aAllies(x, W, H, hz);
    for (let r = 0; r < 6; r++) { const k = r/5, cy = hz + (H - hz)*(.06 + Math.pow(k, 1.5)*.7), s = .4 + k*1.6;
      for (let c = 0; c < 3; c++) { const w = W*(.18 + k*.12), cx = W*(.18 + c*.32) + (r % 2)*W*.04; b101aTrench(x, cx, cy, w, s, false, false); } } // the lines, receding
    b101aTrestle(x, W*.66, H*.74, H/110, false); // a clerk's trestle
    x.fillStyle = '#6a5034'; x.beginPath(); x.ellipse(W*.84, H*.86, H*.05, H*.022, 0, 0, 7); x.fill(); x.fillRect(W*.84 - H*.05, H*.86, H*.1, H*.07); x.fillStyle = '#4a3622'; [.88, .91].forEach(k => x.fillRect(W*.84 - H*.05, H*k, H*.1, H*.006)); // the upturned barrel
    ell(x, W*.84, H*.858, H*.05, H*.022, '#7a5e3c'); x.fillStyle = '#3a3228'; x.fillRect(W*.835, H*.836, H*.014, H*.02); }), 0, 0, W, H); // its head, a mug on it upside down
  for (let i = 0; i < 6; i++) { const r = 1 + (i % 3), k = r/5, cy = H*.44 + H*.56*(.06 + Math.pow(k, 1.5)*.7), s = .4 + k*1.6; b101aDigger(ctx, W*(.1 + (i*.16) % .8), cy, s*1.6, false, t/700*mo + i); }
  drawFigure(ctx, 'b2soldier', W*.62, H*.76, 1.1, t, {dir:1, phase:2}); // the clerk
  for (let i = 0; i < 10; i++) { const q = ((t/12000*mo + hash(i, 10131)) % 1); ctx.fillStyle = `rgba(230,214,180,${(.2*(1 - q)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 10132)*.8) + q*W*.04, H*(.5 + hash(i, 10133)*.4) - q*H*.03, 1.2, 1.2); } // dust
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* the camp by day: tents in rows with gaps, the long tents, the cook-wagon, the allies on the plain */
SCENEX.b10_camp = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b101:camp', W, H, (x, W, H) => { const hz = b93aLand(x, W, H, 'day', false); b101aAllies(x, W, H, hz);
    b101aLongTent(x, W*.74, hz + H*.1, W*.36, H/260, false); b101aLongTent(x, W*.3, hz + H*.08, W*.24, H/320, false);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { if (hash(i, r + 10141) > .62) continue; b92aTent(x, W*(.05 + i*.11 + r*.03), hz + H*(.15 + r*.08), H/(240 - r*50), 'day'); } // rows, with gaps in them
    b92aWagon(x, W*.2, H*.8, H/140, 'day', false); b92aBarrels(x, W*.5, H*.78, H/180, 'day'); }), 0, 0, W, H);
  for (let i = 0; i < 3; i++) drawFigure(ctx, 'b2soldier', W*(.4 + i*.14), H*(.7 + (i % 2)*.03), 1.05, t, {dir:i % 2 ? -1 : 1, phase:i + 4}); // heavies about the camp
  b94aFire(ctx, W*.32, H*.88, b2Fl(t), .9); ell(ctx, W*.32, H*.86, H*.02, H*.012, '#2a2018'); // the cook-fire, its pot
  ctx.fillStyle = 'rgba(220,206,170,.05)'; ctx.fillRect(0, 0, W, H);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* the camp at night: dark tents, dung-fires, the big tent lit (until the word is out), the allies' fires */
SCENEX.b10_camp_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), f = (S && S.f) || {}, lit = !f.b10_c1_word || (S && S.book !== 'tcg') || (S && S.chapter > 1);
  ctx.drawImage(sceneLayer('b101:campn', W, H, (x, W, H) => { const hz = b101aNight(x, W, H); b101aAllyFires(x, W, H, hz);
    b101aLongTent(x, W*.16, hz + H*.1, W*.24, H/320, true);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { if (hash(i, r + 10151) > .62) continue; b92aTent(x, W*(.05 + i*.11 + r*.03), hz + H*(.16 + r*.08), H/(240 - r*50), 'night'); } }), 0, 0, W, H);
  const hz = H*.44, bx = W*.66, by = hz + H*.12, bw = W*.22, bh = H*.12; // the big tent
  ctx.fillStyle = lit ? '#c89a5a' : '#22242a'; ctx.beginPath(); ctx.moveTo(bx - bw*.5, by); ctx.lineTo(bx - bw*.36, by - bh); ctx.lineTo(bx + bw*.36, by - bh); ctx.lineTo(bx + bw*.5, by); ctx.closePath(); ctx.fill();
  if (lit) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, bx, by - bh*.5, bw*.9, '#ffb060', .22*fl); ctx.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 5; i++) { const sx = bx - bw*.3 + ((i*.17 + (mo ? Math.sin(t/2600 + i*1.7)*.05 : 0)) % .6)*bw, tall = i % 2 ? .62 : .5; ctx.fillStyle = 'rgba(60,36,20,.55)'; ctx.beginPath(); ctx.ellipse(sx, by - bh*tall*.5, bw*.025, bh*tall*.42, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(sx, by - bh*tall*.98, bw*.02, 0, 7); ctx.fill(); } // shapes on the canvas
    ctx.fillStyle = '#4a3020'; ctx.fillRect(bx - bw*.05, by - bh*.42, bw*.1, bh*.42); }
  for (let i = 0; i < 2; i++) drawFigure(ctx, 'b2soldier', bx + (i ? 1 : -1)*bw*.12, by + H*.03, .9, t, {dir:i ? -1 : 1, phase:i}); // the guard at the door
  for (let i = 0; i < 4; i++) { const px = W*(.08 + i*.22), py = H*(.62 + hash(i, 10152)*.05); ctx.globalCompositeOperation = 'lighter'; glow(ctx, px, py, H*.05, '#ff8a3a', .16); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,170,90,.8)'; ctx.fillRect(px - 1, py - 1, 2, 2); } // dung-fires down the rows
  b94aFire(ctx, W*.44, H*.88, fl, 1.1);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* the burial lines at night: open trenches or, once every name is said, long low mounds; the clerk's lamp at the last line */
SCENEX.b10_c1_linesn = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), f = (S && S.f) || {}, done = !!f.b10_c1_named;
  ctx.drawImage(sceneLayer('b101:linesn:' + (done ? 1 : 0), W, H, (x, W, H) => { const hz = b101aNight(x, W, H); b101aAllyFires(x, W, H, hz);
    for (let r = 0; r < 6; r++) { const k = r/5, cy = hz + (H - hz)*(.06 + Math.pow(k, 1.5)*.7), s = .4 + k*1.6;
      for (let c = 0; c < 3; c++) { const w = W*(.18 + k*.12), cx = W*(.18 + c*.32) + (r % 2)*W*.04; b101aTrench(x, cx, cy, w, s, true, done || r < 4); } } }), 0, 0, W, H); // the near lines still open until the names are said
  const lx = W*.72, ly = H*.78; ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly - H*.06, H*.32, '#ffb060', .2*fl); ctx.globalCompositeOperation = 'source-over';
  b101aTrestle(ctx, lx, ly, H/100, true);
  if (!done) drawFigure(ctx, 'b2soldier', lx - H*.08, ly + H*.02, 1.1, t, {dir:1, phase:3}); // the clerk with his slate
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.65, t, {phase:i, dir:1}));
  vign(ctx, W, H, .74, .5); };

/* the sappers' wells in a dry wash at night: the banks, shored wells with lamps over them, a chain of hands up the bank, the barrel-wagon */
SCENEX.b10_c1_wells = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b101:wells', W, H, (x, W, H) => { const hz = b101aNight(x, W, H);
    x.fillStyle = '#121418'; x.beginPath(); x.moveTo(0, hz + H*.04); x.lineTo(W*.34, hz + H*.1); x.lineTo(W*.24, H); x.lineTo(0, H); x.closePath(); x.fill(); // the near bank, left
    x.fillStyle = '#0e1014'; x.beginPath(); x.moveTo(W, hz + H*.02); x.lineTo(W*.7, hz + H*.12); x.lineTo(W*.82, H); x.lineTo(W, H); x.closePath(); x.fill(); // the far bank
    x.fillStyle = '#1a1c20'; x.beginPath(); x.moveTo(W*.34, hz + H*.1); x.lineTo(W*.7, hz + H*.12); x.lineTo(W*.82, H); x.lineTo(W*.24, H); x.closePath(); x.fill(); // the bed of the wash
    [[.42, .66, 1], [.56, .76, 1.3], [.48, .9, 1.7]].forEach(([u, v, s]) => { const wx = W*u, wy = H*v, r = H*.03*s; x.fillStyle = '#050506'; x.beginPath(); x.ellipse(wx, wy, r*1.4, r*.6, 0, 0, 7); x.fill();
      x.strokeStyle = '#3a3226'; x.lineWidth = Math.max(1, s*1.2); x.strokeRect(wx - r*1.4, wy - r*.6, r*2.8, r*1.2); // the shoring
      B2F.line(x, '#2a2218', Math.max(1, s), [[wx - r*1.2, wy], [wx - r*.6, wy - r*2.4], [wx + r*.6, wy - r*2.4], [wx + r*1.2, wy]]); }); // the frame over it
    b92aBarrels(x, W*.18, hz + H*.1, H/170, 'night'); }), 0, 0, W, H); // the barrel-wagon on the bank
  [[.42, .66], [.56, .76], [.48, .9]].forEach(([u, v], i) => { const lx = W*u, ly = H*v - H*.08; ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.12, '#ffb060', .22*fl); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,210,140,.95)'; ctx.fillRect(lx - 1.2, ly - 1.6, 2.4, 3.2); }); // the lamps
  for (let i = 0; i < 7; i++) { const k = i/6, px = W*(.46 - k*.24), py = H*(.8 - k*.3), s = (1.4 - k*.6)*H/240, sw = mo ? Math.sin(t/500 + i*1.1)*.5 : 0; // the chain, up the bank
    ctx.fillStyle = '#08090b'; ctx.beginPath(); ctx.ellipse(px, py - 7*s, 2*s, 4*s, sw*.3, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(px + sw*s, py - 12*s, 1.6*s, 0, 7); ctx.fill(); ctx.fillRect(px - 1.6*s, py - 3.4*s, 1.2*s, 3.4*s); ctx.fillRect(px + .4*s, py - 3.4*s, 1.2*s, 3.4*s);
    if ((i + Math.floor(t/600*mo)) % 3 === 0) { ctx.fillStyle = '#3a3026'; ctx.fillRect(px + 2*s, py - 8*s, 2.4*s, 2.6*s); } } // a bucket going up
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.56 + i*Math.min(.05, .26/sq.length)), H*.97 - (i % 2)*2, 1.6, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .74, .5); };

/* ---------------- ground ---------------- */
/* the camp's ground: Book Nine's wastes ground (164b over 163b) with the burial lines, the clerks' trestles, the barrel, the long tents, the
   big tent and the wells drawn on top */
TILEX.b10_c1_camp = (ctx, ch, x, y, T, dark) => { const base = TILEX.b9_c4_wastes || TILEX.b9_c3_road; if (!base) return; const N = !!dark;
  if (ch === 'X') return base(ctx, '>', x, y, T, dark);
  if (!'=ukBLPO'.includes(ch)) return base(ctx, ch, x, y, T, dark);
  base(ctx, '.', x, y, T, dark);
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === '=') { const done = N && S && S.f && S.f.b10_c1_named;
      if (done) { ell(ctx, px + T*.5, py + T*.6, T*.56, T*.22, '#2a2e36'); ctx.fillStyle = 'rgba(160,170,190,.12)'; ctx.fillRect(px, py + T*.44, T, T*.04); return; } // a long low mound
      ctx.fillStyle = N ? '#3a3e46' : '#b49c70'; ctx.fillRect(px, py + T*.22, T, T*.12); ctx.fillStyle = N ? '#050506' : '#24180e'; ctx.fillRect(px, py + T*.32, T, T*.46); ctx.fillStyle = N ? '#2a2c30' : '#8a7454'; ctx.fillRect(px, py + T*.78, T, T*.08); // the trench: lip, slot, far lip
      if (hash(x, y, 10161) > .5) { ctx.fillStyle = N ? 'rgba(60,64,72,.6)' : 'rgba(150,140,120,.7)'; ctx.fillRect(px + T*.2, py + T*.5, T*.5, T*.12); } return; } // a blanket in the trench
    if (ch === 'u') { ell(ctx, px + T*.5, py + T*.86, T*.48, T*.1, 'rgba(0,0,0,.45)'); ctx.fillStyle = N ? '#22252c' : '#8a7454'; ctx.beginPath(); ctx.moveTo(px + T*.02, py + T*.86); ctx.quadraticCurveTo(px + T*.5, py + T*.08, px + T*.98, py + T*.86); ctx.closePath(); ctx.fill();
      ctx.fillStyle = N ? 'rgba(140,150,170,.12)' : 'rgba(230,210,170,.35)'; ctx.beginPath(); ctx.moveTo(px + T*.1, py + T*.8); ctx.quadraticCurveTo(px + T*.32, py + T*.3, px + T*.5, py + T*.36); ctx.lineTo(px + T*.3, py + T*.82); ctx.closePath(); ctx.fill(); // lit from the left
      if (hash(x, y, 10162) > .55) B2F.line(ctx, N ? '#14161a' : '#5a4430', Math.max(1, T*.05), [[px + T*.62, py + T*.2], [px + T*.74, py + T*.66]]); return; } // a spade stuck in it
    if (ch === 'k') { ell(ctx, px + T*.5, py + T*.9, T*.44, T*.08, 'rgba(0,0,0,.45)'); ctx.fillStyle = N ? '#2a2016' : '#6a5034'; ctx.fillRect(px + T*.08, py + T*.42, T*.84, T*.12); ctx.fillRect(px + T*.14, py + T*.54, T*.06, T*.34); ctx.fillRect(px + T*.8, py + T*.54, T*.06, T*.34);
      ctx.fillStyle = '#2c2e32'; ctx.fillRect(px + T*.2, py + T*.3, T*.32, T*.14); ctx.fillStyle = 'rgba(230,230,220,.5)'; ctx.fillRect(px + T*.23, py + T*.34, T*.24, T*.02); ctx.fillRect(px + T*.23, py + T*.38, T*.2, T*.02); // the slate, chalked
      if (N) { ctx.fillStyle = 'rgba(255,200,120,.95)'; ctx.fillRect(px + T*.66, py + T*.26, T*.1, T*.16); glow(ctx, px + T*.71, py + T*.32, T*1.2, '#ffb060', .3); } return; } // the clerk's lamp
    if (ch === 'B') { ell(ctx, px + T*.5, py + T*.88, T*.36, T*.08, 'rgba(0,0,0,.45)'); ctx.fillStyle = N ? '#2a2016' : '#7a5a38'; ctx.fillRect(px + T*.22, py + T*.34, T*.56, T*.52); ell(ctx, px + T*.5, py + T*.34, T*.28, T*.1, N ? '#3a2e20' : '#9a7a50');
      ctx.fillStyle = N ? '#14100c' : '#3a2a1a'; [.5, .74].forEach(k => ctx.fillRect(px + T*.22, py + T*k, T*.56, T*.05)); ctx.fillStyle = N ? '#2a2c30' : '#4a4038'; ctx.fillRect(px + T*.42, py + T*.22, T*.14, T*.12); return; } // the upturned barrel, a mug on it
    if (ch === 'L') { ctx.fillStyle = N ? '#2a2a30' : '#b8ac94'; ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.lineTo(px, py + T*.16); ctx.lineTo(px + T, py + T*.16); ctx.lineTo(px + T, py + T*.3); ctx.closePath(); ctx.fill();
      ctx.fillStyle = N ? '#0a0a0c' : '#4a4034'; ctx.fillRect(px, py + T*.3, T, T*.6); for (let i = 0; i < 2; i++) { ctx.fillStyle = N ? 'rgba(80,80,90,.45)' : 'rgba(190,180,160,.7)'; ctx.fillRect(px + T*(.1 + i*.46), py + T*.66, T*.36, T*.12); } // blankets in the shade
      ctx.fillStyle = N ? '#0c0c0e' : '#5a4630'; ctx.fillRect(px, py + T*.16, T*.05, T*.74); if (N) { ctx.fillStyle = 'rgba(255,214,150,.8)'; ctx.fillRect(px + T*.5, py + T*.4, T*.06, T*.06); glow(ctx, px + T*.53, py + T*.43, T*.6, '#ffb060', .2); } return; } // a pole; a lamp at night
    if (ch === 'P') { const lit = N && S && S.f && !S.f.b10_c1_word; ctx.fillStyle = lit ? '#c89a5a' : N ? '#24262c' : '#c8bca4'; ctx.beginPath(); ctx.moveTo(px - T*.02, py + T*.92); ctx.lineTo(px + T*.1, py + T*.12); ctx.lineTo(px + T*.9, py + T*.12); ctx.lineTo(px + T*1.02, py + T*.92); ctx.closePath(); ctx.fill();
      if (lit) { glow(ctx, px + T*.5, py + T*.5, T*1.4, '#ffb060', .28); ctx.fillStyle = 'rgba(70,40,20,.45)'; ctx.fillRect(px + T*(.3 + (x % 2)*.2), py + T*.36, T*.08, T*.44); } // a shape on the canvas
      return; }
    if (ch === 'O') { ell(ctx, px + T*.5, py + T*.6, T*.4, T*.24, N ? '#1a1816' : '#5a4a36'); ell(ctx, px + T*.5, py + T*.6, T*.26, T*.14, '#050506'); ctx.strokeStyle = N ? '#3a3226' : '#6a5034'; ctx.lineWidth = Math.max(1, T*.05); ctx.strokeRect(px + T*.22, py + T*.46, T*.56, T*.28); // the shored well
      B2F.line(ctx, N ? '#2a2218' : '#5a4430', Math.max(1, T*.05), [[px + T*.22, py + T*.6], [px + T*.34, py + T*.1], [px + T*.66, py + T*.1], [px + T*.78, py + T*.6]]); // its frame
      if (N) { ctx.fillStyle = 'rgba(255,210,140,.95)'; ctx.fillRect(px + T*.46, py + T*.12, T*.08, T*.12); glow(ctx, px + T*.5, py + T*.2, T*1.1, '#ffb060', .28); } return; } }); };
/* low cover ('t') on this chapter's ground: a spoil heap with a spade in it */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b10_c1_camp') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.88, T*.46, T*.1, 'rgba(0,0,0,.5)');
      ctx.fillStyle = N ? '#22252c' : '#8a7454'; ctx.beginPath(); ctx.moveTo(px + T*.04, py + T*.86); ctx.quadraticCurveTo(px + T*.5, py + T*.12, px + T*.96, py + T*.86); ctx.closePath(); ctx.fill();
      ctx.fillStyle = N ? 'rgba(140,150,170,.14)' : 'rgba(230,210,170,.35)'; ctx.beginPath(); ctx.moveTo(px + T*.12, py + T*.8); ctx.quadraticCurveTo(px + T*.32, py + T*.34, px + T*.5, py + T*.38); ctx.lineTo(px + T*.3, py + T*.82); ctx.closePath(); ctx.fill();
      B2F.line(ctx, N ? '#14161a' : '#5a4430', Math.max(1, T*.05), [[px + T*.6, py + T*.18], [px + T*.72, py + T*.64]]); ctx.fillStyle = N ? '#3a3e46' : '#8a8a86'; ctx.fillRect(px + T*.66, py + T*.58, T*.12, T*.14); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Ten's ground: night glass, blue-black, a cold starlight rim from the upper left) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".38" cy=".36" r=".85"><stop offset="0" stop-color="#2a3a52"/><stop offset=".6" stop-color="#141c2a"/><stop offset="1" stop-color="#070a10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a stripped heavy's scale: a long shirt of heavy scale on its blanket, the rows of plates, the shoulders doubled, starlight on the left of
     every row */
  ART['item/b10_c1_scale'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A stripped heavy's scale">${bg('b101sc')}
<linearGradient id="b101sc-p" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8c4d6"/><stop offset=".45" stop-color="#5e6676"/><stop offset="1" stop-color="#1e222a"/></linearGradient>
<pattern id="b101sc-r" width="9" height="7" patternUnits="userSpaceOnUse"><path d="M0 0 Q4.5 7 9 0" fill="url(#b101sc-p)" stroke="#0c0e12" stroke-width=".8"/></pattern></defs>
<rect width="200" height="150" fill="url(#b101sc-bg)"/><path d="M18 112 L182 106 L188 132 L12 136 Z" fill="#3a3428" stroke="#0a0c10"/><path d="M18 112 L182 106" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/><ellipse cx="100" cy="114" rx="76" ry="8" fill="url(#b101sc-sh)"/>
<path d="M62 22 L138 22 L150 38 L144 112 L56 112 L50 38 Z" fill="url(#b101sc-r)" stroke="#070a10" stroke-width="1.6"/>
<path d="M44 20 L84 20 L80 44 L40 42 Z M156 20 L116 20 L120 44 L160 42 Z" fill="url(#b101sc-r)" stroke="#070a10" stroke-width="1.4"/>
<path d="M84 20 Q100 32 116 20" fill="none" stroke="#141820" stroke-width="3"/><path d="M58 68 L142 68" stroke="#2a2418" stroke-width="5"/><rect x="96" y="64" width="8" height="8" fill="#6a5a3a" stroke="#0a0c10"/>
<path d="M51 40 L57 110" stroke="#dce6f8" stroke-width="1.2" opacity=".5"/><path d="M42 24 L41 40" stroke="#dce6f8" stroke-width="1" opacity=".45"/><path d="M66 24 L132 24" stroke="#dce6f8" stroke-width=".8" opacity=".3"/>
<ellipse cx="80" cy="56" rx="54" ry="40" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c1_scale'] = [200, 150];
  /* a sapper's spade: short ash handle with a T-grip, the blade filed to an edge along one side, earth on the other, lying on the ground */
  ART['item/b10_c1_spade'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A sapper's spade">${bg('b101sp')}
<linearGradient id="b101sp-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c4cede"/><stop offset=".5" stop-color="#5a606c"/><stop offset="1" stop-color="#1a1d24"/></linearGradient>
<linearGradient id="b101sp-h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a7050"/><stop offset="1" stop-color="#3a2a18"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b101sp-bg)"/><path d="M0 118 L200 110 L200 150 L0 150 Z" fill="#1a1c22"/><path d="M0 118 L200 110" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/><ellipse cx="104" cy="114" rx="80" ry="8" fill="url(#b101sp-sh)"/>
<g transform="rotate(-24 100 80)"><rect x="34" y="74" width="92" height="9" rx="3" fill="url(#b101sp-h)" stroke="#0a0c10" stroke-width="1.2"/><rect x="24" y="66" width="10" height="25" rx="3" fill="#5a4430" stroke="#0a0c10"/>
<path d="M126 70 L134 70 L136 64 L176 64 Q186 78 176 92 L136 92 L134 87 L126 87 Z" fill="url(#b101sp-b)" stroke="#070a10" stroke-width="1.4"/>
<path d="M176 64 Q186 78 176 92" fill="none" stroke="#eef4ff" stroke-width="1.4" opacity=".8"/><path d="M140 66 L174 66" stroke="#eef4ff" stroke-width="1" opacity=".5"/>
<path d="M140 84 Q156 90 172 86 L172 90 L140 90 Z" fill="#4a3a26" opacity=".85"/><path d="M38 75 L120 75" stroke="#dce6f8" stroke-width=".8" opacity=".4"/></g>
<ellipse cx="96" cy="70" rx="64" ry="30" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c1_spade'] = [200, 150];
  /* a clerk's slate of names: a slate in a wooden frame, chalked edge to edge in small marks (not letters), a stub of chalk beside it */
  { let ln = ''; for (let r = 0; r < 9; r++) { let xx = 56; for (let w = 0; w < 4; w++) { const len = 10 + Math.round(hash(r, w, 10171)*14); ln += `<path d="M${xx} ${42 + r*8} l${len} ${(hash(r, w, 10172) - .5).toFixed(2)}" stroke="#d8dce4" stroke-width="1.6" stroke-linecap="round" opacity="${(.55 + hash(r, w, 10173)*.35).toFixed(2)}"/>`; xx += len + 5; } }
  ART['item/b10_c1_slate'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A clerk's slate of names">${bg('b101sl')}
<linearGradient id="b101sl-f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a7a52"/><stop offset="1" stop-color="#3a2a18"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b101sl-bg)"/><ellipse cx="100" cy="122" rx="78" ry="8" fill="url(#b101sl-sh)"/>
<rect x="40" y="26" width="120" height="94" rx="4" fill="url(#b101sl-f)" stroke="#070a10" stroke-width="1.6"/><rect x="50" y="34" width="100" height="78" fill="#262a32" stroke="#0a0c10"/>${ln}
<path d="M41 28 L41 118" stroke="#dce6f8" stroke-width="1.2" opacity=".5"/><path d="M42 27 L158 27" stroke="#dce6f8" stroke-width="1" opacity=".45"/>
<rect x="150" y="118" width="22" height="7" rx="2" transform="rotate(-14 161 121)" fill="#e6e8ee" stroke="#5a5e66" stroke-width=".8"/>
<ellipse cx="90" cy="64" rx="56" ry="38" fill="#c8d4f0" opacity=".04"/></svg>`;
  ART_SIZE['item/b10_c1_slate'] = [200, 150]; }
}
