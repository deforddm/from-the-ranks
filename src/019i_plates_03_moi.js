/* ============ Book Three's chapter plates (v13.6, 019i): Memories of Ice, seven chapters ============
   Each draws its chapter's opening caption (src/06x): 1 mud and new grass outside Pale, the Host's tent lines, another army's smoke across
   the valley; 2 the Rhivi Plain in spring, two armies on it and the herds between; 3 Capustan's walls and domes on their low hill over the
   river, smoke going up into the dark; 4 a plain filled to the horizon with people sitting down, a ditch and stake line, the guards' fires
   this side; 5 the broken bridge on the trader road over a mile of brown ford churned to mud; 6 a field at night, a dark row of quorls, men
   walking out to them with packs; 7 Coral from the mountains at night, the keep on its height, fires in rings, the sea black behind. */
{
  const B = (o) => Object.assign({fill: '#3a3a3a', dark: '#1a1a1c', rim: '#e0d8c8', helmc: '#3e424a', packc: '#2a241c', cloak: '', kit: 'none', head: 'helm'}, o);
  const quorl = (x, y, k, fill, up = 0) => { const f = PK.f; return `<g transform="translate(${f(x)} ${f(y)}) scale(${k})"><g fill="#3a4258" fill-opacity=".35" stroke="#8a9ab8" stroke-width=".5" stroke-opacity=".5"><ellipse cx="-6" cy="-20" rx="5" ry="15" transform="rotate(${-30 - up} -4 -6)"/><ellipse cx="2" cy="-21" rx="5" ry="16" transform="rotate(${-12 - up} 2 -6)"/><ellipse cx="-8" cy="-19" rx="4" ry="13" transform="rotate(${-52 - up} -6 -6)"/><ellipse cx="4" cy="-19" rx="4" ry="13" transform="rotate(${8 - up} 4 -6)"/></g><path d="M-34 -5 Q-10 -9 18 -7 L24 -6 L18 -3 Q-10 -2 -34 -4 Z" fill="${fill}"/><circle cx="22" cy="-6" r="3.4" fill="${fill}"/><path d="M-6 -3 L-8 6 M6 -3 L8 6" stroke="${fill}" stroke-width="1.2"/></g>`; };
  PK.plate('chapters/moi/1', 'Chapter One: mud outside Pale with new grass through it, the Host\'s tent lines, and across the valley another army\'s smoke', P => {
    let s = PK.sky(P, [[0, '#6a7890'], [.6, '#b8bcc0'], [1, '#c8c4b8']]) + PK.haze(P, 100, 22, '#ffffff', .25, 330, 360);
    s += PK.ridge(196, 20, 171, '#6a6e66', .6) + PK.ridge(214, 14, 172, '#585c50', .6);
    s += PK.tents(P, 380, 640, 214, 1, 14, .45, '#6a6458', 0, 173);
    for (let i = 0; i < 6; i++) s += PK.smoke(P, 400 + i * 40, 210, 90, 10, 30, '#8a8a88', .45, 174 + i);
    s += PK.ridge(250, 10, 175, '#4a4a3a', .5) + `<rect y="252" width="660" height="148" fill="${P.lin([[0, '#4a4234'], [1, '#2a2218']])}"/>`;
    s += PK.tents(P, -20, 420, 262, 3, 10, 1, '#7a705e', .1, 176);
    s += PK.grass(400, 177, 260, 400, '#6a8a44', .6) + PK.stones(50, 178, 300, 400, '#1e180e', .4);
    s += `<path d="M380 400 Q420 330 520 300 Q600 280 680 290" stroke="#2a2014" stroke-width="18" fill="none" opacity=".5"/>`;
    s += PK.back(540, 404, .5, B({cloak: '#4a4236', kit: 'spear', rim: '#f0ece0'}));
    return s; });
  PK.plate('chapters/moi/2', 'Chapter Two: grass to the edge of the world on the Rhivi Plain, two armies on it, and the herds between them', P => {
    let s = PK.sky(P, [[0, '#4a6a9a'], [.6, '#a8c0d4'], [1, '#d0d8d0']]);
    for (let i = 0; i < 5; i++) s += PK.haze(P, 50 + i * 22, 10, '#ffffff', .35, 60 + i * 140, 120);
    s += PK.ridge(230, 4, 181, '#6a7a54', .3) + `<rect y="232" width="660" height="168" fill="${P.lin([[0, '#6a7a44'], [1, '#3a4420']])}"/>`;
    s += PK.tents(P, 10, 170, 238, 2, 8, .38, '#4a4438', 0, 182) + PK.tents(P, 500, 650, 238, 2, 8, .38, '#4a4438', 0, 183);
    for (let i = 0; i < 4; i++) s += PK.smoke(P, 40 + i * 40, 236, 60, 6, 20, '#8a8a80', .35, 184 + i) + PK.smoke(P, 520 + i * 36, 236, 60, 6, 20, '#8a8a80', .35, 188 + i);
    let hd = ''; for (let i = 0; i < 90; i++) { const x = 190 + hash(i, 190) * 290, y = 246 + hash(i, 191) * 40, k = .5 + (y - 246) / 40 * .6; hd += `<ellipse cx="${PK.f(x)}" cy="${PK.f(y)}" rx="${PK.f(5 * k)}" ry="${PK.f(2.6 * k)}"/><circle cx="${PK.f(x + 5 * k)}" cy="${PK.f(y - 1)}" r="${PK.f(1.6 * k)}"/>`; }
    s += `<g fill="#2a2014">${hd}</g>` + PK.haze(P, 270, 14, '#c8b890', .3, 330, 160);
    s += PK.grass(500, 192, 240, 400, '#8aa050', .55, 4) + PK.grass(120, 193, 330, 400, '#c0c880', .3, 4);
    return s; });
  PK.plate('chapters/moi/3', 'Chapter Three: Capustan\'s walls and domes on a low hill over the river, and the smoke going up off them into the dark', P => {
    let s = PK.sky(P, [[0, '#06060c'], [.6, '#1a1420'], [1, '#2a1a1c']]) + PK.stars(50, 31, 0, 120);
    s += PK.haze(P, 170, 50, '#ff6a2a', .45, 330, 220);
    s += `<path d="M120 260 Q200 196 330 186 Q460 196 560 260 Z" fill="#100c10"/>`;
    s += PK.skyline(P, 190, 470, 196, 201, {fill: '#0a0608', lit: '#ff9a50', p: .12, h: 64, domes: .5, towers: .1, roofs: false});
    s += PK.wall(170, 490, 222, 246, '#0e0a0e', {cw: 6, towers: [200, 300, 400, 470], edge: '#a0603a'});
    for (let i = 0; i < 7; i++) s += PK.smoke(P, 220 + i * 38, 190, 150, 16, 40, '#3a2c30', .5, 202 + i);
    s += PK.water(P, 270, '#14121a', '#06060a', {reflect: [[330, '#ff8a40', 50]], line: '#6a5a6a', op: .2});
    s += `<path d="M0 270 L660 270" stroke="#3a2a2a" stroke-width="1"/><path d="M0 330 Q200 316 330 320 Q460 326 660 314 L660 400 L0 400 Z" fill="#06050a"/>`;
    s += PK.tents(P, 20, 640, 336, 1, 16, .8, '#1a1418', .2, 203);
    s += PK.back(180, 404, .5, B({cloak: '#2a2424', kit: 'spear', rim: '#ffa060'}));
    return s; });
  PK.plate('chapters/moi/4', 'Chapter Four: a plain filled to the horizon with people sitting down, a ditch and a stake line along its edge, and the guards\' fires on the near side', P => {
    let s = PK.sky(P, [[0, '#1c1c2a'], [.6, '#5a4a4a'], [1, '#8a6a5a']]);
    s += `<rect y="214" width="660" height="186" fill="${P.lin([[0, '#4a3a32'], [1, '#1a1410']])}"/>`;
    let pp = ''; for (let i = 0; i < 520; i++) { const t = Math.pow(hash(i, 211), 1.6), y = 216 + t * 90, x = hash(i, 212) * 680 - 10, k = .25 + t * .9; pp += `<path d="M${PK.f(x - 3 * k)} ${PK.f(y)} Q${PK.f(x)} ${PK.f(y - 8 * k)} ${PK.f(x + 3 * k)} ${PK.f(y)} Z"/><circle cx="${PK.f(x)}" cy="${PK.f(y - 9 * k)}" r="${PK.f(1.7 * k)}"/>`; }
    s += `<g fill="#140e0c">${pp}</g>` + PK.haze(P, 222, 8, '#8a6a5a', .4, 330, 380);
    s += `<path d="M-10 316 Q330 306 670 318 L670 330 Q330 318 -10 328 Z" fill="#0a0806"/>`;
    let st = ''; for (let i = 0; i < 40; i++) { const x = i * 17 - 4; st += `M${x} 312 L${x + 3} 296`; } s += `<path d="${st}" stroke="#1a120c" stroke-width="2.4" stroke-linecap="round"/>`;
    s += `<rect y="330" width="660" height="70" fill="#120e0a"/>` + PK.fires(P, [[90, 352, 1], [300, 360, 1.1], [520, 350, 1]]);
    s += PK.back(400, 404, .5, B({cloak: '#2a2420', kit: 'spear', rim: '#ffa060', flip: true}));
    return s; });
  PK.plate('chapters/moi/5', 'Chapter Five: the broken bridge on the trader road, and below it a mile of brown ford churned to mud by two armies', P => {
    let s = PK.sky(P, [[0, '#6a7a8a'], [.6, '#b0b0a8'], [1, '#c0b8a0']]);
    s += PK.ridge(180, 20, 221, '#6a6a5a', .5) + PK.ridge(204, 14, 222, '#5a5a48', .6);
    s += `<rect y="210" width="660" height="190" fill="${P.lin([[0, '#6a5438'], [1, '#3a2a18']])}"/>`;
    let ruts = ''; for (let i = 0; i < 70; i++) { const t = hash(i, 223), y = 214 + t * t * 180, x = hash(i, 224) * 660, w = 10 + t * 70; ruts += `M${PK.f(x)} ${PK.f(y)}q${PK.f(w / 2)} ${PK.f(-2 - t * 3)} ${PK.f(w)} 0`; }
    s += `<path d="${ruts}" stroke="#2a1c10" stroke-width="1.4" fill="none" opacity=".6"/>`;
    let pools = ''; for (let i = 0; i < 16; i++) { const t = hash(i, 225), y = 220 + t * t * 160, x = hash(i, 226) * 660; pools += `<ellipse cx="${PK.f(x)}" cy="${PK.f(y)}" rx="${PK.f(8 + t * 40)}" ry="${PK.f(1.5 + t * 5)}" fill="#8a96a0" opacity=".4"/>`; }
    s += pools;
    s += `<path d="M-10 236 L170 232 L170 246 L-10 252 Z" fill="#3a3028"/><path d="M170 232 L182 240 L176 244 L170 246 Z" fill="#3a3028"/>`;
    for (const x of [30, 90, 150]) s += `<path d="M${x} 248 Q${x + 4} 230 ${x + 22} 238 L${x + 22} 300 L${x} 300 Z" fill="#2a221a"/>`;
    s += `<path d="M560 230 L670 226 L670 240 L548 244 Z" fill="#3a3028"/><rect x="590" y="240" width="18" height="60" fill="#2a221a"/>`;
    let bl = ''; for (let i = 0; i < 8; i++) bl += `<rect x="${PK.f(200 + hash(i, 227) * 300)}" y="${PK.f(270 + hash(i, 228) * 60)}" width="${PK.f(8 + hash(i, 229) * 10)}" height="5" fill="#2a221a" transform="rotate(${PK.f((hash(i, 230) - .5) * 40)} 300 300)"/>`;
    s += bl + PK.column(340, 236, 520, 290, 16, .35, .7, '#22180e', 6);
    s += PK.back(110, 404, .5, B({cloak: '#3a3226', kit: 'spear', walk: 1, dust: '#6a5034'}));
    return s; });
  PK.plate('chapters/moi/6', 'Chapter Six: a field at night, a dark row of winged quorls on it, and soldiers walking out to them with their packs on', P => {
    let s = PK.sky(P, [[0, '#04050c'], [.6, '#0e1222'], [1, '#1a2030']]) + PK.stars(110, 41, 0, 200) + PK.moon(P, 540, 70, 12, '#d0d8e8');
    s += PK.ridge(220, 14, 241, '#0c0e16') + `<rect y="230" width="660" height="170" fill="${P.lin([[0, '#141824'], [1, '#08090e']])}"/>`;
    for (let i = 0; i < 8; i++) s += quorl(70 + i * 76, 262 + (i % 2) * 8, 1.6, '#04050a', 4 + (i % 3) * 3);
    s += PK.column(140, 330, 560, 280, 18, 1.1, .6, '#04050a', 7, {spears: .2});
    s += PK.grass(200, 242, 240, 400, '#3a4258', .45);
    s += PK.back(330, 404, .52, B({cloak: '#1e222c', kit: 'xbow', walk: 1, rim: '#b8c8e8'}));
    return s; });
  PK.plate('chapters/moi/7', 'Chapter Seven: Coral from the mountains at night, the keep on its height, the fires in rings, and the sea behind it black', P => {
    let s = PK.sky(P, [[0, '#04040a'], [.7, '#0c0c18'], [1, '#141420']]) + PK.stars(80, 43, 0, 150);
    s += `<rect y="150" width="660" height="80" fill="#020204"/>` + PK.haze(P, 152, 4, '#4a5070', .4, 330, 380);
    s += `<path d="M180 250 Q230 180 300 172 L330 140 L350 140 L360 172 Q440 182 480 250 Z" fill="#0c0a0e"/><rect x="318" y="118" width="40" height="30" fill="#0c0a0e"/><rect x="330" y="96" width="14" height="26" fill="#0c0a0e"/>` + PK.lamp(P, 337, 108, 1.6, '#ff9a50', 3);
    for (const [cx, cy, r, n] of [[330, 230, 70, 20], [330, 236, 120, 30], [330, 244, 180, 40]]) for (let i = 0; i < n; i++) { const a = i / n * 6.28; s += PK.lamp(P, cx + Math.cos(a) * r, cy + Math.sin(a) * r * .18, .9, '#ff9040', i + n); }
    s += `<path d="M-10 400 L-10 250 L80 210 L150 260 L220 300 L300 330 L420 320 L520 280 L600 230 L670 250 L670 400 Z" fill="#06050a"/>`;
    s += `<path d="M-10 250 L80 210 L150 260" stroke="#5a5a7a" stroke-width="1" fill="none" opacity=".4"/>`;
    s += PK.back(130, 404, .5, B({cloak: '#1a1a22', kit: 'none', rim: '#9aa8d0'})) + PK.back(560, 404, .46, B({cloak: '#1a1a22', kit: 'spear', rim: '#9aa8d0', flip: true}));
    return s; });
}
