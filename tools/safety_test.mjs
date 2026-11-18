// v13.48.0 (src/035c_safety.js): a save the browser refuses is said out loud and clears when a save works again; the backup
// made while it is refused holds the squad as it stands; an uncaught error shows the crash panel with the version and the
// page, once per message and at most three a visit; neither panel is wider than a phone.
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page } = await openGame(br, srv.url, { fast: true });
await page.setViewportSize({ width: 412, height: 915 });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const o = await page.evaluate(async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms)), r = {};
  S = newState('Hask'); migrate(S); save(); r.cleanStart = !document.getElementById('savewarn') && !saveBad;
  // the browser refuses every write
  const real = Storage.prototype.setItem; Storage.prototype.setItem = function(){ throw new DOMException('full', 'QuotaExceededError'); };
  S.silver += 7; const silver = S.silver; save(); save();
  r.warned = !!document.getElementById('savewarn'); r.one = document.querySelectorAll('#savewarn').length; r.bad = saveBad;
  const box = document.getElementById('savewarn').getBoundingClientRect(); r.fits = box.left >= 0 && box.right <= innerWidth;
  const d = backupData(), mine = d.sergeants.filter(x => x.name === 'Hask'); r.backupHasNow = mine.length === 1 && mine[0].silver === silver; r.shape = d.ftr === 1 && Array.isArray(d.sergeants);
  // storage works again: the warning goes
  Storage.prototype.setItem = real; save(); r.cleared = !document.getElementById('savewarn') && !saveBad;
  r.kept = loadSlot(S.sid).silver === silver;
  // a crash: the panel, its details, once per message, three at most
  S.node = 'c1_start'; setTimeout(() => { throw new Error('boom one'); }, 0); await wait(60);
  const p = document.getElementById('oops'); r.panel = !!p; r.txt = p ? p.querySelector('pre').textContent : '';
  if (p) { const b = p.getBoundingClientRect(); r.oopsFits = b.left >= 0 && b.right <= innerWidth; }
  setTimeout(() => { throw new Error('boom one'); }, 0); await wait(60); r.once = oopsCount === 1;
  Promise.reject(new Error('boom two')); await wait(60); r.reject = oopsCount === 2 && /boom two/.test(document.getElementById('oops').querySelector('pre').textContent);
  for (const m of ['three', 'four', 'five']) { setTimeout(() => { throw new Error('boom ' + m); }, 0); await wait(40); } r.cap = oopsCount === 3;
  document.getElementById('oopsX').click(); r.closed = !document.getElementById('oops');
  r.version = VERSION; return r;
});
ok(o.cleanStart, 'no warning on a normal save');
ok(o.warned && o.bad && o.one === 1, 'a refused save shows one warning');
ok(o.fits, 'the warning fits a phone');
ok(o.shape && o.backupHasNow, 'a backup made while saves are refused holds the squad as it stands, same file shape');
ok(o.cleared && o.kept, 'the warning clears when a save works again, and that save is kept');
ok(o.panel && o.txt.includes('From the Ranks v' + o.version) && /boom one/.test(o.txt) && /book gotm, chapter \d/.test(o.txt) && /page c1_start/.test(o.txt), 'a crash shows the panel with the version, the chapter and the page');
ok(o.oopsFits, 'the crash panel fits a phone');
ok(o.once, 'the same crash is shown once');
ok(o.reject, 'a failed promise shows too');
ok(o.cap, 'three panels a visit at most');
ok(o.closed, 'Carry on closes it');
await br.close(); srv.kill(); process.exit(fail);
