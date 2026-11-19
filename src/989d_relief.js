/* v13.54.0 (David, Nov 19, 2026: "more impressive maps"). The relief pass: every walk-around area and every battle board,
   after its tiles are laid, gets the light a drawn map has. Walls stand up: the light comes from the upper left, so a wall
   throws a soft shadow onto the ground to its right as well as below it, the corner between two walls is darker, and a
   wall's lit edges carry a thin rim while its far edges carry a dark one. The sheet's edges fall off a little, so the eye
   stays on the middle. Looks only: no tile, no walkability, no sight line and no number changes; prerender's own drawing
   is untouched and runs first. The estate boards (Book One's garden and terrace) draw their own light and are left alone. */
function mapRelief(ctx, map, cols, rows, T, dark, style, battle){
  const at = (x, y) => (map[y] || '')[x], wall = (x, y) => at(x, y) === '#', k = dark ? .8 : 1;
  const lin = (x0, y0, x1, y1, a, rx, ry, rw, rh) => { const g = ctx.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(rx, ry, rw, rh); };
  const rad = (cx, cy, r, a, rx, ry) => { const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(rx, ry, T, T); };
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { const px = x * T, py = y * T;
    if (!wall(x, y)) {
      const n = wall(x, y - 1), w = wall(x - 1, y);
      if (w) lin(px, 0, px + T * .42, 0, .34 * k, px, py, T * .42, T); // the wall to the west throws its shadow east
      if (!n && !w && wall(x - 1, y - 1)) rad(px, py, T * .5, .3 * k, px, py); // a wall's corner, seen from the south-east
      if (n && w) rad(px, py, T * .8, .28 * k, px, py); // the inside of a corner
      if (wall(x + 1, y)) lin(px + T, 0, px + T * .86, 0, .16 * k, px + T * .86, py, T * .14, T); // a little dark where the ground meets any wall
      if (wall(x, y + 1)) lin(0, py + T, 0, py + T * .86, .16 * k, px, py + T * .86, T, T * .14);
      continue; }
    // a wall: lit edges north and west, dark edges south and east, only where it faces open ground
    if (at(x, y - 1) !== undefined && !wall(x, y - 1)) { ctx.fillStyle = `rgba(255,238,206,${dark ? .07 : .13})`; ctx.fillRect(px, py, T, Math.max(1, T * .045)); }
    if (at(x - 1, y) !== undefined && !wall(x - 1, y)) { ctx.fillStyle = `rgba(255,238,206,${dark ? .045 : .08})`; ctx.fillRect(px, py, Math.max(1, T * .045), T); }
    if (at(x + 1, y) !== undefined && !wall(x + 1, y)) { ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(px + T - Math.max(1, T * .05), py, Math.max(1, T * .05), T); }
    if (at(x, y + 1) !== undefined && !wall(x, y + 1)) { ctx.fillStyle = 'rgba(0,0,0,.34)'; ctx.fillRect(px, py + T - Math.max(1, T * .06), T, Math.max(1, T * .06)); } }
  const W = cols * T, H = rows * T, e = T * (battle ? .9 : 1.5), a = (battle ? .16 : .26) * k; // the sheet's edges
  lin(0, 0, e, 0, a, 0, 0, e, H); lin(W, 0, W - e, 0, a, W - e, 0, e, H); lin(0, 0, 0, e, a, 0, 0, W, e); lin(0, H, 0, H - e, a, 0, H - e, W, e);
}
{ const _prerender = prerender; prerender = function(map, cols, rows, dark, tunnel, style, battle){ _prerender(map, cols, rows, dark, tunnel, style, battle);
    const {bctx, T} = G; if (!bctx || (style && style.startsWith('estate'))) return; mapRelief(bctx, map, cols, rows, T, dark, style, battle); };
  prerender.base = _prerender; }
