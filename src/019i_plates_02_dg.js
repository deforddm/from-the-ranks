/* ============ Book Two's chapter plates (v13.6, 019i): Deadhouse Gates, seven chapters ============
   Each draws its chapter's opening caption (src/047–054): 1 Hissar from the garrison wall, roofs burning in a ring and the ring closing;
   2 the column going on into the glare, its dust going up; 3 the column at dusk, riders on every skyline; 4 the column at dusk and, a long
   way behind, dust that does not settle; 5 the Vathar's old dark wood, mounds among the trees, a tower's top above the canopy far off;
   6 the hills above Sanimon at night, fires on every ridge; 7 a raised road going west between old mounds to Aren's walls on the sea-light.
   No canon figure is drawn; the soldiers in front are the squad's. */
{
  const B = (o) => Object.assign({fill: '#5a4a38', dark: '#2a2018', rim: '#f0d8a8', helmc: '#5a5048', packc: '#3a2e22', roll: '#5a4630', cloak: '', kit: 'none', head: 'wrap', helmc2: '', dust: '#a89070'}, o);
  PK.plate('chapters/dg/1', 'Chapter One: Hissar from the garrison wall, roofs on fire in a ring, and the ring closing', P => {
    let s = PK.sky(P, [[0, '#08060a'], [.5, '#2a1210'], [.8, '#7a2a14'], [1, '#3a160c']]) + PK.stars(30, 21, 0, 80);
    s += PK.haze(P, 230, 60, '#ff6a20', .4, 330, 360);
    s += PK.skyline(P, -10, 680, 270, 101, {fill: '#1a0e0a', lit: '#ff9a40', p: .18, h: 60, domes: .3, towers: .08, roofs: false});
    const ring = []; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.28, x = 330 + Math.cos(a) * 280, y = 262 + Math.sin(a) * 26; ring.push([x, y]); }
    for (let i = 0; i < 16; i++) { const [x, y] = ring[i]; s += PK.smoke(P, x, y, 140 + hash(i, 3) * 60, 18, 50, '#2a1612', .55, 100 + i) + PK.fire(P, x, y, 1.2, '#ff7a2a', i); }
    s += PK.wall(-10, 670, 320, 400, '#120c0a', {cw: 14, edge: '#e07a3a'});
    s += `<rect y="336" width="660" height="64" fill="#0c0806"/>`;
    s += PK.back(220, 404, .52, B({head: 'helm', rim: '#ff9a50', fill: '#3a302a', cloak: '#2a201a', kit: 'xbow', dust: ''})) + PK.back(470, 404, .48, B({head: 'helm', rim: '#ff9a50', fill: '#3a302a', kit: 'spear', dust: '', flip: true}));
    return s; });
  PK.plate('chapters/dg/2', 'Chapter Two: the column going on into the glare across the Odhan, and the dust going up off it', P => {
    let s = PK.sky(P, [[0, '#a8a090'], [.5, '#e8dcc0'], [1, '#f4ead0']]) + PK.sun(P, 380, 150, 26, '#fffaf0', .9);
    s += PK.haze(P, 200, 40, '#fff4e0', .6, 380, 360);
    s += PK.ridge(228, 6, 111, '#c8b494', .5) + PK.ridge(244, 8, 112, '#b49c78', .5);
    s += `<rect y="250" width="660" height="150" fill="${P.lin([[0, '#b09470'], [1, '#7a6040']])}"/>`;
    s += PK.smoke(P, 380, 236, 90, 40, 20, '#e0d0b0', .55, 113) + PK.column(130, 330, 380, 238, 34, 1.3, .3, '#3a2e22', 2);
    s += PK.wagon(300, 266, .5, '#3a2e22', true) + PK.wagon(250, 286, .7, '#3a2e22', true);
    s += PK.stones(70, 114, 260, 400, '#5a442c', .45) + PK.grass(140, 115, 270, 400, '#6a5434', .55, 3);
    s += PK.back(110, 404, .5, B({walk: 1, kit: 'spear'}));
    return s; });
  PK.plate('chapters/dg/3', 'Chapter Three: the column strung out across the Odhan at dusk, and on every skyline, riders', P => {
    let s = PK.sky(P, [[0, '#2a2440'], [.55, '#a0583a'], [.85, '#e09a5a'], [1, '#c0804a']]);
    s += PK.sun(P, 520, 226, 18, '#ffd8a0', .8);
    s += PK.ridge(226, 22, 121, '#5a3628') + PK.crest(226, 22, 121, '#ffb070', 1, .5);
    for (let i = 0; i < 14; i++) { const x = 30 + i * 46 + hash(i, 4) * 20, t = x / 660, y = 226 - (.55 * Math.sin(t * 5.1 + hash(121, 1) * 6.28) + .3 * Math.sin(t * 11.3 + hash(121, 2) * 6.28) + .15 * Math.sin(t * 23.7 + hash(121, 3) * 6.28)) * 22; s += PK.rider(x, y + 2, .55, '#1a100c', hash(i, 5) < .4, hash(i, 6) < .5); }
    s += PK.ridge(262, 10, 122, '#3a2418');
    s += `<rect y="268" width="660" height="132" fill="${P.lin([[0, '#4a3020'], [1, '#22160e']])}"/>`;
    s += PK.column(0, 320, 660, 284, 40, 1, .5, '#140c08', 3) + PK.wagon(200, 308, .7, '#140c08') + PK.wagon(430, 294, .55, '#140c08');
    s += PK.grass(160, 123, 280, 400, '#6a4a2a', .5);
    return s; });
  PK.plate('chapters/dg/4', 'Chapter Four: the column across the Odhan at dusk, and behind it, a long way off, dust that does not settle', P => {
    let s = PK.sky(P, [[0, '#1e1a30'], [.5, '#7a4a3a'], [.85, '#d08a50'], [1, '#a0603a']]);
    s += PK.ridge(240, 8, 131, '#4a3024', .5);
    for (let i = 0; i < 5; i++) s += PK.smoke(P, 60 + i * 40, 238, 150, 34, 30, '#8a5a3a', .4, 130 + i);
    s += PK.haze(P, 230, 30, '#c07a4a', .4, 140, 160);
    s += `<rect y="246" width="660" height="154" fill="${P.lin([[0, '#5a3a24'], [1, '#1e140c']])}"/>`;
    s += PK.column(260, 260, 660, 300, 30, .4, 1.1, '#140c08', 4) + PK.wagon(470, 290, .7, '#140c08') + PK.wagon(600, 304, .9, '#140c08');
    s += PK.stones(60, 132, 252, 400, '#20140c', .5) + PK.grass(120, 133, 260, 400, '#6a4a2a', .5);
    s += PK.back(560, 404, .5, B({kit: 'spear', flip: true, rim: '#ffb070'}));
    return s; });
  PK.plate('chapters/dg/5', 'Chapter Five: an old dark forest, mounds among the trees, and far off above the canopy the top of a tower', P => {
    let s = PK.sky(P, [[0, '#3a4048'], [.6, '#7a7a70'], [1, '#8a8670']]);
    s += `<path d="M452 140 L456 40 L462 34 L470 40 L474 140 Z" fill="#2a2c30"/><path d="M450 46 L476 46" stroke="#2a2c30" stroke-width="3"/>`;
    s += PK.ridge(150, 14, 141, '#2a3028', 2.5) + PK.ridge(190, 16, 142, '#1c221c', 2.5);
    let tr = ''; for (let i = 0; i < 22; i++) { const x = hash(i, 143) * 680 - 10, y = 260 + hash(i, 144) * 50; tr += PK.tree(x, y, 120 + hash(i, 145) * 80, '#0e120e', 'old', i); }
    s += tr + `<rect y="280" width="660" height="120" fill="#0c0f0c"/>`;
    for (const [x, w] of [[140, 70], [380, 90], [560, 60]]) s += `<path d="M${x - w / 2} 330 Q${x} ${330 - w * .45} ${x + w / 2} 330 Z" fill="#1a1e16"/><path d="M${x - w / 2} 330 Q${x} ${330 - w * .45} ${x + w / 2} 330" stroke="#5a6250" stroke-width="1" fill="none" opacity=".4"/>`;
    for (let i = 0; i < 6; i++) s += PK.tree(-30 + i * 140 + hash(i, 146) * 40, 420, 300, '#050705', 'old', i + 20);
    s += PK.haze(P, 290, 20, '#9aa290', .2, 330, 400) + PK.grass(140, 147, 330, 400, '#2a3226', .6);
    s += PK.back(300, 404, .48, B({walk: 1, rim: '#c0c8b0', dust: '', kit: 'spear'}));
    return s; });
  PK.plate('chapters/dg/6', 'Chapter Six: the hills above Sanimon at night, and fires on every ridge, more fires than there are stars', P => {
    let s = PK.sky(P, [[0, '#04040a'], [.6, '#0e0e1c'], [1, '#1c1420']]) + PK.stars(40, 23, 0, 120);
    const R = [[180, 24, 151, '#0e0c12'], [220, 28, 152, '#0b0a0e'], [270, 30, 153, '#08070a'], [320, 26, 154, '#050406']];
    let fi = 0;
    for (const [y, a, sd, c] of R) { s += PK.ridge(y, a, sd, c); const k = (y - 150) / 120;
      for (let i = 0; i < 22; i++) { const x = hash(i, sd + 9) * 660, t = x / 660, yy = y - (.55 * Math.sin(t * 5.1 + hash(sd, 1) * 6.28) + .3 * Math.sin(t * 11.3 + hash(sd, 2) * 6.28) + .15 * Math.sin(t * 23.7 + hash(sd, 3) * 6.28)) * a + 3;
        s += k < .6 ? PK.lamp(P, x, yy, .6 + k, '#ff9a40', fi++) : PK.fire(P, x, yy + 4, .5 + k * .4, '#ff8a30', fi++); } }
    s += PK.back(330, 404, .5, B({head: 'helm', fill: '#2a2420', rim: '#ff9a50', cloak: '#1e1814', dust: '', kit: 'none'}));
    return s; });
  PK.plate('chapters/dg/7', 'Chapter Seven: a raised road going away west between old mounds, and at the end of it, on the sea-light, the walls of Aren', P => {
    let s = PK.sky(P, [[0, '#2a2a44'], [.55, '#b07a5a'], [.82, '#f0c080'], [1, '#d09a60']]);
    s += PK.sun(P, 300, 196, 16, '#fff0c0', .8);
    s += `<rect y="196" width="660" height="20" fill="${P.lin([[0, '#f0d0a0'], [1, '#a08060']])}"/>`;
    s += PK.skyline(P, 250, 380, 204, 161, {fill: '#3a2e2e', lit: '#ffd090', p: .05, h: 20, domes: .3}) + PK.wall(230, 400, 200, 210, '#4a3a34', {cw: 3});
    s += `<rect y="210" width="660" height="190" fill="${P.lin([[0, '#6a4a34'], [1, '#2a1c12']])}"/>`;
    s += `<path d="M300 212 L360 212 L560 400 L60 400 Z" fill="#3a2a1e"/><path d="M300 212 L60 400 M360 212 L560 400" stroke="#c09060" stroke-width="1.4" opacity=".4"/>`;
    for (const [x, y, w] of [[130, 250, 50], [470, 246, 44], [40, 300, 90], [600, 310, 100], [200, 226, 26], [420, 224, 24]]) s += `<path d="M${x - w / 2} ${y} Q${x} ${y - w * .4} ${x + w / 2} ${y} Z" fill="#2a1c12"/>`;
    s += PK.column(326, 216, 300, 300, 12, .25, .9, '#1a120c', 5, {jx: 22}) + PK.grass(140, 162, 220, 400, '#7a5a3a', .45);
    s += PK.back(560, 404, .5, B({kit: 'spear', flip: true, walk: 1}));
    return s; });
}
