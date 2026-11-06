// v10.2 wards (docs/v10.2-spec.md §2): overheal on a squadmate becomes a ward, capped at 25% of max health; one ward only,
// replaced only by a bigger one, never added to; it takes damage after soak (sorcery and munitions included); it carries
// into a fight's second area and is gone when the fight ends, and never reaches the save.
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const o = await page.evaluate(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms)), r = {};
  S = newState('Hask'); S.chapter = 3; S.lvl = 4; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; migrate(S); save();
  BATTLES.__w = Object.assign({}, BATTLES.knives, {after:'__wafter', stage2:{title:'Further in', text:'More.', map:BATTLES.knives.map, foes:[['bruiser',3,1]], xp:10}});
  DLG.__wafter = () => ({sp:'After', txt:'Done.', ch:[{t:'Leave'}]});
  startBattle('__w', {}); await wait(700);
  const P = id => B.units.find(u => u.id === id), sgt = P('sgt'), bk = P('brisk'), ohl = P('ohl');
  r.cap = {sgt:wardCap(sgt), max:sgt.maxhp};
  // a plain heal past full: Salve
  sgt.hp = sgt.maxhp - 2; heal(sgt, 4); r.small = sgt.ward; r.plainLine = B.log[0];
  // another overheal of the same size: no stacking (2 and 2 stay 2)
  heal(sgt, 2); r.noStack = sgt.ward;
  // a smaller one does nothing
  heal(sgt, 1); r.smaller = sgt.ward;
  // a big one replaces, up to the cap
  heal(sgt, 99); r.big = sgt.ward;
  // Denul through Mend: the Denul line
  ohl.x = bk.x + 1; ohl.y = bk.y; bk.hp = bk.maxhp - 1; B.cur = ohl; B.busy = false; B.acted = false; ohl.strain = 0;
  const rnd = Math.random; Math.random = () => .9; useAb('mend', bk.x, bk.y); Math.random = rnd; await wait(300);
  r.denul = {ward:bk.ward, line:B.log.find(l => /A ward of/.test(l)) || ''};
  // Soliel's oil on a turn start: the warm line
  S.boons = {on:['soliel']}; const boonOn = boon('soliel'); const t = P('tuft'); t.hp = t.maxhp - 1; B.healSrc = 'soliel'; heal(t, 3); B.healSrc = null; r.soliel = B.log.find(l => /oil stays warm/.test(l)) || ''; S.boons = null; r.boonOn = boonOn;
  // absorb after soak: Brisk soak 1, a 6 → 5, then the ward
  bk.ward = 3; bk.hp = bk.maxhp; bk.soakNext = bk.soak; hurt(bk, 6); r.absorb = {lost:bk.maxhp - bk.hp, ward:bk.ward, soak:bk.soak};
  // the ward takes it all: no health lost
  bk.ward = 3; bk.hp = bk.maxhp; hurt(bk, 2); r.allWard = {lost:bk.maxhp - bk.hp, ward:bk.ward};
  // sorcery and munitions (straight to hurt, past soak) still meet the ward
  bk.ward = 4; bk.hp = bk.maxhp; hurt(bk, 7); r.sorc = {lost:bk.maxhp - bk.hp, ward:bk.ward};
  // into the second area
  bk.hp = bk.maxhp; bk.ward = 0; sgt.ward = 5; const sgtW = sgt.ward;
  foes().forEach(f => hurt(f, 999)); checkEnd(); await wait(2500);
  $('#bOn') && $('#bOn').click(); await wait(800);
  r.stage2 = {is:!!(B && B.def.isStage2), sgt:B && B.units.find(u => u.id === 'sgt').ward, want:sgtW, brisk:B && B.units.find(u => u.id === 'brisk').ward};
  // the end of the fight: gone, and not in the save
  foes().forEach(f => hurt(f, 999)); checkEnd(); await wait(2800);
  r.saved = JSON.stringify(S).includes('"ward"') || !!(S.bopt && S.bopt.wards && Object.keys(S.bopt.wards).length); r.scene = S.scene;
  startBattle('knives', {}); await wait(600);
  r.after = B.units.filter(u => u.side === 'p').map(u => u.ward || 0).reduce((a, b) => a + b, 0);
  B.over = true; B = null; view = 'title';
  return r;
});
ok(o.cap.sgt === Math.round(o.cap.max * .25), `cap is 25% of max health, rounded: ${o.cap.sgt} of ${o.cap.max}`);
ok(o.small === 2, `a heal of 4 at 2 below full leaves a ward of 2: ${o.small}`);
ok(/past whole.*A ward of 2/.test(o.plainLine), `the plain line: ${o.plainLine}`);
ok(o.noStack === 2, `a second overheal of 2 does not add (David: never stacks): ${o.noStack}`);
ok(o.smaller === 2, `a smaller one changes nothing: ${o.smaller}`);
ok(o.big === o.cap.sgt, `a bigger one replaces it, at the cap: ${o.big}`);
ok(o.denul.ward > 0 && /Clean skin closes/.test(o.denul.line), `Mend past full: Denul's line, ward ${o.denul.ward}: ${o.denul.line}`);
ok(/oil stays warm/.test(o.soliel), `Soliel's line: ${o.soliel}`);
ok(o.absorb.soak === 1 && o.absorb.ward === 0 && o.absorb.lost === 2, `after soak: 6 − soak 1 = 5, ward 3 takes 3, health loses 2: ${JSON.stringify(o.absorb)}`);
ok(o.allWard.lost === 0 && o.allWard.ward === 1, `a blow the ward covers costs no health: ${JSON.stringify(o.allWard)}`);
ok(o.sorc.lost === 3 && o.sorc.ward === 0, `damage past soak (sorcery, munitions) still meets the ward: ${JSON.stringify(o.sorc)}`);
ok(o.stage2.is && o.stage2.sgt === o.stage2.want && !o.stage2.brisk, `the ward carries into the second area: ${JSON.stringify(o.stage2)}`);
ok(o.after === 0, `gone when the fight ends: ${o.after}`);
ok(!o.saved, 'no ward in the save once the fight is over');
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
process.exit(fail || errors.length ? 1 : 0);
