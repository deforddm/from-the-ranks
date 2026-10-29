// v7.2: gear by role (src/38c_roster.js). Every item has a role or a signature name list; every soldier has roles; the old odd
// exclusions are gone (Darrut wears the Aren Guard mail, Haddat the relic, Dannet a shield, Rasp what Tangle can); the sheet, placeGear and
// allocateGear go by role; and no piece is ever worn by two squadmates after unrecruit, letGo, kill or a roster move.
// Usage: node tools/gear_roles_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
const bad = [], ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) bad.push(m); };
const r = await page.evaluate(() => { const out = {};
  gearRolesApply();
  out.noRole = Object.entries(ITEMS).filter(([k, it]) => !it.role && !(Array.isArray(it.who) && it.who.length)).map(([k]) => k);
  out.badRole = Object.entries(ITEMS).filter(([k, it]) => it.role && [].concat(it.role).some(r => !GEAR_TAGW[r])).map(([k]) => k);
  out.noRoles = Object.keys(TPL).filter(id => !Array.isArray(TPL[id].roles) || !TPL[id].roles.length);
  out.sig = Object.entries(ITEMS).filter(([k, it]) => Array.isArray(it.who)).map(([k]) => k).sort().join(',');
  out.darrut = canWear('darrut', 'b2_arenmail'); out.haddatRelic = canWear('haddat', 'b4_c1_relic'); out.dannet = canWear('greysword', 'b3_c3_shield');
  out.raspSpade = canWear('rasp', 'b4_c6_trenchspade'); out.mirrelLeathers = canWear('mirrel', 'b2_tleathers'); out.sohraBow = canWear('sohra', 'b3_c2_hornbow');
  out.ellisB3 = canWear('ellis', 'b3_c2_hornbow'); out.vellKnife = canWear('vell', 'b4_c3_khundrylknife');
  out.briskCloak = canWear('brisk', 'toccloak'); out.tuftKnife = canWear('tuft', 'clawknife'); out.badge = canWear('kettle', 'secondbadge');
  out.view = itemInfo('item/b2_arenmail').who + ' | ' + itemInfo('item/secondbadge').who + ' | ' + itemInfo('item/houndtooth').who;
  /* one wearer per piece, through every way out of the squad */
  const twice = () => { const seen = {}, dup = []; S.squad.forEach(w => Object.values(S.gear[w] || {}).forEach(it => { if (seen[it]) dup.push(it); seen[it] = 1; })); return dup; };
  const offWorn = () => Object.keys(S.gear).filter(w => !S.squad.includes(w) && Object.keys(S.gear[w] || {}).length);
  S = newState('Tidy'); S.chapter = 4; S.picksDue = []; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl', 'ellis']; ['ellis', 'vell'].forEach(k => { S.loy[k] = 0; });
  S.kit = ['guildblade', 'scoutcloak', 'daruknife']; S.gear.ellis = {weapon:'guildblade', armour:'scoutcloak'}; save();
  unrecruit('ellis'); out.unrec = {gear:JSON.stringify(S.gear.ellis), parked:JSON.stringify(S.parked.ellis || {})};
  equip('kettle', 'guildblade'); out.unrecTwice = twice().length + offWorn().length;
  S.squad.push('ellis'); gearTidy(); out.backTwice = twice().length; out.backHas = JSON.stringify(S.gear.ellis);
  S.gear.ellis = {weapon:'daruknife'}; letGo('ellis', 'x'); out.letGo = offWorn().length; S.gear.vell = {weapon:'daruknife'}; S.squad.push('vell'); gearTidy(); out.letGoTwice = twice().length;
  kill('vell'); out.killed = offWorn().length + twice().length;
  /* the roster: Book Three, Ellis to camp and back */
  S = newStateMOI('Tidy3'); S.picksDue = []; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl', 'ellis']; S.loy.ellis = 0; S.kit = ['b3_c2_hornbow', 'scoutcloak']; S.gear.ellis = {weapon:'b3_c2_hornbow', armour:'scoutcloak'}; S.f.b3_sohraDone = 2; save();
  rosterSwap('ellis', 'sohra'); out.swap = {sq:S.squad.join(','), ellis:JSON.stringify(S.gear.ellis), sohra:JSON.stringify(S.gear.sohra), twice:twice().length, off:offWorn().length};
  rosterSwap('sohra', 'ellis'); out.back = {ellis:JSON.stringify(S.gear.ellis), twice:twice().length, off:offWorn().length};
  rosterSwap('ellis', 'sohra'); allocateGear(); out.alloc = {sohra:S.gear.sohra && S.gear.sohra.weapon, twice:twice().length};
  rosterSwap('sohra', 'ellis'); out.back2 = {ellis:JSON.stringify(S.gear.ellis), twice:twice().length, off:offWorn().length};
  /* placeGear and the sheet go by role: a shield found in Book Three goes to a shield-bearer */
  S = newStateMOI('Shield'); S.picksDue = []; S.squad = ['sgt', 'tuft', 'ohl', 'greysword']; S.loy.greysword = 0; S.kit = []; ['sgt', 'tuft', 'ohl', 'greysword'].forEach(k => S.gear[k] = {}); S.gear.sgt = {armour:'heater'}; S.kit.push('heater'); save();
  gain('b3_c3_shield'); out.place = Object.keys(S.gear).find(w => S.gear[w].armour === 'b3_c3_shield');
  openChars(S.squad.indexOf('greysword')); out.sheet = /A Capan round shield/.test($('#chars').textContent); closeChars();
  openChars(S.squad.indexOf('tuft')); out.sheetTuft = /A Capan round shield/.test($('#chars').textContent); closeChars();
  return out; });
console.log(JSON.stringify(r));
ok(!r.noRole.length, `every item has a role or a signature who-list (${r.noRole.join(',') || 'all'})`);
ok(!r.badRole.length, `every role is a known one (${r.badRole.join(',') || 'all'})`);
ok(!r.noRoles.length, `every soldier has roles (${r.noRoles.join(',') || 'all'})`);
ok(r.sig === 'b2_sealskin,b5_c1_weightbag,moranthchit,secondbadge', `only the signature pieces keep a name list (${r.sig})`); // v8.0: Thegg's weight-sack (the Book Five brief: who:['thegg'])
ok(r.darrut && r.haddatRelic && r.dannet, 'Darrut can wear the Aren Guard mail, Haddat the relic, Dannet a shield');
ok(r.raspSpade && r.mirrelLeathers && r.sohraBow && r.ellisB3 && r.vellKnife, 'Rasp the spade, Mirrel light leathers, Sohra and Ellis a Book Three bow, Vell a Book Four knife');
ok(!r.briskCloak && !r.tuftKnife && !r.badge, 'roles still exclude: no cloak on Brisk, no blade for Tuft, the badge stays Brisk\'s');
ok(/heavy armour|mail/.test(r.view) && /stays with/.test(r.view) && /Anyone in the squad/.test(r.view), `the item viewer says who by role (${r.view})`);
ok(r.unrec.gear === '{}' && /guildblade/.test(r.unrec.parked), 'unrecruit takes the gear off (into the pack, remembered)');
ok(r.unrecTwice === 0 && r.backTwice === 0, `nothing worn twice after unrecruit, an equip and a return (${r.unrecTwice}, ${r.backTwice}; back: ${r.backHas})`);
ok(r.letGo === 0 && r.letGoTwice === 0 && r.killed === 0, 'nothing worn twice or off the squad after letGo and kill');
ok(r.swap.sq === 'sgt,brisk,kettle,tuft,ohl,sohra' && r.swap.ellis === '{}' && r.swap.twice === 0 && r.swap.off === 0, `the roster parks Ellis's gear when she goes to camp (${JSON.stringify(r.swap)})`);
ok(r.alloc.twice === 0, 'allocateGear deals by role, nothing twice');
ok(r.back.twice === 0 && r.back.off === 0 && /scoutcloak/.test(r.back.ellis) && /hornbow/.test(r.back.ellis), `Ellis comes back and wears what she wore (${r.back.ellis})`);
ok(r.back2.twice === 0 && r.back2.off === 0, `what was dealt out while Ellis waited stays where it went: her return takes nothing off anybody (${JSON.stringify(r.back2)})`);
ok(r.place === 'greysword', `a found shield goes to Dannet, the shield-bearer with a free hand (${r.place})`);
ok(r.sheet && !r.sheetTuft, 'the sheet offers the shield to Dannet and not to Tuft');
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
console.log(bad.length ? `gear_roles: FAIL (${bad.length})` : 'gear_roles: all ok'); process.exit(bad.length ? 1 : 0);
