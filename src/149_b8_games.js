/* ============ Book Eight: the games at the fires (v11.0) ============ */
/* Book Eight keeps its games here and wraps the chapters' fire nodes from this file, as Books Six and Seven do (109, 129), so the chapter
   files 141-147 are untouched. Five games, one at each place the book's people gather (plan, Claude's calls; docs/tth-games-notes.md):
   - Orsa's Cup (Ch1, b8_c1_fire): a single die in Orsa's cup in her Gadrobi dice den. Throw and add, bank when you like; a one loses the
     round. First to twenty. Silver, because a dice den is where money is the scene. Net capped at 8.
   - The Last Peg (Ch2, b8_c2_fire): fifteen pegs on a wagon's tailboard at the caravan's fire; take one to three; whoever takes the last
     peg stands the carters' dog watch. Best of three. The carter's watch-money: 2 silver.
   - Lamp and Stone (Ch3, b8_c3_fire): the game the Andii play in the dark, taught by Thessaly at the lodging. The lamp is unshuttered for
     a breath over a cloth of sixteen squares; then dark; touch where the stones lie. Tuft's regard, or Edrem's, or a salve.
   - Keep the Fire (Ch4, b8_c4_fire): with Hurrin and the pilgrims at the camp's edge, feed a small fire against the dark until the bells
     say morning. Edrem's regard, or a salve.
   - Stones on the Water (Ch7, b8_c7_fire): the night after, on the shingle, with Benlo. Three stones each across the lake; most skips.
     The regard of whichever squadmate needed the evening most, or a salve.
   Each is declinable (the fire's own choices stay), played once a book, pays once as the table closes, and keeps its deeds on S.deeds.
   None moves the Contract: its moves are fixed by the brief's table. They use the tables' frame (36), the in-game check (89: b5gRoll and
   its tiers), Book Six's night sky (109: b6gNight), and Book Seven's fire and die (129: b7gFire, b7gDie). */

const b8gOn = () => b5gOn(), b8gPick = a => b5gPick(a), b8gRoll = (s, dc, who, e) => b5gRoll(s, dc, who, e), b8gRollHTML = r => b5gRollHTML(r);
const b8gText = (...a) => b5gText(...a);
const B8G_SHE = ['brisk', 'kettle', 'tuft', 'sohra', 'greysword', 'ellis', 'ressa'];
const b8gHe = id => id === 'sgt' ? 'you' : B8G_SHE.includes(id) ? 'she' : 'he';
const b8gHim = id => id === 'sgt' ? 'you' : B8G_SHE.includes(id) ? 'her' : 'him';
const b8gWho = r => r.who === 'sgt' ? 'You' : NAME(r.who);
const b8gV = (r, you, they) => r.who === 'sgt' ? you : they;
const b8gSp = () => Math.max(.4, SET.speed || 1);
const B8G_DC = 15; // the games' own checks: at levels 16 to 19 a 13 is no check at all (Claude's call)
const b8gAfter = (sp, scene, back, txt) => ({sp, scene, txt, ch:[{t:'Back to the fire.', go:back}]});
/* a squadmate's line, the first who walks, else the default */
const b8gSay = (m) => { for (const k of Object.keys(m)) if (k !== '_' && b8In(k)) return typeof m[k] === 'function' ? m[k]() : m[k]; return m._ || ''; };
/* regard: +1 to the first named squadmate who walks, else a salve; returns who, or 'salve' */
function b8gRegard(ids, salveWhy){ const id = ids.find(k => b8In(k) && S.loy && S.loy[k] != null);
  if (id) { loy(id, 1); return id; } S.inv.salve = (S.inv.salve || 0) + 1; note('+1 salve: ' + salveWhy, 'good'); return 'salve'; }

/* ============ 1. Orsa's Cup, in the dice den ============
   Down the steps under the cobbler's, Orsa keeps her den. Her house game is one die in a leather cup. On your turn you throw as often as
   you like, adding up the throws; bank the round whenever you like. A one, and the round's count is gone and the cup goes across. First to
   twenty banked takes the stake. Once a game, when a one comes up, you may say the die hit the wall (Guile; Kettle, who counts dice as
   they fall, with an edge): made, it is thrown again; "yes, but", thrown again, and Orsa takes a silver for the house. Silver, net capped
   at 8 over the book, paid as the cup is put away; played once. Leaving with the stake down loses it. */
const B8G_CUPCAP = 8, B8G_CUPWIN = 20;
function playB8Cup(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b8gSp());
  const g = MG.state = {me:0, opp:0, run:0, die:0, who:'me', phase:'stake', stake:null, net:0, talk:'', check:null, argued:false, roll:0, paid:false, won:null};
  const capLeft = () => Math.max(0, B8G_CUPCAP - (S.f.b8_cupNet || 0));
  const result = () => ({net:g.net, stake:g.stake, won:g.won, me:g.me, opp:g.opp, pay:g.pay || 0, done:g.phase === 'over'});
  const settle = () => { if (g.paid) return; g.paid = true; const pay = g.net > 0 ? Math.min(g.net, capLeft()) : Math.max(g.net, -(S.silver || 0));
    S.silver = (S.silver || 0) + pay; updSilver(); g.pay = pay; if (pay > 0) S.f.b8_cupNet = (S.f.b8_cupNet || 0) + pay; };
  const live = () => ['me', 'opp', 'call'].includes(g.phase);
  mgOpen({kick:'The Gadrobi lanes · Orsa\'s den', title:'Orsa\'s Cup', leaveText:'Leave the table', done:r => opt.after && opt.after(r),
    leave:() => { if (g.stake && live()) { g.net -= g.stake; g.won = false; g.phase = 'over'; mgDeed('b8CupLost'); } settle(); mgClose(Object.assign(result(), {left:true})); }}); on = b8gOn();
  const say = (who, line) => { g.talk = mgSay(who, line); draw(); };
  const draw = () => { if (g.phase === 'stake') return stakePick();
    mgPanel(`<div class="cpbar"><span>Orsa <b>${g.opp}</b></span><span>You <b>${g.me}</b></span><span>${g.phase === 'over' ? `Stake ${g.stake}` : `This round <b>${g.run}</b>`}</span></div>
      ${g.talk}${b8gRollHTML(g.check)}
      ${g.phase === 'over' ? `<div class="row mgbtns"><button class="btn primary" id="cuDone" data-bot="1">Back to the fire</button></div>`
      : g.phase === 'call' ? `<div class="row mgbtns"><button class="btn on" id="cuCall" data-bot="1">That die hit the wall</button><button class="btn" id="cuLet" data-bot="1">Let it go</button></div>`
      : `<div class="row mgbtns"><button class="btn primary" id="cuThrow" data-bot="1" ${g.phase === 'me' && !g.roll ? '' : 'disabled'}>Throw</button><button class="btn" id="cuBank" data-bot="1" ${g.phase === 'me' && !g.roll && g.run ? '' : 'disabled'}>Bank ${g.run}</button></div>
        <p class="hint keys"><kbd>Space</kbd> throw · <kbd>B</kbd> bank · <kbd>Esc</kbd> leave</p>`}
      <p class="fine">Throw as often as you like and add it up. Bank it whenever you like. A one, and the round's count is gone. First to ${B8G_CUPWIN} takes the stake. The cup pays at most ${B8G_CUPCAP} silver over what you sat down with, once.</p>`);
    if ($('#cuThrow')) $('#cuThrow').onclick = throwMe; if ($('#cuBank')) $('#cuBank').onclick = bank;
    if ($('#cuCall')) $('#cuCall').onclick = call; if ($('#cuLet')) $('#cuLet').onclick = () => { if (g.phase !== 'call') return; AUDIO.play('click'); bust('me'); };
    if ($('#cuDone')) $('#cuDone').onclick = () => { AUDIO.play('click'); settle(); mgClose(result()); }; };
  const tumble = (who, cb) => { g.roll = performance.now(); g.who = who; AUDIO.play('shuffle'); draw(); T(() => { g.roll = 0; AUDIO.play('dice', true); cb(); }, REDUCE() ? 120 : 450); };
  const throwMe = () => { if (g.phase !== 'me' || g.roll) return; g.check = null;
    tumble('me', () => { const d = g.die = 1 + R(6);
      if (d === 1) { if (!g.argued) { g.phase = 'call'; return say('', `A one. The round's ${g.run} is gone, unless that die hit the wall on its way down. It is a very near wall.`); } return bust('me'); }
      g.run += d; if (g.me + g.run >= B8G_CUPWIN) return bank();
      say('', `A ${numw(d)}. ${g.run} this round${g.me ? `, on top of ${g.me} banked` : ''}.`); }); };
  const bank = () => { if (g.phase !== 'me' || g.roll || !g.run) return; AUDIO.play('coin'); g.me += g.run;
    if (g.me >= B8G_CUPWIN) return finish(true);
    say('', `You bank ${g.run}. ${g.me} to Orsa's ${g.opp}, and the cup goes across.`); g.run = 0; g.phase = 'opp'; draw(); T(oppTurn, 600); };
  const bust = who => { const lost = g.run; g.run = 0; AUDIO.play('miss');
    if (who === 'me') { g.phase = 'opp'; say('Orsa', `${lost ? `"There goes ${lost}," she says.` : '"A one first throw," she says.'} ${b8gPick(['"The cup giveth."', 'She holds out her hand for the cup.', '"The lanes are full of ones this winter."'])}`); T(oppTurn, 700); }
    else { g.phase = 'me'; say('Orsa', `A one. ${lost ? `"${lost} gone. Hood's teeth." ` : ''}She slides the cup back across the table to you.`); } };
  /* Orsa throws until she likes the round: seven, or the win, or more when she is behind */
  const oppTurn = () => { if (g.phase !== 'opp') return; tumble('opp', () => { const d = g.die = 1 + R(6);
      if (d === 1) return bust('opp');
      g.run += d; const want = g.opp + g.run >= B8G_CUPWIN || g.run >= (g.me - g.opp >= 8 ? 11 : 7);
      if (want) { g.opp += g.run; const r = g.run; g.run = 0; if (g.opp >= B8G_CUPWIN) return finish(false);
        g.phase = 'me'; say('Orsa', `${b8gPick([`"${r}. I'll keep that."`, `She banks ${r} with a tap of the cup on the table.`, `"${r}, and a den to run." She banks it.`])} ${g.opp} to your ${g.me}. Your cup.`); }
      else { say('Orsa', b8gPick([`A ${numw(d)}. She throws again without looking.`, `"${g.run}," she says, and throws again.`, `A ${numw(d)}. "Again," she tells the cup.`])); T(oppTurn, 650); } }); };
  /* the check: the die hit the wall (Guile). Made: thrown again. Yes, but: thrown again, and a silver for the house. */
  const call = () => { if (g.phase !== 'call') return; g.argued = true; AUDIO.play('click');
    const r = g.check = b8gRoll('guile', B8G_DC, null, [['she has counted dice as they fall since the Pale', 2, 'kettle'], ['he knows how Orsa\'s cups throw', 1, 'vasso'], ['he learned his hands on the Guild\'s roofs', 1, 'vell'], ['you have sat at worse tables than this one', 1, 'sgt']]);
    if (r.ok) { g.phase = 'me'; say('', `${b8gWho(r)} ${b8gV(r, 'point', 'points')} at the scuff on the wall at the table's end, fresh, at about the height a die would hit it. Orsa looks at the scuff, and at ${r.who === 'sgt' ? 'you' : NAME(r.who)}. "Throw it again," she says. "And mind my wall."`); }
    else if (r.tier === 'near') { g.phase = 'me'; g.net -= 1; say('Orsa', `"Throw it again, then." She holds out her hand. "A silver for the house, for the argument. The house always has a wall." <span class="dim">(−1)</span>`); }
    else { say('Orsa', '"It hit the table, friend. Everybody saw it hit the table." Everybody did.'); T(() => bust('me'), 700); } };
  const finish = mine => { g.phase = 'over'; g.won = mine; g.run = 0;
    if (mine) { g.net += g.stake; mgDeed('b8CupWon'); AUDIO.play('win'); g.talk = mgSay('Orsa', `${g.me} to ${g.opp}. She counts ${g.stake} silver across the table. "Malazans," she says. "You never know when to stop. Sometimes it pays."`) +
        (b8In('kettle') ? mgSay('Kettle', `"Six ones in the whole game," Kettle says. "I counted. The die's honest. I was nearly disappointed."`) : ''); }
    else { g.net -= g.stake; mgDeed('b8CupLost'); AUDIO.play('lose'); g.talk = mgSay('Orsa', `${g.opp} to ${g.me}. She takes ${g.stake} silver off the table. "The cup's not your friend tonight, Sergeant. It isn't anybody's. That's why I own it."`) +
        (b8In('vasso') ? mgSay('Vasso', '"She banks at seven," Vasso says, low. "Always seven. Everybody in the lanes knows. Not one of them can wait that long."') : ''); }
    draw(); };
  const stakePick = () => { g.me = g.opp = g.run = 0; g.argued = false; g.check = null; g.won = null; const purse = (S.silver || 0) + g.net;
    mgPanel(`${g.talk}<p class="fine">What's the stake? You have ${purse} silver.</p>
      <div class="row mgbtns">${[1, 3, 5].map((n, i) => `<button class="btn ${i ? '' : 'primary'}" data-st="${n}" data-bot="1" ${purse >= n ? '' : 'disabled'}>${n} silver</button>`).join('')}</div>
      <p class="fine">One die, one cup. On your turn, throw as often as you like and add it up; bank it whenever you like. A one, and the round's count is gone. First to ${B8G_CUPWIN} banked. Once a game, a one can be argued.</p>`);
    document.querySelectorAll('#mgPanel [data-st]').forEach(b => b.onclick = () => { AUDIO.play('coin'); g.stake = +b.dataset.st; g.phase = 'me'; g.talk = mgSay('Orsa', '"Guest throws first. I like to see what I\'m dealing with."'); draw(); }); };
  mgKeys({' ':() => { if (g.phase === 'over') { const b = $('#cuDone'); b && b.click(); } else if (g.phase === 'stake') { const b = $('#mgPanel [data-st]:not([disabled])'); b && b.click(); } else if (g.phase === 'call') call(); else throwMe(); }, b:bank});
  /* the den: a cellar under the lanes, lamp-smoke, the long table, the steps up to the winter night, Orsa at the far end */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, mo = REDUCE() ? 0 : 1;
    const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#120e0c'); bg.addColorStop(1, '#0a0806'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#1e1814'; for (let i = 0; i < 9; i++) ctx.fillRect(W*(i/9) + 2, H*.06, W/9 - 4, H*.4); // the cellar's brick bays
    ctx.fillStyle = '#2a3038'; ctx.fillRect(W*.02, H*.04, W*.14, H*.22); ctx.fillStyle = 'rgba(120,160,220,.25)'; ctx.fillRect(W*.03, H*.05, W*.12, H*.06); // the steps up, and the blue lane-light at the top of them
    for (let i = 0; i < 3; i++) { const x = W*(.3 + i*.22), y = H*.16, fl = mo ? .85 + .15*Math.sin(t/140 + i*2) : .9; ctx.globalCompositeOperation = 'lighter'; glow(ctx, x, y, H*.22, '#ffb860', .28*fl); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#ffd890'; ctx.fillRect(x - 3, y - 4, 6, 7); } // Orsa's lamps
    ctx.fillStyle = 'rgba(70,60,56,.35)'; for (let i = 0; i < 3; i++) { const x = (W*(.2 + i*.3) + (mo ? t*.004*(i + 1) : 0)) % W; ell(ctx, x, H*.3 + i*6, W*.16, H*.03, 'rgba(70,60,56,.25)'); } // the smoke
    ctx.fillStyle = '#4a3020'; ctx.fillRect(W*.08, H*.62, W*.84, H*.07); ctx.fillStyle = '#2e1e14'; ctx.fillRect(W*.12, H*.69, 6, H*.2); ctx.fillRect(W*.86, H*.69, 6, H*.2); // the long table
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b8_c1_orsa', W*.84, H*.62, fs, t, {still:!(g.who === 'opp' && g.roll), dir:-1}); drawFigure(ctx, 'sgt', W*.15, H*.66, fs, t, {still:!(g.who === 'me' && g.roll), dir:1});
    const mate = ['kettle', 'vasso', 'brisk'].find(k => b8In(k)); if (mate) drawFigure(ctx, mate, W*.28, H*.64, fs*.92, t, {still:true, dir:1, phase:2});
    const s = Math.min(30, W*.07, H*.1), cx = W*.5, cy = H*.6, k = g.roll ? (performance.now() - g.roll) / 450 : 1;
    ell(ctx, W*.62, cy - 2, s*.5, s*.3, '#5a3a22'); ctx.fillStyle = '#3a2416'; ctx.fillRect(W*.62 - s*.45, cy - s*.9, s*.9, s*.88); // the cup
    if (g.die || g.roll) b7gDie(ctx, cx, cy - s*.2, s, g.roll ? 1 + (Math.floor(performance.now()/70) % 6) : g.die, g.roll ? k*5 : 0, g.roll ? Math.abs(Math.sin(k*7))*10 : 0, g.die === 1 && !g.roll);
    const bar = (x, v, col) => { ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(x, H*.94, W*.36, 5); ctx.fillStyle = col; ctx.fillRect(x, H*.94, W*.36*Math.min(1, v/B8G_CUPWIN), 5); };
    bar(W*.08, g.me, '#9fd0e8'); bar(W*.56, g.opp, '#e8c073');
    if (g.phase === 'opp') b8gText(ctx, 'Orsa throws', W*.84, H*.62 - 30*fs, Math.min(15, W*.035)); };
  g.talk = mgSay('', `Down the steps under the cobbler's, out of the wind, Orsa's den is warm and smells of lamp-oil and wine. The long table${S.f.b8_c1_denDone ? ' is new, and she makes sure you notice it' : ' has a groove worn down the middle of it by years of dice'}. At the far end, Orsa has a leather cup and a single die, and an empty stool across from her.`) +
    mgSay('Orsa', '"House game, Sergeant. One die. You throw till you like it, or till it bites you." She rolls the die between two fingers. "Ones bite."') +
    b8gSay({kettle:() => mgSay('', 'Kettle takes the stool at your elbow and folds her hands on the table, ready to count.'), vasso:() => mgSay('Vasso', '"She banks early," Vasso says, under the noise. "Don\'t."'), _:''});
  stakePick();
}
function b8CupPay(r){ if (!r || !r.done) return; S.f.b8_cup = {net:r.net, stake:r.stake, won:!!r.won, pay:r.pay || 0, done:true}; save(); }

/* ============ 2. The Last Peg, at the caravan's fire ============
   The carters settle the dog watch with fifteen pegs on a tailboard. Turn about, each takes one, two or three; whoever takes the last peg
   stands the watch. Best of three. Once a game you may palm a fourth (Guile; Brannoc, who talks while he does it, with an edge): made, you
   take four; "yes, but", four, and the carter watches every peg after that; failed, he catches your wrist and you take one. Won, he pays
   you his watch-money, two silver, once a book. Lost, the Fourth stands the dog watch, which it would have done anyway. */
const B8G_PEGS = 15, B8G_PEGWIN = 2, B8G_PEGPAY = 2;
function playB8Peg(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b8gSp());
  const g = MG.state = {n:B8G_PEGS, round:0, mine:0, his:0, turn:'me', phase:'intro', talk:'', check:null, palmed:false, sharp:false, over:false, busy:false, last:null};
  const result = () => ({mine:g.mine, his:g.his, won:g.over && g.mine >= B8G_PEGWIN, done:g.over});
  mgOpen({kick:'The caravan\'s fire · a carter\'s tailboard', title:'The Last Peg', leaveText:'Leave the tailboard', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b8gOn();
  const draw = () => { const mine = g.phase === 'mine';
    mgPanel(`<div class="cpbar"><span>${g.over ? 'The pegs are back in the bag' : `Round ${g.round + 1}: <b>${g.n}</b> peg${g.n === 1 ? '' : 's'}`}</span><span>You <b>${g.mine}</b> · the carter <b>${g.his}</b></span><span>Best of three</span></div>
      ${g.talk}${b8gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="pgDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' ? `<button class="btn primary" id="pgGo" data-bot="1">Set out the pegs</button>`
        : mine ? `${[1, 2, 3].map(k => `<button class="btn ${k === 1 ? 'primary' : ''}" data-pg="${k}" data-bot="1" ${k <= g.n ? '' : 'disabled'}>Take ${numw(k)}</button>`).join('')}${!g.palmed && g.n > 4 ? `<button class="btn" id="pgPalm" data-bot="1">Palm a fourth (once)</button>` : ''}`
        : `<button class="btn" disabled data-bot="1">The carter is counting</button>`}</div>
      <p class="fine">Take one, two or three pegs in turn. Whoever takes the last peg stands the dog watch. Best of three; you start the first round and the third, he starts the second.</p>
      <p class="hint keys"><kbd>1</kbd>–<kbd>3</kbd> take · <kbd>P</kbd> palm · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-pg]').forEach(b => b.onclick = () => take('me', +b.dataset.pg));
    if ($('#pgGo')) $('#pgGo').onclick = () => { AUDIO.play('click'); start(); }; if ($('#pgPalm')) $('#pgPalm').onclick = () => palm();
    if ($('#pgDone')) $('#pgDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const start = () => { if (g.over) return; g.n = B8G_PEGS; g.check = null; g.sharp = false; g.turn = g.round % 2 ? 'him' : 'me';
    if (g.turn === 'me') { g.phase = 'mine'; g.talk = mgSay('The carter', b8gPick(['"Fifteen. Your hand first, soldier."', '"Fifteen pegs. You first. I like to watch."'])); draw(); }
    else { g.phase = 'his'; g.talk = mgSay('The carter', '"My hand first, this one."'); draw(); T(carter, 700); } };
  const take = (w, k) => { if (g.over || (w === 'me' && g.phase !== 'mine') || k > g.n || k < 1) return; g.n -= k; g.last = w; AUDIO.play('click');
    if (g.n <= 0) return endRound(w);
    if (w === 'me') { g.phase = 'his'; g.talk = mgSay('', `You take ${numw(k)}. ${g.n} left on the tailboard.`); draw(); T(carter, 700); }
    else { g.phase = 'mine'; g.talk = mgSay('The carter', `He takes ${numw(k)}. ${g.n} left. ${b8gPick(['"Yours."', 'He spits into the fire.', '"Mind the dog watch, soldier."'])}`); draw(); } };
  /* the carter: leaves you a losing count most of the time (one more than a four), and every time once he has seen a palm */
  const carter = () => { if (g.over || g.phase !== 'his') return; const best = (g.n - 1) % 4, sharp = g.sharp || Math.random() < .7;
    take('him', best && sharp ? best : g.n === 1 ? 1 : Math.min(g.n, 1 + R(3))); };
  /* the check: palm a fourth (Guile). Made: four. Yes, but: four, and he plays every peg true after. Failed: one, and his turn. */
  const palm = () => { if (g.over || g.phase !== 'mine' || g.palmed || g.n <= 4) return; g.palmed = true; AUDIO.play('click');
    const r = g.check = b8gRoll('guile', B8G_DC, null, [['he talks about Falar the whole time he does it', 2, 'brannoc'], ['he has palmed a Guild token in a crowd', 1, 'vasso'], ['his hands were quicker than a clan\'s roof', 1, 'vell'], ['you have watched carters cheat each other for a living', 1, 'sgt']]);
    if (r.ok) { g.n -= 4; g.last = 'me'; g.phase = 'his'; g.talk = mgSay('', `${b8gWho(r)} ${b8gV(r, 'take', 'takes')} three, and a fourth goes up a sleeve while the carter is looking at the fire. ${g.n} left on the tailboard.`); draw(); T(carter, 700); }
    else if (r.tier === 'near') { g.n -= 4; g.last = 'me'; g.sharp = true; g.phase = 'his'; g.talk = mgSay('The carter', `"Four," he says, and taps the tailboard where the fourth was. "I can count, soldier." He lets it stand. He watches every peg from now on. <span class="dim">(he plays every peg true after this)</span>`); draw(); T(carter, 700); }
    else { g.talk = mgSay('The carter', 'He has your wrist before the fourth peg is off the board. "One," he says, kindly, and puts three back.'); g.n -= 1; g.last = 'me'; if (g.n <= 0) return endRound('me'); g.phase = 'his'; draw(); T(carter, 900); } };
  const endRound = w => { g.round++; const iWon = w === 'him'; if (iWon) g.mine++; else g.his++; AUDIO.play(iWon ? 'coin' : 'miss');
    const line = iWon ? b8gPick(['The carter takes the last peg, looks at it, and swears at it.', 'The last peg is his. He holds it up to the fire as if it might be somebody else\'s.']) : b8gPick(['The last peg is yours.', 'You take the last peg. The carter grins at it.']);
    if (g.mine >= B8G_PEGWIN || g.his >= B8G_PEGWIN) return end(line);
    g.phase = 'between'; g.talk = mgSay('', `${line} ${g.mine} to ${g.his}.`); draw(); T(start, 900); };
  const end = line => { g.over = true; g.phase = 'over'; const W = g.mine >= B8G_PEGWIN; mgDeed(W ? 'b8PegWon' : 'b8PegLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk = mgSay('', line) + mgSay('The carter', W ? `"${g.mine} to ${g.his}." He fishes in his boot and puts ${numw(B8G_PEGPAY)} silver on the tailboard. "Calder pays a silver a night for the dog watch. I'll stand it. You'll have my pay." He does not look pleased about either half.` : `"${g.his} to ${g.mine}." He sweeps the pegs into the bag. "Dog watch is yours, soldier. Wake me if the old Domin gets up and walks."`) +
      b8gSay({brannoc:() => mgSay('Brannoc', W ? '"In Falar," Brannoc says, "they play it with oars. It takes longer."' : '"In Falar," Brannoc says, "the one who takes the last oar is the one who rows. It is fairer. No one ever believes me."'), kettle:() => mgSay('Kettle', W ? '"Leave him one more than four," Kettle says. "Every time. It\'s only counting."' : '"I could have told you that," Kettle says. "Count backwards from the last peg in fours. I\'ll teach you on the road."'), _:''}); draw(); };
  mgKeys({'1':() => take('me', 1), '2':() => take('me', 2), '3':() => take('me', 3), p:() => palm(), ' ':() => { const b = $('#pgDone') || $('#pgGo'); b && b.click(); }});
  /* the tailboard: the old Domin flat and dark, the wagons in their ring, the fire, the pegs in a row on a lowered tailboard */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H;
    b6gNight(ctx, W, H, t, {top:'#05070c', mid:'#1a1e26', cut:.42, low:'#100e0c', seed:9801});
    ctx.fillStyle = '#0c0e12'; ctx.fillRect(0, H*.4, W, H*.06); // the Domin, flat to the edge of the world
    for (let i = 0; i < 4; i++) { const x = W*(.05 + i*.26); ctx.fillStyle = '#1e1a16'; ctx.fillRect(x, H*.3, W*.18, H*.12); ctx.fillStyle = '#2e2a24'; ctx.beginPath(); ctx.ellipse(x + W*.09, H*.3, W*.09, H*.06, 0, Math.PI, 0); ctx.fill(); ell(ctx, x + W*.03, H*.43, H*.025, H*.025, '#0e0c0a'); ell(ctx, x + W*.15, H*.43, H*.025, H*.025, '#0e0c0a'); } // the wagons' ring, covered
    ctx.fillStyle = '#161410'; ctx.fillRect(0, H*.46, W, H*.54); b7gFire(ctx, W*.5, H*.52, t, H);
    const tx = W*.16, tw = W*.68, ty = H*.72; ctx.fillStyle = '#5a4430'; ctx.fillRect(tx, ty, tw, H*.07); ctx.fillStyle = '#3a2a1c'; ctx.fillRect(tx, ty + H*.07, tw, 3); // the tailboard
    for (let i = 0; i < B8G_PEGS; i++) { const x = tx + tw*(i + .5)/B8G_PEGS, have = i < g.n; ctx.fillStyle = have ? '#d8c08a' : 'rgba(216,192,138,.12)'; ctx.fillRect(x - 2, ty - (have ? 12 : 3), 4, have ? 14 : 4); if (have) ell(ctx, x, ty - 12, 2.5, 1.5, '#f0dca8'); }
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b8_c2_carter', W*.88, H*.86, fs, t, {still:g.phase !== 'his', dir:-1}); drawFigure(ctx, 'sgt', W*.1, H*.88, fs, t, {still:g.phase !== 'mine', dir:1});
    const mate = ['brannoc', 'kettle', 'vasso'].find(k => b8In(k)); if (mate) drawFigure(ctx, mate, W*.22, H*.9, fs*.9, t, {still:true, dir:1, phase:2});
    for (let i = 0; i < g.mine; i++) ell(ctx, W*.1 + i*10, H*.97, 3, 3, '#9fd0e8'); for (let i = 0; i < g.his; i++) ell(ctx, W*.9 - i*10, H*.97, 3, 3, '#e8c073'); };
  g.talk = mgSay('', `At the caravan's fire, with the wagons in their ring and the old Domin flat and dark all round, a carter has dropped a tailboard and set out a row of pegs from a bag. The dog watch wants standing. The carters settle it this way.`) +
    mgSay('The carter', '"Last Peg, soldier. Fifteen. One, two or three a hand. Whoever takes the last one sits up with the dark." He looks out at it. "There\'s a lot of dark."') +
    b8gSay({brannoc:() => mgSay('', 'Brannoc sits down on the next wagon\'s shaft, already talking.'), kettle:() => mgSay('', 'Kettle looks at the row of pegs, and then at the carter, and then at the pegs again, counting.'), _:''});
  draw();
}
/* what the tailboard leaves behind, once a book: the carter's watch-money */
function b8PegPay(r){ if (!r) return; S.f.b8_peg = {mine:r.mine, his:r.his, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b8_pegPaid) { S.f.b8_pegPaid = 1; S.silver = (S.silver || 0) + B8G_PEGPAY; updSilver(); note(`+${B8G_PEGPAY} silver: a carter's watch-money, paid.`, 'good'); }
  save(); }

/* ============ 3. Lamp and Stone, at the lodging ============
   Thessaly, the clerk sworn to the Andii, comes off her ledger with a cloth of sixteen squares, a bag of black stones and a shuttered lamp.
   It is a game the Andii play, she says, to pass a night that does not pass. She lays the stones; the lamp is open for a breath; then dark,
   and you touch where the stones lie. One wrong touch is forgiven; a second loses the round. Three rounds, of three, four and five stones;
   two rounds take it. Once a game, before a round, you may let your eyes go to the dark (Wits; Tuft, who has walked in shadows, with an
   edge): made, the lamp stays open twice as long; "yes, but", twice as long, and Thessaly lays one more stone. Won: Tuft's regard if she
   walks, else Edrem's, else a salve. This is not the game played in the tavern by the harbour, and it is never called by its name. */
const B8G_LAMPN = [3, 4, 5], B8G_LAMPWIN = 2, B8G_LAMPSHOW = 1300, B8G_GRID = 16;
function playB8Lamp(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b8gSp());
  const g = MG.state = {round:0, mine:0, lost:0, stones:[], found:[], miss:[], phase:'intro', talk:'', check:null, dark:false, eyes:false, extra:0, used:false, over:false, shown:0};
  const result = () => ({mine:g.mine, lost:g.lost, rounds:g.round, won:g.over && g.mine >= B8G_LAMPWIN, done:g.over});
  mgOpen({kick:'Black Coral · the room over the chandler\'s', title:'Lamp and Stone', leaveText:'Leave the cloth', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b8gOn();
  const cell = i => { const st = g.stones.includes(i), f = g.found.includes(i), m = g.miss.includes(i), lit = g.phase === 'show' && st;
    return `<button class="btn${f ? ' on' : ''}" data-cl="${i}" data-bot="1" style="min-width:0;width:100%;padding:0;height:46px;font-size:20px" ${g.phase === 'dark' && !f && !m ? '' : 'disabled'}>${lit || (f) ? '●' : m ? '×' : (g.phase === 'over' || g.phase === 'between') && st ? '○' : '·'}</button>`; };
  const draw = () => { mgPanel(`<div class="cpbar"><span>${g.over ? 'The lamp is open' : `Round ${g.round + 1} of 3: <b>${g.stones.length || B8G_LAMPN[g.round]}</b> stones`}</span><span>Rounds <b>${g.mine}</b> · Thessaly <b>${g.lost}</b></span><span>${g.phase === 'dark' ? `Found ${g.found.length} · wrong ${g.miss.length}` : ''}</span></div>
      ${g.talk}${b8gRollHTML(g.check)}
      ${g.phase !== 'intro' ? `<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%;max-width:280px;margin:6px auto;box-sizing:border-box">${Array.from({length:B8G_GRID}, (_, i) => cell(i)).join('')}</div>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="lmDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' || g.phase === 'ready' ? `<button class="btn primary" id="lmOpen" data-bot="1">Lay the stones. Open the lamp</button>${!g.used ? `<button class="btn" id="lmEyes" data-bot="1">Let your eyes go to the dark first (once)</button>` : ''}`
        : g.phase === 'show' ? `<button class="btn" disabled data-bot="1">The lamp is open</button>` : g.phase === 'between' ? `<button class="btn" disabled data-bot="1">Thessaly gathers the stones</button>` : ''}</div>
      <p class="fine">The lamp opens for a breath on the stones, then shuts. Touch where they lie. One wrong touch is forgiven; a second loses the round. Two rounds of three take it.</p>
      <p class="hint keys"><kbd>Space</kbd> open the lamp · <kbd>E</kbd> eyes to the dark · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-cl]').forEach(b => b.onclick = () => touch(+b.dataset.cl));
    if ($('#lmOpen')) $('#lmOpen').onclick = () => open(); if ($('#lmEyes')) $('#lmEyes').onclick = () => eyes();
    if ($('#lmDone')) $('#lmDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  /* the check: eyes to the dark (Wits). Made: the lamp twice as long. Yes, but: twice as long, and one more stone. */
  const eyes = () => { if (g.used || g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; g.used = true; AUDIO.play('click');
    const r = g.check = b8gRoll('wits', B8G_DC, null, [['she has walked in shadows, and Meanas taught her to look', 2, 'tuft'], ['he lived under this night with the Domin\'s grey on', 1, 'edrem'], ['she learned to see in the dark the Claw\'s way', 1, 'ellis'], ['you have stood a lot of night watches', 1, 'sgt']]);
    if (r.ok) { g.eyes = true; g.talk = mgSay(r.who === 'tuft' ? 'Tuft' : '', r.who === 'tuft' ? '"Don\'t look at the lamp," Tuft says, very quietly. "Look where it isn\'t. It stays longer there." She sounds surprised to know it.' : `${b8gWho(r)} ${b8gV(r, 'sit', 'sits')} a while with ${r.who === 'sgt' ? 'your' : B8G_SHE.includes(r.who) ? 'her' : 'his'} eyes open on the dark until the dark has shapes in it. The lamp will last twice as long, after that.`); }
    else if (r.tier === 'near') { g.eyes = true; g.extra = 1; g.talk = mgSay('Thessaly', '"You\'ve been sitting in the dark," she says, and smiles, and puts another stone in her palm. "They do that too. They lay one more for it." <span class="dim">(the lamp twice as long; one more stone)</span>'); }
    else g.talk = mgSay('', `${b8gWho(r)} ${b8gV(r, 'sit', 'sits')} in the dark a while, and the dark stays the dark. Black Coral's is not a dark that gets used to anyone.`);
    draw(); };
  const open = () => { if (g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; const n = B8G_LAMPN[g.round] + g.extra; g.extra = 0;
    const cells = Array.from({length:B8G_GRID}, (_, i) => i); g.stones = []; while (g.stones.length < n) g.stones.push(cells.splice(R(cells.length), 1)[0]);
    g.found = []; g.miss = []; g.phase = 'show'; g.shown = performance.now(); AUDIO.play('shuffle');
    g.talk = mgSay('Thessaly', `${numw(n, true)} stones. She opens the shutter for a breath.`); draw();
    T(() => { g.phase = 'dark'; g.eyes = false; AUDIO.play('click'); g.talk = mgSay('', 'The shutter closes. Touch where they lie.'); draw(); }, B8G_LAMPSHOW * (g.eyes ? 2 : 1)); };
  const touch = i => { if (g.phase !== 'dark' || g.over || g.found.includes(i) || g.miss.includes(i)) return;
    if (g.stones.includes(i)) { g.found.push(i); AUDIO.play('coin'); if (g.found.length === g.stones.length) return endRound(true); g.talk = mgSay('', b8gPick(['Cold stone under your finger.', 'A stone.', 'There.'])); }
    else { g.miss.push(i); AUDIO.play('miss'); if (g.miss.length >= 2) return endRound(false); g.talk = mgSay('Thessaly', '"Cloth," she says. "Once is forgiven."'); }
    draw(); };
  const endRound = ok => { g.round++; if (ok) g.mine++; else g.lost++; g.phase = 'between';
    g.talk = mgSay('Thessaly', ok ? b8gPick(['"All of them." She opens the lamp to show you, and nods.', '"Every one," she says. "They would have been pleased with you. They would not have said so."']) : b8gPick(['"Cloth, twice." She opens the lamp on the stones you missed.', '"The dark wins that one," she says. "It usually does. That is the point of playing."']));
    if (g.mine >= B8G_LAMPWIN || g.lost > B8G_LAMPN.length - B8G_LAMPWIN) { draw(); return T(end, 600); } draw(); T(() => { g.phase = 'ready'; g.stones = []; draw(); }, 900); };
  const end = () => { g.over = true; g.phase = 'over'; const W = g.mine >= B8G_LAMPWIN; mgDeed(W ? 'b8LampWon' : 'b8LampLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk = mgSay('Thessaly', W ? `"${g.mine} rounds." She puts the stones back in the bag one at a time. "I have played this a long while under their night, Sergeant. You learn to see what is there when there is nothing to see it by. Most of the Malazans who come through do not try."` : `"The dark has it." She puts the stones away. "I have played it as long as I have kept the ledger, and they still beat me without looking. It is not a game you win. It is a game you keep playing."`) +
      b8gSay({tuft:() => mgSay('Tuft', W ? '"It\'s cold, the dark here," Tuft says, when Thessaly has gone. "But it\'s not empty. I keep thinking it ought to be." She does not say what she thinks it is full of.' : '"Shadows are easier," Tuft says. "Shadows are only light, somewhere else. This isn\'t."'), edrem:() => mgSay('Edrem', '"The Andii play it all night," Edrem says. "I used to watch them through a tavern window, the year after. I never asked to sit."'), _:''}); draw(); };
  mgKeys({e:() => eyes(), ' ':() => { const b = $('#lmDone') || $('#lmOpen'); b && b.click(); }});
  /* the room: night at noon through the shutters, the street lamps outside, the cloth on the floor, the shuttered lamp, Thessaly */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now();
    const open = g.phase === 'show', k = open ? Math.min(1, (now - g.shown) / 180) : 0;
    ctx.fillStyle = '#07080c'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#0e1016'; ctx.fillRect(W*.62, H*.08, W*.3, H*.3); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#05060a'; ctx.fillRect(W*(.62 + i*.08), H*.08, 3, H*.3); } // the shutters, half open on the street
    for (let i = 0; i < 3; i++) glow(ctx, W*(.68 + i*.09), H*(.16 + hash(i, 9811)*.1), H*.05, '#e8c070', .35); // the lamps outside, burning at noon
    const cx = W*.45, cy = H*.66, cs = Math.min(W*.13, H*.11); ctx.fillStyle = '#121418'; ctx.fillRect(cx - cs*2.1, cy - cs*1.35, cs*4.2, cs*2.7); // the cloth
    if (open) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, cx, cy, cs*3.4, '#ffd890', .32*k); ctx.globalCompositeOperation = 'source-over'; }
    for (let i = 0; i < B8G_GRID; i++) { const x = cx - cs*1.5 + (i % 4)*cs, y = cy - cs*.98 + Math.floor(i / 4)*cs*.65;
      ctx.strokeStyle = open ? `rgba(200,180,140,${.35*k})` : 'rgba(80,90,110,.12)'; ctx.strokeRect(x - cs*.45, y - cs*.28, cs*.9, cs*.56);
      if (g.stones.includes(i) && (open || g.phase === 'between' || g.phase === 'over' || g.found.includes(i))) ell(ctx, x, y, cs*.22, cs*.13, open || g.phase !== 'dark' ? '#1a1a20' : '#2a2e38');
      if (g.stones.includes(i) && open) { ctx.strokeStyle = `rgba(255,230,180,${.5*k})`; ctx.beginPath(); ctx.ellipse(x, y, cs*.22, cs*.13, 0, Math.PI, 0); ctx.stroke(); } }
    const lx = W*.78, ly = H*.62; ctx.fillStyle = '#3a3026'; ctx.fillRect(lx - 9, ly - 16, 18, 22); ctx.fillStyle = open ? '#ffe2a0' : '#1a1610'; ctx.fillRect(lx - 6, ly - 12, 12, 12); // the lamp, its shutter
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b8_c3_thessaly', W*.9, H*.92, fs, t, {still:true, dir:-1}); drawFigure(ctx, 'sgt', W*.1, H*.92, fs, t, {still:true, dir:1});
    const mate = ['tuft', 'edrem'].find(k => b8In(k)); if (mate) drawFigure(ctx, mate, W*.22, H*.9, fs*.92, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', 'Thessaly comes up the chandler\'s stair when her ledger is closed, with a square of black cloth, a bag of stones and a lamp with a shutter on it. She sits on the floor and spreads the cloth between you.') +
    mgSay('Thessaly', '"A game they play, here. The Andii. To pass a night that does not pass." She lays a hand flat on the cloth. "I open the lamp for a breath. You remember. Then you find the stones in the dark. That is all of it. They have not tired of it yet. They have had an age to try."') +
    b8gSay({tuft:() => mgSay('', 'Tuft sits down on the far side of the cloth with her back to the lamps, which is not how she ever sits.'), edrem:() => mgSay('', 'Edrem stays standing by the door, the way he does, and watches the cloth.'), _:''});
  draw();
}
/* what the cloth leaves behind, once a book: Tuft's regard, or Edrem's, or a salve */
function b8LampPay(r){ if (!r) return; S.f.b8_lamp = {mine:r.mine, lost:r.lost, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b8_lampPaid) S.f.b8_lampPaid = b8gRegard(['tuft', 'edrem'], 'Thessaly leaves a pot of the chandler\'s wax salve on the sill.');
  save(); }

/* ============ 4. Keep the Fire, at the camp's edge ============
   Hurrin and a few of the frightened pilgrims keep a fire at the edge, between the tents and the open dark. The bells say night; the fire
   says how much of it can come in. Feed a stick when the flame falls; let it fall out and the dark is at the tents. There are only so many
   sticks, and a stick on a roaring fire is wasted. Last until the bells say morning. Once a game you may bank the fire with turf (Wits;
   Edrem, who held the pilgrims' road, with an edge): made, it burns slow and the gusts can't reach it for a while; "yes, but", the same,
   and it costs a stick to set. Won: Edrem's regard if he walks, else a salve from the pilgrims. Kelyk is a smell from the rows, nothing more. */
const B8G_FIREN = 30, B8G_STICKS = 10, B8G_STICK = 20, B8G_DECAY = 5.2, B8G_GUST = 10, B8G_TURF = 10;
function playB8Fire(opt = {}){
  let on = () => true;
  const unit = () => 1000 * b8gSp();
  const g = MG.state = {flame:60, sticks:B8G_STICKS, el:0, last:0, phase:'intro', talk:'', check:null, turf:0, used:false, over:false, gust:0, nextGust:3 + R(3), wasted:0, fed:0};
  const result = () => ({el:g.el, sticks:g.sticks, won:g.over && g.flame > 0 && g.el >= B8G_FIREN, done:g.over});
  mgOpen({kick:'The camp\'s edge · the pilgrims\' fire', title:'Keep the Fire', leaveText:'Leave it to them', done:r => opt.after && opt.after(r), leave:() => { if (!g.over) g.phase = 'gone'; mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false})); }}); on = b8gOn();
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? (g.flame > 0 ? 'Morning, by the bells' : 'The fire is out') : `Night <b>${Math.min(B8G_FIREN, Math.floor(g.el))}</b> of ${B8G_FIREN}`}</span><span>Sticks <b>${g.sticks}</b></span><span>Flame <b>${Math.max(0, Math.round(g.flame))}</b>${g.turf > 0 ? ' · banked' : ''}</span></div>
      ${g.talk}${b8gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="kfDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' ? `<button class="btn primary" id="kfGo" data-bot="1">Sit down with them</button>${!g.used ? `<button class="btn" id="kfTurf" data-bot="1">Bank it with turf first (once)</button>` : ''}`
        : `<button class="btn primary" id="kfStick" data-bot="1" ${g.sticks > 0 ? '' : 'disabled'}>A stick on the fire</button>${!g.used ? `<button class="btn" id="kfTurf" data-bot="1">Bank it with turf (once)</button>` : ''}`}</div>
      <p class="fine">The flame falls on its own, faster when a gust comes off the open dark. A stick lifts it; a stick on a roaring fire is wasted. Let it go out and the dark is at the tents. Last until the bells say morning.</p>
      <p class="hint keys"><kbd>Space</kbd> a stick · <kbd>T</kbd> turf · <kbd>Esc</kbd> leave</p>`),
    bind = () => { if ($('#kfGo')) $('#kfGo').onclick = () => go(); if ($('#kfStick')) $('#kfStick').onclick = () => stick(); if ($('#kfTurf')) $('#kfTurf').onclick = () => turf();
      if ($('#kfDone')) $('#kfDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const go = () => { if (g.phase !== 'intro') return; g.phase = 'night'; g.last = performance.now(); AUDIO.play('click');
    g.talk = mgSay('Hurrin', '"The bells will say morning," Hurrin says. "They always do. Then we can stop."'); redraw(); setTimeout(tick, 60); };
  let shown = -1;
  const tick = () => { if (!on() || g.phase !== 'night') return; const now = performance.now(), dt = Math.min(.5, (now - g.last) / unit()); g.last = now; g.el += dt;
    g.flame -= B8G_DECAY * dt * (g.turf > 0 ? .5 : 1); if (g.turf > 0) g.turf -= dt;
    if (g.el >= g.nextGust) { g.nextGust = g.el + 2.5 + Math.random()*3; if (g.turf <= 0) { g.flame -= B8G_GUST; g.gust = now; AUDIO.play('miss'); g.talk = mgSay('', b8gPick(['A gust comes off the open dark and lays the flame flat.', 'The wind off the plain, cold. The fire leans away from it.', 'Something moves out past the light. Only wind, Hurrin says.'])); redraw(); } }
    if (g.flame <= 0) return end(false); if (g.el >= B8G_FIREN) return end(true);
    const s = Math.floor(g.el); if (s !== shown) { shown = s; redraw(); } setTimeout(tick, 60); };
  const stick = () => { if (g.phase !== 'night' || g.sticks <= 0) return; g.sticks--; g.fed++; const before = g.flame; g.flame = Math.min(100, g.flame + B8G_STICK); g.wasted += B8G_STICK - (g.flame - before); AUDIO.play('click');
    g.talk = mgSay('', before > 85 ? 'The fire is roaring already. The stick goes up in sparks and is gone.' : b8gPick(['The stick catches. The dark steps back a pace.', 'A stick on, and the tents behind come back into the light.', 'You feed it. Hurrin nods.'])); redraw(); };
  /* the check: bank it with turf (Wits). Made: slow, and out of the gusts' reach. Yes, but: the same, and a stick to set it. */
  const turf = () => { if (g.used || g.over || !(g.phase === 'intro' || g.phase === 'night')) return; g.used = true; AUDIO.play('click');
    const r = g.check = b8gRoll('wits', B8G_DC, null, [['he kept fires for the pilgrims on the road for years', 2, 'edrem'], ['she has kept a fire on the Pale in wind', 1, 'sohra'], ['she counts what a fire will take', 1, 'kettle'], ['you have banked a camp fire before', 1, 'sgt']]);
    if (r.ok) { g.turf = B8G_TURF; g.talk = mgSay(r.who === 'edrem' ? 'Edrem' : '', r.who === 'edrem' ? 'Edrem cuts turf from the verge with the edge of his mace and banks the fire on the windward side, the way the pilgrims\' road taught him. "Slow," he says. "Slow lasts."' : `${b8gWho(r)} ${b8gV(r, 'cut', 'cuts')} turf from the verge and ${b8gV(r, 'bank', 'banks')} the fire on the windward side. It settles, and burns slow, and the wind goes round it.`); }
    else if (r.tier === 'near') { g.turf = B8G_TURF; g.sticks = Math.max(0, g.sticks - 1); g.talk = mgSay('Hurrin', '"Turf," Hurrin says, approving. "But you want a dry stick under it, to set it." One stick goes under the turf. <span class="dim">(a stick to set it)</span>'); }
    else g.talk = mgSay('', `${b8gWho(r)} ${b8gV(r, 'cut', 'cuts')} turf from the verge, and it is wet through, and smokes, and the pilgrims cough, and it does nothing else.`);
    redraw(); };
  const end = W => { g.over = true; g.phase = 'over'; if (!W) g.flame = 0; mgDeed(W ? 'b8FireWon' : 'b8FireLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk = mgSay('', W ? 'Far off, the city\'s bells say morning. It looks exactly like the night. The fire is still in.' : 'The fire goes down to embers, and then to nothing, and for a breath the dark is right there at the first tent. Then someone along the edge brings a brand from their own fire, and it is lit again, and the pilgrims at this one let it pass.') +
      mgSay('Hurrin', W ? '"Morning," Hurrin says. He puts out a hand, and after a moment you see it is for you to take. "Up north, at home, we kept the fire all winter. No one ever thanked anyone for it. I thought somebody should."' : '"It goes out," Hurrin says. "It goes out up north too. You light it again." He does not seem to blame anyone. That is somehow worse.') +
      b8gSay({edrem:() => mgSay('Edrem', W ? '"They will remember who sat up," Edrem says, of the pilgrims. "They always do. They never say."' : '"Next time, turf first," Edrem says. He is not unkind about it.'), ohl:() => mgSay('Ohl', '"Not one of them drank tonight, at this fire," Ohl says, low, looking at the rows behind, where the sweet smell comes from. "That\'s worth a fire."'), _:''}); redraw(); };
  mgKeys({t:() => turf(), ' ':() => { const b = $('#kfDone') || $('#kfGo') || $('#kfStick'); b && !b.disabled && b.click(); }});
  /* the edge: the open dark, the tents behind, Hurrin and two pilgrims round a small fire whose size is the flame, the woodpile */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now(), f = clamp(g.flame, 0, 100) / 100;
    ctx.fillStyle = '#040508'; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 7; i++) { const x = W*(.04 + i*.14), h = H*(.1 + hash(i, 9821)*.06); ctx.fillStyle = '#121418'; poly(ctx, [[x, H*.5], [x + W*.06, H*.5 - h], [x + W*.12, H*.5]], '#121418'); } // the tents behind
    ctx.fillStyle = '#0c0d10'; ctx.fillRect(0, H*.5, W, H*.5);
    const fx = W*.5, fy = H*.74, gs = g.gust && now - g.gust < 600 ? 1 - (now - g.gust) / 600 : 0;
    ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy - 6, H*(.1 + f*.4), '#ff9a40', .15 + f*.35); ctx.globalCompositeOperation = 'source-over';
    if (f > 0) { const fl = b2Fl(t), hgt = (8 + f*40) * fl, lean = gs*18; poly(ctx, [[fx - 12 - f*8, fy], [fx - 4 + lean, fy - hgt], [fx + 2 + lean*.6, fy - hgt*.5], [fx + 6 + lean, fy - hgt*.8], [fx + 12 + f*8, fy]], `rgba(255,${140 + f*40 | 0},60,.92)`); poly(ctx, [[fx - 5, fy], [fx + lean*.5, fy - hgt*.45], [fx + 5, fy]], '#fff1c2'); }
    ctx.fillStyle = '#2a2420'; ctx.fillRect(fx - 16, fy, 32, 5);
    if (g.turf > 0) { ctx.fillStyle = '#2a2a1a'; ctx.beginPath(); ctx.ellipse(fx - 18, fy - 2, 10, 7, 0, Math.PI, 0); ctx.fill(); }
    for (let i = 0; i < g.sticks; i++) { ctx.save(); ctx.translate(W*.2 + (i % 5)*7, H*.9 - Math.floor(i / 5)*5); ctx.rotate(-.2 + (i % 3)*.15); ctx.fillStyle = '#5a4230'; ctx.fillRect(-12, -1.5, 24, 3); ctx.restore(); } // the woodpile
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b8_c4_hurrin', W*.72, H*.8, fs, t, {still:true, dir:-1}); drawFigure(ctx, 'b8_c4_hurrin', W*.86, H*.76, fs*.85, t, {still:true, dir:-1, phase:3});
    drawFigure(ctx, 'sgt', W*.3, H*.82, fs, t, {still:true, dir:1}); const mate = ['edrem', 'ohl'].find(k => b8In(k)); if (mate) drawFigure(ctx, mate, W*.14, H*.8, fs*.92, t, {still:true, dir:1, phase:2});
    const dk = 1 - f; ctx.fillStyle = `rgba(2,3,6,${(.15 + dk*.55).toFixed(2)})`; ctx.fillRect(0, 0, W*.06 + dk*W*.2, H); ctx.fillRect(W - W*.06 - dk*W*.2, 0, W*.06 + dk*W*.2, H); // the dark, closing in from both sides as the flame falls
    const bx = W*.08, bw = W*.84; ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(bx, H*.04, bw, 4); ctx.fillStyle = '#9fd0e8'; ctx.fillRect(bx, H*.04, bw*Math.min(1, g.el / B8G_FIREN), 4); }; // the bells' night, passing
  g.talk = mgSay('', 'At the far end of the edge, past the Fourth\'s own fire, Hurrin and two of the frightened ones have a small fire going between the last tents and the open dark. They have a pile of sticks someone carried in from the road, and not many.') +
    mgSay('Hurrin', '"Sit, if you like. We keep it in till the bells say morning. If it goes out, the dark comes up to the tents." He feeds it a stick, carefully. "Not too much. There isn\'t much."') +
    mgSay('', 'Behind you, in the rows, the sweet smell is stronger tonight. Hurrin keeps his face turned away from it.');
  redraw();
}
/* what the edge leaves behind, once a book: Edrem's regard, or a salve */
function b8FirePay(r){ if (!r) return; S.f.b8_fire = {won:!!r.won, done:!!r.done, sticks:r.sticks};
  if (r.won && !S.f.b8_firePaid) S.f.b8_firePaid = b8gRegard(['edrem'], 'the pilgrims press a twist of willow bark on the Fourth for its cuts.');
  save(); }

/* ============ 5. Stones on the Water, the night after ============
   On the shingle, the evening after the Hounds, Benlo comes down from the street with his cold brazier on his barrow and a pocket of flat
   stones. Three throws each across the lake, toward the blue lamps coming on along the shore. Each throw is two taps: the angle (flat
   is best) as the arm swings, then the strength (the mark near the top). Most skips over three throws wins; a tie is nobody's. Once a game,
   pick a flat stone (Wits; Brannoc, who grew up on boats, with an edge): made, the next throw skips two more; "yes, but", two more, and
   Benlo picks a flat one too. Won: the regard of whichever squadmate needed the evening most (the lowest loyalty who walks), or a salve. */
const B8G_SKIPN = 3;
const b8gSkips = (a, p) => { const flat = 1 - Math.min(1, Math.abs(a)), str = 1 - Math.min(1, Math.abs(p - .82) * 2.6); return Math.max(0, Math.round(flat * str * 9 + Math.random() * 1.2 - .4)); };
function playB8Skip(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b8gSp());
  const g = MG.state = {throw:0, mine:[], his:[], phase:'intro', talk:'', check:null, used:false, plus:0, hisPlus:0, a:null, t0:0, over:false, fly:null, force:null};
  const sum = a => a.reduce((x, y) => x + y, 0);
  const result = () => ({mine:sum(g.mine), his:sum(g.his), won:g.over && sum(g.mine) > sum(g.his), tie:g.over && sum(g.mine) === sum(g.his), done:g.over});
  mgOpen({kick:'The lake shore · the night after', title:'Stones on the Water', leaveText:'Leave the shingle', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b8gOn();
  const swing = () => Math.sin((performance.now() - g.t0) / (700 * Math.max(.6, b8gSp()))); // the arm, -1..1 (0 is flat)
  const power = () => (1 - Math.cos((performance.now() - g.t0) / (520 * Math.max(.6, b8gSp())))) / 2; // the strength, 0..1
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? 'The stones are thrown' : `Throw ${g.throw + 1} of ${B8G_SKIPN}`}</span><span>You <b>${sum(g.mine)}</b> · Benlo <b>${sum(g.his)}</b></span><span>Most skips</span></div>
      ${g.talk}${b8gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="skDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' || g.phase === 'ready' ? `<button class="btn primary" id="skUp" data-bot="1">Pick up a stone</button>${!g.used ? `<button class="btn" id="skPick" data-bot="1">Look for a flat one first (once)</button>` : ''}`
        : g.phase === 'angle' ? `<button class="btn primary" id="skSet" data-bot="1">Now: the angle</button>`
        : g.phase === 'power' ? `<button class="btn primary" id="skSet" data-bot="1">Now: throw</button>`
        : `<button class="btn" disabled data-bot="1">${g.phase === 'benlo' ? 'Benlo throws' : 'The stone is going'}</button>`}</div>
      <p class="fine">Tap once as the arm comes flat, then again as the strength nears its mark. Three throws each; most skips wins.</p>
      <p class="hint keys"><kbd>Space</kbd> pick up / set / throw · <kbd>F</kbd> a flat stone · <kbd>Esc</kbd> leave</p>`),
    bind = () => { if ($('#skUp')) $('#skUp').onclick = () => up(); if ($('#skPick')) $('#skPick').onclick = () => pick(); if ($('#skSet')) $('#skSet').onclick = () => set();
      if ($('#skDone')) $('#skDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const up = () => { if (g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; g.phase = 'angle'; g.t0 = performance.now(); AUDIO.play('click');
    g.talk = mgSay('', 'A stone in your hand, cold off the shingle. Your arm goes back.'); redraw(); };
  const set = () => { if (g.over) return;
    if (g.phase === 'angle') { g.a = g.force ? g.force[0] : swing(); g.phase = 'power'; g.t0 = performance.now(); AUDIO.play('click'); g.talk = mgSay('', Math.abs(g.a) < .2 ? 'Flat. Now the strength.' : Math.abs(g.a) < .5 ? 'Near enough flat. Now the strength.' : 'Steep. It will want luck. Now the strength.'); return redraw(); }
    if (g.phase !== 'power') return; const p = g.force ? g.force[1] : power(), n = b8gSkips(g.a, p) + g.plus; g.plus = 0; g.force = null;
    g.mine.push(n); g.phase = 'fly'; g.fly = {t:performance.now(), n, me:true}; AUDIO.play('shuffle');
    g.talk = mgSay('', n ? `${numw(n, true)} skip${n === 1 ? '' : 's'}, out toward the lamps${n >= 6 ? ', and the last of them in the dark where you can only hear it' : ''}.` : 'It goes in with a plop, first touch. The lake keeps it.'); redraw();
    T(benlo, 1100); };
  const benlo = () => { if (g.over) return; g.phase = 'benlo'; redraw();
    T(() => { const n = Math.max(0, 2 + R(5) + (Math.random() < .25 ? 2 : 0) - (Math.random() < .2 ? 2 : 0)) + g.hisPlus; g.hisPlus = 0; g.his.push(n); g.fly = {t:performance.now(), n, me:false}; AUDIO.play('shuffle');
      g.talk = mgSay('Benlo', n ? `${numw(n, true)}. ${b8gPick(['"The lake likes me," he says. "I sell it chestnuts."', '"Not bad for a chestnut man."', 'He watches the rings go out, and nods.'])}` : '"Hood\'s teeth." Straight in. He laughs, which is the first laugh you have heard all day.');
      g.throw++; if (g.throw >= B8G_SKIPN) T(end, 900); else { g.phase = 'ready'; } redraw(); }, 700); };
  /* the check: a flat stone (Wits). Made: two more skips. Yes, but: two more, and Benlo finds a flat one too. */
  const pick = () => { if (g.used || g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; g.used = true; AUDIO.play('click');
    const r = g.check = b8gRoll('wits', B8G_DC, null, [['he grew up skipping stones off Falari jetties', 2, 'brannoc'], ['he has known this shore since he was a boy', 1, 'vasso'], ['she knows which stones the water has worked longest', 1, 'sohra'], ['you have a soldier\'s eye for a good stone', 1, 'sgt']]);
    if (r.ok) { g.plus = 2; g.talk = mgSay(r.who === 'brannoc' ? 'Brannoc' : '', r.who === 'brannoc' ? '"This one," Brannoc says, and puts a stone in your hand as thin as a coin and as round. "In Falar we would not sell this. We would marry it."' : `${b8gWho(r)} ${b8gV(r, 'find', 'finds')} a stone on the shingle as thin as a coin, worn flat by the lake. <span class="dim">(two more skips, next throw)</span>`); }
    else if (r.tier === 'near') { g.plus = 2; g.hisPlus = 1; g.talk = mgSay('Benlo', '"That\'s a good one," Benlo says, watching. He bends and finds its brother. "I know this shore too." <span class="dim">(two more skips for you; one more for him)</span>'); }
    else g.talk = mgSay('', `${b8gWho(r)} ${b8gV(r, 'turn', 'turns')} over half the shingle in the dark and ${b8gV(r, 'come', 'comes')} up with a stone that is flat on one side only, which is the wrong number of sides.`);
    redraw(); };
  const end = () => { g.over = true; g.phase = 'over'; const a = sum(g.mine), b = sum(g.his), W = a > b; mgDeed(W ? 'b8SkipWon' : 'b8SkipLost'); AUDIO.play(W ? 'win' : a === b ? 'click' : 'lose');
    g.talk = mgSay('Benlo', W ? `"${a} to my ${b}." He shakes his head. "Soldiers. Eh. Good arm." He looks out at the lake, and the lamps along it, and not at the city behind. "Good to throw something, tonight. Into something that just takes it."` : a === b ? `"${a} each." He shrugs. "The lake can't make its mind up. Nor can I, tonight."` : `"${b} to your ${a}." He wipes his hands on his apron. "All my life on this shore. I would have been ashamed to lose. Tonight I'd not have minded." He means it.`) +
      b8gSay({brannoc:() => mgSay('Brannoc', '"Nine, in Falar, is a poor throw," Brannoc says. No one believes him, and he looks pleased about that.'), vasso:() => mgSay('Vasso', '"I used to come down here as a boy," Vasso says. "Before the Guild. I\'d forgotten." He picks up a stone, and holds it, and does not throw it.'), _:() => mgSay('', 'Along the shore the bells are still going, one at a time, for the dead.')}); redraw(); };
  mgKeys({f:() => pick(), ' ':() => { const b = $('#skDone') || $('#skUp') || $('#skSet'); b && !b.disabled && b.click(); }});
  /* the shore: the lake black and wide, the blue lamps coming on along it, the shingle, the arm and its marks, the rings of a stone going out */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now(), mo = REDUCE() ? 0 : 1;
    b6gNight(ctx, W, H, t, {top:'#060810', mid:'#1a2230', cut:.38, low:'#0a0c10', seed:9831});
    ctx.fillStyle = '#0a0e16'; ctx.fillRect(0, H*.38, W, H*.34); // the lake
    for (let i = 0; i < 9; i++) { const x = W*(.04 + i*.12), y = H*(.37 + hash(i, 9832)*.02); glow(ctx, x, y, 6, '#8ab8ff', .7); ctx.fillStyle = 'rgba(120,170,255,.18)'; for (let k = 1; k < 5; k++) ctx.fillRect(x - 2 + Math.sin(t/400 + k + i)*mo*2, y + k*H*.03, 4, 1); } // the blue lamps along the far shore, and their light on the water
    ctx.fillStyle = '#2a2a2e'; ctx.beginPath(); ctx.moveTo(0, H*.72); for (let i = 0; i <= 8; i++) ctx.lineTo(W*i/8, H*(.71 + hash(i, 9833)*.03)); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill(); // the shingle
    if (g.fly) { const k = Math.min(1, (now - g.fly.t) / 1000), n = g.fly.n, x0 = g.fly.me ? W*.24 : W*.7;
      for (let i = 0; i < n; i++) { const fx = x0 + (W*.82 - x0) * (i + 1) / (n + 1) * (g.fly.me ? 1 : -.9), fy = H*(.66 - .26*(i + 1)/(n + 1)), at = (i + 1) / (n + 1);
        if (k >= at) { const r = (k - at) * 40 + 3; ctx.strokeStyle = `rgba(160,200,255,${(.6*(1 - k*.6)).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(fx, fy, r, r*.25, 0, 0, 7); ctx.stroke(); } } }
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b8_c1_benlo', W*.84, H*.88, fs, t, {still:g.phase !== 'benlo', dir:-1}); drawFigure(ctx, 'sgt', W*.16, H*.9, fs, t, {still:!(g.phase === 'angle' || g.phase === 'power'), dir:1});
    const mate = ['brannoc', 'vasso', 'brisk'].find(k => b8In(k)); if (mate) drawFigure(ctx, mate, W*.3, H*.9, fs*.9, t, {still:true, dir:1, phase:2});
    if (g.phase === 'angle' || g.phase === 'power') { const cx = W*.5, cy = H*.86, R0 = Math.min(W*.18, H*.12); // the gauge: the arm's angle, then the strength
      ctx.strokeStyle = 'rgba(232,192,115,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R0, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
      const a = g.phase === 'angle' ? swing() : g.a, ang = Math.PI*1.5 + a*Math.PI*.4; ctx.strokeStyle = g.phase === 'angle' ? '#f2d488' : 'rgba(242,212,136,.5)'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ang)*R0, cy + Math.sin(ang)*R0); ctx.stroke();
      ctx.fillStyle = '#9fd0e8'; ctx.fillRect(cx - 1, cy - R0 - 6, 2, 6); // flat
      if (g.phase === 'power') { const bw = W*.4, bx = cx - bw/2, by = H*.96, p = power(); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(bx, by, bw, 6); ctx.fillStyle = '#e8c073'; ctx.fillRect(bx, by, bw*p, 6); ctx.fillStyle = '#9fd0e8'; ctx.fillRect(bx + bw*.82 - 1, by - 4, 2, 14); } } };
  g.talk = mgSay('', 'Benlo comes down off the street with his barrow and his cold brazier, and sits on the shingle by the Fourth\'s fire without asking, as everybody is doing tonight. He has a pocket full of flat stones. He does not say what they are for. Then he throws one.') +
    mgSay('Benlo', '"Three each, Sergeant. Most skips. I have done this on this shore every bad night since I was a boy." He weighs a stone. "There have been a few."') +
    b8gSay({brisk:() => mgSay('', 'Brisk sits down on the shingle with her shield beside her, and for once keeps her back to the roofs.'), _:''});
  redraw();
}
/* what the shingle leaves behind, once a book: the regard of the one who needed the evening most, or a salve */
function b8SkipPay(r){ if (!r) return; S.f.b8_skip = {mine:r.mine, his:r.his, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b8_skipPaid) { const low = S.squad.filter(k => k !== 'sgt' && b8In(k) && S.loy && S.loy[k] != null).sort((a, b) => S.loy[a] - S.loy[b])[0];
    S.f.b8_skipPaid = b8gRegard(low ? [low] : [], 'Benlo leaves a pot of goose-grease for the squad\'s hands. "For the cold," he says.'); }
  save(); }

/* ---- the Deeds page: Book Eight's fires, under the Contract ---- */
{ const _de = b8DeedsExtra; b8DeedsExtra = function(mine){ const out = _de(mine), d = k => mine.reduce((a, {s}) => a + (((s.deeds || {})[k]) || 0), 0);
    const rows = [['Orsa\'s Cup', d('b8CupWon') ? 'The cup paid' : d('b8CupLost') ? 'The ones bit' : 'Not yet'],
      ['The Last Peg', d('b8PegWon') ? 'The carter stood the dog watch' : d('b8PegLost') ? 'The dog watch was yours' : 'Not yet'],
      ['Lamp and Stone', d('b8LampWon') ? 'Found them in the dark' : d('b8LampLost') ? 'The dark had them' : 'Not yet'],
      ['Keep the Fire', d('b8FireWon') ? 'Kept in till morning' : d('b8FireLost') ? 'It went out, and was lit again' : 'Not yet'],
      ['Stones on the Water', d('b8SkipWon') ? 'Most skips, the night after' : d('b8SkipLost') ? 'Benlo\'s lake' : 'Not yet']];
    return out + `<h4 class="jh">At the fires</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }; }

/* ---- the chapters' fires: the games offered beside the squad's talk, and what they leave behind ---- */
{ const wrap = (CH, id, f) => { const _n = CH.dlg[id]; if (!_n) return; CH.dlg[id] = () => { const n = _n(); return f(n) || n; }; };
  const after = (n, t, ch) => { const i = n.ch.findIndex(c => typeof c.t === 'string' && new RegExp(t).test(c.t)); n.ch = n.ch.slice(); n.ch.splice(i < 0 ? n.ch.length - 1 : i + 1, 0, ...ch); return n; };
  const jn = (CH, fn) => { const j = CH.journal; if (j) CH.journal = () => { const x = j(), l = fn(); if (l) x.unshift(l); return x; }; };
  /* Ch1: Orsa's Cup, down the steps under the cobbler's, once the lanes are open (phase 3 on) */
  if (typeof B8CH1 !== 'undefined') { wrap(B8CH1, 'b8_c1_fire', n => after(n, '^Talk with the squad', [{t:'Down the steps to Orsa\'s den, for one die in a leather cup.', tag:'Orsa\'s Cup', req:()=>(S.f.b8_c1_ph || 1) >= 3 && !(S.f.b8_cup && S.f.b8_cup.done) && (S.silver || 0) >= 1, go:()=>playB8Cup({after:r => { b8CupPay(r); S.f.b8_cupLast = r; talk('b8_c1_cup_after'); }})}]));
    B8CH1.dlg.b8_c1_cup_after = () => { const r = S.f.b8_cupLast || {}; return b8gAfter('The Fourth\'s door', 'b8_door', 'b8_c1_fire', !r.done ?
`You leave Orsa's table before the stake is down. She does not mind. The den is full, and there is always someone who thinks the cup likes them.` : (r.pay || 0) > 0 ?
`You come back up the steps into the winter dark ${r.pay} silver heavier. ${b8In('kettle') ? 'Kettle writes it in the ledger under a column she has headed "Luck", and underlines it twice, and then crosses out the heading.' : 'Behind you, down in the den, the cup is already going round again.'}` : (r.pay || 0) < 0 ?
`You come back up the steps into the winter dark ${-r.pay} silver lighter. ${b8In('brisk') ? 'Brisk looks at your purse, and then at the steps. "Every winter," she says. "That woman."' : 'The lanes are quiet, and the lamps are blue, and the cup has your silver.'}` :
`You come back up the steps with what you went down with, which in the Gadrobi lanes is a kind of winning.`); };
    jn(B8CH1, () => { const r = S.f.b8_cupLast; return r && r.done ? (r.won ? 'Down the steps in the Gadrobi lanes, the sergeant played Orsa\'s cup, and banked to twenty first.' : 'Down the steps in the Gadrobi lanes, the sergeant played Orsa\'s cup. The ones bit.') : ''; }); }
  /* Ch2: the Last Peg, on a carter's tailboard at the caravan's fire, before the last wagon is decided */
  if (typeof B8CH2 !== 'undefined') { wrap(B8CH2, 'b8_c2_fire', n => after(n, '^Talk with the squad', [{t:'A carter has fifteen pegs on a tailboard and the dog watch to lose. The Last Peg.', tag:'The Last Peg', req:()=>(S.f.b8_c2_ph || 1) <= 5 && !(S.f.b8_peg && S.f.b8_peg.done), go:()=>playB8Peg({after:r => { b8PegPay(r); S.f.b8_pegLast = r; talk('b8_c2_peg_after'); }})}]));
    B8CH2.dlg.b8_c2_peg_after = () => { const r = S.f.b8_pegLast || {}; return b8gAfter('The caravan\'s fire', 'b8_caravan_night', 'b8_c2_fire', !r.done ?
`You leave the tailboard with the pegs still on it. The carter does not mind. He plays the rest against himself, and loses, and complains about it to the dark.` : r.won ?
`${r.mine} rounds to ${r.his}, and ${numw(B8G_PEGPAY)} silver of the carter's watch-money in your hand. Later, when you wake, he is up on the wagon box with a blanket round him, glaring at the old Domin. ${b8In('brannoc') ? 'Brannoc says he would have won in Falar too, and goes back to sleep before anybody can argue.' : 'The Fourth sleeps the night through, which it has not done since the city.'}` :
`${r.his} rounds to ${r.mine}. The dog watch is the Fourth's. ${b8In('kettle') ? 'Kettle sits it with you, and explains the pegs, in fours, backwards, twice, until the dark is less interesting than the counting.' : 'You sit up with the dark. It does not do much. Out in the rows, very faint, something sings.'}`); };
    jn(B8CH2, () => { const r = S.f.b8_pegLast; return r && r.done ? (r.won ? 'At the caravan\'s fire the sergeant played the Last Peg with a carter, and won his watch-money off him.' : 'At the caravan\'s fire the sergeant played the Last Peg with a carter, and stood the dog watch.') : ''; }); }
  /* Ch3: Lamp and Stone with Thessaly, at the lodging, once she has been met at the gate */
  if (typeof B8CH3 !== 'undefined') { wrap(B8CH3, 'b8_c3_fire', n => after(n, '^Talk with the squad', [{t:'Thessaly is off her ledger, with a bag of black stones and a shuttered lamp. An Andii game of the dark.', tag:'Lamp and Stone', req:()=>!!S.f.b8_c3_thessaly && !(S.f.b8_lamp && S.f.b8_lamp.done), go:()=>playB8Lamp({after:r => { b8LampPay(r); S.f.b8_lampLast = r; talk('b8_c3_lamp_after'); }})}]));
    B8CH3.dlg.b8_c3_lamp_after = () => { const r = S.f.b8_lampLast || {}, p = S.f.b8_lampPaid; return b8gAfter('The lodging', 'b8_c3_lodging', 'b8_c3_fire', !r.done ?
`You leave the cloth with stones still on it. Thessaly does not mind. She plays a round by herself, with the lamp shut, and finds them all, and goes down the stair without saying whether she did.` : r.won ?
`${r.mine} rounds to the dark's ${r.lost}. ${p === 'tuft' ? 'Tuft sits on at the sill when Thessaly has gone, with the shutters open on the lamps, looking at the dark between them as if it might look back. She seems easier for it.' : p === 'edrem' ? 'Edrem walks Thessaly down the stair with a lamp, which is not done in Black Coral, and comes back up looking pleased with himself in a quiet way.' : 'Thessaly leaves a pot of the chandler\'s wax salve on the sill, for the Fourth\'s cuts. "Winnings," she says. "They would not have paid. I am not them."'}` :
`The dark's, ${r.lost} rounds to ${r.mine}. ${b8In('tuft') ? 'Tuft says she will get the next one. There will not be a next one, and she knows it, and says it anyway.' : 'Outside the lamps burn on, at noon, at midnight, at whatever it is.'}`); };
    jn(B8CH3, () => { const r = S.f.b8_lampLast; return r && r.done ? (r.won ? 'In Black Coral, Thessaly taught the Fourth a game the Andii play in the dark, and the sergeant found the stones.' : 'In Black Coral, Thessaly taught the Fourth a game the Andii play in the dark. The dark had the stones.') : ''; }); }
  /* Ch4: Keep the Fire with Hurrin and the pilgrims, the day after the water line (Hurrin met) and the morning after; never the bad night */
  if (typeof B8CH4 !== 'undefined') { wrap(B8CH4, 'b8_c4_fire', n => after(n, '^Talk with the squad', [{t:'Hurrin and a few of the pilgrims are feeding a small fire against the dark. Sit up with them.', tag:'Keep the Fire', req:()=>{ const ph = S.f.b8_c4_ph || 1; return ((ph === 2 && !!S.f.b8_c4_hurrinMet) || ph === 4) && !(S.f.b8_fire && S.f.b8_fire.done); }, go:()=>playB8Fire({after:r => { b8FirePay(r); S.f.b8_fireLast = r; talk('b8_c4_fire_after'); }})}]));
    B8CH4.dlg.b8_c4_fire_after = () => { const r = S.f.b8_fireLast || {}, p = S.f.b8_firePaid; return b8gAfter('The camp\'s edge', 'b8_camp_night', 'b8_c4_fire', !r.done ?
`You leave Hurrin's fire to Hurrin. He does not mind. He has kept fires on his own before, up north, all winter.` : r.won ?
`The bells said morning, and the fire was still in. ${p === 'edrem' ? 'Edrem sits by the Fourth\'s own fire after, with his back to the rows and his face to the dark, the way he does. "That was a good thing," he says. It is the most he has said all day.' : 'One of the pilgrims brings a twist of willow bark to the Fourth\'s fire, for the cuts, and goes away again before anyone can thank her.'}` :
`It went out, and somebody lit it again, and the dark went back where it was. ${b8In('ohl') ? 'Ohl says a fire is only wood, and the pilgrims will be all right, and does not sound as though he is sure of either.' : 'Whose fire it was that went out, the edge keeps to itself. Everybody knows.'}`); };
    jn(B8CH4, () => { const r = S.f.b8_fireLast; return r && r.done ? (r.won ? 'At the camp\'s edge the sergeant sat up with Hurrin and the pilgrims and kept their fire in until the bells said morning.' : 'At the camp\'s edge the sergeant sat up with Hurrin and the pilgrims. Their fire went out, and was lit again.') : ''; }); }
  /* Ch7: Stones on the Water with Benlo, on the shingle the evening after, before the roads */
  if (typeof B8CH7 !== 'undefined') { wrap(B8CH7, 'b8_c7_fire', n => after(n, '^Talk with the squad', [{t:'Benlo has come down to the shingle with a pocket of flat stones. Stones on the water.', tag:'Stones on the Water', req:()=>(S.f.b8_c7_ph || 1) === 3 && !S.f.b8_c7_key && !(S.f.b8_skip && S.f.b8_skip.done), go:()=>playB8Skip({after:r => { b8SkipPay(r); S.f.b8_skipLast = r; talk('b8_c7_skip_after'); }})}]));
    B8CH7.dlg.b8_c7_skip_after = () => { const r = S.f.b8_skipLast || {}, p = S.f.b8_skipPaid; return b8gAfter('The lake shore', 'b8_lakeshore', 'b8_c7_fire', !r.done ?
`You put the stone down on the shingle. Benlo does not mind. He throws the rest himself, one at a time, and watches each one go.` : r.won ?
`${r.mine} skips to Benlo's ${r.his}. ${p && p !== 'salve' && b8In(p) ? `${NAME(p)} threw the last of Benlo's stones, after, badly, and laughed, and then looked surprised at having laughed. ${b8gHe(p) === 'she' ? 'She' : 'He'} sits closer to the fire after that.` : 'Benlo leaves a pot of goose-grease on the shingle for the squad\'s hands when he goes. "For the cold," he says.'}` :
`${r.his} skips to your ${r.mine}${r.tie ? '. Nobody\'s' : '. Benlo\'s'}. He goes back up to the street with his barrow, slowly, and the bells go on over the water.`); };
    jn(B8CH7, () => { const r = S.f.b8_skipLast; return r && r.done ? (r.won ? 'The night after, on the shingle, the sergeant skipped stones across the lake with Benlo, and threw the most.' : 'The night after, on the shingle, the sergeant skipped stones across the lake with Benlo.') : ''; }); }
}
