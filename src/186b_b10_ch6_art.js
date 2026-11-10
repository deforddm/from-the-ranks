/* ============ Book Ten, Chapter 6 art: The Feint — the King's ships, the Sixth's stretch, the field before Kolanse City ============ */
/* Book Ten's last Letherii ground. The coast at first light: a grey beach, grey water, the King's ships at anchor with Lether's pennants,
   boats coming in low, a line of crates longer than the column, and far down the beach very large figures wading ashore (never close).
   The field before Kolanse City: a long allied line of shields on open ground, the Kolansii line and its trenches across it, the city
   low and brown beyond, and past the city a far tower standing black; the bay off to the north. After the line, far off and small: the
   bay gone white, and high over the tower something cut in half (rule 107), never explained. On 'adjunct' the foreigners' field instead:
   a ridge across the open ground, black with Kolansii by day, other fires on it by night; a low hill far off east with a little smoke.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the upper left:
     b10_kolansii          the Kolansii soldier: thin, a quilted coat too big for him now, an old dented helm, a gaunt face, a short
                           blade (Chapter 5's outriders and Chapter 7's line use the body too)
     b10_kolansii_pike     the same, with a long pike
     b10_kolansii_bow      the same, bareheaded, with a short bow
     b10_kolansii_officer  a better coat, a dark sash, a plumed helm, a sword
     b10_shriven           pale cloth over mail, a pale cowl, a long blade; well fed, upright, taller
   Backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b10_coast    the beach and the King's ships at first light (180's caption)
     b10_field    the allied line (180's caption): by day, after the line, at dusk; road-aware
     b10_battle   the battle (180's caption): dust, smoke, the line; on 'escort' after the line, the bay white and the thing in the sky
   Ground (TILEX): b10_c6_coast (sand; the sea, boats, crates, the drill, horses, carts) and b10_c6_field (Kolanse's dry dirt; the open
   ground, the shield line, stakes, barrels, horses, wagons, the ditch). Battle 't': a crate (coast), a bundle of stakes (field).
   The chapter's gear in the series' 200×150 item style on Book Ten's ground: night glass, blue-black (#2a3a52 → #070a10), a cold starlight
   rim from the upper left. */

const b106aAdj = () => !!(S && S.f && S.f.b10_lRoad === 'adjunct');
const b106aC6 = () => !!(S && S.book === 'tcg' && S.chapter === 6);
const b106aPh = () => b106aC6() ? (([1, 2, 3, 4].includes(S.f && S.f.b10_c6_ph) && S.f.b10_c6_ph) || 1) : 2;

/* ---------------- figures ---------------- */
/* the Kolansii body: thin legs, a quilted coat too big, a rope belt, a gaunt face; v: 'blade' | 'pike' | 'bow' | 'officer' */
function b106aKol(ctx, h, o, v){ ctx.save(); B2F.grow(ctx, .92, 1.02);
  const off = v === 'officer', c = off ? ['#5e5a48', '#24221a'] : b2Pick(o, [['#8a7a58', '#3a3222'], ['#7a6e56', '#30291e'], ['#8e7e62', '#3a3020']]);
  ctx.fillStyle = '#342c22'; ctx.fillRect(-3.6, 5, 2.4, 8); ctx.fillRect(1.2, 5, 2.4, 8); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-3.6, 11, 2.4, 2); ctx.fillRect(1.2, 11, 2.4, 2); // thin legs, rag-bound
  poly(ctx, [[-5.4,-6],[5.4,-6],[7.2,8.6],[-7.2,8.6]], h.armor(c[0], c[1])); // the quilted coat, hanging off him
  ctx.fillStyle = 'rgba(0,0,0,.2)'; for (let y = -4; y < 8; y += 2.2) ctx.fillRect(-6.4, y, 12.8, .45); // its quilting
  if (off) poly(ctx, [[-5.2,-5.6],[-3.6,-6],[5.6,6.4],[4,6.8]], '#6a2420'); // the officer's sash
  else B2F.line(ctx, '#5a4a30', .9, [[-6, 2.6], [6, 2.2]]); // a rope belt
  ctx.fillStyle = 'rgba(200,214,240,.14)'; ctx.fillRect(-5.8, -5.6, 1, 12); // the cold light on the lit edge
  h.head('#a8907a', 4, -11.2); ctx.fillStyle = 'rgba(40,24,16,.35)'; ctx.fillRect(-3.1, -10.4, 1.1, 2.2); ctx.fillRect(2, -10.4, 1.1, 2.2); h.look('rgba(14,10,8,.85)', -11.6); // gaunt
  if (v === 'bow') B2F.cap(ctx, '#3a2e22', 4.2, -12.2); // bareheaded, hair cropped
  else { ctx.beginPath(); ctx.arc(0, -12.2, 4.7, Math.PI, 0); ctx.fillStyle = off ? '#8a8680' : '#6a665e'; ctx.fill(); ctx.fillRect(-5, -12.6, 10, 1); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(1.2, -15.6, 1.4, 1.6); // the old helm, dented
    if (off) poly(ctx, [[-.6,-16.6],[-4.4,-21.6],[.8,-17.4],[1.6,-16.4]], '#7a2a22'); } // the officer's plume
  if (v === 'pike') { B2F.line(ctx, '#5a4028', 1.2, [[6, 9], [9.8, -24]]); poly(ctx, [[9.2,-23.4],[10.2,-29.4],[11.2,-23.2]], '#a8a49a'); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(9.9, -28, .5, 4); }
  else if (v === 'bow') B2F.bow(ctx, 8.4, -12, 8);
  else h.sword(off ? '#d0ccc0' : '#a8a296');
  ctx.restore(); }
Object.assign(FIGX, {
  b10_kolansii(ctx, h, t, o){ b106aKol(ctx, h, o, 'blade'); },
  b10_kolansii_pike(ctx, h, t, o){ b106aKol(ctx, h, o, 'pike'); },
  b10_kolansii_bow(ctx, h, t, o){ b106aKol(ctx, h, o, 'bow'); },
  b10_kolansii_officer(ctx, h, t, o){ b106aKol(ctx, h, o, 'officer'); },
  /* the Shriven: pale cloth over mail, a pale cowl, a long blade; not starving; taller and very upright */
  b10_shriven(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1.1);
    h.legs('#4a4a50'); ctx.fillStyle = '#6a6a72'; ctx.fillRect(-6.4, 3.6, 12.8, 4.6); ctx.fillStyle = 'rgba(220,226,240,.25)'; for (let i = 0; i < 6; i++) ctx.fillRect(-6 + i*2.2, 4.4 + (i % 2), .8, .8); // the mail skirt below the cloth
    ell(ctx, -6.4, -4.6, 2.6, 2.4, '#6a6a72'); ell(ctx, 6.4, -4.6, 2.6, 2.4, '#5a5a62'); // mailed shoulders
    poly(ctx, [[-5.6,-6.4],[5.6,-6.4],[6.4,6.4],[-6.4,6.4]], h.armor('#e6e2d6', '#8e8a80')); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(-.4, -6, .8, 12); // pale cloth over it
    h.head('#b8aa98', 4.1, -11.4); poly(ctx, [[-5.4,-8],[-4.4,-15.6],[0,-17.6],[4.4,-15.6],[5.4,-8],[3.6,-9.6],[3,-13.4],[0,-14.6],[-3,-13.4],[-3.6,-9.6]], '#dcd8cc'); // the cowl
    h.look('rgba(10,10,14,.9)', -11.4);
    B2F.line(ctx, '#d0d4dc', 1.3, [[7, 3], [13.2, -15]]); B2F.line(ctx, '#3a3a40', 1.7, [[6, 5], [7.6, 1.4]]); ctx.fillStyle = '#8a8a92'; ctx.fillRect(5.6, 1.2, 3.8, .9); // the long blade
    ctx.fillStyle = 'rgba(200,214,240,.18)'; ctx.fillRect(-6.2, -6, 1, 12); ctx.restore(); },
});
/* the foes put on their own bodies (the engine's borrowed ones until now) */
if (typeof FOES !== 'undefined') { const K = {b10_kolansii:'b10_kolansii', b10_lkolansii:'b10_kolansii', b10_outrider:'b10_kolansii', b10_kolpike:'b10_kolansii_pike', b10_lkolpike:'b10_kolansii_pike',
    b10_kolbow:'b10_kolansii_bow', b10_lkolbow:'b10_kolansii_bow', b10_kofficer:'b10_kolansii_officer', b10_lkofficer:'b10_kolansii_officer', b10_shriven:'b10_shriven', b10_lshriven:'b10_shriven'};
  Object.entries(K).forEach(([k, kind]) => { if (FOES[k]) FOES[k].kind = kind; }); }

/* ---------------- shared pieces ---------------- */
/* skies: first light over the sea (grey, gold low on the left); a dusty day; dusk (blue-black, ember low) */
function b106aDawn(x, W, H, hz){ x.fillStyle = vgrad(x, 0, hz, [[0,'#2e3646'],[.45,'#6a6e78'],[.8,'#b8a088'],[1,'#e2c49a']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.12, hz, W*.45, '#f0caa0', .28);
  for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(60,62,74,.22)'; x.beginPath(); x.ellipse(W*(.08 + i*.22), hz*(.25 + hash(i, 10601)*.35), W*.14, hz*.022, 0, 0, 7); x.fill(); } }
function b106aDay(x, W, H, hz){ x.fillStyle = vgrad(x, 0, hz, [[0,'#6a7486'],[.6,'#a8a294'],[1,'#d0bc98']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.15, hz*.3, W*.4, '#f0e0c0', .14); }
function b106aDusk(x, W, H, hz){ x.fillStyle = vgrad(x, 0, hz, [[0,'#070a12'],[.55,'#1a2236'],[.85,'#4a3a40'],[1,'#8a5a40']]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 70; i++) { const k = hash(i, 10611); x.fillStyle = `rgba(222,230,250,${(.12 + k*.5).toFixed(2)})`; x.fillRect(hash(i, 10612)*W, Math.pow(hash(i, 10613), 1.4)*hz*.7, .9 + k*.6, .9 + k*.6); } }
/* Kolanse's dry ground going away, by day or dusk */
function b106aGround(x, W, H, hz, N){ x.fillStyle = vgrad(x, hz, H, N ? [[0,'#3a3028'],[.5,'#241e18'],[1,'#120e0a']] : [[0,'#b49c78'],[.45,'#8a7456'],[1,'#4a3c2a']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 80; i++) { const d = Math.pow(hash(i, 10621), 1.3); x.fillStyle = N ? `rgba(0,0,0,${(.1 + d*.15).toFixed(2)})` : `rgba(70,56,40,${(.1 + d*.18).toFixed(2)})`; x.fillRect(hash(i, 10622)*W, hz + d*(H - hz), 1 + d*4, .6 + d); } }
/* Kolanse City, low and brown, a wall line; the far tower past it, black and very tall (never named, never close) */
function b106aCity(x, x0, x1, hz, s, N){ x.fillStyle = N ? '#1a1612' : '#7a6a54'; x.fillRect(x0, hz - 4*s, x1 - x0, 4*s);
  for (let i = 0; i < 26; i++) { const bx = x0 + (x1 - x0)*hash(i, 10631), bw = (3 + hash(i, 10632)*7)*s, bh = (2 + hash(i, 10633)*6)*s; x.fillStyle = N ? '#14120e' : ['#8a7a60', '#6e604c', '#9a8a6c'][i % 3]; x.fillRect(bx, hz - 4*s - bh, bw, bh); }
  x.fillStyle = N ? 'rgba(0,0,0,.3)' : 'rgba(255,240,210,.2)'; x.fillRect(x0, hz - 4*s, x1 - x0, .8*s); }
function b106aTower(x, cx, hz, s, N){ x.fillStyle = N ? '#08080a' : '#2a2626'; x.beginPath(); x.moveTo(cx - 5*s, hz - 3*s); x.lineTo(cx - 1.4*s, hz - 64*s); x.lineTo(cx, hz - 72*s); x.lineTo(cx + 1.4*s, hz - 64*s); x.lineTo(cx + 5*s, hz - 3*s); x.closePath(); x.fill();
  for (let i = 0; i < 4; i++) { const y = hz - (14 + i*13)*s, w = (4.4 - i*.8)*s; x.fillRect(cx - w, y, w*2, 1.2*s); } // ledges
  if (!N) { x.fillStyle = 'rgba(255,240,220,.18)'; x.beginPath(); x.moveTo(cx - 5*s, hz - 3*s); x.lineTo(cx - 1.4*s, hz - 64*s); x.lineTo(cx - .6*s, hz - 64*s); x.lineTo(cx - 3.6*s, hz - 3*s); x.closePath(); x.fill(); } }
/* the bay off to the north-east: grey water, or white all the way across */
function b106aBay(x, x0, x1, hz, H, white, N){ x.fillStyle = white ? (N ? '#8a94a6' : '#eef0f2') : (N ? '#1a2230' : '#7a8696'); x.beginPath(); x.moveTo(x0, hz); x.lineTo(x1, hz); x.lineTo(x1, hz + H*.02); x.lineTo(x0 + (x1 - x0)*.3, hz + H*.012); x.closePath(); x.fill();
  if (white) { x.fillStyle = N ? 'rgba(200,210,230,.25)' : 'rgba(255,255,255,.7)'; x.fillRect(x0 + (x1 - x0)*.2, hz + H*.002, (x1 - x0)*.7, H*.004);
    for (let i = 0; i < 4; i++) { const px = x0 + (x1 - x0)*(.3 + i*.15); x.fillStyle = N ? '#2a2a30' : '#3a3a40'; x.save(); x.translate(px, hz + H*.006); x.rotate((hash(i, 10641) - .5)*.6); x.fillRect(-3, -1, 6, 1.4); x.fillRect(-.3, -6, .6, 5); x.restore(); } } } // ships stuck in it, at angles
/* a line of Kolansii far off: small, thin, many, pikes up */
function b106aKolLine(x, x0, x1, y, s, N, gap){ for (let px = x0; px < x1; px += 2.6*s) { if (hash(Math.round(px), 10651) < (gap || 0)) continue; const j = hash(Math.round(px), 10652);
  x.fillStyle = N ? '#0c0a08' : '#3a3024'; x.fillRect(px, y - 4.4*s, 1.4*s, 4.4*s); ell(x, px + .7*s, y - 5*s, .8*s, .8*s, N ? '#0c0a08' : '#2a241c');
  if (j > .5) B2F.line(x, N ? '#0c0a08' : '#4a3a28', Math.max(.4, .3*s), [[px + .7*s, y - 4*s], [px + (.7 + (j - .5))*s, y - 11*s]]); } }
/* their trenches: dark lines with a pale spoil-lip */
function b106aTrench(x, x0, x1, y, s, N){ x.fillStyle = N ? '#060504' : '#2a2018'; x.fillRect(x0, y, x1 - x0, 1.6*s); x.fillStyle = N ? 'rgba(90,80,70,.4)' : 'rgba(200,180,140,.6)'; x.fillRect(x0, y - .8*s, x1 - x0, .8*s); }
/* the ridge across the open ground on the foreigners' field */
function b106aRidge(x, W, H, hz, N){ x.fillStyle = N ? '#0e0c0e' : '#5a4e40'; x.beginPath(); x.moveTo(0, hz + H*.01); x.bezierCurveTo(W*.25, hz - H*.07, W*.6, hz - H*.08, W, hz - H*.02); x.lineTo(W, hz + H*.04); x.lineTo(0, hz + H*.05); x.closePath(); x.fill();
  if (!N) { x.fillStyle = 'rgba(255,240,210,.14)'; x.beginPath(); x.moveTo(0, hz + H*.01); x.bezierCurveTo(W*.25, hz - H*.07, W*.6, hz - H*.08, W, hz - H*.02); x.lineTo(W, hz - H*.015); x.bezierCurveTo(W*.6, hz - H*.07, W*.25, hz - H*.06, 0, hz + H*.016); x.closePath(); x.fill(); } }
/* a ship at anchor: a hull, two masts, furled sails, Lether's pennant */
function b106aShip(x, cx, cy, s, N){ x.fillStyle = N ? '#0e0c0c' : '#3a2e26'; x.beginPath(); x.moveTo(cx - 14*s, cy - 3*s); x.lineTo(cx + 14*s, cy - 3*s); x.lineTo(cx + 10*s, cy + 2*s); x.lineTo(cx - 11*s, cy + 2*s); x.closePath(); x.fill();
  [[-5, 20], [5, 16]].forEach(([dx, h]) => { B2F.line(x, N ? '#0e0c0c' : '#2a2018', Math.max(.6, .7*s), [[cx + dx*s, cy - 3*s], [cx + dx*s, cy - h*s]]); x.fillStyle = N ? '#3a3a40' : '#c8c0ac'; x.fillRect(cx + (dx - 4)*s, cy - (h - 2)*s, 8*s, 1.6*s); x.fillRect(cx + (dx - 3.4)*s, cy - (h - 8)*s, 6.8*s, 1.4*s); }); // masts, sails furled on the yards
  poly(x, [[cx - 5*s, cy - 20*s], [cx + 1*s, cy - 19*s], [cx - 5*s, cy - 18*s]], N ? '#2a3040' : '#4a6a9a'); x.fillStyle = N ? '#5a5030' : '#d8b450'; x.fillRect(cx - 5*s, cy - 19.6*s, 4*s, .5*s); } // Lether's pennant, blue and gold
/* a boat coming in, low in the water, oars out */
function b106aBoat(x, cx, cy, s){ x.fillStyle = '#2a221c'; x.beginPath(); x.moveTo(cx - 6*s, cy - 1*s); x.lineTo(cx + 6*s, cy - 1*s); x.lineTo(cx + 4*s, cy + 1*s); x.lineTo(cx - 4.4*s, cy + 1*s); x.closePath(); x.fill();
  for (let i = 0; i < 3; i++) { B2F.line(x, '#4a3a2a', Math.max(.4, .4*s), [[cx + (-3 + i*3)*s, cy - .6*s], [cx + (-4 + i*3)*s, cy + 3*s]]); x.fillStyle = '#5a4a3a'; x.fillRect(cx + (-3.6 + i*3)*s, cy - 3*s, 1.6*s, 2*s); }
  x.fillStyle = '#7a5e3c'; x.fillRect(cx - 1*s, cy - 3.4*s, 3*s, 2.4*s); } // a crate in it
/* a very large figure, far down the beach: long hair, a long sword over the shoulder (never close, never more than a shape) */
function b106aGiant(x, cx, by, s){ x.fillStyle = '#2a2420'; x.fillRect(cx - 1.6*s, by - 10*s, 1.4*s, 10*s); x.fillRect(cx + .4*s, by - 10*s, 1.4*s, 10*s); // legs
  x.beginPath(); x.moveTo(cx - 3*s, by - 10*s); x.lineTo(cx + 3*s, by - 10*s); x.lineTo(cx + 3.6*s, by - 20*s); x.lineTo(cx - 3.6*s, by - 20*s); x.closePath(); x.fill(); ell(x, cx, by - 22*s, 1.8*s, 2*s, '#2a2420');
  x.fillRect(cx - 2.6*s, by - 21*s, 1*s, 6*s); B2F.line(x, '#4a4440', Math.max(.5, .5*s), [[cx + 2*s, by - 18*s], [cx - 4*s, by - 30*s]]); } // long hair; the sword
/* a crate on the sand */
function b106aCrate(x, cx, by, s, N){ x.fillStyle = N ? '#2a2016' : '#8a6a42'; x.fillRect(cx - 3*s, by - 4*s, 6*s, 4*s); x.strokeStyle = 'rgba(0,0,0,.45)'; x.lineWidth = Math.max(.4, .4*s); x.strokeRect(cx - 3*s, by - 4*s, 6*s, 4*s);
  x.fillStyle = N ? 'rgba(200,190,170,.1)' : 'rgba(240,226,190,.5)'; x.fillRect(cx - 1.4*s, by - 2.6*s, 2.8*s, .8*s); }
/* something very big, cut in half, high in the sky, falling in two pieces: far, small, unexplained (rule 107) */
function b106aCut(ctx, cx, cy, s, k){ const sep = (2 + k*3)*s, drop = k*6*s;
  ctx.fillStyle = 'rgba(30,26,30,.8)';
  ctx.beginPath(); ctx.moveTo(cx - sep - 7*s, cy - 2*s + drop); ctx.lineTo(cx - sep - 1*s, cy - 4*s + drop); ctx.lineTo(cx - sep, cy + 1*s + drop); ctx.lineTo(cx - sep - 5*s, cy + 3*s + drop); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx + sep, cy - 3*s + drop*1.2); ctx.lineTo(cx + sep + 6*s, cy - 1*s + drop*1.2); ctx.lineTo(cx + sep + 4*s, cy + 3*s + drop*1.2); ctx.lineTo(cx + sep + 1*s, cy + 2*s + drop*1.2); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(200,190,170,.25)'; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(cx - sep, cy + drop); ctx.lineTo(cx - sep, cy - 10*s); ctx.moveTo(cx + sep, cy + drop*1.2); ctx.lineTo(cx + sep, cy - 10*s); ctx.stroke(); } // the faint trail of the fall
/* fires along the back of a line at dusk */
function b106aFires(ctx, W, y, t, mo, n, x0 = .04, x1 = .96){ for (let i = 0; i < n; i++) { const fx = W*(x0 + (x1 - x0)*hash(i, 10661)), fl = mo ? .7 + .3*Math.sin(t/180 + i*1.7) : .8; glow(ctx, fx, y, 10 + fl*8, '#ff9a4a', .3*fl); ell(ctx, fx, y, 1.6, 1.2, '#ffd08a'); } }

/* ---------------- the backdrops ---------------- */
/* the beach at first light: grey sea, the King's ships, boats coming in, the line of crates, giants far down the beach */
SCENEX.b10_coast = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.36, shore = H*.56;
  ctx.drawImage(sceneLayer('b106:coast', W, H, (x, W, H) => { b106aDawn(x, W, H, hz);
    x.fillStyle = vgrad(x, hz, shore, [[0,'#7a8492'],[.5,'#5a6474'],[1,'#8a8e8e']]); x.fillRect(0, hz, W, shore - hz); // the sea
    glow(x, W*.12, hz + H*.02, W*.3, '#e8c8a0', .22);
    [[.16, .03, 1.1], [.34, .045, 1.4], [.55, .025, .9], [.7, .05, 1.5], [.86, .035, 1.1]].forEach(([u, v, k]) => b106aShip(x, W*u, hz + H*v, H/220*k, false));
    x.fillStyle = vgrad(x, shore - H*.01, H, [[0,'#c8bca4'],[.3,'#a89a80'],[1,'#5a5040']]); x.fillRect(0, shore - H*.01, W, H - shore + H*.01); // the sand
    x.fillStyle = 'rgba(70,74,80,.35)'; x.fillRect(0, shore - H*.012, W, H*.012); // the wet edge
    for (let i = 0; i < 40; i++) { const d = Math.pow(hash(i, 10671), 1.3); x.fillStyle = `rgba(90,76,56,${(.1 + d*.2).toFixed(2)})`; x.fillRect(hash(i, 10672)*W, shore + d*(H - shore), 1 + d*4, .6 + d); }
    for (let i = 0; i < 22; i++) b106aCrate(x, W*(.06 + i*.03), shore + H*(.07 + (i % 3)*.012), H/180, false); // the line of crates, longer than the column
    for (let i = 0; i < 4; i++) b106aGiant(x, W*(.86 + i*.03), shore + H*(.02 + (i % 2)*.01), H/360); }), 0, 0, W, H); // far down the beach, still too big
  for (let i = 0; i < 6; i++) { const k = mo ? ((t/(5000 + i*600) + hash(i, 10673)) % 1) : hash(i, 10673); ctx.strokeStyle = `rgba(230,236,240,${(Math.sin(k*Math.PI)*.35).toFixed(2)})`; ctx.lineWidth = 1; // the swell coming in
    const y = hz + (shore - hz)*(.3 + k*.65); ctx.beginPath(); ctx.moveTo(W*hash(i, 10674)*.5, y); ctx.lineTo(W*(.5 + hash(i, 10675)*.5), y); ctx.stroke(); }
  for (let i = 0; i < 3; i++) { const k = mo ? ((t/(16000 + i*3000) + i/3) % 1) : (i + 1)/4; b106aBoat(ctx, W*(.2 + i*.25) + Math.sin(k*Math.PI*2)*W*.02, hz + (shore - hz)*(.25 + k*.6), H/170); } // boats to and fro
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .45, .5); };

/* the allied line (180's caption): by day (the Kolansii line and trenches across the open ground, the city, the far tower, the bay; on
   'adjunct' the ridge, black with them); after the line (the open ground empty; the Kolansii streaming away to the tower; the bay white);
   at dusk (fires along the back; the bay white; on 'adjunct', other fires on the ridge and a little smoke over a hill far off) */
SCENEX.b10_field = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, adj = b106aAdj(), ph = b106aPh(), N = ph >= 4, after = ph === 3, v = (adj ? 'a' : 'e') + (N ? 'n' : after ? 'x' : 'd'), hz = H*.44;
  ctx.drawImage(sceneLayer('b106:field:' + v, W, H, (x, W, H) => { if (N) b106aDusk(x, W, H, hz); else b106aDay(x, W, H, hz);
    if (adj) { b106aRidge(x, W, H, hz, N);
      if (!N && !after) for (let r = 0; r < 3; r++) b106aKolLine(x, W*.04, W*.96, hz - H*(.04 - r*.025), H/(380 - r*60), false, .2); // black with them
      if (after || N) { x.fillStyle = N ? '#0e0c0c' : '#6a5e4c'; x.beginPath(); x.ellipse(W*.93, hz - H*.004, W*.06, H*.02, 0, Math.PI, 0); x.fill(); } } // a low hill far off east
    else { b106aCity(x, W*.18, W*.56, hz, H/240, N); b106aTower(x, W*.68, hz, H/260, N); b106aBay(x, W*.74, W, hz, H, ph >= 3, N);
      if (!N && !after) { b106aTrench(x, W*.02, W*.98, hz + H*.04, H/260, false); for (let r = 0; r < 2; r++) b106aKolLine(x, W*.02, W*.98, hz + H*(.03 - r*.012), H/(300 - r*50), false, .1); }
      else b106aTrench(x, W*.02, W*.98, hz + H*.04, H/260, N); }
    b106aGround(x, W, H, hz + H*.05, N);
    if (after || N) for (let i = 0; i < 12; i++) ell(x, W*(.06 + hash(i, 10681)*.88), H*(.56 + hash(i, 10682)*.07), W*.01, H*.005, N ? 'rgba(0,0,0,.5)' : 'rgba(30,24,18,.6)'); // shapes in the open ground that do not move, far, small
    b96aLine(x, -W*.02, W*1.02, H*.74, H/150, N ? 'night' : 'day', !N); }), 0, 0, W, H);
  if (!adj && after) { const k = mo ? (t/9000) % 1 : .5; for (let i = 0; i < 18; i++) { const u = (hash(i, 10683) + k*.4) % 1; ctx.fillStyle = 'rgba(40,32,24,.7)'; ctx.fillRect(W*(.1 + u*.55), hz + H*(.02 + hash(i, 10684)*.02) - u*H*.01, 1.4, 3); } } // the Kolansii streaming off toward the tower
  if (N) { b106aFires(ctx, W, H*.66, t, mo, 9); if (adj) b106aFires(ctx, W, hz - H*.03, t, mo, 14, .05, .9); }
  if (adj && (after || N)) for (let i = 0; i < 3; i++) { const k = mo ? ((t/12000 + i/3) % 1) : i/3; ctx.fillStyle = `rgba(${N ? '120,110,100' : '90,84,78'},${(.3*(1 - k)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*.93 + k*W*.01, hz - H*(.03 + k*.12), W*.006 + k*W*.012, H*.012 + k*H*.02, 0, 0, 7); ctx.fill(); } // a little smoke over the hill
  for (let i = 0; i < 10; i++) { const k = ((t/9000*mo + hash(i, 10685)) % 1); ctx.fillStyle = `rgba(${N ? '120,110,100' : '240,216,168'},${(.25*(1 - k)).toFixed(2)})`; ctx.fillRect(W*(.1 + hash(i, 10686)*.8) + k*W*.06, H*(.55 + hash(i, 10687)*.3) - k*H*.05, 1.3, 1.3); } // dust on the air
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, N ? .7 : .5, .5); };

/* the battle at a distance (180's caption): dust, smoke, thin lines of shields, thin figures in the dust; on 'escort' after the line, the
   bay white far off and, high over the tower, something cut in half */
SCENEX.b10_battle = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, adj = b106aAdj(), late = !adj && b106aC6() && !!(S.f && S.f.b10_c6_lineDone), hz = H*.42;
  ctx.drawImage(sceneLayer('b106:battle:' + (adj ? 'a' : late ? 'l' : 'e'), W, H, (x, W, H) => { b96aCopper(x, W, H, hz, .5);
    if (adj) b106aRidge(x, W, H, hz, false); else { b106aCity(x, W*.2, W*.52, hz, H/260, false); b106aTower(x, W*.66, hz, H/280, false); b106aBay(x, W*.72, W, hz, H, late, false); }
    for (let r = 0; r < 3; r++) { const y = hz + H*(.05 + r*.06), s = H/(420 - r*90); for (let px = W*(.04 + r*.03); px < W*(.96 - r*.02); px += 3.4*s) { if (hash(Math.round(px), r + 10691) > .86) continue; x.fillStyle = r === 2 ? '#3a2a1c' : '#2a2018'; x.fillRect(px, y - 4*s, 2.6*s, 4*s); ell(x, px + 1.3*s, y - 4.8*s, 1.2*s, 1*s, '#1a1612'); } } // lines of shields, far off
    ell(x, W*.5, H*.95, W*.7, H*.12, 'rgba(40,30,20,.5)'); x.fillStyle = vgrad(x, H*.78, H, [[0,'rgba(70,56,40,0)'],[1,'rgba(44,34,24,.9)']]); x.fillRect(0, H*.78, W, H*.22); }), 0, 0, W, H);
  b96aDust(ctx, W, H, hz + H*.04, .24, .5, t, mo, .05, adj ? 1.05 : .62);
  for (let i = 0; i < 4; i++) { const k2 = ((t/8000*mo + i/4) % 1); ctx.fillStyle = `rgba(50,44,40,${(.3*(1 - k2)).toFixed(3)})`; ctx.beginPath(); ctx.ellipse(W*(.14 + i*.14), hz - H*(.02 + k2*.18), W*.02 + k2*W*.04, H*.04 + k2*H*.04, 0, 0, 7); ctx.fill(); } // smoke going up
  if (late) { const k = mo ? Math.min(1, ((t/30000) % 1) * 1.4) : .5; b106aCut(ctx, W*.66, hz - H*.3, H/320, k); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.06 + i*Math.min(.055, .3/sq.length)), H*.97 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .62, .5); };

/* ---------------- ground ---------------- */
/* sand */
function b106aSandT(ctx, x, y, T, N){ ctx.fillStyle = N ? '#2a2620' : '#b8ac92'; ctx.fillRect(x*T, y*T, T, T); b2Mottle(ctx, x, y, T, .05, .1, N ? '120,110,90' : '100,86,62', 1);
  if (hash(x, y, 10701) > .6) { ctx.strokeStyle = N ? 'rgba(0,0,0,.2)' : 'rgba(120,104,78,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x*T + T*.1, y*T + T*.6); ctx.quadraticCurveTo(x*T + T*.5, y*T + T*.5, x*T + T*.9, y*T + T*.62); ctx.stroke(); } } // wind-ripples
/* the sea */
function b106aSeaT(ctx, x, y, T, N){ ctx.fillStyle = N ? '#121a24' : '#66727e'; ctx.fillRect(x*T, y*T, T, T);
  ctx.strokeStyle = N ? 'rgba(160,180,210,.12)' : 'rgba(230,236,240,.35)'; ctx.lineWidth = 1; for (let i = 0; i < 2; i++) { const yy = y*T + T*(.3 + i*.4) + hash(x, y, 10711 + i)*T*.1; ctx.beginPath(); ctx.moveTo(x*T + T*hash(x, y, 10713 + i)*.3, yy); ctx.quadraticCurveTo(x*T + T*.5, yy - 2, x*T + T*(.7 + hash(x, y, 10715 + i)*.3), yy); ctx.stroke(); } }
/* a wagon's tailboard with a lamp (Yelt; the paymaster) */
function b106aTail(ctx, px, py, T, N){ b55Wagon(ctx, px, py, T, N); ctx.fillStyle = N ? '#1a1410' : '#4a3622'; ctx.fillRect(px + T*.1, py + T*.7, T*.8, T*.08); ell(ctx, px + T*.8, py + T*.62, T*.06, T*.07, '#ffd08a'); glow(ctx, px + T*.8, py + T*.62, T*.3, '#ffb060', N ? .35 : .15); }
/* a bundle of pikes, upright, the drill */
function b106aPikes(ctx, px, py, T, N){ ell(ctx, px + T*.5, py + T*.88, T*.3, T*.07, 'rgba(0,0,0,.4)'); for (let i = 0; i < 5; i++) { const a = (i - 2)*.07; B2F.line(ctx, N ? '#1e160e' : '#7a5a34', Math.max(1, T*.03), [[px + T*.5, py + T*.86], [px + T*(.5 + a*3), py - T*.1]]); poly(ctx, [[px + T*(.5 + a*3) - T*.03, py - T*.08], [px + T*(.5 + a*3), py - T*.22], [px + T*(.5 + a*3) + T*.03, py - T*.08]], N ? '#5a5a60' : '#c8c4bc'); }
  B2F.line(ctx, N ? '#2a2016' : '#5a4630', Math.max(1, T*.04), [[px + T*.36, py + T*.56], [px + T*.64, py + T*.56]]); } // a cord round them
/* a bundle of stakes, lying */
function b106aStakes(ctx, px, py, T, N){ ell(ctx, px + T*.5, py + T*.84, T*.42, T*.09, 'rgba(0,0,0,.45)'); for (let i = 0; i < 6; i++) { const yy = py + T*(.5 + i*.06); B2F.line(ctx, N ? '#241a10' : ['#7a5a36', '#6a4a2c'][i % 2], Math.max(1.2, T*.06), [[px + T*.12, yy], [px + T*.82, yy - T*.04]]); poly(ctx, [[px + T*.82, yy - T*.07], [px + T*.94, yy - T*.05], [px + T*.82, yy - T*.01]], N ? '#3a2e20' : '#c8a878'); } } // sharpened ends
/* the shield line from behind, rim to rim (as Book Nine's), on Kolanse's dirt */
function b106aLineT(ctx, px, py, T, N, x, y){ for (let i = 0; i < 2; i++) { const sx = px + T*(.04 + i*.5), j = hash(x, y, 10721 + i);
  ell(ctx, sx + T*.22, py + T*.86, T*.24, T*.06, 'rgba(0,0,0,.4)');
  B2F.line(ctx, N ? '#0e0a06' : '#4a3420', Math.max(1, T*.03), [[sx + T*.3, py + T*.3], [sx + T*(.34 + (j - .5)*.08), py - T*.06]]);
  ell(ctx, sx + T*.22, py + T*.3, T*.12, T*.1, N ? '#141416' : '#4a4640');
  ctx.fillStyle = N ? '#14182a' : '#3e4a5e'; ctx.fillRect(sx, py + T*.36, T*.44, T*.48); ctx.strokeStyle = N ? '#3a3a4a' : '#9aa4b4'; ctx.lineWidth = Math.max(1, T*.035); ctx.strokeRect(sx, py + T*.36, T*.44, T*.48); // Lether's blue-grey shields
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(sx + T*.2, py + T*.36, T*.04, T*.48); } }
/* the open ground in front: trodden, churned, a few dark ruts (no bodies close) */
function b106aOpenT(ctx, x, y, T, N){ ctx.fillStyle = N ? '#1a1612' : '#8a7458'; ctx.fillRect(x*T, y*T, T, T); b2Mottle(ctx, x, y, T, .03, .14, N ? '90,80,70' : '60,46,30', 1);
  for (let i = 0; i < 3; i++) if (hash(x, y, 10731 + i) > .55) ell(ctx, x*T + T*hash(x, y, 10734 + i), y*T + T*hash(x, y, 10737 + i), T*.16, T*.04, N ? 'rgba(0,0,0,.35)' : 'rgba(50,38,26,.4)'); }
TILEX.b10_c6_coast = (ctx, ch, x, y, T, dark) => { const N = !!dark;
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === '~') return b106aSeaT(ctx, x, y, T, N);
    if (ch === 'b') { b106aSeaT(ctx, x, y, T, N); ctx.fillStyle = 'rgba(200,190,170,.25)'; ctx.fillRect(px, py + T*.8, T, T*.2); b106aBoat(ctx, px + T*.5, py + T*.6, T/14); return; } // a boat at the waterline
    b106aSandT(ctx, x, y, T, N);
    if (y === 2) { ctx.fillStyle = N ? 'rgba(20,30,40,.4)' : 'rgba(90,96,100,.35)'; ctx.fillRect(px, py, T, T*.3); } // the wet edge under the sea
    if (ch === '#') { if (y === 0 && x > 0 && x < 7) return b106aSeaT(ctx, x, y, T, N); ell(ctx, px + T*.5, py + T*.7, T*.42, T*.26, N ? '#2a2620' : '#7a7464'); for (let i = 0; i < 5; i++) B2F.line(ctx, N ? '#1e2018' : '#7a7a52', 1, [[px + T*(.2 + i*.15), py + T*.6], [px + T*(.16 + i*.15), py + T*.2]]); return; } // dune grass on a rock
    if (ch === '>' || ch === '<') { ctx.fillStyle = N ? 'rgba(200,190,160,.1)' : 'rgba(255,240,200,.22)'; ctx.fillRect(px + T*.2, py, T*.6, T); exitArrow(ctx, ch, px, py, T); return; }
    if (ch === 'C') { b106aCrate(ctx, px + T*.3, py + T*.9, T/16, N); b106aCrate(ctx, px + T*.68, py + T*.84, T/18, N); b106aCrate(ctx, px + T*.5, py + T*.6, T/18, N); return; } // the King's crates
    if (ch === 'R') { b106aCrate(ctx, px + T*.5, py + T*.88, T/12, N); return; } // the crate for the reading, on its end
    if (ch === 'X') { for (let i = 0; i < 4; i++) b106aCrate(ctx, px + T*(.25 + (i % 2)*.45), py + T*(.92 - Math.floor(i/2)*.28), T/16, N); return; } // the landing's end, crates stacked high
    if (ch === 'D') return b106aPikes(ctx, px, py, T, N);
    if (ch === 'H') { B2F.line(ctx, N ? 'rgba(150,130,100,.5)' : 'rgba(110,86,56,.8)', Math.max(1, T*.03), [[px, py + T*.3], [px + T, py + T*.3]]); b93aHorse(ctx, px + T*.5, py + T*.88, T/26, N ? '#14100c' : '#8a8478', -1); return; } // the picket, a grey horse
    if (ch === 'Y') return b106aTail(ctx, px, py, T, N);
    if (ch === 'c') { ell(ctx, px + T*.5, py + T*.88, T*.4, T*.08, 'rgba(0,0,0,.45)'); ctx.fillStyle = N ? '#2a1e14' : '#6a4a2c'; ctx.fillRect(px + T*.18, py + T*.4, T*.64, T*.4); ell(ctx, px + T*.5, py + T*.42, T*.22, T*.16, N ? '#2a2016' : '#7a5a38'); ell(ctx, px + T*.3, py + T*.84, T*.1, T*.1, '#2a1a10'); ell(ctx, px + T*.7, py + T*.84, T*.1, T*.1, '#2a1a10'); return; } // Orla's cart, a full cask
    if (ch === 'F') return b55Fire(ctx, px, py, T, N);
    if (ch === 'T') return b55Tent(ctx, x, y, T, N);
    if (ch === 'w') return b55Wagon(ctx, px, py, T, N); }); };
TILEX.b10_c6_field = (ctx, ch, x, y, T, dark) => { const N = !!dark;
  b2Clip(ctx, x, y, T, () => { const px = x*T, py = y*T;
    if (ch === ';') return b106aOpenT(ctx, x, y, T, N);
    if (typeof b105aDirtT === 'function') b105aDirtT(ctx, x, y, T, N); else { ctx.fillStyle = N ? '#2a241c' : '#a8906c'; ctx.fillRect(px, py, T, T); }
    if (ch === ',' ) { ctx.fillStyle = N ? 'rgba(200,190,160,.06)' : 'rgba(255,240,210,.18)'; ctx.fillRect(px + T*.2, py, T*.6, T); return; } // the track behind the line
    if (ch === '>' || ch === '<') { ctx.fillStyle = N ? 'rgba(200,190,160,.1)' : 'rgba(255,240,210,.25)'; ctx.fillRect(px + T*.2, py, T*.6, T); exitArrow(ctx, ch, px, py, T); return; }
    if (ch === '#') { if (typeof b105aThorn === 'function') b105aThorn(ctx, px + T*.5, py + T*.86, T/20, N); return; } // thorn at the edges
    if (ch === 'L' || ch === 'W' || ch === 'E') { b106aLineT(ctx, px, py, T, N, x, y); if (ch !== 'L') { B2F.line(ctx, N ? '#1a1410' : '#4a3626', Math.max(1.2, T*.05), [[px + T*(ch === 'W' ? .08 : .92), py + T*.9], [px + T*(ch === 'W' ? .08 : .92), py - T*.2]]); ell(ctx, px + T*(ch === 'W' ? .08 : .92), py - T*.2, T*.05, T*.05, N ? '#4a4030' : '#c8a868'); } return; } // the stretch's ends marked with a pike
    if (ch === 'S') return b106aStakes(ctx, px, py, T, N);
    if (ch === 'D') return b106aPikes(ctx, px, py, T, N);
    if (ch === 'b') { if (typeof b92aBarrels === 'function') b92aBarrels(ctx, px + T*.5, py + T*.9, T/40, N ? 'night' : 'day'); return; }
    if (ch === 'h') { B2F.line(ctx, N ? 'rgba(150,130,100,.5)' : 'rgba(110,86,56,.8)', Math.max(1, T*.03), [[px, py + T*.3], [px + T, py + T*.3]]); b93aHorse(ctx, px + T*.5, py + T*.88, T/26, N ? '#14100c' : '#8a8478', 1); return; }
    if (ch === 'Q') { b55Wagon(ctx, px, py, T, N); ell(ctx, px + T*.3, py + T*.9, T*.18, T*.06, N ? '#1a1814' : '#6a6458'); ctx.fillStyle = N ? '#2a2a2e' : '#8a8a90'; ctx.fillRect(px + T*.14, py + T*.76, T*.3, T*.1); return; } // the dead's kit in a heap
    if (ch === 'R') { b106aCrate(ctx, px + T*.5, py + T*.88, T/12, N); return; }
    if (ch === 'X') { ctx.fillStyle = N ? '#0e0a08' : '#5a4632'; ctx.fillRect(px, py + T*.3, T, T*.4); ctx.fillStyle = N ? 'rgba(90,80,70,.3)' : 'rgba(200,180,140,.5)'; ctx.fillRect(px, py + T*.26, T, T*.06); return; } // the old field-drain
    if (ch === 'Y') return b106aTail(ctx, px, py, T, N);
    if (ch === 'F') return b55Fire(ctx, px, py, T, N);
    if (ch === 'T') return b55Tent(ctx, x, y, T, N);
    if (ch === 'w') return b55Wagon(ctx, px, py, T, N); }); };
/* low cover ('t'): a stack of the King's crates on the coast; a bundle of stakes on the field */
{ const _df = drawFeature;
  drawFeature = function(ctx, ch, x, y, T, dark, style, map){
    if (ch === 't' && style === 'b10_c6_coast') { const px = x*T, py = y*T, N = !!dark; ell(ctx, px + T*.5, py + T*.9, T*.42, T*.1, 'rgba(0,0,0,.5)'); b106aCrate(ctx, px + T*.32, py + T*.9, T/14, N); b106aCrate(ctx, px + T*.7, py + T*.9, T/16, N); b106aCrate(ctx, px + T*.5, py + T*.56, T/16, N); return; }
    if (ch === 't' && style === 'b10_c6_field') { b106aStakes(ctx, x*T, y*T, T, !!dark); return; }
    return _df(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- the chapter's gear (200×150, Book Ten's ground: night glass, blue-black, a cold starlight rim from the upper left) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".38" cy=".36" r=".85"><stop offset="0" stop-color="#2a3a52"/><stop offset=".6" stop-color="#141c2a"/><stop offset="1" stop-color="#070a10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  const ground = id => `<rect width="200" height="150" fill="url(#${id}-bg)"/><path d="M0 118 L200 110 L200 150 L0 150 Z" fill="#141a26"/><path d="M0 118 L200 110" stroke="#9aa8c0" stroke-width=".8" opacity=".35"/>`;
  /* a scale shirt: laid flat, rows of small rounded plates on dark leather, a leather collar, bright rivets, Lether's mark (a coin) on the
     collar; starlight along the upper-left edge */
  const rows = []; for (let r = 0; r < 6; r++) for (let c = 0; c < 8 - (r > 3 ? 1 : 0); c++) { const cx = 62 + c*11 + (r % 2)*5.5 - (r > 3 ? -5 : 0), cy = 52 + r*10; rows.push(`<path d="M${cx - 5} ${cy} Q${cx - 5} ${cy + 9} ${cx} ${cy + 10} Q${cx + 5} ${cy + 9} ${cx + 5} ${cy} Z" fill="url(#b106sc-p)" stroke="#0c1018" stroke-width=".8"/><circle cx="${cx}" cy="${cy + 2}" r=".9" fill="#e8ecf4" opacity=".8"/>`); }
  ART['item/b10_c6_shipscale'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A scale shirt">${bg('b106sc')}
<linearGradient id="b106sc-p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c8d0dc"/><stop offset=".5" stop-color="#7a8494"/><stop offset="1" stop-color="#3a4250"/></linearGradient>
<linearGradient id="b106sc-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4028"/><stop offset="1" stop-color="#2a1c10"/></linearGradient></defs>
${ground('b106sc')}<ellipse cx="100" cy="116" rx="72" ry="8" fill="url(#b106sc-sh)"/>
<path d="M52 48 L76 38 L124 38 L148 48 L156 70 L142 74 L140 116 L60 116 L58 74 L44 70 Z" fill="url(#b106sc-l)" stroke="#0a0806" stroke-width="1.4"/>
${rows.join('')}
<path d="M76 38 Q100 50 124 38 L120 46 Q100 56 80 46 Z" fill="#4a3220" stroke="#0a0806" stroke-width="1"/><circle cx="100" cy="47" r="4" fill="#c8a040" stroke="#3a2a10" stroke-width=".8"/><circle cx="99" cy="46" r="1.4" fill="#fff4c8" opacity=".7"/>
<path d="M52 48 L76 38 L124 38" fill="none" stroke="#e2e8f2" stroke-width="1.2" opacity=".55"/></svg>`;
  ART_SIZE['item/b10_c6_shipscale'] = [200, 150];
  /* a brigade pike: a long ash shaft across the frame, a leaf head at the upper right with a cold edge, an iron shoe at the lower left,
     a cord grip at the balance */
  ART['item/b10_c6_pike'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A brigade pike">${bg('b106pk')}
<linearGradient id="b106pk-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8925a"/><stop offset="1" stop-color="#5a3e20"/></linearGradient>
<linearGradient id="b106pk-h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef2f8"/><stop offset=".5" stop-color="#9aa4b4"/><stop offset="1" stop-color="#3a4250"/></linearGradient></defs>
${ground('b106pk')}<ellipse cx="100" cy="114" rx="88" ry="6" fill="url(#b106pk-sh)"/>
<g transform="rotate(-24 100 80)"><rect x="6" y="77" width="160" height="6" rx="3" fill="url(#b106pk-w)" stroke="#1a1006" stroke-width="1"/><path d="M6 78 L166 78" stroke="#f0d8a8" stroke-width=".8" opacity=".5"/>
<rect x="0" y="76" width="10" height="8" rx="2" fill="#4a4a52" stroke="#0c0c10" stroke-width="1"/>
<path d="M78 76 L78 84 M82 76 L82 84 M86 76 L86 84 M90 76 L90 84" stroke="#2a1a0c" stroke-width="1.6"/>
<rect x="164" y="76" width="8" height="8" fill="#4a4a52" stroke="#0c0c10" stroke-width="1"/>
<path d="M172 74 Q186 72 200 80 Q186 88 172 86 Z" fill="url(#b106pk-h)" stroke="#0c1018" stroke-width="1.1"/><path d="M172 74 Q186 72 200 80" fill="none" stroke="#ffffff" stroke-width="1.2" opacity=".75"/><path d="M174 80 L198 80" stroke="#5a6678" stroke-width=".7"/></g></svg>`;
  ART_SIZE['item/b10_c6_pike'] = [200, 150];
  /* a King's tally: a stick of hard wood with notches down one side, the King's mark burned in (a crowned coin), and beside it a small
     smiling face cut by some clerk; starlight along the top edge */
  ART['item/b10_c6_kingstally'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A King's tally">${bg('b106kt')}
<linearGradient id="b106kt-w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a878"/><stop offset=".6" stop-color="#8a6a42"/><stop offset="1" stop-color="#4a3420"/></linearGradient></defs>
${ground('b106kt')}<ellipse cx="100" cy="112" rx="76" ry="7" fill="url(#b106kt-sh)"/>
<g transform="rotate(-8 100 80)"><rect x="26" y="66" width="148" height="26" rx="4" fill="url(#b106kt-w)" stroke="#1a1006" stroke-width="1.4"/>
<path d="M28 67 L172 67" stroke="#f6e6c4" stroke-width="1.1" opacity=".6"/>
${Array.from({length:12}, (_, i) => `<path d="M${40 + i*7} 92 L${42 + i*7} 84 L${44 + i*7} 92" fill="#2a1a0c"/>`).join('')}
<circle cx="138" cy="77" r="8" fill="none" stroke="#2a1608" stroke-width="2"/><path d="M132 72 L134 67 L138 71 L142 67 L144 72" fill="none" stroke="#2a1608" stroke-width="1.6"/>
<circle cx="158" cy="77" r="5" fill="none" stroke="#3a2210" stroke-width="1"/><circle cx="156.4" cy="75.6" r=".8" fill="#3a2210"/><circle cx="159.6" cy="75.6" r=".8" fill="#3a2210"/><path d="M155.6 78.4 Q158 80.6 160.4 78.4" fill="none" stroke="#3a2210" stroke-width=".9"/></g></svg>`;
  ART_SIZE['item/b10_c6_kingstally'] = [200, 150]; }
