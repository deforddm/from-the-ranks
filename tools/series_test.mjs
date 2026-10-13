// The series (v5.1.0): Deeds by book (a Book Two sergeant never counts on Book One's road), the journal names its book and the
// Fourth's road, the squad's name per book, the Book One carry-over (said when picked, heard on the Chain's cards), where the books meet.
// Usage: node tools/series_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, {});
const bad = [], ok = m => console.log('  ok  ' + m), no = m => { bad.push(m); console.log('  FAIL ' + m); };
const r = await page.evaluate(async () => {
  const out = {};
  const mk = road => { const a = newState('Hask' + road); a.chapters = {0:'quiet', 1:'claw', 7:road}; a.chapter = 7; S = a; save(); const id = a.sid; S = null; return id; };
  const ids = {}; for (const road of ['empire', 'outlaw', 'city', 'disband']) ids[road] = mk(road);
  out.desc = Object.fromEntries(Object.entries(ids).map(([k, id]) => [k, impDesc(id)]));
  S = newStateDG('Vesh', ids.empire); S.chapters = {1:'zzz'}; S.chapter = 2; save();
  out.imported = S.imported && S.imported.road;
  out.notes = journalNotes()[0]; out.head = journalHead();
  openModal('journal'); out.heading = document.querySelector('#modal h2').textContent; out.meet = !!document.querySelector('.meet .worldmap');
  out.mapBook = typeof drawChainRoute === 'function';
  openModal('deeds'); out.deedsBooks = [...document.querySelectorAll('.bookdeeds summary')].map(s => s.textContent.replace(/\s+/g, ' ').trim());
  const roadOne = document.querySelectorAll('.bookdeeds')[0].querySelector('.deeds-road li b').textContent; out.roadOne = roadOne;
  $('#modal').hidden = true;
  const echoes = {};
  for (const road of ['empire', 'outlaw', 'city', 'disband']) { S = newStateDG('E' + road, ids[road]); S.chapter = 2; save(); startChapter(2); echoes[road] = (document.querySelector('.narr .echo') || {}).textContent || ''; }
  S = newStateDG('Plain', ''); save(); startChapter(2); out.noEcho = !document.querySelector('.narr .echo');
  S = newStateDG('Bridge', ''); save(); startChapter(1); out.bridge = (document.querySelector('.chcard .bridge') || {}).textContent || '';
  S = newState('Bk1'); save(); openModal('journal'); out.heading1 = document.querySelector('#modal h2').textContent; $('#modal').hidden = true;
  out.echoes = echoes; return out;
});
r.desc.empire.includes('empire road') && r.desc.empire.includes('Aren') ? ok('picking an empire-road sergeant says what carries') : no('empire desc: ' + r.desc.empire);
['outlaw', 'city', 'disband'].every(k => r.desc[k].includes('twice on the Chain')) ? ok('every other road says it is heard of on the Chain') : no('descs: ' + JSON.stringify(r.desc));
r.imported === 'empire' ? ok('the road is carried in') : no('imported: ' + r.imported);
/The Fourth's road/.test(r.notes) && /empire road/.test(r.notes) ? ok('the journal keeps the Fourth\'s road') : no('notes[0]: ' + r.notes);
/Book Two · The Chain of Dogs/.test(r.head) ? ok('the journal names its book') : no('head: ' + r.head.slice(0, 80));
r.heading === 'Third Squad' && r.heading1 === 'Fourth Squad' ? ok('each book names its own squad') : no(`headings: ${r.heading} / ${r.heading1}`);
r.meet ? ok('where the books meet, with the map') : no('no books-meet panel');
r.deedsBooks.length === 2 && /Book One/.test(r.deedsBooks[0]) && /4 sergeants, 4 finished/.test(r.deedsBooks[0]) && /Book Two/.test(r.deedsBooks[1]) ? ok('Deeds by book, each counting its own sergeants') : no('deeds: ' + r.deedsBooks.join(' | '));
r.roadOne === '1 of ' + r.roadOne.split(' of ')[1] ? ok('Book One\'s road counts only Book One endings') : no('road one: ' + r.roadOne);
Object.values(r.echoes).every(t => /the Fourth/.test(t)) && new Set(Object.values(r.echoes)).size === 4 ? ok('every road has its own word on the Chapter Two card') : no('echoes: ' + JSON.stringify(r.echoes));
r.noEcho ? ok('no echo without a Book One road') : no('echo shown on a fresh start');
/a few months after the Fete/.test(r.bridge) ? ok('Chapter One says where and when') : no('bridge: ' + r.bridge);
await br.close(); srv.kill();
if (errors.length) { console.log('page errors:', errors); process.exit(1); }
if (bad.length) { console.log(`series: FAIL (${bad.length})`); process.exit(1); }
console.log('series: 12 ok, 0 FAIL');
