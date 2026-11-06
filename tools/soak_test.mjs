// v10.2 soak (docs/v10.2-spec.md §1): who has it, the cap, min 1, after the difficulty, and what goes past it
// (munitions, sorcery, pierce, aimed shots, the flank). Also the chips: the character sheet and a foe's info.
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const o = await page.evaluate(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms)), r = {};
  S = newState('Hask'); S.chapter = 3; S.lvl = 4; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; migrate(S); save();
  r.sq = {sgt:squadSoak('sgt'), brisk:squadSoak('brisk'), kettle:squadSoak('kettle')};
  S.gear.sgt = Object.assign({}, S.gear.sgt, {armour:'b2_arenmail'}); r.sgtMail = squadSoak('sgt');
  S.gear.brisk = Object.assign({}, S.gear.brisk, {armour:'b2_officerscale'}); r.briskScale = squadSoak('brisk');
  r.foe = {guildveteran:foeSoak('guildveteran'), greycloak:foeSoak('greycloak'), raest:foeSoak('raest'), b3_khell:foeSoak('b3_khell'), b3_c7_hurthunter:foeSoak('b3_c7_hurthunter'), bruiser:foeSoak('bruiser')};
  r.pierce = {xbow:foePierce('xbow'), b7_malxbow:foePierce('b7_malxbow'), clawmage:foePierce('clawmage'), bruiser:foePierce('bruiser')};
  // a fight to try blows in
  startBattle('knives', {}); await wait(700);
  const P = id => B.units.find(u => u.id === id);
  r.unitSoak = {sgt:P('sgt').soak, brisk:P('brisk').soak, ohl:P('ohl').soak};
  const vet = mkFoe('guildveteran', 6, 8); vet.parryLeft = 0; B.units.push(vet);
  r.vetSoak = vet.soak;
  // straight to hurt(): soak comes off, down to 1
  const hp0 = vet.hp; vet.soakNext = 1; hurt(vet, 5); r.cut5 = hp0 - vet.hp; vet.hp = vet.maxhp;
  vet.soakNext = 1; hurt(vet, 1); r.cut1 = vet.maxhp - vet.hp; vet.hp = vet.maxhp;
  r.logSkid = B.log.find(l => /skids off/.test(l)) || '';
  // after the difficulty: Story scales a squad wound ×0.7 first, then soak
  const br0 = P('brisk'); S.diff = 'story'; const b0 = br0.hp; br0.soakNext = 2; hurt(br0, 10); r.story = b0 - br0.hp; br0.hp = br0.maxhp; S.diff = 'soldier';
  // a real blow through attack(), with the dice fixed: hit, damage known from the log line
  const rnd = Math.random; Math.random = () => .7;
  const blow = async (a, t, o = {}) => { t.hp = t.maxhp; t.parryLeft = 0; const n0 = B.log.length; const res = attack(a, t, o); await wait(500); const lost = t.maxhp - t.hp; t.hp = t.maxhp; return {hit:res.hit, dmg:res.dmg, lost, line:B.log[0]}; };
  const sgt = P('sgt'); B.units.filter(u => u.side === 'e' && u !== vet).forEach(u => { u.hp = 0; });
  sgt.x = 5; sgt.y = 8; vet.x = 6; vet.y = 8; B.units.filter(u => u.side === 'p' && u !== sgt).forEach((u, i) => { u.x = i; u.y = 0; });
  r.plain = await blow(sgt, vet);
  // the flank: Brisk on the far side
  const bk = P('brisk'); bk.x = 7; bk.y = 8; r.flank = await blow(sgt, vet); r.flankFl = atkCalc(sgt, vet).fl; bk.x = 1; bk.y = 0;
  // sorcery: Tuft's lash, and an enemy's sorcery flag
  const tuft = P('tuft'); tuft.x = 6; tuft.y = 6; r.tuft = await blow(tuft, vet); tuft.x = 3; tuft.y = 0;
  r.sorcOpt = soakPast(sgt, vet, {sorc:true}, false, false);
  r.ground = soakPast(sgt, vet, {ground:true}, false, false);
  // aimed: a marked target
  vet.markedUntil = B.round + 2; vet.markDmg = 2; r.marked = await blow(sgt, vet); vet.markedUntil = -1;
  // pierce: Kettle's crossbow from range, a squadmate with a crossbow item, an enemy crossbowman on Brisk
  const ket = P('kettle'); ket.x = 6; ket.y = 5; r.kettle = await blow(ket, vet); ket.x = 2; ket.y = 0;
  S.gear.ohl = Object.assign({}, S.gear.ohl, {weapon:'darucrossbow'}); const ohl = P('ohl'); ohl.rng = 5; ohl.x = 6; ohl.y = 5; r.ohlXbow = soakPast(ohl, vet, {}, true, false); ohl.x = 4; ohl.y = 0;
  const xb = mkFoe('xbow', 7, 3); B.units.push(xb); bk.x = 7; bk.y = 7; r.xbow = await blow(xb, bk); xb.hp = 0;
  r.xbowTag = r.xbow.line;
  // a blow on Brisk from a plain enemy: soak 2 (base 16 and the officer's scale)
  const bru = mkFoe('bruiser', 6, 7); B.units.push(bru); bk.x = 7; bk.y = 7; r.onBrisk = await blow(bru, bk); bru.hp = 0;
  Math.random = rnd;
  // munitions: a blast at the veteran, soak does nothing
  vet.hp = vet.maxhp; const rnd2 = Math.random; Math.random = () => .5; const h1 = vet.hp; B.cur = sgt; blast({x:vet.x, y:vet.y}, [[1,10,2],[1,6,0]], '#fff'); Math.random = rnd2; r.blast = h1 - vet.hp; r.blastWant = 1 + Math.floor(.5 * 10) + 2;
  // the foe's info line
  B.over = false; B.cur = sgt; B.busy = false; B.acted = true; vet.hp = vet.maxhp; battleTap(vet.x, vet.y); r.info = B.log[0];
  B.over = true; B = null; view = 'title';
  // the sheet: Brisk's chip
  openChars(1); r.sheet = ($('#chars').querySelector('.chip.soak') || {}).textContent || ''; closeChars();
  return r;
});
ok(o.sq.sgt === 0 && o.sq.brisk === 1 && o.sq.kettle === 0, `squad soak by base armour 15+: ${JSON.stringify(o.sq)}`);
ok(o.sgtMail === 1 && o.briskScale === 2, `body armour of 3 adds 1, capped at 2: sgt+mail ${o.sgtMail}, brisk+scale ${o.briskScale}`);
ok(o.foe.guildveteran === 1 && o.foe.greycloak === 1 && o.foe.raest === 2 && o.foe.b3_khell === 2 && o.foe.b3_c7_hurthunter === 2 && o.foe.bruiser === 0, `foe soak: ${JSON.stringify(o.foe)}`);
ok(o.pierce.xbow && o.pierce.b7_malxbow && !o.pierce.clawmage && !o.pierce.bruiser, `enemy crossbowmen pierce: ${JSON.stringify(o.pierce)}`);
ok(o.unitSoak.sgt === 1 && o.unitSoak.brisk === 2 && o.unitSoak.ohl === 0 && o.vetSoak === 1, `units carry it: ${JSON.stringify(o.unitSoak)} vet ${o.vetSoak}`);
ok(o.cut5 === 4 && o.cut1 === 1, `soak 1 takes a 5 to 4, and a 1 stays 1 (min 1): ${o.cut5}, ${o.cut1}`);
ok(/skids off .*armour.*\(−1\)/.test(o.logSkid), `log: ${o.logSkid}`);
ok(o.story === 5, `after the difficulty: Story 10 → 7, then soak 2 → 5: ${o.story}`);
ok(o.plain.hit && o.plain.lost === o.plain.dmg - 1, `a plain blow on the veteran loses 1: ${o.plain.dmg} → ${o.plain.lost}`);
ok(o.flankFl && o.flank.lost === o.flank.dmg, `a flanking blow goes past: ${o.flank.dmg} → ${o.flank.lost}`);
ok(o.tuft.hit && o.tuft.lost === o.tuft.dmg && /sorcery/.test(o.tuft.line), `Tuft's lash is sorcery: ${o.tuft.dmg} → ${o.tuft.lost} · ${o.tuft.line}`);
ok(o.sorcOpt === 'sorcery' && o.ground === 'sorcery', `sorcery options (the Semk fire, the Land's Teeth): ${o.sorcOpt}, ${o.ground}`);
ok(o.marked.lost === o.marked.dmg && /aimed/.test(o.marked.line), `a marked target's hits are aimed: ${o.marked.dmg} → ${o.marked.lost}`);
ok(o.kettle.lost === o.kettle.dmg && /pierces/.test(o.kettle.line), `Kettle's crossbow pierces: ${o.kettle.dmg} → ${o.kettle.lost}`);
ok(o.ohlXbow === 'pierce', `a Daru crossbow pierces: ${o.ohlXbow}`);
ok(o.xbow.lost === o.xbow.dmg, `an enemy crossbowman pierces Brisk's soak: ${o.xbow.dmg} → ${o.xbow.lost}`);
ok(o.onBrisk.lost === Math.max(1, o.onBrisk.dmg - 2), `a bruiser's blow on Brisk loses 2: ${o.onBrisk.dmg} → ${o.onBrisk.lost}`);
ok(o.blast === o.blastWant, `munitions ignore soak: ${o.blast} of ${o.blastWant}`);
ok(/soak 1/.test(o.info), `foe info shows soak: ${o.info}`);
ok(o.sheet === 'soak 2', `the sheet's chip: "${o.sheet}"`);
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
process.exit(fail || errors.length ? 1 : 0);
