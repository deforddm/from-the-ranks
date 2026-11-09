/* ============ Book Eight, Chapter 5 art: The Road Back — the Lamatath west to Darujhistan's east gate, on the Fete's last day ============ */
/* Book Eight's look (140b) carried out onto the grass: after Black Coral's held night, a sky that does what it is told, copper at dusk and
   slate-blue after; the Lamatath's long grass pale gold over grey-green, moving in long slow waves; the caravan's wagons (142b's b82Wagon)
   and its fire (144b's b84Fire). Everything the brief keeps far off is drawn far off: the Hounds are low dark shapes at the edge of the
   grass where the long lines bend, never near and never with a face; the crossroads is four sparks of torch on tall poles and one tiny
   upright figure on the dark plain behind the gate, nothing more; the city wall and its masks are lantern-light and ovals.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     b8_c5_outrider  Calder's outrider: a plains woman, hair cropped to the skull, a grass-coloured cloak, a short horn bow at her back
     b8_c5_peddler   the kelyk peddler: a good travelling coat, clean hands, a careful smile, a stoppered jug held to the chest
     b8_c5_benna     old Benna: a washerwoman's sleeves rolled to the shoulder, an apron, her tubs on her back in a bundle
   Grounds (TILEX): b8_c5_grass (dusk and night) and b8_c5_day (day), Book Three's Rhivi plain (b3c2Plain) under the road's own pieces:
     'r' the road's ruts, 't' a tussock or a tumbled stone (low cover), 'p' the peddler's cart and its jugs, 'm' a milestone, 'x' the
     wayhouse's burned walls, 'H' the city wall with lanterns along its top, 'G' the gate, 'L' a lantern on a pole; arrows as ever.
   Five backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b8_lamatath    (140's) the caravan's halt at dusk: copper sky, the grass in waves, the road, the wagons in a ring, the fire
     b8_c5_night    the halt at night under thick stars; far off, long lines in the grass bending westward and small dark running shapes
     b8_c5_wash     a dry wash by day: grey stone banks, the cart and its mule on the stones (empty, or gone, once the peddler is settled)
     b8_c5_wayhouse a burned wayhouse on a copper rise: three black walls and a beam; the city's glow on the sky to the west
     b8_c5_gate     the east wall at dusk with its lanterns and masks, the gate open and lit; to the right the plain going dark, and very far
                    off on it four torch-sparks on tall poles and one figure
   The chapter's gear in the series' 200×150 item style, on Book Eight's ground: night slate-blue (#2a3038 → #0a0c10), gas-blue rim light. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* the outrider: cropped hair, a grass-coloured cloak over plains leathers, a short horn bow slung at her back */
  b8_c5_outrider(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.02);
    B2F.line(ctx, '#5a4028', 1.2, [[-6.4, -10], [-8.6, -2], [-6.6, 6]]); B2F.line(ctx, 'rgba(220,210,190,.6)', .5, [[-6.2, -9.6], [-6.4, 5.6]]); // the bow at her back
    h.legs('#3a3024'); h.torso('#6a5a3e', '#2e2618', 6);
    poly(ctx, [[-7,-6],[7,-6],[8.4,9],[-8.4,9]], h.armor('#a8a070', '#4e5236')); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-.5, -5, 1, 13); // the cloak, pale gold over grey-green
    ctx.fillStyle = 'rgba(200,190,130,.35)'; for (let i = 0; i < 4; i++) ctx.fillRect(-7 + i*3.6, 6 + (i % 2), 2.2, .8); // grass-light along its hem
    ctx.fillStyle = '#5a4630'; ctx.fillRect(-5.6, 1.2, 11.2, 1); ctx.fillStyle = '#8a6a44'; ctx.fillRect(3, .6, 2, 2.2); // belt, a knife
    h.head('#9a7454', 4.3, -11.2); h.look('rgba(26,16,10,.85)', -11.4);
    ctx.fillStyle = '#2a2420'; ctx.beginPath(); ctx.arc(0, -12.6, 4.4, Math.PI*1.05, Math.PI*1.95); ctx.fill(); // hair cropped to the skull
    ctx.restore(); },
  /* the peddler: a good travelling coat, a careful smile, clean hands round a stoppered jug held to the chest */
  b8_c5_peddler(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1);
    h.legs('#2a2420'); B2F.robe(ctx, h, '#5a6070', '#22262e', 6.4, 7.4); // the coat, long and well cut
    ctx.fillStyle = '#8a7a5a'; ctx.fillRect(-6.4, -6, 12.8, 1.2); ctx.fillStyle = 'rgba(200,190,160,.5)'; ctx.fillRect(-1, -4, 1.2, 8); // the collar, the buttons' line
    ell(ctx, 1.4, 0, 2.8, 3.4, '#6a3a2a'); ctx.fillStyle = '#a07a50'; ctx.fillRect(.6, -4, 1.6, 1.4); ctx.fillStyle = 'rgba(140,60,80,.5)'; ctx.fillRect(.4, -3.2, 2, .6); // the jug, its wax stopper, a sticky stain at the neck
    ctx.fillStyle = '#c8a888'; ctx.fillRect(-2.4, -.6, 2.2, 2); ctx.fillRect(3.4, -.6, 2, 2); // clean hands
    h.head('#b8967a', 4.2, -11.2); h.look('rgba(26,16,10,.85)', -11.4); B2F.line(ctx, 'rgba(60,30,20,.7)', .5, [[-1.6, -8.6], [0, -8], [1.6, -8.6]]); // the smile
    ctx.fillStyle = '#3a3028'; ctx.beginPath(); ctx.arc(0, -12.6, 4.4, Math.PI, Math.PI*2); ctx.fill(); ctx.fillStyle = '#2a2a30'; ctx.fillRect(-5, -14.6, 10, 1.4); ctx.fillRect(-3.4, -17.4, 6.8, 3); // a travelling hat
    ctx.restore(); },
  /* old Benna: sleeves rolled to the shoulder, an apron, her tubs on her back in a corded bundle */
  b8_c5_benna(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, .94);
    poly(ctx, [[-7,-9],[5,-9],[6,2],[-8,2]], '#5a4a36'); ell(ctx, -1, -9, 6, 2, '#6a5a44'); B2F.line(ctx, '#2a2014', .8, [[-7, -4], [5.6, -4]]); // the tubs, corded, on her back
    B2F.robe(ctx, h, '#7a5a4a', '#3a2a22', 6, 7.6); poly(ctx, [[-4.4,-2],[4.4,-2],[5.4,11],[-5.4,11]], '#bab09a'); // a dark skirt, the apron
    ctx.fillStyle = '#b08a6a'; ctx.fillRect(-7.6, -5, 2, 6); ctx.fillRect(5.6, -5, 2, 6); // bare arms, sleeves rolled
    h.head('#a8826a', 4.2, -10.8); h.look('rgba(26,16,10,.85)', -11);
    ctx.fillStyle = '#cfc8bc'; ctx.beginPath(); ctx.arc(0, -12, 4.5, Math.PI*.95, Math.PI*2.05); ctx.fill(); ell(ctx, 0, -16.2, 2.4, 1.8, '#c8c0b4'); // white hair in a knot
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* the Lamatath sky: copper at dusk, slate-blue at night, plain blue-grey by day */
function b85Sky(x, W, hz, kind){ const st = kind === 'night' ? [[0,'#04060c'],[.6,'#0a1020'],[1,'#18223a']] : kind === 'day' ? [[0,'#6a84a4'],[.7,'#a8b8c4'],[1,'#d8d4c0']] : [[0,'#1e2638'],[.45,'#5a4a5a'],[.8,'#b8704a'],[1,'#e8a868']];
  x.fillStyle = vgrad(x, 0, hz, st); x.fillRect(0, 0, W, hz + 2); }
/* the long grass to the horizon, in bands, darker toward the viewer; t moves the waves (pass 0 for still) */
function b85Grass(ctx, W, H, hz, t, kind){ const N = kind === 'night', D = kind === 'day';
  ctx.fillStyle = vgrad(ctx, hz, H, N ? [[0,'#141a18'],[1,'#060807']] : D ? [[0,'#b8ac78'],[.5,'#8a8a54'],[1,'#5a5a36']] : [[0,'#b08850'],[.35,'#7a6440'],[.75,'#4a3e28'],[1,'#26201a']]); ctx.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 9; i++) { const k = (i + 1)/10, yy = hz + Math.pow(k, 1.6)*(H - hz), ph = t ? t/(2600 - i*120) : 0; // waves going over the grass
    ctx.fillStyle = N ? `rgba(120,140,170,${(.03 + k*.02).toFixed(3)})` : D ? `rgba(240,226,170,${(.06 + k*.03).toFixed(3)})` : `rgba(240,170,100,${(.05 + k*.03).toFixed(3)})`;
    ctx.beginPath(); ctx.moveTo(0, yy); for (let j = 0; j <= 24; j++) { const px = j/24*W; ctx.lineTo(px, yy - Math.sin(j*.7 + ph + i)*(1 + k*4) - k*3); } ctx.lineTo(W, yy + 2 + k*4); ctx.lineTo(0, yy + 2 + k*4); ctx.closePath(); ctx.fill(); } }
/* tall grass stems in the near ground, swaying */
function b85Stems(ctx, W, H, y0, t, mo, kind, n = 60, seed = 8501){ const N = kind === 'night', D = kind === 'day';
  for (let i = 0; i < n; i++) { const px = hash(i, seed)*W, by = y0 + hash(i, seed + 1)*(H - y0), l = H*(.05 + hash(i, seed + 2)*.07)*(.5 + (by - y0)/(H - y0)), sw = mo ? Math.sin(t/900 + i*.7)*l*.12 : 0;
    ctx.strokeStyle = N ? 'rgba(40,52,48,.8)' : D ? (i % 3 ? '#9a9258' : '#c8bc80') : (i % 3 ? '#5a4a30' : '#a07848'); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px, by); ctx.quadraticCurveTo(px + sw*.5, by - l*.6, px + sw + l*.12, by - l); ctx.stroke(); } }
/* the road: two ruts going away to the horizon from the viewer's left-bottom */
function b85Road(x, W, H, hz, x0, x1, col){ x.strokeStyle = col; x.lineWidth = 2; for (const d of [-1, 1]) { x.beginPath(); x.moveTo(x0 + d*W*.05, H); x.quadraticCurveTo((x0 + x1)/2 + d*W*.02, hz + (H - hz)*.35, x1 + d*W*.004, hz + 2); x.stroke(); } }
/* the city far off: a long low wall-line on the horizon, and a blue glow over it */
function b85City(x, cx, hz, w, a){ x.fillStyle = '#0a0c12'; x.fillRect(cx - w/2, hz - 3, w, 4); for (let i = 0; i < 6; i++) x.fillRect(cx - w/2 + hash(i, 8550)*w, hz - 3 - 2 - hash(i, 8551)*5, 2, 4 + hash(i, 8551)*5);
  glow(x, cx, hz, w*.9, '#6a9ae0', a); }

/* ---------------- the grounds ---------------- */
function b85Ground(ctx, ch, x, y, T, N, day){
  const own = 'rtpmxHGL'.includes(ch); b2Clip(ctx, x, y, T, () => b3c2Plain(ctx, own ? (ch === 'r' || ch === 'm' || ch === 'L' || ch === 'p' ? '.' : ',') : ch, x, y, T, N));
  const px = x*T, py = y*T, h = hash(x, y, 85);
  ctx.fillStyle = day ? 'rgba(200,170,90,.10)' : 'rgba(150,96,60,.08)'; ctx.fillRect(px, py, T, T); // late in the season: the grass gone gold; at dusk, copper
  if (ch === 'r') { const hz = b2Tile(x - 1, y) === 'r' || b2Tile(x + 1, y) === 'r' || '<>'.includes(b2Tile(x - 1, y) || '') || '<>'.includes(b2Tile(x + 1, y) || '');
    ctx.fillStyle = N ? 'rgba(40,34,28,.55)' : 'rgba(150,126,90,.55)'; if (hz) ctx.fillRect(px, py + T*.24, T, T*.52); else ctx.fillRect(px + T*.24, py, T*.52, T);
    ctx.strokeStyle = N ? 'rgba(10,8,6,.6)' : 'rgba(90,70,44,.6)'; ctx.lineWidth = Math.max(1, T*.04); ctx.beginPath();
    if (hz) { ctx.moveTo(px, py + T*.36); ctx.lineTo(px + T, py + T*.36); ctx.moveTo(px, py + T*.64); ctx.lineTo(px + T, py + T*.64); } else { ctx.moveTo(px + T*.36, py); ctx.lineTo(px + T*.36, py + T); ctx.moveTo(px + T*.64, py); ctx.lineTo(px + T*.64, py + T); } ctx.stroke(); }
  else if (ch === 't') { ell(ctx, px + T*.5, py + T*.8, T*.36, T*.08, 'rgba(0,0,0,.35)'); // a tussock, or a tumbled stone
    if (h > .5) { ell(ctx, px + T*.5, py + T*.62, T*.3, T*.2, N ? '#2e3036' : '#8a8478'); ell(ctx, px + T*.42, py + T*.56, T*.14, T*.08, N ? '#454852' : '#b8b2a4'); }
    else for (let i = 0; i < 12; i++) { const a = -.9 + i/11*1.8, l = T*(.34 + hash(x, y, i)*.16); ctx.strokeStyle = i % 3 ? (N ? '#2a3a30' : '#8a8a50') : (N ? '#3e5244' : '#c8c08a'); ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(px + T*.5, py + T*.8); ctx.quadraticCurveTo(px + T*.5 + Math.sin(a)*l*.3, py + T*.8 - l*.6, px + T*.5 + Math.sin(a)*l, py + T*.8 - Math.cos(a)*l); ctx.stroke(); } }
  else if (ch === 'p') { const empty = !!(S && S.f && S.f.b8_c5_peddler); ell(ctx, px + T*.5, py + T*.86, T*.46, T*.08, 'rgba(0,0,0,.4)'); // the peddler's cart
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(px + T*.08, py + T*.48, T*.84, T*.16); B2F.line(ctx, '#2a1e14', Math.max(1, T*.04), [[px + T*.9, py + T*.56], [px + T*1.04, py + T*.5]]);
    ell(ctx, px + T*.28, py + T*.74, T*.12, T*.12, '#120c08'); ell(ctx, px + T*.72, py + T*.74, T*.12, T*.12, '#120c08');
    if (!empty) for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { const jx = px + T*(.2 + i*.19), jy = py + T*(.42 - r*.12); ell(ctx, jx, jy, T*.07, T*.08, r ? '#4a2a22' : '#5a3226'); ctx.fillStyle = '#8a6a4a'; ctx.fillRect(jx - T*.02, jy - T*.12, T*.04, T*.04); }
    else { ctx.fillStyle = 'rgba(120,96,60,.6)'; ctx.fillRect(px + T*.12, py + T*.42, T*.76, T*.06); ell(ctx, px + T*.5, py + T*.9, T*.36, T*.06, 'rgba(70,24,36,.35)'); } } // wet straw, a dark stain on the stones
  else if (ch === 'm') { ell(ctx, px + T*.5, py + T*.86, T*.24, T*.06, 'rgba(0,0,0,.4)'); ctx.save(); ctx.translate(px + T*.5, py + T*.84); ctx.rotate(.1); // a leaning milestone
    poly(ctx, [[-T*.14, 0], [-T*.12, -T*.56], [0, -T*.66], [T*.12, -T*.56], [T*.14, 0]], N ? '#3a3c42' : '#9a968a'); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-T*.06, -T*.44, T*.12, T*.03); ctx.fillRect(-T*.06, -T*.36, T*.1, T*.03);
    if (S && S.f && S.f.b8_c5_chalk) { ctx.strokeStyle = 'rgba(240,236,220,.85)'; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); ctx.moveTo(-T*.08, -T*.16); ctx.lineTo(T*.02, -T*.16); ctx.moveTo(-T*.06, -T*.1); ctx.quadraticCurveTo(0, -T*.14, T*.06, -T*.08); ctx.stroke(); }
    ctx.restore(); }
  else if (ch === 'x') { ctx.fillStyle = N ? '#0c0a0a' : '#1a1412'; ctx.fillRect(px, py + T*.1, T, T*.9); // the wayhouse's burned walls
    ctx.fillStyle = 'rgba(0,0,0,.4)'; for (let i = 0; i < 3; i++) ctx.fillRect(px, py + T*(.3 + i*.24), T, T*.03);
    ctx.fillStyle = N ? 'rgba(90,40,24,.25)' : 'rgba(120,60,30,.25)'; ctx.fillRect(px + T*h*.6, py + T*.1, T*.2, T*.06); ctx.fillStyle = 'rgba(200,190,170,.06)'; ctx.fillRect(px, py + T*.1, T, T*.04); }
  else if (ch === 'H') { ctx.fillStyle = vgrad(ctx, py, py + T, [[0,'#1a1e28'],[1,'#0c0e14']]); ctx.fillRect(px, py, T, T); // the city wall, its top lit by the lanterns
    ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 1; for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(px, py + T*i/3); ctx.lineTo(px + T, py + T*i/3); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(px + T*(x % 2 ? .3 : .7), py); ctx.lineTo(px + T*(x % 2 ? .3 : .7), py + T/3); ctx.stroke();
    if (x % 3 === 1) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, px + T*.5, py + T*.1, T*.6, '#e8a040', .22); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = 'rgba(255,210,120,.9)'; ctx.fillRect(px + T*.46, py + T*.04, T*.08, T*.1); } }
  else if (ch === 'G') { ctx.fillStyle = '#0c0e14'; ctx.fillRect(px, py, T, T); ctx.fillStyle = 'rgba(255,200,120,.55)'; ctx.beginPath(); ctx.moveTo(px + T*.12, py + T); ctx.lineTo(px + T*.12, py + T*.4); ctx.quadraticCurveTo(px + T*.5, py + T*.02, px + T*.88, py + T*.4); ctx.lineTo(px + T*.88, py + T); ctx.fill(); // the gate open, and the city lit beyond
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, px + T*.5, py + T*.7, T*.9, '#7aa8f0', .2); glow(ctx, px + T*.5, py + T*.8, T*.7, '#e8a040', .2); ctx.globalCompositeOperation = 'source-over'; }
  else if (ch === 'L') { ell(ctx, px + T*.5, py + T*.86, T*.16, T*.05, 'rgba(0,0,0,.4)'); ctx.fillStyle = '#1a140e'; ctx.fillRect(px + T*.47, py + T*.2, T*.06, T*.66); // a lantern on its pole
    ctx.fillStyle = 'rgba(255,210,120,.95)'; ctx.fillRect(px + T*.42, py + T*.1, T*.16, T*.14); ctx.globalCompositeOperation = 'lighter'; glow(ctx, px + T*.5, py + T*.17, T*.9, '#e8a040', .28); ctx.globalCompositeOperation = 'source-over'; }
}
TILEX.b8_c5_grass = (ctx, ch, x, y, T, dark) => b85Ground(ctx, ch, x, y, T, true, false);
TILEX.b8_c5_day = (ctx, ch, x, y, T, dark) => b85Ground(ctx, ch, x, y, T, !!dark, true);

/* ---------------- the backdrops ---------------- */
/* the caravan's halt at dusk (140's caption: long grass to the horizon, a road through it, and the light going) */
SCENEX.b8_lamatath = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5;
  ctx.drawImage(sceneLayer('b85:lam', W, H, (x, W, H) => {
    b85Sky(x, W, hz, 'dusk'); glow(x, W*.18, hz - H*.02, W*.3, '#ffb070', .35); ell(x, W*.18, hz - H*.015, H*.03, H*.03, 'rgba(255,200,140,.9)'); // the sun going down in the west, left
    for (let i = 0; i < 5; i++) ell(x, W*(.3 + hash(i, 8511)*.6), H*(.08 + hash(i, 8512)*.2), W*(.08 + hash(i, 8513)*.1), H*.012, 'rgba(240,170,120,.25)'); // high thin cloud lit from under
  }), 0, 0, W, H);
  b85Grass(ctx, W, H, hz, mo ? t : 0, 'dusk');
  b85Road(ctx, W, H, hz, W*.34, W*.3, 'rgba(40,30,20,.45)'); b85Stems(ctx, W, H, hz + H*.04, t, mo, 'dusk', 120, 8515);
  [[.56, .64, .7], [.7, .62, .66], [.84, .66, .74], [.62, .74, .9], [.9, .76, .96]].forEach(([u, v, s], i) => b82Wagon(ctx, W*u, H*v, s*H/200, true, false)); // the wagons in a ring
  b84Fire(ctx, W*.74, H*.82, H/300, t);
  b85Stems(ctx, W, H, H*.72, t, mo, 'dusk', 70);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.18 + i*Math.min(.06, .34/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .62, .5); };

/* the halt at night: thick stars, the wagons dark in their ring; far off the grass bending in long lines westward (left) and small dark
   running shapes at the edge of it, never near, never turned toward the wagons */
SCENEX.b8_c5_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.52;
  ctx.drawImage(sceneLayer('b85:night', W, H, (x, W, H) => {
    b85Sky(x, W, hz, 'night');
    for (let i = 0; i < 260; i++) { const sx = hash(i, 8520)*W, sy = Math.pow(hash(i, 8521), 1.3)*hz*.96, b = hash(i, 8522); x.fillStyle = `rgba(230,236,255,${(.25 + b*.65).toFixed(2)})`; x.fillRect(sx, sy, b > .9 ? 1.6 : 1, b > .9 ? 1.6 : 1); }
    glow(x, W*.08, hz, W*.2, '#4a6aa0', .08); // the city's glow, very faint, under the western edge
  }), 0, 0, W, H);
  b85Grass(ctx, W, H, hz, mo ? t : 0, 'night');
  // the long lines: grass laid over flat in bands, westward, a little nearer each breath
  for (let k = 0; k < 4; k++) { const y = hz + H*(.04 + k*.03), run = mo ? ((t/1400 + k*.27) % 1) : .25 + k*.17, x0 = W*(1 - run*1.2);
    ctx.strokeStyle = 'rgba(150,170,200,.16)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + W*.3, y + 1); ctx.stroke();
    // the shape at the head of the line: low, long, dark, head down; far off
    const sx = x0, s = H/260*(1 + k*.12); ctx.fillStyle = '#020304'; ctx.beginPath(); ctx.ellipse(sx, y - 3*s, 9*s, 3*s, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(sx - 9*s, y - 2*s, 3.4*s, 2.4*s, .2, 0, 7); ctx.fill();
    const g = mo ? Math.sin(t/90 + k)*2*s : 0; ctx.fillRect(sx - 6*s + g, y - 1*s, 1.6*s, 3*s); ctx.fillRect(sx + 5*s - g, y - 1*s, 1.6*s, 3*s); }
  [[.5, .7, .8], [.66, .68, .74], [.82, .72, .86], [.36, .74, .9]].forEach(([u, v, s]) => b82Wagon(ctx, W*u, H*v, s*H/200, false, false)); // the wagons dark
  { const fx = W*.62, fy = H*.86; ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, H*.12, '#ff7a30', .2*(mo ? b2Fl(t) : 1)); ctx.globalCompositeOperation = 'source-over'; ell(ctx, fx, fy, 6, 2, 'rgba(255,120,50,.8)'); } // embers
  b85Stems(ctx, W, H, H*.76, t, mo, 'night', 60, 8530);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.2 + i*Math.min(.06, .34/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .7, .5); };

/* the dry wash by day: grey stone banks, the road down and up; the cart on the stones with its mule (empty once the peddler is settled,
   gone on west if he was let go), the peddler by it, the drinker sitting behind */
SCENEX.b8_c5_wash = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, pd = S && S.f && S.f.b8_c5_peddler;
  ctx.drawImage(sceneLayer('b85:wash', W, H, (x, W, H) => {
    b85Sky(x, W, hz, 'day'); for (let i = 0; i < 4; i++) ell(x, W*(.1 + hash(i, 8540)*.8), H*(.1 + hash(i, 8541)*.16), W*(.1 + hash(i, 8542)*.1), H*.02, 'rgba(250,248,240,.5)');
    b85Grass(x, W, H, hz, 0, 'day');
    poly(x, [[0, H*.62], [W*.28, H*.58], [W*.4, H*.66], [W*.6, H*.66], [W*.74, H*.58], [W, H*.6], [W, H], [0, H]], '#8a8478'); // the banks, grey stone
    poly(x, [[W*.2, H], [W*.36, H*.7], [W*.64, H*.7], [W*.8, H]], '#a8a296'); // the wash floor, pale stones
    for (let i = 0; i < 60; i++) { const sx = W*(.24 + hash(i, 8543)*.52), sy = H*(.72 + hash(i, 8544)*.26); ell(x, sx, sy, 2 + hash(i, 8545)*5, 1 + hash(i, 8545)*2, i % 3 ? 'rgba(80,76,68,.35)' : 'rgba(220,214,200,.4)'); }
    for (let i = 0; i < 14; i++) { const sx = hash(i, 8546)*W, sy = H*(.6 + hash(i, 8547)*.3); if (sx > W*.3 && sx < W*.7) continue; ell(x, sx, sy, 6 + hash(i, 8548)*10, 3 + hash(i, 8548)*4, 'rgba(60,58,52,.35)'); } // boulders on the banks
  }), 0, 0, W, H);
  if (pd !== 'let') { const cx = W*.38, by = H*.84, s = H/150; ell(ctx, cx, by + 2*s, 30*s, 4*s, 'rgba(0,0,0,.3)'); // the cart
    ctx.fillStyle = '#4a3420'; ctx.fillRect(cx - 24*s, by - 14*s, 44*s, 8*s); [[-14], [12]].forEach(([d]) => { ctx.strokeStyle = '#2a1c10'; ctx.lineWidth = 2*s; ctx.beginPath(); ctx.arc(cx + d*s, by - 4*s, 6*s, 0, 7); ctx.stroke(); });
    if (!pd) for (let r = 0; r < 2; r++) for (let i = 0; i < 8; i++) { const jx = cx - 20*s + i*5.4*s, jy = by - 17*s - r*6*s; ell(ctx, jx, jy, 2.4*s, 3*s, r ? '#5a3226' : '#6a3a2a'); ctx.fillStyle = '#a07a50'; ctx.fillRect(jx - .8*s, jy - 4.4*s, 1.6*s, 1.2*s); }
    else { ctx.fillStyle = '#7a6a48'; ctx.fillRect(cx - 22*s, by - 16*s, 40*s, 2*s); ell(ctx, cx - 6*s, by + 4*s, 26*s, 4*s, 'rgba(80,30,40,.3)'); } // wet straw; the stain on the stones
    // the mule in the shafts, head down
    { const mx = cx + 34*s, my = by - 6*s; ctx.fillStyle = '#5a4a3e'; ctx.beginPath(); ctx.ellipse(mx, my, 10*s, 5*s, 0, 0, 7); ctx.fill(); ctx.fillRect(mx - 7*s, my, 2*s, 9*s); ctx.fillRect(mx + 5*s, my, 2*s, 9*s); ctx.beginPath(); ctx.ellipse(mx + 12*s, my + 3*s, 3*s, 2.4*s, .6, 0, 7); ctx.fill(); ctx.fillRect(mx + 11*s, my - 3*s, 1*s, 3*s); }
    if (!pd) { drawFigure(ctx, 'b8_c5_peddler', W*.2, H*.92, 1.5, t, {dir:1, still:true}); drawFigure(ctx, 'b4_c2_pilgrim', W*.1, H*.86, 1.2, t, {dir:1, phase:1}); } }
  else { ctx.strokeStyle = 'rgba(90,70,44,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W*.36, H*.96); ctx.quadraticCurveTo(W*.3, H*.72, W*.12, H*.6); ctx.stroke(); } // the cart's ruts, going on west
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.72 + i*Math.min(.05, .26/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .45, .5); };

/* the burned wayhouse on its rise at the last day's end: copper grass, three black walls and a roof beam, the city's glow ahead (west) */
SCENEX.b8_c5_wayhouse = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.56, done = !!(S && S.f && S.f.b8_c5_knivesDone);
  ctx.drawImage(sceneLayer('b85:way', W, H, (x, W, H) => {
    b85Sky(x, W, hz, 'dusk'); glow(x, W*.1, hz, W*.24, '#ffa060', .3); b85City(x, W*.1, hz, W*.16, .18); // the city far off ahead, its blue fire coming up
    x.fillStyle = '#4a3a28'; x.beginPath(); x.moveTo(0, hz + H*.02); x.quadraticCurveTo(W*.55, hz - H*.14, W, hz + H*.04); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill(); // the rise
    // the wayhouse: three walls, the fourth gone, a beam across
    const wx = W*.58, wy = hz - H*.06, s = H/150, k = '#0c0a0a';
    poly(x, [[wx - 30*s, wy + 2*s], [wx - 30*s, wy - 34*s], [wx - 24*s, wy - 36*s], [wx - 24*s, wy + 2*s]], k); // the left wall, whole to the eaves
    poly(x, [[wx - 24*s, wy], [wx - 24*s, wy - 30*s], [wx + 2*s, wy - 32*s], [wx + 8*s, wy - 22*s], [wx + 20*s, wy - 24*s], [wx + 20*s, wy]], '#100c0c'); // the back wall, broken along its top
    x.fillStyle = 'rgba(255,170,100,.45)'; x.fillRect(wx - 12*s, wy - 22*s, 7*s, 9*s); // the window gap, the sky through it
    poly(x, [[wx + 20*s, wy + 2*s], [wx + 20*s, wy - 20*s], [wx + 27*s, wy - 14*s], [wx + 26*s, wy - 6*s], [wx + 28*s, wy + 2*s]], k); // the right wall, half fallen
    x.strokeStyle = k; x.lineWidth = 2.6*s; x.beginPath(); x.moveTo(wx - 34*s, wy - 33*s); x.lineTo(wx + 32*s, wy - 27*s); x.stroke(); // the roof beam, the only one left
    for (let i = 0; i < 7; i++) { x.fillStyle = k; x.fillRect(wx - 34*s + hash(i, 8565)*64*s, wy + hash(i, 8566)*3*s, (2 + hash(i, 8567)*3)*s, (1.4 + hash(i, 8568))*s); } // fallen stones
    x.fillStyle = '#6a6458'; x.fillRect(W*.22, hz + H*.14, 4*s, 10*s); // the milestone down by the road
    b85Road(x, W, H, hz + H*.04, W*.1, W*.04, 'rgba(30,22,14,.4)');
  }), 0, 0, W, H);
  b85Stems(ctx, W, H, H*.64, t, mo, 'dusk', 80, 8560);
  if (!done) { const s = H/150, bx = W*.58 + 8*s, by = H*.56 - H*.06 - 29.6*s; ctx.fillStyle = '#060506'; ctx.fillRect(bx, by - 5*s, 2.4*s, 5*s); ell(ctx, bx + 1.2*s, by - 6.4*s, 1.4*s, 1.6*s, '#060506'); B2F.line(ctx, '#060506', .8*s, [[bx + 2*s, by - 3*s], [bx + 6*s, by - 4*s]]); } // a man on the beam with a bow
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.24 + i*Math.min(.06, .34/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .6, .5); };

/* Darujhistan's east gate at dusk on the Fete's last day: the wall high and dark across the left of the picture with lanterns along its top
   and masks among them (ovals, bird and moon colours), the gate open and lit; the city's blue fire over the wall; to the right the plain
   going dark, and very far off on it four torch-sparks on tall poles with one small upright figure among them, never nearer than this */
SCENEX.b8_c5_gate = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.6;
  ctx.drawImage(sceneLayer('b85:gate', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#0a1020'],[.6,'#1e2a44'],[1,'#4a3e4a']]); x.fillRect(0, 0, W, hz + 2);
    glow(x, W*.3, H*.18, W*.5, '#6a9ae0', .32); // the city's blue fire over the wall
    x.fillStyle = vgrad(x, hz, H, [[0,'#1a1a18'],[1,'#080807']]); x.fillRect(0, hz, W, H - hz);
    // the plain to the right, going dark; the far crossroads: four torch-poles and one figure, tiny
    x.fillStyle = '#121418'; x.fillRect(W*.66, hz - 2, W*.34, 3);
    const cx = W*.86, cy = hz - 1; [[-6], [-2], [2], [6]].forEach(([d]) => { x.fillStyle = '#050506'; x.fillRect(cx + d - .3, cy - 8, .7, 8); });
    x.fillStyle = '#050506'; x.fillRect(cx - .4, cy - 3.4, .9, 3.2); ell(x, cx, cy - 3.9, .5, .55, '#050506'); // the figure
    // the wall
    x.fillStyle = '#0e1018'; x.fillRect(0, H*.18, W*.68, hz - H*.18 + H*.12); for (let i = 0; i < 12; i++) x.fillRect(i*W*.058, H*.15, W*.034, H*.04); // battlements
    x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 1; for (let r = 0; r < 9; r++) { const y = H*.24 + r*H*.05; x.beginPath(); x.moveTo(0, y); x.lineTo(W*.68, y); x.stroke(); }
    // the gate
    x.fillStyle = '#04050a'; x.beginPath(); x.moveTo(W*.24, hz + H*.12); x.lineTo(W*.24, H*.42); x.quadraticCurveTo(W*.34, H*.3, W*.44, H*.42); x.lineTo(W*.44, hz + H*.12); x.fill();
    x.fillStyle = 'rgba(255,200,120,.5)'; x.beginPath(); x.moveTo(W*.26, hz + H*.12); x.lineTo(W*.26, H*.44); x.quadraticCurveTo(W*.34, H*.33, W*.42, H*.44); x.lineTo(W*.42, hz + H*.12); x.fill();
    glow(x, W*.34, hz, W*.2, '#e8a040', .3); glow(x, W*.34, H*.4, W*.14, '#7aa8f0', .2);
    b82Wagon(x, W*.56, H*.84, H/170, true, false); b82Wagon(x, W*.72, H*.86, H/160, true, false);
  }), 0, 0, W, H);
  // the lanterns along the wall-top, breathing, and the masks among them
  for (let i = 0; i < 9; i++) { const lx = W*(.04 + i*.075), ly = H*.17, fl = mo ? .82 + .12*Math.sin(t/260 + i*1.7) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.06, '#e8a040', .3*fl); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = `rgba(255,210,120,${(.9*fl).toFixed(2)})`; ctx.fillRect(lx - 1.5, ly - 2, 3, 4);
    if (i % 2) { const mx = lx + W*.03, my = H*.155 + (mo ? Math.sin(t/700 + i)*1 : 0); ell(ctx, mx, my, 3.2, 3.8, ['#d8c8a0', '#a8c0e0', '#c89070', '#e0d8c8'][i % 4]); ctx.fillStyle = '#0a0a10'; ctx.fillRect(mx - 1.8, my - 1, 1.2, .8); ctx.fillRect(mx + .6, my - 1, 1.2, .8); } }
  // the far torches: four sparks, steady
  { const cx = W*.86, cy = H*.6 - 9; [[-6], [-2], [2], [6]].forEach(([d], i) => { const f = mo ? .8 + .2*Math.sin(t/180 + i*2.1) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx + d, cy, 6, '#ff9a40', .5*f); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = `rgba(255,200,120,${f.toFixed(2)})`; ctx.fillRect(cx + d - .6, cy - .6, 1.2, 1.2); }); }
  if (S && S.f && !S.f.b8_c5_mallet) drawFigure(ctx, 'b8_c1_benlo', W*.5, H*.9, 1.4, t, {dir:-1, still:true});
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.6 + i*Math.min(.05, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .6, .5); };

/* ---------------- the chapter's gear (200×150, Book Eight's ground: night slate-blue, gas-blue rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#2a3038"/><stop offset=".62" stop-color="#161a20"/><stop offset="1" stop-color="#0a0c10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* a peddler's pack: oiled leather, pockets on pockets, a strap, and a dark stain at the deepest pocket's seam */
  ART['item/b8_c5_peddlerpack'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A peddler's pack">${bg('b85pp')}
<linearGradient id="b85pp-l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a6a44"/><stop offset=".6" stop-color="#5a4028"/><stop offset="1" stop-color="#2e2014"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b85pp-bg)"/><ellipse cx="100" cy="124" rx="66" ry="8" fill="url(#b85pp-sh)"/>
<path d="M70 30 Q100 14 130 30" stroke="#3a2a18" stroke-width="6" fill="none" stroke-linecap="round"/>
<rect x="56" y="36" width="88" height="84" rx="10" fill="url(#b85pp-l)" stroke="#1a120a" stroke-width="1.4"/>
<path d="M56 54 Q100 64 144 54 L144 40 Q100 30 56 40 Z" fill="#6a5034" stroke="#1a120a" stroke-width="1.2"/>
<rect x="64" y="70" width="30" height="26" rx="4" fill="#4e3822" stroke="#1a120a"/><rect x="106" y="70" width="30" height="26" rx="4" fill="#4e3822" stroke="#1a120a"/>
<rect x="74" y="100" width="52" height="16" rx="4" fill="#4a3420" stroke="#1a120a"/>
<path d="M64 76 h30 M106 76 h30 M74 106 h52" stroke="#2a1c10" stroke-width="1.4"/>
<circle cx="79" cy="60" r="3" fill="#a08a5a"/><circle cx="121" cy="60" r="3" fill="#a08a5a"/>
<path d="M118 116 Q122 122 128 118" stroke="#6a2a3a" stroke-width="3" fill="none" opacity=".7"/>
<path d="M58 40 L58 116" stroke="#8ab8ff" stroke-width=".9" opacity=".35"/>
<ellipse cx="100" cy="76" rx="56" ry="40" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c5_peddlerpack'] = [200, 150];
  /* a grass-dyed cloak: plains wool folded, pale gold over grey-green, a few grass-heads still caught in it */
  ART['item/b8_c5_grasscloak'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A grass-dyed cloak">${bg('b85gc')}
<linearGradient id="b85gc-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8bc80"/><stop offset=".5" stop-color="#9a9a62"/><stop offset="1" stop-color="#5a6042"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b85gc-bg)"/><ellipse cx="100" cy="122" rx="74" ry="9" fill="url(#b85gc-sh)"/>
<path d="M34 112 Q40 56 70 42 Q100 32 130 42 Q160 56 166 112 Q100 124 34 112 Z" fill="url(#b85gc-w)" stroke="#2a2a1a" stroke-width="1.3"/>
<path d="M54 108 Q62 70 82 52 M100 116 Q100 76 100 40 M146 108 Q138 70 118 52" stroke="#6a6a40" stroke-width="1.4" fill="none" opacity=".7"/>
<path d="M70 42 Q100 56 130 42 Q100 50 70 42 Z" fill="#7a7a4a"/>
<g stroke="#e0d49a" stroke-width="1.2" opacity=".8"><path d="M60 90 l6 -10"/><path d="M120 70 l4 -11"/><path d="M140 96 l7 -8"/></g>
<g fill="#e0d49a" opacity=".8"><ellipse cx="66" cy="79" rx="1.4" ry="3" transform="rotate(30 66 79)"/><ellipse cx="124" cy="58" rx="1.4" ry="3" transform="rotate(20 124 58)"/><ellipse cx="147" cy="87" rx="1.4" ry="3" transform="rotate(40 147 87)"/></g>
<path d="M36 110 Q42 58 70 44" stroke="#8ab8ff" stroke-width=".9" fill="none" opacity=".35"/>
<ellipse cx="100" cy="80" rx="62" ry="36" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c5_grasscloak'] = [200, 150];
  /* a plains raider's sword: a long single-edged blade with a cavalry curve, the grip wrapped in black rawhide, laid on the diagonal */
  ART['item/b8_c5_raidersword'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A plains raider's sword">${bg('b85rs')}
<linearGradient id="b85rs-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d0d4dc"/><stop offset=".5" stop-color="#8a8e98"/><stop offset="1" stop-color="#3a3c44"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b85rs-bg)"/><ellipse cx="100" cy="118" rx="78" ry="8" fill="url(#b85rs-sh)"/>
<path d="M58 106 Q110 96 150 54 Q164 38 176 24 Q166 46 156 60 Q116 108 62 114 Z" fill="url(#b85rs-b)" stroke="#16171c" stroke-width="1.2"/>
<path d="M64 108 Q114 98 152 58" stroke="#e8ecf4" stroke-width="1" fill="none" opacity=".6"/>
<rect x="46" y="104" width="16" height="12" rx="2" transform="rotate(-14 54 110)" fill="#5a4a30" stroke="#120c06"/>
<path d="M22 124 L50 112" stroke="#1a1410" stroke-width="9" stroke-linecap="round"/>
<path d="M26 120 l4 6 M33 117 l4 6 M40 114 l4 6" stroke="#3a2c20" stroke-width="1.4"/>
<circle cx="20" cy="125" r="5" fill="#3a3028" stroke="#120c06"/>
<path d="M60 108 Q112 98 150 56" stroke="#8ab8ff" stroke-width=".8" fill="none" opacity=".35"/>
<ellipse cx="100" cy="80" rx="70" ry="34" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c5_raidersword'] = [200, 150];
}
