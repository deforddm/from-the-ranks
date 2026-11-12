/* ============ Book Three's title: the Fourth on a frost-bitten ridge, looking south (v6.0) ============
   The painted title (ART 'title/moi', drawn by Claude for this game: the five on the ridge at the last of dusk, the Host's square camp and
   Brood's sprawl with the column between them, the Rhivi herds, a line of quorls going south, the Domin's wrong cold light over the far
   range) and its canvas stand-in for Settings › Artwork off (startTitleMOI, hooked into startTitleBackdrop from here). The patch is the
   Fourth's own round IV (insignia/patch), as it is. Motion: the .k3-* rules inside the SVG; REDUCE() and .reduce hold it still. */
/* the painted title, redrawn v13.2 from a seeded generator (019f's kit): the last of dusk in the Rhivi Plain, cold. A far range under snow,
   and over it to the south a wrong cold light that should not be there; on the plain below, Onearm's Host's square camp with its ditch and
   rows, and away from it Brood's sprawl of fires, the column between the two; the Rhivi herds dark on the grass; a line of quorls going
   south, high and thin; snow on the wind. On the frost-bitten ridge in the foreground, seen from behind, the Fourth's five, cloaked.
   Motion: the .k3-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  const f1 = TK.f1, h = (i, s) => hash(i, s), W = 1600, H = 900, HZ = 470;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k3-fire{animation:k3-fire 1.7s ease-in-out infinite}.k3-tw{animation:k3-tw 5s ease-in-out infinite}.k3-snow{animation:k3-snow 9s linear infinite}.k3-q{animation:k3-q 30s ease-in-out infinite}.k3-dom{animation:k3-dom 9s ease-in-out infinite}
@keyframes k3-fire{0%,100%{opacity:.7}50%{opacity:1}}@keyframes k3-tw{0%,100%{opacity:.35}50%{opacity:1}}@keyframes k3-snow{0%{transform:translate(0,0)}100%{transform:translate(-160px,120px)}}@keyframes k3-q{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,8px)}}@keyframes k3-dom{0%,100%{opacity:.7}50%{opacity:1}}
@media (prefers-reduced-motion:reduce){.k3-fire,.k3-tw,.k3-snow,.k3-q,.k3-dom{animation:none}}.reduce .k3-fire,.reduce .k3-tw,.reduce .k3-snow,.reduce .k3-q,.reduce .k3-dom{animation:none}</style>
<defs><linearGradient id="k3sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05070e"/><stop offset=".45" stop-color="#121a2c"/><stop offset=".8" stop-color="#3a3a4c"/><stop offset="1" stop-color="#8a6a5a"/></linearGradient>
<linearGradient id="k3land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2c34"/><stop offset=".3" stop-color="#181a20"/><stop offset="1" stop-color="#08090c"/></linearGradient>
<linearGradient id="k3mtn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa4b8"/><stop offset=".25" stop-color="#4a5266"/><stop offset="1" stop-color="#1c2030"/></linearGradient>
<radialGradient id="k3dom" cx=".5" cy=".8" r=".6"><stop offset="0" stop-color="#c8f0d8" stop-opacity=".55"/><stop offset=".5" stop-color="#7ac0a0" stop-opacity=".16"/><stop offset="1" stop-color="#7ac0a0" stop-opacity="0"/></radialGradient>
<radialGradient id="k3fire" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc070" stop-opacity=".9"/><stop offset=".4" stop-color="#ff7a2a" stop-opacity=".35"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>
<linearGradient id="k3body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a4050"/><stop offset=".3" stop-color="#181c26"/><stop offset="1" stop-color="#07080c"/></linearGradient>
<filter id="k3b20" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="20"/></filter><filter id="k3b6" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="6"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#k3sky)"/>`;
  s += TK.stars(240, 301, 0, HZ - 120, W, '#e8eef8', 'k3-tw');
  s += `<g filter="url(#k3b20)">${[...Array(6)].map((_, i) => `<ellipse cx="${f1(h(i, 311) * W)}" cy="${f1(250 + h(i, 312) * 140)}" rx="${f1(240 + h(i, 313) * 300)}" ry="${f1(10 + h(i, 314) * 14)}" fill="#c89a84" opacity="${f1(.12 + h(i, 315) * .14)}"/>`).join('')}</g>`;
  /* the wrong light over the far range to the south (right): pale, greenish, cold, with faint upright rays */
  s += `<g class="k3-dom"><ellipse cx="1240" cy="${HZ - 60}" rx="420" ry="230" fill="url(#k3dom)"/>${[...Array(9)].map((_, i) => `<rect x="${f1(1020 + i * 52 + h(i, 321) * 20)}" y="${f1(HZ - 300 + h(i, 322) * 60)}" width="${f1(8 + h(i, 323) * 14)}" height="${f1(220 + h(i, 324) * 60)}" fill="#c8f0d8" opacity="${f1(.04 + h(i, 325) * .06)}" filter="url(#k3b6)"/>`).join('')}</g>`;
  /* the far range: two layers of snow peaks, the near one darker */
  const ridge = (base, amp, seed, n) => { let d = `M0 ${base}`; for (let i = 0; i <= n; i++) { const x = i / n * W, y = base - amp * (.2 + h(i, seed) * .5 + Math.pow(h(i >> 1, seed + 1), 2) * .6); d += ` L${f1(x)} ${f1(y)}`; } return d + ` L${W} ${base + 40} L0 ${base + 40} Z`; };
  s += `<path d="${ridge(HZ - 10, 120, 331, 40)}" fill="url(#k3mtn)" opacity=".75"/><path d="${ridge(HZ + 4, 70, 341, 56)}" fill="#1e2232"/>`;
  let sn = ''; for (let i = 0; i < 40; i++) { const x = i / 40 * W, y = HZ - 10 - 120 * (.2 + h(i, 331) * .5 + Math.pow(h(i >> 1, 332), 2) * .6); sn += `M${f1(x - 14)} ${f1(y + 16)} L${f1(x)} ${f1(y)} L${f1(x + 10)} ${f1(y + 12)}`; }
  /* the plain */
  s += `<rect y="${HZ + 20}" width="${W}" height="${H - HZ}" fill="url(#k3land)"/>`;
  for (let i = 0; i < 5; i++) s += `<path d="M0 ${HZ + 40 + i * 40} Q${f1(500 + h(i, 351) * 300)} ${HZ + 30 + i * 40} ${W} ${HZ + 46 + i * 40}" stroke="#8a90a0" stroke-width="1" fill="none" opacity=".1"/>`;
  /* the Host's square camp (left): ditch, rows of tents, a few fires; Brood's sprawl (centre): scattered fires; the column between */
  const sq = (x0, y0, w, hh) => { let t = `<path d="M${x0} ${y0} L${x0 + w} ${y0} L${x0 + w + 20} ${y0 + hh} L${x0 - 20} ${y0 + hh} Z" fill="#14161c" stroke="#5a5e6a" stroke-width="1" opacity=".9"/>`;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 14; c++) { const y = y0 + 5 + r * (hh - 8) / 6, x = x0 - 2 * r + 6 + c * (w + 4 * r - 8) / 14; t += `<path d="M${f1(x - 3)} ${f1(y + 4)} L${f1(x)} ${f1(y)} L${f1(x + 3)} ${f1(y + 4)} Z" fill="#9aa0ac" opacity=".35"/>`; if (h(r * 20 + c, 361) < .1) t += `<circle class="k3-fire" style="animation-delay:-${f1(h(r * 20 + c, 362) * 1.7)}s" cx="${f1(x + 4)}" cy="${f1(y + 3)}" r="5" fill="url(#k3fire)"/>`; } return t; };
  s += sq(150, HZ + 50, 280, 60);
  for (let i = 0; i < 60; i++) { const x = 640 + h(i, 371) * 420, y = HZ + 48 + h(i, 372) * 70; s += `<circle class="k3-fire" style="animation-delay:-${f1(h(i, 373) * 1.7)}s" cx="${f1(x)}" cy="${f1(y)}" r="${f1(4 + h(i, 374) * 5)}" fill="url(#k3fire)"/>`; }
  let cl = ''; for (let i = 0; i < 70; i++) { const t = i / 70, x = 440 + t * 210 + (h(i, 381) - .5) * 8, y = HZ + 82 + Math.sin(t * 3) * 6; cl += TK.walker(x, y, .3, i, '#0a0b0e', {spears:.6}); }
  s += cl;
  /* the Rhivi herds: dark humped backs across the grass to the right */
  let hd = ''; for (let i = 0; i < 90; i++) { const x = 1080 + h(i, 391) * 480 + Math.sin(i) * 20, y = HZ + 40 + h(i, 392) * 80, k = .25 + (y - HZ) / 400; hd += `<path transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})" d="M-8 0 Q-9 -8 -2 -10 Q4 -12 8 -6 L9 0 Z"/>`; }
  s += `<g fill="#0c0d10">${hd}</g>`;
  /* quorls going south: long bodies, four long wings, a rider on each, high and thin across the sky */
  let qs = ''; for (let i = 0; i < 9; i++) { const x = 260 + i * 92 + h(i, 401) * 20, y = 236 + i * 14 + h(i, 402) * 14, k = 1.1 - i * .06;
    qs += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)}) rotate(8)" fill="#06070c"><path d="M-30 0 Q0 -3 26 0 Q0 3 -30 0 Z"/><path d="M-4 -1 Q-10 -18 -2 -26 Q2 -16 2 -1 Z" opacity=".75"/><path d="M4 -1 Q8 -16 18 -22 Q14 -10 8 -1 Z" opacity=".6"/><path d="M-4 1 Q-14 12 -6 20 Q0 10 2 1 Z" opacity=".5"/><circle cx="12" cy="-4" r="2.6"/><path d="M26 0 L32 -1" stroke="#0a0c14" stroke-width="1.4"/></g>`; }
  s += `<g class="k3-q">${qs}</g>`;
  /* the near ridge: frost along its crest, rock and dead grass */
  s += `<path d="M600 ${H} Q760 772 1000 752 Q1280 732 1600 744 L1600 ${H} Z" fill="#0a0b0f"/>`;
  s += TK.rim('M640 880 Q780 776 1000 754 Q1280 734 1600 746', '#e8f0ff', 2.4, .55);
  let fr = ''; for (let i = 0; i < 160; i++) { const x = 650 + h(i, 411) * 950, y = 756 + h(i, 412) * 22 + (x < 1000 ? (1000 - x) * .34 : 0), l = 4 + h(i, 413) * 12; if (y > 900) continue; fr += `M${f1(x)} ${f1(y)} l${f1((h(i, 414) - .5) * 7)} ${f1(-l)}`; }
  s += `<path d="${fr}" stroke="#2a2e38" stroke-width="1.4"/><path d="${fr}" stroke="#dce6f4" stroke-width=".7" opacity=".35"/>`;
  /* the five, cloaked, frost on their shoulders */
  const B = {fill:'url(#k3body)', dark:'#0c0e12', rim:'#d8e4f4', helmc:'#3a404c', packc:'#1e1c1a', roll:'#2a2622', ink:'#040508'};
  const five = [
    [1120, 820, .74, {kit:'staff', head:'hood', cloak:'#141822', pack:false, shaft:'#3a3020'}],
    [1470, 806, .7, {kit:'none', head:'bare', cloak:'#1a1a20', flip:true}],
    [1236, 848, .86, {kit:'shield', head:'helm', wide:1.12, cloak:'', shieldc:'#24201c', shieldr:'#4a4038'}],
    [1350, 838, .82, {kit:'spear', head:'helm', cloak:'#121620'}],
    [1010, 858, .78, {kit:'xbow', head:'cap', helmc:'#24262e', cloak:'#161a22'}]];
  for (const [x, y, k, o] of five) s += `<g transform="translate(${x} ${y}) scale(${k})">${TK.back(Object.assign({}, B, o))}</g>`;
  /* snow on the wind */
  let sw = ''; for (let i = 0; i < 110; i++) { const x = h(i, 421) * (W + 200), y = h(i, 422) * (H + 100) - 100, l = 3 + h(i, 423) * 6; sw += `M${f1(x)} ${f1(y)} l${f1(-l)} ${f1(l * .7)}`; }
  s += `<g class="k3-snow"><path d="${sw}" stroke="#f0f4ff" stroke-width="1.4" stroke-linecap="round" opacity=".45"/></g>`;
  s += `</svg>`;
  ART['title/moi'] = s;
}
ART_SIZE['title/moi'] = [1600, 900];
/* stand-ins for every Book Three figure, bust and card, so nothing is missing if 60d is absent; 60d draws the real ones */
{
  const stub = (c1, c2, sc = 1) => function(ctx, h, t, o){ ctx.save(); if (sc !== 1) { ctx.translate(0, 13); ctx.scale(sc, sc); ctx.translate(0, -13); } h.legs('#2a2622'); h.torso(c1, c2); h.head('#a8826a'); h.look(); ctx.restore(); };
  [['sohra','#7a5a3a','#3a2a1a'],['greysword','#8a8c90','#3a3c40'],['brood','#5a4a3a','#2a2018',1.3],['kallor','#6a6a70','#2a2a30',1.15],['korlat','#2a2a3a','#0a0a14',1.1],
   ['mhybe','#6a5040','#2a2018'],['silverfox','#9a2a20','#4a1410',.7],['artanthos','#5a4a3a','#2a2018'],['tav','#8a8478','#3a362f',1.1],['hurlochel','#6a5a40','#2a2418'],
   ['b3_rhivi_rider','#7a5a3a','#3a2a1a'],['b3_barghast','#d8d0c0','#5a5040',1.1],['b3_andii','#2a2a3a','#0a0a14',1.1],['b3_greysword','#8a8c90','#3a3c40'],['b3_moranth','#1a1a1e','#050506'],
   ['beklite','#5a5448','#2a261e'],['seerdomin','#2a2a30','#0a0a0e',1.05],['tenescowri','#5a4a3a','#2a2018',.95],['khell','#7a7e78','#2a2e2a',1.9]].forEach(([k, a, b, s]) => { if (!FIGX[k]) FIGX[k] = stub(a, b, s); });
  ['sohra','greysword'].forEach(k => { if (!POR[k]) POR[k] = function(ctx){ const F = {cy:-76, w:11, h:19.6, skin:'#9a7254', iris:'#1e140c', lip:'#7e5040', browCol:'#1a1008', rim:'#a9b8cc'}; PR.torsoPath(ctx, 32, 4); ctx.fillStyle = PR.lit(ctx, '#7a5a3a', '#2a1a10', -32, 24); ctx.fill(); PR.neck(ctx, F, 5.6); PR.face(ctx, F); return F; }; });
  ['b3c_knight','b3c_lifesoldier','b3c_gate','b3c_obelisk','b3c_mason','b3c_kingchains','b3c_consort','b3c_leper'].forEach(k => { if (!CARDART[k]) CARDART[k] = (ctx, P) => glow(ctx, P.cx, P.py + P.ph*.45, P.pw*.4, P.hue || '#888', .3); });
}
/* the classic title (Settings › Artwork off): the same scene drawn on the canvas, hooked from here (22 stays as it is).
   The ridge, the camps' fires and the column's torches flickering, quorls crossing south, frost glittering on the crest, snow on the wind;
   under REDUCE() all of it holds still. */
function moiRidge(W, H, base, amp, seed, peaks){ const pts = [], n = 64; // a mountain line from hash noise, with a few big massifs
  for (let i=0;i<=n;i++){ const k = i/n, x = k*W; let y = base - amp*(.25 + hash(i, seed)*.35 + hash(i >> 1, seed + 1)*.3 + hash(i >> 2, seed + 2)*.25);
    peaks.forEach(([px, ph, pw]) => { const d = Math.abs(k - px)/pw; if (d < 1) y -= amp*ph*Math.pow(1 - d, 1.5); }); pts.push([x, Math.min(base, y)]); }
  return pts; }
function paintMoiStill(x, W, H){
  const hz = H*.66, fires = [], M = Math.min(H, W*.62); // M: mountains keep their height on a tall phone
  const sky = x.createLinearGradient(0, 0, 0, hz); sky.addColorStop(0, '#04060b'); sky.addColorStop(.45, '#121c2e'); sky.addColorStop(.75, '#3a4a62'); sky.addColorStop(.92, '#7d8a96'); sky.addColorStop(1, '#b4b6b4'); x.fillStyle = sky; x.fillRect(0, 0, W, hz + 2);
  x.fillStyle = 'rgba(214,226,240,.6)'; for (let i=0;i<70;i++){ const y = Math.pow(hash(i, 3), 1.6)*hz*.7; x.fillRect(hash(i, 2)*W, y, hash(i, 4) > .8 ? 1.6 : 1, hash(i, 4) > .8 ? 1.6 : 1); }
  glow(x, W*.86, hz, W*.55, '#d9cfbf', .32); // the last of dusk, in the west
  glow(x, W*.26, hz - H*.04, W*.5, '#bfe6ff', .3); glow(x, W*.27, hz - H*.05, W*.18, '#eaf8ff', .3); // the wrong cold light in the south
  [[.08, hz - H*.12, .5], [.6, hz - H*.09, .5]].forEach(([fx, y, w]) => { ell(x, W*(fx + w/2), y, W*w/2, H*.005, 'rgba(30,38,52,.7)'); x.fillStyle = 'rgba(200,214,226,.18)'; x.fillRect(W*(fx + .03), y + H*.004, W*(w - .06), 1); }); // cloud bars
  const fill = (pts, base, c) => { x.beginPath(); x.moveTo(0, base); pts.forEach(([px, py]) => x.lineTo(px, py)); x.lineTo(W, base); x.closePath(); x.fillStyle = c; x.fill(); };
  const caps = (pts, base, c, iceTo) => { for (let i=1;i<pts.length - 1;i++){ const [px, py] = pts[i]; if (!(py < pts[i-1][1] && py <= pts[i+1][1]) || base - py < M*.075) continue; const d = (base - py)*.2;
      x.fillStyle = px < W*iceTo ? 'rgba(230,246,255,.7)' : c; x.beginPath(); x.moveTo(px, py); x.lineTo(px - d*1.3, py + d*1.1); x.lineTo(px - d*.7, py + d*.7); x.lineTo(px - d*.2, py + d*1.3); x.lineTo(px + d*.3, py + d*.6); x.lineTo(px + d*.8, py + d*.75); x.closePath(); x.fill(); } };
  const far = moiRidge(W, H, hz, M*.13, 11, [[.2, .7, .16], [.36, .4, .1], [.56, .45, .14], [.74, .6, .14], [.92, .4, .12]]); fill(far, hz + 2, '#3a485c'); caps(far, hz, 'rgba(190,204,218,.5)', .45);
  for (let i=0;i<9;i++){ const px = W*(.14 + i*.032 + hash(i, 61)*.01), top = hz - M*(.2 + hash(i, 62)*.14), g = x.createLinearGradient(0, hz - M*.04, 0, top); g.addColorStop(0, 'rgba(223,244,255,.32)'); g.addColorStop(1, 'rgba(143,200,238,0)'); x.fillStyle = g; x.fillRect(px, top, W*(.003 + hash(i, 63)*.006), hz - M*.04 - top); } // pillars of ice-light (pulsed in the frame)
  x.fillStyle = 'rgba(122,140,160,.1)'; x.fillRect(0, hz - H*.16, W, H*.17);
  const mid = moiRidge(W, H, hz + H*.004, M*.06, 31, [[.12, .5, .12], [.44, .6, .14], [.64, .4, .12], [.84, .5, .14]]); fill(mid, hz + 4, '#1c2430'); 
  const pl = x.createLinearGradient(0, hz, 0, H); pl.addColorStop(0, '#26303e'); pl.addColorStop(.1, '#1a222e'); pl.addColorStop(.45, '#0e131b'); pl.addColorStop(1, '#05070a'); x.fillStyle = pl; x.fillRect(0, hz, W, H - hz);
  for (let i=0;i<40;i++){ const d = Math.pow(hash(i, 71), 1.6), y = hz + H*.01 + d*(H - hz)*.9; ell(x, hash(i, 72)*W, y, W*(.02 + hash(i, 73)*.06)*(.4 + d*1.6), 1 + d*3, `rgba(156,176,196,${.03 + hash(i, 74)*.05})`); } // old snow in the hollows
  // the Rhivi herds: a dark smear on the left, dust over it
  glow(x, W*.12, hz + H*.1, W*.16, '#8a98a8', .14); ell(x, W*.11, hz + H*.1, W*.14, H*.016, 'rgba(9,12,16,.9)');
  x.fillStyle = '#090c10'; for (let i=0;i<30;i++) ell(x, W*(.0 + hash(i, 81)*.22), hz + H*(.088 + hash(i, 82)*.01), 2.4, 1.6, '#090c10');
  // Brood's camp: sprawling, fires everywhere
  for (let i=0;i<70;i++){ const a = hash(i, 91)*6.283, r = Math.pow(hash(i, 92), .7), fx = W*.25 + Math.cos(a)*r*W*.17, fy = Math.max(hz + H*.04, hz + H*.065 + Math.sin(a)*r*H*.022), s = .6 + (fy - hz)/(H*.08);
    x.fillStyle = '#0b0f15'; x.beginPath(); x.moveTo(fx - 3*s, fy); x.quadraticCurveTo(fx, fy - 4*s, fx + 3*s, fy); x.fill(); if (hash(i, 93) < .3) fires.push([fx + 3, fy, s]); }
  // the Host's camp: a square, a palisade, tents in rows
  const c0 = [W*.71, hz + H*.018], c1 = [W*.83, hz + H*.018], c2 = [W*.85, hz + H*.068], c3 = [W*.68, hz + H*.068]; x.beginPath(); [c0, c1, c2, c3].forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.closePath(); x.fillStyle = '#121820'; x.fill(); x.strokeStyle = 'rgba(138,160,182,.3)'; x.lineWidth = 1; x.stroke();
  for (let r=0;r<5;r++){ const v = (r + .5)/5, y = lerp(c0[1], c3[1], v), xl = lerp(c0[0], c3[0], v) + 6, xr = lerp(c1[0], c2[0], v) - 6, s = .6 + v*.6; for (let c=0;c<14;c++){ const px = lerp(xl, xr, (c + .5)/14); x.fillStyle = '#080b10'; x.beginPath(); x.moveTo(px - 3*s, y + 1.5*s); x.lineTo(px, y - 3*s); x.lineTo(px + 3*s, y + 1.5*s); x.fill(); if (r % 2 === 0 && c % 4 === 1) fires.push([px + 4, y + 2, s*.8]); } }
  // the column: Brood's camp to the Host's, and the march going south between them
  const col = u => [W*lerp(.4, .69, u), hz + H*(.07 - .02*u + Math.sin(u*9)*.004)];
  x.strokeStyle = 'rgba(6,8,11,.7)'; x.lineWidth = 2; x.beginPath(); for (let i=0;i<=40;i++){ const [px, py] = col(i/40); i ? x.lineTo(px, py) : x.moveTo(px, py); } x.stroke();
  for (let i=0;i<60;i++){ const [px, py] = col(i/60), s = .5 + (py - hz)/(H*.1); x.fillStyle = '#06080b'; x.fillRect(px - s, py - 5*s, 2*s, 5*s); x.fillRect(px - .8*s, py - 7*s, 1.6*s, 1.6*s); if (i % 9 === 4) fires.push([px + 2, py - 4*s, s*.5]); }
  // the squad's ridge, frost on the crest
  x.fillStyle = '#05070a'; x.beginPath(); x.moveTo(W*.54, H); x.lineTo(W*.55, H*.95); x.quadraticCurveTo(W*.6, H*.9, W*.66, H*.885); x.quadraticCurveTo(W*.8, H*.866, W, H*.87); x.lineTo(W, H); x.closePath(); x.fill();
  x.strokeStyle = 'rgba(168,196,224,.45)'; x.lineWidth = 1.3; x.beginPath(); x.moveTo(W*.552, H*.948); x.quadraticCurveTo(W*.6, H*.9, W*.66, H*.884); x.quadraticCurveTo(W*.8, H*.865, W, H*.869); x.stroke();
  x.fillStyle = '#040506'; x.beginPath(); x.moveTo(0, H); x.lineTo(0, H*.96); x.quadraticCurveTo(W*.2, H*.945, W*.4, H*.955); x.quadraticCurveTo(W*.5, H*.96, W*.56, H); x.closePath(); x.fill();
  return {fires, hz};
}
function startTitleMOI(cv){
  const ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1); let still = null, info = null;
  const fit = () => { cv.width = innerWidth*dpr; cv.height = innerHeight*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); still = null; }; fit(); window.addEventListener('resize', fit);
  const snow = Array.from({length:70}, () => ({x: Math.random(), y: Math.random(), v: .00003 + Math.random()*.00008, s: .8 + Math.random()*1.4, w: Math.random()*7}));
  const quorl = (x, y, s, t) => { // a Black Moranth flier, going away to the south-west: long body, two pairs of wings, the rider low on it
    ctx.save(); ctx.translate(x, y); ctx.scale(-s, s); ctx.rotate(.45); const f = .6 + Math.abs(Math.sin(t/38))*.4;
    ctx.fillStyle = 'rgba(200,220,236,.42)'; [[-2, 1], [2, .86]].forEach(([wx, wl]) => { ell(ctx, wx, -15*wl*f, 2.4, 15*wl*f, 'rgba(200,220,236,.38)'); ell(ctx, wx, 13*wl*f, 2.2, 13*wl*f, 'rgba(180,204,224,.3)'); });
    ctx.fillStyle = '#090c13'; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(-30, -1.6, 8, -2.6); ctx.quadraticCurveTo(16, -3, 16, 0); ctx.quadraticCurveTo(16, 3, 8, 2.6); ctx.quadraticCurveTo(-30, 1.6, -40, 0); ctx.fill();
    ell(ctx, 19, 0, 4, 3.4, '#090c13'); ctx.fillRect(3, -11, 5, 9); ell(ctx, 5.5, -13.4, 2.4, 2.4, '#090c13'); ctx.strokeStyle = 'rgba(138,164,192,.45)'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.quadraticCurveTo(-30, -1.6, 8, -2.6); ctx.stroke(); ctx.restore(); };
  let last = performance.now(); const qs = Array.from({length:7}, (_, i) => ({u: i/7, v: .000022 + i*.000002}));
  titleAnim = () => {
    if (!cv.isConnected) { titleAnim = null; window.removeEventListener('resize', fit); return; }
    const W = innerWidth, H = innerHeight, mo = REDUCE() ? 0 : 1, now = performance.now(), dt = Math.min(64, now - last)*mo, t = now*mo; last = now;
    if (!still) { still = document.createElement('canvas'); still.width = W*dpr; still.height = H*dpr; const x = still.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0); info = paintMoiStill(x, W, H); }
    ctx.drawImage(still, 0, 0, W, H); const hz = info.hz;
    glow(ctx, W*.27, hz - H*.06, W*.2, '#dff4ff', (.06 + Math.sin(t/2600)*.04)*(mo ? 1 : .5)); // the cold light breathing
    info.fires.forEach(([fx, fy, s], i) => { const fl = .8 + (Math.sin(t/(110 + i%7*13) + i)*.12 + Math.sin(t/47 + i*3)*.08)*mo; glow(ctx, fx, fy, 4 + s*5, '#e0702c', .5*fl); ctx.fillStyle = `rgba(255,230,184,${.7*fl})`; ctx.fillRect(fx - .6, fy - .6, 1.2, 1.2); }); // the only warm things in it
    qs.forEach((q, i) => { if (mo) { q.u += q.v*dt; if (q.u > 1) q.u -= 1; } const u = q.u, x = W*(1.05 - u*.6), y = H*(.24 + u*.36) + Math.sin(t/900 + i)*3, s = Math.max(.15, (1 - u)*1.1)*Math.min(1, W/1000 + .3); quorl(x, y, s, t + i*90); }); // quorls, going south
    if (W > H*.9) { const fs = H*.085/32; ctx.save(); ctx.filter = 'brightness(.32) saturate(.4)'; ['ohl','tuft','sgt','brisk','kettle'].forEach((id, i) => { if (id === 'sgt' || FIGX[id] || ['ohl','tuft','brisk','kettle'].includes(id)) drawFigure(ctx, id, W*(.71 + i*.045), H*.874 - Math.sin(i*1.3)*1.5, fs, t, {phase:i, dir:-1}); }); ctx.restore(); } // the Fourth on the crest, looking out
    for (let i=0;i<26;i++){ const gx = W*(.56 + hash(i, 101)*.44), gy = gx < W*.66 ? H*(.95 - (gx/W - .55)/.11*.066) : H*(.884 - (gx/W - .66)*.05), a = mo ? Math.max(0, Math.sin(t/(500 + hash(i, 102)*900) + i*2)) : .5; ctx.fillStyle = `rgba(232,244,255,${.15 + a*.75})`; ctx.fillRect(gx, gy + hash(i, 103)*H*.02, 1.2, 1.2); } // frost glittering on the crest
    ctx.fillStyle = 'rgba(228,238,248,.5)'; snow.forEach(d => { if (mo) { d.x -= d.v*dt*1.6; d.y += d.v*dt*1.2; if (d.x < 0) d.x = 1; if (d.y > 1) d.y = 0; } ctx.fillRect((d.x + Math.sin(t/1500 + d.w)*.004)*W, d.y*H, d.s, d.s); }); // snow on the north wind
    const lv = ctx.createLinearGradient(0, 0, W, 0); lv.addColorStop(0, 'rgba(0,0,0,.7)'); lv.addColorStop(.45, 'rgba(0,0,0,.12)'); lv.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = lv; ctx.fillRect(0, 0, W, H);
    const v = ctx.createRadialGradient(W/2, H*.5, H*.25, W/2, H*.5, H*.95); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  };
}
{ const base = startTitleBackdrop; startTitleBackdrop = function(cv, book){ if (book && BOOKS[book] && BOOKS[book].titleScene === 'moi') return startTitleMOI(cv); return base(cv, book); }; }
/* the book list's cover (v13.2): frame the squad on the right */
BOOKS.moi.coverPos = '80% 50%';
