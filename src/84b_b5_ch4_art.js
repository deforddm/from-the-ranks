/* ============ Book Five, Chapter 4 art: High Fort — the forest road, the west rampart under the bastion tower, Dry Gully at night, the wood west of the fort ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d/81b-83b, lit from the left: a High Fort garrison soldier (scale, the blue-grey cloak, a
   garrison's red-brown shield-rim, no white fingertip: they are not Whitefinders); a Grass Jacket (green cloth tied at the helm's crest, a
   lighter coat); the fort's cadre-master (an older mage in grey piping, a list). Four grounds (TILEX: the forest road, the west rampart,
   Dry Gully at night, the wood); in fights 't' is cover per ground and '#' is wall, tower or bank. Five backdrops (SCENEX, sceneLayer for
   the still parts, REDUCE() holding the rest still): b5_highfort (80's, redrawn: the west rampart under the bastion tower, evening, night
   or the battle morning by the chapter's flags), b5_c4_forest (the forest road, or the wood at dusk on 'run'), b5_c4_field (from the west
   rampart: the gully, the far ramparts with the royal standards, the stone fort, the Edur as a dark line), b5_c4_lightning (a column of
   white lightning far along the line, wraiths and demons as shapes), b5_c4_surrender (a pile of swords on the turf, a long file south,
   Edur watching). Grim things at a distance, in silhouette; no bodies close. And the chapter's gear on Book Five's ground. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* a High Fort garrison soldier: scale over a padded coat, the blue-grey cloak, an open helm, a round shield with a red-brown rim (no fingertip) */
  b5_c4_garrison(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, 1.02); const c = b2Pick(o, ['#4a5664', '#505a66', '#46525e']);
    poly(ctx, [[-5.4,-6],[-8.4,9.4],[-3,8.6],[-2,-6]], c); h.legs('#2a2a2c'); ctx.fillStyle = '#1a1612'; ctx.fillRect(-4.5, 10.4, 3.4, 2.6); ctx.fillRect(1.1, 10.4, 3.4, 2.6);
    h.torso('#6e6e6a', '#262624', 6.2); ctx.strokeStyle = 'rgba(0,0,0,.26)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-5.8, -4 + i*2.2); ctx.lineTo(5.8, -4 + i*2.2); } ctx.stroke(); // scale
    ctx.fillStyle = '#2a1e14'; ctx.fillRect(-6, 3.2, 12, 1.4);
    h.head(b2Pick(o, ['#b08a6a', '#a8805e', '#ba9272']), 4.3, -11.2); h.look(); ctx.fillStyle = 'rgba(30,20,14,.45)'; ctx.fillRect(-3.4, -8.6, 7, 1.4); // stubble: nineteen years of it, some of them
    ctx.beginPath(); ctx.arc(0, -12.4, 5, Math.PI, 0); ctx.fillStyle = h.armor('#8a8a86', '#2a2a28'); ctx.fill(); ctx.fillRect(-5.4, -12.8, 10.8, 1.2); ctx.fillStyle = '#6a6a66'; ctx.fillRect(-.45, -12.4, .9, 2.4); // the helm, a short nasal
    h.shield('#5a6878', '#1c2228', 5.6, -7.4, 0); ctx.strokeStyle = '#7a3a22'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.arc(-6.4, 1.2, 5.2, 0, 7); ctx.stroke(); // the garrison's rim, painted
    h.sword(); ctx.restore(); },
  /* a Grass Jacket: a lighter quilted coat, an open iron helm with a strip of faded green cloth tied at its crest and trailing */
  b5_c4_grassjacket(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1); const fl = o.still ? 0 : Math.sin(t/260 + (o.phase || 0));
    h.legs('#2e2e28'); h.torso(b2Pick(o, ['#5a6248', '#56603e', '#606a4a']), '#1e2216', 5.8); ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 3; i++) { ctx.moveTo(-5.4, -3 + i*3); ctx.lineTo(5.4, -3 + i*3); } ctx.stroke(); // quilting
    ctx.fillStyle = '#2a2016'; ctx.fillRect(-5.8, 3.2, 11.6, 1.3);
    h.head('#b48c6c', 4.2, -11.2); h.look();
    ctx.beginPath(); ctx.arc(0, -12.4, 4.9, Math.PI, 0); ctx.fillStyle = h.armor('#7e7e7a', '#262624'); ctx.fill(); ctx.fillRect(-5.2, -12.8, 10.4, 1.1); // the open helm
    poly(ctx, [[-.8,-17.4],[1,-17.4],[5 + fl,-14.6],[7.6 + fl*1.4,-11],[5.8 + fl,-10.6],[3 + fl*.6,-13.8]], '#6a8a4a'); ctx.fillStyle = 'rgba(200,230,160,.3)'; ctx.fillRect(-.4, -17.2, 2, .6); // green cloth tied at the crest, trailing
    B2F.line(ctx, '#4a3a2a', 1.1, [[8, 12], [9.4, -18]]); poly(ctx, [[9.4,-22],[8.6,-17.6],[10.4,-17.6]], '#b8b8b0'); // a spear
    ctx.restore(); },
  /* the fort's cadre-master: an older mage, a long grey coat with dark piping, grey hair, a list held up; a little stooped */
  b5_c4_cadremaster(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.02); ctx.rotate(.04);
    B2F.robe(ctx, h, '#62666a', '#202226', 6.2, 7.8); ctx.fillStyle = '#34383e'; ctx.fillRect(-1.2, -6, 1.2, 18); ctx.fillRect(-6.2, 1.6, 12.4, 1); ctx.fillRect(-6.6, 9.4, 13.2, 1); // the piping
    ctx.fillStyle = '#b8967a'; ctx.fillRect(5.6, -5, 2, 4); poly(ctx, [[6,-9],[11,-10],[11.4,-3],[6.4,-2]], '#e2d8c0'); ctx.fillStyle = 'rgba(40,30,20,.6)'; for (let i = 0; i < 4; i++) ctx.fillRect(7, -8.6 + i*1.5, 3.4, .4); // the list
    h.head('#b89a80', 4.1, -11.4); h.look('rgba(24,14,10,.8)', -11.6); ctx.fillStyle = 'rgba(40,24,16,.45)'; ctx.fillRect(-2.6, -13.2, 5.2, .5); // lines on the brow
    B2F.cap(ctx, '#a8a49c', 4.3, -12.4, 1.02, 1.9); ctx.fillStyle = '#a8a49c'; ctx.fillRect(-4.4, -12.2, 1.4, 4); ctx.fillRect(3, -12.2, 1.4, 4); // grey hair
    ctx.fillStyle = '#34383e'; ctx.fillRect(-3.6, -7.6, 7.2, 1); ctx.restore(); },
});
/* the shared figures, in case an earlier chapter's art is not loaded (the brief's guarded placeholders) */
FIGX.b5_c1_ennic ??= FIGX.b5_letherii; FIGX.b5_c1_clerk ??= FIGX.b5_letherii; FIGX.b5_c1_tilewoman ??= FIGX.b5_letherii; FIGX.b5_c3_faraed ??= FIGX.b5_letherii_bow;

/* ---------------- the grounds (TILEX) ---------------- */
const B54G = {road:'#6a5c44', roadD:'#2a241a', leaf:'#4a3c26', leafD:'#1c1710', moss:'#3a4a2a', turf:'#4e5a36', turfD:'#1e2416', earth:'#5a4a36', earthD:'#241d15',
  crest:'#6a5a3e', crestD:'#2a2418', stone:'#6a665e', stoneD:'#2a2826', bank:'#4a3e2e', bankD:'#1c1812', grass:'#7a7048', grassD:'#2c2a1c', water:'#3a5258', waterD:'#101c20', fern:'#3e5a2e', fernD:'#16220f'};
/* a tree from above: a trunk's foot, a dark round crown with a lit edge */
function b54Tree(ctx, x, y, T, dark, conifer){ const px = x*T, py = y*T, cx = px + T*.5, cy = py + T*.46;
  ctx.fillStyle = dark ? '#0c120a' : '#1e2a16'; ctx.fillRect(px, py, T, T);
  ell(ctx, cx + T*.06, cy + T*.1, T*.5, T*.44, 'rgba(0,0,0,.4)');
  const c1 = dark ? (conifer ? '#121e12' : '#18220e') : (conifer ? '#24382a' : '#2e4220'), c2 = dark ? '#22301a' : (conifer ? '#3a5236' : '#46602c');
  ell(ctx, cx, cy, T*.48, T*.44, c1); for (let i = 0; i < 5; i++) ell(ctx, cx + T*(hash(x, y, 821 + i) - .5)*.5, cy + T*(hash(x, y, 826 + i) - .5)*.44, T*.18, T*.16, i % 2 ? c1 : c2);
  ell(ctx, cx - T*.16, cy - T*.14, T*.16, T*.12, dark ? 'rgba(120,150,90,.12)' : 'rgba(200,220,140,.18)'); }
/* leaf litter and fern: brown-green, scattered leaves */
function b54Litter(ctx, x, y, T, dark, fern){ const px = x*T, py = y*T, P = B54G; ctx.fillStyle = fern ? (dark ? P.fernD : P.moss) : (dark ? P.leafD : P.leaf); ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .12, '220,200,150', 1);
  if (fern) for (let i = 0; i < 4; i++) { const fx = px + T*(.15 + hash(x, y, 831 + i)*.7), fy = py + T*(.2 + hash(x, y, 835 + i)*.6), a = hash(x, y, 839 + i)*6.28; ctx.strokeStyle = dark ? '#2a3a1e' : P.fern; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + Math.cos(a)*T*.2, fy + Math.sin(a)*T*.2); ctx.stroke(); for (let k = 1; k < 4; k++) { const mx = fx + Math.cos(a)*T*.05*k, my = fy + Math.sin(a)*T*.05*k; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(a + 1.2)*T*.06, my + Math.sin(a + 1.2)*T*.06); ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(a - 1.2)*T*.06, my + Math.sin(a - 1.2)*T*.06); ctx.stroke(); } }
  else for (let i = 0; i < 5; i++) ell(ctx, px + T*(.1 + hash(x, y, 841 + i)*.8), py + T*(.1 + hash(x, y, 846 + i)*.8), T*.05, T*.03, dark ? 'rgba(110,70,30,.35)' : ['#8a5a2a', '#9a7a34', '#6a4a22'][i % 3]); }
/* a boulder */
function b54Rock(ctx, px, py, T, dark){ ell(ctx, px + T*.5, py + T*.84, T*.44, T*.12, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? B54G.stoneD : B54G.stone; ctx.beginPath(); ctx.moveTo(px + T*.08, py + T*.84); ctx.lineTo(px + T*.18, py + T*.34); ctx.lineTo(px + T*.52, py + T*.14); ctx.lineTo(px + T*.86, py + T*.32); ctx.lineTo(px + T*.92, py + T*.84); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(220,220,210,.12)'; poly(ctx, [[px + T*.18, py + T*.34], [px + T*.52, py + T*.14], [px + T*.5, py + T*.5]], ctx.fillStyle); ctx.fillStyle = 'rgba(110,140,80,.3)'; ell(ctx, px + T*.6, py + T*.3, T*.12, T*.05, ctx.fillStyle); }
/* the stream: brown water running fast, white where it breaks */
function b54Stream(ctx, x, y, T, dark, ford){ const px = x*T, py = y*T, P = B54G; const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, dark ? P.waterD : '#4a5a52'); g.addColorStop(1, dark ? '#0a1214' : P.water); ctx.fillStyle = g; ctx.fillRect(px, py, T, T);
  ctx.fillStyle = 'rgba(120,96,60,.25)'; ctx.fillRect(px, py, T, T); // brown with the mountains
  for (let i = 0; i < 4; i++) { ctx.fillStyle = `rgba(230,236,230,${(.2 + hash(x, y, 851 + i)*.3).toFixed(2)})`; ctx.fillRect(px + T*hash(x, y, 855 + i)*.7, py + T*(.15 + i*.22), T*(.14 + hash(x, y, 859 + i)*.2), Math.max(1, T*.03)); }
  if (ford) { for (let i = 0; i < 5; i++) ell(ctx, px + T*(.15 + i*.17), py + T*(.4 + hash(x, y, 861 + i)*.2), T*.08, T*.05, dark ? '#3a3a36' : '#8a8478'); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(px, py + T*.36, T, Math.max(1, T*.04)); } } // the ford's stones
TILEX.b5_c4_road = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, P = B54G;
  if (ch === 'T') return b54Tree(ctx, x, y, T, dark, hash(x, y, 871) > .6);
  if (ch === '~') return b54Stream(ctx, x, y, T, dark, false);
  if (ch === '-') return b54Stream(ctx, x, y, T, dark, true);
  if (ch === ',') return b54Litter(ctx, x, y, T, dark, false);
  if (ch === '#') { b54Litter(ctx, x, y, T, dark, false); return b54Rock(ctx, px, py, T, dark); }
  if (ch === 'h') { b54Litter(ctx, x, y, T, dark, true); ell(ctx, px + T*.5, py + T*.6, T*.46, T*.32, dark ? 'rgba(80,90,50,.5)' : 'rgba(140,150,90,.7)'); ell(ctx, px + T*.44, py + T*.5, T*.28, T*.14, 'rgba(255,250,210,.14)'); ell(ctx, px + T*.62, py + T*.52, T*.06, T*.04, '#8a8478'); return; } // the bare hill
  ctx.fillStyle = dark ? P.roadD : P.road; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .12, '230,220,190', 1); // the old paving, under litter
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; ctx.strokeRect(px + T*.08 + .5, py + T*.1 + .5, T*.4, T*.34); ctx.strokeRect(px + T*.52 + .5, py + T*.5 + .5, T*.4, T*.36);
  for (let i = 0; i < 3; i++) ell(ctx, px + T*(.1 + hash(x, y, 881 + i)*.8), py + T*(.1 + hash(x, y, 884 + i)*.8), T*.05, T*.03, dark ? 'rgba(110,70,30,.35)' : '#8a5a2a');
  if (ch === '^') { ctx.fillStyle = 'rgba(255,240,200,.16)'; ctx.fillRect(px + T*.2, py, T*.6, T); } });
/* the west rampart: turf, trampled earth, the crest of earth and turf, the bastion tower's stone, the fort's inner wall */
const b54Is = (x, y, s) => s.includes(b2Tile(x, y));
function b54Turf(ctx, x, y, T, dark, trampled){ const px = x*T, py = y*T, P = B54G; ctx.fillStyle = trampled ? (dark ? P.earthD : P.earth) : (dark ? P.turfD : P.turf); ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .14, trampled ? '220,200,160' : '200,220,150', 1);
  if (!trampled) for (let i = 0; i < 5; i++) B2F.line(ctx, dark ? 'rgba(100,120,70,.4)' : 'rgba(150,170,90,.55)', 1, [[px + T*(.1 + hash(x, y, 891 + i)*.8), py + T*(.6 + hash(x, y, 896 + i)*.3)], [px + T*(.12 + hash(x, y, 891 + i)*.8), py + T*(.45 + hash(x, y, 896 + i)*.3)]]);
  else { ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 3; i++) ell(ctx, px + T*(.2 + hash(x, y, 901 + i)*.6), py + T*(.2 + hash(x, y, 904 + i)*.6), T*.05, T*.03, ctx.fillStyle); } }
function b54Crest(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B54G, back = !b54Is(x, y + 1, '=#^');
  ctx.fillStyle = dark ? P.crestD : P.crest; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .12, '220,200,160', 1);
  ctx.fillStyle = dark ? 'rgba(80,100,50,.4)' : 'rgba(110,130,70,.6)'; ctx.fillRect(px, py, T, T*.18); // turf on the top of the bank
  if (back) { ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(px, py + T*.8, T, T*.2); ctx.fillStyle = dark ? '#3a3020' : '#7a6a48'; for (let i = 0; i < 3; i++) ctx.fillRect(px + T*(.1 + i*.32), py + T*.62, T*.18, T*.18); } // the firing step cut in the back, stakes
  for (let i = 0; i < 2; i++) { const sx = px + T*(.25 + i*.5); B2F.line(ctx, dark ? '#2a2014' : '#4a3a22', Math.max(1, T*.05), [[sx, py + T*.4], [sx + T*.04, py - T*.02]]); } } // sharpened stakes along the crest
function b54Stone(ctx, x, y, T, dark){ const px = x*T, py = y*T, P = B54G, front = !b54Is(x, y + 1, '#');
  ctx.fillStyle = dark ? P.stoneD : P.stone; ctx.fillRect(px, py, T, T); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1;
  for (let r = 0; r < 3; r++) { ctx.beginPath(); ctx.moveTo(px, py + r*T/3); ctx.lineTo(px + T, py + r*T/3); ctx.stroke(); for (let k = 0; k < 2; k++) { const bx = px + T*((k + (r % 2)*.5)/2 + .25); ctx.beginPath(); ctx.moveTo(bx, py + r*T/3); ctx.lineTo(bx, py + (r + 1)*T/3); ctx.stroke(); } }
  ctx.fillStyle = 'rgba(255,250,230,.06)'; ctx.fillRect(px, py, T*.1, T);
  if (front) { ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px, py + T*.86, T, T*.14); } }
TILEX.b5_c4_rampart = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === '=') return b54Crest(ctx, x, y, T, dark);
  if (ch === '#') return b54Stone(ctx, x, y, T, dark);
  if (ch === '^') { b54Crest(ctx, x, y, T, dark); ctx.fillStyle = dark ? '#2a2014' : '#5a4a30'; for (let i = 0; i < 4; i++) ctx.fillRect(px + T*.26, py + T*(.1 + i*.22), T*.48, T*.12); return; } // the sally-steps, cut in the bank
  if (ch === 'g') { b54Stone(ctx, x, y, T, dark); ctx.fillStyle = dark ? '#1a120a' : '#3a2a18'; ctx.fillRect(px + T*.14, py + T*.2, T*.72, T*.8); ctx.fillStyle = dark ? '#2a2014' : '#5a4228'; ctx.fillRect(px + T*.18, py + T*.24, T*.3, T*.76); ctx.fillRect(px + T*.52, py + T*.24, T*.3, T*.76); ctx.fillStyle = '#6a6a66'; ctx.fillRect(px + T*.18, py + T*.5, T*.64, Math.max(1, T*.05)); return; } // the gate, its doors
  b54Turf(ctx, x, y, T, dark, ch === ',');
  if (ch === 'F') { const cx = px + T*.5, cy = py + T*.6; glow(ctx, cx, cy, T*1.2, '#ff8a3a', dark ? .3 : .18); ctx.fillStyle = dark ? '#2a2014' : '#4a3a24'; ell(ctx, cx, cy, T*.34, T*.2, ctx.fillStyle); ell(ctx, cx, cy, T*.22, T*.1, '#1a0e08'); poly(ctx, [[cx - T*.16, cy], [cx - T*.04, cy - T*.4], [cx + T*.02, cy - T*.18], [cx + T*.08, cy - T*.34], [cx + T*.16, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - T*.07, cy], [cx, cy - T*.2], [cx + T*.07, cy]], '#fff1c2'); } // the fire in its turf-banked pit
  if (ch === 'p') { ell(ctx, px + T*.5, py + T*.86, T*.42, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#3a2c1c' : '#5a4428'; ctx.fillRect(px + T*.1, py + T*.42, T*.8, T*.42); ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.strokeRect(px + T*.1 + .5, py + T*.42 + .5, T*.8 - 1, T*.42 - 1);
    for (let i = 0; i < 3; i++) { ell(ctx, px + T*(.26 + i*.24), py + T*.4, T*.1, T*.1, '#16120e'); ctx.fillStyle = '#7a6a4a'; ctx.fillRect(px + T*(.25 + i*.24), py + T*.24, T*.03, T*.12); } } // the brand-pot crate, the pots' necks and rags
  if (ch === 'v') { ctx.fillStyle = dark ? '#3a3020' : '#7a6a48'; ctx.fillRect(px + T*.1, py, T*.8, T*.3); ctx.fillStyle = 'rgba(255,240,200,.12)'; ctx.fillRect(px + T*.1, py, T*.8, T*.06); } }); // the firing step's boards
/* Dry Gully at night: a stony bed, dry grass, brush, the earth banks */
TILEX.b5_c4_gully = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T, P = B54G;
  if (ch === '#') { ctx.fillStyle = dark ? P.bankD : P.bank; ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .05, .14, '200,180,140', 1); if (!b54Is(x, y + 1, '#') && y < 11) { ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px, py + T*.8, T, T*.2); } if (!b54Is(x, y - 1, '#') && y > 0) { ctx.fillStyle = dark ? 'rgba(120,110,70,.3)' : 'rgba(160,150,100,.5)'; ctx.fillRect(px, py, T, T*.14); } return; } // the bank's earth, its lip of grass
  if (ch === ',') { ctx.fillStyle = dark ? P.grassD : P.grass; ctx.fillRect(px, py, T, T); for (let i = 0; i < 8; i++) B2F.line(ctx, dark ? 'rgba(150,140,90,.35)' : 'rgba(200,190,120,.6)', 1, [[px + T*(.06 + hash(x, y, 911 + i)*.88), py + T*.95], [px + T*(.08 + hash(x, y, 911 + i)*.88), py + T*(.4 + hash(x, y, 919 + i)*.4)]]); return; }
  ctx.fillStyle = dark ? '#262420' : '#5a5650'; ctx.fillRect(px, py, T, T); for (let i = 0; i < 6; i++) ell(ctx, px + T*(.1 + hash(x, y, 921 + i)*.8), py + T*(.1 + hash(x, y, 927 + i)*.8), T*(.06 + hash(x, y, 933 + i)*.06), T*.04, dark ? '#3a3834' : '#8a867c'); // stones on the old bed
  if (ch === 'x') { ell(ctx, px + T*.5, py + T*.8, T*.4, T*.1, 'rgba(0,0,0,.4)'); for (let i = 0; i < 10; i++) { const a = -Math.PI/2 + (hash(x, y, 941 + i) - .5)*2.4; B2F.line(ctx, dark ? '#2e2a1c' : '#5a4e30', Math.max(1, T*.03), [[px + T*.5, py + T*.8], [px + T*.5 + Math.cos(a)*T*.4, py + T*.8 + Math.sin(a)*T*.5]]); } } // brush
  if (ch === 'e') { ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let i = 0; i < 4; i++) { ell(ctx, px + T*(.2 + i*.18), py + T*(.3 + (i % 2)*.3), T*.07, T*.11, ctx.fillStyle); } } // bare footprints, big
  if (ch === 'v') { ctx.fillStyle = 'rgba(220,200,160,.16)'; ctx.fillRect(px + T*.3, py, T*.4, T); } });
/* the wood west of the fort: forest floor, fern, rock, the old trees */
TILEX.b5_c4_wood = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
  if (ch === 'T') return b54Tree(ctx, x, y, T, dark, hash(x, y, 951) > .5);
  if (ch === ',') return b54Litter(ctx, x, y, T, dark, true);
  b54Litter(ctx, x, y, T, dark, false);
  if (ch === '#') return b54Rock(ctx, px, py, T, dark);
  if (ch === 'w') { b54Litter(ctx, x, y, T, dark, true); ctx.fillStyle = 'rgba(0,0,0,.25)'; ell(ctx, px + T*.5, py + T*.5, T*.42, T*.3, ctx.fillStyle); ctx.fillStyle = '#7e7e7a'; ctx.beginPath(); ctx.arc(px + T*.62, py + T*.46, T*.12, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#6a8a4a'; ctx.fillRect(px + T*.68, py + T*.44, T*.2, T*.04); return; } // ferns pressed flat, a dropped helm, green cloth
  if (ch === 'v') { ctx.fillStyle = 'rgba(220,200,160,.16)'; ctx.fillRect(px + T*.3, py, T*.4, T); } });
/* in fights: 't' is cover (a brand-pot crate or a turf-and-wicker breastwork on the rampart, a boulder in the gully, a fallen trunk in the wood) */
function b54Cover(ctx, x, y, T, dark, st){ const px = x*T, py = y*T;
  if (st === 'b5_c4_gully') return b54Rock(ctx, px, py, T, dark);
  if (st === 'b5_c4_wood' || st === 'b5_c4_road') { ell(ctx, px + T*.5, py + T*.8, T*.46, T*.12, 'rgba(0,0,0,.5)'); ctx.save(); ctx.translate(px + T*.5, py + T*.6); ctx.rotate(-.3); ctx.fillStyle = dark ? '#2a2016' : '#5a4228'; ctx.fillRect(-T*.46, -T*.12, T*.92, T*.24); ctx.fillStyle = dark ? '#3a2e20' : '#7a5e3a'; ell(ctx, T*.46, 0, T*.08, T*.12, ctx.fillStyle); ctx.fillStyle = 'rgba(110,140,70,.4)'; ctx.fillRect(-T*.3, -T*.12, T*.3, T*.06); ctx.restore(); return; } // a fallen trunk, moss on it
  ell(ctx, px + T*.5, py + T*.86, T*.44, T*.1, 'rgba(0,0,0,.5)'); ctx.fillStyle = dark ? '#2a2418' : '#5a4a30'; ctx.fillRect(px + T*.08, py + T*.36, T*.84, T*.48); ctx.strokeStyle = dark ? '#3a3020' : '#7a6440'; ctx.lineWidth = Math.max(1, T*.04); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(px + T*.08, py + T*(.42 + i*.11)); ctx.quadraticCurveTo(px + T*.5, py + T*(.46 + i*.11), px + T*.92, py + T*(.42 + i*.11)); ctx.stroke(); } // a wicker breastwork
  ctx.fillStyle = dark ? 'rgba(80,100,50,.4)' : 'rgba(110,130,70,.7)'; ctx.fillRect(px + T*.06, py + T*.3, T*.88, T*.1); } // turf on top
{ const B54ST = ['b5_c4_road', 'b5_c4_rampart', 'b5_c4_gully', 'b5_c4_wood'], _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (B54ST.includes(style) && ch === 't') return b54Cover(ctx, x, y, T, dark, style); return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* the mountains to the north, far: two ranges, the pass a notch in them */
function b54Mountains(x, W, H, base, near, far){ x.fillStyle = far; x.beginPath(); x.moveTo(0, base); for (let i = 0; i <= 24; i++) { const u = i/24, notch = Math.abs(u - .62) < .05 ? .08 : 0; x.lineTo(W*u, base - H*(.14 + hash(i, 5401)*.1 - notch)); } x.lineTo(W, base); x.fill();
  x.fillStyle = near; x.beginPath(); x.moveTo(0, base + 2); for (let i = 0; i <= 16; i++) x.lineTo(W*i/16, base - H*(.04 + hash(i, 5402)*.05)); x.lineTo(W, base + 2); x.fill(); }
/* the line of ramparts along the gully, the stone fort, the royals' rampart with the standards, seen from the west end */
function b54Line(x, W, H, gy, sky, t, mo){ const dk = sky === 'night' ? '#0c0e0a' : sky === 'battle' ? '#1e1c18' : '#2e2a1e';
  x.fillStyle = sky === 'night' ? '#16180e' : '#3a3a24'; x.fillRect(0, gy, W, H*.012); // the gully, a dark line across the grass
  [[.06, .3], [.36, .3], [.68, .3]].forEach(([u, w]) => { x.fillStyle = dk; x.beginPath(); x.moveTo(W*u, gy - H*.005); x.quadraticCurveTo(W*(u + w/2), gy - H*.03, W*(u + w), gy - H*.005); x.fill(); }); // the three gully ramparts
  x.fillStyle = sky === 'night' ? '#14140e' : '#4a463c'; x.fillRect(W*.82, gy - H*.05, W*.07, H*.045); for (let i = 0; i < 4; i++) x.fillRect(W*(.82 + i*.021), gy - H*.06, W*.01, H*.012); // the small stone fort on the easternmost
  x.fillStyle = dk; x.beginPath(); x.moveTo(W*.6, gy + H*.06); x.quadraticCurveTo(W*.78, gy + H*.02, W*.96, gy + H*.06); x.fill(); } // the royals' rampart, nearer
function b54Standards(ctx, W, H, gy, t, mo, sky){ [[.66, '#8a2a22'], [.72, '#c9a35a'], [.78, '#3a4a7a'], [.86, '#c9a35a']].forEach(([u, c], i) => { const sx = W*u, sy = gy + H*.03, fl = mo ? Math.sin(t/420 + i*1.7) : 0;
    ctx.fillStyle = '#1a1610'; ctx.fillRect(sx, sy - H*.09, 1.2, H*.09); ctx.fillStyle = sky === 'night' ? 'rgba(80,60,40,.6)' : c; ctx.beginPath(); ctx.moveTo(sx + 1, sy - H*.09); ctx.quadraticCurveTo(sx + W*.012, sy - H*.088 + fl, sx + W*.024, sy - H*.084 + fl*1.4); ctx.lineTo(sx + W*.024, sy - H*.064 + fl*1.4); ctx.quadraticCurveTo(sx + W*.012, sy - H*.066 + fl, sx + 1, sy - H*.068); ctx.fill(); });
  for (let i = 0; i < 3; i++) { const bx = W*(.68 + i*.06), by = gy + H*.045; ctx.strokeStyle = '#1a1610'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(bx - 6, by); ctx.lineTo(bx + 4, by - 6); ctx.stroke(); } } // the Dresh ballistae, long-armed
/* the Edur across the field: a dark line at the foot of the mountains, their fires at night */
function b54Host(ctx, W, H, hy, sky, t, mo, near){ ctx.fillStyle = sky === 'night' ? '#060604' : '#141210'; ctx.beginPath(); ctx.moveTo(0, hy); for (let i = 0; i <= 40; i++) ctx.lineTo(W*i/40, hy - H*(near ? .02 : .008) - hash(i, 5411)*H*(near ? .02 : .008)); ctx.lineTo(W, hy + H*.01); ctx.lineTo(0, hy + H*.01); ctx.fill();
  if (sky === 'night') for (let i = 0; i < 70; i++) { const fx = hash(i, 5412)*W, fy = hy - H*.004 + hash(i, 5413)*H*.02, fl = mo ? .7 + Math.sin(t/180 + i*1.3)*.3 : 1; ctx.fillStyle = `rgba(255,150,70,${(.45*fl + hash(i, 5414)*.3).toFixed(2)})`; ctx.fillRect(fx, fy, 1.6, 1.6); } }
/* the bastion tower and the west rampart from inside, the fire-pit, the crate: the near part of b5_highfort */
function b54Tower(x, W, H, base, sky){ const c = sky === 'night' ? '#0c0c0e' : sky === 'battle' ? '#2a2826' : '#3a3632', l = sky === 'night' ? '#1a1a1c' : sky === 'battle' ? '#3e3a36' : '#5a554e';
  x.fillStyle = c; x.fillRect(W*.04, base - H*.5, W*.18, H*.5); x.fillStyle = l; x.fillRect(W*.04, base - H*.5, W*.03, H*.5); for (let i = 0; i < 5; i++) x.fillRect(W*(.04 + i*.04), base - H*.54, W*.024, H*.04); // the tower, its merlons
  x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 1; for (let r = 0; r < 10; r++) { x.beginPath(); x.moveTo(W*.04, base - H*.5 + r*H*.05); x.lineTo(W*.22, base - H*.5 + r*H*.05); x.stroke(); }
  x.fillStyle = sky === 'night' ? 'rgba(255,190,110,.6)' : '#1a1612'; x.fillRect(W*.12, base - H*.36, W*.014, H*.04); x.fillRect(W*.12, base - H*.2, W*.014, H*.04); // arrow-slits, lit at night
  x.strokeStyle = sky === 'night' ? '#16120e' : '#2a2016'; x.lineWidth = 2; x.beginPath(); x.moveTo(W*.18, base - H*.54); x.lineTo(W*.3, base - H*.62); x.moveTo(W*.2, base - H*.54); x.lineTo(W*.24, base - H*.6); x.stroke(); } // a ballista's arm on the top
function b54Crestline(x, W, H, cy, sky){ x.fillStyle = sky === 'night' ? '#0e0e0a' : sky === 'battle' ? '#2a261c' : '#3e3a26'; x.beginPath(); x.moveTo(W*.2, cy); x.quadraticCurveTo(W*.6, cy - H*.03, W, cy - H*.01); x.lineTo(W, H); x.lineTo(W*.2, H); x.fill();
  for (let i = 0; i < 22; i++) { const sx = W*(.22 + i*.036); x.strokeStyle = sky === 'night' ? '#1a160e' : '#4a3a22'; x.lineWidth = 1.6; x.beginPath(); x.moveTo(sx, cy - H*.012); x.lineTo(sx + 2, cy - H*.05); x.stroke(); } } // the crest's stakes
SCENEX.b5_highfort = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, ph = f.b5_c4_ph || 2;
  const sky = ph >= 3 ? 'battle' : (f.b5_c4_night || f.b5_c4_patrol || f.b5_c4_cadre) ? 'night' : 'dusk', hz = H*.42, gy = H*.5;
  ctx.drawImage(sceneLayer('b54:hf' + sky, W, H, (x, W, H) => {
    const st = sky === 'night' ? [[0,'#04060e'],[1,'#161c2a']] : sky === 'battle' ? [[0,'#5a5a5e'],[.7,'#9a8e7a'],[1,'#c8b08a']] : [[0,'#2a2a4a'],[.5,'#6a5a6e'],[.85,'#c88a5a'],[1,'#e0a066']];
    x.fillStyle = vgrad(x, 0, hz, st); x.fillRect(0, 0, W, hz + 2);
    if (sky === 'night') for (let i = 0; i < 70; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 5421)*.45).toFixed(2)})`; x.fillRect(hash(i, 5422)*W, Math.pow(hash(i, 5423), 1.4)*hz*.7, 1, 1); }
    b54Mountains(x, W, H, hz, sky === 'night' ? '#080a0e' : sky === 'battle' ? '#5a5a58' : '#3a3044', sky === 'night' ? '#12161e' : sky === 'battle' ? '#7a7872' : '#5a4a5a');
    x.fillStyle = vgrad(x, hz, H, sky === 'night' ? [[0,'#0e120a'],[1,'#060806']] : sky === 'battle' ? [[0,'#5a5a3a'],[1,'#3a3a24']] : [[0,'#4a4a2e'],[1,'#2a2a1a']]); x.fillRect(0, hz, W, H - hz); // the pasture
    b54Line(x, W, H, gy, sky, 0, 0);
    b54Crestline(x, W, H, H*.7, sky); b54Tower(x, W, H, H*.78, sky);
    x.fillStyle = sky === 'night' ? '#0a0a08' : '#2a2418'; x.fillRect(0, H*.78, W, H*.22); // the rampart's turf, inside
  }), 0, 0, W, H);
  b54Host(ctx, W, H, hz + H*.02, sky === 'night' ? 'night' : 'day', t, mo, false);
  b54Standards(ctx, W, H, gy, t, mo, sky);
  if (sky === 'battle') { ctx.globalCompositeOperation = 'lighter'; const k = mo ? .7 + Math.sin(t/90)*.3 : 1; glow(ctx, W*.85, gy - H*.1, H*.3, '#c8d8ff', .25*k); ctx.fillStyle = `rgba(230,240,255,${(.6*k).toFixed(2)})`; ctx.fillRect(W*.85 - 2, 0, 4, gy); ctx.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 6; i++) { const sx = W*(.3 + i*.08) + (mo ? Math.sin(t/300 + i)*4 : 0); ctx.fillStyle = 'rgba(14,12,20,.8)'; ell(ctx, sx, gy + H*.05, 3, 5, ctx.fillStyle); } } // the lightning far east, wraiths on the grass
  { const fx = W*.62, fy = H*.86, fl = b2Fl(t); if (ph < 3) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, H*.18, '#ff8a3a', .35*fl); ctx.globalCompositeOperation = 'source-over'; poly(ctx, [[fx - 7, fy], [fx - 2, fy - 12*fl], [fx + 1, fy - 6], [fx + 4, fy - 10*fl], [fx + 7, fy]], 'rgba(255,160,70,.95)'); } else { ell(ctx, fx, fy, 8, 3, '#1a1410'); } } // the rampart's fire (kicked out on the morning)
  ctx.fillStyle = '#16120e'; ctx.fillRect(W*.3, H*.84, 18, 10); for (let i = 0; i < 3; i++) ell(ctx, W*.3 + 4 + i*5, H*.84, 2.4, 2.2, '#0c0a08'); // the brand-pot crate
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.4 + i*18, H*.94, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, sky === 'night' ? .6 : .45, .5); };
/* the forest road, or the wood at dusk on 'run': trunks, a roof of leaves letting the light down in coins, the road soft with litter */
SCENEX.b5_c4_forest = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, dusk = f.b5_c4_key === 'run';
  ctx.drawImage(sceneLayer('b54:forest' + (dusk ? 'd' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, H, dusk ? [[0,'#141a14'],[.6,'#2a2a1e'],[1,'#141410']] : [[0,'#2a3a22'],[.5,'#4a5a34'],[1,'#3a3422']]); x.fillRect(0, 0, W, H);
    for (let i = 0; i < 30; i++) { const tx = hash(i, 5431)*W, tw = 4 + hash(i, 5432)*W*.03, far = hash(i, 5433) < .55; x.fillStyle = far ? (dusk ? '#1e221a' : '#3a4430') : (dusk ? '#0c0e0a' : '#1e1a12'); x.fillRect(tx, 0, tw*(far ? .6 : 1), H*(far ? .62 : .8)); if (!far) { x.fillStyle = 'rgba(255,240,200,.06)'; x.fillRect(tx, 0, 1.4, H*.8); } } // trunks, far and near
    x.fillStyle = dusk ? '#0a0e08' : '#1a2614'; x.beginPath(); x.moveTo(0, 0); x.lineTo(W, 0); x.lineTo(W, H*.1); for (let i = 16; i >= 0; i--) x.lineTo(W*i/16, H*(.1 + hash(i, 5434)*.08)); x.fill(); // the roof of leaves
    x.fillStyle = vgrad(x, H*.62, H, dusk ? [[0,'#1a160e'],[1,'#0a0806']] : [[0,'#4a3c26'],[1,'#2a2016']]); x.fillRect(0, H*.62, W, H*.38); // the floor
    x.fillStyle = dusk ? '#2a2418' : '#6a5a40'; x.beginPath(); x.moveTo(W*.38, H*.62); x.lineTo(W*.62, H*.62); x.lineTo(W*.86, H); x.lineTo(W*.14, H); x.fill(); // the road going away
    for (let i = 0; i < 80; i++) ell(x, hash(i, 5435)*W, H*(.64 + hash(i, 5436)*.36), 2, 1.2, dusk ? 'rgba(80,50,20,.4)' : ['#8a5a2a', '#9a7a34', '#6a4a22'][i % 3]); // leaves
  }), 0, 0, W, H);
  ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 14; i++) { const k = mo ? .6 + Math.sin(t/700 + i*1.9)*.4 : .8, lx = hash(i, 5437)*W, ly = H*(.66 + hash(i, 5438)*.3); ctx.fillStyle = dusk ? `rgba(200,140,80,${(.05*k).toFixed(3)})` : `rgba(255,240,180,${(.14*k).toFixed(3)})`; ell(ctx, lx, ly, 6 + hash(i, 5439)*10, 2 + hash(i, 5440)*3, ctx.fillStyle); } ctx.globalCompositeOperation = 'source-over'; // light let down in coins
  if (!dusk) for (let i = 0; i < 3; i++) { const k = mo ? ((t/14000 + i*.33) % 1) : hash(i, 5441), gx = lerp(-20, W + 20, k), gy = H*(.16 + hash(i, 5442)*.12) + (mo ? Math.sin(t/400 + i)*3 : 0), wg = mo ? Math.sin(t/120 + i)*2 : 1; ctx.strokeStyle = 'rgba(20,20,16,.6)'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(gx - 4, gy - wg); ctx.quadraticCurveTo(gx - 1.6, gy - 2, gx, gy); ctx.quadraticCurveTo(gx + 1.6, gy - 2, gx + 4, gy - wg); ctx.stroke(); } // birds under the roof
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.34 + i*18, H*.9, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, dusk ? .65 : .5, .5); };
/* the field from the west rampart: Dry Gully across the pasture, the far ramparts along it, the stone fort, the royal standards, the Edur a dark line */
SCENEX.b5_c4_field = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, night = !!(f.b5_c4_patrol || f.b5_c4_night || f.b5_c4_cadre), hz = H*.36, gy = H*.56;
  ctx.drawImage(sceneLayer('b54:field' + (night ? 'n' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, night ? [[0,'#04060e'],[1,'#141a26']] : [[0,'#3a3a5a'],[.6,'#9a7a6a'],[1,'#e0a466']]); x.fillRect(0, 0, W, hz + 2);
    if (night) for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 5451)*.45).toFixed(2)})`; x.fillRect(hash(i, 5452)*W, Math.pow(hash(i, 5453), 1.4)*hz*.8, 1, 1); }
    b54Mountains(x, W, H, hz, night ? '#06080c' : '#3a3246', night ? '#10141c' : '#5a4a58');
    x.fillStyle = vgrad(x, hz, H, night ? [[0,'#0e120a'],[1,'#060806']] : [[0,'#5a5a34'],[1,'#3a3a22']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 40; i++) B2F.line(x, night ? 'rgba(90,100,60,.3)' : 'rgba(160,160,90,.35)', 1, [[hash(i, 5454)*W, H*(.6 + hash(i, 5455)*.4)], [hash(i, 5454)*W + 2, H*(.58 + hash(i, 5455)*.4)]]); // grass
    b54Line(x, W, H, gy, night ? 'night' : 'dusk', 0, 0);
    x.fillStyle = night ? '#0a0a08' : '#2a2418'; x.beginPath(); x.moveTo(0, H*.86); x.quadraticCurveTo(W*.5, H*.82, W, H*.86); x.lineTo(W, H); x.lineTo(0, H); x.fill(); // the crest in front, near
    for (let i = 0; i < 18; i++) { const sx = W*(.03 + i*.057); x.strokeStyle = night ? '#16120c' : '#4a3a22'; x.lineWidth = 2; x.beginPath(); x.moveTo(sx, H*.86); x.lineTo(sx + 2, H*.79); x.stroke(); }
  }), 0, 0, W, H);
  b54Host(ctx, W, H, hz + H*.04, night ? 'night' : 'day', t, mo, false);
  b54Standards(ctx, W, H, gy, t, mo, night ? 'night' : 'dusk');
  if (!night) { const px = W*(.74 + (mo ? Math.sin(t/2600)*.05 : 0)); drawFigure(ctx, 'b5_letherii', px, gy + H*.05, .5, t, {still:true, dir:mo && Math.cos(t/2600) < 0 ? -1 : 1}); } // one officer walking the royals' rampart, far off
  for (let i = 0; i < 9; i++) drawFigure(ctx, 'b5_c4_grassjacket', W*(.1 + i*.07), gy - H*.01, .38, t, {still:true, phase:i}); // the Grass Jackets on the gully ramparts, small
  if (night) for (let i = 0; i < 6; i++) { const fx = W*(.12 + i*.12), fl = mo ? .7 + Math.sin(t/200 + i)*.3 : 1; ctx.fillStyle = `rgba(255,160,80,${(.7*fl).toFixed(2)})`; ctx.fillRect(fx, gy - H*.02, 2, 2); } // their fires on the ramparts
  vign(ctx, W, H, night ? .6 : .45, .5); };
/* the battle far along the line: a column of white lightning standing on the field, the wraiths and demons as shapes; smoke at the royals' end */
SCENEX.b5_c4_lightning = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, after = !!f.b5_c4_wraithsDone, hz = H*.36, gy = H*.56;
  ctx.drawImage(sceneLayer('b54:light' + (after ? 'a' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#4a4a52'],[.7,'#8a8070'],[1,'#b8a080']]); x.fillRect(0, 0, W, hz + 2);
    b54Mountains(x, W, H, hz, '#4a4a4c', '#6a6862');
    x.fillStyle = vgrad(x, hz, H, [[0,'#4e4e32'],[1,'#2e2e1e']]); x.fillRect(0, hz, W, H - hz);
    b54Line(x, W, H, gy, 'battle', 0, 0);
    for (let i = 0; i < 14; i++) { const sx = W*(.7 + hash(i, 5461)*.3), sy = gy - H*(.02 + hash(i, 5462)*.2); x.fillStyle = `rgba(50,46,40,${(.25 + hash(i, 5463)*.3).toFixed(2)})`; ell(x, sx, sy, W*(.04 + hash(i, 5464)*.05), H*(.03 + hash(i, 5465)*.04), x.fillStyle); } // smoke at the far end
    x.fillStyle = '#1e1a14'; x.beginPath(); x.moveTo(0, H*.86); x.quadraticCurveTo(W*.5, H*.82, W, H*.86); x.lineTo(W, H); x.lineTo(0, H); x.fill(); // the crest, near
    for (let i = 0; i < 18; i++) { const sx = W*(.03 + i*.057); x.strokeStyle = '#3a2e1c'; x.lineWidth = 2; x.beginPath(); x.moveTo(sx, H*.86); x.lineTo(sx + 2, H*.79); x.stroke(); }
  }), 0, 0, W, H);
  b54Host(ctx, W, H, hz + H*.06, 'day', t, mo, true);
  if (!after) { const k = mo ? .65 + Math.sin(t/70)*.2 + Math.sin(t/23)*.15 : 1, lx = W*.84; ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, gy - H*.12, H*.5, '#c8d8ff', .3*k);
    ctx.strokeStyle = `rgba(240,246,255,${(.85*k).toFixed(2)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(lx, 0); for (let i = 1; i <= 10; i++) ctx.lineTo(lx + (hash(i + Math.floor(mo ? t/90 : 0), 5466) - .5)*W*.03, gy*i/10); ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = `rgba(160,190,255,${(.25*k).toFixed(2)})`; ctx.stroke(); ctx.globalCompositeOperation = 'source-over'; } // the column of lightning
  for (let i = 0; i < 12; i++) { const u = (hash(i, 5467) + (mo ? t/30000 : 0)) % 1, wx = W*(.15 + u*.6), wy = gy + H*(.04 + hash(i, 5468)*.18), s = 2 + hash(i, 5469)*3; ctx.fillStyle = 'rgba(12,10,18,.82)'; poly(ctx, [[wx - s, wy - s*2.6], [wx + s, wy - s*2.6], [wx + s*1.3, wy], [wx, wy + s*.6], [wx - s*1.3, wy]], ctx.fillStyle); ctx.fillStyle = 'rgba(210,220,255,.6)'; ctx.fillRect(wx - s*.4, wy - s*2.3, 1, 1); ctx.fillRect(wx + s*.2, wy - s*2.3, 1, 1); } // the wraiths across the grass
  for (let i = 0; i < 3; i++) { const on = mo ? Math.sin(t/900 + i*2.1) > -.3 : true; if (!on) continue; const dx = W*(.5 + i*.12), dy = gy + H*.02; ctx.fillStyle = 'rgba(40,24,18,.9)'; ctx.fillRect(dx - 4, dy - 16, 8, 16); ell(ctx, dx, dy - 18, 4, 4, ctx.fillStyle); ctx.fillStyle = '#e8702a'; ctx.fillRect(dx - 2, dy - 19, 1, 1); ctx.fillRect(dx + 1, dy - 19, 1, 1); } // the bound demons, going out like lamps and coming on again
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.2 + i*18, H*.96, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };
/* after the surrender: a pile of swords, spears and bows on the turf, a long file of soldiers walking south, tall grey figures watching */
SCENEX.b5_c4_surrender = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, f = (S && S.f) || {}, run = f.b5_c4_key === 'run', hz = H*.38;
  ctx.drawImage(sceneLayer('b54:surr' + (run ? 'r' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#2a2a3e'],[.6,'#7a6a6a'],[1,'#c89068']]); x.fillRect(0, 0, W, hz + 2);
    b54Mountains(x, W, H, hz, '#2e2a36', '#4a4048');
    x.fillStyle = vgrad(x, hz, H, [[0,'#4a4a2e'],[1,'#26261a']]); x.fillRect(0, hz, W, H - hz);
    x.fillStyle = '#5a5040'; x.beginPath(); x.moveTo(W*.46, hz); x.lineTo(W*.54, hz); x.lineTo(W*.9, H); x.lineTo(W*.3, H); x.fill(); // the road south, toward the viewer
    x.fillStyle = '#1e1c16'; x.fillRect(W*.02, hz - H*.06, W*.12, H*.06); x.fillRect(W*.04, hz - H*.16, W*.04, H*.1); // the fort and its tower, far behind
    if (run) { x.fillStyle = '#121a0e'; x.beginPath(); x.moveTo(0, hz + H*.04); for (let i = 0; i <= 10; i++) x.lineTo(W*.28*i/10, hz - H*(.06 + hash(i, 5471)*.06)); x.lineTo(W*.3, H); x.lineTo(0, H); x.fill(); } // the wood the Sixth came out of
    else { const px = W*.2, py = H*.84, R = W*.11; ell(x, px, py + H*.01, R*1.15, H*.035, 'rgba(0,0,0,.45)'); ell(x, px, py - H*.005, R, H*.04, '#2a261c'); // the pile, a low heap on the turf
      for (let i = 0; i < 26; i++) { const a = (hash(i, 5472) - .5)*1.3 + (i % 2 ? Math.PI : 0), l = R*(.8 + hash(i, 5473)*.7), cx = px + (hash(i, 5476) - .5)*R*1.1, cy = py - H*.01 - hash(i, 5474)*H*.05, dx = Math.cos(a)*l/2, dy = Math.sin(a)*l*.25;
        const k = i % 3; x.strokeStyle = k === 0 ? '#b8b8b4' : k === 1 ? '#6a5030' : '#9a9a96'; x.lineWidth = k === 1 ? 2 : 1.6; x.beginPath(); x.moveTo(cx - dx, cy - dy); x.lineTo(cx + dx, cy + dy); x.stroke(); // blades and shafts
        if (k !== 1) { x.strokeStyle = '#3a2a18'; x.lineWidth = 2.4; x.beginPath(); x.moveTo(cx - dx, cy - dy); x.lineTo(cx - dx*.82, cy - dy*.82); x.stroke(); x.strokeStyle = '#8a7040'; x.lineWidth = 1; x.beginPath(); x.moveTo(cx - dx*.82 - dy*.3, cy - dy*.82 + dx*.08); x.lineTo(cx - dx*.82 + dy*.3, cy - dy*.82 - dx*.08); x.stroke(); } } // hilts and guards
      x.strokeStyle = '#5a4026'; x.lineWidth = 1.4; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(px - R*.5 + i*R*.5, py - H*.05, R*.28, Math.PI*1.1, Math.PI*1.9); x.stroke(); } } // bows across the top
  }), 0, 0, W, H);
  for (let i = 0; i < 26; i++) { const k = ((i/26) + (mo ? t/60000 : 0)) % 1, px = lerp(W*.5, W*.62, k), py = lerp(hz + H*.02, H*.84, k), s = lerp(.25, 1.1, k); drawFigure(ctx, i % 5 === 2 ? 'b5_c4_grassjacket' : 'b5_c4_garrison', px + (hash(i, 5475) - .5)*W*.04*s, py, s, t, {still:!mo, phase:i, dir:1}); } // the long file south
  [[.36, .62], [.32, .7], [.76, .6]].forEach(([u, v], i) => drawFigure(ctx, 'b5_edur', W*u, H*v, .9, t, {still:true, dir:u < .5 ? 1 : -1, phase:i})); // the Edur watching
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.66 + i*16, H*.95, 1.6, t, {phase:i, dir:1}));
  vign(ctx, W, H, .5, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Five's ground ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on dark canal-slate with a thin dock-gold rim (Claude's call) */
function b54Item(key, label, body){ const w = 240, h = 130, id = 'c54-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#34444a"></stop><stop offset=".7" stop-color="#1a2428"></stop><stop offset="1" stop-color="#0e1214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#c9a35a" stroke-width="1" opacity=".7"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a Grass Jacket's helm: an open iron helm, a dent over the left ear, a strip of faded green cloth tied at the crest */
b54Item('b5_c4_helm', 'A Grass Jacket\'s helm', '<ellipse cx="116" cy="102" rx="56" ry="8" fill="#000" opacity=".35"/>'
  + '<path d="M70 96 Q70 40 116 34 Q162 40 162 96 Z" fill="#6e6e6a"/><path d="M70 96 Q70 40 116 34 Q162 40 162 96 Z" fill="none" stroke="#2a2a28" stroke-width="1.6"/>'
  + '<path d="M78 90 Q80 48 112 40" fill="none" stroke="#c8c8c0" stroke-width="2" opacity=".5"/><path d="M66 94 L166 94 L166 102 L66 102 Z" fill="#5a5a56"/><path d="M66 94 L166 94" stroke="#a8a8a0" stroke-width="1" opacity=".6"/>'
  + '<g fill="#3a3a36"><circle cx="76" cy="98" r="1.6"/><circle cx="96" cy="98" r="1.6"/><circle cx="116" cy="98" r="1.6"/><circle cx="136" cy="98" r="1.6"/><circle cx="156" cy="98" r="1.6"/></g>'
  + '<path d="M84 62 Q90 58 92 66 Q88 70 84 62 Z" fill="#2a2a28" opacity=".55"/><path d="M85 61 Q89 59 91 64" fill="none" stroke="#a8a8a0" stroke-width=".6" opacity=".5"/>'
  + '<rect x="112" y="28" width="8" height="10" rx="1.5" fill="#4a4a46"/><path d="M114 30 Q124 22 140 26 Q158 30 176 46 Q186 56 196 58 L192 66 Q178 62 168 52 Q150 38 134 36 Q122 36 118 38 Z" fill="#6a8a4a"/>'
  + '<path d="M118 31 Q132 26 150 32 Q166 40 180 52" fill="none" stroke="#a8c888" stroke-width="1.2" opacity=".55"/><path d="M190 60 L198 70 M186 62 L190 74" stroke="#6a8a4a" stroke-width="1.6" stroke-linecap="round"/><path d="M140 34 L144 40 M158 40 L160 46" stroke="#4a6a32" stroke-width=".8" opacity=".7"/>');
/* a tooth too big for a wolf: a long yellowed canine on a thong */
b54Item('b5_c4_wolftooth', 'A tooth too big for a wolf', '<ellipse cx="120" cy="70" rx="80" ry="30" fill="#e8d8b0" opacity=".04"/>'
  + '<path d="M40 40 Q80 24 120 38 Q160 24 200 40" fill="none" stroke="#5a3e22" stroke-width="3" stroke-linecap="round"/><path d="M40 40 Q80 26 120 40" fill="none" stroke="#8a6a44" stroke-width="1" opacity=".6"/>'
  + '<path d="M114 38 Q120 32 126 38 L124 44 L116 44 Z" fill="#4a3220"/><path d="M114 40 L126 40" stroke="#2a1c10" stroke-width="1"/>'
  + '<path d="M112 46 Q120 40 130 46 Q132 70 124 104 Q122 112 118 110 Q112 82 112 46 Z" fill="#d8c8a0"/><path d="M114 48 Q118 44 124 46 Q122 74 119 104" fill="none" stroke="#f4ecd4" stroke-width="2" opacity=".6"/>'
  + '<path d="M128 50 Q128 76 122 106" fill="none" stroke="#9a8a64" stroke-width="1.6" opacity=".7"/><path d="M114 54 L128 54" stroke="#8a7a54" stroke-width=".8" opacity=".6"/><path d="M118 108 Q120 112 122 108" fill="#a89870"/>');
/* a brand-pot: a squat black-glazed clay pot, sealed with pitch, a tarred rag, a scorch mark */
b54Item('b5_c4_pitchpot', 'A brand-pot from the west rampart', '<ellipse cx="120" cy="108" rx="46" ry="7" fill="#000" opacity=".35"/>'
  + '<path d="M84 52 Q76 72 82 92 Q92 108 120 108 Q148 108 158 92 Q164 72 156 52 Q146 46 120 46 Q94 46 84 52 Z" fill="#16141a"/><path d="M90 56 Q84 74 90 92" fill="none" stroke="#6a6a7a" stroke-width="3" opacity=".45"/>'
  + '<path d="M140 60 Q150 74 146 96 Q142 86 136 82 Q138 70 140 60 Z" fill="#3a2a18" opacity=".7"/><path d="M138 66 Q144 76 142 90" fill="none" stroke="#7a4a22" stroke-width="1" opacity=".6"/>'
  + '<path d="M100 46 Q102 38 120 36 Q138 38 140 46 Q130 50 120 50 Q110 50 100 46 Z" fill="#0c0a0c"/><path d="M104 44 Q120 40 136 44" fill="none" stroke="#4a4a52" stroke-width="1" opacity=".6"/>'
  + '<path d="M118 38 Q116 26 122 18 Q130 14 134 22 Q128 22 126 30 Q124 36 122 38 Z" fill="#5a4a30"/><path d="M122 20 Q128 16 132 20" fill="none" stroke="#8a7a54" stroke-width="1" opacity=".6"/><path d="M124 28 L130 26 M121 33 L127 31" stroke="#2a2016" stroke-width="1"/>'
  + '<g stroke="#e8c070" stroke-width=".8" opacity=".35"><path d="M98 62 Q110 58 124 60"/></g>');
