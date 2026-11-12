/* ============ Book Ten's title: the Glass Desert by night, and two who stay awake (v13.0, redrawn v13.1.1, 180b) ============
   The painted title (ART 'title/tcg', drawn by Claude for this game from a seeded generator): night in the Glass Desert. A sky crowded with
   stars and the long pale river of the sky, over a plain of cracked glass plates that throw the stars back, so they are above and below;
   shards standing up out of it catching the light. Far off, the army walking east to the horizon without a lamp, soldiers bent under packs,
   a wagon with heavies in the traces, each one doubled in the glass. In the foreground, seen from behind on their packs, two soldiers
   sitting shoulder to shoulder, awake, watching it go: a Malazan heavy in scale, helm and a cloak over one shoulder, the big sword across the
   knees; a Letherii in a quilted coat and round padded cap, spear held upright. Between them on the glass, an empty water-skin laid flat.
   Nobody sleeps; somebody has to see it. Nothing in the sky is named or explained (rules 98, 107).
   The patch (ART 'insignia/tcg'): the two squads' own patches side by side, as Books Seven and Nine (Book Nine's rule: two 290-wide inner
   patches in a 600-wide SVG, so 029's tpatch2 rule shows them at single size): the Third's (Book Four's lozenge) with a shard of glass
   stitched under it in pale thread; the Sixth Company's (Book Five's coin) with a small ship under sail.
   Motion: the .k10-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  const h = (i, s) => hash(i, s), f1 = n => Math.round(n * 10) / 10;
  const W = 1600, H = 900, HZ = 500, VX = 1080; // the horizon and where the plates' lines meet
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k10-tw{animation:k10-tw 5s ease-in-out infinite}.k10-gl{animation:k10-gl 7s ease-in-out infinite}.k10-march{animation:k10-march 2.4s ease-in-out infinite}
.k10-br{animation:k10-br 6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
@keyframes k10-tw{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes k10-gl{0%,100%{opacity:0}45%{opacity:0}55%{opacity:.9}65%{opacity:0}}
@keyframes k10-march{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-.8px)}}
@keyframes k10-br{0%,100%{transform:scale(1,1)}50%{transform:scale(1,1.006)}}
@media (prefers-reduced-motion:reduce){.k10-tw,.k10-gl,.k10-march,.k10-br{animation:none}}.reduce .k10-tw,.reduce .k10-gl,.reduce .k10-march,.reduce .k10-br{animation:none}</style>
<defs><linearGradient id="k10sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03050b"/><stop offset=".5" stop-color="#0a1022"/><stop offset=".88" stop-color="#18243c"/><stop offset="1" stop-color="#2c3c58"/></linearGradient>
<linearGradient id="k10glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3c5068"/><stop offset=".18" stop-color="#1c2a3c"/><stop offset=".6" stop-color="#0c131e"/><stop offset="1" stop-color="#05080e"/></linearGradient>
<radialGradient id="k10band" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#d4dcf4" stop-opacity=".22"/><stop offset=".6" stop-color="#9aa8d0" stop-opacity=".08"/><stop offset="1" stop-color="#9aa8d0" stop-opacity="0"/></radialGradient>
<radialGradient id="k10glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#8aa0c8" stop-opacity=".35"/><stop offset="1" stop-color="#8aa0c8" stop-opacity="0"/></radialGradient>
<linearGradient id="k10shard" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfe0f4" stop-opacity=".75"/><stop offset=".5" stop-color="#5a7494" stop-opacity=".45"/><stop offset="1" stop-color="#101a28" stop-opacity=".9"/></linearGradient>
<linearGradient id="k10scale" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7c889c"/><stop offset=".35" stop-color="#3c4454"/><stop offset="1" stop-color="#14181f"/></linearGradient>
<linearGradient id="k10coat" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a5a74"/><stop offset=".4" stop-color="#26324a"/><stop offset="1" stop-color="#10161f"/></linearGradient>
<linearGradient id="k10cloak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3430"/><stop offset="1" stop-color="#16120f"/></linearGradient>
<linearGradient id="k10pack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c463a"/><stop offset="1" stop-color="#14120e"/></linearGradient>
<filter id="k10soft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="22"/></filter><filter id="k10soft2" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="8"/></filter><clipPath id="k10torso"><path d="M-78 -150 Q-84 -60 -64 0 L64 0 Q82 -60 76 -150 Q40 -168 0 -168 Q-42 -168 -78 -150 Z"/></clipPath></defs>
<rect width="${W}" height="${H}" fill="url(#k10sky)"/>`;
  /* the river of the sky: layered glow, slanting, with a dark lane of dust down its middle */
  s += `<g transform="rotate(-16 820 250)"><ellipse cx="820" cy="250" rx="980" ry="150" fill="url(#k10band)"/><g filter="url(#k10soft)"><ellipse cx="760" cy="240" rx="620" ry="60" fill="#b8c4e4" opacity=".14"/><ellipse cx="1000" cy="256" rx="380" ry="40" fill="#c8d0ec" opacity=".1"/></g><g filter="url(#k10soft2)"><path d="M300 252 Q620 238 900 260 Q1120 276 1400 256" stroke="#03050b" stroke-width="22" fill="none" opacity=".28"/><path d="M520 236 Q700 226 820 240" stroke="#03050b" stroke-width="12" fill="none" opacity=".22"/></g></g>`;
  /* the stars: dense in the river, sparse elsewhere; a few that twinkle, a few bright with a cross of light */
  let st = ''; for (let i = 0; i < 380; i++) { let x = h(i, 11) * W, y = Math.pow(h(i, 12), 1.1) * (HZ - 8);
    if (i % 2 === 0) { const t = h(i, 16) * 2 - 1, along = h(i, 17) * 1900 - 150; x = along; y = 250 - (along - 820) * Math.tan(16 * Math.PI / 180) + t * 90 * (1 - Math.abs(t) * .4); if (y < 0 || y > HZ - 8 || x < 0 || x > W) continue; }
    const r = .35 + Math.pow(h(i, 13), 3.2) * 1.7, op = .3 + h(i, 14) * .65;
    st += i % 11 === 0 ? `<circle class="k10-tw" style="animation-delay:-${f1(h(i, 15) * 5)}s" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r + .3)}" fill="#eef2ff"/>` : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#dfe6f8" opacity="${f1(op)}"/>`; }
  s += st;
  for (let i = 0; i < 7; i++) { const x = 60 + h(i, 18) * 1480, y = 20 + h(i, 19) * 300, r = 1.6 + h(i, 20) * 1.2;
    s += `<g class="k10-tw" style="animation-delay:-${f1(h(i, 21) * 5)}s"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * 5)}" fill="url(#k10glow)"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#f4f7ff"/><path d="M${f1(x - r * 6)} ${f1(y)} L${f1(x + r * 6)} ${f1(y)} M${f1(x)} ${f1(y - r * 6)} L${f1(x)} ${f1(y + r * 6)}" stroke="#e8eeff" stroke-width=".6" opacity=".5"/></g>`; }
  /* the glass plain to the horizon, with a low far ridge of glass and a band of sky-light lying on it */
  s += `<rect y="${HZ}" width="${W}" height="${H - HZ}" fill="url(#k10glass)"/>`;
  s += `<path d="M0 ${HZ} Q200 ${HZ - 9} 420 ${HZ - 4} Q640 ${HZ + 1} 860 ${HZ - 7} Q1160 ${HZ - 12} 1360 ${HZ - 3} Q1500 ${HZ + 2} ${W} ${HZ - 5} L${W} ${HZ + 4} L0 ${HZ + 4} Z" fill="#1a2638"/>`;
  s += `<path d="M0 ${HZ} Q200 ${HZ - 9} 420 ${HZ - 4} Q640 ${HZ + 1} 860 ${HZ - 7} Q1160 ${HZ - 12} 1360 ${HZ - 3} Q1500 ${HZ + 2} ${W} ${HZ - 5}" stroke="#b4c6e2" stroke-width="1.2" fill="none" opacity=".5"/>`;
  s += `<ellipse cx="760" cy="${HZ + 40}" rx="760" ry="34" fill="#9ab0d4" opacity=".08"/>`;
  /* the plates: a perspective grid of jittered points, each plate its own shade of thrown-back sky, the cracks between them catching light */
  const ROWS = 12, COLS = 20, P = [];
  for (let r = 0; r <= ROWS; r++) { const t = r / ROWS, y = HZ + 6 + Math.pow(t, 1.9) * (H - HZ + 40); P.push([]);
    for (let c = 0; c <= COLS; c++) { const u = (c / COLS - .5) * 2, spread = .06 + Math.pow(t, 1.9) * 1.6, x = VX + u * W * spread + (h(r * 40 + c, 61) - .5) * 150 * Math.pow(t, 1.4) * (c % COLS ? 1 : 0), jy = (h(r * 40 + c, 62) - .5) * 46 * Math.pow(t, 1.4) * (r ? 1 : 0);
      P[r].push([x, y + jy]); } }
  let pl = '', crA = '', crB = '', crC = '';
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) { const a = P[r][c], b = P[r][c + 1], d = P[r + 1][c + 1], e = P[r + 1][c], t = r / ROWS, k = h(r * 40 + c, 63);
    const shade = k < .14 ? '#5a7090' : k < .45 ? '#22324a' : k < .8 ? '#141e2e' : '#080d16', op = (.1 + k * .18) * (1 - t * .3);
    pl += `<path d="M${Math.round(a[0])} ${Math.round(a[1])}L${Math.round(b[0])} ${Math.round(b[1])}L${Math.round(d[0])} ${Math.round(d[1])}L${Math.round(e[0])} ${Math.round(e[1])}Z" fill="${shade}" opacity="${Math.round(op * 100) / 100}"/>`;
    if (h(r * 40 + c, 64) < .42) crA += `M${Math.round(a[0])} ${Math.round(a[1])}L${Math.round(b[0])} ${Math.round(b[1])}`;
    if (h(r * 40 + c, 65) < .38) crB += `M${Math.round(a[0])} ${Math.round(a[1])}L${Math.round(e[0])} ${Math.round(e[1])}`;
    if (h(r * 40 + c, 66) < .3 && t > .15) crC += `M${Math.round(a[0])} ${Math.round(a[1])}L${Math.round(d[0])} ${Math.round(d[1])}`; }
  s += pl + `<path d="${crA}" stroke="#a8bcd8" stroke-width="1.1" opacity=".22" fill="none"/><path d="${crB}" stroke="#8aa0c0" stroke-width="1" opacity=".18" fill="none"/><path d="${crC}" stroke="#c4d4ec" stroke-width="1.2" opacity=".16" fill="none"/>`;
  /* the stars again, below: the brighter ones thrown back by the glass, dimmer and broken */
  let rf = ''; for (let i = 0; i < 180; i++) { const x = h(i, 11) * W, y0 = Math.pow(h(i, 12), 1.1) * (HZ - 8), d = 1 - y0 / HZ, y = HZ + 8 + Math.pow(d, 1.3) * (H - HZ) * .9, r = .35 + Math.pow(h(i, 13), 3.2) * 1.7;
    if (r < .7 && h(i, 24) < .6) continue; rf += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r * (1 + d * 2.4))}" ry="${f1(r * .55)}" fill="#cfdcf4" opacity="${f1(.12 + (1 - d) * .32)}"/>`; }
  s += rf;
  /* shards standing up out of the plain, the near ones bigger, each with a lit edge */
  let sh = ''; for (let i = 0; i < 18; i++) { const t = .08 + h(i, 71) * .7, y = HZ + 6 + Math.pow(t, 1.9) * (H - HZ + 40), x = 40 + h(i, 72) * 1520, sz = 6 + Math.pow(t, 1.5) * 70, lean = (h(i, 73) - .5) * sz * .6;
    if (x > 1050 && x < 1540 && y > 640) continue;
    sh += `<path d="M${f1(x - sz * .32)} ${f1(y)} L${f1(x + lean)} ${f1(y - sz)} L${f1(x + sz * .28)} ${f1(y)} Z" fill="url(#k10shard)"/><path d="M${f1(x - sz * .32)} ${f1(y)} L${f1(x + lean)} ${f1(y - sz)}" stroke="#e8f0ff" stroke-width="${f1(.6 + t)}" opacity=".55"/><path d="M${f1(x - sz * .34)} ${f1(y + 1)} L${f1(x + sz * .3)} ${f1(y + 1)}" stroke="#05070b" stroke-width="${f1(1 + t * 2)}" opacity=".6"/>`; }
  s += sh;
  /* the glints that come and go */
  for (let i = 0; i < 30; i++) { const d = h(i, 51), x = h(i, 52) * W, y = HZ + 14 + Math.pow(d, 1.6) * (H - HZ - 60), r = 2 + d * 6;
    s += `<g class="k10-gl" style="animation-delay:-${f1(h(i, 53) * 7)}s"><path d="M${f1(x - r)} ${f1(y)} L${f1(x + r)} ${f1(y)} M${f1(x)} ${f1(y - r)} L${f1(x)} ${f1(y + r)}" stroke="#f0f6ff" stroke-width="1"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * .35)}" fill="#f0f6ff" opacity=".7"/></g>`; }
  /* the army: walking east to the horizon, no lamps; soldiers bent under packs, spears, a few banners furled, a wagon with heavies in the traces.
     Each figure doubled, dim, in the glass. */
  const walker = (x, y, k, i) => { const lean = 2 + h(i, 81) * 3, tall = 20 + h(i, 82) * 5, spear = h(i, 83) < .4, pack = h(i, 84) < .8;
    const fig = `<path d="M${-3} 0 L${-2} ${-tall * .45} L${-3 + lean * .3} ${-tall * .85} L${3 + lean * .3} ${-tall * .85} L${3} ${-tall * .45} L${3} 0 Z"/><circle cx="${f1(lean * .5)}" cy="${f1(-tall - 2)}" r="3.2"/>${pack ? `<rect x="${f1(-7 + lean * .2)}" y="${f1(-tall * .85)}" width="6" height="9" rx="2"/>` : ''}${spear ? `<path d="M5 2 L${f1(6 + lean)} ${f1(-tall - 14)}" stroke="#05070c" stroke-width="1.3"/>` : ''}`;
    return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})" fill="#05070c">${fig}</g><g transform="translate(${f1(x)} ${f1(y + 1)}) scale(${f1(k)} ${f1(-k * .7)})" fill="#2a3a52" opacity=".35">${fig}</g>`; };
  const wagon = (x, y, k) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})" fill="#05070c"><path d="M-16 -22 Q0 -38 16 -22 L16 -9 L-16 -9 Z" fill="#141c2a"/><rect x="-17" y="-11" width="34" height="5"/><circle cx="-10" cy="-4" r="5"/><circle cx="10" cy="-4" r="5"/><path d="M-17 -10 L-30 -12" stroke="#05070c" stroke-width="1.6"/>${[-34, -42].map(dx => `<g transform="translate(${dx} 0)"><path d="M-3 0 L-2 -10 L1 -19 L6 -19 L4 -10 L4 0 Z"/><circle cx="4" cy="-22" r="3.4"/></g>`).join('')}</g>`;
  let col = ''; const N = 46;
  for (let i = 0; i < N; i++) { const t = Math.pow(i / (N - 1), .85), x = 240 + t * 820 + (h(i, 85) - .5) * 14, y = 640 - Math.pow(t, .5) * 136, k = 1.05 - t * .88;
    if (i % 15 === 7) col += wagon(x, y, k); else col += walker(x, y, k, i); }
  s += `<g class="k10-march">${col}</g>`;
  /* the foreground: a low swell of darker glass the two sit on, its broken edge lit */
  s += `<path d="M0 ${H} L0 812 Q260 784 520 792 L560 780 L600 794 Q820 804 1040 794 L1080 784 L1110 798 Q1340 790 1600 764 L1600 ${H} Z" fill="#04060a"/>`;
  s += `<path d="M0 812 Q260 784 520 792 L560 780 L600 794 Q820 804 1040 794 L1080 784 L1110 798 Q1340 790 1600 764" stroke="#9ab0d0" stroke-width="1.6" fill="none" opacity=".45"/>`;
  s += `<ellipse cx="1290" cy="858" rx="230" ry="14" fill="#a8bcd8" opacity=".07"/>`;
  /* the two, seen from behind on their packs, shoulder to shoulder; starlight rims them from the upper left */
  const rim = (d, w = 2.2, op = .55) => `<path d="${d}" stroke="#d8e4f8" stroke-width="${w}" fill="none" stroke-linecap="round" opacity="${op}"/>`;
  // the heavy (left): scale coat, pauldrons, helm with a mail drape, a cloak over the left shoulder, the big sword across the knees
  let sd = '', sl = '', sr = ''; for (let r = 0; r < 12; r++) for (let c = -6; c <= 6; c++) { const x = c * 13 + (r % 2 ? 6.5 : 0), y = -160 + r * 14;
    sd += `M${x - 6.5} ${y}Q${x} ${y + 12} ${x + 6.5} ${y}`; const hl = `M${x - 5} ${y + 2}Q${x - 1} ${y + 8} ${x} ${y + 9}`; if (c < 0) sl += hl; else sr += hl; }
  const scales = `<path d="${sd}" stroke="#0c0f15" stroke-width="1.6" fill="none" opacity=".7"/><path d="${sl}" stroke="#a8b4c8" stroke-width=".8" fill="none" opacity=".4"/><path d="${sr}" stroke="#a8b4c8" stroke-width=".8" fill="none" opacity=".15"/>`;
  const heavy = `<g transform="translate(-92 0)">
<path d="M-236 -18 L-60 -28" stroke="#9aa6b8" stroke-width="7" stroke-linecap="round"/><path d="M-236 -18 L-60 -28" stroke="#4a5262" stroke-width="2"/><path d="M-232 -21 L-120 -27" stroke="#e8f0ff" stroke-width="1.4" opacity=".6"/>
<path d="M60 -32 L96 -34" stroke="#2a2018" stroke-width="7" stroke-linecap="round"/><rect x="54" y="-46" width="8" height="28" rx="2" fill="#3a3024"/><circle cx="100" cy="-34" r="5" fill="#6a5a40"/>
<rect x="-70" y="-16" width="140" height="44" rx="12" fill="url(#k10pack)" stroke="#040508" stroke-width="3"/><path d="M-60 0 L60 0" stroke="#2a261e" stroke-width="2"/>
<path d="M-78 -150 Q-84 -60 -64 0 L64 0 Q82 -60 76 -150 Q40 -168 0 -168 Q-42 -168 -78 -150 Z" fill="url(#k10scale)" stroke="#040508" stroke-width="3"/>
<g clip-path="url(#k10torso)">${scales}</g>
<path d="M-66 -20 L66 -20" stroke="#2a2418" stroke-width="7"/><rect x="-6" y="-26" width="12" height="12" rx="2" fill="#6a5a40"/>
<path d="M-80 -150 Q-120 -130 -112 -50 Q-108 -20 -96 -8 L-70 -10 Q-80 -60 -66 -150 Z" fill="url(#k10cloak)" stroke="#040508" stroke-width="2.5"/>
<path d="M-88 -148 Q-106 -110 -102 -40" stroke="#5a5048" stroke-width="2" fill="none" opacity=".5"/>
<path d="M76 -150 Q104 -120 100 -60 Q98 -36 90 -24" stroke="#1a1e26" stroke-width="22" stroke-linecap="round" fill="none"/>
<ellipse cx="-62" cy="-156" rx="30" ry="18" fill="#5a6476" stroke="#040508" stroke-width="2.5"/><ellipse cx="62" cy="-156" rx="30" ry="18" fill="#2a303c" stroke="#040508" stroke-width="2.5"/>
<path d="M-90 -160 Q-62 -178 -34 -162" stroke="#0c0f15" stroke-width="2" fill="none" opacity=".7"/>
<path d="M-36 -166 Q-40 -184 -30 -194 Q0 -200 30 -194 Q40 -184 36 -166 Q0 -158 -36 -166 Z" fill="#3a4250" stroke="#040508" stroke-width="2.5"/>
${[...Array(6)].map((_, i) => `<path d="M${-30 + i * 12} -164 Q${-29 + i * 12} -180 ${-26 + i * 10.4} -192" stroke="#1a1e26" stroke-width="1.3" fill="none" opacity=".55"/>`).join('')}
<path d="M-36 -190 Q-38 -240 0 -244 Q38 -240 36 -190 Z" fill="#606a7c" stroke="#040508" stroke-width="3"/><path d="M-42 -190 Q0 -196 42 -190" stroke="#2a303c" stroke-width="7" stroke-linecap="round" fill="none"/>
<path d="M0 -244 L0 -192" stroke="#2a303c" stroke-width="4" opacity=".7"/>
${rim('M-34 -200 Q-34 -236 -2 -242')}${rim('M-110 -60 Q-118 -120 -84 -150', 2, .4)}${rim('M-90 -160 Q-70 -172 -44 -168', 1.8, .45)}
</g>`;
  // the Letherii (right): quilted coat, a round padded cap, a short neck-cloth, the spear held upright in the right hand
  let quilt = ''; for (let c = -4; c <= 4; c++) quilt += `<path d="M${c * 15} -146 L${c * 14} -4" stroke="#0a0e16" stroke-width="1.6" opacity=".55"/>`;
  for (let r = 0; r < 6; r++) quilt += `<path d="M-64 ${-128 + r * 22} Q0 ${-122 + r * 22} 64 ${-128 + r * 22}" stroke="#0a0e16" stroke-width="1.2" fill="none" opacity=".35"/>`;
  const leth = `<g transform="translate(96 4)">
<rect x="-62" y="-18" width="124" height="42" rx="12" fill="url(#k10pack)" stroke="#040508" stroke-width="3"/>
<path d="M-62 -140 Q-70 -60 -56 0 L56 0 Q68 -60 62 -140 Q32 -156 0 -156 Q-34 -156 -62 -140 Z" fill="url(#k10coat)" stroke="#040508" stroke-width="3"/>
<g clip-path="url(#k10torso)">${quilt}</g>
<path d="M-60 -22 L60 -22" stroke="#1c1610" stroke-width="5"/>
<path d="M-62 -138 Q-86 -110 -84 -60 Q-82 -36 -74 -22" stroke="#1e2a3c" stroke-width="20" stroke-linecap="round" fill="none"/>
<path d="M62 -138 Q92 -150 104 -188" stroke="#1a2232" stroke-width="20" stroke-linecap="round" fill="none"/>
<path d="M116 -470 L112 30" stroke="#4a3a2a" stroke-width="6" stroke-linecap="round"/><path d="M116 -500 L124 -468 L108 -468 Z" fill="#b4bfd0" stroke="#040508" stroke-width="1.5"/><path d="M110 -472 L122 -472" stroke="#2a2018" stroke-width="4"/>
<ellipse cx="108" cy="-194" rx="11" ry="9" fill="#3a2e24"/>
<path d="M-22 -158 Q-24 -172 -16 -180 L16 -180 Q24 -172 22 -158 Q0 -152 -22 -158 Z" fill="#5a4a38" stroke="#040508" stroke-width="2"/>
<path d="M-32 -186 Q-36 -232 0 -236 Q36 -232 32 -186 Q0 -178 -32 -186 Z" fill="#3c4456" stroke="#040508" stroke-width="3"/>
${[...Array(5)].map((_, i) => `<path d="M${-24 + i * 12} -184 Q${-20 + i * 10} -212 ${-8 + i * 4} -232" stroke="#1a1e28" stroke-width="1.4" fill="none" opacity=".55"/>`).join('')}
<path d="M-34 -188 Q0 -194 34 -188" stroke="#20262f" stroke-width="5" fill="none"/>
${rim('M-30 -196 Q-32 -228 -4 -234')}${rim('M-70 -110 Q-76 -136 -60 -142', 2, .4)}${rim('M115 -460 L113 -260', 1.2, .35)}
</g>`;
  const skin = `<path d="M-30 30 Q-12 20 8 22 Q28 26 24 36 Q6 42 -16 40 Q-32 38 -30 30 Z" fill="#4a3a28" stroke="#040508" stroke-width="2"/><path d="M20 26 L32 18" stroke="#4a3a28" stroke-width="4" stroke-linecap="round"/>${rim('M-22 26 Q-8 20 6 22', 1.2, .35)}`;
  s += `<g class="k10-br"><g transform="translate(1290 836) scale(.92)">${heavy}${leth}${skin}</g></g>`;
  s += `</svg>`;
  ART['title/tcg'] = s; ART_SIZE['title/tcg'] = [W, H];


  /* the patch (Book Nine's rule: two inner patches side by side in a 600-wide SVG): the Third's (insignia/hoc) with a shard of glass stitched
     under it; the Sixth Company's (insignia/mt) with a small ship under sail */
  const inner = (k, x) => (ART[k] || '').replace(/^<svg /, `<svg x="${x}" y="0" width="290" height="330" `);
  ART['insignia/tcg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" role="img" aria-label="The two squads' patches, Book Ten: the Third's with a shard of glass stitched under it, and the Sixth Company's with a small ship under sail">
${inner('insignia/hoc', 0)}${inner('insignia/mt', 310)}
<g transform="translate(145 352)"><path d="M-14 12 L-4 -20 L6 -8 L16 14 Z" fill="#9ab8d4" fill-opacity=".55" stroke="#e8f2ff" stroke-width="1.8" stroke-dasharray="4 3"/><path d="M-4 -20 L-2 10" stroke="#e8f2ff" stroke-width="1" opacity=".7"/><path d="M-30 16 L30 16" stroke="#e0c890" stroke-width="1.6" stroke-dasharray="3 3"/></g>
<g transform="translate(455 352)"><path d="M-20 6 L20 6 L14 16 L-14 16 Z" fill="#5a4630" stroke="#e0c890" stroke-width="1.6"/><path d="M0 6 L0 -24" stroke="#e0c890" stroke-width="1.8"/><path d="M2 -22 L18 2 L2 2 Z" fill="#d8ccb0" stroke="#4a3a24" stroke-width="1.2"/><path d="M-2 -18 L-14 2 L-2 2 Z" fill="#c8bca0" stroke="#4a3a24" stroke-width="1.2"/><path d="M-30 20 Q-15 16 0 20 Q15 24 30 20" stroke="#8ab0c8" stroke-width="1.6" fill="none" stroke-dasharray="3 3"/></g></svg>`;
}
/* Settings › Artwork off: the title's canvas backdrop borrows Book Four's desert until Book Ten has its own */
{ const _stb = startTitleBackdrop; startTitleBackdrop = function(cv, b){ return _stb(cv, b === 'tcg' ? 'hoc' : b); }; }

/* ---------------- the busts (the bust rules: each its own neckline by kit, a short natural neck, the garment blending up into the
   shoulders, every prop held, slung or belted). Lantern low left, a rim of the soldier's own colour on the right. ---------------- */
/* Pruss: twenty-four, a carter's son and a heavy; broad, young, cropped hair, a scar through the left brow; a heavy's scale patched with a
   different set of plates on the right shoulder; a leather trace-strap across the chest from the haul; his old sergeant's helm slung at the back */
POR.pruss = function(ctx){ const F = {cy:-74, w:13.4, h:19.8, jaw:.92, chin:5.4, skin:'#b8906c', iris:'#3a3024', lip:'#8a5a46', browCol:'#4a3a2a', browW:2, arch:.25, browL:.1, browR:.2, rim:'#8a7a62', rimA:.22, nose:1.4, look:-.1, smileL:.05, smileR:-.05, mouthW:4, age:.05, bags:.2, open:.84};
  ctx.save(); ctx.beginPath(); ctx.ellipse(-34, -42, 11, 8, -.5, Math.PI, 0); ctx.closePath(); ctx.fillStyle = PR.lit(ctx, '#7a8090', '#1e2026', -44, -24); ctx.fill(); ctx.restore(); // the old sergeant's helm, slung behind the shoulder
  PR.neck(ctx, F, 10);
  const B = BP.body(ctx, F, {wide:44, drop:2, trap:7, nx:12, ny:F.cy + 15.2, cb:F.cy + 20.8, c1:'#7e7666', c2:'#22201a'});
  ctx.save(); B.path(); ctx.clip(); BP.scales(ctx, -48, 48, -60, 4, 5.6, '#7a7464', 177); BP.scales(ctx, 18, 48, -52, 4, 5, '#6a6a72', 179); // the patched plates
    PR.stroke(ctx, '#3a2818', 5, () => { ctx.moveTo(-34, -40); ctx.lineTo(30, 12); }); PR.stroke(ctx, 'rgba(255,220,180,.18)', 1, () => { ctx.moveTo(-34, -42); ctx.lineTo(30, 10); }); // the trace-strap
    PR.soft(ctx, 22, -16, 18, 20, '#000000', .45); ctx.restore();
  BP.light(ctx, F, B, false);
  BP.collar(ctx, F, '#6a6458', '#1e1c18', 'rgba(0,0,0,.45)', {style:'wrap', sw:26, sy:-44});
  F.under = (ctx, F) => { PR.dots(ctx, F, 40, 'rgba(60,44,30,.24)', .4, [5, 18]); };
  PR.face(ctx, F);
  const u = F.h/20; PR.stroke(ctx, 'rgba(120,70,50,.6)', .9, () => { ctx.moveTo(-F.w*.5, F.cy - 7.4*u); ctx.lineTo(-F.w*.3, F.cy - 3.6*u); }); // the scar through the brow
  BP.hair(ctx, F, {c:['#5a4634', '#3a2a1c', '#1a120a'], v:.6, wx:.95, hl:6, ey:-3.4, n:46, sw:.36, seed:181, sh:'#c8b090', shA:.12});
  return F; };
/* Tirren: twenty-one, a farrier's daughter; sun-browned, freckled; hair tied up under a dust scarf; a leather farrier's apron over a quilted
   shirt; a rasp on a thong at the throat; the farrier's hammer's head up by the right shoulder, held */
POR.tirren = function(ctx){ const F = {cy:-75, w:11.2, h:19.4, jaw:.7, chin:3.9, skin:'#c49a76', iris:'#4a3a24', lip:'#9a5a4a', browCol:'#4a321e', browW:1.05, arch:.65, browL:.3, browR:.3, rim:'#a07a5a', rimA:.22, nose:1.1, look:.25, smileL:.15, smileR:.1, mouthW:3.3, age:0, bags:.1, open:.88};
  ctx.save(); ctx.beginPath(); ctx.moveTo(-F.w - 4, F.cy - 6); ctx.quadraticCurveTo(-F.w - 7, F.cy + 18, -F.w - 2, -44); ctx.lineTo(F.w + 2, -44); ctx.quadraticCurveTo(F.w + 7, F.cy + 18, F.w + 4, F.cy - 6); ctx.closePath();
    ctx.fillStyle = PR.lit(ctx, '#9a6a40', '#2a160a', -F.w, F.w); ctx.fill(); ctx.restore(); // her hair, long, down behind to the shoulders
  PR.stroke(ctx, '#4a3624', 3.4, () => { ctx.moveTo(22, 6); ctx.lineTo(28, -84); }); ctx.save(); ctx.translate(28.6, -88); ctx.rotate(.1); ctx.fillStyle = '#5a5a5e'; ctx.fillRect(-7, -3, 14, 6); ctx.restore(); // the hammer
  PR.neck(ctx, F, 7.6);
  const B = BP.body(ctx, F, {wide:32, drop:3, nx:F.w*.66 + 2.4, ny:F.cy + 14, cb:-45, c1:'#a89272', c2:'#2a2016'});
  ctx.save(); B.path(); ctx.clip(); ctx.fillStyle = PR.lit(ctx, '#7a5a3e', '#1e140a', -28, 28); ctx.fillRect(-22, -38, 44, 60); // the apron
    PR.stroke(ctx, '#2a1a0c', 1.6, () => { ctx.moveTo(-20, -38); ctx.lineTo(-16, 8); ctx.moveTo(20, -38); ctx.lineTo(16, 8); }); PR.soft(ctx, 18, -16, 14, 14, '#000000', .4); ctx.restore();
  BP.light(ctx, F, B, false);
  BP.collar(ctx, F, '#b8a688', '#3a3024', 'rgba(0,0,0,.4)', {style:'rib', sw:20, sy:-44});
  for (let i = 0; i < 6; i++) ell(ctx, -F.w*.9 - 1 + i * .5, F.cy + 12 + i * 5.2, 2.6, 2, i % 2 ? '#7a4e2c' : '#9a6a40'); // the braid over the left shoulder
  PR.stroke(ctx, '#2a2018', .6, () => { ctx.moveTo(-4, -50); ctx.quadraticCurveTo(0, -42, 4, -50); }); ctx.save(); ctx.translate(0, -40); ctx.fillStyle = '#7a7a80'; ctx.fillRect(-1, -5, 2, 9); ctx.restore(); // the rasp on its thong
  PR.face(ctx, F);
  const u = F.h/20, top = F.cy - 21*u;
  for (let i = 0; i < 10; i++) { const r = PR.rng(i + 2101); ell(ctx, (r() < .5 ? -1 : 1) * (3 + r() * 3.4), F.cy + .6*u + r() * 1.6*u, .32, .32, 'rgba(130,70,40,.35)'); } // freckles across the cheeks
  BP.hair(ctx, F, {c:['#9a6a40', '#6a4228', '#2a160a'], v:1.2, wx:.92, hl:12, ey:-2.4, n:60, sw:.42, seed:2111, sh:'#e0b890', shA:.18}); // the hair, loose at the sides under the scarf
  ctx.save(); ctx.beginPath(); ctx.moveTo(-F.w - 2.6, top + 10.6*u); ctx.quadraticCurveTo(-F.w - 2, top - 3*u, 0, top - 3.6*u); ctx.quadraticCurveTo(F.w + 2, top - 3*u, F.w + 2.6, top + 10.6*u);
    ctx.quadraticCurveTo(0, top + 6.2*u, -F.w - 2.6, top + 10.6*u); ctx.closePath(); ctx.fillStyle = PR.lit(ctx, '#a6845e', '#2a1e12', -F.w, F.w); ctx.fill(); ctx.restore(); // the dust scarf over the crown
  PR.stroke(ctx, 'rgba(30,20,10,.5)', .8, () => { ctx.moveTo(-F.w - 2.4, top + 10*u); ctx.quadraticCurveTo(0, top + 6*u, F.w + 2.4, top + 10*u); });
  PR.stroke(ctx, 'rgba(255,236,210,.25)', .7, () => { ctx.moveTo(-F.w, top + 1*u); ctx.quadraticCurveTo(-F.w*.4, top - 2.6*u, 0, top - 3*u); });
  ctx.save(); ctx.translate(F.w + 1.6, top + 9*u); ctx.rotate(.4); ctx.fillStyle = '#8a6a48'; ctx.fillRect(0, 0, 3.4, 9); ctx.restore(); // the knot's tail
  return F; };
