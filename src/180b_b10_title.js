/* ============ Book Ten's title: the Glass Desert by night, and two who stay awake (v13.0, 180b) ============
   The painted title (ART 'title/tcg', drawn by Claude for this game from a seeded generator): night in the Glass Desert. A sky crowded with
   stars over a plain of glass that throws them back, so the stars are above and below; low ridges of glass catching the light in long thin
   glints. Far off, the army as a thin dark line walking east without a lamp, a few wagons in it with no beasts in the traces. In the
   foreground, on their packs, two soldiers sitting back to back, awake, each looking out a different way: one a Malazan heavy in scale with
   a big sword across the knees, one a Letherii with a spear upright and a round padded cap. Between them on the glass, an empty water-skin
   laid flat. Nobody sleeps; somebody has to see it. Nothing in the sky is named or explained (rules 98, 107).
   The patch (ART 'insignia/tcg'): the two squads' own patches side by side, as Books Seven and Nine (Book Nine's rule: two 290-wide inner
   patches in a 600-wide SVG, so 029's tpatch2 rule shows them at single size): the Third's (Book Four's lozenge) with a shard of glass
   stitched under it in pale thread; the Sixth Company's (Book Five's coin) with a small ship under sail.
   Motion: the .k10-* rules inside the SVG; prefers-reduced-motion and .reduce hold it still. */
{
  const h = (i, s) => hash(i, s), f1 = n => Math.round(n * 10) / 10;
  const W = 1600, H = 900, HZ = 520; // the horizon
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
<style>.k10-tw{animation:k10-tw 5s ease-in-out infinite}.k10-gl{animation:k10-gl 7s ease-in-out infinite}.k10-march{animation:k10-march 2.4s ease-in-out infinite}
.k10-br{animation:k10-br 6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
@keyframes k10-tw{0%,100%{opacity:.35}50%{opacity:1}}
@keyframes k10-gl{0%,100%{opacity:0}45%{opacity:0}55%{opacity:.9}65%{opacity:0}}
@keyframes k10-march{0%,100%{transform:translate(0,0)}50%{transform:translate(0,-.8px)}}
@keyframes k10-br{0%,100%{transform:scale(1,1)}50%{transform:scale(1,1.008)}}
@media (prefers-reduced-motion:reduce){.k10-tw,.k10-gl,.k10-march,.k10-br{animation:none}}.reduce .k10-tw,.reduce .k10-gl,.reduce .k10-march,.reduce .k10-br{animation:none}</style>
<defs><linearGradient id="k10sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05070f"/><stop offset=".55" stop-color="#0d1426"/><stop offset=".92" stop-color="#1c2a40"/><stop offset="1" stop-color="#2a3a52"/></linearGradient>
<linearGradient id="k10glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4c62"/><stop offset=".25" stop-color="#1e2a3a"/><stop offset="1" stop-color="#070a10"/></linearGradient>
<radialGradient id="k10band" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#c8d4f0" stop-opacity=".16"/><stop offset="1" stop-color="#c8d4f0" stop-opacity="0"/></radialGradient>
<linearGradient id="k10scale" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a96a8"/><stop offset=".4" stop-color="#4a5262"/><stop offset="1" stop-color="#161a22"/></linearGradient>
<linearGradient id="k10coat" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1a2230"/><stop offset=".6" stop-color="#2e3a50"/><stop offset="1" stop-color="#5a6a84"/></linearGradient>
<linearGradient id="k10pack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4438"/><stop offset="1" stop-color="#14120e"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#k10sky)"/>`;
  /* the band of the sky, a faint river of light slanting across */
  s += `<ellipse cx="900" cy="230" rx="900" ry="120" fill="url(#k10band)" transform="rotate(-14 900 230)"/>`;
  /* the stars: many, small, a few that twinkle */
  let st = ''; for (let i = 0; i < 300; i++) { const x = h(i, 11) * W, y = Math.pow(h(i, 12), 1.15) * (HZ - 10), r = .4 + Math.pow(h(i, 13), 3) * 1.8, op = .35 + h(i, 14) * .6;
    st += i % 9 === 0 ? `<circle class="k10-tw" style="animation-delay:-${f1(h(i, 15) * 5)}s" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r + .3)}" fill="#e8eeff"/>` : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#dfe6f8" opacity="${f1(op)}"/>`; }
  s += st;
  /* the glass plain, to the horizon */
  s += `<rect y="${HZ}" width="${W}" height="${H - HZ}" fill="url(#k10glass)"/>`;
  s += `<path d="M0 ${HZ} L${W} ${HZ}" stroke="#9ab0d0" stroke-width="1.4" opacity=".4"/>`;
  /* the stars again, below: thrown back by the glass, smeared and broken into facets */
  let rf = ''; for (let i = 0; i < 170; i++) { const x = h(i, 21) * W, d = Math.pow(h(i, 22), 1.4), y = HZ + 6 + d * (H - HZ - 30), w = 1 + d * 6, op = (1 - d) * .55 + .08;
    rf += `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(.6 + d * 1.4)}" fill="#cfdcf4" opacity="${f1(op)}" transform="rotate(${f1((h(i, 23) - .5) * 30)} ${f1(x)} ${f1(y)})"/>`; }
  s += rf;
  /* facets: thin bright edges of the glass, and long ridges going away */
  let fc = ''; for (let i = 0; i < 70; i++) { const d = Math.pow(h(i, 31), 1.2), y = HZ + 14 + d * (H - HZ - 40), x = h(i, 32) * W, L = 20 + d * 140;
    fc += `<path d="M${f1(x)} ${f1(y)} l${f1(L * .5)} ${f1(-2 - d * 6)} l${f1(L * .5)} ${f1(3 + d * 5)}" stroke="#b8cce8" stroke-width="${f1(.5 + d * 1.4)}" fill="none" opacity="${f1(.12 + (1 - d) * .2)}"/>`; }
  s += fc;
  for (let i = 0; i < 5; i++) { const y = HZ + 30 + i * 55 + h(i, 41) * 20; s += `<path d="M0 ${f1(y + 20)} Q${f1(400 + h(i, 42) * 300)} ${f1(y - 8)} ${f1(900 + h(i, 43) * 300)} ${f1(y + 6)} T${W} ${f1(y - 4)}" stroke="#7e94b4" stroke-width="${f1(1 + i * .5)}" fill="none" opacity="${f1(.18 + i * .03)}"/>`; }
  /* the glints that come and go */
  for (let i = 0; i < 26; i++) { const d = h(i, 51), x = h(i, 52) * W, y = HZ + 20 + d * (H - HZ - 60), r = 2 + d * 5;
    s += `<g class="k10-gl" style="animation-delay:-${f1(h(i, 53) * 7)}s"><path d="M${f1(x - r)} ${f1(y)} L${f1(x + r)} ${f1(y)} M${f1(x)} ${f1(y - r)} L${f1(x)} ${f1(y + r)}" stroke="#f0f6ff" stroke-width="1"/></g>`; }
  /* the army: a thin dark line walking away east to the horizon, no lamps, wagons with heavies in the traces */
  let col = ''; for (let i = 0; i < 60; i++) { const t = i / 59, x = 380 + t * 760 + Math.sin(t * 6) * 22, y = 640 - Math.pow(t, .55) * 118, k = 1 - t * .82, op = .95 - t * .5, wag = i % 9 === 4;
    col += wag ? `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})" opacity="${f1(op)}"><rect x="-14" y="-18" width="28" height="12" fill="#06080c"/><path d="M-14 -18 Q0 -32 14 -18" fill="#1a2232"/><circle cx="-9" cy="-4" r="4.4" fill="#06080c"/><circle cx="9" cy="-4" r="4.4" fill="#06080c"/>${[-22, -28].map(dx => `<g transform="translate(${dx} 0)"><rect x="-2.4" y="-16" width="4.8" height="12" fill="#06080c"/><circle cx="0" cy="-18.6" r="2.8" fill="#06080c"/><rect x="-2.4" y="-4" width="1.8" height="6" fill="#06080c"/><rect x=".6" y="-4" width="1.8" height="6" fill="#06080c"/></g>`).join('')}<path d="M-30 -10 L-14 -10" stroke="#06080c" stroke-width="1.4"/></g>`
      : `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k)})" opacity="${f1(op)}">${[-7, 0, 7].map(dx => `<g transform="translate(${dx} 0)"><rect x="-2.6" y="-18" width="5.2" height="14" fill="#06080c"/><circle cx="0" cy="-21" r="3.2" fill="#06080c"/><rect x="-2.6" y="-4" width="2" height="7" fill="#06080c"/><rect x=".6" y="-4" width="2" height="7" fill="#06080c"/>${dx === 7 ? '<rect x="2.6" y="-34" width="1" height="30" fill="#06080c"/>' : ''}</g>`).join('')}</g>`; }
  s += `<g class="k10-march">${col}</g>`;
  /* the column's faint reflection on the glass */
  s += `<path d="M380 652 Q760 630 1140 532" stroke="#0a0e16" stroke-width="10" fill="none" opacity=".35"/>`;
  /* the foreground: a low swell of darker glass the two sit on */
  s += `<path d="M0 ${H} L0 818 Q360 772 760 790 Q1120 806 1600 770 L1600 ${H} Z" fill="#05070b" opacity=".9"/>`;
  s += `<path d="M0 818 Q360 772 760 790 Q1120 806 1600 770" stroke="#7e94b4" stroke-width="1.6" fill="none" opacity=".35"/>`;
  /* the two, back to back, on their packs; starlight rimming their upper edges from the left */
  s += `<g class="k10-br"><g transform="translate(800 826) scale(1.45)">
<!-- the packs they sit on -->
<rect x="-118" y="-30" width="104" height="44" rx="10" fill="url(#k10pack)" stroke="#05060a" stroke-width="3"/>
<rect x="14" y="-28" width="100" height="42" rx="10" fill="url(#k10pack)" stroke="#05060a" stroke-width="3"/>
<!-- the heavy, on the left, facing left: scale, a helm, the big sword across the knees -->
<path d="M-130 -10 Q-170 -6 -196 6 L-196 18 Q-160 12 -120 12 Z" fill="#1a1e26"/><path d="M-190 6 L-200 16 L-176 18 Z" fill="#0a0c10"/>
<path d="M-104 -34 Q-110 -110 -96 -150 Q-80 -176 -52 -176 Q-26 -172 -18 -146 Q-8 -100 -14 -34 Z" fill="url(#k10scale)" stroke="#05060a" stroke-width="3"/>
${[...Array(7)].map((_, i) => `<path d="M-98 ${-150 + i * 17} Q-58 ${-142 + i * 17} -20 ${-150 + i * 17}" stroke="#0e1016" stroke-width="2" fill="none" opacity=".55"/>`).join('')}
<path d="M-100 -150 Q-120 -120 -132 -84 Q-136 -64 -150 -50 L-140 -40 Q-118 -60 -110 -90 Z" fill="#3a4250"/>
<path d="M-228 -36 L-60 -48" stroke="#aab4c4" stroke-width="7" stroke-linecap="round"/><path d="M-228 -36 L-60 -48" stroke="#5a6272" stroke-width="2.4"/><rect x="-66" y="-60" width="8" height="26" rx="2" fill="#3a3024" transform="rotate(-4 -62 -47)"/><path d="M-58 -46 L-30 -48" stroke="#2a2018" stroke-width="7" stroke-linecap="round"/>
<ellipse cx="-58" cy="-196" rx="22" ry="24" fill="#2a2420"/>
<path d="M-84 -196 Q-84 -236 -56 -238 Q-30 -236 -30 -198 Z" fill="#6a7486"/><path d="M-88 -198 L-26 -198" stroke="#3a4250" stroke-width="5"/><path d="M-82 -194 L-90 -170 L-80 -168 Z" fill="#4a5262"/>
<path d="M-84 -232 Q-70 -240 -50 -238" stroke="#d8e2f4" stroke-width="2" fill="none" opacity=".55"/><path d="M-104 -148 Q-104 -170 -86 -176" stroke="#d8e2f4" stroke-width="2" fill="none" opacity=".45"/>
<!-- the Letherii, on the right, facing right: a dark coat, a round padded cap, the spear upright -->
<path d="M120 -10 Q160 -4 186 8 L186 20 Q150 14 112 12 Z" fill="#141a24"/><path d="M180 8 L192 18 L168 20 Z" fill="#0a0c10"/>
<path d="M20 -34 Q12 -104 24 -142 Q38 -166 62 -166 Q86 -162 94 -138 Q104 -96 98 -34 Z" fill="url(#k10coat)" stroke="#05060a" stroke-width="3"/>
<path d="M58 -160 L60 -40" stroke="#0e1420" stroke-width="2" opacity=".6"/>
<path d="M92 -140 Q112 -110 118 -80 Q124 -60 136 -52" stroke="#2e3a50" stroke-width="16" stroke-linecap="round" fill="none"/>
<path d="M140 -380 L140 14" stroke="#4a3a2a" stroke-width="5"/><path d="M140 -404 L148 -380 L132 -380 Z" fill="#aab4c4"/><ellipse cx="140" cy="-54" rx="9" ry="7" fill="#3a2e24"/>
<ellipse cx="60" cy="-186" rx="20" ry="22" fill="#2a2420"/>
<path d="M36 -192 Q36 -220 60 -222 Q84 -220 84 -192 Q72 -196 60 -196 Q48 -196 36 -192 Z" fill="#3a4050"/><path d="M38 -194 Q60 -200 82 -194" stroke="#1a1e28" stroke-width="3" fill="none"/>
<path d="M40 -214 Q52 -224 66 -222" stroke="#d8e2f4" stroke-width="2" fill="none" opacity=".5"/>
<!-- between them on the glass: an empty water-skin, laid flat -->
<path d="M-26 6 Q-10 -4 10 -2 Q30 2 26 12 Q8 18 -14 16 Q-30 14 -26 6 Z" fill="#4a3a28" stroke="#05060a" stroke-width="2"/><path d="M22 2 L34 -6" stroke="#4a3a28" stroke-width="4" stroke-linecap="round"/>
</g></g>`;
  s += `</svg>`;
  ART['title/tcg'] = s; ART_SIZE['title/tcg'] = [W, H];

  /* the patch (Book Nine's rule: two inner patches side by side in a 600-wide SVG): the Third's (insignia/hoc) with a shard of glass stitched
     under it; the Sixth Company's (insignia/mt) with a small ship under sail */
  const inner = (k, x) => (ART[k] || '').replace(/^<svg /, `<svg x="${x}" y="0" width="290" height="330" `);
  ART['insignia/tcg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" role="img" aria-label="The two squads' patches, Book Ten: the Third's with a shard of glass stitched under it, and the Sixth Company's with a small ship under sail">
${inner('insignia/hoc', 0)}${inner('insignia/mt', 310)}
<g transform="translate(145 352)"><path d="M-14 12 L-4 -20 L6 -8 L16 14 Z" fill="#9ab8d4" fill-opacity=".55" stroke="#e8f2ff" stroke-width="1.8" stroke-dasharray="4 3"/><path d="M-4 -20 L-2 10" stroke="#e8f2ff" stroke-width="1" opacity=".7"/><path d="M-30 16 L30 16" stroke="#e0c890" stroke-width="1.6" stroke-dasharray="3 3"/></g>
<g transform="translate(455 352)"><path d="M-20 6 L20 6 L14 16 L-14 16 Z" fill="#5a4630" stroke="#e0c890" stroke-width="1.6"/><path d="M0 6 L0 -24" stroke="#e0c890" stroke-width="1.8"/><path d="M2 -22 L18 2 L2 2 Z" fill="#d8ccb0" stroke="#4a3a24" stroke-width="1.2"/><path d="M-2 -18 L-14 2 L-2 2 Z" fill="#c8bca0" stroke="#4a3a24" stroke-width="1.2"/><path d="M-30 20 Q-15 16 0 20 Q15 24 30 20" stroke="#8ab0c8" stroke-width="1.6" fill="none" stroke-dasharray="3 3"/></g></svg>`;
}
/* Settings › Artwork off: the title's canvas backdrop borrows Book Four's desert until Book Ten has its own */
{ const _stb = startTitleBackdrop; startTitleBackdrop = function(cv, b){ return _stb(cv, b === 'tcg' ? 'hoc' : b); }; }

/* ---------------- the busts (the bust rules: each its own neckline by kit, a short natural neck, the garment blending up into the
   shoulders, every prop held, slung or belted). Lantern low left, a rim of the soldier's own colour on the right. ---------------- */
/* Pruss: twenty-four, a carter's son and a heavy; broad, young, cropped hair, a scar through the left brow; a heavy's scale patched with a
   different set of plates on the right shoulder; a leather trace-strap across the chest from the haul; his old sergeant's helm slung at the back */
POR.pruss = function(ctx){ const F = {cy:-74, w:13.4, h:19.8, jaw:.92, chin:5.4, skin:'#b8906c', iris:'#3a3024', lip:'#8a5a46', browCol:'#4a3a2a', browW:2, arch:.25, browL:.1, browR:.2, rim:'#8a7a62', rimA:.22, nose:1.4, look:-.1, smileL:.05, smileR:-.05, mouthW:4, age:.05, bags:.2, open:.84};
  ctx.save(); ctx.beginPath(); ctx.ellipse(-34, -42, 11, 8, -.5, Math.PI, 0); ctx.closePath(); ctx.fillStyle = PR.lit(ctx, '#7a8090', '#1e2026', -44, -24); ctx.fill(); ctx.restore(); // the old sergeant's helm, slung behind the shoulder
  PR.neck(ctx, F, 10);
  const B = BP.body(ctx, F, {wide:44, drop:2, trap:7, nx:12, ny:F.cy + 15.2, cb:F.cy + 20.8, c1:'#7e7666', c2:'#22201a'});
  ctx.save(); B.path(); ctx.clip(); BP.scales(ctx, -48, 48, -60, 4, 5.6, '#7a7464', 177); BP.scales(ctx, 18, 48, -52, 4, 5, '#6a6a72', 179); // the patched plates
    PR.stroke(ctx, '#3a2818', 5, () => { ctx.moveTo(-34, -40); ctx.lineTo(30, 12); }); PR.stroke(ctx, 'rgba(255,220,180,.18)', 1, () => { ctx.moveTo(-34, -42); ctx.lineTo(30, 10); }); // the trace-strap
    PR.soft(ctx, 22, -16, 18, 20, '#000000', .45); ctx.restore();
  BP.light(ctx, F, B, false);
  BP.collar(ctx, F, '#6a6458', '#1e1c18', 'rgba(0,0,0,.45)', {style:'wrap', sw:26, sy:-44});
  F.under = (ctx, F) => { PR.dots(ctx, F, 40, 'rgba(60,44,30,.24)', .4, [5, 18]); };
  PR.face(ctx, F);
  const u = F.h/20; PR.stroke(ctx, 'rgba(120,70,50,.6)', .9, () => { ctx.moveTo(-F.w*.5, F.cy - 7.4*u); ctx.lineTo(-F.w*.3, F.cy - 3.6*u); }); // the scar through the brow
  BP.hair(ctx, F, {c:['#5a4634', '#3a2a1c', '#1a120a'], v:.6, wx:.95, hl:6, ey:-3.4, n:46, sw:.36, seed:181, sh:'#c8b090', shA:.12});
  return F; };
/* Tirren: twenty-one, a farrier's daughter; sun-browned, freckled; hair tied up under a dust scarf; a leather farrier's apron over a quilted
   shirt; a rasp on a thong at the throat; the farrier's hammer's head up by the right shoulder, held */
POR.tirren = function(ctx){ const F = {cy:-75, w:11.2, h:19.4, jaw:.7, chin:3.9, skin:'#c49a76', iris:'#4a3a24', lip:'#9a5a4a', browCol:'#4a321e', browW:1.05, arch:.65, browL:.3, browR:.3, rim:'#a07a5a', rimA:.22, nose:1.1, look:.25, smileL:.15, smileR:.1, mouthW:3.3, age:0, bags:.1, open:.88};
  ctx.save(); ctx.beginPath(); ctx.moveTo(-F.w - 4, F.cy - 6); ctx.quadraticCurveTo(-F.w - 7, F.cy + 18, -F.w - 2, -44); ctx.lineTo(F.w + 2, -44); ctx.quadraticCurveTo(F.w + 7, F.cy + 18, F.w + 4, F.cy - 6); ctx.closePath();
    ctx.fillStyle = PR.lit(ctx, '#9a6a40', '#2a160a', -F.w, F.w); ctx.fill(); ctx.restore(); // her hair, long, down behind to the shoulders
  PR.stroke(ctx, '#4a3624', 3.4, () => { ctx.moveTo(22, 6); ctx.lineTo(28, -84); }); ctx.save(); ctx.translate(28.6, -88); ctx.rotate(.1); ctx.fillStyle = '#5a5a5e'; ctx.fillRect(-7, -3, 14, 6); ctx.restore(); // the hammer
  PR.neck(ctx, F, 7.6);
  const B = BP.body(ctx, F, {wide:32, drop:3, nx:F.w*.66 + 2.4, ny:F.cy + 14, cb:-45, c1:'#a89272', c2:'#2a2016'});
  ctx.save(); B.path(); ctx.clip(); ctx.fillStyle = PR.lit(ctx, '#7a5a3e', '#1e140a', -28, 28); ctx.fillRect(-22, -38, 44, 60); // the apron
    PR.stroke(ctx, '#2a1a0c', 1.6, () => { ctx.moveTo(-20, -38); ctx.lineTo(-16, 8); ctx.moveTo(20, -38); ctx.lineTo(16, 8); }); PR.soft(ctx, 18, -16, 14, 14, '#000000', .4); ctx.restore();
  BP.light(ctx, F, B, false);
  BP.collar(ctx, F, '#b8a688', '#3a3024', 'rgba(0,0,0,.4)', {style:'rib', sw:20, sy:-44});
  for (let i = 0; i < 6; i++) ell(ctx, -F.w*.9 - 1 + i * .5, F.cy + 12 + i * 5.2, 2.6, 2, i % 2 ? '#7a4e2c' : '#9a6a40'); // the braid over the left shoulder
  PR.stroke(ctx, '#2a2018', .6, () => { ctx.moveTo(-4, -50); ctx.quadraticCurveTo(0, -42, 4, -50); }); ctx.save(); ctx.translate(0, -40); ctx.fillStyle = '#7a7a80'; ctx.fillRect(-1, -5, 2, 9); ctx.restore(); // the rasp on its thong
  PR.face(ctx, F);
  const u = F.h/20, top = F.cy - 21*u;
  for (let i = 0; i < 10; i++) { const r = PR.rng(i + 2101); ell(ctx, (r() < .5 ? -1 : 1) * (3 + r() * 3.4), F.cy + .6*u + r() * 1.6*u, .32, .32, 'rgba(130,70,40,.35)'); } // freckles across the cheeks
  BP.hair(ctx, F, {c:['#9a6a40', '#6a4228', '#2a160a'], v:1.2, wx:.92, hl:12, ey:-2.4, n:60, sw:.42, seed:2111, sh:'#e0b890', shA:.18}); // the hair, loose at the sides under the scarf
  ctx.save(); ctx.beginPath(); ctx.moveTo(-F.w - 2.6, top + 10.6*u); ctx.quadraticCurveTo(-F.w - 2, top - 3*u, 0, top - 3.6*u); ctx.quadraticCurveTo(F.w + 2, top - 3*u, F.w + 2.6, top + 10.6*u);
    ctx.quadraticCurveTo(0, top + 6.2*u, -F.w - 2.6, top + 10.6*u); ctx.closePath(); ctx.fillStyle = PR.lit(ctx, '#a6845e', '#2a1e12', -F.w, F.w); ctx.fill(); ctx.restore(); // the dust scarf over the crown
  PR.stroke(ctx, 'rgba(30,20,10,.5)', .8, () => { ctx.moveTo(-F.w - 2.4, top + 10*u); ctx.quadraticCurveTo(0, top + 6*u, F.w + 2.4, top + 10*u); });
  PR.stroke(ctx, 'rgba(255,236,210,.25)', .7, () => { ctx.moveTo(-F.w, top + 1*u); ctx.quadraticCurveTo(-F.w*.4, top - 2.6*u, 0, top - 3*u); });
  ctx.save(); ctx.translate(F.w + 1.6, top + 9*u); ctx.rotate(.4); ctx.fillStyle = '#8a6a48'; ctx.fillRect(0, 0, 3.4, 9); ctx.restore(); // the knot's tail
  return F; };
