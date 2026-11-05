/* ============ the item art pass (v8.1.x): Book Two's kit, redrawn ============
   Overrides ART['item/b2_*'] (first drawn by tools/art_dg_items.py into the boards; the boards stay as they are). One look for the
   series: 200×150, a sand-dark vignette, light from the upper left, a soft ground shadow, thin dark outlines, materials that read.
   Long things lie on the diagonal, grip lower-left. Bows are strung and carry no arrow through them; the Trygalle crossbow's bolt
   lies in its groove. Every gradient id is prefixed per item ('§' below becomes 'b2x<id>-'), so nothing bleeds between pictures. */
(() => {
  if (typeof ART === 'undefined') return;
  const O = 'stroke="#0b0806" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round"';
  const stops = s => s.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('');
  const lin = (id, s, d) => `<linearGradient id="§${id}" x1="0" y1="0" x2="${d ? 1 : 0}" y2="1">${stops(s)}</linearGradient>`;
  const rad = (id, s, cx = .5, cy = .5, r = .5) => `<radialGradient id="§${id}" cx="${cx}" cy="${cy}" r="${r}">${stops(s)}</radialGradient>`;
  const ST = [[0, '#f0f3f6'], [.38, '#b6bcc4'], [.72, '#6c727a'], [1, '#383d44']];
  const IR = [[0, '#8a8e94'], [.45, '#4a4e54'], [1, '#18191c']];
  const CI = [[0, '#d4e4f2'], [.4, '#8496ac'], [1, '#26303e']];
  const WD = [[0, '#a07650'], [.5, '#6a4a2c'], [1, '#33210f']];
  const LT = [[0, '#94704a'], [.55, '#644430'], [1, '#2e1e12']];
  const BN = [[0, '#f6eed8'], [.5, '#dccca4'], [1, '#93805a']];
  const BR = [[0, '#f4da94'], [.45, '#c49e4c'], [1, '#64481a']];
  const LIB = {
    bg: rad('bg', [[0, '#3b2f1f'], [1, '#120e09']], .44, .4, .74),
    sh: rad('sh', [[0, '#000', .62], [.6, '#000', .3], [1, '#000', 0]]),
    st: lin('st', ST), std: lin('std', ST, 1), ir: lin('ir', IR), ird: lin('ird', IR, 1), ci: lin('ci', CI),
    wd: lin('wd', WD), wdd: lin('wdd', WD, 1), lt: lin('lt', LT), ltd: lin('ltd', LT, 1),
    bn: lin('bn', BN), bnd: lin('bnd', BN, 1), br: lin('br', BR), brd: lin('brd', BR, 1),
    ml: lin('ml', [[0, '#c4c6c8'], [.5, '#7c7e80'], [1, '#2c2d2e']], 1),
    ml2: lin('ml2', [[0, '#e2e6ea'], [.5, '#9ca2aa'], [1, '#3c4048']], 1),
    hl: `<linearGradient id="§hl" x1="0" y1="0" x2="1" y2=".35">${stops([[0, '#fff', .2], [.3, '#fff', 0], [.6, '#000', 0], [1, '#000', .55]])}</linearGradient>`,
    vs: lin('vs', [[0, '#fff', .16], [.4, '#fff', 0], [.7, '#000', 0], [1, '#000', .45]]),
    rb: rad('rb', [[0, '#c4c6ca'], [.55, '#6e7076'], [1, '#26272a']], .36, .32, .7),
    gw: rad('gw', [[0, '#e8c98a', .3], [1, '#e8c98a', 0]]),
    gc: rad('gc', [[0, '#bfe8ff', .32], [1, '#bfe8ff', 0]]),
    gv: rad('gv', [[0, '#a070e0', .3], [1, '#a070e0', 0]]),
    gt: rad('gt', [[0, '#9ad8c0', .22], [1, '#9ad8c0', 0]]),
    rg: '<pattern id="§rg" width="5" height="4.4" patternUnits="userSpaceOnUse"><circle cx="1.25" cy="1.1" r="1.45" fill="none" stroke="#111" stroke-width=".75" stroke-opacity=".7"/><circle cx="3.75" cy="3.3" r="1.45" fill="none" stroke="#111" stroke-width=".75" stroke-opacity=".7"/><path d="M.2 .6 A1.45 1.45 0 0 1 2 .1 M2.7 2.8 A1.45 1.45 0 0 1 4.5 2.3" fill="none" stroke="#fff" stroke-width=".5" stroke-opacity=".45"/></pattern>',
    sc: '<pattern id="§sc" width="8" height="10" patternUnits="userSpaceOnUse"><path d="M0 0 Q0 5.5 4 6.5 Q8 5.5 8 0 M-4 5 Q-4 10.5 0 11.5 Q4 10.5 4 5 M4 5 Q4 10.5 8 11.5 Q12 10.5 12 5" fill="none" stroke="#15171a" stroke-width=".9"/><path d="M1 .8 Q1.2 4.6 4 5.4 M-3 5.8 Q-2.8 9.6 0 10.4 M5 5.8 Q5.2 9.6 8 10.4" fill="none" stroke="#fff" stroke-width=".55" stroke-opacity=".45"/></pattern>'};
  const sh = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#§sh)"/>`;
  const rot = (b, cx = 100, cy = 78, a = -35, sx = 1, sy = sx) => `<g transform="translate(${cx} ${cy}) rotate(${a})${sx !== 1 || sy !== 1 ? ` scale(${sx} ${sy})` : ''}">${b}</g>`;
  const rep = (n, f) => Array.from({length: n}, (_, i) => f(i)).join('');
  function put(key, label, body){
    const p = 'b2x' + key.slice(3).replace(/[^a-z0-9]/g, '') + '-';
    const all = '<rect width="200" height="150" rx="3" fill="url(#§bg)"/>' + body;
    const defs = Object.keys(LIB).filter(k => all.includes(`#§${k})`)).map(k => LIB[k]).join('');
    ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="${label}"><defs>${defs}</defs>${all}</svg>`.replace(/§/g, p);
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [200, 150]; }

  /* ---------------- weapons ---------------- */
  /* the auxiliary's tulwar: heavy at the tip, the blue cord on the grip faded nearly white */
  put('b2_auxtulwar', "An auxiliary's tulwar", sh(100, 136, 74, 7) + rot(
    `<path d="M-58 -4 Q8 -6 52 -11 Q80 -14 96 -24 Q92 -6 72 1 Q28 7 -58 5 Z" fill="url(#§st)" ${O}/>`
    + '<path d="M-56 3 Q28 5 70 -1 Q86 -7 93 -20" fill="none" stroke="#fbfcfd" stroke-width="1" opacity=".85"/><path d="M-52 -1.5 Q0 -3 38 -6.5" fill="none" stroke="#3e444c" stroke-width="1.8" opacity=".8"/>'
    + '<path d="M-58 -4 Q8 -6 52 -11 Q80 -14 96 -24" fill="none" stroke="#fff" stroke-width=".7" opacity=".5"/><path d="M40 4 l2 -2 M58 1.5 l1.5 -2.2" stroke="#2a2e34" stroke-width="1.2"/>'
    + `<path d="M-62 -13 Q-58 -15 -55 -12 L-55 12 Q-58 15 -62 13 Z" fill="url(#§br)" ${O}/><path d="M-58 -12 Q-53 -20 -46 -19 M-58 12 Q-53 20 -46 19" fill="none" stroke="#a8823c" stroke-width="3" stroke-linecap="round"/>`
    + `<rect x="-90" y="-4.5" width="29" height="9" rx="2" fill="#2a1d12" ${O}/>` + rep(7, i => `<path d="M${-88 + i * 4} -4.5 l2.6 9" stroke="${i % 3 ? '#c4ccd0' : '#8ea2b6'}" stroke-width="2"/>`)
    + `<circle cx="-95" cy="0" r="6.5" fill="url(#§br)" ${O}/><circle cx="-96.5" cy="-1.8" r="2" fill="#fff4cc" opacity=".55"/>`, 102, 84, -35, .94, 1.25));

  /* the Weasel horse-bow: short, doubled back on itself, horn and sinew, a fresh string. Strung, nothing through it. */
  { const limb = 'M-96 -12 Q-93 -2 -86 2 Q-74 6 -58 -6 Q-32 -24 0 -26 Q32 -24 58 -6 Q74 6 86 2 Q93 -2 96 -12';
    put('b2_horsebow', 'A Weasel horse-bow', sh(98, 136, 72, 7) + rot(
      `<path d="${limb}" fill="none" stroke="#0b0806" stroke-opacity=".7" stroke-width="9.4" stroke-linecap="round"/>`
      + `<path d="${limb}" fill="none" stroke="url(#§bn)" stroke-width="7" stroke-linecap="round"/>`
      + `<path d="${limb}" transform="translate(0 -2.4)" fill="none" stroke="#5a3a22" stroke-width="2.2" stroke-linecap="round" opacity=".9"/>`
      + '<path d="M-84 -.6 Q-72 2.4 -58 -9 Q-32 -27 0 -29 Q32 -27 58 -9 Q72 2.4 84 -.6" fill="none" stroke="#fffaf0" stroke-width=".8" opacity=".5"/>'
      + '<path d="M-96 -12 Q-94 -5 -89 0 M96 -12 Q94 -5 89 0" fill="none" stroke="#2a1a0e" stroke-width="5" stroke-linecap="round"/>'
      + '<path d="M-48 -17 l3 -3 M-43 -19 l3 -3 M43 -19 l3 3 M48 -17 l3 3" stroke="#8a3a22" stroke-width="1.4"/>'
      + `<rect x="-10" y="-32" width="20" height="12" rx="3" fill="url(#§lt)" ${O}/>` + rep(5, i => `<path d="M${-8 + i * 4} -32 l2 12" stroke="#2e1e12" stroke-width="1.1"/>`)
      + '<path d="M-9 -31 L9 -31" stroke="#c49a6a" stroke-width=".8" opacity=".7"/>'
      + '<path d="M-87 2.4 L87 2.4" stroke="#0b0806" stroke-opacity=".5" stroke-width="2.4"/><path d="M-87 2.4 L87 2.4" stroke="#efe6cf" stroke-width="1.1"/>'
      + '<path d="M-89 .6 l3 3.6 M89 .6 l-3 3.6" stroke="#efe6cf" stroke-width="1.4"/><path d="M-6 2.4 L6 2.4" stroke="#8a6a44" stroke-width="2.2"/>', 102, 84)); }

  /* the Semk war-axe: broad in the head, the god's marks burnt into the haft */
  put('b2_semkaxe', 'A Semk war-axe', sh(96, 136, 72, 7) + rot(
    `<path d="M-96 -3.6 L84 -3.6 L84 3.6 L-96 3.6 Z" fill="url(#§wd)" ${O}/><path d="M-90 -1 L76 -1.4 M-70 1.6 L40 1.2" stroke="#3a2614" stroke-width=".6" opacity=".7"/><path d="M-96 -3 L84 -3" stroke="#c49a6a" stroke-width=".7" opacity=".6"/>`
    + '<path d="M-40 -3.6 l3 7.2 M-34 -3.6 l-2 7.2 M-20 -3.6 l0 7.2 M-16 -3.6 l3 3.6 l-3 3.6 M2 -3.6 l4 7.2 M6 -3.6 l-4 7.2" stroke="#120a05" stroke-width="1.4"/>'
    + '<circle cx="-27" cy="0" r="1.5" fill="#6a1e10"/><circle cx="-8" cy="0" r="1.5" fill="#6a1e10"/>'
    + `<rect x="-96" y="-4.4" width="22" height="8.8" rx="1.6" fill="url(#§lt)" ${O}/>` + rep(5, i => `<path d="M${-94 + i * 4} -4.4 l2.4 8.8" stroke="#2a1a0e" stroke-width="1"/>`)
    + `<path d="M56 -5 L82 -5 Q86 -12 90 -16 L84 -18 Q74 -11 62 -11 Z" fill="url(#§ir)" ${O}/>`
    + `<path d="M58 4 L82 4 Q86 16 96 28 Q100 35 97 42 Q70 49 44 41 Q42 34 47 27 Q56 15 58 4 Z" fill="url(#§ir)" ${O}/>`
    + '<path d="M46 40 Q70 46 95.5 39.6" fill="none" stroke="#e8ecf0" stroke-width="1.6" opacity=".9"/><path d="M48 36.6 Q70 42 94 36" fill="none" stroke="#9aa0a8" stroke-width="2.2" opacity=".6"/>'
    + '<path d="M58 4.4 Q56 16 47.6 27" fill="none" stroke="#c8ccd0" stroke-width=".8" opacity=".6"/><circle cx="70" cy="15" r="2.6" fill="#1a1a1c"/><path d="M78 30 l3 4 M64 32 l-2 5" stroke="#2a2a2c" stroke-width="1"/>'
    + '<path d="M56 -5 L56 5 M84 -5 L84 5" stroke="#1a1410" stroke-width="2.2"/>', 92, 72));

  /* the Tithansi lance, cut down to a long spear: a leaf head, the sawn butt, a tuft of horsehair at the socket */
  put('b2_tithlance', 'A Tithansi lance', sh(98, 136, 76, 7) + rot(
    `<path d="M-97 -2.6 L60 -2.4 L60 2.4 L-97 2.6 Z" fill="url(#§wd)" ${O}/><path d="M-96 -1.8 L58 -1.6" stroke="#c8a070" stroke-width=".7" opacity=".6"/><path d="M-80 .6 L-20 .4 M10 .8 L50 .6" stroke="#3a2614" stroke-width=".6"/>`
    + `<ellipse cx="-97" cy="0" rx="1.6" ry="2.6" fill="#d8b888" ${O}/>`
    + `<path d="M56 -3.6 L68 -3 L68 3 L56 3.6 Z" fill="url(#§ir)" ${O}/><path d="M58 -3.6 L58 3.6 M62 -3.4 L62 3.4" stroke="#1a1a1c" stroke-width="1"/>`
    + `<path d="M68 -3 Q78 -9 90 -6 Q97 -3 100 0 Q97 3 90 6 Q78 9 68 3 Z" fill="url(#§st)" ${O}/><path d="M69 0 L99 0" stroke="#4a5058" stroke-width="1.2"/><path d="M70 -2.6 Q80 -8 92 -5" fill="none" stroke="#fff" stroke-width=".8" opacity=".8"/>`
    + '<path d="M56 2 Q50 10 44 20 Q52 14 54 10 Q52 18 50 26 Q56 16 58 8 Q60 14 62 20 Q61 10 59 3" fill="#2a1e18" stroke="#0b0806" stroke-opacity=".5" stroke-width=".8"/><path d="M56 4 Q52 12 48 18" stroke="#5a4636" stroke-width=".7" fill="none"/>'
    + '<path d="M-60 -2.6 L-50 2.6 M-56 -2.6 L-46 2.6 M-52 -2.6 L-42 2.6" stroke="#3a2614" stroke-width="1.2"/>', 98, 78));

  /* the noble's sabre: Falari steel, a silver basket hilt, a crest scratched off the plate. Never used. */
  put('b2_noblesabre', "A noble's sabre", sh(100, 136, 74, 7) + rot(
    `<path d="M-60 -3.2 Q10 -4.4 60 -8 Q84 -10.4 98 -16 Q92 -6 74 -1 Q24 4 -60 3.2 Z" fill="url(#§st)" ${O}/>`
    + '<path d="M-58 2 Q24 2.8 72 -2.4 Q88 -6 95 -13.4" fill="none" stroke="#fff" stroke-width="1" opacity=".9"/><path d="M-54 -1 Q10 -2 50 -5" fill="none" stroke="#545a64" stroke-width="1.4" opacity=".75"/>'
    + `<rect x="-90" y="-3.8" width="26" height="7.6" rx="2.4" fill="#2a1a12" ${O}/>` + rep(6, i => `<path d="M${-88 + i * 4} -3.8 l2.4 7.6" stroke="#c8ccd2" stroke-width="1.1"/>`)
    + `<path d="M-64 -10 Q-58 -12 -56 -9 L-56 9 Q-58 12 -64 10 Z" fill="url(#§st)" ${O}/>`
    + '<path d="M-62 9 Q-78 22 -94 4" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="4.4"/><path d="M-62 9 Q-78 22 -94 4" fill="none" stroke="#dfe3e8" stroke-width="2.6"/>'
    + '<path d="M-60 9 Q-70 18 -80 14 M-60 7 Q-64 14 -72 12" fill="none" stroke="#aeb4bc" stroke-width="1.6"/>'
    + `<path d="M-64 6 Q-70 12 -66 15 Q-60 14 -60 8 Z" fill="url(#§std)" ${O}/><path d="M-66 9 l3 3 M-64 8 l3 4 M-67 11 l4 2" stroke="#5a5e66" stroke-width=".6"/>`
    + `<ellipse cx="-95" cy="0" rx="5" ry="5.6" fill="url(#§st)" ${O}/><circle cx="-96.4" cy="-2" r="1.6" fill="#fff" opacity=".8"/>`, 100, 82, -35, 1, 1.25));

  /* the cold iron knife, chipped out of the Jaghut ice. It never gets warm. */
  put('b2_coldknife', 'A cold iron knife', `<ellipse cx="114" cy="66" rx="66" ry="52" fill="url(#§gc)"/>` + sh(100, 132, 62, 6) + rot(
    `<path d="M-20 -6 L60 -5 Q76 -4 88 0 Q76 4 60 5 L-20 6 Z" fill="url(#§ci)" ${O}/>`
    + '<path d="M-18 4.8 L60 4 Q76 3 86 0.4" fill="none" stroke="#f2faff" stroke-width="1" opacity=".9"/><path d="M-16 -1 L52 -.6" stroke="#2a3644" stroke-width="1.6" opacity=".8"/>'
    + '<path d="M20 5.8 l2 -2.4 l2 2.2 M44 5 l1.6 -2 l1.6 1.8" fill="#26303e" stroke="#26303e" stroke-width=".6"/>'
    + `<path d="M-26 -11 L-20 -11 L-20 11 L-26 11 Z" fill="url(#§ir)" ${O}/>`
    + `<rect x="-74" y="-5" width="48" height="10" rx="3" fill="#1e2026" ${O}/>` + rep(9, i => `<path d="M${-72 + i * 5} -5 l3 10" stroke="#3a3e48" stroke-width="1.4"/>`)
    + `<circle cx="-78" cy="0" r="6" fill="url(#§ir)" ${O}/>`
    + '<path d="M30 -10 l2 -4 l2 4 l-2 4 Z M66 -11 l1.6 -3 l1.6 3 l-1.6 3 Z M8 9 l1.4 -3 l1.4 3 l-1.4 3 Z" fill="#e6f4ff" opacity=".75"/>'
    + '<path d="M-20 -6 L60 -5 Q76 -4 88 0" fill="none" stroke="#dff0ff" stroke-width=".8" opacity=".6"/>', 98, 76, -35, 1, 1.2));

  /* the Trygalle crossbow: a steel prod square across the stock, the string spanned to the nut, a bolt in the groove, the windlass at the butt */
  put('b2_tcrossbow', 'A Trygalle crossbow', `<ellipse cx="96" cy="86" rx="60" ry="40" fill="url(#§gt)"/>` + sh(98, 136, 74, 7) + rot(
    `<path d="M-94 -7 L-60 -6 L66 -4.4 L66 4.4 L-60 6 L-94 7 Q-98 0 -94 -7 Z" fill="url(#§wd)" ${O}/>`
    + '<path d="M-90 -5 L64 -3.4" stroke="#c49a6a" stroke-width=".8" opacity=".6"/><path d="M-80 2 L-40 1.6 M-10 2.2 L40 1.8" stroke="#3a2614" stroke-width=".6"/>'
    + '<path d="M-16 6 Q-14 18 -26 24" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="4"/><path d="M-16 6 Q-14 18 -26 24" fill="none" stroke="#7a7e86" stroke-width="2.4"/>'
    + `<path d="M64 -6 L84 -6 Q92 0 84 6 L64 6" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="4"/><path d="M64 -6 L84 -6 Q92 0 84 6 L64 6" fill="none" stroke="#8a9098" stroke-width="2.2"/>`
    + '<path d="M52 -45 L-4 0 L52 45" fill="none" stroke="#0b0806" stroke-opacity=".45" stroke-width="2"/><path d="M52 -45 L-4 0 L52 45" fill="none" stroke="#e8dfc8" stroke-width="1"/>'
    + '<path d="M52 -46 Q70 0 52 46" fill="none" stroke="#0b0806" stroke-opacity=".7" stroke-width="7.6" stroke-linecap="round"/><path d="M52 -46 Q70 0 52 46" fill="none" stroke="url(#§st)" stroke-width="5.4" stroke-linecap="round"/>'
    + '<path d="M51 -44 Q68 0 51 44" fill="none" stroke="#fff" stroke-width=".8" opacity=".7"/>'
    + `<rect x="55" y="-7.4" width="10" height="14.8" rx="1.6" fill="#2a1a0e" ${O}/><path d="M57 -7.4 l0 14.8 M60 -7.4 l0 14.8 M63 -7.4 l0 14.8" stroke="#6a4a2c" stroke-width=".8"/>`
    + `<circle cx="-4" cy="0" r="3.4" fill="url(#§br)" ${O}/>`
    + `<path d="M-2 -2 L66 -1.8 L66 1.8 L-2 2 Z" fill="#e2cc9e" ${O}/><path d="M-2 -1.2 L66 -1" stroke="#fff6e0" stroke-width=".7"/><path d="M-2 -1.6 L4 -4.4 L8 -1.5 M-2 1.6 L4 4.4 L8 1.5" fill="#6a2a1a" stroke="#2a1008" stroke-width=".5"/>`
    + `<path d="M66 -2.8 L76 0 L66 2.8 Z" fill="url(#§st)" ${O}/>`
    + `<rect x="-88" y="-14" width="10" height="28" rx="3" fill="url(#§ir)" ${O}/><path d="M-83 -14 L-83 -22 L-74 -22 M-83 14 L-83 18 L-91 18" fill="none" stroke="#6a6e76" stroke-width="2.2" stroke-linecap="round"/>`
    + '<circle cx="-74" cy="-22" r="2" fill="#4a3624"/><circle cx="-91" cy="18" r="2" fill="#4a3624"/><path d="M-87 -10 L-79 -10 M-87 -4 L-79 -4 M-87 2 L-79 2 M-87 8 L-79 8" stroke="#2a2a2e" stroke-width="1"/>'
    + '<path d="M-60 -6 L-60 6" stroke="#c49e4c" stroke-width="2"/><path d="M-86 -12 L-80 -12" stroke="#9ad8c0" stroke-width="1" opacity=".55"/>', 102, 78));

  /* the Khundryl blade: long for a man on foot, notched, a horsehair tail at the pommel. Three wars, wanting a fourth. */
  put('b2_khundrylblade', 'A Khundryl blade', sh(100, 136, 76, 7) + rot(
    `<path d="M-56 -3.6 Q10 -5 54 -12 Q80 -17 99 -28 Q94 -14 78 -6 Q36 6 -56 4 Z" fill="url(#§st)" ${O}/>`
    + '<path d="M-54 2.6 Q36 4.2 76 -7 Q90 -14 96 -24" fill="none" stroke="#f4f4ee" stroke-width=".9" opacity=".75"/><path d="M-50 -1 Q10 -2 46 -7" fill="none" stroke="#4a4e54" stroke-width="1.4" opacity=".7"/>'
    + '<path d="M2 4.4 l2 -2.4 l2 2.2 M30 2.8 l1.6 -2.4 l1.8 2 M62 -2 l1.8 -2.2 l1.4 2" fill="#2a2018" stroke="#2a2018" stroke-width=".7"/><path d="M-20 0 Q-10 -1 0 0" stroke="#7a5a3a" stroke-width="2" opacity=".35"/>'
    + `<path d="M-60 -9 L-55 -8 L-55 8 L-60 9 Z" fill="url(#§br)" ${O}/>`
    + `<rect x="-88" y="-4" width="28" height="8" rx="2" fill="#3a2414" ${O}/>` + rep(7, i => `<path d="M${-86 + i * 4} -4 l2 8" stroke="#1a0e08" stroke-width="1.3"/>`)
    + `<circle cx="-91" cy="0" r="4.4" fill="url(#§br)" ${O}/>`
    + '<path d="M-94 1 Q-102 8 -100 20 M-93 2 Q-97 11 -92 22 M-95 0 Q-106 5 -106 16 M-92 3 Q-92 12 -87 19" fill="none" stroke="#0e0a08" stroke-width="2" stroke-linecap="round"/>'
    + '<path d="M-93 2 Q-97 11 -92 22" fill="none" stroke="#4a3e36" stroke-width=".7"/>', 106, 84, -35, .9, 1.1));

  /* the Aren longsword: issue steel, a wheel pommel, never drawn, still in its grease */
  put('b2_arensword', 'An Aren longsword', sh(100, 136, 76, 7) + rot(
    `<path d="M-48 -4.4 L88 -3 L99 0 L88 3 L-48 4.4 Z" fill="url(#§st)" ${O}/>`
    + '<path d="M-46 3.4 L88 2.2 L97 0" fill="none" stroke="#fff" stroke-width=".9" opacity=".85"/><path d="M-44 0 L70 0" stroke="#4a5058" stroke-width="1.6" opacity=".75"/>'
    + '<path d="M-30 -2 Q0 -3 20 -1.6 Q40 0 60 -1.2" fill="none" stroke="#d8b860" stroke-width="5" opacity=".22" stroke-linecap="round"/><path d="M-10 2 Q20 3 50 1.6" fill="none" stroke="#c8a040" stroke-width="2.4" opacity=".2"/>'
    + `<rect x="-52" y="-15" width="5" height="30" rx="1.6" fill="url(#§ir)" ${O}/>`
    + `<rect x="-84" y="-3.6" width="32" height="7.2" rx="2" fill="url(#§lt)" ${O}/>` + rep(6, i => `<path d="M${-82 + i * 5} -3.6 l0 7.2" stroke="#2a1a0e" stroke-width="1"/>`)
    + `<circle cx="-90" cy="0" r="6.4" fill="url(#§ir)" ${O}/><circle cx="-90" cy="0" r="2.6" fill="#2a2c30"/><path d="M-94 -3.4 A5 5 0 0 1 -87 -4.6" fill="none" stroke="#d8dce0" stroke-width=".8"/>`
    + '<path d="M-50 -14 L-50 14" stroke="#c8ccd2" stroke-width=".7" opacity=".6"/>', 100, 80, -35, 1, 1.25));

  /* ---------------- armour ---------------- */
  const SHIRT = 'M75 24 Q100 33 125 24 L149 31 Q164 39 169 62 L151 69 L145 57 L147 128 Q100 135 53 128 L55 57 L49 69 L31 62 Q36 39 51 31 Z';
  const NECK = '<path d="M78 25 Q100 40 122 25 Q100 31 78 25 Z" fill="#0d0a07"/>';
  /* auxiliary mail: long, oiled against the sand, a dark band of riveted rings at the hem */
  put('b2_auxmail', 'Auxiliary mail', sh(100, 136, 58, 6)
    + `<path d="${SHIRT}" fill="url(#§ml)"/><path d="${SHIRT}" fill="url(#§rg)"/><path d="${SHIRT}" fill="url(#§hl)" ${O}/>`
    + '<path d="M54 120 Q100 127 146 120 L147 128 Q100 135 53 128 Z" fill="#2a2a28" opacity=".55"/><path d="M53 128 Q100 135 147 128" fill="none" stroke="#8a8c8a" stroke-width="1"/>'
    + '<path d="M31 62 L49 69 M151 69 L169 62" stroke="#2a2a28" stroke-width="2.4"/>' + NECK
    + '<path d="M80 26 Q100 34 120 26" fill="none" stroke="#a8aaa8" stroke-width="1.6"/><path d="M70 44 Q66 80 70 116" fill="none" stroke="#fff" stroke-width="3" opacity=".12"/>'
    + '<path d="M100 40 L100 126" stroke="#000" stroke-width="2" opacity=".14"/>');

  /* Wickan hardened hide: boiled, fringed at the yoke, a long coat that does not cook you */
  { const COAT = 'M74 24 Q100 32 126 24 L146 32 Q160 40 164 60 L150 64 L144 54 L146 126 L104 128 L100 50 L96 128 L54 126 L56 54 L50 64 L36 60 Q40 40 54 32 Z';
    put('b2_wickanhide', 'Wickan hardened hide', sh(100, 136, 56, 6)
      + `<path d="${COAT}" fill="url(#§ltd)"/><path d="${COAT}" fill="url(#§hl)" ${O}/>`
      + '<path d="M58 34 Q60 80 58 122 M142 34 Q140 80 142 122" fill="none" stroke="#c49a6a" stroke-width="1" stroke-dasharray="2.4 2.4" opacity=".75"/>'
      + '<path d="M100 50 L100 128" stroke="#1a100a" stroke-width="2.4"/><path d="M98 60 L102 64 M98 74 L102 78 M98 88 L102 92 M98 102 L102 106" stroke="#c8a878" stroke-width="1.2"/>'
      + '<path d="M70 84 Q78 90 76 104 M128 80 Q122 92 126 108 M62 112 L84 114" fill="none" stroke="#2e1e12" stroke-width="1.2" opacity=".8"/>'
      + '<path d="M50 42 Q100 58 150 42" fill="none" stroke="#3a2614" stroke-width="2.2"/><path d="M50 41 Q100 57 150 41" fill="none" stroke="#b08a5e" stroke-width=".8"/>'
      + rep(17, i => { const x = 54 + i * 5.6, y = 42 + 12 * Math.sin(Math.PI * i / 16) * .9; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l${(i % 2 ? .6 : -.6)} ${9 + (i % 3) * 2}" stroke="#c8a878" stroke-width="1.6" stroke-linecap="round"/>`; })
      + '<path d="M78 25 Q100 38 122 25 Q100 30 78 25 Z" fill="#0d0a07"/>'); }

  /* the officer's scale: Malazan, the plates still bright, and the hottest thing on the Chain */
  put('b2_officerscale', "An officer's scale", sh(100, 136, 58, 6)
    + `<path d="${SHIRT}" fill="url(#§ml2)"/><path d="${SHIRT}" fill="url(#§sc)"/><path d="${SHIRT}" fill="url(#§hl)" ${O}/>`
    + '<path d="M31 62 Q34 40 51 31 L58 52 Z M169 62 Q166 40 149 31 L142 52 Z" fill="#3a3e46" opacity=".55"/>'
    + '<path d="M53 128 Q100 135 147 128" fill="none" stroke="#6a4a2a" stroke-width="3"/><path d="M53 126.4 Q100 133.4 147 126.4" fill="none" stroke="#c49e4c" stroke-width=".8"/>' + NECK
    + '<path d="M80 26 Q100 34 120 26" fill="none" stroke="#c49e4c" stroke-width="2"/><path d="M68 46 Q64 80 68 114" fill="none" stroke="#fff" stroke-width="4" opacity=".14"/>');

  /* Trygalle leathers: layered and stitched with something that is not thread, scuffed by roads not on any map */
  { const JK = 'M74 24 Q100 32 126 24 L148 32 Q162 40 166 60 L151 65 L145 55 L144 126 Q100 132 56 126 L55 55 L49 65 L34 60 Q38 40 52 32 Z';
    put('b2_tleathers', 'Trygalle leathers', `<ellipse cx="100" cy="80" rx="70" ry="60" fill="url(#§gt)"/>` + sh(100, 136, 56, 6)
      + `<path d="${JK}" fill="url(#§ltd)"/>`
      + [58, 74, 90, 106].map(y => `<path d="M55.5 ${y} Q100 ${y + 5} 144.5 ${y}" fill="none" stroke="#1e140c" stroke-width="2.6"/><path d="M55.5 ${y + 1.8} Q100 ${y + 6.8} 144.5 ${y + 1.8}" fill="none" stroke="#a07a54" stroke-width=".8" opacity=".7"/><path d="M57 ${y - 3} Q100 ${y + 2} 143 ${y - 3}" fill="none" stroke="#9ad8c0" stroke-width=".9" stroke-dasharray="2 3" opacity=".7"/>`).join('')
      + `<path d="${JK}" fill="url(#§hl)" ${O}/>`
      + '<path d="M100 30 L100 128" stroke="#1e140c" stroke-width="2"/><path d="M76 40 L86 49 M124 40 L114 49" stroke="#2a1c12" stroke-width="2"/>'
      + '<path d="M66 80 l10 -3 M120 98 l12 4 M70 114 l6 2 M128 66 l6 -4" stroke="#b89a76" stroke-width="1" opacity=".55"/>'
      + '<path d="M78 25 Q100 38 122 25 Q100 30 78 25 Z" fill="#0d0a07"/>'); }

  /* the Khundryl horsehair cloak: black, oiled, unpainted. Yet. */
  { const CL = 'M76 24 Q100 18 124 24 Q136 30 140 40 L162 128 Q100 138 38 128 L60 40 Q64 30 76 24 Z';
    put('b2_horsehair', 'A Khundryl horsehair cloak', sh(100, 136, 66, 6)
      + `<path d="${CL}" fill="#16131a"/>`
      + '<path d="M60 40 L40 128 L56 130 L72 44 Z M88 34 L86 132 L100 133 L98 30 Z M120 36 L134 131 L148 130 L128 40 Z" fill="#000" opacity=".35"/>'
      + rep(16, i => { const t = i / 15, x0 = 66 + t * 68, x1 = 42 + t * 116; return `<path d="M${x0.toFixed(1)} 36 Q${((x0 + x1) / 2 + (i % 2 ? 2 : -2)).toFixed(1)} 84 ${x1.toFixed(1)} ${(129 + (i % 3)).toFixed(1)}" fill="none" stroke="${i % 3 ? '#2c2830' : '#4a4450'}" stroke-width="${i % 3 ? 1.2 : .8}"/>`; })
      + `<path d="${CL}" fill="url(#§hl)" ${O}/>`
      + '<path d="M40 128 l-2 6 M52 130 l0 6 M66 131 l-1 7 M82 132 l1 6 M98 133 l0 6 M114 132 l1 7 M130 131 l1 6 M146 130 l2 6 M158 128 l3 6" stroke="#16131a" stroke-width="1.6" stroke-linecap="round"/>'
      + `<path d="M76 24 Q100 34 124 24" fill="none" stroke="#5a3e24" stroke-width="3"/><circle cx="100" cy="30" r="3.6" fill="url(#§bn)" ${O}/>`
      + '<path d="M74 46 Q70 80 62 118" fill="none" stroke="#9a96a8" stroke-width="1.4" opacity=".28"/>'); }

  /* Aren Guard mail: clean, oiled, every ring whole, a brass edge at hem and collar */
  put('b2_arenmail', 'Aren Guard mail', sh(100, 136, 58, 6)
    + `<path d="${SHIRT}" fill="url(#§ml2)"/><path d="${SHIRT}" fill="url(#§rg)"/><path d="${SHIRT}" fill="url(#§hl)" ${O}/>`
    + '<path d="M53 128 Q100 135 147 128" fill="none" stroke="url(#§br)" stroke-width="3.4"/><path d="M31 62 L49 69 M151 69 L169 62" stroke="url(#§br)" stroke-width="2.6"/>' + NECK
    + '<path d="M80 26 Q100 34 120 26" fill="none" stroke="#d4b066" stroke-width="2.4"/><path d="M70 44 Q66 80 70 116" fill="none" stroke="#fff" stroke-width="4" opacity=".18"/>');

  /* ---------------- trinkets ---------------- */
  /* Ressan's dipper: brass on a thong, the lip worn thin by forty years of other people's mouths */
  put('b2_dipper', "Ressan's dipper", sh(96, 128, 72, 7)
    + '<path d="M168 30 Q182 22 188 34 Q190 46 178 44" fill="none" stroke="#3a2614" stroke-width="2.2" stroke-linecap="round"/>'
    + `<path d="M64 96 L166 34 L171 39 L72 102 Z" fill="url(#§brd)" ${O}/><path d="M66 95 L166 34.6" stroke="#fff2c4" stroke-width=".9" opacity=".7"/><circle cx="168" cy="36" r="2.4" fill="#2a1a0a"/>`
    + `<ellipse cx="60" cy="104" rx="36" ry="17" fill="url(#§brd)" ${O}/><ellipse cx="60" cy="99" rx="31" ry="11.5" fill="#3a2a0c"/><ellipse cx="64" cy="101" rx="20" ry="6" fill="#5a4214" opacity=".8"/>`
    + '<path d="M29 99 Q34 89 60 87.5 Q86 89 91 99" fill="none" stroke="#fff0b8" stroke-width="1.3" opacity=".9"/><path d="M40 90.4 Q48 88.4 56 87.8" stroke="#fffae0" stroke-width=".6" opacity=".9"/>'
    + '<path d="M28 108 Q60 128 92 108" fill="none" stroke="#2a1a06" stroke-width="1.4" opacity=".6"/><path d="M44 112 l3 3" stroke="#3a2a0c" stroke-width="1"/>');

  /* the Odhan lance-head: leaf-bladed iron, the green rag still knotted under it */
  put('b2_lancehead', 'Odhan lance-head', sh(100, 136, 50, 6) + rot(
    `<path d="M-10 0 Q8 -14 46 -9 Q66 -5 78 0 Q66 5 46 9 Q8 14 -10 0 Z" fill="url(#§ir)" ${O}/>`
    + '<path d="M-8 0 L76 0" stroke="#2a2c30" stroke-width="1.6"/><path d="M-6 -2 Q10 -12 46 -7.4 Q64 -4 74 -1" fill="none" stroke="#d8dce2" stroke-width="1" opacity=".85"/><path d="M20 8 l3 -2 M50 6.6 l2 -1.8" stroke="#6a3a1e" stroke-width="2" opacity=".6"/>'
    + `<path d="M-40 -4.4 L-10 -3 L-10 3 L-40 4.4 Z" fill="url(#§ir)" ${O}/><circle cx="-30" cy="0" r="1.6" fill="#0e0e10"/><path d="M-40 -4.4 L-10 -3" stroke="#a8acb2" stroke-width=".7"/>`
    + `<ellipse cx="-42" cy="0" rx="4" ry="5.4" fill="#2a1e14" ${O}/>`
    + `<path d="M-28 2 Q-32 12 -42 26 L-44 31 L-40 29 L-38 33 L-36 28 Q-30 16 -22 4 Z" fill="#4e6a3c" ${O}/><path d="M-21 4 Q-22 14 -30 24 L-30 29 L-27 26 L-24 29 Q-20 16 -17 4 Z" fill="#3a5430" ${O}/>`
    + '<path d="M-27 6 Q-31 14 -38 24" fill="none" stroke="#8aa070" stroke-width=".9" opacity=".7"/><path d="M-34 18 l3 1 M-26 18 l2 1" stroke="#2a3a20" stroke-width="1"/>'
    + `<path d="M-30 -5.4 Q-25 -7 -20 -5.4 L-20 5.4 Q-25 7 -30 5.4 Z" fill="#5a7a46" ${O}/><path d="M-28 -4 Q-25 0 -28 4 M-23 -4 Q-20 0 -23 4" fill="none" stroke="#2e4424" stroke-width="1"/>`, 106, 76, -35, 1.3));

  /* the tamarisk switch from Dryj Spring: gone grey and hard */
  put('b2_tamarisk', 'Tamarisk switch', sh(100, 132, 76, 6) + rot(
    '<path d="M-92 2 Q-30 -2 30 0 Q70 1 94 -4" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="4.6" stroke-linecap="round"/><path d="M-92 2 Q-30 -2 30 0 Q70 1 94 -4" fill="none" stroke="#8a8670" stroke-width="3" stroke-linecap="round"/><path d="M-90 1 Q-30 -3 30 -1 Q70 0 92 -5" fill="none" stroke="#c8c4ac" stroke-width=".8"/>'
    + '<ellipse cx="-92" cy="2" rx="1.2" ry="1.6" fill="#d8d0b0"/>'
    + rep(9, i => { const x = -60 + i * 17, s = i % 2 ? 1 : -1; return `<path d="M${x} 0 q8 ${-10 * s} 20 ${-12 * s}" fill="none" stroke="#7a7a64" stroke-width="1.4"/>` + rep(4, j => `<path d="M${x + 5 + j * 4} ${(-3.4 - j * 2.6) * s} l3 ${-4 * s} M${x + 5 + j * 4} ${(-3.4 - j * 2.6) * s} l4 ${1.4 * s}" stroke="#a4a68e" stroke-width="1.1" stroke-linecap="round"/>`); })
    + '<path d="M40 -1 l2 -1 M-20 -.5 l2 -1" stroke="#5a5646" stroke-width="1"/>', 100, 74, -22));

  /* the well-rope knot: horsehair, knotted the Tithansi way */
  { const R = 'M18 82 Q50 70 78 76 Q104 82 112 64 Q118 44 98 44 Q80 46 90 66 Q100 88 126 86 Q146 84 154 72 Q164 60 186 64';
    put('b2_wellrope', 'Well-rope knot', sh(100, 112, 84, 7)
      + `<path d="${R}" fill="none" stroke="#0b0806" stroke-opacity=".7" stroke-width="12" stroke-linecap="round"/><path d="${R}" fill="none" stroke="#4a3c30" stroke-width="10" stroke-linecap="round"/>`
      + `<path d="${R}" fill="none" stroke="#1e1610" stroke-width="10" stroke-dasharray="1.6 3.2" stroke-linecap="butt" opacity=".55"/>`
      + `<path d="${R}" transform="translate(-1 -2)" fill="none" stroke="#a08a72" stroke-width="1.4" stroke-dasharray="2.4 3.6" opacity=".8"/>`
      + '<path d="M86 60 Q92 72 104 78" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="12"/><path d="M86 60 Q92 72 104 78" fill="none" stroke="#4a3c30" stroke-width="10"/><path d="M86 60 Q92 72 104 78" fill="none" stroke="#1e1610" stroke-width="10" stroke-dasharray="1.6 3.2" opacity=".55"/><path d="M85 58 Q91 70 103 76" fill="none" stroke="#a08a72" stroke-width="1.4" opacity=".7"/>'
      + '<path d="M18 82 l-8 -4 M18 82 l-9 1 M18 82 l-7 6 M186 64 l8 -5 M186 64 l9 1 M186 64 l7 6" stroke="#2a201a" stroke-width="1.3" stroke-linecap="round"/>'); }

  /* the ford stone: hand-sized, the last of a road that is not there any more */
  put('b2_paving', 'A ford stone', sh(104, 112, 80, 9)
    + `<path d="M36 54 Q38 44 50 40 L146 28 Q160 28 168 40 L174 62 L172 80 Q100 92 58 96 L40 78 Z" fill="#3e3a34" ${O}/>`
    + '<path d="M36 54 Q38 44 50 40 L146 28 Q160 28 168 40 L174 62 Q120 70 60 78 Q44 70 36 54 Z" fill="#9c907c"/>'
    + '<path d="M36 54 Q44 70 60 78 L58 96 L40 78 Z" fill="#5e574c"/><path d="M60 78 Q120 70 174 62 L172 80 Q100 92 58 96 Z" fill="#6e665a"/>'
    + '<path d="M38 52 Q40 44 50 41 L146 29 Q158 29 166 39" fill="none" stroke="#d8ccb2" stroke-width="1.3"/><path d="M62 76 Q120 68 172 61" fill="none" stroke="#b4a890" stroke-width=".9" opacity=".8"/>'
    + '<path d="M76 50 L92 58 L88 64 M118 42 L128 50 M140 50 l12 -3 M66 62 q4 -3 9 -1" fill="none" stroke="#6a6052" stroke-width="1.4"/><path d="M100 40 q6 -2 12 0 M130 36 q4 -1 8 1" fill="none" stroke="#c8bca4" stroke-width="1"/>'
    + '<path d="M60 90 Q110 84 171 76" fill="none" stroke="#33404c" stroke-width="5" opacity=".55"/><path d="M58 95 Q110 88 172 80" fill="none" stroke="#1e2226" stroke-width="2" opacity=".6"/>');

  /* the Semk god-fetish: hair, bone and painted clay. The god they wore, before the spirits ate it. */
  put('b2_fetish', 'A Semk god-fetish', `<ellipse cx="100" cy="72" rx="58" ry="56" fill="url(#§gw)"/>` + sh(100, 136, 40, 5)
    + '<path d="M100 14 L100 26" stroke="#3a2614" stroke-width="2"/>'
    + `<path d="M74 34 Q100 18 126 34 Q130 46 122 52 Q100 58 78 52 Q70 46 74 34 Z" fill="#1c1612" ${O}/>`
    + rep(11, i => { const x = 76 + i * 4.8, l = 52 + (i % 3) * 14 + (i === 5 ? 20 : 0); return `<path d="M${x.toFixed(1)} 44 Q${(x + (i % 2 ? 4 : -4)).toFixed(1)} ${40 + l / 2} ${(x + (i < 5 ? -6 : 6)).toFixed(1)} ${40 + l}" fill="none" stroke="${i % 3 ? '#241a14' : '#3e3026'}" stroke-width="2.4" stroke-linecap="round"/>`; })
    + `<path d="M84 50 Q100 40 116 50 Q120 70 100 88 Q80 70 84 50 Z" fill="#a8583a" ${O}/><path d="M86 52 Q100 43 112 50" fill="none" stroke="#d88a62" stroke-width="1.4" opacity=".8"/>`
    + '<path d="M84 62 L116 62 M88 74 L112 74" stroke="#e8d8b0" stroke-width="1.6" opacity=".75"/>'
    + '<ellipse cx="100" cy="64" rx="8" ry="6" fill="#efe2c0"/><circle cx="100" cy="64" r="3.4" fill="#120a06"/><circle cx="98.8" cy="62.8" r=".9" fill="#fff" opacity=".7"/>'
    + `<path d="M86 94 L114 94 L118 102 L110 112 L90 112 L82 102 Z" fill="url(#§bnd)" ${O}/><path d="M90 100 L110 100 M92 106 L108 106" stroke="#7a6444" stroke-width="1"/>`
    + `<path d="M70 98 L80 120 M128 96 L120 122" stroke="#e2d6b8" stroke-width="3" stroke-linecap="round"/><circle cx="80" cy="121" r="2.4" fill="#d8ccb0" ${O}/><circle cx="120" cy="123" r="2.4" fill="#d8ccb0" ${O}/>`);

  /* the black iron star: five points, edged on every one */
  { const pts = rep(10, i => { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 22 : 58; return `${(100 + r * Math.cos(a)).toFixed(1)} ${(74 + r * Math.sin(a)).toFixed(1)} `; });
    put('b2_clawstar', 'A black iron star', sh(104, 134, 56, 6)
      + `<path d="M${pts}Z" fill="url(#§ird)" ${O}/>`
      + rep(5, i => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5, b = a - Math.PI / 5, c = a + Math.PI / 5;
          const P = (ang, r) => `${(100 + r * Math.cos(ang)).toFixed(1)} ${(74 + r * Math.sin(ang)).toFixed(1)}`;
          return `<path d="M${P(a, 54)} L${P(b, 22)}" stroke="#c8ccd4" stroke-width="1" opacity="${i === 0 || i === 4 ? .95 : .4}"/><path d="M${P(a, 54)} L${P(c, 22)}" stroke="#c8ccd4" stroke-width="1" opacity="${i === 0 || i === 1 ? .7 : .25}"/><path d="M${P(a, 50)} L${P(a, 12)}" stroke="#0e0e10" stroke-width="1.4" opacity=".7"/>`; })
      + `<circle cx="100" cy="74" r="7" fill="#120e0c" ${O}/><circle cx="100" cy="74" r="7" fill="none" stroke="#6a6e76" stroke-width="1"/>`
      + '<path d="M128 96 l6 6 l-4 2 Z M62 98 l-5 4" fill="#4a1a10" stroke="#4a1a10" opacity=".7"/>'); }

  /* the root from the cut: pale, twisted, still damp weeks later */
  { const R = 'M22 70 Q56 44 92 66 Q120 84 150 62 Q170 48 186 56';
    put('b2_tunnelroot', 'A root from the cut', sh(104, 124, 80, 7)
      + `<path d="${R}" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="11" stroke-linecap="round"/><path d="${R}" fill="none" stroke="#bcae8e" stroke-width="9" stroke-linecap="round"/>`
      + `<path d="${R}" transform="translate(-1 -2.4)" fill="none" stroke="#efe6cc" stroke-width="2.4" stroke-linecap="round" opacity=".8"/><path d="${R}" transform="translate(1 3)" fill="none" stroke="#7a6c50" stroke-width="2" opacity=".8"/>`
      + '<path d="M40 60 Q52 54 64 58 M104 76 Q112 80 122 78 M150 62 Q160 58 168 56" fill="none" stroke="#8a7c5e" stroke-width="1" opacity=".8"/>'
      + '<path d="M92 66 Q100 92 88 112 M126 78 Q140 98 132 116 M58 54 Q50 36 56 22" fill="none" stroke="#0b0806" stroke-opacity=".5" stroke-width="4.4" stroke-linecap="round"/><path d="M92 66 Q100 92 88 112 M126 78 Q140 98 132 116 M58 54 Q50 36 56 22" fill="none" stroke="#c8bc9e" stroke-width="2.8" stroke-linecap="round"/>'
      + '<path d="M88 112 l-4 6 M88 112 l3 6 M132 116 l-3 5" stroke="#b0a284" stroke-width="1"/><path d="M186 56 l6 -2 M186 56 l5 4" stroke="#bcae8e" stroke-width="2" stroke-linecap="round"/>'
      + '<path d="M80 72 q2 4 0 6 q-2 -2 0 -6 Z M140 64 q2 4 0 6 q-2 -2 0 -6 Z M112 86 q2 4 0 6 q-2 -2 0 -6 Z M96 104 q1.6 3 0 4.6 q-1.6 -1.6 0 -4.6 Z" fill="#9ac0d8"/>'
      + '<circle cx="79.4" cy="75" r=".7" fill="#fff"/><circle cx="139.4" cy="67" r=".7" fill="#fff"/><path d="M60 64 Q90 72 110 76" fill="none" stroke="#fff" stroke-width="1.2" opacity=".18"/>'); }

  /* the sapper's shield-boss: iron, dented in the shape of a horse's hoof */
  put('b2_sappershield', "A sapper's dented shield-boss", sh(104, 128, 64, 8)
    + `<ellipse cx="100" cy="74" rx="66" ry="52" fill="url(#§ird)" ${O}/><ellipse cx="100" cy="74" rx="66" ry="52" fill="none" stroke="#9a9ea6" stroke-width="1" stroke-dasharray="60 400" stroke-dashoffset="-200"/>`
    + rep(8, i => { const a = i * Math.PI / 4 + .3; return `<circle cx="${(100 + 58 * Math.cos(a)).toFixed(1)}" cy="${(74 + 45 * Math.sin(a)).toFixed(1)}" r="3" fill="url(#§rb)" ${O}/>`; })
    + `<ellipse cx="100" cy="72" rx="42" ry="34" fill="url(#§rb)" ${O}/>`
    + '<path d="M86 56 Q100 46 114 56 Q122 68 116 82 Q110 76 100 76 Q90 76 84 82 Q78 68 86 56 Z" fill="#26272a" opacity=".85"/>'
    + '<path d="M88 58 Q100 50 112 58" fill="none" stroke="#0e0e10" stroke-width="2"/><path d="M84 82 Q90 78 100 78 Q110 78 116 82" fill="none" stroke="#b8bcc2" stroke-width="1.4"/>'
    + '<path d="M72 54 Q80 46 92 44" fill="none" stroke="#f0f2f4" stroke-width="2" opacity=".6"/><path d="M128 90 l6 4 M70 96 l-4 3" stroke="#5a2a14" stroke-width="2" opacity=".6"/>');

  /* the desert robe: pale Odhan cloth, the hood fallen back, the folds the tribes wear it in */
  { const RB = 'M82 20 Q100 14 118 20 Q130 26 132 38 L150 56 Q156 92 162 128 Q100 138 38 128 Q44 92 50 56 L68 38 Q70 26 82 20 Z';
    put('b2_robe', 'A desert robe', sh(100, 136, 66, 6)
      + `<path d="${RB}" fill="#d8ccb0"/>`
      + '<path d="M68 38 L62 128 L76 132 L80 44 Z M100 40 L98 134 L108 134 L106 40 Z M132 38 L140 131 L152 130 L138 52 Z" fill="#9a8a6a" opacity=".45"/>'
      + '<path d="M58 60 Q56 96 54 128 M86 44 Q86 90 86 132 M120 44 Q124 90 128 132 M146 60 Q150 96 152 128" fill="none" stroke="#f2ead6" stroke-width="2" opacity=".55"/>'
      + `<path d="${RB}" fill="url(#§hl)" ${O}/>`
      + `<path d="M76 26 Q100 44 124 26 Q122 40 100 46 Q78 40 76 26 Z" fill="#c4b494" ${O}/><path d="M80 30 Q100 42 120 30" fill="none" stroke="#8a7a5c" stroke-width="1.4"/>`
      + '<path d="M60 76 Q100 86 140 76" fill="none" stroke="#7a6a4c" stroke-width="3"/><path d="M60 74.4 Q100 84.4 140 74.4" fill="none" stroke="#e8dcc0" stroke-width=".8"/>'
      + '<path d="M38 128 Q100 138 162 128" fill="none" stroke="#9a8a6a" stroke-width="2"/><path d="M60 124 l4 4 M110 128 l3 5" stroke="#a89878" stroke-width="1"/>'); }

  /* Dom's safe-conduct: good paper, a Fist's seal with the Emperor's mark scraped out. Not worth the wax. */
  put('b2_conduct', "Dom's safe-conduct", sh(104, 128, 70, 7)
    + `<path d="M40 30 L164 24 L170 112 Q150 108 140 120 L46 124 Z" fill="#e8dcbc" ${O}/><path d="M40 30 L164 24 L170 112 Q150 108 140 120 L46 124 Z" fill="url(#§hl)"/>`
    + '<path d="M170 112 Q150 108 140 120 Q148 112 152 104 Q160 106 170 112 Z" fill="#b8a888"/><path d="M42 31 L163 25" stroke="#fff" stroke-width="1" opacity=".7"/>'
    + '<path d="M56 46 L148 42 M56 56 L150 52 M56 66 L144 62 M56 76 L120 74 M56 86 L104 85" stroke="#5a4a32" stroke-width="1.6" stroke-dasharray="7 2 3 2 9 2" opacity=".75"/>'
    + `<path d="M124 112 l-6 14 l7 -4 l3 7 l3 -16 Z" fill="#7a1612" ${O}/><circle cx="126" cy="100" r="15" fill="#8a1e1a" ${O}/><circle cx="126" cy="100" r="11" fill="none" stroke="#5a0e0a" stroke-width="1.4"/>`
    + '<path d="M120 94 l12 12 M132 94 l-12 12 M118 98 l14 6 M122 92 l8 14" stroke="#c8584a" stroke-width="1.1" opacity=".85"/><path d="M114 94 Q118 88 126 86" fill="none" stroke="#e88070" stroke-width="1.2" opacity=".6"/>');

  /* the pike-head from the ford: Malazan pattern, the shaft snapped a hand below the socket */
  put('b2_pikehead', 'A pike-head from the ford', sh(100, 132, 60, 6) + rot(
    `<path d="M10 -9 L80 0 L10 9 Z" fill="url(#§ir)" ${O}/><path d="M12 0 L78 0" stroke="#24262a" stroke-width="1.4"/><path d="M12 -8 L78 -.6" stroke="#d4d8de" stroke-width="1" opacity=".85"/>`
    + `<path d="M-22 -5 L10 -4 L10 4 L-22 5 Z" fill="url(#§ir)" ${O}/><path d="M-22 -5 L10 -4" stroke="#a8acb2" stroke-width=".7"/>`
    + '<rect x="-16" y="-5" width="3" height="10" fill="#26282c"/><rect x="0" y="-4.6" width="3" height="9.2" fill="#26282c"/><circle cx="-6" cy="0" r="1.4" fill="#0e0e10"/>'
    + `<path d="M-22 -4.4 L-58 -4 L-62 -7 L-64 -1 L-70 -4 L-68 2 L-74 4 L-62 4.4 L-22 4.4 Z" fill="url(#§wd)" ${O}/>`
    + '<path d="M-24 -2 L-58 -2 M-24 1.6 L-60 1.8" stroke="#3a2614" stroke-width=".7"/><path d="M-60 -6 L-70 -4 L-68 2" fill="none" stroke="#d8b888" stroke-width="1"/>', 104, 78, -35, 1.25));

  /* the plank of the Silanda: black wood off a burnt ship that should not float, carved with something nobody can read */
  put('b2_plank', 'A plank of the Silanda', `<ellipse cx="100" cy="74" rx="80" ry="40" fill="url(#§gv)"/>` + sh(100, 130, 80, 7) + rot(
    `<path d="M-92 -9 L76 -12 L86 -6 L96 -10 L88 0 L98 6 L80 10 L-90 11 Q-96 0 -92 -9 Z" fill="#17121a" ${O}/>`
    + '<path d="M-92 -9 L76 -12" stroke="#4a3e4c" stroke-width="1.2"/><path d="M-88 -4 Q-20 -6 70 -6 M-86 4 Q0 2 60 4" fill="none" stroke="#2a2230" stroke-width="1"/><path d="M-90 8 L80 7" stroke="#000" stroke-width="2" opacity=".5"/>'
    + '<path d="M-60 -11 l4 3 M10 -11 l3 4 M50 9 l3 -3" stroke="#3a2a20" stroke-width="1.4"/>'
    + '<path d="M-56 -2 l4 -4 l3 6 l4 -5 M-32 2 l2 -6 l5 3 l-2 4 M-8 -3 q4 -3 6 1 q-2 4 -6 1 M14 1 l5 -6 l1 6 l5 -4 M40 -4 l3 6 l4 -6 l3 5" fill="none" stroke="#a070e0" stroke-width="1.5" stroke-linecap="round" class="t2-shimmer"/>'
    + '<path d="M-56 -2 l4 -4 l3 6 l4 -5 M-32 2 l2 -6 l5 3 l-2 4 M-8 -3 q4 -3 6 1 q-2 4 -6 1 M14 1 l5 -6 l1 6 l5 -4 M40 -4 l3 6 l4 -6 l3 5" fill="none" stroke="#d8c0ff" stroke-width=".5" stroke-linecap="round" opacity=".6"/>', 100, 76, -14, .9, 1.1));

  /* the skin with the water-sellers' seal: full, a house mark pressed into the leather at the neck */
  { const SK = 'M70 44 Q60 46 52 62 Q42 88 58 108 Q80 124 120 122 Q150 118 158 96 Q164 72 146 52 Q132 42 116 42 L112 34 L88 34 L84 44 Z';
    put('b2_sealskin', "A skin with the water-sellers' seal", sh(104, 128, 62, 7)
      + `<path d="${SK}" fill="url(#§ltd)" ${O}/><path d="${SK}" fill="url(#§hl)"/>`
      + '<path d="M58 66 Q60 96 78 112 M140 60 Q150 82 146 104" fill="none" stroke="#2e1e12" stroke-width="1.6" opacity=".7"/><path d="M60 62 Q70 50 84 46" fill="none" stroke="#c49a6a" stroke-width="1.4" stroke-dasharray="2.6 2.4" opacity=".75"/>'
      + `<path d="M86 22 L114 22 L112 36 L88 36 Z" fill="#3e2a1a" ${O}/><rect x="90" y="14" width="20" height="9" rx="3" fill="url(#§wd)" ${O}/><path d="M86 34 L114 34" stroke="#c49e4c" stroke-width="2.6"/>`
      + `<circle cx="100" cy="56" r="11" fill="#5a3e26" ${O}/><circle cx="100" cy="56" r="11" fill="none" stroke="#2a1a0e" stroke-width="2"/><path d="M93 54 Q100 64 107 54 M100 46 L100 52 M95 50 L105 50" fill="none" stroke="#2a1a0e" stroke-width="2" stroke-linecap="round"/>`
      + '<path d="M70 70 Q76 64 86 62" fill="none" stroke="#fff" stroke-width="2" opacity=".14"/>'); }

  /* the Trygalle skin: a stopper on a chain, and more inside than there should be. Nobody has looked. */
  { const SK = 'M74 46 Q58 54 52 74 Q46 100 66 114 Q94 128 132 118 Q156 108 156 84 Q154 60 134 48 Q122 42 114 42 L112 34 L88 34 L86 44 Z';
    put('b2_tskin', 'A Trygalle skin', `<ellipse cx="104" cy="80" rx="60" ry="52" fill="url(#§gt)"/>` + sh(104, 128, 60, 7)
      + `<path d="${SK}" fill="#4e3626" ${O}/><path d="${SK}" fill="url(#§hl)"/>`
      + '<path d="M60 76 Q84 66 112 66 Q140 66 152 78" fill="none" stroke="#9ad8c0" stroke-width="1" stroke-dasharray="2 3" opacity=".75" class="t2-shimmer"/>'
      + '<path d="M58 96 Q90 92 150 98" fill="none" stroke="#2a1a10" stroke-width="2.4" opacity=".7"/><path d="M58 94.4 Q90 90.4 150 96.4" fill="none" stroke="#9a7a5a" stroke-width=".8" opacity=".6"/>'
      + `<path d="M86 24 L114 24 L112 36 L88 36 Z" fill="#2e2016" ${O}/><path d="M86 34 L114 34" stroke="url(#§br)" stroke-width="3"/>`
      + `<circle cx="132" cy="22" r="7" fill="url(#§br)" ${O}/><path d="M128 18 L136 18" stroke="#fff2c4" stroke-width="1" opacity=".7"/>`
      + rep(6, i => `<ellipse cx="${(112 + i * 3.4).toFixed(1)}" cy="${(28 - i * 1.2 + (i > 3 ? (i - 3) * 1.6 : 0)).toFixed(1)}" rx="1.8" ry="1.2" fill="none" stroke="#a8a8a0" stroke-width="1"/>`)
      + '<path d="M72 64 Q78 58 88 56" fill="none" stroke="#fff" stroke-width="2" opacity=".14"/>'); }

  /* a blue thread from Haddat's mother's veil, tied at one end, untied with her teeth at the other */
  { const T = 'M22 98 Q48 56 76 78 Q100 98 116 70 Q130 44 152 52 Q176 62 168 84 Q160 102 142 92 Q130 84 144 72 Q160 60 182 66';
    put('b2_bluethread', 'A blue thread', sh(100, 118, 80, 6)
      + `<path d="${T}" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/><path d="${T}" fill="none" stroke="#2c5a9c" stroke-width="3.2" stroke-linecap="round"/>`
      + `<path d="${T}" transform="translate(-.6 -1)" fill="none" stroke="#9ec0ec" stroke-width="1" stroke-linecap="round" opacity=".7"/>`
      + '<path d="M22 98 Q22 92 26 88 Q32 92 28 98 Z" fill="#2c5a9c" stroke="#0b0806" stroke-opacity=".6"/><path d="M182 66 l6 -4 M182 66 l7 0 M182 66 l5 4" stroke="#6a8ac0" stroke-width="1" stroke-linecap="round"/>'
      + '<path d="M40 76 l3 2 M98 92 l2 -3" stroke="#1e3e6e" stroke-width="1.4"/>'); }

  /* Sathi's bone whistle, on its thong. Hackle is not here to answer it. */
  put('b2_whistle', 'A bone whistle', sh(100, 112, 70, 6) + rot(
    '<path d="M74 0 Q90 -2 92 -14 Q90 -30 70 -34" fill="none" stroke="#3a2614" stroke-width="2" stroke-linecap="round"/>'
    + `<path d="M-80 -6 Q-84 0 -80 6 L60 8 Q76 7 76 0 Q76 -7 60 -8 Z" fill="url(#§bn)" ${O}/>`
    + '<path d="M-78 -5 L60 -7" stroke="#fffaf0" stroke-width="1" opacity=".8"/><path d="M-76 5 L60 6.4" stroke="#8a7650" stroke-width="1.4" opacity=".7"/>'
    + `<path d="M-80 -6 Q-90 -6 -92 0 Q-90 6 -80 6 Z" fill="#cdbc94" ${O}/><path d="M-90 -2 L-80 -1.6 L-80 1.6 L-90 2 Z" fill="#2a1a0e"/>`
    + `<path d="M-60 -6.4 L-52 -6.4 L-52 -1 L-58 -1 Z" fill="#2a1a0e"/>` + rep(3, i => `<ellipse cx="${-10 + i * 20}" cy="-2" rx="4" ry="2.8" fill="#2a1a0e"/><path d="M${-13 + i * 20} -3.6 a4 2.8 0 0 1 6 0" fill="none" stroke="#fff" stroke-width=".5" opacity=".5"/>`)
    + '<path d="M-40 4 l3 2 M20 5 l4 1 M44 -6 l2 2" stroke="#9a845c" stroke-width=".8"/><path d="M60 -8 L60 8" stroke="#a8946c" stroke-width="1"/>', 96, 80, -22));

  /* Tangle's prayer bead from Itko Kan, on its cord */
  put('b2_bead', 'A Kanese prayer bead', sh(100, 126, 40, 6)
    + '<path d="M24 26 Q50 76 82 82 M176 26 Q150 76 118 82" fill="none" stroke="#0b0806" stroke-opacity=".5" stroke-width="3.6"/><path d="M24 26 Q50 76 82 82 M176 26 Q150 76 118 82" fill="none" stroke="#6a4a2c" stroke-width="2.2"/>'
    + '<path d="M24 26 Q50 76 82 82" fill="none" stroke="#c49a6a" stroke-width=".7" stroke-dasharray="2 2"/>'
    + `<circle cx="100" cy="86" r="26" fill="#8a3a26" ${O}/><circle cx="100" cy="86" r="26" fill="url(#§hl)"/>`
    + '<path d="M80 72 Q100 64 120 72 M78 100 Q100 108 122 100" fill="none" stroke="#4a1a10" stroke-width="2"/><path d="M90 86 L110 86 M100 74 L100 98 M93 79 L107 93 M107 79 L93 93" stroke="#3a120a" stroke-width="1.6"/>'
    + '<circle cx="100" cy="86" r="5" fill="none" stroke="#c87a5a" stroke-width="1.2"/><path d="M82 74 Q88 66 98 64" fill="none" stroke="#f0b090" stroke-width="2" opacity=".6"/>'
    + `<circle cx="78" cy="83" r="5" fill="url(#§wdd)" ${O}/><circle cx="122" cy="83" r="5" fill="url(#§wdd)" ${O}/>`);

  /* Marrow's knotted string: a knot for every healing that took */
  { const S = 'M14 106 Q40 72 74 84 Q104 96 124 68 Q144 40 186 42';
    put('b2_knotstring', 'A knotted string', sh(100, 118, 84, 6)
      + `<path d="${S}" fill="none" stroke="#0b0806" stroke-opacity=".55" stroke-width="3.6"/><path d="${S}" fill="none" stroke="#c4aa80" stroke-width="2.2"/>`
      + '<path d="M14 106 l-4 4 M14 106 l-6 0 M186 42 l6 -3 M186 42 l6 2" stroke="#c4aa80" stroke-width="1" stroke-linecap="round"/>'
      + [[26, 92], [36, 83], [47, 78], [58, 78], [70, 82], [82, 87], [94, 89], [106, 86], [116, 78], [125, 67], [134, 56], [145, 48], [158, 43], [171, 41]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.4" ry="3.8" fill="#a6885a" ${O}/><path d="M${x - 2.4} ${y - 1.2} q2.4 -2 4.8 0" fill="none" stroke="#e8d6a8" stroke-width=".9"/><path d="M${x - 2} ${y + 1.4} l4 -1" stroke="#6a5030" stroke-width=".8"/>`).join('')); }

  /* the Red Blade's red sash, folded, kept for the day there was a horse to ride in it */
  put('b2_sash', 'A red sash', sh(100, 120, 76, 7)
    + `<path d="M34 52 Q96 40 160 42 Q166 52 164 62 Q100 62 38 74 Q32 62 34 52 Z" fill="#c43a2a" ${O}/>`
    + `<path d="M38 74 Q100 62 164 62 Q170 74 166 86 Q100 86 40 98 Q34 86 38 74 Z" fill="#9e2618" ${O}/>`
    + `<path d="M40 98 Q100 86 166 86 Q170 96 166 106 Q100 106 42 116 Q36 106 40 98 Z" fill="#7a1a10" ${O}/>`
    + '<path d="M36 53 Q96 41.4 159 43.4" fill="none" stroke="#f08a70" stroke-width="1.4" opacity=".8"/><path d="M40 75.4 Q100 63.4 163 63.6" fill="none" stroke="#d8584a" stroke-width="1"/><path d="M42 99.4 Q100 87.4 165 87.6" fill="none" stroke="#b03a2a" stroke-width="1"/>'
    + '<path d="M70 50 Q74 58 72 66 M124 44 Q120 52 122 62 M92 72 Q96 80 94 88 M140 88 Q136 96 138 104" fill="none" stroke="#6a120a" stroke-width="1.1" opacity=".55"/>'
    + `<path d="M160 42 Q172 40 180 38 L186 58 Q174 60 164 62 Q166 52 160 42 Z" fill="#a82a1c" ${O}/>` + rep(6, i => `<path d="M${181 + i * .9} ${40 + i * 3.4} l7 ${1 + i * .2}" stroke="#a82a1c" stroke-width="1.6" stroke-linecap="round"/>`)
    + '<path d="M34 52 Q32 62 38 74 Q34 86 40 98 Q36 106 42 116" fill="none" stroke="#000" stroke-width="2" opacity=".3"/>');

  /* the tooth of Keth's first dog, yellow and worn smooth, on its thong */
  put('b2_dogtooth', "A dog's tooth", sh(100, 132, 34, 5)
    + '<path d="M30 18 Q62 54 92 42 M170 18 Q138 54 108 42" fill="none" stroke="#0b0806" stroke-opacity=".5" stroke-width="3.4"/><path d="M30 18 Q62 54 92 42 M170 18 Q138 54 108 42" fill="none" stroke="#5a3e24" stroke-width="2"/>'
    + `<path d="M90 40 Q100 34 110 40 Q112 50 108 56 L92 56 Q88 50 90 40 Z" fill="#b89a62" ${O}/><path d="M88 46 Q100 52 112 46" fill="none" stroke="#5a3e24" stroke-width="3"/>`
    + `<path d="M91 56 L109 56 Q112 80 106 104 Q102 120 96 128 Q94 110 92 92 Q88 72 91 56 Z" fill="url(#§bnd)" ${O}/>`
    + '<path d="M95 60 Q94 90 97 120" fill="none" stroke="#fffaf0" stroke-width="1.4" opacity=".75"/><path d="M106 62 Q108 88 102 112" fill="none" stroke="#8a7044" stroke-width="1.6" opacity=".7"/>'
    + '<path d="M92 56 L109 56" stroke="#7a5a30" stroke-width="1.4"/><path d="M99 96 l3 2" stroke="#9a804c" stroke-width=".8"/>');

  /* a crow's feather from the cloak the Fist wore */
  put('b2_crowfeather', "A crow's feather", sh(100, 132, 76, 6) + rot(
    '<path d="M-96 2 L-60 0" stroke="#3a3440" stroke-width="2.2" stroke-linecap="round"/>'
    + `<path d="M-62 0 Q-40 -16 10 -18 Q60 -16 96 -2 Q60 2 30 6 Q-20 14 -62 0 Z" fill="#100e14" ${O}/>`
    + rep(10, i => { const x = -48 + i * 13; return `<path d="M${x} -.4 Q${x + 6} ${-8 - (i % 3)} ${x + 16} ${-14 + (i > 6 ? (i - 6) * 2.4 : 0)}" fill="none" stroke="#2a2834" stroke-width="1"/><path d="M${x} 0 Q${x + 6} 5 ${x + 14} 7" fill="none" stroke="#242230" stroke-width="1"/>`; })
    + '<path d="M-62 0 Q10 -1 96 -2" fill="none" stroke="#5a5664" stroke-width="1.3"/><path d="M-40 -9 Q10 -16 70 -10" fill="none" stroke="#3a6ab0" stroke-width="1.6" opacity=".45"/><path d="M-30 -11 Q10 -16 50 -13" fill="none" stroke="#5ab0a0" stroke-width=".8" opacity=".35"/>'
    + '<path d="M20 -17 l3 4 l2 -4 M-10 10 l2 -3" stroke="#120e14" stroke-width="1.4"/>', 102, 76, -26, .96, 1.45));
})();
