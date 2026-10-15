// v6.4.1: a squadmate who is in the squad but not here is not heard, not drawn behind the sergeant, and does not roll.
// Book Two, Chapter 3: Tangle goes over the river with Mincer's sappers the night before Gelor Ridge and walks back in at dusk.
// Flagged in play: at the dead trees on the Shallows, "Tangle, low: Somebody here's still waiting on a word" while Tangle was in the ramp.
// Usage: node tools/away_test.mjs   (build first; exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);

const r = await ev(() => { setBook('dg'); S = newStateDG('Hask'); S.chapter = 3; S.lvl = 3; S.chain = {water:6, column:20}; migrate(S);
  S.f.b2_shDone = 1; S.f.b2_tangleAway = 1; S.area = 'b2_shallows'; save();
  const o = {inSquad:SQUAD().includes('tangle')};
  // every way the waiting-word line can pick its speaker: many node ids, with a fresh figure waiting
  const A = AREAS.b2_shallows; A.npcs.push({id:'_t', name:'Captain Test', kind:'b2soldier', x:0, y:0, node:()=>'_tnode', fresh:()=>S.f._t !== 1});
  const ch = [{t:'Go', go:()=>startBattle('b2_ring', {}), onward:true}, {t:'Not yet.', go:()=>startExplore()}];
  const said = new Set(); for (let i = 0; i < 400; i++) { const l = unspokenLine('n' + i + String.fromCharCode(65 + i % 26), ch); const m = /^(\w+), low/.exec(l); if (m) said.add(m[1]); }
  o.said = [...said].join(',');
  o.rollers = checkers({check:['wits', 12]}).join(',');
  o.away = mateAway('tangle');
  S.f.b2_tangleBack = 1; o.back = !mateAway('tangle') && checkers({check:['wits', 12]}).includes('tangle');
  const said2 = new Set(); for (let i = 0; i < 400; i++) { const m = /^(\w+), low/.exec(unspokenLine('n' + i + String.fromCharCode(65 + i % 26), ch)); if (m) said2.add(m[1]); } o.said2 = [...said2].join(',');
  A.npcs.pop(); return o; });
ok(r.inSquad && r.away, 'Tangle is still in the squad, and away in the ramp');
ok(r.said && !/Tangle/.test(r.said), `the waiting word comes from someone who is there (${r.said})`);
ok(!/tangle/.test(r.rollers), `he does not roll a check while away (${r.rollers})`);
ok(r.back && /Tangle/.test(r.said2), 'back at dusk: he speaks and rolls again');
ok(!errors.length, `no page errors${errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''}`);
await br.close(); srv.kill(); process.exit(fail);
