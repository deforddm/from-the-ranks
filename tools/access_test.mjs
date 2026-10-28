// v7.3.3 (David, Oct 27): the title's credit names every book on the shelf; "Where the books meet" covers every book;
// the roster is one tap from the map (a Roster button beside Whole map when there is a choice) and a tab on every squad sheet.
import { server, browser as launch, openGame } from './page.mjs';
let bad = 0; const ok = (c, m) => { console.log(`${c ? 'ok' : 'FAIL'} ${m}`); if (!c) bad++; };
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
const r = await page.evaluate(async () => {
  const wait = ms => new Promise(z => setTimeout(z, ms)), o = {};
  const bs = shelfBooks().sort((a, b) => a.n - b.n);
  o.credit = titleCredit(); o.first = bs[0].title; o.last = bs[bs.length - 1].title; o.word = bs[bs.length - 1].word;
  o.meet = whereBooksMeetHTML(true); o.books = bs.map(b => b.name);
  // Book Four, Chapter 3, a spare walking: the button is on the map
  setBook('hoc'); S = newStateHOC('Hask'); S.chapter = 3; S.picksDue = []; S.f.b4_fill = 1; migrate(S); save(); $('#modal').hidden = true;
  startExplore(Object.keys(AREAS).find(a => /^b4_c3/.test(a))); await wait(200);
  const b = $('#bRoster'); o.btn = !!b; o.inRow = !!(b && b.closest('.maprow')); o.notHead = !document.querySelector('.hudr #bRoster');
  if (b) { b.click(); await wait(200); o.opened = !$('#modal').hidden && /The roster/.test($('#modal').textContent); closeRoster(); await wait(100); o.after = !!$('#bRoster'); }
  // the squad sheet has a Roster tab, and it opens the roster
  openChars(0); await wait(150); const t = document.querySelector('#chars .tab[data-t="roster"]'); o.tab = !!t;
  if (t) { t.click(); await wait(200); o.tabOpens = !$('#modal').hidden && /The roster/.test($('#modal').textContent); closeRoster(); }
  // Book One, Chapter 1: no one to bench, no one waiting: no button
  setBook('gotm'); S = newState('Hask'); S.chapter = 1; S.squad = [...PORDER]; migrate(S); save(); startExplore('pale_night'); await wait(150); o.noneB1 = !$('#bRoster');
  return o; });
ok(r.credit.includes(r.first) && r.credit.includes(r.last) && r.credit.startsWith(r.word + ' books'), `the title credit summarises the shelf: "${r.credit}"`);
ok(r.books.every(n => r.meet.includes(n)), 'Where the books meet names every book on the shelf: ' + r.books.join(', '));
ok(r.btn && r.inRow && r.notHead, 'Book Four with a spare walking: a Roster button beside Whole map, not in the header');
ok(r.opened && r.after, 'the map\'s Roster button opens the roster, and is still there after it closes');
ok(r.tab && r.tabOpens, 'the squad sheet has a Roster tab that opens the roster');
ok(r.noneB1, 'Book One, Chapter 1, nobody to change: no Roster button on the map');
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
await br.close(); srv.kill(); process.exit(bad ? 1 : 0);
