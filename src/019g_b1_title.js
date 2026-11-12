/* ============ Book One's title: Moon's Spawn over the ruins of Pale, and the Fourth on the rise (redrawn v13.2, 019g) ============
   The painted title (ART 'title/key', drawn by Claude for this game from a seeded generator; it replaces the canvas board's first drawing,
   019c, which stays as generated): night over the Pale hills. Moon's Spawn hangs over the sky, a black mountain of basalt the stars go out
   behind, a few lights in its flanks and rain trailing from its underside; under it the ruins of Pale still smoulder, smoke leaning south;
   Onearm's Host's camp in the fields before the walls, rows of tents and its fires; far off on the southern skyline the faint blue of a
   great city's gas-light, unnamed. In the foreground on a rise, seen from behind, the Fourth's five watching: the sergeant with a spear,
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
  /* Moon's Spawn: a black mountain afloat, its top a crown of basalt spires, its underside a long ragged cone; the stars go out behind it */
  const MX = 960, MY = 200, HW = 400; let top = '', x = MX - HW;
  top = `M${MX - HW} ${MY + 40}`;
  for (let i = 0; x < MX + HW - 10; i++) { const t = (x - MX + HW) / (2 * HW), env = Math.pow(Math.sin(t * Math.PI), .7), bw = 14 + h(i, 121) * 34, ht = env * (40 + Math.pow(h(i, 122), 2) * 150) + 10, lean = (h(i, 123) - .5) * 10;
    top += ` L${f1(x + bw * .2)} ${f1(MY + 30 - ht * .35)} L${f1(x + bw * .45 + lean)} ${f1(MY + 26 - ht)} L${f1(x + bw * .62)} ${f1(MY + 30 - ht * .55)}`; x += bw; }
  top += ` L${MX + HW} ${MY + 40}`;
  let bot = ''; const n = 30; for (let i = n; i >= 0; i--) { const t = i / n, xx = MX - HW + t * 2 * HW, d = Math.pow(Math.sin(t * Math.PI), 2.2) * 250 * (.7 + h(i, 124) * .6) + 16 + h(i, 125) * 20; bot += ` L${f1(xx + (h(i, 126) - .5) * 16)} ${f1(MY + 40 + d)}`; }
  const spawn = top + bot + ' Z';
  s += `<g class="k1-sp"><path d="${spawn}" fill="#000" filter="url(#k1b20)" opacity=".7" transform="translate(0 20)"/><path d="${spawn}" fill="url(#k1rock)"/>`;
  /* faces of the rock: long facets, the left ones lit a little by the night sky */
  let fc = ''; for (let i = 0; i < 26; i++) { const t = h(i, 131), xx = MX - HW + 30 + t * (2 * HW - 60), y0 = MY + 20 + h(i, 132) * 30, len = 50 + Math.pow(Math.sin(t * Math.PI), 2) * 180 * h(i, 133), w = 8 + h(i, 134) * 18;
    fc += `<path d="M${f1(xx)} ${f1(y0)} L${f1(xx + w)} ${f1(y0 + 6)} L${f1(xx + w * .4)} ${f1(y0 + len)} Z" fill="${t < .45 ? '#3a3c52' : '#000'}" opacity="${f1((t < .45 ? .32 * (1 - t) : .4) * 100) / 100}"/>`; }
  s += fc;
  s += `<path d="${top}" stroke="#8a90b4" stroke-width="1.2" fill="none" opacity=".25"/>`;
  for (let i = 0; i < 9; i++) { const xx = MX - 280 + h(i, 141) * 560, y = MY + 20 + h(i, 142) * 70; s += `<g class="k1-fl" style="animation-delay:-${f1(h(i, 143) * 2)}s"><circle cx="${f1(xx)}" cy="${f1(y)}" r="7" fill="url(#k1blue)"/><rect x="${f1(xx - 1.2)}" y="${f1(y - 2)}" width="2.4" height="4" fill="#a8ccff"/></g>`; }
  /* rain trailing from the underside */
  let rn = ''; for (let i = 0; i < 70; i++) { const xx = MX - 220 + h(i, 151) * 440, y = MY + 150 + h(i, 152) * 90; rn += `M${f1(xx)} ${f1(y)} l-6 ${f1(40 + h(i, 153) * 70)}`; }
  s += `<path d="${rn}" stroke="#6a7090" stroke-width="1" opacity=".22"/></g>`;
  /* the far southern skyline: hills, and a blue glow of a city's lights a long way off */
  s += `<ellipse cx="1340" cy="${HZ - 4}" rx="320" ry="70" fill="url(#k1blue)" opacity=".8"/>`;
  s += `<path d="M0 ${HZ} Q160 ${HZ - 22} 340 ${HZ - 12} Q520 ${HZ - 30} 720 ${HZ - 10} Q960 ${HZ - 26} 1200 ${HZ - 8} Q1400 ${HZ - 18} ${W} ${HZ - 6} L${W} ${H} L0 ${H} Z" fill="#141018"/>`;
  for (let i = 0; i < 26; i++) s += `<circle cx="${f1(1250 + h(i, 161) * 180)}" cy="${f1(HZ - 8 - h(i, 162) * 8)}" r=".9" fill="#9cc4ff" opacity="${f1(.4 + h(i, 163) * .5)}"/>`;
  /* the plain toward Pale */
  s += `<path d="M0 ${HZ + 20} Q300 ${HZ + 4} 600 ${HZ + 18} Q900 ${HZ + 30} 1200 ${HZ + 16} Q1420 ${HZ + 8} ${W} ${HZ + 22} L${W} ${H} L0 ${H} Z" fill="url(#k1land)"/>`;
  /* Pale: the ruined walls and towers on its hill, the gaps lit from inside by what still burns; smoke leaning south */
  s += `<ellipse cx="420" cy="${HZ - 10}" rx="360" ry="70" fill="url(#k1ember)"/>`;
  let pale = `M110 ${HZ + 14} Q250 ${HZ - 40} 420 ${HZ - 46} Q600 ${HZ - 44} 740 ${HZ + 14} Z`; s += `<path d="${pale}" fill="#120c10"/>`;
  let wl = ''; for (let i = 0; i < 30; i++) { const x = 170 + i * 18, bw = 12 + h(i, 171) * 10, ht = 10 + h(i, 172) * 34 * (i % 5 === 2 ? 2.4 : 1), base = HZ - 30 - Math.sin((i / 30) * Math.PI) * 14; const broken = h(i, 173) < .45;
    wl += `<path d="M${f1(x)} ${f1(base)} L${f1(x)} ${f1(base - ht)} ${broken ? `L${f1(x + bw * .4)} ${f1(base - ht + 8)} L${f1(x + bw * .7)} ${f1(base - ht - 4)}` : ''} L${f1(x + bw)} ${f1(base - ht)} L${f1(x + bw)} ${f1(base)} Z" fill="#0a0709"/>`;
    if (h(i, 174) < .4) wl += `<rect x="${f1(x + bw * .3)}" y="${f1(base - ht * .55)}" width="2.4" height="4" fill="#ffa050" class="k1-fl" style="animation-delay:-${f1(h(i, 175) * 1.6)}s"/>`; }
  s += wl;
  for (let i = 0; i < 5; i++) s += `<g class="k1-sm" style="animation-delay:-${i * 3}s">${TK.smoke(230 + i * 100 + h(i, 181) * 40, HZ - 50, 220 + h(i, 182) * 100, 26 + h(i, 183) * 14, 50, i % 2 ? '#3a2a2c' : '#2a2026', .5, 190 + i, 'k1b20')}</g>`;
  for (let i = 0; i < 8; i++) s += `<circle cx="${f1(220 + h(i, 191) * 420)}" cy="${f1(HZ - 34 - h(i, 192) * 20)}" r="${f1(14 + h(i, 193) * 18)}" fill="url(#k1fire)" class="k1-fl" style="animation-delay:-${f1(h(i, 194) * 1.6)}s"/>`;
  /* Onearm's Host's camp in the fields: rows of tents in perspective, fires among them */
  let tn = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 22; c++) { const y = HZ + 34 + r * 16, k = .5 + r * .22, x = 120 + c * (34 + r * 8) + (r % 2) * 14 + (h(r * 30 + c, 201) - .5) * 8; if (x > 1100) continue;
    tn += `<path d="M${f1(x - 9 * k)} ${f1(y)} L${f1(x)} ${f1(y - 11 * k)} L${f1(x + 9 * k)} ${f1(y)} Z" fill="#1c1418"/><path d="M${f1(x - 9 * k)} ${f1(y)} L${f1(x)} ${f1(y - 11 * k)}" stroke="#8a5a40" stroke-width=".8" opacity=".5"/>`;
    if (h(r * 30 + c, 202) < .18) tn += `<circle class="k1-fl" style="animation-delay:-${f1(h(r * 30 + c, 203) * 1.6)}s" cx="${f1(x + 14 * k)}" cy="${f1(y - 2)}" r="${f1(5 + 4 * k)}" fill="url(#k1fire)"/>`; }
  s += tn;
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
/* the book list's cover: frame the five on the rise */
BOOKS.gotm.coverPos = '80% 50%';
