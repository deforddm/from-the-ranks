/* ============ Book Nine's title: the column going east into the Wastes, and the dust on the boots (v12.0, 160b) ============
   The painted title (ART 'title/dod', drawn by Claude for this game from a seeded generator): late afternoon in the Wastes, a sky too big
   for the land under it; the army as a long thin column marching away east to the horizon, wagons among the files, its own dust hanging
   over it; far off on the horizon a low wall of dust that is not the column's (the short-tails, never shown); and in the foreground one
   soldier walking away after the column, pack and spear, the boots and leggings grey with dust to the knee. No one turns to look at the far dust yet.
   The patch (ART 'insignia/dod'): the two squads' own patches side by side, as Book Seven's (David, Nov 10): the Third's (Book Four's
   lozenge, its finger bone) with a boot-print in dust stitched under it, and the Sixth Company's (Book Five's coin) with a ration sack.
   Motion: the .k9-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  /* redrawn v13.2 from a seeded generator (019f's kit): late afternoon in the Wastes, a sky too big for the land under it, high thin cloud
     and the sun low behind haze; the army as a long thin column marching away east to the horizon, wagons among the files, its own dust
     hanging over it gold in the light; far off on the horizon a low wall of dust that is not the column's (the short-tails, never shown);
     cracked ground and scrub; and in the foreground one soldier walking away after the column, pack and spear, the boots and leggings grey
     with dust to the knee. No one turns to look at the far dust yet. */
  const f1 = TK.f1, h = (i, s) => hash(i, s), W = 1600, H = 900, HZ = 470, VX = 1180; // the horizon, and where the column meets it
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k9-wk{animation:k9-wk 2.4s ease-in-out infinite}.k9-dust{animation:k9-dust 14s ease-in-out infinite}.k9-me{animation:k9-me 1.2s ease-in-out infinite}.k9-far{animation:k9-far 20s ease-in-out infinite}
@keyframes k9-wk{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-.8px)}}@keyframes k9-dust{0%,100%{transform:translate(0,0)}50%{transform:translate(12px,-4px)}}@keyframes k9-me{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-2px)}}@keyframes k9-far{0%,100%{opacity:.75}50%{opacity:1}}
@media (prefers-reduced-motion:reduce){.k9-wk,.k9-dust,.k9-me,.k9-far{animation:none}}.reduce .k9-wk,.reduce .k9-dust,.reduce .k9-me,.reduce .k9-far{animation:none}</style>
<defs><linearGradient id="k9sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a5e"/><stop offset=".5" stop-color="#8a8a86"/><stop offset=".85" stop-color="#d0b890"/><stop offset="1" stop-color="#e8cc9c"/></linearGradient>
<linearGradient id="k9land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a87a"/><stop offset=".2" stop-color="#9a7c56"/><stop offset=".6" stop-color="#5a4430"/><stop offset="1" stop-color="#2a1e14"/></linearGradient>
<radialGradient id="k9sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff4dc" stop-opacity=".95"/><stop offset=".2" stop-color="#ffe0a8" stop-opacity=".5"/><stop offset="1" stop-color="#ffd090" stop-opacity="0"/></radialGradient>
<linearGradient id="k9body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a7254"/><stop offset=".35" stop-color="#4a3a2a"/><stop offset="1" stop-color="#1e1610"/></linearGradient>
<filter id="k9b20" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="20"/></filter><filter id="k9b6" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="6"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#k9sky)"/>`;
  /* the sun low in the west behind haze, and the high thin cloud drawn out across the whole sky */
  s += `<circle cx="300" cy="300" r="340" fill="url(#k9sun)"/><circle cx="300" cy="300" r="34" fill="#fff8e8" opacity=".85"/>`;
  s += `<g filter="url(#k9b6)">${[...Array(16)].map((_, i) => { const y = 60 + h(i, 901) * 300, x = h(i, 902) * W; return `<path d="M${f1(x - 200 - h(i, 903) * 200)} ${f1(y)} Q${f1(x)} ${f1(y - 10 - h(i, 904) * 14)} ${f1(x + 200 + h(i, 905) * 200)} ${f1(y + 6)}" stroke="#f4ead8" stroke-width="${f1(2 + h(i, 906) * 4)}" fill="none" opacity="${f1(.12 + h(i, 907) * .2)}"/>`; }).join('')}</g>`;
  /* the land, flat to the horizon; the far dust that is not theirs, low and long on the right */
  s += `<path d="M900 ${HZ} Q1100 ${HZ - 50} 1300 ${HZ - 40} Q1480 ${HZ - 60} ${W} ${HZ - 46} L${W} ${HZ} Z" fill="#7a5a40" opacity=".85" filter="url(#k9b20)" class="k9-far"/>`;
  s += `<rect y="${HZ}" width="${W}" height="${H - HZ}" fill="url(#k9land)"/><path d="M0 ${HZ} L${W} ${HZ}" stroke="#f0dcb8" stroke-width="1.6" opacity=".6"/>`;
  /* cracked ground in perspective, and scrub */
  let cr = ''; for (let i = 0; i < 120; i++) { const d = h(i, 911), y = HZ + 8 + d * d * (H - HZ), x = h(i, 912) * W, l = 6 + d * 60; cr += `M${f1(x)} ${f1(y)} l${f1(l * .5)} ${f1((h(i, 913) - .5) * l * .2)} l${f1(l * .5)} ${f1((h(i, 914) - .5) * l * .2)}`; }
  s += `<path d="${cr}" stroke="#3a2a1c" stroke-width="1.2" fill="none" opacity=".45"/>`;
  let sb = ''; for (let i = 0; i < 70; i++) { const d = h(i, 921), y = HZ + 6 + d * d * (H - HZ - 40), x = h(i, 922) * W, r = 1.4 + d * 14; let br = ''; for (let j = 0; j < 6; j++) br += `M${f1(x)} ${f1(y)} l${f1((j - 2.5) * r * .4)} ${f1(-r * (.6 + h(i * 7 + j, 923) * .6))}`; sb += br; }
  s += `<path d="${sb}" stroke="#3a2c1c" stroke-width="1.2" fill="none" opacity=".8"/>`;
  /* the column: out of the foreground on the left, away east to the horizon; files and wagons; its dust above it lit gold */
  const pt = t => [VX - (1 - t) * 760 - Math.sin(t * 3) * 40 * (1 - t), HZ + 2 + Math.pow(1 - t, 2.2) * 240];
  s += `<g class="k9-dust"><path d="${[...Array(31)].map((_, i) => { const [x, y] = pt(i / 30); return (i ? 'L' : 'M') + f1(x) + ' ' + f1(y - 30 * (1 - i / 30) - 6); }).join('')}" stroke="#f0d8a8" stroke-width="60" fill="none" opacity=".35" filter="url(#k9b20)"/></g>`;
  let col = ''; for (let i = 0; i < 170; i++) { const t = Math.pow(h(i, 931), .6), [x, y] = pt(t), k = .12 + Math.pow(1 - t, 2) * 1.1, off = (h(i, 932) - .5) * 30 * k;
    if (i % 19 === 4) col += `<g transform="translate(${f1(x + off)} ${f1(y)}) scale(${f1(k)})" fill="#2a1e14"><path d="M-14 -24 Q0 -36 14 -24 L14 -9 L-14 -9 Z" fill="#6a5a44"/><rect x="-15" y="-11" width="30" height="5"/><circle cx="-9" cy="-4" r="5"/><circle cx="9" cy="-4" r="5"/></g>`;
    else col += TK.walker(x + off, y, k, i, '#2a1e14', {spears:.4}); }
  s += `<g class="k9-wk">${col}</g>`;
  /* the one in front, walking away after them */
  s += `<ellipse cx="1250" cy="892" rx="170" ry="12" fill="#1e140c" opacity=".35"/>`;
  s += `<g class="k9-me"><g transform="translate(1250 890) scale(1.3)">${TK.back({fill:'url(#k9body)', dark:'#2a2018', rim:'#fff0d0', helmc:'#6a5a46', packc:'#4a3a28', roll:'#6a5236', ink:'#120c08', kit:'spear', head:'helm', cloak:'#3a2e22', walk:1, dust:'#a89878', shaft:'#4a3826'})}</g></g>`;
  s += `</svg>`;
  ART['title/dod'] = s; ART_SIZE['title/dod'] = [W, H];

  /* the patch (David, Nov 10: separate, as Book Seven's): the Third's (insignia/hoc) with a boot-print in dust under it; the Sixth
     Company's (insignia/mt) with a ration sack */
  const inner = (k, x) => (ART[k] || '').replace(/^<svg /, `<svg x="${x}" y="0" width="290" height="330" `);
   ART['insignia/dod'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" role="img" aria-label="The two squads' patches, Book Nine: the Third's with a boot-print in dust stitched under it, and the Sixth Company's with a ration sack">
${inner('insignia/hoc', 0)}${inner('insignia/mt', 310)}
<g transform="translate(145 352)"><ellipse cx="0" cy="6" rx="46" ry="7" fill="#8a7658" opacity=".55"/><path d="M-10 -14 Q-13 -4 -9 7 Q-5 15 1 15 Q7 15 8 7 Q10 -4 6 -14 Q1 -19 -10 -14 Z" fill="#5a4a34" stroke="#e0c890" stroke-width="1.8" stroke-dasharray="4 3"/><circle cx="-7" cy="-23" r="2.6" fill="#5a4a34" stroke="#e0c890" stroke-width="1.2"/><circle cx="-1" cy="-25" r="2.6" fill="#5a4a34" stroke="#e0c890" stroke-width="1.2"/><circle cx="5" cy="-24" r="2.4" fill="#5a4a34" stroke="#e0c890" stroke-width="1.2"/></g>
<g transform="translate(455 352)"><path d="M-16 -16 Q-20 6 -14 16 L14 16 Q20 6 16 -16 Q8 -22 0 -18 Q-8 -22 -16 -16 Z" fill="#b8a07a" stroke="#4a3a24" stroke-width="2"/><path d="M-8 -20 Q0 -26 8 -20" fill="none" stroke="#4a3a24" stroke-width="2.4"/><path d="M-10 2 L10 2" stroke="#4a3a24" stroke-width="1.6" stroke-dasharray="3 3"/></g></svg>`;}
/* Settings › Artwork off: the title's canvas backdrop borrows Book Four's desert until Book Nine has its own */
{ const _stb = startTitleBackdrop; startTitleBackdrop = function(cv, b){ return _stb(cv, b === 'dod' ? 'hoc' : b); }; }

/* ---------------- the busts (the bust rules: each its own neckline by kit, a short natural neck, the garment blending up into the
   shoulders, every prop held, slung or belted). Lantern low left, a rim of the soldier's own colour on the right. ---------------- */
/* Brask: thirty-five, a heavy, broad and square; a heavy's scale doubled at the shoulders; a helm with the cheek-guards bent back; the
   heavy sword's grip over the right shoulder, slung */
/* v13.62.8 (David, Nov 20, 2026, 10:23 PM PST: "redo Brask"): repainted to the first five books' standard. A big square head in a riveted round helm that sits on the brow,
   its cheek-guards hinged at the temples and bent out and back; a padded collar bound in leather; heavy scale, doubled at the shoulders in three lames;
   a baldric; the heavy sword held upright at the right shoulder in a gauntleted fist, where it used to stand behind him with no hand on it */
POR.brask = function(ctx){ const F = {cy:-74, w:14.6, h:20.2, jaw:.98, chin:6.4, skin:'#b08a6a', iris:'#3a3028', lip:'#8a5a46', browCol:'#3a2e24', browW:2.1, arch:.2, browL:.15, browR:.1, rim:'#8a8270', rimA:.2, nose:1.5, look:.05, smileL:-.1, smileR:-.2, mouthW:4.4, age:.45, bags:.45, open:.8, earS:1.08};
  const u = F.h/20; PR.neck(ctx, F, 11.6);
  const B = BP.body(ctx, F, {wide:52, trap:8, ny:F.cy + 15.8, cb:F.cy + 21, c1:'#7e786a', c2:'#22201c'});
  ctx.save(); B.path(); ctx.clip(); BP.scales(ctx, -58, 58, -64, 4, 5.8, '#7c7668', 91); // the heavy's scale
    PR.soft(ctx, -22, -36, 16, 8, '#fff0d8', .13); PR.soft(ctx, 26, -16, 22, 24, '#000000', .45);
    BP.sling(ctx, -30, -44, 26, 2, '#4a3420', 4.2); ell(ctx, -6, -24.6, 2.2, 2.2, PR.rad(ctx, -6.6, -25.2, .3, 2.4, [[0, '#e8dcc0'], [.5, '#8a7a52'], [1, '#2a2210']])); // the baldric and its buckle
    ctx.fillStyle = PR.lit(ctx, '#4a3622', '#120a04', -40, 40); ctx.fillRect(-58, -6.4, 116, 5); ctx.fillStyle = '#8a8474'; ctx.fillRect(-3, -6.8, 6, 5.8); ctx.restore(); // the belt
  BP.light(ctx, F, B);
  BP.spaulder(ctx, {wide:52, n:3, rise:5.6, c:['#aaa494', '#6e685a', '#24221c'], style:'scale', sw:3.6, trim:'rgba(26,22,16,.9)', rivet:'#d8d0bc'}); // the shoulders, doubled
  PR.stroke(ctx, '#3a2c1e', 3, B.top); PR.stroke(ctx, 'rgba(226,196,150,.3)', .5, () => { ctx.save(); ctx.translate(0, -.9); B.top(); ctx.restore(); }); // the padded collar under the scale, bound in leather
  F.under = (ctx, F) => { PR.dots(ctx, F, 200, 'rgba(46,32,22,.38)', .5, [5, 19.4, (x, y) => (Math.abs(x) < 4.6 && y > 10.4 && y < 14.2)]); // a heavy's stubble
    PR.stroke(ctx, 'rgba(232,196,176,.5)', .7, () => { ctx.moveTo(-F.w*.66, F.cy + 3*u); ctx.lineTo(-F.w*.4, F.cy + 7.4*u); }); PR.stroke(ctx, 'rgba(70,30,20,.35)', .4, () => { ctx.moveTo(-F.w*.66 + .5, F.cy + 3*u); ctx.lineTo(-F.w*.4 + .5, F.cy + 7.4*u); }); // an old cut along the cheek
    PR.soft(ctx, 0, F.cy - 6*u, F.w*.9, 3, '#120806', .32); }; // the helm's shadow on the brow
  PR.face(ctx, F);
  PR.strands(ctx, 22, ['#3a2e24', '#1a120c', '#5a4a3a'], .65, 191, (i, r) => { const sd = i % 2 ? 1 : -1, x = sd*(F.w - 1.4 + r()*1.4), y = F.cy - 7.6; return [x, y, x + sd*.5, y + 3, x + sd*(.3 + r()), y + 5.4 + r()*3]; }); // cropped hair at the temples
  /* the cheek-guards first (they hang behind the rim), hinged at the temples and bent out and back so he can hear */
  { const yr = F.cy - 6.8*u; [-1, 1].forEach(sd => { const X = sd*(F.w + 1.2), pl = () => { ctx.beginPath(); ctx.moveTo(X, yr - .4); ctx.lineTo(X + sd*5.6, yr + .8); ctx.quadraticCurveTo(X + sd*7.6, yr + 5.4, X + sd*5.8, yr + 10.6); ctx.quadraticCurveTo(X + sd*4, yr + 12.6, X + sd*2.6, yr + 10.4); ctx.quadraticCurveTo(X + sd*1.8, yr + 5, X, yr + 3.4); ctx.closePath(); };
      ctx.save(); ctx.translate(sd*.6, 1); pl(); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fill(); ctx.restore();
      pl(); ctx.fillStyle = sd < 0 ? PR.lin(ctx, X - 8, yr, X, yr + 10, [[0, '#c4c0b4'], [.5, '#86827a'], [1, '#3e3c36']]) : PR.lin(ctx, X, 0, X + 8, 0, [[0, '#3a3832'], [1, '#0e0d0b']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.65)'; ctx.lineWidth = .55; pl(); ctx.stroke();
      PR.stroke(ctx, sd < 0 ? 'rgba(255,244,222,.45)' : 'rgba(255,244,222,.1)', .5, () => { ctx.moveTo(X + sd*5.2, yr + 1.4); ctx.quadraticCurveTo(X + sd*6.8, yr + 5.4, X + sd*5.4, yr + 9.8); }); // the plate's turned edge
      ell(ctx, X + sd*1.3, yr + 1.5, .75, .75, sd < 0 ? '#e8e0cc' : '#4a4640'); ell(ctx, X + sd*3.6, yr + 2, .6, .6, sd < 0 ? '#d8d0bc' : '#3a3630'); }); } // the hinge pins
  B4P.helm(ctx, F, {c:['#c4c0b4', '#827e74', '#2a2824'], b:['#9a927e', '#463e30'], r:2.6, y:6.8, h:15.8, n:11, ridge:1});
  /* the heavy infantry sword, held upright at the right shoulder like a carter's pole */
  ctx.save(); ctx.translate(35, -4); ctx.rotate(.06);
    ctx.save(); ctx.filter = 'blur(1.4px)'; ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(-1.4, -112, 6.6, 104); ctx.restore(); // its shadow on the shoulder
    ctx.beginPath(); ctx.moveTo(-3, -9); ctx.lineTo(-2.7, -116); ctx.lineTo(2.7, -116); ctx.lineTo(3, -9); ctx.closePath(); ctx.fillStyle = PR.lin(ctx, -3, 0, 3, 0, [[0, '#e4e2da'], [.42, '#a4a29a'], [.5, '#5e5c56'], [.6, '#8c8a82'], [1, '#34322e']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = .5; ctx.stroke(); // the blade, fullered
    PR.stroke(ctx, 'rgba(30,26,20,.4)', .5, () => { for (let i = 0; i < 5; i++){ const y = -22 - i*17; ctx.moveTo(-2.9, y); ctx.lineTo(-1.8, y + 1.4); } }); // nicks in the edge
    ctx.fillStyle = PR.lin(ctx, 0, -11, 0, -7.4, [[0, '#a8a08c'], [.5, '#6a6252'], [1, '#2a261e']]); ctx.beginPath(); ctx.roundRect(-8.4, -11, 16.8, 3.6, 1.2); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = .5; ctx.stroke(); // the guard
    ctx.fillStyle = PR.lin(ctx, -2, 0, 2, 0, [[0, '#6a4e32'], [.5, '#3e2c1a'], [1, '#140c06']]); ctx.fillRect(-2, -7.4, 4, 14); PR.stroke(ctx, 'rgba(0,0,0,.45)', .4, () => { for (let y = -6.4; y < 6; y += 1.5){ ctx.moveTo(-2, y); ctx.lineTo(2, y + .8); } }); // the grip, bound in cord
    BP.fist(ctx, 0, -1.4, 0, {k:'gaunt', c:['#b6b2a6', '#6e6a60', '#22201c']}, 17); ctx.restore();
  return F; };
/* v13.62.9 (David, Nov 20, 2026, 11:18 PM PST: "Yes" to repainting the rest of the later recruits to the first five books' standard, a book's recruits at a time; Book Nine's other three here).
   Each has a neck in an open throat, their own neckline by kit, a body drawn at its own width (no BODY_FILL), and a hand on what they carry. */
/* Tegra: twenty-nine, a Barghast woman; white paint in two bars under the eyes; dark hair in a long plait over the left shoulder; painted hide, fur at the shoulders,
   over a quilted shirt; a string of small bones at the throat; a throwing-axe held up at the right shoulder */
POR.tegra = function(ctx){ const F = {cy:-74, w:12.2, h:19.8, jaw:.84, chin:4.8, skin:'#a07a5a', iris:'#2a2018', lip:'#7a4a3a', browCol:'#1a120c', browW:1.6, arch:.5, browL:.3, browR:.2, rim:'#c8b48a', rimA:.22, nose:1.2, look:-.2, open:.86, smileL:.1, smileR:0, mouthW:3.6, bags:.25, age:.15};
  const u = F.h/20; PR.neck(ctx, F, 8.2); BP.throat(ctx, F, -44.4);
  const B = BP.body(ctx, F, {wide:37, drop:3, trap:2.5, v:true, nx:10.8, ny:F.cy + 16.2, cb:-42.4, c1:'#927a54', c2:'#1e160c'});
  ctx.save(); B.path(); ctx.clip();
    for (let i = 0; i < 26; i++){ const r = PR.rng(i + 951); PR.soft(ctx, -36 + r()*72, -44 + r()*46, 3 + r()*6, 2 + r()*4, i % 2 ? '#3a2a16' : '#c8ac78', .1, r()*3); } // the hide's own mottle
    PR.stitch(ctx, 'rgba(40,26,12,.6)', .5, () => { ctx.moveTo(-34, -30); ctx.quadraticCurveTo(0, -22, 34, -30); }); // the yoke seam
    for (let x = -32; x <= 32; x += 2.6){ const y = -30 + (1 - x*x/1156)*8, r = PR.rng(x*7 + 500); PR.stroke(ctx, x < 6 ? 'rgba(196,166,116,.75)' : 'rgba(60,44,24,.8)', .7, () => { ctx.moveTo(x, y); ctx.lineTo(x + (r() - .5)*1.6, y + 4 + r()*3.4); }); } // the fringe under it
    [[-22, -37, .32, '#b84a30'], [-22, -34, .32, '#e8e0c8'], [14, -38, -.28, '#e8e0c8'], [15, -35, -.28, '#b84a30'], [-12, -12, 0, '#b84a30'], [-12, -9, 0, '#e8e0c8'], [-12, -6, 0, '#b84a30']].forEach(([x, y, a, c]) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = rgba(c, x > 6 ? .4 : .78); ctx.beginPath(); ctx.roundRect(-5.4, -.85, 10.8, 1.7, .8); ctx.fill(); ctx.restore(); }); // the clan's paint: ochre and white bars
    PR.soft(ctx, -20, -38, 14, 7, '#fff0d8', .12); PR.soft(ctx, 24, -16, 18, 22, '#000000', .45); ctx.restore();
  BP.shirt(ctx, B, '#b4a482', '#3a3020', -45.6); BP.light(ctx, F, B, true);
  [-1, 1].forEach(sd => PR.strands(ctx, 46, sd < 0 ? ['#6a543a', '#3a2c1c', '#8a7252'] : ['#241a10', '#120c06'], .6, 961 + sd, (k, r) => { const t = r(), x = sd*lerp(14, 31, t), y = -47.6 + t*t*6.4 + t*3; return [x, y + 1.6, x + sd*(r() - .3)*1.6, y - 1.4, x + sd*(r() - .2)*2.6, y - 3.4 - r()*2.2]; })); // wolf fur along the shoulders
  PR.stroke(ctx, '#2a1c10', .5, () => { ctx.moveTo(-B.nx - 1, B.ny + 5); ctx.quadraticCurveTo(0, -31, B.nx + 1, B.ny + 5); });
  for (let i = 0; i < 9; i++){ const t = (i + .5)/9, x = lerp(-B.nx - .4, B.nx + .4, t), y = B.ny + 5 + Math.sin(t*Math.PI)*10.4; ctx.save(); ctx.translate(x, y + .8); ctx.rotate((t - .5)*-.9); ell(ctx, .3, .4, .95, 2.3, 'rgba(0,0,0,.4)'); ell(ctx, 0, 0, .9, 2.2, x > 4 ? '#8a8068' : '#ece2c8'); ell(ctx, -.25, -.6, .3, 1, 'rgba(255,255,255,.4)'); ctx.restore(); } // the small bones on their cord
  F.under = (ctx, F) => { const u = F.h/20; [-1, 1].forEach(sd => { ctx.fillStyle = sd < 0 ? 'rgba(244,240,226,.9)' : 'rgba(200,196,184,.7)'; [1.5, 3.1].forEach(k => { ctx.beginPath(); ctx.roundRect(sd*F.w*.42 - 2.4, F.cy + k*u, 4.8, 1.05, .5); ctx.fill(); }); }); };
  PR.face(ctx, F);
  BP.hair(ctx, F, {c:['#2e2218', '#140e0a', '#040302'], v:2, wx:1.1, hl:11.4, ey:-1.4, n:74, sw:.45, seed:917, sh:'#c8b48a', shA:.2, wisp:5});
  /* the plait, from behind the ear down over the near shoulder: crossed lobes, a bone ring near its end */
  { const P = t => [lerp(lerp(-F.w - .6, -F.w - 4.2, t), lerp(-F.w - 4.2, -F.w + 1.6, t), t), lerp(F.cy + 7*u, F.cy + 38*u, t)];
    for (let i = 0; i <= 13; i++){ const t = i/13, [x, y] = P(t), w = 2.7 - t*.7; ctx.save(); ctx.translate(x, y); ctx.rotate(i % 2 ? .62 : -.62); ell(ctx, .3, .5, w, w*.62, 'rgba(0,0,0,.45)'); ell(ctx, 0, 0, w, w*.62, PR.lin(ctx, -w, 0, w, 0, [[0, '#4a3828'], [.5, '#20160e'], [1, '#080604']])); PR.stroke(ctx, 'rgba(200,180,138,.3)', .3, () => { ctx.moveTo(-w*.6, -.2); ctx.lineTo(w*.4, -.4); }); ctx.restore(); }
    const [bx, by] = P(.86); ctx.fillStyle = PR.lin(ctx, bx - 2.6, 0, bx + 2.6, 0, [[0, '#f0e6cc'], [1, '#8a8068']]); ctx.beginPath(); ctx.roundRect(bx - 2.5, by - 1, 5, 2, 1); ctx.fill(); }
  /* the throwing-axe, held up at the right shoulder */
  BP.grip(ctx, 26, -6, .07, -2, 2.6, ['#8a6a44', '#5a4026', '#1a1008'], {k:'wrap', c:['#b8a888', '#7a6c52', '#2a2418']}, null, 0, -60);
  ctx.save(); ctx.translate(26, -6); ctx.rotate(.07); ctx.beginPath(); ctx.moveTo(-1.6, -62); ctx.lineTo(1.8, -62.4); ctx.quadraticCurveTo(7, -64.6, 11.4, -66.4); ctx.quadraticCurveTo(13.4, -59, 11, -51.6); ctx.quadraticCurveTo(6, -54.6, 1.8, -55.4); ctx.lineTo(-1.6, -55.6); ctx.closePath();
    ctx.fillStyle = PR.lin(ctx, -2, -62, 12, -52, [[0, '#8e8c86'], [.5, '#55534e'], [1, '#1c1b19']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.65)'; ctx.lineWidth = .5; ctx.stroke(); PR.stroke(ctx, 'rgba(236,232,220,.55)', .6, () => { ctx.moveTo(11.2, -65.6); ctx.quadraticCurveTo(12.9, -59, 10.8, -52.4); }); // the head and its edge
    PR.stroke(ctx, '#d8ccb0', .7, () => { for (let k = 0; k < 3; k++){ ctx.moveTo(-1.5, -56.4 + k*1.6); ctx.lineTo(1.7, -57 + k*1.6); } }); ctx.restore(); // sinew binding under the head
  return F; };
/* Brennet: thirty-one, a carter; sun-browned, a padded cap; a studded leather apron over a linen shirt open at the throat, a sweat-rag knotted loose; the iron wagon-pin held at the left shoulder */
POR.brennet = function(ctx){ const F = {cy:-75, w:13, h:20, jaw:.88, chin:5.2, skin:'#c09a78', iris:'#3a2a1a', lip:'#8a5444', browCol:'#3a2a1a', browW:1.8, arch:.4, browL:.2, browR:.2, rim:'#9a7a5a', rimA:.22, nose:1.3, look:.2, smileL:.3, smileR:.2, mouthW:4, age:.25, bags:.25, open:.86};
  PR.neck(ctx, F, 9.2); BP.throat(ctx, F, -45.4, 10);
  const B = BP.body(ctx, F, {wide:42, drop:3, trap:4.5, v:true, nx:11.2, ny:F.cy + 16, cb:-41.6, c1:'#b4a484', c2:'#2a241a'}); // the linen shirt, open at the throat
  ctx.save(); B.path(); ctx.clip();
    PR.stroke(ctx, 'rgba(60,48,30,.3)', .6, () => { [-34, -29, 30, 35].forEach(x => { ctx.moveTo(x, -42); ctx.quadraticCurveTo(x + 2, -24, x - 1, 2); }); }); // the sleeves' folds
    const ap = () => { ctx.beginPath(); ctx.moveTo(-14, -37); ctx.lineTo(14, -37); ctx.quadraticCurveTo(16, -29, 24.6, -24); ctx.lineTo(28, 6); ctx.lineTo(-28, 6); ctx.lineTo(-24.6, -24); ctx.quadraticCurveTo(-16, -29, -14, -37); ctx.closePath(); };
    ctx.save(); ctx.translate(.8, 1.4); ap(); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fill(); ctx.restore();
    ap(); ctx.fillStyle = PR.lit(ctx, '#7a5a3a', '#1e140a', -28, 26); ctx.fill(); ctx.save(); ap(); ctx.clip(); const r = PR.rng(977);
      for (let i = 0; i < 9; i++) PR.soft(ctx, -22 + r()*44, -32 + r()*36, 2 + r()*5, 1.4 + r()*3, i % 2 ? '#1a0e06' : '#c8a070', i % 2 ? .35 : .12, r()*3); // axle grease, and wear
      PR.soft(ctx, -14, -28, 11, 12, '#ffe8c8', .13); ctx.restore(); ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = .6; ap(); ctx.stroke();
    PR.stitch(ctx, 'rgba(230,196,140,.45)', .35, () => { ctx.moveTo(-13, -35.6); ctx.lineTo(13, -35.6); });
    [[-11, -33], [0, -33], [11, -33], [-20, -22], [20, -22], [-22, -10], [22, -10], [-23.6, 1], [23.6, 1], [-8, -18], [8, -18], [0, -6]].forEach(([x, y]) => { ell(ctx, x + .3, y + .4, 1.25, 1.25, 'rgba(0,0,0,.5)'); ell(ctx, x, y, 1.15, 1.15, PR.rad(ctx, x - .4, y - .4, .15, 1.4, x > 12 ? [[0, '#5a5852'], [1, '#141312']] : [[0, '#eeeae0'], [.5, '#8e8c86'], [1, '#2e2d2a']])); }); // the iron studs
    PR.soft(ctx, 28, -16, 20, 24, '#000000', .45); ctx.restore();
  PR.stroke(ctx, PR.lit(ctx, '#5a3e24', '#140c06', -20, 20), 2.6, () => { ctx.moveTo(-13.4, -37); ctx.quadraticCurveTo(-14.6, -46, -B.nx - 1.4, B.ny + 5); ctx.moveTo(13.4, -37); ctx.quadraticCurveTo(14.6, -46, B.nx + 1.4, B.ny + 5); }); // the apron's neck strap, over the shirt
  BP.light(ctx, F, B, true);
  /* the sweat-rag, knotted loose at the collar */
  { BP.band(ctx, B, -1.2, 3.2); ctx.fillStyle = PR.lit(ctx, '#a8503a', '#2a100a', -B.nx - 4, B.nx + 4); ctx.fill(); ctx.save(); BP.band(ctx, B, -1.2, 3.2); ctx.clip(); PR.stroke(ctx, 'rgba(40,12,8,.5)', .5, () => { for (let k = -5; k <= 5; k++){ const [x, y] = B.pt(k/5.4, -1); ctx.moveTo(x, y); ctx.lineTo(x + (k < 0 ? 1 : -1)*1.2, y + 4.6); } }); PR.soft(ctx, B.nx*.7, B.ny + 6, 5, 6, '#000000', .4); ctx.restore();
    const [kx, ky] = B.pt(0, 1.2); ell(ctx, kx, ky, 2.4, 2, PR.rad(ctx, kx - .8, ky - .8, .3, 2.8, [[0, '#c8684e'], [.6, '#7a3222'], [1, '#2a100a']])); ctx.fillStyle = PR.lit(ctx, '#a8503a', '#3a1810', -3, 4);
    PR.path(ctx, [[kx - 1.4, ky + 1], [kx - 4.4, ky + 7], [kx - 1.8, ky + 7.4], [kx - .2, ky + 1.8]]); ctx.fill(); PR.path(ctx, [[kx + .4, ky + 1.6], [kx + 1.6, ky + 6.4], [kx + 3.8, ky + 5.6], [kx + 1.6, ky + .8]]); ctx.fill(); }
  F.under = (ctx, F) => { const u = F.h/20; PR.dots(ctx, F, 150, 'rgba(46,28,16,.34)', .45, [6, 19.2, (x, y) => (Math.abs(x) < 4.4 && y > 10.4 && y < 14)]); PR.soft(ctx, -5, F.cy + 4*u, 4, 2.6, '#c05a3a', .14); PR.soft(ctx, 5, F.cy + 4*u, 4, 2.6, '#c05a3a', .1); PR.soft(ctx, 0, F.cy + 1*u, 2.4, 3, '#c05a3a', .14); }; // stubble; the sun on nose and cheeks
  PR.face(ctx, F);
  const u = F.h/20, top = F.cy - 21*u;
  /* v13.62.7: the padded cap sat on a bare skull like a lid. It is pulled down to the brow with a rolled edge, and cropped hair shows under it at the temples */
  { const cyy = F.cy - 9.4*u; [-1, 1].forEach(sd => { ctx.fillStyle = sd < 0 ? '#3a2a1a' : '#140c06'; PR.path(ctx, [[sd*(F.w - 2.2), cyy], [sd*(F.w + .5), cyy], [sd*(F.w + .3), cyy + 7.4], [sd*(F.w - .9), cyy + 5.6]]); ctx.fill(); }); // cropped hair at the temples
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, cyy, F.w + 1.8, 14*u, 0, Math.PI, 0); ctx.closePath(); ctx.fillStyle = PR.lit(ctx, '#6a5a44', '#241c12', -F.w - 1, F.w + 1); ctx.fill(); ctx.clip();
      PR.stroke(ctx, 'rgba(20,12,6,.5)', .7, () => { for (let i = -3; i <= 3; i++) { ctx.moveTo(i * 2.2, cyy - 14*u); ctx.quadraticCurveTo(i * 4.2, cyy - 9*u, i * 4.9, cyy); } }); PR.soft(ctx, -F.w*.4, cyy - 9*u, 6, 3, '#ffe6c0', .14); ctx.restore(); // the quilted seams
    ctx.fillStyle = PR.lit(ctx, '#7a684e', '#1e160e', -F.w - 2, F.w + 2); ctx.beginPath(); ctx.roundRect(-F.w - 2.2, cyy - 1.4, (F.w + 2.2)*2, 2.8, 1.4); ctx.fill(); PR.soft(ctx, 0, cyy + 2.6, F.w, 1.8, '#000000', .3); } // the rolled edge and its shadow
  /* the wagon-pin: a yard of iron with a ring forged at its head, held at the left shoulder */
  BP.grip(ctx, -34, -6, -.05, -2, 3.2, ['#9a9890', '#5c5a54', '#1c1b19'], {k:'glove', c:['#9a7248', '#5e4226', '#1e140a']}, null, 0, -84);
  ctx.save(); ctx.translate(-34, -6); ctx.rotate(-.05); ctx.strokeStyle = PR.lin(ctx, -5, 0, 5, 0, [[0, '#a8a69e'], [.5, '#62605a'], [1, '#1c1b19']]); ctx.lineWidth = 2.6; ctx.beginPath(); ctx.ellipse(0, -88.6, 3.6, 4.6, 0, 0, 7); ctx.stroke(); PR.stroke(ctx, 'rgba(255,250,236,.4)', .5, () => { ctx.ellipse(0, -88.6, 4.6, 5.6, 0, 3.4, 4.9); });
    PR.stroke(ctx, 'rgba(120,60,30,.35)', .6, () => { for (let k = 0; k < 5; k++){ ctx.moveTo(-1.5, -30 - k*11); ctx.lineTo(1.3, -31 - k*11); } }); ctx.restore(); // rust in the hammer-marks
  return F; };
/* Kaedra: twenty-six, half Bolkando; a dun scout's coat, its hood down in folds round the shoulders, dry grass sewn at them; a blue bead on a
   thong at the throat; arrows over the right shoulder; the horn bow held upright at the left */
POR.kaedra = function(ctx){ const F = {cy:-74, w:11.6, h:19.6, jaw:.74, chin:4.3, skin:'#b8946e', iris:'#2a3020', lip:'#8a5a46', browCol:'#2a1e14', browW:1.35, arch:.6, browL:.25, browR:.35, rim:'#8a9a6a', rimA:.24, nose:1, look:.3, open:.88, smileL:0, smileR:.12, mouthW:3.3, bags:.2, age:.05};
  const u = F.h/20;
  for (let i = 0; i < 4; i++){ const x = 21 + i*2.7, y = -63 - (i % 2)*3.4; PR.stroke(ctx, '#6a5234', .9, () => { ctx.moveTo(x - 3, -40); ctx.lineTo(x, y); }); ctx.save(); ctx.translate(x, y); ctx.rotate(.09); ctx.fillStyle = i % 2 ? '#5a6248' : '#a8a48a'; PR.path(ctx, [[0, 0], [1.9, 2.4], [1.7, 8.6], [0, 7.2], [-1.7, 8.6], [-1.9, 2.4]]); ctx.fill(); PR.stroke(ctx, 'rgba(0,0,0,.4)', .3, () => { ctx.moveTo(0, 0); ctx.lineTo(0, 7.2); }); ctx.restore(); } // the fletchings, behind the shoulder
  ell(ctx, 0, -51.4, 19, 7.4, PR.lin(ctx, -19, 0, 19, 0, [[0, '#6a6446'], [.5, '#3e3a28'], [1, '#12110a']])); // the hood, lying back between the shoulders
  PR.neck(ctx, F, 7.8); BP.throat(ctx, F, -45.4);
  const B = BP.body(ctx, F, {wide:35, drop:3, trap:1.5, v:true, nx:10.4, ny:F.cy + 16.2, cb:-43, c1:'#747050', c2:'#1a1810'});
  ctx.save(); B.path(); ctx.clip();
    for (let i = 0; i < 22; i++){ const r = PR.rng(i + 931); PR.soft(ctx, -34 + r()*68, -44 + r()*46, 3 + r()*6, 2 + r()*5, i % 2 ? '#3a3820' : '#a8a070', .09, r()*3); } // dust worked into the dun
    PR.stroke(ctx, 'rgba(30,28,16,.45)', .6, () => { ctx.moveTo(-1, -43); ctx.lineTo(0, 4); }); PR.stitch(ctx, 'rgba(200,190,140,.3)', .35, () => { ctx.moveTo(-2.4, -40); ctx.lineTo(-1.6, 4); }); // the front seam
    [-34, -22, -10].forEach((y, k) => { ell(ctx, -1 + k*.3, y, 1.3, 1.1, PR.rad(ctx, -1.4, y - .4, .2, 1.6, [[0, '#d8c8a0'], [.6, '#7a6a44'], [1, '#2a2414']])); PR.stroke(ctx, '#2a2414', .4, () => { ctx.moveTo(-3, y); ctx.lineTo(1.4, y); }); }); // horn toggles
    BP.sling(ctx, 30, -46, -24, 0, '#4a3a22', 3); PR.soft(ctx, -18, -38, 13, 7, '#fff0d8', .11); PR.soft(ctx, 23, -16, 17, 22, '#000000', .45); ctx.restore();
  BP.shirt(ctx, B, '#a89c7c', '#322c1e', -46.4); BP.light(ctx, F, B, true);
  /* the hood's folds round the neck: two soft rolls lying on the coat's neckline */
  [[5.6, 1.6, '#868058'], [2.6, -1.6, '#726c4a']].forEach(([o1, o0, c]) => { BP.band(ctx, B, o0, o1); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 2.4; ctx.shadowOffsetY = 1; ctx.fillStyle = PR.lit(ctx, c, '#1c1a10', -B.nx - 5, B.nx + 5); ctx.fill(); ctx.restore(); ctx.save(); BP.band(ctx, B, o0, o1); ctx.clip(); PR.stroke(ctx, 'rgba(26,24,12,.45)', .5, () => { for (let k = -6; k <= 6; k++){ const [x, y] = B.pt(k/6.4, o0); ctx.moveTo(x, y); ctx.lineTo(x + (k < 0 ? 1.4 : -1.4), y + 4.4); } }); PR.soft(ctx, B.nx*.8, B.ny + 7, 5, 7, '#000000', .4); ctx.restore(); });
  [-1, 1].forEach(sd => PR.strands(ctx, 30, sd < 0 ? ['#d8c888', '#a89858', '#e8dca8'] : ['#5a5230', '#3a341e'], .55, 941 + sd, (k, r) => { const t = r(), x = sd*lerp(15, 30, t), y = -47 + t*t*6.4 + t*3; return [x, y + 2, x + sd*(r() - .4)*2, y - 2.4, x + sd*(r() - .3)*4.4, y - 5.6 - r()*4.4]; })); // dry grass sewn at the shoulders
  { const [bx, by] = B.pt(0, 8.6); PR.stroke(ctx, '#2a2018', .55, () => { ctx.moveTo(-5.4, by - 6.4); ctx.quadraticCurveTo(0, by + 1.6, 5.4, by - 6.4); }); ell(ctx, bx + .3, by + .4, 1.9, 1.9, 'rgba(0,0,0,.45)'); ell(ctx, bx, by, 1.8, 1.8, PR.rad(ctx, bx - .6, by - .6, .2, 2.2, [[0, '#cfe2f8'], [.4, '#3e72c0'], [1, '#10244a']])); } // the blue bead
  F.under = (ctx, F) => { const u = F.h/20; PR.dots(ctx, F, 26, 'rgba(90,56,34,.3)', .4, [1, 7, (x) => Math.abs(x) > F.w*.7]); PR.stroke(ctx, 'rgba(236,206,180,.45)', .5, () => { ctx.moveTo(F.w*.3, F.cy - 6.6*u); ctx.lineTo(F.w*.52, F.cy - 4.4*u); }); }; // freckles across the nose; a nick through the far brow
  PR.face(ctx, F);
  BP.hair(ctx, F, {c:['#30241a', '#16100a', '#060403'], v:1.8, wx:1, hl:11.2, ey:-1.2, n:68, sw:.42, seed:933, sh:'#a8b090', shA:.18, wisp:6});
  PR.strands(ctx, 5, ['#30241a', '#16100a'], .5, 937, (k, r) => { const x = -F.w - .2 - r()*.8, y = F.cy - 3*u; return [x, y, x - 1.2 - r(), y + 6*u, x + .6 - r()*1.4, y + 12*u + r()*3]; }); // a lock come loose by the near ear
  /* the horn bow, held upright at the left: the grip in her fist, the upper limb recurving past her head, the string behind it */
  ctx.save(); ctx.translate(-33, -4); ctx.rotate(-.04);
    PR.stroke(ctx, 'rgba(240,230,200,.5)', .45, () => { ctx.moveTo(4.6, -92); ctx.lineTo(3.4, 8); });
    const limb = w => { ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(0, -8); ctx.bezierCurveTo(-1, -34, -9.6, -58, -4.4, -80); ctx.quadraticCurveTo(-1.6, -89, 5, -92.4); ctx.stroke(); };
    ctx.lineCap = 'round'; ctx.save(); ctx.filter = 'blur(1.2px)'; ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.translate(1.4, .8); limb(4); ctx.restore();
    ctx.strokeStyle = '#120c06'; limb(3.6); ctx.strokeStyle = PR.lin(ctx, -10, 0, 5, 0, [[0, '#c8a86a'], [.5, '#7a5a30'], [1, '#2a1c0c']]); limb(2.6); PR.stroke(ctx, 'rgba(255,240,206,.4)', .45, () => { ctx.moveTo(-.9, -10); ctx.bezierCurveTo(-1.9, -34, -10.4, -58, -5.3, -79.6); });
    PR.stroke(ctx, '#d8ccb0', .8, () => { [-22, -44, -66].forEach(y => { const x = y === -22 ? -1.2 : y === -44 ? -5.2 : -7; ctx.moveTo(x - 1.8, y + .5); ctx.lineTo(x + 1.8, y - .5); }); }); // sinew wraps on the limb
    BP.fist(ctx, 0, -1, 0, {k:'bracer', c:['#9a7c50', '#5e4628', '#1e160a']}, 17); ctx.restore();
  return F; };

