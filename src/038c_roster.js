/* ============ v7.2 the roster: one way to change who walks, in all four books; and gear by role ============ */
/* David, Oct 26-27: the squad is up to six (the sergeant and five). Everyone else the book has given the sergeant waits at camp.
   Each book's core squad always walks (unless the story takes someone out); recruits and spares can be sent to camp and brought back,
   at any chapter's fire ("The roster.") or from the squad's Roster tab. Whoever goes to camp leaves their gear in the pack (S.parked
   remembers what they wore); coming back, they get it again if nobody else has it on.
   S.camp: the ids waiting at camp. S.parked: {id: {slot: item}}, what each one wore when they stepped out.
   The per-book helpers (b2SwapIn, b3Join/b3SwapIn, b4Join/b4SwapIn/b4SwapNew) go through rosterIn/rosterOut/rosterSwap. docs/v7.2-notes.md */

const ROSTER_CAP = 6;
/* per book: core (always walks), bench (can be sent to camp), home (where the waiting wait, in words), and the book's own rules.
   wait(id): the book's older "waiting" state (a flag 2, an ally off with their people) counts as at camp. open(): changes allowed now.
   valid(sq, before): a squad the book allows (Book Four: the five non-recruit places stay filled). in/out(id): the book's own flags. */
const ROSTER_BOOKS = {
  gotm:{core:['sgt', 'brisk', 'kettle', 'tuft', 'ohl'], bench:()=>['ellis', 'vell'], home:()=>'camp',
    open:()=>(S.chapter || 0) >= 1},
  dg:{core:['sgt', 'haddat', 'sathi', 'tangle', 'marrow'], bench:()=>['redblade', 'warlock', ...(S.f.b2_oldHand ? [S.f.b2_oldHand] : [])],
    home:id=>(typeof B2_HOME !== 'undefined' && B2_HOME[id]) || 'the column',
    wait:id=>typeof b2AllyOff === 'function' && ['redblade', 'warlock'].includes(id) && b2AllyOff(id),
    gone:id=>typeof b2AllyLeft === 'function' && ['redblade', 'warlock'].includes(id) && b2AllyLeft(id),
    open:()=>typeof b2SwapOpen === 'function' && b2SwapOpen(),
    in:id=>{ if (typeof B2_DONE !== 'undefined' && B2_DONE[id]) S.f[B2_DONE[id]] = 1; }},
  moi:{core:['sgt', 'brisk', 'kettle', 'tuft', 'ohl'], bench:()=>['sohra', 'greysword', 'ellis', 'vell'],
    home:id=>(typeof B3_HOME !== 'undefined' && B3_HOME[id]) || 'the baggage train',
    wait:id=>typeof B3_DONE !== 'undefined' && !!B3_DONE[id] && S.f[B3_DONE[id]] === 2,
    open:()=>true,
    in:id=>{ if (typeof B3_DONE !== 'undefined' && B3_DONE[id]) S.f[B3_DONE[id]] = 1; },
    out:id=>{ if (typeof B3_DONE !== 'undefined' && B3_DONE[id]) S.f[B3_DONE[id]] = 2; }},
  hoc:{core:['sgt', 'haddat', 'sathi', 'tangle', 'marrow'], bench:()=>[...B4_RECRUITS, ...HOC_NEW],
    home:id=>(typeof B4_HOME !== 'undefined' && B4_HOME[id]) || 'the company',
    /* the recruits wait with their people (flag 2); the Fourteenth's spares are always at the company, once the muster is done */
    wait:id=>B4_RECRUITS.includes(id) ? S.f[B4_DONE[id]] === 2 : HOC_NEW.includes(id) && !b4MusterDue() && b4SpareOk(id),
    gone:id=>(B4_RECRUITS.includes(id) && !b4CanRecruit(id)) || (HOC_NEW.includes(id) && !b4SpareOk(id)),
    open:()=>!b4MusterDue(),
    /* v7.2.2 (David, Oct 27: Ramin to camp, and a spare in his place): any six; only the five places once filled must stay filled */
    valid:(sq, was)=>{ const n = a => a.filter(k => !B4_RECRUITS.includes(k)).length; return n(sq) >= Math.min(5, n(was)); },
    in:id=>{ if (B4_DONE[id]) S.f[B4_DONE[id]] = 1; },
    out:id=>{ if (B4_DONE[id]) S.f[B4_DONE[id]] = 2; else if (HOC_NEW.includes(id)) { S.camp = (S.camp || []).filter(x => x !== id); } }},
  /* v8.0 Book Five (80): the sergeant and four always walk; Ruuk, Brune and Pessa wait with their own people (flag 2) */
  mt:{core:['sgt', 'tobet', 'thegg', 'perrit', 'ammet'], bench:()=>(typeof B5_RECRUITS !== 'undefined' ? B5_RECRUITS : []),
    home:id=>(typeof B5_HOME !== 'undefined' && B5_HOME[id]) || 'the company',
    wait:id=>typeof B5_DONE !== 'undefined' && !!B5_DONE[id] && S.f[B5_DONE[id]] === 2,
    gone:id=>typeof b5CanRecruit === 'function' && !b5CanRecruit(id),
    open:()=>true,
    in:id=>{ if (typeof B5_DONE !== 'undefined' && B5_DONE[id]) S.f[B5_DONE[id]] = 1; },
    out:id=>{ if (typeof B5_DONE !== 'undefined' && B5_DONE[id]) S.f[B5_DONE[id]] = 2; }},
};
const rosterBook = () => ROSTER_BOOKS[(S && S.book) || 'gotm'] || ROSTER_BOOKS.gotm;
const rosterDead = id => !!(S && S.dead && S.dead[id]);
const rosterCore = id => id === 'sgt' || rosterBook().core.includes(id);
const rosterBenchable = id => !!(S && TPL[id] && !rosterCore(id) && rosterBook().bench().includes(id));
/* waiting at camp: could be brought in now (alive, not gone by the story, not walking) */
function rosterWaiting(id){ if (!rosterBenchable(id) || (S.squad || []).includes(id) || rosterDead(id)) return false; const b = rosterBook();
  if (b.gone && b.gone(id)) return false;
  return (S.camp || []).includes(id) || !!(b.wait && b.wait(id)); }
const rosterCampList = () => S ? rosterBook().bench().filter(rosterWaiting) : [];
const rosterOpen = () => !!(S && !(typeof B !== 'undefined' && B && !B.over && view === 'battle') && rosterBook().open());
/* would this squad be allowed? */
function rosterValid(sq){ if (sq.length > ROSTER_CAP) return false; const was = S.squad || [];
  if (was.some(k => rosterCore(k) && !sq.includes(k))) return false; const b = rosterBook(); return b.valid ? b.valid(sq, was) : true; }
const rosterCanIn = id => rosterWaiting(id) && rosterValid([...S.squad, id]);
const rosterCanOut = id => S.squad.includes(id) && rosterBenchable(id) && rosterValid(S.squad.filter(k => k !== id));
const rosterCanSwap = (out, inn) => S.squad.includes(out) && rosterBenchable(out) && rosterWaiting(inn) && rosterValid([...S.squad.filter(k => k !== out), inn]);
const rosterRoom = () => Math.max(0, ROSTER_CAP - ((S && S.squad) || []).length);

/* ---- what each soldier does, for the marks: healer, bow, munitions, sorcery, shield ---- */
const ROSTER_MARKW = {healer:'healer', bow:'bow', munitions:'munitions', sorcery:'sorcery', shield:'shield'};
const ROSTER_LACKW = {healer:'a healer', bow:'a bow', munitions:'a sapper', sorcery:'sorcery', shield:'a shield in the line'};
function rosterMarks(id){ const t = TPL[id]; if (!t) return []; const ab = typeof kitAb === 'function' && S ? kitAb(id) : (t.ab || []), A = k => (typeof AB !== 'undefined' && AB[k]) || {};
  const muni = ab.includes('sharper'), heal = ab.includes('mend'), out = [];
  if (heal) out.push('healer');
  if (id !== 'sgt' && t.rng >= 4 && !muni) out.push('bow');
  if (muni) out.push('munitions');
  if ((t.magic && !heal) || ab.some(k => A(k).spirit || A(k).sorcery || A(k).prayer)) out.push('sorcery');
  if (id !== 'sgt' && rolesOf(id).includes('shield')) out.push('shield');
  return out; }
/* what the walking squad lacks, of the five */
function rosterLacks(sq){ sq = (sq || (S && S.squad) || []).filter(k => TPL[k] && !rosterDead(k)); const have = new Set(sq.flatMap(rosterMarks));
  return Object.keys(ROSTER_MARKW).filter(k => !have.has(k)); }

/* ---- the moves ---- */
const rsWorn = (it, but) => (S.squad || []).find(w => w !== but && Object.values(S.gear[w] || {}).includes(it));
function rsTrail(){ S.trail = (S.trail || []).slice(0, Math.max(1, S.squad.length - 1));
  while (S.trail.length < S.squad.length - 1) S.trail.push(Object.assign({}, S.trail[S.trail.length - 1] || S.pos || {x:5, y:8})); }
/* a squadmate's gear goes into the pack: remembered, so they get it back */
function rsPark(id){ S.parked ??= {}; const g = S.gear[id] || {}; if (Object.keys(g).length) S.parked[id] = Object.assign({}, g); S.gear[id] = {}; }
function rsRestore(id){ S.parked ??= {}; const p = S.parked[id]; S.gear[id] ??= {}; if (!p) return;
  Object.entries(p).forEach(([slot, it]) => { if (!ITEMS[it] || !(S.kit || []).includes(it) || rsWorn(it, id) || wears(id, it) || !canWear(id, it)) return; const k = !S.gear[id][slot] && slotKeys(it).includes(slot) ? slot : freeSlot(id, it); if (k) S.gear[id][k] = it; });
  delete S.parked[id]; }
/* one item, one wearer; nobody off the squad wears anything (it is parked for them); a squadmate back gets theirs again */
function gearTidy(){ if (!S || !S.gear) return; S.parked ??= {}; const seen = new Set();
  Object.keys(S.gear).forEach(id => { if (!(S.squad || []).includes(id) && Object.keys(S.gear[id] || {}).length) { if (!rosterDead(id)) S.parked[id] = Object.assign({}, S.parked[id] || {}, S.gear[id]); S.gear[id] = {}; } });
  (S.squad || []).forEach(id => { const g = S.gear[id] ??= {}; Object.entries(g).forEach(([slot, it]) => { if (seen.has(it)) delete g[slot]; else seen.add(it); }); });
  /* v8.1: a piece in a slot that is not its own (an old save, a hand edit) moves to a free one of its own, or back to the pack (14b GEAR_SLOTS) */
  (S.squad || []).forEach(id => { const g = S.gear[id]; Object.entries(g).forEach(([slot, it]) => { if (!ITEMS[it] || slotKeys(it).includes(slot)) return; delete g[slot]; const f = freeSlot(id, it); if (f) g[f] = it; }); });
  (S.squad || []).forEach(id => { if (S.parked[id]) rsRestore(id); }); }
function rsOut(id){ const i = S.squad.indexOf(id); if (i < 0) return -1; S.squad.splice(i, 1); rsPark(id);
  S.camp = [...(S.camp || []).filter(x => x !== id), id]; const b = rosterBook(); if (b.out) b.out(id); rsTrail(); return i; }
function rsIn(id, at){ S.camp = (S.camp || []).filter(x => x !== id); const b = rosterBook(); if (b.in) b.in(id);
  if (!S.squad.includes(id)) { const n0 = note; note = () => {}; try { recruit(id); } finally { note = n0; } }
  if (!S.squad.includes(id)) S.squad.push(id); // recruit() refuses nobody the roster lets in; this is belt and braces
  if (at != null && at >= 0) { S.squad = S.squad.filter(k => k !== id); S.squad.splice(Math.min(at, S.squad.length), 0, id); }
  S.loy[id] ??= 0; S.picks[id] ??= []; vetCatchUp(id); rsRestore(id); fillEmpty(id); rsTrail(); }
const rsCampNote = id => `${NAME(id)} goes back to ${rosterBook().home(id)}, with what ${rsHe(id)} wore left in the pack.`;
const rsHe = id => ['sathi', 'marrow', 'haddat', 'ellis', 'sohra', 'greysword', 'hessa', 'mirrel', 'rasp', 'brisk', 'kettle', 'perrit', 'ammet', 'pessa', 'brune'].includes(id) ? 'she' : 'he';
/* the three moves the screen and the books use; each returns false (and changes nothing) if the book would not allow it */
function rosterOut(id){ if (!rosterCanOut(id)) return false; rsOut(id); note(rsCampNote(id)); save(); return true; }
function rosterIn(id){ if (!rosterCanIn(id)) return false; rsIn(id); note(`${NAME(id)} comes in from ${rosterBook().home(id)} and falls in.`, 'good'); AUDIO.play('up'); save(); return true; }
function rosterSwap(out, inn){ if (!out) return rosterIn(inn); if (!rosterCanSwap(out, inn)) return false;
  const i = rsOut(out); rsIn(inn, i); note(rsCampNote(out)); note(`${NAME(inn)} comes in from ${rosterBook().home(inn)} and takes the place.`, 'good'); AUDIO.play('up'); save(); return true; }

/* ---- the books' own joining goes through here: a join with no room waits at camp, and says so ---- */
{ const _recruit = recruit;
  recruit = function(id){ if (!S || !TPL[id] || S.squad.includes(id)) return _recruit(id);
    if (S.squad.length >= ROSTER_CAP && rosterBenchable(id)) { S.camp = [...(S.camp || []).filter(x => x !== id), id]; S.loy[id] ??= 0; S.picks[id] ??= []; S.gear[id] ??= {};
      const b = rosterBook(); if (b.out) b.out(id);
      note(`No room in the squad: ${NAME(id)} waits at ${b.home(id)}. The roster can bring ${rsHe(id) === 'she' ? 'her' : 'him'} in.`); save(); return; }
    _recruit(id); if (S.squad.includes(id)) { S.camp = (S.camp || []).filter(x => x !== id); rsRestore(id); fillEmpty(id); rsTrail(); } }; }
/* the story's own leavings: gear goes into the pack (remembered), and nobody leaves twice */
letGo = function(id, why){ if (!S.squad.includes(id) || id === 'sgt') return; S.squad = S.squad.filter(x => x !== id); rsPark(id); S.camp = (S.camp || []).filter(x => x !== id);
  S.trail = S.trail.slice(0, Math.max(1, S.squad.length - 1)); note(why || `${NAME(id)} goes ${id === 'ohl' ? 'his' : 'her'} own way.`); save(); };
unrecruit = function(id){ if (!S.squad.includes(id) || id === 'sgt') return; S.squad = S.squad.filter(x => x !== id); rsPark(id); S.camp = (S.camp || []).filter(x => x !== id); S.f[id + 'Gone'] = 1;
  S.trail = S.trail.slice(0, Math.max(1, S.squad.length - 1)); note(`${NAME(id)} is gone.`, 'bad'); save(); };
{ const _kill = kill; kill = function(id){ _kill(id); if (S) { S.camp = (S.camp || []).filter(x => x !== id); if (S.parked) delete S.parked[id]; } }; }
/* equipping takes the piece off anyone else first, the parked included */
equip = function(who, id, key){ const it = ITEMS[id]; if (!it || !canWear(who, id)) return; unwear(id); // v8.1: two trinket slots (14b); key picks one
  S.gear[who] ??= {}; S.gear[who][equipSlot(who, id, key)] = id; save(); };

/* ---- old saves: Book Two/Three/Four kept a recruit's kit in S.f.b2/b3/b4_allyGear and their waiting in flags; the squad was not capped ---- */
{ const _migrate = migrate;
  migrate = function(s){ const r = _migrate(s); if (!s) return r; const S0 = S; S = s;
    try { s.camp ??= []; s.parked ??= {};
      ['b2_allyGear', 'b3_allyGear', 'b4_allyGear'].forEach(k => { const g = s.f && s.f[k]; if (g) { Object.entries(g).forEach(([id, sl]) => { if (!s.squad.includes(id) && sl && Object.keys(sl).length) s.parked[id] = Object.assign({}, sl, s.parked[id] || {}); }); delete s.f[k]; } });
      const b = rosterBook(); b.bench().forEach(id => { if (!s.squad.includes(id) && !rosterDead(id) && b.wait && b.wait(id) && !s.camp.includes(id) && !(s.book === 'hoc' && HOC_NEW.includes(id))) s.camp.push(id); });
      /* more than six: the last recruits to come step out to camp (a Book One with Ellis and Vell both, a Book Three import with both) */
      while (s.squad.length > ROSTER_CAP) { const id = [...s.squad].reverse().find(rosterBenchable); if (!id) break; rsOut(id); }
      gearTidy();
      s.squad.filter(rosterBenchable).forEach(vetCatchUp); // v7.2.2: a recruit who joined late gets the veteran picks for the levels passed
    } finally { S = S0; }
    return r; }; }

/* ============ the roster screen (in the pack/journal modal: the Roster tab, and a fire's "The roster.") ============ */
let rosterSel = {out:null, inn:null}, rosterBack = null;
const rosterMarkHtml = id => rosterMarks(id).map(k => `<span class="rmk">${ROSTER_MARKW[k]}</span>`).join('');
function rosterFills(id){ const lack = rosterLacks(); return rosterMarks(id).filter(k => lack.includes(k)); }
function rosterHTML(){ const sq = S.squad.filter(k => TPL[k]), camp = rosterCampList(), open = rosterOpen(), lack = rosterLacks(), sel = rosterSel;
  const row = (id, side) => { const core = rosterCore(id), on = sel[side === 'w' ? 'out' : 'inn'] === id, fills = side === 'c' ? rosterFills(id) : [];
    let btn = '';
    if (open && side === 'w' && !core && rosterBenchable(id)) { const ok = sel.inn ? rosterCanSwap(id, sel.inn) : (rosterCanOut(id) || camp.some(c => rosterCanSwap(id, c)));
      btn = `<button class="btn sm${on ? ' on' : ''}" data-rout="${id}"${ok || on ? '' : ' disabled'}>${on ? 'Chosen' : 'To camp'}</button>`; }
    if (open && side === 'c') { const ok = sel.out ? rosterCanSwap(sel.out, id) : (rosterCanIn(id) || sq.some(w => rosterCanSwap(w, id)));
      btn = `<button class="btn sm${on ? ' on' : ''}" data-rin="${id}"${ok || on ? '' : ' disabled'}>${on ? 'Chosen' : 'Bring in'}</button>`; }
    const who = id === 'sgt' ? `Sergeant ${esc(S.name)}` : esc(TPL[id].name);
    return `<div class="rrow${on ? ' sel' : ''}"><div class="rwho"><b>${who}</b> <small>${esc(id === 'sgt' ? 'you' : TPL[id].role || '')}</small><div class="rmks">${rosterMarkHtml(id)}${core && id !== 'sgt' ? '<span class="rmk core">always walks</span>' : ''}${fills.length ? `<span class="rmk fill">fills: ${fills.map(k => ROSTER_LACKW[k]).join(', ')}</span>` : ''}${side === 'c' ? `<span class="rmk at">at ${esc(rosterBook().home(id))}</span>` : ''}</div></div>${btn}</div>`; };
  let ask = '';
  if (open && (sel.out || sel.inn)) { const o = sel.out, i = sel.inn;
    const can = o && i ? rosterCanSwap(o, i) : o ? rosterCanOut(o) : rosterCanIn(i);
    const what = o && i ? `${NAME(o)} to camp, ${NAME(i)} walks.` : o ? (can ? `${NAME(o)} to camp.` : `${NAME(o)} to camp: choose who comes in to take the place.`) : (can ? `${NAME(i)} walks.` : `No room: choose who goes to camp for ${NAME(i)}.`);
    ask = `<div class="rask"><p>${esc(what)}</p><div class="row">${can ? '<button class="btn primary sm" id="rDo">Do it</button>' : ''}<button class="btn sm" id="rCancel">Not now</button></div></div>`; }
  return `<p class="fine">Up to six walk: you and five. ${open ? 'Anyone else waits at camp until sent for. Choose who goes, who comes, or both.' : rosterLockWords()}</p>
    <p class="rlack">${lack.length ? `The squad lacks ${rsAnd(lack.map(k => ROSTER_LACKW[k]))}.` : 'The squad has a healer, a bow, a sapper, sorcery and a shield in the line.'}</p>
    ${ask}
    <h4 class="jh">Walking · ${sq.length} of ${ROSTER_CAP}</h4><div class="rlist">${sq.map(id => row(id, 'w')).join('')}</div>
    <h4 class="jh">At camp</h4><div class="rlist">${camp.length ? camp.map(id => row(id, 'c')).join('') : '<p class="fine">Nobody waits at camp.</p>'}</div>
    <div class="row" style="margin-top:12px"><button class="btn" id="rDone">Done</button></div>`; }
const rsAnd = a => a.length > 1 ? a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1] : a[0] || '';
function rosterLockWords(){ const b = S.book || 'gotm';
  return b === 'hoc' ? 'Radde\'s muster comes first.' : b === 'dg' ? 'Nobody can be sent for on this stretch. At the next halt.' : 'Nobody can be sent for here.'; }
/* open the screen; back: the fire node to show again on Done (or null for the map) */
function openRoster(back){ if (!S) return; if (back !== undefined) rosterBack = back; const m = $('#modal'); if (m.hidden) AUDIO.play('open'); m.hidden = false; m.scrollTop = 0; routeAnim = null;
  const tabs = ['pack', 'journal', 'save', 'deeds'];
  m.innerHTML = smartq(`<div class="mbox roster"><div class="row" style="justify-content:space-between;align-items:center;margin-bottom:6px"><h2 class="m">The roster</h2><button class="btn" id="bClose">Close</button></div>
    <div class="tabs"><button class="tab" data-t="squad">Squad</button><button class="tab on" data-t="roster">Roster</button>${tabs.map(k => `<button class="tab" data-t="${k}">${k[0].toUpperCase() + k.slice(1)}</button>`).join('')}</div>
    <div>${rosterHTML()}</div></div>`);
  m.querySelectorAll('.tab').forEach(b => b.onclick = () => { AUDIO.play('click'); rosterSel = {out:null, inn:null}; if (b.dataset.t === 'roster') return; if (b.dataset.t === 'squad') { m.hidden = true; openChars(0); } else openModal(b.dataset.t); });
  const shut = () => { AUDIO.play('close'); closeRoster(); };
  $('#bClose').onclick = shut; $('#rDone').onclick = shut;
  m.querySelectorAll('[data-rout]').forEach(b => b.onclick = () => { AUDIO.play('click'); const id = b.dataset.rout; rosterSel.out = rosterSel.out === id ? null : id; if (rosterSel.inn && rosterSel.out && !rosterCanSwap(rosterSel.out, rosterSel.inn)) rosterSel.inn = null; openRoster(); });
  m.querySelectorAll('[data-rin]').forEach(b => b.onclick = () => { AUDIO.play('click'); const id = b.dataset.rin; rosterSel.inn = rosterSel.inn === id ? null : id; if (rosterSel.inn && rosterSel.out && !rosterCanSwap(rosterSel.out, rosterSel.inn)) rosterSel.out = null; openRoster(); });
  const doIt = $('#rDo'); if (doIt) doIt.onclick = () => { const {out, inn} = rosterSel; rosterSel = {out:null, inn:null}; if (out && inn) rosterSwap(out, inn); else if (out) rosterOut(out); else if (inn) rosterIn(inn); openRoster(); };
  const no = $('#rCancel'); if (no) no.onclick = () => { AUDIO.play('click'); rosterSel = {out:null, inn:null}; openRoster(); };
}
const rosterIsOpen = () => !$('#modal').hidden && !!$('#modal .mbox.roster');
/* Back: a choice half made is dropped first; then the screen closes */
function rosterBackOne(){ if (!rosterIsOpen()) return false; if (rosterSel.out || rosterSel.inn) { rosterSel = {out:null, inn:null}; openRoster(); return true; } closeRoster(); return true; }
function closeRoster(){ const m = $('#modal'); m.hidden = true; m.innerHTML = ''; rosterSel = {out:null, inn:null}; const back = rosterBack; rosterBack = null;
  if (back && DLG[back] && !$('#sheet').hidden && S.node === back) talk(back); // the fire again, with what has changed
  else if (notes.length && view === 'explore') { /* the notes wait for the next conversation */ }
  if (typeof rosterBtnSync === 'function') rosterBtnSync(); } // v7.3.3: the map's Roster button and its count follow the change
/* the choice every chapter fire offers (ROSTER_FIRES): the screen over the fire */
function rosterChoice(back){ const camp = S ? rosterCampList() : [], lack = S ? rosterLacks() : [];
  const tag = camp.length ? `${camp.length} at camp` : lack.length && lack.length < 5 ? `lacks ${ROSTER_LACKW[lack[0]]}` : 'who walks';
  return {t:'The roster.', tag, roster:true, go:()=>{ talk(back); ROSTER_UI.open(back); }}; }
/* reached through an object, so tools that read a choice's source (onward_test) see a talk back to the fire and no more */
/* the screen opens a moment after the fire is drawn (one pending open at a time); flush() opens it now (tests) */
const ROSTER_UI = {want:undefined, t:0,
  open(back){ this.want = back; if (!this.t) this.t = setTimeout(() => this.flush(), 0); },
  flush(){ if (this.t) clearTimeout(this.t); this.t = 0; const b = this.want; this.want = undefined; if (b !== undefined && S) openRoster(b); }};
/* each book's chapter fires: [book][chapter] = node ids. Book One has no fire of its own in most chapters; its Roster tab is always there. */
const ROSTER_FIRES = {
  gotm:{2:['c2_fire']},
  dg:{1:['b2_fire'], 2:['b2_road_fire'], 3:['b2_east_fire'], 4:['b2_bank_cart', 'b2_far_wagon'], 5:['b2_kfire'], 6:['b2_hfire', 'b2_gfire'], 7:['b2_bfire']},
  moi:{1:['b3_c1_fire', 'b3_c1_rfire'], 2:['b3_c2_fire'], 3:['b3_c3_fire'], 4:['b3_c4_fire'], 5:['b3_c5_fire'], 6:['b3_c6_fire', 'b3_c6_ledge_fire', 'b3_c6_trench_fire', 'b3_c6_bank_fire', 'b3_c6_landing_fire'], 7:['b3_c7_f_fire', 'b3_c7_r_fire', 'b3_c7_h_fire', 'b3_c7_s_fire']},
  mt:{}, // v8.0 Book Five: its chapters add their fires here (80, "For chapter writers")
  hoc:{1:['b4_c1_yard'], 2:['b4_c2_fire'], 3:['b4_c3_feast', 'b4_c3_farfire'], 4:['b4_c4_setifire'], 5:['b4_c5_wallfire'], 6:['b4_c6_picketfire'], 7:['b4_c7_isle', 'b4_c7_coldfire']},
};
/* the fire nodes get the choice, just before their last (the way out) */
function rosterWrapFires(){ Object.values(ROSTER_FIRES).forEach(chs => Object.values(chs).flat().forEach(id => { const f = DLG[id]; if (!f || f._roster) return;
  const w = function(){ const n = f.apply(this, arguments); if (n && Array.isArray(n.ch) && S && !n.ch.some(c => c && c.roster)) { const c = rosterChoice(id); n.ch = n.ch.slice(); n.ch.splice(Math.max(0, n.ch.length - 1), 0, c); } return n; };
  w._roster = true; DLG[id] = w; })); }

/* ============ gear by role ============ */
/* what a squadmate can use: GEAR_TAGW names each tag. Anyone whose roles hold an item's role can wear it; a few pieces stay personal (who). */
const GEAR_TAGW = {heavy:'heavy armour', mail:'mail', light:'light armour', shield:'a shield', blade:'a blade', heavyweapon:'a heavy weapon', reach:'a spear or a lance',
  ranged:'a bow or a crossbow', satchel:'a sapper\'s kit', healkit:'a healer\'s kit', focus:'a focus or a charm', any:'anyone'};
const TPL_ROLES = {
  sgt:['heavy', 'mail', 'light', 'shield', 'blade', 'heavyweapon', 'reach', 'ranged'],
  brisk:['heavy', 'mail', 'shield', 'blade', 'heavyweapon', 'reach'], kettle:['light', 'mail', 'satchel', 'ranged', 'blade'], tuft:['light', 'focus'],
  ohl:['light', 'healkit', 'focus', 'blade'], ellis:['light', 'ranged', 'blade'], vell:['light', 'blade'],
  sathi:['light', 'ranged', 'blade', 'reach'], tangle:['light', 'mail', 'satchel', 'ranged', 'blade'], haddat:['heavy', 'mail', 'shield', 'blade', 'heavyweapon', 'reach'],
  marrow:['light', 'healkit', 'focus', 'blade'], redblade:['heavy', 'mail', 'shield', 'blade', 'heavyweapon', 'reach'], warlock:['light', 'focus', 'blade'],
  sohra:['light', 'ranged', 'blade', 'reach', 'focus'], greysword:['heavy', 'mail', 'shield', 'blade', 'heavyweapon', 'reach'],
  tallow:['light', 'ranged', 'blade'], hessa:['heavy', 'mail', 'shield', 'blade', 'heavyweapon', 'reach', 'focus'], tebbet:['light', 'ranged', 'blade'],
  darrut:['heavy', 'mail', 'shield', 'blade', 'heavyweapon', 'reach'], orvas:['light', 'mail', 'blade', 'reach'],
  mirrel:['light', 'healkit', 'focus', 'blade'], yorin:['light', 'focus', 'blade'], rasp:['light', 'mail', 'satchel', 'ranged', 'blade'],
  tobet:['light', 'ranged', 'blade'], thegg:['heavy', 'mail', 'shield', 'blade', 'heavyweapon', 'reach'], perrit:['light', 'focus', 'blade'], ammet:['light', 'healkit', 'blade'],
  ruuk:['light', 'ranged', 'blade', 'reach'], pessa:['light', 'blade', 'reach'], brune:['light', 'mail', 'blade', 'reach']}; // v8.0 Book Five (80): Ammet's kit is a surgeon's, no focus
/* every piece's role. Not listed: 'any' (trinkets mostly). GEAR_SIG: the pieces that stay with one soldier (the story needs it) */
const ITEM_ROLE = {
  heater:'shield', cadretoken:'focus', clawknife:'blade', rhivibow:'ranged', toccloak:'light', daruknife:'blade', ropehook:'light', guildblade:'blade', andiicloak:'focus',
  barrowflint:'blade', otatglove:'heavy', scoutcloak:'light', simtalhalberd:'reach', blackedblade:'blade',
  b2_auxtulwar:'heavyweapon', b2_auxmail:'mail', b2_horsebow:'ranged', b2_semkaxe:'heavyweapon', b2_wickanhide:'light', b2_tithlance:'reach', b2_noblesabre:'blade',
  b2_officerscale:'heavy', b2_coldknife:'blade', b2_tcrossbow:'ranged', b2_tleathers:'light', b2_khundrylblade:'blade', b2_arensword:'heavyweapon', b2_arenmail:'mail',
  b3_c2_hornbow:'ranged', b3_c2_mace:'heavyweapon', b3_c3_shield:'shield', b3_c3_spear:'reach', b3_c4_flint:'blade', b3_c6_axe:'heavyweapon', b3_c7_hunterblade:'heavyweapon',
  b4_c1_relic:'any', b4_c3_khundrylknife:'blade', b4_c4_setibow:'ranged', b4_c6_trenchspade:'satchel', b4_c7_dogslayerblade:'blade',
  secondhalberd:'reach', darucrossbow:'ranged', darusword:'heavyweapon', b4_c1_issuemail:'mail', b4_c4_setijack:'light', b4_c6_dogscale:'heavy', b5_c1_issuesword:'blade', b5_c1_tarthclub:'heavyweapon'}; // the items pass (v8.1)
const GEAR_SIG = {secondbadge:['brisk', 'sgt'], moranthchit:['kettle'], b2_sealskin:['haddat']}; // Tav's regiment; Kettle's Moranth; the water-sellers' seal Haddat took
const rolesOf = id => { const t = TPL[id]; if (!t) return []; if (!t.roles) t.roles = (TPL_ROLES[id] || ['light', 'blade']).slice(); return t.roles; };
/* give every item its role (and drop the old name lists), every TPL its roles: run as chapters register, and once more on first use */
let gearRolesN = -1;
function gearRolesApply(){ Object.keys(TPL).forEach(rolesOf);
  Object.entries(ITEMS).forEach(([k, it]) => { if (!it || it._roled) return; it._roled = 1;
    if (GEAR_SIG[k]) it.who = GEAR_SIG[k].slice();
    else if (ITEM_ROLE[k]) { it.role = ITEM_ROLE[k]; delete it.who; }
    else if (!it.role && !it.who) it.role = 'any';
    else if (!it.role) it.role = 'any'; /* an unlisted piece with a name list keeps it (a writer's signature piece) */ });
  gearRolesN = Object.keys(ITEMS).length; }
function canWear(id, g){ const it = ITEMS[g]; if (!it || !TPL[id]) return false; if (gearRolesN !== Object.keys(ITEMS).length) gearRolesApply();
  if (Array.isArray(it.who)) return it.who.includes(id);
  const r = [].concat(it.role || 'any'); return r.includes('any') || r.some(x => rolesOf(id).includes(x)); }
/* the words for the item viewer: who can use it */
function wearWords(g){ const it = ITEMS[g]; if (!it) return ''; if (gearRolesN !== Object.keys(ITEMS).length) gearRolesApply();
  if (Array.isArray(it.who)) { const w = it.who.map(x => x === 'sgt' ? 'the sergeant' : TPL[x].name); return `Can be used by ${rsAnd(w)}. It stays with ${w.length > 1 ? 'them' : rsHe(it.who[0]) === 'she' ? 'her' : 'him'}.`; }
  const r = [].concat(it.role || 'any'); if (r.includes('any')) return 'Anyone in the squad can use it.';
  const here = S ? [...(S.squad || []), ...rosterCampList()].filter(id => canWear(id, g)).map(x => x === 'sgt' ? 'you' : TPL[x].name) : [];
  return `Can be used by anyone who takes ${rsAnd(r.map(x => GEAR_TAGW[x] || x))}${here.length ? `: ${rsAnd(here)}, of this squad` : ''}.`; }
{ const _reg = registerChapter; registerChapter = function(n, CH, book){ const r = _reg(n, CH, book); gearRolesApply(); rosterWrapFires(); return r; }; }
/* the map and a fight start from a tidy kit: one wearer per piece, and a squadmate back from wherever the story sent them wears theirs again */
{ const _se = startExplore; startExplore = function(){ try { gearTidy(); } catch(e) { console.warn('gearTidy', e); } return _se.apply(this, arguments); }; }
{ const _sb = startBattle; startBattle = function(){ try { gearTidy(); } catch(e) { console.warn('gearTidy', e); } return _sb.apply(this, arguments); }; }
