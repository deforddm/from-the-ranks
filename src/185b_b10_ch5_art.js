/* ============ Book Ten, Chapter 5 art: The Last Water — the glass at first light, the ground gone wet, the first scrub of Kolanse ============ */
/* Book Ten's ground at the crossing's end. The glass at first light: the night's stars going out in the glass, a band of rose low in the
   east, the column putting its cloaks up slowly, gaps in the rows. Grey light over the wet ground: the glass gone dark underfoot, then
   mud, then standing water spreading under the whole column, the files at its edge on their knees, small; no one at its centre, no figure
   apart from the rest (rule 102). The glass's far edge: the first thorn-scrub of Kolanse, thin fields ploughed to dust, an empty granary
   with its door hanging, people at the field-edges far off, thin, watching; on 'south', at grey light, a village well with a stone lip.
   Three backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b10_c5_dawn   the last lie-up at first light (this chapter's)
     b10_lake      wet ground (180's caption): the glass going dark, then wet, then water, and the column stopping to look at it
     b10_kolanse   out of the glass (180's caption): thin fields, an empty granary, dust, people at the field-edges watching; road-aware
                   ('south' and grey light: the first well in Kolanse in the foreground)
   Ground (TILEX), three styles:
     b10_c5_ground  the lie-up and the night march, on 183b's glass (on 'south' Book Nine's road ground): 'c' a cloak on a shaft, 'r' the
                    next cloak over (a cloak with a skin on the ground beside it; the march's west edge is the track), 'W' the last water
                    (the hauled wagon with one barrel, or a skin hung on a shaft; empty once given), 'T' the empty tailboard, 'w' a
                    wagon, 'O' the squad's circle (packs in a ring, no fire), 'v' a rise of glass
     b10_c5_wet     grey light on the wet glass ('L' standing water, the glass round it dark and shining); on 'south' a village's
                    trodden yard, 'L' the muddy ground round the well, with the well and its trough
     b10_c5_scrub   Kolanse's dry dirt, 's' a thorn-bush, 'g' a ploughed field gone to dust, 'F' a fire (030 burns it)
   Battle 't': a glass shard on b10_c5_ground (a stone on 'south'); a thorn-bush on b10_c5_scrub.
   The chapter's gear in the series' 200×150 item style on Book Ten's ground: night glass, blue-black (#2a3a52 → #070a10), a cold
   starlight rim from the upper left. */

const b105aSouth = () => !!(S && S.f && S.f.b10_tRoad === 'south');
const b105aPh = () => (S && S.f && S.f.b10_c5_ph) || 1;

/* ---------------- shared pieces ---------------- */
/* the glass at first light: the sky going from night to rose in the east (right), the glass grey-rose with the last stars in it */
function b105aDawn(x, W, H){ const hz = H*.42;
  x.fillStyle = vgrad(x, 0, hz, [[0,'#18223a'],[.45,'#4a5470'],[.8,'#b08a8a'],[1,'#e8c0a0']]); x.fillRect(0, 0, W, hz + 2);
  const g = x.createLinearGradient(W, 0, W*.2, 0); g.addColorStop(0, 'rgba(255,200,160,.38)'); g.addColorStop(1, 'rgba(255,200,160,0)'); x.fillStyle = g; x.fillRect(0, hz*.5, W, hz*.5 + 2); // the east coming up
  for (let i = 0; i < 40; i++) { const sy = Math.pow(hash(i, 10501), 1.3)*hz*.6, sx = hash(i, 10502)*W*(1 - sy/hz*.2); x.fillStyle = `rgba(230,236,255,${(.15 + hash(i, 10503)*.4)*(1 - sx/W)})`; x.fillRect(sx*.85, sy, 1.2, 1.2); } // the last stars, west
  x.fillStyle = vgrad(x, hz, H, [[0,'#d8c0b4'],[.2,'#a8a0a8'],[.6,'#6a7080'],[1,'#30384a']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 40; i++) { const d = Math.pow(hash(i, 10504), 1.4), yy = hz + d*(H - hz), x0 = hash(i, 10505)*W; x.strokeStyle = hash(i, 10506) > .5 ? 'rgba(60,70,90,.25)' : 'rgba(255,220,200,.35)'; x.lineWidth = Math.max(.6, d*1.4); x.beginPath(); x.moveTo(x0, yy); x.lineTo(x0 + W*(.04 + d*.2), yy); x.stroke(); } // seams
  x.fillStyle = 'rgba(255,220,190,.5)'; x.fillRect(W*.5, hz - 1, W*.5, H*.01); // the horizon catching light, east
  return hz; }
/* grey light over the wet ground: a low grey sky, a pale band east; returns the horizon */
function b105aGrey(x, W, H){ const hz = H*.4;
  x.fillStyle = vgrad(x, 0, hz, [[0,'#2a3446'],[.6,'#6a7486'],[1,'#b8bcc0']]); x.fillRect(0, 0, W, hz + 2);
  glow(x, W*.86, hz, W*.4, '#e8dcc8', .3);
  return hz; }
/* Kolanse's dry dirt by day: a dusty sky, a brown plain going away; returns the horizon */
function b105aDust(x, W, H, eve){ const hz = H*.42;
  x.fillStyle = vgrad(x, 0, hz, eve ? [[0,'#3a3a52'],[.6,'#9a7a6a'],[1,'#d8a878']] : [[0,'#8a96a6'],[.6,'#c8bea8'],[1,'#e2d2b2']]); x.fillRect(0, 0, W, hz + 2);
  x.fillStyle = vgrad(x, hz, H, [[0,'#c2ac88'],[.4,'#9a8462'],[1,'#5a4a36']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 60; i++) { const d = Math.pow(hash(i, 10511), 1.3); x.fillStyle = `rgba(70,56,40,${(.12 + d*.2).toFixed(2)})`; x.fillRect(hash(i, 10512)*W, hz + d*(H - hz), 1 + d*3, .6 + d); } // grit
  return hz; }
/* a thorn-bush: grey, ragged, alive */
function b105aThorn(x, cx, by, s, N){ ell(x, cx, by + s, 8*s, 1.4*s, 'rgba(0,0,0,.3)');
  for (let i = 0; i < 9; i++) { const a = -Math.PI*(.1 + i*.1), r = (5 + hash(i, Math.round(cx), 10521)*4)*s; B2F.line(x, N ? '#1a1c18' : '#4a4838', Math.max(1, .7*s), [[cx, by], [cx + Math.cos(a)*r, by + Math.sin(a)*r]]); }
  for (let i = 0; i < 7; i++) ell(x, cx + (hash(i, Math.round(by), 10522) - .5)*12*s, by - (2 + hash(i, 10523)*7)*s, 2.6*s, 1.8*s, N ? '#232820' : '#6a7258');
  x.fillStyle = N ? 'rgba(160,180,210,.14)' : 'rgba(255,250,220,.25)'; x.fillRect(cx - 6*s, by - 8*s, 3*s, .8*s); }
/* an empty granary with its door hanging, far off */
function b105aGranary(x, cx, by, s){ x.fillStyle = '#8a7458'; x.fillRect(cx - 8*s, by - 12*s, 16*s, 12*s); x.fillStyle = '#6a5440'; x.beginPath(); x.moveTo(cx - 10*s, by - 12*s); x.lineTo(cx, by - 19*s); x.lineTo(cx + 10*s, by - 12*s); x.closePath(); x.fill();
  x.fillStyle = '#1e160e'; x.fillRect(cx - 2.4*s, by - 8*s, 4.8*s, 8*s); x.fillStyle = '#7a6448'; x.save(); x.translate(cx + 2.4*s, by - 8*s); x.rotate(.5); x.fillRect(0, 0, 4.4*s, 8*s); x.restore(); // the door hanging
  x.fillStyle = 'rgba(255,240,210,.25)'; x.fillRect(cx - 8*s, by - 12*s, 2*s, 12*s); }
/* a thin figure far off at a field-edge, watching */
function b105aWatcher(x, cx, by, s){ x.fillStyle = '#3a3026'; x.fillRect(cx - .7*s, by - 7*s, 1.4*s, 7*s); ell(x, cx, by - 7.8*s, .9*s, .9*s, '#3a3026'); x.fillRect(cx - 1.4*s, by - 6*s, 2.8*s, 3*s); }
/* a village well: a stone lip, a post and a beam, a rope and a bucket, and a trough */
function b105aWell(x, cx, by, s, N){ ell(x, cx, by + 1*s, 14*s, 2.4*s, 'rgba(0,0,0,.35)');
  x.fillStyle = N ? '#4a4840' : '#9a9080'; x.fillRect(cx - 9*s, by - 7*s, 18*s, 7*s); ell(x, cx, by - 7*s, 9*s, 2.4*s, N ? '#5a5850' : '#b0a898'); ell(x, cx, by - 7*s, 6.6*s, 1.6*s, '#14120e'); // the lip, and the dark inside
  B2F.line(x, '#4a3622', 1.4*s, [[cx - 8*s, by - 7*s], [cx - 8*s, by - 20*s]]); B2F.line(x, '#4a3622', 1.4*s, [[cx + 8*s, by - 7*s], [cx + 8*s, by - 20*s]]); B2F.line(x, '#5a4630', 1.2*s, [[cx - 9*s, by - 20*s], [cx + 9*s, by - 20*s]]); // posts and beam
  B2F.line(x, '#c8b890', .5*s, [[cx + 1*s, by - 20*s], [cx + 1*s, by - 11*s]]); x.fillStyle = '#5a4630'; x.fillRect(cx - 1*s, by - 11*s, 4*s, 3*s); // rope and bucket
  x.fillStyle = N ? '#3a3020' : '#7a6448'; x.fillRect(cx + 11*s, by - 3*s, 12*s, 3*s); x.fillStyle = 'rgba(160,190,220,.6)'; x.fillRect(cx + 11.6*s, by - 3*s, 10.8*s, .8*s); // the trough, water in it
  x.fillStyle = 'rgba(255,250,230,.3)'; x.fillRect(cx - 9*s, by - 7*s, 2*s, 7*s); }

/* ---------------- the backdrops ---------------- */
/* the last lie-up at first light: the stars going out in the glass, rose in the east, the cloaks going up slowly with gaps in the rows */
SCENEX.b10_c5_dawn = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b105:dawn', W, H, (x, W, H) => { const hz = b105aDawn(x, W, H);
    for (let r = 0; r < 5; r++) { const k = r/4, cy = hz + (H - hz)*(.04 + Math.pow(k, 1.6)*.6), s = .3 + k*1.4; // the cloaks, rows going away, more gaps than there were
      for (let c = 0; c < 9; c++) { if (hash(c, r, 10531) > .55) continue; b103aCloak(x, W*(.04 + c*.12 + (r % 2)*.05 + hash(c, r, 10532)*.03), cy, s, false); } }
    for (let i = 0; i < 4; i++) { const px = W*(.18 + i*.2 + hash(i, 10533)*.05), py = hz + H*(.08 + hash(i, 10534)*.12), s = .5 + (py - hz)/H*2; ell(x, px, py, 7*s, 1.6*s, '#3a3640'); } // soldiers lying where they stopped, too tired for a cloak
    b92aWagon(x, W*.78, H*.74, H/160, 'eve', false); b92aBarrels(x, W*.78, H*.72, H/220, 'eve'); }), 0, 0, W, H);
  const hz = H*.42;
  for (let i = 0; i < 10; i++) { const tw = mo ? (.5 + .5*Math.sin(t/(600 + i*41) + i)) : .5; const sx = W*.5*hash(i, 10535), sy = hz*.5*hash(i, 10536); ctx.fillStyle = `rgba(230,236,255,${(.1 + tw*.3).toFixed(2)})`; ctx.fillRect(sx, sy, 1.4, 1.4); } // the last stars, going out
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* wet ground (180's caption): grey light; the glass dark and shining underfoot, then standing water going away, the column on its knees at
   the edge, small and many; on 'south' the chapter uses b10_kolanse with its well instead */
SCENEX.b10_lake = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b105:lake', W, H, (x, W, H) => { const hz = b105aGrey(x, W, H);
    x.fillStyle = vgrad(x, hz, H, [[0,'#9aa2ac'],[.3,'#4a5462'],[1,'#141a24']]); x.fillRect(0, hz, W, H - hz); // the glass, dark with wet
    x.fillStyle = vgrad(x, hz, H*.78, [[0,'#c0c6cc'],[.4,'#8a96a6'],[1,'#5a6676']]); // the water: a sheet going away, reflecting the sky
    x.beginPath(); x.moveTo(0, hz + H*.02); x.lineTo(W, hz + H*.01); x.lineTo(W, hz + H*.2); x.bezierCurveTo(W*.7, hz + H*.34, W*.35, hz + H*.36, 0, hz + H*.28); x.closePath(); x.fill();
    glow(x, W*.86, hz + H*.06, W*.3, '#efe4d0', .22); // the east in it
    for (let i = 0; i < 30; i++) { const d = hash(i, 10541), yy = hz + H*(.03 + d*.24), x0 = hash(i, 10542)*W; x.strokeStyle = 'rgba(230,236,244,.28)'; x.lineWidth = .6 + d; x.beginPath(); x.moveTo(x0, yy); x.lineTo(x0 + W*(.02 + d*.06), yy); x.stroke(); } // still water, lines of light
    for (let i = 0; i < 46; i++) { const d = Math.pow(hash(i, 10543), 1.2), px = W*hash(i, 10544), py = hz + H*(.2 + d*.2) + Math.sin(px/W*3)*H*.02, s = .35 + d*1.2; // the column at the edge, kneeling, small and many
      x.fillStyle = '#12161e'; ell(x, px, py - 3*s, 1.6*s, 2.4*s, '#12161e'); ell(x, px + .4*s, py - 6*s, 1*s, 1*s, '#12161e'); x.fillRect(px - 2*s, py - 1*s, 4*s, 1*s); }
    for (let i = 0; i < 26; i++) { const d = Math.pow(hash(i, 10545), 1.5), px = W*hash(i, 10546), py = hz + H*(.36 + d*.5); b105aGlint(x, px, py, .6 + d*2); } }), 0, 0, W, H); // the wet glass shining
  const hz = H*.4;
  for (let i = 0; i < 6; i++) { const k = mo ? ((t/(4200 + i*700) + hash(i, 10547)) % 1) : hash(i, 10547), cx = W*hash(i, 10548), cy = hz + H*(.06 + hash(i, 10549)*.2); // rings spreading on the water
    ctx.strokeStyle = `rgba(240,244,250,${(Math.sin(k*Math.PI)*.3).toFixed(2)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, W*.04*k + 2, H*.008*k + .6, 0, 0, Math.PI*2); ctx.stroke(); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .45, .5); };
function b105aGlint(x, px, py, r){ x.fillStyle = 'rgba(220,230,244,.6)'; x.fillRect(px - r, py, r*2, Math.max(.6, r*.3)); }

/* out of the glass (180's caption): thin fields, an empty granary, dust, thorn-scrub near, people at the field-edges watching; on 'south'
   at grey light (the first well), a village well in the foreground; in the chapter's end (evening), the light going */
SCENEX.b10_kolanse = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, well = b105aSouth() && b105aPh() === 3;
  ctx.drawImage(sceneLayer('b105:kol' + (well ? 'w' : ''), W, H, (x, W, H) => { const hz = b105aDust(x, W, H, false);
    if (!b105aSouth()) { x.fillStyle = 'rgba(236,236,230,.55)'; x.beginPath(); x.moveTo(0, hz); x.lineTo(W*.3, hz); x.lineTo(0, hz + H*.1); x.closePath(); x.fill(); } // the glass, pale, behind to the west
    for (let r = 0; r < 4; r++) { const y0 = hz + H*(.02 + r*.035); x.fillStyle = r % 2 ? 'rgba(120,96,64,.5)' : 'rgba(170,146,108,.5)'; x.fillRect(W*.4, y0, W*.6, H*.03); // thin fields, ploughed to dust
      for (let k = 0; k < 30; k++) { x.fillStyle = 'rgba(80,62,40,.4)'; x.fillRect(W*(.4 + k*.02), y0, .8, H*.03); } }
    b105aGranary(x, W*.72, hz + H*.03, H/260); b105aGranary(x, W*.9, hz + H*.02, H/360);
    [[.46, .045], [.58, .05], [.66, .04], [.84, .045], [.95, .04]].forEach(([u, v], i) => b105aWatcher(x, W*u, hz + H*v, H/220 + i*.02)); // people at the field-edges, far, thin, watching
    for (let i = 0; i < 14; i++) { const d = Math.pow(hash(i, 10551), 1.3); b105aThorn(x, W*hash(i, 10552), hz + H*(.1 + d*.4), .4 + d*1.6, false); } // the scrub
    if (well) b105aWell(x, W*.58, H*.82, H/120, false); }), 0, 0, W, H);
  const hz = H*.42;
  for (let i = 0; i < 4; i++) { const k = mo ? ((t/(9000 + i*1600) + hash(i, 10553)) % 1) : hash(i, 10553); ctx.fillStyle = `rgba(200,180,140,${(Math.sin(k*Math.PI)*.18).toFixed(2)})`; ctx.fillRect(W*(k*1.2 - .2), hz + H*(.04 + i*.05), W*.25, H*.012); } // dust on the wind
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .35, .5); };

/* ---------------- ground ---------------- */
/* Kolanse's dry dirt tile */
function b105aDirtT(ctx, x, y, T, N){ ctx.fillStyle = N ? '#2a241c' : '#a8906c'; ctx.fillRect(x*T, y*T, T, T); b2Mottle(ctx, x, y, T, .05, .12, N ? '120,110,90' : '80,62,40', 1);
  for (let i = 0; i < 3; i++) { if (hash(x, y, 10561 + i) < .5) continue; ctx.fillStyle = N ? 'rgba(160,150,130,.25)' : 'rgba(240,226,196,.6)'; ctx.fillRect(x*T + T*hash(x, y, 10564 + i), y*T + T*hash(x, y, 10567 + i), Math.max(1, T*.04), Math.max(1, T*.03)); } } // pebbles
/* the lie-up and the night march: 183b's glass and its pieces, with this chapter's own 'W', 'r', 'T' and 'O' */
TILEX.b10_c5_ground = (ctx, ch, x, y, T, dark) => { const N = !!dark, base = TILEX.b10_c3_ground, south = b105aSouth(), road = TILEX.b9_c3_road;
  if (!base) return;
  const march = !!(S && S.area === 'b10_c5_march');
  if (ch === 'r' && march) return base(ctx, '<', x, y, T, dark); // the march's west edge: the column's track
  if (!'WrTO'.includes(ch)) return base(ctx, ch, x, y, T, dark);
  if (south && road) road(ctx, '.', x, y, T, dark); else base(ctx, '.', x, y, T, dark);
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, f = (S && S.f) || {};
    if (ch === 'r') { b103aCloak(ctx, px + T*.42, py + T*.86, T/16, N); ell(ctx, px + T*.82, py + T*.84, T*.1, T*.05, N ? '#2a2016' : '#6a4a2c'); return; } // the next cloak over, and its flat skin
    if (ch === 'O') { for (let i = 0; i < 7; i++) { const a = i/7*Math.PI*2; ell(ctx, px + T*(.5 + Math.cos(a)*.32), py + T*(.56 + Math.sin(a)*.22), T*.1, T*.07, N ? '#2a2620' : '#6a5a48'); } return; } // packs in a ring, nothing in the middle
    if (ch === 'T') { b55Wagon(ctx, px, py, T, N); B2F.line(ctx, N ? '#3a3022' : '#8a6a44', Math.max(1, T*.03), [[px + T*.2, py + T*.3], [px + T*.8, py + T*.34]]); return; } // the empty tailboard, the measuring stick across it
    if (ch === 'W') { const gone = f.b10_c5_key === 'give' && f.b10_c5_gave;
      if (f.b10_c3_hauled) { b55Wagon(ctx, px, py, T, N); ell(ctx, px + T*.5, py + T*.4, T*.12, T*.14, gone ? (N ? '#1a140e' : '#4a3a2a') : (N ? '#2a2016' : '#7a5a38')); if (!gone) { ctx.fillStyle = N ? '#14100c' : '#3a2a1a'; ctx.fillRect(px + T*.38, py + T*.38, T*.24, Math.max(1, T*.03)); } return; } // the hauled wagon, one barrel
      B2F.line(ctx, N ? '#22201c' : '#5a4630', Math.max(1, T*.04), [[px + T*.5, py + T*.9], [px + T*.5, py + T*.14]]); // a skin hung on a shaft, full or flat
      if (gone) ell(ctx, px + T*.5, py + T*.42, T*.08, T*.16, N ? '#1a140e' : '#5a4430'); else ell(ctx, px + T*.5, py + T*.48, T*.15, T*.2, N ? '#2a2016' : '#7a5a38'); } }); };
/* grey light on the wet glass ('L' standing water); on 'south' a village yard with its well */
TILEX.b10_c5_wet = (ctx, ch, x, y, T, dark) => { const N = !!dark, south = b105aSouth();
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (south) { b105aDirtT(ctx, x, y, T, N); if (ch === '#') { ctx.fillStyle = N ? '#3a3024' : '#8a7458'; ctx.fillRect(px, py + T*.3, T, T*.6); ctx.fillStyle = 'rgba(255,240,210,.2)'; ctx.fillRect(px, py + T*.3, T, T*.06); return; } // a mud wall
      if (ch === '<' || ch === '>') { ctx.fillStyle = 'rgba(255,240,210,.25)'; ctx.fillRect(px + T*.2, py, T*.6, T); return; }
      if (ch === 'L') { ctx.fillStyle = 'rgba(70,56,40,.35)'; ctx.fillRect(px, py, T, T); if (hash(x, y, 10571) > .6) ell(ctx, px + T*.5, py + T*.6, T*.2, T*.08, 'rgba(160,190,220,.5)'); // trodden mud, puddles
        if (x === 7 && y === 4) b105aWell(ctx, px + T*.5, py + T*.9, T/30, N); return; }
      return; }
    ctx.fillStyle = N ? '#121a28' : '#4a5462'; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .04, .1, '200,210,230', 1); // the glass, dark with wet
    if (hash(x, y, 10572) > .4) { ctx.fillStyle = 'rgba(210,220,236,.4)'; ctx.fillRect(px + T*hash(x, y, 10573), py + T*hash(x, y, 10574), T*.3, Math.max(1, T*.03)); } // a sheen of water on it
    if (ch === '#') { ctx.fillStyle = '#2a3446'; for (let i = 0; i < 3; i++) { const sx = px + T*(.15 + i*.3), h = T*(.3 + hash(x, y, 10575 + i)*.4); ctx.beginPath(); ctx.moveTo(sx - T*.12, py + T*.9); ctx.lineTo(sx, py + T*.9 - h); ctx.lineTo(sx + T*.1, py + T*.9); ctx.closePath(); ctx.fill(); } return; } // shards, wet
    if (ch === '<' || ch === '>') { ctx.fillStyle = 'rgba(220,226,236,.18)'; ctx.fillRect(px + T*.2, py, T*.6, T); return; }
    if (ch === 'L') { ctx.fillStyle = 'rgba(150,164,184,.9)'; ctx.fillRect(px, py, T, T); ctx.fillStyle = 'rgba(230,236,244,.4)'; ctx.fillRect(px + T*hash(x, y, 10576)*.6, py + T*(.3 + hash(x, y, 10577)*.4), T*.4, Math.max(1, T*.03)); } }); }; // standing water
/* Kolanse's first scrub: dirt, thorn-bushes, a ploughed field gone to dust; 'F' a fire ring (030 draws the flame) */
TILEX.b10_c5_scrub = (ctx, ch, x, y, T, dark) => { const N = !!dark;
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T; b105aDirtT(ctx, x, y, T, N);
    if (ch === '#') { b105aThorn(ctx, px + T*.5, py + T*.86, T/20, N); return; }
    if (ch === '<' || ch === '>') { ctx.fillStyle = N ? 'rgba(160,150,130,.1)' : 'rgba(255,240,210,.25)'; ctx.fillRect(px + T*.2, py, T*.6, T); return; }
    if (ch === 's') return b105aThorn(ctx, px + T*.5, py + T*.84, T/22, N);
    if (ch === 'g') { ctx.fillStyle = N ? '#3a3024' : '#b89c74'; ctx.fillRect(px, py, T, T); for (let i = 0; i < 4; i++) { ctx.fillStyle = N ? 'rgba(10,8,6,.4)' : 'rgba(90,70,46,.45)'; ctx.fillRect(px, py + T*(.12 + i*.24), T, Math.max(1, T*.05)); } return; } // furrows, dust
    if (ch === 'F') { for (let i = 0; i < 8; i++) { const a = i/8*Math.PI*2; ell(ctx, px + T*(.5 + Math.cos(a)*.24), py + T*(.6 + Math.sin(a)*.14), T*.06, T*.045, N ? '#3a3632' : '#7a7268'); } } }); }; // stones round the fire
/* low cover ('t'): a shard of glass (a stone on 'south') on b10_c5_ground; a thorn-bush on b10_c5_scrub */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b10_c5_scrub') { b105aThorn(ctx, x*T + T*.5, y*T + T*.86, T/18, !!dark); return; }
    if (ch === 't' && style === 'b10_c5_ground') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.88, T*.4, T*.09, 'rgba(0,0,0,.5)');
      if (b105aSouth()) { ell(ctx, px + T*.5, py + T*.62, T*.36, T*.26, N ? '#2a2826' : '#8a8478'); ctx.fillStyle = 'rgba(255,240,220,.14)'; ctx.fillRect(px + T*.22, py + T*.48, T*.24, T*.06); return; }
      ctx.fillStyle = N ? '#2a3854' : '#b4c0ce'; ctx.beginPath(); ctx.moveTo(px + T*.18, py + T*.88); ctx.lineTo(px + T*.4, py + T*.16); ctx.lineTo(px + T*.62, py + T*.34); ctx.lineTo(px + T*.82, py + T*.88); ctx.closePath(); ctx.fill();
      ctx.fillStyle = N ? 'rgba(180,200,240,.32)' : 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.moveTo(px + T*.18, py + T*.88); ctx.lineTo(px + T*.4, py + T*.16); ctx.lineTo(px + T*.34, py + T*.88); ctx.closePath(); ctx.fill(); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Ten's ground: night glass, blue-black, a cold starlight rim from the upper left) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".38" cy=".36" r=".85"><stop offset="0" stop-color="#2a3a52"/><stop offset=".6" stop-color="#141c2a"/><stop offset="1" stop-color="#070a10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  const ground = id => `<rect width="200" height="150" fill="url(#${id}-bg)"/><path d="M0 118 L200 110 L200 150 L0 150 Z" fill="#141a26"/><path d="M0 118 L200 110" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/>`;
  /* a Kolansii outrider's blade: long, slightly curved, a plain iron guard and a leather grip worn dark, lying on the ground at an angle;
     a cold edge of light along the back of the curve */
  ART['item/b10_c5_kolansiiblade'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A Kolansii outrider's blade">${bg('b105kb')}
<linearGradient id="b105kb-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2e8f2"/><stop offset=".5" stop-color="#8a96a8"/><stop offset="1" stop-color="#3a4252"/></linearGradient>
<linearGradient id="b105kb-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4a30"/><stop offset="1" stop-color="#2a1a10"/></linearGradient></defs>
${ground('b105kb')}<ellipse cx="100" cy="114" rx="84" ry="7" fill="url(#b105kb-sh)"/>
<g transform="rotate(-14 100 76)"><path d="M58 70 Q120 58 190 46 Q124 70 58 80 Z" fill="url(#b105kb-s)" stroke="#0c1018" stroke-width="1.2"/>
<path d="M58 70 Q120 58 190 46" fill="none" stroke="#ffffff" stroke-width="1.4" opacity=".75"/><path d="M64 75 Q120 66 176 52" fill="none" stroke="#5a6678" stroke-width=".8" opacity=".7"/>
<rect x="50" y="62" width="8" height="26" rx="2" fill="#4a4a52" stroke="#0c0c10" stroke-width="1"/><rect x="51" y="62" width="2" height="26" fill="#c8d0e0" opacity=".45"/>
<rect x="14" y="69" width="36" height="12" rx="4" fill="url(#b105kb-g)" stroke="#0a0806" stroke-width="1.1"/>
<path d="M18 70 L22 81 M26 70 L30 81 M34 70 L38 81 M42 70 L46 81" stroke="#1a100a" stroke-width="1.4" opacity=".8"/><circle cx="12" cy="75" r="5" fill="#4a4a52" stroke="#0c0c10" stroke-width="1"/><circle cx="11" cy="73" r="1.6" fill="#c8d0e0" opacity=".5"/></g>
<ellipse cx="110" cy="62" rx="62" ry="22" fill="#c8d4f0" opacity=".05"/></svg>`;
  ART_SIZE['item/b10_c5_kolansiiblade'] = [200, 150];
  /* the empty skin: a goatskin water-skin lying flat and creased, its stopper on a thong, a soldier's knot at the neck; starlight along
     its upper edge */
  ART['item/b10_c5_emptyskin'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="The empty skin">${bg('b105es')}
<linearGradient id="b105es-k" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a6a48"/><stop offset=".5" stop-color="#5a4028"/><stop offset="1" stop-color="#2a1c10"/></linearGradient></defs>
${ground('b105es')}<ellipse cx="100" cy="116" rx="76" ry="8" fill="url(#b105es-sh)"/>
<path d="M44 108 Q34 84 56 70 Q90 56 128 64 Q160 72 160 96 Q156 116 120 114 Q84 116 44 108 Z" fill="url(#b105es-k)" stroke="#120a04" stroke-width="1.4"/>
<path d="M60 84 Q92 78 132 86 M56 96 Q96 92 140 100 M78 70 Q84 84 80 104 M112 66 Q118 86 116 110" fill="none" stroke="#1e1208" stroke-width="1.2" opacity=".7"/>
<path d="M44 108 Q34 84 56 70 Q90 56 128 64" fill="none" stroke="#e0c8a8" stroke-width="1.4" opacity=".5"/>
<path d="M158 82 L178 70 L184 78 L164 92 Z" fill="#4a3220" stroke="#120a04" stroke-width="1.2"/><path d="M160 84 L168 90" stroke="#c8b48a" stroke-width="2.4"/>
<circle cx="186" cy="74" r="5" fill="#6a5038" stroke="#120a04" stroke-width="1"/><path d="M182 78 Q176 98 164 104" fill="none" stroke="#8a6a44" stroke-width="1.2"/></svg>`;
  ART_SIZE['item/b10_c5_emptyskin'] = [200, 150];
  /* a stone from the wet ground: a plain dark river-smooth stone on wet glass, a film of water on it catching the starlight, a ring of
     wet round it on the glass */
  ART['item/b10_c5_lakestone'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A stone from the wet ground">${bg('b105ls')}
<radialGradient id="b105ls-s" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#6a7484"/><stop offset=".5" stop-color="#2e3440"/><stop offset="1" stop-color="#0e1016"/></radialGradient>
<radialGradient id="b105ls-w" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#8aa0c0" stop-opacity=".5"/><stop offset="1" stop-color="#8aa0c0" stop-opacity="0"/></radialGradient></defs>
${ground('b105ls')}<ellipse cx="100" cy="112" rx="70" ry="12" fill="url(#b105ls-w)"/><ellipse cx="100" cy="110" rx="56" ry="6" fill="url(#b105ls-sh)"/>
<path d="M58 102 Q54 74 84 64 Q118 56 140 74 Q152 92 136 106 Q110 116 80 112 Q60 110 58 102 Z" fill="url(#b105ls-s)" stroke="#06080c" stroke-width="1.4"/>
<path d="M66 86 Q74 68 98 64" fill="none" stroke="#e6eef8" stroke-width="2" opacity=".7"/><ellipse cx="86" cy="74" rx="10" ry="4" fill="#dce6f4" opacity=".25" transform="rotate(-18 86 74)"/>
<path d="M120 100 Q126 104 130 100" fill="none" stroke="#aabcd4" stroke-width="1" opacity=".5"/>
<path d="M44 118 Q70 122 100 122 Q140 122 160 116" fill="none" stroke="#b4c4dc" stroke-width=".8" opacity=".4"/></svg>`;
  ART_SIZE['item/b10_c5_lakestone'] = [200, 150]; }
