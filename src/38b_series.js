/* ============ the series: how the books meet, each book's road map, the Deeds page by book, the journal by book,
   and what a finished Book One carries into Book Two ============
   Loads after 38 (Deeds) and 37 (chapter cards) and wraps them. Canon for the bridge (series-canon §e, dg-canon §6, the Malazan Wiki
   pages Deadhouse Gates, Seven Cities and Genabackis, Wikipedia's Deadhouse Gates): Book One ends with the Fete in Darujhistan, the
   Daru new year at winter's end; Deadhouse Gates opens a few months later and runs alongside Memories of Ice (the Host's next year).
   Seven Cities lies west of Genabackis, the Meningalle Ocean on Genabackis' west coast between them; Genabaris in the north of
   Genabackis is the port the Empire's ships use. Never a Burn's Sleep year in game text. Never vouch for the outlawing (series rule 1). */

/* ---- each book's chapters and end lines, whichever book is loaded ---- */
const bookChs = b => (b === BOOK ? CHAPTERS : (BOOKSNAP[b] || {}).ch) || {};
const bookEnds = b => (b === BOOK ? CHEND : (BOOKSNAP[b] || {}).end) || {};
const bookOf = s => (s && s.book) || 'gotm';
const bookDone = s => !!(s && s.chapters && s.chapters[7] != null);

/* ---- where the books meet: a sketch of the two coasts, the sea lane, and the months between ---- */
function worldSVG(){
  return `<svg class="worldmap" viewBox="0 0 640 300" role="img" aria-label="Sketch map: Seven Cities in the west, Genabackis in the east, the Meningalle Ocean between, and the sea lane from Genabaris to Aren">
  <rect width="640" height="300" fill="#1c1610"/>
  <rect width="640" height="300" fill="#16304a" opacity=".35"/>
  <path d="M20 40 C80 20 170 30 230 60 C260 80 270 120 250 160 C240 200 200 240 150 262 C110 280 60 270 34 240 C10 210 8 150 14 100 Z" fill="#3a2e1e" stroke="#7a6640" stroke-width="1.5"/>
  <path d="M420 30 C480 18 560 30 600 60 C628 90 626 150 606 200 C590 240 548 276 500 284 C452 290 420 262 410 220 C398 170 400 110 404 70 Z" fill="#2e3a24" stroke="#6a7a50" stroke-width="1.5"/>
  <text x="130" y="150" text-anchor="middle" font-family="IM Fell English SC, Georgia, serif" font-size="20" fill="#e8d6b0">Seven Cities</text>
  <text x="515" y="150" text-anchor="middle" font-family="IM Fell English SC, Georgia, serif" font-size="20" fill="#d8e0c0">Genabackis</text>
  <text x="330" y="160" text-anchor="middle" font-family="IM Fell English, Georgia, serif" font-style="italic" font-size="15" fill="#8fb0d0">the Meningalle Ocean</text>
  <path d="M440 60 C380 40 300 60 250 110 C220 150 190 200 150 240" fill="none" stroke="#e8c073" stroke-width="1.6" stroke-dasharray="6 5" opacity=".8"/>
  <g font-family="Alegreya Sans SC, sans-serif" font-size="12" fill="#f2dca6">
    <circle cx="440" cy="60" r="4" fill="#e8c073"/><text x="448" y="56">Genabaris</text>
    <circle cx="480" cy="110" r="4" fill="#c9973f"/><text x="488" y="106">Pale</text>
    <circle cx="520" cy="220" r="4" fill="#c9973f"/><text x="460" y="242">Darujhistan · Book One</text>
    <circle cx="232" cy="78" r="4" fill="#c9973f"/><text x="150" y="70">Hissar</text>
    <circle cx="150" cy="240" r="4" fill="#e8c073"/><text x="42" y="268">Aren · Book Two</text>
    <path d="M232 78 C220 120 196 170 150 240" fill="none" stroke="#c94a20" stroke-width="2" opacity=".85"/><text x="200" y="196" fill="#e89a6a" font-size="11">the Chain</text>
  </g>
  <text x="620" y="292" text-anchor="end" font-family="Alegreya Sans, sans-serif" font-style="italic" font-size="10" fill="#a89a82">a sketch, not to scale</text>
  </svg>`;
}
function whereBooksMeetHTML(open){
  return `<details class="gloss meet"${open ? ' open' : ''}><summary>Where the books meet</summary>${worldSVG()}
    <ul class="jl meetl">
      <li><b>Book One, Ashes of the Pale,</b> runs about a month on Genabackis, from the ruins of Pale to the Fete in Darujhistan, the city's new year at winter's end.</li>
      <li><b>Book Two, The Chain of Dogs,</b> begins a few months later and an ocean away. Seven Cities lies west of Genabackis across the Meningalle Ocean, weeks by ship from Genabaris. Hissar burns, and the Chain walks through the hot months that follow.</li>
      <li>While the Chain walks, Onearm's Host, proclaimed outlaw, is on Genabackis with Caladan Brood. The two stories run side by side, and only a little word passes between them.</li>
      <li>Ships out of Genabaris put in at Aren. That is how word crosses, and sometimes people.</li>
    </ul></details>`;
}

/* ---- Book Two's road map: the Chain from Hissar to Aren, as far as the sergeant has come ---- */
const ROUTE_DG = [ // chapter -> where, what to call it, label side (as ROUTE in 38)
  {x:.82, y:.12, t:'Hissar', a:'l'}, {x:.74, y:.22, t:"Bat'rol"}, {x:.64, y:.34, t:'Dryj Spring · the Sekala'}, {x:.56, y:.45, t:'Gelor Ridge', a:'l'},
  {x:.5, y:.55, t:'The Vathar'}, {x:.42, y:.64, t:'The Nenoth', a:'l'}, {x:.34, y:.74, t:'Sanimon · the Geleen'}, {x:.2, y:.88, t:'Aren', a:'l'}];
function drawChainRoute(cv, s, t){
  const dpr = Math.min(2, window.devicePixelRatio || 1), W = cv.clientWidth, H = cv.clientHeight; if (!W) return;
  if (cv.width !== Math.round(W*dpr)) { cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr); }
  const ctx = cv.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0);
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#2e2416'); bg.addColorStop(1, '#1e170e'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 60; i++) ctx.fillRect(hash(i, 13)*W, hash(i, 14)*H, 1 + hash(i, 15)*2, 1);
  ctx.fillStyle = '#16304a'; ctx.beginPath(); ctx.moveTo(W*.9, 0); ctx.lineTo(W, 0); ctx.lineTo(W, H*.4); ctx.quadraticCurveTo(W*.93, H*.22, W*.9, 0); ctx.fill(); // the sea off Hissar
  ctx.beginPath(); ctx.moveTo(0, H*.8); ctx.quadraticCurveTo(W*.14, H*.92, W*.3, H); ctx.lineTo(0, H); ctx.fill(); // Aren Bay
  ctx.fillStyle = 'rgba(106,168,255,.25)'; ctx.font = `italic ${Math.round(Math.max(9, H*.05))}px 'IM Fell English', serif`; ctx.textAlign = 'left'; ctx.fillText('Aren Bay', W*.02, H*.97);
  ctx.strokeStyle = 'rgba(106,168,255,.45)'; ctx.lineWidth = 2; // the Sekala and the Vathar, crossing the road
  [[.56, .26, .74, .44], [.4, .48, .62, .6]].forEach(([x1, y1, x2, y2]) => { ctx.beginPath(); ctx.moveTo(W*x1, H*y1); ctx.quadraticCurveTo(W*(x1 + x2)/2 + 10, H*(y1 + y2)/2 - 6, W*x2, H*y2); ctx.stroke(); });
  for (let i = 0; i < 16; i++) { ctx.fillStyle = 'rgba(200,170,110,.10)'; ctx.fillRect(W*(.2 + hash(i, 16)*.6), H*(.15 + hash(i, 17)*.6), 12, 1); } // the Odhan
  ctx.fillStyle = 'rgba(70,60,40,.35)'; for (let i = 0; i < 7; i++) { const tx = W*(.38 + i*.03), ty = H*(.56 + (i % 2)*.03); ctx.beginPath(); ctx.arc(tx, ty, 4, 0, 7); ctx.fill(); } // Vathar Forest
  const ch = s.chapter || 0, pts = ROUTE_DG.filter((r, n) => n <= ch).map(r => ({x:r.x*W, y:r.y*H}));
  ctx.strokeStyle = 'rgba(232,140,90,.8)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke(); ctx.setLineDash([]);
  ROUTE_DG.forEach((r, n) => { const x = r.x*W, y = r.y*H, on = n <= ch, here = n === ch && !bookDone(s);
    if (!on) { ctx.fillStyle = 'rgba(200,190,170,.18)'; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill(); return; }
    if (here) glow(ctx, x, y, 18, '#e89a6a', .35 + Math.sin(t/300)*.15);
    ctx.fillStyle = here ? '#f0b080' : '#c9773f'; ctx.beginPath(); ctx.arc(x, y, here ? 5 : 3.5, 0, 7); ctx.fill();
    ctx.fillStyle = here ? '#f2dca6' : 'rgba(230,218,194,.7)'; ctx.font = `600 ${Math.round(Math.max(9, Math.min(13, W*.028)))}px 'Alegreya Sans SC', sans-serif`; ctx.textAlign = r.a === 'l' ? 'right' : 'left';
    ctx.fillText(r.t, x + (r.a === 'l' ? -8 : 8), y - 6); });
}
{ const _drawRoute = drawRoute; drawRoute = function(cv, s, t){ return bookOf(s) === 'dg' ? drawChainRoute(cv, s, t) : _drawRoute(cv, s, t); }; }

/* ---- what a finished Book One carries into Book Two: the road, said when it's picked, kept in the journal, heard twice on the Chain ---- */
const ROAD_WORDS = {empire:'took the empire road: home by sea from Genabaris', outlaw:'flew north with the Host', city:'stayed in Darujhistan', disband:'was stood down on a hill outside Darujhistan'};
function impDesc(id){ const o = id && loadSlot(id); if (!o || !o.chapters || o.chapters[7] == null) return 'A fresh start: the Fourth is only a rumour here.';
  const road = o.chapters[7], who = `Sergeant ${esc(o.name)}'s Fourth ${ROAD_WORDS[road] || 'went its own way'}.`;
  return road === 'empire' ? `${who} Word of them reaches the Chain twice, and at Aren one of the Fourth may find you.`
    : `${who} That road never reaches Seven Cities, but word of it does: you'll hear of the Fourth twice on the Chain.`; }
const B2_ECHO = { // chapter -> road -> a paragraph on that chapter's card. Rumour only: nothing here is vouched for.
  2:{ outlaw:`News comes down the column, months stale, off the last ship that made Hissar before it burned: the Empress has proclaimed Onearm's Host outlaw on Genabackis. The veterans argue about it at every fire. Nobody believes it and everybody repeats it. Somebody's cousin is in a marine squad over there, the Fourth, and the story is they flew north with the Moranth.`,
      empire:`News comes down the column, months stale, off the last ship that made Hissar before it burned: Onearm's Host is proclaimed outlaw on Genabackis, and a marine squad of it, the Fourth, walked away and took ship at Genabaris for home. Ships out of Genabaris call at Aren, somebody says, as if Aren were close.`,
      city:`News comes down the column, months stale, off the last ship that made Hissar before it burned: the Host has gone north from Darujhistan, all but one marine squad, the Fourth, which stayed in the city. Deserters, the clerks call it. Bult laughs and says he'd have stayed too, for the beer.`,
      disband:`News comes down the column, months stale, off the last ship that made Hissar before it burned: a marine squad of Onearm's Host, the Fourth, stood itself down on a hill outside Darujhistan and scattered. Bult says there is no form for that. The historian writes it down anyway.`},
  5:{ outlaw:`One of the Trygalle's shareholders, a woman with a scorched glove, says she ran a cargo to Onearm's people not a month gone, and remembers a marine squad called the Fourth because they paid in Moranth chits and didn't haggle.`,
      empire:`One of the Trygalle's shareholders says the Genabaris transports are running again, outlaws or no, and one put out with a marine squad aboard that paid its passage in paper with no seal on it. "Your Fourth," she says, when you ask. "Bound for Aren, last I heard. Like everything."`,
      city:`One of the Trygalle's shareholders drinks at the Phoenix Inn when she is in Darujhistan, and says there is a squad of Malazan marines keeping a door in the city now, the Fourth, and that nobody in Darujhistan minds, which is the strangest thing she has heard all year.`,
      disband:`One of the Trygalle's shareholders heard of the Fourth from a Rhivi trader: a squad stood down on a hill, its people gone every way there is. One went east with the Rhivi, the trader said. One went north. "Nobody went home," she says. "They never do."`}};
const b2Echo = n => { const i = S && S.imported, E = B2_ECHO[n]; return i && E && E[i.road] ? E[i.road] : ''; };
{ const _sci = showChapterIntro; showChapterIntro = function(){ _sci();
    if (!S || bookOf(S) !== 'dg') return;
    const narr = document.querySelector('#app .narr'), card = document.querySelector('#app .chcard');
    if (S.chapter === 1 && card && !card.querySelector('.bridge')) { const p = document.createElement('div'); p.className = 'bridge'; p.textContent = 'Seven Cities · a few months after the Fete in Darujhistan, an ocean west of it'; card.querySelector('.rule').before(p); }
    const e = b2Echo(S.chapter); if (e && narr) { const p = document.createElement('p'); p.className = 'echo'; p.innerHTML = fmt(e).replace(/^<p>|<\/p>$/g, ''); narr.appendChild(p); } }; }

/* ---- the journal, by book: the book's name over the chapter, the Fourth's road in Book Two, and where the books meet ---- */
{ const _jh = journalHead; journalHead = function(){ const B = BOOKS[bookOf(S)] || BOOKS.gotm; return `<p class="jbook">Book ${B.word} · ${esc(B.name || B.title)}</p>` + _jh(); }; }
{ const _jn = journalNotes; journalNotes = function(){ const out = _jn(); const i = S && bookOf(S) === 'dg' && S.imported;
    if (i) out.unshift(`The Fourth's road, from Sergeant ${esc(i.from)}'s Book One: ${ROAD_WORDS[i.road] || 'their own'}.${i.road === 'empire' ? ' Ships out of Genabaris call at Aren.' : ''}`);
    return out; }; }

/* ---- the Deeds page, by book ---- */
function bookDeedsHTML(b, all){
  const B = BOOKS[b], mine = all.filter(({s}) => bookOf(s) === b), CHS = bookChs(b), ENDS = bookEnds(b);
  const done = mine.filter(({s}) => bookDone(s)).length;
  const found = n => { const f = new Set(); mine.forEach(({s}) => { if (s.chapters && s.chapters[n] != null) f.add(s.chapters[n]); }); return f; };
  const rows = (b === 'gotm' ? [0, 1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 6, 7]).filter(n => n === 0 || CHS[n]).map(n => { const E = ENDS[n] || {}, keys = Object.keys(E), f = found(n);
    return `<li><span>${n === 0 ? 'Prologue' : `Chapter ${CHS[n] ? CHS[n].number : n}${CHS[n] ? ' · ' + CHS[n].title : ''}`}</span><b>${f.size} of ${keys.length}</b>
      <em>${keys.map(k => f.has(k) ? esc(E[k][0]) : '<i>?</i>').join(' · ')}</em></li>`; }).join('');
  const deeds = {}; mine.forEach(({s}) => Object.entries(s.deeds || {}).forEach(([k, v]) => deeds[k] = (deeds[k] || 0) + v)); const d = k => deeds[k] || 0;
  let extra = '';
  if (b === 'gotm') { const best = Math.max(0, ...mine.map(({s}) => (s.f && s.f.c6_masks ? s.f.c6_masks - 1 : 0)));
    const tables = [['Bones', `${d('bonesWon')} won, ${d('bonesLost')} lost${d('bonesShutout') ? `, ${d('bonesShutout')} before the other side scored` : ''}`],
      ['Kruppe\'s cups', `${d('cupsWon')} rounds won${d('cupsCaught') ? `, caught palming ${d('cupsCaught') === 1 ? 'once' : d('cupsCaught') + ' times'}` : ', never caught'}`],
      ['Laying the charges', d('chargesClean') ? 'Every run, first time' : d('chargesLaid') ? 'All three runs laid' : 'Not yet'],
      ['The roof run', d('roofsUnseen') ? `Across unseen${d('roofsUnseen') > 1 ? ` (${d('roofsUnseen')} times)` : ''}` : d('roofSeen') ? `Seen ${d('roofSeen')} time${d('roofSeen') === 1 ? '' : 's'}; never across unseen` : 'Not yet'],
      ['Masks at the Fete', best ? `${best} of 5 named${d('masksAll') ? ', all five at least once' : ''}` : 'Not yet']];
    extra = `<h4 class="jh">At the tables</h4><div class="kv">${tables.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }
  else { const fin = mine.filter(({s}) => bookDone(s)), col = fin.map(({s}) => (s.chain && s.chain.column) || 0), stayed = mine.reduce((a, {s}) => a + Object.values((s.f && s.f.b2_split) || {}).filter(v => v === 'stay').length, 0);
    const lowest = mine.length ? Math.min(...mine.map(({s}) => (s.chain && s.chain.water != null) ? s.chain.water : 8)) : null;
    const rows2 = [['Most of the column brought into Aren', fin.length ? Math.max(...col) : 'Not yet'], ['Stayed with Coltaine at the split', stayed ? `${stayed} squadmate${stayed === 1 ? '' : 's'}, across every sergeant` : 'None yet'],
      ['Water, at its lowest now', lowest == null ? '–' : `${lowest} skin${lowest === 1 ? '' : 's'}`], ['Came with the Fourth\'s road', mine.filter(({s}) => s.imported).length || 'None yet']];
    const herd = Math.max(0, ...mine.map(({s}) => (s.f && s.f.b2_herd) || 0)), meas = Math.max(0, ...mine.map(({s}) => ((s.f && s.f.b2_measures) || []).length));
    const fires = [['The Water-Seller\'s Measure', meas ? `${meas} of 3 measured${d('b2MeasurePar') ? `, ${d('b2MeasurePar')} in as few pours as the water-sellers` : ''}` : 'Not yet'],
      ['Hackle\'s herd', d('b2Herd') ? `${herd} of 7 brought in${d('b2HerdAll') ? ', all seven at least once' : ''}` : 'Not yet'],
      ['Ask the Ground', d('b2Ground') ? `It answered${d('b2Ground') > 1 ? ` ${d('b2Ground')} times` : ''}` : d('b2GroundLost') ? 'It went quiet' : 'Not yet'],
      ['The Trygalle haggle', d('b2HaggleSaved') ? `${d('b2HaggleSaved')} skin${d('b2HaggleSaved') === 1 ? '' : 's'} saved` : d('b2HaggleLost') ? 'She said no' : 'Not yet'],
      ['Khundryl knucklebones', d('b2JacksWon') || d('b2JacksLost') ? `${d('b2JacksWon')} won, ${d('b2JacksLost')} lost` : 'Not yet']];
    extra = `<h4 class="jh">The Chain</h4><div class="kv">${rows2.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div><h4 class="jh">At the fires</h4><div class="kv">${fires.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }
  const open = (S ? bookOf(S) : BOOK) === b;
  return `<details class="gloss bookdeeds"${open ? ' open' : ''}><summary>Book ${B.word} · ${esc(B.name || B.title)} <small>${mine.length} sergeant${mine.length === 1 ? '' : 's'}${done ? `, ${done} finished` : ''}</small></summary>
    <div class="route"><canvas data-route="${b}"></canvas></div><ol class="deeds-road">${rows}</ol>${extra}</details>`;
}
function fallenHTML(all){
  const rows = []; all.forEach(({e, s}) => Object.entries(s.dead || {}).forEach(([id, dd]) => { const t = TPL[id]; if (!t) return;
    rows.push(`<li><b>${esc(t.name)}</b> <span>${esc(dd.where || (dd.ch ? `Chapter ${dd.ch}` : ''))}</span> <em>Sergeant ${esc(e.name)}'s squad, Book ${(BOOKS[bookOf(s)] || BOOKS.gotm).word}</em></li>`); }));
  return rows.length ? `<h4 class="jh">The fallen</h4><ul class="jl fallen">${rows.join('')}</ul>` : ''; }
deedsHTML = function(){
  const all = allSergeants(), books = Object.keys(BOOKS), done = all.filter(({s}) => bookDone(s)).length;
  const sum = k => all.reduce((a, {s}) => a + (((s.stats || {})[k]) || 0), 0);
  const series = [['Sergeants', all.length], ['Books finished', done], ['Fights won', sum('won')], ['Foes put down', sum('kills')], ["The gods' answers", sum('godsAnswered')], ['Visions seen', all.reduce((a, {s}) => a + ((s.seenVisions || []).length), 0)]];
  const doneR = replayable();
  return `<p class="fine">Across every sergeant on this device, book by book.</p>
    <h4 class="jh">The series</h4><div class="kv">${series.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>
    ${books.map(b => bookDeedsHTML(b, all)).join('')}
    ${fallenHTML(all)}
    ${S ? `<h4 class="jh">Sergeant ${esc(S.name)}'s count <small>Book ${(BOOKS[bookOf(S)] || BOOKS.gotm).word}</small></h4>${statsHTML(S)}` : ''}
    ${S ? `<h4 class="jh">Play a chapter again</h4>${doneR.length ? `<p class="fine">Any chapter Sergeant ${esc(baseName())} has finished can be played again, to try the other roads. It starts as a new save, ${esc(baseName())} (Ch <i>n</i>), with the squad, the kit and the tricks as they stood when that chapter began; this save stays as it is.</p>
      <div class="row chsel">${doneR.map(n => `<button class="btn" data-replay="${n}">${replayLabel(n)}</button>`).join('')}</div><p class="fine" id="replayMsg"></p>` : `<p class="fine">Finish a chapter, and it can be played again from here.</p>`}` : ''}
    ${whereBooksMeetHTML(false)}`;
};
{ const _bd = bindDeeds; bindDeeds = function(){ _bd();
    const cvs = [...document.querySelectorAll('canvas[data-route]')];
    const farthest = b => { const mine = allSergeants().filter(({s}) => bookOf(s) === b).map(({s}) => s); if (S && bookOf(S) === b) return S;
      return mine.sort((x, y) => (bookDone(y) - bookDone(x)) || ((y.chapter || 0) - (x.chapter || 0)))[0] || {chapter:0, book:b}; };
    routeAnim = t => { const live = cvs.filter(c => c.isConnected); if (!live.length) { routeAnim = null; return; }
      live.forEach(c => { if (c.closest('details') && !c.closest('details').open) return; const s = farthest(c.dataset.route); drawRoute(c, Object.assign({}, s, {book:c.dataset.route}), t); }); }; }; }
