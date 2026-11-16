/* ============ Book One's chapter plates (v13.6, 019i): Gardens of the Moon, the prologue and seven chapters ============
   Redrawn from the v1 plates with the plate kit (019h). Each plate draws its chapter's opening caption and nothing the caption does not say:
   0 the Second Army in its pits on the hillside below Pale, the city burning under Moon's Spawn; 1 the tent lines under a bruised sky,
   one lamp lit in the cadre row, the Spawn gone; 2 grass to every horizon, one wagon, an empty sky; 3 Darujhistan at dusk from the
   Worry Gate road, blue lamps coming on along the walls and the Spawn over the lake; 4 slate and chimney-pots under blue haze, a
   squadmate crouched on the ridge, the Spawn dark above; 5 the Gadrobi Hills folded brown, barrow-stones on every crest, no smoke;
   6 the Fete: paper lanterns in every colour but blue, masks on the doors, the Spawn undressed over the lake; 7 the Lakefront at dawn,
   the blue lamps going out along the quay, gulls on the pilings, an empty sky. */
{
  for (let n = 0; n < 8; n++) delete ART['chapters/' + n]; // the v1 plates
  const B = (o) => Object.assign({fill: '#2c3038', dark: '#14161a', rim: '#d8c8a8', helmc: '#3a3e48', packc: '#2a241c', cloak: '', kit: 'none', head: 'helm'}, o);
  /* v13.29 (David's screenshot, Nov 16: Pale was a strip of boxes on the far horizon, and the Spawn hung overhead though the text has it gone three days):
     the Spawn is gone from the sky; Pale stands close on its hill above the pits, walled, towers broken, a breach where the sorcery fell, a few lamps,
     smoke going up thin three days on. */
  PK.plate('chapters/gotm/0', 'Prologue: the Second Army in its pits on the hillside below Pale, the city broken on its hill and the sky empty where the Spawn hung', P => {
    let s = PK.sky(P, [[0, '#07060c'], [.45, '#1a1220'], [.78, '#4a2018'], [1, '#22100c']]) + PK.stars(70, 3, 0, 150);
    s += PK.haze(P, 200, 50, '#c0502a', .22, 420, 250);
    const hill = '<path d="M150 300 C230 290 290 236 360 226 C430 216 520 214 600 222 C630 226 650 232 660 236 L660 300 Z" fill="#1a100e"/>';
    s += PK.ridge(262, 8, 11, '#150c0b') + hill;
    s += PK.skyline(P, 330, 640, 228, 21, {fill: '#120a0a', lit: '#ffa050', p: .05, h: 58, wide: 22, domes: .1, towers: .22, spires: true});
    s += PK.wall(312, 470, 238, 262, '#170d0c', {cw: 6, towers: [330, 400, 455], tw: 13, th: 24});
    s += PK.wall(508, 660, 234, 262, '#170d0c', {cw: 6, towers: [540, 610], tw: 13, th: 26, gx: 575, gw: 18, gh: 22});
    s += '<path d="M470 238 L478 248 L486 242 L494 252 L502 244 L508 234 L508 262 L470 262 Z" fill="#170d0c"/>'; // the breach, rubble where the wall was
    for (let i = 0; i < 5; i++) s += PK.smoke(P, 360 + i * 62, 226, 150, 12, 34, '#3a2826', .42, 30 + i);
    s += PK.fires(P, [[488, 246, .55], [372, 234, .35], [598, 230, .4]], .5, '#ff7a2a');
    s += PK.ridge(300, 30, 12, '#140c0c') + PK.crest(300, 30, 12, '#a05030', 1, .3);
    let pits = ''; for (let i = 0; i < 26; i++) { const x = 20 + hash(i, 41) * 620, y = 296 + hash(i, 42) * 86, w = 10 + (y - 280) * .25; pits += `<ellipse cx="${PK.f(x)}" cy="${PK.f(y)}" rx="${PK.f(w)}" ry="${PK.f(w * .28)}" fill="#050304"/><path d="M${PK.f(x - w)} ${PK.f(y)} Q${PK.f(x)} ${PK.f(y - w * .5)} ${PK.f(x + w)} ${PK.f(y)}" stroke="#4a2418" stroke-width="1" fill="none" opacity=".6"/>`; }
    s += pits + PK.fires(P, [[90, 330, .8], [250, 372, 1], [560, 350, .9]]);
    s += PK.back(150, 404, .42, B({rim: '#e08850', cloak: '#2a2220', head: 'helm', kit: 'spear'}));
    return s; });
  PK.plate('chapters/gotm/1', 'Chapter One: the tent lines under a bruised sky, and one lamp lit in the cadre row', P => {
    let s = PK.sky(P, [[0, '#0b0a14'], [.4, '#2a1a2c'], [.7, '#6a3424'], [1, '#2a1610']]) + PK.stars(50, 5, 0, 110);
    s += PK.haze(P, 120, 26, '#8a4a5a', .35, 240, 300) + PK.haze(P, 80, 18, '#4a2a40', .4, 480, 240);
    s += PK.ridge(210, 24, 13, '#1c1416') + PK.skyline(P, 480, 620, 206, 23, {fill: '#140e10', lit: '#ff8a3a', p: .04, h: 26, roofs: false});
    for (let i = 0; i < 3; i++) s += PK.smoke(P, 500 + i * 40, 200, 110, 12, 30, '#2a1e20', .45, 50 + i);
    s += PK.ridge(250, 12, 14, '#130e0e');
    s += PK.tents(P, 10, 640, 252, 3, 14, .9, '#3a3028', .08, 7);
    s += `<rect x="420" y="232" width="34" height="18" fill="#221a16"/><path d="M416 232 L437 218 L458 232 Z" fill="#2a201a"/>` + PK.lamp(P, 437, 242, 2.4, '#ffb050', 3);
    s += PK.ridge(330, 8, 15, '#0c0908') + PK.grass(180, 16, 310, 400, '#3a2a20', .6) + PK.stones(40, 17, 320, 400, '#000', .4);
    s += PK.back(520, 404, .48, B({rim: '#c08070', cloak: '#26201e', kit: 'none'}));
    return s; });
  PK.plate('chapters/gotm/2', 'Chapter Two: grass to every horizon on the Rhivi Plain, one wagon on it, and the sky empty', P => {
    let s = PK.sky(P, [[0, '#2a2c4a'], [.5, '#a06a4a'], [.82, '#e8b070'], [1, '#c08a50']]);
    s += PK.sun(P, 470, 236, 22, '#ffd890', .9) + PK.haze(P, 200, 12, '#ffe0b0', .25, 260, 300);
    s += PK.ridge(240, 3, 21, '#6a4a34', .3) + PK.ridge(256, 4, 22, '#4a3424', .4);
    s += `<rect y="262" width="660" height="138" fill="${P.lin([[0, '#5a3e24'], [1, '#2a1c10']])}"/>`;
    s += PK.wagon(250, 262, .9, '#1c140c', true);
    s += `<path d="M20 340 Q180 300 250 262" stroke="#7a5a38" stroke-width="2" fill="none" opacity=".4"/>`;
    s += PK.grass(500, 23, 260, 400, '#8a6a3a', .55, 4) + PK.grass(160, 24, 330, 400, '#c09a5a', .35, 5);
    s += TK.bird(380, 120, 1, true, '#2a1e1c');
    return s; });
  PK.plate('chapters/gotm/3', 'Chapter Three: Darujhistan at dusk from the Worry Gate road, blue lamps coming on along the walls, and Moon\'s Spawn over the lake', P => {
    let s = PK.sky(P, [[0, '#0a0c1c'], [.5, '#2a2a4a'], [.8, '#6a4a5a'], [1, '#3a2a3a']]) + PK.stars(40, 7, 0, 90);
    s += PK.spawn(P, 420, 26, 170, {under: '#5a8ad8', seed: 9, lights: 0});
    s += PK.skyline(P, 60, 600, 230, 31, {fill: '#14182a', lit: '#8ec8ff', p: .12, h: 70, domes: .2, towers: .15, spires: true});
    s += PK.wall(0, 660, 236, 290, '#10131e', {cw: 7, towers: [80, 230, 400, 560], gx: 330, gw: 30, gh: 40, edge: '#5a6a9a'});
    for (let i = 0; i < 9; i++) s += PK.lamp(P, 30 + i * 74, 232, 1.8, '#8ec8ff', i);
    s += `<rect y="288" width="660" height="112" fill="#0c0c12"/><path d="M300 290 L250 400 L410 400 L360 290 Z" fill="#1a1820"/>`;
    s += PK.gaslamp(P, 278, 330, 40, 1) + PK.gaslamp(P, 384, 330, 40, 2) + PK.grass(80, 33, 300, 400, '#2a2a34', .6);
    s += PK.back(150, 404, .5, B({rim: '#8ec8ff', cloak: '#22242c', kit: 'xbow'})) + PK.back(520, 404, .46, B({rim: '#8ec8ff', head: 'hood', cloak: '#1e2026', flip: true}));
    return s; });
  PK.plate('chapters/gotm/4', 'Chapter Four: slate and chimney-pots under a blue haze, a squadmate low on the ridge, and above them a black mountain with no light in its windows', P => {
    let s = PK.sky(P, [[0, '#04060e'], [.6, '#101a30'], [1, '#1a2a44']]) + PK.stars(70, 9, 0, 160);
    s += PK.spawn(P, 470, 10, 200, {under: '#3a5a90', seed: 11});
    s += PK.haze(P, 260, 50, '#4a7ac0', .35, 330, 380);
    s += PK.skyline(P, -10, 680, 270, 41, {fill: '#0e1220', lit: '#8ec8ff', p: .06, h: 50, domes: .12});
    const roof = (x0, x1, y, pk, col) => `<path d="M${x0} 400 L${x0} ${y} L${(x0 + x1) / 2} ${pk} L${x1} ${y} L${x1} 400 Z" fill="${col}"/>`;
    s += roof(-20, 260, 330, 286, '#0a0d16') + roof(220, 520, 340, 300, '#080a12') + roof(480, 700, 330, 290, '#0a0d16');
    let slate = ''; for (let i = 0; i < 12; i++) slate += `M${-20 + i * 24} ${330 + i * .5}L${120} ${286 + i * 3.6}`; s += `<path d="${slate}" stroke="#1a2236" stroke-width=".8" opacity=".6"/>`;
    for (const [x, y] of [[60, 302], [190, 300], [300, 318], [440, 314], [560, 302], [620, 312]]) s += `<rect x="${x}" y="${y - 22}" width="10" height="24" fill="#070910"/><rect x="${x - 2}" y="${y - 24}" width="14" height="4" fill="#0c0f18"/>`;
    s += `<path d="M-20 330 L120 286 L260 330" stroke="#4a6aa0" stroke-width="1" fill="none" opacity=".5"/><path d="M220 340 L370 300 L520 340" stroke="#4a6aa0" stroke-width="1" fill="none" opacity=".35"/>`;
    s += `<g transform="translate(372 300) scale(.9)" fill="#020306"><path d="M-14 0 Q-16 -18 -6 -26 Q4 -30 10 -20 L14 0 Z"/><circle cx="2" cy="-32" r="6"/><path d="M10 -18 L26 -24" stroke="#8090b0" stroke-width="1.6"/></g>`;
    s += PK.lamp(P, 90, 360, 2, '#e8a050', 4) + PK.lamp(P, 600, 366, 2, '#e8a050', 5);
    return s; });
  PK.plate('chapters/gotm/5', 'Chapter Five: brown hills folded on each other, barrow-stones on every crest, and no smoke anywhere', P => {
    let s = PK.sky(P, [[0, '#5a5c66'], [.6, '#9a948a'], [1, '#b0a490']]) + PK.haze(P, 90, 20, '#ffffff', .18, 300, 380);
    const L = [[170, 26, 51, '#8a7a66'], [210, 30, 52, '#6e5c48'], [250, 34, 53, '#56442f'], [300, 36, 54, '#3e3022'], [350, 30, 55, '#2a2018']];
    for (const [y, a, sd, c] of L) { s += PK.ridge(y, a, sd, c, .6); const st = 4; for (let i = 0; i < st; i++) { const x = 60 + hash(i, sd) * 540, yy = y - (.55 * Math.sin(x / 660 * 5.1 + hash(sd, 1) * 6.28) + .3 * Math.sin(x / 660 * 11.3 + hash(sd, 2) * 6.28)) * a, k = (y - 140) / 60; s += `<path d="M${PK.f(x - 2 * k)} ${PK.f(yy + 1)} L${PK.f(x - 1.6 * k)} ${PK.f(yy - 7 * k)} L${PK.f(x + 1.4 * k)} ${PK.f(yy - 8 * k)} L${PK.f(x + 2 * k)} ${PK.f(yy + 1)} Z" fill="${c === '#2a2018' ? '#14100c' : '#2a221a'}" opacity=".85"/>`; } }
    s += `<path d="M150 400 Q190 300 214 280 Q230 300 270 400 Z" fill="#1c1610"/><path d="M196 330 L196 300 Q212 286 228 300 L228 330 Z" fill="#050404"/>`;
    s += `<g class="pk-fl"><ellipse cx="205" cy="310" rx="2.2" ry="1.2" fill="#d0402a"/><ellipse cx="219" cy="310" rx="2.2" ry="1.2" fill="#d0402a"/></g>`;
    s += PK.grass(220, 56, 330, 400, '#5a4a30', .6) + PK.stones(30, 57, 340, 400, '#100c08', .5);
    s += PK.back(480, 404, .48, B({rim: '#d8d0c0', cloak: '#3a3226', kit: 'spear'}));
    return s; });
  PK.plate('chapters/gotm/6', 'Chapter Six: paper lanterns in every colour but blue over the Fete streets, masks on every door, and over the lake a black mountain nobody has dressed', P => {
    let s = PK.sky(P, [[0, '#0a0610'], [.6, '#24101c'], [1, '#3a1a20']]) + PK.stars(30, 11, 0, 70);
    s += PK.spawn(P, 330, 4, 160, {under: '#c06a4a', seed: 13});
    const h1 = `<path d="M0 400 L0 120 L60 110 L80 130 L150 126 L170 400 Z" fill="#140a10"/>`, h2 = `<path d="M660 400 L660 116 L600 108 L580 128 L500 124 L486 400 Z" fill="#140a10"/>`;
    s += PK.skyline(P, 160, 500, 280, 61, {fill: '#1a0e14', lit: '#e8a050', p: .3, h: 60, domes: .2});
    s += h1 + h2;
    for (const [x, y, w, h] of [[20, 160, 20, 26], [100, 170, 20, 26], [20, 240, 20, 26], [100, 250, 20, 26], [520, 160, 20, 26], [610, 170, 20, 26], [520, 240, 20, 26], [610, 250, 20, 26]]) s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e09050" opacity=".55" class="pk-fl"/>`;
    s += `<path d="M30 400 L30 320 Q60 300 90 320 L90 400 Z M570 400 L570 320 Q600 300 630 320 L630 400 Z" fill="#070407"/>`;
    const mask = (x, y, c, k) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-14 -10 Q0 -18 14 -10 Q16 4 0 14 Q-16 4 -14 -10 Z" fill="${c}"/><ellipse cx="-6" cy="-4" rx="3.6" ry="2" fill="#0a0408"/><ellipse cx="6" cy="-4" rx="3.6" ry="2" fill="#0a0408"/></g>`;
    s += mask(60, 300, '#d8862a', 1) + mask(600, 300, '#cfc4a8', 1) + mask(130, 214, '#c8443a', .7) + mask(530, 214, '#e0c070', .7);
    const cols = ['#e8883a', '#c8443a', '#e0b050', '#c060a0', '#7ac060', '#e0e0d0'];
    s += PK.lanterns(P, 150, 130, 500, 128, 26, 11, cols, 61) + PK.lanterns(P, 160, 190, 490, 188, 30, 10, cols, 62) + PK.lanterns(P, 0, 120, 160, 128, 10, 4, cols, 63) + PK.lanterns(P, 500, 126, 660, 118, 10, 4, cols, 64);
    s += `<rect y="340" width="660" height="60" fill="#0c0608"/>` + PK.column(170, 345, 490, 345, 16, .9, .9, '#050305', 7, {spears: 0});
    return s; });
  PK.plate('chapters/gotm/7', 'Chapter Seven: the Lakefront at first light, blue lamps going out along the quay, gulls on the pilings, and a sky with nothing in it', P => {
    let s = PK.sky(P, [[0, '#3a4a6a'], [.55, '#c09aa0'], [.85, '#f0d0a0'], [1, '#f4dcb0']]);
    s += PK.sun(P, 500, 214, 14, '#fff0c0', .7) + PK.haze(P, 200, 14, '#ffe8c8', .4, 400, 300);
    s += PK.ridge(214, 6, 71, '#6a6a80', .4) + PK.ridge(218, 3, 72, '#4a4a60', .3);
    s += PK.water(P, 218, '#8a8a9a', '#2a3040', {reflect: [[500, '#fff0c0', 24]], line: '#f0dcc0', op: .3});
    s += `<path d="M0 270 L330 262 L330 276 L0 290 Z" fill="#1a1c24"/><rect x="0" y="282" width="330" height="118" fill="#141620"/>`;
    for (let i = 0; i < 6; i++) { const x = 30 + i * 52, y = 270 - i * 1.4; s += `<rect x="${x}" y="${y - 28}" width="5" height="${30 + i}" fill="#0c0e14"/>` + (i % 2 === 0 ? PK.lamp(P, x + 2.5, y - 30, 1.4, '#8ec8ff', i, false) : `<circle cx="${x + 2.5}" cy="${y - 30}" r="1.4" fill="#3a4a5a"/>`); }
    for (let i = 0; i < 6; i++) { const x = 360 + i * 46, y = 300 + (i % 2) * 8; s += `<rect x="${x}" y="${y - 30}" width="6" height="${100}" fill="#1a1c26"/><path d="M${x - 5} ${y - 32} q4 -6 8 -2 q3 -4 7 0 l-2 4 l-11 0 Z" fill="#d8d8e0"/>`; }
    s += TK.bird(420, 150, 1.1, true, '#2a2a3a') + TK.bird(460, 132, .8, false, '#2a2a3a');
    s += PK.back(170, 404, .48, B({rim: '#ffe0b0', cloak: '#2a2e38', kit: 'none'}));
    return s; });
}
