/* ============ Book Ten: the games at the fires (v13.0) ============ */
/* Book Ten keeps its games here and wraps the chapters' fire nodes from this file, as Books Six to Nine do (109, 129, 149, 169), so the
   chapter files 181-187 are untouched. Five games, one at each place the book's people gather, over both squads
   (docs/tcg-games-notes.md):
   - The Corporal's Ladder (Ch1, the Third, b10_c1_fire, the camp by day and the first night): Thallo's soldier's pack, higher or lower,
     five rungs a climb, three climbs each. The regard of whichever squadmate needed the evening most.
   - Yelt's Measures (Ch2, the Letherii, b10_c2_fire): a five-measure skin, a three-measure jug and the barrel; measure exactly what Yelt
     asks in so many pours, three times. The regard of whichever squadmate needed it most.
   - Straws (Ch3, the Third, b10_c3_fire, the circle under the cloaks by day): a heap of slivers knapped off the glass (splinters of a dead
     wagon's spoke on the long way round); take one nothing lies across, against Thallo. No fire, no dice: a quiet game in the shade.
     The regard of whichever squadmate needed it most.
   - Fists (Ch4, the Letherii, b10_c4_fire, the horse-lines): docks hidden in a fist, the total called, against Orla of the water-carts (a
     carter at the column's tail on the 'adjunct' road). Witness +1: something to laugh at by the horse-lines.
   - Coins on the Shield (Ch7, the Third, b10_c7_fire, the night before): coins shoved across a shield laid flat, against a regular from
     the next fire (a Letherii spearman on 'south'). Witness +1: the regulars will remember the Third.
   No game in Ch5 (the fire with no fire, the water gone) or Ch6 (the battle's day): the squads are not at a table there (Claude's call),
   nor at Ch7's barrows.
   Each is declinable (the fire's own choices stay), played once a book, pays at most +1 regard or +1 Witness once, as the table closes,
   and keeps its deeds on S.deeds. None touches thirst, coin, gear or anything else. They use the tables' frame (36), the in-game check
   (89: b5gRoll and its tiers), Book Six's night sky (109: b6gNight) and Book Seven's fire (129: b7gFire). Engine: none (b10DeedsExtra is
   wrapped for the Deeds page, guarded to Book Ten's saves). */

const b10gOn = () => b5gOn(), b10gPick = a => b5gPick(a), b10gRoll = (s, dc, who, e) => b5gRoll(s, dc, who, e), b10gRollHTML = r => b5gRollHTML(r);
const B10G_SHE = ['haddat', 'sathi', 'marrow', 'mirrel', 'hessa', 'rasp', 'wenna', 'tegra', 'perrit', 'ammet', 'ilsa', 'brune', 'pessa', 'kaedra', 'tirren'];
const b10gHe = id => id === 'sgt' ? 'you' : B10G_SHE.includes(id) ? 'she' : 'he';
const b10gWho = r => r.who === 'sgt' ? 'You' : NAME(r.who);
const b10gV = (r, you, they) => r.who === 'sgt' ? you : they;
const b10gSp = () => Math.max(.4, SET.speed || 1);
const B10G_DCT = 17, B10G_DCL = 15; // the Third at 24 to 28, the Letherii at 16 to 20 (Claude's call, two over Book Nine's 15 and 13)
const b10gAfter = (sp, scene, back, txt) => ({sp, scene, txt, html:witnessHTML(), ch:[{t:'Back to the fire.', go:back}]});
const b10gSay = m => { for (const k of Object.keys(m)) if (k !== '_' && b10In(k)) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b10gCap = s => s[0].toUpperCase() + s.slice(1);
/* the book's own coin: +1 regard to whichever squadmate walking needed the evening most (the lowest regard); with nobody else walking,
   +1 Witness instead. Or +1 Witness. Each once, behind its own flag. */
const b10gLowest = () => (S.squad || []).filter(k => k !== 'sgt' && b10In(k) && S.loy && S.loy[k] != null).sort((a, b) => S.loy[a] - S.loy[b])[0] || null;
function b10gRegard(flag, why){ if (S.f[flag]) return; const low = b10gLowest(); if (low) { loy(low, 1); S.f[flag] = low; } else { S.f[flag] = 'witness'; b10Witness(1, why); } }
function b10gWit(flag, why){ if (S.f[flag]) return; S.f[flag] = 1; b10Witness(1, why); }
const b10gPaidLine = (flag, alt) => { const p = S.f[flag]; return p && p !== 'witness' && p !== 1 && b10In(p) ? `${NAME(p)} ${alt}` : ''; };

/* ============ 1. The Corporal's Ladder, at the Third's fire in the camp ============
   Thallo, the Third's corporal, big as a door and not eating, has a soldier's pack of plain cards, pips one to twelve, four of each. A card
   is up; call the next higher or lower. Right, and you climb a rung; wrong, or the same, and you are off. Five rungs is the top. Three
   climbs each, the most rungs over the three; level is nobody's. Thallo calls the even way (higher under seven, lower over six); a
   sergeant who keeps count of what has gone by can do better. Once a game, before a call, count the pack (Wits; Tangle, who counts
   everything twice, with an edge): made, one slip this climb (a wrong call does not drop you); "yes, but", the slip, and Thallo takes one
   on his next climb too. Won: the regard of whichever squadmate needed the evening most, once. */
const B10G_LADDER = 5, B10G_CLIMBS = 3;
function playB10Ladder(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b10gSp());
  const g = MG.state = {pack:[], up:0, rung:0, climb:0, mine:[], his:[], phase:'intro', talk:'', check:null, used:false, slip:false, tslip:false, over:false, seen:[], last:null, him:false};
  const result = () => { const a = g.mine.reduce((x, y) => x + y, 0), b = g.his.reduce((x, y) => x + y, 0); return {mine:a, his:b, won:g.over && a > b, tie:g.over && a === b, done:g.over}; };
  mgOpen({kick:'The camp · the Third\'s fire', title:'The Corporal\'s Ladder', leaveText:'Leave the cards', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b10gOn();
  const fresh = () => { g.pack = []; for (let v = 1; v <= 12; v++) for (let k = 0; k < 4; k++) g.pack.push(v); for (let i = g.pack.length - 1; i > 0; i--) { const j = R(i + 1); [g.pack[i], g.pack[j]] = [g.pack[j], g.pack[i]]; } g.seen = []; };
  const draw1 = () => { if (!g.pack.length) fresh(); const v = g.force != null ? g.force : g.pack.pop(); if (g.force != null) { const i = g.pack.lastIndexOf(v); if (i >= 0) g.pack.splice(i, 1); } g.force = null; g.seen.push(v); return v; };
  const tot = a => a.reduce((x, y) => x + y, 0);
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? 'The cards are back in Thallo\'s shirt' : g.him ? `Thallo's climb ${g.his.length + 1} of ${B10G_CLIMBS}` : `Your climb ${Math.min(g.climb + 1, B10G_CLIMBS)} of ${B10G_CLIMBS}`}</span><span>Rung <b>${g.rung}</b> of ${B10G_LADDER}</span><span>You <b>${tot(g.mine)}</b> · Thallo <b>${tot(g.his)}</b></span></div>
      ${g.talk}${b10gRollHTML(g.check)}${g.seen.length ? `<p class="fine">Gone by: ${g.seen.slice(-12).join(' · ')}</p>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="ldDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' ? `<button class="btn primary" id="ldGo" data-bot="1">Cut the pack</button>`
        : g.phase === 'call' ? `<button class="btn primary" id="ldHi" data-bot="1">Higher</button><button class="btn primary" id="ldLo" data-bot="1">Lower</button>${!g.used ? `<button class="btn" id="ldCount" data-bot="1">Count the pack first (once)</button>` : ''}`
        : g.phase === 'next' ? `<button class="btn primary" id="ldNext" data-bot="1">Climb again</button>`
        : `<button class="btn" disabled data-bot="1">${g.him ? 'Thallo climbs' : 'The card comes over'}</button>`}</div>
      <p class="fine">A card is up. Call the next one higher or lower. Right, and you climb a rung; wrong, or the same, and you are off. Five rungs is the top. Three climbs each; the most rungs over the three takes it.</p>
      <p class="hint keys"><kbd>H</kbd> higher · <kbd>L</kbd> lower · <kbd>C</kbd> count · <kbd>Space</kbd> go on · <kbd>Esc</kbd> leave</p>`),
    bind = () => { if ($('#ldGo')) $('#ldGo').onclick = () => start(); if ($('#ldHi')) $('#ldHi').onclick = () => call(1); if ($('#ldLo')) $('#ldLo').onclick = () => call(-1);
      if ($('#ldCount')) $('#ldCount').onclick = () => count(); if ($('#ldNext')) $('#ldNext').onclick = () => start(); if ($('#ldDone')) $('#ldDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const start = () => { if (g.over || !(g.phase === 'intro' || g.phase === 'next')) return; if (!g.pack.length || g.phase === 'intro') fresh(); g.rung = 0; g.up = draw1(); g.phase = 'call'; g.last = null; AUDIO.play('shuffle');
    g.talk = mgSay('Thallo', g.climb ? b10gPick([`"Again. ${g.up} showing."`, `He turns one over. "${g.up}. Up you go."`]) : `He turns the top card over on his knee. "${g.up}. Higher or lower, Sergeant."`); redraw(); };
  const call = d => { if (g.phase !== 'call') return; const v = draw1(), right = d > 0 ? v > g.up : v < g.up; g.last = {v, right, t:performance.now()};
    if (right) { g.rung++; g.up = v; AUDIO.play('coin'); if (g.rung >= B10G_LADDER) { g.talk = mgSay('Thallo', `${v}. "Top of the ladder." He nods, slowly, as if that cost him something.`); return off(); } g.talk = mgSay('', `${v}. ${b10gPick(['Up a rung.', 'Another rung.', 'Thallo grunts. Up you go.'])}`); return redraw(); }
    if (g.slip) { g.slip = false; g.up = v; AUDIO.play('click'); g.talk = mgSay('', `${v}. Wrong, but you had it counted near enough. You stay on the rung. <span class="dim">(the slip, spent)</span>`); return redraw(); }
    AUDIO.play('miss'); g.talk = mgSay('Thallo', `${v}. ${v === g.up ? '"Same card. Same card is mine."' : b10gPick(['"Off you come."', '"Down."', '"That\'s the ladder."'])}`); off(); };
  const off = () => { g.mine.push(g.rung); g.climb++; g.slip = false; g.phase = 'wait';
    if (g.climb >= B10G_CLIMBS) { g.talk += mgSay('', `Your three climbs: ${g.mine.join(', ')}. Thallo takes the pack.`); redraw(); return T(thallo, 1000); }
    g.phase = 'next'; redraw(); };
  /* Thallo: three climbs, calling the even way */
  const thallo = () => { if (g.over) return; g.him = true; let r = 0, up = draw1(), sl = g.tslip; g.tslip = false;
    while (r < B10G_LADDER) { const d = up <= 6 ? 1 : -1, v = draw1(), ok = d > 0 ? v > up : v < up; if (ok) { r++; up = v; continue; } if (sl) { sl = false; up = v; continue; } break; }
    g.his.push(r); g.rung = r; AUDIO.play(r >= 3 ? 'coin' : 'click');
    g.talk = mgSay('Thallo', `${b10gPick(['He climbs', 'He calls it the even way and climbs', 'He climbs without looking much'])} ${numw(r)} rung${r === 1 ? '' : 's'}${r >= B10G_LADDER ? ', to the top' : ''}.`); redraw();
    if (g.his.length >= B10G_CLIMBS) return T(end, 900); T(thallo, 900); };
  /* the check: count the pack (Wits). Made: one slip this climb. Yes, but: the slip, and one for Thallo on his next climb. */
  const count = () => { if (g.used || g.over || g.phase !== 'call') return; g.used = true; AUDIO.play('click');
    const r = g.check = b10gRoll('wits', B10G_DCT, null, [['he counts everything twice, and the second count is the one he believes', 2, 'tangle'], ['a carter knows a load by what has come off it', 1, 'pruss'], ['she keeps the long list in her head', 1, 'haddat'], ['you have watched a lot of corporals deal', 1, 'sgt']]);
    if (r.ok) { g.slip = true; g.talk = mgSay(r.who === 'tangle' ? 'Tangle' : '', r.who === 'tangle' ? 'Tangle leans over and counts what has gone by on his fingers, under his breath, twice. "Twelves are thin," he says. <span class="dim">(one slip this climb)</span>' : `${b10gWho(r)} ${b10gV(r, 'count', 'counts')} what has gone by, card by card. <span class="dim">(one slip this climb)</span>`); }
    else if (r.tier === 'near') { g.slip = true; g.tslip = true; g.talk = mgSay('Thallo', '"Counting, is it." He taps his temple. "So can I." <span class="dim">(one slip this climb; one for Thallo on his next)</span>'); }
    else g.talk = mgSay('', `${b10gWho(r)} ${b10gV(r, 'try', 'tries')} to count what has gone by, and loses it somewhere in the sevens.`);
    redraw(); };
  const end = () => { if (g.over) return; g.over = true; g.phase = 'over'; const res = result(); mgDeed(res.won ? 'b10LadderWon' : 'b10LadderLost'); AUDIO.play(res.won ? 'win' : res.tie ? 'click' : 'lose');
    g.talk = mgSay('Thallo', res.won ? `"${res.mine} to my ${res.his}." He squares the pack and puts it back inside his shirt, against his ribs, where his belly used to be. "Good. One thing in this camp ought to go somebody's way."` : res.tie ? `"${res.mine} each. No one's." He puts the pack away. "Suits me."` : `"${res.his} to your ${res.mine}." He puts the pack away. "Ladder's mine, Sergeant. It's always been mine. I used to bet biscuit on it."`) +
      b10gSay({tangle:() => mgSay('Tangle', '"Twelves were thin all night," Tangle says. "I said."'), pruss:() => mgSay('Pruss', '"My old squad played it for the last mouthful," Pruss says. He does not say who won.'), _:() => mgSay('', 'Round the camp the fires are low, and spaced wider than they were.')}); redraw(); };
  mgKeys({h:() => call(1), l:() => call(-1), c:() => count(), ' ':() => { const b = $('#ldDone') || $('#ldGo') || $('#ldNext'); b && !b.disabled && b.click(); }});
  /* the camp: the Third's fire, Thallo on a crate with the pack, the card up on his knee, the ladder of five rungs chalked on a board */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, night = b101Night(), now = performance.now();
    if (night) b6gNight(ctx, W, H, t, {top:'#070a10', mid:'#2a3a52', cut:.46, low:'#14100c', seed:10101});
    else { const sk = ctx.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, '#b8b4a8'); sk.addColorStop(.46, '#d8c8a0'); sk.addColorStop(.47, '#8a7656'); sk.addColorStop(1, '#5a4a34'); ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H); }
    for (let i = 0; i < 6; i++) { const x = W*(.02 + i*.17); poly(ctx, [[x, H*.47], [x + W*.07, H*.36], [x + W*.14, H*.47]], night ? '#14121a' : '#6a5a44'); }
    b7gFire(ctx, W*.18, H*.66, t, H);
    const bx = W*.42, by = H*.2, bh = H*.42; ctx.fillStyle = 'rgba(30,24,18,.75)'; ctx.fillRect(bx, by, W*.1, bh); for (let i = 0; i <= B10G_LADDER; i++) { const y = by + bh - i*bh/B10G_LADDER; ctx.fillStyle = i && i <= g.rung ? '#e8c073' : 'rgba(220,210,190,.4)'; ctx.fillRect(bx + 4, y - 1, W*.1 - 8, 2); } // the ladder
    if (g.phase !== 'intro' && !g.over) { const cw = Math.min(W*.13, 60), chh = cw*1.4, cx = W*.62, cy = H*.38; ctx.fillStyle = '#e8dcc0'; ctx.fillRect(cx, cy, cw, chh); ctx.strokeStyle = '#4a3a24'; ctx.strokeRect(cx, cy, cw, chh);
      b5gText(ctx, String(g.up), cx + cw/2, cy + chh*.62, chh*.45, '#2a1a10', 'center', '\'IM Fell English SC\', serif', 400);
      if (g.last && now - g.last.t < 800) { const k = (now - g.last.t)/800; ctx.strokeStyle = `rgba(${g.last.right ? '159,208,232' : '232,160,112'},${(1 - k).toFixed(2)})`; ctx.lineWidth = 3; ctx.strokeRect(cx - 4 - k*8, cy - 4 - k*8, cw + 8 + k*16, chh + 8 + k*16); ctx.lineWidth = 1; } }
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b9_c1_thallo', W*.84, H*.88, fs*1.05, t, {still:!g.him, dir:-1}); drawFigure(ctx, 'sgt', W*.32, H*.9, fs, t, {still:g.phase !== 'call', dir:1});
    const mate = ['tangle', 'pruss', 'haddat', 'marrow'].find(k => b10In(k)); if (mate) drawFigure(ctx, mate, W*.08, H*.88, fs*.92, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', `Thallo sits down on a ration crate by the Third's fire with a soldier's pack of cards, the plain kind, pips one to twelve, soft as cloth from use. He is big as a door. He used to be bigger. He has not been eating; he gives his to the wounded tent and says he is not hungry, and the Third lets him say it.`) +
    mgSay('Thallo', '"The Ladder, Sergeant. Higher or lower. Five rungs to the top. Three climbs each." He riffles the pack. "Something to do with the hands, while the clerks do the lists."') +
    b10gSay({pruss:() => mgSay('', 'Pruss sits on his heels at the edge of the fire with his helm in his lap, watching the cards the way a carter watches a load.'), tangle:() => mgSay('', 'Tangle has already started counting the pack.'), _:''});
  redraw();
}
function b10LadderPay(r){ if (!r) return; S.f.b10_ladder = {mine:r.mine, his:r.his, won:!!r.won, tie:!!r.tie, done:!!r.done};
  if (r.won) b10gRegard('b10_ladderPaid', 'the top of Thallo\'s ladder');
  save(); }

/* ============ 2. Yelt's Measures, at the train ============
   Yelt, who keeps the brigade's ration book, has a five-measure skin, a three-measure jug and a barrel, and a clerk's test he gives every
   new carter: measure exactly what he asks, in so many pours, nothing spilt. Fill from the barrel, empty back into it, pour one into the
   other until the one is empty or the other full. Three measures, each harder; two of three take it. The pours allowed are the fewest it
   can be done in, and two over. Once a game, at the start of a measure, do the sums first (Wits; Perrit, whom the school taught sums, with
   an edge): made, two more pours this measure; "yes, but", two more pours, and the jug is knocked over and both go back to empty. Won:
   the regard of whichever squadmate needed it most, once. */
const B10G_MEASURES = [[5, 3, 4], [7, 4, 6], [9, 4, 7]], B10G_MEASWIN = 2;
const b10gMeasMin = (A, B, want) => { const seen = new Set(['0,0']); let q = [[0, 0]], n = 0;
  while (q.length) { const nq = []; for (const [a, b] of q) { if (a === want || b === want) return n;
      const tAB = Math.min(a, B - b), tBA = Math.min(b, A - a);
      for (const s of [[A, b], [a, B], [0, b], [a, 0], [a - tAB, b + tAB], [a + tBA, b - tBA]]) { const k = s.join(); if (!seen.has(k)) { seen.add(k); nq.push(s); } } }
    q = nq; n++; } return 99; };
function playB10Measures(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b10gSp());
  const g = MG.state = {m:0, a:0, b:0, A:5, B:3, want:4, left:0, mine:0, lost:0, phase:'intro', talk:'', check:null, used:false, over:false, log:[], spill:0};
  const result = () => ({mine:g.mine, lost:g.lost, won:g.over && g.mine >= B10G_MEASWIN, done:g.over});
  mgOpen({kick:'The train · the water wagons', title:'Yelt\'s Measures', leaveText:'Leave the skins', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b10gOn();
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? 'Yelt shuts his book' : `Measure ${g.m + 1} of 3: <b>${g.want}</b>, exactly`}</span><span>Pours left <b>${g.left}</b></span><span>You <b>${g.mine}</b> · Yelt <b>${g.lost}</b></span></div>
      ${g.talk}${b10gRollHTML(g.check)}${g.phase === 'pour' ? `<p class="fine">The skin holds <b>${g.a}</b> of ${g.A}; the jug holds <b>${g.b}</b> of ${g.B}.${g.log.length ? ` ${g.log.slice(-3).join(' ')}` : ''}</p>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="msDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' || g.phase === 'next' ? `<button class="btn primary" id="msGo" data-bot="1">${g.phase === 'intro' ? 'Take the skins' : 'The next measure'}</button>${!g.used && g.phase === 'next' ? `<button class="btn" id="msSums" data-bot="1">Do the sums first (once)</button>` : ''}`
        : g.phase === 'pour' ? `<button class="btn" data-ms="fa" data-bot="1">Fill the skin</button><button class="btn" data-ms="fb" data-bot="1">Fill the jug</button><button class="btn" data-ms="ab" data-bot="1">Skin into jug</button><button class="btn" data-ms="ba" data-bot="1">Jug into skin</button><button class="btn" data-ms="ea" data-bot="1">Empty the skin</button><button class="btn" data-ms="eb" data-bot="1">Empty the jug</button>${!g.used && g.left === g.left0 ? `<button class="btn" id="msSums" data-bot="1">Do the sums first (once)</button>` : ''}`
        : `<button class="btn" disabled data-bot="1">Yelt checks it</button>`}</div>
      <p class="fine">Fill from the barrel, empty back into it, or pour one into the other until the one is empty or the other full. Get the measure Yelt asks for into either, within the pours. Two measures of three take it.</p>
      <p class="hint keys"><kbd>1</kbd>–<kbd>6</kbd> pour · <kbd>S</kbd> sums · <kbd>Space</kbd> go on · <kbd>Esc</kbd> leave</p>`),
    bind = () => { document.querySelectorAll('#mgPanel [data-ms]').forEach(b => b.onclick = () => pour(b.dataset.ms));
      if ($('#msGo')) $('#msGo').onclick = () => deal(); if ($('#msSums')) $('#msSums').onclick = () => sums(); if ($('#msDone')) $('#msDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const deal = () => { if (g.over || !(g.phase === 'intro' || g.phase === 'next')) return; const [A, B, w] = B10G_MEASURES[g.m]; Object.assign(g, {A, B, want:w, a:0, b:0, log:[], phase:'pour', check:g.phase === 'intro' ? null : g.check});
    g.left = g.left0 = b10gMeasMin(A, B, w) + 2 + (g.bonus || 0); g.bonus = 0; AUDIO.play('click');
    g.talk = mgSay('Yelt', g.m === 0 ? `"The skin holds five. The jug holds three. Give me four in either, exactly, in ${numw(g.left)} pours."` : g.m === 1 ? `"A seven-skin, a four-jug. Six, in ${numw(g.left)}."` : `"A nine and a four. Seven, in ${numw(g.left)}. This one I give the quartermasters."`); redraw(); };
  const pour = k => { if (g.phase !== 'pour' || g.left <= 0) return; const {A, B} = g; let {a, b} = g, w = '';
    if (k === 'fa') { a = A; w = 'The skin, full from the barrel.'; } else if (k === 'fb') { b = B; w = 'The jug, full.'; } else if (k === 'ea') { a = 0; w = 'The skin, back into the barrel.'; } else if (k === 'eb') { b = 0; w = 'The jug, back into the barrel.'; }
    else if (k === 'ab') { const t = Math.min(a, B - b); a -= t; b += t; w = `Skin into jug: ${t}.`; } else if (k === 'ba') { const t = Math.min(b, A - a); b -= t; a += t; w = `Jug into skin: ${t}.`; } else return;
    g.a = a; g.b = b; g.left--; g.log.push(w); AUDIO.play('click');
    if (a === g.want || b === g.want) return mark(true);
    if (!g.left) return mark(false); redraw(); };
  const mark = ok => { g.phase = 'wait'; if (ok) g.mine++; else g.lost++; AUDIO.play(ok ? 'coin' : 'miss');
    g.talk = mgSay('Yelt', ok ? b10gPick([`He tips the ${g.a === g.want ? 'skin' : 'jug'} into his own measure and holds it to the light. "${numw(g.want, true)}. Exactly." He writes it down.`, `"${numw(g.want, true)}." He writes it in the book, in the honest column.`]) : `"Out of pours." He looks at the skin and the jug. "${numw(g.a, true)} and ${numw(g.b)}. Close is a word for quartermasters."`);
    redraw(); if (g.mine >= B10G_MEASWIN || g.lost >= 2 || g.m >= 2) return T(end, 900); g.m++; T(() => { g.phase = 'next'; redraw(); }, 900); };
  /* the check: do the sums first (Wits). Made: two more pours this measure. Yes, but: two more, and the jug goes over: both empty. */
  const sums = () => { if (g.used || g.over || !(g.phase === 'next' || (g.phase === 'pour' && g.left === g.left0))) return; g.used = true; AUDIO.play('click');
    const r = g.check = b10gRoll('wits', B10G_DCL, null, [['the school taught her sums before it taught her the Holds', 2, 'perrit'], ['he has loaded barrels onto wagons since he could walk', 1, 'brennet'], ['he counts water in his sleep now', 1, 'tobet'], ['you have done the water sums on every road since Letheras', 1, 'sgt']]);
    const more = n => { if (g.phase === 'pour') { g.left += n; g.left0 += n; } else g.bonus = n; };
    if (r.ok) { more(2); g.talk = mgSay(r.who === 'perrit' ? 'Perrit' : '', r.who === 'perrit' ? 'Perrit takes a stick and writes it in the dust, a column of little sums, and frowns at it, and rubs one out. "There," she says. <span class="dim">(two more pours this measure)</span>' : `${b10gWho(r)} ${b10gV(r, 'work', 'works')} it through in the dust with a stick before a drop moves. <span class="dim">(two more pours this measure)</span>`); }
    else if (r.tier === 'near') { more(2); g.a = 0; g.b = 0; g.talk = mgSay('Yelt', 'The sums are right. The jug, set down on the tailboard while somebody works them, goes over, and the skin with it. Yelt watches it soak into the ground without a word, and then writes it down. <span class="dim">(two more pours; both empty)</span>'); }
    else g.talk = mgSay('', `${b10gWho(r)} ${b10gV(r, 'start', 'starts')} the sums in the dust and ${b10gV(r, 'lose', 'loses')} them somewhere between the jug and the skin.`);
    redraw(); };
  const end = () => { if (g.over) return; g.over = true; g.phase = 'over'; const W = g.mine >= B10G_MEASWIN; mgDeed(W ? 'b10MeasWon' : 'b10MeasLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk = mgSay('Yelt', W ? `"${numw(g.mine, true)} of three." He blots the page. "I would take you on as a clerk. I would not wish it on you."` : `"${numw(g.mine, true)} of three." He shuts the book. "The quartermasters do no better. I tell them so. They do not like it."`) +
      b10gSay({perrit:() => mgSay('Perrit', W ? '"It is only sums," Perrit says, and looks pleased anyway.' : '"There is a trick to the third," Perrit says. "I will show you on the road."'), tirren:() => mgSay('Tirren', '"Horses do it better," Tirren says. "They know to the mouthful what is in a bucket."'), _:() => mgSay('', 'Along the train the carters are loading the last barrels, and counting them as they go.')}); redraw(); };
  mgKeys({1:() => pour('fa'), 2:() => pour('fb'), 3:() => pour('ab'), 4:() => pour('ba'), 5:() => pour('ea'), 6:() => pour('eb'), s:() => sums(), ' ':() => { const b = $('#msDone') || $('#msGo'); b && !b.disabled && b.click(); }});
  /* the train on the rise, or the halt at night: a water wagon's tailboard, the barrel, the skin and the jug with their water drawn as it stands */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, night = b102Ph() >= 3;
    if (night) b6gNight(ctx, W, H, t, {top:'#070a10', mid:'#2a3442', cut:.5, low:'#1a140e', seed:10201, fx:W*.12, fy:H*.66});
    else { const sk = ctx.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, '#c0bcae'); sk.addColorStop(.48, '#e2d4b2'); sk.addColorStop(.49, '#a08a64'); sk.addColorStop(1, '#6a5638'); ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H); ctx.fillStyle = 'rgba(220,226,236,.5)'; ctx.fillRect(0, H*.46, W, H*.03); }
    ctx.fillStyle = '#3a2a1a'; ctx.fillRect(W*.04, H*.6, W*.92, H*.06); ctx.fillStyle = '#2a1e12'; ctx.fillRect(W*.06, H*.66, W*.02, H*.2); ctx.fillRect(W*.92, H*.66, W*.02, H*.2); // the tailboard
    const vessel = (x, cap, now, lbl) => { const w = W*.12, h = H*.06*cap, y = H*.6 - h; ctx.fillStyle = '#5a4026'; ctx.fillRect(x, y, w, h); ctx.fillStyle = 'rgba(120,170,210,.85)'; ctx.fillRect(x + 2, H*.6 - (h - 2)*now/cap, w - 4, (h - 2)*now/cap);
      for (let i = 1; i < cap; i++) { ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(x, H*.6 - h*i/cap, 4, 1); } b5gText(ctx, `${lbl} ${now}/${cap}`, x + w/2, y - 6, Math.max(10, H*.04)); };
    ell(ctx, W*.2, H*.5, W*.07, H*.12, '#4a3420'); b5gText(ctx, 'barrel', W*.2, H*.42, Math.max(10, H*.04));
    if (g.phase !== 'intro') { vessel(W*.4, g.A, g.a, 'skin'); vessel(W*.6, g.B, g.b, 'jug'); }
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b5_c1_clerk', W*.86, H*.9, fs, t, {still:true, dir:-1}); drawFigure(ctx, 'sgt', W*.3, H*.92, fs, t, {still:g.phase !== 'pour', dir:1});
    const mate = ['perrit', 'brennet', 'tirren', 'tobet'].find(k => b10In(k)); if (mate) drawFigure(ctx, mate, W*.1, H*.9, fs*.92, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', 'Yelt has the ration book shut under his arm for once, and a five-measure skin and a three-measure jug set out on a water wagon\'s tailboard beside a barrel, as if somebody had left them there by accident.') +
    mgSay('Yelt', '"Every new carter gets this. Every quartermaster too, though they pretend not. Measure what I ask, exactly, and nothing spilt. Water is the only thing out here worth counting twice."') +
    b10gSay({perrit:() => mgSay('', 'Perrit looks at the jug and the skin, and her lips move.'), brennet:() => mgSay('', 'Brennet knocks the barrel with a knuckle, to hear how full it is.'), _:''});
  redraw();
}
function b10MeasPay(r){ if (!r) return; S.f.b10_meas = {mine:r.mine, lost:r.lost, won:!!r.won, done:!!r.done};
  if (r.won) b10gRegard('b10_measPaid', 'Yelt\'s measures, honest');
  save(); }

/* ============ 3. Straws, in the circle under the cloaks ============
   No fire in the glass, and no table: the Third lies up by day under its cloaks, and Thallo has knapped a handful of slivers off the glass
   (on the long way round, splinters off a dead wagon's spoke) and let them fall in a heap. Take one that nothing lies across; touch one
   that something does, and the heap shifts and it is Thallo's go. Thallo takes his the same way, and his big hands are surer than they
   look. Most slivers taken wins; level is nobody's. A quiet game, in the shade, for the hours when talking costs water. Once a game, before
   you take one, read the heap (Wits; Tangle, who has picked fuses out of worse, with an edge): made, the free slivers catch the light this
   go; "yes, but", they catch it, and Thallo sees them too, and his next is sure. Won: the regard of whichever squadmate needed it most. */
const B10G_STRAWS = 11;
function playB10Straws(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b10gSp());
  const g = MG.state = {st:[], mine:0, his:0, phase:'intro', talk:'', check:null, used:false, glint:false, tsure:false, over:false, last:null, him:false};
  const result = () => ({mine:g.mine, his:g.his, won:g.over && g.mine > g.his, tie:g.over && g.mine === g.his, done:g.over});
  const glassy = !b103South();
  mgOpen({kick:glassy ? 'The lie-up · under the cloaks' : 'The lie-up · in the wagon\'s shade', title:'Straws', leaveText:'Leave the heap', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b10gOn();
  const cross = (p, q) => { const d = (a, b, c) => (b[0] - a[0])*(c[1] - a[1]) - (b[1] - a[1])*(c[0] - a[0]); const a1 = [p.x1, p.y1], a2 = [p.x2, p.y2], b1 = [q.x1, q.y1], b2 = [q.x2, q.y2];
    return d(a1, a2, b1)*d(a1, a2, b2) < 0 && d(b1, b2, a1)*d(b1, b2, a2) < 0; };
  const free = i => !g.st[i].gone && !g.st.some((q, j) => j > i && !q.gone && cross(g.st[i], q));
  const left = () => g.st.filter(s => !s.gone).length;
  const deal = () => { g.st = []; let tries = 0; while (tries++ < 50) { g.st = Array.from({length:B10G_STRAWS}, (_, i) => { const cx = .2 + Math.random()*.6, cy = .2 + Math.random()*.6, a = Math.random()*Math.PI, l = .22 + Math.random()*.14; return {x1:cx - Math.cos(a)*l/2, y1:cy - Math.sin(a)*l/2, x2:cx + Math.cos(a)*l/2, y2:cy + Math.sin(a)*l/2, gone:false}; });
      const nf = g.st.filter((_, i) => free(i)).length; if (nf >= 2 && nf <= 5) break; } };
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? 'The heap is gone' : g.him ? 'Thallo\'s go' : g.phase === 'intro' ? 'The heap' : 'Your go'}</span><span>Left <b>${left()}</b></span><span>You <b>${g.mine}</b> · Thallo <b>${g.his}</b></span></div>
      ${g.talk}${b10gRollHTML(g.check)}
      ${g.phase === 'pick' ? `<div style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:5px;width:100%;max-width:340px;margin:6px auto;box-sizing:border-box">${g.st.map((s, i) => `<button class="btn${g.glint && free(i) ? ' on' : ''}" data-sw="${i}" data-bot="1" style="min-width:0;width:100%;padding:0;height:40px;font-size:15px" ${s.gone ? 'disabled' : ''}>${s.gone ? '·' : i + 1}</button>`).join('')}</div>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="swDone" data-bot="1">Back to the circle</button>`
        : g.phase === 'intro' ? `<button class="btn primary" id="swGo" data-bot="1">Let the heap fall</button>`
        : g.phase === 'pick' ? `${!g.used ? `<button class="btn" id="swRead" data-bot="1">Read the heap first (once)</button>` : ''}<button class="btn" disabled data-bot="1">Tap a sliver</button>`
        : `<button class="btn" disabled data-bot="1">${g.him ? 'Thallo takes his' : 'The heap settles'}</button>`}</div>
      <p class="fine">Take a sliver that nothing lies across. Touch one that something does, and the heap shifts, and it is Thallo's go. The brighter they are, the higher they lie. Most taken wins.</p>
      <p class="hint keys"><kbd>R</kbd> read the heap · <kbd>Space</kbd> go on · <kbd>Esc</kbd> leave</p>`),
    bind = () => { document.querySelectorAll('#mgPanel [data-sw]').forEach(b => b.onclick = () => take(+b.dataset.sw));
      if ($('#swGo')) $('#swGo').onclick = () => { AUDIO.play('click'); deal(); g.phase = 'pick'; g.talk = mgSay('Thallo', '"You first. Quiet, now. They\'re trying to sleep."'); redraw(); };
      if ($('#swRead')) $('#swRead').onclick = () => read(); if ($('#swDone')) $('#swDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const take = i => { if (g.phase !== 'pick' || !g.st[i] || g.st[i].gone) return; g.last = {i, t:performance.now(), ok:free(i)};
    if (free(i)) { g.st[i].gone = true; g.mine++; AUDIO.play('coin'); g.talk = mgSay('', b10gPick([`Number ${i + 1} comes away clean.`, `${i + 1}, lifted out without a sound.`, `Clean. ${i + 1} is yours.`])); if (!left()) return end(); return redraw(); }
    AUDIO.play('miss'); g.glint = false; g.talk = mgSay('', `${i + 1} has another lying across it. The heap shifts with a small dry sound. Thallo's go.`); g.phase = 'wait'; redraw(); T(thallo, 900); };
  /* Thallo: a free one four times in five, else the heap shifts; his next is sure after a "yes, but" */
  const thallo = () => { if (g.over) return; g.him = true; const fr = g.st.map((_, i) => i).filter(free);
    if (!left()) return end();
    const ok = fr.length && (g.tsure || Math.random() < .8); g.tsure = false;
    if (ok) { const i = fr[R(fr.length)]; g.st[i].gone = true; g.his++; g.last = {i, t:performance.now(), ok:true, him:true}; AUDIO.play('coin'); g.talk = mgSay('Thallo', `${b10gPick(['He takes', 'Two fingers, and he has', 'He breathes out and lifts'])} ${i + 1}.`); redraw(); if (!left()) return T(end, 700); return T(thallo, 800); }
    g.talk = mgSay('Thallo', `His thumb touches the wrong one, and the heap shifts. ${b10gPick(['"Hah. Yours."', '"Fingers like sausages," he says. "Used to be."'])}`); g.him = false; g.phase = 'pick'; AUDIO.play('miss'); redraw(); };
  /* the check: read the heap (Wits). Made: the free slivers catch the light this go. Yes, but: they do, and Thallo's next is sure. */
  const read = () => { if (g.used || g.over || g.phase !== 'pick') return; g.used = true; AUDIO.play('click');
    const r = g.check = b10gRoll('wits', B10G_DCT, null, [['he has picked fuses out of worse than this, in the dark', 2, 'tangle'], ['her hands stitch wounds by starlight', 1, 'mirrel'], ['he has unloaded wagons where one wrong sack brings the rest down', 1, 'pruss'], ['you have read a lot of rubble for what holds it up', 1, 'sgt']]);
    if (r.ok) { g.glint = true; g.talk = mgSay(r.who === 'tangle' ? 'Tangle' : '', r.who === 'tangle' ? `Tangle lies flat on his belly with his chin on his fists and looks along the heap, not down at it. "Those," he breathes, and does not point. <span class="dim">(the free ones catch the light this go)</span>` : `${b10gWho(r)} ${b10gV(r, 'look', 'looks')} along the heap from the side, low, the way light falls. <span class="dim">(the free ones catch the light this go)</span>`); }
    else if (r.tier === 'near') { g.glint = true; g.tsure = true; g.talk = mgSay('Thallo', 'He watches you look, and looks where you look. "Thanks," he says. <span class="dim">(the free ones catch the light; Thallo\'s next is sure)</span>'); }
    else g.talk = mgSay('', `${b10gWho(r)} ${b10gV(r, 'stare', 'stares')} at the heap until it swims. ${glassy ? 'The glare off the glass gets in under the cloaks.' : 'The dust gets in the eyes.'}`);
    redraw(); };
  const end = () => { if (g.over) return; g.over = true; g.phase = 'over'; const res = result(); mgDeed(res.won ? 'b10StrawsWon' : 'b10StrawsLost'); AUDIO.play(res.won ? 'win' : res.tie ? 'click' : 'lose');
    g.talk = mgSay('Thallo', res.won ? `"${res.mine} to my ${res.his}." He sweeps the slivers into his palm and holds them a moment. "Good hands. Keep them out of the sun."` : res.tie ? `"${res.mine} each." He sweeps them up. "No one's, then. Lie down. It's hours yet."` : `"${res.his} to your ${res.mine}." He sweeps them up into his palm. "Big hands are steady hands. People think it's the other way."`) +
      b10gSay({tangle:() => mgSay('Tangle', '"Seven was under four," Tangle whispers. "The whole time."'), pruss:() => mgSay('Pruss', '"We played it with straw in the wagon-yards," Pruss says. "Hence the name. Never knew why till now."'), _:() => mgSay('', 'Round the circle the squad lies still, saving water, saving breath.')}); redraw(); };
  mgKeys({r:() => read(), ' ':() => { const b = $('#swDone') || $('#swGo'); b && !b.disabled && b.click(); }});
  /* the shade under the cloaks: the glare outside, the cloaks on their spear-shafts, the heap on a cloak spread flat, the slivers drawn
     in their order (the higher, the brighter), each with its number */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now();
    const sk = ctx.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, glassy ? '#f0ece4' : '#e0d0b0'); sk.addColorStop(.3, glassy ? '#d8dce4' : '#c8b08a'); sk.addColorStop(.31, '#2a2a32'); sk.addColorStop(1, '#14141a'); ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 4; i++) { const x = W*(.1 + i*.27); ctx.fillStyle = '#3a2e22'; ctx.fillRect(x, H*.1, 2, H*.22); } poly(ctx, [[0, H*.1], [W, H*.08], [W, H*.18], [0, H*.2]], '#3a3a42'); // the cloaks, propped
    const bx = W*.2, by = H*.3, bw = W*.6, bh = H*.56; ctx.fillStyle = '#2a2420'; ctx.fillRect(bx, by, bw, bh); // a cloak spread flat
    g.st.forEach((s, i) => { if (s.gone) return; const k = i / B10G_STRAWS, lit = g.glint && free(i), x1 = bx + s.x1*bw, y1 = by + s.y1*bh, x2 = bx + s.x2*bw, y2 = by + s.y2*bh;
      ctx.strokeStyle = lit ? '#e8f4ff' : glassy ? `rgba(${120 + k*120},${140 + k*110},${170 + k*80},1)` : `rgba(${110 + k*110},${80 + k*80},${50 + k*50},1)`; ctx.lineWidth = lit ? 3.4 : 2.4; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      const mx = (x1 + x2)/2, my = (y1 + y2)/2; ctx.fillStyle = 'rgba(10,10,14,.7)'; ell(ctx, mx, my, 8, 7, 'rgba(10,10,14,.65)'); b5gText(ctx, String(i + 1), mx, my + 4, 11, lit ? '#e8f4ff' : 'rgba(232,192,115,.95)'); });
    ctx.lineWidth = 1;
    if (g.last && now - g.last.t < 700 && g.st[g.last.i]) { const s = g.st[g.last.i], k = (now - g.last.t)/700; ctx.strokeStyle = `rgba(${g.last.ok ? '159,208,232' : '232,160,112'},${(1 - k).toFixed(2)})`; ctx.beginPath(); ctx.arc(bx + (s.x1 + s.x2)/2*bw, by + (s.y1 + s.y2)/2*bh, 10 + k*20, 0, 7); ctx.stroke(); }
    const fs = clamp(H/110, 1.2, 2.6); drawFigure(ctx, 'b9_c1_thallo', W*.9, H*.92, fs, t, {still:true, dir:-1}); drawFigure(ctx, 'sgt', W*.1, H*.92, fs, t, {still:true, dir:1}); };
  g.talk = mgSay('', glassy ? 'Under the cloaks the light is blue and thin, and outside them the glass is too bright to look at. Thallo has knapped a handful of slivers off the glass with the back of his knife, long and thin as straws, and spread a cloak flat in the middle of the circle.' : 'In the strip of shade along the wagon the dust lies still. Thallo has split a dead wagon\'s spoke into splinters with his knife, long and thin as straws, and spread a cloak flat in the middle of the circle.') +
    mgSay('Thallo', '"Straws. Let them fall, take one that nothing lies across. Touch the wrong one and the heap moves, and it\'s mine." He does not say it is to stop the squad thinking about water. He does not need to.') +
    b10gSay({tangle:() => mgSay('', 'Tangle rolls over onto his belly to watch, which is the most he has moved since grey light.'), pruss:() => mgSay('', 'Pruss lies with his helm over his face and one eye showing under it.'), _:''});
  redraw();
}
function b10StrawsPay(r){ if (!r) return; S.f.b10_straws = {mine:r.mine, his:r.his, won:!!r.won, tie:!!r.tie, done:!!r.done};
  if (r.won) b10gRegard('b10_strawsPaid', 'Thallo\'s straws, under the cloaks');
  save(); }

/* ============ 4. Fists, at the horse-lines ============
   Orla, who drives a water-cart, plays the carters' game at dusk by the horse-lines (on the 'adjunct' road, a carter at the column's tail):
   each hides nought to three docks in a fist and calls the total of both fists. The one who calls it right takes the hand; both right, or
   neither, and nobody does. First to three hands. Orla calls her own and a guess at yours, and she watches what you hid before. Once a
   game, before a hand, read her knuckles (Guile; Tirren, who reads a horse before it shies, with an edge): made, you see what she holds
   this hand; "yes, but", you see hers and she sees yours. Won: Witness +1, once (something to laugh at by the horse-lines). */
const B10G_FISTS = 3;
function playB10Fists(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b10gSp());
  const adj = b104Adj(), who = adj ? 'The carter' : 'Orla', whoL = adj ? 'the carter' : 'Orla';
  const g = MG.state = {mine:0, hers:0, hand:0, phase:'intro', talk:'', check:null, used:false, see:false, seen:false, myHide:null, hide:0, oh:0, oc:0, hist:[], over:false, last:null};
  const result = () => ({mine:g.mine, hers:g.hers, won:g.over && g.mine > g.hers, done:g.over});
  mgOpen({kick:adj ? 'The column\'s tail · the horses on their picket' : 'The horse-lines · dusk', title:'Fists', leaveText:'Leave the game', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b10gOn();
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? 'The docks go back in the purse' : `Hand ${g.hand + 1}`}</span><span>You <b>${g.mine}</b> · ${whoL} <b>${g.hers}</b></span><span>First to ${B10G_FISTS}</span></div>
      ${g.talk}${b10gRollHTML(g.check)}${g.see && g.phase !== 'show' ? `<p class="fine">${who}'s fist: <b>${g.oh}</b>.</p>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="fsDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' ? `<button class="btn primary" id="fsGo" data-bot="1">Make a fist</button>`
        : g.phase === 'hide' ? `${[0, 1, 2, 3].map(n => `<button class="btn" data-fh="${n}" data-bot="1">Hide ${n}</button>`).join('')}${!g.used ? `<button class="btn" id="fsRead" data-bot="1">Read ${whoL === 'Orla' ? 'her' : 'the'} knuckles first (once)</button>` : ''}`
        : g.phase === 'call' ? `${Array.from({length:7}, (_, n) => `<button class="btn" data-fc="${n}" data-bot="1" ${n < g.myHide || n > g.myHide + 3 ? 'disabled' : ''}>Call ${n}</button>`).join('')}`
        : g.phase === 'show' ? `<button class="btn primary" id="fsNext" data-bot="1">Another hand</button>`
        : `<button class="btn" disabled data-bot="1">Fists open</button>`}</div>
      <p class="fine">Hide nought to three docks in your fist, then call the total of both fists. Whoever calls it right takes the hand; both right, or neither, and the hand is nobody's. First to three.</p>
      <p class="hint keys"><kbd>0</kbd>–<kbd>6</kbd> hide, then call · <kbd>K</kbd> knuckles · <kbd>Space</kbd> go on · <kbd>Esc</kbd> leave</p>`),
    bind = () => { document.querySelectorAll('#mgPanel [data-fh]').forEach(b => b.onclick = () => hide(+b.dataset.fh)); document.querySelectorAll('#mgPanel [data-fc]').forEach(b => b.onclick = () => callT(+b.dataset.fc));
      if ($('#fsGo')) $('#fsGo').onclick = () => deal(); if ($('#fsNext')) $('#fsNext').onclick = () => deal(); if ($('#fsRead')) $('#fsRead').onclick = () => read(); if ($('#fsDone')) $('#fsDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const deal = () => { if (g.over || !(g.phase === 'intro' || g.phase === 'show')) return; g.phase = 'hide'; g.see = false; g.seen = false; g.myHide = null; g.oh = g.forceHide != null ? g.forceHide : R(4); g.forceHide = null; g.last = null; AUDIO.play('click');
    g.talk = mgSay(who, g.hand ? b10gPick(['"Again."', `${whoL === 'Orla' ? 'She' : 'He'} shakes the fist by ${whoL === 'Orla' ? 'her' : 'his'} ear, though there is nothing to hear.`, '"Fists."']) : '"Fists, then. Make yours."'); redraw(); };
  const hide = n => { if (g.phase !== 'hide' || n < 0 || n > 3) return; g.myHide = n; g.phase = 'call'; AUDIO.play('click'); g.talk = mgSay('', `${numw(n, true)} in your fist. Now call the total.`); redraw(); };
  /* her call: her own, and a guess at yours from what you hid before (or yours outright, after a "yes, but") */
  const herCall = () => { const est = g.seen ? g.myHide : g.hist.length ? Math.round(g.hist.reduce((a, b) => a + b, 0) / g.hist.length + (Math.random() - .5)) : R(4); return g.oh + clamp(est, 0, 3); };
  const callT = c => { if (g.phase !== 'call' || c < g.myHide || c > g.myHide + 3) return; const oc = g.forceCall != null ? g.forceCall : herCall(); g.forceCall = null; const tot = g.myHide + g.oh, me = c === tot, her = oc === tot;
    g.hist.push(g.myHide); g.oc = oc; g.phase = 'show'; g.hand++; g.last = {t:performance.now(), me, her};
    if (me && !her) g.mine++; else if (her && !me) g.hers++;
    AUDIO.play(me && !her ? 'coin' : her && !me ? 'miss' : 'click');
    g.talk = mgSay('', `Fists open: ${numw(g.myHide)} and ${numw(g.oh)}, ${numw(tot)} in all. You called ${numw(c)}; ${whoL} called ${numw(oc)}. ${me && !her ? 'Yours.' : her && !me ? `${b10gCap(whoL)}'s.` : me ? 'Both right. The hand is no one\'s.' : 'Neither. The hand is no one\'s.'}`);
    if (g.mine >= B10G_FISTS || g.hers >= B10G_FISTS) { redraw(); return T(end, 900); } redraw(); };
  /* the check: read her knuckles (Guile). Made: you see hers. Yes, but: you see hers, and she sees yours. */
  const read = () => { if (g.used || g.over || g.phase !== 'hide') return; g.used = true; AUDIO.play('click');
    const r = g.check = b10gRoll('guile', B10G_DCL, null, [['she reads a horse before it shies; a carter is easier', 2, 'tirren'], ['an archer watches the hand, not the face', 1, 'kaedra'], ['he grew up playing it for nothing on the canal steps', 1, 'tobet'], ['you have played it for docks in every yard in Lether', 1, 'sgt']]);
    if (r.ok) { g.see = true; g.talk = mgSay(r.who === 'tirren' ? 'Tirren' : '', r.who === 'tirren' ? `Tirren watches the fist the way she watches a hoof. "${numw(g.oh, true)}," she says, under her breath. "The knuckles go white on three." <span class="dim">(you see what ${whoL} holds)</span>` : `${b10gWho(r)} ${b10gV(r, 'watch', 'watches')} the fist, not the face. <span class="dim">(you see what ${whoL} holds)</span>`); }
    else if (r.tier === 'near') { g.see = true; g.seen = true; g.talk = mgSay(who, `${whoL === 'Orla' ? 'She' : 'He'} sees you looking, and looks back, at yours, and grins. <span class="dim">(you see ${whoL === 'Orla' ? 'hers' : 'his'}; ${whoL === 'Orla' ? 'she' : 'he'} sees yours)</span>`); }
    else g.talk = mgSay('', `${b10gWho(r)} ${b10gV(r, 'watch', 'watches')} the fist. It is a fist. It gives nothing away.`);
    redraw(); };
  const end = () => { if (g.over) return; g.over = true; g.phase = 'over'; const W = g.mine > g.hers; mgDeed(W ? 'b10FistsWon' : 'b10FistsLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk = mgSay(who, W ? `"${g.mine} hands to ${g.hers}." ${whoL === 'Orla' ? 'She' : 'He'} laughs, a real one, and the horses on the picket put their ears up at it. "First laugh at these lines in a while. Thank you for that, at least."` : `"${g.hers} hands to ${g.mine}." ${whoL === 'Orla' ? 'She' : 'He'} pockets the docks, and then gives them back, because they are worth nothing out here. "Again tomorrow, if there's a tomorrow with horses in it."`) +
      b10gSay({tirren:() => mgSay('Tirren', '"The grey on the end was watching the whole time," Tirren says. "He likes a game."'), kaedra:() => mgSay('Kaedra', '"I would have called four," Kaedra says. She always says that.'), _:() => mgSay('', 'Behind the fire the horses shift on the picket, heads low, listening.')}); redraw(); };
  mgKeys({0:() => g.phase === 'hide' ? hide(0) : callT(0), 1:() => g.phase === 'hide' ? hide(1) : callT(1), 2:() => g.phase === 'hide' ? hide(2) : callT(2), 3:() => g.phase === 'hide' ? hide(3) : callT(3), 4:() => callT(4), 5:() => callT(5), 6:() => callT(6), k:() => read(), ' ':() => { const b = $('#fsDone') || $('#fsGo') || $('#fsNext'); b && !b.disabled && b.click(); }});
  /* dusk at the horse-lines: the picket of horses, heads down; the fire; the two fists, open on a show */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now();
    b6gNight(ctx, W, H, t, adj ? {top:'#070a10', mid:'#2a3a52', cut:.5, low:'#121820', seed:10401} : {top:'#1a1620', mid:'#7a4a34', cut:.48, low:'#2a2016', seed:10401});
    ctx.strokeStyle = '#3a2a1a'; ctx.beginPath(); ctx.moveTo(0, H*.5); ctx.lineTo(W, H*.5); ctx.stroke(); for (let i = 0; i < 6; i++) B4VB.horse(ctx, W*(.08 + i*.17), H*.56, .55, i === 5 ? '#8a8a8a' : '#4a3a2a', t, i, 1); // the picket
    if (!adj) b7gFire(ctx, W*.5, H*.7, t, H);
    const fist = (x, n, open, mine) => { ell(ctx, x, H*.74, 16, 12, mine ? '#b08a6a' : '#a07a5a'); if (open) { for (let i = 0; i < n; i++) ell(ctx, x - 8 + i*6, H*.72, 3.2, 2.2, '#c8a44a'); b5gText(ctx, String(n), x, H*.66, 16); } };
    const open = g.phase === 'show' || g.over; fist(W*.36, g.myHide || 0, open, true); fist(W*.64, g.oh, open || (g.see && g.phase !== 'intro'), false);
    if (g.last && now - g.last.t < 900) { const k = (now - g.last.t)/900; ctx.strokeStyle = `rgba(${g.last.me && !g.last.her ? '159,208,232' : g.last.her && !g.last.me ? '232,160,112' : '200,200,200'},${(1 - k).toFixed(2)})`; ctx.beginPath(); ctx.arc(W*.5, H*.74, 30 + k*30, 0, 7); ctx.stroke(); }
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, adj ? 'b5_letherii' : 'b9_c2_orla', W*.84, H*.92, fs, t, {still:g.phase !== 'show', dir:-1}); drawFigure(ctx, 'sgt', W*.16, H*.92, fs, t, {still:g.phase !== 'call', dir:1});
    const mate = ['tirren', 'kaedra', 'tobet'].find(k => b10In(k)); if (mate) drawFigure(ctx, mate, W*.04, H*.88, fs*.9, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', adj ? 'At the column\'s tail, where the last horses stand on their picket with their heads down, a carter from the train sits on his heels with a purse of docks and nothing to spend them on.' : 'At the horse-lines, with the light going, Orla comes over from her water-cart with a purse of docks and nothing to spend them on, and sits on her heels by the squad\'s fire.') +
    mgSay(who, '"Fists. You know it. Every yard in Lether knows it. Nought to three in the hand, call the lot. First to three hands." A dock goes from knuckle to knuckle. "It passes the dusk."') +
    b10gSay({tirren:() => mgSay('', 'Tirren comes back from the picket and sits where she can see both fists and the horses.'), brennet:() => mgSay('', 'Brennet knows the game, and says so, and is told to keep quiet.'), _:''});
  redraw();
}
function b10FistsPay(r){ if (!r) return; S.f.b10_fists = {mine:r.mine, hers:r.hers, won:!!r.won, done:!!r.done};
  if (r.won) b10gWit('b10_fistsPaid', 'a game at the horse-lines');
  save(); }

/* ============ 5. Coins on the Shield, behind the line ============
   The night before, at the next fire, a regular of the company the Third is lent to (on 'south', a Letherii spearman of the brigades) lays
   a shield flat on the dirt, chalks rings on it and plays the old game: shove a coin across from the near rim with the heel of the hand.
   Short of the first ring, nothing; the outer ring one; the inner two; the boss three; off the far rim, nothing. Five coins each; most
   wins; level is nobody's. The push grows and falls back; let it go when it is right. Once a game, before a coin, read the shield (Wits;
   Haddat, who knows a shield's face better than her own, with an edge): made, the push comes slower next coin; "yes, but", slower, and the
   regular takes the same line and his next coin sits on the boss. Won: Witness +1, once (the regulars will remember the Third). */
const B10G_COINS = 5, B10G_BANDS = [[.36, 0], [.58, 1], [.76, 2], [.9, 3], [9, 0]];
const b10gBand = d => { for (const [lim, p] of B10G_BANDS) if (d < lim) return p; return 0; };
function playB10Shield(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b10gSp());
  const sth = b107South(), who = sth ? 'The spearman' : 'The regular', whoL = sth ? 'the spearman' : 'the regular';
  const g = MG.state = {k:0, hk:0, mine:0, his:0, phase:'intro', talk:'', check:null, used:false, slow:false, sure:false, t0:0, coins:[], over:false, last:null, force:null};
  const result = () => ({mine:g.mine, his:g.his, won:g.over && g.mine > g.his, tie:g.over && g.mine === g.his, done:g.over});
  mgOpen({kick:sth ? 'The brigades\' camp · the night before' : 'Behind the line · the night before', title:'Coins on the Shield', leaveText:'Leave the shield', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b10gOn();
  const push = () => { const p = (performance.now() - g.t0) / (1400 * (g.slow ? 2 : 1) * Math.max(.6, b10gSp())); return .55 - .55*Math.cos(p * Math.PI); }; // 0..1.1, back and forth
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? 'The coins go back in the purse' : g.phase === 'him' ? `${who}'s coin ${Math.min(g.hk + 1, B10G_COINS)} of ${B10G_COINS}` : `Your coin ${Math.min(g.k + 1, B10G_COINS)} of ${B10G_COINS}`}</span><span>You <b>${g.mine}</b> · ${whoL} <b>${g.his}</b></span></div>
      ${g.talk}${b10gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="shDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' || g.phase === 'ready' ? `<button class="btn primary" id="shUp" data-bot="1">Set a coin on the rim</button>${!g.used ? `<button class="btn" id="shRead" data-bot="1">Read the shield first (once)</button>` : ''}`
        : g.phase === 'push' ? `<button class="btn primary" id="shGo" data-bot="1">Shove</button>`
        : `<button class="btn" disabled data-bot="1">${g.phase === 'him' ? `${who} shoves` : 'The coin slides'}</button>`}</div>
      <p class="fine">The push grows and falls back. Shove when it is right. Short of the first ring, nothing; the outer ring one; the inner two; the boss three; off the far rim, nothing. Five coins each; most takes it.</p>
      <p class="hint keys"><kbd>Space</kbd> set / shove · <kbd>R</kbd> read the shield · <kbd>Esc</kbd> leave</p>`),
    bind = () => { if ($('#shUp')) $('#shUp').onclick = () => up(); if ($('#shRead')) $('#shRead').onclick = () => read(); if ($('#shGo')) $('#shGo').onclick = () => go();
      if ($('#shDone')) $('#shDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const up = () => { if (g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; g.phase = 'push'; g.t0 = performance.now(); AUDIO.play('click'); g.talk = mgSay('', 'A coin on the near rim, the heel of your hand behind it.'); redraw(); };
  const go = () => { if (g.phase !== 'push') return; const d = g.force != null ? g.force : push(); g.force = null; g.slow = false; const p = b10gBand(d); g.mine += p; g.coins.push({d, mine:true}); g.k++; g.last = {p, t:performance.now()};
    AUDIO.play(p ? 'coin' : 'miss'); g.talk = mgSay('', p === 3 ? 'It slides, slows, and stops on the boss. Three.' : p === 2 ? 'Into the inner ring. Two.' : p === 1 ? 'The outer ring. One.' : d >= .9 ? 'Off the far rim and into the dirt.' : 'Short. It stops on the bare rim.');
    if (g.k >= B10G_COINS) { g.phase = 'him'; redraw(); return T(him, 900); } g.phase = 'ready'; redraw(); };
  /* the regular: a good hand, not a sure one; his next sits on the boss after a "yes, but" */
  const him = () => { if (g.over || g.phase !== 'him') return; if (g.hk >= B10G_COINS) return end();
    const d = g.sure ? .84 : clamp(.72 + (Math.random() - .5)*.5, 0, 1.1); g.sure = false; const p = b10gBand(d); g.his += p; g.hk++; g.coins.push({d, mine:false}); g.last = {p, t:performance.now(), him:true}; AUDIO.play(p ? 'coin' : 'miss');
    g.talk = mgSay(who, `${p === 3 ? 'The boss. Three.' : p === 2 ? 'The inner ring. Two.' : p === 1 ? 'The outer ring. One.' : 'Off the rim.'} ${b10gPick(['"Hm."', 'He blows on his hand.', '"Still got it, some."'])}`); redraw(); T(him, 800); };
  /* the check: read the shield (Wits). Made: the push comes slower next coin. Yes, but: slower, and his next sits on the boss. */
  const read = () => { if (g.used || g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; g.used = true; AUDIO.play('click');
    const r = g.check = b10gRoll('wits', B10G_DCT, null, [['she knows a shield\'s face better than her own', 2, 'haddat'], ['she reads ground for where it slopes, and a shield is ground', 1, 'tegra'], ['he knows a load by how it slides', 1, 'pruss'], ['you have eaten off a lot of shields', 1, 'sgt']]);
    if (r.ok) { g.slow = true; g.talk = mgSay(r.who === 'haddat' ? 'Haddat' : '', r.who === 'haddat' ? 'Haddat runs her palm over the face of the shield, rim to boss, once. "It dips left of the boss," she says. "Old dent. Push right of it." <span class="dim">(the push comes slower next coin)</span>' : `${b10gWho(r)} ${b10gV(r, 'run', 'runs')} a palm over the shield's face and ${b10gV(r, 'find', 'finds')} the old dent. <span class="dim">(the push comes slower next coin)</span>`); }
    else if (r.tier === 'near') { g.slow = true; g.sure = true; g.talk = mgSay(who, `"Dent, left of the boss," ${whoL} says, watching you find it. "I know. It's my shield." <span class="dim">(slower next coin; ${whoL}'s next sits on the boss)</span>`); }
    else g.talk = mgSay('', `${b10gWho(r)} ${b10gV(r, 'look', 'looks')} at the shield a while. It is a shield.`);
    redraw(); };
  const end = () => { if (g.over) return; g.over = true; g.phase = 'over'; const res = result(); mgDeed(res.won ? 'b10ShieldWon' : 'b10ShieldLost'); AUDIO.play(res.won ? 'win' : res.tie ? 'click' : 'lose');
    g.talk = mgSay(who, res.won ? `"${res.mine} to my ${res.his}." He picks the coins off the shield one at a time. "I'll tell them at my fire. The file-closers can shove." He looks at the dark where the ridge is. "There ought to be something good to remember about tonight."` : res.tie ? `"${res.mine} each. No one's." He wipes the chalk off with his sleeve. "Suits tonight."` : `"${res.his} to your ${res.mine}." He picks the coins up. "Since the day it was issued I've played on this shield. Be a shame to lose tonight of all nights."`) +
      b10gSay({haddat:() => mgSay('Haddat', '"Good shield," Haddat says. "Keep it up tomorrow, not flat."'), pruss:() => mgSay('Pruss', '"My old squad would have liked this one," Pruss says, and says their names, all six, quietly, the way he does now.'), _:() => mgSay('', 'Along the fields the regulars\' fires go down one by one, and the ridge\'s fires do not.')}); redraw(); };
  mgKeys({r:() => read(), ' ':() => { const b = $('#shDone') || $('#shUp') || $('#shGo'); b && !b.disabled && b.click(); }});
  /* the first fields at night: the rows of fires, the ridge's fires beyond (the city and the tower on 'south'), the shield flat on the
     dirt with its chalk rings, the coins where they stopped, the push as a bar */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now();
    b6gNight(ctx, W, H, t, {top:'#070a10', mid:'#2a2a3a', cut:.38, low:'#1a140e', seed:10701});
    if (sth) { ctx.fillStyle = '#0e0c10'; ctx.fillRect(W*.6, H*.26, W*.3, H*.12); ctx.fillRect(W*.82, H*.06, 5, H*.32); } else { ctx.fillStyle = '#0c0a10'; ctx.beginPath(); ctx.moveTo(0, H*.32); ctx.quadraticCurveTo(W*.5, H*.22, W, H*.34); ctx.lineTo(W, H*.38); ctx.lineTo(0, H*.38); ctx.fill(); for (let i = 0; i < 14; i++) glow(ctx, W*(.04 + i*.07), H*(.3 + hash(i, 10702)*.04), 4, '#ff8a3a', .5); }
    for (let i = 0; i < 6; i++) glow(ctx, W*(.08 + i*.18), H*.44, 6, '#e8923a', .35); b7gFire(ctx, W*.1, H*.62, t, H);
    const cx = W*.55, cy = H*.66, rx = Math.min(W*.3, H*.42), ry = rx*.42; // the shield, flat, seen low: its long axis across
    ell(ctx, cx, cy, rx, ry, '#5a4630'); ctx.strokeStyle = '#8a7a50'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 7); ctx.stroke(); ctx.lineWidth = 1;
    const xAt = d => cx - rx + d*2*rx*.86; ctx.strokeStyle = 'rgba(236,232,220,.5)'; [[.36, .58], [.58, .76], [.76, .9]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(xAt(a), cy - ry*.8); ctx.lineTo(xAt(a), cy + ry*.8); ctx.stroke(); });
    ell(ctx, xAt(.83), cy, 10, 7, '#9aa0a8');
    g.coins.forEach((c, i) => { const x = c.d >= .9 ? xAt(.97) + 6 : xAt(c.d), y = cy + (hash(i, 10703) - .5)*ry*.8; ell(ctx, x, y, 4, 2.4, c.mine ? '#e0e4ea' : '#c8a44a'); });
    if (g.phase === 'push') { const p = push(), x = xAt(Math.min(p, 1.1)); ctx.fillStyle = 'rgba(159,208,232,.5)'; ctx.fillRect(xAt(0), cy + ry + 6, x - xAt(0), 6); ell(ctx, xAt(0), cy, 4, 2.4, '#e0e4ea'); }
    if (g.last && now - g.last.t < 700) { const k = (now - g.last.t)/700; ctx.strokeStyle = `rgba(${g.last.p ? '159,208,232' : '232,160,112'},${(1 - k).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(cx, cy, rx*(.2 + k*.3), ry*(.2 + k*.3), 0, 0, 7); ctx.stroke(); }
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, sth ? 'b5_letherii' : 'b2soldier', W*.92, H*.92, fs, t, {still:g.phase !== 'him', dir:-1}); drawFigure(ctx, 'sgt', W*.22, H*.92, fs, t, {still:g.phase !== 'push', dir:1});
    const mate = ['haddat', 'pruss', 'tegra', 'marrow'].find(k => b10In(k)); if (mate) drawFigure(ctx, mate, W*.06, H*.88, fs*.9, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', sth ? 'At the next fire a Letherii spearman of the brigades lays his shield flat on the dirt, face up, and chalks three rings on it round the boss with a stub of chalk from the clerks.' : 'At the next fire a regular of the company the Third is lent to lays his shield flat on the dirt, face up, and chalks three rings on it round the boss.') +
    mgSay(who, '"Coins on the Shield. From the near rim, heel of the hand. Outer ring one, inner two, the boss three, off the far side nothing. Five each." He sets the coins out in a row. "No one sleeps the night before. Might as well."') +
    b10gSay({haddat:() => mgSay('', 'Haddat looks at the shield the way she looks at every shield, as something that will be asked a question tomorrow.'), pruss:() => mgSay('', 'Pruss sits at the back of the fire, where carters sit, and watches.'), _:''});
  redraw();
}
function b10ShieldPay(r){ if (!r) return; S.f.b10_shield = {mine:r.mine, his:r.his, won:!!r.won, tie:!!r.tie, done:!!r.done};
  if (r.won) b10gWit('b10_shieldPaid', 'the regulars will remember');
  save(); }

/* ---- the Deeds page: Book Ten's fires, under Witness (guarded to Book Ten's saves: b10DeedsExtra is only asked for them) ---- */
{ const _de = b10DeedsExtra; b10DeedsExtra = function(mine){ const out = _de(mine), d = k => mine.reduce((a, {s}) => a + (((s.deeds || {})[k]) || 0), 0);
    const rows = [['The Corporal\'s Ladder', d('b10LadderWon') ? 'The top rungs' : d('b10LadderLost') ? 'Thallo\'s ladder' : 'Not yet'],
      ['Yelt\'s Measures', d('b10MeasWon') ? 'Exactly, twice' : d('b10MeasLost') ? 'Close is a word for quartermasters' : 'Not yet'],
      ['Straws', d('b10StrawsWon') ? 'Steady hands, under the cloaks' : d('b10StrawsLost') ? 'Thallo\'s big hands' : 'Not yet'],
      ['Fists', d('b10FistsWon') ? 'A laugh at the horse-lines' : d('b10FistsLost') ? 'The carters\' game' : 'Not yet'],
      ['Coins on the Shield', d('b10ShieldWon') ? 'The night before, remembered' : d('b10ShieldLost') ? 'His shield, his game' : 'Not yet']];
    return out + `<h4 class="jh">At the fires</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }; }

/* ---- the chapters' fires: the games offered beside the squad's talk, and what they leave behind ---- */
{ const wrap = (CH, id, f) => { const _n = CH.dlg[id]; if (!_n) return; CH.dlg[id] = () => { const n = _n(); return f(n) || n; }; };
  const after = (n, t, ch) => { if (!n || !Array.isArray(n.ch)) return n; const i = n.ch.findIndex(c => typeof c.t === 'string' && new RegExp(t).test(c.t)); if (i < 0) return n; n.ch = n.ch.slice(); n.ch.splice(i + 1, 0, ...ch); return n; };
  const jn = (CH, fn) => { const j = CH.journal; if (j) CH.journal = () => { const x = j(), l = fn(); if (l) x.unshift(l); return x; }; };
  /* Ch1 (the Third): the Corporal's Ladder by day and on the first night (phases 1 and 2); not late, after the key */
  if (typeof B10CH1 !== 'undefined') { wrap(B10CH1, 'b10_c1_fire', n => after(n, '^Talk with the squad', [{t:'Thallo has a soldier\'s pack of cards and nobody to play. The Corporal\'s Ladder.', tag:'The Corporal\'s Ladder', req:()=>b101Ph() <= 2 && !(S.f.b10_ladder && S.f.b10_ladder.done), go:()=>playB10Ladder({after:r => { b10LadderPay(r); S.f.b10_ladderLast = r; talk('b10_c1_ladder_after'); }})}]));
    B10CH1.dlg.b10_c1_ladder_after = () => { const r = S.f.b10_ladderLast || {}; return b10gAfter('The Third\'s fire', b101Night() ? 'b10_camp_night' : 'b10_camp', 'b10_c1_fire', !r.done ?
`You give Thallo back his cards. He does not mind. He deals himself a climb, and calls it, and gets to three, and puts the pack away inside his shirt again.` : r.won ?
`${numw(r.mine, true)} rungs to his ${numw(r.his)}. Thallo puts the pack away and goes to the wounded tent with his ration in his hand, as he does. ${b10gPaidLine('b10_ladderPaid', 'sits a little nearer the sergeant at the fire after, and says nothing about why, and does not need to.') || 'The Third watches him go.'}` :
`${r.tie ? `${numw(r.mine, true)} rungs each. No one's.` : `Thallo's, ${numw(r.his)} rungs to ${numw(r.mine)}.`} ${b10In('tangle') ? 'Tangle explains the twelves on the walk to the latrine trench, twice, until the squad would rather have lost again.' : 'Across the camp the clerks are still at their lists by lamplight.'}`); };
    jn(B10CH1, () => { const r = S.f.b10_ladderLast; return r && r.done ? (r.won ? 'In the camp after the short-tails, Thallo dealt the Corporal\'s Ladder at the Third\'s fire, and the sergeant climbed higher.' : 'In the camp after the short-tails, Thallo dealt the Corporal\'s Ladder at the Third\'s fire. The ladder stayed his.') : ''; }); }
  /* Ch2 (the Letherii): Yelt's Measures on the rise by day (phase 1, both roads), and at the halt that night with the brigades (phase 3,
     'escort' only: on 'adjunct' Yelt went south) */
  if (typeof B10CH2 !== 'undefined') { wrap(B10CH2, 'b10_c2_fire', n => after(n, '^Talk with the squad', [{t:'Yelt has a skin, a jug and a barrel set out on a tailboard, and a clerk\'s test. Yelt\'s Measures.', tag:'Yelt\'s Measures', req:()=>{ const ph = b102Ph(); return (ph === 1 || (ph === 3 && !b102Adj())) && !(S.f.b10_meas && S.f.b10_meas.done); }, go:()=>playB10Measures({after:r => { b10MeasPay(r); S.f.b10_measLast = r; talk('b10_c2_meas_after'); }})}]));
    B10CH2.dlg.b10_c2_meas_after = () => { const r = S.f.b10_measLast || {}, night = b102Ph() >= 3; return b10gAfter('The squad\'s fire', night ? 'b10_c2_halt' : 'b10_train', 'b10_c2_fire', !r.done ?
`You leave Yelt his skins. He does not mind. He measures the three out himself, in the fewest pours, without looking, and writes each one down.` : r.won ?
`${numw(r.mine, true)} measures of three, exactly. Yelt writes the squad's name in the ration book under the line for the water wagons, in the honest column, where he keeps the names he trusts with a barrel. ${b10gPaidLine('b10_measPaid', 'reads it over his shoulder and looks at the sergeant differently after.') || 'The squad does not know what it is worth. Yelt does.'}` :
`${numw(r.mine, true)} of three. Yelt shuts the book. ${b10In('perrit') ? 'Perrit works the third one out in the dust after, and rubs it out, and works it again.' : 'Along the train the carters are counting barrels by lamplight, every one of them twice.'}`); };
    jn(B10CH2, () => { const r = S.f.b10_measLast; return r && r.done ? (r.won ? 'At the train Yelt set the sergeant his clerk\'s test with a skin and a jug, and the measures came out exact.' : 'At the train Yelt set the sergeant his clerk\'s test with a skin and a jug. Close is a word for quartermasters.') : ''; }); }
  /* Ch3 (the Third): Straws in the circle under the cloaks, at both lie-ups by day (phases 1 and 4); never on the march by night */
  if (typeof B10CH3 !== 'undefined') { wrap(B10CH3, 'b10_c3_fire', n => after(n, '^Talk with the squad', [{t:b103South() ? 'Thallo has split a dead spoke into splinters, and spread a cloak flat in the shade. Straws.' : 'Thallo has knapped slivers off the glass, and spread a cloak flat under the cloaks. Straws.', tag:'Straws', req:()=>{ const ph = b103Ph(); return !b103Night() && (ph === 1 || ph >= 4) && !(S.f.b10_straws && S.f.b10_straws.done); }, go:()=>playB10Straws({after:r => { b10StrawsPay(r); S.f.b10_strawsLast = r; talk('b10_c3_straws_after'); }})}]));
    B10CH3.dlg.b10_c3_straws_after = () => { const r = S.f.b10_strawsLast || {}; return b10gAfter('The Third\'s circle', b103Scene(false), 'b10_c3_fire', !r.done ?
`You leave Thallo his heap. He does not mind. He lies on his side and takes them one at a time, alone, very slowly, until the shade moves and he has to move with it.` : r.won ?
`${numw(r.mine, true)} to his ${numw(r.his)}. Thallo sweeps the ${b103South() ? 'splinters' : 'slivers'} into a fold of his cloak to keep. ${b10gPaidLine('b10_strawsPaid', 'lies a little closer in the circle after, shoulder to shoulder, and sleeps for once.') || 'For an hour the Third did not think about water. That was the game.'}` :
`${r.tie ? `${numw(r.mine, true)} each. No one's.` : `Thallo's, ${numw(r.his)} to ${numw(r.mine)}.`} He keeps the ${b103South() ? 'splinters' : 'slivers'} anyway. For an hour the Third did not think about water, and that was the game.`); };
    jn(B10CH3, () => { const r = S.f.b10_strawsLast; return r && r.done ? (r.won ? 'At a lie-up, under the cloaks, Thallo played the sergeant at Straws, and the sergeant\'s hands were steadier.' : 'At a lie-up, under the cloaks, Thallo played the sergeant at Straws. His big hands were steadier.') : ''; }); }
  /* Ch4 (the Letherii): Fists at the horse-lines, at dusk (phase 1) and after the key (phase 3); no fire on the march (phase 2) */
  if (typeof B10CH4 !== 'undefined') { wrap(B10CH4, 'b10_c4_fire', n => after(n, '^Talk with the squad', [{t:b104Adj() ? 'A carter at the column\'s tail has a purse of docks and nothing to spend them on. Fists.' : 'Orla has come over from her water-cart with a purse of docks and nothing to spend them on. Fists.', tag:'Fists', req:()=>{ const ph = b104Ph(); return ph !== 2 && !(S.f.b10_fists && S.f.b10_fists.done); }, go:()=>playB10Fists({after:r => { b10FistsPay(r); S.f.b10_fistsLast = r; talk('b10_c4_fists_after'); }})}]));
    B10CH4.dlg.b10_c4_fists_after = () => { const r = S.f.b10_fistsLast || {}, adj = b104Adj(); return b10gAfter(adj ? 'The Sixth\'s circle' : 'The squad\'s fire', b104Ph() >= 3 ? b104Scene3() : 'b10_c4_dusk', 'b10_c4_fire', !r.done ?
`You open your fist and give it up. ${adj ? 'The carter' : 'Orla'} does not mind. ${adj ? 'He' : 'She'} plays against ${adj ? 'himself' : 'herself'} a while, one fist against the other, and the other fist wins.` : r.won ?
`${numw(r.mine, true)} hands to ${numw(r.hers)}, and ${adj ? 'the carter' : 'Orla'} laughing, out loud, at the horse-lines, where nobody has laughed since the river. ${b10In('tirren') ? 'Tirren says the horses liked it. She says it as a fact, the way she says everything about horses.' : 'The horses on the picket put their ears up at it, and leave them up a while.'}` :
`${adj ? 'The carter\'s' : 'Orla\'s'}, ${numw(r.hers)} hands to ${numw(r.mine)}. ${adj ? 'He' : 'She'} gives the docks back; they are worth nothing out here. Behind the fire the horses shift on the picket and settle.`); };
    jn(B10CH4, () => { const r = S.f.b10_fistsLast; return r && r.done ? (r.won ? `At the horse-lines ${b10LRoad() === 'adjunct' ? 'a carter' : 'Orla of the water-carts'} played the sergeant at Fists, and lost, and laughed.` : `At the horse-lines ${b10LRoad() === 'adjunct' ? 'a carter' : 'Orla of the water-carts'} played the sergeant at Fists, and won.`) : ''; }); }
  /* Ch7 (the Third): Coins on the Shield the night before (phase 1); not on the line, and not at the barrows */
  if (typeof B10CH7 !== 'undefined') { wrap(B10CH7, 'b10_c7_fire', n => after(n, '^Talk with the squad', [{t:b107South() ? 'At the next fire a spearman has laid his shield flat and chalked rings on it. Coins on the Shield.' : 'At the next fire a regular has laid his shield flat and chalked rings on it. Coins on the Shield.', tag:'Coins on the Shield', req:()=>b107Ph() === 1 && !(S.f.b10_shield && S.f.b10_shield.done), go:()=>playB10Shield({after:r => { b10ShieldPay(r); S.f.b10_shieldLast = r; talk('b10_c7_shield_after'); }})}]));
    B10CH7.dlg.b10_c7_shield_after = () => { const r = S.f.b10_shieldLast || {}, sth = b107South(); return b10gAfter('The squad\'s fire', 'b10_c7_eve', 'b10_c7_fire', !r.done ?
`You give the ${sth ? 'spearman' : 'regular'} back his coins. He does not mind. He shoves a few on his own, and stops, and takes the chalk off the shield with his sleeve, and sits with it on his knees.` : r.won ?
`${numw(r.mine, true)} to his ${numw(r.his)}. He takes the story back to his own fire, and the Third hears it told there, a little bigger than it was: the file-closers who could shove. ${b10In('haddat') ? 'Haddat takes the shield-face game as a good sign. She does not say so. She checks her own straps twice.' : 'It is a small thing to be remembered for. The Third will take it.'}` :
`${r.tie ? `${numw(r.mine, true)} each. No one's.` : `His, ${numw(r.his)} to ${numw(r.mine)}.`} He wipes the chalk off with his sleeve and takes his shield back to his own fire. Along the fields the fires go down, and the ridge's fires do not.`); };
    jn(B10CH7, () => { const r = S.f.b10_shieldLast; return r && r.done ? (r.won ? 'The night before, at the next fire, the sergeant played Coins on the Shield, and won, and the regulars told it after.' : 'The night before, at the next fire, the sergeant played Coins on the Shield, and lost to the shield\'s owner.') : ''; }); }
}
