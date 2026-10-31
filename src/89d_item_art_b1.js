/* ---- the item art pass (v8.1.x): every Book One item redrawn to the shared look (see the brief): Book One's warm leather vignette,
   light from the upper left, a dark outline, a drop shadow and a soft ground shadow, materials that read at 64 px.
   OVERRIDES of the Arms board (19c_artwork.js) and 46b_b1_items_art.js; those files stay as generated. Each SVG's ids carry its
   item id (b1i-<id>-…) so nothing bleeds between pictures on one page. ---- */
(function(){
  const f = n => Math.round(n * 10) / 10;
  /* palettes: four stops, lit to dark; 'x' is lit from the upper left, 'xV' top-lit (for pieces drawn in a rotated frame) */
  const PAL = {
    steel: ['#f4f6f8', '#c4c9cf', '#8a9098', '#4a4f56'], iron: ['#7a756e', '#48443f', '#272523', '#121110'],
    wood: ['#a87b4e', '#7a5532', '#4f341c', '#2a1b0e'], ash: ['#d2ad78', '#a8834f', '#7a5a33', '#4a3419'],
    leather: ['#b07d48', '#85592f', '#5a3a1d', '#2e1d0e'], leatherd: ['#7a5534', '#55391f', '#33210f', '#1a1007'],
    bone: ['#f6eedb', '#e2d3b2', '#b8a37e', '#7d6a4b'], antler: ['#e2d2ae', '#bba57c', '#8a7350', '#4e3f28'],
    gold: ['#fbe7a0', '#d8b04c', '#a07a22', '#5a420e'], brass: ['#f0d08a', '#c09a4a', '#86662a', '#4a3812'],
    bronze: ['#e8b878', '#b58548', '#7e5628', '#43290f'], copper: ['#f0b080', '#c27a46', '#8a4a22', '#4a220c'],
    toc: ['#97948b', '#77716a', '#5c5244', '#3a3024'], ashgrey: ['#86878a', '#68696d', '#4a4b4f', '#2c2d30'],
    green: ['#8a9670', '#66734f', '#475234', '#262c1b'], black: ['#4a4a4e', '#2a2a2e', '#151517', '#060607'],
    blackwood: ['#5a4636', '#33271d', '#1b140e', '#0a0705'], horn: ['#4a3e36', '#2a221d', '#16110e', '#070505'],
    red: ['#c4473c', '#8e2620', '#5c1410', '#2c0806'], glass: ['#d6ecff', '#6aa0e0', '#2c5ea8', '#0f2a55'],
    vellum: ['#f0e2bc', '#dcc795', '#b8a06a', '#7d6a40'], tar: ['#6a5840', '#45382a', '#2a2118', '#140f0a'],
    flint: ['#cfcfca', '#9c9c98', '#6e6f6c', '#3e3f3d'], chitin: ['#56645f', '#232b29', '#0e1211', '#030404'],
    rag: ['#ddd2b8', '#b9ac8c', '#8c7f62', '#5a4f3a'], velvet: ['#8a3a6a', '#5e1e48', '#3a0e2c', '#1c0414'],
    pewter: ['#b4b6b4', '#8a8c8a', '#5e605e', '#343634'], blue: ['#5a7ab8', '#2c4a7a', '#1a2e52', '#0c1628'] };
  const lin = (id, s, v) => `<linearGradient id="${id}" x1="0" y1="0" x2="${v ? 0 : .75}" y2="1">${s.map((c, i) => `<stop offset="${[0, .35, .7, 1][i]}" stop-color="${c}"/>`).join('')}</linearGradient>`;
  const BASE = {
    bg: id => `<radialGradient id="${id}" cx=".46" cy=".42" r=".72"><stop offset="0" stop-color="#3a2c1e"/><stop offset="1" stop-color="#120d08"/></radialGradient>`,
    sh: id => `<radialGradient id="${id}"><stop offset="0" stop-color="#000" stop-opacity=".62"/><stop offset=".55" stop-color="#000" stop-opacity=".28"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`,
    ds: id => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="3" dy="5" stdDeviation="2.4" flood-color="#000" flood-opacity=".55"/></filter>` };
  /* the object's outline: thin, dark, so it reads on the dark ground when small */
  const O = 'stroke="#0b0806" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round"';
  const sh = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#@sh)"/>`;
  /* curves: a cubic sampled to points; a band of tapering width along points; a line offset from them */
  const bez = (a, b, c, d, n = 18) => { const r = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t;
    r.push([0, 1].map(k => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k])); } return r; };
  const norms = P => P.map((p, i) => { const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [-dy / l, dx / l]; });
  const band = (P, w0, w1) => { const N = norms(P), L = P.length - 1, w = i => (w0 + (w1 - w0) * i / L) / 2;
    const A = P.map((p, i) => [p[0] + N[i][0] * w(i), p[1] + N[i][1] * w(i)]), B = P.map((p, i) => [p[0] - N[i][0] * w(i), p[1] - N[i][1] * w(i)]).reverse();
    return 'M' + A.concat(B).map(p => f(p[0]) + ' ' + f(p[1])).join(' L') + ' Z'; };
  const offl = (P, d) => { const N = norms(P); return 'M' + P.map((p, i) => f(p[0] + N[i][0] * d) + ' ' + f(p[1] + N[i][1] * d)).join(' L'); };
  const join = (...S) => S.reduce((a, s) => a.concat(a.length ? s.slice(1) : s), []);

  function mk(key, label, ground, body, extra){
    const P = 'b1i-' + key + '-', W = 200, H = 150, defs = {};
    const src = ground + body;
    (src.match(/#@[A-Za-z0-9]+/g) || []).concat(['#@bg', '#@ds']).forEach(m => { const n = m.slice(2); if (defs[n]) return;
      if (BASE[n]) defs[n] = BASE[n](P + n);
      else if (extra && extra[n]) defs[n] = extra[n].replace('ID', P + n);
      else if (/V$/.test(n) && PAL[n.slice(0, -1)]) defs[n] = lin(P + n, PAL[n.slice(0, -1)], 1);
      else if (PAL[n]) defs[n] = lin(P + n, PAL[n], 0); });
    ART['item/' + key] = (`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}"><defs>${Object.values(defs).join('')}</defs>`
      + `<rect width="${W}" height="${H}" fill="url(#@bg)"/>${ground}<g filter="url(#@ds)">${body}</g></svg>`).replace(/@/g, P);
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [W, H];
  }
  /* long pieces lie on the one diagonal, grip lower left */
  const diag = (s, body, t = 'translate(100 78)', a = -36) => `<g transform="${t} rotate(${a})${s !== 1 ? ` scale(${s})` : ''}">${body}</g>`;

  /* ======== armour ======== */
  mk('heater', "Second Army heater shield", sh(102, 139, 54, 7),
    `<path d="M52 20 Q100 12 148 20 Q152 70 140 98 Q126 124 100 138 Q74 124 60 98 Q48 70 52 20 Z" fill="url(#@wood)" ${O}/>`
    + `<path d="M76 18 L78 128 M100 15 L100 137 M124 18 L122 128" stroke="#1a1008" stroke-opacity=".55" stroke-width="1.1"/>`
    + `<path d="M66 40 q4 20 0 40 M88 30 q-3 25 1 50 M112 40 q3 22 -1 44 M134 34 q-4 20 0 42 M70 92 q3 10 8 18" stroke="#d2a870" stroke-opacity=".22" fill="none"/>`
    + `<path d="M100 15 Q130 14 148 20 Q152 70 140 98 Q126 124 100 138 Z" fill="#000" opacity=".2"/>`
    + `<path d="M78 54 Q84 38 102 41 Q122 38 126 56 Q132 72 120 85 Q104 98 87 89 Q72 78 78 54 Z" fill="url(#@burn)"/>`
    + `<path d="M80 50 l-4 -3 M124 60 l5 1 M118 86 l3 4 M86 90 l-3 4" stroke="#8a2e1c" stroke-width="2" opacity=".55" stroke-linecap="round"/>`
    + `<path d="M52 20 Q100 12 148 20 Q152 70 140 98 Q126 124 100 138 Q74 124 60 98 Q48 70 52 20 Z" fill="none" stroke="url(#@steel)" stroke-width="5"/>`
    + `<path d="M55 24 Q52 66 62 96" stroke="#fff" stroke-opacity=".6" stroke-width="1.1" fill="none"/><path d="M56 22 Q100 15 144 22" stroke="#fff" stroke-opacity=".45" stroke-width="1" fill="none"/>`
    + `<path d="M145 30 Q148 70 137 97 Q124 120 100 133" stroke="#000" stroke-opacity=".45" stroke-width="1.2" fill="none"/>`
    + [[60, 27], [100, 20], [140, 27], [57, 62], [143, 62], [70, 108], [130, 108], [100, 128]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.3" fill="url(#@steel)" ${O}/>`).join('')
    + `<path d="M146 48 l-4 3 M64 116 l3 -2" stroke="#2a2e33" stroke-width="1.6"/>`,
    {burn: '<radialGradient id="ID" cx=".48" cy=".48" r=".55"><stop offset="0" stop-color="#050302" stop-opacity=".95"/><stop offset=".6" stop-color="#1a0f07" stop-opacity=".85"/><stop offset="1" stop-color="#3a2412" stop-opacity="0"/></radialGradient>'});

  mk('toccloak', "Toc's spare cloak", sh(100, 139, 64, 6),
    `<path d="M78 22 Q100 17 124 22 Q138 30 146 44 Q156 84 162 130 Q150 136 138 131 Q126 137 112 132 Q100 138 88 132 Q74 137 62 131 Q50 136 40 129 Q46 92 52 62 Q62 60 66 48 Q68 32 78 22 Z" fill="url(#@tocV)" ${O}/>`
    + `<path d="M84 34 Q80 84 76 134 L86 133 Q88 84 90 34 Z M108 30 Q110 84 106 136 L116 133 Q116 84 112 30 Z M130 40 Q138 86 140 132 L148 133 Q144 84 134 40 Z M64 70 Q58 100 56 132 L64 132 Q64 100 68 70 Z" fill="#000" opacity=".26"/>`
    + `<path d="M92 32 Q94 84 94 134 L98 134 Q98 84 96 32 Z M118 34 Q124 84 126 132 L130 132 Q128 84 122 34 Z M72 64 Q68 100 68 132 L71 132 Q71 100 75 64 Z" fill="#fff" opacity=".1"/>`
    + `<path d="M124 22 Q138 30 146 44 Q156 84 162 130 Q150 136 138 131 Q140 84 132 40 Z" fill="#000" opacity=".22"/>`
    + `<path d="M78 22 Q100 17 124 22 L126 30 Q100 25 76 30 Z" fill="#3a3024"/><path d="M78 22 Q100 17 124 22" stroke="#c8c4b8" stroke-opacity=".45" fill="none"/>`
    + `<path d="M52 62 Q62 60 66 48" stroke="#c8c4b8" stroke-opacity=".5" fill="none"/><path d="M53 64 Q64 62 68 49" stroke="#2a2016" stroke-opacity=".6" stroke-width="1.6" fill="none"/>`
    + `<circle cx="101" cy="28" r="3.6" fill="url(#@iron)" ${O}/><path d="M99 26.5 l2 -1" stroke="#cfcac2" stroke-width=".8"/>`
    + `<path d="M46 126 l-2 5 M70 132 l1 5 M96 134 l-1 5 M122 132 l2 5 M150 130 l3 4" stroke="#3a3024" stroke-width="1.2"/>`
    + `<ellipse cx="116" cy="104" rx="9" ry="5" fill="#2a2016" opacity=".35"/>`);

  mk('roadleather', "Gadrobi road-crew leather", sh(100, 138, 58, 6),
    `<path d="M70 26 Q100 36 130 26 L152 36 Q161 46 158 62 L144 65 L142 128 Q100 135 58 128 L56 65 L42 62 Q39 46 48 36 Z" fill="url(#@leather)" ${O}/>`
    + `<path d="M70 26 Q100 36 130 26 L127 32 Q100 42 73 32 Z" fill="#3a2412"/>`
    + `<path d="M142 40 Q152 46 154 60 M144 65 L142 128 Q120 132 100 132" stroke="#000" stroke-opacity=".3" stroke-width="5" fill="none"/>`
    + `<path d="M73 33 Q100 43 127 33 M47 40 Q43 50 45 59 M153 40 Q157 50 155 59 M61 70 L61 124 M139 70 L139 124 M62 123 Q100 129 138 123" stroke="#e0b080" stroke-opacity=".55" stroke-width=".9" stroke-dasharray="2 2.4" fill="none"/>`
    + `<path d="M58 66 Q66 72 64 86 M142 66 Q134 72 136 86 M66 108 Q100 114 134 108" stroke="#2a1808" stroke-opacity=".55" stroke-width="1.4" fill="none"/>`
    + `<ellipse cx="78" cy="56" rx="16" ry="10" fill="#f0c890" opacity=".14"/>`
    + `<circle cx="100" cy="84" r="24" fill="url(#@scorch)"/>`
    + `<g fill="#140a04" opacity=".88">${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${87 + c * 9 + (r % 2) * 2}" y="${71 + r * 9}" width="7.5" height="7.5" rx="1"/>`).join('')).join('')}</g>`
    + `<rect x="84" y="68" width="32" height="31" rx="2" fill="none" stroke="#140a04" stroke-width="1.6" opacity=".85"/>`,
    {scorch: '<radialGradient id="ID"><stop offset="0" stop-color="#2a1406" stop-opacity=".9"/><stop offset=".7" stop-color="#3a1e0a" stop-opacity=".5"/><stop offset="1" stop-color="#5a3a1d" stop-opacity="0"/></radialGradient>'});

  mk('andiicloak', "Andii-grey cloak", `<ellipse cx="100" cy="78" rx="80" ry="66" fill="url(#@dark)"/>` + sh(100, 139, 62, 6),
    `<path d="M84 18 Q100 12 116 18 Q126 24 128 36 Q146 62 156 130 Q140 136 124 131 Q100 137 76 131 Q60 136 44 130 Q54 62 72 36 Q74 24 84 18 Z" fill="url(#@ashgreyV)" ${O}/>`
    + `<path d="M84 18 Q100 30 116 18 Q114 40 100 46 Q86 40 84 18 Z" fill="#2c2d30"/><path d="M86 20 Q100 31 114 20" stroke="#9a9b9e" stroke-opacity=".35" fill="none"/>`
    + `<path d="M80 50 Q72 92 66 132 L76 131 Q80 92 86 50 Z M100 48 Q102 92 98 136 L108 134 Q108 92 104 48 Z M118 48 Q128 92 132 132 L140 132 Q136 92 124 48 Z" fill="#000" opacity=".24"/>`
    + `<path d="M90 50 Q88 92 86 134 L90 134 Q92 92 94 50 Z M110 50 Q116 92 118 134 L121 134 Q119 92 113 50 Z" fill="#c8cacc" opacity=".08"/>`
    + `<path d="M116 18 Q126 24 128 36 Q146 62 156 130 Q140 136 124 131 Q132 80 120 40 Z" fill="#000" opacity=".2"/>`
    + `<path d="M44 130 Q60 136 76 131 Q100 137 124 131 Q140 136 156 130" stroke="#86878a" stroke-opacity=".25" fill="none"/>`,
    {dark: '<radialGradient id="ID"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".7" stop-color="#000" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>'});

  mk('scoutcloak', "Malazan scout's cloak", sh(100, 120, 76, 8),
    `<g transform="translate(98 80) rotate(-14)">`
    + `<ellipse cx="-66" cy="0" rx="9" ry="22" fill="#3a4428" ${O}/>`
    + `<rect x="-66" y="-22" width="128" height="44" fill="url(#@greenV)"/><path d="M-66 -22 L62 -22 M-66 22 L62 22" stroke="#0b0806" stroke-opacity=".6" stroke-width="1.2"/>`
    + `<path d="M-50 -21 Q-46 0 -52 21 M-14 -21 Q-10 0 -16 21 M10 -21 Q14 0 8 21 M44 -21 Q48 0 42 21" stroke="#262c1b" stroke-opacity=".55" stroke-width="1.6" fill="none"/>`
    + `<path d="M-60 -18 L56 -18" stroke="#c8d0b0" stroke-opacity=".35" stroke-width="1.4"/>`
    + `<ellipse cx="62" cy="0" rx="9" ry="22" fill="url(#@green)" ${O}/>`
    + `<path d="M62 0 q3 -2 3 -6 q-1 -8 -6 -8 q-6 2 -6 12 q1 12 8 13 q8 -2 8 -14 q-1 -14 -8 -17" stroke="#262c1b" stroke-width="1.2" fill="none" opacity=".8"/>`
    + [-34, 28].map(x => `<path d="M${x} -23.5 Q${x + 3} 0 ${x} 23.5 L${x + 7} 23.5 Q${x + 10} 0 ${x + 7} -23.5 Z" fill="url(#@leather)" ${O}/><path d="M${x + 1} -22 Q${x + 4} 0 ${x + 1} 22" stroke="#e0b080" stroke-opacity=".4" stroke-width=".8" stroke-dasharray="2 2" fill="none"/>`).join('')
    + `<rect x="-35.5" y="-6" width="10" height="8" rx="1.5" fill="none" stroke="url(#@iron)" stroke-width="2"/>`
    + `<path d="M31 -24 q-6 -8 2 -10 q8 0 2 10 q8 -6 10 0 q-2 6 -10 2" fill="none" stroke="url(#@leather)" stroke-width="2.6"/>`
    + `<path d="M34 -24 q-4 14 -12 22 M36 -24 q2 12 8 20" stroke="#5a3a1d" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>`);

  /* ======== weapons ======== */
  mk('clawknife', "Grey cloak's knife", sh(98, 126, 62, 6), diag(1,
    `<path d="M-68 -5 L-25 -5 L-25 5 L-68 5 Z" fill="url(#@leatherdV)" ${O}/>`
    + `<path d="M-64 -5 l4 10 M-58 -5 l4 10 M-52 -5 l4 10 M-46 -5 l4 10 M-40 -5 l4 10 M-34 -5 l4 10" stroke="#0b0806" stroke-opacity=".55" stroke-width="1"/>`
    + `<circle cx="-72" cy="0" r="6" fill="url(#@iron)" ${O}/><path d="M-75 -3 a4 4 0 0 1 4 -2" stroke="#b0aaa2" stroke-width=".9" fill="none"/>`
    + `<rect x="-26" y="-11" width="5" height="22" rx="1.5" fill="url(#@iron)" ${O}/>`
    + `<path d="M-21 -6 L52 -6 Q64 -4 74 0 Q62 5 50 6 L-21 6 Z" fill="url(#@steelV)" ${O}/>`
    + `<path d="M-19 -5 L52 -5 Q62 -3.6 72 0" stroke="#fff" stroke-opacity=".75" stroke-width="1" fill="none"/>`
    + `<path d="M-19 0.8 L58 0.8" stroke="#4a4f56" stroke-opacity=".55" stroke-width="1.2"/><path d="M-19 4.2 L50 4.2 Q60 3.4 70 0.6" stroke="#dfe3e8" stroke-opacity=".35" fill="none"/>`));

  mk('secondhalberd', "A Second Army halberd", sh(96, 132, 72, 6), diag(.9,
    `<rect x="-96" y="-3" width="152" height="6" rx="2" fill="url(#@ashV)" ${O}/>`
    + `<path d="M-88 -1.2 L50 -1.4 M-60 1.4 L20 1.2 M-30 -0.2 L44 0" stroke="#4a3419" stroke-opacity=".5" stroke-width=".7"/><path d="M-90 -2.4 L52 -2.4" stroke="#f0d0a0" stroke-opacity=".45" stroke-width=".8"/>`
    + `<rect x="-98" y="-4" width="10" height="8" rx="1.5" fill="url(#@ironV)" ${O}/>`
    + `<rect x="-7" y="-2.8" width="12" height="5.6" fill="#1a0e06" opacity=".85"/><path d="M-4 -1.6 L2 1.6 M-4 1.6 L2 -1.6" stroke="#5a3a1d" stroke-width=".7"/>`
    + `<path d="M9 -2.4 v4.8 M12 -2.4 v4.8 M15 -2.4 v4.8 M18 -2.4 v4.8 M23 -2.4 v4.8 M26 -2.4 v4.8 M29 -2.4 v4.8 M8 0 L19 -0.6" stroke="#1a0e06" stroke-width=".8" opacity=".9"/>`
    + `<path d="M54 -4 L50 -16 Q44 -30 46 -38 Q66 -34 86 -36 Q82 -24 76 -16 L72 -4 Z" fill="url(#@steel)" ${O}/>`
    + `<path d="M47 -37 Q66 -33 85 -35" stroke="#fff" stroke-opacity=".75" stroke-width="1.3" fill="none"/><path d="M56 -6 L52 -18 Q50 -26 52 -32" stroke="#4a4f56" stroke-opacity=".6" fill="none"/>`
    + `<path d="M66 -34.4 l1 2.4 l1.6 -2.2" fill="#2a1b0e"/>`
    + `<path d="M58 4 L60 14 Q62 22 70 26 Q64 16 66 4 Z" fill="url(#@steel)" ${O}/>`
    + `<path d="M66 -3 L100 0 L66 3 Z" fill="url(#@steelV)" ${O}/><path d="M66 -2 L98 -0.2" stroke="#fff" stroke-opacity=".7" stroke-width=".8"/>`
    + `<rect x="50" y="-5" width="17" height="10" rx="1.5" fill="url(#@ironV)" ${O}/><circle cx="55" cy="0" r="1.3" fill="#c4c9cf"/><circle cx="62" cy="0" r="1.3" fill="#c4c9cf"/>`, 'translate(100 82)', -38));

  {
    /* the horn bow, strung: string straight between the points where it leaves the recurves, limbs taper, tips curl away from the string */
    const R = join(bez([0, -14], [30, -14], [60, 2], [80, 14.5]), bez([80, 14.5], [86, 15.5], [90, 12], [93, 6], 8));
    const Lf = R.map(p => [-p[0], p[1]]);
    const limb = P => `<path d="${band(P, 11, 3)}" fill="url(#@leatherd)" ${O}/><path d="${band(P.map(p => [p[0], p[1] + 2]), 5.6, 1.6)}" fill="url(#@hornb)"/><path d="${offl(P.slice(2, -6), -3.4)}" stroke="#c8a070" stroke-opacity=".45" stroke-width=".9" fill="none"/>`;
    mk('rhivibow', "Rhivi horn bow", sh(100, 128, 72, 6), diag(1,
      `<path d="M-80 16.4 L80 16.4 M80 16.4 C86 17 90 13.6 93.4 7.6 M-80 16.4 C-86 17 -90 13.6 -93.4 7.6" stroke="#e8dcc0" stroke-width="1" fill="none"/>`
      + limb(R) + limb(Lf)
      + `<path d="M93 6 l2.6 -3.6 l-0.6 5.2 Z M-93 6 l-2.6 -3.6 l0.6 5.2 Z" fill="url(#@bone)" ${O}/>`
      + `<rect x="-10" y="-19.5" width="20" height="11" rx="2.5" fill="url(#@leatherV)" ${O}/>`
      + `<path d="M-7 -19 l3 10 M-3 -19 l3 10 M1 -19 l3 10 M5 -19 l3 10" stroke="#2e1d0e" stroke-opacity=".7" stroke-width=".9"/>`
      + `<path d="M-9 -18.6 L9 -18.6" stroke="#e0b080" stroke-opacity=".5" stroke-width=".8"/>`, 'translate(100 80)', -34),
      {hornb: '<linearGradient id="ID" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cdb98e"/><stop offset=".5" stop-color="#efe2c4"/><stop offset="1" stop-color="#cdb98e"/></linearGradient>'});
  }

  mk('daruknife', "Daru duelling knife", sh(100, 128, 66, 6), diag(1,
    `<rect x="-58" y="-4" width="38" height="8" rx="2" fill="url(#@leatherdV)" ${O}/>`
    + `<path d="M-56 -4 l3 8 M-51 -4 l3 8 M-46 -4 l3 8 M-41 -4 l3 8 M-36 -4 l3 8 M-31 -4 l3 8 M-26 -4 l3 8" stroke="#c09a4a" stroke-opacity=".6" stroke-width=".7"/>`
    + `<circle cx="-62" cy="0" r="5.4" fill="url(#@brass)" ${O}/>`
    + `<path d="M-20 -5 C-28 -24 -50 -24 -60 -5 M-20 -5 C-30 -17 -48 -17 -58 -4 M-20 5 C-28 22 -50 22 -60 5 M-20 4 C-30 15 -48 15 -58 4" stroke="#2a1d08" stroke-width="2.6" fill="none" opacity=".6"/>`
    + `<path d="M-20 -5 C-28 -24 -50 -24 -60 -5 M-20 -5 C-30 -17 -48 -17 -58 -4 M-20 5 C-28 22 -50 22 -60 5 M-20 4 C-30 15 -48 15 -58 4 M-34 -19 L-36 19 M-46 -19 L-46 18" stroke="url(#@brass)" stroke-width="1.5" fill="none"/>`
    + `<path d="M-26 -21 C-34 -24 -46 -23 -54 -16" stroke="#fff4d0" stroke-opacity=".6" stroke-width=".7" fill="none"/>`
    + `<rect x="-21" y="-8" width="4" height="16" rx="1.4" fill="url(#@brass)" ${O}/>`
    + `<path d="M-17 -3.6 L70 -2 L88 0 L70 2 L-17 3.6 Z" fill="url(#@steelV)" ${O}/>`
    + `<path d="M-15 -2.8 L70 -1.4 L86 -0.2" stroke="#fff" stroke-opacity=".8" stroke-width=".8" fill="none"/><path d="M-15 0.4 L80 0.3" stroke="#5a6068" stroke-opacity=".6" stroke-width=".8"/>`, 'translate(100 80)', -36));

  {
    /* the Daru roof-crossbow, cocked: prod square across the stock, string back to the nut, the quarrel resting in the groove on top */
    const PR = bez([58, 0], [61, 14], [58, 30], [46, 43], 12), PL = PR.map(p => [p[0], -p[1]]);
    mk('darucrossbow', "A Daru roof-crossbow", sh(98, 130, 74, 7), diag(.95,
      `<path d="M-52 7 L-2 7 L-2 17 L-52 17 Z" fill="url(#@leatherdV)" ${O}/>`
      + [9.5, 12, 14.5].map(y => `<path d="M-50 ${y} L-62 ${y}" stroke="#a8834f" stroke-width="1.2"/><path d="M-54 ${y} L-62 ${y - 1.8} L-62 ${y} Z" fill="#e0d4b4" stroke="#0b0806" stroke-opacity=".5" stroke-width=".4"/>`).join('')
      + `<path d="M-42 6 v12 M-12 6 v12" stroke="#2e1d0e" stroke-width="3"/>`
      + `<path d="M-90 -9 L-60 -7 L-20 -5 L60 -5 L66 -3 L66 3 L60 5 L-20 5 L-60 8.5 L-90 10.5 Q-95 0 -90 -9 Z" fill="url(#@blackwoodV)" ${O}/>`
      + `<path d="M-88 -7.6 L-60 -5.8 L-20 -4 L60 -4" stroke="#a88a6a" stroke-opacity=".4" stroke-width=".8" fill="none"/><path d="M-70 -2 Q-50 -3 -30 -1 M-80 4 Q-60 3 -40 4" stroke="#6a5240" stroke-opacity=".35" stroke-width=".6" fill="none"/>`
      + `<path d="M-91 -9 L-87 -9 L-86 10.6 L-91 10.6 Q-95 0 -91 -9 Z" fill="url(#@brass)"/>`
      + `<path d="M-16 5 Q-30 14 -54 13" stroke="url(#@brass)" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
      + `<path d="M-30 -7 L-33 -16 Q-35 -21 -30 -21 Q-26 -21 -27 -17" stroke="url(#@iron)" stroke-width="2" fill="none"/>`
      + `<path d="M-14 -5 L60 -5" stroke="#000" stroke-opacity=".0"/><path d="M-12 0 L64 0" stroke="#050403" stroke-width="1.8"/><path d="M-12 -1.4 L64 -1.4" stroke="#a88a6a" stroke-opacity=".35" stroke-width=".5"/>`
      + `<rect x="-16" y="-5.5" width="11" height="11" rx="1.5" fill="url(#@brass)" ${O}/><circle cx="-8.5" cy="0" r="3.2" fill="url(#@brass)" ${O}/>`
      + `<rect x="52" y="-5.6" width="6" height="11.2" fill="url(#@brass)" ${O}/>`
      + `<path d="M46 -43 L-8 -2.6 M46 43 L-8 2.6" stroke="#e2d6ba" stroke-width="1"/>`
      + `<path d="${band(PR, 6.5, 2.6)}" fill="url(#@steel)" ${O}/><path d="${band(PL, 6.5, 2.6)}" fill="url(#@steel)" ${O}/>`
      + `<path d="${offl(PL, 2.2)}" stroke="#d8dde2" stroke-opacity=".6" stroke-width=".9" fill="none"/><path d="${offl(PR.slice(0, 9), -2.2)}" stroke="#d8dde2" stroke-opacity=".35" stroke-width=".8" fill="none"/>`
      + `<path d="M54 -7 L62 -5 M54 -4 L62 -2 M54 2 L62 4 M54 5 L62 7" stroke="#5a3a1d" stroke-width="1.4"/>`
      + `<path d="M-6 1.6 L66 1.6" stroke="#000" stroke-opacity=".5" stroke-width="1.6"/>`
      + `<rect x="-6" y="-1" width="72" height="2" fill="url(#@ashV)"/>`
      + `<path d="M-6 -1 L4 -1 L-2 -5 Z M-6 1 L4 1 L-2 5 Z" fill="#cdbf9c" ${O}/>`
      + `<path d="M66 -2.8 L78 0 L66 2.8 Z" fill="url(#@steelV)" ${O}/><path d="M66.5 -2 L77 0" stroke="#fff" stroke-opacity=".7" stroke-width=".6"/>`, 'translate(98 80)', -30));
  }

  mk('guildblade', "Guild blade", sh(100, 126, 58, 6), diag(1,
    `<rect x="-62" y="-4" width="38" height="8" rx="2" fill="url(#@blackV)" ${O}/>`
    + `<path d="M-60 -4 l3 8 M-55 -4 l3 8 M-50 -4 l3 8 M-45 -4 l3 8 M-40 -4 l3 8 M-35 -4 l3 8 M-30 -4 l3 8" stroke="#3e3a34" stroke-width="1"/>`
    + `<circle cx="-64" cy="0" r="4.2" fill="url(#@iron)" ${O}/>`
    + `<path d="M-24 -6 L44 -6 Q56 -4 66 0 Q56 4 44 6 L-24 6 Z" fill="url(#@blackV)" ${O}/>`
    + `<path d="M-22 -5.4 L44 -5.4 Q55 -3.8 64 -0.3" stroke="#e8ecf0" stroke-opacity=".85" stroke-width="1.1" fill="none"/>`
    + `<path d="M-22 5.4 L44 5.4 Q55 3.8 64 0.3" stroke="#b8bec6" stroke-opacity=".6" stroke-width="1" fill="none"/>`
    + `<path d="M-14 -6 l1.4 1.6 l1.2 -1.6 M-6 -6 l1.4 1.8 l1.2 -1.8" stroke="#0b0806" stroke-width=".9" fill="none"/>`
    + `<ellipse cx="10" cy="1" rx="12" ry="2" fill="#4a4a4e" opacity=".35"/>`, 'translate(100 80)', -36));

  mk('barrowflint', "Barrow-flint blade", sh(100, 128, 66, 6), diag(1,
    `<path d="M-86 -5 Q-60 -8 -14 -6 L-14 6 Q-60 8 -86 6 Q-93 0 -86 -5 Z" fill="url(#@antlerV)" ${O}/>`
    + `<path d="M-70 -6 Q-74 -14 -70 -18 Q-64 -16 -64 -7 Z" fill="url(#@antler)" ${O}/>`
    + `<path d="M-86 -6 q-3 3 -1 6 q-3 3 1 6 M-80 -4 q6 1 10 0 M-58 3 q8 1 14 -1 M-46 -4 q10 1 18 -1" stroke="#4e3f28" stroke-opacity=".7" stroke-width=".8" fill="none"/>`
    + `<path d="M-84 -4.4 Q-60 -7 -16 -5.2" stroke="#fff8e6" stroke-opacity=".5" stroke-width=".8" fill="none"/>`
    + `<path d="M-10 -5 Q20 -16 50 -12 Q72 -6 88 0 Q72 7 50 12 Q20 16 -10 5 Z" fill="#dcd8cc" opacity=".75" ${O}/>`
    + `<path d="M-8 -3.4 Q20 -12.4 50 -9 Q70 -4 84 0 Q70 4.6 50 9 Q20 12.4 -8 3.4 Z" fill="url(#@flint)"/>`
    + [0, 12, 24, 36, 48, 60, 70].map(x => `<path d="M${x} ${-12 + Math.abs(x - 30) * .12} q5 5 10 0" stroke="#585956" stroke-opacity=".55" stroke-width=".8" fill="none"/><path d="M${x + 4} ${12 - Math.abs(x - 34) * .12} q5 -5 10 0" stroke="#585956" stroke-opacity=".55" stroke-width=".8" fill="none"/>`).join('')
    + `<path d="M-6 -0.5 Q30 -2 84 0" stroke="#efefe8" stroke-opacity=".5" stroke-width=".8" fill="none"/><path d="M-8 -4.6 Q20 -15 50 -11.2 Q72 -5.4 86 -0.4" stroke="#fff" stroke-opacity=".55" stroke-width=".7" fill="none"/>`
    + `<path d="M-22 -6.4 L-6 -6.4 L-6 6.4 L-22 6.4 Z" fill="url(#@ragV)" opacity=".9"/>`
    + `<path d="M-22 -6 l4 12 M-18 -6 l4 12 M-14 -6 l4 12 M-10 -6 l4 12 M-22 -2 l16 3" stroke="#6a5a3c" stroke-width=".9"/>`, 'translate(100 80)', -36));

  mk('darusword', "A Daru house-guard's sword", sh(98, 134, 72, 6), diag(.92,
    `<rect x="-88" y="-4.5" width="32" height="9" rx="2" fill="url(#@leatherdV)" ${O}/>`
    + `<path d="M-86 -4.5 l3 9 M-81 -4.5 l3 9 M-76 -4.5 l3 9 M-71 -4.5 l3 9 M-66 -4.5 l3 9 M-61 -4.5 l3 9" stroke="#8a9098" stroke-opacity=".55" stroke-width=".8"/>`
    + `<circle cx="-95" cy="0" r="9" fill="url(#@steel)" ${O}/><circle cx="-95" cy="0" r="6.4" fill="none" stroke="#4a4f56" stroke-width=".8"/>`
    + `<path d="M-98 -3.5 L-92 -3.5 L-92 1 Q-95 4 -98 1 Z" fill="#5a6068"/><path d="M-96.5 -2 h3" stroke="#e8ecf0" stroke-width=".6"/>`
    + `<rect x="-57" y="-20" width="5" height="40" rx="2" fill="url(#@steel)" ${O}/><path d="M-56 -19 v38" stroke="#fff" stroke-opacity=".6" stroke-width=".7"/>`
    + `<path d="M-52 -6 L82 -5 Q94 -3 104 0 Q94 3 82 5 L-52 6 Z" fill="url(#@steelV)" ${O}/>`
    + `<rect x="-48" y="-1.4" width="100" height="2.8" rx="1.4" fill="#5e646c"/><path d="M-48 -1.4 L52 -1.4" stroke="#2e3238" stroke-width=".6"/>`
    + `<path d="M-50 -5.2 L82 -4.2 Q93 -2.6 102 -0.2" stroke="#fff" stroke-opacity=".8" stroke-width="1" fill="none"/><path d="M-50 4.4 L82 3.6 Q92 2.4 100 0.4" stroke="#dfe3e8" stroke-opacity=".3" fill="none"/>`, 'translate(100 80)', -38));

  mk('simtalhalberd', "House guard's halberd", sh(96, 132, 72, 6), diag(.9,
    `<rect x="-96" y="-3" width="150" height="6" rx="2" fill="url(#@woodV)" ${O}/>`
    + `<path d="M-90 -2.2 L50 -2.2" stroke="#f0c890" stroke-opacity=".5" stroke-width=".8"/><path d="M-80 1 L20 0.8 M-40 -0.6 L40 -0.4" stroke="#2a1b0e" stroke-opacity=".45" stroke-width=".6"/>`
    + `<rect x="-98" y="-4" width="9" height="8" rx="1.5" fill="url(#@brassV)" ${O}/>`
    + `<path d="M40 2 Q36 14 30 24 L36 24 Q42 14 44 3 Z M44 2 Q44 16 42 28 L47 26 Q48 14 47 3 Z" fill="url(#@blue)" ${O}/>`
    + `<rect x="38" y="-4" width="9" height="8" rx="1.6" fill="url(#@blueV)" ${O}/><path d="M40 -4 v8 M44 -4 v8" stroke="#a8b8d8" stroke-opacity=".5" stroke-width=".6"/>`
    + `<path d="M54 -4 Q42 -18 46 -40 Q60 -30 86 -38 Q78 -20 74 -4 Z" fill="url(#@steel)" ${O}/>`
    + `<circle cx="64" cy="-20" r="4.2" fill="#140e08" ${O}/><path d="M60 -20 a4.2 4.2 0 0 1 4.2 -4.2" stroke="#fff" stroke-opacity=".5" stroke-width=".7" fill="none"/>`
    + `<path d="M52 -10 q4 -4 8 0 q4 4 8 0 M70 -30 q-4 2 -6 -2" stroke="#6a7078" stroke-width=".7" fill="none"/>`
    + `<path d="M47 -39 Q60 -29 85 -37" stroke="#fff" stroke-opacity=".85" stroke-width="1.4" fill="none"/>`
    + `<path d="M58 4 L64 18 L70 4 Z" fill="url(#@steel)" ${O}/>`
    + `<path d="M66 -3 L102 0 L66 3 Z" fill="url(#@steelV)" ${O}/><path d="M66 -2 L100 -0.2" stroke="#fff" stroke-opacity=".75" stroke-width=".8"/>`
    + `<rect x="50" y="-5" width="17" height="10" rx="1.5" fill="url(#@brassV)" ${O}/><path d="M52 -3.6 h13" stroke="#fff4d0" stroke-opacity=".5" stroke-width=".7"/>`, 'translate(100 82)', -38));

  mk('blackedblade', "Blacked Guild blade", sh(98, 132, 70, 6), diag(.92,
    `<rect x="-84" y="-4.5" width="32" height="9" rx="2" fill="url(#@blackV)" ${O}/>`
    + `<path d="M-82 -4.5 l3 9 M-77 -4.5 l3 9 M-72 -4.5 l3 9 M-67 -4.5 l3 9 M-62 -4.5 l3 9 M-57 -4.5 l3 9" stroke="#3a3836" stroke-width="1"/>`
    + `<circle cx="-89" cy="0" r="6" fill="url(#@black)" ${O}/><rect x="-53" y="-11" width="4" height="22" rx="1.5" fill="url(#@black)" ${O}/>`
    + `<path d="M-49 -5.5 L80 -4.5 Q92 -2.6 100 0 Q92 2.6 80 4.5 L-49 5.5 Z" fill="url(#@blackV)" ${O}/>`
    + `<path d="M-47 -4.8 L80 -3.8 Q91 -2.2 98 -0.2" stroke="#5a5c62" stroke-opacity=".6" stroke-width=".8" fill="none"/><path d="M-46 0 L86 0" stroke="#000" stroke-opacity=".7" stroke-width=".9"/>`
    + `<ellipse cx="-10" cy="-1" rx="20" ry="2.2" fill="#3a3a3e" opacity=".35"/><ellipse cx="40" cy="1.4" rx="14" ry="1.6" fill="#3a3a3e" opacity=".3"/>`, 'translate(100 80)', -38));

  /* ======== trinkets ======== */
  mk('houndtooth', "Hound's tooth", `<ellipse cx="102" cy="76" rx="70" ry="42" fill="url(#@warm)"/>` + sh(100, 124, 62, 7), diag(1,
    `<path d="M-58 -24 Q-10 -30 26 -16 Q52 -4 64 30 Q46 10 24 6 Q-12 4 -58 22 L-51 12 L-60 5 L-50 -2 L-59 -12 Z" fill="url(#@boneV)" ${O}/>`
    + `<path d="M-58 -24 Q-48 -25 -40 -25 L-40 17 Q-50 19 -58 22 L-51 12 L-60 5 L-50 -2 L-59 -12 Z" fill="#8a6d44" opacity=".6"/>`
    + `<path d="M-40 -25 Q-38 -4 -40 17" stroke="#6d5838" stroke-opacity=".7" stroke-width="1.2" fill="none"/>`
    + `<path d="M-32 -25 Q4 -27 28 -14 Q50 -2 61 24" stroke="#fffaf0" stroke-opacity=".75" stroke-width="1.4" fill="none"/>`
    + `<path d="M-30 -6 Q6 -10 36 2" stroke="#fff" stroke-opacity=".25" stroke-width="5" fill="none" stroke-linecap="round"/>`
    + `<path d="M-30 12 Q4 4 34 10 Q48 16 58 26" stroke="#7d6a4b" stroke-opacity=".55" stroke-width="1.2" fill="none"/><path d="M-8 -22 l3 7 M12 -18 l2 6" stroke="#b8a37e" stroke-width=".8"/>`, 'translate(102 70)', -18),
    {warm: '<radialGradient id="ID"><stop offset="0" stop-color="#ff9a40" stop-opacity=".16"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/></radialGradient>'});

  mk('cadretoken', "Cadre token", sh(100, 130, 40, 6),
    `<path d="M97 62 C68 44 58 14 96 12 C134 10 132 42 103 62" stroke="#2e1d0e" stroke-width="3.6" fill="none" stroke-linecap="round"/>`
    + `<path d="M96 60 C70 42 62 16 96 14" stroke="#8a6040" stroke-width="1" fill="none" opacity=".7"/><path d="M96 12 l-3 -5 M98 12 l4 -5" stroke="#2e1d0e" stroke-width="2.6" stroke-linecap="round"/>`
    + `<circle cx="101" cy="96" r="33" fill="url(#@boneedge)" ${O}/>`
    + `<circle cx="99" cy="93" r="32" fill="url(#@bone)" ${O}/>`
    + `<path d="M74 78 A30 30 0 0 1 112 64" stroke="#fffaf0" stroke-opacity=".7" stroke-width="1.4" fill="none"/>`
    + `<circle cx="99" cy="95" r="21" fill="none" stroke="#5a4a32" stroke-width="1.6"/><circle cx="99.7" cy="95.7" r="21" fill="none" stroke="#fffaf0" stroke-opacity=".45" stroke-width=".7"/>`
    + `<path d="M99 80 L99 110 M92 88 L106 88 M90 102 L99 110 L108 102" stroke="#5a4a32" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
    + `<path d="M99.7 80.7 L99.7 110.7 M92.7 88.7 L106.7 88.7" stroke="#fffaf0" stroke-opacity=".45" stroke-width=".6" fill="none"/>`
    + `<circle cx="99" cy="66" r="3.6" fill="#1a1008"/><path d="M99 62.4 C98 60 98 58 97 56 M99 62.4 C100 60 101 58 103 56" stroke="#2e1d0e" stroke-width="3" fill="none"/>`
    + `<path d="M120 112 l4 3 M78 110 l-3 2" stroke="#8f7c5c" stroke-width="1"/>`,
    {boneedge: '<linearGradient id="ID" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9c8762"/><stop offset="1" stop-color="#4e3f28"/></linearGradient>'});

  mk('barrowtorc', "Barrow torc", sh(100, 120, 66, 9),
    `<path d="M79.5 106 A60 34 0 1 1 120.5 106" stroke="#0b0806" stroke-opacity=".7" stroke-width="13" fill="none" stroke-linecap="round"/>`
    + `<path d="M79.5 106 A60 34 0 1 1 120.5 106" stroke="url(#@iron)" stroke-width="10.4" fill="none"/>`
    + `<path d="M79.5 106 A60 34 0 1 1 120.5 106" stroke="#a09a90" stroke-opacity=".26" stroke-width="10" stroke-dasharray="2.4 4.6" fill="none"/>`
    + `<path d="M79.5 106 A60 34 0 1 1 120.5 106" stroke="#000" stroke-opacity=".45" stroke-width="10" stroke-dasharray="2.4 4.6" stroke-dashoffset="3.6" fill="none"/>`
    + `<path d="M46 66 A57 30 0 0 1 128 44" stroke="#c8d4dc" stroke-opacity=".4" stroke-width="1.4" fill="none"/>`
    + `<path d="M156 70 A58 32 0 0 1 128 104" stroke="#000" stroke-opacity=".35" stroke-width="3" fill="none"/>`
    + `<circle cx="78" cy="108" r="7.6" fill="url(#@iron)" ${O}/><circle cx="122" cy="108" r="7.6" fill="url(#@iron)" ${O}/>`
    + `<path d="M74 104 a5 5 0 0 1 6 -2 M118 104 a5 5 0 0 1 6 -2" stroke="#c8d4dc" stroke-opacity=".55" stroke-width="1" fill="none"/>`
    + `<circle cx="78" cy="108" r="3" fill="none" stroke="#121110" stroke-width="1"/><circle cx="122" cy="108" r="3" fill="none" stroke="#121110" stroke-width="1"/>`);

  mk('secondbadge', "Second Army badge, wrong regiment", sh(102, 128, 38, 6),
    `<g transform="rotate(-8 100 74)"><path d="M68 32 Q100 22 132 32 L132 70 Q130 100 100 118 Q70 100 68 70 Z" fill="url(#@bronze)" ${O}/>`
    + `<path d="M74 37 Q100 29 126 37 L126 70 Q124 95 100 111 Q76 95 74 70 Z" fill="none" stroke="#43290f" stroke-opacity=".7" stroke-width="1.4"/>`
    + `<path d="M70 34 Q100 24 130 34 M70 36 L70 70 Q72 96 96 114" stroke="#fde0a8" stroke-opacity=".6" stroke-width="1.2" fill="none"/>`
    + `<path d="M132 34 L132 70 Q130 100 100 118" stroke="#2a1806" stroke-opacity=".5" stroke-width="1.6" fill="none"/>`
    + `<text x="101.2" y="84.2" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="30" fill="#3a2208" opacity=".85">IX</text>`
    + `<text x="99.2" y="82.2" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="30" fill="#f6d8a0" opacity=".7">IX</text>`
    + `<text x="100" y="83" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="30" fill="#a06e36">IX</text>`
    + `<path d="M88 48 L100 42 L112 48" stroke="#43290f" stroke-width="1.6" fill="none"/>`
    + `<ellipse cx="80" cy="98" rx="4" ry="2.6" fill="#5a8a6a" opacity=".45"/><ellipse cx="124" cy="52" rx="3" ry="2" fill="#5a8a6a" opacity=".4"/>`
    + `<path d="M132 58 L142 56" stroke="url(#@steel)" stroke-width="1.6" stroke-linecap="round"/></g>`);

  mk('brackcoin', "Oponn's Own Coin", sh(108, 126, 66, 7),
    `<ellipse cx="156" cy="92" rx="14" ry="32" fill="#4a220c" transform="rotate(14 156 92)" ${O}/>`
    + `<ellipse cx="152" cy="91" rx="13" ry="32" fill="url(#@copper)" transform="rotate(14 152 91)" ${O}/>`
    + `<g transform="rotate(14 152 91)"><ellipse cx="152" cy="91" rx="10" ry="27" fill="none" stroke="#8a4a22" stroke-width="1"/><path d="M149 102 Q148 92 150 86 Q149 80 152 76 Q156 72 157 78 L158 82 Q157 88 156 92 Q155 98 157 102 Z" fill="#a85e30" stroke="#5e3218" stroke-width=".6"/></g>`
    + `<circle cx="84" cy="80" r="40" fill="#4a220c" transform="translate(2 2)"/>`
    + `<circle cx="84" cy="80" r="40" fill="url(#@copper)" ${O}/>`
    + `<circle cx="84" cy="80" r="34" fill="none" stroke="#5e3218" stroke-opacity=".7" stroke-width="1.2"/>`
    + `<path d="M50 70 A36 36 0 0 1 98 45" stroke="#ffd8b0" stroke-opacity=".7" stroke-width="1.4" fill="none"/><path d="M120 92 A36 36 0 0 1 86 116" stroke="#2a1006" stroke-opacity=".55" stroke-width="1.4" fill="none"/>`
    + Array.from({length: 28}, (_, i) => { const a = i / 28 * Math.PI * 2; return `<circle cx="${f(84 + Math.cos(a) * 37)}" cy="${f(80 + Math.sin(a) * 37)}" r=".9" fill="#5e3218" opacity=".7"/>`; }).join('')
    + `<path d="M72 104 Q70 90 74 80 Q71 72 77 64 Q86 54 98 58 Q105 62 103 69 L108 75 L102 77 Q104 83 99 87 Q96 95 103 104 Z" fill="#b06a3a" stroke="#4a220c" stroke-opacity=".7" stroke-width="1"/>`
    + `<path d="M74 80 Q71 72 77 64 Q86 54 98 58" stroke="#ffd0a0" stroke-opacity=".75" stroke-width="1.2" fill="none"/><path d="M102 77 Q104 83 99 87 Q96 95 103 104" stroke="#3a1606" stroke-opacity=".6" stroke-width="1.2" fill="none"/>`
    + `<circle cx="93" cy="68" r="1.4" fill="#5e3218"/><path d="M80 66 q6 -4 12 -4" stroke="#7a3e18" stroke-width="1" fill="none"/>`);

  mk('hoodrep', "Hood's Repellent", sh(102, 126, 38, 6),
    `<path d="M112 48 C140 42 160 24 146 14 C132 6 108 10 96 20 C88 28 86 40 89 48" stroke="#2e1d0e" stroke-width="3" fill="none" stroke-linecap="round"/>`
    + `<path d="M112 48 C140 42 160 24 146 14" stroke="#8a6040" stroke-width="1" fill="none" opacity=".6"/>`
    + `<path d="M84 62 Q70 72 70 96 Q70 122 100 124 Q130 122 130 96 Q130 72 116 62 L112 52 L112 42 L88 42 L88 52 Z" fill="url(#@glass)" opacity=".95" ${O}/>`
    + `<path d="M74 98 Q74 120 100 121 Q126 120 126 98 Q114 104 100 100 Q86 96 74 98 Z" fill="#0a1a3a" opacity=".55"/>`
    + `<path d="M120 70 Q128 82 126 104 Q120 116 108 120" stroke="#0a1a3a" stroke-opacity=".5" stroke-width="3" fill="none"/>`
    + `<path d="M80 74 Q75 92 80 110" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="84" cy="68" r="2" fill="#fff" opacity=".7"/>`
    + `<rect x="85" y="37" width="30" height="7" rx="2.5" fill="url(#@glass)" ${O}/>`
    + `<rect x="89" y="23" width="22" height="15" rx="3" fill="url(#@wood)" ${O}/><path d="M92 28 h3 M101 32 h2 M95 34 h2 M104 26 h2" stroke="#2a1b0e" stroke-width="1"/>`
    + `<ellipse cx="100" cy="48" rx="13" ry="3.4" fill="none" stroke="url(#@leather)" stroke-width="2.6"/>`
    + `<path d="M86 48 q-6 6 -4 14" stroke="#5a3a1d" stroke-width="2" fill="none" stroke-linecap="round"/>`
    + `<path d="M88 82 L114 80 L115 100 L89 102 Z" fill="url(#@vellum)" ${O}/><path d="M92 87 h18 M92 92 h14 M92 97 h17" stroke="#3a2a14" stroke-width=".9" opacity=".7"/>`);

  mk('spawnshard', "Genuine Shard of Moon's Spawn", sh(104, 126, 78, 8),
    `<path d="M24 112 Q20 92 34 80 Q42 70 52 74 Q60 70 66 78 Q80 90 76 112 Q50 122 24 112 Z" fill="url(#@velvet)" ${O}/>`
    + `<path d="M36 78 Q48 86 62 78" stroke="#c8a060" stroke-width="1.6" fill="none"/><path d="M52 82 q-6 12 -14 16 M54 82 q4 10 2 18" stroke="#c8a060" stroke-width="1.2" fill="none"/>`
    + `<path d="M30 96 Q40 104 50 100 M58 106 Q66 100 70 92" stroke="#000" stroke-opacity=".35" stroke-width="2" fill="none"/>`
    + `<path d="M96 40 L124 32 L148 52 L152 82 L134 106 L104 110 L84 90 L82 60 Z" fill="#0a0a0c" ${O}/>`
    + `<path d="M96 40 L124 32 L118 56 L94 62 Z" fill="#3a3a44"/><path d="M82 60 L94 62 L104 86 L84 90 Z" fill="#1c1c22"/>`
    + `<path d="M124 32 L148 52 L130 66 L118 56 Z" fill="#26262e"/><path d="M118 56 L130 66 L126 90 L104 86 L94 62 Z" fill="#131318"/>`
    + `<path d="M148 52 L152 82 L134 106 L126 90 L130 66 Z" fill="#08080a"/><path d="M104 86 L126 90 L134 106 L104 110 Z" fill="#0e0e12"/>`
    + `<path d="M96 40 L124 32 L148 52 M82 60 L96 40 M94 62 L118 56 L124 32" stroke="#e8ecf4" stroke-opacity=".55" stroke-width=".9" fill="none"/>`
    + `<path d="M100 44 L112 41" stroke="#fff" stroke-opacity=".85" stroke-width="1.6" stroke-linecap="round"/>`
    + `<g transform="rotate(-10 150 116)"><rect x="124" y="102" width="52" height="30" rx="1.5" fill="url(#@vellum)" ${O}/>`
    + `<path d="M130 110 h36 M130 115 h40 M130 120 h28" stroke="#3a2a14" stroke-width=".9" opacity=".7"/><path d="M136 107 q4 -3 8 0 q4 3 8 0 q4 -3 8 0" stroke="#3a2a14" stroke-width=".9" fill="none"/>`
    + `<path d="M166 126 l-3 10 M168 126 l3 9" stroke="#8e2620" stroke-width="2"/><circle cx="167" cy="125" r="5.4" fill="url(#@red)" ${O}/><circle cx="166" cy="124" r="2" fill="#e0726a" opacity=".5"/></g>`);

  mk('tyrantmap', "Map to the Tyrant's Hoard", sh(102, 132, 84, 8),
    `<path d="M24 30 L172 22 Q182 22 180 32 L184 118 L22 126 Q18 80 24 30 Z" fill="url(#@vellum)" ${O}/>`
    + `<path d="M172 22 Q182 22 180 32 Q172 34 170 26 Z" fill="#b8a06a" ${O}/>`
    + `<path d="M30 36 L166 29 L172 112 L30 119 Z" fill="none" stroke="#5a3e1e" stroke-opacity=".6" stroke-width="1"/><path d="M33 39 L163 32 L169 109 L33 116 Z" fill="none" stroke="#5a3e1e" stroke-opacity=".4" stroke-width=".6"/>`
    + `<path d="M58 84 l8 -12 l8 12 M70 86 l9 -15 l9 15 M90 80 l7 -10 l7 10 M62 78 l3 2 M75 76 l3 2" stroke="#4a3418" stroke-width="1.3" fill="none"/>`
    + `<path d="M106 92 Q120 86 134 92" stroke="#4a3418" stroke-width=".9" stroke-dasharray="2 2" fill="none"/>`
    + `<path d="M132 74 l10 10 M142 74 l-10 10" stroke="#8e2620" stroke-width="2.6" stroke-linecap="round"/>`
    + `<path d="M38 104 q6 -8 12 0 q6 8 12 0 q6 -8 12 0 M38 104 l-4 -3 l1 5" stroke="#2c5a5a" stroke-opacity=".8" stroke-width="1.3" fill="none"/><circle cx="35" cy="102" r=".9" fill="#2c5a5a"/>`
    + `<path d="M150 46 q5 -6 10 0 q5 6 10 0" stroke="#2c5a5a" stroke-opacity=".7" stroke-width="1.1" fill="none"/>`
    + `<path d="M44 48 q6 -8 10 0 q2 6 8 -2 q4 -6 8 2 q4 4 8 -4 M84 46 q8 -4 14 0 q4 4 10 -2 q6 -4 10 2 M44 58 h50 M44 62 h36" stroke="#3a2a14" stroke-width="1" fill="none" opacity=".75"/>`
    + `<circle cx="150" cy="100" r="7" fill="none" stroke="#4a3418" stroke-width=".9"/><path d="M150 90 L150 110 M140 100 L160 100" stroke="#4a3418" stroke-width=".8"/>`
    + [[60, 40, 4], [128, 60, 3], [46, 92, 3.5], [112, 108, 5], [160, 76, 2.6], [96, 66, 2]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#8a5a28" opacity=".28"/>`).join('')
    + `<path d="M180 32 L184 118 L120 121 Q160 116 176 108 Z" fill="#000" opacity=".12"/>`);

  mk('lampchip', "Blue-glass lamp-chip", `<ellipse cx="106" cy="126" rx="26" ry="5" fill="#3c7ad0" opacity=".14"/>` + sh(100, 126, 34, 5),
    `<path d="M102 70 C96 50 82 32 66 16 M102 70 C110 48 124 30 136 16" stroke="#2e1d0e" stroke-width="2.4" fill="none"/>`
    + `<path d="M86 70 L112 63 L126 82 L117 107 L94 113 L79 94 L82 82 Z" fill="url(#@glass)" opacity=".9" ${O}/>`
    + `<path d="M86 70 L112 63 L104 86 Z" fill="#e8f4ff" opacity=".35"/><path d="M104 86 L126 82 L117 107 Z" fill="#0a1a3a" opacity=".4"/><path d="M104 86 L94 113 L79 94 Z" fill="#2c5ea8" opacity=".3"/>`
    + `<path d="M86 70 L112 63 M82 82 L86 70" stroke="#fff" stroke-opacity=".8" stroke-width="1.1" fill="none"/>`
    + `<path d="M117 107 L94 113 L79 94" stroke="#cfe8ff" stroke-opacity=".45" stroke-width=".7" stroke-dasharray="1.6 1.2" fill="none"/>`
    + `<circle cx="102" cy="72" r="3.2" fill="#0a1a3a"/><path d="M99.5 70.5 a3 3 0 0 1 4 -1" stroke="#fff" stroke-opacity=".5" stroke-width=".7" fill="none"/>`
    + `<path d="M102 70 C101 66 100 64 99 62 M102 70 C104 66 105 64 107 62" stroke="#2e1d0e" stroke-width="2.4" fill="none"/>`);

  mk('collsignet', "Coll's old signet", sh(100, 136, 42, 6),
    `<ellipse cx="100" cy="94" rx="36" ry="40" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="12.4"/>`
    + `<ellipse cx="100" cy="94" rx="36" ry="40" fill="none" stroke="url(#@gold)" stroke-width="10"/>`
    + `<ellipse cx="100" cy="94" rx="31" ry="35" fill="none" stroke="#5a420e" stroke-opacity=".7" stroke-width="1.4"/>`
    + `<path d="M68 82 A36 40 0 0 1 90 55" stroke="#fff6d0" stroke-opacity=".75" stroke-width="1.6" fill="none"/><path d="M134 104 A36 40 0 0 1 104 133" stroke="#3a2806" stroke-opacity=".55" stroke-width="2" fill="none"/>`
    + `<path d="M72 54 L128 54 L124 64 Q100 70 76 64 Z" fill="url(#@gold)" ${O}/>`
    + `<path d="M76 54 L76 61 Q100 68 124 61 L124 54" fill="#8a6418" opacity=".6"/>`
    + `<ellipse cx="100" cy="52" rx="28" ry="11" fill="url(#@goldm)" ${O}/>`
    + `<path d="M80 50 l14 -4 M84 56 l20 -6 M96 58 l18 -6 M108 48 l10 -2" stroke="#8a6a20" stroke-opacity=".45" stroke-width=".6"/>`
    + `<path d="M93 56 L93 50.5 L100 46.5 L107 50.5 L107 56 Z" fill="none" stroke="#6a4a10" stroke-opacity=".55" stroke-width=".8"/>`
    + `<path d="M74 50 Q86 42 104 41.6" stroke="#fff6d0" stroke-opacity=".7" stroke-width="1" fill="none"/>`,
    {goldm: '<linearGradient id="ID" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8cc80"/><stop offset="1" stop-color="#a88430"/></linearGradient>'});

  mk('guildtoken', "Guild token", sh(100, 118, 50, 7),
    `<ellipse cx="100" cy="81" rx="46" ry="32" fill="#050404" ${O}/>`
    + `<path d="M54 76 L54 81 A46 32 0 0 0 146 81 L146 76" fill="#1a1512"/>`
    + `<ellipse cx="100" cy="74" rx="46" ry="32" fill="url(#@horn)" ${O}/>`
    + `<path d="M64 70 Q80 52 112 50 M62 82 Q84 64 120 62 M72 94 Q96 80 132 76 M86 102 Q112 92 138 88" stroke="#6a5a4c" stroke-opacity=".28" stroke-width="1" fill="none"/>`
    + `<path d="M58 66 A44 30 0 0 1 104 43" stroke="#a8988a" stroke-opacity=".55" stroke-width="1.4" fill="none"/>`
    + `<ellipse cx="100" cy="74" rx="8" ry="5.6" fill="#0a0705"/><path d="M92.4 75 A8 5.6 0 0 0 107.6 75" stroke="#5a4a3c" stroke-width="1.2" fill="none"/>`);

  mk('ropehook', "Journeyman's rope-and-hook", sh(102, 128, 76, 8),
    [0, 1, 2, 3, 4, 5].map(i => `<ellipse cx="${80 + i * .6}" cy="${104 - i * 3.4}" rx="${50 - i * 1.2}" ry="${19 - i * .4}" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="6.4"/><ellipse cx="${80 + i * .6}" cy="${104 - i * 3.4}" rx="${50 - i * 1.2}" ry="${19 - i * .4}" fill="none" stroke="url(#@tar)" stroke-width="4.8"/><ellipse cx="${80 + i * .6}" cy="${104 - i * 3.4}" rx="${50 - i * 1.2}" ry="${19 - i * .4}" fill="none" stroke="#a08a68" stroke-opacity=".35" stroke-width="4.6" stroke-dasharray="1.4 3"/>`).join('')
    + `<ellipse cx="83" cy="87" rx="38" ry="10" fill="#140f0a"/><path d="M40 82 A44 16 0 0 1 100 70" stroke="#c8b08a" stroke-opacity=".35" stroke-width="1.2" fill="none"/>`
    + `<path d="M112 76 Q132 60 136 40 Q140 26 148 24" stroke="#0b0806" stroke-opacity=".6" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M112 76 Q132 60 136 40 Q140 26 148 24" stroke="url(#@tar)" stroke-width="4.6" fill="none" stroke-linecap="round"/>`
    + `<circle cx="150" cy="28" r="5" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="4"/><circle cx="150" cy="28" r="5" fill="none" stroke="url(#@iron)" stroke-width="2.6"/>`
    + `<rect x="147" y="32" width="6" height="70" rx="2" fill="url(#@ironV)" ${O}/><path d="M148.4 34 v66" stroke="#b0aaa2" stroke-opacity=".6" stroke-width=".8"/>`
    + [['M150 100 Q128 104 122 84', 'M122 84 L119 74'], ['M150 100 Q172 104 178 84', 'M178 84 L181 74'], ['M150 102 Q152 120 138 122', 'M138 122 L130 116']].map(([arm, tip]) => `<path d="${arm}" stroke="#0b0806" stroke-opacity=".6" stroke-width="10" fill="none" stroke-linecap="round"/><path d="${arm}" stroke="url(#@rag)" stroke-width="8" fill="none" stroke-linecap="round"/><path d="${arm}" stroke="#6a5a3c" stroke-width="8" stroke-dasharray="1 3.4" fill="none" opacity=".6"/><path d="${tip}" stroke="url(#@iron)" stroke-width="3.6" stroke-linecap="round"/>`).join('')
    + `<circle cx="150" cy="101" r="5.4" fill="url(#@rag)" ${O}/>`);

  mk('rhivicharm', "Rhivi bone charm", sh(100, 126, 40, 6),
    `<path d="M96 72 C82 46 66 26 82 16 C96 8 118 12 122 26 C126 40 112 56 104 72" stroke="#1e140c" stroke-width="4.4" fill="none" stroke-linecap="round"/>`
    + `<path d="M96 72 C82 46 66 26 82 16 C96 8 118 12 122 26 C126 40 112 56 104 72" stroke="#7a5a3a" stroke-width="2.4" stroke-dasharray="2.6 2.6" fill="none"/>`
    + `<path d="M96 72 C82 46 66 26 82 16 C96 8 118 12 122 26 C126 40 112 56 104 72" stroke="#3a281a" stroke-width="2.4" stroke-dasharray="2.6 2.6" stroke-dashoffset="2.6" fill="none" opacity=".8"/>`
    + `<circle cx="81" cy="40" r="5.6" fill="url(#@glass)" ${O}/><circle cx="79.4" cy="38.4" r="1.6" fill="#fff" opacity=".75"/>`
    + `<path d="M72 80 Q74 66 88 68 Q96 74 104 70 Q118 62 128 72 Q137 84 129 98 Q133 112 118 116 Q104 110 96 116 Q80 121 72 108 Q65 94 72 80 Z" fill="url(#@bone)" ${O}/>`
    + `<path d="M90 82 Q100 94 114 84" stroke="#7d6a4b" stroke-opacity=".55" stroke-width="1.6" fill="none"/><ellipse cx="104" cy="102" rx="9" ry="5" fill="#8f7c5c" opacity=".35"/>`
    + `<path d="M74 82 Q76 70 88 70 M106 70 Q118 64 126 72" stroke="#fffaf0" stroke-opacity=".7" stroke-width="1.2" fill="none"/>`
    + `<path d="M130 98 Q132 110 118 115 M96 116 Q82 120 74 110" stroke="#5a4a32" stroke-opacity=".55" stroke-width="1.4" fill="none"/>`
    + `<ellipse cx="100" cy="76" rx="4" ry="3" fill="#2a1d10"/><path d="M96 72 Q97 75 98 77 M104 72 Q103 75 102 77" stroke="#1e140c" stroke-width="2.4"/>`);

  mk('otatglove', "Otataral-dusted glove", `<ellipse cx="100" cy="78" rx="56" ry="62" fill="url(#@dust)"/>` + sh(100, 138, 42, 6),
    `<path d="M80 133 L78 106 Q74 92 76 70 L76 40 Q76 32 82 32 Q88 32 88 40 L89 62 L90 30 Q90 22 96 22 Q102 22 102 30 L103 60 L104 28 Q104 20 110 20 Q116 20 116 28 L116 62 L118 38 Q118 30 124 30 Q130 30 130 38 L128 76 Q128 92 124 106 L124 133 Z" fill="url(#@leather)" ${O}/>`
    + `<path d="M78 90 Q64 84 57 68 Q54 58 60 55 Q66 52 70 60 L80 74 Z" fill="url(#@leather)" ${O}/>`
    + `<path d="M124 30 Q130 30 130 38 L128 76 Q128 92 124 106 L124 133 L114 133 Q118 100 116 62 L118 38 Q118 30 124 30 Z" fill="#000" opacity=".2"/>`
    + `<path d="M78 34 L78 66 M92 26 L92 58 M106 24 L106 58 M59 58 Q64 56 68 62" stroke="#f0c890" stroke-opacity=".4" stroke-width="1.1" fill="none"/>`
    + `<path d="M88 40 L89 64 M102 30 L103 62 M116 28 L116 64 M78 106 L124 106 M80 112 L124 112" stroke="#b8402a" stroke-opacity=".75" stroke-width="1.1" stroke-dasharray="1 1.4"/>`
    + `<path d="M82 46 q3 2 6 0 M96 42 q3 2 6 0 M110 44 q3 2 6 0 M80 86 Q100 92 122 84" stroke="#2e1d0e" stroke-opacity=".5" stroke-width="1" fill="none"/>`
    + [[86, 68], [101, 66], [114, 70], [92, 100], [110, 98], [84, 118], [120, 120], [70, 72]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#d0583a" opacity=".8"/>`).join(''),
    {dust: '<radialGradient id="ID"><stop offset="0" stop-color="#c0402a" stop-opacity=".14"/><stop offset="1" stop-color="#c0402a" stop-opacity="0"/></radialGradient>'});

  mk('fetemask', "Fete mask", sh(100, 124, 64, 6),
    `<path d="M40 62 Q22 70 18 88 M160 62 Q178 70 182 88" stroke="url(#@red)" stroke-width="3" fill="none" stroke-linecap="round"/>`
    + `<path d="M40 60 Q60 40 100 50 Q140 40 160 60 Q162 82 146 92 Q124 100 108 86 Q100 80 92 86 Q76 100 54 92 Q38 82 40 60 Z" fill="url(#@red)" ${O}/>`
    + `<path d="M46 60 Q62 46 96 54 M106 52 Q130 44 150 54" stroke="#f0a098" stroke-opacity=".45" stroke-width="1.6" fill="none"/>`
    + `<path d="M146 92 Q124 100 108 86 Q100 80 92 86 Q76 100 54 92" stroke="#d8c8a0" stroke-opacity=".55" stroke-width="1.2" fill="none"/>`
    + `<path d="M58 70 Q72 58 86 68 Q74 80 58 70 Z M114 68 Q128 58 142 70 Q126 80 114 68 Z" fill="#100604" ${O}/>`
    + `<path d="M60 70 Q72 60 84 67 M116 67 Q128 60 140 69" stroke="#e07a70" stroke-opacity=".5" fill="none"/>`
    + `<path d="M150 64 Q156 76 148 88" stroke="#000" stroke-opacity=".3" stroke-width="3" fill="none"/>`
    + [[46, 84], [54, 92], [66, 96], [78, 95], [88, 89], [154, 84], [146, 92], [134, 96], [122, 95], [112, 89]].map(([x, y]) => `<path d="M${x} ${y} v3" stroke="#4a3812" stroke-width=".8"/><path d="M${x - 3.2} ${y + 8} Q${x - 3.2} ${y + 2.6} ${x} ${y + 2.6} Q${x + 3.2} ${y + 2.6} ${x + 3.2} ${y + 8} Z" fill="url(#@brass)" ${O}/><ellipse cx="${x}" cy="${y + 8}" rx="2.6" ry="1" fill="#e8dca0"/>`).join(''));

  mk('bbstrap', "Sapper's satchel strap", sh(100, 120, 78, 7), (() => {
    const P = join(bez([22, 104], [60, 126], [82, 62], [118, 74]), bez([118, 74], [150, 86], [160, 52], [182, 58]));
    return `<path d="${band(P, 15, 15)}" fill="url(#@leather)" ${O}/>`
      + `<path d="${offl(P, -6.6)}" stroke="#e0b080" stroke-opacity=".6" stroke-width=".9" stroke-dasharray="2 2" fill="none"/><path d="${offl(P, -4.6)}" stroke="#e0b080" stroke-opacity=".45" stroke-width=".9" stroke-dasharray="2 2" fill="none"/>`
      + `<path d="${offl(P, 6.6)}" stroke="#2e1d0e" stroke-opacity=".8" stroke-width=".9" stroke-dasharray="2 2" fill="none"/><path d="${offl(P, 4.6)}" stroke="#2e1d0e" stroke-opacity=".6" stroke-width=".9" stroke-dasharray="2 2" fill="none"/>`
      + `<path d="${offl(P.slice(4, 30), -1)}" stroke="#f0c890" stroke-opacity=".22" stroke-width="3" fill="none"/>`
      + [[150, 72], [160, 66], [170, 61]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#1a1007"/>`).join('')
      + `<rect x="108" y="64" width="20" height="20" rx="5" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="5.4" transform="rotate(22 118 74)"/>`
      + `<rect x="108" y="64" width="20" height="20" rx="5" fill="none" stroke="url(#@iron)" stroke-width="3.6" transform="rotate(22 118 74)"/>`
      + `<path d="M118 74 L130 79" stroke="url(#@iron)" stroke-width="2" stroke-linecap="round"/><path d="M109 66 Q114 62 120 63" stroke="#c4c0b8" stroke-opacity=".6" stroke-width=".9" fill="none" transform="rotate(22 118 74)"/>`; })());

  mk('moranthchit', "Moranth chit", sh(106, 124, 56, 7),
    `<path d="M70 92 C56 60 60 30 76 14 M70 92 C84 64 104 40 116 22" stroke="#2e1d0e" stroke-width="2.6" fill="none"/>`
    + `<path d="M56 98 Q66 46 124 38 Q156 36 166 58 Q146 52 124 58 Q90 68 80 108 Q64 112 56 98 Z" fill="url(#@chitin)" ${O}/>`
    + `<path d="M80 108 Q90 68 124 58 Q146 52 166 58 L164 63 Q146 58 126 64 Q94 74 86 110 Z" fill="#000" opacity=".55"/>`
    + `<path d="M66 92 Q74 56 120 48 M74 98 Q84 66 122 54 M64 80 Q76 50 116 44" stroke="#6a8a84" stroke-opacity=".35" stroke-width=".9" fill="none"/>`
    + `<path d="M58 94 Q66 48 122 40 Q150 38 162 54" stroke="#e0f4ee" stroke-opacity=".65" stroke-width="1.4" fill="none"/>`
    + `<path d="M56 98 Q66 46 124 38 Q156 36 166 58 Q146 52 124 58 Q90 68 80 108 Q64 112 56 98 Z" fill="url(#@iri)"/>`
    + `<path d="M118 39 L122 46 L127 38.4 Z" fill="#120d08" stroke="#a8c0b8" stroke-opacity=".6" stroke-width=".7"/>`
    + `<circle cx="70" cy="94" r="3.2" fill="#0a0604"/><path d="M70 91 Q69 90 68 88 M70 91 Q72 90 73 88" stroke="#2e1d0e" stroke-width="2.6"/>`,
    {iri: '<linearGradient id="ID" x1="0" y1="0" x2="1" y2=".4"><stop offset="0" stop-color="#40a090" stop-opacity=".3"/><stop offset=".5" stop-color="#6040a0" stop-opacity=".24"/><stop offset="1" stop-color="#40a090" stop-opacity=".06"/></linearGradient>'});

  mk('phoenixkey', "Key to a door that does not exist", sh(100, 126, 66, 6), diag(1,
    `<circle cx="-70" cy="0" r="15" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="9"/><circle cx="-70" cy="0" r="15" fill="none" stroke="url(#@iron)" stroke-width="7"/>`
    + `<path d="M-83 -6 A15 15 0 0 1 -66 -14.6" stroke="#b0aaa2" stroke-opacity=".6" stroke-width="1.2" fill="none"/>`
    + `<rect x="-56" y="-5" width="8" height="10" rx="1.5" fill="url(#@ironV)" ${O}/>`
    + `<rect x="-50" y="-3" width="118" height="6" rx="2.6" fill="url(#@ironV)" ${O}/><path d="M-48 -2 L66 -2" stroke="#a8a29a" stroke-opacity=".55" stroke-width=".8"/>`
    + `<path d="M46 3 L66 3 L66 14 L61 14 L60 21 L56 17 L53 24 L49 20 L46 22 Z" fill="url(#@iron)" ${O}/>`
    + `<path d="M46 4 L66 4" stroke="#a8a29a" stroke-opacity=".4" stroke-width=".7"/>`
    + [[-30, -1], [-6, 1], [20, -1], [34, 1], [56, 10]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#5a3a20" opacity=".7"/>`).join(''), 'translate(102 76)', -34));

  mk('clawpen', "A neat hand's pen", sh(100, 124, 62, 6), diag(1,
    `<rect x="-82" y="-4.2" width="120" height="8.4" rx="4" fill="url(#@pewterV)" ${O}/>`
    + `<path d="M-78 -2.6 L36 -2.6" stroke="#e6e8e6" stroke-opacity=".55" stroke-width=".9"/>`
    + `<path d="M38 -4.2 L48 -3.2 L48 3.2 L38 4.2 Z" fill="url(#@steelV)" ${O}/>`
    + `<path d="M48 -3.6 L70 -2 L84 0 L70 2 L48 3.6 Z" fill="url(#@steelV)" ${O}/>`
    + `<path d="M49 -2.8 L70 -1.4 L82 -0.2" stroke="#fff" stroke-opacity=".7" stroke-width=".7" fill="none"/>`
    + `<path d="M66 -1.8 L84 0 L66 1.8 Z" fill="#12141e" opacity=".85"/><path d="M60 0 L84 0" stroke="#060608" stroke-width=".9"/><circle cx="60" cy="0" r="1.3" fill="#060608"/>`, 'translate(100 78)', -36));
})();
