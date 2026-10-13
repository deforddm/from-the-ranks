/* ============ Book Two art: Keth, the Foolish Dog's warlock (v5.2) ============ */
/* The figure (FIGX.warlock) is drawn the way 49b draws Nil, a size up and a year or two on: long loose hair, ochre across the eyes,
   a Foolish Dog coat gone from red to dust, a rattle of dog's teeth, and the spirits at his fingers. The bust (POR.warlock) is drawn
   the way 47b draws Sathi: lantern low on the left, an accent rim on the right. */
FIGX.warlock = function(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .9, 1.02); const p = o.still ? .5 : (Math.sin(t/1150 + 2) + 1)/2;
  h.legs('#2a2018'); ctx.fillStyle = '#4a3622'; ctx.fillRect(-4.4, 9.4, 3.2, 3.6); ctx.fillRect(1.2, 9.4, 3.2, 3.6); // hide boots
  poly(ctx, [[-6,-6],[6,-6],[7.4,9.6],[-7.4,9.6]], h.armor('#7e4a30', '#24120a')); // the coat, much too big, the Foolish Dog's red gone to dust
  ctx.fillStyle = 'rgba(214,190,150,.45)'; for (let i=0;i<8;i++) ctx.fillRect(-7 + i*1.9, 9.4, .5, 1.6 + (i%2)*.8); // a fringed hem
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-.4, -5.6, .8, 15); // the coat's edge, open
  ctx.fillStyle = '#5a2a18'; ctx.fillRect(-6.2, 1.8, 12.4, 1.1); // a belt
  B2F.line(ctx, '#3a2a1a', .5, [[3.4, 2.8], [4.6, 7]]); [[4.2, 5.4], [4.8, 6.6], [4.1, 7.6], [4.9, 8.4]].forEach(([x, y]) => poly(ctx, [[x - .4, y], [x + .4, y], [x, y + 1.4]], '#e6dcc4')); // the rattle of dog's teeth at his hip
  ctx.fillStyle = '#120e0c'; ctx.fillRect(-5.2, -12.6, 2.4, 12.6); ctx.fillRect(3, -12.4, 2, 8.4); // long black hair, loose, down his back and over a shoulder
  B2F.line(ctx, '#3a2a1a', .5, [[-3.6, -5.8], [0, -2.8], [3.6, -5.8]]); poly(ctx, [[-.5, -3], [.5, -3], [0, -1.2]], '#e6dcc4'); // one tooth on a thong at the throat
  B2F.line(ctx, '#7e4a30', 1.6, [[4.8, -3.6], [8.6, -7.8 - p*.8]]); ell(ctx, 9, -8.6 - p*.8, 1.2, 1.2, '#8a6448'); // a hand lifted, palm down, asking
  h.head('#8a6448', 4.2, -11.6); B2F.cap(ctx, '#0e0a08', 4.5, -12.8, .98, 2.02);
  ctx.fillStyle = 'rgba(176,80,42,.62)'; ctx.fillRect(-3.4, -12.6, 7.6, 1.7); h.look('rgba(230,222,206,.62)', -12.1); // ochre across the eyes, and old eyes looking out of it
  for (let i=0;i<3;i++){ const a = t/1250 + i*2.1; ell(ctx, 9 + Math.cos(a)*3.2, -9 - i*2.6 + Math.sin(a)*1.3, 1.4, .8, `rgba(200,214,196,${.14 + p*.16})`); } // the spirits, at his fingers
  ctx.restore(); };

/* the bust: fifteen, thin, the Foolish Dog's coat; long loose black hair; ochre across old eyes; a dog's tooth on a thong; the rattle held up in a bony hand; the spirits round it */
POR.warlock = function(ctx){ const F = {cy:-76, w:11.4, h:19.6, jaw:.7, chin:4.2, skin:'#9a7254', iris:'#1e140c', lip:'#7e5040', browCol:'#0e0806', browW:1.3, arch:.75, browL:.4, rim:'#a9b8cc', rimA:.2, nose:1.05, look:-.15, smileL:-.15, smileR:.25, mouthW:3.4, bags:.35};
  // the coat: hide gone from red to dust, fringed at the yoke, open at the throat over a lighter shirt
  PR.torsoPath(ctx, 33, 4); ctx.fillStyle = PR.lit(ctx, '#8a5236', '#2a140a', -33, 24); ctx.fill();
  ctx.save(); PR.torsoPath(ctx, 33, 4); ctx.clip();
  ctx.fillStyle = PR.lit(ctx, '#b8a07a', '#3e3020', -10, 10); PR.path(ctx, [[-8, -46], [8, -46], [5, 4], [-5, 4]]); ctx.fill(); // the shirt, where the coat falls open
  PR.stroke(ctx, 'rgba(20,10,4,.55)', .8, () => { ctx.moveTo(-8, -46); ctx.lineTo(-5, 4); ctx.moveTo(8, -46); ctx.lineTo(5, 4); });
  PR.strands(ctx, 36, ['rgba(214,188,140,.6)', 'rgba(150,104,70,.6)', 'rgba(60,30,16,.6)'], .7, 23, (i, r) => { const k = i/35, x = lerp(-31, 31, k), y = -31 + (1 - Math.pow((k - .5)*2, 2))*6.6; if (Math.abs(x) < 8) return [x, y, x, y, x, y]; return [x, y, x + (r() - .5), y + 3, x + (r() - .5)*1.6, y + 6 + r()*3]; }); // the fringe
  PR.soft(ctx, 22, -18, 16, 14, '#000000', .45); PR.soft(ctx, -20, -36, 12, 7, '#ffe0b0', .1);
  for (let i=0;i<9;i++){ const r = PR.rng(i + 130); PR.soft(ctx, -28 + r()*56, -40 + r()*40, 2 + r()*4, 1.4 + r()*2.4, '#c8b088', .12); } // dust
  ctx.restore();
  PR.neck(ctx, F, 5.6);
  // a dog's tooth on a thong at the throat
  PR.stroke(ctx, '#2a1a0c', .7, () => { ctx.moveTo(-8, -50); ctx.quadraticCurveTo(0, -40, 8, -50); });
  ctx.save(); ctx.translate(0, -42.6); poly(ctx, [[-1.3, 0], [1.3, 0], [.3, 5.4], [-.3, 5.4]], PR.lin(ctx, -1.3, 0, 1.3, 0, [[0,'#f2e8d0'], [.6,'#c8b896'], [1,'#6a604c']])); ctx.restore();
  F.under = (ctx, F) => { PR.soft(ctx, -6, F.cy + 7, 4, 2, '#4a3018', .2); PR.soft(ctx, 0, F.cy - 2, F.w*.9, 3.2, '#6a2a10', .08); };
  PR.face(ctx, F);
  // ochre across the eyes, two fingers wide, the Wickan way: over the eyes and the bridge of the nose, out to the hair
  { const u = F.h/20, y0 = F.cy - 3.4*u, y1 = F.cy + 1.2*u; ctx.save(); ctx.beginPath(); ctx.ellipse(0, F.cy + .4*u, F.w + .6, 22*u, 0, 0, 7); ctx.clip();
    ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = PR.lin(ctx, -F.w, 0, F.w, 0, [[0,'rgba(214,120,64,.7)'], [.5,'rgba(176,82,42,.72)'], [1,'rgba(120,50,22,.75)']]); ctx.fillRect(-F.w - 1, y0, F.w*2 + 2, y1 - y0);
    ctx.globalCompositeOperation = 'source-over'; PR.stroke(ctx, 'rgba(90,30,10,.35)', .5, () => { ctx.moveTo(-F.w, y0 + .2); ctx.lineTo(F.w, y0 - .3); ctx.moveTo(-F.w, y1); ctx.lineTo(F.w, y1 + .3); });
    [-1, 1].forEach(sd => PR.soft(ctx, sd*F.w*.4, F.cy - u, 1.6, .9, '#e8eef4', .18)); ctx.restore(); } // and the eyes old in it
  // long black hair, loose, parted in the middle, down past the shoulders on both sides
  const u = F.h/20, top = F.cy - 21*u; ctx.beginPath(); ctx.moveTo(-12.4, F.cy + 4); ctx.bezierCurveTo(-14, top + 2, -7.4, top - 2, 0, top - 1.6); ctx.bezierCurveTo(7.4, top - 2, 14, top + 2, 12.4, F.cy + 4); ctx.quadraticCurveTo(12, F.cy - 9, 5, F.cy - 13.4); ctx.quadraticCurveTo(1.6, F.cy - 15, 0, F.cy - 14); ctx.quadraticCurveTo(-1.6, F.cy - 15, -5, F.cy - 13.4); ctx.quadraticCurveTo(-12, F.cy - 9, -12.4, F.cy + 4);
  ctx.fillStyle = PR.lin(ctx, -14, 0, 14, 0, [[0,'#3a3232'], [.4,'#141010'], [1,'#040303']]); ctx.fill();
  PR.strands(ctx, 40, ['rgba(110,100,110,.45)', '#1a1414', '#0a0808'], .5, 77, (i, r) => { const sd = i%2 ? 1 : -1, x0 = sd*.4, y0 = F.cy - 14.2 - r()*.6, x1 = sd*(9 + r()*4), y1 = F.cy - 6 + r()*8; return [x0, y0, sd*7, top - .5, x1, y1]; });
  [-1, 1].forEach(sd => { const lit = sd < 0; ctx.beginPath(); ctx.moveTo(sd*11, F.cy - 2); ctx.bezierCurveTo(sd*15, F.cy + 14, sd*16, F.cy + 30, sd*(sd < 0 ? 19 : 17), F.cy + 46); ctx.lineTo(sd*(sd < 0 ? 12 : 11), F.cy + 44); ctx.bezierCurveTo(sd*12, F.cy + 26, sd*11, F.cy + 12, sd*8.4, F.cy + 2); ctx.closePath();
    ctx.fillStyle = PR.lin(ctx, sd*8, 0, sd*18, 0, lit ? [[0,'#2a2222'], [.5,'#141010'], [1,'#3a3232']] : [[0,'#141010'], [1,'#040303']]); ctx.fill();
    PR.strands(ctx, 14, ['#1a1414', '#2e2626', '#080606'], .45, 90 + sd, (i, r) => { const k = i/13, x = sd*(9 + k*7), y = F.cy + k*8; return [x, y, sd*(13 + k*3), F.cy + 20 + r()*6, sd*(12 + k*6 + r()*2), F.cy + 40 + r()*6]; }); });
  // the rattle of dog's teeth held up in his left hand, and the spirits about it
  ctx.fillStyle = PR.lit(ctx, '#8a5236', '#2a140a', -46, -20); PR.path(ctx, [[-46, 4], [-36, 4], [-26, -16], [-33, -21]]); ctx.fill(); // the sleeve
  ctx.fillStyle = PR.lin(ctx, -36, 0, -22, 0, [[0,'#b88a64'], [.6,'#7a5438'], [1,'#2a1a10']]); ctx.beginPath(); ctx.ellipse(-29, -24, 4.6, 6, -.4, 0, 7); ctx.fill(); // the hand, bony
  PR.stroke(ctx, '#3a2a1a', .7, () => { ctx.moveTo(-28, -29); ctx.quadraticCurveTo(-27, -36, -24, -42); });
  for (let i=0;i<7;i++){ const k = i/6, x = lerp(-28, -23.4, k) + Math.sin(i*1.7)*1.2, y = lerp(-31, -43, k); ctx.save(); ctx.translate(x, y); ctx.rotate(-.5 + Math.sin(i)*.4); poly(ctx, [[-.8, 0], [.8, 0], [.2, 3.4]], i%2 ? '#d8ccb0' : '#f0e6cc'); ctx.restore(); }
  for (let i=0;i<5;i++){ const r = PR.rng(i + 160), a = i*1.25, x = -24 + Math.cos(a)*(8 + r()*5), y = -46 + Math.sin(a)*(6 + r()*4); PR.soft(ctx, x, y, 2.6 + r()*2, 1.4 + r(), '#d0dcd0', .2 + r()*.12, a); } // the spirits, close
  return F; };
