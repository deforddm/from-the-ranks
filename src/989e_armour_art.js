/* ============ v13.57.0: pictures for the twelve armour pieces of src/988_armour.js ============
   The series look (docs/item-art.md): 200×150, the book's tinted vignette, lit from the upper left, a ground shadow, a thin dark outline,
   materials that read. Ids inside each picture are prefixed with the item id ("@"). One body shape per kind of garment, then each piece's own surface. */
(function(){
  if (typeof ART === 'undefined') return;
  const O = 'stroke="#0b0806" stroke-opacity=".65" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"';
  const lin = (id, stops, x2 = 1, y2 = 1) => `<linearGradient id="@${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  const VIG = {moi:['#2e3440', '#1a1e26', '#0c0e12'], hoc:['#3a3022', '#211a12', '#110d09'], mt:['#26343a', '#162025', '#0a1012'], tth:['#2a2a3c', '#181826', '#0b0b12']};
  const base = bk => { const v = VIG[bk]; return `<radialGradient id="@bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="${v[0]}"/><stop offset=".62" stop-color="${v[1]}"/><stop offset="1" stop-color="${v[2]}"/></radialGradient>`
    + `<radialGradient id="@sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset=".55" stop-color="#000" stop-opacity=".32"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`
    + lin('lit', [[0, '#fff', .22], [.45, '#fff', 0], [.6, '#000', 0], [1, '#000', .45]]); };
  const sh = (rx = 54) => `<ellipse cx="100" cy="128" rx="${rx}" ry="6" fill="url(#@sh)"/>`;
  /* the garment shapes */
  const COAT = 'M80 20 L92 16 L100 25 L108 16 L120 20 L148 36 L162 72 L146 78 L134 50 L136 122 Q100 128 64 122 L66 50 L54 78 L38 72 L52 36 Z';   // sleeved, to the hip
  const VEST = 'M82 20 L92 16 L100 26 L108 16 L118 20 L136 32 L130 54 L134 120 Q100 126 66 120 L70 54 L64 32 Z';                                   // no sleeves
  const ROBE = 'M82 16 L92 13 L100 21 L108 13 L118 16 L150 34 L168 84 L150 90 L136 56 L146 130 Q100 136 54 130 L64 56 L50 90 L32 84 L50 34 Z';     // long and loose
  const PLATE = 'M78 26 Q100 14 122 26 L140 38 L132 58 L136 96 Q118 124 100 126 Q82 124 64 96 L68 58 L60 38 Z';                                   // a breastplate
  const body = (d, fill) => `<path d="${d}" fill="${fill}"/>`;
  const done = d => `<path d="${d}" fill="url(#@lit)"/><path d="${d}" fill="none" ${O}/>`;
  const clip = d => `<clipPath id="@c"><path d="${d}"/></clipPath>`;
  const C = s => `<g clip-path="url(#@c)">${s}</g>`;
  /* surfaces, drawn inside the garment's clip */
  const scales = (col, hi, y0 = 30, y1 = 124, step = 9) => { let s = ''; for (let y = y0, r = 0; y < y1; y += step, r++) for (let x = 34 + (r % 2 ? 5 : 0); x < 170; x += 10) s += `<path d="M${x} ${y} q5 ${step + 2} 10 0" fill="${col}" stroke="#0b0806" stroke-opacity=".5" stroke-width=".7"/><path d="M${x + 2} ${y + 1} q3 4 6 0" fill="none" stroke="${hi}" stroke-opacity=".5" stroke-width=".7"/>`; return s; };
  const bands = (col, hi, y0 = 34, step = 12) => { let s = ''; for (let y = y0; y < 124; y += step) s += `<rect x="30" y="${y}" width="140" height="${step - 3}" fill="${col}"/><path d="M30 ${y + 1} H170" stroke="${hi}" stroke-opacity=".55" stroke-width="1"/><path d="M30 ${y + step - 3} H170" stroke="#0b0806" stroke-opacity=".6" stroke-width="1"/>` + [70, 86, 114, 130].map(x => `<circle cx="${x}" cy="${y + (step - 3) / 2}" r="1.1" fill="${hi}"/>`).join(''); return s; };
  const lames = (a, b, cord) => { let s = ''; for (let y = 32, r = 0; y < 124; y += 11, r++) { for (let x = 32; x < 170; x += 7) s += `<rect x="${x}" y="${y}" width="6" height="10" rx="1.2" fill="${r % 2 ? a : b}" stroke="#0b0806" stroke-opacity=".5" stroke-width=".6"/>`; s += `<path d="M32 ${y + 3} H170" stroke="${cord}" stroke-width=".9" stroke-dasharray="1.6 5.4"/>`; } return s; };
  const quilt = (line, w = 12) => { let s = ''; for (let k = -120; k < 220; k += w) s += `<path d="M${k} 10 L${k + 130} 140 M${k + 130} 10 L${k} 140" stroke="${line}" stroke-opacity=".55" stroke-width="1"/>`; return s; };
  const rivets = col => { let s = ''; for (let y = 36; y < 122; y += 11) for (let x = 60 + ((y / 11 | 0) % 2 ? 5 : 0); x < 142; x += 10) s += `<circle cx="${x}" cy="${y}" r="1.2" fill="${col}"/>`; return s; };
  const hair = col => { let s = ''; for (let i = 0; i < 150; i++) { const x = 62 + (i * 37) % 78, y = 26 + (i * 53) % 94; s += `<path d="M${x} ${y} l${(i % 3) - 1} ${3 + i % 3}" stroke="${col}" stroke-opacity=".5" stroke-width=".8"/>`; } return s; };
  const seam = (col = '#d8b080') => `<path d="M100 26 L100 124" stroke="#1a0e06" stroke-width="1.6"/><path d="M103 28 L103 122" stroke="${col}" stroke-opacity=".55" stroke-width="1" stroke-dasharray="2 2.4"/>`;
  const laces = (x, col) => { let s = ''; for (let y = 40; y < 118; y += 9) s += `<path d="M${x - 3} ${y} l6 5 M${x + 3} ${y} l-6 5" stroke="${col}" stroke-width="1" stroke-linecap="round"/>`; return s; };
  function put(key, bk, defs, bodySvg, rx){
    const P = key.replace(/[^a-z0-9]/g, '') + '-', label = (typeof ARMOUR_NEW !== 'undefined' && (ARMOUR_NEW.find(a => a.id === key) || {def:{}}).def.name) || key;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="${String(label).replace(/"/g, '&quot;')}"><defs>${base(bk)}${defs}</defs><rect width="200" height="150" fill="url(#@bg)"/>${sh(rx)}${bodySvg}</svg>`;
    ART['item/' + key] = svg.replace(/@/g, P); if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [200, 150];
  }
  /* Book Three */
  put('b3_c1_hostscale', 'moi', clip(COAT) + lin('m', [[0, '#8e969c'], [1, '#3c4248']], 0, 1),
    body(COAT, 'url(#@m)') + C(scales('#6c747a', '#dfe6ea')) + `<path d="M88 18 L100 27 L112 18" fill="none" stroke="#4a3220" stroke-width="5"/><rect x="104" y="20" width="9" height="5" fill="#2a2420" transform="rotate(-32 108 22)"/>` + done(COAT));
  put('b3_c2_rhivijerkin', 'moi', clip(VEST) + lin('h', [[0, '#b08a5a'], [.5, '#86603a'], [1, '#4a321c']]),
    body(VEST, 'url(#@h)') + C(`<path d="M70 40 Q100 52 132 40 M68 80 Q100 92 134 80" fill="none" stroke="#3a2412" stroke-opacity=".3" stroke-width="6"/>`) + laces(72, '#e0cfae') + laces(128, '#e0cfae') + seam('#e0cfae')
    + `<path d="M66 120 l-3 9 M74 122 l-2 10 M84 123 l-1 10 M96 124 l0 10 M108 124 l1 10 M118 123 l2 10 M128 121 l3 9" stroke="#6a4a2a" stroke-width="2" stroke-linecap="round"/>` + done(VEST), 46);
  put('b3_c5_lamellar', 'moi', clip(VEST) + lin('m', [[0, '#7a2a20'], [1, '#3a120c']], 0, 1),
    body(VEST, 'url(#@m)') + C(lames('#a8322a', '#c89a3a', '#2a1a10')) + `<path d="M82 20 L92 16 L100 26 L108 16 L118 20" fill="none" stroke="#c89a3a" stroke-width="2.4"/>`
    + C(`<path d="M60 96 Q90 88 140 104 L140 130 L60 130 Z" fill="#3a2c1c" fill-opacity=".45"/>`) + done(VEST), 46);
  /* Book Four */
  put('b4_c2_arencoat', 'hoc', clip(COAT) + lin('l', [[0, '#6a4a2c'], [1, '#2e1c0e']]),
    body(COAT, 'url(#@l)') + `<g clip-path="url(#@c)"><clipPath id="@t"><rect x="64" y="30" width="72" height="96"/></clipPath><g clip-path="url(#@t)">${bands('#70787e', '#d8dee2')}</g></g>`
    + `<path d="M120 20 L148 36 L142 50 L122 36 Z" fill="#8a9298" ${O}/><circle cx="133" cy="36" r="4" fill="none" stroke="#2a2420" stroke-width="1.4"/><path d="M133 32 v8 M129 36 h8" stroke="#2a2420" stroke-width="1.1"/>` + done(COAT));
  put('b4_c3_khundrylvest', 'hoc', clip(VEST) + lin('h', [[0, '#7a5a3c'], [.5, '#59402a'], [1, '#2c1e12']]),
    body(VEST, 'url(#@h)') + C(hair('#d8c0a0')) + seam('#1a1210')
    + [34, 46, 58, 70, 82, 94, 106].map(y => `<path d="M96 ${y} q-2 4 0 6 q2 -2 0 -6 Z M104 ${y + 5} q-2 4 0 6 q2 -2 0 -6 Z" fill="#0c0a0a"/>`).join('')
    + `<path d="M70 54 Q68 86 66 120 M130 54 Q132 86 134 120" fill="none" stroke="#0c0a0a" stroke-width="1.4" stroke-dasharray="3 3"/>` + done(VEST), 46);
  put('b4_c5_telaba', 'hoc', clip(ROBE) + lin('tc', [[0, '#d8c49a'], [.5, '#b89e70'], [1, '#6e5a3a']]),
    body(ROBE, 'url(#@tc)') + C(`<clipPath id="@q"><path d="M60 20 H140 V70 H60 Z"/></clipPath><g clip-path="url(#@q)">${quilt('#5a4628', 10)}</g>`
      + `<path d="M70 72 Q74 104 66 132 M88 72 Q88 104 84 134 M112 72 Q112 104 116 134 M130 72 Q126 104 134 132" fill="none" stroke="#4a3a20" stroke-opacity=".4" stroke-width="3"/><path d="M60 70 H140" stroke="#4a3a20" stroke-width="1.4"/>`)
    + `<path d="M92 13 L100 21 L108 13" fill="none" stroke="#7a2a22" stroke-width="3"/><path d="M62 96 H138" stroke="#7a2a22" stroke-width="4" stroke-opacity=".8"/><path d="M112 96 l4 16 l5 -1 l-3 -15" fill="#7a2a22"/>` + done(ROBE), 58);
  /* Book Five */
  put('b5_c1_brigandine', 'mt', clip(VEST) + lin('b', [[0, '#3e5a80'], [.5, '#2c4466'], [1, '#14223a']]),
    body(VEST, 'url(#@b)') + C(rivets('#c8b070')) + seam('#c8b070') + `<path d="M82 20 L92 16 L100 26 L108 16 L118 20" fill="none" stroke="#e8e4d8" stroke-width="3"/><rect x="112" y="42" width="12" height="8" fill="#e8e4d8" ${O}/><path d="M114 45 h8 M114 48 h5" stroke="#2a2420" stroke-width=".9"/>`
    + [[84, 50], [84, 78], [84, 104]].map(([x, y]) => `<rect x="${x + 12}" y="${y}" width="9" height="4" rx="1" fill="#6a4a2a" ${O}/><circle cx="${x + 22}" cy="${y + 2}" r="1.8" fill="#c8b070"/>`).join('') + done(VEST), 46);
  put('b5_c3_coldjack', 'mt', clip(COAT) + lin('g', [[0, '#b4b0a4'], [.5, '#8c887c'], [1, '#4a483e']]),
    body(COAT, 'url(#@g)') + C(quilt('#3a382e', 13)) + seam('#e8e4d8') + [36, 58, 80, 102].map(y => `<path d="M96 ${y} h8" stroke="#3a2a1a" stroke-width="2.4" stroke-linecap="round"/>`).join('')
    + `<path d="M66 118 Q100 124 134 118 M54 75 L40 70 M146 75 L160 70" fill="none" stroke="#3a382e" stroke-width="2"/>` + done(COAT));
  put('b5_c4_wallplate', 'mt', lin('p', [[0, '#eef2f4'], [.3, '#a8b2b8'], [.7, '#5e686e'], [1, '#2a3036']]),
    body(PLATE, 'url(#@p)') + `<path d="M100 22 L100 124" stroke="#eef2f4" stroke-opacity=".6" stroke-width="1.6"/><path d="M102 22 L102 124" stroke="#1a2026" stroke-opacity=".5" stroke-width="1.2"/>`
    + `<path d="M66 96 Q100 110 134 96 M70 106 Q100 120 130 106" fill="none" stroke="#1a2026" stroke-opacity=".6" stroke-width="1.4"/>` + [[72, 44], [128, 44], [70, 86], [130, 86]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#d8c080" ${O}/>`).join('')
    + `<path d="M60 38 L44 30 L40 40 L58 50 Z" fill="#6a4a2a" ${O}/><path d="M140 38 L160 28 L166 40 L176 36" fill="none" stroke="#6a4a2a" stroke-width="6" stroke-linecap="round"/><rect x="170" y="31" width="8" height="9" rx="1.5" fill="none" stroke="#d8c080" stroke-width="1.6"/>`
    + `<path d="M84 60 l8 -6 l8 6 l8 -6 l8 6" fill="none" stroke="#1a2026" stroke-opacity=".7" stroke-width="1.6"/>` + done(PLATE), 44);
  /* Book Eight */
  put('b8_c1_duelcoat', 'tth', clip(COAT) + lin('s', [[0, '#7a2e4a'], [.5, '#5a1e36'], [1, '#2a0c1a']]),
    body(COAT, 'url(#@s)') + C(`<g opacity=".8">${[76, 88, 112, 124].map(x => `<path d="M${x} 24 V126" stroke="#2a0c1a" stroke-width="1.2"/><path d="M${x + 1.5} 24 V126" stroke="#c88aa0" stroke-opacity=".35" stroke-width=".8"/>`).join('')}</g>`)
    + `<path d="M92 16 L100 25 L96 60 L84 30 Z M108 16 L100 25 L104 60 L116 30 Z" fill="#1a0810" ${O}/>` + [66, 78, 90, 102, 114].map(y => `<circle cx="100" cy="${y}" r="2" fill="#d8b860" ${O}/>`).join('')
    + `<path d="M54 74 L40 70 M146 74 L160 70" stroke="#d8b860" stroke-width="2"/><path d="M72 96 h16 M112 96 h16" stroke="#1a0810" stroke-width="2"/>` + done(COAT));
  put('b8_c3_harbourleathers', 'tth', clip(COAT) + lin('l', [[0, '#5a5448'], [.5, '#3c382e'], [1, '#1c1a14']]),
    body(COAT, 'url(#@l)') + C(`<path d="M78 30 Q74 70 80 118 M124 34 Q128 80 120 120" fill="none" stroke="#0c0a08" stroke-opacity=".4" stroke-width="5"/><path d="M40 60 Q100 46 160 62 M44 100 Q100 90 156 104" fill="none" stroke="#d8d4c8" stroke-opacity=".22" stroke-width="3" stroke-dasharray="6 9"/>`)
    + seam('#b8b0a0') + `<circle cx="84" cy="52" r="8" fill="none" stroke="#b8b0a0" stroke-width="1.6"/><path d="M78 52 q6 -8 12 0 q-6 8 -12 0 M84 46 q8 6 0 12 q-8 -6 0 -12" fill="none" stroke="#b8b0a0" stroke-width="1.4"/>`
    + [44, 66, 88, 110].map(y => `<rect x="97" y="${y}" width="6" height="4" rx="1" fill="#8a7a50" ${O}/>`).join('') + done(COAT));
  put('b8_c6_watchcuirass', 'tth', lin('p', [[0, '#f0f2f6'], [.3, '#a4aab6'], [.7, '#585e6c'], [1, '#262a34']]),
    body(PLATE, 'url(#@p)') + `<path d="M100 22 L100 124" stroke="#f0f2f6" stroke-opacity=".5" stroke-width="1.4"/><path d="M68 58 Q100 50 132 58" fill="none" stroke="#1a1c24" stroke-opacity=".6" stroke-width="1.4"/>`
    + `<path d="M62 100 Q100 116 138 100 L136 110 Q100 126 64 110 Z" fill="#3a2a1c" ${O}/><rect x="94" y="106" width="12" height="9" rx="1.5" fill="none" stroke="#d8c080" stroke-width="1.8"/>`
    + `<path d="M124 108 q10 2 8 12 q-2 6 -8 4" fill="none" stroke="#d8c080" stroke-width="2.2" stroke-linecap="round"/>` + [[74, 40], [126, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#d8c080" ${O}/>`).join('')
    + `<circle cx="100" cy="74" r="9" fill="none" stroke="#1a1c24" stroke-opacity=".7" stroke-width="1.6"/><path d="M100 67 v14 M93 74 h14" stroke="#1a1c24" stroke-opacity=".7" stroke-width="1.4"/>` + done(PLATE), 44);
})();
