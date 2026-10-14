/* ============ Book Three, Chapter 7 art: Coral, and the end of the book (v6.0) ============
   Figures (FIGX) in the ~32px frame of 18/60d; ground (TILEX) for Coral's streets and the alliance's position outside the city;
   backdrops (SCENEX: the still part cached with sceneLayer, the frame adding only what moves, REDUCE() respected); item pictures.
   Moon's Spawn is Book One's own rock (paintTitleSpawn, 22), so the book ends on the same stone it began over.
   Fallbacks with ??= (b3_c4_imass -> b3_c7_imass, b3_c6_mountain, b3_c6_mountain_night): Chapters 4 and 6 draw the real ones; these only fill a gap. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* a Bridgeburner: seen at a distance, never named. Grey-brown leathers gone dark with use, a hooded cloak, a helm with cheek-guards,
     a crossbow carried across the body, a satchel at the hip with a clay munition showing; dust on all of it */
  b3_c7_bridgeburner(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.04);
    poly(ctx, [[-6.8, -6], [6.8, -6], [8.4, 11.4], [3, 12.4], [-3, 12], [-8.4, 11.4]], h.armor('#3a3a34', '#151513')); // the cloak behind
    h.legs('#2e2a24'); ctx.fillStyle = '#1e1a16'; ctx.fillRect(-4.6, 9.6, 3.6, 3.4); ctx.fillRect(1, 9.6, 3.6, 3.4); // boots
    h.torso('#5e5442', '#24201a', 6.2); B2F.line(ctx, '#2a2018', 1.1, [[-5.6, -5.6], [5, 4.6]]); // jerkin, a strap across it
    ctx.fillStyle = '#3a2e20'; ctx.fillRect(-6, 3, 12, 1.2); ctx.fillStyle = '#8a8478'; ctx.fillRect(-.7, 3, 1.4, 1.2); // belt
    ctx.fillStyle = '#4a3a26'; ctx.fillRect(-8, 2.4, 4.8, 5); ctx.fillStyle = '#5e4a32'; ctx.fillRect(-8, 2.4, 4.8, 1.6); ell(ctx, -5.6, 2.2, 1.5, 1.3, '#b07a4a'); ctx.fillStyle = 'rgba(255,230,190,.35)'; ctx.fillRect(-6.4, 1.4, .8, .6); // the satchel, a cusser's round shoulder in it
    h.head('#9a7a62', 4.4, -11.2); h.look('rgba(24,14,10,.85)', -11.4);
    ctx.fillStyle = '#5a2a1e'; ctx.fillRect(-4.4, -7.6, 8.8, 1.8); // a scarf against the dust, once red
    ctx.beginPath(); ctx.arc(0, -12, 5.2, Math.PI, 0); ctx.fillStyle = h.armor('#5a5850', '#24221e'); ctx.fill(); ctx.fillRect(-5.6, -12.4, 11.2, 1.3); ctx.fillStyle = '#2e2c28'; ctx.fillRect(-5.2, -12, 1.5, 4.2); ctx.fillRect(3.7, -12, 1.5, 4.2); // helm, cheek-guards
    poly(ctx, [[-7.2, -6.6], [-4.6, -8], [4.6, -8], [7.2, -6.6], [7.4, -3.8], [-7.4, -3.8]], h.armor('#44443c', '#1c1c18')); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-7.4, -4.4, 14.8, .6); // the cloak over the shoulders, the hood thrown back into it
    B2F.line(ctx, '#4a3320', 1.7, [[-2.4, 1.6], [11.4, -3.2]]); B2F.line(ctx, '#8d8a86', 1.1, [[8.6, -8.4], [9.8, 2.2]]); B2F.line(ctx, 'rgba(220,214,200,.5)', .4, [[8.6, -8.4], [5.6, -2.2], [9.8, 2.2]]); // the crossbow, cocked
    ctx.fillStyle = 'rgba(190,180,160,.14)'; ctx.fillRect(-6.2, 6, 12.4, 6); // road dust on the legs
    ctx.restore(); },
});
/* a T'lan Imass, far off: dust-grey and withered, hides gone to rags, a bone helm, a long flint sword; dust lifting off it (Chapter 4 draws the real one) */
FIGX.b3_c7_imass = function(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.1, 1.14); const st = o.still ? 0 : t;
  ctx.globalAlpha *= .92;
  ctx.strokeStyle = '#3e3c40'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(7.6, 6); ctx.lineTo(13.4, -15); ctx.stroke(); poly(ctx, [[12.4, -12], [14.6, -17.4], [14.4, -12.4]], '#55545a'); ctx.fillStyle = 'rgba(200,200,210,.3)'; for (let i=0;i<4;i++) ctx.fillRect(9.4 + i*1.1, -2 - i*3.4, .6, .6); // the flint sword, knapped
  h.legs('#58534a'); poly(ctx, [[-6, -6], [6, -6], [7, 9], [4, 11], [1.6, 8.4], [-1.4, 11.2], [-4.4, 8.6], [-7, 10]], h.armor('#7a7262', '#2e2a22')); // hides, in rags
  ctx.fillStyle = '#c4bca8'; for (let i=0;i<3;i++) ctx.fillRect(-3.6 + i*3.2, -3.6, 1.2, 6.4); ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let i=0;i<3;i++) ctx.fillRect(-2.4 + i*3.2, -3.6, .6, 6.4); // ribs through them
  h.head('#aaa290', 4.4, -11.4); ctx.fillStyle = '#060504'; ctx.fillRect(-2.8, -12.4, 2.1, 2.1); ctx.fillRect(1.1, -12.4, 2.1, 2.1); ctx.fillRect(-1, -8.6, 2.6, .8); // sockets, the jaw
  ctx.fillStyle = '#8a8270'; ctx.fillRect(-5.2, -16.2, 10.4, 2.4); poly(ctx, [[-5, -15.6], [-8.4, -20.4], [-6.6, -15]], '#c8c0aa'); poly(ctx, [[5, -15.6], [8.4, -20.4], [6.6, -15]], '#c8c0aa'); // a bone helm, horned
  for (let i=0;i<6;i++){ const k = ((st/2600 + hash(i, 5)) % 1); ctx.fillStyle = `rgba(190,184,168,${(.35*(1 - k)).toFixed(2)})`; ctx.fillRect(-6 + hash(i, 6)*12 + Math.sin(k*6 + i)*1.4, 10 - k*26, 1, 1); } // dust coming off it
  ctx.restore(); };
FIGX.b3_c4_imass ??= FIGX.b3_c7_imass; // Chapter 4's own T'lan Imass when it is in the build; this one otherwise

/* ---------------- ground ---------------- */
/* Coral's streets: black paving, rubble, walls of black stone, fires, stairs, a gate, flags of the pale porous coral-stone the city is named for.
   dark = night (the streets fight goes into the dark); the default is the smoke-dimmed day of the assault */
const b67CP = N => N ? {pave:'#1a1a20', paveL:'#2c2c36', base:'#08080a', top:'#34343e', topL:'#4a4a58', face:'#141418', faceL:'#202028', coral:'#5a4c4c', coralL:'#706060', coralD:'#2e2626', wood:'#22180e', iron:'#3a3a40', dust:'90,90,110', lit:'150,165,210', day:0}
                         : {pave:'#2c2c32', paveL:'#44444e', base:'#0e0e10', top:'#4a4a52', topL:'#62626c', face:'#1e1e24', faceL:'#2e2e36', coral:'#9e8682', coralL:'#bea4a0', coralD:'#5e4c4a', wood:'#3a2a1a', iron:'#5a5a62', dust:'140,134,130', lit:'226,220,232', day:1};
function b67Flags(ctx, x, y, T, P, col, colL, bw = .56, bh = .44, seed = 0){ const px = x*T, py = y*T, r0 = Math.floor(y/bh) - 1, r1 = Math.ceil((y + 1)/bh);
  ctx.fillStyle = P.base; ctx.fillRect(px, py, T, T);
  for (let r=r0; r<=r1; r++){ const off = (r%2 ? .5 : 0)*bw + hash(r, seed, 7)*.2, yy = r*bh*T, f0 = Math.floor((x - off)/bw) - 1, f1 = Math.ceil((x + 1 - off)/bw);
    for (let f=f0; f<=f1; f++){ const xx = (f*bw + off)*T, w = bw*T, hh = bh*T, k = hash(f, r, seed + 3);
      ctx.fillStyle = shade(col, (k - .5)*.3); ctx.fillRect(xx + .6, yy + .6, w - 1.2, hh - 1.2);
      ctx.fillStyle = rgba(colL, .5); ctx.fillRect(xx + .6, yy + .6, w - 1.2, Math.max(.6, T*.02)); // each flag's worn upper lip
      if (k > .86) { ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = Math.max(.6, T*.02); ctx.beginPath(); ctx.moveTo(xx + w*.2, yy + 1); ctx.lineTo(xx + w*.45, yy + hh*.5); ctx.lineTo(xx + w*.4, yy + hh - 1); ctx.stroke(); } } } } // a crack
function b67Coral(ctx, ch, x, y, T, N){
  const P = b67CP(N), px = x*T, py = y*T, h = hash(x, y), below = b2Tile(x, y + 1);
  const pave = () => { b67Flags(ctx, x, y, T, P, P.pave, P.paveL); b2Mottle(ctx, x, y, T, N ? .03 : .05, .22, P.lit, 1.1);
    ctx.fillStyle = `rgba(${P.dust},.22)`; for (let i=0;i<5;i++) ctx.fillRect(px + hash(x, y, i + 20)*T, py + hash(y, x, i + 21)*T, Math.max(1, T*.03), Math.max(1, T*.03)); }; // ash
  const rubble = (n = 6) => { for (let i=0;i<n;i++){ const bx = px + T*(.06 + hash(x, y, i + 40)*.76), by = py + T*(.14 + hash(x, y, i + 41)*.7), w = T*(.08 + hash(x, y, i + 42)*.2), hh = w*(.5 + hash(x, y, i + 43)*.3), pale = hash(x, y, i + 44) > .7;
      ell(ctx, bx + w*.5, by + hh + T*.015, w*.6, hh*.3, 'rgba(0,0,0,.4)'); poly(ctx, [[bx, by + hh], [bx + w*.1, by + hh*.2], [bx + w*.6, by], [bx + w, by + hh*.4], [bx + w*.9, by + hh]], pale ? P.coral : P.top); poly(ctx, [[bx + w*.1, by + hh*.2], [bx + w*.6, by], [bx + w*.5, by + hh*.4]], pale ? P.coralL : P.topL); } };
  if (ch === '#') { // a wall of black dressed stone; its top lit, its face shown where the street is below it
    const face = below !== '#' && below !== null, fy = face ? py + T*.48 : py + T;
    ctx.fillStyle = P.top; ctx.fillRect(px, py, T, fy - py); b2Mottle(ctx, x, y, T, .05, .2, P.lit);
    ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = Math.max(.6, T*.02); for (let i=1;i<3;i++){ ctx.beginPath(); ctx.moveTo(px, py + i*T*.16); ctx.lineTo(px + T, py + i*T*.16); ctx.stroke(); }
    ctx.fillStyle = rgba(P.topL, .55); ctx.fillRect(px, py, T, Math.max(1, T*.03));
    if (face) { ctx.fillStyle = P.face; ctx.fillRect(px, fy, T, py + T - fy); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(px, fy, T, Math.max(1, T*.04));
      for (let r=0;r<3;r++){ const yy = fy + r*T*.17, off = r%2 ? T*.25 : 0; ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = Math.max(.6, T*.02); ctx.beginPath(); ctx.moveTo(px, yy); ctx.lineTo(px + T, yy); for (let k=0;k<3;k++){ const xx = px + off + k*T*.5; ctx.moveTo(xx, yy); ctx.lineTo(xx, yy + T*.17); } ctx.stroke();
        ctx.fillStyle = rgba(P.faceL, .7); for (let k=0;k<3;k++) ctx.fillRect(px + off + k*T*.5 - T*.25 + 1, yy + 1, T*.06, T*.15); } } // courses, each block's sunward edge
    return; }
  if (ch === 'c') { b67Flags(ctx, x, y, T, P, P.coral, P.coralL, .9, .62, 5); // the pale stone: porous, pitted, pinkish, set in big slabs
    ctx.fillStyle = rgba(P.coralD, .8); for (let i=0;i<14;i++){ const r = T*(.01 + hash(x, y, i + 60)*.022); ell(ctx, px + hash(x, y, i + 61)*T, py + hash(y, x, i + 62)*T, r, r*.8, ctx.fillStyle); }
    b2Mottle(ctx, x, y, T, N ? .03 : .08, .18, P.lit); }
  else if (ch === ',') { pave(); rubble(); }
  else if (ch === 'F') { pave(); rubble(4); ctx.fillStyle = 'rgba(10,6,4,.6)'; ell(ctx, px + T*.5, py + T*.62, T*.42, T*.2, ctx.fillStyle); // a house-fire spilled into the street: beams burning
    [[-.22, .1, .5], [.18, .02, -.6]].forEach(([dx, dy, a]) => { ctx.save(); ctx.translate(px + T*(.5 + dx), py + T*(.6 + dy)); ctx.rotate(a); ctx.fillStyle = '#140a06'; ctx.fillRect(-T*.26, -T*.05, T*.52, T*.1); ctx.fillStyle = 'rgba(255,110,40,.8)'; ctx.fillRect(-T*.1, -T*.05, T*.2, T*.03); ctx.restore(); });
    b2Flames(ctx, px + T*.5, py + T*.58, T, 1.35); glow(ctx, px + T*.5, py + T*.3, T*.4, '#ffb050', .25); }
  else if (ch === 's') { // a stair going up into the city: steps lit on their treads, the risers in shadow, cheeks either side
    ctx.fillStyle = P.base; ctx.fillRect(px, py, T, T);
    for (let i=0;i<4;i++){ const yy = py + i*T*.25, k = i/3; ctx.fillStyle = shade(P.pave, .06 + (1 - k)*.12); ctx.fillRect(px + T*.08, yy, T*.84, T*.12); ctx.fillStyle = shade(P.face, -.1); ctx.fillRect(px + T*.08, yy + T*.12, T*.84, T*.13); ctx.fillStyle = rgba(P.topL, .5); ctx.fillRect(px + T*.08, yy, T*.84, Math.max(.6, T*.02)); }
    ctx.fillStyle = P.top; ctx.fillRect(px, py, T*.08, T); ctx.fillRect(px + T*.92, py, T*.08, T); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(px + T*.08, py, T*.04, T); }
  else if (ch === 'g') { pave(); // a gate in the wall, its doors thrown back: iron-banded leaves against the posts, the arch's shadow on the flags
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px, py, T, T*.3);
    ctx.fillStyle = P.top; ctx.fillRect(px, py, T*.14, T); ctx.fillRect(px + T*.86, py, T*.14, T); ctx.fillStyle = rgba(P.topL, .6); ctx.fillRect(px, py, T*.04, T); ctx.fillRect(px + T*.86, py, T*.03, T);
    [[.14, 1], [.86, -1]].forEach(([u, d]) => { const hx = px + T*u; poly(ctx, [[hx, py + T*.06], [hx + d*T*.22, py + T*.2], [hx + d*T*.22, py + T*.98], [hx, py + T*.9]], P.wood); ctx.strokeStyle = P.iron; ctx.lineWidth = Math.max(1, T*.035); [.3, .7].forEach(k => { ctx.beginPath(); ctx.moveTo(hx, py + T*(.06 + k*.84)); ctx.lineTo(hx + d*T*.22, py + T*(.2 + k*.78)); ctx.stroke(); }); });
    ctx.fillStyle = P.top; ctx.fillRect(px, py + T*.9, T, T*.1); ctx.fillStyle = rgba(P.topL, .5); ctx.fillRect(px, py + T*.9, T, 1); } // the threshold
  else { pave(); if (ch !== '.') exitArrow(ctx, ch, px, py, T); }
  if (h > .9 && ch === '.') { ctx.fillStyle = N ? 'rgba(160,170,200,.12)' : 'rgba(220,220,230,.2)'; ctx.fillRect(px + T*.2, py + T*.7, T*.3, Math.max(1, T*.025)); } // a dropped blade, the light along it
  b2Firelit(ctx, x, y, T, N ? .32 : .16, N ? 3.6 : 2.6);
}
TILEX.b3_c7_coral = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b67Coral(ctx, ch, x, y, T, !!dark));
TILEX.b3_c7_coral_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b67Coral(ctx, ch, x, y, T, true));

/* the alliance's position outside Coral: churned earth, trampled grass, rock, tents, fires, the stake line broken where the K'ell Hunters came through.
   (Here and there in the mud, among the boots and hooves, a print with three long toes.) */
const b67FP = N => N ? {mud:'#24221e', mudL:'#36322a', grass:'#1e261c', blade:'#2e3a28', rock:'#2e2e30', rockL:'#46464c', rockD:'#121214', canvas:'#4a4638', canvasD:'#26241c', post:'#1a140e', postL:'#3a2e22', wood:'#c8b48a', lit:'170,180,210'}
                         : {mud:'#4e4436', mudL:'#64584a', grass:'#4a5638', blade:'#6c7a4e', rock:'#5c5c5a', rockL:'#80807c', rockD:'#2a2a28', canvas:'#aaa28a', canvasD:'#6a6452', post:'#3e3024', postL:'#6e5638', wood:'#d8c49a', lit:'236,234,242'};
function b67Field(ctx, ch, x, y, T, N){
  const P = b67FP(N), px = x*T, py = y*T, h = hash(x, y);
  const fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const mud = () => { fill(shade(P.mud, (h - .5)*.06)); b2Mottle(ctx, x, y, T, N ? .03 : .06, .24, P.lit, 1.2);
    ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = Math.max(1, T*.04); for (let i=0;i<6;i++){ const cx = px + T*(.1 + hash(x, y, i + 3)*.8), cy = py + T*(.1 + hash(x, y, i + 5)*.8), a = hash(x, y, i + 4)*3.1, l = T*(.12 + hash(x, y, i + 6)*.16); ctx.beginPath(); ctx.moveTo(cx - Math.cos(a)*l, cy - Math.sin(a)*l); ctx.quadraticCurveTo(cx + Math.sin(a)*T*.04, cy - Math.cos(a)*T*.04, cx + Math.cos(a)*l, cy + Math.sin(a)*l); ctx.stroke(); } // churned every way
    ctx.fillStyle = 'rgba(0,0,0,.3)'; for (let i=0;i<6;i++) ell(ctx, px + hash(x, y, i + 10)*T, py + hash(y, x, i + 11)*T, T*.04, T*.025, ctx.fillStyle, hash(x, y, i + 12)*3); // boots, hooves
    if (h > .93) { const cx = px + T*.5, cy = py + T*.55, a = hash(x, y, 13)*6.28; ctx.save(); ctx.translate(cx, cy); ctx.rotate(a); ctx.fillStyle = 'rgba(0,0,0,.42)'; ell(ctx, 0, T*.06, T*.07, T*.05, ctx.fillStyle); [-.5, 0, .5].forEach(k => { ctx.save(); ctx.rotate(k); ctx.fillRect(-T*.025, -T*.3, T*.05, T*.3); poly(ctx, [[-T*.03, -T*.3], [0, -T*.38], [T*.03, -T*.3]], 'rgba(0,0,0,.42)'); ctx.restore(); }); ctx.restore(); } }; // three long toes, and a heel
  const grass = () => { mud(); for (let i=0;i<4;i++) b2Soft(ctx, px + T*(.15 + hash(x, y, i + 34)*.7), py + T*(.15 + hash(x, y, i + 35)*.7), T*(.22 + hash(x, y, i + 36)*.2), .7, N ? '30,40,28' : '74,90,54', .7); ctx.strokeStyle = P.blade; ctx.lineWidth = Math.max(1, T*.025);
    for (let i=0;i<14;i++){ const gx = px + hash(x, y, i + 30)*T, gy = py + T*(.15 + hash(y, x, i + 31)*.8), l = T*(.06 + hash(x, y, i + 32)*.1), flat = hash(x, y, i + 33) > .5; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + (flat ? l : l*.3), gy - (flat ? l*.25 : l)); ctx.stroke(); } }; // trodden flat, half of it
  if (ch === '#') { mud(); const cx = px + T*.5, by = py + T*.86; ell(ctx, cx + T*.06, by, T*.46, T*.1, 'rgba(0,0,0,.45)'); // a boulder of the coast's grey rock
    poly(ctx, [[px + T*.06, by], [px + T*.1, py + T*.42], [px + T*.34, py + T*.14], [px + T*.7, py + T*.1], [px + T*.92, py + T*.36], [px + T*.96, by]], P.rock);
    poly(ctx, [[px + T*.1, py + T*.42], [px + T*.34, py + T*.14], [px + T*.7, py + T*.1], [px + T*.5, py + T*.44]], P.rockL); poly(ctx, [[px + T*.7, py + T*.1], [px + T*.92, py + T*.36], [px + T*.96, by], [px + T*.6, by]], P.rockD);
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = Math.max(.6, T*.02); ctx.beginPath(); ctx.moveTo(px + T*.4, py + T*.5); ctx.lineTo(px + T*.46, py + T*.7); ctx.lineTo(px + T*.4, by); ctx.stroke(); return; }
  if (ch === ',') grass(); else mud();
  if (ch === '=') { const cx = px + T*.5, by = py + T*.86; ell(ctx, cx + T*.06, by, T*.46, T*.1, 'rgba(0,0,0,.4)'); // a tent, one side slashed open
    poly(ctx, [[px + T*.06, by], [cx, py + T*.16], [px + T*.94, by]], P.canvas); poly(ctx, [[cx, py + T*.16], [px + T*.94, by], [cx + T*.12, by]], P.canvasD);
    poly(ctx, [[cx - T*.12, by], [cx, py + T*.42], [cx + T*.1, by]], N ? '#0a0908' : '#2a241c');
    if (h > .5) { poly(ctx, [[px + T*.62, py + T*.4], [px + T*.8, py + T*.64], [px + T*.7, py + T*.66]], N ? '#0a0908' : '#2a241c'); poly(ctx, [[px + T*.8, py + T*.64], [px + T*.88, py + T*.86], [px + T*.74, py + T*.78]], P.canvasD); } // the slash, its flap hanging
    ctx.fillStyle = P.post; ctx.fillRect(cx - T*.02, py + T*.08, T*.04, T*.1); }
  else if (ch === 'F') b2Flames(ctx, px + T*.5, py + T*.62, T, 1.1);
  else if (ch === 'x') { // the stake line, broken: sharpened stakes canted outward, some snapped to splinters, one down
    for (let i=0;i<4;i++){ const sx = px + T*(.14 + i*.24), base = py + T*.86, k = hash(x, y, i + 50), a = -.5 + (hash(x, y, i + 51) - .5)*.3;
      ctx.save(); ctx.translate(sx, base); ell(ctx, T*.05, T*.02, T*.08, T*.03, 'rgba(0,0,0,.35)');
      if (k < .25) { ctx.rotate(1.35); ctx.fillStyle = P.post; ctx.fillRect(-T*.045, -T*.6, T*.09, T*.6); ctx.fillStyle = P.postL; ctx.fillRect(-T*.045, -T*.6, T*.03, T*.6); } // flattened
      else if (k < .6) { ctx.rotate(a*.6); ctx.fillStyle = P.post; ctx.fillRect(-T*.05, -T*.3, T*.1, T*.3); poly(ctx, [[-T*.05, -T*.3], [-T*.03, -T*.42], [0, -T*.32], [T*.02, -T*.44], [T*.05, -T*.3]], P.wood); } // snapped, the wood pale where it broke
      else { ctx.rotate(a); ctx.fillStyle = P.post; ctx.fillRect(-T*.05, -T*.66, T*.1, T*.66); poly(ctx, [[-T*.05, -T*.66], [0, -T*.82], [T*.05, -T*.66]], P.post); ctx.fillStyle = P.postL; ctx.fillRect(-T*.05, -T*.66, T*.03, T*.66); }
      ctx.restore(); }
    ctx.strokeStyle = N ? 'rgba(0,0,0,.4)' : 'rgba(40,30,20,.45)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(px, py + T*.86); ctx.lineTo(px + T, py + T*.84); ctx.stroke(); } // the ditch they stood in
  else if (ch !== '.' && ch !== ',') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .3 : .12, N ? 3.4 : 2.4);
}
TILEX.b3_c7_field = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b67Field(ctx, ch, x, y, T, !!dark));
TILEX.b3_c7_field_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b67Field(ctx, ch, x, y, T, true));

/* the hidden entrenchments in the mountains over Coral — only if Chapter 6's own is missing: rock, moss, cliff, cedar screen, trench mouth,
   a shielded fire, a quorl roost */
function b67Mount(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y), below = b2Tile(x, y + 1), P = N ? {rock:'#2a2c30', rockL:'#3c4046', moss:'#1e2a20', mossL:'#2c3c2c', cliff:'#16181c', cliffL:'#30343a', cedar:'#142018', cedarL:'#22342a', wood:'#2a2018', lit:'150,165,210'}
                                                                           : {rock:'#5a5c5e', rockL:'#76797c', moss:'#3e5236', mossL:'#56704a', cliff:'#2e3034', cliffL:'#62666c', cedar:'#24382a', cedarL:'#3a5640', wood:'#4a3826', lit:'236,240,246'};
  const rock = () => { ctx.fillStyle = shade(P.rock, (h - .5)*.08); ctx.fillRect(px, py, T, T); b2Mottle(ctx, x, y, T, .07, .24, P.lit, 1.1);
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = Math.max(.6, T*.02); for (let i=0;i<2;i++){ const sx = px + hash(x, y, i + 2)*T, sy = py + hash(y, x, i + 3)*T; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + T*.2, sy + T*.1); ctx.lineTo(sx + T*.26, sy + T*.3); ctx.stroke(); }
    ctx.fillStyle = rgba(P.rockL, .6); for (let i=0;i<3;i++) ctx.fillRect(px + hash(x, y, i + 8)*T, py + hash(y, x, i + 9)*T, T*.12, Math.max(1, T*.025)); };
  if (ch === '#') { const face = below !== '#' && below !== null, fy = face ? py + T*.5 : py + T; ctx.fillStyle = P.rockL; ctx.fillRect(px, py, T, fy - py); b2Mottle(ctx, x, y, T, .06, .26, P.lit);
    if (face) { ctx.fillStyle = P.cliff; ctx.fillRect(px, fy, T, py + T - fy); ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = Math.max(1, T*.03); for (let i=0;i<3;i++){ const sx = px + T*(.15 + hash(x, y, i + 4)*.7); ctx.beginPath(); ctx.moveTo(sx, fy); ctx.lineTo(sx + T*.04, fy + T*.25); ctx.lineTo(sx - T*.02, py + T); ctx.stroke(); } ctx.fillStyle = rgba(P.cliffL, .7); ctx.fillRect(px, fy, T, Math.max(1, T*.03)); }
    return; }
  rock();
  if (ch === ',') { for (let i=0;i<5;i++) ell(ctx, px + T*(.15 + hash(x, y, i + 20)*.7), py + T*(.15 + hash(x, y, i + 21)*.7), T*(.12 + hash(x, y, i + 22)*.14), T*(.08 + hash(x, y, i + 23)*.08), i%2 ? P.moss : P.mossL); }
  else if (ch === '=') { ctx.fillStyle = P.wood; ctx.fillRect(px, py + T*.18, T, T*.05); ctx.fillRect(px + T*.48, py + T*.1, T*.05, T*.8); // a screen of cut cedar boughs on a pole frame
    for (let i=0;i<7;i++){ const bx = px + T*(.05 + i*.14), by = py + T*(.2 + hash(x, y, i + 30)*.08); ctx.strokeStyle = i%2 ? P.cedar : P.cedarL; ctx.lineWidth = Math.max(1, T*.05); ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + T*.04, by + T*.35, bx - T*.02, by + T*.66); ctx.stroke();
      ctx.lineWidth = Math.max(.6, T*.022); for (let k=0;k<5;k++){ const yy = by + T*(.1 + k*.11); ctx.beginPath(); ctx.moveTo(bx, yy); ctx.lineTo(bx - T*.07, yy + T*.06); ctx.moveTo(bx, yy); ctx.lineTo(bx + T*.07, yy + T*.05); ctx.stroke(); } } }
  else if (ch === 'T') { poly(ctx, [[px + T*.12, py + T*.9], [px + T*.18, py + T*.3], [px + T*.82, py + T*.3], [px + T*.88, py + T*.9]], '#060606'); ctx.fillStyle = P.wood; ctx.fillRect(px + T*.1, py + T*.24, T*.8, T*.08); ctx.fillRect(px + T*.12, py + T*.24, T*.06, T*.66); ctx.fillRect(px + T*.82, py + T*.24, T*.06, T*.66); } // a trench mouth, timbered
  else if (ch === 'F') { for (let i=0;i<7;i++){ const a = i/7*6.28; ell(ctx, px + T*.5 + Math.cos(a)*T*.24, py + T*.6 + Math.sin(a)*T*.12, T*.07, T*.05, P.rockL); } b2Flames(ctx, px + T*.5, py + T*.6, T, .7); ctx.fillStyle = N ? '#2a2016' : '#5a4430'; ctx.fillRect(px + T*.14, py + T*.22, T*.72, T*.18); } // a stone ring, a hide screen over it
  else if (ch === 'q') drawFigure(ctx, 'quorl', px + T*.5, py + T*.72, T/38, 0, {still:true});
  else if (ch !== '.') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .22 : .08, 2.2);
}
TILEX.b3_c6_mountain ??= (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b67Mount(ctx, ch, x, y, T, !!dark));
TILEX.b3_c6_mountain_night ??= (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b67Mount(ctx, ch, x, y, T, true));

/* ---------------- backdrops ---------------- */
/* Moon's Spawn, painted once at a size and kept (Book One's own rock, 22) */
const b67Rock = (ms, haze) => { const r = Math.ceil(ms*1.5); return sceneLayer('b3:c7rock' + Math.round(ms) + (haze || ''), r*2, r*2, (x) => { x.translate(r, r); paintTitleSpawn(x, ms);
  if (haze) { x.globalCompositeOperation = 'source-atop'; x.fillStyle = vgrad(x, -ms, ms, [[0, haze], [.6, haze], [1, 'rgba(120,70,40,.25)']]); x.fillRect(-r, -r, r*2, r*2); x.globalCompositeOperation = 'source-over'; } }); }; // haze: the air between, laid over the stone only
/* a mountain line from hash noise */
function b67Ridge(x, W, base, amp, seed, col, step = 8){ x.fillStyle = col; x.beginPath(); x.moveTo(-4, base + amp*2); for (let px=-4, i=0; px<=W + step; px+=step, i++){ const n = Math.sin(i*.35 + seed)*.5 + Math.sin(i*.13 + seed*2)*.8 + (hash(i, seed) - .5)*.5; x.lineTo(px, base - amp*(.6 + n*.5)); } x.lineTo(W + 4, base + amp*2); x.closePath(); x.fill(); }
/* a cedar's silhouette, layered boughs, flat-topped as the old ones are */
function b67Cedar(x, cx, by, hh, col){ x.fillStyle = col; x.fillRect(cx - hh*.03, by - hh*.95, hh*.06, hh*.95); const sd = Math.round(cx*7 + hh);
  for (let i=0;i<7;i++){ const yy = by - hh*(.16 + i*.12), w = hh*(.34 - i*.04)*(1 + (hash(i, sd) - .5)*.5), d = (hash(i + 3, sd) - .5)*w*.3; // tiers of drooping boughs, wider below
    x.beginPath(); x.moveTo(cx + d - w, yy + hh*.05); x.quadraticCurveTo(cx + d - w*.4, yy - hh*.03, cx + d, yy - hh*.09); x.quadraticCurveTo(cx + d + w*.4, yy - hh*.03, cx + d + w, yy + hh*.05); x.quadraticCurveTo(cx + d, yy + hh*.02, cx + d - w, yy + hh*.05); x.fill(); }
  x.beginPath(); x.moveTo(cx - hh*.05, by - hh*.94); x.lineTo(cx, by - hh*1.04); x.lineTo(cx + hh*.05, by - hh*.94); x.fill(); }
/* Coral's skyline: low black houses climbing toward the Seer's keep on its rise; returns where its windows and fires are */
function b67City(x, x0, x1, base, hh, col, seed, keepX){ const lits = []; x.fillStyle = col;
  for (let px=x0, i=0; px<x1; i++){ const w = hh*(.08 + hash(i, seed)*.14), d = Math.abs(px - keepX)/(x1 - x0), th = hh*(.06 + hash(i, seed + 1)*.12 + Math.max(0, .3 - d)*.9); x.fillRect(px, base - th, w + .5, th + 1); if (hash(i, seed + 2) > .82) x.fillRect(px + w*.3, base - th - hh*.1, w*.3, hh*.1); if (hash(i, seed + 3) > .55) lits.push([px + w*hash(i, seed + 4), base - th*(.2 + hash(i, seed + 5)*.6)]); px += w; }
  return lits; }
/* the Seer's keep: a sheer black redoubt, a tall tower out of its middle, cold light in its high windows */
function b67Keep(x, kx, base, s, col, coldA){ x.fillStyle = col; x.fillRect(kx - 22*s, base - 16*s, 44*s, 16*s); for (let i=0;i<9;i++) x.fillRect(kx - 22*s + i*5.2*s, base - 18.4*s, 2.6*s, 2.4*s);
  x.fillRect(kx - 9*s, base - 34*s, 18*s, 18*s); x.fillRect(kx - 5*s, base - 52*s, 10*s, 18*s); poly(x, [[kx - 6*s, base - 52*s], [kx, base - 60*s], [kx + 6*s, base - 52*s]], col); x.fillRect(kx - 20*s, base - 26*s, 7*s, 10*s); x.fillRect(kx + 13*s, base - 24*s, 7*s, 8*s);
  if (coldA) { glow(x, kx, base - 44*s, 30*s, '#bcd8f0', coldA*.5); x.fillStyle = `rgba(214,232,250,${coldA})`; [[-2, -48], [1.4, -48], [-2, -40], [1.4, -42], [-6, -28], [4, -30]].forEach(([dx, dy]) => x.fillRect(kx + dx*s, base + dy*s, 1.1*s, 1.8*s)); } }

/* Coral from the mountains at night: the trench edge under cedars, moss on the stones; far below, the city on its bay, the keep on its rise with a
   wrong cold light in it, fires in the lower town, the sea dark beyond. A patch of sky with no stars in it. Quorls going down without lanterns */
SCENEX.b3_c7_coral = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4, kx = W*.6, kb = H*.56, sea = H*.52;
  ctx.drawImage(sceneLayer('b3:c7coral', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#05060c'],[.6,'#10162a'],[1,'#1e2840']]); x.fillRect(0, 0, W, hz + 2);
    for (let i=0;i<120;i++){ const sx = hash(i, 3)*W, sy = Math.pow(hash(i, 4), 1.4)*hz*.92, dx = (sx - W*.28)/(W*.16), dy = (sy - H*.14)/(H*.08); if (dx*dx + dy*dy < 1) continue; x.fillStyle = `rgba(220,226,255,${(.15 + hash(i, 5)*.5).toFixed(2)})`; x.fillRect(sx, sy, hash(i, 6) > .9 ? 1.4 : .9, hash(i, 6) > .9 ? 1.4 : .9); } // stars, and a place where there are none
    x.fillStyle = vgrad(x, hz, sea + H*.04, [[0,'#0c1222'],[1,'#04050a']]); x.fillRect(0, hz, W, sea - hz + H*.04); // the sea behind the city, black to its horizon
    x.fillStyle = 'rgba(90,110,160,.3)'; x.fillRect(0, hz - .5, W, 1); x.fillStyle = 'rgba(120,140,190,.1)'; for (let i=0;i<30;i++) x.fillRect(hash(i, 11)*W, hz + 2 + hash(i, 12)*(sea - hz), 5 + hash(i, 13)*14, .6);
    x.fillStyle = '#0c1018'; x.beginPath(); x.moveTo(W*.78, hz); x.quadraticCurveTo(W*.9, hz - H*.03, W + 2, hz - H*.025); x.lineTo(W + 2, hz + 1); x.fill(); // a headland
    // the city: a black spread along the shore, climbing to the keep on its height
    x.fillStyle = '#06070c'; x.beginPath(); x.moveTo(W*.08, sea + H*.02); x.quadraticCurveTo(W*.36, sea - H*.01, kx - W*.1, kb - H*.06); x.quadraticCurveTo(kx, kb - H*.11, kx + W*.12, kb - H*.06); x.quadraticCurveTo(W*.86, sea - H*.01, W*.98, sea + H*.02); x.lineTo(W*.98, H*.78); x.lineTo(W*.08, H*.78); x.fill();
    let lits = b67City(x, W*.1, W*.96, sea + H*.03, H*.28, '#07080e', 31, kx); lits = lits.concat(b67City(x, W*.12, W*.94, sea + H*.08, H*.18, '#090a10', 37, kx), b67City(x, W*.16, W*.9, sea + H*.14, H*.12, '#0a0b12', 39, kx));
    b67Keep(x, kx, kb - H*.07, H/240*.95, '#05060a', .6);
    lits.forEach(([lx, ly], i) => { const a = .45 + hash(i, 42)*.5; glow(x, lx, ly, 2.6, '#ffb060', a*.25); x.fillStyle = `rgba(255,${180 + Math.round(hash(i, 41)*40)},110,${a.toFixed(2)})`; x.fillRect(lx - .5, ly - .5, 1.1, 1.1); });
    [[.2, .055], [.34, .1]].forEach(([rx, ry], r) => { const n = 26 + r*12; for (let i=0;i<n;i++){ const a = Math.PI*(1.04 + i/(n - 1)*.92), fx = kx + Math.cos(a)*W*rx, fy = kb - H*.04 + Math.abs(Math.sin(a))*H*ry; if (hash(i, r + 45) < .2) continue; glow(x, fx, fy, 3, '#ff9a40', .3); x.fillStyle = 'rgba(255,200,120,.85)'; x.fillRect(fx - .5, fy - .5, 1.1, 1.1); } }); // fires in rings round the keep's height
    // the mountainside we watch from: dark slopes, cedar, the trench lip with moss on its stones, a few helmets along it
    b67Ridge(x, W, H*.8, H*.06, 13, '#0a0c10', 6);
    x.fillStyle = '#07080a'; x.beginPath(); x.moveTo(0, H*.78); x.quadraticCurveTo(W*.3, H*.86, W*.62, H*.87); x.quadraticCurveTo(W*.85, H*.88, W, H*.82); x.lineTo(W, H); x.lineTo(0, H); x.fill();
    for (let i=0;i<5;i++) b67Cedar(x, W*(.02 + i*.05) + hash(i, 51)*W*.03, H*(.86 + i*.02), H*(.36 + hash(i, 52)*.2), i%2 ? '#05070a' : '#080a0c');
    for (let i=0;i<3;i++) b67Cedar(x, W*(.86 + i*.06), H*(.88 + i*.03), H*(.32 + hash(i, 53)*.18), '#06080a');
    x.fillStyle = '#0b0d0d'; x.beginPath(); x.moveTo(W*.22, H*.93); for (let i=0;i<=24;i++){ const u = i/24; x.lineTo(W*(.22 + u*.62), H*(.866 + Math.sin(u*9)*.004) - hash(i, 61)*H*.014); } x.lineTo(W*.84, H*.93); x.quadraticCurveTo(W*.53, H*.95, W*.22, H*.93); x.fill(); // the trench lip: heaped stone and turf
    for (let i=0;i<14;i++){ x.fillStyle = `rgba(70,100,70,${(.18 + hash(i, 62)*.2).toFixed(2)})`; x.beginPath(); x.ellipse(W*(.24 + hash(i, 63)*.58), H*(.866 - hash(i, 64)*.008), W*(.006 + hash(i, 65)*.012), H*.0035, 0, 0, 7); x.fill(); } // moss along it
    [[.4, 1], [.47, 1.1], [.62, .95]].forEach(([u, k]) => { const hx = W*u, hy = H*.858; x.fillStyle = '#0c0d10'; x.beginPath(); x.arc(hx, hy, 2.6*k, Math.PI, 0); x.fill(); x.fillRect(hx - 3.2*k, hy - .3, 6.4*k, 1); x.fillStyle = 'rgba(150,165,210,.25)'; x.fillRect(hx - 1.8*k, hy - 2.2*k, 1.6*k, .6); }); // helmets over the lip, watching
    x.fillStyle = vgrad(x, H*.88, H, [[0,'rgba(4,4,6,0)'],[1,'rgba(4,4,6,.8)']]); x.fillRect(0, H*.88, W, H*.12);
  }), 0, 0, W, H);
  // the lower town burning in places; the keep's cold breathing; lamps
  const fires = [[.3, .015], [.42, .005], [.78, .012], [.5, -.01]];
  fires.forEach(([u, dy], i) => { const fx = W*u, fy = sea + H*dy, fl = .8 + (mo ? Math.sin(t/140 + i*2) *.12 + Math.sin(t/57 + i)*.08 : 0); glow(ctx, fx, fy, H*.07*fl, '#ff7a2a', .35*fl); ctx.fillStyle = `rgba(255,200,120,${.8*fl})`; ctx.fillRect(fx - 1, fy - 1.4, 2, 1.6);
    for (let k=0;k<6;k++){ const p = mo ? ((t/5200 + k/6 + i*.17) % 1) : k/6; ctx.fillStyle = `rgba(30,26,30,${(.22*(1 - p)).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(fx + p*H*.06 + Math.sin(p*4 + i)*2, fy - p*H*.22, 3 + p*H*.05, 2 + p*H*.03, 0, 0, 7); ctx.fill(); } }); // and their smoke leaning off the sea
  { const p = mo ? (Math.sin(t/2200) + 1)/2 : .5; glow(ctx, kx, kb - H*.12, H*.16, '#a8c8ee', .05 + p*.05); }
  // quorls going down to the city, no lanterns, against the far water
  for (let i=0;i<5;i++){ const k = mo ? ((t/26000 + i*.21) % 1) : .3 + i*.12, qx = lerp(W*(.15 + i*.04), kx + (i - 2)*W*.03, k), qy = lerp(H*(.1 + i*.03), kb - H*.08, k), s = lerp(1, .45, k), f = mo ? Math.sin(t/30 + i*5) : 0;
    ctx.globalAlpha = clamp(k*8, 0, 1)*clamp((1 - k)*6, 0, 1); ctx.fillStyle = '#020306'; ctx.fillRect(qx - 3*s, qy, 6*s, .9*s); ctx.fillStyle = `rgba(150,170,210,${.25 + f*.1})`; ctx.fillRect(qx - 4*s, qy - .8*s - f*.5*s, 3.4*s, .5*s); ctx.fillRect(qx + .6*s, qy - .8*s - f*.5*s, 3.4*s, .5*s); } ctx.globalAlpha = 1;
  // mist in the cedars
  for (let i=0;i<4;i++) ell(ctx, (hash(i, 71)*1.4 - .2)*W + (mo ? Math.sin(t/7000 + i)*W*.04 : 0), H*(.76 + i*.035), W*.3, H*.025, 'rgba(120,130,150,.06)');
  vign(ctx, W, H, .55, .5); };

/* Moon's Spawn coming down on Coral, seen from far off across the plain: the rock fills a third of the sky, tilting, its hanging spires
   nearly on the keep; stone falling off its belly; dust going up in a wall where it meets the city. Tiny figures on a ridge, looking */
SCENEX.b3_c7_spawn = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.66, kx = W*.56, ms = Math.min(W*.38, H*.5);
  const st = cv._b67s = mo ? (cv._b67s ?? t) : 0, prog = mo ? clamp((t - st)/40000, 0, 1) : 1, ease = 1 - Math.pow(1 - prog, 2);
  ctx.drawImage(sceneLayer('b3:c7spawn', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#1a1c26'],[.45,'#3a3a44'],[.8,'#6a5a52'],[1,'#8a6a54']]); x.fillRect(0, 0, W, hz + 2); // a smoke-thick morning
    for (let i=0;i<6;i++) cloud(x, W*(.1 + hash(i, 4)*.9), hz*(.25 + i*.1), W*(.3 + hash(i, 5)*.25), 2 + i*.5, '#8a7a72', .1);
    glow(x, W*.1, hz*.84, W*.3, '#e8b88a', .2); // the sun, a smear low in the smoke
    b67Ridge(x, W, hz - H*.06, H*.05, 21, 'rgba(60,58,66,.8)', 9); // the mountains behind the city, where the Host was dug in
    // Coral on the horizon, small, its keep a black tooth
    x.fillStyle = '#1e1c22'; x.fillRect(W*.2, hz - H*.012, W*.68, H*.02); b67City(x, W*.22, W*.86, hz, H*.12, '#1c1a20', 33, kx);
    b67Keep(x, kx, hz - H*.01, H/240*.42, '#16141a', 0);
    x.fillStyle = vgrad(x, hz, H, [[0,'#3a3430'],[.4,'#2a2420'],[1,'#100e0c']]); x.fillRect(0, hz, W, H - hz); // the plain before it
    { const g = x.createLinearGradient(0, hz, 0, hz + H*.1); g.addColorStop(0, 'rgba(160,120,90,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, hz, W, H*.1); }
    for (let i=0;i<30;i++){ x.fillStyle = 'rgba(14,12,10,.6)'; x.fillRect(W*(.05 + hash(i, 81)*.9), hz + H*(.02 + hash(i, 82)*.08), 1 + hash(i, 83)*2, .8); } // the alliance's lines, far out on the plain
    // the near ridge, and people on it, small, looking
    x.fillStyle = '#0c0a0a'; x.beginPath(); x.moveTo(0, H*.86); x.quadraticCurveTo(W*.25, H*.8, W*.5, H*.84); x.quadraticCurveTo(W*.75, H*.88, W, H*.85); x.lineTo(W, H); x.lineTo(0, H); x.fill();
    for (let i=0;i<14;i++){ const fx = W*(.06 + i*.034 + hash(i, 91)*.02), fy = H*(.835 + Math.sin(i*.4)*.006) + 1, s = 1.3 + hash(i, 92)*.3; x.fillRect(fx - 1.6*s, fy - 5.6*s, 3.2*s, 2*s); x.fillStyle = '#0c0a0a'; x.fillRect(fx - 1*s, fy - 6*s, 2*s, 6*s); x.beginPath(); x.arc(fx, fy - 7*s, 1*s, 0, 7); x.fill(); if (hash(i, 93) > .7) x.fillRect(fx + 1.2*s, fy - 12*s, .5*s, 12*s); } // spears, one or two
  }), 0, 0, W, H);
  // the dust where it meets the city: a low wall, rising and spreading as it comes down
  const cy = hz - H*.02; for (let i=0;i<14;i++){ const p = mo ? ((t/9000 + i/14) % 1) : i/14, dx = (hash(i, 101) - .5)*W*.36*(.4 + p), r = H*(.04 + p*.1)*(.6 + ease*.6); ctx.fillStyle = `rgba(${110 + Math.round(hash(i, 102)*30)},96,86,${(.22*(1 - p)*(.4 + ease*.6)).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(kx + dx, cy - p*H*.12 - r*.3, r*1.6, r, 0, 0, 7); ctx.fill(); }
  glow(ctx, kx, cy, W*.22, '#ff8a3a', .12 + ease*.1);
  // the rock: tilted, enormous, lit from below by the burning
  const rock = b67Rock(ms, 'rgba(66,70,84,.3)'), r = Math.ceil(ms*1.5), my = lerp(H*.2, H*.33, ease) + (mo ? Math.sin(t/5000)*1.2 : 0), mx = kx - W*.03;
  ctx.save(); ctx.translate(mx, my); ctx.rotate(-.1 - ease*.04); glow(ctx, 0, 0, ms*1.3, '#9a86e0', .06); ctx.drawImage(rock, -r, -r, r*2, r*2); ctx.restore();
  // its shadow over the city, and the light under it
  { const g = ctx.createRadialGradient(kx, cy, 0, kx, cy, W*.4); g.addColorStop(0, 'rgba(0,0,0,.3)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(kx - W*.4, hz - H*.2, W*.8, H*.22); }
  // stone coming off its belly in long falls
  for (let i=0;i<16;i++){ const p = mo ? ((t/(3000 + hash(i, 111)*2500) + hash(i, 112)) % 1) : hash(i, 112), sx = mx + (hash(i, 113) - .5)*ms*1.5, sy = my + ms*(.4 + hash(i, 114)*.15), ey = cy - H*.01, yy = lerp(sy, ey, p*p); if (yy > ey) continue; ctx.strokeStyle = `rgba(20,16,20,${(.7*(1 - p*.6)).toFixed(2)})`; ctx.lineWidth = .8 + hash(i, 115)*1.2; ctx.beginPath(); ctx.moveTo(sx, yy); ctx.lineTo(sx + 1, yy - 3 - p*7); ctx.stroke(); }
  for (let i=0;i<20;i++){ const p = mo ? ((t/6000 + hash(i, 121)) % 1) : hash(i, 121), ex = kx + (hash(i, 122) - .5)*W*.3, ey = cy - p*H*.3; ctx.fillStyle = `rgba(255,${150 + Math.round(hash(i, 123)*60)},60,${(.7*(1 - p)).toFixed(2)})`; ctx.fillRect(ex + Math.sin(t/700 + i)*3*mo, ey, 1.2, 1.2); } // embers going up
  vign(ctx, W, H, .55, .45); };

/* a barrow raised on the plain at dawn, built of gifts (shields, helms, blades, whatever soldiers had), a standard at its crest, soldiers of every army standing before it in their lines, small and still.
   Only the banners and the grass move */
SCENEX.b3_c7_barrow = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.6, bx = W*.52, by = H*.66, bw = Math.min(W*.3, H*.62), bh = H*.16;
  ctx.drawImage(sceneLayer('b3:c7barrow', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#1c2236'],[.4,'#4a4a62'],[.75,'#b08a86'],[1,'#e8c4a0']]); x.fillRect(0, 0, W, hz + 2); // the first of the day, cold above
    glow(x, W*.12, hz, W*.4, '#ffd2a0', .36); glow(x, W*.12, hz, W*.06, '#fff0d8', .5); for (let i=0;i<4;i++) cloud(x, W*(.1 + hash(i, 3)*.8), hz*(.3 + i*.13), W*.3, 1.5, '#e0b0a0', .1);
    for (let i=0;i<20;i++){ x.fillStyle = `rgba(226,230,255,${(.1 + hash(i, 7)*.3).toFixed(2)})`; x.fillRect(W*.4 + hash(i, 8)*W*.6, hash(i, 9)*hz*.4, 1, 1); } // the last stars, west
    b67Ridge(x, W, hz - H*.01, H*.025, 41, 'rgba(70,64,80,.7)', 9);
    x.fillStyle = vgrad(x, hz, H, [[0,'#4a4048'],[.3,'#2e2a2e'],[1,'#0e0c0e']]); x.fillRect(0, hz, W, H - hz);
    { const g = x.createLinearGradient(0, 0, W*.7, 0); g.addColorStop(0, 'rgba(255,200,150,.16)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, hz, W, H - hz); }
    // the barrow: new earth, dark, not yet a blade of grass on it; the east on its brow
    b7Mound(x, bx, by, bw, bh, '#2a2424', 'rgba(255,190,140,.3)', 67, null);
    for (let i=0;i<120;i++){ const k = hash(i, 74), px = bx - bw*.94 + k*bw*1.88, top = by - bh*Math.pow(Math.sin(k*Math.PI), .7), py = top + 1 + Math.pow(hash(i, 75), 1.5)*(by - top - 2), kind = hash(i, 76), lit = ((px < bx ? .3 : 0) + hash(i, 77)*.4)*.6; // it is made of gifts: shields, helms, blades, a saddle, whatever soldiers had
      if (kind < .3) { x.fillStyle = `rgba(${70 + lit*120|0},${64 + lit*100|0},${62 + lit*80|0},.7)`; x.beginPath(); x.ellipse(px, py, 2.2, 1.4, 0, 0, 7); x.fill(); }
      else if (kind < .55) { x.strokeStyle = `rgba(${120 + lit*100|0},${118 + lit*90|0},${116 + lit*80|0},.5)`; x.lineWidth = .7; x.beginPath(); x.moveTo(px - 2.6, py + 1); x.lineTo(px + 2.6, py - 1 - hash(i, 78)*2); x.stroke(); }
      else if (kind < .75) { x.fillStyle = `rgba(${60 + lit*90|0},${58 + lit*80|0},${60 + lit*70|0},.9)`; x.beginPath(); x.arc(px, py, 1.4, Math.PI, 0); x.fill(); }
      else { x.fillStyle = `rgba(${70 + lit*60|0},${50 + lit*40|0},${36 + lit*30|0},.8)`; x.fillRect(px - 1.6, py - .8, 3.2, 1.6); } }
    for (let i=0;i<10;i++){ const k = .1 + hash(i, 79)*.4, px = bx - bw*.94 + k*bw*1.88, py = by - bh*Math.pow(Math.sin(k*Math.PI), .7)*.8; x.fillStyle = 'rgba(255,226,180,.7)'; x.fillRect(px, py, 1, 1); } // the dawn catching an edge here and there
    x.fillStyle = '#100c0c'; x.fillRect(bx - .8, by - bh - H*.14, 1.6, H*.14); // the standard's pole at the crest
    // the lines before it in blocks, company by company: Grey Swords nearest the barrow, then everyone; silhouettes, a spear, a helm, no faces
    for (let r=0;r<3;r++){ const yy = by + H*(.07 + r*.075), s = 1.05 + r*.4, col = r === 0 ? '#26262c' : r === 1 ? '#18161a' : '#0e0c0e', step = 4.2*s;
      for (let b=0;b<5;b++){ const c0 = W*(.06 + b*.19) + (hash(b, r + 70) - .5)*W*.03, c1 = c0 + W*(.11 + hash(b, r + 71)*.04); if (r === 0 && c1 > bx - bw*.25 && c0 < bx + bw*.25) continue;
        for (let fx0=c0, i=0; fx0<c1; fx0+=step, i++){ if (hash(i, b + r*7 + 40) < .1) continue; const fx = fx0 + (hash(i, b + r*7 + 50) - .5)*step*.45, sy = yy + (hash(i, b + r*7) - .5)*1.6*s; x.fillStyle = col; x.fillRect(fx - 1*s, sy - 5*s, 2*s, 5*s); x.fillRect(fx - 1.5*s, sy - 6.4*s, 3*s, 2*s); x.beginPath(); x.arc(fx, sy - 7.4*s, 1*s, 0, 7); x.fill();
          const k = hash(i, b + r*7 + 90); if (k > .55) x.fillRect(fx + 1.4*s, sy - 13*s, .45*s, 12*s); } } } // a spear to every other man
    for (let i=0;i<3;i++){ const fx = W*(.12 + i*.38); x.fillStyle = '#121012'; x.fillRect(fx - .5, by + H*.1 - H*.14, 1, H*.14); } // standards in the lines
    x.fillStyle = vgrad(x, H*.88, H, [[0,'rgba(8,6,8,0)'],[1,'rgba(8,6,8,.7)']]); x.fillRect(0, H*.88, W, H*.12);
  }), 0, 0, W, H);
  // the banners in the dawn wind: the wolf-grey on the barrow, the others in the lines
  const flag = (fx, fy, w, hh, col, i) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(fx, fy); for (let k=0;k<=6;k++){ const u = k/6; ctx.lineTo(fx + u*w, fy + (mo ? Math.sin(t/380 - u*4 + i)*hh*.18*u : hh*.1*u)); } for (let k=6;k>=0;k--){ const u = k/6; ctx.lineTo(fx + u*w, fy + hh + (mo ? Math.sin(t/380 - u*4 + i)*hh*.18*u : hh*.1*u)); } ctx.closePath(); ctx.fill(); };
  flag(bx + .8, by - bh - H*.14, H*.07, H*.04, '#9a9ca2', 0); ctx.fillStyle = 'rgba(240,236,228,.5)'; ctx.fillRect(bx + 3, by - bh - H*.128, 3, 2);
  [[.12, '#5a2a24'], [.5, '#2a2a3a'], [.88, '#4a4434']].forEach(([u, c], i) => flag(W*u + .5, by + H*.1 - H*.14, H*.045, H*.026, c, i + 1));
  for (let i=0;i<50;i++){ const gx = hash(i, 61)*W, gy = H*(.92 + hash(i, 62)*.1), l = 5 + hash(i, 63)*10, sw = mo ? Math.sin(t/1200 + gx*.03)*2 : 0; ctx.strokeStyle = 'rgba(16,12,14,.9)'; ctx.lineWidth = 1 + hash(i, 64); ctx.beginPath(); ctx.moveTo(gx, gy); ctx.quadraticCurveTo(gx + sw*.4, gy - l*.6, gx + sw + 1, gy - l); ctx.stroke(); }
  b2Wheel(ctx, t*mo, W*.3, hz - H*.2, W*.12, H*.04, 4, .5, 'rgba(20,16,20,.8)', 67);
  vign(ctx, W, H, .5, .5); };

/* Moon's Spawn going out over the sea at evening, small on the horizon and listing, its last light on the water; the shore close by, empty */
SCENEX.b3_c7_sea = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, ms = H*.09;
  const st = cv._b67s = mo ? (cv._b67s ?? t) : 0, prog = mo ? clamp((t - st)/90000, 0, 1) : .3;
  ctx.drawImage(sceneLayer('b3:c7sea', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#0e1222'],[.5,'#2e2c48'],[.85,'#8a6070'],[1,'#c89078']]); x.fillRect(0, 0, W, hz + 1); // the evening over the sea
    glow(x, W*.7, hz, W*.5, '#f0a070', .3); glow(x, W*.7, hz, W*.12, '#ffd8a8', .45); for (let i=0;i<3;i++) cloud(x, W*(.2 + i*.3), hz*(.5 + i*.12), W*.3, 1.4, '#c08a80', .12); // the sun going down, behind it
    for (let i=0;i<50;i++){ x.fillStyle = `rgba(226,230,255,${(.1 + hash(i, 7)*.45).toFixed(2)})`; x.fillRect(hash(i, 8)*W, hash(i, 9)*hz*.6, 1, 1); }
    x.fillStyle = 'rgba(220,170,150,.5)'; x.fillRect(0, hz - .5, W, 1); { const g = x.createLinearGradient(W*.4, 0, W, 0); g.addColorStop(0, 'rgba(255,190,140,0)'); g.addColorStop(.6, 'rgba(255,190,140,.12)'); g.addColorStop(1, 'rgba(255,190,140,0)'); x.fillStyle = g; x.fillRect(0, hz, W, H*.3); } // the sun's road on the water
    x.fillStyle = vgrad(x, hz, H, [[0,'#3a3448'],[.3,'#1e1e30'],[1,'#08080e']]); x.fillRect(0, hz, W, H - hz);
    // the shore: dark shingle, a spit going out on the left
    x.fillStyle = '#0c0a0c'; x.beginPath(); x.moveTo(0, H*.8); x.quadraticCurveTo(W*.4, H*.78, W*.7, H*.86); x.quadraticCurveTo(W*.9, H*.9, W, H*.88); x.lineTo(W, H); x.lineTo(0, H); x.fill();
    x.beginPath(); x.moveTo(0, H*.7); x.quadraticCurveTo(W*.12, H*.69, W*.2, H*.72); x.lineTo(W*.22, H*.74); x.quadraticCurveTo(W*.1, H*.76, 0, H*.78); x.fill();
    x.fillStyle = 'rgba(160,140,160,.18)'; for (let i=0;i<40;i++) x.fillRect(hash(i, 21)*W, H*(.84 + hash(i, 22)*.14), 1.4, .8); // pebbles holding the light
  }), 0, 0, W, H);
  // the water: long low swells and the rock's path of light on it
  const rx = W*lerp(.68, .72, prog), ry = hz - ms*.6 + prog*ms*.15, s = lerp(1, .8, prog);
  for (let i=0;i<60;i++){ const yy = hz + 2 + Math.pow(hash(i, 31), 1.3)*(H*.3), d = (yy - hz)/(H*.3), px = (hash(i, 32)*W + t*mo/(90 + hash(i, 33)*50)) % (W + 30) - 15, near = Math.abs(px - rx) < W*(.03 + d*.08); ctx.fillStyle = near ? `rgba(200,170,220,${(.2 + (1 - d)*.3).toFixed(2)})` : `rgba(160,150,190,${(.05 + d*.1).toFixed(2)})`; ctx.fillRect(px, yy, 3 + d*12, .6 + d*.6); }
  { const rock = b67Rock(ms), r = Math.ceil(ms*1.5); ctx.save(); ctx.translate(rx, ry); ctx.rotate(.14); ctx.scale(s, s); glow(ctx, 0, 0, ms*2.2, '#9a86e0', .1); ctx.drawImage(rock, -r, -r, r*2, r*2); ctx.restore(); // the rock, listing, going
    ctx.save(); ctx.globalAlpha = .18; ctx.translate(rx, hz*2 - ry + 2); ctx.scale(s, -s*.6); ctx.drawImage(rock, -r, -r, r*2, r*2); ctx.restore(); } // and dimly in the water
  for (let i=0;i<4;i++){ const yy = H*(.8 + i*.03), a = mo ? (Math.sin(t/1600 + i*1.7) + 1)/2 : .5; ctx.strokeStyle = `rgba(200,190,210,${(.06 + a*.12).toFixed(2)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(W*(.25 + i*.05), yy + a*2); ctx.quadraticCurveTo(W*.5, yy - 1 + a*2, W*(.75 - i*.03), yy + 3 + a*2); ctx.stroke(); } // foam along the shingle
  b2Wheel(ctx, t*mo, W*.3, hz - H*.16, W*.1, H*.03, 3, .45, 'rgba(220,214,230,.7)', 71);
  vign(ctx, W, H, .55, .5); };

/* the end of Book Three: the Fourth on a shingle shore in the first grey of morning, the sea flat and pale, the horizon empty where the rock was.
   Quiet: the swell, a few gulls, the figures' own breathing. Nothing else */
SCENEX.b3_c7_finale = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.52;
  ctx.drawImage(sceneLayer('b3:c7finale', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#2a3044'],[.5,'#6a7284'],[.85,'#b4b4b4'],[1,'#d8ccbc']]); x.fillRect(0, 0, W, hz + 1); // morning, grey, no colour yet but a little at the rim
    glow(x, W*.7, hz, W*.45, '#f0dcc0', .22); for (let i=0;i<5;i++) cloud(x, W*(.1 + hash(i, 3)*.8), hz*(.2 + i*.13), W*(.3 + hash(i, 4)*.2), 1.4, '#c8c8d0', .1);
    x.fillStyle = '#e8e4ec'; x.fillRect(W*.22, hz*.22, 1.2, 1.2); glow(x, W*.22 + .6, hz*.22 + .6, 4, '#e8e4ec', .3); // one star, going
    x.fillStyle = 'rgba(120,124,140,.7)'; x.fillRect(0, hz - .5, W, 1); // the horizon: nothing on it
    x.fillStyle = vgrad(x, hz, H, [[0,'#8a8c98'],[.2,'#5a5e6c'],[.6,'#34384a'],[1,'#1a1c26']]); x.fillRect(0, hz, W, H - hz);
    { const g = x.createLinearGradient(W*.7, 0, W*.2, 0); g.addColorStop(0, 'rgba(255,236,210,.14)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, hz, W, H*.2); }
    x.fillStyle = 'rgba(70,70,84,.6)'; x.beginPath(); x.moveTo(W*.9, hz); x.quadraticCurveTo(W*.96, hz - H*.025, W + 2, hz - H*.03); x.lineTo(W + 2, hz); x.fill(); // a headland, far
    // the shingle, wet at the water's edge
    x.fillStyle = vgrad(x, H*.74, H, [[0,'#3a3a40'],[.3,'#26262c'],[1,'#121216']]); x.beginPath(); x.moveTo(0, H*.74); x.quadraticCurveTo(W*.5, H*.76, W, H*.8); x.lineTo(W, H); x.lineTo(0, H); x.fill();
    x.fillStyle = 'rgba(200,200,214,.14)'; x.beginPath(); x.moveTo(0, H*.74); x.quadraticCurveTo(W*.5, H*.76, W, H*.8); x.lineTo(W, H*.81); x.quadraticCurveTo(W*.5, H*.775, 0, H*.755); x.fill(); // the wet band, the sky in it
    for (let i=0;i<120;i++){ const px = hash(i, 21)*W, py = H*(.78 + Math.pow(hash(i, 22), .8)*.22), r = .6 + hash(i, 23)*1.4*(py/H); x.fillStyle = hash(i, 24) > .5 ? 'rgba(150,150,160,.25)' : 'rgba(0,0,0,.3)'; x.beginPath(); x.ellipse(px, py, r*1.3, r*.8, 0, 0, 7); x.fill(); } // stones
    { const dx = W*.84, dy = H*.86; x.strokeStyle = '#1a1614'; x.lineWidth = 2; x.lineCap = 'round'; x.beginPath(); x.moveTo(dx - 16, dy); x.lineTo(dx + 14, dy - 3); x.stroke(); x.lineWidth = 1.2; x.beginPath(); x.moveTo(dx + 4, dy - 2); x.lineTo(dx + 10, dy - 8); x.stroke(); x.lineCap = 'butt'; } // driftwood
  }), 0, 0, W, H);
  // the swell coming in, slow
  for (let i=0;i<50;i++){ const yy = hz + 2 + Math.pow(hash(i, 31), 1.2)*(H*.22), d = (yy - hz)/(H*.22), px = (hash(i, 32)*W + t*mo/(140 + hash(i, 33)*60)) % (W + 30) - 15; ctx.fillStyle = `rgba(230,228,236,${(.08 + d*.12).toFixed(2)})`; ctx.fillRect(px, yy, 4 + d*14, .6 + d*.5); }
  { const a = mo ? (Math.sin(t/2400) + 1)/2 : .4; ctx.strokeStyle = `rgba(236,236,244,${(.18 + a*.2).toFixed(2)})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(0, H*(.745 - a*.006)); ctx.quadraticCurveTo(W*.5, H*(.765 - a*.006), W, H*(.8 - a*.006)); ctx.stroke(); } // the edge of the water, breathing
  b2Wheel(ctx, t*mo, W*.62, hz - H*.2, W*.14, H*.05, 3, .5, 'rgba(236,236,240,.75)', 73);
  // the Fourth, standing on the stones a little apart, looking out
  const sq = marchOrder(sceneSquad()), n = sq.length, sc = clamp(Math.min(W*.7, H)/300, .9, 1.3), gap = Math.min(34*sc, W*.74/Math.max(1, n)); // small against the sea, a little apart: nobody standing close
  sq.forEach((id, i) => { const fx = W*(W < H ? .1 : .14) + i*gap + hash(i, 131)*gap*.3, fy = H*(.85 + hash(i, 132)*.05); ell(ctx, fx, fy + .5, 7*sc, 1.6*sc, 'rgba(0,0,0,.25)'); drawFigure(ctx, id, fx, fy, sc*(.92 + (fy/H - .85)*1.6), t*mo, {phase:i*1.3, dir:1}); });
  vign(ctx, W, H, .42, .5); };

/* the alliance's hill outside Coral: tents and standards along a long crest, the slope going down to a plain, and at the plain's far edge a dark city
   by the sea with its keep. Morning (b3_c7_hill), and the same hill at dusk after, fires lit, a great many people on it standing still (b3_c7_hill_dusk) */
function b67HillPaint(x, W, H, dusk){ const hz = H*.5, kx = W*.7;
  x.fillStyle = dusk ? vgrad(x, 0, hz, [[0,'#141828'],[.45,'#3a3448'],[.8,'#8a5a50'],[1,'#c07a58']]) : vgrad(x, 0, hz, [[0,'#3a4a62'],[.55,'#8a98a8'],[1,'#c8c4b8']]); x.fillRect(0, 0, W, hz + 2);
  glow(x, dusk ? W*.1 : W*.2, hz*(dusk ? .96 : .5), W*.4, dusk ? '#ff9a60' : '#f4ecd8', dusk ? .3 : .3); for (let i=0;i<5;i++) cloud(x, W*(.1 + hash(i, 3)*.85), hz*(.2 + i*.12), W*(.28 + hash(i, 4)*.2), 1.6, dusk ? '#c08070' : '#e8eaf0', .12);
  if (dusk) for (let i=0;i<40;i++){ x.fillStyle = `rgba(226,230,255,${(.1 + hash(i, 7)*.4).toFixed(2)})`; x.fillRect(W*.3 + hash(i, 8)*W*.7, hash(i, 9)*hz*.45, 1, 1); }
  x.fillStyle = dusk ? 'rgba(60,50,70,.9)' : 'rgba(110,120,140,.8)'; x.fillRect(W*.45, hz - 1.5, W*.55, 2.5); // the sea, a strip of it beyond the city
  b67Ridge(x, W*.5, hz + 1, H*.02, 51, dusk ? 'rgba(50,44,56,.9)' : 'rgba(100,104,116,.85)', 8); // low country on the left
  b67City(x, W*.5, W*.92, hz + 1, H*.08, dusk ? '#1a1620' : '#3a3c46', 57, kx); b67Keep(x, kx, hz - H*.01, H/240*.32, dusk ? '#14121a' : '#32343e', dusk ? .4 : 0);
  x.fillStyle = dusk ? vgrad(x, hz, H, [[0,'#3a2e30'],[1,'#141012']]) : vgrad(x, hz, H, [[0,'#8a8a7c'],[.4,'#6a6c5a'],[1,'#4a4c3c']]); x.fillRect(0, hz, W, H - hz); // the plain
  for (let i=0;i<40;i++){ x.fillStyle = dusk ? 'rgba(20,14,14,.55)' : 'rgba(40,40,30,.4)'; x.fillRect(W*hash(i, 21), hz + H*(.01 + Math.pow(hash(i, 22), 2)*.12), 2 + hash(i, 23)*5, .8); } // wheel-tracks, a trampled stretch, the dead the burial parties have not reached are not drawn
  // the hill: a long crest across the near ground, rising to the right
  x.fillStyle = dusk ? '#1a1416' : '#2a2e22'; x.beginPath(); x.moveTo(0, H*.74); x.quadraticCurveTo(W*.35, H*.66, W*.7, H*.64); x.quadraticCurveTo(W*.9, H*.63, W + 2, H*.65); x.lineTo(W + 2, H); x.lineTo(0, H); x.fill();
  x.strokeStyle = dusk ? 'rgba(255,170,110,.25)' : 'rgba(230,236,220,.35)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, H*.74); x.quadraticCurveTo(W*.35, H*.66, W*.7, H*.64); x.quadraticCurveTo(W*.9, H*.63, W + 2, H*.65); x.stroke();
  const crest = u => H*(.74 - .1*Math.sin(Math.min(1, u/.75)*Math.PI/2)) + (u > .75 ? (u - .75)*H*.04 : 0);
  for (let i=0;i<16;i++){ const u = .04 + i*.062 + hash(i, 31)*.02, tx = W*u, ty = crest(u) + 2, s = 1 + hash(i, 32)*.4; x.fillStyle = dusk ? '#0e0a0c' : (i%3 ? '#8a8270' : '#6a6656'); x.beginPath(); x.moveTo(tx - 6*s, ty); x.lineTo(tx, ty - 6*s); x.lineTo(tx + 6*s, ty); x.fill(); if (!dusk) { x.fillStyle = 'rgba(0,0,0,.25)'; x.beginPath(); x.moveTo(tx, ty - 6*s); x.lineTo(tx + 6*s, ty); x.lineTo(tx + 1.5*s, ty); x.fill(); } } // tents along the crest
  for (let i=0;i<5;i++){ const u = .1 + i*.2, tx = W*u + 4, ty = crest(u) + 2; x.fillStyle = dusk ? '#0a0808' : '#2a2620'; x.fillRect(tx - .5, ty - H*.09, 1, H*.09); } // standards
  for (let i=0;i<(dusk ? 60 : 30); i++){ const u = hash(i, 41), fx = W*u, fy = crest(u) + 3 + hash(i, 42)*H*.03, s = .9 + hash(i, 43)*.4; x.fillStyle = dusk ? '#0a0708' : '#24261c'; x.fillRect(fx - 1*s, fy - 5*s, 2*s, 5*s); x.beginPath(); x.arc(fx, fy - 6*s, .9*s, 0, 7); x.fill(); } // people; at dusk, a great many, still
  x.fillStyle = vgrad(x, H*.86, H, [[0,'rgba(0,0,0,0)'],[1, dusk ? 'rgba(6,4,6,.7)' : 'rgba(10,12,8,.4)']]); x.fillRect(0, H*.86, W, H*.14); }
const b67Hill = dusk => (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1;
  ctx.drawImage(sceneLayer('b3:c7hill' + (dusk ? 'd' : ''), W, H, (x, W, H) => b67HillPaint(x, W, H, dusk)), 0, 0, W, H);
  const crest = u => H*(.74 - .1*Math.sin(Math.min(1, u/.75)*Math.PI/2)) + (u > .75 ? (u - .75)*H*.04 : 0);
  for (let i=0;i<5;i++){ const u = .1 + i*.2, fx = W*u + 4.5, fy = crest(u) + 2 - H*.09, w = H*.04, hh = H*.022, c = ['#5a2a24', '#2a2a3a', '#7a7a80', '#4a4434', '#3a2a4a'][i]; ctx.fillStyle = dusk ? shade(c, -.5) : c; ctx.beginPath(); ctx.moveTo(fx, fy); for (let k=0;k<=5;k++){ const v = k/5; ctx.lineTo(fx + v*w, fy + (mo ? Math.sin(t/360 - v*4 + i)*hh*.2*v : 0)); } for (let k=5;k>=0;k--){ const v = k/5; ctx.lineTo(fx + v*w, fy + hh + (mo ? Math.sin(t/360 - v*4 + i)*hh*.2*v : 0)); } ctx.closePath(); ctx.fill(); }
  if (dusk) for (let i=0;i<7;i++){ const u = .08 + i*.13 + hash(i, 51)*.03, fx = W*u, fy = crest(u) + H*.04, fl = .8 + (mo ? Math.sin(t/130 + i*2)*.12 + Math.sin(t/51 + i)*.08 : 0); glow(ctx, fx, fy, H*.05*fl, '#ff8a3a', .35*fl); ctx.fillStyle = `rgba(255,210,140,${.85*fl})`; ctx.fillRect(fx - 1, fy - 2, 2, 2); } // fires, small, along the hill
  for (let i=0;i<40;i++){ const gx = hash(i, 61)*W, gy = H*(.92 + hash(i, 62)*.1), l = 4 + hash(i, 63)*9, sw = mo ? Math.sin(t/1100 + gx*.03)*2 : 0; ctx.strokeStyle = dusk ? 'rgba(14,10,12,.9)' : 'rgba(40,44,30,.9)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.quadraticCurveTo(gx + sw*.4, gy - l*.6, gx + sw + 1, gy - l); ctx.stroke(); }
  if (!dusk) b2Wheel(ctx, t*mo, W*.4, H*.2, W*.14, H*.05, 4, .5, 'rgba(30,30,36,.8)', 59);
  vign(ctx, W, H, dusk ? .55 : .4, .5); };
SCENEX.b3_c7_hill = b67Hill(false); // over the writer's stand-in (drawPlain)
SCENEX.b3_c7_hill_dusk = b67Hill(true);

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Three's cold ground ----------------
   weapons and armour 200×150, trinkets 240×130, a slate-blue radial ground; the same flat shapes and single highlight as Book Two's.
   Anything uncanny carries a slow shimmer. Nothing of Whiskeyjack's: his things went into the Spawn */
function b67Item(key, label, body, trinket){ const [w, h] = trinket ? [240, 130] : [200, 150], id = 'c7-' + key.replace(/[^a-z0-9]/g, '');
  if (!trinket) body = `<g transform="translate(-20 10)">${body}</g>`;
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><style>@keyframes c7-sh{0%,100%{opacity:.2}50%{opacity:.65}}@keyframes c7-shh{0%,100%{opacity:.05}50%{opacity:.16}}.c7-sh{animation:c7-sh 4.5s ease-in-out infinite}.c7-shh{animation:c7-shh 4.5s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.c7-sh,.c7-shh{animation:none}}</style><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="${trinket ? .66 : .62}"><stop offset="0" stop-color="${trinket ? '#34404c' : '#36404a'}"></stop><stop offset="1" stop-color="#0a0d11"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
const B67_DRAW = {
  /* a Seerdomin's grey mail: a long shirt of small dull rings, short sleeves, the hem dagged; a grey cold coming off it */
  greymail: [false, '<ellipse cx="120" cy="66" rx="70" ry="54" fill="#b8d0e8" opacity=".05"/><path d="M84 18 L104 12 Q120 20 136 12 L156 18 L182 36 L172 58 L158 50 L160 108 L150 104 L140 110 L130 104 L120 110 L110 104 L100 110 L90 104 L80 108 L82 50 L68 58 L58 36 Z" fill="#646a74" stroke="#1c1e22" stroke-width="2" stroke-linejoin="round"/>'
    + '<path d="M104 12 Q120 26 136 12" fill="none" stroke="#2a2c32" stroke-width="4"/>' + [24,32,40,48,56,64,72,80,88,96].map((y, i) => `<path d="M${i < 3 ? 70 : 84} ${y} L${i < 3 ? 170 : 156} ${y}" stroke="#8a909a" stroke-width="2.2" stroke-dasharray="2.2 1.6" opacity="${(.75 - i*.04).toFixed(2)}"/>`).join('')
    + '<path d="M86 22 Q96 18 104 16" stroke="#d8e0ea" stroke-width="2" fill="none" opacity=".55"/><path d="M84 52 L90 100" stroke="#e0e8f0" stroke-width="1.4" opacity=".25"/><path d="M150 54 L156 104" stroke="#14161a" stroke-width="3" opacity=".5"/><rect x="82" y="62" width="76" height="6" fill="#2a2620"/><rect x="116" y="61" width="8" height="8" fill="#8a8a90"/>'],
  /* a K'ell Hunter's blade: the long pale sword that grew from its wrist, taken off and bound with rope to make a grip a man can hold */
  khellblade: [false, '<g transform="translate(18 -6)"><path d="M34 112 Q90 58 196 22 Q140 66 52 120 Z" fill="#c8c6bc"/><path d="M34 112 Q90 58 196 22" stroke="#f0eee4" stroke-width="1.6" fill="none"/><path d="M52 120 Q130 72 196 22" stroke="#7a786e" stroke-width="1.4" fill="none"/>'
    + '<path d="M96 80 Q120 64 150 50" stroke="#e8e6dc" stroke-width="3" opacity=".3" fill="none"/><path d="M20 120 L44 106 L54 120 L30 134 Z" fill="#8a847a"/><path d="M18 122 L46 106 M22 128 L50 112 M26 133 L54 117" stroke="#6a4a2a" stroke-width="3"/><path d="M16 124 Q10 132 14 140" stroke="#6a4a2a" stroke-width="2" fill="none"/></g>'],
  /* a chip of coral-stone from the city: pale, porous, pinkish, a hole worn through it and a thong in the hole */
  coralstone: [true, '<ellipse cx="120" cy="70" rx="60" ry="40" fill="#e8c8c0" opacity=".06"/><path d="M80 22 Q120 36 160 22" stroke="#4a3626" stroke-width="2.2" fill="none"/><path d="M120 33 L120 48" stroke="#4a3626" stroke-width="2.2"/>'
    + '<path d="M90 70 Q92 50 112 46 Q134 42 148 54 Q160 66 154 86 Q146 104 120 106 Q96 104 90 88 Z" fill="#b8a09a"/><path d="M96 62 Q106 50 124 48" stroke="#ddc8c2" stroke-width="2.4" fill="none"/><path d="M148 70 Q150 92 128 102" stroke="#6a5652" stroke-width="2.4" fill="none"/>'
    + '<circle cx="120" cy="56" r="5" fill="#1a1414"/>' + [[104,74,2.4],[112,86,1.6],[132,72,2],[140,88,2.6],[124,94,1.8],[100,90,1.4],[146,66,1.4],[118,70,1.2]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#5a4844"/>`).join('')],
  /* a shard of the black stone, picked up on the shore after the Spawn went out: basalt, glassy where it broke, a light in it that is not quite there */
  spawnshard: [true, '<ellipse cx="120" cy="68" rx="56" ry="36" fill="#9a86e0" opacity=".1" class="c7-shh"/><path d="M84 96 L98 36 L130 22 L158 52 L150 100 L116 110 Z" fill="#141218"/><path d="M98 36 L130 22 L122 62 Z" fill="#2a2632"/><path d="M130 22 L158 52 L122 62 Z" fill="#1e1b26"/>'
    + '<path d="M98 36 L130 22" stroke="#6a6280" stroke-width="1.6"/><path d="M122 62 L116 110 M122 62 L84 96 M122 62 L150 100" stroke="#060508" stroke-width="1.4"/><path d="M106 70 l4 -6 l3 7 M132 78 l3 -8 l5 5" stroke="#b8a8f0" stroke-width="1.6" fill="none" class="c7-sh"/>'],
  /* a Grey Sword's wolf token: a disc of grey pewter, the boar beaten flat and a wolf's head cut over it */
  wolftoken: [true, '<ellipse cx="120" cy="66" rx="56" ry="40" fill="#c8d0d8" opacity=".06"/><path d="M84 20 Q120 32 156 20" stroke="#4a3a2a" stroke-width="2" fill="none"/><circle cx="120" cy="70" r="34" fill="#7a7e84"/><circle cx="120" cy="70" r="34" fill="none" stroke="#3e4248" stroke-width="4"/>'
    + '<path d="M104 78 L108 56 L114 66 L120 54 L126 66 L134 62 L140 72 L132 80 L122 92 L110 88 Z" fill="#c8ccd2"/><circle cx="124" cy="70" r="2" fill="#24262a"/><path d="M94 56 Q104 44 120 42" stroke="#e0e4ea" stroke-width="2" fill="none" opacity=".6"/><circle cx="120" cy="34" r="4" fill="#5a5e64"/>'],
  /* anything else the chapter hands out: a bundle in a soldier's square of oiled cloth, tied with cord */
  bundle: [true, '<ellipse cx="120" cy="70" rx="60" ry="38" fill="#b8d0e8" opacity=".05"/><path d="M78 56 Q120 40 162 56 L156 100 Q120 112 84 100 Z" fill="#6a6250"/><path d="M78 56 Q120 40 162 56 Q120 68 78 56 Z" fill="#847a64"/><path d="M120 50 L120 106 M80 76 Q120 88 160 76" stroke="#2a2218" stroke-width="2.6" fill="none"/><path d="M114 46 Q120 40 126 46" stroke="#2a2218" stroke-width="2.6" fill="none"/><path d="M88 60 Q104 54 118 52" stroke="#b0a68a" stroke-width="1.6" fill="none" opacity=".6"/>'],
};
const B67_ITEMS = {b3_c7_greymail:'greymail', b3_c7_hunterblade:'khellblade'}; // the writer's key -> a drawing above; a b3_c7_ item nobody mapped gets the nearest by its name
function b67ItemsArt(){ const gear = Object.assign({}, (typeof B3CH7 !== 'undefined' && B3CH7 && B3CH7.gear) || {}), items = typeof ITEMS !== 'undefined' ? ITEMS : {};
  const keys = new Set(Object.keys(B67_ITEMS)); Object.keys(items).concat(Object.keys(gear)).forEach(k => { if (/^b3_c7_/.test(k)) keys.add(k); });
  keys.forEach(k => { if (ART['item/' + k] && !B67_ITEMS[k]) return; const it = gear[k] || items[k] || {}, nm = String(it.name || k), hay = k + ' ' + nm;
    const d = B67_ITEMS[k] || (/mail|hauberk|shirt|seerdomin/i.test(hay) ? 'greymail' : /k.?ell|che.?malle|hunter|blade|sword/i.test(hay) ? 'khellblade' : /spawn|basalt|shard|black stone/i.test(hay) ? 'spawnshard' : /coral|stone|chip/i.test(hay) ? 'coralstone' : /wolf|grey sword|token|pewter/i.test(hay) ? 'wolftoken' : 'bundle'), [tr, body] = B67_DRAW[d] || B67_DRAW.bundle;
    b67Item(k, nm.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'), body, it.slot ? it.slot === 'trinket' : tr); }); }
b67ItemsArt();
