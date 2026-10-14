// v6.1.2: a "yes, but" with no cost of its own never takes silver. Might pays in skin (health off the next fight), Wits and Guile rattle the roller.
// Usage: node tools/yesbut_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, mobile: true, touch: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, arg) => page.evaluate(f, arg);

const o = await ev(async () => { const wait = ms => new Promise(r => setTimeout(r, ms));
  S = newState('Hask'); S.silver = 20; save();
  const near = (stat, who) => settleRoll({who, stat, tier:'near', ok:true, pass:true, margin:-1, nat:9}, {check:[stat, 12]});
  near('might', 'brisk'); const m = {silver:S.silver, bruised:(S.bruised || {}).brisk};
  near('wits', 'kettle'); const w = {silver:S.silver, rattled:!!S.rattled.kettle};
  near('guile', 'tuft'); const g = {silver:S.silver, rattled:!!S.rattled.tuft};
  // a scene's own near: still wins
  settleRoll({who:'sgt', stat:'might', tier:'near', ok:true, pass:true, margin:-1, nat:9}, {check:['might', 12], near:{t:'own cost', fx:()=>{ S.f.ownNear = 1; }}});
  const own = {flag:S.f.ownNear, bruisedSgt:(S.bruised || {}).sgt};
  startBattle('guild_roofs', {}); await wait(500);
  const b = B.units.find(u => u.id === 'brisk'); const bt = {down:b.maxhp - b.hp, cleared:!S.bruised.brisk, log:B.log.some(l => /still sore/.test(l))};
  return {m, w, g, own, bt, nb:bruiseN()}; });
ok(o.m.silver === 20 && o.m.bruised === o.nb, `Might: no silver, ${o.nb} health owed (${JSON.stringify(o.m)})`);
ok(o.w.silver === 20 && o.w.rattled, 'Wits: no silver, rattled');
ok(o.g.silver === 20 && o.g.rattled, 'Guile: no silver, rattled');
ok(o.own.flag === 1 && !o.own.bruisedSgt, 'a scene\'s own "yes, but" replaces the fallback');
ok(o.bt.down >= o.nb && o.bt.cleared && o.bt.log, `the next fight starts ${o.bt.down} health down, then it's paid (${JSON.stringify(o.bt)})`);

// Dryj Spring: the round-by-the-gully check has its own cost now
const d = await ev(() => { const node = DLG.b2_spring_wait();
  const c = node && node.ch.find(x => x.check); return c ? {has:!!(c.near && c.near.fx), t:typeof c.near.t} : {err:'node not found'}; });
ok(d.has, `Dryj Spring's gully check carries its own "yes, but" (${JSON.stringify(d)})`);

ok(!errors.length, `no page errors (${errors.slice(0, 3).join(' | ')})`);
await br.close(); srv.kill();
process.exit(fail || errors.length ? 1 : 0);
