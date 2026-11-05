// v9.0: Book Six's engine (docs/v9.0-notes.md). Two squads in one save: a fresh start (the Third at 12 with Haddat, Tangle, Marrow and Mirrel;
// the Fourth at 12 with Brisk, Kettle, Tuft and Ohl), the transfers (a finished Book Four on the 'line' road, a finished Book Three on the 'host'
// road; others refused), the swap at each chapter (name, level, gear, munitions, dead, the sergeant's own history and look), levels to 18,
// Fever (catch, the fight penalty, cure, Ressa immune), the recruits through the roster by thread, the shelf (coming until a chapter exists),
// the key flag; and Books One to Five untouched (their caps).
// Usage: node tools/b6engine_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const bad = [], ok = m => console.log('ok   ' + m), no = m => { bad.push(m); console.log('FAIL ' + m); };
const r = await page.evaluate(() => {
  const out = {};
  try {
  /* the other books' caps, before anything else */
  out.caps = ['gotm', 'dg', 'moi', 'hoc', 'mt', 'bh'].map(b => { S = {book:b}; return b + ':' + lvCap(); }).join(' ');
  out.shelf = shelfBooks().map(b => b.id).join(','); out.coming = !!BOOKS.bh.coming;
  /* a fresh Book Six */
  S = newStateBH('Hask', 'Brann'); save(); setBook('bh');
  out.fresh = {book:S.book, thread:S.thread, name:S.name, lvl:S.lvl, squad:S.squad.join(','), hName:S.th.h.name, hLvl:S.th.h.lvl, hSquad:S.th.h.squad.join(','),
    sathi:!!(S.dead.sathi), cap:lvCap(), core:rosterBook().core.join(','), sgtEpi:TPL.sgt.epithet, look:b6SgtLook(), key:keyFlag()};
  /* the swap */
  S.inv.cusser = 5; S.kit.push('heater'); b6Use('h');
  out.swap = {thread:S.thread, name:S.name, squad:S.squad.join(','), core:rosterBook().core.join(','), cusserH:S.inv.cusser, kept:S.th.r.inv.cusser, kitR:S.th.r.kit.includes('heater'),
    sgtEpi:TPL.sgt.epithet, look:b6SgtLook()};
  b6Use('h'); out.idem = S.thread === 'h' && !S.th.h;
  b6Use('r'); out.back = {name:S.name, cusser:S.inv.cusser, kit:S.kit.includes('heater')};
  /* levels to 18, and the vet pick at 17 */
  gainXP(999999); out.lv = {lvl:S.lvl, due17:S.picksDue.includes(17), dmg:lvDmg(), ac:lvAc()};
  /* Fever */
  const u0 = mkParty('haddat', 1, 1); b6Catch('haddat', 'a well'); const u1 = mkParty('haddat', 1, 1);
  out.fever = {on:b6Fevered('haddat'), hp:u0.maxhp - u1.maxhp, atk:u0.atk - u1.atk, list:b6FeverList().join(','), canCure:b6CanCure(), html:feverHTML().includes('Haddat')};
  b6Cure('haddat', 'Mirrel'); out.fever.cured = !b6Fevered('haddat');
  out.fever.ressa = b6Catch('ressa', 'test') === false;
  /* recruits by thread */
  out.rec = {r:b6Recruits().join(','), canMehet:b6CanRecruit('mehet'), canBrannoc:b6CanRecruit('brannoc')};
  b6Join('mehet'); out.rec.joined = S.squad.includes('mehet') || (S.camp || []).includes('mehet');
  b6Use('h'); out.rec.h = b6Recruits().join(','); out.rec.mehetGone = !S.squad.includes('mehet');
  /* the transfers: fake finished saves */
  const mk = (o) => { const id = newSid(); localStorage.setItem(slotKey(id), JSON.stringify(Object.assign({v:1, sid:id, f:{}, kit:[], gear:{}, picks:{}, loy:{}, inv:{salve:1, sharper:3}, dead:{}}, o)));
    const keep = S; S = loadSlot(id); save(); S = keep; return id; }; // through save(), so the roster lists it
  const line = mk({name:'Vor', book:'hoc', lvl:14, chapters:{7:'line'}, squad:['sgt', 'haddat', 'tangle', 'hessa', 'mirrel'], loy:{haddat:2}, dead:{marrow:{ch:7}}, gear:{haddat:{weapon:'b2_arensword'}}, kit:['b2_arensword']});
  const horse = mk({name:'Nim', book:'hoc', lvl:14, chapters:{7:'horse'}, squad:['sgt', 'haddat']});
  const host = mk({name:'Brisk2', book:'moi', lvl:15, chapters:{7:'host'}, squad:['sgt', 'brisk', 'kettle', 'ohl', 'sohra'], inv:{cusser:2}});
  const daru = mk({name:'Daru', book:'moi', lvl:15, chapters:{7:'daru'}, squad:['sgt', 'brisk']});
  out.qual = {line:!!b6ImpR(line), horse:!!b6ImpR(horse), host:!!b6ImpH(host), daru:!!b6ImpH(daru), list:b6ImpList('r').length + '/' + b6ImpList('h').length};
  S = newStateBH('Vor', 'Brisk2', line, host); setBook('bh');
  out.imp = {lvl:S.lvl, squad:S.squad.join(','), marrowDead:!!S.dead.marrow, sword:(S.gear.haddat || {}).weapon, loy:S.loy.haddat, hLvl:S.th.h.lvl, hSquad:S.th.h.squad.join(','), hCusser:S.th.h.inv.cusser};
  /* the Deck: each squad's own reader, words and captions; the seven tables; the offer node */
  S = newStateBH('Hask', 'Brann'); setBook('bh');
  out.deck = {r:visReader().id, cap:typeof CARDBOOK.cap(100, false, false), offer:!!(b6DeckOffer(1).ch || []).length, tables:[1,2,3,4,5,6,7].every(n => !!READTABLE['bh:' + n]),
    pool:[1,2,3,4,5,6,7].every(n => b6Pool(n).length === 5), key:(S.chapter = 1, readingTableKey())};
  b6Use('h'); out.deck.h = visReader().id; out.deck.say = b6CardSay('b3c_leper').length > 20;
  /* the art and the voice */
  out.art = {title:/<svg/.test(ART['title/bh'] || ''), patch:(ART['insignia/bh'] || '').split('<svg').length - 1, scenes:['b6_odhan_night', 'b6_ghatan_fire', 'b6_gdanisban_rain', 'b6_malaz'].every(k => SCENES[k] && SCENEX[k])};
  } catch(e) { out.err = String(e && e.stack || e); }
  return out; });
/* the new-sergeant screen for Book Six (with a stand-in chapter so it is on the shelf) */
const ui = await page.evaluate(async () => { const wait = ms => new Promise(r => setTimeout(r, ms)); const o = {};
  try { registerChapter(1, {number:1, title:'Test', area:AREAS.pale ? {id:'pale', start:{x:5, y:8}} : null, intro:{loc:'', sub:'', cap:'', paras:[], go:'Go'}}, 'bh'); showTitle(false, 'bh'); await wait(300);
    o.fields = !!document.getElementById('nm2') && !!document.getElementById('impSel2') && !document.getElementById('impField2').hidden;
    document.getElementById('nm').value = 'Corlo'; document.getElementById('nm2').value = 'Corlo'; document.getElementById('bNew').click(); await wait(100);
    o.same = /Two sergeants/.test(document.getElementById('nmMsg').textContent);
    document.getElementById('nm2').value = 'Pell'; document.getElementById('bNew').click(); await wait(300);
    o.made = S && S.book === 'bh' && S.name === 'Corlo' && S.th && S.th.h && S.th.h.name === 'Pell';
  } catch(e) { o.err = String(e); } return o; });
if (r.err) no('threw: ' + r.err); else {
  r.caps === 'gotm:8 dg:8 moi:15 hoc:15 mt:8 bh:18' ? ok('caps: ' + r.caps) : no('caps: ' + r.caps);
  !r.shelf.includes('bh') && r.coming ? ok('Book Six stays off the shelf until a chapter exists') : no('shelf: ' + r.shelf);
  const f = r.fresh; f.book === 'bh' && f.thread === 'r' && f.name === 'Hask' && f.lvl === 12 && f.squad === 'sgt,haddat,tangle,marrow,mirrel' && f.hName === 'Brann' && f.hLvl === 12 && f.hSquad === 'sgt,brisk,kettle,tuft,ohl' && f.sathi && f.cap === 18
    ? ok('fresh start: both squads at 12, canon defaults, Sathi fell at the Barrow') : no('fresh: ' + JSON.stringify(f));
  f.core === 'sgt,haddat,sathi,tangle,marrow' && f.look && /Third|9th|Fourteenth|Chain/i.test(f.sgtEpi || '') && f.key === 'b6_c0_key' ? ok('the Third: its roster core, Book Two\'s look, Book Four\'s sergeant, b6_ keys') : no('third: ' + JSON.stringify(f));
  const s = r.swap; s.thread === 'h' && s.name === 'Brann' && s.squad === 'sgt,brisk,kettle,tuft,ohl' && s.core === 'sgt,brisk,kettle,tuft,ohl' && s.cusserH === 1 && s.kept === 5 && s.kitR && !s.look && s.sgtEpi !== f.sgtEpi
    ? ok('the swap: the Fourth comes in with its own name, munitions and sergeant; the Third\'s kit waits') : no('swap: ' + JSON.stringify(s));
  r.idem && r.back.name === 'Hask' && r.back.cusser === 5 && r.back.kit ? ok('swapping is idempotent and comes back whole') : no('back: ' + JSON.stringify(r.back) + ' ' + r.idem);
  r.lv.lvl === 18 && r.lv.due17 && r.lv.dmg === 6 && r.lv.ac === 4 ? ok('levels to 18: a veteran pick at 17, +1 damage and armour at 16') : no('levels: ' + JSON.stringify(r.lv));
  const v = r.fever; v.on && v.hp === 4 && v.atk === 1 && v.list === 'haddat' && v.canCure && v.html && v.cured && v.ressa ? ok('Fever: −4 health and −1 to hit, shown, cured by a healer; Ressa does not catch it') : no('fever: ' + JSON.stringify(v));
  r.rec.r === 'mehet,ottar' && r.rec.canMehet && !r.rec.canBrannoc && r.rec.joined && r.rec.h === 'brannoc,ressa' && r.rec.mehetGone ? ok('recruits go by squad: Mehet and Ottar with the Third, Brannoc and Ressa with the Fourth') : no('recruits: ' + JSON.stringify(r.rec));
  const q = r.qual; q.line && !q.horse && q.host && !q.daru && q.list === '1/1' ? ok('transfers: Book Four on the line road and Book Three on the host road; others refused') : no('qualify: ' + JSON.stringify(q));
  const i = r.imp; i.lvl === 14 && i.squad === 'sgt,haddat,tangle,hessa,mirrel' && i.marrowDead && i.sword === 'b2_arensword' && i.loy === 2 && i.hLvl === 15 && i.hSquad === 'sgt,brisk,kettle,ohl,sohra' && i.hCusser === 2
    ? ok('a transfer carries level, squad, dead, gear, loyalty and munitions, for both squads') : no('import: ' + JSON.stringify(i));
}
  const d = r.deck || {}; d.r === 'marrow' && d.h === 'tuft' && d.cap === 'string' && d.offer && d.tables && d.pool && d.key === 'bh:1' && d.say ? ok('the Deck: Marrow reads for the Third, Tuft for the Fourth, their own words; seven tables and pools') : no('deck: ' + JSON.stringify(d));
  const a = r.art || {}; a.title && a.patch >= 3 && a.scenes ? ok('the title art, the two-squad patch and the borrowed backdrops') : no('art: ' + JSON.stringify(a));
ui.fields && ui.same && ui.made ? ok('the new-sergeant screen: two names (not the same one), and Begin makes both squads') : no('screen: ' + JSON.stringify(ui));
errors.length ? no('page errors: ' + errors.slice(0, 3).join(' | ')) : ok('no page errors');
await br.close(); srv.close && srv.close();
console.log(bad.length ? `\n${bad.length} FAIL` : '\nERRORS: none'); process.exit(bad.length ? 1 : 0);
