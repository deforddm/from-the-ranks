/* ============ Book Eight, Chapter 1 art: Before the Fete — Darujhistan in winter, the Gadrobi District at night and at dusk ============ */
/* Book Eight's look (140b): night slate-blue, Darujhistan's gas-fire blue in the lamps and the windows, lamp gold indoors, the moon's bone
   white. Winter: fog off the lake lying in the streets, wet stone that holds the blue.
   Figures (FIGX) in the ~32px frame of 18/47b, lit from the left:
     vasso         (replaces 140's simple sprite) the Guild journeyman: lean, cropped dark hair, the dark quilted jack with the Guild's
                   high collar, a knife's hilt over the right shoulder, a second knife at the hip, soft roof-boots, the knotted cord
     b8_c1_veteran the retired Malazan in the tavern: grey beard, a faded Seven Cities telaba over old leggings, a cup, the black cord
     b8_c1_orsa    the dice-den keeper: big, Gadrobi, forearms like a tanner's, rings, a leather dice cup
     b8_c1_benlo   the street vendor: small and round, a wool cap, an apron, a chestnut scoop
   Seven backdrops (SCENEX, sceneLayer for the still parts, REDUCE() holding the rest still):
     b8_daru_night  a Gadrobi street at night: house fronts, wet cobbles, gas-lamps, fog, the upper city's blue fire far off above the roofs
     b8_gadrobi     the Gadrobi lanes at a winter dusk: dyers' lines with blue cloth across the lane, a tannery's steaming vats, the hills
                    black behind the roofs, the lamps coming on, and the painted sign over the tavern door
     b8_door        the Fourth's door, inside: a narrow room, the fire, a table with five chairs and one more, a bar across the door
     b8_c1_tavern   the tavern with the painted sign, inside: a long low taproom, a fire at one end, benches; through the window, the sign
     b8_c1_den      Orsa's dice den: a cellar, a long table, lamps hung low, the faces round it lit from underneath
     b8_c1_roofs    the Gadrobi roofs at night: wet slate, chimneys, a tarred line strung between two of them, fog in the streets below
     b8_c1_house    a go-between's courtyard below the Daru tier: a wall, a lamp on the gate, a brazier, a door shut and dark
   The painted sign (b81Sign, kept for Ch 6): two big painted women arm in arm on a hanging board, one with a rum jug on her arm and one with
   a tray of cakes, faces nobody's in particular, a red ribbon over them. No bodies anywhere; the knives are never drawn here.
   The chapter's gear in the series' 200×150 item style, on Book Eight's ground: night slate-blue (#2a3038 → #0a0c10), gas-blue rim light. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Vasso: twenty-three, lean, Gadrobi; the Guild's dark quilted jack with its high collar, dark leggings and soft roof-boots; cropped dark
     hair; the second knife's hilt over the right shoulder (slung down the back), the first at the hip, held low in the front hand */
  vasso(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.02);
    h.legs('#16141a'); ctx.fillStyle = '#2a2630'; ctx.fillRect(-4.6, 9.6, 3.6, 3.4); ctx.fillRect(1, 9.6, 3.6, 3.4); // felt boots to the calf
    B2F.line(ctx, '#0c0a0e', 2.2, [[2, 2], [6.2, -14.6]]); ctx.fillStyle = '#4a4252'; ctx.fillRect(4.8, -16.4, 3.4, 1.1); ell(ctx, 6.8, -17.6, 1, 1, '#3a3440'); // the hilt over the shoulder
    poly(ctx, [[-6,-6.2],[6,-6.2],[6.6,7.6],[-6.6,7.6]], h.armor('#3e3848', '#100e14')); // the quilted jack
    ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.moveTo(-6, -3.4 + i*2.8); ctx.lineTo(6, -3.4 + i*2.8); } for (let i = -1; i <= 1; i++) { ctx.moveTo(i*3, -6); ctx.lineTo(i*3.3, 7.4); } ctx.stroke(); // the quilting
    ctx.fillStyle = 'rgba(160,190,230,.12)'; ctx.fillRect(-5.8, -5.6, 1.2, 12); // gas-blue on the lit edge
    poly(ctx, [[-3.6,-6.4],[3.6,-6.4],[3,-8.6],[-3,-8.6]], '#2a2632'); // the high collar
    ctx.fillStyle = '#1e1810'; ctx.fillRect(-6.4, 3.2, 12.8, 1.2); B2F.line(ctx, '#4a3c2a', .8, [[-5, 3.8], [-6.8, 8]]); // the belt, the hip sheath
    ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(-2, -6); ctx.quadraticCurveTo(0, -3.6, 2, -6); ctx.stroke(); // the knotted cord
    ctx.fillStyle = '#a8906a'; [-1.2, 0, 1.2].forEach(x => ctx.fillRect(x - .3, -4.6 + Math.abs(x)*.3, .6, .6));
    ctx.fillStyle = '#b08a6a'; ctx.fillRect(5.4, -1.4, 2.2, 3.2); // the front hand, low
    B2F.line(ctx, '#cfd4dc', .9, [[6.6, 1], [10.6, -3.2]]); B2F.line(ctx, '#2a2430', 1.3, [[6, 1.8], [7, .6]]); // the blackened knife, a glint on the edge
    h.head('#b08a6a', 4.2, -11.4); h.look('rgba(20,12,10,.85)', -11.6);
    ctx.fillStyle = '#1a1612'; ctx.beginPath(); ctx.arc(0, -12.8, 4.5, Math.PI*.98, Math.PI*2.02); ctx.fill(); ctx.fillRect(-4.4, -13.2, 1.4, 2.6); // cropped dark hair
    ctx.restore(); },
  /* the retired Malazan: grey all over, beard and hair; a faded Seven Cities telaba, the colour of old sand, over leggings; a cup held close */
  b8_c1_veteran(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1, .98);
    h.legs('#3a3428'); B2F.robe(ctx, h, '#a8946e', '#4a3e2a', 6.4, 7.8);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-1, -5, 1, 16); ctx.fillStyle = '#6a2a20'; ctx.fillRect(-6.6, 2.4, 13.2, 1.3); // a red sash, faded
    ctx.fillStyle = '#9a7656'; ctx.fillRect(4.4, -.6, 2.4, 2.8); ell(ctx, 6.4, -1.4, 1.8, 2.2, '#5a4a3a'); ell(ctx, 6.4, -3.4, 1.8, .6, '#2a1e14'); // the cup
    B2F.line(ctx, '#0c0c0e', .6, [[-2.6, -6], [0, -2.4], [2.6, -6]]); ell(ctx, 0, -2.2, .9, 1.1, '#e0d8c4'); // the black cord and the knucklebone
    h.head('#9a7656', 4.5, -11.2); h.look('rgba(30,20,12,.85)', -11.4);
    ctx.fillStyle = '#b8b4aa'; ctx.beginPath(); ctx.moveTo(-4.2, -10.4); ctx.quadraticCurveTo(0, -3.8, 4.2, -10.4); ctx.lineTo(3, -9.2); ctx.lineTo(-3, -9.2); ctx.closePath(); ctx.fill(); // the grey beard
    ctx.fillStyle = '#a8a49a'; ctx.beginPath(); ctx.arc(0, -12.6, 4.7, Math.PI*.95, Math.PI*2.05); ctx.fill(); // grey hair
    ctx.restore(); },
  /* Orsa: a big Gadrobi woman; a dark red dress with the sleeves pushed up, a leather apron, heavy forearms, rings; a dice cup */
  b8_c1_orsa(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.14, 1.04);
    B2F.robe(ctx, h, '#7a2a28', '#2a0c0c', 6.8, 8.4); poly(ctx, [[-4.6,-2],[4.6,-2],[5.4,10.4],[-5.4,10.4]], '#4a3420'); // the dress, the apron
    ctx.fillStyle = '#b0886a'; ctx.fillRect(-9.2, -4.6, 3, 7); ctx.fillRect(6.2, -4.6, 3, 7); // bare forearms
    ctx.fillStyle = '#e0c060'; [[-8.4, 2], [-7, 2.4], [7.2, 2], [8.4, 2.4]].forEach(([x, y]) => ctx.fillRect(x - .5, y, 1, .8)); // rings
    poly(ctx, [[6.6,-1.2],[10.4,-1.2],[10,3.4],[7,3.4]], '#5a3a1e'); ctx.fillStyle = '#3a2410'; ctx.fillRect(6.6, -1.6, 3.8, .8); // the dice cup
    h.head('#b0886a', 4.8, -11.4); h.look('rgba(26,14,10,.9)', -11.6);
    ctx.fillStyle = '#2a1a12'; ctx.beginPath(); ctx.arc(0, -12.6, 5, Math.PI*.9, Math.PI*2.1); ctx.fill(); ell(ctx, 0, -17.4, 2.6, 2, '#2a1a12'); // dark hair, pinned up
    ctx.restore(); },
  /* Benlo: small and round; a brown wool cap, a grey coat, an apron; a chestnut scoop in his hand */
  b8_c1_benlo(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.1, .88);
    h.legs('#2e2a24'); poly(ctx, [[-7,-5.6],[7,-5.6],[7.6,8],[-7.6,8]], h.armor('#6a6660', '#24221e')); poly(ctx, [[-4.4,-2],[4.4,-2],[4.8,9],[-4.8,9]], '#b8ae98'); // the coat, the apron
    ctx.fillStyle = '#9a7656'; ctx.fillRect(6.6, -1.6, 2.2, 3); B2F.line(ctx, '#6a6a6e', 1, [[7.6, 1], [11.6, -3.4]]); ell(ctx, 12, -3.8, 1.6, 1, '#4a4a4e'); // the scoop
    h.head('#b08868', 4.7, -11); h.look('rgba(26,14,10,.85)', -11.2); ell(ctx, 2.6, -9, 1.2, .8, 'rgba(170,60,40,.3)'); // a red nose, from the brazier
    ctx.fillStyle = '#6a4a2a'; ctx.beginPath(); ctx.arc(0, -12.4, 5, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#5a3e22'; ctx.fillRect(-5.2, -12.8, 10.4, 1.4); // the wool cap
    ctx.restore(); },
});

/* ---------------- shared pieces ---------------- */
/* the night sky, slate-blue to black, with a scatter of stars */
function b81Sky(x, W, H, hz, seed, low = '#1c2a44'){ x.fillStyle = vgrad(x, 0, hz, [[0,'#03050c'],[.6,'#0c1428'],[1,low]]); x.fillRect(0, 0, W, hz + 2);
  for (let i = 0; i < 70; i++) { x.fillStyle = `rgba(226,232,250,${(.08 + hash(i, seed)*.4).toFixed(2)})`; x.fillRect(hash(i, seed + 1)*W, Math.pow(hash(i, seed + 2), 1.5)*hz*.8, 1, 1); } }
/* the upper city on the skyline: domes and towers, black, with blue gas-fire in a great many windows */
function b81Upper(x, W, H, base, seed, k = 1){ x.fillStyle = '#05070c'; x.beginPath(); x.moveTo(0, base);
  for (let i = 0; i <= 30; i++) { const u = i/30, px = u*W, ht = H*(.03 + hash(i, seed)*.05)*k; x.lineTo(px, base - ht); x.lineTo(px + W/60, base - ht); }
  x.lineTo(W, base); x.closePath(); x.fill();
  for (let i = 0; i < 6; i++) { const cx = W*(.12 + hash(i, seed + 3)*.76), r = H*(.02 + hash(i, seed + 4)*.025)*k, top = base - H*(.07 + hash(i, seed + 5)*.04)*k; // domes
    x.beginPath(); x.arc(cx, top, r, Math.PI, 0); x.lineTo(cx + r, base); x.lineTo(cx - r, base); x.closePath(); x.fill(); }
  for (let i = 0; i < 5; i++) { const tx = W*(.08 + hash(i, seed + 6)*.84), th = H*(.1 + hash(i, seed + 7)*.08)*k; x.fillRect(tx, base - th, W*.008*k + 1, th); } // towers
  for (let i = 0; i < 160; i++) { x.fillStyle = `rgba(110,180,255,${(.35 + hash(i, seed + 8)*.55).toFixed(2)})`; x.fillRect(hash(i, seed + 9)*W, base - hash(i, seed + 10)*H*.09*k, 1, 1); }
  glow(x, W*.5, base, W*.5, '#3a7ad0', .08); }
/* fog lying in a street, drifting */
function b81Fog(ctx, W, H, y, t, mo, a = .16){ for (let i = 0; i < 5; i++) { const dx = mo ? Math.sin(t/(5200 + i*900) + i)*W*.04 : 0; ctx.fillStyle = `rgba(150,170,200,${(a - i*.02).toFixed(3)})`;
  ctx.beginPath(); ctx.ellipse(W*(.2 + i*.16) + dx, y + (i % 2)*H*.02, W*.32, H*.035, 0, 0, 7); ctx.fill(); } }
/* a Darujhistan gas-lamp on its post: iron, a glass box, the blue flame breathing */
function b81Lamp(ctx, lx, ly, s, t, mo, i = 0){ const fl = mo ? .82 + .12*Math.sin(t/210 + i*1.7) + .06*Math.sin(t/57 + i) : 1;
  ctx.fillStyle = '#0e0f12'; ctx.fillRect(lx - 1.2*s, ly, 2.4*s, 30*s); ctx.fillRect(lx - 3.2*s, ly - 1*s, 6.4*s, 1.4*s);
  ctx.fillStyle = `rgba(120,190,255,${(.85*fl).toFixed(2)})`; ctx.fillRect(lx - 2.2*s, ly - 7*s, 4.4*s, 6*s); ctx.fillStyle = '#0e0f12'; ctx.fillRect(lx - 2.8*s, ly - 8*s, 5.6*s, 1.2*s);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly - 4*s, 34*s, '#4a9aff', .22*fl); glow(ctx, lx, ly - 4*s, 3*s, '#d8f0ff', .8*fl); ctx.globalCompositeOperation = 'source-over'; }
/* a Gadrobi house front: plaster over stone, a shuttered window or two, a door; lit = a lamp behind one shutter */
function b81Front(x, x0, x1, base, top, seed, lit){ x.fillStyle = vgrad(x, top, base, [[0,'#1c1e24'],[1,'#0a0b0e']]); x.fillRect(x0, top, x1 - x0, base - top);
  x.fillStyle = '#08090c'; x.fillRect(x0 - 2, top - 3, x1 - x0 + 4, 3); // the eave
  const n = Math.max(1, Math.round((x1 - x0)/22)); for (let i = 0; i < n; i++) { const wx = x0 + (x1 - x0)*(i + .5)/n - 4, wy = top + (base - top)*.22;
    const on = lit && hash(i, seed) > .5; x.fillStyle = on ? 'rgba(232,180,100,.55)' : '#06070a'; x.fillRect(wx, wy, 8, 10); x.fillStyle = '#2a2420'; x.fillRect(wx - 3, wy, 3, 10); x.fillRect(wx + 8, wy, 3, 10); } // shutters
  for (let i = 0; i < 18; i++) ell(x, x0 + hash(i, seed + 1)*(x1 - x0), top + hash(i, seed + 2)*(base - top), 2 + hash(i, seed + 3)*3, 1.2, 'rgba(90,96,110,.12)'); }
/* the painted sign: two big women arm in arm on a hanging board, one with a rum jug on her arm and one with a tray of cakes, a red ribbon
   over them. At this size the faces are nobody's in particular. (x, y) the top of the bracket; s the board's width / 60. Ch 6 uses it again. */
function b81Sign(ctx, x, y, s, swing = 0){ ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#121214'; ctx.fillRect(-34*s, -2*s, 68*s, 2.4*s); // the iron bracket
  B2F.line(ctx, '#121214', .8*s, [[-24*s, 0], [-24*s, 6*s]]); B2F.line(ctx, '#121214', .8*s, [[24*s, 0], [24*s, 6*s]]);
  ctx.rotate(swing); ctx.translate(0, 6*s);
  ctx.fillStyle = '#3a2618'; ctx.fillRect(-30*s, 0, 60*s, 40*s); ctx.fillStyle = '#d8c08a'; ctx.fillRect(-28*s, 2*s, 56*s, 36*s); // the board, the cream ground
  ctx.fillStyle = 'rgba(255,240,200,.35)'; for (let i = 0; i < 8; i++) { const a = i/8*Math.PI*2; poly(ctx, [[0, 22*s], [Math.cos(a)*30*s, 22*s + Math.sin(a)*18*s], [Math.cos(a + .3)*30*s, 22*s + Math.sin(a + .3)*18*s]], 'rgba(255,240,200,.25)'); } // the sunburst
  ctx.fillStyle = '#b8302a'; ctx.fillRect(-24*s, 4*s, 48*s, 6*s); ctx.fillStyle = '#f0d27a'; for (let i = 0; i < 14; i++) ctx.fillRect((-21 + i*3)*s, 6.4*s, 1.6*s, 1.2*s); // the ribbon, its lettering a gold blur
  const woman = (cx, dress, hair, sleeveUp) => { poly(ctx, [[cx - 7*s, 38*s], [cx - 5*s, 22*s], [cx + 5*s, 22*s], [cx + 7*s, 38*s]], dress); // the skirt
    poly(ctx, [[cx - 5*s, 23*s], [cx - 4.6*s, 16*s], [cx + 4.6*s, 16*s], [cx + 5*s, 23*s]], '#f0e2d0'); poly(ctx, [[cx - 4.6*s, 23*s], [cx - 4*s, 18.6*s], [cx + 4*s, 18.6*s], [cx + 4.6*s, 23*s]], shade(dress, -.2)); // the chemise, the laced bodice
    ell(ctx, cx, 13*s, 2.8*s, 3.2*s, '#e8c4a4'); ell(ctx, cx, 10.6*s, 3.4*s, 2.2*s, hair); // the head, the hair: no features
    ctx.fillStyle = '#e8c4a4'; ctx.fillRect(cx + (sleeveUp ? -8.6 : 4.6)*s, (sleeveUp ? 14 : 18)*s, 3.4*s, (sleeveUp ? 6 : 4)*s); };
  woman(-9*s, '#2a6a8a', '#b04a2a', true); woman(9*s, '#8a2a4a', '#e0b860', false);
  ctx.fillStyle = '#e8c4a4'; ctx.fillRect(-4*s, 19*s, 8*s, 2.4*s); // the arms hooked through
  ell(ctx, -16.4*s, 13*s, 2.4*s, 2.8*s, '#6a4a2a'); ell(ctx, -16.4*s, 10.4*s, 1.2*s, .8*s, '#3a2614'); // the rum jug on the flexed arm
  ctx.fillStyle = '#c0a060'; ctx.fillRect(13*s, 17.4*s, 9*s, 1.4*s); [14.6, 17.4, 20.2].forEach(cx => ell(ctx, cx*s, 16.6*s, 1.2*s, 1*s, '#a0602a')); // the tray of cakes
  ctx.strokeStyle = 'rgba(40,24,12,.6)'; ctx.lineWidth = .7*s; ctx.strokeRect(-28*s, 2*s, 56*s, 36*s);
  ctx.restore(); }

/* ---------------- the backdrops ---------------- */
/* a Gadrobi street at night (140's caption): house fronts both sides closing in, wet cobbles holding the blue, gas-lamps, fog in the street,
   the roofs black against the sky and, far above them, the upper city's blue fire; the squad small in the street */
SCENEX.b8_daru_night = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42;
  ctx.drawImage(sceneLayer('b81:street', W, H, (x, W, H) => {
    b81Sky(x, W, H, hz, 8101); x.fillStyle = '#0c0e14'; x.fillRect(0, hz, W, H - hz); b81Upper(x, W, H, hz, 8110, .9);
    x.fillStyle = vgrad(x, hz, H, [[0,'#141820'],[1,'#06070a']]); x.fillRect(0, hz, W, H - hz); // the street's floor
    for (let i = 0; i < 90; i++) { const d = hash(i, 8120), yy = hz + Math.pow(d, .7)*(H - hz), cx = W*.5 + (hash(i, 8121) - .5)*W*(.2 + d*.9); ell(x, cx, yy, 2 + d*5, 1 + d*1.8, `rgba(${40 + Math.round(d*30)},${54 + Math.round(d*40)},${80 + Math.round(d*60)},.35)`); } // cobbles, wet
    b81Front(x, -4, W*.3, H*.86, H*.18, 8130, true); b81Front(x, W*.3, W*.4, H*.62, H*.3, 8131, false); // the near and far fronts, left
    b81Front(x, W*.7, W + 4, H*.86, H*.2, 8132, true); b81Front(x, W*.6, W*.7, H*.62, H*.32, 8133, true); // and right
    x.fillStyle = '#06070a'; poly(x, [[0, H*.18], [W*.3, H*.18], [W*.4, H*.3], [W*.6, H*.32], [W*.7, H*.2], [W, H*.2], [W, H*.14], [0, H*.14]], '#06070a'); // the roofline
    [[W*.16, H*.12], [W*.82, H*.14], [W*.36, H*.26]].forEach(([cx, cy]) => { x.fillStyle = '#06070a'; x.fillRect(cx, cy, W*.02, H*.06); }); // chimneys
    x.fillStyle = 'rgba(70,120,200,.18)'; x.beginPath(); x.ellipse(W*.5, H*.8, W*.18, H*.03, 0, 0, 7); x.fill(); // a puddle in the middle of the street
  }), 0, 0, W, H);
  b81Lamp(ctx, W*.27, H*.5, H/220, t, mo, 0); b81Lamp(ctx, W*.74, H*.52, H/220, t, mo, 1); b81Lamp(ctx, W*.42, H*.4, H/420, t, mo, 2);
  b81Fog(ctx, W, H, H*.74, t, mo);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.4 + i*Math.min(.06, .3/sq.length)), H*.95 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .72, .5); };

/* the Gadrobi lanes at a winter dusk (140's caption): the dyers' lines across the lane with the day's cloth in three blues, a tannery's
   vats steaming, the hills black behind the roofs, the lamps coming on, the tavern's painted sign over its door at the corner */
SCENEX.b8_gadrobi = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.46;
  ctx.drawImage(sceneLayer('b81:lanes', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#141c30'],[.55,'#2c3650'],[.85,'#5a4a50'],[1,'#7a5a48']]); x.fillRect(0, 0, W, hz + 2); // dusk
    x.fillStyle = '#10121a'; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 20; i++) { const u = i/20; x.lineTo(u*W, hz - H*(.1 + .07*Math.sin(u*4 + 1) + .03*Math.sin(u*11))); } x.lineTo(W, hz); x.closePath(); x.fill(); // the Gadrobi hills
    x.fillStyle = vgrad(x, hz, H, [[0,'#24242a'],[1,'#0c0c10']]); x.fillRect(0, hz, W, H - hz);
    for (let i = 0; i < 70; i++) { const d = hash(i, 8140), yy = hz + Math.pow(d, .7)*(H - hz), cx = W*.5 + (hash(i, 8141) - .5)*W*(.3 + d*.9); ell(x, cx, yy, 2 + d*5, 1 + d*1.6, 'rgba(70,74,84,.35)'); }
    b81Front(x, -4, W*.26, H*.88, H*.22, 8150, true); b81Front(x, W*.26, W*.38, H*.66, H*.34, 8151, true);
    b81Front(x, W*.74, W + 4, H*.88, H*.24, 8152, true); b81Front(x, W*.62, W*.74, H*.66, H*.36, 8153, false);
    // the tavern's door, right, with its warm light; the steps down to Orsa's, left
    x.fillStyle = 'rgba(232,170,90,.6)'; x.fillRect(W*.8, H*.62, W*.06, H*.26); x.fillStyle = '#1a120a'; x.fillRect(W*.795, H*.6, W*.07, H*.02);
    x.fillStyle = '#08080a'; x.fillRect(W*.08, H*.76, W*.1, H*.12); for (let i = 0; i < 4; i++) { x.fillStyle = `rgba(70,64,60,${.5 - i*.1})`; x.fillRect(W*.08, H*(.78 + i*.025), W*.1, H*.008); }
    // a tannery's vats, steaming, in a yard beyond the left fronts
    for (let i = 0; i < 3; i++) { ell(x, W*(.31 + i*.03), H*.66, W*.014, H*.008, '#3a2e22'); }
  }), 0, 0, W, H);
  // the dyers' lines across the lane, the cloth moving a little
  [[.2, .3, '#2a4a8a'], [.42, .34, '#3a6aa8'], [.6, .31, '#1c3060']].forEach(([u, v, c], i) => { const sw = mo ? Math.sin(t/900 + i*2)*1.2 : 0;
    B2F.line(ctx, '#0a0a0c', .6, [[W*.05, H*(v - .02)], [W*.95, H*(v + .02)]]); poly(ctx, [[W*u, H*v], [W*(u + .1), H*(v + .004)], [W*(u + .1) + sw, H*(v + .14)], [W*u + sw, H*(v + .13)]], c); });
  if (mo) for (let i = 0; i < 8; i++) { const k = ((t/2600 + i/8) % 1); ctx.fillStyle = `rgba(200,200,210,${(.18*(1 - k)).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(W*(.3 + (i % 3)*.03) + Math.sin(t/700 + i)*3, H*(.64 - k*.18), 4 + k*8, 2 + k*4, 0, 0, 7); ctx.fill(); } // steam off the vats
  b81Sign(ctx, W*.83, H*.52, H/520, mo ? Math.sin(t/1300)*.03 : 0);
  b81Lamp(ctx, W*.22, H*.54, H/240, t, mo, 0); b81Lamp(ctx, W*.68, H*.5, H/300, t, mo, 1);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.83, H*.75, H*.2, '#ffa050', .12); ctx.globalCompositeOperation = 'source-over';
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.36 + i*Math.min(.06, .3/sq.length)), H*.95 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .6, .5); };

/* the Fourth's door, inside (140's caption): a narrow room; the fire on the right; a table with five chairs and a sixth against the wall;
   cups; the door on the left with a bar of oak across it; a shuttered window; the ledger; the squad round the table */
SCENEX.b8_door = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), fy = H*.8;
  ctx.drawImage(sceneLayer('b81:door', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, fy, [[0,'#14100c'],[1,'#2a1e14']]); x.fillRect(0, 0, W, fy); // plaster walls in firelight
    for (let i = 0; i < 40; i++) ell(x, hash(i, 8160)*W, hash(i, 8161)*fy, 6 + hash(i, 8162)*14, 3 + hash(i, 8163)*6, 'rgba(60,44,30,.18)');
    x.fillStyle = '#100c08'; for (let i = 0; i < 4; i++) x.fillRect(0, H*(.06 + i*.002), W, 2); x.fillRect(0, H*.04, W, H*.04); // the beam
    x.fillStyle = vgrad(x, fy, H, [[0,'#2a1e14'],[1,'#120c08']]); x.fillRect(0, fy, W, H - fy); // the floor
    // the door, left, and the bar across it
    x.fillStyle = '#1e140c'; x.fillRect(W*.04, H*.24, W*.14, fy - H*.24); x.strokeStyle = 'rgba(0,0,0,.6)'; x.lineWidth = 1; for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(W*(.04 + i*.035), H*.24); x.lineTo(W*(.04 + i*.035), fy); x.stroke(); }
    x.fillStyle = '#5a3e22'; x.fillRect(W*.02, H*.5, W*.18, H*.035); x.fillStyle = '#2a1e10'; x.fillRect(W*.02, H*.47, W*.02, H*.09); x.fillRect(W*.18, H*.47, W*.02, H*.09); // the oak bar, its brackets
    // the shuttered window, centre-left, a crack of blue night in it
    x.fillStyle = '#1a120a'; x.fillRect(W*.3, H*.22, W*.12, H*.2); x.fillStyle = 'rgba(80,130,210,.35)'; x.fillRect(W*.358, H*.23, W*.004, H*.18);
    // the hearth, right
    x.fillStyle = '#1a1612'; x.fillRect(W*.74, H*.3, W*.2, fy - H*.3); x.fillStyle = '#0a0806'; x.fillRect(W*.77, H*.5, W*.14, fy - H*.5); x.fillStyle = '#2a2420'; x.fillRect(W*.72, H*.28, W*.24, H*.03); // the mantel
    x.fillStyle = '#3a2e22'; x.fillRect(W*.78, H*.27, W*.02, H*.012); x.fillRect(W*.86, H*.265, W*.015, H*.016); // a cup and the ledger on the mantel
    // the iron cap on its nail by the door
    ell(x, W*.23, H*.3, W*.014, H*.016, '#3a3a3e');
    // the table and its chairs: five round it, one against the wall
    x.fillStyle = '#3a2614'; x.fillRect(W*.36, H*.6, W*.3, H*.04); x.fillStyle = '#24180c'; x.fillRect(W*.38, H*.64, W*.015, fy - H*.64); x.fillRect(W*.625, H*.64, W*.015, fy - H*.64);
    const chair = (cx, s) => { x.fillStyle = '#2a1c10'; x.fillRect(cx - 6*s, H*.66, 12*s, 3*s); x.fillRect(cx - 6*s, H*.66, 2*s, fy - H*.66); x.fillRect(cx + 4*s, H*.66, 2*s, fy - H*.66); x.fillRect(cx - 6*s, H*.52, 2*s, H*.14); };
    [.33, .42, .51, .6, .69].forEach(u => chair(W*u, H/240)); chair(W*.27, H/240*.9); // and one more, against the wall
    x.fillStyle = '#6a5a44'; [[.42, .59], [.48, .595], [.56, .59]].forEach(([u, v]) => x.fillRect(W*u, H*v, W*.012, H*.014)); // cups on the table
  }), 0, 0, W, H);
  // the fire, breathing, and its light on the room
  const cx = W*.84, cy = fy - H*.02; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.7, '#ff8a3a', .22*fl); ctx.globalCompositeOperation = 'source-over';
  poly(ctx, [[cx - 14, cy], [cx - 6, cy - 22*fl], [cx, cy - 10], [cx + 6, cy - 18*fl], [cx + 14, cy]], 'rgba(255,140,50,.95)'); poly(ctx, [[cx - 6, cy], [cx, cy - 12*fl], [cx + 6, cy]], 'rgba(255,220,140,.95)');
  if (mo) for (let i = 0; i < 5; i++) { const k = ((t/1400 + i/5) % 1); ctx.fillStyle = `rgba(255,190,110,${(.8*(1 - k)).toFixed(2)})`; ctx.fillRect(cx + Math.sin(i*2 + t/500)*5, cy - 14 - k*40, 1, 1); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => { const n = sq.length, side = i < n/2 ? -1 : 1, j = side < 0 ? i : i - Math.ceil(n/2); drawFigure(ctx, id, W*.51 + side*(W*.08 + j*W*.07), H*.96 - (j % 2)*3, 1.85, t, {phase:i, dir:-side}); });
  vign(ctx, W, H, .7, .5); };

/* the tavern with the painted sign, inside: a long low taproom, a fire at the far end, benches down the walls; at the left a window, and
   through it, under a gas-lamp in the lane, the painted sign on its bracket; the old soldier on his bench by the fire */
SCENEX.b8_c1_tavern = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), fy = H*.78;
  ctx.drawImage(sceneLayer('b81:tavern', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, fy, [[0,'#1a120c'],[1,'#36261a']]); x.fillRect(0, 0, W, fy);
    for (let i = 0; i < 5; i++) { x.fillStyle = '#120c08'; x.fillRect(0, H*(.05 + i*.0), W, H*.03); x.fillRect(W*(.1 + i*.2), 0, W*.02, H*.1); } // the low beams
    x.fillStyle = vgrad(x, fy, H, [[0,'#2e2014'],[1,'#120c08']]); x.fillRect(0, fy, W, H - fy);
    // the window, left: the lane outside, blue, the lamp, and the sign hanging in it
    x.fillStyle = '#0a0c12'; x.fillRect(W*.04, H*.18, W*.24, H*.36); x.fillStyle = vgrad(x, H*.18, H*.54, [[0,'#0c1426'],[1,'#1c2a44']]); x.fillRect(W*.05, H*.19, W*.22, H*.34);
    // the benches down the walls, the long table
    x.fillStyle = '#2a1c10'; x.fillRect(0, H*.66, W*.36, H*.03); x.fillRect(W*.64, H*.66, W*.36, H*.03); x.fillStyle = '#3a2816'; x.fillRect(W*.3, H*.62, W*.4, H*.035); x.fillStyle = '#1e140a'; x.fillRect(W*.32, H*.655, W*.012, fy - H*.655); x.fillRect(W*.67, H*.655, W*.012, fy - H*.655);
    // the hearth at the far end, right
    x.fillStyle = '#1a1612'; x.fillRect(W*.78, H*.26, W*.18, fy - H*.26); x.fillStyle = '#0a0806'; x.fillRect(W*.8, H*.46, W*.14, fy - H*.46);
    // jugs on a shelf
    x.fillStyle = '#1a120a'; x.fillRect(W*.4, H*.3, W*.3, H*.012); [.42, .47, .53, .6, .66].forEach((u, i) => ell(x, W*u, H*.285, W*.012, H*.02, ['#5a4028', '#4a3a2a', '#6a4a2a', '#3a3a3a', '#5a3a22'][i]));
  }), 0, 0, W, H);
  // through the window: the lamp in the lane and the sign
  ctx.save(); ctx.beginPath(); ctx.rect(W*.05, H*.19, W*.22, H*.34); ctx.clip(); b81Lamp(ctx, W*.08, H*.3, H/260, t, mo, 3); b81Sign(ctx, W*.17, H*.22, H/560, mo ? Math.sin(t/1300)*.03 : 0); ctx.restore();
  ctx.fillStyle = '#0a0806'; ctx.fillRect(W*.155, H*.18, W*.006, H*.36); ctx.fillRect(W*.04, H*.355, W*.24, H*.006); // the window's bars
  const cx = W*.87, cy = fy - H*.02; ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, H*.6, '#ff8a3a', .2*fl); glow(ctx, W*.5, H*.5, W*.4, '#ffb060', .05); ctx.globalCompositeOperation = 'source-over';
  poly(ctx, [[cx - 12, cy], [cx - 5, cy - 18*fl], [cx, cy - 8], [cx + 5, cy - 15*fl], [cx + 12, cy]], 'rgba(255,140,50,.95)'); poly(ctx, [[cx - 5, cy], [cx, cy - 10*fl], [cx + 5, cy]], 'rgba(255,220,140,.95)');
  drawFigure(ctx, 'b8_c1_veteran', W*.74, H*.8, 1.8, t, {dir:-1, still:true});
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.26 + i*Math.min(.065, .36/sq.length)), H*.96 - (i % 2)*2, 1.8, t, {phase:i, dir:1}));
  vign(ctx, W, H, .68, .5); };

/* Orsa's dice den: a cellar vault, a long table down the middle, lamps hung low over it so the faces round it are lit from below, the bones
   in a cup; Orsa on her stool at the head of it; bravos at the far end */
SCENEX.b8_c1_den = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fy = H*.76;
  ctx.drawImage(sceneLayer('b81:den', W, H, (x, W, H) => {
    x.fillStyle = '#0c0a08'; x.fillRect(0, 0, W, H);
    for (let i = 0; i < 4; i++) { const cx = W*(.12 + i*.26); x.fillStyle = vgrad(x, H*.06, fy, [[0,'#1a1612'],[1,'#2a2218']]); x.beginPath(); x.moveTo(cx - W*.13, fy); x.lineTo(cx - W*.13, H*.3); x.quadraticCurveTo(cx, H*.02, cx + W*.13, H*.3); x.lineTo(cx + W*.13, fy); x.closePath(); x.fill(); } // the vaults
    for (let i = 0; i < 60; i++) ell(x, hash(i, 8170)*W, H*(.2 + hash(i, 8171)*.5), 4 + hash(i, 8172)*6, 2 + hash(i, 8173)*3, 'rgba(70,60,46,.22)'); // stone
    x.fillStyle = vgrad(x, fy, H, [[0,'#1e1810'],[1,'#0a0806']]); x.fillRect(0, fy, W, H - fy);
    // the long table
    x.fillStyle = '#3a2614'; poly(x, [[W*.2, H*.62], [W*.8, H*.62], [W*.88, H*.7], [W*.12, H*.7]], '#3a2614'); x.fillStyle = '#24180c'; x.fillRect(W*.16, H*.7, W*.02, fy - H*.7); x.fillRect(W*.82, H*.7, W*.02, fy - H*.7);
    // the steps, up at the back left, and the door's slot of light
    for (let i = 0; i < 5; i++) { x.fillStyle = `rgba(60,52,44,${.6 - i*.08})`; x.fillRect(W*(.02 + i*.02), H*(.6 - i*.07), W*.08, H*.02); } x.fillStyle = 'rgba(120,170,230,.3)'; x.fillRect(W*.11, H*.26, W*.03, H*.006);
    // bones and coins on the table
    for (let i = 0; i < 9; i++) ell(x, W*(.3 + hash(i, 8174)*.4), H*(.64 + hash(i, 8175)*.04), 1.4, 1, i % 3 ? '#c8a050' : '#e0d8c4');
  }), 0, 0, W, H);
  // the lamps hung low over the table, swinging a little
  [.3, .5, .7].forEach((u, i) => { const sw = mo ? Math.sin(t/1100 + i)*2 : 0, lx = W*u + sw, ly = H*.44, fl = mo ? .85 + .1*Math.sin(t/180 + i*2) : 1;
    B2F.line(ctx, '#0a0806', .6, [[W*u, H*.16], [lx, ly - 4]]); ctx.fillStyle = '#2a2018'; ctx.fillRect(lx - 3, ly - 4, 6, 6); ctx.fillStyle = `rgba(255,190,100,${fl.toFixed(2)})`; ctx.fillRect(lx - 2, ly - 3, 4, 4);
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly, H*.3, '#ffa050', .2*fl); ctx.globalCompositeOperation = 'source-over'; });
  drawFigure(ctx, 'b8_c1_orsa', W*.86, H*.74, 1.8, t, {dir:-1, still:true});
  [[.22, 1], [.3, 1], [.7, -1]].forEach(([u, d], i) => drawFigure(ctx, 'thug', W*u, H*.66, 1.3, t, {dir:d, phase:i, alpha:.85}));
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.34 + i*Math.min(.06, .34/sq.length)), H*.97 - (i % 2)*2, 1.8, t, {phase:i, dir:1}));
  vign(ctx, W, H, .78, .55); };

/* the Gadrobi roofs at night: ridges and wet slate going away east, chimneys, a tarred line strung between two of them on iron hooks, fog
   lying in the streets below like milk in a bowl, the moon over it all (whole, this winter), the upper city's blue fire far off */
SCENEX.b8_c1_roofs = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.4;
  ctx.drawImage(sceneLayer('b81:roofs', W, H, (x, W, H) => {
    b81Sky(x, W, H, hz, 8180); glow(x, W*.78, H*.12, H*.2, '#dfe6f0', .2); ell(x, W*.78, H*.12, H*.04, H*.04, '#e8e4d6'); ell(x, W*.774, H*.114, H*.012, H*.01, 'rgba(160,156,140,.4)'); // the moon
    x.fillStyle = vgrad(x, hz, H, [[0,'#141a26'],[1,'#06070a']]); x.fillRect(0, hz, W, H - hz); // the city under the fog, below the skyline
    b81Upper(x, W, H, hz, 8186, 1.1);
    x.fillStyle = vgrad(x, hz - H*.02, hz + H*.12, [[0,'rgba(140,160,190,0)'],[.4,'rgba(140,160,190,.12)'],[1,'rgba(140,160,190,0)']]); x.fillRect(0, hz - H*.02, W, H*.14); // fog in the city below the skyline
    // the roofs: three ridges, near to far
    [[.56, '#16181e', 8190], [.7, '#101216', 8191], [.86, '#0a0b0e', 8192]].forEach(([v, c, sd], k) => { x.fillStyle = c; x.beginPath(); x.moveTo(0, H);
      for (let i = 0; i <= 12; i++) { const u = i/12, yy = H*v - (i % 2 ? H*.06 : 0) + hash(i, sd)*H*.02; x.lineTo(u*W, yy); } x.lineTo(W, H); x.closePath(); x.fill();
      x.strokeStyle = `rgba(140,170,210,${(.12 + k*.04).toFixed(2)})`; x.lineWidth = .7; x.beginPath(); for (let i = 0; i <= 12; i++) { const u = i/12, yy = H*v - (i % 2 ? H*.06 : 0) + hash(i, sd)*H*.02; x.lineTo(u*W, yy); } x.stroke(); // wet slate catching the light
      for (let i = 0; i < 3; i++) { const cxp = W*(.1 + hash(i, sd + 3)*.8), ch = H*(.05 + k*.02); x.fillStyle = c; x.fillRect(cxp, H*v - H*.04 - ch, W*(.02 + k*.006), ch + H*.04); } }); // chimneys
    // the two chimneys that hold the line, near, left and right
    x.fillStyle = '#0e0f12'; x.fillRect(W*.14, H*.5, W*.05, H*.38); x.fillRect(W*.78, H*.58, W*.045, H*.3); x.fillStyle = '#1e2026'; x.fillRect(W*.135, H*.49, W*.06, H*.02); x.fillRect(W*.775, H*.57, W*.055, H*.02);
  }), 0, 0, W, H);
  // the Guild's line, taut, with a glint running along it
  const ax = W*.19, ay = H*.54, bx = W*.78, by = H*.6; B2F.line(ctx, '#5a5a64', 1.2, [[ax, ay], [bx, by]]); ctx.fillStyle = '#4a4a50'; ctx.fillRect(ax - 2, ay - 1.5, 3, 3); ctx.fillRect(bx - 1, by - 1.5, 3, 3);
  if (mo) { const k = (t/3000) % 1; ctx.globalCompositeOperation = 'lighter'; glow(ctx, ax + (bx - ax)*k, ay + (by - ay)*k, 6, '#8ab8ff', .5); ctx.globalCompositeOperation = 'source-over'; }
  for (let i = 1; i < 6; i++) { const u = i/6; ell(ctx, ax + (bx - ax)*u, ay + (by - ay)*u, 1.2, 1.2, '#2a2620'); } // the knots
  b81Fog(ctx, W, H, H*.62, t, mo, .12);
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*(.3 + i*Math.min(.07, .36/sq.length)), H*.96 - (i % 2)*2, 1.7, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* a go-between's courtyard below the Daru tier: a wall with a lamp on the gate, a small flagged courtyard, a brazier, and at the top of it
   a house with its door shut and no light behind it; the Daru tier's better lamps on the terraces above */
SCENEX.b8_c1_house = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b2Fl(t), hz = H*.34;
  ctx.drawImage(sceneLayer('b81:house', W, H, (x, W, H) => {
    b81Sky(x, W, H, hz, 8200); x.fillStyle = vgrad(x, hz, H, [[0,'#12161e'],[1,'#06070a']]); x.fillRect(0, hz, W, H - hz); b81Upper(x, W, H, hz, 8206, 1.3);
    x.fillStyle = '#0c0d10'; x.fillRect(0, hz, W, H*.08); for (let i = 0; i < 30; i++) { x.fillStyle = 'rgba(232,200,130,.5)'; x.fillRect(hash(i, 8210)*W, hz + hash(i, 8211)*H*.07, 1, 1); } // the Daru terraces, warmer lamps
    // the house: tall, quiet, stone; the door at the top of three steps, shut; the windows dark
    x.fillStyle = vgrad(x, H*.3, H*.7, [[0,'#1e2026'],[1,'#0e0f12']]); x.fillRect(W*.3, H*.3, W*.4, H*.4); x.fillStyle = '#07080a'; x.fillRect(W*.28, H*.28, W*.44, H*.025);
    [[.35, .38], [.6, .38], [.35, .5], [.6, .5]].forEach(([u, v]) => { x.fillStyle = '#040506'; x.fillRect(W*u, H*v, W*.05, H*.07); });
    x.fillStyle = '#140e08'; x.fillRect(W*.46, H*.52, W*.08, H*.18); x.fillStyle = '#4a3a24'; x.fillRect(W*.52, H*.61, W*.006, H*.01); // the door, its iron
    for (let i = 0; i < 3; i++) { x.fillStyle = `rgba(80,80,88,${.5 - i*.1})`; x.fillRect(W*(.44 - i*.01), H*(.7 + i*.02), W*(.12 + i*.02), H*.02); } // the steps
    x.fillStyle = vgrad(x, H*.7, H, [[0,'#1a1c22'],[1,'#08090c']]); x.fillRect(0, H*.76, W, H*.24); // the flags
    for (let i = 0; i < 40; i++) { const u = hash(i, 8212), v = .78 + hash(i, 8213)*.2; x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = .6; x.strokeRect(u*W, v*H, W*.06, H*.03); }
    // the courtyard wall, either side, with glass on the coping
    x.fillStyle = '#121418'; x.fillRect(0, H*.6, W*.24, H*.18); x.fillRect(W*.76, H*.6, W*.24, H*.18);
    for (let i = 0; i < 24; i++) { const gx = (i < 12 ? hash(i, 8214)*W*.24 : W*.76 + hash(i, 8214)*W*.24); x.fillStyle = 'rgba(140,180,220,.4)'; x.fillRect(gx, H*.595, 1, 2); }
  }), 0, 0, W, H);
  b81Lamp(ctx, W*.23, H*.56, H/300, t, mo, 0); // the lamp on the gate
  // the brazier, and the light of it on the flags
  const bx = W*.66, by = H*.84; ctx.fillStyle = '#1a1a1c'; ctx.fillRect(bx - 8, by - 6, 16, 6); B2F.line(ctx, '#1a1a1c', 1.4, [[bx - 6, by], [bx - 9, by + 10]]); B2F.line(ctx, '#1a1a1c', 1.4, [[bx + 6, by], [bx + 9, by + 10]]);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, bx, by - 6, H*.3, '#ff8a3a', .2*fl); ctx.globalCompositeOperation = 'source-over';
  poly(ctx, [[bx - 7, by - 6], [bx - 2, by - 16*fl], [bx + 1, by - 9], [bx + 4, by - 14*fl], [bx + 7, by - 6]], 'rgba(255,150,60,.95)');
  if (!(S && S.f && S.f.b8_c1_huntDone)) [[.6, -1], [.72, -1], [.68, 1]].forEach(([u, d], i) => drawFigure(ctx, i === 2 ? 'houseguard' : 'thug', W*u, H*.86, 1.35, t, {dir:d, phase:i}));
  const sq = marchOrder(sceneSquad()); squadLine(sq, -1, (id, i) => drawFigure(ctx, id, W*(.08 + i*Math.min(.06, .3/sq.length)), H*.97 - (i % 2)*2, 1.75, t, {phase:i, dir:1}));
  vign(ctx, W, H, .72, .5); };

/* ---------------- the chapter's gear (200×150, Book Eight's ground: night slate-blue, gas-blue rim light) ---------------- */
{ const bg = id => `<defs><radialGradient id="${id}-bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#2a3038"/><stop offset=".62" stop-color="#161a20"/><stop offset="1" stop-color="#0a0c10"/></radialGradient><radialGradient id="${id}-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`;
  /* the blackened Guild knife: long and thin in the blade, short in the grip, soot-black, a gas-blue line of light along the edge */
  ART['item/b8_c1_guildknife'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A blackened Guild knife">${bg('b81gk')}
<linearGradient id="b81gk-bl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3c44"/><stop offset=".5" stop-color="#1a1b20"/><stop offset="1" stop-color="#0a0a0c"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b81gk-bg)"/><ellipse cx="100" cy="112" rx="70" ry="8" fill="url(#b81gk-sh)"/>
<path d="M30 92 L148 54 L172 46 L150 60 L36 100 Z" fill="url(#b81gk-bl)" stroke="#050506" stroke-width="1.2"/>
<path d="M36 94 L150 57 L170 47" stroke="#8ab8ff" stroke-width="1" fill="none" opacity=".55"/>
<rect x="18" y="92" width="22" height="9" rx="2" transform="rotate(-18 29 96)" fill="#1e1a22" stroke="#050506"/>
<rect x="38" y="84" width="4" height="20" rx="1" transform="rotate(-18 40 94)" fill="#3a3440"/>
<path d="M20 100 L38 94" stroke="#4a4252" stroke-width="1" opacity=".7"/><circle cx="16" cy="103" r="3.6" fill="#2a2630" stroke="#050506"/>
<ellipse cx="110" cy="70" rx="56" ry="26" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c1_guildknife'] = [200, 150];
  /* the roof-boots: a pair of soft felt boots, oiled dark, laced to the knee, standing side by side on wet slate */
  ART['item/b8_c1_roofboots'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A pair of roof-boots">${bg('b81rb')}
<linearGradient id="b81rb-f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a4450"/><stop offset=".5" stop-color="#2e2a34"/><stop offset="1" stop-color="#141218"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b81rb-bg)"/><path d="M0 120 L200 112 L200 150 L0 150 Z" fill="#14161c"/><path d="M0 120 L200 112" stroke="#6a8ab8" stroke-width=".8" opacity=".35"/>
<ellipse cx="100" cy="122" rx="62" ry="7" fill="url(#b81rb-sh)"/>
<path d="M58 30 L82 30 L84 98 Q100 104 108 116 L50 118 Q46 108 56 100 Z" fill="url(#b81rb-f)" stroke="#08080a" stroke-width="1.2"/>
<path d="M104 26 L128 26 L130 96 Q146 102 154 114 L96 116 Q92 106 102 98 Z" fill="url(#b81rb-f)" stroke="#08080a" stroke-width="1.2"/>
<path d="M60 40 L80 46 M60 52 L80 58 M60 64 L80 70 M60 76 L80 82 M106 36 L126 42 M106 48 L126 54 M106 60 L126 66 M106 72 L126 78" stroke="#8a7a5a" stroke-width="1" opacity=".75"/>
<path d="M52 117 L106 115 M98 115 L152 113" stroke="#050506" stroke-width="2.4"/><path d="M60 32 L60 96 M106 28 L106 94" stroke="#8ab8ff" stroke-width=".8" opacity=".35"/>
<ellipse cx="100" cy="74" rx="56" ry="40" fill="#6a9ae0" opacity=".05"/></svg>`;
  ART_SIZE['item/b8_c1_roofboots'] = [200, 150];
}
