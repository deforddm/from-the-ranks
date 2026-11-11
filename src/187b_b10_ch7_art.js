/* ============ Book Ten, Chapter 7 art: Over the Ridge — the first fields, the far end of the line, the ridge, the barrows ============ */
/* The last chapter's ground. The first fields of Kolanse at dusk the night before: stubble and dust, an empty granary, the regulars' fires
   in long rows, and across the fields a ridge with more fires on it (on 'south', the brigades' fires and Kolanse City low in the east with
   a tower past it). The regulars' line by day: a stretch far from any banner, the open ground, the ridge black with Kolansii; far off east
   a low hill with smoke over it (rule 108). After the line: the Kolansii kneeling in the open ground, a Malazan Host in long grey lines on
   the ridge, the hill quiet, dragons small and many very high (rule 107). On 'south' the city and its tower, and the Kolansii going away
   toward it. The barrows: long mounds of new earth in rows at evening, the army a dark line at their edge, spears stood upright.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the upper left:
     b10_assail   the Assail: tall, pale, long-limbed, bare-handed, a plain pale shift, hairless; drawn at the figure's distance only
   Backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b10_c7_eve    the first fields at dusk, the night before (road-aware)
     b10_ridge     the stretch by day and after the line (180's placeholder; road- and phase-aware)
     b10_barrows   the barrows at evening (180's placeholder)
     b10_c7_road, b10_c7_fourth, b10_c7_sixth   the finale's road pages: by the Third's key, the Fourth's road, the Sixth's road
   Ground (TILEX): b10_c7_field (186b's b10_c6_field underneath, plus a shield on the ground, an empty granary, the heavies' fire, the
   surgeons' cart, the barrows, their edge, a spear stood upright, a knot of soldiers, a regular's pack). Battle 't': a low field-wall of
   dry stones.
   The chapter's gear in the series' 200×150 item style on Book Ten's ground: night glass, blue-black (#2a3a52 → #070a10), a cold starlight
   rim from the upper left. */

const b107aC7 = () => !!(S && S.book === 'tcg' && S.chapter === 7 && S.f);
const b107aSouth = () => !!(S && S.f && S.f.b10_tRoad === 'south');
const b107aPh = () => b107aC7() ? (([1, 2, 3, 4].includes(S.f.b10_c7_ph) && S.f.b10_c7_ph) || 1) : 2;

/* ---------------- the Assail ---------------- */
Object.assign(FIGX, {
  /* tall, pale, long-limbed, bare-handed; a plain pale shift; a small hairless head; no weapon; it does not hurry */
  b10_assail(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.0, 1.32);
    const sw = REDUCE() ? 0 : Math.sin(t/900 + (o.phase || 0))*.5;
    ctx.fillStyle = '#b4b0a8'; ctx.fillRect(-3.2, 4, 1.9, 9); ctx.fillRect(1.3, 4, 1.9, 9); // long thin legs, bare
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-3.2, 11.6, 1.9, 1.4); ctx.fillRect(1.3, 11.6, 1.9, 1.4);
    poly(ctx, [[-4.2,-6.4],[4.2,-6.4],[5.6,8],[-5.6,8]], h.armor('#ece8de', '#8e8a80')); // the pale shift
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(-.3, -5.6, .6, 13); ctx.fillStyle = '#9a968c'; ctx.fillRect(-4.6, 1.2, 9.2, .8); // a fold; a cord belt
    B2F.line(ctx, '#ccc6bc', 1.5, [[-4.4,-5.6], [-6.8, 2.6 + sw], [-7.2, 9 + sw]]); B2F.line(ctx, '#c4beb4', 1.5, [[4.4,-5.6], [7, 2 - sw], [7.8, 8.4 - sw]]); // long arms, hanging
    B2F.line(ctx, '#d8d2c8', .6, [[-7.2, 9 + sw], [-7.6, 11 + sw]]); B2F.line(ctx, '#d8d2c8', .6, [[-7.2, 9 + sw], [-6.6, 11.2 + sw]]); B2F.line(ctx, '#d0cac0', .6, [[7.8, 8.4 - sw], [8.4, 10.6 - sw]]); B2F.line(ctx, '#d0cac0', .6, [[7.8, 8.4 - sw], [7.2, 10.8 - sw]]); // long fingers, bare
    ctx.fillStyle = '#bcb6ac'; ctx.fillRect(-.9, -8.2, 1.8, 2); // a long neck
    ell(ctx, 0, -12, 3.2, 4.4, '#d6d0c6'); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(1.4, -15, 1.6, 6); // a small hairless head, long
    ctx.fillStyle = 'rgba(40,46,60,.85)'; ctx.fillRect(-.6, -12.6, 1.1, .8); ctx.fillRect(1.6, -12.6, 1.1, .8); // pale eyes, very still
    ctx.fillStyle = 'rgba(200,214,240,.22)'; ctx.fillRect(-4, -5.8, .9, 12); ell(ctx, -1.6, -13.4, .9, 1.6, 'rgba(230,236,250,.35)'); // the cold light on its lit side
    ctx.restore(); },
});
if (typeof FOES !== 'undefined') ['b10_assail', 'b10_lassail'].forEach(k => { if (FOES[k]) FOES[k].kind = 'b10_assail'; });

/* ---------------- shared pieces ---------------- */
/* stubble in thin rows, going away */
function b107aStubble(x, W, H, y0, N){ for (let r = 0; r < 14; r++) { const k = r/14, y = y0 + (H - y0)*Math.pow(k, 1.4); x.strokeStyle = N ? `rgba(90,80,64,${(.12 + k*.15).toFixed(2)})` : `rgba(120,96,64,${(.18 + k*.2).toFixed(2)})`; x.lineWidth = .6 + k;
  x.beginPath(); for (let i = 0; i < 40; i++) { const px = (i/40)*W + hash(i, r, 11001)*8; x.moveTo(px, y); x.lineTo(px + 1, y - 2 - k*4); } x.stroke(); } }
/* an empty granary: a stone drum with a conical roof and a door hanging */
function b107aGranary(x, cx, by, s, N){ x.fillStyle = N ? '#14100c' : '#7a6a52'; x.fillRect(cx - 6*s, by - 9*s, 12*s, 9*s); x.beginPath(); x.moveTo(cx - 7.4*s, by - 9*s); x.lineTo(cx, by - 15*s); x.lineTo(cx + 7.4*s, by - 9*s); x.closePath(); x.fillStyle = N ? '#0e0a08' : '#5a4a36'; x.fill();
  x.fillStyle = N ? '#050403' : '#1e1810'; x.fillRect(cx - 1.6*s, by - 5*s, 3.2*s, 5*s); x.fillStyle = N ? '#20180e' : '#6a5038'; x.save(); x.translate(cx + 1.6*s, by - 5*s); x.rotate(.5); x.fillRect(0, 0, 2.6*s, 5*s); x.restore(); }
/* small upright figures, far (the army at an edge, people at a field-edge) */
function b107aFolk(x, x0, x1, y, s, N, gap, seed){ for (let px = x0; px < x1; px += 2.4*s) { if (hash(Math.round(px), seed, 11011) < gap) continue; const j = hash(Math.round(px), seed, 11012);
  x.fillStyle = N ? '#0a0806' : '#2a2018'; x.fillRect(px, y - (4 + j)*s, 1.3*s, (4 + j)*s); ell(x, px + .65*s, y - (4.7 + j)*s, .75*s, .8*s, N ? '#0a0806' : '#2a2018'); } }
/* the Kolansii kneeling in the open ground: small hunched shapes, many, still */
function b107aKneel(x, x0, x1, y, s, N, rows){ for (let r = 0; r < rows; r++) for (let px = x0 + r*1.3*s; px < x1; px += 3.1*s) { if (hash(Math.round(px), r, 11021) < .18) continue;
  const yy = y + r*2.6*s; x.fillStyle = N ? '#0c0a08' : '#3a3024'; x.beginPath(); x.ellipse(px, yy - 1.4*s, 1.3*s, 1.5*s, 0, 0, 7); x.fill(); ell(x, px + .3*s, yy - 3.2*s, .7*s, .7*s, N ? '#0c0a08' : '#2e261c'); } }
/* a Host in long grey lines on a ridge, standards up */
function b107aHost(x, W, y, s){ for (let r = 0; r < 3; r++) { const yy = y - r*2.2*s; for (let px = W*.02 + r*2*s; px < W*.98; px += 2.2*s) { if (hash(Math.round(px), r, 11031) < .08) continue; x.fillStyle = ['#4a505a', '#3e444e', '#555b64'][r]; x.fillRect(px, yy - 3.6*s, 1.4*s, 3.6*s); }
  for (let i = 0; i < 6; i++) { const px = W*(.08 + i*.16 + hash(i, r, 11032)*.04); B2F.line(x, '#2a2018', Math.max(.5, .4*s), [[px, yy - 3*s], [px, yy - 12*s]]); x.fillStyle = r === 0 && i === 2 ? '#7a2a22' : '#5a6070'; x.fillRect(px, yy - 12*s, 3*s, 2*s); } } }
/* a low hill far off east, with smoke (rule 108): never who held it */
function b107aHill(x, cx, hz, W, H, N){ x.fillStyle = N ? '#0e0c0c' : '#6a5e4c'; x.beginPath(); x.ellipse(cx, hz - H*.002, W*.06, H*.024, 0, Math.PI, 0); x.fill(); }
function b107aHillSmoke(ctx, cx, hz, W, H, t, mo, N, n = 4, a = .32){ for (let i = 0; i < n; i++) { const k = mo ? ((t/12000 + i/n) % 1) : i/n; ctx.fillStyle = `rgba(${N ? '120,110,100' : '96,88,80'},${(a*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(cx + k*W*.012, hz - H*(.03 + k*.16), W*.008 + k*W*.016, H*.014 + k*H*.024, 0, 0, 7); ctx.fill(); } }
/* dragons, small and many, very high, wheeling (rule 107): never close, never named */
function b107aDragons(ctx, W, H, t, mo, n = 14){ for (let i = 0; i < n; i++) { const a = (mo ? t/(9000 + i*500) : 0) + hash(i, 11041)*7, cx = W*(.55 + hash(i, 11042)*.4) + Math.cos(a)*W*.05, cy = H*(.08 + hash(i, 11043)*.16) + Math.sin(a)*H*.03, s = 1.2 + hash(i, 11044)*1.6, fl = mo ? Math.sin(t/220 + i)*.6 : 0;
  ctx.strokeStyle = 'rgba(30,26,30,.7)'; ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(cx - 3*s, cy - fl*s); ctx.lineTo(cx, cy + .6*s); ctx.lineTo(cx + 3*s, cy - fl*s); ctx.stroke(); } }
/* long mounds of new earth in rows, receding */
function b107aMounds(x, W, H, y0, y1, N){ for (let r = 0; r < 7; r++) { const k = r/7, y = y0 + (y1 - y0)*Math.pow(k, 1.6), hh = (2 + k*9), w = W*(.92 - k*.1);
  x.fillStyle = N ? ['#4a3a2a', '#3e3022'][r % 2] : ['#6a5236', '#5a4630'][r % 2]; x.beginPath(); x.moveTo(W*.5 - w/2, y); x.quadraticCurveTo(W*.5, y - hh*2, W*.5 + w/2, y); x.closePath(); x.fill();
  x.fillStyle = N ? 'rgba(220,170,120,.22)' : 'rgba(220,190,140,.2)'; x.beginPath(); x.moveTo(W*.5 - w/2, y); x.quadraticCurveTo(W*.5, y - hh*2, W*.5 + w/2, y); x.quadraticCurveTo(W*.5, y - hh*1.7, W*.5 - w/2, y); x.fill(); } }
/* fires along a row (safe if 186b's helper is missing) */
const b107aFires = (ctx, W, y, t, mo, n, x0, x1) => { if (typeof b106aFires === 'function') return b106aFires(ctx, W, y, t, mo, n, x0, x1); };

/* ---------------- the backdrops ---------------- */
/* the first fields at dusk, the night before: stubble, a granary, the regulars' fires in rows; the ridge with its own fires (on 'south',
   the city low and the tower) */
SCENEX.b10_c7_eve = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, sth = b107aSouth(), hz = H*.46;
  ctx.drawImage(sceneLayer('b107:eve:' + (sth ? 's' : 'a'), W, H, (x, W, H) => { if (typeof b106aDusk === 'function') b106aDusk(x, W, H, hz); else { x.fillStyle = vgrad(x, 0, hz, [[0,'#070a12'],[1,'#8a5a40']]); x.fillRect(0, 0, W, hz); }
    if (sth) { if (typeof b106aCity === 'function') b106aCity(x, W*.42, W*.82, hz, H/240, true); if (typeof b106aTower === 'function') b106aTower(x, W*.9, hz, H/250, true); }
    else if (typeof b106aRidge === 'function') b106aRidge(x, W, H, hz, true);
    x.fillStyle = vgrad(x, hz, H, [[0,'#2e261e'],[.5,'#201a14'],[1,'#0e0a08']]); x.fillRect(0, hz + H*.02, W, H - hz); b107aStubble(x, W, H, hz + H*.04, true);
    b107aGranary(x, W*.16, hz + H*.14, H/150, true); b107aFolk(x, W*.24, W*.3, hz + H*.13, H/200, true, .2, 1); // people at a field-edge, watching
    for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { const px = W*(.08 + i*.11 + r*.02), py = hz + H*(.1 + r*.09); x.fillStyle = '#1a140e'; x.beginPath(); x.moveTo(px - 4 - r*2, py); x.lineTo(px, py - 5 - r*2); x.lineTo(px + 4 + r*2, py); x.closePath(); x.fill(); } }), 0, 0, W, H); // tents in rows
  for (let r = 0; r < 4; r++) b107aFires(ctx, W, hz + H*(.12 + r*.09), t + r*400, mo, 6 + r*2, .05, .95); // the regulars' fires in rows
  if (!sth) b107aFires(ctx, W, hz - H*.03, t, mo, 18, .04, .96); else b107aFires(ctx, W, hz - H*.005, t, mo, 5, .44, .8); // fires on the ridge; the city's few lamps
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* the stretch: by day (the ridge black with Kolansii, the hill far off with smoke; on 'south' the city, the tower, the trenches); after the
   line (the Kolansii kneeling, the Host on the ridge, the hill quiet, dragons; on 'south' the open ground emptying toward the tower) */
SCENEX.b10_ridge = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, sth = b107aSouth(), ph = b107aPh(), after = ph >= 3, rush = b107aC7() && !!S.f.b10_c7_rushDone, hz = H*.44;
  const v = (sth ? 's' : 'a') + (after ? 'x' : 'd');
  ctx.drawImage(sceneLayer('b107:ridge:' + v, W, H, (x, W, H) => { if (typeof b106aDay === 'function') b106aDay(x, W, H, hz); else { x.fillStyle = vgrad(x, 0, hz, [[0,'#6a7486'],[1,'#d0bc98']]); x.fillRect(0, 0, W, hz); }
    if (sth) { if (typeof b106aCity === 'function') b106aCity(x, W*.16, W*.56, hz, H/240, false); if (typeof b106aTower === 'function') b106aTower(x, W*.7, hz, H/260, false);
      if (typeof b106aTrench === 'function') b106aTrench(x, W*.02, W*.98, hz + H*.04, H/260, false);
      if (!after && typeof b106aKolLine === 'function') for (let r = 0; r < 2; r++) b106aKolLine(x, W*.02, W*.98, hz + H*(.03 - r*.012), H/(300 - r*50), false, .1); }
    else { if (typeof b106aRidge === 'function') b106aRidge(x, W, H, hz, false); b107aHill(x, W*.93, hz, W, H, false);
      if (!after && typeof b106aKolLine === 'function') for (let r = 0; r < 3; r++) b106aKolLine(x, W*.04, W*.86, hz - H*(.04 - r*.025), H/(380 - r*60), false, .2); // black with them
      if (after) { b107aHost(x, W*.88, hz - H*.05, H/300); b107aKneel(x, W*.04, W*.96, H*.55, H/260, false, 3); } } // the Host on the ridge; the Kolansii kneeling
    if (typeof b106aGround === 'function') b106aGround(x, W, H, hz + H*.05, false); else { x.fillStyle = '#8a7456'; x.fillRect(0, hz + H*.05, W, H - hz); }
    if (after && !sth) b107aKneel(x, W*.04, W*.96, H*.6, H/200, false, 2);
    if (typeof b96aLine === 'function') b96aLine(x, -W*.02, W*1.02, H*.74, H/150, 'day', true); }), 0, 0, W, H);
  if (!sth) { b107aHillSmoke(ctx, W*.93, hz, W, H, t, mo, false, after ? 2 : 5, after ? .14 : (rush ? .4 : .26));
    if (after) b107aDragons(ctx, W, H, t, mo); }
  if (sth && after) { const k = mo ? (t/9000) % 1 : .5; for (let i = 0; i < 18; i++) { const u = (hash(i, 11051) + k*.4) % 1; ctx.fillStyle = 'rgba(40,32,24,.7)'; ctx.fillRect(W*(.1 + u*.55), hz + H*(.02 + hash(i, 11052)*.02) - u*H*.01, 1.4, 3); } } // going away toward the tower
  if (typeof b96aDust === 'function' && !after) b96aDust(ctx, W, H, hz + H*.04, .16, .5, t, mo, .05, .9);
  for (let i = 0; i < 10; i++) { const k = ((t/9000*mo + hash(i, 11053)) % 1); ctx.fillStyle = `rgba(240,216,168,${(.22*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 11054)*.8) + k*W*.06, H*(.55 + hash(i, 11055)*.3) - k*H*.05, 1.3, 1.3); } // dust on the air
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* the barrows at evening: long mounds of new earth in rows, the army a dark line at their edge, spears upright, small fires along it */
SCENEX.b10_barrows = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.36;
  ctx.drawImage(sceneLayer('b107:barrows', W, H, (x, W, H) => { if (typeof b106aDusk === 'function') b106aDusk(x, W, H, hz); else { x.fillStyle = vgrad(x, 0, hz, [[0,'#070a12'],[1,'#8a5a40']]); x.fillRect(0, 0, W, hz); }
    glow(x, W*.2, hz, W*.4, '#c87a50', .22);
    x.fillStyle = vgrad(x, hz, H, [[0,'#3a2e22'],[.5,'#261e16'],[1,'#120e0a']]); x.fillRect(0, hz, W, H - hz);
    b107aMounds(x, W, H, hz + H*.04, H*.64, true);
    b107aFolk(x, W*.02, W*.98, H*.72, H/170, true, .08, 2); // the army at the edge
    for (let i = 0; i < 9; i++) { const px = W*(.06 + i*.11 + hash(i, 11061)*.03); B2F.line(x, '#0a0806', Math.max(.6, H/300), [[px, H*.72], [px + 1, H*.6]]); } }), 0, 0, W, H); // spears stood upright at squads' places
  b107aFires(ctx, W, H*.76, t, mo, 8, .04, .96);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* the finale's road pages. v: colours (the army going on along a road), kolanse (a well-head in thin fields), home (a grey coast and a
   ship), host (the Host's column over a ridge), third (two squads on one road), daru (a lake shore at dawn, a city's blue glow), letheras
   (the King's ships), free (figures going their own ways along a shore) */
function b107aRoad(cv, t, v){ const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, sea = ['home', 'letheras', 'free', 'daru'].includes(v);
  ctx.drawImage(sceneLayer('b107:road:' + v, W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, sea ? [[0,'#2e3646'],[.5,'#6a6e78'],[1,'#d8b48c']] : [[0,'#4a5466'],[.6,'#a08a70'],[1,'#e0b884']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.78, hz, W*.4, '#f0c890', .3);
    if (sea) { x.fillStyle = vgrad(x, hz, H*.66, [[0,v === 'daru' ? '#4a5a6e' : '#6a7684'],[1,'#3a4452']]); x.fillRect(0, hz, W, H*.66 - hz);
      x.fillStyle = vgrad(x, H*.64, H, [[0,'#a89a80'],[1,'#4a4034']]); x.fillRect(0, H*.64, W, H*.36);
      if (v === 'home' || v === 'letheras') for (let i = 0; i < (v === 'letheras' ? 4 : 1); i++) if (typeof b106aShip === 'function') b106aShip(x, W*(.62 + i*.09), hz + H*.05, H/(150 + i*30), false);
      if (v === 'daru') { glow(x, W*.72, hz - H*.02, W*.22, '#6ab0e0', .4); for (let i = 0; i < 12; i++) { x.fillStyle = 'rgba(120,190,240,.55)'; x.fillRect(W*(.62 + hash(i, 11071)*.2), hz - H*(.01 + hash(i, 11072)*.05), 1.4, 1.4); } } // a city's blue lamps over a lake
      const n = v === 'free' ? 5 : 6; for (let i = 0; i < n; i++) { const px = v === 'free' ? W*(.2 + i*.16) : W*(.3 + i*.035), py = H*(.78 + (v === 'free' ? (i % 2)*.06 : 0)); b107aFolk(x, px, px + 3, py, H/160, false, 0, i + 3); } }
    else { x.fillStyle = vgrad(x, hz, H, [[0,'#b49c78'],[.5,'#8a7456'],[1,'#4a3c2a']]); x.fillRect(0, hz, W, H - hz); b107aStubble(x, W, H, hz + H*.02, false);
      if (v === 'kolanse') { const cx = W*.5, cy = H*.7, s = H/90; x.fillStyle = '#6a5a44'; x.beginPath(); x.ellipse(cx, cy, 8*s, 2.4*s, 0, 0, 7); x.fill(); x.fillStyle = '#1a1612'; x.beginPath(); x.ellipse(cx, cy - .4*s, 5.6*s, 1.5*s, 0, 0, 7); x.fill(); // the well-head
        B2F.line(x, '#4a3626', Math.max(1, s*.6), [[cx - 6*s, cy], [cx - 6*s, cy - 10*s]]); B2F.line(x, '#4a3626', Math.max(1, s*.6), [[cx + 6*s, cy], [cx + 6*s, cy - 10*s]]); B2F.line(x, '#5a4430', Math.max(1, s*.5), [[cx - 6.4*s, cy - 9*s], [cx + 6.4*s, cy - 9*s]]); // the windlass
        B2F.line(x, '#8a7a5a', .7, [[cx + 1*s, cy - 9*s], [cx + 1*s, cy - 3*s]]); x.fillStyle = '#5a4430'; x.fillRect(cx, cy - 3.4*s, 2*s, 1.8*s); ell(x, cx + 1*s, cy - 3.4*s, 1*s, .4*s, '#7ab0d0'); // a bucket, wet
        b107aFolk(x, W*.32, W*.42, H*.74, H/150, false, .3, 7); b107aFolk(x, W*.58, W*.68, H*.75, H/150, false, .3, 8); }
      else { x.fillStyle = 'rgba(220,200,160,.35)'; x.beginPath(); x.moveTo(W*.42, H); x.lineTo(W*.5, hz + H*.02); x.lineTo(W*.53, hz + H*.02); x.lineTo(W*.72, H); x.closePath(); x.fill(); // the road going away
        if (v === 'host') { if (typeof b106aRidge === 'function') b106aRidge(x, W, H, hz, false); b107aHost(x, W, hz - H*.02, H/320); }
        for (let i = 0; i < 26; i++) { const k = i/26, px = W*(.5 + (.06 - k*.04)*Math.sin(i)), py = hz + H*.04 + (H*.5)*Math.pow(1 - k, 2); b107aFolk(x, px, px + 2, py, H/(130 + k*200), false, 0, i + 20); } // the column going away
        if (v === 'colours' || v === 'third') { B2F.line(x, '#2a2018', 1, [[W*.505, hz + H*.06], [W*.505, hz - H*.02]]); x.fillStyle = '#7a2a22'; x.fillRect(W*.505, hz - H*.02, W*.012, H*.012); }
        if (v === 'third') b107aFolk(x, W*.6, W*.66, H*.86, H/110, false, .1, 41); } } }), 0, 0, W, H);
  for (let i = 0; i < 8; i++) { const k = ((t/9000*mo + hash(i, 11081)) % 1); ctx.fillStyle = `rgba(250,226,180,${(.2*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 11082)*.8) + k*W*.05, H*(.55 + hash(i, 11083)*.3) - k*H*.05, 1.3, 1.3); }
  vign(ctx, W, H, .45, .5); }
SCENEX.b10_c7_road = (cv, t) => b107aRoad(cv, t, (S && S.f && (S.chapters && S.chapters[7] || S.f.b10_c7_key)) || 'colours');
SCENEX.b10_c7_fourth = (cv, t) => { const r = (S && S.f && S.f.b10_fourthRoad) || 'host'; b107aRoad(cv, t, r === 'home' ? 'daru' : r === 'third' ? 'third' : 'host'); };
SCENEX.b10_c7_sixth = (cv, t) => { const r = (S && S.f && S.f.b10_lethRoad) || 'letheras'; b107aRoad(cv, t, r === 'kolanse' ? 'kolanse' : r === 'free' ? 'free' : 'letheras'); };

/* ---------------- ground ---------------- */
/* a shield laid face up on the dirt (the reading) */
function b107aShieldT(ctx, px, py, T, N){ ell(ctx, px + T*.5, py + T*.62, T*.34, T*.2, 'rgba(0,0,0,.45)'); ell(ctx, px + T*.5, py + T*.56, T*.32, T*.19, N ? '#2a2620' : '#6a5a44'); ell(ctx, px + T*.5, py + T*.56, T*.26, T*.15, N ? '#3a2e24' : '#8a6a46'); ell(ctx, px + T*.5, py + T*.56, T*.06, T*.04, N ? '#5a5248' : '#b8a888');
  for (let i = 0; i < 4; i++) ell(ctx, px + T*(.36 + i*.08), py + T*(.5 + (i % 2)*.08), T*.025, T*.02, N ? '#8a8070' : '#d8c8a8'); } // a game of stones, given up
/* the barrows: long mounds of new earth */
function b107aMoundT(ctx, x, y, T, N){ ctx.fillStyle = N ? '#1a140e' : '#5a4630'; ctx.fillRect(x*T, y*T, T, T); const cy = y*T + T*(y % 2 ? .62 : .48);
  ctx.fillStyle = N ? '#2a2016' : '#7a5e3c'; ctx.beginPath(); ctx.moveTo(x*T, cy + T*.2); ctx.quadraticCurveTo(x*T + T*.5, cy - T*.3, x*T + T, cy + T*.2); ctx.lineTo(x*T + T, cy + T*.3); ctx.lineTo(x*T, cy + T*.3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = N ? 'rgba(160,140,110,.1)' : 'rgba(220,190,140,.25)'; ctx.fillRect(x*T, cy - T*.04, T, T*.04);
  if (hash(x, y, 11091) > .7) { B2F.line(ctx, N ? '#0e0a06' : '#3a2a1a', Math.max(1, T*.03), [[x*T + T*.5, cy], [x*T + T*.5, cy - T*.4]]); } }
TILEX.b10_c7_field = (ctx, ch, x, y, T, dark) => { const N = !!dark;
  if (!'RGHcMeXBr'.includes(ch)) return (TILEX.b10_c6_field || (() => {}))(ctx, ch, x, y, T, dark);
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === 'M') return b107aMoundT(ctx, x, y, T, N);
    if (typeof b105aDirtT === 'function') b105aDirtT(ctx, x, y, T, N); else { ctx.fillStyle = N ? '#2a241c' : '#a8906c'; ctx.fillRect(px, py, T, T); }
    if (ch === 'e' || ch === 'X') { ctx.fillStyle = N ? 'rgba(0,0,0,.25)' : 'rgba(60,46,30,.25)'; ctx.fillRect(px, py, T, T); for (let i = 0; i < 3; i++) ell(ctx, px + T*hash(x, y, 11101 + i), py + T*(.3 + i*.2), T*.05, T*.03, N ? 'rgba(0,0,0,.35)' : 'rgba(50,38,26,.4)'); // trodden
      if (ch === 'X') { ell(ctx, px + T*.5, py + T*.88, T*.12, T*.04, 'rgba(0,0,0,.5)'); B2F.line(ctx, N ? '#1a120a' : '#5a4028', Math.max(1.2, T*.05), [[px + T*.5, py + T*.88], [px + T*.5, py - T*.1]]); poly(ctx, [[px + T*.46, py - T*.08], [px + T*.5, py - T*.3], [px + T*.54, py - T*.08]], N ? '#6a6a70' : '#c8c4bc'); ctx.fillStyle = N ? '#5a2a20' : '#9a3a2a'; ctx.fillRect(px + T*.5, py + T*.1, T*.14, T*.1); } // a spear stood upright, a red knot on it
      return; }
    if (ch === 'R') return b107aShieldT(ctx, px, py, T, N);
    if (ch === 'G') return b107aGranary(ctx, px + T*.5, py + T*.92, T/18, N);
    if (ch === 'H') { if (typeof b55Fire === 'function') b55Fire(ctx, px, py, T, N); for (let i = 0; i < 3; i++) { const a = -Math.PI*.8 + i*.8; ell(ctx, px + T*(.5 + Math.cos(a)*.38), py + T*(.6 + Math.sin(a)*.26), T*.1, T*.12, N ? '#3a3632' : '#7a7468'); } return; } // the heavies' fire, shields round it
    if (ch === 'c') { if (typeof b55Wagon === 'function') b55Wagon(ctx, px, py, T, N); ctx.fillStyle = N ? '#3a1a16' : '#8a2a22'; ctx.fillRect(px + T*.3, py + T*.34, T*.4, T*.08); return; } // the surgeons' cart, a red cloth on it
    if (ch === 'B') { for (let i = 0; i < 4; i++) { const fx = px + T*(.2 + i*.2), fy = py + T*(.86 - (i % 2)*.06); ctx.fillStyle = N ? '#14100c' : '#3a3024'; ctx.fillRect(fx - T*.04, fy - T*.36, T*.08, T*.36); ell(ctx, fx, fy - T*.42, T*.05, T*.06, N ? '#14100c' : '#2a2018'); } return; } // a knot of soldiers
    if (ch === 'r') { ell(ctx, px + T*.5, py + T*.86, T*.3, T*.06, 'rgba(0,0,0,.4)'); ctx.fillStyle = N ? '#2a2016' : '#6a5034'; ctx.fillRect(px + T*.28, py + T*.56, T*.3, T*.3); B2F.line(ctx, N ? '#1a120a' : '#5a4028', Math.max(1, T*.04), [[px + T*.7, py + T*.9], [px + T*.78, py + T*.1]]); poly(ctx, [[px + T*.75, py + T*.12], [px + T*.79, py - T*.04], [px + T*.82, py + T*.13]], N ? '#5a5a60' : '#c8c4bc'); } }); }; // a pack and a spear
/* low cover ('t'): a field-wall of dry stones */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b10_c7_field') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.86, T*.46, T*.1, 'rgba(0,0,0,.45)');
      for (let r = 0; r < 3; r++) for (let i = 0; i < 4 - r; i++) { const cx = px + T*(.18 + i*.22 + r*.11), cy = py + T*(.78 - r*.17), j = hash(x*7 + i, y*5 + r, 11111); ell(ctx, cx, cy, T*(.11 + j*.03), T*(.08 + j*.02), N ? ['#3a3632', '#2e2a26'][(i + r) % 2] : ['#9a907c', '#7e7462'][(i + r) % 2]); ctx.fillStyle = N ? 'rgba(200,200,210,.08)' : 'rgba(255,245,220,.35)'; ctx.fillRect(cx - T*.08, cy - T*.07, T*.08, T*.02); }
      return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Ten's ground: night glass, blue-black, a cold starlight rim from the upper left) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".38" cy=".36" r=".85"><stop offset="0" stop-color="#2a3a52"/><stop offset=".6" stop-color="#141c2a"/><stop offset="1" stop-color="#070a10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  const ground = id => `<rect width="200" height="150" fill="url(#${id}-bg)"/><path d="M0 118 L200 110 L200 150 L0 150 Z" fill="#141a26"/><path d="M0 118 L200 110" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/>`;
  /* a file-closer's knot: a loop of red cord tied in a flat knot with two tails, lying on the ground, starlight along its top */
  ART['item/b10_c7_knot'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A file-closer's knot">${bg('b107kn')}
<linearGradient id="b107kn-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8604a"/><stop offset=".5" stop-color="#9a2a20"/><stop offset="1" stop-color="#4a100c"/></linearGradient></defs>
${ground('b107kn')}<ellipse cx="100" cy="114" rx="66" ry="7" fill="url(#b107kn-sh)"/>
<path d="M60 70 C60 40 100 38 100 66 C100 38 140 40 140 70 C140 92 112 96 100 80 C88 96 60 92 60 70 Z" fill="none" stroke="url(#b107kn-c)" stroke-width="9" stroke-linejoin="round"/>
<path d="M60 70 C60 40 100 38 100 66 C100 38 140 40 140 70" fill="none" stroke="#f0a890" stroke-width="1.6" opacity=".55"/>
<path d="M92 82 Q84 100 70 112" fill="none" stroke="url(#b107kn-c)" stroke-width="8" stroke-linecap="round"/><path d="M108 82 Q118 100 132 110" fill="none" stroke="url(#b107kn-c)" stroke-width="8" stroke-linecap="round"/>
<rect x="90" y="70" width="20" height="16" rx="5" fill="#7a1e16" stroke="#2a0806" stroke-width="1.2"/><path d="M92 74 L108 74 M92 78 L108 78 M92 82 L108 82" stroke="#3a0c08" stroke-width="1" opacity=".7"/>
<path d="M70 112 l-4 4 M70 112 l-1 6 M132 110 l4 5 M132 110 l1 6" stroke="#c84a3a" stroke-width="1.4" opacity=".8"/></svg>`;
  ART_SIZE['item/b10_c7_knot'] = [200, 150];
  /* a Host cloak: a long grey cloak folded on the ground, the hood on top, a leather yoke across the shoulders with two bronze rings;
     starlight along the upper-left fold */
  ART['item/b10_c7_ridgecloak'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A Host cloak">${bg('b107rc')}
<linearGradient id="b107rc-w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9aa0a8"/><stop offset=".55" stop-color="#5e646e"/><stop offset="1" stop-color="#2a2e36"/></linearGradient>
<linearGradient id="b107rc-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5434"/><stop offset="1" stop-color="#3a2414"/></linearGradient></defs>
${ground('b107rc')}<ellipse cx="100" cy="114" rx="76" ry="8" fill="url(#b107rc-sh)"/>
<path d="M34 104 Q40 70 70 60 L130 58 Q162 66 168 104 Q100 118 34 104 Z" fill="url(#b107rc-w)" stroke="#121418" stroke-width="1.4"/>
<path d="M50 100 Q60 80 74 72 M90 108 Q94 86 100 70 M128 106 Q130 86 132 70 M152 100 Q148 84 140 72" fill="none" stroke="#2a2e36" stroke-width="1.6" opacity=".7"/>
<path d="M70 60 Q100 44 130 58 Q118 72 100 72 Q82 72 70 60 Z" fill="url(#b107rc-l)" stroke="#120a04" stroke-width="1.2"/>
<circle cx="82" cy="64" r="3.4" fill="none" stroke="#c89a48" stroke-width="1.8"/><circle cx="118" cy="63" r="3.4" fill="none" stroke="#c89a48" stroke-width="1.8"/>
<path d="M84 46 Q100 30 116 46 Q112 56 100 56 Q88 56 84 46 Z" fill="#6a7078" stroke="#121418" stroke-width="1.2"/><path d="M90 48 Q100 40 110 48" fill="none" stroke="#1a1c22" stroke-width="2"/>
<path d="M34 104 Q40 70 70 60 L100 48" fill="none" stroke="#e6ecf4" stroke-width="1.3" opacity=".5"/></svg>`;
  ART_SIZE['item/b10_c7_ridgecloak'] = [200, 150];
  /* the Third's last roll: a strip of hide cut from a ration sack, laid out with its end curling, rows of names scratched pale into it
     with a knife point, a line under the last; a small knife beside it */
  const marks = []; for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) { const x0 = 44 + c*24 + (r % 2)*4, y0 = 54 + r*9, w = 10 + ((r*7 + c*3) % 9); marks.push(`<path d="M${x0} ${y0} l${w} ${(c % 2) - .5}" stroke="#e8dcc0" stroke-width="1.1" opacity="${(.55 + ((r + c) % 3)*.12).toFixed(2)}"/>`); }
  ART['item/b10_c7_roll'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="The Third's last roll">${bg('b107rl')}
<linearGradient id="b107rl-h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a88a62"/><stop offset=".6" stop-color="#7a5e3e"/><stop offset="1" stop-color="#4a3622"/></linearGradient></defs>
${ground('b107rl')}<ellipse cx="100" cy="112" rx="74" ry="7" fill="url(#b107rl-sh)"/>
<path d="M36 46 L164 42 Q172 70 166 106 L38 108 Q30 76 36 46 Z" fill="url(#b107rl-h)" stroke="#1a1006" stroke-width="1.4"/>
<path d="M164 42 Q182 46 178 62 Q172 70 166 64" fill="#5a4026" stroke="#1a1006" stroke-width="1.2"/>
${marks.join('')}<path d="M44 106 L156 104" stroke="#f0e4c8" stroke-width="1.4" opacity=".8"/><path d="M44 102 L150 100" stroke="#e8dcc0" stroke-width="1" opacity=".7"/>
<path d="M36 46 L164 42" stroke="#f6ead0" stroke-width="1.2" opacity=".5"/>
<g transform="rotate(-18 150 122)"><rect x="128" y="119" width="22" height="5" rx="2" fill="#3a2a1a"/><path d="M150 119 L176 121 L150 124 Z" fill="#b8c0cc" stroke="#2a3040" stroke-width=".8"/></g></svg>`;
  ART_SIZE['item/b10_c7_roll'] = [200, 150]; }
