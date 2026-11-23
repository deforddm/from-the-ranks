/* ============ v13.64 the move to playfromtheranks.com (David, Nov 22, 2026: "I think we are ready to move then") ============
   Saves are this browser's storage for one address, so they do not follow the game to a new one by themselves. This carries them:
   on the OLD address the title shows a notice with one button; it opens the NEW address in a tab and hands the backup (every
   sergeant, the settings) across by postMessage, each side checking the other's origin. The new address merges what arrives and
   never lets an older copy replace a sergeant who is further along there. Where the browser will not let the two talk (an installed
   app on some phones opens the tab with no way back), the notice falls back to the backup file, which the new address loads.
   MOVE.on is the switch: turned on in v13.65.0 (David tried it on his phone with ?move=1, Nov 23, 2026: "The transfer worked with the notice"). window.FTR_MOVE overrides for tests. */
const MOVE = {on:true, to:'https://playfromtheranks.com/', from:['https://deforddm.github.io']};
const MOVEDKEY = 'from-the-ranks-moved'; // on the old address: {at, n} once a carry was acknowledged
const moveTry = (() => { try { return /[?&]move=1(&|$)/.test(location.search); } catch(e) { return false; } })(); // ?move=1 on the old address shows the notice for that visit only, to try it before it is switched on for everyone
const moveCfg = () => Object.assign({}, MOVE, moveTry ? {on:true} : {}, (typeof window !== 'undefined' && window.FTR_MOVE) || {});
const moveOrigin = u => { try { return new URL(u).origin; } catch(e) { return ''; } };
const moveIsOld = () => { const c = moveCfg(); return !!c.on && c.from.includes(location.origin); };
const moveHost = () => { try { return new URL(moveCfg().to).host; } catch(e) { return 'the new address'; } };
function moveMark(){ let m = null; try { m = JSON.parse(localStorage.getItem(MOVEDKEY)); } catch(e) {} return m && m.at ? m : null; }
/* how far along a save is, for "never replace the further one": finished chapters first, then the chapter, then the level */
const moveFar = s => (s && s.chapters ? Object.keys(s.chapters).length : 0) * 10000 + ((s && s.chapter) || 0) * 100 + ((s && s.lvl) || 1);
/* the new address takes a backup: sergeants not here yet come in; one already here is replaced only by a copy further along */
function moveTake(text){ const b = parseBackup(text); if (!b) return null; const list = roster().list; let kept = 0;
  const take = b.sergeants.filter(s => { const ex = list.find(e => sameName(e.name, s.name)); if (!ex) return true;
    const here = loadSlot(ex.id); if (here && (here.book || 'gotm') === (s.book || 'gotm') && moveFar(s) > moveFar(here)) return true; kept++; return false; });
  const had = list.length; const n = restoreBackup({sergeants:take, settings:had ? null : b.settings, seen:b.seen, at:b.at}); // a device with sergeants already keeps its own settings
  return {n, kept}; }
let moveNote = '', moveWin = null, moveTimer = null, moveDone = false;
function moveSay(html){ const el = document.getElementById('mvMsg'); if (el) el.innerHTML = html; }
function moveFallback(why){ moveSay(`${why} Save a backup file here, then open <a href="${moveCfg().to}" rel="noopener">${moveHost()}</a> and choose <b>Load a backup or save code</b>. <button class="btn sm" id="mvDown">Save a backup file</button>`);
  const d = document.getElementById('mvDown'); if (d) d.onclick = () => { AUDIO.play('click'); downloadBackup(); }; }
function moveCarry(){ const c = moveCfg(), n = roster().list.length;
  if (!n) { location.href = c.to; return; }
  if (S) save();
  try { moveWin = window.open(c.to + '#carry', '_blank'); } catch(e) { moveWin = null; }
  if (!moveWin) { moveFallback('The browser would not open the new address from here.'); return; }
  moveSay('Opening the new address and handing your sergeants over…');
  moveDone = false; clearTimeout(moveTimer); moveTimer = setTimeout(() => { if (!moveDone) moveFallback('The two addresses could not reach each other.'); }, 12000); }
function moveLineHTML(){ const c = moveCfg(), n = roster().list.length, m = moveMark(), host = moveHost();
  if (moveIsOld()) return `<div class="bkline due mvline" role="status"><span class="fine" id="mvMsg">${m
      ? `Your sergeants were carried to <b>${host}</b> ${agoText(m.at) || 'today'}. Play there from now on: this address will close.`
      : n ? `From the Ranks has moved to <b>${host}</b>. Saves stay with an address, so carry your sergeant${n === 1 ? '' : 's'} across before this address closes.`
          : `From the Ranks has moved to <b>${host}</b>. This address will close.`}</span><button class="btn sm" id="mvGo">${m || !n ? 'Go there' : `Carry ${n === 1 ? 'my sergeant' : 'my sergeants'} across`}</button>${m && n ? '<button class="btn sm" id="mvAgain">Carry again</button>' : ''}</div>`;
  if (moveNote) { const t = moveNote; moveNote = ''; return `<div class="bkline mvline" role="status"><span class="fine">${t}</span></div>`; }
  return ''; }
function moveMount(){ if (typeof document === 'undefined') return; const old = document.querySelector('.mvline'); if (old) old.remove();
  const h = moveLineHTML(); if (!h) return; const tag = document.querySelector('#app #tTag'), at = document.querySelector('#app .bkline') || document.querySelector('#app .tbtns');
  if (tag) tag.insertAdjacentHTML('afterend', h); else if (at) at.insertAdjacentHTML('beforebegin', h); else return; // under the title's own lines, above the sergeants and the covers
  const go = document.getElementById('mvGo'), again = document.getElementById('mvAgain');
  if (go) go.onclick = () => { AUDIO.play('click'); if (moveMark() || !roster().list.length) location.href = moveCfg().to; else moveCarry(); };
  if (again) again.onclick = () => { AUDIO.play('click'); moveCarry(); }; }
/* both ends listen. Old: 'ready' from the tab it opened -> send the backup; 'carried' -> mark it. New: 'carry' from an old origin -> take it. */
if (typeof window !== 'undefined') {
  window.addEventListener('message', ev => { const d = ev.data, c = moveCfg(); if (!d || typeof d !== 'object' || !d.ftrMove) return;
    if (moveIsOld()) { if (ev.origin !== moveOrigin(c.to) || !moveWin || ev.source !== moveWin) return;
      if (d.ftrMove === 'ready') { try { moveWin.postMessage({ftrMove:'carry', text:backupText()}, moveOrigin(c.to)); } catch(e) { moveFallback('The hand-over failed.'); } }
      else if (d.ftrMove === 'carried') { moveDone = true; clearTimeout(moveTimer); try { localStorage.setItem(MOVEDKEY, JSON.stringify({at:Date.now(), n:d.n | 0})); } catch(e) {}
        moveMount(); }
      return; }
    if (d.ftrMove === 'carry' && c.from.includes(ev.origin) && typeof d.text === 'string' && d.text.length < 2e7) { const r = moveTake(d.text);
      if (!r) return; try { ev.source.postMessage({ftrMove:'carried', n:r.n, kept:r.kept}, ev.origin); } catch(e) {}
      moveNote = r.n ? `${r.n === 1 ? 'One sergeant' : rdUpT(r.n) + ' sergeants'} carried across from the old address${r.kept ? `; ${r.kept === 1 ? 'one' : rdUpT(r.kept).toLowerCase()} already here ${r.kept === 1 ? 'was' : 'were'} further along and left alone` : ''}. Play here from now on.`
        : `Nothing new to carry: your sergeant${r.kept === 1 ? ' is' : 's are'} already here.`;
      try { history.replaceState(null, '', location.pathname + location.search); } catch(e) {}
      if (!S && typeof showTitle === 'function') showTitle(); } });
  /* the new address, opened by the old one's button: say so until the backup arrives (the opener may still be wiring its listener) */
  window.addEventListener('load', () => { if (location.hash !== '#carry' || !window.opener || moveIsOld()) return; const c = moveCfg(); let k = 0;
    const ping = () => { if (location.hash !== '#carry' || k++ > 24) return; for (const o of c.from) { try { window.opener.postMessage({ftrMove:'ready'}, o); } catch(e) {} } setTimeout(ping, 400); }; ping(); });
}
/* the title carries the notice: showTitle is wrapped once, after every book's own title code has loaded */
{ const _showTitle = showTitle; showTitle = function(){ const r = _showTitle.apply(this, arguments); try { moveMount(); } catch(e) {} return r; }; }
