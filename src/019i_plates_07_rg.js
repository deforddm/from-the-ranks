/* ============ Book Seven's chapter plates (v13.6, 019i): Reaper's Gale, seven chapters ============
   Each draws its chapter's opening caption (src/12x): 1 the transports at anchor in the dark, a lamp at each stern, a pale beach beyond;
   2 the Whitefinders' barracks at night and two tall grey shapes at the gate (no faces); 3 a file of soldiers on a farm track in the dark,
   no lamps, the country asleep; 4 tents on the slopes below Kravos Hill at dusk, banners on its top, fires set apart on its shoulder;
   5 a road by night along a wide dark river, a line of small fires on the far ridge; 6 a plain cleared of its crops, a ridge with banners,
   the army drawn up and waiting; 7 Letheras' walls in the dark, the great gate shut, smoke beyond, the road out full of people. */
{
  const M = (o) => Object.assign({fill: '#3a3e44', dark: '#1a1c20', rim: '#d0d8e8', helmc: '#40444c', packc: '#2a2620', roll: '#4a4030', kit: 'none', head: 'helm'}, o);
  const L = (o) => Object.assign({fill: '#34405a', dark: '#161c28', rim: '#e0e4f0', helmc: '#3c4456', packc: '#2a2620', roll: '#4a4030', kit: 'spear', head: 'cap'}, o);
  PK.plate('chapters/rg/1', 'Chapter One: a long line of transports at anchor in the dark, a lamp at each stern, and a pale beach beyond them', P => {
    let s = PK.sky(P, [[0, '#03040a'], [.7, '#0c1020'], [1, '#141a2a']]) + PK.stars(120, 71, 0, 200);
    s += PK.ridge(196, 10, 501, '#0a0c12') + `<path d="M-10 212 Q330 200 670 214 L670 226 Q330 214 -10 226 Z" fill="#6a6858"/>`;
    s += PK.water(P, 224, '#101828', '#04060c', {line: '#4a5a7a', op: .3, reflect: [[110, '#ffc070', 10], [250, '#ffc070', 10], [380, '#ffc070', 10], [500, '#ffc070', 10]]});
    for (const [x, y, k] of [[100, 290, 1.4], [270, 264, 1], [400, 248, .75], [500, 240, .55], [580, 234, .42]]) s += PK.ship(P, x, y, k, '#04050a', '', '#ffc070', x);
    s += PK.back(600, 404, .48, M({rim: '#9ab0d8', flip: true, cloak: '#1a1c22'}));
    return s; });
  PK.plate('chapters/rg/2', 'Chapter Two: lamps in the Whitefinders\' barracks windows, the canal over the wall, and two tall grey shapes at the gate who are not Letherii', P => {
    let s = PK.sky(P, [[0, '#05070e'], [.6, '#101828'], [1, '#1a2030']]) + PK.stars(40, 73, 0, 100);
    s += `<rect x="60" y="120" width="420" height="190" fill="#141a26"/><path d="M50 120 L270 84 L490 120 Z" fill="#10141e"/>`;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) { const x = 80 + c * 44, y = 146 + r * 46; s += hash(r * 9 + c, 502) < .5 ? `<rect x="${x}" y="${y}" width="16" height="22" fill="#e8a850" class="pk-fl" style="animation-delay:-${PK.f(hash(c, r) * 2.6)}s"/>` : `<rect x="${x}" y="${y}" width="16" height="22" fill="#06080c"/>`; }
    s += `<rect x="-10" y="290" width="680" height="110" fill="#0e121a"/><path d="M-10 290 L670 290" stroke="#3a4458" stroke-width="1.2" opacity=".6"/>`;
    s += `<rect x="520" y="230" width="90" height="120" fill="#0a0c12"/><path d="M528 350 L528 268 Q565 240 602 268 L602 350 Z" fill="#2a2016"/>` + PK.lamp(P, 520, 240, 2, '#e8a850', 3) + PK.lamp(P, 610, 240, 2, '#e8a850', 4);
    for (const x of [548, 584]) s += `<g transform="translate(${x} 350)" fill="#4a4c54"><path d="M-8 0 L-9 -46 L-7 -70 L7 -70 L9 -46 L8 0 Z"/><circle cx="0" cy="-78" r="7"/><path d="M-12 -68 L-14 -30 M12 -68 L14 -30" stroke="#4a4c54" stroke-width="5"/></g>`;
    s += PK.back(170, 404, .48, L({kit: 'none', rim: '#e8b878'}));
    return s; });
  PK.plate('chapters/rg/3', 'Chapter Three: a file of soldiers on a farm track in the dark, no lamps, no talking, and a country asleep on either side', P => {
    let s = PK.sky(P, [[0, '#03040a'], [.7, '#0a0e1a'], [1, '#121626']]) + PK.stars(140, 75, 0, 200);
    s += PK.ridge(210, 14, 511, '#080a10') + `<rect y="214" width="660" height="186" fill="${P.lin([[0, '#0e1218'], [1, '#05060a']])}"/>`;
    for (const [x, y] of [[120, 214], [520, 220]]) s += `<rect x="${x}" y="${y - 18}" width="28" height="18" fill="#05060a"/><path d="M${x - 4} ${y - 18} L${x + 14} ${y - 30} L${x + 32} ${y - 18} Z" fill="#05060a"/>`;
    let fd = ''; for (let i = 0; i < 18; i++) { const y = 222 + i * i * .7; fd += `M-10 ${PK.f(y)} Q330 ${PK.f(y - 3)} 670 ${PK.f(y + 1)}`; } s += `<path d="${fd}" stroke="#1a2030" stroke-width="1" fill="none" opacity=".7"/>`;
    s += `<path d="M300 222 Q260 300 120 400 L260 400 Q300 300 320 222 Z" fill="#161a24"/>`;
    s += PK.column(316, 226, 200, 380, 16, .3, 1.1, '#020306', 27, {jx: 10});
    for (let i = 0; i < 6; i++) s += PK.tree(40 + i * 120, 236 + hash(i, 512) * 20, 50 + hash(i, 513) * 30, '#04050a', 'old', i);
    return s; });
  PK.plate('chapters/rg/4', 'Chapter Four: tents on the slopes below Kravos Hill at dusk, the commanders\' banners on its top, and fires on its shoulder set apart', P => {
    let s = PK.sky(P, [[0, '#1a1e34'], [.55, '#6a4a5a'], [.85, '#d08a5a'], [1, '#a0603a']]);
    s += `<path d="M120 400 Q200 220 330 160 Q420 140 470 170 Q560 220 640 260 L670 400 Z" fill="#1e1a1c"/><path d="M200 260 Q260 190 330 160 Q420 140 470 170" stroke="#d0905a" stroke-width="1" fill="none" opacity=".4"/>`;
    for (const x of [330, 370, 410]) s += PK.banner(x, 158, 30, '#0a0808', ['#6a2a2a', '#2a3a5a', '#4a4a2a'][(x / 40) % 3 | 0]);
    for (let i = 0; i < 5; i++) s += PK.fire(P, 520 + i * 14, 206 + i * 5, .7, '#ff8a3a', i);
    s += `<rect y="300" width="660" height="100" fill="#141012"/>` + PK.tents(P, -10, 670, 290, 4, 18, .9, '#2a2426', .15, 514);
    s += PK.back(110, 404, .5, M({rim: '#ffb080', kit: 'spear'}));
    return s; });
  PK.plate('chapters/rg/5', 'Chapter Five: a road by night along a wide dark river, and on the ridge to the north a line of small fires that are not the column\'s', P => {
    let s = PK.sky(P, [[0, '#03040a'], [.7, '#0e1220'], [1, '#161a28']]) + PK.stars(100, 77, 0, 160);
    s += PK.ridge(176, 20, 521, '#080a10');
    for (let i = 0; i < 18; i++) { const x = 60 + i * 30, t = x / 660, y = 176 - (.55 * Math.sin(t * 5.1 + hash(521, 1) * 6.28) + .3 * Math.sin(t * 11.3 + hash(521, 2) * 6.28) + .15 * Math.sin(t * 23.7 + hash(521, 3) * 6.28)) * 20; s += PK.lamp(P, x, y + 2, .9, '#ff8a3a', i); }
    s += `<rect y="196" width="660" height="40" fill="#0c0e14"/>` + PK.water(P, 236, '#141a26', '#05070c', {line: '#4a5a7a', op: .3, n: 50}).replace(/height="\d+"/, 'height="80"');
    s += `<path d="M-10 316 Q330 300 670 312 L670 400 L-10 400 Z" fill="#08090e"/><path d="M-10 316 Q330 300 670 312" stroke="#2a3040" stroke-width="2" fill="none"/>`;
    s += PK.column(40, 330, 620, 314, 30, .9, .7, '#020306', 28) + PK.grass(160, 522, 316, 400, '#2a3040', .5);
    return s; });
  PK.plate('chapters/rg/6', 'Chapter Six: a plain cleared of its crops before Letheras, a ridge with banners on it, and the whole army of Lether drawn up and waiting', P => {
    let s = PK.sky(P, [[0, '#0a0c18'], [.6, '#2a2a3a'], [1, '#4a3a3a']]) + PK.stars(40, 79, 0, 90);
    s += PK.ridge(200, 16, 531, '#14121a') + PK.crest(200, 16, 531, '#8a7a8a', 1, .4);
    for (let i = 0; i < 9; i++) { const x = 60 + i * 66, t = x / 660, y = 200 - (.55 * Math.sin(t * 5.1 + hash(531, 1) * 6.28) + .3 * Math.sin(t * 11.3 + hash(531, 2) * 6.28) + .15 * Math.sin(t * 23.7 + hash(531, 3) * 6.28)) * 16; s += PK.banner(x, y + 2, 20, '#0a080c', '#a08a3a'); }
    s += `<rect y="214" width="660" height="186" fill="${P.lin([[0, '#2a2420'], [1, '#100c0a']])}"/>`;
    let st = ''; for (let i = 0; i < 40; i++) { const y = 220 + i * i * .1 + i * 2; st += `M-10 ${PK.f(y)} L670 ${PK.f(y)}`; } s += `<path d="${st}" stroke="#3a3024" stroke-width=".8" opacity=".5"/>`;
    for (let r = 0; r < 3; r++) { const y = 228 + r * 14, k = .35 + r * .12; s += PK.column(-10, y, 670, y - 2, 60, k, k, '#08060a', 29 + r, {lean: 0, spears: .8}); }
    s += PK.fires(P, [[120, 300, .8], [400, 310, .9]]) + PK.back(520, 404, .5, M({rim: '#e8b080', kit: 'xbow', flip: true}));
    return s; });
  PK.plate('chapters/rg/7', 'Chapter Seven: the walls of Letheras in the dark, a great gate shut, smoke over the towers beyond, and the road out full of people going the other way', P => {
    let s = PK.sky(P, [[0, '#06060c'], [.6, '#1a1420'], [1, '#2a1a1a']]) + PK.stars(30, 81, 0, 70);
    for (let i = 0; i < 5; i++) s += PK.smoke(P, 120 + i * 100, 140, 140, 22, 40, '#3a2a2a', .5, 540 + i);
    s += PK.haze(P, 150, 30, '#ff6a2a', .25, 330, 300) + PK.skyline(P, -10, 680, 150, 541, {fill: '#0c0a10', lit: '#e8a850', p: .05, h: 70, towers: .25});
    s += PK.wall(-10, 670, 170, 270, '#0e0c12', {cw: 9, towers: [120, 260, 400, 540], tw: 26, th: 34, edge: '#6a4a3a'});
    s += `<path d="M296 270 L296 210 Q330 186 364 210 L364 270 Z" fill="#1a140e"/><path d="M330 192 L330 270 M296 236 L364 236" stroke="#06050a" stroke-width="3"/>`;
    s += `<path d="M300 270 L360 270 L540 400 L120 400 Z" fill="#14100e"/>`;
    s += PK.column(250, 290, 120, 400, 26, .5, 1.2, '#050407', 30, {jx: 60, spears: 0, lean: -3});
    s += PK.fires(P, [[270, 262, .5], [390, 262, .5]], .5);
    return s; });
}
