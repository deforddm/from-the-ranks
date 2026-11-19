// v13.52.0: a level-3 talent and a level-12 choice of two for every squadmate; the new kits' own level-12 talents; catch-up veteran picks chosen by hand.
// Usage: node tools/talents3_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, mobile: true, touch: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = f => page.evaluate(f);
const d = await ev(() => { S = newState('Hask'); S.lvl = 12; const ids = Object.keys(TPL).filter(k => TPL[k].ab && (TPL[k].bio || k === 'sgt'));
  const no3 = ids.filter(k => (PICKS[3][k] || []).length !== 2), bad12 = ids.filter(k => { S.picks[k] = [PICKS[3][k][0][0]]; return t2Opts(S, k).length !== 2; });
  const roles = Object.fromEntries(['vell','pessa','wenna','tegra','redblade','orvas','brune','sorvan','warlock','tallow','hessa','brannoc','brask','doss','edrem','brennet','pruss','tirren','darrut','ottar','brisk','mehet'].map(k => [k, t2Role(k)]));
  const noT2 = Object.values(roles).filter(r => !PICKS.t2[r]);
  S.picks.doss = ['holdline', 'anvil']; const kept = !t2Owed(S, 'doss'); S.picks.doss = ['holdline']; const asked = t2Owed(S, 'doss');
  return {n:ids.length, no3, bad12, roles, noT2, kept, asked}; });
ok(d.no3.length === 0, `all ${d.n} squadmates have two level-3 talents (${d.no3})`);
ok(d.bad12.length === 0, `all ${d.n} are offered exactly two at level 12 (${d.bad12})`);
ok(d.noT2.length === 0 && d.roles.vell === 'handover' && d.roles.sorvan === 'setbutt' && d.roles.tallow === 'twiceblessed' && d.roles.brannoc === 'flurry' && d.roles.doss === 'fullcircle' && d.roles.edrem === 'shatter' && d.roles.pruss === 'followthrough' && d.roles.tirren === 'deepcut' && d.roles.darrut === 'anvil' && d.roles.ottar === 'anvil' && d.roles.brisk === 'anvil' && d.roles.mehet === 'calledshot', `the roles (${JSON.stringify(d.roles)})`);
ok(d.kept && d.asked, 'a soldier who already took Anvil keeps it and is not asked again; one with none is asked');

// ---- catch-up picks, chosen by hand ----
const c = await ev(async () => { const wait = ms => new Promise(r => setTimeout(r, ms)); window.FTR_AUTOPICK = 0;
  S = newState('Hask'); S.lvl = 12; migrate(S); S.squad = ['sgt','brisk','kettle','tuft','ohl']; S.squad.forEach(k => { S.picks[k] = [PICKS[3][k][0][0], 'iron', 'keen', 'fleet', 'nerve', PICKS.t2[t2Role(k)][0]]; }); S.picksDue = [];
  recruit('vell'); const due = S.picksDue.slice(), auto = S.picks.vell.slice();
  let doneCalled = false; openPicks(() => { doneCalled = true; }); await wait(100); const m = document.querySelector('#modal'); const out = {due, auto, screens:[]};
  for (let i = 0; i < 6 && !m.hidden; i++) { const who = [...new Set([...m.querySelectorAll('[data-k]')].map(b => b.dataset.id))]; const title = m.querySelector('h2').textContent, need = (m.querySelector('.pk .stat').textContent.match(/pick (\d)/) || [0, 1])[1];
    const bs = [...m.querySelectorAll('[data-id="vell"]')]; const dis0 = m.querySelector('#bPick').disabled; bs.slice(0, +need).forEach(b => b.click()); const mid = m.querySelector('#bPick').disabled; if (bs.length > +need && title.startsWith('Veteran')) { bs[bs.length - 1].click(); }
    out.screens.push({title, who, need:+need, opts:bs.length, dis0, mid, on:m.querySelectorAll('.on').length}); m.querySelector('#bPick').click(); await wait(120); }
  { const old = newState('Old'); old.lvl = 13; old.squad = ['sgt','brisk','kettle','tuft','ohl','vell']; old.squad.forEach(k => { old.picks[k] = [PICKS[3][k][0][0], PICKS.t2[t2Role(k)][0], 'iron', 'keen', 'fleet', 'nerve', 'stout']; }); old.picks.vell = ['ropeswing', 'iron', 'keen', 'fleet', 'nerve', 'stout']; old.t2Asked = 1; old.picksDue = []; delete old.t52Asked; const m1 = migrate(JSON.parse(JSON.stringify(old))); out.oldSave = m1.picksDue.join(); const m2 = migrate(JSON.parse(JSON.stringify(m1))); m2.picksDue = []; out.once = migrate(JSON.parse(JSON.stringify(m2))).picksDue.join(); }
  S.picks.mehet = []; recruit('mehet'); out.mehet = S.picksDue.includes(3) && talentOwed(S, 'mehet'); S.squad = S.squad.filter(k => k !== 'mehet'); S.picksDue = [];
  out.picks = S.picks.vell.slice(); out.left = S.picksDue.slice(); out.done = doneCalled;
  S.lvl = 16; S.picks.pessa = []; S.picksDue = []; vetCatchUp('pessa'); out.all = S.picks.pessa.length; out.allDue = S.picksDue.length; return out; });
ok(c.auto.length === 0 && c.due.join() === '3,5,7,9,11', `a recruit at level 12 is given nothing silently; the talent and four veteran levels are owed (${c.due}; ${c.auto})`);
const v = c.screens.find(s => s.title.startsWith('Veteran'));
ok(v && v.who.join() === 'vell' && v.need === 4 && v.opts === 6 && v.dis0 && !v.mid && v.on === 4, `one veteran screen for the four, his alone: pick 4 of 6, a fifth tap swaps the earliest out (${JSON.stringify(v)})`);
ok(c.picks.filter(p => ['iron','keen','fleet','nerve','stout','edge'].includes(p)).length === 4 && c.left.length === 0 && c.done, `four chosen, nothing left owed (${c.picks})`);
ok(c.mehet, 'Mehet joining owes his level-3 talent');
ok(c.oldSave === '12' && c.once === '', `an older save with Vell past 12 is asked once for his new level-12 choice (${c.oldSave}; ${c.once})`);
ok(c.all === 6 && c.allDue === 0, 'at level 15 and up there is nothing to choose: all six are given');

// ---- the talents in a fight ----
const f = await ev(async () => { const wait = ms => new Promise(r => setTimeout(r, ms)); const out = {};
  S = newState('Hask'); S.chapter = 4; S.lvl = 12; migrate(S); S.squad = ['sgt','brisk','kettle','tuft','ohl','vell']; S.picksDue = []; startBattle('guild_roofs', {}); await wait(600); B.smoke = [];
  for (let i = 0; i < 60 && !(B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100);
  const realEnd = endTurn; window.endTurn = () => {}; const realAfter = afterAct; window.afterAct = () => {}; B.busy = true;
  const foe = foes().filter(e => !e.boss)[0], foe2 = foes().filter(e => !e.boss && e !== foe)[0], foe3 = foes().filter(e => !e.boss && e !== foe && e !== foe2)[0], brisk = B.units.find(u => u.id === 'brisk');
  const park = () => B.units.forEach((u, i) => { u.x = i % 8; u.y = i < 8 ? 0 : 1; u.stun = false; u.aooTurn = -1; });
  const fresh = (e, x, y) => { e.x = x; e.y = y; e.hp = e.maxhp = 90; e.boss = false; e.immortal = false; e.heavy = false; e.bleed = 0; e.stun = false; e.parryLeft = 0; e.kitBrokenUntil = -1; };
  const add = (id, picks) => { S.picks[id] = picks; const u = mkParty(id, 0, 9); B.units.push(u); return u; };
  const realAtk = attack; let calls = []; const hitAll = () => { calls = []; window.attack = (a, t, o = {}) => { calls.push({a:a.id || a.name, t:t.name, aoo:!!o.aoo, verb:o.verb, dmg:o.dmg}); return {hit:true, dmg:1}; }; };
  { park(); const u = add('brannoc', ['flurry']); u.x = 3; u.y = 6; fresh(foe, 3, 5); const tap = async () => { hitAll(); B.cur = u; B.acted = false; B.busy = false; B.mode = 'act'; B.mvLeft = u.mv; battleTap(3, 5); await wait(500); B.busy = true; return calls.length; }; out.flurry = [await tap(), await tap()]; u.hp = 0; u.x = -5; }
  { park(); const u = add('ressa', ['twoblades']); out.ressa = [u.attacks, u.dmg2 && u.dmg2[1]]; u.hp = 0; u.x = -5; }
  { park(); const u = add('doss', ['fullcircle']); u.x = 3; u.y = 6; fresh(foe, 3, 5); fresh(foe2, 4, 5); fresh(foe3, 2, 5); hitAll(); AB.sweep.run(u, 3, 5); await wait(300); out.circle = calls.length; u.hp = 0; u.x = -5; }
  { park(); const u = add('edrem', ['shatter']); u.x = 3; u.y = 6; fresh(foe, 3, 5); window.attack = realAtk; const ac0 = atkCalc(brisk, foe).ac; hitAll(); AB.breaker.run(u, 3, 5); window.attack = realAtk; out.shatter = [ac0 - atkCalc(brisk, foe).ac, foe.kitBrokenUntil - B.round]; u.hp = 0; u.x = -5; }
  { park(); const u = add('tirren', ['deepcut']); u.x = 3; u.y = 6; fresh(foe, 3, 5); hitAll(); AB.hoofknife.run(u, 3, 5); out.bleed = foe.bleed; u.hp = 0; u.x = -5; }
  { park(); const u = add('pruss', ['followthrough']); u.x = 3; u.y = 7; fresh(foe, 3, 6); hitAll(); await AB.maul.run(u, 3, 6); out.follow = calls.some(c => c.aoo && c.a === 'pruss'); u.hp = 0; u.x = -5; }
  { park(); const v = B.units.find(u => u.id === 'vell'); S.picks.vell = ['handover']; v.x = 3; v.y = 7; v.cdHook = -1; fresh(foe, 3, 4); hitAll(); await AB.grapple.run(v, 3, 4); out.hand = calls.length; v.x = 0; v.y = 9; }
  { park(); const u = add('sorvan', ['setbutt']); u.x = 3; u.y = 6; fresh(foe, 3, 3); hitAll(); await aiWalk(foe, [{x:3, y:4}, {x:3, y:5}], () => false); out.butt = calls.filter(c => c.aoo && c.a === 'sorvan').length; fresh(foe2, 4, 3); await aiWalk(foe2, [{x:4, y:4}, {x:4, y:5}], () => false); out.buttOnce = calls.filter(c => c.aoo && c.a === 'sorvan').length; u.hp = 0; u.x = -5; }
  { S.picks.tallow = ['twiceblessed']; B.used.b4_twins = 0; const a = AB.b4_twins; const o1 = a.ok({id:'tallow'}); B.used.b4_twins = 1; const o2 = a.ok({id:'tallow'}); B.used.tb_b4_twins = 1; const o3 = a.ok({id:'tallow'}); out.twice = [o1, o2, o3]; }
  window.attack = realAtk; window.endTurn = realEnd; window.afterAct = realAfter; B = null; view = 'explore'; return out; });
ok(f.flurry.join() === '4,2', `Flurry: four blows the first time, two after (${f.flurry})`);
ok(f.ressa.join() === '2,4', `Both Knives: Ressa strikes twice, the off hand 1d4 (${f.ressa})`);
ok(f.circle === 3, `Full Circle: the sweep strikes all three beside him (${f.circle})`);
ok(f.shatter.join() === '3,2', `Shatter: armour 3 worse, a round longer (${f.shatter})`);
ok(f.bleed === 5, `Deep Cut: five rounds (${f.bleed})`);
ok(f.follow, 'Follow Through: Pruss keeps his own free swing on the drive');
ok(f.hand === 2, `Hand Over Hand: the hook, then a blow as it arrives (${f.hand})`);
ok(f.butt === 1 && f.buttOnce === 1, `Set the Butt: one free thrust at the first to step in, once a round (${f.butt}, ${f.buttOnce})`);
ok(f.twice.join() === 'true,true,false', `Twice Blessed: the Twins once more, then no more (${f.twice})`);
ok(errors.length === 0, `no page errors (${errors.slice(0, 3).join(' | ')})`);
await br.close(); process.exit(fail);
