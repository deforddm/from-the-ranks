/* ============ Book Six: Bones in the Walls, beside The Bonehunters (v9.0 engine, 100) ============
   Two squads take turns: the Third of Blistig's 9th in the Fourteenth (thread 'r', Book Two's and Four's squad) plays Chapters 1, 3, 5, 7;
   the Fourth of Onearm's Host (thread 'h', Books One and Three) plays Chapters 2, 4, 6. One save holds both. The squad not playing waits in
   S.th[thread] (its own name, level, gear, picks, kit, tricks, munitions, dead, loyalty, fever); startChapter swaps it in. Fever is the book's
   own system (Poliel's plague). Levels: a fresh start is 12, transfers keep theirs, the cap is 18. Notes: docs/v9.0-notes.md. Plan:
   ashes-of-the-pale/book6-bh-plan.md (David, Nov 4, 2026). Canon: docs/bh-canon.md. */

const b6On = () => !!(S && S.book === 'bh');
const B6_CH = {1:'r', 2:'h', 3:'r', 4:'h', 5:'r', 6:'h', 7:'r'};  // which squad plays each chapter (plan question 1)
const B6_TH = {
  r:{book:'hoc', unit:'the Third', squad:'Third Squad, 9th Legion', army:'the Fourteenth', who:'Book Two\'s squad, with the Adjunct\'s Fourteenth',
     core:['sgt', 'haddat', 'sathi', 'tangle', 'marrow'], fresh:['haddat', 'tangle', 'marrow', 'mirrel'], recruits:['mehet', 'ottar']},
  h:{book:'moi', unit:'the Fourth', squad:'Fourth Squad, Seventh Company', army:'Onearm\'s Host', who:'the Fourth, with Onearm\'s Host',
     core:['sgt', 'brisk', 'kettle', 'tuft', 'ohl'], fresh:['brisk', 'kettle', 'tuft', 'ohl'], recruits:['brannoc', 'ressa']}};
const B6_KEYS = ['name', 'squad', 'camp', 'loy', 'gear', 'picks', 'kit', 'tricks', 'inv', 'lvl', 'xp', 'dead', 'parked', 'wounds', 'silver', 'picksDue', 'fever', 'imported', 'trail'];
const B6_START_LVL = 12, B6_CAP = 18;
const b6Thread = () => (S && S.book === 'bh' && S.thread) || 'r';
const b6Other = () => b6Thread() === 'r' ? 'h' : 'r';
const b6Unit = (t = b6Thread()) => B6_TH[t].unit;
const b6In = id => !!(S && Array.isArray(S.squad) && S.squad.includes(id) && !(S.dead && S.dead[id]));
const b6OtherName = () => (S && S.th && S.th[b6Other()] && S.th[b6Other()].name) || 'the other sergeant';

/* the sergeant's own history follows the squad playing: Book Four's sergeant for the Fourteenth, Book Three's for the Fourth */
function b6SgtFor(t){ const snap = BOOKSNAP[B6_TH[t].book] && BOOKSNAP[B6_TH[t].book].sgt; if (snap) TPL.sgt = Object.defineProperties({}, snap);
  if (typeof PORTRAIT_CACHE !== 'undefined') PORTRAIT_CACHE.clear(); }
/* swap the squad playing. Idempotent. The waiting squad's fields go into S.th[other]; nothing is shared but the book's own flags and count. */
function b6Use(t){ if (!b6On() || !B6_TH[t]) return; S.th ??= {}; const cur = S.thread || 'r';
  if (cur !== t && S.th[t]) { const out = {}; B6_KEYS.forEach(k => { out[k] = S[k]; }); S.th[cur] = out;
    B6_KEYS.forEach(k => { S[k] = S.th[t][k]; }); delete S.th[t]; }
  S.thread = t; b6SgtFor(t); }
{ const _setBook = setBook; setBook = function(b){ _setBook(b); if (b === 'bh' && S && S.book === 'bh') b6SgtFor(b6Thread()); }; }
{ const _sc = startChapter; startChapter = function(n){ if (b6On() && B6_CH[n]) b6Use(B6_CH[n]); return _sc(n); }; }

/* ---- the shelf ---- */
BOOKS.bh = {id:'bh', n:6, word:'Six', title:'The Bonehunters', name:'Bones in the Walls', h1:['Bones', 'in the Walls'], squad:'Two squads', unit:'the squad',
  tag:'Seven Cities burns its last rebels and catches its last plague. Two squads, one with the Adjunct and one with the Host, march into both.', titleArt:'title/bh', titleScene:'bh', patch:'insignia/bh',
  blurb:'Seven Cities and the sea to Quon Tali, weeks after Raraku, beside The Bonehunters.'};
/* BOOKSNAP.bh is declared in 014 with the other books */
const b6ChCount = () => Object.keys(BOOK === 'bh' ? CHAPTERS : BOOKSNAP.bh.ch).length;
Object.defineProperty(BOOKS.bh, 'coming', {configurable:true, get(){ return b6ChCount() === 0; }});
Object.defineProperty(BOOKS.bh, 'titleArt', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['title/bh'] ? 'title/bh' : 'title/hoc'; }}); // until 100b paints the walls

/* ---- the transfers: a finished Book Four on the 'line' road (still in the Fourteenth), a finished Book Three on the 'host' road ---- */
const b6Road = (o, pre) => o && o.chapters ? (o.chapters[7] ?? (o.f && o.f[pre + 'c7_key'])) : null;
const b6QualR = o => !!(o && o.book === 'hoc' && b6Road(o, 'b4_') === 'line');
const b6QualH = o => !!(o && o.book === 'moi' && b6Road(o, 'b3_') === 'host');
/* what a squad carries across, as every book's transfer does (60, 70; v7.2 every soldier on the roster): worn gear and unworn kit, talents and
   veteran picks, loyalty, the tricks of anyone who comes, the munitions and salves left. The dead stay dead. */
function b6Carry(o){ const dead = o.dead || {}, alive = k => k !== 'sgt' && TPL[k] && !dead[k];
  const mates = [...new Set([...(o.squad || []), ...(o.camp || [])])].filter(alive);
  const who = ['sgt', ...mates], gear = {}, picks = {}, loy = {}, worn = new Set();
  who.forEach(k => { gear[k] = {}; Object.entries(Object.assign({}, ((o.parked || {})[k]) || {}, ((o.gear || {})[k]) || {})).forEach(([slot, it]) => { if (ITEMS[it]) { gear[k][slot] = it; worn.add(it); } });
    picks[k] = (((o.picks || {})[k]) || []).filter(p => PICKS.vet.some(v => v[0] === p) || ((PICKS[3][k] || []).some(v => v[0] === p)));
    if (k !== 'sgt') loy[k] = clamp(((o.loy || {})[k]) || 0, -2, 3); });
  const wornByGone = new Set(); Object.entries(o.gear || {}).forEach(([k, g]) => { if (!who.includes(k)) Object.values(g || {}).forEach(it => wornByGone.add(it)); });
  const kit = (o.kit || []).filter(it => ITEMS[it] && (worn.has(it) || !wornByGone.has(it)));
  const tricks = {}; Object.entries(o.tricks || {}).forEach(([k, t]) => { if (TRICKS[k] && t && who.includes(t.who)) tricks[k] = {who:t.who, ch:0, left:null}; });
  const inv = {}; ['sharper', 'burner', 'cusser', 'smoker', 'salve'].forEach(k => { inv[k] = Math.max(0, ((o.inv || {})[k]) || 0); }); inv.salve = Math.max(2, inv.salve);
  return {from:o.name, sid:o.sid, lvl:o.lvl || 1, mates, core:mates.filter(k => !['mehet', 'ottar', 'brannoc', 'ressa'].includes(k)), loy, gear, picks, kit, tricks, inv,
    dead:Object.keys(dead).filter(k => TPL[k] && k !== 'sgt'), deadAt:dead}; }
const b6ImpR = id => { const o = id && loadSlot(id); return b6QualR(o) ? b6Carry(o) : null; };
const b6ImpH = id => { const o = id && loadSlot(id); return b6QualH(o) ? b6Carry(o) : null; };
const b6ImpList = t => roster().list.filter(e => { const o = loadSlot(e.id); return t === 'r' ? b6QualR(o) : b6QualH(o); });

/* one squad's half of the save */
function b6Half(t, name, imp){ const T = B6_TH[t];
  const mates = imp ? imp.mates.slice(0, 5) : T.fresh.slice(), squad = ['sgt', ...mates];
  const lvl = clamp(Math.max(B6_START_LVL, imp ? imp.lvl : 1), 1, B6_CAP);
  const half = {name, squad, camp:imp ? imp.mates.slice(5) : [], loy:{}, gear:imp ? imp.gear : {}, picks:imp ? imp.picks : {}, kit:imp ? imp.kit : [],
    tricks:imp ? imp.tricks : {}, inv:imp ? imp.inv : {sharper:2, burner:1, cusser:1, smoker:1, salve:3}, lvl, xp:LEVELS[lvl - 1] || 0, dead:{}, parked:{}, wounds:null,
    silver:20, picksDue:[], fever:{}, imported:imp ? {from:imp.from, sid:imp.sid, lvl:imp.lvl, mates:imp.mates.slice()} : null,
    trail:[{x:4, y:8}, {x:6, y:8}, {x:4, y:9}, {x:5, y:9}]};
  squad.forEach(k => { if (k !== 'sgt') half.loy[k] = imp ? (imp.loy[k] || 0) : 0; });
  if (imp) imp.dead.forEach(k => { const d = imp.deadAt[k] || {}; half.dead[k] = {ch:d.ch || 7, where:d.where || '', from:T.book}; });
  else if (t === 'r') half.dead.sathi = {ch:7, where:'The Barrow', from:'dg'}; // the fresh start, as Book Four's: Sathi fell at the Barrow
  return half; }
/* a new Book Six save. nameR: the Fourteenth's sergeant; nameH: the Fourth's. impR, impH: slot ids of the transfers, or empty. */
function newStateBH(nameR, nameH, impR, impH, sid){
  nameR = nameR || 'Hask'; nameH = nameH || 'Brann';
  const r = b6Half('r', nameR, b6ImpR(impR)), h = b6Half('h', nameH, b6ImpH(impH));
  const s = Object.assign({v:1, book:'bh', sid:sid || sidFor(nameR), scene:'chintro', node:null, bg:null, card:null, f:{}, pos:{x:5, y:8}, log:[], ending:null,
    battle:null, bopt:null, chapter:0, chapters:{}, area:'pale', thread:'r', th:{h}}, r);
  migrate(s); s.picksDue = picksOwed(s); s.th.h.picksDue = picksOwed(Object.assign({}, s, s.th.h));
  return s; }

/* ---- levels 12 to 18 ---- */
/* (014 lvCap, LEVELS to 18; 015 VET_LVLS and gainXP's pick levels carry 17; lvDmg and lvAc add 16. Only Book Six reaches past 15.) */

/* ---- Fever: Poliel's plague (plan question 4; bh-canon §8). A fevered soldier fights at −4 health and −1 to hit until treated. ----
   b6Catch(id, why): a fight, a corpse, a well. b6Cure(id, how): a healer, the surgeons, or after Chapter 4 a carrier's touch (Soliel, S.f.b6_soliel).
   Never lurid: the words are the soldier's, short. */
const b6Fevered = id => !!(b6On() && S.fever && S.fever[id] && !(S.dead && S.dead[id]));
const b6FeverList = () => b6On() ? (S.squad || []).filter(b6Fevered) : [];
function b6Catch(id, why = ''){ if (!b6On() || !TPL[id] || (S.dead && S.dead[id]) || b6Fevered(id)) return false;
  S.fever ??= {}; S.fever[id] = S.chapter || 1; tally('b6Caught');
  note(`${id === 'sgt' ? 'You have' : NAME(id) + ' has'} the fever${why ? ` (${why})` : ''}. −4 health and −1 to hit until it is treated.`, 'bad'); save(); return true; }
function b6Cure(id, how = ''){ if (!b6Fevered(id)) return false; delete S.fever[id]; tally('b6Cured');
  note(`${id === 'sgt' ? 'Your' : NAME(id) + '\'s'} fever breaks${how ? ` (${how})` : ''}.`, 'good'); save(); return true; }
const b6CanCure = () => !!(b6On() && (HEALER() || (S.f && S.f.b6_soliel)));
{ const _mkParty = mkParty; mkParty = function(id, x, y){ const u = _mkParty(id, x, y); if (!b6Fevered(id)) return u;
    u.maxhp = Math.max(1, u.maxhp - 4); u.hp = Math.min(u.hp, u.maxhp); u.atk -= 1; u.fevered = true; return u; }; }
function feverHTML(){ if (!b6On()) return ''; const f = b6FeverList();
  return `<div class="note">${f.length ? `Fever: ${f.map(id => id === 'sgt' ? 'you' : esc(NAME(id))).join(', ')}.${b6CanCure() ? ' Someone here can treat it.' : ' Nobody here can treat it yet.'}` : 'Nobody in the squad has the fever.'}</div>`; }

/* ---- the recruits (plan question 7; names checked, bh-canon §11). Base numbers; the roster brings them to the squad's level. ---- */
Object.assign(TPL, {
  mehet:{name:'Mehet', role:'Townsman of Y\'Ghatan', sig:'M', col:'#c2a27a', hp:16, ac:12, atk:4, dmg:[1,6,1], rng:5, mv:5, init:2, st:{might:1, wits:2, guile:2}, ab:['mark', 'salve'],
    epithet:'"Leoman sent the city to Lothal. I stayed. Somebody had to know where the cisterns are."', origin:'Y\'Ghatan, the street of the potters', age:31, service:'None. A sling, and every alley in the city',
    weapon:'A sling and a pouch of fired-clay shot, and a potter\'s knife', armour:'A quilted coat and a scarf over the mouth',
    bio:'A potter\'s son who stayed when the Falah\'d sent the city out. He knows the old wells, the drains and which walls are newer than they look. He does not say why he stayed, and the squad stops asking.',
    traits:['Knows the city under the city', 'Counts the Malazans the way they count him', 'Never stands with his back to a wall'], gear:['A sling', 'A ring of keys to doors that are no longer there'],
    get quest(){ return 'Out of the city before it burns, if the squad will have him.'; }},
  ottar:{name:'Ottar', role:'Grey Helm of the Perish', sig:'O', col:'#8f9aa6', hp:24, ac:15, atk:4, dmg:[1,8,2], rng:1, mv:4, init:0, st:{might:3, wits:1, guile:0}, ab:['bash', 'salve'],
    epithet:'"Our Destriant speaks to your Adjunct. I speak to you. That is how it is done."', origin:'Perish, across the sea', age:38, service:'Nineteen years, a Grey Helm',
    weapon:'A long single-edged sword and a tall shield with the wolf on it', armour:'Grey plate over mail, and a helm with a wolf\'s brow',
    bio:'A Grey Helm sent across to the Malazan ships when the Perish fleet came alongside. He says little about his god and less about why the Perish came. He fights as if he has done it for a long time, which he has.',
    traits:['Prays before eating, briefly', 'Keeps his shield-rim sharp', 'Learns Malazan words one a day'], gear:['A wolf\'s tooth on a thong', 'A whetstone'],
    get quest(){ return 'Wherever his Destriant sends him. This season, with you.'; }},
  brannoc:{name:'Brannoc', role:'Falari soldier', sig:'B', col:'#c26a3a', hp:22, ac:14, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, st:{might:2, wits:1, guile:1}, ab:['bash', 'salve'],
    epithet:'"Captain Sweetcreek says I talk too much. Captain Sweetcreek says that to everyone."', origin:'Falar, the islands', age:27, service:'Seven years with the Host, under Captain Sweetcreek',
    weapon:'A Falari axe, broad in the blade', armour:'Mail, and a red Falari beard he is proud of',
    bio:'One of the Falari in Sweetcreek\'s command, loaned to the Seventh Company to make up its numbers on the north coast. Red-haired, loud, and better in a fight than anyone expects from someone who sings that badly.',
    traits:['Sings on the march', 'Trusts sailors, not maps', 'Thinks the plague is a Seven Cities thing and will not touch Falari'], gear:['A tin whistle', 'His mother\'s copper ring'],
    get quest(){ return 'Back to Sweetcreek\'s line when the Seventh has its numbers. Or not.'; }},
  ressa:{name:'Ressa', role:'Survivor of G\'danisban', sig:'R', col:'#9a8aa8', hp:15, ac:12, atk:4, dmg:[1,6,1], rng:1, mv:5, init:2, st:{might:0, wits:2, guile:3}, ab:['mark', 'salve'],
    epithet:'"It took my street and left me. I have stopped asking it why."', origin:'G\'danisban', age:24, service:'None. She walked out of the city and kept walking until the Host\'s pickets stopped her',
    weapon:'Two long knives', armour:'A dyer\'s apron over a quilted coat',
    bio:'She had the fever and lived. Her street did not. She walked out of G\'danisban to the Host\'s lines in the rain and asked for work. The surgeons say she cannot catch it again. She says nothing about it at all.',
    traits:['Does not catch the fever', 'Knows the city\'s streets and its temples', 'Sleeps sitting up'], gear:['Two knives', 'A dyer\'s blue on her fingers that will not wash out'],
    get quest(){ return 'Away from the city. The Host is going away from the city.'; }},
});
Object.assign(VERB, {mehet:'slings a shot at', ottar:'brings the long sword down on', brannoc:'swings the Falari axe at', ressa:'cuts at'});
Object.assign(STATUP, {mehet:['guile', 'wits'], ottar:['might', 'wits'], brannoc:['might', 'guile'], ressa:['guile', 'wits']});
Object.assign(TPL_ROLES, {mehet:['light', 'ranged', 'blade'], ottar:['heavy', 'mail', 'shield', 'blade', 'heavyweapon'], brannoc:['heavy', 'mail', 'shield', 'blade', 'heavyweapon'], ressa:['light', 'blade']});
/* Ressa has had the fever, and does not catch it again (her bio; bh-canon §8) */
{ const _c = b6Catch; b6Catch = function(id, why){ return id === 'ressa' ? false : _c(id, why); }; }

const B6_DONE = {mehet:'b6_mehetDone', ottar:'b6_ottarDone', brannoc:'b6_brannocDone', ressa:'b6_ressaDone'};
const B6_HOME = {mehet:'the Y\'Ghatan townsfolk at the camp\'s edge', ottar:'the Grey Helms\' ship', brannoc:'Sweetcreek\'s Falari', ressa:'the surgeons\' tents'};
const b6Recruits = () => B6_TH[b6Thread()].recruits;
const b6CanRecruit = id => !!(b6On() && TPL[id] && b6Recruits().includes(id) && !(S.dead && S.dead[id]) && S.f[B6_DONE[id]] !== 0);
function b6Join(id){ if (!b6CanRecruit(id) || b6In(id)) return false;
  if ((S.squad || []).length < ROSTER_CAP) { recruit(id); S.f[B6_DONE[id]] = 1; }
  else { S.camp = [...new Set([...(S.camp || []), id])]; S.f[B6_DONE[id]] = 2; note(`${NAME(id)} waits with ${B6_HOME[id]}: six walk already.`); }
  save(); return true; }
{ const _recruit = recruit; recruit = function(id){ if (!b6On()) return _recruit(id); const n0 = note;
    note = (t, c) => n0(String(t).replace('joins the Fourth', `joins ${b6Unit()}`), c); try { _recruit(id); } finally { note = n0; } save(); }; }

ROSTER_BOOKS.bh = {
  get core(){ return B6_TH[b6Thread()].core; },
  bench:()=>[...B6_TH[b6Thread()].recruits, ...(b6Thread() === 'r' ? [...B4_RECRUITS, ...HOC_NEW] : ['sohra', 'greysword', 'ellis', 'vell'])],
  home:id=>B6_HOME[id] || (b6Thread() === 'r' ? 'the company' : 'the baggage train'),
  wait:id=>(S.camp || []).includes(id) || (!!B6_DONE[id] && S.f[B6_DONE[id]] === 2),
  gone:id=>!!B6_DONE[id] && !b6CanRecruit(id),
  open:()=>true,
  in:id=>{ if (B6_DONE[id]) S.f[B6_DONE[id]] = 1; },
  out:id=>{ if (B6_DONE[id]) S.f[B6_DONE[id]] = 2; }};

/* ---- the foes (bh-canon §2, §3; bodies borrowed from Book Four's desert and Book Two's soldiers until the chapter art) ---- */
Object.assign(FOES, {
  b6_rebel:{name:'Leoman\'s rebel', sig:'r', kind:'b4_c7_fleer', hp:30, ac:14, atk:10, dmg:[1,8,3], rng:1, mv:4, init:2, verb:'slashes at'},
  b6_rebelbow:{name:'Rebel bowman', sig:'b', kind:'b4_c7_fleerbow', hp:24, ac:13, atk:10, dmg:[1,8,3], rng:5, mv:4, init:2, sk:['pin'], verb:'shoots at'},
  b6_fanatic:{name:'Fanatic with a torch', sig:'f', kind:'b4_c7_fleer', hp:22, ac:12, atk:9, dmg:[1,6,3], rng:1, mv:5, init:3, verb:'thrusts a torch at'},
  b6_rebelchief:{name:'Rebel captain', sig:'C', kind:'b4_c5_rider', hp:56, ac:15, atk:11, dmg:[1,10,4], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'brings a tulwar down on'},
  b6_bandit:{name:'Plague-road bandit', sig:'d', kind:'b4_c7_fleer', hp:26, ac:13, atk:9, dmg:[1,8,2], rng:1, mv:4, init:2, verb:'cuts at'},
  b6_cultist:{name:'Follower of the Chosen', sig:'c', kind:'b4_c7_fleer', hp:24, ac:12, atk:9, dmg:[1,6,3], rng:1, mv:4, init:2, verb:'claws at'},
  b6_rioter:{name:'Rioter', sig:'m', kind:'b2soldier', hp:18, ac:11, atk:8, dmg:[1,6,2], rng:1, mv:4, init:1, verb:'swings a club at'},
  b6_cityguard:{name:'City Guard of Malaz', sig:'g', kind:'b2soldier', hp:30, ac:15, atk:10, dmg:[1,8,3], rng:1, mv:4, init:1, verb:'cuts at'},
  b6_edur:{name:'Tiste Edur warrior', sig:'e', kind:'b2soldier', hp:36, ac:15, atk:11, dmg:[1,10,3], rng:1, mv:4, init:2, verb:'cuts at'},
  b6_regular:{name:'Regular of the line', kind:'b2soldier', sig:'n', hp:20, ac:14, atk:8, dmg:[1,8,2], rng:1, mv:4, init:1, verb:'cuts at'},
});
/* a fight can pass the fever on: a fight def with feverRisk:'<why>' gives it, after a win or a loss, to one squadmate who walked and has not had it (once per fight: a stage2 never passes it again)
   (the chapter writers mark the fights: the plague villages, the cultists, the G'danisban streets) */
{ const _endBeat = endBeat; endBeat = function(won){ const r = _endBeat(won);
    if (b6On() && B && B.def && B.def.feverRisk && !B.def.isStage2 && !B.b6fever) { B.b6fever = 1;
      const who = (S.squad || []).filter(id => !b6Fevered(id) && id !== 'ressa' && !(S.dead && S.dead[id]));
      if (who.length) b6Catch(who[(S.chapter + who.length) % who.length], B.def.feverRisk); }
    return r; }; }

/* ---- the words Book Six throws at you ---- */
GLOSSX.bh = [
  [0, 'Y\'Ghatan', 'An old fortress city of the Odhans, ringed with barrows of Malazan dead from the last time the Empire took it. Dassem Ultor fell here.'],
  [0, 'The Fourteenth', 'The Adjunct\'s army: three legions, the Wickans and the Khundryl beside it. It won at Raraku without much of a fight, and has not stopped arguing about that since.'],
  [0, 'Onearm\'s Host', 'High Fist Dujek Onearm\'s army, back in the Empire\'s favour and landed on the north coast of Seven Cities to finish the rebellion.'],
  [0, 'Poliel', 'The Mistress of Pestilence. This year she is in Seven Cities, and so is her plague.'],
  [0, 'The fever', 'What soldiers call Poliel\'s plague. It takes some and leaves others marked. A healer can break it. So, later, can stranger things.'],
  [0, 'Leoman of the Flails', 'The last rebel leader with an army, riding for Y\'Ghatan with the Fourteenth behind him.'],
  [2, 'G\'danisban', 'A city east of Raraku. The Host camps before it in the rain.', ()=>(S.chapter || 0) >= 2],
  [5, 'The Kokakal Sea', 'Where the Fourteenth waits on the coast for Admiral Nok\'s transports.', ()=>(S.chapter || 0) >= 5],
  [7, 'The Perish', 'A people from across the sea, with great grey ships and a god of wolves. Their Grey Helms join the fleet at sea.', ()=>(S.chapter || 0) >= 7],
  [7, 'Malaz City', 'The Empire\'s oldest city, on its island under Mock\'s Hold.', ()=>(S.chapter || 0) >= 7],
];

/* ---- the shelf hooks the shared files need: each sits beside the earlier books' line in 016, 018, 019, 031, 036b, 990 ---- */
const b6KeyPre = 'b6_';
const b6SgtLook = () => b6On() && b6Thread() === 'r'; // the Fourteenth's sergeant wears Book Two's look (sgt_dg); the Fourth's, Book One's

/* the chapter's keys (the brief fixes them; plan "Key choices") */
const B6KEYS = {1:['bury', 'leave'], 2:['burn', 'pass'], 3:['in', 'line'], 4:['vote', 'out'], 5:['wait', 'sail'], 6:['letgo', 'report'], 7:['adjunct', 'jetty', 'wickans']};

/* ---- the backdrops: each borrows an earlier book's drawing until the chapter art replaces it (Book Five's pattern, 80) ---- */
const B6_SCENE_LIKE = {b6_odhan_night:'b4_road_fire', b6_ghatan_walls:'b3_c3_walls_night', b6_ghatan_fire:'b2_hissar_burning', b6_barrows:'b2_geleen_moon',
  b6_coast:'b2_harbour_night', b6_plague_village:'b3_c5_burnt', b6_gdanisban_rain:'b3_c2_herds_rain', b6_kokakal:'b4_c1_quay', b6_sky:'b3_c4_cold_night',
  b6_hanar_ara:'b2_geleen', b6_sea:'b2_harbour_night', b6_malaz:'b2_aren_city_dusk', b6_camp_night:'b3_c2_camp_night'};
Object.assign(SCENES, {
  b6_odhan_night:{loc:'The Lato Odhan', sub:'The Fourteenth\'s camp · night', cap:'Cook-fires in a long line across the scrub, the picket horses stamping, and somewhere ahead an old city waiting.', amb:'explore'},
  b6_ghatan_walls:{loc:'Y\'Ghatan', sub:'Under the walls · dusk', cap:'Walls the colour of old bone, the siege lines dug in, and the barrows of the Empire\'s dead along the road.', amb:'explore'},
  b6_ghatan_fire:{loc:'Y\'Ghatan', sub:'The city burning', cap:'A city on fire from the inside, and the sky above it gone the wrong colour.', amb:'battle'},
  b6_barrows:{loc:'Y\'Ghatan', sub:'The barrow field · the night after', cap:'Old mounds and one new one, long, and the city behind them still smoking.', amb:'explore'},
  b6_coast:{loc:'The north coast', sub:'The Host\'s camp by the sea · night', cap:'Rain on the sea, the Host\'s tents in rows above the beach, and the lamps of a city that has gone quiet.', amb:'explore'},
  b6_plague_village:{loc:'Inland from the coast', sub:'A village · rain', cap:'Doors open, nobody in the doorways, and a dog that will not come near.', amb:'explore'},
  b6_gdanisban_rain:{loc:'Before G\'danisban', sub:'The Host\'s camp · rain', cap:'Mud, canvas, rain that does not stop, and the city\'s walls grey behind it.', amb:'explore'},
  b6_kokakal:{loc:'The Kokakal shore', sub:'Nok\'s transports at anchor', cap:'Ships offshore as far as the eye goes, boats at the waterline, and an army waiting to leave a continent.', amb:'explore'},
  b6_sky:{loc:'North-east of G\'danisban', sub:'The column halted · night', cap:'A row of lights coming down out of the sky below the moon, and the whole column stopped to watch them.', amb:'explore'},
  b6_hanar_ara:{loc:'Hanar Ara', sub:'Outside the City of the Fallen', cap:'A city of tents and shrines on a plain, and a rebel army coming out of it to lay down its arms.', amb:'explore'},
  b6_sea:{loc:'At sea', sub:'A transport\'s deck', cap:'Grey water, a grey sky, the fleet strung out behind, and every soldier aboard looking at the horizon.', amb:'explore'},
  b6_malaz:{loc:'Malaz City', sub:'The waterfront', cap:'Mock\'s Hold on its rock over the harbour, the jetties crowded, and a city that has turned on someone.', amb:'explore'},
  b6_camp_night:{loc:'The camp', sub:'Night', cap:'A soldier\'s camp at night, fires low, sentries walking.', amb:'explore'},
});
Object.entries(B6_SCENE_LIKE).forEach(([k, like]) => { SCENEX[k] ??= (cv, t) => (SCENEX[like] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); });

/* ---- the journal, the count and Deeds ---- */
{ const _jn = journalNotes; journalNotes = function(){ const out = _jn(); if (!b6On()) return out;
    const f = b6FeverList(), o = S.th && S.th[b6Other()];
    out.unshift(`${b6Unit() === 'the Third' ? 'The Third, with the Fourteenth' : 'The Fourth, with Onearm\'s Host'}. ${f.length ? `Fever: ${f.map(id => id === 'sgt' ? 'you' : esc(NAME(id))).join(', ')}.` : 'Nobody has the fever.'}${o ? ` ${b6Other() === 'r' ? 'The Third' : 'The Fourth'} (Sergeant ${esc(o.name)}) is elsewhere in Seven Cities, at level ${o.lvl}.` : ''}`);
    return out; }; }
{ const _sr = statsRows; statsRows = function(s){ const r = _sr(s); if (!s || s.book !== 'bh') return r; const st = s.stats || {};
    r.push(['Fevers caught', st.b6Caught || 0], ['Fevers broken', st.b6Cured || 0]); return r; }; }
function b6DeedsExtra(mine){ const caught = mine.reduce((a, {s}) => a + (((s.stats || {}).b6Caught) || 0), 0), cured = mine.reduce((a, {s}) => a + (((s.stats || {}).b6Cured) || 0), 0);
  const rows = [['Fevers caught, across every sergeant', caught || 'None yet'], ['Fevers broken', cured || 'None yet'], ['Finished', mine.filter(({s}) => bookDone(s)).length || 'Not yet']];
  return `<h4 class="jh">Fever</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }

/* ---- the gods: both sergeants have Treach (Books Three and Four); the recruits' gods ---- */
{ const prev = Object.getOwnPropertyDescriptor(PATRONS, 'sgt');
  Object.defineProperty(PATRONS, 'sgt', {configurable:true, enumerable:true, get(){ return S && S.book === 'bh' ? PATRON_TREACH : prev.get ? prev.get() : prev.value; }, set(v){ /* kept per book */ }}); }
Object.assign(PATRONS, {
  ottar:{sig:'greysword', god:'Togg and Fanderay', title:'Togg and Fanderay', txt:id => `Ottar goes down with his shield still up, and says the name of his god into the dirt.\n\nThe answer is a sound like wolves a long way off, and then not a long way off.`},
  ressa:{sig:'ohl', god:'Soliel', title:'Soliel, Mistress of Healing', txt:id => `Ressa, on her knees, laughs once. "You again," she says, to nobody the squad can see.\n\nA warmth goes through the squad like the first dry day after rain.`},
});
