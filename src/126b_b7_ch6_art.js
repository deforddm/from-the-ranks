/* ============ Book Seven, Chapter 6 art: Before the Walls — the field before Letheras, the ridge, the dome far off, the river landing, the walls at night ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d, lit from the left:
     b7_malregular  the Adjunct's regular seen from the Letherii side: a grey-green cloak over mail, a half-helm with cheek-pieces, a big
                    round shield rimmed in bronze, a short sword held low
     b7_malxbow     the same soldier with a heavy crossbow across the body and a quiver of quarrels at the hip, the shield slung behind
     b7_malsgt      a sergeant: heavier, the helm with a ridge, the cloak pinned at the shoulder with a bronze brooch, a whistle on a cord
   Ground (TILEX.b7_c6_field): Book Five's lines (b5_c6_lines: . , = F) with this chapter's marks: R the ridge's scree foot, ^ the ridge
   path between two posts, p the stake line facing the plain, > the plain's edge (a gap in the stakes and the plain beyond), W the walls of
   Letheras, G a gate.
   Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still), Book Five's blue-grey and lamp-gold gone to
   the field:
     b7_field     the field before Letheras: the plain cleared of its crop, the ridge on the right with the cadre's lamps along its crest and
                  two banners at its north end, the Letherii line with its fires and stakes, the Edur's grey camp out on the plain, and
                  far off a ring of foreign fires. Night (phase 1), dawn (phase 2 before the light), and after: the plain burned black in a
                  long fan from the ridge, the lamps out
     b7_c6_dome   the plain at dawn from the line, the ridge on the right, and far out on the horizon a dome of silver fire, small with
                  distance, with the white light off the ridge breaking over it like surf. Never nearer
     b7_river     the Lether River below the city: a broad river full of ships and boats, small grey-green soldiers coming off them into
                  the shallows, reeds and mud on the near bank, the Letherii line on it
     b7_c6_walls  the walls of Letheras at night from the road: towers black against smoke, a glow over one quarter, fires on the verges,
                  people coming out with handcarts
   Nothing grim close up: the dome is a coin of light on the horizon, the field a burn mark, the dead nowhere. The chapter's gear in Book
   Five's 240×130 style on dark canal-slate with a thin dock-gold rim (the Letherii's items). */

/* ---------------- the figures: the Adjunct's regulars ---------------- */
function b76aMal(ctx, h, t, o, kind){ ctx.save(); const sgt = kind === 'sgt', xb = kind === 'xbow'; if (sgt) B2F.grow(ctx, 1.04, 1.06);
  const sw = o.still ? 0 : Math.sin(t/460 + (o.phase || 0));
  // the cloak behind, grey-green, hanging past the knee
  poly(ctx, [[-6.4,-6],[6.4,-6],[7.6 + sw*.4,10.6],[-7.8 + sw*.4,10.6]], '#3e4a3a'); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(4.6, -5, 3, 15);
  h.legs('#2e2a24'); ctx.fillStyle = '#1e1a14'; ctx.fillRect(-4.6, 9.6, 3.6, 3.4); ctx.fillRect(1, 9.6, 3.6, 3.4); // boots
  // mail to the thigh, a leather belt
  poly(ctx, [[-6,-6],[6,-6],[6.4,6.4],[-6.4,6.4]], h.armor('#7a7e80', '#2e3234'));
  ctx.fillStyle = 'rgba(20,22,24,.45)'; for (let r = 0; r < 6; r++) for (let k = 0; k < 6; k++) ctx.fillRect(-5.4 + k*2 + (r % 2), -5 + r*1.9, .9, .9); // the rings
  ctx.fillStyle = 'rgba(220,226,230,.16)'; ctx.fillRect(-5.6, -5.4, 1.2, 10.6); // lit edge
  ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-6.4, 2.2, 12.8, 1.4); ell(ctx, 0, 2.9, .9, .7, '#a88a4a');
  // the cloak's front edges over the shoulders
  poly(ctx, [[-6.6,-6.4],[-3,-6.4],[-4.6,1],[-7,-1]], '#4a5644'); poly(ctx, [[6.6,-6.4],[3,-6.4],[4.6,1],[7,-1]], '#3a4636');
  if (sgt) { ell(ctx, -4.4, -5.6, 1.4, 1.2, '#b8944a'); ell(ctx, -4.4, -5.6, .6, .5, '#6a4a1e'); B2F.line(ctx, '#8a8070', .6, [[-1.4, -6.4], [1.6, -2], [3.4, -6.4]]); ctx.fillStyle = '#c8c4b8'; ctx.fillRect(1, -2.6, 1.4, 2); } // the brooch; a whistle on a cord
  // the head, a half-helm with cheek-pieces
  h.head('#b08a6a'); h.look('rgba(24,14,10,.86)');
  ctx.beginPath(); ctx.arc(0, -12, 5.3, Math.PI, 0); ctx.fillStyle = sgt ? '#5a5e60' : '#6a6e70'; ctx.fill(); ctx.fillRect(-5.8, -12.4, 11.6, 1.4);
  ctx.fillStyle = sgt ? '#4a4e50' : '#5a5e60'; ctx.fillRect(-5.4, -11.6, 1.8, 4.4); ctx.fillRect(3.6, -11.6, 1.8, 4.4); // the cheek-pieces
  ctx.fillStyle = 'rgba(255,250,240,.2)'; ctx.fillRect(-3.4, -16, 2.6, 1); if (sgt) { ctx.fillStyle = '#4a4e50'; ctx.fillRect(-.6, -17.6, 1.2, 5.6); } // a ridge on the sergeant's helm
  if (xb) { // the shield slung behind; a heavy crossbow across the body, a quiver at the hip
    ctx.beginPath(); ctx.arc(-5.4, -2, 5.6, 0, 7); ctx.fillStyle = 'rgba(60,72,56,.9)'; ctx.fill(); ctx.strokeStyle = '#8a6a34'; ctx.lineWidth = .8; ctx.stroke();
    ctx.fillStyle = '#4a3a24'; ctx.fillRect(5.6, 2, 2.4, 6); ctx.fillStyle = '#c8c4b8'; ctx.fillRect(5.8, 1, .5, 1.6); ctx.fillRect(6.8, 1, .5, 1.6); ctx.fillRect(7.6, 1, .4, 1.6);
    B2F.line(ctx, '#5a3e22', 1.8, [[-3, 1.8], [10.4, -2.6]]); // the stock
    B2F.line(ctx, '#3a3a3e', 1.4, [[8.4, -7.4], [10.6, -2.6], [11.4, 2.6]]); // the steel bow
    B2F.line(ctx, 'rgba(220,214,200,.7)', .5, [[8.4, -7.4], [6.4, -1.4], [11.4, 2.6]]); // the string, spanned
    ctx.fillStyle = '#b8b0a0'; ctx.fillRect(9.4, -3.6, 2.6, .6); // a quarrel on it
    ell(ctx, -2.6, 2, 1.2, 1.2, '#b08a6a'); ell(ctx, 6.4, -.8, 1.2, 1.2, '#b08a6a'); }
  else { // the big round shield on the near arm, grey-green with a bronze rim and boss; the short sword low in the far hand
    ctx.beginPath(); ctx.arc(-6.6, .4, sgt ? 6.8 : 6.4, 0, 7); ctx.fillStyle = h.armor('#5a6a52', '#222a20'); ctx.fill(); ctx.strokeStyle = '#a8843e'; ctx.lineWidth = 1.1; ctx.stroke();
    ell(ctx, -6.6, .4, 1.7, 1.7, '#b8944a'); ctx.fillStyle = 'rgba(230,236,220,.14)'; ctx.fillRect(-11.6, -3, 1.2, 6);
    B2F.line(ctx, '#cfc8b8', 1.3, [[6.6, 3.4], [10.2, -4.6]]); B2F.line(ctx, '#6b4f2a', 1.6, [[5.8, 5], [7, 2.4]]); ctx.fillStyle = '#a8843e'; ctx.fillRect(5.6, 2.6, 2.6, .8); } // the gladius-like blade, short, its guard bronze
  ctx.restore(); }
Object.assign(FIGX, {
  b7_malregular(ctx, h, t, o){ b76aMal(ctx, h, t, o, 'reg'); },
  b7_malxbow(ctx, h, t, o){ b76aMal(ctx, h, t, o, 'xbow'); },
  b7_malsgt(ctx, h, t, o){ b76aMal(ctx, h, t, o, 'sgt'); },
});

/* ---------------- the ground: Book Five's lines with the ridge, the stakes, the plain's edge, and the city's walls ---------------- */
TILEX.b7_c6_field = (ctx, ch, x, y, T, dark) => {
  if (!'R^p>WG'.includes(ch)) return TILEX.b5_c6_lines(ctx, ch, x, y, T, dark);
  TILEX.b5_c6_lines(ctx, ch === 'W' || ch === 'G' ? '.' : ',', x, y, T, dark);
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === 'R') { // the ridge's foot: scree and grass going up, darker to the top
      ctx.fillStyle = dark ? '#1a1c16' : '#5a5a46'; ctx.fillRect(px, py, T, T); ctx.fillStyle = dark ? 'rgba(0,0,0,.35)' : 'rgba(30,30,20,.3)'; ctx.fillRect(px, py, T, T*.45);
      for (let i = 0; i < 6; i++) { const sx = px + T*hash(x, y, 1261 + i), sy = py + T*(.3 + hash(x, y, 1267 + i)*.65); ell(ctx, sx, sy, T*.07, T*.05, dark ? '#3a3a34' : '#8a8670'); }
      ctx.fillStyle = dark ? 'rgba(80,90,60,.4)' : 'rgba(110,120,70,.5)'; for (let i = 0; i < 3; i++) ctx.fillRect(px + T*hash(x, y, 1273 + i), py + T*(.6 + i*.1), T*.12, T*.03); return; }
    if (ch === '^') { // the ridge path between two posts, a guard's lantern
      ctx.fillStyle = dark ? '#1a1c16' : '#5a5a46'; ctx.fillRect(px, py, T, T);
      ctx.fillStyle = dark ? 'rgba(110,100,80,.55)' : 'rgba(170,150,110,.7)'; ctx.beginPath(); ctx.moveTo(px + T*.3, py + T); ctx.lineTo(px + T*.44, py); ctx.lineTo(px + T*.6, py); ctx.lineTo(px + T*.74, py + T); ctx.closePath(); ctx.fill();
      ctx.fillStyle = dark ? '#2a2018' : '#4a3620'; ctx.fillRect(px + T*.16, py + T*.32, T*.08, T*.6); ctx.fillRect(px + T*.78, py + T*.32, T*.08, T*.6);
      if (dark) glow(ctx, px + T*.82, py + T*.3, T*.5, '#ffb060', .25); ctx.fillStyle = '#c9a35a'; ctx.fillRect(px + T*.79, py + T*.24, T*.06, T*.08); return; }
    if (ch === 'p' || ch === '>') { // the stake line: sharpened stakes planted at an angle toward the plain; '>' a gap and the plain beyond
      ctx.fillStyle = dark ? 'rgba(30,28,22,.5)' : 'rgba(120,110,80,.4)'; ctx.fillRect(px, py + T*.55, T, T*.45); // the plain past the stakes
      const st = ch === '>' ? [.08, .86] : [.12, .44, .76];
      st.forEach((k, i) => { const sx = px + T*k, sy = py + T*.78; ctx.strokeStyle = dark ? '#3a2e20' : '#6a4e30'; ctx.lineWidth = Math.max(1.2, T*.07); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + T*.1, py + T*.24); ctx.stroke();
        ctx.fillStyle = dark ? '#8a7a60' : '#c8b088'; ctx.beginPath(); ctx.moveTo(sx + T*.06, py + T*.3); ctx.lineTo(sx + T*.1, py + T*.2); ctx.lineTo(sx + T*.14, py + T*.3); ctx.closePath(); ctx.fill(); });
      if (ch === '>') { ctx.fillStyle = dark ? 'rgba(200,190,160,.18)' : 'rgba(255,240,200,.25)'; ctx.beginPath(); ctx.moveTo(px + T*.3, py + T); ctx.lineTo(px + T*.4, py + T*.3); ctx.lineTo(px + T*.6, py + T*.3); ctx.lineTo(px + T*.7, py + T); ctx.closePath(); ctx.fill(); }
      return; }
    // 'W' the walls of Letheras, 'G' a gate in them
    ctx.fillStyle = dark ? '#22242a' : '#6a6a6e'; ctx.fillRect(px, py, T, T);
    ctx.strokeStyle = dark ? 'rgba(0,0,0,.5)' : 'rgba(40,40,44,.5)'; ctx.lineWidth = 1; for (let r = 0; r < 4; r++) { const yy = py + T*(r + 1)/4; ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); ctx.stroke(); for (let k = 0; k < 2; k++) { const xx = px + T*((k + (r % 2)*.5)/2 + .25); ctx.beginPath(); ctx.moveTo(xx, yy - T/4); ctx.lineTo(xx, yy); ctx.stroke(); } }
    ctx.fillStyle = dark ? 'rgba(255,170,100,.06)' : 'rgba(255,255,240,.08)'; ctx.fillRect(px, py, T, T*.12);
    if (ch === 'G') { ctx.fillStyle = '#0a0806'; ctx.beginPath(); ctx.moveTo(px + T*.2, py + T); ctx.lineTo(px + T*.2, py + T*.4); ctx.quadraticCurveTo(px + T*.5, py + T*.12, px + T*.8, py + T*.4); ctx.lineTo(px + T*.8, py + T); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = dark ? '#4a4a50' : '#7a7a80'; ctx.lineWidth = Math.max(1, T*.03); for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(px + T*(.2 + i*.12), py + T*.34); ctx.lineTo(px + T*(.2 + i*.12), py + T); ctx.stroke(); } // the grating
      if (dark) glow(ctx, px + T*.5, py + T*.6, T*.5, '#ffa050', .18); } }); };

/* ---------------- backdrops ---------------- */
/* the mode of the field: night (phase 1), dawn (phase 2 before the light), after (the light is spent) */
const b76aMode = () => { const f = (S && S.f) || {}; if (f.b7_c6_dome) return 'after'; if ((f.b7_c6_ph || 1) >= 2) return 'dawn'; return 'night'; };
/* the still parts of the field: sky, the plain going out to the horizon, the ridge on the right, the line's tents and stakes */
function b76aField(x, W, H, mode){ const hz = H*.44, night = mode === 'night';
  x.fillStyle = vgrad(x, 0, hz, night ? [[0,'#0a0e1c'],[.7,'#1a1e30'],[1,'#2e2a34']] : mode === 'dawn' ? [[0,'#4a5a7a'],[.6,'#b8a8a4'],[1,'#e8c8a0']] : [[0,'#6a6a72'],[.6,'#a89a8a'],[1,'#c8b49a']]); x.fillRect(0, 0, W, hz + 2);
  if (night) for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 7611)*.45).toFixed(2)})`; x.fillRect(hash(i, 7612)*W, Math.pow(hash(i, 7613), 1.4)*hz*.85, 1, 1); }
  else for (let i = 0; i < 5; i++) { x.fillStyle = mode === 'dawn' ? 'rgba(250,220,200,.2)' : 'rgba(120,110,104,.22)'; x.beginPath(); x.ellipse(hash(i, 7614)*W, hz*(.2 + hash(i, 7615)*.4), W*.18, hz*.05, 0, 0, 7); x.fill(); }
  // the plain, flat to the horizon
  x.fillStyle = vgrad(x, hz, H, night ? [[0,'#1e1e1a'],[1,'#0e0e0a']] : mode === 'dawn' ? [[0,'#8a8064'],[1,'#4a4430']] : [[0,'#6a6252'],[1,'#3a3428']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 40; i++) { const yy = hz + Math.pow(hash(i, 7616), 1.6)*(H*.3); x.fillStyle = night ? 'rgba(60,56,44,.4)' : 'rgba(170,150,110,.3)'; x.fillRect(hash(i, 7617)*W, yy, 2 + hash(i, 7618)*W*.04, 1); } // stubble rows
  if (mode === 'after') { // the burn: a long black fan out from the ridge to the horizon, smoking
    x.fillStyle = 'rgba(20,16,14,.82)'; x.beginPath(); x.moveTo(W*.86, H*.62); x.lineTo(W*.28, hz + 1); x.lineTo(W*.5, hz + 1); x.lineTo(W*1.02, H*.86); x.closePath(); x.fill();
    x.fillStyle = 'rgba(80,60,40,.3)'; x.beginPath(); x.ellipse(W*.39, hz + 2, W*.04, H*.008, 0, 0, 7); x.fill(); } // the round unburned patch far off
  // the ridge: a long low rise on the right, the crest with lamp-posts and two banners at its north end
  const rt = H*.28; x.fillStyle = night ? '#121410' : mode === 'dawn' ? '#4a4a3a' : '#3e3a30'; x.beginPath(); x.moveTo(W*.5, hz + H*.02); x.quadraticCurveTo(W*.64, rt, W*.78, rt - H*.01); x.lineTo(W, rt + H*.02); x.lineTo(W, H*.7); x.lineTo(W*.5, H*.7); x.closePath(); x.fill();
  x.fillStyle = night ? 'rgba(255,255,255,.03)' : 'rgba(255,240,210,.1)'; x.beginPath(); x.moveTo(W*.6, rt + H*.06); x.quadraticCurveTo(W*.7, rt - H*.005, W*.78, rt - H*.01); x.lineTo(W*.8, rt + H*.02); x.closePath(); x.fill();
  for (let i = 0; i < 9; i++) { x.fillStyle = '#1a1612'; x.fillRect(W*(.66 + i*.035), rt - H*.025 + Math.abs(i - 3)*H*.002, 1, H*.025); } // the lamp-posts on the crest
  x.fillStyle = '#1a1a1e'; x.fillRect(W*.96, rt - H*.06, 1.2, H*.06); x.fillRect(W*.98, rt - H*.055, 1.2, H*.055); // the banner poles at the north end
  x.fillStyle = '#6a2a3a'; x.fillRect(W*.961, rt - H*.06, W*.016, H*.02); x.fillStyle = '#7a7a7a'; x.fillRect(W*.981, rt - H*.055, W*.014, H*.018); // the Chancellor's, and one gone grey
  // the line: tents in rows, near, and the stake line across the bottom of the plain
  for (let r = 0; r < 3; r++) for (let i = 0; i < 14 - r*3; i++) { const tx = W*(.03 + i*.068 + r*.02), ty = H*(.74 + r*.07), s = 1 + r*.4; if (tx > W*.92) continue;
    x.fillStyle = night ? (i % 2 ? '#2a2822' : '#24221c') : (i % 2 ? '#8a8474' : '#7a7466'); x.beginPath(); x.moveTo(tx - 7*s, ty); x.lineTo(tx, ty - 7*s); x.lineTo(tx + 7*s, ty); x.closePath(); x.fill(); }
  for (let i = 0; i < 30; i++) { const sx = i/30*W + W*.01, sy = H*.69; x.strokeStyle = night ? '#2a2218' : '#5a4428'; x.lineWidth = 1.4; x.beginPath(); x.moveTo(sx, sy + 6); x.lineTo(sx + 4, sy - 4); x.stroke(); } // the stakes
  return {hz, rt}; }
SCENEX.b7_field = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, mode = b76aMode(), night = mode === 'night', hz = H*.44, rt = H*.28, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b76:field' + mode, W, H, (x, W, H) => { b76aField(x, W, H, mode); }), 0, 0, W, H);
  // the cadre's lamps along the crest: burning at night and at dawn, out after
  if (mode !== 'after') { ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 9; i++) { const lx = W*(.66 + i*.035) + .5, ly = rt - H*.027 + Math.abs(i - 3)*H*.002, p = mo ? .8 + .2*Math.sin(t/300 + i) : 1; glow(ctx, lx, ly, night ? 8 : 5, '#f0e0b0', (night ? .4 : .25)*p); glow(ctx, lx, ly, 1.4, '#fff8e0', .9); } ctx.globalCompositeOperation = 'source-over'; }
  else for (let i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(120,116,110,.3)'; ctx.fillRect(W*(.68 + i*.07), rt - H*.04 - (mo ? (t/80 + i*30) % 20 : 8), 1.4, 5); } // the crest smoking
  // the banners stirring
  if (mo) { const wv = Math.sin(t/500)*1.2; ctx.fillStyle = '#6a2a3a'; ctx.beginPath(); ctx.moveTo(W*.977, H*.22 - H*.06 + .5); ctx.lineTo(W*.977 + 3, H*.22 - H*.05 + wv); ctx.lineTo(W*.977, H*.22 - H*.04); ctx.closePath(); ctx.fill(); }
  // far off on the plain: the foreigners' ring of fires (night), the Edur's grey camp nearer; at dawn the Edur column going out
  if (night) { ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 14; i++) { const a = i/14*Math.PI*2, fx = W*.36 + Math.cos(a)*W*.035, fy = hz + 2 + Math.sin(a)*H*.006; glow(ctx, fx, fy, 3, '#ffa050', .5*fl); } ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(110,116,130,.5)'; ctx.fillRect(W*.24, hz + H*.04, W*.22, H*.008); } // the Edur sleeping in their ranks
  else if (mode === 'dawn') { const off = mo ? (t/90) % 30 : 10; for (let i = 0; i < 26; i++) { const ex = W*(.3 + i*.006) + off*.2, ey = hz + H*(.035 - i*.0012); ctx.fillStyle = 'rgba(120,124,136,.85)'; ctx.fillRect(ex, ey - 3, 1.3, 3); } // the Edur column going out
    for (let i = 0; i < 10; i++) { const a = i/10*Math.PI*2; ctx.fillStyle = 'rgba(60,70,56,.8)'; ctx.fillRect(W*.36 + Math.cos(a)*W*.03, hz + 1 + Math.sin(a)*H*.004, 1.4, 2.4); } }
  else { for (let i = 0; i < 12; i++) { ctx.fillStyle = 'rgba(110,116,126,.8)'; ctx.fillRect(W*(.37 + i*.004), hz - 1, 1, 2.6); } } // figures on the round patch far off
  // the line's fires, small and many (night)
  if (night) { ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 16; i++) { const lx = hash(i, 7621)*W*.9 + W*.03, ly = H*(.76 + hash(i, 7622)*.12); glow(ctx, lx, ly, 6, '#ff9a40', .3*fl); } ctx.globalCompositeOperation = 'source-over'; }
  // the Whitefinders' standard and the Sixth's fire, near, the squad round it
  const sx = W*.6, sy = H*.95; ctx.fillStyle = '#2a2018'; ctx.fillRect(sx, sy - H*.24, 2, H*.24); ctx.fillStyle = '#5a6a7a'; ctx.fillRect(sx + 2, sy - H*.24, W*.05, H*.07); ell(ctx, sx + 2 + W*.025, sy - H*.205, 2.4, 3.2, '#f0eee6');
  const cx = W*.3, cy = H*.93; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.3, '#ff8a3a', (night ? .3 : .12)*fl); ctx.globalCompositeOperation = 'source-over';
  poly(ctx, [[cx - 6, cy], [cx - 2, cy - 10*fl], [cx + 1, cy - 4], [cx + 4, cy - 8*fl], [cx + 6, cy]], night ? 'rgba(255,150,60,.95)' : 'rgba(255,170,90,.7)');
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(24 + j*20), H*.985 - (j % 2)*3, 1.8, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, night ? .7 : .38, .5); };

/* the dome: the plain at dawn from the line, the ridge on the right, a silver hemisphere on the horizon with the white light breaking over it */
SCENEX.b7_c6_dome = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5;
  ctx.drawImage(sceneLayer('b76:dome', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#3a4258'],[.6,'#8a8490'],[1,'#c8b49a']]); x.fillRect(0, 0, W, hz + 2);
    x.fillStyle = vgrad(x, hz, H, [[0,'#5a5444'],[1,'#2a261c']]); x.fillRect(0, hz, W, H - hz);
    x.fillStyle = 'rgba(16,12,10,.75)'; x.beginPath(); x.moveTo(W*1.02, H*.86); x.lineTo(W*.36, hz + 1); x.lineTo(W*.5, hz + 1); x.lineTo(W*1.02, H*.66); x.closePath(); x.fill(); // the burn going out from the ridge
    const rt = H*.32; x.fillStyle = '#2a2a22'; x.beginPath(); x.moveTo(W*.62, hz + H*.04); x.quadraticCurveTo(W*.76, rt, W*.88, rt - H*.01); x.lineTo(W, rt + H*.02); x.lineTo(W, H); x.lineTo(W*.62, H); x.closePath(); x.fill(); // the ridge, right, near
    for (let i = 0; i < 26; i++) { const sx = i/26*W*.66, sy = H*.82; x.strokeStyle = '#3a2c1c'; x.lineWidth = 1.6; x.beginPath(); x.moveTo(sx, sy + 8); x.lineTo(sx + 5, sy - 5); x.stroke(); } // the stakes, near
    x.fillStyle = '#1e1a14'; x.fillRect(0, H*.86, W, H*.14); }), 0, 0, W, H);
  // the dome: a hemisphere of silver fire on the horizon, small, pulsing; the white light breaking over it like surf
  const dx = W*.42, dy = hz + 1, dr = W*.06, p = mo ? .85 + .15*Math.sin(t/240) : 1;
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, dx, dy, dr*3.2, '#c8d4f0', .3*p);
  ctx.fillStyle = `rgba(220,228,250,${(.55*p).toFixed(2)})`; ctx.beginPath(); ctx.arc(dx, dy, dr, Math.PI, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(dx, dy, dr*.55, Math.PI, 0); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 9; i++) { const a = Math.PI + (i + .5)/9*Math.PI, ph = mo ? (t/600 + i*.37) % 1 : .5, r = dr*(1.05 + ph*.6); ctx.strokeStyle = `rgba(255,250,240,${(.5*(1 - ph)).toFixed(2)})`; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(dx, dy, r, a - .18, a + .18); ctx.stroke(); } // the light breaking over it
  // the light off the ridge rolling out low toward it
  const g = ctx.createLinearGradient(W, H*.6, dx, dy); g.addColorStop(0, 'rgba(255,250,230,0)'); g.addColorStop(.6, `rgba(255,248,220,${(.18*p).toFixed(2)})`); g.addColorStop(1, 'rgba(255,248,220,.05)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(W*.9, H*.62); ctx.lineTo(dx + dr, dy - dr*.3); ctx.lineTo(dx + dr, dy + 2); ctx.lineTo(W*.98, H*.8); ctx.closePath(); ctx.fill(); ctx.globalCompositeOperation = 'source-over';
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.08 + i*Math.min(.07, .4/sq.length)), H*.96 - (i % 2)*2, 1.75, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .4, .5); };

/* the river below the city: ships out on the water, boats grounding in the shallows, small grey-green soldiers coming off them; reeds and
   mud on the near bank, the Letherii line on it */
SCENEX.b7_river = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.3, bank = H*.7, done = !!(S && S.f && S.f.b7_c6_landingDone);
  ctx.drawImage(sceneLayer('b76:river' + (done ? 'd' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#6a7a92'],[1,'#c8c4b4']]); x.fillRect(0, 0, W, hz + 2);
    x.fillStyle = '#4a5a48'; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 20; i++) x.lineTo(i/20*W, hz - H*(.01 + .015*Math.sin(i*1.7))); x.lineTo(W, hz + 2); x.lineTo(0, hz + 2); x.fill(); // the far bank
    for (let i = 0; i < 6; i++) { x.fillStyle = '#3a3e3a'; x.fillRect(W*(.7 + i*.035), hz - H*(.04 + hash(i, 7631)*.05), W*.012, H*(.04 + hash(i, 7631)*.05)); } // the city's towers far off, right
    x.fillStyle = vgrad(x, hz, bank, [[0,'#7a8a90'],[1,'#3a4a50']]); x.fillRect(0, hz, W, bank - hz); // the river
    for (let i = 0; i < 30; i++) { x.fillStyle = 'rgba(230,236,240,.18)'; x.fillRect(hash(i, 7632)*W, hz + Math.pow(hash(i, 7633), 1.5)*(bank - hz), W*.03 + hash(i, 7634)*W*.05, 1); }
    // ships out on the water, sails up, in a long line down to the bend
    for (let i = 0; i < 9; i++) { const sx = W*(.04 + i*.1), sy = hz + H*(.03 + (i % 3)*.02), s = .5 + (i % 3)*.15;
      x.fillStyle = '#2a2018'; x.beginPath(); x.moveTo(sx - 16*s, sy); x.lineTo(sx + 16*s, sy); x.lineTo(sx + 12*s, sy + 5*s); x.lineTo(sx - 12*s, sy + 5*s); x.closePath(); x.fill();
      x.fillStyle = '#1a1612'; x.fillRect(sx - .6, sy - 26*s, 1.2, 26*s); x.fillStyle = i % 2 ? '#d8d0bc' : '#c8c0aa'; x.beginPath(); x.moveTo(sx + 1, sy - 24*s); x.lineTo(sx + 12*s, sy - 14*s); x.lineTo(sx + 1, sy - 4*s); x.closePath(); x.fill(); x.fillStyle = 'rgba(60,72,56,.6)'; x.fillRect(sx - 12*s, sy - 2*s, 24*s, 2*s); } // grey-green at the rails
    // the near bank: mud, then reeds
    x.fillStyle = vgrad(x, bank, H, [[0,'#5a5038'],[1,'#2e2a1c']]); x.beginPath(); x.moveTo(0, bank); for (let i = 0; i <= 20; i++) x.lineTo(i/20*W, bank + Math.sin(i*1.3)*2); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill();
    for (let i = 0; i < 80; i++) { const rx = hash(i, 7635)*W, ry = bank + H*(.02 + hash(i, 7636)*.1); x.strokeStyle = `rgba(${110 + Math.round(hash(i, 7637)*40)},${120 + Math.round(hash(i, 7637)*30)},70,.7)`; x.lineWidth = 1; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx + 2, ry - H*(.05 + hash(i, 7638)*.05)); x.stroke(); } }), 0, 0, W, H);
  // boats grounding in the shallows, soldiers coming off them into the water
  const boats = done ? [[.2, .02], [.66, .04]] : [[.16, 0], [.42, .02], [.7, .01]];
  boats.forEach(([k, d], i) => { const bx = W*k + (mo && done ? (t/200 + i*40) % (W*.1) : 0), by = bank - H*(.06 + d), s = 1.2;
    poly(ctx, [[bx - 16*s, by - 2*s], [bx + 14*s, by - 3*s], [bx + 17*s, by - 6*s], [bx + 12*s, by + 2*s], [bx - 14*s, by + 2*s]], '#2a1e14');
    if (!done) for (let j = 0; j < 4; j++) { const fx = bx - 10 + j*8, fy = by + H*.035 + (j % 2)*2, wade = mo ? Math.sin(t/300 + j + i)*.8 : 0; drawFigure(ctx, j === 3 ? 'b7_malxbow' : 'b7_malregular', fx + wade, fy, .8, t, {still:true, dir:-1}); ctx.fillStyle = 'rgba(80,100,110,.85)'; ctx.fillRect(fx - 7, fy + 2, 14, 7); } }); // the water to the waist
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.92 - i*Math.min(.07, .4/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .35, .5); };

/* the walls of Letheras at night from the road: towers black against the smoke, a glow over one quarter, fires on the verges, people
   coming out with handcarts past the soldiers */
SCENEX.b7_c6_walls = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, wb = H*.58, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b76:walls', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, wb, [[0,'#0a0c16'],[.6,'#1e1a22'],[1,'#3a2420']]); x.fillRect(0, 0, W, wb);
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 7641)*.3).toFixed(2)})`; x.fillRect(hash(i, 7642)*W, Math.pow(hash(i, 7643), 1.4)*wb*.5, 1, 1); }
    // the walls across, towers standing up from them, a gate in the middle
    x.fillStyle = '#121216'; x.fillRect(0, wb - H*.16, W, H*.16);
    [.06, .2, .38, .62, .8, .94].forEach((k, i) => { const tx = W*k, tw = W*.06, th = H*(.26 + hash(i, 7644)*.1); x.fillStyle = '#0e0e12'; x.fillRect(tx - tw/2, wb - th, tw, th); for (let m = 0; m < 3; m++) x.fillRect(tx - tw/2 + m*tw*.38, wb - th - H*.015, tw*.22, H*.015); });
    for (let m = 0; m < 40; m++) x.fillRect(m/40*W, wb - H*.175, W/80, H*.015); // the battlements
    x.fillStyle = '#060506'; x.beginPath(); x.moveTo(W*.46, wb); x.lineTo(W*.46, wb - H*.08); x.quadraticCurveTo(W*.5, wb - H*.12, W*.54, wb - H*.08); x.lineTo(W*.54, wb); x.closePath(); x.fill(); // the gate
    // the road out to the near ground, the verges
    x.fillStyle = vgrad(x, wb, H, [[0,'#1a1812'],[1,'#0a0a08']]); x.fillRect(0, wb, W, H - wb);
    x.fillStyle = 'rgba(80,70,50,.5)'; x.beginPath(); x.moveTo(W*.46, wb); x.lineTo(W*.54, wb); x.lineTo(W*.7, H); x.lineTo(W*.3, H); x.closePath(); x.fill(); }), 0, 0, W, H);
  // the glow over one quarter, and the smoke lying along the battlements
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.7, wb - H*.2, W*.3, '#ff7030', .22*fl); glow(ctx, W*.72, wb - H*.16, W*.1, '#ffb060', .2*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 6; i++) { const sx = W*(.5 + i*.08) + (mo ? (t/60 + i*40) % 40 : 10), sy = wb - H*(.28 + i*.03); ctx.fillStyle = 'rgba(60,50,50,.35)'; ctx.beginPath(); ctx.ellipse(sx, sy, W*.08, H*.03, 0, 0, 7); ctx.fill(); }
  // fires on the verges, soldiers without companies
  ctx.globalCompositeOperation = 'lighter'; [[.12, .74], [.24, .8], [.82, .76], [.9, .86], [.36, .7]].forEach(([k, yk], i) => glow(ctx, W*k, H*yk, 10, '#ff9a40', .35*fl)); ctx.globalCompositeOperation = 'source-over';
  // people coming out of the gate with a handcart
  const off = mo ? (t/120) % (H*.2) : H*.08; for (let i = 0; i < 3; i++) { const py = wb + H*.04 + off + i*H*.05, px = W*(.52 + i*.02); if (py > H*.9) continue; drawFigure(ctx, 'b5_c5_refugee', px, py, .7 + i*.08, t, {still:true, dir:1}); }
  // the Sixth's fire, near left, the squad round it
  const cx = W*.26, cy = H*.93; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.3, '#ff8a3a', .3*fl); ctx.globalCompositeOperation = 'source-over';
  poly(ctx, [[cx - 6, cy], [cx - 2, cy - 10*fl], [cx + 1, cy - 4], [cx + 4, cy - 8*fl], [cx + 6, cy]], 'rgba(255,150,60,.95)');
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(22 + j*18), H*.985 - (j % 2)*3, 1.7, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .75, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Five's ground ----------------
   240×130, the same flat shapes and single highlight as Book Five, on dark canal-slate with a thin dock-gold rim (the Letherii's items) */
function b76Item(key, label, body){ const w = 240, h = 130, id = 'c76-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#34444a"></stop><stop offset=".7" stop-color="#1a2428"></stop><stop offset="1" stop-color="#0e1214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
if (typeof ART !== 'undefined') {
/* a charm off the ridge: a disc of black stone ruled with the Holds' lines in silver, on a cord, a faint warmth about it */
b76Item('b7_c6_ridgecharm', 'A charm off the ridge', '<ellipse cx="120" cy="108" rx="44" ry="5" fill="#000" opacity=".35"/>'
  + '<path d="M86 16 Q120 4 154 16 Q148 34 132 46" fill="none" stroke="#5a4a34" stroke-width="2.2"/><path d="M86 16 Q96 34 108 46" fill="none" stroke="#5a4a34" stroke-width="2.2"/>'
  + '<circle cx="120" cy="72" r="30" fill="#c87a3a" opacity=".12"/><circle cx="120" cy="72" r="26" fill="#141418"/><circle cx="120" cy="72" r="26" fill="none" stroke="#3a3a44" stroke-width="2"/>'
  + '<g stroke="#c8ccd8" stroke-width="1.3" fill="none" opacity=".9"><path d="M120 50 L120 94 M98 72 L142 72"/><circle cx="120" cy="72" r="14"/><path d="M104 56 L136 88 M136 56 L104 88" opacity=".6"/><circle cx="120" cy="72" r="4"/></g>'
  + '<circle cx="120" cy="47" r="3" fill="#2a2a30"/><path d="M104 56 Q110 50 118 49" stroke="#fff" stroke-width="1.2" opacity=".3" fill="none"/>');
/* a Whitefinder shield: round, oak under leather, the white fingertip painted on the face, a scuffed rim, one quarrel-scar */
b76Item('b7_c6_fingershield', 'A Whitefinder shield', '<ellipse cx="120" cy="114" rx="52" ry="6" fill="#000" opacity=".35"/>'
  + '<circle cx="120" cy="64" r="48" fill="#4a3624"/><circle cx="120" cy="64" r="44" fill="#5a6a7a"/><circle cx="120" cy="64" r="44" fill="none" stroke="#2a2018" stroke-width="2"/>'
  + '<path d="M120 30 L120 76" stroke="#f0eee6" stroke-width="11" stroke-linecap="round"/><path d="M110 72 Q120 92 130 72 Z" fill="#f0eee6"/><path d="M116 34 L116 70" stroke="#fff" stroke-width="2" opacity=".5"/>'
  + '<circle cx="120" cy="64" r="48" fill="none" stroke="#8a6a44" stroke-width="3" stroke-dasharray="10 3"/>'
  + '<path d="M146 44 L152 40" stroke="#1a1410" stroke-width="2.4"/><path d="M146 44 L149 47" stroke="#3a2a1a" stroke-width="1"/>'
  + '<path d="M84 40 Q96 24 116 20" stroke="#fff" stroke-width="2" opacity=".22" fill="none"/>');
}
