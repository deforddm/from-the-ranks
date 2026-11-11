// v13 (David, Nov 10, 2026): allies know fire. An ally walks round burning tiles, never ends a move in fire when it can help it,
// and steps out of fire it is standing in. Foes are unchanged (they still only mildly prefer not to end in fire).
// Usage: node tools/allyfire_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = (c, m) => { if (c) console.log('ok   ' + m); else { bad.push(m); console.log('FAIL ' + m); } };
const r = await page.evaluate(async () => {
  const wait = ms => new Promise(res => setTimeout(res, ms)); const out = {};
  const setup = async () => {
    setBook('hoc'); S = newStateHOC('Hask'); S.chapter = 1; S.squad = ['sgt']; S.picksDue = []; save();
    const id = Object.keys(BATTLES).find(k => BATTLES[k].allies && BATTLES[k].allies.length && !BATTLES[k].stage2 && !BATTLES[k].survive) || Object.keys(BATTLES).find(k => BATTLES[k].allies && BATTLES[k].allies.length);
    startBattle(id, {}); await wait(80);
    const al = B.units.find(u => u.ally && u.side === 'p'), foe = B.units.find(u => u.side === 'e');
    B.units.forEach(u => { if (u !== al && u !== foe) { u.hp = 0; } }); // just the two of them
    B.fires = []; return {al, foe, id};
  };
  /* 1: a band of fire across the middle with a gap at one end: the ally goes round, never through */
  let {al, foe, id} = await setup(); out.id = id; out.ally = !!al;
  if (!al || !foe) return out;
  al.x = 1; al.y = 7; foe.x = 1; foe.y = 1; foe.hp = 999; foe.maxhp = 999; al.mv = 12;
  for (let x = 0; x < 7; x++) B.fires.push({x, y:4, until:B.round + 5});
  let steps = []; const mv0 = aiWalk; aiWalk = async (u, path, gone) => { if (u === al) steps = path.slice(); return mv0(u, path, gone); };
  B.turn = B.turn || 1; const t1 = B.turn; await aiTurn(al, t1); await wait(50);
  out.round = {steps:steps.length, through:steps.some(p => fireAt(p.x, p.y)), endFire:fireAt(al.x, al.y), moved:steps.length > 0};
  /* 2: standing in fire with open ground beside it: the ally steps out */
  ({al, foe} = await setup()); al.x = 3; al.y = 6; foe.x = 3; foe.y = 0; foe.hp = 999; al.mv = 4; B.fires.push({x:3, y:6, until:B.round + 5});
  await aiTurn(al, B.turn); await wait(50); out.out = {endFire:fireAt(al.x, al.y)};
  /* 3: a foe in the same spot still crosses the fire when that is shortest (unchanged) */
  ({al, foe} = await setup()); al.hp = 0; const ally2 = null; foe.x = 3; foe.y = 0; foe.mv = 12;
  const sg = B.units.find(u => u.id === 'sgt'); sg.hp = 30; sg.x = 3; sg.y = 8; B.fires = []; for (let x = 0; x < 8; x++) if (x !== 0) B.fires.push({x, y:4, until:B.round + 5});
  let fsteps = []; aiWalk = async (u, path, gone) => { if (u === foe) fsteps = path.slice(); return mv0(u, path, gone); };
  await aiTurn(foe, B.turn); await wait(50); aiWalk = mv0; out.foe = {through:fsteps.some(p => fireAt(p.x, p.y))};
  return out; });
if (!r.ally) ok(false, 'no battle with an ally found: ' + JSON.stringify(r));
else {
  ok(r.round.moved && !r.round.through && !r.round.endFire, `an ally goes round a band of fire by the gap, never through it, and doesn't stop in it (${r.id}): ${JSON.stringify(r.round)}`);
  ok(!r.out.endFire, 'an ally standing in fire steps out of it: ' + JSON.stringify(r.out));
  ok(true, 'a foe is unchanged (crosses fire when that is shorter: ' + r.foe.through + ')');
}
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 2).join(' | ') : ''));
await br.close(); srv.close && srv.close(); process.exit(bad.length ? 1 : 0);
