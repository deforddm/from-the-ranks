/* ============ Book Six's chapter plates (v13.6, 019i): The Bonehunters, seven chapters ============
   Each draws its chapter's opening caption (src/10x): 1 cook-fires in a line across the Lato Odhan's scrub at night, the picket horses, an
   old city ahead; 2 tents in rows above a grey sea in the rain, the ships offshore, a city's lamps along the bay; 3 Y'Ghatan's walls the
   colour of old bone, the siege lines dug in, the Empire's barrows along the road; 4 mud, canvas and rain before G'danisban, the surgeons'
   tents full, grey walls behind; 5 a road across scrub and stone toward the coast, a long column going away from a city still smoking;
   6 the Host's column on a night road, a low moon, the sky very clear; 7 grey water from a deck, the fleet strung out behind, every soldier
   looking at the horizon. */
{
  const B = (o) => Object.assign({fill: '#4a4438', dark: '#221e18', rim: '#e8dcc0', helmc: '#4a4a4c', packc: '#2e2820', roll: '#4a4030', kit: 'none', head: 'helm', dust: ''}, o);
  const rain = (P, n, seed, col, op) => { let d = ''; for (let i = 0; i < n; i++) { const x = hash(i, seed) * 720 - 30, y = hash(i, seed + 1) * 420 - 20, l = 10 + hash(i, seed + 2) * 18; d += `M${PK.f(x)} ${PK.f(y)}l${PK.f(-l * .25)} ${PK.f(l)}`; } return `<path d="${d}" stroke="${col}" stroke-width=".8" opacity="${op}"/>`; };
  PK.plate('chapters/bh/1', 'Chapter One: cook-fires in a line across the Lato Odhan\'s scrub at night, the picket horses stamping, and somewhere ahead an old city', P => {
    let s = PK.sky(P, [[0, '#04050a'], [.65, '#0e1220'], [1, '#1a1a24']]) + PK.stars(120, 61, 0, 210);
    s += PK.skyline(P, 470, 580, 212, 401, {fill: '#0a0a10', lit: '#fff', p: 0, h: 26, domes: .3, roofs: false}) + PK.ridge(214, 4, 402, '#0a0a0e');
    s += `<rect y="214" width="660" height="186" fill="${P.lin([[0, '#14141a'], [1, '#08080a']])}"/>`;
    for (let i = 0; i < 12; i++) { const t = i / 11, x = 20 + t * 520, y = 300 - t * 70; s += PK.fire(P, x, y, 1.2 - t * .7, '#ff9040', i); }
    for (let i = 0; i < 8; i++) s += PK.rider(120 + i * 26, 290, .8, '#050508', false, i % 2 === 1, true);
    s += `<path d="M110 280 L340 278" stroke="#2a2a30" stroke-width="1"/>`;
    s += PK.grass(240, 403, 220, 400, '#2a2a30', .6) + PK.back(560, 404, .5, B({kit: 'spear', flip: true, rim: '#ffa060', cloak: '#26221c'}));
    return s; });
  PK.plate('chapters/bh/2', 'Chapter Two: tents in rows above a grey sea in the rain, the ships riding offshore, and a city\'s lamps along the bay', P => {
    let s = PK.sky(P, [[0, '#3a4048'], [.6, '#6a6e72'], [1, '#7a7c7c']]);
    s += PK.water(P, 196, '#5a6068', '#2a3038', {line: '#a8b0b8', op: .2});
    for (const [x, k] of [[120, .55], [230, .45], [330, .6], [420, .4]]) s += PK.ship(P, x, 210, k, '#22262c', '', '#e8b060', x);
    s += `<path d="M440 200 Q560 190 670 196 L670 214 L440 210 Z" fill="#3a3e44"/>` + PK.skyline(P, 470, 670, 200, 411, {fill: '#2a2e34', lit: '#f0b860', p: .3, h: 22, domes: .3});
    s += `<path d="M-10 400 L-10 264 Q200 246 360 252 Q520 258 670 244 L670 400 Z" fill="#2a2a24"/>`;
    s += PK.tents(P, -10, 670, 276, 4, 16, .9, '#5a5446', .12, 412);
    s += rain(P, 260, 413, '#c8d0d8', .35);
    s += PK.back(110, 404, .5, B({cloak: '#3a3a34', rim: '#c8d0d8'}));
    return s; });
  PK.plate('chapters/bh/3', 'Chapter Three: Y\'Ghatan\'s walls the colour of old bone, the siege lines dug in, and the barrows of the Empire\'s dead along the road', P => {
    let s = PK.sky(P, [[0, '#8a9ab0'], [.6, '#d8d4c4'], [1, '#e4dcc4']]);
    s += PK.skyline(P, 160, 520, 168, 421, {fill: '#c8bca0', lit: '#fff', p: 0, h: 50, domes: .4, towers: .15, roofs: false});
    s += PK.wall(120, 560, 168, 214, '#d8ccae', {cw: 8, towers: [140, 250, 360, 460, 540], tw: 22, th: 30, edge: '#7a6a50'});
    s += `<rect y="214" width="660" height="186" fill="${P.lin([[0, '#b8a07a'], [1, '#6a5438']])}"/>`;
    for (let r = 0; r < 3; r++) s += `<path d="M-10 ${236 + r * 22} Q330 ${226 + r * 22} 670 ${238 + r * 22}" stroke="#5a442c" stroke-width="${3 + r * 2}" fill="none"/>`;
    s += PK.tents(P, -10, 670, 248, 1, 22, .5, '#6a5a44', 0, 422);
    s += `<path d="M300 400 L330 300 L360 400 Z" fill="#8a7050" opacity=".6"/>`;
    for (let i = 0; i < 7; i++) { const t = (i + 1) / 8, w = 20 + t * 70, x = 330 + (i % 2 ? 1 : -1) * (30 + t * 160), y = 290 + t * 100; s += `<path d="M${x - w / 2} ${y} Q${x} ${y - w * .38} ${x + w / 2} ${y} Z" fill="#7a6040"/><path d="M${x} ${y - w * .3} l0 ${PK.f(-8 * t - 4)}" stroke="#3a2c1c" stroke-width="2"/>`; }
    s += PK.back(560, 404, .5, B({kit: 'spear', flip: true, dust: '#b09a7a'}));
    return s; });
  PK.plate('chapters/bh/4', 'Chapter Four: mud, canvas and rain that does not stop before G\'danisban, the surgeons\' tents full, and the city\'s grey walls behind it all', P => {
    let s = PK.sky(P, [[0, '#4a4c50'], [.6, '#7a7a78'], [1, '#8a8680']]);
    s += PK.wall(80, 600, 186, 214, '#5a5a5a', {cw: 6, towers: [120, 260, 420, 560]}) + PK.skyline(P, 120, 560, 180, 431, {fill: '#5a5a5a', lit: '#fff', p: 0, h: 24, roofs: false});
    s += `<rect y="212" width="660" height="188" fill="${P.lin([[0, '#4a4234'], [1, '#22201a']])}"/>`;
    s += PK.tents(P, -10, 670, 232, 2, 14, .8, '#6a6656', .1, 432);
    s += `<path d="M150 330 L150 270 L330 250 L510 270 L510 330 Z" fill="#7a7466"/><path d="M150 270 L330 250 L510 270" stroke="#3a3830" stroke-width="2" fill="none"/><path d="M300 330 L310 280 L350 280 L360 330 Z" fill="#e8b060" opacity=".7" class="pk-fl"/>` + PK.lamp(P, 330, 300, 2, '#e8b060', 1);
    let pools = ''; for (let i = 0; i < 14; i++) { const t = hash(i, 433), y = 336 + t * 60, x = hash(i, 434) * 660; pools += `<ellipse cx="${PK.f(x)}" cy="${PK.f(y)}" rx="${PK.f(10 + t * 40)}" ry="${PK.f(2 + t * 4)}" fill="#8a8a88" opacity=".35"/>`; } s += pools;
    s += rain(P, 320, 435, '#d0d4d8', .4) + PK.back(560, 404, .5, B({cloak: '#3a3a34', flip: true, rim: '#d0d4d8'}));
    return s; });
  PK.plate('chapters/bh/5', 'Chapter Five: a road across scrub and stone toward the coast, and a long column on it, going away from a city that is still smoking', P => {
    let s = PK.sky(P, [[0, '#6a7a90'], [.6, '#c8c4b4'], [1, '#d8ccb0']]);
    s += PK.skyline(P, 40, 160, 196, 441, {fill: '#8a7a64', lit: '#fff', p: 0, h: 22, domes: .3, roofs: false});
    for (let i = 0; i < 4; i++) s += PK.smoke(P, 60 + i * 30, 190, 170, 20, 80, '#3a3434', .5, 442 + i);
    s += PK.ridge(204, 6, 443, '#9a8a70', .4) + `<rect y="206" width="660" height="194" fill="${P.lin([[0, '#a08a68'], [1, '#5a4630']])}"/>`;
    s += `<path d="M180 400 Q240 300 420 240 Q560 210 680 206 L680 214 Q560 220 440 250 Q300 300 300 400 Z" fill="#c0a882" opacity=".6"/>`;
    s += PK.column(250, 360, 660, 212, 40, 1.1, .25, '#2a2016', 25, {jx: 10});
    s += PK.stones(80, 444, 210, 400, '#4a3a28', .5) + PK.grass(160, 445, 220, 400, '#6a5a3a', .5);
    return s; });
  PK.plate('chapters/bh/6', 'Chapter Six: the Host\'s column strung out on a night road across the scrub, a moon low over it, and the sky very clear', P => {
    let s = PK.sky(P, [[0, '#02030a'], [.7, '#0c1224'], [1, '#18203a']]) + PK.stars(220, 63, 0, 250) + PK.moon(P, 520, 200, 20, '#e8e4d0');
    s += PK.ridge(240, 8, 451, '#0a0c14') + `<rect y="244" width="660" height="156" fill="${P.lin([[0, '#14182a'], [1, '#06070c']])}"/>`;
    s += PK.column(-10, 330, 670, 260, 46, .9, .35, '#03040a', 26) + PK.wagon(280, 296, .7, '#03040a') + PK.wagon(470, 278, .5, '#03040a');
    s += PK.grass(260, 452, 250, 400, '#2a3248', .6);
    s += PK.back(120, 404, .5, B({kit: 'spear', walk: 1, rim: '#d8dce8', cloak: '#1e2028'}));
    return s; });
  PK.plate('chapters/bh/7', 'Chapter Seven: grey water and a grey sky from the deck, the fleet strung out behind, and every soldier aboard looking at the horizon', P => {
    let s = PK.sky(P, [[0, '#5a6068'], [.6, '#9aa0a4'], [1, '#b0b4b4']]) + PK.haze(P, 200, 12, '#e8ecec', .4, 330, 380);
    s += PK.water(P, 206, '#7a8288', '#2a3238', {line: '#d0d8dc', op: .25, n: 60});
    for (const [x, y, k] of [[80, 230, .5], [200, 222, .35], [300, 216, .25], [380, 212, .18], [440, 210, .13]]) s += PK.ship(P, x, y, k, '#2a3036', '#5a5e62');
    s += `<path d="M-10 400 L-10 318 L670 300 L670 400 Z" fill="#2a221c"/><path d="M-10 318 L670 300" stroke="#5a4a3a" stroke-width="4"/>`;
    for (let i = 0; i < 9; i++) s += `<rect x="${i * 80}" y="${318 - i * 2.2}" width="5" height="26" fill="#1a1410"/>`;
    s += PK.back(220, 404, .48, B({kit: 'none', rim: '#e8ecec', cloak: '#3a3a3a'})) + PK.back(400, 404, .44, B({kit: 'spear', rim: '#e8ecec', head: 'bare'})) + PK.back(560, 404, .5, B({kit: 'none', rim: '#e8ecec', head: 'helm', flip: true}));
    return s; });
}
