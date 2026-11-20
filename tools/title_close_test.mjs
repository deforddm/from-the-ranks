// The Title button (v13.61.2; David, Nov 20, 2026): going to the title from the middle of a conversation closes the conversation and
// every other overlay, and Continue opens the same conversation again.
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser(); let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const { page, errors } = await openGame(br, srv.url, { fast:true, width:412, height:915 });
const r = await page.evaluate(async () => { const wait = ms => new Promise(r => setTimeout(r, ms));
  setBook('gotm'); S = newState('Hask'); S.picksDue = []; migrate(S); save(); startExplore(); await wait(200);
  const id = Object.keys(DLG).find(k => { try { const n = DLG[k](); return n && n.ch && n.ch.length > 1; } catch (e) { return false; } }); talk(id); await wait(200);
  const open = !$('#sheet').hidden, node = S.node, btn = !!$('#bTitle'); $('#bTitle').click(); await wait(300);
  const o = { id, open, btn, view, sheet:$('#sheet').hidden, chars:$('#chars').hidden, settings:$('#settings').hidden, modal:$('#modal').hidden, cont:!!$('#bCont') };
  $('#bCont').click(); await wait(500); o.back = !$('#sheet').hidden && S && S.node === node; return o; });
ok(r.open && r.btn, `a conversation is open with the Title button in reach (${r.id})`);
ok(r.view === 'title' && r.sheet && r.chars && r.settings && r.modal, 'at the title nothing is left lying over it ' + JSON.stringify(r));
ok(r.cont && r.back, 'Continue opens the same conversation again');
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
