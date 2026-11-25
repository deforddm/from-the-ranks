// The player counter (v13.69.0; David, Nov 24, 2026: "is our counter working to show installs etc", "yes let's do both"; src/011b_count.js).
// A test browser never counts and never loads a counter's script; a chapter start and a finale still run with the counter's calls in them;
// every request the page makes goes nowhere near goatcounter.com or cloudflareinsights.com.
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser(); let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const { page, errors } = await openGame(br, srv.url, { fast:true, width:412, height:915 });
const hits = []; page.on('request', q => { if (/goatcounter|cloudflareinsights|zgo\.at/.test(q.url())) hits.push(q.url()); });
const r = await page.evaluate(async () => { const wait = ms => new Promise(r => setTimeout(r, ms));
  const o = { on: countOn, fn: typeof ftrCount, cf: !!document.querySelector('script[data-cf-beacon]') };
  setBook('gotm'); S = newState('Hask'); S.picksDue = []; migrate(S); save(); startChapter(1); await wait(300); o.intro = view;
  showFinale(0); await wait(300); o.fin = view; o.book = countBook(); return o; });
ok(r.fn === 'function' && r.on === false, 'the counter exists and is off in a test browser');
ok(!r.cf, 'no Cloudflare beacon in a test browser');
ok(r.intro === 'intro' && r.fin === 'finale' && r.book === 'gotm', 'a chapter start and a finale run with the counter in them ' + JSON.stringify(r));
ok(!hits.length, 'nothing sent to a counter ' + hits.join(' '));
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
