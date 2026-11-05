/* ============ Book Six's title: Y'Ghatan at dusk, the bones in its walls, and smoke (v9.0, 100b) ============
   The painted title (ART 'title/bh', drawn by Claude for this game from a seeded generator): a smoke-red dusk over the Odhan; the walls of
   Y'Ghatan the colour of old bone, with the bones of the older cities in them, as the novel's epigraph has it ("the bones in the walls, the bones
   beneath the floor"); one tower down and a breach; smoke rising behind the walls; the barrows of the Empire's dead along the road in front; a
   file of soldiers on the road; and in the foreground a finger bone on a thong hanging from a spear, the Bonehunters' mark.
   The patch (ART 'insignia/bh'): the two squads' own patches side by side, the Third's (Book Four's, already with its finger bone) and the
   Fourth's with a finger bone stitched under the flame (series-patches.md; plan question 6).
   Motion: the .k6-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  const h = (i, s) => hash(i, s), f1 = n => Math.round(n * 10) / 10;
  const W = 1600, H = 900, WALL = 520; // the foot of the walls
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k6-smoke{animation:k6-smoke 14s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}.k6-ember{animation:k6-ember 2.4s ease-in-out infinite}
.k6-march{animation:k6-march 1.3s ease-in-out infinite}.k6-bone{animation:k6-bone 5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 0}
@keyframes k6-smoke{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-14px,-10px) scale(1.04)}}
@keyframes k6-ember{0%,100%{opacity:.35}50%{opacity:.9}}
@keyframes k6-march{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-1px)}}
@keyframes k6-bone{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
@media (prefers-reduced-motion:reduce){.k6-smoke,.k6-ember,.k6-march,.k6-bone{animation:none}}.reduce .k6-smoke,.reduce .k6-ember,.reduce .k6-march,.reduce .k6-bone{animation:none}</style>
<defs><linearGradient id="k6sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1014"/><stop offset=".45" stop-color="#5a2418"/><stop offset=".8" stop-color="#b0502a"/><stop offset="1" stop-color="#d88a4a"/></linearGradient>
<linearGradient id="k6wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8b08a"/><stop offset="1" stop-color="#7a6248"/></linearGradient>
<linearGradient id="k6ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4430"/><stop offset="1" stop-color="#1e1610"/></linearGradient>
<radialGradient id="k6glow" cx=".5" cy="1" r=".6"><stop offset="0" stop-color="#ff8a3a" stop-opacity=".55"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="url(#k6sky)"/>
<ellipse cx="860" cy="${WALL}" rx="620" ry="260" fill="url(#k6glow)"/>`;
  /* smoke behind the walls: three columns leaning west */
  [[640, 1.0], [880, 1.25], [1080, .9]].forEach(([x, k], i) => { let d = `M${x - 40} ${WALL - 60}`;
    for (let j = 0; j < 7; j++) { const y = WALL - 80 - j * 70 * k, w = 50 + j * 26; d += ` Q${f1(x - j * 34 - w)} ${f1(y - 20)} ${f1(x - j * 40)} ${f1(y - 60)}`; }
    s += `<path class="k6-smoke" style="animation-delay:-${i * 4}s" d="${d} L${x + 60} ${WALL - 60} Z" fill="#2a1a16" opacity="${.55 - i * .08}"/>`; });
  /* the walls: bone-coloured, a crenellated line, towers, one tower down and a breach */
  let wall = `M0 ${WALL - 120}`; for (let x = 0; x <= W; x += 40) { const hgt = WALL - 120 - (Math.floor(x / 40) % 2 ? 0 : 14); wall += ` L${x} ${hgt} L${x + 20} ${hgt}`; }
  s += `<path d="${wall} L${W} ${WALL} L0 ${WALL} Z" fill="url(#k6wall)"/>`;
  [180, 470, 1240, 1480].forEach((x, i) => s += `<rect x="${x - 50}" y="${WALL - 220 - (i % 2) * 30}" width="100" height="${220 + (i % 2) * 30}" fill="#b49a76"/><rect x="${x - 56}" y="${WALL - 232 - (i % 2) * 30}" width="112" height="16" fill="#8a7458"/>`);
  s += `<path d="M780 ${WALL - 120} L820 ${WALL - 40} L860 ${WALL - 70} L900 ${WALL - 20} L950 ${WALL - 90} L990 ${WALL - 120} L990 ${WALL} L780 ${WALL} Z" fill="#3a2a20"/>`; // the breach
  s += `<path d="M900 ${WALL - 30} l-60 12 l90 8 l-40 10 l70 -4 Z" fill="#9a8264"/>`; // tumbled stone
  /* the bones in the walls: skulls and long bones set in the courses, picked from a seed */
  for (let i = 0; i < 46; i++) { const x = 20 + h(i, 61) * (W - 40), y = WALL - 110 + h(i, 62) * 100; if (x > 770 && x < 1000) continue;
    if (h(i, 63) > .6) s += `<g opacity=".55"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="7" ry="8" fill="#e8dcc4"/><circle cx="${f1(x - 2.5)}" cy="${f1(y - 1)}" r="1.8" fill="#3a2a20"/><circle cx="${f1(x + 2.5)}" cy="${f1(y - 1)}" r="1.8" fill="#3a2a20"/></g>`;
    else s += `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(14 + h(i, 64) * 16)}" height="3.2" rx="1.6" fill="#ece0c8" opacity=".5" transform="rotate(${f1((h(i, 65) - .5) * 30)} ${f1(x)} ${f1(y)})"/>`; }
  /* embers in the breach */
  for (let i = 0; i < 14; i++) s += `<circle class="k6-ember" style="animation-delay:-${f1(h(i, 66) * 2.4)}s" cx="${f1(800 + h(i, 67) * 170)}" cy="${f1(WALL - 20 - h(i, 68) * 80)}" r="${f1(1.5 + h(i, 69) * 2)}" fill="#ffb060"/>`;
  /* the ground, the road and the barrows */
  s += `<rect y="${WALL}" width="${W}" height="${H - WALL}" fill="url(#k6ground)"/>`;
  s += `<path d="M880 ${WALL} L760 ${H} L1080 ${H} L920 ${WALL} Z" fill="#6a5238" opacity=".7"/>`;
  [[260, 640, 150], [470, 600, 110], [1260, 610, 130], [1440, 660, 170], [120, 740, 190], [1360, 780, 160]].forEach(([x, y, w]) =>
    s += `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${f1(w * .28)}" fill="#3e2e20"/><ellipse cx="${x}" cy="${f1(y - w * .06)}" rx="${f1(w * .8)}" ry="${f1(w * .18)}" fill="#4e3a28"/>`);
  /* a file of soldiers on the road, small, spears up */
  let col = ''; for (let i = 0; i < 16; i++) { const t = i / 16, x = 900 - t * 90 + (i % 2) * 6, y = WALL + 30 + t * 210, k = .5 + t * .9;
    col += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})"><rect x="-4" y="-22" width="8" height="18" fill="#1a120c"/><circle cx="0" cy="-26" r="4.5" fill="#1a120c"/><rect x="5" y="-40" width="1.6" height="36" fill="#1a120c"/><rect x="-4" y="-4" width="3" height="10" fill="#1a120c"/><rect x="1" y="-4" width="3" height="10" fill="#1a120c"/></g>`; }
  s += `<g class="k6-march">${col}</g>`;
  /* the foreground: a spear planted in the ground with a finger bone hanging from its thong */
  s += `<rect x="1300" y="380" width="8" height="${H - 380}" fill="#2a1c12"/><path d="M1296 384 L1304 330 L1312 384 Z" fill="#8a8a88"/>
<g class="k6-bone"><path d="M1304 420 L1290 500" stroke="#3a2a1a" stroke-width="2.5"/><g transform="translate(1290 500) rotate(-10)"><rect x="-6" y="0" width="12" height="44" rx="6" fill="#efe4cc"/><circle cx="0" cy="2" r="7" fill="#efe4cc"/><circle cx="0" cy="44" r="6" fill="#efe4cc"/><rect x="-1.2" y="8" width="2.4" height="30" fill="#c8b898" opacity=".6"/></g></g>`;
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
