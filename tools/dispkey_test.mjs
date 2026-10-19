// v6.9.1: every unit keeps its own display slot for the whole fight. A slot was keyed by the unit's index in B.units, so once a
// unit was taken out of the list mid-fight (Book Three Ch4: a starving one dragged back alive) the next arrival (the round-2 wave)
// was given a slot another unit already drew in, and the two were painted on one square, jittering between their tiles, and a tap
// on the figure found nobody. Usage: node tools/dispkey_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const r = await page.evaluate(async () => { const wait = ms => new Promise(r => setTimeout(r, ms)); const out = {}; try {
  const settle = async () => { for (let i = 0; i < 60 && !(B && B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100); };
  const shared = () => { const by = {}; B.units.filter(u => u.hp > 0).forEach(u => (by[ukey(u)] ??= []).push(`${u.name}@${u.x},${u.y}`)); return Object.entries(by).filter(([, v]) => v.length > 1).map(([k, v]) => k + ': ' + v.join(' + ')); };
  const drawnApart = () => B.units.filter(u => u.hp > 0).every(u => { const d = G.disp[ukey(u)]; return !d || (Math.abs(d.x - u.x) < .01 && Math.abs(d.y - u.y) < .01); });
  // Book Three, Chapter 4, the stake line: a starving one goes down under the flat and is taken out of the list; then the wave
  setBook('moi'); S = newStateMOI('Hask'); S.lvl = 11; S.xp = LEVELS[10]; S.chapter = 4; S.f.b3_c1_key = 'crate'; S.f.b3_c2_key = 'herd'; S.f.b3_c3_key = 'camps'; S.chapters = {1:'crate', 2:'herd', 3:'camps'}; S.ally = {trust:6, dread:3}; S.f.b3_domin = 1; S.f.b3_sohraDone = 1; if (!S.squad.includes('sohra')) S.squad.push('sohra'); migrate(S); S.inv = {sharper:2, burner:1, cusser:1, salve:2, smoker:1}; save();
  startBattle('b3_c4_breakout', {}); await settle(); B.busy = true; B.over = true; await wait(300);
  out.before = B.units.length; out.sharedBefore = shared();
  const st = foes().find(f => f.spare); st.b3Last = 'flat'; hurt(st, 99); out.removed = !B.units.includes(st);
  const st2 = foes().find(f => f.spare); st2.b3Last = 'flat'; hurt(st2, 99); out.removed2 = !B.units.includes(st2);
  B.over = false; B.round = 1; B.idx = 99; newRound(); B.over = true; await wait(400);
  out.after = B.units.length; out.arrived = out.after - (out.before - 2); out.sharedAfter = shared();
  await wait(600); out.apart = drawnApart(); // every living unit is painted on its own tile once the frames settle
  // the slot is kept across a unit's whole life: a new unit never takes a key in use
  const keys = B.units.map(u => ukey(u)); out.unique = new Set(keys).size === keys.length;
  // Book One too: a wave in a plain fight gets fresh slots
  S = newState('Hask'); S.chapter = 1; S.lvl = 2; migrate(S); save(); startBattle(Object.keys(BATTLES).find(id => (BATTLES[id].waves || []).length) || 'stone', {}); await settle(); B.busy = true; B.over = true; await wait(300);
  const n0 = B.units.length; B.over = false; B.round = (B.def.waves && B.def.waves[0] ? B.def.waves[0].round - 1 : 1); B.idx = 99; newRound(); B.over = true; await wait(300);
  const k1 = B.units.map(u => ukey(u)); out.book1 = {grew:B.units.length > n0, unique:new Set(k1).size === k1.length, shared:shared()};
  } catch (e) { out.err = e.stack.split('\n').slice(0, 3).join(' | '); } return out; });
console.log(JSON.stringify(r));
ok(!r.err, 'no error in the page script' + (r.err ? ': ' + r.err : ''));
ok(r.removed && r.removed2, 'two spared starving are taken out of the unit list');
ok(r.arrived === 3, `the round-2 wave lands its three (${r.arrived})`);
ok(r.sharedBefore && r.sharedBefore.length === 0 && r.sharedAfter && r.sharedAfter.length === 0, `no two living units share a display slot (${(r.sharedAfter || []).join('; ') || 'none'})`);
ok(r.unique, 'every unit\'s slot is unique for the fight');
ok(r.apart, 'every living unit is painted on its own tile');
ok(r.book1 && r.book1.grew && r.book1.unique && r.book1.shared.length === 0, `a Book One wave gets fresh slots too (${JSON.stringify(r.book1)})`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
