// The second talent at level 12 (v13.5, David Nov 14, 2026, design C): a choice of the level-3 talent passed over or the role's own
// (Old Hand, Field Surgeon, Anvil, Stake Line, Called Shot, Deep Warren). Usage: node tools/talent2_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) bad.push(m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  out.roles = ['sgt','brisk','kettle','tuft','ohl','haddat','tangle','marrow','mirrel','tobet','thegg','perrit','ammet'].map(k => k + ':' + t2Role(k)).join(',');
  S = newState('Hask'); S.lvl = 12; S.picks.brisk = ['shieldwall', 'iron']; out.opts = t2Opts(S, 'brisk').map(o => o[0]).join(',');
  out.owed = picksOwed(S).includes(12); S.picks.brisk.push('anvil'); out.paid = t2Owed(S, 'brisk');
  { const s = newState('Hask'); s.lvl = 13; s.picksDue = []; const m = migrate(JSON.parse(JSON.stringify(s))); out.migr = m.picksDue.includes(12); }
  { S = newStateMOI('Hask'); S.lvl = 11; S.xp = LEVELS[10]; S.picksDue = []; gainXP(LEVELS[11] - S.xp + 1); out.gain = S.picksDue.includes(12); }
  /* a fight with every second talent */
  S = newState('Hask'); S.lvl = 12; S.picks = {sgt:['discipline','oldhand'], brisk:['shieldwall','anvil'], kettle:['quorl','stakeline'], tuft:['shadowstep','deepwarren'], ohl:['triage','fieldsurgeon']}; S.picksDue = []; save();
  startBattle(Object.keys(BATTLES).find(k => !/^b\d/.test(k) && !BATTLES[k].stage2Only) || 'pale_ambush', {}); await wait(80);
  const P = id => B.units.find(u => u.id === id), E = B.units.filter(u => u.side === 'e');
  out.kit = P('brisk').ab.includes('anvil') && P('kettle').ab.includes('stakeline');
  out.rally = [AB.rally.ok(P('sgt')), (B.used.rally = 1 + lvAt(6), AB.rally.ok(P('sgt'))), (B.used.rally = 2 + lvAt(6), AB.rally.ok(P('sgt')))].join(',');
  const tu = P('tuft'); tu.strain = 0; castStrain(tu, 3); out.strain = tu.strain;
  const oh = P('ohl'), br2 = P('brisk'), kt = P('kettle'), sg = P('sgt'); kt.x = 1; kt.y = 8; sg.x = 2; sg.y = 8; oh.x = 1; oh.y = 7; kt.hp = 5; sg.hp = 5; B.cur = oh; AB.mend.run(oh, kt.x, kt.y); out.surgeon = [kt.hp > 5, sg.hp > 5].join(',');
  const e = E[0]; e.atk = 99; e.dmg = [1, 1, 0]; const mate = P('sgt'); br2.x = 3; br2.y = 5; mate.x = 4; mate.y = 5; e.x = 5; e.y = 5; const bh = br2.hp, mh = mate.hp;
  B.cur = br2; AB.anvil.run(br2); for (let i = 0; i < 6 && br2.hp === bh; i++) { attack(e, mate, {}); await wait(700); } out.anvil = [br2.hp < bh, mate.hp === mh].join(',');
  const e2 = E[1] || E[0]; const ac0 = e2.ac; B.cur = P('sgt'); S.picks.sgt.push('calledshot'); AB.mark.run(P('sgt'), e2.x, e2.y); out.called = ac0 - e2.ac;
  const e3 = E[2] || E[0]; let at = null; for (let y = 2; y < 8 && !at; y++) for (let x = 1; x < 7 && !at; x++) if ([[x,y-1],[x,y],[x,y+1],[x-1,y],[x+1,y]].every(([a,b]) => free(a, b, e3))) at = {x, y};
  B.cur = kt; AB.stakeline.run(kt, at.x, at.y); e3.x = at.x; e3.y = at.y - 1; await aiWalk(e3, [{x:at.x, y:at.y}, {x:at.x, y:at.y + 1}], () => false); out.stakes = [B.stakes.length, (e3.x - at.x) + ',' + (e3.y - at.y)].join(' ');
  return out;
});
ok(r.roles === 'sgt:oldhand,brisk:anvil,kettle:stakeline,tuft:deepwarren,ohl:fieldsurgeon,haddat:anvil,tangle:stakeline,marrow:fieldsurgeon,mirrel:fieldsurgeon,tobet:calledshot,thegg:anvil,perrit:deepwarren,ammet:fieldsurgeon', `the role talents (${r.roles})`);
ok(r.opts === 'holdline,anvil', `Brisk with Shield Wall chooses Hold the Line or Anvil (${r.opts})`);
ok(r.owed && !r.paid, 'owed at 12, settled once chosen');
ok(r.migr && r.gain, 'a save past 12 is asked; reaching 12 asks');
ok(r.kit, 'Anvil and Stake Line in the kit');
ok(r.rally === 'true,true,false', `Old Hand: one more Rally (${r.rally})`);
ok(r.strain === 2, `Deep Warren: a strain-3 spell costs 2 (${r.strain})`);
ok(r.surgeon === 'true,true', `Field Surgeon: Mend also heals the worst-hurt squadmate beside its target (${r.surgeon})`);
ok(r.anvil === 'true,true', `Anvil: the blow lands on the heavy (${r.anvil})`);
ok(/^3 0,0$/.test(r.stakes), `Stake Line: three stakes, an enemy walking into them stops there (${r.stakes})`);
ok(r.called === 2, `Called Shot: a marked enemy loses 2 armour (${r.called})`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
console.log(bad.length ? `talent2: FAIL (${bad.length})` : 'talent2: all ok'); await br.close(); process.exit(bad.length ? 1 : 0);
