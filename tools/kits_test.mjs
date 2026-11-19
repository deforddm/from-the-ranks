// v13.51: the later books' recruits stop doubling the squad's shield. Their new kits, the second blow, and the level-12 talent they keep.
// Usage: node tools/kits_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, mobile: true, touch: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = f => page.evaluate(f);

// ---- the sheets ----
const sh = await ev(() => { const bash = Object.keys(TPL).filter(k => (TPL[k].ab || []).includes('bash')); const kit = k => (TPL[k].ab || []).join(',');
  return {bash, kits:{brannoc:kit('brannoc'), darrut:kit('darrut'), ottar:kit('ottar'), doss:kit('doss'), edrem:kit('edrem'), brask:kit('brask'), brennet:kit('brennet'), pruss:kit('pruss'), tirren:kit('tirren'), vell:kit('vell')},
    missing:Object.keys(TPL).flatMap(k => (TPL[k].ab || []).filter(a => !AB[a]).map(a => k + ':' + a)),
    anvil:KIT_ANVIL.every(k => t2Role(k) === 'anvil'), brisk:t2Role('brisk'), vellRole:t2Role('vell'),
    two:['brannoc', 'brask', 'vell'].map(k => TPL[k].attacks), bran:{ac:TPL.brannoc.ac, mv:TPL.brannoc.mv, init:TPL.brannoc.init, role:TPL.brannoc.role, weapon:TPL.brannoc.weapon}, braskAc:TPL.brask.ac}; });
ok(sh.bash.sort().join(',') === 'brisk,greysword,haddat,thegg', `only the three who must walk, and Dannet, still carry the shield bash (${sh.bash})`);
ok(sh.missing.length === 0, `every ability on every sheet exists (${sh.missing})`);
ok(sh.kits.brannoc === 'boardline,boardleap' && sh.kits.darrut === 'gatedrive,salve' && sh.kits.ottar === 'wolfhowl,salve' && sh.kits.doss === 'sweep,salve' && sh.kits.edrem === 'breaker,salve'
  && sh.kits.brask === 'salve' && sh.kits.brennet === 'turnload,salve' && sh.kits.pruss === 'maul,salve' && sh.kits.tirren === 'hoofknife,salve' && sh.kits.vell === 'grapple,salve', `the new kits (${JSON.stringify(sh.kits)})`);
ok(sh.two.join() === '2,2,2', 'Brannoc, Brask and Vell strike twice');
ok(sh.bran.ac === 13 && sh.bran.mv === 5 && sh.bran.init === 2 && /marine/.test(sh.bran.role) && /boarding axes/.test(sh.bran.weapon) && sh.braskAc === 14, `Brannoc: a marine, no shield, quicker; Brask without his shield (${JSON.stringify(sh.bran)})`);
ok(sh.anvil && sh.brisk === 'anvil' && sh.vellRole !== 'anvil', 'the reworked heavies are still offered Anvil at level 12');

// ---- in a fight ----
const f = await ev(async () => { const wait = ms => new Promise(r => setTimeout(r, ms)); const out = {};
  S = newState('Hask'); S.chapter = 4; S.lvl = 6; migrate(S); S.squad = ['sgt','brisk','kettle','tuft','ohl','vell']; startBattle('guild_roofs', {}); await wait(600); B.smoke = [];
  for (let i = 0; i < 60 && !(B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100);
  const realEnd = endTurn; window.endTurn = () => {}; const realAfter = afterAct; window.afterAct = () => {}; B.busy = true;
  const foe = foes().filter(e => !e.boss)[0], foe2 = foes().filter(e => !e.boss && e !== foe)[0], brisk = B.units.find(u => u.id === 'brisk');
  const park = () => B.units.forEach((u, i) => { u.x = i % 8; u.y = i < 8 ? 0 : 1; u.stun = false; u.aooTurn = -1; });
  const fresh = (e, x, y) => { e.x = x; e.y = y; e.hp = e.maxhp = 60; e.boss = false; e.immortal = false; e.heavy = false; e.bleed = 0; e.stun = false; e.parryLeft = 0; e.kitBrokenUntil = -1; e.kitHowlUntil = -1; };
  const add = id => { const u = mkParty(id, 0, 9); B.units.push(u); return u; };
  const realAtk = attack; let calls = []; const hitAll = () => { calls = []; window.attack = (a, t, o = {}) => { calls.push({a:a.id || a.name, t:t.name, dmg:o.dmg, aoo:!!o.aoo, verb:o.verb}); return {hit:true, dmg:1}; }; };
  // two blows on a tap
  { park(); const v = B.units.find(u => u.id === 'vell'); v.x = 3; v.y = 6; fresh(foe, 3, 5); out.vell = {attacks:v.attacks, dmg:v.dmg, dmg2:v.dmg2};
    hitAll(); B.cur = v; B.acted = false; B.busy = false; B.mode = 'act'; B.mvLeft = v.mv; battleTap(3, 5); await wait(400); out.tap = calls.map(c => c.verb || 'main'); out.tapDmg2 = calls[1] && calls[1].dmg; B.busy = true; }
  // Brannoc's line and leap
  { park(); const u = add('brannoc'); u.x = 3; u.y = 7; fresh(foe, 3, 4); out.bran = {attacks:u.attacks, dmg2:u.dmg2, ab:u.ab.join()}; hitAll(); await AB.boardline.run(u, 3, 4); out.line = cheb(u, foe); out.lineCd = !AB.boardline.ok(u);
    const t = AB.boardleap.tiles(u)[0]; AB.boardleap.run(u, t.x, t.y); out.leap = u.x === t.x && u.y === t.y && !AB.boardleap.ok(u); u.hp = 0; u.x = -5; }
  // Darrut's drive, with Brisk beside the enemy
  { park(); const u = add('darrut'); u.x = 3; u.y = 6; fresh(foe, 3, 5); brisk.x = 4; brisk.y = 5; hitAll(); B.log = []; await AB.gatedrive.run(u, 3, 5); out.gate = {y:foe.y, swing:calls.some(c => c.aoo && c.a === 'brisk')}; B.follow = null; u.hp = 0; u.x = -5; }
  // Pruss's maul: two tiles
  { park(); const u = add('pruss'); u.x = 3; u.y = 7; fresh(foe, 3, 6); brisk.x = 4; brisk.y = 6; hitAll(); await AB.maul.run(u, 3, 6); out.maul = {y:foe.y, swing:calls.some(c => c.aoo && c.a === 'brisk'), cd:u.cdKit - B.round}; u.hp = 0; u.x = -5; }
  // Brennet's turn
  { park(); const u = add('brennet'); u.x = 3; u.y = 6; fresh(foe, 3, 5); brisk.x = 3; brisk.y = 4; hitAll(); await AB.turnload.run(u, 3, 5); out.turn = {u:[u.x, u.y], f:[foe.x, foe.y], swing:calls.some(c => c.aoo && c.a === 'brisk'), self:calls.some(c => c.aoo && c.a === 'brennet')}; u.hp = 0; u.x = -5; }
  // Doss's sweep: two enemies
  { park(); const u = add('doss'); u.x = 3; u.y = 6; fresh(foe, 3, 5); fresh(foe2, 4, 5); hitAll(); AB.sweep.run(u, 3, 5); await wait(200); out.sweep = calls.map(c => c.t).length; out.sweepMoved = foe.y !== 5 || foe2.y !== 5; u.hp = 0; u.x = -5; }
  // Edrem's breaker
  { park(); const u = add('edrem'); u.x = 3; u.y = 6; fresh(foe, 3, 5); window.attack = realAtk; const ac0 = atkCalc(brisk, foe).ac; hitAll(); AB.breaker.run(u, 3, 5); window.attack = realAtk; out.breaker = ac0 - atkCalc(brisk, foe).ac; u.hp = 0; u.x = -5; }
  // Tirren's hoof-knife
  { park(); const u = add('tirren'); u.x = 3; u.y = 6; fresh(foe, 3, 5); hitAll(); AB.hoofknife.run(u, 3, 5); out.bleed = foe.bleed; u.hp = 0; u.x = -5; }
  // Ottar's howl
  { park(); const u = add('ottar'); u.x = 3; u.y = 6; fresh(foe, 3, 5); window.attack = realAtk; const b0 = atkCalc(foe, brisk).bonus; AB.wolfhowl.run(u); out.howl = b0 - atkCalc(foe, brisk).bonus; out.howlCd = !AB.wolfhowl.ok(u); u.hp = 0; u.x = -5; }
  out.desc = ['boardline','boardleap','gatedrive','wolfhowl','sweep','breaker','turnload','maul','hoofknife'].every(k => typeof AB[k].desc() === 'string' && AB[k].desc().length > 40 && !/undefined|NaN/.test(AB[k].desc()));
  window.attack = realAtk; window.endTurn = realEnd; window.afterAct = realAfter; B = null; view = 'explore'; return out; });
ok(f.vell.attacks === 2 && f.vell.dmg[1] === 4 && f.vell.dmg2[1] === 4, `Vell in a fight: two knives, 1d4 each (${JSON.stringify(f.vell)})`);
ok(f.tap.length === 2 && f.tapDmg2 && f.tapDmg2[1] === 4, `one tap, two blows, the second with the off hand's dice (${f.tap})`);
ok(f.bran.attacks === 2 && f.bran.ab === 'boardline,boardleap' && f.bran.dmg2[1] === 6, `Brannoc in a fight (${JSON.stringify(f.bran)})`);
ok(f.line === 1 && f.lineCd, `the boarding line hauls it in beside him, and recharges (${f.line})`);
ok(f.leap, 'the boarding leap moves him once a turn');
ok(f.gate.y === 3 && f.gate.swing, `Darrut's gate drive drives it back and Brisk gets the free swing (${JSON.stringify(f.gate)})`);
ok(f.maul.y === 4 && f.maul.swing && f.maul.cd === 3, `Pruss's maul drives it two tiles, Brisk swings, three rounds to recharge (${JSON.stringify(f.maul)})`);
ok(f.turn.u.join() === '3,5' && f.turn.f.join() === '3,6' && f.turn.swing && !f.turn.self, `Brennet swaps places with it; Brisk swings, Brennet does not (${JSON.stringify(f.turn)})`);
ok(f.sweep === 2 && !f.sweepMoved, `Doss's sweep strikes two and pushes neither (${f.sweep})`);
ok(f.breaker === 2, `Edrem's breaker: armour 2 worse (${f.breaker})`);
ok(f.bleed === 3, `Tirren's hoof-knife: three rounds of bleeding (${f.bleed})`);
ok(f.howl === 2 && f.howlCd, `Ottar's howl: −2 to hit (${f.howl})`);
ok(f.desc, 'every new ability describes itself');
ok(errors.length === 0, `no page errors (${errors.slice(0, 3).join(' | ')})`);
await br.close(); try { srv.close && srv.close(); srv.kill && srv.kill(); } catch (e) {}
process.exit(fail);
