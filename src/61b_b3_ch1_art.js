/* ============ Book Three, Chapter 1 art: The Parley — the picket, Pale's old tunnels, the Rhivi camp at night ============ */
/* Figures (FIGX) in the ~32px frame of 18/47b/60d, lit from the left; three backdrops (SCENEX, sceneLayer for the still parts, REDUCE()
   holding the rest still); the chapter's gear (ART['item/b3_c1_*']) on Book Three's cold ground. Grim things stay distant. */

/* stand-ins first (the finished drawings below replace them) */
{
  const stub = (c1, c2, sc = 1) => function(ctx, h, t, o){ ctx.save(); if (sc !== 1) { ctx.translate(0, 13); ctx.scale(sc, sc); ctx.translate(0, -13); } h.legs('#2a2622'); h.torso(c1, c2); h.head('#a8826a'); h.look(); ctx.restore(); };
  [['b3_c1_looter','#4a4238','#1a1610'],['b3_c1_ilgres','#8a7a5a','#3a2a18',1.1],['b3_c1_mott','#4a5a3a','#1a2410'],['b3_c1_brigand','#5a4a3a','#2a1e14'],['b3_c1_delegate','#5a4a6a','#241a2e']]
    .forEach(([k, a, b, s]) => { if (!FIGX[k]) FIGX[k] = stub(a, b, s); });
  ['b3_c1_parley','b3_c1_tunnels','b3_c1_rhivi'].forEach(k => { if (!SCENEX[k]) SCENEX[k] = (cv, t) => { const {ctx, W, H} = sceneFit(cv); ctx.fillStyle = '#10141c'; ctx.fillRect(0, 0, W, H); }; });
}

/* ---------------- figures ---------------- */
Object.assign(FIGX, {
  /* a tunnel looter: a deserter who lived out the Host's year under Pale; a patched Malazan jerkin gone the colour of the earth,
     a rag round the head, a sapper's short pick, a shuttered lamp at the hip, a sack of whatever was left */
  b3_c1_looter(ctx, h, t, o){ const c = b2Pick(o, [['#4e4a3c', '#1c1a14'], ['#56483a', '#201812'], ['#464a40', '#181a16']]), fl = o.still ? 1 : .8 + Math.sin(t/90 + (o.phase||0)*3)*.2;
    ell(ctx, -6, -1.4, 3.8, 5, h.armor('#6a5a40', '#241c12')); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-8.6, -5.6, 4, .6); // the sack, slung behind
    h.legs('#2a2620'); ctx.fillStyle = '#3a3026'; ctx.fillRect(-4.5, 10.4, 3.4, 2.6); ctx.fillRect(1.1, 10.4, 3.4, 2.6); ctx.fillStyle = 'rgba(150,130,100,.45)'; for (let i=0;i<3;i++){ ctx.fillRect(-4.5, 6.4 + i*1.4, 3.4, .5); ctx.fillRect(1.1, 6.8 + i*1.4, 3.4, .5); } // rag-bound shins
    h.torso(c[0], c[1], 6); ctx.fillStyle = 'rgba(160,140,110,.28)'; ctx.fillRect(-4.6, -3.4, 3, 2.6); ctx.fillRect(1.6, 1.6, 2.6, 2.2); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = .4; ctx.strokeRect(-4.6, -3.4, 3, 2.6); ctx.strokeRect(1.6, 1.6, 2.6, 2.2); // patches, badly sewn
    ctx.fillStyle = 'rgba(30,24,16,.4)'; ctx.fillRect(-5.4, 4.6, 10.8, 2.4); // the earth ground into the hem
    B2F.line(ctx, '#7a6a4a', .9, [[-5.6, 2.8], [5.6, 2.4]]); ctx.fillStyle = '#7a6a4a'; ctx.fillRect(-1.6, 2.2, 1.4, 1.6); // a rope belt, knotted
    B2F.line(ctx, '#2a1c10', 1.2, [[-7.4, 1], [-7.6, 4.6]]); ctx.fillStyle = '#1e1810'; ctx.fillRect(-9.2, 4.4, 3.4, 4); ctx.fillStyle = `rgba(255,190,110,${.85*fl})`; ctx.fillRect(-8.4, 5.4, 1.8, 1); ctx.fillRect(-8.4, 7, 1.8, .8); glow(ctx, -7.5, 6.4, 6, '#ffb060', .22*fl); // the shuttered lamp, a slit of light
    B2F.line(ctx, '#5a4026', 1.4, [[5.6, 5], [9.4, -11]]); poly(ctx, [[5.8, -12.6], [9.6, -11.4], [13.4, -8.6], [12.8, -8], [9.2, -10], [5.4, -11.4]], h.armor('#8a8680', '#2a2826')); ell(ctx, 6.4, 2.6, 1.3, 1.3, '#8a6a52'); // the short pick
    h.head('#8e6e56', 4.3, -11.2); h.look('rgba(20,12,8,.88)', -11.4); ctx.fillStyle = 'rgba(30,20,12,.5)'; ctx.fillRect(-3, -9, 7, 2.2); ctx.fillStyle = 'rgba(30,20,12,.3)'; ctx.fillRect(-3.4, -12.8, 2, 1.6); // stubble, grime
    B2F.cap(ctx, '#3e382c', 4.6, -12.2, 1, 2); ctx.fillStyle = '#3e382c'; ctx.fillRect(-4.6, -12.4, 9.2, 1.2); poly(ctx, [[-4.4, -12.6], [-7, -10.6], [-6.2, -9.8], [-4, -11.4]], '#3e382c'); // a rag tied over the head, its tail
    ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(-4.2, -15.6, 3, .8); },
  /* an Ilgres Barghast: not the White Face — red ochre and blue-black tattoo instead of the white paint, a hide shield, a broad-bladed
     stabbing spear, an iron torc at the throat, the hair shaved to a crest and bound in a long tail */
  b3_c1_ilgres(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.12, 1.12); const sk = b2Pick(o, ['#7e5a40', '#74523a', '#86624a']);
    B2F.line(ctx, '#4a3420', 1.5, [[8, 12.6], [9.2, -18]]); poly(ctx, [[9.4, -26.4], [7.4, -21.4], [8.2, -17.6], [10.4, -17.6], [11.2, -21.4]], h.armor('#a8a49a', '#3a3834')); ctx.fillStyle = '#8a2a1a'; ctx.fillRect(8.2, -17.4, 2.2, 1.4); // the stabbing spear, a broad leaf head, a red binding
    h.legs('#3a2a1e'); ctx.fillStyle = '#5a4430'; ctx.fillRect(-4.5, 8.6, 3.4, 4.4); ctx.fillRect(1.1, 8.6, 3.4, 4.4); ctx.fillStyle = 'rgba(0,0,0,.3)'; for (let i=0;i<3;i++){ ctx.fillRect(-4.5, 9.4 + i*1.3, 3.4, .4); ctx.fillRect(1.1, 9.4 + i*1.3, 3.4, .4); } // hide wrappings, thonged
    poly(ctx, [[-7,-6],[7,-6],[6.4,4.6],[-6.4,4.6]], h.armor(sk, '#2a1a10')); // bare chest, broad
    ctx.strokeStyle = 'rgba(20,30,46,.7)'; ctx.lineWidth = .55; ctx.beginPath(); ctx.arc(-2.6, -1.6, 2, .4, 5.6); ctx.moveTo(1, -4); ctx.quadraticCurveTo(4.4, -2.4, 2.4, 1); ctx.quadraticCurveTo(1, 2.4, 3.6, 3.4); ctx.stroke(); // blue-black tattoo, whorls
    poly(ctx, [[-6.6, 4], [6.6, 4], [7.4, 9.6], [-7.4, 9.6]], h.armor('#6a4e34', '#2a1c10')); ctx.fillStyle = 'rgba(214,190,140,.55)'; for (let i=0;i<8;i++) ctx.fillRect(-7 + i*1.9, 9.2, .5, 1.4 + (i%2)*.7); ctx.fillStyle = '#2a1c10'; ctx.fillRect(-6.8, 3.6, 13.6, 1.3); // a hide kilt, fringed; belt
    ell(ctx, 7, 3.6, 1.5, 1.5, sk); ctx.fillStyle = sk; ctx.fillRect(5.8, -5.6, 2.6, 8.6); ctx.fillStyle = 'rgba(20,30,46,.6)'; ctx.fillRect(6, -2, 2.2, .5); ctx.fillRect(6, -.8, 2.2, .5); // the spear arm, banded
    h.head(sk, 4.6, -11.4); h.look('rgba(16,10,6,.92)', -11.8);
    ctx.fillStyle = '#9a3a1e'; ctx.fillRect(-4.4, -12.8, 8.8, 2.4); ctx.fillStyle = 'rgba(154,58,30,.85)'; poly(ctx, [[-3.6, -10.4], [-2.4, -10.4], [-3, -7.4]], 'rgba(154,58,30,.85)'); poly(ctx, [[1.8, -10.4], [3.2, -10.4], [2.4, -7.2]], 'rgba(154,58,30,.85)'); ctx.fillStyle = 'rgba(16,10,6,.92)'; ctx.fillRect(-.9, -11.9, 1.2, 1.1); ctx.fillRect(2, -11.9, 1.2, 1.1); // red ochre across the eyes and down the cheeks
    ctx.fillStyle = sk; ctx.fillRect(-4.6, -15.4, 9.2, 2.2); ctx.fillStyle = 'rgba(20,14,10,.4)'; ctx.fillRect(-4.4, -15.2, 2.6, 1.8); ctx.fillRect(2, -15.2, 2.4, 1.8); // the sides shaved, the stubble showing
    poly(ctx, [[-1.6, -15.6], [1.8, -15.6], [1.2, -18.8], [-.8, -18.8]], '#120c08'); B2F.line(ctx, '#120c08', 1.4, [[-.4, -18], [-3.4, -17], [-6, -13], [-6.4, -6]]); ctx.fillStyle = '#c8b896'; ctx.fillRect(-6.9, -11.6, 1.4, .7); ctx.fillRect(-6.9, -9.4, 1.4, .7); // the crest, and the long tail bound with bone
    ctx.lineWidth = 1.5; ctx.strokeStyle = '#3e4246'; ctx.beginPath(); ctx.arc(0, -6.6, 3.6, .25, Math.PI - .25); ctx.stroke(); ctx.strokeStyle = 'rgba(220,226,230,.45)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.arc(0, -6.6, 3.9, .7, 1.8); ctx.stroke(); ell(ctx, -3.4, -5.4, .9, .9, '#4e5256'); ell(ctx, 3.4, -5.4, .9, .9, '#4e5256'); // the iron torc, knobbed ends
    ctx.save(); ctx.translate(-7.6, .6); ell(ctx, 0, 0, 5, 7, h.armor('#8a6a48', '#2a1c10')); ctx.strokeStyle = '#d8ccb0'; ctx.lineWidth = .9; ctx.beginPath(); ctx.ellipse(0, 0, 5, 7, 0, 0, 7); ctx.stroke(); ctx.strokeStyle = 'rgba(154,58,30,.85)'; ctx.lineWidth = .8; ctx.beginPath(); for (let a=0;a<12;a+=.3){ const r = a*.34; a ? ctx.lineTo(Math.cos(a)*r*.8, Math.sin(a)*r) : ctx.moveTo(0, 0); } ctx.stroke(); ctx.restore(); // the hide shield, a red spiral on it, a bone rim
    ctx.restore(); },
  /* a Mott Irregular: one of the woodsman brothers out of Mott Wood; a slouch hat with a sprig in it, homespun, a beard like a hedge,
     a longbow taller than he is, a hatchet in the belt */
  b3_c1_mott(ctx, h, t, o){ ctx.save(); B2F.grow(ctx, 1.04, 1.02); const c = b2Pick(o, [['#5a6440', '#1e2414'], ['#64603e', '#24220f'], ['#4e5a3e', '#1a2014']]);
    B2F.line(ctx, '#6a4a2a', 1.4, [[8.6, 13.4], [10.6, 0], [9.4, -21]]); B2F.line(ctx, 'rgba(220,210,180,.55)', .4, [[8.2, 12.8], [8.8, -20.4]]); // the longbow, unstrung-tall
    poly(ctx, [[-6.4,-6],[1,-6],[-1,6],[-9,5.4]], h.armor('#4a3e2a', '#1a140c')); // a short wool cloak
    h.legs('#4a3a26'); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-4.5, 9.6, 3.4, 3.4); ctx.fillRect(1.1, 9.6, 3.4, 3.4);
    h.torso(c[0], c[1], 6.4); ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i=0;i<5;i++) ctx.fillRect(-5.6 + i*2.6, -5, .5, 11); // homespun, the weave showing
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(-6.2, 2.6, 12.4, 1.4); ctx.fillStyle = '#a89a72'; ctx.fillRect(-.7, 2.6, 1.4, 1.4);
    B2F.line(ctx, '#5a3e22', 1, [[-3.4, 4], [-3, 9]]); poly(ctx, [[-4.8, 3.4], [-2.2, 3.2], [-2.4, 5.4], [-4.4, 5.6]], '#8a8a86'); // a hatchet through the belt
    ell(ctx, 7.4, 2.8, 1.3, 1.3, '#a07a5c'); ctx.fillStyle = c[0]; ctx.fillRect(5.8, -5.4, 2.4, 7.6);
    h.head('#a07a5c', 4.4, -11.2); h.look('rgba(20,12,8,.85)', -11.6); ell(ctx, 2.4, -9.8, 1.2, .8, 'rgba(160,70,50,.45)'); // a nose that has met the cold
    poly(ctx, [[-4, -10.4], [4.8, -10.4], [5, -6.4], [3, -3.6], [.4, -2.8], [-2.4, -3.8], [-3.8, -6.4]], '#5a3a22'); ctx.fillStyle = 'rgba(120,84,50,.6)'; for (let i=0;i<6;i++) ctx.fillRect(-3 + i*1.3, -8 + (i%2)*1.4, .5, 3.4); // the beard, wild
    ell(ctx, .4, -14.6, 8.4, 1.8, '#3a3220'); ctx.beginPath(); ctx.ellipse(.4, -15, 4.6, 4, 0, Math.PI, 0); ctx.fillStyle = '#4a4028'; ctx.fill(); ctx.fillStyle = '#2a2414'; ctx.fillRect(-4.2, -15.6, 9.2, 1); // the slouch hat
    B2F.line(ctx, '#4a7a3a', .9, [[3.4, -15.8], [5.6, -19.6]]); ell(ctx, 5.4, -19, 1.2, .7, '#5a8a44', -.6); ell(ctx, 4.6, -17.8, 1, .6, '#4a7a3a', .5); // a sprig of something green in the band
    ctx.restore(); },
  /* a Divide brigand: a herd-thief off the Divide; fur cap, a scarf over the mouth, a sheepskin over a dark jerkin, a long curved knife,
     a little hide buckler */
  b3_c1_brigand(ctx, h, t, o){ const c = b2Pick(o, [['#3a3028', '#120e0a'], ['#36302a', '#100c0a'], ['#403428', '#14100a']]);
    h.legs('#241e18'); ctx.fillStyle = '#3e2c1c'; ctx.fillRect(-4.5, 7.4, 3.4, 5.6); ctx.fillRect(1.1, 7.4, 3.4, 5.6); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-4.5, 7.4, 3.4, .6); ctx.fillRect(1.1, 7.4, 3.4, .6); // riding boots
    h.torso(c[0], c[1], 6);
    poly(ctx, [[-6.6,-6.2],[-1.4,-6.2],[-2,5.4],[-6.2,6]], h.armor('#a89a80', '#4a4030')); poly(ctx, [[6.6,-6.2],[1.4,-6.2],[2,5.4],[6.2,6]], h.armor('#8a7c62', '#3a3226')); ctx.fillStyle = 'rgba(240,230,210,.35)'; for (let i=0;i<7;i++){ ctx.fillRect(-1.9, -5.6 + i*1.6, .9, .9); ctx.fillRect(1.1, -5.6 + i*1.6, .9, .9); } // a sheepskin vest, the fleece at the edges
    B2F.line(ctx, '#2a1c10', 1, [[-5.4, -5.6], [5, 3.2]]); ctx.fillStyle = '#6a5a44'; [-2.4, 1.2].forEach(k => ctx.fillRect(k - .4, -3.2 + (k + 2.4)*.84, .9, 1.4)); // a bandolier of throwing knives
    ctx.fillStyle = '#1e1610'; ctx.fillRect(-6, 3.4, 12, 1.2);
    ell(ctx, 6.8, 2.6, 1.3, 1.3, '#8a6a50'); B2F.curved(ctx, '#bcb6a8', 1.08); // the long knife
    h.head('#8a6a50', 4.2, -11.4); ctx.fillStyle = 'rgba(16,10,6,.9)'; ctx.fillRect(-.9, -12, 1.2, 1); ctx.fillRect(2, -12, 1.2, 1); ctx.fillStyle = 'rgba(30,20,12,.4)'; ctx.fillRect(-3.4, -13.2, 7.4, .6); // eyes, narrowed
    poly(ctx, [[-4.4, -10.6], [4.6, -10.6], [4.4, -7], [2, -5.6], [-2.4, -5.8], [-4.2, -7.2]], '#5a2620'); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-4, -8.6, 8.4, .5); poly(ctx, [[-4.2, -9], [-7.2, -6.6], [-6.4, -5.8], [-4, -7.6]], '#4a1e18'); // the scarf over the mouth, its tail blowing
    ctx.beginPath(); ctx.ellipse(0, -14, 5.2, 3.8, 0, Math.PI, 0); ctx.fillStyle = '#5a4632'; ctx.fill(); ctx.fillStyle = '#7a644a'; ctx.fillRect(-5.4, -14.2, 10.8, 1.8); ctx.fillStyle = 'rgba(220,200,170,.3)'; for (let i=0;i<9;i++) ctx.fillRect(-5 + i*1.2, -14.4 + (i%2)*.8, .5, 1.2); // the fur cap
    ctx.save(); ctx.translate(-7.4, 1); ell(ctx, 0, 0, 4.4, 4.4, h.armor('#6a5038', '#22180e')); ctx.strokeStyle = '#141008'; ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(0, 0, 4.4, 0, 7); ctx.stroke(); ell(ctx, 0, 0, 1.2, 1.2, '#6a6458'); ctx.restore(); // a small hide buckler
    },
  /* a Daru delegation attendant: a house servant of Darujhistan in good blue cloth piped in gold, a short cape, a velvet cap with a feather,
     a satchel of the delegation's papers, and a pole lantern burning the city's blue gas */
  b3_c1_delegate(ctx, h, t, o){ const c = b2Pick(o, [['#2e3e62', '#0e1424'], ['#3a2e5a', '#120e22'], ['#2a4258', '#0c1620']]), fl = o.still ? 1 : .85 + Math.sin(t/160 + (o.phase||0)*2)*.15;
    B2F.line(ctx, '#2a2018', 1.2, [[8, 13], [8.4, -18]]); ctx.fillStyle = '#b89a4a'; ctx.fillRect(7.2, -18.6, 2.6, 1); B2F.line(ctx, '#b89a4a', .6, [[8.4, -18.4], [11, -20], [11.4, -18]]); // the lantern pole, a brass crook
    ctx.fillStyle = '#1a1814'; ctx.fillRect(10.2, -18, 2.6, 3.8); ctx.fillStyle = `rgba(150,200,255,${.9*fl})`; ctx.fillRect(10.7, -17.4, 1.6, 2.6); glow(ctx, 11.5, -16, 8, '#8ac4ff', .3*fl); ctx.fillStyle = '#b89a4a'; ctx.fillRect(10, -18.4, 3, .6); ctx.fillRect(10, -14.4, 3, .6); // the blue flame
    poly(ctx, [[-6.6,-6.4],[0,-6.4],[-1.6,4],[-8.4,3]], h.armor('#5a2a3a', '#1e0c14')); // a short cape over one shoulder
    ctx.fillStyle = '#1a1820'; ctx.fillRect(-4, 5, 2.6, 7.4); ctx.fillRect(1.4, 5, 2.6, 7.4); ctx.fillStyle = '#0e0c10'; ctx.fillRect(-4.4, 11.6, 3.2, 1.6); ctx.fillRect(1.2, 11.6, 3.2, 1.6); // fine hose, soft shoes
    poly(ctx, [[-5.6,-6],[5.6,-6],[6.2,6.4],[-6.2,6.4]], h.armor(c[0], c[1])); ctx.fillStyle = '#c8a84a'; ctx.fillRect(-.4, -6, .8, 12.4); ctx.fillRect(-6.2, 5.6, 12.4, .8); for (let i=0;i<4;i++) ell(ctx, 0, -4 + i*2.6, .55, .55, '#e8d080'); // the doublet, piped, gilt buttons
    ctx.fillStyle = 'rgba(160,180,230,.16)'; ctx.fillRect(-5.2, -5.4, 1.4, 10.6);
    ctx.fillStyle = '#e8e0d0'; ctx.fillRect(-2.4, -6.6, 4.8, 1.2); // a white collar
    ctx.fillStyle = '#4a3420'; ctx.fillRect(-7.8, 1.4, 4.2, 4.4); ctx.fillStyle = '#6a4a2e'; ctx.fillRect(-7.8, 1.4, 4.2, 1); ctx.fillStyle = '#9a2a20'; ctx.fillRect(-6.2, 2.4, 1.2, 2.6); ell(ctx, -5.6, 5.2, .9, .9, '#b8302a'); B2F.line(ctx, '#3a2a18', .5, [[-5.6, 1.4], [4.6, -6]]); // a satchel of papers, a red seal on its ribbon
    ell(ctx, 7.6, 1.6, 1.2, 1.2, '#d0ae94'); ctx.fillStyle = c[0]; ctx.fillRect(6, -5.4, 2.4, 6.6);
    h.head('#d0ae94', 4.2, -11.4); h.look('rgba(30,20,16,.8)', -11.6); ctx.fillStyle = 'rgba(120,70,60,.3)'; ctx.fillRect(.6, -8.6, 2.6, .5); // clean-shaven, pale, a careful mouth
    B2F.cap(ctx, '#4a3424', 4.4, -12.6, 1.05, 1.95);
    ell(ctx, -.6, -15, 5.4, 2, '#1a1626'); ell(ctx, -1.2, -16, 3.6, 1.6, c[0]); ctx.fillStyle = '#d8d0c0'; ctx.beginPath(); ctx.moveTo(-3.4, -15.6); ctx.quadraticCurveTo(-6.4, -19.4, -5.6, -21.4); ctx.quadraticCurveTo(-4.4, -18.6, -2.6, -16.2); ctx.fill(); B2F.line(ctx, 'rgba(120,110,100,.6)', .3, [[-3.2, -15.8], [-5.4, -20.6]]); // a velvet cap, a white feather
    },
});

/* ---------------- backdrops ---------------- */
const b3c1Fl = t => REDUCE() ? 1 : .86 + Math.sin(t/120)*.07 + Math.sin(t/47)*.05;
/* a camp's fire seen from far off: a red point, a soft glow */
function b3c1Fire(x, px, py, s, a = 1){ glow(x, px, py, 14*s, '#e07a30', .28*a); ell(x, px, py, 1.4*s, 1*s, `rgba(255,190,110,${.9*a})`); }

/* the parley: a grey spring afternoon on the plain below Pale; the Host's square camp on the left, Brood's sprawl on the right, the
   pavilion between them with both standards up, and in the middle distance a small figure in red wool. The crows circle. */
SCENEX.b3_c1_parley = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.5, px = W*.54, py = H*.7, ps = clamp(W/250, 1.05, 1.5);
  ctx.drawImage(sceneLayer('b3c1:parley', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#2a3442'],[.5,'#5e6a78'],[.85,'#98a0a6'],[1,'#b6b8b2']]); x.fillRect(0, 0, W, hz + 2);
    for (let i=0;i<6;i++) cloud(x, W*(hash(i,3)*1.1 - .05), hz*(.15 + i*.12), W*(.35 + hash(i,4)*.3), 5 + i, i%2 ? '#d4d8dc' : '#3a4452', .16); // low cloud, a thaw sky
    // far hills, and Pale on its hill to the left: walls, a few towers, the old breaches patched
    x.fillStyle = '#6e7680'; x.beginPath(); x.moveTo(0, hz); for (let X=0;X<=W + 8;X+=8) x.lineTo(X, hz - 6 - Math.max(0, Math.sin(X/70 + 2))*10 - hash(X, 2)*2); x.lineTo(W, hz); x.fill();
    const cx = W*.16; x.fillStyle = '#545c66'; x.beginPath(); x.moveTo(cx - W*.18, hz + 2); x.quadraticCurveTo(cx, hz - H*.13, cx + W*.2, hz + 2); x.fill();
    x.fillStyle = '#3e4650'; for (let i=0;i<14;i++){ const bx = cx - W*.09 + i*W*.013, hh = 5 + hash(i,7)*7 + (i === 4 || i === 10 ? 9 : 0); x.fillRect(bx, hz - H*.085 - hh + Math.abs(i - 7)*1.1, W*.011, hh + 6); } // the city's roofline
    x.fillRect(cx - W*.1, hz - H*.08, W*.2, 4); for (let i=0;i<12;i++) x.fillRect(cx - W*.1 + i*W*.018, hz - H*.08 - 2, W*.01, 2); // its wall
    // the plain: mud, thaw-pools holding the sky, new grass coming through
    x.fillStyle = vgrad(x, hz, H, [[0,'#5a5e58'],[.25,'#3e423c'],[1,'#141614']]); x.fillRect(0, hz, W, H - hz);
    for (let i=0;i<46;i++){ const k = Math.pow(hash(i,21), 1.5), yy = hz + 4 + k*(H - hz), xx = hash(i,22)*W, r = 2 + k*22; ell(x, xx, yy, r, r*.16, `rgba(170,182,192,${.14 + k*.12})`); } // pools
    for (let i=0;i<90;i++){ const k = hash(i,23), yy = hz + 3 + Math.pow(k, 1.3)*(H - hz), xx = hash(i,24)*W, r = 1 + k*4; ell(x, xx, yy, r*2, r*.5, `rgba(70,${86 + Math.round(k*20)},56,${.25 + k*.25})`); } // grass
    // the Host's camp, left: a palisade square, tents in rows, smoke, standards
    const hx0 = W*.0, hx1 = W*.36, hy = hz + H*.06; x.fillStyle = '#2a2e2c'; x.fillRect(hx0, hy - 3, hx1 - hx0, 3); for (let X=hx0;X<hx1;X+=3) x.fillRect(X, hy - 5 - hash(X, 3), 1.6, 3);
    for (let r=0;r<3;r++) for (let i=0;i<14;i++){ const tx = hx0 + 6 + i*(hx1 - hx0 - 10)/14 + (r%2)*4, ty = hy + 4 + r*5, s = 1 + r*.35; if (hash(i, r, 5) < .12) continue; x.fillStyle = b2Mix('#4a4c4a', '#6e6e66', hash(i, r, 6)); x.beginPath(); x.moveTo(tx - 3*s, ty); x.lineTo(tx, ty - 3.4*s); x.lineTo(tx + 3*s, ty); x.fill(); x.fillStyle = 'rgba(0,0,0,.35)'; x.beginPath(); x.moveTo(tx, ty - 3.4*s); x.lineTo(tx + 3*s, ty); x.lineTo(tx + .6*s, ty); x.fill(); }
    for (let i=0;i<5;i++) b3c1Fire(x, hx0 + 10 + hash(i,8)*(hx1 - hx0 - 20), hy + 7 + hash(i,9)*8, .7, .6); // cook-fires
    // Brood's camp, right: a sprawl of hide tents, round and conical, no lines to it; herds dark beyond
    for (let i=0;i<40;i++){ const k = hash(i,31), tx = W*(.66 + hash(i,32)*.36), ty = hz + 3 + k*H*.12, s = .8 + k*1.6; x.fillStyle = hash(i,33) > .5 ? '#5a4a3a' : '#4a3e32';
      if (hash(i,34) > .45) { x.beginPath(); x.moveTo(tx - 3*s, ty); x.lineTo(tx, ty - 4.4*s); x.lineTo(tx + 3*s, ty); x.fill(); x.strokeStyle = 'rgba(30,22,16,.55)'; x.lineWidth = .4; x.beginPath(); x.moveTo(tx - .8*s, ty - 5.4*s); x.lineTo(tx + .8*s, ty - 3.6*s); x.moveTo(tx + .8*s, ty - 5.4*s); x.lineTo(tx - .8*s, ty - 3.6*s); x.stroke(); }
      else { x.beginPath(); x.ellipse(tx, ty, 3.4*s, 2.6*s, 0, Math.PI, 0); x.fill(); } }
    for (let i=0;i<50;i++){ const xx = W*(.72 + hash(i,41)*.3), yy = hz - 1 + hash(i,42)*3; x.fillStyle = '#2a2622'; x.beginPath(); x.ellipse(xx, yy, 1.4, .8, 0, 0, 7); x.fill(); } // the herds on the skyline
    // the pavilion: a long tent with its front rolled up, an awning on poles, the two standards
    const tw = 62*ps, th = 30*ps; ell(x, px, py + 3*ps, tw*.66, 6*ps, 'rgba(0,0,0,.35)');
    x.fillStyle = vgrad(x, py - th, py, [[0,'#b8b0a0'],[1,'#7a7264']]); x.beginPath(); x.moveTo(px - tw*.5, py); x.lineTo(px - tw*.44, py - th*.55); x.lineTo(px - tw*.16, py - th); x.lineTo(px + tw*.16, py - th); x.lineTo(px + tw*.44, py - th*.55); x.lineTo(px + tw*.5, py); x.closePath(); x.fill();
    x.fillStyle = 'rgba(40,36,30,.35)'; x.beginPath(); x.moveTo(px + tw*.16, py - th); x.lineTo(px + tw*.44, py - th*.55); x.lineTo(px + tw*.5, py); x.lineTo(px + tw*.18, py); x.closePath(); x.fill(); // the shaded side
    x.fillStyle = '#16120e'; x.fillRect(px - tw*.24, py - th*.52, tw*.48, th*.52); x.fillStyle = 'rgba(232,180,110,.18)'; x.fillRect(px - tw*.2, py - th*.48, tw*.4, th*.1); // the open front, a lamp lit inside
    x.fillStyle = '#9a9282'; x.beginPath(); x.moveTo(px - tw*.32, py - th*.56); x.lineTo(px + tw*.32, py - th*.56); x.lineTo(px + tw*.38, py - th*.42); x.lineTo(px - tw*.38, py - th*.42); x.fill(); // the awning
    x.fillStyle = '#2a2018'; [-.36, .36].forEach(k => x.fillRect(px + tw*k - .6, py - th*.44, 1.2, th*.44)); x.fillRect(px - .7, py - th - 7*ps, 1.4, 7*ps);
    x.strokeStyle = 'rgba(30,24,18,.5)'; x.lineWidth = .6; for (let i=0;i<5;i++){ x.beginPath(); x.moveTo(px - tw*.16 + i*tw*.08, py - th); x.lineTo(px - tw*.46 + i*tw*.23, py); x.stroke(); } // seams
    [[-tw*.58, '#2a2826'], [tw*.58, '#6a2a22']].forEach(([dx, c]) => { x.fillStyle = '#1e1810'; x.fillRect(px + dx - .7, py - th*1.5, 1.4, th*1.5); });
    // the guard line in front of the tent, and the people gathered, small and dark
    for (let i=0;i<9;i++){ const gx = px - tw*.9 + i*tw*.22, gy = py + 9*ps; x.fillStyle = '#1a1c1e'; x.fillRect(gx - .8*ps, gy - 6*ps, 1.6*ps, 6*ps); x.beginPath(); x.arc(gx, gy - 7*ps, 1*ps, 0, 7); x.fill(); x.fillRect(gx + 1*ps, gy - 10*ps, .4*ps, 9*ps); } // spearmen
    [[-.3, 1], [-.14, 1.14], [.2, 1.3], [.08, 1], [.3, 1.08]].forEach(([k, s], i) => { const gx = px + tw*k, gy = py + 1*ps; x.fillStyle = i === 2 ? '#141012' : '#24221e'; x.fillRect(gx - 1*ps*s, gy - 7*ps*s, 2*ps*s, 7*ps*s); x.beginPath(); x.arc(gx, gy - 8*ps*s, 1.2*ps*s, 0, 7); x.fill(); }); // the great ones under the awning; one very tall
    // the near rise: a stake line, the Fourth's picket
    x.fillStyle = vgrad(x, H*.84, H, [[0,'#1c1e1a'],[1,'#0a0b0a']]); x.beginPath(); x.moveTo(0, H); x.lineTo(0, H*.86); x.quadraticCurveTo(W*.4, H*.82, W, H*.88); x.lineTo(W, H); x.fill();
    x.strokeStyle = '#2a2218'; x.lineWidth = 1.6; for (let i=0;i<8;i++){ const sx = W*(.04 + i*.135), sy = H*(.86 - Math.sin(i/7*Math.PI)*.02); x.beginPath(); x.moveTo(sx, sy + 4); x.lineTo(sx + 1.6, sy - 10); x.stroke(); }
    x.strokeStyle = 'rgba(160,140,110,.45)'; x.lineWidth = .7; x.beginPath(); for (let i=0;i<8;i++){ const sx = W*(.04 + i*.135) + 1.2, sy = H*(.86 - Math.sin(i/7*Math.PI)*.02) - 7; i ? x.quadraticCurveTo(sx - W*.067, sy + 3, sx, sy) : x.moveTo(sx, sy); } x.stroke(); // the picket rope, sagging
  }), 0, 0, W, H);
  // smoke from both camps, leaning east
  for (let c=0;c<6;c++){ const bx = c < 3 ? W*(.06 + c*.11) : W*(.7 + (c - 3)*.1), by = hz + H*.07; for (let i=0;i<10;i++){ const k = ((t*mo/(12000 + c*900) + i/10) % 1); glow(ctx, bx + k*k*40, by - k*hz*.5, 4 + k*14, '#b4b8bc', .16*(1 - k)); } }
  // the two standards: the Host's dark one, Brood's people's pale red one
  const tw = 62*ps, th = 30*ps; [[-tw*.58, '#2a2826', '#4a4642', 0], [tw*.58, '#7a2a22', '#a8443a', 2]].forEach(([dx, c1, c2, ph]) => { const sx = px + dx, sy = py - th*1.5, w = Math.sin(t*mo/500 + ph)*1.4*ps;
    ctx.fillStyle = c1; ctx.beginPath(); ctx.moveTo(sx + .7, sy); ctx.quadraticCurveTo(sx + 6*ps, sy + w, sx + 12*ps, sy + 1*ps + w*1.4); ctx.lineTo(sx + 11*ps, sy + 7*ps + w*1.2); ctx.quadraticCurveTo(sx + 6*ps, sy + 6*ps - w, sx + .7, sy + 7*ps); ctx.fill(); ctx.fillStyle = c2; ctx.fillRect(sx + .7, sy, 3*ps, 1*ps); });
  // the child in red wool, in the middle distance, among the Rhivi by the tent's right; and the old woman beside her
  drawFigure(ctx, 'mhybe', px + tw*.72, py + 6*ps, .62*ps, t, {still:true, dir:-1}); drawFigure(ctx, 'silverfox', px + tw*.62, py + 6*ps, .78*ps, t, {still:true, dir:-1});
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, px + tw*.62, py + 2*ps, 8*ps, '#d05a3a', .12); ctx.globalCompositeOperation = 'source-over';
  // the crows, circling over the tent
  for (let i=0;i<5;i++){ const a = t*mo/(2400 + i*300) + i*1.3, rx = px + Math.cos(a)*(20 + i*7)*ps, ry = py - th - 22*ps + Math.sin(a)*(6 + i*2)*ps, f = Math.sin(t*mo/140 + i*2)*1.4; ctx.strokeStyle = '#0c0c0e'; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(rx - 3, ry - f); ctx.quadraticCurveTo(rx - 1, ry - .6, rx, ry); ctx.quadraticCurveTo(rx + 1, ry - .6, rx + 3, ry - f); ctx.stroke(); }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.08 + i*Math.min(30, W*.42/sq.length), H*.95 - (i%2)*3, 2, t, {phase:i, dir:1}));
  vign(ctx, W, H, .7, .5); };

/* Pale's tunnels: the sappers' galleries under the city, cut the year the Host sat here; timber sets running away into the dark, a lamp
   hung on the nearest, a side gallery black on the right, the things men left behind on the floor */
SCENEX.b3_c1_tunnels = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b3c1Fl(t), vx = W*.5, vy = H*.46, sw = Math.sin(t*mo/1500)*2;
  const box = s => ({x0: vx - W*.56*s, x1: vx + W*.56*s, y0: vy - H*.5*s, y1: vy + H*.56*s}); // the gallery's section at depth s
  ctx.drawImage(sceneLayer('b3c1:tunnels', W, H, (x, W, H) => {
    x.fillStyle = '#0c0a08'; x.fillRect(0, 0, W, H);
    const N = 12, near = box(1.02), far = box(.05);
    const quad = (pts, c) => { x.fillStyle = c; x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.closePath(); x.fill(); };
    quad([[near.x0, near.y0], [near.x1, near.y0], [far.x1, far.y0], [far.x0, far.y0]], vgrad(x, 0, vy, [[0,'#2a2016'],[1,'#0a0806']])); // the roof
    quad([[near.x0, near.y1], [near.x1, near.y1], [far.x1, far.y1], [far.x0, far.y1]], vgrad(x, vy, H, [[0,'#0c0a08'],[1,'#3a2e22']])); // the floor
    const wall = (side) => { const a = side < 0 ? 'x0' : 'x1'; const g = x.createLinearGradient(near[a], 0, vx, 0); g.addColorStop(0, side < 0 ? '#4a3a28' : '#3a2e20'); g.addColorStop(1, '#0a0806'); quad([[near[a], near.y0], [far[a], far.y0], [far[a], far.y1], [near[a], near.y1]], g); };
    wall(-1); wall(1);
    for (let i=0;i<60;i++){ const s = Math.pow(.78, hash(i, 51)*11), b = box(s), side = hash(i, 52) > .5 ? 'x1' : 'x0', yy = lerp(b.y0, b.y1, .1 + hash(i, 53)*.8); x.strokeStyle = `rgba(${hash(i, 54) > .5 ? '20,14,8' : '120,96,64'},${.35*Math.min(1, s*3)})`; x.lineWidth = Math.max(.4, 1.6*s); x.beginPath(); x.moveTo(b[side], yy); x.lineTo(b[side] + (side === 'x0' ? 1 : -1)*6*s, yy + 5*s); x.stroke(); } // pick-marks in the walls
    // the side gallery, black, on the right between the second and third sets
    const s1 = Math.pow(.72, 1.4), s2 = Math.pow(.72, 2.2), b1 = box(s1), b2 = box(s2), gy1 = b1.y0 + (b1.y1 - b1.y0)*.24, gy2 = b2.y0 + (b2.y1 - b2.y0)*.24; x.fillStyle = '#050404'; x.beginPath(); x.moveTo(b1.x1, b1.y1); x.lineTo(b1.x1, gy1 + 6); x.quadraticCurveTo(b1.x1 - 2, gy1 - 4, lerp(b1.x1, b2.x1, .5), lerp(gy1, gy2, .5) - 5); x.quadraticCurveTo(b2.x1 + 1, gy2 - 2, b2.x1, gy2 + 4); x.lineTo(b2.x1, b2.y1); x.closePath(); x.fill(); // the side gallery, black, roughly hewn
    // the timber sets: two posts and a cap, ring by ring
    for (let i=N;i>=0;i--){ const s = Math.pow(.72, i), b = box(s), k = Math.pow(1 - i/N, 1.8), w = Math.max(1, 9*s), cap = Math.max(1, 7*s), wood = b2Mix('#050403', i%3 ? '#5a4228' : '#6a4e30', k);
      x.fillStyle = wood; x.fillRect(b.x0, b.y0, w, b.y1 - b.y0); x.fillRect(b.x1 - w, b.y0, w, b.y1 - b.y0); x.fillRect(b.x0 - w*.3, b.y0, b.x1 - b.x0 + w*.6, cap);
      x.fillStyle = `rgba(255,200,140,${.16*k})`; x.fillRect(b.x0 + w*.6, b.y0 + cap, w*.4, b.y1 - b.y0 - cap); x.fillRect(b.x0, b.y0 + cap*.75, b.x1 - b.x0, Math.max(.5, cap*.2)); // the lamp's side of the wood
      x.fillStyle = `rgba(0,0,0,${.4*k})`; x.fillRect(b.x1 - w, b.y0 + cap, w*.45, b.y1 - b.y0 - cap);
      if (hash(i, 61) > .55) { x.save(); x.translate(b.x0 + w, b.y0 + cap); x.rotate(.7); x.fillStyle = wood; x.fillRect(0, -w*.3, w*2.6, w*.6); x.restore(); } // a brace
      if (i === 5) { x.save(); x.translate(b.x1, b.y0 + cap); x.rotate(.35); x.fillStyle = wood; x.fillRect(-w*1.4, 0, w*1.2, (b.y1 - b.y0)*.5); x.restore(); } } // one set sagging, its post kicked out of true
    for (let i=0;i<70;i++){ const s = Math.pow(.78, hash(i, 71)*12), b = box(s), xx = lerp(b.x0, b.x1, .15 + hash(i, 72)*.7), yy = b.y1 - hash(i, 73)*4*s; ell(x, xx, yy, (1 + hash(i, 74)*3)*s, (.6 + hash(i, 74))*s, `rgba(${hash(i, 75) > .5 ? '90,74,54' : '14,10,8'},.7)`); } // spoil and rubble on the floor
    // what men left: a bedroll, a dented helm, a broken crate with sapper's marks, a tally scratched in a post
    const fb = box(.62); ell(x, fb.x0 + W*.12, fb.y1 - 2, W*.07, H*.018, '#3a3026'); ell(x, fb.x0 + W*.1, fb.y1 - 4, W*.03, H*.02, '#4a3e30');
    ell(x, W*.68, H*.9, 7, 4, '#3a3a36'); x.fillStyle = '#4a4a44'; x.beginPath(); x.ellipse(W*.68, H*.89, 7, 6, 0, Math.PI, 0); x.fill(); x.fillStyle = 'rgba(0,0,0,.4)'; x.fillRect(W*.68 - 2, H*.86, 3, 2); // the helm
    const cb = box(.42); x.fillStyle = '#3a2c1c'; x.fillRect(cb.x1 - W*.12, cb.y1 - 12, 18, 10); x.fillStyle = '#2a2016'; x.fillRect(cb.x1 - W*.12, cb.y1 - 12, 18, 2); x.strokeStyle = 'rgba(210,180,130,.4)'; x.lineWidth = .7; x.beginPath(); x.moveTo(cb.x1 - W*.12 + 4, cb.y1 - 9); x.lineTo(cb.x1 - W*.12 + 9, cb.y1 - 5); x.moveTo(cb.x1 - W*.12 + 9, cb.y1 - 9); x.lineTo(cb.x1 - W*.12 + 4, cb.y1 - 5); x.stroke(); // the crate, an X burnt in it
    const nb = box(1); x.strokeStyle = 'rgba(220,190,140,.35)'; x.lineWidth = 1; for (let i=0;i<9;i++){ x.beginPath(); x.moveTo(nb.x0 + 2 + (i%5)*1.8 + (i > 4 ? 0 : 0), H*.4 + (i > 4 ? 10 : 0)); x.lineTo(nb.x0 + 2.4 + (i%5)*1.8, H*.4 + 7 + (i > 4 ? 10 : 0)); x.stroke(); } // days, counted on the post
  }), 0, 0, W, H);
  // the lamp, hung from the nearest cap, swinging a little; its light on everything near
  const b = box(.86), lx = b.x0 + W*.14 + sw, ly = b.y0 + H*.2;
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, ly + 10, W*.55, '#e08a3a', .22*fl); glow(ctx, lx, ly, 26, '#ffc070', .5*fl); ctx.globalCompositeOperation = 'source-over';
  ctx.strokeStyle = '#140e08'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(b.x0 + W*.14, b.y0 + 4); ctx.lineTo(lx, ly - 6); ctx.stroke();
  ctx.fillStyle = '#2a2016'; ctx.fillRect(lx - 4, ly - 6, 8, 2); ctx.fillRect(lx - 3.4, ly - 4, 6.8, 9); ctx.fillStyle = `rgba(255,${200 + Math.round(fl*20)},130,${.85*fl})`; ctx.fillRect(lx - 2.2, ly - 2.6, 4.4, 6); ctx.fillStyle = '#2a2016'; ctx.fillRect(lx - .4, ly - 4, .8, 9);
  // far off down the gallery: a second light that should not be there, and something moving across it
  const fx = vx + W*.01, fy = vy + H*.03, p = (Math.sin(t*mo/1700) + 1)/2; ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, 16, '#d07a30', .12 + p*.06); ctx.globalCompositeOperation = 'source-over';
  const mx = fx - 6 + ((t*mo/5200) % 1)*12; ctx.fillStyle = '#030202'; ctx.fillRect(mx - .6, fy - 4, 1.2, 4.4); ctx.beginPath(); ctx.arc(mx, fy - 4.8, .8, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(230,200,160,.35)'; for (let i=0;i<22;i++){ const y = (hash(i,10)*H + t*.006*mo*(1 + hash(i,11))) % H, xx = lx + (hash(i,9) - .5)*W*.5 + Math.sin(t/1400 + i)*5; ctx.globalAlpha = clamp(1 - Math.hypot(xx - lx, y - ly)/(W*.28), 0, 1); ctx.fillRect(xx, y, 1.1, 1.1); } ctx.globalAlpha = 1; // dust in the lamplight
  for (let i=0;i<3;i++){ const k = ((t*mo/(2600 + i*700) + i*.33) % 1); ctx.fillStyle = `rgba(150,130,100,${.5*(1 - k)})`; ctx.fillRect(W*(.3 + i*.2) + hash(i, 5)*20, H*.08 + k*H*.7, .9, 1.4); } // grit trickling from the roof
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.12 + i*Math.min(30, W*.42/sq.length), H*.96 - (i%2)*3, 2.1, t, {phase:i, dir:1}));
  ctx.fillStyle = 'rgba(6,4,2,.38)'; ctx.fillRect(0, H*.74, W, H*.26);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.22, H*.82, W*.26, '#c87a3a', .07*fl); ctx.globalCompositeOperation = 'source-over';
  vign(ctx, W, H, .78, .5); };

/* the Rhivi camp at night: hide tents under a hard spring sky, fires with singers round them, the herds a dark tide beyond, a spirit-light
   on a bone stake; the Mhybe's tent the big one in the middle, guarded */
SCENEX.b3_c1_rhivi = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, fl = b3c1Fl(t), hz = H*.54;
  const fires = [[.2, .78, 1.3], [.5, .7, 1], [.78, .8, 1.4], [.36, .64, .6], [.66, .63, .55]];
  ctx.drawImage(sceneLayer('b3c1:rhivi', W, H, (x, W, H) => {
    x.fillStyle = vgrad(x, 0, hz, [[0,'#03050a'],[.5,'#0c1422'],[.85,'#24344a'],[1,'#3e5068']]); x.fillRect(0, 0, W, hz + 2);
    for (let i=0;i<5;i++) glow(x, W*(.05 + i*.24), hz*(.62 - i*.11), W*.2, '#6a7c9a', .07); // the river of stars, a haze...
    for (let i=0;i<260;i++){ const u = hash(i, 91), v = (hash(i, 92) - .5)*(.1 + hash(i, 93)*.14); x.fillStyle = `rgba(200,212,236,${.15 + hash(i, 94)*.4})`; x.fillRect(W*u, hz*(.64 - u*.46 + v*2), .7, .7); } // ...and the dust of it
    // the plain's far edge, and the herds lying on it like a second dark
    x.fillStyle = '#121a24'; x.beginPath(); x.moveTo(0, hz); for (let X=0;X<=W + 8;X+=8) x.lineTo(X, hz - 2 - Math.sin(X/90)*3 - hash(X, 5)*1.5); x.lineTo(W, hz); x.fill();
    x.fillStyle = vgrad(x, hz, H, [[0,'#0e141c'],[.4,'#0a0e14'],[1,'#050608']]); x.fillRect(0, hz, W, H - hz);
    x.fillStyle = '#0a0e14'; for (let i=0;i<120;i++){ const xx = W*(.42 + Math.pow(hash(i, 86), .8)*.6), yy = hz - 1.4 + hash(i, 87)*1.6, s = .7 + hash(i, 88)*.5; x.beginPath(); x.ellipse(xx, yy, 3*s, 2.2*s, 0, Math.PI, 0); x.fill(); x.beginPath(); x.ellipse(xx + 2.6*s, yy - .4*s, 1.1*s, 1*s, 0, 0, 7); x.fill(); } // the herd on the skyline, a dark tide
    for (let i=0;i<260;i++){ const k = Math.pow(hash(i, 81), 1.8), xx = hash(i, 82)*W, yy = hz + 1 + k*H*.1, s = .5 + k*1.6; if (hash(i, 83) < .35 && xx > W*.3 && xx < W*.7) continue; x.fillStyle = `rgba(${hash(i,84) > .5 ? '20,22,26' : '30,30,34'},.95)`; x.beginPath(); x.ellipse(xx, yy, 3.2*s, 1.6*s, 0, Math.PI, 0); x.fill(); x.beginPath(); x.ellipse(xx + 2.6*s, yy - 1*s, 1.2*s, 1*s, 0, 0, 7); x.fill(); } // bhederin, humped, heads down
    // the tents: Rhivi hide cones, poles crossed at the smoke-hole; the Mhybe's the great one, a skin of red ochre on its door
    const tent = (tx, ty, s, big) => { ell(x, tx, ty + 1, 7*s, 1.6*s, 'rgba(0,0,0,.5)'); x.fillStyle = vgrad(x, ty - 12*s, ty, [[0, big ? '#4a3a2e' : '#3a3028'],[1, '#14100c']]); x.beginPath(); x.moveTo(tx - 7*s, ty); x.lineTo(tx - .6*s, ty - 12*s); x.lineTo(tx + .6*s, ty - 12*s); x.lineTo(tx + 7*s, ty); x.fill();
      x.fillStyle = 'rgba(0,0,0,.35)'; x.beginPath(); x.moveTo(tx + .6*s, ty - 12*s); x.lineTo(tx + 7*s, ty); x.lineTo(tx + 2*s, ty); x.fill(); x.strokeStyle = '#0a0806'; x.lineWidth = Math.max(.6, .7*s); x.beginPath(); x.moveTo(tx - 2*s, ty - 15*s); x.lineTo(tx + 1*s, ty - 11*s); x.moveTo(tx + 2*s, ty - 15*s); x.lineTo(tx - 1*s, ty - 11*s); x.moveTo(tx, ty - 15.6*s); x.lineTo(tx, ty - 11*s); x.stroke();
      x.fillStyle = big ? '#6a2a1a' : '#0a0806'; x.beginPath(); x.moveTo(tx - 1.8*s, ty); x.lineTo(tx - .2*s, ty - 4.6*s); x.lineTo(tx + 1.6*s, ty); x.fill(); if (big) { x.strokeStyle = 'rgba(220,200,160,.4)'; x.lineWidth = .6; x.beginPath(); x.arc(tx - 2*s, ty - 6*s, 1.4*s, 0, 7); x.stroke(); } };
    [[.06, .6, .7], [.24, .58, .5], [.14, .68, 1.2], [.3, .62, .7], [.42, .58, .55], [.6, .58, .6], [.84, .6, .7], [.9, .68, 1.2], [.98, .8, 1.8], [.03, .84, 1.9], [.72, .68, 1]].forEach(([a, b, s]) => tent(W*a, H*b, s*Math.min(1.3, W/300), false));
    tent(W*.52, H*.64, 1.8*Math.min(1.3, W/300), true);
    for (let i=0;i<4;i++){ const gx = W*(.43 + i*.06), gy = H*.66; x.fillStyle = '#05060a'; x.fillRect(gx - .8, gy - 6, 1.6, 6); x.beginPath(); x.arc(gx, gy - 6.8, .9, 0, 7); x.fill(); x.fillRect(gx + 1, gy - 10, .4, 9); } // the guard on her tent, spears up
    x.fillStyle = vgrad(x, H*.86, H, [[0,'#0a0c10'],[1,'#030304']]); x.beginPath(); x.moveTo(0, H); x.lineTo(0, H*.9); x.quadraticCurveTo(W*.5, H*.84, W, H*.9); x.lineTo(W, H); x.fill();
  }), 0, 0, W, H);
  for (let i=0;i<80;i++){ const tw = .5 + .5*Math.sin(t*mo/(700 + hash(i, 3)*900) + i); ctx.fillStyle = `rgba(214,226,246,${(.25 + hash(i, 4)*.55)*(.6 + tw*.4)})`; ctx.fillRect(hash(i, 1)*W, Math.pow(hash(i, 2), 1.3)*hz*.92, hash(i, 5) > .9 ? 1.4 : .9, hash(i, 5) > .9 ? 1.4 : .9); } // stars
  // the fires: light on the ground, flames, sparks going up, and the singers round them, dark against it
  fires.forEach(([a, b, s], j) => { const fx = W*a, fy = H*b, f = fl*(.9 + .1*Math.sin(t*mo/90 + j*2));
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy - 2*s, 40*s, '#e07a30', .26*f); glow(ctx, fx, fy - 2*s, 10*s, '#ffc070', .55*f); ctx.globalCompositeOperation = 'source-over';
    for (let k=0;k<3;k++){ const hh = (6 + k*2 + Math.sin(t*mo/70 + k*2 + j)*1.6)*s; ctx.fillStyle = ['rgba(200,70,20,.85)', 'rgba(255,150,50,.85)', 'rgba(255,230,160,.9)'][k]; ctx.beginPath(); ctx.moveTo(fx - (3 - k)*s, fy); ctx.quadraticCurveTo(fx - (1.2 - k*.3)*s, fy - hh*.6, fx + Math.sin(t*mo/110 + j)*s*.6, fy - hh); ctx.quadraticCurveTo(fx + (1.2 - k*.3)*s, fy - hh*.6, fx + (3 - k)*s, fy); ctx.fill(); }
    for (let i=0;i<6;i++){ const k = ((t*mo/(2200 + hash(i, j)*1600) + hash(j, i)) % 1); ctx.fillStyle = `rgba(255,${170 + Math.round(hash(i, j, 2)*70)},90,${(1 - k)*.85})`; ctx.fillRect(fx + Math.sin(t/500 + i*2)*4*s + k*6*s, fy - 6*s - k*40*s, 1, 1); }
    if (s > .9) { const n = 4 + j%2; for (let i=0;i<n;i++){ const a2 = Math.PI*(.15 + .7*i/(n - 1)), sx = fx + Math.cos(a2 + Math.PI)*12*s, sy = fy + 2*s - Math.sin(a2)*2*s, sway = i === 1 ? Math.sin(t*mo/600 + j)*.8*s : 0; ctx.fillStyle = '#05060a'; ctx.beginPath(); ctx.ellipse(sx + sway, sy - 3.6*s, 2.6*s, 3.6*s, 0, Math.PI, 0); ctx.fill(); ctx.fillRect(sx - 2.6*s + sway, sy - 3.6*s, 5.2*s, 3.6*s); ctx.beginPath(); ctx.arc(sx + sway*1.4, sy - 8.4*s, 1.6*s, 0, 7); ctx.fill(); }
      ctx.fillStyle = 'rgba(255,170,90,.25)'; for (let i=0;i<n;i++){ const a2 = Math.PI*(.15 + .7*i/(n - 1)), sx = fx + Math.cos(a2 + Math.PI)*12*s; ctx.fillRect(sx + (sx < fx ? 1.6 : -2.2)*s, fy - 6*s, .6*s, 3*s); } } }); // the singers, firelight on the edges of them
  // a spirit-light on a bone stake at the herd's edge, breathing
  const sx = W*.3, sy = H*.6, p = (Math.sin(t*mo/1100) + 1)/2; ctx.strokeStyle = '#c8bca0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, sy - 10); ctx.stroke();
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, sx, sy - 13, 18, '#a8e0cc', .2 + p*.1); glow(ctx, sx, sy - 13, 5, '#e0fff4', .6); ctx.globalCompositeOperation = 'source-over'; ell(ctx, sx, sy - 13, 1.2, 1.4, 'rgba(240,255,250,.9)');
  for (let j=0;j<3;j++){ const ph = (t*mo/2600 + j/3) % 1, aa = j*2.1 + t*mo/1600; ell(ctx, sx + Math.cos(aa)*6, sy - 13 + Math.sin(aa)*3 - ph*8, .8, .5, `rgba(210,250,236,${.4*Math.sin(ph*Math.PI)})`); }
  // smoke from the smoke-holes, faint against the stars
  for (let c=0;c<3;c++){ const bx = W*(.14 + c*.38), by = H*.56; for (let i=0;i<8;i++){ const k = ((t*mo/(10000 + c*1500) + i/8) % 1); glow(ctx, bx + k*k*30, by - k*hz*.5, 3 + k*12, '#3a4658', .25*(1 - k)); } }
  const sq = marchOrder(sceneSquad()); sq.forEach((id, i) => drawFigure(ctx, id, W*.08 + i*Math.min(30, W*.42/sq.length), H*.96 - (i%2)*3, 2, t, {phase:i, dir:1}));
  ctx.fillStyle = 'rgba(2,4,8,.4)'; ctx.fillRect(0, H*.78, W, H*.22);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.2, H*.82, W*.3, '#e07a30', .06*fl); ctx.globalCompositeOperation = 'source-over'; // the nearest fire on their faces
  vign(ctx, W, H, .78, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Three's cold ground ----------------
   weapons and armour 200×150 (the ground a slate-blue radial), trinkets 240×130, the same flat shapes and single highlight as Book Two's */
function b3c1Item(key, label, body, trinket){ const [w, h] = trinket ? [240, 130] : [200, 150], id = 'c3-' + key.replace(/[^a-z0-9]/g, '');
  if (!trinket) body = `<g transform="translate(-20 10)">${body}</g>`; // drawn on the trinket card; centred on the 200×150 one
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="${trinket ? .66 : .62}"><stop offset="0" stop-color="${trinket ? '#34404c' : '#36404a'}"></stop><stop offset="1" stop-color="#0a0d11"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* the drawings, by what they are; B3C1_ITEMS maps the writer's keys to them (and a key nobody mapped gets the nearest by its name) */
const B3C1_DRAW = {
  /* a Second Army whetstone: a grey hone in a worn leather sleeve, the Second's stamp on the sleeve, a smear of oil */
  whetstone: [true, '<ellipse cx="120" cy="70" rx="70" ry="30" fill="#8ab0d0" opacity=".06"/><path d="M58 80 L170 52 Q182 50 184 58 Q186 66 174 70 L62 98 Q50 100 48 92 Q46 84 58 80 Z" fill="#7a8088"/><path d="M60 82 L172 54" stroke="#c8ced4" stroke-width="1.4" fill="none"/>'
    + '<path d="M70 86 L176 60" stroke="#5a6068" stroke-width="1" opacity=".7"/><path d="M96 74 Q130 66 150 64" stroke="#e8eef4" stroke-width="2" opacity=".35" fill="none"/><path d="M40 84 L104 68 L112 96 L50 112 Z" fill="#5a3e26"/><path d="M40 84 L104 68" stroke="#7a5a3a" stroke-width="2"/>'
    + '<path d="M50 112 L112 96" stroke="#2a1c10" stroke-width="2"/><path d="M48 90 L106 76 M52 100 L110 86" stroke="#d8c8a0" stroke-width="1" stroke-dasharray="3 3" opacity=".7"/><circle cx="78" cy="88" r="7" fill="none" stroke="#c8b070" stroke-width="1.6"/><path d="M75 91 L78 84 L81 91" fill="none" stroke="#c8b070" stroke-width="1.2"/>'
    + '<ellipse cx="150" cy="62" rx="9" ry="2.4" fill="#e8f0f8" opacity=".25"/>'],
  /* a Rhivi bone charm: a small carved bhederin of bone on a thong, red ochre in the cuts, two blue beads */
  bonecharm: [true, '<g transform="translate(120 66) scale(1.28) translate(-120 -62)"><circle cx="120" cy="70" r="46" fill="#a8e0cc" opacity=".06"/><path d="M78 20 Q120 34 162 20" stroke="#6a4a2a" stroke-width="2.4" fill="none"/><path d="M120 31 L120 46" stroke="#6a4a2a" stroke-width="2.4"/><circle cx="104" cy="28" r="4" fill="#5a88b0"/><circle cx="136" cy="28" r="4" fill="#5a88b0"/>'
    + '<path d="M86 74 Q88 56 108 52 Q122 46 140 52 Q152 50 158 60 Q164 66 160 72 Q154 76 148 74 L146 92 L138 92 L136 80 Q120 84 104 80 L102 94 L94 94 L92 78 Q84 80 86 74 Z" fill="#e6dcc4"/><path d="M110 52 Q120 42 132 50" fill="#d0c4a8"/><path d="M154 58 Q160 54 162 50" stroke="#e6dcc4" stroke-width="2.4" fill="none"/>'
    + '<path d="M104 62 L108 72 M116 58 L118 70 M128 60 L128 72" stroke="#a8442a" stroke-width="2"/><circle cx="152" cy="64" r="1.8" fill="#1a1008"/><path d="M90 76 Q120 84 148 74" stroke="#b8ac90" stroke-width="1" fill="none"/></g>'],
  /* a Barghast iron torc: a heavy twisted iron neck-ring, open at the front, the knobbed ends wound with sinew; Ilgres work */
  torc: [true, '<g transform="translate(120 68) scale(1.12) translate(-120 -68)"><ellipse cx="120" cy="72" rx="64" ry="38" fill="#8ab0d0" opacity=".05"/><path d="M98 104 Q60 100 60 70 Q60 34 120 32 Q180 34 180 70 Q180 100 142 104" fill="none" stroke="#2a2c30" stroke-width="13" stroke-linecap="round"/>'
    + '<path d="M98 104 Q60 100 60 70 Q60 34 120 32 Q180 34 180 70 Q180 100 142 104" fill="none" stroke="#5a5e64" stroke-width="9" stroke-linecap="round"/><path d="M98 104 Q60 100 60 70 Q60 34 120 32 Q180 34 180 70 Q180 100 142 104" fill="none" stroke="#9aa0a8" stroke-width="2" stroke-dasharray="5 6" opacity=".8"/>'
    + '<path d="M70 52 Q86 38 112 35" stroke="#d8dee4" stroke-width="1.5" fill="none" opacity=".6"/><circle cx="96" cy="104" r="9" fill="#4a4e54"/><circle cx="144" cy="104" r="9" fill="#4a4e54"/><circle cx="93" cy="101" r="3" fill="#a8aeb6" opacity=".6"/><circle cx="141" cy="101" r="3" fill="#a8aeb6" opacity=".6"/>'
    + '<path d="M104 98 L110 104 M106 94 L112 100 M136 98 L130 104 M134 94 L128 100" stroke="#b89a70" stroke-width="2"/><path d="M166 84 l4 -2 M172 70 l4 0" stroke="#8a3a1e" stroke-width="2" opacity=".7"/></g>'],
};
const B3C1_ITEMS = {b3_c1_whetstone:['whetstone', 'A Second Army whetstone'], b3_c1_torc:['torc', 'An Ilgres iron torc'], b3_c1_charm:['bonecharm', 'A Rhivi bone charm']}; // writer's key -> drawing name (filled in as the chapter's gear appears); a b3_c1_ item nobody mapped gets the nearest by its name
function b3c1ItemsArt(){ const gear = Object.assign({}, (typeof B3CH1 !== 'undefined' && B3CH1 && B3CH1.gear) || {}), items = typeof ITEMS !== 'undefined' ? ITEMS : {};
  const keys = new Set(Object.keys(B3C1_ITEMS)); Object.keys(items).concat(Object.keys(gear)).forEach(k => { if (/^b3_c1_/.test(k)) keys.add(k); });
  keys.forEach(k => { if (ART['item/' + k] && !B3C1_ITEMS[k]) return; const m = B3C1_ITEMS[k] || [], it = gear[k] || items[k] || {}, nm = String(it.name || m[1] || k), hay = k + ' ' + nm;
    const d = m[0] || (/hone|whet/i.test(hay) ? 'whetstone' : /torc|neck-ring/i.test(hay) ? 'torc' : 'bonecharm'), [tr, body] = B3C1_DRAW[d] || B3C1_DRAW.bonecharm;
    b3c1Item(k, nm.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'), body, it.slot ? it.slot === 'trinket' : tr); }); }
b3c1ItemsArt();

/* ground: Pale's tunnels are Book One's own (an area's tunnel flag); this name draws them too, for a map or battle that names a style */
TILEX.b3_c1_tunnel = (ctx, ch, x, y, T, dark) => drawTile(ctx, ch, x, y, T, dark, true, null);
