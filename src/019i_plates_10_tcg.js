/* ============ Book Ten's chapter plates (v13.6, 019i): The Crippled God, seven chapters ============
   Each draws its chapter's opening caption (src/18x): 1 long burial trenches in dry ground, spoil heaps in rows, a clerk with a slate at each,
   the allies' dust far off; 2 wagons halted on a low rise in the heat, barrels under canvas, horses on the picket heads down, the glass
   going away pale beyond; 3 stars overhead and the same stars underfoot in the glass, the column walking between them without a lamp;
   4 the train along the road at dusk, the horse-lines quiet, the brigades' fires coming up far to the south; 5 the glass again, the
   column slower and thinner, an empty water-skin; 6 a grey beach at first light, the King's ships at anchor, boats coming in low, a line
   of crates on the sand; 7 dusk on the first fields of Kolanse, empty granaries, the regulars' fires in rows, a dark ridge far across. */
{
  const M = (o) => Object.assign({fill: '#3c4454', dark: '#1a1e26', rim: '#e0e8f8', helmc: '#4a5060', packc: '#2a2620', roll: '#4a4030', kit: 'none', head: 'helm'}, o);
  const L = (o) => Object.assign({fill: '#34405a', dark: '#161c28', rim: '#e0e4f0', helmc: '#3c4456', packc: '#2a2620', roll: '#4a4030', kit: 'spear', head: 'cap'}, o);
  /* the glass by night: plates in perspective, each throwing back the sky, the stars repeated in them */
  const glass = (P, HZ, seed) => { const f = PK.f; let s = `<rect y="${HZ}" width="660" height="${400 - HZ}" fill="${P.lin([[0, '#2c3c54'], [.25, '#141e2e'], [1, '#05080e']])}"/>`, pl = '', cr = '';
    const R = 9, C = 14, Q = []; for (let r = 0; r <= R; r++) { const t = r / R, y = HZ + 3 + Math.pow(t, 1.9) * (400 - HZ + 20); Q.push([]); for (let c = 0; c <= C; c++) { const u = (c / C - .5) * 2, x = 330 + u * 660 * (.05 + Math.pow(t, 1.9) * 1.4) + (hash(r * 40 + c, seed) - .5) * 60 * Math.pow(t, 1.4) * (c % C ? 1 : 0); Q[r].push([x, y + (hash(r * 40 + c, seed + 1) - .5) * 20 * Math.pow(t, 1.4) * (r ? 1 : 0)]); } }
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) { const a = Q[r][c], b = Q[r][c + 1], d = Q[r + 1][c + 1], e = Q[r + 1][c], k = hash(r * 40 + c, seed + 2);
      pl += `<path d="M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}L${f(d[0])} ${f(d[1])}L${f(e[0])} ${f(e[1])}Z" fill="${k < .15 ? '#5a7090' : k < .5 ? '#22324a' : '#0c1420'}" opacity="${f((.12 + k * .2) * 100) / 100}"/>`;
      if (hash(r * 40 + c, seed + 3) < .5) cr += `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`; if (hash(r * 40 + c, seed + 4) < .45) cr += `M${f(a[0])} ${f(a[1])}L${f(e[0])} ${f(e[1])}`; }
    s += pl + `<path d="${cr}" stroke="#9ab4d8" stroke-width=".7" opacity=".4" fill="none"/>`;
    s += `<g transform="matrix(1 0 0 -.55 0 ${f(HZ * 1.55)})" opacity=".45">${TK.stars(60, seed + 5, 0, HZ, 660, '#cfe0f8', 'pk-tw')}</g>`;
    return s + `<path d="M0 ${HZ} L660 ${HZ}" stroke="#b4c6e2" stroke-width="1" opacity=".45"/>`; };
  PK.plate('chapters/tcg/1', 'Chapter One: long trenches in the dry ground, spades going, spoil heaps in rows, a clerk with a slate at each trench, and far off the dust of the allies\' columns', P => {
    let s = PK.sky(P, [[0, '#8a9ab0'], [.6, '#e0d8c4'], [1, '#ece0c4']]) + PK.sun(P, 520, 70, 16, '#fffaf0', .8);
    for (let i = 0; i < 3; i++) s += PK.smoke(P, 100 + i * 230, 196, 50, 40, 10, '#8a7656', .35, 701 + i); // the allies' dust: tan, not light (v13.33: the paler dust read as a second sun)
    s += PK.ridge(196, 4, 702, '#b8a480', .4) + `<rect y="198" width="660" height="202" fill="${P.lin([[0, '#b8a07a'], [1, '#6a5438']])}"/>`;
    for (let r = 0; r < 4; r++) { const y = 232 + r * r * 12 + r * 20, k = .4 + r * .3; s += `<path d="M-10 ${y} L670 ${y - 4}" stroke="#3a2a1a" stroke-width="${PK.f(4 * k)}"/><path d="M-10 ${PK.f(y - 4 * k)} L670 ${PK.f(y - 8 * k)}" stroke="#d8c0a0" stroke-width="${PK.f(1.6 * k)}" opacity=".5"/>`;
      for (let i = 0; i < 7; i++) { const x = 30 + i * 96 + hash(i, 703 + r) * 30; s += `<path d="M${PK.f(x - 14 * k)} ${PK.f(y - 5 * k)} Q${PK.f(x)} ${PK.f(y - 18 * k)} ${PK.f(x + 14 * k)} ${PK.f(y - 5 * k)} Z" fill="#9a7e58"/>`; }
      s += PK.column(40 + r * 30, y + 2, 620, y - 2, 5, k * .8, k * .8, '#2a1e14', 40 + r, {spears: 0, lean: 7}); }
    s += `<g transform="translate(150 360)" fill="#1e160e"><path d="M-8 0 L-7 -34 L-9 -50 L9 -50 L7 -34 L8 0 Z"/><circle cx="0" cy="-57" r="6"/><rect x="8" y="-42" width="12" height="16" fill="#4a4a4a"/></g>`;
    s += PK.back(520, 404, .5, M({rim: '#fff0d0', kit: 'none', head: 'bare', hair: '#2a1e14', dust: '#a89070', flip: true}));
    return s; });
  PK.plate('chapters/tcg/2', 'Chapter Two: wagons halted on a low rise in the afternoon heat, water barrels lashed under canvas, horses on their picket with their heads down, and the glass going away pale beyond', P => {
    let s = PK.sky(P, [[0, '#9ab0c8'], [.6, '#e8e4d8'], [1, '#f0ece0']]);
    s += `<rect y="210" width="660" height="40" fill="${P.lin([[0, '#e8ecf0'], [1, '#c8ccd0']])}"/>` + PK.haze(P, 214, 6, '#ffffff', .7, 330, 400);
    let gl = ''; for (let i = 0; i < 30; i++) gl += `M${PK.f(hash(i, 711) * 660)} ${PK.f(214 + hash(i, 712) * 30)}h${PK.f(20 + hash(i, 713) * 60)}`; s += `<path d="${gl}" stroke="#ffffff" stroke-width="1" opacity=".6"/>`;
    s += `<path d="M-10 400 L-10 270 Q200 236 330 240 Q500 244 670 270 L670 400 Z" fill="${P.lin([[0, '#a08a68'], [1, '#5a4630']])}"/>`;
    for (let i = 0; i < 5; i++) { const x = 90 + i * 110, y = 262 - Math.sin((i + .5) / 5 * 3.14) * 18; s += PK.wagon(x, y, .9, '#2a2016', '#c8bca4', i) + `<g fill="#3a2c1c"><rect x="${x - 12}" y="${y - 40}" width="9" height="12" rx="2"/><rect x="${x}" y="${y - 40}" width="9" height="12" rx="2"/></g>`; }
    s += `<path d="M60 312 L600 300" stroke="#2a2016" stroke-width="1"/>`;
    for (let i = 0; i < 10; i++) s += `<g transform="translate(${80 + i * 52} ${330 - i * 1.2}) scale(1)">${PK.rider(0, 0, .9, '#2a2016', false, i % 3 === 0, true).replace('<g transform', '<g transform')}</g>`;
    s += PK.stones(50, 714, 270, 400, '#4a3a26', .4) + PK.back(560, 404, .5, L({flip: true, rim: '#fff4e0'}));
    return s; });
  PK.plate('chapters/tcg/3', 'Chapter Three: stars overhead and the same stars underfoot in the glass, and the column walking between them without a lamp', P => {
    let s = PK.sky(P, [[0, '#03050b'], [.6, '#0a1022'], [1, '#2c3c58']]) + PK.stars(200, 721, 0, 214);
    s += `<g transform="rotate(-14 330 120)"><ellipse cx="330" cy="120" rx="460" ry="50" fill="#b8c4e4" opacity=".1" filter="url(#${P.blur(14)})"/></g>`;
    s += glass(P, 220, 722);
    s += PK.column(-10, 270, 670, 236, 44, .9, .4, '#03050a', 41, {spears: .3});
    s += `<g transform="matrix(1 0 0 -.5 0 ${PK.f(272 * 1.5)})" opacity=".3">${PK.column(-10, 270, 670, 236, 44, .9, .4, '#3a5070', 41, {spears: .3})}</g>`;
    s += PK.back(150, 404, .52, M({walk: 1, rim: '#b8c8e8', cloak: '#1e2230'}));
    return s; });
  PK.plate('chapters/tcg/4', 'Chapter Four: the train drawn up along the road at dusk, the horse-lines quiet with every head down, and far to the south the brigades\' fires coming up one by one', P => {
    let s = PK.sky(P, [[0, '#1a1e34'], [.55, '#6a4a5a'], [.85, '#c08060'], [1, '#8a5a40']]) + PK.stars(30, 731, 0, 80);
    s += PK.ridge(214, 4, 732, '#2a2024', .3);
    for (let i = 0; i < 14; i++) s += PK.lamp(P, 40 + i * 44 + hash(i, 733) * 20, 212 + hash(i, 734) * 4, .7, '#ff8a3a', i);
    s += `<rect y="218" width="660" height="182" fill="${P.lin([[0, '#3a2c24'], [1, '#14100c']])}"/>`;
    s += `<path d="M-10 290 Q330 270 670 280 L670 300 Q330 290 -10 310 Z" fill="#4a3a2c"/>`;
    for (let i = 0; i < 7; i++) s += PK.wagon(40 + i * 96, 282 - i * 1.4, .8, '#120c08', '#6a5a4a', i);
    for (let i = 0; i < 12; i++) s += PK.rider(30 + i * 54, 340, 1, '#0c0806', false, i % 2 === 1, true);
    s += `<path d="M20 322 L640 322" stroke="#0c0806" stroke-width="1"/>`;
    return s; });
  PK.plate('chapters/tcg/5', 'Chapter Five: stars overhead and the same stars underfoot in the glass, and the column walking between them slower than it did', P => {
    let s = PK.sky(P, [[0, '#03050b'], [.6, '#0a1022'], [1, '#26344c']]) + PK.stars(160, 741, 0, 214);
    s += glass(P, 220, 742);
    s += PK.column(40, 256, 520, 232, 18, .7, .35, '#03050a', 42, {spears: .2, lean: 5});
    s += `<g transform="translate(240 350) rotate(-10)"><path d="M-30 0 Q-20 -14 6 -12 Q30 -10 36 2 Q10 10 -30 0 Z" fill="#3a2c1e"/><path d="M36 2 L46 0 L44 -4" stroke="#2a1e14" stroke-width="3" fill="none"/></g>`;
    s += PK.back(470, 404, .5, L({walk: 1, rim: '#b8c8e8', flip: true}));
    return s; });
  PK.plate('chapters/tcg/6', 'Chapter Six: a grey beach on the Kolanse coast at first light, the King\'s ships at anchor, boats coming in low in the water, and a line of crates on the sand longer than the column', P => {
    let s = PK.sky(P, [[0, '#4a5568'], [.6, '#a8a4a4'], [1, '#d8c8b8']]) + PK.haze(P, 200, 14, '#f0e0d0', .5, 330, 380);
    s += PK.water(P, 204, '#7a8088', '#3a424a', {line: '#e0e4e8', op: .3});
    for (const [x, y, k] of [[140, 220, .8], [300, 214, .6], [440, 211, .45], [560, 209, .35]]) s += PK.ship(P, x, y, k, '#1e2228', '');
    for (const [x, y, k] of [[200, 262, .9], [380, 252, .7]]) s += `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-36 0 Q-30 9 0 10 Q30 9 38 -2 L-38 -2 Z" fill="#1e1a16"/>${[0, 1, 2, 3, 4].map(i => `<circle cx="${-24 + i * 12}" cy="-7" r="4" fill="#1e1a16"/>`).join('')}</g>`;
    s += `<path d="M-10 290 Q330 276 670 286 L670 400 L-10 400 Z" fill="${P.lin([[0, '#8a847a'], [1, '#4a4640']])}"/><path d="M-10 290 Q330 276 670 286" stroke="#e8ecf0" stroke-width="2" fill="none" opacity=".5"/>`;
    for (let i = 0; i < 26; i++) { const x = -10 + i * 27, y = 316 + Math.sin(i * .4) * 3, k = .9; s += `<rect x="${x}" y="${PK.f(y - 14 * k)}" width="${PK.f(22 * k)}" height="${PK.f(14 * k)}" fill="#3a3024" stroke="#1a140e" stroke-width="1"/><path d="M${x} ${PK.f(y - 7 * k)} h${PK.f(22 * k)}" stroke="#1a140e" stroke-width=".8"/>`; }
    s += PK.column(40, 300, 300, 296, 10, .7, .6, '#1a1612', 43, {spears: .3});
    s += PK.back(520, 404, .5, M({flip: true, rim: '#f0e8e0', kit: 'spear'}));
    return s; });
  PK.plate('chapters/tcg/7', 'Chapter Seven: dusk on the first fields of Kolanse, empty granaries, the regulars\' fires coming up in rows, and far across the fields a dark line of ridge', P => {
    let s = PK.sky(P, [[0, '#14182c'], [.55, '#5a3a4a'], [.85, '#b0603a'], [1, '#7a4a30']]) + PK.stars(30, 751, 0, 80);
    s += PK.ridge(190, 18, 752, '#0c0a10') + PK.crest(190, 18, 752, '#c07050', 1, .4);
    s += `<rect y="204" width="660" height="196" fill="${P.lin([[0, '#3a2e22'], [1, '#14100a']])}"/>`;
    let fr = ''; for (let i = 0; i < 18; i++) { const y = 210 + i * i * .6 + i * 3; fr += `M-10 ${PK.f(y)} L670 ${PK.f(y)}`; } s += `<path d="${fr}" stroke="#5a4a32" stroke-width=".8" opacity=".5"/>`;
    for (const [x, y, k] of [[420, 236, .7], [500, 232, .6], [120, 244, .9]]) s += `<g transform="translate(${x} ${y}) scale(${k})" fill="#0e0a08"><path d="M-22 0 L-22 -34 Q0 -56 22 -34 L22 0 Z"/><rect x="-6" y="-18" width="12" height="18" fill="#1e140c"/></g>`;
    for (let r = 0; r < 3; r++) for (let i = 0; i < 8 + r * 2; i++) s += PK.fire(P, 30 + (i + .5) * (600 / (8 + r * 2)), 262 + r * 30, .4 + r * .25, '#ff8a3a', i + r * 20);
    s += PK.back(560, 404, .5, M({flip: true, rim: '#ffa070', kit: 'spear'}));
    return s; });
}
