// v7.2.1 (David, Oct 27: "some tiles are impassable or block sight inexplicably"): Kettle's opening sharper changes tiles (the racks
// come down, the eaves, the spoil-heap, the roots, the timber), but the board was painted before preFx ran, so the new walls were
// invisible. Every battle with a preFx is started with the sharper; each tile it turned solid must be repainted and drawn (a heap with a
// look, or the drop on a roof), and the painted board must differ there from the floor it was. Usage: node tools/pretile_test.mjs
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const r = await page.evaluate(async () => {
  const wait = ms => new Promise(res => setTimeout(res, ms));
  const out = [], seen = [];
  const sample = (x, y) => { const T = G.T, d = G.dpr || 1, px = G.bctx.getImageData(Math.round((x + .3) * T * d), Math.round((y + .3) * T * d), Math.max(1, Math.round(T * .4 * d)), Math.max(1, Math.round(T * .5 * d))).data; let s = 0; for (let i = 0; i < px.length; i += 4) s += px[i] + px[i + 1] + px[i + 2]; return s / (px.length / 4); };
  for (const [id, def] of Object.entries(BATTLES)) {
    if (!def || !def.preFx || !/preTile\(/.test(String(def.preFx))) continue;
    const bk = id.startsWith('b4_') ? 'hoc' : id.startsWith('b3_') ? 'moi' : id.startsWith('b2_') ? 'dg' : 'gotm';
    try { setBook(bk); S = bk === 'hoc' ? newStateHOC('Tile') : bk === 'moi' ? newStateMOI('Tile') : bk === 'dg' ? newStateDG('Tile') : newState('Tile'); } catch (e) { out.push(`${id}: no state (${e.message})`); continue; }
    S.inv = Object.assign(S.inv || {}, {sharper: 3});
    const base = def.map.slice();
    try { startBattle(id, {}); } catch (e) { out.push(`${id}: no plain start (${e.message})`); continue; }
    await wait(30); if (!B || !G.bctx) { out.push(`${id}: no board`); continue; }
    const before = {}; for (let y = 0; y < base.length; y++) for (let x = 0; x < base[y].length; x++) before[x + ',' + y] = sample(x, y);
    B.over = true;
    try { startBattle(id, {pre: true}); } catch (e) { out.push(`${id}: no sharper start (${e.message})`); continue; }
    await wait(30);
    if (B.retile) out.push(`${id}: the board was not repainted after the sharper`);
    const map = B.def.map; let n = 0;
    for (let y = 0; y < base.length; y++) for (let x = 0; x < base[y].length; x++) {
      const was = base[y][x], now = map[y][x]; if (was === now) continue; n++;
      if (now === '#' && !dropStyle() && !(B.heaps || []).some(h => h.x === x && h.y === y)) out.push(`${id}: (${x},${y}) turned solid with no look (preTile needs a 4th argument)`);
      const d = Math.abs(sample(x, y) - before[x + ',' + y]);
      if (d < 5) out.push(`${id}: (${x},${y}) changed ${was}→${now} but the board looks the same there (Δ${d.toFixed(1)})`); }
    seen.push(`${id} ${n}`); B.over = true; }
  return {out, seen}; });
let fail = 0;
for (const l of r.out) { fail = 1; console.log('FAIL ' + l); }
if (r.seen.length < 6) { fail = 1; console.log('FAIL only ' + r.seen.length + ' sharper fights found: ' + r.seen.join(', ')); }
if (!fail) console.log(`ok   every tile a sharper changes is repainted and visible (${r.seen.join(', ')})`);
await br.close(); srv.kill(); process.exit(fail);
