/* ============ Book Five's chapter plates (v13.6, 019i): Midnight Tides, seven chapters ============
   Each draws its chapter's opening caption (src/08x): 1 the Whitefinders' barracks at night, lamps in the windows, the canal over the wall;
   2 Trate's harbour after the wave, wrecks on the quays, fish on the cobbles, the lighthouse standing; 3 Kraig's Landing, three buildings
   and a dock, tents round them, barges three deep, the mountains close; 4 a military road gone to leaf litter under old trees, a company
   walking north; 5 a straight road through farm country burned to the root, a long file going south; 6 Brans Keep squat against its cliff,
   the lake grey beside it, the army drawn up in front; 7 Letheras at night, fires over the roofs in three places, starlings round a dark
   tower, the broken army coming in at the gate. The squad is Letherii: quilted coats, round padded caps. */
{
  const B = (o) => Object.assign({fill: '#34405a', dark: '#161c28', rim: '#e0e4f0', helmc: '#3c4456', packc: '#2a2620', roll: '#4a4030', kit: 'spear', head: 'cap', blade: '#b0b8c4'}, o);
  PK.plate('chapters/mt/1', 'Chapter One: lamps in the Whitefinders\' barracks windows, the canal over the wall, and a company asleep', P => {
    let s = PK.sky(P, [[0, '#05070e'], [.6, '#101828'], [1, '#1a2030']]) + PK.stars(50, 51, 0, 100);
    s += PK.skyline(P, -10, 680, 190, 321, {fill: '#0c1018', lit: '#e8b060', p: .06, h: 60, towers: .1});
    s += `<rect x="120" y="150" width="420" height="160" fill="#141a26"/><path d="M110 150 L330 110 L550 150 Z" fill="#10141e"/>`;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) { const x = 140 + c * 44, y = 172 + r * 40; s += hash(r * 9 + c, 322) < .55 ? `<rect x="${x}" y="${y}" width="16" height="22" fill="#e8a850" class="pk-fl" style="animation-delay:-${PK.f(hash(c, r) * 2.6)}s"/><circle cx="${x + 8}" cy="${y + 11}" r="22" fill="${P.glow('#e8a850')}" opacity=".35"/>` : `<rect x="${x}" y="${y}" width="16" height="22" fill="#06080c"/>`; }
    s += `<rect y="300" width="660" height="42" fill="#0e121a"/>` + `<path d="M-10 300 L670 300" stroke="#3a4458" stroke-width="1.2" opacity=".6"/>`;
    s += PK.water(P, 342, '#0e1420', '#04060a', {reflect: [[200, '#e8a850', 18], [460, '#e8a850', 18]], line: '#4a5a78', op: .3});
    s += PK.back(560, 404, .48, B({kit: 'none', flip: true, rim: '#e8b878'}));
    return s; });
  PK.plate('chapters/mt/2', 'Chapter Two: Trate harbour after the wave, wrecks on the quays, fish on the cobbles, and the lighthouse standing over it all', P => {
    let s = PK.sky(P, [[0, '#3a4a6a'], [.55, '#c08a6a'], [.85, '#f0c08a'], [1, '#d8a070']]);
    s += PK.water(P, 220, '#8a7a7a', '#2a3040', {reflect: [[150, '#ffd8a0', 30]], line: '#f0d0b0', op: .3});
    s += `<path d="M470 230 L480 90 L500 90 L510 230 Z" fill="#2a2228"/><rect x="474" y="76" width="32" height="16" fill="#2a2228"/><path d="M470 76 L490 62 L510 76 Z" fill="#2a2228"/>` + PK.lamp(P, 490, 84, 2.2, '#ffe0a0', 2);
    s += `<path d="M-10 270 L420 262 L560 270 L670 268 L670 400 L-10 400 Z" fill="#2a2420"/>`;
    let cb = ''; for (let i = 0; i < 160; i++) { const t = hash(i, 331), y = 272 + t * t * 128, x = hash(i, 332) * 680; cb += `<ellipse cx="${PK.f(x)}" cy="${PK.f(y)}" rx="${PK.f(2 + t * 7)}" ry="${PK.f(1 + t * 3)}"/>`; } s += `<g fill="#3a322c" opacity=".7">${cb}</g>`;
    let fish = ''; for (let i = 0; i < 26; i++) { const t = hash(i, 333), y = 280 + t * 110, x = hash(i, 334) * 640 + 10, k = .6 + t; fish += `<path d="M${PK.f(x)} ${PK.f(y)} q${PK.f(5 * k)} ${PK.f(-2 * k)} ${PK.f(10 * k)} 0 l${PK.f(3 * k)} ${PK.f(-2 * k)} l0 ${PK.f(4 * k)} l${PK.f(-3 * k)} ${PK.f(-2 * k)} q${PK.f(-5 * k)} ${PK.f(2 * k)} ${PK.f(-10 * k)} 0 Z"/>`; } s += `<g fill="#c8c0b0" opacity=".75">${fish}</g>`;
    s += `<g transform="translate(140 276) rotate(-14)"><path d="M-80 0 L70 -10 L60 12 L-70 18 Z" fill="#1e1814"/><path d="M-10 -6 L-30 -70" stroke="#1e1814" stroke-width="4"/></g><g transform="translate(370 268) rotate(9)"><path d="M-50 0 L40 -6 L32 10 L-44 12 Z" fill="#1e1814"/></g>`;
    s += PK.back(560, 404, .5, B({kit: 'none', flip: true, rim: '#ffd0a0'}));
    return s; });
  PK.plate('chapters/mt/3', 'Chapter Three: Kraig\'s Landing, three buildings and a dock, a regiment\'s tents round them, barges three deep, and the mountains very close', P => {
    let s = PK.sky(P, [[0, '#2a3048'], [.55, '#8a6a6a'], [1, '#d0a07a']]);
    s += `<path d="M-10 230 L60 90 L120 150 L190 60 L280 140 L360 50 L450 130 L520 80 L600 150 L670 110 L670 230 Z" fill="#3a3a4a"/><path d="M60 90 L80 120 L50 116 Z M190 60 L210 96 L176 90 Z M360 50 L384 90 L344 84 Z M520 80 L540 110 L508 108 Z" fill="#c8c8d8" opacity=".6"/>`;
    s += PK.ridge(220, 20, 341, '#22283a', 2) + `<rect y="226" width="660" height="174" fill="${P.lin([[0, '#2a3020'], [1, '#141810']])}"/>`;
    s += PK.tents(P, -10, 660, 238, 2, 22, .7, '#5a5444', .25, 342);
    for (const [x, w, h] of [[200, 60, 40], [280, 44, 34], [350, 54, 44]]) s += `<rect x="${x}" y="${276 - h}" width="${w}" height="${h}" fill="#1e1a16"/><path d="M${x - 4} ${276 - h} L${x + w / 2} ${276 - h - 18} L${x + w + 4} ${276 - h} Z" fill="#16120e"/>` + PK.lamp(P, x + w / 2, 276 - h / 2, 1.8, '#e8a850', x);
    s += PK.water(P, 290, '#3a4050', '#10141c', {reflect: [[260, '#e8a850', 16]], line: '#a8a8b8', op: .25}) + `<rect x="160" y="284" width="260" height="8" fill="#1a1612"/>`;
    for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) s += `<path d="M${180 + i * 60} ${300 + r * 16} L${226 + i * 60} ${300 + r * 16} L${220 + i * 60} ${310 + r * 16} L${186 + i * 60} ${310 + r * 16} Z" fill="#1a140e"/>`;
    s += PK.back(560, 404, .48, B({flip: true, rim: '#f0c090'}));
    return s; });
  PK.plate('chapters/mt/4', 'Chapter Four: a military road gone to leaf litter under old trees, a stream loud somewhere ahead, and a company walking north', P => {
    let s = PK.sky(P, [[0, '#a8b8a0'], [1, '#d8dcc0']]) + PK.haze(P, 160, 60, '#ffffe0', .5, 330, 200);
    for (let i = 0; i < 16; i++) s += PK.tree(hash(i, 351) * 680, 250, 160 + hash(i, 352) * 60, '#5a6a4a', 'old', i);
    s += `<rect y="246" width="660" height="154" fill="${P.lin([[0, '#4a4a2a'], [1, '#2a2414']])}"/>`;
    s += `<path d="M300 248 L360 248 L560 400 L100 400 Z" fill="#6a5434"/>`;
    let lv = ''; for (let i = 0; i < 260; i++) { const t = hash(i, 353), y = 250 + t * t * 150, x = 330 + (hash(i, 354) - .5) * (60 + t * t * 520); lv += `<ellipse cx="${PK.f(x)}" cy="${PK.f(y)}" rx="${PK.f(1 + t * 4)}" ry="${PK.f(.6 + t * 2)}" fill="${['#9a6a2a', '#7a4a1a', '#b08a3a'][i % 3]}"/>`; } s += `<g opacity=".8">${lv}</g>`;
    s += PK.column(330, 252, 310, 330, 14, .35, 1, '#1a1a14', 21, {jx: 22});
    for (let i = 0; i < 8; i++) s += PK.tree(i < 4 ? -30 + i * 50 : 480 + (i - 4) * 60, 420, 360, '#1a2014', 'old', i + 30);
    s += PK.back(470, 404, .5, B({walk: 1, rim: '#f0f0d0'}));
    return s; });
  PK.plate('chapters/mt/5', 'Chapter Five: a straight military road through farm country burned to the root on both sides, and a long file of soldiers on it going south', P => {
    let s = PK.sky(P, [[0, '#7a7a80'], [.6, '#b0aca0'], [1, '#c0b8a8']]);
    for (let i = 0; i < 4; i++) s += PK.smoke(P, 80 + i * 170, 210, 140, 24, 50, '#4a4448', .4, 360 + i);
    s += PK.ridge(210, 6, 361, '#4a4440', .4) + `<rect y="212" width="660" height="188" fill="${P.lin([[0, '#2a2420'], [1, '#100c0a']])}"/>`;
    let fr = ''; for (let r = 0; r < 14; r++) { const y = 216 + r * r * .9; fr += `M-10 ${PK.f(y)} L670 ${PK.f(y + 1)}`; } s += `<path d="${fr}" stroke="#3a2e26" stroke-width="1" opacity=".5"/>`;
    s += `<path d="M320 214 L340 214 L470 400 L190 400 Z" fill="#5a4e40"/>`;
    for (let i = 0; i < 6; i++) { const t = (i + 1) / 7, x = 330 + (i % 2 ? 1 : -1) * (40 + t * t * 260); s += PK.tree(x, 214 + t * t * 180, 30 + t * 80, '#0c0806', 'dead', i); }
    s += PK.column(330, 220, 330, 350, 22, .3, 1, '#14100c', 22, {jx: 26, spears: 0}); // v13.33: the file of the disarmed carries nothing that cuts
    s += PK.back(560, 404, .5, B({walk: 1, flip: true, rim: '#e0dcd0', kit: 'none'}));
    return s; });
  PK.plate('chapters/mt/6', 'Chapter Six: Brans Keep squat against its cliff, the lake grey beside it, and the whole army of Lether drawn up in front of its last great work', P => {
    let s = PK.sky(P, [[0, '#3a3a50'], [.6, '#8a7a7a'], [1, '#b09080']]);
    s += `<path d="M380 230 L400 100 L460 70 L560 80 L670 60 L670 230 Z" fill="#3a3436"/><path d="M400 100 L460 70 L560 80 L670 60" stroke="#c0b0a8" stroke-width="1" fill="none" opacity=".4"/>`;
    s += `<rect x="330" y="150" width="90" height="80" fill="#2a2426"/><rect x="345" y="126" width="24" height="30" fill="#2a2426"/><rect x="384" y="132" width="24" height="24" fill="#2a2426"/>` + PK.lamp(P, 356, 140, 1.4, '#e8a850', 1);
    s += PK.water(P, 222, '#6a6a74', '#3a3a44', {line: '#c0c0c8', op: .25, n: 30}).replace(`width="660"`, `width="330"`);
    s += `<rect x="330" y="222" width="340" height="178" fill="${P.lin([[0, '#3a3424'], [1, '#1a160e']])}"/><path d="M-10 270 L330 236 L670 236 L670 400 L-10 400 Z" fill="#2a2618"/>`;
    for (let r = 0; r < 4; r++) { const y = 254 + r * 22, k = .45 + r * .2; s += PK.column(20 + r * 10, y + 8, 640, y - 4, 40, k, k, '#141210', 23 + r, {lean: 0, spears: .8}); }
    s += PK.banner(200, 262, 40, '#141210', '#c0a040') + PK.banner(460, 252, 40, '#141210', '#c0a040');
    return s; });
  PK.plate('chapters/mt/7', 'Chapter Seven: Letheras at night, fires over the roofs in three places, starlings going round a dark tower, and the broken army coming in at the gate', P => {
    let s = PK.sky(P, [[0, '#06060c'], [.6, '#161420'], [1, '#2a1a1c']]) + PK.stars(40, 53, 0, 90);
    s += `<rect x="318" y="40" width="26" height="170" fill="#050407"/><path d="M314 40 L331 18 L348 40 Z" fill="#050407"/>`;
    let st = ''; for (let i = 0; i < 70; i++) { const a = hash(i, 371) * 6.28, r = 30 + hash(i, 372) * 60; st += TK.bird(331 + Math.cos(a) * r, 70 + Math.sin(a) * r * .5, .6, hash(i, 373) < .5, '#1a1820'); } s += st;
    for (const x of [140, 460, 560]) s += PK.haze(P, 190, 30, '#ff6a2a', .3, x, 70) + PK.smoke(P, x, 196, 120, 18, 40, '#3a2a2a', .5, x);
    s += PK.skyline(P, -10, 680, 216, 375, {fill: '#0c0a10', lit: '#e8a850', p: .1, h: 56, domes: .1, towers: .08});
    s += PK.wall(-10, 670, 236, 290, '#0a080c', {cw: 7, towers: [200, 460], gx: 330, gw: 44, gh: 50, gcol: '#3a2410', edge: '#8a5a3a'});
    s += `<path d="M308 290 L352 290 L520 400 L140 400 Z" fill="#14100c"/>` + PK.column(330, 300, 330, 380, 14, .4, .9, '#050407', 24, {lean: 4, spears: .2, jx: 30});
    s += PK.fires(P, [[300, 286, .5], [362, 286, .5]], .5);
    return s; });
}
