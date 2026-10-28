/* ============ hud ============ */
/* v7.3.3 (David, Oct 27: the roster was buried under Squad > Pack > Roster): a Roster button on the map, beside Whole map, whenever there
   is a choice to make (someone waiting at camp, or a recruit or spare walking who could go to camp), with the number waiting.
   (In the header it squeezed the place name onto four lines on a phone.) Also a Roster tab on every squad sheet (33). */
const rosterHud = () => { if (typeof rosterCampList !== 'function' || !S || !S.squad || (typeof view !== 'undefined' && view === 'battle')) return '';
  const n = rosterCampList().length; if (!n && !S.squad.some(id => rosterBenchable(id))) return '';
  return `<button class="btn mini" id="bRoster" aria-label="Roster${n ? `: ${n} waiting at camp` : ''}">Roster${n ? ` <span class="rbadge">${n}</span>` : ''}</button>`; };
function rosterBtnSync(){ const row = document.querySelector('#app .maprow'), old = $('#bRoster'); if (old) old.remove(); if (!row) return;
  const h = rosterHud(); if (!h) return; const mb = $('#bMap'); if (mb) mb.insertAdjacentHTML('beforebegin', h); else row.insertAdjacentHTML('beforeend', h);
  $('#bRoster').onclick = () => { AUDIO.play('click'); openRoster(null); }; }
function hudButtons(){ return `<button class="btn" id="bSquad">Squad</button>${fullBtn('bFull')}<button class="btn icon" id="bSet" aria-label="Settings">${GEAR}</button>`; }
function bindHud(){ const a = $('#bSquad'), b = $('#bSet'), f = $('#bFull'); if (a) a.onclick = () => { AUDIO.play('click'); openChars(0); }; if (b) b.onclick = () => { AUDIO.play('click'); openSettings(); }; if (f) f.onclick = () => { AUDIO.play('click'); toggleFull(); }; }
/* every full screen button shows which way it goes; and the page's size changed, so the map fits itself again (the resize event does that) */
const fullSync = () => document.querySelectorAll('[data-full]').forEach(b => { const on = isFull(); b.innerHTML = on ? FULL_OUT : FULL_IN; b.setAttribute('aria-label', on ? 'Leave full screen' : 'Full screen'); b.title = (on ? 'Leave full screen' : 'Full screen') + ' (F)'; });
document.addEventListener('fullscreenchange', fullSync); document.addEventListener('webkitfullscreenchange', fullSync);
/* Settings > Full screen on: the first click or key of the visit goes full screen (F is left to its own toggle) */
let fullTried = false;
['pointerdown', 'keydown'].forEach(ev => window.addEventListener(ev, e => { if (fullTried || !SET.full || !fullOK() || isFull()) return;
  if (ev === 'keydown' && (e.key === 'Escape' || /^f$/i.test(e.key) || e.ctrlKey || e.metaKey || e.altKey)) return; if (ev === 'pointerdown' && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
  fullTried = true; toggleFull(true); }, {capture:true}));

