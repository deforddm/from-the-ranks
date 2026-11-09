// v10.3 (David, Nov 8, 2026): tricks that don't strike are free, one free trick a squadmate a turn; Blood-Iron, the Long Listen
// and the Pilot's Eye are passive (no button, on at the start of the fight); group heals and Mend: only the aimed heal leaves a ward.
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const o = await page.evaluate(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms)), r = {};
  r.free = V103_FREE.filter(k => !(AB[TRICKS[k].ab] && AB[TRICKS[k].ab].free));
  r.passive = V103_PASSIVE.filter(k => !(AB[TRICKS[k].ab] && AB[TRICKS[k].ab].passive));
  r.stillAction = ['bluefire', 'rime', 'b3_c1_call', 'song', 'b5_c5_mark', 'b6_c2_weather', 'b7_c4_horse', 'b4_c4_bola', 'b6_c7_wall'].filter(k => AB[TRICKS[k].ab] && AB[TRICKS[k].ab].free);
  r.words = /does not use the action/.test(TRICKS.line.fx) && /Always on/.test(TRICKS.b3_c5_blood.fx);
  // Book One: the Line is free, and only one free trick a turn
  S = newState('Hask'); S.chapter = 3; S.lvl = 4; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; migrate(S);
  S.tricks = {line:{who:'brisk'}, cant:{who:'brisk'}}; save();
  startBattle('knives', {}); await wait(700);
  const bk = B.units.find(u => u.id === 'brisk'); B.cur = bk; B.busy = false; B.acted = false; B.turn++;
  r.lineOk = abOk(bk, 't_line'); useAb('t_line', bk.x, bk.y);
  r.acted = B.acted; r.dbg = [bk.freeTrick, B.turn, B.cur === bk, abOk(bk, "t_cant")]; r.cantAfter = abOk(bk, "t_cant");
  B.turn++; B.cur = bk; B.acted = false; r.cantNext = abOk(bk, 't_cant');
  B.over = true; B = null;
  // Book Three: Blood-Iron on its own at the start, no button
  S = newState('Hask'); S.book = 'moi'; S.chapter = 5; S.lvl = 9; migrate(S);
  const id = SQUAD().find(x => x !== 'sgt'); S.tricks = {b3_c5_blood:{who:id}}; save();
  const fid = Object.keys(BATTLES).find(k => /^b3_c5/.test(k)) || 'knives';
  startBattle(fid, {}); await wait(800);
  const u = B && B.units.find(v => v.id === id);
  r.blood = {fid, iron:u && u.bloodIron, button:u && u.ab.includes('t_b3_c5_blood'), used:B && B.used.t_b3_c5_blood};
  B.over = true; B = null; view = 'title';
  return r;
});
ok(!o.free.length, `the 17 non-striking tricks are free: ${o.free.join(',') || 'all'}`);
ok(!o.passive.length, `the three passives: ${o.passive.join(',') || 'all'}`);
ok(!o.stillAction.length, `strikes, Rime, the Herd-Call and the group heals still use the action: ${o.stillAction.join(',') || 'all'}`);
ok(o.words, 'the words say free and always on');
ok(o.lineOk && !o.acted, `the Line does not use Brisk's action: acted ${o.acted}`);
ok(!o.cantAfter, `a second free trick the same turn is refused: ${JSON.stringify(o.dbg)}`);
ok(o.cantNext, 'and allowed on the next turn');
ok(o.blood.iron > 0 && !o.blood.button && o.blood.used, `Blood-Iron is on from the start, no button: ${JSON.stringify(o.blood)}`);
ok(!errors.length, `no page errors: ${errors.slice(0, 3).join(' | ')}`);
await br.close(); srv.kill();
process.exit(fail || errors.length ? 1 : 0);
