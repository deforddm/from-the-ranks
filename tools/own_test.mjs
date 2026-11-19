// v13.53.0: a recruit's own armour is a piece of kit; reach says what it does.
// Usage: node tools/own_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, mobile: true, touch: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const d = await page.evaluate(() => { const out = {}; const ids = ownIds(); ownArt();
  out.n = ids.length; out.noItem = ids.filter(k => !ITEMS[ownKey(k)]); out.noArt = ids.filter(k => !ART['item/' + ownKey(k)]); out.regular = OWN_REGULARS.filter(k => ITEMS[ownKey(k)]);
  out.ac = {brask:ITEMS.own_brask.ac, vell:ITEMS.own_vell.ac, doss:ITEMS.own_doss.ac, keth:ITEMS.own_warlock && ITEMS.own_warlock.ac};
  S = newState('Hask'); S.lvl = 6; migrate(S); S.squad = ['sgt','brisk','kettle','tuft','ohl']; S.picksDue = [];
  const u0 = TPL.vell.ac; recruit('vell'); out.join = {kit:S.kit.includes('own_vell'), worn:Object.values(S.gear.vell || {}).includes('own_vell'), ac:mkParty('vell', 0, 0).ac - u0 - lvAc(), only:canWear('vell', 'own_vell') && !canWear('brisk', 'own_vell'), line:itemStatLine('own_vell')};
  unrecruit('vell'); recruit('vell'); out.again = S.kit.filter(k => k === 'own_vell').length;
  // it never displaces a piece already worn
  S.squad = S.squad.filter(k => k !== 'vell'); S.kit = S.kit.filter(k => k !== 'own_vell'); S.gear.vell = {armour:'scoutcloak'}; S.kit.push('scoutcloak'); S.camp = (S.camp || []).filter(k => k !== 'vell'); recruit('vell'); out.keeps = S.gear.vell.armour;
  // a save from before
  const old = JSON.parse(JSON.stringify(S)); delete old.ownGiven; old.kit = old.kit.filter(k => !k.startsWith('own_')); old.gear.vell = {}; const m = migrate(old); out.old = {kit:m.kit.includes('own_vell'), worn:Object.values(m.gear.vell).includes('own_vell'), once:(migrate(JSON.parse(JSON.stringify(m))).kit.filter(k => k === 'own_vell').length)};
  const rk = Object.keys(ITEMS).find(k => ITEMS[k].reach); out.reach = itemStatLine(rk); S.f.reachTold = 0; S.kit = S.kit.filter(k => k !== rk); gain(rk); out.told = S.f.reachTold;
  return out; });
ok(d.n >= 30 && d.noItem.length === 0 && d.noArt.length === 0 && d.regular.length === 0, `every recruit (${d.n}) has their own armour with a picture; the regulars have none (${d.noItem} ${d.noArt} ${d.regular})`);
ok(d.ac.brask === 2 && d.ac.doss === 2 && d.ac.vell === 1 && d.ac.keth === 1, `+2 in mail or heavier, +1 for the rest (${JSON.stringify(d.ac)})`);
ok(d.join.kit && d.join.worn && d.join.ac === 1 && d.join.only && /armour \+1/.test(d.join.line), `Vell joins wearing his, and only he can (${JSON.stringify(d.join)})`);
ok(d.again === 1, 'leaving and coming back does not give a second');
ok(d.keeps === 'scoutcloak', `it never displaces a piece already worn (${d.keeps})`);
ok(d.old.kit && d.old.worn && d.old.once === 1, `a save from before is given it once (${JSON.stringify(d.old)})`);
ok(/strikes 2 tiles away/.test(d.reach) && d.told === 1, `reach says what it does, and the first reach weapon found explains it (${d.reach})`);
ok(errors.length === 0, `no page errors (${errors.slice(0, 3).join(' | ')})`);
await br.close(); process.exit(fail);
