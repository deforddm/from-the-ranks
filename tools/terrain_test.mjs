// The terrain kit and the ambient folk (v13.22, David, Nov 15, 2026: "many spaces feel extremely empty… raised hills at the edges…
// buildings or townsfolk… make things feel less barren"). For EVERY explore area in every book:
//   - the kit's characters (src/025b_terrain.js) stay reserved: never a trigger, and the impassable ones never in an area's walk;
//   - from the start tile, every trigger and way out (at least one of its tiles) and every person (a tile beside them) can be reached,
//     with every person standing in the way and every ambient figure's whole wander ground counted as blocked;
//   - ambient folk stand on plain walkable ground: never a trigger, the start or a person, with a known figure, a name and a line.
// For the areas in tools/terrain_base.json (the maps as they were before the pass, frozen):
//   - no route from the start to any of those grew by more than 4 steps;
//   - the bare ground ('.' and ',' with nobody on it) is 45–60% of the map, and there is no 5x5 patch of it.
// Then each dressed area is opened in the page, drawn, and one figure tapped: a line in the log, no flag set, no page error.
// Usage: node tools/terrain_test.mjs            (build first; exit 1 on a failure)
//        node tools/terrain_test.mjs --freeze=id1,id2   (before dressing an area: add its current map to terrain_base.json)
import { server, browser as launch, openGame, root } from './page.mjs';
import fs from 'fs';
import path from 'path';
const BASE = path.join(root, 'tools', 'terrain_base.json');
const KIT = '1234567890@%$&!_:*', KIT_WALK = '_:*';
const arg = k => { const a = process.argv.find(a => a.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : null; };
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const areas = await page.evaluate(() => {
  const where = {}; Object.entries(BOOKSNAP).forEach(([b, s]) => Object.entries(s.ch || {}).forEach(([n, CH]) => (CH.areas || (CH.area ? [CH.area] : [])).forEach(a => { where[a.id] ??= [b, +n]; })));
  Object.entries(CHAPTERS).forEach(([n, CH]) => (CH.areas || (CH.area ? [CH.area] : [])).forEach(a => { where[a.id] ??= [BOOK, +n]; }));
  return Object.values(AREAS).map(a => ({ id:a.id, decor:a.decor, map:a.map, walk:a.walk, trig:Object.keys(a.triggers || {}), start:a.start, where:where[a.id] || null,
    npcs:(a.npcs || []).map(n => ({id:n.id, x:n.x, y:n.y})), folkAvoid:a.folkAvoid || '_', folk:(a.folk || []).map(f => ({x:f.x, y:f.y, kind:f.kind, name:f.name, line:f.line, wander:f.wander || 0, kindOk:typeof FIGX[f.kind] === 'function'})) }));
});
const src18 = fs.readFileSync(path.join(root, 'src/018_figure_sprites.js'), 'utf8');
const caseKinds = new Set([...src18.matchAll(/case '([a-z_0-9]+)'/g)].map(m => m[1]));
const base = fs.existsSync(BASE) ? JSON.parse(fs.readFileSync(BASE, 'utf8')) : {};
if (arg('freeze')) {
  for (const id of arg('freeze').split(',')) { const a = areas.find(x => x.id === id); if (!a) { console.log('no area ' + id); continue; } if (base[id] && !process.argv.includes('--force')) { console.log('kept ' + id + ' (frozen already)'); continue; }
    base[id] = { map:a.map, walk:a.walk, trig:a.trig, start:a.start, npcs:a.npcs }; console.log('froze ' + id); }
  fs.writeFileSync(BASE, '{\n' + Object.entries(base).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n') + '\n}\n');
  await br.close(); srv.kill(); process.exit(0);
}
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const DIRS = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
const cheb = (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
/* walkable for the squad: the game's palePass, with every person and every figure's wander ground standing in the way */
function grid(a, folk) {
  const H = a.map.length, W = a.map[0].length, at = (x, y) => (y >= 0 && y < H && x >= 0 && x < W) ? a.map[y][x] : '#';
  const blocked = new Set(a.npcs.map(n => n.x + ',' + n.y));
  (folk || []).forEach(f => { for (let dy = -f.wander; dy <= f.wander; dy++) for (let dx = -f.wander; dx <= f.wander; dx++) { const x = f.x + dx, y = f.y + dy, c = at(x, y);
    if (dx || dy) { if (c === '#' || !a.walk.includes(c) || a.trig.includes(c) || (a.folkAvoid || '_').includes(c) || a.npcs.some(n => n.x === x && n.y === y)) continue; } blocked.add(x + ',' + y); } }); // where they can go, as 25b's folkFree lets them
  const pass = (x, y) => { const c = at(x, y); return c !== '#' && (a.walk.includes(c) || a.trig.includes(c)) && !blocked.has(x + ',' + y); };
  const d = new Map([[a.start.x + ',' + a.start.y, 0]]), q = [[a.start.x, a.start.y]];
  while (q.length) { const [x, y] = q.shift(), k = d.get(x + ',' + y); for (const [dx, dy] of DIRS) { const nx = x + dx, ny = y + dy, kk = nx + ',' + ny; if (d.has(kk) || !pass(nx, ny)) continue; d.set(kk, k + 1); q.push([nx, ny]); } }
  return { d, at, W, H, blocked };
}
/* the targets: each trigger character (its nearest tile), each person (the nearest tile beside them) */
function targets(a, g) {
  const out = {};
  const near = (x, y) => { let best = Infinity; for (const [dx, dy] of DIRS) { const v = g.d.get((x + dx) + ',' + (y + dy)); if (v !== undefined) best = Math.min(best, v); } return cheb(a.start, {x, y}) <= 1 ? 0 : best; };
  for (const c of a.trig) { let best = Infinity, seen = false; a.map.forEach((r, y) => [...r].forEach((ch, x) => { if (ch !== c) return; seen = true; const v = g.d.get(x + ',' + y); if (v !== undefined) best = Math.min(best, v);
    else if (a.npcs.some(n => n.x === x && n.y === y)) best = Math.min(best, near(x, y)); })); if (seen) out['trigger ' + c] = best; } // a trigger with somebody standing on it (Book One's fires) is reached beside them
  for (const n of a.npcs) { let best = Infinity; for (const [dx, dy] of [[0,0], ...DIRS]) { const v = g.d.get((n.x + dx) + ',' + (n.y + dy)); if (v !== undefined && (dx || dy)) best = Math.min(best, v); } if (cheb(a.start, n) <= 1) best = 0; out['npc ' + n.id] = best; }
  return out;
}
const bare = (a) => { const occ = new Set([...a.npcs, ...(a.folk || [])].map(p => p.x + ',' + p.y)); let n = 0, t = 0; const B = a.map.map((r, y) => [...r].map((c, x) => { t++; const b = (c === '.' || c === ',') && !occ.has(x + ',' + y); if (b) n++; return b; }));
  let patch = null; for (let y = 0; y + 5 <= B.length && !patch; y++) for (let x = 0; x + 5 <= B[0].length && !patch; x++) { let all = true; for (let j = 0; j < 5 && all; j++) for (let i = 0; i < 5 && all; i++) all = B[y + j][x + i]; if (all) patch = `${x},${y}`; }
  return { pct:Math.round(n / t * 100), patch }; };

/* ---- 1. the kit's characters are reserved, and every area can be walked ---- */
const unreach = [];
for (const a of areas) {
  const kt = a.trig.filter(c => KIT.includes(c)); if (kt.length) ok(false, `${a.id}: kit character(s) ${kt.join('')} used as a trigger`);
  const kw = [...a.walk].filter(c => KIT.includes(c) && !KIT_WALK.includes(c)); if (kw.length) ok(false, `${a.id}: impassable kit character(s) ${kw.join('')} in walk`);
  const kn = KIT_WALK.split('').filter(c => a.map.some(r => r.includes(c)) && !a.walk.includes(c)); if (kn.length) ok(false, `${a.id}: walkable kit character(s) ${kn.join('')} on the map but not in walk`);
  const g = grid(a, a.folk), t = targets(a, g), bad = Object.entries(t).filter(([, v]) => v === Infinity).map(([k]) => k);
  if (bad.length) unreach.push(`${a.id}: ${bad.join(', ')}`);
}
ok(!unreach.length, `every area (${areas.length}): every trigger, way out and person reachable from the start${unreach.length ? '\n       ' + unreach.join('\n       ') : ''}`);
/* ---- 2. ambient folk ---- */
const folkBad = [];
for (const a of areas) for (const f of a.folk) {
  const c = (a.map[f.y] || '')[f.x];
  if (c === undefined || !a.walk.includes(c) || a.trig.includes(c)) folkBad.push(`${a.id}: ${f.name} at ${f.x},${f.y} on '${c}' (not plain walkable ground)`);
  if (f.x === a.start.x && f.y === a.start.y) folkBad.push(`${a.id}: ${f.name} on the start`);
  if (a.npcs.some(n => cheb(n, f) === 0)) folkBad.push(`${a.id}: ${f.name} on a person`);
  if (!f.kindOk && !caseKinds.has(f.kind)) folkBad.push(`${a.id}: ${f.name}: no figure '${f.kind}'`);
  const L = Array.isArray(f.line) ? f.line : [f.line];
  if (!f.name || !L.length || L.some(l => typeof l !== 'string' || !l.trim())) folkBad.push(`${a.id}: a figure with no name or no line`);
  if (L.some(l => /!/.test(l))) folkBad.push(`${a.id}: ${f.name}: an exclamation mark`);
  if (f.wander > 2) folkBad.push(`${a.id}: ${f.name} wanders ${f.wander} (2 at most)`);
}
const nFolk = areas.reduce((s, a) => s + a.folk.length, 0);
ok(!folkBad.length, `ambient folk (${nFolk} in ${areas.filter(a => a.folk.length).length} areas): on plain ground, off triggers, the start and people, with a figure, a name and a line${folkBad.length ? '\n       ' + folkBad.join('\n       ') : ''}`);
/* ---- 3. the dressed areas against their frozen maps ---- */
for (const [id, old] of Object.entries(base)) {
  const a = areas.find(x => x.id === id); if (!a) { ok(false, `${id}: frozen but no longer an area`); continue; }
  ok(a.map.length === old.map.length && a.map.every((r, y) => r.length === old.map[y].length), `${id}: same size (${old.map[0].length}x${old.map.length})`);
  ok(a.start.x === old.start.x && a.start.y === old.start.y && JSON.stringify(a.npcs) === JSON.stringify(old.npcs), `${id}: the start and every person where they were`);
  const moved = []; old.map.forEach((r, y) => [...r].forEach((c, x) => { const n = a.map[y][x]; if ((old.trig.includes(c) || old.trig.includes(n)) && c !== n) moved.push(`${x},${y} '${c}'->'${n}'`); }));
  ok(!moved.length, `${id}: every trigger tile and way out where it was${moved.length ? ' — ' + moved.join(' ') : ''}`);
  const g0 = grid({ ...old, folk:[] }, []), t0 = targets({ ...old }, g0), g1 = grid(a, a.folk), t1 = targets(a, g1);
  const grew = Object.keys(t0).filter(k => t1[k] > t0[k] + 4).map(k => `${k} ${t0[k]}->${t1[k]}`), worst = Math.max(0, ...Object.keys(t0).filter(k => t1[k] !== Infinity).map(k => t1[k] - t0[k]));
  ok(!grew.length, `${id}: no route from the start grew by more than 4 (worst +${worst}; ${Object.keys(t0).map(k => `${k.replace(/^(trigger|npc) /, '')} ${t0[k]}→${t1[k]}`).join(', ')})${grew.length ? ' — ' + grew.join(', ') : ''}`);
  const b0 = bare({ map:old.map, npcs:old.npcs, folk:[] }), b1 = bare(a);
  ok(b1.pct >= 45 && b1.pct <= 60 && !b1.patch, `${id}: bare ground ${b0.pct}% -> ${b1.pct}% (45–60), no 5x5 empty patch${b1.patch ? ' — one at ' + b1.patch : ''}`);
}
/* ---- 4. each dressed area drawn in the page, and one figure tapped ---- */
const dressed = areas.filter(a => base[a.id] && a.where);
const tapped = await page.evaluate(async (ids) => {
  const NEW = {gotm:newState, dg:newStateDG, moi:newStateMOI, hoc:newStateHOC, mt:newStateMT, bh:newStateBH, rg:newStateRG, tth:newStateTTH, dod:newStateDOD, tcg:newStateTCG}, out = [];
  for (const [id, b, n] of ids) { setBook(b); S = NEW[b]('Terrain'); S.chapter = n; S.log = []; save(); startExplore(id); await new Promise(r => setTimeout(r, 120));
    const r = {id, drawn:!!G.cv && G.cv.width > 0, folk:folkNow().length};
    const p = folkNow()[0]; if (p) { const f0 = JSON.stringify(S.f), s0 = S.silver, i0 = JSON.stringify(S.inv || S.pack || null); S.pos = {x:p.x + 1, y:p.y}; // beside them: the tap needs no walk
      exploreTap(p.x, p.y); await new Promise(r => setTimeout(r, 400)); r.line = (S.log[0] || ''); r.same = JSON.stringify(S.f) === f0 && S.silver === s0 && JSON.stringify(S.inv || S.pack || null) === i0; r.sheet = $('#sheet').hidden; }
    out.push(r); }
  return out; }, dressed.map(a => [a.id, ...a.where]));
for (const r of tapped) ok(r.drawn && (!r.folk || (/<em>.+:<\/em> "/.test(r.line) && r.same && r.sheet)), `${r.id}: drawn${r.folk ? `; ${r.folk} figures, one tapped: "${r.line.replace(/<[^>]+>/g, '')}", no flag, no silver, no item, no talk opened` : ' (no figures)'}`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
process.exit(fail);
