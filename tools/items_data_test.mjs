// The items pass (v8.1), the data half: every weapon has its own damage, and none is a downgrade for everyone who can use it; Book Four
// has armour; the new pieces have a role, a picture and a place where they are found; every new trinket effect fires in a fight or a
// check (driven the way the b4ch tests drive theirs, with the dice fixed); and Brack's Genuine Shard of Moon's Spawn still does nothing.
// Usage: node tools/items_data_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
const bad = [], ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) bad.push(m); };
const r = await page.evaluate(async () => { const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  const rnd0 = Math.random, fix = v => { Math.random = () => v; }, free = () => { Math.random = rnd0; }, nat = n => (n - 1) / 20 + 0.001;
  gearRolesApply();
  /* ---- weapons: damage on every one; a choice, never a pure downgrade ---- */
  const W = Object.entries(ITEMS).filter(([k, it]) => it.slot === 'weapon');
  out.noDmg = W.filter(([k, it]) => !Array.isArray(it.dmg) || it.dmg.length < 2).map(([k]) => k);
  const avg = d => d[0] * (d[1] + 1) / 2 + (d[2] || 0), hitP = a => Math.max(.05, Math.min(.95, (21 - (14 - a)) / 20)), E = (a, d) => hitP(a) * avg(d);
  out.downgrade = []; out.wearers = {};
  W.forEach(([k, it]) => { const who = Object.keys(TPL).filter(id => TPL[id].dmg && canWear(id, k)); out.wearers[k] = who.length;
    const extra = it.reach || (it.rng || 0) > 0 || (it.ac || 0) > 0 || (it.hp || 0) > 0 || !!it.stat;
    const better = who.some(id => { const t = TPL[id]; return E(t.atk + (it.atk || 0), it.dmg) >= E(t.atk, t.dmg) - 1e-9; });
    if (!who.length || !(better || extra)) out.downgrade.push(k); });
  /* ---- Book Four has armour; the new pieces are placed, drawn and roled ---- */
  const gearOf = b => Object.values(b === BOOK ? CHAPTERS : BOOKSNAP[b].ch).map(C => C.gear || {});
  out.hocArmour = gearOf('hoc').flatMap(g => Object.values(g)).filter(it => it.slot === 'armour').length;
  const NEW = ['secondhalberd', 'darucrossbow', 'darusword', 'b4_c1_issuemail', 'b4_c4_setijack', 'b4_c6_dogscale', 'b5_c1_issuesword', 'b5_c1_tarthclub'];
  const src = Object.values(DLG).map(f => String(f)).join('\n');
  out.newBad = NEW.filter(k => !ITEMS[k] || !ITEMS[k].role || ITEMS[k].role === 'any' || !ART['item/' + k] || !src.includes(`gain('${k}')`));
  out.numLines = Object.entries(ITEMS).filter(([k, it]) => /[+−]\s?\d|\d+ (health|armour|damage|to hit)|\(\S*\d/.test(it.line || '')).map(([k]) => k);
  /* ---- a fight to drive the effects in ---- */
  const fight = async (gear, setup) => { S = newState('Items'); S.picksDue = []; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; S.squad.forEach(k => S.gear[k] = {});
    Object.entries(gear || {}).forEach(([w, it]) => { S.gear[w].trinket = it; if (!S.kit.includes(it)) S.kit.push(it); }); if (setup) setup(); save();
    startBattle('deserters', {}); await wait(40); B.busy = true; return B; };
  const P = id => B.units.find(u => u.id === id && u.side === 'p'), F = () => B.units.find(u => u.side === 'e' && u.hp > 0);
  /* initiative: the Hound's tooth and the conch */
  await fight({}); const i0 = P('sgt').init; await fight({sgt:'houndtooth', brisk:'b4_c5_conch'}); out.init = [P('sgt').init - i0, P('brisk').init - TPL.brisk.init];
  /* the brand-pot: an action once a fight, a 3x3 of burning pitch */
  await fight({kettle:'b5_c4_pitchpot'}); { const u = P('kettle'), f = F(), f0 = B.fires.length; B.cur = u; out.pot = {ab:u.ab.includes('ix_pitchpot'), ok:abOk(u, 'ix_pitchpot')};
    fix(.6); AB.ix_pitchpot.run(u, f.x, f.y); free(); await wait(700); out.pot.fires = B.fires.length - f0; out.pot.again = abOk(u, 'ix_pitchpot'); }
  /* the Fete mask: the first round only */
  await fight({sgt:'fetemask'}); { const u = P('sgt'), f = F(); B.round = 1; const a1 = atkCalc(f, u).ac; S.gear.sgt = {}; const a0 = atkCalc(f, u).ac; S.gear.sgt = {trinket:'fetemask'}; B.round = 2; out.mask = [a1 - a0, atkCalc(f, u).ac - a0]; }
  /* the dog's tooth: the first blow at its wearer meets +2 armour, once */
  await fight({sgt:'b2_dogtooth'}); { const u = P('sgt'), f = F(); u.hp = u.maxhp = 999; const c = atkCalc(f, u), n = Math.max(2, Math.min(19, c.ac - c.bonus));
    fix(nat(n)); const h1 = attack(f, u).hit, h2 = attack(f, u).hit; free(); out.dog = {n, first:h1, second:h2, used:!!B.used['ix_dog_sgt']}; }
  /* the ferry rope, worn: +1 to hit on the first attack of a fight */
  await fight({sgt:'b4_c3_ferryrope'}); { const u = P('sgt'), f = F(); f.hp = f.maxhp = 999; const c = atkCalc(u, f), n = Math.max(2, Math.min(19, c.ac - c.bonus - 1));
    fix(nat(n)); const h1 = attack(u, f).hit, h2 = attack(u, f).hit; free(); out.rope = {first:h1, second:h2}; }
  /* the crow's feather: the first miss rolled again */
  await fight({sgt:'b2_crowfeather'}); { const u = P('sgt'), f = F(); f.ac = 99; B.log = []; fix(nat(5)); attack(u, f); attack(u, f); free(); out.crow = B.log.filter(l => /crow's feather/.test(l)).length; }
  /* the lamp-chip: the first blow landed dazzles */
  await fight({sgt:'lampchip'}); { const u = P('sgt'), f = F(); f.ac = -99; f.hp = f.maxhp = 999; B.round = 1; fix(nat(10)); attack(u, f); free(); out.lamp = f.dazzleUntil >= B.round; const g = B.units.filter(v => v.side === 'e' && v.hp > 0)[1]; if (g) { g.hp = g.maxhp = 999; g.ac = -99; fix(nat(10)); attack(u, g); free(); out.lampOnce = !(g.dazzleUntil >= B.round); } }
  /* damage riders: Treach's stripe below half health; the wolf's tooth on the wounded */
  const dmgOf = async (item, prep) => { await fight(item ? {sgt:item} : {}); const u = P('sgt'), f = F(); f.ac = -99; f.hp = f.maxhp = 999; if (prep) prep(u, f); fix(nat(10)); const d = attack(u, f).dmg; free(); return d; };
  out.stripe = [await dmgOf('b3_c3_stripe', u => { u.hp = 1; }) - await dmgOf(null, u => { u.hp = 1; }), await dmgOf('b3_c3_stripe') - await dmgOf(null)];
  out.wolf = [await dmgOf('b5_c4_wolftooth', (u, f) => { f.hp = 500; }) - await dmgOf(null, (u, f) => { f.hp = 500; }), await dmgOf('b5_c4_wolftooth') - await dmgOf(null)];
  /* the green ash: once a chapter, the first fire on its wearer does not burn */
  await fight({sgt:'b5_c3_ash'}); { const u = P('sgt'); u.hp = u.maxhp = 60; B.fires.push({x:u.x, y:u.y, until:B.round + 5, txt:'the test fire'}); fix(.9); enterFire(u); const h1 = u.hp; u.burnTurns = 0; enterFire(u); free(); out.ash = {first:60 - h1, second:h1 - u.hp, flag:!!S.f[ixChKey('ash')]}; }
  /* the durhang pipe, worn: the soreness of a "yes, but" not felt going in */
  await fight({sgt:'b4_c1_durhangpipe'}, () => { S.bruised = {sgt:3, brisk:3}; }); out.pipe = {sgt:P('sgt').maxhp - P('sgt').hp, brisk:P('brisk').maxhp - P('brisk').hp};
  /* checks: the map in the Gadrobi Hills, the paybook page on a debt, the shells against the rattle, the dock's second roll */
  const nm = es => es.map(e => e[0] + ':' + e[1]).join(',');
  S = newState('Checks'); S.squad = ['sgt', 'brisk']; S.gear.sgt = {trinket:'tyrantmap'}; S.gear.brisk = {trinket:'b5_c7_ledgerpage'};
  S.chapter = 5; out.map5 = /Tyrant/.test(nm(edgesFor({check:['wits', 12]}, 'sgt'))); S.chapter = 4; out.map4 = /Tyrant/.test(nm(edgesFor({check:['wits', 12]}, 'sgt')));
  out.page = /paybook/.test(nm(edgesFor({t:'Settle the debt with the clerk.', check:['guile', 12]}, 'brisk'))); out.pageNot = /paybook/.test(nm(edgesFor({t:'Climb the wall.', check:['might', 12]}, 'brisk')));
  S.gear.sgt = {trinket:'b5_c2_shells'}; S.rattled = {sgt:1, brisk:1}; out.shells = [/rattled/.test(nm(edgesFor({check:['wits', 12]}, 'sgt'))), /rattled/.test(nm(edgesFor({check:['wits', 12]}, 'brisk')))];
  S.rattled = {}; S.gear.sgt = {trinket:'b5_c7_dock'}; S.chapter = 3; { const q = [nat(1), nat(20), nat(1), nat(20)]; Math.random = () => q.length ? q.shift() : .5;
    const c1 = check('wits', 15, 'sgt', {check:['wits', 15, 'sgt']}), c2 = check('wits', 15, 'sgt', {check:['wits', 15, 'sgt']}); free(); out.dock = {first:c1.pass && !!c1.ixDock, second:!c2.pass}; }
  /* the shard: Brack's joke, and nothing else */
  await fight({}); const s0 = P('sgt'); await fight({sgt:'spawnshard'}); const s1 = P('sgt');
  const sh = ITEMS.spawnshard; out.shard = ['ac', 'atk', 'hp', 'mv', 'rng', 'dmg', 'stat', 'reach'].every(k => sh[k] == null) && !IX_SPECIAL.spawnshard && ['maxhp', 'ac', 'atk', 'init', 'mv', 'rng'].every(k => s0[k] === s1[k]) && s0.ab.join() === s1.ab.join()
    && (S.gear.sgt = {trinket:'spawnshard'}, nm(edgesFor({check:['wits', 12]}, 'sgt')) === (S.gear.sgt = {}, nm(edgesFor({check:['wits', 12]}, 'sgt'))));
  out.special = Object.keys(IX_SPECIAL).filter(k => !ITEMS[k]);
  return out; });
ok(!r.noDmg.length, `every weapon has its own damage${r.noDmg.length ? ': missing ' + r.noDmg.join(', ') : ''}`);
ok(!r.downgrade.length, `no weapon is a downgrade for every soldier who can use it${r.downgrade.length ? ': ' + r.downgrade.join(', ') : ''}`);
ok(r.hocArmour >= 3, `Book Four has armour (${r.hocArmour} pieces)`);
ok(!r.newBad.length, `the new pieces each have a role, a picture and a place where they are found${r.newBad.length ? ': ' + r.newBad.join(', ') : ''}`);
ok(!r.numLines.length, `no item's prose carries its numbers${r.numLines.length ? ': ' + r.numLines.join(', ') : ''}`);
ok(r.init[0] === 1 && r.init[1] === 1, `the Hound's tooth and the conch: +1 initiative (${r.init})`);
ok(r.pot.ab && r.pot.ok && r.pot.fires >= 4 && !r.pot.again, `the brand-pot: an action, ${r.pot.fires} tiles of pitch, once a fight`);
ok(r.mask[0] === 2 && r.mask[1] === 0, `the Fete mask: +2 armour in the first round only (${r.mask})`);
ok(!r.dog.first && r.dog.second && r.dog.used, `the dog's tooth turns the first blow, once (${JSON.stringify(r.dog)})`);
ok(r.rope.first && !r.rope.second, `the ferry rope, worn: the first attack steadied (${JSON.stringify(r.rope)})`);
ok(r.crow === 1, `the crow's feather: one miss rolled again (${r.crow})`);
ok(r.lamp && r.lampOnce !== false, `the lamp-chip dazzles the first blow it lands, once`);
ok(r.stripe[0] === 2 && r.stripe[1] === 0, `Treach's stripe: +2 damage below half health only (${r.stripe})`);
ok(r.wolf[0] === 1 && r.wolf[1] === 0, `the wolf's tooth: +1 damage on the wounded only (${r.wolf})`);
ok(r.ash.first === 0 && r.ash.second > 0 && r.ash.flag, `the green ash: the first fire does not burn, the second does (${JSON.stringify(r.ash)})`);
ok(r.pipe.sgt === 0 && r.pipe.brisk === 3, `the durhang pipe, worn: its wearer goes in without the soreness (${JSON.stringify(r.pipe)})`);
ok(r.map5 && !r.map4, 'the Tyrant\'s map: +1 to Wits in the Gadrobi Hills, not elsewhere');
ok(r.page && !r.pageNot, 'the paybook page: +1 on a debt check, not a climb');
ok(!r.shells[0] && r.shells[1], 'the Shake shells: their wearer is never rattled on a check');
ok(r.dock.first && r.dock.second, `the holed dock: one failed check a chapter rolled again (${JSON.stringify(r.dock)})`);
ok(r.shard, 'the Genuine Shard of Moon\'s Spawn still does nothing');
ok(!r.special.length, `every special named is a real item${r.special.length ? ': ' + r.special.join(', ') : ''}`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close();
if (bad.length) { console.log(`\n${bad.length} FAILED`); process.exit(1); } console.log('\nall passed'); process.exit(0);
