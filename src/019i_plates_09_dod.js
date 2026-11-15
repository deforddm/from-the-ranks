/* ============ Book Nine's chapter plates (v13.6, 019i): Dust of Dreams, seven chapters ============
   Each draws its chapter's opening caption (src/16x): 1 the barracks yard at dusk, gate open, kit in heaps, soldiers going out in twos and
   threes; 2 the plain outside the landward gate, the escort's tents, the train behind, lamps at the tailboards; 3 files on a dust track at
   evening, wagons behind, the column's long shadow; 4 the train drawn in for the night on open country, cook-fires low, a red sky over
   nothing; 5 files on the track and a sun going down on a plain with nothing on it; 6 first light, the escort forming its line, a brown
   smear low on the northern sky; 7 the heavies' shields in a line late in the day, burned wagons at one end, a wall of dust in front with
   shapes in it taller than any soldier (shapes only, never drawn plain). */
{
  const M = (o) => Object.assign({fill: '#5a4c3a', dark: '#2a2018', rim: '#fff0d0', helmc: '#6a5a46', packc: '#4a3a28', roll: '#6a5236', kit: 'spear', head: 'helm', cloak: '#3a2e22', dust: '#a89878', shaft: '#4a3826'}, o);
  const L = (o) => Object.assign({fill: '#34405a', dark: '#161c28', rim: '#e0e4f0', helmc: '#3c4456', packc: '#2a2620', roll: '#4a4030', kit: 'spear', head: 'cap', dust: '#a89878'}, o);
  const waste = P => P.lin([[0, '#a08a68'], [1, '#4a3a26']]);
  PK.plate('chapters/dod/1', 'Chapter One: a barracks yard in Letheras at dusk, its gate open, kit in heaps, and soldiers going out of it in twos and threes without looking back', P => {
    let s = PK.sky(P, [[0, '#1a1e34'], [.6, '#7a5a5a'], [1, '#c08a6a']]);
    s += PK.skyline(P, -10, 680, 150, 601, {fill: '#1a161c', lit: '#e8a850', p: .08, h: 40});
    s += `<rect x="-10" y="120" width="680" height="170" fill="#2a2220"/>`;
    for (let i = 0; i < 10; i++) s += `<rect x="${20 + i * 66}" y="150" width="18" height="24" fill="${hash(i, 602) < .3 ? '#e8a850' : '#0e0a0a'}"/>`;
    s += `<path d="M380 290 L380 210 Q440 180 500 210 L500 290 Z" fill="#c08a6a" opacity=".85"/><path d="M380 290 L380 210 Q440 180 500 210 L500 290" stroke="#14100e" stroke-width="6" fill="none"/><path d="M500 290 L540 260 L540 194 L500 210 Z" fill="#1a1410"/>`;
    s += PK.column(400, 288, 480, 284, 5, .9, .8, '#14100e', 31, {spears: .5});
    s += `<rect y="288" width="660" height="112" fill="${P.lin([[0, '#3a3028'], [1, '#14100c']])}"/>`;
    for (const [x, y, w] of [[90, 330, 60], [220, 352, 80], [560, 340, 70]]) { s += `<path d="M${x - w / 2} ${y} Q${x - w / 3} ${y - w * .35} ${x} ${y - w * .3} Q${x + w / 3} ${y - w * .4} ${x + w / 2} ${y} Z" fill="#2a221a"/>`; for (let i = 0; i < 4; i++) s += `<rect x="${PK.f(x - w / 3 + i * w / 6)}" y="${PK.f(y - w * .3 - 4)}" width="${PK.f(w / 7)}" height="${PK.f(w / 10)}" rx="2" fill="#3a2e22" transform="rotate(${PK.f((hash(i, x) - .5) * 30)} ${x} ${y})"/>`; }
    s += PK.back(150, 404, .48, M({kit: 'none', rim: '#ffc890', dust: ''}));
    return s; });
  PK.plate('chapters/dod/2', 'Chapter Two: the plain outside Letheras\' landward gate, the escort\'s tents in their rows, the supply train behind, and lamps going up at the tailboards', P => {
    let s = PK.sky(P, [[0, '#24284a'], [.55, '#8a6a6a'], [.85, '#e0a070'], [1, '#c08050']]);
    s += PK.skyline(P, 40, 260, 196, 611, {fill: '#2a2228', lit: '#e8a850', p: .05, h: 40}) + PK.wall(20, 280, 196, 214, '#2a2228', {cw: 6, gx: 150, gw: 20, gh: 18});
    s += `<rect y="212" width="660" height="188" fill="${P.lin([[0, '#5a4a3a'], [1, '#2a2018']])}"/>`;
    s += PK.tents(P, 280, 680, 224, 3, 10, .6, '#4a5068', .05, 612);
    for (let i = 0; i < 9; i++) { const x = 20 + i * 64, y = 300 + (i % 2) * 6; s += PK.wagon(x, y, .85, '#1e1812', '#8a8070', i) + PK.lamp(P, x + 20, y - 18, 1.6, '#ffc070', i); }
    s += PK.back(560, 404, .5, L({flip: true, rim: '#ffc890', dust: ''}));
    return s; });
  PK.plate('chapters/dod/3', 'Chapter Three: files of soldiers on a track that is mostly dust, wagons behind, and the long shadow of a column that has been walking since dawn', P => {
    let s = PK.sky(P, [[0, '#4a5a7a'], [.6, '#d0a888'], [1, '#e8c098']]) + PK.sun(P, 80, 210, 16, '#fff0c8', .8);
    s += PK.ridge(220, 5, 621, '#8a6e54', .4) + `<rect y="222" width="660" height="178" fill="${waste(P)}"/>`;
    s += PK.smoke(P, 400, 250, 60, 70, -20, '#e0c8a0', .4, 622);
    for (let f = 0; f < 3; f++) { const c = PK.column(120 + f * 20, 300 + f * 16, 640, 242 + f * 6, 30, .9 + f * .1, .35, '#2a1e14', 32 + f); s += c; }
    s += PK.wagon(600, 252, .4, '#2a1e14', '#8a7a62') + PK.wagon(640, 248, .35, '#2a1e14', '#8a7a62');
    s += PK.stones(70, 623, 230, 400, '#4a3a26', .45);
    return s; });
  PK.plate('chapters/dod/4', 'Chapter Four: the train\'s wagons drawn in for the night on open country, cook-fires lit low, and the sky going red over a land with nothing on it', P => {
    let s = PK.sky(P, [[0, '#1a1428'], [.5, '#6a2a2a'], [.85, '#d0603a'], [1, '#a04a2a']]);
    s += PK.ridge(240, 3, 631, '#3a1e18', .3) + `<rect y="242" width="660" height="158" fill="${P.lin([[0, '#4a2c1e'], [1, '#1a0e08']])}"/>`;
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28, x = 330 + Math.cos(a) * 230, y = 290 + Math.sin(a) * 34; s += PK.wagon(x, y, .55 + Math.sin(a) * .12, '#140a06', '#5a3a2a', i); }
    s += PK.fires(P, [[300, 290, .6], [360, 296, .6], [250, 300, .5], [420, 286, .5]]);
    s += PK.back(560, 404, .5, M({flip: true, rim: '#ff9a60', kit: 'none'}));
    return s; });
  PK.plate('chapters/dod/5', 'Chapter Five: files of soldiers on a dust track, wagons behind, and a sun going down on a plain with nothing on it', P => {
    let s = PK.sky(P, [[0, '#2a2a4a'], [.5, '#a06a4a'], [.85, '#f0b070'], [1, '#d08a50']]) + PK.sun(P, 330, 226, 20, '#ffe0a0', .9);
    s += PK.ridge(234, 2, 641, '#5a3a28', .2) + `<rect y="236" width="660" height="164" fill="${P.lin([[0, '#7a5a3a'], [1, '#2a1c10']])}"/>`;
    s += `<path d="M318 238 L342 238 L470 400 L190 400 Z" fill="#8a6a46" opacity=".5"/>`;
    s += PK.column(330, 242, 310, 340, 22, .25, .95, '#1e140a', 35, {jx: 40});
    s += PK.wagon(380, 250, .3, '#1e140a', '#6a5a46');
    s += PK.stones(60, 642, 240, 400, '#3a2614', .45) + PK.back(150, 404, .5, M({walk: 1, rim: '#ffc890'}));
    return s; });
  PK.plate('chapters/dod/6', 'Chapter Six: first light on a plain in the Wastes, the escort forming its line, and low on the northern sky a smear of brown that was not there last night', P => {
    let s = PK.sky(P, [[0, '#3a4a6a'], [.55, '#a8a0a0'], [.85, '#e8c8a0'], [1, '#d0b090']]);
    s += `<path d="M-10 236 Q100 200 220 214 Q330 190 460 210 Q560 196 670 220 L670 240 L-10 240 Z" fill="#8a6a4a" opacity=".55" filter="url(#${P.blur(8)})"/>`;
    s += PK.ridge(240, 3, 651, '#7a6a5a', .3) + `<rect y="242" width="660" height="158" fill="${waste(P)}"/>`;
    for (let r = 0; r < 2; r++) s += PK.column(-10, 290 + r * 24, 670, 286 + r * 24, 46, .6 + r * .2, .6 + r * .2, '#1e1a24', 36 + r, {lean: 0, spears: .9});
    s += PK.stones(60, 652, 250, 400, '#4a3a26', .4) + PK.back(560, 404, .5, L({rim: '#ffe0c0', flip: true}));
    return s; });
  PK.plate('chapters/dod/7', 'Chapter Seven: late in the day in the Wastes, the heavies\' shields in a line, burned wagons at one end, and a wall of dust in front with shapes in it taller than any soldier', P => {
    let s = PK.sky(P, [[0, '#5a3a2a'], [.5, '#a0603a'], [1, '#c08050']]);
    s += `<rect y="0" width="660" height="280" fill="${P.lin([[0, '#6a4a32', 0], [.4, '#8a5a3a', .9], [1, '#b08050']])}"/>`;
    for (let i = 0; i < 6; i++) { const x = 90 + i * 96 + hash(i, 661) * 30, h = 110 + hash(i, 662) * 40, f = PK.f; s += `<g opacity="${f(.22 + hash(i, 663) * .16)}" filter="url(#${P.blur(5)})" fill="#3a2418"><ellipse cx="${x}" cy="${f(268 - h * .55)}" rx="${f(h * .16)}" ry="${f(h * .3)}" transform="rotate(28 ${x} ${f(268 - h * .55)})"/><ellipse cx="${f(x + h * .2)}" cy="${f(268 - h * .86)}" rx="${f(h * .1)}" ry="${f(h * .06)}"/><path d="M${f(x - 8)} ${f(268 - h * .3)} L${f(x - 12)} 268 M${f(x + 8)} ${f(268 - h * .32)} L${f(x + 12)} 268" stroke="#3a2418" stroke-width="${f(h * .06)}"/></g>`; }
    for (let i = 0; i < 8; i++) s += PK.smoke(P, 40 + i * 84, 280, 130, 50, 10, '#b08050', .35, 664 + i);
    s += `<rect y="276" width="660" height="124" fill="${P.lin([[0, '#6a4a2c'], [1, '#2a1a0e']])}"/>`;
    for (let i = 0; i < 3; i++) s += `<g transform="translate(${40 + i * 50} ${300 - i * 4}) rotate(${-8 + i * 7})"><rect x="-22" y="-14" width="44" height="12" fill="#140a06"/><path d="M-14 -14 L-10 -26 M4 -14 L8 -24 M16 -14 L14 -22" stroke="#140a06" stroke-width="3"/><circle cx="-12" cy="-2" r="6" fill="none" stroke="#140a06" stroke-width="2"/></g>` + PK.smoke(P, 40 + i * 50, 286, 60, 10, 20, '#2a1a12', .5, 670 + i);
    let sh = ''; for (let i = 0; i < 22; i++) { const x = 200 + i * 20; sh += `<rect x="${x}" y="300" width="18" height="34" rx="2" fill="#2a2018" stroke="#0e0a06" stroke-width="1.6"/><circle cx="${x + 9}" cy="${317}" r="2.2" fill="#6a5a46"/><circle cx="${x + 9}" cy="${294}" r="5" fill="#2a2420"/>`; }
    s += sh + PK.back(330, 404, .55, M({kit: 'shield', head: 'helm', cloak: '', rim: '#ffb070', shieldc: '#3a2a1e'}));
    return s; });
}
