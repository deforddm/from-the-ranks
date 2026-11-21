/* ============ the Deeds page, the count, the route map, chapter replays, and a controller ============ */

/* ---- the count: what a sergeant's road added up to (S.stats, kept as they play) ---- */
function statsRows(s){
  const st = (s && s.stats) || {}, n = k => st[k] || 0, thrown = ['sharper', 'burner', 'cusser', 'smoker'].map(k => [k, n('thrown_' + k)]).filter(([, v]) => v);
  return [['Fights won', n('won')], ['Fights retried', n('retries')], ['Foes put down', n('kills')], ['Critical hits', n('crits')],
    ['Damage dealt', n('dealt')], ['Damage taken', n('taken')], ['Health mended', n('healed')],
    ['Checks passed', `${n('checksOk')} of ${n('checksOk') + n('checksFail')}`], ['Silver earned', n('silverIn')], ['Silver spent', n('silverOut')],
    ['Munitions thrown', thrown.length ? thrown.map(([k, v]) => `${v} ${k}${v === 1 ? '' : 's'}`).join(', ') : 'none'], ['Salves used', n('thrown_salve')],
    ['Tricks learned', Math.max(n('tricks'), Object.keys((s && s.tricks) || {}).length)], ['Tricks used', n('tricksUsed')], ["The gods' answers", n('godsAnswered')], ['Visions seen', ((s && s.seenVisions) || []).length], ['Paces walked', n('steps')]];
}
const statsHTML = s => `<div class="kv stats">${statsRows(s).map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`;

/* ---- every sergeant on this device, loaded (the Deeds page reads across all of them) ---- */
const allSergeants = () => roster().list.map(e => ({e, s:e.id === (S && S.sid) ? S : loadSlot(e.id)})).filter(x => x.s);

/* ---- the route: the Fourth's road across Genabackis, drawn as far as the sergeant has come ---- */
const ROUTE = [ // chapter -> where on the map (0..1), what to call it, where its name sits (a: 'l' left of the mark, 'c' above it, else right; dy nudges it down), and the road walked to reach it (via)
  {x:.36, y:.12, t:'Pale', a:'l'}, {x:.4, y:.18, t:'The camp at Pale', a:'l', dy:8}, {x:.6, y:.34, t:'The Rhivi Plain'},
  {x:.5, y:.78, t:'Darujhistan', a:'l', via:[[.76, .36], [.82, .46], [.76, .58], [.64, .68]]}, {x:.44, y:.9, t:'The Daru roofs', a:'l', dy:8},
  {x:.76, y:.58, t:'Gadrobi Hills', a:'l', via:[[.64, .68]]}, {x:.54, y:.88, t:'The Fete', dy:10, via:[[.64, .68]]}, {x:.7, y:.63, t:'The quorl hill', dy:16, via:[[.64, .68]]}];
function drawRoute(cv, s, t){} // the road maps are the atlas now (989c_atlas.js: drawRoute = atlasRoute); the first drawing was removed in v13.62.0
let routeAnim = null;

/* ---- the Deeds page: the road's endings found on this device, the tables, this sergeant's count, and replays ---- */
function deedsHTML(){
  const all = allSergeants(), deeds = {}; all.forEach(({s}) => Object.entries(s.deeds || {}).forEach(([k, v]) => deeds[k] = (deeds[k] || 0) + v));
  const found = n => { const f = new Set(); all.forEach(({s}) => { if (s.chapters && s.chapters[n] != null) f.add(s.chapters[n]); }); return f; };
  const road = [0, 1, 2, 3, 4, 5, 6, 7].map(n => { const E = CHEND[n] || {}, keys = Object.keys(E), f = found(n);
    return `<li><span>${n === 0 ? 'Prologue' : `Chapter ${CHAPTERS[n] ? CHAPTERS[n].number : n}${CHAPTERS[n] ? ' · ' + CHAPTERS[n].title : ''}`}</span><b>${f.size} of ${keys.length}</b>
      <em>${keys.map(k => f.has(k) ? esc(E[k][0]) : '<i>?</i>').join(' · ')}</em></li>`; }).join('');
  const d = k => deeds[k] || 0, best = Math.max(0, ...all.map(({s}) => (s.f && s.f.c6_masks ? s.f.c6_masks - 1 : 0)));
  const tables = [['Bones', `${d('bonesWon')} won, ${d('bonesLost')} lost${d('bonesShutout') ? `, ${d('bonesShutout')} before the other side scored` : ''}`],
    ['Kruppe\'s cups', `${d('cupsWon')} rounds won${d('cupsCaught') ? `, caught palming ${d('cupsCaught') === 1 ? 'once' : d('cupsCaught') + ' times'}` : ', never caught'}`],
    ['Laying the charges', d('chargesClean') ? 'Every run, first time' : d('chargesLaid') ? 'All three runs laid' : 'Not yet'],
    ['The roof run', d('roofsUnseen') ? `Across unseen${d('roofsUnseen') > 1 ? ` (${d('roofsUnseen')} times)` : ''}` : d('roofSeen') ? `Seen ${d('roofSeen')} time${d('roofSeen') === 1 ? '' : 's'}; never across unseen` : 'Not yet'],
    ['Masks at the Fete', best ? `${best} of 5 named${d('masksAll') ? ', all five at least once' : ''}` : 'Not yet']];
  const done = replayable();
  return `<p class="fine">Across every sergeant on this device.</p>
    <h4 class="jh">The road</h4><div class="route"><canvas id="dRoute"></canvas></div>
    <ol class="deeds-road">${road}</ol>
    <h4 class="jh">At the tables</h4><div class="kv">${tables.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>
    ${S ? `<h4 class="jh">Sergeant ${esc(S.name)}'s count</h4>${statsHTML(S)}` : ''}
    ${S ? `<h4 class="jh">Play a chapter again</h4>${done.length ? `<p class="fine">Any chapter Sergeant ${esc(baseName())} has finished can be played again, to try the other roads. It starts as a new save, ${esc(baseName())} (Ch <i>n</i>), with the squad, the kit and the tricks as they stood when that chapter began; this save stays as it is.</p>
      <div class="row chsel">${done.map(n => `<button class="btn" data-replay="${n}">${replayLabel(n)}</button>`).join('')}</div><p class="fine" id="replayMsg"></p>` : `<p class="fine">Finish a chapter, and it can be played again from here.</p>`}` : ''}`;
}
function bindDeeds(){
  const cv = $('#dRoute'); if (cv && S && S.book && S.book !== 'gotm') cv.parentNode.hidden = true; else if (cv) { routeAnim = t => { if (!cv.isConnected) { routeAnim = null; return; } drawRoute(cv, S || {chapter:0}, t); }; }
  document.querySelectorAll('[data-replay]').forEach(b => b.onclick = () => { const n = +b.dataset.replay, name = replayName(n), msg = $('#replayMsg');
    if (roster().list.some(e => sameName(e.name, name)) && b.dataset.arm !== '1') { document.querySelectorAll('[data-replay]').forEach(x => delete x.dataset.arm); b.dataset.arm = '1'; msg.textContent = tapWord(`Sergeant ${name} already has a save. Tap ${replayLabel(n)} again to start it over.`); return; }
    AUDIO.play('click'); replayChapter(n); });
}
/* the chapters this sergeant has finished (the Prologue is 0), the name a replay's save takes, and its button */
const replayable = () => S && S.chapters ? [0, 1, 2, 3, 4, 5, 6, 7].filter(n => S.chapters[n] != null && (n === 0 || CHAPTERS[n])) : [];
const baseName = () => String(S.name).replace(/ \((Ch \d|Prologue)\)$/, '');
const replayLabel = n => n === 0 ? 'Prologue' : CHAPTERS[n] ? CHAPTERS[n].number : String(n);
const replayName = n => `${baseName().slice(0, 12)} (${n === 0 ? 'Prologue' : 'Ch ' + n})`;
/* the chapter-end page's own replay button: a second tap if that replay save already exists */
function replayFromEnd(b, n){ const name = replayName(n);
  if (roster().list.some(e => sameName(e.name, name)) && b.dataset.arm !== '1') { b.dataset.arm = '1'; b.textContent = tapWord(`Tap again: ${name} starts over`); return; }
  AUDIO.play('click'); replayChapter(n); }
/* a finished sergeant, back at chapter n: the snapshot taken when they started it, or (for saves from before snapshots) the save as it
   finished with everything from chapter n on taken back out: the flags, the endings, the fallen (they stand up again) */
function rebuildAt(base, n){
  const s = JSON.parse(JSON.stringify(base)), later = k => { const m = /^c(\d)_/.exec(k); return m && +m[1] >= n; };
  Object.keys(s.chapters || {}).forEach(k => { if (+k >= n) delete s.chapters[k]; });
  Object.keys(s.f || {}).forEach(k => { if (later(k)) delete s.f[k]; }); Object.keys(s.fxd || {}).forEach(k => { if (later(k)) delete s.fxd[k]; });
  Object.keys(s.dead || {}).forEach(id => { if (s.dead[id].ch >= n) { delete s.dead[id]; if (!s.squad.includes(id)) s.squad.push(id); } });
  delete s.finPage; s.chapter = n; return s;
}
function replayChapter(n){
  if (n === 0) { const base = S, s = newState(replayName(0)); s.diff = base.diff; S = s; save(); $('#modal').hidden = true; return showIntro(); } // the Prologue: a fresh start under the replay's name
  const base = S, snap = base.chsnap && base.chsnap[n], s = snap ? JSON.parse(JSON.stringify(snap)) : rebuildAt(base, n), name = replayName(n);
  s.name = name; delete s.sid; s.sid = sidFor(name); s.chsnap = JSON.parse(JSON.stringify(base.chsnap || {})); s.stats = {}; s.deeds = {};
  S = migrate(s); save(); $('#modal').hidden = true; startChapter(n);
}

/* ============ a controller (the Gamepad API): it drives the game through the same keys the keyboard does ============
   Stick or D-pad: walk on the map, move the target square in a fight, move between buttons elsewhere. A: press (the focused button,
   or talk / the target square / the game's main action). B: back (Esc). X: end the turn (Space). Y: the squad. LB / RB: the choices
   (or the abilities, in a fight). Start: settings. View: the journal. */
const PAD = {on:false, prev:[], held:{}, last:0};
const padKey = key => window.dispatchEvent(new KeyboardEvent('keydown', {key, bubbles:true, cancelable:true}));
function padScope(){ return ['#settings', '#modal', '#chars', '#mg'].map(s => $(s)).find(el => el && !el.hidden) || (!$('#sheet').hidden ? $('#sheet') : $('#app')); }
function padFocus(dir){ const sc = padScope(), bs = [...sc.querySelectorAll('button:not([disabled]), .choice:not([disabled]), [data-g]')].filter(b => b.offsetParent);
  if (!bs.length) return; const i = bs.indexOf(document.activeElement), j = i < 0 ? (dir > 0 ? 0 : bs.length - 1) : clamp(i + dir, 0, bs.length - 1); bs[j].focus(); bs[j].scrollIntoView({block:'nearest'}); }
function padPress(){ const a = document.activeElement; if (a && a !== document.body && (a.tagName === 'BUTTON' || a.classList.contains('choice'))) { a.click(); return; }
  if (!$('#sheet').hidden) { padFocus(1); return; } padKey(view === 'battle' ? 'Enter' : view === 'explore' ? 'e' : ' '); }
function padPoll(){
  const gp = navigator.getGamepads ? [...navigator.getGamepads()].find(g => g && g.connected) : null; if (!gp) { if (PAD.on) { PAD.on = false; document.body.classList.remove('padfocus'); } return; }
  if (!PAD.on) { PAD.on = true; document.body.classList.add('padfocus'); }
  const b = i => !!(gp.buttons[i] && gp.buttons[i].pressed), ax = gp.axes || [], now = performance.now();
  const dir = {up:b(12) || ax[1] < -.5, down:b(13) || ax[1] > .5, left:b(14) || ax[0] < -.5, right:b(15) || ax[0] > .5};
  const prev = PAD.prev, edge = i => b(i) && !prev[i]; PAD.prev = gp.buttons.map(x => x.pressed);
  const menus = ['#settings', '#modal', '#chars'].some(s => !$(s).hidden) || (!$('#sheet').hidden && view !== 'battle') || (mgOpenNow() && !MG.arrows) || ['title', 'intro', 'end', 'finale'].includes(view);
  Object.entries({up:'ArrowUp', down:'ArrowDown', left:'ArrowLeft', right:'ArrowRight'}).forEach(([d, key]) => {
    if (!dir[d]) { delete PAD.held[d]; return; } const h = PAD.held[d]; if (h && now - h < 170) return; PAD.held[d] = h ? now : now + 180; // a first press, then a repeat while held
    if (menus) padFocus(d === 'up' || d === 'left' ? -1 : 1); else padKey(key); });
  if (edge(0)) padPress(); if (edge(1)) padKey('Escape'); if (edge(2)) padKey(' '); if (edge(3)) padKey('c');
  if (edge(4) || edge(5)) { if (view === 'battle' && $('#sheet').hidden && !mgOpenNow()) { const ab = [...document.querySelectorAll('#ubar .abil [data-k]:not([disabled])')]; if (ab.length) { PAD.ab = ((PAD.ab ?? -1) + (edge(5) ? 1 : -1) + ab.length) % ab.length; ab[PAD.ab].click(); } } else padFocus(edge(5) ? 1 : -1); }
  if (edge(9)) padKey('Escape'); if (edge(8)) padKey('j');
}
window.addEventListener('gamepadconnected', () => { PAD.on = true; document.body.classList.add('padfocus'); });
