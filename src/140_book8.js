/* ============ Book Eight: Time Served, beside Toll the Hounds (v11.0 engine, 140) ============
   One squad: the Fourth (Books One, Three and Six), years out of the Host and living in Darujhistan. Chapter 1 is the winter before the
   Gedderone Fete; Chapters 2 to 5 are a merchant's caravan east over the old Domin to Black Coral and back; Chapters 6 and 7 are the Fete's
   last night and the morning after (the calendar, fix A: docs/book8-tth-plan.md). The book's own system is the Contract (S.b8): how much
   the Assassins' Guild wants the Fourth dead. Levels: a fresh start is 16, a transfer keeps its level if higher, the cap is 21 (014 lvCap).
   Plan: docs/book8-tth-plan.md (David, Nov 8, 2026). Canon: docs/tth-canon.md (binding: hard limits §4, keep-open rules 70-83 in
   series-canon §(a)). Notes: docs/v11.0-notes.md. Brief: docs/tth-book-brief.md. Ids b8_, shelf 140-159, abbreviation 'tth'. */

const b8On = () => !!(S && S.book === 'tth');
const B8_START_LVL = 16, B8_CAP = 21;
const B8_CORE = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl'];
const B8_FRESH = ['brisk', 'kettle', 'tuft', 'ohl'];           // the canon-default survivors, as Book Six's fresh Fourth (100)
const B8_RECRUITS = ['vasso', 'edrem'];
const B8_OLD = ['sohra', 'greysword', 'ellis', 'vell', 'brannoc', 'ressa']; // earlier recruits who can come across on a transfer
const b8In = id => !!(S && Array.isArray(S.squad) && S.squad.includes(id) && !(S.dead && S.dead[id]));
const b8KeyPre = 'b8_';
const b8ChCount = () => Object.keys(BOOK === 'tth' ? CHAPTERS : BOOKSNAP.tth.ch).length;
/* the chapter's keys (the brief fixes them, plan question 6), the defaults the play bot and a rebuild use, and Chapter 7's roads */
const B8CH = {1:'Before the Fete', 2:'The Black Coral Road', 3:'Black Coral', 4:'The Pilgrims\' Camp', 5:'The Road Back', 6:'The Night of the Hounds', 7:'The Toll'};
const B8KEYS = {1:['hunt', 'quiet'], 2:['fields', 'pass'], 3:['kneel', 'stand'], 4:['hold', 'burn'], 5:['fast', 'wary'], 6:['wall', 'street'], 7:['daru', 'coral', 'east']};
const B8KEY0 = {1:'quiet', 2:'pass', 3:'stand', 4:'hold', 5:'wary', 6:'street', 7:'daru'};
const b8Key = n => (S && S.f && S.f[`b8_c${n}_key`]) || (S && S.chapters && S.chapters[n]) || null;

/* ---- the shelf ---- */
BOOKS.tth = {id:'tth', n:8, word:'Eight', title:'Toll the Hounds', name:'Time Served', h1:['Time', 'Served'], squad:'Fourth Squad', unit:'the Fourth',
  tag:'Five old soldiers in Darujhistan, years out of the army. Somebody has written their names on a paper, and paid for it.',
  titleArt:'title/tth', titleScene:'tth', patch:'insignia/tth',
  blurb:'Darujhistan and Black Coral, years after Coral, beside Toll the Hounds. The Fourth again, out of the army and not out of reach. A finished Book Three on the daru or stand-down road, or a finished Book Six, can carry its Fourth across.'};
Object.defineProperty(BOOKS.tth, 'coming', {configurable:true, get(){ return b8ChCount() === 0; }});
Object.defineProperty(BOOKS.tth, 'titleArt', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['title/tth'] ? 'title/tth' : 'title/moi'; }}); // until 140b paints the city
Object.defineProperty(BOOKS.tth, 'patch', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['insignia/tth'] ? 'insignia/tth' : 'insignia/patch'; }});

/* ---- the sergeant in Book Eight: the same Untan sergeant, years on, in the city (Book One's look; 018, 019 need no change) ---- */
BOOKSNAP.tth.sgt = Object.getOwnPropertyDescriptors({
  name:'', role:'Sergeant', sig:'S', col:'#d6a24a', hp:22, ac:14, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, st:{might:2, wits:2, guile:1}, ab:['rally', 'shove', 'salve'],
  epithet:'Fourth Squad, once of the Seventh Company. Time served.', origin:'Unta, Quon Tali', age:39, service:'Eleven years, marines, and the years since, which do not count and will not stop', height:'Middling. Stands like something taller, still.',
  weapon:'The Malazan longsword, notched three times now, and the knife nobody has seen drawn', armour:'Boiled leather over quilting, kept oiled out of habit, and an iron cap on a nail by the door',
  get bio(){ return `Eleven years in the marines and some years out of them, in Darujhistan, which is long enough to learn the price of bread and not long enough to stop counting the exits in a room. ${b8ArriveWords()}`; },
  get bio2(){ return `Came up through the Untan garrison, out of the Pale with all five, through Coral with whoever was left. Keeps a ledger still, for the squad's rent and the squad's debts and a column for the names that are not owed anything any more.\n\nThe city has been kind to the Fourth, in the way a city is kind to anyone who pays on time and does not start things. The sergeant has not started anything. Somebody else, this winter, has.`; },
  traits:['Reads every paper twice', 'Never sits with a back to a door', 'Remembers the names of the dead, all of them', 'Drinks only after, never during, even now'],
  gear:['The squad\'s ledger, waterproofed', 'A Second Army whistle, kept in a drawer', 'A key to a door up the street from the Phoenix'],
  get quest(){ const c = b8Contract(); return c >= 6 ? 'The Guild has stopped pretending. There are knives on the roofs most nights now, and the sergeant has started sleeping in boots again. Somebody paid for this. The sergeant would like a word with whoever it was, and knows better than to go looking.'
    : c >= 3 ? 'Somebody has put the Fourth on a paper. The Guild does not say who, and the sergeant has stopped asking out loud. The question stays in the room anyway, like smoke.'
    : 'The paper, if there is still a paper, has gone quiet. Quiet is not the same as gone. The sergeant knows the difference, and checks the roofs anyway.'; },
});

/* ---- where the Fourth came from: S.imported.{book, road}. A fresh start is the daru road, canon's default (plan question 1) ---- */
const B8_ROADS = {daru:'moi', standdown:'moi', highfist:'bh', hanarara:'bh', home:'bh'};
const b8Road = () => (S && S.imported && S.imported.road) || null;           // null on a fresh start
const b8Story = () => b8Road() || 'daru';                                    // what the Fourth's years look like to a writer
function b8ArriveWords(r = b8Story()){
  return r === 'standdown' ? 'The Fourth stood itself down on a hill outside the city after Coral and scattered, and the city, one by one, put most of it back together again. Nobody planned that. Nobody has complained.'
    : r === 'highfist' || r === 'hanarara' ? 'The Fourth came back across the ocean from Seven Cities on the Host\'s time-served list, years on, with a paper that said they were done and a purse that agreed for about a month.'
    : r === 'home' ? 'The Fourth went home from Seven Cities, found that home had moved on without them, and took ship west again to the one city that had ever let them sit down.'
    : 'The Fourth stayed in Darujhistan the season after Coral, and stayed after that, and keeps a door now, up the street from the Phoenix, which had other ideas about doors.'; }

/* ---- the transfers: a finished Book Three on the 'daru' or 'standdown' road; a finished Book Six whose Fourth took 'highfist', 'hanarara' or 'home' ---- */
const b8RoadOf = o => !o ? null : o.book === 'moi' ? (o.chapters && (o.chapters[7] ?? (o.f && o.f.b3_c7_key))) : o.book === 'bh' ? (o.f && o.f.b6_fourthRoad) : null;
const b8QualMoi = o => !!(o && o.book === 'moi' && bookDone(o) && ['daru', 'standdown'].includes(b8RoadOf(o)));
const b8QualBh = o => !!(o && o.book === 'bh' && bookDone(o) && ['highfist', 'hanarara', 'home'].includes(b8RoadOf(o)));
const b8Qual = o => b8QualMoi(o) || b8QualBh(o);
/* the Fourth's half of a Book Six save: on top when it played last, else waiting in o.th.h (100's swap) */
const b8FourthOf = o => o.book !== 'bh' || o.thread === 'h' ? o : Object.assign({}, o, (o.th && o.th.h) || {});
function b8Carry(o){ const f = b8FourthOf(o), c = b6Carry(f); return Object.assign(c, {from:f.name || o.name, road:b8RoadOf(o), book:o.book}); }
const b8Imp = id => { const o = id && loadSlot(id); return b8Qual(o) ? b8Carry(o) : null; };
const b8ImpList = () => roster().list.filter(e => b8Qual(loadSlot(e.id)));
const b8ImpName = id => { const o = id && loadSlot(id); return o && b8Qual(o) ? String(b8FourthOf(o).name || o.name || 'Hask') : null; };
function b8ImpDesc(id){ const i = b8Imp(id); if (!i) return 'A fresh start: the Fourth stayed in Darujhistan after Coral. Brisk, Kettle, Tuft and Ohl, at level 16.';
  const went = i.mates.map(k => TPL[k].name), dead = i.dead.map(k => TPL[k].name);
  return `Sergeant ${esc(i.from)}'s Fourth (Book ${i.book === 'moi' ? 'Three' : 'Six'}, the ${esc(i.road)} road): ${went.length ? esc(went.join(', ')) : 'nobody else'}${dead.length ? `. ${esc(dead.join(' and '))} did not come through` : ''}. ${i.lvl < B8_START_LVL ? 'The years between bring them to level 16.' : `They keep level ${Math.min(i.lvl, B8_CAP)}.`}`; }

/* a new Book Eight save. name: the sergeant; impId: the slot id of a transfer, or empty */
function newStateTTH(name, impId, sid){
  name = name || 'Hask'; const imp = impId ? b8Imp(impId) : null;
  const mates = imp ? imp.mates.slice(0, 5) : B8_FRESH.slice(), lvl = clamp(Math.max(B8_START_LVL, imp ? imp.lvl : 1), 1, B8_CAP);
  const s = {v:1, book:'tth', sid:sid || (imp ? newSid() : sidFor(name)), name, scene:'chintro', node:null, bg:null, card:null, f:{}, pos:{x:5, y:8}, log:[], ending:null, battle:null, bopt:null,
    chapter:0, chapters:{}, area:'pale', squad:['sgt', ...mates], camp:imp ? imp.mates.slice(5) : [], loy:{}, gear:imp ? imp.gear : {}, picks:imp ? imp.picks : {}, kit:imp ? imp.kit : [],
    tricks:imp ? imp.tricks : {}, inv:imp ? imp.inv : {sharper:2, burner:1, cusser:1, smoker:1, salve:3}, lvl, xp:LEVELS[lvl - 1] || 0, dead:{}, parked:{}, wounds:null,
    silver:30, picksDue:[], trail:[{x:4, y:8}, {x:6, y:8}, {x:4, y:9}, {x:5, y:9}], b8:{con:B8_CON0, hi:B8_CON0, lo:B8_CON0},
    imported:imp ? {from:imp.from, sid:imp.sid, book:imp.book, road:imp.road, lvl:imp.lvl, mates:imp.mates.slice(), lifted:imp.lvl < B8_START_LVL} : null};
  s.squad.forEach(k => { if (k !== 'sgt') s.loy[k] = imp ? (imp.loy[k] || 0) : 0; }); s.camp.forEach(k => { s.loy[k] = imp ? (imp.loy[k] || 0) : 0; });
  if (imp) imp.dead.forEach(k => { const d = imp.deadAt[k] || {}; s.dead[k] = {ch:d.ch || 7, where:d.where || '', from:d.from || imp.book}; });
  migrate(s); s.picksDue = picksOwed(s);
  return s; }

/* ---- the Contract (plan question 4): the Guild's interest in the Fourth, 0 to 10, in S.b8.con. It starts at 3: a name on a paper.
     b8Contract()            the number. b8ConTier(): 'forgotten' 0-1, 'paper' 2-3, 'price' 4-5, 'watched' 6-7, 'veteran' 8-9, 'grandmaster' 10.
     b8Con(n, why)           moves it (n may be negative): noted with the reason, clamped 0..10, tallied b8ConUp / b8ConDown, saved; returns the new value.
                             It climbs with blood spilled in the city, names asked and the Guild's dead; it falls with time away, friends on the
                             Council's edges and what the squad keeps quiet about. Two moves are the engine's own:
                               - the Guild counts its dead: a won fight whose def has guild:true raises it by 1 (once a fight, not its second area);
                               - time away: the start of Chapters 3 and 4 (Black Coral) lowers it by 1 each, once.
     b8Roofs(ch)             who waits on the roofs, by the Contract (Chapters 5 to 7): an array of FOES ids. Chapter 5's road keeps to knives
                             (at most three); Chapter 6 is the whole list; Chapter 7 is one fewer than Chapter 6, and nobody if the squad won
                             the Chapter 6 fight (S.f.b8_c6_knivesDown).
     b8WayOut()              the one way out of the Chapter 6 knives the Contract opens: 'quiet' 0-1 (nobody comes tonight), 'roofs' 2-4 (a hard
                             check to slip them over the Gadrobi roofs), 'word' 5-7 (Vasso's word to a journeyman he knows; only while Vasso
                             walks), or null 8-10 (no way out). The writer stages it; the engine only says which.
     A fight def with contract:[[x, y], ...] gets b8Roofs(its chapter) placed on those tiles (in order; extra foes beyond the tiles stay home).
     A check with c.contract:true carries the edge "The Guild's paper": 0 to 3 nothing, 4-7 −1, 8-9 −2, 10 −3. ---- */
const B8_CON0 = 3, B8_CONMAX = 10;
const B8_CONW = {forgotten:'forgotten', paper:'a name on a paper', price:'a paper with a price on it', watched:'watched from the roofs', veteran:'a veteran\'s job', grandmaster:'a Grand Master\'s own knife'};
const b8S = () => { if (!S) return {con:B8_CON0, hi:B8_CON0, lo:B8_CON0}; S.b8 ??= {con:B8_CON0, hi:B8_CON0, lo:B8_CON0}; return S.b8; };
const b8Contract = () => b8S().con;
const b8ConTier = (c = b8Contract()) => c >= 10 ? 'grandmaster' : c >= 8 ? 'veteran' : c >= 6 ? 'watched' : c >= 4 ? 'price' : c >= 2 ? 'paper' : 'forgotten';
function b8Con(n, why = ''){ if (!b8On() || !n) return b8Contract(); const st = b8S(), was = st.con, t0 = b8ConTier(was);
  st.con = clamp(was + n, 0, B8_CONMAX); const d = st.con - was; if (!d) return st.con; st.hi = Math.max(st.hi ?? was, st.con); st.lo = Math.min(st.lo ?? was, st.con);
  tally(d > 0 ? 'b8ConUp' : 'b8ConDown', Math.abs(d));
  note(`The Contract ${d > 0 ? '+' : '−'}${Math.abs(d)}${why ? ` (${why})` : ''}: ${st.con} of ${B8_CONMAX}.`, d > 0 ? 'bad' : 'good');
  const t1 = b8ConTier(st.con); if (t1 !== t0) note(`The Fourth is ${B8_CONW[t1]} now.`, d > 0 ? 'bad' : 'good');
  if (typeof updChain === 'function') updChain(); save(); return st.con; }
const B8_ROOFS = [[0, []], [2, ['b8_knife', 'b8_knife']], [4, ['b8_knife', 'b8_knife', 'b8_knife']], [6, ['b8_knife', 'b8_knife', 'b8_veteran']],
  [8, ['b8_knife', 'b8_veteran', 'b8_veteran']], [10, ['b8_knife', 'b8_veteran', 'b8_gmknife']]];
function b8Roofs(ch = (S && S.chapter) || 6, c = b8Contract()){ const row = B8_ROOFS.filter(([k]) => c >= k).pop()[1].slice();
  if (ch === 5) return row.map(() => 'b8_knife').slice(0, 3);
  if (ch >= 7) return S && S.f && S.f.b8_c6_knivesDown ? [] : row.slice(0, Math.max(0, row.length - 1));
  return row; }
const b8WayOut = (c = b8Contract()) => c <= 1 ? 'quiet' : c <= 4 ? 'roofs' : c <= 7 ? (b8In('vasso') ? 'word' : null) : null;
{ const _bd = battleDef;
  battleDef = function(id, stage){ const d = _bd(id, stage); if (!d || !b8On() || !Array.isArray(d.contract) || (d.isStage2 && !d.contractStage2)) return d;
    const add = b8Roofs(d.chapter || S.chapter || 6).map((k, i) => d.contract[i] ? [k, d.contract[i][0], d.contract[i][1]] : null).filter(Boolean);
    return Object.assign({}, d, {foes:[...(d.foes || []), ...add]}); }; }
{ const _ef = edgesFor; edgesFor = function(c, id){ const out = _ef(c, id); if (!b8On() || !c || !c.contract) return out;
    const k = {forgotten:0, paper:0, price:-1, watched:-1, veteran:-2, grandmaster:-3}[b8ConTier()]; if (k) out.push(['The Guild\'s paper', k]); return out; }; }
/* the Guild counts its dead; time away cools the paper */
{ const _endBeat = endBeat; endBeat = function(won){ const r = _endBeat(won);
    if (b8On() && won && B && B.def && B.def.guild && !B.def.isStage2 && !B.b8counted) { B.b8counted = 1; b8Con(1, 'the Guild counts its dead'); }
    return r; }; }
{ const _sc = startChapter; startChapter = function(n){ if (b8On() && (n === 3 || n === 4) && !S.f['b8_away' + n]) { S.f['b8_away' + n] = 1; b8Con(-1, 'weeks out of the city'); } return _sc(n); }; }
/* the widget for a node's html, and the HUD pill beside the purse */
function contractHTML(){ const c = b8Contract();
  return `<div class="chainbox allybox" role="group" aria-label="The Contract"><div class="crow"><span>The Contract</span><b>${c} of ${B8_CONMAX} · ${esc(B8_CONW[b8ConTier()])}</b></div><div class="bar${c >= 6 ? ' col' : ''}"><i style="width:${Math.round(c / B8_CONMAX * 100)}%"></i></div></div>`; }
{ const _updChain = updChain;
  updChain = function(){ const el = typeof document !== 'undefined' && document.getElementById('chainp');
    if (!el || !S || S.book !== 'tth') return _updChain();
    const c = b8Contract(); el.innerHTML = `<span class="chainpill allypill"><span class="${c >= 6 ? 'dry' : ''}">Contract <b>${c}</b></span></span>`; }; }

/* ---- the recruits (plan question 11; names checked, tth-canon §6). Base numbers; the roster brings them to the squad's level. ---- */
Object.assign(TPL, {
  vasso:{name:'Vasso', role:'Guild journeyman', sig:'V', col:'#8a7aa0', hp:16, ac:13, atk:4, dmg:[1,6,2], rng:1, mv:5, init:3, st:{might:1, wits:2, guile:3}, ab:['mark', 'salve'],
    epithet:'"Malazans, the paper said. The Guild doesn\'t ask which. I asked. That is why I am standing in your door."', origin:'Darujhistan, the Gadrobi District', age:23, service:'Six years in the Guild, journeyman for two, and none of it written down',
    weapon:'Two Guild knives, thin and blackened, one at the hip and one at the back of the neck', armour:'A dark quilted jack with the Guild\'s cut, and soft boots for roofs',
    bio:'A Gadrobi tanner\'s son who went up onto the roofs at fourteen because the roofs paid. The Guild took him in, taught him the lines and the knots and which tiles hold, and then, this winter, handed him a paper with five old soldiers on it. He read it twice. He came to the Fourth\'s door instead.',
    traits:['Never stands where a window can see him', 'Knows which roofs hold and which only look as if they do', 'Counts the bells at night, out of habit, and can tell you which is which'], gear:['Two Guild knives', 'A knotted cord that is a map, if you know the knots'],
    get quest(){ return 'Out of the Guild alive, which nobody does. He has decided to be the first. He would like it noted that he is not optimistic.'; }},
  edrem:{name:'Edrem', role:'Pilgrim guard · Pannion veteran', sig:'E', col:'#8e9496', hp:24, ac:15, atk:4, dmg:[1,10,2], rng:1, mv:4, init:1, st:{might:3, wits:1, guile:0}, ab:['bash', 'salve'],
    epithet:'"I wore the grey once. I keep the pilgrims\' road now. Nobody pays me. That is the point of it."', origin:'The old Domin, a town on the coast road that burned', age:41, service:'Nine years under the Seer, which he does not talk about, and years at the barrow since, which he does',
    weapon:'A long iron-shod mace, and a short blade for close work', armour:'Old grey scale with the Seer\'s marks filed off, and a pilgrim\'s cloak over it',
    bio:'He fought for the Domin, and lost, and did not die, which he considers the worst of the three. When the barrow outside Black Coral began to draw pilgrims he went and stood on the road to it, and has stood there since, keeping the worst of the road off the people walking it. He does not pray. He stands where the praying people can see him.',
    traits:['Will not say the Seer\'s name', 'Sleeps facing the barrow', 'Gives his food away and pretends he has eaten'], gear:['An iron-shod mace', 'A pilgrim\'s token, a bit of coral on a cord, that somebody pressed into his hand'],
    get quest(){ return 'Somewhere a man can stop guarding a road. He does not think there is one. He would like to be wrong once, before the end.'; }},
});
Object.assign(VERB, {vasso:'puts a Guild knife into', edrem:'brings the mace down on'});
Object.assign(STATUP, {vasso:['guile', 'wits'], edrem:['might', 'wits']});
Object.assign(TPL_ROLES, {vasso:['light', 'blade'], edrem:['heavy', 'mail', 'shield', 'blade', 'heavyweapon']});
Object.assign(PICKS[3], {
  vasso:[['ropeswing', 'The Guild\'s Lines', 'Once a turn, without using his action: swing to any open tile within 3 (further as the squad levels). No free swings. Six years on the roofs.'], ['ghost', 'Nobody Saw the Knife', 'Enemies take −2 to hit Vasso. The Guild teaches you to be where nobody looked.']],
  edrem:[['holdline', 'The Pilgrims\' Road', 'Edrem\'s free swings are unlimited and hit +2. Nothing gets past him to the people behind.'], ['shieldwall', 'Old Grey Scale', 'Squadmates standing next to Edrem get +2 armour. The Domin drilled it into him. He has kept it.']],
});
const B8_DONE = {vasso:'b8_vassoDone', edrem:'b8_edremDone'}; // 1 walks, 2 waits, 0 sent away
const B8_HOME = {vasso:'the Fourth\'s door in the city', edrem:'the pilgrims\' road'};
const b8CanRecruit = id => !!(b8On() && TPL[id] && B8_RECRUITS.includes(id) && !(S.dead && S.dead[id]) && S.f[B8_DONE[id]] !== 0);
function b8Join(id){ if (!b8CanRecruit(id) || b8In(id)) return false;
  if ((S.squad || []).length < ROSTER_CAP) { recruit(id); S.f[B8_DONE[id]] = 1; }
  else { S.camp = [...new Set([...(S.camp || []), id])]; S.loy[id] ??= 0; S.picks[id] ??= []; S.gear[id] ??= {}; S.f[B8_DONE[id]] = 2; note(`${NAME(id)} waits at ${B8_HOME[id]}: six walk already.`); }
  save(); return true; }
ROSTER_BOOKS.tth = {core:B8_CORE, bench:()=>[...B8_RECRUITS, ...B8_OLD],
  home:id=>B8_HOME[id] || 'the Fourth\'s door',
  wait:id=>(S.camp || []).includes(id) || (!!B8_DONE[id] && S.f[B8_DONE[id]] === 2),
  gone:id=>!!B8_DONE[id] && !b8CanRecruit(id),
  open:()=>true,
  in:id=>{ if (B8_DONE[id]) S.f[B8_DONE[id]] = 1; },
  out:id=>{ if (B8_DONE[id]) S.f[B8_DONE[id]] = 2; }};
/* a fresh Fourth's core may be short (a transfer's dead); the core only counts who is alive */
/* the sprites until the chapter art: Vasso in the Guild's dark, Edrem in old grey scale (140b draws the busts) */
if (typeof FIGX !== 'undefined') Object.assign(FIGX, {
  vasso(ctx, h, t, o){ h.legs('#16141a'); poly(ctx, [[-6,-6],[6,-6],[7,11],[-7,11]], h.armor('#3a3446', '#121018')); h.head('#b08a6a', 4.2, -11.4); h.look('rgba(20,12,10,.85)', -11.6);
    ctx.fillStyle = '#1a1612'; ctx.beginPath(); ctx.arc(0, -13, 4.6, Math.PI, 0); ctx.fill(); // dark hair, cropped
    ctx.strokeStyle = '#cfc8b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(6.4, 3); ctx.lineTo(9.6, -3); ctx.stroke(); // a knife in the hand
    ctx.fillStyle = '#2a2018'; ctx.fillRect(-6.6, 3, 13.2, 1.3); ctx.strokeStyle = '#8b7355'; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(-5, 3.6); ctx.lineTo(-7.4, 8); ctx.stroke(); }, // belt, the second knife's sheath
  edrem(ctx, h, t, o){ ctx.save(); ctx.scale(1.08, 1.05); h.legs('#2a2a2e'); h.torso('#7a7e84', '#2e3034', 7); ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let y = -4; y < 6; y += 2.2) ctx.fillRect(-6, y, 12, .6); // scale rows
    poly(ctx, [[-7.4,-6],[-4,-6],[-6,10],[-8.6,10]], '#5a4e3e'); // the pilgrim cloak over one shoulder
    h.head('#9a7a5e', 4.5, -11.2); h.look('rgba(20,12,10,.85)', -11.4); ctx.fillStyle = '#4a4440'; ctx.fillRect(-4.4, -9, 8.8, 2.6); // grey stubble
    ctx.strokeStyle = '#6a5a44'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(7, 6); ctx.lineTo(9, -12); ctx.stroke(); ell(ctx, 9.2, -13.2, 2.2, 2.2, '#5a5a5e'); // the mace, held upright
    ctx.restore(); },
});

/* ---- the gods (tth-canon §7; plan question 9). The sergeant: Treach, as Books Three and Six. Brisk's Hood answers in Chapters 1 to 5;
   in Chapter 6 "the dead" answer, nameless, marching somewhere else; from Chapter 7 the Guardians of the Gate. Vasso's god is K'rul, a hum
   in an old bell (never through Kruppe, never at K'rul's Bar). Edrem has none: the Redeemer never grants a boon, and nobody here ever
   answers for the Dying God. ---- */
const b8Hood = () => !b8On() || (S.chapter || 0) <= 5;               // Hood stands through Chapter 5; he falls on the last night
const PATRON_B8DEAD = {sig:'b8dead', god:'the dead', title:'The dead', txt:id => `Brisk, on her back in the street, lifts two fingers to her brow, the way she always has.\n\nNothing at the gate answers. The gate is not where it was. Somewhere else, a long way off and very close, a column is marching, grey and orderly and without a sound, and at its head someone with a grey beard turns his head as if he heard a salute. The column does not stop. Something of it stays.`};
const PATRON_B8GATE = {sig:'b8gate', god:'the Guardians of the Gate', title:'The Guardians of the Gate', txt:id => `Brisk salutes from the ground, to no one in particular.\n\nThe gate is there again. It has new keepers: soldiers, by the way they stand, more of them than anyone could count, and none of them with a face the squad can see. One of them looks down the long road at a corporal with two fingers at her brow, and returns it. *Not yet. Not her. Not the ones she is lying across.*`};
const PATRON_KRUL = {sig:'krul', god:'K\'rul', title:'K\'rul, the old god of the belfry', txt:id => `Vasso, down on the stones, says something under his breath that is not a prayer, only a bell's name.\n\nSomewhere in the city an old bell that nobody rang starts to hum. It is very low. It goes on longer than a bell should. The squad can feel it in their teeth, and then in their blood, and the blood remembers it is still moving.`};
{ const prev = Object.getOwnPropertyDescriptor(PATRONS, 'brisk'), was = () => prev.get ? prev.get() : prev.value;
  Object.defineProperty(PATRONS, 'brisk', {configurable:true, enumerable:true, get(){ if (!b8On()) return was(); const ch = S.chapter || 0; return ch <= 5 ? was() : ch === 6 ? PATRON_B8DEAD : PATRON_B8GATE; }, set(v){ /* kept per book */ }}); }
{ const prev = Object.getOwnPropertyDescriptor(PATRONS, 'sgt');
  Object.defineProperty(PATRONS, 'sgt', {configurable:true, enumerable:true, get(){ return S && S.book === 'tth' ? PATRON_TREACH : prev.get ? prev.get() : prev.value; }, set(v){ /* kept per book */ }}); }
PATRONS.vasso = PATRON_KRUL;
Object.assign(BOONS, {
  'the dead':                 {key:'b8dead', name:'The dead march past', txt:'Every squadmate starts the fight with a ward of a tenth of their health, and enemies are −1 to hit.'},
  'the Guardians of the Gate':{key:'b8gate', name:'The Gate is held',     txt:'The first time each squadmate would go down, they stay up at 1 health and take a ward of a tenth of their health.'},
  'K\'rul':                   {key:'krul',   name:'The bell hums',        txt:'+1 to hit, and every squadmate heals 1 at the start of their turn.'},
});
Object.entries(BOONS).forEach(([god, b]) => { BOON_BY_KEY[b.key] ??= Object.assign({god}, b); });
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (!b8On() || !a || !t || !S.boons) return c;
    if (boon('b8dead') && a.side === 'e' && t.side === 'p') c.bonus -= 1;
    if (boon('krul') && a.side === 'p' && !a.ally) c.bonus += 1;
    return c; }; }
{ const _hurt = hurt;
  hurt = function(u, n, crit){
    if (u && u.b8hound) { if (!u.b8told) { u.b8told = 1; blog(`<em>Nothing the squad has touches the Hound.</em> It does not seem to notice that anyone tried.`); } float(u, 'untouched', '#cfc8b8'); return; } // rule 14: no Hound dies at the Fourth's hands
    const before = u ? u.hp : 0; _hurt(u, n, crit);
    /* the Guardians' boon: as Hood's, once each, and a ward on top (the post-check is the Gate card's, 60c) */
    if (b8On() && u && u.side === 'p' && !u.ally && before > 0 && u.hp <= 0 && boon('b8gate') && !((S.boons.spared || {})['g_' + u.id])) {
      (S.boons.spared ??= {})['g_' + u.id] = 1; u.hp = 1; u.deadAt = null;
      const w = Math.round(u.maxhp * .1); if (w > (u.ward || 0)) u.ward = w; blog(`<em>The Gate is held.</em> ${u.name} gets back up at 1 health, with a ward of ${w}.`); float(u, 'the gate holds', '#8fa38a'); return; }
    b8CharmAfter(u, before); }; }
{ const _bts = boonTurnStart; boonTurnStart = function(u){ _bts(u); if (b8On() && boon('krul') && u && u.hp > 0) { heal(u, 1); } }; }
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt); if (!b8On() || !B) return r;
    if (boon('b8dead')) { party().filter(p => !p.ally).forEach(p => { const w = Math.round(p.maxhp * .1); if (w > (p.ward || 0)) p.ward = w; }); blog('<em>The dead march past.</em> Something grey stays with each of the squad, a ward against the next blow.'); }
    if (B.def && B.def.pollen) blog('<em>The pollen is thick here.</em> It pulls at the mind: the squad is −1 to hit for the first three rounds.');
    if (B.log && CARDS[S.card] && CARDS[S.card].fx) blog(`<em>${CARDS[S.card].name}:</em> ${CARDS[S.card].fx}`);
    return r; }; }
/* the scarecrow fields (Chapter 2): canon's singing scarecrows are corpses feeding plants, never fighters (R4 S2, R6 S3). A fight def
   with pollen:true makes the squad −1 to hit for its first three rounds instead. */
{ const _atkCalc = atkCalc; atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (b8On() && B && B.def && B.def.pollen && (B.round || 1) <= 3 && a && a.side === 'p' && !a.ally) c.bonus -= 1; return c; }; }

/* ---- the two dark-warren pieces (v10.2 spec §2 "New pieces") ----
   The Hood-touched charm (an item, b8_hoodcharm): a Chapter 1 to 5 find while Hood stands. Once a fight, the first blow that takes its wearer
   from above half health to half or below is taken back off them (they get that health back) and laid on the nearest enemy that is itself
   at half health or below, no roll, no soak, no ward. With no such enemy on the field it waits. The Bargain's shape, with Hood's taste for
   the dying. On the last night (Chapter 6) Hood has fallen and the charm is cold: it does nothing (Claude's call). */
const B8_CHARM_COLD = 6;
ITEMS.b8_hoodcharm = {name:'A Hood-touched charm', slot:'trinket', role:'any', who:null,
  line:'A knucklebone on a black cord, worn smooth, with a hole bored through it that nobody bored. It is always cold. Old soldiers say a thing like this has been held by Hood, or near enough, and that he does not like to give things back. It is not for sale, which is how you know it is real.'};
ITEM_SPECIAL.b8_hoodcharm = () => b8On() && (S.chapter || 0) === B8_CHARM_COLD ? 'Cold tonight. Hood is not answering' : 'Once a fight, the first blow that drops its wearer to half health is taken off them and laid on the nearest enemy already at half or below';
function b8CharmAfter(u, before){
  if (!B || !u || u.side !== 'p' || u.ally || u.hp <= 0 || !wears(u, 'b8_hoodcharm')) return;
  const d = before - u.hp; if (d <= 0 || !(before * 2 > u.maxhp && u.hp * 2 <= u.maxhp)) return;
  if (B.used && B.used['b8charm_' + u.id]) return;
  if (b8On() && (S.chapter || 0) === B8_CHARM_COLD) { if (!B.used.b8charmCold) { (B.used ??= {}).b8charmCold = 1; blog(`<em>The charm at ${u.name}'s throat stays cold.</em> Nobody is listening tonight.`); } return; }
  const t = foes().filter(f => !f.b8hound && f.hp > 0 && f.hp * 2 <= f.maxhp).sort((a, b) => cheb(u, a) - cheb(u, b))[0]; if (!t) return;
  (B.used ??= {})['b8charm_' + u.id] = 1; u.hp = Math.min(u.maxhp, u.hp + d); float(u, '+' + d, '#c8d0c0');
  blog(`<em>The charm at ${u.name}'s throat goes colder.</em> The wound comes off ${u.name} and goes to ${t.name}, who was nearer the gate already: ${d}.`);
  sparks(t.x, t.y, 12, '#b8c0b0', .5); const s0 = t.soakNext, w0 = t.ward; t.soakNext = 0; t.ward = 0; hurt(t, d); t.ward = w0; t.soakNext = s0; }
if (typeof ART !== 'undefined' && ART['item/hoodrep']) { ART['item/b8_hoodcharm'] ??= ART['item/hoodrep']; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/b8_hoodcharm'] ??= ART_SIZE['item/hoodrep']; } // 140b paints its own
/* The jug of kelyk (an item, b8_kelykjug; plan, David, Nov 8, 9:03 PM PST). Worn as a trinket it gives its wearer an action on their first
   turn of a fight, Drink: it heals 2d6 plus the squad's level bonus (a plain heal: no ward, v10.3) and gives +2 to hit for the rest of that
   fight. Afterwards the drinker carries the kelyk-sickness (S.injury, the v10.2 wound slot: −1 to hit) until the next fire; a real wound
   is worse and replaces it. It does not use the action. Never made to look good: the words are short, sour, and the squad's. */
ITEMS.b8_kelykjug = {name:'A jug of kelyk', slot:'trinket', role:'any', who:null,
  line:'A stoppered clay jug, sticky at the neck, that smells of fruit gone over and something underneath the fruit. The pilgrims drink it and stop being frightened. Then they stop being much of anything. Ohl says it is a poor trade at any price, and he has seen most of the prices.'};
ITEM_SPECIAL.b8_kelykjug = 'Drink, on its wearer\'s first turn of a fight: heal 2d6 and +2 to hit for that fight; afterwards the kelyk-sickness (−1 to hit) until the next fire';
INJURIES.kelyk = {name:'the kelyk-sickness', word:'the kelyk-sickness', hit:1, sev:0};
{ const _gi = giveInjury; giveInjury = function(u, pick){ if (!pick) { const ks = Object.keys(INJURIES).filter(k => k !== 'kelyk'); pick = ks[R(ks.length)]; } return _gi(u, pick); }; } // a bad fall is never the kelyk
AB.b8_drink = {name:'Drink the kelyk', self:true, free:true, desc:()=>`On your first turn of a fight, and it does not use the action: heal 2d6+${lvB()} and +2 to hit for the rest of the fight. Afterwards, the kelyk-sickness: −1 to hit until the next fire.`,
  ok:u=>!!(B && u && (B.round || 1) <= 1 && !B.used['b8drink_' + u.id] && wears(u, 'b8_kelykjug')),
  run(u){ B.used['b8drink_' + u.id] = 1; u.b8kelyk = true; heal(u, roll(2, 6, lvB())); AUDIO.play('heal'); sparks(u.x, u.y, 10, '#8a4a6a', .4); float(u, '+2 to hit', '#c8a0b8');
    blog(`${u.name} drinks from the jug. It is sweet, and then it is not.${b8In('ohl') && u.id !== 'ohl' ? ' Ohl watches, and says nothing, which is worse than anything he could have said.' : ''}`);
    const was = injuryOf(u.id); if (!was) { (S.injury ??= {})[u.id] = 'kelyk'; save(); } }};
{ const _mkParty = mkParty; mkParty = function(id, x, y){ const u = _mkParty(id, x, y); if (wears(id, 'b8_kelykjug') && !u.ab.includes('b8_drink')) u.ab.splice(Math.max(0, u.ab.length - 1), 0, 'b8_drink');
    if (B && B.used && B.used['b8drink_' + id]) { u.b8kelyk = true; if (S.injury && S.injury[id] === 'kelyk') u.atk += 1; } // a fight's second area: still drunk, and not sick yet
    return u; }; }
{ const _atkCalc = atkCalc; atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (a && a.b8kelyk && a.side === 'p') c.bonus += 2; return c; }; }
if (typeof ART !== 'undefined' && ART['item/b6_c1_wellrope']) { ART['item/b8_kelykjug'] ??= ART['item/b6_c1_wellrope']; } // 140b paints its own
/* The Kurald Galain shroud (a trick, b8_shroud): Black Coral, Chapter 3, behind a hard check. Once a fight, the bearer or a squadmate within
   4 (further as the squad levels) takes a ward at full size, 15% of their health, at once, with no heal needed (wards never stack: a
   bigger one already there stays). The darkness takes the next blow. Elder sorcery: otataral does not touch it. v10.3: it does not
   strike, so it is free (one free trick a turn); it is not a heal, so healW does not come into it: the ward is set directly. */
TRICKS.b8_shroud = {name:'A Fold of Night', ch:3, use:'fight', ab:'t_b8_shroud', sorcery:true, elder:true, free:true, where:'Black Coral, under the Andii\'s night',
  lore:'In Black Coral the dark is kept, the way a lamp is kept elsewhere: somebody in the city holds it over the streets, and it does not lift at noon. A little of it can be folded and carried, if you know how to ask, and if the dark agrees.',
  get fx(){ return `Once a fight: the bearer or a squadmate within ${4 + lvT()} takes a ward of a full 15% of their health at once, no heal needed. Wards never stack. Grows with level. Elder sorcery: otataral does not touch it. It does not use the action (one free trick a turn).`; }};
AB.t_b8_shroud = {name:TRICKS.b8_shroud.name, trick:'b8_shroud', sorcery:true, elder:true, free:true, desc:()=>TRICKS.b8_shroud.fx,
  tiles:u=>party().filter(p => !p.ally && p.hp > 0 && cheb(u, p) <= 4 + lvT()),
  run(u, x, y){ const t = unitAt(x, y); if (!t) return; const w = wardCap(t); AUDIO.play('shadow'); sparks(t.x, t.y, 18, '#3a3070', .5);
    if (w > (t.ward || 0)) { t.ward = w; float(t, 'ward ' + w, '#dfe8f0'); blog(`${u.name} folds a piece of the Andii night over ${t === u ? 'their own shoulders' : t.name}. The darkness will take the next blow. <em>A ward of ${w}.</em>`); }
    else blog(`${u.name} reaches for the night over ${t.name}. It is already there.`);
    updBattleUI(); }};

/* ---- the foes (tth-canon §3, §4; v10.2 soak from base armour: 16-17 soak 1, 18+ soak 2). Sized for levels 16 to 21, as Book Seven's Third.
   The Guild's knives (b8_knife, b8_guildbow, b8_veteran, b8_gmknife), the Dying God's cultists (b8_cultist, b8_kelykpriest, b8_fieldtender),
   kelyk-mad pilgrims (b8_pilgrim), Daru bravos (b8_bravo, b8_bravocaptain), road raiders (b8_raider) and a Hound of Shadow that passes
   (b8_hound: never targeted to death, rule 14; it leaves after its rounds). Bodies borrowed until the chapter art. ---- */
Object.assign(FOES, {
  b8_knife:{name:'Guild knife', kind:'guildknife', sig:'a', hp:30, ac:15, atk:12, dmg:[1,8,4], rng:1, mv:6, init:5, sk:['bleed'], verb:'opens a cut on', guild:true},
  b8_guildbow:{name:'Guild crossbow', kind:'guildknife', sig:'x', hp:24, ac:14, atk:12, dmg:[1,10,4], rng:6, mv:5, init:4, sk:['pin'], verb:'looses a quarrel at', guild:true},
  b8_veteran:{name:'Guild veteran', kind:'guildveteran', sig:'A', hp:46, ac:17, atk:13, dmg:[1,10,5], rng:1, mv:6, init:6, sk:['parry', 'bleed'], verb:'opens', guild:true},
  b8_gmknife:{name:'The Grand Master\'s knife', kind:'guildveteran', sig:'G', hp:84, ac:18, atk:14, dmg:[1,12,6], rng:1, mv:6, init:7, boss:true, sk:['parry', 'bleed', 'shadowstep'], verb:'comes out of nowhere at', guild:true},
  b8_cultist:{name:'Cultist of the Dying God', kind:'b6_cultist', sig:'c', hp:32, ac:13, atk:11, dmg:[1,8,3], rng:1, mv:4, init:2, verb:'lunges at'},
  b8_kelykpriest:{name:'Priest of the Dying God', kind:'priest', sig:'P', hp:58, ac:15, atk:12, dmg:[2,6,3], rng:4, mv:3, init:2, boss:true, sk:['daze', 'drain'], verb:'breathes the kelyk on'},
  b8_fieldtender:{name:'Field-tender', kind:'tenescowri', sig:'f', hp:28, ac:12, atk:10, dmg:[1,8,3], rng:1, mv:4, init:1, verb:'swings a hook at'},
  b8_pilgrim:{name:'Kelyk-mad pilgrim', kind:'b4_c2_pilgrim', sig:'p', hp:20, ac:11, atk:9, dmg:[1,6,3], rng:1, mv:5, init:3, verb:'claws at'},
  b8_bravo:{name:'Daru bravo', kind:'thug', sig:'b', hp:34, ac:15, atk:12, dmg:[1,8,4], rng:1, mv:5, init:3, sk:['parry'], verb:'lunges with a rapier at'},
  b8_bravocaptain:{name:'Bravo with a name', kind:'houseguard', sig:'B', hp:62, ac:16, atk:13, dmg:[1,10,5], rng:1, mv:5, init:4, boss:true, sk:['parry', 'rally'], verb:'duels'},
  b8_raider:{name:'Plains raider', kind:'tenescowri', sig:'r', hp:32, ac:14, atk:11, dmg:[1,8,3], rng:1, mv:5, init:2, sk:['hitrun'], verb:'cuts at'},
  b8_hound:{name:'A Hound of Shadow', kind:'hound', sig:'H', hp:999, ac:22, atk:14, dmg:[2,8,6], rng:1, mv:8, init:9, boss:true, immortal:true, b8hound:true, stay:2, verb:'goes through'},
});
const FOE_SORC_B8 = ['b8_kelykpriest']; FOE_SORC_B8.forEach(k => FOE_SORC.add(k)); // the priest's kelyk is sorcery: it goes past soak
/* the Hound passes: it arrives, stays its rounds (FOES.b8_hound.stay, 2), and goes on down the street; nothing the squad has can drop it */
{ const _mkFoe = mkFoe; mkFoe = function(k, x, y, extra){ const u = _mkFoe(k, x, y, extra); if (FOES[k] && FOES[k].b8hound) { u.b8hound = true; u.b8leave = ((B && B.round) || 1) + (FOES[k].stay || 2); u.maxhp = u.hp = 999; } return u; }; }
{ const _nr = newRound; newRound = function(){ _nr(); if (!B || B.over) return;
    const gone = B.units.filter(u => u.b8hound && u.hp > 0 && u.b8leave != null && B.round >= u.b8leave);
    gone.forEach(u => { B.units.splice(B.units.indexOf(u), 1); const i = B.initOrder.indexOf(u); if (i >= 0) B.initOrder.splice(i, 1); if (B.order !== B.initOrder) { const j = B.order.indexOf(u); if (j >= 0) B.order.splice(j, 1); }
      blog(`<em>${u.name} goes on down the street.</em> It never once looked at the squad. The street is very quiet after it.`); }); }; }

/* ---- Book Eight's balance: empty until the chapters exist (the balance step, docs/v10.2-balance.md method). B8SOLDIER rows go into
   SOLDIER_FIGHT (Soldier, by fight id); B8GAP is Bridgeburner's per-fight boost ({ac +, atk +, hp ×, dmg +}, as B7GAP). B8GAP_ROW is the
   row a b8_ fight without its own row gets on Bridgeburner: null for now, so nothing is boosted until the lead tunes it. ---- */
const B8SOLDIER = {};
Object.assign(SOLDIER_FIGHT, B8SOLDIER);
const B8GAP_ROW = null;
const B8GAP = {};
const b8Gap = () => { if (!b8On() || (S.diff || 'soldier') !== 'bridgeburner') return null; const id = B && B.id; return (id && B8GAP[id]) || (id && /^b8_/.test(id) ? B8GAP_ROW : null); };
{ const _mkFoe = mkFoe;
  mkFoe = function(k, x, y, extra){ const u = _mkFoe(k, x, y, extra); const g = b8Gap(); if (!g || u.b8hound) return u;
    u.ac = (u.ac || 10) + (g.ac || 0); u.atk = (u.atk || 0) + (g.atk || 0); u.maxhp = u.hp = Math.max(1, Math.round(u.maxhp * (g.hp || 1)));
    if (u.dmg) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + (g.dmg || 0)]; if (g.mv) u.mv = (u.mv || 4) + g.mv; return u; }; }

/* ---- the words Book Eight throws at you. Bound by tth-canon §4 and rules 70-83: never who paid; the Grand Master faceless; the Redeemer
   never acts for a petitioner; no Bastion, no Dragnipur, no names for the Andii ---- */
const b8Saw = t => () => !!S && (S.chapter || 0) >= t;
GLOSSX.tth = [
  [0, 'Darujhistan', 'The city of blue fire, on its lake. The Fourth has lived here years now, which is longer than they lived anywhere in the army.'],
  [0, 'The Gadrobi District', 'The city\'s poorer east side, under the hills: tanners, dyers, cheap rooms, and the Fourth\'s door.'],
  [0, 'The Assassins\' Guild', 'Darujhistan\'s killers, with a Grand Master and a habit of roofs. They take papers. They do not say whose.'],
  [0, 'The Contract', 'How much the Guild wants the Fourth dead, by the squad\'s own reckoning. It climbs with blood in the city and falls with time away.'],
  [0, 'The Gedderone Fete', 'Darujhistan\'s festival of the new year: masks, crowds, days of it. The whole city is out in the streets, which is good for knives.'],
  [2, 'The old Domin', 'The Pannion lands east of the city, years after the Seer fell. Some of the towns are coming back. Some of them are coming back wrong.', b8Saw(2)],
  [2, 'Kelyk', 'The drink of the Dying God\'s cult: sweet, dark, and it does not let go. Its fields are fed with the dead.', b8Saw(2)],
  [3, 'Black Coral', 'Coral, renamed, on Coral\'s own site, under a night that does not lift. The Tiste Andii hold it.', b8Saw(3)],
  [3, 'The Redeemer', 'The god of the barrow outside Black Coral. The Fourth saw the man in it go under the gifts, years ago. He takes the weight. He does not answer.', b8Saw(3)],
  [4, 'The pilgrims\' camp', 'Tents and shacks round the barrow, people come from every road to kneel. Some of them have started drinking something besides water.', b8Saw(4)],
  [5, 'The Lamatath', 'The plains between Black Coral and Darujhistan\'s east road. Long grass, few roads, and this season something running through it at night.', b8Saw(5)],
  [6, 'Hounds of Shadow', 'Shadowthrone\'s Hounds. On the last night of the Fete they are in the city. Nobody in the Fourth wants to know why.', b8Saw(6)],
  [7, 'The Guardians of the Gate', 'Soldiers who stand at Hood\'s gate now, the morning after. Nobody can say whose. The old soldiers salute anyway.', b8Saw(7)],
];

/* ---- the journal, the count and Deeds ---- */
{ const _jn = journalNotes; journalNotes = function(){ const out = _jn(); if (!b8On()) return out;
    out.unshift(`The Fourth, in Darujhistan, years out of the Host. The Contract: ${b8Contract()} of ${B8_CONMAX}, ${B8_CONW[b8ConTier()]}.`);
    return out; }; }
{ const _sr = statsRows; statsRows = function(s){ const r = _sr(s); if (!s || s.book !== 'tth') return r; const st = s.stats || {}, b = s.b8 || {};
    r.push(['The Contract, now', `${b.con ?? B8_CON0} of ${B8_CONMAX}`], ['The Contract, at its worst', b.hi ?? B8_CON0], ['Raised by the squad\'s own doing', st.b8ConUp || 0], ['Cooled', st.b8ConDown || 0]); return r; }; }
function b8DeedsExtra(mine){ const hi = mine.reduce((a, {s}) => Math.max(a, ((s.b8 || {}).hi) || 0), 0), lo = mine.filter(({s}) => s.b8).reduce((a, {s}) => Math.min(a, (s.b8.lo ?? B8_CON0)), 10), fin = mine.filter(({s}) => bookDone(s)).length;
  const rows = [['The Contract at its worst, across every sergeant', hi ? `${hi} of ${B8_CONMAX}` : 'Not yet'], ['At its quietest', mine.some(({s}) => s.b8) ? `${lo} of ${B8_CONMAX}` : 'Not yet'], ['Finished', fin || 'Not yet']];
  return `<h4 class="jh">The Contract</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }

/* ---- the backdrops: each borrows an earlier book's drawing until the chapter art replaces it (Book Seven's pattern, 120) ---- */
const B8_SCENE_LIKE = {b8_daru_night:'b5_letheras', b8_gadrobi:'b5_letheras', b8_door:'b3_c2_camp_night', b8_road_east:'b3_c6_road', b8_fields:'b3_c5_burnt', b8_caravan_night:'b3_c2_camp_night',
  b8_blackcoral:'b3_c7_coral', b8_barrow:'b3_c7_barrow', b8_camp_night:'b3_c2_camp_night', b8_lamatath:'b3_c2_far_dusk', b8_wall_night:'b2_hissar_burning', b8_morning:'b3_c7_hill_dusk', b8_lakeshore:'b3_c7_sea'};
Object.assign(SCENES, {
  b8_daru_night:{loc:'Darujhistan', sub:'A street off the Gadrobi hills · night', cap:'Blue gas-light on wet stone, shutters closed, and the roofs above darker than the sky.', amb:'explore'},
  b8_gadrobi:{loc:'Darujhistan', sub:'The Gadrobi District', cap:'Tanners\' vats, dyers\' lines strung across the lane, and the hills close behind the roofs.', amb:'explore'},
  b8_door:{loc:'Darujhistan', sub:'The Fourth\'s door, up the street from the Phoenix', cap:'A narrow room with a fire, a table with five chairs and one more, and a bar across the door at night.', amb:'explore'},
  b8_road_east:{loc:'East of Darujhistan', sub:'The caravan road over the old Domin', cap:'Wagons in a line on a bad road, the hills behind, and the land ahead flat and grey to the edge of the sky.', amb:'explore'},
  b8_fields:{loc:'The old Domin', sub:'The scarecrow fields', cap:'Green rows in a dead country, rag-wrapped shapes on poles among them, thousands of them, as far as the eye goes.', amb:'explore'},
  b8_caravan_night:{loc:'The old Domin', sub:'The caravan\'s fire · night', cap:'Wagons drawn in a ring, one fire, the carters asleep under the axles, and the dark beyond the ring very wide.', amb:'explore'},
  b8_blackcoral:{loc:'Black Coral', sub:'The dark city', cap:'Coral\'s streets under a night that does not lift, lamps in the windows at noon, and tall shapes on the walls.', amb:'explore'},
  b8_barrow:{loc:'Outside Black Coral', sub:'The Great Barrow', cap:'A long mound heaped with gifts, pilgrims on their knees in the mud before it, and the dark city behind.', amb:'explore'},
  b8_camp_night:{loc:'Outside Black Coral', sub:'The pilgrims\' camp · night', cap:'Tents and shacks in rows round the barrow, a few fires, and somewhere in the rows a smell that is too sweet.', amb:'explore'},
  b8_lamatath:{loc:'The Lamatath', sub:'The plains east of Darujhistan · dusk', cap:'Long grass to the horizon, a road through it, and the light going.', amb:'explore'},
  b8_wall_night:{loc:'Darujhistan', sub:'The last night of the Fete', cap:'A broken wall, smoke over the Gadrobi roofs, and the moon above the city in pieces.', amb:'battle'},
  b8_morning:{loc:'Darujhistan', sub:'The morning after', cap:'A grey morning, a city with all its bells going, and a road out of it full of people walking.', amb:'explore'},
  b8_lakeshore:{loc:'Darujhistan', sub:'The lake shore', cap:'Grey water, the city behind, and boats drawn up on the shingle.', amb:'explore'},
});
Object.entries(B8_SCENE_LIKE).forEach(([k, like]) => { SCENEX[k] ??= (cv, t) => (SCENEX[like] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); });
/* the chapter card falls back to the Fourth's door (Darujhistan chapters) or the road when a chapter names no scene */
{ const _sci = showChapterIntro; showChapterIntro = function(){ const r = _sci(); const CH = CHAPTERS[S && S.chapter];
    if (b8On() && CH && !(CH.intro && CH.intro.scene)) { G.sceneKind = [1, 6, 7].includes(S.chapter) ? 'b8_daru_night' : S.chapter === 3 || S.chapter === 4 ? 'b8_blackcoral' : 'b8_road_east'; AUDIO.setScene(sceneAmb(G.sceneKind, 'explore')); } return r; }; }
