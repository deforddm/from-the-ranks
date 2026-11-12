/* ============ Book Four's title: the Fourteenth's column on the road north, and the Whirlwind on the horizon (v7.0) ============
   The painted title (ART 'title/hoc', drawn by Claude for this game, built here from a seeded generator so the column and the dust stay one
   drawing): a low sun, a road out of the foreground into the north, the column on it, the empty spiked trees of the Aren Way, and on the
   horizon the Whirlwind as a wall of dust. At the head of the column, the standard: a thin figure holding up a bone before a sandstorm
   (hoc-canon §1.2). Its canvas stand-in for Settings › Artwork off is startTitleHOC, hooked into startTitleBackdrop from here.
   The patch (ART 'insignia/hoc', docs/patches.md): a lozenge of sun-bleached grey linen, the stitched border, III in sand-gold, the five
   tally strokes, a finger bone on a thong across the tally, and the shared flame on the left.
   Motion: the .k4-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  /* redrawn v13.2 from a seeded generator (019f's kit): the low sun through the haze; the Whirlwind across the north as a towering wall of
     dust, lit gold on its western face; the road running out of the foreground to the horizon between the empty spiked trees of the Aren
     Way; the column on the road, the standard at its head; and on the road's edge in the foreground, seen from behind, three of the Third
     walking north, wraps over their helms. */
  const f1 = TK.f1, h = (i, s) => hash(i, s), W = 1600, H = 900, HZ = 540, VX = 820;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k4-dust{animation:k4-dust 18s ease-in-out infinite}.k4-wk{animation:k4-wk 2.4s ease-in-out infinite}.k4-blow{animation:k4-blow 7s linear infinite}
@keyframes k4-dust{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,-6px)}}@keyframes k4-wk{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-.8px)}}@keyframes k4-blow{0%{transform:translate(0,0)}100%{transform:translate(-200px,30px)}}
@media (prefers-reduced-motion:reduce){.k4-dust,.k4-wk,.k4-blow{animation:none}}.reduce .k4-dust,.reduce .k4-wk,.reduce .k4-blow{animation:none}</style>
<defs><linearGradient id="k4sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2430"/><stop offset=".4" stop-color="#8a5a3a"/><stop offset=".8" stop-color="#d8a060"/><stop offset="1" stop-color="#f0c888"/></linearGradient>
<linearGradient id="k4land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a87a4a"/><stop offset=".2" stop-color="#7a5434"/><stop offset=".6" stop-color="#3e2a1a"/><stop offset="1" stop-color="#1a1008"/></linearGradient>
<linearGradient id="k4road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0b880"/><stop offset=".4" stop-color="#a07a50"/><stop offset="1" stop-color="#4a3420"/></linearGradient>
<linearGradient id="k4wall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e0a868"/><stop offset=".4" stop-color="#a06a40"/><stop offset="1" stop-color="#5a3a2a"/></linearGradient>
<radialGradient id="k4sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff0c8" stop-opacity=".95"/><stop offset=".25" stop-color="#ffc878" stop-opacity=".5"/><stop offset="1" stop-color="#ffa050" stop-opacity="0"/></radialGradient>
<linearGradient id="k4body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4a30"/><stop offset=".3" stop-color="#2e2016"/><stop offset="1" stop-color="#120c08"/></linearGradient>
<filter id="k4b30" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="30"/></filter><filter id="k4b12" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="12"/></filter><filter id="k4b4" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="4"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#k4sky)"/>`;
  /* the low sun in the west (left), and the haze */
  s += `<circle cx="260" cy="${HZ - 90}" r="300" fill="url(#k4sun)"/><circle cx="260" cy="${HZ - 90}" r="30" fill="#fff4dc" opacity=".9"/>`;
  /* the Whirlwind: a wall of dust along the whole north, billows on billows, lit on the west face */
  let wb = ''; for (let i = 0; i < 46; i++) { const x = 380 + h(i, 401) * 1260, y = HZ - 40 - Math.pow(h(i, 402), .8) * 300, r = 60 + h(i, 403) * 110; wb += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r * 1.3)}" ry="${f1(r)}" fill="${h(i, 404) < .5 ? '#b07a4a' : '#7a5034'}" opacity="${f1(.35 + h(i, 405) * .35)}"/>`; }
  s += `<g class="k4-dust"><g filter="url(#k4b30)">${wb}</g>`;
  s += `<path d="M420 ${HZ} Q460 ${HZ - 200} 600 ${HZ - 280} Q820 ${HZ - 340} 1100 ${HZ - 330} Q1380 ${HZ - 320} ${W} ${HZ - 260} L${W} ${HZ} Z" fill="url(#k4wall)" opacity=".55" filter="url(#k4b12)"/>`;
  let top = `M380 ${HZ}`; for (let i = 0; i <= 24; i++) { const x = 380 + i * 52, y = HZ - 170 - Math.sin(i / 24 * Math.PI) * 80 - h(i, 411) * 50; top += ` Q${f1(x + 26)} ${f1(y - 30 - h(i, 412) * 30)} ${f1(x + 52)} ${f1(y)}`; }
  top += ` L${W} ${HZ} Z`;
  s += `<path d="${top}" fill="url(#k4wall)" opacity=".5" filter="url(#k4b4)"/><path d="M380 ${HZ} L${W} ${HZ} L${W} ${HZ - 40} Q1000 ${HZ - 70} 380 ${HZ - 20} Z" fill="#5a3a26" opacity=".45" filter="url(#k4b12)"/></g>`;
  /* the land: flat to the horizon, ripples of sand and stone */
  s += `<rect y="${HZ}" width="${W}" height="${H - HZ}" fill="url(#k4land)"/>`;
  s += `<path d="M0 ${HZ} L${W} ${HZ}" stroke="#f0d0a0" stroke-width="2" opacity=".4"/>`;
  let rp = ''; for (let i = 0; i < 26; i++) { const t = i / 26, y = HZ + 6 + t * t * (H - HZ); rp += `M0 ${f1(y + h(i, 421) * 6)} Q${f1(400 + h(i, 422) * 300)} ${f1(y - 4 - t * 10)} ${W} ${f1(y + 2)}`; }
  s += `<path d="${rp}" stroke="#e0b07a" stroke-width="1" fill="none" opacity=".14"/>`;
  let st = ''; for (let i = 0; i < 140; i++) { const d = h(i, 431), y = HZ + 6 + d * d * (H - HZ), x = h(i, 432) * W, r = .6 + d * 4; st += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r * 1.8)}" ry="${f1(r * .8)}"/>`; }
  s += `<g fill="#2a1a0e" opacity=".6">${st}</g>`;
  /* the road, from under the viewer to the horizon */
  s += `<path d="M${VX - 6} ${HZ} L${VX + 6} ${HZ} L1240 ${H} L360 ${H} Z" fill="url(#k4road)" opacity=".85"/>`;
  s += `<path d="M${VX} ${HZ} L800 ${H}" stroke="#5a3a20" stroke-width="2" opacity=".25"/><path d="M${VX - 4} ${HZ} L${VX - 160} ${H} M${VX + 4} ${HZ} L${VX + 160} ${H}" stroke="#4a2e18" stroke-width="3" opacity=".2"/>`;
  /* the empty spiked trees of the Aren Way, both sides, smaller toward the horizon */
  const tree = (x, y, k, i) => { const lean = (h(i, 440) - .5) * 14; let d = `M0 0 Q${f1(lean * k * .4)} ${f1(-60 * k)} ${f1(lean * k)} ${f1(-112 * k)}`, sp = '';
    for (let b = 0; b < 5; b++) { const by = -34 - b * 17, bx = lean * (-by / 112), dir = (b + i) % 2 ? 1 : -1, l = (30 - b * 4) * (.7 + h(i * 7 + b, 441) * .6), ex = bx + dir * l, ey = by - l * .55;
      d += ` M${f1(bx * k)} ${f1(by * k)} Q${f1((bx + dir * l * .5) * k)} ${f1((by - 2) * k)} ${f1(ex * k)} ${f1(ey * k)}`; sp += ` M${f1((bx + dir * l * .55) * k)} ${f1((by - l * .2) * k)} l${f1(dir * 3 * k)} ${f1(-9 * k)} M${f1(ex * k)} ${f1(ey * k)} l${f1(dir * 5 * k)} ${f1(-5 * k)}`; }
    return `<g transform="translate(${f1(x)} ${f1(y)})" stroke="#1e130a" stroke-linecap="round" fill="none"><path d="${d}" stroke-width="${f1(Math.max(1, 3.4 * k))}"/><path d="${sp}" stroke-width="${f1(Math.max(.6, 1.4 * k))}"/></g>`; };
  let tr = ''; for (let i = 0; i < 12; i++) { const t = Math.pow(1 - i / 12, 1.8), y = HZ + 4 + t * (H - HZ - 40), k = .12 + t * 2.1, off = 50 + t * 560;
    if (i > 1) tr += tree(VX - off, y, k, i); tr += tree(VX + off + 10, y, k, i + 40); }
  s += tr;
  /* the column on the road, and the standard at its head */
  let col = ''; for (let i = 0; i < 120; i++) { const t = Math.pow(i / 120, 1.7), y = HZ + 3 + t * 120, x = VX + (h(i, 451) - .5) * (10 + t * 100), k = .16 + t * .55; col += TK.walker(x, y, k, i, '#1c1008', {spears:.5}); }
  s += `<g class="k4-wk">${col}</g>`;
  s += `<g transform="translate(${VX} ${HZ + 2}) scale(.5)" fill="#1c1008"><path d="M0 0 L0 -60" stroke="#1c1008" stroke-width="2"/><path d="M0 -60 L22 -56 L20 -40 L0 -44 Z" fill="#3a2010"/><path d="M-3 0 L-2 -16 L3 -16 L3 0 Z"/><circle cx="0" cy="-19" r="3"/><path d="M2 -14 L8 -28" stroke="#1c1008" stroke-width="1.6"/><rect x="7" y="-33" width="2" height="5" fill="#f0e6d0"/></g>`;
  /* blown sand across the foreground */
  let bl = ''; for (let i = 0; i < 70; i++) { const x = h(i, 461) * (W + 240), y = HZ + 120 + h(i, 462) * 300, l = 20 + h(i, 463) * 60; bl += `M${f1(x)} ${f1(y)} l${f1(-l)} ${f1(l * .12)}`; }
  s += `<g class="k4-blow"><path d="${bl}" stroke="#f0d0a0" stroke-width="1.2" opacity=".18"/></g>`;
  /* three of the Third on the road's edge, walking north, seen from behind, the sun on their left */
  const B = {fill:'url(#k4body)', dark:'#160e08', rim:'#ffd8a0', helmc:'#4a3a2a', packc:'#3a2a1a', roll:'#5a4028', ink:'#0a0604', walk:1};
  const three = [[1180, 840, .78, {kit:'spear', head:'wrap', helmc:'#6a5640'}], [1410, 870, .9, {kit:'shield', head:'helm', wide:1.12, shieldc:'#3a2416', shieldr:'#7a5232', cloak:''}], [1300, 826, .72, {kit:'xbow', head:'wrap', helmc:'#5e4a36', flip:true}]];
  for (const [x, y, k, o] of three) s += `<g transform="translate(${x} ${y}) scale(${k})">${TK.back(Object.assign({}, B, o))}</g>`;
  s += `</svg>`;
  ART['title/hoc'] = s; ART_SIZE['title/hoc'] = [W, H];
}

/* the Third's patch in Book Four: a lozenge of sun-bleached grey linen; the stitched border, III, the five strokes, the flame on the left, and a
   finger bone on a thong across the tally (docs/patches.md). The flame is the same path as every other patch's, moved. */
ART['insignia/hoc'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 340" role="img" aria-label="The Third's squad patch, Book Four">
<defs><radialGradient id="phoc-cloth" cx="0.42" cy="0.38" r="0.75"><stop offset="0" stop-color="#b4b0a4"/><stop offset=".6" stop-color="#8e8a7e"/><stop offset="1" stop-color="#5e5b52"/></radialGradient>
<pattern id="phoc-weave" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 0 L4 0 M0 2 L4 2" stroke="#4a473f" stroke-opacity=".18" stroke-width=".8"/><path d="M1 0 L1 4 M3 0 L3 4" stroke="#ffffff" stroke-opacity=".06" stroke-width=".8"/></pattern></defs>
<path d="M150 18 L292 170 L150 322 L8 170 Z" fill="#2a2822"/>
<path d="M150 32 L278 170 L150 308 L22 170 Z" fill="url(#phoc-cloth)"/>
<path d="M150 32 L278 170 L150 308 L22 170 Z" fill="url(#phoc-weave)"/>
<path d="M150 25 L285 170 L150 315 L15 170 Z" fill="none" stroke="#d8b884" stroke-width="2.5" stroke-dasharray="6 4"/>
<path d="M196 92 Q232 128 240 160 Q220 122 196 92 Z" fill="#ffffff" opacity=".12"/>
<ellipse cx="176" cy="118" rx="20" ry="8" fill="#6a5a40" opacity=".14"/>
<text x="150" y="196" text-anchor="middle" font-family="IM Fell English SC, Georgia, serif" font-size="92" font-weight="700" fill="#d8b884" stroke="#2a2016" stroke-width="7" paint-order="stroke">III</text>
<g stroke="#f0e8d6" stroke-width="5" stroke-linecap="round"><path d="M118 222 L118 246"/><path d="M136 222 L136 246"/><path d="M154 222 L154 246"/><path d="M172 222 L172 246"/><path d="M110 241 L182 228"/></g>
<path d="M96 214 Q 150 254 206 226" stroke="#4a3220" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<g transform="translate(150 240) rotate(-14) scale(1.35)"><rect x="-14" y="-4" width="28" height="8" rx="4" fill="#e8dcc0" stroke="#5a4a32" stroke-width="1.2"/><circle cx="-14" cy="-1.5" r="3.6" fill="#e8dcc0" stroke="#5a4a32" stroke-width="1"/><circle cx="-14" cy="2.5" r="3.4" fill="#e8dcc0" stroke="#5a4a32" stroke-width="1"/><circle cx="14" cy="0" r="3.8" fill="#e8dcc0" stroke="#5a4a32" stroke-width="1"/><path d="M-6 -1 L 8 -1" stroke="#a89878" stroke-width="1"/></g>
<g transform="translate(-92 -110)"><path d="M140.4 296.0 C134.7 290.3 136.4 281.3 142.6 276.7 C142.1 282.4 145.5 285.2 146.6 280.7 C146.6 273.9 151.1 267.7 150.0 262.0 C156.2 269.4 158.5 275.0 155.1 281.8 C158.5 279.6 160.2 276.2 159.6 271.6 C166.4 279.6 165.3 290.9 159.6 296.0 Z" fill="#a8341a" stroke="#5a1a0e" stroke-width="0.8"/><path d="M143.8 296.0 C139.8 291.5 141.5 284.7 146.0 281.3 C146.0 285.8 148.3 287.5 149.4 283.5 C150.0 277.9 153.4 274.5 152.8 269.9 C157.4 276.7 158.5 283.5 156.8 288.1 C159.1 286.4 160.2 283.5 159.6 280.1 C162.5 286.9 160.8 293.2 156.2 296.0 Z" fill="#e0782a"/><path d="M147.2 296.0 C144.3 292.6 146.6 286.9 150.0 283.5 C150.6 287.5 152.8 289.2 152.3 284.7 C155.1 289.2 155.7 292.6 155.1 294.3 C154.5 295.4 153.4 296.0 152.8 296.0 Z" fill="#f6cf74"/><path d="M140.4 296.0 C134.7 290.3 136.4 281.3 142.6 276.7 C142.1 282.4 145.5 285.2 146.6 280.7 C146.6 273.9 151.1 267.7 150.0 262.0 C156.2 269.4 158.5 275.0 155.1 281.8 C158.5 279.6 160.2 276.2 159.6 271.6 C166.4 279.6 165.3 290.9 159.6 296.0 Z" fill="none" stroke="#e8c58a" stroke-width="0.6" stroke-dasharray="1.2 1.2" opacity="0.55"/></g>
</svg>`;
ART_SIZE['insignia/hoc'] = [300, 340];

/* the classic title (Settings › Artwork off): the same scene on the canvas. The column walks up the road, the dust blows, the Whirlwind breathes */
function paintHocStill(x, W, H){
  const hz = H*.62, M = Math.min(H, W*.62), sky = x.createLinearGradient(0, 0, 0, hz); // M: the land keeps its size on a tall phone sky.addColorStop(0, '#1a1612'); sky.addColorStop(.55, '#4a3a2a'); sky.addColorStop(.85, '#8a6a42'); sky.addColorStop(1, '#d8b070');
  x.fillStyle = sky; x.fillRect(0, 0, W, hz + 2);
  glow(x, W*.3, hz - H*.04, W*.4, '#ffd890', .5); ell(x, W*.3, hz - H*.04, H*.03, H*.03, '#fff4d8'); // the low sun
  for (let i = 0; i < 4; i++) { const y = hz*(.55 + i*.08), x0 = W*hash(i, 431)*.4, w = W*(.25 + hash(i, 432)*.3); ell(x, x0 + w/2, y, w/2, H*.005, 'rgba(42,30,20,.5)'); }
  x.fillStyle = 'rgba(176,140,90,.7)'; x.beginPath(); x.moveTo(W*.54, hz + 2); for (let i = 0; i <= 20; i++) x.lineTo(W*(.54 + i*.025), hz - M*Math.min(1, i/6)*(.18 + Math.sin(i*.7)*.02 + hash(i, 433)*.04)); x.lineTo(W, hz + 2); x.closePath(); x.fill(); // the Whirlwind's wall
  const gd = x.createLinearGradient(0, hz, 0, H); gd.addColorStop(0, '#9a7a4a'); gd.addColorStop(.1, '#6e5434'); gd.addColorStop(.5, '#3a2c1c'); gd.addColorStop(1, '#140f0a'); x.fillStyle = gd; x.fillRect(0, hz, W, H - hz);
  const rx = v => W*(.51 + Math.sin(v*3)*.02 - (1 - v)*.03), ry = v => hz + 4 + Math.pow(1 - v, 1.9)*(H - hz), rw = v => W*(.004 + Math.pow(1 - v, 1.6)*.32);
  x.fillStyle = 'rgba(184,152,104,.5)'; x.beginPath(); for (let i = 0; i <= 20; i++) { const v = i/20; i ? x.lineTo(rx(v) - rw(v)/2, ry(v)) : x.moveTo(rx(v) - rw(v)/2, ry(v)); } for (let i = 20; i >= 0; i--) { const v = i/20; x.lineTo(rx(v) + rw(v)/2, ry(v)); } x.closePath(); x.fill(); // the road
  x.fillStyle = '#1a120c'; for (let i = 0; i < 12; i++) { const v = .12 + i*.07, sd = i % 2 ? 1 : -1, tx = rx(v) + sd*(rw(v)/2 + W*.02), ty = ry(v), sc = Math.max(.15, 1 - v)*M*.0016; x.fillRect(tx - 3*sc, ty - 120*sc, 6*sc, 120*sc); x.beginPath(); x.moveTo(tx, ty - 110*sc); x.lineTo(tx - 28*sc, ty - 150*sc); x.lineTo(tx - 24*sc, ty - 152*sc); x.closePath(); x.fill(); } // the empty spiked trees
  return {hz, rx, ry, rw, M};
}
function startTitleHOC(cv){
  const ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1); let still = null, info = null;
  const fit = () => { cv.width = innerWidth*dpr; cv.height = innerHeight*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); still = null; }; fit(); window.addEventListener('resize', fit);
  const walkers = Array.from({length:140}, (_, i) => ({u: i/140, k: i % 4, v: .000006 + Math.random()*.000002}));
  const dust = Array.from({length:60}, () => ({x: Math.random(), y: .3 + Math.random()*.6, v: .00003 + Math.random()*.00008, s: 20 + Math.random()*80}));
  let last = performance.now();
  titleAnim = () => {
    if (!cv.isConnected) { titleAnim = null; window.removeEventListener('resize', fit); return; }
    const W = innerWidth, H = innerHeight, mo = REDUCE() ? 0 : 1, now = performance.now(), dt = Math.min(64, now - last)*mo, t = now*mo; last = now;
    if (!still) { still = document.createElement('canvas'); still.width = W*dpr; still.height = H*dpr; const x = still.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0); info = paintHocStill(x, W, H); }
    ctx.drawImage(still, 0, 0, W, H); const {rx, ry, rw} = info;
    glow(ctx, W*.78, info.hz - H*.1, W*.25, '#d8b07a', .1 + Math.sin(t/1800)*.04); // the Whirlwind breathing
    walkers.forEach((w, i) => { if (mo) { w.u += w.v*dt; if (w.u > 1) w.u -= .86; } const v = .08 + (w.u % 1)*.86, s = Math.max(.12, Math.pow(1 - v, 1.5))*info.M*.0028, x = rx(v) + (w.k - 1.5)*rw(v)*.14, y = ry(v);
      ctx.fillStyle = '#120c08'; ctx.fillRect(x - 3*s, y - 22*s + (mo ? Math.sin(t/180 + i)*.6*s : 0), 6*s, 18*s); ctx.beginPath(); ctx.arc(x, y - 26*s, 3.6*s, 0, 7); ctx.fill(); if (i % 7 === 3) ctx.fillRect(x + 3*s, y - 40*s, 1.2*s, 36*s); });
    { const v = .2, s = Math.pow(1 - v, 1.5)*info.M*.0033, x = rx(v) + rw(v)*.32, y = ry(v), fl = mo ? Math.sin(t/400)*2*s : 0; // the standard
      ctx.fillStyle = '#120c08'; ctx.fillRect(x - 1.2*s, y - 130*s, 2.4*s, 130*s); ctx.fillStyle = '#6a5034'; ctx.fillRect(x + s, y - 128*s + fl, 44*s, 54*s);
      ctx.fillStyle = '#1a120c'; ctx.fillRect(x + 18*s, y - 102*s + fl, 6*s, 20*s); ctx.beginPath(); ctx.arc(x + 21*s, y - 107*s + fl, 3*s, 0, 7); ctx.fill(); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(x + 14*s, y - 121*s + fl, 3*s, 8*s); }
    dust.forEach(d => { if (mo) { d.x -= d.v*dt; if (d.x < -.2) d.x = 1.2; } ell(ctx, d.x*W, d.y*H, d.s, d.s*.06 + 2, 'rgba(216,176,122,.07)'); });
    const lv = ctx.createLinearGradient(0, 0, W, 0); lv.addColorStop(0, 'rgba(0,0,0,.7)'); lv.addColorStop(.45, 'rgba(0,0,0,.12)'); lv.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = lv; ctx.fillRect(0, 0, W, H);
    const vg = ctx.createRadialGradient(W/2, H*.5, H*.25, W/2, H*.5, H*.95); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
  };
}
{ const base = startTitleBackdrop; startTitleBackdrop = function(cv, book){ if (book && BOOKS[book] && BOOKS[book].titleScene === 'hoc') return startTitleHOC(cv); return base(cv, book); }; }
/* the book list's cover (v13.2): frame the squad on the right */
BOOKS.hoc.coverPos = '72% 50%';
