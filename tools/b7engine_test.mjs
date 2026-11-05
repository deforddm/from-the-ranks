// v10.0: Book Seven's engine (docs/v10.0-notes.md). Two squads in one save: a fresh start (the Third at 16 with Haddat, Tangle, Marrow and Mirrel,
// Sathi fallen at the Barrow; the Letherii at 8 with Tobet, Thegg, Perrit and Ammet), the per-squad caps (21 and 12), the swap at each chapter
// (name, level, gear, munitions, debt, the sergeant's own history and look), the transfers (a finished Book Six on the 'adjunct' road, a finished
// Book Five on the 'emperor' road; others refused), the Rising and the Letherii file (and the check edges), the readings through each squad's
// reader (the Deck for the Third, the Tiles for the Letherii), the recruits by squad, the shelf (coming until a chapter exists), the title art and
// patch, the new-sergeant screen; and Books One to Six untouched (their caps).
// Usage: node tools/b7engine_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(() => {
  const out = {};
  try {
  /* the other books' caps, and Book Seven's by thread */
  out.caps = ['gotm', 'dg', 'moi', 'hoc', 'mt', 'bh'].map(b => { S = {book:b}; return b + ':' + lvCap(); }).join(' ');
  S = {book:'rg', thread:'t'}; out.capT = lvCap(); S = {book:'rg', thread:'l'}; out.capL = lvCap();
  out.shelf = shelfBooks().map(b => b.id).join(','); out.coming = !!BOOKS.rg.coming; out.book = {n:BOOKS.rg.n, word:BOOKS.rg.word, name:BOOKS.rg.name, title:BOOKS.rg.title, tag:BOOKS.rg.tag};
  /* a fresh Book Seven */
  S = newStateRG('Hask', 'Brann'); save(); setBook('rg');
  out.fresh = {book:S.book, thread:S.thread, name:S.name, lvl:S.lvl, squad:S.squad.join(','), lName:S.th.l.name, lLvl:S.th.l.lvl, lSquad:S.th.l.squad.join(','),
    sathi:!!(S.dead.sathi), cap:lvCap(), core:rosterBook().core.join(','), look:b7SgtLook(), key:keyFlag(), rise:b7Rising(), lDebt:S.th.l.debt && S.th.l.debt.tobet, tDebt:S.debt,
    inv:S.inv.cusser, lInv:S.th.l.inv.cusser, patron:PATRONS.sgt.god};
  /* the swap */
  S.inv.cusser = 5; S.kit.push('heater'); b7Use('l');
  out.swap = {thread:S.thread, name:S.name, squad:S.squad.join(','), core:rosterBook().core.join(','), cusserL:S.inv.cusser, kept:S.th.t.inv.cusser, kitT:S.th.t.kit.includes('heater'),
    look:b7SgtLook(), cap:lvCap(), lvl:S.lvl, debt:b5Debt('tobet'), patron:PATRONS.sgt.god, ammet:AB.mend && AB.mend.name, coin:b7Coin(3), sgtEpi:TPL.sgt.epithet};
  /* the Letherii cap: 12 */
  gainXP(999999); out.capLv = {lvl:S.lvl};
  b7Use('l'); out.idem = S.thread === 'l' && !S.th.l;
  b7Use('t'); out.back = {name:S.name, cusser:S.inv.cusser, kit:S.kit.includes('heater'), lvl:S.lvl, ammet:AB.mend && AB.mend.name, otherLvl:S.th.l.lvl, sgtEpi:TPL.sgt.epithet};
  /* the Third's cap: 21; levels 19 and 20 give damage and armour */
  gainXP(999999); out.lv = {lvl:S.lvl, dmg:lvDmg(), ac:lvAc()};
  /* the Rising and the file */
  S = newStateRG('Hask', 'Brann'); setBook('rg'); notes = [];
  const c = {check:['wits', 12], rise:true}, plain = {check:['wits', 12]};
  const e0 = edgesFor(c, 'sgt').filter(e => /Rising/.test(e[0])).length;
  b7Rise(3, 'a ledger burned'); const e1 = edgesFor(c, 'sgt').find(e => /Rising/.test(e[0])), e1p = edgesFor(plain, 'sgt').some(e => /Rising/.test(e[0]));
  b7Rise(20, 'test'); const top = b7Rising(); b7Rise(-1, 'test');
  out.rise = {e0, e1:e1 && e1[1], e1p, top, now:b7Rising(), tier:b7RiseTier(), open:b7Open(), guides:b7Guides(), noted:notes.some(n => /The Rising \+3/.test(n.t)), hi:S.b7.hi, html:/The Rising/.test(risingHTML())};
  b7Use('l'); const heat0 = b7Heat(); b7Filed(2, 'a neighbour talked'); const f1 = edgesFor(c, 'sgt').find(e => /file/.test(e[0]));
  out.file = {heat0, file:b7File(), heat:b7Heat(), tier:b7HeatTier(), edge:f1 && f1[1], wanted:b7Wanted(), html:/Your file/.test(risingHTML()), riseShared:b7Rising()};
  /* recruits by thread */
  b7Use('t'); out.rec = {t:b7Recruits().join(','), canDoss:b7CanRecruit('doss'), canIlsa:b7CanRecruit('ilsa')};
  b7Join('doss'); out.rec.joined = S.squad.includes('doss') || (S.camp || []).includes('doss');
  b7Use('l'); out.rec.l = b7Recruits().join(','); out.rec.dossGone = !S.squad.includes('doss'); out.rec.patrons = ['wenna', 'ilsa'].map(id => PATRONS[id] && PATRONS[id].god).join(',');
  out.rec.roles = ['doss', 'wenna', 'ilsa', 'sorvan'].every(id => TPL[id] && TPL_ROLES[id] && VERB[id] && STATUP[id] && PICKS[3][id]);
  /* the transfers: fake finished saves */
  const mk = (o) => { const id = newSid(); localStorage.setItem(slotKey(id), JSON.stringify(Object.assign({v:1, sid:id, f:{}, kit:[], gear:{}, picks:{}, loy:{}, inv:{salve:1, sharper:3}, dead:{}}, o)));
    const keep = S; S = loadSlot(id); save(); S = keep; return id; };
  const adj = mk({name:'Vor', book:'bh', thread:'r', lvl:18, chapters:{7:'adjunct'}, squad:['sgt', 'haddat', 'tangle', 'mehet', 'mirrel'], loy:{haddat:2}, dead:{marrow:{ch:3, where:'The burning streets'}, sathi:{ch:7, where:'The Barrow', from:'dg'}}, gear:{haddat:{weapon:'b2_arensword'}}, kit:['b2_arensword'], th:{h:{name:'Brann', squad:['sgt', 'brisk']}}});
  const jetty = mk({name:'Nim', book:'bh', thread:'r', lvl:18, chapters:{7:'jetty'}, squad:['sgt', 'haddat']});
  const emp = mk({name:'Corlo', book:'mt', lvl:8, chapters:{7:'emperor'}, squad:['sgt', 'tobet', 'thegg', 'perrit', 'brune'], dead:{ammet:{ch:6}}, debt:{sgt:200, tobet:0, thegg:100, perrit:50, brune:30}, inv:{salve:4}});
  const paid = mk({name:'Ess', book:'mt', lvl:8, chapters:{7:'paid'}, squad:['sgt', 'tobet']});
  out.qual = {adj:!!b7ImpT(adj), jetty:!!b7ImpT(jetty), emp:!!b7ImpL(emp), paid:!!b7ImpL(paid), list:b7ImpList('t').length + '/' + b7ImpList('l').length};
  S = newStateRG('Vor', 'Corlo', adj, emp); setBook('rg');
  out.imp = {lvl:S.lvl, squad:S.squad.join(','), marrowDead:!!S.dead.marrow, sword:(S.gear.haddat || {}).weapon, loy:S.loy.haddat, lLvl:S.th.l.lvl, lSquad:S.th.l.squad.join(','),
    ammetDead:!!S.th.l.dead.ammet, tobetDebt:S.th.l.debt.tobet, theggDebt:S.th.l.debt.thegg, salve:S.th.l.inv.salve, from:S.imported && S.imported.from};
  /* a Book Six save whose Fourth played last: the Third comes from o.th.r */
  const adjH = mk({name:'Ula', book:'bh', thread:'h', lvl:16, chapters:{7:'adjunct'}, squad:['sgt', 'brisk'], th:{r:{name:'Ula', lvl:17, squad:['sgt', 'haddat', 'tangle'], gear:{}, picks:{}, loy:{}, kit:[], inv:{salve:2}, dead:{}}}});
  const iH = b7ImpT(adjH); out.impH = iH && iH.lvl + ':' + iH.mates.join(',');
  /* the readings: the Deck for the Third (Book Four's reader), the Tiles for the Letherii (Book Five's) */
  S = newStateRG('Hask', 'Brann'); setBook('rg'); S.chapter = 1;
  out.read = {t:visReader().id, tiles:visTiles(), offer:!!(b7ReadOffer(1).ch || []).length, choice:/Deck/.test(b7ReadChoice(1).t), node:cardNodeName(), key:readingTableKey(),
    tables:[1,2,3,4,5,6,7].every(n => !!READTABLE['rg:' + n]), pool:[1,2,3,4,5,6,7].every(n => b7Pool(n).length === 5), say:b7CardSay('b2c_soldier').length > 20, square:!!(CARDBOOK.square && CARDBOOK.square())};
  b7Use('l'); S.chapter = 2; out.read.l = visReader().id; out.read.ltiles = visTiles(); out.read.lchoice = /tiles/.test(b7ReadChoice(2).t); out.read.lsay = b7CardSay('b5t_watcher').length > 20;
  out.read.lsquare = !!(CARDBOOK.square && CARDBOOK.square()); out.read.lnode = cardNodeName();
  S.card = 'b5t_boneperch'; const u0 = mkParty('tobet', 1, 1); S.card = null; const u1 = mkParty('tobet', 1, 1); out.read.tileHp = u0.maxhp - u1.maxhp;
  /* the art and the voice, the scenes and the foes */
  out.art = {title:/<svg/.test(ART['title/rg'] || ''), patch:(ART['insignia/rg'] || '').split('<svg').length - 1, titleArt:BOOKS.rg.titleArt, patchKey:BOOKS.rg.patch,
    scenes:['b7_coast_burning', 'b7_barracks', 'b7_village', 'b7_field', 'b7_city_burning'].every(k => SCENES[k] && SCENEX[k]),
    foes:['b7_edur', 'b7_lethxbow', 'b7_edurchief', 'b7_agent', 'b7_malregular', 'b7_marine', 'b7_whitefinder'].every(k => FOES[k]),
    gloss:(GLOSSX.rg || []).length, keys:Object.keys(B7KEYS).length};
  } catch(e) { out.err = String(e && e.stack || e); }
  return out; });
/* the new-sergeant screen for Book Seven (with a stand-in chapter so it is on the shelf) */
const ui = await page.evaluate(async () => { const wait = ms => new Promise(r => setTimeout(r, ms)); const o = {};
  try { registerChapter(1, {number:1, title:'Test', area:AREAS.pale ? {id:'pale', start:{x:5, y:8}} : null, intro:{loc:'', sub:'', cap:'', paras:[], go:'Go'}}, 'rg'); showTitle(false, 'rg'); await wait(300);
    o.shelf = !BOOKS.rg.coming && shelfBooks().some(b => b.id === 'rg');
    o.fields = !!document.getElementById('nm2') && !!document.getElementById('impSel2') && !document.getElementById('impField2').hidden && /Letherii/.test(document.getElementById('impField2').textContent) && /Book Six/.test(document.getElementById('impField').textContent);
    o.h1 = document.getElementById('tName').textContent;
    document.getElementById('nm').value = 'Ferro'; document.getElementById('nm2').value = 'Ferro'; document.getElementById('bNew').click(); await wait(100);
    o.same = /Two sergeants/.test(document.getElementById('nmMsg').textContent);
    document.getElementById('nm2').value = 'Pell'; document.getElementById('bNew').click(); await wait(300);
    o.made = !!(S && S.book === 'rg' && S.name === 'Ferro' && S.th && S.th.l && S.th.l.name === 'Pell');
  } catch(e) { o.err = String(e); } return o; });
if (r.err) no('threw: ' + r.err); else {
  r.caps === 'gotm:8 dg:8 moi:15 hoc:15 mt:8 bh:18' && r.capT === 21 && r.capL === 12 ? ok(`caps: ${r.caps}; Book Seven's Third 21, its Letherii 12`) : no('caps: ' + r.caps + ' ' + r.capT + '/' + r.capL);
  r.coming && !r.shelf.includes('rg') && r.book.n === 7 && r.book.word === 'Seven' && r.book.name === 'Unwitnessed' && r.book.title === 'Reaper\'s Gale' && /burn their ships/.test(r.book.tag)
    ? ok('the shelf: Book Seven, Unwitnessed, beside Reaper\'s Gale, coming until a chapter registers') : no('shelf: ' + r.shelf + ' ' + JSON.stringify(r.book) + ' coming ' + r.coming);
  const f = r.fresh; f.book === 'rg' && f.thread === 't' && f.name === 'Hask' && f.lvl === 16 && f.squad === 'sgt,haddat,tangle,marrow,mirrel' && f.lName === 'Brann' && f.lLvl === 8 && f.lSquad === 'sgt,tobet,thegg,perrit,ammet' && f.sathi && f.cap === 21
    ? ok('fresh start: the Third at 16 (Sathi fell at the Barrow), the Letherii at 8, canon defaults') : no('fresh: ' + JSON.stringify(f));
  f.core === 'sgt,haddat,sathi,tangle,marrow' && f.look === 'dg' && f.key === 'b7_c0_key' && f.rise === 2 && f.lDebt === 900 && f.tDebt == null && f.inv === 1 && f.lInv === 0 && f.patron === 'Treach'
    ? ok('the Third: its roster core, Book Two\'s look, Treach, b7_ keys, the Rising at 2; the Letherii keep Book Five\'s debts and no munitions') : no('third: ' + JSON.stringify(f));
  const s = r.swap; s.thread === 'l' && s.name === 'Brann' && s.squad === 'sgt,tobet,thegg,perrit,ammet' && s.core === 'sgt,tobet,thegg,perrit,ammet' && s.cusserL === 0 && s.kept === 5 && s.kitT && s.look === 'mt' && s.cap === 12 && s.lvl === 8 && s.debt === 900 && s.patron === 'the Errant' && s.ammet === 'Needle and Gut' && /dock/.test(s.coin) && s.sgtEpi !== r.back.sgtEpi
    ? ok('the swap: the Letherii come in with their own name, level, sergeant, look, the Errant, docks and Book Five\'s hands; the Third\'s kit waits') : no('swap: ' + JSON.stringify(s));
  r.capLv.lvl === 12 && r.idem && r.back.name === 'Hask' && r.back.cusser === 5 && r.back.kit && r.back.lvl === 16 && r.back.ammet !== 'Needle and Gut' && r.back.otherLvl === 12
    ? ok('per-squad caps: the Letherii stop at 12 while the Third stays at 16; swapping is idempotent and comes back whole') : no('back: ' + JSON.stringify(r.back) + ' ' + JSON.stringify(r.capLv) + ' ' + r.idem);
  r.lv.lvl === 21 && r.lv.dmg === 7 && r.lv.ac === 5 ? ok('the Third to 21: +1 damage at 19, +1 armour at 20') : no('levels: ' + JSON.stringify(r.lv));
  const ri = r.rise; ri.e0 === 0 && ri.e1 === 1 && !ri.e1p && ri.top === 10 && ri.now === 9 && ri.tier === 'risen' && ri.open && ri.guides && ri.noted && ri.hi === 10 && ri.html
    ? ok('the Rising: moved and noted, clamped 0..10, tiers, and the Third\'s edge on a rise:true check only') : no('rising: ' + JSON.stringify(ri));
  const fi = r.file; fi.heat0 === 3 && fi.file === 2 && fi.heat === 5 && fi.tier === 'watched' && fi.edge === -1 && !fi.wanted && fi.html && fi.riseShared === 9
    ? ok('the Letherii file: the Rising is shared and hunts them (heat = file + Rising/3), a −1 edge when watched') : no('file: ' + JSON.stringify(fi));
  const rc = r.rec; rc.t === 'doss,wenna' && rc.canDoss && !rc.canIlsa && rc.joined && rc.l === 'ilsa,sorvan' && rc.dossGone && rc.patrons === 'the Shore,the Empty Hold' && rc.roles
    ? ok('recruits go by squad: Doss and Wenna with the Third, Ilsa and Sorvan with the Letherii; roles, verbs, talents and gods') : no('recruits: ' + JSON.stringify(rc));
  const q = r.qual; q.adj && !q.jetty && q.emp && !q.paid && q.list === '1/1' ? ok('transfers: Book Six on the adjunct road and Book Five on the emperor road; others refused') : no('qualify: ' + JSON.stringify(q));
  const i = r.imp; i.lvl === 18 && i.squad === 'sgt,haddat,tangle,mehet,mirrel' && i.marrowDead && i.sword === 'b2_arensword' && i.loy === 2 && i.lLvl === 8 && i.lSquad === 'sgt,tobet,thegg,perrit,brune' && i.ammetDead && i.tobetDebt === 0 && i.theggDebt === 100 && i.salve === 4 && i.from === 'Vor'
    ? ok('a transfer carries level, squad, dead, gear, loyalty, munitions and (for the Letherii) debts, for both squads') : no('import: ' + JSON.stringify(i));
  r.impH === '17:haddat,tangle' ? ok('a Book Six save whose Fourth played last still gives up its Third') : no('impH: ' + r.impH);
  const d = r.read || {}; d.t === 'marrow' && !d.tiles && d.offer && d.choice && d.node === 'b7_c1_card' && d.key === 'rg:1' && d.tables && d.pool && d.say && !d.square && d.l === 'perrit' && d.ltiles && d.lchoice && d.lsay && d.lsquare && d.lnode === 'b7_c2_card' && d.tileHp === 4
    ? ok('the readings: Marrow and the Deck for the Third, Perrit and the Tiles (square, with their effects) for the Letherii; seven tables and pools') : no('read: ' + JSON.stringify(d));
  const a = r.art || {}; a.title && a.patch >= 3 && a.titleArt === 'title/rg' && a.patchKey === 'insignia/rg' && a.scenes && a.foes && a.gloss >= 12 && a.keys === 7
    ? ok('the title art, the two-squad patch, the borrowed backdrops, the foes, the glossary and the keys') : no('art: ' + JSON.stringify(a));
}
ui.shelf && ui.fields && /Unwitnessed/.test(ui.h1 || '') && ui.same && ui.made ? ok('the new-sergeant screen: two names (not the same one), two transfer pickers, and Begin makes both squads') : no('screen: ' + JSON.stringify(ui));
errors.length ? no('page errors: ' + errors.slice(0, 3).join(' | ')) : ok('no page errors');
await br.close(); srv.close && srv.close();
console.log(bad.length ? `\n${bad.length} FAIL` : '\nERRORS: none'); process.exit(bad.length ? 1 : 0);
