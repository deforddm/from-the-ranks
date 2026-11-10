/* ============ Book Nine: Dust on the Boots, beside Dust of Dreams (v12.0 engine, 160) ============
   Two squads take turns in one long march east, as in Book Seven (120). The Third (thread 't', Book Seven's on the 'adjunct' road) marches
   with the Bonehunters' marines and heavies in Chapters 1, 3, 5, 7; Book Seven's Letherii (thread 'l', the Sixth Company, on the 'army'
   road) march in Brys's escort in Chapters 2, 4, 6. One save holds both: the squad not playing waits in S.th[thread]; startChapter swaps it
   in. Each squad keeps its own levels: the Third fresh at 19, cap 24; the Letherii fresh at 11, cap 16 (lvCap in 014 reads S.thread).
   The book's own system is Rations (each squad's own food and water, 0-10), with a little Witness (what the squad still marches for).
   Plan: docs/book9-dod-plan.md (David, Nov 9, 2026). Canon: docs/dod-canon.md (binding; hard limits §4, rules 84-97 in series-canon §(a)).
   Notes: docs/v12.0-notes.md. Brief: docs/dod-book-brief.md. Ids b9_, shelf 160-179, abbreviation 'dod'.
   The v10.0.2 rule: b9As(fn) switches S.book for a moment. Anything that asks which squad is playing asks BEFORE the switch, or inside it
   through b9Thread(), which remembers the squad for the length of the switch (b9AsT). */

const b9On = () => !!(S && S.book === 'dod');
const B9_CH = {1:'t', 2:'l', 3:'t', 4:'l', 5:'t', 6:'l', 7:'t'};  // which squad plays each chapter (plan, settled 1)
const B9_TH = {
  t:{book:'hoc', look:'dg', unit:'the Third', squad:'Third Squad, with the heavies', army:'the Bonehunters', who:'the Third, marching with the Bonehunters\' marines and heavies',
     core:['sgt', 'haddat', 'sathi', 'tangle', 'marrow'], fresh:['haddat', 'tangle', 'marrow', 'mirrel'], recruits:['brask', 'tegra'], lvl:19, cap:24},
  l:{book:'mt', look:'mt', unit:'the squad', squad:'Sixth Company, in the Letherii escort', army:'the Letherii escort', who:'the Sixth Company\'s squad, marching in Brys Beddict\'s escort',
     core:['sgt', 'tobet', 'thegg', 'perrit', 'ammet'], fresh:['tobet', 'thegg', 'perrit', 'ammet'], recruits:['brennet', 'kaedra'], lvl:11, cap:16}};
const B9_KEYS = ['name', 'squad', 'camp', 'loy', 'gear', 'picks', 'kit', 'tricks', 'inv', 'lvl', 'xp', 'dead', 'parked', 'wounds', 'injury', 'silver', 'picksDue', 'imported', 'trail', 'debt', 'debt0', 'b9r'];
let b9AsT = null; // the squad playing, remembered while b9As has S.book switched (the v10.0.2 rule)
const b9Thread = () => b9AsT || (S && S.book === 'dod' && S.thread) || 't';
const b9Other = () => b9Thread() === 't' ? 'l' : 't';
const b9L = () => b9On() && b9Thread() === 'l';            // the Letherii are playing
const b9Third = () => b9On() && b9Thread() === 't';        // the Third is playing
const b9Unit = (t = b9Thread()) => B9_TH[t].unit;
const b9In = id => !!(S && Array.isArray(S.squad) && S.squad.includes(id) && !(S.dead && S.dead[id]));
const b9OtherName = () => (S && S.th && S.th[b9Other()] && S.th[b9Other()].name) || 'the other sergeant';
const b9Coin = n => b9L() ? b5Coin(n) : `${n} silver`; // the Letherii count in docks; the Third in silver
const b9SgtLook = () => b9On() ? B9_TH[b9Thread()].look : null; // 018, 019: the Third wears Book Two's look (sgt_dg), the Letherii Book Five's (sgt_mt)
const b9KeyPre = 'b9_';
const b9ChCount = () => Object.keys(BOOK === 'dod' ? CHAPTERS : BOOKSNAP.dod.ch).length;

/* ---- the sergeants: Book Four's (the Third) and Book Five's (the Letherii), each with Book Nine's own lines on top ---- */
const B9_SGT = {
  t:{epithet:'Third squad, 9th Legion, with the Bonehunters\' heavies on the march east',
     get bio2(){ return 'The Fourteenth calls itself the Bonehunters now, and has stopped explaining why. After Letheras the squad was lent to the heavies, then kept by them, the way the army keeps anything that still works.\n\nThe Adjunct is marching east. She has not said why. You have stopped asking out loud, which is not the same as stopping.'; },
     get quest(){ const r = b9RatTier(); return r === 'full' || r === 'fed' ? 'East, behind the Adjunct, into country the maps leave blank. The squad eats. You mean to keep it that way for as long as the wagons last.'
       : 'East, behind the Adjunct, on half a ration and less. The squad still walks. You count the wagons every morning and do not say the number.'; }},
  l:{epithet:'Sixth Company, the Whitefinder Battalion, in the Letherii escort',
     get bio2(){ const d = typeof b5Debt === 'function' ? b5Debt('sgt') : null;
       return `The new emperor's law took the debts off the books. The paybook still has the old number in it${d != null ? `, ${b5Coin(d)}` : ''}, and you still read it, the way a man reads an old letter.\n\nThe Sixth Company marches in the escort now, behind the Malazans, east into the Wastes, because the Commander asked for soldiers who came back. The Errant still gets a prayer before everything. Out here he gets two.`; },
     get quest(){ return 'East with the escort, a day behind the foreigners and their dust. Lether is sending its soldiers somewhere nobody has a map for. The supply train is the only thing in the column you trust, and you count it twice.'; }}};
function b9SgtFor(t){ const snap = BOOKSNAP[B9_TH[t].book] && BOOKSNAP[B9_TH[t].book].sgt;
  if (snap) TPL.sgt = Object.defineProperties({}, Object.assign({}, snap, Object.getOwnPropertyDescriptors(B9_SGT[t])));
  if (typeof PORTRAIT_CACHE !== 'undefined') PORTRAIT_CACHE.clear(); }
/* swap the squad playing. Idempotent. The waiting squad's fields go into S.th[other]; shared: S.f, S.stats, S.chapter(s), S.diff, S.b9 (Witness) */
function b9Use(t){ if (!b9On() || !B9_TH[t]) return; S.th ??= {}; const cur = S.thread || 't';
  if (cur !== t && S.th[t]) { const out = {}; B9_KEYS.forEach(k => { out[k] = S[k]; }); S.th[cur] = out;
    B9_KEYS.forEach(k => { S[k] = S.th[t][k]; }); delete S.th[t]; }
  S.thread = t; b9SgtFor(t); }
{ const _setBook = setBook; setBook = function(b){ _setBook(b); if (b === 'dod' && S && S.book === 'dod') b9SgtFor(b9Thread()); }; }
/* run fn as if the squad's own earlier book were open ('hoc' for the Third, 'mt' for the Letherii), for a moment, synchronously; fn gets the
   squad's thread, read before the switch. b9Thread() still answers inside. */
function b9As(fn){ if (!b9On()) return fn(b9Thread()); const t = b9Thread(), was = S.book, wasT = b9AsT; S.book = B9_TH[t].book; b9AsT = t;
  try { return fn(t); } finally { S.book = was; b9AsT = wasT; } }

/* ---- the shelf ---- */
BOOKS.dod = {id:'dod', n:9, word:'Nine', title:'Dust of Dreams', name:'Dust on the Boots', h1:['Dust', 'on the Boots'], squad:'Two squads', unit:'the squad',
  tag:'Two squads march east out of Lether with an army that has not been told why. The road gets longer, and the rations get shorter.',
  titleArt:'title/dod', titleScene:'dod', patch:'insignia/dod',
  blurb:'The Wastes, months after Letheras, beside Dust of Dreams: the Third with the Bonehunters\' heavies, and Book Seven\'s Letherii in Brys\'s escort. A finished Book Seven carries both across.'};
Object.defineProperty(BOOKS.dod, 'coming', {configurable:true, get(){ return b9ChCount() === 0; }});
Object.defineProperty(BOOKS.dod, 'titleArt', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['title/dod'] ? 'title/dod' : 'title/rg'; }}); // until 160b paints the Wastes
Object.defineProperty(BOOKS.dod, 'patch', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['insignia/dod'] ? 'insignia/dod' : 'insignia/rg'; }});

/* ---- the transfers: a finished Book Seven save. Its Third on the 'adjunct' road (S.chapters[7]); its Letherii on the 'army' road
   (S.f.b7_lethRoad). One save holds both squads: the Third is on top when it played last (Chapter 7 is the Third's), else in o.th.t ---- */
const b9HalfOf = (o, t) => (o.thread || 't') === t ? o : Object.assign({}, o, (o.th && o.th[t]) || {}, {thread:t});
const b9QualT = o => !!(o && o.book === 'rg' && bookDone(o) && (o.chapters[7] ?? (o.f && o.f.b7_c7_key)) === 'adjunct');
const b9QualL = o => !!(o && o.book === 'rg' && bookDone(o) && o.f && o.f.b7_lethRoad === 'army');
function b9CarryT(o){ const h = b9HalfOf(o, 't'); return Object.assign(b6Carry(h), {from:h.name || o.name}); }
function b9CarryL(o){ const h = b9HalfOf(o, 'l'); return Object.assign(b7CarryL(h), {from:h.name || 'Brann'}); }
const b9ImpT = id => { const o = id && loadSlot(id); return b9QualT(o) ? b9CarryT(o) : null; };
const b9ImpL = id => { const o = id && loadSlot(id); return b9QualL(o) ? b9CarryL(o) : null; };
const b9ImpList = t => roster().list.filter(e => { const o = loadSlot(e.id); return t === 't' ? b9QualT(o) : b9QualL(o); });
const b9ImpName = (id, t = 't') => { const o = id && loadSlot(id); return o && (t === 't' ? b9QualT(o) : b9QualL(o)) ? String(b9HalfOf(o, t).name || (t === 't' ? 'Hask' : 'Brann')) : null; };
function b9ImpDesc(id, t = 't'){ const i = t === 't' ? b9ImpT(id) : b9ImpL(id), T = B9_TH[t];
  if (!i) return t === 't' ? 'A fresh start: Haddat, Tangle, Marrow and Mirrel, at level 19. Sathi fell at the Barrow.' : 'A fresh start: Tobet, Thegg, Perrit and Ammet, at level 11.';
  const went = i.mates.map(k => TPL[k].name), dead = i.dead.map(k => TPL[k].name);
  return `Sergeant ${esc(i.from)}'s ${t === 't' ? 'Third' : 'Letherii'}: ${went.length ? esc(went.join(', ')) : 'nobody else'}${dead.length ? `. ${esc(dead.join(' and '))} did not come through` : ''}. ${i.lvl < T.lvl ? `The months since bring them to level ${T.lvl}.` : `They keep level ${Math.min(i.lvl, T.cap)}.`}`; }

/* one squad's half of the save */
function b9Half(t, name, imp){ const T = B9_TH[t];
  const mates = imp ? imp.mates.slice(0, 5) : T.fresh.slice(), squad = ['sgt', ...mates];
  const lvl = clamp(Math.max(T.lvl, imp ? imp.lvl : 1), 1, T.cap);
  const half = {name, squad, camp:imp ? imp.mates.slice(5) : [], loy:{}, gear:imp ? imp.gear : {}, picks:imp ? imp.picks : {}, kit:imp ? imp.kit : [],
    tricks:imp ? imp.tricks : {}, inv:imp ? imp.inv : (t === 't' ? {sharper:2, burner:1, cusser:1, smoker:1, salve:3} : {sharper:0, burner:0, cusser:0, smoker:0, salve:2}),
    lvl, xp:LEVELS[lvl - 1] || 0, dead:{}, parked:{}, wounds:null, injury:null, silver:20, picksDue:[], debt:null, debt0:null,
    imported:imp ? {from:imp.from, sid:imp.sid, lvl:imp.lvl, mates:imp.mates.slice(), lifted:imp.lvl < T.lvl} : null,
    trail:[{x:4, y:8}, {x:6, y:8}, {x:4, y:9}, {x:5, y:9}], b9r:{n:B9_RAT0, lo:B9_RAT0, hi:B9_RAT0}};
  squad.forEach(k => { if (k !== 'sgt') half.loy[k] = imp ? (imp.loy[k] || 0) : 0; }); half.camp.forEach(k => { half.loy[k] = imp ? (imp.loy[k] || 0) : 0; });
  if (imp) imp.dead.forEach(k => { const d = imp.deadAt[k] || {}; half.dead[k] = {ch:d.ch || 7, where:d.where || '', from:d.from || 'rg'}; });
  else if (t === 't') half.dead.sathi = {ch:7, where:'The Barrow', from:'dg'}; // the fresh start, as Books Four, Six and Seven have it
  /* Debt is flavour, as in Book Seven: the Letherii keep the numbers their bios read, and nothing moves them */
  if (t === 'l') { const D0 = typeof B5_DEBT0 !== 'undefined' ? B5_DEBT0 : {};
    half.debt = imp && imp.debt ? imp.debt : Object.fromEntries(squad.filter(k => D0[k] != null).map(k => [k, D0[k]]));
    half.debt0 = imp && imp.debt0 ? imp.debt0 : Object.assign({}, half.debt); }
  return half; }
/* a new Book Nine save. nameT: the Third's sergeant; nameL: the Letherii sergeant. impT, impL: slot ids of Book Seven saves, or empty. */
function newStateDOD(nameT, nameL, impT, impL, sid){
  nameT = nameT || 'Hask'; nameL = nameL || 'Brann';
  const iT = b9ImpT(impT), iL = b9ImpL(impL), t = b9Half('t', nameT, iT), l = b9Half('l', nameL, iL);
  const s = Object.assign({v:1, book:'dod', sid:sid || (iT || iL ? newSid() : sidFor(nameT)), scene:'chintro', node:null, bg:null, card:null, f:{}, pos:{x:5, y:8}, log:[], ending:null,
    battle:null, bopt:null, chapter:0, chapters:{}, area:'pale', thread:'t', th:{l}, b9:{wit:{}}}, t);
  migrate(s); s.picksDue = picksOwed(s); s.th.l.picksDue = picksOwed(Object.assign({}, s, s.th.l, {thread:'l'}));
  return s; }

/* ---- Rations (plan, settled 2): each squad's own food and water, 0 to 10, in its half of the save (S.b9r = {n, lo, hi}).
   It starts at 6 for both ('fed'). Short rations cost health in a fight and the edge on checks; foraging, finds and choices refill it.
     b9Rations()            the number; b9RatTier(): 'starving' 0, 'hungry' 1-2, 'short' 3-4, 'fed' 5-7, 'full' 8-10 (B9_RATW holds the words).
     b9Ration(n, why)       moves it (n may be negative): noted with the reason and any tier change, clamped 0..10, tallied b9RatUp /
                            b9RatDown, HUD updated, saved; returns the new value.
     The engine's own move: the march eats. At the start of Chapters 3, 4 and 5 the playing squad loses 2, at 6 and 7 it loses 1 (once a
     chapter, flag b9_march<n>). Chapters 1 and 2 are in Letheras.
     In a fight: 'short' −5% maximum health for every squadmate, 'hungry' −10%, 'starving' −15% (allies are fed by their own wagons).
     On checks: a check with c.rations:true gets the edge "Rations": full +1, fed 0, short −1, hungry −2, starving −3. Any other check, while
     'hungry' or 'starving', gets "An empty belly" −1. ---- */
const B9_RAT0 = 6, B9_RATMAX = 10;
const B9_RATW = {starving:'nothing in the wagons', hungry:'half a ration and less', short:'short rations', fed:'the march ration', full:'full rations'};
const B9_MARCH = {3:-2, 4:-2, 5:-2, 6:-1, 7:-1};
const b9R = () => { if (!S) return {n:B9_RAT0, lo:B9_RAT0, hi:B9_RAT0}; if (!S.b9r || typeof S.b9r.n !== 'number') S.b9r = {n:B9_RAT0, lo:B9_RAT0, hi:B9_RAT0}; return S.b9r; };
const b9Rations = () => b9R().n;
const b9RatTier = (r = b9Rations()) => r >= 8 ? 'full' : r >= 5 ? 'fed' : r >= 3 ? 'short' : r >= 1 ? 'hungry' : 'starving';
const b9Hungry = () => ['hungry', 'starving'].includes(b9RatTier());
function b9Ration(n, why = ''){ if (!b9On() || !n) return b9Rations(); const st = b9R(), was = st.n, t0 = b9RatTier(was);
  st.n = clamp(was + n, 0, B9_RATMAX); const d = st.n - was; if (!d) return st.n; st.hi = Math.max(st.hi ?? was, st.n); st.lo = Math.min(st.lo ?? was, st.n);
  tally(d > 0 ? 'b9RatUp' : 'b9RatDown', Math.abs(d));
  note(`Rations ${d > 0 ? '+' : '−'}${Math.abs(d)}${why ? ` (${why})` : ''}: ${st.n} of ${B9_RATMAX}.`, d > 0 ? 'good' : 'bad');
  const t1 = b9RatTier(st.n); if (t1 !== t0) note(`${b9Unit() === 'the Third' ? 'The Third' : 'The squad'} is on ${B9_RATW[t1]} now.`, d > 0 ? 'good' : 'bad');
  if (typeof updChain === 'function') updChain(); save(); return st.n; }
const B9_RATHP = {short:.05, hungry:.1, starving:.15};
const B9_RATEDGE = {full:1, fed:0, short:-1, hungry:-2, starving:-3};
{ const _ef = edgesFor; edgesFor = function(c, id){ const out = _ef(c, id); if (!b9On() || !c) return out;
    const tier = b9RatTier();
    if (c.rations) { const k = B9_RATEDGE[tier]; if (k) out.push(['Rations', k]); }
    else if (tier === 'hungry' || tier === 'starving') out.push(['An empty belly', -1]);
    if (c.witness) { const f = b9Faith(); if (f) out.push(['Our own witness', f === 'kept' ? 1 : -1]); }
    return out; }; }
{ const _mkParty = mkParty; mkParty = function(id, x, y){ const u = _mkParty(id, x, y); const cut = b9On() && B9_RATHP[b9RatTier()];
    if (cut) { const full = u.hp >= u.maxhp, by = Math.max(1, Math.round(u.maxhp * cut)); u.maxhp = Math.max(1, u.maxhp - by); u.hp = full ? u.maxhp : Math.min(u.hp, u.maxhp); u.b9hungry = by; }
    return u; }; }
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt); if (!b9On() || !B) return r;
    const t = b9RatTier(); if (B9_RATHP[t]) blog(`<em>${t === 'short' ? 'Short rations.' : t === 'hungry' ? 'Half a ration and less.' : 'Nothing in the wagons.'}</em> Every squadmate starts this fight with ${Math.round(B9_RATHP[t] * 100)}% less health.`);
    if (B.log && CARDS[S.card] && CARDS[S.card].fx) blog(`<em>${CARDS[S.card].name}:</em> ${CARDS[S.card].fx}`);
    return r; }; }
/* the widget for a node's html, and the HUD pill beside the purse */
function rationsHTML(){ const r = b9Rations(), f = b9Faith();
  return `<div class="chainbox allybox" role="group" aria-label="Rations"><div class="crow"><span>Rations</span><b>${r} of ${B9_RATMAX} · ${esc(B9_RATW[b9RatTier()])}</b></div><div class="bar${r <= 4 ? ' col' : ''}"><i style="width:${Math.round(r / B9_RATMAX * 100)}%"></i></div>
    ${f ? `<div class="crow"><span>Witness</span><b>${f === 'kept' ? 'still marching for something' : 'marching because the column does'}</b></div>` : ''}</div>`; }
{ const _updChain = updChain;
  updChain = function(){ const el = typeof document !== 'undefined' && document.getElementById('chainp');
    if (!el || !S || S.book !== 'dod') return _updChain();
    const r = b9Rations(); el.innerHTML = `<span class="chainpill allypill"><span class="${r <= 4 ? 'dry' : ''}">Rations <b>${r}</b></span></span>`; }; }
{ const _updSilver = updSilver;
  updSilver = function(){ if (!b9L()) return _updSilver();
    const el = typeof document !== 'undefined' && document.getElementById('silver'); if (!el) return; const t = b5Coin(S.silver);
    if (el.textContent !== t) { el.textContent = t; if (silverShown != null && silverShown !== S.silver) { el.classList.remove('sup', 'sdown'); void el.offsetWidth; el.classList.add(S.silver > silverShown ? 'sup' : 'sdown'); } }
    silverShown = S.silver; updChain(); }; }

/* ---- Witness (plan, settled 2: "a little"): what the squad still believes it marches for. One beat in each of Chapters 3 to 7, in that
   chapter's key scene or at its fire, answered 'kept' (they still march for something: the squad, the Adjunct's word, their own witness)
   or 'doubt' (they march because the column does). Shared S.b9.wit = {c3:'kept', …}; each beat belongs to its chapter's squad (B9_CH).
     b9Wit(v, why, n = S.chapter)   records the beat once (the first answer stands); noted; tallied b9Kept / b9Doubt.
     b9Witness(t)                   {kept, doubt} for a squad (the playing one by default).
     b9Faith(t)                     'kept' if kept ≥ doubt and at least one kept, 'doubt' if doubt > kept, null before any beat.
     A check with c.witness:true gets the edge "Our own witness": +1 kept, −1 doubt. Ch 6's road and Ch 7's key read b9Faith(). ---- */
const B9WIT = {3:'t', 4:'l', 5:'t', 6:'l', 7:'t'};
const B9_WITV = ['kept', 'doubt'];
const b9W = () => { if (!S) return {}; S.b9 ??= {wit:{}}; S.b9.wit ??= {}; return S.b9.wit; };
function b9Wit(v, why = '', n = (S && S.chapter) || 0){ if (!b9On() || !B9_WITV.includes(v) || !B9WIT[n]) return null; const w = b9W(), k = 'c' + n;
  if (w[k]) return w[k]; w[k] = v; tally(v === 'kept' ? 'b9Kept' : 'b9Doubt', 1);
  note(v === 'kept' ? `Witness: the squad still marches for something${why ? ` (${why})` : ''}.` : `Witness: the squad marches because the column does${why ? ` (${why})` : ''}.`, v === 'kept' ? 'good' : 'bad');
  save(); return v; }
function b9Witness(t = b9Thread()){ const w = b9W(), out = {kept:0, doubt:0}; Object.entries(B9WIT).forEach(([n, th]) => { if (th === t && w['c' + n]) out[w['c' + n]]++; }); return out; }
const b9Faith = (t = b9Thread()) => { const w = b9Witness(t); return !w.kept && !w.doubt ? null : w.doubt > w.kept ? 'doubt' : 'kept'; };

/* ---- the march: the chapter's squad swapped in first, then the march eats ---- */
{ const _sc = startChapter; startChapter = function(n){ if (b9On() && B9_CH[n]) { b9Use(B9_CH[n]); if (B9_MARCH[n] && !S.f['b9_march' + n]) { S.f['b9_march' + n] = 1; b9Ration(B9_MARCH[n], 'weeks on the march'); } } return _sc(n); }; }

/* ---- the fever (Chapter 3): a wound like the others, the weakest; only a chapter gives it, never a bad fall (b9Fever(id)) ---- */
INJURIES.b9fever = {name:'the march fever', word:'the fever', hit:1, sev:0};
{ const _gi = giveInjury; giveInjury = function(u, pick){ if (!pick) { const ks = Object.keys(INJURIES).filter(k => k !== 'kelyk' && k !== 'b9fever'); pick = ks[R(ks.length)]; } return _gi(u, pick); }; }
function b9Fever(id){ if (!b9On() || !id || !TPL[id] || injuryOf(id)) return false; (S.injury ??= {})[id] = 'b9fever'; save(); return true; }
/* who catches it, if a chapter does not choose: the squadmate walking with the lowest loyalty, never the sergeant */
const b9SickPick = () => { const sq = (S.squad || []).filter(k => k !== 'sgt' && b9In(k)); return sq.sort((a, b) => ((S.loy || {})[a] || 0) - ((S.loy || {})[b] || 0))[0] || null; };

/* ---- the Letherii keep Book Five's hands while they play (Book Seven's 120 does the same for b7L()): the renamed abilities, and Lether has
   no Moranth munitions ---- */
Object.entries(B5_ABX).forEach(([k, x]) => { const a = AB[k]; if (!a) return;
  ['name', 'desc'].forEach(f => { if (!x[f]) return; const d = Object.getOwnPropertyDescriptor(a, f); if (!d) return;
    Object.defineProperty(a, f, {configurable:true, enumerable:true, get(){ return b9L() ? x[f] : d.get ? d.get.call(this) : d.value; }, set(v){ /* fixed per book */ }}); });
  const run = a.run;
  a.run = function(u, x0, y0){ if (!b9L()) return run.call(this, u, x0, y0);
    const t = B && B.units.find(p => p.x === x0 && p.y === y0), _b = blog; let n = 0; const w0 = B && B.warren;
    blog = m => { let s = String(m); if (x.line && n === 0) s = x.line(u, t); if (x.map) x.map.forEach(([re, to]) => { s = s.replace(re, to); }); n++; return _b(s); };
    if (u && u.id === 'ammet' && B) B.warren = Object.assign({}, w0 || {}, {denul:1});
    const done = () => { blog = _b; if (u && u.id === 'ammet' && B && w0) B.warren = w0; };
    let r; try { r = run.call(this, u, x0, y0); } catch (e) { done(); throw e; }
    if (r && r.then) return r.finally(done);
    done(); return r; }; });
{ const _rl = rosterLacks; rosterLacks = function(sq){ const r = _rl(sq); return b9L() ? r.filter(k => k !== 'munitions') : r; }; }

/* ---- the recruits (canon sheet §6: names checked). Base numbers; the roster brings them to the squad's level. ---- */
Object.assign(TPL, {
  brask:{name:'Brask', role:'Heavy of the 9th', sig:'B', col:'#8a8270', hp:26, ac:15, atk:4, dmg:[1,10,2], rng:1, mv:4, init:1, st:{might:3, wits:1, guile:0}, ab:['bash', 'salve'],
    epithet:'"My squad got broken up in Letheras and dealt out like cards. I was the card nobody wanted. You lot will do."', origin:'Gris, Quon Tali', age:35, service:'Twelve years, the last six in the heavies, all of it on foot',
    weapon:'A heavy infantry sword and a mace on a thong, for when the sword is stuck in something', armour:'A heavy\'s scale, double at the shoulders, and a helm with the cheek-guards bent back',
    bio:'A heavy of the 9th whose squad came apart in Letheras: two dead on the river, one in the Letherii healers\' house, and a sergeant who took the new emperor\'s coin and a post at a gate. Brask was what was left. The Adjunct\'s clerks folded him into the Third on a list, and he walked over with his kit on his back and asked which end of the line was his.',
    traits:['Eats standing up', 'Sharpens the sword at every halt, whether it needs it or not', 'Has opinions about marines, and keeps most of them'], gear:['A heavy\'s sword', 'His old squad\'s tally-stick, with four notches filed flat'],
    get quest(){ return 'East, as far as the Adjunct goes. He has stopped asking where. He would like the squad he is in now to still be a squad when they get there.'; }},
  tegra:{name:'Tegra', role:'Barghast guide', sig:'G', col:'#9a8a6a', hp:22, ac:13, atk:4, dmg:[1,8,2], rng:1, mv:5, init:2, st:{might:2, wits:2, guile:1}, ab:['grapple', 'salve'],
    epithet:'"My clan left the host. The host did not like it. Now I walk with foreigners, which the host will like less."', origin:'The plains west of the Wastes', age:29, service:'None the Malazans would count. Fourteen years of the plains, and every dry wash between here and the hills',
    weapon:'Two short throwing-axes, and a long knife with a bone grip', armour:'Painted hide over a quilted shirt, and a string of small bones at the throat',
    bio:'A Barghast woman of a small clan that walked away from the great host on the plains when the host went to war. Her clan went west. She did not. She came to the Malazan column with water-lore to sell and a reason she does not give, and the sergeants decided that a guide who knows where the dry washes hold water is worth a reason left unsaid.',
    traits:['Never says her clan\'s name', 'Reads the ground before she reads a face', 'Laughs at the heavies\' marching songs, and then sings them'], gear:['Two throwing-axes', 'A gourd that has never once been empty when it mattered'],
    get quest(){ return 'East, for now, because east is away from the host. After that she has not said. She says the Wastes have not finished saying things either.'; }},
  brennet:{name:'Brennet', role:'Supply carter', sig:'N', col:'#9a7a5a', hp:20, ac:12, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, st:{might:2, wits:2, guile:0}, ab:['bash', 'salve'],
    epithet:'"I was Indebted to the wagon. Then the emperor tore the books up. Now the wagon and I are just friends."', origin:'A carter\'s yard outside the Letheras landward gate', age:31, service:'Nine years on the supply roads, the last month of it free',
    weapon:'A wagon-pin as long as his arm, and a carter\'s knife', armour:'A leather carter\'s apron with iron studs sewn on, and a padded cap',
    bio:'Born Indebted to a carting house and set to the reins at twelve. The new emperor\'s law freed him on a Tuesday. On the Wednesday the escort\'s quartermasters came round the yards asking for carters who could keep a wagon moving in country with no roads, and Brennet found that free meant he could say yes, so he did.',
    traits:['Knows every wheel in the train by its squeak', 'Talks to the oxen in a voice he uses for nobody else', 'Counts the water barrels before he counts his own fingers'], gear:['A wagon-pin', 'A cancelled debt-chit, kept in his boot'],
    get quest(){ return 'Wherever the wagons go. He has never owned anything before, and now he owns his own name. He means to bring it home again.'; }},
  kaedra:{name:'Kaedra', role:'Border scout', sig:'K', col:'#7a8a6a', hp:16, ac:13, atk:4, dmg:[1,8,1], rng:6, mv:5, init:3, st:{might:1, wits:2, guile:2}, ab:['mark', 'salve'],
    epithet:'"Half Bolkando, half Letherii, and the border forts never decided which half to shoot at. So I learned to be the one shooting."', origin:'A border fort on the Bolkando marches', age:26, service:'Seven years a scout of the border forts, the last of it unpaid',
    weapon:'A short horn bow, and a scout\'s knife', armour:'A dun scout\'s coat with a hood, sewn with dry grass at the shoulders',
    bio:'Born to a Letherii garrison soldier and a Bolkando trader at a fort on the marches, she grew up in a place both kingdoms claimed and neither fed. The forts sent scouts into the Wastes\' edge for years and stopped paying them last season. When the escort marched past her fort she walked out of the gate and joined it, because it was going somewhere and the fort was not.',
    traits:['Reads spoor the way clerks read ledgers', 'Will not sleep inside a tent', 'Swears in Bolkando, prays in Letherii'], gear:['A horn bow', 'A blue bead from her mother\'s people, on a thong'],
    get quest(){ return 'Out past the edge of the maps she used to scout. She has always wondered what the Wastes look like from the middle. She is about to find out, and says she is in no hurry.'; }},
});
Object.assign(VERB, {brask:'brings the heavy sword down on', tegra:'throws an axe at', brennet:'swings the wagon-pin at', kaedra:'looses an arrow at'});
Object.assign(STATUP, {brask:['might', 'wits'], tegra:['might', 'wits'], brennet:['might', 'wits'], kaedra:['guile', 'wits']});
Object.assign(TPL_ROLES, {brask:['heavy', 'mail', 'shield', 'blade', 'heavyweapon'], tegra:['light', 'blade', 'reach', 'ranged'], brennet:['heavy', 'blade', 'heavyweapon'], kaedra:['light', 'blade', 'ranged']});
Object.assign(PICKS[3], {
  brask:[['holdline', 'The Heavies\' Wall', 'Brask\'s free swings are unlimited and hit +2. The heavies do not give ground. That is the whole of the job.'], ['shieldwall', 'Shoulder to Shoulder', 'Squadmates standing next to Brask get +2 armour. Six years in the heavies\' line, and he still closes up without being told.']],
  tegra:[['snare', 'The Plains Cord', 'Whatever Tegra catches is tangled: −2 to hit and −2 armour through its next turn. Her clan hunts with cord before it hunts with iron.'], ['ghost', 'Out of the Grass', 'Enemies take −2 to hit Tegra. On the plains, standing still is a way of hiding.']],
  brennet:[['holdline', 'The Long Haul', 'Brennet\'s free swings are unlimited and hit +2. Nine years of keeping a wagon moving teaches you to keep moving whatever is in the way.'], ['shieldwall', 'Behind the Tailboard', 'Squadmates standing next to Brennet get +2 armour. He has stood behind a wagon in a raid before, and knows where the arrows go.']],
  kaedra:[['sappers_eye', 'Border Eyes', 'The squad rolls +2 initiative, and Kaedra\'s free swings hit +2. Seven years of seeing riders before they see the fort.'], ['ghost', 'Low in the Scrub', 'Enemies take −2 to hit Kaedra. The forts\' scouts who lived were the ones nobody saw.']],
});
/* sprites until the chapter art (160b draws the busts) */
if (typeof FIGX !== 'undefined') Object.assign(FIGX, {
  brask(ctx, h, t, o){ ctx.save(); ctx.scale(1.08, 1.05); h.legs('#2a2622'); h.torso('#7a7464', '#2c2a24', 7); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let y = -4; y < 6; y += 2.2) ctx.fillRect(-6, y, 12, .6);
    h.head('#b08a6a', 4.5, -11.2); h.look('rgba(20,12,10,.85)', -11.4); ctx.fillStyle = '#5a5850'; ctx.beginPath(); ctx.arc(0, -12.6, 5, Math.PI, 0); ctx.fill(); // the helm
    ctx.strokeStyle = '#cfc8b8'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(7, 6); ctx.lineTo(10, -10); ctx.stroke(); ctx.restore(); },
  tegra(ctx, h, t, o){ h.legs('#3a2e22'); poly(ctx, [[-6,-6],[6,-6],[7,10],[-7,10]], h.armor('#8a7454', '#2e2418')); h.head('#a07a5a', 4.3, -11.4); h.look('rgba(20,12,10,.85)', -11.6);
    ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-2.6, -10.6, 1.2, 1.2); ctx.fillRect(1.4, -10.6, 1.2, 1.2); // the paint
    ctx.fillStyle = '#1a120c'; ctx.beginPath(); ctx.arc(0, -13, 4.8, Math.PI, 0); ctx.fill(); ctx.fillRect(3.4, -13, 1.6, 8); // a braid
    ctx.fillStyle = '#6a6a6a'; ctx.fillRect(6.4, 0, 3, 2.4); ctx.strokeStyle = '#5a4028'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(7.6, 2.4); ctx.lineTo(7.6, 6); ctx.stroke(); }, // a throwing-axe
  brennet(ctx, h, t, o){ h.legs('#2a2218'); poly(ctx, [[-6,-6],[6,-6],[7,11],[-7,11]], h.armor('#6a5038', '#241a10')); h.head('#c09a78', 4.4, -11.4); h.look('rgba(20,12,10,.85)', -11.6);
    ctx.fillStyle = '#5a4a38'; ctx.fillRect(-5, -15, 10, 3); // the padded cap
    ctx.strokeStyle = '#8a8a8a'; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(7, 7); ctx.lineTo(9, -8); ctx.stroke(); }, // the wagon-pin
  kaedra(ctx, h, t, o){ h.legs('#2e2a20'); poly(ctx, [[-6,-6],[6,-6],[7,10],[-7,10]], h.armor('#7a7454', '#2a2618')); h.head('#b8946e', 4.2, -11.4); h.look('rgba(20,12,10,.85)', -11.6);
    ctx.fillStyle = '#6a6448'; ctx.beginPath(); ctx.arc(0, -12.4, 5.2, Math.PI * .9, Math.PI * 2.1); ctx.fill(); // the hood
    ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(-8, -2, 8, -1.1, 1.1); ctx.stroke(); }, // the bow
});

/* ---- the gods (canon sheet §7). The sergeants: Treach for the Third's, the Errant for the Letherii's (a twist, never a gift to Brys; he
   is never asked after Chapter 6, which is the Letherii's last). Whoever prayed to Hood is answered by the Guardians of the Gate (Hood fell
   in Book Eight and is never named answering; rule 75: the Guardians stay nameless). The recruits have no god: no new boon, no new sigil. ---- */
const PATRON_B9GATE = {sig:'b8gate', god:'the Guardians of the Gate', title:'The Guardians of the Gate', txt:id => `${NAME(id)}, on the ground, says the old words to the old god, out of habit, and knows as the words leave that nobody is in that seat any more.\n\nSomething answers anyway. A gate, far off and very close, with soldiers standing in it: more of them than anyone could count, and not one face the squad can see. One of them looks down the long road, and lifts a hand. *Not yet.*`};
Object.keys(PATRONS).forEach(id => { if (id === 'sgt') return; const prev = Object.getOwnPropertyDescriptor(PATRONS, id); if (!prev) return; const was = () => prev.get ? prev.get() : prev.value;
  Object.defineProperty(PATRONS, id, {configurable:true, enumerable:true, get(){ const p = was(); return b9On() && p && p.god === 'Hood' ? PATRON_B9GATE : p; }, set(v){ /* kept per book */ }}); });
{ const prev = Object.getOwnPropertyDescriptor(PATRONS, 'sgt');
  Object.defineProperty(PATRONS, 'sgt', {configurable:true, enumerable:true, get(){ return S && S.book === 'dod' ? (b9Thread() === 'l' ? PATRON_ERRANT : PATRON_TREACH) : prev.get ? prev.get() : prev.value; }, set(v){ /* kept per book */ }}); }
/* the Guardians' boon in Book Nine, as Book Eight's (140): the first time each squadmate would go down, they stay up at 1 health with a ward of a tenth */
{ const _hurt = hurt;
  hurt = function(u, n, crit){ const before = u ? u.hp : 0; _hurt(u, n, crit);
    if (b9On() && B && u && u.side === 'p' && !u.ally && before > 0 && u.hp <= 0 && boon('b8gate') && !((S.boons.spared || {})['g_' + u.id])) {
      (S.boons.spared ??= {})['g_' + u.id] = 1; u.hp = 1; u.deadAt = null;
      const w = Math.round(u.maxhp * .1); if (w > (u.ward || 0)) u.ward = w; blog(`<em>The Gate is held.</em> ${u.name} gets back up at 1 health, with a ward of ${w}.`); float(u, 'the gate holds', '#8fa38a'); } }; }

const B9_DONE = {brask:'b9_braskDone', tegra:'b9_tegraDone', brennet:'b9_brennetDone', kaedra:'b9_kaedraDone'}; // 1 walks, 2 waits, 0 sent away
const B9_HOME = {brask:'the heavies\' lines', tegra:'the guides\' fire at the column\'s edge', brennet:'the supply train', kaedra:'the escort\'s outriders'};
const b9Recruits = () => B9_TH[b9Thread()].recruits;
const b9CanRecruit = id => !!(b9On() && TPL[id] && b9Recruits().includes(id) && !(S.dead && S.dead[id]) && S.f[B9_DONE[id]] !== 0);
function b9Join(id){ if (!b9CanRecruit(id) || b9In(id)) return false;
  if ((S.squad || []).length < ROSTER_CAP) { recruit(id); S.f[B9_DONE[id]] = 1; }
  else { S.camp = [...new Set([...(S.camp || []), id])]; S.loy[id] ??= 0; S.picks[id] ??= []; S.gear[id] ??= {}; S.f[B9_DONE[id]] = 2; note(`${NAME(id)} waits with ${B9_HOME[id]}: six walk already.`); }
  save(); return true; }
{ const _recruit = recruit; recruit = function(id){ if (!b9On()) return _recruit(id); const n0 = note;
    note = (t, c) => n0(String(t).replace('joins the Fourth', `joins ${b9Unit()}`), c); try { _recruit(id); } finally { note = n0; } save(); }; }

ROSTER_BOOKS.dod = {
  get core(){ return B9_TH[b9Thread()].core; },
  bench:()=>b9Thread() === 't' ? ['brask', 'tegra', 'doss', 'wenna', 'mehet', 'ottar', ...B4_RECRUITS, ...HOC_NEW] : ['brennet', 'kaedra', 'ilsa', 'sorvan', ...B5_RECRUITS],
  home:id=>B9_HOME[id] || (b9Thread() === 't' ? 'the heavies\' baggage' : 'the escort\'s train'),
  wait:id=>(S.camp || []).includes(id) || (!!B9_DONE[id] && S.f[B9_DONE[id]] === 2),
  gone:id=>!!B9_DONE[id] && !b9CanRecruit(id),
  open:()=>true,
  in:id=>{ if (B9_DONE[id]) S.f[B9_DONE[id]] = 1; },
  out:id=>{ if (B9_DONE[id]) S.f[B9_DONE[id]] = 2; }};

/* ---- the foes (canon sheet §2-§4; v10.2 soak from base armour: 16-17 soak 1, 18+ soak 2). Two scales: the Third's at 19-24, the
   Letherii's (an 'l' in the id) at 11-16. Letherii deserters and Bolkando-border raiders on the road; Wastes dogs and a maddened bhederin
   (thin game, R10); Barghast skirmishers only beside the road in Chapter 4 (the war with the Akryn; rule 89: no clan named); and the
   K'Chain Nah'ruk, "the short-tails" in narration (rule 88): armoured, a hide that turns blows (dr), sharpers and burners half spent on
   the plate, cussers tearing it open. Their sorcerers' blows are sorcery. Bodies borrowed until the chapter art. ---- */
Object.assign(FOES, {
  /* the Third's (19-24) */
  b9_deserter:{name:'Letherii deserter', kind:'b5_letherii', sig:'d', hp:36, ac:15, atk:13, dmg:[1,8,5], rng:1, mv:4, init:2, verb:'cuts at'},
  b9_deserterbow:{name:'Deserter crossbowman', kind:'b5_letherii_bow', sig:'x', hp:28, ac:14, atk:13, dmg:[1,10,5], rng:6, mv:4, init:2, sk:['pin'], verb:'looses a quarrel at'},
  b9_desertercap:{name:'Deserter captain', kind:'b5_letherii', sig:'D', hp:70, ac:17, atk:14, dmg:[1,10,6], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'cuts at'},
  b9_raider:{name:'Border raider', kind:'b6_bandit', sig:'r', hp:34, ac:14, atk:13, dmg:[1,8,5], rng:1, mv:5, init:3, sk:['hitrun'], verb:'cuts at'},
  b9_raiderchief:{name:'Raider chief', kind:'b6_bandit', sig:'R', hp:64, ac:16, atk:14, dmg:[1,10,6], rng:1, mv:5, init:3, boss:true, sk:['rally'], verb:'cuts at'},
  b9_dog:{name:'Wastes dog', kind:'b5_c7_greatwolf', sig:'w', hp:22, ac:13, atk:12, dmg:[1,6,5], rng:1, mv:7, init:4, verb:'bites'},
  b9_bhederin:{name:'Maddened bhederin', kind:'b3_c2_bhederin', sig:'B', hp:84, ac:14, atk:13, dmg:[2,8,5], rng:1, mv:5, init:1, boss:true, sk:['shove'], verb:'gores'},
  b9_nahruk:{name:'Short-tail soldier', kind:'khell', sig:'N', hp:88, ac:18, atk:15, dmg:[1,12,7], rng:1, mv:4, init:2, dr:3, sk:['parry'], resist:{sharper:.5, burner:.5}, weak:{cusser:1.5}, verb:'brings a sword down on'},
  b9_nahrukcaster:{name:'Short-tail sorcerer', kind:'khell', sig:'s', hp:70, ac:16, atk:14, dmg:[2,8,6], rng:5, mv:3, init:2, dr:2, sk:['daze'], resist:{sharper:.5, burner:.5}, weak:{cusser:1.5}, verb:'looses a burst of sorcery at'},
  b9_nahrukbrute:{name:'Short-tail heavy', kind:'khell', sig:'H', hp:150, ac:19, atk:16, dmg:[2,10,7], rng:1, mv:3, init:1, dr:4, boss:true, sk:['reach', 'shove'], resist:{sharper:.5, burner:.5}, weak:{cusser:1.5}, verb:'drives a great blade at'},
  /* the Letherii's (11-16) */
  b9_lraider:{name:'Border raider', kind:'b6_bandit', sig:'r', hp:26, ac:13, atk:8, dmg:[1,8,3], rng:1, mv:5, init:3, sk:['hitrun'], verb:'cuts at'},
  b9_lraiderbow:{name:'Raider bowman', kind:'b6_bandit', sig:'b', hp:20, ac:12, atk:8, dmg:[1,8,3], rng:6, mv:5, init:3, verb:'looses an arrow at'},
  b9_lraiderchief:{name:'Raider chief', kind:'b6_bandit', sig:'R', hp:50, ac:15, atk:9, dmg:[1,10,4], rng:1, mv:5, init:3, boss:true, sk:['rally'], verb:'cuts at'},
  b9_lbarghast:{name:'Barghast skirmisher', kind:'b3_barghast', sig:'g', hp:30, ac:13, atk:8, dmg:[1,10,3], rng:1, mv:5, init:3, sk:['hitrun'], verb:'swings a war-axe at'},
  b9_lbarghastchief:{name:'Barghast war-leader', kind:'b3_barghast', sig:'G', hp:56, ac:14, atk:9, dmg:[1,12,4], rng:1, mv:5, init:2, boss:true, sk:['rally'], verb:'brings a war-axe down on'},
  b9_ldog:{name:'Wastes dog', kind:'b5_c7_greatwolf', sig:'w', hp:16, ac:12, atk:7, dmg:[1,6,3], rng:1, mv:7, init:4, verb:'bites'},
  b9_lnahruk:{name:'Short-tail soldier', kind:'khell', sig:'N', hp:60, ac:17, atk:10, dmg:[1,10,5], rng:1, mv:4, init:2, dr:2, sk:['parry'], resist:{sharper:.5, burner:.5}, weak:{cusser:1.5}, verb:'brings a sword down on'},
  b9_lnahrukcaster:{name:'Short-tail sorcerer', kind:'khell', sig:'s', hp:48, ac:15, atk:10, dmg:[2,6,4], rng:5, mv:3, init:2, dr:1, sk:['daze'], resist:{sharper:.5, burner:.5}, weak:{cusser:1.5}, verb:'looses a burst of sorcery at'},
  b9_lnahrukbrute:{name:'Short-tail heavy', kind:'khell', sig:'H', hp:100, ac:17, atk:11, dmg:[2,8,5], rng:1, mv:3, init:1, dr:3, boss:true, sk:['reach', 'shove'], resist:{sharper:.5, burner:.5}, weak:{cusser:1.5}, verb:'drives a great blade at'},
  /* on the squad's side, in a fight's allies:[[id, x, y]]: a Bonehunter heavy with the Third, an escort soldier and a Bluerose outrider with the Letherii */
  b9_heavy:{name:'Heavy of the Bonehunters', kind:'b2soldier', sig:'k', hp:32, ac:16, atk:11, dmg:[1,10,3], rng:1, mv:4, init:1, verb:'cuts at'},
  b9_escort:{name:'Escort soldier', kind:'b5_letherii', sig:'e', hp:18, ac:14, atk:5, dmg:[1,8,1], rng:1, mv:4, init:1, verb:'cuts at'},
  b9_bluerose:{name:'Bluerose outrider', kind:'b5_letherii', sig:'o', hp:20, ac:14, atk:5, dmg:[1,8,2], rng:1, mv:6, init:2, verb:'drives a lance at'},
});
const FOE_SORC_B9 = ['b9_nahrukcaster', 'b9_lnahrukcaster']; FOE_SORC_B9.forEach(k => FOE_SORC.add(k)); // the short-tails' sorcery goes past soak
const b9Shorttail = u => !!(u && u.side === 'e' && /^b9_l?nahruk/.test(String(u.id || ''))); // a foe made by mkFoe keeps its FOES id in u.id (its kind is the body, 'khell')
/* the allies grow with the squad, as Book Seven's do */
{ const _mkAlly = mkAlly; mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y);
    if (['b9_heavy', 'b9_escort', 'b9_bluerose'].includes(k)) { u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); u.b9reg = true; } return u; }; }
/* ---- Book Nine's balance tables (v12.0, docs/v12.0-balance.md; David, Nov 10, 2026: "tune Book Nine to the series targets, Book Nine
   tables only"). B9SOLDIER rows join SOLDIER_FIGHT (Soldier only, by fight id), tuned to about 90% won first try; the first fight of each
   squad's book (b9_c1_looters, the Third; b9_c2_drill, the Letherii) and the survive fights (b9_c2_drill, b9_c4_herd, b9_c6_train,
   b9_c6_dusk, b9_c7_dark) have none and stay near 100%. B9GAP is Bridgeburner's per-fight boost ({ac +, atk +, hp ×, dmg +}, as B8GAP),
   tuned to about 75-80% won; B9GAP_ROW is the row a b9_ fight without its own row gets. Win % / health lost %: smart bot, first try,
   20 runs (tools/balance.mjs --book=dod). ---- */
const B9SOLDIER = {
  b9_c1_stores:{ac:9, atk:10, hp:5.9, dmg:12}, // 90% won, 32% health lost
  b9_c1_brawl:{ac:12, atk:12, hp:7.0, dmg:14}, // 85% won, 36% health lost
  b9_c2_bout:{ac:6, atk:6, hp:4.0, dmg:8}, // 100% won, 21% health lost
  b9_c2_wagons:{ac:5, atk:5, hp:3.5, dmg:7}, // 85% won, 37% health lost
  b9_c3_farm:{ac:8, atk:8, hp:5.0, dmg:10}, // 90% won, 21% health lost
  b9_c3_dogs:{ac:10, atk:10, hp:6.0, dmg:12}, // 95% won, 30% health lost
  b9_c3_road:{ac:6, atk:7, hp:4.2, dmg:9}, // 80% won, 43% health lost (a cliff: 100% a hair easier)
  b9_c4_raid:{ac:3, atk:3, hp:2.5, dmg:5}, // 100% won, 31% health lost
  b9_c4_forage:{ac:4, atk:5, hp:3.1, dmg:6}, // 90% won, 30% health lost
  b9_c5_cache:{ac:9, atk:10, hp:5.75, dmg:12}, // 90% won, 26% health lost
  b9_c5_bull:{ac:20, atk:20, hp:11.0, dmg:22}, // 95% won, 14% health lost
  b9_c5_dogs:{ac:11, atk:11, hp:6.5, dmg:13}, // 85% won, 40% health lost
  b9_c6_line:{ac:3, atk:4, hp:2.7, dmg:6}, // 85% won, 51% health lost
  b9_c6_gap:{ac:7, atk:8, hp:4.75, dmg:10}, // 85% won, 46% health lost
  b9_c7_rearguard:{ac:2, atk:2, hp:1.8, dmg:4}, // 90% won, 30% health lost (mortal); 0.6 dead a fight
  b9_c7_trail:{ac:14, atk:14, hp:8.0, dmg:16}, // 100% won, 14% health lost
};
Object.assign(SOLDIER_FIGHT, B9SOLDIER);
let B9GAP_ROW = {ac:5, atk:6, hp:3.75, dmg:8}; // a b9_ fight without its own row (about the book's middle row)
const B9GAP = {
  b9_c1_looters:{ac:7, atk:7, hp:4.5, dmg:9}, // 85% won, 35% health lost (the Third's first fight)
  b9_c1_stores:{ac:7, atk:7, hp:4.5, dmg:9}, // 85% won, 35% health lost
  b9_c1_brawl:{ac:9, atk:10, hp:5.75, dmg:12}, // 70% won, 55% health lost
  b9_c2_drill:{ac:17, atk:18, hp:9.75, dmg:20}, // 100% won, 82% health lost (survive 4)
  b9_c2_bout:{ac:5, atk:5, hp:3.6, dmg:7}, // 85% won, 39% health lost
  b9_c2_wagons:{ac:4, atk:4, hp:3.0, dmg:6}, // 75% won, 57% health lost
  b9_c3_farm:{ac:6, atk:6, hp:4.0, dmg:8}, // 75% won, 34% health lost
  b9_c3_dogs:{ac:7, atk:8, hp:4.75, dmg:10}, // 80% won, 43% health lost
  b9_c3_road:{ac:4, atk:5, hp:3.25, dmg:7}, // 70% won, 50% health lost
  b9_c4_herd:{ac:19, atk:20, hp:10.75, dmg:22}, // 80% won, 81% health lost (survive 4)
  b9_c4_raid:{ac:2, atk:2, hp:2.0, dmg:4}, // 60% won, 67% health lost (72% pooled over 40)
  b9_c4_forage:{ac:3, atk:4, hp:2.75, dmg:6}, // 80% won, 43% health lost
  b9_c5_cache:{ac:7, atk:7, hp:4.5, dmg:9}, // 85% won, 29% health lost
  b9_c5_bull:{ac:19, atk:19, hp:10.5, dmg:21}, // 90% won, 20% health lost
  b9_c5_dogs:{ac:8, atk:9, hp:5.25, dmg:11}, // 75% won, 51% health lost
  b9_c6_line:{ac:2, atk:2, hp:2.1, dmg:4}, // 80% won, 56% health lost
  b9_c6_train:{ac:19, atk:20, hp:10.75, dmg:22}, // 100% won, 53% health lost (survive 5)
  b9_c6_gap:{ac:5, atk:6, hp:3.75, dmg:8}, // 85% won, 42% health lost
  b9_c6_dusk:{ac:20, atk:20, hp:11.0, dmg:22}, // 100% won, 7% health lost (survive 4)
  b9_c7_rearguard:{ac:0, atk:1, hp:1.25, dmg:3}, // 90% won, 31% health lost (mortal); 1.0 dead a fight
  b9_c7_dark:{ac:19, atk:20, hp:10.75, dmg:22}, // 100% won, 47% health lost (survive 5)
  b9_c7_trail:{ac:12, atk:13, hp:7.25, dmg:15}, // 95% won, 37% health lost
};
const b9Gap = () => { if (!b9On() || (S.diff || 'soldier') !== 'bridgeburner') return null; const id = B && B.id; return (id && B9GAP[id]) || (id && /^b9_/.test(id) ? B9GAP_ROW : null); };
{ const _mkFoe = mkFoe;
  mkFoe = function(k, x, y, extra){ const u = _mkFoe(k, x, y, extra); const g = b9Gap(); if (!g) return u;
    u.ac = (u.ac || 10) + (g.ac || 0); u.atk = (u.atk || 0) + (g.atk || 0); u.maxhp = u.hp = Math.max(1, Math.round(u.maxhp * (g.hp || 1)));
    if (u.dmg) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + (g.dmg || 0)]; if (g.mv) u.mv = (u.mv || 4) + g.mv; return u; }; }

/* ---- the words Book Nine throws at you. Bound by dod-canon §4 and rules 84-97: Kolanse may be named, never what waits there; the
   short-tails by the marines' word; the Barghast as headline; Brys seen far off and never acting ---- */
const b9Saw = t => () => !!S && (S.chapter || 0) >= t;
GLOSSX.dod = [
  [0, 'The Bonehunters', 'The Fourteenth Army, as it calls itself now. It took Letheras and is marching out of it again, east.'],
  [0, 'The Wastes', 'The country east of Lether: dry, wide and nearly empty. The Letherii have legends about it and no maps.'],
  [0, 'Rations', 'What the squad has to eat and drink, by its own count. Short rations cost health and nerve. Foraging and good choices put some back.'],
  [0, 'Witness', 'What the squad still marches for, when nobody has said where they are going. Some days the answer is each other. Some days there is none.'],
  [0, 'Kolanse', 'A land somewhere far to the east, where the Adjunct is said to be marching. A drought there, years long, is the only other thing anyone has heard.'],
  [0, 'The heavies', 'The army\'s heavy infantry: scale, big swords, and a habit of not moving. The Third marches with them now.', ()=>b9Thread() === 't'],
  [0, 'Docks', 'Letherii coin. The new emperor\'s law took the debts off the books. The coins kept their faces.', ()=>b9Thread() === 'l'],
  [0, 'The escort', 'The Letherii brigades marching behind the Malazans under Brys Beddict, Commander of the army. Their own supply train, their own cavalry, their own reasons.', ()=>b9Thread() === 'l' || b9Saw(2)()],
  [0, 'The Errant', 'Lether\'s god of chance. Soldiers pray to him before a wager. In the Wastes, everything is a wager.', ()=>b9Thread() === 'l'],
  [1, 'The night of the cards', 'The night before the march, something happened in Letheras that the barracks cleared out for. The dead stirred. A roof went in. The squad has yet to meet anyone who will say who dealt.', b9Saw(1)],
  [2, 'The supply train', 'The escort\'s wagons, oxen and water barrels, and the clerks who count them. Lose the train and the march ends where it stands.', b9Saw(2)],
  [3, 'The fever', 'It came out of Letheras with the army. The Letherii healers have a cure for it, and the cure takes water, and boiling, and time.', b9Saw(3)],
  [4, 'Bluerose', 'Lether\'s horse country. Its cavalry rides with the escort, out ahead of the train.', b9Saw(4)],
  [4, 'The Barghast', 'Painted clans from the plains beside the Wastes, at war with the Akryn this year. The column keeps its distance.', b9Saw(4)],
  [5, 'The short-tails', 'What the marines will call them, after. Tall, armoured, faster than anything that size should be.', b9Saw(6)],
];

/* ---- the journal, the count and Deeds ---- */
{ const _jn = journalNotes; journalNotes = function(){ const out = _jn(); if (!b9On()) return out;
    const o = S.th && S.th[b9Other()], t = b9Thread() === 't', f = b9Faith();
    out.unshift(`${t ? 'The Third, with the Bonehunters\' heavies' : 'The Sixth Company\'s squad, in the Letherii escort'}. Rations: ${b9Rations()} of ${B9_RATMAX}, ${B9_RATW[b9RatTier()]}.${f ? ` ${f === 'kept' ? 'The squad still marches for something.' : 'The squad marches because the column does.'}` : ''}${o ? ` ${b9Other() === 't' ? 'The Third' : 'The Letherii squad'} (Sergeant ${esc(o.name)}) is elsewhere in the column, at level ${o.lvl}.` : ''}`);
    return out; }; }
{ const _sr = statsRows; statsRows = function(s){ const r = _sr(s); if (!s || s.book !== 'dod') return r; const st = s.stats || {};
    const cur = s.b9r || {}, oth = (s.th && Object.values(s.th)[0] && Object.values(s.th)[0].b9r) || null;
    r.push(['Rations, now', `${cur.n ?? B9_RAT0} of ${B9_RATMAX}`], ['Rations, at their lowest', Math.min(cur.lo ?? B9_RAT0, oth ? (oth.lo ?? B9_RAT0) : 10)], ['Rations found', st.b9RatUp || 0], ['Rations eaten', st.b9RatDown || 0], ['Witness kept', st.b9Kept || 0]); return r; }; }
function b9DeedsExtra(mine){ const lows = mine.filter(({s}) => s.b9r).map(({s}) => Math.min(s.b9r.lo ?? B9_RAT0, ...Object.values(s.th || {}).map(h => (h && h.b9r && h.b9r.lo) ?? 10))), fin = mine.filter(({s}) => bookDone(s)).length;
  const kept = mine.reduce((a, {s}) => a + (((s.stats || {}).b9Kept) || 0), 0);
  const rows = [['Rations at their lowest, across every sergeant', lows.length ? `${Math.min(...lows)} of ${B9_RATMAX}` : 'Not yet'], ['Witness kept', kept || 'Not yet'], ['Came through the Wastes', fin || 'Not yet']];
  return `<h4 class="jh">Rations</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }

/* the chapters' titles (Claude's call; the canon sheet fixes the places), keys and their defaults (the bot and a rebuild use these).
   Chapter 7's keys are the Third's roads; the Letherii's road is S.f.b9_lethRoad, set at Chapter 6's dusk: 'escort', 'adjunct' or 'home' */
const B9CH = {1:'Letheras, Emptied', 2:'The Escort', 3:'The Road East', 4:'The Ration Book', 5:'Short Rations', 6:'Dust on the Horizon', 7:'The Rearguard'};
const B9KEYS = {1:['stores', 'street'], 2:['wagons', 'drill'], 3:['boil', 'press'], 4:['book', 'forage'], 5:['share', 'keep'], 6:['line', 'train'], 7:['adjunct', 'south', 'home']};
const B9KEY0 = {1:'stores', 2:'wagons', 3:'boil', 4:'book', 5:'share', 6:'line', 7:'adjunct'};
const B9_LETHROADS = ['escort', 'adjunct', 'home'];
const b9Key = n => (S && S.f && S.f[`b9_c${n}_key`]) || (S && S.chapters && S.chapters[n]) || null;
const b9LethRoad = () => B9_LETHROADS.includes(S && S.f && S.f.b9_lethRoad) ? S.f.b9_lethRoad : null;

/* ---- the backdrops: each borrows an earlier book's drawing until the chapter art replaces it (Book Seven's pattern, 120) ---- */
const B9_SCENE_LIKE = {b9_letheras_night:'b5_letheras', b9_barracks:'b5_barracks', b9_muster:'b3_c2_camp_night', b9_wagons:'b3_c2_camp_night', b9_road_east:'b3_c6_road',
  b9_column:'b3_c6_road', b9_wastes:'b3_c2_far_dusk', b9_wastes_night:'b3_c2_camp_night', b9_camp_night:'b3_c2_camp_night', b9_line:'b3_c6_entrench', b9_dust:'b3_c6_entrench',
  b9_battle:'b2_hissar_burning', b9_dark:'b3_c7_hill_dusk', b9_retreat:'b3_c7_hill_dusk'};
Object.assign(SCENES, {
  b9_letheras_night:{loc:'Letheras', sub:'The emptied barracks quarter · night', cap:'Shutters closed, the barracks dark, and somewhere across the city a roof going in with a sound like a held breath let go.', amb:'explore'},
  b9_barracks:{loc:'Letheras', sub:'The barracks yard', cap:'Kit in heaps, wagons backed up to the gate, and the heavies counting everything twice.', amb:'explore'},
  b9_muster:{loc:'Letheras', sub:'The escort\'s muster ground', cap:'Letherii brigades drawn up in their blocks, a Malazan sergeant walking the front rank, and the supply train behind them all.', amb:'explore'},
  b9_wagons:{loc:'Outside Letheras', sub:'The supply train', cap:'Wagons in a line longer than the eye goes, oxen, water barrels lashed three high, and clerks with tallies at every tailboard.', amb:'explore'},
  b9_road_east:{loc:'East of Letheras', sub:'The road east', cap:'The last farms, the last trees, a road going thin, and the army in a column ahead under its own dust.', amb:'explore'},
  b9_column:{loc:'East of Lether', sub:'The column on the march', cap:'Files of soldiers on a track that is mostly dust, the wagons behind, and the sun hard on everything.', amb:'explore'},
  b9_wastes:{loc:'The Wastes', sub:'Open country · day', cap:'Dry grass, bare stone, a sky too big for it, and nothing moving to the horizon.', amb:'explore'},
  b9_wastes_night:{loc:'The Wastes', sub:'Open country · night', cap:'Stars, cold, a small fire and the column\'s fires strung out behind it for a league.', amb:'explore'},
  b9_camp_night:{loc:'The Wastes', sub:'The column\'s camp · night', cap:'Tents in their rows, the wagons drawn in, sentries on the dark side, and the cook-fires burning low to save the dung.', amb:'explore'},
  b9_line:{loc:'The Wastes', sub:'The line · day', cap:'A plain in the Wastes, shields locked, and on the horizon something that looks like a dust-storm and is not.', amb:'explore'},
  b9_dust:{loc:'The Wastes', sub:'The dust on the horizon', cap:'A long low wall of dust where the sky meets the plain, coming on, and the column turning to face it.', amb:'explore'},
  b9_battle:{loc:'The Wastes', sub:'The battle', cap:'Dust, smoke, the noise of shields, and shapes in the dust taller than any soldier.', amb:'battle'},
  b9_dark:{loc:'The Wastes', sub:'The rearguard · after dark', cap:'The last light gone, the plain lit only by what is burning, and the column walking away behind the rearguard.', amb:'battle'},
  b9_retreat:{loc:'The Wastes', sub:'The retreat trail', cap:'A grey morning, a trail of boots and wheel-ruts across the plain, and nobody looking back.', amb:'explore'},
});
Object.entries(B9_SCENE_LIKE).forEach(([k, like]) => { SCENEX[k] ??= (cv, t) => (SCENEX[like] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); });
/* the chapter card and end screen fall back by squad when a chapter names no scene: the column for the Third, the wagons for the Letherii */
{ const _sci = showChapterIntro; showChapterIntro = function(){ const r = _sci(); const CH = CHAPTERS[S && S.chapter];
    if (b9On() && CH && !(CH.intro && CH.intro.scene)) { G.sceneKind = (S.chapter || 0) <= 2 ? (b9Thread() === 't' ? 'b9_letheras_night' : 'b9_muster') : b9Thread() === 't' ? 'b9_column' : 'b9_wagons'; AUDIO.setScene(sceneAmb(G.sceneKind, 'explore')); } return r; }; }
{ const _endBeat = endBeat; endBeat = function(won){ const r = _endBeat(won); if (b9L() && B && B.banner && !won) B.banner.txt = 'The squad is down'; return r; }; }
