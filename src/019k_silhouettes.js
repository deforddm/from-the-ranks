/* ============ silhouettes (v13.70.0, David, Nov 25, 2026: "make this much better, the animals the people the weird lines going into the sky.
   also improve other paintings with similar issues. they become super obvious on a PC monitor") ============
   One set of far figures for every painted picture: a person walking or standing, a horse or a mule (ridden or not), a covered wagon with
   its team, a quorl with its rider. They replace the old block figures (a bar with a ball on top, an oval on four sticks, a box on two discs).
   Each returns SVG drawn at (x, y) = the feet or the wheels on the ground, h = the figure's height in the picture's units, dir 1 faces right.
   Shapes are in units of 100 = a man's height (a horse's withers stand at 92) and scaled by the group's transform. Seeds vary the stride,
   the lean and the kit, so no two in a line are the same. TK.walker, PK.wagon and PK.rider (019f, 019h) are rebuilt on these at the end of
   the file, so every chapter plate takes them too. */
const SIL = {
  f: n => Math.round(n * 10) / 10,
  pts: a => a.map(p => `${SIL.f(p[0])} ${SIL.f(p[1])}`).join(' L'),
  g(x, y, k, dir, fill, body, op){ const f = SIL.f; return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(dir * k * 1000) / 1000} ${f(k * 1000) / 1000})" fill="${fill}" stroke="${fill}"${op != null ? ` opacity="${op}"` : ''}>${body}</g>`; },
  limb(a, b, c, w0, w1){ const f = SIL.f; return `<path d="M${f(a[0])} ${f(a[1])} Q${f(b[0])} ${f(b[1])} ${f(c[0])} ${f(c[1])}" fill="none" stroke-width="${f((w0 + w1) / 2)}" stroke-linecap="round"/>`; },

  /* a person. o: seed, walk (0 standing, 1 striding), kit 'spear'|'staff'|'bow'|'none', pack, cloak, head 'helm'|'hood'|'bare'|'wrap', lean */
  man(x, y, h, dir = 1, fill = '#14100c', o = {}){
    const f = SIL.f, sd = o.seed || 0, r = (k) => hash(sd, 700 + k), walk = o.walk == null ? 1 : o.walk, ph = o.phase != null ? o.phase : (r(1) * 2 - 1),
      s = walk * ph, lean = (o.lean != null ? o.lean : 1 + r(2) * 3) * walk, kit = o.kit || (r(3) < .4 ? 'spear' : 'none'), pack = o.pack != null ? o.pack : r(4) < .7,
      cloak = o.cloak != null ? o.cloak : r(5) < .5, head = o.head || (['helm', 'helm', 'hood', 'bare', 'wrap'][Math.floor(r(6) * 5)]), wide = .9 + r(7) * .22;
    const L = lean, sh = -80, hip = -48;
    let b = '';
    // legs: the front one reaching with the stride, the back one pushing off, heel up
    const fk = [3 + 7 * s + L * .3, -24], ff = [6 + 12 * s, -1.5], bk = [-2 - 6 * s + L * .3, -24], bf = [-4 - 12 * s, s > .2 ? -4 : -1.5];
    b += SIL.taper([[-1 + L * .5, hip], bk, bf], [9.5 * wide, 6.5, 5.5]) + SIL.taper([[2 + L * .5, hip], fk, ff], [9.5 * wide, 6.5, 5.5]);
    b += `<path d="M${f(bf[0] - 2)} ${f(bf[1] + 1.5)} L${f(bf[0] + 7)} ${f(bf[1] + 1.5)} L${f(bf[0] + 6)} ${f(bf[1] - 3)} Z M${f(ff[0] - 3)} 0 L${f(ff[0] + 7)} 0 L${f(ff[0] + 5)} -4.5 L${f(ff[0] - 2)} -4.5 Z"/>`;
    // the body: shoulders, chest, the coat's skirt or the cloak falling behind
    const S0 = -10 * wide + L, S1 = 10 * wide + L, W0 = -7 * wide + L * .6, W1 = 7 * wide + L * .6;
    b += `<path d="M${f(S0)} ${f(sh + 3)} Q${f(S0 + 1)} ${f(sh - 2)} ${f(L)} ${f(sh - 2)} Q${f(S1 - 1)} ${f(sh - 2)} ${f(S1)} ${f(sh + 3)} Q${f(S1)} ${f(-64)} ${f(W1)} ${f(hip + 2)} L${f(W1 + 2.5)} ${f(hip + 10)} L${f(W0 - 2.5)} ${f(hip + 10)} L${f(W0)} ${f(hip + 2)} Q${f(S0)} ${f(-64)} ${f(S0)} ${f(sh + 3)} Z" stroke="none"/>`;
    if (cloak) b += `<path d="M${f(S0 + 1)} ${f(sh)} Q${f(S0 - 7 - 4 * walk)} ${f(sh + 30)} ${f(S0 - 6 - 7 * walk)} ${f(-26)} L${f(S0 - 1)} ${f(-30)} L${f(W1)} ${f(-36)} L${f(W1)} ${f(hip)} Z" stroke="none"/>`;
    // arms: swinging against the stride, or the front hand on a spear or staff
    const held = kit === 'spear' || kit === 'staff', hand = held ? [S1 + 4, -58] : [S1 + 2 + 7 * s, -50 + Math.abs(s) * 3];
    b += SIL.taper([[S0 + 3, sh + 2], [S0 - 2 - 4 * s, -64], [S0 - 1 - 8 * s, -48]], [7 * wide, 5.5, 4.5]);
    b += SIL.taper([[S1 - 3, sh + 2], [S1 + 3, -66], hand], [7 * wide, 5.5, 4.5]);
    if (held) { const top = [hand[0] - 6 + L * .5, kit === 'spear' ? -132 : -118], foot = [hand[0] + 5, 0];
      b += `<path d="M${f(foot[0])} ${f(foot[1])} L${f(top[0])} ${f(top[1])}" fill="none" stroke-width="2.6"/>`;
      if (kit === 'spear') { const dx = (top[0] - foot[0]) / 132, dy = -1; b += `<path d="M${f(top[0] - 3)} ${f(top[1] + 2)} L${f(top[0] + dx * 14)} ${f(top[1] + dy * 14)} L${f(top[0] + 3)} ${f(top[1] + 2)} Z" stroke="none"/>`; } }
    if (kit === 'bow') b += `<path d="M${f(S0 + 4)} ${f(sh - 6)} Q${f(S0 - 10)} ${f(sh + 20)} ${f(S0 + 2)} ${f(hip + 10)}" fill="none" stroke-width="2.4"/>`;
    if (pack) b += `<rect x="${f(S0 - 9)}" y="${f(sh + 1)}" width="12" height="22" rx="3" stroke="none"/><rect x="${f(S0 - 10)}" y="${f(sh - 4)}" width="16" height="6.5" rx="3.2" stroke="none"/>`;
    // the neck and head
    const hx = L + 1.5, hy = -91;
    b += `<rect x="${f(hx - 3.6)}" y="${f(sh - 6)}" width="7" height="8" stroke="none"/><ellipse cx="${f(hx + 1)}" cy="${f(hy)}" rx="6.8" ry="7.8" stroke="none"/><path d="M${f(hx + 6)} ${f(hy + 1)} L${f(hx + 9)} ${f(hy + 4)} L${f(hx + 5.5)} ${f(hy + 5)} Z" stroke="none"/>`;
    if (head === 'helm') b += `<path d="M${f(hx - 8.5)} ${f(hy - 1)} Q${f(hx - 8)} ${f(hy - 13)} ${f(hx + 1)} ${f(hy - 13.5)} Q${f(hx + 10)} ${f(hy - 13)} ${f(hx + 10.5)} ${f(hy - 1)} Z M${f(hx - 10)} ${f(hy - 2.5)} L${f(hx + 12)} ${f(hy - 2.5)} L${f(hx + 12)} ${f(hy)} L${f(hx - 10)} ${f(hy)} Z" stroke="none"/>`;
    if (head === 'hood') b += `<path d="M${f(hx - 9)} ${f(hy + 8)} Q${f(hx - 12)} ${f(hy - 12)} ${f(hx - 1)} ${f(hy - 14)} Q${f(hx + 9)} ${f(hy - 12)} ${f(hx + 8)} ${f(hy - 3)} L${f(hx + 3)} ${f(hy + 2)} Z" stroke="none"/>`;
    if (head === 'wrap') b += `<path d="M${f(hx - 8)} ${f(hy - 1)} Q${f(hx - 7)} ${f(hy - 14)} ${f(hx + 2)} ${f(hy - 13)} Q${f(hx + 10)} ${f(hy - 11)} ${f(hx + 8)} ${f(hy - 2)} Z M${f(hx - 7)} ${f(hy - 2)} Q${f(hx - 15)} ${f(hy + 4)} ${f(hx - 13)} ${f(hy + 14)} L${f(hx - 9)} ${f(hy + 12)} Z" stroke="none"/>`;
    return SIL.g(x, y, h / 100, dir, fill, b, o.op);
  },

  /* a tapered limb: a polyline with a width at each point, closed into one shape (joints read, unlike a round-capped stroke) */
  taper(pts, ws){ const f = SIL.f, L = [], R = [];
    for (let i = 0; i < pts.length; i++) { const a = pts[Math.max(0, i - 1)], c = pts[Math.min(pts.length - 1, i + 1)], dx = c[0] - a[0], dy = c[1] - a[1], d = Math.hypot(dx, dy) || 1, nx = -dy / d, ny = dx / d, w = ws[i] / 2;
      L.push([pts[i][0] + nx * w, pts[i][1] + ny * w]); R.push([pts[i][0] - nx * w, pts[i][1] - ny * w]); }
    return `<path d="M${SIL.pts(L)} L${SIL.pts(R.reverse())} Z" stroke="none"/>`; },

  /* a horse or a mule, side on, facing right, withers 100 high. o: seed, mule, walk, phase, rider (true, or a fill), lance, pennon, head 'up'|'down'|'graze', pack */
  horse(x, y, h, dir = 1, fill = '#14100c', o = {}){
    const f = SIL.f, sd = o.seed || 0, r = (k) => hash(sd, 740 + k), mule = !!o.mule, walk = o.walk == null ? 1 : o.walk, ph = o.phase != null ? o.phase : r(1) * 2 - 1, s = walk * ph;
    let b = '';
    const hoof = (x0) => `<path d="M${f(x0 - 4.5)} 0 L${f(x0 + 5)} 0 L${f(x0 + 3.5)} -5 L${f(x0 - 3.5)} -5 Z" stroke="none"/>`, lw = mule ? .82 : 1;
    // forelegs: elbow, knee, fetlock; the far one swung the other way
    const fore = (dx, sw) => { const kx = 50 + dx + sw * 8, fx = 52 + dx + sw * 16; return SIL.taper([[46 + dx, -60], [kx - 1, -30], [fx - 2, -9], [fx, -3]], [15 * lw, 8.5 * lw, 6 * lw, 6.5 * lw]) + hoof(fx + 1); };
    // hind legs: the gaskin running back to the hock, the cannon straight down
    const hind = (dx, sw) => { const hx = -44 + dx - sw * 4, fx = -38 + dx - sw * 14; return SIL.taper([[-32 + dx, -66], [-38 + dx - sw * 2, -48], [hx, -32], [fx - 1, -9], [fx, -3]], [20 * lw, 12 * lw, 8 * lw, 6 * lw, 6.5 * lw]) + hoof(fx + 1); };
    b += fore(-6, -s) + hind(6, -s) + fore(0, s) + hind(0, s);
    // the body: chest, belly, quarters, the back with its dip, the croup
    b += `<path d="M62 -74 Q66 -60 54 -56 Q30 -50 0 -52 Q-26 -50 -40 -58 Q-58 -64 -60 -82 Q-60 -96 -48 -100 Q-28 -104 -6 -96 Q14 -94 34 -102 Q52 -98 62 -74 Z" stroke="none"/>`;
    // the neck and head, drawn raised and turned down about the withers for a mule in the shafts or a horse grazing
    const ang = o.head === 'down' ? 28 : o.head === 'graze' ? 62 : 0, el = mule ? 20 : 10;
    let nh = `<path d="M30 -100 Q40 -128 60 -142 Q70 -146 74 -140 Q86 -128 98 -110 Q102 -104 98 -100 Q92 -98 84 -104 Q76 -110 72 -112 Q66 -96 62 -74 Z" stroke="none"/>`;
    nh += `<path d="M62 -140 L${f(56 - (mule ? 4 : 0))} ${f(-140 - el)} L67 -142 Z M67 -141 L${f(66 + (mule ? 2 : 0))} ${f(-142 - el)} L71 -139 Z" stroke="none"/>`;
    if (!mule) nh += `<path d="M30 -100 Q40 -130 62 -144 L60 -134 Q46 -122 38 -100 Z" stroke="none"/>`;
    else nh += `<path d="M34 -102 Q44 -126 60 -140" fill="none" stroke-width="3"/>`;
    b += ang ? `<g transform="rotate(${ang} 40 -92)">${nh}</g>` : nh;
    // the tail: a horse's full tail, or a mule's rope with a tuft
    b += mule ? `<path d="M-58 -90 Q-66 -72 -64 -46" fill="none" stroke-width="2.6"/><path d="M-67 -50 Q-64 -34 -60 -48 Z" stroke-width="3"/>`
      : `<path d="M-56 -94 Q-74 -88 -74 -60 Q-74 -40 -66 -28 Q-64 -48 -62 -64 Q-60 -82 -52 -90 Z" stroke="none"/>`;
    // a pack load, or the rider
    if (o.pack) b += `<path d="M-34 -98 Q-36 -124 -10 -126 Q14 -126 18 -98 Z" stroke="none"/><path d="M-38 -104 L-38 -78 L-22 -78 L-22 -104 Z M6 -102 L6 -78 L22 -78 L22 -102 Z" stroke="none"/>`;
    if (o.rider) { const rf = typeof o.rider === 'string' ? ` fill="${o.rider}" stroke="${o.rider}"` : '';
      b += `<g${rf}><path d="M-12 -98 Q-14 -130 -6 -146 L8 -146 Q14 -126 12 -98 Z" stroke="none"/>${SIL.taper([[2, -102], [14, -86], [12, -64], [16, -60]], [12, 9, 7, 6])}${SIL.taper([[6, -140], [18, -124], [30, -114]], [8, 6.5, 5])}`
        + `<rect x="-3" y="-154" width="7" height="9" stroke="none"/><ellipse cx="1" cy="-160" rx="7" ry="8" stroke="none"/><path d="M-8 -161 Q-8 -173 1 -173 Q10 -173 11 -161 Z M-9 -163 L13 -163 L13 -160 L-9 -160 Z" stroke="none"/>`
        + (o.cloak !== false ? `<path d="M-8 -144 Q-22 -124 -28 -98 L-12 -100 Z" stroke="none"/>` : '')
        + (o.lance ? `<path d="M26 -100 L44 -236" fill="none" stroke-width="2.6"/><path d="M42 -230 L47 -256 L48 -228 Z" stroke="none"/>${o.pennon ? `<path d="M45 -240 L64 -234 L44 -228 Z" fill="${o.pennon}" stroke="none"/>` : ''}` : '') + `</g>`; }
    return SIL.g(x, y, h / 100, dir, fill, b, o.op);
  },

  /* a wagon with its team, facing right: w = the bed's length. o: hood (true, or a colour for the canvas), team 'mule'|'horse'|'none', n (1 or 2 in the traces), driver, load, seed */
  wagon(x, y, w, dir = 1, fill = '#14100c', o = {}){
    const f = SIL.f, k = w / 100, sd = o.seed || 0, r = (j) => hash(sd, 780 + j);
    let b = '';
    // the team first, ahead of the wagon, then the tongue joining them
    const team = o.team == null ? 'mule' : o.team, nt = o.n || 2;
    if (team !== 'none') for (let i = nt - 1; i >= 0; i--) b += SIL.horse(98 + i * 5, i ? -1.5 : 0, 50, 1, fill, {mule: team === 'mule', seed: sd * 3 + i, phase: i ? -.6 : .5, head: o.down ? 'down' : 'up'});
    if (team !== 'none') b += `<path d="M46 -20 L94 -30" fill="none" stroke-width="2.6"/><path d="M50 -36 Q72 -44 96 -40" fill="none" stroke-width="1.4"/>`;
    // the bed: planked sides, a raised end, the axles
    b += `<path d="M-52 -20 L-54 -46 L46 -46 L50 -20 Z" stroke="none"/><path d="M-56 -48 L48 -48 L48 -44 L-56 -44 Z" stroke="none"/>`;
    // the wheels: a big one behind, a smaller one forward; rims, spokes, hubs
    const wheel = (cx, cy, rr, n) => { let s = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rr - 1.6)}" fill="none" stroke-width="3.2"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rr * .2)}" stroke="none"/>`;
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + r(i) * .2; s += `<path d="M${f(cx)} ${f(cy)} L${f(cx + Math.cos(a) * rr * .9)} ${f(cy + Math.sin(a) * rr * .9)}" stroke-width="1.6"/>`; } return s; };
    b += wheel(-30, -17, 17, 12) + wheel(30, -14, 14, 10);
    // the tilt: canvas over hoops, the hoops showing as ribs, or a load roped down
    if (o.hood !== false) { const hc = typeof o.hood === 'string' ? o.hood : fill;
      b += `<path d="M-54 -46 L-56 -70 Q-50 -98 -2 -100 Q46 -98 50 -72 L48 -46 Z" fill="${hc}" stroke="none"/>`;
      if (typeof o.hood === 'string') b += `<path d="M-30 -48 Q-34 -76 -30 -98 M-4 -48 L-4 -100 M22 -48 Q26 -76 24 -98" fill="none" stroke="${fill}" stroke-width="1.6" opacity=".5"/><path d="M-56 -70 Q-50 -98 -2 -100 Q46 -98 50 -72" fill="none" stroke="${fill}" stroke-width="2" opacity=".6"/>`; }
    else if (o.load) b += `<path d="M-48 -46 Q-46 -66 -20 -68 Q10 -72 36 -64 Q44 -58 44 -46 Z" fill="${typeof o.load === 'string' ? o.load : fill}" stroke="none"/><path d="M-40 -46 Q-10 -76 30 -46" fill="none" stroke-width="1.4"/>`;
    if (o.driver) b += SIL.man(52, -44, 42, 1, fill, {walk: 0, kit: 'none', pack: false, cloak: true, seed: sd + 5});
    return SIL.g(x, y, k, dir, fill, b, o.op);
  },

  /* a quorl of the Black Moranth, flying right: a long segmented body, four clear wings, a rider astride behind the head. w = the body's length */
  quorl(x, y, w, dir = 1, fill = '#0c0a0e', o = {}){
    const f = SIL.f, k = w / 100, t = o.tilt || 0, wing = o.wing || '#cfd6e0', beat = o.beat == null ? hash(o.seed || 0, 820) : o.beat;
    let b = `<g transform="rotate(${f(t)})">`;
    // the wings, two pairs, thin and bright, the far pair higher
    const up = -14 - beat * 16;
    for (const [cx, sp] of [[14, 1], [2, .86]]) b += `<path d="M${cx} -3 Q${f(cx - 14 * sp)} ${f(up - 10)} ${f(cx - 44 * sp)} ${f(up - 2)} Q${f(cx - 24 * sp)} ${f(up + 12)} ${cx} -1 Z" fill="${wing}" stroke="${wing}" stroke-width=".6" fill-opacity=".38" stroke-opacity=".7"/>`
      + `<path d="M${cx} -1 Q${f(cx + 12 * sp)} ${f(10 + beat * 6)} ${f(cx + 38 * sp)} ${f(14 + beat * 8)} Q${f(cx + 22 * sp)} ${f(2)} ${cx} -2 Z" fill="${wing}" stroke="${wing}" stroke-width=".6" fill-opacity=".3" stroke-opacity=".6"/>`;
    // the body: head, thorax, a long tail in segments tapering away
    b += `<ellipse cx="34" cy="0" rx="6" ry="5" stroke="none"/><ellipse cx="22" cy="0" rx="10" ry="5.5" stroke="none"/><path d="M14 -3 L-60 -.8 L-62 0 L-60 .8 L14 3 Z" stroke="none"/>`;
    for (let i = 0; i < 7; i++) b += `<path d="M${-4 - i * 8} -2.8 L${-4 - i * 8} 2.8" stroke="${wing}" stroke-width=".7" opacity=".35"/>`;
    b += `<path d="M30 3 L26 10 M20 4 L18 11 M12 3 L12 10" fill="none" stroke-width="1.2"/>`;
    // the rider, astride, leaning forward
    if (o.rider !== false) b += `<path d="M14 -4 Q12 -16 16 -24 L24 -24 Q26 -14 22 -4 Z" stroke="none"/><ellipse cx="21" cy="-28" rx="4.2" ry="4.6" stroke="none"/>${SIL.limb([22, -20], [30, -14], [32, -6], 3.4, 3)}`;
    return SIL.g(x, y, k, dir, fill, b + '</g>', o.op);
  },

  /* a cart with two wheels and a mule in the shafts (a single animal), facing right */
  cart(x, y, w, dir = 1, fill = '#14100c', o = {}){
    const f = SIL.f, k = w / 100;
    let b = SIL.horse(86, 0, 56, 1, fill, {mule: o.team !== 'horse', seed: o.seed || 0, phase: .3, head: o.down ? 'down' : 'up'});
    b += `<path d="M30 -34 L78 -42" fill="none" stroke-width="2.4"/><path d="M-40 -28 L-42 -50 L34 -50 L36 -28 Z" stroke="none"/>`;
    b += `<circle cx="-4" cy="-18" r="17" fill="none" stroke-width="3"/><circle cx="-4" cy="-18" r="3.6" stroke="none"/>`;
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; b += `<path d="M-4 -18 L${f(-4 + Math.cos(a) * 15)} ${f(-18 + Math.sin(a) * 15)}" stroke-width="1.5"/>`; }
    if (o.load) b += `<path d="M-38 -50 Q-34 -70 -6 -72 Q24 -72 32 -50 Z" fill="${typeof o.load === 'string' ? o.load : fill}" stroke="none"/>`;
    return SIL.g(x, y, k, dir, fill, b, o.op);
  },
};

/* the old kit's far figures, rebuilt on these (same calls, same places in every plate) */
TK.walker = (x, y, k, i, fill, o = {}) => SIL.man(x, y, 26 * k, o.dir || 1, fill, {seed: i, walk: o.walk == null ? 1 : o.walk, kit: hash(i, 83) < (o.spears != null ? o.spears : .4) ? 'spear' : 'none', lean: o.lean});
PK.wagon = (x, y, k, fill, hood = true, i = 0) => SIL.wagon(x, y, 40 * k, 1, fill, {hood: hood === true ? fill : hood, seed: i + Math.round(x), team: 'mule', n: 2});
PK.rider = (x, y, k, fill, lance = false, flip = false, bare = false) => SIL.horse(x, y, 19 * k, flip ? -1 : 1, fill, {rider: !bare, lance, seed: Math.round(x * 7 + y), phase: .4, cloak: true});
