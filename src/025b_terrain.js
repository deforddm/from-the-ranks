/* ============ the terrain kit: ambient ground for the explore maps (David, Nov 15, 2026: "many spaces feel extremely empty") ============
   Map characters reserved for this kit in every book (no area used them before; tools/terrain_test.mjs keeps them reserved and checks
   that every area stays walkable to its people and its ways out). The area's decor decides what each one looks like: its ground under
   it, its palette, and where the decor already draws the thing (a tent, a wagon, horse lines) the decor's own drawing.
     impassable (never put these in an area's walk):
       '1' a bank: raised ground at the rim of an open space (a grassed rise, a dune, a low spoil bank), joined to its neighbours
       '2' a thicket: a bank of thorn scrub and brush       '3' rubble: tumbled stone, a broken footing
       '4' boulders                                         '5' a dead tree
       '6' a tent                                           '7' a wagon or a cart (one nobody talks at; a talking wagon stays a trigger)
       '8' crates, sacks, a saddle                          '9' a stall: a trestle under an awning
       '0' a cookfire in its ring of stones                 '@' horses on a picket rope
       '%' a weapon stack: spears in a tripod, shields      '$' bones
       '&' a well, or a water butt                          '!' a lantern on a pole
     walkable (put these in the area's walk):
       '_' a worn track: ruts or trodden earth, joined to its neighbours and to the ways out
       ':' trampled ground: hoof-churned, boot-marked       '*' a tuft: greener grass, a few flowers or stones
   A decor joins the kit with an entry in TKS below: its palette family, the decor characters to draw some kit characters as
   (as:{'7':'W'}), its own drawings for others (draw:{'4':fn}), and optionally its raw ground, its light and its fog (so a kit tile's
   ground is lit and fogged the same as the ground round it; the banks, tracks and things on top are not). A decor with no entry gets
   the 'earth' family, which suits any dry ground.
   Ambient folk (area.folk) are in the second half of this file. */
const TK_CH = '1234567890@%$&!_:*', TK_WALK = '_:*', TK_RAISED = '123';
/* palettes: day (d) and night (n) for each ground family; rgb strings are 'r,g,b' for alpha work */
const TKP = {
  odhan:  {d:{body:'#b49e70', crest:'255,246,220', foot:'70,50,30', blade:'#8a7a48', bladeL:'#c8b47a', brush:'#6e7050', brushL:'#9a9a6c', stem:'#5a4a30', rock:'#9a7452', rockL:'#c8a070', rockD:'#4a3222', wood:'#5a4028', woodL:'#8a6a44', canvas:'#d8c8a2', canvasD:'#8a7454', bone:'#e8e0cc', cloth:['#8a3a2a', '#c8a868'], track:'130,104,70', mud:'90,64,40', lit:'255,250,235', tex:'turf'},
           n:{body:'#24262e', crest:'175,186,220', foot:'0,0,0', blade:'#444a52', bladeL:'#565c64', brush:'#1e2428', brushL:'#2e363a', stem:'#2a2622', rock:'#24242c', rockL:'#3a3a44', rockD:'#0c0c10', wood:'#1e1610', woodL:'#3a2e22', canvas:'#3a3632', canvasD:'#1e1c1a', bone:'#5a5c66', cloth:['#3a2018', '#3a3020'], track:'150,160,190', mud:'0,0,0', lit:'200,210,240', tex:'turf'}},
  redsand:{d:{body:'#d0a682', crest:'255,226,196', foot:'90,50,30', blade:'#8a8452', bladeL:'#b0a870', brush:'#6a5032', brushL:'#8a8452', stem:'#6a5032', rock:'#8e4a32', rockL:'#c07a5a', rockD:'#4e2416', wood:'#5a4028', woodL:'#8a6a44', canvas:'#c8b48c', canvasD:'#8a7454', bone:'#ece2cc', cloth:['#8a3a2a', '#c8a868'], track:'120,76,50', mud:'90,56,30', lit:'255,226,196', tex:'dune'},
           n:{body:'#262224', crest:'210,190,190', foot:'0,0,0', blade:'#3a3a2e', bladeL:'#4a4a3a', brush:'#2a2622', brushL:'#3a3a2e', stem:'#2a2622', rock:'#34241e', rockL:'#4e3a36', rockD:'#150e0c', wood:'#1e1610', woodL:'#3a2e22', canvas:'#3e3834', canvasD:'#221e1c', bone:'#6a6466', cloth:['#3a2018', '#3a3020'], track:'170,150,150', mud:'0,0,0', lit:'200,180,180', tex:'dune'}},
  sand:   {d:{body:'#d4bc8c', crest:'255,244,214', foot:'90,64,36', blade:'#8a7a48', bladeL:'#b0a070', brush:'#6a5a36', brushL:'#8a7a48', stem:'#6a5a36', rock:'#9a5236', rockL:'#c87a52', rockD:'#5a2c1a', wood:'#5a4028', woodL:'#8a6a44', canvas:'#c8b48c', canvasD:'#8a7454', bone:'#ece4d0', cloth:['#8a3a2a', '#c8a868'], track:'140,108,66', mud:'90,64,36', lit:'255,240,205', tex:'dune'},
           n:{body:'#2e2a28', crest:'214,196,180', foot:'0,0,0', blade:'#3a3628', bladeL:'#4a4636', brush:'#2a2620', brushL:'#3a3628', stem:'#2a2620', rock:'#3a241e', rockL:'#5a3c32', rockD:'#1a100c', wood:'#1e1610', woodL:'#3a2e22', canvas:'#3e3834', canvasD:'#221e1c', bone:'#6a6670', cloth:['#3a2018', '#3a3020'], track:'180,165,150', mud:'0,0,0', lit:'214,196,180', tex:'dune'}},
  plain:  {d:{body:'#6a8644', crest:'240,236,190', foot:'40,50,20', blade:'#8a9a50', bladeL:'#c8c88a', brush:'#4a5a2a', brushL:'#7a8a44', stem:'#4a4024', rock:'#8a8478', rockL:'#b8b2a4', rockD:'#4a463e', wood:'#5a4028', woodL:'#8a6a44', canvas:'#d8ccaa', canvasD:'#8a7a5a', bone:'#ece6d4', cloth:['#8a3a2a', '#c8a868'], track:'110,92,60', mud:'60,48,30', lit:'255,248,225', tex:'grass'},
           n:{body:'#162018', crest:'170,190,220', foot:'0,0,0', blade:'#2e4034', bladeL:'#46584a', brush:'#18221a', brushL:'#2a3a2c', stem:'#2a2418', rock:'#2e3036', rockL:'#454852', rockD:'#141518', wood:'#2a1e14', woodL:'#4a3a28', canvas:'#4a4640', canvasD:'#26241e', bone:'#5c6068', cloth:['#5a2a20', '#5a4a2a'], track:'130,140,160', mud:'8,8,6', lit:'170,184,220', tex:'grass'}},
  shell:  {d:{body:'#cdc6b6', crest:'255,252,242', foot:'80,74,64', blade:'#9a9478', bladeL:'#bab49a', brush:'#7a7462', brushL:'#9a947e', stem:'#5a5444', rock:'#a89c8a', rockL:'#d6cebe', rockD:'#5a5248', wood:'#5a4028', woodL:'#8a6a44', canvas:'#d8ccb0', canvasD:'#9a8a6a', bone:'#f2eee2', cloth:['#8a3a2a', '#c8a868'], track:'120,112,96', mud:'90,84,70', lit:'255,252,240', tex:'dune'},
           n:{body:'#2e2c2c', crest:'200,200,210', foot:'0,0,0', blade:'#3a3a34', bladeL:'#4a4a42', brush:'#2a2826', brushL:'#3a3834', stem:'#2a2622', rock:'#34302e', rockL:'#4c4844', rockD:'#141210', wood:'#1e1610', woodL:'#3a2e22', canvas:'#3e3a36', canvasD:'#221e1c', bone:'#6a6a70', cloth:['#3a2018', '#3a3020'], track:'170,170,180', mud:'0,0,0', lit:'200,200,215', tex:'dune'}}, // the old sea floor's white shell ground (75b)
  earth:  {d:{body:'#9a8a6a', crest:'255,246,220', foot:'60,46,30', blade:'#7a7a48', bladeL:'#a8a070', brush:'#5a5a3a', brushL:'#7a7a50', stem:'#4a3a28', rock:'#7a7468', rockL:'#a8a294', rockD:'#3a362e', wood:'#5a4028', woodL:'#8a6a44', canvas:'#c8b48c', canvasD:'#8a7454', bone:'#e8e0cc', cloth:['#8a3a2a', '#c8a868'], track:'100,80,56', mud:'70,52,34', lit:'255,240,210', tex:'turf'},
           n:{body:'#222120', crest:'190,190,210', foot:'0,0,0', blade:'#3a3a32', bladeL:'#4a4a40', brush:'#1e201c', brushL:'#2e302a', stem:'#24201a', rock:'#2a2826', rockL:'#3e3a36', rockD:'#100e0c', wood:'#1e1610', woodL:'#3a2e22', canvas:'#3a3632', canvasD:'#1e1c1a', bone:'#5a5a60', cloth:['#3a2018', '#3a3020'], track:'150,150,160', mud:'0,0,0', lit:'200,200,220', tex:'turf'}} };
/* the decors that have joined. as: kit char -> the decor's own char (drawn whole by the decor); draw: kit char -> fn(ctx, x, y, T, N, P)
   over the kit's ground; ground(ctx, ch, x, y, T, N) and light(ctx, x, y, T, N): see above; post: laid over a kit tile last (fog) */
const TK_ODHAN_AS = {'7':'W', '6':'=', '@':'h', '0':'F', '5':'x', '$':'b'};
const TKS = {
  b4_c3_hills:{fam:'odhan', as:Object.assign({}, TK_ODHAN_AS, {'0':'f'}), draw:{'4':(c, x, y, T, N) => b43Boulders(c, x, y, T, N)}},
  b4_c4_camp: {fam:'odhan', as:Object.assign({}, TK_ODHAN_AS, {'0':'f'}), draw:{'8':(c, x, y, T, N) => b44Crates(c, x, y, T, N), '4':(c, x, y, T, N) => b43Boulders(c, x, y, T, N)}},
  b4_c4_hills:{fam:'odhan', ground:(c, ch, x, y, T, N) => { b2Odhan(c, ch, x, y, T, N); if (ch === '.') b44Grass(c, x, y, T, N); }, draw:{'4':(c, x, y, T, N) => b44Mound(c, x, y, T, N)}, post:(c, x, y, T, N) => { if (N) b44Fog(c, x, y, T, 1); },
    light:(c, x, y, T, N) => { if (!N || !tileMap) return; let near = 9; tileMap.forEach((r, yy) => { const xx = r.indexOf('L'); if (xx >= 0) near = Math.min(near, Math.hypot(xx - x, yy - y)); }); if (near < 3.4) { c.fillStyle = `rgba(255,190,100,${(.14*(1 - near/3.4)).toFixed(3)})`; c.fillRect(x*T, y*T, T, T); } }}, // the picket lantern's light in the fog, as 74b's ground has it
  b4_c6_lines:{fam:'redsand', ground:(c, ch, x, y, T, N) => b46LinesTile(c, ch, x, y, T, N), light:(c, x, y, T, N) => { if (N) b2Firelit(c, x, y, T, .3, 3.2, '255,140,60'); },
    draw:{'4':(c, x, y, T, N) => b46Rock(c, x, y, T, N, .78), '6':(c, x, y, T, N) => b45Tent(c, x, y, T, N), '8':(c, x, y, T, N) => b44Crates(c, x, y, T, N)}},
  b4_c7_breach:{fam:'sand', ground:(c, ch, x, y, T, N) => b47PicketTile(c, ch, x, y, T, N, true), draw:{'4':(c, x, y, T, N) => b45Boulder(c, x, y, T, N, .85), '6':(c, x, y, T, N) => b45Tent(c, x, y, T, N), '8':(c, x, y, T, N) => b44Crates(c, x, y, T, N)}},
  b8_c5_grass:{fam:'plain', as:{'7':'W', '6':'=', '0':'F', '!':'L'}},
  /* the rest of Book Four (v13.22): each decor's own cart, tent, fire, rock or coral head where it has one */
  b4_c1_aren:{fam:'earth', as:{'7':'c'}},
  b4_c1_barracks:{fam:'earth'},
  b4_c1_graves:{fam:'earth', as:{'5':'x'}},
  b4_c2_way:{fam:'odhan', as:{'7':'c', '6':'n', '0':'F'}},
  b4_c2_fall:{fam:'earth', as:{'4':'#'}},
  b4_c3_ford:{fam:'earth', as:{'0':'F'}, draw:{'6':(c, x, y, T, N) => b42Tent(c, x, y, T, N)}},
  b4_c5_wall:{fam:'sand', as:{'6':'=', '7':'W', '0':'f'}, draw:{'4':(c, x, y, T, N) => b45Boulder(c, x, y, T, N, .8)}},
  b4_c5_seabed:{fam:'shell', as:{'4':'#'}},
  b4_c5_canal:{fam:'sand', draw:{'6':(c, x, y, T, N) => b45Tent(c, x, y, T, N)}},
  b4_c6_ramp:{fam:'redsand', draw:{'4':(c, x, y, T, N) => b46Rock(c, x, y, T, N, .78)}},
  b4_c7_picket:{fam:'sand', draw:{'4':(c, x, y, T, N) => b45Boulder(c, x, y, T, N, .85), '8':(c, x, y, T, N) => b44Crates(c, x, y, T, N)}},
  b4_c7_isle:{fam:'sand'} };
const tkCfg = style => TKS[style] || null;
const tkHex = (hex, amt) => { const n = parseInt(hex.slice(1), 16), f = v => Math.max(0, Math.min(255, Math.round(v + (amt < 0 ? v*amt : (255 - v)*amt)))); return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(v => f(v).toString(16).padStart(2, '0')).join(''); }; // shade(), but a hex back, so it can be shaded again
const tkPal = (cfg, N) => { const f = TKP[(cfg && cfg.fam) || 'earth'] || TKP.earth; return N ? f.n : f.d; };
const tkAt = (x, y) => { if (!tileMap) return null; const r = tileMap[y]; return r === undefined ? null : r[x] === undefined ? null : r[x]; };
const tkRaised = (x, y) => { const c = tkAt(x, y); return c === null ? !!tileMap : TK_RAISED.includes(c); }; // off the map counts as more bank, so a rim runs off the edge
/* the ground a kit tile stands on: the commonest plain ground round it ('.' unless ',' wins) */
function tkBase(x, y){ let a = 0, b = 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const c = tkAt(x + dx, y + dy); if (c === '.') a++; else if (c === ',') b++; } return b > a ? ',' : '.'; }

/* ---- the kit's drawings: each draws over the kit's ground, inside the tile ---- */
/* raised ground ('1' bank, '2' thicket, '3' rubble) is drawn in world space: every raised cell is a few overlapping lumps a little bigger
   than its tile, and every tile near one draws all its neighbours' lumps inside its own edges, so a run of them is one rounded ridge with
   no seams, its shadow falling on the ground below and to the right and its foot spilling a little onto the walkable ground beside it */
function tkCells(x, y){ const out = []; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const c = tkAt(x + dx, y + dy); if (c !== null && TK_RAISED.includes(c)) out.push({x:x + dx, y:y + dy, k:c}); } return out; }
const TK_LUMPS = (c, dune) => { const j = k => hash(c.x, c.y, k + 360) - .5; return dune ? [[j(1)*.12, j(2)*.08, .86, .58], [-.34 + j(3)*.1, .12 + j(4)*.06, .56, .4], [.34 + j(5)*.1, .1 + j(6)*.06, .56, .4]] // a dune: long and smooth
    : [[j(1)*.16, j(2)*.12, .74, .6], [-.3 + j(3)*.12, .16 + j(4)*.1, .5, .42], [.3 + j(5)*.12, -.14 + j(6)*.1, .5, .44], [j(7)*.2, -.26 + j(8)*.08, .42, .34]]; };
function tkLumps(ctx, c, T, ox, oy, s, col, dune){ const bx = (c.x + .5)*T, by = (c.y + .5)*T; ctx.fillStyle = col; ctx.beginPath(); TK_LUMPS(c, dune).forEach(([u, v, rx, ry]) => { ctx.moveTo(bx + (u + ox)*T + rx*s*T, by + (v + oy)*T); ctx.ellipse(bx + (u + ox)*T, by + (v + oy)*T, rx*s*T, ry*s*T, 0, 0, 7); }); ctx.fill(); }
function tkRise(ctx, x, y, T, P){ const cs = tkCells(x, y); if (!cs.length) return; const D = P.tex === 'dune', night = P.foot === '0,0,0';
  const body = k => k === '2' ? tkHex(P.body, -.16) : k === '3' ? tkHex(P.body, -.08) : P.body;
  cs.forEach(c => tkLumps(ctx, c, T, .1, .17, 1, `rgba(${P.foot},${night ? .4 : .3})`, D)); // the shadow, down and right
  cs.forEach(c => tkLumps(ctx, c, T, 0, .1, 1, tkHex(body(c.k), -.3), D)); // the face toward us, in its own shade
  cs.forEach(c => tkLumps(ctx, c, T, 0, -.04, 1, body(c.k), D)); // the bank
  if (!night) cs.forEach(c => tkLumps(ctx, c, T, -.08, -.14, .66, `rgba(${P.crest},.1)`, D)); // its back, in the light
  cs.forEach(c => { if (tkRaised(c.x, c.y - 1) && tkAt(c.x, c.y - 1) !== null) return; const [u, v, rx, ry] = TK_LUMPS(c, D)[0], bx = (c.x + .5 + u)*T, by = (c.y + .5 + v - .04)*T; // its crest, where it meets the sky
    ctx.strokeStyle = `rgba(${P.crest},${night ? .16 : .3})`; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.ellipse(bx, by, rx*T*.96, ry*T*.96, 0, Math.PI*1.12, Math.PI*1.88); ctx.stroke(); });
  cs.forEach(c => { const bx = (c.x + .5)*T, by = (c.y + .46)*T; // what grows on it, or lies on it
    if (c.k === '1') { if (P.tex === 'dune') { for (let i = 0; i < 3; i++) { const yy = by + T*(-.3 + i*.24), w = T*(.5 - Math.abs(i - 1)*.12); ctx.strokeStyle = i % 2 ? `rgba(${P.crest},.2)` : `rgba(${P.foot},.18)`; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.moveTo(bx - w, yy + T*.03); ctx.quadraticCurveTo(bx, yy - T*.07, bx + w, yy + T*.02); ctx.stroke(); } }
      else { const n = P.tex === 'grass' ? 14 : 10; ctx.lineWidth = 1; for (let i = 0; i < n; i++) { const a0 = hash(c.x, c.y, i + 320)*6.28, r0 = Math.sqrt(hash(c.y, c.x, i + 321))*T*.55, gx = bx + Math.cos(a0)*r0, gy = by + Math.sin(a0)*r0*.75, l = T*(P.tex === 'grass' ? .14 + hash(c.x, c.y, i + 322)*.14 : .07 + hash(c.x, c.y, i + 322)*.09), a = (hash(c.x, c.y, i + 323) - .5)*.8 + (P.tex === 'grass' ? .3 : 0);
          ctx.strokeStyle = i % 3 ? P.blade : P.bladeL; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.quadraticCurveTo(gx + Math.sin(a)*l*.4, gy - l*.6, gx + Math.sin(a)*l, gy - Math.cos(a)*l); ctx.stroke(); }
        if (hash(c.x, c.y, 330) > .6) { const sx = bx + T*(hash(c.x, c.y, 331) - .5)*.5, sy = by + T*(hash(c.y, c.x, 332) - .5)*.4; ell(ctx, sx + T*.03, sy + T*.03, T*.09, T*.04, `rgba(${P.foot},.3)`); ell(ctx, sx, sy, T*.08, T*.055, P.rock); ell(ctx, sx - T*.02, sy - T*.015, T*.04, T*.025, P.rockL); } } } // a stone showing through
    else if (c.k === '2') { for (let k = 0; k < 3; k++) tkBush(ctx, bx + T*(-.3 + k*.3 + (hash(c.x, c.y, k + 340) - .5)*.14), by + T*(.06 + (hash(c.y, c.x, k + 341) - .5)*.3), T*(.17 + hash(c.x, c.y, k + 342)*.08), P, hash(c.x, c.y, k + 343)); }
    else { for (let i = 0; i < 7; i++) { const sx = bx + T*(hash(c.x, c.y, i + 350) - .5)*.9, sy = by + T*(hash(c.y, c.x, i + 351) - .5)*.7, r = T*(.06 + hash(c.x, c.y, i + 352)*.09), sq = hash(c.x, c.y, i + 353) > .5;
      ell(ctx, sx + r*.3, sy + r*.4, r*1.05, r*.5, `rgba(${P.foot},.35)`); if (sq) { ctx.save(); ctx.translate(sx, sy); ctx.rotate((hash(c.x, c.y, i + 354) - .5)*.9); ctx.fillStyle = P.rock; ctx.fillRect(-r, -r*.6, r*2, r*1.2); ctx.fillStyle = P.rockL; ctx.fillRect(-r, -r*.6, r*2, r*.35); ctx.restore(); }
      else { ell(ctx, sx, sy, r, r*.72, P.rock); ell(ctx, sx - r*.25, sy - r*.22, r*.5, r*.32, P.rockL); } } } }); }
/* a dome of dry brush: dark leaves on thorn stems */
function tkBush(ctx, cx, by, r, P, k){ ell(ctx, cx + r*.3, by + r*.1, r*1.1, r*.35, `rgba(${P.foot},.3)`);
  ctx.strokeStyle = P.stem; ctx.lineWidth = 1; ctx.beginPath(); for (let i = 0; i < 7; i++) { const a = -Math.PI*(.1 + i/6*.8); ctx.moveTo(cx, by); ctx.lineTo(cx + Math.cos(a)*r*1.4, by + Math.sin(a)*r*1.3); } ctx.stroke();
  for (let i = 0; i < 6; i++) { const a = -Math.PI*(.12 + i/5*.76), d = r*(.5 + ((k*7 + i*3) % 1)*.3); ell(ctx, cx + Math.cos(a)*d, by - r*.25 + Math.sin(a)*d*.8, r*.42, r*.32, i < 3 ? P.brush : shade(P.brush, -.18)); }
  ell(ctx, cx - r*.2, by - r*.75, r*.38, r*.22, P.brushL); }
/* boulders: a cluster of stones, lit from the left */
function tkBoulders(ctx, x, y, T, P){ const px = x*T, py = y*T; ell(ctx, px + T*.56, py + T*.84, T*.44, T*.1, `rgba(${P.foot},.4)`);
  [[.34, .66, .26], [.68, .7, .2], [.5, .46, .2], [.18, .8, .1]].forEach(([u, v, r], i) => { const cx = px + T*u, cy = py + T*v; ell(ctx, cx + r*T*.2, cy + r*T*.3, r*T, r*T*.62, `rgba(${P.foot},.3)`);
    const g = ctx.createLinearGradient(cx - r*T, cy - r*T, cx + r*T, cy + r*T); g.addColorStop(0, P.rockL); g.addColorStop(.55, P.rock); g.addColorStop(1, P.rockD); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(cx, cy, r*T, r*T*.78, (i - 1.5)*.3, 0, 7); ctx.fill();
    ctx.fillStyle = `rgba(${P.lit},.18)`; ctx.beginPath(); ctx.ellipse(cx - r*T*.3, cy - r*T*.3, r*T*.4, r*T*.2, -.4, 0, 7); ctx.fill(); }); }
function tkDeadTree(ctx, x, y, T, P){ const px = x*T, py = y*T, cx = px + T*.46, cy = py + T*.82; ctx.strokeStyle = `rgba(${P.foot},.35)`; ctx.lineWidth = Math.max(1.5, T*.05); ctx.beginPath(); ctx.moveTo(cx + T*.04, cy + T*.04); ctx.lineTo(cx + T*.42, cy + T*.14); ctx.stroke();
  const br = (x0, y0, a, len, w, d) => { const x1 = x0 + Math.cos(a)*len, y1 = y0 + Math.sin(a)*len; ctx.strokeStyle = P.woodL; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.strokeStyle = `rgba(${P.foot},.45)`; ctx.lineWidth = w*.4; ctx.beginPath(); ctx.moveTo(x0 + w*.3, y0); ctx.lineTo(x1 + w*.3, y1); ctx.stroke();
    if (d > 0) { br(x1, y1, a - .5 - hash(x, d, 7)*.4, len*.66, w*.62, d - 1); br(x1, y1, a + .45 + hash(y, d, 8)*.4, len*.6, w*.6, d - 1); } };
  br(cx, cy, -Math.PI/2 - .1, T*.3, Math.max(1.6, T*.075), 2); ctx.lineCap = 'butt'; }
function tkTent(ctx, x, y, T, P){ const px = x*T, py = y*T, cx = px + T*.5, by = py + T*.86; ell(ctx, cx + T*.1, by, T*.46, T*.1, `rgba(${P.foot},.4)`);
  poly(ctx, [[px + T*.06, by], [cx, py + T*.14], [px + T*.94, by]], P.canvas); poly(ctx, [[cx, py + T*.14], [px + T*.94, by], [cx + T*.14, by]], P.canvasD); poly(ctx, [[cx - T*.12, by], [cx, py + T*.5], [cx + T*.1, by]], `rgba(${P.foot},.8)`);
  ctx.fillStyle = P.wood; ctx.fillRect(cx - 1, py + T*.06, 2, T*.1); }
function tkWagon(ctx, x, y, T, P){ const px = x*T, py = y*T, by = py + T*.78; ell(ctx, px + T*.56, by + T*.06, T*.46, T*.1, `rgba(${P.foot},.4)`);
  ctx.fillStyle = P.wood; ctx.fillRect(px + T*.08, py + T*.48, T*.84, T*.24); ctx.fillStyle = P.canvas; ctx.beginPath(); ctx.moveTo(px + T*.06, py + T*.5); ctx.quadraticCurveTo(px + T*.5, py - T*.04, px + T*.94, py + T*.5); ctx.fill();
  ctx.fillStyle = `rgba(${P.foot},.3)`; ctx.beginPath(); ctx.moveTo(px + T*.55, py + T*.5); ctx.quadraticCurveTo(px + T*.8, py + T*.12, px + T*.94, py + T*.5); ctx.fill();
  [.24, .76].forEach(k => { ell(ctx, px + T*k, by, T*.12, T*.12, '#120c08'); ctx.strokeStyle = P.woodL; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(px + T*k, by, T*.08, 0, 7); ctx.stroke(); }); }
function tkCrates(ctx, x, y, T, P){ const px = x*T, py = y*T; ell(ctx, px + T*.54, py + T*.86, T*.42, T*.09, `rgba(${P.foot},.45)`);
  [[.1, .5, .4, .36], [.5, .54, .38, .32], [.22, .2, .34, .3]].forEach(([u, v, w, hh], i) => { ctx.fillStyle = i === 2 ? P.woodL : P.wood; ctx.fillRect(px + T*u, py + T*v, T*w, T*hh); ctx.strokeStyle = `rgba(${P.foot},.55)`; ctx.lineWidth = 1; ctx.strokeRect(px + T*u + .5, py + T*v + .5, T*w - 1, T*hh - 1);
    ctx.beginPath(); ctx.moveTo(px + T*u, py + T*v); ctx.lineTo(px + T*(u + w), py + T*(v + hh)); ctx.stroke(); ctx.fillStyle = `rgba(${P.lit},.12)`; ctx.fillRect(px + T*u, py + T*v, T*w, Math.max(1, T*.04)); });
  ell(ctx, px + T*.76, py + T*.4, T*.13, T*.1, P.canvas); ell(ctx, px + T*.73, py + T*.37, T*.06, T*.03, `rgba(${P.lit},.25)`); } // a sack on the end
function tkStall(ctx, x, y, T, P){ const px = x*T, py = y*T, top = py + T*.12, eave = py + T*.44; ell(ctx, px + T*.52, py + T*.88, T*.46, T*.08, `rgba(${P.foot},.4)`);
  ctx.fillStyle = P.wood; ctx.fillRect(px + T*.08, py + T*.6, T*.84, T*.08); ctx.fillRect(px + T*.12, py + T*.68, T*.05, T*.2); ctx.fillRect(px + T*.83, py + T*.68, T*.05, T*.2); // the trestle
  for (let i = 0; i < 5; i++) { const gx = px + T*(.18 + i*.15), c = [P.cloth[0], P.bone, P.cloth[1], P.woodL, P.canvas][(x + y + i) % 5]; ell(ctx, gx, py + T*.56, T*.06, T*.05, c); } // what it sells: jugs, fruit, cloth
  ctx.fillStyle = P.wood; ctx.fillRect(px + T*.06, top, T*.04, T*.5); ctx.fillRect(px + T*.9, top, T*.04, T*.5); // the poles
  for (let i = 0; i < 5; i++) { ctx.fillStyle = P.cloth[i % 2]; ctx.fillRect(px + T*(.04 + i*.184), top, T*.184, eave - top); ctx.beginPath(); ctx.arc(px + T*(.04 + i*.184 + .092), eave, T*.092, 0, Math.PI); ctx.fill(); } // the awning, striped
  ctx.fillStyle = `rgba(${P.lit},.12)`; ctx.fillRect(px + T*.04, top, T*.92, T*.05); ctx.fillStyle = `rgba(${P.foot},.3)`; ctx.fillRect(px + T*.08, eave + T*.08, T*.84, T*.06); }
function tkFire(ctx, x, y, T, P, N){ const cx = x*T + T*.5, cy = y*T + T*.62; for (let i = 0; i < 7; i++) { const a = i/7*6.28; ell(ctx, cx + Math.cos(a)*T*.24, cy + Math.sin(a)*T*.14, T*.07, T*.05, i % 2 ? P.rock : P.rockL); }
  if (N) b2Flames(ctx, cx, cy, T, .85); else { ell(ctx, cx, cy, T*.15, T*.08, '#2a1c10'); b2Flames(ctx, cx, cy, T, .5); for (let i = 0; i < 3; i++) ell(ctx, cx + T*(.04 + i*.06), cy - T*(.3 + i*.16), T*(.06 + i*.03), T*(.04 + i*.02), `rgba(200,190,170,${.25 - i*.06})`); } }
function tkHorses(ctx, x, y, T, P, N){ const px = x*T, py = y*T, h = hash(x, y);
  for (let i = 0; i < 5; i++) ell(ctx, px + T*(.1 + hash(x, y, i + 70)*.8), py + T*(.6 + hash(y, x, i + 71)*.35), T*.04, T*.03, `rgba(${P.mud},.45)`);
  ctx.strokeStyle = P.woodL; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px, py + T*.3); ctx.lineTo(px + T, py + T*.3); ctx.stroke(); if (tkAt(x - 1, y) !== '@') { ctx.fillStyle = P.wood; ctx.fillRect(px + T*.04, py + T*.16, T*.06, T*.3); }
  const hx = px + T*.5, hy = py + T*.72, d = hash(x, y, 10) > .5 ? 1 : -1, hc = ['#5a3a22', '#8a6a44', '#3a2a1e', '#a89070'][Math.floor(h*4)], c = N ? shade(hc, -.6) : hc;
  ell(ctx, hx, hy + T*.2, T*.3, T*.06, `rgba(${P.foot},.35)`); ctx.fillStyle = c; for (let i = 0; i < 4; i++) ctx.fillRect(hx + T*(-.2 + (i%2)*.06 + (i > 1 ? .28 : 0))*d - T*.02, hy, T*.04, T*.2);
  ell(ctx, hx, hy - T*.02, T*.26, T*.1, c); ctx.strokeStyle = c; ctx.lineWidth = Math.max(2, T*.08); ctx.beginPath(); ctx.moveTo(hx + T*.18*d, hy - T*.04); ctx.lineTo(hx + T*.3*d, hy - T*.24); ctx.stroke(); ell(ctx, hx + T*.35*d, hy - T*.24, T*.08, T*.045, c, .5*d);
  ctx.strokeStyle = '#140c08'; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(hx - T*.26*d, hy - T*.04); ctx.lineTo(hx - T*.32*d, hy + T*.1); ctx.stroke();
  ctx.fillStyle = `rgba(${P.lit},.18)`; ctx.fillRect(hx - T*.2, hy - T*.11, T*.3, 1); ctx.strokeStyle = P.woodL; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(hx + T*.38*d, hy - T*.22); ctx.lineTo(hx + T*.3*d, py + T*.3); ctx.stroke(); }
function tkWeapons(ctx, x, y, T, P){ const px = x*T, py = y*T, cx = px + T*.42, ty = py + T*.12, by = py + T*.86; ell(ctx, cx + T*.1, by, T*.36, T*.08, `rgba(${P.foot},.4)`);
  [[-.22, 0], [.2, .02], [0, .06]].forEach(([dx, dz]) => { B2F.line(ctx, P.wood, Math.max(1, T*.035), [[cx + dx*T, by - dz*T], [cx, ty + T*.08]]); }); // spears stood together, heads up
  for (let i = 0; i < 3; i++) poly(ctx, [[cx - T*.03 + i*T*.03 - T*.02, ty + T*.06], [cx - T*.02 + i*T*.03, ty - T*.06], [cx + i*T*.03 - T*.0, ty + T*.06]], P.bone);
  [[.68, .62], [.24, .66]].forEach(([u, v], i) => { const sx = px + T*u, sy = py + T*v; ell(ctx, sx, sy, T*.16, T*.2, i ? P.cloth[0] : P.woodL); ctx.strokeStyle = `rgba(${P.foot},.6)`; ctx.lineWidth = Math.max(1, T*.025); ctx.beginPath(); ctx.ellipse(sx, sy, T*.16, T*.2, 0, 0, 7); ctx.stroke(); ell(ctx, sx, sy, T*.04, T*.04, P.rockL); }); } // shields leaned on them
function tkBones(ctx, x, y, T, P){ const px = x*T, py = y*T, h = hash(x, y, 9), cx = px + T*.5, cy = py + T*.55, bc = P.bone; ctx.save(); ctx.translate(cx, cy); ctx.rotate((h - .5)*1.4);
  ctx.strokeStyle = bc; ctx.lineWidth = Math.max(1, T*.03); ctx.beginPath(); ctx.moveTo(-T*.28, 0); ctx.lineTo(T*.14, 0); ctx.stroke(); for (let i = 0; i < 5; i++) { const rx = -T*.24 + i*T*.08; ctx.beginPath(); ctx.moveTo(rx, 0); ctx.quadraticCurveTo(rx - T*.06, -T*.1, rx - T*.02, -T*.18); ctx.moveTo(rx, 0); ctx.quadraticCurveTo(rx - T*.06, T*.1, rx - T*.02, T*.17); ctx.stroke(); }
  ell(ctx, T*.24, T*.02, T*.09, T*.07, bc); ctx.fillStyle = `rgba(${P.foot},.8)`; ctx.fillRect(T*.25, -T*.02, T*.03, T*.03); ctx.fillRect(T*.25, T*.03, T*.03, T*.03); ctx.restore();
  ctx.strokeStyle = bc; ctx.lineWidth = Math.max(1.4, T*.04); ctx.beginPath(); ctx.moveTo(px + T*.14, py + T*.86); ctx.lineTo(px + T*.44, py + T*.8); ctx.stroke();
  if (h > .4) { ctx.save(); ctx.translate(px + T*.74, py + T*.8); ctx.rotate(h*3); poly(ctx, [[0, -T*.09], [T*.07, 0], [0, T*.06], [-T*.05, 0]], bc); ctx.strokeStyle = `rgba(${P.foot},.4)`; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(0, -T*.06); ctx.quadraticCurveTo(T*.02, 0, 0, T*.04); ctx.stroke(); ctx.restore(); } } // a shell, or a horn
function tkWell(ctx, x, y, T, P){ const px = x*T, py = y*T, cx = px + T*.5, cy = py + T*.62; ell(ctx, cx + T*.06, cy + T*.16, T*.4, T*.12, `rgba(${P.foot},.4)`);
  ell(ctx, cx, cy, T*.36, T*.2, P.rock); ell(ctx, cx, cy - T*.04, T*.36, T*.18, P.rockL); ell(ctx, cx, cy - T*.04, T*.26, T*.12, '#0a0c10'); ell(ctx, cx - T*.06, cy - T*.06, T*.08, T*.03, `rgba(${P.lit},.2)`); // stone ring, dark water
  B2F.line(ctx, P.wood, Math.max(1, T*.04), [[cx - T*.3, cy - T*.02], [cx - T*.3, py + T*.14]]); B2F.line(ctx, P.wood, Math.max(1, T*.04), [[cx + T*.3, cy - T*.02], [cx + T*.3, py + T*.14]]); B2F.line(ctx, P.woodL, Math.max(1, T*.035), [[cx - T*.34, py + T*.16], [cx + T*.34, py + T*.16]]);
  ctx.strokeStyle = P.woodL; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx + T*.04, py + T*.17); ctx.lineTo(cx + T*.04, py + T*.36); ctx.stroke(); ctx.fillStyle = P.wood; ctx.fillRect(cx - T*.02, py + T*.36, T*.12, T*.1); } // the frame, the rope, the bucket
function tkLamp(ctx, x, y, T, P, N){ const px = x*T, py = y*T; ell(ctx, px + T*.5, py + T*.86, T*.16, T*.05, `rgba(${P.foot},.4)`); ctx.fillStyle = P.wood; ctx.fillRect(px + T*.47, py + T*.2, T*.06, T*.66);
  ctx.fillStyle = 'rgba(255,210,120,.95)'; ctx.fillRect(px + T*.42, py + T*.1, T*.16, T*.14); glow(ctx, px + T*.5, py + T*.17, T*.9, '#e8a040', N ? .3 : .12); }
/* the worn track, in world space like the banks: each '_' joins its neighbours (and runs on into a way out or a road), and every tile
   near one draws the whole band inside its own edges, in one stroke, so it bends and crosses tile corners without a seam */
const tkIsTrack = c => c === '_';
function tkLinks(x, y){ const isT = (dx, dy) => { const c = tkAt(x + dx, y + dy); return c !== null && (c === '_' || '<>^vr'.includes(c)); };
  return [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].filter(([dx, dy]) => isT(dx, dy) && (!dx || !dy || (!isT(dx, 0) && !isT(0, dy)))).map(([dx, dy]) => [dx, dy, tkIsTrack(tkAt(x + dx, y + dy)) ? .5 : 1]); }
function tkPaths(ctx, x, y, T, P, N){ const cs = []; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (tkIsTrack(tkAt(x + dx, y + dy))) cs.push({x:x + dx, y:y + dy, l:tkLinks(x + dx, y + dy)}); if (!cs.length) return;
  const band = (w, col, cap) => { ctx.lineCap = cap; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); cs.forEach(c => { const cx = (c.x + .5)*T, cy = (c.y + .5)*T; if (!c.l.length) { ctx.moveTo(cx - T*.12, cy); ctx.lineTo(cx + T*.12, cy); } c.l.forEach(([dx, dy, k]) => { ctx.moveTo(cx, cy); ctx.lineTo(cx + dx*T*k, cy + dy*T*k); }); }); ctx.stroke(); };
  band(T*.7, `rgba(${P.track},${N ? .07 : .22})`, 'round'); band(T*.44, `rgba(${P.track},${N ? .07 : .28})`, 'round'); // trodden: the grass worn off, the ground packed paler (by night it catches what light there is)
  if (P.tex !== 'dune') band(Math.max(1, T*.045), `rgba(${P.mud},${N ? .25 : .3})`, 'butt'); ctx.lineCap = 'butt'; ctx.lineJoin = 'miter'; }
function tkTrack(ctx, x, y, T, P, N){ const px = x*T, py = y*T; // the track's own tile: grit and prints on it (the band is tkPaths)
  ctx.fillStyle = `rgba(${P.mud},.35)`; for (let i = 0; i < 5; i++) { const a = hash(x, y, i + 400), b = hash(y, x, i + 401); ctx.fillRect(px + T*(.2 + a*.6), py + T*(.2 + b*.6), Math.max(1, T*.04), Math.max(1, T*.03)); }
  ctx.fillStyle = `rgba(${P.lit},${N ? .05 : .1})`; for (let i = 0; i < 3; i++) ctx.fillRect(px + T*(.25 + hash(x, y, i + 410)*.5), py + T*(.25 + hash(y, x, i + 411)*.5), T*.1, 1); }
function tkTrampled(ctx, x, y, T, P, N){ const px = x*T, py = y*T; b2Soft(ctx, px + T*(.4 + hash(x, y, 420)*.2), py + T*(.45 + hash(y, x, 421)*.2), T*.5, .7, P.mud, N ? .35 : .22);
  ctx.strokeStyle = `rgba(${P.mud},.5)`; ctx.lineWidth = 1; for (let i = 0; i < 5; i++) { const hx = px + T*(.15 + hash(x, y, i + 422)*.7), hy = py + T*(.2 + hash(y, x, i + 423)*.65); ctx.beginPath(); ctx.arc(hx, hy, T*.045, Math.PI*.1, Math.PI*.9); ctx.stroke(); } // hoof-cuts
  for (let i = 0; i < 3; i++) ell(ctx, px + T*(.2 + hash(x, y, i + 430)*.6), py + T*(.2 + hash(y, x, i + 431)*.6), T*.035, T*.06, `rgba(${P.mud},.35)`, .3); } // boot-marks
function tkTuft(ctx, x, y, T, P, N){ const px = x*T, py = y*T; for (let c = 0; c < 3; c++) { const bx = px + T*(.18 + hash(x, y, c + 440)*.64), by = py + T*(.45 + hash(y, x, c + 441)*.45);
    ell(ctx, bx + T*.04, by + T*.02, T*.12, T*.035, `rgba(${P.foot},.25)`); ctx.lineWidth = 1; for (let i = 0; i < 7; i++) { const a = (i/6 - .5)*1.1, l = T*(.14 + hash(x, y, c*9 + i + 442)*.12); ctx.strokeStyle = i % 2 ? P.bladeL : shade(P.bladeL, .15); ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(bx + Math.sin(a)*l*.4, by - l*.6, bx + Math.sin(a)*l, by - Math.cos(a)*l); ctx.stroke(); } }
  if (hash(x, y, 450) > .5) for (let i = 0; i < 4; i++) ell(ctx, px + T*(.15 + hash(x, y, i + 451)*.7), py + T*(.15 + hash(y, x, i + 452)*.7), Math.max(.8, T*.02), Math.max(.8, T*.02), N ? 'rgba(150,150,170,.5)' : ['#e8dc7a', '#f0ece0', '#c890c8'][i % 3]);
  else { ell(ctx, px + T*.7, py + T*.3, T*.06, T*.04, P.rock); ell(ctx, px + T*.68, py + T*.29, T*.03, T*.02, P.rockL); } }
const TK_DRAW = {
  '1':() => {}, '2':() => {}, '3':() => {}, // (raised ground: tkRise, from the wrapper)
  '4':(c, x, y, T, P) => tkBoulders(c, x, y, T, P), '5':(c, x, y, T, P) => tkDeadTree(c, x, y, T, P), '6':(c, x, y, T, P) => tkTent(c, x, y, T, P), '7':(c, x, y, T, P) => tkWagon(c, x, y, T, P),
  '8':(c, x, y, T, P) => tkCrates(c, x, y, T, P), '9':(c, x, y, T, P) => tkStall(c, x, y, T, P), '0':(c, x, y, T, P, N) => tkFire(c, x, y, T, P, N), '@':(c, x, y, T, P, N) => tkHorses(c, x, y, T, P, N),
  '%':(c, x, y, T, P) => tkWeapons(c, x, y, T, P), '$':(c, x, y, T, P) => tkBones(c, x, y, T, P), '&':(c, x, y, T, P) => tkWell(c, x, y, T, P), '!':(c, x, y, T, P, N) => tkLamp(c, x, y, T, P, N),
  '_':(c, x, y, T, P, N) => tkTrack(c, x, y, T, P, N), ':':(c, x, y, T, P, N) => tkTrampled(c, x, y, T, P, N), '*':(c, x, y, T, P, N) => tkTuft(c, x, y, T, P, N) };
/* the kit's drawTile: a kit character is the decor's ground (or the decor's own thing) and the kit's drawing over it; any other
   tile is drawn as it always was, then seated against a bank beside it. Battle maps never hold kit characters. */
{ const _dt = drawTile; drawTile = function(ctx, ch, x, y, T, dark, tunnel, style){
    const kit = TK_CH.includes(ch), near = !!tileMap && (tkCells(x, y).length > 0 || [-1, 0, 1].some(dy => [-1, 0, 1].some(dx => tkIsTrack(tkAt(x + dx, y + dy)))));
    const spill = (P, N) => { ctx.save(); ctx.beginPath(); ctx.rect(x*T, y*T, T, T); ctx.clip(); tkPaths(ctx, x, y, T, P, N); tkRise(ctx, x, y, T, P); ctx.restore(); };
    if (!kit) { const r = _dt(ctx, ch, x, y, T, dark, tunnel, style); if (near && ch !== '#') { spill(tkPal(tkCfg(style), !!dark), !!dark); if ('<>^v'.includes(ch)) exitArrow(ctx, ch, x*T, y*T, T); } return r; } // a way out keeps its arrow on top
    const cfg = tkCfg(style), N = !!dark, P = tkPal(cfg, N), as = cfg && cfg.as && cfg.as[ch];
    if (as) { _dt(ctx, as, x, y, T, dark, tunnel, style); return; }
    const base = tkBase(x, y); ctx.save(); ctx.beginPath(); ctx.rect(x*T, y*T, T, T); ctx.clip();
    if (cfg && cfg.ground) cfg.ground(ctx, base, x, y, T, N); else _dt(ctx, base, x, y, T, dark, tunnel, style);
    if (cfg && cfg.light) cfg.light(ctx, x, y, T, N); if (cfg && cfg.post) cfg.post(ctx, x, y, T, N); // lit and fogged as the decor's own ground is
    if (near) spill(P, N); // then the banks and tracks, which every tile draws the same way (so no seams)
    const own = cfg && cfg.draw && cfg.draw[ch]; if (own) own(ctx, x, y, T, N, P); else TK_DRAW[ch](ctx, x, y, T, P, N);
    ctx.restore(); }; }
/* what moves, each frame (030's drawExplore): the kit's cookfires breathe and its lanterns glow */
function tkFrame(ctx, T, t, a){ const N = !!a.dark || /night|dusk/.test(a.decor || ''); a.map.forEach((row, y) => { if (!row.includes('0') && !row.includes('!')) return; [...row].forEach((ch, x) => { if (!onCam(x, y, 3.5)) return;
    if (ch === '0') { const fl = REDUCE() ? 1 : .82 + Math.sin(t/150 + x)*.1 + Math.sin(t/61 + y)*.06; glow(ctx, x*T + T/2, y*T + T*.55, T*(N ? 2.6 : 1.2), '#e8923a', (N ? .24 : .08)*fl);
      if (!REDUCE()) for (let i = 0; i < 3; i++) { const k = ((t/1400 + i/3 + x*.13) % 1); ell(ctx, x*T + T/2 + Math.sin(t/600 + i + x)*T*.12*k, y*T + T*.3 - k*T*1.1, T*(.06 + k*.16), T*(.04 + k*.1), N ? `rgba(255,170,90,${((1 - k)*.12).toFixed(3)})` : `rgba(210,200,185,${((1 - k)*.18).toFixed(3)})`); } }
    if (ch === '!') glow(ctx, x*T + T/2, y*T + T*.2, T*(N ? 2 : 1), '#e8a040', (N ? .2 : .06)*(REDUCE() ? 1 : .9 + Math.sin(t/300 + x)*.08)); }); }); }

/* ============ ambient folk ============
   area.folk: [{x, y, kind, name, line, wander, show}] — people who belong to the place and are not the story: soldiers at a fire, carters,
   travellers, market folk. They stand where they are put (never on a trigger, the start or a person to talk to, and never across the
   only way through: tools/terrain_test.mjs checks), idle, and if `wander` (tiles, 1 or 2) is set, shift about that far from where they
   were put, never onto the worn track ('_', or the area's folkAvoid characters). Tapping one walks the squad up to them and puts their one line in the log under the map, in the log's "<em>Who:</em> words"
   style; it sets no flag and gives nothing. `line` may be a list: each tap takes the next one. `kind` is any figure kind (FIGX or 18's). */
const FOLK = {area:null, list:[]};
function folkInit(){ const a = AREA(); FOLK.area = S.area; FOLK.list = (a.folk || []).map((f, i) => ({f, i, x:f.x, y:f.y, dx:f.x, dy:f.y, next:0, dir:f.dir || (hash(f.x, f.y, 5) > .5 ? 1 : -1), said:0, n:0})); }
const folkNow = () => { if (!S || FOLK.area !== S.area) folkInit(); return FOLK.list.filter(p => !p.f.show || p.f.show()); };
const folkAt = (x, y) => (typeof AREAS !== 'undefined' && AREA().folk) ? folkNow().find(p => p.x === x && p.y === y) || null : null;
/* may a figure stand here? plain walkable ground: not a trigger, a person, the sergeant, another figure, or a squadmate's place in line */
function folkFree(x, y, p){ const a = AREA(), c = tileAt(x, y); if (c === '#' || !a.walk.includes(c) || (a.triggers && a.triggers[c]) || npcAt(x, y)) return false;
  if ((a.folkAvoid || '_').includes(c) && !(p && p.f.x === x && p.f.y === y)) return false; // a figure keeps off the worn track (and whatever else the area says), so the way stays clear
  if (S.pos.x === x && S.pos.y === y) return false; if ((S.trail || []).slice(0, 5).some(q => q.x === x && q.y === y)) return false;
  return !folkNow().some(q => q !== p && (q.x === x && q.y === y)); }
function folkStep(p, t){ const w = p.f.wander || 0; if (!w || REDUCE() || walking || !$('#sheet').hidden) return; if (!p.next) { p.next = t + 2500 + hash(p.f.x, p.f.y, 1)*4000; return; } if (t < p.next) return;
  p.next = t + 3500 + Math.random()*5000; const opts = DIRS.map(([dx, dy]) => ({x:p.x + dx, y:p.y + dy})).filter(q => cheb(q, p.f) <= w && folkFree(q.x, q.y, p));
  const home = cheb(p, p.f) > 0 && Math.random() < .45; const q = home ? opts.sort((m, n) => cheb(m, p.f) - cheb(n, p.f))[0] : opts[Math.floor(Math.random()*opts.length)];
  if (q) { if (q.x !== p.x) p.dir = q.x > p.x ? 1 : -1; p.x = q.x; p.y = q.y; } }
function drawFolk(ctx, T, t){ const ps = folkNow(); if (!ps.length) return; const k = Math.min(1, ((t - (FOLK.t || t)) || 16) / 700); FOLK.t = t;
  ps.slice().sort((p, q) => p.dy - q.dy).forEach(p => { folkStep(p, t); p.dx = lerp(p.dx, p.x, REDUCE() ? 1 : k); p.dy = lerp(p.dy, p.y, REDUCE() ? 1 : k); if (Math.abs(p.dx - p.x) < .02) p.dx = p.x; if (Math.abs(p.dy - p.y) < .02) p.dy = p.y;
    if (!onCam(Math.round(p.dx), Math.round(p.dy), 1)) return; const moving = p.dx !== p.x || p.dy !== p.y;
    drawFigure(ctx, p.f.kind, p.dx*T + T/2, p.dy*T + T*.6, T/32*.86, t, {phase:p.f.x*1.7 + p.f.y, still:!moving, dir:p.dir});
    if (p.said && t - p.said < 2600) { const a = Math.min(1, (2600 - (t - p.said))/500), bx = p.dx*T + T*.5, by = p.dy*T - T*.18; ctx.globalAlpha = a; // a small speech mark over whoever spoke
      ctx.fillStyle = 'rgba(20,16,12,.8)'; ctx.strokeStyle = 'rgba(232,192,115,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(bx, by, T*.2, T*.13, 0, 0, 7); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e8c073'; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.arc(bx + i*T*.08, by, Math.max(1, T*.025), 0, 7); ctx.fill(); } ctx.globalAlpha = 1; } }); }
function folkSay(p){ const L = Array.isArray(p.f.line) ? p.f.line : [p.f.line], line = L[p.n % L.length]; p.n++; p.said = performance.now(); if (S.pos.x !== p.x) p.dir = S.pos.x > p.x ? 1 : -1;
  AUDIO.play('click'); elog(`<em>${esc(p.f.name || 'Somebody')}:</em> "${esc(line)}"`); }
function folkTap(p){ const path = cheb(S.pos, p) <= 1 ? [] : findPath(S.pos.x, S.pos.y, palePass, (a, b) => cheb({x:a, y:b}, p) <= 1); if (path) walk(path, () => folkSay(p)); }
