/* ============ Book Seven: Unwitnessed, beside Reaper's Gale (v10.0 engine, 120) ============
   Two squads take turns on opposite sides of one war. The Third (thread 't', Books Two, Four and Six), lent to Fist Keneb's marines as a
   squad of heavies, plays Chapters 1, 3, 5, 7: the burned ships, the night raids inland, the village, Letheras. Book Five's Letherii, the
   Sixth Company of the Whitefinder Battalion (thread 'l'), play Chapters 2, 4, 6: Letheras under the Edur and the Patriotists, the muster,
   the field before the walls. One save holds both, as Book Six's does (100): the squad not playing waits in S.th[thread]; startChapter
   swaps it in. Each squad keeps its own levels: the Third fresh at 16, cap 21; the Letherii fresh at 8, cap 12 (lvCap in 014 reads
   S.thread). The book's own system is the Rising (S.b7): one number both threads move. Plan: docs/book7-rg-plan.md (David, Nov 5, 2026).
   Canon: docs/rg-canon.md (binding). Notes: docs/v10.0-notes.md. Brief: docs/rg-book-brief.md. */

const b7On = () => !!(S && S.book === 'rg');
const B7_CH = {1:'t', 2:'l', 3:'t', 4:'l', 5:'t', 6:'l', 7:'t'};  // which squad plays each chapter (plan question 1(a))
const B7_TH = {
  t:{book:'hoc', look:'dg', unit:'the Third', squad:'Third Squad, lent to the Fist\'s column', army:'Keneb\'s column', who:'the Third, lent to Keneb\'s marines as heavies',
     core:['sgt', 'haddat', 'sathi', 'tangle', 'marrow'], fresh:['haddat', 'tangle', 'marrow', 'mirrel'], recruits:['doss', 'wenna'], lvl:16, cap:21},
  l:{book:'mt', look:'mt', unit:'the squad', squad:'Sixth Company, the Whitefinder Battalion', army:'the Letherii army', who:'the Sixth Company\'s squad, in Letheras under the Edur',
     core:['sgt', 'tobet', 'thegg', 'perrit', 'ammet'], fresh:['tobet', 'thegg', 'perrit', 'ammet'], recruits:['ilsa', 'sorvan'], lvl:8, cap:12}};
const B7_KEYS = ['name', 'squad', 'camp', 'loy', 'gear', 'picks', 'kit', 'tricks', 'inv', 'lvl', 'xp', 'dead', 'parked', 'wounds', 'silver', 'picksDue', 'imported', 'trail', 'debt', 'debt0'];
const b7Thread = () => (S && S.book === 'rg' && S.thread) || 't';
const b7Other = () => b7Thread() === 't' ? 'l' : 't';
const b7L = () => b7On() && b7Thread() === 'l';            // the Letherii are playing
const b7Third = () => b7On() && b7Thread() === 't';        // the Third is playing
const b7Unit = (t = b7Thread()) => B7_TH[t].unit;
const b7In = id => !!(S && Array.isArray(S.squad) && S.squad.includes(id) && !(S.dead && S.dead[id]));
const b7OtherName = () => (S && S.th && S.th[b7Other()] && S.th[b7Other()].name) || 'the other sergeant';
const b7Coin = n => b7L() ? b5Coin(n) : `${n} silver`; // the Letherii count in docks (Book Five); the Third in silver
const b7SgtLook = () => b7On() ? B7_TH[b7Thread()].look : null; // 018, 019: the Third wears Book Two's look (sgt_dg), the Letherii Book Five's (sgt_mt)
const b7KeyPre = 'b7_';
const b7ChCount = () => Object.keys(BOOK === 'rg' ? CHAPTERS : BOOKSNAP.rg.ch).length;

/* the sergeant's own history follows the squad playing: Book Four's sergeant (as Book Six's Third) for the Third, Book Five's for the Letherii */
function b7SgtFor(t){ const snap = BOOKSNAP[B7_TH[t].book] && BOOKSNAP[B7_TH[t].book].sgt; if (snap) TPL.sgt = Object.defineProperties({}, snap);
  if (typeof PORTRAIT_CACHE !== 'undefined') PORTRAIT_CACHE.clear(); }
/* swap the squad playing. Idempotent. The waiting squad's fields go into S.th[other]; shared: S.f, S.stats, S.chapter(s), S.diff and S.b7 (the Rising) */
function b7Use(t){ if (!b7On() || !B7_TH[t]) return; S.th ??= {}; const cur = S.thread || 't';
  if (cur !== t && S.th[t]) { const out = {}; B7_KEYS.forEach(k => { out[k] = S[k]; }); S.th[cur] = out;
    B7_KEYS.forEach(k => { S[k] = S.th[t][k]; }); delete S.th[t]; }
  S.thread = t; b7SgtFor(t); }
{ const _setBook = setBook; setBook = function(b){ _setBook(b); if (b === 'rg' && S && S.book === 'rg') b7SgtFor(b7Thread()); }; }
{ const _sc = startChapter; startChapter = function(n){ if (b7On() && B7_CH[n]) b7Use(B7_CH[n]); return _sc(n); }; }
/* run fn as if the squad's own earlier book were open (S.book 'hoc' for the Third, 'mt' for the Letherii), for a moment, synchronously:
   the readers, the card screen's words and the tiles are each book's own, unchanged (Book Six's b6As pattern, 100c) */
function b7As(fn){ if (!b7On()) return fn(); const was = S.book; S.book = B7_TH[b7Thread()].book;
  try { return fn(); } finally { S.book = was; } }

/* ---- the shelf ---- */
BOOKS.rg = {id:'rg', n:7, word:'Seven', title:'Reaper\'s Gale', name:'Unwitnessed', h1:['', 'Unwitnessed'], squad:'Two squads', unit:'the squad',
  tag:'The Malazans burn their ships on a hostile shore. In the capital, the Letherii who survived the Edur learn to fear their own neighbours. One war, two squads, opposite sides.',
  titleArt:'title/rg', titleScene:'rg', patch:'insignia/rg',
  blurb:'Lether, a summer after the Edur took it, beside Reaper\'s Gale: the Third lent to the marines on the coast, and Book Five\'s Letherii in Letheras.'};
Object.defineProperty(BOOKS.rg, 'coming', {configurable:true, get(){ return b7ChCount() === 0; }});
Object.defineProperty(BOOKS.rg, 'titleArt', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['title/rg'] ? 'title/rg' : 'title/mt'; }}); // until 120b paints the shore
Object.defineProperty(BOOKS.rg, 'patch', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['insignia/rg'] ? 'insignia/rg' : 'insignia/mt'; }});

/* ---- the transfers: a finished Book Six on the 'adjunct' road (the Third sailed on with the fleet), a finished Book Five on the 'emperor' road ---- */
const b7Road = (o, pre) => o && o.chapters ? (o.chapters[7] ?? (o.f && o.f[pre + 'c7_key'])) : null;
const b7QualT = o => !!(o && o.book === 'bh' && b7Road(o, 'b6_') === 'adjunct');
const b7QualL = o => !!(o && o.book === 'mt' && b7Road(o, 'b5_') === 'emperor');
/* the Third's half of a Book Six save: on top when it played last (Chapter 7 is the Third's), else waiting in o.th.r */
const b7ThirdOf = o => (o.thread || 'r') === 'r' ? o : Object.assign({}, o, (o.th && o.th.r) || {});
function b7CarryT(o){ return b6Carry(b7ThirdOf(o)); }
function b7CarryL(o){ const c = b6Carry(o), who = ['sgt', ...c.mates], debt = {}, debt0 = {};
  who.forEach(k => { const d = o.debt && o.debt[k] != null ? o.debt[k] : (typeof B5_DEBT0 !== 'undefined' ? B5_DEBT0[k] : null); if (d != null) { debt[k] = Math.max(0, d); debt0[k] = debt[k]; } });
  return Object.assign(c, {debt, debt0}); }
const b7ImpT = id => { const o = id && loadSlot(id); return b7QualT(o) ? b7CarryT(o) : null; };
const b7ImpL = id => { const o = id && loadSlot(id); return b7QualL(o) ? b7CarryL(o) : null; };
const b7ImpList = t => roster().list.filter(e => { const o = loadSlot(e.id); return t === 't' ? b7QualT(o) : b7QualL(o); });

/* one squad's half of the save */
function b7Half(t, name, imp){ const T = B7_TH[t];
  const mates = imp ? imp.mates.slice(0, 5) : T.fresh.slice(), squad = ['sgt', ...mates];
  const lvl = clamp(Math.max(T.lvl, imp ? imp.lvl : 1), 1, T.cap);
  const half = {name, squad, camp:imp ? imp.mates.slice(5) : [], loy:{}, gear:imp ? imp.gear : {}, picks:imp ? imp.picks : {}, kit:imp ? imp.kit : [],
    tricks:imp ? imp.tricks : {}, inv:imp ? imp.inv : (t === 't' ? {sharper:2, burner:1, cusser:1, smoker:1, salve:3} : {sharper:0, burner:0, cusser:0, smoker:0, salve:2}),
    lvl, xp:LEVELS[lvl - 1] || 0, dead:{}, parked:{}, wounds:null, silver:20, picksDue:[], debt:null, debt0:null,
    imported:imp ? {from:imp.from, sid:imp.sid, lvl:imp.lvl, mates:imp.mates.slice()} : null,
    trail:[{x:4, y:8}, {x:6, y:8}, {x:4, y:9}, {x:5, y:9}]};
  squad.forEach(k => { if (k !== 'sgt') half.loy[k] = imp ? (imp.loy[k] || 0) : 0; });
  if (imp) imp.dead.forEach(k => { const d = imp.deadAt[k] || {}; half.dead[k] = {ch:d.ch || 7, where:d.where || '', from:d.from || (t === 't' ? 'bh' : 'mt')}; });
  else if (t === 't') half.dead.sathi = {ch:7, where:'The Barrow', from:'dg'}; // the fresh start, as Books Four and Six have it: Sathi fell at the Barrow
  /* Debt is flavour in Book Seven (Claude's call, v10.0-notes): the Letherii keep the numbers their bios read, and nothing moves them */
  if (t === 'l') { const D0 = typeof B5_DEBT0 !== 'undefined' ? B5_DEBT0 : {};
    half.debt = imp && imp.debt ? imp.debt : Object.fromEntries(squad.filter(k => D0[k] != null).map(k => [k, D0[k]]));
    half.debt0 = imp && imp.debt0 ? imp.debt0 : Object.assign({}, half.debt); }
  return half; }
/* a new Book Seven save. nameT: the Third's sergeant; nameL: the Letherii sergeant. impT, impL: slot ids of the transfers, or empty. */
function newStateRG(nameT, nameL, impT, impL, sid){
  nameT = nameT || 'Hask'; nameL = nameL || 'Brann';
  const t = b7Half('t', nameT, b7ImpT(impT)), l = b7Half('l', nameL, b7ImpL(impL));
  const s = Object.assign({v:1, book:'rg', sid:sid || sidFor(nameT), scene:'chintro', node:null, bg:null, card:null, f:{}, pos:{x:5, y:8}, log:[], ending:null,
    battle:null, bopt:null, chapter:0, chapters:{}, area:'pale', thread:'t', th:{l}, b7:{rise:B7_RISE0, file:0, hi:B7_RISE0}}, t);
  migrate(s); s.picksDue = picksOwed(s); s.th.l.picksDue = picksOwed(Object.assign({}, s, s.th.l, {thread:'l'}));
  return s; }

/* ---- the Rising (plan question 4; rg-canon §8): how far Lether has turned against the Edur. One number, 0 to 10, in S.b7.rise, shared by
   both squads. It starts low (canon: the Letherii will not rise, W14; they fight beside the Edur, W17) and is earned.
     b7Rise(n, why)   the Third raises it by how it treats towns, the Indebted and prisoners; the Letherii by what they do or will not do
                      for the Patriotists. n may be negative. Noted, tallied (b7Rose / b7Fell), clamped 0..10. Returns the new value.
     b7Rising()       the number; b7RiseTier(): 'quiet' 0-2, 'stirring' 3-5, 'rising' 6-8, 'risen' 9-10.
   Two faces:
     the Third: a high Rising helps. A check with c.rise:true (towns, guides, supplies, the Indebted) gets the edge "The Rising": +1 stirring,
                +2 rising, +3 risen. b7Open() (stirring or more: towns open), b7Guides() (rising or more: guides walk in).
     the Letherii: a high Rising hunts them. Their file at the Patriotists (S.b7.file, raised by b7Filed(n, why) for their own acts) and
                the Rising together are the heat: b7Heat() = file + floor(Rising / 3). b7HeatTier(): 'clean' 0-2, 'noted' 3-4, 'watched' 5-6,
                'wanted' 7 or more. A check with c.rise:true gets the edge "Your file at the Patriotists": −1 watched, −2 wanted.
                b7Wanted(): a failed check can turn into an arrest, the writer's branch (never the cells: headline only, rule in rg-canon §6). ---- */
const B7_RISE0 = 2, B7_RISEMAX = 10;
const B7_RISEW = {quiet:'Lether keeps its head down', stirring:'Lether is stirring', rising:'Lether is rising', risen:'Lether has risen'};
const B7_HEATW = {clean:'a file nobody reads', noted:'a file with a note on it', watched:'a file the Patriotists are reading', wanted:'a file with a warrant clipped to it'};
const b7S = () => { if (!S) return {rise:B7_RISE0, file:0, hi:B7_RISE0}; S.b7 ??= {rise:B7_RISE0, file:0, hi:B7_RISE0}; return S.b7; };
const b7Rising = () => b7S().rise;
const b7RiseTier = (r = b7Rising()) => r >= 9 ? 'risen' : r >= 6 ? 'rising' : r >= 3 ? 'stirring' : 'quiet';
const b7Open = () => b7Rising() >= 3, b7Guides = () => b7Rising() >= 6;
function b7Rise(n, why = ''){ if (!b7On() || !n) return b7Rising(); const st = b7S(), was = st.rise, t0 = b7RiseTier(was);
  st.rise = clamp(was + n, 0, B7_RISEMAX); const d = st.rise - was; if (!d) return st.rise; st.hi = Math.max(st.hi || 0, st.rise);
  tally(d > 0 ? 'b7Rose' : 'b7Fell', Math.abs(d));
  note(`The Rising ${d > 0 ? '+' : '−'}${Math.abs(d)}${why ? ` (${why})` : ''}: ${st.rise} of ${B7_RISEMAX}.`, d > 0 === (b7Thread() === 't') ? 'good' : 'bad');
  const t1 = b7RiseTier(st.rise); if (t1 !== t0) note(`${B7_RISEW[t1]}.`, d > 0 ? 'good' : 'bad');
  if (typeof updChain === 'function') updChain(); save(); return st.rise; }
const b7File = () => b7S().file || 0;
function b7Filed(n, why = ''){ if (!b7On() || !n) return b7File(); const st = b7S(), was = st.file || 0, h0 = b7HeatTier();
  st.file = Math.max(0, was + n); const d = st.file - was; if (!d) return st.file; if (d > 0) tally('b7Filed', d);
  note(`${d > 0 ? 'Your file at the Patriotists grows' : 'A page of your file goes missing'}${why ? ` (${why})` : ''}.`, d > 0 ? 'bad' : 'good');
  const h1 = b7HeatTier(); if (h1 !== h0) note(`It is ${B7_HEATW[h1]} now.`, d > 0 ? 'bad' : 'good');
  if (typeof updChain === 'function') updChain(); save(); return st.file; }
const b7Heat = () => b7File() + Math.floor(b7Rising() / 3);
const b7HeatTier = (h = b7Heat()) => h >= 7 ? 'wanted' : h >= 5 ? 'watched' : h >= 3 ? 'noted' : 'clean';
const b7Wanted = () => b7HeatTier() === 'wanted';
/* the edges a check with c.rise:true carries in Book Seven */
{ const _ef = edgesFor; edgesFor = function(c, id){ const out = _ef(c, id); if (!b7On() || !c || !c.rise) return out;
    if (b7Thread() === 't') { const k = {quiet:0, stirring:1, rising:2, risen:3}[b7RiseTier()]; if (k) out.push(['The Rising', k]); }
    else { const k = {clean:0, noted:0, watched:-1, wanted:-2}[b7HeatTier()]; if (k) out.push(['Your file at the Patriotists', k]); }
    return out; }; }
/* the widget for a node's html: the Rising, and for the Letherii their file */
function risingHTML(){ const r = b7Rising(), l = b7Thread() === 'l';
  return `<div class="chainbox allybox" role="group" aria-label="The Rising"><div class="crow"><span>The Rising</span><b>${r} of ${B7_RISEMAX} · ${esc(B7_RISEW[b7RiseTier()])}</b></div><div class="bar"><i style="width:${Math.round(r / B7_RISEMAX * 100)}%"></i></div>
    ${l ? `<div class="crow"><span>Your file</span><b>${esc(B7_HEATW[b7HeatTier()])}</b></div><div class="bar${b7HeatTier() === 'watched' || b7HeatTier() === 'wanted' ? ' col' : ''}"><i style="width:${Math.min(100, Math.round(b7Heat() / 8 * 100))}%"></i></div>` : ''}</div>`; }
/* the HUD pill beside the purse: the Rising for both, the file for the Letherii; and the Letherii count in docks */
{ const _updChain = updChain;
  updChain = function(){ const el = typeof document !== 'undefined' && document.getElementById('chainp');
    if (!el || !S || S.book !== 'rg') return _updChain();
    const h = b7HeatTier(); el.innerHTML = `<span class="chainpill allypill"><span>Rising <b>${b7Rising()}</b></span>${b7Thread() === 'l' && h !== 'clean' ? `<span class="${h === 'watched' || h === 'wanted' ? 'dry' : ''}">File <b>${h}</b></span>` : ''}</span>`; }; }
{ const _updSilver = updSilver;
  updSilver = function(){ if (!b7L()) return _updSilver();
    const el = typeof document !== 'undefined' && document.getElementById('silver'); if (!el) return; const t = b5Coin(S.silver);
    if (el.textContent !== t) { el.textContent = t; if (silverShown != null && silverShown !== S.silver) { el.classList.remove('sup', 'sdown'); void el.offsetWidth; el.classList.add(S.silver > silverShown ? 'sup' : 'sdown'); } }
    silverShown = S.silver; updChain(); }; }

/* ---- the Letherii keep Book Five's hands while they play: Ammet's surgery, Perrit's sorcery of the Holds, Pessa's boathook and Brune's
   fish-spear in Lether's words (80's B5_ABX, which reads b5On()); and Lether has no Moranth munitions ---- */
Object.entries(B5_ABX).forEach(([k, x]) => { const a = AB[k]; if (!a) return;
  ['name', 'desc'].forEach(f => { if (!x[f]) return; const d = Object.getOwnPropertyDescriptor(a, f); if (!d) return;
    Object.defineProperty(a, f, {configurable:true, enumerable:true, get(){ return b7L() ? x[f] : d.get ? d.get.call(this) : d.value; }, set(v){ /* fixed per book */ }}); });
  const run = a.run;
  a.run = function(u, x0, y0){ if (!b7L()) return run.call(this, u, x0, y0);
    const t = B && B.units.find(p => p.x === x0 && p.y === y0), _b = blog; let n = 0; const w0 = B && B.warren;
    blog = m => { let s = String(m); if (x.line && n === 0) s = x.line(u, t); if (x.map) x.map.forEach(([re, to]) => { s = s.replace(re, to); }); n++; return _b(s); };
    if (u && u.id === 'ammet' && B) B.warren = Object.assign({}, w0 || {}, {denul:1});
    const done = () => { blog = _b; if (u && u.id === 'ammet' && B && w0) B.warren = w0; };
    let r; try { r = run.call(this, u, x0, y0); } catch (e) { done(); throw e; }
    if (r && r.then) return r.finally(done);
    done(); return r; }; });
{ const _rl = rosterLacks; rosterLacks = function(sq){ const r = _rl(sq); return b7L() ? r.filter(k => k !== 'munitions') : r; }; }

/* ---- the recruits (plan question 7; names checked, rg-canon §11). Base numbers; the roster brings them to the squad's level. ---- */
Object.assign(TPL, {
  doss:{name:'Doss', role:'Indebted farmhand', sig:'D', col:'#a89a6a', hp:20, ac:12, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, st:{might:2, wits:1, guile:1}, ab:['bash', 'salve'],
    epithet:'"You burned the book. I watched you do it. I have been waiting my whole life for somebody to do that."', origin:'A factor\'s holding on the Lether coast', age:26, service:'None. A threshing flail, and twenty-six years of the factor\'s fields',
    weapon:'A threshing flail with an iron-bound swingle, and a sickle in his belt', armour:'A leather jerkin the squad found him, and a quilted cap',
    bio:'Born Indebted on a factor\'s holding a day inland from the coast, to parents who were Indebted before him. He walked into the column\'s camp the night the squad burned the factor\'s ledger, and asked what the Malazans pay. They told him. He said it was more than nothing, which was what he had.',
    traits:['Counts in docks, and has stopped', 'Sleeps through anything but a cart', 'Asks the names of every Malazan god, and keeps none of them'], gear:['A threshing flail', 'A burnt corner of the factor\'s ledger, with his family\'s line on it'],
    get quest(){ return 'Wherever the Malazans are going. He has never been anywhere the factor did not own.'; }},
  wenna:{name:'Wenna', role:'Shake fisher', sig:'W', col:'#7a9a98', hp:16, ac:13, atk:4, dmg:[1,6,2], rng:1, mv:5, init:2, st:{might:1, wits:2, guile:2}, ab:['grapple', 'salve'],
    epithet:'"Your maps were drawn by people who never walked them. I walked them. Follow the gulls inland for a day and then follow me."', origin:'The Shake coast, a fishing village south of the fort', age:30, service:'None. Fourteen years of nets, and every track from the coast to the river',
    weapon:'A gaff on a line, a short fish-knife, and a coil of tarred cord', armour:'Oiled sealskin over wool, and a cord of shells',
    bio:'One of the Shake of the coast, who have a queen again this year and say so, openly, to anyone who asks. She came to the column with fish to sell and stayed to guide it, because she knows the inland roads the Letherii maps leave out, and because the Edur took her brother\'s boat.',
    traits:['Prays to the Shore with her feet in water', 'Says the Letherii names of places, then the Shake ones', 'Mends cord nobody gave her'], gear:['A gaff and line', 'A shell from the beach where her village burns its dead'],
    get quest(){ return 'Inland, as far as the river. Then back to the sea, she says, if the sea is still there.'; }},
  ilsa:{name:'Ilsa', role:'Patriotist clerk', sig:'I', col:'#9a8aa8', hp:14, ac:12, atk:4, dmg:[1,6,1], rng:1, mv:5, init:2, st:{might:0, wits:3, guile:2}, ab:['mark', 'salve'],
    epithet:'"I wrote the files. I know what is in yours. I would like, very much, to stop writing them."', origin:'Letheras, the Pursers\' District', age:28, service:'Six years a clerk at the Patriotists\' headquarters',
    weapon:'A clerk\'s penknife, and a long knife she has not used yet', armour:'A grey clerk\'s coat with the ink still on the cuffs, and a padded jack under it',
    bio:'A clerk at the Patriotists\' headquarters who copied the files of the loyal and the disloyal for six years and never once met the people in them. Then she met one. She came to the squad with what she knew and no plan for what came after, which the squad has decided is honest.',
    traits:['Reads upside down, fast', 'Knows which informers are paid and which do it for love', 'Never says the Invigilator\'s name above a whisper'], gear:['A penknife', 'A page torn from a file, folded small, that she will not show anyone'],
    get quest(){ return 'Out of the files. Out of the city, if it comes to that. Out of the habit of listening at doors, which may take longer.'; }},
  sorvan:{name:'Sorvan', role:'Bluerose rider', sig:'S', col:'#6a7aa8', hp:22, ac:14, atk:4, dmg:[1,8,2], rng:1, mv:5, init:2, st:{might:2, wits:1, guile:1}, ab:['b2_lance', 'salve'],
    epithet:'"Lether bought our horses. It never bought us. It keeps forgetting that."', origin:'Bluerose, the horse country to the east', age:33, service:'Eleven years a lancer, the last of them without a horse',
    weapon:'A Bluerose lance cut down for fighting on foot, and a cavalry sabre', armour:'Blue-enamelled scale over a riding coat, much mended',
    bio:'A lancer of the Bluerose cavalry whose company went east with the armies and left him behind with a lame horse and a bad report. The horse died. The report did not. He came to the Sixth at the muster because the Sixth asked no questions about reports, and he has asked none about the Sixth.',
    traits:['Talks to horses, not about them', 'Trusts officers exactly as far as their horses', 'Keeps his scale blue, whatever it costs'], gear:['A cut-down lance', 'A blue rosette from a horse fair, years ago'],
    get quest(){ return 'A horse again, and a company that rides. Lether owes him both. He has stopped expecting Lether to pay.'; }},
});
Object.assign(VERB, {doss:'brings the flail round at', wenna:'swings the gaff at', ilsa:'cuts at', sorvan:'drives the lance at'});
Object.assign(STATUP, {doss:['might', 'wits'], wenna:['guile', 'wits'], ilsa:['wits', 'guile'], sorvan:['might', 'guile']});
Object.assign(TPL_ROLES, {doss:['heavy', 'mail', 'blade', 'heavyweapon'], wenna:['light', 'blade', 'reach', 'ranged'], ilsa:['light', 'blade'], sorvan:['heavy', 'mail', 'shield', 'blade', 'reach']});
Object.assign(PICKS[3], {
  doss:[['holdline', 'The Long Row', 'Doss\'s free swings are unlimited and hit +2. Twenty-six harvests taught him to keep swinging until the row is done.'], ['shieldwall', 'Stand Behind the Flail', 'Squadmates standing next to Doss get +2 armour. Nothing gets close to a man swinging that.']],
  wenna:[['snare', 'The Gaff Twist', 'Whatever the gaff hauls in is tangled: −2 to hit and −2 armour through its next turn. She has landed bigger, and wetter.'], ['ghost', 'Low Tide', 'Enemies take −2 to hit Wenna. She is never quite where the water was.']],
  ilsa:[['ghost', 'Nobody Notices a Clerk', 'Enemies take −2 to hit Ilsa. Six years of being looked through.'], ['sappers_eye', 'Read the File', 'The squad rolls +2 initiative, and Ilsa\'s free swings hit +2. She has read what they will do before they do it.']],
  sorvan:[['holdline', 'The Lance Line', 'Sorvan\'s free swings are unlimited and hit +2. A lancer on foot is still a lancer.'], ['shieldwall', 'Bluerose Scale', 'Squadmates standing next to Sorvan get +2 armour. The company rode knee to knee. He stands that way still.']],
});
/* the recruits' gods: Wenna's the Shore (the Shake's, Book Five's Brune), Ilsa's the Empty Hold (Lether's own, Book Five's Perrit). Doss and
   Sorvan have none (the Errant's cult among the Indebted is rumour at most, rule 57). No new god, so no new BOONS row or sigil. */
Object.assign(PATRONS, {
  wenna:{sig:'brune', god:'the Shore', title:'The Shore', txt:id => `Wenna, down in the mud, says something in the Shake tongue that is half a prayer and half a complaint.\n\nThere is surf where there is no sea, and the ground goes cold and wet under the squad, and moves the way sand moves when a wave goes out. The Shake have a queen again. The Shore, it seems, has noticed.`},
  ilsa:{sig:'perrit', god:'the Empty Hold', title:'The Empty Hold', txt:id => `Ilsa goes down with her hand open, and does not close it.\n\nSomething opens over the squad the way a door opens in an empty room: no one comes through it, and the room is different afterwards. The Empty Hold has never had a king. It does not seem to mind.`},
});
/* the sergeants: Treach for the Third's (Books Three, Four and Six), the Errant for the Letherii (Book Five; rg-canon §9: if he answers in Chapters 4
   or 6 the chapter's words carry a twist, never a gift; the boon itself is Book Five's) */
{ const prev = Object.getOwnPropertyDescriptor(PATRONS, 'sgt');
  Object.defineProperty(PATRONS, 'sgt', {configurable:true, enumerable:true, get(){ return S && S.book === 'rg' ? (S.thread === 'l' ? PATRON_ERRANT : PATRON_TREACH) : prev.get ? prev.get() : prev.value; }, set(v){ /* kept per book */ }}); }

const B7_DONE = {doss:'b7_dossDone', wenna:'b7_wennaDone', ilsa:'b7_ilsaDone', sorvan:'b7_sorvanDone'};
const B7_HOME = {doss:'the column\'s camp followers', wenna:'the Shake fishers at the column\'s edge', ilsa:'a safe room off the Quillas Canal', sorvan:'the Bluerose horse lines'};
const b7Recruits = () => B7_TH[b7Thread()].recruits;
const b7CanRecruit = id => !!(b7On() && TPL[id] && b7Recruits().includes(id) && !(S.dead && S.dead[id]) && S.f[B7_DONE[id]] !== 0);
function b7Join(id){ if (!b7CanRecruit(id) || b7In(id)) return false;
  if ((S.squad || []).length < ROSTER_CAP) { recruit(id); S.f[B7_DONE[id]] = 1; }
  else { S.camp = [...new Set([...(S.camp || []), id])]; S.loy[id] ??= 0; S.picks[id] ??= []; S.gear[id] ??= {}; S.f[B7_DONE[id]] = 2; note(`${NAME(id)} waits with ${B7_HOME[id]}: six walk already.`); }
  save(); return true; }
{ const _recruit = recruit; recruit = function(id){ if (!b7On()) return _recruit(id); const n0 = note;
    note = (t, c) => n0(String(t).replace('joins the Fourth', `joins ${b7Unit()}`), c); try { _recruit(id); } finally { note = n0; } save(); }; }

ROSTER_BOOKS.rg = {
  get core(){ return B7_TH[b7Thread()].core; },
  bench:()=>b7Thread() === 't' ? ['doss', 'wenna', 'mehet', 'ottar', ...B4_RECRUITS, ...HOC_NEW] : ['ilsa', 'sorvan', ...B5_RECRUITS],
  home:id=>B7_HOME[id] || (b7Thread() === 't' ? 'the column\'s rear' : 'the company'),
  wait:id=>(S.camp || []).includes(id) || (!!B7_DONE[id] && S.f[B7_DONE[id]] === 2),
  gone:id=>!!B7_DONE[id] && !b7CanRecruit(id),
  open:()=>true,
  in:id=>{ if (B7_DONE[id]) S.f[B7_DONE[id]] = 1; },
  out:id=>{ if (B7_DONE[id]) S.f[B7_DONE[id]] = 2; }};

/* ---- the foes (rg-canon §2, §3). Two scales: the Third's fights are sized for levels 16-21 (Book Six's numbers and a little more), the
   Letherii's for 8-12 (Book Five's numbers and a little more). Bodies borrowed from Book Five's Edur and Letherii and Book Two's soldiers
   until the chapter art. The balance pass sets the final numbers (B7GAP below, empty until David runs it). ---- */
Object.assign(FOES, {
  /* the Third's enemies: the Edur and the Letherii who fight beside them */
  b7_edur:{name:'Tiste Edur warrior', kind:'b5_edur', sig:'E', hp:40, ac:16, atk:12, dmg:[1,10,4], rng:1, mv:4, init:2, sk:['parry'], verb:'cuts, grey and quick, at'},
  b7_edurspear:{name:'Edur spearman', kind:'b5_unblooded', sig:'u', hp:34, ac:15, atk:12, dmg:[1,8,4], rng:1, mv:5, init:3, sk:['reach'], verb:'drives a spear at'},
  b7_edurchief:{name:'Edur war-leader', kind:'b5_edur', sig:'W', hp:78, ac:17, atk:13, dmg:[1,12,5], rng:1, mv:4, init:2, boss:true, sk:['parry', 'rally'], verb:'brings a long blade down on'},
  b7_krisnan:{name:'K\'risnan', kind:'b5_krisnan', sig:'K', hp:34, ac:14, atk:11, dmg:[1,8,3], rng:4, mv:3, init:1, sk:['daze', 'drain'], verb:'reaches through the shadow at'},
  b7_wraith:{name:'Shadow wraith', kind:'b5_wraith', sig:'w', hp:22, ac:15, atk:11, dmg:[1,6,3], rng:1, mv:5, init:3, sk:['drain'], verb:'claws at'},
  b7_lethsoldier:{name:'Letherii soldier', kind:'b5_letherii', sig:'l', hp:32, ac:15, atk:11, dmg:[1,8,3], rng:1, mv:4, init:1, verb:'cuts at'},
  b7_lethxbow:{name:'Letherii crossbowman', kind:'b5_letherii_bow', sig:'x', hp:26, ac:14, atk:11, dmg:[1,10,3], rng:6, mv:4, init:2, sk:['pin'], verb:'looses a bolt at'},
  b7_lethmage:{name:'Letherii cadre mage', kind:'b5_letherii', sig:'m', hp:28, ac:13, atk:11, dmg:[2,6,2], rng:5, mv:4, init:2, sk:['daze'], verb:'looses the Hold\'s lightning at'},
  b7_lethofficer:{name:'Letherii Finadd', kind:'b5_letherii', sig:'F', hp:64, ac:16, atk:12, dmg:[1,10,4], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'cuts at'},
  b7_factorman:{name:'Factor\'s guard', kind:'thug', sig:'g', hp:28, ac:14, atk:10, dmg:[1,8,3], rng:1, mv:4, init:1, sk:['shove'], verb:'swings a cudgel at'},
  /* the Letherii's enemies: Patriotist agents and their bullies, the mob, Edur who do not trust them, and in Chapter 6 the Adjunct's soldiers */
  b7_agent:{name:'Patriotist agent', kind:'b5_letherii', sig:'a', hp:15, ac:13, atk:5, dmg:[1,6,2], rng:1, mv:5, init:3, sk:['bleed'], verb:'slips a knife at'},
  b7_enforcer:{name:'Patriotist enforcer', kind:'bruiser', sig:'b', hp:20, ac:13, atk:5, dmg:[1,8,2], rng:1, mv:4, init:1, sk:['shove'], verb:'swings a weighted club at'},
  b7_agentchief:{name:'Patriotist captain', kind:'thug', sig:'P', hp:36, ac:14, atk:6, dmg:[1,8,3], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'cuts at'},
  b7_rioter:{name:'Rioter', kind:'bruiser', sig:'r', hp:13, ac:11, atk:4, dmg:[1,6,1], rng:1, mv:4, init:1, verb:'swings a stave at'},
  b7_edurl:{name:'Tiste Edur warrior', kind:'b5_edur', sig:'E', hp:22, ac:14, atk:6, dmg:[1,10,2], rng:1, mv:4, init:2, sk:['parry'], verb:'cuts, grey and quick, at'},
  b7_malregular:{name:'Malazan regular', kind:'b2soldier', sig:'n', hp:22, ac:15, atk:6, dmg:[1,8,2], rng:1, mv:4, init:1, verb:'cuts at'},
  b7_malxbow:{name:'Malazan crossbowman', kind:'b2soldier', sig:'q', hp:18, ac:13, atk:6, dmg:[1,10,2], rng:6, mv:4, init:2, sk:['pin'], verb:'looses a quarrel at'},
  b7_malsgt:{name:'Malazan sergeant', kind:'b2soldier', sig:'M', hp:40, ac:16, atk:7, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'cuts at'},
  /* on the squad's side, in a fight's allies:[[id, x, y]]: a marine of Keneb's column with the Third, a Whitefinder regular with the Letherii */
  b7_marine:{name:'Marine of the column', kind:'b2soldier', sig:'k', hp:28, ac:15, atk:10, dmg:[1,8,3], rng:1, mv:4, init:2, verb:'cuts at'},
  b7_whitefinder:{name:'Whitefinder regular', kind:'b5_letherii', sig:'r', hp:15, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:1, verb:'cuts at'},
});
/* the allies grow with the squad, as Book Five's regular does */
{ const _mkAlly = mkAlly; mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y);
    if (k === 'b7_marine' || k === 'b7_whitefinder') { u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); u.b7reg = true; } return u; }; }
/* ---- Book Seven's balance (David, Thu Nov 5, 2026, ~11:20 PM PST: "build B7GAP"; docs/rg-balance.md). As built every Bridgeburner fight
   was won 100% (the 80% and 60% first read for Ch4's horse lines and Ch6's landing were a harness fault, fixed in tools/balance.mjs).
   B7GAP gives each fight its own boost on Bridgeburner only ({ac +, atk +, hp ×, dmg +}, as Book Six's B6GAP; mv + only on Ch5's running
   fight, where the Edur must catch a squad that keeps moving), tuned to about 75-80% won (20 runs a fight). Two scales: the Third's
   fights (levels 16-19) carry big rows, the Letherii's (8-10) small ones; a fight with a second area carries less, the area after
   is the harder half. Soldier is untouched (every fight 100%). Nothing here runs outside Book Seven. ---- */
const B7GAP_ROW = {ac:3, atk:3, hp:2.0, dmg:4}; // a b7_ fight without its own row
const B7GAP = {
  b7_c1_dunes:{ac:3,atk:3,hp:2.4,dmg:4},
  b7_c1_riders:{ac:3,atk:3,hp:2.0,dmg:4},
  b7_c1_tally:{ac:3,atk:3,hp:2.0,dmg:4},
  b7_c2_gate:{ac:4,atk:4,hp:2.45,dmg:5},
  b7_c2_alley:{ac:2,atk:2,hp:1.5,dmg:3},
  b7_c2_bridge:{ac:2,atk:3,hp:1.6,dmg:3},
  b7_c3_farm:{ac:4,atk:4,hp:2.25,dmg:4},
  b7_c3_road:{ac:6,atk:6,hp:3.0,dmg:6},
  b7_c3_factor:{ac:4,atk:4,hp:2.9,dmg:5},
  b7_c4_riot:{ac:4,atk:4,hp:2.7,dmg:4},
  b7_c4_edurcamp:{ac:4,atk:4,hp:2.2,dmg:4},
  b7_c4_patriots:{ac:3,atk:3,hp:1.5,dmg:3},
  b7_c5_road:{ac:5,atk:5,hp:2.6,dmg:5},
  b7_c5_bailiff:{ac:8,atk:8,hp:4.8,dmg:8},
  b7_c5_village:{ac:1,atk:2,hp:1.35,dmg:2} /* the mortal fight: the square after the street is the hard half */,
  b7_c5_slip:{ac:5,atk:5,hp:2.6,dmg:6,mv:1} /* the running fight */,
  b7_c6_deserters:{ac:4,atk:4,hp:2.2,dmg:4},
  b7_c6_landing:{ac:2,atk:2,hp:1.45,dmg:2},
  b7_c6_stand:{ac:3,atk:3,hp:1.6,dmg:3},
  b7_c6_break:{ac:3,atk:3,hp:1.65,dmg:3},
  b7_c7_gate:{ac:2,atk:3,hp:1.7,dmg:4},
  b7_c7_streets:{ac:2,atk:2,hp:1.9,dmg:4},
  b7_c7_bridge:{ac:4,atk:4,hp:2.6,dmg:5}};
const b7Gap = () => { if (!b7On() || (S.diff || 'soldier') !== 'bridgeburner') return null; const id = B && B.id; return (id && B7GAP[id]) || (id && /^b7_/.test(id) ? B7GAP_ROW : null); };
{ const _mkFoe = mkFoe;
  mkFoe = function(k, x, y, extra){ const u = _mkFoe(k, x, y, extra); const g = b7Gap(); if (!g) return u;
    u.ac = (u.ac || 10) + (g.ac || 0); u.atk = (u.atk || 0) + (g.atk || 0); u.maxhp = u.hp = Math.max(1, Math.round(u.maxhp * (g.hp || 1)));
    if (u.dmg) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + (g.dmg || 0)]; if (g.mv) u.mv = (u.mv || 4) + g.mv; return u; }; }

/* ---- the words Book Seven throws at you. Bound by rg-canon §7: "the new emperor" (not a name), the Errant as the Letherii pray to him,
   the Shake's queen said openly and nothing more, the Edur leaving as the city sees it ---- */
const b7Saw = t => () => !!S && (S.chapter || 0) >= t;
GLOSSX.rg = [
  [0, 'Lether', 'The kingdom, and its capital Letheras: canals, towers, markets and ledgers. The Tiste Edur took it years ago and made it an empire. Lether still counts everything.'],
  [0, 'The Tiste Edur', 'Grey-skinned, long-lived, out of the north. Their emperor sits the throne in Letheras. Their warriors are few for an empire this size, and every Letherii knows it.'],
  [0, 'The Indebted', 'A class in Lether, not only a condition. A debt that cannot be paid passes to the children.'],
  [0, 'Docks', 'Letherii coin. There are bigger coins. A soldier mostly sees docks, and mostly sees them leave.'],
  [0, 'The Rising', 'How far Lether has turned against the Edur. The Malazans need it high. The Patriotists need it low, and they count who raises it.'],
  [0, 'The Fourteenth', 'The Adjunct\'s army, come across the sea from the Empire\'s side of the world after an Edur fleet. Its marines go inland in small groups.', ()=>b7Thread() === 't' || b7Saw(4)()],
  [0, 'Fist Keneb', 'The Fourteenth\'s officer who leads the marines inland. The Third is lent to his column as a squad of heavies.', ()=>b7Thread() === 't'],
  [0, 'The marines', 'The Fourteenth\'s marines: small squads, sappers, munitions, and a habit of moving at night. The Third is not marines, and is reminded of it daily.', ()=>b7Thread() === 't'],
  [0, 'The Patriotists', 'Letheras\'s secret police under Invigilator Karos Invictad. Their charter is the loyal and the disloyal, and they decide which is which.', ()=>b7Thread() === 'l' || b7Saw(3)()],
  [0, 'Your file', 'Everyone in Letheras has a file at the Patriotists. Yours is thicker than you would like.', ()=>b7Thread() === 'l'],
  [0, 'The Whitefinder Battalion', 'The squad\'s battalion. Its soldiers paint a white fingertip on their shield-boss. Nobody can say for certain why.', ()=>b7Thread() === 'l'],
  [0, 'The Errant', 'Lether\'s god of chance and fateful circumstance. Soldiers pray to him before a wager.', ()=>b7Thread() === 'l'],
  [1, 'The Shake', 'The first people of Lether\'s coast, much married into. This year they have a queen again, and say so openly.', b7Saw(1)],
  [2, 'Karos Invictad', 'The Invigilator of the Patriotists. Nobody in the squad has seen him. Everybody has seen what he signs.', b7Saw(2)],
  [4, 'Bluerose', 'A conquered horse country to the east. Its horses are behind Lether\'s cavalry. Its officers are not trusted.', b7Saw(4)],
  [4, 'Kravos Hill', 'Where the commanders of the army raised against the invaders keep their camp.', b7Saw(4)],
  [7, 'The new emperor', 'The man the crowd in Letheras shouted for. Lether has had emperors before. It has never had one like this, people say.', b7Saw(7)],
];

/* ---- the journal, the count and Deeds ---- */
{ const _jn = journalNotes; journalNotes = function(){ const out = _jn(); if (!b7On()) return out;
    const o = S.th && S.th[b7Other()], t = b7Thread() === 't';
    out.unshift(`${t ? 'The Third, lent to Keneb\'s column' : 'The Sixth Company\'s squad, in Letheras'}. The Rising: ${b7Rising()} of ${B7_RISEMAX}, ${B7_RISEW[b7RiseTier()].toLowerCase()}.${t ? '' : ` Your file is ${B7_HEATW[b7HeatTier()]}.`}${o ? ` ${b7Other() === 't' ? 'The Third' : 'The Letherii squad'} (Sergeant ${esc(o.name)}) is elsewhere in Lether, at level ${o.lvl}.` : ''}`);
    return out; }; }
{ const _sr = statsRows; statsRows = function(s){ const r = _sr(s); if (!s || s.book !== 'rg') return r; const st = s.stats || {}, b = s.b7 || {};
    r.push(['The Rising, now', `${b.rise ?? B7_RISE0} of ${B7_RISEMAX}`], ['The Rising, at its height', b.hi ?? B7_RISE0], ['Pages added to the Letherii file', st.b7Filed || 0]); return r; }; }
function b7DeedsExtra(mine){ const hi = mine.reduce((a, {s}) => Math.max(a, ((s.b7 || {}).hi) || 0), 0), fin = mine.filter(({s}) => bookDone(s)).length;
  const rows = [['The Rising at its height, across every sergeant', hi ? `${hi} of ${B7_RISEMAX}` : 'Not yet'], ['Lether raised by', mine.reduce((a, {s}) => a + (((s.stats || {}).b7Rose) || 0), 0) || 'Nothing yet'], ['Finished in Letheras', fin || 'Not yet']];
  return `<h4 class="jh">The Rising</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }

/* the chapter's keys (the brief fixes them; plan "Key choices"). Chapter 7's are the Third's roads; the Letherii's road is S.f.b7_lethRoad,
   set in Chapter 6: 'army', 'palace' or 'free' */
const B7KEYS = {1:['burn', 'strip'], 2:['name', 'refuse'], 3:['ledger', 'loot'], 4:['edur', 'letherii'], 5:['hold', 'slip'], 6:['stand', 'break'], 7:['adjunct', 'letheras', 'home']};
const B7_LETHROADS = ['army', 'palace', 'free'];

/* ---- the backdrops: each borrows an earlier book's drawing until the chapter art replaces it (Book Six's pattern, 100) ---- */
const B7_SCENE_LIKE = {b7_coast_burning:'b2_hissar_burning', b7_coast_night:'b2_harbour_night', b7_farm_night:'b3_c5_burnt', b7_village:'b5_road_south', b7_march_night:'b3_c6_road',
  b7_camp_night:'b3_c2_camp_night', b7_barracks:'b5_barracks', b7_letheras:'b5_letheras', b7_kravos:'b5_branskeep', b7_field:'b3_c6_entrench', b7_river:'b5_landing', b7_city_burning:'b2_hissar_burning'};
Object.assign(SCENES, {
  b7_coast_burning:{loc:'The Lether coast', sub:'The transports burning · night', cap:'Ships burning at their anchors all along the shore, the light on the water, and an army on the beach with its back to them.', amb:'battle'},
  b7_coast_night:{loc:'The Lether coast', sub:'Above the beach · night', cap:'Dunes, a cold wind off the sea, and the smoke of the ships still lying along the water.', amb:'explore'},
  b7_farm_night:{loc:'Inland', sub:'A farm off the road · night', cap:'A dark farmhouse, a barn, a dog that has gone quiet, and the column\'s squads spread out in the fields.', amb:'explore'},
  b7_village:{loc:'Inland', sub:'A village on the road to the river', cap:'A village of plaster and thatch, a well in the square, the factor\'s house the only one in stone.', amb:'explore'},
  b7_march_night:{loc:'Inland', sub:'The column on the move · night', cap:'A file of soldiers on a farm track in the dark, no lamps, no talking, the sound of boots in wet grass.', amb:'explore'},
  b7_camp_night:{loc:'Inland', sub:'A cold camp · night', cap:'No fires. Soldiers asleep in their cloaks in a wood, and the sentries awake.', amb:'explore'},
  b7_barracks:{loc:'Letheras', sub:'The Whitefinders\' barracks · night', cap:'Lamps in the barracks windows, the canal smell over the wall, and grey shapes at the gate who are not Letherii.', amb:'explore'},
  b7_letheras:{loc:'Letheras', sub:'A street off the canal', cap:'Shutters closed in the middle of the day, a broadsheet torn off a wall, and someone across the way who looks away too quickly.', amb:'explore'},
  b7_kravos:{loc:'Kravos Hill', sub:'The army\'s camp', cap:'Tents in their thousands on the slopes below a hill, the commanders\' banners on its top, and Edur among them who do not sit with the Letherii.', amb:'explore'},
  b7_field:{loc:'Before Letheras', sub:'The field', cap:'A plain cleared of crops, a ridge with banners on it, and the whole army of Lether drawn up and waiting.', amb:'explore'},
  b7_river:{loc:'The Lether River', sub:'The landing', cap:'A broad river, barges and ships coming up it under sail, and soldiers coming off them faster than seems possible.', amb:'explore'},
  b7_city_burning:{loc:'Letheras', sub:'The city · the last night', cap:'Smoke over the towers, a white light under one quarter that should not be there, and the crowd in the streets shouting a name.', amb:'battle'},
});
Object.entries(B7_SCENE_LIKE).forEach(([k, like]) => { SCENEX[k] ??= (cv, t) => (SCENEX[like] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); });
/* the chapter card and end screen fall back by thread when a chapter names no scene: the coast for the Third, the barracks for the Letherii */
{ const _sci = showChapterIntro; showChapterIntro = function(){ const r = _sci(); const CH = CHAPTERS[S && S.chapter];
    if (b7On() && CH && !(CH.intro && CH.intro.scene)) { G.sceneKind = b7Thread() === 't' ? 'b7_coast_night' : 'b7_barracks'; AUDIO.setScene(sceneAmb(G.sceneKind, 'explore')); } return r; }; }
{ const _endBeat = endBeat; endBeat = function(won){ const r = _endBeat(won); if (b7L() && B && B.banner && !won) B.banner.txt = 'The squad is down'; return r; }; }
