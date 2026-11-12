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
  /* redrawn v13.2 from a seeded generator (019f's kit): night on the Lether coast; the transports burning at anchor all along the water, so
     there is no way back (rg-canon §2, W13: "burned the transports"); their smoke going up into the low cloud and the cloud lit from below;
     the fire doubled in the sea; a beach, and dunes with grass; the column walking up off the beach, away from the fire, into dark country;
     the nearest of them on the dune crest, black against the burning, none looking back; and on the sand in front a charred prow-timber. */
  const f1 = TK.f1, h = (i, s) => hash(i, s), W = 1600, H = 900, SEA = 470, SHORE = 600; // the horizon, and the waterline
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k7-flame{animation:k7-flame 1.1s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}.k7-ember{animation:k7-ember 3s linear infinite}
.k7-glint{animation:k7-glint 2.6s ease-in-out infinite}.k7-march{animation:k7-march 1.4s ease-in-out infinite}.k7-smoke{animation:k7-smoke 16s ease-in-out infinite}
@keyframes k7-flame{0%,100%{transform:scale(1,1)}50%{transform:scale(1.08,1.18)}}@keyframes k7-ember{0%{transform:translate(0,0);opacity:1}100%{transform:translate(30px,-120px);opacity:0}}
@keyframes k7-glint{0%,100%{opacity:.25}50%{opacity:.7}}@keyframes k7-march{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-.8px)}}@keyframes k7-smoke{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,-8px)}}
@media (prefers-reduced-motion:reduce){.k7-flame,.k7-ember,.k7-glint,.k7-march,.k7-smoke{animation:none}}.reduce .k7-flame,.reduce .k7-ember,.reduce .k7-glint,.reduce .k7-march,.reduce .k7-smoke{animation:none}</style>
<defs><linearGradient id="k7sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05040a"/><stop offset=".5" stop-color="#1a0e14"/><stop offset=".85" stop-color="#5a2416"/><stop offset="1" stop-color="#a04a1e"/></linearGradient>
<linearGradient id="k7sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a2a1a"/><stop offset=".4" stop-color="#2a1416"/><stop offset="1" stop-color="#0a080e"/></linearGradient>
<linearGradient id="k7sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4030"/><stop offset=".5" stop-color="#2a1a14"/><stop offset="1" stop-color="#0c0806"/></linearGradient>
<linearGradient id="k7fl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff0c0"/><stop offset=".3" stop-color="#ffb050"/><stop offset=".75" stop-color="#e05a1a"/><stop offset="1" stop-color="#a02a10" stop-opacity="0"/></linearGradient>
<radialGradient id="k7glow" cx=".5" cy=".6" r=".5"><stop offset="0" stop-color="#ff9a40" stop-opacity=".7"/><stop offset=".5" stop-color="#d0501a" stop-opacity=".2"/><stop offset="1" stop-color="#d0501a" stop-opacity="0"/></radialGradient>
<filter id="k7b20" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="20"/></filter><filter id="k7b4" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="4"/></filter></defs>
<rect width="${W}" height="${H}" fill="url(#k7sky)"/>`;
  /* the low cloud, lit from under by the fires */
  s += `<g filter="url(#k7b20)">${[...Array(12)].map((_, i) => `<ellipse cx="${f1(h(i, 701) * W)}" cy="${f1(150 + h(i, 702) * 200)}" rx="${f1(200 + h(i, 703) * 300)}" ry="${f1(26 + h(i, 704) * 40)}" fill="${h(i, 705) < .5 ? '#6a2a1a' : '#2a1418'}" opacity="${f1(.4 + h(i, 706) * .4)}"/>`).join('')}</g>`;
  /* the sea */
  s += `<rect y="${SEA}" width="${W}" height="${SHORE - SEA + 40}" fill="url(#k7sea)"/>`;
  /* the ships at anchor, burning; each with a glow, a hull, masts, flames, smoke, and its fire in the water */
  const ships = [[70, .5], [190, .62], [330, .78], [480, .95], [640, 1.15], [800, .9], [930, .72], [1060, .6], [1180, .52], [1300, .44], [1420, .4], [1530, .36]];
  let sm = '', gl = '', sh = '', rf = '';
  ships.forEach(([x, k], i) => { const y = SEA + 18 + k * 18, w = 70 * k;
    sm += TK.smoke(x, y - 80 * k, 240 + k * 120, 40 * k + 14, 50, '#1e1214', .3, 711 + i, 'k7b20');
    gl += `<ellipse cx="${x}" cy="${f1(y - 30 * k)}" rx="${f1(140 * k)}" ry="${f1(90 * k)}" fill="url(#k7glow)"/>`;
    rf += `<path d="M${f1(x - w * .5)} ${f1(y + 4)} L${f1(x + w * .5)} ${f1(y + 4)} L${f1(x + w * .3)} ${f1(y + 110 * k)} L${f1(x - w * .3)} ${f1(y + 110 * k)} Z" fill="#ff9040" opacity=".22" filter="url(#k7b4)"/>`;
    for (let j = 0; j < 8; j++) rf += `<path class="k7-glint" style="animation-delay:-${f1(h(i * 9 + j, 721) * 2.6)}s" d="M${f1(x - w * .4 + h(i * 9 + j, 722) * w * .8)} ${f1(y + 8 + j * 12 * k)} l${f1(10 + h(i * 9 + j, 723) * 20 * k)} 0" stroke="#ffc070" stroke-width="${f1(1 + k)}"/>`;
    sh += `<path d="M${f1(x - w)} ${f1(y - 14 * k)} Q${f1(x - w * .9)} ${f1(y)} ${f1(x - w * .6)} ${f1(y + 2)} L${f1(x + w * .7)} ${f1(y + 2)} Q${f1(x + w)} ${f1(y - 2)} ${f1(x + w * 1.08)} ${f1(y - 22 * k)} L${f1(x + w * .8)} ${f1(y - 12 * k)} L${f1(x - w * .8)} ${f1(y - 10 * k)} Z" fill="#0a0506"/>`;
    const m1 = i % 3 === 0 ? 70 : 118, m2 = i % 2 ? 46 : 92, lean1 = (h(i, 736) - .5) * 30, lean2 = (h(i, 737) - .5) * 40;
    sh += `<path d="M${f1(x - w * .2)} ${f1(y - 10 * k)} L${f1(x - w * .2 + lean1 * k)} ${f1(y - m1 * k)} M${f1(x + w * .35)} ${f1(y - 10 * k)} L${f1(x + w * .35 + lean2 * k)} ${f1(y - m2 * k)}" stroke="#0a0506" stroke-width="${f1(1.4 + 2 * k)}" stroke-linecap="round"/>`;
    sh += `<path d="M${f1(x - w * .2 + lean1 * k)} ${f1(y - m1 * k)} Q${f1(x + w * .2)} ${f1(y - m1 * k * .5)} ${f1(x + w * .9)} ${f1(y - 16 * k)} M${f1(x - w * .2 + lean1 * k * .8)} ${f1(y - m1 * k * .8)} Q${f1(x - w * .6)} ${f1(y - m1 * k * .4)} ${f1(x - w * .9)} ${f1(y - 12 * k)}" stroke="#0a0506" stroke-width="${f1(.6 + k * .6)}" fill="none" opacity=".8"/>`;
    sh += `<ellipse cx="${x}" cy="${f1(y - 16 * k)}" rx="${f1(w * .95)}" ry="${f1(18 * k)}" fill="#ffb050" opacity=".55" filter="url(#k7b4)"/>`;
    for (let j = 0; j < 7; j++) { const fx = x - w * .75 + j * w * .25 + (h(i * 9 + j, 731) - .5) * 10 * k, fh = (30 + h(i * 9 + j, 732) * 80 * (j > 1 && j < 5 ? 1.3 : .8)) * k, fw = (9 + h(i * 9 + j, 733) * 9) * k, sw = (h(i * 9 + j, 735) - .3) * fw * 1.6, b = y - 8 * k;
      sh += `<path class="k7-flame" style="animation-delay:-${f1(h(i * 9 + j, 734) * 1.1)}s" d="M${f1(fx - fw)} ${f1(b)} C${f1(fx - fw)} ${f1(b - fh * .4)} ${f1(fx - fw * .1)} ${f1(b - fh * .55)} ${f1(fx + sw)} ${f1(b - fh)} C${f1(fx + fw * .4)} ${f1(b - fh * .6)} ${f1(fx + fw * 1.1)} ${f1(b - fh * .35)} ${f1(fx + fw)} ${f1(b)} Z" fill="url(#k7fl)"/>`; }
    for (let j = 0; j < 4; j++) sh += `<circle class="k7-ember" style="animation-delay:-${f1(h(i * 5 + j, 741) * 3)}s" cx="${f1(x + (h(i * 5 + j, 742) - .5) * w)}" cy="${f1(y - 60 * k)}" r="${f1(1 + k)}" fill="#ffd080"/>`; });
  s += `<g class="k7-smoke">${sm}</g>${gl}${rf}${sh}`;
  /* the shore: a lit line of surf, the wet sand, the beach, the dunes */
  s += `<path d="M0 ${SHORE} Q400 ${SHORE - 14} 800 ${SHORE - 4} Q1200 ${SHORE + 6} ${W} ${SHORE - 10} L${W} ${H} L0 ${H} Z" fill="url(#k7sand)"/>`;
  s += `<path d="M0 ${SHORE} Q400 ${SHORE - 14} 800 ${SHORE - 4} Q1200 ${SHORE + 6} ${W} ${SHORE - 10}" stroke="#ffb070" stroke-width="2" fill="none" opacity=".45"/>`;
  s += `<path d="M0 ${SHORE + 50} Q300 ${SHORE + 20} 560 ${SHORE + 40} Q900 ${SHORE + 10} 1200 ${SHORE + 30} Q1420 ${SHORE + 14} ${W} ${SHORE + 30} L${W} ${H} L0 ${H} Z" fill="#1c100c"/>`;
  s += `<path d="M860 ${H} Q1000 740 1200 724 Q1420 712 ${W} 730 L${W} ${H} Z" fill="#0a0605"/>${TK.rim('M900 880 Q1020 744 1200 726 Q1420 714 1600 732', '#ff9a50', 1.8, .5)}`;
  let gr = ''; for (let i = 0; i < 120; i++) { const x = 920 + h(i, 751) * 680, y = 732 + h(i, 752) * 20 + (x < 1200 ? (1200 - x) * .48 : 0), l = 10 + h(i, 753) * 26; if (y > 900) continue; gr += `M${f1(x)} ${f1(y)} q${f1((h(i, 754) - .5) * 8)} ${f1(-l * .5)} ${f1((h(i, 754) - .3) * 14)} ${f1(-l)}`; }
  s += `<path d="${gr}" stroke="#140a06" stroke-width="1.4" fill="none"/><path d="${gr}" stroke="#ff9a50" stroke-width=".5" fill="none" opacity=".25" transform="translate(-1 0)"/>`;
  /* the column walking up off the beach toward the dunes, away from the fire */
  let col = ''; for (let i = 0; i < 44; i++) { const t = i / 44, x = 420 + t * 640 + (h(i, 761) - .5) * 30, y = SHORE + 40 + t * 90 - Math.pow(t, 3) * 30 + Math.sin(t * 9) * 8 + (h(i, 762) - .5) * 10, k = .4 + t * .6; col += TK.walker(x, y, k, i, '#080404', {spears:.5, lean:1}); }
  s += `<g class="k7-march">${col}</g>`;
  /* the nearest of them on the crest, black against the burning */
  const B = {fill:'#0a0505', dark:'#070303', rim:'#ff9a50', helmc:'#0e0807', packc:'#0c0606', roll:'#0e0807', ink:'#040202', walk:1};
  s += `<g transform="translate(1290 742) scale(.8)">${TK.back(Object.assign({}, B, {kit:'spear', head:'helm', cloak:'#0c0606', pack:false}))}</g><g transform="translate(1440 760) scale(.9)">${TK.back(Object.assign({}, B, {kit:'none', head:'cap', pack:false, wide:1.1, flip:true}))}</g>`;
  /* the charred prow-timber on the sand */
  s += `<path d="M640 860 Q700 820 790 800 Q860 784 900 740 Q910 728 918 740 Q910 780 870 810 Q790 846 660 878 Z" fill="#100806" stroke="#040202" stroke-width="2"/>${TK.rim('M660 856 Q720 822 790 804 Q856 788 896 744', '#ff8a40', 2, .55)}<circle class="k7-glint" cx="880" cy="776" r="2.4" fill="#ff8a40"/><circle class="k7-glint" style="animation-delay:-1s" cx="820" cy="802" r="2" fill="#ff8a40"/>`;
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
