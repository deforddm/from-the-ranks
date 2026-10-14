/* ============ Book Three, Chapter 2 art: The Rhivi Plain ============
   Figures (FIGX) in the ~32px frame of 18/47b/60d, lit from the left; the plain as ground (TILEX.b3_c2_plain / _night); three
   backdrops (SCENEX): the herds and the two armies under a spring sky, the river in spate at dusk, and what a K'ell Hunter leaves;
   and the chapter's kit (ART['item/b3_c2_*']) on Book Three's cold ground. Drawn the way 47b, 49b and 60d draw. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* a Betakullid: one of the Pannion's horse-soldiers, on foot — a quilted riding coat split to the knee, a peaked helm with cheek-guards
     and a black horsetail, tall boots, a small round buckler and a curved horseman's sabre; the Domin's dun and olive, like the Beklites */
  b3_c2_betakullid(ctx, h, t, o){ const c = b2Pick(o, [['#6e6446', '#2a2416'], ['#645c42', '#262016'], ['#74684a', '#2e2618']]), sw = o.still ? 0 : Math.sin(t/520 + (o.phase||0));
    ctx.save(); B2F.grow(ctx, 1, 1.04);
    B2F.line(ctx, '#0e0c0a', 1.5, [[-1.4, -17.6], [-4.4 + sw*.5, -15.6], [-7 + sw, -11.6], [-8 + sw*1.3, -7]]); B2F.line(ctx, '#2a2420', .6, [[-2, -17], [-6.4 + sw, -11.2]]); // the horsetail off the helm, behind
    h.legs('#2a241c'); ctx.fillStyle = '#1e1812'; ctx.fillRect(-4.7, 6.6, 3.8, 6.4); ctx.fillRect(.9, 6.6, 3.8, 6.4); ctx.fillStyle = 'rgba(200,180,140,.18)'; ctx.fillRect(-4.7, 6.6, 1, 6); // tall riding boots
    poly(ctx, [[-6.4,-6],[6.4,-6],[7.4,9],[1.2,9],[0,5.6],[-1.2,9],[-7.4,9]], h.armor(c[0], c[1])); // the quilted coat, split for the saddle
    ctx.strokeStyle = 'rgba(0,0,0,.32)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<6;i++){ ctx.moveTo(-6.6 + i*.1, -3.6 + i*2.2); ctx.lineTo(6.8 - i*.1, -3.6 + i*2.2); } for (let i=0;i<5;i++){ ctx.moveTo(-4.8 + i*2.4, -6); ctx.lineTo(-5.2 + i*2.6, 8.6); } ctx.stroke(); // the quilting
    poly(ctx, [[-5.4,-6],[5.4,-6],[5,-1.6],[-5,-1.6]], h.armor('#5a5444', '#1e1c16')); ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let i=0;i<5;i++) ctx.fillRect(-4.6 + i*2, -5.6, .5, 3.8); // a lamellar collar-piece over the chest
    ctx.fillStyle = '#2a2016'; ctx.fillRect(-6.8, 2.4, 13.6, 1.3); ell(ctx, 0, 3, .9, .7, '#8a7a5a'); // belt
    h.head('#9a7a5c', 4.3, -11.2); h.look('rgba(22,14,10,.88)', -11.4);
    ctx.fillStyle = '#4a4436'; ctx.fillRect(-5, -12, 2.4, 5.6); ctx.fillRect(3, -12, 1.8, 4.2); // cheek-guards
    ctx.fillStyle = h.armor('#6a6656', '#22201a'); ctx.beginPath(); ctx.moveTo(-5.2, -11.8); ctx.quadraticCurveTo(-4.8, -16.4, 0, -18.8); ctx.quadraticCurveTo(4.8, -16.4, 5.2, -11.8); ctx.closePath(); ctx.fill(); ctx.fillRect(-5.6, -12.6, 11.2, 1.2); // the peaked helm
    ctx.fillStyle = 'rgba(255,248,230,.22)'; ctx.fillRect(-3.4, -16.4, 1, 3.4); ell(ctx, 0, -18.8, .9, .7, '#8a8470');
    ctx.save(); ctx.translate(-8.4, .6); ctx.beginPath(); ctx.arc(0, 0, 4.4, 0, 7); ctx.fillStyle = h.armor('#6a5a3e', '#1e180e'); ctx.fill(); ctx.strokeStyle = '#141008'; ctx.lineWidth = .8; ctx.stroke(); ell(ctx, -.4, -.4, 1.3, 1.3, '#8e8670'); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.arc(0, 0, 3, 0, 7); ctx.stroke(); ctx.restore(); // the buckler
    ctx.strokeStyle = '#2a2420'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(6.6, 2); ctx.quadraticCurveTo(12.4, -2.6, 11.4, -12.6); ctx.stroke(); ctx.strokeStyle = '#c4c0b2'; ctx.lineWidth = 1.3; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,250,.5)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(7.2, 1.2); ctx.quadraticCurveTo(12, -2.8, 11, -12); ctx.stroke(); // the sabre
    B2F.line(ctx, '#3a2a18', 1.7, [[5.6, 4.6], [7, 1.6]]); B2F.line(ctx, '#8a7a5a', 1.1, [[5, 1.2], [8.8, 2.6]]);
    ctx.restore(); },
  /* a Betakullid archer: the same coat and peaked helm, no buckler, a short horse-bow drawn and a quiver at the hip */
  b3_c2_betabow(ctx, h, t, o){ const c = b2Pick(o, [['#6a6044', '#282214'], ['#706448', '#2c2416']]); ctx.save(); B2F.grow(ctx, .98, 1.02);
    h.legs('#2a241c'); ctx.fillStyle = '#1e1812'; ctx.fillRect(-4.7, 6.6, 3.8, 6.4); ctx.fillRect(.9, 6.6, 3.8, 6.4);
    poly(ctx, [[-6.2,-6],[6.2,-6],[7.2,9],[1.2,9],[0,5.6],[-1.2,9],[-7.2,9]], h.armor(c[0], c[1])); ctx.strokeStyle = 'rgba(0,0,0,.32)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<6;i++){ ctx.moveTo(-6.4, -3.6 + i*2.2); ctx.lineTo(6.6, -3.6 + i*2.2); } ctx.stroke();
    ctx.fillStyle = '#2a2016'; ctx.fillRect(-6.6, 2.4, 13.2, 1.3); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-7.8, -1, 2.4, 7.6); ctx.fillStyle = '#d8ccb0'; for (let i=0;i<3;i++) ctx.fillRect(-7.6 + i*.8, -2.6, .5, 1.8); // the quiver
    h.head('#9a7a5c', 4.3, -11.2); h.look('rgba(22,14,10,.88)', -11.4); ctx.fillStyle = '#4a4436'; ctx.fillRect(-5, -12, 2.4, 5); ctx.fillStyle = h.armor('#6a6656', '#22201a'); ctx.beginPath(); ctx.moveTo(-5.2, -11.8); ctx.quadraticCurveTo(-4.8, -16.4, 0, -18.4); ctx.quadraticCurveTo(4.8, -16.4, 5.2, -11.8); ctx.closePath(); ctx.fill(); ctx.fillRect(-5.6, -12.6, 11.2, 1.2); ctx.fillStyle = 'rgba(255,248,230,.22)'; ctx.fillRect(-3.4, -16, 1, 3);
    B2F.bow(ctx, 8.6, -12, 6); B2F.line(ctx, '#d8c8a8', .6, [[1, -3], [8.6, -3]]); poly(ctx, [[8.4, -3.8], [10.4, -3], [8.4, -2.2]], '#b8b4a8'); B2F.line(ctx, h.armor(c[0], c[1]), 2.2, [[3, -4], [8, -3.4]]); // drawn, an arrow on the string
    ctx.restore(); },
  /* a Betakullid captain: taller, scale over the coat, a crest of black horsehair, a long heavy lance couched for foot-work */
  b3_c2_betacap(ctx, h, t, o){ const sw = o.still ? 0 : Math.sin(t/520 + (o.phase||0)); ctx.save(); B2F.grow(ctx, 1.1, 1.1);
    B2F.line(ctx, '#4a3a24', 1.6, [[-6, 10], [12, -24]]); poly(ctx, [[12.6, -25.4], [10.4, -20.4], [13.4, -21.4]], '#c8c4b8'); ctx.fillStyle = '#5a1a14'; ctx.fillRect(9.6, -20, 2.4, 1.4); // the lance, a red rag under the head
    B2F.line(ctx, '#0e0c0a', 1.8, [[0, -19.4], [-3 + sw*.5, -19.6], [-6.4 + sw, -16], [-8.4 + sw*1.3, -10]]);
    h.legs('#2a241c'); ctx.fillStyle = '#1e1812'; ctx.fillRect(-4.7, 6.6, 3.8, 6.4); ctx.fillRect(.9, 6.6, 3.8, 6.4);
    poly(ctx, [[-6.8,-6],[6.8,-6],[7.8,9.4],[1.2,9.4],[0,5.6],[-1.2,9.4],[-7.8,9.4]], h.armor('#5a5038', '#1e1a10'));
    ctx.save(); poly(ctx, [[-6.8,-6],[6.8,-6],[7.2,3],[-7.2,3]]); ctx.clip(); b2Scales(ctx, -6.8, 7.2, -5.8, 6, 1.9, '#8a8268', '#3a362a'); ctx.restore(); // scale over the chest
    ctx.fillStyle = '#5a1a14'; ctx.fillRect(-7, 3, 14, 1.6); ell(ctx, 0, 3.8, 1, .8, '#c9a44a'); // a red sash: rank
    poly(ctx, [[-8.6,-7],[-3.6,-7.6],[-3.2,-3],[-8.2,-2.6]], h.armor('#7a7460', '#24221a')); poly(ctx, [[8.6,-7],[3.6,-7.6],[3.2,-3],[8.2,-2.6]], h.armor('#5a5646', '#1a1812'));
    h.head('#94765a', 4.4, -11.2); h.look('rgba(22,14,10,.9)', -11.4); poly(ctx, [[-3.2,-9.4],[4.4,-9.4],[3.8,-7],[1.4,-5.8],[-1.6,-6.2],[-3,-7.6]], '#1a120c'); // a black beard
    ctx.fillStyle = '#4a4436'; ctx.fillRect(-5, -12, 2.4, 5.6); ctx.fillStyle = h.armor('#7a7462', '#26241c'); ctx.beginPath(); ctx.moveTo(-5.4, -11.8); ctx.quadraticCurveTo(-5, -16.8, 0, -19.4); ctx.quadraticCurveTo(5, -16.8, 5.4, -11.8); ctx.closePath(); ctx.fill(); ctx.fillRect(-5.8, -12.6, 11.6, 1.3); ctx.fillStyle = '#c9a44a'; ctx.fillRect(-5.8, -12.6, 11.6, .6);
    ctx.fillStyle = 'rgba(255,248,230,.25)'; ctx.fillRect(-3.4, -16.8, 1, 3.6);
    ctx.restore(); },
  /* a bhederin: the Rhivi's great plains beast — a bison's hump and mane, short hooked horns, a low heavy head; grazing, the tail switching */
  b3_c2_bhederin(ctx, h, t, o){ const ph = o.phase || 0, c = b2Pick(o, [['#5a4230', '#22160e'], ['#4a3626', '#1a120c'], ['#644a34', '#2a1c12'], ['#3e2e22', '#140e0a']]), st = o.still ? 0 : t;
    const graze = (Math.sin(st/1700 + ph*2.3) + 1)/2, hd = graze*3.2, sw = Math.sin(st/430 + ph*3), chew = Math.sin(st/160 + ph)*.25*graze;
    ctx.save(); B2F.grow(ctx, 1.3, 1.3);
    ctx.fillStyle = shade(c[1], -.1); ctx.fillRect(-9.4, 3, 2, 9.6); ctx.fillRect(4.2, 3, 2.2, 9.6); ctx.fillStyle = '#0c0806'; ctx.fillRect(-9.5, 12, 2.2, 1); ctx.fillRect(4.1, 12, 2.4, 1); // the far legs
    B2F.line(ctx, c[1], .9, [[-12.4, -1.6], [-13.2 + sw*.4, 2.6], [-12.8 + sw*1.4, 6.6]]); ell(ctx, -12.8 + sw*1.4, 7.4, .9, 1.5, '#140c08'); // the tail, a tuft at the end
    ctx.beginPath(); ctx.moveTo(-12.6, -1.8); ctx.quadraticCurveTo(-12.4, -6.4, -6.4, -6.6); ctx.quadraticCurveTo(-1, -7, 2, -10.6); ctx.quadraticCurveTo(5.6, -13, 8.4, -9.4); ctx.lineTo(9.4, 3.6); ctx.quadraticCurveTo(3, 5.6, -2, 4.4); ctx.quadraticCurveTo(-8, 5.2, -11, 3.6); ctx.quadraticCurveTo(-13.2, 1.6, -12.6, -1.8); ctx.closePath(); // the body: low behind, the hump high over the shoulders
    ctx.fillStyle = h.armor(c[0], c[1]); ctx.fill();
    ctx.save(); ctx.clip(); ctx.fillStyle = shade(c[1], -.25); ctx.beginPath(); ctx.moveTo(-1, -12); ctx.quadraticCurveTo(-.6, -2, -1.6, 6); ctx.lineTo(12, 6); ctx.lineTo(12, -14); ctx.closePath(); ctx.fill(); // the shaggy forequarters, darker
    ctx.strokeStyle = 'rgba(255,230,190,.16)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i=0;i<9;i++){ const sx = -.4 + i*1.1; ctx.moveTo(sx, -10.6 + Math.abs(i - 4)*.5); ctx.quadraticCurveTo(sx - .8, -5, sx - .2, 1); } ctx.stroke(); ctx.restore(); // the mane's long hair, lit
    ctx.fillStyle = 'rgba(255,236,200,.16)'; ctx.beginPath(); ctx.moveTo(-11.6, -3); ctx.quadraticCurveTo(-8, -6.2, -2, -6.6); ctx.quadraticCurveTo(1, -9, 3.4, -11.2); ctx.lineTo(3.6, -10.2); ctx.quadraticCurveTo(-1, -6, -7, -5.2); ctx.closePath(); ctx.fill(); // light along the back
    poly(ctx, [[-1.6, 3.6], [1.6, 4.6], [1, 8.4], [-.6, 9.2], [-2, 6.4]], shade(c[1], -.3)); // the beard of hair hanging off the chest
    ctx.fillStyle = h.armor(c[0], c[1]); ctx.fillRect(-7.8, 3, 2.2, 9.6); ctx.fillStyle = shade(c[1], -.2); ctx.fillRect(2.6, 2.4, 2.6, 10.2); ell(ctx, 3.9, 4, 2.2, 2.4, shade(c[1], -.25)); ctx.fillStyle = '#0c0806'; ctx.fillRect(-7.9, 12, 2.4, 1); ctx.fillRect(2.5, 12, 2.8, 1); // the near legs, shaggy at the top
    ctx.save(); ctx.translate(7.6, -3.4); ctx.rotate(hd*.12); // the head, low, swinging down to the grass
    ell(ctx, 3.2, 2.4, 3.6, 3.2, shade(c[1], -.2)); ell(ctx, 5.6, 4.4 + chew, 2.2, 1.8, shade(c[1], -.35)); ell(ctx, 6.8, 4.2 + chew, .4, .35, '#060404'); // the great head, the muzzle
    ell(ctx, 2.2, -.2, 2.8, 2.2, shade(c[1], -.3)); ctx.strokeStyle = 'rgba(255,230,190,.14)'; ctx.lineWidth = .4; ctx.beginPath(); for (let i=0;i<4;i++){ ctx.moveTo(.6 + i*1.1, -1.4); ctx.lineTo(.2 + i*1.1, 1.6); } ctx.stroke(); // the topknot of hair between the horns
    ell(ctx, 4.4, 1.4, .55, .5, '#0a0604'); ctx.fillStyle = 'rgba(255,240,220,.45)'; ctx.fillRect(4.2, 1.2, .3, .3); // an eye, small in all that hair
    B2F.line(ctx, '#c8bca0', .9, [[3, -.6], [4.6, -1.6], [5, -3.2], [4.2, -4]]); B2F.line(ctx, '#a89c84', .8, [[1.2, -.8], [.6, -2.4], [1.4, -3.4]]); // short horns, hooked up and in
    ctx.restore();
    ctx.restore(); },
  /* a Rhivi child: small, quick, barefoot; a hide shift, a bead loop, black hair tied up; a switch for driving calves, or nothing */
  b3_c2_child(ctx, h, t, o){ const c = b2Pick(o, [['#9a7a52', '#3e2a16'], ['#86663e', '#30200e'], ['#a8885e', '#463018']]), hair = b2Pick(o, ['#0e0a08', '#140e0a', '#1a120c']), k = Math.abs(Math.round((o.phase||0)*7)) % 3;
    ctx.save(); ctx.scale(.64, .64); ctx.translate(0, 7.3);
    ctx.fillStyle = '#7a5a40'; ctx.fillRect(-3.8, 5, 2.6, 8); ctx.fillRect(1.2, 5, 2.6, 8); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-3.8, 11.4, 2.6, 1.6); ctx.fillRect(1.2, 11.4, 2.6, 1.6); // bare legs
    poly(ctx, [[-5,-6],[5,-6],[6.2,7.4],[-6.2,7.4]], h.armor(c[0], c[1])); ctx.fillStyle = 'rgba(230,214,180,.55)'; for (let i=0;i<6;i++) ctx.fillRect(-5.6 + i*2.2, 7, .5, 1.4); // a hide shift, fringed
    ctx.fillStyle = '#5a3a20'; ctx.fillRect(-5.2, 1.6, 10.4, 1); B3F.beads(ctx, 5, -5.2, 2.6);
    h.head('#8e6c4c', 4.5, -11.2); h.look('rgba(20,12,8,.9)', -11.4);
    B2F.cap(ctx, hair, 4.7, -12.4, .95, 2.05); ell(ctx, -1.6, -16.8, 1.8, 1.4, hair); ctx.fillStyle = '#b8402a'; ctx.fillRect(-2.6, -15.8, 2, .8); // hair up in a knot, a red tie
    if (k === 1) { ctx.fillStyle = 'rgba(232,228,214,.75)'; ctx.fillRect(-4.4, -12.6, 8.8, 1.6); h.look('rgba(20,12,8,.9)', -12.2); } // a spirit-mark, in play
    if (k !== 2) B2F.line(ctx, '#7a5a36', 1, [[5.6, 4], [9.6, -9 + (o.still ? 0 : Math.sin(t/300 + (o.phase||0))*.8)]]); // the calf-switch
    ctx.restore(); },
});

/* ---------------- ground: TILEX.b3_c2_plain — the Rhivi plain in spring, the rivers up ----------------
   '.' short grass and spring flowers, ',' long grass, '~' river in flood (blocks), '-' ford, '#' rock (blocks), 'W' wagon, 'h' herd,
   '=' a Rhivi hide tent, 'F' fire; anything else is grass with Book One's exit arrows. N = dusk/night. */
const b3c2Dep = c => c === '~' ? 2 : c === '-' ? 1 : 0, b3c2W = c => c === '~' || c === '-';
function b3c2Plain(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y);
  const P = N ? {g:'#1c261e', gL:'#2a362a', blade:'#34443a', bladeL:'#46584a', tall:'#2a3a30', tallL:'#3e5244', head:'#4a4a3a', flw:['#5a5a74', '#6a6a7a', '#4e5a6a'], soil:'#1a1a1c', rock:'#2e3036', rockL:'#454852', rockD:'#141518', lichen:'rgba(90,110,100,.3)', lit:'170,184,220', wetRGB:'6,8,12', w0:'#2c343e', w1:'#1a222a', w2:'#0c1218', glint:'rgba(160,180,225,.2)', lip:'rgba(150,165,210,.16)', foam:'rgba(170,184,214,.22)', hide:'#3a342a', hideD:'#1e1a14', pole:'#1a140e'}
              : {g:'#5e7a3e', gL:'#7a9850', blade:'#86a456', bladeL:'#b4c878', tall:'#8a9a50', tallL:'#c8c88a', head:'#b8a468', flw:['#e8dc7a', '#f0ece0', '#c890c8'], soil:'#6a5a40', rock:'#8a8478', rockL:'#b8b2a4', rockD:'#4a463e', lichen:'rgba(170,170,90,.4)', lit:'255,248,225', wetRGB:'54,48,30', w0:'#9a8a62', w1:'#7a7050', w2:'#4a4a3a', glint:'rgba(240,236,214,.4)', lip:'rgba(240,232,200,.4)', foam:'rgba(236,230,210,.45)', hide:'#a88a62', hideD:'#5e4a32', pole:'#3a2a1a'};
  const fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const grass = () => { fill(shade(P.g, (h - .5)*.025)); b2Mottle(ctx, x, y, T, N ? .03 : .07, N ? .16 : .1, P.lit, 1.4);
    b2Soft(ctx, px + T*(.3 + hash(x,y,1)*.4), py + T*(.3 + hash(y,x,2)*.4), T*.34, 1, N ? '40,54,44' : '122,152,80', .35); // patches of fresher green
    ctx.strokeStyle = P.blade; ctx.lineWidth = Math.max(1, T*.022); ctx.beginPath(); for (let i=0;i<12;i++){ const gx = px + hash(x,y,i+30)*T, gy = py + T*(.12 + hash(y,x,i+31)*.84), l = T*(.05 + hash(x,y,i+32)*.07); ctx.moveTo(gx, gy); ctx.lineTo(gx + l*.35, gy - l); } ctx.stroke();
    ctx.strokeStyle = P.bladeL; ctx.beginPath(); for (let i=0;i<5;i++){ const gx = px + hash(x,y,i+40)*T, gy = py + T*(.12 + hash(y,x,i+41)*.84), l = T*(.05 + hash(x,y,i+42)*.06); ctx.moveTo(gx, gy); ctx.lineTo(gx - l*.2, gy - l); } ctx.stroke(); };
  if (b3c2W(ch)) { // ---- water: the spring flood, silt-thick, running hard ----
    grass(); ctx.fillStyle = `rgba(${P.wetRGB},.55)`; ctx.fillRect(px, py, T, T);
    const S = b2WaterShape(x, y, T, b3c2W, 1.2); ctx.save(); S.path(ctx); ctx.clip();
    b2WaterFill(ctx, x, y, T, b3c2Dep, v => v <= 1 ? b2Mix(P.w0, P.w1, v) : b2Mix(P.w1, P.w2, v - 1));
    const flowH = (() => { let hz = 0, vt = 0; for (let k=-3;k<=3;k++){ if (b3c2W(b2Tile(x + k, y))) hz++; if (b3c2W(b2Tile(x, y + k))) vt++; } return hz >= vt; })();
    ctx.lineCap = 'round'; const deep = ch === '~';
    for (let i=0;i<(deep ? 5 : 3);i++){ const sx = px + hash(x,y,i+50)*T, sy = py + hash(y,x,i+51)*T, len = T*(deep ? .3 + hash(x,y,i+52)*.4 : .12 + hash(x,y,i+52)*.14), wob = T*.05*(hash(x,y,i+53) - .5);
      ctx.strokeStyle = deep ? (N ? 'rgba(130,150,190,.14)' : 'rgba(230,220,190,.24)') : P.glint; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath();
      if (flowH) { ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + len/2, sy + wob, sx + len, sy); } else { ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + wob, sy + len/2, sx, sy + len); } ctx.stroke(); }
    if (deep) { for (let i=0;i<2;i++){ const sx = px + hash(x,y,i+60)*T, sy = py + hash(y,x,i+61)*T; ctx.strokeStyle = N ? 'rgba(0,0,0,.32)' : 'rgba(40,34,20,.35)'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); if (flowH) { ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + T*.2, sy + T*.05, sx + T*.45, sy); } else { ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + T*.05, sy + T*.2, sx, sy + T*.45); } ctx.stroke(); } // seams where it runs fastest
      if (h > .62) { const cx = px + T*(.25 + hash(x,y,70)*.5), cy = py + T*(.25 + hash(y,x,71)*.5), a = hash(x,y,72)*3.14; ctx.save(); ctx.translate(cx, cy); ctx.rotate(flowH ? a*.2 : 1.57 + a*.2); // a drowned branch going by
        B2F.line(ctx, N ? '#14100c' : '#3a2a1a', Math.max(1, T*.035), [[-T*.2, 0], [T*.2, T*.02]]); B2F.line(ctx, N ? '#14100c' : '#3a2a1a', Math.max(1, T*.022), [[T*.02, 0], [T*.12, -T*.08]]); ctx.strokeStyle = P.foam; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(T*.22, -T*.03); ctx.quadraticCurveTo(T*.28, 0, T*.22, T*.05); ctx.stroke(); ctx.restore(); }
      if (h < .3) for (let i=0;i<3;i++) ell(ctx, px + T*(.2 + hash(x,y,i+80)*.6), py + T*(.2 + hash(y,x,i+81)*.6), T*.05, T*.025, P.foam); } // foam riding the current
    else for (let i=0;i<3;i++){ const cx = px + T*(.18 + hash(x,y,i+90)*.64), cy = py + T*(.18 + hash(y,x,i+91)*.64), r = T*(.035 + hash(x,y,i+92)*.04); ell(ctx, cx, cy, r*1.3, r, N ? 'rgba(60,64,74,.6)' : 'rgba(120,110,86,.65)'); // the ford's stones just under, the water piling against them
      ctx.strokeStyle = P.foam; ctx.lineWidth = 1; ctx.beginPath(); if (flowH) { ctx.moveTo(cx - r*1.6, cy - r); ctx.quadraticCurveTo(cx + r, cy - r*1.6, cx + r*3.4, cy - r*.4); ctx.moveTo(cx - r*1.6, cy + r); ctx.quadraticCurveTo(cx + r, cy + r*1.6, cx + r*3.4, cy + r*.4); } else { ctx.moveTo(cx - r, cy - r*1.6); ctx.quadraticCurveTo(cx - r*1.6, cy + r, cx - r*.4, cy + r*3.4); ctx.moveTo(cx + r, cy - r*1.6); ctx.quadraticCurveTo(cx + r*1.6, cy + r, cx + r*.4, cy + r*3.4); } ctx.stroke(); }
    ctx.lineCap = 'butt'; b2Mottle(ctx, x, y, T, N ? .03 : .07, .08, N ? '150,170,220' : '250,246,230', 1); ctx.restore();
    b2Lip(ctx, S, T, N ? 'rgba(0,0,0,.42)' : 'rgba(46,36,20,.5)', P.lip); b2BankCorners(ctx, x, y, T, b3c2W, `rgba(${P.wetRGB},.6)`, 1.2);
    return; }
  if (ch === '#' && tileMap && tileMap.length && (y === 0 || x === 0 || y === tileMap.length - 1 || x === (tileMap[0] || []).length - 1)) { // the map's edge: the plain going on, in grass too deep and rough to walk, a thorn-bush or two
    grass(); ctx.fillStyle = N ? 'rgba(0,0,0,.25)' : 'rgba(40,50,20,.22)'; ctx.fillRect(px, py, T, T);
    for (let c=0;c<4;c++){ const bx = px + T*(.1 + hash(x,y,c+150)*.8), by = py + T*(.3 + hash(y,x,c+151)*.66);
      for (let i=0;i<10;i++){ const a = .3 + (i/9 - .5)*.8, l = T*(.3 + hash(x, y, c*12 + i + 160)*.22), sx = bx + (i - 4.5)*T*.012; ctx.strokeStyle = i%3 === 0 ? P.tallL : shade(P.tall, -.15); ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); ctx.moveTo(sx, by); ctx.quadraticCurveTo(sx + Math.sin(a)*l*.2, by - l*.6, sx + Math.sin(a)*l, by - Math.cos(a)*l); ctx.stroke(); } }
    if (h > .6) { const cx = px + T*(.3 + hash(x,y,170)*.4), cy = py + T*.6; ell(ctx, cx + T*.04, cy + T*.2, T*.26, T*.06, N ? 'rgba(0,0,0,.4)' : 'rgba(30,36,14,.35)'); for (let i=0;i<9;i++) ell(ctx, cx + (hash(x,y,i+171) - .5)*T*.4, cy + (hash(y,x,i+172) - .6)*T*.3, T*.1, T*.08, i%3 ? (N ? '#1a2418' : '#4a5a2a') : (N ? '#243020' : '#6a7a3a')); } // a thorn-bush
    return; }
  if (ch === '#') { // an outcrop of the plain's old grey stone, lichened, grass round its foot
    grass(); const stone = (cx, cy, rx, ry, k) => { ell(ctx, cx + rx*.25, cy + ry*.55, rx*1.05, ry*.45, N ? 'rgba(0,0,0,.45)' : 'rgba(40,36,24,.4)');
      ctx.beginPath(); for (let i=0;i<=10;i++){ const a = Math.PI + i/10*Math.PI, r = 1 + (hash(x, y, k*20 + i) - .5)*.22; const qx = cx + Math.cos(a)*rx*r, qy = cy + Math.sin(a)*ry*r*1.25; i ? ctx.lineTo(qx, qy) : ctx.moveTo(qx, qy); } ctx.lineTo(cx + rx, cy + ry*.4); ctx.quadraticCurveTo(cx, cy + ry*.7, cx - rx, cy + ry*.4); ctx.closePath();
      ctx.fillStyle = PR.lin(ctx, cx - rx, cy - ry, cx + rx, cy + ry, [[0, P.rockL], [.45, P.rock], [1, P.rockD]]); ctx.fill(); ctx.strokeStyle = N ? 'rgba(0,0,0,.5)' : 'rgba(40,36,30,.5)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.strokeStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(60,56,48,.45)'; ctx.beginPath(); ctx.moveTo(cx - rx*.2, cy - ry*.9); ctx.lineTo(cx + rx*.05, cy - ry*.2); ctx.lineTo(cx - rx*.1, cy + ry*.3); ctx.stroke(); // a crack
      for (let i=0;i<4;i++) ell(ctx, cx + (hash(x,y,k*9 + i + 200) - .6)*rx, cy + (hash(y,x,k*9 + i + 201) - .7)*ry, rx*.16, ry*.1, P.lichen); };
    const big = b2Tile(x - 1, y) === '#' || b2Tile(x + 1, y) === '#' || b2Tile(x, y - 1) === '#';
    stone(px + T*.5, py + T*.56, T*(big ? .46 : .38), T*(big ? .36 : .28), 0); if (h > .4) stone(px + T*(.2 + h*.2), py + T*.78, T*.16, T*.11, 1);
    ctx.strokeStyle = P.tall; ctx.lineWidth = Math.max(1, T*.022); ctx.beginPath(); for (let i=0;i<8;i++){ const gx = px + hash(x,y,i+210)*T, gy = py + T*.92; ctx.moveTo(gx, gy); ctx.lineTo(gx + (hash(x,y,i+211) - .4)*T*.08, gy - T*(.08 + hash(x,y,i+212)*.08)); } ctx.stroke();
    return; }
  grass(); if (!b3c2W(ch)) b2WetEdges(ctx, x, y, T, b3c2W, P.wetRGB, N ? .5 : .45, .34);
  if (ch === '.') { if (h > .55) for (let i=0;i<3 + Math.floor(h*4);i++) ell(ctx, px + T*(.1 + hash(x,y,i+100)*.8), py + T*(.1 + hash(y,x,i+101)*.8), Math.max(.8, T*.018), Math.max(.8, T*.018), P.flw[Math.floor(hash(x,y,i+102)*3)]); // spring flowers in the short grass
    if (h < .14) b2Prints(ctx, x, y, T, 5, N, 4); } // hoof-marks: the herds came this way
  else if (ch === ',') { // long grass, knee-high, leaning one way in the wind, seed-heads coming
    const n = 3 + Math.floor(h*2); for (let c=0;c<n;c++){ const bx = px + T*(.12 + hash(x,y,c+110)*.76), by = py + T*(.4 + hash(y,x,c+111)*.55); ell(ctx, bx + T*.05, by + T*.02, T*.13, T*.035, N ? 'rgba(0,0,0,.3)' : 'rgba(50,60,24,.28)');
      for (let i=0;i<9;i++){ const a = .32 + (i/8 - .5)*.6, l = T*(.26 + hash(x, y, c*10 + i + 120)*.2), sx = bx + (i - 4)*T*.014, ex = sx + Math.sin(a)*l, ey = by - Math.cos(a)*l;
        ctx.strokeStyle = i%3 === 0 ? P.tallL : P.tall; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); ctx.moveTo(sx, by); ctx.quadraticCurveTo(sx + Math.sin(a)*l*.2, by - l*.6, ex, ey); ctx.stroke();
        if (i%4 === 1) ell(ctx, ex - T*.004, ey + T*.02, T*.014, T*.04, P.head, a); } } }
  else if (ch === 'W') b2Wagon(ctx, px, py, T, N);
  else if (ch === 'F') { b2Prints(ctx, x, y, T, 3, N, 9); ell(ctx, px + T*.5, py + T*.66, T*.34, T*.14, N ? '#0e0c0a' : '#3a3024'); for (let i=0;i<7;i++){ const a = i/7*6.28; ell(ctx, px + T*.5 + Math.cos(a)*T*.3, py + T*.66 + Math.sin(a)*T*.12, T*.06, T*.04, N ? '#3a3a40' : '#8a8478'); } // a ring of stones, dung-cakes for fuel
    b2Flames(ctx, px + T*.5, py + T*.62, T, 1); }
  else if (ch === '=') { const cx = px + T*.5, by = py + T*.88, ap = py + T*.1; ell(ctx, cx + T*.08, by, T*.42, T*.1, N ? 'rgba(0,0,0,.45)' : 'rgba(50,40,24,.35)'); // a Rhivi tent: hides over a cone of poles, the poles crossing out of the top, the door-flap painted
    B2F.line(ctx, P.pole, Math.max(1, T*.03), [[cx - T*.02, ap + T*.1], [cx - T*.12, ap - T*.06]]); B2F.line(ctx, P.pole, Math.max(1, T*.03), [[cx + T*.02, ap + T*.1], [cx + T*.14, ap - T*.05]]); B2F.line(ctx, P.pole, Math.max(1, T*.025), [[cx, ap + T*.1], [cx + T*.02, ap - T*.08]]);
    ctx.beginPath(); ctx.moveTo(px + T*.1, by); ctx.quadraticCurveTo(px + T*.2, py + T*.5, cx - T*.04, ap + T*.08); ctx.lineTo(cx + T*.04, ap + T*.08); ctx.quadraticCurveTo(px + T*.8, py + T*.5, px + T*.9, by); ctx.quadraticCurveTo(cx, by + T*.05, px + T*.1, by); ctx.fillStyle = PR.lin(ctx, px + T*.1, 0, px + T*.9, 0, [[0, shade(P.hide, .08)], [.55, P.hide], [1, P.hideD]]); ctx.fill();
    ctx.strokeStyle = N ? 'rgba(0,0,0,.35)' : 'rgba(70,50,30,.45)'; ctx.lineWidth = 1; ctx.beginPath(); for (let i=1;i<4;i++){ const k = i/4; ctx.moveTo(px + T*(.1 + k*.06), by - T*.2*i); ctx.quadraticCurveTo(cx, by - T*.2*i + T*.04, px + T*(.9 - k*.06), by - T*.2*i); } ctx.stroke(); // the hide seams
    poly(ctx, [[cx - T*.1, by + T*.01], [cx - T*.01, py + T*.46], [cx + T*.09, by + T*.01]], N ? '#0a0806' : '#2a1c10'); ctx.fillStyle = N ? 'rgba(120,60,50,.4)' : 'rgba(176,64,42,.8)'; ctx.fillRect(cx - T*.24, py + T*.56, T*.08, T*.03); ctx.fillRect(cx + T*.16, py + T*.56, T*.08, T*.03); ell(ctx, cx - T*.2, py + T*.66, T*.03, T*.03, N ? 'rgba(180,170,150,.3)' : '#e8dcc0'); } // the door, painted marks
  else if (ch === 'h') { b2Prints(ctx, x, y, T, 6, N, 2); // the herd: bhederin grazing, packed close, side on
    const n = 1 + (h > .5 ? 1 : 0); for (let i=0;i<n;i++){ const cx = px + T*(n === 1 ? .5 : .32 + i*.38) + (hash(x,y,i+130) - .5)*T*.1, cy = py + T*(n === 1 ? .62 : .5 + i*.26), s = T/40*(n === 1 ? 1.2 : .9), d = hash(x,y,i+131) > .5 ? 1 : -1;
      ctx.save(); ctx.translate(cx, cy); ctx.scale(d*s, s); const c = N ? ['#1a1612', '#0c0a08'] : [['#5a4230', '#22160e'], ['#4a3626', '#1a120c'], ['#644a34', '#2a1c12']][Math.floor(hash(x,y,i+132)*3)];
      ell(ctx, 0, 13, 15, 3.4, N ? 'rgba(0,0,0,.4)' : 'rgba(30,26,12,.35)'); ctx.fillStyle = c[1]; ctx.fillRect(-9, 4, 2.4, 9); ctx.fillRect(5, 4, 2.6, 9);
      ctx.beginPath(); ctx.moveTo(-12, 0); ctx.quadraticCurveTo(-11, -6, -5, -6); ctx.quadraticCurveTo(0, -6.6, 3, -10); ctx.quadraticCurveTo(6, -12, 8.6, -8); ctx.lineTo(9.6, 4.6); ctx.quadraticCurveTo(0, 6.6, -10, 4.6); ctx.closePath(); ctx.fillStyle = N ? c[0] : PR.lin(ctx, -12, 0, 10, 0, [[0, c[0]], [1, shade(c[1], -.1)]]); ctx.fill();
      ctx.fillStyle = shade(c[1], -.2); ctx.fillRect(-7.4, 4, 2.6, 9); ctx.fillRect(3.2, 3.6, 2.8, 9.4); const dn = hash(x,y,i+133) > .4; ell(ctx, 11, dn ? 5.6 : -1.4, 3.6, 3, shade(c[1], -.25)); B2F.line(ctx, N ? '#3a3630' : '#c8bca0', .9, [[10.4, dn ? 3 : -4], [12, dn ? 1.6 : -5.8], [11.4, dn ? .4 : -7]]);
      ctx.fillStyle = N ? 'rgba(160,170,200,.08)' : 'rgba(255,236,200,.18)'; ctx.fillRect(-10, -5.4, 12, 1); ctx.restore(); } }
  else if (ch !== '.' && ch !== ',') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .3 : .1, N ? 3.4 : 2.2);
}
TILEX.b3_c2_plain = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c2Plain(ctx, ch, x, y, T, !!dark));
TILEX.b3_c2_plain_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c2Plain(ctx, ch, x, y, T, true));

/* ---------------- backdrops: the herds under a spring sky, the river in spate, the strides ---------------- */
/* a bhederin far off, side on: the hump, the low head, four stubs of leg; s = size, d = facing */
function b3c2Beast(x, cx, cy, s, col, d = 1, down = 0){ x.fillStyle = col; x.beginPath(); x.moveTo(cx - 5*s*d, cy - 2*s); x.quadraticCurveTo(cx - 5*s*d, cy - 5*s, cx - 1*s*d, cy - 5*s); x.quadraticCurveTo(cx + 1.6*s*d, cy - 7.4*s, cx + 3.6*s*d, cy - 5.4*s);
  x.lineTo(cx + (5.4 + down*.6)*s*d, cy - (3.6 - down*2.6)*s); x.lineTo(cx + (4.6 + down*.4)*s*d, cy - (1.4 - down*2)*s); x.lineTo(cx + 3.6*s*d, cy - 1.2*s); x.lineTo(cx - 5*s*d, cy - 1*s); x.closePath(); x.fill();
  if (s > .5) { x.fillRect(cx - 4.4*s*d - (d < 0 ? 1.1*s : 0), cy - 1.4*s, 1.1*s, 1.4*s); x.fillRect(cx + 2.2*s*d - (d < 0 ? 1.2*s : 0), cy - 1.4*s, 1.2*s, 1.4*s); } }
/* a great spring cloud: a heap of lit rounds over a flat grey base; light from the upper left */
function b3c2Cumulus(x, cx, cy, w, hh, seed, lit, mid, base){ const n = 20, P = [];
  for (let i=0;i<n;i++){ const k = hash(i, seed), e = 1 - Math.abs(k - .5)*2, r = w*(.06 + hash(i, seed + 1)*.09)*(.5 + e*.8); P.push([cx + (k - .5)*w*.95, cy - r*.6 - Math.pow(hash(i, seed + 2), .8)*hh*e*e, r]); }
  x.save(); x.translate(cx, cy); x.scale(1, .26); glow(x, 0, 0, w*.62, base, .5); x.restore(); // the soft grey belly
  const shape = () => { x.beginPath(); P.forEach(([px, py, r]) => { x.moveTo(px + r, py); x.arc(px, py, r, 0, 7); }); x.moveTo(cx + w*.46, cy); x.ellipse(cx, cy, w*.46, w*.045, 0, 0, 7); };
  const top = Math.min(...P.map(p => p[1] - p[2]));
  shape(); x.fillStyle = PR.lin(x, cx - w*.3, top, cx + w*.1, cy, [[0, lit], [.5, mid], [1, base]]); x.fill(); // one mass, lit from above and to the left
  x.save(); shape(); x.clip(); P.forEach(([px, py, r]) => { ell(x, px - r*.3, py - r*.35, r*.7, r*.5, rgba(lit, .55)); ell(x, px + r*.35, py + r*.5, r*.8, r*.45, rgba(base, .35)); }); // each billow's lit cap and shadowed underside, soft
  x.fillStyle = PR.lin(x, 0, cy - hh*.25, 0, cy + w*.05, [[0, rgba(base, 0)], [1, rgba(base, .9)]]); x.fillRect(cx - w, cy - hh, w*2, hh + w*.1); x.restore(); } // flat and grey underneath

SCENEX.b3_c2_herds = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.6;
  ctx.drawImage(sceneLayer('b3c2:herds', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#3c5a80'],[.45,'#6e8eae'],[.82,'#aebcc4'],[1,'#d6d8cc']]); x.fillRect(0, 0, W, hz + 2); // the sky: most of the picture, and all of it moving
    glow(x, W*.14, H*.1, W*.5, '#fff6dc', .3);
    for (let i=0;i<5;i++){ x.fillStyle = `rgba(200,206,214,${.12 + hash(i, 51)*.1})`; x.beginPath(); x.ellipse(W*hash(i, 52), H*(.05 + hash(i, 53)*.14), 40 + hash(i, 54)*70, 1.2, 0, 0, 7); x.fill(); } // high mares' tails
    b3c2Cumulus(x, W*.72, hz - H*.2, W*.5, H*.3, 11, '#fbf8ee', '#d8d8d4', '#8e98a6'); b3c2Cumulus(x, W*.22, hz - H*.28, W*.36, H*.16, 23, '#f6f2e6', '#cfd0cc', '#8a94a2'); // two thunderheads building
    b3c2Cumulus(x, W*.46, hz - H*.06, W*.3, H*.06, 37, '#e8e6dc', '#c4c6c4', '#9aa2aa'); b3c2Cumulus(x, W*.95, hz - H*.05, W*.2, H*.05, 41, '#e4e2d8', '#bcbebe', '#9aa2aa');
    x.fillStyle = 'rgba(110,130,150,.5)'; x.beginPath(); x.moveTo(0, hz); for (let px=0;px<=W + 10;px+=10) x.lineTo(px, hz - 1.5 - Math.max(0, Math.sin(px/90 + 1.4))*3.5); x.lineTo(W, hz + 2); x.lineTo(0, hz + 2); x.fill(); // the plain's far lip, blue with distance
    x.fillStyle = vgrad(x, hz, H, [[0,'#9aa678'],[.12,'#7e925a'],[.4,'#5e7a3e'],[1,'#3a5226']]); x.fillRect(0, hz, W, H - hz);
    for (let i=0;i<7;i++){ const yy = hz + 4 + Math.pow(i/7, 1.6)*(H - hz); x.fillStyle = `rgba(${i%2 ? '190,186,120' : '40,60,24'},${.12 + i*.015})`; x.beginPath(); x.moveTo(0, yy); for (let px=0;px<=W + 12;px+=12) x.lineTo(px, yy + Math.sin(px/(60 + i*20) + i*1.7)*(1 + i*.8)); x.lineTo(W, yy + 6 + i*2); x.lineTo(0, yy + 6 + i*2); x.fill(); } // long low swells of grass, gold where the wind lays it over
    // the herd: a brown tide across the middle distance, too many to count, thinning to the right where the riders keep it
    const hy0 = hz + 3, hy1 = hz + H*.16;
    for (let i=0;i<900;i++){ const k = Math.pow(hash(i, 61), .9), cy = lerp(hy0, hy1, Math.pow(hash(i, 62), 1.3)), cx = W*(.3 + k*.8) + Math.sin(cy*.3 + i)*6, s = .2 + (cy - hz)/H*3.4; if (cx > W*(.95 + (cy - hz)/H*.4)) continue;
      b3c2Beast(x, cx, cy, s, `rgba(${48 + hash(i, 63)*22},${34 + hash(i, 63)*14},${24},${.55 + (cy - hz)/H*2})`, hash(i, 64) > .5 ? 1 : -1, hash(i, 65) > .55 ? 1 : 0); }
    glow(x, W*.66, hz + 4, W*.4, '#d8c8a0', .22); // their dust
    for (let i=0;i<9;i++){ const cx = W*(.42 + i*.07) + hash(i, 66)*10, cy = hy1 + 4 + hash(i, 67)*8; b2Rider(x, cx, cy, .42 + (cy - hz)/H*.6, 'rgba(36,26,18,.85)', hash(i, 68) > .4 ? 1 : -1, i%2, false); } // Rhivi riders on the herd's near edge
    // the Host: a column winding in from the left, wagons and blocks of foot, standards, its own dust
    const path = k => [lerp(-W*.04, W*.42, Math.pow(k, .8)), lerp(H*.86, hz + 2, Math.pow(k, .55))];
    for (let i=0;i<40;i++){ const [cx, cy] = path(i/40); ell(x, cx, cy - 3, 14*(1 - i/40) + 3, 4*(1 - i/40) + 1, 'rgba(200,184,140,.12)'); }
    b2Column(x, W, H, k => path(lerp(.04, 1, k)), 150, 'rgba(36,32,26,.88)', null);
    for (let i=0;i<6;i++){ const [px, py] = path(.1 + i*.15), sc = 1 - i*.13; x.fillStyle = '#1e1a14'; x.fillRect(px + 5, py - 15*sc, .8, 13*sc); x.fillStyle = i%2 ? '#6a2a20' : '#4a4a52'; x.fillRect(px + 5.8, py - 15*sc, 4.4*sc, 2.6*sc); } // standards
    // Brood's people beyond: a dark mass with spears on the far right, Barghast and the Andii banner, small
    for (let i=0;i<260;i++){ const px = W*(.78 + hash(i, 71)*.24), py = hz + 2 + hash(i, 72)*5; x.fillStyle = `rgba(40,36,40,${.4 + hash(i, 73)*.3})`; x.fillRect(px, py - 1.6, .9, 1.8); if (hash(i, 74) > .85) x.fillRect(px + .2, py - 4, .35, 3); }
    x.fillStyle = '#141018'; x.fillRect(W*.86, hz - 6, .7, 9); x.fillStyle = '#20202a'; x.fillRect(W*.86 + .7, hz - 6, 4, 2.4);
    // the near grass, long, a few flowers, the ground under the squad's feet
    x.strokeStyle = 'rgba(40,56,24,.85)'; x.lineWidth = 1.1; for (let i=0;i<260;i++){ const gx = hash(i, 81)*W, gy = H*.82 + hash(i, 82)*H*.2, l = 6 + hash(i, 83)*14; x.beginPath(); x.moveTo(gx, gy); x.quadraticCurveTo(gx + 2, gy - l*.6, gx + 4 + hash(i, 84)*4, gy - l); x.stroke(); }
    for (let i=0;i<40;i++) ell(x, hash(i, 85)*W, H*.84 + hash(i, 86)*H*.15, 1.1, 1.1, ['#e8dc7a', '#f0ece0', '#c890c8'][i%3]);
  }), 0, 0, W, H);
  // cloud shadows going over the plain; the wind in the grass
  ctx.save(); ctx.beginPath(); ctx.rect(0, hz, W, H - hz); ctx.clip(); for (let i=0;i<3;i++){ const k = ((t*mo/40000 + i/3) % 1), cx = (k*1.6 - .3)*W, cy = hz + 6 + i*H*.08; ctx.save(); ctx.translate(cx, cy); ctx.scale(1, .16 + i*.06); glow(ctx, 0, 0, W*.28, '#1a2410', .32); ctx.restore(); } ctx.restore();
  for (let i=0;i<6;i++){ const k = ((t*mo/7000 + i/6) % 1), yy = hz + 10 + i*(H - hz)/7; ctx.fillStyle = `rgba(220,214,150,${.1*Math.sin(k*Math.PI)})`; ctx.beginPath(); ctx.ellipse(k*W*1.3 - W*.15, yy, W*.18, 2 + i, 0, 0, 7); ctx.fill(); } // gusts laying the grass over
  for (let i=0;i<5;i++){ const k = ((t*mo/(14000 + i*2600) + i/5) % 1), bx = W*(.1 + k*.9), by = H*(.14 + i*.04) + Math.sin(t*mo/900 + i*2)*3, f = Math.sin(t*mo/120 + i*1.7); ctx.strokeStyle = 'rgba(40,40,50,.65)'; ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(bx - 3, by - f*1.4); ctx.quadraticCurveTo(bx - 1.4, by - 1, bx, by); ctx.quadraticCurveTo(bx + 1.4, by - 1, bx + 3, by - f*1.4); ctx.stroke(); } // birds, following the herd
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.56 + i*Math.min(32, W*.4/sq.length), H*.95 - (i%2)*3, 2.1, t, {phase:i, dir:-1}));
  vign(ctx, W, H, .35, .45); };

SCENEX.b3_c2_flood = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.36, r0 = H*.44, r1 = H*.8;
  ctx.drawImage(sceneLayer('b3c2:flood', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#141624'],[.4,'#3a3248'],[.75,'#8a4a44'],[1,'#d88a52']]); x.fillRect(0, 0, W, hz + 2); glow(x, W*.8, hz, W*.45, '#ffb070', .45); // dusk, under the weather
    for (let i=0;i<6;i++) cloud(x, W*(.1 + i*.17), hz*(.18 + (i%3)*.16), W*.34, 4, i%2 ? '#2a2234' : '#4a3040', .5); // the rain clouds, low and heavy
    for (let i=0;i<9;i++){ const rx = W*(.05 + hash(i, 5)*.5); x.fillStyle = 'rgba(40,36,56,.16)'; x.beginPath(); x.moveTo(rx, hz*.3); x.lineTo(rx + 16, hz*.3); x.lineTo(rx + 4, hz + 4); x.lineTo(rx - 12, hz + 4); x.fill(); } // curtains of rain over the far plain
    x.fillStyle = '#2a2230'; x.beginPath(); x.moveTo(0, hz + 2); for (let px=0;px<=W + 10;px+=10) x.lineTo(px, hz - 1 - Math.max(0, Math.sin(px/60))*4); x.lineTo(W, r0); x.lineTo(0, r0); x.fill(); // the far bank
    for (let i=0;i<5;i++){ const tx = W*(.1 + hash(i, 7)*.6), ty = hz + 2; x.fillStyle = '#18141c'; x.fillRect(tx, ty - 10, 1.4, 10); for (let j=0;j<6;j++) ell(x, tx + (hash(i, j + 8) - .5)*8, ty - 10 - hash(j, i + 9)*6, 3.4, 2.6, '#18141c'); } // a few willows
    for (let i=0;i<140;i++){ const cx = W*(.32 + hash(i, 21)*.62), cy = hz + 2 + hash(i, 22)*(r0 - hz - 4); b3c2Beast(x, cx, cy, .3 + (cy - hz)/H*1.8, 'rgba(22,16,20,.9)', hash(i, 23) > .5 ? 1 : -1); } // the part of the herd that got across, crowding the far bank
    for (let i=0;i<4;i++){ const fx = W*(.4 + i*.14), fy = r0 - 3; glow(x, fx, fy, 7, '#ff9040', .45); x.fillStyle = '#ffc070'; x.fillRect(fx - .5, fy - 1, 1.2, 1.2); }
    x.fillStyle = '#100c10'; x.fillRect(0, r0 - 3, W, 4);
    // the river: brown, risen to the top of its banks, the dusk lying on it in torn red strips
    x.fillStyle = vgrad(x, r0, r1, [[0,'#6a4038'],[.1,'#b0704a'],[.22,'#7a5440'],[.5,'#5e4a38'],[1,'#4a3c2e']]); x.fillRect(0, r0, W, r1 - r0);
    for (let i=0;i<90;i++){ const yy = r0 + 2 + Math.pow(hash(i, 31), .9)*(r1 - r0 - 4), px = hash(i, 32)*W, d = (yy - r0)/(r1 - r0), l = 6 + hash(i, 33)*30*(.4 + d); x.fillStyle = `rgba(${d < .3 ? '255,170,110' : '200,184,160'},${.08 + hash(i, 34)*.14})`; x.fillRect(px, yy, l, 1 + d); } // streaks
    for (let i=0;i<16;i++){ const cx = hash(i, 41)*W, cy = r0 + 6 + hash(i, 42)*(r1 - r0 - 12), w = 10 + hash(i, 43)*24; x.strokeStyle = 'rgba(230,214,190,.22)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(cx - w, cy + 2); x.quadraticCurveTo(cx, cy - 4 - hash(i, 44)*4, cx + w, cy + 2); x.stroke(); } // standing waves where it boils over something
    // the ford, drowned: a line of broken water, and a wagon caught on it, tilted, the team gone
    for (let i=0;i<26;i++){ const k = i/25, fx = lerp(W*.06, W*.44, k) + (hash(i, 45) - .5)*8, fy = lerp(r1 - 3, r0 + 5, Math.pow(k, .8)), w = lerp(9, 3, k); x.strokeStyle = `rgba(236,220,196,${.2 + hash(i, 46)*.25})`; x.lineWidth = lerp(1.6, .7, k); x.beginPath(); x.moveTo(fx - w, fy + 1); x.quadraticCurveTo(fx, fy - 2, fx + w, fy + 1); x.stroke(); } // the ford, a line of white chop where the water piles over it
    x.save(); x.translate(W*.24, r0 + (r1 - r0)*.56); x.rotate(-.32); x.fillStyle = 'rgba(236,220,196,.45)'; x.beginPath(); x.ellipse(-18, -1, 5, 3, 0, 0, 7); x.fill(); x.fillStyle = '#1a1210'; x.fillRect(-16, -6, 32, 6); x.fillStyle = '#a89278'; x.beginPath(); x.moveTo(-16, -6); x.quadraticCurveTo(0, -24, 16, -6); x.fill(); x.fillStyle = 'rgba(255,170,110,.35)'; x.beginPath(); x.moveTo(-16, -6); x.quadraticCurveTo(-8, -18, 0, -15); x.lineTo(-2, -6); x.fill(); x.fillStyle = 'rgba(30,20,20,.45)'; x.beginPath(); x.moveTo(2, -6); x.quadraticCurveTo(10, -18, 16, -6); x.fill(); x.strokeStyle = 'rgba(40,30,24,.6)'; x.lineWidth = .7; x.beginPath(); for (let i=1;i<4;i++){ x.moveTo(-16 + i*8, -6); x.lineTo(-16 + i*8, -14 - (i === 2 ? 3 : 0)); } x.stroke(); ell(x, -10, 0, 4.4, 4.4, '#140e0a'); x.fillStyle = 'rgba(236,220,196,.5)'; x.fillRect(-20, 1, 40, 1.4); x.restore();
    x.fillStyle = 'rgba(230,214,190,.3)'; x.fillRect(W*.24 - 22, r0 + (r1 - r0)*.56 + 4, 44, 1.4);
    // the near bank: churned mud, the wagons that did not try it, people on ropes
    x.fillStyle = vgrad(x, r1 - 4, H, [[0,'#2a221e'],[.5,'#1a1412'],[1,'#0c0808']]); x.beginPath(); x.moveTo(0, H); x.lineTo(0, r1); for (let px=0;px<=W + 10;px+=12) x.lineTo(px, r1 - 2 + Math.sin(px/36)*2.4); x.lineTo(W, H); x.fill();
    x.fillStyle = 'rgba(255,170,110,.32)'; x.beginPath(); x.moveTo(0, r1 - 2); for (let px=0;px<=W + 10;px+=12) x.lineTo(px, r1 - 2 + Math.sin(px/36)*2.4); x.lineTo(W, r1 + 1); x.lineTo(0, r1 + 1); x.fill(); // the wet lip, the sky on it
    for (let i=0;i<10;i++) ell(x, W*(.3 + hash(i, 47)*.7), r1 + 6 + hash(i, 48)*(H - r1)*.6, 6 + hash(i, 49)*10, 1.2, 'rgba(220,130,80,.22)'); // puddles in the ruts
    [[.62, 1], [.78, 1.15], [.93, 1.3]].forEach(([k, s]) => { const wx = W*k, wy = r1 + 8*s; x.fillStyle = '#120c0a'; x.fillRect(wx - 14*s, wy - 8*s, 28*s, 6*s); x.fillStyle = '#4a3e36'; x.beginPath(); x.moveTo(wx - 14*s, wy - 8*s); x.quadraticCurveTo(wx, wy - 24*s, wx + 14*s, wy - 8*s); x.fill(); ell(x, wx - 9*s, wy - 1*s, 4*s, 4*s, '#0a0606'); ell(x, wx + 9*s, wy - 1*s, 4*s, 4*s, '#0a0606'); }); // the Host's wagons, held back
    const wy = r0 + (r1 - r0)*.56; x.strokeStyle = 'rgba(20,14,12,.9)'; x.lineWidth = .9; x.beginPath(); x.moveTo(W*.24 + 12, wy - 10); x.quadraticCurveTo(W*.34, wy + 2, W*.42, r1 + 1); x.stroke(); // a rope out to it
    for (let i=0;i<4;i++){ const px = W*(.42 + i*.03), py = r1 + 7 + (i%2)*1.5, s = 1.25; x.fillStyle = '#0c0808'; x.save(); x.translate(px, py); x.rotate(.42); poly(x, [[-1.6*s, -8*s], [1.6*s, -8*s], [2.4*s, 0], [-2.4*s, 0]], '#0c0808'); x.beginPath(); x.arc(.4*s, -9.6*s, 1.5*s, 0, 7); x.fill(); x.fillRect(-1*s, -7*s, -3.4*s, 1*s); x.restore(); } // hauling on it, leaning back into the mud
  }), 0, 0, W, H);
  // the river moving: streaks and wreckage riding it left to right, a drowned tree turning
  ctx.save(); ctx.beginPath(); ctx.rect(0, r0, W, r1 - r0); ctx.clip(); ctx.globalCompositeOperation = 'lighter';
  for (let i=0;i<26;i++){ const k = ((t*mo/(2600 + hash(i, 51)*1800) + hash(i, 52)) % 1), yy = r0 + 4 + hash(i, 53)*(r1 - r0 - 8), d = (yy - r0)/(r1 - r0); ctx.fillStyle = `rgba(230,200,170,${.18*Math.sin(k*Math.PI)})`; ctx.fillRect(k*W*1.2 - W*.1, yy, 10 + d*24, 1 + d); }
  ctx.globalCompositeOperation = 'source-over';
  for (let i=0;i<4;i++){ const k = ((t*mo/(16000 + i*5000) + i*.27) % 1), yy = r0 + 10 + i*(r1 - r0)*.22, s = .7 + i*.25, bx = k*W*1.3 - W*.15, rot = Math.sin(t*mo/1400 + i)*.3; ctx.save(); ctx.translate(bx, yy + Math.sin(t*mo/500 + i)*1.4); ctx.rotate(rot); // wreckage: a tree, roots and all, then branches
    B2F.line(ctx, '#1a1210', 2.2*s, [[-14*s, 0], [12*s, -1*s]]); if (i%2 === 0) { for (let j=0;j<5;j++) B2F.line(ctx, '#1a1210', .8*s, [[-14*s, 0], [-18*s - hash(j, i)*4*s, -6*s + j*3*s]]); B2F.line(ctx, '#1a1210', 1.2*s, [[4*s, -1*s], [10*s, -8*s]]); B2F.line(ctx, '#1a1210', 1*s, [[8*s, -1*s], [14*s, -6*s]]); }
    ctx.strokeStyle = 'rgba(230,214,190,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(14*s, -3*s); ctx.quadraticCurveTo(18*s, 0, 14*s, 3*s); ctx.stroke(); ctx.restore(); }
  ctx.restore();
  ctx.strokeStyle = 'rgba(180,170,190,.28)'; ctx.lineWidth = .8; ctx.beginPath(); for (let i=0;i<70;i++){ const k = ((t*mo/700 + hash(i, 61)) % 1), rx = hash(i, 62)*W*1.2 - k*24, ry = k*H; ctx.moveTo(rx, ry); ctx.lineTo(rx - 3, ry + 9); } ctx.stroke(); // rain
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.06 + i*Math.min(30, W*.36/sq.length), H*.97 - (i%2)*3, 2.1, t, {phase:i, dir:1}));
  vign(ctx, W, H, .6, .5); };

SCENEX.b3_c2_strides = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42;
  /* the track: three-toed prints in a line from under our feet to the skyline, each stride longer than a horse */
  const track = k => [lerp(W*.58, W*.47, Math.pow(k, .7)) + Math.sin(k*5)*W*.03, lerp(H*1.02, hz + 2, Math.pow(k, .42))];
  ctx.drawImage(sceneLayer('b3c2:strides', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#5a6068'],[.6,'#8a9096'],[1,'#b0b2ac']]); x.fillRect(0, 0, W, hz + 2); // a low grey morning
    for (let i=0;i<7;i++) cloud(x, W*(i/6), hz*(.2 + (i%3)*.18), W*.4, 4, i%2 ? '#6a7078' : '#9aa0a4', .4);
    x.fillStyle = 'rgba(96,108,100,.6)'; x.beginPath(); x.moveTo(0, hz); for (let px=0;px<=W + 10;px+=10) x.lineTo(px, hz - 1 - Math.max(0, Math.sin(px/70 + 3))*3); x.lineTo(W, hz + 2); x.lineTo(0, hz + 2); x.fill();
    x.fillStyle = vgrad(x, hz, H, [[0,'#8a9070'],[.3,'#6a7650'],[1,'#3e4632']]); x.fillRect(0, hz, W, H - hz);
    for (let i=0;i<5;i++){ const yy = hz + 3 + Math.pow(i/5, 1.5)*(H - hz); x.fillStyle = `rgba(${i%2 ? '160,156,110' : '40,48,30'},.14)`; x.beginPath(); x.moveTo(0, yy); for (let px=0;px<=W + 12;px+=12) x.lineTo(px, yy + Math.sin(px/70 + i*2)*(1 + i)); x.lineTo(W, yy + 8 + i*3); x.lineTo(0, yy + 8 + i*3); x.fill(); }
    // where it went the grass lies flat and pale, pressed outward from its line; mud thrown up only where the feet came down
    for (let i=0;i<420;i++){ const k = Math.pow(hash(i, 11), 1.3), [px, py] = track(k), w = lerp(W*.2, 4, Math.pow(k, .5)), u = (hash(i, 12) - .5)*2, gx = px + u*w, l = lerp(13, 1.2, Math.pow(k, .5)), side = u < 0 ? -1 : 1;
      x.strokeStyle = `rgba(${170 + hash(i, 13)*30},${168 + hash(i, 13)*24},${116},${.28 + (1 - Math.abs(u))*.3})`; x.lineWidth = lerp(1.3, .5, k); x.beginPath(); x.moveTo(gx, py); x.lineTo(gx + side*l*(.5 + Math.abs(u)), py + l*.18); x.stroke(); }
    // the prints: three long toes forward, a heel-pad, pressed deep; water standing in them with the sky in it
    for (let i=0;i<8;i++){ const k = (i + .35)/8, [px, py] = track(Math.pow(k, 1.25)), s = lerp(1.5, .07, Math.pow(k, .42)), side = i%2 ? 1 : -1, cx = px + side*7*s*3.4;
      x.save(); x.translate(cx, py); x.scale(s*3.4, s*1.3); x.rotate(side*.06); const toe = (a, l, w0 = 2) => { x.beginPath(); x.moveTo(-w0*.6, 0); x.quadraticCurveTo(Math.sin(a)*l*.5 - w0, -l*.55, Math.sin(a)*l, -l); x.quadraticCurveTo(Math.sin(a)*l*.5 + w0, -l*.45, w0*.6, 0); x.closePath(); x.fill(); };
      x.save(); x.translate(.8, 1.4); x.fillStyle = 'rgba(200,196,160,.25)'; toe(-.55, 11); toe(0, 14); toe(.55, 11); x.restore(); // the lip of pressed mud catching the light
      x.fillStyle = 'rgba(44,36,24,.92)'; toe(-.55, 11); toe(0, 14); toe(.55, 11); ell(x, 0, 1.4, 3.6, 2.8, 'rgba(44,36,24,.92)');
      x.fillStyle = 'rgba(20,16,10,.9)'; x.save(); x.translate(0, .3); x.scale(.7, .8); toe(-.55, 11, 1.4); toe(0, 14, 1.4); toe(.55, 11, 1.4); x.restore(); // deep at the claw-tips
      x.fillStyle = 'rgba(160,166,166,.5)'; x.save(); x.translate(-.4, 1); x.scale(.45, .5); toe(0, 14); x.restore(); ell(x, -.6, 1.4, 1.8, 1, 'rgba(170,174,170,.42)'); // the grey sky lying in the water
      x.fillStyle = 'rgba(44,36,24,.5)'; for (let j=0;j<5;j++) ell(x, (hash(i, j + 20) - .5)*12, 3.6 + hash(j, i + 21)*2.6, .9, .5, 'rgba(44,36,24,.55)'); x.restore(); } // clods flung back
    // the outrider's horse, down in the grass off the track; a bow, a dropped herd-staff. No more than that
    const hx = W*.2, hy = hz + H*.16; ell(x, hx + 2, hy + 1, 22, 3.4, 'rgba(30,26,18,.5)');
    x.fillStyle = '#2a201a'; x.beginPath(); x.moveTo(hx - 16, hy); x.quadraticCurveTo(hx - 16, hy - 9, hx - 4, hy - 9); x.quadraticCurveTo(hx + 8, hy - 10, hx + 12, hy - 5); x.lineTo(hx + 20, hy - 3); x.quadraticCurveTo(hx + 24, hy - 1, hx + 22, hy + 1); x.lineTo(hx - 14, hy + 1); x.closePath(); x.fill(); // on its side, the neck stretched out along the ground
    x.strokeStyle = '#2a201a'; x.lineWidth = 1.8; x.lineCap = 'round'; x.beginPath(); x.moveTo(hx - 12, hy - 5); x.lineTo(hx - 20, hy - 11); x.lineTo(hx - 23, hy - 12); x.moveTo(hx + 8, hy - 6); x.lineTo(hx + 12, hy - 13); x.lineTo(hx + 11, hy - 16); x.stroke(); x.lineCap = 'butt'; // two legs up, stiff
    x.fillStyle = '#4a2a1a'; x.fillRect(hx - 6, hy - 9.6, 9, 3.4); x.fillStyle = '#b8402a'; x.fillRect(hx - 5, hy - 6.6, 1.6, 4); // the saddle-pad, a red tassel
    B2F.line(x, '#c8b48a', 1.3, [[hx + 26, hy + 4], [hx + 30, hy - 2], [hx + 38, hy + 1], [hx + 42, hy + 5]]); B2F.line(x, '#5a4026', 1.1, [[hx - 30, hy + 7], [hx - 6, hy + 10]]); // the horn bow; the staff
    x.fillStyle = 'rgba(60,40,28,.35)'; x.fillRect(hx - 18, hy + 1, 40, 2); // the grass round it beaten down
    // the near ground, the long grass at our feet bent the way it went
    x.strokeStyle = 'rgba(46,56,32,.9)'; x.lineWidth = 1.1; for (let i=0;i<200;i++){ const gx = hash(i, 81)*W, gy = H*.8 + hash(i, 82)*H*.22; if (Math.abs(gx - W*.58) < W*.2) continue; const l = 8 + hash(i, 83)*14, lean = gx < W*.58 ? -1 : 1; x.beginPath(); x.moveTo(gx, gy); x.quadraticCurveTo(gx + lean*3, gy - l*.6, gx + lean*(6 + hash(i, 84)*5), gy - l*.85); x.stroke(); }
  }), 0, 0, W, H);
  // crows over the horse, turning; wind through the standing grass; a thin mist going over
  for (let i=0;i<6;i++){ const a = t*mo/(2200 + i*400) + i*1.1, bx = W*.2 + Math.cos(a)*(18 + i*5), by = hz - 14 - i*3 + Math.sin(a)*5, f = Math.sin(t*mo/110 + i*2); ctx.strokeStyle = 'rgba(16,14,14,.85)'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(bx - 3.4, by - f*1.6); ctx.quadraticCurveTo(bx - 1.4, by - .8, bx, by); ctx.quadraticCurveTo(bx + 1.4, by - .8, bx + 3.4, by - f*1.6); ctx.stroke(); }
  for (let i=0;i<4;i++){ const k = ((t*mo/22000 + i/4) % 1); ell(ctx, (k*1.4 - .2)*W, hz + 6 + i*8, W*.24, 3 + i, `rgba(200,206,204,${.18*Math.sin(k*Math.PI)})`); }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.05 + i*Math.min(28, W*.3/sq.length), H*.96 - (i%2)*3, 2.1, t, {phase:i, dir:1}));
  vign(ctx, W, H, .55, .5); };

/* ---------------- the chapter's kit: ART['item/<key>'] in Book One's and Two's card manner, on Book Three's cold ground ----------------
   weapons and armour 200×150, trinkets 240×130 (as 19c and tools/art_dg_items.py), a radial ground gone from slate to near-black */
const B3C2_ART = (() => {
  const card = (id, label, w, h, body, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}-bg" cx="0.5" cy="0.5" r="${w > 200 ? .65 : .62}"><stop offset="0" stop-color="#2e3642"/><stop offset="1" stop-color="#0a0c10"/></radialGradient>${extra}</defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id}-bg)"/>\n${body}</svg>`;
  const P = {};
  /* a bhederin-horn bow: two pale horn limbs, sinew-backed, the tips dark and hooked, a bound grip, a red tassel */
  P.bow = id => card(id, 'A bhederin-horn bow', 200, 150,
    '<path d="M70 18 Q54 24 62 36 Q94 56 96 75 Q94 94 62 114 Q54 126 70 132" fill="none" stroke="#2a2018" stroke-width="10" stroke-linecap="round"/>'
    + '<path d="M70 18 Q54 24 62 36 Q94 56 96 75 Q94 94 62 114 Q54 126 70 132" fill="none" stroke="#e6d8b4" stroke-width="7" stroke-linecap="round"/>'
    + '<path d="M64 38 Q92 56 93 75 Q92 94 64 112" fill="none" stroke="#f8f0dc" stroke-width="1.6" opacity=".8"/><path d="M66 32 Q98 54 100 75 Q98 96 66 118" fill="none" stroke="#7a5a3a" stroke-width="2.2" opacity=".75"/>'
    + '<path d="M70 18 Q54 24 62 36 M62 114 Q54 126 70 132" fill="none" stroke="#2a1c12" stroke-width="7.4" stroke-linecap="round"/>'
    + '<rect x="89" y="64" width="13" height="22" rx="3" fill="#5a3a22"/><path d="M89 69 h13 M89 74 h13 M89 79 h13" stroke="#a8845a" stroke-width="1.6"/>'
    + '<path d="M68 22 L68 128" stroke="#efe6d0" stroke-width="1.1"/><path d="M100 82 Q108 96 104 112 M102 82 Q114 92 112 108" stroke="#b8402a" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
    + '<path d="M104 75 L178 75" stroke="#b89a6a" stroke-width="2"/><path d="M178 70 L190 75 L178 80 Z" fill="#c8c4b8"/><path d="M108 70 L118 75 L108 80" fill="#e8dcc0"/><path d="M112 70 L122 75 L112 80" fill="#3a2a1c"/>');
  /* a Rhivi spirit-bundle: a hide pouch bound with sinew, bone beads, a hawk feather and a tuft of bhederin hair; something pale breathing off it */
  P.bundle = id => card(id, 'A Rhivi spirit-bundle', 240, 130,
    '<circle cx="120" cy="66" r="48" fill="url(#' + id + '-sp)" class="a2-shimmer"/>'
    + '<path d="M120 10 Q118 20 120 28" stroke="#b8402a" stroke-width="2" fill="none"/>'
    + '<path d="M120 28 Q100 34 96 52 Q94 66 102 76 Q96 92 98 110 M120 28 Q140 34 144 52 Q146 66 138 76 Q144 92 142 110 M120 28 Q112 50 110 76 Q108 96 112 114 M120 28 Q128 50 130 76 Q132 96 128 114 M120 28 Q120 60 120 116" stroke="#c8b46a" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    + '<path d="M120 28 Q104 40 102 56 M120 28 Q136 40 138 56 M116 40 Q112 70 114 104" stroke="#8a7a3a" stroke-width="1.6" fill="none" opacity=".9"/>'
    + '<path d="M98 108 l-4 10 M106 112 l-1 10 M114 114 l1 10 M126 114 l2 10 M134 112 l3 9 M142 108 l5 9" stroke="#b8a462" stroke-width="2" stroke-linecap="round"/>'
    + '<path d="M97 46 Q120 54 143 46" stroke="#b8402a" stroke-width="3" fill="none"/><path d="M99 82 Q120 90 141 82" stroke="#b8402a" stroke-width="3" fill="none"/><path d="M118 46 l-6 12 M124 48 l4 12" stroke="#b8402a" stroke-width="1.6"/>'
    + '<circle cx="104" cy="88" r="3.4" fill="#e8dcc0"/><circle cx="111" cy="91" r="3.4" fill="#c8b896"/><circle cx="118" cy="92" r="3.4" fill="#e8dcc0"/><circle cx="125" cy="92" r="3.4" fill="#c8b896"/><circle cx="132" cy="90" r="3.4" fill="#e8dcc0"/><circle cx="139" cy="87" r="3.4" fill="#c8b896"/>'
    + '<path d="M144 52 Q164 58 170 76 Q176 92 168 108 M146 54 Q160 64 162 80 Q166 96 160 106 M145 56 Q156 70 154 86" stroke="#3a281a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M146 52 Q162 60 166 76" stroke="#6a5040" stroke-width="1" fill="none"/>'
    + '<path d="M60 56 q4 -8 8 0 M170 30 q4 -8 8 0 M70 98 q3 -6 6 0" stroke="#d8e4f0" stroke-width="1.2" fill="none" opacity=".55" class="a2-shimmer"/>',
    '<radialGradient id="' + id + '-sp" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#c8d8e8" stop-opacity=".26"/><stop offset="1" stop-color="#c8d8e8" stop-opacity="0"/></radialGradient>');
  /* a Seerdomin's grey mace: a long iron haft, a flanged head gone the colour of ash, a cold light still in the metal */
  P.mace = id => card(id, "A Seerdomin's grey mace", 200, 150,
    '<circle cx="138" cy="48" r="40" fill="url(#' + id + '-cold)" class="a2-shimmer"/>'
    + '<path d="M44 136 L130 52" stroke="#1e1e22" stroke-width="9" stroke-linecap="round"/><path d="M44 136 L130 52" stroke="#4a4a52" stroke-width="5" stroke-linecap="round"/><path d="M46 132 L128 52" stroke="#8a8a94" stroke-width="1" opacity=".7"/>'
    + '<path d="M40 140 L56 124" stroke="#2a2016" stroke-width="10" stroke-linecap="round"/><path d="M42 132 L50 140 M46 128 L54 136 M50 124 L58 132" stroke="#5a4a36" stroke-width="2"/><circle cx="38" cy="142" r="5" fill="#5a5a62"/>'
    + '<path d="M120 46 L136 28 L148 34 L156 50 L150 66 L134 70 L120 62 Z" fill="#6a6a72"/><path d="M136 28 L140 50 L150 66 M120 46 L140 50 L156 50 M120 62 L140 50" stroke="#2a2a30" stroke-width="2" fill="none"/>'
    + '<path d="M136 28 L130 16 L144 24 Z M156 50 L170 50 L158 58 Z M134 70 L132 84 L124 72 Z M120 46 L106 42 L118 38 Z" fill="#5a5a62"/><path d="M122 46 L136 30 L146 35" stroke="#c8ccd4" stroke-width="1.4" fill="none" opacity=".7"/>'
    + '<circle cx="140" cy="50" r="3" fill="#dce4ec" opacity=".85" class="a2-shimmer"/><path d="M160 30 l2 -5 l2 5 l-2 5 Z M112 30 l2 -4 l2 4 l-2 4 Z M164 70 l2 -4 l2 4 l-2 4 Z" fill="#dce4ec" opacity=".6"/>',
    '<radialGradient id="' + id + '-cold" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#b8c0cc" stop-opacity=".3"/><stop offset="1" stop-color="#b8c0cc" stop-opacity="0"/></radialGradient>');
  return P;
})();
/* the writer's item keys -> drawings; anything in CH.gear with a b3_c2_ id gets the nearest picture by its name if it is not listed */
{ const KEYS = { b3_c2_hornbow: 'bow', b3_c2_bundle: 'bundle', b3_c2_mace: 'mace' };
  const put = (key, kind) => { ART['item/' + key] = B3C2_ART[kind]('c2' + key.slice(6)); ART_SIZE['item/' + key] = kind === 'bundle' ? [240, 130] : [200, 150]; };
  Object.entries(KEYS).forEach(([k, v]) => put(k, v)); }
