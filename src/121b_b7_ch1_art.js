/* ============ Book Seven, Chapter 1 art: The Burned Ships — the Lether coast at night, the transports burning, a tally-shed on the coast road ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/80d, lit from the left: Doss, the Indebted farmhand who walks into the column's camp (the
   recruit): broad, sunburned, a patched leather jerkin and a quilted cap, a threshing flail over the shoulder (the swingle iron-bound),
   a sickle through the belt. The bust (POR.doss), as Book Six's Mehet: lantern low left, a warm rim on the right.
   Four backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still), in 120b's palette (night blue-black, the burning
   orange and gold, wet sand gone umber):
     b7_c1_landing     the beach before the burning: the transports at anchor in a line, a lamp at each stern, the boats run up on the sand
     b7_coast_burning  the same line of ships burning at anchor, their light on the water and the low cloud, the beach lit, the squad small
     b7_coast_night    above the beach in the dunes: a hollow with the squad's fire, dune grass, the hulks burning low on the water below
     b7_c1_shed        a fieldstone tally-shed behind a yard wall off a coast road, a lamp in its one window, the signal-fire brush by the gate
   The burning is always at a distance (the brief): light on water, masts like burning trees, no figure on the ships.
   The chapter's gear in the series' 200×150 item style (089g), on Book Six's smoke-umber ground (the Third's items). */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Doss: twenty-six, broad and sunburned, a field-hand's stoop; a leather jerkin patched in three colours over a homespun shirt, a quilted
     cap, bare forearms; the threshing flail over the right shoulder, the swingle hanging behind and swinging a little; a sickle in the belt */
  doss(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.08, 1.02); const sw = o.still ? 0 : Math.sin(t/340 + (o.phase || 0));
    h.legs('#4a3e2e'); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-4.8, 10.6, 3.8, 2.4); ctx.fillRect(1, 10.6, 3.8, 2.4); // clogs of bound leather
    poly(ctx, [[-6.8,-6],[6.8,-6],[6.2,7.4],[-6.2,7.4]], h.armor('#a08e6a', '#3a3020')); // the homespun shirt
    poly(ctx, [[-6.2,-5.4],[6.2,-5.4],[5.6,6.6],[-5.6,6.6]], h.armor('#6e5234', '#24180c')); // the jerkin over it
    ctx.fillStyle = '#5a6a4a'; ctx.fillRect(-4.6, -1.6, 3, 3.2); ctx.fillStyle = '#7a4a30'; ctx.fillRect(1.6, 2, 3, 2.6); ctx.fillStyle = '#8a7a58'; ctx.fillRect(-2.2, 3.6, 2.4, 2.2); // patches, three colours
    ctx.strokeStyle = 'rgba(20,12,6,.5)'; ctx.lineWidth = .4; ctx.strokeRect(-4.6, -1.6, 3, 3.2); ctx.strokeRect(1.6, 2, 3, 2.6);
    ctx.fillStyle = 'rgba(255,236,200,.13)'; ctx.fillRect(-5.8, -5, 1.4, 11); ctx.fillStyle = '#2a1c10'; ctx.fillRect(-6.4, 3.4, 12.8, 1.3); // lit edge, the belt
    // the sickle through the belt, blade forward
    ctx.strokeStyle = '#a8a69a'; ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(-4.4, 5.6, 2.4, Math.PI*1.1, Math.PI*1.9); ctx.stroke(); B2F.line(ctx, '#5a3e22', 1, [[-3, 4], [-2.6, 7.4]]);
    // the bare back arm, close
    ctx.fillStyle = '#a07450'; ctx.fillRect(-8.2, -4.6, 2.4, 6.6); ell(ctx, -7, 2.4, 1.2, 1.2, '#9a6c48');
    // the front arm up to the shoulder, holding the flail's handle
    ctx.fillStyle = '#a87a54'; ctx.fillRect(5.2, -5.4, 2.4, 4.4); ell(ctx, 6.4, -1.2, 1.3, 1.3, '#9a6c48');
    // the flail: the handle up over the shoulder and back, the iron-bound swingle hanging from it on a leather hinge
    B2F.line(ctx, '#7a5a34', 1.3, [[6.8, 1.6], [-2.4, -16.4]]); ctx.fillStyle = '#4a3420'; ell(ctx, -2.6, -16.8, .9, .9, '#4a3420');
    const sx = -6.6 + sw*1.2, sy = -11 + Math.abs(sw)*.6; B2F.line(ctx, '#3a2614', .7, [[-2.6, -16.6], [sx + 1.6, sy - 3.8]]);
    ctx.save(); ctx.translate(sx, sy); ctx.rotate(.5 + sw*.18); ctx.fillStyle = '#8a6a40'; ctx.fillRect(-1, -4.6, 2, 8.6); ctx.fillStyle = '#4a4a4c'; ctx.fillRect(-1.2, -3.6, 2.4, .8); ctx.fillRect(-1.2, 1.6, 2.4, .8); ctx.restore(); // the swingle, two iron bands
    h.head('#a87a54', 4.5, -11.2); h.look('rgba(20,12,6,.88)', -11.6);
    ctx.fillStyle = 'rgba(160,60,40,.25)'; ell(ctx, -1.8, -10.4, 1.4, .8, 'rgba(160,60,40,.25)'); ell(ctx, 2.6, -10.4, 1.4, .8, 'rgba(160,60,40,.25)'); // sunburn
    // the quilted cap, a band at the brow
    ctx.fillStyle = '#8a7a5a'; ctx.beginPath(); ctx.arc(0, -12.6, 5.1, Math.PI*.98, Math.PI*2.02); ctx.fill(); ctx.fillStyle = '#6a5a3e'; ctx.fillRect(-5.2, -13, 10.4, 1.4);
    ctx.strokeStyle = 'rgba(40,30,16,.45)'; ctx.lineWidth = .4; ctx.beginPath(); for (let i = -2; i <= 2; i++) { ctx.moveTo(i*1.8, -13); ctx.lineTo(i*1.2, -17.4); } ctx.stroke();
    ctx.fillStyle = 'rgba(255,240,210,.14)'; ctx.fillRect(-4.4, -16.6, 2.6, .8);
    ctx.restore(); },
});

/* ---------------- the bust ---------------- */
POR.doss = function(ctx){ const F = {cy:-76, w:12.6, h:20, jaw:.86, chin:4.8, skin:'#a8784e', iris:'#3a2a1a', lip:'#8a4e3a', browCol:'#4a3020', browW:1.8, arch:.35, browL:.1, rim:'#e0a060', rimA:.22, nose:1.4, look:.35, smileL:-.1, smileR:-.1, mouthW:3.9, age:.15, bags:.35, open:.88};
  PR.neck(ctx, F, 8.4);
  const B = BP.body(ctx, F, {wide:36, drop:5, trap:3, nx:11.6, ny:F.cy + 15, cb:-44, c1:'#7a5a38', c2:'#24160a'});
  ctx.save(); B.path(); ctx.clip();
  PR.soft(ctx, -20, -30, 9, 8, '#5a6a4a', .55); PR.soft(ctx, 18, -12, 8, 6, '#7a4a30', .5); PR.soft(ctx, -4, -6, 7, 5, '#8a7a58', .45); // the patches
  for (let i = 0; i < 40; i++) { const r = PR.rng(i + 410); PR.soft(ctx, -32 + r()*64, -46 + r()*48, .8 + r()*1.6, .6 + r()*1.2, '#1a1008', .2); } // the leather's grain
  PR.stroke(ctx, 'rgba(20,12,6,.55)', .8, () => { ctx.moveTo(-8, -46); ctx.lineTo(-6, 4); ctx.moveTo(8, -46); ctx.lineTo(6, 4); }); // the jerkin's opening, the shirt between
  ctx.fillStyle = 'rgba(160,140,104,.55)'; ctx.fillRect(-6.8, -46, 13, 50);
  PR.soft(ctx, 22, -18, 16, 14, '#000000', .45); PR.soft(ctx, -20, -36, 12, 7, '#ffe0b0', .1);
  ctx.restore(); BP.light(ctx, F, B, false);
  BP.collar(ctx, F, '#a89470', '#3a301e', 'rgba(30,22,10,.45)', {style:'fold', sw:22, sy:-42});
  // the flail's handle over the right shoulder, past the ear
  PR.stroke(ctx, '#3a2614', 3.4, () => { ctx.moveTo(30, 4); ctx.lineTo(14, -112); }); PR.stroke(ctx, '#8a6a40', 2.4, () => { ctx.moveTo(30, 4); ctx.lineTo(14, -112); }); PR.stroke(ctx, 'rgba(255,230,190,.35)', .7, () => { ctx.moveTo(28.6, 4); ctx.lineTo(12.8, -110); });
  F.under = (ctx, F) => { PR.dots(ctx, F, 50, 'rgba(18,10,6,.32)', .5, [5, 19]); PR.soft(ctx, -6, F.cy + 4, 4, 2.4, '#a03a28', .14); PR.soft(ctx, 6, F.cy + 4, 4, 2.4, '#a03a28', .14); };
  PR.face(ctx, F);
  BP.hair(ctx, F, {c:['#6a4a2a', '#3a2614', '#140a04'], v:2.4, wx:1.4, hl:12, ey:-1, n:60, sw:.5, seed:419, sh:'#c09a6a', shA:.16});
  // the quilted cap over the hair, a band at the brow
  ctx.save(); const top = F.cy - 23, br = F.cy - 12;
  ctx.beginPath(); ctx.moveTo(-F.w - 2.6, br); ctx.bezierCurveTo(-F.w - 3, top - 2, F.w + 3, top - 2, F.w + 2.6, br); ctx.closePath();
  ctx.fillStyle = PR.lit(ctx, '#9a8a64', '#3a3220', -F.w - 3, F.w + 3); ctx.fill();
  ctx.clip(); PR.stroke(ctx, 'rgba(40,30,14,.5)', .7, () => { for (let i = -3; i <= 3; i++) { ctx.moveTo(i*3.8, br); ctx.quadraticCurveTo(i*3.2, top + 4, i*1.4, top); } }); PR.soft(ctx, -6, top + 4, 6, 3, '#fff0d0', .16); ctx.restore();
  ctx.fillStyle = PR.lit(ctx, '#7a6a48', '#2a2414', -F.w - 3, F.w + 3); ctx.beginPath(); ctx.moveTo(-F.w - 2.8, br - 2); ctx.quadraticCurveTo(0, br - 4, F.w + 2.8, br - 2); ctx.lineTo(F.w + 2.6, br + .6); ctx.quadraticCurveTo(0, br - 1.4, -F.w - 2.6, br + .6); ctx.closePath(); ctx.fill();
  return F; };

/* ---------------- backdrops ---------------- */
/* one transport at anchor: a dark hull, two masts, furled yards; lit, a stern lamp; burning, the fire up the rigging */
function b71Ship(ctx, x, y, k, burn, t, i, mo){ const hw = 34*k, mast = 62*k;
  if (burn) { const ff = mo ? .85 + .15*Math.sin(t/(170 + i*23) + i) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, x, y - mast*.5, mast*1.5, '#ff7a28', .34*ff); glow(ctx, x, y - mast*.3, mast*.6, '#ffc060', .3*ff); ctx.globalCompositeOperation = 'source-over'; }
  poly(ctx, [[x - hw, y - 6*k], [x + hw*.9, y - 7*k], [x + hw, y - 10*k], [x + hw*.7, y + 3*k], [x - hw*.8, y + 3*k]], burn ? '#1a0c06' : '#07080c');
  [[-.3, 1], [.3, .86]].forEach(([dx, hk]) => { const mx = x + dx*hw, top = y - mast*hk, lean = burn && i % 3 === 1 ? .18 : 0;
    B2F.line(ctx, burn ? '#24100a' : '#090a0e', Math.max(1, 2*k), [[mx, y - 6*k], [mx + lean*mast, top]]);
    B2F.line(ctx, burn ? '#24100a' : '#0b0c10', Math.max(.8, 1.4*k), [[mx + lean*mast*.7 - hw*.3, top + mast*.22], [mx + lean*mast*.7 + hw*.3, top + mast*.2]]); });
  if (!burn) { const lf = mo ? .8 + .2*Math.sin(t/900 + i*1.7) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, x - hw*.9, y - 9*k, 7*k, '#ffb060', .5*lf); glow(ctx, x - hw*.9, y - 9*k, 1.6*k + .6, '#ffe0a0', .9*lf); ctx.globalCompositeOperation = 'source-over'; return; }
  for (let j = 0; j < 4; j++) { const fx = x + (j - 1.5)*hw*.45, fh = (26 + hash(i*4 + j, 7101)*30)*k*(mo ? .86 + .14*Math.sin(t/(90 + j*17) + i + j) : 1);
    poly(ctx, [[fx - 7*k, y - 6*k], [fx - 5*k, y - fh*.55], [fx, y - fh], [fx + 5*k, y - fh*.55], [fx + 7*k, y - 6*k]], j % 2 ? 'rgba(255,140,50,.92)' : 'rgba(255,200,100,.9)'); }
  poly(ctx, [[x - 6*k, y - 6*k], [x, y - mast*.8], [x + 6*k, y - 6*k]], 'rgba(255,220,140,.75)'); }
/* the sea: dark water with long reflected roads of light under the ships (or the stern lamps) */
function b71Sea(x, W, H, hz, sh, ships, burn){ x.fillStyle = vgrad(x, hz, sh, burn ? [[0,'#2a1610'],[.5,'#140c0c'],[1,'#0a0a10']] : [[0,'#0e1220'],[1,'#05070c']]); x.fillRect(0, hz, W, sh - hz + 2);
  for (let i = 0; i < 60; i++) { const yy = hz + 2 + Math.pow(hash(i, 7110), 1.3)*(sh - hz - 2), d = (yy - hz)/(sh - hz); x.fillStyle = burn ? `rgba(120,60,30,${(.08 + d*.1).toFixed(2)})` : `rgba(90,110,150,${(.05 + d*.06).toFixed(2)})`; x.fillRect(hash(i, 7111)*W, yy, 8 + d*40, .8 + d); } // swell
  ships.forEach(([u, k]) => { const sx = u*W; for (let j = 0; j < 9; j++) { const yy = hz + 6 + j*(sh - hz)/10, rw = (burn ? 26 : 8)*k*(1 - j*.06); x.fillStyle = burn ? `rgba(255,${150 + j*6},80,${(.36 - j*.03).toFixed(2)})` : `rgba(255,200,120,${(.22 - j*.02).toFixed(2)})`; x.fillRect(sx - rw/2 + (hash(j, 7112 + u*99) - .5)*10, yy, rw, 1.4); } }); }
/* the line of transports, nearer and larger to the left */
const B71SHIPS = [[.08, 1.05], [.19, .9], [.3, .8], [.4, .74], [.5, .68], [.6, .62], [.69, .58], [.78, .54], [.87, .5], [.95, .46]];
/* a beach and the dunes behind it */
function b71Beach(x, W, H, sh, lit){ x.fillStyle = vgrad(x, sh, H, lit ? [[0,'#6a4a30'],[.4,'#3e2a1c'],[1,'#120c08']] : [[0,'#3a362e'],[.5,'#1e1c18'],[1,'#0a0908']]); x.beginPath(); x.moveTo(0, sh); for (let i = 0; i <= 20; i++) x.lineTo(i/20*W, sh + Math.sin(i*1.3)*1.4); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill();
  x.strokeStyle = lit ? 'rgba(255,170,90,.45)' : 'rgba(200,210,230,.25)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, sh + 1); for (let i = 0; i <= 20; i++) x.lineTo(i/20*W, sh + 1 + Math.sin(i*1.3)*1.4); x.stroke(); // the surf's edge
  for (let i = 0; i < 40; i++) { const yy = sh + 4 + Math.pow(hash(i, 7120), 1.5)*(H - sh), d = (yy - sh)/(H - sh); x.fillStyle = `rgba(${lit ? '255,190,130' : '200,200,190'},${(.04 + d*.05).toFixed(2)})`; x.fillRect(hash(i, 7121)*W, yy, 10 + d*30, .8); } }
/* a boat drawn up on the sand */
function b71Boat(ctx, bx, by, s, lit){ poly(ctx, [[bx - 14*s, by - 2*s], [bx + 12*s, by - 3*s], [bx + 15*s, by - 6*s], [bx + 10*s, by + 2*s], [bx - 12*s, by + 2*s]], lit ? '#2a180e' : '#141210');
  ctx.fillStyle = lit ? 'rgba(255,170,90,.3)' : 'rgba(200,200,190,.12)'; ctx.fillRect(bx - 13*s, by - 2.4*s, 25*s, .9*s); B2F.line(ctx, lit ? '#3a2414' : '#1e1a16', Math.max(.6, s), [[bx - 4*s, by - 2*s], [bx - 10*s, by - 9*s]]); }
/* dune grass: a few stiff blades */
function b71Grass(x, gx, gy, s, col){ x.strokeStyle = col; x.lineWidth = Math.max(.5, .6*s); x.beginPath(); for (let i = 0; i < 6; i++) { const a = -1.9 + i*.16 + (hash(i, gx | 0) - .5)*.2; x.moveTo(gx + (i - 3)*.8*s, gy); x.lineTo(gx + (i - 3)*.8*s + Math.cos(a)*9*s, gy + Math.sin(a)*9*s); } x.stroke(); }

/* the landing (this file's scene): night, the transports at anchor in a long line with their stern lamps lit, the boats run up on the sand,
   marines going up the beach in the dark, the Third at the waterline */
SCENEX.b7_c1_landing = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.38, sh = H*.62;
  ctx.drawImage(sceneLayer('b71:landing', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#04060c'],[.7,'#0e1424'],[1,'#1a2032']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 110; i++) { x.fillStyle = `rgba(226,230,250,${(.1 + hash(i, 7130)*.55).toFixed(2)})`; const sz = hash(i, 7133) > .93 ? 1.4 : 1; x.fillRect(hash(i, 7131)*W, Math.pow(hash(i, 7132), 1.4)*hz*.92, sz, sz); }
    for (let i = 0; i < 4; i++) { x.fillStyle = `rgba(30,36,52,${(.3 + hash(i, 7134)*.2).toFixed(2)})`; x.beginPath(); x.ellipse(hash(i, 7135)*W, H*(.06 + hash(i, 7136)*.16), W*(.16 + hash(i, 7137)*.14), H*.014, 0, 0, 7); x.fill(); } // thin cloud
    b71Sea(x, W, H, hz, sh, B71SHIPS, false);
    b71Beach(x, W, H, sh, false);
    x.fillStyle = '#121210'; x.beginPath(); x.moveTo(W*.55, H); x.quadraticCurveTo(W*.7, H*.78, W*.86, H*.72); x.quadraticCurveTo(W*.94, H*.7, W, H*.66); x.lineTo(W, H); x.closePath(); x.fill(); // the dunes rising inland, right
    for (let i = 0; i < 26; i++) { const gx = W*(.6 + hash(i, 7138)*.4), gy = H*(.74 + hash(i, 7139)*.24); b71Grass(x, gx, gy, .8 + hash(i, 7140)*.8, 'rgba(60,64,50,.9)'); }
  }), 0, 0, W, H);
  B71SHIPS.forEach(([u, k], i) => b71Ship(ctx, u*W, hz + H*.02 + k*H*.03, k*H/360, false, t, i, mo));
  // the flagship far out, small, its masthead dark yet
  b71Ship(ctx, W*.52, hz + H*.004, .3*H/360, false, t, 99, mo);
  [[.12, .67, 1], [.34, .7, .9], [.58, .66, .8]].forEach(([u, v, s]) => b71Boat(ctx, W*u, H*v, s*H/360, false));
  // marines going up the beach, small, dark, in a file toward the dunes
  for (let i = 0; i < 9; i++) { const k = i/8, mx = W*(.42 + k*.42), my = H*(.78 - k*.12) + (mo ? Math.sin(t/300 + i)*.6 : 0), s = (1 - k*.5)*H/360; ctx.fillStyle = '#0a0a0c'; ctx.fillRect(mx - 2*s, my - 11*s, 4*s, 9*s); ell(ctx, mx, my - 13*s, 2.3*s, 2.3*s, '#0a0a0c'); B2F.line(ctx, '#0a0a0c', Math.max(.6, .9*s), [[mx + 2*s, my - 6*s], [mx + 3*s, my - 19*s]]); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.14 + i*Math.min(.075, .46/sq.length)), H*.97 - (i % 2)*2, 1.8, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* the transports burning (120's caption): the same line of ships, all of them burning at their anchors, masts like burning trees, the light
   lying on the water in long gold roads and on the underside of the low cloud; the beach lit from end to end; the squad at the waterline,
   small, their backs to it or turning to go */
SCENEX.b7_coast_burning = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.38, sh = H*.62, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b71:burning', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#05070e'],[.4,'#1a1420'],[.8,'#5a2a1c'],[1,'#a04a22']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(226,220,240,${(.1 + hash(i, 7150)*.4).toFixed(2)})`; x.fillRect(hash(i, 7151)*W, Math.pow(hash(i, 7152), 1.6)*hz*.4, 1, 1); } // a few stars where the smoke has not reached
    for (let i = 0; i < 6; i++) { const yy = H*(.08 + i*.045); x.fillStyle = `rgba(${60 + i*10},${30 + i*4},${22 + i*2},${(.4 - i*.03).toFixed(2)})`; x.beginPath(); x.ellipse(W*(.45 + i*.03), yy, W*(.6 - i*.04), H*(.028 + i*.006), 0, 0, 7); x.fill(); } // the smoke under the cloud, lit from below
    b71Sea(x, W, H, hz, sh, B71SHIPS, true);
    b71Beach(x, W, H, sh, true);
    x.fillStyle = '#1c140e'; x.beginPath(); x.moveTo(W*.55, H); x.quadraticCurveTo(W*.7, H*.78, W*.86, H*.72); x.quadraticCurveTo(W*.94, H*.7, W, H*.66); x.lineTo(W, H); x.closePath(); x.fill();
    x.fillStyle = 'rgba(255,150,80,.12)'; x.beginPath(); x.moveTo(W*.6, H*.9); x.quadraticCurveTo(W*.72, H*.77, W*.86, H*.725); x.lineTo(W*.86, H*.735); x.quadraticCurveTo(W*.72, H*.785, W*.6, H*.91); x.fill(); // the dune crest catching the light
  }), 0, 0, W, H);
  B71SHIPS.forEach(([u, k], i) => b71Ship(ctx, u*W, hz + H*.02 + k*H*.03, k*H/360, true, t, i, mo));
  if (mo) { ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 22; i++) { const [u] = B71SHIPS[i % B71SHIPS.length], k = ((t/2600 + hash(i, 7153)) % 1); ctx.fillStyle = `rgba(255,190,110,${(.85*(1 - k)).toFixed(2)})`; ctx.fillRect(W*u + (hash(i, 7154) - .5)*30 - k*20, hz - H*.06 - k*H*.24, 1.3, 1.3); } ctx.globalCompositeOperation = 'source-over'; } // embers going up off the fleet
  [[.12, .67, 1], [.34, .7, .9], [.58, .66, .8]].forEach(([u, v, s]) => b71Boat(ctx, W*u, H*v, s*H/360, true));
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.4, sh, W*.5, '#ff8030', .1*fl); ctx.globalCompositeOperation = 'source-over';
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.5 + i*Math.min(.075, .42/sq.length)), H*.96 - (i % 2)*2, 1.85, t, {phase:i, dir:1}));
  vign(ctx, W, H, .62, .5); };

/* above the beach (120's caption; B7READ[1]'s table scene): the column's first halt in the dunes; a hollow with the Third's small fire of
   boat-wood burning blue at the edges, dune grass black against the light; below and beyond, the hulks burning low on the water, the smoke
   lying along the sea in a long bank, other squads' fires in other hollows */
SCENEX.b7_coast_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.36, sh = H*.5, fl = b2Fl(t);
  ctx.drawImage(sceneLayer('b71:above', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#05070e'],[.6,'#161420'],[1,'#3a1e18']]); x.fillRect(0, 0, W, hz + 2);
    for (let i = 0; i < 80; i++) { x.fillStyle = `rgba(226,230,250,${(.1 + hash(i, 7160)*.5).toFixed(2)})`; x.fillRect(hash(i, 7161)*W, Math.pow(hash(i, 7162), 1.4)*hz*.7, 1, 1); }
    b71Sea(x, W, H, hz, sh, B71SHIPS.map(([u, k]) => [u, k*.6]), true);
    for (let i = 0; i < 4; i++) { x.fillStyle = `rgba(70,40,30,${(.42 - i*.06).toFixed(2)})`; x.beginPath(); x.ellipse(W*(.5 + i*.04), hz - H*(.01 + i*.022), W*(.62 - i*.06), H*(.02 + i*.006), 0, 0, 7); x.fill(); } // the smoke bank along the water
    // the dunes: the near crest, a hollow in front of it, the far dunes in shadow
    x.fillStyle = '#100c0a'; x.beginPath(); x.moveTo(0, sh + H*.02); for (let i = 0; i <= 24; i++) { const u = i/24; x.lineTo(u*W, sh + H*(.02 + .04*Math.sin(u*5.1 + 1) + .02*Math.sin(u*13))); } x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill();
    x.fillStyle = vgrad(x, sh + H*.1, H, [[0,'#2a1e16'],[1,'#0c0806']]); x.beginPath(); x.moveTo(0, H*.72); x.quadraticCurveTo(W*.3, H*.66, W*.5, H*.7); x.quadraticCurveTo(W*.7, H*.66, W, H*.74); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill(); // the hollow's floor
    x.strokeStyle = 'rgba(255,150,80,.25)'; x.lineWidth = 1; x.beginPath(); for (let i = 0; i <= 24; i++) { const u = i/24; x.lineTo(u*W, sh + H*(.02 + .04*Math.sin(u*5.1 + 1) + .02*Math.sin(u*13))); } x.stroke(); // the crest lit by the burning
    for (let i = 0; i < 46; i++) { const u = hash(i, 7163), gy = sh + H*(.02 + .04*Math.sin(u*5.1 + 1) + .02*Math.sin(u*13)) + 1; b71Grass(x, u*W, gy, .7 + hash(i, 7164)*.9, 'rgba(14,10,8,.95)'); }
    for (let i = 0; i < 20; i++) b71Grass(x, hash(i, 7165)*W, H*(.8 + hash(i, 7166)*.18), 1.4 + hash(i, 7167), 'rgba(20,14,10,.95)');
  }), 0, 0, W, H);
  // the hulks low on the water, burning down; other squads' small fires in far hollows
  B71SHIPS.forEach(([u, k], i) => { const sx = u*W, sy = hz + H*.012 + k*H*.02, s = k*H/360*.6, ff = mo ? .8 + .2*Math.sin(t/(200 + i*31) + i) : 1;
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, sx, sy - 6*s, 40*s, '#ff7020', .3*ff); ctx.globalCompositeOperation = 'source-over';
    poly(ctx, [[sx - 30*s, sy - 4*s], [sx + 30*s, sy - 5*s], [sx + 24*s, sy + 2*s], [sx - 26*s, sy + 2*s]], '#1a0a04'); B2F.line(ctx, '#2a1208', Math.max(.6, 1.4*s), [[sx - 6*s, sy - 4*s], [sx - 2*s + (i % 2 ? 10 : -6)*s, sy - 30*s]]);
    for (let j = 0; j < 3; j++) poly(ctx, [[sx + (j - 1)*14*s - 6*s, sy - 4*s], [sx + (j - 1)*14*s, sy - (14 + hash(i*3 + j, 7168)*10)*s*ff], [sx + (j - 1)*14*s + 6*s, sy - 4*s]], j === 1 ? 'rgba(255,200,110,.9)' : 'rgba(255,130,50,.9)'); });
  [[.14, .6], [.8, .62], [.9, .66]].forEach(([u, v], i) => { const ff = mo ? .7 + .3*Math.sin(t/(130 + i*21) + i*2) : 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*u, H*v, H*.05, '#ff8a3a', .25*ff); glow(ctx, W*u, H*v, 1.6, '#ffe0a0', .9*ff); ctx.globalCompositeOperation = 'source-over'; });
  // the Third's fire in the hollow: boat-wood, blue at the edges from the salt; the squad round it
  const cx = W*.5, cy = H*.9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.4, '#ff8a3a', .3*fl); glow(ctx, cx, cy - 4, H*.08, '#6a9aff', .12*fl); ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 8; i++) { const a = i/8*6.283; ell(ctx, cx + Math.cos(a)*14, cy + Math.sin(a)*4, 3, 2, '#2e2a26'); }
  B2F.line(ctx, '#3a2414', 2, [[cx - 10, cy + 1], [cx + 8, cy - 3]]); B2F.line(ctx, '#2a1a10', 1.8, [[cx + 10, cy + 1], [cx - 6, cy - 2]]); // a plank off a boat, a spar
  poly(ctx, [[cx - 9, cy], [cx - 3, cy - 15*fl], [cx, cy - 7], [cx + 4, cy - 13*fl], [cx + 9, cy]], 'rgba(120,160,255,.55)'); poly(ctx, [[cx - 7, cy], [cx - 2, cy - 13*fl], [cx + 1, cy - 6], [cx + 4, cy - 11*fl], [cx + 7, cy]], 'rgba(255,150,60,.95)'); poly(ctx, [[cx - 3, cy], [cx, cy - 8*fl], [cx + 3, cy]], 'rgba(255,230,150,.95)');
  if (mo) for (let i = 0; i < 6; i++) { const k = ((t/1500 + i/6) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*4 + k*8, cy - 10 - k*34, 1, 1); } // sparks, inland on the sea wind
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, cx + side*(26 + j*22), H*.97 - (j % 2)*3, 1.9, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .78, .55); };

/* the tally-shed (this file's scene): a coast road at night between hedges; behind a fieldstone yard wall a long low shed with a slate roof
   and one window with a lamp in it, a lantern on a post in the yard, the signal-fire brush on its frame by the gate; dark fields and a far
   orange sky over the coast where the ships burned; the squad small on the road */
SCENEX.b7_c1_shed = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.52;
  ctx.drawImage(sceneLayer('b71:shed', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#04060c'],[.65,'#121626'],[1,'#3a2018']]); x.fillRect(0, 0, W, hz + 2);
    glow(x, W*.05, hz, W*.45, '#ff7a30', .18); // the coast, behind, where the ships burned
    for (let i = 0; i < 90; i++) { x.fillStyle = `rgba(226,230,250,${(.1 + hash(i, 7180)*.5).toFixed(2)})`; x.fillRect(hash(i, 7181)*W, Math.pow(hash(i, 7182), 1.4)*hz*.8, 1, 1); }
    x.fillStyle = '#0c0d0e'; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 20; i++) { const u = i/20; x.lineTo(u*W, hz - H*(.01 + .012*Math.sin(u*6 + 2))); } x.lineTo(W, hz + 2); x.lineTo(0, hz + 2); x.closePath(); x.fill(); // low hills
    x.fillStyle = vgrad(x, hz, H, [[0,'#14160e'],[1,'#080906']]); x.fillRect(0, hz, W, H - hz); // the fields
    for (let i = 0; i < 70; i++) { const yy = hz + 3 + Math.pow(hash(i, 7183), 1.3)*(H - hz)*.6, d = (yy - hz)/(H - hz); x.strokeStyle = `rgba(60,66,40,${(.3 + d*.4).toFixed(2)})`; x.lineWidth = .6 + d; x.beginPath(); const gx = hash(i, 7184)*W; x.moveTo(gx, yy); x.lineTo(gx + 1, yy - 3 - d*8); x.stroke(); } // the barley, whispering
    // the yard wall, fieldstone, across the middle right
    const wx0 = W*.36, wx1 = W*.94, wy = H*.64, wh = H*.07; x.fillStyle = vgrad(x, wy - wh, wy, [[0,'#4a4840'],[1,'#22201c']]); x.fillRect(wx0, wy - wh, wx1 - wx0, wh);
    for (let i = 0; i < 70; i++) { const sx = wx0 + hash(i, 7185)*(wx1 - wx0), sy = wy - wh + hash(i, 7186)*wh; ell(x, sx, sy, 3 + hash(i, 7187)*4, 1.6 + hash(i, 7188)*1.4, `rgba(${80 + Math.round(hash(i, 7189)*40)},${76 + Math.round(hash(i, 7189)*36)},${66 + Math.round(hash(i, 7189)*30)},.35)`); }
    x.fillStyle = '#0a0908'; x.fillRect(W*.52, wy - wh, W*.06, wh); // the gate, open
    // the shed beyond the wall: long, low, a slate roof, one window
    const sx0 = W*.42, sx1 = W*.88, sb = wy - wh + 2, st = sb - H*.12; x.fillStyle = vgrad(x, st, sb, [[0,'#3e3c36'],[1,'#1a1916']]); x.fillRect(sx0, st, sx1 - sx0, sb - st);
    for (let i = 0; i < 60; i++) ell(x, sx0 + hash(i, 7190)*(sx1 - sx0), st + hash(i, 7191)*(sb - st), 3 + hash(i, 7192)*3, 1.4 + hash(i, 7193), 'rgba(110,104,92,.2)');
    poly(x, [[sx0 - W*.02, st], [sx0 + W*.04, st - H*.07], [sx1 - W*.04, st - H*.07], [sx1 + W*.02, st]], '#1a1c22'); // the roof
    x.strokeStyle = 'rgba(120,130,150,.18)'; x.lineWidth = .6; x.beginPath(); for (let i = 1; i < 6; i++) { const yy = st - H*.07*i/6; x.moveTo(sx0 + W*.04*(i/6) - W*.02*(1 - i/6), yy); x.lineTo(sx1 - W*.04*(i/6) + W*.02*(1 - i/6), yy); } x.stroke(); // slate courses
    x.fillStyle = 'rgba(20,18,16,.6)'; x.fillRect(sx0 + (sx1 - sx0)*.62, st - H*.06, W*.016, H*.03); // a chimney
    x.fillStyle = '#0e0c0a'; x.fillRect(sx0 + (sx1 - sx0)*.14, sb - H*.07, W*.035, H*.07); // the shed door, shut
    // the signal fire by the gate: brush stacked on a frame
    const bx = W*.6, by = wy; B2F.line(x, '#1a1208', 1.2, [[bx - 8, by], [bx, by - 20]]); B2F.line(x, '#1a1208', 1.2, [[bx + 8, by], [bx, by - 20]]); for (let i = 0; i < 14; i++) { const a = -1.6 + (hash(i, 7194) - .5)*1.6; B2F.line(x, '#2a2214', .8, [[bx + (hash(i, 7195) - .5)*12, by - 4 - hash(i, 7196)*12], [bx + (hash(i, 7195) - .5)*12 + Math.cos(a)*7, by - 4 - hash(i, 7196)*12 + Math.sin(a)*7]]); }
    // the road, coming in from the left past the wall, hedges along it
    x.fillStyle = 'rgba(120,104,80,.22)'; x.beginPath(); x.moveTo(0, H*.74); x.quadraticCurveTo(W*.4, H*.7, W, H*.72); x.lineTo(W, H*.82); x.quadraticCurveTo(W*.4, H*.8, 0, H*.88); x.closePath(); x.fill();
    for (let i = 0; i < 12; i++) { const hx = W*(i/11), hy = H*(.7 - (i/11)*.02); ell(x, hx, hy, W*.05, H*.025, '#0c0e08'); ell(x, hx - W*.012, hy - H*.008, W*.025, H*.01, '#141808'); } // the hedge on the far side
  }), 0, 0, W, H);
  // the lamp in the window and the lantern in the yard, breathing
  const lf = mo ? .82 + .18*Math.sin(t/700) + .05*Math.sin(t/53) : 1, wnx = W*.42 + (W*.46)*.44, wny = H*.64 - H*.07 + 2 - H*.07;
  ctx.fillStyle = `rgba(255,${190 + Math.round(lf*30)},110,${(.85*lf).toFixed(2)})`; ctx.fillRect(wnx, wny, W*.024, H*.03); ctx.fillStyle = 'rgba(40,24,10,.8)'; ctx.fillRect(wnx + W*.011, wny, 1, H*.03); ctx.fillRect(wnx, wny + H*.014, W*.024, 1);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, wnx + W*.012, wny + H*.015, H*.12, '#ffb060', .22*lf); const ly = H*.64 - H*.07 - 18, lx = W*.7; glow(ctx, lx, ly, H*.08, '#ffa050', .25*lf); glow(ctx, lx, ly, 1.8, '#ffe0a0', .9*lf); ctx.globalCompositeOperation = 'source-over';
  B2F.line(ctx, '#140e08', 1.2, [[lx, ly + 2], [lx, ly + 18]]);
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.08 + i*Math.min(.07, .4/sq.length)), H*.95 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] in the series' 200×150 item style (089g), on Book Six's smoke-umber ground ---------------- */
(function(){
  if (typeof ART === 'undefined') return;
  const O = 'stroke="#0b0806" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"';
  const sh = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#@sh)"/>`;
  const S = (d, fill, lit = '@lit') => `<path d="${d}" fill="${fill}"/><path d="${d}" fill="url(#${lit})"/><path d="${d}" fill="none" ${O}/>`;
  const lin = (id, stops, x2 = 1, y2 = 1) => `<linearGradient id="@${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  const BASE = `<radialGradient id="@bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#40291f"/><stop offset=".62" stop-color="#22150f"/><stop offset="1" stop-color="#100907"/></radialGradient>`
    + `<radialGradient id="@sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset=".55" stop-color="#000" stop-opacity=".32"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`
    + lin('lit', [[0, '#fff', .2], [.45, '#fff', 0], [.6, '#000', 0], [1, '#000', .42]])
    + lin('st', [[0, '#e9edf0'], [.35, '#a9b1b8'], [.7, '#69717a'], [1, '#353b42']], 0, 1)
    + lin('wd', [[0, '#9c7649'], [.5, '#6e4f2e'], [1, '#3c2916']], 0, 1)
    + lin('brs', [[0, '#f2d58f'], [.45, '#bb8e3e'], [1, '#634416']]);
  function put(key, label, defs, body){
    const P = key.replace(/[^a-z0-9]/g, '') + '-';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="${label.replace(/"/g, '&quot;')}"><defs>${BASE}${defs}</defs><rect width="200" height="150" fill="url(#@bg)"/>${body}</svg>`;
    ART['item/' + key] = svg.replace(/@/g, P);
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [200, 150];
  }

  /* the charred transport cloak: a grey-green Malazan cloak of the heavy sea weave, folded, its near edge burned black and ragged, a few
     embers still red in the char, a bronze cloak-pin */
  { const d = 'M28 64 Q64 50 104 56 Q142 62 174 50 L178 96 Q146 110 104 104 Q62 98 30 112 Z';
    const fold = 'M34 84 Q70 72 106 78 Q142 84 176 72';
    let char = ''; for (let i = 0; i < 14; i++) { const x = 32 + i*10.6, y = 108 - i*.8 + Math.sin(i*1.7)*2.2; char += `L${x.toFixed(1)} ${(y + (i % 2 ? 4 : -1)).toFixed(1)} `; }
    put('b7_c1_charredcloak', 'A charred transport cloak',
      lin('cl', [[0, '#7a8a6c'], [.5, '#55634a'], [1, '#2a3224']], 0, 1),
      sh(104, 124, 76, 7)
      + S(d, 'url(#@cl)')
      + `<path d="${fold}" fill="none" stroke="#1a2014" stroke-opacity=".55" stroke-width="3"/><path d="${fold}" fill="none" stroke="#c8d4b4" stroke-opacity=".18" stroke-width="1" transform="translate(0 -2)"/>`
      + `<path d="M30 112 ${char}L176 98 L178 96 Q146 110 104 104 Q62 98 30 112 Z" fill="#120a06"/>`
      + `<path d="M30 104 Q66 92 104 98 Q142 104 178 90" fill="none" stroke="#2a1608" stroke-width="5" stroke-opacity=".7"/>`
      + Array.from({length: 7}, (_, i) => `<circle cx="${(44 + i*19).toFixed(1)}" cy="${(108 - i*1.2 + (i % 2 ? 3 : 0)).toFixed(1)}" r="${(1.2 + (i % 3)*.5).toFixed(1)}" fill="#ff6a20" fill-opacity="${(.55 + (i % 2)*.3).toFixed(2)}"/>`).join('')
      + `<circle cx="150" cy="62" r="6" fill="url(#@brs)" ${O}/><circle cx="150" cy="62" r="2.4" fill="#5a3a12"/><path d="M146 58 L160 52" stroke="url(#@brs)" stroke-width="2"/>`
      + `<path d="M40 66 Q70 56 100 60" fill="none" stroke="#e8f0d8" stroke-opacity=".2" stroke-width="1.6"/>`);
  }

  /* the factor's guard-sword: a straight Letherii blade, a brass guard and pommel, the grip wound in black cord, the factor's mark (a set of
     scales) stamped on the ricasso */
  { put('b7_c1_factorblade', 'The factor\'s guard-sword', '',
      sh(100, 118, 78, 6)
      + `<g transform="rotate(-14 100 76)">`
      + S('M58 72 L172 70 L184 75 L172 80 L58 79 Z', 'url(#@st)')
      + `<path d="M62 75.4 L170 74.6" stroke="#fff" stroke-opacity=".55" stroke-width=".9"/><path d="M62 77.6 L168 77" stroke="#000" stroke-opacity=".25" stroke-width=".8"/>`
      + `<g transform="translate(68 75.4)"><path d="M0 -3.4 L0 3.4 M-3 -1.6 L3 -1.6" stroke="#4a3a20" stroke-width=".8"/><path d="M-4 -1.4 L-3 1 L-2 -1.4 M2 -1.4 L3 1 L4 -1.4" fill="none" stroke="#4a3a20" stroke-width=".7"/></g>`
      + S('M50 62 Q56 60 58 64 L58 87 Q56 91 50 89 Q53 75.5 50 62 Z', 'url(#@brs)')
      + S('M24 71 L50 71 L50 80 L24 80 Z', '#1a1612')
      + Array.from({length: 6}, (_, i) => `<path d="M${27 + i*4} 71 L${29 + i*4} 80" stroke="#3a3228" stroke-width="1.2"/>`).join('')
      + S('M12 70 Q8 75.5 12 81 Q20 83 24 78 L24 73 Q20 68 12 70 Z', 'url(#@brs)')
      + `</g>`);
  }

  /* a page of the tally-book: a heavy ledger leaf, brown in the middle and black and curled at the edges, ruled, with a family's names and
     columns of figures in a clerk's small hand; the last line darker than the rest */
  { const d = 'M44 30 L156 26 Q162 28 160 36 L164 116 Q160 124 152 122 L48 126 Q40 124 42 116 L38 40 Q38 32 44 30 Z';
    let lines = ''; for (let i = 0; i < 11; i++) { const y = 44 + i*7; lines += `<path d="M56 ${y} L150 ${y - 1.5}" stroke="#5a3a1c" stroke-opacity=".35" stroke-width=".6"/>`;
      if (i < 10) { lines += `<path d="M58 ${y - 2} q4 -2 8 0 t8 0 t7 0" fill="none" stroke="#2a1608" stroke-opacity="${i === 9 ? .95 : .6}" stroke-width="${i === 9 ? 1.2 : .8}"/>`; lines += `<path d="M118 ${y - 2.6} q3 -1.6 6 0 t6 0 M134 ${y - 2.8} q3 -1.6 6 0 t6 0" fill="none" stroke="#2a1608" stroke-opacity=".55" stroke-width=".7"/>`; } }
    put('b7_c1_tallyash', 'A page of the tally-book',
      `<radialGradient id="@pg" cx=".5" cy=".5" r=".62"><stop offset="0" stop-color="#d8bc8a"/><stop offset=".55" stop-color="#a87a44"/><stop offset=".82" stop-color="#4a2a12"/><stop offset="1" stop-color="#140a04"/></radialGradient>`,
      sh(100, 132, 64, 6)
      + `<g transform="rotate(-5 100 76)">${S(d, 'url(#@pg)')}${lines}`
      + `<path d="M38 40 Q34 52 40 60 Q36 72 42 80 L38 40 Z" fill="#0e0602"/><path d="M164 116 Q170 104 162 96 Q168 86 160 78 L164 116 Z" fill="#0e0602"/>`
      + `<path d="M48 126 Q60 120 72 127 Q86 120 100 126 Q114 119 128 125 L152 122 L48 126 Z" fill="#0e0602"/>`
      + Array.from({length: 5}, (_, i) => `<circle cx="${(52 + i*24).toFixed(1)}" cy="${(124 - (i % 2)*2).toFixed(1)}" r="1.1" fill="#ff7a30" fill-opacity=".7"/>`).join('')
      + `</g>`);
  }
})();
