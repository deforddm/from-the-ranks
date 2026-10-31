/* ============ The item art pass (v8.1.x): Books Three and Five, redrawn ============
   David, Oct 30 2026: "do a pass on the item art. make it better in general and be sure to fix the bows that have arrows sticking
   awkwardly out of them." This file overrides ART['item/b3_*'] (first drawn in 61b-67b) and ART['item/b5_*'] (81b-87b) with the
   series' one look: a book-tinted vignette (Book Three cold slate, Book Five harbour slate), light from the upper left, a soft ground
   shadow, a thin dark outline on every silhouette, materials that read (steel bevels, leather stitching, wood grain, horn, mail and
   scale), long weapons on the same diagonal, grip lower left. Book Five's gold inner frame is gone. The hornbow is strung with
   nothing through it; the cache bow is unstrung, a gentle curve, its waxed string coiled in the bark tube.
   Every gradient, pattern and filter id is prefixed with the item id ('@' in the bodies below), so nothing bleeds between pictures. */
(() => { if (typeof ART === 'undefined') return;
  const BG = { 3: ['#26303c', '#0b0f14'], 5: ['#233039', '#0a1014'] };
  const OL = 'stroke="#0b0806" stroke-opacity=".6" stroke-width="1.2" stroke-linejoin="round"';
  /* materials, lit from above (the light falls from the upper left once a shape is on the diagonal) */
  const MAT = {
    st: ['#e6ecf0', '#aab3bb', '#6c747d', '#30353b'], ir: ['#9a9ea4', '#62666c', '#2c2f33'], bk: ['#6a6e76', '#34373c', '#141518'],
    dx: ['#4a4c54', '#24262c', '#0c0d10'], di: ['#8a8e96', '#4a4e56', '#1a1c20'], nb: ['#eef2f4', '#aeb8c0', '#5a646c'],
    rs: ['#8a6a56', '#5a4034', '#2a1a14'], wd: ['#c8aa7c', '#9a7a4e', '#5a4228'], dw: ['#5a4636', '#2e221a', '#120d0a'],
    fh: ['#8a6640', '#5a3e22', '#2a1a0c'], yw: ['#c8804a', '#9a5228', '#5a2a10'], bb: ['#ece6da', '#b8b0a0', '#6a6252'],
    lt: ['#9a6a40', '#6a4426', '#34200f'], dl: ['#5e4634', '#36281c', '#18110b'], gl: ['#8e9092', '#5c5e60', '#2a2c2e'],
    bn: ['#f2ead6', '#d0c29e', '#8e7c58'], an: ['#d8ccb0', '#a8987a', '#5e523e'], hn: ['#7a6a56', '#423528', '#1c150f'],
    yt: ['#f0e2b0', '#c8b072', '#7a6436'], cl: ['#9a9ea2', '#686c71', '#34373b'], br: ['#d8b070', '#9a7638', '#4a3616'],
    ab: ['#b89058', '#7a5a2e', '#3a2a12'], cu: ['#d89a6a', '#9a5a34', '#4a2814'], sn: ['#a8aaa6', '#74766f', '#3c3e3a'],
    ls: ['#cfd1cb', '#9a9c96', '#5e605a'], pp: ['#efe8d2', '#d8cca8', '#a8986e'], kp: ['#b08a5a', '#846238', '#4a3418'],
    pw: ['#e2cfa4', '#c4a874', '#8a6c40'], cy: ['#c07a50', '#8a4a2a', '#44200f'], gz: ['#5a5c62', '#1e1f22', '#08080a'],
    ch: ['#3c444c', '#16191d', '#050607'], fl: ['#a0988a', '#665e4e', '#2e2a22'], sk: ['#8e9496', '#5a5f62', '#2a2c2e'],
    cv: ['#7a7464', '#4e4a3e', '#24221c'], hd: ['#dca454', '#b07a30', '#6a4418'], rd: ['#8e2a20', '#5e1812', '#2a0a08'],
    mg: ['#a8b0b8', '#6e767e', '#343a40'], wx: ['#a4a6a6', '#6e7070', '#3a3c3c'], fe: ['#4e5462', '#22252c', '#0a0b0d'],
    kb: ['#7a746c', '#3e3936', '#141210'], gc: ['#c0ac80', '#8a7650', '#4a3e26'], sw: ['#fbf8f0', '#ddd6c6', '#9a9284'],
    sb: ['#5a5a5e', '#26262a', '#0a0a0c'], bs: ['#3a3e46', '#16181c', '#050506'], hw: ['#efdfae', '#c0a060', '#6a5228'],
    pc: ['#8a7a5e', '#5e5038', '#2e2618'], bl: ['#c89458', '#8a5a2e', '#3e2410'], gs: ['#d6c286', '#a08c50', '#5e5028'] };
  const lin = (k, c) => `<linearGradient id="@${k}" x1="0" y1="0" x2="0" y2="1">${c.map((s, i) => `<stop offset="${(i / (c.length - 1)).toFixed(2)}" stop-color="${s}"/>`).join('')}</linearGradient>`;
  const EXTRA = {
    gf: '<filter id="@gf" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5"/></filter>',
    lo: '<radialGradient id="@lo" cx=".28" cy=".22" r=".95"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></radialGradient>',
    ml: '<pattern id="@ml" width="4" height="3.6" patternUnits="userSpaceOnUse">' + [[2, 1.8], [0, 0], [4, 0], [0, 3.6], [4, 3.6]].map(([x, y]) =>
      `<circle cx="${x + .4}" cy="${y + .5}" r="1.35" fill="none" stroke="#0e1216" stroke-opacity=".55" stroke-width=".6"/><circle cx="${x}" cy="${y}" r="1.35" fill="none" stroke="#eef4fa" stroke-opacity=".42" stroke-width=".55"/>`).join('') + '</pattern>',
    sc: '<pattern id="@sc" width="7" height="8" patternUnits="userSpaceOnUse">' + [[0, 0], [-3.5, 4], [3.5, 4]].map(([x, y]) =>
      `<path d="M${x} ${y} Q${x} ${y + 6} ${x + 3.5} ${y + 6.6} Q${x + 7} ${y + 6} ${x + 7} ${y}" fill="#fff" fill-opacity=".07" stroke="#1a2026" stroke-opacity=".6" stroke-width=".75"/><path d="M${x + 1} ${y + 2} Q${x + 1.4} ${y + 4.6} ${x + 3} ${y + 5.4}" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width=".6"/>`).join('') + '</pattern>',
    wv: '<pattern id="@wv" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 1.5 H3 M1.5 0 V3" stroke="#000" stroke-opacity=".14" stroke-width=".6"/></pattern>' };
  const card = (key, book, label, body, sh = [100, 130, 58, 6]) => {
    const refs = new Set([...body.matchAll(/@([a-z]{2})\b/g)].map(m => m[1]));
    let defs = `<radialGradient id="@bg" cx=".46" cy=".42" r=".74"><stop offset="0" stop-color="${BG[book][0]}"/><stop offset="1" stop-color="${BG[book][1]}"/></radialGradient>`
      + '<filter id="@sf" x="-40%" y="-300%" width="180%" height="700%"><feGaussianBlur stdDeviation="3.2"/></filter>';
    refs.forEach(r => { if (MAT[r]) defs += lin(r, MAT[r]); else if (EXTRA[r]) defs += EXTRA[r]; });
    const shadow = !sh ? '' : typeof sh === 'string' ? sh : `<ellipse cx="${sh[0]}" cy="${sh[1]}" rx="${sh[2]}" ry="${sh[3]}" fill="#000" opacity=".55" filter="url(#@sf)"/>`;
    ART['item/' + key] = (`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" role="img" aria-label="${label}"><defs>${defs}</defs>`
      + `<rect width="200" height="150" rx="3" fill="url(#@bg)"/>${shadow}${body}</svg>`).replace(/~/g, OL).replace(/@/g, key + '-');
    if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [200, 150]; };
  /* the diagonal: draw a long thing along +x (grip at -x), and this lays it lower-left to upper-right */
  const D = (b, k = 1, cx = 100, cy = 72, a = -32) => `<g transform="translate(${cx} ${cy}) rotate(${a}) scale(${k})">${b}</g>`;
  const S32 = Math.sin(32 * Math.PI / 180), C32 = Math.cos(32 * Math.PI / 180);
  const W = (x, y, k = 1, cx = 100, cy = 72) => [+(cx + k * (x * C32 + y * S32)).toFixed(1), +(cy + k * (-x * S32 + y * C32)).toFixed(1)];
  const ln = (d, c, w = 1, op = 1, extra = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-opacity="${op}" stroke-linecap="round" ${extra}/>`;
  const cord = (d, c = '#3a2a1c', w = 2) => ln(d, '#0b0806', w + 1.5, .6) + ln(d, c, w) + ln(d, '#fff', w * .3, .12, 'transform="translate(-.4 -.5)"');
  const r1 = n => +n.toFixed(1);
  const q = (p0, p1, p2, t) => [(1 - t) ** 2 * p0[0] + 2 * t * (1 - t) * p1[0] + t * t * p2[0], (1 - t) ** 2 * p0[1] + 2 * t * (1 - t) * p1[1] + t * t * p2[1]];
  const qd = (p0, p1, p2, t) => [2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]), 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])];
  const steelGrip = (x0, x1, h, wire = '#b8bcc0') => { let s = `<rect x="${x0}" y="${-h}" width="${x1 - x0}" height="${2 * h}" rx="2" fill="#3a2e24" ~/>`;
    for (let x = x0 + 1.5; x < x1 - 1; x += 2.2) s += ln(`M${r1(x)} ${h - .6} L${r1(x + 1.6)} ${-h + .6}`, wire, .9, .8);
    return s + ln(`M${x0 + 1} ${-h + .9} L${x1 - 1} ${-h + .9}`, '#fff', .8, .25); };

  /* ======================= Book Three: cold slate ======================= */

  /* a Second Army whetstone: grey hone, leather sleeve, the Second's stamp worn nearly off */
  card('b3_c1_whetstone', 3, 'A Second Army whetstone', `<g transform="rotate(-14 100 76)">
    <rect x="26" y="62" width="146" height="28" rx="12" fill="url(#@sn)" ~/>
    ${ln('M40 64.5 Q76 69 108 65', '#d8dad4', 1.4, .7)}${ln('M36 70 Q70 74 100 71', '#c8cac4', 4, .18)}
    <circle cx="48" cy="78" r=".9" fill="#4a4c48"/><circle cx="62" cy="82" r="1.1" fill="#4a4c48"/><circle cx="74" cy="76" r=".8" fill="#c0c2bc"/><circle cx="86" cy="84" r="1" fill="#4a4c48"/>
    ${ln('M30 84 Q60 89 98 86', '#26282a', 1.2, .6)}
    <rect x="96" y="58" width="80" height="36" rx="8" fill="url(#@lt)" ~/>
    ${ln('M100 61.6 L172 61.6', '#c89a68', 1, .75, 'stroke-dasharray="2.6 2.4"')}${ln('M100 90.6 L172 90.6', '#c89a68', 1, .45, 'stroke-dasharray="2.6 2.4"')}
    ${ln('M104 59.2 L170 59.2', '#d8a678', 1, .5)}${ln('M98 61 Q94 76 98 92', '#140a04', 2.2, .8)}
    ${ln('M126 60 Q130 76 126 93', '#2a160a', 1.6, .7)}${ln('M152 60 Q149 76 153 93', '#2a160a', 1.2, .5)}
    <circle cx="140" cy="76" r="8" fill="none" stroke="#2a1608" stroke-width="1.4" stroke-opacity=".4"/>${ln('M137 72 L137 80 M143 72.5 L143 79', '#2a1608', 1.3, .3)}
    <rect x="96" y="58" width="80" height="36" rx="8" fill="url(#@lo)"/></g>`, [100, 112, 74, 6]);

  /* an Ilgres iron torc: heavy twisted iron neck-ring, open at the front, knobbed ends wound with sinew */
  { const ring = 'M84 110.6 A62 40 0 1 1 116 110.6';
    let wind = ''; [112, 117, 122, 127].forEach(f => { const a = f * Math.PI / 180, x = 100 + 62 * Math.cos(a), y = 72 + 40 * Math.sin(a);
      let nx = Math.cos(a) / 62, ny = Math.sin(a) / 40; const l = Math.hypot(nx, ny); nx /= l; ny /= l;
      [[x, nx], [200 - x, -nx]].forEach(([cx, mx]) => { const d = `M${r1(cx - mx * 7.5)} ${r1(y - ny * 7.5)} L${r1(cx + mx * 7.5)} ${r1(y + ny * 7.5)}`; wind += ln(d, '#0b0806', 3.6, .6) + ln(d, '#c8b082', 2.2) + ln(d, '#f0e0b8', .6, .5); }); });
    card('b3_c1_torc', 3, 'An Ilgres iron torc', `
    <path d="${ring}" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="16"/>
    <path d="${ring}" fill="none" stroke="url(#@ir)" stroke-width="13.5"/>
    <path d="${ring}" fill="none" stroke="#16181b" stroke-width="13.5" stroke-dasharray="2.2 4.4" stroke-opacity=".6"/>
    <path d="${ring}" fill="none" stroke="#dde2e6" stroke-width="1.6" stroke-dasharray="3.4 3.2" stroke-opacity=".55" transform="translate(-1.6 -3)"/>
    <circle cx="70" cy="38" r="2" fill="#6a3a1e" opacity=".55"/><circle cx="150" cy="96" r="2.6" fill="#6a3a1e" opacity=".5"/><circle cx="160" cy="58" r="1.6" fill="#6a3a1e" opacity=".5"/>
    ${wind}
    <circle cx="84" cy="111" r="8.5" fill="url(#@ir)" ~/><circle cx="116" cy="111" r="8.5" fill="url(#@ir)" ~/>
    <circle cx="81.5" cy="108" r="2.8" fill="#d0d4da" opacity=".55"/><circle cx="113.5" cy="108" r="2.8" fill="#d0d4da" opacity=".55"/>`,
    `<path d="${ring}" transform="translate(5 8)" fill="none" stroke="#000" stroke-width="15" opacity=".5" filter="url(#@sf)"/>`); }

  /* a Rhivi bone charm: a small bhederin in bone, red ochre in the cuts, on a thong with two blue beads */
  { const body = 'M50 96 Q46 82 56 74 Q66 64 84 62 Q100 44 120 46 Q136 48 141 62 Q150 68 152 78 Q160 84 158 96 Q155 102 147 100 Q143 100 141 98 L139 112 Q135 114 131 112 L129 101 Q110 104 92 102 L89 112 Q85 114 81 112 L79 101 Q66 101 58 102 Q52 102 50 96 Z';
    card('b3_c1_charm', 3, 'A Rhivi bone charm', `
    ${cord('M14 14 Q60 50 110 57', '#4a3222', 2.2)}${cord('M118 56 Q154 46 188 12', '#4a3222', 2.2)}
    <circle cx="64" cy="45" r="5.2" fill="#3e6e9e" ~/><circle cx="62.4" cy="43.2" r="1.6" fill="#cfe2f4" opacity=".7"/>
    <circle cx="154" cy="40" r="5.2" fill="#3e6e9e" ~/><circle cx="152.4" cy="38.2" r="1.6" fill="#cfe2f4" opacity=".7"/>
    <path d="${body}" fill="url(#@bn)" ~/>
    ${ln('M148 70 Q156 62 151 55', '#0b0806', 4.4, .6)}${ln('M148 70 Q156 62 151 55', '#f2ead6', 3)}
    ${ln('M60 74 Q76 60 96 54 Q110 48 124 49', '#fffaf0', 1.3, .7)}
    <g stroke-linecap="round">${['M84 70 L80 90', 'M96 62 L92 88', 'M108 56 L104 84', 'M120 54 L118 80', 'M70 78 L76 72 L82 78 L88 70', 'M136 66 L140 74 L144 68']
      .map(d => ln(d, '#5a2a14', 2.6, .5, 'transform="translate(.6 .8)"') + ln(d, '#9a321c', 1.8, .9)).join('')}</g>
    <circle cx="150" cy="82" r="1.7" fill="#3a2a1a"/><circle cx="114" cy="54" r="3" fill="#2a1e14"/>
    <path d="${body}" fill="url(#@lo)"/>`, [104, 118, 52, 5]); }

  /* a bhederin-horn bow: short, recurved, horn belly and sinew back, the grip wrapped in dark hide. Strung; nothing through it */
  { const limb = 'M0 -29 C32 -29 54 -18 64 -8 C70 -3 76 0 83 1 L83 4.5 C75 4 68 2 61 -1 C50 -10 30 -19 0 -19 Z';
    const half = `<path d="${limb}" fill="url(#@hn)" ~/>${ln('M8 -27.4 C34 -27 54 -17 63 -8', '#c4ae84', 2.2, .75)}${ln('M14 -22 C34 -21 50 -13 60 -4', '#9a8a70', .8, .45)}
      <path d="M78.6 .4 L84 1 L84 5 L78.6 4.4 Z" fill="#e6dcc0" ~/>`;
    let wrap = ''; for (let x = -7.5; x <= 7.5; x += 3) wrap += ln(`M${x} -30.4 L${x + 1.6} -17.6`, '#0e0906', 1, .85);
    card('b3_c2_hornbow', 3, 'A bhederin-horn bow', D(`
    ${ln('M-82.5 3.6 L82.5 3.6', '#0b0806', 2.6, .6)}${ln('M-82.5 3.6 L82.5 3.6', '#ddd2b0', 1.1)}
    ${half}<g transform="scale(-1 1)">${half}</g>
    <rect x="-10" y="-31" width="20" height="14" rx="3" fill="url(#@dl)" ~/>${wrap}${ln('M-8 -29.6 L6 -29.6', '#9a7a5c', 1.2, .55)}`, 1.06, 100, 74), [100, 130, 62, 6]); }

  /* a Rhivi spirit-bundle: grass, bone beads and a lock of bhederin hair, tied in red thread */
  { let stalks = ''; for (let i = -7; i <= 7; i++) { const d = `M${r1(100 + i * 1.5)} 26 Q${r1(100 + i * 2.2)} 70 ${r1(100 + i * 3.5)} 118`;
      stalks += ln(d, ['#d6c286', '#a8945a', '#7a6a3c'][(i + 7) % 3], 2.1); }
    card('b3_c2_bundle', 3, 'A Rhivi spirit-bundle', `
    <path d="M88 24 L112 24 L127 119 L73 119 Z" fill="#2a2416" ~/>${stalks}
    ${[-6, -2, 3, 6].map(i => `<ellipse cx="${100 + i * 1.5}" cy="24" rx="1.8" ry="4" fill="#e2d4a0" ~/>`).join('')}
    ${cord('M108 48 Q132 60 136 86', '#4a3222', 1.4)}
    ${[[121, 55], [130, 66], [135, 78]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.6" ry="4.6" fill="url(#@bn)" ~/>`).join('')}
    <path d="M84 77 Q70 92 74 112 Q76 122 68 132 Q82 122 85 108 Q89 94 91 79 Z" fill="#3a2618" ~/>
    ${ln('M83 82 Q75 96 78 114 Q78 122 73 128', '#6a4a30', .9, .7)}${ln('M87 84 Q82 98 82 110', '#6a4a30', .8, .6)}
    <path d="M90.5 44 Q100 48 109.5 44 L110.5 51 Q100 55 89.5 51 Z" fill="#9a2a1c" ~/>
    <path d="M80.5 71 Q100 76 119.5 71 L120.5 79 Q100 84 79.5 79 Z" fill="#9a2a1c" ~/>
    ${ln('M82 73.5 Q100 78 118 73.5 M82 76.5 Q100 81 118 76.5', '#5a140c', .8, .8)}${ln('M82 72 Q100 76.5 118 72', '#d8584a', .8, .5)}
    ${cord('M119 79 Q127 90 123 106', '#9a2a1c', 1.2)}`, [100, 124, 36, 5]); }

  /* a Seerdomin's grey mace: long-hafted, flanged, grey iron, the hand-grip worn smooth; colder than iron ought to be */
  { let wrap = ''; for (let x = -82; x < -52; x += 4) wrap += ln(`M${x} 4.2 L${x + 3} -4.2`, '#120c08', .9, .6);
    card('b3_c2_mace', 3, "A Seerdomin's grey mace", D(`
    <rect x="-86" y="-3.2" width="140" height="6.4" rx="2" fill="url(#@ir)" ~/>${ln('M-50 -2 L50 -2', '#d0d8e0', .8, .5)}
    <rect x="-84" y="-4.8" width="34" height="9.6" rx="3" fill="url(#@dl)" ~/>${wrap}${ln('M-78 -3.4 L-58 -3.4', '#a8886c', 1.6, .5)}
    <circle cx="-88" cy="0" r="5.6" fill="url(#@ir)" ~/><circle cx="-89.6" cy="-1.8" r="1.6" fill="#e0e6ec" opacity=".5"/>
    <rect x="45" y="-5" width="6" height="10" rx="1" fill="url(#@ir)" ~/>
    <path d="M54 6 L60 22 Q70 24.5 79 22 L84 6 Z" fill="url(#@bk)" ~/>
    <rect x="51" y="-7.5" width="35" height="15" rx="3" fill="url(#@ir)" ~/>
    <path d="M54 -6 L60 -22 Q70 -24.5 79 -22 L84 -6 Z" fill="url(#@ir)" ~/>
    ${ln('M60.6 -21.2 Q70 -23.4 78.6 -21.2', '#e4ebf2', 1, .75)}${ln('M58 -14 L64 -14', '#b4d0e6', 1.2, .35)}
    <path d="M56 -3 L82 -3 L84.6 0 L82 3 L56 3 L53.4 0 Z" fill="#8a9098" ~/>${ln('M57 -2.3 L81 -2.3', '#eef3f8', 1, .8)}
    <path d="M67 -24 L69 -21 L71 -24 Z" fill="#1a222a"/><circle cx="87" cy="0" r="4.2" fill="url(#@ir)" ~/>
    ${ln('M54 -8 L84 -8', '#a8c8e0', .7, .3)}`, 1.04), [100, 130, 62, 6]); }

  /* a Capan round shield: painted leather over boards, dark red, the city's gold dome, a bronze boss, and the marks of nine days */
  { const cuts = [[52, 50, 62, 57], [136, 38, 146, 48], [152, 82, 141, 89], [58, 104, 71, 100], [118, 114, 129, 119], [82, 28, 89, 39], [44, 76, 55, 74], [141, 108, 150, 97], [108, 58, 116, 51]];
    card('b3_c3_shield', 3, 'A Capan round shield', `
    <ellipse cx="104" cy="76" rx="62" ry="60" fill="#1a0c08" ~/>
    <ellipse cx="100" cy="72" rx="62" ry="60" fill="#3a1a12" ~/>
    <ellipse cx="100" cy="72" rx="58" ry="56" fill="url(#@rd)"/>
    <ellipse cx="100" cy="72" rx="54" ry="52" fill="none" stroke="#c88a6a" stroke-opacity=".4" stroke-width=".9" stroke-dasharray="2 3"/>
    <g fill="#c09a38" opacity=".88"><path d="M70 96 L70 88 Q70 52 100 50 Q130 52 130 88 L130 96 Z"/><rect x="65" y="96" width="70" height="6"/><circle cx="100" cy="38" r="2.8"/></g>
    ${ln('M100 50 L100 40', '#c09a38', 2.4, .88)}${ln('M100 51 Q88 70 86 96 M100 51 Q112 70 114 96', '#6a4a14', 1.2, .6)}
    <g fill="#5e1812" opacity=".75"><path d="M76 60 q4 -2 6 2 q-3 3 -6 -2Z"/><path d="M122 84 q5 -1 6 4 q-4 2 -6 -4Z"/><path d="M92 99 h6 v2 h-6Z"/></g>
    ${cuts.map(([a, b, c, d]) => ln(`M${a} ${b} L${c} ${d}`, '#1a0806', 2.4, .7, 'transform="translate(.8 .8)"') + ln(`M${a} ${b} L${c} ${d}`, '#c8a070', 1.3, .9)).join('')}
    <circle cx="100" cy="76" r="14" fill="url(#@br)" ~/>${ln('M90 70 Q94 64 101 63', '#f6dca4', 2, .75)}${ln('M110 82 Q106 88 98 89', '#2a1a08', 1.6, .55)}
    <path d="M38 62 L45 66 L39 70 Z" fill="#0e1014"/><path d="M151 106 L156 99 L158 108 Z" fill="#0e1014"/>
    <ellipse cx="100" cy="72" rx="62" ry="60" fill="url(#@lo)"/>`, [106, 134, 58, 6]); }

  /* a Grey Sword's surcoat: grey wool, split at the hem and torn, the boar's head in black thread cut through */
  { const coat = 'M76 22 Q100 30 124 22 L146 30 L150 52 Q148 90 156 128 L144 131 L136 126 L126 132 L114 128 L104 129 L100 100 L96 129 L86 131 L76 126 L64 132 L44 128 Q52 90 50 52 L54 30 Z';
    card('b3_c3_surcoat', 3, "A Grey Sword's surcoat", `
    <path d="${coat}" fill="url(#@cl)" ~/>
    <path d="M68 40 Q64 90 60 128 L70 128 Q72 90 76 40 Z" fill="#2a2c30" opacity=".45"/><path d="M130 42 Q136 90 142 130 L133 130 Q128 92 123 42 Z" fill="#2a2c30" opacity=".4"/>
    ${ln('M88 40 Q86 80 84 126', '#c8ccd0', 3, .22)}${ln('M114 44 Q116 84 118 124', '#c8ccd0', 2, .16)}${ln('M58 34 L74 26', '#d8dce0', 1.4, .5)}
    <path d="M80 24 Q100 40 120 24 Q100 32 80 24 Z" fill="#141618"/>
    <path d="M58 106 L67 111 L60 118 L64 112 Z" fill="#141618"/>
    <path d="M80 56 Q86 53 92 51 Q100 47 108 47 L111 40 L113 49 Q119 54 119 62 Q118 70 112 72 L100 72 Q90 70 82 66 Z" fill="#121214"/>
    ${ln('M92 51 l2 -3 l2 3 l2 -3.4 l2 3.4 l2 -3.6 l2 3.6', '#121214', 1.2)}${ln('M86 66 Q81 62 84.6 57', '#d8d4c8', 1.6, .85)}<circle cx="103" cy="56.6" r="1.3" fill="#9a9ea2"/>${ln('M81 58 L81 64', '#4a4c50', .8, .8)}
    ${ln('M80 49 L121 77', '#8a8e92', 2.2)}${ln('M80 49 q-4 2 -3 6 M121 77 q4 -1 5 3 M95 59 q-2 4 1 6', '#121214', .8, .8)}
    <path d="${coat}" fill="url(#@lo)"/>`, [100, 138, 52, 5]); }

  /* a Beklite's spear: long ash, a broad leaf blade of black iron, a grey rag knotted under it */
  { const [kx, ky] = W(52, 0);
    card('b3_c3_spear', 3, "A Beklite's spear", D(`
    <rect x="-92" y="-2.4" width="146" height="4.8" rx="2" fill="url(#@wd)" ~/>
    ${ln('M-80 -.6 L-20 -.4 M-10 .9 L40 .6', '#6a4e2e', .7, .6)}${ln('M-88 -1.6 L50 -1.6', '#f0dcb0', .8, .5)}
    <rect x="-96" y="-3" width="6" height="6" rx="1.5" fill="url(#@bk)" ~/>
    <path d="M50 -3.6 L64 -2.6 L64 2.6 L50 3.6 Z" fill="url(#@bk)" ~/>
    <path d="M62 0 Q68 -11 80 -10 Q90 -6 97 0 Q90 6 80 10 Q68 11 62 0 Z" fill="url(#@bk)" ~/>
    ${ln('M64 0 L95 0', '#0e0f11', 1.2)}${ln('M65 -4 Q70 -10 80 -9.3 Q89 -6 95.5 -.6', '#ccd4dc', .9, .75)}${ln('M66 5 Q74 9.6 82 9', '#8a929a', .7, .4)}`), [100, 130, 64, 6]);
    ART['item/b3_c3_spear'] = ART['item/b3_c3_spear'].replace('</svg>', `<path d="M${kx - 4} ${ky} Q${kx - 12} ${ky + 10} ${kx - 13} ${ky + 20} L${kx - 10} ${ky + 18} L${kx - 9} ${ky + 23} Q${kx - 5} ${ky + 14} ${kx - 2} ${ky + 8} Q${kx - 2} ${ky + 18} ${kx + 1} ${ky + 28} L${kx + 3} ${ky + 25} L${kx + 5} ${ky + 29} Q${kx + 6} ${ky + 14} ${kx + 4} ${ky} Z" fill="#8c867a" ${OL}/>`
      + `<path d="M${kx - 5} ${ky + 5} Q${kx - 9} ${ky + 12} ${kx - 10} ${ky + 18} M${kx + 2} ${ky + 8} Q${kx + 2} ${ky + 18} ${kx + 3} ${ky + 24}" fill="none" stroke="#3a3c40" stroke-width="1" stroke-opacity=".6"/><path d="M${kx - 3} ${ky + 3} Q${kx - 7} ${ky + 9} ${kx - 9} ${ky + 15}" fill="none" stroke="#d8dce0" stroke-width=".8" stroke-opacity=".4"/><ellipse cx="${kx}" cy="${ky}" rx="5.4" ry="4.4" fill="#7a746a" ${OL}/><path d="M${kx - 3} ${ky - 1} q3 2 6 0" fill="none" stroke="#3a3c40" stroke-width=".8"/></svg>`)
      ; }

  /* Treach's stripe: tawny hide barred with black, on a thong with a bone bead; warm, which it should not be */
  { const strip = 'M88 40 Q100 36 114 40 Q118 70 120 100 Q122 114 118 121 L112 118 L108 126 L102 120 L96 126 L92 119 Q86 104 86 80 Q84 58 88 40 Z';
    const bar = (y, x0, x1, w) => `<path d="M${x0} ${y} Q${(x0 + x1) / 2} ${y - 4} ${x1} ${y + 2} L${x1} ${y + 2 + w * .6} Q${(x0 + x1) / 2} ${y + w} ${x0} ${y + w} Z" fill="#1a120a" opacity=".9"/>`;
    let hair = ''; for (let i = 0; i < 16; i++) { const x = 90 + (i * 7) % 26, y = 46 + i * 4.6; hair += ln(`M${x} ${r1(y)} l2 5`, '#f0c878', .7, .35); }
    card('b3_c3_stripe', 3, "Treach's stripe", `
    <ellipse cx="104" cy="82" rx="34" ry="46" fill="#d88a30" opacity=".13" filter="url(#@gf)"/>
    ${cord('M28 16 Q72 50 105 46', '#3a2818', 2)}${cord('M109 46 Q144 42 174 14', '#3a2818', 2)}
    <ellipse cx="82" cy="45" rx="5.2" ry="3.8" fill="url(#@bn)" ~/>
    <g transform="rotate(8 102 82)"><path d="${strip}" fill="url(#@hd)" ~/>${hair}
    ${bar(52, 87, 116, 6)}${bar(68, 86, 108, 7)}${bar(72, 110, 118, 4)}${bar(88, 87, 119, 6)}${bar(105, 89, 112, 6)}
    ${ln('M90 42 Q86 70 88 100', '#f8d498', 1.2, .5)}<circle cx="102" cy="46" r="2.6" fill="#1a120a"/>
    <path d="${strip}" fill="url(#@lo)"/></g>`, [106, 130, 30, 5]); }

  /* Grey Sword rope-and-hooks: a coil of grey rope, two iron hooks back to back, a strip of grey cloth at the knot */
  { const rope = d => ln(d, '#0b0806', 7.6, .6) + ln(d, '#7c8084', 6) + ln(d, '#3a3e42', 6, .6, 'stroke-dasharray="1.6 2.6"') + ln(d, '#dfe3e6', 1.2, .5, 'stroke-dasharray="2 2.2" transform="translate(-.6 -1.4)"');
    const ell = (rx, ry) => `M${82 - rx} 92 A${rx} ${ry} 0 1 0 ${82 + rx} 92 A${rx} ${ry} 0 1 0 ${82 - rx} 92`;
    const iron = d => ln(d, '#0b0806', 7, .6) + ln(d, '#5a5e64', 5) + ln(d, '#c8ced4', 1.2, .7, 'transform="translate(-1 -1)"');
    card('b3_c4_ropehooks', 3, 'Grey Sword rope-and-hooks', `
    <ellipse cx="82" cy="92" rx="22" ry="9" fill="#0a0d10"/>
    ${[[50, 24], [42, 20], [34, 16], [26, 12.5]].map(([a, b]) => rope(ell(a, b))).join('')}
    ${rope('M131 96 Q146 98 150 84')}
    ${iron('M151 73 L151 30')}${iron('M151 30 Q132 28 128.5 46')}${iron('M151 30 Q170 28 173.5 46')}
    <path d="M125.6 44 L128.4 53 L131.4 44 Z" fill="#5a5e64" ~/><path d="M170.6 44 L173.6 53 L176.4 44 Z" fill="#5a5e64" ~/>
    <circle cx="151" cy="75" r="4.4" fill="none" stroke="#5a5e64" stroke-width="2.6"/>
    <ellipse cx="150" cy="81" rx="7.4" ry="6.2" fill="#7c8084" ~/>${ln('M145 78 L155 84 M145 84 L155 78', '#3a3e42', 1.2, .8)}
    <path d="M155 79 Q167 83 171 96 Q165 93 160 99 Q160 89 152 85 Z" fill="url(#@cl)" ~/>${ln('M158 84 Q164 88 165 95', '#3a3c40', 1, .6)}`,
    `<ellipse cx="88" cy="99" rx="56" ry="24" fill="#000" opacity=".5" filter="url(#@sf)"/><path d="M155 34 L155 78 M155 34 Q136 32 132 50 M155 34 Q174 32 178 50" stroke="#000" stroke-width="6" fill="none" opacity=".45" filter="url(#@sf)"/>`); }

  /* T'lan Imass flint blade: knapped flint, an antler haft, the hide binding gone to dust */
  { const hw = x => x < 20 ? 5.5 + (x + 2) * 3.5 / 22 : x < 50 ? 9 - (x - 20) * .5 / 30 : x < 76 ? 8.5 - (x - 50) * 2.5 / 26 : 6 - (x - 76) * 6 / 20;
    let flakes = ''; for (let x = 0; x < 86; x += 6.5) { const a = hw(x), b = hw(x + 6.5);
      flakes += ln(`M${r1(x)} ${r1(-a + .4)} Q${r1(x + 3.2)} ${r1(-a + 5)} ${r1(x + 6.5)} ${r1(-b + .4)}`, '#ddd6c6', .8, .5);
      flakes += ln(`M${r1(x + 3)} ${r1(a - .4)} Q${r1(x + 6.2)} ${r1(a - 5)} ${r1(x + 9.5)} ${r1(hw(x + 9.5) - .4)}`, '#1e1a14', .8, .6); }
    let pearls = ''; [[-84, -2], [-76, 3], [-66, -3], [-56, 2], [-46, -2.5], [-36, 2.4], [-28, -3]].forEach(([x, y]) => pearls += `<circle cx="${x}" cy="${y}" r="1" fill="#6a5e48" opacity=".6"/>`);
    card('b3_c4_flint', 3, "T'lan Imass flint blade", D(`
    <path d="M-70 -6 Q-66 -15 -59 -17 Q-59 -11 -62 -6 Z" fill="url(#@an)" ~/>
    <path d="M-92 -2 Q-80 -7 -60 -6 Q-40 -5 -22 -6 L-12 -5 L-12 5 L-22 6 Q-40 7 -60 6 Q-78 8 -90 5 Q-96 2 -92 -2 Z" fill="url(#@an)" ~/>${pearls}
    ${ln('M-88 -3.4 Q-60 -5 -24 -4.6', '#f2ead8', 1, .5)}
    <path d="M-2 -5.5 Q20 -9 50 -8.5 Q76 -6 96 0 Q76 6 50 8 Q20 9 -2 5.5 Z" fill="url(#@fl)" ~/>${flakes}
    ${ln('M2 -5 Q22 -8.2 50 -7.8 Q74 -5.6 93 -.4', '#efe8d8', .7, .6)}<ellipse cx="28" cy="2" rx="9" ry="2.6" fill="#c0b69c" opacity=".35"/>
    <rect x="-17" y="-6.8" width="20" height="13.6" rx="2" fill="#7a6a52" ~/>
    ${ln('M-14 -6.6 L-12 6.6 M-9 -6.6 L-7 6.6 M-4 -6.6 L-3 2 M0 -6.6 L1 6.6', '#4a3e2c', 1, .75)}
    <circle cx="-6" cy="4" r="1.6" fill="#2e2a22"/><circle cx="-11" cy="-3" r=".9" fill="#a89a7e"/><circle cx="-2" cy="-4" r=".8" fill="#a89a7e"/>
    ${ln('M-2 6.6 q2 4 0 7 M-10 6.6 q-1 3 1 5', '#7a6a52', .8, .7)}`), [100, 130, 62, 6]); }

  /* a Capan temple token: worn bronze, a domed temple and a ring of marks, green in the hollows */
  { let ticks = ''; for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2, x = 100 + 30 * Math.cos(a), y = 86 + 27.5 * Math.sin(a), x2 = 100 + 26 * Math.cos(a), y2 = 86 + 24 * Math.sin(a);
      ticks += ln(`M${r1(x)} ${r1(y)} L${r1(x2)} ${r1(y2)}`, i % 3 ? '#3a2a12' : '#4e8a6a', 1.6, i % 3 ? .55 : .65); }
    const emb = (d, w = 1.3) => ln(d, '#2a1c0a', w, .6, 'transform="translate(.8 .8)"') + ln(d, '#f0d49a', w * .8, .55, 'transform="translate(-.5 -.5)"');
    card('b3_c4_token', 3, 'Capan temple token', `
    ${cord('M22 14 Q66 30 97 48', '#5a4630', 2)}${cord('M103 48 Q138 30 178 14', '#5a4630', 2)}
    <ellipse cx="58" cy="29" rx="4" ry="3.2" fill="#5a4630" ~/><ellipse cx="142" cy="29" rx="4" ry="3.2" fill="#5a4630" ~/>
    <ellipse cx="103" cy="89" rx="40" ry="37" fill="#3a2a12" ~/>
    <ellipse cx="100" cy="86" rx="40" ry="37" fill="url(#@ab)" ~/>
    <ellipse cx="100" cy="86" rx="34" ry="31" fill="none" stroke="#3a2a12" stroke-opacity=".5"/><ellipse cx="99.4" cy="85.3" rx="34" ry="31" fill="none" stroke="#e8c88a" stroke-opacity=".3"/>
    ${ticks}
    ${emb('M86 94 Q86 74 100 72 Q114 74 114 94')}${emb('M100 72 L100 66')}${emb('M88 94 L88 100 M94 94 L94 100 M100 94 L100 100 M106 94 L106 100 M112 94 L112 100')}${emb('M83 101 L117 101', 1.6)}
    <ellipse cx="90" cy="102.5" rx="6" ry="1.4" fill="#4e8a6a" opacity=".55"/><ellipse cx="111" cy="102" rx="5" ry="1.4" fill="#4e8a6a" opacity=".5"/>
    ${ln('M122 104 Q112 113 98 114', '#5a9a78', 2.2, .45)}<circle cx="88" cy="81" r="1.4" fill="#4e8a6a" opacity=".5"/>
    <ellipse cx="90" cy="74" rx="15" ry="8" fill="#f0d8a0" opacity=".14"/>
    <circle cx="100" cy="54" r="3.4" fill="#0e0a06"/>
    <ellipse cx="100" cy="86" rx="40" ry="37" fill="url(#@lo)"/>`, [108, 128, 42, 5]); }

  /* a blood-iron knife: Ilgres, darker than iron, a rime along the fuller that does not melt */
  { let rime = ''; for (let x = 4; x < 60; x += 3.4) { const a = (x * 37) % 180, l = 1.6 + (x % 3) * .5;
      rime += ln(`M${r1(x - l * Math.cos(a))} ${r1(-1 - l * Math.sin(a) * .6)} L${r1(x + l * Math.cos(a))} ${r1(-1 + l * Math.sin(a) * .6)}`, '#e4f4ff', .8, .85); }
    card('b3_c5_knife', 3, 'Blood-iron knife', D(`
    ${ln('M-4 -1 L64 -1', '#a8d4f0', 6, .22, 'filter="url(#@gf)"')}
    <path d="M-6 -6.5 L62 -6.5 Q78 -5 88 0 Q74 7 56 7.5 L-6 6.5 Z" fill="url(#@dx)" ~/>
    ${ln('M-4 -5.8 L62 -5.8 Q76 -4.6 86 -.4', '#c8d2dc', .9, .6)}${ln('M-4 5.6 L56 6.4 Q72 6 86 .5', '#8a96a2', .8, .5)}
    ${ln('M2 -1 L60 -1', '#060708', 2.2)}${rime}
    <path d="M64 4.6 Q72 4 78 1.6 L80 3.4 Q72 6.4 62 6.6 Z" fill="#4a1410" opacity=".4"/>
    <rect x="-10" y="-9.5" width="5" height="19" rx="1.2" fill="url(#@ir)" ~/>
    <rect x="-66" y="-5" width="56" height="10" rx="2" fill="url(#@dl)" ~/>
    ${[-58, -40, -22].map(x => `<rect x="${x}" y="-5.4" width="5" height="10.8" rx="1" fill="#c8b48a" ~/>${ln(`M${x + 1.6} -5 L${x + 1.6} 5 M${x + 3.3} -5 L${x + 3.3} 5`, '#7a6a48', .6, .8)}`).join('')}
    <circle cx="-70" cy="0" r="6" fill="url(#@ir)" ~/><circle cx="-71.8" cy="-2" r="1.8" fill="#dfe6ec" opacity=".5"/>`, 1.02, 96), [98, 128, 56, 6]); }

  /* a Pannion chain of office: grey iron links and a bone disc carved with an open eye */
  { const links = (p0, p1, p2, n) => { let s = ''; for (let i = 0; i <= n; i++) { const t = i / n, [x, y] = q(p0, p1, p2, t), [dx, dy] = qd(p0, p1, p2, t), a = r1(Math.atan2(dy, dx) * 180 / Math.PI);
      s += i % 2 ? `<g transform="translate(${r1(x)} ${r1(y)}) rotate(${a})"><rect x="-4.6" y="-1.3" width="9.2" height="2.6" rx="1.3" fill="#5a5e64" ~/>${ln('M-3.6 -.6 L3.6 -.6', '#c8ced4', .6, .6)}</g>`
        : `<g transform="translate(${r1(x)} ${r1(y)}) rotate(${a})"><ellipse rx="4.8" ry="2.9" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="3.2"/><ellipse rx="4.8" ry="2.9" fill="none" stroke="#7a7e84" stroke-width="1.8"/><path d="M-3.6 -2 Q0 -3.2 3.6 -2" fill="none" stroke="#d8dee4" stroke-width=".7" stroke-opacity=".7"/></g>`; } return s; };
    card('b3_c5_chain', 3, 'A Pannion chain of office', `
    ${links([22, 12], [54, 72], [96, 70], 15)}${links([104, 70], [146, 72], [178, 12], 15)}
    <circle cx="100" cy="70" r="4.4" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="3.6"/><circle cx="100" cy="70" r="4.4" fill="none" stroke="#7a7e84" stroke-width="2.2"/>
    <circle cx="102.5" cy="97" r="25" fill="#6a5c40" ~/><circle cx="100" cy="95" r="25" fill="url(#@bn)" ~/>
    <circle cx="100" cy="95" r="21" fill="none" stroke="#5a4a30" stroke-opacity=".35"/>
    <path d="M80 95 Q100 79 120 95 Q100 111 80 95 Z" fill="none" stroke="#fffaf0" stroke-width="1.2" stroke-opacity=".5" transform="translate(.8 .9)"/>
    <path d="M80 95 Q100 79 120 95 Q100 111 80 95 Z" fill="none" stroke="#3a2e1e" stroke-width="2"/>
    <circle cx="100" cy="95" r="7" fill="#c8b890" stroke="#3a2e1e" stroke-width="1.6"/><circle cx="100" cy="95" r="3" fill="#2a1e12"/><circle cx="98.6" cy="93.6" r="1" fill="#f6efe0"/>
    <circle cx="100" cy="95" r="25" fill="url(#@lo)"/>`, [104, 128, 30, 4]); }

  /* a Rhivi water-skin: a bhederin bladder stitched with sinew, one bone bead */
  { const sk = 'M44 86 Q42 58 72 50 Q104 42 134 54 Q160 64 160 86 Q158 110 126 116 Q92 122 64 114 Q44 106 44 86 Z';
    let st = ''; for (let i = 1; i < 12; i++) { const [x, y] = q([50, 92], [100, 106], [152, 84], i / 12); st += ln(`M${r1(x - 1.6)} ${r1(y - 2.6)} L${r1(x + 1.6)} ${r1(y + 2.6)}`, '#d8c49a', 1.2, .9); }
    card('b3_c5_skin', 3, 'A Rhivi water-skin', `
    ${cord('M160 70 Q118 18 60 54', '#3a2616', 2)}
    <path d="M150 66 Q162 58 170 48 L180 55 Q172 66 160 79 Z" fill="url(#@bl)" ~/>
    <path d="${sk}" fill="url(#@bl)" ~/>
    ${ln('M50 92 Q100 106 152 84', '#2e1a0c', 1.4)}${st}
    ${ln('M70 74 Q90 66 114 70 M62 100 Q86 108 112 104', '#3e2410', 1, .45)}
    <ellipse cx="84" cy="63" rx="24" ry="8" fill="#fff" opacity=".17" transform="rotate(-10 84 63)"/><circle cx="74" cy="62" r="2.2" fill="#fff" opacity=".4"/>
    <path d="M161 63 L169 72" stroke="#2e1a0c" stroke-width="5" stroke-opacity=".9"/>${ln('M159 64 L167 73 M162 61 L170 70', '#c8b48a', .9, .8)}
    <rect x="171" y="45" width="9" height="7" rx="2" fill="url(#@bn)" transform="rotate(38 175 48)" ~/>
    ${cord('M166 72 Q172 82 168 92', '#3a2616', 1.4)}<ellipse cx="168" cy="96" rx="3.6" ry="4.6" fill="url(#@bn)" ~/>
    <path d="${sk}" fill="url(#@lo)"/>`, [104, 120, 64, 6]); }

  /* a Moranth chitin vambrace: black chitin in overlapping plates, two straps */
  { const top = x => 50 + (x - 40) * .07, bot = x => 106 - (x - 40) * .1;
    let plates = ''; [40, 60, 80, 100, 120, 140].forEach(xa => { const xb = xa + 24, ta = r1(top(xa)), tb = r1(top(xb)), ba = r1(bot(xa)), bb = r1(bot(xb)), mb = r1((tb + bb) / 2);
      plates += `<path d="M${xa} ${ta} L${xb} ${tb} Q${xb + 7} ${mb} ${xb} ${bb} L${xa} ${ba} Z" fill="url(#@ch)" ~/>`
        + ln(`M${xb} ${tb} Q${xb + 7} ${mb} ${xb} ${bb}`, '#5e7a88', 1.1, .7) + ln(`M${xa + 2} ${r1(ta + 3)} L${xb - 1} ${r1(tb + 3)}`, '#8aa6b4', 1.2, .45)
        + ln(`M${xa + 3} ${r1(ta + (ba - ta) * .3)} L${xb} ${r1(tb + (bb - tb) * .3)}`, '#b0ccd8', 2, .22); });
    const strap = x => `<path d="M${x} ${r1(top(x) - 1)} L${x + 6} ${r1(top(x + 6) - 1)} L${x + 6} ${r1(bot(x + 6) + 1)} L${x} ${r1(bot(x) + 1)} Z" fill="url(#@dl)" ~/>`
      + `<rect x="${x - 1.5}" y="${r1(top(x) - 6)}" width="9" height="7" rx="1" fill="none" stroke="#7a7e84" stroke-width="1.8"/>` + cord(`M${x + 3} ${r1(bot(x) + 1)} Q${x + 9} ${r1(bot(x) + 12)} ${x + 4} ${r1(bot(x) + 20)}`, '#3a2a1c', 3.4);
    card('b3_c6_vambrace', 3, 'A Moranth chitin vambrace', `
    ${plates}<ellipse cx="40" cy="78" rx="8" ry="28" fill="#050607" ~/><ellipse cx="41" cy="78" rx="5" ry="23" fill="#14181c"/>${ln('M34 58 Q32 78 35 98', '#6a8a9a', 1, .55)}
    ${strap(70)}${strap(128)}`, [104, 124, 68, 6]); }

  /* a barge-builder's axe: broad, thin, bearded, on a long ash haft; for squaring timber */
  card('b3_c6_axe', 3, "A barge-builder's axe", D(`
    <path d="M-90 -3 Q-20 -5.4 52 -3.6 L52 3.6 Q-20 4.6 -90 4.2 Q-94 .6 -90 -3 Z" fill="url(#@wd)" ~/>
    ${ln('M-84 -.8 Q-40 -2 0 -1.4 M-60 1.8 Q-20 1 30 1.6', '#6a4e2e', .7, .6)}${ln('M-86 -2 Q-30 -4 48 -2.6', '#f0dcb0', .8, .45)}
    <path d="M24 -6 L42 -6 Q44 -14 50 -22 Q56 -32 56 -44 Q34 -48 8 -44 Q0 -42 -4 -34 Q8 -30 16 -22 Q22 -14 24 -6 Z" fill="url(#@ir)" ~/>
    <path d="M56 -44 Q34 -48 8 -44 Q0 -42 -4 -34 Q2 -37.5 9 -40 Q33 -43.4 55 -40 Z" fill="#c4ccd2" opacity=".9"/>
    ${ln('M56 -44 Q34 -48 8 -44 Q0 -42 -4 -34', '#f4f8fa', .9, .9)}
    <path d="M30 -47 L32.6 -43.6 L35 -46.8 Z" fill="#1a222a"/>
    <ellipse cx="34" cy="-28" rx="2.4" ry="1.4" fill="#1e2024" opacity=".3"/><ellipse cx="22" cy="-34" rx="2" ry="1.2" fill="#1e2024" opacity=".3"/><ellipse cx="42" cy="-20" rx="1.8" ry="1.2" fill="#1e2024" opacity=".3"/>
    <path d="M22 -7 L44 -7 L46 0 L44 7 L22 7 L20 0 Z" fill="url(#@ir)" ~/>${ln('M23 -6.2 L43 -6.2', '#dfe6ec', .9, .6)}
    <path d="M44 -3 L50 -2 L50 2 L44 3 Z" fill="#3a2a18" ~/>`, 1, 110, 80), [104, 134, 58, 6]);

  /* a Condor feather: long, black, ragged at the barbs, ivory at the quill; cold, and it lifts */
  { const w2 = x => x < -56 ? 0 : x > 90 ? 0 : 22 * Math.sin(Math.PI * (x + 56) / 146) ** .8, w1 = x => x < -50 ? 0 : 9 * Math.sin(Math.PI * (x + 50) / 140) ** .9;
    const cutsB = [12, -22, 50], cutsT = [30, -10];
    let bot = 'M90 0', tp = 'M-56 0';
    for (let x = 88; x >= -56; x -= 3) { const c = cutsB.find(k => Math.abs(k - x) < 2); bot += ` L${x} ${r1(c !== undefined ? w2(x) * .35 : w2(x) - ((x / 3) % 2 ? 0 : 1.4))}`; }
    for (let x = -54; x <= 88; x += 3) { const c = cutsT.find(k => Math.abs(k - x) < 2); tp += ` L${x} ${r1(-(c !== undefined ? w1(x) * .3 : w1(x)))}`; }
    let barbs = ''; for (let x = -50; x < 86; x += 3.2) { barbs += ln(`M${r1(x)} .5 L${r1(x - 6)} ${r1(w2(x - 6) - 1)}`, '#3c4454', .6, .55); if (x > -44) barbs += ln(`M${r1(x)} -.5 L${r1(x - 4)} ${r1(-w1(x - 4) + .6)}`, '#56607a', .5, .5); }
    card('b3_c6_feather', 3, 'A Condor feather', D(`
    <path d="${tp} L90 0 Z" fill="url(#@fe)" ~/><path d="${bot} L-56 0 Z" fill="url(#@fe)" ~/>${barbs}
    ${ln('M-40 -4 Q10 -9.6 70 -4.4', '#9ab4d4', 1.1, .45)}${ln('M-50 12 Q0 22 60 11', '#9ab8d8', .9, .25)}
    ${ln('M-64 2 q-2 6 2 9 M-60 3 q2 6 -1 10 M-62 -2 q-3 -4 0 -7', '#5a5e66', 1, .6)}
    ${ln('M-88 0 L-54 0', '#0b0806', 4.4, .6)}${ln('M-88 0 L-54 0', '#e8dcc0', 3)}${ln('M-54 0 L20 0', '#0b0806', 3, .5)}${ln('M-54 0 L20 0', '#ddd2b6', 1.8)}${ln('M20 0 L90 0', '#cfc4a8', 1)}
    ${ln('M-86 -.9 L-56 -.9', '#fffaf0', .8, .6)}`, 1, 100, 72), [100, 128, 60, 5]); }

  /* Seerdomin grey mail: fine grey links, cold however long it is worn */
  { const shirt = 'M70 26 Q100 34 130 26 L162 38 L170 72 L150 78 L144 60 L142 124 L134 128 L126 124 L118 129 L110 125 L100 130 L90 125 L82 129 L74 124 L66 128 L58 124 L56 60 L50 78 L30 72 L38 38 Z';
    card('b3_c7_greymail', 3, 'Seerdomin grey mail', `
    <path d="${shirt}" fill="url(#@mg)" ~/><path d="${shirt}" fill="url(#@ml)"/>
    <path d="M66 46 Q62 90 64 124 L74 124 Q72 88 74 46 Z" fill="#1a1e22" opacity=".35"/><path d="M128 44 Q134 88 132 126 L124 124 Q124 86 120 44 Z" fill="#1a1e22" opacity=".32"/>
    <path d="M90 44 Q88 84 92 124 L98 126 Q94 84 96 44 Z" fill="#fff" opacity=".07"/><path d="M38 40 L56 60 L50 78 L30 72 Z" fill="#1a1e22" opacity=".2"/>
    <ellipse cx="100" cy="31" rx="17" ry="5.4" fill="#101316"/>
    ${ln('M83 30 Q100 38 117 30', '#c8d2dc', 1.4, .55)}${ln('M40 40 L68 28', '#e4ecf4', 1.3, .5)}
    <path d="${shirt}" fill="#a8c8e8" opacity=".07"/><path d="${shirt}" fill="url(#@lo)"/>`, [100, 136, 56, 5]); }

  /* a K'ell Hunter's blade: as long as a man's arm, broken off at the wrist of the thing that grew it; never forged */
  card('b3_c7_hunterblade', 3, "A K'ell Hunter's blade", D(`
    <path d="M-62 -9 Q20 -12 70 -22 Q84 -26 95 -33 Q84 -18 70 -11 Q20 7 -62 9 Z" fill="url(#@kb)" ~/>
    ${ln('M-60 -8.2 Q20 -11.2 70 -21.2 Q84 -25.4 93 -32', '#e2dace', 1, .7)}
    ${ln('M-56 -2 Q10 -4 60 -12 Q78 -17 88 -25', '#141210', 1.4, .55)}${ln('M-56 3 Q10 2 60 -6', '#9a948a', .7, .35)}
    ${[-46, -34, -22, -10, 2].map(x => ln(`M${x} -8 q2 4 0 8`, '#1e1a16', .8, .45)).join('')}
    <path d="M-62 -9 L-67 -12 L-71 -6 L-77 -9 L-75 -2 L-81 2 L-74 5 L-77 11 L-67 8.5 L-62 9 Z" fill="#4e3a2c" ~/>
    <ellipse cx="-70" cy="0" rx="3.2" ry="5.2" fill="#d8ccb0" ~/><path d="M-73 -3 L-76 -6 L-72 -1 Z M-72 3 L-76 5 L-71 4.4 Z" fill="#e8dcc4"/>
    <path d="M-40 4 Q-30 8 -18 6 Q-28 4 -40 4 Z" fill="#2a0e0a" opacity=".5"/>`, .95, 100, 82), [100, 132, 64, 6]);

  /* ======================= Book Five: harbour slate ======================= */

  /* a Letherii issue sword: straight, plain, wire-bound grip, the regiment's number in the ricasso, an inventory tag on the guard */
  { const [tx, ty] = W(-13.5, 13);
    card('b5_c1_issuesword', 5, 'A Letherii issue sword', D(`
    <path d="M-12 -6 L74 -5.5 L93 0 L74 5.5 L-12 6 Z" fill="url(#@st)" ~/>
    ${ln('M4 0 L64 0', '#4a525a', 2.4)}${ln('M4 -1.4 L64 -1.4', '#eef3f6', .6, .5)}
    ${ln('M-12 -5.2 L74 -4.8 L91.6 0', '#f6fafc', .9, .8)}${ln('M-12 5.3 L74 4.9', '#3a4048', .8, .6)}
    ${ln('M-9 -2.6 L-6 2.6 M-6 -2.6 L-9 2.6 M-3.5 -2.6 L-3.5 2.6 M-1 -2.6 L-1 2.6', '#262a30', .9, .85)}
    <rect x="-16" y="-14" width="5" height="28" rx="1.5" fill="url(#@ir)" ~/>${ln('M-15 -13 L-15 13', '#dfe6ec', .7, .5)}
    ${steelGrip(-46, -16, 4.4)}
    <ellipse cx="-50" cy="0" rx="5" ry="7" fill="url(#@ir)" ~/><ellipse cx="-51.4" cy="-2.4" rx="1.6" ry="2" fill="#e0e6ec" opacity=".5"/>`),
    [100, 130, 62, 6]);
    ART['item/b5_c1_issuesword'] = ART['item/b5_c1_issuesword'].replace('</svg>', `<path d="M${tx} ${ty} Q${tx - 2} ${ty + 7} ${tx + 3} ${ty + 13}" fill="none" stroke="#c8b48a" stroke-width="1"/>`
      + `<g transform="translate(${tx + 3} ${ty + 13}) rotate(10)"><path d="M0 0 L22 0 L22 13 L0 13 L-4 6.5 Z" fill="url(#b5_c1_issuesword-pp)" ${OL}/><circle cx="-.6" cy="6.5" r="1.2" fill="#3a3a36"/>`
      + `<path d="M4 4 l3 -1.6 l2 3 l3 -2.6 M4 9 h3 M9 9 q2 -3 4 0 t4 0" fill="none" stroke="#3a3028" stroke-width=".8"/></g></svg>`).replace('<defs>', '<defs>' + lin('pp', MAT.pp).replace(/@/g, 'b5_c1_issuesword-')); }

  /* a Tarthenal war-club: black root-wood, the head studded with clinched iron nails, the grip plaited hide */
  { const nails = [[38, -6], [48, -10], [58, -13], [70, -13], [82, -11], [44, 4], [56, 7], [68, 9], [80, 7], [62, -2], [76, -1], [88, -3], [50, -2]];
    let plait = ''; for (let x = -85; x < -55; x += 4) plait += ln(`M${x} -5.6 L${x + 3} 0 L${x} 5.6`, '#2a1a0c', 1, .8) + ln(`M${x + 1.2} -5 L${x + 3.8} 0`, '#c8946a', .6, .45);
    card('b5_c1_tarthclub', 5, 'A Tarthenal war-club', D(`
    <path d="M-88 -5 Q-60 -5.5 -30 -7 Q10 -10 40 -14 Q60 -17 74 -19 Q90 -19 94 -6 Q97 5 90 15 Q80 19 66 17 Q40 13 10 9 Q-30 6 -60 5.5 Q-84 5.5 -88 5 Q-92 0 -88 -5 Z" fill="url(#@dw)" ~/>
    <circle cx="20" cy="-9.5" r="4" fill="url(#@dw)"/><circle cx="54" cy="14" r="4" fill="url(#@dw)"/>
    ${ln('M-50 -2 Q0 -4 40 -8 Q60 -10 80 -8 M-40 2 Q0 3 30 6 Q50 10 70 10', '#6a5442', .8, .5)}${ln('M-30 -6 Q20 -9.6 60 -15.4 Q80 -18 90 -12', '#8a7460', 1, .45)}
    ${nails.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.8" fill="#6a3418" opacity=".35"/><circle cx="${x}" cy="${y}" r="2.6" fill="#5a524c" ~/><circle cx="${x - .8}" cy="${y - .8}" r=".9" fill="#d0c8c0" opacity=".8"/>`).join('')}
    ${ln('M66 -17.6 L67 -22 L71 -23', '#0b0806', 3, .6)}${ln('M66 -17.6 L67 -22 L71 -23', '#5a524c', 1.6)}${ln('M86 16 L88 20 L92 20', '#0b0806', 3, .6)}${ln('M86 16 L88 20 L92 20', '#5a524c', 1.6)}
    <rect x="-87" y="-6.4" width="33" height="12.8" rx="2.4" fill="url(#@lt)" ~/>${plait}${ln('M-84 -4.6 L-58 -4.6', '#d8a878', 1, .35)}`, .96, 100, 74), [100, 130, 62, 6]); }

  /* a rope-man's hook-knife: a short blade with a back-turned hook, a cord-wrapped grip, the court's brass tag on the pommel */
  { let wrap = ''; for (let x = -56; x < -13; x += 2.6) wrap += ln(`M${r1(x)} -5.6 L${r1(x + .6)} 5.6`, '#4a3e2a', 1, .9);
    card('b5_c1_hookknife', 5, "A rope-man's hook-knife", `<g transform="translate(104 76) rotate(-24) scale(1.22)">
    <path d="M-8 -6 L36 -6 Q58 -6 66 2 Q72 10 66 18 Q62 22 55 20 Q60 14 56 10 Q52 6.4 44 6 L-8 6 Z" fill="url(#@st)" ~/>
    ${ln('M-8 -5.2 L36 -5.2 Q56 -5.2 64 2', '#f6fafc', .9, .8)}${ln('M56.5 19 Q61 14 57 9.6 Q52 6.6 44 6.6', '#e4eaee', .9, .75)}
    ${ln('M0 -1 L34 -1', '#5a626a', 1.2, .45)}
    <rect x="-12" y="-7" width="5" height="14" rx="1" fill="url(#@br)" ~/>
    <rect x="-58" y="-6" width="46" height="12" rx="3" fill="#9a8a62" ~/>${wrap}${ln('M-56 -4.4 L-14 -4.4', '#e8dcb8', .9, .4)}
    <rect x="-62" y="-6.4" width="5" height="12.8" rx="2" fill="url(#@br)" ~/>
    <circle cx="-66" cy="0" r="3.6" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="2.8"/><circle cx="-66" cy="0" r="3.6" fill="none" stroke="#a8823e" stroke-width="1.6"/>
    <g transform="translate(-66 3.4) rotate(24)"><rect x="-5.6" y="0" width="11.2" height="15" rx="2" fill="url(#@br)" ~/><circle cx="0" cy="3" r="1.3" fill="#1a1208"/>
    ${ln('M-3 7 L3 7 M-3 10 L1.6 10', '#4a3616', .8, .8)}${ln('M-4.6 1 L-4.6 13', '#f6dca4', .7, .5)}</g></g>`, [104, 122, 62, 6]); }

  /* a wager-chit from the Low Walk: pale wood, a rope and a wave burned in, a chalk number on the back */
  card('b5_c1_chit', 5, 'A wager-chit from the Low Walk', `<g transform="rotate(-10 100 75)">
    <rect x="48" y="51" width="112" height="58" rx="6" fill="#6a4e2c" ~/>
    <rect x="44" y="46" width="112" height="58" rx="6" fill="url(#@pw)" ~/>
    ${ln('M50 58 Q90 55 150 59 M50 74 Q100 77 150 72 M54 94 Q100 91 150 96', '#a8885a', .7, .55)}
    <rect x="50" y="52" width="100" height="46" rx="4" fill="none" stroke="#6a4a26" stroke-opacity=".4"/>
    ${ln('M58 66 Q100 58 142 66', '#6a3a18', 6, .3)}${ln('M58 66 Q100 58 142 66', '#3a1e0c', 3.2, .9, 'stroke-dasharray="3 1.4"')}
    ${ln('M58 86 Q68 76 78 86 T98 86 T118 86 T138 86', '#6a3a18', 5.4, .3)}${ln('M58 86 Q68 76 78 86 T98 86 T118 86 T138 86', '#3a1e0c', 2.6, .9)}
    ${ln('M46 48 L154 48', '#fff6e0', 1.2, .5)}${ln('M120 107.6 q10 1.4 22 -1', '#ecece4', 2, .5)}
    <rect x="44" y="46" width="112" height="58" rx="6" fill="url(#@lo)"/></g>`, [104, 120, 60, 5]);

  /* the fines court's receipt: a folded square of heavy paper, a blob of grey wax, the court's cord through it */
  card('b5_c1_receipt', 5, "The fines court's receipt", `
    ${cord('M26 122 Q60 106 97 96', '#6a5a3a', 2)}
    <path d="M52 40 L146 34 L154 112 L58 118 Z" fill="url(#@pp)" ~/>
    <path d="M100 37 L106 115 L58 118 L55 79 Z" fill="#000" opacity=".05"/>
    ${ln('M100 37 L106 115', '#8a7a58', 1, .6)}${ln('M101.2 37 L107.2 115', '#fffaf0', .8, .6)}${ln('M55 79 L150 73', '#8a7a58', 1, .6)}${ln('M55 80.2 L150 74.2', '#fffaf0', .8, .6)}
    ${ln('M60 48 q4 -2 8 0 t8 0 t8 0 M60 55 q4 -2 8 0 t8 0 t8 0 t8 0 M60 62 q4 -2 8 0 t8 0 M112 48 q4 -2 8 0 t8 0 t8 0 M112 56 q4 -2 8 0 t8 0', '#4a4238', .9, .55)}
    ${ln('M114 64 q2 -4 4 0 q2 4 4 0 M126 60 q2 -2 4 0 q-2 4 0 6 M134 60 a2.6 3 0 1 0 .1 0', '#3a3028', 1, .7)}
    <ellipse cx="128" cy="98" rx="14" ry="8" fill="#8a6a3a" opacity=".16"/>
    ${cord('M107 96 Q140 104 174 128', '#6a5a3a', 2)}
    <path d="M92 90 Q94 82 103 83 Q112 82 113 90 Q115 99 106 101 Q99 104 94 99 Q89 96 92 90 Z" fill="url(#@wx)" ~/>
    <circle cx="102.6" cy="92" r="5.6" fill="none" stroke="#3a3c3c" stroke-opacity=".55"/>${ln('M100 90 L105 94 M105 90 L100 94', '#3a3c3c', .8, .5)}${ln('M95 87 Q99 84 103 84.4', '#e4e6e6', 1, .6)}
    <path d="M52 40 L146 34 L154 112 L58 118 Z" fill="url(#@lo)"/>`, [106, 126, 54, 5]);

  /* the weight-sack: an empty canvas sack, wet-dark, its mouth cord knotted, an iron ring for the rope */
  { const sack = 'M42 98 Q38 74 60 66 Q80 60 104 64 Q132 60 152 70 Q170 80 164 100 Q158 116 126 118 Q90 122 62 116 Q42 112 42 98 Z';
    card('b5_c1_weightbag', 5, 'The weight-sack', `
    <path d="${sack}" fill="url(#@cv)" ~/><path d="${sack}" fill="url(#@wv)"/>
    <ellipse cx="120" cy="96" rx="26" ry="12" fill="#14130f" opacity=".35"/><ellipse cx="74" cy="104" rx="16" ry="7" fill="#14130f" opacity=".3"/>
    ${ln('M66 76 Q90 84 118 76 Q140 72 156 82', '#1e1c16', 1.6, .6)}${ln('M64 74 Q90 82 118 74', '#b8b0a0', 1, .3)}${ln('M84 92 Q100 100 128 106', '#1e1c16', 1.4, .5)}${ln('M60 68 Q80 62 104 66', '#c8c0b0', 1.2, .4)}
    <path d="M60 66 Q50 54 41 47 L50 40 Q62 50 72 62 Z" fill="url(#@cv)" ~/>${ln('M50 52 L58 60 M47 49 L55 57', '#1e1c16', 1, .6)}
    <path d="M46 52 L56 44" stroke="#0b0806" stroke-opacity=".6" stroke-width="7.4"/><path d="M46 52 L56 44" stroke="#5a4a32" stroke-width="5.6" stroke-dasharray="1.4 1.4"/>
    ${cord('M50 50 Q44 58 46 66 M52 50 Q58 56 56 64', '#5a4a32', 1.4)}
    <circle cx="40" cy="38" r="8" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="4.6"/><circle cx="40" cy="38" r="8" fill="none" stroke="#5e6268" stroke-width="3"/>${ln('M33.6 34 Q36 30.4 40.6 30', '#d0d6dc', 1, .7)}
    <path d="${sack}" fill="url(#@lo)"/>`, [106, 122, 66, 6]); }

  /* a poacher's sealskin coat: short, grey, oiled, bone toggles */
  { const coat = 'M74 24 Q100 32 126 24 L150 34 Q164 42 170 66 L172 98 L156 100 L152 74 L150 118 Q100 126 50 118 L48 74 L44 100 L28 98 L30 66 Q36 42 50 34 Z';
    const spots = [[66, 54, 5, 3], [84, 96, 6, 3.5], [126, 60, 5, 3], [136, 98, 6, 3.4], [40, 80, 4, 2.6], [160, 82, 4, 2.6], [110, 108, 5, 3], [60, 108, 4.6, 3]];
    card('b5_c2_sealcoat', 5, "A poacher's sealskin coat", `
    <path d="${coat}" fill="url(#@sk)" ~/>
    ${spots.map(([x, y, a, b]) => `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="#2a2e30" opacity=".35"/>`).join('')}
    <path d="M56 40 L60 116 L50 117 L48 74 Z" fill="#1a1c1e" opacity=".25"/><path d="M140 40 L136 116 L148 117 L150 70 Z" fill="#1a1c1e" opacity=".3"/>
    ${ln('M40 50 Q52 38 70 34', '#e6edf0', 2, .35)}${ln('M78 44 Q74 76 78 110', '#e6edf0', 1.6, .2)}${ln('M36 60 Q34 76 34 92', '#e6edf0', 1.4, .22)}
    <path d="M74 24 Q100 32 126 24 L120 40 Q100 34 80 40 Z" fill="#6a7072" ~/>
    ${ln('M100 33 L101 121', '#121416', 1.6, .9)}${ln('M102 33 L103 121', '#a8b0b4', .7, .4)}
    ${[50, 68, 86, 104].map(y => cord(`M100 ${y} Q109 ${y - 3} 113 ${y}`, '#3a2a1c', 1.2) + `<rect x="91" y="${y - 2.2}" width="14" height="4.4" rx="2.2" fill="url(#@bn)" ~/>`).join('')}
    <path d="M52 112 Q100 120 148 112 L150 118 Q100 126 50 118 Z" fill="#1e2022" opacity=".5"/>
    <path d="${coat}" fill="url(#@lo)"/>`, [100, 132, 60, 5]); }

  /* a tooth nobody can name: long, curved, yellowed, bound at the root with copper wire */
  { let wire = ''; [1.2, 2.2, 3.2, 4.2].forEach(k => { const cx = 61 + k * 5 * .35, cy = 111 - k * 5 * .94, d = `M${r1(cx - 28 * .94)} ${r1(cy - 28 * .35)} L${r1(cx + 28 * .94)} ${r1(cy + 28 * .35)}`;
      wire += ln(d, '#0b0806', 3.8, .6) + ln(d, '#b8683a', 2.4) + ln(d, '#f6b088', .8, .7, 'transform="translate(-.4 -.6)"'); });
    const tooth = 'M40 104 Q62 46 158 26 Q106 54 82 118 Q60 122 40 104 Z';
    card('b5_c2_tooth', 5, 'A tooth nobody can name', `
    <defs><clipPath id="@cp"><path d="${tooth}"/></clipPath></defs>
    <path d="${tooth}" fill="url(#@yt)" ~/>
    <g clip-path="url(#@cp)"><path d="M20 100 L100 130 L100 150 L20 150 Z" fill="#6a5232" opacity=".45" transform="rotate(0)"/><path d="M30 78 L110 108 L110 150 L30 150 Z" fill="#6a5232" opacity=".3"/>${wire}</g>
    ${ln('M50 88 Q76 46 150 28.4', '#fffae8', 1.4, .65)}${ln('M84 108 Q100 66 150 32', '#5a4626', 1, .4)}
    ${ln('M96 62 l6 3 l2 5 M118 46 l4 3', '#5a4626', .7, .55)}
    <path d="${tooth}" fill="none" ~/>
    <circle cx="58" cy="122" r="6" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="3.6"/><circle cx="58" cy="122" r="6" fill="none" stroke="#b8683a" stroke-width="2.2"/>`, [100, 130, 56, 5]); }

  /* a harbour gaff: a long ash pole, an iron hook and a spike, for dragging wreckage and the drowned out of the harbour */
  { const hook = 'M63 -3 Q68 -22 56 -28 Q47 -31 41 -24';
    card('b5_c2_gaff', 5, 'A harbour gaff', D(`
    <rect x="-94" y="-2.8" width="152" height="5.6" rx="2.2" fill="url(#@wd)" ~/><rect x="24" y="-2.8" width="32" height="5.6" fill="#1e140c" opacity=".35"/>
    ${ln('M-84 -.8 L-20 -.6 M-50 1.2 L10 1', '#6a4e2e', .7, .6)}${ln('M-90 -1.8 L54 -1.8', '#f0dcb0', .8, .45)}
    ${ln(hook, '#0b0806', 6.6, .6)}${ln(hook, '#5e6268', 4.4)}${ln(hook, '#c4cad0', 1, .7, 'transform="translate(-.6 -1)"')}
    <path d="M38.6 -27 L41 -24 L44.6 -26.6 Z" fill="#5e6268" ~/>
    <circle cx="60" cy="-16" r="1.6" fill="#7a4a2a" opacity=".7"/><circle cx="50" cy="-28" r="1.4" fill="#7a4a2a" opacity=".6"/>
    <path d="M52 -4 L68 -3.2 L68 3.2 L52 4 Z" fill="url(#@rs)" ~/><circle cx="56" cy="0" r="1" fill="#1a1210"/><circle cx="63" cy="0" r="1" fill="#1a1210"/>
    <path d="M68 -2.6 L97 0 L68 2.6 Z" fill="url(#@ir)" ~/>${ln('M69 -1.8 L95 -.2', '#e6ecf0', .7, .7)}`, 1, 100, 76), [100, 132, 64, 6]); }

  /* a cord of Shake burial shells: small white shells on a knotted cord, one of them black */
  { const P0 = [14, 18], P1 = [100, 138], P2 = [186, 18]; let shells = '', knots = '';
    [.22, .3, .38, .46, .54, .62, .7, .78].forEach((t, i) => { const [x, y] = q(P0, P1, P2, t), blk = i === 5, cx = r1(x), cy = r1(y + 10);
      shells += ln(`M${cx} ${r1(y)} L${cx} ${cy - 7}`, '#6a5a40', 1, .9) + `<ellipse cx="${cx}" cy="${cy}" rx="5.6" ry="7.6" fill="url(#@${blk ? 'sb' : 'sw'})" ~/>`
        + ln(`M${cx} ${cy - 5} Q${cx + 1.2} ${cy} ${cx} ${cy + 5}`, blk ? '#c8c4bc' : '#5a5248', 1.2, .9) + ln(`M${cx - 2.6} ${cy - 4} Q${cx - 3.6} ${cy - 1} ${cx - 3} ${cy + 1}`, '#fff', .9, blk ? .35 : .7); });
    [.18, .26, .34, .42, .5, .58, .66, .74, .82].forEach(t => { const [x, y] = q(P0, P1, P2, t); knots += `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="2.6" ry="2" fill="#5a4a32" ~/>`; });
    card('b5_c2_shells', 5, 'A cord of Shake burial shells', `${cord('M14 18 Q100 138 186 18', '#6a5a40', 1.8)}${knots}${shells}`, [100, 120, 50, 4]); }

  /* a cadre's spare tile: black stone, polished, blank, a hairline crack across one corner */
  card('b5_c3_cadretile', 5, "A cadre's spare tile", `
    <path d="M44 66 L82 104 L82 114 L44 76 Z" fill="#121418" ~/><path d="M82 104 L160 78 L160 88 L82 114 Z" fill="#08090a" ~/>
    <path d="M44 66 L122 42 L160 78 L82 104 Z" fill="url(#@bs)" ~/>
    <path d="M58 62 L110 46 L120 54 L68 70 Z" fill="#c8d4e0" opacity=".13"/>
    ${ln('M45 65.4 L122 42', '#9aa8b8', 1, .65)}${ln('M45 66.6 L82 103.4', '#5a6878', .8, .5)}
    ${ln('M140 58 L145.6 66 L143.6 72 L151 78.6', '#a8b8c8', .7, .75)}`, [106, 114, 64, 7]);

  /* a Faraed throwing-spear: fire-hardened wood, a leaf iron head, a tuft of feathers of a bird only the Faraed can name */
  { const [kx, ky] = W(50, 0, 1, 100, 72);
    card('b5_c3_spear', 5, 'A Faraed throwing-spear', D(`
    <rect x="-92" y="-2.2" width="146" height="4.4" rx="2" fill="url(#@fh)" ~/>
    ${[[-70, 0], [-44, .4], [-10, -.4], [20, .2]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="2" fill="#140c06" opacity=".5"/>`).join('')}
    ${ln('M-88 -1.4 L50 -1.4', '#d8b088', .7, .4)}
    <path d="M50 -3 L62 -2.4 L62 2.4 L50 3 Z" fill="#3a2a1a" ~/>${ln('M52 -3 L53 3 M55 -3 L56 3 M58 -2.6 L59 2.6', '#c8b48a', .7, .8)}
    <path d="M60 0 Q66 -8 78 -7 Q88 -4 95 0 Q88 4 78 7 Q66 8 60 0 Z" fill="url(#@ir)" ~/>${ln('M62 0 L93 0', '#26282c', .9)}${ln('M63 -3 Q68 -7 78 -6.4 Q88 -3.6 93.6 -.4', '#e6ecf0', .8, .75)}`), [100, 130, 62, 6]);
    ART['item/b5_c3_spear'] = ART['item/b5_c3_spear'].replace('</svg>', [
      [`M${kx - 1} ${ky} Q${kx - 11} ${ky + 14} ${kx - 11} ${ky + 32} Q${kx - 5} ${ky + 16} ${kx + 1} ${ky + 2} Z`, '#2e6a64'],
      [`M${kx} ${ky + 1} Q${kx - 1} ${ky + 18} ${kx + 3} ${ky + 36} Q${kx + 5} ${ky + 18} ${kx + 3} ${ky + 1} Z`, '#3e7a72'],
      [`M${kx + 2} ${ky} Q${kx + 12} ${ky + 12} ${kx + 16} ${ky + 28} Q${kx + 10} ${ky + 12} ${kx + 4} ${ky} Z`, '#1e3a3a']].map(([d, c]) => `<path d="${d}" fill="${c}" ${OL}/>`).join('')
      + `<path d="M${kx - 10} ${ky + 26} l3 -2 M${kx + 2} ${ky + 30} l3 0 M${kx + 13} ${ky + 22} l3 -1" stroke="#a0522a" stroke-width="2.4"/>`
      + `<path d="M${kx} ${ky + 2} L${kx + 2} ${ky + 34}" fill="none" stroke="#d8e4e0" stroke-width=".6" stroke-opacity=".6"/><ellipse cx="${kx + 1}" cy="${ky + 1}" rx="3.6" ry="2.8" fill="#c8b48a" ${OL}/></svg>`); }

  /* green ash in a paper twist: grey ash, still faintly green at the open end */
  card('b5_c3_ash', 5, 'Green ash in a paper twist', `
    <ellipse cx="142" cy="78" rx="20" ry="28" fill="#6ac088" opacity=".12" filter="url(#@gf)"/>
    <path d="M62 75 Q50 69 40 73 Q46 79 36 86 Q50 86 62 85 Z" fill="url(#@kp)" ~/>${ln('M42 74 L52 84 M48 72 L56 84', '#3a2a14', .9, .6)}
    <path d="M60 76 L134 52 Q148 70 136 102 L60 85 Z" fill="url(#@kp)" ~/>
    ${ln('M70 77 L132 58 M74 81 L136 90 M96 70 L104 92', '#3a2a14', .9, .5)}${ln('M64 76 L130 54', '#e8c898', 1, .5)}
    <ellipse cx="137" cy="77" rx="8.6" ry="25" fill="#2a1e10" ~/>
    <ellipse cx="138.4" cy="79" rx="6.6" ry="19" fill="#8a8c88"/><ellipse cx="138.4" cy="79" rx="6.6" ry="19" fill="none" stroke="#7ac08e" stroke-width="2" stroke-opacity=".55"/>
    <circle cx="137" cy="72" r="1" fill="#c8cac4"/><circle cx="140" cy="84" r=".9" fill="#5a5c58"/>
    <path d="M138 106 Q144 100 150 101 Q156 97 162 101 Q170 103 175 107 Q156 111 138 106 Z" fill="#7a7c78" ~/><circle cx="152" cy="103" r="1" fill="#8ac898" opacity=".8"/><circle cx="160" cy="104" r=".8" fill="#c8cac4"/>`, [104, 110, 58, 5]);

  /* a Grass Jacket's helm: open iron, faded green cloth at the crest, dented once over the left ear */
  { const dome = 'M48 96 Q46 40 100 34 Q154 40 152 96 Z';
    card('b5_c4_helm', 5, "A Grass Jacket's helm", `
    <path d="M46 102 Q100 114 154 102 Q100 122 46 102 Z" fill="#050607"/>
    <path d="${dome}" fill="url(#@ir)" ~/>${ln('M62 54 Q96 32 136 44', '#f0f4f6', 1.6, .55)}${ln('M60 60 Q56 76 58 92', '#dfe6ec', 1.2, .35)}
    <path d="M132 62 Q143 70 139 84 Q135 74 132 62 Z" fill="#141618" opacity=".7"/>${ln('M131.4 62 Q127.6 72 132 84', '#d8dee4', 1, .55)}
    ${ln('M78 70 l10 -3 M110 80 l8 4', '#2a2c30', .7, .5)}
    <path d="M46 92 Q100 104 154 92 L154 102 Q100 114 46 102 Z" fill="url(#@ir)" ~/>${ln('M47 93 Q100 105 153 93', '#e4eaee', .9, .6)}
    ${[56, 72, 88, 104, 120, 136].map(x => `<circle cx="${x}" cy="${r1(99 + 5 * Math.sin(Math.PI * (x - 46) / 108))}" r="1.6" fill="#a8aeb4" ~/>`).join('')}
    <path d="${dome}" fill="url(#@lo)"/>
    <circle cx="104" cy="35" r="3.6" fill="url(#@ir)" ~/>
    <path d="M106 38 Q122 50 128 66 Q120 62 112 57 Q108 48 104 40 Z" fill="#56683e" ~/>
    <path d="M104 33 Q130 25 150 31 Q160 35 170 29 Q164 41 150 41 Q128 39 106 39 Z" fill="#6e8058" ~/>${ln('M110 35 Q130 31 150 36', '#3e4e2c', 1, .6)}${ln('M108 34 Q128 28 148 31', '#a8b890', .9, .5)}
    <ellipse cx="105" cy="37" rx="4.6" ry="3.6" fill="#5e7048" ~/>`, [100, 122, 60, 6]); }

  /* a tooth too big for a wolf: a canine as long as a finger, yellowed, on a thong */
  card('b5_c4_wolftooth', 5, 'A tooth too big for a wolf', `
    ${cord('M18 14 Q60 50 96 56', '#3a2818', 2)}${cord('M104 56 Q140 50 182 14', '#3a2818', 2)}
    <path d="M88 54 Q85 76 91 100 Q97 122 104 130 Q108 104 112 88 Q116 70 112 54 Z" fill="url(#@yt)" ~/>
    <path d="M88 54 L112 54 Q114 64 113 74 Q100 78 88 72 Z" fill="#6a5232" opacity=".5"/>
    ${ln('M92 74 Q94 100 102 122', '#fffae8', 1.3, .6)}${ln('M108 80 Q106 100 104 120', '#5a4626', .9, .4)}${ln('M98 92 l3 4', '#5a4626', .6, .5)}
    ${[57, 61, 65].map(y => ln(`M86.6 ${y} Q100 ${y + 3} 113.4 ${y}`, '#0b0806', 3.2, .6) + ln(`M86.6 ${y} Q100 ${y + 3} 113.4 ${y}`, '#4a3222', 2)).join('')}
    <ellipse cx="100" cy="54" rx="6" ry="3.4" fill="#4a3222" ~/>`, [106, 136, 18, 3]);

  /* a brand-pot from the west rampart: black-glazed clay, sealed with pitch, a tarred rag wick, scorched down one side */
  { const pot = 'M58 74 Q54 54 76 48 L80 40 L120 40 L124 48 Q146 54 142 74 Q146 104 124 118 Q100 126 76 118 Q54 104 58 74 Z';
    card('b5_c4_pitchpot', 5, 'A brand-pot from the west rampart', `
    <path d="${pot}" fill="url(#@gz)" ~/>
    <path d="M130 54 Q142 74 133 106 Q126 92 124 74 Q124 60 130 54 Z" fill="#6a3a18" opacity=".55"/>${ln('M132 62 Q136 80 131 98', '#9a6a3a', 1.6, .35)}
    <ellipse cx="76" cy="70" rx="9" ry="17" fill="#fff" opacity=".14" transform="rotate(-18 76 70)"/><circle cx="73" cy="62" r="2.4" fill="#fff" opacity=".55"/>
    ${ln('M78 112 Q100 120 122 112', '#5a5c62', 1, .35)}
    <ellipse cx="100" cy="41" rx="21" ry="5" fill="#1a1a1c" ~/>
    <path d="M78 40 Q80 30 100 30 Q120 30 122 40 Q122 46 116 46 Q114 55 110 46 Q100 48 92 46 Q88 53 86 46 Q78 46 78 40 Z" fill="#120e0a" ~/>${ln('M84 36 Q96 31.6 110 33', '#6a5a4a', 1, .5)}
    <path d="M97 33 Q93 20 100 9 Q107 15 104 22 Q111 24 106 33 Z" fill="#2e2418" ~/>${ln('M100 10 l-3 -3 M103 12 l3 -4 M98 18 q4 2 6 0', '#4a3a28', .8, .8)}${ln('M98 26 q3 -6 2 -12', '#8a7a68', .7, .4)}
    <path d="${pot}" fill="url(#@lo)"/>`, [102, 124, 50, 6]); }

  /* a cache shortsword, still in grease: a Letherii issue shortsword in greased cloth, the cache's clay seal on the cord */
  { const [kx, ky] = W(24, 9, 1, 100, 74);
    let wraps = ''; for (let x = -20; x < 58; x += 8.5) wraps += ln(`M${x} -8 L${x + 6} 8`, '#5a4a2e', 1.2, .7) + ln(`M${x + 1.4} -8 L${x + 7.4} 8`, '#f0e2b4', .7, .35);
    card('b5_c5_cacheblade', 5, 'A cache shortsword, still in grease', D(`
    <path d="M-20 -6 L70 -6 L92 0 L70 6 L-20 6 Z" fill="url(#@st)" ~/>${ln('M60 -5.3 L70 -5.3 L90.6 -.4', '#f8fbfc', .9, .9)}${ln('M60 0 L80 0', '#4a525a', 1.2, .5)}
    <path d="M-22 -8 L58 -8 Q64 -6 66 0 Q64 6 58 8 L-22 8 Z" fill="url(#@gc)" ~/>${wraps}
    ${ln('M-18 -6.4 L60 -6.4', '#fff6d0', 2.4, .25)}${ln('M56 -7.6 Q63 -5 64 0', '#1e1a10', .8, .5)}
    ${ln('M20 -9 L23 9 M24 -9 L27 9', '#0b0806', 3, .6)}${ln('M20 -9 L23 9 M24 -9 L27 9', '#6a5634', 1.6)}
    <rect x="-27" y="-12" width="5" height="24" rx="1.4" fill="url(#@ir)" ~/>
    ${steelGrip(-56, -27, 4.2)}<ellipse cx="-60" cy="0" rx="4.6" ry="6.4" fill="url(#@ir)" ~/>`, 1, 100, 74), [100, 130, 60, 6]);
    ART['item/b5_c5_cacheblade'] = ART['item/b5_c5_cacheblade'].replace('</svg>', `<path d="M${kx} ${ky} Q${kx + 4} ${ky + 8} ${kx + 4} ${ky + 15}" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="3"/><path d="M${kx} ${ky} Q${kx + 4} ${ky + 8} ${kx + 4} ${ky + 15}" fill="none" stroke="#6a5634" stroke-width="1.6"/>`
      + `<circle cx="${kx + 4}" cy="${ky + 21}" r="7" fill="url(#b5_c5_cacheblade-cy)" ${OL}/><circle cx="${kx + 4}" cy="${ky + 21}" r="4" fill="none" stroke="#44200f" stroke-opacity=".6"/><path d="M${kx + 2} ${ky + 19} l4 4 M${kx + 6} ${ky + 19} l-4 4" stroke="#44200f" stroke-opacity=".6" stroke-width=".8"/><path d="M${kx} ${ky + 17} q2 -2 5 -2" fill="none" stroke="#f0b088" stroke-opacity=".6"/></svg>`)
      .replace('<defs>', '<defs>' + lin('cy', MAT.cy).replace(/@/g, 'b5_c5_cacheblade-')); }

  /* a cache bow, unstrung: plain yew, a gentle single curve, lashed to a bark tube with its waxed string coiled inside; the seal on the lashing */
  { const [kx, ky] = W(24, 17, 1, 100, 76);
    const lash = x => ln(`M${x} -10 L${x + 2} 17 M${x + 3} -10 L${x + 5} 17`, '#0b0806', 3, .6) + ln(`M${x} -10 L${x + 2} 17 M${x + 3} -10 L${x + 5} 17`, '#6a5434', 1.6) + ln(`M${x} -10 L${x + .6} -2`, '#d8c49a', .6, .6);
    card('b5_c5_cachebow', 5, 'A cache bow, unstrung', D(`
    <rect x="-36" y="2" width="72" height="14" rx="6" fill="url(#@bb)" ~/>
    ${ln('M-30 6 h6 M-14 5 h4 M2 7 h7 M18 5.4 h5 M-24 12 h5 M-4 13 h6 M14 11.4 h4 M26 12.6 h4', '#3a342a', 1, .7)}${ln('M-34 4 L32 4', '#fffaf0', 1, .5)}
    <ellipse cx="36" cy="9" rx="3.2" ry="7" fill="#1a1610" ~/>
    ${ln('M36 6 q8 -2 10 4 q2 6 -6 6 q-8 0 -6 -6 q2 -5 10 -3 M44 13 Q52 18 60 13', '#0b0806', 2.6, .6)}${ln('M36 6 q8 -2 10 4 q2 6 -6 6 q-8 0 -6 -6 q2 -5 10 -3 M44 13 Q52 18 60 13', '#e6d8a0', 1.3)}
    <path d="M-90 -1 Q0 -16 90 -1 L90 2 Q0 -6 -90 2 Z" fill="url(#@yw)" ~/>
    <path d="M-88 -1 Q0 -15.6 88 -1 L88 -.2 Q0 -12.2 -88 -.2 Z" fill="#e8cc96"/>${ln('M-60 -3.4 Q0 -10.4 60 -3.4', '#6a3010', .7, .5)}
    ${ln('M-87 -1.6 L-87 1.6 M87 -1.6 L87 1.6', '#2a1408', 1.2, .9)}
    ${lash(-22)}${lash(22)}`, 1, 100, 76), [100, 128, 64, 6]);
    ART['item/b5_c5_cachebow'] = ART['item/b5_c5_cachebow'].replace('</svg>', `<path d="M${kx} ${ky} Q${kx + 3} ${ky + 8} ${kx + 2} ${ky + 14}" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="3"/><path d="M${kx} ${ky} Q${kx + 3} ${ky + 8} ${kx + 2} ${ky + 14}" fill="none" stroke="#6a5434" stroke-width="1.6"/>`
      + `<circle cx="${kx + 2}" cy="${ky + 20}" r="7" fill="url(#b5_c5_cachebow-cy)" ${OL}/><circle cx="${kx + 2}" cy="${ky + 20}" r="4" fill="none" stroke="#44200f" stroke-opacity=".6"/><path d="M${kx} ${ky + 18} l4 4 M${kx + 4} ${ky + 18} l-4 4" stroke="#44200f" stroke-opacity=".6" stroke-width=".8"/><path d="M${kx - 2} ${ky + 16} q2 -2 5 -2" fill="none" stroke="#f0b088" stroke-opacity=".6"/></svg>`)
      .replace('<defs>', '<defs>' + lin('cy', MAT.cy).replace(/@/g, 'b5_c5_cachebow-')); }

  /* the house's scale: bright new scale on a padded coat, a small scale-balance stamped inside the collar */
  { const coat = 'M72 26 Q100 34 128 26 L156 36 L166 70 L148 76 L142 58 L142 120 Q100 128 58 120 L58 58 L52 76 L34 70 L44 36 Z';
    let quilt = ''; for (let x = 62; x < 140; x += 6) quilt += ln(`M${x} ${r1(117 + 4 * Math.sin(Math.PI * (x - 58) / 84))} l0 6`, '#2e2618', .7, .7);
    card('b5_c5_housemail', 5, "The house's scale", `
    <path d="${coat}" fill="url(#@nb)" ~/><path d="${coat}" fill="url(#@sc)"/>
    <path d="M62 44 Q60 84 62 118 L72 120 Q70 84 72 44 Z" fill="#1a2026" opacity=".28"/><path d="M128 44 Q132 84 132 120 L124 121 Q124 84 120 44 Z" fill="#1a2026" opacity=".26"/>
    ${ln('M46 40 L70 30', '#fff', 1.6, .6)}${ln('M84 46 Q82 80 86 112', '#fff', 2, .18)}
    <path d="M58 114 Q100 122 142 114 L142 122 Q100 130 58 122 Z" fill="url(#@pc)" ~/>${quilt}
    <path d="M34 70 L52 76 L54 70 L36 64 Z" fill="url(#@pc)" ~/><path d="M166 70 L148 76 L146 70 L164 64 Z" fill="url(#@pc)" ~/>
    <path d="M80 27 Q100 52 120 27 Q100 34 80 27 Z" fill="#4e4230" ~/>
    ${ln('M96 36.4 L104 36.4 M100 34.4 L100 41', '#d8c078', .7, .9)}${ln('M95 37 q1 2.4 2 0 M103 37 q1 2.4 2 0', '#d8c078', .6, .9)}
    <path d="${coat}" fill="url(#@lo)"/>`, [100, 132, 56, 5]); }

  /* a Bluerose girth-strap, cut through: leather, an iron buckle, cut most of the way through on the inside */
  { const P = [[46, 62], [84, 28], [120, 126], [172, 66]], N = 48;
    const bz = t => { const u = 1 - t; return [u ** 3 * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t ** 3 * P[3][0], u ** 3 * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t ** 3 * P[3][1]]; };
    const pts = [...Array(N + 1)].map((_, i) => { const t = i / N, [x, y] = bz(t), [x2, y2] = bz(Math.min(1, t + .01)), [x1, y1] = bz(Math.max(0, t - .01)); let nx = -(y2 - y1), ny = x2 - x1; const l = Math.hypot(nx, ny); nx /= l; ny /= l;
      const w = 8 * (1 ); return { t, x, y, nx, ny, w }; });
    const band = (a, b) => { const s = pts.filter(p => p.t >= a - 1e-9 && p.t <= b + 1e-9); return 'M' + s.map(p => `${r1(p.x + p.nx * p.w)} ${r1(p.y + p.ny * p.w)}`).join(' L') + ' L' + s.reverse().map(p => `${r1(p.x - p.nx * p.w)} ${r1(p.y - p.ny * p.w)}`).join(' L') + ' Z'; };
    const side = (a, b, off) => 'M' + pts.filter(p => p.t >= a && p.t <= b).map(p => `${r1(p.x + p.nx * (p.w - off))} ${r1(p.y + p.ny * (p.w - off))}`).join(' L');
    const sideN = (a, b, off) => 'M' + pts.filter(p => p.t >= a && p.t <= b).map(p => `${r1(p.x - p.nx * (p.w - off))} ${r1(p.y - p.ny * (p.w - off))}`).join(' L');
    const cut = pts[24], holes = pts.filter((p, i) => i >= 40 && i <= 46 && i % 2 === 0);
    const ang = r1(Math.atan2(P[1][1] - P[0][1], P[1][0] - P[0][0]) * 180 / Math.PI);
    card('b5_c5_girth', 5, 'A Bluerose girth-strap, cut through', `
    <path d="${band(0, 1)}" fill="url(#@lt)" ~/>${ln(sideN(.36, .64, 1.2), '#c8a27a', 2.2, .9)}
    ${ln(side(.02, .98, 2.2), '#e0b484', .9, .65, 'stroke-dasharray="2.2 2"')}${ln(sideN(.02, .98, 2.6), '#e0b484', .9, .35, 'stroke-dasharray="2.2 2"')}${ln(side(0, 1, .5), '#d8a878', .9, .5)}
        ${ln(`M${r1(cut.x + cut.nx * cut.w * .52)} ${r1(cut.y + cut.ny * cut.w * .52)} L${r1(cut.x - cut.nx * cut.w * .98)} ${r1(cut.y - cut.ny * cut.w * .98)}`, '#140804', 3)}
    ${ln(`M${r1(cut.x + cut.nx * cut.w * .52 + .9)} ${r1(cut.y + cut.ny * cut.w * .52 + .6)} L${r1(cut.x - cut.nx * cut.w * .98 + .9)} ${r1(cut.y - cut.ny * cut.w * .98 + .6)}`, '#e8c8a0', .7, .7)}
    ${holes.map(p => `<ellipse cx="${r1(p.x)}" cy="${r1(p.y)}" rx="1.8" ry="1.4" fill="#1a0e06"/>`).join('')}
    <g transform="translate(40.6 66.4) rotate(${ang})"><rect x="-6" y="-12" width="12" height="24" rx="2.4" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="4.4"/><rect x="-6" y="-12" width="12" height="24" rx="2.4" fill="none" stroke="#6a6e74" stroke-width="3"/>
    ${ln('M-6 0 L8 0', '#0b0806', 3, .6)}${ln('M-6 0 L8 0', '#7a7e84', 1.8)}${ln('M-6.6 -10 L-6.6 10', '#dfe6ec', .8, .6)}</g>`, [108, 120, 66, 6]); }

  /* an Edur sword from the channel: dark iron, long, slightly curved, grey leather worn to a bigger hand than yours */
  card('b5_c6_edurblade', 5, 'An Edur sword from the channel', D(`
    <path d="M-16 -6 Q40 -8 70 -13 Q84 -16 95 -22 Q86 -10 72 -4 Q40 6 -16 6 Z" fill="url(#@di)" ~/>
    <path d="M-16 6 Q40 6 72 -4 Q86 -10 95 -22 Q84 -12.6 72 -7.4 Q40 2.4 -16 2.6 Z" fill="#b8c0c8" opacity=".5"/>
    ${ln('M-14 -5.4 Q40 -7.4 70 -12.4 Q84 -15.4 92 -20.4', '#dfe6ec', .9, .55)}
    ${ln('M-10 -1 Q30 -3 60 -7 M-6 1.4 Q30 0 64 -4', '#c8d0d8', .6, .15, 'stroke-dasharray="6 3"')}
    <ellipse cx="-19" cy="0" rx="3.2" ry="10" fill="url(#@ir)" ~/>
    <rect x="-61" y="-5.6" width="40" height="11.2" rx="3" fill="url(#@gl)" ~/>
    ${ln('M-56 -5 L-52 5 M-46 -5 L-42 5 M-36 -5 L-32 5 M-26 -5 L-23 5', '#2a2c2e', .7, .5)}
    <ellipse cx="-50" cy="-1" rx="6" ry="3" fill="#c8cacc" opacity=".22"/><ellipse cx="-34" cy="-1" rx="6" ry="3" fill="#c8cacc" opacity=".22"/>
    <path d="M-61 -6 L-69 -4 L-71 0 L-69 4 L-61 6 Z" fill="url(#@ir)" ~/>`, 1, 100, 76), [100, 130, 62, 6]);

  /* a pot of white paint: a small clay pot, a white rim, a frayed brush tied to its neck; the battalion's fingertip */
  { const pot = 'M76 58 L124 58 Q126 66 132 74 Q140 98 126 114 Q100 126 74 114 Q60 98 68 74 Q74 66 76 58 Z';
    card('b5_c6_paint', 5, 'A pot of white paint', `
    ${ln('M116 64 L150 22', '#0b0806', 5.8, .6)}${ln('M116 64 L150 22', '#8a6a40', 4.2)}${ln('M115 62.6 L148.6 21', '#d8b888', 1, .5)}
    <path d="M147 26 L155 8 L159 9 L164 13 L153 28 Z" fill="#ddd8cc" ~/>${ln('M150 22 L156 9 M152 24 L161 11 M154 26 L164 14 M156 8 l-2 -3 M163 12 l3 -2', '#9a948a', .6, .8)}
    <path d="M146 24 L150 28 L154 25 L150 21 Z" fill="#5a4a32"/>
    <path d="${pot}" fill="url(#@cy)" ~/>
    <path d="M86 62 L86 76 Q88 80 90 76 L90 63 Z M106 63 L106 70 Q108 73 110 70 L110 63 Z M118 62 L119 84 Q121 88 123 84 L122 62 Z" fill="#ecebe6"/>
    <ellipse cx="110" cy="94" rx="5" ry="6.5" fill="#ecebe6" opacity=".92" transform="rotate(10 110 94)"/>${ln('M107.4 92 q2.6 -3 5 0 M107 95 q3 -3.6 6 0 M108 98 q2 -2 4 0', '#b8b4a8', .5, .7)}
    <ellipse cx="100" cy="58" rx="26" ry="7" fill="#e8e6e0" ~/><ellipse cx="100" cy="58" rx="20" ry="4.6" fill="#f6f4ee"/>${ln('M84 56.6 Q92 54.6 100 54.6', '#fff', 1, .8)}
    ${cord('M75 63 Q100 71 125 63', '#6a5a3c', 1.4)}${ln('M114 61 L120 67 M117 60 L122 65', '#6a5a3c', 1.2)}
    <path d="${pot}" fill="url(#@lo)"/>`, [100, 124, 46, 5]); }

  /* a stone from the old lake bed: flat, pale grey with a darker ring, worn smooth by water */
  { const stone = 'M38 78 Q40 56 86 50 Q140 46 160 66 Q168 84 146 98 Q110 110 70 104 Q38 96 38 78 Z';
    card('b5_c6_lakestone', 5, 'A stone from the old lake bed', `
    <path d="${stone}" transform="translate(2 7)" fill="#3e403c" ~/>
    <path d="${stone}" fill="url(#@ls)" ~/>
    <ellipse cx="101" cy="78" rx="40" ry="18" fill="none" stroke="#6a6c66" stroke-width="11" stroke-opacity=".3"/><ellipse cx="101" cy="78" rx="40" ry="18" fill="none" stroke="#5e605a" stroke-width="5" stroke-opacity=".6"/>
    <ellipse cx="80" cy="64" rx="26" ry="7" fill="#fff" opacity=".16" transform="rotate(-8 80 64)"/>${ln('M46 70 Q60 54 92 51', '#f2f4ee', 1.2, .55)}
    <path d="${stone}" fill="url(#@lo)"/>`, [106, 112, 66, 7]); }

  /* a holed dock from the Low Walk: a worn copper dock, a hole bored through, on a cord still wet from the canal */
  card('b5_c7_dock', 5, 'A holed dock from the Low Walk', `
    ${cord('M28 12 Q60 46 96 74', '#2e2a24', 2.2)}${cord('M104 74 Q140 46 172 12', '#2e2a24', 2.2)}
    ${ln('M40 24 Q60 42 80 58', '#9ab0b8', .7, .45)}<circle cx="70" cy="50" r="1.4" fill="#b8d0dc" opacity=".7"/><circle cx="142" cy="40" r="1.2" fill="#b8d0dc" opacity=".7"/>
    <ellipse cx="103" cy="90" rx="32" ry="29" fill="#4a2614" ~/>
    <ellipse cx="100" cy="86" rx="32" ry="29" fill="url(#@cu)" ~/>
    <ellipse cx="100" cy="86" rx="26.6" ry="24" fill="none" stroke="#5a2e14" stroke-opacity=".45"/><ellipse cx="99.4" cy="85.4" rx="26.6" ry="24" fill="none" stroke="#f0b888" stroke-opacity=".3"/>
    ${ln('M86 98 Q90 88 96 90 Q98 82 106 84 Q112 86 112 96', '#5a2e14', 1.4, .35)}${ln('M84 100 L116 100', '#5a2e14', 1.2, .3)}
    <circle cx="118" cy="102" r="3" fill="#4a8a6a" opacity=".4"/><circle cx="82" cy="96" r="2" fill="#4a8a6a" opacity=".35"/>
    <ellipse cx="88" cy="76" rx="12" ry="7" fill="#fff" opacity=".12"/>
    <ellipse cx="100" cy="74" rx="4.6" ry="4.2" fill="#0a0604"/>${ln('M103.6 76 Q101 79 97 78', '#e8a070', .8, .7)}
    <path d="M104 115 Q101 120 104 123 Q107 120 104 115 Z" fill="#9ab8c8" opacity=".6"/>
    <ellipse cx="100" cy="86" rx="32" ry="29" fill="url(#@lo)"/>`, [104, 128, 32, 4]);

  /* a canal lamp off the Low Walk: small, iron, a horn window, green with canal water; unlit */
  card('b5_c7_lamp', 5, 'A canal lamp off the Low Walk', `
    <circle cx="100" cy="19" r="7.4" fill="none" stroke="#0b0806" stroke-opacity=".6" stroke-width="4.4"/><circle cx="100" cy="19" r="7.4" fill="none" stroke="#5e6268" stroke-width="2.8"/>
    <path d="M126 48 L138 44 L138 106 L126 112 Z" fill="#202326" ~/><path d="M128.6 54 L135.6 51.4 L135.6 100 L128.6 104 Z" fill="#6a5228" opacity=".75"/>
    <path d="M72 48 L100 26 L138 44 L126 48 Z" fill="url(#@ir)" ~/>${ln('M76 47 L100 27.6', '#dfe6ec', 1, .55)}
    <circle cx="94" cy="40" r="1.4" fill="#0a0c0e"/><circle cx="104" cy="40" r="1.4" fill="#0a0c0e"/><circle cx="114" cy="42" r="1.4" fill="#0a0c0e"/>
    <rect x="74" y="48" width="52" height="64" fill="url(#@ir)" ~/>
    <rect x="80" y="54" width="40" height="52" fill="url(#@hw)" opacity=".82"/><ellipse cx="94" cy="68" rx="10" ry="14" fill="#fff" opacity=".12"/>
    <path d="M97 92 Q100 84 103 92 Z" fill="#2a2016" opacity=".7"/>${ln('M80 80 L120 80 M100 54 L100 106', '#2c2f33', 2)}
    <rect x="70" y="112" width="60" height="8" rx="1.5" fill="url(#@ir)" ~/><path d="M130 112 L140 106 L140 114 L130 120 Z" fill="#1a1c1f" ~/>
    <path d="M74 98 Q80 102 78 112 L74 112 Z M122 92 Q126 100 124 112 L120 112 Q122 102 122 92 Z M84 112 Q96 108 112 112 Q100 120 84 120 Z" fill="#4a7a4a" opacity=".5"/>
    ${ln('M80 106 L81 111 M118 104 L118 110', '#6a9a5a', .8, .6)}
    <path d="M90 121 Q88 125 90 127 Q92 125 90 121 Z" fill="#9ab8c8" opacity=".6"/>`, [102, 126, 42, 5]);

  /* the Sixth's page from the paybook: ruled, names and numbers, and a line drawn neatly through every one */
  { let rows = ''; for (let i = 0; i < 11; i++) { const y = 42 + i * 8, nw = 22 + ((i * 17) % 22), dw = 10 + ((i * 7) % 12);
      rows += ln(`M64 ${y} l${nw * .25} -2 l${nw * .25} 2 l${nw * .25} -2 l${nw * .25} 2`, '#3a3028', .9, .75)
        + ln(`M122 ${y} l${dw * .33} -2 l${dw * .33} 2 l${dw * .34} -1.4`, '#3a3028', .9, .75) + ln(`M62 ${y - 1} L148 ${y - 1}`, '#2a2420', .8, .85); }
    card('b5_c7_ledgerpage', 5, "The Sixth's page from the paybook", `<g transform="rotate(-6 100 76)">
    <path d="M54 22 L146 18 Q150 20 150 24 L154 128 Q150 132 146 132 L58 134 L56 128 L59 122 L55 116 L58 110 L54 104 L58 98 L55 92 L59 86 L54 80 L58 74 L55 68 L59 62 L54 56 L58 50 L55 44 L59 38 L54 32 L57 26 Z" fill="url(#@pp)" ~/>
    ${[...Array(12)].map((_, i) => ln(`M60 ${44 + i * 8} L150 ${44 + i * 8}`, '#7a96aa', .5, .45)).join('')}${ln('M116 26 L118 130', '#a05040', .6, .5)}
    ${ln('M64 32 l6 -3 l4 3 M78 32 l3 -3 l3 3 M90 30 h10', '#2a2420', 1.1, .8)}
    ${rows}
    <path d="M146 132 L154 128 L146 122 Z" fill="#c8bc98" ~/>
    ${ln('M56 24 L146 20', '#fffaf0', 1, .5)}</g>`, [102, 138, 54, 4]); }
})();
