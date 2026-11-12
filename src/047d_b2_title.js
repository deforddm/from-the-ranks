/* ============ Book Two's title: the Chain of Dogs at dusk ============
   The painted title (ART 'title/dg', drawn by Claude for this game: the squad on a ridge, the refugee column across the Odhan,
   Wickan riders under the crows, Hissar burning behind) and its animated stand-in for Settings › Artwork off (startTitleChain).
   29 picks the book: the one played last, or the one tapped on the New sergeant screen. Crow motion: .k2-* in 001_style.css. */
/* the painted title, redrawn v13.2 from a seeded generator (019f's kit): dusk on the Odhan. Hissar burning on the far left horizon, its
   smoke laid across the sky; crows in their hundreds wheeling over the Chain; the column of refugees and wagons coming out of the smoke
   across the basin in its own dust, the light low and red; Wickan riders along a far ridge, lances up; and on the near ridge, seen from
   behind, five soldiers of the Seventh walking the Chain. Motion: the .k2t-* rules inside the SVG. */
{
  const f1 = TK.f1, h = (i, s) => hash(i, s), W = 1600, H = 900, HZ = 560;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k2t-fl{animation:k2t-fl 1.4s ease-in-out infinite}.k2t-cr{animation:k2t-cr 22s ease-in-out infinite}.k2t-wk{animation:k2t-wk 2.2s ease-in-out infinite}.k2t-sm{animation:k2t-sm 16s ease-in-out infinite}
@keyframes k2t-fl{0%,100%{opacity:.7}50%{opacity:1}}@keyframes k2t-cr{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-10px)}}@keyframes k2t-wk{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-.8px)}}@keyframes k2t-sm{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-4px)}}
@media (prefers-reduced-motion:reduce){.k2t-fl,.k2t-cr,.k2t-wk,.k2t-sm{animation:none}}.reduce .k2t-fl,.reduce .k2t-cr,.reduce .k2t-wk,.reduce .k2t-sm{animation:none}</style>
<defs><linearGradient id="k2sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c0a16"/><stop offset=".38" stop-color="#2a1a2c"/><stop offset=".7" stop-color="#7a3a2a"/><stop offset=".9" stop-color="#d0743a"/><stop offset="1" stop-color="#f0a85a"/></linearGradient>
<linearGradient id="k2land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4028"/><stop offset=".12" stop-color="#3e2618"/><stop offset=".5" stop-color="#1e120c"/><stop offset="1" stop-color="#0a0606"/></linearGradient>
<radialGradient id="k2sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd890" stop-opacity=".9"/><stop offset=".3" stop-color="#ff9a4a" stop-opacity=".4"/><stop offset="1" stop-color="#ff7a3a" stop-opacity="0"/></radialGradient>
<radialGradient id="k2fire" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc070" stop-opacity=".9"/><stop offset=".4" stop-color="#ff6a20" stop-opacity=".4"/><stop offset="1" stop-color="#ff6a20" stop-opacity="0"/></radialGradient>
<linearGradient id="k2body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a3022"/><stop offset=".3" stop-color="#1e140e"/><stop offset="1" stop-color="#0a0605"/></linearGradient>
<filter id="k2b24" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="24"/></filter><filter id="k2b10" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="10"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#k2sky)"/>`;
  s += TK.stars(70, 201, 0, 220, W, '#e8e0f0', '');
  /* the low sun behind the haze, right of centre, and long bars of cloud lit from below */
  s += `<circle cx="1000" cy="${HZ - 30}" r="260" fill="url(#k2sun)"/><circle cx="1000" cy="${HZ - 24}" r="26" fill="#ffe0a8" opacity=".85"/>`;
  s += `<g filter="url(#k2b10)">${[...Array(10)].map((_, i) => { const y = 200 + h(i, 211) * 300, x = h(i, 212) * W, w = 200 + h(i, 213) * 420; return `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(w)}" ry="${f1(4 + h(i, 214) * 7)}" fill="${y > 380 ? '#f0985a' : '#8a4a4a'}" opacity="${f1(.25 + h(i, 215) * .35)}"/>`; }).join('')}</g>`;
  /* Hissar burning on the horizon at the left: the glow, the walls, the smoke laid across the sky to the east */
  s += `<circle cx="170" cy="${HZ}" r="220" fill="url(#k2fire)" opacity=".8"/>`;
  s += `<g class="k2t-sm">${TK.smoke(120, HZ - 20, 420, 80, 140, '#140a0c', .85, 221, 'k2b24')}${TK.smoke(230, HZ - 16, 360, 60, 180, '#24120e', .7, 223, 'k2b24')}</g>`;
  let hs = ''; for (let i = 0; i < 22; i++) { const x = 60 + i * 11, ht = 8 + h(i, 231) * 22 * (i % 6 === 3 ? 2.2 : 1); hs += `<rect x="${x}" y="${f1(HZ - 6 - ht)}" width="${f1(9 + h(i, 232) * 4)}" height="${f1(ht + 8)}" fill="#1a0c0a"/>`; if (h(i, 233) < .35) hs += `<circle class="k2t-fl" style="animation-delay:-${f1(h(i, 234))}s" cx="${x + 5}" cy="${f1(HZ - 10 - ht * .4)}" r="${f1(6 + h(i, 235) * 8)}" fill="url(#k2fire)"/>`; }
  s += hs;
  /* the Odhan: the far edge, then the basin falling away in long folds */
  s += `<path d="M0 ${HZ} Q300 ${HZ - 12} 600 ${HZ - 4} Q900 ${HZ + 4} 1200 ${HZ - 8} Q1420 ${HZ - 14} ${W} ${HZ - 2} L${W} ${H} L0 ${H} Z" fill="url(#k2land)"/>`;
  for (let i = 0; i < 6; i++) { const y = HZ + 30 + i * 34 + i * i * 6; s += `<path d="M0 ${y} Q${f1(400 + h(i, 241) * 300)} ${f1(y - 14 - h(i, 242) * 16)} ${f1(900 + h(i, 243) * 200)} ${f1(y + 4)} T${W} ${f1(y - 8)}" stroke="#d08050" stroke-width="1.2" fill="none" opacity="${f1(.12 - i * .015)}"/>`; }
  let sc = ''; for (let i = 0; i < 160; i++) { const d = h(i, 251), y = HZ + 10 + d * d * 300, x = h(i, 252) * W, r = 1 + d * 5; sc += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r * 1.6)}" ry="${f1(r * .8)}"/>`; }
  s += `<g fill="#140a08" opacity=".7">${sc}</g>`;
  /* the Chain: from the smoke at Hissar across the basin and out to the right under the near ridge; carts, oxen, people, in their own dust */
  const road = t => { const x = 200 + t * 1500, y = HZ + 8 + Math.pow(t, 1.3) * 130 + Math.sin(t * 7) * 14 * t; return [x, y]; };
  s += `<path d="${[...Array(41)].map((_, i) => { const [x, y] = road(i / 40); return (i ? 'L' : 'M') + f1(x) + ' ' + f1(y); }).join('')}" stroke="#e8a06a" stroke-width="34" fill="none" opacity=".22" filter="url(#k2b10)"/>`;
  let col = ''; for (let i = 0; i < 180; i++) { const t = Math.pow(h(i, 261), .8) * .84, [x, y] = road(t), k = .3 + t * .7, off = (h(i, 262) - .5) * 40 * k;
    if (i % 17 === 0) col += `<g transform="translate(${f1(x + off)} ${f1(y + off * .3)}) scale(${f1(k)})" fill="#140a08"><path d="M-12 -14 Q0 -24 12 -14 L12 -5 L-12 -5 Z"/><circle cx="-7" cy="-2" r="4"/><circle cx="7" cy="-2" r="4"/><path d="M-26 -6 Q-22 -14 -14 -10 L-14 -4 Z"/></g>`;
    else col += TK.walker(x + off, y + off * .3, k * .8, i, '#140a08', {spears:.08}); }
  s += `<g class="k2t-wk">${col}</g>`;
  s += `<path d="${[...Array(41)].map((_, i) => { const [x, y] = road(i / 40); return (i ? 'L' : 'M') + f1(x) + ' ' + f1(y - 14); }).join('')}" stroke="#f0b080" stroke-width="30" fill="none" opacity=".12" filter="url(#k2b24)"/>`;
  /* Wickan riders along a far ridge to the right, lances up */
  s += `<path d="M880 ${HZ + 2} Q1060 ${HZ - 30} 1260 ${HZ - 22} Q1400 ${HZ - 12} 1520 ${HZ + 4} Z" fill="#2a1810"/>`;
  const ridgeY = x => { const q = (a, c, b) => { let lo = 0, hi = 1; for (let n = 0; n < 24; n++) { const t = (lo + hi) / 2, xt = (1 - t) * (1 - t) * a[0] + 2 * t * (1 - t) * c[0] + t * t * b[0]; if (xt < x) lo = t; else hi = t; } const t = lo; return (1 - t) * (1 - t) * a[1] + 2 * t * (1 - t) * c[1] + t * t * b[1]; };
    return x < 1260 ? q([880, HZ + 2], [1060, HZ - 30], [1260, HZ - 22]) : q([1260, HZ - 22], [1400, HZ - 12], [1520, HZ + 4]); }; // the far ridge's crest, so the riders ride on it
  let rd = ''; for (let i = 0; i < 14; i++) { const x = 940 + i * 34 + (h(i, 271) - .5) * 30 + (i > 6 ? 40 : 0), y = ridgeY(x) + 1, k = .62;
    rd += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${k})" fill="#100806"><path d="M-14 -16 Q-4 -22 10 -18 L16 -24 L20 -22 L16 -14 L12 -12 L10 0 L7 0 L6 -10 L-8 -10 L-10 0 L-13 0 L-12 -11 Q-18 -12 -14 -16 Z"/><path d="M-2 -18 L-3 -32 L3 -32 L2 -18 Z"/><circle cx="0" cy="-35" r="3"/><path d="M4 -24 L${10 + h(i, 272) * 6} -60" stroke="#100806" stroke-width="1.2"/></g>`; }
  s += rd;
  /* crows: hundreds over the column, wheeling */
  let cr = ''; for (let i = 0; i < 100; i++) { const a = h(i, 281) * Math.PI * 2, rr = 40 + Math.pow(h(i, 282), .7) * 360, x = 640 + Math.cos(a) * rr * 1.6, y = 300 + Math.sin(a) * rr * .45, k = .45 + h(i, 283) * .9; cr += TK.bird(x, y, k, h(i, 284) < .5, '#0c0608'); }
  s += `<g class="k2t-cr">${cr}</g>`;
  /* the near ridge, dry grass and stones lit red along its crest */
  s += `<path d="M560 ${H} Q760 778 1000 758 Q1260 742 1600 752 L1600 ${H} Z" fill="#0c0705"/>`;
  s += TK.rim('M620 880 Q780 780 1000 760 Q1260 744 1600 754', '#e89060', 1.8, .45);
  let gr = ''; for (let i = 0; i < 140; i++) { const x = 640 + h(i, 291) * 960, y = 762 + h(i, 292) * 26 + (x < 1000 ? (1000 - x) * .26 : 0), l = 6 + h(i, 293) * 16; if (y > 900) continue; gr += `M${f1(x)} ${f1(y)} l${f1((h(i, 294) - .5) * 8)} ${f1(-l)}`; }
  s += `<path d="${gr}" stroke="#2a160c" stroke-width="1.4"/><path d="${gr}" stroke="#e08a50" stroke-width=".6" opacity=".25" transform="translate(-1 0)"/>`;
  /* the five, seen from behind, the sun on their left shoulders */
  const B = {fill:'url(#k2body)', dark:'#0e0806', rim:'#ffb070', helmc:'#3a2a22', packc:'#24180e', roll:'#2e2014', ink:'#060302'};
  const five = [
    [1120, 820, .74, {kit:'spear', head:'wrap', helmc:'#5a4430', cloak:'#1a100a', walk:1}],
    [1470, 806, .7, {kit:'none', head:'wrap', helmc:'#6a5236', flip:true, walk:1}],
    [1236, 848, .86, {kit:'shield', head:'helm', wide:1.1, shieldc:'#2a1610', shieldr:'#5a3018'}],
    [1350, 838, .82, {kit:'xbow', head:'cap', helmc:'#2a1c14', walk:1}],
    [1010, 858, .78, {kit:'staff', head:'hood', cloak:'#140c08', pack:false}]];
  for (const [x, y, k, o] of five) s += `<g transform="translate(${x} ${y}) scale(${k})">${TK.back(Object.assign({}, B, o))}</g>`;
  s += `</svg>`;
  ART['title/dg'] = s;
}
ART_SIZE['title/dg'] = [1600, 900];
/* the Third's shoulder patch: a heater shield of sun-faded cloth, III over a Crow Clan feather, the Chain's links above, five strokes for five soldiers, the series' flame below */
ART['insignia/dg'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 340\" role=\"img\" aria-label=\"The Third's squad patch\">\n<path d=\"M42 52 L258 52 L258 196 Q258 282 150 318 Q42 282 42 196 Z\" fill=\"#2a1c10\"/>\n<defs><radialGradient id=\"pdg-cloth\" cx=\"0.45\" cy=\"0.4\" r=\"0.7\"><stop offset=\"0\" stop-color=\"#6e5034\"/><stop offset=\"1\" stop-color=\"#3e2a18\"/></radialGradient></defs>\n<path d=\"M54 64 L246 64 L246 194 Q246 270 150 304 Q54 270 54 194 Z\" fill=\"url(#pdg-cloth)\"/>\n<path d=\"M48 58 L252 58 L252 195 Q252 276 150 311 Q48 276 48 195 Z\" fill=\"none\" stroke=\"#d8b884\" stroke-width=\"2.5\" stroke-dasharray=\"6 4\"/>\n<path d=\"M58 70 Q66 96 58 118 Q62 94 58 70 Z\" fill=\"#3a2414\" opacity=\"0.7\"/>\n<circle cx=\"226\" cy=\"262\" r=\"9\" fill=\"#120c08\" opacity=\"0.55\"/><circle cx=\"226\" cy=\"262\" r=\"5\" fill=\"#0a0705\" opacity=\"0.7\"/>\n<g fill=\"none\" stroke=\"#c8b898\" stroke-width=\"4\">\n<ellipse cx=\"104\" cy=\"92\" rx=\"11\" ry=\"7\"/><ellipse cx=\"127\" cy=\"92\" rx=\"11\" ry=\"7\" stroke=\"#9a8a72\"/><ellipse cx=\"150\" cy=\"92\" rx=\"11\" ry=\"7\"/><ellipse cx=\"173\" cy=\"92\" rx=\"11\" ry=\"7\" stroke=\"#9a8a72\"/><ellipse cx=\"196\" cy=\"92\" rx=\"11\" ry=\"7\"/>\n</g>\n<g transform=\"translate(150 166) rotate(34) scale(0.86) translate(-150 -175)\">\n<path d=\"M150 70 Q174 120 170 190 Q166 246 150 286 Q134 246 130 190 Q126 120 150 70 Z\" fill=\"#0a0809\"/>\n<path d=\"M150 70 Q170 118 168 176\" stroke=\"#46507a\" stroke-width=\"2\" fill=\"none\" opacity=\"0.7\"/>\n<path d=\"M150 80 L150 300\" stroke=\"#4a4458\" stroke-width=\"2.4\"/>\n<g stroke=\"#262230\" stroke-width=\"1.6\"><path d=\"M150 110 L165 98\"/><path d=\"M150 132 L168 120\"/><path d=\"M150 156 L169 146\"/><path d=\"M150 180 L168 172\"/><path d=\"M150 204 L166 198\"/><path d=\"M150 228 L162 224\"/><path d=\"M150 120 L134 108\"/><path d=\"M150 144 L132 134\"/><path d=\"M150 168 L131 160\"/><path d=\"M150 192 L132 186\"/><path d=\"M150 216 L134 212\"/></g>\n<path d=\"M142 262 L136 272 M158 262 L164 270\" stroke=\"#0a0809\" stroke-width=\"3\"/>\n</g>\n<text x=\"150\" y=\"200\" text-anchor=\"middle\" font-family=\"IM Fell English SC, Georgia, serif\" font-size=\"96\" font-weight=\"700\" fill=\"#d8b884\" stroke=\"#1a110a\" stroke-width=\"7\" paint-order=\"stroke\">III</text>\n<g stroke=\"#e8dcc2\" stroke-width=\"5\" stroke-linecap=\"round\"><path d=\"M114 228 L114 252\"/><path d=\"M134 228 L134 252\"/><path d=\"M154 228 L154 252\"/><path d=\"M174 228 L174 252\"/><path d=\"M106 247 L184 234\"/></g>\n<g><path d=\"M140.4 296.0 C134.7 290.3 136.4 281.3 142.6 276.7 C142.1 282.4 145.5 285.2 146.6 280.7 C146.6 273.9 151.1 267.7 150.0 262.0 C156.2 269.4 158.5 275.0 155.1 281.8 C158.5 279.6 160.2 276.2 159.6 271.6 C166.4 279.6 165.3 290.9 159.6 296.0 Z\" fill=\"#a8341a\" stroke=\"#5a1a0e\" stroke-width=\"0.8\"/><path d=\"M143.8 296.0 C139.8 291.5 141.5 284.7 146.0 281.3 C146.0 285.8 148.3 287.5 149.4 283.5 C150.0 277.9 153.4 274.5 152.8 269.9 C157.4 276.7 158.5 283.5 156.8 288.1 C159.1 286.4 160.2 283.5 159.6 280.1 C162.5 286.9 160.8 293.2 156.2 296.0 Z\" fill=\"#e0782a\"/><path d=\"M147.2 296.0 C144.3 292.6 146.6 286.9 150.0 283.5 C150.6 287.5 152.8 289.2 152.3 284.7 C155.1 289.2 155.7 292.6 155.1 294.3 C154.5 295.4 153.4 296.0 152.8 296.0 Z\" fill=\"#f6cf74\"/><path d=\"M140.4 296.0 C134.7 290.3 136.4 281.3 142.6 276.7 C142.1 282.4 145.5 285.2 146.6 280.7 C146.6 273.9 151.1 267.7 150.0 262.0 C156.2 269.4 158.5 275.0 155.1 281.8 C158.5 279.6 160.2 276.2 159.6 271.6 C166.4 279.6 165.3 290.9 159.6 296.0 Z\" fill=\"none\" stroke=\"#e8c58a\" stroke-width=\"0.6\" stroke-dasharray=\"1.2 1.2\" opacity=\"0.55\"/></g>\n</svg>";
ART_SIZE['insignia/dg'] = [300, 340];

/* the same scene for the classic drawings: the column walks, the crows wheel, Hissar smokes */
function chainPt(u){ // the column's road as fractions of the screen: from Hissar on the horizon, across the basin, out under the squad's ridge
  const seg = [[[.128,.601],[.19,.63],[.26,.68],[.44,.70]], [[.44,.70],[.56,.71],[.63,.745],[.74,.772]], [[.74,.772],[.82,.784],[.91,.787],[1.03,.78]]];
  const k = Math.min(2, Math.floor(u*3)), t = u*3 - k, [a, b, c, d] = seg[k], v = 1 - t;
  return [v*v*v*a[0] + 3*v*v*t*b[0] + 3*v*t*t*c[0] + t*t*t*d[0], v*v*v*a[1] + 3*v*v*t*b[1] + 3*v*t*t*c[1] + t*t*t*d[1]]; }
function paintChainStill(x, W, H){
  const hz = H*.6, sky = x.createLinearGradient(0, 0, 0, hz); sky.addColorStop(0, '#07060c'); sky.addColorStop(.5, '#151122'); sky.addColorStop(.78, '#2c1c2c'); sky.addColorStop(.9, '#6a3424'); sky.addColorStop(1, '#c46a2c');
  x.fillStyle = sky; x.fillRect(0, 0, W, hz + 2);
  x.fillStyle = 'rgba(216,207,232,.55)'; for (let i=0;i<40;i++) x.fillRect(hash(i,41)*W, hash(i,42)*hz*.45, 1, 1);
  glow(x, W*.56, hz, W*.42, '#ffb060', .45);
  for (let i=0;i<4;i++){ const y = hz*(.72 + i*.06), x0 = W*hash(i,43)*.4, w = W*(.3 + hash(i,44)*.3); ell(x, x0 + w/2, y, w/2, H*.006, 'rgba(28,18,24,.55)'); x.fillStyle = 'rgba(224,138,68,.25)'; x.fillRect(x0 + w*.1, y + H*.004, w*.8, 1); } // cloud bars lit from below
  const pl = x.createLinearGradient(0, hz, 0, H); pl.addColorStop(0, '#4a2a18'); pl.addColorStop(.12, '#2e1c12'); pl.addColorStop(.5, '#160e0a'); pl.addColorStop(1, '#070505'); x.fillStyle = pl; x.fillRect(0, hz, W, H - hz);
  x.fillStyle = '#140c0a'; [[.044,.012,.018],[.06,.022,.03],[.075,.016,.02],[.09,.03,.045],[.105,.014,.022],[.12,.02,.026],[.135,.012,.016]].forEach(([fx, fw, fh]) => x.fillRect(W*fx, hz - H*fh, W*fw, H*fh + 2)); // Hissar's broken line
  x.fillStyle = '#1a100c'; x.beginPath(); x.moveTo(W*.16, H*.673); x.quadraticCurveTo(W*.2, H*.638, W*.24, H*.613); x.bezierCurveTo(W*.29, H*.578, W*.41, H*.553, W*.545, H*.6); x.quadraticCurveTo(W*.6, H*.624, W*.68, H*.673); x.closePath(); x.fill(); // the riders' ridge
  x.strokeStyle = 'rgba(224,138,68,.4)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(W*.24, H*.613); x.bezierCurveTo(W*.29, H*.578, W*.41, H*.553, W*.545, H*.6); x.stroke();
  const crest = u => { const v = 1 - u; return [W*(v*v*v*.24 + 3*v*v*u*.29 + 3*v*u*u*.41 + u*u*u*.545), H*(v*v*v*.613 + 3*v*v*u*.578 + 3*v*u*u*.553 + u*u*u*.6)]; };
  const rh = Math.max(10, H*.03); x.fillStyle = '#120b09'; x.strokeStyle = '#120b09';
  for (let i=0;i<14;i++){ const [rx, ry] = crest(.15 + i*.055), s = rh/26, lead = i === 9; x.save(); x.translate(rx, ry); x.scale(s*(lead ? 1.15 : 1), s*(lead ? 1.15 : 1)); // Wickan riders, riding east; the lead in his feather cloak
    x.beginPath(); x.moveTo(-9,-8); x.quadraticCurveTo(-10,-13,-4,-14); x.lineTo(5,-14); x.quadraticCurveTo(9,-14,10,-18); x.lineTo(13,-22); x.lineTo(15,-21); x.lineTo(13,-16); x.quadraticCurveTo(12,-10,7,-8); x.closePath(); x.fill();
    x.lineWidth = 1.4; x.beginPath(); [[-8,-9,-9,0],[-5,-9,-5,0],[4,-9,5,0],[7,-9,8,0]].forEach(([a,b,c,d]) => { x.moveTo(a,b); x.lineTo(c,d); }); x.stroke();
    x.beginPath(); x.moveTo(-2,-14); x.lineTo(-1,-22); x.lineTo(2,-22); x.lineTo(3,-14); x.closePath(); x.fill(); x.beginPath(); x.arc(.6, -25, 2, 0, 7); x.fill();
    if (lead) poly(x, [[-1,-22],[-8,-20],[-12,-15],[-9,-16],[-13,-11],[-8,-13],[-10,-9],[-2,-14]], '#120b09'); x.restore(); }
  for (let i=0;i<4;i++){ const y = H*(.68 + i*.06); x.strokeStyle = `rgba(168,94,44,${.08 + i*.03})`; x.lineWidth = 1; x.beginPath(); x.moveTo(0, y); for (let j=0;j<=8;j++) x.quadraticCurveTo(W*(j/8 - .0625), y - H*.012*(j%2 ? 1 : -.4), W*j/8, y); x.stroke(); } // dune crests
  x.fillStyle = '#060504'; x.beginPath(); x.moveTo(W*.56, H); x.lineTo(W*.56, H*.9); x.quadraticCurveTo(W*.6, H*.858, W*.65, H*.836); x.quadraticCurveTo(W*.75, H*.814, W*.89, H*.824); x.quadraticCurveTo(W*.95, H*.836, W, H*.856); x.lineTo(W, H); x.closePath(); x.fill(); // the squad's ridge
  x.strokeStyle = 'rgba(184,100,44,.4)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(W*.6, H*.86); x.quadraticCurveTo(W*.75, H*.812, W*.95, H*.833); x.stroke();
}
function startTitleChain(cv){
  const ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1); let still = null;
  const fit = () => { cv.width = innerWidth*dpr; cv.height = innerHeight*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); still = null; }; fit(); window.addEventListener('resize', fit);
  const walkers = Array.from({length:150}, (_, i) => ({u: i/150 + Math.random()/150, k: Math.random(), v: .000004 + Math.random()*.000003}));
  const crows = Array.from({length:16}, (_, i) => ({a: i/16*Math.PI*2, r: .6 + Math.random()*.5, v: .00012 + Math.random()*.00008, f: Math.random()*7, c: i < 11 ? 0 : 1}));
  const dust = Array.from({length:70}, () => ({x: Math.random(), y: Math.random(), v: .00004 + Math.random()*.0001, s: .8 + Math.random()*1.4}));
  let last = performance.now();
  titleAnim = () => {
    if (!cv.isConnected) { titleAnim = null; window.removeEventListener('resize', fit); return; }
    const W = innerWidth, H = innerHeight, mo = REDUCE() ? 0 : 1, now = performance.now(), dt = Math.min(64, now - last)*mo, t = now*mo; last = now;
    if (!still) { still = document.createElement('canvas'); still.width = W*dpr; still.height = H*dpr; const x = still.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0); paintChainStill(x, W, H); }
    ctx.drawImage(still, 0, 0, W, H);
    const fl = .85 + (Math.sin(t/140)*.08 + Math.sin(t/57)*.05)*mo; glow(ctx, W*.1, H*.6, W*.12, '#ff7a2a', .35*fl); // Hissar burning
    for (let j=0;j<10;j++){ const p = ((t/60 + j*40) % 400)/400, yy = H*.6 - p*H*.36, xx = W*.1 + p*p*W*.22 + Math.sin(t/2500 + j)*6; ell(ctx, xx, yy, W*(.012 + p*.05), H*(.012 + p*.03), `rgba(38,28,30,${.42*(1 - p)})`); } // its smoke, leaning east
    walkers.forEach((w, i) => { w.u += w.v*dt; if (w.u > 1) w.u -= 1; const [fx, fy] = chainPt(w.u), s = Math.max(.25, .35 + (fy - .6)/.17)*H/560, x = fx*W + (w.k - .5)*10*s, y = fy*H + (hash(i,51) - .5)*8*s;
      ell(ctx, x, y - 4*s, 28*s, 7*s, 'rgba(201,138,82,.05)'); // the dust they raise
      ctx.fillStyle = '#0c0807';
      if (w.k < .07) { ctx.fillRect(x - 7*s, y - 6*s, 14*s, 6*s); ctx.beginPath(); ctx.arc(x, y - 6*s, 7*s, Math.PI, 0); ctx.fill(); } // a cart
      else if (w.k < .13) { ell(ctx, x, y - 3*s, 5*s, 2.4*s, '#0c0807'); ctx.fillRect(x - 4*s, y - 2*s, 1.2*s, 3*s); ctx.fillRect(x + 3*s, y - 2*s, 1.2*s, 3*s); } // cattle
      else { const st = mo ? Math.sin(t/180 + i)*.8*s : 0; ctx.fillRect(x - 1.4*s, y - 6.5*s, 2.8*s, 6.5*s + st*.3); ctx.beginPath(); ctx.arc(x, y - 8*s, 1.3*s, 0, 7); ctx.fill(); } // someone walking
      if (i % 25 === 3) { glow(ctx, x + 3*s, y - 6*s, 12*s + 4, '#f0a24a', .5*fl); ctx.fillStyle = '#ffe2b0'; ctx.fillRect(x + 2.6*s, y - 6.4*s, 1.2, 1.2); } }); // a lantern
    ctx.fillStyle = '#0d090c'; crows.forEach(c => { if (mo) c.a += c.v*dt; const cx = c.c ? W*.61 : W*.39, cy = c.c ? H*.33 : H*.4, R = (c.c ? W*.06 : W*.11)*c.r, x = cx + Math.cos(c.a)*R, y = cy + Math.sin(c.a)*R*.35, s = H*.0011*(c.c ? .8 : 1), wy = Math.sin(t/110 + c.f)*4*s;
      ctx.beginPath(); ctx.moveTo(x - 9*s, y - 3*s - wy); ctx.quadraticCurveTo(x - 4*s, y - 6*s - wy, x, y); ctx.quadraticCurveTo(x + 4*s, y - 6*s - wy, x + 9*s, y - 3*s - wy); ctx.quadraticCurveTo(x + 4*s, y - 2*s, x, y + 1.6*s); ctx.quadraticCurveTo(x - 4*s, y - 2*s, x - 9*s, y - 3*s - wy); ctx.fill(); }); // crows over the Wickans
    if (W > H*.9) { // a landscape screen has room for the squad on its ridge; on a phone held upright the menus sit there
      ell(ctx, W*.8, H*.79, W*.26, H*.05, 'rgba(201,138,82,.08)'); // haze behind the squad
      const fs = H*.085/32; ctx.save(); ctx.filter = 'brightness(.42) sepia(.35)'; ['tangle','haddat','marrow','hackle','sathi','sgt_dg'].forEach((id, i) => { if (FIGX[id]) drawFigure(ctx, id, W*(.74 + i*.04), H*.835 + Math.sin(i*1.7)*2, id === 'hackle' ? fs*.8 : fs, t, {phase:i}); }); ctx.restore(); // the squad, watching the column go by below
      glow(ctx, W*.82, H*.75, H*.04, '#f0a24a', .3*fl); } // Marrow's lamp
    ctx.fillStyle = 'rgba(216,184,144,.3)'; dust.forEach(d => { if (mo) { d.x -= d.v*dt*1.4; d.y += d.v*dt*.4; if (d.x < 0) d.x = 1; if (d.y > 1) d.y = 0; } ctx.fillRect(d.x*W, d.y*H, d.s, d.s); }); // blowing dust
    const lv = ctx.createLinearGradient(0, 0, W, 0); lv.addColorStop(0, 'rgba(0,0,0,.7)'); lv.addColorStop(.45, 'rgba(0,0,0,.12)'); lv.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = lv; ctx.fillRect(0, 0, W, H);
    const v = ctx.createRadialGradient(W/2, H*.5, H*.25, W/2, H*.5, H*.95); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  };
}
/* the book list's cover (v13.2): frame the squad on the right */
BOOKS.dg.coverPos = '76% 50%';
