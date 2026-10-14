/* ============ Book Three: the visions' art (68) — backdrops VISBG b3v_* and the figures FIGX b3v_* ============
   Drawn the way Book Two's vision backdrops are (56) and in Book Three's light (60b, 60d, 61b..67b): cold spring skies, long low ridges,
   fires as warm glows in the dark, figures in the ~32px frame lit from the left. 36b's drawVision lays the vision's own figure, the motes,
   the Deck's violet and the vignette over each backdrop. The grim things are far off and in silhouette: the streets of Capustan are a
   red glow behind the parapet, the K'ell Hunters dark shapes on a ridge, the keep at Coral a black tooth with cold windows. */

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* Gruntle before the Tiger: a big caravan captain, a travel-stained leather jerkin over a linen shirt, a short dark beard, two cutlasses
     sheathed at the hips, and the look of a man who slept under a wagon */
  b3v_gruntle(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.16, 1.14);
    h.legs('#3a3026'); ctx.fillStyle = '#4a3624'; ctx.fillRect(-4.6, 9.2, 3.6, 3.8); ctx.fillRect(1, 9.2, 3.6, 3.8); // travel boots
    ctx.fillStyle = '#8a7e66'; ctx.fillRect(-9.2, -5.6, 3, 8.6); ctx.fillRect(6.2, -5.6, 3, 8.6); // shirt sleeves, rolled
    ell(ctx, -7.7, 3.6, 1.6, 1.5, '#8a6444'); ell(ctx, 7.7, 3.6, 1.7, 1.6, '#b48654');
    poly(ctx, [[-7,-6.4],[7,-6.4],[6.6,7.4],[-6.6,7.4]], h.armor('#6e5438', '#24180e')); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-.3, -6, .6, 13); // the jerkin
    poly(ctx, [[-1.8,-6.4],[1.8,-6.4],[0,-3.4]], '#c8bca0');
    ctx.fillStyle = '#2a1c10'; ctx.fillRect(-6.8, 3, 13.6, 1.5); ctx.fillStyle = '#9a8a5a'; ctx.fillRect(-1, 3, 2, 1.5); // belt, an old buckle
    B2F.line(ctx, '#2a1c10', 1.6, [[-6, 4.4], [-8.4, 10.6]]); B2F.line(ctx, '#2a1c10', 1.6, [[6, 4.4], [8.4, 10.6]]); ctx.fillStyle = '#8a7a4a'; ctx.fillRect(-6.6, 3.4, 1.6, 1.2); ctx.fillRect(5, 3.4, 1.6, 1.2); // two cutlasses, sheathed
    h.head('#b48654', 4.7, -11.4); h.look('rgba(30,18,6,.92)', -11.8); ctx.fillStyle = 'rgba(80,30,20,.25)'; ctx.fillRect(-.8, -10.6, 4.6, .8); // red-eyed, this morning
    poly(ctx, [[-3.6,-9.4],[4.2,-9.4],[3.8,-7.2],[1.4,-6],[-1.4,-6.2],[-3.2,-7.4]], '#2a1c10'); // a short dark beard
    B2F.cap(ctx, '#1e140c', 4.8, -12.6, 1.02, 1.98); ctx.fillStyle = 'rgba(30,20,12,.7)'; ctx.fillRect(-4.7, -12.6, 1.2, 2.2);
    ctx.restore(); },
  /* Stonny Menackis: lean, black hair tied back, a fitted leather coat, a rapier out and low */
  b3v_stonny(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, 1.04); const sw = o.still ? 0 : Math.sin(t/260 + (o.phase || 0))*.25;
    h.legs('#2a2420'); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-4.5, 7.6, 3.4, 5.4); ctx.fillRect(1.1, 7.6, 3.4, 5.4); // tall boots
    poly(ctx, [[-5.6,-6],[5.6,-6],[6.4,6.4],[-6.4,6.4]], h.armor('#5a3a2a', '#1e120c')); ctx.fillStyle = '#c8b88a'; ctx.fillRect(-.4, -6, .8, 9); ctx.fillStyle = '#1a100a'; ctx.fillRect(-6, 2.6, 12, 1.1);
    h.head('#c09a7c', 4.2, -11.4); h.look('rgba(20,12,8,.9)', -11.7);
    B2F.cap(ctx, '#0e0a08', 4.5, -12.8); ctx.fillStyle = '#0e0a08'; ctx.fillRect(-5.2, -12, 1.6, 7); // black hair, tied back
    ell(ctx, 6.6, 1.4, 1.3, 1.3, '#c09a7c'); ctx.save(); ctx.translate(6.6, 1.4); ctx.rotate(-.5 + sw); B2F.line(ctx, '#d8d4c8', .7, [[0, 0], [14, 0]]); ctx.strokeStyle = '#a89058'; ctx.lineWidth = .6; ctx.beginPath(); ctx.arc(.6, 0, 1.6, -1.6, 1.6); ctx.stroke(); ctx.restore(); // the rapier
    ctx.restore(); },
  /* Harllo: broad, fair, an apron of a cook's sacking over his mail-shirt, a ladle */
  b3v_harllo(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.1, 1.02);
    h.legs('#3a3428'); poly(ctx, [[-6.8,-6],[6.8,-6],[6.4,7],[-6.4,7]], h.armor('#8a8a86', '#3a3a38')); B3F.mail(ctx, -6.4, 6.4, -5.6, 2);
    poly(ctx, [[-4.6,-1],[4.6,-1],[5.2,9],[-5.2,9]], '#8a7a5a'); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(-4.6, -1, 9.2, .8);
    h.head('#d0a888', 4.6, -11.2); h.look('rgba(30,20,12,.85)', -11.5); B2F.cap(ctx, '#c8a060', 4.8, -12.6); ctx.fillStyle = 'rgba(200,160,96,.7)'; ctx.fillRect(-3.4, -8.6, 7, 1.4); // fair hair, a fair stubble
    B2F.line(ctx, '#6a5a44', .9, [[6.6, 2], [10, -6]]); ell(ctx, 10.4, -6.6, 1.4, 1, '#5a4a34');
    ctx.restore(); },
  /* Itkovian before the siege: the Grey Swords' plate whole and clean, a grey surcoat, the visored helm under his arm; very straight */
  b3v_itkovian(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.02, 1.12);
    h.legs('#4a4a4c'); ctx.fillStyle = '#7a7a7c'; ctx.fillRect(-4.6, 5.4, 3.6, 5); ctx.fillRect(1, 5.4, 3.6, 5); ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(-4.6, 5.4, 1, 5); ctx.fillRect(1, 5.4, 1, 5);
    poly(ctx, [[-6.4,-6.4],[6.4,-6.4],[6,6],[-6,6]], h.armor('#b2b4b6', '#46484c')); ctx.fillStyle = 'rgba(0,0,0,.28)'; for (let i=0;i<3;i++) ctx.fillRect(-6, -1 + i*2.4, 12, .45);
    poly(ctx, [[-4.4,-2],[4.4,-2],[5.4,11],[-5.4,11]], h.armor('#9a9c9e', '#44464a')); ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(-.3, -1, .6, 11.6); ctx.fillStyle = 'rgba(30,30,34,.6)'; ctx.fillRect(-2.6, 2, 5.2, 1); // the surcoat, whole
    ell(ctx, -6.6, -5.6, 2.8, 2.2, '#9a9c9e'); ell(ctx, 6.6, -5.6, 2.8, 2.2, '#6a6c70'); ctx.fillStyle = 'rgba(255,255,255,.24)'; ctx.fillRect(-8.4, -6.6, 2.4, .7);
    ctx.fillStyle = '#2a2420'; ctx.fillRect(-7.6, 2, 1.6, 9); B2F.line(ctx, '#5a5248', 1.1, [[-8.8, 2], [-4.8, 2]]); // the sword at his hip
    ell(ctx, 8.8, 0, 3.4, 3.6, h.armor('#a8aaac', '#3a3c40')); ctx.fillStyle = '#0a0a0c'; ctx.fillRect(7.6, -.8, 3, 1); ctx.fillStyle = '#6a6a6c'; ctx.fillRect(6.2, 2.6, 2.4, 2); // the helm under his arm
    h.head('#b8a08e', 4.1, -11.6); h.look('rgba(18,12,10,.9)', -11.9);
    B2F.cap(ctx, '#4a3a2c', 4.3, -12.7, 1.04, 1.96); ctx.fillStyle = 'rgba(74,58,44,.6)'; ctx.fillRect(-4.2, -12.7, 1.2, 2);
    ctx.restore(); },
  /* Picker: a Bridgeburner corporal, short-cropped hair, a scuffed leather cuirass, a crossbow; two bronze torcs on her upper arms */
  b3v_picker(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .98, 1.02);
    h.legs('#2e2a24'); ctx.fillStyle = '#3a2e22'; ctx.fillRect(-4.5, 9, 3.4, 4); ctx.fillRect(1.1, 9, 3.4, 4);
    ctx.fillStyle = '#9a7656'; ctx.fillRect(-8.6, -5.4, 2.8, 8); ctx.fillRect(5.8, -5.4, 2.8, 8); // bare arms
    if (!(typeof VIS !== 'undefined' && VIS && VIS.id === 'b3v3' && VIS.step >= 2)) { ctx.fillStyle = '#c89a4a'; ctx.fillRect(-8.8, -3.6, 3.2, 1.2); ctx.fillRect(5.6, -3.6, 3.2, 1.2); ctx.fillStyle = 'rgba(255,230,160,.6)'; ctx.fillRect(-8.6, -3.6, 1, .5); } // the torcs (gone, after she gives them up)
    poly(ctx, [[-6,-6],[6,-6],[6,6.6],[-6,6.6]], h.armor('#7a5a3a', '#2a1a0e')); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-6, 1.4, 12, .6); ctx.fillStyle = '#1e140c'; ctx.fillRect(-6, 3, 12, 1.2);
    ctx.fillStyle = '#5a6a48'; ctx.fillRect(-6, -6, 12, 1.4); // a faded Bridgeburner green at the collar
    h.head('#b48a6a', 4.2, -11.4); h.look('rgba(22,12,8,.9)', -11.7); B2F.cap(ctx, '#3a2414', 4.5, -12.6, 1, 2); ctx.fillStyle = '#3a2414'; ctx.fillRect(-4.5, -12.6, 1.2, 2.6); // cropped brown hair
    ctx.strokeStyle = '#4a3220'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(12, -2); ctx.stroke(); ctx.strokeStyle = '#8d8a86'; ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(9.4, -6.4); ctx.quadraticCurveTo(11, -2, 9.4, 2.4); ctx.stroke(); // the crossbow
    ctx.restore(); },
  /* Old Benna: a Host laundress, stooped, a grey shawl, sleeves pushed up, a red-raw pair of hands and a wash-apron */
  b3v_benna(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, .9); ctx.translate(0, 1); ctx.rotate(.06);
    h.legs('#2e2a26'); B2F.robe(ctx, h, '#5a5248', '#22201c', 5.8, 7.4); poly(ctx, [[-4.4,-2],[4.4,-2],[5.6,11],[-5.6,11]], '#8a8274'); ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i=0;i<3;i++) ctx.fillRect(-4.8, 1 + i*3.2, 9.6, .5); // the wash-apron, damp
    poly(ctx, [[-7,-6.6],[7,-6.6],[5,-1],[0,1],[-5,-1]], h.armor('#8a8a84', '#3a3a36')); // the shawl
    ctx.fillStyle = '#b8846a'; ctx.fillRect(-8, -2, 2.4, 5); ctx.fillRect(5.6, -2, 2.4, 5); ell(ctx, -6.8, 3.2, 1.4, 1.3, '#c47a62'); ell(ctx, 6.8, 3.2, 1.4, 1.3, '#c47a62'); // forearms, hands red from the tubs
    h.head('#b89a84', 4.2, -11.2); h.look('rgba(30,20,14,.85)', -11.4); ctx.fillStyle = 'rgba(80,50,40,.3)'; ctx.fillRect(-2.4, -8.4, 5.6, .5);
    B2F.cloth(ctx, '#6a6258', 'rgba(40,36,30,.6)'); ctx.fillStyle = 'rgba(210,206,196,.7)'; ctx.fillRect(-4.6, -12.2, 1.4, 2.6); // a head-cloth, grey hair under it
    ctx.restore(); },
});

/* ---------------- backdrop helpers ---------------- */
const B3VB = {
  sky(ctx, W, y, stops){ ctx.fillStyle = vgrad(ctx, 0, y, stops); ctx.fillRect(0, 0, W, y + 1); },
  stars(ctx, W, H, T, n, ymax = .55, a = .7, seed = 1){ for (let i=0;i<n;i++){ ctx.globalAlpha = a*(.35 + .65*Math.abs(Math.sin(T/1100 + i*1.7))); ctx.fillStyle = '#dce6f4'; const b = hash(i, seed + 2) > .94 ? 1.6 : 1.1; ctx.fillRect(hash(i, seed)*W, Math.pow(hash(i, seed + 1), 1.4)*H*ymax, b, b); } ctx.globalAlpha = 1; },
  /* a long low ridge line, filled down to the bottom */
  ridge(ctx, W, H, base, amp, seed, col, peaks = []){ const pts = typeof moiRidge === 'function' ? moiRidge(W, H, base, amp, seed, peaks) : [[0, base - amp*.5], [W, base - amp*.5]]; ctx.beginPath(); ctx.moveTo(0, H); pts.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(W, H); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); return pts; },
  /* grass in the foreground: short strokes, a little wind */
  grass(ctx, W, y0, y1, T, n, col, seed = 3){ ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.beginPath(); for (let i=0;i<n;i++){ const y = y0 + hash(i, seed)*(y1 - y0), d = (y - y0)/(y1 - y0 + 1), x = hash(i, seed + 1)*W, l = 2 + d*6, w = Math.sin(T/900 + x/40)*(1 + d)*.8; ctx.moveTo(x, y); ctx.lineTo(x + w + 1, y - l); } ctx.stroke(); },
  fire(ctx, x, y, T, k = 1){ const f = REDUCE() ? 1 : .86 + Math.sin(T/120)*.07 + Math.sin(T/47)*.05; glow(ctx, x, y - 4*k, 46*k, '#e07a30', .3*f); poly(ctx, [[x - 5*k, y],[x - 2*k, y - 10*k*f],[x, y - 4*k],[x + 2*k, y - 13*k*f],[x + 5*k, y]], '#d8642a'); poly(ctx, [[x - 2.4*k, y],[x, y - 7*k*f],[x + 2.4*k, y]], '#ffc060'); },
  /* a rider seen from the side, small: a horse at a walk and a man on it with a lance; dir 1 faces right */
  rider(ctx, x, y, s, col, T, ph = 0, dir = 1, lance = true){ ctx.save(); ctx.translate(x, y); ctx.scale(dir*s, s); const g = REDUCE() ? 0 : Math.sin(T/180 + ph);
    ctx.fillStyle = col; ell(ctx, 0, -7, 6, 2.6, col); ctx.fillRect(4, -11, 2.2, 4.6); ell(ctx, 6.4, -11, 2.4, 1.3, col); // body, neck, head
    ctx.strokeStyle = col; ctx.lineWidth = 1.1; ctx.beginPath(); [[-4, g], [-2.6, -g], [3, -g], [4.4, g]].forEach(([lx, k]) => { ctx.moveTo(lx, -5.6); ctx.lineTo(lx + k*1.4, 0); }); ctx.moveTo(-6, -7.4); ctx.lineTo(-8, -3.6); ctx.stroke(); // legs, tail
    ctx.fillRect(-1.4, -14.6, 2.8, 6); ell(ctx, 0, -16, 1.5, 1.5, col); // the rider
    if (lance) { ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(-1, -9); ctx.lineTo(2.4, -24); ctx.stroke(); }
    ctx.restore(); },
  /* a covered wagon in profile */
  wagon(ctx, x, y, s, body, cover, wheel){ ctx.fillStyle = body; ctx.fillRect(x - 14*s, y - 9*s, 28*s, 5*s); ctx.beginPath(); ctx.moveTo(x - 13*s, y - 9*s); ctx.quadraticCurveTo(x - 12*s, y - 21*s, x, y - 21*s); ctx.quadraticCurveTo(x + 12*s, y - 21*s, x + 13*s, y - 9*s); ctx.closePath(); ctx.fillStyle = cover; ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i=0;i<3;i++) ctx.fillRect(x - 8*s + i*8*s, y - 20*s, .8*s, 11*s);
    [x - 9*s, x + 9*s].forEach(wx => { ctx.strokeStyle = wheel; ctx.lineWidth = 1.4*s; ctx.beginPath(); ctx.arc(wx, y - 2.6*s, 3.6*s, 0, 7); ctx.stroke(); }); B2F.line(ctx, wheel, 1*s, [[x + 14*s, y - 6*s], [x + 22*s, y - 3*s]]); },
  /* a small walking figure in silhouette, for crowds far off */
  walker(ctx, x, y, s, col, T, ph = 0, dir = -1, load = 0){ const g = REDUCE() ? 0 : Math.sin(T/260 + ph); ctx.fillStyle = col; ctx.fillRect(x - 1.1*s, y - 6.4*s, 2.2*s, 4.4*s); ell(ctx, x, y - 7.6*s, 1.2*s, 1.2*s, col);
    ctx.strokeStyle = col; ctx.lineWidth = .9*s; ctx.beginPath(); ctx.moveTo(x - .4*s, y - 2*s); ctx.lineTo(x - .4*s + g*1.2*s, y); ctx.moveTo(x + .4*s, y - 2*s); ctx.lineTo(x + .4*s - g*1.2*s, y); ctx.stroke(); if (load) ell(ctx, x - dir*1.6*s, y - 6*s, 1.8*s, 2.2*s, col); },
  /* a hunched T'lan Imass in silhouette, for the ranks */
  imass(ctx, x, y, s, col){ poly(ctx, [[x - 2.6*s, y],[x - 2.8*s, y - 5*s],[x - 1.6*s, y - 7.4*s],[x - .4*s, y - 8.4*s],[x + 1.2*s, y - 8*s],[x + 2.6*s, y - 6*s],[x + 2.8*s, y]], col); ell(ctx, x + .2*s, y - 9.2*s, 1.3*s, 1.3*s, col); B2F.line(ctx, col, .7*s, [[x + 2.6*s, y - 4*s], [x + 3.6*s, y - 10*s]]); },
  /* dust standing in the air: a soft column of tan glow */
  dust(ctx, x, y, w, h, T, a, seed = 0){ for (let i=0;i<7;i++){ const k = i/6, dy = REDUCE() ? 0 : Math.sin(T/1700 + i + seed)*3; glow(ctx, x + (hash(i, seed + 40) - .5)*w*.6, y - k*h + dy, w*(.35 + hash(i, seed + 41)*.25), '#c8b08a', a*(1 - k*.6)); } },
  /* a quorl far off, side-on: a long thin body, a rider's bump, two pairs of wings as a flat shimmer over it */
  quorl(ctx, x, y, s, T, a = 1, ph = 0, dir = 1){ ctx.save(); ctx.translate(x, y); ctx.scale(dir*s, s); const f = REDUCE() ? .6 : .5 + Math.abs(Math.sin(T/40 + ph))*.5;
    ell(ctx, -2, -2.4, 9, 2.2*f + .4, `rgba(170,196,224,${.22*a})`); ell(ctx, 5, -2.2, 7, 2*f + .4, `rgba(170,196,224,${.18*a})`);
    ctx.fillStyle = `rgba(4,6,10,${a})`; ctx.beginPath(); ctx.moveTo(-22, .6); ctx.quadraticCurveTo(-8, -.8, 9, -1.2); ctx.quadraticCurveTo(13, -1, 13, .4); ctx.quadraticCurveTo(9, 1.6, -8, 1.2); ctx.closePath(); ctx.fill(); ell(ctx, 14, 0, 2, 1.7, ctx.fillStyle); ctx.fillRect(2, -4.6, 2, 3.6); ell(ctx, 3, -5.4, 1.1, 1.1, ctx.fillStyle); ctx.strokeStyle = `rgba(150,176,210,${.35*a})`; ctx.lineWidth = .5/s + .3; ctx.beginPath(); ctx.moveTo(-22, .6); ctx.quadraticCurveTo(-8, -.8, 9, -1.2); ctx.quadraticCurveTo(13, -1, 13, .4); ctx.stroke();
    ctx.restore(); },
  /* a K'ell Hunter in silhouette on a skyline: leaning forward, the tail out straight, the long blades down */
  khell(ctx, x, y, s, col, dir = -1){ ctx.save(); ctx.translate(x, y); ctx.scale(dir*s, s);
    poly(ctx, [[-14, -15],[-4, -18],[4, -21],[8, -24],[11, -23],[9, -19],[4, -15],[-2, -12],[-14, -14]], col); // tail, body, neck, head
    B2F.line(ctx, col, 1.6, [[-1, -13], [-3, -6], [-1, 0]]); B2F.line(ctx, col, 1.6, [[1, -13], [3, -6], [5, 0]]); // legs
    B2F.line(ctx, col, .9, [[5, -17], [9, -10], [14, -4]]); B2F.line(ctx, col, .9, [[3, -16], [6, -9], [9, -2]]); // the blades
    ctx.restore(); },
  /* the hide tents of Brood's camp and the Rhivi */
  tent(ctx, x, y, s, c){ poly(ctx, [[x - 9*s, y],[x - 1*s, y - 11*s],[x + 1*s, y - 11*s],[x + 9*s, y]], c); B2F.line(ctx, c, .8*s, [[x - 1*s, y - 11*s], [x - 2.4*s, y - 14*s]]); B2F.line(ctx, c, .8*s, [[x + 1*s, y - 11*s], [x + 2.4*s, y - 14*s]]); },
};

Object.assign(VISBG, {
  /* Saltoan at dawn: the wall and its towers, the river, the caravan's wagons and Keruli's shut carriage; then the road east and the people on it */
  b3v_saltoan(ctx, W, H, T, v){ const s = v.step || 0, road = s >= 3;
    B3VB.sky(ctx, W, H*.6, [[0, '#4a5068'], [.6, '#a8988a'], [1, '#d8b890']]); glow(ctx, road ? W*.92 : W*.82, H*.56, W*.4, '#ffd8a0', .3);
    for (let i=0;i<3;i++) cloud(ctx, W*(.18 + i*.32), H*(.14 + i*.04), W*.3, 3, '#e8d0b8', .12);
    B3VB.ridge(ctx, W, H, H*.58, H*.06, 31, '#6a6670');
    if (!road) { // the town on its river: a curtain wall, towers, roofs gone to ruin at one end
      ctx.fillStyle = '#4a4248'; ctx.fillRect(0, H*.38, W*.62, H*.24); for (let i=0;i<5;i++){ const x = W*(.02 + i*.13); ctx.fillRect(x, H*(.3 - hash(i, 51)*.04), W*.05, H*.2); for (let j=0;j<3;j++) ctx.fillRect(x + j*W*.018, H*(.28 - hash(i, 51)*.04), W*.01, H*.02); }
      ctx.fillStyle = '#3a343a'; for (let i=0;i<9;i++) poly(ctx, [[W*(.04 + i*.065), H*.38],[W*(.07 + i*.065), H*(.32 - hash(i, 52)*.03)],[W*(.1 + i*.065), H*.38]], '#3a343a');
      ctx.fillStyle = 'rgba(255,220,170,.22)'; ctx.fillRect(0, H*.38, W*.62, 1); poly(ctx, [[W*.56, H*.62],[W*.6, H*.4],[W*.64, H*.46],[W*.66, H*.62]], '#4a4248'); } // the broken end
    else { ctx.fillStyle = '#5a525a'; ctx.fillRect(0, H*.5, W*.12, H*.1); ctx.fillRect(W*.02, H*.46, W*.03, H*.06); } // the town small behind them now
    ctx.fillStyle = vgrad(ctx, H*.62, H*.7, [[0, '#6a5a48'], [1, '#4a3e30']]); ctx.fillRect(0, H*.62, W, H*.08); ctx.fillStyle = 'rgba(255,220,170,.18)'; for (let i=0;i<8;i++) ctx.fillRect(hash(i, 53)*W, H*(.63 + hash(i, 54)*.05), 10 + hash(i, 55)*14, 1); // the brown river
    ctx.fillStyle = vgrad(ctx, H*.7, H, [[0, '#5a5438'], [1, '#2e2a1c']]); ctx.fillRect(0, H*.7, W, H*.3); B3VB.grass(ctx, W, H*.72, H, T, 90, 'rgba(110,104,70,.6)', 5);
    if (!road) { B3VB.wagon(ctx, W*.62, H*.84, 1.1, '#3a2a1a', '#a89a7e', '#2a1e12'); B3VB.wagon(ctx, W*.86, H*.8, .9, '#3a2a1a', '#968a70', '#2a1e12');
      ctx.fillStyle = '#2a1c14'; ctx.fillRect(W*.4, H*.66, W*.12, H*.12); ctx.fillStyle = '#4a2a20'; ctx.fillRect(W*.405, H*.675, W*.03, H*.07); ctx.fillRect(W*.47, H*.675, W*.03, H*.07); ell(ctx, W*.42, H*.79, 4, 4, '#1a120c'); ell(ctx, W*.5, H*.79, 4, 4, '#1a120c'); // Keruli's carriage, curtains drawn
      B3VB.fire(ctx, W*.34, H*.92, T, .9); ctx.fillStyle = 'rgba(200,200,210,.14)'; for (let i=0;i<5;i++) ell(ctx, W*.34 + Math.sin(T/900 + i)*4 + i*2, H*(.82 - i*.05), 3 + i, 2 + i*.6, 'rgba(200,200,210,.1)'); // smoke from the fire
      if (s <= 1) { drawFigure(ctx, 'b3v_stonny', W*.76, H*.94, 1.8, T, {dir:-1, phase:1}); drawFigure(ctx, 'b3v_harllo', W*.42, H*.95, 1.8, T, {dir:-1, still:true}); }
      ctx.fillStyle = '#4a3a2a'; ctx.fillRect(W*.82, H*.92, 3, 10); } // Stonny's fence post
    else { for (let i=0;i<3;i++) B3VB.wagon(ctx, W*(.5 + i*.18) + (REDUCE() ? 0 : (T*.004) % 10), H*(.86 - i*.03), 1 - i*.15, '#3a2a1a', '#a89a7e', '#2a1e12');
      drawFigure(ctx, 'b3v_stonny', W*.44, H*.9, 1.7, T, {dir:1, phase:1}); drawFigure(ctx, 'b3v_harllo', W*.62, H*.94, 1.7, T, {dir:1, phase:2});
      if (s === 4) { const step = REDUCE() ? 0 : T*.006; for (let i=0;i<10;i++){ const x = W*(.98 - ((hash(i, 56)*.5 + step*.002*(1 + hash(i, 57))) % .6)), y = H*(.66 + hash(i, 58)*.04); B3VB.walker(ctx, x, y, 1.1 + hash(i, 59)*.3, '#3a342c', T, i, -1, hash(i, 60) > .5); } } } // the people coming west
    return {fx:road ? W*.28 : W*.22, fy:H*.9, fs:2.2}; },

  /* north of Capustan: grey grass to every edge under a low sky; the tracks; the Hunter and the ropes; the four on the ridge and the dust; after */
  b3v_capplain(ctx, W, H, T, v){ const s = v.step || 0;
    B3VB.sky(ctx, W, H*.58, [[0, '#5a6068'], [1, '#9aa09a']]); for (let i=0;i<4;i++) cloud(ctx, W*(.1 + i*.26), H*(.12 + (i%2)*.06), W*.34, 3, '#3e444c', .18);
    if (s >= 5) { glow(ctx, W*.8, H*.56, W*.4, '#8a6a4a', .3); ctx.fillStyle = 'rgba(110,84,60,.35)'; ctx.fillRect(0, H*.5, W, H*.07); } // the Domin's dust, the width of the world
    const rp = B3VB.ridge(ctx, W, H, H*.58, H*.1, 23, '#5a6458', [[.72, .6, .2]]); // the ridge, highest on the right
    if (s === 4) { for (let i=0;i<4;i++){ const k = .62 + i*.07; const p = rp[Math.round(k*64)]; B3VB.khell(ctx, p[0], Math.max(p[1] + H*.045, H*.585), .7, '#2a2e2e', -1); } } // four on the skyline
    ctx.fillStyle = vgrad(ctx, H*.58, H, [[0, '#6a7464'], [1, '#3a4436']]); ctx.fillRect(0, H*.6, W, H*.4); B3VB.grass(ctx, W, H*.62, H, T, 140, 'rgba(150,160,130,.45)', 7);
    if (s <= 1) for (let i=0;i<7;i++) B3VB.rider(ctx, W*(.42 + i*.06), H*(.68 + (i%2)*.02), .9, '#3a3e3c', T, i, 1);
    if (s === 1) for (let i=0;i<6;i++){ const x = W*(.36 + i*.1), y = H*(.86 + (i%2)*.05); ell(ctx, x, y, 7, 2, 'rgba(20,24,18,.6)'); for (let k=-1;k<=1;k++) B2F.line(ctx, 'rgba(20,24,18,.6)', 1.2, [[x + 4, y], [x + 9, y + k*3]]); ell(ctx, x, y + 1, 12, 3, 'rgba(160,160,150,.15)'); } // three-toed prints, the grass grey round them
    if (s === 2) { const kx = W*.62, ky = H*.86; drawFigure(ctx, 'khell', kx, ky, 1.35, T, {dir:-1}); // the Hunter, and the ropes on it
      for (let i=0;i<5;i++){ const a = i/5*Math.PI*2 + (REDUCE() ? 0 : T/3000), rx = kx + Math.cos(a)*W*.26, ry = H*(.8 + Math.sin(a)*.08); B3VB.rider(ctx, rx, ry, 1.25, '#2e3230', T, i, Math.cos(a) > 0 ? -1 : 1); ctx.strokeStyle = 'rgba(200,180,140,.7)'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(rx, ry - 16); ctx.quadraticCurveTo((rx + kx)/2, ry - 6, kx, ky - 22); ctx.stroke(); } }
    if (s === 3) { const kx = W*.62, ky = H*.88; poly(ctx, [[kx - 34, ky],[kx - 26, ky - 8],[kx - 6, ky - 12],[kx + 10, ky - 9],[kx + 22, ky - 4],[kx + 40, ky - 2],[kx + 36, ky + 2]], '#2a2c2a'); B2F.line(ctx, '#3a3c38', 1.6, [[kx - 6, ky - 10], [kx + 6, ky - 22]]); B2F.line(ctx, '#3a3c38', 1.6, [[kx + 2, ky - 10], [kx + 18, ky - 16]]); // the Hunter down in the grass, a long grey heap
      ctx.strokeStyle = 'rgba(200,180,140,.6)'; ctx.lineWidth = .8; for (let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(kx - 20 + i*18, ky - 6); ctx.quadraticCurveTo(kx + 30 + i*10, ky - 20, W*(.76 + i*.06), H*(.76 + (i%2)*.03)); ctx.stroke(); }
      for (let i=0;i<4;i++) B3VB.rider(ctx, W*(.74 + i*.06), H*(.78 + (i%2)*.03), .9, '#2e3230', T, i, -1); for (let i=0;i<3;i++) ell(ctx, W*(.4 + i*.08), H*(.9 + (i%2)*.03), 8, 2.4, '#2a2e26'); }
    if (s === 4) { for (let i=0;i<5;i++) B3VB.dust(ctx, W*(.3 + i*.13), H*.82, 36, H*.4, T, .2, i); for (let i=0;i<9;i++) B3VB.imass(ctx, W*(.28 + i*.07), H*(.84 + (i%3)*.03), 1.5, 'rgba(70,60,46,.85)'); drawFigure(ctx, 'b3_c4_imass', W*.62, H*.94, 1.8, T, {dir:1}); }
    if (s >= 5) { ell(ctx, W*.66, H*.88, 22, 4, '#2a2e26'); ell(ctx, W*.86, H*.82, 16, 3, '#2e3228'); B3VB.dust(ctx, W*.55, H*.92, 30, H*.2, T, .1, 9); drawFigure(ctx, 'b3_c4_imass', W*.5, H*.92, 2, T, {dir:-1, still:true}); for (let i=0;i<5;i++) B3VB.rider(ctx, W*(.72 + i*.05), H*(.74 + (i%2)*.02), .8, '#3a3e3c', T, i, -1); }
    return {fx:W*.22, fy:H*.9, fs:2.2}; },

  /* Capustan at night from a roof: domes and smoke against a red sky, the parapet, the stair-head door; at dawn, the plain and the standards on the hills */
  b3v_caproof(ctx, W, H, T, v){ const s = v.step || 0, dawn = s >= 4, sc = Math.max(.6, Math.min(1, W/600));
    B3VB.sky(ctx, W, H*.7, dawn ? [[0, '#5a5a6e'], [.6, '#a88a80'], [1, '#d8a888']] : [[0, '#0e0a10'], [.6, '#3a1814'], [1, '#7a3018']]);
    if (!dawn) B3VB.stars(ctx, W, H, T, 18, .25, .4); else glow(ctx, W*.1, H*.6, W*.4, '#ffd0a0', .25);
    if (dawn) { B3VB.ridge(ctx, W, H, H*.5, H*.08, 41, '#6a6460'); ctx.fillStyle = '#7a6e62'; ctx.fillRect(0, H*.5, W, H*.08); // the plain past the wall; the standards coming down the hills
      for (let i=0;i<14;i++){ const x = W*(.04 + i*.035), y = H*(.47 - hash(i, 61)*.03); ctx.fillStyle = '#2a2420'; ctx.fillRect(x, y, 1, 7); ctx.fillStyle = i%3 ? '#5a1a1a' : '#2a2a3a'; ctx.fillRect(x + 1, y, 4, 3); } ctx.fillStyle = 'rgba(40,34,30,.6)'; ctx.fillRect(W*.02, H*.5, W*.5, 2.4); } // the Host and Brood's lines, dark threads on the slope
    const fires = typeof b3c3Skyline === 'function' ? b3c3Skyline(ctx, W, H*.66, dawn ? sc*.62 : sc, 7, dawn ? {mass:['#5a4e4c', '#4a403e'], wall:'#4a4240', wallLit:'#6a5c56', tower:'#4e4644', dome:[['#8a7a50', '#4a4234'], ['#4a6a66', '#2a3a38'], ['#4a5a7a', '#2a3448']]} : {mass:['#1e1214', '#160e10'], wall:'#140c0c', wallLit:'#3a1a14', tower:'#180e0e', dome:[['#4a3420', '#1a120c'], ['#22302e', '#121a18'], ['#262a3a', '#12141c']]}, {windows:!dawn, light:dawn ? 1 : .4, thrall:W*.62}) : [];
    if (!dawn) { fires.slice(0, 6).forEach(([fx, fy], i) => { glow(ctx, fx, fy, 30*sc, '#ff6a2a', .35 + (REDUCE() ? 0 : Math.sin(T/200 + i)*.06)); if (typeof b3c3Smoke === 'function') b3c3Smoke(ctx, fx, fy, sc*.6, T, REDUCE() ? 0 : 1, i, '#1a0e0c', .5); }); glow(ctx, W*.5, H*.7, W*.6, '#ff5a20', .2); }
    else fires.slice(0, 4).forEach(([fx, fy], i) => { if (typeof b3c3Smoke === 'function') b3c3Smoke(ctx, fx, fy, sc*.5, T, REDUCE() ? 0 : 1, i, '#4a4440', .25); });
    // the roof: flat, a parapet along its edge, a stair-head with a door on the right
    ctx.fillStyle = dawn ? '#4a3e36' : '#1a1210'; ctx.fillRect(0, H*.74, W, H*.26); ctx.fillStyle = dawn ? '#5e5046' : '#22161a'; ctx.fillRect(0, H*.7, W, H*.05); for (let x=0; x<W; x+=14) ctx.fillRect(x, H*.67, 8, H*.03);
    ctx.fillStyle = dawn ? 'rgba(255,220,180,.2)' : 'rgba(255,110,50,.25)'; ctx.fillRect(0, H*.7, W, 1.2);
    const dx = W*.84; ctx.fillStyle = dawn ? '#52463e' : '#1e1416'; ctx.fillRect(dx - 18, H*.5, 36, H*.3); ctx.fillStyle = '#0a0606'; ctx.fillRect(dx - 7, H*.6, 14, H*.2); ctx.fillStyle = dawn ? '#6a5a44' : '#2a1a10'; ctx.fillRect(dx - 6, H*.61, 12, H*.19); ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; for (let i=1;i<4;i++){ ctx.beginPath(); ctx.moveTo(dx - 6, H*(.61 + i*.045)); ctx.lineTo(dx + 6, H*(.61 + i*.045)); ctx.stroke(); } // the door that holds
    ctx.fillStyle = dawn ? '#4a3c32' : '#160e0e'; ctx.fillRect(W*.3, H*.56, 10, H*.18); // a chimney
    if (!dawn) glow(ctx, W*.5, H*.86, W*.5, '#ff6a30', .12);
    drawFigure(ctx, 'b3_c3_gruntle', W*.6, H*.92, 1.9, T, {dir:-1, still:s !== 3, phase:1});
    drawFigure(ctx, 'b3_c3_capan', W*.42, H*.93, 1.6, T, {dir:1, phase:2, still:true}); drawFigure(ctx, 'b3_c7_bridgeburner', W*.72, H*.92, 1.7, T, {dir:-1, phase:3, still:s < 3});
    if (s >= 2) { const gx = W*.6 + 12, gy = H*.92 - 18; ctx.strokeStyle = 'rgba(214,170,80,.9)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(gx, gy, 2.4, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(gx + 3, gy + 1, 2.4, 0, 7); ctx.stroke(); } // the torcs, in his hands now
    if (dawn) for (let i=0;i<6;i++) B3VB.walker(ctx, W*(.12 + i*.06), H*.69, 1, '#e8e0d0', T, i, 1); // white-painted faces going down a lane, glimpsed
    return {fx:W*.22, fy:H*.92, fs:2.2}; },

  /* the Gathering: a cold plain; the valley full of standing dust and the ranks of the dead; the ride back */
  b3v_gathering(ctx, W, H, T, v){ const s = v.step || 0, val = s >= 1 && s <= 3;
    B3VB.sky(ctx, W, H*.56, [[0, '#6a7480'], [1, '#c8ccc8']]); glow(ctx, W*.2, H*.2, 18, '#f0f0e8', .5); // a pale low sun
    B3VB.ridge(ctx, W, H, H*.52, H*.05, 61, '#7a7c78');
    if (!val) { ctx.fillStyle = vgrad(ctx, H*.52, H, [[0, '#8a8a7a'], [1, '#4a4a3e']]); ctx.fillRect(0, H*.54, W, H*.46); B3VB.grass(ctx, W, H*.56, H, T, 110, 'rgba(200,200,180,.35)', 11);
      for (let i=0;i<14;i++) ell(ctx, hash(i, 62)*W, H*(.6 + hash(i, 63)*.36), 3 + hash(i, 64)*6, 1, 'rgba(230,236,240,.25)'); // frost in the hollows
      if (s === 0) { drawFigure(ctx, 'silverfox', W*.66, H*.8, 2.3, T, {dir:1, phase:1}); drawFigure(ctx, 'b2soldier', W*.08, H*.84, 1.6, T, {dir:1, phase:2}); drawFigure(ctx, 'b2soldier', W*.02, H*.88, 1.6, T, {dir:1, phase:3}); }
      else { for (let i=0;i<5;i++) B3VB.rider(ctx, W*(.62 + i*.07), H*(.66 + (i%2)*.02), 1, '#4a4a44', T, i, -1, false); drawFigure(ctx, 'b2soldier', W*.42, H*.9, 1.7, T, {dir:1, phase:2}); } }
    else { ctx.fillStyle = vgrad(ctx, H*.5, H, [[0, '#7a7466'], [1, '#3a362c']]); ctx.fillRect(0, H*.52, W, H*.48); // the valley floor, down into it
      const n = s === 3 ? 90 : 120; for (let r=0;r<5;r++) for (let i=0;i<n/5;i++){ const x = W*(.36 + (i/(n/5))*.62) + (r%2)*5, y = H*(.6 + r*.06); if (s === 3 && hash(i, r + 70) > .7) continue; B3VB.imass(ctx, x, y, .9 + r*.25, `rgba(${46 + r*6},${40 + r*5},${30 + r*4},${.55 + r*.08})`); } // the ranks
      for (let i=0;i<6;i++) B3VB.dust(ctx, W*(.4 + i*.1), H*.72, 50, H*(.5 + (s === 3 ? .2 : 0)), T, s === 3 ? .16 : .12, i + 20);
      drawFigure(ctx, 'silverfox', W*.68, H*.88, 2.3, T, {dir:-1, still:true}); if (s >= 2) { drawFigure(ctx, 'b3_c4_imass', W*.78, H*.9, 1.8, T, {dir:-1, still:true}); drawFigure(ctx, 'b3_c4_imass', W*.86, H*.88, 1.7, T, {dir:-1, still:true}); }
      drawFigure(ctx, 'b2soldier', W*.4, H*.92, 1.6, T, {dir:1, still:true}); drawFigure(ctx, 'b2soldier', W*.46, H*.94, 1.6, T, {dir:1, still:true, phase:2}); }
    return {fx:W*.22, fy:H*.9, fs:2.2}; },

  /* Brood's fire south of the Catlin: a stripped plain at night, hide tents, the command fire; then the dark walk to the Malazan lamps */
  b3v_broodfire(ctx, W, H, T, v){ const s = v.step || 0, walk = s >= 3;
    B3VB.sky(ctx, W, H*.6, [[0, '#06070e'], [1, '#1a1c2a']]); B3VB.stars(ctx, W, H, T, 70, .55, .8, 5);
    B3VB.ridge(ctx, W, H, H*.6, H*.04, 71, '#0e0f14'); ctx.fillStyle = vgrad(ctx, H*.6, H, [[0, '#14141a'], [1, '#08080a']]); ctx.fillRect(0, H*.6, W, H*.4);
    if (!walk) { for (let i=0;i<7;i++) B3VB.tent(ctx, W*(.08 + i*.14), H*(.64 + (i%2)*.03), 1.3, '#1a1612');
      const fx = W*.56, fy = H*.9; B3VB.fire(ctx, fx, fy, T, 1.8); glow(ctx, fx, fy - 10, W*.5, '#e07a30', .12);
      drawFigure(ctx, 'brood', W*.7, H*.9, 1.8, T, {dir:-1, still:true}); drawFigure(ctx, 'wj', W*.42, H*.94, 1.9, T, {dir:1, still:true});
      if (s <= 2) drawFigure(ctx, 'kallor', W*.86, H*.88, 1.8, T, {dir:-1, still:true, alpha:s === 2 ? .7 : 1}); }
    else { for (let i=0;i<12;i++){ const x = W*(.5 + i*.04), y = H*(.66 + hash(i, 72)*.02); glow(ctx, x, y, 8, '#e8a050', .3); ctx.fillStyle = '#ffd890'; ctx.fillRect(x - .6, y - .6, 1.2, 1.2); } // the Malazan lines, lamps in a row
      for (let i=0;i<5;i++) B3VB.tent(ctx, W*(.52 + i*.1), H*.68, .9, '#0e0c0a');
      if (s === 3) drawFigure(ctx, 'wj', W*.46, H*.92, 1.9, T, {dir:1, phase:1});
      if (s === 4) { const cx = W*(.2 + ((REDUCE() ? 0 : T/16000) % .8)), cy = H*.16; drawFigure(ctx, 'crone', cx, cy, .9, T, {air:true, dir:1}); } }
    return {fx:walk ? W*.3 : W*.22, fy:H*.9, fs:2.2}; },

  /* Ortnal's Cut: a black headland over a black sea; the Spawn under the water; the quorls crossing the stars inland; Coral's cold to the south */
  b3v_cut(ctx, W, H, T, v){ const s = v.step || 0, pre = s >= 4;
    B3VB.sky(ctx, W, H*.56, pre ? [[0, '#0a0c18'], [.75, '#1e2232'], [1, '#3a3a4a']] : [[0, '#05060c'], [1, '#141828']]); B3VB.stars(ctx, W, H, T, 90, .52, pre ? .5 : .9, 9);
    B3VB.ridge(ctx, W, H, H*.52, H*.12, 81, '#0a0b12', [[.3, .7, .2], [.55, .5, .15]]); // the hills inland, and the mountains over Coral
    if (s >= 3) { glow(ctx, W*.86, H*.5, 40, '#bcd8f0', .14); ctx.fillStyle = 'rgba(200,220,240,.5)'; ctx.fillRect(W*.86, H*.48, 1.4, 1.4); } // Coral's cold, far down the coast
    if (s >= 2 && s <= 4) { const k = s === 4 ? .3 : 1; for (let i=0;i<6;i++){ const p = REDUCE() ? .5 : ((T/14000 + i*.17) % 1); B3VB.quorl(ctx, W*(.1 + p*.62), H*(.24 + i*.025 + p*.06), .75, T, .9*k, i); } } // the quorls, low over the hills, north to south
    ctx.fillStyle = vgrad(ctx, H*.52, H, [[0, '#0e1220'], [1, '#04050a']]); ctx.fillRect(0, H*.52, W, H*.48); // the sea
    ctx.fillStyle = 'rgba(160,180,220,.12)'; for (let i=0;i<20;i++){ const y = H*(.54 + hash(i, 82)*.44), x = (hash(i, 83)*W + (REDUCE() ? 0 : T*.004*(1 + hash(i, 84)))) % W; ctx.fillRect(x, y, 6 + hash(i, 85)*14, .8); }
    // the Spawn under the water: a long dark shape, cracked, tilted, its edge catching nothing
    ctx.save(); ctx.translate(W*.62, H*.8); ctx.rotate(-.05); ctx.globalAlpha = .9; poly(ctx, [[-W*.3, 0],[-W*.22, -H*.06],[-W*.04, -H*.08],[W*.16, -H*.07],[W*.3, -H*.02],[W*.26, H*.05],[W*.04, H*.08],[-W*.2, H*.06]], '#020308');
    ctx.strokeStyle = 'rgba(130,120,190,.38)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-W*.3, 0); ctx.lineTo(-W*.22, -H*.06); ctx.lineTo(-W*.04, -H*.08); ctx.lineTo(W*.16, -H*.07); ctx.lineTo(W*.3, -H*.02); ctx.stroke(); for (let i=0;i<4;i++) ctx.fillRect(-W*.16 + i*W*.08, -H*.065, 2, H*.05); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.beginPath(); ctx.moveTo(-W*.06, -H*.07); ctx.lineTo(W*.02, H*.02); ctx.lineTo(-W*.02, H*.07); ctx.stroke(); // the crack
    if (pre) { const g = REDUCE() ? .5 : .5 + Math.sin(T/700)*.3; glow(ctx, W*.01, H*.0, 14, '#9a86e0', .3*g); ctx.fillStyle = `rgba(200,190,255,${.6*g})`; ctx.fillRect(W*.01 - .8, -.8, 1.6, 1.6); } // a gleam in the crack
    ctx.restore(); ctx.globalAlpha = 1;
    poly(ctx, [[0, H*.44],[W*.12, H*.42],[W*.24, H*.5],[W*.32, H*.6],[W*.36, H*.74],[W*.3, H],[0, H]], '#050508'); ctx.strokeStyle = 'rgba(140,150,190,.18)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, H*.44); ctx.lineTo(W*.12, H*.42); ctx.lineTo(W*.24, H*.5); ctx.stroke(); // the headland
    if (s === 1 || s === 2 || s === 3) drawFigure(ctx, 'crone', W*.26, H*.52, 1.2, T, {dir:-1, still:s !== 1});
    return {fx:W*.16, fy:H*.44, fs:1.9}; },

  /* Coral by night: from the air, the city on its bay and the keep; the Condors; the street by the keep wall; the breach; the sky over the sea going dark */
  b3v_coral(ctx, W, H, T, v){ const s = v.step || 0, air = s <= 1;
    B3VB.sky(ctx, W, H, [[0, '#04050a'], [.6, '#0e1220'], [1, '#141a2a']]);
    const blot = s >= 4 ? (REDUCE() ? .5 : Math.min(1, ((T % 20000)/20000)*.6 + .4)) : 0;
    B3VB.stars(ctx, W, H, T, 80, .6, .9, 13);
    if (blot) { ctx.save(); ctx.beginPath(); const ex = W*(1.1 - blot*.5); ctx.moveTo(W, 0); ctx.lineTo(ex, 0); ctx.quadraticCurveTo(ex - W*.08, H*.18, ex + W*.04, H*.36); ctx.lineTo(W, H*.4); ctx.closePath(); ctx.fillStyle = '#020204'; ctx.fill(); ctx.strokeStyle = 'rgba(150,130,200,.2)'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); } // the stars going out over the sea
    if (air) { const base = H*.8, ks = Math.max(.7, W/560);
      ctx.fillStyle = vgrad(ctx, H*.56, H, [[0, '#0c1018'], [1, '#05070c']]); ctx.fillRect(0, H*.56, W, H*.44); poly(ctx, [[W*.62, H],[W*.66, H*.7],[W*.76, H*.6],[W, H*.58],[W, H]], '#0e1626'); // the land, and the bay on the right
      for (let r=0;r<4;r++) for (let i=0;i<22;i++){ const x = W*(.02 + i*.028 + (r%2)*.012), y = H*(.62 + r*.09) + hash(i, r + 30)*4, w = 5 + hash(i, r + 31)*8, hh = 4 + hash(i, r + 32)*9; if (x > W*.64 - r*W*.02) continue; ctx.fillStyle = r%2 ? '#161c2a' : '#121826'; ctx.fillRect(x, y - hh, w, hh); ctx.fillStyle = 'rgba(200,210,230,.06)'; ctx.fillRect(x, y - hh, w, 1);
        if (hash(i, r + 33) > .5) { const lx = x + w*hash(i, r + 34), ly = y - hh*hash(i, r + 35); glow(ctx, lx, ly, 5, '#e8a050', .25); ctx.fillStyle = '#ffd090'; ctx.fillRect(lx, ly, 1, 1); } } // streets of roofs, a lamp here and there
      for (let i=0;i<10;i++) ctx.fillRect(W*(.66 + hash(i, 36)*.3), H*(.66 + hash(i, 37)*.3), 4 + hash(i, 38)*6, .8); // lamplight on the bay
      if (typeof b67Keep === 'function') { glow(ctx, W*.4, base - 40*ks, 70*ks, '#bcd8f0', .1); b67Keep(ctx, W*.4, base, ks, '#04050a', .75 + (REDUCE() ? 0 : Math.sin(T/600)*.1)); }
      for (let i=0;i<5;i++){ const p = REDUCE() ? .5 : ((T/9000 + i*.2) % 1); B3VB.quorl(ctx, W*(.95 - p*.5), H*(.16 + i*.06), .7 + i*.08, T, .9, i, -1); }
      if (s === 1) for (let i=0;i<3;i++) drawFigure(ctx, 'b3_c6_condor', W*(.5 + i*.13) + (REDUCE() ? 0 : Math.sin(T/500 + i)*6), H*(.44 - i*.07), .75, T, {air:true, phase:i, dir:-1, alpha:.85});
      // the quorl he rides: a long dark body under the figure, wings blurring
      const qx = W*.26, qy = H*.42; B3VB.quorl(ctx, qx + 4, qy + 6, 2.2, T, 1, 0, 1); drawFigure(ctx, 'b3_moranth', qx + 16, qy - 2, 1.1, T, {air:true, dir:1, still:true});
      return {fx:qx - 2, fy:qy + 2, fs:1.5, air:true}; }
    // the street by the keep wall
    ctx.fillStyle = '#0a0b10'; ctx.fillRect(0, H*.18, W, H*.62); ctx.fillStyle = 'rgba(60,64,80,.4)'; for (let r=0;r<6;r++) for (let c=0;c<10;c++) ctx.fillRect(c*W/10 + (r%2)*W/20, H*(.2 + r*.1), W/10 - 2, 1); // the wall's courses
    if (s >= 3) { const bx = W*.6, by = H*.8; poly(ctx, [[bx - 34, by],[bx - 30, by - H*.32],[bx - 12, by - H*.46],[bx + 10, by - H*.4],[bx + 30, by - H*.28],[bx + 36, by]], '#020306'); glow(ctx, bx, by - H*.2, 50, '#bcd8f0', .18); // the breach, and the cold coming out of it
      for (let i=0;i<10;i++) ell(ctx, bx + (hash(i, 91) - .5)*80, by + hash(i, 92)*8, 3 + hash(i, 93)*6, 2, '#16161c'); for (let i=0;i<6;i++) glow(ctx, bx + (hash(i, 94) - .5)*60, by - 10 - i*8 - (REDUCE() ? 0 : (T/60) % 20), 18, '#8a8a90', .06); }
    ctx.fillStyle = '#121218'; ctx.fillRect(0, H*.8, W, H*.2); ctx.fillStyle = 'rgba(120,130,160,.12)'; for (let i=0;i<14;i++) ell(ctx, hash(i, 95)*W, H*(.84 + hash(i, 96)*.14), 10, 1.4, 'rgba(120,130,160,.1)'); // wet paving
    if (s === 2) { ctx.fillStyle = '#1a140e'; ctx.fillRect(W*.08, H*.5, 18, H*.3); ctx.fillRect(W*.86, H*.48, 18, H*.32); drawFigure(ctx, 'b3_c7_bridgeburner', W*.62, H*.94, 1.8, T, {dir:1, phase:1}); drawFigure(ctx, 'b3_c7_bridgeburner', W*.74, H*.92, 1.8, T, {dir:1, phase:2}); drawFigure(ctx, 'b3_c7_bridgeburner', W*.84, H*.94, 1.8, T, {dir:-1, phase:3}); drawFigure(ctx, 'b3v_picker', W*.48, H*.94, 1.8, T, {dir:1}); }
    if (s === 3) { drawFigure(ctx, 'paran', W*.86, H*.92, 1.9, T, {dir:-1, phase:1}); ctx.save(); ctx.globalAlpha = .45; ctx.translate(W*.92, H*.94); ctx.scale(-.55, .55); if (typeof drawHound === 'function') drawHound(ctx, {gait:REDUCE() ? 0 : Math.sin(T/200), rim:'#c9bbff'}); ctx.restore(); drawFigure(ctx, 'b3_c6_condor', W*.8, H*.46, 1.5, T, {air:true, dir:-1}); }
    if (s >= 4) { drawFigure(ctx, 'b3_c7_bridgeburner', W*.82, H*.92, 1.8, T, {dir:-1, still:true}); }
    return {fx:s >= 3 ? W*.36 : W*.28, fy:H*.92, fs:2.2}; },

  /* the reader, back at the Fourth's fire: a spring night on Genabackis, the Host's tents, an upturned shield with the card on it */
  b3deck(ctx, W, H, T){ B3VB.sky(ctx, W, H*.66, [[0, '#05060c'], [1, '#161a26']]); B3VB.stars(ctx, W, H, T, 60, .5, .7, 17);
    B3VB.ridge(ctx, W, H, H*.62, H*.05, 91, '#0c0e12'); for (let i=0;i<6;i++){ const x = W*(.5 + i*.08), y = H*.66; poly(ctx, [[x - 9, y],[x, y - 9],[x + 9, y]], '#121214'); if (hash(i, 97) > .5) glow(ctx, x + 10, y, 10, '#e8923a', .25); }
    ctx.fillStyle = vgrad(ctx, H*.64, H, [[0, '#14160f'], [1, '#08090a']]); ctx.fillRect(0, H*.66, W, H*.34); B3VB.grass(ctx, W, H*.7, H, T, 60, 'rgba(90,100,70,.35)', 19);
    B3VB.fire(ctx, W*.64, H*.88, T, 1.8);
    ctx.save(); ctx.translate(W*.48, H*.9); ctx.scale(1, .42); ctx.beginPath(); ctx.arc(0, 0, 18, 0, 7); ctx.fillStyle = '#4a2a20'; ctx.fill(); ctx.strokeStyle = '#7a7266'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); // an upturned shield
    ctx.save(); ctx.translate(W*.48, H*.88); ctx.rotate(-.08); ctx.fillStyle = '#d8ccb0'; ctx.fillRect(-7, -10, 14, 20); ctx.fillStyle = 'rgba(150,120,220,.5)'; ctx.fillRect(-5.4, -8.4, 10.8, 16.8); ctx.restore();
    return {fx:W*.3, fy:H*.86, fs:2.4}; },
});
