// v6.9.0: the gods' boons. When a god answers a wipe, its boon goes on the fight fought again: they stack by god, last the
// fight and its second ground, and end when the fight is won. Story keeps the newest two. Every patron in every book has one.
// Usage: node tools/boons_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const r = await page.evaluate(async () => { const wait = ms => new Promise(r => setTimeout(r, ms)); const out = {}; try {
  const settle = async () => { for (let i = 0; i < 60 && !(B && B.cur && B.cur.side === 'p' && !B.busy); i++) await wait(100); };
  const freeze = () => { B.busy = true; B.over = true; }; // no turns play out while a mechanic is poked
  // every patron of every book has a boon
  const gods = Object.keys(PATRONS).map(id => PATRONS[id].god); out.patrons = Object.keys(PATRONS).length; out.unboonod = gods.filter(g => !BOONS[g]);
  S = newState('Hask'); S.book = 'moi'; out.treach = patronBoon('sgt') && patronBoon('sgt').key; S.book = 'gotm'; out.fener = patronBoon('sgt') && patronBoon('sgt').key;
  // every god has a sigil of its own (v6.9.2): the squadmate's own, or the one it borrows (Book Two's Hood, Oponn and Soliel)
  const sigOf = id => { const P = PATRONS[id]; return 'patrons/' + (P.sig || id); };
  out.noSigil = Object.keys(PATRONS).filter(id => id !== 'sgt' && !ART[sigOf(id)]).map(sigOf);
  S.book = 'moi'; out.sgtMoi = sigOf('sgt') + ':' + !!ART[sigOf('sgt')]; S.book = 'gotm'; out.sgtGotm = sigOf('sgt') + ':' + !!ART[sigOf('sgt')];
  out.distinct = new Set(Object.keys(PATRONS).map(id => id === 'sgt' ? 'patrons/sgt' : sigOf(id)).concat(['patrons/treach'])).size;
  // a two-ground fight; Brisk most loyal (Hood), then Ohl (Soliel)
  S = newState('Hask'); S.chapter = 3; S.lvl = 4; S.squad = ['sgt','brisk','kettle','tuft','ohl']; migrate(S); S.loy.brisk = 2; S.loy.ohl = 1; save();
  BATTLES.__b = Object.assign({}, BATTLES.knives, {after:'__after', stage2:{title:'The courtyard', text:'Further in.', map:BATTLES.knives.map, foes:[['bruiser',3,1],['guildveteran',4,1]], xp:50}});
  DLG.__after = () => ({sp:'After', txt:'Done.', ch:[{t:'Leave'}]});
  startBattle('__b', {}); await settle();
  out.noChips = !$('#boons'); out.noBoons = boonsOn().length === 0;
  // wipe 1: Hood answers, and the screen names the boon
  party().forEach(u => { u.hp = 0; }); checkEnd(); await wait(2500);
  const sheet = $('#sheet').innerText; out.godScreen = /Hood/.test(sheet) && /The boon: The gate stays shut/.test(sheet) && /its second ground/.test(sheet);
  out.beforeRetry = !S.boons;
  $('#bRetry').click(); await wait(250); // the log line is written as the fight starts, before the first turns push it down the capped log
  out.logLine = B.log.some(l => /The gods. boons/.test(String(l)) && /gate stays shut/.test(String(l))); out.logHead = B.log.slice(0, 4).map(String);
  await settle();
  out.afterRetry = JSON.stringify(S.boons && S.boons.gods); out.chips = $('#boons') ? $('#boons').querySelectorAll('.boon').length : -1; out.chipText = $('#boons') && $('#boons').textContent;
  // Hood: once each, for the fight
  freeze(); const b = B.units.find(u => u.id === 'brisk'); b.hp = 5; hurt(b, 999); out.hoodOnce = b.hp; hurt(b, 999); out.hoodTwice = b.hp; out.spared = JSON.stringify(S.boons.spared);
  const k = B.units.find(u => u.id === 'kettle'); k.hp = 5; hurt(k, 999); out.hoodEach = k.hp;
  // wipe 2 (Ohl's god joins Hood's); the chips show both
  B.over = false; party().forEach(u => { u.hp = 0; }); checkEnd(); await wait(2500);
  out.godScreen2 = /Soliel/.test($('#sheet').innerText) && /It joins Hood's/.test($('#sheet').innerText);
  $('#bRetry').click(); await settle();
  out.stacked = JSON.stringify(S.boons.gods); out.chips2 = $('#boons').querySelectorAll('.boon').length;
  // Soliel: heals 3 and stops the bleeding at the turn's start
  freeze(); const o = B.units.find(u => u.id === 'ohl'); o.hp = o.maxhp - 10; o.bleed = 2; squadTurnStart(o); out.soliel = {hp:o.maxhp - o.hp, bleed:o.bleed};
  // into the second ground with the boons, and gone when it is won
  B.over = false; foes().forEach(f => hurt(f, 999)); checkEnd(); await wait(2500); $('#bOn') && $('#bOn').click(); await settle();
  out.stage2 = !!(B && B.def.isStage2); out.stage2Boons = JSON.stringify(boonsOn()); out.stage2Chips = $('#boons') ? $('#boons').querySelectorAll('.boon').length : -1;
  foes().forEach(f => hurt(f, 999)); checkEnd(); await wait(2500);
  out.won = S.scene; out.cleared = !S.boons;
  // the rest of the boons, one fight with all of them on
  S = newState('Hask'); S.chapter = 3; S.lvl = 4; S.squad = ['sgt','brisk','kettle','tuft','ohl']; migrate(S); save();
  const mk = id => { startBattle('__b', {}); return null; };
  startBattle('__b', {}); await settle(); freeze(); const sgt0 = B.units.find(u => u.id === 'sgt'), k0 = B.units.find(u => u.id === 'kettle'); const mv0 = sgt0.mv, ac0 = sgt0.ac, kmv0 = k0.mv;
  S.boons = {fight:'__b', gods:['oponn','shadow','rope','boar','tiger','cold','dream','ground','herd','wolves'], spared:{}}; save();
  startBattle('__b', {}); await settle(); freeze();
  const g = B.units.find(u => u.id === 'sgt'), kt = B.units.find(u => u.id === 'kettle'), e = foes()[0], e2 = foes()[1];
  out.moveArmour = {mv:g.mv - mv0, ac:g.ac - ac0, kettleMv:kt.mv - kmv0}; // the Rope +2 and the herd +2; the Wolves +1
  // the squad's blow: the Lady +2, the Tiger +2 beside a squadmate
  B.units.forEach(u => { u.x = 0; u.y = 0; }); g.x = 3; g.y = 3; e.x = 4; e.y = 3; e2.x = 6; e2.y = 6; kt.x = 4; kt.y = 4; e.hp = e.maxhp = 60; e.boss = false; e.immortal = false;
  const bon = (a, t) => atkCalc(a, t).bonus;
  const withAll = bon(g, e); S.boons.gods = []; const none = bon(g, e); S.boons.gods = ['oponn']; const lady = bon(g, e); S.boons.gods = ['tiger']; const tiger = bon(g, e); kt.x = 0; kt.y = 0; const tigerAlone = bon(g, e); kt.x = 4; kt.y = 4;
  out.hitMine = {lady:lady - none, tiger:tiger - none, tigerAlone:tigerAlone - none, all:withAll - none};
  // the enemy's blow: Shadow −2, the dream −2, no flank under Shadow, cold −1 on its turn, the herd −3 on a shot
  S.boons.gods = []; const eNone = bon(e, g); e2.x = 2; e2.y = 3; const eFlank = atkCalc(e, g); S.boons.gods = ['shadow']; const eShadow = atkCalc(e, g); S.boons.gods = ['dream']; const eDream = bon(e, g);
  out.hitTheirs = {flankOff:eFlank.fl, shadowFlank:eShadow.fl, shadow:eShadow.bonus - eNone, dream:eDream - eNone - (eFlank.fl ? 2 : 0)}; // under Shadow the flank is gone too, so its −2 is against the unflanked number
  e2.x = 6; e2.y = 6;
  S.boons.gods = ['cold']; B.turn++; B.cur = e; boonFoeTurnStart(e); out.cold = {mv:e.mv, full:e.mvFull, hit:bon(e, g) - eNone}; e.x = 7; e.y = 7; B.turn++; boonFoeTurnStart(e); out.coldOff = {mv:e.mv, hit:bon(e, g) - eNone}; e.x = 4; e.y = 3;
  S.boons.gods = ['wolves']; e.hp = 60; B.turn++; boonFoeTurnStart(e); out.wolves = 60 - e.hp; e.x = 7; e.y = 7; e.hp = 60; B.turn++; boonFoeTurnStart(e); out.wolvesFar = 60 - e.hp; e.x = 4; e.y = 3;
  S.boons.gods = ['herd']; const far = foes().find(f => f !== e && f !== e2) || e2; far.x = 3; far.y = 6; far.rng = 5; const sNone0 = (S.boons.gods = [], bon(far, g)); S.boons.gods = ['herd']; out.herdShot = bon(far, g) - sNone0; out.herdMelee = bon(e, g) - eNone;
  // the Rope: no free swings, no red corners
  S.boons.gods = []; const prov0 = provokes(g, g, {x:2, y:3}).length, cost0 = leaveCost(g, g.x, g.y); S.boons.gods = ['rope']; out.rope = {before:prov0, cost:cost0, after:provokes(g, g, {x:2, y:3}).length, costAfter:leaveCost(g, g.x, g.y)};
  // the Boar and the Tiger on the damage; the Lady's reroll on the first blow of a round
  const dmgWith = async gods => { S.boons.gods = gods; g.atk = 60; g.pullRound = -1; B.round++; let res; for (let i = 0; i < 40; i++) { B.log = []; res = attack(g, e, {dmg:[1,1,0]}); if (res.hit && !B.log.some(l => /critical/.test(String(l)))) break; } return res.dmg; }; // a plain hit: a crit doubles the die
  out.dmg = {none:await dmgWith([]), boar:await dmgWith(['boar']), tiger:await dmgWith(['tiger']), both:await dmgWith(['boar','tiger'])};
  S.boons.gods = ['oponn']; g.pullRound = -1; B.round++; B.log = []; attack(g, e, {dmg:[1,1,0]}); const pulled1 = B.log.some(l => /The Lady pulls/.test(l)); B.log = []; attack(g, e, {dmg:[1,1,0]}); const pulled2 = B.log.some(l => /The Lady pulls/.test(l)); out.pull = {first:pulled1, second:pulled2, round:g.pullRound === B.round};
  // the grandmother heals 2
  S.boons.gods = ['ground']; g.hp = g.maxhp - 10; g.bleed = 0; g.prone = false; g.slowTurn = false; squadTurnStart(g); out.ground = g.maxhp - g.hp;
  // Story keeps the newest two, and a god answering again moves to the front
  S.diff = 'story'; S.boons = {fight:'__b', gods:['hood','oponn'], spared:{}}; boonGrant('__b', BOONS['Soliel']); const cap = S.boons.gods.slice(); boonGrant('__b', BOONS['Oponn']); out.story = {cap, again:S.boons.gods.slice()};
  S.diff = 'soldier'; S.boons = {fight:'__b', gods:['hood','oponn'], spared:{}}; boonGrant('__b', BOONS['Soliel']); out.soldier = S.boons.gods.slice();
  boonGrant('__other', BOONS['Hood']); out.otherFight = S.boons.gods.slice();
  // nothing wider than the phone with the chips up
  S.boons = {fight:'__b', gods:['hood','oponn','shadow','soliel','rope','boar'], spared:{}}; startBattle('__b', {}); await settle(); freeze();
  out.fit = {chips:$('#boons').querySelectorAll('.boon').length, wide:document.documentElement.scrollWidth <= window.innerWidth, boonsWide:$('#boons').scrollWidth <= $('#boons').clientWidth + 1};
  } catch (e) { out.err = e.stack.split('\n').slice(0, 3).join(' | '); } return out; });
console.log(JSON.stringify(r));
ok(!r.err, 'no error in the page script' + (r.err ? ': ' + r.err : ''));
ok(r.patrons >= 15 && r.unboonod && r.unboonod.length === 0, `every patron has a boon (${r.patrons} patrons${r.unboonod && r.unboonod.length ? ', missing ' + r.unboonod.join(', ') : ''})`);
ok(r.treach === 'tiger' && r.fener === 'boar', `the sergeant's god follows the book: Treach in Book Three (${r.treach}), Fener otherwise (${r.fener})`);
ok(r.noSigil && r.noSigil.length === 0 && r.sgtMoi === 'patrons/treach:true' && r.sgtGotm === 'patrons/sgt:true', `every god has a sigil; Treach's is the tiger, Fener's the boar (${(r.noSigil || []).join(',') || 'none missing'}; ${r.sgtMoi}; ${r.sgtGotm})`);
ok(r.distinct === 12, `twelve distinct sigils across the three books (${r.distinct})`);
ok(r.noChips && r.noBoons, 'a fresh fight has no boons and no chips');
ok(r.godScreen && r.beforeRetry, 'the god\'s screen names the boon and its length; nothing is granted until Rise');
ok(r.afterRetry === '["hood"]' && r.chips === 1 && /Hood/.test(r.chipText || '') && r.logLine, `Rise: Hood's boon on the fight, one chip, the log line (${r.afterRetry}, ${r.chips} chip)`);
ok(r.hoodOnce === 1 && r.hoodTwice === 0 && r.hoodEach === 1, `Hood: the gate holds once for each squadmate (${r.hoodOnce} then ${r.hoodTwice}; Kettle ${r.hoodEach})`);
ok(r.godScreen2 && r.stacked === '["hood","soliel"]' && r.chips2 === 2, `a second god joins the first (${r.stacked}, ${r.chips2} chips)`);
ok(r.soliel && r.soliel.hp === 7 && r.soliel.bleed === 0, `Soliel: heals 3 and the bleeding stops (${JSON.stringify(r.soliel)})`);
ok(r.stage2 && r.stage2Boons === '["hood","soliel"]' && r.stage2Chips === 2, `the boons go into the second ground (${r.stage2Boons}, ${r.stage2Chips} chips)`);
ok(r.won === 'talk' && r.cleared, `won: the boons end with the fight (scene ${r.won}, cleared ${r.cleared})`);
ok(r.moveArmour && r.moveArmour.mv === 4 && r.moveArmour.kettleMv === 4 && r.moveArmour.ac === 1, `the Rope and the herd each add 2 move, the Wolves 1 armour (${JSON.stringify(r.moveArmour)})`);
ok(r.hitMine && r.hitMine.lady === 2 && r.hitMine.tiger === 2 && r.hitMine.tigerAlone === 0, `the Lady +2; the Tiger +2 only beside a squadmate (${JSON.stringify(r.hitMine)})`);
ok(r.hitTheirs && r.hitTheirs.flankOff === true && r.hitTheirs.shadowFlank === false && r.hitTheirs.shadow === -2 && r.hitTheirs.dream === -2, `Shadow: −2 and no flank; the dream −2 (${JSON.stringify(r.hitTheirs)})`);
ok(r.cold && r.cold.full && r.cold.mv === Math.ceil(r.cold.full / 2) && r.cold.hit === -1 && r.coldOff && r.coldOff.mv === r.cold.full && r.coldOff.hit === 0, `the cold: half pace and −1 beside the squad, gone the next turn (${JSON.stringify(r.cold)} → ${JSON.stringify(r.coldOff)})`);
ok(r.wolves >= 1 && r.wolves <= 4 && r.wolvesFar === 0, `the Wolves: 1d4 cold beside the squad, nothing at a distance (${r.wolves}, ${r.wolvesFar})`);
ok(r.herdShot === -3 && r.herdMelee === 0, `the herd: −3 on a shot, nothing on a blow (${r.herdShot}, ${r.herdMelee})`);
ok(r.rope && r.rope.before >= 1 && r.rope.after === 0 && r.rope.cost >= 1 && r.rope.costAfter === 0, `the Rope: no free swings and no red corners (${JSON.stringify(r.rope)})`);
ok(r.dmg && r.dmg.none === 1 && r.dmg.boar === 4 && r.dmg.tiger === 3 && r.dmg.both === 6, `the Boar +3 and the Tiger +2 on the damage (${JSON.stringify(r.dmg)})`);
ok(r.pull && r.pull.first && !r.pull.second && r.pull.round, `the Lady's reroll on the first blow of a round only (${JSON.stringify(r.pull)})`);
ok(r.ground === 8, `the grandmother heals 2 (${r.ground})`);
ok(r.story && JSON.stringify(r.story.cap) === '["oponn","soliel"]' && JSON.stringify(r.story.again) === '["soliel","oponn"]', `Story keeps the newest two; a god answering again moves up (${JSON.stringify(r.story)})`);
ok(JSON.stringify(r.soldier) === '["hood","oponn","soliel"]' && JSON.stringify(r.otherFight) === '["hood"]', `Soldier stacks them all; another fight starts clean (${JSON.stringify(r.soldier)}, ${JSON.stringify(r.otherFight)})`);
ok(r.fit && r.fit.chips === 6 && r.fit.wide && r.fit.boonsWide, `six chips fit a phone (${JSON.stringify(r.fit)})`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
