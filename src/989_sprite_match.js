/* ============ sprites matched to the portraits (v13.6, 989) ============
   David, Nov 14: the map and scene figures should look like the busts. Each figure below replaces an earlier one (080d, Book Five's squad)
   so that its colours, hair, kit and shield are the bust's: Thegg's long brown hair, fur at the shoulders, bead collar and blue iron-rimmed
   shield; Ammet's cropped grey hair and sage knitted collar over the tool apron; Tobet's straw hair, mustard jack, rust scarf and the bow
   across his back; Pessa's red-brown hair under a head-cloth and the fringed blue-grey shawl over the green coat; the Letherii sergeant's
   gold-banded helm, mail, blue-grey cloak on both shoulders and blue shield. Vell's (Book One) is redrawn in 018 itself. */
Object.assign(FIGX, {
  thegg(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.3, 1.24);
    h.legs('#2e2a24'); ctx.fillStyle = '#3a2e22'; ctx.fillRect(-4.8, 10, 3.8, 3); ctx.fillRect(1, 10, 3.8, 3);
    h.torso('#8a8a86', '#2a2a28', 7.8); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 6; i++) { ctx.moveTo(-7.4, -4.4 + i*2); ctx.lineTo(7.4, -4.4 + i*2); } ctx.moveTo(0, -6); ctx.lineTo(0, 7); ctx.stroke(); // two sets of scale, riveted into one
    ell(ctx, -6.4, -5.4, 3.4, 2.4, '#5a4632'); ell(ctx, 6.4, -5.4, 3.4, 2.4, '#5a4632'); ctx.fillStyle = 'rgba(200,170,120,.35)'; ctx.fillRect(-9, -6.4, 3, .6); ctx.fillRect(6, -6.4, 3, .6); // fur at the shoulders
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-6.4, 2.4, 12.8, 1.4);
    h.head('#a07a5a', 4.8, -11); h.look('rgba(20,10,6,.86)', -11.2);
    for (let i = 0; i < 7; i++) ell(ctx, -3.6 + i * 1.2, -6.3 + Math.abs(i - 3) * -.25, .6, .6, i % 2 ? '#c8783a' : '#d89a4a'); // the bead collar
    ctx.fillStyle = '#6a5038'; ctx.beginPath(); ctx.arc(0, -12.4, 5.1, Math.PI, 0); ctx.fill(); ctx.fillRect(-5.1, -12.6, 1.6, 6); ctx.fillRect(3.5, -12.6, 1.6, 6); ctx.fillStyle = '#5a4230'; ctx.fillRect(-3.6, -13.2, 7.2, 1.2); // long brown hair to the jaw, a fringe
    ctx.fillStyle = 'rgba(40,24,14,.55)'; ctx.fillRect(-2.4, -12.2, 2, .7); ctx.fillRect(1.4, -12.2, 2, .7); // the heavy brows
    poly(ctx, [[-13.6,-9.4],[-3.4,-9.4],[-3.4,8.6],[-13.6,8.6]], h.armor('#6a84a4', '#24324a')); ctx.strokeStyle = '#3a3a3c'; ctx.lineWidth = 1.2; ctx.strokeRect(-13.6, -9.4, 10.2, 18); // the tower shield, blue, an iron rim
    ctx.strokeStyle = 'rgba(20,28,40,.45)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 1; i < 4; i++) { ctx.moveTo(-13.6 + i * 2.55, -9.4); ctx.lineTo(-13.6 + i * 2.55, 8.6); } ctx.stroke(); // its planks
    ctx.fillStyle = '#c8ccd0'; for (const [x, y] of [[-12.6, -8.4], [-4.4, -8.4], [-12.6, 7.6], [-4.4, 7.6], [-8.5, -8.4], [-8.5, 7.6]]) ctx.fillRect(x - .4, y - .4, .8, .8); // its rivets
    h.sword('#d4ccbc'); ctx.restore(); },
  ammet(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .96, .94);
    h.legs('#34302a'); h.torso('#7a8a78', '#2a3028', 6.2); // the grey-green knit
    poly(ctx, [[-4.4,-3],[4.4,-3],[5.4,10],[-5.4,10]], h.armor('#7a5a3a', '#2a1c10')); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-4.4, -3, 8.8, .7); // the leather apron
    ctx.fillStyle = '#4a3a28'; ctx.fillRect(-9.6, 2, 4.6, 3.6); ctx.fillStyle = '#9a968c'; for (let i = 0; i < 4; i++) ctx.fillRect(-9.2 + i*1.1, 1.2, .4, 1.4); // the roll of tools
    h.head('#b89070', 4.3, -11.2); h.look('rgba(24,14,10,.84)', -11.4);
    poly(ctx, [[-5.4,-8.4],[5.4,-8.4],[6.4,-4.4],[-6.4,-4.4]], h.armor('#a8c0a4', '#5a6e58')); ctx.strokeStyle = 'rgba(40,56,40,.45)'; ctx.lineWidth = .4; ctx.beginPath(); for (let i = 0; i < 6; i++) { ctx.moveTo(-4.6 + i * 1.8, -8.2); ctx.lineTo(-5 + i * 2, -4.6); } ctx.stroke(); // the knitted collar up to the chin
    B2F.cap(ctx, '#a8a49c', 4.5, -12.4, 1.02, 1.98); ctx.fillStyle = '#8a867e'; ctx.fillRect(-4.4, -12.6, 1.2, 2.4); ctx.fillStyle = 'rgba(240,240,232,.5)'; ctx.fillRect(-2.6, -16, 4, .6); // grey hair cropped short
    ctx.strokeStyle = '#e8e8f0'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(7.2, -1); ctx.lineTo(9.4, -4.6); ctx.stroke(); ctx.restore(); },
  tobet(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .92, 1.04);
    ctx.strokeStyle = '#8a5a2a'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-7.6, -15); ctx.quadraticCurveTo(1, -6, 7.6, 9); ctx.stroke(); ctx.strokeStyle = 'rgba(230,220,200,.6)'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(-7.6, -15); ctx.lineTo(7.6, 9); ctx.stroke(); // the bow across his back
    poly(ctx, [[-5,-6],[-6.6,4],[-3.4,3],[-2.6,-6]], '#3a4a64'); ctx.fillStyle = '#5a4430'; ctx.fillRect(-8.4, -5, 2, 8); poly(ctx, [[-8.4,-5],[-7.4,-8],[-6.4,-5]], '#d8d0b8'); // the blue cloak, cut down; the quiver
    h.legs('#3a3428'); h.torso('#9a8a4a', '#3a3418', 5.4); ctx.strokeStyle = 'rgba(0,0,0,.28)'; ctx.lineWidth = .5; ctx.beginPath(); for (let i = 0; i < 5; i++) { ctx.moveTo(-5, -4 + i*2.2); ctx.lineTo(5, -4 + i*2.2); } for (let i = 0; i < 4; i++) { ctx.moveTo(-4 + i * 2.6, -6); ctx.lineTo(-4 + i * 2.6, 6); } ctx.stroke(); // the quilted jack
    B2F.line(ctx, '#5a3a1e', 1.2, [[-4.4, -5.6], [4.6, 6.4]]); // the bow-strap
    poly(ctx, [[-3.6,-7.6],[3.6,-7.6],[2.6,-5.2],[-2.6,-5.2]], '#b0582a'); // the rust scarf
    h.head('#c4a080', 4.1, -11.2); h.look('rgba(24,14,10,.82)', -11.4);
    B2F.cap(ctx, '#b88e48', 4.4, -12.4, 1, 2); ctx.fillStyle = '#b88e48'; ctx.fillRect(-4.4, -12.6, 1.6, 4.6); ctx.fillRect(2.8, -12.6, 1.6, 3); B2F.line(ctx, '#d8aa58', .6, [[-2.6, -16.4], [-3.4, -17.6]]); B2F.line(ctx, '#d8aa58', .6, [[.4, -16.8], [.8, -18]]); // straw hair, every way at once
    ctx.fillStyle = '#e8dcc0'; ctx.fillRect(3.6, 3.6, 1, 3); ctx.restore(); },
  pessa(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, .94, 1);
    B2F.line(ctx, '#4a3a28', 1.4, [[8.4, 12], [8.4, -22]]); B2F.line(ctx, '#6a6a6a', 1.1, [[8.4, -22], [8.4, -24.6], [10.6, -25.2]]); B2F.line(ctx, '#6a6a6a', 1, [[8.4, -22.4], [10.4, -20.4]]); // the boathook, iron-shod
    h.legs('#2e2a26'); poly(ctx, [[-6.8,-6],[6.8,-6],[7.6,8],[-7.6,8]], h.armor('#5a6a44', '#1e2414')); // the green coat
    poly(ctx, [[-7.6,-6.4],[7.6,-6.4],[8,1.6],[0,4],[-8,1.6]], h.armor('#7a8ea4', '#2e3a48')); ctx.fillStyle = 'rgba(220,200,180,.6)'; for (let i = 0; i < 9; i++) ctx.fillRect(-7.4 + i * 1.8, 1.6 + (i < 5 ? i * .5 : (8 - i) * .5), .4, 1.6); // the blue-grey shawl, fringed
    h.head('#c09878', 4.1, -11.2); h.look('rgba(24,14,10,.84)', -11.4); ctx.fillStyle = 'rgba(120,60,40,.6)'; ctx.fillRect(2.2, -10, 1.6, 1.4); // the burn-scar on her cheek
    B2F.cap(ctx, '#a85a48', 4.4, -12.4, 1.02, 1.98); ctx.fillStyle = '#8a4a3a'; ctx.fillRect(-4.4, -12.4, 1.6, 7); ctx.fillRect(2.8, -12.4, 1.4, 5); ctx.fillStyle = 'rgba(255,220,200,.25)'; ctx.fillRect(-3, -16.2, 5, .6); // red-brown hair under a faded head-cloth
    ctx.restore(); },
  sgt_mt(ctx, h, t, o){ const fl = o.still ? 0 : Math.sin(t/260 + (o.phase||0)*2)*.6;
    poly(ctx, [[-6.4,-6.4],[-9.4,10 + fl],[-2,10],[-2,-6]], '#5a7088'); poly(ctx, [[6.4,-6.4],[8.6,9 + fl],[3,9],[2,-6]], '#4a5e74'); // the blue-grey cloak, on both shoulders
    h.legs('#2a2a2e'); h.torso('#9a9c9e', '#34363a', 6.4); ctx.fillStyle = 'rgba(0,0,0,.3)'; for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) ctx.fillRect(-5.4 + c * 2 + (r % 2), -4.6 + r * 2, .7, .7); // mail
    ctx.fillStyle = '#d6a24a'; ctx.fillRect(3, -6, 3.6, 1.3); ctx.fillRect(4.6, -6, 1.3, 3); ell(ctx, -5, -5.6, 1, 1, '#d6a24a'); // the sergeant's gold at the shoulder, the cloak's brooch
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-6.2, 3, 12.4, 1.4); ell(ctx, 2.4, 4.6, 1.4, 1.8, '#5a4428');
    h.head('#b08a6a', 4.4, -11.2); h.look('rgba(24,14,10,.85)', -11.4);
    ctx.beginPath(); ctx.arc(0, -12.4, 5.2, Math.PI, 0); ctx.fillStyle = h.armor('#b8bcc4', '#3e4248'); ctx.fill(); ctx.fillStyle = '#c8a050'; ctx.fillRect(-5.6, -13.2, 11.2, 1.5); ctx.fillStyle = '#8a8e96'; ctx.fillRect(-4.8, -12.4, 1.2, 3.6); ctx.fillRect(3.6, -12.4, 1.2, 3.6); ctx.fillRect(-.5, -17.6, 1, 4.4); // a steel helm, a gold band, cheek-guards and the ridge
    h.shield('#6a84a0', '#22303e', 6.2, -7.6, 0); ell(ctx, -7.6, 0, 1.8, 1.8, '#3a3a3c'); ell(ctx, -8, -.4, .6, .6, '#c8ccd0'); // the blue shield, an iron boss
    h.sword(); },
});
