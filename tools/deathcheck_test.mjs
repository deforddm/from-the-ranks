// v10.2 death checks (docs/v10.2-spec.md §3): outcomes (nat 20, nat 1, three held, three slips), the DC by difficulty and the level
// bonus, none in mortal fights or on Story, Stabilise, the wound's effect, one wound (the worse kept), cleared at the fire and on a
// rest, the turn loop rolls, the second area resets the count, and the save round-trip (old saves without the field too).
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const o = await page.evaluate(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms)), r = {}, rnd = Math.random;
  const fix = v => { Math.random = () => v; }, unfix = () => { Math.random = rnd; };
  const nat = n => (n - 1) / 20 + .001; // Math.random for a d20 of n
  const fresh = (diff, lvl) => { S = newState('Hask'); S.diff = diff || 'soldier'; S.chapter = 3; S.lvl = lvl || 4; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; migrate(S); save(); };
  const fight = async (id) => { startBattle(id || 'knives', {}); await wait(500); B.busy = true; B.over = false; return B.units.find(u => u.id === 'brisk'); };
  const down = u => { u.hp = 0; u.dc = null; };
  fresh(); let bk = await fight();
  // natural 20: up at 1 and acts
  down(bk); fix(nat(20)); r.n20 = deathCheck(bk); unfix(); r.n20hp = bk.hp; r.n20line = B.log[0];
  // three held: steady, no wound, no more rolls
  down(bk); fix(nat(13)); r.held = [deathCheck(bk), deathCheck(bk), deathCheck(bk), deathCheck(bk)]; unfix(); r.heldDone = bk.dc.done; r.heldInj = injuryOf('brisk'); r.heldLine = B.log[0];
  // three slips: a wound
  down(bk); fix(nat(5)); r.slip = [deathCheck(bk), deathCheck(bk), deathCheck(bk)]; unfix(); r.slipDone = bk.dc.done; r.slipInj = injuryOf('brisk'); r.slipLine = B.log.find(l => /carrying/.test(l)) || '';
  S.injury = null;
  // natural 1 is two slips: a 1 and one more slip is a wound
  down(bk); fix(nat(1)); deathCheck(bk); unfix(); r.n1 = bk.dc.f; fix(nat(5)); deathCheck(bk); unfix(); r.n1done = bk.dc.done; S.injury = null;
  // the DC: 10 on Soldier (a 10 holds), the line with dice
  SET.dice = true; down(bk); fix(nat(10)); deathCheck(bk); unfix(); r.sol10 = bk.dc.s; r.diceLine = B.log[0]; SET.dice = false;
  B.over = true; B = null;
  // 11 on Bridgeburner: a 10 slips; at level 8 the +1 makes it
  fresh('bridgeburner', 4); bk = await fight(); down(bk); fix(nat(10)); deathCheck(bk); unfix(); r.bb10 = bk.dc.f; B.over = true; B = null;
  fresh('bridgeburner', 8); bk = await fight(); down(bk); fix(nat(10)); deathCheck(bk); unfix(); r.bb10l8 = bk.dc.s; B.over = true; B = null;
  // Story: no rolls
  fresh('story'); bk = await fight(); down(bk); r.story = deathCheck(bk); B.over = true; B = null;
  // a mortal fight: no rolls
  fresh(); BATTLES.__m = Object.assign({}, BATTLES.knives, {mortal:true}); bk = await fight('__m'); down(bk); r.mortal = deathCheck(bk); r.mortalAb = AB.stabilise.tiles(B.units.find(u => u.id === 'sgt')).length; B.over = true; B = null;
  // Stabilise: the button beside a downed one, the action, no wound, no more rolls
  fresh(); bk = await fight(); const sgt = B.units.find(u => u.id === 'sgt'); down(bk); sgt.x = bk.x + 1 > 7 ? bk.x - 1 : bk.x + 1; sgt.y = bk.y; if (!free(sgt.x, sgt.y, sgt)) { sgt.y = bk.y; }
  B.cur = sgt; B.busy = false; B.acted = false; B.mode = 'act'; view = 'battle'; updBattleUI(); r.btn = !!$('#ab_stabilise'); r.btnW = $('#ab_stabilise') ? $('#ab_stabilise').getBoundingClientRect().right : 0;
  $('#ab_stabilise') && $('#ab_stabilise').click(); r.mode = B.mode; battleTap(bk.x, bk.y); r.acted = B.acted; r.stab = bk.dc && bk.dc.done; r.stabRoll = deathCheck(bk); r.stabInj = injuryOf('brisk'); r.stabLine = B.log.find(l => /packs the wound/.test(l)) || '';
  await wait(400);
  // no button with nobody down beside
  bk.dc = null; sgt.x = (bk.x + 3) % 8; B.cur = sgt; B.busy = false; B.acted = false; updBattleUI(); r.noBtn = !$('#ab_stabilise') && !AB.stabilise.tiles(sgt).length;
  // the turn loop: Brisk's turn comes round, and the roll happens there
  down(bk); bk.dc = null; B.busy = true; B.idx = B.order.indexOf(bk) - 1; if (B.idx < -1) { B.order = [bk, ...B.order]; B.idx = -1; }
  const n0 = B.log.length; fix(nat(12)); nextTurn(); unfix(); r.loop = B.log.slice(0, B.log.length - n0).some(l => /fights for breath/.test(l)); r.loopS = bk.dc && bk.dc.s;
  B.over = true; B = null; view = 'title';
  // the wound: −3 max health or −1 to hit; one at a time, the worse kept
  fresh(); const base = mkParty('brisk', 0, 0); const u = {id:'brisk', name:'Brisk', x:0, y:0, side:'p'}; B = {log:[], fx:[], parts:[], units:[], def:{}};
  giveInjury(u, 'rib'); const rib = mkParty('brisk', 0, 0); r.rib = base.maxhp - rib.maxhp;
  giveInjury(u, 'cut'); r.keptWorse = S.injury.brisk; giveInjury(u, 'shoulder'); r.worse = S.injury.brisk; const sh = mkParty('brisk', 0, 0); r.hit = base.atk - sh.atk; r.shHp = base.maxhp - sh.maxhp;
  B = null;
  // the sheet shows it
  openChars(1); r.sheet = ($('#chars').querySelector('.chip.wound') || {}).textContent || ''; r.sheetW = $('#chars').querySelector('.chip.wound') ? $('#chars').querySelector('.chip.wound').getBoundingClientRect().right : 0; closeChars();
  // the save round-trip, and an old save without the field
  save(); const raw = JSON.stringify(S); const S2 = migrate(JSON.parse(raw)); r.round = S2.injury && S2.injury.brisk;
  const old = JSON.parse(raw); delete old.injury; S = migrate(old); r.oldOk = injuryOf('brisk') === null && mkParty('brisk', 0, 0).maxhp === base.maxhp; openChars(1); r.oldSheet = !$('#chars').querySelector('.chip.wound'); closeChars();
  // the fire clears it (Book One's Chapter 2 fire), and so does a rest
  S.injury = {brisk:'rib'}; S.book = 'gotm'; S.chapter = 2; try { DLG.c2_fire(); } catch (e) { r.fireErr = e.message; } r.fire = S.injury;
  S.injury = {brisk:'knee'}; rest(); r.rest = S.injury;
  // a fight's second area: the downed stand at a quarter, the count starts again, the wound stays
  fresh(); BATTLES.__s = Object.assign({}, BATTLES.knives, {after:'__safter', stage2:{title:'On', text:'On.', map:BATTLES.knives.map, foes:[['bruiser',3,1]], xp:10}}); DLG.__safter = () => ({sp:'A', txt:'B', ch:[{t:'C'}]});
  bk = await fight('__s'); down(bk); bk.dc = {s:2, f:2, done:'wound'}; S.injury = {brisk:'cut'}; B.busy = false;
  foes().forEach(f => hurt(f, 999)); checkEnd(); await wait(2500); $('#bOn') && $('#bOn').click(); await wait(800);
  const b2 = B && B.units.find(u => u.id === 'brisk'); r.s2 = {is:!!(B && B.def.isStage2), hp:b2 && b2.hp, dc:b2 && b2.dc, inj:S.injury && S.injury.brisk};
  if (B) { B.over = true; B = null; } view = 'title';
  return r;
});
ok(o.n20 === 'up' && o.n20hp === 1 && /gets up/.test(o.n20line), `natural 20: up at 1 health (${o.n20}, ${o.n20hp}): ${o.n20line}`);
ok(o.held.slice(0, 3).every(x => x === 'rolled') && o.held[3] === false && o.heldDone === 'steady' && !o.heldInj, `three held: steady, no wound, no more rolls: ${JSON.stringify(o.held)} ${o.heldDone}`);
ok(/steady/.test(o.heldLine), `steady line: ${o.heldLine}`);
ok(o.slipDone === 'wound' && o.slipInj && /carrying/.test(o.slipLine), `three slips: a wound (${o.slipInj && o.slipInj.name}): ${o.slipLine}`);
ok(o.n1 === 2 && o.n1done === 'wound', `natural 1 counts two slips: ${o.n1}, then one more: ${o.n1done}`);
ok(o.sol10 === 1 && /\(10 vs 10\)/.test(o.diceLine), `Soldier: a 10 holds, and the dice show: ${o.diceLine}`);
ok(o.bb10 === 1, `Bridgeburner: a 10 slips against 11 (${o.bb10})`);
ok(o.bb10l8 === 1, `Bridgeburner at level 8: a 10 +1 holds (${o.bb10l8})`);
ok(o.story === false, `Story: no rolls (${o.story})`);
ok(o.mortal === false && o.mortalAb === 0, `a mortal fight: no rolls, no Stabilise (${o.mortal}, ${o.mortalAb})`);
ok(o.btn && o.btnW <= 360, `the Stabilise button shows beside a downed one, and fits a 360px screen (${o.btnW}px)`);
ok(o.mode === 'stabilise' && o.acted && o.stab === 'stable' && o.stabRoll === false && !o.stabInj, `Stabilise: the action spent, no more rolls, no wound (${o.mode}, ${o.acted}, ${o.stab})`);
ok(/packs the wound/.test(o.stabLine), `Stabilise line: ${o.stabLine}`);
ok(o.noBtn, 'no button with nobody down beside');
ok(o.loop && o.loopS === 1, `the turn loop rolls on the downed one's turn (${o.loop}, held ${o.loopS})`);
ok(o.rib === 3, `a cracked rib: −3 max health (${o.rib})`);
ok(o.keptWorse === 'rib' && o.worse === 'shoulder', `one wound; the worse kept (${o.keptWorse}, then ${o.worse})`);
ok(o.hit === 1 && o.shHp === 0, `a wrenched shoulder: −1 to hit (${o.hit}), health untouched (${o.shHp})`);
ok(/wrenched shoulder/.test(o.sheet) && o.sheetW <= 360, `the sheet shows it: "${o.sheet}" (${o.sheetW}px)`);
ok(o.round === 'shoulder', `the save round-trip keeps it (${o.round})`);
ok(o.oldOk && o.oldSheet, 'an old save without the field: no wound, no error');
ok(!o.fireErr && !o.fire, `the chapter's fire clears it (${JSON.stringify(o.fire)}${o.fireErr ? ' ' + o.fireErr : ''})`);
ok(!o.rest, `a rest clears it (${JSON.stringify(o.rest)})`);
ok(o.s2.is && o.s2.hp > 0 && !o.s2.dc && o.s2.inj === 'cut', `the second area: up at a quarter, the count reset, the wound kept: ${JSON.stringify(o.s2)}`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
process.exit(fail || errors.length ? 1 : 0);
