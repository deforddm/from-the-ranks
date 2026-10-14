// v6.1.1: Tracker's Mark is a free action (it does not use the action) on a recharge: 2 rounds, 1 from level 6.
// Usage: node tools/mark_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, mobile: true, touch: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, arg) => page.evaluate(f, arg);

const run = lvl => ev(async lvl => { const wait = ms => new Promise(r => setTimeout(r, ms));
  S = newState('Hask'); S.lvl = lvl; S.squad = ['sgt','brisk','kettle','tuft','ohl','ellis']; migrate(S); S.lvl = lvl; save();
  startBattle('guild_roofs', {}); await wait(600);
  for (let i = 0; i < 60 && !(B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100);
  window.endTurn = () => {}; B.smoke = [];
  const e = B.units.find(u => u.id === 'ellis'), f = foes()[0];
  // put Ellis two tiles from the foe, in the open
  const spot = DIRS.map(([dx, dy]) => ({x:f.x + dx * 2, y:f.y + dy * 2})).find(p => p.x >= 0 && p.x < 8 && p.y >= 0 && p.y < 10 && free(p.x, p.y, e) && sees(p, f));
  if (spot) { e.x = spot.x; e.y = spot.y; }
  B.cur = e; B.acted = false; B.moved = false; B.mvLeft = e.mv; B.busy = false; B.mode = 'act';
  const r0 = B.round, okBefore = abOk(e, 'mark'), free0 = !!AB.mark.free;
  useAb('mark', f.x, f.y); await wait(500);
  const out = { free0, okBefore, acted:B.acted, marked:f.markedUntil >= B.round, dmg:f.markDmg, desc:AB.mark.desc(),
    canShoot:!B.acted && foes().some(t => cheb(e, t) <= e.rng && canShoot(e, t)), cd:[] };
  for (let d = 0; d <= 3; d++) { B.round = r0 + d; foes().forEach(t => t.markedUntil = -1); out.cd.push(abOk(e, 'mark')); }
  B.round = r0; return out; }, lvl);

const a = await run(1);
ok(a.free0, 'Tracker\'s Mark is flagged free');
ok(a.okBefore && a.marked, `Ellis marks a foe (${a.marked})`);
ok(a.acted === false && a.canShoot, 'marking leaves her action: she can still shoot');
ok(a.dmg === 2, `+2 damage at level 1 (${a.dmg})`);
ok(JSON.stringify(a.cd) === '[false,false,false,true]', `level 1: usable again three rounds on (2-round recharge) ${JSON.stringify(a.cd)}`);
ok(/does not use the action/.test(a.desc) && /Recharges after 2 rounds/.test(a.desc), `desc: ${a.desc}`);
const b = await run(6);
ok(JSON.stringify(b.cd) === '[false,false,true,true]', `level 6: 1-round recharge ${JSON.stringify(b.cd)}`);
ok(b.dmg === 3, `+3 damage at level 6 (${b.dmg})`);
ok(/Recharges after 1 round\./.test(b.desc), `desc at 6: ${b.desc}`);

ok(!errors.length, `no page errors (${errors.slice(0, 3).join(' | ')})`);
await br.close(); srv.kill();
process.exit(fail || errors.length ? 1 : 0);
