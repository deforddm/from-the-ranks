/* ============ Book One's end pictures and roads, repainted (v13.70.0) ============
   David, Nov 25, 2026, 11:56 PM PST, with a PC screenshot of the plain at the end of Chapter Two: "make this much better, the animals the people
   the weird lines going into the sky. also improve other paintings with similar issues. they become super obvious on a PC monitor".
   The twelve pictures drawn for the first version of Book One (019c: vistas/* under each chapter's end, roads/* at the finale) were flat shapes:
   bars with a ball for a head, an oval on four sticks for a horse, a box on two discs, ruts drawn on past the hill into the sky. They are painted
   again here with the plate kit (019h) and the silhouettes (019k), each one still saying what its caption says (v13.31, the picture-versus-text
   pass): 0 the Fourth up out of the sap at night, all five; 1 dawn below Pale, the cadre row black frames and smoke, the wagon loaded; 2 the last
   morning on the plain, the ruts going up into the Gadrobi Hills and over, Sethand riding west; 3 sunrise on the chandler's roof, the Spawn over
   the lake; 4 grey dawn on the same roof, one kitchen fire; 5 grey dawn on the long ridge, the barrow, the Fourth going west; 6 dawn in a garden
   with a house in it, the Spawn moving; 7 noon on a brown hill, the quorls going up. Roads: outlaw (flying north on the quorls), empire (the
   long road to Genabaris and the sea), city (back in at the gate, blue lamps), disband (standing down on the brown hill).
   Everything that matters sits between y 70 and 330: the picture is cut to the screen's shape (a phone shows about y 60 to 340). */
{
  const f = PK.f, M = SIL.man, H = SIL.horse;
  /* the Fourth as five far figures, in a line or a knot: x, y feet, h height, dir, fill; o.walk, o.gap */
  const five = (x, y, h, dir, fill, o = {}) => { let s = ''; const kits = ['spear', 'none', 'staff', 'none', 'bow'], heads = ['helm', 'helm', 'hood', 'bare', 'hood'];
    for (let i = 0; i < 5; i++) { const dx = (o.gap || h * .42) * i * (o.line === false ? 0 : 1) + (o.jit ? (hash(i, o.jit) - .5) * h * .5 : 0), dy = o.dy ? o.dy * i : (o.jit ? (hash(i, o.jit + 1) - .5) * h * .08 : 0);
      s += M(x + dx * dir * -1, y + dy, h * (.94 + hash(i, 717) * .1), o.face ? o.face[i] : dir, fill, {seed: 31 + i * 7 + (o.seed || 0), kit: kits[i], head: heads[i], walk: o.walk == null ? 1 : o.walk, pack: i !== 2, cloak: i > 1}); }
    return s; };
  /* a smooth hill: a crest as a function of x, so a road on it can stop at the top */
  const hillY = (x, cx, top, w, base) => base - (base - top) * Math.exp(-Math.pow((x - cx) / w, 2));
  const hillD = (cx, top, w, base, x0 = -10, x1 = 670) => { let d = `M${x0} 400 L${x0} ${f(hillY(x0, cx, top, w, base))}`; for (let x = x0; x <= x1; x += 6) d += ` L${x} ${f(hillY(x, cx, top, w, base))}`; return d + ` L${x1} 400 Z`; };
  /* a road of two ruts from a near point up a hill to its crest, never past it */
  const ruts = (pts, col, w, op) => { let s = ''; for (const off of [-1, 1]) { const q = pts.map(([x, y, sp]) => [x + off * sp, y]); s += `<path d="M${q.map(p => `${f(p[0])} ${f(p[1])}`).join(' L')}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`; } return s; };
  const roadPts = (x0, y0, x1, y1, bend, sp0, sp1, crest) => { const pts = []; for (let i = 0; i <= 24; i++) { const t = i / 24, e = 1 - Math.pow(1 - t, 1.6), x = x0 + (x1 - x0) * e + Math.sin(t * Math.PI) * bend, y = y0 + (y1 - y0) * e; pts.push([x, crest ? Math.max(y, crest(x) + 1.5) : y, sp0 + (sp1 - sp0) * e]); } return pts; };
  /* Darujhistan across the water: the skyline, a few blue lamps, the lake */
  const daru = (P, base, o = {}) => PK.skyline(P, o.x0 ?? 120, o.x1 ?? 560, base, o.seed || 41, {fill: o.fill || '#1c2230', lit: '#9ad0ff', p: o.p ?? .06, h: o.h || 46, wide: 20, domes: .22, towers: .16, spires: true});
  /* a pitched roof seen along its ridge, with chimney pots, from x0 to x1 (the chandler's roof and its neighbours) */
  const roofs = (P, y, col, lip, o = {}) => { let s = `<path d="M-10 400 L-10 ${y + 18} L120 ${y} L300 ${y + 6} L420 ${y - 2} L670 ${y + 14} L670 400 Z" fill="${col}"/>`;
    s += `<path d="M-10 ${y + 18} L120 ${y} L300 ${y + 6} L420 ${y - 2} L670 ${y + 14}" stroke="${lip}" stroke-width="1.4" fill="none" opacity=".6"/>`;
    let sl = ''; for (let i = 0; i < 26; i++) { const yy = y + 26 + i * 6 + i * i * .3; sl += `M-10 ${f(yy)} L670 ${f(yy + 10)}`; } s += `<path d="${sl}" stroke="${lip}" stroke-width=".8" opacity=".14"/>`;
    for (const [cx, w, hh] of o.pots || [[86, 16, 26], [350, 20, 30], [560, 14, 22]]) { const by = y + 4; s += `<path d="M${cx - w / 2} ${by + 6} L${cx - w / 2} ${by - hh} L${cx + w / 2} ${by - hh} L${cx + w / 2} ${by + 6} Z" fill="${col}"/><path d="M${cx - w / 2 - 2} ${by - hh} L${cx + w / 2 + 2} ${by - hh}" stroke="${lip}" stroke-width="2.4"/>`
      + `<rect x="${cx - w / 2 + 2}" y="${by - hh - 6}" width="${f(w * .3)}" height="6" fill="${col}"/><rect x="${f(cx + w * .1)}" y="${by - hh - 8}" width="${f(w * .3)}" height="8" fill="${col}"/>`; }
    return s; };

  /* 0 the prologue: before dawn below Pale, the Fourth coming up out of the sap's mouth into the lantern light, all five */
  PK.plate('vistas/prologue', 'Before dawn below Pale: the Fourth coming up out of the sap into the lantern light, all five', P => {
    let s = PK.sky(P, [[0, '#06080e'], [.55, '#141a28'], [.8, '#2a2630'], [1, '#18120e']]) + PK.stars(110, 61, 0, 210);
    s += PK.pale(P, {fill: '#0a0708', ridge: '#0c0909', hill: '#0e0a0a', city: '#090607', lit: .04, smoke: '#2a2428', sop: .3});
    s += `<path d="M-10 400 L-10 300 Q120 280 260 286 Q420 292 520 276 Q600 266 670 270 L670 400 Z" fill="#100c0a"/>`;
    for (let i = 0; i < 9; i++) { const x = 30 + i * 74 + hash(i, 63) * 30, y = 300 + hash(i, 64) * 50; s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(22 + hash(i, 65) * 20)}" ry="${f(4 + hash(i, 66) * 3)}" fill="#060404"/><path d="M${f(x - 24)} ${f(y - 2)} Q${f(x)} ${f(y - 9)} ${f(x + 24)} ${f(y - 2)}" stroke="#2a201a" stroke-width="1.2" fill="none" opacity=".7"/>`; } // the old pits
    s += PK.fires(P, [[96, 292, .5], [600, 278, .45], [470, 286, .35]], .55, '#ff8a3a');
    // the sap's mouth: a timbered hole in the bank, lantern light pouring out of it
    s += `<path d="M230 330 Q236 286 300 282 Q364 286 372 330 Z" fill="#0c0806"/><circle cx="300" cy="318" r="120" fill="${P.glow('#ffb060')}" opacity=".55"/>`;
    s += `<path d="M262 330 L264 300 Q300 292 338 300 L340 330 Z" fill="#ffb868" opacity=".55"/><path d="M262 330 L264 300 Q300 292 338 300 L340 330" stroke="#2a1a0e" stroke-width="5" fill="none"/>`;
    s += PK.lamp(P, 268, 304, 2.2, '#ffd08a', 3);
    // all five, up and out, the last one still climbing: dark against the light
    s += M(286, 330, 38, 1, '#080504', {seed: 2, walk: .4, kit: 'none', head: 'bare', pack: false, lean: 6}) + M(318, 326, 42, 1, '#080504', {seed: 3, kit: 'spear', head: 'helm'});
    s += M(352, 322, 44, 1, '#080504', {seed: 4, kit: 'none', head: 'hood', cloak: true}) + M(388, 320, 43, 1, '#080504', {seed: 5, kit: 'staff', head: 'hood', cloak: true}) + M(240, 326, 41, -1, '#080504', {seed: 6, walk: .3, kit: 'none', head: 'helm'});
    s += `<rect y="330" width="660" height="70" fill="#0a0706"/>` + PK.grass(160, 67, 326, 400, '#1a140e', .8, 3);
    return s; });

  /* 1 dawn below Pale: the cadre row burned to black frames, smoke, the wagon loaded for the south */
  PK.plate('vistas/pale', 'Dawn below Pale: the cadre row black frames and smoke, and the wagon loaded for the south', P => {
    let s = PK.sky(P, [[0, '#2a2430'], [.45, '#5a4448'], [.72, '#b07a5a'], [.86, '#e0a46a'], [1, '#6a4a36']]);
    s += PK.sun(P, 150, 232, 10, '#ffd8a0', .5) + PK.haze(P, 226, 40, '#f0b880', .25, 200, 260);
    s += PK.pale(P, {fill: '#24181a', ridge: '#251a1a', hill: '#2a1e1c', city: '#20161a', lit: .03, smoke: '#4a3a3a', sop: .4});
    s += `<rect y="262" width="660" height="138" fill="${P.lin([[0, '#3a2c24'], [1, '#1a120e']])}"/>`;
    // the cadre row: tent frames and a hut's ribs, burned black, still smoking
    let fr = ''; for (let i = 0; i < 9; i++) { const x = 300 + i * 38 + hash(i, 101) * 10, y = 286 + (i % 2) * 4, w = 22 + hash(i, 102) * 8, h2 = 20 + hash(i, 103) * 10, broke = hash(i, 104) < .45;
      fr += `M${f(x - w / 2)} ${y} L${f(x)} ${f(y - h2)} L${f(x + w / 2 - (broke ? w * .25 : 0))} ${f(y - (broke ? h2 * .3 : 0))} M${f(x)} ${f(y - h2)} L${f(x + 10)} ${f(y - h2 - 2)} M${f(x - w * .25)} ${f(y - h2 * .5)} L${f(x + w * .25)} ${f(y - h2 * .5)}`; }
    s += `<path d="${fr}" stroke="#0e0a0a" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    for (let i = 0; i < 6; i++) s += PK.smoke(P, 310 + i * 58, 282, 120, 10, 26, '#3a2e2e', .45, 150 + i);
    s += PK.fires(P, [[386, 288, .35], [498, 290, .3]], .4, '#ff7a2a');
    // the wagon, loaded and roped, its team in the traces, the Fourth beside it
    s += SIL.wagon(170, 318, 86, 1, '#120c0a', {hood: false, load: '#3a2e24', seed: 11, team: 'mule'});
    s += M(110, 320, 40, 1, '#120c0a', {seed: 13, walk: 0, kit: 'none', head: 'helm'}) + M(84, 322, 41, 1, '#120c0a', {seed: 14, walk: 0, kit: 'spear', head: 'helm'}) + M(60, 320, 38, -1, '#120c0a', {seed: 15, walk: 0, kit: 'staff', head: 'hood', cloak: true});
    s += M(236, 326, 42, -1, '#120c0a', {seed: 16, walk: .5, kit: 'none', head: 'bare', pack: false}) + M(262, 330, 40, 1, '#120c0a', {seed: 17, walk: 0, kit: 'bow', head: 'hood', cloak: true});
    s += PK.grass(220, 105, 300, 400, '#1a120e', .8, 3) + PK.stones(60, 106, 300, 400, '#100a08', .5);
    return s; });

  /* 2 the last morning on the plain: the ruts going up the slope into the Gadrobi Hills and over the top, the wagon and the Fourth on them,
     and Sethand riding away west without a word */
  PK.plate('vistas/plain', 'The last morning on the plain: the ruts going up into the Gadrobi Hills, and Sethand riding west', P => {
    let s = PK.sky(P, [[0, '#7e8ea0'], [.5, '#b4b4aa'], [.78, '#e0cfa8'], [1, '#c4a478']]);
    s += PK.sun(P, 560, 168, 9, '#fff0c8', .6) + PK.haze(P, 186, 30, '#fff0d0', .35, 520, 200);
    s += PK.ridge(196, 12, 51, '#9a9284', .5, .8) + PK.ridge(212, 16, 52, '#8a7a66', .7);
    const H1 = x => hillY(x, 430, 150, 150, 236);
    s += `<path d="${hillD(430, 150, 150, 236)}" fill="${P.lin([[0, '#7a6448'], [1, '#5a4632']])}"/>` + `<path d="${hillD(430, 150, 150, 236).replace(/^M-10 400 L/, 'M').replace(/ L670 400 Z$/, '')}" stroke="#c8b080" stroke-width="1.2" fill="none" opacity=".5"/>`;
    { let st = ''; for (let i = 0; i < 60; i++) { const x = 290 + hash(i, 53) * 300, top = H1(x) + 4; if (top > 232) continue; const y = top + hash(i, 54) * (236 - top), r = .6 + hash(i, 55) * 1.6; st += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r * 1.6)}" ry="${f(r * .7)}"/>`; } s += `<g fill="#4a3826" opacity=".4">${st}</g>`; }
    // a cairn on the crest: the old waymark
    s += `<path d="M${f(424)} ${f(H1(428) + 1)} L426 ${f(H1(428) - 10)} L432 ${f(H1(428) - 11)} L434 ${f(H1(428) + 1)} Z" fill="#4a3c2c"/>`;
    // the road up the hill: ruts from the hill's foot to its crest, then gone over the top
    s += ruts(roadPts(380, 238, 432, H1(432) + 1.5, -10, 5, 1.6, H1), '#3a2c1c', 1.4, .55);
    // the plain: near ground, grass, the ruts coming from under the viewer up to the hill
    s += `<path d="M-10 400 L-10 252 Q200 236 330 238 Q480 240 670 250 L670 400 Z" fill="${P.lin([[0, '#a88a5c'], [.5, '#8a6c44'], [1, '#4a3824']])}"/>`;
    s += ruts(roadPts(300, 410, 380, 238, 60, 30, 5), '#3a2a18', 4, .5);
    s += PK.grass(320, 55, 244, 400, '#6a5434', .7, 3) + PK.stones(90, 56, 244, 400, '#4a3826', .45);
    // the wagon on the ruts going up, mules leaning into it; the Fourth walking alongside
    s += SIL.wagon(340, 282, 60, 1, '#1a120c', {hood: '#c8b890', seed: 21, team: 'mule'});
    s += five(318, 300, 34, 1, '#1a120c', {seed: 2, gap: 16, dy: 1.5});
    // Sethand, turned west, on his own
    s += H(96, 270, 26, -1, '#1a120c', {seed: 23, rider: true, cloak: true, phase: .5});
    s += `<path d="M110 272 Q150 276 190 276" stroke="#6a5434" stroke-width="1" fill="none" opacity=".4"/>`;
    return s; });

  /* 3 sunrise on the chandler's roof: lamps out, the shapes on the roofs gone, the city waking; the Spawn over the lake */
  const roofScene = (P, dawn) => {
    let s = PK.sky(P, dawn ? [[0, '#4a5a78'], [.45, '#a08a90'], [.75, '#f0b070'], [1, '#ffd890']] : [[0, '#3a404c'], [.6, '#6a6e78'], [1, '#9a9a9c']]);
    if (dawn) s += PK.sun(P, 560, 208, 11, '#ffe0a0', .9) + PK.haze(P, 204, 26, '#ffd090', .45, 520, 220);
    s += PK.spawn(P, 240, 104, 84, {seed: 7, under: dawn ? '#d09070' : '#7a7a88'});
    s += `<rect y="214" width="660" height="22" fill="${P.lin([[0, dawn ? '#c8a080' : '#7a7e86'], [1, dawn ? '#6a6070' : '#4a5058']])}"/>`; // the lake
    s += `<path d="M380 220 L660 220" stroke="${dawn ? '#ffe0a0' : '#b0b4bc'}" stroke-width="1" opacity=".35"/>`;
    s += daru(P, 232, {fill: dawn ? '#3a3440' : '#3a3e48', p: 0, h: 52, x0: -10, x1: 680, seed: 43});
    s += PK.ridge(246, 6, 44, dawn ? '#2a2630' : '#2e3038');
    s += roofs(P, 270, dawn ? '#1a161c' : '#1c1e24', dawn ? '#c89878' : '#8a8e98');
    // smoke from a kitchen; at sunrise several
    s += PK.smoke(P, 350, 244, 90, 8, 20, dawn ? '#8a7a80' : '#6a6c74', .4, 171);
    if (dawn) s += PK.smoke(P, 86, 248, 70, 6, 16, '#8a7a80', .35, 172) + PK.smoke(P, 200, 236, 60, 5, 14, '#8a7a80', .3, 173);
    else s += PK.lamp(P, 352, 254, 1.3, '#ffb060', 5);
    // the Fourth on the ridge, sitting and standing, the night over
    s += M(210, 282, 30, 1, '#0c0a0e', {seed: 41, walk: 0, kit: 'spear', head: 'helm'}) + M(236, 284, 28, -1, '#0c0a0e', {seed: 42, walk: 0, kit: 'none', head: 'hood', cloak: true});
    s += `<g fill="#0c0a0e"><ellipse cx="262" cy="282" rx="7" ry="4"/><path d="M256 282 Q258 268 264 266 L270 266 Q272 276 270 284 Z"/><ellipse cx="266" cy="262" rx="4" ry="4.4"/></g>`; // one sitting
    s += M(290, 286, 29, 1, '#0c0a0e', {seed: 43, walk: 0, kit: 'bow', head: 'bare'}) + M(184, 280, 27, 1, '#0c0a0e', {seed: 44, walk: 0, kit: 'staff', head: 'hood', cloak: true});
    for (let i = 0; i < 4; i++) { const x = 440 + i * 46 + hash(i, 175) * 20, y = 120 + hash(i, 176) * 50; s += `<path d="M${f(x - 5)} ${f(y)} Q${f(x - 2)} ${f(y - 3)} ${f(x)} ${f(y)} Q${f(x + 2)} ${f(y - 3)} ${f(x + 5)} ${f(y)}" stroke="${dawn ? '#3a2a2a' : '#2a2c34'}" stroke-width="1.2" fill="none"/>`; } // gulls
    return s; };
  PK.plate('vistas/roofdawn', 'Sunrise on the chandler\'s roof: the lamps out, the roofs empty, the Moon\'s Spawn over the lake', P => roofScene(P, true));
  PK.plate('vistas/roof', 'Grey dawn on the same roof: the last lamp out, the roofs empty, one kitchen fire', P => roofScene(P, false));

  /* 5 grey dawn on the long ridge: the barrow on the crest, its stones, and the Fourth going west along the ridge, quietly */
  PK.plate('vistas/barrow', 'Grey dawn on the long ridge: the barrow on the crest, and the Fourth going west along it, quietly', P => {
    let s = PK.sky(P, [[0, '#4a505c'], [.55, '#86847e'], [.8, '#c0b29a'], [1, '#8a7c66']]);
    s += PK.haze(P, 210, 22, '#d0c0a0', .3, 470, 240) + PK.ridge(214, 14, 81, '#4a4842', .8) + PK.ridge(226, 10, 82, '#3a3832', .9);
    s += PK.haze(P, 240, 16, '#a8a8a8', .35, 330, 400); // mist in the valley
    const R = x => 272 - 40 * Math.exp(-Math.pow((x - 420) / 240, 2));
    s += `<path d="M-10 400 L-10 ${f(R(-10))} ${Array.from({length: 114}, (_, i) => `L${-10 + i * 6} ${f(R(-10 + i * 6))}`).join(' ')} L670 400 Z" fill="${P.lin([[0, '#2e2a24'], [1, '#141210']])}"/>`;
    // the barrow: a long mound on the crest, a ring of stones, the door dark and a little colder than it should be
    s += `<path d="M300 ${f(R(300) + 2)} Q420 ${f(R(420) - 70)} 560 ${f(R(560) + 2)} Z" fill="#2a2620"/><path d="M308 ${f(R(308))} Q420 ${f(R(420) - 70)} 552 ${f(R(552))}" stroke="#a49c8a" stroke-width="1.2" fill="none" opacity=".45"/>`;
    s += `<path d="M408 ${f(R(408) + 1)} L408 ${f(R(408) - 20)} L434 ${f(R(434) - 20)} L434 ${f(R(434) + 1)} Z" fill="#080808"/><path d="M402 ${f(R(408) - 20)} L440 ${f(R(434) - 21)}" stroke="#4e4a42" stroke-width="5"/><path d="M405 ${f(R(408))} L405 ${f(R(408) - 20)} M437 ${f(R(434))} L437 ${f(R(434) - 20)}" stroke="#4e4a42" stroke-width="4"/>`;
    s += `<path d="M412 ${f(R(412) - 2)} Q421 ${f(R(421) - 8)} 430 ${f(R(430) - 2)}" stroke="#b8c8d8" stroke-width="1" fill="none" opacity=".35"/>`; // frost on the sill
    for (let i = 0; i < 11; i++) { const x = 250 + i * 34 + hash(i, 83) * 10, h = 12 + hash(i, 84) * 16; s += `<path d="M${f(x - 3)} ${f(R(x) + 1)} L${f(x - 2)} ${f(R(x) - h)} L${f(x + 2.5)} ${f(R(x) - h - 1)} L${f(x + 3)} ${f(R(x) + 1)} Z" fill="#1c1a18"/>`; }
    // the Fourth going west along the ridge, small, in file
    s += five(170, R(170) + 1, 36, -1, '#0e0c0a', {seed: 5, gap: 17});
    s += PK.grass(240, 85, 260, 400, '#2a2620', .8, 3) + PK.stones(50, 86, 270, 400, '#0e0c0a', .5);
    return s; });

  /* 6 dawn in a garden with a house in it: the estate's garden after the Fete, and a house standing where there was none, and the Spawn moving */
  PK.plate('vistas/garden', 'Dawn in a garden with a house in it that was not there last night, and the Moon\'s Spawn moving', P => {
    let s = PK.sky(P, [[0, '#3e4660'], [.5, '#8a7a8a'], [.8, '#e0a888'], [1, '#f0c8a0']]);
    s += PK.spawn(P, 150, 76, 70, {seed: 9, under: '#c89080'}) + PK.haze(P, 120, 14, '#c0a8b0', .35, 240, 120); // moving off: a long smear of cloud behind it
    s += PK.tree(40, 252, 120, '#1a1e1a', 'old', 3) + PK.tree(610, 256, 130, '#1a1e1a', 'old', 4) + PK.tree(560, 250, 90, '#1e221e', 'old', 5);
    s += `<path d="M-10 254 L670 254 L670 400 L-10 400 Z" fill="${P.lin([[0, '#3a4a34'], [1, '#1a2418']])}"/>`;
    // the estate's house to the left: a long wall of windows, the lamps of the Fete burned out
    s += `<path d="M60 254 L60 190 L240 190 L240 254 Z" fill="#1e1c22"/><path d="M52 190 L150 160 L248 190 Z" fill="#18161c"/>`;
    for (let i = 0; i < 6; i++) s += `<rect x="${72 + i * 28}" y="204" width="12" height="30" fill="#2e2c34"/>`;
    // the paths and the fountain
    s += `<path d="M300 400 L330 262 L346 262 L420 400 Z" fill="#6a6250" opacity=".6"/><ellipse cx="340" cy="300" rx="40" ry="9" fill="#3a3a3a"/><ellipse cx="340" cy="298" rx="34" ry="6.5" fill="#8aa0b0" opacity=".7"/><path d="M340 298 L340 276" stroke="#3a3a3a" stroke-width="5"/>`;
    // the house that was not there: dark timber and stone, a tower crooked as a root, a yard of grey grass, nothing lit
    s += `<path d="M440 262 L440 206 L470 186 L500 206 L500 262 Z" fill="#141210"/><path d="M482 206 Q478 160 488 132 Q500 120 504 140 Q506 176 500 206 Z" fill="#100e0c"/><path d="M486 132 L496 116 L504 138 Z" fill="#100e0c"/>`;
    s += `<path d="M430 266 Q470 258 520 264 L522 270 Q470 266 428 272 Z" fill="#2a2a26"/>`;
    for (let i = 0; i < 6; i++) { const x = 430 + i * 18, y = 264 + (i % 2); s += `<path d="M${x} ${y} Q${x - 6} ${y - 24} ${x + 4} ${y - 36} M${x} ${y - 16} L${x + 8} ${y - 24}" stroke="#0e0c0a" stroke-width="1.6" fill="none"/>`; } // roots or a hedge, twisted
    s += `<rect x="462" y="232" width="10" height="30" fill="#050504"/>`;
    // the Fourth at the edge of it all, looking
    s += five(250, 330, 34, 1, '#0c0e0c', {seed: 9, gap: 15, walk: 0, face: [1, 1, 1, -1, 1]});
    s += PK.grass(200, 95, 260, 400, '#1a2414', .8, 2);
    return s; });

  /* 7 noon on a brown hill: the quorls going up, the city small and blue to the west, the Fourth on the hill */
  const brownHill = (P, o = {}) => {
    let s = PK.sky(P, [[0, '#5a7ea8'], [.6, '#9ab4cc'], [1, '#cad4d8']]);
    s += `<rect y="230" width="300" height="14" fill="#7a9cb8" opacity=".8"/>`; // the lake to the west
    s += daru(P, 234, {x0: 30, x1: 230, h: 30, fill: '#6a7e98', p: 0, seed: 47});
    s += PK.ridge(244, 8, 91, '#9a8460', .6) + `<path d="${hillD(400, 236, 300, 330)}" fill="${P.lin([[0, '#8a6a42'], [1, '#4a3622']])}"/>`;
    s += PK.grass(240, 92, 244, 400, '#5a4428', .7, 3);
    return s; };
  PK.plate('vistas/hill', 'Noon on a brown hill east of the city, and the quorls going up', P => {
    let s = brownHill(P);
    s += SIL.quorl(200, 120, 70, 1, '#0c0a0e', {seed: 1, tilt: -10}) + SIL.quorl(390, 80, 56, 1, '#0c0a0e', {seed: 2, tilt: -14}) + SIL.quorl(520, 150, 80, 1, '#0c0a0e', {seed: 3, tilt: -6}) + SIL.quorl(300, 50, 34, 1, '#0c0a0e', {seed: 4, tilt: -16});
    s += SIL.quorl(470, 252, 66, -1, '#0c0a0e', {seed: 5, tilt: 0, rider: false}); // one still on the ground, waiting
    s += five(300, 262, 32, 1, '#120c08', {seed: 7, gap: 14, walk: 0});
    return s; });

  /* the roads out (the finale's picture, 037) */
  PK.plate('roads/outlaw', 'North on the backs of the quorls, the brown hill falling away', P => {
    let s = PK.sky(P, [[0, '#4a72a0'], [.7, '#9ab6d0'], [1, '#d0d8dc']]);
    s += `<path d="${hillD(260, 330, 260, 380)}" fill="${P.lin([[0, '#7a5c3a'], [1, '#3a2a1a']])}"/>` + `<rect y="352" width="320" height="10" fill="#7a9cb8" opacity=".7"/>` + daru(P, 356, {x0: 20, x1: 200, h: 22, fill: '#6a7e98', p: 0, seed: 48});
    s += SIL.quorl(220, 200, 150, 1, '#0c0a0e', {seed: 6, tilt: -12}) + SIL.quorl(450, 150, 110, 1, '#0c0a0e', {seed: 7, tilt: -14});
    for (let i = 0; i < 9; i++) s += SIL.quorl(300 + i * 40 + hash(i, 61) * 30, 70 + hash(i, 62) * 60, 20 + hash(i, 63) * 16, 1, '#1a2030', {seed: 10 + i, tilt: -10, op: .8});
    return s; });
  PK.plate('roads/empire', 'The long road north-west, wide of Pale, toward Genabaris and a ship', P => {
    let s = PK.sky(P, [[0, '#2e3446'], [.5, '#7a6a72'], [.8, '#d08a62'], [1, '#e8a870']]);
    s += PK.sun(P, 140, 196, 10, '#ffc890', .8) + `<rect y="198" width="660" height="12" fill="${P.lin([[0, '#a07a70'], [1, '#6a5660']])}"/>`; // the sea, far
    s += PK.ship(P, 110, 204, .32, '#2a2228', '#c8a890') + PK.ship(170, 205, .22, '#2a2228', '#b89880');
    s += PK.ridge(214, 10, 71, '#4a3a38', .7) + PK.ridge(236, 16, 72, '#3a2c28', .8);
    s += `<path d="M-10 400 L-10 262 Q200 250 400 256 Q560 262 670 270 L670 400 Z" fill="${P.lin([[0, '#4a3628'], [1, '#1e1610']])}"/>`;
    const road = roadPts(520, 410, 150, 224, -70, 26, 1.4); s += ruts(road, '#c8a070', 2, .35);
    s += five(330, 300, 30, -1, '#0e0a0a', {seed: 11, gap: 13, dy: -1});
    s += PK.grass(220, 73, 256, 400, '#2a1e16', .8, 3);
    return s; });
  PK.plate('roads/city', 'Back in at the gate they came in by, Darujhistan blue in the dusk', P => {
    let s = PK.sky(P, [[0, '#1a2034'], [.6, '#4a4a66'], [1, '#8a6a78']]);
    s += PK.skyline(P, -10, 680, 210, 49, {fill: '#141a28', lit: '#9ad0ff', p: .1, h: 80, wide: 24, domes: .25, towers: .18, spires: true});
    s += PK.wall(-10, 670, 232, 290, '#10141e', {cw: 7, towers: [180, 470], tw: 30, th: 34, gx: 330, gw: 50, gh: 56, gcol: '#0a0c12', edge: '#6a7aa0'});
    s += `<path d="M305 290 L305 252 Q330 232 355 252 L355 290 Z" fill="${P.lin([[0, '#5a7090'], [1, '#2a3446']])}" opacity=".8"/>`; // light through the gate
    s += PK.gaslamp(P, 280, 290, 40, 1) + PK.gaslamp(P, 380, 290, 40, 2) + PK.gaslamp(P, 120, 292, 34, 3) + PK.gaslamp(P, 560, 292, 34, 4);
    s += `<path d="M-10 290 L670 290 L670 400 L-10 400 Z" fill="${P.lin([[0, '#2a2e3a'], [1, '#0e1016']])}"/><path d="M290 290 L370 290 L470 400 L190 400 Z" fill="#3a4050" opacity=".5"/>`;
    s += five(380, 322, 42, 1, '#06080c', {seed: 13, gap: 22, dy: -2});
    return s; });
  PK.plate('roads/disband', 'Noon on a brown hill east of Darujhistan: the Fourth stood down, each to a road', P => {
    let s = brownHill(P);
    // paths going off the hilltop every way
    for (const [x1, y1] of [[-10, 300], [120, 400], [420, 400], [670, 320], [640, 400]]) s += `<path d="M330 262 Q${f((330 + x1) / 2 + 20)} ${f((262 + y1) / 2 - 10)} ${x1} ${y1}" stroke="#a08458" stroke-width="2" fill="none" opacity=".45"/>`;
    s += SIL.quorl(480, 110, 40, 1, '#1a2030', {seed: 21, tilt: -12, op: .8}) + SIL.quorl(540, 80, 30, 1, '#1a2030', {seed: 22, tilt: -14, op: .7});
    s += M(300, 262, 34, -1, '#120c08', {seed: 51, walk: 0, kit: 'spear', head: 'helm'}) + M(330, 260, 36, 1, '#120c08', {seed: 52, walk: 0, kit: 'none', head: 'helm'});
    s += M(360, 263, 33, 1, '#120c08', {seed: 53, walk: .6, kit: 'staff', head: 'hood', cloak: true}) + M(274, 265, 32, -1, '#120c08', {seed: 54, walk: .6, kit: 'bow', head: 'hood', cloak: true}) + M(392, 266, 33, 1, '#120c08', {seed: 55, walk: 1, kit: 'none', head: 'bare'});
    return s; });
}
