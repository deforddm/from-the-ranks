// v6.1: Book Three's veterans. Every Book Three game starts at level 8 (cap 15 there; Books One and Two still stop at 8), a fresh start
// chooses its level 3/5/7 picks, the new veteran picks (Stout, Edge) work, levels 9..15 give their bonuses, a recruit joining late brings her
// veteran picks, and a Book One transfer brings the gear its soldiers wear, the unworn kit, their talents and picks, and the tricks held by
// anyone who comes across (not those of the dead or of anyone who stayed behind).
// Usage: node tools/b3carry_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 360, height: 780 });
const bad = [], ok = m => console.log('ok  ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {};
  /* a fresh Book Three game */
  S = newStateMOI('Vet'); save();
  out.fresh = {lvl:S.lvl, xp:S.xp, due:S.picksDue.join(',')};
  /* levels past 8, Book Three only */
  const hp8 = mkParty('brisk', 0, 0).maxhp, dmg8 = mkParty('brisk', 0, 0).dmg[2];
  gainXP(LEVELS[9] - S.xp); out.to10 = {lvl:S.lvl, due:S.picksDue.join(',')};
  const u10 = mkParty('brisk', 0, 0); out.hp10 = u10.maxhp - hp8; out.dmg10 = u10.dmg[2] - dmg8;
  gainXP(99999); out.cap = S.lvl; out.capDue = S.picksDue.join(',');
  out.ac15 = lvAc(); out.dmg15 = lvDmg(); out.t15 = lvT(); out.wits15 = lvStat('sgt', 'wits');
  /* Stout and Edge */
  S = newStateMOI('Vet2'); S.picksDue = []; const a0 = mkParty('kettle', 0, 0); S.picks.kettle.push('stout', 'edge'); const a1 = mkParty('kettle', 0, 0);
  out.stout = a1.ac - a0.ac; out.edge = a1.dmg[2] - a0.dmg[2];
  /* a recruit joining a level-12 squad brings veteran picks for 5, 7, 9 and 11 */
  S = newStateMOI('Vet3'); S.lvl = 12; S.xp = LEVELS[11]; S.picksDue = []; b3Join('sohra');
  out.sohraVet = S.picks.sohra.filter(p => PICKS.vet.some(v => v[0] === p)).length;
  /* Book One still stops at 8 */
  S = newState('One'); gainXP(99999); out.oneCap = S.lvl; out.oneDue = S.picksDue.filter(l => l > 7).join(',');
  /* the transfer: a finished Book One on the outlaw road. Tuft died; Ellis stayed behind */
  const items = Object.keys(ITEMS).filter(k => !/^b[23]_/.test(k)), bySlot = sl => items.filter(k => ITEMS[k].slot === sl); // v8.1: each piece in its own slot (gearTidy moves one that is not)
  const [gB, gE] = bySlot('weapon'), [gK, gLoose] = bySlot('trinket');
  const a = newState('Rusk'); Object.assign(a, {chapter:7, chapters:{0:'given', 7:'outlaw'}, lvl:8, xp:1900,
    squad:['sgt', 'brisk', 'kettle', 'ohl', 'ellis'], dead:{tuft:{ch:6, where:'x'}},
    f:{c7_follow:{brisk:true, kettle:true, ohl:true, ellis:false}},
    gear:{sgt:{}, brisk:{weapon:gB}, kettle:{trinket:gK}, ohl:{}, ellis:{weapon:gE}, tuft:{}},
    kit:[gB, gK, gE, gLoose],
    picks:{sgt:['discipline', 'iron', 'keen'], brisk:['shieldwall', 'iron', 'keen'], kettle:['quorl', 'iron', 'fleet'], ohl:['triage', 'iron', 'keen'], ellis:['ghost', 'iron', 'keen']},
    tricks:{pull:{who:'kettle', ch:3, left:0}, bluefire:{who:'tuft', ch:3, left:1}, fold:{who:'ellis', ch:0, left:1}, line:{who:'brisk', ch:1, left:0}}});
  S = a; save(); const id = a.sid; S = null;
  S = newStateMOI('Rusk', id, newSid()); save();
  out.imp = {lvl:S.lvl, squad:S.squad.join(','), brisk:S.gear.brisk && S.gear.brisk.weapon === gB, kettle:S.gear.kettle && S.gear.kettle.trinket === gK,
    kitHas:[gB, gK, gLoose].every(g => S.kit.includes(g)), ellisGear:S.kit.includes(gE), tricks:Object.keys(S.tricks || {}).sort().join(','),
    pullLeft:trickLeft('pull'), picks:JSON.stringify(S.picks.kettle), due:S.picksDue.join(',')};
  out.impBattle = (() => { const u = mkParty('brisk', 0, 0); return !!u; })();
  return out;
});
const R = r;
R.fresh.lvl === 8 && R.fresh.xp === 1900 && R.fresh.due === '3,5,7' ? ok('a fresh Book Three game starts at level 8 and picks its level 3/5/7 talents') : no('fresh ' + JSON.stringify(R.fresh));
R.to10.lvl === 10 && R.to10.due === '3,5,7,9' ? ok('levels 9 and 10 come in Book Three, with a veteran pick at 9') : no('to10 ' + JSON.stringify(R.to10));
R.hp10 === 8 && R.dmg10 === 1 ? ok('level 10: +8 health over level 8 and +1 damage') : no(`hp10 ${R.hp10} dmg10 ${R.dmg10}`);
R.cap === 15 && R.capDue === '3,5,7,9,11,13,15' ? ok('the cap in Book Three is 15, with veteran picks at 11, 13 and 15') : no(`cap ${R.cap} ${R.capDue}`);
R.ac15 === 3 && R.dmg15 === 5 && R.t15 === 4 && R.wits15 === 2 ? ok('level 15: armour +3, damage +5, spell tier 4, the role Measure +2') : no(`15: ac ${R.ac15} dmg ${R.dmg15} t ${R.t15} wits ${R.wits15}`);
R.stout === 1 && R.edge === 1 ? ok('Stout gives +1 armour, Edge +1 damage') : no(`stout ${R.stout} edge ${R.edge}`);
R.sohraVet === 4 ? ok('Sohra joining a level-12 squad brings four veteran picks') : no('sohra vet ' + R.sohraVet);
R.oneCap === 8 && !R.oneDue ? ok('Book One still stops at level 8') : no(`one cap ${R.oneCap} ${R.oneDue}`);
R.imp.lvl === 8 && R.imp.squad === 'sgt,brisk,kettle,ohl' ? ok('the transfer starts at level 8 with the soldiers who came across') : no('imp ' + JSON.stringify(R.imp));
R.imp.brisk && R.imp.kettle && R.imp.kitHas && !R.imp.ellisGear ? ok('worn gear and unworn kit come across; what Ellis wore stays with her') : no('gear ' + JSON.stringify(R.imp));
R.imp.tricks === 'line,pull' && R.imp.pullLeft > 0 ? ok('tricks held by Brisk and Kettle come across, charged; Tuft\'s and Ellis\'s stay behind') : no('tricks ' + R.imp.tricks + ' left ' + R.imp.pullLeft);
R.imp.picks === '["quorl","iron","fleet"]' && R.imp.due === '' ? ok('talents and veteran picks come across; nothing to choose again') : no('picks ' + R.imp.picks + ' due ' + R.imp.due);
errors.length ? no('page errors: ' + errors.join(' | ')) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `b3carry: FAIL (${bad.length})` : 'b3carry: all ok'); process.exit(bad.length ? 1 : 0);
