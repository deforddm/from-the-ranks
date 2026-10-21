/* ============ Book Four's title: the Fourteenth's column on the road north, and the Whirlwind on the horizon (v7.0) ============
   The painted title (ART 'title/hoc', drawn by Claude for this game, built here from a seeded generator so the column and the dust stay one
   drawing): a low sun, a road out of the foreground into the north, the column on it, the empty spiked trees of the Aren Way, and on the
   horizon the Whirlwind as a wall of dust. At the head of the column, the standard: a thin figure holding up a bone before a sandstorm
   (hoc-canon §1.2). Its canvas stand-in for Settings › Artwork off is startTitleHOC, hooked into startTitleBackdrop from here.
   The patch (ART 'insignia/hoc', docs/patches.md): a lozenge of sun-bleached grey linen, the stitched border, III in sand-gold, the five
   tally strokes, a finger bone on a thong across the tally, and the shared flame on the left.
   Motion: the .k4-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  const h = (i, s) => hash(i, s), f1 = n => Math.round(n * 10) / 10;
  const W = 1600, H = 900, HZ = 560; // the horizon
  const roadX = v => 820 + (1 - v) * -40 + Math.sin(v * 3) * 30, roadY = v => HZ + 6 + Math.pow(1 - v, 1.9) * (H - HZ); // v: 0 near … 1 at the horizon
  const roadW = v => 6 + Math.pow(1 - v, 1.6) * 520;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k4-dust{animation:k4-dust 22s linear infinite}.k4-dust2{animation:k4-dust 34s linear infinite reverse}.k4-wall{animation:k4-wall 11s ease-in-out infinite}
.k4-sun{animation:k4-sun 7s ease-in-out infinite}.k4-haze{animation:k4-haze 3.4s ease-in-out infinite}.k4-flag{animation:k4-flag 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:0 50%}
.k4-march{animation:k4-march 1.1s ease-in-out infinite}
@keyframes k4-dust{from{transform:translate(0,0)}to{transform:translate(-400px,0)}}
@keyframes k4-wall{0%,100%{opacity:.86;transform:translate(0,0)}50%{opacity:1;transform:translate(-14px,-6px)}}
@keyframes k4-sun{0%,100%{opacity:.9}50%{opacity:1}}
@keyframes k4-haze{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-1.5px)}}
@keyframes k4-flag{0%,100%{transform:skewY(0)}50%{transform:skewY(-5deg)}}
@keyframes k4-march{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-1px)}}
@media (prefers-reduced-motion: reduce){.k4-dust,.k4-dust2,.k4-wall,.k4-sun,.k4-haze,.k4-flag,.k4-march{animation:none}}.reduce .k4-dust,.reduce .k4-dust2,.reduce .k4-wall,.reduce .k4-haze,.reduce .k4-flag,.reduce .k4-march{animation:none}</style>
<defs>
<linearGradient id="k4-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1612"/><stop offset=".35" stop-color="#4a3a2a"/><stop offset=".55" stop-color="#8a6a42"/><stop offset=".62" stop-color="#c49a5a"/><stop offset=".64" stop-color="#d8b070"/></linearGradient>
<radialGradient id="k4-sunglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff0c8" stop-opacity=".95"/><stop offset=".18" stop-color="#ffd890" stop-opacity=".7"/><stop offset=".5" stop-color="#e0a050" stop-opacity=".25"/><stop offset="1" stop-color="#a06030" stop-opacity="0"/></radialGradient>
<linearGradient id="k4-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a7a4a"/><stop offset=".08" stop-color="#6e5434"/><stop offset=".4" stop-color="#3a2c1c"/><stop offset="1" stop-color="#140f0a"/></linearGradient>
<linearGradient id="k4-wallg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a878" stop-opacity="0"/><stop offset=".25" stop-color="#b8925e" stop-opacity=".55"/><stop offset=".7" stop-color="#a07a4a" stop-opacity=".85"/><stop offset="1" stop-color="#8a6a40" stop-opacity=".9"/></linearGradient>
<linearGradient id="k4-road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b89868"/><stop offset="1" stop-color="#5a4630"/></linearGradient>
<linearGradient id="k4-vig" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".7"/><stop offset=".45" stop-color="#000" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<radialGradient id="k4-vig2" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>
<rect width="${W}" height="${HZ + 4}" fill="url(#k4-sky)"/>`;
  for (let i = 0; i < 40; i++) s += `<rect x="${f1(h(i, 401) * W)}" y="${f1(Math.pow(h(i, 402), 1.8) * HZ * .4)}" width="1.6" height="1.6" fill="#e8dcc8" opacity="${f1(.2 + h(i, 403) * .4)}"/>`; // the last stars
  s += `<g class="k4-sun"><circle cx="470" cy="${HZ - 36}" r="300" fill="url(#k4-sunglow)"/><circle cx="470" cy="${HZ - 36}" r="38" fill="#fff4d8"/></g>`; // the low sun
  for (let i = 0; i < 5; i++) { const y = 300 + i * 46, x0 = h(i, 404) * 700, w = 400 + h(i, 405) * 600; s += `<rect x="${f1(x0)}" y="${y}" width="${f1(w)}" height="5" rx="2.5" fill="#2a1e14" opacity=".45"/><rect x="${f1(x0 + w * .1)}" y="${y + 4}" width="${f1(w * .8)}" height="1.4" fill="#f0c080" opacity=".35"/>`; } // cloud bars lit from below
  /* the Whirlwind: a wall of dust standing up off the horizon to the right, streaked, with a brighter edge where the sun catches it */
  let wall = `M 860 ${HZ + 4}`; for (let i = 0; i <= 30; i++) { const x = 860 + i * 25, y = HZ - 150 - Math.sin(i * .7) * 18 - h(i, 406) * 40 - (i > 3 && i < 27 ? 40 : i * 4); wall += ` L ${f1(x)} ${f1(Math.min(HZ, y))}`; } wall += ` L 1640 ${HZ - 210} L 1640 ${HZ + 4} Z`;
  s += `<g class="k4-wall"><path d="${wall}" fill="url(#k4-wallg)"/>`;
  for (let i = 0; i < 26; i++) { const x = 880 + h(i, 407) * 740, y = HZ - 40 - h(i, 408) * 170; s += `<path d="M ${f1(x)} ${f1(y)} q 40 -12 90 ${f1(-4 - h(i, 409) * 8)}" stroke="#d8b886" stroke-opacity="${f1(.12 + h(i, 410) * .2)}" stroke-width="${f1(2 + h(i, 411) * 4)}" fill="none"/>`; }
  s += `<path d="M 880 ${HZ - 170} Q 1240 ${HZ - 250} 1640 ${HZ - 215}" stroke="#f0d098" stroke-opacity=".35" stroke-width="5" fill="none"/></g>`;
  /* the land: the far ridges, the ground, dune crests */
  s += `<path d="M0 ${HZ - 8} Q 160 ${HZ - 26} 320 ${HZ - 12} T 640 ${HZ - 10} T 900 ${HZ - 4} L 900 ${HZ + 6} L 0 ${HZ + 6} Z" fill="#5a4630" opacity=".85"/>`;
  s += `<rect y="${HZ}" width="${W}" height="${H - HZ}" fill="url(#k4-ground)"/>`;
  for (let i = 0; i < 6; i++) { const y = HZ + 40 + i * i * 9; s += `<path d="M0 ${y} Q 200 ${y - 10} 400 ${y} T 800 ${y} T 1200 ${y} T 1600 ${y}" stroke="#c89a5a" stroke-opacity="${f1(.06 + i * .02)}" stroke-width="1.5" fill="none"/>`; }
  /* the road: out of the foreground and up to the horizon */
  let rl = '', rr = ''; for (let i = 0; i <= 24; i++) { const v = i / 24, x = roadX(v), y = roadY(v), w = roadW(v) / 2; rl += `${i ? ' L' : 'M'} ${f1(x - w)} ${f1(y)}`; rr = ` L ${f1(x + w)} ${f1(y)}` + rr; }
  s += `<path d="${rl}${rr} Z" fill="url(#k4-road)" opacity=".55"/>`;
  /* the spiked trees of the Aren Way, empty, along both sides of the road */
  for (let i = 0; i < 14; i++) { const v = .12 + i * .06, side = i % 2 ? 1 : -1, x = roadX(v) + side * (roadW(v) / 2 + 20 + (1 - v) * 60), y = roadY(v), sc = Math.max(.12, Math.pow(1 - v, 1.3)) * 1.6;
    s += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc * 10) / 10})" fill="#1a120c"><rect x="-3" y="-120" width="6" height="120"/><path d="M0 -110 L -28 -150 L -24 -152 L 2 -118 Z"/><path d="M0 -90 L 30 -130 L 33 -126 L 4 -86 Z"/><path d="M0 -70 L -20 -96 L -17 -98 L 2 -74 Z"/><circle cx="0" cy="-64" r="1.6" fill="#6a4a30"/></g>`; }
  /* the column: soldiers four abreast on the road, smaller into the distance, the dust they raise */
  s += `<g class="k4-march">`;
  for (let i = 0; i < 220; i++) { const v = .08 + (i / 220) * .86, row = i % 4, x = roadX(v) + (row - 1.5) * roadW(v) * .14, y = roadY(v), sc = Math.max(.1, Math.pow(1 - v, 1.5)) * 2.2;
    if (i % 22 === 0) s += `<ellipse cx="${f1(roadX(v))}" cy="${f1(y - 10 * sc)}" rx="${f1(roadW(v) * .5)}" ry="${f1(12 * sc + 2)}" fill="#c8a070" opacity=".12"/>`;
    s += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc * 100) / 100})" fill="#120c08"><rect x="-3" y="-22" width="6" height="18"/><circle cx="0" cy="-26" r="3.6"/><rect x="-3" y="-4" width="2.4" height="5"/><rect x=".6" y="-4" width="2.4" height="5"/>${i % 7 === 3 ? '<rect x="3" y="-40" width="1.2" height="36"/>' : ''}${i % 5 === 1 ? '<ellipse cx="-4" cy="-14" rx="3.5" ry="5"/>' : ''}</g>`; }
  s += `</g>`;
  /* the standard at the head of the nearer column: a thin figure holding up a bone before a sandstorm, on a tall pole */
  { const v = .3, x = roadX(v) + roadW(v) * .3, y = roadY(v), sc = Math.pow(1 - v, 1.5) * 2.2;
    s += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc * 100) / 100})"><rect x="-1.2" y="-130" width="2.4" height="130" fill="#120c08"/>
<g class="k4-flag"><rect x="1" y="-128" width="44" height="54" fill="#6a5034" stroke="#2a1e12" stroke-width="1.2"/>
<path d="M3 -80 Q 14 -100 22 -96 Q 34 -110 44 -118 L 44 -76 Z" fill="#a8885a" opacity=".85"/>
<path d="M18 -82 L 20 -102 L 24 -102 L 25 -82 Z M21 -102 L 21 -112 M21 -104 L 15 -116 M21 -104 L 27 -118" stroke="#1a120c" stroke-width="2" fill="#1a120c"/>
<rect x="14" y="-121" width="3" height="8" rx="1.5" fill="#e8dcc0"/><circle cx="21" cy="-107" r="3" fill="#1a120c"/></g></g>`; }
  /* dust blowing across, two layers */
  ['k4-dust', 'k4-dust2'].forEach((cls, L) => { s += `<g class="${cls}">`; for (let i = 0; i < 40; i++) { const x = h(i, 412 + L) * (W + 400), y = HZ - 120 + h(i, 414 + L) * 420; s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(60 + h(i, 416 + L) * 160)}" ry="${f1(3 + h(i, 418 + L) * 8)}" fill="#d8b07a" opacity="${f1(.04 + h(i, 420 + L) * .07)}"/>`; } s += `</g>`; });
  s += `<rect width="${W}" height="${H}" fill="url(#k4-vig)"/><rect width="${W}" height="${H}" fill="url(#k4-vig2)"/></svg>`;
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
<ellipse cx="190" cy="262" rx="26" ry="9" fill="#6a5a40" opacity=".18"/>
<text x="150" y="196" text-anchor="middle" font-family="IM Fell English SC, Georgia, serif" font-size="92" font-weight="700" fill="#d8b884" stroke="#2a2016" stroke-width="7" paint-order="stroke">III</text>
<g stroke="#f0e8d6" stroke-width="5" stroke-linecap="round"><path d="M118 222 L118 246"/><path d="M136 222 L136 246"/><path d="M154 222 L154 246"/><path d="M172 222 L172 246"/><path d="M110 241 L182 228"/></g>
<path d="M96 214 Q 150 254 206 226" stroke="#4a3220" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<g transform="translate(150 240) rotate(-14)"><rect x="-14" y="-4" width="28" height="8" rx="4" fill="#e8dcc0" stroke="#5a4a32" stroke-width="1.2"/><circle cx="-14" cy="-1.5" r="3.6" fill="#e8dcc0" stroke="#5a4a32" stroke-width="1"/><circle cx="-14" cy="2.5" r="3.4" fill="#e8dcc0" stroke="#5a4a32" stroke-width="1"/><circle cx="14" cy="0" r="3.8" fill="#e8dcc0" stroke="#5a4a32" stroke-width="1"/><path d="M-6 -1 L 8 -1" stroke="#a89878" stroke-width="1"/></g>
<g transform="translate(-92 -110)"><path d="M140.4 296.0 C134.7 290.3 136.4 281.3 142.6 276.7 C142.1 282.4 145.5 285.2 146.6 280.7 C146.6 273.9 151.1 267.7 150.0 262.0 C156.2 269.4 158.5 275.0 155.1 281.8 C158.5 279.6 160.2 276.2 159.6 271.6 C166.4 279.6 165.3 290.9 159.6 296.0 Z" fill="#a8341a" stroke="#5a1a0e" stroke-width="0.8"/><path d="M143.8 296.0 C139.8 291.5 141.5 284.7 146.0 281.3 C146.0 285.8 148.3 287.5 149.4 283.5 C150.0 277.9 153.4 274.5 152.8 269.9 C157.4 276.7 158.5 283.5 156.8 288.1 C159.1 286.4 160.2 283.5 159.6 280.1 C162.5 286.9 160.8 293.2 156.2 296.0 Z" fill="#e0782a"/><path d="M147.2 296.0 C144.3 292.6 146.6 286.9 150.0 283.5 C150.6 287.5 152.8 289.2 152.3 284.7 C155.1 289.2 155.7 292.6 155.1 294.3 C154.5 295.4 153.4 296.0 152.8 296.0 Z" fill="#f6cf74"/><path d="M140.4 296.0 C134.7 290.3 136.4 281.3 142.6 276.7 C142.1 282.4 145.5 285.2 146.6 280.7 C146.6 273.9 151.1 267.7 150.0 262.0 C156.2 269.4 158.5 275.0 155.1 281.8 C158.5 279.6 160.2 276.2 159.6 271.6 C166.4 279.6 165.3 290.9 159.6 296.0 Z" fill="none" stroke="#e8c58a" stroke-width="0.6" stroke-dasharray="1.2 1.2" opacity="0.55"/></g>
</svg>`;
ART_SIZE['insignia/hoc'] = [300, 340];

/* the classic title (Settings › Artwork off): the same scene on the canvas. The column walks up the road, the dust blows, the Whirlwind breathes */
function paintHocStill(x, W, H){
  const hz = H*.62, sky = x.createLinearGradient(0, 0, 0, hz); sky.addColorStop(0, '#1a1612'); sky.addColorStop(.55, '#4a3a2a'); sky.addColorStop(.85, '#8a6a42'); sky.addColorStop(1, '#d8b070');
  x.fillStyle = sky; x.fillRect(0, 0, W, hz + 2);
  glow(x, W*.3, hz - H*.04, W*.4, '#ffd890', .5); ell(x, W*.3, hz - H*.04, H*.03, H*.03, '#fff4d8'); // the low sun
  for (let i = 0; i < 4; i++) { const y = hz*(.55 + i*.08), x0 = W*hash(i, 431)*.4, w = W*(.25 + hash(i, 432)*.3); ell(x, x0 + w/2, y, w/2, H*.005, 'rgba(42,30,20,.5)'); }
  x.fillStyle = 'rgba(176,140,90,.7)'; x.beginPath(); x.moveTo(W*.54, hz + 2); for (let i = 0; i <= 20; i++) x.lineTo(W*(.54 + i*.025), hz - H*(.18 + Math.sin(i*.7)*.02 + hash(i, 433)*.04)); x.lineTo(W, hz + 2); x.closePath(); x.fill(); // the Whirlwind's wall
  const gd = x.createLinearGradient(0, hz, 0, H); gd.addColorStop(0, '#9a7a4a'); gd.addColorStop(.1, '#6e5434'); gd.addColorStop(.5, '#3a2c1c'); gd.addColorStop(1, '#140f0a'); x.fillStyle = gd; x.fillRect(0, hz, W, H - hz);
  const rx = v => W*(.51 + Math.sin(v*3)*.02 - (1 - v)*.03), ry = v => hz + 4 + Math.pow(1 - v, 1.9)*(H - hz), rw = v => W*(.004 + Math.pow(1 - v, 1.6)*.32);
  x.fillStyle = 'rgba(184,152,104,.5)'; x.beginPath(); for (let i = 0; i <= 20; i++) { const v = i/20; i ? x.lineTo(rx(v) - rw(v)/2, ry(v)) : x.moveTo(rx(v) - rw(v)/2, ry(v)); } for (let i = 20; i >= 0; i--) { const v = i/20; x.lineTo(rx(v) + rw(v)/2, ry(v)); } x.closePath(); x.fill(); // the road
  x.fillStyle = '#1a120c'; for (let i = 0; i < 12; i++) { const v = .12 + i*.07, sd = i % 2 ? 1 : -1, tx = rx(v) + sd*(rw(v)/2 + W*.02), ty = ry(v), sc = Math.max(.15, 1 - v)*H*.0016; x.fillRect(tx - 3*sc, ty - 120*sc, 6*sc, 120*sc); x.beginPath(); x.moveTo(tx, ty - 110*sc); x.lineTo(tx - 28*sc, ty - 150*sc); x.lineTo(tx - 24*sc, ty - 152*sc); x.closePath(); x.fill(); } // the empty spiked trees
  return {hz, rx, ry, rw};
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
    walkers.forEach((w, i) => { if (mo) { w.u += w.v*dt; if (w.u > 1) w.u -= .86; } const v = .08 + (w.u % 1)*.86, s = Math.max(.12, Math.pow(1 - v, 1.5))*H*.0028, x = rx(v) + (w.k - 1.5)*rw(v)*.14, y = ry(v);
      ctx.fillStyle = '#120c08'; ctx.fillRect(x - 3*s, y - 22*s + (mo ? Math.sin(t/180 + i)*.6*s : 0), 6*s, 18*s); ctx.beginPath(); ctx.arc(x, y - 26*s, 3.6*s, 0, 7); ctx.fill(); if (i % 7 === 3) ctx.fillRect(x + 3*s, y - 40*s, 1.2*s, 36*s); });
    { const v = .3, s = Math.pow(1 - v, 1.5)*H*.0028, x = rx(v) + rw(v)*.3, y = ry(v), fl = mo ? Math.sin(t/400)*2*s : 0; // the standard
      ctx.fillStyle = '#120c08'; ctx.fillRect(x - 1.2*s, y - 130*s, 2.4*s, 130*s); ctx.fillStyle = '#6a5034'; ctx.fillRect(x + s, y - 128*s + fl, 44*s, 54*s);
      ctx.fillStyle = '#1a120c'; ctx.fillRect(x + 18*s, y - 102*s + fl, 6*s, 20*s); ctx.beginPath(); ctx.arc(x + 21*s, y - 107*s + fl, 3*s, 0, 7); ctx.fill(); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(x + 14*s, y - 121*s + fl, 3*s, 8*s); }
    dust.forEach(d => { if (mo) { d.x -= d.v*dt; if (d.x < -.2) d.x = 1.2; } ell(ctx, d.x*W, d.y*H, d.s, d.s*.06 + 2, 'rgba(216,176,122,.07)'); });
    const lv = ctx.createLinearGradient(0, 0, W, 0); lv.addColorStop(0, 'rgba(0,0,0,.7)'); lv.addColorStop(.45, 'rgba(0,0,0,.12)'); lv.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = lv; ctx.fillRect(0, 0, W, H);
    const vg = ctx.createRadialGradient(W/2, H*.5, H*.25, W/2, H*.5, H*.95); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
  };
}
{ const base = startTitleBackdrop; startTitleBackdrop = function(cv, book){ if (book && BOOKS[book] && BOOKS[book].titleScene === 'hoc') return startTitleHOC(cv); return base(cv, book); }; }
