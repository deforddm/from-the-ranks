/* ============ Book Three, Chapter 5 art: South of the Catlin — the Domin stripped ahead of the army ============
   Figures (FIGX) in the same ~32px frame as 60d, lit from the left; the stripped fields and burnt farms (TILEX.b3_c5_domin, _night);
   three backdrops (SCENEX), the still parts cached with sceneLayer; and the chapter's item pictures (ART['item/…']) on a cold ground.
   Grey weather over everything: the land has been emptied, and the sky looks like it knows. What is grim is far off and small. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* one of Kallor's own soldiers: a hard old professional in iron scale, his master's charcoal and ash, a grey fur mantle like his master's,
     a broken crown worked small on the breast; a heavy straight sword held low and easy */
  b3_c5_kallorman(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1.06);
    poly(ctx, [[-6.6,-6],[3,-6],[2.2,12.2],[-9.6,12.6]], h.armor('#2e2c2a', '#0c0b0a')); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-9.2, 10.8, 10.6, 1.6); // the cloak behind, charcoal
    h.legs('#2a2622'); ctx.fillStyle = '#1c1814'; ctx.fillRect(-4.6, 9.4, 3.6, 3.6); ctx.fillRect(1, 9.4, 3.6, 3.6); ctx.fillStyle = '#4a463e'; ctx.fillRect(-4.5, 6, 3.4, 2.6); ctx.fillRect(1.1, 6, 3.4, 2.6); // boots, greaves
    h.torso('#6e6a5c', '#22201a', 6.4); ctx.fillStyle = 'rgba(0,0,0,.32)'; for (let r=0;r<5;r++) for (let i=0;i<6;i++) ctx.fillRect(-5.8 + i*2 + (r%2), -4.6 + r*2.2, 1.4, .5); // iron scale
    poly(ctx, [[-3.6,-6],[3.6,-6],[4.2,9],[-4.2,9]], h.armor('#3a3834', '#121110')); ctx.fillStyle = '#8a8478'; ctx.fillRect(-4.2, 7.6, 8.4, .8); // the tabard, charcoal, an ash-grey hem
    poly(ctx, [[-2,-1.6],[-2,-3.6],[-1,-2.6],[0,-4],[1,-2.6],[2,-3.6],[2,-1.6]], 'rgba(196,190,176,.78)'); ctx.fillStyle = '#121110'; ctx.fillRect(.2, -3.2, .5, 1.8); // a crown, worked small, cracked through
    ctx.fillStyle = '#2a2018'; ctx.fillRect(-6.2, 3, 12.4, 1.2); ctx.fillStyle = '#7a7466'; ctx.fillRect(-.8, 3, 1.6, 1.2); // belt
    B3F.blade(ctx, 7.4, 2, 12.6, -13.4, '#b4b2aa', 1.4); B2F.line(ctx, '#5a5448', 1.2, [[5.4, 1], [9.6, 2.8]]); B2F.line(ctx, '#2a1e14', 1.7, [[7.4, 2], [6.6, 4.6]]); ell(ctx, 7, 2.6, 1.5, 1.5, '#6a6458'); // the sword, held low; a gauntleted fist
    h.head('#a6886c', 4.1, -11.4); h.look('rgba(16,10,8,.9)', -11.8); ctx.fillStyle = 'rgba(40,24,16,.4)'; ctx.fillRect(-3.2, -10.2, 1.2, 2.2); // a lean hard face
    B2F.line(ctx, 'rgba(232,206,184,.55)', .5, [[3.2, -13], [1.6, -8.8]]); // an old scar across the cheek
    poly(ctx, [[-3,-9.4],[3.8,-9.4],[3.2,-6.4],[.8,-5.2],[-1.4,-6],[-2.8,-7.6]], '#2a221c'); ctx.fillStyle = 'rgba(140,130,120,.45)'; ctx.fillRect(.4, -6.6, 1.4, .7); // a short dark beard, grey at the chin
    ctx.fillStyle = h.armor('#5a5650', '#1e1c1a'); ctx.beginPath(); ctx.arc(0, -12.4, 5, Math.PI, 0); ctx.fill(); ctx.fillRect(-5, -12.6, 10, 1.4); ctx.fillRect(-5, -12, 1.2, 3.4); ctx.fillRect(4, -12, 1, 2.2); // an open helm, cheek-guards
    ctx.fillStyle = 'rgba(255,250,240,.16)'; ctx.fillRect(-3.6, -16.4, 2.6, .8);
    poly(ctx, [[-7.8,-7.2],[-3,-8.4],[3,-8.4],[7.2,-6.8],[6.4,-4.4],[-6.8,-4.2]], '#5a5248'); ctx.fillStyle = 'rgba(200,190,170,.3)'; for (let i=0;i<8;i++) ctx.fillRect(-7.2 + i*1.75, -7.8 + (i%2)*.6, .6, 2.4); // the grey fur mantle
    ctx.restore(); },

  /* a Domin villager: driven off their own land, gaunt, a shawl over the head, a sack of whatever was left, a stick */
  b3_c5_villager(ctx, h, t, o){ const c = b2Pick(o, [['#6a5e4a', '#5a4e3e'], ['#5a5248', '#6a4a3a'], ['#62584a', '#4e5050'], ['#6e6250', '#5e4a40']]); ctx.save(); ctx.translate(0, .6);
    ctx.fillStyle = '#7a604c'; ctx.fillRect(-3.4, 5, 1.7, 8); ctx.fillRect(1.6, 5, 1.7, 8); ctx.fillStyle = '#4a3e30'; ctx.fillRect(-3.6, 10.4, 2.1, 2.6); ctx.fillRect(1.4, 10.4, 2.1, 2.6); // thin legs, feet bound in rags
    ell(ctx, -6.2, -1, 3.4, 4.2, '#7a6a4c'); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-8.4, 1.2, 4.4, .6); B2F.line(ctx, '#3a2e20', .7, [[-5, -4.6], [2.4, 2.4]]); // a sack on the back, its cord across the chest
    poly(ctx, [[-4.6,-5.6],[4.6,-5.6],[5.6,6],[4.2,8.4],[2.2,7.2],[0,8.6],[-2.4,7.2],[-4.4,8.6],[-5.6,6]], h.armor(c[0], '#1c1812')); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(-.2, -3, .5, 10); ctx.fillRect(-4.6, 2.4, 9.2, .8); // a long smock, patched, tied with cord
    ctx.fillStyle = 'rgba(255,240,210,.08)'; ctx.fillRect(2.4, -1, 2.4, 2.2);
    ctx.fillStyle = '#7a604c'; ctx.fillRect(4, -4.6, 1.4, 7); B2F.line(ctx, '#5a4430', 1.2, [[5.6, 2.4], [7.4, 13]]); // a thin arm, and the stick it leans on
    h.head('#a08872', 3.7, -10.4); ctx.fillStyle = 'rgba(30,18,10,.42)'; ctx.fillRect(-2.6, -9, 1.2, 2.2); ctx.fillRect(2, -9, 1.2, 2.2); h.look('rgba(20,12,8,.82)', -10.6); ctx.fillStyle = 'rgba(60,40,40,.4)'; ctx.fillRect(-.8, -9.6, 1.4, .5); ctx.fillRect(2, -9.6, 1.4, .5); // hollow cheeks, eyes gone dull
    ctx.fillStyle = c[1]; ctx.beginPath(); ctx.arc(0, -11.2, 4.9, Math.PI*.92, Math.PI*2.08); ctx.fill(); poly(ctx, [[-4.9,-11.6],[-1.6,-11.6],[-3.6,-3.4],[-6.6,-4.4]], c[1]); poly(ctx, [[4.9,-11.4],[3.6,-11.4],[4.6,-5.6],[6,-6]], c[1]); // the shawl over the head and shoulders
    ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(-4.6, -12, 9.2, .8);
    ctx.restore(); },

  /* a Malazan cadre mage: dark slate robes over a soldier's boots, the cadre badge at the throat, a satchel; one hand up, and water answering it */
  b3_c5_mage(ctx, h, t, o){ const p = o.still ? .5 : (Math.sin(t/520 + (o.phase||0)) + 1)/2;
    h.legs('#24222a'); ctx.fillStyle = '#2e241a'; ctx.fillRect(-4.6, 10, 3.6, 3); ctx.fillRect(1, 10, 3.6, 3); // soldier's boots under it
    B2F.robe(ctx, h, '#3e4654', '#12161e', 6, 7.6); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-.3, -2, .6, 13); ctx.fillStyle = '#6a3a2a'; ctx.fillRect(-7.2, 10.8, 14.4, .9); // the robe, a rust hem
    ctx.fillStyle = '#2a2018'; ctx.fillRect(-6, 2.6, 12, 1.1); ell(ctx, -6.4, 4.8, 2.4, 2.8, h.armor('#5a4630', '#221810')); B2F.line(ctx, '#3a2a1a', .8, [[-5.6, 2.4], [4.4, -5.4]]); // belt, satchel and its strap
    poly(ctx, [[-6.6,-6.6],[6.6,-6.6],[5.6,-3.6],[-5.6,-3.6]], '#2a3038'); // a short cape over the shoulders
    ell(ctx, 0, -4.4, 1.4, 1.4, '#c8c8c0'); ell(ctx, 0, -4.4, .7, .7, '#5a6a8a'); // the cadre badge
    h.head('#b08a6c', 4.1, -11.4); h.look('rgba(20,12,8,.9)', -11.8); ctx.fillStyle = 'rgba(40,24,16,.3)'; ctx.fillRect(-3.4, -10.2, 1.2, 2); // intent
    poly(ctx, [[-2.8,-9],[3.6,-9],[3,-6.8],[.6,-5.8],[-1.6,-6.6]], '#3a2a20'); // a close beard
    B2F.cap(ctx, '#2a1e16', 4.2, -12.6, 1.04, 1.96); ctx.fillStyle = 'rgba(255,240,220,.12)'; ctx.fillRect(-2.4, -15.4, 2.4, .7); // cropped hair
    B2F.line(ctx, '#3e4654', 2, [[4.4, -4.4], [8.6, -9], [9.6, -13.6]]); ell(ctx, 9.8, -14.4, 1.4, 1.5, '#b08a6c'); // the arm up, the hand open
    glow(ctx, 9.8, -15.4, 6 + p*2, '#8ac4e8', .25 + p*.18); ctx.strokeStyle = `rgba(170,214,240,${(.45 + p*.3).toFixed(2)})`; ctx.lineWidth = .7; // water gathering in it, turning
    ctx.beginPath(); ctx.ellipse(9.8, -15.6, 3.4, 1.4, -.3 + p*.5, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.ellipse(9.8, -16.6, 2, .9, .4 - p*.5, 0, 5); ctx.stroke();
    ell(ctx, 9.4 + p*1.4, -18.6 + p, .5, .7, 'rgba(210,236,250,.8)'); },
});

/* ---------------- ground: TILEX.b3_c5_domin — the Domin south of the Catlin, stripped ahead of the army ----------------
   '.' dead earth, ',' stubble (fields cut to the ground and burnt), '#' ruin wall (blocks), 'F' smoulder (blocks), 'w' well,
   'x' dead tree, '~' river (blocks), '-' ford; anything else is earth with Book One's exit arrows. N = night (blue-black). */
const b3c5W = c => c === '~' || c === '-' || c === 'o', b3c5Dep = c => c === '~' || c === 'o' ? 2 : c === '-' ? .9 : 0; // battle maps write the deep river as 'o'
const b3c5P = N => N ? {earth:'#24221e', earthL:'#302c26', crack:'rgba(0,0,0,.4)', ash:'rgba(140,146,160,.16)', straw:'#3a3628', strawD:'#1e1c16', stone:'#36342f', stoneL:'#4a4740', mortar:'#1a1916', char:'#0c0a08', bark:'#14110e', lit:'170,184,214', wetRGB:'8,10,14',
                         w0:'#2a3038', w1:'#1c222c', w2:'#0e131c', glint:'rgba(150,170,210,.22)', lip:'rgba(150,164,190,.22)', rope:'#3a3428', wood:'#2a2018'}
                       : {earth:'#5c5446', earthL:'#6e6656', crack:'rgba(30,22,14,.38)', ash:'rgba(200,198,190,.22)', straw:'#8e8258', strawD:'#4a4230', stone:'#6e6a60', stoneL:'#8e8a7e', mortar:'#3e3a32', char:'#1e1a16', bark:'#2e2620', lit:'236,232,220', wetRGB:'40,32,22',
                         w0:'#6e6a5a', w1:'#56584e', w2:'#363c3a', glint:'rgba(220,222,214,.3)', lip:'rgba(226,222,206,.3)', rope:'#8a7a5a', wood:'#4a3826'};
function b3c5Domin(ctx, ch, x, y, T, N){
  const px = x*T, py = y*T, h = hash(x, y), P = b3c5P(N), fill = c => { ctx.fillStyle = c; ctx.fillRect(px, py, T, T); };
  const earth = () => { fill(shade(P.earth, (h - .5)*.05)); b2Mottle(ctx, x, y, T, N ? .025 : .06, N ? .22 : .18, P.lit, 1.3);
    ctx.strokeStyle = P.crack; ctx.lineWidth = Math.max(1, T*.018); ctx.lineCap = 'round'; for (let i=0;i<2;i++){ let cx = px + hash(x,y,i+3)*T, cy = py + hash(y,x,i+4)*T; ctx.beginPath(); ctx.moveTo(cx, cy); for (let k=0;k<3;k++){ cx += (hash(x,y,i*7+k+5) - .5)*T*.4; cy += (hash(y,x,i*7+k+6) - .3)*T*.3; ctx.lineTo(cx, cy); } ctx.stroke(); } ctx.lineCap = 'butt'; // dry cracks
    ctx.fillStyle = P.ash; for (let i=0;i<5;i++) ctx.fillRect(px + hash(x,y,i+20)*T, py + hash(y,x,i+21)*T, Math.max(1, T*.05), Math.max(1, T*.025)); // ash blown over it
    ctx.fillStyle = N ? '#14120f' : '#433c30'; for (let i=0;i<4;i++) ctx.fillRect(px + hash(x,y,i+24)*T, py + hash(y,x,i+25)*T, Math.max(1, T*.035), Math.max(1, T*.035));
    if (h > .78) { ctx.fillStyle = N ? 'rgba(10,9,8,.5)' : 'rgba(40,32,24,.35)'; for (let i=0;i<3;i++) ell(ctx, px + T*(.2 + i*.28), py + T*(.4 + hash(x,y,i+28)*.2), T*.06, T*.035, ctx.fillStyle); } // hoofprints going south
    if (!b3c5W(ch)) b2WetEdges(ctx, x, y, T, b3c5W, P.wetRGB, N ? .45 : .5, .36); };
  const stubble = () => { earth(); const fe = [[0,-1],[1,0],[0,1],[-1,0]].map(([dx, dy]) => { const c = b2Tile(x + dx, y + dy); return c === null || c === ','; }); b2Soft(ctx, px + T*.5, py + T*.5, T*.7, .8, N ? '58,54,40' : '142,130,88', .35);
    ctx.lineWidth = Math.max(1, T*.022); for (let r=0;r<4;r++){ const ry = py + T*(.14 + r*.24) + (hash(x, r, 9) - .5)*T*.04; for (let i=0;i<7;i++){ const sx = px + T*(i + .3 + hash(x,y,r*9+i)*.4)/7, l = T*(.04 + hash(y,x,r*9+i)*.05), burnt = hash(x,y,r*9+i+50) > .55;
      const ex = sx - px, ey = ry - py, fade = (!fe[3] && ex < T*.18) || (!fe[1] && ex > T*.82) || (!fe[0] && ey < T*.14) || (!fe[2] && ey > T*.86); if (fade && hash(x,y,r*9+i+70) > .35) continue; // the field's edge, ragged
      ctx.strokeStyle = burnt ? P.char : P.straw; ctx.beginPath(); ctx.moveTo(sx, ry); ctx.lineTo(sx + l*.25, ry - l); ctx.stroke(); } // stalks cut to the ground, rows of them, half burnt black
      ctx.fillStyle = P.strawD; ctx.fillRect(px + (fe[3] ? 0 : T*.12), ry + T*.01, T - (fe[3] ? 0 : T*.12) - (fe[1] ? 0 : T*.12), Math.max(1, T*.012)); } };
  const water = () => { earth(); ctx.fillStyle = `rgba(${P.wetRGB},${N ? .5 : .55})`; ctx.fillRect(px, py, T, T);
    const wcol = v => v <= 1 ? b2Mix(P.w0, P.w1, v) : b2Mix(P.w1, P.w2, v - 1), S = b2WaterShape(x, y, T, b3c5W, 1.2); ctx.save(); S.path(ctx); ctx.clip(); b2WaterFill(ctx, x, y, T, b3c5Dep, wcol);
    const flowH = (() => { let hz = 0, vt = 0; for (let k=-3;k<=3;k++){ if (b3c5W(b2Tile(x + k, y))) hz++; if (b3c5W(b2Tile(x, y + k))) vt++; } return hz >= vt; })();
    ctx.lineCap = 'round'; for (let i=0;i<3;i++){ const sx = px + hash(x,y,i+40)*T, sy = py + hash(y,x,i+41)*T, len = T*(.2 + hash(x,y,i+42)*.3), wob = T*.03*(hash(x,y,i+43) - .5);
      ctx.strokeStyle = P.glint; ctx.lineWidth = Math.max(1, T*.02); ctx.beginPath(); if (flowH) { ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + len/2, sy + wob, sx + len, sy); } else { ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx + wob, sy + len/2, sx, sy + len); } ctx.stroke(); } // the current
    if (ch === '-') { for (let i=0;i<3;i++){ const cx = px + T*(.15 + hash(x,y,i+60)*.7), cy = py + T*(.15 + hash(y,x,i+61)*.7), r = T*(.05 + hash(x,y,i+62)*.05); ell(ctx, cx, cy, r*1.4, r, N ? 'rgba(54,54,56,.7)' : 'rgba(110,100,84,.75)'); ell(ctx, cx - r*.3, cy - r*.3, r*.6, r*.35, N ? 'rgba(120,130,150,.2)' : 'rgba(220,212,190,.35)');
        ctx.strokeStyle = P.glint; ctx.lineWidth = 1; ctx.beginPath(); if (flowH) { ctx.moveTo(cx + r*1.4, cy - r*.4); ctx.quadraticCurveTo(cx + r*2.6, cy, cx + r*3.6, cy - r*.2); } else { ctx.moveTo(cx - r*.4, cy + r); ctx.quadraticCurveTo(cx, cy + r*2.2, cx - r*.2, cy + r*3.2); } ctx.stroke(); } // stones of the ford breaking the water
      ctx.fillStyle = N ? 'rgba(40,34,26,.35)' : 'rgba(110,90,60,.3)'; ctx.fillRect(px, py + T*.3, T, T*.4); } // churned mud carried across by a thousand feet
    ctx.lineCap = 'butt'; b2Mottle(ctx, x, y, T, N ? .03 : .06, .08, N ? '150,170,220' : '240,244,250', 1); ctx.restore();
    b2Lip(ctx, S, T, N ? 'rgba(0,0,0,.4)' : 'rgba(40,30,18,.45)', P.lip); b2BankCorners(ctx, x, y, T, b3c5W, `rgba(${P.wetRGB},.6)`, 1.2);
    if (ch === '-' && h > .5) { const sx = px + T*(.3 + hash(x,y,80)*.4); ctx.fillStyle = P.wood; ctx.fillRect(sx, py + T*.1, Math.max(2, T*.05), T*.34); ctx.fillStyle = N ? '#3a3020' : '#a89a6a'; ctx.fillRect(sx - T*.02, py + T*.1, T*.09, T*.04); } }; // a withy stake marking the ford
  if (ch === '~' || ch === '-') { water(); b2Firelit(ctx, x, y, T, N ? .2 : .06, 3); return; }
  if (ch === '#') { earth(); // a burnt farm's wall: fieldstone, the top fallen, a blackened beam across it
    const by = py + T*.92, n = 4; ell(ctx, px + T*.5, by + T*.02, T*.52, T*.08, 'rgba(0,0,0,.4)');
    for (let r=0;r<n;r++){ const rh = T*.2, ry = by - (r + 1)*rh, drop = r === n - 1 ? hash(x,y,90)*.6 : 0; for (let i=0;i<4;i++){ const sx = px + (i + (r%2)*.5 - .25)*T/4, sw = T/4 - 1; if (r === n - 1 && hash(x,y,i+91) < drop + .2) continue;
        ctx.fillStyle = shade(P.stone, (hash(x + i, y + r, 92) - .5)*.18); ctx.fillRect(Math.max(px, sx), ry, Math.min(sw, px + T - Math.max(px, sx)), rh - 1); ctx.fillStyle = P.stoneL; ctx.fillRect(Math.max(px, sx), ry, Math.min(sw, px + T - Math.max(px, sx)), Math.max(1, T*.03)); } }
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(px, py + T*.56, T, T*.36); ctx.fillStyle = N ? 'rgba(0,0,0,.45)' : 'rgba(20,14,10,.45)'; ctx.fillRect(px + T*hash(x,y,93)*.5, py + T*.16, T*.5, T*.44); // soot, up the face of it
    if (h > .45) { ctx.save(); ctx.translate(px + T*.5, py + T*.34); ctx.rotate((hash(x,y,94) - .5)*.8); ctx.fillStyle = P.char; ctx.fillRect(-T*.56, -T*.05, T*1.12, T*.1); ctx.fillStyle = N ? 'rgba(120,60,30,.18)' : 'rgba(80,60,44,.6)'; for (let i=0;i<5;i++) ctx.fillRect(-T*.5 + i*T*.22, -T*.05, T*.1, T*.03); ctx.restore(); } // a roof-beam, charred, fallen across
    b2Firelit(ctx, x, y, T, N ? .28 : .1, 3); return; }
  if (ch === ',') stubble(); else earth();
  if (ch === 'F') { const cx = px + T*.5, cy = py + T*.62; // a smoulder: a farm's last heap, black, embers breathing in it, smoke going straight up
    ell(ctx, cx, cy + T*.1, T*.44, T*.16, 'rgba(0,0,0,.4)'); ell(ctx, cx, cy, T*.38, T*.2, P.char); ell(ctx, cx - T*.08, cy - T*.06, T*.2, T*.1, N ? '#1a1410' : '#2e2620');
    for (let i=0;i<4;i++){ ctx.save(); ctx.translate(cx + (hash(x,y,i+100) - .5)*T*.5, cy + (hash(x,y,i+101) - .5)*T*.16); ctx.rotate((hash(x,y,i+102) - .5)*2); ctx.fillStyle = P.char; ctx.fillRect(-T*.2, -T*.025, T*.4, T*.05); ctx.restore(); } // beam-ends
    glow(ctx, cx, cy, T*.36, '#ff6a20', N ? .4 : .22); for (let i=0;i<7;i++){ ctx.fillStyle = i%3 ? 'rgba(255,120,40,.85)' : 'rgba(255,200,110,.9)'; ctx.fillRect(cx + (hash(x,y,i+110) - .5)*T*.5, cy + (hash(x,y,i+111) - .5)*T*.22, Math.max(1, T*.03), Math.max(1, T*.02)); } // embers
    poly(ctx, [[cx - T*.05, cy - T*.04], [cx, cy - T*.18], [cx + T*.05, cy - T*.04]], 'rgba(255,140,50,.75)');
    for (let i=0;i<3;i++) b2Soft(ctx, cx + (i - 1)*T*.06 + i*T*.04, cy - T*(.3 + i*.2), T*(.14 + i*.05), 1.2, N ? '60,62,70' : '120,116,108', .4 - i*.08); } // smoke
  else if (ch === 'w') { const cx = px + T*.5, cy = py + T*.6, r = T*.3; // a well: a ring of stones, a crossbar, the rope still on it
    ell(ctx, cx, cy + T*.12, r*1.3, r*.5, 'rgba(0,0,0,.4)'); ell(ctx, cx, cy, r*1.08, r*.62, P.stone); ell(ctx, cx, cy - T*.02, r*.78, r*.4, '#06070a'); ell(ctx, cx + r*.1, cy, r*.4, r*.14, N ? 'rgba(90,110,150,.25)' : 'rgba(150,160,170,.35)'); // dark water, far down
    for (let i=0;i<8;i++){ const a = Math.PI + i/7*Math.PI; ctx.fillStyle = i%2 ? P.stoneL : shade(P.stone, .08); ctx.fillRect(cx + Math.cos(a)*r*.92 - T*.04, cy + Math.sin(a)*r*.52 - T*.03, T*.08, T*.05); }
    ctx.fillStyle = P.wood; ctx.fillRect(cx - r*1.05, cy - T*.42, T*.05, T*.42); ctx.fillRect(cx + r*.95, cy - T*.42, T*.05, T*.42); ctx.fillRect(cx - r*1.05, cy - T*.44, r*2.1, T*.05); // the posts and crossbar
    B2F.line(ctx, P.rope, Math.max(1, T*.02), [[cx, cy - T*.4], [cx, cy - T*.04]]); ctx.fillStyle = P.wood; ctx.fillRect(cx - T*.06, cy - T*.1, T*.12, T*.08); } // the rope, a bucket
  else if (ch === 'x') { const cx = px + T*(.42 + hash(x,y,120)*.16), by = py + T*.94; // a dead tree: an orchard tree girdled and left, or burnt standing
    ell(ctx, cx, by, T*.18, T*.05, 'rgba(0,0,0,.35)'); ctx.lineCap = 'round';
    const br = (x0, y0, a, l, w, d) => { const x1 = x0 + Math.cos(a)*l, y1 = y0 + Math.sin(a)*l; ctx.strokeStyle = P.bark; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); if (d > 0) { br(x1, y1, a - .5 - hash(x, y, d*3)*.3, l*.68, w*.62, d - 1); br(x1, y1, a + .45 + hash(y, x, d*3)*.3, l*.62, w*.6, d - 1); } };
    br(cx, by, -Math.PI/2 + (hash(x,y,121) - .5)*.2, T*.34, Math.max(2, T*.09), 3); ctx.lineCap = 'butt';
    ctx.fillStyle = N ? 'rgba(80,90,110,.18)' : 'rgba(200,190,170,.25)'; ctx.fillRect(cx - T*.035, by - T*.26, T*.02, T*.24); } // the bark stripped on the lit side
  else if (ch !== '.' && ch !== ',') exitArrow(ctx, ch, px, py, T);
  b2Firelit(ctx, x, y, T, N ? .28 : .1, 3);
}
TILEX.b3_c5_domin = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c5Domin(ctx, ch, x, y, T, !!dark));
TILEX.b3_c5_domin_night = (ctx, ch, x, y, T, dark) => b2Clip(ctx, x, y, T, () => b3c5Domin(ctx, ch, x, y, T, true));
/* on a battle map the engine draws 'o' as a pit (25 drawFeature); on this ground it is the river, so draw it as the river */
{ const _feat = drawFeature; drawFeature = function(ctx, ch, x, y, T, dark, style, map){ if (ch === 'o' && (style === 'b3_c5_domin' || style === 'b3_c5_domin_night')) return b2Clip(ctx, x, y, T, () => b3c5Domin(ctx, '~', x, y, T, style === 'b3_c5_domin_night' || !!dark)); return _feat(ctx, ch, x, y, T, dark, style, map); }; }

/* ---------------- backdrops: SCENEX[kind](canvas, t) ---------------- */
/* a low grey sky with a few torn darker clouds in it */
function b3c5Sky(x, W, H, hz, top, mid, low, seed){ x.fillStyle = vgrad(x, 0, hz, [[0, top], [.55, mid], [1, low]]); x.fillRect(0, 0, W, hz + 2);
  for (let i=0;i<9;i++){ const cx = hash(i, seed)*W, cy = hz*(.12 + hash(i, seed + 1)*.6), w = W*(.12 + hash(i, seed + 2)*.22); x.fillStyle = `rgba(20,22,28,${(.08 + hash(i, seed + 3)*.12).toFixed(3)})`; x.beginPath(); x.ellipse(cx, cy, w, 4 + hash(i, seed + 4)*8, 0, 0, 7); x.fill(); } }
/* a low far land-line, a few dead trees and broken farms on it */
function b3c5Far(x, W, H, hz, col, seed){ x.fillStyle = col; x.beginPath(); x.moveTo(0, hz + 2); for (let px=0; px<=W; px+=6) x.lineTo(px, hz - 3 - 3*Math.sin(px/53 + seed) - 2*Math.sin(px/17 + seed*2)); x.lineTo(W, hz + 2); x.closePath(); x.fill();
  for (let i=0;i<10;i++){ const px = hash(i, seed + 5)*W, by = hz - 2; if (hash(i, seed + 6) > .5) { x.fillRect(px, by - 6, 1, 6); x.fillRect(px - 2, by - 5, 2, .8); x.fillRect(px + 1, by - 7, 2, .8); } else { x.fillRect(px, by - 4, 6, 4); x.beginPath(); x.moveTo(px - 1, by - 4); x.lineTo(px + 2, by - 7); x.lineTo(px + 3, by - 5); x.fill(); } } }
/* rain, slanting: a still sheet in the layer, the falling streaks in the frame */
function b3c5Rain(ctx, W, H, t, mo, n, a){ ctx.strokeStyle = `rgba(200,210,220,${a})`; ctx.lineWidth = .8; ctx.beginPath();
  for (let i=0;i<n;i++){ const sp = 1 + hash(i, 7)*.6, k = ((t*mo/700*sp + hash(i, 8)) % 1), px = (hash(i, 9)*W*1.2 - k*H*.25), py = k*H*1.1 - 10; ctx.moveTo(px, py); ctx.lineTo(px - 3, py + 10); } ctx.stroke(); }

/* the Catlin crossing: a wide brown river under a low sky, the stone bridge broken in the middle, the army fording below it at the stakes */
SCENEX.b3_c5_catlin = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42, fb = H*.5, nb = H*.74;
  ctx.drawImage(sceneLayer('b3c5:catlin', W, H, (x, W, H) => {
    b3c5Sky(x, W, H, hz, '#2a2e34', '#5e636a', '#9a9a94', 11); glow(x, W*.72, hz - H*.1, W*.3, '#d8d4c8', .25);
    b3c5Far(x, W, H, hz, '#4a4c4a', 3); x.fillStyle = '#4a463a'; x.fillRect(0, hz, W, fb - hz); // the far bank: the Domin, flat and empty
    for (let i=0;i<40;i++){ x.fillStyle = `rgba(30,28,24,${(.15 + hash(i, 21)*.2).toFixed(2)})`; x.fillRect(hash(i, 22)*W, hz + hash(i, 23)*(fb - hz), 4 + hash(i, 24)*10, 1); } // furrows of a field nobody harvested
    x.fillStyle = vgrad(x, fb, nb, [[0,'#8a8a84'],[.2,'#74746c'],[.7,'#5a5a52'],[1,'#46463e']]); x.fillRect(0, fb, W, nb - fb); // the river, brown and broad and slow
    x.fillStyle = '#4a4436'; x.beginPath(); x.moveTo(0, fb); for (let px=0; px<=W; px+=8) x.lineTo(px, fb + 1.5 + Math.sin(px/31)*1.2); x.lineTo(W, fb - 1); x.closePath(); x.fill(); // the far bank's muddy lip
    for (let i=0;i<60;i++){ const py = fb + 4 + Math.pow(hash(i, 31), 1.3)*(nb - fb - 8), px = hash(i, 32)*W, d = (py - fb)/(nb - fb); x.fillStyle = `rgba(210,206,190,${(.08 + d*.1).toFixed(2)})`; x.fillRect(px, py, 6 + d*24, .8 + d*.6); } // the sky lying on the water
    // the ford: churned mud both banks, a double line of stakes across the water
    const fx0 = W*.4, fx1 = W*.5; x.fillStyle = '#4e4434'; x.beginPath(); x.ellipse(fx0 + W*.02, fb + 1, W*.07, H*.018, 0, 0, 7); x.fill(); x.beginPath(); x.ellipse(fx1, nb - 2, W*.1, H*.03, 0, 0, 7); x.fill();
    x.fillStyle = 'rgba(110,94,66,.55)'; x.beginPath(); x.moveTo(fx0 - W*.02, fb); x.lineTo(fx0 + W*.05, fb); x.lineTo(fx1 + W*.07, nb); x.lineTo(fx1 - W*.08, nb); x.closePath(); x.fill(); // the shallows, brown with stirred mud
    for (let i=0;i<9;i++){ const k = i/8, d = k; [-1, 1].forEach(s => { const sx = lerp(fx0, fx1, k) + s*lerp(W*.03, W*.075, k), sy = lerp(fb, nb, k); x.fillStyle = '#2e2618'; x.fillRect(sx, sy - (3 + d*8), 1 + d*1.4, 3 + d*8); x.fillStyle = 'rgba(220,214,190,.3)'; x.fillRect(sx - 1, sy, 3 + d*3, .8); }); } // the stakes, a wake at each
    // the near bank: mud, ruts, reeds broken down
    x.fillStyle = vgrad(x, nb - 4, H, [[0,'#4a4234'],[.3,'#3a3428'],[1,'#16130e']]); x.beginPath(); x.moveTo(0, nb + 2); for (let px=0; px<=W; px+=8) x.lineTo(px, nb - 1 + Math.sin(px/41)*1.6); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill();
    for (let i=0;i<120;i++){ const py = nb + Math.pow(hash(i, 51), 1.2)*(H - nb), px = hash(i, 52)*W, d = (py - nb)/(H - nb); x.fillStyle = i%3 ? 'rgba(20,16,10,.35)' : 'rgba(140,124,96,.18)'; x.beginPath(); x.ellipse(px, py, 2 + d*6, .6 + d*1.4, 0, 0, 7); x.fill(); } // ruts and boot-churn
    for (let i=0;i<34;i++){ const px = hash(i, 61)*W, by = nb + hash(i, 62)*6; if (Math.abs(px - fx1) < W*.1) continue; x.strokeStyle = i%2 ? '#5a5436' : '#3e3a26'; x.lineWidth = 1; x.beginPath(); x.moveTo(px, by); x.lineTo(px + (hash(i, 63) - .3)*8, by - 4 - hash(i, 64)*8); x.stroke(); } // reeds, trodden flat near the ford
    // the bridge: stone arches going out from our bank on the right to the far one, the middle spans gone into the river, the far end standing alone
    { const BX = k => lerp(W*.97, W*.6, Math.pow(k, .75)), BY = k => lerp(nb + 1, fb + 1, Math.pow(k, .75)), HD = k => lerp(H*.24, H*.04, Math.pow(k, .6)), TH = k => lerp(H*.05, H*.01, Math.pow(k, .6));
      const N = 6, gone = new Set([2, 3]);
      for (let s=N-1; s>=0; s--){ const k0 = s/N, k1 = (s + 1)/N, x0 = BX(k0), x1 = BX(k1), y0 = BY(k0), y1 = BY(k1), h0 = HD(k0), h1 = HD(k1), t0 = TH(k0), t1 = TH(k1);
        if (gone.has(s)) { if (s === 3) { x.fillStyle = '#3e3c36'; poly(x, [[x1 - 3, y1], [x1 - 2, y1 - h1*.5], [x1 + 1, y1 - h1*.3], [x1 + 4, y1 - h1*.55], [x1 + 5, y1]], '#3e3c36'); } // a pier's stump in the current
          continue; }
        const brokeL = gone.has(s + 1), brokeR = gone.has(s - 1); // which end hangs over nothing
        // the side face toward us, an arch cut out of it
        x.fillStyle = s%2 ? '#2e2c28' : '#2a2824'; x.beginPath(); x.moveTo(x0, y0 - h0); x.lineTo(x1, y1 - h1);
        if (brokeL) { const mx = lerp(x1, x0, .3), my = lerp(y1, y0, .3); x.lineTo(mx, lerp(y1 - h1, y0 - h0, .3) + h1*.4); x.lineTo(lerp(x1, x0, .45), lerp(y1 - h1, y0 - h0, .45) + h0*.25); x.lineTo(lerp(x1, x0, .55), my - h1*.1); x.lineTo(lerp(x1, x0, .6), lerp(y1, y0, .6)); }
        else x.lineTo(x1, y1);
        const ax0 = lerp(x0, x1, .14), ax1 = lerp(x0, x1, brokeL ? .62 : .86), ay0 = lerp(y0, y1, .14), ay1 = lerp(y0, y1, brokeL ? .62 : .86), ah = lerp(h0, h1, .5)*.62;
        x.lineTo(ax1, ay1); x.quadraticCurveTo((ax0 + ax1)/2, (ay0 + ay1)/2 - ah*1.5, ax0, ay0);
        if (brokeR) { x.lineTo(lerp(x0, x1, .1), y0 - h0*.4); x.lineTo(x0 + 2, y0 - h0*.75); }
        x.lineTo(x0, y0); x.closePath(); x.fill();
        x.strokeStyle = 'rgba(150,146,130,.14)'; x.lineWidth = 1; for (let r=1;r<4;r++){ x.beginPath(); x.moveTo(x0, y0 - h0*(1 - r*.22)); x.lineTo(x1, y1 - h1*(1 - r*.22)); x.stroke(); } // courses
        x.fillStyle = 'rgba(0,0,0,.35)'; x.beginPath(); x.moveTo(ax0, ay0); x.quadraticCurveTo((ax0 + ax1)/2, (ay0 + ay1)/2 - ah*1.5, ax1, ay1); x.quadraticCurveTo((ax0 + ax1)/2 + 3, (ay0 + ay1)/2 - ah*1.2, ax0 + 3, ay0); x.fill(); // the shadow under the arch
        // the deck and its parapet, a lit top edge
        poly(x, [[x0, y0 - h0], [x1, y1 - h1], [x1, y1 - h1 - t1], [x0, y0 - h0 - t0]], '#4a4842'); x.fillStyle = 'rgba(220,216,200,.4)'; x.beginPath(); x.moveTo(x0, y0 - h0 - t0); x.lineTo(x1, y1 - h1 - t1); x.lineTo(x1, y1 - h1 - t1 + 1.2); x.lineTo(x0, y0 - h0 - t0 + 1.2); x.fill();
        for (let k=0;k<6;k++){ const u = (k + .3)/6; if (brokeL && u > .5) continue; const cx = lerp(x0, x1, u), cy = lerp(y0 - h0 - t0, y1 - h1 - t1, u), cw = lerp(t0, t1, u); x.fillStyle = '#3a3834'; x.fillRect(cx, cy - cw*.8, cw*.6, cw*.8); } // the parapet's teeth
        { const g = x.createLinearGradient(0, Math.min(y0, y1), 0, Math.min(y0, y1) + h0*.6); g.addColorStop(0, 'rgba(40,38,32,.35)'); g.addColorStop(1, 'rgba(40,38,32,0)'); x.fillStyle = g; x.fillRect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), h0*.6); } } // its reflection, broken by the current
      { const ax = BX(0), ay = BY(0), ah = HD(0) + TH(0); x.fillStyle = '#2a2824'; x.beginPath(); x.moveTo(ax - 2, ay - ah); x.lineTo(W, ay - ah - 2); x.lineTo(W, H); x.lineTo(ax - W*.03, H); x.lineTo(ax - 4, ay + H*.04); x.closePath(); x.fill(); x.fillStyle = 'rgba(220,216,200,.35)'; x.fillRect(ax - 2, ay - ah - 1, W - ax + 2, 1.2);
        x.strokeStyle = 'rgba(150,146,130,.12)'; x.lineWidth = 1; for (let r=1;r<6;r++){ x.beginPath(); x.moveTo(ax - 3, ay - ah + r*ah*.3); x.lineTo(W, ay - ah + r*ah*.3); x.stroke(); } } // the abutment on our bank, where the road comes down to it
      x.fillStyle = 'rgba(30,28,24,.5)'; for (let i=0;i<9;i++){ const k = (2 + hash(i, 41)*2)/N, sx = BX(k) + (hash(i, 42) - .5)*20, sy = BY(k) + (hash(i, 43) - .3)*8; x.fillRect(sx, sy, 3 + hash(i, 44)*6, 2); } } // fallen blocks breaking the water
  }), 0, 0, W, H);
  // the column crossing: small dark figures and a wagon, wading the stakes, never quite moving and never stopping
  const fx0 = W*.4, fx1 = W*.5;
  for (let i=0;i<9;i++){ const k = ((t*mo/60000 + i/9) % 1), sx = lerp(fx0, fx1, k) + (hash(i, 71) - .5)*W*.02, sy = lerp(fb, nb, k), s = .5 + k*.9; ctx.fillStyle = 'rgba(28,26,22,.9)';
    if (i === 4) { ctx.fillRect(sx - 5*s, sy - 5*s, 10*s, 4*s); ctx.beginPath(); ctx.arc(sx, sy - 5*s, 5*s, Math.PI, 0); ctx.fill(); ell(ctx, sx - 3*s, sy - .6*s, 1.6*s, 1.6*s, '#1e1c18'); ell(ctx, sx + 3*s, sy - .6*s, 1.6*s, 1.6*s, '#1e1c18'); }
    else { ctx.fillRect(sx - 1*s, sy - 6*s, 2*s, 5*s); ell(ctx, sx, sy - 7*s, 1.1*s, 1.1*s, ctx.fillStyle); if (i%2) ctx.fillRect(sx + 1*s, sy - 10*s, .5*s, 8*s); }
    ctx.fillStyle = 'rgba(220,214,196,.35)'; ctx.fillRect(sx - 3*s, sy, 6*s, .7); }
  for (let i=0;i<14;i++){ const k = ((t*mo/(5000 + hash(i, 81)*4000) + hash(i, 82)) % 1), py = fb + 6 + hash(i, 83)*(nb - fb - 12), px = k*W*1.1 - W*.05; ctx.fillStyle = `rgba(226,222,206,${(.18*Math.sin(k*Math.PI)).toFixed(3)})`; ctx.fillRect(px, py, 8 + hash(i, 84)*14, .8); } // the current moving the light along
  for (let i=0;i<3;i++){ const k = ((t*mo/30000 + i/3) % 1); ell(ctx, k*W*1.3 - W*.15, fb + 4 + i*H*.05, W*.18, 4, `rgba(200,200,196,${(.07*Math.sin(k*Math.PI)).toFixed(3)})`); } // mist on the water
  for (let i=0;i<3;i++){ const k = ((t*mo/14000 + i*.37) % 1), bx = W*(.3 + i*.12) + Math.sin(t*mo/900 + i)*20 + k*W*.2, by = H*(.12 + i*.04); ctx.strokeStyle = 'rgba(30,30,34,.7)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx - 4, by - 1); ctx.quadraticCurveTo(bx - 2, by - 3 + Math.sin(t*mo/180 + i)*1.4, bx, by); ctx.quadraticCurveTo(bx + 2, by - 3 + Math.sin(t*mo/180 + i)*1.4, bx + 4, by - 1); ctx.stroke(); } // crows, going the same way
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.07 + i*Math.min(30, W*.4/sq.length), H*.95 - (i%2)*3, 2.1, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* a burnt town under rain: house-shells with their rafters black against the cloud, smoke flattening in the wet, the street a mire */
SCENEX.b3_c5_burnt = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.58;
  const houses = []; for (let i=0;i<7;i++) houses.push({x:W*(-.04 + i*.16 + hash(i, 5)*.04), w:Math.max(W*(.1 + hash(i, 6)*.05), H*(.2 + hash(i, 6)*.08)), h:H*(.18 + hash(i, 7)*.1), roof:hash(i, 8), chim:hash(i, 9) > .55, smoke:hash(i, 10) > .45});
  ctx.drawImage(sceneLayer('b3c5:burnt', W, H, (x, W, H) => {
    b3c5Sky(x, W, H, hz, '#1e2126', '#3e434a', '#62666a', 17);
    x.fillStyle = 'rgba(120,126,134,.18)'; for (let i=0;i<5;i++) x.fillRect(0, hz*(.3 + i*.13), W, hz*.06); // the rain, a grey sheet, far off
    b3c5Far(x, W, H, hz - H*.06, '#3a3c3e', 7); // the land beyond, and other farms that went the same way
    x.fillStyle = '#2a2a28'; x.fillRect(0, hz - H*.06, W, H*.07);
    { const tx = W*.62, ty = hz - H*.34; x.fillStyle = '#2e2e2e'; x.fillRect(tx - W*.02, ty, W*.04, H*.3); x.beginPath(); x.moveTo(tx - W*.03, ty); x.lineTo(tx, ty - H*.08); x.lineTo(tx + W*.03, ty); x.fill(); x.fillStyle = '#0c0c0c'; x.fillRect(tx - 2, ty + H*.04, 4, H*.06); x.fillStyle = 'rgba(160,168,176,.2)'; x.fillRect(tx - W*.02, ty, 2, H*.3); } // a shrine-tower of the Seer's, gutted, its roof gone to a spike of beams
    houses.forEach((hh, i) => { const by = hz + 2, top = by - hh.h, l = hh.x, r = hh.x + hh.w, peak = top - hh.h*.5, c = i%2 ? '#262624' : '#2c2b28', gable = hh.roof > .4, n0 = hash(i, 11)*.6 + .2, nw = .14 + hash(i, 12)*.16, nd = hh.h*(.2 + hash(i, 13)*.35);
      const edge = []; for (let k=0;k<=20;k++){ const u = k/20; let y = gable ? top - (1 - Math.abs(2*u - 1))*(peak - top)*-1 : top + (hash(i, k + 30) - .5)*8;
        if (Math.abs(u - n0) < nw) y += nd*(1 - Math.abs(u - n0)/nw) + (hash(i, k + 50) - .5)*5; // a bite out of it, where it fell in
        edge.push([lerp(l, r, u), y + (k%2 ? 1.2 : -1.2)*hash(i, k + 70)]); }
      const wall = () => { x.beginPath(); x.moveTo(l, by); edge.forEach(p => x.lineTo(p[0], p[1])); x.lineTo(r, by); x.closePath(); };
      wall(); x.fillStyle = c; x.fill(); x.save(); wall(); x.clip();
      x.fillStyle = vgrad(x, peak, by, [[0,'rgba(4,4,4,.75)'],[.5,'rgba(8,8,8,.35)'],[1,'rgba(0,0,0,0)']]); x.fillRect(l, peak - 4, hh.w, by - peak + 4); // soot, thickest at the top where the fire came out
      x.fillStyle = 'rgba(160,166,172,.12)'; x.fillRect(l, peak, 2, by - peak); // rain-wet on the lit edge
      x.fillStyle = '#060606'; x.fillRect(l + hh.w*.2, by - hh.h*.62, hh.w*.18, hh.h*.3); x.fillRect(r - hh.w*.36, by - hh.h*.5, hh.w*.2, hh.h*.5); // a window, a door: holes
      x.restore();
      if (gable) { x.strokeStyle = '#0a0908'; x.lineWidth = 1.6; x.beginPath(); for (let k=1;k<6;k++){ const u = k/6; if (Math.abs(u - n0) < nw*1.2) continue; const rx = lerp(l, r, u), ry = top - (1 - Math.abs(2*u - 1))*(top - peak) - 1; x.moveTo(rx, ry); x.lineTo(rx + (hash(i, k)*10 - 5), ry - 5 - hash(i, k + 9)*8); } x.stroke(); } // rafter-ends, black against the sky, the thatch gone
      if (hh.chim) { x.fillStyle = '#1e1d1c'; x.fillRect(r - hh.w*.22, peak - 6, hh.w*.12, by - peak + 6); x.fillStyle = 'rgba(160,166,172,.1)'; x.fillRect(r - hh.w*.22, peak - 6, 1.4, by - peak + 6); } }); // the chimney, the last thing standing
    // the street: a mire, puddles holding the sky, a cart on its side, a dropped bundle
    x.fillStyle = vgrad(x, hz, H, [[0,'#3a3832'],[.25,'#2e2c26'],[1,'#0e0d0a']]); x.fillRect(0, hz, W, H - hz);
    for (let i=0;i<14;i++){ const py = hz + 6 + Math.pow(hash(i, 31), .9)*(H - hz - 10), px = hash(i, 32)*W, d = (py - hz)/(H - hz); x.fillStyle = `rgba(110,116,124,${(.12 + d*.1).toFixed(2)})`; x.beginPath(); x.ellipse(px, py, 8 + d*34, 1 + d*2.4, 0, 0, 7); x.fill(); x.fillStyle = 'rgba(12,12,14,.5)'; x.fillRect(px - 2, py - .6, 1.4 + d*2, .8 + d*1.4); } // puddles, a wall's reflection standing in each
    for (let i=0;i<90;i++){ const py = hz + Math.pow(hash(i, 41), 1.2)*(H - hz), px = hash(i, 42)*W, d = (py - hz)/(H - hz); x.fillStyle = i%3 ? 'rgba(10,8,6,.4)' : 'rgba(120,110,96,.14)'; x.beginPath(); x.ellipse(px, py, 1.4 + d*5, .5 + d*1.3, 0, 0, 7); x.fill(); }
    { const cx = W*.8, cy = hz + H*.15; ell(x, cx, cy + 3, W*.08, 3, 'rgba(0,0,0,.4)'); poly(x, [[cx - W*.07, cy], [cx + W*.05, cy - H*.02], [cx + W*.06, cy - H*.09], [cx - W*.06, cy - H*.07]], '#1e1a14'); x.fillStyle = 'rgba(120,110,90,.15)'; for (let k=1;k<4;k++) x.fillRect(cx - W*.065 + k*W*.03, cy - H*.075, 1, H*.07); // a cart on its side, the bed toward us
      const wx = cx + W*.035, wy = cy - H*.13, wr = H*.045; x.strokeStyle = '#141210'; x.lineWidth = 2.4; x.beginPath(); x.arc(wx, wy, wr, 0, 7); x.stroke(); x.lineWidth = 1.2; x.beginPath(); for (let k=0;k<7;k++){ const a = k/7*Math.PI*2 + .3; x.moveTo(wx, wy); x.lineTo(wx + Math.cos(a)*wr, wy + Math.sin(a)*wr); } x.stroke(); ell(x, wx, wy, 2.2, 2.2, '#141210'); // one wheel in the air, a spoke gone
      x.strokeStyle = '#1a1612'; x.lineWidth = 2; x.beginPath(); x.moveTo(cx - W*.06, cy - H*.03); x.lineTo(cx - W*.13, cy + H*.03); x.stroke(); } // a shaft in the mud
    { const bx = W*.46, by = hz + H*.24; ell(x, bx, by, W*.018, H*.016, '#3a3226'); ell(x, bx + W*.016, by + 2, W*.01, H*.01, '#4a4030'); } // a bundle, dropped and left
    for (let i=0;i<4;i++){ const px = W*(.3 + i*.18), by = hz + H*(.02 + hash(i, 51)*.04); x.fillStyle = '#141210'; x.fillRect(px, by - H*.08, 2, H*.08); x.fillRect(px - 4, by - H*.07, 4, 1.2); } // fence-posts, charred to points
  }), 0, 0, W, H);
  houses.forEach((hh, i) => { if (!hh.smoke) return; const sx = hh.x + hh.w*.5, sy = hz - hh.h*.8; for (let k=0;k<6;k++){ const q = ((t*mo/9000 + k/6 + i*.13) % 1), r = 6 + q*24; b2Soft(ctx, sx + q*W*.08 + Math.sin(t*mo/2000 + k)*4, sy - q*H*.22, r, .7, '70,72,76', .26*(1 - q)); } // smoke, going sideways in the wet
    glow(ctx, hh.x + hh.w*.74, hz - hh.h*.2, 9, '#ff6a20', .14 + .07*Math.sin(t*mo/400 + i*2)); }); // embers still alive inside
  b3c5Rain(ctx, W, H, t, mo, 140, .22);
  for (let i=0;i<10;i++){ const k = ((t*mo/600 + hash(i, 61)) % 1), px = hash(i, 62 + Math.floor(t*mo/600 + hash(i, 61)))*W, py = hz + 8 + hash(i, 63)*(H - hz - 12); ctx.strokeStyle = `rgba(200,210,220,${(.3*(1 - k)).toFixed(2)})`; ctx.lineWidth = .6; ctx.beginPath(); ctx.ellipse(px, py, 1 + k*6, .4 + k*1.4, 0, 0, 7); ctx.stroke(); } // rings in the puddles
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.08 + i*Math.min(30, W*.4/sq.length), H*.95 - (i%2)*3, 2.1, t, {phase:i, dir:1}));
  ctx.fillStyle = 'rgba(30,34,40,.16)'; ctx.fillRect(0, 0, W, H); vign(ctx, W, H, .8, .5); };

/* the ford, from our bank: a wide grey river at dusk, the far bank low; a man kneeling at its edge, very small, and between the banks the river
   standing up out of itself in a thin grey wall (Q9, Oct 27: the drowning is Shank's, above Coral). Our mages on the near bank, hands up. */
SCENEX.b3_c5_drowned = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4, fb = H*.47, nb = H*.76, kx = W*.66;
  ctx.drawImage(sceneLayer('b3c5:drowned', W, H, (x, W, H) => {
    b3c5Sky(x, W, H, hz, '#141820', '#343c48', '#6e727a', 23); glow(x, W*.3, hz - H*.02, W*.34, '#b8a890', .2); // dusk, the last of it down-river
    b3c5Far(x, W, H, hz, '#262a2e', 13); x.fillStyle = '#2c2e30'; x.fillRect(0, hz, W, fb - hz);
    for (let i=0;i<18;i++){ const px = hash(i, 14)*W; if (Math.abs(px - kx) < W*.06) continue; x.strokeStyle = '#1a1c1c'; x.lineWidth = 1; x.beginPath(); x.moveTo(px, fb); x.lineTo(px + 1, fb - 4 - hash(i, 15)*4); x.stroke(); } // reeds on the far side
    x.fillStyle = vgrad(x, fb, nb, [[0,'#4a5058'],[.4,'#3a4048'],[1,'#22262c']]); x.fillRect(0, fb, W, nb - fb); // the river
    for (let i=0;i<50;i++){ const py = fb + 3 + Math.pow(hash(i, 31), 1.3)*(nb - fb - 6), px = hash(i, 32)*W, d = (py - fb)/(nb - fb); x.fillStyle = `rgba(190,196,204,${(.06 + d*.08).toFixed(2)})`; x.fillRect(px, py, 6 + d*24, .8 + d*.5); }
    x.fillStyle = '#2a2a28'; x.beginPath(); x.moveTo(kx - W*.05, fb + 1); x.quadraticCurveTo(kx, fb - 3, kx + W*.05, fb + 1); x.fill(); // a spit of mud he is on
    // the near bank: dark, reeds standing up against the water, our side
    x.fillStyle = vgrad(x, nb - 6, H, [[0,'#1e2022'],[1,'#08090a']]); x.beginPath(); x.moveTo(0, nb); for (let px=0; px<=W; px+=8) x.lineTo(px, nb - 2 + Math.sin(px/37)*2); x.lineTo(W, H); x.lineTo(0, H); x.closePath(); x.fill();
    for (let i=0;i<60;i++){ const px = hash(i, 41)*W, by = nb + hash(i, 42)*10, l = 8 + hash(i, 43)*16; x.strokeStyle = i%3 ? '#121414' : '#1e2220'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(px, by); x.quadraticCurveTo(px + 2, by - l*.6, px + (hash(i, 44) - .4)*8, by - l); x.stroke(); } // reeds
  }), 0, 0, W, H);
  const p = (Math.sin(t*mo/900) + 1)/2, ky = fb - 1;
  // the man on the far bank, on his knees, bent forward: a silhouette, no more
  ctx.save(); ctx.translate(kx, ky); ctx.scale(1.5, 1.5); ctx.fillStyle = '#0c0d0e'; ctx.beginPath(); ctx.ellipse(0, -3.4, 2.2, 3.2, .5, 0, 7); ctx.fill(); ell(ctx, 1.8, -6.6, 1.3, 1.3, '#0c0d0e'); ctx.fillRect(-3, -1.4, 5, 1.4); ctx.fillRect(1.4, -4, .9, 4); ctx.restore(); // kneeling, a hand on the ground
  // the river standing up out of itself mid-stream in a thin grey wall, between his working and the Host
  const wx0 = W*.3, wx1 = W*.88, wy = fb + (nb - fb)*.42, wh = H*.15 + p*H*.01; ctx.save();
  const wg = ctx.createLinearGradient(0, wy - wh, 0, wy); wg.addColorStop(0, 'rgba(200,220,236,.06)'); wg.addColorStop(.25, 'rgba(176,200,220,.26)'); wg.addColorStop(1, 'rgba(120,140,160,.42)');
  ctx.fillStyle = wg; ctx.beginPath(); ctx.moveTo(wx0, wy); for (let px=wx0; px<=wx1; px+=6){ const e = Math.sin((px - wx0)/(wx1 - wx0)*Math.PI); ctx.lineTo(px, wy - wh*e*(.8 + .2*Math.sin(px/23 + t*mo/700))); } ctx.lineTo(wx1, wy); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = `rgba(226,240,252,${(.3 + p*.15).toFixed(2)})`; ctx.lineWidth = 1; ctx.beginPath(); for (let px=wx0; px<=wx1; px+=6){ const e = Math.sin((px - wx0)/(wx1 - wx0)*Math.PI), py = wy - wh*e*(.8 + .2*Math.sin(px/23 + t*mo/700)); px === wx0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke(); // its lip, catching the last light
  for (let i=0;i<14;i++){ const k = ((t*mo/1300 + hash(i, 61)) % 1), px = wx0 + hash(i, 62)*(wx1 - wx0), e = Math.sin((px - wx0)/(wx1 - wx0)*Math.PI); ctx.strokeStyle = `rgba(210,228,244,${(.35*(1 - k)).toFixed(2)})`; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(px, wy - wh*e*(1 - k)); ctx.lineTo(px, wy - wh*e*(1 - k) + 4); ctx.stroke(); } // water running down its face
  ctx.restore();
  for (let i=0;i<3;i++){ const k = ((t*mo/2400 + i/3) % 1); ctx.strokeStyle = `rgba(200,214,226,${(.3*(1 - k)).toFixed(2)})`; ctx.lineWidth = .8; ctx.beginPath(); ctx.ellipse((wx0 + wx1)/2, wy, (wx1 - wx0)*.5 + k*W*.05, 1.6 + k*H*.02, 0, 0, 7); ctx.stroke(); } // rings going out from where the river rises
  glow(ctx, kx - W*.02, fb, W*.06, '#9ac8e8', .1 + p*.06);
  // our mages on the near bank, backs to us, hands up; and a little behind them, the squad, watching
  ctx.save(); ctx.filter = 'brightness(.36) saturate(.5)'; [[.5, 0], [.57, 1], [.64, 2]].forEach(([u, i]) => { const mx = W*u, my = nb + H*.03 + (i%2)*2; drawFigure(ctx, 'b3_c5_mage', mx, my, 1.35, t, {phase:i, dir:1}); }); ctx.restore();
  [[.5, 0], [.57, 1], [.64, 2]].forEach(([u, i]) => glow(ctx, W*u + 13.2, nb + H*.03 + (i%2)*2 - 20.8 + Math.sin(t*mo/420 + i)*.8, 4.5, '#8ac4e8', .22 + p*.12)); // the water answering their hands, the one light on our side // our mages at the water's edge, near-silhouettes against the water in the dusk
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.06 + i*Math.min(28, W*.36/sq.length), H*.97 - (i%2)*3, 2.1, t, {phase:i, dir:1}));
  for (let i=0;i<3;i++){ const k = ((t*mo/26000 + i/3) % 1); ell(ctx, k*W*1.3 - W*.15, fb + 6 + i*H*.06, W*.2, 4, `rgba(180,190,200,${(.07*Math.sin(k*Math.PI)).toFixed(3)})`); } // mist coming off the water
  vign(ctx, W, H, .82, .5); };

/* the halt at night in a dead village: the Host's small fires everywhere among the shells, and one big fire with very few people round it —
   Brood huge against it, Kallor standing apart, Korlat; the rest of the army keeping its distance */
SCENEX.b3_c5_camp = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, bx = W*.62, by = H*.8;
  const fires = []; for (let i=0;i<26;i++){ const d = Math.pow(hash(i, 3), 1.4); fires.push({x:hash(i, 4)*W, y:hz + 3 + d*H*.2, s:.4 + d*1.1}); }
  ctx.drawImage(sceneLayer('b3c5:camp', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#05070c'],[.6,'#0e1420'],[1,'#1c2230']]); x.fillRect(0, 0, W, hz + 2);
    for (let i=0;i<70;i++){ const a = hash(i, 9); x.fillStyle = `rgba(220,226,240,${(.2 + a*.5).toFixed(2)})`; x.fillRect(hash(i, 7)*W, hash(i, 8)*hz*.8, a > .85 ? 1.4 : .8, a > .85 ? 1.4 : .8); } // stars, thin cloud between
    x.fillStyle = 'rgba(30,34,44,.6)'; for (let i=0;i<5;i++){ x.beginPath(); x.ellipse(hash(i, 11)*W, hz*(.2 + hash(i, 12)*.5), W*.2, 5, 0, 0, 7); x.fill(); }
    b3c5Far(x, W, H, hz, '#0c0e12', 19); x.fillStyle = vgrad(x, hz, H, [[0,'#14161a'],[1,'#060708']]); x.fillRect(0, hz, W, H - hz);
    for (let i=0;i<9;i++){ const hx = W*(i/8.5) + (hash(i, 21) - .5)*W*.06, hw = W*(.05 + hash(i, 22)*.04), hh = H*(.07 + hash(i, 23)*.06), hb = hz + H*(.02 + hash(i, 24)*.06); if (Math.abs(hx - bx) < W*.12) continue;
      x.fillStyle = '#08090b'; x.beginPath(); x.moveTo(hx, hb); x.lineTo(hx, hb - hh); x.lineTo(hx + hw*.3, hb - hh - 3); x.lineTo(hx + hw*.5, hb - hh*.7); x.lineTo(hx + hw*.8, hb - hh - 2); x.lineTo(hx + hw, hb - hh*.8); x.lineTo(hx + hw, hb); x.closePath(); x.fill(); } // the shells of the village, roofless
  }), 0, 0, W, H);
  fires.forEach((f, i) => { const fl = .8 + .2*Math.sin(t*mo/(200 + i*13) + i); glow(ctx, f.x, f.y, 10*f.s, '#ff8a30', .25*fl); ell(ctx, f.x, f.y, 1.2*f.s, .8*f.s, `rgba(255,190,100,${(.8*fl).toFixed(2)})`); }); // the Host's fires, many and small
  // the big fire, and who is round it
  const fl = .85 + .15*Math.sin(t*mo/150) + .05*Math.sin(t*mo/53);
  glow(ctx, bx, by - H*.06, H*.55, '#ff7a28', .22*fl); glow(ctx, bx, by - H*.04, H*.2, '#ffb060', .35*fl);
  ctx.fillStyle = 'rgba(255,150,70,.14)'; ctx.beginPath(); ctx.ellipse(bx, by, W*.24, H*.07, 0, 0, 7); ctx.fill(); // firelight on the ground
  ell(ctx, bx, by + 2, W*.05, H*.02, '#140a06'); for (let i=0;i<3;i++){ const k = i - 1; poly(ctx, [[bx + k*W*.02 - 6, by], [bx + k*W*.012, by - H*(.1 + .04*Math.sin(t*mo/(110 + i*30) + i))*fl], [bx + k*W*.02 + 6, by]], i === 1 ? '#ffc060' : '#e8642a'); }
  for (let i=0;i<10;i++){ const k = ((t*mo/1400 + hash(i, 31)) % 1); ctx.fillStyle = `rgba(255,200,120,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(bx + (hash(i, 32) - .5)*20 + Math.sin(t*mo/300 + i)*4, by - H*.08 - k*H*.35, 1.2, 1.2); } // sparks going up
  drawFigure(ctx, 'korlat', bx - W*.12, by + H*.02, 2.2, t, {phase:1, dir:1}); drawFigure(ctx, 'brood', bx + W*.09, by + H*.04, 2.95, t, {phase:2, dir:-1, still:true}); drawFigure(ctx, 'kallor', bx + W*.26, by - H*.01, 2.15, t, {phase:3, dir:-1, still:true}); // Korlat; Brood, huge against the fire; Kallor, standing off
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.06 + i*Math.min(26, W*.32/sq.length), H*.96 - (i%2)*3, 2.1, t, {phase:i, dir:1}));
  ctx.fillStyle = 'rgba(4,6,12,.18)'; ctx.fillRect(0, 0, W, H); vign(ctx, W, H, .82, .55); };

/* ---------------- items: ART['item/<key>'] — Book One's card style on a cold ground ----------------
   weapons and armour 200×150, trinkets 240×130, as Book Two's. Each picture carries its own gradient ids. */
{ const ground = (k, w, h) => `<defs><radialGradient id="c5-${k}-bg" cx="0.5" cy="0.5" r="0.64"><stop offset="0" stop-color="#2e343c"/><stop offset="1" stop-color="#0a0c10"/></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#c5-${k}-bg)"/>`;
  const svg = (k, label, w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${ground(k, w, h)}${body}</svg>`;
  const B3C5_ITEMS = {
    /* a Barghast blood-iron knife: dark iron with a red sheen in it, a bone grip bound with sinew, a smear of the White Face paint on the guard */
    knife: ['A blood-iron knife', 240, 130, '<circle cx="130" cy="62" r="46" fill="#8a2a1a" opacity=".12"/>'
      + '<path d="M96 88 L190 26 Q200 22 200 28 Q194 38 184 42 L106 98 Z" fill="#544a4c"/><path d="M102 90 L194 27" stroke="#d86a52" stroke-width="1.6" opacity=".8"/><path d="M106 98 L186 42" stroke="#1e1a1c" stroke-width="2" opacity=".6"/>'
      + '<path d="M120 76 L176 38" stroke="#e8f2fa" stroke-width="2.4" stroke-dasharray="3 2 6 3" opacity=".7"/><path d="M130 66 l2 -5 l2 5 l-2 5 Z M160 50 l2 -4 l2 4 l-2 4 Z" fill="#eef6ff" opacity=".7"/>'
      + '<path d="M88 80 L112 104" stroke="#2a2422" stroke-width="7" stroke-linecap="round"/><path d="M88 80 L112 104" stroke="#e8e4da" stroke-width="2.4" stroke-linecap="round" opacity=".7" stroke-dasharray="4 5"/>'
      + '<path d="M56 120 L94 88 L102 98 L64 128 Z" fill="#d8ccb0"/><path d="M62 118 L70 126 M68 112 L76 120 M74 106 L82 114 M80 100 L88 108" stroke="#6a4a2a" stroke-width="2"/><circle cx="58" cy="124" r="5" fill="#c8b896"/>'],
    /* a Pannion chain of office: grey iron links, and a disc of bone carved with an open eye */
    chain: ['A Pannion chain of office', 240, 130, '<path d="M40 18 Q120 88 200 18" fill="none" stroke="#6a6a6c" stroke-width="7" stroke-dasharray="9 4" stroke-linecap="round"/><path d="M40 18 Q120 88 200 18" fill="none" stroke="#b8b8b6" stroke-width="1.2" stroke-dasharray="9 4" opacity=".7"/>'
      + '<rect x="114" y="52" width="12" height="8" rx="2" fill="#5a5a5c"/><circle cx="120" cy="88" r="27" fill="#d8ccb0"/><circle cx="120" cy="88" r="27" fill="none" stroke="#8a7e66" stroke-width="2"/><circle cx="120" cy="88" r="21" fill="none" stroke="#a89a7c" stroke-width="1" opacity=".7"/>'
      + '<path d="M100 88 Q120 72 140 88 Q120 104 100 88 Z" fill="#efe6d0" stroke="#4a3e2c" stroke-width="2.2"/><circle cx="120" cy="88" r="6" fill="#4a3e2c"/><circle cx="118" cy="86" r="1.6" fill="#efe6d0"/>'
      + '<path d="M106 78 L104 74 M113 75 L112 70 M120 74 L120 69 M127 75 L128 70 M134 78 L136 74" stroke="#6a5a42" stroke-width="1.5"/>'],
    /* a Rhivi water-skin: a bhederin bladder stitched with sinew, a bone stopper, a hide strap and one bone bead hung from it */
    skin: ['A Rhivi water-skin', 240, 130, '<g transform="translate(0 8) scale(1 .94)"><path d="M72 50 Q70 30 96 28 Q140 24 160 40 Q186 58 176 88 Q164 114 120 112 Q80 110 70 84 Q64 66 72 50 Z" fill="#6a4a2e"/>'
      + '<path d="M72 50 Q70 30 96 28 Q140 24 160 40 Q186 58 176 88" fill="none" stroke="#8e6a44" stroke-width="3" stroke-dasharray="1 3"/><path d="M80 60 Q120 80 168 66" fill="none" stroke="#3a2614" stroke-width="1.5" stroke-dasharray="3 3"/>'
      + '<path d="M90 106 Q120 118 160 100" stroke="#2a1a0c" stroke-width="3" fill="none" opacity=".5"/><ellipse cx="120" cy="70" rx="30" ry="18" fill="#c8a878" opacity=".08"/>'
      + '<path d="M156 36 L176 18" stroke="#5a3e22" stroke-width="9" stroke-linecap="round"/><rect x="172" y="8" width="10" height="12" rx="3" fill="#e8dcc0" transform="rotate(40 177 14)"/>'
      + '<path d="M74 52 Q40 40 46 16 Q60 4 92 14 L176 20" fill="none" stroke="#3a2614" stroke-width="2.5"/><path d="M64 9 L62 22" stroke="#3a2614" stroke-width="1.2"/><ellipse cx="62" cy="26" rx="3.4" ry="4.4" fill="#e8dcc0"/><path d="M60 24 L64 24" stroke="#a89878" stroke-width="1"/></g>'],
  };
  /* the writer's item ids are matched to a picture by what they are; anything new in this chapter falls back to the nearest */
  const pick = id => /knife|blade|iron|dirk/.test(id) ? 'knife' : /chain|office|priest|pannion/.test(id) ? 'chain' : /skin|water|rhivi|flask/.test(id) ? 'skin' : null;
  const B3C5_ART = (id, label) => { const k = pick(id) || 'knife', [l, w, h, body] = B3C5_ITEMS[k]; return svg(id, label || l, w, h, body); };
  ['b3_c5_knife', 'b3_c5_chain', 'b3_c5_skin'].forEach(id => { ART['item/' + id] ??= B3C5_ART(id); });
}
