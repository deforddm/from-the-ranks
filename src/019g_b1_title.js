/* ============ Book One's title: Moon's Spawn over the ruins of Pale, and the Fourth on the rise (redrawn v13.2, 019g) ============
   The painted title (ART 'title/key', drawn by Claude for this game from a seeded generator; it replaces the canvas board's first drawing,
   019c, which stays as generated; laid out as that first drawing, David Nov 12): night. Across the lake the city of blue fire fills the
   skyline, its upper city high in the middle, its gas-light in round blue glows thrown down into the water; over it hangs Moon's Spawn,
   as wide as the city, a black mountain of basalt the stars go out behind, the city's blue on its belly and rain trailing from it; far
   off on the left the ruins of Pale still smoulder, small. In the foreground on a rise, seen from behind, the Fourth's five watching: the sergeant with a spear,
   a heavy with a round shield, a sapper with a crossbow slung, a hooded mage with a staff, and the healer. Motion: the .k1-* rules inside
   the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  const f1 = TK.f1, h = (i, s) => hash(i, s), W = 1600, H = 900, HZ = 600;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k1-tw{animation:k1-tw 5s ease-in-out infinite}.k1-fl{animation:k1-fl 1.6s ease-in-out infinite}.k1-sm{animation:k1-sm 14s ease-in-out infinite}.k1-sp{animation:k1-sp 40s ease-in-out infinite}
@keyframes k1-tw{0%,100%{opacity:.35}50%{opacity:1}}@keyframes k1-fl{0%,100%{opacity:.75}50%{opacity:1}}@keyframes k1-sm{0%,100%{transform:translate(0,0)}50%{transform:translate(14px,-6px)}}@keyframes k1-sp{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-6px)}}
@media (prefers-reduced-motion:reduce){.k1-tw,.k1-fl,.k1-sm,.k1-sp{animation:none}}.reduce .k1-tw,.reduce .k1-fl,.reduce .k1-sm,.reduce .k1-sp{animation:none}</style>
<defs><linearGradient id="k1sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04040a"/><stop offset=".45" stop-color="#0e0c1e"/><stop offset=".72" stop-color="#2a1c34"/><stop offset="1" stop-color="#5a3430"/></linearGradient>
<linearGradient id="k1land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1820"/><stop offset=".4" stop-color="#0e0c12"/><stop offset="1" stop-color="#050408"/></linearGradient>
<linearGradient id="k1rock" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a2a3a"/><stop offset=".3" stop-color="#0c0c14"/><stop offset="1" stop-color="#040408"/></linearGradient>
<radialGradient id="k1ember" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff9a3c" stop-opacity=".55"/><stop offset=".5" stop-color="#c04a1a" stop-opacity=".18"/><stop offset="1" stop-color="#c04a1a" stop-opacity="0"/></radialGradient>
<radialGradient id="k1blue" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#6aa8ff" stop-opacity=".4"/><stop offset="1" stop-color="#6aa8ff" stop-opacity="0"/></radialGradient>
<radialGradient id="k1fire" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc070" stop-opacity=".9"/><stop offset=".4" stop-color="#ff7a2a" stop-opacity=".35"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>
<linearGradient id="k1body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a2226"/><stop offset=".3" stop-color="#110d10"/><stop offset="1" stop-color="#040305"/></linearGradient>
<filter id="k1b20" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="20"/></filter><filter id="k1b8" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="8"/></filter><filter id="k1b3" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#k1sky)"/>`;
  s += TK.stars(300, 101, 0, HZ - 30, W, '#e4e8f8', 'k1-tw');
  /* low cloud: long bands lit faintly from the fires below */
  s += `<g filter="url(#k1b20)">${[...Array(7)].map((_, i) => `<ellipse cx="${f1(h(i, 111) * W)}" cy="${f1(380 + h(i, 112) * 160)}" rx="${f1(220 + h(i, 113) * 260)}" ry="${f1(14 + h(i, 114) * 18)}" fill="${i % 2 ? '#3a2430' : '#2a2238'}" opacity=".55"/>`).join('')}</g>`;
  /* Moon's Spawn: a black mountain afloat over the city, as wide as the city is, its top a crown of basalt spires, its underside a long
     ragged cone; the stars go out behind it, and the city's blue light is on its belly */
  const MX = 760, MY = 150, HW = 310; let top = '', x = MX - HW;
  top = `M${MX - HW} ${MY + 40}`;
  for (let i = 0; x < MX + HW - 10; i++) { const t = (x - MX + HW) / (2 * HW), env = Math.pow(Math.sin(t * Math.PI), .7), bw = 12 + h(i, 121) * 28, ht = env * (30 + Math.pow(h(i, 122), 2) * 120) + 8, lean = (h(i, 123) - .5) * 10;
    top += ` L${f1(x + bw * .2)} ${f1(MY + 30 - ht * .35)} L${f1(x + bw * .45 + lean)} ${f1(MY + 26 - ht)} L${f1(x + bw * .62)} ${f1(MY + 30 - ht * .55)}`; x += bw; }
  top += ` L${MX + HW} ${MY + 40}`;
  let bot = ''; const n = 28; for (let i = n; i >= 0; i--) { const t = i / n, xx = MX - HW + t * 2 * HW, d = Math.pow(Math.sin(t * Math.PI), 2.2) * 190 * (.7 + h(i, 124) * .6) + 14 + h(i, 125) * 18; bot += ` L${f1(xx + (h(i, 126) - .5) * 14)} ${f1(MY + 40 + d)}`; }
  const spawn = top + bot + ' Z';
  s += `<g class="k1-sp"><path d="${spawn}" fill="#000" filter="url(#k1b20)" opacity=".7" transform="translate(0 20)"/><path d="${spawn}" fill="url(#k1rock)"/>`;
  let fc = ''; for (let i = 0; i < 24; i++) { const t = h(i, 131), xx = MX - HW + 24 + t * (2 * HW - 48), y0 = MY + 20 + h(i, 132) * 26, len = 40 + Math.pow(Math.sin(t * Math.PI), 2) * 140 * h(i, 133), w = 7 + h(i, 134) * 15;
    fc += `<path d="M${f1(xx)} ${f1(y0)} L${f1(xx + w)} ${f1(y0 + 6)} L${f1(xx + w * .4)} ${f1(y0 + len)} Z" fill="${t < .45 ? '#3a3c52' : '#000'}" opacity="${f1((t < .45 ? .32 * (1 - t) : .4) * 100) / 100}"/>`; }
  s += fc;
  s += `<path d="${bot.replace(/^ L/, 'M')}" stroke="#5a8ad8" stroke-width="2" fill="none" opacity=".35"/>`; // the city's light on the underside
  s += `<path d="${top}" stroke="#8a90b4" stroke-width="1.2" fill="none" opacity=".25"/>`;
  for (let i = 0; i < 8; i++) { const xx = MX - 220 + h(i, 141) * 440, y = MY + 20 + h(i, 142) * 60; s += `<g class="k1-fl" style="animation-delay:-${f1(h(i, 143) * 2)}s"><circle cx="${f1(xx)}" cy="${f1(y)}" r="6" fill="url(#k1blue)"/><rect x="${f1(xx - 1.1)}" y="${f1(y - 2)}" width="2.2" height="3.6" fill="#a8ccff"/></g>`; }
  let rn = ''; for (let i = 0; i < 50; i++) { const xx = MX - 170 + h(i, 151) * 340, y = MY + 140 + h(i, 152) * 70; rn += `M${f1(xx)} ${f1(y)} l-5 ${f1(30 + h(i, 153) * 50)}`; }
  s += `<path d="${rn}" stroke="#6a7090" stroke-width="1" opacity=".2"/></g>`;
  /* the far skyline, low hills either side of the city */
  s += `<path d="M0 ${HZ} Q160 ${HZ - 22} 340 ${HZ - 12} Q520 ${HZ - 26} 720 ${HZ - 10} Q960 ${HZ - 22} 1200 ${HZ - 8} Q1400 ${HZ - 18} ${W} ${HZ - 6} L${W} ${H} L0 ${H} Z" fill="#141018"/>`;
  /* Darujhistan under it: the city of blue fire across the lake, the upper city high in the middle, domes and towers, the gas-light
     in round blue glows along the walls and streets */
  const CX0 = 410, CX1 = 1110, CB = HZ - 6, hill = xx => 46 * Math.exp(-Math.pow((xx - 760) / 230, 2));
  s += `<ellipse cx="760" cy="${CB - 30}" rx="460" ry="120" fill="url(#k1blue)" opacity=".85"/>`;
  let cy = '', cw = ''; for (let i = 0; i < 64; i++) { const xx = CX0 + i * 11 + h(i, 161) * 4, base = CB - hill(xx), ht = 10 + Math.pow(h(i, 162), 1.6) * 34 + hill(xx) * .4, w = 10 + h(i, 163) * 10, k = h(i, 164);
    if (k < .14) cy += `<path d="M${f1(xx)} ${f1(base)} L${f1(xx)} ${f1(base - ht)} A${f1(w / 2)} ${f1(w * .62)} 0 0 1 ${f1(xx + w)} ${f1(base - ht)} L${f1(xx + w)} ${f1(base)} Z"/>`;
    else if (k < .24) cy += `<rect x="${f1(xx + w * .3)}" y="${f1(base - ht - 30)}" width="${f1(w * .4)}" height="${f1(ht + 30)}"/><path d="M${f1(xx + w * .2)} ${f1(base - ht - 30)} L${f1(xx + w * .5)} ${f1(base - ht - 46)} L${f1(xx + w * .8)} ${f1(base - ht - 30)} Z"/>`;
    else cy += `<rect x="${f1(xx)}" y="${f1(base - ht)}" width="${f1(w)}" height="${f1(ht + hill(xx) + 6)}"/>`;
    for (let j = 0; j < 3; j++) if (h(i * 5 + j, 165) < .5) cw += `<rect x="${f1(xx + 2 + h(i * 5 + j, 166) * (w - 4))}" y="${f1(base - 4 - h(i * 5 + j, 167) * (ht - 6))}" width="1.6" height="2.4"/>`; }
  s += `<path d="M${CX0 - 30} ${CB + 6} Q${CX0 + 60} ${CB - 14} 640 ${CB - 40} Q760 ${CB - 56} 880 ${CB - 40} Q${CX1 - 60} ${CB - 14} ${CX1 + 30} ${CB + 6} Z" fill="#0a0c18"/><g fill="#080a14">${cy}</g><g fill="#9ac8ff">${cw}</g>`;
  /* the gas-lights: round blue glows along the walls, a few high on the upper city, each thrown down into the lake */
  for (let i = 0; i < 14; i++) { const xx = CX0 + 20 + i * 48 + (h(i, 171) - .5) * 20, y = CB - 6 - hill(xx) * (h(i, 172) < .4 ? 1.2 : .3) - h(i, 173) * 10, r = 10 + h(i, 174) * 10;
    s += `<g class="k1-fl" style="animation-delay:-${f1(h(i, 175) * 2)}s"><circle cx="${f1(xx)}" cy="${f1(y)}" r="${f1(r * 2.2)}" fill="url(#k1blue)"/><circle cx="${f1(xx)}" cy="${f1(y)}" r="${f1(r * .35)}" fill="#cfe4ff"/></g><rect x="${f1(xx - 1.5)}" y="${CB + 12}" width="3" height="${f1(30 + h(i, 176) * 50)}" fill="#7ab0ff" opacity=".45" filter="url(#k1b3)"/>`; }
  /* the lake in front of the city, dark, with the blue on it */
  s += `<path d="M${CX0 - 160} ${CB + 6} L${CX1 + 160} ${CB + 6} Q${CX1 + 100} ${CB + 60} 760 ${CB + 74} Q${CX0 - 100} ${CB + 60} ${CX0 - 160} ${CB + 6} Z" fill="#0c1428"/>`;
  let lk = ''; for (let i = 0; i < 50; i++) { const xx = CX0 - 80 + h(i, 181) * (CX1 - CX0 + 160), y = CB + 12 + h(i, 182) * 54, l = 6 + h(i, 183) * 20; lk += `M${f1(xx)} ${f1(y)} l${f1(l)} 0`; }
  s += `<path d="${lk}" stroke="#7ab0ff" stroke-width="1.2" opacity=".35"/>`;
  for (let i = 0; i < 14; i++) { const xx = CX0 + 20 + i * 48 + (h(i, 171) - .5) * 20; s += `<rect x="${f1(xx - 1.5)}" y="${CB + 10}" width="3" height="${f1(24 + h(i, 176) * 40)}" fill="#8ac0ff" opacity=".5" filter="url(#k1b3)"/>`; }
  /* the plain this side of the lake */
  s += `<path d="M0 ${HZ + 20} Q300 ${HZ + 6} ${CX0 - 160} ${HZ + 14} Q760 ${HZ + 96} ${CX1 + 160} ${HZ + 14} Q1420 ${HZ + 8} ${W} ${HZ + 22} L${W} ${H} L0 ${H} Z" fill="url(#k1land)"/>`;
  /* far off on the left, the ruins of Pale still smouldering, small */
  s += `<ellipse cx="170" cy="${HZ - 6}" rx="170" ry="40" fill="url(#k1ember)" opacity=".7"/>`;
  let wl = ''; for (let i = 0; i < 16; i++) { const xx = 60 + i * 15, bw = 10 + h(i, 191) * 6, ht = 6 + h(i, 192) * 20 * (i % 5 === 2 ? 2 : 1), base = HZ - 4 - Math.sin(i / 16 * Math.PI) * 6;
    wl += `<path d="M${f1(xx)} ${f1(base)} L${f1(xx)} ${f1(base - ht)} L${f1(xx + bw * .5)} ${f1(base - ht + 5)} L${f1(xx + bw)} ${f1(base - ht - 2)} L${f1(xx + bw)} ${f1(base)} Z" fill="#0a0709"/>`; if (h(i, 193) < .3) wl += `<rect x="${f1(xx + 4)}" y="${f1(base - ht * .5)}" width="2" height="3" fill="#ffa050" class="k1-fl"/>`; }
  s += wl + TK.smoke(150, HZ - 24, 180, 18, 40, '#2a2026', .4, 195, 'k1b20');
  /* stakes along an old road toward the city, and a dead tree on the right */
  for (let i = 0; i < 7; i++) { const t = i / 7, xx = 150 + t * 90, y = HZ + 70 - t * 50, ht = 22 - t * 12; s += `<path d="M${f1(xx)} ${f1(y)} L${f1(xx)} ${f1(y - ht)}" stroke="#0a080c" stroke-width="${f1(3 - t * 1.6)}"/><path d="M${f1(xx - 3)} ${f1(y - ht)} L${f1(xx + 3)} ${f1(y - ht)}" stroke="#0a080c" stroke-width="2"/>`; }
  s += `<path d="M1548 770 Q1544 640 1552 540 M1550 600 Q1520 570 1500 548 M1550 640 Q1580 610 1598 596 M1551 570 Q1566 548 1572 520 M1512 562 L1496 560" stroke="#08060a" stroke-width="5" stroke-linecap="round" fill="none"/>`;
  /* the rise the five stand on, with dry grass catching the glow */
  s += `<path d="M640 ${H} Q820 762 1040 748 Q1300 736 1600 760 L1600 ${H} Z" fill="#07060a"/>`;
  s += TK.rim('M700 860 Q840 768 1040 750 Q1300 738 1600 762', '#a07060', 1.6, .35);
  let gr = ''; for (let i = 0; i < 120; i++) { const x = 700 + h(i, 211) * 900, y = 760 + h(i, 212) * 30 - (x < 1000 ? (1000 - x) * -.18 : 0), l = 6 + h(i, 213) * 14; if (y > 900) continue; gr += `M${f1(x)} ${f1(y)} l${f1((h(i, 214) - .5) * 6)} ${f1(-l)}`; }
  s += `<path d="${gr}" stroke="#2a1c1c" stroke-width="1.4" opacity=".9"/>`;
  /* the Fourth's five, seen from behind, watching */
  const B = {fill:'url(#k1body)', dark:'#0c0a0c', rim:'#e0b8a0', cloak:'', helmc:'#2c2e36', packc:'#1c1814', roll:'#241e18'};
  const five = [
    [1150, 812, .74, {kit:'staff', head:'hood', cloak:'#100e14', pack:false, shaft:'#3a2a1c'}],
    [1452, 806, .72, {kit:'none', head:'bare', cloak:'#16100f', pack:true, flip:true}],
    [1262, 846, .86, {kit:'shield', head:'helm', wide:1.12, shieldc:'#2a1a14', shieldr:'#4a3424'}],
    [1370, 842, .84, {kit:'spear', head:'helm', cloak:'#130f10'}],
    [1050, 852, .8, {kit:'xbow', head:'cap', helmc:'#24202a'}]];
  for (const [x, y, k, o] of five) s += `<g transform="translate(${x} ${y}) scale(${k})">${TK.back(Object.assign({}, B, o))}</g>`;
  s += `</svg>`;
  ART['title/key'] = s; ART_SIZE['title/key'] = [W, H];
}
/* the book list's cover: the city, Moon's Spawn and the five */
BOOKS.gotm.coverPos = '58% 50%';
