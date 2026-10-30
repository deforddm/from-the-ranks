/* ============ skill checks ============
   A check names a stat and a DC. The player picks who handles it (the likeliest is lit), the choice shows the odds, and every bonus
   has a name: the roller's stat, loyalty, a rattle, the Lord's push, Oponn, and whatever the scene adds (c.edges). A roll lands in
   one of six places: a natural 20, clean (made it by 5 or more), made it, "yes, but" (missed by 1 or 2: it goes through, at a cost),
   failed, a natural 1. A hard check (c.trick) teaches whoever makes it a trick (16b). S.lastRoll keeps the last roll, so the story
   can say who did it: by({tuft:'…', kettle:'…', _:'…'}) and {who} in the text. */
const STATN = {might:'Might', wits:'Wits', guile:'Guile'};
const ROLL = () => (S && S.lastRoll) || {};
const by = m => { const w = ROLL().who; return w && m[w] != null ? m[w] : m._ != null ? m._ : ''; };
const nearMiss = () => ROLL().tier === 'near';
const cleanRoll = () => ROLL().tier === 'clean' || ROLL().tier === 'crit';
/* who may try: the squad, less anyone the choice rules out (c.not) and anyone the trick on offer won't sit with. A third entry in
   c.check names the only one who can (the sergeant's own arms, Kettle's satchel). */
function checkers(c){
  const who = c.check[2]; if (who) return [SQUAD().includes(who) ? who : 'sgt'];
  const T = c.trick && TRICKS[c.trick], no = [...(c.not || []), ...((T && T.not) || [])];
  const ids = SQUAD().filter(id => !no.includes(id) && !mateAway(id)); return ids.length ? ids : ['sgt'];
}
/* the named bonuses one roller brings to one check */
function edgesFor(c, id){
  const out = [];
  if (id !== 'sgt' && (S.loy[id] || 0) >= 2) out.push([`${NAME(id)} trusts you`, 1]);
  if (id !== 'sgt' && (S.loy[id] || 0) <= -2) out.push([`${NAME(id)} is sore at you`, -1]);
  if (S.rattled && S.rattled[id]) out.push(['rattled', -1]);
  if (S.push) out.push(['the Lord\'s push', -2]);
  if (S.card === 'oponn') out.push(['Oponn', 1]);
  if (c.edges) { try { (c.edges(id) || []).forEach(e => { if (e && e[1]) out.push([e[0], e[1]]); }); } catch(e) { console.warn('edges', e); } }
  return out;
}
const sumEdges = es => es.reduce((a, e) => a + e[1], 0);
const modFor = (c, id) => statOf(id, c.check[0]) + sumEdges(edgesFor(c, id));
const dcOf = c => c.check[1] + DIFF().dc;
/* the chance of making it, in percent: a natural 20 always does, a natural 1 never does, the Crown rolls twice */
function oddsOf(c, id){ const dc = dcOf(c), m = modFor(c, id); let n = 0; for (let r = 1; r <= 20; r++) if (r === 20 || (r !== 1 && r + m >= dc)) n++;
  const p = n / 20; return Math.round((S.card === 'crown' ? 1 - (1 - p) * (1 - p) : p) * 100); }
const oddsWord = p => p >= 85 ? 'near certain' : p >= 65 ? 'likely' : p >= 45 ? 'even odds' : p >= 25 ? 'long odds' : 'a prayer';
/* the likeliest hand for a check (the first in squad order on a tie) */
function roller(stat, who, c){ c = c || {check:[stat, 10, who]}; const ids = checkers(c); let best = ids[0];
  ids.forEach(id => { if (modFor(c, id) > modFor(c, best)) best = id; }); return best; }
/* one roll. Spends a rattle and the Lord's push. Without a choice (the minigames) it also notes and counts itself, as it always did. */
function check(stat, dc, who, c){
  const bare = !c; c = c || {check:[stat, dc, who]};
  const id = who || roller(stat, null, c), D = dcOf(c), edges = edgesFor(c, id), base = statOf(id, stat), mod = base + sumEdges(edges);
  if (S.rattled) delete S.rattled[id]; if (S.push) S.push = 0;
  const r = rollAgain({stat, label:STATN[stat] || stat, dc:D, who:id, base, edges, mod, trick:c.trick || null, near:c.near !== false && !c.trick});
  if (bare) { note(SET.dice ? `${r.label} check (DC ${D}): ${NAME(id)} rolls ${r.nat} + ${mod} = ${r.tot} · ${r.ok ? 'success' : 'failure'}` : `${r.label} check: ${NAME(id)} · ${r.ok ? 'success' : 'failure'}`, r.ok ? 'good' : 'bad'); tally(r.ok ? 'checksOk' : 'checksFail'); }
  return r;
}
/* the dice for a roll (again, for the Lady's Pull): the same hand and bonuses, new bones */
function rollAgain(r){
  const crown = S.card === 'crown', r1 = d20(), r2 = crown ? d20() : 0, nat = Math.max(r1, r2), tot = nat + r.mod, margin = tot - r.dc;
  const ok = nat === 20 || (nat !== 1 && tot >= r.dc);
  const tier = nat === 20 ? 'crit' : nat === 1 ? 'fumble' : ok ? (margin >= 5 ? 'clean' : 'ok') : (margin >= -2 && r.near ? 'near' : 'fail');
  return Object.assign({}, r, {crown, r1, r2, nat, tot, margin, ok, tier, pass:ok || tier === 'near'});
}
const TIERW = {crit:'a natural 20', clean:'clean', ok:'success', near:'yes, but…', fail:'failure', fumble:'a natural 1'};
/* the outcome, once the dice have stopped: xp for clean work, the cost of a "yes, but", a rattle for a natural 1, a trick for a hard one */
/* a "yes, but" with no cost of its own is paid by whoever rolled it, in a coin that fits any scene: a hard-won Might check costs skin
   (health off the start of the next fight, never below 1), a near thing of Wits or Guile leaves them rattled. Never silver: a scene that
   costs money says so in its own near:. */
const bruiseN = () => 3 + lvT();
function bruise(id, n){ if (!id) return; S.bruised ??= {}; S.bruised[id] = (S.bruised[id] || 0) + n; }
/* v7.0.1: a check is rolled once. Its result is kept (S.rolled, cleared when a chapter starts, so a replay can try it again), and a
   node shown again does not offer the same check a second time, unless the choice says again:true or it is the node's only way out.
   Without this a check at a cart or a figure on the map could be tried until it came up, and paid each time it did. */
const rolledKey = (id, c) => `${id}|${c.check[0]}|${c.t}`;
const rolledHere = (id, c) => !!(c.check && !c.again && S.rolled && S.rolled[rolledKey(id, c)]);
function settleRoll(r, c){
  if (S.node && c && c.check) { S.rolled ??= {}; S.rolled[rolledKey(S.node, c)] = r.pass ? 1 : 2; }
  S.rattled ??= {}; S.lastRoll = {who:r.who, stat:r.stat, tier:r.tier, ok:r.ok, pass:r.pass, margin:r.margin, nat:r.nat}; // first, so a choice's own extras can read ROLL()
  tally(r.pass ? 'checksOk' : 'checksFail'); if (r.tier === 'clean' || r.tier === 'crit') tally('checksClean'); if (r.tier === 'near') tally('checksNear');
  const extra = (x, cls) => { if (!x) return; try { if (x.fx) x.fx(); } catch(e) { console.warn('check extra', e); } if (x.t) note(typeof x.t === 'function' ? x.t() : x.t, cls); };
  if (r.tier === 'crit') { gainXP(20); note(`A natural 20 for ${NAME(r.who)}. ${S && S.book === 'mt' ? 'The Errant smiles' : 'Oponn smiles'}, for now. +20 xp.`, 'good'); extra(c.crit || c.clean, 'good'); }
  else if (r.tier === 'clean') { gainXP(10); note(`Clean work from ${NAME(r.who)}. +10 xp.`, 'good'); extra(c.clean, 'good'); }
  else if (r.tier === 'near') {
    if (c.near && (c.near.fx || c.near.t)) extra(c.near, 'bad');
    else if (r.stat === 'might') { const n = bruiseN(); bruise(r.who, n); note(`Yes, but ${NAME(r.who)} pays for it in skin: ${n} health down at the start of the next fight.`, 'bad'); }
    else { S.rattled[r.who] = 1; note(`Yes, but it takes it out of ${NAME(r.who)}: rattled, −1 on their next check.`, 'bad'); } }
  else if (r.tier === 'fumble') { S.rattled[r.who] = 1; note(`A natural 1. ${NAME(r.who)} is rattled: −1 on their next check.`, 'bad'); extra(c.fumble, 'bad'); }
  if (r.ok && c.trick) earnTrick(c.trick, r.who);
  save();
}
/* the die: a d20 tumbles in the sheet, settles on the roll, then the story goes on. Tap to hurry it. After a miss, a squad that
   carries the Lady's Pull can spin the coin once: the dice go again, and the Lord pushes back on the next check. */
function rollDice(r, done, spun){
  const sh = $('#sheet'); const old = $('#dice'); if (old) old.remove();
  const el = document.createElement('div'); el.id = 'dice'; el.className = 'dice' + (r.trick ? ' trk' : '');
  const eds = SET.dice ? [`${r.label.toLowerCase()} ${r.base >= 0 ? '+' : '−'}${Math.abs(r.base)}`, ...r.edges.map(e => `${e[0]} ${e[1] > 0 ? '+' : '−'}${Math.abs(e[1])}`)].join(' · ') : '';
  el.innerHTML = `<div class="dwho">${esc(NAME(r.who))} · ${r.label} ${r.dc}${r.trick ? ` · <span class="dtrk">✦ ${esc(TRICKS[r.trick].name)}</span>` : ''}</div><div class="d20"><svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,4 92,28 92,72 50,96 8,72 8,28" fill="#1a1613" stroke="#c9973f" stroke-width="2"/><polygon points="50,4 92,28 50,40 8,28" fill="rgba(201,151,63,.12)"/><polygon points="50,40 92,28 92,72 50,96 8,72 8,28" fill="none" stroke="rgba(201,151,63,.5)" stroke-width="1"/><line x1="50" y1="40" x2="50" y2="96" stroke="rgba(201,151,63,.5)"/></svg><span class="dn">20</span></div><div class="dres"></div>${eds ? `<div class="deds">${esc(eds)}</div>` : ''}<div class="dact"></div>`;
  sh.appendChild(el); el.scrollIntoView({block:'nearest'});
  const n = el.querySelector('.dn'), res = el.querySelector('.dres'), die = el.querySelector('.d20'), act = el.querySelector('.dact');
  const t0 = performance.now(), dur = REDUCE() ? 200 : 950; let fin = false, gone = false;
  AUDIO.play('shuffle');
  const leave = () => { if (gone) return; gone = true; if (el.isConnected) el.remove(); done(r); };
  const settle = () => { if (fin) return; fin = true; n.textContent = r.nat; die.style.transform = '';
    die.classList.add(r.tier === 'crit' ? 'crit' : r.tier === 'fumble' ? 'fumble' : 'set'); el.classList.add(r.pass ? 'ok' : 'bad', 't-' + r.tier);
    const two = r.crown && SET.dice ? ` <span class="dm">(the Crown: ${r.r1} and ${r.r2})</span>` : '';
    res.innerHTML = `${SET.dice ? `${r.nat} <span class="dm">${r.mod >= 0 ? '+' : '−'} ${Math.abs(r.mod)}</span> = <b>${r.tot}</b>${two} ` : ''}<span class="dv">${TIERW[r.tier]}</span>${r.ok && r.trick ? ` <span class="dtrk">✦ ${esc(NAME(r.who))} learns ${esc(TRICKS[r.trick].name)}</span>` : ''}`;
    AUDIO.play('dice', r.pass); if (r.tier === 'crit' && !REDUCE()) { const f = $('#flash'); if (f) { f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); } }
    const pull = !spun && (r.tier === 'fail' || r.tier === 'fumble' || r.tier === 'near') && typeof trickLeft === 'function' && trickLeft('pull') > 0;
    if (pull) { act.innerHTML = `<button class="btn pullb" id="dPull">Spin the coin · the Lady's Pull (${trickLeft('pull')} left)</button><button class="btn" id="dStand">Let it stand</button>`;
      $('#dPull').onclick = e => { e.stopPropagation(); spendTrick('pull'); AUDIO.play('coin'); gone = true; el.remove();
        const r2 = rollAgain(r); S.push = 1; note(`${NAME(trickBy('pull'))} spins the coin. The Lady pulls; the Lord will push back on the next check (−2).`, ''); rollDice(r2, done, true); };
      $('#dStand').onclick = e => { e.stopPropagation(); leave(); };
      el.onclick = leave; return; }
    setTimeout(leave, REDUCE() ? 500 : 2200); };
  const tick = () => { if (fin) return; const k = (performance.now() - t0) / dur; if (k >= 1) return settle(); n.textContent = 1 + R(20); die.style.transform = `rotate(${Math.sin(k*40)*18}deg) scale(${1 + Math.sin(k*Math.PI)*.15})`; setTimeout(tick, 45 + k*90); };
  el.onclick = () => { if (!fin) settle(); else leave(); }; tick();
}
/* IM Fell draws a straight " as a closing curly quote, so the story gets real ones: opening at the start of a run or after a space or
   bracket, or after a dash or asterisk when a word follows; closing everywhere else. Apostrophes and single quotes too: after a letter
   or digit (it's, the quorls' wings, <em>Hood</em>'s) a closing ’; at the start of a word an opening ‘, unless it is a dropped letter
   ('em, 'cause); anything else ’. Only the text between tags is touched, never a tag or its attributes, and the letter before a quote is
   carried across inline tags (em, b, i, span) but not across a block (p, li, div, br…). Empty paragraphs are dropped (in fmt). */
const SQ_ELIDE = /^(em|cause|tis|twas|til|n)\b/i, SQ_BLOCK = /^<\/?(p|div|li|ul|ol|h\d|br|dt|dd|dl|td|tr|th|table|button|label|summary|details|section|header|footer|textarea|canvas)\b/i;
const smartq = t => { let prev = '';
  return String(t).split(/(<[^>]*>)/).map((x, i) => {
    if (i % 2) { if (SQ_BLOCK.test(x)) prev = ''; return x; }
    if (!x) return x;
    let y = x.replace(/(^|[\s(\[])"(?=\S)/g, '$1“').replace(/([—–*])"(?=[\w*'‘])/g, '$1“').replace(/"/g, '”');
    y = y.replace(/'/g, (q, at, str) => { const p = at ? str[at - 1] : prev, n = str[at + 1] || '';
      if (/[\p{L}\p{N}]/u.test(p)) return '’';
      if (/\d/.test(n)) return '’'; // '90s
      if (/[\p{L}\p{N}]/u.test(n) && !SQ_ELIDE.test(str.slice(at + 1))) return '‘';
      return /[\p{L}\p{N}]/u.test(n) ? '’' : (p === '' || /[\s(\[—–“]/.test(p)) && /[*‘]/.test(n) ? '‘' : '’'; });
    prev = y.slice(-1); return y; }).join(''); };
/* the house dash is closed (word—word, "Tell him—"); a few chapters type it spaced. Story text only (fmt): the spaces go. */
const closeDash = p => p.replace(/(\S) —(?: (?=\S)|(?=["”’']|$))/g, '$1—');
const fmt = t => t.replace(/\{sgt\}/g, esc(S.name)).replace(/\{who\}/g, () => esc(NAME(ROLL().who && (SQUAD().includes(ROLL().who) || ROLL().who === 'sgt') ? ROLL().who : 'sgt'))).split(/\n\n/).filter(p => p.trim()).map(p => `<p>${smartq(closeDash(p)).replace(/\*(.+?)\*/g,'<em>$1</em>')}</p>`).join('');

/* the tag on a check: ✦ for a hard one with a trick in it, the stat, the likeliest hand, and the odds (as a number with the roll
   numbers on, as a word without) */
function checkTag(c){
  const id = roller(c.check[0], c.check[2], c), p = oddsOf(c, id), T = c.trick && TRICKS[c.trick] && !(S.tricks && S.tricks[c.trick]) ? TRICKS[c.trick] : null;
  return `<span class="tagk ${T ? 'trk' : ''}">${T ? '✦ ' : ''}${STATN[c.check[0]]}${SET.dice ? ' ' + dcOf(c) : ''} · ${esc(NAME(id))} ${SET.dice ? p + '%' : oddsWord(p)}</span>`;
}
let curCh = [];
/* v6.12.0: words said once in a sitting. G.said keeps, for one sitting of the sheet (until it closes, or a map or a fight comes
   between), the words every node showed. A node whose words come up again unchanged (a hub a branch has come back to) shows its
   `again` line instead, where the writer gave one (a string or a function), or else its words folded to their first line with
   "Read it again" under; and a choice that only asks a thing already heard (its node's every way out comes straight back here, and
   its words would be the same) is not offered again, unless it is the only choice left. */
const saidWords = n => (fmt(n.txt) + (n.after ? fmt(n.after) : '')).replace(/\d+/g, '#'); // a count that moved (silver, a tally) is still the same words
function topicHeard(id, c, offers){ // offers: where this node's other choices go; a heard node whose every way out is one of those, or back here, has nothing left to give
  if (!G.said || typeof c.go !== 'string' || c.check || c.fx || !(c.go in G.said)) return false;
  try { const t = DLG[c.go](); if (saidWords(t) !== G.said[c.go]) return false;
    const ways = (t.ch || []).filter(x => !x.req || x.req()); return ways.length > 0 && ways.every(x => typeof x.go === 'string' && !x.check && (x.go === id || offers.has(x.go))); } catch(e) { return false; }
}
function talk(id){
  if (S.picksDue && S.picksDue.length) return openPicks(() => talk(id));
  const n = DLG[id]();
  S.node = id; save();
  if (n.fx) { S.fxd = S.fxd || {}; if (!S.fxd[id]) { S.fxd[id] = 1; keyWatch(n.fx); } }
  if (n.scene) { sceneShell(n.scene); }
  const sh = $('#sheet'); sh.hidden = false;
  const noteHtml = notes.map(x => `<div class="note ${x.c}">${esc(x.t)}</div>`).join(''); notes = [];
  curCh = n.ch.filter(c => !c.req || c.req());
  { const fresh = curCh.filter(c => !rolledHere(id, c)); if (fresh.length) curCh = fresh; } // a check already rolled here is not offered again
  G.said = G.said || {}; const words = saidWords(n), said = G.said[id] === words && n.again !== false;
  if (curCh.length > 1) { const offers = new Set(curCh.map(c => c.go).filter(g => typeof g === 'string')), keep = curCh.filter(c => !topicHeard(id, c, offers)); if (keep.length) curCh = keep; }
  G.said[id] = words;
  let unspoken = ''; try { unspoken = unspokenLine(id, curCh); } catch(e) { console.warn('unspoken', e); } // somebody here still has something to say (30)
  const body = !said ? `<div class="txt">${fmt(n.txt)}</div>${n.html || ''}${n.after ? `<div class="txt">${fmt(n.after)}</div>` : ''}`
    : n.again != null ? `<div class="txt">${fmt(typeof n.again === 'function' ? n.again() : n.again)}</div>${n.html || ''}`
    : `<div class="txt said" id="saidTxt">${fmt(n.txt)}${n.after ? fmt(n.after) : ''}</div><button class="btn sm saidmore" type="button" id="saidMore">Read it again</button>${n.html || ''}`;
  sh.innerHTML = `<div class="sp">${esc(n.sp || '')}</div>${noteHtml}${body}${unspoken ? `<div class="txt unspoken">${fmt(unspoken)}</div>` : ''}
    <div class="choices">${curCh.map((c,i) => {
      const tag = c.check ? checkTag(c) : c.tag ? `<span class="tagk">${esc(c.tag)}</span>` : '';
      const ware = c.ware && typeof itemStatLine === 'function' && ITEMS[c.ware] ? `<small class="ware">${esc(itemStatLine(c.ware))}</small>` : ''; // v8.1: a shop's piece says what it does (14b)
      return `<button class="choice" id="ch${i}" data-i="${i}">${tag}${smartq(esc(c.t).replace(/&quot;/g,'"'))}${ware}</button>`; }).join('')}</div>`;
  const more = $('#saidMore'); if (more) more.onclick = () => { const t = $('#saidTxt'); if (t) t.classList.remove('said'); more.remove(); };
  sh.scrollTop = 0;
  if (n.oncard) inlineCard($('#icard'), n.oncard[0], n.oncard[1]);
  if (n.onshow) { try { n.onshow(); } catch(e) { console.warn('onshow', e); } } // a node's own drawing (a painting, a map)
  bindChoices();
  dockSheet();
  updSilver(); // a node's own fx can pay or charge after the save above
}
function bindChoices(){
  const sh = $('#sheet');
  sh.querySelectorAll('.choice').forEach(b => b.onclick = () => { AUDIO.play('click'); choose(curCh[+b.dataset.i]); });
  const first = sh.querySelector('.choice'); if (first && !('ontouchstart' in window)) first.focus({preventScroll:true});
}
function goTo(tgt){ if (!tgt) { const was = S.node; closeSheet(); if (view === 'scene') { console.warn('backdrop leave: ' + was); startExplore(); } return; } /* a plain 'leave' never strands the squad on a backdrop */
  if (typeof tgt === 'function') { closeSheet(); tgt(); return; } talk(tgt); }
/* a choice's own effect; a munition it spends ("uses 1 sharper") counts as thrown on the Deeds page, as one thrown in a fight does.
   Gifts ("for good") and the "yes, but" losses (they run elsewhere) don't. */
const MUNIS = ['sharper', 'burner', 'cusser', 'smoker'];
/* the chapter's key flag (c3_key, b2_c3_key, b3_c3_key); when a choice sets it, a low chord marks the moment (v6.8.0) */
const keyFlag = () => S ? ((S.book === 'dg' ? 'b2_' : S.book === 'moi' ? 'b3_' : S.book === 'hoc' ? 'b4_' : S.book === 'mt' ? 'b5_' : '') + 'c' + (S.chapter || 0) + '_key') : null;
function keyWatch(fn){ const k = keyFlag(), was = k && S.f ? S.f[k] : undefined; fn(); if (k && S && S.f && !was && S.f[k]) AUDIO.play('choice'); }
function runFx(c){
  if (!c.fx) return;
  const had = MUNIS.map(k => (S && S.inv && S.inv[k]) || 0);
  keyWatch(c.fx);
  if (!S || !S.inv || /for good/.test(typeof c.tag === 'string' ? c.tag : '')) return;
  MUNIS.forEach((k, i) => { const d = had[i] - (S.inv[k] || 0); if (d > 0) tally('thrown_' + k, d); });
}
function choose(c){
  if (!c.check) { runFx(c); return goTo(c.go); }
  const ids = checkers(c);
  if (c.check[2] || ids.length <= 1) return rollFor(c, ids[0]);
  openPicker(c, ids);
}
/* who handles it: every squadmate who can try, with their odds and what is helping or hurting; the likeliest is lit */
function openPicker(c, ids){
  const box = $('#sheet').querySelector('.choices'); if (!box) return rollFor(c, ids[0]);
  const best = roller(c.check[0], null, c), T = c.trick && TRICKS[c.trick], all = SQUAD(), no = all.filter(id => !ids.includes(id));
  const why = id => { const es = edgesFor(c, id); return [`${STATN[c.check[0]].toLowerCase()} ${statOf(id, c.check[0]) >= 0 ? '+' : '−'}${Math.abs(statOf(id, c.check[0]))}`, ...es.map(e => `${e[0]} ${e[1] > 0 ? '+' : '−'}${Math.abs(e[1])}`)].join(' · '); };
  box.classList.add('picker');
  box.innerHTML = `<div class="pkwhat">${smartq(esc(c.t).replace(/&quot;/g,'"'))}</div>
    <div class="pkhead">Who handles it? <span>${STATN[c.check[0]]}${SET.dice ? ' ' + dcOf(c) : ''}${T && !(S.tricks && S.tricks[c.trick]) ? ` · <b class="dtrk">✦ whoever makes it learns ${esc(T.name)}</b>` : ''}</span></div>
    ${ids.map(id => { const p = oddsOf(c, id); return `<button class="choice who ${id === best ? 'best' : ''}" data-who="${id}"><span class="tagk">${SET.dice ? p + '% · ' : ''}${oddsWord(p)}</span><b>${esc(NAME(id))}</b><small>${esc(why(id))}</small></button>`; }).join('')}
    ${no.map(id => `<button class="choice who" disabled><b>${esc(NAME(id))}</b><small>${esc((T && T.notWhy && T.notWhy[id]) || (c.notWhy && c.notWhy[id]) || 'not this one')}</small></button>`).join('')}
    <button class="choice back" data-back="1">Back</button>`;
  box.querySelectorAll('[data-who]').forEach(b => b.onclick = () => { AUDIO.play('click'); rollFor(c, b.dataset.who); });
  box.querySelector('[data-back]').onclick = () => { AUDIO.play('click'); box.classList.remove('picker'); if (G.said) delete G.said[S.node]; talk(S.node); }; // the same words again, not folded
  const b0 = box.querySelector('.best') || box.querySelector('[data-who]'); if (b0 && !('ontouchstart' in window)) b0.focus({preventScroll:true});
  b0 && b0.scrollIntoView({block:'nearest'});
}
function rollFor(c, who){
  runFx(c);
  const r = check(c.check[0], c.check[1], who, c);
  $('#sheet').querySelectorAll('.choice').forEach(b => b.disabled = true);
  rollDice(r, fr => { settleRoll(fr, c); goTo(fr.pass ? c.go : c.fail); });
}
function closeSheet(){
  $('#sheet').hidden = true; S.node = null; G.said = null; // a new sitting next time
  if (notes.length && view === 'explore') { notes.forEach(n => elog(n.t)); notes = []; }
  if (view === 'explore') updExplore();
  save();
}
/* a backdrop for talk nodes that happen away from the explore map */
const SCENES = {
  tunnel:{loc:'Under the Pale', sub:'North sapper tunnels', cap:'Lantern light, cold air, and the smell of old stone.', amb:'tunnel'},
  dark:{loc:'Under the Pale', sub:'Kurald Galain leaks through the stone', warren:true, cap:'The lantern light has to push through the dark like water.', amb:'dark'},
  camp_night:{loc:'The Pale', sub:'The camp at night', get cap(){ return typeof S !== 'undefined' && S && S.f && S.f.c1_hounds && S.chapter === 1 ? 'Tent lines under a bruised sky, and the cadre row still burning.' : 'Tent lines under a bruised sky. The cadre row has one lamp lit.'; }, amb:'explore'},
  tent:{loc:'Tattersail\'s tent', sub:'The cadre row', cap:'Candle smoke, wet canvas, and cards that will not lie still.', amb:'explore'},
  fire:{loc:'The Bridgeburners\' fire', sub:'East picket', cap:'A fire bigger than yours, and soldiers who do not look up when you arrive. They saw you coming a mile off.', amb:'explore'},
  plain:{loc:'The Rhivi Plain', sub:'Grass to every horizon', cap:'The wagon, the guide, and six days of grass.', amb:'explore'},
  plain_dusk:{loc:'The Rhivi Plain', sub:'Dusk', cap:'The light goes long and red across the grass, and the grass does not care.', amb:'explore'},
  plain_night:{loc:'The Rhivi Plain', sub:'Night', cap:'Stars all the way down to the ground. Nothing between you and them.', amb:'explore'},
  hills:{loc:'The Gadrobi Hills', sub:'Brown hills, folded', cap:'Barrow mounds like knuckles under the grass. The city a smudge behind you. Nothing moves that you can see.', amb:'explore'},
  hills_dusk:{loc:'The Gadrobi Hills', sub:'Dusk', cap:'The hills go red and then brown and then nothing. The opened barrow breathes cold up out of the ground.', amb:'explore'},
  hills_night:{loc:'The Gadrobi Hills', sub:'Night', cap:'No stars over the long barrow, where there should be stars. Frost on the grass, the folds of the hills going black, and nothing on them that you can see.', amb:'dark'},
  hills_puppet:{loc:'The Gadrobi Hills', sub:'Night · the next hill', cap:'No stars over the barrow. There should be. Something on the next hill is the size of a child and is not one.', amb:'dark'},
  hills_rent:{loc:'The Gadrobi Hills', sub:'Night · the rent', warren:true, cap:'A slit of grey down the hillside from the puppet\'s feet to the bottom of the fold, curling at the edges, and everything loose on the grass going into it.', amb:'dark'},
  city_street:{loc:'Darujhistan', sub:'The city of blue fire', cap:'Gas lamps burning blue down every street, and a black mountain hanging over the lake that the city has stopped looking up at.', amb:'explore'},
  city_dusk:{loc:'Darujhistan', sub:'Under the walls · dusk', cap:'The lamps coming on one at a time, a little tongue of blue in each glass, and out over the lake, black against the last of the light, a mountain hanging.', amb:'explore'},
  city_day:{loc:'Darujhistan', sub:'The morning after the Fete', cap:'Full light, the lamps out in their glass, last night\'s smoke lying in the streets like a dog that won\'t move, and over the lake a sky with nothing in it.', amb:'explore'},
  inn:{loc:'The Phoenix Inn', sub:'The Daru District', cap:'Low beams, spilled wine, a fat man in a red waistcoat, and every thief in the city pretending not to watch the door.', amb:'explore'},
  cellar:{loc:'Under the intersection', sub:'The gas conduits', cap:'Cut stone, a lantern, a smell like a struck match, and crates with Moranth seals stacked where no crate should be.', amb:'tunnel'},
  room:{loc:'The dye-shop', sub:'An upstairs room, Daru District', cap:'Skeins of blue and madder hung to dry, one lamp, one chair, and a woman already expecting you.', amb:'explore'},
  roof_night:{loc:'Darujhistan', sub:'The rooftops · night', cap:'Flat roofs and planks, chimneys, a skylight, the lake mist coming up between the buildings, and a black mountain over all of it with no light in its windows.', amb:'explore'},
  roof_andii:{loc:'Darujhistan', sub:'The rooftops · night · Kurald Galain', warren:true, cap:'Tall shapes with silver hair on the far ridges, and one stepping across onto the next roof without hurrying, with a dark sword held low and the cold coming off it like cold off a well.', amb:'explore'},
  roof:{loc:'Darujhistan', sub:'A rooftop above the dig · dawn', cap:'Tiles wet with lake mist, the blue fire going out lamp by lamp, a kitchen chimney starting to smoke, and the black mountain over the lake catching none of the light.', amb:'explore'},
  roof_shapes:{loc:'Darujhistan', sub:'A rooftop above the dig · dawn', cap:'In the grey after the last lamp goes out: figures, crouched along every ridge across the city, dozens of them, all facing the same way, like crows in a field before rain.', amb:'explore'},
  /* Chapters 6 and 7 (the chapters overwrite these with their own text at registration) */
  fete_street:{loc:'Darujhistan', sub:'The Gedderone Fete · dusk', cap:'Lanterns strung across every street, masks on every face, and a black mountain over the lake that no one mentions.', amb:'explore'},
  fete_hall:{loc:'Lady Simtal\'s estate', sub:'The hall', cap:'Chandeliers, masks, music, and a very tall guest by a pillar who does not dance.', amb:'explore'},
  fete_garden:{loc:'Lady Simtal\'s estate', sub:'The garden', cap:'Hedges, lanterns in the trees, a fountain, and something small and black growing in turned earth.', amb:'explore'},
  garden_storm:{loc:'Lady Simtal\'s estate', sub:'The garden · Omtose Phellack', warren:true, cap:'Frost goes across the lawn in rings. The lanterns go out one after another.', amb:'dark'},
  dragon_sky:{loc:'Darujhistan', sub:'The sky over the city', warren:true, cap:'Two dragons over the roofs, and one of them is not a dragon.', amb:'dark'},
  alley_night:{loc:'Darujhistan', sub:'An alley off the Daru District', cap:'Wet stone, one blue lamp, a doorway, and somebody standing in it.', amb:'dark'},
  lakefront_dawn:{loc:'Darujhistan', sub:'The Lakefront · dawn', cap:'Docks, the lake, a ship at the pier, and a sky with nothing in it.', amb:'explore'},
  quorl_hill:{loc:'East of Darujhistan', sub:'A hill on Jammit\'s Worry', cap:'Quorls on the grass, Black Moranth in chitin, and the city small behind.', amb:'explore'},
  road_east:{loc:'Genabackis', sub:'The road north-east', cap:'A column on a road through brown hills, very far off, and banners.', amb:'explore'},
  ship:{loc:'Lake Azur', sub:'A deck', cap:'Grey water, a sail, and the city getting smaller.', amb:'explore'},
};
/* ambience for the new scenes: the Fete has a crowd and pipes, the lake has water and gulls */
const sceneAmb = (kind, amb) => amb === 'explore' && ['fete_street','fete_street_night','fete_crossing','fete_hall'].includes(kind) ? 'fete' : amb === 'explore' && kind === 'fete_garden' && !feteDawn() ? 'fete' : amb === 'explore' && ['lakefront_dawn','ship'].includes(kind) ? 'lake' : amb;
function sceneShell(kind){
  if (kind === 'explore') { if (view !== 'explore') { startExplore(); } return; }
  S.bg = kind;
  if (view === 'scene' && G.sceneKind === kind) return;
  view = 'scene'; B = null; G.sceneKind = kind; const sc = SCENES[kind] || SCENES.tunnel; AUDIO.setScene(sceneAmb(kind, sc.amb || kind));
  toTop(); $('#app').innerHTML = `<header class="hud"><div><div class="loc">${sc.loc}</div><div class="sub ${sc.warren ? 'warren' : ''}">${sc.sub}</div></div><div class="hudr">${hudButtons()}</div></header>
    <div class="scene"><canvas id="scv" width="560" height="240"></canvas><div class="cap">${sc.cap}</div></div>`;
  bindHud();
}
