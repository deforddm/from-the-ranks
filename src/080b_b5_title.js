/* ============ Book Five's title: Letheras at dusk, the Quillas Canal, and a company crossing a bridge north (v8.0) ============
   The painted title (ART 'title/mt', drawn by Claude for this game, built here from a seeded generator so the city and the water stay one
   drawing): a dusk sky over Letheras; the city's towers on the horizon, a palace among three old towers and a great unfinished dome under
   scaffolding; the canal coming out of the foreground between its stepped walks; a bridge over it with a file of soldiers crossing, spears
   and round shields; lamps along the walks; and in the foreground, a mooring post with a rope over the water and a weighted coin-sack on it
   (the Drownings, the book's debt). Its canvas stand-in for Settings › Artwork off is startTitleMT, hooked into startTitleBackdrop from here.
   The patch (ART 'insignia/mt', docs/patches.md): a coin with a milled edge, of faded Letherii blue-grey cloth; the stitched border, VI in
   sand-gold, the five tally strokes, a coin-sack tied on a rope, and the shared flame on the right.
   Motion: the .k5-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  /* redrawn v13.2 from a seeded generator (019f's kit): dusk over Letheras; the city's towers along the skyline, a palace among three old
     towers and a great unfinished dome under scaffolding, windows lit; the Quillas Canal coming out of the foreground between its stepped
     walks, the sky and the lamps on the water; a bridge over it with a file of soldiers crossing, spears and round shields; on the right-hand
     walk, seen from behind, two of the Sixth Company watching them go; and in the foreground, a mooring post with a rope over the water and a
     weighted coin-sack on it (the Drownings, the book's debt). */
  const f1 = TK.f1, h = (i, s) => hash(i, s), W = 1600, H = 900, HZ = 470, VX = 760;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k5-fl{animation:k5-fl 2.2s ease-in-out infinite}.k5-wv{animation:k5-wv 6s ease-in-out infinite}.k5-sw{animation:k5-sw 5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 0}.k5-wk{animation:k5-wk 2.2s ease-in-out infinite}
@keyframes k5-fl{0%,100%{opacity:.75}50%{opacity:1}}@keyframes k5-wv{0%,100%{transform:translate(0,0)}50%{transform:translate(8px,0)}}@keyframes k5-sw{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}@keyframes k5-wk{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-.6px)}}
@media (prefers-reduced-motion:reduce){.k5-fl,.k5-wv,.k5-sw,.k5-wk{animation:none}}.reduce .k5-fl,.reduce .k5-wv,.reduce .k5-sw,.reduce .k5-wk{animation:none}</style>
<defs><linearGradient id="k5sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1024"/><stop offset=".45" stop-color="#2a2c4c"/><stop offset=".78" stop-color="#8a5262"/><stop offset="1" stop-color="#e8946a"/></linearGradient>
<linearGradient id="k5water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c88070"/><stop offset=".15" stop-color="#5a4458"/><stop offset=".55" stop-color="#1e2236"/><stop offset="1" stop-color="#080a14"/></linearGradient>
<linearGradient id="k5wallL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0e0e16"/><stop offset="1" stop-color="#2a2632"/></linearGradient>
<linearGradient id="k5wallR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a3240"/><stop offset="1" stop-color="#121118"/></linearGradient>
<radialGradient id="k5lamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd890" stop-opacity=".95"/><stop offset=".35" stop-color="#ffa050" stop-opacity=".35"/><stop offset="1" stop-color="#ffa050" stop-opacity="0"/></radialGradient>
<linearGradient id="k5body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a4a62"/><stop offset=".3" stop-color="#1e1e2c"/><stop offset="1" stop-color="#08080e"/></linearGradient>
<filter id="k5b16" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="16"/></filter><filter id="k5b3" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="3"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#k5sky)"/>`;
  s += TK.stars(90, 501, 0, 200, W, '#e8eaf8', '');
  s += `<g filter="url(#k5b16)">${[...Array(9)].map((_, i) => { const y = 180 + h(i, 511) * 250; return `<ellipse cx="${f1(h(i, 512) * W)}" cy="${f1(y)}" rx="${f1(200 + h(i, 513) * 320)}" ry="${f1(8 + h(i, 514) * 12)}" fill="${y > 330 ? '#f0a080' : '#6a4a6a'}" opacity="${f1(.3 + h(i, 515) * .3)}"/>`; }).join('')}</g>`;
  /* the skyline: two depths of roofs and towers, the palace's three old towers and the great dome under scaffolding */
  const sky = (y0, n, hmax, seed, col, lit) => { let d = `M0 ${y0}`, wn = ''; for (let i = 0; i < n; i++) { const x = i * W / n, w = W / n, ht = 10 + Math.pow(h(i, seed), 2) * hmax, tw = h(i, seed + 1) < .15;
    d += ` L${f1(x)} ${f1(y0 - ht)} L${f1(x + w * (tw ? .3 : 1))} ${f1(y0 - ht)}`; if (tw) d += ` L${f1(x + w * .3)} ${f1(y0 - ht - 40)} L${f1(x + w * .4)} ${f1(y0 - ht - 54)} L${f1(x + w * .5)} ${f1(y0 - ht - 40)} L${f1(x + w * .5)} ${f1(y0 - ht)} L${f1(x + w)} ${f1(y0 - ht)}`;
    if (lit) for (let k = 0; k < 3; k++) if (h(i * 5 + k, seed + 2) < .3) wn += `<rect x="${f1(x + 3 + h(i * 5 + k, seed + 3) * (w - 6))}" y="${f1(y0 - ht + 6 + h(i * 5 + k, seed + 4) * (ht - 8))}" width="2" height="3" fill="#ffcc80" opacity=".8"/>`; }
    return `<path d="${d} L${W} ${y0} Z" fill="${col}"/>${wn}`; };
  s += sky(HZ, 60, 60, 521, '#2a2236', false);
  s += `<g fill="#1c1626"><rect x="560" y="${HZ - 190}" width="26" height="190"/><path d="M556 ${HZ - 190} L573 ${HZ - 226} L590 ${HZ - 190} Z"/><rect x="640" y="${HZ - 230}" width="30" height="230"/><path d="M636 ${HZ - 230} L655 ${HZ - 270} L674 ${HZ - 230} Z"/><rect x="720" y="${HZ - 175}" width="24" height="175"/><path d="M716 ${HZ - 175} L732 ${HZ - 206} L748 ${HZ - 175} Z"/><path d="M590 ${HZ} L590 ${HZ - 120} L720 ${HZ - 120} L720 ${HZ} Z"/></g>`;
  s += `<g><path d="M300 ${HZ - 60} A110 110 0 0 1 520 ${HZ - 60} Z" fill="#1c1626"/><path d="M330 ${HZ - 60} A80 90 0 0 1 400 ${HZ - 150}" stroke="#8a6a7a" stroke-width="1.6" fill="none" opacity=".4"/>`;
  let sc = ''; for (let i = 0; i < 10; i++) sc += `M${300 + i * 22} ${HZ - 60} L${300 + i * 22} ${f1(HZ - 60 - Math.sqrt(Math.max(0, 110 * 110 - Math.pow(i * 22 - 110, 2))) - 14)}`; for (let j = 0; j < 6; j++) sc += `M300 ${HZ - 70 - j * 22} L520 ${HZ - 70 - j * 22}`;
  s += `<path d="${sc}" stroke="#3a3044" stroke-width="1.4" opacity=".9"/><rect x="290" y="${HZ - 62}" width="240" height="62" fill="#1c1626"/></g>`;
  s += sky(HZ + 6, 40, 90, 531, '#140f1c', true);
  /* the water between the walks, the sky on it, lamp-light in long streaks */
  s += `<path d="M${VX - 70} ${HZ + 4} L${VX + 70} ${HZ + 4} L1100 ${H} L420 ${H} Z" fill="url(#k5water)"/>`;
  let rp = ''; for (let i = 0; i < 70; i++) { const t = h(i, 541), y = HZ + 10 + t * t * (H - HZ - 10), half = 70 + t * t * 270, x = VX + (h(i, 542) - .5) * 2 * half * .9, l = 6 + t * 50; rp += `M${f1(x)} ${f1(y)} l${f1(l)} 0`; }
  s += `<g class="k5-wv"><path d="${rp}" stroke="#f0b090" stroke-width="1.2" opacity=".35"/></g>`;
  /* the walks: stepped stone, lamps on posts at intervals, their light on the water */
  s += `<path d="M0 ${HZ + 4} L${VX - 70} ${HZ + 4} L420 ${H} L0 ${H} Z" fill="url(#k5wallL)"/><path d="M${VX + 70} ${HZ + 4} L${W} ${HZ + 4} L${W} ${H} L1100 ${H} Z" fill="url(#k5wallR)"/>`;
  for (let j = 1; j < 4; j++) s += `<path d="M${f1(VX - 70 - j * 40)} ${HZ + 4} L${f1(420 - j * 140)} ${H}" stroke="#4a3e4c" stroke-width="2" opacity=".5"/><path d="M${f1(VX + 70 + j * 40)} ${HZ + 4} L${f1(1100 + j * 140)} ${H}" stroke="#5a4a58" stroke-width="2" opacity=".5"/>`;
  /* the houses along both walks, fronts receding to the bridge, windows lit */
  const fac = sd => { let o = '', t = .03; for (let i = 0; t < .62; i++) { const t2 = Math.min(.66, t + .04 + h(i, 571 + sd) * .07), q = u => [VX + sd * (150 + u * 1100), HZ + 4 + u * (H - HZ)], hf = (.75 + h(i, 573 + sd) * .55), ht = u => (22 + u * 640) * hf;
      const [xa, ya] = q(t), [xb, yb] = q(t2); o += `<path d="M${f1(xa)} ${f1(ya)} L${f1(xa)} ${f1(ya - ht(t))} L${f1(xb)} ${f1(yb - ht(t2))} L${f1(xb)} ${f1(yb)} Z" fill="${i % 2 ? '#16121c' : '#1c1722'}" stroke="#0a080e" stroke-width="1.5"/>`;
      o += `<path d="M${f1(xa)} ${f1(ya - ht(t))} L${f1(xb)} ${f1(yb - ht(t2))}" stroke="#c88a7a" stroke-width="1.2" opacity=".35"/>`;
      for (let k = 0; k < 6; k++) if (h(i * 9 + k, 575 + sd) < .4) { const u = t + (t2 - t) * (.2 + h(i * 9 + k, 577) * .6), [wx, wy] = q(u), r = .25 + h(i * 9 + k, 579) * .55, sz = 2 + u * 22;
        o += `<rect x="${f1(wx - sz * .3)}" y="${f1(wy - ht(u) * r - sz)}" width="${f1(sz * .6)}" height="${f1(sz)}" fill="#ffc878" opacity="${f1(.55 + h(i * 9 + k, 581) * .4)}"/>`; }
      t = t2; } return o; };
  s += fac(-1) + fac(1);
  let lm = ''; for (let i = 0; i < 7; i++) { const t = Math.pow((i + 1) / 8, 1.6), y = HZ + 4 + t * (H - HZ), side = [-1, 1]; for (const sd of side) { const x = VX + sd * (70 + t * 330 + 6), ht = 14 + t * 120;
    lm += `<path d="M${f1(x)} ${f1(y)} L${f1(x)} ${f1(y - ht)}" stroke="#0a0810" stroke-width="${f1(1 + t * 4)}"/><circle class="k5-fl" style="animation-delay:-${f1(h(i * 2 + (sd > 0), 551) * 2)}s" cx="${f1(x)}" cy="${f1(y - ht)}" r="${f1(8 + t * 40)}" fill="url(#k5lamp)"/><rect x="${f1(x - 1 - t * 3)}" y="${f1(y - ht - 2 - t * 6)}" width="${f1(2 + t * 6)}" height="${f1(3 + t * 9)}" fill="#ffe0a0"/>`;
    lm += `<path d="M${f1(x - sd * (16 + t * 34))} ${f1(y + 4)} L${f1(x - sd * (16 + t * 34))} ${f1(y + 40 + t * 160)}" stroke="#ffc070" stroke-width="${f1(2 + t * 6)}" opacity=".5" filter="url(#k5b3)"/>`; } }
  s += lm;
  /* the bridge over the canal, a low arch, and the file crossing it */
  const BY = HZ + 40; s += `<path d="M${VX - 230} ${BY - 26} L${VX + 230} ${BY - 26} L${VX + 230} ${BY + 6} L${VX + 110} ${BY + 6} Q${VX} ${BY - 40} ${VX - 110} ${BY + 6} L${VX - 230} ${BY + 6} Z" fill="#120e18"/><path d="M${VX - 230} ${BY - 26} L${VX + 230} ${BY - 26}" stroke="#d8a080" stroke-width="1.4" opacity=".5"/>`;
  s += `<path d="M${VX - 110} ${BY + 8} Q${VX} ${BY + 44} ${VX + 110} ${BY + 8}" stroke="#120e18" stroke-width="6" fill="none" opacity=".4"/>`;
  let fl = ''; for (let i = 0; i < 26; i++) { const x = VX - 210 + i * 16.5 + h(i, 561) * 4; fl += TK.walker(x, BY - 26, .62, i + 50, '#08060c', {spears:.7, lean:1}); if (i % 3 === 1) fl += `<circle cx="${f1(x - 3)}" cy="${f1(BY - 37)}" r="5" fill="#08060c"/>`; }
  s += `<g class="k5-wk">${fl}</g>`;
  /* the mooring post and the coin-sack on its rope over the water */
  s += `<rect x="1010" y="640" width="30" height="190" rx="5" fill="#140e10" stroke="#05040a" stroke-width="2"/><path d="M1012 652 L1040 652" stroke="#3a2e2a" stroke-width="5"/>${TK.rim('M1012 646 L1012 820', '#f0b090', 1.6, .5)}`;
  s += `<path d="M1024 660 Q960 690 900 760" stroke="#3a2c20" stroke-width="3" fill="none"/><g class="k5-sw"><path d="M900 760 L900 790" stroke="#3a2c20" stroke-width="2.4"/><path d="M886 794 Q900 786 914 794 Q922 820 900 828 Q878 820 886 794 Z" fill="#3a2e22" stroke="#05040a" stroke-width="2"/><path d="M890 794 Q900 790 910 794" stroke="#6a5a40" stroke-width="2" fill="none"/>${TK.rim('M888 798 Q884 814 894 824', '#f0b090', 1.4, .45)}</g>`;
  /* two of the Sixth Company on the right-hand walk, seen from behind */
  const B = {fill:'url(#k5body)', dark:'#0e0e16', rim:'#f0b8a0', helmc:'#3a3a4a', packc:'#24222a', roll:'#302c34', ink:'#040408'};
  s += `<g transform="translate(1300 846) scale(.84)">${TK.back(Object.assign({}, B, {kit:'spear', head:'helm', cloak:'#1a1a26'}))}</g><g transform="translate(1440 870) scale(.92)">${TK.back(Object.assign({}, B, {kit:'shield', head:'cap', helmc:'#2a2a3a', shieldc:'#2a2a38', shieldr:'#5a5a74', wide:1.08}))}</g>`;
  s += `</svg>`;
  ART['title/mt'] = s; ART_SIZE['title/mt'] = [W, H];
}

/* the Sixth's patch: a coin with a milled edge, of faded Letherii blue-grey; the stitched border, VI, the five strokes, the flame on the right,
   and a coin-sack tied on a rope (the Drownings' weighted coin: the book's debt). The flame is the same path as every other patch's, moved. */
{
  const milled = []; for (let i = 0; i < 72; i++) { const a = i / 72 * Math.PI * 2, r0 = 140, r1 = 148; milled.push(`<path d="M${(150 + Math.cos(a) * r0).toFixed(1)} ${(170 + Math.sin(a) * r0).toFixed(1)} L ${(150 + Math.cos(a) * r1).toFixed(1)} ${(170 + Math.sin(a) * r1).toFixed(1)}" stroke="#5a6470" stroke-width="3.2"/>`); }
  ART['insignia/mt'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 340" role="img" aria-label="The Sixth Company's patch, Book Five">
<defs><radialGradient id="pmt-cloth" cx="0.42" cy="0.38" r="0.75"><stop offset="0" stop-color="#9aa6b2"/><stop offset=".6" stop-color="#76828e"/><stop offset="1" stop-color="#4e5862"/></radialGradient>
<pattern id="pmt-weave" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 0 L4 0 M0 2 L4 2" stroke="#3a424a" stroke-opacity=".2" stroke-width=".8"/><path d="M1 0 L1 4 M3 0 L3 4" stroke="#ffffff" stroke-opacity=".06" stroke-width=".8"/></pattern></defs>
<circle cx="150" cy="170" r="150" fill="#262a30"/>
${milled.join('')}
<circle cx="150" cy="170" r="138" fill="url(#pmt-cloth)"/>
<circle cx="150" cy="170" r="138" fill="url(#pmt-weave)"/>
<circle cx="150" cy="170" r="130" fill="none" stroke="#d8b884" stroke-width="2.5" stroke-dasharray="6 4"/>
<path d="M96 78 Q140 58 196 70 Q150 64 96 78 Z" fill="#ffffff" opacity=".1"/>
<ellipse cx="190" cy="120" rx="22" ry="8" fill="#3a4450" opacity=".14"/>
<text x="150" y="190" text-anchor="middle" font-family="IM Fell English SC, Georgia, serif" font-size="92" font-weight="700" fill="#d8b884" stroke="#2a2016" stroke-width="7" paint-order="stroke">VI</text>
<g stroke="#f0e8d6" stroke-width="5" stroke-linecap="round"><path d="M118 212 L118 236"/><path d="M136 212 L136 236"/><path d="M154 212 L154 236"/><path d="M172 212 L172 236"/><path d="M110 231 L182 218"/></g>
<path d="M58 238 Q 100 262 140 262" stroke="#6a5a42" stroke-width="3.4" fill="none" stroke-linecap="round"/>
<path d="M58 238 Q 100 262 140 262" stroke="#2a1e14" stroke-width="1" stroke-dasharray="2 3" fill="none"/>
<g transform="translate(150 280)"><path d="M-14 -16 Q 0 -24 14 -16 Q 26 2 14 16 Q 0 22 -14 16 Q -26 2 -14 -16 Z" fill="#5a4630" stroke="#2a1e12" stroke-width="1.6"/>
<path d="M-13 -16 Q 0 -22 13 -16" stroke="#2a1e14" stroke-width="3.4" fill="none"/><path d="M-10 -16 Q -12 -22 -10 -19 M10 -16 Q 12 -22 10 -19" stroke="#2a1e14" stroke-width="1.4" fill="none"/>
<circle cx="6" cy="2" r="4" fill="#c8a050" stroke="#5a4020" stroke-width="1"/><circle cx="-5" cy="8" r="3.2" fill="#c8a050" stroke="#5a4020" stroke-width="1"/><path d="M-12 -16 Q -40 -16 -10 -18" stroke="#6a5a42" stroke-width="3" fill="none"/></g>
<g transform="translate(88 -110)"><path d="M140.4 296.0 C134.7 290.3 136.4 281.3 142.6 276.7 C142.1 282.4 145.5 285.2 146.6 280.7 C146.6 273.9 151.1 267.7 150.0 262.0 C156.2 269.4 158.5 275.0 155.1 281.8 C158.5 279.6 160.2 276.2 159.6 271.6 C166.4 279.6 165.3 290.9 159.6 296.0 Z" fill="#a8341a" stroke="#5a1a0e" stroke-width="0.8"/><path d="M143.8 296.0 C139.8 291.5 141.5 284.7 146.0 281.3 C146.0 285.8 148.3 287.5 149.4 283.5 C150.0 277.9 153.4 274.5 152.8 269.9 C157.4 276.7 158.5 283.5 156.8 288.1 C159.1 286.4 160.2 283.5 159.6 280.1 C162.5 286.9 160.8 293.2 156.2 296.0 Z" fill="#e0782a"/><path d="M147.2 296.0 C144.3 292.6 146.6 286.9 150.0 283.5 C150.6 287.5 152.8 289.2 152.3 284.7 C155.1 289.2 155.7 292.6 155.1 294.3 C154.5 295.4 153.4 296.0 152.8 296.0 Z" fill="#f6cf74"/><path d="M140.4 296.0 C134.7 290.3 136.4 281.3 142.6 276.7 C142.1 282.4 145.5 285.2 146.6 280.7 C146.6 273.9 151.1 267.7 150.0 262.0 C156.2 269.4 158.5 275.0 155.1 281.8 C158.5 279.6 160.2 276.2 159.6 271.6 C166.4 279.6 165.3 290.9 159.6 296.0 Z" fill="none" stroke="#e8c58a" stroke-width="0.6" stroke-dasharray="1.2 1.2" opacity="0.55"/></g>
</svg>`;
  ART_SIZE['insignia/mt'] = [300, 340];
}

/* the classic title (Settings › Artwork off): the same scene on the canvas. The water moves, the lamps flicker, the company crosses */
function paintMtStill(x, W, H){
  const hz = H*.6, M = Math.min(H, W*.62), sky = x.createLinearGradient(0, 0, 0, hz);
  sky.addColorStop(0, '#0c1018'); sky.addColorStop(.5, '#1e2a3a'); sky.addColorStop(.8, '#4a4a58'); sky.addColorStop(1, '#d89058');
  x.fillStyle = sky; x.fillRect(0, 0, W, hz + 2); glow(x, W*.66, hz, W*.45, '#e09058', .35);
  x.fillStyle = '#14161e'; x.beginPath(); x.moveTo(0, hz + 2); for (let i = 0; i <= 32; i++) x.lineTo(W*i/32, hz - M*(.03 + hash(i, 531)*.04)); x.lineTo(W, hz + 2); x.closePath(); x.fill(); // the roofs
  x.fillStyle = '#101218'; [[.48, .05, .22], [.53, .045, .25], [.58, .05, .2]].forEach(([fx, fw, fh]) => x.fillRect(W*fx - W*fw/2, hz - M*fh, W*fw, M*fh)); x.fillRect(W*.47, hz - M*.11, W*.12, M*.11); // the three old towers and the palace
  x.fillStyle = '#08090c'; x.fillRect(W*.76, hz - M*.17, W*.016, M*.17); // the dark tower apart
  x.fillStyle = '#0c0d10'; x.fillRect(0, hz, W, H - hz);
  const ccx = v => W*(.5 + Math.sin(v*2.2)*.025*v), cwv = v => W*(.012 + Math.pow(1 - v, 1.7)*.56), ccy = v => hz + Math.pow(1 - v, 2)*(H - hz);
  const g = x.createLinearGradient(0, hz, 0, H); g.addColorStop(0, '#c88050'); g.addColorStop(.12, '#5a4a50'); g.addColorStop(.5, '#1c2430'); g.addColorStop(1, '#080c12'); x.fillStyle = g;
  x.beginPath(); for (let i = 0; i <= 20; i++) { const v = i/20; i ? x.lineTo(ccx(v) - cwv(v)/2, ccy(v)) : x.moveTo(ccx(v) - cwv(v)/2, ccy(v)); } for (let i = 20; i >= 0; i--) { const v = i/20; x.lineTo(ccx(v) + cwv(v)/2, ccy(v)); } x.closePath(); x.fill(); // the canal
  { const v = .42, y = ccy(v) - 4, w = cwv(v)/2 + W*.045; x.fillStyle = '#0c0c10'; x.beginPath(); x.moveTo(ccx(v) - w, y); x.quadraticCurveTo(ccx(v), y - M*.04, ccx(v) + w, y); x.lineTo(ccx(v) + w, y + M*.012); x.quadraticCurveTo(ccx(v), y - M*.026, ccx(v) - w, y + M*.012); x.closePath(); x.fill(); } // the bridge
  x.fillStyle = '#0a0a0c'; x.beginPath(); x.moveTo(0, H*.87); x.lineTo(W*.23, H*.84); x.lineTo(W*.3, H); x.lineTo(0, H); x.fill(); x.fillStyle = '#141416'; x.fillRect(W*.19, H*.71, W*.016, H*.14); // the near walk, the mooring post
  return {hz, ccx, ccy, cwv, M};
}
function startTitleMT(cv){
  const ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1); let still = null, info = null;
  const fit = () => { cv.width = innerWidth*dpr; cv.height = innerHeight*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); still = null; }; fit(); window.addEventListener('resize', fit);
  const glints = Array.from({length:60}, (_, i) => ({v: Math.pow(Math.random(), .8)*.95, k: Math.random() - .5, p: Math.random()*7}));
  const birds = Array.from({length:40}, () => ({x: .4 + Math.random()*.7, y: .3 + Math.random()*.14, v: .000008 + Math.random()*.000006}));
  let last = performance.now(), march = 0;
  titleAnim = () => {
    if (!cv.isConnected) { titleAnim = null; window.removeEventListener('resize', fit); return; }
    const W = innerWidth, H = innerHeight, mo = REDUCE() ? 0 : 1, now = performance.now(), dt = Math.min(64, now - last)*mo, t = now*mo; last = now;
    if (!still) { still = document.createElement('canvas'); still.width = W*dpr; still.height = H*dpr; const x = still.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0); info = paintMtStill(x, W, H); }
    ctx.drawImage(still, 0, 0, W, H); const {ccx, ccy, cwv, M} = info;
    glints.forEach(g => { const x = ccx(g.v) + g.k*cwv(g.v)*.9 + (mo ? Math.sin(t/900 + g.p)*6 : 0), y = ccy(g.v) + 2, a = .2 + (Math.sin(t/700 + g.p) + 1)*.2; ctx.fillStyle = `rgba(240,176,112,${a})`; ctx.fillRect(x, y, 3 + (1 - g.v)*28, 1 + (1 - g.v)*1.4); });
    ctx.strokeStyle = '#0a0a0e'; ctx.lineWidth = 1; birds.forEach(b => { if (mo) { b.x -= b.v*dt; if (b.x < -.05) b.x = 1.1; } const x = b.x*W, y = b.y*H + Math.sin(t/600 + b.x*20)*3; ctx.beginPath(); ctx.moveTo(x - 2.4, y); ctx.quadraticCurveTo(x, y - 1.6, x + 2.4, y); ctx.stroke(); });
    { march = (march + dt*.00004) % 1; const v = .42, y = ccy(v) - 4, w = cwv(v)/2 + W*.045, x0 = ccx(v) - w, x1 = ccx(v) + w, s = M*.0016; ctx.fillStyle = '#08080a';
      for (let i = 0; i < 22; i++) { const k = (i/22 + march) % 1, bx = x0 + (x1 - x0)*k, by = y - M*.04*(1 - Math.pow(2*k - 1, 2))*.9 - 2; ctx.fillRect(bx - 2.6*s, by - 18*s, 5.2*s, 14*s); ctx.beginPath(); ctx.arc(bx, by - 21*s, 3*s, 0, 7); ctx.fill(); ctx.fillRect(bx + 3*s, by - 34*s, s, 30*s); } }
    for (let i = 0; i < 8; i++) { const v = .12 + i*.1, sd = i % 2 ? 1 : -1, x = ccx(v) + sd*(cwv(v)/2 + W*.01 + (1 - v)*W*.04), y = ccy(v) - 6, fl = .8 + (mo ? Math.sin(t/120 + i*1.7)*.1 : 0); glow(ctx, x, y - M*.04*(1 - v), M*.03*(1.2 - v), '#ffc070', .3*fl); }
    { const sw = mo ? Math.sin(t/800)*.04 : 0, px = W*.3, py = H*.78; ctx.save(); ctx.translate(px, py); ctx.rotate(sw); ctx.fillStyle = '#4a3a28'; ctx.beginPath(); ctx.ellipse(0, M*.04, M*.022, M*.03, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#6a5a42'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, M*.012); ctx.stroke(); ctx.restore(); // the coin-sack on its rope
      ctx.strokeStyle = '#6a5a42'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W*.205, H*.72); ctx.quadraticCurveTo(W*.26, H*.72, px, py); ctx.stroke(); }
    const lv = ctx.createLinearGradient(0, 0, W, 0); lv.addColorStop(0, 'rgba(0,0,0,.7)'); lv.addColorStop(.45, 'rgba(0,0,0,.12)'); lv.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = lv; ctx.fillRect(0, 0, W, H);
    const vg = ctx.createRadialGradient(W/2, H*.5, H*.25, W/2, H*.5, H*.95); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
  };
}
{ const base = startTitleBackdrop; startTitleBackdrop = function(cv, book){ if (book && BOOKS[book] && BOOKS[book].titleScene === 'mt') return startTitleMT(cv); return base(cv, book); }; }
