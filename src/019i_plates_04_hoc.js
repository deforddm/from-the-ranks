/* ============ Book Four's chapter plates (v13.6, 019i): House of Chains, seven chapters ============
   Each draws its chapter's opening caption (src/07x): 1 three legions on the dust plain under Aren's walls, lines not straight, riders under
   a standard far across; 2 the column going north between the trees of the Aren Way, every tree hung with something (rags and rope only,
   headline-dark, never drawn plainer); 3 dry hills under a white sky, the column in their folds, dust on the far ridges not the column's;
   4 the column in its own dust under a white sun, wagons crawling, and far off a small boy walking; 5 the Whirlwind Wall from one end of the
   sky to the other, the column very small; 6 three ramps up out of the basin to the trenches, the dead city pale behind, red dust coming
   down; 7 the basin at dusk, the trenches on their ramps, the oasis behind going dark. */
{
  const B = (o) => Object.assign({fill: '#5a4c3a', dark: '#2a2018', rim: '#f4e0b8', helmc: '#5a5650', packc: '#3a2e22', roll: '#5a4630', kit: 'none', head: 'helm', dust: '#b09878'}, o);
  const sand = P => P.lin([[0, '#c8b08a'], [1, '#7a6040']]);
  PK.plate('chapters/hoc/1', 'Chapter One: three legions on a dust plain under Aren\'s walls, in lines that do not stay straight, and far across it a few riders under a standard', P => {
    let s = PK.sky(P, [[0, '#7a9ab8'], [.6, '#d8d8c8'], [1, '#e8dcc0']]);
    s += PK.skyline(P, 0, 300, 176, 251, {fill: '#9a8a74', lit: '#fff', p: 0, h: 34, domes: .3}) + PK.wall(-10, 320, 170, 196, '#8a7a64', {cw: 6, towers: [40, 140, 240], edge: '#f0e0c0'});
    s += `<rect y="196" width="660" height="204" fill="${sand(P)}"/>` + PK.haze(P, 200, 8, '#f0e4c8', .5, 330, 380);
    for (let r = 0; r < 3; r++) { const y = 236 + r * 34, k = .55 + r * .25; s += PK.column(10 + r * 20, y + 6, 520 - r * 30, y - 6, 28 + r * 4, k, k, '#2a2018', 10 + r, {lean: 0, spears: .7}); }
    s += PK.rider(560, 214, .55, '#2a2018', false) + PK.rider(590, 216, .55, '#2a2018', true) + PK.rider(620, 212, .55, '#2a2018', false) + PK.banner(586, 210, 34, '#2a2018', '#6a2a1a');
    s += PK.stones(60, 252, 200, 400, '#5a4630', .4) + PK.smoke(P, 200, 340, 60, 50, 30, '#d8c4a0', .35, 253);
    return s; });
  PK.plate('chapters/hoc/2', 'Chapter Two: the column going north between the trees of the Aren Way, every tree empty, and every tree hung with something', P => {
    let s = PK.sky(P, [[0, '#8a8a84'], [.6, '#c8c0a8'], [1, '#d0c4a8']]);
    s += PK.ridge(200, 8, 261, '#9a8a6a', .4) + `<rect y="204" width="660" height="196" fill="${sand(P)}"/>`;
    s += `<path d="M300 206 L360 206 L620 400 L40 400 Z" fill="#8a7050"/>`;
    for (let i = 0; i < 9; i++) { const t = i / 8, k = .25 + t * t * 1.6, yL = 208 + t * t * 200, xL = 300 - 20 - t * t * 300, xR = 360 + 20 + t * t * 300;
      for (const x of [xL, xR]) { s += PK.tree(x, yL, 70 * k, '#2a2218', 'dead', i * 3 + (x > 330 ? 1 : 0)); s += `<path d="M${PK.f(x + 8 * k)} ${PK.f(yL - 40 * k)} l0 ${PK.f(9 * k)} M${PK.f(x - 7 * k)} ${PK.f(yL - 48 * k)} l0 ${PK.f(7 * k)}" stroke="#3a2a1c" stroke-width="${PK.f(.8 * k)}"/><path d="M${PK.f(x + 6 * k)} ${PK.f(yL - 31 * k)} l4 0 l-1 ${PK.f(8 * k)} l-4 0 Z" fill="#4a3a28" opacity=".8"/>`; } }
    s += PK.column(328, 212, 300, 330, 14, .25, 1, '#2a2018', 12, {jx: 24});
    s += PK.back(470, 404, .5, B({walk: 1, kit: 'spear', flip: true}));
    return s; });
  PK.plate('chapters/hoc/3', 'Chapter Three: dry hills under a white sky, the column a league long in the folds of them, and on the far ridges dust that is not the column\'s', P => {
    let s = PK.sky(P, [[0, '#c8c8c0'], [.6, '#ece6d8'], [1, '#f0e8d8']]);
    s += PK.ridge(170, 16, 271, '#b8a88a', .6);
    for (let i = 0; i < 4; i++) s += PK.smoke(P, 420 + i * 50, 166, 80, 22, 30, '#c8b490', .45, 272 + i);
    s += PK.ridge(214, 26, 273, '#a08a68', .7) + PK.ridge(262, 30, 274, '#8a7050', .7) + PK.crest(262, 30, 274, '#f4e8d0', 1, .4, .7);
    s += PK.column(40, 252, 620, 236, 50, .45, .35, '#3a2c1e', 14) + PK.wagon(260, 252, .45, '#3a2c1e');
    s += PK.ridge(320, 24, 275, '#6a5438', .7) + PK.stones(60, 276, 300, 400, '#3a2c1c', .45) + PK.grass(120, 277, 300, 400, '#8a7448', .5);
    s += PK.back(150, 404, .5, B({kit: 'spear', walk: 1}));
    return s; });
  PK.plate('chapters/hoc/4', 'Chapter Four: a column a league long in its own dust under a white sun, wagons in a crawling line, and far off beside them a small boy walking', P => {
    let s = PK.sky(P, [[0, '#d8d4c8'], [.6, '#f4ecd8'], [1, '#f0e4c8']]) + PK.sun(P, 200, 80, 22, '#fffef8', .9);
    s += `<rect y="220" width="660" height="180" fill="${sand(P)}"/>` + PK.ridge(220, 5, 281, '#c0a880', .5);
    s += PK.smoke(P, 250, 250, 70, 70, 20, '#e8d8b8', .5, 282) + PK.smoke(P, 450, 246, 60, 60, 20, '#e8d8b8', .45, 283);
    for (let i = 0; i < 8; i++) s += PK.wagon(80 + i * 72, 262 - i * 3, .6 - i * .03, '#3a2c1c', '#9a8a6a', i);
    s += PK.column(40, 280, 640, 254, 34, .6, .4, '#3a2c1c', 15);
    s += `<g transform="translate(520 300) scale(.6)" fill="#2a2018"><path d="M-4 0 L-3 -14 L-4 -24 L4 -24 L3 -14 L4 0 Z"/><circle cx="0" cy="-28" r="4"/></g>`;
    s += PK.stones(60, 284, 270, 400, '#5a4630', .45);
    s += PK.back(120, 404, .5, B({kit: 'xbow', walk: 1}));
    return s; });
  PK.plate('chapters/hoc/5', 'Chapter Five: a storm of sand standing up off the desert from one end of the sky to the other, and the column very small under it', P => {
    let s = PK.sky(P, [[0, '#8a6a4a'], [.5, '#b08a5a'], [1, '#d0b080']]);
    s += `<path d="M-10 0 L670 0 L670 236 Q500 226 330 232 Q160 226 -10 236 Z" fill="${P.lin([[0, '#5a3a24'], [.6, '#a07040'], [1, '#c89a60']])}"/>`;
    for (let i = 0; i < 12; i++) s += `<path d="M${-20 + i * 60} 236 Q${i * 60} 120 ${30 + i * 60} 0" stroke="#e0b880" stroke-width="${8 + hash(i, 291) * 12}" fill="none" opacity=".18" filter="url(#${P.blur(6)})"/>`;
    s += PK.haze(P, 232, 14, '#f0d0a0', .5, 330, 400);
    s += `<rect y="236" width="660" height="164" fill="${P.lin([[0, '#b8986a'], [1, '#6a5034']])}"/>`;
    s += PK.column(160, 262, 500, 246, 30, .3, .25, '#2a1e12', 16) + PK.wagon(330, 254, .3, '#2a1e12');
    s += PK.stones(60, 292, 250, 400, '#4a3420', .45) + PK.grass(80, 293, 280, 400, '#8a6a40', .5);
    s += PK.back(520, 404, .52, B({kit: 'spear', flip: true, rim: '#ffd8a0'}));
    return s; });
  PK.plate('chapters/hoc/6', 'Chapter Six: three long ramps going up out of a basin to the trenches, the dead city pale behind them, and the dust coming down red', P => {
    let s = PK.sky(P, [[0, '#6a2a1a'], [.5, '#b0583a'], [1, '#d08a5a']]);
    s += PK.skyline(P, 140, 520, 168, 301, {fill: '#d8c0a0', lit: '#fff', p: 0, h: 40, domes: .3, roofs: false}) + PK.ridge(176, 6, 302, '#c0a080', .5);
    s += PK.haze(P, 120, 60, '#c04a2a', .35, 330, 400);
    s += `<rect y="180" width="660" height="40" fill="#a07050"/><path d="M-10 220 L120 214 L240 220 L330 212 L440 220 L560 214 L670 220 L670 232 L-10 232 Z" fill="#3a2418"/>`;
    for (const [x0, x1] of [[60, 200], [270, 400], [480, 610]]) s += `<path d="M${x0} 400 L${x0 + 40} 222 L${x1 - 40} 222 L${x1} 400 Z" fill="#8a5a3c"/><path d="M${x0} 400 L${x0 + 40} 222 M${x1} 400 L${x1 - 40} 222" stroke="#e0a070" stroke-width="1" opacity=".4"/>`;
    s += `<path d="M-10 400 L60 400 L100 222 L-10 240 Z M200 400 L160 222 L310 222 L270 400 Z M400 400 L360 222 L520 222 L480 400 Z M610 400 L570 222 L670 240 L670 400 Z" fill="#4a2c1c"/>`;
    let ds = ''; for (let i = 0; i < 60; i++) ds += `<circle cx="${PK.f(hash(i, 303) * 660)}" cy="${PK.f(hash(i, 304) * 400)}" r="${PK.f(.6 + hash(i, 305) * 1.2)}"/>`; s += `<g fill="#e08050" opacity=".5">${ds}</g>`;
    s += PK.back(330, 404, .5, B({kit: 'spear', rim: '#ffb080', dust: '#a06040'}));
    return s; });
  PK.plate('chapters/hoc/7', 'Chapter Seven: the basin at dusk, the trenches on their three ramps across it, and the oasis behind them going dark', P => {
    let s = PK.sky(P, [[0, '#1a1a30'], [.5, '#6a3a3a'], [.85, '#c0704a'], [1, '#8a4a30']]) + PK.stars(30, 47, 0, 70);
    s += `<path d="M140 190 Q200 176 260 186 Q300 172 360 184 Q420 170 520 190 L520 196 L140 196 Z" fill="#0e1410"/>`;
    for (let i = 0; i < 14; i++) s += PK.tree(160 + i * 26, 192, 22 + hash(i, 311) * 12, '#0a100c', hash(i, 312) < .5 ? 'pine' : 'old', i);
    s += `<rect y="194" width="660" height="206" fill="${P.lin([[0, '#5a3a2a'], [1, '#1a100c']])}"/>`;
    s += `<path d="M-10 240 L670 236" stroke="#120a08" stroke-width="6"/>`;
    for (const [x0, x1] of [[60, 200], [270, 400], [480, 610]]) s += `<path d="M${x0} 400 L${x0 + 40} 242 L${x1 - 40} 242 L${x1} 400 Z" fill="#3a2418"/>`;
    s += PK.fires(P, [[120, 246, .6], [330, 246, .6], [540, 246, .6]], .6, '#ff8a40');
    s += PK.back(150, 404, .5, B({kit: 'none', rim: '#ffa070', dust: ''})) + PK.back(520, 404, .48, B({kit: 'spear', rim: '#ffa070', flip: true, dust: ''}));
    return s; });
}
