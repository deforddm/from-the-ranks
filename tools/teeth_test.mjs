// v6.4: the Land's Teeth (Keth, Book Two) comes up out of the ground under its target: no bolt crosses the field. The ground splits,
// a mouth of fangs erupts round the target, snaps shut as the blow lands, grinds and sinks, and the spirits rise out of the hole;
// a held enemy keeps stone fingers round its ankles. Deep Ground opens smaller mouths under the enemies next to it. Reduced motion
// still shows it, still. Screenshots of each beat go to tools/out/teeth-*.png (with --shots).
// Usage: node tools/teeth_test.mjs [--shots]   (build first; exit 1 on a failure or a page error)
import fs from 'fs';
import path from 'path';
import { server, browser as launch, openGame, root } from './page.mjs';
const shots = process.argv.includes('--shots');
const srv = await server(); const br = await launch();
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };

async function run(motion, deep) {
  const { page, errors } = await openGame(br, srv.url, { settings: { master: 0, music: 0, sfx: 0, amb: 0, speed: 1, motion, shake: true } });
  const ev = (f, a) => page.evaluate(f, a);
  await ev(deep => { setBook('dg'); S = newStateDG('Hask'); S.chapter = 5; S.lvl = 6; S.xp = LEVELS[5]; S.chain = {water:6, column:20}; S.squad.push('warlock');
    if (deep) S.picks.warlock = ['deepground']; migrate(S); save(); }, deep);
  const pre = await ev(deep => { startBattle('b2_spring', {}); const k = B.units.find(u => u.id === 'warlock'), fs = foes();
    B.units.filter(u => u.side === 'p' && u !== k).forEach((u, i) => { u.x = i; u.y = 9; });
    fs.forEach((f, i) => { f.x = 7 - (i % 2); f.y = i; });
    const f = fs[0]; k.x = 3; k.y = 7; f.x = 3; f.y = 3; f.ac = -50; f.hp = f.maxhp = 200; if (deep && fs[1]) { fs[1].x = 4; fs[1].y = 3; fs[1].hp = fs[1].maxhp = 200; }
    B.cur = k; B.busy = false; window._f = f; window._hp0 = f.hp; window._bolts = 0;
    const push = B.fx.push.bind(B.fx); B.fx.push = (...a) => { a.forEach(x => { if (x.kind === 'bolt') window._bolts++; }); return push(...a); };
    window._t0 = performance.now(); window._hitAt = null; const _h = hurt; hurt = function(u, n, c){ if (u === window._f && window._hitAt == null) window._hitAt = performance.now() - window._t0; return _h(u, n, c); };
    window._done = false; const p = AB.b2_teeth.run(k, f.x, f.y); window._promise = !!(p && p.then); if (p && p.then) p.then(() => { window._done = true; });
    const t = B.fx.filter(x => x.kind === 'teeth'); window._tfx = t[0]; return {teeth:t.length, dur:t[0] && t[0].dur, x:f.x, y:f.y}; }, deep);
  const at = {};
  const box = await page.evaluate(() => { const c = document.querySelector('#bcv') || document.querySelector('canvas'); const r = c.getBoundingClientRect(); return {x:r.x, y:r.y, w:r.width, h:r.height}; });
  const beats = motion === 'off' ? [['still', 250]] : [['split', 300], ['rise', 520], ['snap', 650], ['grind', 860], ['sink', 1250]];
  let t0 = 0;
  for (const [name, ms] of beats) { await page.waitForTimeout(ms - t0); t0 = ms;
    at[name] = await ev(() => ({hp:window._f.hp, teeth:B.fx.filter(x => x.kind === 'teeth').length}));
    if (shots) { fs.mkdirSync(path.join(root, 'tools/out'), { recursive: true });
      await page.screenshot({ path: path.join(root, `tools/out/teeth-${motion}${deep ? '-deep' : ''}-${name}.png`), clip: { x: box.x + box.w*.15, y: box.y + box.h*.12, width: box.w*.7, height: box.h*.5 } }); } }
  await page.waitForTimeout(900);
  const post = await ev(() => { const f = window._f; return {dmg:window._hp0 - f.hp, held:f.earthUntil >= B.round && f.slowTurn, bolts:window._bolts, done:window._done, promise:window._promise,
    hitAt:window._hitAt, snapAt:(t => t && (t.t - window._t0) + t.dur*.4)(B.fx.find(x => x.kind === 'teeth') || window._tfx), nheld:foes().filter(x => x.earthUntil >= B.round).length, left:B.fx.filter(x => x.kind === 'teeth').length}; });
  if (shots) await page.screenshot({ path: path.join(root, `tools/out/teeth-${motion}${deep ? '-deep' : ''}-held.png`), clip: { x: box.x + box.w*.15, y: box.y + box.h*.12, width: box.w*.7, height: box.h*.5 } });
  await page.context().close();
  return { pre, at, post, errors };
}

const a = await run('on', false);
ok(a.pre.teeth === 1 && a.post.bolts === 0, `one mouth opens under the target and nothing crosses the field (${a.pre.teeth} mouths, ${a.post.bolts} bolts)`);
ok(a.post.hitAt != null && Math.abs(a.post.hitAt - a.post.snapAt) < 80, `the blow lands on the snap, not before (${Math.round(a.post.hitAt)} ms; the jaws close at ${Math.round(a.post.snapAt)} ms)`);
ok(a.post.dmg > 0, `it bites (${a.post.dmg} damage)`);
ok(a.post.held && a.post.promise && a.post.done, 'what it bit is held by the feet, and the turn waited for the bite');
ok(a.post.left === 0, 'the jaws go back into the ground');
const d = await run('on', true);
ok(d.pre.teeth >= 2 && d.post.nheld >= 2 && d.post.bolts === 0, `Deep Ground: smaller mouths under the enemies next to it (${d.pre.teeth} mouths, ${d.post.nheld} held)`);
const r = await run('off', false);
ok(r.pre.teeth === 1 && r.post.dmg > 0 && r.post.held && r.post.done, 'reduced motion: the same bite, without the motion');
const errs = [...a.errors, ...d.errors, ...r.errors];
ok(!errs.length, `no page errors${errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''}`);
await br.close(); srv.kill(); process.exit(fail);
