/* ============ Book Six, Chapter 6 art: The Falling Sky — the column halted under the lights, and Hanar Ara ============ */
/* No new figures for this chapter (the brief): the squad, the Host and the borrowed foe kinds are already drawn. Two backdrops (SCENEX,
   sceneLayer for the still parts, REDUCE() holding the rest still), replacing B6_SCENE_LIKE's borrowed b3_c4_cold_night and b2_geleen:
   b6_sky (north-east of G'danisban at night after rain: broken cloud, the moon high on the left, twelve lights coming down below it in a
   row with their trails, the Host's column stopped on the road across the plain with its torches and wagons, the squad in front looking up;
   never Paran's gate, nothing of a god), and b6_hanar_ara (the City of the Fallen on its plain under a grey sky: tents and shrines and smoke
   from cook-fires, a rebel army coming out of it in a long file to lay its weapons on a heap before the Host's lines, the Host's blue-grey
   ranks and standards in front, the squad on the near rise; the surrender at a distance, the city's centre never shown).
   And the chapter's gear on Book Six's ground for the Fourth: rain-slate with a thin bone rim (Claude's call). */

/* ---------------- backdrops ---------------- */
/* the plain north-east of G'danisban: low hills to the north, the road going away, scrub and standing water from the rain */
function b66Sky(x, W, hz, night){ x.fillStyle = vgrad(x, 0, hz, night ? [[0,'#05070d'],[.6,'#0e1420'],[1,'#1c2430']] : [[0,'#4e5660'],[.6,'#7a8288'],[1,'#9a9e9c']]); x.fillRect(0, 0, W, hz + 2);
  if (night) for (let i = 0; i < 70; i++) { x.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 6601)*.42).toFixed(2)})`; x.fillRect(hash(i, 6602)*W, Math.pow(hash(i, 6603), 1.3)*hz*.8, 1, 1); } }
function b66Clouds(x, W, hz, night){ for (let i = 0; i < 9; i++) { const cx = W*hash(i, 6611), cy = hz*(.1 + hash(i, 6612)*.55), w = W*(.16 + hash(i, 6613)*.2);
  for (let k = 0; k < 5; k++) ell(x, cx + (k - 2)*w*.18, cy + Math.sin(k*1.7)*hz*.02, w*.22, hz*.035, night ? 'rgba(20,26,36,.55)' : 'rgba(70,76,84,.45)'); } }
function b66Plain(x, W, H, hz, night){ x.fillStyle = night ? '#0a0c0e' : '#5a5c58'; x.beginPath(); x.moveTo(0, hz); for (let i = 0; i <= 24; i++) x.lineTo(W*i/24, hz - H*(.02 + hash(i, 6621)*.04)); x.lineTo(W, hz); x.fill(); // low hills to the north
  x.fillStyle = vgrad(x, hz, H, night ? [[0,'#12140f'],[1,'#060705']] : [[0,'#5a5a44'],[1,'#33332a']]); x.fillRect(0, hz, W, H - hz);
  for (let i = 0; i < 14; i++) { const px = W*hash(i, 6622), py = hz + (H - hz)*Math.pow(hash(i, 6623), 1.6)*.8, w = W*(.03 + hash(i, 6624)*.06)*(1 + (py - hz)/(H - hz)); ell(x, px, py, w, w*.12, night ? 'rgba(90,110,140,.22)' : 'rgba(170,180,186,.35)'); } // standing water from the rain
  for (let i = 0; i < 60; i++) { const px = W*hash(i, 6625), py = hz + (H - hz)*Math.pow(hash(i, 6626), 1.4), s = 1 + (py - hz)/(H - hz)*4; ell(x, px, py, s*1.6, s*.7, night ? 'rgba(4,6,4,.7)' : 'rgba(40,44,30,.55)'); } } // scrub
/* the road across the plain, curving away to the north-east */
function b66Road(x, W, H, hz, night){ x.fillStyle = night ? '#1a1a16' : '#6a6050'; x.beginPath(); x.moveTo(W*.02, H); x.quadraticCurveTo(W*.4, H*.66, W*.7, hz + H*.02); x.lineTo(W*.73, hz + H*.02); x.quadraticCurveTo(W*.5, H*.68, W*.3, H); x.fill();
  x.strokeStyle = night ? 'rgba(0,0,0,.4)' : 'rgba(40,36,28,.4)'; x.lineWidth = 1; x.beginPath(); x.moveTo(W*.12, H); x.quadraticCurveTo(W*.44, H*.67, W*.715, hz + H*.02); x.stroke(); } // a rut
/* a point on the road, u from 0 (near) to 1 (far) */
const b66RoadAt = (W, H, hz, u) => { const a = [W*.16, H], c = [W*.45, H*.67], b = [W*.715, hz + H*.02], v = 1 - u; return [v*v*a[0] + 2*v*u*c[0] + u*u*b[0], v*v*a[1] + 2*v*u*c[1] + u*u*b[1]]; };
/* a soldier of the Host in silhouette at a distance, standing still, face up: the cloak, a spear or a helm */
function b66Tiny(ctx, x, y, s, c, spear){ ctx.fillStyle = c; ctx.fillRect(x - 1.6*s, y - 7*s, 3.2*s, 5*s); ctx.beginPath(); ctx.arc(x, y - 8.2*s, 1.4*s, 0, 7); ctx.fill(); ctx.fillRect(x - 1.4*s, y - 2*s, 1.1*s, 2*s); ctx.fillRect(x + .3*s, y - 2*s, 1.1*s, 2*s);
  if (spear) ctx.fillRect(x + 2*s, y - 13*s, .5*s, 13*s); }
function b66Wagon(ctx, x, y, s, c){ ctx.fillStyle = c; ctx.fillRect(x - 6*s, y - 6*s, 12*s, 4*s); ctx.beginPath(); ctx.moveTo(x - 6*s, y - 6*s); ctx.quadraticCurveTo(x, y - 12*s, x + 6*s, y - 6*s); ctx.fill(); ell(ctx, x - 4*s, y - 1.6*s, 1.8*s, 1.8*s, c); ell(ctx, x + 4*s, y - 1.6*s, 1.8*s, 1.8*s, c); }

/* the column halted under the falling lights */
SCENEX.b6_sky = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.6;
  ctx.drawImage(sceneLayer('b66:sky', W, H, (x, W, H) => { b66Sky(x, W, hz, true); { const g = x.createLinearGradient(0, 0, 0, hz); g.addColorStop(0, 'rgba(40,62,104,.35)'); g.addColorStop(.6, 'rgba(62,96,150,.5)'); g.addColorStop(1, 'rgba(120,140,170,.55)'); x.fillStyle = g; x.fillRect(0, 0, W, hz); } /* sundown: the sky still blue (BH ch 20, R) */ b66Clouds(x, W, hz, true);
    x.globalCompositeOperation = 'lighter'; glow(x, W*.24, H*.14, H*.22, '#c8d4e8', .18); x.globalCompositeOperation = 'source-over'; ell(x, W*.24, H*.14, H*.045, H*.045, '#e4e8ec'); ell(x, W*.235, H*.13, H*.012, H*.01, 'rgba(160,168,180,.6)'); ell(x, W*.25, H*.155, H*.008, H*.007, 'rgba(160,168,180,.5)'); // the moon
    b66Plain(x, W, H, hz, true); b66Road(x, W, H, hz, true);
    for (let i = 0; i < 40; i++) { const u = .12 + i/40*.86, [px, py] = b66RoadAt(W, H, hz, u), s = lerp(1.4, .3, u); if (i % 9 === 4) b66Wagon(x, px + 4*s, py, s, '#06070a'); else b66Tiny(x, px + (i % 2 ? 3 : -3)*s, py, s, '#07080b', i % 3 === 0); } // the column, stopped on the road
    x.fillStyle = '#050605'; x.beginPath(); x.moveTo(0, H); x.lineTo(0, H*.86); x.quadraticCurveTo(W*.5, H*.8, W, H*.88); x.lineTo(W, H); x.fill(); }), 0, 0, W, H); // the near rise
  /* twelve lights coming down below the moon in a slanting row, each with its trail; they fall slowly, and start again */
  const k = mo ? (t % 16000)/16000 : .45; ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 12; i++) { const x0 = W*(.3 + i*.052), y0 = H*(.2 + (i % 3)*.02 + i*.004), drop = H*(.08 + k*.24 + hash(i, 6631)*.04), lx = x0 + drop*.35, ly = y0 + drop, a = mo ? .75 + Math.sin(t/300 + i*1.9)*.25 : .9;
    const g = ctx.createLinearGradient(x0, y0, lx, ly); g.addColorStop(0, 'rgba(200,220,255,0)'); g.addColorStop(1, `rgba(220,232,255,${(.55*a).toFixed(2)})`); ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(lx, ly); ctx.stroke(); // the trail
    glow(ctx, lx, ly, H*.03, '#dce6ff', .5*a); ell(ctx, lx, ly, 1.6, 1.6, `rgba(255,255,255,${a.toFixed(2)})`); }
  glow(ctx, W*.6, hz - H*.02, W*.3, '#8aa0d0', .06 + k*.06); ctx.globalCompositeOperation = 'source-over'; // the plain lit from above
  for (let i = 0; i < 9; i++) { const u = .14 + i*.09, [px, py] = b66RoadAt(W, H, hz, u), s = lerp(1.4, .3, u), fl = mo ? .6 + Math.sin(t/170 + i*2.3)*.4 : .9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, px - 5*s, py - 12*s, 6*s + 2, '#ff9a4a', .5*fl); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = `rgba(255,180,90,${fl.toFixed(2)})`; ctx.fillRect(px - 5*s - .7, py - 13*s, 1.4, 1.8); } // torches held up along the column
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.52 + i*17, H*.95, 1.7, t, {phase:i, dir:-1, still:true}));
  vign(ctx, W, H, .6, .45); };

/* Hanar Ara, the City of the Fallen, and the surrender */
function b66City(x, W, H, hz){ const y = hz + H*.01;
  for (let i = 0; i < 46; i++) { const cx = W*(.18 + hash(i, 6641)*.66), cy = y - H*.005 + hash(i, 6642)*H*.035, s = 4 + hash(i, 6643)*6, c = ['#8a8270', '#9a9280', '#6e6858', '#7a6a58'][i % 4]; poly(x, [[cx - s, cy], [cx, cy - s*.9], [cx + s, cy]], c); x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(cx - .6, cy - s*.5, 1.2, s*.5); } // tents in their hundreds
  [[.3, 1], [.46, 1.4], [.58, 1.1], [.72, .9]].forEach(([u, k]) => { const cx = W*u; x.fillStyle = '#5a5246'; x.fillRect(cx - 5*k, y - 16*k, 10*k, 16*k); poly(x, [[cx - 7*k, y - 16*k], [cx, y - 26*k], [cx + 7*k, y - 16*k]], '#4a4238'); x.fillStyle = '#c8bca0'; x.fillRect(cx - 1.2*k, y - 10*k, 2.4*k, 5*k); }); // shrines among them
  x.fillStyle = 'rgba(70,64,56,.6)'; x.fillRect(W*.16, y + H*.02, W*.7, 1.2); } // a ditch and bank round the camp-city
SCENEX.b6_hanar_ara = (cv, t) => { const {ctx, W, H} = sceneFit(cv), mo = REDUCE() ? 0 : 1, hz = H*.42;
  ctx.drawImage(sceneLayer('b66:hanar', W, H, (x, W, H) => { b66Sky(x, W, hz, false); b66Clouds(x, W, hz, false); b66Plain(x, W, H, hz, false); b66City(x, W, H, hz);
    const hy = hz + H*.16; ell(x, W*.5, hy, W*.06, H*.018, '#3a3630'); for (let i = 0; i < 26; i++) { const a = hash(i, 6651)*Math.PI, r = W*.05*hash(i, 6652); B2F.line(x, i % 3 ? '#6a6458' : '#8a8478', 1, [[W*.5 + Math.cos(a)*r - 4, hy - hash(i, 6653)*H*.02], [W*.5 + Math.cos(a)*r + 4, hy - hash(i, 6653)*H*.02 - 2]]); } // the heap of laid-down spears and blades
    for (let r = 0; r < 3; r++) for (let i = 0; i < 26; i++) { const tx = W*(.04 + i*.037) + (r % 2)*W*.018, ty = H*(.66 + r*.05), s = .9 + r*.25; if (tx > W*.4 && tx < W*.6) continue; b66Tiny(x, tx, ty, s, ['#3e4a58', '#36414e', '#465260'][r], (i + r) % 2 === 0); } // the Host's ranks, blue-grey, a gap left in the middle
    [[.12, '#5a6878'], [.3, '#8a2a22'], [.7, '#5a6878'], [.88, '#c9a35a']].forEach(([u, c]) => { const sx = W*u, sy = H*.62; B2F.line(x, '#1a1612', 1.2, [[sx, sy + H*.06], [sx, sy - H*.04]]); poly(x, [[sx, sy - H*.04], [sx + 10, sy - H*.035], [sx + 9, sy - H*.015], [sx, sy - H*.01]], c); }); // the Host's standards
    x.fillStyle = '#2e2e24'; x.beginPath(); x.moveTo(0, H); x.lineTo(0, H*.86); x.quadraticCurveTo(W*.4, H*.82, W, H*.87); x.lineTo(W, H); x.fill(); }), 0, 0, W, H); // the near rise
  for (let i = 0; i < 6; i++) { const sx = W*(.24 + i*.11), sy = hz - H*.01; for (let k = 0; k < 5; k++) { const u = k/5, dr = (mo ? Math.sin(t/1700 + i + u*3) : 0)*4; ell(ctx, sx + dr + u*W*.015, sy - u*H*.14, 3 + u*10, 2 + u*5, `rgba(90,88,84,${(.22*(1 - u)).toFixed(3)})`); } } // cook-fire smoke over the city, drifting
  /* the rebels coming out in a long file, one by one to the heap, and back empty-handed */
  const n = 22, k0 = mo ? (t/42000) % 1 : .3; for (let i = 0; i < n; i++) { const u = (i/n + k0) % 1, out = u < .6, v = out ? u/.6 : (u - .6)/.4;
    const px = out ? lerp(W*.44, W*.5, v) : lerp(W*.52, W*.6, v), py = out ? lerp(hz + H*.035, hz + H*.15, v) : lerp(hz + H*.15, hz + H*.05, v), s = lerp(.5, .75, out ? v : 1 - v);
    b66Tiny(ctx, px, py, s*1.15, '#2e2620', out); }
  const sq = marchOrder(sceneSquad()); squadLine(sq, 1, (id, i) => drawFigure(ctx, id, W*.14 + i*17, H*.95, 1.7, t, {phase:i, dir:1, still:true}));
  vign(ctx, W, H, .42, .5); };

/* ---------------- the chapter's gear: ART['item/<key>'] on Book Six's ground for the Fourth ----------------
   240×130, the same flat shapes and single highlight as the earlier books, on rain-slate with a thin bone rim (Claude's call) */
function b66Item(key, label, body){ const w = 240, h = 130, id = 'c66-' + key.replace(/[^a-z0-9]/g, '');
  ART['item/' + key] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><radialGradient id="${id}" cx="0.5" cy="0.5" r="0.68"><stop offset="0" stop-color="#3a4046"></stop><stop offset=".7" stop-color="#1e2226"></stop><stop offset="1" stop-color="#101214"></stop></radialGradient></defs><rect width="${w}" height="${h}" rx="3" fill="url(#${id})"></rect><rect x="2.5" y="2.5" width="${w - 5}" height="${h - 5}" rx="2" fill="none" stroke="#d8c8a4" stroke-width="1" opacity=".65"></rect>\n${body}</svg>`;
  if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + key] = [w, h]; }
/* a starstone: a small black stone, glassy and pitted, a seam of pale light still in it, on a leather thong */
b66Item('b6_c6_starstone', 'A starstone', '<ellipse cx="122" cy="104" rx="50" ry="6" fill="#000" opacity=".38"/>'
  + '<path d="M122 48 Q86 40 92 18 Q98 8 122 12 Q146 8 152 18 Q158 40 122 48" fill="none" stroke="#6a4a2e" stroke-width="2.4"/><path d="M122 48 L116 60 M122 48 L128 60" stroke="#5a3e26" stroke-width="2"/><path d="M112 46 Q122 42 132 46 L130 54 Q122 51 114 54 Z" fill="#5a3e26"/>'
  + '<radialGradient id="c66sg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#cfdcff" stop-opacity=".35"/><stop offset="1" stop-color="#cfdcff" stop-opacity="0"/></radialGradient><ellipse cx="122" cy="76" rx="52" ry="40" fill="url(#c66sg)"/>'
  + '<path d="M96 66 Q98 48 120 46 Q146 44 152 64 Q158 86 140 98 Q120 106 104 96 Q90 86 96 66 Z" fill="#1a1a1e"/>'
  + '<path d="M100 64 Q104 52 120 50" fill="none" stroke="#8a90a0" stroke-width="2" opacity=".6"/>'
  + '<g fill="#0a0a0c"><circle cx="112" cy="80" r="3"/><circle cx="138" cy="70" r="2.4"/><circle cx="130" cy="90" r="2"/><circle cx="120" cy="62" r="1.6"/></g>'
  + '<path d="M106 74 Q118 70 124 80 Q130 88 146 82" fill="none" stroke="#dce6ff" stroke-width="1.6" opacity=".9"/><path d="M106 74 Q118 70 124 80 Q130 88 146 82" fill="none" stroke="#9ab0e8" stroke-width="4" opacity=".25"/>');
/* a robe of Hanar Ara: undyed linen gone grey with travel, folded, its hem worked in faded red, a cord belt laid across it */
b66Item('b6_c6_hanararobe', 'A robe from Hanar Ara', '<ellipse cx="120" cy="108" rx="84" ry="7" fill="#000" opacity=".36"/>'
  + '<path d="M44 52 Q46 40 60 38 L180 36 Q196 38 196 52 L198 96 Q196 104 184 104 L58 106 Q44 104 44 96 Z" fill="#a49c88"/>'
  + '<path d="M44 66 Q120 60 198 64 L198 72 Q120 68 44 74 Z" fill="#8e8672"/><path d="M48 44 Q120 38 190 42" fill="none" stroke="#d4ccb6" stroke-width="2" opacity=".55"/>'
  + '<path d="M46 92 L198 90 L198 100 L46 102 Z" fill="#7a3a2a" opacity=".75"/><g stroke="#c8a070" stroke-width="1" opacity=".55"><path d="M56 96 l6 -3 l6 3 l6 -3 l6 3 l6 -3 l6 3 l6 -3 l6 3 l6 -3 l6 3 l6 -3 l6 3 l6 -3 l6 3 l6 -3 l6 3 l6 -3 l6 3 l6 -3 l6 3 l6 -3 l6 3 l6 -3" fill="none"/></g>'
  + '<path d="M60 80 Q80 76 96 82 M140 80 Q160 76 182 80" fill="none" stroke="#6e6654" stroke-width="1.2" opacity=".6"/>'
  + '<path d="M96 38 Q120 58 144 37" fill="#5e5848"/><path d="M98 38 Q120 54 142 37" fill="none" stroke="#7a3a2a" stroke-width="2.2" opacity=".75"/>'
  + '<path d="M150 40 L192 46 L194 84 Q176 88 158 80 Z" fill="#968e7a"/><path d="M158 80 Q176 88 194 84" fill="none" stroke="#6e6654" stroke-width="1.4"/><path d="M190 48 L192 82" stroke="#7a3a2a" stroke-width="3" opacity=".7"/>'
  + '<path d="M30 58 Q80 70 120 62 Q160 54 212 70" fill="none" stroke="#5a4428" stroke-width="3.4" stroke-linecap="round"/><path d="M212 70 L218 86 M212 70 L222 82" stroke="#5a4428" stroke-width="2.2" stroke-linecap="round"/><circle cx="120" cy="62" r="3" fill="#4a3620"/>');
