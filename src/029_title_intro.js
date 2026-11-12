/* v12.0.3: a two-squad patch (600 wide, two 290-wide patches) shows each squad's patch at a single patch's size */
function tpatchCls(k){ return 'tpatch' + (k && / viewBox="0 0 600 /.test(ART[k] || '') ? ' tpatch2' : ''); }
/* ============ title / intro ============ */
/* installing the game as an app on a PC. Chrome and Edge offer it with beforeinstallprompt, which is held here and fired from our own
   button (the title offers it once in a while; Settings always has it). Safari on a Mac has File > Add to Dock and no event, so it gets
   the directions. Firefox on a PC can't install web apps, so it gets nothing. Never offered inside the installed app itself. */
const INSTKEY = 'from-the-ranks-install';
let installEvt = null;
const asApp = () => { try { return window.matchMedia('(display-mode: standalone), (display-mode: window-controls-overlay), (display-mode: minimal-ui)').matches || navigator.standalone === true; } catch(e) { return false; } };
const macSafari = () => { const u = navigator.userAgent; return /Macintosh/.test(u) && /Version\/(1[7-9]|[2-9]\d)\b.*Safari\//.test(u) && !/Chrome|Chromium|Edg|OPR|Firefox/.test(u) && !('ontouchend' in document); };
const installWay = () => asApp() ? '' : installEvt ? 'prompt' : macSafari() ? 'dock' : '';
function installLater(way){ let v = ''; try { v = localStorage.getItem(INSTKEY) || ''; } catch(e) { return true; }
  if (way === 'dock' && v === 'dock-seen') return true; // Safari's directions, once; Settings keeps them after that
  const m = /^later:(\d+)$/.exec(v); return !!m && Date.now() - +m[1] < 14 * 864e5; } // Chrome only asks while the app isn't installed, so an old 'installed' mark means nothing here
const installMark = v => { try { localStorage.setItem(INSTKEY, v === 'later' ? 'later:' + Date.now() : v); } catch(e) {} };
window.addEventListener('beforeinstallprompt', e => { if (FINE()) e.preventDefault(); installEvt = e; offerInstall(); }); // a phone keeps its own install banner
window.addEventListener('appinstalled', () => { installEvt = null; installMark('installed'); const o = $('#instOffer'); if (o) o.remove(); });
async function runInstall(){ const ev = installEvt; if (!ev) return false; installEvt = null; try { ev.prompt(); const r = await ev.userChoice; installMark(r && r.outcome === 'accepted' ? 'installed' : 'later'); return r && r.outcome === 'accepted'; } catch(e) { return false; } }
/* the title's offer, on a PC only, and not again for two weeks after "Not now" */
function offerInstall(){
  const slot = $('#instSlot'); if (!slot || view !== 'title' || !FINE()) return;
  const way = installWay(); if (!way || installLater(way)) { slot.innerHTML = ''; return; }
  slot.innerHTML = way === 'prompt'
    ? `<div class="inst" id="instOffer"><div><b>Play it as a desktop app</b><small>Its own window with no browser bars, and a shortcut on your desktop and taskbar. Your sergeants come with it.</small></div><div class="row"><button class="btn primary" id="bInst">Install</button><button class="btn" id="bInstNo">Not now</button></div></div>`
    : `<div class="inst" id="instOffer"><div><b>Play it as a Mac app</b><small>In Safari's menu bar: File › Add to Dock. The Dock app keeps its own saves, so copy your sergeant's save code first (Squad › Save) and load it there.</small></div><div class="row"><button class="btn" id="bInstNo">Got it</button></div></div>`;
  if ($('#bInst')) $('#bInst').onclick = async () => { AUDIO.play('click'); const ok = await runInstall();
    slot.innerHTML = ok ? `<p class="fine inst-ok">Installed. It opens in its own window from your desktop, taskbar or Start menu; this tab can close.</p>` : ''; };
  $('#bInstNo').onclick = () => { AUDIO.play('click'); installMark(way === 'dock' ? 'dock-seen' : 'later'); slot.innerHTML = ''; };
}
/* the title: the sergeants saved on this device, last played first; tap one to play. The name prompt only shows for a new sergeant. */
const agoText = t => { if (!t) return ''; const d = Math.floor((new Date().setHours(0,0,0,0) - new Date(t).setHours(0,0,0,0)) / 864e5);
  return d <= 0 ? 'today' : d === 1 ? 'yesterday' : d < 7 ? `${d} days ago` : new Date(t).toLocaleDateString(undefined, {month:'short', day:'numeric'}); };
/* v7.3.3 (David, Oct 27: the credit on the title, summarised now there are four books and more coming): built from the shelf, so a new book
   joins it without an edit here */
function titleCredit(){ const bs = shelfBooks().sort((a, b) => a.n - b.n); if (!bs.length) return ''; const last = bs[bs.length - 1];
  return bs.length === 1 ? `Book One, ${bs[0].name}, beside ${bs[0].title}.` : `${last.word} books so far, each beside one of Erikson's Malazan novels, in order, from ${bs[0].title} to ${last.title}, with more to come.`; }
const bookCh = (b, n) => ((b || 'gotm') === BOOK ? CHAPTERS : (BOOKSNAP[b] || BOOKSNAP.gotm).ch)[n];
const rdUpT = n => ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'][n] || String(n);
const chLabel = (e, book = true) => (book && BOOKS[e.book || 'gotm'] ? `Book ${BOOKS[e.book || 'gotm'].word} · ` : '') + (e.done ? 'Finished' : e.ch === 0 ? (e.book ? 'Starting out' : 'The prologue') : `Chapter ${bookCh(e.book, e.ch) ? bookCh(e.book, e.ch).number : e.ch}`) + (e.diff && DIFFS[e.diff] ? ` (${DIFFS[e.diff].name})` : '');
/* Book One sergeants who have finished the book: Book Two can bring their road along (47: dgImport) */
/* iPhone and iPad keep each home-screen app's saves apart, so sergeants from Ashes of the Pale come across by save code (Ashes 4.9.2 offers
   one for each sergeant on its title). A fresh From the Ranks on an iPhone says so. */
const IOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
/* the title wears the book played last (the roster's first row), Book One on a new device */
const titleBookOf = list => { const b = list[0] && list[0].book; return b && BOOKS[b] ? b : 'gotm'; };
function titleDress(b){ const B = BOOKS[b] || BOOKS.gotm;
  if (ARTON()) { const el = $('.titleart'); if (el && el.dataset.book !== b) { el.dataset.book = b; el.innerHTML = art(B.titleArt || 'title/key'); } }
  else { const old = $('#titlecv'); if (old && old.dataset.book !== b) { const cv = document.createElement('canvas'); cv.id = 'titlecv'; cv.setAttribute('aria-hidden', 'true'); cv.dataset.book = b; old.replaceWith(cv); startTitleBackdrop(cv, b); } }
  const tp = $('#tPatch'); if (tp && tp.dataset.book !== b) { tp.dataset.book = b; tp.innerHTML = art(B.patch || 'insignia/patch', tpatchCls(B.patch)); }
  const tn = $('#tName'); if (tn) tn.innerHTML = `${B.h1[0]}<span>${B.h1[1]}</span>`;
  const tg = $('#tTag'); if (tg) tg.textContent = B.tag; }
const finishedGotm = () => roster().list.filter(e => (!e.book || e.book === 'gotm') && e.done);
/* the import field: Book Two brings a finished Book One's road; Book Three (60) brings a finished Book One sergeant on the outlaw road, and the Fourth with them */
const impList = b => b === 'dg' ? finishedGotm() : b === 'moi' && typeof b3Finished === 'function' ? b3Finished() : b === 'hoc' && typeof b4Finished === 'function' ? b4Finished() : [];
const impShow = b => b === 'bh' || b === 'rg' || b === 'tth' || b === 'dod' || b === 'tcg' || impList(b).length > 0; // v9.0: Book Six always asks for its second sergeant's name (100)
function impInner(b){ const opts = impList(b).map(e => `<option value="${e.id}">Sergeant ${esc(e.name)}</option>`).join('');
  if (b === 'bh' && typeof b6ImpList === 'function') { const o = t => b6ImpList(t).map(e => `<option value="${e.id}">Sergeant ${esc(e.name)}</option>`).join('');
    return `<label for="impSel">Bring Book Four's squad (the Third, with the Fourteenth)</label><select id="impSel"><option value="">No: a fresh start</option>${o('r')}</select>
      <small class="fine" id="impDesc">Only a finished Book Four on the line road: that squad is still with the Adjunct.</small>`; }
  if (b === 'rg' && typeof b7ImpList === 'function') { const o = b7ImpList('t').map(e => `<option value="${e.id}">Sergeant ${esc(e.name)}</option>`).join(''); // v10.0: Book Seven (120)
    return `<label for="impSel">Bring Book Six's squad (the Third)</label><select id="impSel"><option value="">No: a fresh start</option>${o}</select>
      <small class="fine" id="impDesc">Only a finished Book Six on the adjunct road: that Third sailed on with the fleet.</small>`; }
  if (b === 'tth' && typeof b8ImpList === 'function') { const o = b8ImpList().map(e => `<option value="${e.id}">Sergeant ${esc(b8ImpName(e.id) || e.name)}</option>`).join(''); // v11.0: Book Eight (140)
    return `<label for="impSel">Bring the Fourth (Book Three or Book Six)</label><select id="impSel"><option value="">No: a fresh start</option>${o}</select>
      <small class="fine" id="impDesc">${b8ImpDesc('')} Only a finished Book Three on the daru or stand-down road, or a finished Book Six (any of the Fourth's roads).</small>`; }
  if (b === 'dod' && typeof b9ImpList === 'function') { const o = b9ImpList('t').map(e => `<option value="${e.id}">Sergeant ${esc(b9ImpName(e.id, 't') || e.name)}</option>`).join(''); // v12.0: Book Nine (160)
    return `<label for="impSel">Bring Book Seven's Third</label><select id="impSel"><option value="">No: a fresh start</option>${o}</select>
      <small class="fine" id="impDesc">${b9ImpDesc('', 't')} Only a finished Book Seven whose Third stayed with the army (the adjunct road).</small>`; }
  if (b === 'tcg' && typeof b10ImpList === 'function') { const o = b10ImpList('t').map(e => `<option value="${e.id}">Sergeant ${esc(b10ImpName(e.id, 't') || e.name)}</option>`).join(''); // v13.0: Book Ten (180)
    return `<label for="impSel">Bring Book Nine's Third</label><select id="impSel"><option value="">No: a fresh start</option>${o}</select>
      <small class="fine" id="impDesc">${b10ImpDesc('', 't')} Only a finished Book Nine whose Third went on (the adjunct or south road).</small>`; }
  if (b === 'hoc') return `<label for="impSel">Bring a Book Two sergeant and the squad</label><select id="impSel"><option value="">No: a fresh start</option>${opts}</select><small class="fine" id="impDesc">Only a finished Book Two on the Aren Guard or the Wickan road: that squad was in Aren when the Adjunct came. The desert road leads elsewhere.</small>`;
  return b === 'moi' ? `<label for="impSel">Bring a Book One sergeant and the Fourth</label><select id="impSel"><option value="">No: a fresh start</option>${opts}</select><small class="fine" id="impDesc">Only a finished Book One on the outlaw road: that Fourth marched north with the Host. The other roads lead elsewhere.</small>`
    : `<label for="impSel">Bring a Book One sergeant's road</label><select id="impSel"><option value="">No: a fresh start</option>${opts}</select><small class="fine" id="impDesc">Only a finished Book One counts: how the Fourth left Darujhistan is heard of on the Chain, and on one road one of them may find you at Aren.</small>`; }
/* v9.0: Book Six's second sergeant, under the first's name (100): the Fourth's name, and a Book Three squad to bring */
function impInner2(b){ if (b === 'tcg' && typeof b10ImpList === 'function') { const o = t => b10ImpList(t).map(e => `<option value="${e.id}">Sergeant ${esc(b10ImpName(e.id, t) || (t === 'l' ? 'Brann' : e.name))}</option>`).join(''); // v13.0: Book Ten's Letherii and Book Eight's Fourth (180)
    return `<label for="nm2">The Letherii sergeant (the Sixth Company)</label><input type="text" id="nm2" maxlength="18" value="Brann" placeholder="Name the Letherii sergeant" autocomplete="off" autocapitalize="words" spellcheck="false">
    <label for="impSel2">Bring Book Nine's Letherii</label><select id="impSel2"><option value="">No: a fresh start</option>${o('l')}</select>
    <small class="fine" id="impDesc2">${b10ImpDesc('', 'l')} Only a finished Book Nine whose Letherii went on (the escort or adjunct road).</small>
    <label for="impSel3">Bring Book Eight's Fourth (the last chapter only)</label><select id="impSel3"><option value="">No: the Fourth as canon leaves it</option>${o('f')}</select>
    <small class="fine" id="impDesc3">${b10ImpDesc('', 'f')} Only a finished Book Eight on the east road.</small>`; }
  if (b === 'dod' && typeof b9ImpList === 'function') { const o = b9ImpList('l').map(e => `<option value="${e.id}">Sergeant ${esc(b9ImpName(e.id, 'l') || 'Brann')}</option>`).join(''); // v12.0: Book Nine's Letherii (160)
    return `<label for="nm2">The Letherii sergeant (in the escort)</label><input type="text" id="nm2" maxlength="18" value="Brann" placeholder="Name the Letherii sergeant" autocomplete="off" autocapitalize="words" spellcheck="false">
    <label for="impSel2">Bring Book Seven's Letherii (the Sixth Company)</label><select id="impSel2"><option value="">No: a fresh start</option>${o}</select>
    <small class="fine" id="impDesc2">${b9ImpDesc('', 'l')} Only a finished Book Seven whose Letherii stayed in the army (the army road).</small>`; }
  if (b === 'rg' && typeof b7ImpList === 'function') { const o = b7ImpList('l').map(e => `<option value="${e.id}">Sergeant ${esc(e.name)}</option>`).join(''); // v10.0: Book Seven's Letherii (120)
    return `<label for="nm2">The Letherii sergeant (the Sixth Company)</label><input type="text" id="nm2" maxlength="18" value="Brann" placeholder="Name the Letherii sergeant" autocomplete="off" autocapitalize="words" spellcheck="false">
    <label for="impSel2">Bring Book Five's squad (the Sixth Company)</label><select id="impSel2"><option value="">No: a fresh start</option>${o}</select>
    <small class="fine">Only a finished Book Five on the emperor road: that squad stayed in the army under the Edur.</small>`; }
  if (b !== 'bh' || typeof b6ImpList !== 'function') return '';
  const o = b6ImpList('h').map(e => `<option value="${e.id}">Sergeant ${esc(e.name)}</option>`).join('');
  return `<label for="nm2">The Fourth's sergeant (with Onearm's Host)</label><input type="text" id="nm2" maxlength="18" value="Brann" placeholder="Name the Fourth's sergeant" autocomplete="off" autocapitalize="words" spellcheck="false">
    <label for="impSel2">Bring Book Three's squad (the Fourth)</label><select id="impSel2"><option value="">No: a fresh start</option>${o}</select>
    <small class="fine">Only a finished Book Three on the host road: that Fourth marched on with Onearm's Host.</small>`; }
/* Choose your book (v6.3): the title shows the three books as covers. A returning player sees their sergeants first and the
   shelf under them; a new device sees the shelf alone. A cover opens that book's page: its sergeants to carry on, and a new
   sergeant for it (name, difficulty, a Book One road to bring). The book row on that page flips between books in place. */
const coverSrcs = {};
function coverSrc(key){ if (!ARTON() || !ART[key]) return '';
  if (!coverSrcs[key]) { const [w, h] = ART_SIZE[key] || [1600, 900]; coverSrcs[key] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(ART[key].replace('<svg ', `<svg width="${w}" height="${h}" `)); }
  return coverSrcs[key]; }
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const onShelf = (e, b) => (e.book || 'gotm') === b;
function shelfHTML(list){
  return `<div class="shelf"><div class="rh">${list.length > 1 ? 'Choose a book: its sergeants, or a new one' : list.length ? 'A new sergeant? Choose your book' : 'Choose your book'}</div><div class="covers">${shelfBooks().map(B => {
    const n = list.filter(e => onShelf(e, B.id)).length, src = coverSrc(B.titleArt || 'title/key');
    return `<button class="cover" data-shelf="${B.id}" aria-label="Book ${B.word}: ${esc(B.name)}, beside ${esc(B.title)}${n ? `; ${n} sergeant${n > 1 ? 's' : ''}` : ''}">
      <span class="cimg">${src ? `<img src="${src}" alt="" draggable="false"${B.coverPos ? ` style="object-position:${B.coverPos}"` : ''}>` : `<i>${ROMAN[B.n]}</i>`}${n ? `<em>${n} sergeant${n > 1 ? 's' : ''}</em>` : ''}</span>
      <span class="cw">Book ${B.word}</span><b>${esc(B.name)}</b><small>${esc(B.title)}</small></button>`; }).join('')}</div></div>`; }
function showTitle(fresh, want){
  if (S) save(); view = 'title'; B = null; S = null; AUDIO.setScene('title');
  const list = roster().list, form = !!(fresh || want), tb = want && BOOKS[want] ? want : titleBookOf(list), TB = BOOKS[tb];
  /* v8.0.2 (David, Oct 29: five books): the title shows only the sergeant played last; the rest wait on their book's page, where each can carry on or be erased */
  const rowsOf = (L, main) => L.map((e, i) => `<div class="sgtrow"><button class="btn load ${i ? '' : 'primary'}" data-id="${e.id}" ${i || !main ? '' : 'id="bCont"'}><b>${i ? '' : 'Continue as '}Sergeant ${esc(e.name)}</b><small>${[chLabel(e, main), e.done ? '' : e.where, `level ${e.lvl}`, agoText(e.upd)].filter(Boolean).map(esc).join(' · ')}</small></button><button class="btn icon del" data-id="${e.id}" aria-label="Erase Sergeant ${esc(e.name)} (press and hold)">×</button></div>`).join('');
  const rows = rowsOf(list.slice(0, 1), true), more = list.length - 1;
  const bookRows = b => { const L = list.filter(e => onShelf(e, b)); return L.length ? `<div class="roster"><div class="rh">Carry on in Book ${BOOKS[b].word}${L.length > 1 ? `: ${L.length} sergeants` : ''}</div>${rowsOf(L, false)}</div>` : ''; };
  const taken = n => list.find(e => sameName(e.name, n));
  const iosNote = !list.length && IOS() ? `<p class="fine iosnote">Coming from Ashes of the Pale on this iPhone? On its title, tap your sergeant's name under <i>Copy a sergeant's code</i>, then tap <b>Load a backup or save code</b> here and paste it.</p>` : '';
  toTop(); $('#app').innerHTML = `${ARTON() ? `<div class="titleart" aria-hidden="true" data-book="${tb}">${art(TB.titleArt || 'title/key')}</div>` : ''}<canvas id="titlecv" aria-hidden="true" data-book="${tb}" ${ARTON() ? 'hidden' : ''}></canvas>${fullBtn('bFullT').replace('class="btn icon"', 'class="btn icon tfull"')}<div id="title" class="title">
    <span id="tPatch" data-book="${tb}">${art(TB.patch || 'insignia/patch', tpatchCls(TB.patch))}</span><div class="series">From the Ranks</div><h1 id="tName">${TB.h1[0]}<span>${TB.h1[1]}</span></h1>
    <p class="tag" id="tTag">${TB.tag}</p>
    ${form ? `<div class="field"><label>Book</label><div class="seg bseg">${Object.values(BOOKS).filter(b => !b.coming || b.id === tb).map(b => `<button class="btn ${b.id === tb ? 'on' : ''}" data-book="${b.id}">Book ${b.word}<small>${b.name}${b.coming ? ' · coming' : ''}</small></button>`).join('')}</div><small class="fine" id="bBlurb">${TB.blurb}</small></div>
    <div id="bookRows">${bookRows(tb)}</div>
    <div class="field" id="impField" ${impShow(tb) ? '' : 'hidden'}>${impInner(tb)}</div>
    <div class="field"><label for="nm" id="nmLab">${list.some(e => onShelf(e, tb)) ? 'Or a new sergeant’s name' : 'Your sergeant’s name'}</label><input type="text" id="nm" maxlength="18" value="${taken('Hask') ? '' : 'Hask'}" placeholder="Name your sergeant" autocomplete="off" autocapitalize="words" spellcheck="false"></div>
    <div class="field" id="impField2" ${tb === 'bh' || tb === 'rg' || tb === 'dod' || tb === 'tcg' ? '' : 'hidden'}>${impInner2(tb)}</div>
    <div class="field"><label>Difficulty</label><div class="seg dseg">${Object.entries(DIFFS).map(([k, d]) => `<button class="btn ${k === 'soldier' ? 'on' : ''}" data-diff="${k}">${d.name}</button>`).join('')}</div><small class="fine" id="dBlurb">${DIFFS.soldier.blurb} You can change it later in Settings.</small></div>
    ${iosNote}
    <p class="fine tmsg" id="nmMsg" role="status"></p>
    <div class="tbtns"><button class="btn primary" id="bNew">Begin Book ${TB.word}</button><button class="btn icon" id="bSet" aria-label="Settings">${GEAR}</button>
      <div class="row2"><button class="btn" id="bBack">All books</button>${list.length ? '' : '<button class="btn" id="bImp">Load a backup or save code</button>'}</div></div>`
    : list.length ? `<div class="roster"><div class="rh">${more ? 'Last played' : 'Your sergeant'}</div>${rows}${more ? `<small class="fine rmore">${more === 1 ? 'One more sergeant waits' : `${rdUpT(more)} more sergeants wait`} on this device. Open their book to carry on.</small>` : ''}</div>
    ${shelfHTML(list)}
    ${backupLine()}
    <div class="tbtns"><button class="btn" id="bImp">Backups and save codes</button><button class="btn icon" id="bSet" aria-label="Settings">${GEAR}</button>
      <div class="row2"><button class="btn" id="bDeeds">Deeds</button></div></div>`
    : `${shelfHTML(list)}${iosNote}
    <div class="tbtns"><button class="btn" id="bImp">Load a backup or save code</button><button class="btn icon" id="bSet" aria-label="Settings">${GEAR}</button></div>`}
    <div id="instSlot"></div>
    <p class="fine">From the Ranks: Malazan fan tales told by ordinary soldiers, for personal play. The world was created by Steven Erikson and Ian C. Esslemont, and it and its canon characters belong to them. ${titleCredit()} Sound on for the full effect. <button class="ver" id="bVer" aria-label="What's new in this version">v${VERSION}</button></p></div>`;
  if (!ARTON()) startTitleBackdrop($('#titlecv'), tb); else titleAnim = null;
  $('#bSet').onclick = () => { AUDIO.play('click'); openSettings(); };
  $('#bVer').onclick = () => { AUDIO.play('click'); openNotes(null); };
  if ($('#bFullT')) $('#bFullT').onclick = () => { AUDIO.play('click'); toggleFull(); };
  if ($('#bImp')) $('#bImp').onclick = () => { AUDIO.play('click'); openModal('save'); };
  bindBackupLine(); // v8.2: the backup reminder under the roster (35b)
  const bindLoads = root => root.querySelectorAll('.sgtrow .load').forEach(el => el.onclick = () => { AUDIO.play('click'); const s = loadSlot(el.dataset.id);
    if (!s) { dropSlot(el.dataset.id); return showTitle(); } S = s; resume(); });
  if (form) {
    const msg = t => { $('#nmMsg').textContent = t; }, b = $('#bNew'), nm = $('#nm');
    const label = () => `Begin Book ${BOOKS[book].word}`;
    // a name already on the roster asks twice: the second tap starts that sergeant over
    b.onclick = () => { AUDIO.play('click'); const n = nm.value.trim().replace(/\s+/g, ' ');
      if (!n) { msg('Give your sergeant a name.'); nm.focus(); return; }
      const imp = $('#impSel') && !$('#impField').hidden ? $('#impSel').value : '';
      if (book === 'moi' && typeof b3ChCount === 'function' && !b3ChCount()) { msg('Book Three is still being written. Its chapters are on the way.'); return; }
      if (book === 'hoc' && typeof b4ChCount === 'function' && !b4ChCount()) { msg('Book Four is still being written. Its chapters are on the way.'); return; }
      if (book === 'mt' && typeof b5ChCount === 'function' && !b5ChCount()) { msg('Book Five is still being written. Its chapters are on the way.'); return; }
      if (book === 'bh' && typeof b6ChCount === 'function' && !b6ChCount()) { msg('Book Six is still being written. Its chapters are on the way.'); return; }
      if (book === 'rg' && typeof b7ChCount === 'function' && !b7ChCount()) { msg('Book Seven is still being written. Its chapters are on the way.'); return; }
      if (book === 'tth' && typeof b8ChCount === 'function' && !b8ChCount()) { msg('Book Eight is still being written. Its chapters are on the way.'); return; }
      if (book === 'dod' && typeof b9ChCount === 'function' && !b9ChCount()) { msg('Book Nine is still being written. Its chapters are on the way.'); return; }
      if (book === 'tcg' && typeof b10ChCount === 'function' && !b10ChCount()) { msg('Book Ten is still being written. Its chapters are on the way.'); return; }
      if (book === 'tcg') { const n2 = ($('#nm2') ? $('#nm2').value : '').trim().replace(/\s+/g, ' '), imp2 = $('#impSel2') ? $('#impSel2').value : '', imp3 = $('#impSel3') ? $('#impSel3').value : ''; // v13.0: two squads from Book Nine, and the Fourth from Book Eight (180)
        if (!n2) { msg('Give the Letherii sergeant a name too.'); if ($('#nm2')) $('#nm2').focus(); return; }
        if (sameName(n2, n)) { msg('Two sergeants, two names.'); $('#nm2').focus(); return; }
        const t10 = imp || imp2 || imp3 ? list.find(e => e.book === 'tcg' && sameName(e.name, n)) : taken(n); // a Book Nine sergeant carried across keeps their Book Nine save
        if (t10 && b.dataset.arm !== n.toLowerCase()) { b.dataset.arm = n.toLowerCase(); b.classList.add('warn'); b.classList.remove('primary'); b.textContent = `Start Sergeant ${t10.name} over`; msg(tapWord(`Sergeant ${t10.name} already has a save here. Tap again to start over; that save is erased. Or go back and pick them to carry on.`)); return; }
        S = newStateTCG(n, n2, imp, imp2, imp3, t10 ? t10.id : undefined); S.diff = diff; save(); return startChapter(1); }
      if (book === 'dod') { const n2 = ($('#nm2') ? $('#nm2').value : '').trim().replace(/\s+/g, ' '), imp2 = $('#impSel2') ? $('#impSel2').value : ''; // v12.0: two squads, carried from Book Seven (160)
        if (!n2) { msg('Give the Letherii sergeant a name too.'); if ($('#nm2')) $('#nm2').focus(); return; }
        if (sameName(n2, n)) { msg('Two sergeants, two names.'); $('#nm2').focus(); return; }
        const t9 = imp || imp2 ? list.find(e => e.book === 'dod' && sameName(e.name, n)) : taken(n); // a Book Seven sergeant carried across keeps their Book Seven save
        if (t9 && b.dataset.arm !== n.toLowerCase()) { b.dataset.arm = n.toLowerCase(); b.classList.add('warn'); b.classList.remove('primary'); b.textContent = `Start Sergeant ${t9.name} over`; msg(tapWord(`Sergeant ${t9.name} already has a save here. Tap again to start over; that save is erased. Or go back and pick them to carry on.`)); return; }
        S = newStateDOD(n, n2, imp, imp2, t9 ? t9.id : undefined); S.diff = diff; save(); return startChapter(1); }
      if (book === 'bh' || book === 'rg') { const n2 = ($('#nm2') ? $('#nm2').value : '').trim().replace(/\s+/g, ' ');
        if (!n2) { msg(book === 'rg' ? 'Give the Letherii sergeant a name too.' : 'Give the Fourth\'s sergeant a name too.'); if ($('#nm2')) $('#nm2').focus(); return; }
        if (sameName(n2, n)) { msg('Two sergeants, two names.'); $('#nm2').focus(); return; }
        const t6 = taken(n); if (t6 && b.dataset.arm !== n.toLowerCase()) { b.dataset.arm = n.toLowerCase(); b.classList.add('warn'); b.classList.remove('primary'); b.textContent = `Start Sergeant ${t6.name} over`; msg(tapWord(`Sergeant ${t6.name} already has a save here. Tap again to start over; that save is erased. Or go back and pick them to carry on.`)); return; }
        S = (book === 'rg' ? newStateRG : newStateBH)(n, n2, imp, $('#impSel2') ? $('#impSel2').value : '', t6 ? t6.id : undefined); S.diff = diff; save(); return startChapter(1); } // v9.0: two squads (100); v10.0 Book Seven (120)
      const t = (book === 'moi' || book === 'hoc' || book === 'tth') && imp ? list.find(e => e.book === book && sameName(e.name, n)) : taken(n); // a Book One sergeant carried into Book Three keeps their own Book One save
      if (t && b.dataset.arm !== n.toLowerCase()) { b.dataset.arm = n.toLowerCase(); b.classList.add('warn'); b.classList.remove('primary'); b.textContent = `Start Sergeant ${t.name} over`; msg(tapWord(`Sergeant ${t.name} already has a save here. Tap again to start over; that save is erased. Or go back and pick them to carry on.`)); return; }
      if (book === 'dg') { S = newStateDG(n, imp); S.diff = diff; save(); return startChapter(1); }
      if (book === 'moi') { S = newStateMOI(n, imp, imp ? (t ? t.id : newSid()) : undefined); S.diff = diff; save(); return startChapter(1); }
      if (book === 'hoc') { S = newStateHOC(n, imp, imp ? (t ? t.id : newSid()) : undefined); S.diff = diff; save(); return startChapter(1); }
      if (book === 'mt') { S = newStateMT(n); S.diff = diff; save(); return startChapter(1); } // v8.0: a new cast, nothing carried in (80)
      if (book === 'tth') { S = newStateTTH(n, imp, t ? t.id : undefined); S.diff = diff; save(); return startChapter(1); } // v11.0: the Fourth again (140)
      S = newState(n); S.diff = diff; save(); showIntro(); };
    let diff = 'soldier', book = tb;
    const disarm = () => { if (b.dataset.arm) { delete b.dataset.arm; b.classList.remove('warn'); b.classList.add('primary'); msg(''); } b.textContent = label(); };
    document.querySelectorAll('.bseg [data-book]').forEach(x => x.onclick = () => { AUDIO.play('click'); book = x.dataset.book; document.querySelectorAll('.bseg [data-book]').forEach(y => y.classList.toggle('on', y === x));
      $('#bBlurb').textContent = BOOKS[book].blurb; titleDress(book); const f = $('#impField'); f.hidden = !impShow(book); f.innerHTML = impInner(book); const f2 = $('#impField2'); if (f2) { f2.hidden = book !== 'bh' && book !== 'rg' && book !== 'dod' && book !== 'tcg'; f2.innerHTML = impInner2(book); } bindImp();
      $('#bookRows').innerHTML = bookRows(book); bindLoads($('#bookRows')); bindDels($('#bookRows'), () => book); $('#nmLab').textContent = list.some(e => onShelf(e, book)) ? 'Or a new sergeant’s name' : 'Your sergeant’s name'; if (book === 'bh') $('#nmLab').textContent = 'The Third’s sergeant (with the Fourteenth)'; if (book === 'rg') $('#nmLab').textContent = 'The Third’s sergeant (lent to the marines)'; if (book === 'dod') $('#nmLab').textContent = 'The Third’s sergeant (with the heavies)'; if (book === 'tcg') $('#nmLab').textContent = 'The Third’s sergeant (with the heavies)'; disarm(); });
    document.querySelectorAll('[data-diff]').forEach(x => x.onclick = () => { AUDIO.play('click'); diff = x.dataset.diff; document.querySelectorAll('[data-diff]').forEach(y => y.classList.toggle('on', y === x)); $('#dBlurb').textContent = `${DIFFS[diff].blurb} You can change it later in Settings.`; });
    nm.oninput = () => disarm();
    nm.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); b.click(); } };
    /* picking a sergeant to carry over fills in their name; it stays editable (David, Nov 9, 2026: change the name when carrying it over) */
    const lockName = on => { nm.readOnly = false; nm.classList.remove('locked'); if (on) { nm.value = on; nm.oninput(); } };
    function bindImp(){ lockName(false); const sel = $('#impSel'); if (!sel) return;
      sel.onchange = () => { const v = sel.value;
        if (book === 'moi' || book === 'hoc') { $('#impDesc').innerHTML = book === 'hoc' ? (typeof b4ImpDesc === 'function' ? b4ImpDesc(v) : '') : typeof b3ImpDesc === 'function' ? b3ImpDesc(v) : ''; const o = v && loadSlot(v); lockName(o ? String(o.name || 'Hask').slice(0, 18) : false); }
        else if (book === 'tcg' && typeof b10ImpName === 'function') { $('#impDesc').innerHTML = `${b10ImpDesc(v, 't')}${v ? '' : ' Only a finished Book Nine whose Third went on (the adjunct or south road).'}`; const nmv = v && b10ImpName(v, 't'); lockName(nmv ? nmv.slice(0, 18) : false); }
        else if (book === 'dod' && typeof b9ImpName === 'function') { $('#impDesc').innerHTML = `${b9ImpDesc(v, 't')}${v ? '' : ' Only a finished Book Seven whose Third stayed with the army (the adjunct road).'}`; const nmv = v && b9ImpName(v, 't'); lockName(nmv ? nmv.slice(0, 18) : false); }
        else if (book === 'bh' || book === 'rg') { const o = v && loadSlot(v); lockName(o ? String(o.name || 'Hask').slice(0, 18) : false); }
        else if (book === 'tth' && typeof b8ImpName === 'function') { $('#impDesc').innerHTML = `${b8ImpDesc(v)}${v ? '' : ' Only a finished Book Three on the daru or stand-down road, or a finished Book Six (any of the Fourth\'s roads).'}`; const nmv = v && b8ImpName(v); lockName(nmv ? nmv.slice(0, 18) : false); }
        else $('#impDesc').innerHTML = v ? impDesc(v) : 'A fresh start: the Fourth is only a rumour here.'; };
      const s2 = $('#impSel2'), n2 = $('#nm2'); if (s2 && n2) s2.onchange = () => { const o = s2.value && loadSlot(s2.value); n2.readOnly = false; n2.classList.remove('locked');
        if (book === 'tcg' && typeof b10ImpName === 'function') { const nmv = s2.value && b10ImpName(s2.value, 'l'); if (nmv) n2.value = nmv.slice(0, 18); if ($('#impDesc2')) $('#impDesc2').innerHTML = `${b10ImpDesc(s2.value, 'l')}${s2.value ? '' : ' Only a finished Book Nine whose Letherii went on (the escort or adjunct road).'}`; return; } // v13.0
        if (book === 'dod' && typeof b9ImpName === 'function') { const nmv = s2.value && b9ImpName(s2.value, 'l'); if (nmv) n2.value = nmv.slice(0, 18); if ($('#impDesc2')) $('#impDesc2').innerHTML = `${b9ImpDesc(s2.value, 'l')}${s2.value ? '' : ' Only a finished Book Seven whose Letherii stayed in the army (the army road).'}`; return; } // v12.0: the Letherii's own sergeant, from o.th.l
        if (o) n2.value = String(o.name || 'Brann').slice(0, 18); };
      const s3 = $('#impSel3'); if (s3) s3.onchange = () => { if ($('#impDesc3') && typeof b10ImpDesc === 'function') $('#impDesc3').innerHTML = `${b10ImpDesc(s3.value, 'f')}${s3.value ? '' : ' Only a finished Book Eight on the east road.'}`; }; }
    bindImp(); bindLoads($('#bookRows')); bindDels($('#bookRows'), () => book); if (book === 'bh') $('#nmLab').textContent = 'The Third’s sergeant (with the Fourteenth)'; if (book === 'rg') $('#nmLab').textContent = 'The Third’s sergeant (lent to the marines)'; if (book === 'dod') $('#nmLab').textContent = 'The Third’s sergeant (with the heavies)'; if (book === 'tcg') $('#nmLab').textContent = 'The Third’s sergeant (with the heavies)';
    $('#bBack').onclick = () => { AUDIO.play('click'); showTitle(); };
    if (fresh && !want) nm.focus();
  } else {
    if ($('#bDeeds')) $('#bDeeds').onclick = () => { AUDIO.play('click'); openModal('deeds'); };
    // a cover opens its book's page; pointing at one shows that book behind the title
    document.querySelectorAll('[data-shelf]').forEach(el => { el.onclick = () => { AUDIO.play('click'); showTitle(false, el.dataset.shelf); };
      el.onpointerenter = el.onfocus = () => titleDress(el.dataset.shelf); });
    const sh = $('.shelf'); if (sh) sh.onpointerleave = () => titleDress(tb);
    bindLoads(document); bindDels(document, () => null);
  }
  maybeNotes(list.length > 0); offerInstall();
  /* erasing a sergeant (v8.0.3, David, Oct 29: make it harder): press and hold the × for two seconds; the row fills as you hold, letting go
     keeps them, and a plain tap only says how. On a book page the page comes back afterwards. */
  function bindDels(root, back){ root.querySelectorAll('.sgtrow .del').forEach(el => { const row = el.parentNode, ld = row.querySelector('.load'), e = list.find(x => x.id === el.dataset.id); if (!e) return;
      const HOLD = 2000, was = ld.innerHTML; let tm = null, t0 = 0, raf = 0, hintT = null;
      const face = (k, html) => { el.classList.toggle('warn', k); ld.classList.toggle('warn', k); ld.disabled = k; ld.innerHTML = html || was; if (!k) ld.style.removeProperty('--hold'); };
      const start = ev => { if (ev && ev.preventDefault) ev.preventDefault(); if (tm) return; clearTimeout(hintT); try { if (ev && ev.pointerId != null) el.setPointerCapture(ev.pointerId); } catch (_) {} AUDIO.play('click'); t0 = performance.now(); el.classList.add('holding');
        face(true, `<b>Keep holding to erase ${esc(e.name)}</b><small>Let go to keep them. Their save on this device goes for good; a save code brings them back.</small>`);
        const step = () => { const k = Math.min(1, (performance.now() - t0) / HOLD); ld.style.setProperty('--hold', k.toFixed(3)); if (k < 1 && tm) raf = requestAnimationFrame(step); }; tm = setTimeout(() => { tm = null; cancelAnimationFrame(raf);
          dropSlot(e.id); const b = back(); return b ? showTitle(false, b) : showTitle(); }, HOLD); step(); };
      const stop = () => { if (!tm) return; clearTimeout(tm); tm = null; cancelAnimationFrame(raf); el.classList.remove('holding'); ld.style.removeProperty('--hold');
        face(true, `<b>Hold × two seconds to erase ${esc(e.name)}</b><small>A tap keeps them. Their save on this device goes for good once erased.</small>`);
        hintT = setTimeout(() => { if (el.isConnected && !tm) face(false); }, 3000); };
      el.onpointerdown = start; el.onpointerup = el.onpointerleave = el.onpointercancel = stop; el.oncontextmenu = ev => ev.preventDefault(); el.onclick = ev => ev.preventDefault();
      el.onkeydown = ev => { if ((ev.key === 'Enter' || ev.key === ' ') && !ev.repeat) start(ev); }; el.onkeyup = ev => { if (ev.key === 'Enter' || ev.key === ' ') stop(); }; el.onblur = stop; }); }
}
function showIntro(){
  view = 'intro'; S.scene = 'intro'; save(); titleAnim = null; AUDIO.setScene('explore');
  toTop(); $('#app').innerHTML = `<header class="hud"><div><div class="loc">The Pale</div><div class="sub">Genabackis · three days after</div></div><div class="hudr">${hudButtons()}</div></header>
  ${artPlate(0, 'The Second Army lies in pits on the hillside. The squads do not talk about whose sorcery fell on whom.')}
  <div class="narr">
    <p>Three days ago the Moon's Spawn drifted away from the Pale, leaving behind a city that had surrendered and an army that hadn't survived the surrender. What's left of the Second Army lies in pits on the hillside. The cadre of mages is down to a handful. Onearm's Host holds the ruins, counts its dead, and doesn't talk about whose sorcery fell on whom.</p>
    <p>You are Sergeant ${esc(S.name)}, Fourth Squad, Seventh Company marines. Your squad came through the siege with all five of you still breathing, which in this army makes you either lucky or suspicious.</p>
    <p>This morning a runner found you with a message from the cadre. It said: <em>my tent, now.</em></p>
  </div>
  <div class="row"><button class="btn primary" id="bGo">Answer the summons</button><button class="btn" id="bSq">Meet the squad</button></div>`;
  G.sceneKind = 'camp';
  $('#bGo').onclick = () => { AUDIO.play('click'); $('#bGo').disabled = true; talk('intro_tat'); };
  $('#bSq').onclick = () => { AUDIO.play('click'); openChars(0); };
  bindHud();
}
function drawCamp(cv, t, night){ // intro backdrop: the pits and the camp under a bruised sky
  const {ctx, W, H} = sceneFit(cv);
  const sky = ctx.createLinearGradient(0,0,0,H); sky.addColorStop(0, night ? '#04040a' : '#08070b'); sky.addColorStop(.6, night ? '#0e0b12' : '#1c1414'); sky.addColorStop(1,'#0a0807'); ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);
  if (night) { ctx.fillStyle = 'rgba(220,220,240,.5)'; for (let i=0;i<40;i++) ctx.fillRect(hash(i,21)*W, hash(i,22)*H*.5, 1, 1); glow(ctx, W*.2, H*.25, W*.25, '#9a86e0', .08 + Math.sin(t/900)*.03); }
  glow(ctx, W*.8, H*.62, W*.5, '#e8923a', (night ? .3 : .22) + Math.sin(t/140)*.03);
  ctx.fillStyle = '#0b0908'; ctx.fillRect(0, H*.62, W, H);
  for (let i=0;i<7;i++){ const x = W*.08 + i*W*.12, y = H*.66 + hash(i,2)*H*.2; ell(ctx, x, y, 30, 8, '#060504'); ctx.fillStyle = 'rgba(200,190,170,.35)'; for (let j=0;j<4;j++) ctx.fillRect(x - 20 + hash(i,j)*40, y - 3 + hash(j,i)*5, 2, 2); }
  for (let i=0;i<4;i++){ const x = W*.6 + i*W*.1, y = H*.6; poly(ctx, [[x-24,y+12],[x,y-24],[x+24,y+12]], i%2 ? '#2a2016' : '#3a2c1c'); poly(ctx, [[x,y-24],[x+24,y+12],[x+8,y+12]], '#1a1410'); }
  const fl = .8 + Math.sin(t/120)*.15; ell(ctx, W*.75, H*.7, 6*fl, 3, '#ffb060'); glow(ctx, W*.75, H*.7, 40, '#ffb060', .4*fl);
  if (night && S && S.f && S.f.c1_hounds && S.chapter === 1) for (let i=0;i<3;i++){ // after the Hounds: the cadre row still burning, over on the left
    const x = W*(.2 + i*.13), f2 = .7 + Math.sin(t/(90 + i*17) + i)*.3; glow(ctx, x, H*.58, W*.14, '#ff7a2a', .32*f2);
    poly(ctx, [[x - W*.03, H*.62],[x - W*.008 + Math.sin(t/80 + i)*3, H*.5 - H*.06*f2],[x + W*.03, H*.62]], 'rgba(255,150,60,.72)'); poly(ctx, [[x - W*.015, H*.62],[x + Math.sin(t/70 + i)*2, H*.55 - H*.03*f2],[x + W*.015, H*.62]], 'rgba(255,220,140,.8)'); }
  // the gravedigger back at his pits, then the squad walking in to the lamplight: the rest behind, Brisk, and the sergeant in the lead
  if (!S || !S.chapter) drawFigure(ctx, 'garrow', W*.07, H*.72, 1.7, t, {still:true});
  const col = marchOrder(sceneSquad()), n = col.length, x0 = W*.66, st = Math.min(42, (x0 - 34)/Math.max(1, n - 1));
  col.forEach((id, i) => { const back = n - 1 - i; drawFigure(ctx, id, x0 - back*st, H*.86 - (back ? 2 + (back % 2)*2 : 0), 2.4, t, {phase:i}); });
  ctx.fillStyle = 'rgba(200,190,175,.3)'; for (let i=0;i<30;i++) ctx.fillRect(hash(i,9)*W + Math.sin(t/1400 + i)*5, (hash(i,10)*H + t*.03) % H, 1.5, 1.5);
  const v = ctx.createRadialGradient(W/2, H/2, H*.3, W/2, H/2, W*.7); v.addColorStop(0,'rgba(0,0,0,0)'); v.addColorStop(1,'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0,0,W,H);
}

