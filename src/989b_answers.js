/* ============ v13.56.0: tricks that answer by themselves (David, Nov 19, 2026) ============
   David: "some of the squad end up with way too many active abilities… I think maybe ALL of the tricks should be passives"; then, of the table
   (series-polish-plan.md §0g): "approved", with "tricks that swap spaces with allies should not be passive, also thrown items like the fire pots
   or blue flame shouldn't be passive either".
   An answer is a trick with no button (AB.passive, so 031's trickAbs leaves it off the bar). It fires by itself, as often as it could be used
   before (once a fight, or its charges a chapter), the first time its moment comes. What it does is its old run(), unchanged; only who decides
   when has changed. Still buttons: the six swaps and the six thrown or called bursts.
   Loaded after every book's tricks and after v10.3's free and passive pass (989). */
const ANS = {
  lock:['line', 'b4_c1_gate', 'b5_c6_finger', 'b6_c1_map', 'b7_c2_margin', 'b8_c2_brake', 'b9_c1_rollcall', 'b9_c2_step', 'b10_c7_rim'],
  heal:['song', 'b5_c5_mark', 'b6_c2_weather', 'b7_c4_horse', 'b8_c4_hymn', 'b9_c3_cure', 'b10_c4_farrier'],
  sign:['cant', 'b6_c5_horsetalk', 'b7_c1_fingertalk', 'b8_c6_knifesign', 'b3_c2_hand', 'b5_c3_link'],
  coin:['pull', 'b5_c7_dock', 'b7_c7_luck', 'b8_c7_toll', 'b10_c2_ledger'],
  otat:['otataral'], cover:['dark', 'b6_c4_vinegar', 'b7_c6_ward', 'b9_c6_dust'], stop:['rime', 'b3_c1_call'], drop:['b2_drop'], close:['b2_earth'],
  first:['b2_paint', 'b9_c5_witness', 'b10_c1_roll', 'b2_squint', 'b9_c7_low', 'b10_c5_mouthful', 'b4_c5_seabed'],
  wound:['b3_c3_stripe'], hook:['b3_c4_wolfrope'], shot:['b3_c6_knot'], halfadj:['b3_c7_anvil'], anywound:['b4_c2_crow'], crowd:['b4_c3_tears'],
  avenge:['b4_c7_deadride'], halfward:['b8_shroud'], inside:['b2_inside'], breath:['b2_breath']};
const ANS_WHEN = {
  lock:'the first time an enemy strikes at the bearer or a squadmate beside them', heal:'the first time a squadmate within 4 falls below half health',
  sign:'the first time the bearer hits an enemy', coin:'on a failed check, and on the bearer\'s first miss of a fight',
  otat:'the first time an enemy within reach works sorcery', cover:'the first time an enemy shoots at a squadmate within 5 of the bearer',
  stop:'on the first enemy to strike the bearer', drop:'the first time an enemy shoots at the bearer', close:'on the first enemy to close with the bearer',
  first:'at the bearer\'s first turn of every fight', breath:'the first time two or more enemies stand beside the bearer', wound:'at the bearer\'s first wound', hook:'on the first enemy the bearer hits hand to hand',
  shot:'on the first enemy to shoot at the bearer from 2 to 4 tiles off', halfadj:'the first time a squadmate beside the bearer falls below half health',
  anywound:'at the first wound to any squadmate', crowd:'the first time two or more enemies are within 2 of the bearer',
  avenge:'on the first enemy to bring a squadmate below half health', halfward:'on the first squadmate within reach to fall below half health',
  inside:'on the bearer\'s first blow at an enemy with a long weapon'};
const ansOn = () => !(typeof window !== 'undefined' && window.FTR_TRICKBTN); // the test tools' seam (tools/page.mjs): the chapter tests press the tricks' old buttons
const ANS_FAM = {};
/* the four whose effect is not their old button's, word for word (plan §0g) */
const ANS_OWN = {
  b2_inside:() => `Once a fight: that blow is +${2 + lvT()} to hit, and the shaft is broken: no more reach for that enemy this fight. Grows with level.`,
  b2_breath:() => `Once a fight: the breath goes out. Every enemy beside the bearer takes 1d6+${1 + lvT()} cold and is −2 to hit until the bearer's next turn. Squadmates are not caught. Grows with level. Elder sorcery: otataral does not touch it.`,
  b3_c6_knot:() => 'Once a fight: a weighted line. That enemy is hauled up to two steps toward the bearer, past any squadmate\'s free swing on the way, and knocked down: no move on its next turn (a boss shakes the knot off on 12+, but is still hauled). Grows with level.',
  b4_c5_seabed:() => 'Every fight: the bearer reads the ground for the squad. For the first two rounds every squadmate ignores the dust\'s range penalty and moves +1. Not sorcery: it never sputters.'};
if (ansOn()) Object.entries(ANS).forEach(([fam, ks]) => ks.forEach(k => { const t = TRICKS[k], a = t && t.ab && AB[t.ab]; if (!a) return; ANS_FAM[k] = fam; a.passive = true; a.answer = fam;
  const d = Object.getOwnPropertyDescriptor(t, 'fx'); const base = d && d.get ? d.get : (() => d ? d.value : '');
  t._fxBase = () => String(base.call(t) || '');
  Object.defineProperty(t, 'fx', {configurable:true, enumerable:true, get(){ let s = ANS_OWN[k] ? ANS_OWN[k]() : fam === 'coin' ? `${trickTimes(k)} a chapter: a failed check is rolled again, and in a fight the bearer's first miss is struck again. It wants paying for: the squad's next check is −2. Not sorcery.` : String(base.call(t) || '');
    s = s.replace(/ It does not use the action \(one free trick a turn\)\./, '').replace(/, and it does not use the bearer's action/, '').replace(/ It uses the action, and leaves no ward\./, ' It leaves no ward.').replace(/ It takes the bearer's action\./, '').replace(/They are slowed, and −2/, 'They are −2');
    return `Works by itself, ${ANS_WHEN[fam]}. Nothing to press. ${s}`; }}); }));
let ansBusy = 0;
/* the bearer of trick k if it can fire now, else null */
function ansBearer(k){ if (!B || B.over || !ANS_FAM[k]) return null; const t = TRICKS[k], a = AB[t.ab], id = trickBy(k); if (!a || !id) return null;
  const u = B.units.find(q => q.id === id && q.side === 'p' && q.hp > 0 && !q.ally); if (!u || u.stun) return null;
  if (t.use === 'chapter' ? trickLeft(k) <= 0 || B.used['ans_' + k] : B.used[t.ab]) return null; return u; }
/* take trick k's use and announce it; the bearer, or null. (x, y) must be a tile its own tiles() allows */
function ansTake(k, x, y, any){ const u = ansBearer(k); if (!u) return null; const t = TRICKS[k], a = AB[t.ab];
  if (!any && !a.self && typeof a.tiles === 'function') { let ok = false; try { ok = a.tiles(u).some(p => p.x === x && p.y === y); } catch (e) {} if (!ok) return null; }
  if (t.use === 'chapter') { spendTrick(k); B.used['ans_' + k] = 1; } else { B.used[t.ab] = 1; tally('tricksUsed'); }
  blog(`<em>${u.name}: ${t.name}.</em>`); float(u, t.name, '#e8c073'); return u; }
/* fire trick k at (x, y): its old run(), unchanged */
function ansFire(k, x, y){ const u = ansTake(k, x, y); if (!u) return false; const t = TRICKS[k], a = AB[t.ab];
  const hs = B.healSrc; B.healSrc = t.ab; ansBusy++;
  try { const r = a.self ? a.run(u, u.x, u.y) : a.run(u, x, y); if (r && typeof r.then === 'function') r.catch(e => console.warn('answer', k, e)).finally(() => { ansBusy--; }); else ansBusy--; }
  catch (e) { ansBusy--; console.warn('answer', k, e); } finally { B.healSrc = hs; }
  try { updBattleUI(); } catch (e) {} return true; }
const ansEach = (fam, f) => (ANS[fam] || []).forEach(k => { if (ANS_FAM[k]) { const u = ansBearer(k); if (u) f(k, u); } });
/* whoever has fallen below half: the heals, the ward, the borrowed pain, the ride */
function ansHalf(t, by){ if (!B || B.over || !t || t.side !== 'p' || t.ally || t.hp <= 0 || t.hp * 2 >= t.maxhp) return;
  ansEach('heal', (k, u) => { if (cheb(u, t) <= 4) ansFire(k, u.x, u.y); });
  ansEach('halfward', (k, u) => ansFire(k, t.x, t.y));
  ansEach('halfadj', (k, u) => { if (u !== t && cheb(u, t) <= 1) ansFire(k, t.x, t.y); });
  if (by && by.hp > 0) ansEach('avenge', (k, u) => ansFire(k, by.x, by.y)); }
/* an enemy near the bearer: the first to close, the crowd */
function ansNear(){ if (!B || B.over || ansBusy) return;
  ansEach('close', (k, u) => { const e = foes().find(f => f.hp > 0 && cheb(u, f) <= 1); if (e && ansFire(k, e.x, e.y)) foes().forEach(f => { if (f.earthUntil === B.round + 1) f.slowTurn = false; }); });
  ansEach('crowd', (k, u) => { if (foes().filter(f => f.hp > 0 && cheb(u, f) <= 2).length >= 2) ansFire(k, u.x, u.y); });
  ansEach('breath', (k, u) => { const them = foes().filter(f => f.hp > 0 && cheb(u, f) <= 1); if (them.length < 2 || !ansTake(k, u.x, u.y, true)) return;
    AUDIO.play('slam'); sparks(u.x, u.y, 26, '#bfe8ff', .6); blog(`${u.name} breathes out, long and slow, and the breath is white. Frost goes over the ground in a ring, and over everything standing on it that is not the squad.`);
    them.forEach(f => { f.ansColdUntil = B.round + 1; float(f, 'rimed', '#bfe8ff'); hurt(f, roll(1, 6, 1 + lvT())); }); }); }
if (ansOn()) { const _attack = attack;
  attack = function(a, t, o = {}){
    if (!B || B.over || ansBusy || !a || !t) return _attack(a, t, o);
    const foeHits = a.side !== 'p' && t.side === 'p', oursHits = a.side === 'p' && t.side !== 'p' && !a.ally;
    try { ansNear();
      if (foeHits) { const far = cheb(a, t) > 1;
        ansEach('lock', (k, u) => { if (u === t || cheb(u, t) <= 1) ansFire(k, u.x, u.y); });
        if (far) { ansEach('cover', (k, u) => { if (cheb(u, t) <= 5) ansFire(k, t.x, t.y); }); ansEach('drop', (k, u) => { if (u === t) ansFire(k, u.x, u.y); }); }
        if (far && (a.magic || /shadow|sorcer|bolt|lance|warren|spell/i.test(a.verb || ''))) ansEach('otat', (k, u) => ansFire(k, a.x, a.y)); }
      if (oursHits && !o.aoo && !o.dmg) ansEach('inside', (k, u) => { const long = (t.rng || 1) > 1 || (t.sk || []).includes('reach'); if (u !== a || !long || !ansTake(k, t.x, t.y, true)) return;
        o = Object.assign({}, o, {bonus:(o.bonus || 0) + 2 + lvT(), verb:o.verb || 'comes in under the guard of'});
        later(() => { if (t.hp > 0) { t.rng = 1; t.sk = (t.sk || []).filter(q => q !== 'reach'); float(t, 'shaft broken', '#c8b08a'); blog(`${t.name}'s shaft is in two pieces.`); } }, pace(320)); });
    } catch (e) { console.warn('answers', e); }
    let r = _attack(a, t, o);
    try { if (r && !r.hit && oursHits && !o.aoo && !o.dmg && t.hp > 0) ansEach('coin', (k, u) => { if (u !== a || r.hit || !ansTake(k, u.x, u.y, true)) return; S.push = 1; AUDIO.play('coin'); blog(`<em>The coin spins.</em> ${a.name} strikes again. The squad's next check is −2.`); r = _attack(a, t, o); });
      if (foeHits && cheb(a, t) > 1) ansEach('shot', (k, u) => { if (u !== t || !ansTake(k, a.x, a.y)) return; const e = a;
        later(async () => { if (e.hp <= 0) return; let x = e.x, y = e.y; for (let i = 0; i < 2; i++) { const nx = x + Math.sign(u.x - x), ny = y + Math.sign(u.y - y); if (cheb({x:nx, y:ny}, u) < 1 || !free(nx, ny, e)) break; x = nx; y = ny; }
          AUDIO.play('step'); blog(`${u.name} throws the weighted line, and the knot runs. ${e.name} comes across the ground at the end of it.`); if (x !== e.x || y !== e.y) await forcedMove(e, {x, y}, 'is hauled past');
          if (B && e.hp > 0) { if (e.boss && d20() >= 12 + 2 * lvT()) float(e, 'shakes it off', '#c8b08a'); else { e.prone = true; float(e, 'down', '#c8b08a'); } updBattleUI(); } }, pace(420)); });
    } catch (e) { console.warn('answers', e); }
    try { if (r && r.hit) {
        if (foeHits) { ansEach('stop', (k, u) => { if (u === t && a.hp > 0) ansFire(k, a.x, a.y); }); ansEach('wound', (k, u) => { if (u === t) later(() => ansFire(k, u.x, u.y), pace(260)); }); ansEach('anywound', (k, u) => later(() => ansFire(k, u.x, u.y), pace(260)));
          later(() => ansHalf(t, a), pace(300)); }
        if (oursHits) { ansEach('sign', (k, u) => { if (u === a && t.hp > 0) later(() => { if (t.hp > 0) ansFire(k, t.x, t.y); }, pace(240)); });
          if (cheb(a, t) <= 1) ansEach('hook', (k, u) => { if (u === a && t.hp > 0) later(() => { if (t.hp > 0) ansFire(k, t.x, t.y); }, pace(240)); }); } }
    } catch (e) { console.warn('answers', e); }
    return r; };
  /* the standing ones, at the bearer's first turn; and a look round at every turn's start */
  const _sts = squadTurnStart; squadTurnStart = function(u){ const road = B && B.b4road, keep = road && road.on && road.u === u && ANS_FAM.b4_c5_seabed && B.round < 3; if (keep) road.u = null;
    let r; try { r = _sts(u); } finally { if (keep) road.u = u; }
    try { if (B && !B.over && u && u.side === 'p') { ansEach('first', (k, b) => { if (b === u) ansFire(k, u.x, u.y); }); ansNear(); party().forEach(p => ansHalf(p, null)); } } catch (e) { console.warn('answers', e); } return r; };
  /* an answer never ends anybody's turn: the cover tricks' own afterAct() is for their old button */
  const _aa = afterAct; afterAct = function(){ if (ansBusy) return; return _aa.apply(this, arguments); };
  /* otataral: the first enemy within reach to work sorcery finds red dust in its mouth */
  const _fs = foeSpecial; foeSpecial = async function(u, gone){ try { if (B && !B.over && u && u.side !== 'p' && !u.otat && (u.sk || []).some(q => SORC.includes(q))) ansEach('otat', (k, b) => ansFire(k, u.x, u.y)); } catch (e) { console.warn('answers', e); } return _fs.apply(this, arguments); };
  /* the Tower's Breath: −2 to hit while the cold is on them */
  const _ac = atkCalc; atkCalc = function(a, t, o){ const c = _ac.apply(this, arguments); if (c && B && a && a.ansColdUntil >= B.round) c.bonus -= 2; return c; };
  /* the coins, at a check: a plain failure is rolled again by itself. A near miss is still the sergeant's to spin or let stand. */
  if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') { const mo = new MutationObserver(() => { const b = document.getElementById('dPull'); if (!b || b.dataset.ans) return; b.dataset.ans = 1;
      const el = b.closest('.t-near'); if (el) return; setTimeout(() => { if (b.isConnected) b.click(); }, 650); });
    const go = () => mo.observe(document.body, {childList:true, subtree:true}); if (document.body) go(); else document.addEventListener('DOMContentLoaded', go); } }

/* ---- v13.62.0 (plan §0g, open item a; David, Nov 20, 2026: "proceed with what you can do now"): hold a healing trick for the sergeant's word.
   The nine tricks that mend or ward a squadmate fire the first time anyone drops below half, which is not always the moment the player would pick.
   On the bearer's sheet each has a switch. Held, it is the button it was before v13.56.0, words, cost and all; let go, it answers by itself again.
   The choice is kept in the save (S.trickHold). Nothing else may be held: the other answers either have no better moment or no longer do what their button did. ---- */
const HOLD_FAMS = ['heal', 'halfward', 'halfadj'];
const holdable = k => !!ANS_FAM[k] && HOLD_FAMS.includes(ANS_FAM[k]);
const ansHeld = k => { try { return !!(S && S.trickHold && S.trickHold[k]) && holdable(k); } catch (e) { return false; } };
if (ansOn()) { Object.keys(ANS_FAM).filter(holdable).forEach(k => { const t = TRICKS[k], a = AB[t.ab];
    Object.defineProperty(a, 'passive', {configurable:true, enumerable:true, get(){ return !ansHeld(k); }, set(){}});
    const d = Object.getOwnPropertyDescriptor(t, 'fx'), auto = d.get;
    Object.defineProperty(t, 'fx', {configurable:true, enumerable:true, get(){ return ansHeld(k) ? 'Held for your word: a button in a fight, used when you say. ' + t._fxBase() : auto.call(t); }}); });
  const _bearer = ansBearer; ansBearer = function(k){ return ansHeld(k) ? null : _bearer(k); }; }
function holdSet(k, on){ if (!S || !holdable(k)) return; S.trickHold = S.trickHold || {}; if (on) S.trickHold[k] = 1; else delete S.trickHold[k]; try { save(); } catch (e) {}
  /* mid-fight: the bearer's bar gains or loses the button at once */
  try { if (B && !B.over) { const t = TRICKS[k], id = trickBy(k), u = B.units.find(q => q.id === id && q.side === 'p'); if (u && u.ab) { const i = u.ab.indexOf(t.ab); if (on && i < 0) u.ab.splice(Math.max(0, u.ab.length - 1), 0, t.ab); if (!on && i >= 0) u.ab.splice(i, 1); updBattleUI(); } } } catch (e) {} }
/* the sheet: a switch under each holdable trick */
{ const _open = openChars; openChars = function(i, tab){ const r = _open.apply(this, arguments);
    try { if (ansOn() && S && !S._preview) { const SQ = SQUAD(), id = SQ[charIdx], ks = tricksOf(id), rows = document.querySelectorAll('#chars .trks .abl > div');
        ks.forEach((k, n) => { const row = rows[n]; if (!row || !holdable(k)) return; const held = ansHeld(k), b = document.createElement('button'); b.className = 'btn holdbtn'; b.dataset.hold = k; b.setAttribute('aria-pressed', held ? 'true' : 'false');
          b.textContent = held ? 'Held for your word · let it answer by itself' : 'Hold it for my word';
          b.onclick = () => { AUDIO.play('click'); holdSet(k, !ansHeld(k)); openChars(charIdx); const nb = document.querySelector(`#chars [data-hold="${k}"]`); if (nb) nb.focus({preventScroll:true}); };
          row.appendChild(b); }); } } catch (e) { console.warn('hold', e); } return r; }; }
