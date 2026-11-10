/* ============ the 3D battlefield (v11.1, a test: Settings · Battlefield) ============ */
/* The fight's rules, turns and saves are untouched. The 2D board is still painted every frame (drawBattle with G.flat: no
   figures, no floating numbers, no vignette) and becomes the ground texture of a small three.js scene: walls stand up, drops
   and pits sink, the figures stand on cards that lean toward the camera, munitions fly in arcs, fire and smoke rise.
   Drag to turn the view, pinch or scroll to zoom, tap a square to act. three.js loads only when the setting is on
   (three3d.min.js beside the page, precached by sw.js), and any failure falls back to the 2D board. */
const B3D = {lib:null, loading:false, failed:false, S:null};
function b3dWanted(){ return SET.view3d === true && !B3D.failed && view === 'battle' && !!B; }
function b3dLoad(){
  if (B3D.lib || B3D.loading || B3D.failed) return; B3D.loading = true;
  import('./three3d.min.js').then(m => { B3D.lib = m; B3D.loading = false; })
    .catch(e => { B3D.loading = false; b3dFail('The 3D battlefield could not load here, so the fight stays in 2D.', e); });
}
function b3dFail(msg, e){ B3D.failed = true; try { console.warn('3D battlefield:', e); } catch(x) {} b3dTeardown(); if (view === 'battle' && B && typeof blog === 'function') blog(msg); }
/* called at the top of every battle frame: true when the 3D view is up and the board should be painted flat for it */
function b3dActive(){
  if (!b3dWanted()) { if (B3D.S) b3dTeardown(); return false; }
  if (!B3D.lib) { b3dLoad(); return false; }
  const cv = $('#cv'); if (!cv || !G.T) return false;
  if (!B3D.S || B3D.S.cv2 !== cv || !document.body.contains(B3D.S.cv3)) { b3dTeardown(); try { b3dSetup(cv); } catch(e) { b3dFail('The 3D battlefield could not start on this device, so the fight stays in 2D.', e); return false; } }
  return true;
}
function b3dTeardown(){
  const S3 = B3D.S; B3D.S = null; if (!S3) return;
  try { S3.objs.forEach(o => { o.mesh.geometry.dispose(); o.mesh.material.dispose(); o.tex.dispose(); }); S3.ground && S3.ground.geometry.dispose(); S3.tex.dispose(); S3.renderer.dispose(); S3.renderer.forceContextLoss(); } catch(e) {}
  S3.cv3.remove(); if (S3.reset) S3.reset.remove();
}
function b3dSetup(cv2){
  const L = B3D.lib, wrap = cv2.parentElement;
  const cv3 = document.createElement('canvas'); cv3.id = 'cv3'; cv3.setAttribute('aria-label', 'Battle map, 3D');
  cv3.style.cssText = 'position:absolute;left:50%;top:0;transform:translateX(-50%);touch-action:none;display:block';
  wrap.appendChild(cv3);
  const renderer = new L.WebGLRenderer({canvas:cv3, antialias:true, powerPreference:'low-power'});
  renderer.outputColorSpace = L.SRGBColorSpace; renderer.setClearColor(0x060505, 1);
  const scene = new L.Scene(); scene.fog = new L.Fog(0x060505, 14, 30);
  const camera = new L.PerspectiveCamera(36, 1, .1, 80);
  const tex = new L.CanvasTexture(cv2); tex.colorSpace = L.SRGBColorSpace; tex.generateMipmaps = false; tex.minFilter = tex.magFilter = L.LinearFilter;
  const reset = document.createElement('button'); reset.className = 'btn b3reset'; reset.type = 'button'; reset.textContent = '⟲'; reset.title = 'Reset the 3D view'; reset.hidden = true;
  reset.style.cssText = 'position:absolute;right:6px;top:6px;z-index:2;padding:2px 9px;line-height:1.4;opacity:.8';
  reset.onclick = e => { e.stopPropagation(); const S3 = B3D.S; if (!S3) return; S3.yaw = 0; S3.pitch = .98; S3.zoom = 1; S3.fitKey = ''; reset.hidden = true; AUDIO.play('click'); };
  wrap.appendChild(reset);
  B3D.S = {cv2, cv3, renderer, scene, camera, tex, reset, ground:null, mapKey:'', sizeKey:'', fitKey:'', dist:20, yaw:0, pitch:.98, zoom:1, objs:new Map(), pools:{}, fxs:new Map(), shared:{}};
  b3dInput(cv3);
}
/* ---- the ground: one mesh, the painted board as its texture; walls raised, drops and pits sunk, a dark skirt round the edge ---- */
function b3dElev(ch){
  if (ch === 'o') return -.6;
  if (ch !== '#') return 0;
  if (dropStyle()) return -.85; // the roofs' drop, the quays' lake
  const st = B.def.style || (B.def.open ? 'plain' : '');
  return st === 'plain' ? .42 : .72; // scrub and stones on the open ground; walls and pillars elsewhere
}
function b3dGround(){
  const S3 = B3D.S, L = B3D.lib, T = G.T, H = G.oy || 0, Ht = 10*T + H, map = B.def.map;
  const key = map.join('|') + '/' + T + '/' + H + '/' + (B.def.style || '') + (B.def.open ? 'o' : '');
  if (key === S3.mapKey) return; S3.mapKey = key;
  if (S3.ground) { S3.scene.remove(S3.ground); S3.ground.geometry.dispose(); }
  const pos = [], uv = [], col = [], el = (x, y) => x < 0 || y < 0 || x > 7 || y > 9 ? -1.1 : b3dElev((map[y] || '')[x] || '.');
  const U = x => x / 8, V = py => 1 - py / Ht;
  const quad = (p, q, c) => { [0,1,2,0,2,3].forEach(i => { pos.push(...p[i]); uv.push(...q[i]); col.push(c, c, c); }); };
  for (let y = 0; y < 10; y++) for (let x = 0; x < 8; x++) {
    const e = el(x, y), u0 = U(x), u1 = U(x + 1), v0 = V(H + y*T), v1 = V(H + (y + 1)*T), top = e < 0 ? .55 : 1;
    quad([[x,e,y],[x+1,e,y],[x+1,e,y+1],[x,e,y+1]], [[u0,v0],[u1,v0],[u1,v1],[u0,v1]], top);
    // a side wherever the neighbour sits lower: textured from this tile's edge, shaded by the way it faces
    const sv = (v0 - v1) * .22;
    [[0,-1,.38],[0,1,.66],[-1,0,.5],[1,0,.5]].forEach(([dx, dy, shade]) => { const n = el(x + dx, y + dy); if (n >= e - .001) return;
      const lo = n, c = shade * (e > 0 ? 1 : .6);
      if (dy === -1) quad([[x,e,y],[x+1,e,y],[x+1,lo,y],[x,lo,y]], [[u0,v0],[u1,v0],[u1,v0-sv],[u0,v0-sv]], c);
      else if (dy === 1) quad([[x,e,y+1],[x+1,e,y+1],[x+1,lo,y+1],[x,lo,y+1]], [[u0,v1],[u1,v1],[u1,v1+sv],[u0,v1+sv]], c);
      else if (dx === -1) quad([[x,e,y],[x,e,y+1],[x,lo,y+1],[x,lo,y]], [[u0,v0],[u0,v1],[u0+.02,v1],[u0+.02,v0]], c);
      else quad([[x+1,e,y],[x+1,e,y+1],[x+1,lo,y+1],[x+1,lo,y]], [[u1,v0],[u1,v1],[u1-.02,v1],[u1-.02,v0]], c); });
  }
  const g = new L.BufferGeometry();
  g.setAttribute('position', new L.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new L.Float32BufferAttribute(uv, 2)); g.setAttribute('color', new L.Float32BufferAttribute(col, 3));
  const m = new L.MeshBasicMaterial({map:S3.tex, vertexColors:true, side:L.DoubleSide, fog:true});
  S3.ground = new L.Mesh(g, m); S3.scene.add(S3.ground);
}
/* ---- the camera: orbits the middle of the board; distance fitted so the whole board shows, then the player's zoom ---- */
function b3dCamera(w, h){
  const S3 = B3D.S, L = B3D.lib, cam = S3.camera, tg = new L.Vector3(4, 0, 5.15);
  cam.aspect = w / h; cam.updateProjectionMatrix();
  const place = d => { cam.position.set(tg.x + Math.sin(S3.yaw)*Math.cos(S3.pitch)*d, Math.sin(S3.pitch)*d, tg.z + Math.cos(S3.yaw)*Math.cos(S3.pitch)*d); cam.lookAt(tg); cam.updateMatrixWorld(); };
  const fk = [w, h, S3.yaw.toFixed(3), S3.pitch.toFixed(3)].join('/');
  if (fk !== S3.fitKey) { S3.fitKey = fk; const pts = []; [0, 8].forEach(x => [0, 10].forEach(z => [-.2, .75].forEach(y => pts.push(new L.Vector3(x, y, z)))));
    let d = 5; for (; d < 40; d += .1) { place(d); if (pts.every(p => { const q = p.clone().project(cam); return Math.abs(q.x) < .99 && Math.abs(q.y) < .97; })) break; } S3.dist = d; }
  place(S3.dist * S3.zoom);
  S3.scene.fog.near = S3.dist*S3.zoom*.75; S3.scene.fog.far = S3.dist*S3.zoom*1.9;
}
/* ---- input: a tap acts on the square under it, a drag turns the view, two fingers or the wheel zoom ---- */
function b3dInput(cv3){
  const pts = new Map(); let drag = null, pinch = null;
  const tileAt = e => { const S3 = B3D.S; if (!S3 || !S3.ground) return null; const L = B3D.lib, r = cv3.getBoundingClientRect();
    const v = new L.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), rc = new L.Raycaster(); rc.setFromCamera(v, S3.camera);
    const hit = rc.intersectObject(S3.ground)[0]; if (!hit) return null;
    const p = hit.point.clone(); if (hit.face && Math.abs(hit.face.normal.y) < .5) p.sub(hit.face.normal.clone().multiplyScalar(.02)); // on a wall's side: the wall's own square
    const x = Math.floor(p.x), y = Math.floor(p.z); return x >= 0 && y >= 0 && x < 8 && y < 10 ? {x, y} : null; };
  const moved = () => { const S3 = B3D.S; if (S3) S3.reset.hidden = Math.abs(S3.yaw) < .01 && Math.abs(S3.pitch - .98) < .01 && Math.abs(S3.zoom - 1) < .01; };
  cv3.onpointerdown = e => { if (view !== 'battle' || !B3D.S) return; pts.set(e.pointerId, {x:e.clientX, y:e.clientY}); try { cv3.setPointerCapture(e.pointerId); } catch(x) {}
    const S3 = B3D.S;
    if (pts.size === 1) drag = {x:e.clientX, y:e.clientY, yaw:S3.yaw, pitch:S3.pitch, moved:false};
    else if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = {d:Math.hypot(a.x - b.x, a.y - b.y), zoom:S3.zoom}; if (drag) drag.moved = true; } };
  cv3.onpointermove = e => { const S3 = B3D.S; if (!S3) return;
    if (pts.has(e.pointerId)) pts.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if (pinch && pts.size >= 2) { const [a, b] = [...pts.values()], d = Math.hypot(a.x - b.x, a.y - b.y); S3.zoom = clamp(pinch.zoom * pinch.d / Math.max(20, d), .55, 1.35); moved(); return; }
    if (drag && pts.size === 1) { const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 9) return; drag.moved = true;
      S3.yaw = clamp(drag.yaw - dx * .007, -1.1, 1.1); S3.pitch = clamp(drag.pitch + dy * .005, .55, 1.45); moved(); return; }
    if (e.pointerType === 'mouse' && B && !pts.size) { const p = tileAt(e); G.hover = p;
      const k = p && K(p.x, p.y), live = p && B.cur && B.cur.side === 'p' && !B.cur.ally && !B.busy && !B.over;
      const c = live && ((B.reach && B.reach.has(k) && !(p.x === B.cur.x && p.y === B.cur.y)) || (B.hl && (B.hl.atk.has(k) || B.hl.tgt.has(k)))) ? 'pointer' : ''; if (cv3.style.cursor !== c) cv3.style.cursor = c; } };
  const up = e => { const was = drag, many = pts.size > 1; pts.delete(e.pointerId); if (pts.size < 2) pinch = null;
    if (!pts.size) { drag = null; if (was && !was.moved && !many && e.type === 'pointerup' && view === 'battle' && B) { const p = tileAt(e); if (p) battleTap(p.x, p.y); } } };
  cv3.onpointerup = up; cv3.onpointercancel = up;
  cv3.onpointerleave = e => { if (e.pointerType === 'mouse') G.hover = null; };
  cv3.addEventListener('wheel', e => { const S3 = B3D.S; if (!S3) return; e.preventDefault(); S3.zoom = clamp(S3.zoom * (e.deltaY > 0 ? 1.08 : 1/1.08), .55, 1.35); moved(); }, {passive:false});
}
/* ---- the figures: each on its own little canvas card, standing at its square and leaning toward the camera ---- */
function b3dCard(key, wT, hT){
  const S3 = B3D.S, L = B3D.lib, T = G.T, q = Math.min(3, (G.dpr || 1) * 1.5); let o = S3.objs.get(key);
  if (!o || o.T !== T) { if (o) { S3.scene.remove(o.mesh); o.mesh.geometry.dispose(); o.mesh.material.dispose(); o.tex.dispose(); }
    const cv = document.createElement('canvas'); cv.width = Math.round(wT*T*q); cv.height = Math.round(hT*T*q);
    const ctx = cv.getContext('2d'), tex = new L.CanvasTexture(cv); tex.colorSpace = L.SRGBColorSpace; tex.generateMipmaps = false; tex.minFilter = L.LinearFilter;
    const foot = hT - .44, g = new L.PlaneGeometry(wT, hT); g.translate(0, hT/2 - (hT - foot), 0); // the plane's origin is at the figure's feet
    const mesh = new L.Mesh(g, new L.MeshBasicMaterial({map:tex, transparent:true, depthWrite:false, alphaTest:.03, fog:true, side:L.DoubleSide})); mesh.rotation.order = 'YXZ';
    o = {cv, ctx, tex, mesh, T, q, foot}; S3.objs.set(key, o); S3.scene.add(mesh); }
  o.seen = true; return o;
}
function b3dLight(u, d){ // how lit a figure is on a dark field: near a lantern, a fire, or carrying its own cold light
  if (!B.def.dark) return 1; let b = .16;
  const lamp = (x, y, r) => { const k = 1 - Math.hypot(d.x - x, d.y - y) / r; if (k > 0) b = Math.max(b, Math.min(1, .25 + k*1.2)); };
  party().forEach(p => { const q = G.disp[ukey(p)] || p; lamp(q.x, q.y, p.kind === 'kettle' ? 3.2 : 2.3); });
  B.fires.forEach(f => lamp(f.x, f.y, 2.2));
  if (u.side === 'e' && u.hp > 0) b = Math.max(b, u.ai === 'raest' ? 1 : u === B.cur ? .7 : .45);
  return b;
}
/* ---- small sprites for fire, smoke, sparks, thrown shells and the numbers: pooled and shared ---- */
function b3dSpriteTex(kind){
  const S3 = B3D.S; if (S3.shared[kind]) return S3.shared[kind];
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 2, 32, 32, 31);
  if (kind === 'puff') { g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(.55, 'rgba(255,255,255,.45)'); g.addColorStop(1, 'rgba(255,255,255,0)'); }
  else if (kind === 'shell') { g.addColorStop(0, '#6a6058'); g.addColorStop(.42, '#2e2824'); g.addColorStop(.5, 'rgba(20,16,14,.9)'); g.addColorStop(1, 'rgba(0,0,0,0)'); }
  else { g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.25, 'rgba(255,255,255,.8)'); g.addColorStop(1, 'rgba(255,255,255,0)'); }
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  const t = new B3D.lib.CanvasTexture(c); t.colorSpace = B3D.lib.SRGBColorSpace; return S3.shared[kind] = t;
}
function b3dSprite(kind, add){
  const S3 = B3D.S, L = B3D.lib, p = S3.pools[kind] || (S3.pools[kind] = {list:[], n:0});
  let s = p.list[p.n++]; if (!s) { s = new L.Sprite(new L.SpriteMaterial({map:b3dSpriteTex(kind === 'flame' || kind === 'spark' || kind === 'flash' ? 'glow' : kind), transparent:true, depthWrite:false, blending:add ? L.AdditiveBlending : 1, fog:true})); p.list.push(s); S3.scene.add(s); }
  s.visible = true; return s;
}
function b3dText(f){ // a floating number or word: its own card, made once
  const S3 = B3D.S, L = B3D.lib; let o = S3.fxs.get(f); if (o) return o;
  const c = document.createElement('canvas'), fs = f.big ? 56 : 40, x = c.getContext('2d'); x.font = `700 ${fs}px 'Alegreya Sans', sans-serif`;
  c.width = Math.ceil(x.measureText(f.txt).width + 24); c.height = fs + 22; x.font = `700 ${fs}px 'Alegreya Sans', sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.lineWidth = 6; x.strokeStyle = 'rgba(0,0,0,.85)'; x.strokeText(f.txt, c.width/2, c.height/2); x.fillStyle = f.col; x.fillText(f.txt, c.width/2, c.height/2);
  const t = new L.CanvasTexture(c); t.colorSpace = L.SRGBColorSpace;
  const s = new L.Sprite(new L.SpriteMaterial({map:t, transparent:true, depthTest:false, depthWrite:false})); s.renderOrder = 10; const k = (f.big ? .62 : .44) / c.height * 1; s.scale.set(c.width*k, c.height*k, 1);
  S3.scene.add(s); o = {s, t}; S3.fxs.set(f, o); return o;
}
/* ---- one frame: called by drawBattle after the flat board is painted ---- */
function b3dFrame(t){
  const S3 = B3D.S; if (!S3 || !B) return; const L = B3D.lib, T = G.T, H = G.oy || 0, now = performance.now(), RM = REDUCE();
  const w = 8*T, h = 10*T + H, sk = w + 'x' + h + '@' + G.dpr;
  if (sk !== S3.sizeKey) { S3.sizeKey = sk; S3.renderer.setPixelRatio(G.dpr || 1); S3.renderer.setSize(w, h, false); S3.cv3.style.width = w + 'px'; S3.cv3.style.height = h + 'px'; S3.fitKey = ''; }
  b3dGround(); b3dCamera(w, h); S3.tex.needsUpdate = true;
  const lean = -S3.pitch * .38, face = m => { m.rotation.y = S3.yaw; m.rotation.x = lean; };
  S3.objs.forEach(o => o.seen = false); Object.values(S3.pools).forEach(p => p.n = 0);
  // the dead, then the living
  B.units.forEach(u => {
    const d = dispOf(ukey(u), u.x, u.y), boss = (u.boss ? 1.3 : 1) * 1.45, o = b3dCard(ukey(u), 2.1*boss, 2.1*boss), c = o.ctx, s = o.T * o.q, wT = 2.1*boss, hT = 2.1*boss;
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, o.cv.width, o.cv.height); c.setTransform(s/T, 0, 0, s/T, 0, 0);
    const cx = wT*T/2, cy = (o.foot - .41*boss)*T; // drawFigure's feet sit 13 units (about .41 of a square) under its baseline
    if (u.hp > 0) drawUnitFig(c, u, cx, cy, T/32*boss, d, T, t, now, RM, true); else drawCorpse(c, u, cx, cy, T, t, now);
    o.tex.needsUpdate = true;
    let ox = 0, oy = 0; if (B.anim && B.anim.u === u) { const k = (now - B.anim.t0) / (280 * SET.speed); if (k < 1) { const sn = Math.sin(k * Math.PI) * .45; ox = (B.anim.tx - u.x) * sn; oy = (B.anim.ty - u.y) * sn; } }
    o.mesh.position.set(d.x + ox + .5, .01, d.y + oy + .62); face(o.mesh); if (u.hp <= 0) { o.mesh.rotation.x = -Math.PI/2 * .82; o.mesh.position.y = .02; } // a corpse lies on the ground
    o.mesh.material.color.setScalar(b3dLight(u, d));
  });
  // burner fires: flames licking up off the square
  B.fires.forEach(f => { for (let i = 0; i < 3; i++) { const s = b3dSprite('flame', true), fl = RM ? .8 : .7 + Math.sin(t/(70 + i*17) + f.x*3 + i)*.25;
    s.position.set(f.x + .25 + i*.25, .25 + fl*.25 + i*.05, f.y + .5 + Math.sin(i*2.1)*.15); s.scale.set(.55*fl, .9*fl, 1); s.material.color.setRGB(1, .45 + i*.12, .15); s.material.opacity = .75; } });
  // smoke and A Courtesy of Darkness: soft puffs rising over the squares they cover
  (B.smoke || []).filter(m => m.until >= B.round).forEach(m => { const fade = m.until === B.round ? .55 : 1;
    for (let i = 0; i < 2; i++) { const s = b3dSprite('puff', false), ph = (t/(m.dark ? 2600 : 1500) + hash(m.x, m.y, i)) % 1;
      s.position.set(m.x + .3 + hash(m.x, m.y, i + 3)*.4 + (RM ? 0 : Math.sin(t/900 + i)*.08), .25 + ph*.9, m.y + .3 + hash(m.x, m.y, i + 5)*.4); const sz = 1.0 + ph*.6; s.scale.set(sz, sz*.8, 1);
      if (m.dark) s.material.color.setRGB(.16, .1, .32); else s.material.color.setRGB(.6, .58, .55); s.material.opacity = (m.dark ? .5 : .42) * fade * (1 - ph*.6); } });
  // effects: shells in flight, blasts, floating numbers
  B.fx.forEach(f => { if (now < f.t) return; const k = clamp((now - f.t) / (f.dur || 950), 0, 1);
    if (f.kind === 'arc' && k < 1) { const s = b3dSprite('shell', false), x = lerp(f.from.x, f.to.x, k) + .5, z = lerp(f.from.y, f.to.y, k) + .5, y = f.drop ? .4 : .5 + Math.sin(k*Math.PI)*1.9; s.position.set(x, y, z); s.scale.set(.32, .32, 1); s.material.opacity = 1;
      const sp = b3dSprite('spark', true); sp.position.set(x + .06, y + .1, z); sp.scale.set(.18, .18, 1); sp.material.color.setRGB(1, .7, .35); sp.material.opacity = .9; }
    else if (f.kind === 'boom') { const s = b3dSprite('flash', true), r = (f.r + .5) * (0.5 + k*.9); s.position.set(f.x + .5, .4 + k*.5, f.y + .5); s.scale.set(r*2.2, r*1.8, 1); s.material.color.set(f.col || '#ffb060'); s.material.opacity = (1 - k) * .85;
      if (!RM) for (let i = 0; i < 10; i++) { const p = b3dSprite('spark', true), a = hash(i, f.x, f.y)*6.28, sp = (.6 + hash(f.y, i, 7))*(f.r + .6); p.position.set(f.x + .5 + Math.cos(a)*sp*k, .3 + k*(1.6 - k)*1.4*(.5 + hash(i, 2, f.x)), f.y + .5 + Math.sin(a)*sp*k); p.scale.set(.12, .12, 1); p.material.color.set(f.col || '#ffb060'); p.material.opacity = 1 - k; } }
    else if (f.kind === 'txt') { const o = b3dText(f); o.seen = now; o.s.position.set(f.x + .5, 1.25 + k*.55, f.y + .5); o.s.material.opacity = 1 - k*k; } });
  S3.fxs.forEach((o, f) => { if (o.seen !== now) { S3.scene.remove(o.s); o.s.material.dispose(); o.t.dispose(); S3.fxs.delete(f); } });
  // anyone no longer on the field: their card goes
  S3.objs.forEach((o, key) => { if (!o.seen) { S3.scene.remove(o.mesh); o.mesh.geometry.dispose(); o.mesh.material.dispose(); o.tex.dispose(); S3.objs.delete(key); } });
  Object.values(S3.pools).forEach(p => { for (let i = p.n; i < p.list.length; i++) p.list[i].visible = false; });
  S3.renderer.render(S3.scene, S3.camera);
}
