/* ============ the series: how the books meet, each book's road map, the Deeds page by book, the journal by book,
   and what a finished Book One carries into Book Two ============
   Loads after 38 (Deeds) and 37 (chapter cards) and wraps them. Canon for the bridge (series-canon §e, dg-canon §6, the Malazan Wiki
   pages Deadhouse Gates, Seven Cities and Genabackis, Wikipedia's Deadhouse Gates): Book One ends with the Fete in Darujhistan, the
   Daru new year at winter's end; Deadhouse Gates opens a few months later and runs alongside Memories of Ice (the Host's next year).
   Seven Cities lies west of Genabackis, the Meningalle Ocean on Genabackis' west coast between them; Genabaris in the north of
   Genabackis is the port the Empire's ships use. Burn's Sleep years only in timelineHTML, with their notes (v13.19, rule 13 lifted). Never vouch for the outlawing (series rule 1). */

/* ---- each book's chapters and end lines, whichever book is loaded ---- */
const bookChs = b => (b === BOOK ? CHAPTERS : (BOOKSNAP[b] || {}).ch) || {};
const bookEnds = b => (b === BOOK ? CHEND : (BOOKSNAP[b] || {}).end) || {};
const bookOf = s => (s && s.book) || 'gotm';
const bookDone = s => !!(s && s.chapters && s.chapters[7] != null);

/* ---- where the books meet: a sketch of the two coasts, the sea lane, and the months between (Book Four added v7.3.3, David, Oct 27: keep it current with every book) ---- */
/* v13.1.0: a finale's map stops at its own book (Book Nine's finale must not show Book Ten's Glass Desert, rule 85); the Journal shows the whole shelf. */
const MAP_ORDER = ['gotm', 'dg', 'moi', 'hoc', 'mt', 'bh', 'rg', 'tth', 'dod', 'tcg']; let MAP_UPTO = null;
const bookLive = k => !!(BOOKS[k] && !BOOKS[k].coming) && (!MAP_UPTO || MAP_ORDER.indexOf(k) <= MAP_ORDER.indexOf(MAP_UPTO));
function worldSVG(upTo){ const was = MAP_UPTO; MAP_UPTO = upTo || null; try { return worldSVG0(); } finally { MAP_UPTO = was; } }
function worldSVG0(){ return atlasWorldHTML(MAP_UPTO); } // v13.54.0: the plate is drawn by the atlas (989c), in ink on parchment; it still stops at MAP_UPTO
function whereBooksMeetHTML(open){
  return `<details class="gloss meet"${open ? ' open' : ''}><summary>Where the books meet</summary>${worldSVG()}
    <ul class="jl meetl">
      <li><b>Book One, Ashes of the Pale,</b> runs about a month on Genabackis, from the ruins of Pale to the Fete in Darujhistan, the city's new year at winter's end.</li>
      <li><b>Book Two, The Chain of Dogs,</b> begins a few months later and an ocean away. Seven Cities lies west of Genabackis across the Meningalle Ocean, weeks by ship from Genabaris. Hissar burns, and the Chain walks through the hot months that follow.</li>
      <li>While the Chain walks, Onearm's Host, proclaimed outlaw, is on Genabackis with Caladan Brood. The two stories run side by side, and only a little word passes between them.</li>
      <li>Ships out of Genabaris put in at Aren. That is how word crosses, and sometimes people.</li>
      <li><b>Book Three, The Fair Exchange,</b> runs beside Book Two: the spring and summer after the Fete, on Genabackis, while the Chain walks. The Host and Brood's army march together from Pale to Capustan on the Catlin, and on south into the Pannion Domin, to Coral.</li>
      <li><b>Book Four, Unblooded,</b> goes back to Seven Cities, months after the Chain. The Adjunct's new Fourteenth Army lands at Aren, takes in what is left of the Chain's soldiers, and marches north up the Aren Way, past Coltaine's Fall and over the Vathar, to the Whirlwind and Raraku.</li>
      ${BOOKS.mt && !BOOKS.mt.coming ? `<li><b>Book Five, Indebted,</b> goes a long way off: to Lether, across the oceans from both Genabackis and Seven Cities, and years before the Malazans ever hear of it. Its squad is new, Letherii, and owes money to everyone.</li>` : ''}
      ${BOOKS.mt && !BOOKS.mt.coming ? `<li>Book Five stands apart. On the sketch it sits beyond the western edge, across more sea than the sketch can hold: Lether's war is over long before the Malazans ever hear of it, and ${bookLive('rg') ? 'Two books later the Malazans come to it.' : 'no road joins it to the other books yet.'}</li>` : ''}
      ${BOOKS.bh && !BOOKS.bh.coming ? `<li><b>Book Six, Bones in the Walls,</b> brings both squads back, weeks after Raraku. Book Two's squad marches with the Fourteenth across the Odhans to Y'Ghatan and on to the sea; the Fourth, with Onearm's Host, land on Seven Cities' north coast and march inland through the plague to G'danisban. The two never meet. The Fourteenth sails at last for Malaz City, off the map to the south.</li>` : ''}
      ${BOOKS.rg && !BOOKS.rg.coming ? `<li><b>Book Seven, Unwitnessed,</b> is where the roads join. The Fourteenth crosses the oceans to Lether, burns its ships on the coast and marches inland on Letheras; the Third goes with it, lent to Keneb's marines as heavies. Book Five's Letherii squad is in the capital, under the Edur, and is sent out with the army to meet the invaders. One war, two squads, on opposite sides. The Fourth is not with them.</li>` : ''}
      ${BOOKS.tth && !BOOKS.tth.coming ? `<li><b>Book Eight, Time Served,</b> goes back to Genabackis, years after Coral. The Fourth, out of the army, keeps a door in Darujhistan. In the winter before the Gedderone Fete the Assassins' Guild puts their names on a paper, and they go east with a merchant's caravan over the old Domin to Black Coral, Coral renamed, and come back for the Fete's last night.</li>` : ''}
      ${BOOKS.dod && !BOOKS.dod.coming ? `<li><b>Book Nine, Dust on the Boots,</b> goes back to Lether, months after Letheras fell. The Fourteenth, the Bonehunters now, marches east out of the city into the Wastes with a Letherii escort behind it, and nobody in the ranks is told why. Book Seven's two squads march in the same column, the Third with the heavies and the Letherii in the escort, a day's dust apart.</li>` : ''}
      ${BOOKS.tcg && !BOOKS.tcg.coming ? `<li><b>Book Ten, Witnessed,</b> is the last. Days after the short-tails, the army splits at the Wastes' edge: the Bonehunters east into a desert made of glass, by night, behind an Adjunct who still has not said why; the Letherii and the allies south, the long way round. Both roads end in Kolanse. Book Nine's two squads are on them, and at the very end Book Eight's Fourth comes over a ridge with a Malazan Host. After it, nothing: that is where the novels end, too.</li>` : ''}
      ${bookLive('tcg') ? `<li>So the roads run: the Fourth on Genabackis in Books One, Three and Eight, and across the sea to Seven Cities in Book Six; Book Two's squad, the Third, from Hissar to Aren, Raraku, Y'Ghatan, Lether, the Wastes and Kolanse; Book Five's Letherii from their own war into the Malazans', and east with them. The Fourth and the Third meet once, at the very end, on the regulars' line before Kolanse; on the southern road the Letherii are a long march away, holding their own stretch of the feint.</li>` : `<li>So the books cross twice. Books One and Three keep to Genabackis; Books Two and Four keep to Seven Cities. Book Two's squad is Book Four's, and the Fourth come back in Book Three. Ships out of Genabaris still carry the news between them, months late.</li>`}
    </ul></details>`;
}

/* ---- when the books happen: one series timeline by Burn's Sleep year (v13.19.0, David, Nov 15: "help me piece together the puzzle
   of the books, lift both"). Rule 13's ban is lifted (series-canon §(a0)); §(e) holds the sources. Erikson's own years disagree in
   places, so a disputed year is printed only with its note. Each row shows only when its book is live (bookLive, so a finale's
   MAP_UPTO stops it at its own book). Sources per row, in series-canon §(e): W = malazan.fandom.com, Wp = Wikipedia's chronology
   (liquisearch mirror), F = the fan worksheet, MF = the malazanempire.com timeline thread, R = Reactor, RM = the TtH reading guide. */
const BS_ROWS = [
  {b:null, y:'1154', t:'The old Emperor and his companion are gone in a night, and the Empress takes the throne. Every Malazan soldier in these books has served under her since.'}, // W Tayschrenn, Wp (NoK 1154), F: two
  {b:'mt', y:'1161 or 1162', t:'Lether\'s war with the Tiste Edur. The Letherii count it their own way: the Year of the Late Frost, the last before the Seventh Closure.', d:'The reckonings disagree by a year, and one of them files a single chapter under 1159.'}, // Wp 1161; F 1162-3 with one entry 1159; MF 1161-62; Letherii count: novel heads via W1, R1
  {b:'gotm', y:'1163', t:'Pale has fallen before the book opens. About a month, from the ruins to the Fête in Darujhistan, which ends the Daru year.'}, // W Burn's Sleep, Wp, F: two
  {b:'dg', y:'1164', t:'A few months after the Fête. Hissar burns and the Chain walks through the hot months.', d:'Some reckonings start it in 1163: the Daru year turns at the Fête, the Malazan count later.'}, // F (bulk 1164, prologue 1163); Wp 1163-64; §(e) year-boundary note
  {b:'moi', y:'1164', t:'From two months after the Fête, on Genabackis, the same months as the Chain.'}, // W Burn's Sleep, F: two
  {b:'hoc', y:'1164', t:'The Fourteenth lands at Aren after the Chain, and marches on Raraku the same year.', d:'Its opening, far to the north and years earlier, is printed in the novel as 1159; one reckoning argues 1163 for it, and Erikson is quoted for 1159.'}, // F, MF (Books II-IV 1164); printed 1159 and Erikson quote via F
  {b:'bh', y:'1164 to 1165', t:'Weeks after Raraku, through Y\'Ghatan and the plague to the sea.', d:'Its prologue gives the Empress\'s reign a length that her other dates put twelve years later.'}, // Wp 1164-65; F (prologue 1164, 1165); Laseen's 22nd year vs 1176: F
  {b:'rg', y:'1165 into 1166', t:'The Fourteenth crosses to Lether, some three years after Lether\'s war.'}, // Wp c.1165 or 1166; F into 1166: two
  {b:'tth', y:'about 1166, by most reckonings', t:'Years after Coral. No year is printed.', d:'Reckonings run from 1165 to 1168: one guide puts it four or five years after the Fête.'}, // MF 1165-66?; F memory 1166-67; RM 4-5 years after GotM (tth-canon §1): none agree
  {b:'dod', y:'1166', t:'Months after Letheras falls. No year is printed.', d:'"Months" is the novel\'s own word; the year is the reckonings\' guess.'}, // MF post-1166; R DoD ch 5, W (months after RG): supported
  {b:'tcg', y:'1166', t:'Days after Book Nine ends, to Kolanse. Where the novels stop.'}, // follows DoD directly (tcg-canon §1): supported
];
function timelineHTML(open){
  const rows = BS_ROWS.filter(r => !r.b || bookLive(r.b)); if (rows.length < 3) return '';
  const name = b => { const B = BOOKS[b]; return B ? `Book ${B.word}, ${B.name}` : ''; };
  return `<details class="gloss meet"${open ? ' open' : ''}><summary>When the books happen</summary>
    <p class="fine">Years by Burn's Sleep, the Empire's count. The novels do not always agree with themselves. Where they don't, it says so.</p>
    <ul class="jl meetl">${rows.map(r => `<li><b>${r.y}${r.b ? ' · ' + name(r.b) : ''}.</b> ${r.t}${r.d ? ` <i class="fine">${r.d}</i>` : ''}</li>`).join('')}</ul></details>`;
}

/* ---- Book Two's road map: the Chain from Hissar to Aren, as far as the sergeant has come ---- */
const ROUTE_DG = [ // chapter -> where, what to call it, label side (as ROUTE in 38)
  {x:.82, y:.12, t:'Hissar', a:'l'}, {x:.74, y:.22, t:"Bat'rol"}, {x:.64, y:.34, t:'Dryj Spring · the Sekala'}, {x:.56, y:.45, t:'Gelor Ridge', a:'l'},
  {x:.5, y:.55, t:'The Vathar'}, {x:.42, y:.64, t:'The Nenoth', a:'l'}, {x:.34, y:.74, t:'Sanimon · the Geleen'}, {x:.2, y:.88, t:'Aren', a:'l'}];

/* ---- what a finished Book One carries into Book Two: the road, said when it's picked, kept in the journal, heard twice on the Chain ---- */
const ROAD_WORDS = {empire:'took the empire road: home by sea from Genabaris', outlaw:'flew north with the Host', city:'stayed in Darujhistan', disband:'was stood down on a hill outside Darujhistan'};
function impDesc(id){ const o = id && loadSlot(id); if (!o || !o.chapters || o.chapters[7] == null) return 'A fresh start: the Fourth is only a rumour here.';
  const road = o.chapters[7], who = `Sergeant ${esc(o.name)}'s Fourth ${ROAD_WORDS[road] || 'went its own way'}.`;
  return road === 'empire' ? `${who} Word of them reaches the Chain twice, and at Aren one of the Fourth may find you.`
    : `${who} That road never reaches Seven Cities, but word of it does: you'll hear of the Fourth twice on the Chain.`; }
const B2_ECHO = { // chapter -> road -> a paragraph on that chapter's card. Rumour only: nothing here is vouched for.
  2:{ outlaw:`News comes down the column, months stale, off the last ship that made Hissar before it burned: the Empress has proclaimed Onearm's Host outlaw on Genabackis. The veterans argue about it at every fire. None of them believes it and all of them repeat it. A corporal swears his cousin is in a marine squad over there, the Fourth, and the story is they flew north with the Moranth.`,
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
  else if (b === 'moi') extra = typeof b3DeedsExtra === 'function' ? b3DeedsExtra(mine) : ''; // Book Three's Alliance (60)
  else if (b === 'hoc') extra = typeof b4DeedsExtra === 'function' ? b4DeedsExtra(mine) : ''; // Book Four's Nerve and Dust (70)
  else if (b === 'mt') extra = typeof b5DeedsExtra === 'function' ? b5DeedsExtra(mine) : ''; // Book Five's Debt (80)
  else if (b === 'bh') extra = typeof b6DeedsExtra === 'function' ? b6DeedsExtra(mine) : ''; // Book Six's Fever (100)
  else if (b === 'rg') extra = typeof b7DeedsExtra === 'function' ? b7DeedsExtra(mine) : ''; // Book Seven's Rising (120)
  else if (b === 'tth') extra = typeof b8DeedsExtra === 'function' ? b8DeedsExtra(mine) : ''; // Book Eight's Contract (140)
  else if (b === 'dod') extra = typeof b9DeedsExtra === 'function' ? b9DeedsExtra(mine) : ''; // Book Nine's Rations (160)
  else if (b === 'tcg') extra = typeof b10DeedsExtra === 'function' ? b10DeedsExtra(mine) : ''; // Book Ten's Witness (180)
  else if (b === 'dg') { const fin = mine.filter(({s}) => bookDone(s)), col = fin.map(({s}) => (s.chain && s.chain.column) || 0), stayed = mine.reduce((a, {s}) => a + Object.values((s.f && s.f.b2_split) || {}).filter(v => v === 'stay').length, 0);
    const lowest = mine.length ? Math.min(...mine.map(({s}) => (s.chain && s.chain.water != null) ? s.chain.water : 8)) : null;
    const rows2 = [['Most of the column brought into Aren', fin.length ? Math.max(...col) : 'Not yet'], ['Stayed with Coltaine at the split', stayed ? `${stayed} squadmate${stayed === 1 ? '' : 's'}, across every sergeant` : 'None yet'],
      ['Water, at its lowest now', lowest == null ? '–' : `${lowest} skin${lowest === 1 ? '' : 's'}`], ['Came with the Fourth\'s road', mine.filter(({s}) => s.imported).length || 'None yet']];
    const herd = Math.max(0, ...mine.map(({s}) => (s.f && s.f.b2_herd) || 0)), meas = Math.max(0, ...mine.map(({s}) => ((s.f && s.f.b2_measures) || []).length));
    const fires = [['The Water-Seller\'s Measure', meas ? `${meas} of 3 measured${d('b2MeasurePar') ? `, ${d('b2MeasurePar')} in as few pours as the water-sellers` : ''}` : 'Not yet'],
      ['Hackle\'s herd', d('b2Herd') ? `${herd} of 7 brought in${d('b2HerdAll') ? ', all seven at least once' : ''}` : 'Not yet'],
      ['Ask the Ground', d('b2Ground') ? `It answered${d('b2Ground') > 1 ? ` ${d('b2Ground')} times` : ''}` : d('b2GroundLost') ? 'It went quiet' : 'Not yet'],
      ['Haggling on the Chain', d('b2HaggleSaved') ? `${d('b2HaggleSaved')} skin${d('b2HaggleSaved') === 1 ? '' : 's'} saved${d('b2HaggleGuard') ? ', and reminded them who holds the stretch' : ''}` : d('b2HaggleLost') ? 'They said no' : 'Not yet'],
      ['Khundryl knucklebones', d('b2JacksWon') || d('b2JacksLost') ? `${d('b2JacksWon')} won, ${d('b2JacksLost')} lost` : 'Not yet']];
    extra = `<h4 class="jh">The Chain</h4><div class="kv">${rows2.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div><h4 class="jh">At the fires</h4><div class="kv">${fires.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }
  const open = (S ? bookOf(S) : BOOK) === b;
  return `<details class="gloss bookdeeds"${open ? ' open' : ''}><summary>Book ${B.word} · ${esc(B.name || B.title)} <small>${mine.length} sergeant${mine.length === 1 ? '' : 's'}${done ? `, ${done} finished` : ''}</small></summary>
    <div class="route"><canvas data-route="${b}"></canvas></div><ol class="deeds-road">${rows}</ol>${extra}</details>`;
}
function fallenHTML(all){
  const rows = []; all.forEach(({e, s}) => Object.entries(s.dead || {}).forEach(([id, dd]) => { const t = TPL[id]; if (!t || (dd && dd.from)) return; // a Book Four save carries Book Two's dead (from:'dg'): the Book Two save lists them
    rows.push(`<li><b>${esc(t.name)}</b> <span>${esc(dd.where || (dd.ch ? `Chapter ${dd.ch}` : ''))}</span> <em>Sergeant ${esc(e.name)}'s squad, Book ${(BOOKS[bookOf(s)] || BOOKS.gotm).word}</em></li>`); }));
  return rows.length ? `<h4 class="jh">The fallen</h4><ul class="jl fallen">${rows.join('')}</ul>` : ''; }
deedsHTML = function(){
  const all = allSergeants(), books = shelfBooks().map(B => B.id), done = all.filter(({s}) => bookDone(s)).length;
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
    ${whereBooksMeetHTML(false)}${timelineHTML(false)}`;
};
{ const _bd = bindDeeds; bindDeeds = function(){ _bd();
    const cvs = [...document.querySelectorAll('canvas[data-route]')];
    const farthest = b => { const mine = allSergeants().filter(({s}) => bookOf(s) === b).map(({s}) => s); if (S && bookOf(S) === b) return S;
      return mine.sort((x, y) => (bookDone(y) - bookDone(x)) || ((y.chapter || 0) - (x.chapter || 0)))[0] || {chapter:0, book:b}; };
    routeAnim = t => { const live = cvs.filter(c => c.isConnected); if (!live.length) { routeAnim = null; return; }
      live.forEach(c => { if (c.closest('details') && !c.closest('details').open) return; const s = farthest(c.dataset.route); drawRoute(c, Object.assign({}, s, {book:c.dataset.route}), t); }); }; }; }
