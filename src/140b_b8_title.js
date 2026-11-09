/* ============ Book Eight's title: Darujhistan's blue fire under a broken moon (v11.0, 140b) ============
   The painted title (ART 'title/tth', drawn by Claude for this game from a seeded generator): night over Darujhistan, the city of blue fire;
   the domes and towers of the upper city against the sky, the gas-light blue in a thousand windows and along the streets, the lake below
   with the light on it; the moon over the city with a crack across it (it bursts on the last night, rule 81: never why); and in the
   foreground a Gadrobi roof's edge, slates and a chimney, a Guild knife driven into the slate through a paper with five short strokes on
   it, the Fourth's names as the Guild counts them. Original work: no copyrighted image, no named place drawn.
   The patch (ART 'insignia/tth'): the Fourth's round IV patch (Book One's, insignia/patch: the flame above the numeral and the tally
   below, series-patches.md), the cloth faded and frayed with the years, and a small bell stitched under the tally: the toll.
   Also here: the three new sigils (the dead, the Guardians of the Gate, K'rul), the Hood-touched charm's picture, and the recruits' busts
   (Vasso, Edrem). Motion: the .k8-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  const h = (i, s) => hash(i, s), f1 = n => Math.round(n * 10) / 10;
  const W = 1600, H = 900, SKY = 520, LAKE = 640; // the city's foot, the lake's edge
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k8-gas{animation:k8-gas 2.8s ease-in-out infinite}.k8-glint{animation:k8-glint 3.4s ease-in-out infinite}.k8-moon{animation:k8-moon 9s ease-in-out infinite}
.k8-cloud{animation:k8-cloud 30s ease-in-out infinite}.k8-paper{animation:k8-paper 4s ease-in-out infinite;transform-box:fill-box;transform-origin:0 0}
@keyframes k8-gas{0%,100%{opacity:.75}50%{opacity:1}}
@keyframes k8-glint{0%,100%{opacity:.2}50%{opacity:.7}}
@keyframes k8-moon{0%,100%{opacity:.85}50%{opacity:1}}
@keyframes k8-cloud{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,0)}}
@keyframes k8-paper{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}
@media (prefers-reduced-motion:reduce){.k8-gas,.k8-glint,.k8-moon,.k8-cloud,.k8-paper{animation:none}}.reduce .k8-gas,.reduce .k8-glint,.reduce .k8-moon,.reduce .k8-cloud,.reduce .k8-paper{animation:none}</style>
<defs><linearGradient id="k8sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03050c"/><stop offset=".5" stop-color="#0c1428"/><stop offset=".86" stop-color="#1c3050"/><stop offset="1" stop-color="#2a4a70"/></linearGradient>
<linearGradient id="k8lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e1a30"/><stop offset="1" stop-color="#03060c"/></linearGradient>
<radialGradient id="k8moon" cx=".42" cy=".4" r=".6"><stop offset="0" stop-color="#f4f0e2"/><stop offset=".7" stop-color="#cfc8b4"/><stop offset="1" stop-color="#8e8878"/></radialGradient>
<radialGradient id="k8halo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#dfe6f0" stop-opacity=".28"/><stop offset="1" stop-color="#dfe6f0" stop-opacity="0"/></radialGradient>
<radialGradient id="k8blue" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5ab4ff" stop-opacity=".6"/><stop offset="1" stop-color="#3a7ad0" stop-opacity="0"/></radialGradient>
<linearGradient id="k8slate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2c34"/><stop offset="1" stop-color="#0c0d12"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#k8sky)"/>`;
  for (let i = 0; i < 90; i++) { const x = h(i, 81) * W, y = h(i, 82) * SKY * .6; s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(.5 + h(i, 83) * 1.1)}" fill="#e8ecf4" opacity="${f1(.15 + h(i, 84) * .5)}"/>`; }
  /* the moon, high over the upper city, a crack across it and a sliver standing a little apart */
  const mx = 1080, my = 170, mr = 74;
  s += `<circle cx="${mx}" cy="${my}" r="${mr * 2.6}" fill="url(#k8halo)"/><g class="k8-moon"><circle cx="${mx}" cy="${my}" r="${mr}" fill="url(#k8moon)"/>`;
  for (let i = 0; i < 7; i++) s += `<circle cx="${f1(mx + (h(i, 85) - .5) * mr * 1.3)}" cy="${f1(my + (h(i, 86) - .5) * mr * 1.3)}" r="${f1(6 + h(i, 87) * 12)}" fill="#a49e8c" opacity=".35"/>`;
  s += `<path d="M${mx - 52} ${my - 54} L${mx - 18} ${my - 14} L${mx - 26} ${my + 6} L${mx + 10} ${my + 30} L${mx + 4} ${my + 46} L${mx + 30} ${my + 66}" stroke="#1a1e2a" stroke-width="3" fill="none" stroke-linejoin="round"/>
<path d="M${mx - 18} ${my - 14} L${mx + 22} ${my - 30} M${mx + 10} ${my + 30} L${mx + 48} ${my + 18}" stroke="#1a1e2a" stroke-width="1.6" fill="none"/>
<path d="M${mx + 54} ${my - 50} Q${mx + 84} ${my - 10} ${mx + 66} ${my + 40} L${mx + 74} ${my + 44} Q${mx + 96} ${my - 8} ${mx + 62} ${my - 56} Z" fill="#cfc8b4" opacity=".9"/></g>`;
  /* thin cloud across the moon's foot */
  for (let i = 0; i < 4; i++) s += `<ellipse class="k8-cloud" style="animation-delay:-${i * 7}s" cx="${f1(700 + i * 260)}" cy="${f1(250 + i * 30)}" rx="${f1(280 - i * 30)}" ry="${f1(16 + i * 3)}" fill="#1a2438" opacity="${f1(.5 - i * .08)}"/>`;
  /* the upper city on its rise: domes, towers, the long roofs, all black against the sky, with blue fire in the windows */
  let city = `M0 ${SKY}`; const tops = [];
  for (let x = 0; x <= W; x += 40) { const k = Math.sin(x / W * Math.PI), y = SKY - 60 - k * 140 - h(x, 88) * 50; city += ` L${x} ${f1(y)} L${x + 40} ${f1(y)}`; tops.push([x, y]); }
  s += `<path d="${city} L${W} ${LAKE} L0 ${LAKE} Z" fill="#05070e"/>`;
  [[520, 330, 46], [760, 290, 60], [980, 312, 40], [1240, 360, 34]].forEach(([x, y, r]) => s += `<path d="M${x - r} ${y + r * .2} Q${x - r} ${y - r} ${x} ${y - r * 1.1} Q${x + r} ${y - r} ${x + r} ${y + r * .2} Z" fill="#05070e"/><rect x="${x - 2}" y="${f1(y - r * 1.5)}" width="4" height="${f1(r * .45)}" fill="#05070e"/>`); // domes
  [[640, 250, 18], [880, 230, 16], [1120, 268, 14], [380, 320, 14], [1400, 360, 16]].forEach(([x, y, w]) => s += `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${SKY - y + 40}" fill="#05070e"/><path d="M${x - w / 2 - 3} ${y} L${x} ${y - w * 1.4} L${x + w / 2 + 3} ${y} Z" fill="#05070e"/>`); // towers
  /* the blue fire: windows and street-lights, thickest low down, a glow over the whole city */
  s += `<ellipse cx="${W / 2}" cy="${SKY + 30}" rx="${W * .62}" ry="140" fill="url(#k8blue)" opacity=".7"/>`;
  for (let i = 0; i < 260; i++) { const x = h(i, 89) * W, y = SKY - 10 - Math.pow(h(i, 90), 1.6) * 230 + 110 * Math.pow(h(i, 91), 3), top = tops[Math.min(tops.length - 1, Math.floor(x / 40))][1];
    if (y < top + 8 || y > LAKE - 6) continue;
    s += `<rect class="k8-gas" style="animation-delay:-${f1(h(i, 92) * 2.8)}s" x="${f1(x)}" y="${f1(y)}" width="${f1(1.6 + h(i, 93) * 2.4)}" height="${f1(1.6 + h(i, 94) * 2)}" fill="${h(i, 95) > .85 ? '#ffd890' : '#7ac8ff'}" opacity=".85"/>`; }
  /* the lake, and the city's light on it */
  s += `<rect y="${LAKE}" width="${W}" height="${H - LAKE}" fill="url(#k8lake)"/>`;
  for (let i = 0; i < 70; i++) { const x = h(i, 96) * W, y = LAKE + 8 + h(i, 97) * 150, w = 10 + h(i, 98) * 50; s += `<rect class="k8-glint" style="animation-delay:-${f1(h(i, 99) * 3.4)}s" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="1.6" fill="${h(i, 100) > .9 ? '#ffd890' : '#6ab4f0'}" opacity=".4"/>`; }
  s += `<path d="M${mx - 10} ${LAKE + 10} L${mx + 10} ${LAKE + 10} L${mx + 24} ${H - 120} L${mx - 24} ${H - 120} Z" fill="#cfc8b4" opacity=".08"/>`; // the moon's road on the water
  /* the foreground: a Gadrobi roof's edge, slates, a chimney; the knife in the slate through a paper with five strokes */
  s += `<path d="M0 ${H - 210} L620 ${H - 300} L760 ${H - 250} L760 ${H} L0 ${H} Z" fill="url(#k8slate)"/>`;
  for (let r = 0; r < 7; r++) { const y0 = H - 210 + r * 34; let d = ''; for (let x = 0; x < 760; x += 46) { const yy = y0 - x * (90 / 620) + (x > 620 ? (x - 620) * .4 : 0) + (r % 2 ? 0 : 3); d += `M${x} ${f1(yy)} L${x + 44} ${f1(yy - 6)} `; } s += `<path d="${d}" stroke="#05060a" stroke-width="2" opacity=".7"/>`; }
  s += `<path d="M0 ${H - 210} L620 ${H - 300}" stroke="#4a6a90" stroke-width="2" opacity=".55"/>`; // the ridge, lit blue from below
  s += `<rect x="470" y="${H - 380}" width="64" height="120" fill="#0a0b10"/><rect x="462" y="${H - 390}" width="80" height="14" fill="#12141a"/><rect x="482" y="${H - 404}" width="16" height="14" fill="#0a0b10"/><rect x="506" y="${H - 400}" width="14" height="10" fill="#0a0b10"/>`; // the chimney
  s += `<g transform="translate(250 ${H - 188}) rotate(-8)"><g class="k8-paper"><path d="M-70 -40 L70 -50 L76 40 L-64 52 Z" fill="#cdbf9e"/><path d="M-70 -40 L70 -50 L76 40 L-64 52 Z" fill="none" stroke="#2a2016" stroke-width="1.4" opacity=".6"/>
<g stroke="#2a1c12" stroke-width="5" stroke-linecap="round">${[0, 1, 2, 3, 4].map(i => `<path d="M${-38 + i * 18} ${-14 - i * 1.2} L${-36 + i * 18} ${22 - i * 1.2}"/>`).join('')}</g>
<path d="M-60 34 Q0 30 66 26" stroke="#7a2a1a" stroke-width="2" fill="none" opacity=".5"/></g>
<rect x="-6" y="-140" width="12" height="100" fill="#14161c"/><rect x="-5" y="-140" width="3" height="100" fill="#5a6a80" opacity=".6"/><path d="M-6 -40 L0 -14 L6 -40 Z" fill="#14161c"/>
<rect x="-18" y="-152" width="36" height="12" rx="3" fill="#2a2018"/><rect x="-7" y="-196" width="14" height="46" rx="4" fill="#3a2a1c"/><circle cx="0" cy="-200" r="7" fill="#2a2018"/></g>`; // the paper with five strokes, and the knife through it
  s += `</svg>`;
  ART['title/tth'] = s; ART_SIZE['title/tth'] = [W, H];

  /* the patch: the Fourth's round IV (insignia/patch), the cloth faded with the years and frayed at the rim, a small stitched bell under it */
  const inner = (ART['insignia/patch'] || '').replace(/^<svg /, '<svg x="0" y="0" width="300" height="300" ');
  ART['insignia/tth'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 370" role="img" aria-label="The Fourth's patch, Book Eight: the round IV, faded and frayed with the years, with a small bell stitched under it">
${inner}
<circle cx="150" cy="150" r="142" fill="#c8b48a" opacity=".16"/>
<g stroke="#8a7650" stroke-width="1.6" opacity=".7">${Array.from({length:22}, (_, i) => { const a = i / 22 * Math.PI * 2 + .1, r0 = 140, r1 = 147 + (i % 3) * 2; return `<path d="M${f1(150 + Math.cos(a) * r0)} ${f1(150 + Math.sin(a) * r0)} L${f1(150 + Math.cos(a + .03) * r1)} ${f1(150 + Math.sin(a + .03) * r1)}"/>`; }).join('')}</g>
<g transform="translate(150 334)"><path d="M0 -30 L0 -22" stroke="#c9a15a" stroke-width="2"/><path d="M-20 10 Q-20 -22 0 -22 Q20 -22 20 10 L24 14 L-24 14 Z" fill="#b48a3a" stroke="#5a3e18" stroke-width="2"/>
<path d="M-24 14 L24 14" stroke="#e8c87a" stroke-width="2" stroke-dasharray="3 3"/><circle cx="0" cy="19" r="4" fill="#5a3e18"/><path d="M-12 -12 Q-14 0 -14 8" stroke="#f0d890" stroke-width="2" fill="none" opacity=".7"/></g></svg>`;

  /* the three new sigils, in 019e's frame: the dead (a column of grey helms, marching), the Guardians of the Gate (a gate held by two
     faceless soldiers), K'rul (an old bell with the hum coming off it in rings) */
  const frame = (label, bg, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="${label}">
<circle cx="100" cy="100" r="98" fill="${bg}"></circle>
<circle cx="100" cy="100" r="92" fill="none" stroke="#c9a15a" stroke-opacity="0.55" stroke-width="1.5"></circle>
${body}</svg>`;
  ART['patrons/b8dead'] = frame('Sigil of the dead', '#121416', `
${[0, 1, 2, 3, 4].map(i => { const x = 46 + i * 27, y = 118 - i * 6, k = 1 - i * .1; return `<g transform="translate(${x} ${y}) scale(${f1(k)})" opacity="${f1(1 - i * .14)}"><path d="M-12 40 L-10 4 Q-12 -6 0 -18 Q12 -6 10 4 L12 40 Z" fill="#0a0b0c"></path><path d="M-11 -6 Q0 -26 11 -6 L11 -2 L-11 -2 Z" fill="#6a7078"></path><rect x="-11" y="-4" width="22" height="3" fill="#9aa0a6"></rect><rect x="12" y="-34" width="2.2" height="74" fill="#2a2c2e"></rect></g>`; }).join('')}
<path d="M30 160 L170 140" stroke="#9aa0a6" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 6"></path>`);
  ART['patrons/b8gate'] = frame('Sigil of the Guardians of the Gate', '#141412', `
<rect x="56" y="44" width="16" height="122" fill="#b8c0b0"></rect><rect x="128" y="44" width="16" height="122" fill="#b8c0b0"></rect><rect x="48" y="34" width="104" height="16" fill="#c8d0c0"></rect>
<rect x="72" y="50" width="56" height="116" fill="#e8ecdc" opacity=".14"></rect>
${[[84, 1], [116, -1]].map(([x, d]) => `<g transform="translate(${x} 104)"><path d="M-9 60 L-8 6 Q-9 -4 0 -12 Q9 -4 8 6 L9 60 Z" fill="#0a0a08"></path><circle cx="0" cy="-18" r="8" fill="#0a0a08"></circle><rect x="${d > 0 ? 9 : -11}" y="-42" width="2.2" height="104" fill="#2a2a24"></rect></g>`).join('')}
<g class="pt-eyes" fill="#c94a2a" opacity=".0"></g>`);
  ART['patrons/krul'] = frame('Sigil of K\'rul', '#16120c', `
<circle class="pt-pulse" cx="100" cy="104" r="70" fill="none" stroke="#e8c87a" stroke-opacity=".18" stroke-width="2"></circle><circle cx="100" cy="104" r="56" fill="none" stroke="#e8c87a" stroke-opacity=".26" stroke-width="2"></circle>
<rect x="96" y="34" width="8" height="20" fill="#3a2a14"></rect><path d="M60 140 Q60 58 100 54 Q140 58 140 140 L150 150 L50 150 Z" fill="#0a0806"></path>
<path d="M50 150 L150 150" stroke="#c9a15a" stroke-width="3"></path><circle cx="100" cy="160" r="8" fill="#0a0806"></circle>
<path d="M72 132 Q70 96 84 74" stroke="#e8dcc2" stroke-opacity=".5" stroke-width="3" fill="none"></path>`);

  /* the Hood-touched charm: a knucklebone on a black cord, worn smooth, a bored hole nobody bored; Book Eight's grey-blue ground */
  ART['item/b8_hoodcharm'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A Hood-touched charm"><defs><radialGradient id="b8hc-bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#2a3038"/><stop offset=".62" stop-color="#161a20"/><stop offset="1" stop-color="#0a0c10"/></radialGradient>
<radialGradient id="b8hc-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="b8hc-bn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2ead8"/><stop offset=".5" stop-color="#cfc2a4"/><stop offset="1" stop-color="#7a6e58"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b8hc-bg)"/><ellipse cx="104" cy="112" rx="46" ry="9" fill="url(#b8hc-sh)"/>
<path d="M40 28 Q70 70 96 74 M164 30 Q132 70 108 74" stroke="#0a0a0c" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M40 28 Q70 70 96 74" stroke="#3a3c44" stroke-width="1" fill="none" opacity=".7"/>
<path d="M78 84 Q78 70 92 72 Q100 66 110 72 Q126 70 126 84 Q130 98 118 102 Q110 110 100 104 Q90 110 82 102 Q72 98 78 84 Z" fill="url(#b8hc-bn)" stroke="#2a2418" stroke-width="1.4"/>
<circle cx="102" cy="84" r="5" fill="#0a0a0c"/><circle cx="102" cy="84" r="5" fill="none" stroke="#9ab0c8" stroke-width="1" opacity=".5"/>
<path d="M84 80 Q90 76 96 78" stroke="#fff" stroke-width="1.4" fill="none" opacity=".45"/><ellipse cx="102" cy="88" rx="30" ry="22" fill="#9ab0c8" opacity=".07"/></svg>`;
  ART_SIZE['item/b8_hoodcharm'] = [200, 150];
  /* the jug of kelyk: a stoppered clay jug, sticky at the neck, a dark drip down its side; nothing about it inviting */
  ART['item/b8_kelykjug'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="A jug of kelyk"><defs><radialGradient id="b8kj-bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#2e2830"/><stop offset=".62" stop-color="#18141a"/><stop offset="1" stop-color="#0a080c"/></radialGradient>
<radialGradient id="b8kj-sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<linearGradient id="b8kj-cl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b08a62"/><stop offset=".45" stop-color="#8a6644"/><stop offset="1" stop-color="#3a2a1c"/></linearGradient></defs>
<rect width="200" height="150" fill="url(#b8kj-bg)"/><ellipse cx="100" cy="128" rx="44" ry="8" fill="url(#b8kj-sh)"/>
<path d="M84 34 L116 34 L114 46 Q140 56 140 88 Q140 124 100 126 Q60 124 60 88 Q60 56 86 46 Z" fill="url(#b8kj-cl)" stroke="#1a120a" stroke-width="1.4"/>
<path d="M138 70 Q156 70 154 88 Q152 104 136 104" stroke="#5a4028" stroke-width="7" fill="none"/>
<rect x="86" y="24" width="28" height="12" rx="3" fill="#4a3424" stroke="#1a120a" stroke-width="1.2"/>
<path d="M90 46 Q88 64 92 80 Q94 92 90 104" stroke="#3a1428" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/><circle cx="90" cy="108" r="3.4" fill="#3a1428"/>
<path d="M68 70 Q72 60 82 56" stroke="#fff" stroke-width="1.4" fill="none" opacity=".3"/><path d="M64 96 Q100 104 136 96" stroke="#1a120a" stroke-width="1" fill="none" opacity=".5"/></svg>`;
  ART_SIZE['item/b8_kelykjug'] = [200, 150];
}
/* Settings › Artwork off: the title's canvas backdrop borrows Book Three's until Book Eight has its own */
{ const _stb = startTitleBackdrop; startTitleBackdrop = function(cv, b){ return _stb(cv, b === 'tth' ? 'moi' : b); }; }

/* ---------------- the busts (the bust rules: each its own neckline by kit, a short natural neck, the garment blending up into the
   shoulders, every prop held, slung or belted). Lantern low left, a rim of the soldier's own colour on the right. ---------------- */
/* Vasso: twenty-three, Gadrobi, lean; cropped dark hair; the Guild's dark quilted jack with its high close collar; a knife's hilt at the back of
   the neck, its sheath on a strap across the chest (slung); the knotted cord that is a map round his neck */
POR.vasso = function(ctx){ const F = {cy:-76, w:12, h:19.6, jaw:.74, chin:4.2, skin:'#b88a68', iris:'#2a2018', lip:'#8a5444', browCol:'#1a120c', browW:1.4, arch:.6, browL:.25, rim:'#8a7aa0', rimA:.24, nose:1.1, look:-.25, smileL:.15, smileR:-.05, mouthW:3.6, age:0, open:.84};
  // the knife's hilt over the right shoulder, behind the head: the sheath sits down the back under the jack
  PR.stroke(ctx, '#0e0c10', 4.2, () => { ctx.moveTo(18, -40); ctx.lineTo(26, -96); }); PR.stroke(ctx, '#3a3240', 2.6, () => { ctx.moveTo(18, -40); ctx.lineTo(26, -96); });
  ctx.fillStyle = '#5a5060'; ctx.fillRect(21.4, -100, 7, 3); PR.stroke(ctx, 'rgba(220,214,230,.4)', .6, () => { ctx.moveTo(22.6, -60); ctx.lineTo(25.4, -94); });
  PR.neck(ctx, F, 7.6);
  const B = BP.body(ctx, F, {wide:34, drop:6, trap:3, nx:10.6, ny:F.cy + 14.4, cb:F.cy + 19.6, c1:'#3e3848', c2:'#121016'});
  ctx.save(); B.path(); ctx.clip(); BP.quilt(ctx, -40, 40, -50, 4, 6, 'rgba(10,8,14,.55)');
    PR.soft(ctx, 20, -16, 16, 16, '#000000', .45); PR.soft(ctx, -18, -34, 12, 7, '#ffe0c0', .08); ctx.restore();
  BP.light(ctx, F, B, false);
  BP.collar(ctx, F, '#2e2a36', '#0c0a10', 'rgba(0,0,0,.5)', {style:'rib', sw:22, sy:-44});
  BP.sling(ctx, -26, -6, 16, -46, '#2a2018', 3); // the sheath-strap across the chest, to the hilt behind the shoulder
  PR.stroke(ctx, '#6a5a44', .9, () => { ctx.moveTo(-6, -50); ctx.quadraticCurveTo(0, -38, 6, -50); }); [-4, -1.5, 1.5, 4].forEach((x, i) => ell(ctx, x, -45 + Math.abs(x) * .6, .9, .9, '#8a7a5a')); // the knotted cord
  F.under = (ctx, F) => { PR.soft(ctx, 0, F.cy + 11, 7, 3, '#2a1a14', .12); };
  PR.face(ctx, F);
  BP.hair(ctx, F, {c:['#2a2018', '#160e08', '#060402'], v:1.6, wx:.9, hl:13.2, ey:-3, n:70, sw:.45, seed:812, sh:'#8a7a90', shA:.14});
  return F; };
/* Edrem: forty-one, weathered, grey stubble and short grey hair; old grey scale with the Seer's marks filed off; a pilgrim's brown cloak over
   the left shoulder, pinned; the mace's haft slung on a strap behind the right shoulder; a bit of coral on a cord at the throat */
POR.edrem = function(ctx){ const F = {cy:-75, w:13.4, h:20, jaw:.9, chin:5.6, skin:'#a8826a', iris:'#4a4a48', lip:'#7a5246', browCol:'#5a5450', browW:1.9, arch:.25, browL:.2, browR:.1, rim:'#8e9496', rimA:.2, nose:1.4, look:.1, smileL:-.3, smileR:-.25, mouthW:4, age:.6, bags:.6, open:.82};
  // the mace's haft behind the right shoulder, slung, its iron head above
  PR.stroke(ctx, '#1a140e', 5, () => { ctx.moveTo(22, -30); ctx.lineTo(30, -104); }); PR.stroke(ctx, '#5a4632', 3.4, () => { ctx.moveTo(22, -30); ctx.lineTo(30, -104); });
  ell(ctx, 30.6, -108, 6.4, 6.8, '#3a3a3e'); ell(ctx, 29, -110, 2.6, 2.4, 'rgba(220,224,230,.4)'); [[-5, -4], [5, -3], [0, 6]].forEach(([dx, dy]) => ell(ctx, 30.6 + dx, -108 + dy, 1.4, 1.4, '#5a5a60'));
  PR.neck(ctx, F, 9.4);
  const B = BP.body(ctx, F, {wide:42, drop:2, trap:6, nx:11.8, ny:F.cy + 15.2, cb:F.cy + 20.6, c1:'#8a8e92', c2:'#26282c'});
  ctx.save(); B.path(); ctx.clip(); BP.scales(ctx, -46, 46, -60, 4, 5.4, '#7e8288', 81);
    for (let i = 0; i < 3; i++) PR.soft(ctx, -12 + i * 12, -24 + (i % 2) * 6, 3, 2, '#3a3c40', .6); // where the marks were filed off
    PR.soft(ctx, 22, -16, 18, 20, '#000000', .45); ctx.restore();
  BP.light(ctx, F, B, false);
  // the pilgrim's cloak over the left shoulder (ours), falling down the chest, pinned at the collarbone with a plain iron ring
  ctx.save(); ctx.beginPath(); ctx.moveTo(-46, 4); ctx.lineTo(-44, -30); ctx.bezierCurveTo(-42, -44, -24, -48, -12, -46); ctx.quadraticCurveTo(-8, -30, -16, 4); ctx.closePath();
  ctx.fillStyle = PR.lit(ctx, '#7a6a4e', '#2a2216', -46, -8); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 4; ctx.fill(); ctx.restore();
  PR.stroke(ctx, 'rgba(20,14,8,.5)', .8, () => { ctx.moveTo(-34, -40); ctx.quadraticCurveTo(-30, -20, -34, 2); ctx.moveTo(-24, -44); ctx.quadraticCurveTo(-20, -24, -24, 2); });
  ctx.strokeStyle = '#5a5a5e'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(-14, -42, 2.6, 0, 7); ctx.stroke();
  BP.collar(ctx, F, '#6a6e72', '#1e2024', 'rgba(0,0,0,.45)', {style:'wrap', sw:24, sy:-44});
  BP.sling(ctx, 24, -30, -18, -2, '#3a2a1c', 3); // the mace's strap, across the chest
  PR.stroke(ctx, '#2a2018', .7, () => { ctx.moveTo(-5, -50); ctx.quadraticCurveTo(0, -41, 5, -50); }); ell(ctx, .6, -41.6, 1.6, 2.2, '#d87a6a'); ell(ctx, .1, -42.4, .6, .8, '#f4c0b0'); // the coral token
  F.under = (ctx, F) => { const u = F.h/20; PR.dots(ctx, F, 80, 'rgba(200,196,190,.32)', .4, [4, 21]); PR.dots(ctx, F, 50, 'rgba(40,34,30,.3)', .4, [6, 20]);
    PR.stroke(ctx, 'rgba(120,70,50,.3)', .6, () => { ctx.moveTo(-F.w*.55, F.cy - 4*u); ctx.lineTo(-F.w*.35, F.cy + 4*u); }); }; // grey stubble; an old cut by the eye
  PR.face(ctx, F);
  BP.hair(ctx, F, {c:['#a8a49e', '#6a6660', '#2a2826'], v:1.2, wx:.8, hl:13.6, ey:-3.4, n:60, sw:.42, seed:823, sh:'#e0dcd4', shA:.18});
  return F; };
