// Choose your book (v6.3): the title shows the three books as covers, on a new device and under a returning player's
// sergeants; a cover opens that book's page (its own sergeants, a new sergeant, Begin Book N); the book row flips in place;
// All books goes back. Pictures in /tmp/claude-0/shots/shelf-*.png.   Usage: node tools/shelf_test.mjs   (exit 1 on a failure)
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
let fail = 0; const ok = (c, m) => { console.log(`${c ? 'ok  ' : 'FAIL'} ${m}`); if (!c) fail = 1; };
const shot = (page, n) => page.screenshot({ path: `/tmp/claude-0/shots/shelf-${n}.png`, fullPage: true });
const wait = (page, ms = 150) => page.waitForTimeout(ms);
for (const [w, h, mobile] of [[360, 780, true], [1280, 800, false]]) {
  const { page, errors } = await openGame(br, srv.url, { fast: true, mobile, touch: mobile, width: w, height: h });
  const tag = `${w}px`;
  // a new device: the shelf alone, three covers, no name field yet
  await page.evaluate(() => { localStorage.clear(); localStorage.setItem('from-the-ranks-seen', '9.9.9'); S = null; showTitle(); document.querySelectorAll('#modal').forEach(e => e.hidden = true); });
  await wait(page, 400);
  let r = await page.evaluate(() => ({ covers: [...document.querySelectorAll('[data-shelf]')].map(b => b.dataset.shelf).join(','), nm: !!document.querySelector('#nm'), rh: document.querySelector('.shelf .rh').textContent,
    imgs: [...document.querySelectorAll('.cover img')].map(i => i.complete && i.naturalWidth > 0).join(','), fit: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    inview: [...document.querySelectorAll('.cover')].every(c => { const b = c.getBoundingClientRect(); return b.left >= 0 && b.right <= innerWidth + 1 && b.height > 80; }),
    want: Object.keys(BOOKS).filter(k => !BOOKS[k].coming).join(',') })); // Book Four joins the shelf once a chapter of it is registered (71 on)
  ok(r.covers === 'gotm,dg,moi' + (r.want.includes('hoc') ? ',hoc' : '') + (r.want.includes('mt') ? ',mt' : ''), `${tag} new device: ${r.want.includes('mt') ? 'five' : r.want.includes('hoc') ? 'four' : 'three'} covers (${r.covers})`); // v8.0: Book Five joins once its first chapter is registered (81 on)
  ok(!r.nm && r.rh === 'Choose your book', `${tag} new device: the shelf first, no name field (${r.rh})`);
  ok(r.imgs === r.want.split(',').map(() => 'true').join(','), `${tag} cover pictures load (${r.imgs})`);
  ok(r.fit && r.inview, `${tag} covers fit the screen`);
  await shot(page, `${w}-new`);
  // a cover opens that book's page
  await page.click('[data-shelf="dg"]'); await wait(page);
  r = await page.evaluate(() => ({ h1: document.querySelector('#tName').textContent, on: document.querySelector('.bseg .on').dataset.book, begin: document.querySelector('#bNew').textContent, back: !!document.querySelector('#bBack'), rows: document.querySelectorAll('#bookRows .sgtrow').length }));
  ok(/Chain/.test(r.h1) && r.on === 'dg' && r.begin === 'Begin Book Two' && r.back && !r.rows, `${tag} Book Two cover opens its page (${r.h1}; ${r.begin})`);
  await shot(page, `${w}-dg`);
  // begin from the book page
  await page.evaluate(() => { document.querySelector('#nm').value = 'Vesh'; document.querySelector('#bNew').click(); }); await wait(page, 500);
  r = await page.evaluate(() => ({ book: S && S.book, name: S && S.name }));
  ok(r.book === 'dg' && r.name === 'Vesh', `${tag} Begin Book Two starts a Book Two sergeant (${r.book} ${r.name})`);
  // returning: the sergeants first, then the shelf with counts
  await page.evaluate(() => { save(); S = null; if (typeof VIS !== 'undefined' && VIS) visEnd(); document.querySelectorAll('#modal,#chars,#settings,#sheet,#cardfx').forEach(e => e.hidden = true); S = newState('Hask'); save(); S = null; showTitle(); document.querySelectorAll('#modal').forEach(e => e.hidden = true); });
  await wait(page, 300);
  r = await page.evaluate(() => { const ro = document.querySelector('.roster'), sh = document.querySelector('.shelf');
    return { rows: document.querySelectorAll('.roster .sgtrow').length, last: [...document.querySelectorAll('.roster .load b')].map(b => b.textContent).join('|'), more: (document.querySelector('.rmore') || {}).textContent || '', order: !!(ro && sh && (ro.compareDocumentPosition(sh) & Node.DOCUMENT_POSITION_FOLLOWING)), badge: [...document.querySelectorAll('.cover em')].map(e => e.textContent).join('|'), newSgt: !!document.querySelector('#bNewSgt') }; });
  ok(r.rows === 1 && /Hask/.test(r.last) && r.order, `${tag} returning: only the sergeant played last (${r.last}), shelf under them`); // v8.0.2: the rest wait on their book's page
  ok(/One more sergeant waits/.test(r.more), `${tag} the title says one more sergeant waits (${r.more})`);
  ok(r.badge === '1 sergeant|1 sergeant', `${tag} covers count each book's sergeants (${r.badge})`);
  ok(!r.newSgt, `${tag} no separate New sergeant step`);
  await shot(page, `${w}-return`);
  // a book page lists only its own sergeants; the book row flips them in place
  await page.click('[data-shelf="gotm"]'); await wait(page);
  r = await page.evaluate(() => ({ rows: [...document.querySelectorAll('#bookRows .load b')].map(b => b.textContent).join('|'), lab: document.querySelector('#nmLab').textContent }));
  ok(/Hask/.test(r.rows) && !/Vesh/.test(r.rows) && /Or a new/.test(r.lab), `${tag} Book One page: carry on as Hask, or a new sergeant (${r.rows})`);
  await page.click('.bseg [data-book="dg"]'); await wait(page);
  r = await page.evaluate(() => ({ rows: [...document.querySelectorAll('#bookRows .load b')].map(b => b.textContent).join('|'), begin: document.querySelector('#bNew').textContent, h1: document.querySelector('#tName').textContent }));
  ok(/Vesh/.test(r.rows) && !/Hask/.test(r.rows) && r.begin === 'Begin Book Two' && /Chain/.test(r.h1), `${tag} flipping to Book Two shows Vesh and Begin Book Two`);
  await page.click('.bseg [data-book="moi"]'); await wait(page);
  r = await page.evaluate(() => ({ rows: document.querySelectorAll('#bookRows .sgtrow').length, begin: document.querySelector('#bNew').textContent, lab: document.querySelector('#nmLab').textContent }));
  ok(!r.rows && r.begin === 'Begin Book Three' && /Your sergeant/.test(r.lab), `${tag} Book Three: no sergeants yet, Begin Book Three`);
  await shot(page, `${w}-moi`);
  // erase from a book page (v8.0.2): the × asks twice, and the page comes back without them
  await page.evaluate(() => { S = newStateDG('Tarn'); save(); S = null; showTitle(false, 'dg'); document.querySelectorAll('#modal').forEach(e => e.hidden = true); }); await wait(page);
  r = await page.evaluate(() => { const row = [...document.querySelectorAll('#bookRows .sgtrow')].find(x => /Tarn/.test(x.textContent)); const d = row && row.querySelector('.del'); if (d) { d.click(); d.click(); }
    return { had: !!d, rows: [...document.querySelectorAll('#bookRows .load b')].map(b => b.textContent).join('|'), on: (document.querySelector('.bseg .on') || {}).dataset?.book, left: roster().list.map(e => e.name).join(',') }; });
  ok(r.had && /Vesh/.test(r.rows) && !/Tarn/.test(r.rows) && r.on === 'dg' && !/Tarn/.test(r.left), `${tag} erase on a book page: Tarn gone, Book Two's page back (${r.rows})`);
  // carry on from a book page
  await page.click('.bseg [data-book="dg"]'); await wait(page); await page.click('#bookRows .load'); await wait(page, 500);
  r = await page.evaluate(() => ({ name: S && S.name, view }));
  ok(r.name === 'Vesh' && r.view !== 'title', `${tag} carrying on from the book page loads Vesh (${r.view})`);
  // All books goes back to the title with the shelf
  await page.evaluate(() => { save(); S = null; document.querySelectorAll('#modal,#chars,#settings,#sheet,#cardfx').forEach(e => e.hidden = true); showTitle(false, 'moi'); });
  await page.click('#bBack'); await wait(page);
  r = await page.evaluate(() => ({ shelf: !!document.querySelector('.shelf'), nm: !!document.querySelector('#nm') }));
  ok(r.shelf && !r.nm, `${tag} All books goes back to the shelf`);
  // classic artwork: covers fall back to the numeral
  await page.evaluate(() => { SET.art = false; showTitle(); });
  await wait(page);
  r = await page.evaluate(() => ({ n: [...document.querySelectorAll('.cover .cimg i')].map(i => i.textContent).join(','), img: document.querySelectorAll('.cover img').length, hoc: !BOOKS.hoc.coming, mt: !BOOKS.mt.coming }));
  ok(r.n === 'I,II,III' + (r.hoc ? ',IV' : '') + (r.mt ? ',V' : '') && !r.img, `${tag} Classic artwork: covers show I, II, III${r.hoc ? ', IV' : ''}${r.mt ? ', V' : ''} (${r.n})`);
  await page.evaluate(() => { SET.art = true; });
  ok(!errors.length, `${tag} no page errors${errors.length ? ': ' + errors.slice(0, 2).join(' | ') : ''}`);
  await page.close();
}
await br.close(); srv.kill();
process.exit(fail);
