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
  const h = (i, s) => hash(i, s), f1 = n => Math.round(n * 10) / 10;
  const W = 1600, H = 900, HZ = 520; // the horizon: the far end of the canal
  const cx = v => 800 + Math.sin(v * 2.2) * 40 * v, cw = v => 18 + Math.pow(1 - v, 1.7) * 900; // v: 0 near … 1 at the horizon; the canal's middle and width
  const cy = v => HZ + Math.pow(1 - v, 2) * (H - HZ);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k5-water{animation:k5-water 6s ease-in-out infinite}.k5-glint{animation:k5-glint 2.8s ease-in-out infinite}.k5-lamp{animation:k5-lamp 1.7s ease-in-out infinite}
.k5-birds{animation:k5-birds 38s linear infinite}.k5-march{animation:k5-march 1.2s ease-in-out infinite}.k5-sack{animation:k5-sack 5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 0}
.k5-cloud{animation:k5-cloud 60s linear infinite}
@keyframes k5-water{0%,100%{transform:translate(0,0)}50%{transform:translate(-18px,1px)}}
@keyframes k5-glint{0%,100%{opacity:.25}50%{opacity:.7}}
@keyframes k5-lamp{0%,100%{opacity:.85}40%{opacity:1}70%{opacity:.75}}
@keyframes k5-birds{from{transform:translate(0,0)}to{transform:translate(-520px,-30px)}}
@keyframes k5-march{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-1px)}}
@keyframes k5-sack{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
@keyframes k5-cloud{from{transform:translate(0,0)}to{transform:translate(-300px,0)}}
@media (prefers-reduced-motion: reduce){.k5-water,.k5-glint,.k5-lamp,.k5-birds,.k5-march,.k5-sack,.k5-cloud{animation:none}}.reduce .k5-water,.reduce .k5-glint,.reduce .k5-lamp,.reduce .k5-birds,.reduce .k5-march,.reduce .k5-sack,.reduce .k5-cloud{animation:none}</style>
<defs>
<linearGradient id="k5-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1018"/><stop offset=".38" stop-color="#1e2a3a"/><stop offset=".62" stop-color="#4a4a58"/><stop offset=".84" stop-color="#a06848"/><stop offset="1" stop-color="#d89058"/></linearGradient>
<radialGradient id="k5-sunset" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd8a0" stop-opacity=".6"/><stop offset=".4" stop-color="#e09058" stop-opacity=".25"/><stop offset="1" stop-color="#804030" stop-opacity="0"/></radialGradient>
<linearGradient id="k5-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c88050"/><stop offset=".12" stop-color="#5a4a50"/><stop offset=".5" stop-color="#1c2430"/><stop offset="1" stop-color="#080c12"/></linearGradient>
<linearGradient id="k5-walk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a3e"/><stop offset="1" stop-color="#0e0e10"/></linearGradient>
<linearGradient id="k5-vig" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".72"/><stop offset=".45" stop-color="#000" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<radialGradient id="k5-vig2" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".62"/></radialGradient>
</defs>
<rect width="${W}" height="${HZ + 4}" fill="url(#k5-sky)"/>`;
  for (let i = 0; i < 46; i++) s += `<rect x="${f1(h(i, 501) * W)}" y="${f1(Math.pow(h(i, 502), 1.8) * HZ * .45)}" width="1.6" height="1.6" fill="#dce4f0" opacity="${f1(.15 + h(i, 503) * .45)}"/>`; // the first stars
  s += `<circle cx="1080" cy="${HZ - 10}" r="360" fill="url(#k5-sunset)"/>`; // where the sun went down, behind the city
  s += `<g class="k5-cloud">`; for (let i = 0; i < 9; i++) { const y = 250 + i * 26 + h(i, 521) * 14, x = h(i, 504) * (W + 300), w = 140 + h(i, 505) * 260; s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(w)}" ry="${f1(3 + h(i, 522) * 5)}" fill="#1a1820" opacity="${f1(.3 + h(i, 523) * .25)}"/><ellipse cx="${f1(x)}" cy="${f1(y + 4)}" rx="${f1(w * .8)}" ry="1.4" fill="#f0a870" opacity=".22"/>`; } s += `</g>`;
  /* the city on the horizon: a long low mass of roofs, then towers; the palace with three old towers round it; a dome under scaffolding; one dark tower apart */
  let roofs = `M0 ${HZ + 4}`; for (let i = 0; i <= 64; i++) { const x = i * W / 64, y = HZ - 18 - h(i, 506) * 26 - (Math.abs(x - 800) < 500 ? 14 : 0); roofs += ` L ${f1(x)} ${f1(y)} L ${f1(x + W / 128)} ${f1(y - h(i, 507) * 8)}`; } roofs += ` L ${W} ${HZ + 4} Z`;
  s += `<path d="${roofs}" fill="#14161e"/>`;
  const tower = (x, w, ht, cap, col = '#101218') => `<rect x="${f1(x - w / 2)}" y="${f1(HZ - ht)}" width="${f1(w)}" height="${f1(ht)}" fill="${col}"/>${cap === 'spire' ? `<path d="M${f1(x - w / 2 - 4)} ${f1(HZ - ht)} L ${f1(x)} ${f1(HZ - ht - w * 1.6)} L ${f1(x + w / 2 + 4)} ${f1(HZ - ht)} Z" fill="${col}"/>` : cap === 'flat' ? `<rect x="${f1(x - w / 2 - 4)}" y="${f1(HZ - ht - 6)}" width="${f1(w + 8)}" height="6" fill="${col}"/>` : ''}`;
  for (let i = 0; i < 12; i++) { const x = 120 + h(i, 508) * 1360; if (Math.abs(x - 860) < 180) continue; s += tower(x, 14 + h(i, 509) * 14, 60 + h(i, 510) * 70, h(i, 511) < .5 ? 'spire' : 'flat'); }
  s += tower(780, 34, 190, 'flat') + tower(850, 30, 214, 'flat') + tower(918, 32, 176, 'flat'); // the three old towers round the palace
  s += `<rect x="760" y="${HZ - 96}" width="180" height="96" fill="#0e1016"/>`; // the palace between them
  s += `<rect x="1210" y="${HZ - 150}" width="24" height="150" fill="#08090c"/><ellipse cx="1222" cy="${HZ - 150}" rx="14" ry="6" fill="#08090c"/>`; // a dark round tower, apart, behind
  { const dx = 1010, dy = HZ - 70; s += `<path d="M${dx - 90} ${dy} Q ${dx} ${dy - 120} ${dx + 90} ${dy} Z" fill="#12141a"/><rect x="${dx - 96}" y="${dy}" width="192" height="70" fill="#12141a"/>`;
    for (let i = 0; i < 9; i++) s += `<rect x="${dx - 100 + i * 24}" y="${dy - 110}" width="2" height="180" fill="#2a2c34" opacity=".8"/>`; for (let j = 0; j < 5; j++) s += `<rect x="${dx - 104}" y="${dy - 100 + j * 30}" width="208" height="2" fill="#2a2c34" opacity=".8"/>`; } // the great unfinished dome under its scaffold
  for (let i = 0; i < 90; i++) { const x = h(i, 512) * W, y = HZ - 8 - h(i, 513) * 90; if (y < HZ - 30 && Math.abs(x - 850) > 120 && h(i, 514) < .6) continue; s += `<rect class="k5-lamp" style="animation-delay:${f1(h(i, 515) * 2)}s" x="${f1(x)}" y="${f1(y)}" width="2.4" height="3" fill="#ffc870" opacity="${f1(.4 + h(i, 516) * .5)}"/>`; } // lit windows
  /* starlings over the towers */
  s += `<g class="k5-birds">`; for (let i = 0; i < 60; i++) { const x = 700 + h(i, 517) * 900, y = 260 + h(i, 518) * 120 + Math.sin(i * .5) * 20; s += `<path d="M${f1(x - 2.4)} ${f1(y)} Q ${f1(x)} ${f1(y - 1.6)} ${f1(x + 2.4)} ${f1(y)}" stroke="#0a0a0e" stroke-width="1" fill="none"/>`; } s += `</g>`;
  /* the canal: water from the foreground to the city, between stepped walks */
  let wl = '', wr = ''; for (let i = 0; i <= 24; i++) { const v = i / 24, x = cx(v), y = cy(v), w = cw(v) / 2; wl += `${i ? ' L' : 'M'} ${f1(x - w)} ${f1(y)}`; wr = ` L ${f1(x + w)} ${f1(y)}` + wr; }
  s += `<rect y="${HZ}" width="${W}" height="${H - HZ}" fill="#0c0d10"/>`; // the city's near ground, dark
  s += `<path d="${wl}${wr} Z" fill="url(#k5-water)"/>`;
  for (const side of [-1, 1]) { for (let k = 0; k < 3; k++) { let p = ''; for (let i = 0; i <= 20; i++) { const v = i / 20, x = cx(v) + side * (cw(v) / 2 + k * (8 + (1 - v) * 60)), y = cy(v) - k * (2 + (1 - v) * 22); p += `${i ? ' L' : 'M'} ${f1(x)} ${f1(y)}`; } s += `<path d="${p}" stroke="#4a4a50" stroke-opacity="${f1(.5 - k * .12)}" stroke-width="${f1(2.4 - k * .5)}" fill="none"/>`; } } // the tiers of the walks
  s += `<g class="k5-water">`; for (let i = 0; i < 70; i++) { const v = Math.pow(h(i, 519), .8) * .95, x = cx(v) + (h(i, 520) - .5) * cw(v) * .9, y = cy(v) + 2; s += `<rect class="k5-glint" style="animation-delay:${f1(h(i, 524) * 3)}s" x="${f1(x)}" y="${f1(y)}" width="${f1(4 + (1 - v) * 40)}" height="${f1(1 + (1 - v) * 1.6)}" fill="#f0b070" opacity=".35"/>`; } s += `</g>`; // the dusk on the water
  for (let i = 0; i < 24; i++) { const x = 760 + h(i, 525) * 180, ln = 30 + h(i, 526) * 80; s += `<rect x="${f1(x)}" y="${f1(HZ + 4)}" width="3" height="${f1(ln)}" fill="#ffc870" opacity="${f1(.06 + h(i, 527) * .1)}"/>`; } // the palace windows, long in the water
  /* lamps along both walks */
  for (let i = 0; i < 10; i++) { const v = .1 + i * .085, side = i % 2 ? 1 : -1, x = cx(v) + side * (cw(v) / 2 + 10 + (1 - v) * 70), y = cy(v) - 6 - (1 - v) * 20, sc = Math.max(.15, 1 - v) * 1.4;
    s += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc * 10) / 10})"><rect x="-1.5" y="-60" width="3" height="60" fill="#0a0a0c"/><rect x="-5" y="-70" width="10" height="11" fill="#1a1a1e"/><rect class="k5-lamp" style="animation-delay:${f1(h(i, 528) * 1.5)}s" x="-3.5" y="-68" width="7" height="7" fill="#ffd080"/><circle cx="0" cy="-64" r="22" fill="#ffc070" opacity=".08"/></g>`; }
  /* the bridge, and the company crossing it north: spears up, round shields */
  { const v = .42, y = cy(v) - 4, w = cw(v) / 2 + 70, x0 = cx(v) - w, x1 = cx(v) + w;
    s += `<path d="M${f1(x0)} ${f1(y)} Q ${f1(cx(v))} ${f1(y - 34)} ${f1(x1)} ${f1(y)} L ${f1(x1)} ${f1(y + 10)} Q ${f1(cx(v))} ${f1(y - 22)} ${f1(x0)} ${f1(y + 10)} Z" fill="#0c0c10"/>`;
    s += `<path d="M${f1(cx(v) - cw(v) / 2 + 20)} ${f1(y + 10)} Q ${f1(cx(v))} ${f1(y - 14)} ${f1(cx(v) + cw(v) / 2 - 20)} ${f1(y + 10)} L ${f1(cx(v) + cw(v) / 2 - 20)} ${f1(y + 40)} L ${f1(cx(v) - cw(v) / 2 + 20)} ${f1(y + 40)} Z" fill="#06070a" opacity=".85"/>`; // the arch's shadow on the water
    s += `<g class="k5-march">`; for (let i = 0; i < 26; i++) { const k = i / 25, bx = x0 + 40 + k * (x1 - x0 - 80), by = y - 34 * (1 - Math.pow(2 * k - 1, 2)) * .92 - 2;
      s += `<g transform="translate(${f1(bx)} ${f1(by)}) scale(.9)" fill="#08080a"><rect x="-2.6" y="-18" width="5.2" height="14"/><circle cx="0" cy="-21" r="3"/><rect x="-2.6" y="-4" width="2" height="4"/><rect x=".6" y="-4" width="2" height="4"/><rect x="3" y="-34" width="1" height="30"/>${i % 3 === 1 ? '<circle cx="-4" cy="-11" r="4.4"/>' : ''}${i % 3 === 1 ? '<circle cx="-4" cy="-11" r="1.2" fill="#d8d0c0"/>' : ''}</g>`; } s += `</g>`; }
  /* the foreground: the near walk's edge, a mooring post, and on its rope over the water a weighted sack of coins */
  s += `<path d="M0 ${H - 120} L 360 ${H - 150} L 470 ${H} L 0 ${H} Z" fill="#0a0a0c"/><path d="M0 ${H - 120} L 360 ${H - 150}" stroke="#3a3a40" stroke-width="3"/>`;
  s += `<rect x="300" y="${H - 260}" width="26" height="120" fill="#141416"/><rect x="296" y="${H - 266}" width="34" height="10" fill="#1e1e22"/><rect x="306" y="${H - 250}" width="4" height="100" fill="#2a2a30" opacity=".6"/>`;
  s += `<path d="M326 ${H - 240} Q 420 ${H - 230} 470 ${H - 180}" stroke="#6a5a42" stroke-width="3" fill="none"/>`;
  s += `<g class="k5-sack"><path d="M470 ${H - 180} L 470 ${H - 150}" stroke="#6a5a42" stroke-width="2.6"/><path d="M456 ${H - 150} Q 470 ${H - 158} 484 ${H - 150} Q 498 ${H - 120} 484 ${H - 104} Q 470 ${H - 98} 456 ${H - 104} Q 442 ${H - 120} 456 ${H - 150} Z" fill="#4a3a28"/>
<path d="M458 ${H - 150} Q 470 ${H - 156} 482 ${H - 150}" stroke="#2a1e14" stroke-width="3" fill="none"/><circle cx="476" cy="${H - 124}" r="3.4" fill="#c8a050" opacity=".8"/><circle cx="464" cy="${H - 116}" r="2.6" fill="#c8a050" opacity=".6"/></g>`;
  s += `<rect width="${W}" height="${H}" fill="url(#k5-vig)"/><rect width="${W}" height="${H}" fill="url(#k5-vig2)"/></svg>`;
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
