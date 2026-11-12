/* ============ Book Ten: Witnessed, beside The Crippled God (v13.0 engine, 180) ============
   The last book. Two squads take turns, as in Book Nine (160): the Third (thread 't', Book Nine's on the 'adjunct' or 'south' road) in
   Chapters 1, 3, 5, 7; the Letherii, the Sixth Company (thread 'l', Book Nine's on the 'escort' or 'adjunct' road), in Chapters 2, 4, 6.
   One save holds both: the squad not playing waits in S.th[thread]; startChapter swaps it in. Each squad keeps its own levels: the Third
   fresh at 24, cap 28; the Letherii fresh at 16, cap 20 (lvCap in 014 reads S.thread). Book Eight's Fourth (its 'east' road) comes over
   the ridge with the relief in Chapter 7 only: it is kept in S.b10f, never played, and fights beside the Third as allies.
   The book's own system is Witness (David, Nov 10, decision 2): what each squad still believes it marches for, 0 to 10, in its own half.
   Thirst and short rations live in the scenes and their costs, not in a counter. After the finale, the series coda: one page per squad
   from every finished book on the device, then the credits.
   Plan: docs/book10-tcg-plan.md. Canon: docs/tcg-canon.md (binding; hard limits §4, rules 98-111). Notes: docs/v13.0-notes.md.
   Brief: docs/tcg-book-brief.md. Ids b10_, shelf 180-199, abbreviation 'tcg'.
   The v10.0.2 rule: b10As(fn) switches S.book for a moment. Anything that asks which squad is playing asks BEFORE the switch, or inside it
   through b10Thread(), which remembers the squad for the length of the switch (b10AsT). */

const b10On = () => !!(S && S.book === 'tcg');
const B10_CH = {1:'t', 2:'l', 3:'t', 4:'l', 5:'t', 6:'l', 7:'t'};  // which squad plays each chapter (plan, settled 1)
const B10_TH = {
  t:{book:'hoc', look:'dg', unit:'the Third', squad:'Third Squad, with the heavies', army:'the Bonehunters', who:'the Third, with the Bonehunters\' heavies',
     core:['sgt', 'haddat', 'sathi', 'tangle', 'marrow'], fresh:['haddat', 'tangle', 'marrow', 'mirrel'], camp0:['brask', 'tegra'], recruits:['pruss'], lvl:24, cap:28},
  l:{book:'mt', look:'mt', unit:'the squad', squad:'Sixth Company, with the Commander\'s brigades', army:'the Letherii brigades', who:'the Sixth Company\'s squad, in the Commander\'s brigades',
     core:['sgt', 'tobet', 'thegg', 'perrit', 'ammet'], fresh:['tobet', 'thegg', 'perrit', 'ammet'], camp0:['brennet', 'kaedra'], recruits:['tirren'], lvl:16, cap:20}};
const B10_KEYS = ['name', 'squad', 'camp', 'loy', 'gear', 'picks', 'kit', 'tricks', 'inv', 'lvl', 'xp', 'dead', 'parked', 'wounds', 'injury', 'silver', 'picksDue', 'imported', 'trail', 'debt', 'debt0', 'b10w'];
let b10AsT = null; // the squad playing, remembered while b10As has S.book switched (the v10.0.2 rule)
const b10Thread = () => b10AsT || (S && S.book === 'tcg' && S.thread) || 't';
const b10Other = () => b10Thread() === 't' ? 'l' : 't';
const b10L = () => b10On() && b10Thread() === 'l';            // the Letherii are playing
const b10Third = () => b10On() && b10Thread() === 't';        // the Third is playing
const b10Unit = (t = b10Thread()) => B10_TH[t].unit;
const b10In = id => !!(S && Array.isArray(S.squad) && S.squad.includes(id) && !(S.dead && S.dead[id]));
const b10OtherName = () => (S && S.th && S.th[b10Other()] && S.th[b10Other()].name) || 'the other sergeant';
const b10Coin = n => b10L() ? b5Coin(n) : `${n} silver`; // the Letherii count in docks; the Third in silver
const b10SgtLook = () => b10On() ? B10_TH[b10Thread()].look : null; // 018, 019: the Third wears Book Two's look (sgt_dg), the Letherii Book Five's (sgt_mt)
const b10ChCount = () => Object.keys(BOOK === 'tcg' ? CHAPTERS : BOOKSNAP.tcg.ch).length;

/* ---- the roads each squad marches in Book Ten (from Book Nine; a fresh start takes canon's): the Third 'adjunct' (into the Glass Desert
   behind the Adjunct) or 'south' (with the Commander's column, the long way round); the Letherii 'escort' (the Commander's brigades, south)
   or 'adjunct' (a few Letherii who crossed with the Malazans; correction 4). S.f.b10_tRoad, S.f.b10_lRoad. ---- */
const b10TRoad = () => (S && S.f && S.f.b10_tRoad === 'south') ? 'south' : 'adjunct';
const b10LRoad = () => (S && S.f && S.f.b10_lRoad === 'adjunct') ? 'adjunct' : 'escort';
const b10Crossing = (t = b10Thread()) => t === 't' ? b10TRoad() === 'adjunct' : b10LRoad() === 'adjunct'; // this squad is in the glass

/* ---- the sergeants: Book Four's (the Third) and Book Five's (the Letherii), each with Book Ten's own lines on top ---- */
const B10_SGT = {
  t:{epithet:'Third squad, 9th Legion, with the Bonehunters\' heavies, at the end of the march east',
     get bio2(){ return b10TRoad() === 'south' ? 'The short-tails came out of the dust, and the heavies held, and the Fist died, and the Adjunct was carried. When the slates came round you put the Third\'s names on the one that goes south with the Letherii, the long way round.\n\nThe army went one way and you went the other. Nobody has told either half why.'
       : 'The short-tails came out of the dust, and the heavies held, and the Fist died, and the Adjunct was carried. When the slates came round you put the Third\'s names on the one that goes east.\n\nEast is a desert made of glass. The Adjunct means to cross it. She has still not said why, and you have stopped expecting her to.'; },
     get quest(){ const w = b10WitTier(b10WitOf('t')); return w === 'kept' || w === 'witnessed' ? 'East, to the end of it. The squad still marches for something. You mean to get it there with all its names.'
       : w === 'hollow' || w === 'doubt' ? 'East, because the column is going east. You count the squad every night and the water every morning, and you have stopped saying either number out loud.'
       : 'East, behind the Adjunct, to wherever this ends. You count the water. You count the squad. Some nights you count them in the wrong order.'; }},
  l:{epithet:'Sixth Company, the Whitefinder Battalion, with the Commander\'s brigades',
     get bio2(){ const d = typeof b5Debt === 'function' ? b5Debt('sgt') : null;
       return `The paybook still has the old number in it${d != null ? `, ${b5Coin(d)}` : ''}. You still read it, out of habit, the way you still pray before a wager.\n\n${b10LRoad() === 'adjunct' ? 'When the foreigners turned east into the glass, the Sixth went with them: a few Letherii who stayed. Everyone else in Lether went south.' : 'When the foreigners turned east into the glass, the Commander turned south, and the Sixth went with him: the long way round to a country called Kolanse, behind the Bolkando and the grey-helmed foreigners.'}`; },
     get quest(){ return b10LRoad() === 'adjunct' ? 'Across the glass behind the foreigners, on their water and your own. Lether has no legend about this place. You mean to come back and make one.'
       : 'South and east with the brigades, to Kolanse, wherever that ends. The Errant gets a prayer before everything. Lately the prayers come back with nothing in them.'; }}};
function b10SgtFor(t){ const snap = BOOKSNAP[B10_TH[t].book] && BOOKSNAP[B10_TH[t].book].sgt;
  if (snap) TPL.sgt = Object.defineProperties({}, Object.assign({}, snap, Object.getOwnPropertyDescriptors(B10_SGT[t])));
  if (typeof PORTRAIT_CACHE !== 'undefined') PORTRAIT_CACHE.clear(); }
/* swap the squad playing. Idempotent. The waiting squad's fields go into S.th[other]; shared: S.f, S.stats, S.chapter(s), S.diff, S.b10
   (the beats), S.b10f (the Fourth) */
function b10Use(t){ if (!b10On() || !B10_TH[t]) return; S.th ??= {}; const cur = S.thread || 't';
  if (cur !== t && S.th[t]) { const out = {}; B10_KEYS.forEach(k => { out[k] = S[k]; }); S.th[cur] = out;
    B10_KEYS.forEach(k => { S[k] = S.th[t][k]; }); delete S.th[t]; }
  S.thread = t; b10SgtFor(t); }
{ const _setBook = setBook; setBook = function(b){ _setBook(b); if (b === 'tcg' && S && S.book === 'tcg') b10SgtFor(b10Thread()); }; }
/* run fn as if the squad's own earlier book were open ('hoc' for the Third, 'mt' for the Letherii), for a moment, synchronously; fn gets the
   squad's thread, read before the switch. b10Thread() still answers inside. */
function b10As(fn){ if (!b10On()) return fn(b10Thread()); const t = b10Thread(), was = S.book, wasT = b10AsT; S.book = B10_TH[t].book; b10AsT = t;
  try { return fn(t); } finally { S.book = was; b10AsT = wasT; } }

/* ---- the shelf ---- */
BOOKS.tcg = {id:'tcg', n:10, word:'Ten', title:'The Crippled God', name:'Witnessed', h1:['', 'Witnessed'], squad:'Two squads', unit:'the squad',
  tag:'The army crosses a desert made of glass for a reason nobody gives it, and the Letherii go the long way round. Nobody will remember who was there. Somebody should.',
  titleArt:'title/tcg', coverPos:'84% 50%', titleScene:'tcg', patch:'insignia/tcg',
  blurb:'The Glass Desert and Kolanse, days after the short-tails, beside The Crippled God: the Third in the crossing, Book Nine\'s Letherii on the long way round, and Book Eight\'s Fourth at the very end. The last book. A finished Book Nine carries both squads across.'};
Object.defineProperty(BOOKS.tcg, 'coming', {configurable:true, get(){ return b10ChCount() === 0; }});
Object.defineProperty(BOOKS.tcg, 'titleArt', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['title/tcg'] ? 'title/tcg' : 'title/dod'; }});
Object.defineProperty(BOOKS.tcg, 'patch', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['insignia/tcg'] ? 'insignia/tcg' : 'insignia/dod'; }});
/* the title's credit, once the last book is on the shelf: no "more to come" (titleCredit is 029's; this only speaks when Book Ten is on it) */
{ const _tc = titleCredit; titleCredit = function(){ const bs = shelfBooks().sort((a, b) => a.n - b.n); const last = bs[bs.length - 1];
    if (!last || last.id !== 'tcg' || bs.length < 2) return _tc();
    return `${last.word} books, each beside one of Erikson's Malazan novels, in order, from ${bs[0].title} to ${last.title}.`; }; }

/* ---- the transfers: a finished Book Nine save. Its Third on 'adjunct' or 'south' (o.chapters[7]); its Letherii on 'escort' or
   'adjunct' (o.f.b9_lethRoad, 'escort' by default, as Book Nine's own b97OnwardL). 'home' on either: that squad starts fresh, with
   canon's road. One save holds both squads: the Third is on top (Chapter 7 is the Third's), the Letherii in o.th.l.
   Book Eight's Fourth: a finished Book Eight on the 'east' road (o.chapters[7]); otherwise a canon-default Fourth. ---- */
const b10HalfOf = (o, t) => { if ((o.thread || 't') === t) return o; const h = (o.th && o.th[t]) || {}; // the waiting half: its own fields only, never the other squad's
  return Object.assign({}, h, {thread:t, sid:o.sid, book:o.book, f:o.f, chapters:o.chapters, squad:h.squad || ['sgt'], camp:h.camp || [], dead:h.dead || {}, gear:h.gear || {}, picks:h.picks || {}, loy:h.loy || {}, kit:h.kit || [], tricks:h.tricks || {}, inv:h.inv || {}, parked:h.parked || {}}); };
const b10RoadT = o => o && o.chapters ? (o.chapters[7] ?? (o.f && o.f.b9_c7_key)) : null;
const b10RoadL = o => (o && o.f && o.f.b9_lethRoad) || 'escort';
const b10QualT = o => !!(o && o.book === 'dod' && bookDone(o) && ['adjunct', 'south'].includes(b10RoadT(o)));
const b10QualL = o => !!(o && o.book === 'dod' && bookDone(o) && ['escort', 'adjunct'].includes(b10RoadL(o)));
const b10QualF = o => !!(o && o.book === 'tth' && bookDone(o) && (o.chapters[7] ?? (o.f && o.f.b8_c7_key)) === 'east');
/* Book Nine's Witness beats, by squad (B9WIT: c3, c5, c7 the Third's; c4, c6 the Letherii's) */
function b10B9Beats(o, t){ const w = (o && o.b9 && o.b9.wit) || {}, out = {kept:0, doubt:0};
  Object.entries({3:'t', 4:'l', 5:'t', 6:'l', 7:'t'}).forEach(([n, th]) => { if (th === t && (w['c' + n] === 'kept' || w['c' + n] === 'doubt')) out[w['c' + n]]++; }); return out; }
function b10CarryT(o){ const h = b10HalfOf(o, 't'), b = b10B9Beats(o, 't'); return Object.assign(b6Carry(h), {from:h.name || o.name, road:b10RoadT(o), beats:b, rat:(h.b9r && typeof h.b9r.n === 'number') ? h.b9r.n : null}); }
function b10CarryL(o){ const h = b10HalfOf(o, 'l'), b = b10B9Beats(o, 'l'); return Object.assign(b7CarryL(h), {from:h.name || 'Brann', road:b10RoadL(o), beats:b, rat:(h.b9r && typeof h.b9r.n === 'number') ? h.b9r.n : null}); }
function b10CarryF(o){ return Object.assign(b6Carry(o), {from:o.name || '', book:'tth'}); }
const b10ImpT = id => { const o = id && loadSlot(id); return b10QualT(o) ? b10CarryT(o) : null; };
const b10ImpL = id => { const o = id && loadSlot(id); return b10QualL(o) ? b10CarryL(o) : null; };
const b10ImpF = id => { const o = id && loadSlot(id); return b10QualF(o) ? b10CarryF(o) : null; };
const b10ImpList = t => roster().list.filter(e => { const o = loadSlot(e.id); return t === 't' ? b10QualT(o) : t === 'l' ? b10QualL(o) : b10QualF(o); });
const b10ImpName = (id, t = 't') => { const o = id && loadSlot(id); if (!o) return null;
  if (t === 'f') return b10QualF(o) ? String(o.name || '') : null;
  return (t === 't' ? b10QualT(o) : b10QualL(o)) ? String(b10HalfOf(o, t).name || (t === 't' ? 'Hask' : 'Brann')) : null; };
const B10_ROADW = {adjunct:'east into the glass behind the Adjunct', south:'south with the Letherii, the long way round', escort:'south with the Commander\'s brigades', adjunct_l:'east into the glass with the foreigners'};
function b10ImpDesc(id, t = 't'){
  if (t === 'f') { const i = b10ImpF(id); if (!i) return `A fresh start: Brisk, Kettle, Tuft and Ohl, at level ${B10_FOURTH_LVL}. They join the Third in the last chapter only.`;
    const went = i.mates.map(k => TPL[k].name), dead = i.dead.map(k => TPL[k].name);
    return `Sergeant ${esc(i.from || 'of the Fourth')}'s Fourth: ${went.length ? esc(went.join(', ')) : 'nobody else'}${dead.length ? `. ${esc(dead.join(' and '))} did not come through` : ''}. They keep level ${Math.min(i.lvl, B10_FOURTH_CAP)}, and join the Third in the last chapter only.`; }
  const i = t === 't' ? b10ImpT(id) : b10ImpL(id), T = B10_TH[t];
  if (!i) return t === 't' ? `A fresh start: Haddat, Tangle, Marrow and Mirrel, with Brask and Tegra at the baggage, at level ${T.lvl}. Sathi fell at the Barrow.` : `A fresh start: Tobet, Thegg, Perrit and Ammet, with Brennet and Kaedra at the train, at level ${T.lvl}.`;
  const went = i.mates.map(k => TPL[k].name), dead = i.dead.map(k => TPL[k].name);
  return `Sergeant ${esc(i.from)}'s ${t === 't' ? 'Third' : 'Letherii'}, ${B10_ROADW[t === 'l' && i.road === 'adjunct' ? 'adjunct_l' : i.road] || ''}: ${went.length ? esc(went.join(', ')) : 'nobody else'}${dead.length ? `. ${esc(dead.join(' and '))} did not come through` : ''}. ${i.lvl < T.lvl ? `The days since bring them to level ${T.lvl}.` : `They keep level ${Math.min(i.lvl, T.cap)}.`}`; }

/* ---- Witness (plan, settled 2: the main track). What the squad still believes it marches for, 0 to 10, in each squad's own half
   (S.b10w = {n, lo, hi}). Fresh, it starts at 5. From Book Nine it starts at 5 + kept − doubt of that squad's Book Nine beats, held to 2..8.
     b10Wit()               the playing squad's number; b10WitOf(t) either squad's (the waiting one from S.th).
     b10WitTier(n)          'hollow' 0-1, 'doubt' 2-3, 'holding' 4-6, 'kept' 7-8, 'witnessed' 9-10 (B10_WITW holds the words).
     b10Witness(n, why)     moves it (n may be negative): noted with the reason and any tier change, clamped 0..10, tallied b10WitUp /
                            b10WitDown, HUD updated, saved; returns the new value.
     b10Beat(v, why, n)     the chapter's one Witness beat (every chapter has one, B10BEAT): 'kept' +1, 'doubt' −1, recorded once in
                            S.b10.beat (the first answer stands). Null outside Book Ten or for a value it does not know.
     The engine's own move, the wear: nobody tells the army why. At the start of Chapters 3, 4 and 5 the playing squad loses 1 (once a
     chapter, flag b10_wear<n>; B10_WEAR).
     On checks: a check with c.witness:true gets the edge "Witness": witnessed +2, kept +1, holding 0, doubt −1, hollow −2. Any other check,
     while 'hollow', gets "Nothing to march for" −1.
     In a fight: B10_WITFIGHT, to hit for every squadmate by tier: hollow −1, witnessed +1, the middle tiers nothing (David, Nov 10, plan
     decision 8). The log says so only when a number is not zero.
     On the roads: b10RoadOpen(r) says whether an ending is open: 'kolanse' (stay and help the drought country) needs 'holding' or better. ---- */
const B10_WIT0 = 5, B10_WITMAX = 10;
const B10_WITW = {hollow:'nothing left to march for', doubt:'marching because the column does', holding:'still marching for something', kept:'marching for each other', witnessed:'their own witness'};
const B10_WEAR = {3:-1, 4:-1, 5:-1};
const B10BEAT = {1:'t', 2:'l', 3:'t', 4:'l', 5:'t', 6:'l', 7:'t'};
const B10_BEATV = ['kept', 'doubt'];
const b10W = () => { if (!S) return {n:B10_WIT0, lo:B10_WIT0, hi:B10_WIT0}; if (!S.b10w || typeof S.b10w.n !== 'number') S.b10w = {n:B10_WIT0, lo:B10_WIT0, hi:B10_WIT0}; return S.b10w; };
const b10Wit = () => b10W().n;
const b10WitOf = (t = b10Thread()) => { if (!S) return B10_WIT0; if (t === b10Thread() || !S.th || !S.th[t]) return b10Wit(); const w = S.th[t].b10w; return w && typeof w.n === 'number' ? w.n : B10_WIT0; };
const b10WitTier = (n = b10Wit()) => n >= 9 ? 'witnessed' : n >= 7 ? 'kept' : n >= 4 ? 'holding' : n >= 2 ? 'doubt' : 'hollow';
const B10_TIERS = ['hollow', 'doubt', 'holding', 'kept', 'witnessed'];
const b10Hollow = () => b10WitTier() === 'hollow';
function b10Witness(n, why = ''){ if (!b10On() || !n) return b10Wit(); const st = b10W(), was = st.n, t0 = b10WitTier(was);
  st.n = clamp(was + n, 0, B10_WITMAX); const d = st.n - was; if (!d) return st.n; st.hi = Math.max(st.hi ?? was, st.n); st.lo = Math.min(st.lo ?? was, st.n);
  tally(d > 0 ? 'b10WitUp' : 'b10WitDown', Math.abs(d));
  note(`Witness ${d > 0 ? '+' : '−'}${Math.abs(d)}${why ? ` (${why})` : ''}: ${st.n} of ${B10_WITMAX}.`, d > 0 ? 'good' : 'bad');
  const t1 = b10WitTier(st.n); if (t1 !== t0) note(`${b10Unit() === 'the Third' ? 'The Third' : 'The squad'}: ${B10_WITW[t1]}.`, d > 0 ? 'good' : 'bad');
  if (typeof updChain === 'function') updChain(); save(); return st.n; }
const b10Beats = () => { if (!S) return {}; S.b10 ??= {beat:{}}; S.b10.beat ??= {}; return S.b10.beat; };
function b10Beat(v, why = '', n = (S && S.chapter) || 0){ if (!b10On() || !B10_BEATV.includes(v) || !B10BEAT[n]) return null; const w = b10Beats(), k = 'c' + n;
  if (w[k]) return w[k]; w[k] = v; tally(v === 'kept' ? 'b10Kept' : 'b10Doubt', 1);
  note(v === 'kept' ? `Witness: the squad still marches for something${why ? ` (${why})` : ''}.` : `Witness: the squad marches because the column does${why ? ` (${why})` : ''}.`, v === 'kept' ? 'good' : 'bad');
  b10Witness(v === 'kept' ? 1 : -1, v === 'kept' ? 'kept' : 'doubted'); return v; }
const b10BeatOf = n => (S && S.b10 && S.b10.beat && S.b10.beat['c' + n]) || null;
function b10BeatCount(t = b10Thread()){ const w = b10Beats(), out = {kept:0, doubt:0}; Object.entries(B10BEAT).forEach(([n, th]) => { if (th === t && w['c' + n]) out[w['c' + n]]++; }); return out; }
const B10_WITEDGE = {hollow:-2, doubt:-1, holding:0, kept:1, witnessed:2};
const B10_WITFIGHT = {hollow:-1, doubt:0, holding:0, kept:0, witnessed:1}; // to hit (David, Nov 10: hollow -1, witnessed +1)
const B10_ROADNEED = {kolanse:'holding'}; // the endings Witness opens (notes §Witness: the roads)
const b10RoadOpen = (r, t = b10Thread()) => !B10_ROADNEED[r] || B10_TIERS.indexOf(b10WitTier(b10WitOf(t))) >= B10_TIERS.indexOf(B10_ROADNEED[r]);
{ const _ef = edgesFor; edgesFor = function(c, id){ const out = _ef(c, id); if (!b10On() || !c) return out;
    const tier = b10WitTier();
    if (c.witness) { const k = B10_WITEDGE[tier]; if (k) out.push(['Witness', k]); }
    else if (tier === 'hollow') out.push(['Nothing to march for', -1]);
    return out; }; }
{ const _mkParty = mkParty; mkParty = function(id, x, y){ const u = _mkParty(id, x, y); const k = b10On() ? (B10_WITFIGHT[b10WitTier()] || 0) : 0;
    if (k) { u.atk += k; u.b10wit = k; } return u; }; }
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt); if (!b10On() || !B) return r;
    const k = B10_WITFIGHT[b10WitTier()] || 0; if (k) blog(`<em>${k > 0 ? 'Their own witness.' : 'Nothing to march for.'}</em> Every squadmate is ${k > 0 ? '+' : '−'}${Math.abs(k)} to hit this fight.`);
    if (B.log && CARDS[S.card] && CARDS[S.card].fx) blog(`<em>${CARDS[S.card].name}:</em> ${CARDS[S.card].fx}`);
    return r; }; }
/* the widget for a node's html (as Book Nine's rationsHTML), and the HUD pill beside the purse */
function witnessHTML(t){ const n = t ? b10WitOf(t) : b10Wit(), tier = b10WitTier(n);
  return `<div class="chainbox allybox" role="group" aria-label="Witness"><div class="crow"><span>Witness</span><b>${n} of ${B10_WITMAX} · ${esc(B10_WITW[tier])}</b></div><div class="bar${n <= 3 ? ' col' : ''}"><i style="width:${Math.round(n / B10_WITMAX * 100)}%"></i></div></div>`; }
{ const _updChain = updChain;
  updChain = function(){ const el = typeof document !== 'undefined' && document.getElementById('chainp');
    if (!el || !S || S.book !== 'tcg') return _updChain();
    const n = b10Wit(); el.innerHTML = `<span class="chainpill allypill"><span class="${n <= 3 ? 'dry' : ''}">Witness <b>${n}</b></span></span>`; }; }
{ const _updSilver = updSilver;
  updSilver = function(){ if (!b10L()) return _updSilver();
    const el = typeof document !== 'undefined' && document.getElementById('silver'); if (!el) return; const t = b5Coin(S.silver);
    if (el.textContent !== t) { el.textContent = t; if (silverShown != null && silverShown !== S.silver) { el.classList.remove('sup', 'sdown'); void el.offsetWidth; el.classList.add(S.silver > silverShown ? 'sup' : 'sdown'); } }
    silverShown = S.silver; updChain(); }; }
/* the one line of the opening a transfer's Book Nine Rations become (plan, Claude's call: Rations are not carried) */
const b10RationLine = (t = b10Thread()) => { const h = t === b10Thread() ? S : (S.th && S.th[t]), i = h && h.imported, r = i && typeof i.rat === 'number' ? i.rat : null;
  if (r == null) return '';
  return t === 't' ? (r >= 8 ? 'The Third came out of the Wastes on full rations, which nobody else did, and nobody has forgiven it.' : r >= 5 ? 'The Third came out of the Wastes on the march ration. The march ration is about to stop meaning anything.' : r >= 1 ? 'The Third came out of the Wastes on half a ration and less. Belts are on their last holes already.' : 'The Third came out of the Wastes with nothing in the wagons. It has had practice at that.')
    : (r >= 8 ? 'The Sixth came off the Wastes with the train full, and Yelt\'s book to prove it.' : r >= 5 ? 'The Sixth came off the Wastes on the march ration, and the march ration is going thinner.' : r >= 1 ? 'The Sixth came off the Wastes on short rations, and the train is lighter than the book says.' : 'The Sixth came off the Wastes with nothing in the wagons. The book says otherwise. The book is wrong.'); };

/* ---- one squad's half of the save ---- */
function b10Half(t, name, imp){ const T = B10_TH[t];
  const mates = imp ? imp.mates.slice(0, 5) : T.fresh.slice(), squad = ['sgt', ...mates];
  const lvl = clamp(Math.max(T.lvl, imp ? imp.lvl : 1), 1, T.cap);
  const w0 = imp && imp.beats ? clamp(B10_WIT0 + imp.beats.kept - imp.beats.doubt, 2, 8) : B10_WIT0;
  const half = {name, squad, camp:imp ? imp.mates.slice(5) : T.camp0.slice(), loy:{}, gear:imp ? imp.gear : {}, picks:imp ? imp.picks : {}, kit:imp ? imp.kit : [],
    tricks:imp ? imp.tricks : {}, inv:imp ? imp.inv : (t === 't' ? {sharper:2, burner:1, cusser:1, smoker:1, salve:3} : {sharper:0, burner:0, cusser:0, smoker:0, salve:2}),
    lvl, xp:LEVELS[lvl - 1] || 0, dead:{}, parked:{}, wounds:null, injury:null, silver:20, picksDue:[], debt:null, debt0:null,
    imported:imp ? {from:imp.from, sid:imp.sid, lvl:imp.lvl, mates:imp.mates.slice(), lifted:imp.lvl < T.lvl, road:imp.road, rat:imp.rat, beats:imp.beats} : null,
    trail:[{x:4, y:8}, {x:6, y:8}, {x:4, y:9}, {x:5, y:9}], b10w:{n:w0, lo:w0, hi:w0}};
  squad.forEach(k => { if (k !== 'sgt') half.loy[k] = imp ? (imp.loy[k] || 0) : 0; }); half.camp.forEach(k => { half.loy[k] = imp ? (imp.loy[k] || 0) : 0; half.picks[k] ??= []; half.gear[k] ??= {}; });
  if (imp) imp.dead.forEach(k => { const d = imp.deadAt[k] || {}; half.dead[k] = {ch:d.ch || 7, where:d.where || '', from:d.from || 'dod'}; });
  else if (t === 't') half.dead.sathi = {ch:7, where:'The Barrow', from:'dg'}; // the fresh start, as Books Four, Six, Seven and Nine have it
  /* Debt is flavour, as in Books Seven and Nine: the Letherii keep the numbers their bios read, and nothing moves them */
  if (t === 'l') { const D0 = typeof B5_DEBT0 !== 'undefined' ? B5_DEBT0 : {};
    half.debt = imp && imp.debt ? imp.debt : Object.fromEntries(squad.filter(k => D0[k] != null).map(k => [k, D0[k]]));
    half.debt0 = imp && imp.debt0 ? imp.debt0 : Object.assign({}, half.debt); }
  return half; }
/* the Fourth: Book Eight's on the 'east' road, or a canon-default Fourth (Brisk, Kettle, Tuft, Ohl). Never played; it fights beside the
   Third in Chapter 7 (b10FourthAllies) and has its pages in the finale and the coda. */
const B10_FOURTH_FRESH = ['brisk', 'kettle', 'tuft', 'ohl'], B10_FOURTH_LVL = 20, B10_FOURTH_CAP = 21;
function b10FourthHalf(imp){ const mates = imp ? imp.mates.slice(0, 5) : B10_FOURTH_FRESH.slice(), f = {name:imp ? (imp.from || '') : '', squad:['sgt', ...mates], camp:imp ? imp.mates.slice(5) : [],
    lvl:clamp(imp ? imp.lvl : B10_FOURTH_LVL, 1, B10_FOURTH_CAP), loy:{}, gear:imp ? imp.gear : {}, picks:imp ? imp.picks : {}, dead:{}, imported:imp ? {from:imp.from, sid:imp.sid, lvl:imp.lvl, book:'tth'} : null};
  mates.forEach(k => { f.loy[k] = imp ? (imp.loy[k] || 0) : 0; });
  if (imp) imp.dead.forEach(k => { const d = imp.deadAt[k] || {}; f.dead[k] = {ch:d.ch || 7, where:d.where || '', from:d.from || 'tth'}; });
  return f; }
/* a new Book Ten save. nameT: the Third's sergeant; nameL: the Letherii sergeant. impT, impL: slot ids of finished Book Nine saves (one save
   can carry both); impF: a finished Book Eight save (the Fourth), or empty. */
function newStateTCG(nameT, nameL, impT, impL, impF, sid){
  nameT = nameT || 'Hask'; nameL = nameL || 'Brann';
  const iT = b10ImpT(impT), iL = b10ImpL(impL), iF = b10ImpF(impF), t = b10Half('t', nameT, iT), l = b10Half('l', nameL, iL);
  const s = Object.assign({v:1, book:'tcg', sid:sid || (iT || iL || iF ? newSid() : sidFor(nameT)), scene:'chintro', node:null, bg:null, card:null, f:{}, pos:{x:5, y:8}, log:[], ending:null,
    battle:null, bopt:null, chapter:0, chapters:{}, area:'pale', thread:'t', th:{l}, b10:{beat:{}}, b10f:b10FourthHalf(iF)}, t);
  s.f.b10_tRoad = iT && iT.road === 'south' ? 'south' : 'adjunct'; s.f.b10_lRoad = iL && iL.road === 'adjunct' ? 'adjunct' : 'escort';
  migrate(s); s.picksDue = picksOwed(s); s.th.l.picksDue = picksOwed(Object.assign({}, s, s.th.l, {thread:'l'}));
  return s; }

/* ---- the march: the chapter's squad swapped in first, then the wear ---- */
{ const _sc = startChapter; startChapter = function(n){ if (b10On() && B10_CH[n]) { b10Use(B10_CH[n]); if (B10_WEAR[n] && !S.f['b10_wear' + n]) { S.f['b10_wear' + n] = 1; b10Witness(B10_WEAR[n], 'nobody says why'); } } return _sc(n); }; }

/* ---- thirst, a scene cost (plan, settled 2: no counter): a wound like the others, the weakest; only a chapter gives it, with b10Thirst(id),
   never a bad fall; a rest at the fire clears it, as any wound (a mouthful saved for it). b10ThirstPick(): the walking squadmate with the
   lowest loyalty, never the sergeant. ---- */
INJURIES.b10thirst = {name:'the thirst', word:'the thirst', hit:1, sev:0};
{ const _gi = giveInjury; giveInjury = function(u, pick){ if (!pick) { const ks = Object.keys(INJURIES).filter(k => k !== 'kelyk' && k !== 'b9fever' && k !== 'b10thirst'); pick = ks[R(ks.length)]; } return _gi(u, pick); }; }
function b10Thirst(id){ if (!b10On() || !id || !TPL[id] || id === 'sgt' || injuryOf(id)) return false; (S.injury ??= {})[id] = 'b10thirst'; tally('b10Thirst'); save(); return true; }
const b10ThirstPick = () => { const sq = (S.squad || []).filter(k => k !== 'sgt' && b10In(k) && !injuryOf(k)); return sq.sort((a, b) => ((S.loy || {})[a] || 0) - ((S.loy || {})[b] || 0))[0] || null; };

/* ---- the Letherii keep Book Five's hands while they play (as Books Seven and Nine): the renamed abilities, and Lether has no Moranth
   munitions ---- */
Object.entries(B5_ABX).forEach(([k, x]) => { const a = AB[k]; if (!a) return;
  ['name', 'desc'].forEach(f => { if (!x[f]) return; const d = Object.getOwnPropertyDescriptor(a, f); if (!d) return;
    Object.defineProperty(a, f, {configurable:true, enumerable:true, get(){ return b10L() ? x[f] : d.get ? d.get.call(this) : d.value; }, set(v){ /* fixed per book */ }}); });
  const run = a.run;
  a.run = function(u, x0, y0){ if (!b10L()) return run.call(this, u, x0, y0);
    const t = B && B.units.find(p => p.x === x0 && p.y === y0), _b = blog; let n = 0; const w0 = B && B.warren;
    blog = m => { let s = String(m); if (x.line && n === 0) s = x.line(u, t); if (x.map) x.map.forEach(([re, to]) => { s = s.replace(re, to); }); n++; return _b(s); };
    if (u && u.id === 'ammet' && B) B.warren = Object.assign({}, w0 || {}, {denul:1});
    const done = () => { blog = _b; if (u && u.id === 'ammet' && B && w0) B.warren = w0; };
    let r; try { r = run.call(this, u, x0, y0); } catch (e) { done(); throw e; }
    if (r && r.then) return r.finally(done);
    done(); return r; }; });
{ const _rl = rosterLacks; rosterLacks = function(sq){ const r = _rl(sq); return b10L() ? r.filter(k => k !== 'munitions') : r; }; }

/* ---- the recruits (canon sheet §6: names checked). Base numbers; the roster brings them to the squad's level. ---- */
Object.assign(TPL, {
  pruss:{name:'Pruss', role:'Heavy, a carter\'s son', sig:'P', col:'#8a7a62', hp:27, ac:15, atk:4, dmg:[1,10,2], rng:1, mv:4, init:1, st:{might:3, wits:1, guile:0}, ab:['bash', 'salve'],
    epithet:'"My da hauled for the army at Unta. Said the beasts always die first. I thought he meant oxen."', origin:'A carter\'s yard outside Unta, Quon Tali', age:24, service:'Four years in the heavies, the last of it carrying more than his share',
    weapon:'A heavy infantry sword, notched, and a carter\'s maul on a thong', armour:'A heavy\'s scale, patched with somebody else\'s, and a helm he wears on the march only when told',
    bio:'A carter\'s son from outside Unta who joined the heavies because they eat first. His squad held a stretch of the rearguard on the day the short-tails came, and he was the one sent back for water when it broke, and so he is the one left. The clerks put him on the Third\'s list at the burial lines. He came over with his kit and his old sergeant\'s helm, and asked where they wanted the weight carried.',
    traits:['Knows how much a wagon weighs by the sound of its axle', 'Says his old squad\'s names under his breath at every halt', 'Laughs late, and then too long'], gear:['A heavy\'s sword', 'His old sergeant\'s helm, tied to his pack'],
    get quest(){ return 'East, in whatever traces the column gives him. He would like to be the one sent back for water, just once more, and come back with it.'; }},
  tirren:{name:'Tirren', role:'Farrier of the train', sig:'T', col:'#9a7a5e', hp:20, ac:13, atk:4, dmg:[1,8,2], rng:1, mv:5, init:2, st:{might:2, wits:2, guile:1}, ab:['bash', 'salve'],
    epithet:'"The horses don\'t lie about how far they can go. The officers do. I listen to the horses."', origin:'A smithy in a Letherii river town', age:21, service:'Two years shoeing for the brigades\' train, and one long road',
    weapon:'A farrier\'s hammer, and a hoof-knife she will not lend', armour:'A leather farrier\'s apron over a quilted shirt, and a scarf over her hair against the dust',
    bio:'Her father shod for the river garrisons and taught her before he taught her brothers, because she listened. She came out with the brigades\' supply train to keep its horses on their feet, and has watched the long road south kill them one by one anyway. She asked the Sixth\'s sergeant for a place in the squad because a squad can at least decide when it stops, and a horse cannot.',
    traits:['Talks to every horse in the train by name, and to most soldiers by none', 'Checks feet before faces', 'Keeps a tally of the horses lost on the inside of her apron'], gear:['A farrier\'s hammer', 'A rasp worn thin as a leaf'],
    get quest(){ return 'Wherever the road ends, with whatever is still walking. She means to bring one horse home. She has not said which.'; }},
});
Object.assign(VERB, {pruss:'brings the heavy sword down on', tirren:'swings the farrier\'s hammer at'});
Object.assign(STATUP, {pruss:['might', 'wits'], tirren:['might', 'wits']});
Object.assign(TPL_ROLES, {pruss:['heavy', 'mail', 'shield', 'blade', 'heavyweapon'], tirren:['light', 'blade', 'heavyweapon']});
Object.assign(PICKS[3], {
  pruss:[['holdline', 'Into the Traces', 'Pruss\'s free swings are unlimited and hit +2. A carter\'s son leans into a load and does not stop until it moves.'], ['shieldwall', 'Shoulder to the Wheel', 'Squadmates standing next to Pruss get +2 armour. He has stood beside a wagon in a bad place before, and knows which side takes the weight.']],
  tirren:[['snare', 'The Twitch', 'Whatever Tirren catches is tangled: −2 to hit and −2 armour through its next turn. A farrier knows how to hold something that would rather kick.'], ['ghost', 'In the Horse-Lines', 'Enemies take −2 to hit Tirren. Among the horses, the one who stays calm is the one nobody notices.']],
});
/* sprites until the chapter art (180b draws the busts) */
if (typeof FIGX !== 'undefined') Object.assign(FIGX, {
  pruss(ctx, h, t, o){ ctx.save(); ctx.scale(1.08, 1.04); h.legs('#2a2420'); h.torso('#7e7462', '#2a261e', 7); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let y = -4; y < 6; y += 2.2) ctx.fillRect(-6, y, 12, .6);
    ctx.strokeStyle = '#4a3622'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-6, -6); ctx.lineTo(6, 6); ctx.stroke(); // the trace-strap
    h.head('#b8906c', 4.5, -11.2); h.look('rgba(20,12,10,.85)', -11.4); ctx.fillStyle = '#6a5a48'; ctx.beginPath(); ctx.arc(0, -12.4, 4.6, Math.PI * 1.05, Math.PI * 1.95); ctx.fill(); // cropped hair
    ctx.strokeStyle = '#cfc8b8'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(7, 6); ctx.lineTo(10, -10); ctx.stroke(); ctx.restore(); },
  tirren(ctx, h, t, o){ h.legs('#2e2218'); poly(ctx, [[-6,-6],[6,-6],[7,10],[-7,10]], h.armor('#7a5a3e', '#261a10')); h.head('#c49a76', 4.2, -11.4); h.look('rgba(20,12,10,.85)', -11.6);
    ctx.fillStyle = '#8a6a4a'; ctx.beginPath(); ctx.arc(0, -12.8, 4.8, Math.PI, 0); ctx.fill(); ctx.fillRect(-4.8, -13, 9.6, 1.6); // the scarf
    ctx.fillStyle = '#6a6a6a'; ctx.fillRect(6.2, -1, 3.4, 2.6); ctx.strokeStyle = '#5a4028'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(7.8, 1.6); ctx.lineTo(7.8, 7); ctx.stroke(); }, // the hammer
});

/* ---- the gods (canon sheet §7). The sergeants: Treach for the Third's; the Errant for the Letherii's in Chapter 2 only (he stops
   answering after: "Lether's luck has gone quiet"; no twist boons in Book Ten). Hood's faithful are answered by the Guardians of the Gate,
   as in Books Eight and Nine (nameless). The Shore does not answer (Yedan holds it, and dies holding it). The recruits have no god.
   A quiet patron (P.quiet) keeps the retry as before but leaves no boon (BOONS has no entry for it): Claude's call, notes §Gods. ---- */
const PATRON_B10GATE = {sig:'b8gate', god:'the Guardians of the Gate', title:'The Guardians of the Gate', txt:id => `${NAME(id)}, on the glass, says the old words to the old god, out of habit, and knows as they leave that nobody has been in that seat for a long while.\n\nSomething answers anyway. A gate, far off and very close, with soldiers standing in it, more than anyone could count, and not one face turned this way. One of them lifts a hand. *Not yet.*`};
const PATRON_B10QUIET = {sig:'errant', god:'Lether\'s luck', title:'The Errant', quiet:true, txt:id => `You say the prayer, the one every Letherii soldier says before a wager, and wait for the coin to land.\n\nNothing lands. Lether's luck has gone quiet, the way a room goes quiet when somebody has left it.\n\nThe squad gets up anyway. It helped no one. That turns out to be enough, this once.`};
const PATRON_B10SHORE = {sig:'brune', god:'the Shore, far off', title:'The Shore', quiet:true, txt:id => `${NAME(id)} says the words to the Shore, the way Letheras's fisher-folk do, and listens for the tide.\n\nThere is no tide here. Wherever the Shore is, it is busy being held. ${NAME(id)} gets up on the third try anyway, and the squad gets up after.`};
const b10Quiet = P => !!(b10On() && P && P.quiet);
Object.keys(PATRONS).forEach(id => { if (id === 'sgt') return; const prev = Object.getOwnPropertyDescriptor(PATRONS, id); if (!prev) return; const was = () => prev.get ? prev.get() : prev.value;
  Object.defineProperty(PATRONS, id, {configurable:true, enumerable:true, get(){ const p = was(); if (!b10On() || !p) return p;
    return p.god === 'Hood' || p.god === 'the Guardians of the Gate' ? PATRON_B10GATE : p.god === 'the Shore' ? PATRON_B10SHORE : p; }, set(v){ /* kept per book */ }}); });
{ const prev = Object.getOwnPropertyDescriptor(PATRONS, 'sgt');
  Object.defineProperty(PATRONS, 'sgt', {configurable:true, enumerable:true, get(){ if (S && S.book === 'tcg') return b10Thread() === 'l' ? ((S.chapter || 0) <= 2 ? PATRON_ERRANT : PATRON_B10QUIET) : PATRON_TREACH;
    return prev.get ? prev.get() : prev.value; }, set(v){ /* kept per book */ }}); }
/* the Guardians' boon in Book Ten, as Books Eight and Nine: the first time each squadmate would go down, they stay up at 1 health with a ward of a tenth */
{ const _hurt = hurt;
  hurt = function(u, n, crit){ const before = u ? u.hp : 0; _hurt(u, n, crit);
    if (b10On() && B && u && u.side === 'p' && !u.ally && before > 0 && u.hp <= 0 && boon('b8gate') && !((S.boons.spared || {})['g_' + u.id])) {
      (S.boons.spared ??= {})['g_' + u.id] = 1; u.hp = 1; u.deadAt = null;
      const w = Math.round(u.maxhp * .1); if (w > (u.ward || 0)) u.ward = w; blog(`<em>The Gate is held.</em> ${u.name} gets back up at 1 health, with a ward of ${w}.`); float(u, 'the gate holds', '#8fa38a'); } }; }

const B10_DONE = {pruss:'b10_prussDone', tirren:'b10_tirrenDone'}; // 1 walks, 2 waits, 0 sent away
const B10_HOME = {pruss:'the heavies\' baggage', tirren:'the train\'s horse-lines', brask:'the heavies\' baggage', tegra:'the guides\' fire at the column\'s edge', brennet:'the supply train', kaedra:'the outriders'};
const b10Recruits = () => B10_TH[b10Thread()].recruits;
const b10CanRecruit = id => !!(b10On() && TPL[id] && b10Recruits().includes(id) && !(S.dead && S.dead[id]) && S.f[B10_DONE[id]] !== 0);
function b10Join(id){ if (!b10CanRecruit(id) || b10In(id)) return false;
  if ((S.squad || []).length < ROSTER_CAP) { recruit(id); S.f[B10_DONE[id]] = 1; }
  else { S.camp = [...new Set([...(S.camp || []), id])]; S.loy[id] ??= 0; S.picks[id] ??= []; S.gear[id] ??= {}; S.f[B10_DONE[id]] = 2; note(`${NAME(id)} waits with ${B10_HOME[id]}: six walk already.`); }
  save(); return true; }
{ const _recruit = recruit; recruit = function(id){ if (!b10On()) return _recruit(id); const n0 = note;
    note = (t, c) => n0(String(t).replace('joins the Fourth', `joins ${b10Unit()}`), c); try { _recruit(id); } finally { note = n0; } save(); }; }

ROSTER_BOOKS.tcg = {
  get core(){ return B10_TH[b10Thread()].core; },
  bench:()=>b10Thread() === 't' ? ['pruss', 'brask', 'tegra', 'doss', 'wenna', 'mehet', 'ottar', ...B4_RECRUITS, ...HOC_NEW] : ['tirren', 'brennet', 'kaedra', 'ilsa', 'sorvan', ...B5_RECRUITS],
  home:id=>B10_HOME[id] || (b10Thread() === 't' ? 'the heavies\' baggage' : 'the brigades\' train'),
  wait:id=>(S.camp || []).includes(id) || (!!B10_DONE[id] && S.f[B10_DONE[id]] === 2),
  gone:id=>!!B10_DONE[id] && !b10CanRecruit(id) && !(S.camp || []).includes(id) && !b10In(id),
  open:()=>true,
  in:id=>{ if (B10_DONE[id]) S.f[B10_DONE[id]] = 1; },
  out:id=>{ if (B10_DONE[id]) S.f[B10_DONE[id]] = 2; }};

/* ---- the foes (canon sheet §3-§4, rules 100-103; v10.2 soak from base armour: 16-17 soak 1, 18+ soak 2). Two scales: the Third's at
   24-28, the Letherii's (an 'l' in the id) at 16-20. Field-strippers at the burial lines (Ch 1); thirst-mad stragglers in the glass
   (non-lethal in words: nobody in the column kills its own, rule 100); Bolkando deserters and starving foragers on the southern road;
   Kolansii outriders at the glass's far edge (Ch 5); and in the battles, the Kolansii (men and women, starved and driven, rule 103), the
   Shriven, and at most one of the Assail on a stretch ("the Assail" on screen; never a Pure, never a name, never "Watered" on screen).
   Bodies borrowed until the chapter art. The numbers are the engine's first guess; the balance step tunes them and goes to David. ---- */
Object.assign(FOES, {
  /* the Third's (24-28) */
  b10_scav:{name:'Field-stripper', kind:'b6_bandit', sig:'f', hp:44, ac:16, atk:17, dmg:[1,8,7], rng:1, mv:5, init:3, sk:['hitrun'], verb:'cuts at'},
  b10_scavbow:{name:'Stripper with a sling', kind:'b6_bandit', sig:'s', hp:34, ac:15, atk:17, dmg:[1,8,6], rng:6, mv:5, init:3, verb:'slings a stone at'},
  b10_scavchief:{name:'The strippers\' boss', kind:'b6_bandit', sig:'F', hp:84, ac:18, atk:18, dmg:[1,10,8], rng:1, mv:5, init:3, boss:true, sk:['rally'], verb:'cuts at'},
  b10_straggler:{name:'Straggler, mad with thirst', kind:'b2soldier', sig:'t', hp:40, ac:15, atk:16, dmg:[1,6,7], rng:1, mv:4, init:2, verb:'clubs at'},
  b10_ringleader:{name:'The stragglers\' ringleader', kind:'b2soldier', sig:'T', hp:80, ac:17, atk:17, dmg:[1,8,8], rng:1, mv:4, init:2, boss:true, sk:['shove'], verb:'clubs at'},
  b10_outrider:{name:'Kolansii outrider', kind:'b5_letherii', sig:'o', hp:46, ac:16, atk:17, dmg:[1,8,7], rng:1, mv:6, init:3, sk:['hitrun'], verb:'cuts at'},
  b10_kolansii:{name:'Kolansii soldier', kind:'b5_letherii', sig:'k', hp:48, ac:17, atk:18, dmg:[1,10,8], rng:1, mv:4, init:2, verb:'cuts at'},
  b10_kolbow:{name:'Kolansii archer', kind:'b5_letherii_bow', sig:'a', hp:36, ac:15, atk:18, dmg:[1,10,7], rng:6, mv:4, init:2, sk:['pin'], verb:'looses an arrow at'},
  b10_kolpike:{name:'Kolansii pikeman', kind:'b5_letherii', sig:'p', hp:54, ac:18, atk:18, dmg:[1,10,8], rng:1, mv:4, init:1, sk:['reach'], verb:'drives a pike at'},
  b10_kofficer:{name:'Kolansii officer', kind:'b5_letherii', sig:'K', hp:90, ac:19, atk:19, dmg:[1,12,9], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'cuts at'},
  b10_shriven:{name:'Shriven', kind:'b2soldier', sig:'S', hp:70, ac:19, atk:19, dmg:[1,12,9], rng:1, mv:4, init:2, dr:2, sk:['parry'], verb:'brings a blade down on'},
  b10_assail:{name:'Assail', kind:'b3_barghast', sig:'A', hp:190, ac:20, atk:21, dmg:[2,10,10], rng:1, mv:5, init:3, dr:3, boss:true, sk:['reach', 'daze'], verb:'strikes at'},
  /* the Letherii's (16-20) */
  b10_lbolkando:{name:'Bolkando deserter', kind:'b6_bandit', sig:'b', hp:30, ac:14, atk:12, dmg:[1,8,5], rng:1, mv:5, init:3, sk:['hitrun'], verb:'cuts at'},
  b10_lbolkandobow:{name:'Deserter bowman', kind:'b6_bandit', sig:'w', hp:24, ac:13, atk:12, dmg:[1,8,5], rng:6, mv:5, init:3, verb:'looses an arrow at'},
  b10_lbolkandochief:{name:'Deserters\' captain', kind:'b6_bandit', sig:'B', hp:58, ac:16, atk:13, dmg:[1,10,6], rng:1, mv:5, init:3, boss:true, sk:['rally'], verb:'cuts at'},
  b10_ldog:{name:'Half-wild dog', kind:'b5_c7_greatwolf', sig:'d', hp:22, ac:13, atk:11, dmg:[1,6,4], rng:1, mv:7, init:4, verb:'bites'},
  b10_lforager:{name:'Starving forager', kind:'b6_bandit', sig:'g', hp:28, ac:13, atk:11, dmg:[1,6,5], rng:1, mv:5, init:3, sk:['hitrun'], verb:'swings a hook at'},
  b10_lforagerchief:{name:'Foragers\' headman', kind:'b6_bandit', sig:'G', hp:56, ac:15, atk:12, dmg:[1,10,6], rng:1, mv:5, init:2, boss:true, sk:['rally'], verb:'swings a hook at'},
  b10_lstraggler:{name:'Straggler, mad with thirst', kind:'b2soldier', sig:'t', hp:28, ac:13, atk:11, dmg:[1,6,5], rng:1, mv:4, init:2, verb:'clubs at'},
  b10_lringleader:{name:'The stragglers\' ringleader', kind:'b2soldier', sig:'T', hp:56, ac:15, atk:12, dmg:[1,8,6], rng:1, mv:4, init:2, boss:true, sk:['shove'], verb:'clubs at'},
  b10_lkolansii:{name:'Kolansii soldier', kind:'b5_letherii', sig:'k', hp:36, ac:15, atk:12, dmg:[1,10,5], rng:1, mv:4, init:2, verb:'cuts at'},
  b10_lkolbow:{name:'Kolansii archer', kind:'b5_letherii_bow', sig:'a', hp:26, ac:13, atk:12, dmg:[1,8,5], rng:6, mv:4, init:2, sk:['pin'], verb:'looses an arrow at'},
  b10_lkolpike:{name:'Kolansii pikeman', kind:'b5_letherii', sig:'p', hp:40, ac:16, atk:12, dmg:[1,10,5], rng:1, mv:4, init:1, sk:['reach'], verb:'drives a pike at'},
  b10_lkofficer:{name:'Kolansii officer', kind:'b5_letherii', sig:'K', hp:70, ac:17, atk:13, dmg:[1,12,6], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'cuts at'},
  b10_lshriven:{name:'Shriven', kind:'b2soldier', sig:'S', hp:52, ac:17, atk:13, dmg:[1,10,6], rng:1, mv:4, init:2, dr:1, sk:['parry'], verb:'brings a blade down on'},
  b10_lassail:{name:'Assail', kind:'b3_barghast', sig:'A', hp:130, ac:18, atk:14, dmg:[2,8,7], rng:1, mv:5, init:3, dr:2, boss:true, sk:['reach', 'daze'], verb:'strikes at'},
  /* on the squad's side, in a fight's allies:[[id, x, y]]: a Bonehunter regular with the Third; a Letherii spear of the line with the Letherii */
  b10_regular:{name:'Regular of the Bonehunters', kind:'b2soldier', sig:'r', hp:40, ac:17, atk:16, dmg:[1,10,5], rng:1, mv:4, init:1, verb:'cuts at'},
  b10_lspear:{name:'Spear of the line', kind:'b5_letherii', sig:'e', hp:26, ac:15, atk:9, dmg:[1,8,3], rng:1, mv:4, init:1, verb:'drives a spear at'},
});
const b10Kolansii = u => !!(u && u.side === 'e' && /^b10_l?(kolansii|kolbow|kolpike|kofficer|outrider)/.test(String(u.id || '')));
const b10Assail = u => !!(u && u.side === 'e' && /^b10_l?assail/.test(String(u.id || '')));
/* the allies grow with the squad, as Book Nine's do */
{ const _mkAlly = mkAlly; mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y);
    if (['b10_regular', 'b10_lspear'].includes(k)) { u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); u.b10reg = true; } return u; }; }
/* the Fourth over the ridge (Chapter 7): its sergeant and its first living squadmates, at the Fourth's own level, as allies. Each is made a
   FOES row on the fly (b10_4_<id>) so mkAlly can build it; the Fourth's sergeant borrows a Malazan soldier's body. B10_FOURTH_N: how many come
   onto the stretch (a knob for the balance step; David rules). b10FourthAllies(x, y) -> [[id, x, y], ...] for a battle's allies list. */
const B10_FOURTH_N = 3;
function b10FourthRow(id){ const f = (S && S.b10f) || b10FourthHalf(null), lvl = f.lvl || B10_FOURTH_LVL, L = lvl - 1;
  if (id === 'sgt') return {name:f.name ? `Sergeant ${f.name}, of the Fourth` : 'The Fourth\'s sergeant', kind:'b2soldier', sig:'4', col:'#c8a46a', hp:22 + L * 4, ac:15 + lvAc(lvl), atk:4 + L, dmg:[1,10,2 + lvDmg(lvl)], rng:1, mv:4, init:2, verb:'cuts at'};
  const t = TPL[id]; if (!t) return null;
  return {name:t.name, kind:id, sig:t.sig, col:t.col, hp:t.hp + L * 4, ac:t.ac + lvAc(lvl), atk:t.atk + L, dmg:t.dmg ? [t.dmg[0], t.dmg[1], (t.dmg[2] || 0) + lvDmg(lvl)] : [1,6,lvDmg(lvl)], rng:t.rng || 1, mv:t.mv || 4, init:t.init || 1, verb:VERB[id] || 'strikes at'}; }
function b10FourthAllies(x = 1, y = 1){ const f = (S && S.b10f) || b10FourthHalf(null), dead = f.dead || {};
  const ids = ['sgt', ...(f.squad || []).filter(k => k !== 'sgt' && TPL[k] && !dead[k])].slice(0, B10_FOURTH_N);
  return ids.map((id, i) => { const k = 'b10_4_' + id, row = b10FourthRow(id); if (!row) return null; FOES[k] = row; return [k, x + i, y]; }).filter(Boolean); }
const b10FourthName = () => { const f = S && S.b10f; return f && f.name ? `Sergeant ${f.name}` : 'the Fourth\'s sergeant'; };

/* ---- Book Ten's balance tables (the Nov 6 targets; tools/balance.mjs, bot 'smart', Tue Nov 10, 2026, 8:30 PM PST; pending David's approval).
   B10SOLDIER rows join SOLDIER_FIGHT; B10GAP is Bridgeburner's per-fight boost, as B9GAP; B10GAP_ROW stays null (every b10 fight has a row). ---- */
const B10SOLDIER = {
  // b10_c1_strippers: no row, 100% won, 8% health lost (first or survive fight)
  b10_c1_graves:{ac:10, atk:11, hp:6.25, dmg:13}, // 95% won, 25% health lost (20 runs)
  // b10_c1_spar: no row, 100% won, 6% health lost (first or survive fight)
  // b10_c2_spar: no row, 100% won, 3% health lost (first or survive fight)
  b10_c2_deserters:{ac:5, atk:5, hp:3.5, dmg:7}, // 95% won, 34% health lost (20 runs)
  b10_c2_dogs:{ac:5, atk:6, hp:3.75, dmg:8}, // 90% won, 40% health lost (20 runs)
  b10_c3_wagon:{ac:9, atk:9, hp:5.5, dmg:11}, // 95% won, 21% health lost (20 runs)
  // b10_c3_traces: no row, 100% won, 7% health lost (first or survive fight)
  b10_c4_foragers:{ac:7, atk:7, hp:4.5, dmg:9}, // 95% won, 27% health lost (20 runs)
  b10_c4_night:{ac:10, atk:10, hp:6.0, dmg:12}, // 95% won, 29% health lost (20 runs)
  b10_c4_dogs:{ac:8, atk:9, hp:5.25, dmg:11}, // 90% won, 43% health lost (20 runs)
  b10_c5_stragglers:{ac:12, atk:13, hp:7.25, dmg:15}, // 90% won, 24% health lost (20 runs)
  b10_c5_outriders:{ac:9, atk:9, hp:5.5, dmg:11}, // 85% won, 27% health lost (20 runs)
  b10_c6_beach:{ac:5, atk:5, hp:3.5, dmg:7}, // 100% won, 42% health lost (20 runs)
  b10_c6_line:{ac:3, atk:4, hp:2.75, dmg:6}, // 95% won, 41% health lost (20 runs)
  // b10_c6_open: no row, 100% won, 5% health lost (first or survive fight)
  b10_c7_picket:{ac:6, atk:6, hp:4.0, dmg:8}, // 85% won, 31% health lost (20 runs)
  // b10_c7_morning: no row, 100% won, 4% health lost (first or survive fight)
  b10_c7_line:{ac:5, atk:5, hp:3.25, dmg:7}, // 85% won, 33% health lost at hp 3.5 (20 runs); hp 3.25 keeps the foe within 1.1x Bridgeburner's (fightrow_test)
};
Object.assign(SOLDIER_FIGHT, B10SOLDIER);
let B10GAP_ROW = null;
const B10GAP = {
  b10_c1_strippers:{ac:5, atk:6, hp:3.75, dmg:8}, // 75% won, 47% health lost (20 runs)
  b10_c1_graves:{ac:7, atk:7, hp:4.75, dmg:10}, // 70% won, 46% health lost (30 runs)
  b10_c1_spar:{ac:20, atk:20, hp:11.0, dmg:22}, // 100% won, 39% health lost (20 runs)
  b10_c2_spar:{ac:20, atk:20, hp:11.0, dmg:22}, // 100% won, 69% health lost (20 runs)
  b10_c2_deserters:{ac:3, atk:3, hp:2.75, dmg:6}, // 87% won, 46% health lost (30 runs)
  b10_c2_dogs:{ac:4, atk:4, hp:3.25, dmg:6}, // 83% won, 49% health lost (30 runs)
  b10_c3_wagon:{ac:6, atk:6, hp:4.0, dmg:8}, // 70% won, 41% health lost (20 runs)
  b10_c3_traces:{ac:20, atk:20, hp:11.0, dmg:22}, // 100% won, 39% health lost (20 runs)
  b10_c4_foragers:{ac:5, atk:6, hp:3.75, dmg:8}, // 70% won, 57% health lost (20 runs)
  b10_c4_night:{ac:8, atk:8, hp:5.25, dmg:11}, // 77% won, 60% health lost (30 runs)
  b10_c4_dogs:{ac:6, atk:6, hp:4.25, dmg:8}, // 70% won, 62% health lost (30 runs)
  b10_c5_stragglers:{ac:9, atk:10, hp:5.75, dmg:12}, // 75% won, 43% health lost (20 runs)
  b10_c5_outriders:{ac:6, atk:7, hp:4.25, dmg:9}, // 70% won, 43% health lost (20 runs)
  b10_c6_beach:{ac:3, atk:4, hp:2.75, dmg:6}, // 65% won, 67% health lost (20 runs)
  b10_c6_line:{ac:2, atk:3, hp:2.25, dmg:5}, // 83% won, 53% health lost (30 runs)
  b10_c6_open:{ac:20, atk:20, hp:11.0, dmg:22}, // 100% won, 58% health lost (20 runs)
  b10_c7_picket:{ac:4, atk:4, hp:3.0, dmg:6}, // 77% won, 48% health lost (30 runs)
  b10_c7_morning:{ac:20, atk:20, hp:11.0, dmg:22}, // 100% won, 22% health lost (20 runs)
  b10_c7_line:{ac:3, atk:3, hp:2.5, dmg:5}, // 75% won, 36% health lost (20 runs)
};
const b10Gap = () => { if (!b10On() || (S.diff || 'soldier') !== 'bridgeburner') return null; const id = B && B.id; return (id && B10GAP[id]) || (id && /^b10_/.test(id) ? B10GAP_ROW : null); };
{ const _mkFoe = mkFoe;
  mkFoe = function(k, x, y, extra){ const u = _mkFoe(k, x, y, extra); const g = b10Gap(); if (!g) return u;
    u.ac = (u.ac || 10) + (g.ac || 0); u.atk = (u.atk || 0) + (g.atk || 0); u.maxhp = u.hp = Math.max(1, Math.round(u.maxhp * (g.hp || 1)));
    if (u.dmg) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + (g.dmg || 0)]; if (g.mv) u.mv = (u.mv || 4) + g.mv; return u; }; }

/* ---- the words Book Ten throws at you. Bound by tcg-canon §4 and rules 98-111: the Glass Desert by name; the chained god by the
   soldiers' word; the Assail by the soldiers' word; the lizard-folk; "a Malazan Host"; Brys "the Commander" ---- */
const b10Saw = t => () => !!S && (S.chapter || 0) >= t;
GLOSSX.tcg = [
  [0, 'Witness', 'What the squad still believes it marches for, when nobody has said. Some days it is each other. Some days it is a saying the sergeants repeat. Some days there is nothing, and the squad walks anyway.'],
  [0, 'Kolanse', 'The country east of the Wastes, where the Adjunct is marching. A drought there, years long; thin soil, empty granaries, and people who have been hungry so long they have stopped saying so.'],
  [0, 'The chained god', 'What the soldiers call the god the Adjunct means to free, when they call it anything. Camp word says that is the reason for all of it. Not one of the squad has seen a chain.'],
  [0, 'The Assail', 'Who holds Kolanse, by the soldiers\' word: tall, pale, and very hard to kill. The mages call them something else and do not like saying it.'],
  [0, 'The heavies', 'The army\'s heavy infantry: scale, big swords, and a habit of not moving. The Third marches with them. When the beasts die, the heavies take the traces.', ()=>b10Thread() === 't'],
  [0, 'Docks', 'Letherii coin. Out here, no one will take it. The squad counts it anyway.', ()=>b10Thread() === 'l'],
  [0, 'The Commander', 'Brys Beddict, who commands the Letherii army: seen far off, at the head of the column, on a tired horse.', ()=>b10Thread() === 'l'],
  [0, 'The Glass Desert', 'The waste between the Wastes and Kolanse: no water, nothing living, and the ground underfoot gone to glass that cuts boots and catches the stars at night. The army crosses it by night.', ()=>b10Crossing() || b10Saw(3)()],
  [0, 'The lizard-folk', 'The great scaled things that marched out of the Wastes after the battle with the short-tails and joined the allies. The ranks have no word for them. A Letherii officer has one and uses it once.', ()=>b10Thread() === 'l' || b10Saw(2)()],
  [0, 'The Grey Helms', 'Foreign knights in grey, marching ahead of the Letherii toward Kolanse, faster than anyone needs to.', ()=>b10Thread() === 'l' || b10Saw(4)()],
  [3, 'Night marches', 'How the army crosses the glass: march in the dark, lie up under whatever shade there is by day, and count the water every time the column halts.', b10Saw(3)],
  [4, 'The long way round', 'The allies\' road: south of the glass and east along it to Kolanse City, behind the Bolkando and the Grey Helms. Longer, with water in it, and every horse in the train dying slowly.', b10Saw(4)],
  [6, 'The King\'s ships', 'Supply ships out of Letheras, come round by sea to meet the allied army on the Kolanse coast, with food, water, and some very large passengers.', b10Saw(6)],
  [7, 'A Malazan Host', 'Another Malazan army, out of nowhere, over a ridge, at the end. The Third can\'t say whose. Some of it was on the Third\'s stretch before anyone could ask.', b10Saw(7)],
  [7, 'The barrows', 'Where the army buried its dead after the last battle, in Kolanse, in long mounds. The squads stood at the edge.', ()=>!!(S && S.chapters && S.chapters[7] != null)],
];

/* ---- the journal, the count and Deeds ---- */
{ const _jn = journalNotes; journalNotes = function(){ const out = _jn(); if (!b10On()) return out;
    const o = S.th && S.th[b10Other()], t = b10Thread() === 't', n = b10Wit();
    const where = t ? (b10TRoad() === 'south' ? 'The Third, with the Letherii column, the long way round' : 'The Third, with the Bonehunters\' heavies, crossing the glass') : (b10LRoad() === 'adjunct' ? 'The Sixth Company\'s squad, crossing the glass with the Malazans' : 'The Sixth Company\'s squad, in the Commander\'s brigades, the long way round');
    out.unshift(`${where}. Witness: ${n} of ${B10_WITMAX}, ${B10_WITW[b10WitTier(n)]}.${o ? ` ${b10Other() === 't' ? 'The Third' : 'The Letherii squad'} (Sergeant ${esc(o.name)}) is ${b10TRoad() === 'south' || b10LRoad() === 'adjunct' ? 'in the same column, somewhere' : 'on the other road'}, at level ${o.lvl}.` : ''}`);
    return out; }; }
{ const _sr = statsRows; statsRows = function(s){ const r = _sr(s); if (!s || s.book !== 'tcg') return r; const st = s.stats || {};
    const cur = s.b10w || {}, oth = (s.th && Object.values(s.th)[0] && Object.values(s.th)[0].b10w) || null;
    r.push(['Witness, now', `${cur.n ?? B10_WIT0} of ${B10_WITMAX}`], ['Witness, at its lowest', Math.min(cur.lo ?? B10_WIT0, oth ? (oth.lo ?? B10_WIT0) : 10)], ['Beats kept', st.b10Kept || 0], ['Beats doubted', st.b10Doubt || 0], ['Thirst', st.b10Thirst || 0]); return r; }; }
function b10DeedsExtra(mine){ const lows = mine.filter(({s}) => s.b10w).map(({s}) => Math.min(s.b10w.lo ?? B10_WIT0, ...Object.values(s.th || {}).map(h => (h && h.b10w && h.b10w.lo) ?? 10))), fin = mine.filter(({s}) => bookDone(s)).length;
  const kept = mine.reduce((a, {s}) => a + (((s.stats || {}).b10Kept) || 0), 0), top = mine.filter(({s}) => s.b10w).map(({s}) => Math.max(s.b10w.hi ?? B10_WIT0, ...Object.values(s.th || {}).map(h => (h && h.b10w && h.b10w.hi) ?? 0)));
  const rows = [['Witness at its lowest, across every sergeant', lows.length ? `${Math.min(...lows)} of ${B10_WITMAX}` : 'Not yet'], ['Witness at its highest', top.length ? `${Math.max(...top)} of ${B10_WITMAX}` : 'Not yet'], ['Beats kept', kept || 'Not yet'], ['Came through to the end', fin || 'Not yet']];
  return `<h4 class="jh">Witness</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }

/* the chapters' titles (Claude's call; the canon sheet fixes the places), keys and their defaults (the bot and a rebuild use these).
   Chapter 7's keys are the Third's endings; the Letherii's ending is S.f.b10_lethRoad, set at Chapter 6's dusk; the Fourth's is
   S.f.b10_fourthRoad, set in Chapter 7. The last book: the roads are endings, not imports. */
const B10CH = {1:'Missing Is Not Dead', 2:'The Parting', 3:'Night Marches', 4:'The Long Way Round', 5:'The Last Water', 6:'The Feint', 7:'Over the Ridge'};
const B10KEYS = {1:['names', 'water'], 2:['watch', 'count'], 3:['haul', 'cut'], 4:['horses', 'pace'], 5:['give', 'hold'], 6:['hold', 'carry'], 7:['colours', 'kolanse', 'home']};
const B10KEY0 = {1:'names', 2:'watch', 3:'haul', 4:'horses', 5:'give', 6:'hold', 7:'colours'};
const B10_LETHROADS = ['letheras', 'kolanse', 'free'];
const B10_FOURTHROADS = ['host', 'third', 'home'];
const b10Key = n => (S && S.f && S.f[`b10_c${n}_key`]) || (S && S.chapters && S.chapters[n]) || null;
const b10LethRoad = () => B10_LETHROADS.includes(S && S.f && S.f.b10_lethRoad) ? S.f.b10_lethRoad : null;
const b10FourthRoad = () => B10_FOURTHROADS.includes(S && S.f && S.f.b10_fourthRoad) ? S.f.b10_fourthRoad : null;
/* the endings' names and one line each, for the coda and any page that needs them (the chapters write the full pages) */
const B10_ENDW = {
  t:{colours:['With the colours', 'The Third stayed with what was left of the army, wherever it goes now.'], kolanse:['In Kolanse', 'The Third stayed in Kolanse when the army left, to dig wells in a country that had forgotten what rain was for.'], home:['Time served', 'The Third put its names on the time-served list, and went down to the coast for a ship home.']},
  l:{letheras:['Home to Letheras', 'The Sixth Company went home with the Commander\'s brigades, on the King\'s ships, to a city that had not decided what to make of them.'], kolanse:['In Kolanse', 'The Sixth Company stayed in Kolanse when the brigades sailed, with the horses that were left and a country that needed them.'], free:['Out', 'The Sixth Company came out of the army at the coast, every name on the list, and went its own ways.']},
  f:{host:['With the Host', 'The Fourth went back to the Host that brought it over the ridge, and goes where it goes.'], third:['With the Third', 'The Fourth stayed with the Third, which nobody had planned and nobody argued with.'], home:['Home', 'The Fourth went home, again, and this time meant it.']}};

/* ---- the backdrops: each borrows an earlier book's drawing until the chapter art replaces it (Book Nine's pattern, 160) ---- */
const B10_SCENE_LIKE = {b10_camp:'b9_camp_night', b10_camp_night:'b9_camp_night', b10_burial:'b9_retreat', b10_glass:'b9_wastes', b10_glass_night:'b9_wastes_night', b10_traces:'b9_column',
  b10_south:'b9_column', b10_south_night:'b9_wastes_night', b10_train:'b9_wagons', b10_coast:'b2_harbour_night', b10_field:'b9_line', b10_battle:'b9_battle', b10_lake:'b9_wastes_night',
  b10_kolanse:'b9_wastes', b10_ridge:'b9_line', b10_barrows:'b9_retreat'};
Object.assign(SCENES, {
  b10_camp:{loc:'The Wastes\' edge', sub:'The camp after the short-tails', cap:'Tents in their rows with gaps in them, the wounded in the long tents, and the allies\' columns coming in on the horizon.', amb:'explore'},
  b10_camp_night:{loc:'The Wastes\' edge', sub:'The camp · night', cap:'Small fires, the long tents lit from inside, and somebody at every fire counting names.', amb:'explore'},
  b10_burial:{loc:'The Wastes\' edge', sub:'The burial lines', cap:'Long trenches in the dry ground, spades going, and a clerk with a slate at each one.', amb:'explore'},
  b10_glass:{loc:'The Glass Desert', sub:'Lying up by day', cap:'Glass to the horizon, every edge of it throwing the sun back, and the column under its cloaks waiting for dark.', amb:'explore'},
  b10_glass_night:{loc:'The Glass Desert', sub:'The night march', cap:'Stars overhead and the same stars underfoot in the glass, and the column walking between them without a light.', amb:'explore'},
  b10_traces:{loc:'The Glass Desert', sub:'The wagons, in the traces', cap:'A supply wagon with no oxen, and heavies in the harness where the oxen were.', amb:'explore'},
  b10_south:{loc:'South of the glass', sub:'The long way round', cap:'A column in poor shape on a road that is mostly an idea, the Bolkando ahead and the Grey Helms\' dust ahead of them.', amb:'explore'},
  b10_south_night:{loc:'South of the glass', sub:'The column\'s camp · night', cap:'The brigades\' fires in a long line, the horse-lines quiet, and a farrier\'s lamp still going.', amb:'explore'},
  b10_train:{loc:'South of the glass', sub:'The supply train', cap:'Wagons, water barrels, and horses with their heads down, and the clerks counting all three.', amb:'explore'},
  b10_coast:{loc:'The Kolanse coast', sub:'The King\'s ships', cap:'Ships at anchor off a grey beach, boats coming in loaded, and on the sand a line of crates longer than the column.', amb:'explore'},
  b10_field:{loc:'Before Kolanse City', sub:'The allied line', cap:'A long line of shields on open ground, the Kolansii line across from it, and the city beyond them both.', amb:'explore'},
  b10_battle:{loc:'Kolanse', sub:'The battle', cap:'Dust, smoke, the noise of shields, and a line that has to hold a little longer.', amb:'battle'},
  b10_lake:{loc:'The Glass Desert', sub:'Wet ground', cap:'The glass going dark underfoot, then wet, then water, and the whole column stopping to look at it.', amb:'explore'},
  b10_kolanse:{loc:'Kolanse', sub:'Out of the glass', cap:'Thin fields, empty granaries, and dust where there should be grass, and people at the field-edges watching an army come out of the desert.', amb:'explore'},
  b10_ridge:{loc:'Kolanse', sub:'The regulars\' line', cap:'A stretch of the line far from anyone\'s banner, a ridge behind the enemy, and a hill far off with smoke over it.', amb:'battle'},
  b10_barrows:{loc:'Kolanse', sub:'The barrows', cap:'Long mounds of new earth in rows, the army standing at the edge of them, and nobody talking.', amb:'explore'},
});
Object.entries(B10_SCENE_LIKE).forEach(([k, like]) => { SCENEX[k] ??= (cv, t) => (SCENEX[like] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); });
/* the chapter card falls back by squad when a chapter names no scene: the camp in Ch 1-2, then the glass or the southern road */
{ const _sci = showChapterIntro; showChapterIntro = function(){ const r = _sci(); const CH = CHAPTERS[S && S.chapter];
    if (b10On() && CH && !(CH.intro && CH.intro.scene)) { G.sceneKind = (S.chapter || 0) <= 2 ? 'b10_camp' : b10Crossing() ? 'b10_glass_night' : 'b10_south'; AUDIO.setScene(sceneAmb(G.sceneKind, 'explore')); } return r; }; }
{ const _endBeat = endBeat; endBeat = function(won){ const r = _endBeat(won); if (b10L() && B && B.banner && !won) B.banner.txt = 'The squad is down'; return r; }; }

/* ============ the finale and the series coda (plan, settled 4) ============
   Book Ten's own finale is 037's (CHAPTERS[7].finale; Chapter 7 writes it), with any extra pages Chapter 7 adds through B10FIN.extra (the
   Letherii's road and pages, the Fourth's), put in before 037's end page. After the end page comes the series coda: an opening page, one
   page per squad from every finished book on this device (the roster's saves, read the way the title reads them), and the credits last.
   Each squad's page is built from data its book already has: the road it took (that book's own Chapter 7 end line, CHEND[7][key], or the
   second squad's road from B10_ROAD2), who walked off the last page, who did not. Where a book has nothing to read, a neutral line.
   Chapter 7 draws its own extra pages in a showFinale wrapper for kinds starting 'b107'; this file draws 'b10c…' kinds. ---- */
const B10FIN = {extra:null};
const B10CODA_MAX = 40; // squads; past this the credits page counts the rest
/* the second squad's roads in the two-squad books, by the words those books gave them (107, 127, 167; and Book Ten's own) */
const B10_ROAD2 = {
  bh:{key:'b6_fourthRoad', t:'h', unit:'Fourth', vals:{highfist:['With the High Fist', 'The Fourth marched on with Onearm\'s Host, which is the High Fist\'s Host now.'], hanarara:['The Hanar Ara road', 'The Fourth stayed behind as the picket on the Hanar Ara road, for a while.'], home:['The road home', 'The Fourth went home, down to the coast and onto a ship west.']}, d:'highfist'},
  rg:{key:'b7_lethRoad', t:'l', unit:'Sixth', vals:{army:['The army', 'The Sixth Company stayed a company of the army of the new Lether.'], palace:['The palace', 'The Sixth Company went into the Palace Guard of the new emperor.'], free:['Out', 'The Sixth Company went out of the army.']}, d:'army'},
  dod:{key:'b9_lethRoad', t:'l', unit:'Sixth', vals:{escort:['With the Commander', 'The Sixth Company stayed with the Commander\'s brigades.'], adjunct:['East, with the foreigners', 'The Sixth Company went on east with the foreigners.'], home:['Home to Lether', 'The Sixth Company went home to Lether when there was a way home.']}, d:'escort'},
  tcg:{key:'b10_lethRoad', t:'l', unit:'Sixth', vals:Object.fromEntries(Object.entries(B10_ENDW.l)), d:'letheras'}};
/* the squad's own name in each book: the first squad (the one on top of a save that finished), and the second (in o.th) */
const B10_UNIT1 = {gotm:'Fourth', dg:'Third', moi:'Fourth', hoc:'Third', mt:'Sixth', bh:'Third', rg:'Third', tth:'Fourth', dod:'Third', tcg:'Third'};
const b10NameList = ids => { const n = ids.map(id => TPL[id] ? TPL[id].name : null).filter(Boolean); return n.length < 2 ? n.join('') : `${n.slice(0, -1).join(', ')} and ${n[n.length - 1]}`; };
/* every finished save on the device, Book One first; the current save (if finished) stands for its own slot */
function b10CodaSaves(){ const out = [], seen = new Set();
  try { roster().list.forEach(e => { if (!e || !e.id || seen.has(e.id)) return; seen.add(e.id); const o = S && S.sid === e.id ? S : loadSlot(e.id); if (o && bookDone(o) && BOOKS[bookOf(o)]) out.push({o, upd:e.upd || 0}); }); } catch(e) { /* a device with no roster */ }
  if (S && bookDone(S) && !seen.has(S.sid)) out.push({o:S, upd:Date.now()});
  return out.sort((a, b) => BOOKS[bookOf(a.o)].n - BOOKS[bookOf(b.o)].n || b.upd - a.upd).map(x => x.o); }
/* one page's data for one squad: {book, unit, sgt, road:[title, line], walked:[ids], fell:[ids], wit} */
function b10CodaHalf(o, h, unit, road, extra){ const dead = h.dead || {}, own = id => !(dead[id] && dead[id].from); // the dead this squad lost in this book
  const walked = [...new Set([...(h.squad || []), ...(h.camp || [])])].filter(id => id !== 'sgt' && TPL[id] && !dead[id]);
  const fell = Object.keys(dead).filter(id => TPL[id] && own(id));
  return Object.assign({book:bookOf(o), unit, sgt:h.name || '', road, walked, fell}, extra || {}); }
function b10CodaSquads(o){ const b = bookOf(o), out = [], E = (bookEnds(b)[7] || {}), key = o.chapters && o.chapters[7];
  const end1 = E[key] ? [String(E[key][0] || ''), String(E[key][1] || '')] : null;
  const top = o.thread && B10_ROAD2[b] && o.thread === B10_ROAD2[b].t ? Object.assign({}, o, (o.th && Object.values(o.th)[0]) || {}) : o; // the first squad, whichever half it sits in
  out.push(b10CodaHalf(o, top, B10_UNIT1[b] || 'Fourth', end1, b === 'tcg' ? {wit:(top.b10w && top.b10w.n) ?? null} : null));
  const R = B10_ROAD2[b], h2 = R && o.th && o.th[R.t] ? o.th[R.t] : (R && o.thread === R.t ? o : null);
  if (R && h2 && h2 !== top) { const v = (o.f && o.f[R.key]) || R.d; out.push(b10CodaHalf(o, h2, R.unit, R.vals[v] || null, b === 'tcg' ? {wit:(h2.b10w && h2.b10w.n) ?? null} : null)); }
  if (b === 'tcg' && o.b10f) { const v = (o.f && o.f.b10_fourthRoad) || 'host'; out.push(b10CodaHalf(o, o.b10f, 'Fourth', B10_ENDW.f[v] || null)); }
  return out; }
function b10CodaPages(){ const all = []; b10CodaSaves().forEach(o => { try { b10CodaSquads(o).forEach(q => all.push(q)); } catch(e) { console.warn('coda', e); } }); return all; }
const B10_NEUTRAL = 'Whatever road it took at the end, nobody wrote it down. The squad was on it anyway.';
const B10_UNITP = {Fourth:'Fourth', Third:'Third', Sixth:'Sixth Company'};
function b10CodaWords(q){ const B = BOOKS[q.book] || BOOKS.gotm, u = B10_UNITP[q.unit] || 'squad', who = q.sgt ? `Sergeant ${q.sgt}'s ${u}` : `The ${u}`;
  const paras = [];
  paras.push(q.road ? `*${q.road[0]}.* ${q.road[1] || ''}`.trim() : B10_NEUTRAL);
  paras.push(q.walked.length ? `Walked off the last page: ${b10NameList(q.walked)}${q.sgt ? `, and the sergeant` : ''}.` : q.sgt ? 'Walked off the last page: the sergeant, and nobody else.' : 'Nobody on the roll walked off the last page that anyone wrote down.');
  if (q.fell.length) paras.push(`Did not: ${b10NameList(q.fell)}.`);
  if (q.wit != null && typeof q.wit === 'number') paras.push(`At the end, ${B10_WITW[b10WitTier(q.wit)]}.`);
  return {kicker:`Book ${B.word} · ${B.name}`, title:who, paras}; }
/* the opening page and the credits (the coda's narration: canon's answer, said only here, as "the story is": tcg-canon §9a and §10 Q6) */
const B10CODA_OPEN = [
  'The story is that at the barrows, at the very end, the Adjunct said the army would be forgotten, and that she did not regret it.',
  'The story is right about the army. Home will never learn these names. No one will put up a stone that says who held which stretch, or who came back for water, or who did not.',
  'The story is wrong about one thing. Somebody wrote them down.',
  'These are the ones this device remembers.'];
function b10CreditsWords(n, more){ const shelf = shelfBooks().sort((a, b) => a.n - b.n);
  return [`From the Ranks: ${rdUpT(shelf.length).toLowerCase()} books, each beside one of Steven Erikson's novels of the Malazan Book of the Fallen, in order, told by soldiers the novels never name.`,
    `${n ? `${rdUpT(n)} squad${n === 1 ? '' : 's'} on this device came through to the end of a book${more ? `, and ${more} more past what this page can hold` : ''}.` : 'No squad on this device has finished a book yet, apart from this one.'}`,
    'The Malazan world was created by Steven Erikson and Ian C. Esslemont, and it and its canon characters belong to them. With thanks to Steven Erikson for the Malazan Book of the Fallen, all ten of it, and to Ian C. Esslemont for the world they built together. The squads only walked beside it.',
    'For personal play.']; }
{ const _fp = finPages, _sf = showFinale;
  const mine = k => /^b10c/.test(k);
  finPages = function(){ const P = _fp(); if (!b10On()) return P;
    const iEnd = P.findIndex(p => p.k === 'end'); let add = [];
    try { add = typeof B10FIN.extra === 'function' ? (B10FIN.extra() || []) : []; } catch(e) { console.warn('finale', e); add = []; }
    if (add.length) P.splice(iEnd < 0 ? P.length : iEnd, 0, ...add);
    let Q = []; try { Q = b10CodaPages(); } catch(e) { console.warn('coda', e); Q = []; }
    const show = Q.slice(0, B10CODA_MAX), more = Math.max(0, Q.length - show.length);
    P.push({k:'b10copen'}, ...show.map(q => ({k:'b10coda', q})), {k:'b10credits', n:Q.length, more});
    return P; };
  showFinale = function(i = 0){ if (!b10On()) return _sf(i);
    const P = finPages(); i = clamp(i | 0, 0, P.length - 1); const pg = P[i]; if (!mine(pg.k)) return _sf(i);
    S.scene = 'finale'; S.finPage = i; S.node = null; save();
    view = 'finale'; $('#sheet').hidden = true; B = null; titleAnim = null; finAnim = null; AUDIO.setScene('end');
    let body = '';
    if (pg.k === 'b10copen') { G.sceneKind = SCENES.b10_barrows ? 'b10_barrows' : 'b9_retreat';
      body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">From the Ranks</div><h1 class="fin-title">The roll</h1><div class="narr">${B10CODA_OPEN.map(p => fmt(p)).join('')}</div>`; }
    else if (pg.k === 'b10coda') { const W = b10CodaWords(pg.q);
      body = `<div class="fin-k">${esc(W.kicker)}</div><h1 class="fin-title">${esc(W.title)}</h1><div class="narr">${W.paras.map(p => fmt(p)).join('')}</div>`; }
    else { const L = b10CreditsWords(pg.n || 0, pg.more || 0);
      body = `<div class="fin-k">The end of the series</div><h1 class="fin-title">${esc(BOOKS.tcg.name)}</h1><div class="narr">${L.slice(0, 2).map(p => fmt(p)).join('')}</div><p class="fine fin-credit">${esc(L[2])}</p><p class="fine">${esc(L[3])}</p>`; }
    const last = i === P.length - 1;
    toTop(); $('#app').innerHTML = `<div class="fin" id="fin">${body}
    <div class="fin-nav ${last ? 'last' : ''}"><button class="btn" id="fBack">Back</button><span class="fin-pg">${i + 1} / ${P.length}</span>${last ? `<button class="btn" id="fSq">The squad</button><button class="btn primary" id="fTitle">Title</button>` : `<button class="btn primary" id="fNext">Next</button>`}</div></div>`;
    window.scrollTo(0, 0);
    $('#fBack').onclick = () => { AUDIO.play('click'); finGo(-1); };
    if (last) { $('#fSq').onclick = () => { AUDIO.play('click'); openChars(0); }; $('#fTitle').onclick = () => { AUDIO.play('click'); showTitle(); }; }
    else $('#fNext').onclick = () => { AUDIO.play('click'); finGo(1); };
    let sx = null, sy = null; const el = $('#fin'); el.ontouchstart = e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    el.ontouchend = e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null; if (Math.abs(dx) > 70 && Math.abs(dy) < 50) { AUDIO.play('flip'); finGo(dx < 0 ? 1 : -1); } }; }; }
