/* ============ v13.58.0: tile art, Book One (David, Nov 19, 2026: the pilot at 8:58 PM PST, then "Yes to all" at 9:56 PM PST; series-polish-plan.md §3c) ============
   The ground and what encloses it redrawn, book by book (TILEART_BOOKS). Book One: its towns, the camp at Pale, the plains and hills, the saps.
   Left as they were: the roofs, Simtal's estate, the lakefront, the dock and the cellar, which draw their own.
   Looks only. The grid, every walkable tile, sight line, trigger and exit are untouched: this paints over the sheet prerender made.
   - Ground is drawn in the map's own space, not tile by tile, so it reads as one surface and not a board.
   - In a town a wall is a building: a roof seen from above, and a front with a window or a door where it faces the street.
   - In open ground a wall is broken masonry and heaped rubble; in a sap it is rock, propped with timber.
   Each tile's own feature (a lamp, a door, a tent, the crater, the pit) is drawn again on top by the old painter, with its flat backing left out. */
const TILEART_BOOKS = ['gotm', 'dg', 'moi', 'hoc', 'mt', 'bh', 'rg', 'tth', 'dod', 'tcg']; // v13.60.0: every book. Only Book One's own styles have a painter here, so in the later books this reaches the maps that borrowed them (Book Eight's Darujhistan, Book Seven's night roads, a sap in Book Three); their own styles (TILEX) were drawn later, to this standard, and are left alone
/* which painter a map gets; null leaves it as it was (roofs, the estate, the lake and the dock draw their own) */
const tileArtKind = (style, tunnel) => !style ? (tunnel ? 'sap' : 'earth') : style.startsWith('city') ? 'city' : style === 'pale' || style === 'camp_night' ? 'earth' : style.startsWith('plain') || style.startsWith('hills') ? 'grass' : null;
const tileArtOn = (battle, style, tunnel) => { try { if (typeof window !== 'undefined' && window.FTR_NOTILEART) return false; return !!S && TILEART_BOOKS.includes(S.book || 'gotm') && !!tileArtKind(style, tunnel); } catch (e) { return false; } };
function tileArt(ctx, map, cols, rows, T, dark, tunnel, style, battle){
  const at = (x, y) => (map[y] || '')[x], wall = (x, y) => at(x, y) === '#', open = (x, y) => at(x, y) !== undefined && !wall(x, y);
  const kind = tileArtKind(style, tunnel), W = cols * T, H = rows * T, night = !!dark || (style || '').endsWith('night'); // a town by night is blue under its lamps; at dusk and by day it is warm grey stone
  const mix = (a, b, k) => { const p = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), A = p(a), Bc = p(b); return `rgb(${A.map((v, i) => Math.round(v + (Bc[i] - v) * k)).join(',')})`; };
  const soft = (x, y, r, col) => { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, col.replace(/[\d.]+\)$/, '0)')); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); };
  const rr = (x, y, w, h, r, fill) => { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
  /* ---- the ground, clipped to everything that is not wall ---- */
  ctx.save(); ctx.beginPath(); for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (!wall(x, y)) ctx.rect(x * T, y * T, T, T); ctx.clip();
  if (kind === 'city') {
    ctx.fillStyle = night ? '#161a22' : '#24221f'; ctx.fillRect(0, 0, W, H);
    const sw = T / 3.05, sh = T / 4.3;
    for (let r = -1; r * sh < H + sh; r++) for (let c = -1; c * sw < W + sw; c++) {
      const cx = c * sw + (r & 1) * sw * .5 + (hash(c, r, 1) - .5) * sw * .14, cy = r * sh + sh * .5 + (hash(c, r, 5) - .5) * sh * .1, k = hash(c, r, 2);
      rr(cx - sw * .46, cy - sh * .42, sw * .92, sh * .84, sh * .3, mix(night ? '#262c38' : '#3a3833', night ? '#3d4654' : '#5c574d', k));
      ctx.fillStyle = night ? 'rgba(190,210,235,.09)' : 'rgba(255,236,205,.08)'; ctx.fillRect(cx - sw * .34, cy - sh * .36, sw * .5, Math.max(1, sh * .12)); // the lit top edge of each stone
      if (k > .93) rr(cx - sw * .46, cy - sh * .42, sw * .92, sh * .84, sh * .3, 'rgba(0,0,0,.35)'); } // a stone sunk or missing
    for (let i = 0; i < cols * rows * .9; i++) soft(hash(i, 81) * W, hash(i, 82) * H, T * (.8 + hash(i, 83) * 1.4), hash(i, 84) > .5 ? (night ? 'rgba(120,150,200,.05)' : 'rgba(255,230,190,.05)') : 'rgba(0,0,0,.16)'); // wet and worn
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (at(x, y) === ',') { const cx = x * T + T * (.4 + hash(x, y, 3) * .2), cy = y * T + T * (.5 + hash(x, y, 4) * .15); // a puddle holding the lamps
      ell(ctx, cx, cy, T * .36, T * .2, 'rgba(8,12,20,.8)', hash(x, y, 6) - .5); ell(ctx, cx - T * .06, cy - T * .03, T * .2, T * .07, 'rgba(120,160,220,.22)', hash(x, y, 6) - .5); ctx.strokeStyle = 'rgba(150,180,225,.2)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, T * .36, T * .2, hash(x, y, 6) - .5, 3.4, 5.6); ctx.stroke(); }
  } else if (kind === 'grass') {
    const dusk = style && style.endsWith('dusk'), g0 = dark ? '#27301f' : dusk ? '#3d4029' : '#44512f', g1 = dark ? '#34402a' : dusk ? '#565a36' : '#5c6c3c';
    ctx.fillStyle = g0; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < cols * rows * 4; i++) soft(hash(i, 61) * W, hash(i, 62) * H, T * (.6 + hash(i, 63) * 1.6), hash(i, 64) > .5 ? (dark ? 'rgba(90,110,70,.10)' : 'rgba(150,170,90,.11)') : 'rgba(0,0,0,.13)'); // the land's own light and dark
    ctx.lineCap = 'round'; ctx.lineWidth = Math.max(1, T * .02);
    for (let i = 0; i < cols * rows * 16; i++) { const x = hash(i, 21) * W, y = hash(i, 22) * H, h = T * (.05 + hash(i, 23) * .09), k = hash(i, 24); ctx.strokeStyle = mix(g0, g1, .4 + k * .9 > 1 ? 1 : .4 + k * .6); ctx.globalAlpha = .8; // blades, leaning one way with the wind
      ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + h * .2, y - h * .6, x + h * .55, y - h); ctx.stroke(); } ctx.globalAlpha = 1;
    for (let i = 0; i < cols * rows * .5; i++) { const x = hash(i, 51) * W, y = hash(i, 52) * H, r = T * (.02 + hash(i, 53) * .035); ell(ctx, x + r * .3, y + r * .5, r * 1.2, r * .6, 'rgba(0,0,0,.3)'); ell(ctx, x, y, r, r * .72, mix('#5a584c', '#8a8676', hash(i, 54))); } // a few stones
    if (!dark) for (let i = 0; i < cols * rows * .35; i++) { const x = hash(i, 31) * W, y = hash(i, 32) * H; ell(ctx, x, y, T * .014, T * .014, hash(i, 33) > .5 ? 'rgba(236,226,170,.8)' : 'rgba(210,190,220,.7)'); } // small flowers by day
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (at(x, y) === ',') for (let i = 0; i < 7; i++) { const gx = x * T + hash(x, y, 32 + i) * T, gy = y * T + T * (.3 + hash(x, y, 40 + i) * .7), h = T * (.16 + hash(x, y, 48 + i) * .14); ctx.strokeStyle = mix(g0, g1, 1); ctx.lineWidth = Math.max(1, T * .025); // long grass
        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.quadraticCurveTo(gx + h * .15, gy - h * .6, gx + h * .4, gy - h); ctx.stroke(); }
  } else {
    const sap = kind === 'sap'; ctx.fillStyle = sap ? '#2a251f' : '#3b342b'; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < cols * rows * 4; i++) soft(hash(i, 61) * W, hash(i, 62) * H, T * (.5 + hash(i, 63) * 1.5), hash(i, 64) > .52 ? `rgba(${sap ? '120,104,86' : '150,128,98'},.09)` : 'rgba(0,0,0,.16)');
    if (!sap) { ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { const y0 = H * (.12 + hash(i, 91) * .76); for (const off of [0, T * .32]) { ctx.strokeStyle = 'rgba(0,0,0,.17)'; ctx.lineWidth = T * .07; ctx.beginPath(); ctx.moveTo(-T, y0 + off); // cart ruts, in pairs
          ctx.bezierCurveTo(W * .3, y0 + off + (hash(i, 92) - .5) * T * 2.4, W * .65, y0 + off + (hash(i, 93) - .5) * T * 2.4, W + T, y0 + off + (hash(i, 94) - .5) * T * 1.6); ctx.stroke(); } } }
    for (let i = 0; i < cols * rows * (sap ? 3.2 : 1.8); i++) { const x = hash(i, 51) * W, y = hash(i, 52) * H, r = T * (.018 + hash(i, 53) * (sap ? .05 : .04)); // stones, each with its lit side
      ell(ctx, x + r * .3, y + r * .5, r * 1.2, r * .6, 'rgba(0,0,0,.35)'); ell(ctx, x, y, r, r * .72, mix(sap ? '#4a4239' : '#5c5346', sap ? '#6a6053' : '#857a68', hash(i, 54))); ell(ctx, x - r * .3, y - r * .25, r * .4, r * .22, 'rgba(255,240,215,.18)'); }
    if (sap) { ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1; for (let i = 0; i < rows * 3; i++) { const y = hash(i, 41) * H, x = hash(i, 42) * W; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + T * .9, y + (hash(i, 43) - .5) * T * .3, x + T * 1.8, y + (hash(i, 44) - .5) * T * .2); ctx.stroke(); } }
    else for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { const n = at(x, y) === ',' ? 5 : hash(x, y, 31) > .7 ? 2 : 0; // grass coming back through the mud
        for (let i = 0; i < n; i++) { const gx = x * T + hash(x, y, 32 + i) * T, gy = y * T + hash(x, y, 40 + i) * T; ctx.strokeStyle = hash(x, y, 48 + i) > .5 ? 'rgba(112,118,70,.75)' : 'rgba(86,96,58,.75)'; ctx.lineWidth = Math.max(1, T * .022); ctx.lineCap = 'round';
          for (let b = -1; b <= 1; b++) { ctx.beginPath(); ctx.moveTo(gx, gy); ctx.quadraticCurveTo(gx + b * T * .03, gy - T * .05, gx + b * T * .06, gy - T * (.09 + hash(i, b + 2, x) * .05)); ctx.stroke(); } } }
  }
  if (dark && kind === 'earth') { ctx.fillStyle = 'rgba(6,6,12,.42)'; ctx.fillRect(0, 0, W, H); } // night over the mud
  ctx.restore();
  /* ---- each tile's own feature, drawn again by the old painter without its flat backing ---- */
  const noBack = (px, py) => new Proxy(ctx, { get(t, k){ if (k === 'fillRect') return (x, y, w, h) => { const fs = t.fillStyle; if (typeof fs === 'string' && fs[0] === '#' && Math.abs(x - px) < .6 && Math.abs(y - py) < .6 && w >= T - .6 && h >= T - .6) return; t.fillRect(x, y, w, h); }; const v = t[k]; return typeof v === 'function' ? v.bind(t) : v; }, set(t, k, v){ t[k] = v; return true; } });
  const plainCh = c => c === '.' || c === ',', near = (x, y) => { for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const c = at(x + dx, y + dy); if (c !== undefined && c !== '#' && !plainCh(c)) return true; } return false; };
  const tm0 = tileMap; tileMap = map; // the terrain kit (025b) reads the map through this, and spills paths and rises onto the plain tiles beside them
  try { for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { const c = at(x, y); if (c === '#') continue; if (plainCh(c) && (kind === 'city' || kind === 'sap' || battle || !near(x, y))) continue; const feat = battle && (c === 't' || c === 'o');
    if (feat) drawFeature(ctx, c, x, y, T, dark, style, map); else if (!tunnel) { ctx.save(); ctx.beginPath(); ctx.rect(x * T, y * T, T, T); ctx.clip(); drawTile(c === 'P' ? ctx : noBack(x * T, y * T), c, x, y, T, dark, tunnel, style); ctx.restore(); } } // the burial pit keeps its dark floor
  } finally { tileMap = tm0; }
  if (kind === 'earth' && map.some(r => r.includes('~')) && typeof drawCrater === 'function') drawCrater(ctx, map, T);
  /* ---- walls ---- */
  const bid = (x, y) => (hash(x >> 2, y >> 2, 5) * 4) | 0; // buildings change every few tiles
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { if (!wall(x, y)) continue; const px = x * T, py = y * T, front = open(x, y + 1), b = bid(x, y);
    ctx.save(); ctx.beginPath(); ctx.rect(px, py, T, T); ctx.clip();
    if (kind === 'city') {
      if (!front) { const base = ['#27303c', '#3a2c2a', '#2b3230', '#33303c'][b & 3], hi = ['#3a4656', '#553c36', '#3e4844', '#48445a'][b & 3]; // a roof from above
        ctx.fillStyle = base; ctx.fillRect(px, py, T, T); const ch = T / 5;
        for (let r = 0; r < 5; r++) { const yy = py + r * ch; for (let c = -1; c < 5; c++) { const xx = px + c * (T / 4) + ((r + y) & 1) * T / 8; ctx.fillStyle = mix(base, hi, hash(x * 5 + c, y * 5 + r, 3)); ctx.fillRect(xx + .5, yy + .5, T / 4 - 1, ch - 1); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(xx + T / 4 - 1, yy, 1, ch); }
          ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px, yy + ch - 1, T, 1); ctx.fillStyle = 'rgba(200,215,235,.07)'; ctx.fillRect(px, yy, T, 1); }
        const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, 'rgba(180,200,230,.10)'); g.addColorStop(1, 'rgba(0,0,0,.22)'); ctx.fillStyle = g; ctx.fillRect(px, py, T, T);
        if (!wall(x, y - 1) || open(x, y - 1)) { ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(px, py, T, T * .07); } // the far eave
        { const up = wall(x, y - 1) || at(x, y - 1) === undefined, dn = wall(x, y + 1) && !open(x, y + 2) || at(x, y + 1) === undefined, lf = wall(x - 1, y), rt = wall(x + 1, y), vert = (up || dn) && !lf && !rt, top = !wall(x, y - 1); // the ridge, and the slope away from the light: one ridge a building, on its far row, or down the middle of a single file of roofs
          if (vert) { const g2 = ctx.createLinearGradient(px, 0, px + T, 0); g2.addColorStop(0, 'rgba(190,210,240,.10)'); g2.addColorStop(.5, 'rgba(190,210,240,.02)'); g2.addColorStop(.5, 'rgba(0,0,0,.2)'); g2.addColorStop(1, 'rgba(0,0,0,.34)'); ctx.fillStyle = g2; ctx.fillRect(px, py, T, T); ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(px + T * .5 - 1.5, py, 3, T); ctx.fillStyle = 'rgba(210,225,245,.2)'; ctx.fillRect(px + T * .5 - 2.5, py, 1, T); }
          else if (!top) { ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(px, py, T, T); }
          else { const g2 = ctx.createLinearGradient(0, py, 0, py + T); g2.addColorStop(0, 'rgba(190,210,240,.10)'); g2.addColorStop(.45, 'rgba(190,210,240,.02)'); g2.addColorStop(.45, 'rgba(0,0,0,.2)'); g2.addColorStop(1, 'rgba(0,0,0,.34)'); ctx.fillStyle = g2; ctx.fillRect(px, py, T, T); ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(px, py + T * .45 - 1.5, T, 3); ctx.fillStyle = 'rgba(210,225,245,.2)'; ctx.fillRect(px, py + T * .45 - 2.5, T, 1); } }
        if (hash(x, y, 77) > .86 && wall(x, y - 1)) { const cx = px + T * (.3 + hash(x, y, 78) * .4), cy = py + T * .4; ctx.fillStyle = '#1c1614'; ctx.fillRect(cx - T * .13, cy - T * .12, T * .26, T * .24); ctx.fillStyle = '#4a3a34'; ctx.fillRect(cx - T * .13, cy - T * .12, T * .26, T * .05); ctx.fillStyle = '#050404'; ctx.fillRect(cx - T * .07, cy - T * .05, T * .14, T * .1); // a chimney, cold or not
          soft(cx + T * .1, cy - T * .25, T * .3, 'rgba(170,180,200,.10)'); } }
      else { const body = ['#3c3430', '#34363c', '#40382c', '#38323a'][b & 3], lite = ['#52463e', '#474a52', '#574c3a', '#4c4450'][b & 3]; // a front, facing the street
        ctx.fillStyle = body; ctx.fillRect(px, py, T, T); const bh = T / 7;
        for (let r = 0; r < 7; r++) for (let c = -1; c < 4; c++) { const xx = px + c * (T / 3) + (r & 1) * T / 6; ctx.fillStyle = mix(body, lite, hash(x * 4 + c, y * 7 + r, 9)); ctx.fillRect(xx + .5, py + r * bh + .5, T / 3 - 1, bh - 1); }
        ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(px, py, T, T * .13); { const g = ctx.createLinearGradient(0, py + T * .13, 0, py + T * .4); g.addColorStop(0, 'rgba(0,0,0,.45)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(px, py + T * .13, T, T * .27); } // the eave and its shadow
        ctx.fillStyle = '#23201e'; ctx.fillRect(px, py + T * .88, T, T * .12); ctx.fillStyle = 'rgba(160,170,190,.12)'; ctx.fillRect(px, py + T * .88, T, 1); // the stone footing
        const pick = hash(x, y, 21);
        if (pick < .2) { rr(px + T * .3, py + T * .34, T * .4, T * .56, T * .18, '#0e0b09'); rr(px + T * .34, py + T * .39, T * .32, T * .51, T * .14, '#3a2a1c'); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(px + T * .495, py + T * .4, 1.5, T * .5); ell(ctx, px + T * .6, py + T * .66, T * .022, T * .022, '#c8a860'); } // a door
        else if (pick < .86) { const lit = hash(x, y, 22) > .58, wx = px + T * .28, wy = py + T * .36, ww = T * .44, wh = T * .36; ctx.fillStyle = '#17120e'; ctx.fillRect(wx - T * .03, wy - T * .03, ww + T * .06, wh + T * .06);
          if (lit) { const g = ctx.createLinearGradient(0, wy, 0, wy + wh); g.addColorStop(0, '#f2cd7a'); g.addColorStop(1, '#c98a3a'); ctx.fillStyle = g; } else ctx.fillStyle = '#131a26'; ctx.fillRect(wx, wy, ww, wh);
          if (!lit) { ctx.fillStyle = 'rgba(140,170,220,.16)'; ctx.beginPath(); ctx.moveTo(wx, wy + wh * .7); ctx.lineTo(wx + ww * .5, wy); ctx.lineTo(wx + ww * .75, wy); ctx.lineTo(wx, wy + wh); ctx.fill(); }
          ctx.fillStyle = '#17120e'; ctx.fillRect(wx + ww * .5 - 1, wy, 2, wh); ctx.fillRect(wx, wy + wh * .5 - 1, ww, 2); ctx.fillStyle = '#2c241c'; ctx.fillRect(wx - T * .05, wy + wh + T * .02, ww + T * .1, T * .04); } // a window, some of them lit
      }
    } else if (kind === 'grass') { // a thicket: leaf on leaf, lit from the upper left, dark underneath
      ctx.restore(); ctx.save(); ctx.beginPath(); ctx.rect(px - (wall(x - 1, y) ? T * .3 : 0), py - (wall(x, y - 1) ? T * .3 : 0), T * (1 + (wall(x - 1, y) ? .3 : 0) + (wall(x + 1, y) ? .3 : 0)), T * (1 + (wall(x, y - 1) ? .3 : 0) + (wall(x, y + 1) ? .3 : 0))); ctx.clip();
      ctx.fillStyle = dark ? '#0f1710' : '#18241a'; ctx.fillRect(px, py, T, T);
      for (let i = 0; i < 11; i++) { const sx = px + hash(x, y, 400 + i) * T, sy = py + hash(x, y, 410 + i) * T, r = T * (.14 + hash(x, y, 420 + i) * .14), k = hash(x, y, 430 + i);
        ell(ctx, sx + r * .15, sy + r * .3, r * 1.05, r * .85, 'rgba(0,0,0,.45)'); ell(ctx, sx, sy, r, r * .8, mix(dark ? '#17251a' : '#22381f', dark ? '#2b4428' : '#3f6030', k)); ell(ctx, sx - r * .3, sy - r * .3, r * .5, r * .32, dark ? 'rgba(150,190,120,.10)' : 'rgba(200,230,140,.16)'); }
      if (front) { const g = ctx.createLinearGradient(0, py + T * .6, 0, py + T); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)'); ctx.fillStyle = g; ctx.fillRect(px, py + T * .6, T, T * .4); }
    } else if (kind === 'earth') {
      ctx.fillStyle = '#211d19'; ctx.fillRect(px, py, T, T);
      if (front) { const bh = T * .2; let top = []; for (let i = 0; i <= 6; i++) top.push(py + T * (.08 + hash(x * 6 + i, y, 15) * .3)); // a broken wall, its top knocked off unevenly
        ctx.beginPath(); ctx.moveTo(px, py + T); top.forEach((ty, i) => ctx.lineTo(px + i * T / 6, ty)); ctx.lineTo(px + T, py + T); ctx.closePath(); ctx.save(); ctx.clip();
        for (let r = 0; r < 6; r++) for (let c = -1; c < 3; c++) { const xx = px + c * (T / 2.4) + (r & 1) * T / 4.8; ctx.fillStyle = mix('#4a433a', '#6e6556', hash(x * 3 + c, y * 6 + r, 16)); ctx.fillRect(xx + .5, py + r * bh + .5, T / 2.4 - 1.5, bh - 1.5); }
        const g = ctx.createLinearGradient(0, py, 0, py + T); g.addColorStop(0, 'rgba(255,236,205,.10)'); g.addColorStop(1, 'rgba(0,0,0,.4)'); ctx.fillStyle = g; ctx.fillRect(px, py, T, T); ctx.restore();
        ctx.strokeStyle = 'rgba(230,214,186,.3)'; ctx.lineWidth = 1; ctx.beginPath(); top.forEach((ty, i) => i ? ctx.lineTo(px + i * T / 6, ty) : ctx.moveTo(px, ty)); ctx.stroke(); }
      for (let i = 0; i < (front ? 4 : 13); i++) { const sx = px + hash(x, y, 100 + i) * T, sy = front ? py + T * (.84 + hash(x, y, 120 + i) * .14) : py + hash(x, y, 120 + i) * T, r = T * (front ? .05 : .06 + hash(x, y, 140 + i) * .11); // fallen stone
        ell(ctx, sx + r * .25, sy + r * .45, r * 1.15, r * .7, 'rgba(0,0,0,.45)'); rr(sx - r, sy - r * .7, r * 2, r * 1.4, r * .35, mix('#40392f', '#6a6152', hash(x, y, 160 + i))); ctx.fillStyle = 'rgba(255,238,210,.14)'; ctx.fillRect(sx - r * .8, sy - r * .62, r * 1.3, Math.max(1, r * .2)); }
      if (!front && hash(x, y, 190) > .72) { ctx.save(); ctx.translate(px + T * .5, py + T * .5); ctx.rotate(hash(x, y, 191) * 3); ctx.fillStyle = '#2a1e14'; ctx.fillRect(-T * .42, -T * .04, T * .84, T * .08); ctx.fillStyle = 'rgba(255,220,170,.12)'; ctx.fillRect(-T * .42, -T * .04, T * .84, 1.5); ctx.restore(); } // a charred beam
    } else {
      ctx.fillStyle = '#1c1916'; ctx.fillRect(px, py, T, T); // rock, in lumps
      for (let i = 0; i < 9; i++) { const sx = px + hash(x, y, 300 + i) * T, sy = py + hash(x, y, 310 + i) * T * (front ? .5 : 1), r = T * (.12 + hash(x, y, 320 + i) * .16); ell(ctx, sx + r * .2, sy + r * .3, r * 1.1, r * .8, 'rgba(0,0,0,.5)'); ell(ctx, sx, sy, r, r * .72, mix('#2c2824', '#48413a', hash(x, y, 330 + i)), hash(x, y, 340 + i)); ell(ctx, sx - r * .3, sy - r * .25, r * .45, r * .2, 'rgba(255,236,205,.10)'); }
      ctx.strokeStyle = 'rgba(90,80,68,.3)'; ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) { ctx.beginPath(); const y0 = py + hash(x, y, 200 + i) * T; ctx.moveTo(px, y0); ctx.quadraticCurveTo(px + T * .5, y0 + (hash(x, y, 210 + i) - .5) * T * .4, px + T, y0 + (hash(x, y, 220 + i) - .5) * T * .3); ctx.stroke(); }
      for (let i = 0; i < 4; i++) soft(px + hash(x, y, 230 + i) * T, py + hash(x, y, 240 + i) * T, T * .3, 'rgba(110,98,84,.16)');
      if (front) { const g = ctx.createLinearGradient(0, py + T * .35, 0, py + T); ctx.fillStyle = '#3a342d'; ctx.fillRect(px, py + T * .5, T, T * .5); for (let i = 0; i < 4; i++) { ctx.fillStyle = mix('#342e28', '#544b40', hash(x, y, 350 + i)); ctx.fillRect(px + i * T / 4 + .5, py + T * .5 + (i & 1) * T * .04, T / 4 - 1, T * .5); } ctx.fillStyle = 'rgba(255,236,205,.16)'; ctx.fillRect(px, py + T * .5, T, 1.5); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.4)'); ctx.fillStyle = g; ctx.fillRect(px, py + T * .5, T, T * .5); // the face, catching what light there is
        if (hash(x, y, 250) > .35) { const tx = px + T * (.2 + hash(x, y, 251) * .5); ctx.fillStyle = '#4a3622'; ctx.fillRect(tx, py + T * .52, T * .11, T * .48); ctx.fillStyle = '#5e462c'; ctx.fillRect(tx - T * .12, py + T * .46, T * .35, T * .09); ctx.fillStyle = 'rgba(255,225,180,.18)'; ctx.fillRect(tx, py + T * .55, 1.5, T * .45); ctx.fillRect(tx - T * .12, py + T * .46, T * .35, 1.5); } } // a prop and its cap
    }
    if (dark && kind === 'earth') { ctx.fillStyle = 'rgba(6,6,12,.45)'; ctx.fillRect(px, py, T, T); }
    ctx.restore(); }
  /* lit windows throw their light on the street */
  if (kind === 'city') for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (wall(x, y) && open(x, y + 1)) { const pick = hash(x, y, 21); if (pick >= .2 && pick < .86 && hash(x, y, 22) > .58) { const cx = x * T + T * .5, cy = (y + 1) * T + T * .2; const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, T * 1.1); g.addColorStop(0, 'rgba(240,190,100,.20)'); g.addColorStop(1, 'rgba(240,190,100,0)'); ctx.save(); ctx.beginPath(); ctx.rect(0, (y + 1) * T, W, T * 1.4); ctx.clip(); ctx.fillStyle = g; ctx.fillRect(cx - T * 1.1, cy - T * 1.1, T * 2.2, T * 2.2); ctx.restore(); } }
  /* the shadow a wall lays on the ground below it */
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (!wall(x, y) && wall(x, y - 1)) { const g = ctx.createLinearGradient(0, y * T, 0, y * T + T * .5); g.addColorStop(0, 'rgba(0,0,0,.42)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x * T, y * T, T, T * .5); }
}
{ const _prerender = prerender; prerender = function(map, cols, rows, dark, tunnel, style, battle){ _prerender(map, cols, rows, dark, tunnel, style, battle);
    try { const {bctx, T} = G; if (!bctx || !tileArtOn(battle, style, tunnel)) return; tileArt(bctx, map, cols, rows, T, dark, tunnel, style, battle); if (typeof mapRelief === 'function') mapRelief(bctx, map, cols, rows, T, dark, style, battle); } catch (e) { console.warn('tile art', e); } };
  prerender.base = _prerender.base || _prerender; }
