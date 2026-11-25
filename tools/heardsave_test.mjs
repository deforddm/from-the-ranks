// v13.68.3: a topic already heard stays dropped after a reload, because its mark is in the save (David, Nov 24, 2026)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch(); let fails = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fails++; };
const { page, errors } = await openGame(br, srv.url, { fast: true });
const r = await page.evaluate(() => { S = newStateTTH('Hask'); S.picksDue = []; S.chapter = 4; save(); const m = document.getElementById('modal'); if (m) m.style.display = 'none';
  const labels = () => curCh.map(c => c.go);
  talk('b8_c4_mossa'); const a = labels(); talk('b8_c4_mossa_camp'); talk('b8_c4_mossa'); const b = labels(); const kept = !!(S.heardT && S.heardT.b8_c4_mossa_camp); save();
  G.said = null; G.heard = null; talk('b8_c4_mossa'); const c = labels(); // as after a reload: nothing in the page's memory, only the save
  S.heardT.b8_c4_mossa_guards = 'zzzzzz'; G.said = null; G.heard = null; talk('b8_c4_mossa'); const d = labels(); // a mark that no longer matches the words drops nothing
  const raw = JSON.stringify(S).length; startChapter(5); return {a, b, c, d, kept, raw, cleared: S.heardT == null}; });
ok(r.a.includes('b8_c4_mossa_camp'), 'the topic is offered at first');
ok(!r.b.includes('b8_c4_mossa_camp'), 'heard, it is dropped in the same sitting');
ok(r.kept, 'its mark is in the save');
ok(!r.c.includes('b8_c4_mossa_camp') && r.c.includes('b8_c4_mossa_guards'), 'with the page\'s memory gone it stays dropped, and an unasked topic is still offered');
ok(r.d.includes('b8_c4_mossa_guards'), 'a mark that does not match the words drops nothing');
ok(r.cleared, 'the marks are cleared at the next chapter');
ok(!errors.length, 'no page errors'); console.log(fails ? 'FAILED ' + fails : 'heardsave_test: all pass'); await br.close(); process.exit(fails ? 1 : 0);
