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
POR.brask = function(ctx){ const F = {cy:-74, w:13.6, h:20, jaw:.94, chin:5.6, skin:'#b08a6a', iris:'#3a3028', lip:'#8a5a46', browCol:'#3a2e24', browW:2, arch:.2, browL:.15, browR:.1, rim:'#8a8270', rimA:.22, nose:1.5, look:.05, smileL:-.1, smileR:-.2, mouthW:4.2, age:.4, bags:.4, open:.8};
  PR.stroke(ctx, '#14100c', 5, () => { ctx.moveTo(20, -36); ctx.lineTo(28, -100); }); PR.stroke(ctx, '#4a3a2a', 3.4, () => { ctx.moveTo(20, -36); ctx.lineTo(28, -100); }); // the sword's grip
  ctx.save(); ctx.translate(28.6, -102); ctx.rotate(.12); ctx.fillStyle = '#6a6458'; ctx.fillRect(-6, -1.6, 12, 3.2); ell(ctx, 0, -5, 2.4, 2.4, '#5a544a'); ctx.restore();
  PR.neck(ctx, F, 10);
  const B = BP.body(ctx, F, {wide:44, drop:2, trap:7, nx:12, ny:F.cy + 15.2, cb:F.cy + 20.8, c1:'#7e786a', c2:'#22201c'});
  ctx.save(); B.path(); ctx.clip(); BP.scales(ctx, -48, 48, -60, 4, 5.6, '#787264', 91); PR.soft(ctx, 22, -16, 18, 20, '#000000', .45); PR.soft(ctx, -20, -34, 12, 7, '#ffe0c0', .08); ctx.restore();
  BP.light(ctx, F, B, false);
  BP.collar(ctx, F, '#6a6458', '#1e1c18', 'rgba(0,0,0,.45)', {style:'wrap', sw:26, sy:-44});
  BP.sling(ctx, 22, -34, -20, -2, '#3a2a1c', 3.2);
  F.under = (ctx, F) => { PR.dots(ctx, F, 70, 'rgba(60,44,30,.28)', .4, [5, 20]); };
  PR.face(ctx, F);
  // the helm, cheek-guards bent back
  const u = F.h/20, top = F.cy - 21*u;
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, top + 8*u, F.w + 2.4, 10.6*u, 0, Math.PI, 0); ctx.closePath(); ctx.fillStyle = PR.lit(ctx, '#8a8476', '#1e1c18', -F.w, F.w); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#4a463e'; ctx.fillRect(-F.w - 2.4, top + 7*u, (F.w + 2.4) * 2, 2.4);
  [-1, 1].forEach(sd => { ctx.save(); ctx.translate(sd * (F.w + 1.2), top + 9*u); ctx.rotate(sd * .5); ctx.fillStyle = sd < 0 ? '#7a7466' : '#2a2822'; ctx.fillRect(-2, 0, 4, 9); ctx.restore(); });
  PR.stroke(ctx, 'rgba(255,240,215,.35)', .8, () => { ctx.moveTo(-F.w, top + 6*u); ctx.quadraticCurveTo(-F.w*.4, top - 1.5*u, 0, top - 2*u); });
  return F; };
/* Tegra: twenty-nine, a Barghast woman; white paint in two bars under the eyes; dark hair in a long braid over the left shoulder; painted
   hide over a quilted shirt; a string of small bones at the throat; a throwing-axe's haft in the belt, its head up by the right shoulder */
POR.tegra = function(ctx){ const F = {cy:-74, w:11.8, h:19.6, jaw:.8, chin:4.4, skin:'#a07a5a', iris:'#2a2018', lip:'#7a4a3a', browCol:'#1a120c', browW:1.5, arch:.5, browL:.3, browR:.2, rim:'#c8b48a', rimA:.22, nose:1.2, look:-.2, open:.86, smileL:.1, smileR:0, mouthW:3.4, bags:.2, age:.1};
  PR.stroke(ctx, '#2a1a0e', 3, () => { ctx.moveTo(26, -10); ctx.lineTo(22, -64); }); ctx.save(); ctx.translate(21.6, -66); ctx.rotate(-.1); ctx.fillStyle = '#6a6a6a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(8, -4); ctx.lineTo(8, 6); ctx.closePath(); ctx.fill(); ctx.restore(); // the axe
  PR.neck(ctx, F, 7.6);
  const B = BP.body(ctx, F, {wide:33, drop:3, nx:F.w*.66 + 2.4, ny:F.cy + 14, cb:-45, c1:'#8a7454', c2:'#1e160c'}); ctx.save(); B.path(); ctx.clip();
    [[-20, -30], [-6, -20], [10, -32], [18, -14]].forEach(([x, y], i) => { PR.stroke(ctx, i % 2 ? 'rgba(200,80,50,.5)' : 'rgba(230,220,190,.45)', 2, () => { ctx.moveTo(x - 6, y); ctx.lineTo(x + 6, y - 4); }); }); // the painted hide
    PR.soft(ctx, 20, -16, 14, 12, '#000000', .4); PR.soft(ctx, -18, -34, 10, 6, '#ffe8c8', .1); ctx.restore(); BP.light(ctx, F, B, false);
  for (let i = 0; i < 9; i++) { const a = Math.PI*(.18 + i*.08), x = Math.cos(a)*-14, y = -44 + Math.sin(a)*4; ell(ctx, x*.9, y + 2, 1.1, 2, '#e8dcc0'); } // the small bones
  F.under = (ctx, F) => { const u = F.h/20; [-1, 1].forEach(sd => { ctx.fillStyle = 'rgba(240,236,220,.85)'; ctx.fillRect(sd*F.w*.42 - 2.2, F.cy + 1.4*u, 4.4, 1); ctx.fillRect(sd*F.w*.42 - 2.2, F.cy + 3*u, 4.4, 1); }); };
  PR.face(ctx, F);
  BP.hair(ctx, F, {c:['#2a1e14', '#120c08', '#040302'], v:1.5, wx:.9, hl:12.6, ey:-2.4, n:70, sw:.45, seed:917, sh:'#c8b48a', shA:.18});
  const u = F.h/20; PR.stroke(ctx, '#140e08', 3.4, () => { ctx.moveTo(-F.w*.8, F.cy + 4*u); ctx.quadraticCurveTo(-F.w - 2, F.cy + 16*u, -F.w*.6, F.cy + 30*u); }); // the braid over the left shoulder
  for (let i = 0; i < 5; i++) ell(ctx, -F.w*.86 - (i < 2 ? 1 : 0) + i * .4, F.cy + (8 + i * 4.4)*u, 2, 1.4, '#2a1e14');
  return F; };
/* Brennet: thirty-one, a carter; sun-browned, a padded cap; a leather apron with iron studs over a shirt, the shirt's collar open; the
   wagon-pin's head up by the left shoulder, held */
POR.brennet = function(ctx){ const F = {cy:-75, w:12.6, h:19.8, jaw:.86, chin:4.8, skin:'#c09a78', iris:'#3a2a1a', lip:'#8a5444', browCol:'#3a2a1a', browW:1.7, arch:.4, browL:.2, browR:.2, rim:'#9a7a5a', rimA:.22, nose:1.3, look:.2, smileL:.25, smileR:.15, mouthW:3.8, age:.2, bags:.2, open:.86};
  PR.stroke(ctx, '#3a3a3a', 4, () => { ctx.moveTo(-24, 6); ctx.lineTo(-30, -90); }); ell(ctx, -30.4, -92, 4, 3, '#5a5a5a'); // the wagon-pin
  PR.neck(ctx, F, 8.6);
  const B = BP.body(ctx, F, {wide:38, drop:3, trap:4, nx:11, ny:F.cy + 14.6, cb:F.cy + 20, c1:'#8a7a62', c2:'#241c12'});
  ctx.save(); B.path(); ctx.clip(); ctx.fillStyle = PR.lit(ctx, '#6a5038', '#1e160c', -30, 30); ctx.fillRect(-26, -40, 52, 60); // the apron
    for (let y = -34; y < 10; y += 8) for (let x = -20; x <= 20; x += 10) ell(ctx, x, y, 1, 1, '#9a9a9a'); PR.soft(ctx, 20, -16, 16, 16, '#000000', .45); ctx.restore();
  BP.light(ctx, F, B, false);
  BP.collar(ctx, F, '#a89a80', '#3a3024', 'rgba(0,0,0,.4)', {style:'rib', sw:22, sy:-44});
  PR.stroke(ctx, '#2a1a0e', 2, () => { ctx.moveTo(-24, -40); ctx.lineTo(-20, 6); ctx.moveTo(24, -40); ctx.lineTo(20, 6); }); // the apron's straps
  F.under = (ctx, F) => { PR.dots(ctx, F, 40, 'rgba(40,24,14,.22)', .4, [5, 19]); };
  PR.face(ctx, F);
  const u = F.h/20, top = F.cy - 21*u;
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, top + 7*u, F.w + 1.2, 9*u, 0, Math.PI, 0); ctx.closePath(); ctx.fillStyle = PR.lit(ctx, '#6a5a44', '#241c12', -F.w, F.w); ctx.fill(); ctx.restore(); // the padded cap
  PR.stroke(ctx, 'rgba(20,12,6,.5)', .7, () => { for (let i = -2; i <= 2; i++) { ctx.moveTo(i * 4, top - 1*u); ctx.lineTo(i * 5, top + 6.6*u); } });
  return F; };
/* Kaedra: twenty-six, half Bolkando; a dun scout's coat with the hood down round the shoulders, dry grass sewn at them; a blue bead on a
   thong at the throat; the horn bow's upper limb over the left shoulder, slung */
POR.kaedra = function(ctx){ const F = {cy:-74, w:11.4, h:19.4, jaw:.72, chin:4.1, skin:'#b8946e', iris:'#2a3020', lip:'#8a5a46', browCol:'#2a1e14', browW:1.3, arch:.6, browL:.25, browR:.35, rim:'#8a9a6a', rimA:.24, nose:1, look:.3, open:.88, smileL:0, smileR:.1, mouthW:3.2, bags:.15, age:0};
  PR.stroke(ctx, '#3a2a14', 2.6, () => { ctx.moveTo(-30, 0); ctx.quadraticCurveTo(-34, -60, -18, -112); }); PR.stroke(ctx, 'rgba(240,226,190,.4)', .6, () => { ctx.moveTo(-28, 0); ctx.lineTo(-16, -110); }); // the bow and its string
  PR.neck(ctx, F, 7.4);
  const B = BP.body(ctx, F, {wide:31, drop:3, nx:F.w*.66 + 2.4, ny:F.cy + 14, cb:-45, c1:'#7a7454', c2:'#1a1810'}); ctx.save(); B.path(); ctx.clip();
    for (let i = 0; i < 30; i++) { const r = PR.rng(i + 911); PR.stroke(ctx, 'rgba(200,180,110,.4)', .6, () => { const x = (r() < .5 ? -1 : 1) * (18 + r() * 12), y = -46 + r() * 14; ctx.moveTo(x, y); ctx.lineTo(x + (r() - .5) * 4, y - 5); }); } // the dry grass at the shoulders
    PR.soft(ctx, 20, -16, 14, 12, '#000000', .4); ctx.restore(); BP.light(ctx, F, B, false);
  BP.collar(ctx, F, '#6a6448', '#1e1c12', 'rgba(0,0,0,.45)', {style:'wrap', sw:24, sy:-44, drop:1}); // the hood down round the neck
  PR.stroke(ctx, '#2a2018', .6, () => { ctx.moveTo(-4, -50); ctx.quadraticCurveTo(0, -42, 4, -50); }); ell(ctx, 0, -42.4, 1.6, 1.6, '#3a6ab0'); ell(ctx, -.4, -43, .5, .5, '#c8dcf0'); // the blue bead
  BP.sling(ctx, -28, -8, 18, -46, '#3a2a14', 2.2);
  PR.face(ctx, F);
  BP.hair(ctx, F, {c:['#2a1e14', '#140e08', '#060403'], v:1.3, wx:.85, hl:12.2, ey:-2.6, n:64, sw:.42, seed:933, sh:'#a8b090', shA:.16});
  return F; };
