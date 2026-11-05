/* ============ Book Four, Chapter 6 art: Pan'arak — the flank pickets, the basin, the Dogslayers' trenches on the ramps ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/70d, lit from the left: the Dogslayers, Korbolo Dom's soldiers in Malazan kit (the round
   iron helm, mail over leather, the Malazan short sword) with pale squares where the Empire's badges were cut off and their own red dog's
   head on the sleeve; a crossbowman, a skirmisher in a scarf, a sergeant with a whistle; and a Seti woman archer (Chapter 4's, if it drew
   one). Two grounds (TILEX): the hard sand and scrub of the lines, with the picket's screen, its shielded fire, its scrapes and lookout
   rock; and the foot of the ramps, the trench banks with their stakes. Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE()
   holding the rest still): b4_picket redrawn at dusk, the trenches across the basin at dusk, the lines at night with dust in the fires,
   and the ramps close at night under the dark over the oasis. And the chapter's gear on Book Four's sand-and-iron ground. Grim things
   stay distant: the dead are never drawn; the trenches are banks, fires and helms. */

/* ---------------- figures ---------------- */
/* the Dogslayers' own badge, where the Empire's was: a red square with a black dog's head and a black bar across its throat */
function b46Badge(ctx, x, y, k = 1){ ctx.fillStyle = '#8a2418'; ctx.fillRect(x, y, 2.6*k, 2.4*k); ctx.fillStyle = '#140c08'; ctx.fillRect(x + .5*k, y + .5*k, 1.4*k, 1*k); ctx.fillRect(x + 1.6*k, y + .2*k, .5*k, .5*k); ctx.fillRect(x + .3*k, y + 1.6*k, 2*k, .35*k); }
/* the pale squares where the Empire's badges were cut off, with the threads hanging */
function b46Cut(ctx, x, y){ ctx.fillStyle = 'rgba(214,204,180,.32)'; ctx.fillRect(x, y, 2.4, 2.2); ctx.strokeStyle = 'rgba(30,22,14,.55)'; ctx.lineWidth = .3; ctx.strokeRect(x, y, 2.4, 2.2); ctx.strokeStyle = 'rgba(200,190,160,.6)'; ctx.beginPath(); ctx.moveTo(x + .4, y + 2.2); ctx.lineTo(x + .2, y + 3); ctx.moveTo(x + 1.6, y + 2.2); ctx.lineTo(x + 1.9, y + 2.9); ctx.stroke(); }
/* a Malazan round iron helm, dented, with a cheek-guard and a leather neck-flap behind */
function b46Helm(ctx, h, c, lit){ ctx.beginPath(); ctx.arc(0, -12.2, 5.4, Math.PI*.98, Math.PI*2.02); ctx.fillStyle = h.armor(lit, c); ctx.fill(); ctx.fillStyle = c; ctx.fillRect(-5.8, -12.6, 11.6, 1.5); ctx.fillRect(2.8, -12, 1.6, 4.6);
  ctx.fillStyle = 'rgba(255,250,240,.28)'; ctx.fillRect(-3.8, -16.6, 3, .9); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(1.2, -15.8, 1.4, .7); // its shine, and a dent
  poly(ctx, [[-5.6, -12], [-3.6, -12], [-4.2, -6.6], [-6.6, -7.4]], '#4a3a26'); }
function b46Dogslayer(ctx, h, t, o, kind){ ctx.save(); const sgt = kind === 'sgt', scout = kind === 'scout'; B2F.grow(ctx, sgt ? 1.1 : scout ? .95 : 1, sgt ? 1.06 : 1);
  const sk = b2Pick(o, ['#a8826a', '#8a6448', '#b8907a', '#7a5a40']), lt = scout ? b2Pick(o, [['#8a7458', '#3a2e1e'], ['#7a6a50', '#2e2618']]) : b2Pick(o, [['#7a7468', '#2e2c28'], ['#6e6a5e', '#26241e'], ['#827a6a', '#302c24']]);
  if (kind === 'blade' && (o.phase || 0) % 2 === 1) B2F.line(ctx, '#5a4428', 1.2, [[8.2, 12.4], [9.8, -22]]), poly(ctx, [[10,-27],[9,-21.4],[11,-21.4]], '#c8c2b2'); // some carry a spear
  h.legs('#3a3228'); ctx.fillStyle = '#2a2018'; ctx.fillRect(-4.6, 11, 3.6, 2); ctx.fillRect(1, 11, 3.6, 2); // boots, Malazan issue
  h.torso(lt[0], lt[1], sgt ? 7 : 6.4);
  if (!scout) { ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(-6.2, -3.6 + i*2.4); ctx.lineTo(6.2, -3.6 + i*2.4); } ctx.stroke(); ctx.fillStyle = 'rgba(230,226,214,.12)'; ctx.fillRect(-5.8, -5.4, 1.6, 10); } // mail, dull
  ctx.fillStyle = '#4a3420'; ctx.fillRect(-6.4, 3.4, 12.8, 1.3); ctx.fillStyle = '#8a7a52'; ctx.fillRect(-.8, 3.4, 1.6, 1.3); // the belt and its plate
  ctx.fillStyle = lt[0]; ctx.fillRect(-8.6, -5, 2.4, 6.6); ctx.fillRect(6.2, -5, 2.4, 6.2); b46Cut(ctx, -8.4, -4.6); b46Badge(ctx, 6.1, -4.4, .9); // sleeves: the cut-off badge on one, Dom's on the other
  ell(ctx, 7.4, 1.6, 1.2, 1.2, sk);
  if (kind === 'xbow') { ctx.save(); ctx.translate(5.4, -1.4); ctx.rotate(-.12); ctx.fillStyle = '#5a3e22'; ctx.fillRect(-1, -.8, 9, 1.6); ctx.strokeStyle = '#3a2a18'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(7, -4.4); ctx.quadraticCurveTo(8.6, 0, 7, 4.4); ctx.stroke(); ctx.strokeStyle = 'rgba(220,210,190,.6)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(7, -4.4); ctx.lineTo(3.4, 0); ctx.lineTo(7, 4.4); ctx.stroke(); ctx.restore();
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-9, -8, 2.4, 10); ctx.fillStyle = '#c8bca0'; ctx.fillRect(-8.6, -9.4, .5, 1.8); ctx.fillRect(-7.6, -9.2, .5, 1.8); } // a crossbow, and a quiver of bolts behind
  else if (scout) { B2F.line(ctx, '#bab4a4', 1.1, [[6.8, 1.6], [10.4, -4.6]]); B2F.line(ctx, '#4a3420', 1.4, [[6, 3.4], [7.2, 1.2]]); B2F.line(ctx, '#aaa494', .9, [[-6.8, 1.4], [-9.4, -2.6]]); } // two long knives
  else if (!((o.phase || 0) % 2 === 1 && kind === 'blade')) h.sword('#cfc8b8');
  if (!scout) { ctx.beginPath(); ctx.arc(-7.2, -.4, sgt ? 6.2 : 5.8, 0, 7); ctx.fillStyle = h.armor('#4a443c', '#1a1814'); ctx.fill(); ctx.lineWidth = .9; ctx.strokeStyle = '#8a8478'; ctx.stroke(); // a Malazan round shield, its paint scraped off
    ctx.save(); ctx.beginPath(); ctx.arc(-7.2, -.4, 5.4, 0, 7); ctx.clip(); ctx.fillStyle = 'rgba(150,40,26,.75)'; ctx.translate(-7.2, -.4); ctx.rotate(-.7); ctx.fillRect(-7, -1, 14, 2); ctx.restore(); ell(ctx, -7.2, -.4, 1.3, 1.3, '#6b6155'); } // and a red slash daubed across where the Empire's was
  h.head(sk, sgt ? 4.8 : 4.4, -11); h.look('rgba(16,10,6,.9)', -11.3);
  if (scout) { ctx.fillStyle = b2Pick(o, ['#a8946a', '#9a8460', '#b49c70']); ctx.fillRect(-4.6, -9.6, 9.6, 2.8); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(-4.6, -7.2, 9.6, .5); B2F.cloth(ctx, b2Pick(o, ['#8a7a58', '#7a6a4c']), '#4a3e2a'); } // a scarf over the mouth, a head-cloth
  else b46Helm(ctx, h, sgt ? '#3e3a34' : '#4a4640', sgt ? '#8a8478' : '#7a766c');
  if (sgt) { ctx.fillStyle = '#2a1e14'; ctx.fillRect(-3.4, -8.2, 7.2, 1.8); B2F.line(ctx, '#6a5a3a', .4, [[-1.6, -6], [1.2, -2.4]]); ell(ctx, 1.4, -2.2, .8, .6, '#d8b060'); } // a beard, and the whistle on its cord
  ctx.restore(); }
/* a Seti woman archer: braids tied with red cord, a hide jerkin over a long ochre shirt, a horn bow, a quiver, a society's token (a tail) */
function b46SetiFig(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.02); const sk = b2Pick(o, ['#c89a78', '#b88868', '#d0a888']), sw = o.still ? 0 : Math.sin(t/300 + (o.phase || 0))*.5;
  ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-9, -8.4, 2.6, 11); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-8.6, -10, .6, 2.4); ctx.fillRect(-7.6, -9.6, .6, 2.2); ctx.fillStyle = '#8a2a1e'; ctx.fillRect(-8.8, -10.4, 2.2, .6); // the quiver, fletched red
  h.legs('#4a3a28'); ctx.fillStyle = '#2a1e14'; ctx.fillRect(-4.6, 10, 3.6, 3); ctx.fillRect(1, 10, 3.6, 3); // riding boots
  poly(ctx, [[-6.2, -6], [6.2, -6], [7.4, 8.4], [-7.4, 8.4]], h.armor('#b08a4a', '#4a3618')); // the long shirt, ochre
  h.torso('#7a5a3a', '#2e2014', 5.8); ctx.fillStyle = 'rgba(255,236,200,.18)'; ctx.fillRect(-5.2, -5.6, 1.6, 9); // a hide jerkin
  ctx.fillStyle = '#5a3a20'; ctx.fillRect(-6, 3.4, 12, 1.1); poly(ctx, [[3.6, 4.4], [5, 4.4], [5.8 + sw, 10.6], [4.6 + sw, 10.8]], '#6a5a46'); // the belt, and a society's tail hanging from it
  ctx.fillStyle = '#b08a4a'; ctx.fillRect(-8.4, -5, 2.4, 6.6); ctx.fillRect(6.2, -5, 2.4, 6.2); ell(ctx, 7.4, 1.6, 1.2, 1.2, sk);
  ctx.save(); ctx.translate(.2, 0); B2F.bow(ctx, 8.6, -13, 8); ctx.restore(); // the horn bow
  h.head(sk, 4.3, -11); h.look('rgba(20,12,8,.88)', -11.2);
  B2F.cap(ctx, '#2a1a10', 4.9, -12.4); B2F.braids(ctx, '#2a1a10', 10, -12.6); ctx.fillStyle = '#b02a20'; ctx.fillRect(-5.5, -4.4, 1.6, .9); ctx.fillRect(3.9, -4.4, 1.6, .9); // black braids, red cord at the ends
  ctx.fillStyle = 'rgba(190,60,40,.55)'; ctx.fillRect(-2.6, -9.8, 1, 1.6); ctx.fillRect(2.4, -9.8, 1, 1.6); // ochre on the cheeks
  ctx.restore(); }
Object.assign(FIGX, {
  /* a Dogslayer: Dom's soldier, Malazan-shaped: round iron helm, mail, short sword or spear, a round shield with a red slash over the old paint */
  b4_c6_dogslayer(ctx, h, t, o){ b46Dogslayer(ctx, h, t, o, 'blade'); },
  /* the same with a crossbow and a quiver of bolts */
  b4_c6_dogxbow(ctx, h, t, o){ b46Dogslayer(ctx, h, t, o, 'xbow'); },
  /* a skirmisher: no mail, a scarf over the mouth and a head-cloth, two long knives */
  b4_c6_dogscout(ctx, h, t, o){ b46Dogslayer(ctx, h, t, o, 'scout'); },
  /* their sergeant: bigger, bearded, a whistle on a cord */
  b4_c6_dogsgt(ctx, h, t, o){ b46Dogslayer(ctx, h, t, o, 'sgt'); },
  /* a Seti woman archer (Chapter 4's drawing if it made one) */
  b4_c6_setiarcher(ctx, h, t, o){ if (FIGX.b4_c4_setiarcher) return FIGX.b4_c4_setiarcher(ctx, h, t, o); b46SetiFig(ctx, h, t, o); },
});

/* ---------------- ground: TILEX ----------------
   b4_c6_lines: the lines before Pan'arak: '.' hard sand, a cracked crust gone rose at dusk, ',' scrub, a thorn bush, '#' red rock, '='
     the picket screen (sharpened stakes leaning out, thorn-brush woven through them), 'L' the lookout rock in the screen with its notch,
     'F' the Third's fire with a shield on edge on the basin side, 't' a scrape behind the screen. Dark is night: the fires light it.
   b4_c6_ramp: the foot of the trenches: '.' sand, ',' scrub, 'r' the ramp going up, rutted, lit from the fires above, 't' the trench bank
     (thrown earth and stakes, firelight behind it, helms), '#' rock, 'F' the outpost's fire in its half ring of stones.
   In a fight 't' is low cover: on the lines a length of the screen, on the ramps the trench lip. */
const b46At = (x, y, c) => !!tileMap && !!tileMap[y] && tileMap[y][x] === c;
const b46In = (x, y, cs) => !!tileMap && !!tileMap[y] && cs.includes(tileMap[y][x]);
function b46Sand(ctx, x, y, T, N){ const px = x*T, py = y*T, h = hash(x, y);
  ctx.fillStyle = N ? shade('#2e2a2c', (h - .5)*.06) : shade('#c49a78', (h - .5)*.05); ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, N ? .05 : .1, N ? .26 : .12, N ? '200,180,180' : '255,226,196', 1.3);
  ctx.strokeStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(110,70,46,.32)'; ctx.lineWidth = Math.max(1, T*.018); ctx.beginPath(); // the crust, cracked into plates
  for (let i = 0; i < 3; i++) { const sx = px + hash(x, y, i + 30)*T, sy = py + hash(y, x, i + 31)*T; ctx.moveTo(sx, sy); ctx.lineTo(sx + (hash(x, y, i + 32) - .5)*T*.5, sy + (hash(x, y, i + 33) - .5)*T*.3); ctx.lineTo(sx + (hash(x, y, i + 34) - .5)*T*.6, sy + (hash(x, y, i + 35) - .2)*T*.4); } ctx.stroke();
  ctx.fillStyle = N ? '#151214' : '#7a5236'; for (let i = 0; i < 4; i++) ctx.fillRect(px + hash(x, y, i + 20)*T, py + hash(y, x, i + 21)*T, Math.max(1, T*.04), Math.max(1, T*.03)); // grit and pebbles
  ctx.fillStyle = N ? 'rgba(150,130,130,.08)' : 'rgba(255,214,170,.22)'; for (let i = 0; i < 3; i++) { const yy = py + T*(.2 + hash(x, y, i + 40)*.6); ctx.fillRect(px + hash(y, x, i + 41)*T*.5, yy, T*(.2 + hash(x, y, i + 42)*.3), Math.max(1, T*.02)); } } // the dust lying in streaks
function b46Scrub(ctx, x, y, T, N){ b46Sand(ctx, x, y, T, N); const px = x*T, py = y*T, cx = px + T*(.4 + hash(x, y, 50)*.2), by = py + T*.82; ell(ctx, cx + T*.06, by + T*.02, T*.3, T*.07, N ? 'rgba(0,0,0,.4)' : 'rgba(90,56,30,.3)');
  ctx.strokeStyle = N ? '#2a2622' : '#6a5032'; ctx.lineWidth = Math.max(1, T*.025); ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i < 9; i++) { const a = -Math.PI*(.1 + i/8*.8), l = T*(.2 + hash(x, y, i + 51)*.22); ctx.moveTo(cx, by); ctx.lineTo(cx + Math.cos(a)*l, by + Math.sin(a)*l*.9); } ctx.stroke(); // a thorn bush, all stems
  ctx.fillStyle = N ? '#3a3a2e' : '#8a8452'; for (let i = 0; i < 7; i++) { const a = -Math.PI*(.12 + hash(x, y, i + 60)*.76), l = T*(.12 + hash(x, y, i + 61)*.22); ell(ctx, cx + Math.cos(a)*l, by + Math.sin(a)*l*.9, T*.03, T*.022, ctx.fillStyle); } ctx.lineCap = 'butt'; } // grey-green leaves, few
function b46Rock(ctx, x, y, T, N, k = 1){ const px = x*T, py = y*T, cx = px + T*.5, by = py + T*.9, h = hash(x, y, 77); ell(ctx, cx + T*.1, by, T*.44*k, T*.1, N ? 'rgba(0,0,0,.5)' : 'rgba(90,50,30,.35)');
  const g = ctx.createRadialGradient(cx - T*.18, by - T*.52*k, T*.04, cx, by - T*.3*k, T*.52*k); g.addColorStop(0, N ? '#4e3a36' : '#c07a5a'); g.addColorStop(.6, N ? '#34241e' : '#8e4a32'); g.addColorStop(1, N ? '#150e0c' : '#4e2416'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(cx - T*.44*k, by); ctx.lineTo(cx - T*.38*k, by - T*.46*k); ctx.lineTo(cx - T*.12*k, by - T*(.7 + h*.1)*k); ctx.lineTo(cx + T*.18*k, by - T*.74*k); ctx.lineTo(cx + T*.4*k, by - T*.42*k); ctx.lineTo(cx + T*.44*k, by); ctx.closePath(); ctx.fill(); // red rock, broken and angular
  ctx.strokeStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(70,30,16,.45)'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(cx - T*.12*k, by - T*.7*k); ctx.lineTo(cx - T*.04*k, by - T*.2*k); ctx.moveTo(cx + T*.18*k, by - T*.74*k); ctx.lineTo(cx + T*.12*k, by - T*.36*k); ctx.stroke(); // its faces
  ctx.fillStyle = N ? 'rgba(150,120,110,.12)' : 'rgba(255,200,160,.35)'; ctx.beginPath(); ctx.moveTo(cx - T*.38*k, by - T*.46*k); ctx.lineTo(cx - T*.12*k, by - T*.7*k); ctx.lineTo(cx - T*.06*k, by - T*.3*k); ctx.closePath(); ctx.fill(); } // lit from the left
function b46Screen(ctx, x, y, T, N, fight){ const px = x*T, py = y*T; if (!fight) b46Sand(ctx, x, y, T, N); const by = py + T*.86, l = fight || b46In(x - 1, y, '=L'), r = fight || b46In(x + 1, y, '=L');
  ell(ctx, px + T*.5, by + T*.02, T*.5, T*.07, N ? 'rgba(0,0,0,.45)' : 'rgba(80,50,26,.3)');
  ctx.fillStyle = N ? '#24201c' : '#5a4228'; ctx.fillRect(px + (l ? 0 : T*.1), py + T*.42, T - (l ? 0 : T*.1) - (r ? 0 : T*.1), T*.34); // the brush woven through, a dark mass
  ctx.strokeStyle = N ? '#3a3228' : '#8a6a40'; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); for (let i = 0; i < 12; i++) { const sx = px + hash(x, y, i + 70)*T, sy = py + T*(.42 + hash(y, x, i + 71)*.34); ctx.moveTo(sx, sy); ctx.lineTo(sx + (hash(x, y, i + 72) - .5)*T*.3, sy - T*(.06 + hash(x, y, i + 73)*.12)); } ctx.stroke(); // thorn twigs sticking out of it
  for (let i = 0; i < 2; i++) { const bx = px + T*(.25 + i*.5), tx = bx - T*.05, ty = py + T*(.14 + hash(x, y, i)*.06); ctx.strokeStyle = N ? '#3e3228' : '#7a5632'; ctx.lineWidth = Math.max(1.4, T*.06); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(tx, ty); ctx.stroke(); ctx.strokeStyle = N ? '#6a5a4a' : '#d8b888'; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); ctx.moveTo(tx + T*.02, ty + T*.08); ctx.lineTo(tx, ty); ctx.stroke(); ctx.lineCap = 'butt'; } } // the stakes, sharpened, leaning out toward the basin
function b46Lookout(ctx, x, y, T, N){ b46Screen(ctx, x, y, T, N); const px = x*T, py = y*T, cx = px + T*.5, by = py + T*.92; ell(ctx, cx + T*.1, by, T*.42, T*.09, N ? 'rgba(0,0,0,.5)' : 'rgba(90,50,30,.35)');
  const g = ctx.createRadialGradient(cx - T*.16, py + T*.3, T*.04, cx, py + T*.5, T*.5); g.addColorStop(0, N ? '#4a3632' : '#c4805e'); g.addColorStop(1, N ? '#1a100e' : '#6a3220'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(cx - T*.4, by); ctx.quadraticCurveTo(cx - T*.44, py + T*.3, cx - T*.18, py + T*.12); ctx.lineTo(cx - T*.06, py + T*.2); ctx.lineTo(cx + T*.04, py + T*.12); ctx.quadraticCurveTo(cx + T*.4, py + T*.16, cx + T*.42, by); ctx.closePath(); ctx.fill(); // a knob of red stone with a notch worn in its top
  ctx.fillStyle = N ? 'rgba(160,130,120,.14)' : 'rgba(255,214,180,.4)'; ctx.fillRect(cx - T*.3, py + T*.3, T*.06, T*.4); }
function b46Scrape(ctx, x, y, T, N){ b46Sand(ctx, x, y, T, N); const px = x*T, py = y*T, deep = !!(S && S.f && S.f.b4_c6_dug);
  ell(ctx, px + T*.5, py + T*.56, T*.42, T*.2, N ? '#121012' : '#7a5238'); ell(ctx, px + T*.52, py + T*.6, T*.36, T*.14, N ? '#0a0808' : deep ? '#5a3a26' : '#6a4630'); // a scrape in the sand
  ctx.fillStyle = N ? '#3a3230' : '#d8b08a'; ctx.beginPath(); ctx.ellipse(px + T*.5, py + T*.4, T*.44, T*.09, 0, Math.PI, 0); ctx.fill(); // its lip, thrown up toward the basin
  if (deep) { ctx.fillStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(70,40,24,.4)'; ctx.fillRect(px + T*.16, py + T*.46, T*.68, T*.04); } }
function b46Fire(ctx, x, y, T, N, t){ b46Sand(ctx, x, y, T, N); const cx = x*T + T*.5, cy = y*T + T*.66;
  for (let i = 0; i < 7; i++) { const a = i/7*6.28; ell(ctx, cx + Math.cos(a)*T*.24, cy + Math.sin(a)*T*.14, T*.07, T*.05, N ? '#2e2a2a' : '#7a6454'); } // a ring of stones
  if (N) b2Flames(ctx, cx, cy, T, .85); else { ell(ctx, cx, cy, T*.15, T*.08, '#2a1c10'); b2Flames(ctx, cx, cy, T, .5); }
  const sx = cx, sy = y*T + T*.36; ctx.beginPath(); ctx.ellipse(sx, sy, T*.3, T*.16, 0, Math.PI, 0); ctx.lineTo(sx + T*.3, sy + T*.04); ctx.lineTo(sx - T*.3, sy + T*.04); ctx.closePath(); // a shield set on edge on the basin side of it
  const g = ctx.createLinearGradient(sx - T*.3, 0, sx + T*.3, 0); g.addColorStop(0, N ? '#4a3a2a' : '#8a6a44'); g.addColorStop(1, N ? '#1a120c' : '#3a2a18'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = N ? '#6a5a44' : '#a8946a'; ctx.lineWidth = Math.max(1, T*.025); ctx.stroke();
  ell(ctx, sx, sy - T*.04, T*.04, T*.03, N ? '#8a7a5a' : '#c8b480'); }
function b46LinesTile(ctx, ch, x, y, T, N){ const px = x*T, py = y*T;
  if (ch === ',') return b46Scrub(ctx, x, y, T, N);
  if (ch === '#' || ch === 'R') { b46Sand(ctx, x, y, T, N); return b46Rock(ctx, x, y, T, N, 1); }
  if (ch === '=') return b46Screen(ctx, x, y, T, N);
  if (ch === 'L') return b46Lookout(ctx, x, y, T, N);
  if (ch === 't') return b46Scrape(ctx, x, y, T, N);
  if (ch === 'F') return b46Fire(ctx, x, y, T, N);
  b46Sand(ctx, x, y, T, N); if (ch !== '.' && ch !== 'o') exitArrow(ctx, ch, px, py, T); }
TILEX.b4_c6_lines = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { b46LinesTile(ctx, ch, x, y, T, !!dark); if (dark) b2Firelit(ctx, x, y, T, .3, 3.2, '255,140,60'); });

/* the foot of the ramps: the ground goes up, rutted, toward the trench banks, and the firelight from behind the banks falls down it */
function b46Ramp(ctx, x, y, T, N){ const px = x*T, py = y*T, h = hash(x, y), g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, N ? '#3a2a26' : '#b08060'); g.addColorStop(1, N ? '#241c1a' : '#966a4c'); ctx.fillStyle = g; ctx.fillRect(px, py, T, T);
  b2Mottle(ctx, x, y, T, N ? .05 : .1, N ? .25 : .1, N ? '255,160,110' : '255,226,196', 1.2);
  ctx.strokeStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(80,50,30,.35)'; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); for (let i = 0; i < 3; i++) { const xx = px + T*(.2 + i*.3) + (h - .5)*T*.1; ctx.moveTo(xx, py + T); ctx.lineTo(xx + T*.04, py); } ctx.stroke(); // ruts, going up
  ctx.strokeStyle = N ? 'rgba(255,150,90,.1)' : 'rgba(255,230,200,.2)'; ctx.beginPath(); for (let i = 0; i < 2; i++) { const yy = py + T*(.3 + i*.4); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy - T*.04); } ctx.stroke(); } // the slope's steps
function b46Trench(ctx, x, y, T, N, t, fight){ const px = x*T, py = y*T, up = fight ? false : b46In(x, y - 1, 't'), dn = fight ? false : b46In(x, y + 1, 't');
  if (!fight) { b46Ramp(ctx, x, y, T, N); } const top = up ? py : py + T*.18, bot = dn ? py + T : py + T*.86;
  if (!up && N) { glow(ctx, px + T*.5, top, T*.7, '#ff7a30', fight ? .34 : .22); } // firelight behind the bank
  const g = ctx.createLinearGradient(0, top, 0, bot); g.addColorStop(0, N ? (fight ? '#7a4c34' : '#4a3228') : '#9a6a48'); g.addColorStop(1, N ? (fight ? '#2e1e16' : '#1e1410') : '#5a3a26'); ctx.fillStyle = g; // thrown earth, stamped down
  ctx.beginPath(); ctx.moveTo(px, bot); ctx.lineTo(px, top + T*.08*hash(x, y, 1)); for (let i = 1; i <= 4; i++) ctx.lineTo(px + T*i/4, top + (up ? 0 : T*(.04 + hash(x, y, i + 2)*.1))); ctx.lineTo(px + T, bot); ctx.closePath(); ctx.fill();
  ctx.fillStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(60,36,20,.35)'; for (let i = 0; i < 5; i++) ell(ctx, px + hash(x, y, i + 10)*T, top + T*(.2 + hash(y, x, i + 11)*.5), T*.04, T*.025, ctx.fillStyle); // rubble in it
  if (!up) { for (let i = 0; i < 2; i++) { const bx = px + T*(.28 + i*.46), tx = bx + T*.06, ty = top - T*.16; ctx.strokeStyle = N ? (fight ? '#5a3e2a' : '#2a1e16') : '#5a3e24'; ctx.lineWidth = Math.max(1.4, T*.055); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, top + T*.14); ctx.lineTo(tx, ty); ctx.stroke(); ctx.lineCap = 'butt'; } // stakes in the bank, leaning out
    if (N && hash(x, y, 5) > .55 && !fight) { const hx = px + T*(.3 + hash(x, y, 6)*.4); ctx.fillStyle = '#0e0a08'; ctx.beginPath(); ctx.arc(hx, top - T*.02, T*.08, Math.PI, 0); ctx.fill(); ctx.fillStyle = 'rgba(255,170,110,.35)'; ctx.fillRect(hx - T*.05, top - T*.08, T*.04, T*.015); } } // a helm over the lip, against the firelight
  if (!dn) { ctx.fillStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(60,36,20,.3)'; ctx.fillRect(px, bot - T*.04, T, T*.06); } }
function b46OutFire(ctx, x, y, T, N){ b46Sand(ctx, x, y, T, N); const cx = x*T + T*.5, cy = y*T + T*.62;
  for (let i = 0; i < 6; i++) { const a = Math.PI*(.95 + i/5*1.1); ell(ctx, cx + Math.cos(a)*T*.38, cy + Math.sin(a)*T*.26, T*.1, T*.07, N ? '#2e2624' : '#7a5a46'); } // a half ring of stones, a low wall
  if (S && S.f && S.f.b4_c6_outpostDone) { ctx.fillStyle = N ? '#1a1210' : '#3a2a1c'; for (let i = 0; i < 5; i++) ell(ctx, cx + (hash(x, y, i) - .5)*T*.5, cy + (hash(y, x, i) - .5)*T*.2, T*.05, T*.03, ctx.fillStyle); } // scattered and out
  else b2Flames(ctx, cx, cy, T, N ? .8 : .5); }
function b46RampTile(ctx, ch, x, y, T, N, t){ const px = x*T, py = y*T;
  if (ch === 'r') return b46Ramp(ctx, x, y, T, N);
  if (ch === 't') return b46Trench(ctx, x, y, T, N, t);
  if (ch === ',') return b46Scrub(ctx, x, y, T, N);
  if (ch === '#' || ch === 'R') { b46Sand(ctx, x, y, T, N); return b46Rock(ctx, x, y, T, N, .9); }
  if (ch === 'F') return b46OutFire(ctx, x, y, T, N);
  b46Sand(ctx, x, y, T, N); if (b46In(x, y - 1, 'rt') && N) { const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, 'rgba(255,130,60,.14)'); g.addColorStop(1, 'rgba(255,130,60,0)'); ctx.fillStyle = g; ctx.fillRect(px, py, T, T); } // the firelight falling down the slope
  if (ch !== '.' && ch !== 'o') exitArrow(ctx, ch, px, py, T); }
TILEX.b4_c6_ramp = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => { b46RampTile(ctx, ch, x, y, T, !!dark, performance.now()); if (dark) b2Firelit(ctx, x, y, T, .3, 3, '255,140,60'); });
/* a fight's low cover: on the lines a length of the picket screen, at the ramps' foot the trench lip */
{ const _df = drawFeature; drawFeature = function(ctx, ch, x, y, T, dark, style, map){ const N = !!dark;
    if (style === 'b4_c6_lines' && ch === 't') return b2Clip(ctx, x, y, T, () => b46Screen(ctx, x, y, T, N, true));
    if (style === 'b4_c6_ramp' && ch === 't') return b2Clip(ctx, x, y, T, () => b46Trench(ctx, x, y, T, N, 0, true));
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops ---------------- */
/* the far side of the basin: three long ramps going up to the trenches, the palms of the oasis, the towers of the dead city behind,
   at hz (the basin's far edge) and up; N is night (the trenches' fires); k how close (1 far, 2.2 the foot of the ramps) */
function b46Ramps(x, W, H, hz, N, k){ const top = hz - H*.15*Math.min(k, 1.6), bankY = hz - H*.1*Math.min(k, 1.6);
  // the dead city behind: low, broken, mud-pale towers and domes, far off in the dust (never bigger than the palms are tall, much)
  for (let i = 0; i < 16; i++) { const bx = W*(.1 + hash(i, 611)*.8), bw = W*(.012 + hash(i, 612)*.022)*Math.min(1.5, k), bh = H*(.025 + Math.pow(hash(i, 613), 2)*.07)*Math.min(1.5, k), b0 = top - H*.012; x.fillStyle = N ? '#120e10' : '#9a7e6c'; x.fillRect(bx, b0 - bh, bw, bh + 2);
    if (!N) { x.fillStyle = 'rgba(255,196,160,.22)'; x.fillRect(bx, b0 - bh, bw*.35, bh); }
    if (hash(i, 618) > .6) { x.fillStyle = N ? '#120e10' : '#9a7e6c'; x.beginPath(); x.ellipse(bx + bw/2, b0 - bh, bw*.5, bw*.45, 0, Math.PI, 0); x.fill(); } // a dome
    else { x.fillStyle = N ? '#0c0a0c' : '#7e6454'; x.beginPath(); x.moveTo(bx, b0 - bh); for (let j = 1; j <= 3; j++) x.lineTo(bx + bw*j/3, b0 - bh - hash(i, 614 + j)*H*.014); x.lineTo(bx + bw, b0 - bh + 2); x.lineTo(bx, b0 - bh + 2); x.fill(); } // or broken at the top
    if (!N && hash(i, 619) > .5) { x.fillStyle = 'rgba(60,40,32,.6)'; x.fillRect(bx + bw*.4, b0 - bh*.7, Math.max(1, bw*.18), bh*.18); } } // an empty window
  x.fillStyle = N ? 'rgba(30,16,14,.2)' : 'rgba(196,120,90,.2)'; x.fillRect(0, top - H*.14*Math.min(1.5, k), W, H*.14*Math.min(1.5, k)); // the dust over it
  // the palms of the oasis, a dark green band and fronds
  for (let i = 0; i < 34; i++) { const px = W*(.16 + hash(i, 621)*.68), py = top - H*.004, ph = H*(.03 + hash(i, 622)*.05)*Math.min(1.6, k); x.strokeStyle = N ? '#0a0c0a' : '#3a3424'; x.lineWidth = 1.2*k; x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + 2*k, py - ph*.6, px + (hash(i, 623) - .5)*4*k, py - ph); x.stroke();
    x.fillStyle = N ? '#0a0c0a' : (i % 3 ? '#3e5030' : '#56683e'); for (let f = 0; f < 5; f++) { const a = Math.PI*(1.05 + f/4*.9); x.beginPath(); x.ellipse(px + Math.cos(a)*4*k, py - ph + Math.sin(a)*2*k, 5*k, 1.4*k, a + .3, 0, 7); x.fill(); } }
  // the slope and the three ramps
  x.fillStyle = vgrad(x, top, hz, N ? [[0,'#1e1614'],[1,'#120e0e']] : [[0,'#9a6a50'],[1,'#b0805e']]); x.beginPath(); x.moveTo(0, hz); x.lineTo(0, top + H*.03); x.quadraticCurveTo(W*.5, top - H*.01, W, top + H*.03); x.lineTo(W, hz); x.closePath(); x.fill();
  [[.2, .1, .16], [.5, .18, .2], [.8, .1, .17]].forEach(([cx, w0, w1], i) => { const sh = x.createLinearGradient(W*(cx - w1/2), 0, W*(cx + w1/2), 0); sh.addColorStop(0, N ? 'rgba(90,60,50,.7)' : 'rgba(236,190,150,.8)'); sh.addColorStop(1, N ? 'rgba(40,28,26,.7)' : 'rgba(170,120,90,.75)'); x.fillStyle = sh; x.beginPath(); x.moveTo(W*(cx - w1/2), hz + 1); x.lineTo(W*(cx - w0/2 + (i === 2 ? .04 : 0)), bankY); x.lineTo(W*(cx + w0/2 + (i === 2 ? .04 : 0)), bankY); x.lineTo(W*(cx + w1/2), hz + 1); x.closePath(); x.fill(); // a ramp, broad at the foot
    x.strokeStyle = N ? 'rgba(0,0,0,.3)' : 'rgba(120,80,50,.3)'; x.lineWidth = .7; for (let r = 1; r < 5; r++) { const yy = lerp(hz, bankY, r/5); x.beginPath(); x.moveTo(W*(cx - lerp(w1, w0, r/5)/2), yy); x.lineTo(W*(cx + lerp(w1, w0, r/5)/2), yy); x.stroke(); } });
  // the trench bank across the top, stakes in it, and behind it (at night) fires and helms
  x.fillStyle = N ? '#2a1c16' : '#7a5236'; x.beginPath(); x.moveTo(0, bankY + H*.012*k); for (let px = 0; px <= W; px += 6) x.lineTo(px, bankY - H*.008*k - Math.sin(px*.07)*H*.003*k); x.lineTo(W, bankY + H*.012*k); x.closePath(); x.fill();
  x.strokeStyle = N ? '#140c0a' : '#4a3020'; x.lineWidth = Math.max(.8, .9*k); for (let px = 3; px < W; px += 5*k + 2) { x.beginPath(); x.moveTo(px, bankY); x.lineTo(px + 2*k, bankY - 4*k); x.stroke(); }
  if (N) for (let i = 0; i < 40; i++) { const fx = hash(i, 631)*W, fy = bankY - H*.004*k - hash(i, 632)*(bankY - top)*.6; glow(x, fx, fy, 8*k, '#ff7a30', .35); glow(x, fx, fy, 1.6*k, '#ffd090', .9); }
  for (let i = 0; i < Math.round(60*k); i++) { const hx = hash(i, 641)*W, hy = bankY - 1.2*k; x.fillStyle = N ? '#0a0706' : 'rgba(60,56,52,.9)'; x.beginPath(); x.arc(hx, hy, 1.2*k, Math.PI, 0); x.fill(); if (!N) { x.fillStyle = 'rgba(255,230,200,.5)'; x.fillRect(hx - .8*k, hy - 1*k, .6*k, .4*k); } } } // helms along the lip
/* the dust in the air: drifting bands, red at dusk, grey at night (still when motion is reduced) */
function b46Dust(ctx, W, H, t, y0, y1, col, n = 6){ for (let i = 0; i < n; i++) { const k = REDUCE() ? hash(i, 651) : ((t/22000 + hash(i, 651)) % 1); glow(ctx, lerp(-W*.2, W*1.2, k), lerp(y0, y1, hash(i, 652)), W*.26, col, .16*Math.sin(k*Math.PI) + .04); } }
/* the picket at dusk: the reading place. The screen across the middle, the basin beyond going red, the ramps far off with their first
   fires; in front, the scrape and the Third's fire behind a shield set on edge, an upturned shield in the scrape; the squad round it */
SCENEX.b4_picket = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.42, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b46:picket', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#2a1e2a'],[.45,'#7a3a2e'],[.8,'#c0603a'],[1,'#d88a5a']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.12, hz - H*.02, W*.36, '#ff9a5a', .45); // dusk, the sun down in the west behind the dust
    b46Ramps(x, W, H, hz, false, .8); glow(x, W*.5, hz - H*.08, W*.5, '#c06a4a', .25); // the trenches, far, in red dust
    x.fillStyle = vgrad(x, hz, H, [[0,'#8a5a42'],[.4,'#6a4232'],[1,'#2a1a14']]); x.fillRect(0, hz, W, H - hz); // the basin, going dark
    for (let i = 0; i < 50; i++) { const yy = hz + 2 + Math.pow(hash(i, 661), 1.5)*(H - hz)*.5, d = (yy - hz)/(H - hz); x.fillStyle = `rgba(40,24,16,${(.3 + d*.4).toFixed(2)})`; const sx = hash(i, 662)*W; x.fillRect(sx, yy - 1 - d*3, 1 + d*3, 1 + d*3); } // scrub, dots going away
    // the screen across the middle ground: stakes leaning out, brush woven through
    const sy = H*.62; x.fillStyle = '#2a1c12'; x.fillRect(0, sy - H*.04, W, H*.05); x.strokeStyle = '#3a2618'; x.lineWidth = 2; x.lineCap = 'round'; for (let px = 4; px < W; px += 12) { x.beginPath(); x.moveTo(px, sy + H*.01); x.lineTo(px - 3, sy - H*.08); x.stroke(); } x.lineCap = 'butt';
    x.strokeStyle = 'rgba(120,80,50,.6)'; x.lineWidth = .8; for (let i = 0; i < 80; i++) { const px = hash(i, 663)*W, py = sy - H*.04 + hash(i, 664)*H*.05; x.beginPath(); x.moveTo(px, py); x.lineTo(px + (hash(i, 665) - .5)*8, py - 3 - hash(i, 666)*4); x.stroke(); } // thorn twigs against the sky
    const lx = W*.66; x.fillStyle = '#4a2a1c'; x.beginPath(); x.moveTo(lx - 16, sy + H*.02); x.quadraticCurveTo(lx - 18, sy - H*.1, lx - 6, sy - H*.12); x.lineTo(lx, sy - H*.1); x.lineTo(lx + 6, sy - H*.12); x.quadraticCurveTo(lx + 18, sy - H*.1, lx + 16, sy + H*.02); x.fill(); x.fillStyle = 'rgba(255,170,120,.3)'; x.fillRect(lx - 13, sy - H*.08, 3, H*.08); // the lookout rock, with its notch
    x.fillStyle = vgrad(x, sy, H, [[0,'#3a2418'],[1,'#120a08']]); x.fillRect(0, sy + H*.01, W, H - sy); // the ground behind the screen
    x.fillStyle = '#0e0806'; [[.14, .8], [.82, .78]].forEach(([fx, fy]) => { x.beginPath(); x.ellipse(W*fx, H*fy, W*.1, H*.02, 0, 0, 7); x.fill(); }); // scrapes
    const cx = W*.42, cy = H*.9; x.fillStyle = '#3a2a1a'; x.beginPath(); x.ellipse(cx - W*.16, H*.93, W*.06, H*.022, 0, 0, 7); x.fill(); x.strokeStyle = '#8a7450'; x.lineWidth = 1; x.stroke(); ell(x, cx - W*.16, H*.925, 3, 1.4, '#a8946a'); // an upturned shield in the scrape (the reading table)
    for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(x, cx + Math.cos(a)*14, cy + Math.sin(a)*4, 3, 2, '#2e2420'); } // the ring of stones
    x.fillStyle = vgrad(x, cy - 26, cy, [[0,'#6a5034'],[1,'#2a1e12']]); x.beginPath(); x.ellipse(cx, cy - 8, 20, 18, 0, Math.PI, 0); x.lineTo(cx + 20, cy - 6); x.lineTo(cx - 20, cy - 6); x.closePath(); x.fill(); x.strokeStyle = '#9a8460'; x.lineWidth = 1.2; x.stroke(); // the shield set on edge between the fire and the basin
  }), 0, 0, W, H);
  b46Dust(ctx, W, H, t, H*.2, H*.55, '#d07a50', 7);
  if (!REDUCE()) for (let i = 0; i < 4; i++) { const k = (Math.sin(t/(900 + i*170) + i) + 1)/2; const fx = W*(.18 + i*.2), fy = H*.335; glow(ctx, fx, fy, 6, '#ff8a40', .25*k); } // the trenches' first fires coming up, far
  const cx = W*.42, cy = H*.9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy - 4, H*.3, '#ff8a3a', .26*fl); ctx.globalCompositeOperation = 'source-over'; // its light goes up and not out
  poly(ctx, [[cx - 7, cy], [cx - 2, cy - 13*fl], [cx + 1, cy - 6], [cx + 4, cy - 11*fl], [cx + 7, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - 3, cy], [cx, cy - 7*fl], [cx + 3, cy]], 'rgba(255,230,150,.95)');
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(30 + j*22), H*.97 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .75, .55); };
/* the trenches across the basin at dusk: the ramps up out of a flat red basin, the trench bank and its helms, the palms and the dead city
   behind; in the foreground the end of the picket line, the screen and the rock, small */
function b46TrenchScene(cv, t, dawn){ const {ctx, W, H} = sceneFit(cv), hz = H*.5;
  ctx.drawImage(sceneLayer('b46:trenches' + (dawn ? 'd' : ''), W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, dawn ? [[0,'#6a6a74'],[.6,'#b49a84'],[1,'#d0b090']] : [[0,'#2a1e2c'],[.4,'#6e3a34'],[.8,'#b85e3e'],[1,'#d08254']]); x.fillRect(0, 0, W, hz + 2); glow(x, dawn ? W*.85 : W*.1, hz - H*.04, W*.4, dawn ? '#f0d0a0' : '#ff9a5a', .45);
    b46Ramps(x, W, H, hz, false, 1.15);
    x.fillStyle = vgrad(x, hz, H, dawn ? [[0,'#a88a70'],[1,'#5a4434']] : [[0,'#9a6448'],[.5,'#7a4c36'],[1,'#3a241a']]); x.fillRect(0, hz, W, H - hz); // the basin
    for (let i = 0; i < 90; i++) { const yy = hz + 2 + Math.pow(hash(i, 671), 1.6)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(42,26,18,${(.25 + d*.45).toFixed(2)})`; const sx = hash(i, 672)*W; x.beginPath(); x.ellipse(sx, yy, 1 + d*5, .6 + d*2.2, 0, 0, 7); x.fill(); } // scrub going away
    // the end of the picket line in the foreground, at the right: the screen running in from the left and stopping at the rock
    const sy = H*.86; x.strokeStyle = '#24160e'; x.lineWidth = 2.2; x.lineCap = 'round'; for (let px = 0; px < W*.7; px += 13) { x.beginPath(); x.moveTo(px, sy); x.lineTo(px - 3, sy - H*.07); x.stroke(); } x.lineCap = 'butt'; x.fillStyle = '#24160e'; x.fillRect(0, sy - H*.035, W*.7, H*.04);
    x.fillStyle = vgrad(x, H*.66, H, [[0,'#5a2a1c'],[1,'#1a0c08']]); x.beginPath(); x.moveTo(W*.68, H); x.lineTo(W*.7, H*.8); x.lineTo(W*.78, H*.7); x.lineTo(W*.9, H*.66); x.lineTo(W + 4, H*.72); x.lineTo(W + 4, H); x.closePath(); x.fill(); // red rock at the end of the line
    x.strokeStyle = 'rgba(255,170,120,.3)'; x.lineWidth = 1; x.beginPath(); x.moveTo(W*.7, H*.8); x.lineTo(W*.78, H*.7); x.lineTo(W*.9, H*.66); x.stroke();
  }), 0, 0, W, H);
  if (dawn) for (let i = 0; i < 7; i++) { const sx = W*(.12 + i*.13 + hash(i, 701)*.04), sy = hz - H*.15, sway = REDUCE() ? 0 : Math.sin(t/1800 + i)*3, g = ctx.createLinearGradient(0, sy, 0, sy - H*.2); g.addColorStop(0, 'rgba(200,190,180,.32)'); g.addColorStop(1, 'rgba(200,190,180,0)'); ctx.strokeStyle = g; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + sway, sy - H*.1, sx + sway*2, sy - H*.2); ctx.stroke(); } // cooking smoke, going up straight
  b46Dust(ctx, W, H, t, H*.25, H*.6, dawn ? '#c8b8a0' : '#d0784c', 8);
  vign(ctx, W, H, .55, .5); }
SCENEX.b4_c6_trenches = (cv, t) => b46TrenchScene(cv, t, false);
/* first light after the night: the same view, grey-gold, the cooking smoke going up straight from the trenches */
SCENEX.b4_c6_dawn = (cv, t) => b46TrenchScene(cv, t, true);
/* the 9th's lines at night: fires behind shields along the lines to the west in a low string, the dust going through their light; across
   the basin the trenches' string of fires the same; in front, the Third's fire behind its shield and the squad round it */
SCENEX.b4_c6_eve = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.44, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b46:eve', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#06060a'],[.6,'#120e12'],[1,'#22181a']]); x.fillRect(0, 0, W, hz + 2); // no stars: the dust
    b46Ramps(x, W, H, hz, true, .7);
    x.fillStyle = vgrad(x, hz, H, [[0,'#1a1214'],[.5,'#120c0c'],[1,'#080606']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 22; i++) { const k = i/21, fx = lerp(W*.62, -W*.05, k), fy = lerp(H*.7, hz + H*.06, Math.pow(k, .7)), s = lerp(1.4, .4, k); glow(x, fx, fy, 14*s, '#ff7a30', .3); glow(x, fx, fy, 2*s, '#ffd090', .85); x.fillStyle = '#0a0606'; x.beginPath(); x.ellipse(fx, fy - 3*s, 5*s, 4*s, 0, Math.PI, 0); x.fill(); } // the lines' fires going away west behind their shields
    x.strokeStyle = '#0c0806'; x.lineWidth = 1.6; x.lineCap = 'round'; for (let px = W*.5; px < W; px += 10) { x.beginPath(); x.moveTo(px, H*.72); x.lineTo(px - 2, H*.66); x.stroke(); } x.lineCap = 'butt'; // the Third's screen, black against the basin
  }), 0, 0, W, H);
  b46Dust(ctx, W, H, t, hz, H*.8, '#6a4a3a', 6);
  if (!REDUCE()) for (let i = 0; i < 30; i++) { const k = ((t/2600 + hash(i, 681)) % 1), sx = W*(.62 + (hash(i, 682) - .5)*.2) - k*W*.1, sy = H*.86 - k*H*.3; ctx.fillStyle = `rgba(230,170,120,${(.5*(1 - k)*Math.sin(k*Math.PI)).toFixed(2)})`; ctx.fillRect(sx, sy, 1.4, .7); } // dust going through the firelight
  const cx = W*.62, cy = H*.9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy - 4, H*.36, '#ff7a30', .3*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*14, cy + Math.sin(a)*4, 3, 2, '#2a2220'); }
  poly(ctx, [[cx - 7, cy], [cx - 2, cy - 14*fl], [cx + 1, cy - 6], [cx + 4, cy - 12*fl], [cx + 7, cy]], 'rgba(255,140,50,.95)'); poly(ctx, [[cx - 3, cy], [cx, cy - 8*fl], [cx + 3, cy]], 'rgba(255,226,150,.95)');
  ctx.fillStyle = '#1a120c'; ctx.beginPath(); ctx.ellipse(cx, cy - 8, 20, 18, 0, Math.PI, 0); ctx.lineTo(cx + 20, cy - 6); ctx.lineTo(cx - 20, cy - 6); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(255,170,100,.5)'; ctx.lineWidth = 1.2; ctx.stroke(); // the shield on edge, lit from behind
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(30 + j*21), H*.97 - (j % 2)*3, 1.85, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .8, .55); };
/* the foot of the ramps at night, close: the trench banks across the top full of fires and helms, the ramp going up into them, the palms
   and towers black behind, and over the oasis a darkness heavier than the night (a slow pressure, no shape); the squad flat in front */
SCENEX.b4_c6_close = (cv, t) => { const {ctx, W, H} = sceneFit(cv), hz = H*.62;
  ctx.drawImage(sceneLayer('b46:close', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#160c0e'],[.5,'#3e1e18'],[1,'#64301c']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.5, hz - H*.2, W*.7, '#c0582a', .3); // the trenches' fires lighting the dust from under
    b46Ramps(x, W, H, hz, true, 2.2);
    x.fillStyle = vgrad(x, hz, H, [[0,'#24181a'],[.4,'#140e0e'],[1,'#060404']]); x.fillRect(0, hz, W, H - hz); // the last of the basin
    for (let i = 0; i < 40; i++) { const yy = hz + 2 + Math.pow(hash(i, 691), 1.4)*(H - hz), d = (yy - hz)/(H - hz); x.fillStyle = `rgba(0,0,0,${(.4 + d*.4).toFixed(2)})`; x.beginPath(); x.ellipse(hash(i, 692)*W, yy, 2 + d*6, 1 + d*2, 0, 0, 7); x.fill(); }
    const g = x.createLinearGradient(0, hz, 0, H*.8); g.addColorStop(0, 'rgba(255,120,50,.16)'); g.addColorStop(1, 'rgba(255,120,50,0)'); x.fillStyle = g; x.fillRect(0, hz, W, H*.18); // the trenches' light falling down the ramps
    const ox = W*.62, oy = H*.82; for (let i = 0; i < 6; i++) { const a = Math.PI*(.95 + i/5*1.1); ell(x, ox + Math.cos(a)*22, oy + Math.sin(a)*8, 6, 3.4, '#1a1210'); } // the outpost's half ring of stones
  }), 0, 0, W, H);
  // the dark over the oasis: a slow weight sitting on the palms, darker than the night, its edge never still
  const p = REDUCE() ? .5 : (Math.sin(t/5200) + 1)/2; ctx.save(); const dg = ctx.createRadialGradient(W*.5, H*.1, W*.04, W*.5, H*.12, W*(.36 + p*.05)); dg.addColorStop(0, 'rgba(0,0,0,.96)'); dg.addColorStop(.55, `rgba(2,1,4,${(.82 + p*.1).toFixed(2)})`); dg.addColorStop(.85, 'rgba(10,4,8,.35)'); dg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = dg; ctx.fillRect(0, 0, W, hz - H*.16);
  ctx.restore();
  if (!REDUCE()) { const ff = .8 + .2*Math.sin(t/130); glow(ctx, W*.62, H*.8, 18, '#ff8a3a', .34*ff); glow(ctx, W*.62, H*.8, 3, '#ffe0a0', .9*ff); } else { glow(ctx, W*.62, H*.8, 18, '#ff8a3a', .34); }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.12 + i*Math.min(22, W*.36/sq.length), H*.98, 1.5, t, {phase:i, dir:1, still:true, alpha:.85}));
  vign(ctx, W, H, .85, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Four's sand-and-iron ground (71b's frame) ---------------- */
function b46Item(key, label, body){ const w = 240, h = 130, id = 'c46-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#5a4a34"></stop><stop offset=".7" stop-color="#2a2218"></stop><stop offset="1" stop-color="#121214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a Dogslayer's cut-off badge: a square of red wool cut off a sleeve, a dog's head stitched in black, a black bar across its throat,
   the cut edge ragged with threads hanging, a corner of the sleeve's sand-coloured cloth still on it */
/* a Dogslayer's scale shirt: the legion's marks scraped off, a dog's head painted on the breast */
b46Item('b4_c6_dogscale', 'A Dogslayer\'s scale shirt', '<defs><pattern id="c46dsc" width="8" height="7" patternUnits="userSpaceOnUse"><path d="M0 0 Q4 7 8 0" fill="none" stroke="#a8a090" stroke-width="1"/></pattern></defs><ellipse cx="120" cy="114" rx="58" ry="7" fill="#000" opacity=".35"/>'
  + '<path d="M90 16 L108 12 Q120 22 132 12 L150 16 L178 42 L164 56 L158 50 L158 110 L82 110 L82 50 L76 56 L62 42 Z" fill="#5a5448"/><path d="M90 16 L108 12 Q120 22 132 12 L150 16 L178 42 L164 56 L158 50 L158 110 L82 110 L82 50 L76 56 L62 42 Z" fill="url(#c46dsc)"/>'
  + '<path d="M108 50 L114 42 L118 50 L124 50 L128 42 L134 50 Q138 62 128 70 L112 70 Q102 62 108 50 Z" fill="#141210"/><path d="M110 64 L130 60" stroke="#141210" stroke-width="3"/><circle cx="100" cy="30" r="8" fill="#fff" opacity=".06"/>');
b46Item('b4_c6_dogslayer', 'A Dogslayer\'s cut-off badge', '<ellipse cx="120" cy="70" rx="70" ry="40" fill="#e0a080" opacity=".05"/><g transform="rotate(-6 120 64)">'
  + '<path d="M80 30 L164 28 L166 102 L84 104 Z" fill="#a8946a"/><path d="M80 30 L164 28 L163 34 L81 36 Z" fill="#c8b48a" opacity=".7"/>'
  + '<path d="M88 36 L158 34 L160 96 L90 98 Z" fill="#8a2418"/><path d="M88 36 L158 34 L158 40 L88 42 Z" fill="#b84a34" opacity=".6"/>'
  + '<path d="M104 52 L114 44 L120 52 L132 50 L142 60 L140 72 L132 78 L120 80 L112 74 L106 64 Z" fill="#140c08"/><path d="M114 44 L112 36 L118 44 Z M132 50 L138 42 L136 52 Z" fill="#140c08"/><circle cx="126" cy="60" r="1.8" fill="#8a2418"/>'
  + '<path d="M96 80 L154 76 L154 84 L96 88 Z" fill="#140c08"/>'
  + '<path d="M90 98 Q100 104 108 98 Q116 106 126 99 Q138 106 146 98 Q154 104 160 96" stroke="#d8c8a0" stroke-width="1" fill="none" opacity=".6"/>'
  + '<path d="M96 100 L94 112 M110 101 L112 114 M124 100 L122 110 M138 100 L141 113 M152 99 L150 108" stroke="#c8b890" stroke-width="1" opacity=".7"/>'
  + '<path d="M164 28 L176 26 L178 40 L166 44" fill="#a8946a" opacity=".8"/></g>'
  + '<path d="M60 116 Q120 110 180 116" stroke="#c8b8a0" stroke-width="1" fill="none" opacity=".2"/>');
/* a sapper's short spade: a broad iron blade, one edge ground bright, a socket and a short ash haft worn dark at the grip, Moranth-marked */
b46Item('b4_c6_trenchspade', 'A sapper\'s short spade', '<ellipse cx="120" cy="96" rx="80" ry="10" fill="#000" opacity=".35"/><g transform="rotate(-24 120 66)">'
  + '<rect x="34" y="60" width="104" height="12" rx="5" fill="#7a5a36"/><rect x="34" y="60" width="104" height="4" rx="2" fill="#a8845a" opacity=".7"/><rect x="40" y="60" width="30" height="12" rx="4" fill="#3a2a18"/><rect x="34" y="57" width="8" height="18" rx="3" fill="#5a4026"/>'
  + '<path d="M136 56 L150 56 L152 76 L136 76 Z" fill="#4a4640"/><path d="M150 50 L196 46 Q208 66 196 86 L150 82 Z" fill="#6a665c"/><path d="M150 50 L196 46 L198 52 L151 55 Z" fill="#a8a294" opacity=".7"/>'
  + '<path d="M196 46 Q208 66 196 86" stroke="#e8e4d8" stroke-width="2.6" fill="none"/><path d="M160 58 L186 56 M160 74 L186 76" stroke="#3a3832" stroke-width="1.2" opacity=".6"/>'
  + '<path d="M166 62 L172 66 L166 70 Z" fill="#3a3832" opacity=".7"/></g>');
/* the picket's horn: a cow's horn curving, pale at the bell and dark at the tip, a brass mouthpiece, a thong, the 9th's number and tallies */
b46Item('b4_c6_pickethorn', 'The picket\'s horn', '<ellipse cx="120" cy="70" rx="80" ry="36" fill="#f0d8a0" opacity=".05"/>'
  + '<path d="M50 52 Q90 24 148 34 Q186 42 200 70 Q190 82 176 76 Q162 56 132 52 Q92 48 62 70 Z" fill="#d8c8a4"/><path d="M50 52 Q90 24 148 34 Q186 42 200 70" stroke="#f4ead4" stroke-width="2.4" fill="none" opacity=".8"/>'
  + '<path d="M150 36 Q186 44 200 70 Q190 82 176 76 Q166 58 148 52 Z" fill="#5a4630"/><path d="M190 62 Q198 70 200 70" stroke="#2a1e14" stroke-width="3" fill="none"/>'
  + '<ellipse cx="56" cy="61" rx="7" ry="12" fill="#2a2018"/><ellipse cx="56" cy="61" rx="7" ry="12" fill="none" stroke="#b8a47c" stroke-width="2"/>'
  + '<rect x="196" y="66" width="12" height="7" rx="2" fill="#c8a050"/><rect x="196" y="66" width="12" height="2.4" rx="1" fill="#f0d890" opacity=".8"/>'
  + '<path d="M88 40 Q86 48 88 56 M120 34 Q118 44 120 52 M100 38 L100 52 M104 38 L104 52 M108 37 L108 51 M112 36 L112 50" stroke="#6a5a40" stroke-width="1.2" fill="none" opacity=".8"/>'
  + '<text x="128" y="49" font-family="IM Fell English SC, serif" font-size="11" fill="#5a4a30" opacity=".9">IX</text>'
  + '<path d="M90 44 Q100 96 140 100 Q170 100 178 74" stroke="#6a4a2a" stroke-width="2" fill="none"/><path d="M90 44 Q100 96 140 100 Q170 100 178 74" stroke="#a8845a" stroke-width=".7" fill="none" opacity=".6"/>');
