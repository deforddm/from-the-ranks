/* v13.48.0: two safety nets.
   (1) A save the browser refuses (its storage full, blocked or switched off) is said out loud. Before this, save() swallowed
       the error and the player carried on with nothing being kept. The warning stays until a save works again, and its button
       makes a backup file that includes the squad as it stands now (backupData, 035b, adds S while saveBad).
   (2) A crash panel. Any uncaught error shows what broke with the version, the book, the chapter and the page it happened on,
       and a button to copy it, so a report from a phone says where to look. At most three a visit, never the same one twice. */
let saveBad = false;
function safetyBox(){ let b = document.getElementById('safetybox'); if (!b) { b = document.createElement('div'); b.id = 'safetybox'; document.body.appendChild(b); } return b; } // the two panels stack, neither over the other
function saveFailed(){ if (saveBad || typeof document === 'undefined') return; saveBad = true;
  const w = document.createElement('div'); w.id = 'savewarn'; w.className = 'safety'; w.setAttribute('role', 'alert');
  w.innerHTML = `<p>This browser would not save the game. Its storage is full or blocked. Make a backup file now, so nothing is lost.</p><div class="row"><button class="btn primary" id="swGo">Backup file</button><button class="btn" id="swX">Not now</button></div>`;
  safetyBox().appendChild(w);
  document.getElementById('swGo').onclick = () => { const ok = downloadBackup(); const p = w.querySelector('p'); if (p) p.textContent = ok ? 'Backup file made. Keep it somewhere outside this browser. The game still cannot save here.' : 'The backup file could not be made either. Copy a save code from Squad, Pack, Save.'; };
  document.getElementById('swX').onclick = () => w.remove(); }
function saveWorked(){ if (!saveBad) return; saveBad = false; const w = typeof document !== 'undefined' && document.getElementById('savewarn'); if (w) w.remove(); }
let oopsCount = 0; const oopsSeen = {};
function crashText(msg, stack){ let where = 'title';
  try { if (S) where = `book ${S.book || 'gotm'}, chapter ${S.chapter}, ${view}${S.node ? ', page ' + S.node : ''}${B && B.id ? ', fight ' + B.id : ''}`; } catch(e) {}
  return `From the Ranks v${VERSION}\n${where}\n${msg}\n${String(stack || '').split('\n').slice(0, 6).join('\n')}\n${typeof navigator !== 'undefined' ? navigator.userAgent : ''}`.trim(); }
function showOops(msg, stack){ msg = String(msg || 'Unknown error');
  if (/ResizeObserver loop|^Script error\.?$/.test(msg) || oopsSeen[msg] || oopsCount >= 3 || typeof document === 'undefined' || !document.body) return;
  oopsSeen[msg] = 1; oopsCount++;
  const old = document.getElementById('oops'); if (old) old.remove();
  const w = document.createElement('div'); w.id = 'oops'; w.className = 'safety'; w.setAttribute('role', 'alert');
  w.innerHTML = `<p>Something broke. The game may carry on; if it does not, reload the page. Your last save is kept.</p><pre></pre><div class="row"><button class="btn primary" id="oopsCopy">Copy the details</button><button class="btn" id="oopsX">Carry on</button></div>`;
  const txt = crashText(msg, stack); w.querySelector('pre').textContent = txt; safetyBox().appendChild(w);
  document.getElementById('oopsCopy').onclick = ev => { const b = ev.currentTarget, done = ok => { b.textContent = ok ? 'Copied' : 'Select the text and copy it'; };
    const old2 = () => { try { const r = document.createRange(); r.selectNodeContents(w.querySelector('pre')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); done(document.execCommand('copy')); } catch(e) { done(false); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(() => done(true), old2); else old2(); };
  document.getElementById('oopsX').onclick = () => w.remove(); }
if (typeof window !== 'undefined') {
  window.addEventListener('error', ev => { if (ev && ev.message) showOops(ev.message, ev.error && ev.error.stack); });
  window.addEventListener('unhandledrejection', ev => { const r = ev && ev.reason; showOops(r && r.message ? r.message : String(r), r && r.stack); });
}
