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
  /* redrawn v13.2 from a seeded generator (019f's kit): night over Darujhistan, the city of blue fire; the upper city's domes and towers on
     its hill against the sky, gas-light blue in a thousand windows and along the streets, a blue haze over all of it; the lower city below
     and the lake with the light on it; the moon over the city with a crack across it (it bursts on the last night, rule 81: never why); and
     in the foreground a Gadrobi roof's edge, slates and a chimney, a Guild knife driven into the slate through a paper with five short
     strokes on it, the Fourth's names as the Guild counts them. Original work: no copyrighted image, no named place drawn. */
  const f1 = TK.f1, h = (i, s) => hash(i, s), W = 1600, H = 900, SKY = 470, LAKE = 590; // the city's foot, the lake's edge
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k8-tw{animation:k8-tw 5s ease-in-out infinite}.k8-gas{animation:k8-gas 3.2s ease-in-out infinite}.k8-wv{animation:k8-wv 7s ease-in-out infinite}.k8-sm{animation:k8-sm 12s ease-in-out infinite}
@keyframes k8-tw{0%,100%{opacity:.35}50%{opacity:1}}@keyframes k8-gas{0%,100%{opacity:.7}50%{opacity:1}}@keyframes k8-wv{0%,100%{transform:translate(0,0)}50%{transform:translate(10px,0)}}@keyframes k8-sm{0%,100%{transform:translate(0,0)}50%{transform:translate(14px,-6px)}}
@media (prefers-reduced-motion:reduce){.k8-tw,.k8-gas,.k8-wv,.k8-sm{animation:none}}.reduce .k8-tw,.reduce .k8-gas,.reduce .k8-wv,.reduce .k8-sm{animation:none}</style>
<defs><linearGradient id="k8sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040c"/><stop offset=".55" stop-color="#0a1430"/><stop offset=".9" stop-color="#1a3460"/><stop offset="1" stop-color="#2a5288"/></linearGradient>
<linearGradient id="k8lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a3a6a"/><stop offset=".5" stop-color="#0a1830"/><stop offset="1" stop-color="#040810"/></linearGradient>
<radialGradient id="k8moon" cx=".42" cy=".4" r=".6"><stop offset="0" stop-color="#f4f0e4"/><stop offset=".7" stop-color="#c8c4b8"/><stop offset="1" stop-color="#8a8a86"/></radialGradient>
<radialGradient id="k8mglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#c8d4f0" stop-opacity=".35"/><stop offset="1" stop-color="#c8d4f0" stop-opacity="0"/></radialGradient>
<radialGradient id="k8haze" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#4a9aff" stop-opacity=".75"/><stop offset=".6" stop-color="#2a5ad0" stop-opacity=".2"/><stop offset="1" stop-color="#2a5ad0" stop-opacity="0"/></radialGradient>
<linearGradient id="k8slate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3040"/><stop offset="1" stop-color="#0a0c12"/></linearGradient>
<filter id="k8b16" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="16"/></filter><filter id="k8b3" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="3"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#k8sky)"/>`;
  s += TK.stars(260, 801, 0, SKY - 120, W, '#e4ecff', 'k8-tw');
  /* the moon, cracked across */
  s += `<circle cx="1220" cy="150" r="170" fill="url(#k8mglow)"/><circle cx="1220" cy="150" r="62" fill="url(#k8moon)"/>`;
  s += [[1200, 130, 12], [1240, 172, 9], [1192, 176, 7], [1246, 128, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#a8a69c" opacity=".55"/>`).join('');
  s += `<path d="M1178 104 L1204 134 L1196 148 L1226 166 L1222 182 L1252 206" stroke="#1a1c24" stroke-width="2.4" fill="none"/><path d="M1204 134 L1230 124 M1226 166 L1250 160" stroke="#1a1c24" stroke-width="1.4" fill="none"/>`;
  s += `<g filter="url(#k8b16)">${[...Array(6)].map((_, i) => `<ellipse cx="${f1(h(i, 811) * W)}" cy="${f1(220 + h(i, 812) * 160)}" rx="${f1(220 + h(i, 813) * 280)}" ry="${f1(10 + h(i, 814) * 14)}" fill="#3a5a90" opacity="${f1(.15 + h(i, 815) * .2)}"/>`).join('')}</g>`;
  /* the upper city on its hill: domes and towers, windows in blue */
  s += `<ellipse cx="760" cy="${SKY - 20}" rx="700" ry="200" fill="url(#k8haze)"/>`;
  let up = '', win = ''; const hill = x => SKY - 70 * Math.exp(-Math.pow((x - 760) / 380, 2));
  for (let i = 0; i < 60; i++) { const x = 120 + i * 22 + h(i, 821) * 8, base = hill(x), ht = 20 + h(i, 822) * 60 + (base < SKY - 30 ? 30 : 0), w = 18 + h(i, 823) * 16, k = h(i, 824);
    if (k < .18) up += `<path d="M${f1(x)} ${f1(base)} L${f1(x)} ${f1(base - ht)} A${f1(w / 2)} ${f1(w * .6)} 0 0 1 ${f1(x + w)} ${f1(base - ht)} L${f1(x + w)} ${f1(base)} Z"/><path d="M${f1(x + w / 2)} ${f1(base - ht - w * .6)} L${f1(x + w / 2)} ${f1(base - ht - w * .6 - 12)}" stroke="#060a16" stroke-width="2"/>`;
    else if (k < .3) up += `<rect x="${f1(x + w * .3)}" y="${f1(base - ht - 70)}" width="${f1(w * .4)}" height="${f1(ht + 70)}"/><path d="M${f1(x + w * .2)} ${f1(base - ht - 70)} L${f1(x + w * .5)} ${f1(base - ht - 96)} L${f1(x + w * .8)} ${f1(base - ht - 70)} Z"/>`;
    else up += `<rect x="${f1(x)}" y="${f1(base - ht)}" width="${f1(w)}" height="${f1(ht)}"/>`;
    for (let j = 0; j < 6; j++) if (h(i * 7 + j, 825) < .55) win += `<rect class="${j % 3 ? '' : 'k8-gas'}" style="animation-delay:-${f1(h(i * 7 + j, 826) * 3.2)}s" x="${f1(x + 3 + h(i * 7 + j, 827) * (w - 6))}" y="${f1(base - 6 - h(i * 7 + j, 828) * (ht - 8))}" width="2.2" height="3.2"/>`; }
  s += `<g fill="#060a16">${up}</g><g fill="#9ad0ff">${win}</g>`;
  /* the lower city: rows of roofs down to the lake, streets of blue light */
  let lo = '', lw = ''; for (let r = 0; r < 3; r++) for (let i = 0; i < 48; i++) { const ww = 22 + h(r * 50 + i, 835) * 22, x = i * 34 + (r % 2) * 17 + h(r * 50 + i, 831) * 10 - 6, base = SKY + 30 + r * 30, ht = 10 + h(r * 50 + i, 832) * 30, pk = h(r * 50 + i, 836) < .5 ? 10 : 0;
    lo += `<path d="M${f1(x)} ${f1(base)} L${f1(x)} ${f1(base - ht)} L${f1(x + ww / 2)} ${f1(base - ht - pk)} L${f1(x + ww)} ${f1(base - ht)} L${f1(x + ww)} ${f1(base)} Z" fill="${['#0a1020', '#080d1a', '#060a14'][r]}"/>`;
    if (h(r * 50 + i, 833) < .5) lw += `<rect x="${f1(x + 6 + h(r * 50 + i, 834) * 16)}" y="${f1(base - ht * .6)}" width="2.4" height="3.4"/>`; }
  let gl = ''; for (let r = 0; r < 4; r++) gl += `<path d="M0 ${SKY + 4 + r * 30} L${W} ${SKY + 2 + r * 30}" stroke="#3a8aff" stroke-width="12" opacity=".55"/>`;
  for (let i = 0; i < 70; i++) gl += `<circle cx="${f1(h(i, 837) * W)}" cy="${f1(SKY + 4 + Math.floor(h(i, 838) * 4) * 30)}" r="${f1(8 + h(i, 839) * 10)}" fill="#6ab8ff" opacity=".6"/>`;
  s += `<g filter="url(#k8b3)">${gl}</g>` + lo + `<g fill="#8ac8ff">${lw}</g>`;
  /* the lake: the light on it in long trembling streaks */
  s += `<rect y="${LAKE}" width="${W}" height="${H - LAKE}" fill="url(#k8lake)"/><path d="M0 ${LAKE} L${W} ${LAKE}" stroke="#7ab8ff" stroke-width="1.6" opacity=".5"/>`;
  let rf = ''; for (let i = 0; i < 160; i++) { const d = h(i, 841), y = LAKE + 6 + d * d * 260, x = h(i, 842) * W, l = 8 + d * 40; rf += `M${f1(x)} ${f1(y)} l${f1(l)} 0`; }
  s += `<g class="k8-wv"><path d="${rf}" stroke="#7ab8ff" stroke-width="1.4" opacity=".4"/></g>`;
  s += `<path d="M1180 ${LAKE + 6} L1260 ${LAKE + 6} L1300 ${H} L1140 ${H} Z" fill="#c8d4f0" opacity=".12" filter="url(#k8b3)"/><g filter="url(#k8b3)">${[...Array(24)].map((_, i) => `<rect x="${f1(h(i, 843) * W)}" y="${LAKE + 4}" width="${f1(4 + h(i, 844) * 8)}" height="${f1(40 + h(i, 845) * 120)}" fill="#4a9aff" opacity="${f1(.2 + h(i, 846) * .25)}"/>`).join('')}</g>`;
  /* the roof in the foreground: rows of slates rising to the right, the ridge lit by the moon, the chimney */
  s += `<path d="M0 ${H} L0 812 L1600 676 L1600 ${H} Z" fill="url(#k8slate)"/>`;
  let sl = ''; for (let r = 0; r < 8; r++) { const y0 = 820 + r * 18; sl += `M0 ${f1(y0)} L1600 ${f1(y0 - 136)}`; for (let c = 0; c < 46; c++) { const x = c * 36 + (r % 2) * 18, y = y0 - x * .085; sl += `M${f1(x)} ${f1(y)} L${f1(x + 1)} ${f1(y + 18)}`; } }
  s += `<path d="${sl}" stroke="#05070c" stroke-width="1.8" opacity=".75"/>${TK.rim('M0 812 L1600 676', '#c8d8f8', 2.4, .6)}`;
  let lic = ''; for (let i = 0; i < 40; i++) { const x = h(i, 851) * 1600, r = Math.floor(h(i, 852) * 6), y = 820 + r * 18 - x * .085 + 3; lic += `<rect x="${f1(x)}" y="${f1(y)}" width="30" height="12" fill="#8aa0c8" opacity="${f1(.05 + h(i, 853) * .08)}" transform="skewY(-4.9)" transform-origin="${f1(x)} ${f1(y)}"/>`; }
  s += lic;
  s += `<g><rect x="1390" y="560" width="74" height="150" fill="#14141c" stroke="#05060a" stroke-width="2.4"/><rect x="1382" y="550" width="90" height="16" fill="#1c1c26" stroke="#05060a" stroke-width="2"/>${[...Array(8)].map((_, i) => `<path d="M1390 ${578 + i * 16} L1464 ${578 + i * 16}" stroke="#05060a" stroke-width="1.4" opacity=".7"/>`).join('')}${TK.rim('M1392 566 L1392 704', '#c8d8f8', 2, .5)}</g>`;
  s += `<g class="k8-sm">${TK.smoke(1428, 530, 260, 20, 60, '#2a3448', .5, 861, 'k8b16')}</g>`;
  /* the Guild's knife through the paper with five strokes */
  s += `<g transform="translate(1180 790) rotate(-8) scale(1.25)"><path d="M-40 -26 L44 -34 L52 22 L-34 30 Z" fill="#d8ccb0" stroke="#5a4e3a" stroke-width="1.6"/><path d="M-34 30 L52 22 L50 26 L-32 34 Z" fill="#000" opacity=".35"/>
${[...Array(5)].map((_, i) => `<path d="M${-22 + i * 13} -14 L${-24 + i * 13} 16" stroke="#2a2018" stroke-width="3" stroke-linecap="round"/>`).join('')}
<path d="M4 -4 L1 -40 Q2 -64 8 -76 L12 -76 Q12 -50 10 -4 Z" fill="#5a6274" stroke="#0a0a0e" stroke-width="1.6"/><path d="M4 -8 L3 -42 Q4 -62 9 -72" stroke="#d8e4ff" stroke-width="1.4" fill="none" opacity=".75"/><path d="M-10 -78 L30 -80" stroke="#2a2a34" stroke-width="7" stroke-linecap="round"/><path d="M10 -82 L11 -118" stroke="#1a120e" stroke-width="12" stroke-linecap="round"/>${[0, 1, 2, 3].map(i => `<path d="M5 ${-88 - i * 8} L17 ${-86 - i * 8}" stroke="#3a2a20" stroke-width="1.4"/>`).join('')}<circle cx="11" cy="-124" r="7" fill="#4a4a54" stroke="#0a0a0e" stroke-width="2"/>${TK.rim('M5 -86 L6 -116', '#c8d8f8', 1.4, .45)}</g>`;
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
/* v13.62.11 (David, Nov 21, 2026, 2:23 AM PST: "the word"): the last four of the later recruits repainted to the first five books' standard: a neck, their own neckline by kit, a body at its own width (no BODY_FILL), a hand on something */
POR.vasso = function(ctx){ const F = {cy:-76, w:12, h:19.6, jaw:.74, chin:4.2, skin:'#b88a68', iris:'#2a2018', lip:'#8a5444', browCol:'#1a120c', browW:1.4, arch:.6, browL:.25, rim:'#8a7aa0', rimA:.24, nose:1.1, look:-.25, smileL:.15, smileR:-.05, mouthW:3.6, age:0, open:.84};
  const u = F.h/20;
  /* the Guild knife's hilt behind the far shoulder: the sheath lies down his back under the jack */
  ctx.save(); ctx.translate(15, -50); ctx.rotate(.17); ctx.lineCap = 'butt'; PR.stroke(ctx, '#0a080c', 4, () => { ctx.moveTo(0, 6); ctx.lineTo(0, -20); }); PR.stroke(ctx, PR.lin(ctx, -1.6, 0, 1.6, 0, [[0, '#5a5064'], [1, '#18141c']]), 2.8, () => { ctx.moveTo(0, 6); ctx.lineTo(0, -20); });
    PR.stroke(ctx, 'rgba(10,8,12,.7)', .5, () => { for (let k = 0; k < 9; k++){ ctx.moveTo(-1.4, -1 - k*2.1); ctx.lineTo(1.4, -1.9 - k*2.1); } }); // the grip, bound in black cord
    ctx.fillStyle = PR.lin(ctx, -4.6, 0, 4.6, 0, [[0, '#b0aab8'], [.5, '#5e5866'], [1, '#1a181e']]); ctx.beginPath(); ctx.roundRect(-4.6, -1, 9.2, 2.6, 1); ctx.fill(); ell(ctx, 0, -22, 2.3, 2.3, PR.rad(ctx, -.7, -22.7, .2, 2.6, [[0, '#d8d2e0'], [.5, '#6a6474'], [1, '#18161c']])); ctx.restore(); // the guard and pommel
  PR.neck(ctx, F, 7.8);
  const B = BP.body(ctx, F, {wide:36, drop:3, trap:2.5, nx:9.8, ny:F.cy + 15.8, cb:-51.6, c1:'#423c4e', c2:'#100e14'}); // the Guild's dark quilted jack
  ctx.save(); B.path(); ctx.clip(); BP.quilt(ctx, -44, 44, -58, 4, 6, 'rgba(8,6,12,.6)');
    PR.stroke(ctx, 'rgba(0,0,0,.6)', .9, () => { ctx.moveTo(-3, -51); ctx.quadraticCurveTo(-9, -30, -8, 6); }); PR.stitch(ctx, 'rgba(170,160,190,.3)', .35, () => { ctx.moveTo(-4.4, -51); ctx.quadraticCurveTo(-10.4, -30, -9.4, 6); }); // the jack closes off-centre, the Guild's way
    [-44, -34, -24, -14].forEach(y => { const x = -4.4 - (y + 51)*.12; ell(ctx, x, y, 1, 1, PR.rad(ctx, x - .3, y - .3, .1, 1.1, [[0, '#8a849a'], [1, '#18161e']])); }); // dull bone toggles, blackened
    BP.sling(ctx, -50, 14, 22, -49, '#2c2018', 3.6); ell(ctx, -3.4, -27.4, 1.9, 1.9, PR.rad(ctx, -4, -28, .2, 2.2, [[0, '#b8b2c0'], [.5, '#5a5462'], [1, '#141218']])); // the sheath-strap across the chest, its buckle
    PR.soft(ctx, -20, -40, 13, 7, '#e8dcf0', .1); PR.soft(ctx, 24, -16, 17, 22, '#000000', .45); ctx.restore();
  BP.light(ctx, F, B, false);
  const roll = (o0, o1, c, c2) => { BP.band(ctx, B, o0, o1); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 2.2; ctx.shadowOffsetY = 1; ctx.fillStyle = PR.lit(ctx, c, c2, -B.nx - 4, B.nx + 4); ctx.fill(); ctx.restore(); }; roll(-2.2, 2.4, '#4c4658', '#0e0c12'); // the high close collar, standing
  PR.stitch(ctx, 'rgba(170,160,190,.3)', .3, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 1.6); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); { const [cx, c0] = B.pt(-.18, -2.2), [, c1] = B.pt(-.18, 2.4); PR.stroke(ctx, 'rgba(0,0,0,.75)', .6, () => { ctx.moveTo(cx, c0); ctx.lineTo(cx - .4, c1); }); }
  /* the knotted cord that is a map, worn round the neck over the jack: each knot a turning, each bead a door */
  PR.stroke(ctx, '#7a6a4e', .8, () => { ctx.moveTo(-B.nx - .4, B.ny + 4); ctx.quadraticCurveTo(-1, -27, B.nx + .4, B.ny + 4); });
  [.14, .26, .37, .5, .6, .72, .86].forEach((t, i) => { const x = lerp(-B.nx - .4, B.nx + .4, t), y = B.ny + 4 + Math.sin(t*Math.PI)*12.2 + .4; if (i % 3 === 1) ell(ctx, x, y, 1.1, 1.1, PR.rad(ctx, x - .3, y - .3, .1, 1.2, [[0, '#d8c8a0'], [1, '#5a4a2a']])); else { ell(ctx, x, y, 1.25, .95, x > 4 ? '#4a4030' : '#9a8a66'); PR.stroke(ctx, 'rgba(40,30,16,.6)', .3, () => { ctx.moveTo(x - .9, y - .4); ctx.lineTo(x + .9, y + .4); }); } });
  F.under = (ctx, F) => { PR.soft(ctx, 0, F.cy + 11, 7, 3, '#2a1a14', .12); PR.stroke(ctx, 'rgba(236,206,184,.45)', .5, () => { ctx.moveTo(F.w*.2, F.cy + 10.6*u); ctx.lineTo(F.w*.36, F.cy + 12.4*u); }); }; // a nick on the chin, from learning
  PR.face(ctx, F);
  BP.hair(ctx, F, {c:['#2a2018', '#160e08', '#060402'], v:2, wx:1.05, hl:12.4, ey:-.6, n:74, sw:.45, seed:812, sh:'#8a7a90', shA:.16}); // cropped dark hair
  /* v13.62.14 (David, Nov 21, 2026, 3:08 AM PST, circled): the gloved hand at the sheath-strap is gone; a fist drawn for gripping a haft read as a block lying on his chest. The knife is slung, so no hand is needed */
  return F; };
/* Edrem: forty-one, weathered, grey stubble and short grey hair; old grey scale with the Seer's marks filed off; a pilgrim's brown cloak over
   the left shoulder, pinned; the mace's haft slung on a strap behind the right shoulder; a bit of coral on a cord at the throat */
/* v13.62.11 (David, Nov 21, 2026, 2:23 AM PST: "the word"): the last four of the later recruits repainted to the first five books' standard: a neck, their own neckline by kit, a body at its own width (no BODY_FILL), a hand on something */
POR.edrem = function(ctx){ const F = {cy:-75, w:13.6, h:20.2, jaw:.92, chin:5.8, skin:'#a8826a', iris:'#4a4a48', lip:'#7a5246', browCol:'#5a5450', browW:1.9, arch:.25, browL:.2, browR:.1, rim:'#8e9496', rimA:.2, nose:1.4, look:.1, smileL:-.3, smileR:-.25, mouthW:4, age:.6, bags:.6, open:.82};
  const u = F.h/20; PR.neck(ctx, F, 10); BP.throat(ctx, F, -48.4, 10);
  const B = BP.body(ctx, F, {wide:45, drop:2, trap:6, nx:11.8, ny:F.cy + 15.8, cb:-46, c1:'#8a8e92', c2:'#24262a'});
  ctx.save(); B.path(); ctx.clip(); BP.scales(ctx, -50, 50, -64, 4, 5.6, '#80848a', 81); // old grey scale
    [[-4, -30, 5, 3.4], [10, -22, 4, 3], [-2, -14, 4.6, 3]].forEach(([x, y, w, h]) => { PR.soft(ctx, x, y, w, h, '#2e3034', .6); PR.stroke(ctx, 'rgba(210,214,220,.3)', .3, () => { for (let k = -2; k <= 2; k++){ ctx.moveTo(x - w*.7, y + k*.8); ctx.lineTo(x + w*.7, y + k*.8 - .6); } }); }); // where the Seer's marks were filed off, the file's scratches still bright
    BP.sling(ctx, 30, -47, -44, 30, '#3a2a1c', 3.6); /* v13.62.14 (David, Nov 21, 2026, 3:08 AM PST, circled): the strap runs on under the cloak and out of the frame; it had stopped short */ // the mace's carrying strap
    PR.soft(ctx, 26, -16, 20, 22, '#000000', .45); ctx.restore();
  BP.light(ctx, F, B, false);
  const roll = (o0, o1, c, c2) => { BP.band(ctx, B, o0, o1); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 2.2; ctx.shadowOffsetY = 1; ctx.fillStyle = PR.lit(ctx, c, c2, -B.nx - 4, B.nx + 4); ctx.fill(); ctx.restore(); }; roll(-2, 2.6, '#5a5348', '#16130f'); PR.stitch(ctx, 'rgba(220,200,160,.35)', .3, () => { for (let i = 0; i <= 20; i++){ const [x, y] = B.pt(-1 + i/10, 1.8); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } }); // the padded arming collar under the scale
  /* the pilgrim's brown cloak over the near shoulder, falling down the chest in folds, pinned at the collarbone with a plain iron ring */
  const ck = () => { ctx.beginPath(); ctx.moveTo(-50, 6); ctx.lineTo(-47, -30); ctx.bezierCurveTo(-45, -47, -27, -53.6, -B.nx - 1, B.ny + 3.4); ctx.quadraticCurveTo(-11, -47, -12.4, -43); ctx.bezierCurveTo(-8, -28, -15, -12, -13, 6); ctx.closePath(); };
  ctx.save(); ck(); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 4; ctx.shadowOffsetX = 1.6; ctx.shadowOffsetY = 1; ctx.fillStyle = PR.lit(ctx, '#84704e', '#261c10', -50, -6); ctx.fill(); ctx.restore(); ctx.save(); ck(); ctx.clip();
    PR.strands(ctx, 70, ['rgba(40,28,14,.3)', 'rgba(200,176,130,.14)'], .4, 825, (i, r) => { const x = -50 + r()*40, y = -50 + r()*54; return [x, y, x + .6, y + 3, x + 1, y + 6 + r()*3]; }); // the wool's weave
    PR.stroke(ctx, 'rgba(20,14,8,.55)', .9, () => { ctx.moveTo(-38, -44); ctx.quadraticCurveTo(-33, -22, -38, 4); ctx.moveTo(-28, -49); ctx.quadraticCurveTo(-22, -26, -27, 4); ctx.moveTo(-19, -50); ctx.quadraticCurveTo(-14, -30, -19, 4); }); PR.stroke(ctx, 'rgba(236,210,160,.2)', .6, () => { ctx.moveTo(-40, -44); ctx.quadraticCurveTo(-35, -22, -40, 4); ctx.moveTo(-30, -49); ctx.quadraticCurveTo(-24, -26, -29, 4); }); // its folds
    for (let i = 0; i < 6; i++) { const r = PR.rng(i + 827); PR.soft(ctx, -46 + r()*30, -14 + r()*18, 2 + r()*4, 1.4 + r()*2, '#c8b490', .13); } ctx.restore(); // road dust at the hem
  ctx.strokeStyle = '#0e0e10'; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.arc(-13.4, -43.4, 2.8, 0, 7); ctx.stroke(); ctx.strokeStyle = PR.lin(ctx, -16, 0, -10, 0, [[0, '#8e9096'], [1, '#2a2c30']]); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(-13.4, -43.4, 2.8, 0, 7); ctx.stroke(); PR.stroke(ctx, '#5e6066', .8, () => { ctx.moveTo(-16.6, -45.6); ctx.lineTo(-10.2, -41.2); }); // the ring and its pin
  { const [bx, by] = B.pt(.1, 7.4); PR.stroke(ctx, '#2a2018', .55, () => { ctx.moveTo(-4, by - 6.6); ctx.quadraticCurveTo(bx - .4, by + 1.4, 6, by - 6.6); }); ctx.save(); ctx.translate(bx, by); ctx.rotate(.2); ell(ctx, .3, .4, 1.5, 2.5, 'rgba(0,0,0,.45)'); ell(ctx, 0, 0, 1.4, 2.4, PR.rad(ctx, -.5, -.9, .2, 2.6, [[0, '#ffd0c0'], [.5, '#d87a6a'], [1, '#6a2a22']])); ctx.restore(); } // the bit of coral on its cord
  F.under = (ctx, F) => { PR.dots(ctx, F, 150, 'rgba(206,202,196,.4)', .42, [5.4, 19.6, (x, y) => (Math.abs(x) < 4.6 && y > 10.4 && y < 14.2)]); PR.dots(ctx, F, 70, 'rgba(40,34,30,.3)', .4, [6, 19.6, (x, y) => (Math.abs(x) < 4.6 && y > 10.4 && y < 14.2)]);
    PR.stroke(ctx, 'rgba(236,206,188,.45)', .7, () => { ctx.moveTo(-F.w*.56, F.cy - 4.4*u); ctx.lineTo(-F.w*.36, F.cy + 4.4*u); }); PR.stroke(ctx, 'rgba(90,44,30,.3)', .4, () => { ctx.moveTo(-F.w*.56 + .5, F.cy - 4.4*u); ctx.lineTo(-F.w*.36 + .5, F.cy + 4.4*u); }); }; // grey stubble; an old cut down past the eye
  PR.face(ctx, F);
  BP.hair(ctx, F, {c:['#a8a49e', '#6a6660', '#2a2826'], v:1.6, wx:1, hl:12.6, ey:-.8, n:66, sw:.42, seed:823, sh:'#e0dcd4', shA:.18}); // short grey hair
  /* the mace, held upright at the far shoulder: an ash haft banded in iron, a flanged head */
  BP.grip(ctx, 33, -6, .05, -2, 3.2, ['#a08a60', '#685232', '#1c140a'], {k:'gaunt', c:['#b0b2b6', '#686a70', '#202226']}, null, 0, -76);
  ctx.save(); ctx.translate(33, -6); ctx.rotate(.05); ctx.fillStyle = PR.lin(ctx, -2.2, 0, 2.2, 0, [[0, '#a8aab0'], [1, '#26282c']]); [-40, -58, -74].forEach(y => ctx.fillRect(-2.1, y, 4.2, 2)); // the iron bands
    ell(ctx, .8, -84.2, 6.6, 7.6, 'rgba(0,0,0,.45)'); ell(ctx, 0, -85, 6.4, 7.4, PR.lin(ctx, -6.4, 0, 6.4, 0, [[0, '#c4c6cc'], [.45, '#7a7c82'], [1, '#1a1b1e']])); PR.stroke(ctx, 'rgba(0,0,0,.65)', .5, () => { ctx.ellipse(0, -85, 6.4, 7.4, 0, 0, 7); }); // the head
    [-4.2, -1.5, 1.5, 4.2].forEach(x => { const h = 7.4*Math.sqrt(1 - x*x/41) + 1.2; ctx.beginPath(); ctx.moveTo(x - .9, -85 - h + 1.6); ctx.lineTo(x + .9, -85 - h + 1.6); ctx.lineTo(x + 1.3, -85); ctx.lineTo(x + .9, -85 + h - 1.6); ctx.lineTo(x - .9, -85 + h - 1.6); ctx.lineTo(x - 1.3, -85); ctx.closePath(); ctx.fillStyle = x < 0 ? PR.lin(ctx, x - 1.3, 0, x + 1.3, 0, [[0, '#eceef2'], [1, '#8a8c92']]) : PR.lin(ctx, x - 1.3, 0, x + 1.3, 0, [[0, '#6a6c72'], [1, '#141518']]); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.lineWidth = .4; ctx.stroke(); }); // its flanges
    ell(ctx, 0, -93.6, 1.6, 1.6, PR.rad(ctx, -.5, -94.1, .2, 1.8, [[0, '#e8eaee'], [1, '#3a3c40']])); ctx.restore(); // the cap stud
  return F; };
