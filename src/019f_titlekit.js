/* ============ the title kit (v13.2): shared pieces for the painted titles of Books One to Nine (019g and each N00b file) ============
   Everything is drawn by Claude for this game from seeded generators: no image is copied. Book Ten's title (180b) is the model: a layered
   sky, ground with texture, a far column, and the book's own soldiers in the foreground seen from behind, off to the right of the lettering.
   TK.back(o) draws one soldier seen from behind, feet at 0,0, about 300 tall, lit from the left (o.flip mirrors it):
     o.fill  body fill (a gradient url or colour), o.dark  the shadowed parts, o.rim  rim-light colour, o.ink  outline colour
     o.head  'helm' | 'cap' | 'hood' | 'bare' | 'wrap'     o.kit  'spear' | 'xbow' | 'shield' | 'sword' | 'staff' | 'none'
     o.cloak  colour or ''     o.pack  true/false          o.walk  0 standing, 1 mid-stride   o.dust  a colour over the boots and shins      o.tall  height factor, o.wide  build factor
   TK.walker(x, y, k, i, fill, o) a far soldier, a few pixels high. TK.smoke(...) a column of blurred smoke. TK.f1 rounds to one place. */
const TK = {
  f1: n => Math.round(n * 10) / 10,
  rim(d, c, w = 2, op = .55){ return `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" opacity="${op}"/>`; },
  back(o){
    const f1 = TK.f1, T = o.tall || 1, Wd = o.wide || 1, ink = o.ink || '#050608', dark = o.dark || '#0c0e12', fill = o.fill || '#2a2e36', rc = o.rim || '#e0e8f8', walk = o.walk || 0;
    const sx = n => f1(n * Wd), sy = n => f1(n * T), P = (d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m, x, y) => sx(+x) + ' ' + sy(+y));
    let s = '';
    // the spear or staff behind the right hand goes first when held out to the side
    const hand = [f1(52 * Wd), sy(-150)];
    if (o.kit === 'spear' || o.kit === 'staff') s += `<path d="M${f1(hand[0] + 2)} ${sy(14)} L${f1(hand[0] + 8)} ${sy(-440)}" stroke="${o.shaft || '#2a2016'}" stroke-width="5" stroke-linecap="round"/>`
      + (o.kit === 'spear' ? `<path d="M${f1(hand[0] + 8)} ${sy(-476)} L${f1(hand[0] + 14)} ${sy(-438)} L${f1(hand[0] + 2)} ${sy(-438)} Z" fill="${o.blade || '#aab4c2'}" stroke="${ink}" stroke-width="1.2"/>${TK.rim(`M${f1(hand[0] + 7)} ${sy(-430)} L${f1(hand[0] + 3)} ${sy(-200)}`, rc, 1.2, .3)}` : '');
    // legs and boots: standing apart, or one stepping (the back foot's heel up)
    const lf = walk ? -4 : -8, rf = walk ? -16 : 0;
    s += `<path d="${P(`M-27 -92 L-30 ${-30 + lf} L-12 ${-30 + lf} L-6 -92 Z`)}" fill="${dark}"/><path d="${P(`M6 -92 L13 ${-30 + rf} L30 ${-30 + rf} L27 -92 Z`)}" fill="${dark}"/>`;
    s += `<path d="${P(`M-33 ${-34 + lf} L-33 ${lf} L-9 ${lf} L-10 ${-34 + lf} Z`)}" fill="${ink}"/><path d="${P(`M11 ${-34 + rf} L${walk ? 14 : 10} ${rf} L${walk ? 30 : 34} ${rf} L32 ${-34 + rf} Z`)}" fill="${ink}"/>`;
    s += TK.rim(P(`M-29 -88 L-31 ${-34 + lf}`), rc, 1.6, .35);
    if (o.dust) s += `<path d="${P(`M-29 -62 L-33 ${lf} L-9 ${lf} L-8 -62 Z M8 -62 L${walk ? 14 : 10} ${rf} L${walk ? 30 : 34} ${rf} L29 -62 Z`)}" fill="${o.dust}" opacity=".45"/>`;
    // the cloak (under the pack), the body, the skirt
    if (o.cloak) s += `<path d="${P('M-20 -254 Q-42 -252 -50 -234 Q-62 -160 -61 -72 Q-46 -63 -30 -68 Q-14 -59 0 -64 Q16 -59 30 -66 Q46 -61 61 -75 Q63 -160 50 -234 Q42 -252 20 -254 Z')}" fill="${o.cloak}" stroke="${ink}" stroke-width="2"/>`
      + `<path d="${P('M-30 -230 Q-36 -150 -34 -66 M-6 -238 Q-8 -150 -4 -62 M22 -232 Q30 -150 28 -64')}" stroke="${ink}" stroke-width="2.4" fill="none" opacity=".45"/>` + TK.rim(P('M-48 -232 Q-60 -160 -59 -78'), rc, 2, .45);
    else s += `<path d="${P('M-18 -253 Q-38 -251 -44 -233 Q-48 -196 -40 -150 L-35 -118 L35 -118 L40 -150 Q48 -196 44 -233 Q38 -251 18 -253 Z')}" fill="${fill}" stroke="${ink}" stroke-width="2"/>`
      + `<path d="${P('M-37 -124 L-44 -86 Q0 -80 44 -86 L37 -124 Z')}" fill="${dark}" stroke="${ink}" stroke-width="1.6"/>` + `<path d="${P('M-36 -126 L36 -126')}" stroke="${o.belt || '#2a2016'}" stroke-width="6"/>`
      + TK.rim(P('M-41 -236 Q-47 -196 -39 -150'), rc, 2, .5);
    // the arms: the left hangs; the right holds the spear or staff, or hangs
    const held = o.kit === 'spear' || o.kit === 'staff';
    s += `<path d="${P('M-40 -234 Q-56 -196 -54 -136')}" stroke="${o.cloak ? o.cloak : fill}" stroke-width="${f1(17 * Wd)}" stroke-linecap="round" fill="none"/>` + TK.rim(P('M-48 -224 Q-60 -192 -58 -140'), rc, 1.8, .45);
    s += held ? `<path d="M${sx(40)} ${sy(-234)} Q${sx(58)} ${sy(-200)} ${hand[0]} ${hand[1]}" stroke="${dark}" stroke-width="${f1(16 * Wd)}" stroke-linecap="round" fill="none"/><ellipse cx="${f1(hand[0] + 3)}" cy="${hand[1]}" rx="7" ry="8" fill="${o.skin || '#3a2c22'}"/>`
      : `<path d="${P('M40 -234 Q56 -196 54 -136')}" stroke="${dark}" stroke-width="${f1(17 * Wd)}" stroke-linecap="round" fill="none"/>`;
    // the pack and bedroll, or a round shield, on the back
    if (o.pack !== false && o.kit !== 'shield') s += `<rect x="${sx(-30)}" y="${sy(-232)}" width="${sx(60)}" height="${sy(-68) * -1}" rx="8" fill="${o.packc || '#28221a'}" stroke="${ink}" stroke-width="2.4"/><path d="M${sx(-26)} ${sy(-200)} L${sx(26)} ${sy(-200)}" stroke="${ink}" stroke-width="2" opacity=".6"/><ellipse cx="0" cy="${sy(-236)}" rx="${sx(36)}" ry="${f1(10 * T)}" fill="${o.roll || '#302820'}" stroke="${ink}" stroke-width="2"/>` + TK.rim(`M${sx(-28)} ${sy(-226)} L${sx(-28)} ${sy(-172)}`, rc, 1.6, .4) + TK.rim(`M${sx(-34)} ${sy(-240)} Q${sx(-20)} ${sy(-247)} 0 ${sy(-246)}`, rc, 1.4, .4);
    if (o.kit === 'shield') { const r = f1(44 * Wd); s += `<circle cx="0" cy="${sy(-186)}" r="${r}" fill="${o.shieldc || '#3a2a20'}" stroke="${ink}" stroke-width="3"/><circle cx="0" cy="${sy(-186)}" r="${f1(r * .78)}" fill="none" stroke="${o.shieldr || '#5a4a34'}" stroke-width="2" opacity=".7"/><circle cx="0" cy="${sy(-186)}" r="${f1(r * .2)}" fill="#6a6a70" stroke="${ink}" stroke-width="1.6"/>` + TK.rim(`M${f1(-r * .92)} ${sy(-176)} A${r} ${r} 0 0 1 ${f1(-r * .3)} ${f1(sy(-186) - r * .95)}`, rc, 2, .5); }
    if (o.kit === 'xbow') s += `<path d="M${sx(-34)} ${sy(-120)} L${sx(30)} ${sy(-238)}" stroke="#2a2016" stroke-width="7" stroke-linecap="round"/><path d="M${sx(8)} ${sy(-226)} Q${sx(34)} ${sy(-216)} ${sx(52)} ${sy(-188)} M${sx(8)} ${sy(-226)} Q${sx(18)} ${sy(-254)} ${sx(10)} ${sy(-276)}" stroke="#4a4038" stroke-width="3" fill="none"/>`;
    if (o.kit === 'sword') s += `<path d="M${sx(-34)} ${sy(-126)} L${sx(-50)} ${sy(-56)}" stroke="#1a1612" stroke-width="7" stroke-linecap="round"/><path d="M${sx(-38)} ${sy(-130)} L${sx(-28)} ${sy(-134)}" stroke="#6a5a40" stroke-width="4"/>`;
    // the head
    const hd = o.head || 'helm';
    s += `<path d="${P('M-11 -248 L-12 -262 L12 -262 L11 -248 Z')}" fill="${o.skin || '#3a2c22'}"/>`;
    if (hd === 'helm') s += `<path d="${P('M-19 -262 L-21 -250 Q0 -246 21 -250 L19 -262 Z')}" fill="${dark}" stroke="${ink}" stroke-width="1.6"/><path d="${P('M-19 -262 Q-21 -294 0 -297 Q21 -294 19 -262 Z')}" fill="${o.helmc || '#3a3e4a'}" stroke="${ink}" stroke-width="2"/><path d="${P('M-24 -263 Q0 -268 24 -263')}" stroke="${ink}" stroke-width="5" stroke-linecap="round" fill="none"/>` + TK.rim(P('M-18 -268 Q-19 -290 -2 -295'), rc, 2, .65);
    if (hd === 'cap') s += `<path d="${P('M-17 -258 Q-20 -290 0 -292 Q20 -290 17 -258 Q0 -254 -17 -258 Z')}" fill="${o.helmc || '#3c4456'}" stroke="${ink}" stroke-width="2"/>${[0, 1, 2, 3].map(i => `<path d="${P(`M${-12 + i * 8} -258 Q${-10 + i * 7} -276 ${-4 + i * 3} -290`)}" stroke="${ink}" stroke-width="1.2" fill="none" opacity=".5"/>`).join('')}` + TK.rim(P('M-16 -264 Q-18 -286 -2 -290'), rc, 1.8, .6);
    if (hd === 'hood') s += `<path d="${P('M-24 -238 Q-28 -280 -10 -300 Q6 -306 18 -292 Q28 -270 24 -238 Q0 -232 -24 -238 Z')}" fill="${o.cloak || o.helmc || '#2a2420'}" stroke="${ink}" stroke-width="2"/>` + TK.rim(P('M-24 -246 Q-26 -282 -8 -298'), rc, 2, .55);
    if (hd === 'bare') s += `<path d="${P('M-15 -256 Q-18 -288 0 -290 Q18 -288 15 -256 Q0 -250 -15 -256 Z')}" fill="${o.hair || '#1a120c'}" stroke="${ink}" stroke-width="1.6"/>` + TK.rim(P('M-15 -262 Q-16 -284 -2 -288'), rc, 1.6, .5);
    if (hd === 'wrap') s += `<path d="${P('M-17 -256 Q-21 -288 0 -292 Q21 -288 17 -256 Q0 -250 -17 -256 Z')}" fill="${o.helmc || '#8a7a5c'}" stroke="${ink}" stroke-width="1.8"/><path d="${P('M8 -262 Q20 -250 24 -226')}" stroke="${o.helmc || '#8a7a5c'}" stroke-width="7" stroke-linecap="round" fill="none"/>` + TK.rim(P('M-16 -262 Q-18 -284 -2 -290'), rc, 1.8, .6);
    return `<g${o.flip ? ' transform="scale(-1 1)"' : ''}>${s}</g>`;
  },
  // a far soldier: a dark figure with a pack and maybe a spear, a few pixels high (k ~ .3 to 1.2)
  walker(x, y, k, i, fill, o = {}){ const f1 = TK.f1, h = (a, b) => hash(a, b), lean = (o.lean != null ? o.lean : 2 + h(i, 81) * 3), tall = 20 + h(i, 82) * 5, spear = h(i, 83) < (o.spears != null ? o.spears : .4), pack = h(i, 84) < .8;
    return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})" fill="${fill}"><path d="M-3 0 L-2 ${f1(-tall * .45)} L${f1(-3 + lean * .3)} ${f1(-tall * .85)} L${f1(3 + lean * .3)} ${f1(-tall * .85)} L3 ${f1(-tall * .45)} L3 0 Z"/><circle cx="${f1(lean * .5)}" cy="${f1(-tall - 2)}" r="3.2"/>${pack ? `<rect x="${f1(-7 + lean * .2)}" y="${f1(-tall * .85)}" width="6" height="9" rx="2"/>` : ''}${spear ? `<path d="M5 2 L${f1(6 + lean)} ${f1(-tall - 14)}" stroke="${fill}" stroke-width="1.3"/>` : ''}</g>`; },
  // a column of smoke: blurred puffs rising and drifting (dx per height), under a filter the caller defines
  smoke(x, y, hgt, w, dx, col, op, seed, filt){ const f1 = TK.f1; let s = '';
    for (let i = 0; i < 14; i++) { const t = i / 13, px = x + dx * t * t * hgt / 100 + (hash(i, seed) - .5) * w * .4, py = y - t * hgt, r = w * (.35 + t * .9);
      s += `<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="${f1(r)}" ry="${f1(r * .7)}" fill="${col}" opacity="${f1(op * (1 - t * .7) * 100) / 100}"/>`; }
    return `<g filter="url(#${filt})">${s}</g>`; },
  // a bird far off: a shallow M, wings up or down
  bird(x, y, k, up, col){ const f1 = TK.f1; return `<path d="M${f1(x - 9 * k)} ${f1(y + (up ? -4 : 3) * k)} Q${f1(x - 4 * k)} ${f1(y - (up ? 6 : 0) * k)} ${f1(x)} ${f1(y)} Q${f1(x + 4 * k)} ${f1(y - (up ? 6 : 0) * k)} ${f1(x + 9 * k)} ${f1(y + (up ? -4 : 3) * k)}" stroke="${col}" stroke-width="${f1(1.4 * k)}" fill="none" stroke-linecap="round"/>`; },
  // stars: n points over the band y0..y1, a few twinkling under class cls
  stars(n, seed, y0, y1, W, col, cls){ const f1 = TK.f1; let s = '';
    for (let i = 0; i < n; i++) { const x = hash(i, seed) * W, y = y0 + Math.pow(hash(i, seed + 1), 1.2) * (y1 - y0), r = .35 + Math.pow(hash(i, seed + 2), 3.2) * 1.6, op = .25 + hash(i, seed + 3) * .65;
      s += cls && i % 11 === 0 ? `<circle class="${cls}" style="animation-delay:-${f1(hash(i, seed + 4) * 5)}s" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r + .3)}" fill="${col}"/>` : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${col}" opacity="${f1(op)}"/>`; }
    return s; },
};
