/* ============ Book Seven's title: the burned ships, and the column going inland (v10.0, 120b) ============
   The painted title (ART 'title/rg', drawn by Claude for this game from a seeded generator): night on the Lether coast; the transports burning
   at anchor all along the water, so there is no way back (rg-canon §2, W13: "burned the transports"); their light on the sea and the low
   cloud; a beach, and dunes; a file of soldiers walking up from the beach, away from the fire, into dark country; and in the foreground a
   charred prow-timber on the sand. Nobody on the beach looks back, which is the point of the word on it: unwitnessed.
   The patch (ART 'insignia/rg'): the two squads' own patches side by side (series-patches.md; plan question 6): the Third's (Book Six's, the
   finger bone already under it) with a burned ship's prow stitched across the foot; the Sixth Company's (Book Five's) with the Edur's mark
   struck through.
   Motion: the .k7-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  const h = (i, s) => hash(i, s), f1 = n => Math.round(n * 10) / 10;
  const W = 1600, H = 900, SEA = 470, SHORE = 600; // the horizon, and the waterline
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k7-flame{animation:k7-flame 1.1s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}.k7-ember{animation:k7-ember 3s linear infinite}
.k7-glint{animation:k7-glint 2.6s ease-in-out infinite}.k7-march{animation:k7-march 1.4s ease-in-out infinite}.k7-smoke{animation:k7-smoke 16s ease-in-out infinite}
@keyframes k7-flame{0%,100%{transform:scale(1,1)}50%{transform:scale(1.08,1.18)}}
@keyframes k7-ember{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}100%{transform:translate(-30px,-160px);opacity:0}}
@keyframes k7-glint{0%,100%{opacity:.25}50%{opacity:.8}}
@keyframes k7-march{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-1px)}}
@keyframes k7-smoke{0%,100%{transform:translate(0,0)}50%{transform:translate(-24px,-6px)}}
@media (prefers-reduced-motion:reduce){.k7-flame,.k7-ember,.k7-glint,.k7-march,.k7-smoke{animation:none}}.reduce .k7-flame,.reduce .k7-ember,.reduce .k7-glint,.reduce .k7-march,.reduce .k7-smoke{animation:none}</style>
<defs><linearGradient id="k7sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05070e"/><stop offset=".55" stop-color="#1a1420"/><stop offset=".86" stop-color="#5a2a1c"/><stop offset="1" stop-color="#a04a22"/></linearGradient>
<linearGradient id="k7sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1a18"/><stop offset="1" stop-color="#0a0c12"/></linearGradient>
<linearGradient id="k7sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a2c"/><stop offset="1" stop-color="#14100c"/></linearGradient>
<radialGradient id="k7glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff9a40" stop-opacity=".7"/><stop offset="1" stop-color="#ff6a20" stop-opacity="0"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="url(#k7sky)"/>`;
  /* stars, thin, where the smoke has not reached */
  for (let i = 0; i < 70; i++) { const x = h(i, 71) * W, y = h(i, 72) * SEA * .55; s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(.6 + h(i, 73) * 1.1)}" fill="#e8e4f0" opacity="${f1(.2 + h(i, 74) * .5)}"/>`; }
  /* the smoke of the fleet, lying west along the coast under the cloud */
  for (let i = 0; i < 5; i++) { const y = 150 + i * 46, w = 1400 - i * 120; s += `<ellipse class="k7-smoke" style="animation-delay:-${i * 3}s" cx="${700 + i * 40}" cy="${y}" rx="${w / 2}" ry="${34 + i * 6}" fill="#2a1814" opacity="${f1(.35 - i * .04)}"/>`; }
  /* the sea, with the light of the fires on it */
  s += `<rect y="${SEA}" width="${W}" height="${SHORE - SEA + 40}" fill="url(#k7sea)"/>`;
  /* the transports burning at anchor, a long line of them, smaller further off */
  const ships = []; for (let i = 0; i < 11; i++) { const t = i / 10, x = 120 + t * 1360 + (h(i, 75) - .5) * 60, k = .55 + h(i, 76) * .6; ships.push([x, k]); }
  ships.forEach(([x, k], i) => { const y = SEA + 18 + k * 14, hw = 60 * k, mast = 110 * k;
    s += `<ellipse cx="${f1(x)}" cy="${f1(y - mast * .4)}" rx="${f1(hw * 2.4)}" ry="${f1(mast * .9)}" fill="url(#k7glow)"/>`;
    s += `<path d="M${f1(x - hw)} ${f1(y - 10 * k)} L${f1(x + hw)} ${f1(y - 10 * k)} L${f1(x + hw * .8)} ${f1(y + 6 * k)} L${f1(x - hw * .8)} ${f1(y + 6 * k)} Z" fill="#120a08"/>`;
    s += `<rect x="${f1(x - 2 * k)}" y="${f1(y - mast)}" width="${f1(4 * k)}" height="${f1(mast)}" fill="#160c0a"/><rect x="${f1(x - hw * .5)}" y="${f1(y - mast * .78)}" width="${f1(hw)}" height="${f1(3 * k)}" fill="#160c0a" transform="rotate(${f1((h(i, 77) - .5) * 20)} ${f1(x)} ${f1(y - mast * .78)})"/>`;
    for (let j = 0; j < 3; j++) { const fx = x + (j - 1) * hw * .5, fh = (40 + h(i * 3 + j, 78) * 50) * k;
      s += `<path class="k7-flame" style="animation-delay:-${f1(h(i * 3 + j, 79) * 1.1)}s" d="M${f1(fx - 12 * k)} ${f1(y - 8 * k)} Q${f1(fx - 10 * k)} ${f1(y - fh * .6)} ${f1(fx)} ${f1(y - fh)} Q${f1(fx + 10 * k)} ${f1(y - fh * .6)} ${f1(fx + 12 * k)} ${f1(y - 8 * k)} Z" fill="${j === 1 ? '#ffd080' : '#ff8a30'}" opacity=".9"/>`; }
    for (let j = 0; j < 6; j++) { const ry = SEA + 34 + j * 14, rw = (30 - j * 3) * k; s += `<rect class="k7-glint" style="animation-delay:-${f1(h(i * 6 + j, 80) * 2.6)}s" x="${f1(x - rw / 2 + (h(i * 6 + j, 81) - .5) * 20)}" y="${f1(ry)}" width="${f1(rw)}" height="2" fill="#ffb060" opacity=".5"/>`; } });
  /* embers going up off the fleet */
  for (let i = 0; i < 26; i++) { const [x] = ships[i % ships.length]; s += `<circle class="k7-ember" style="animation-delay:-${f1(h(i, 82) * 3)}s" cx="${f1(x + (h(i, 83) - .5) * 60)}" cy="${f1(SEA - 20 - h(i, 84) * 40)}" r="${f1(1.2 + h(i, 85) * 1.6)}" fill="#ffc070"/>`; }
  /* the beach and the dunes, rising to the right, inland */
  s += `<path d="M0 ${SHORE} Q400 ${SHORE - 14} 800 ${SHORE + 4} T${W} ${SHORE - 30} L${W} ${H} L0 ${H} Z" fill="url(#k7sand)"/>`;
  s += `<path d="M0 ${SHORE} Q400 ${SHORE - 14} 800 ${SHORE + 4} T${W} ${SHORE - 30}" stroke="#ff9a50" stroke-width="2" fill="none" opacity=".35"/>`;
  s += `<path d="M760 ${H} Q900 700 1080 640 Q1260 590 1600 520 L1600 ${H} Z" fill="#1c140e"/><path d="M1000 ${H} Q1150 760 1320 690 Q1460 640 1600 610 L1600 ${H} Z" fill="#120d09"/>`;
  /* the column going up from the beach into the dark, small, spears up, nobody looking back */
  let col = ''; for (let i = 0; i < 18; i++) { const t = i / 17, x = 640 + t * 820, y = SHORE + 50 - t * 120 + Math.sin(t * 6) * 8, k = 1.1 - t * .6;
    col += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})"><rect x="-4" y="-22" width="8" height="18" fill="#0a0806"/><circle cx="0" cy="-26" r="4.5" fill="#0a0806"/><rect x="-6" y="-20" width="5" height="12" fill="#0a0806"/><rect x="5" y="-42" width="1.6" height="38" fill="#0a0806"/><rect x="-4" y="-4" width="3" height="10" fill="#0a0806"/><rect x="1" y="-4" width="3" height="10" fill="#0a0806"/></g>`; }
  s += `<g class="k7-march">${col}</g>`;
  /* the foreground: a charred prow-timber half in the sand, its carved head burned away */
  s += `<g transform="translate(260 790) rotate(-14)"><path d="M-160 20 Q-40 -10 80 -40 Q130 -60 150 -110 Q160 -130 170 -120 Q168 -80 120 -20 Q60 30 -150 46 Z" fill="#1a0f0a"/>
<path d="M-120 22 Q0 0 100 -30" stroke="#ff7a30" stroke-width="2" fill="none" opacity=".45"/><path d="M140 -100 Q150 -112 158 -114" stroke="#ff9a40" stroke-width="3" fill="none" opacity=".6" class="k7-glint"/></g>`;
  s += `</svg>`;
  ART['title/rg'] = s; ART_SIZE['title/rg'] = [W, H];

  /* the patch: the Third's (Book Six's, insignia/hoc with its finger bone) with a burned prow across the foot; the Sixth Company's (insignia/mt) with the Edur's mark struck through */
  const inner = (k, x) => (ART[k] || '').replace(/^<svg /, `<svg x="${x}" y="0" width="290" height="330" `);
  ART['insignia/rg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" role="img" aria-label="The two squads' patches, Book Seven: the Third's with a burned ship's prow, and the Sixth Company's with the Edur's mark struck through">
${inner('insignia/hoc', 0)}${inner('insignia/mt', 310)}
<g transform="translate(145 350)"><path d="M-70 8 Q-20 -2 30 -10 Q52 -16 60 -34 Q66 -40 70 -34 Q66 -14 44 0 Q10 16 -66 18 Z" fill="#2a1a12" stroke="#ff8a3a" stroke-width="2"/><path d="M52 -30 l6 -8 l4 6" stroke="#ffb060" stroke-width="2" fill="none"/></g>
<g transform="translate(455 352)"><path d="M0 -18 L14 0 L0 18 L-14 0 Z" fill="#6a6e78" stroke="#2a2c32" stroke-width="2"/><path d="M-8 0 L8 0" stroke="#2a2c32" stroke-width="2"/><path d="M-22 16 L22 -16" stroke="#b02a22" stroke-width="5" stroke-linecap="round"/></g></svg>`;
}
/* Settings › Artwork off: the title's canvas backdrop borrows Book Five's Lether until Book Seven has its own */
{ const _stb = startTitleBackdrop; startTitleBackdrop = function(cv, b){ return _stb(cv, b === 'rg' ? 'mt' : b); }; }
