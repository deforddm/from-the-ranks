// iPhone and iPad (v5.0.2): a fresh From the Ranks says how to bring sergeants from Ashes of the Pale by save code, and Ashes codes load
// (a Book One code with no book, and a Book Two code). Runs as an iPhone browser.
// Usage: node tools/ios_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch } from './page.mjs';
const srv = await server(); const br = await launch();
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const page = await (await br.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, userAgent: UA })).newPage();
const errs = []; page.on('pageerror', e => errs.push(String(e)));
await page.goto(srv.url); await page.waitForTimeout(600);
const bad = [], ok = m => console.log('  ok  ' + m), no = m => { bad.push(m); console.log('  FAIL ' + m); };
const r = await page.evaluate(async () => {
  localStorage.clear(); localStorage.setItem('from-the-ranks-imported', '0'); localStorage.setItem('from-the-ranks-seen', '9.9.9'); showTitle();
  const hint = !!document.querySelector('.iosnote');
  const ashes = JSON.parse(JSON.stringify(newState('Hask'))); delete ashes.book; S = null;
  const vesh = JSON.parse(JSON.stringify(newStateDG('Vesh', ''))); S = null;
  const enc = o => btoa(unescape(encodeURIComponent(JSON.stringify(o))));
  for (const c of [enc(ashes), enc(vesh)]) { openModal('save'); await new Promise(f => setTimeout(f, 150)); $('#imp').value = c; $('#bLoad').click(); await new Promise(f => setTimeout(f, 400)); S = null; showTitle(); }
  return { hint, roster: roster().list.map(e => e.name + ':' + (e.book || 'gotm')).sort(), hintAfter: !!document.querySelector('.iosnote') };
});
r.hint ? ok('a fresh title on an iPhone shows the save-code hint') : no('no hint');
r.roster.join() === 'Hask:gotm,Vesh:dg' ? ok('Ashes save codes load, Book One and Book Two') : no('roster: ' + r.roster.join());
!r.hintAfter ? ok('the hint goes once sergeants are here') : no('hint still shown');
const p2 = await (await br.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await p2.goto(srv.url); await p2.waitForTimeout(500);
const r2 = await p2.evaluate(() => { localStorage.clear(); localStorage.setItem('from-the-ranks-imported', '0'); showTitle(true); return !!document.querySelector('.iosnote'); });
!r2 ? ok('no hint on other devices') : no('hint shown off iPhone');
await br.close(); srv.kill();
if (errs.length) { console.log('page errors:', errs); process.exit(1); }
if (bad.length) { console.log(`ios: FAIL (${bad.length})`); process.exit(1); }
console.log('ios: 4 ok, 0 FAIL');
