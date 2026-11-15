/* ============ Book Eight's chapter plates (v13.6, 019i): Toll the Hounds, seven chapters ============
   Each draws its chapter's opening caption (src/14x): 1 a narrow room with a fire, a table with five chairs and one more, a bar across the
   door; 2 wagons in a line on a bad road east, hills behind, the land ahead flat and grey; 3 Black Coral's streets under the night that
   does not lift, lamps in the windows at noon, tall shapes on the walls (no faces); 4 the pilgrims' tents and shacks round the barrow, small
   fires, the open dark beyond; 5 long grass on the Lamatath, a road through it, the light going; 6 paper lanterns over a Gadrobi street,
   masks going by, the cracked moon over the roofs; 7 grey water at first light, boats on the shingle, smoke going up from the Gadrobi side. */
{
  const B = (o) => Object.assign({fill: '#3e3a34', dark: '#1c1a16', rim: '#e0d4c0', helmc: '#3a3c40', packc: '#2a241c', roll: '#4a4030', kit: 'none', head: 'bare', hair: '#1a1410'}, o);
  PK.plate('chapters/tth/1', 'Chapter One: a narrow room in the Gadrobi District with a fire, a table with five chairs and one more, and a bar across the door at night', P => {
    let s = `<rect width="660" height="400" fill="${P.lin([[0, '#1a1210'], [1, '#0c0807']])}"/>`;
    let bk = ''; for (let r = 0; r < 14; r++) for (let c = 0; c < 12; c++) bk += `<rect x="${c * 58 + (r % 2) * 29 - 20}" y="${r * 22}" width="56" height="20" rx="2"/>`;
    s += `<g fill="#241812" opacity=".7">${bk}</g>`;
    s += `<rect x="40" y="130" width="150" height="150" fill="#0a0605"/><path d="M30 130 L200 130 L200 118 L30 118 Z" fill="#2a1c14"/>` + `<circle cx="115" cy="250" r="150" fill="${P.glow('#ff8a3a')}" class="pk-fl"/><path d="M80 280 Q90 230 115 210 Q140 230 150 280 Z" fill="#ffb050" class="pk-fl"/><path d="M95 280 Q105 246 115 236 Q126 246 136 280 Z" fill="#ffe0a0"/>`;
    s += `<rect y="300" width="660" height="100" fill="#140c08"/>`;
    s += `<path d="M230 290 L520 290 L540 310 L210 310 Z" fill="#3a2418"/><rect x="226" y="310" width="8" height="60" fill="#2a1a10"/><rect x="516" y="310" width="8" height="60" fill="#2a1a10"/>`;
    for (const [x, y, k] of [[250, 292, 1], [310, 292, 1], [370, 292, 1], [430, 292, 1], [490, 292, 1], [580, 300, 1.1]]) s += `<g transform="translate(${x} ${y}) scale(${k})" fill="#4a2c1a"><rect x="-10" y="-36" width="4" height="40"/><rect x="6" y="-36" width="4" height="40"/><rect x="-10" y="-36" width="20" height="4"/><rect x="-10" y="-16" width="20" height="4"/></g>`;
    s += `<rect x="560" y="80" width="90" height="220" fill="#24160e"/><path d="M570 90 L640 90 M570 140 L640 140 M570 190 L640 190 M570 240 L640 240" stroke="#1a100a" stroke-width="2"/><rect x="548" y="176" width="112" height="14" fill="#3a2414"/><rect x="548" y="176" width="112" height="3" fill="#8a5a30" opacity=".6"/>`;
    s += `<path d="M230 290 L520 290" stroke="#c07040" stroke-width="1" opacity=".6"/>`;
    return s; });
  PK.plate('chapters/tth/2', 'Chapter Two: wagons in a line on a bad road east of Darujhistan, the hills behind, and the land ahead flat and grey to the edge of the sky', P => {
    let s = PK.sky(P, [[0, '#5a6070'], [.6, '#9a9a98'], [1, '#a8a49a']]);
    s += PK.ridge(220, 6, 551, '#6a6a68', .4) + `<rect y="222" width="660" height="178" fill="${P.lin([[0, '#6a665a'], [1, '#3a3628']])}"/>`;
    s += `<path d="M-10 330 L-10 250 Q60 200 140 230 Q200 210 240 260 L240 330 Z" fill="#4a463a"/>`;
    s += `<path d="M120 400 Q300 300 460 240 Q560 226 670 224 L670 232 Q560 236 470 250 Q340 310 280 400 Z" fill="#5a4e3c"/>`;
    for (let i = 0; i < 6; i++) { const t = i / 5, x = 230 + t * 360, y = 330 - t * 96, k = 1.1 - t * .8; s += PK.wagon(x, y, k, '#1e1a14', '#8a8270', i); }
    let rt = ''; for (let i = 0; i < 50; i++) { const t = hash(i, 552), y = 240 + t * t * 160, x = 200 + t * 160 - hash(i, 553) * 160 * (1 - t); rt += `<ellipse cx="${PK.f(x + 200 * (1 - t))}" cy="${PK.f(y)}" rx="${PK.f(2 + t * 8)}" ry="${PK.f(1 + t * 2)}"/>`; } s += `<g fill="#2a2418" opacity=".5">${rt}</g>`;
    s += PK.grass(200, 554, 226, 400, '#5a5a40', .5) + PK.back(100, 404, .5, B({kit: 'none', head: 'hood', cloak: '#3a342a', walk: 1}));
    return s; });
  PK.plate('chapters/tth/3', 'Chapter Three: Black Coral\'s streets under a night that does not lift, lamps in the windows at noon, and tall shapes on the walls', P => {
    let s = PK.sky(P, [[0, '#010103'], [.7, '#04050a'], [1, '#0a0a12']]);
    s += PK.skyline(P, -10, 680, 230, 561, {fill: '#06060a', lit: '#e8b060', p: .35, h: 120, towers: .25, spires: true, domes: .05});
    s += PK.wall(-10, 670, 250, 300, '#08080c', {cw: 8, towers: [100, 330, 560], tw: 22, th: 30});
    for (const x of [160, 220, 430, 500]) s += `<g transform="translate(${x} 244)" fill="#1c1c26" stroke="#6a6a80" stroke-width=".8" stroke-opacity=".5"><path d="M-5 0 L-5 -30 L-4 -46 L4 -46 L5 -30 L5 0 Z"/><circle cx="0" cy="-52" r="5"/></g>`;
    s += `<rect y="300" width="660" height="100" fill="#050508"/><path d="M260 300 L400 300 L560 400 L100 400 Z" fill="#0c0c12"/>`;
    for (const x of [60, 600]) s += `<rect x="${x - 40}" y="250" width="80" height="150" fill="#08080e"/><rect x="${x - 14}" y="300" width="28" height="36" fill="#e8b060" opacity=".75" class="pk-fl"/>` + PK.lamp(P, x, 318, 1, '#e8b060', x, false);
    s += PK.back(330, 404, .5, B({head: 'hood', cloak: '#1a1a20', rim: '#e8b878'}));
    return s; });
  PK.plate('chapters/tth/4', 'Chapter Four: the pilgrims\' tents and shacks in rows round the barrow, a few small fires, and the open dark beyond the last of them', P => {
    let s = PK.sky(P, [[0, '#010103'], [.8, '#06060c'], [1, '#0c0c14']]);
    s += `<path d="M160 220 Q330 120 500 220 Z" fill="#0e0c10"/><path d="M200 210 Q330 136 460 210" stroke="#4a4048" stroke-width="1" fill="none" opacity=".5"/>`;
    s += `<rect y="218" width="660" height="182" fill="${P.lin([[0, '#100e12'], [1, '#050406']])}"/>`;
    for (let r = 0; r < 4; r++) for (let i = 0; i < 12 + r * 2; i++) { const t = (i + .5) / (12 + r * 2), x = -20 + t * 700, y = 226 + r * 22 + Math.abs(t - .5) * -10, k = .5 + r * .25; s += hash(i, 562 + r) < .5 ? PK.tent(P, x, y, k, '#2a2420', hash(i, 563 + r) < .15, i + r * 30) : `<rect x="${PK.f(x - 10 * k)}" y="${PK.f(y - 12 * k)}" width="${PK.f(20 * k)}" height="${PK.f(12 * k)}" fill="#1a1612"/><path d="M${PK.f(x - 12 * k)} ${PK.f(y - 12 * k)} L${PK.f(x + 12 * k)} ${PK.f(y - 15 * k)}" stroke="#2a2420" stroke-width="${PK.f(2 * k)}"/>`; }
    s += PK.fires(P, [[150, 270, .7], [420, 290, .8], [560, 252, .6]]);
    s += PK.back(110, 404, .5, B({head: 'hood', cloak: '#1e1a18', rim: '#ff9a60'}));
    return s; });
  PK.plate('chapters/tth/5', 'Chapter Five: long grass on the Lamatath to the horizon, a road through it, and the light going', P => {
    let s = PK.sky(P, [[0, '#1e2040'], [.55, '#8a5a5a'], [.85, '#e8a070'], [1, '#c07a50']]);
    s += PK.sun(P, 440, 236, 14, '#ffd0a0', .7) + PK.ridge(240, 3, 571, '#4a3434', .3);
    s += `<rect y="242" width="660" height="158" fill="${P.lin([[0, '#5a4430'], [1, '#2a1c10']])}"/>`;
    s += `<path d="M320 244 L340 244 L470 400 L230 400 Z" fill="#6a5038"/>`;
    s += PK.grass(700, 572, 244, 400, '#a0804a', .55, 5) + PK.grass(200, 573, 330, 400, '#d0a868', .35, 6);
    s += PK.wagon(338, 262, .45, '#1e140c', '#7a6a58') + PK.back(400, 404, .5, B({head: 'hood', cloak: '#3a2c22', walk: 1, rim: '#ffc890'}));
    return s; });
  PK.plate('chapters/tth/6', 'Chapter Six: paper lanterns across a Gadrobi street on the Fete\'s last night, masks going by, and over the roofs the moon with a crack across it', P => {
    let s = PK.sky(P, [[0, '#06060e'], [.6, '#141428'], [1, '#2a1a28']]) + PK.stars(30, 83, 0, 80) + PK.moon(P, 400, 70, 26, '#e0dcd0', true);
    s += `<path d="M-10 400 L-10 110 L60 96 L100 120 L170 116 L180 400 Z" fill="#100a10"/><path d="M670 400 L670 104 L600 94 L570 118 L490 114 L480 400 Z" fill="#100a10"/>`;
    s += PK.skyline(P, 170, 490, 250, 581, {fill: '#120c14', lit: '#e8a050', p: .25, h: 50});
    for (const [x, y] of [[30, 160], [110, 170], [30, 240], [520, 160], [610, 170], [520, 240]]) s += `<rect x="${x}" y="${y}" width="20" height="26" fill="#e09050" opacity=".5" class="pk-fl"/>`;
    const cols = ['#e8883a', '#c8443a', '#e0b050', '#c060a0', '#7ac060', '#8ec8ff'];
    s += PK.lanterns(P, 170, 150, 490, 146, 24, 10, cols, 584) + PK.lanterns(P, 180, 206, 480, 204, 28, 9, cols, 585);
    s += `<rect y="320" width="660" height="80" fill="#0a060a"/>`;
    const fig = (x, k, mc) => `<g transform="translate(${x} 344) scale(${k})"><path d="M-9 0 L-8 -30 L-10 -46 L10 -46 L8 -30 L9 0 Z" fill="#050306"/><ellipse cx="0" cy="-54" rx="7" ry="8" fill="${mc}"/><ellipse cx="-2.6" cy="-55" rx="1.6" ry="1" fill="#000"/><ellipse cx="2.6" cy="-55" rx="1.6" ry="1" fill="#000"/></g>`;
    s += fig(220, 1, '#d8862a') + fig(270, .9, '#cfc4a8') + fig(330, 1.1, '#c8443a') + fig(400, .95, '#e0c070') + fig(450, 1, '#a0a8c0');
    return s; });
  PK.plate('chapters/tth/7', 'Chapter Seven: grey water at first light, boats drawn up on the shingle, and smoke going up from the Gadrobi side behind', P => {
    let s = PK.sky(P, [[0, '#5a6070'], [.6, '#a8a4a4'], [1, '#c4bcb0']]) + PK.haze(P, 210, 14, '#f0e8e0', .4, 330, 380);
    s += PK.skyline(P, 380, 680, 208, 591, {fill: '#5a5a62', lit: '#fff', p: 0, h: 30, domes: .2});
    for (let i = 0; i < 4; i++) s += PK.smoke(P, 440 + i * 50, 200, 180, 20, 60, '#4a4448', .45, 592 + i);
    s += PK.water(P, 212, '#8a8e94', '#3a4048', {line: '#e0e4e8', op: .25});
    s += `<path d="M-10 300 Q330 284 670 296 L670 400 L-10 400 Z" fill="#4a4844"/>`;
    let sh = ''; for (let i = 0; i < 260; i++) { const t = hash(i, 593), y = 300 + t * 100, x = hash(i, 594) * 680; sh += `<ellipse cx="${PK.f(x)}" cy="${PK.f(y)}" rx="${PK.f(1 + t * 3)}" ry="${PK.f(.7 + t * 1.6)}"/>`; } s += `<g fill="#6a6660" opacity=".7">${sh}</g>`;
    for (const [x, y, k, r] of [[120, 318, 1.2, -6], [260, 306, .9, 4], [520, 330, 1.4, 8]]) s += `<g transform="translate(${x} ${y}) rotate(${r}) scale(${k})"><path d="M-40 0 Q-36 10 0 12 Q36 10 44 -4 L40 -6 Q0 -2 -40 -4 Z" fill="#2a221c"/><path d="M-36 -3 Q0 0 40 -5" stroke="#6a5a4a" stroke-width="1" fill="none"/></g>`;
    s += PK.back(380, 404, .5, B({head: 'bare', cloak: '#3a3630', rim: '#f0e8e0'}));
    return s; });
}
