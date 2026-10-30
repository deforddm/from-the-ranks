// v8.1 items (src/14b_items.js): one stat line for every piece, everywhere; two trinket slots; smarter Allocate; the Pack's kit.
// Every item in every book formats with no "undefined" or NaN and every weapon says its damage; the same piece reads the same on the
// sheet, the item view, the Pack and a shop; two trinkets both count in a fight; an old save's one trinket stays in the first place;
// Allocate leaves nobody unarmed while a weapon they can use is in the pack (Book Five's Pessa and the spear); the Pack lists the kit.
// Usage: node tools/items_test.mjs [shotdir]   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const shots = process.argv[2] || null;
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, mobile: true, touch: true, width: 412, height: 860 });
const bad = [], ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) bad.push(m); };
const ev = (f, a) => page.evaluate(f, a);

// ---- every line ----
const lines = await ev(() => { gearRolesApply(); const o = {broken:[], noDmg:[], n:0};
  for (const [k, it] of Object.entries(ITEMS)) { o.n++; const l = itemStatLine(k), sh = itemStatShort(k);
    if (!l || /undefined|NaN|null|\[object/.test(l + sh)) o.broken.push(`${k}: ${l} / ${sh}`);
    if (it.slot === 'weapon' && !/\bdamage\b/.test(l)) o.noDmg.push(k);
    if (!l.startsWith({weapon:'Weapon', armour:'Armour', trinket:'Trinket'}[it.slot] + ' · ')) o.broken.push(`${k}: slot word (${l})`); }
  o.axe = itemStatLine('b2_semkaxe'); o.lance = itemStatLine('b2_tithlance'); o.mail = itemStatLine('b2_arenmail'); o.feather = itemStatLine('b2_crowfeather');
  o.hood = itemStatLine('hoodrep'); o.sash = itemStatLine('b4_c1_redsash'); o.bundle = itemStatLine('b3_c2_bundle'); o.dogs = itemStatLine('b4_c6_dogslayer');
  o.plank = itemStatLine('b2_plank');
  return o; });
ok(lines.n >= 130 && !lines.broken.length, `all ${lines.n} items format cleanly${lines.broken.length ? ': ' + lines.broken.join(' | ') : ''}`);
ok(!lines.noDmg.length, `every weapon's line says its damage${lines.noDmg.length ? ': ' + lines.noDmg.join(',') : ''}`);
ok(lines.axe === 'Weapon · 1d10+2 damage' && /^Weapon · the wearer's own damage · \+1 hit · reach 2 · armour −1$/.test(lines.lance), `a weapon's damage, hit and reach read in order (${lines.axe} | ${lines.lance})`);
ok(lines.mail === 'Armour · armour +3 · health +2 · heavy (hot at noon)' && lines.feather === 'Trinket · Might +1 · Wits +1 · Guile +1', `armour and trinkets: fixed words, capitalised Measures (${lines.mail} | ${lines.feather})`);
ok(/Once a chapter/.test(lines.hood) && /On Ramin: \+1 hit/.test(lines.sash) && /haunted/.test(lines.bundle) && /Dogslayers/.test(lines.dogs) && /Once a fight/.test(lines.plank), 'specials show, the prose-only +1s included');

// ---- the same line everywhere ----
const same = await ev(() => { const o = {};
  S = newState('Lines'); S.chapter = 3; S.picksDue = []; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; S.silver = 99;
  S.kit = ['houndtooth', 'heater', 'barrowflint']; S.gear.sgt = {trinket:'houndtooth'}; S.gear.brisk = {armour:'heater'}; save();
  o.view = itemInfo('item/houndtooth').stat; o.line = itemStatLine('houndtooth');
  openModal('pack'); o.pack = [...document.querySelectorAll('#modal .pkit')].map(e => e.innerText); $('#modal').hidden = true;
  openChars(0); o.sheet = [...document.querySelectorAll('#chars .stat')].map(e => e.textContent); o.sheetDmg = [...document.querySelectorAll('#chars .kv span')].map(e => e.textContent).join(' | '); closeChars();
  startExplore(CHAPTERS[3].area.id); talk('c3_brack_wares'); o.shop = [...document.querySelectorAll('#sheet .choice')].map(b => b.innerText).join(' || '); closeSheet();
  o.hoodLine = itemStatLine('hoodrep');
  S = newStateDG('Water'); S.chapter = 5; S.picksDue = []; S.chain = {water:9, column:20}; save(); setBook('dg'); startExplore('b2_karpcamp'); talk('b2_trader5'); o.b2 = $('#sheet').innerText; o.b2line = itemStatLine('b2_tcrossbow'); closeSheet();
  return o; });
ok(same.view === same.line, `the item view shows the line (${same.view})`);
ok(same.pack.some(t => t.includes(same.line) && /Worn by you/.test(t)), `the Pack shows the same line and who wears it`);
ok(same.sheet.includes(same.line), `the squad sheet shows the same line for the sergeant's tooth`);
ok(same.shop.includes(same.hoodLine), `Brack's shop shows the same line under Hood's Repellent (${same.shop.slice(0, 160)})`);
ok(same.b2.includes(`four skins: ${same.b2line}.`), `Book Two's trader shows the same line (${same.b2line})`);
ok(!/weapon\b/.test(same.sheetDmg.split('Damage')[1] || '') && /\d+d\d+/.test(same.sheetDmg.split('Damage')[1] || ''), `the sheet's damage is dice, not the word weapon (${(same.sheetDmg.split('Damage | ')[1] || '').split(' | ')[0]})`);

// ---- two trinkets ----
const two = await ev(() => { const o = {};
  S = newState('Two'); S.chapter = 2; S.picksDue = []; S.squad = ['sgt', 'brisk', 'kettle']; S.kit = ['houndtooth', 'b2_lancehead', 'barrowtorc', 'brackcoin']; save();
  ['sgt', 'brisk', 'kettle'].forEach(k => S.gear[k] = {});
  const u0 = mkParty('sgt', 0, 0);
  equip('sgt', 'houndtooth'); equip('sgt', 'b2_lancehead'); o.gear = JSON.stringify(S.gear.sgt);
  const u2 = mkParty('sgt', 0, 0); o.atk = u2.atk - u0.atk;
  equip('sgt', 'houndtooth'); o.twice = Object.values(S.gear.sgt).filter(g => g === 'houndtooth').length;
  equip('brisk', 'houndtooth'); o.moved = !wears('sgt', 'houndtooth') && wears('brisk', 'houndtooth');
  equip('sgt', 'barrowtorc'); equip('sgt', 'brackcoin'); o.third = Object.values(S.gear.sgt).filter(g => ITEMS[g].slot === 'trinket').length;
  o.statOf = statOf('sgt', 'guile') - TPL.sgt.st.guile - lvStat('sgt', 'guile');
  S.gear.sgt = {trinket:'barrowtorc', trinket2:'hoodrep'}; S.kit.push('hoodrep'); o.wearsHood = wears('sgt', 'hoodrep'); o.who = wornBy('hoodrep');
  unwear('hoodrep'); o.unworn = !wears('sgt', 'hoodrep');
  allocateGear(); o.alloc = SQUAD().map(w => Object.keys(S.gear[w]).join('+')).join(' / ');
  o.allTrinkets = S.kit.filter(g => ITEMS[g].slot === 'trinket').every(g => wornBy(g));
  return o; });
ok(/"trinket":"houndtooth"/.test(two.gear) && /"trinket2":"b2_lancehead"/.test(two.gear) && two.atk === 2, `two trinkets, both counted in a fight: +${two.atk} hit (${two.gear})`);
ok(two.twice === 1 && two.moved, 'the same piece is never worn twice, and equipping takes it off whoever had it');
ok(two.third === 2, 'a third trinket swaps for one, never makes three');
ok(two.wearsHood && two.who === 'sgt' && two.unworn, 'wears / wornBy / unwear see the second trinket place');
ok(two.allTrinkets, `Allocate fills both trinket places (${two.alloc})`);

// ---- an old save: its one trinket stays put ----
const old = await ev(() => { const s = newState('Oldie'); s.sid = 'oldtrinket'; s.chapter = 4; s.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; s.kit = ['houndtooth', 'heater', 'brackcoin'];
  s.gear.sgt = {trinket:'houndtooth'}; s.gear.brisk = {armour:'heater', trinket9:'brackcoin'}; delete s.version;
  localStorage.setItem(slotKey('oldtrinket'), JSON.stringify(s)); const L = loadSlot('oldtrinket'); S = L; gearTidy();
  return {sgt:JSON.stringify(S.gear.sgt), brisk:JSON.stringify(S.gear.brisk), kit:S.kit.join(',')}; });
ok(old.sgt === '{"trinket":"houndtooth"}' && old.kit === 'houndtooth,heater,brackcoin', `an old save keeps its one trinket in the first place, nothing lost (${old.sgt})`);
ok(/"trinket":"brackcoin"/.test(old.brisk) && !/trinket9/.test(old.brisk), `a piece in a place that is not its own moves to its own (${old.brisk})`);

// ---- Allocate arms everyone (Book Five: Pessa, a spear in the pack) ----
const arm = await ev(() => { const o = {};
  S = newStateMT('Arms'); S.chapter = 5; S.picksDue = []; S.squad = ['sgt', 'tobet', 'thegg', 'pessa']; S.squad.forEach(k => { S.loy[k] ??= 0; S.gear[k] = {}; });
  S.kit = ['b5_c3_spear', 'b5_c5_cacheblade', 'b5_c2_gaff', 'b5_c5_cachebow']; save();
  allocateGear(); o.alloc = S.squad.map(w => `${w}:${S.gear[w].weapon || '-'}`).join(' ');
  o.unarmed = S.squad.filter(w => !S.gear[w].weapon && S.kit.some(g => ITEMS[g].slot === 'weapon' && canWear(w, g))).join(',');
  /* nothing idle that she can use: Thegg holds the blade, and an axe Pessa cannot lift lies idle; he takes the axe, she the blade */
  S.squad = ['sgt', 'thegg', 'pessa']; S.kit = ['b5_c5_cachebow', 'b5_c5_cacheblade', 'b2_semkaxe']; ['sgt', 'tobet', 'thegg', 'pessa'].forEach(k => S.gear[k] = {}); S.gear.sgt = {weapon:'b5_c5_cachebow'}; S.gear.thegg = {weapon:'b5_c5_cacheblade'}; armUnarmed();
  o.swap = `thegg:${S.gear.thegg.weapon} pessa:${S.gear.pessa.weapon || '-'}`;
  /* a soldier joining takes what lies idle */
  S.squad = ['sgt', 'tobet', 'thegg']; S.kit = ['b5_c2_gaff']; ['sgt', 'tobet', 'thegg', 'pessa'].forEach(k => S.gear[k] = {}); S.gear.sgt.weapon = undefined; delete S.gear.sgt.weapon;
  S.gear.thegg = {weapon:'b5_c5_cacheblade'}; S.kit.push('b5_c5_cacheblade'); S.gear.sgt = {weapon:'b5_c5_cachebow'}; S.kit.push('b5_c5_cachebow');
  S.camp = ['pessa']; S.f.b5_pessaDone = 2; rosterIn('pessa'); o.joined = S.squad.includes('pessa') ? (S.gear.pessa.weapon || '-') : 'not in';
  /* the disarm and rearm */
  S.squad.forEach(k => S.gear[k] = {}); S.kit = ['b5_c3_spear', 'b5_c5_cacheblade']; S.gear.pessa = {weapon:'b5_c3_spear'}; S.gear.thegg = {weapon:'b5_c5_cacheblade'};
  b5Disarm(); o.disarmed = S.squad.every(w => !S.gear[w].weapon); b5Rearm(['b5_c5_cacheblade', 'b5_c5_cachebow']);
  o.rearm = S.squad.map(w => `${w}:${S.gear[w].weapon || '-'}`).join(' ');
  o.rearmUnarmed = S.squad.filter(w => !S.gear[w].weapon && S.kit.some(g => ITEMS[g].slot === 'weapon' && !wornBy(g) && canWear(w, g))).join(',');
  return o; });
ok(!arm.unarmed, `Allocate gives everyone a weapon that fits (${arm.alloc})`);
ok(arm.swap === 'thegg:b2_semkaxe pessa:b5_c5_cacheblade', `Thegg passes the blade to Pessa and takes the axe (${arm.swap})`);
ok(arm.joined === 'b5_c2_gaff', `Pessa joining picks up the idle gaff (${arm.joined})`);
ok(arm.disarmed && !arm.rearmUnarmed, `disarmed at High Fort, rearmed at the cache: nobody left empty-handed while a weapon fits (${arm.rearm})`);

// ---- specials outrank a flat +1 ----
const val = await ev(() => { S = newStateHOC('Vals'); S.picksDue = []; save();
  return {sash:gearValue('redblade', 'b4_c1_redsash') > gearValue('redblade', 'b4_c4_helm'), notSash:gearValue('tebbet', 'b4_c1_redsash') <= gearValue('tebbet', 'b4_c4_helm') + .01,
    tear:gearValue('haddat', 'b4_c7_tear') > gearValue('haddat', 'b2_lancehead'), glass:gearValue('tebbet', 'b4_c5_seaglass') > gearValue('haddat', 'b4_c5_seaglass')}; });
ok(val.sash && val.notSash && val.tear && val.glass, `Allocate weighs specials: the sash on Ramin, the bead over a +1, the sea-glass on a bow (${JSON.stringify(val)})`);

// ---- the Pack lists the kit ----
const pack = await ev(() => { S = newState('Pack'); S.chapter = 5; S.picksDue = []; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl'];
  S.kit = ['guildblade', 'heater', 'scoutcloak', 'houndtooth', 'brackcoin', 'rhivicharm']; S.squad.forEach(k => S.gear[k] = {}); S.gear.sgt = {weapon:'guildblade', trinket:'houndtooth', trinket2:'brackcoin'}; S.gear.brisk = {armour:'heater'}; save();
  setBook('gotm'); startExplore(CHAPTERS[5].area.id); openModal('pack');
  const rows = [...document.querySelectorAll('#modal .packkit .pkit')], heads = [...document.querySelectorAll('#modal .packkit h5')].map(h => h.textContent);
  return {n:rows.length, heads:heads.join(','), idle:rows.filter(r => /In the pack/.test(r.innerText)).length, worn:rows.filter(r => /Worn by/.test(r.innerText)).length, taps:rows.filter(r => r.dataset.iz).length,
    wide:document.querySelector('#modal .mbox').scrollWidth - document.querySelector('#modal .mbox').clientWidth}; });
ok(pack.n === 6 && pack.heads === 'Weapons,Armours,Trinkets' && pack.worn === 4 && pack.idle === 2, `the Pack lists the kit by slot, who wears what (${JSON.stringify(pack)})`);
ok(pack.taps === 6 && pack.wide <= 1, 'every row opens the item view, and the Pack is no wider than the phone');
if (shots) { await page.screenshot({ path: `${shots}/pack.png`, fullPage: false }); await page.evaluate(() => { const b = document.querySelector('#modal .packkit'); if (b) b.scrollIntoView(); }); await page.waitForTimeout(150); await page.screenshot({ path: `${shots}/pack-kit.png` }); }
await page.click('#modal .packkit [data-iz="item/houndtooth"]'); await page.waitForTimeout(250);
const iv = await ev(() => $('#artview').innerText);
ok(/Trinket · \+1 hit/.test(iv) && /worn by you/.test(iv), `a tap on a Pack row opens the item view with its line and wearer`);
if (shots) await page.screenshot({ path: `${shots}/item-view.png` });
await page.evaluate(() => { $('#avClose').click(); $('#modal').hidden = true; openChars(0); });
await page.waitForTimeout(250); await page.evaluate(() => { const k = document.querySelector('#chars .sec:has(> .gearl), #chars .kit'); if (k) k.scrollIntoView(); }); await page.waitForTimeout(150);
const sheetW = await ev(() => document.querySelector('#chars .mbox').scrollWidth - document.querySelector('#chars .mbox').clientWidth);
ok(sheetW <= 1, `the sheet is no wider than the phone (${sheetW})`);
if (shots) await page.screenshot({ path: `${shots}/sheet-kit.png` });
await page.evaluate(() => { const k = document.querySelector('#chars .kit'); if (k) k.scrollIntoView(); }); await page.waitForTimeout(150);
if (shots) await page.screenshot({ path: `${shots}/sheet-kit2.png` });
await page.evaluate(() => { const k = document.querySelector('#chars .kv'); if (k) k.scrollIntoView(); }); await page.waitForTimeout(150);
if (shots) await page.screenshot({ path: `${shots}/sheet-line.png` });

ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill();
console.log(bad.length ? `\n${bad.length} FAILED` : '\nall passed'); process.exit(bad.length ? 1 : 0);
