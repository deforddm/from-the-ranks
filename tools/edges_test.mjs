// v13.66.0 (David, Nov 23, 2026: "some areas where enemies should be able to fall to their death due to forced movement aren't
// working"). The Low Walk and the canal bridges: the '#' drawn as the canal is a drop. The footbridge and Book Seven's bridge have
// water on both sides. The wayhouse roof and the landing ledge have an edge. The counting-house stair is a room with walls.
// Each fight is started (second stage where named); the drop tiles must be drops, nobody may start on one, and a foe driven
// onto one must either catch the lip (prone, alive, where it stood) or be out of the fight. Usage: node tools/edges_test.mjs
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const CASES = [ // id, stage, a drop tile, a wall tile that must stay solid (or null), the word in the log
  ['b5_c1_lowwalk', 1, [0, 4], null, 'the canal'], ['b5_c7_court', 1, [0, 4], null, 'the canal'], ['b5_c7_wolves', 2, [7, 4], null, 'the canal'],
  ['b7_c2_bridge', 1, [1, 4], null, 'the canal'], ['b7_c7_bridge', 1, [7, 4], null, 'the canal'],
  ['b8_c5_knives', 2, [0, 4], [0, 0], 'the drop off the roof'], ['b3_c6_landing', 1, [7, 4], [0, 0], 'the drop'],
  ['b7_c7_streets', 2, null, [0, 4], ''] ];
const r = await page.evaluate(async (CASES) => {
  const out = [], wait = ms => new Promise(res => setTimeout(res, ms));
  const mk = { 3: ['moi', 'newStateMOI'], 5: ['mt', 'newStateMT'], 7: ['rg', 'newStateRG'], 8: ['tth', 'newStateTTH'] };
  for (const [id, stage, drop, wall, word] of CASES) {
    const [bk, fn] = mk[+id.match(/^b(\d+)_/)[1]];
    try { setBook(bk); S = eval(fn + "('Edge')"); S.picksDue = []; startBattle(id, stage === 2 ? { stage: 2 } : {}); } catch (e) { out.push(`${id}: would not start (${e.message})`); continue; }
    await wait(60); $('#modal').hidden = true;
    if (!B) { out.push(`${id}: no battle`); continue; }
    B.units.forEach(u => { if (pitAt(u.x, u.y) || solid(u.x, u.y)) out.push(`${id}: ${u.name} starts on a drop or a wall at ${u.x},${u.y}`); });
    (B.def.waves || []).forEach(w => w.foes.forEach(f => { if (pitAt(f[1], f[2])) out.push(`${id}: a wave foe arrives on a drop at ${f[1]},${f[2]}`); }));
    if (wall && !solid(wall[0], wall[1])) out.push(`${id}: ${wall} should be a wall`);
    if (!drop) { let n = 0; for (let y = 0; y < 10; y++) for (let x = 0; x < 8; x++) if (pitAt(x, y)) n++; if (n) out.push(`${id}: ${n} drop tiles on a board that should have none`); B.over = true; continue; }
    if (!pitAt(drop[0], drop[1])) { out.push(`${id}: ${drop} is not a drop`); B.over = true; continue; }
    if (edgeWord(drop[0], drop[1]) !== word) out.push(`${id}: the drop is called "${edgeWord(drop[0], drop[1])}", not "${word}"`);
    let over = 0, caught = 0;
    for (let i = 0; i < 30; i++) { const f = B.units.find(u => u.side === 'e' && u.hp > 0); if (!f) break; const was = { x: f.x, y: f.y };
      const fell = await overEdge(f, { x: drop[0], y: drop[1] }, 'driven');
      if (fell) { over++; if (f.hp > 0) out.push(`${id}: ${f.name} went over and is still up`); }
      else { caught++; if (!f.prone || f.hp <= 0 || f.x !== was.x || f.y !== was.y) out.push(`${id}: ${f.name} caught the lip but is not prone where it stood`); f.prone = false; }
      if (over && caught) break; }
    if (!over) out.push(`${id}: nothing went over in 30 tries`);
    B.over = true; await wait(20); }
  // the chance itself: a soldier goes over 66 times in a hundred and a leader 33, whatever its attack
  if (EDGE_FALL.soldier !== 66 || EDGE_FALL.leader !== 33) out.push('the fall chances are not 66 and 33');
  setBook('tth'); S = newStateTTH('Edge'); S.picksDue = []; S.diff = 'bridgeburner'; startBattle('b8_c5_knives', { stage: 2 }); await wait(60); $('#modal').hidden = true;
  for (const boss of [false, true]) { let over = 0; const N = 600;
    for (let i = 0; i < N; i++) { const f = B.units.find(u => u.side === 'e'); f.hp = f.maxhp; f.boss = boss; f.atk = 40; f.prone = false; f.fell = false; const was = { x: f.x, y: f.y }; if (await overEdge(f, { x: 0, y: 4 }, 'driven')) { over++; f.x = was.x; f.y = was.y; } }
    const pct = Math.round(100 * over / N), want = boss ? 33 : 66; if (Math.abs(pct - want) > 7) out.push(`${boss ? 'a leader' : 'a soldier'} with attack 40 went over ${pct}% of ${N} times, not about ${want}%`); }
  // fire, bleeding and a slam grow with the squad's level on an enemy, never on the squad
  { const e = B.units.find(u => u.side === 'e'), p = B.units.find(u => u.side === 'p'); S.lvl = 22; if (wearDmg(e) !== lvDmg() || lvDmg() < 5) out.push(`an enemy's burn, bleed or slam adds ${wearDmg(e)} at level 22, not the level's damage bonus (${lvDmg()})`); if (wearDmg(p) !== 0) out.push('the squad takes the level bonus from fire or bleeding'); }
  B.over = true;
  return out;
}, CASES);
await br.close(); srv.kill();
if (errors.length) r.push('page errors: ' + errors.join(' | '));
if (r.length) { console.log('FAIL\n  ' + r.join('\n  ')); process.exit(1); }
console.log(`edges_test: ${CASES.length} fights: PASS`);
