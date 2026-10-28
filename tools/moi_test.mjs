// Book Three (v6.0): the Fourth again. A fresh Book Three state, the per-book lives of the Fourth (and Book One's back after a round trip),
// the import of a finished Book One on the outlaw road, room for recruits, allies who come when trusted, shaken and haunted, the poisoned
// warrens, the sergeant's god per book, the title's three books, Deeds by book, and a Book Three card at work.
// Usage: node tools/moi_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 360, height: 780 });
const bad = [], ok = m => console.log('ok  ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {}, wait = ms => new Promise(res => setTimeout(res, ms));
  /* Book One's own texts, read in a Book One state, before anything else happens */
  S = newState('One'); const oneTxt = () => ['brisk', 'kettle', 'tuft', 'ohl', 'ellis', 'vell'].map(id => [TPL[id].bio2, TPL[id].quest, TPL[id].epithet, TPL[id].service, JSON.stringify(TPL[id].banter), JSON.stringify(TPL[id].rel)].join('|')).join('#');
  const before = oneTxt(), sgtBefore = TPL.sgt.bio2;
  out.fener = PATRONS.sgt.god;
  /* a fresh Book Three game */
  S = newStateMOI('Corl'); save();
  out.fresh = {book:S.book, squad:S.squad.join(','), ally:JSON.stringify(S.ally), BOOK, room:b3Room()};
  updSilver(); startChapter; out.treach = PATRONS.sgt.god;
  out.bio = {brisk:TPL.brisk.bio2, tuft:TPL.tuft.bio2, sgt:TPL.sgt.bio2, ohl:TPL.ohl.quest, kettle:TPL.kettle.quest};
  out.reader = visReader().id; out.node = cardNodeName();
  /* the HUD pill */
  document.body.insertAdjacentHTML('beforeend', '<div id="chainp"></div>'); updChain(); out.pill = document.getElementById('chainp').textContent.replace(/\s+/g, ' ').trim();
  ally(2, 1, 'Test'); out.after = JSON.stringify(S.ally);
  S.card = 'b3c_obelisk'; ally(0, 1, 'Obelisk'); out.obelisk = S.ally.dread; S.card = null;
  /* back to Book One, and back again: Book One's texts are exactly as they were */
  S = newState('One'); out.roundTrip = oneTxt() === before && TPL.sgt.bio2 === sgtBefore;
  S = newStateMOI('Corl'); S = newState('One'); S = newStateDG('Vesh'); S = newState('One'); out.roundTrip2 = oneTxt() === before;
  /* the import: three finished Book One sergeants, one on the outlaw road (Tuft dead, Ellis stayed behind), one on the empire road, one unfinished */
  const mk1 = (name, road, extra) => { const a = newState(name); Object.assign(a, {chapter:7, chapters:road ? {0:'given', 7:road} : {0:'given'}, lvl:7}); Object.assign(a, extra || {}); S = a; save(); const id = a.sid; S = null; return id; };
  const idOut = mk1('Rusk', 'outlaw', {squad:['sgt', 'brisk', 'kettle', 'ohl', 'ellis', 'vell'], dead:{tuft:{ch:6, where:'x'}}, loy:{brisk:3, kettle:-3, ohl:1, ellis:2, vell:0}, f:{c7_follow:{brisk:true, kettle:true, ohl:true, ellis:false, vell:true}, c7_letter:'brisk', c7_debt:'owed', c2_key:'light', listAdds:1}});
  const idEmp = mk1('Tamm', 'empire', {squad:['sgt', 'brisk', 'kettle', 'tuft', 'ohl']});
  const idTwo = mk1('Dead', 'outlaw', {squad:['sgt', 'kettle', 'ohl'], dead:{brisk:{ch:6}, tuft:{ch:6}}, f:{c7_follow:{kettle:true, ohl:true}}});
  mk1('Half', null, {chapter:3});
  out.finished = b3Finished().map(e => e.name).sort().join(',');
  S = newStateMOI('Rusk', idOut, newSid()); save();
  out.imp = {name:S.name, squad:S.squad.join(','), loy:JSON.stringify(S.loy), dead:S.imported.dead.join(','), list:S.imported.f.list, letter:b3Was('c7_letter'), fallen:b3Fallen().join(','), room:b3Room(), brisk:TPL.brisk.bio2, kettle:TPL.kettle.bio2, ohl:TPL.ohl.quest};
  out.oneKept = !!loadSlot(idOut) && loadSlot(idOut).book !== 'moi';
  S = newStateMOI('Dead', idTwo, newSid()); out.two = {squad:S.squad.join(','), room:b3Room()};
  out.join1 = b3Join('sohra'); out.join2 = b3Join('greysword'); out.full = {squad:S.squad.join(','), room:b3Room()};
  S = newStateMOI('Swap'); S.squad.push('ellis'); out.joinFull = b3Join('sohra'); out.wait = S.f.b3_sohraDone; S.squad.pop(); out.joinNow = b3Join('sohra');
  S.f.b3_dannetDone = 2; out.swap = b3SwapIn('greysword') && S.squad.includes('greysword') && !S.squad.includes('sohra') && S.f.b3_sohraDone === 2;
  out.emp = !!b3Import(idEmp);
  /* allies who come when trusted */
  BATTLES.b3_test = {title:'Test ground', warrenText:'', warren:{meanas:1, denul:1}, map:Array(10).fill('........'), party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
    foes:[['b3_beklite', 3, 1], ['b3_beklite', 5, 1]], xp:10, after:'b3_test_after', aid:{kind:'b3_rhivi_rider', at:[1, 8], need:8}};
  DLG.b3_test_after = () => ({txt:'After.', ch:[{t:'On.'}]});
  S = newStateMOI('Aid'); save(); S.ally.trust = 9;
  const d1 = battleDef('b3_test'); out.aidIn = (d1.allies || []).map(a => a[0]).join(',');
  S.ally.trust = 7; const d2 = battleDef('b3_test'); out.aidOut = (d2.allies || []).length + ':' + (d2.b3Not || []).join(',');
  S.ally.trust = 9; startBattle('b3_test'); await wait(50); out.aidUnit = B.units.filter(u => u.ally).map(u => u.kind + ':' + u.maxhp).join(','); out.aidLog = B.log.join(' ');
  /* shaken and haunted */
  const bonus = () => { const a = B.units.find(u => u.id === 'brisk'), t = B.units.find(u => u.side === 'e'); return atkCalc(a, t).bonus; };
  S.ally.dread = 1; startBattle('b3_test'); await wait(50); B.round = 1; const b0 = bonus();
  S.ally.dread = 7; startBattle('b3_test'); await wait(50); B.round = 1; const b1 = bonus(); B.round = 3; const b1late = bonus(); out.shakenLog = B.log.join(' ');
  S.ally.dread = 11; startBattle('b3_test'); await wait(50); B.round = 5; const b2 = bonus(); out.hauntedLog = B.log.join(' ');
  out.mind = {b0, b1, b1late, b2};
  /* poisoned warrens: a forced roll, a strain spell, with and without the Domin, and never for spirit-craft or Elder tricks */
  const castTest = (k, who, domin) => { S.ally.dread = 1; S.f.b3_domin = domin ? 1 : 0; S.chapter = 5; startBattle('b3_test');
    const u = B.units.find(x => x.id === who); B.cur = u; B.busy = false; u.hp = u.maxhp = 40; u.strain = 0; const n0 = S.f.b3_burns || 0, hp0 = u.hp;
    const mr = Math.random; Math.random = () => 0; try { useAb(k, u.x, u.y); } finally { Math.random = mr; }
    return {burnt:(S.f.b3_burns || 0) - n0, hp:hp0 - u.hp}; };
  AB.b3_test_spirit = {name:'t', strain:1, spirit:true, self:true, run(){}}; AB.b3_test_elder = {name:'t', strain:1, elder:true, self:true, run(){}}; AB.b3_test_plain = {name:'t', strain:1, self:true, run(){}};
  S = newStateMOI('Burn'); save();
  out.burnDomin = castTest('b3_test_plain', 'ohl', true); out.burnNoDomin = castTest('b3_test_plain', 'ohl', false);
  out.burnSpirit = castTest('b3_test_spirit', 'ohl', true); out.burnElder = castTest('b3_test_elder', 'ohl', true);
  S.card = 'b3c_leper'; out.burnLeper = castTest('b3_test_plain', 'ohl', true); S.card = null;
  /* Book Two's fouled warrens and Book One untouched: no burns outside Book Three */
  S = newState('One'); out.gotmBurn = b3BurnPct();
  /* a Book Three card: the Soldier of High House Life heals 2 more; the Gate stands the first one back up */
  S = newStateMOI('Card'); save(); startBattle('b3_test'); await wait(50);
  const u = B.units.find(x => x.id === 'kettle'); u.hp = 5; S.card = 'b3c_lifesoldier'; heal(u, 3); out.life = u.hp;
  S.card = 'b3c_gate'; u.hp = 3; hurt(u, 10); out.gate = u.hp; u.hp = 3; hurt(u, 10); out.gate2 = u.hp; S.card = null;
  /* a mortal fight works in Book Three: the fallen stay down */
  BATTLES.b3_test_mortal = Object.assign({}, BATTLES.b3_test, {mortal:true, aid:null});
  S = newStateMOI('Mortal'); save(); startBattle('b3_test_mortal'); await wait(50);
  B.units.find(x => x.id === 'kettle').hp = 0; B.units.filter(x => x.side === 'e').forEach(x => x.hp = 0); win();
  out.mortal = {dead:Object.keys(S.dead || {}).join(','), squad:S.squad.join(',')};
  out.finL = {list:finL().list()[1], endline:finL().endline, prologue:finL().prologue};
  B = null;
  /* the title: three books, and Book Three's dress; the import field, the name filled and locked */
  S = null; showTitle(true); await wait(80);
  const segs = [...document.querySelectorAll('.bseg .btn')]; out.books = segs.map(b => b.dataset.book).join(','); out.hoc = !BOOKS.hoc.coming; // Book Four joins the shelf once a chapter of it is registered (71 on)
  const seg = document.querySelector('.bseg'); out.fit = seg.scrollWidth <= seg.clientWidth + 1 && segs.every(b => b.scrollWidth <= b.clientWidth + 1 && b.getBoundingClientRect().right <= innerWidth + 1);
  document.querySelector('[data-book="moi"]').click(); await wait(50);
  out.dress = {name:document.querySelector('#tName').textContent, tag:document.querySelector('#tTag').textContent, blurb:document.querySelector('#bBlurb').textContent, patch:document.querySelector('#tPatch').dataset.book};
  const sel = document.querySelector('#impSel'); out.impShown = !document.querySelector('#impField').hidden; out.impOpts = sel ? [...sel.options].map(o => o.textContent).join(',') : '';
  out.impLabel = (document.querySelector('#impField label') || {}).textContent || '';
  if (sel) { sel.value = idOut; sel.onchange(); } out.nm = {v:document.querySelector('#nm').value, ro:document.querySelector('#nm').readOnly, desc:document.querySelector('#impDesc').textContent};
  if (sel) { sel.value = ''; sel.onchange(); } out.nmFree = !document.querySelector('#nm').readOnly;
  document.querySelector('#bNew').click(); await wait(30); out.noCh = document.querySelector('#nmMsg').textContent;
  out.footer = [...document.querySelectorAll('#title p.fine')].map(p => p.textContent).join(' ');
  document.querySelector('[data-book="gotm"]').click(); await wait(30); out.backOne = document.querySelector('#tName').textContent; out.impHiddenOne = document.querySelector('#impField').hidden;
  /* Deeds by book, with Book Three's own section */
  S = newStateMOI('Corl'); save(); openModal('deeds'); await wait(30);
  out.deeds = [...document.querySelectorAll('.bookdeeds summary')].map(s => s.textContent.replace(/\s+/g, ' ').trim());
  out.alliance = !![...document.querySelectorAll('.bookdeeds h4')].find(h => /Alliance/.test(h.textContent)); out.count = /Trust, now/.test(document.querySelector('#modal').textContent);
  out.meet = /Book Three, The Fair Exchange/.test(document.querySelector('#modal').textContent);
  $('#modal').hidden = true;
  openModal('journal'); await wait(30); out.jhead = (document.querySelector('#modal .jbook') || {}).textContent || ''; $('#modal').hidden = true;
  out.gloss = GLOSSX.moi.length;
  return out;
});
const f = r.fresh;
f.book === 'moi' && f.BOOK === 'moi' && f.squad === 'sgt,brisk,kettle,tuft,ohl' && f.ally === '{"trust":5,"dread":1}' && f.room === 1 ? ok('a fresh Book Three game: the Fourth, trust 5, dread 1, room for one recruit') : no('fresh: ' + JSON.stringify(f));
r.pill.replace(/\s/g, '') === 'Trust5Dread1' ? ok('the HUD pill says Trust and Dread') : no('pill: ' + r.pill);
r.after === '{"trust":7,"dread":2}' && r.obelisk === 2 ? ok('ally() moves both, and the Obelisk takes 1 off a rise') : no(`ally: ${r.after}, obelisk dread ${r.obelisk}`);
/He is alive/.test(r.bio.brisk) && /Tattersail/.test(r.bio.tuft) && !/\bonly\b/.test(r.bio.tuft) && /all five/.test(r.bio.sgt) && /more than two hundred/.test(r.bio.ohl) && /Maud/.test(r.bio.kettle) ? ok('the Fourth wear their Book Three lives in Book Three') : no('bios: ' + JSON.stringify(r.bio).slice(0, 400));
r.roundTrip && r.roundTrip2 ? ok('Book One\'s texts come back exactly, through Book Three and Book Two') : no('Book One bios changed after a round trip');
r.treach === 'Treach' && r.fener === 'Fener' ? ok('the sergeant\'s god: Treach in Book Three, Fener in Book One') : no(`gods: ${r.fener} / ${r.treach}`);
r.reader === 'tuft' && r.node === 'b3_c0_card' ? ok('Tuft reads the Deck; the card node is b3_c<n>_card') : no(`reader ${r.reader}, node ${r.node}`);
r.finished === 'Dead,Rusk' && !r.emp ? ok('the import offers only finished Book One saves on the outlaw road') : no(`finished: ${r.finished}, empire ok: ${r.emp}`);
const i = r.imp;
i.name === 'Rusk' && i.squad === 'sgt,brisk,kettle,ohl,vell' && /"brisk":3,"kettle":-2,"ohl":1,"vell":0/.test(i.loy) && i.dead === 'tuft' && i.list === 214 && i.letter === 'brisk' && i.fallen === 'tuft' && i.room === 1 ? ok('the import brings the name, who followed, their loyalty (clamped), the dead and the list') : no('import: ' + JSON.stringify(i).slice(0, 300));
/Tuft did not come out/.test(i.brisk) || /Tuft/.test(i.brisk) ? no('Brisk\'s bio names the dead: ' + i.brisk.slice(0, 80)) : ok('Brisk\'s bio does not assume who lived');
/carried/.test(i.kettle) && /214 names/.test(i.ohl) ? ok('the import colours Kettle\'s debt and Ohl\'s count') : no(`kettle: ${i.kettle.slice(0, 200)} / ohl: ${i.ohl}`);
r.oneKept ? ok('the Book One save is kept, not overwritten') : no('the Book One save was overwritten');
r.two.squad === 'sgt,kettle,ohl' && r.two.room === 3 && r.join1 && r.join2 && r.full.squad === 'sgt,kettle,ohl,sohra,greysword' ? ok('a Book One with two dead leaves room for both recruits at once') : no('two dead: ' + JSON.stringify([r.two, r.join1, r.join2, r.full]));
r.joinFull === false && r.wait === 2 && r.joinNow === true && r.swap ? ok('a full squad keeps a recruit waiting; b3SwapIn swaps one for the other') : no(`join: ${r.joinFull} wait ${r.wait} now ${r.joinNow} swap ${r.swap}`);
r.aidIn === 'b3_rhivi_rider' && r.aidOut === '0:b3_rhivi_rider' && /^b3_rhivi_rider:\d+$/.test(r.aidUnit) && /Rhivi came/.test(r.aidLog) ? ok('an ally comes at trust 8 and not at 7, scaled, with a log line') : no(`aid: ${r.aidIn} / ${r.aidOut} / ${r.aidUnit} / ${r.aidLog.slice(0, 120)}`);
r.mind.b1 === r.mind.b0 - 1 && r.mind.b1late === r.mind.b0 && r.mind.b2 === r.mind.b0 - 1 && /Shaken/.test(r.shakenLog) && /Haunted/.test(r.hauntedLog) ? ok('shaken (dread 6+) costs 1 to hit for two rounds; haunted (10+) all fight') : no('mind: ' + JSON.stringify(r.mind));
r.burnDomin.burnt === 1 && r.burnDomin.hp >= 3 && !r.burnNoDomin.burnt && !r.burnSpirit.burnt && !r.burnElder.burnt && !r.burnLeper.burnt && r.gotmBurn === 0 ? ok('poisoned warrens burn only in the Domin, never spirit, Elder or under the Leper, never outside Book Three') : no('burns: ' + JSON.stringify([r.burnDomin, r.burnNoDomin, r.burnSpirit, r.burnElder, r.burnLeper, r.gotmBurn]));
r.life === 10 && r.gate === 1 && r.gate2 === 0 ? ok('Book Three cards work: Life heals 2 more; the Gate stands the first one back up, once') : no(`cards: life ${r.life}, gate ${r.gate}/${r.gate2}`);
r.mortal.dead === 'kettle' && !/kettle/.test(r.mortal.squad) && /more than two hundred/.test(r.finL.list) && /Fair Exchange/.test(r.finL.endline) && r.finL.prologue === false ? ok('a mortal fight kills for good in Book Three; the finale defaults are Book Three\'s') : no('mortal/finale: ' + JSON.stringify([r.mortal, r.finL]));
r.books === 'gotm,dg,moi' + (r.hoc ? ',hoc' : '') && r.fit ? ok(`the title offers ${r.hoc ? 'four' : 'three'} books, and they fit at 360px`) : no(`books: ${r.books}, fit ${r.fit}`);
r.dress.name === 'The FairExchange' && /outlawed/i.test(r.dress.tag) && /beside Memories of Ice/.test(r.dress.blurb) && r.dress.patch === 'moi' ? ok('Book Three dresses the title: name, tag, blurb, the Fourth\'s patch') : no('dress: ' + JSON.stringify(r.dress));
r.impShown && r.impOpts === 'No: a fresh start,Sergeant Rusk,Sergeant Dead' || r.impOpts === 'No: a fresh start,Sergeant Dead,Sergeant Rusk' ? ok('the import field lists only the outlaw road') : no(`imp: ${r.impShown} ${r.impOpts}`);
/the Fourth/.test(r.impLabel) && r.nm.v === 'Rusk' && r.nm.ro && /Tuft did not come out/.test(r.nm.desc) && r.nmFree ? ok('picking one fills and locks the name; a fresh start unlocks it') : no('name: ' + JSON.stringify(r.nm) + ' free ' + r.nmFree + ' label ' + r.impLabel);
!/still being written/.test(r.noCh) ? ok('Begin with Book Three chapters registered goes past the not-yet message') : no('begin: ' + r.noCh);
/books so far, each beside one of Erikson's Malazan novels, in order, from Gardens of the Moon to/.test(r.footer) ? ok('the credit line summarises the shelf, Book Three included (v7.3.3)') : no('footer: ' + r.footer.slice(0, 200));
r.backOne === 'Ashesof the Pale' && r.impHiddenOne ? ok('back to Book One: its dress, no import field') : no(`back: ${r.backOne} ${r.impHiddenOne}`);
r.deeds.length === (r.hoc ? 4 : 3) && /Book Three/.test(r.deeds[2]) && (!r.hoc || /Book Four/.test(r.deeds[3])) && r.alliance && r.count && r.meet ? ok('Deeds has a Book Three section, the Alliance, the count, and where the books meet') : no('deeds: ' + JSON.stringify([r.deeds, r.alliance, r.count, r.meet]));
/Book Three · The Fair Exchange/.test(r.jhead) && r.gloss >= 15 ? ok('the journal names Book Three; the glossary is there') : no(`journal: ${r.jhead}, gloss ${r.gloss}`);
await br.close(); srv.kill();
if (errors.length) { console.log('page errors:', errors); process.exit(1); }
if (bad.length) { console.log(`moi: FAIL (${bad.length})`); process.exit(1); }
console.log('moi: all ok');
