/* ============ Book Six's title: Y'Ghatan at dusk, the bones in its walls, and smoke (v9.0, 100b) ============
   The painted title (ART 'title/bh', drawn by Claude for this game from a seeded generator): a smoke-red dusk over the Odhan; the walls of
   Y'Ghatan the colour of old bone, with the bones of the older cities in them, as the novel's epigraph has it ("the bones in the walls, the bones
   beneath the floor"); one tower down and a breach; smoke rising behind the walls; the barrows of the Empire's dead along the road in front; a
   file of soldiers on the road; and in the foreground a finger bone on a thong hanging from a spear, the Bonehunters' mark.
   The patch (ART 'insignia/bh'): the two squads' own patches side by side, the Third's (Book Four's, already with its finger bone) and the
   Fourth's with a finger bone stitched under the flame (series-patches.md; plan question 6).
   Motion: the .k6-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  /* redrawn v13.2 from a seeded generator (019f's kit): a smoke-red dusk over the Odhan; Y'Ghatan on its rise, walls the colour of old bone
     with the bones of the older cities in them (the novel's epigraph: "the bones in the walls, the bones beneath the floor"); one tower down
     and a breach; smoke rising behind the walls; the road up to it between the barrows of the Empire's dead; a file of soldiers on the road;
     and in the foreground a spear driven into the ground with a finger bone on a thong hanging from it, the Bonehunters' mark, and two of
     them beside it, seen from behind, looking at the city. */
  const f1 = TK.f1, h = (i, s) => hash(i, s), W = 1600, H = 900, WALL = 520; // the foot of the walls
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k6-sm{animation:k6-sm 16s ease-in-out infinite}.k6-fl{animation:k6-fl 1.8s ease-in-out infinite}.k6-sw{animation:k6-sw 4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 0}.k6-wk{animation:k6-wk 2.4s ease-in-out infinite}
@keyframes k6-sm{0%,100%{transform:translate(0,0)}50%{transform:translate(16px,-8px)}}@keyframes k6-fl{0%,100%{opacity:.7}50%{opacity:1}}@keyframes k6-sw{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}@keyframes k6-wk{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-.7px)}}
@media (prefers-reduced-motion:reduce){.k6-sm,.k6-fl,.k6-sw,.k6-wk{animation:none}}.reduce .k6-sm,.reduce .k6-fl,.reduce .k6-sw,.reduce .k6-wk{animation:none}</style>
<defs><linearGradient id="k6sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140608"/><stop offset=".4" stop-color="#4a1410"/><stop offset=".75" stop-color="#a0381a"/><stop offset="1" stop-color="#e07a3a"/></linearGradient>
<linearGradient id="k6wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c89c7c"/><stop offset=".55" stop-color="#8a6048"/><stop offset="1" stop-color="#4a2c22"/></linearGradient>
<linearGradient id="k6tow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dcac88"/><stop offset=".45" stop-color="#946a50"/><stop offset="1" stop-color="#3a2219"/></linearGradient>
<linearGradient id="k6land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a3a22"/><stop offset=".3" stop-color="#3a2014"/><stop offset="1" stop-color="#0e0806"/></linearGradient>
<radialGradient id="k6fire" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc070" stop-opacity=".9"/><stop offset=".4" stop-color="#ff6a20" stop-opacity=".4"/><stop offset="1" stop-color="#ff6a20" stop-opacity="0"/></radialGradient>
<linearGradient id="k6body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a3022"/><stop offset=".3" stop-color="#22120c"/><stop offset="1" stop-color="#0a0504"/></linearGradient>
<filter id="k6b24" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="24"/></filter><filter id="k6b8" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="8"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#k6sky)"/>`;
  /* the smoke over the city, great slow columns leaning east, lit from below */
  s += `<g class="k6-sm">${TK.smoke(600, WALL - 110, 440, 70, 50, '#221a20', .85, 601, 'k6b24')}${TK.smoke(880, WALL - 120, 480, 80, 70, '#2a2026', .8, 603, 'k6b24')}${TK.smoke(1130, WALL - 100, 360, 56, 60, '#221a20', .75, 605, 'k6b24')}</g>`;
  s += `<ellipse cx="820" cy="${WALL - 140}" rx="520" ry="110" fill="url(#k6fire)" opacity=".55"/>`;
  /* the rise, and the city's roofs and domes behind the walls */
  s += `<path d="M0 ${WALL + 60} Q300 ${WALL + 10} 560 ${WALL - 4} L1180 ${WALL - 4} Q1360 ${WALL + 10} ${W} ${WALL + 50} L${W} ${H} L0 ${H} Z" fill="url(#k6land)"/>`;
  let rf = ''; for (let i = 0; i < 26; i++) { const x = 500 + i * 26 + h(i, 611) * 10, ht = 20 + h(i, 612) * 50; rf += h(i, 613) < .25 ? `<path d="M${f1(x)} ${WALL - 70} L${f1(x)} ${f1(WALL - 70 - ht * .6)} A18 18 0 0 1 ${f1(x + 36)} ${f1(WALL - 70 - ht * .6)} L${f1(x + 36)} ${WALL - 70} Z"/>` : `<rect x="${f1(x)}" y="${f1(WALL - 70 - ht)}" width="${f1(18 + h(i, 614) * 14)}" height="${f1(ht)}"/>`; }
  s += `<g fill="#3a1c14">${rf}</g>`;
  /* the walls: bone-coloured, the bones of older cities set in them, towers along them, one tower down and a breach */
  const WX0 = 470, WX1 = 1250, WT = WALL - 92;
  s += `<path d="M${WX0} ${WALL} L${WX0} ${WT} ${[...Array(27)].map((_, i) => { const x = WX0 + i * 30; return `L${x} ${WT} L${x} ${WT - 8} L${x + 15} ${WT - 8} L${x + 15} ${WT}`; }).join(' ')} L${WX1} ${WT} L${WX1} ${WALL} Z" fill="url(#k6wall)"/>`;
  s += `<path d="M836 ${WALL} L846 ${WT + 4} L870 ${WT + 30} L890 ${WT + 10} L906 ${WT + 40} L918 ${WALL} Z" fill="#2a120c"/><path d="M846 ${WT + 4} L870 ${WT + 30} L890 ${WT + 10} L906 ${WT + 40}" stroke="#f0e0c0" stroke-width="1.4" fill="none" opacity=".6"/>`;
  s += `<circle class="k6-fl" cx="878" cy="${WALL - 30}" r="34" fill="url(#k6fire)"/>`;
  let bn = ''; for (let i = 0; i < 70; i++) { const x = WX0 + 8 + h(i, 621) * (WX1 - WX0 - 16), y = WT + 10 + h(i, 622) * 78; if (x > 830 && x < 924) continue; const k = h(i, 623);
    bn += k < .25 ? `<circle cx="${f1(x)}" cy="${f1(y)}" r="3.4" fill="#e8d4b4" stroke="#5a4030" stroke-width=".8" opacity=".85"/><circle cx="${f1(x - 1.2)}" cy="${f1(y - .4)}" r=".8" fill="#4a3826"/><circle cx="${f1(x + 1.2)}" cy="${f1(y - .4)}" r=".8" fill="#4a3826"/>` : `<path d="M${f1(x - 6)} ${f1(y)} L${f1(x + 6)} ${f1(y + (h(i, 624) - .5) * 4)}" stroke="#e8d4b4" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>`; }
  s += bn + `<path d="M${WX0} ${WT + 30} L${WX1} ${WT + 30} M${WX0} ${WT + 60} L${WX1} ${WT + 60}" stroke="#7a6448" stroke-width="1" opacity=".5"/>`;
  const tower = (x, w, ht, fallen) => fallen ? `<path d="M${x} ${WALL} L${x} ${WT - 20} L${x + w * .3} ${WT - 34} L${x + w * .55} ${WT - 14} L${x + w} ${WT - 26} L${x + w} ${WALL} Z" fill="url(#k6tow)"/><g fill="#a88a6c">${[...Array(7)].map((_, i) => `<rect x="${f1(x + w + 4 + h(i, 631) * 50)}" y="${f1(WALL - 6 - h(i, 632) * 12)}" width="${f1(6 + h(i, 633) * 10)}" height="${f1(4 + h(i, 634) * 6)}" transform="rotate(${f1((h(i, 635) - .5) * 60)} ${f1(x + w + 10)} ${WALL - 6})"/>`).join('')}</g>`
    : `<rect x="${x}" y="${WT - ht}" width="${w}" height="${ht + WALL - WT}" fill="url(#k6tow)"/><path d="M${x - 4} ${WT - ht} ${[...Array(4)].map((_, i) => `L${x - 4 + i * (w + 8) / 4} ${WT - ht - 9} L${x - 4 + (i + .5) * (w + 8) / 4} ${WT - ht - 9} L${x - 4 + (i + .5) * (w + 8) / 4} ${WT - ht}`).join(' ')} L${x + w + 4} ${WT - ht} Z" fill="#b88a6c"/><rect x="${x + w / 2 - 3}" y="${WT - ht + 20}" width="6" height="12" fill="#2a120c"/>`;
  s += tower(450, 50, 70) + tower(640, 46, 56) + tower(1000, 48, 62) + tower(1226, 54, 80) + tower(760, 46, 0, true);
  s += `<path d="M${WX0} ${WALL} L${WX1} ${WALL}" stroke="#2a120c" stroke-width="5"/>`;
  /* the road to the breach, the barrows along it, the file on it */
  s += `<path d="M862 ${WALL} L894 ${WALL} L1180 ${H} L520 ${H} Z" fill="#7a4a2a" opacity=".55"/>`;
  let br = ''; for (let i = 0; i < 9; i++) { const t = Math.pow((i + 1) / 10, 1.6), y = WALL + 10 + t * (H - WALL - 30), w = 14 + t * 160; for (const sd of [-1, 1]) { const x = 878 + sd * (30 + t * 520);
    br += `<path d="M${f1(x - w)} ${f1(y)} Q${f1(x - w * .7)} ${f1(y - w * .3)} ${f1(x)} ${f1(y - w * .32)} Q${f1(x + w * .7)} ${f1(y - w * .3)} ${f1(x + w)} ${f1(y)} Z" fill="#2a140c"/><path d="M${f1(x - w * .7)} ${f1(y - w * .22)} Q${f1(x - w * .4)} ${f1(y - w * .31)} ${f1(x)} ${f1(y - w * .32)}" stroke="#e08a50" stroke-width="${f1(.8 + t * 1.4)}" fill="none" opacity=".3"/><rect x="${f1(x - 1 - t * 2)}" y="${f1(y - w * .32 - 4 - t * 30)}" width="${f1(2 + t * 4)}" height="${f1(4 + t * 30)}" fill="#1a0c08"/>`; } }
  s += br;
  let fl = ''; for (let i = 0; i < 40; i++) { const t = Math.pow(i / 40, 1.5), y = WALL + 6 + t * 150, x = 878 + (h(i, 641) - .5) * (6 + t * 70), k = .25 + t * .5; fl += TK.walker(x, y, k, i, '#140806', {spears:.5}); }
  s += `<g class="k6-wk">${fl}</g>`;
  /* the foreground: the spear and the finger bone on its thong; two of them beside it */
  s += `<path d="M560 ${H} Q800 800 1100 790 Q1400 782 1600 800 L1600 ${H} Z" fill="#0c0604"/>${TK.rim('M600 890 Q800 802 1100 792 Q1400 784 1600 802', '#ff9a5a', 1.6, .4)}`;
  s += `<path d="M1090 830 L1110 380" stroke="#2a1810" stroke-width="7" stroke-linecap="round"/><path d="M1111 340 L1118 384 L1102 382 Z" fill="#b8b0a0" stroke="#0a0504" stroke-width="1.4"/>${TK.rim('M1108 392 L1092 820', '#ffb070', 1.4, .45)}`;
  s += `<path d="M1101 400 L1110 402" stroke="#3a2418" stroke-width="5"/><g class="k6-sw"><path d="M1105 402 Q1100 420 1104 440" stroke="#4a3020" stroke-width="2" fill="none"/><g transform="translate(1104 450)"><rect x="-4" y="-10" width="8" height="24" rx="4" fill="#f0e6d0" stroke="#5a4428" stroke-width="1.4"/><circle cx="0" cy="-10" r="4.6" fill="#f0e6d0" stroke="#5a4428" stroke-width="1.4"/><circle cx="0" cy="14" r="4" fill="#f0e6d0" stroke="#5a4428" stroke-width="1.4"/></g></g>`;
  const B = {fill:'url(#k6body)', dark:'#120806', rim:'#ffa870', helmc:'#3a2620', packc:'#2a1810', roll:'#3a2416', ink:'#060202'};
  s += `<g transform="translate(1300 860) scale(.86)">${TK.back(Object.assign({}, B, {kit:'xbow', head:'helm', cloak:'#1c0e0a'}))}</g><g transform="translate(1450 880) scale(.94)">${TK.back(Object.assign({}, B, {kit:'shield', head:'wrap', helmc:'#5a3a26', shieldc:'#2a1610', shieldr:'#6a3a22', wide:1.1}))}</g>`;
  s += `</svg>`;
  ART['title/bh'] = s; ART_SIZE['title/bh'] = [W, H];

  /* the patch: the Third's (Book Four's) and the Fourth's (Book One's) side by side; the Fourth's with a finger bone under it */
  const inner = (k, x) => (ART[k] || '').replace(/^<svg /, `<svg x="${x}" y="0" width="290" height="330" `);
  ART['insignia/bh'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" role="img" aria-label="The two squads' patches, Book Six: the Third's and the Fourth's, each with a finger bone">
${inner('insignia/hoc', 0)}${inner('insignia/patch', 310)}
<g transform="translate(455 352) rotate(90)"><rect x="-6" y="-24" width="12" height="48" rx="6" fill="#efe4cc" stroke="#5a4a32" stroke-width="2"/><circle cx="0" cy="-24" r="7" fill="#efe4cc" stroke="#5a4a32" stroke-width="2"/><circle cx="0" cy="24" r="6" fill="#efe4cc" stroke="#5a4a32" stroke-width="2"/></g></svg>`;
}
/* Settings › Artwork off: the title's canvas backdrop borrows Book Four's desert until Book Six has its own */
{ const _stb = startTitleBackdrop; startTitleBackdrop = function(cv, b){ return _stb(cv, b === 'bh' ? 'hoc' : b); }; }
