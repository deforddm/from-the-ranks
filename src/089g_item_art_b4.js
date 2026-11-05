/* ============ the item art pass (v8.1.x): Book Four's gear, redrawn ============
   David, Oct 30 2026: "do a pass on the item art. make it better in general and be sure to fix the bows."
   Every b4_ item is redrawn here as an override of the chapter art files (71b–77b), to the series look:
   200×150, Book Four's dust vignette (#3a3022→#110d09), light from the upper left, a soft ground shadow,
   materials that read (steel bevel, stitched leather, horn, cloth folds, ring and scale texture), a thin dark outline,
   long things on the lower-left to upper-right diagonal. Ids inside each picture are prefixed with the item id ("@" below). */
(function(){
  if (typeof ART === 'undefined') return;
  const O = 'stroke="#0b0806" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"';
  const sh = (cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#@sh)"/>`;
  /* a silhouette: fill, the shared upper-left light over it, the outline on top */
  const S = (d, fill, lit = '@lit') => `<path d="${d}" fill="${fill}"/><path d="${d}" fill="url(#${lit})"/><path d="${d}" fill="none" ${O}/>`;
  const ol = d => `<path d="${d}" fill="none" ${O}/>`;
  const lin = (id, stops, x2 = 1, y2 = 1) => `<linearGradient id="@${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a]) => `<stop offset="${o}" stop-color="${c}"${a != null ? ` stop-opacity="${a}"` : ''}/>`).join('')}</linearGradient>`;
  const BASE = `<radialGradient id="@bg" cx=".44" cy=".42" r=".78"><stop offset="0" stop-color="#3a3022"/><stop offset=".62" stop-color="#211a12"/><stop offset="1" stop-color="#110d09"/></radialGradient>`
    + `<radialGradient id="@sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset=".55" stop-color="#000" stop-opacity=".32"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>`
    + lin('lit', [[0, '#fff', .2], [.45, '#fff', 0], [.6, '#000', 0], [1, '#000', .42]])
    + lin('litv', [[0, '#fff', .24], [.4, '#fff', 0], [.6, '#000', 0], [1, '#000', .45]], 0, 1)
    + lin('st', [[0, '#e9edf0'], [.35, '#a9b1b8'], [.7, '#69717a'], [1, '#353b42']], 0, 1)
    + lin('lt', [[0, '#9a6a40'], [.55, '#6c4527'], [1, '#3a2313']])
    + lin('wd', [[0, '#9c7649'], [.5, '#6e4f2e'], [1, '#3c2916']], 0, 1)
    + lin('bn', [[0, '#f6eedc'], [.5, '#dccfb2'], [1, '#9a8866']])
    + lin('brs', [[0, '#f2d58f'], [.45, '#bb8e3e'], [1, '#634416']]);
  function put(key, label, defs, body){
    const P = key.replace(/[^a-z0-9]/g, '') + '-';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="${label.replace(/"/g, '&quot;')}"><defs>${BASE}${defs}</defs><rect width="200" height="150" fill="url(#@bg)"/>${body}</svg>`;
    ART['item/' + key] = svg.replace(/@/g, P);
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [200, 150];
  }

  /* ---------- chapter one ---------- */
  /* Fourteenth issue mail: knee-length, new and oiled, never hit; a tin tag at the collar with the Fourteenth's mark */
  { const d = 'M78 22 L92 15 Q100 25 108 15 L122 22 L150 38 L160 64 L143 69 L134 50 L137 124 Q100 131 63 124 L66 50 L57 69 L40 64 L50 38 Z';
    put('b4_c1_issuemail', 'Fourteenth issue mail',
      `<pattern id="@rg" width="5" height="4" patternUnits="userSpaceOnUse"><g fill="none" stroke="#8e969e" stroke-width=".8" stroke-opacity=".62"><circle cx="0" cy="0" r="1.7"/><circle cx="5" cy="0" r="1.7"/><circle cx="0" cy="4" r="1.7"/><circle cx="5" cy="4" r="1.7"/><circle cx="2.5" cy="2" r="1.7"/></g></pattern>`
      + lin('tin', [[0, '#d6dadc'], [.5, '#9aa0a4'], [1, '#585e63']]),
      sh(100, 129, 54, 6)
      + `<path d="${d}" fill="#2c3036"/><path d="${d}" fill="url(#@rg)"/><path d="${d}" fill="url(#@lit)"/>`
      + `<path d="M84 40 Q80 80 82 122 M118 40 Q122 84 118 124 M100 30 Q98 80 100 128" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="5"/>`
      + `<path d="M70 52 Q72 86 70 118" fill="none" stroke="#f3e4c0" stroke-opacity=".16" stroke-width="4"/>`
      + `<path d="M64 123 Q100 130 136 123" fill="none" stroke="#dfe4e8" stroke-opacity=".7" stroke-width="1.6" stroke-dasharray="2 1.4"/>`
      + `<path d="M41 63 L57 68 M143 68 L159 63" stroke="#dfe4e8" stroke-opacity=".6" stroke-width="1.4" stroke-dasharray="2 1.4"/>`
      + `<path d="M92 16 Q100 28 108 16 Q100 21 92 16 Z" fill="#14171a"/>` + ol(d)
      + `<path d="M104 22 L106 30" stroke="#2a2a2a" stroke-width=".9"/><g transform="rotate(8 109 33)"><rect x="102" y="29" width="15" height="10" rx="1.5" fill="url(#@tin)" ${O}/><text x="109.5" y="36.6" font-family="Georgia,serif" font-size="5.4" text-anchor="middle" fill="#2e3236" letter-spacing=".3">XIV</text></g>`);
  }

  /* the finger bone, small and very white, drilled and tied on a leather thong the way the order says */
  put('b4_c1_finger', 'A finger bone on a thong', '',
    sh(102, 104, 54, 6)
    + `<path d="M64 81 C70 100 120 108 178 24" fill="none" stroke="#2a180c" stroke-width="3.6" stroke-linecap="round"/><path d="M64 81 C70 100 120 108 178 24" fill="none" stroke="#8a5a32" stroke-width="2" stroke-linecap="round"/><path d="M66 84 C78 98 112 104 172 34" fill="none" stroke="#c48f5a" stroke-opacity=".5" stroke-width=".7"/>`
    + `<path d="M24 22 C34 52 46 72 61 78" fill="none" stroke="#2a180c" stroke-width="3.6" stroke-linecap="round"/><path d="M24 22 C34 52 46 72 61 78" fill="none" stroke="#8a5a32" stroke-width="2" stroke-linecap="round"/>`
    + S('M56 75 Q60 67 68 70 L92 71 Q99 66 103 72 Q106 79 103 85 Q99 91 92 86 L68 87 Q60 91 56 83 Q53 79 56 75 Z', 'url(#@bn)')
    + S('M107 74 Q111 69 116 72 L124 72 Q130 69 132 75 Q134 80 131 84 Q128 88 123 85 L116 85 Q111 88 107 84 Q104 79 107 74 Z', 'url(#@bn)')
    + S('M135 75 Q139 71 143 74 L150 76 Q156 79 150 83 L143 85 Q138 87 135 83 Q133 79 135 75 Z', 'url(#@bn)')
    + `<path d="M70 74 L90 74.5 M117 75 L123 75" stroke="#fff" stroke-opacity=".55" stroke-width="1.1" stroke-linecap="round"/><path d="M70 84 L90 83 M117 83 L123 83" stroke="#7d6a4a" stroke-opacity=".6" stroke-width="1"/>`
    + `<ellipse cx="64" cy="79" rx="2.6" ry="2.4" fill="#1a120a"/>`
    + `<circle cx="63" cy="86" r="3.6" fill="#7a4e2a" ${O}/><path d="M61 88 L57 100 M64 89 L65 101" stroke="#6a4224" stroke-width="1.6" stroke-linecap="round"/>`);

  /* "Coltaine's finger": a dried finger in a glass phial, wax seal, a scrap of red cloth round the neck */
  put('b4_c1_relic', '"Coltaine\'s finger"',
    lin('gl', [[0, '#e8f2ee', .32], [.5, '#a9c4ba', .12], [1, '#5f7c72', .3]], 0, 1)
    + lin('wx', [[0, '#b0302a'], [.5, '#7a1814'], [1, '#3c0a08']])
    + lin('fg', [[0, '#9a7650'], [.6, '#5e4228'], [1, '#2e1e10']], 0, 1),
    sh(98, 118, 62, 6)
    + `<g transform="translate(96 78) rotate(-28)">`
    + `<path d="M-48 -4 Q-40 -8 -30 -5 Q-24 -9 -16 -5 L8 -5 Q14 -8 20 -4 L30 -3 Q36 -2 36 1 Q36 4 30 4 L20 5 Q14 8 8 5 L-16 6 Q-24 9 -30 5 Q-40 8 -48 4 Q-51 0 -48 -4 Z" fill="url(#@fg)"/><path d="M-44 -1 L28 0" stroke="#000" stroke-opacity=".3" stroke-width=".8"/><path d="M28 -2 Q33 -1 34 1" stroke="#c9a888" stroke-opacity=".6" stroke-width="1"/>`
    + `<path d="M-60 -16 L38 -16 Q46 -16 50 -9 L52 -8 L62 -8 L62 8 L52 8 L50 9 Q46 16 38 16 L-60 16 Q-68 16 -68 0 Q-68 -16 -60 -16 Z" fill="url(#@gl)" ${O}/>`
    + `<path d="M-60 -13 L38 -13 Q44 -13 47 -8" fill="none" stroke="#f4fbf8" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/><path d="M-62 13 L36 13" stroke="#0b0806" stroke-opacity=".35" stroke-width="1.4"/><path d="M-50 -9 L-20 -9" stroke="#fff" stroke-opacity=".35" stroke-width="2.4" stroke-linecap="round"/>`
    + `<rect x="61" y="-10" width="5" height="20" rx="1.5" fill="#b9d0c8" fill-opacity=".35" ${O}/><rect x="65" y="-7" width="8" height="14" fill="#8a6a44"/>`
    + `<path d="M64 -12 Q72 -15 79 -10 Q83 -4 81 3 Q83 10 78 13 Q72 16 66 12 Q62 13 63 7 Q61 0 63 -6 Q62 -10 64 -12 Z" fill="url(#@wx)" ${O}/><path d="M68 -10 Q74 -12 78 -8" fill="none" stroke="#e07060" stroke-opacity=".5" stroke-width="1.2"/><path d="M66 12 L65 18" stroke="#6a1410" stroke-width="2.4" stroke-linecap="round"/>`
    + `<path d="M52 -10 L57 -10 L57 10 L52 10 Z" fill="#9a1c18" ${O}/></g>`
    + `<path d="M143 58 Q144 72 139 84 L144 85 Q147 72 147 60 Z" fill="#8a1814" ${O}/><path d="M146 59 Q150 70 153 80 L157 78 Q153 68 149 58 Z" fill="#a8241e" ${O}/><path d="M139 84 l-1 4 M141 85 l0 4 M154 80 l1 4" stroke="#a8241e" stroke-width=".8"/>`);

  /* a Red Blade's cast-off sash: red silk, frayed at the end where somebody cut a badge off it */
  put('b4_c1_redsash', 'A Red Blade\'s cast-off sash',
    lin('rd', [[0, '#d23a3c'], [.5, '#981c22'], [1, '#4c0a0e']], 0, 1),
    sh(102, 120, 78, 7)
    + S('M20 46 C48 36 76 48 100 62 L94 82 C72 70 46 60 18 66 Z', 'url(#@rd)')
    + `<path d="M100 62 L116 69 L108 88 L94 82 Z" fill="#3e080b" ${O}/>`
    + S('M112 69 C136 76 156 78 176 73 L180 95 C156 101 132 99 108 88 Z', 'url(#@rd)')
    + `<path d="M26 46 C50 40 74 50 96 64 M118 74 C138 80 156 81 174 77" fill="none" stroke="#ffb0a8" stroke-opacity=".38" stroke-width="1.6" stroke-linecap="round"/>`
    + `<path d="M24 60 C46 56 70 66 90 76 M116 86 C136 93 156 95 176 91" fill="none" stroke="#2a0406" stroke-opacity=".45" stroke-width="2"/>`
    + `<g transform="rotate(4 158 86)"><rect x="148" y="78" width="18" height="15" fill="#e06a66" fill-opacity=".28"/><path d="M148 78 h18 v15 h-18 Z" fill="none" stroke="#2a0406" stroke-opacity=".7" stroke-width=".9" stroke-dasharray="1.2 1.6"/></g>`
    + `<path d="M177 74 l9 -2 M178 78 l10 1 M178 82 l8 3 M179 86 l9 1 M179 90 l7 4 M179 94 l9 2" stroke="#b02a2e" stroke-width=".9" stroke-linecap="round"/>`
    + `<path d="M18 66 l-2 2 M20 46 l-2 -1" stroke="#0b0806" stroke-opacity=".5"/>`);

  /* a confiscated durhang pipe: short clay, a brass bowl-cap, the resin still in it */
  put('b4_c1_durhangpipe', 'A confiscated durhang pipe',
    lin('cl', [[0, '#f0e6d0'], [.5, '#cfbf9e'], [1, '#86765a']]),
    sh(98, 110, 66, 6)
    + S('M26 108 Q24 104 28 102 L124 72 L130 84 L32 112 Q28 112 26 108 Z', 'url(#@cl)')
    + `<path d="M26 108 Q24 104 28 102 L36 100 L38 110 L32 112 Q28 112 26 108 Z" fill="#5a4630" fill-opacity=".7"/>`
    + `<path d="M36 101 L122 74" stroke="#fff" stroke-opacity=".45" stroke-width="1.2"/>`
    + S('M122 62 Q120 80 130 88 Q143 95 156 86 Q164 76 162 52 L124 52 Z', 'url(#@cl)')
    + `<path d="M126 58 Q128 78 138 84" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.6"/><path d="M150 58 Q154 76 146 88" fill="none" stroke="#3a2a1a" stroke-opacity=".35" stroke-width="3"/>`
    + `<path d="M124 52 L162 52 L161 57 Q143 60 125 57 Z" fill="#3a2414" fill-opacity=".8"/><path d="M128 60 Q130 66 129 70 M156 60 Q157 64 155 67" stroke="#4a2c14" stroke-opacity=".55" stroke-width="1.4" stroke-linecap="round"/>`
    + `<path d="M120 52 Q143 32 166 52 Z" fill="url(#@brs)" ${O}/><ellipse cx="143" cy="52" rx="23" ry="4" fill="#8a6428" ${O}/>`
    + `<circle cx="136" cy="45" r="1.2" fill="#2a1a08"/><circle cx="143" cy="43" r="1.2" fill="#2a1a08"/><circle cx="150" cy="45" r="1.2" fill="#2a1a08"/><circle cx="143" cy="48" r="1.1" fill="#2a1a08"/><path d="M126 47 Q136 38 148 38" fill="none" stroke="#fff3c8" stroke-opacity=".6" stroke-width="1.2"/>`
    + `<rect x="161" y="48" width="6" height="6" rx="1" fill="#8a6428" ${O}/>`);

  /* ---------- chapter two ---------- */
  /* a crow feather from the Fall, tied with a twist of red wool */
  put('b4_c2_crowfeather', 'A crow feather from the Fall',
    lin('fe', [[0, '#3c424c'], [.45, '#16181d'], [1, '#050506']], 0, 1)
    + lin('ir', [[0, '#3a6a7a', 0], [.4, '#3a6a7a', .35], [.7, '#5a3a7a', .3], [1, '#5a3a7a', 0]], 1, 0),
    sh(100, 124, 74, 6)
    + `<g transform="translate(103 74) rotate(-33)">`
    + `<path d="M-54 -1 C-24 -11 34 -13 88 -1 C34 -6 -20 -3 -54 -1 Z" fill="url(#@fe)" ${O}/>`
    + `<path d="M-54 1 C-40 10 -20 16 -2 18 L4 12 L8 19 C30 20 46 17 58 13 L62 8 L66 12 C76 9 82 5 88 1 Z" fill="url(#@fe)" ${O}/>`
    + `<path d="M-40 -5 C-10 -10 40 -11 80 -3" fill="none" stroke="url(#@ir)" stroke-width="3"/><path d="M-30 6 C0 12 40 12 70 6" fill="none" stroke="url(#@ir)" stroke-width="5"/>`
    + `<path d="M-30 1 l8 9 M-14 1 l9 11 M2 1 l9 11 M20 1 l9 10 M38 1 l8 8 M56 1 l7 6 M-24 -1 l6 -5 M0 -1 l6 -6 M30 -1 l6 -5" stroke="#5a606a" stroke-opacity=".5" stroke-width=".6"/>`
    + `<path d="M-84 0 L-54 -1 C0 -1.5 50 -1 90 0 C50 1 0 1.5 -54 1 Z" fill="#cfc6b4"/><path d="M-84 0 L-54 0.6" stroke="#6a604e" stroke-width=".8"/>`
    + `<g fill="#b8282a" ${O}><rect x="-70" y="-3.5" width="3" height="7" rx="1"/><rect x="-66" y="-3.5" width="3" height="7" rx="1"/><rect x="-62" y="-3.5" width="3" height="7" rx="1"/></g>`
    + `<path d="M-64 3 Q-66 12 -72 16 M-63 3 Q-60 12 -62 18" fill="none" stroke="#b8282a" stroke-width="1.4" stroke-linecap="round"/></g>`);

  /* a braided fetish off the trees: horsehair and red thread, a small painted soldier knotted in */
  { const br = 'M24 24 Q100 106 176 24';
    put('b4_c2_fetish', 'A braided fetish off the trees',
      lin('pw', [[0, '#c9a679'], [1, '#7a5a38']]),
      sh(100, 140, 26, 4)
      + `<path d="${br}" fill="none" stroke="#0b0806" stroke-opacity=".7" stroke-width="9" stroke-linecap="round"/><path d="${br}" fill="none" stroke="#2c2219" stroke-width="7" stroke-linecap="round"/>`
      + `<path d="${br}" fill="none" stroke="#5c4a36" stroke-width="3" stroke-dasharray="3.5 3.5" transform="translate(-1.2 -1.2)"/><path d="${br}" fill="none" stroke="#4a3a2a" stroke-width="3" stroke-dasharray="3.5 3.5" stroke-dashoffset="3.5" transform="translate(1.2 1.2)"/>`
      + `<path d="${br}" fill="none" stroke="#c0302c" stroke-width="1.4" stroke-dasharray="2 7"/>`
      + `<path d="M24 24 l-6 -8 M24 24 l-2 -10 M24 24 l-9 -4 M176 24 l6 -8 M176 24 l2 -10 M176 24 l9 -4" stroke="#3a2c20" stroke-width="1" stroke-linecap="round"/>`
      + `<path d="M100 65 L100 76" stroke="#c0302c" stroke-width="1.8"/><circle cx="100" cy="65" r="4.6" fill="#2c2219" ${O}/><g transform="translate(100 65) scale(1.35) translate(-100 -72)">`
      + S('M93 89 L107 89 L109 116 L104 116 L102 126 L98 126 L96 116 L91 116 Z', '#5a6a7a')
      + `<path d="M93 100 L107 100 L107.7 104 L92.3 104 Z" fill="#3a2a1c"/><path d="M100 104 L100 116" stroke="#2a2e34" stroke-width=".8"/>`
      + `<path d="M101 110 l4 1 l-1 4 Z M95 92 l3 0 l0 3 Z" fill="url(#@pw)"/>`
      + S('M100 79 C95 79 93 83 93 86 C93 90 96 92 100 92 C104 92 107 90 107 86 C107 83 105 79 100 79 Z', 'url(#@pw)')
      + `<path d="M93 85 Q100 76 107 85 Q100 82 93 85 Z" fill="#7a7e82" ${O}/><circle cx="98" cy="87" r=".7" fill="#2a1a10"/><circle cx="102" cy="87" r=".7" fill="#2a1a10"/>`
      + `<path d="M92 91 Q100 95 108 91" fill="none" stroke="#c0302c" stroke-width="1.4"/></g>`);
  }

  /* a chip of the last milestone: grey stone, a carved stroke of the count, one face worn to a whetstone polish */
  put('b4_c2_milestone', 'A chip of the last milestone',
    `<pattern id="@gr" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".45" fill="#000" fill-opacity=".35"/><circle cx="4" cy="3.5" r=".4" fill="#fff" fill-opacity=".2"/><circle cx="2.5" cy="5" r=".35" fill="#000" fill-opacity=".3"/></pattern>`,
    sh(102, 116, 74, 7)
    + `<g transform="translate(100 78) scale(1.18) translate(-102 -76)">`
    + `<path d="M40 70 L70 46 L132 40 L166 56 L152 80 L64 90 Z" fill="#8e8f8c"/><path d="M40 70 L64 90 L66 108 L44 92 Z" fill="#5f605e"/><path d="M64 90 L152 80 L150 102 L66 108 Z" fill="#6c6d6a"/><path d="M152 80 L166 56 L164 76 L150 102 Z" fill="#3e3f3d"/>`
    + `<path d="M40 70 L70 46 L132 40 L166 56 L164 76 L150 102 L66 108 L44 92 Z" fill="url(#@gr)"/><path d="M40 70 L70 46 L132 40 L166 56 L164 76 L150 102 L66 108 L44 92 Z" fill="url(#@lit)"/>`
    + `<path d="M74 96 Q90 92 108 96 M80 102 Q100 96 128 98 M118 92 Q134 88 148 92" fill="none" stroke="#2a2b29" stroke-opacity=".55" stroke-width="1"/>`
    + `<path d="M40 70 L70 46 L132 40 L166 56 M40 70 L64 90 L152 80 L166 56" fill="none" stroke="#c9cac6" stroke-opacity=".45" stroke-width="1"/>`
    + `<ellipse cx="122" cy="62" rx="24" ry="9" transform="rotate(-8 122 62)" fill="#b6bcc0" fill-opacity=".35"/><path d="M104 64 L138 58 M106 67 L140 61 M108 70 L136 65" stroke="#e6ecef" stroke-opacity=".35" stroke-width=".6"/>`
    + `<path d="M74 58 L80 78 M84 56 L88 66 L96 52" fill="none" stroke="#2c2d2b" stroke-width="3.2" stroke-linecap="round"/><path d="M75.4 59 L81.4 79 M85.4 57 L89 66" fill="none" stroke="#c9cac6" stroke-opacity=".5" stroke-width=".8"/>`
    + `<path d="M40 70 L70 46 L132 40 L166 56 L164 76 L150 102 L66 108 L44 92 Z" fill="none" ${O}/></g>`);

  /* ---------- chapter three ---------- */
  /* a Khundryl knife: long and curved, horn grip wound in horsehair, a black bead on a thong at the pommel */
  put('b4_c3_khundrylknife', 'A Khundryl knife',
    lin('hg', [[0, '#e2d6bc'], [.5, '#a8987a'], [1, '#5a4c38']], 0, 1),
    sh(100, 122, 74, 6)
    + `<path d="M40 108 C36 116 34 122 34 128" fill="none" stroke="#3a2414" stroke-width="1.6"/><circle cx="34" cy="130" r="3.6" fill="#0c0c0e" ${O}/><circle cx="32.8" cy="128.8" r="1" fill="#fff" fill-opacity=".6"/>`
    + `<g transform="translate(110 70) rotate(-30)">`
    + S('M-80 -5 Q-84 0 -80 5 L-76 5 L-76 -5 Z', '#2a2018')
    + S('M-76 -5 L-36 -4 L-36 4 L-76 5 Z', 'url(#@hg)', '@litv')
    + `<path d="M-72 -5 l-3 10 M-66 -5 l-3 10 M-60 -5 l-3 10 M-54 -4.6 l-3 9.4 M-48 -4.4 l-3 9 M-42 -4.2 l-3 8.6" stroke="#121010" stroke-width="2"/>`
    + S('M-37 -7 L-31 -7 L-31 7 L-37 7 Z', 'url(#@brs)')
    + S('M-31 -5 C10 -7 50 -9 86 -22 C70 -6 34 8 -31 6 Z', 'url(#@st)')
    + `<path d="M-28 -3.4 C12 -5 50 -7.6 80 -18" fill="none" stroke="#4a5058" stroke-opacity=".6" stroke-width="1.6"/>`
    + `<path d="M-28 4.4 C26 3 60 -6 82 -19" fill="none" stroke="#fbfdff" stroke-opacity=".8" stroke-width="1"/></g>`);

  /* a bead from the ford: bone, drilled, worn smooth by the river; a few dark hairs still through it */
  put('b4_c3_bonebead', 'A bead from the ford',
    `<radialGradient id="@bb" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#f8f1e2"/><stop offset=".5" stop-color="#d6c6a4"/><stop offset="1" stop-color="#7c6a4c"/></radialGradient>`,
    sh(100, 112, 50, 6)
    + `<path d="M40 80 C30 70 26 50 22 26 M40 80 C28 76 20 60 14 40" fill="none" stroke="#1a130c" stroke-width="1.3" stroke-linecap="round"/><path d="M40 80 C32 74 28 62 26 48" fill="none" stroke="#2c2016" stroke-width=".9"/>`
    + `<path d="M136 78 C156 80 170 60 178 30 M136 80 C158 86 174 70 184 42" fill="none" stroke="#1a130c" stroke-width="1.3" stroke-linecap="round"/><path d="M137 79 C154 84 166 72 174 52" fill="none" stroke="#2c2016" stroke-width=".9"/>`
    + `<path d="M70 50 C84 44 118 44 132 52 C142 60 142 96 132 104 C118 112 84 112 70 106 Z" fill="url(#@bb)" ${O}/>`
    + `<path d="M84 48 C82 70 82 90 84 109 M100 46 C99 70 99 90 100 111 M116 48 C118 70 118 90 116 109" fill="none" stroke="#a8946e" stroke-opacity=".25" stroke-width=".8"/>`
    + `<path d="M112 60 Q118 70 115 80" fill="none" stroke="#5a4a32" stroke-opacity=".5" stroke-width=".8"/><circle cx="96" cy="94" r="1" fill="#6a5838" fill-opacity=".5"/><circle cx="124" cy="88" r=".8" fill="#6a5838" fill-opacity=".5"/>`
    + `<ellipse cx="70" cy="78" rx="10" ry="28" fill="#c8b690" ${O}/><ellipse cx="68" cy="76" rx="7" ry="23" fill="#e8dcc0"/><ellipse cx="70" cy="79" rx="4" ry="7" fill="#1a120a"/><path d="M67 73 Q66 79 68 85" fill="none" stroke="#8a7656" stroke-width=".8"/>`
    + `<path d="M70 79 C60 84 48 88 40 80" fill="none" stroke="#1a130c" stroke-width="1.3"/>`
    + `<path d="M86 52 C96 48 112 48 120 50" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2.4" stroke-linecap="round"/>`);

  /* a Khundryl horn cup: a drinking horn cut short and capped with copper, a little dented */
  put('b4_c3_cup', 'A Khundryl horn cup',
    lin('hc', [[0, '#2a1a10'], [.35, '#6a4a2e'], [.75, '#d8c49a'], [1, '#efe2c2']], 1, 0)
    + lin('cu', [[0, '#f0a878'], [.45, '#b8653a'], [1, '#5a2a12']]),
    sh(100, 114, 66, 6)
    + S('M36 98 C62 112 112 106 156 76 L142 34 C112 76 68 94 36 98 Z', 'url(#@hc)')
    + `<path d="M58 99 C66 97 70 96 74 94 M84 100 C92 96 98 94 102 90 M108 92 C116 86 120 82 124 76" fill="none" stroke="#2a1a10" stroke-opacity=".35" stroke-width="1"/>`
    + `<path d="M44 96 C80 92 112 76 138 42" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.6"/>`
    + `<path d="M30 97 L40 95 L42 103 L33 103 Q28 101 30 97 Z" fill="url(#@cu)" ${O}/>`
    + `<path d="M138 37 L144 33 L160 77 L153 81 Z" fill="url(#@cu)" ${O}/><path d="M146 52 l3 1 l1 4 Z" fill="#3a1808"/><path d="M140 37 L145 34" stroke="#ffd2b0" stroke-opacity=".7" stroke-width="1"/>`
    + `<ellipse cx="152" cy="56" rx="22" ry="9" transform="rotate(68 152 56)" fill="#1c120a" ${O}/><ellipse cx="153" cy="58" rx="16" ry="5.5" transform="rotate(68 153 58)" fill="#3a1e10" fill-opacity=".8"/>`
    + `<path d="M144 37 Q164 48 160 76" fill="none" stroke="#f0a878" stroke-opacity=".6" stroke-width="1"/>`);

  /* a length of the old ferry rope: a fathom of hemp, black with the river, cut and knotted */
  { const rope = (d, w = 7) => `<path d="${d}" fill="none" stroke="#0b0806" stroke-opacity=".7" stroke-width="${w + 2}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#2a251e" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#463e32" stroke-width="${w - 1.5}" stroke-dasharray="2 2.4" stroke-linecap="butt"/><path d="${d}" fill="none" stroke="#a8987a" stroke-opacity=".55" stroke-width="1.2" transform="translate(-.8 -1.6)"/><path d="${d}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="1.2" transform="translate(.6 2)"/>`;
    put('b4_c3_ferryrope', 'A length of the old ferry rope', '',
      sh(98, 112, 68, 7)
      + rope('M54 92 C40 80 60 64 98 64 C136 64 156 76 144 90 C132 102 70 104 54 92 Z')
      + rope('M58 86 C46 74 66 58 100 58 C134 58 152 70 140 84 C128 96 74 98 58 86 Z')
      + rope('M62 80 C52 68 70 52 102 52 C132 52 148 64 136 78 C124 90 78 92 62 80')
      + rope('M136 78 C150 90 160 100 168 108')
      + `<circle cx="172" cy="111" r="6.5" fill="#2a251e" ${O}/><path d="M168 108 Q176 106 176 114" fill="none" stroke="#5e5444" stroke-width="2"/>`
      + `<path d="M176 114 l7 6 M175 116 l4 9 M178 113 l9 3 M174 117 l1 8" stroke="#6e624c" stroke-width="1.1" stroke-linecap="round"/>`);
  }

  /* ---------- chapter four ---------- */
  /* an unbroken oil bola: two clay lamps of oil on a plaited cord, wicks black, seals unbroken */
  { const lamp = (x, y, f) => `<g transform="translate(${x} ${y}) scale(${f} 1)">`
      + S('M-22 0 C-22 -14 -10 -18 0 -18 C12 -18 20 -12 22 -6 L34 -8 Q38 -4 34 0 L22 2 C20 10 10 14 0 14 C-12 14 -22 10 -22 0 Z', 'url(#@tc)')
      + `<path d="M33 -6 Q38 -9 37 -4" fill="none" stroke="#141010" stroke-width="2.4" stroke-linecap="round"/><path d="M26 -6 L34 -6" stroke="#1a120c" stroke-opacity=".6" stroke-width="3"/>`
      + `<ellipse cx="-2" cy="-17" rx="7" ry="2.6" fill="#c08a3a" ${O}/><path d="M-7 -18 Q-2 -20 3 -18" fill="none" stroke="#f0c878" stroke-opacity=".7" stroke-width=".8"/>`
      + `<path d="M-18 -6 Q-10 -14 2 -14" fill="none" stroke="#f8d0a0" stroke-opacity=".35" stroke-width="1.6"/></g>`;
    const cord = 'M40 84 C46 30 150 22 154 74';
    put('b4_c4_lampball', 'An unbroken oil bola',
      lin('tc', [[0, '#d8925a'], [.5, '#a0602e'], [1, '#4c2810']]),
      sh(58, 112, 34, 5) + sh(150, 104, 34, 5)
      + `<path d="${cord}" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="4.6"/><path d="${cord}" fill="none" stroke="#6a5236" stroke-width="3"/><path d="${cord}" fill="none" stroke="#a88a5e" stroke-width="1.6" stroke-dasharray="2.5 2.5"/>`
      + lamp(56, 96, -1) + lamp(146, 88, 1)
      + `<circle cx="40" cy="80" r="3" fill="#6a5236" ${O}/><circle cx="154" cy="72" r="3" fill="#6a5236" ${O}/>`);
  }

  /* a Seti hide jack: boiled horsehide, horsehair stitching, the marks burnt across the chest, a lance-hole in the left shoulder stitched shut */
  { const d = 'M80 20 L92 16 L100 26 L108 16 L120 20 L148 36 L162 72 L146 78 L134 50 L136 122 Q100 128 64 122 L66 50 L54 78 L38 72 L52 36 Z';
    put('b4_c4_setijack', 'A Seti hide jack',
      lin('hj', [[0, '#a87848'], [.5, '#7a5230'], [1, '#3e2614']]),
      sh(100, 126, 52, 6)
      + `<path d="${d}" fill="url(#@hj)"/><path d="${d}" fill="url(#@lit)"/>`
      + `<path d="M78 30 Q74 70 80 118 M124 34 Q128 80 120 120" fill="none" stroke="#2a180a" stroke-opacity=".35" stroke-width="5"/><path d="M60 58 Q66 52 72 70 M140 58 Q134 56 130 72" fill="none" stroke="#2a180a" stroke-opacity=".35" stroke-width="3"/>`
      + `<path d="M100 26 L100 124" stroke="#2a180a" stroke-width="1.6"/><path d="M103 28 L103 122" stroke="#d8b080" stroke-opacity=".5" stroke-width="1" stroke-dasharray="2 2.4"/>`
      + `<path d="M67 121 Q100 126 133 121 M54 75 L40 70 M146 75 L160 70 M68 52 L67 118 M132 52 L133 118" fill="none" stroke="#d8b080" stroke-opacity=".55" stroke-width="1" stroke-dasharray="2 2.4"/>`
      + `<path d="M66 56 L134 56 L134 68 L66 68 Z" fill="#2a1608" fill-opacity=".55"/><g fill="none" stroke="#120804" stroke-width="1.6" stroke-linecap="round"><path d="M70 59 l4 3.5 l-4 3.5 M80 58 v8 M77 62 h6 M88 66 l3 -8 l3 8 M100 58 v8 M97 60 l3 2 l3 -2 M108 66 l3 -8 l3 8 M117 58 v8 M114 62 h6 M126 59 l4 3.5 l-4 3.5"/></g><circle cx="93" cy="62" r="1" fill="#120804"/><circle cx="105" cy="62" r="1" fill="#120804"/>`
      + `<path d="M118 29 L127 39" stroke="#1a0c04" stroke-width="2.6" stroke-linecap="round"/><path d="M117 32 l5 -2 M119 34.5 l5 -2 M121 37 l5 -2 M123 39.5 l5 -2" stroke="#d8c098" stroke-width=".9" stroke-linecap="round"/>`
      + `<path d="M92 16 L100 26 L108 16 L104 14 L100 20 L96 14 Z" fill="#4a2c16" ${O}/>` + ol(d));
  }

  /* a Seti horn bow: short, recurved, horn and sinew lacquered dark, her marks burnt into the grip. Strung; no arrow on it.
     Drawn upright in its own frame (string at x=-11 between the nocks) and turned onto the diagonal. */
  put('b4_c4_setibow', 'A Seti horn bow',
    lin('hb', [[0, '#8e5a38'], [.4, '#5a3420'], [.8, '#2e1a0e'], [1, '#1a0e08']], 1, 0)
    + lin('gw', [[0, '#a07850'], [1, '#4a3018']], 1, 0),
    sh(100, 132, 66, 6)
    + `<g transform="translate(124 84) rotate(40) scale(1.22)">`
    + `<path d="M-11 -57 L-11 57" stroke="#0b0806" stroke-opacity=".6" stroke-width="2"/><path d="M-11 -57 L-11 57" stroke="#d8ccb0" stroke-width=".9"/>`
    + S('M-20 -69 L-16 -57 C-21 -40 -38 -22 -41 0 C-38 22 -21 40 -16 57 L-20 69 L-15.5 70.5 L-10.5 57 C-14 40 -28 22 -30 0 C-28 -22 -14 -40 -10.5 -57 L-15.5 -70.5 Z', 'url(#@hb)')
    + `<path d="M-20 -69 L-18 -63 L-13.5 -64.5 L-15.5 -70.5 Z M-20 69 L-18 63 L-13.5 64.5 L-15.5 70.5 Z" fill="#d8c8a4" ${O}/>`
    + `<path d="M-18 -58 C-23 -40 -38 -22 -40 -8 M-40 8 C-38 22 -23 40 -18 58" fill="none" stroke="#d8a06a" stroke-opacity=".7" stroke-width="1.2"/>`
    + `<path d="M-13 -55 C-17 -40 -28 -22 -30 -10 M-30 10 C-28 22 -17 40 -13 55" fill="none" stroke="#d8b878" stroke-opacity=".28" stroke-width="1.1"/>`
    + S('M-42 -11 L-30 -10 L-29 10 L-42 11 Q-44 0 -42 -11 Z', '#4a2c18')
    + `<path d="M-42 -11 L-30 -10 L-30 -7 L-42 -8 Z M-42 8 L-30 7 L-29 10 L-42 11 Z" fill="url(#@gw)"/><path d="M-41 -10 l11 0.6 M-41 -9 l11 0.6 M-41 9 l11 -0.6 M-41 10 l11 -0.6" stroke="#2a180a" stroke-width=".5"/>`
    + `<path d="M-39 -4 l4 3 l-4 3 M-34 -4 l0 8 M-37 0 h5" fill="none" stroke="#120804" stroke-width="1.1" stroke-linecap="round"/>`
    + `<path d="M-13 -57 Q-11 -60 -9 -57 M-13 57 Q-11 60 -9 57" fill="none" stroke="#d8ccb0" stroke-width="1"/></g>`);

  /* an empty helm from the barrows: Malazan, dented, nobody in it; a thong for the belt */
  put('b4_c4_helm', 'An empty helm from the barrows',
    `<radialGradient id="@hd" cx=".32" cy=".26" r=".85"><stop offset="0" stop-color="#d8dde0"/><stop offset=".35" stop-color="#8d959c"/><stop offset=".75" stop-color="#4a5056"/><stop offset="1" stop-color="#23272b"/></radialGradient>`,
    sh(104, 126, 60, 6)
    + `<path d="M140 96 Q154 104 156 118 L144 116 Q140 106 134 100 Z" fill="#3c4247" ${O}/>`
    + S('M54 90 C52 44 76 24 102 24 C128 24 152 44 150 92 Z', 'url(#@hd)')
    + `<path d="M102 25 C100 50 100 70 101 90" fill="none" stroke="#2a2e32" stroke-width="3"/><path d="M99 26 C97 50 97 70 98 90" fill="none" stroke="#e6eaec" stroke-opacity=".55" stroke-width="1"/>`
    + `<path d="M124 40 Q134 46 136 58 Q128 52 120 50 Z" fill="#1f2326" fill-opacity=".75"/><path d="M121 51 Q129 52 136 59" fill="none" stroke="#e6eaec" stroke-opacity=".6" stroke-width="1.1"/>`
    + `<path d="M70 50 l10 6 M64 66 l14 -2 M118 70 l10 4" stroke="#e6eaec" stroke-opacity=".35" stroke-width=".7"/>`
    + S('M50 86 Q102 78 154 88 L154 98 Q102 88 50 96 Z', '#5a6268')
    + `<path d="M52 88 Q102 80 152 90" fill="none" stroke="#e6eaec" stroke-opacity=".5" stroke-width="1"/>`
    + `<circle cx="64" cy="91" r="1.6" fill="#c9ced2"/><circle cx="84" cy="88" r="1.6" fill="#c9ced2"/><circle cx="120" cy="88" r="1.6" fill="#c9ced2"/><circle cx="140" cy="91" r="1.6" fill="#c9ced2"/>`
    + S('M60 96 L78 93 L78 112 Q72 122 64 120 Q58 110 60 96 Z', '#6a7278')
    + `<path d="M76 110 C80 122 94 128 106 122" fill="none" stroke="#3a2414" stroke-width="2.4" stroke-linecap="round"/><path d="M106 122 l4 8 M106 122 l8 4" stroke="#3a2414" stroke-width="1.8" stroke-linecap="round"/>`);

  /* a pot of Seti horse-salve: grey grease, tar and sheep and something green; a hide cover tied on */
  put('b4_c4_salve', 'A pot of Seti horse-salve',
    `<radialGradient id="@pt" cx=".34" cy=".3" r=".85"><stop offset="0" stop-color="#b48a62"/><stop offset=".55" stop-color="#7a583a"/><stop offset="1" stop-color="#2e1e10"/></radialGradient>`,
    sh(100, 128, 48, 6)
    + S('M84 52 L116 52 L118 60 C140 66 144 84 142 98 C140 116 124 126 100 126 C76 126 60 116 58 98 C56 84 60 66 82 60 Z', 'url(#@pt)')
    + `<path d="M64 80 Q100 88 136 80 M62 100 Q100 108 138 100" fill="none" stroke="#2a1a0c" stroke-opacity=".3" stroke-width="1"/>`
    + `<path d="M70 70 Q66 86 70 102" fill="none" stroke="#e8c8a0" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>`
    + `<path d="M116 58 Q120 70 118 80 Q121 84 124 78 Q124 68 120 60 Z" fill="#8c9088" ${O}/>`
    + S('M78 54 Q76 38 100 34 Q124 38 122 54 Q118 60 100 60 Q82 60 78 54 Z', '#6a5a40')
    + `<path d="M82 46 Q92 38 104 38" fill="none" stroke="#c8b088" stroke-opacity=".5" stroke-width="1.4"/>`
    + `<path d="M79 54 Q100 61 121 54" fill="none" stroke="#2a1a0a" stroke-width="2.4"/><path d="M79 54 Q100 61 121 54" fill="none" stroke="#a88a5a" stroke-width="1.2"/>`
    + `<path d="M120 55 Q130 60 128 72 M121 56 Q134 58 138 66" fill="none" stroke="#a88a5a" stroke-width="1.3" stroke-linecap="round"/>`);

  /* ---------- chapter five ---------- */
  /* a conch from the sea bed: a big spiral, old cream outside, pink as a mouth inside */
  put('b4_c5_conch', 'A conch from the sea bed',
    lin('sc', [[0, '#f6ecd6'], [.5, '#d6c29c'], [1, '#8a7452']])
    + lin('pk', [[0, '#f8c4b4'], [.5, '#e08a82'], [1, '#9a4a4a']]),
    sh(104, 122, 66, 6)
    + S('M26 56 L50 44 C80 30 132 30 164 52 C180 64 180 88 166 102 C146 120 110 124 86 116 C66 108 56 92 50 78 L26 60 Z', 'url(#@sc)')
    + `<path d="M30 57 L50 50 M38 52 C44 58 46 66 50 74 M50 46 C56 56 58 66 60 80 M62 40 C70 54 72 74 76 98" fill="none" stroke="#6a5638" stroke-opacity=".55" stroke-width="1.1"/>`
    + `<path d="M66 40 q4 -7 8 -1 M90 37 q4 -8 8 -1 M114 37.5 q4 -8 8 -.5 M138 42 q4 -7 8 1" fill="#e8dcc0" ${O}/>`
    + `<path d="M84 60 Q120 56 156 66 M80 84 Q118 82 150 92" fill="none" stroke="#9a7a52" stroke-opacity=".4" stroke-width="2.2"/>`
    + S('M96 112 C118 96 150 82 174 64 C182 84 172 106 150 116 C130 124 110 122 96 112 Z', 'url(#@pk)')
    + `<path d="M108 112 C128 100 152 88 168 74 C170 92 160 106 144 112 C130 117 118 117 108 112 Z" fill="#7a3434" fill-opacity=".55"/>`
    + `<path d="M100 112 C120 98 150 84 172 66" fill="none" stroke="#fde2d6" stroke-opacity=".7" stroke-width="1.4"/>`
    + `<path d="M58 46 C80 36 120 34 150 44" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.6"/>`);

  /* a lens of old sea-glass: thick green, clouded at the edge and clear at the heart, prised from a stone ship's stern-light */
  put('b4_c5_seaglass', 'A lens of old sea-glass',
    `<radialGradient id="@sg" cx=".46" cy=".44" r=".55"><stop offset="0" stop-color="#9ed8b4" stop-opacity=".55"/><stop offset=".55" stop-color="#5a9a76" stop-opacity=".75"/><stop offset=".85" stop-color="#7aa892" stop-opacity=".92"/><stop offset="1" stop-color="#c2d8cc" stop-opacity=".95"/></radialGradient>`,
    sh(102, 118, 54, 7) + `<ellipse cx="108" cy="114" rx="30" ry="5" fill="#7ad0a0" fill-opacity=".12"/>`
    + ``
    + `<ellipse cx="102" cy="78" rx="48" ry="40" fill="#2c4a3a" ${O}/>`
    + `<path d="M98 32 C126 32 146 50 146 72 C146 94 126 112 98 112 C70 112 50 94 50 72 C50 56 60 42 76 36 L80 42 L88 34 Z" fill="url(#@sg)" ${O}/>`
    + `<ellipse cx="96" cy="70" rx="24" ry="20" fill="#d8f4e2" fill-opacity=".12"/>`
    + `<path d="M62 56 Q74 38 98 34" fill="none" stroke="#f4fff8" stroke-opacity=".75" stroke-width="2.2" stroke-linecap="round"/><path d="M128 98 Q136 90 140 78" fill="none" stroke="#f4fff8" stroke-opacity=".3" stroke-width="1.4"/>`
    + `<circle cx="88" cy="80" r="1.4" fill="none" stroke="#e8fff0" stroke-opacity=".5" stroke-width=".6"/><circle cx="110" cy="62" r="1" fill="none" stroke="#e8fff0" stroke-opacity=".5" stroke-width=".6"/><circle cx="104" cy="88" r=".8" fill="none" stroke="#e8fff0" stroke-opacity=".5" stroke-width=".6"/>`);

  /* a desert rider's veil: a long strip of fine grey cotton, loosely folded, a loop of red thread at one end */
  put('b4_c5_veil', 'A desert rider\'s veil',
    lin('vg', [[0, '#dcd6ca'], [.5, '#aaa498'], [1, '#6a665c']], 0, 1),
    sh(102, 126, 78, 7)
    + S('M44 94 C80 96 130 100 168 106 L166 124 C128 118 80 114 42 110 Z', 'url(#@vg)')
    + `<path d="M44 70 C28 76 28 100 44 110 L50 100 C42 96 42 92 46 88 Z" fill="#4a463e" ${O}/>`
    + S('M156 62 C120 58 70 60 44 70 L46 90 C72 82 120 80 160 82 Z', 'url(#@vg)')
    + `<path d="M156 36 C178 44 180 72 160 84 L150 76 C160 68 160 62 156 60 Z" fill="#4a463e" ${O}/>`
    + S('M28 30 C62 26 120 28 158 38 L156 58 C118 50 62 48 30 50 Z', 'url(#@vg)')
    + `<path d="M34 34 C70 30 120 32 152 41 M52 66 C80 60 120 60 152 64 M50 97 C90 100 130 104 164 109" fill="none" stroke="#f6f2ea" stroke-opacity=".5" stroke-width="1.2" stroke-linecap="round"/>`
    + `<path d="M60 38 Q66 44 76 42 M104 38 Q112 46 122 42 M70 70 Q78 76 88 72 M118 68 Q126 74 136 70 M76 102 Q84 108 94 104 M126 106 Q134 112 144 108" fill="none" stroke="#3a3630" stroke-opacity=".4" stroke-width="1.1"/>`
    + `<path d="M29 31 l-6 -1 M29 36 l-7 1 M29 41 l-6 2 M30 46 l-7 3 M30 50 l-5 4" stroke="#a8a294" stroke-width=".8" stroke-linecap="round"/>`
    + `<path d="M167 107 l6 0 M167 112 l7 2 M166 117 l6 3 M166 122 l5 4" stroke="#a8a294" stroke-width=".8" stroke-linecap="round"/>`
    + `<path d="M166 122 C176 128 182 138 174 141 C166 144 162 134 168 128" fill="none" stroke="#0b0806" stroke-opacity=".5" stroke-width="2.6"/><path d="M166 122 C176 128 182 138 174 141 C166 144 162 134 168 128" fill="none" stroke="#c0302c" stroke-width="1.5"/>`);

  /* ---------- chapter six ---------- */
  /* a Dogslayer's cut-off badge: dog's head in black on red, a bar across its throat, the threads still hanging where the knife went */
  put('b4_c6_dogslayer', 'A Dogslayer\'s cut-off badge',
    `<pattern id="@wv" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 1.5 h3 M1.5 0 v3" stroke="#000" stroke-opacity=".18" stroke-width=".6"/></pattern>`
    + lin('bd', [[0, '#c03a32'], [.55, '#8e1c1c'], [1, '#4a0c0c']]),
    `<path d="M58 34 L150 28 L156 120 L62 126 Z" transform="translate(4 5)" fill="#000" fill-opacity=".45"/>`
    + `<path d="M58 34 L150 28 L152 50 L154 72 L153 96 L156 120 L130 121 L104 124 L80 123 L62 126 Z" fill="url(#@bd)"/><path d="M58 34 L150 28 L156 120 L62 126 Z" fill="url(#@wv)"/>`
    + `<path d="M58 34 L150 28 L152 50 L154 72 L153 96 L156 120 L130 121 L104 124 L80 123 L62 126 Z" fill="none" ${O}/>`
    + `<path d="M62 38 L146 32 M62 38 L66 122" fill="none" stroke="#2a0606" stroke-width="2" stroke-dasharray="2 1.2"/>`
    + `<path d="M154 58 l9 2 M153 78 l11 -1 M155 100 l8 4 M154 110 l10 1 M120 122 l1 9 M96 124 l-2 10 M78 124 l2 7 M140 121 l2 8" stroke="#a8282a" stroke-width=".9" stroke-linecap="round"/><path d="M153 68 l8 3 M110 123 l0 8" stroke="#141010" stroke-width=".9" stroke-linecap="round"/>`
    + `<path d="M80 108 C76 92 78 76 86 66 L86 44 L96 58 L104 42 L108 60 C116 64 124 68 134 70 L142 72 Q146 76 142 80 L126 82 L134 88 Q124 92 112 90 C110 98 106 104 102 110 Z" fill="#141010"/>`
    + `<path d="M82 100 l6 -18 M90 104 l6 -20 M98 104 l6 -20 M106 96 l5 -16 M114 86 l4 -10 M122 80 l3 -6" stroke="#3a3434" stroke-opacity=".6" stroke-width=".7"/><circle cx="114" cy="69" r="1.7" fill="#c03a32"/><circle cx="143" cy="75" r="1.4" fill="#3a3434"/>`
    + `<path d="M72 106 L132 90 L135 100 L75 116 Z" fill="#141010"/><path d="M74 107 L132 92" stroke="#4a4444" stroke-opacity=".5" stroke-width=".8"/>`);

  /* a Dogslayer's scale shirt: Malazan heavy scale, the legion's marks scraped off, a dog's head painted on the breast in black */
  { const d = 'M76 22 L90 16 Q100 26 110 16 L124 22 L150 36 L160 62 L144 68 L136 50 L138 118 Q100 126 62 118 L64 50 L56 68 L40 62 L50 36 Z';
    put('b4_c6_dogscale', 'A Dogslayer\'s scale shirt',
      `<pattern id="@sc" width="8" height="8" patternUnits="userSpaceOnUse"><g stroke="#141618" stroke-width=".6"><path d="M-4 4 L4 4 L4 7.5 Q4 11 0 11.4 Q-4 11 -4 7.5 Z" fill="#676d73"/><path d="M4 4 L12 4 L12 7.5 Q12 11 8 11.4 Q4 11 4 7.5 Z" fill="#676d73"/><path d="M0 0 L8 0 L8 3.5 Q8 7 4 7.4 Q0 7 0 3.5 Z" fill="#7b8187"/><path d="M-4 -4 L4 -4 L4 -0.5 Q4 3 0 3.4000000000000004 Q-4 3 -4 -0.5 Z" fill="#71777d"/><path d="M4 -4 L12 -4 L12 -0.5 Q12 3 8 3.4000000000000004 Q4 3 4 -0.5 Z" fill="#71777d"/></g><path d="M1.2 1.2 Q1.6 4.6 4 5.6 M5.2 -2.8 Q5.6 0.6 8 1.6 M-2.8 5.2 Q-2.4 8.6 0 9.6" fill="none" stroke="#e6eaee" stroke-opacity=".35" stroke-width=".6"/></pattern>`,
      sh(100, 124, 54, 6)
      + `<path d="${d}" fill="#3a3e42"/><path d="${d}" fill="url(#@sc)"/><path d="${d}" fill="url(#@lit)"/>`
      + `<path d="M84 40 Q80 80 82 116 M118 40 Q122 84 118 118" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="5"/>`
      + `<path d="M62 117 Q100 125 138 117" fill="none" stroke="#4a2e18" stroke-width="3"/><path d="M41 61 L56 67 M144 67 L159 61" stroke="#4a2e18" stroke-width="3"/><path d="M90 17 Q100 28 110 17 Q100 22 90 17 Z" fill="#14100c" stroke="#4a2e18" stroke-width="2"/>`
      + `<path d="M84 76 C82 64 88 54 96 50 L97 40 L104 48 L110 42 L110 52 C118 56 124 60 126 66 C124 70 118 72 112 70 C108 76 104 80 98 82 Z" fill="#0e0c0a" fill-opacity=".88"/><path d="M86 72 q-3 6 -1 10 M98 82 q0 6 -3 9" stroke="#0e0c0a" stroke-opacity=".7" stroke-width="1.6" stroke-linecap="round"/>`
      + `<path d="M72 92 l6 -1 M120 96 l7 -2 M70 60 l5 0 M128 64 l6 1 M90 104 l6 -1 M110 108 l5 0" stroke="#f0f2f4" stroke-opacity=".75" stroke-width=".9" stroke-linecap="round"/>` + ol(d));
  }

  /* a sapper's short spade: blade a hand and a half across, one edge ground sharp, the haft worn dark at the grip */
  put('b4_c6_trenchspade', 'A sapper\'s short spade',
    lin('ir2', [[0, '#a8aeb2'], [.4, '#6a7074'], [1, '#2e3236']], 0, 1),
    sh(100, 124, 72, 6)
    + `<g transform="translate(102 72) rotate(-32)">`
    + S('M-88 -11 L-82 -11 L-82 11 L-88 11 Z', 'url(#@wd)', '@litv')
    + S('M-82 -3.6 L22 -3.6 L22 3.6 L-82 3.6 Z', 'url(#@wd)', '@litv')
    + `<path d="M-82 -3.6 L-56 -3.6 L-56 3.6 L-82 3.6 Z" fill="#1a1008" fill-opacity=".5"/><path d="M-50 -1 L18 -1.5 M-30 1.6 L10 1.2" stroke="#2a1a0c" stroke-opacity=".5" stroke-width=".6"/><path d="M-80 -2.6 L20 -2.6" stroke="#e8c898" stroke-opacity=".3" stroke-width=".8"/>`
    + S('M14 -5 L30 -6 L30 6 L14 5 Z', 'url(#@ir2)', '@litv') + `<circle cx="20" cy="0" r="1.3" fill="#c8ccd0"/>`
    + S('M28 -18 L74 -16 Q90 -8 92 0 Q90 8 74 16 L28 18 Q24 0 28 -18 Z', 'url(#@ir2)', '@litv')
    + `<path d="M30 -16 L74 -14 Q88 -7 90 0" fill="none" stroke="#f4f8fa" stroke-opacity=".85" stroke-width="1.2"/>`
    + `<path d="M40 -6 Q56 -4 70 -6 M44 6 Q58 8 74 4" fill="none" stroke="#1e2124" stroke-opacity=".35" stroke-width="1.2"/>`
    + `<circle cx="52" cy="8" r="2.4" fill="#6a3a1a" fill-opacity=".6"/><circle cx="66" cy="-4" r="1.6" fill="#6a3a1a" fill-opacity=".5"/><path d="M76 10 Q86 6 90 2 L92 4 Q86 12 76 14 Z" fill="#4a3a26" fill-opacity=".7"/></g>`);

  /* the picket's horn: a cow's horn, brass mouthpiece, a thong; the 9th's number and years of tallies scratched in */
  put('b4_c6_pickethorn', 'The picket\'s horn',
    lin('ph', [[0, '#3a2414'], [.3, '#8a6a46'], [.7, '#dccaa2'], [1, '#f2e6c8']], 1, 0),
    sh(100, 118, 74, 6)
    + `<path d="M58 96 C64 120 130 126 148 98" fill="none" stroke="#2a180a" stroke-width="3.2"/><path d="M58 96 C64 120 130 126 148 98" fill="none" stroke="#7a4e2a" stroke-width="1.8"/>`
    + S('M30 86 C60 100 120 98 160 70 L170 100 C126 118 66 112 30 94 Z', 'url(#@ph)')
    + `<path d="M34 87 C70 100 122 96 160 72" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="1.4"/>`
    + `<ellipse cx="165" cy="85" rx="16" ry="7" transform="rotate(72 165 85)" fill="#1c140c" ${O}/><ellipse cx="164" cy="85" rx="15" ry="5" transform="rotate(72 164 85)" fill="none" stroke="#f2e6c8" stroke-opacity=".5" stroke-width="1"/>`
    + `<path d="M18 86 L32 84 L32 96 L18 94 Q14 90 18 86 Z" fill="url(#@brs)" ${O}/><path d="M12 85 Q10 90 12 95 L18 94 L18 86 Z" fill="#8a6428" ${O}/>`
    + `<text x="98" y="104" font-family="Georgia,serif" font-size="8" fill="#3a2614" fill-opacity=".8" transform="rotate(-10 98 104)">IX</text>`
    + `<path d="M62 98 l1 -6 M65 98 l1 -6 M68 98.4 l1 -6 M71 98.6 l1 -6 M60 95 l13 2 M78 100 l1 -6 M81 100 l1 -6 M84 100 l1 -6 M116 102 l2 -7 M119 101 l2 -7 M122 100 l2 -7 M126 98 l2 -7 M129 97 l2 -7" stroke="#3a2614" stroke-opacity=".7" stroke-width=".7"/>`
    + `<circle cx="58" cy="96" r="2.4" fill="url(#@brs)" ${O}/><circle cx="148" cy="98" r="2.4" fill="url(#@brs)" ${O}/>`);

  /* ---------- chapter seven ---------- */
  /* a piece of coral stone: a knuckle of pale coral the size of a fist, pitted and light */
  { const d = 'M44 86 C38 66 52 46 72 44 C80 32 102 30 114 38 C130 32 152 40 156 58 C170 66 168 90 154 98 C150 112 128 118 112 112 C98 120 74 118 64 106 C50 106 42 98 44 86 Z';
    put('b4_c7_coral', 'A piece of coral stone',
      `<pattern id="@cp" width="9" height="8" patternUnits="userSpaceOnUse"><ellipse cx="4.5" cy="4" rx="1.6" ry="1.3" fill="#6a5a46" fill-opacity=".38"/><path d="M2.5 3.6 Q4.5 2 6.5 3.6" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".6"/><circle cx="0" cy="0" r=".9" fill="#6a5a46" fill-opacity=".4"/></pattern><pattern id="@cq" width="13" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(23)"><ellipse cx="3" cy="7" rx="2.4" ry="1.8" fill="#5a4a36" fill-opacity=".45"/><ellipse cx="9" cy="2" rx="1.4" ry="1.2" fill="#5a4a36" fill-opacity=".4"/></pattern>`
      + lin('co', [[0, '#f4ecdc'], [.55, '#d6c6a8'], [1, '#8a7656']]),
      sh(102, 118, 62, 7)
      + `<path d="${d}" fill="url(#@co)"/><path d="${d}" fill="url(#@cp)"/><path d="${d}" fill="url(#@cq)"/><path d="${d}" fill="url(#@lit)"/>`
      + `<ellipse cx="96" cy="78" rx="5" ry="4" fill="#4a3a28" fill-opacity=".55"/><ellipse cx="128" cy="62" rx="4" ry="3" fill="#4a3a28" fill-opacity=".5"/><ellipse cx="74" cy="94" rx="3.4" ry="2.6" fill="#4a3a28" fill-opacity=".5"/><ellipse cx="136" cy="94" rx="3" ry="2.4" fill="#4a3a28" fill-opacity=".45"/>`
      + `<path d="M72 44 C76 56 74 70 66 80 M114 38 C110 50 112 62 122 70 M156 58 C146 66 142 78 146 90" fill="none" stroke="#6a5840" stroke-opacity=".35" stroke-width="1.6"/>`
      + `<path d="M52 66 C58 52 68 46 76 46 M86 36 C96 32 106 34 112 40" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>` + ol(d));
  }

  /* a Dogslayer's sword: a Malazan short sword, long and heavy in the blade, the hilt's marks filed off, the leather rewound */
  put('b4_c7_dogslayerblade', 'A Dogslayer\'s sword',
    lin('gp', [[0, '#8a5c34'], [.5, '#5a3a1e'], [1, '#2a180a']], 0, 1),
    sh(100, 124, 76, 6)
    + `<g transform="translate(104 72) rotate(-32)">`
    + S('M-90 -6 Q-95 0 -90 6 L-84 5 L-84 -5 Z', 'url(#@st)')
    + S('M-84 -4.4 L-56 -4 L-56 4 L-84 4.4 Z', 'url(#@gp)', '@litv')
    + `<path d="M-82 -4.2 l3 8.6 M-77 -4.1 l3 8.4 M-72 -4 l3 8.2 M-67 -4 l3 8.1 M-62 -4 l3 8" stroke="#1a0e06" stroke-width="1.1"/><path d="M-58 -4 l3 8 l3 -1" fill="none" stroke="#8a5c34" stroke-width="1"/>`
    + S('M-57 -14 L-51 -14 L-50 14 L-56 14 Z', 'url(#@st)', '@litv')
    + `<path d="M-55 -11 l2 3 M-55 -6 l2 3 M-55 6 l2 3 M-54 10 l2 2" stroke="#f4f8fa" stroke-opacity=".8" stroke-width=".6"/>`
    + S('M-50 -7.5 L70 -6.5 L94 0 L70 6.5 L-50 7.5 Z', 'url(#@st)', '@litv')
    + `<path d="M-46 0 L66 0" stroke="#3e444a" stroke-opacity=".7" stroke-width="2"/><path d="M-48 -6 L70 -5 L90 0" fill="none" stroke="#fbfdff" stroke-opacity=".85" stroke-width=".9"/>`
    + `<path d="M10 6 l1 1.4 M36 5.4 l1.4 1.2" stroke="#1e2226" stroke-width="1"/></g>`);

  /* a black bead: black glass the shape of a tear, smooth with handling, on a thong */
  put('b4_c7_tear', 'A black bead',
    `<radialGradient id="@tg" cx=".38" cy=".6" r=".7"><stop offset="0" stop-color="#3c3a44"/><stop offset=".55" stop-color="#121116"/><stop offset="1" stop-color="#050406"/></radialGradient>`,
    sh(102, 128, 30, 5)
    + `<path d="M22 22 C40 50 70 62 96 60 M104 60 C130 62 160 50 178 22" fill="none" stroke="#2a180c" stroke-width="3.6" stroke-linecap="round"/><path d="M22 22 C40 50 70 62 96 60 M104 60 C130 62 160 50 178 22" fill="none" stroke="#8a5a32" stroke-width="2" stroke-linecap="round"/>`
    + `<path d="M100 54 C108 72 128 88 128 104 C128 120 116 128 100 128 C84 128 72 120 72 104 C72 88 92 72 100 54 Z" fill="url(#@tg)" ${O}/>`
    + `<ellipse cx="100" cy="62" rx="3" ry="2" fill="#000"/><path d="M96 60 Q100 56 104 60" fill="none" stroke="#8a5a32" stroke-width="2.2"/>`
    + `<path d="M84 96 Q88 84 96 76" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="86" cy="106" rx="3" ry="5" transform="rotate(20 86 106)" fill="#fff" fill-opacity=".22"/>`
    + `<path d="M118 112 Q122 104 120 96" fill="none" stroke="#9a96a8" stroke-opacity=".35" stroke-width="1.6"/>`);
})();
