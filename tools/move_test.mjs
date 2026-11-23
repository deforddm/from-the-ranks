// v13.64: the move. The old address shows a notice and hands every sergeant to the new address in one tap; the new address
// merges them, never lets an older copy replace a sergeant further along, takes nothing from a stranger's origin, and with the
// switch off the old address shows nothing. Two origins from one server: 127.0.0.1 (old) and localhost (new).
// Usage: node tools/move_test.mjs   (build first; exit 1 on a failure)
import { server, browser as launch } from './page.mjs';
const srv = await server(); const br = await launch();
const OLD = `http://127.0.0.1:${srv.port}`, NEW = `http://localhost:${srv.port}`;
const bad = [], ok = m => console.log('  ok  ' + m), no = m => { bad.push(m); console.log('  FAIL ' + m); };
const mk = async on => { const ctx = await br.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(([to, from, on]) => { window.FTR_MOVE = { on, to, from: [from] }; }, [NEW + '/index.html', OLD, on]); return ctx; };
const errors = [];
// 1. the switch off: nothing on the old address
{ const ctx = await mk(false), p = await ctx.newPage(); p.on('pageerror', e => errors.push(String(e)));
  await p.goto(OLD + '/index.html'); await p.waitForTimeout(800);
  await p.evaluate(() => { localStorage.clear(); S = newState('Hask'); save(); S = null; showTitle(); try { closeModal(); } catch(e) {} const m = document.getElementById('modal'); if (m) m.hidden = true; }); await p.waitForTimeout(300);
  (await p.evaluate(() => !document.querySelector('.mvline'))) ? ok('switch off: no notice on the old address') : no('switch off: a notice shows');
  await ctx.close(); }
// 1b. the switch off, but ?move=1 on the address: the notice shows for that visit
{ const ctx = await mk(false), p = await ctx.newPage(); await ctx.addInitScript(() => { delete window.FTR_MOVE.on; });
  await p.goto(OLD + '/index.html?move=1'); await p.waitForTimeout(800);
  await p.evaluate(() => { localStorage.clear(); S = newState('Hask'); save(); S = null; showTitle(); }); await p.waitForTimeout(300);
  (await p.evaluate(() => !!document.querySelector('.mvline #mvGo'))) ? ok('?move=1 shows the notice with the switch off') : no('?move=1 did not show the notice');
  await ctx.close(); }
// 2. the switch on: notice, one tap, both sergeants arrive
const ctx = await mk(true); const p = await ctx.newPage(); p.on('pageerror', e => errors.push(String(e)));
await p.goto(OLD + '/index.html'); await p.waitForTimeout(800);
await p.evaluate(() => { localStorage.clear(); S = newState('Hask'); S.chapter = 3; S.chapters = {1:'line', 2:'road'}; S.silver = 77; save(); S = newStateDG('Vesh'); save(); S = null; SET.art = false; saveSet(); showTitle(); try { closeModal(); } catch(e) {} const m = document.getElementById('modal'); if (m) m.hidden = true; });
await p.waitForTimeout(300);
const t0 = await p.evaluate(() => ({ text: (document.querySelector('.mvline') || {}).textContent || '', btn: (document.querySelector('#mvGo') || {}).textContent || '' }));
/has moved to localhost/.test(t0.text) && /Carry my sergeants across/.test(t0.btn) ? ok('old address: the notice names the new address and offers to carry both') : no('notice: ' + JSON.stringify(t0));
// the new address already holds an older Hask and a further-along Vesh of its own
const pre = await ctx.newPage(); pre.on('pageerror', e => errors.push(String(e))); await pre.goto(NEW + '/index.html'); await pre.waitForTimeout(800);
await pre.evaluate(() => { localStorage.clear(); S = newState('Hask'); S.chapter = 1; S.silver = 5; save(); S = newStateDG('Vesh'); S.chapter = 4; S.chapters = {1:'a', 2:'b', 3:'c'}; S.silver = 999; save(); S = null; });
await pre.close();
const done = async pg => { await pg.waitForLoadState('load'); await pg.waitForFunction(() => location.hash !== '#carry' && !!document.querySelector('.mvline'), null, { timeout: 60000 }).catch(() => {}); await pg.waitForTimeout(300); }; // v13.65.2: the new address checks for an update first, so wait for the carry itself, not a fixed time
const [np] = await Promise.all([ctx.waitForEvent('page'), p.click('#mvGo')]); np.on('pageerror', e => errors.push(String(e)));
await done(np);
const r1 = await np.evaluate(() => ({ origin: location.origin, hash: location.hash, list: roster().list.map(e => { const s = loadSlot(e.id); return s.name + ':' + (s.book || 'gotm') + ':' + (s.chapter || 0) + ':' + s.silver; }).sort(), note: (document.querySelector('.mvline') || {}).textContent || '', art: SET.art }));
r1.origin === NEW && r1.list.join() === 'Hask:gotm:3:77,Vesh:dg:4:999' ? ok('new address: the further Hask replaced the older one; its own further Vesh was left alone') : no('arrived: ' + JSON.stringify(r1));
/One sergeant carried across/.test(r1.note) && /left alone/.test(r1.note) ? ok('new address says what came and what was left') : no('note: ' + r1.note);
r1.hash === '' ? ok('the #carry mark is gone from the address') : no('hash: ' + r1.hash);
r1.art !== false ? ok('a device with sergeants keeps its own settings') : no('settings were overwritten');
await p.waitForFunction(() => !!moveMark(), null, { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(300);
const r2 = await p.evaluate(() => ({ mark: !!moveMark(), text: (document.querySelector('.mvline') || {}).textContent || '', btn: (document.querySelector('#mvGo') || {}).textContent || '', n: roster().list.length }));
r2.mark && /were carried to localhost/.test(r2.text) && /Go there/.test(r2.btn) && r2.n === 2 ? ok('old address: marked as carried, saves still there, the button now goes to the new address') : no('old after: ' + JSON.stringify(r2));
// 3. carrying again changes nothing
const [np2] = await Promise.all([ctx.waitForEvent('page'), p.click('#mvAgain')]); await done(np2);
const r3 = await np2.evaluate(() => ({ list: roster().list.map(e => { const s = loadSlot(e.id); return s.name + ':' + (s.chapter || 0); }).sort(), note: (document.querySelector('.mvline') || {}).textContent || '' }));
r3.list.join() === 'Hask:3,Vesh:4' && /Nothing new to carry/.test(r3.note) ? ok('a second carry adds nothing and says so') : no('second carry: ' + JSON.stringify(r3));
// 4. a stranger's origin is refused: a page that is neither address posts a backup at the new one
const evil = await ctx.newPage(); await evil.goto('about:blank');
const before = await np2.evaluate(() => roster().list.length);
await np2.evaluate(() => { window.postMessage({ ftrMove: 'carry', text: JSON.stringify({ ftr: 1, sergeants: [Object.assign(newState('Intruder'), {})], settings: null }) }, '*'); });
await np2.waitForTimeout(400);
(await np2.evaluate(() => roster().list.length)) === before ? ok('a backup posted from another origin is not taken') : no('a stranger\'s backup was taken');
await evil.close();
// 5. a fresh device at the new address takes everything, settings too
const ctx2 = await mk(true); const q = await ctx2.newPage(); q.on('pageerror', e => errors.push(String(e)));
await q.goto(OLD + '/index.html'); await q.waitForTimeout(800);
await q.evaluate(() => { localStorage.clear(); S = newState('Brell'); S.chapter = 2; save(); S = null; SET.art = false; saveSet(); showTitle(); try { closeModal(); } catch(e) {} const m = document.getElementById('modal'); if (m) m.hidden = true; }); await q.waitForTimeout(300);
const [nq] = await Promise.all([ctx2.waitForEvent('page'), q.click('#mvGo')]); await done(nq);
const r5 = await nq.evaluate(() => ({ list: roster().list.map(e => e.name + ':' + e.ch).join(), art: SET.art, title: !!document.querySelector('#tName') }));
r5.list === 'Brell:2' && r5.art === false && r5.title ? ok('a fresh device: the sergeant and the settings arrive, the title shows') : no('fresh: ' + JSON.stringify(r5));
// 5b. v13.65.1: one name in several books (a carried squad keeps its sergeant's name): every book's sergeant arrives, and a
// second carry brings the ones an earlier, broken carry dropped
{ const c4 = await mk(true); const q4 = await c4.newPage(); q4.on('pageerror', e => errors.push(String(e)));
  await q4.goto(OLD + '/index.html'); await q4.waitForTimeout(800);
  await q4.evaluate(() => { localStorage.clear(); const mk = (fn, ch) => { S = fn('Snert'); S.sid = newSid(); S.chapter = ch; save(); };
    mk(newState, 7); mk(newStateMOI, 3); mk(newStateBH, 2); mk(newStateRG, 1); S = null; showTitle(); try { closeModal(); } catch(e) {} const m = document.getElementById('modal'); if (m) m.hidden = true; });
  await q4.waitForTimeout(300);
  const n0 = await q4.evaluate(() => roster().list.map(e => (e.book || 'gotm')).sort().join());
  n0 === 'bh,gotm,moi,rg' ? ok('old address: four Snerts, one a book') : no('setup: ' + n0);
  // the new address as the broken carry left it: only one of them
  const pre4 = await c4.newPage(); await pre4.goto(NEW + '/index.html'); await pre4.waitForTimeout(800);
  await pre4.evaluate(() => { localStorage.clear(); S = newStateRG('Snert'); S.chapter = 1; save(); S = null; }); await pre4.close();
  const [n4] = await Promise.all([c4.waitForEvent('page'), q4.click('#mvGo')]); await done(n4);
  const r4 = await n4.evaluate(() => roster().list.map(e => (e.book || 'gotm') + ':' + e.ch).sort().join());
  r4 === 'bh:2,gotm:7,moi:3,rg:1' ? ok('new address: all four books\' sergeants are there after the carry') : no('same name, four books: ' + r4);
  // and a backup file restored onto a cleared device keeps all four
  const b4 = await q4.evaluate(() => { const t = backupText(); localStorage.clear(); const n = restoreBackup(parseBackup(t)); return n + ':' + roster().list.map(e => (e.book || 'gotm')).sort().join(); });
  b4 === '4:bh,gotm,moi,rg' ? ok('a backup file restores all four as well') : no('backup restore: ' + b4);
  await c4.close(); }
// 6. no sergeants on the old address: the button is a plain link onward
const ctx3 = await mk(true); const z = await ctx3.newPage(); await z.goto(OLD + '/index.html'); await z.waitForTimeout(800);
await z.evaluate(() => { localStorage.clear(); showTitle(); try { closeModal(); } catch(e) {} const m = document.getElementById('modal'); if (m) m.hidden = true; }); await z.waitForTimeout(300);
const r6 = await z.evaluate(() => ({ text: (document.querySelector('.mvline') || {}).textContent || '', btn: (document.querySelector('#mvGo') || {}).textContent || '' }));
/has moved to localhost/.test(r6.text) && /Go there/.test(r6.btn) ? ok('nobody to carry: the notice just points onward') : no('empty: ' + JSON.stringify(r6));
errors.length ? no('page errors: ' + errors.slice(0, 3).join(' | ')) : ok('no page errors');
await br.close(); srv.kill();
console.log(bad.length ? `\n${bad.length} FAIL` : '\nall passed'); process.exit(bad.length ? 1 : 0);
