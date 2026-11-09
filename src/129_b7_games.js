/* ============ Book Seven: the games at the fires (v10.0) ============ */
/* Book Seven keeps its games here and wraps the chapters' fire nodes from this file, as Book Six does (109), so the chapter files 121-127
   are untouched. Five games, one at each fire the plan names (docs/rg-games-notes.md):
   - Ships (Ch1, the Third, b7_c1_fire): ship, captain and crew, five dice on a marine's shield above the beach, the night the transports
     burn. Silver, because a dice game among soldiers is where money is the scene. Net capped at 10 silver.
   - Pass the Debt (Ch2, the Letherii, b7_c2_fire): clay debt-tokens and a spun dock against the company clerk. A line left off the night
     roll (a page of the file), or Perrit's regard, or a salve.
   - The Timer-Count (Ch3, the Third, b7_c3_fire): a bitten acid timer under a helmet, counted in the dark against a marine sapper. A burner.
   - The Horse-Trade (Ch4, the Letherii, b7_c4_fire): three remounts off a Bluerose horse-coper on the company's purse. Sorvan's regard,
     or a pot of liniment (a salve).
   - The Rat Catchers' Wager (Ch7, the Third, b7_c7_fire): a slate of words the crowd might shout for the new king, and the crowd's word
     as the Third hears it from the corner. Silver, a wager. Net capped at 8.
   Each is declinable (the fire's own choices stay), played once a book, pays once as the table closes, and keeps its deeds on S.deeds.
   They use the tables' frame (36), Book Five's in-game check (89: b5gRoll and its tiers) and Book Six's night sky (109: b6gNight). */

const b7gOn = () => b5gOn(), b7gPick = a => b5gPick(a), b7gRoll = (s, dc, who, e) => b5gRoll(s, dc, who, e), b7gRollHTML = r => b5gRollHTML(r);
const b7gText = (...a) => b5gText(...a);
const B7G_SHE = ['haddat', 'sathi', 'marrow', 'mirrel', 'hessa', 'rasp', 'wenna', 'perrit', 'ammet', 'pessa', 'brune', 'ilsa'];
const b7gHe = id => id === 'sgt' ? 'you' : B7G_SHE.includes(id) ? 'she' : 'he';
const b7gHis = id => id === 'sgt' ? 'your' : B7G_SHE.includes(id) ? 'her' : 'his';
const b7gWho = r => r.who === 'sgt' ? 'You' : NAME(r.who);
const b7gV = (r, you, they) => r.who === 'sgt' ? you : they;
const b7gSp = () => Math.max(.4, SET.speed || 1);
/* a brazier's fire, drawn over the ground (b6gNight's sits under it) */
const b7gFire = (ctx, x, y, t, H) => { const fl = b2Fl(t); ctx.fillStyle = '#2a2420'; ctx.fillRect(x - 9, y, 18, 6); ctx.fillRect(x - 2, y + 6, 4, H*.06);
  ctx.globalCompositeOperation = 'lighter'; glow(ctx, x, y - 4, H*.3, '#ff8a3a', .3*fl); ctx.globalCompositeOperation = 'source-over';
  poly(ctx, [[x - 8, y], [x - 3, y - 16*fl], [x + 1, y - 6], [x + 4, y - 13*fl], [x + 8, y]], 'rgba(255,150,60,.95)'); poly(ctx, [[x - 3, y], [x, y - 7*fl], [x + 3, y]], '#fff1c2'); };
const b7gAfter = (sp, scene, back, txt) => ({sp, scene, txt, ch:[{t:'Back to the fire.', go:back}]});
/* a plain die with dark pips (Book Six's b6gDie has the Falari's red ones) */
function b7gDie(ctx, x, y, s, face, rot = 0, lift = 0, mark = false){ ctx.save(); ctx.translate(x, y - lift); ctx.rotate(rot);
  ell(ctx, 2, s*.55 + lift, s*.5, s*.13, 'rgba(0,0,0,.45)'); const h = s/2, r = s*.16; ctx.beginPath(); ctx.moveTo(-h + r, -h); ctx.arcTo(h, -h, h, h, r); ctx.arcTo(h, h, -h, h, r); ctx.arcTo(-h, h, -h, -h, r); ctx.arcTo(-h, -h, h, -h, r); ctx.closePath();
  const gr = ctx.createLinearGradient(-h, -h, h, h); gr.addColorStop(0, '#e8dcc0'); gr.addColorStop(1, '#a8946c'); ctx.fillStyle = gr; ctx.fill(); ctx.strokeStyle = mark ? '#e8c073' : 'rgba(40,24,12,.6)'; ctx.lineWidth = mark ? 2 : 1; ctx.stroke();
  ({1:[[0,0]], 2:[[-1,-1],[1,1]], 3:[[-1,-1],[0,0],[1,1]], 4:[[-1,-1],[1,-1],[-1,1],[1,1]], 5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]], 6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]}[face] || []).forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a*s*.26, b*s*.26, s*.08, 0, 7); ctx.fillStyle = '#2a1a10'; ctx.fill(); });
  ctx.restore(); }

/* ============ 1. Ships, above the burning beach ============
   Below the dune the transports burn; above it a squad of marines has a shield face up on the sand and five dice. Ship, captain and crew:
   three throws to set aside a six (the ship), then a five (the captain), then a four (the crew), in that order. The two dice left are the
   cargo, and with throws left you may throw the cargo again. No crew by the third throw and you are sunk, nothing. The marine throws first;
   the higher cargo takes the stake, 1 to 3 silver; a tie is a push. Once a sitting, sunk after the third throw, you may say a die went in
   the sand (Guile; Sathi, if she walks, with an edge): made, one more throw; "yes, but", one more throw, and a silver for the marine's
   rum. Silver, net capped at 10 over the book, paid as the shield is picked up; played once. */
const B7G_SHIPSCAP = 10, B7G_CREW = [6, 5, 4];
const b7gShipsSay = h => !h.throws ? 'nothing yet' : h.got === 3 ? `ship, captain and crew, ${h.cargo} in the hold` : ['no ship', 'a ship, no captain', 'a ship and a captain, no crew'][h.got];
function playB7Ships(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b7gSp());
  const fresh = () => ({got:0, dice:[1, 1, 1, 1, 1], throws:0, cargo:null});
  const g = MG.state = {me:fresh(), opp:fresh(), phase:'stake', stake:null, net:0, games:0, won:0, lost:0, push:0, talk:'', check:null, callUsed:false, roll:0, who:null, paid:false};
  const capLeft = () => Math.max(0, B7G_SHIPSCAP - (S.f.b7_shipsNet || 0));
  const purse = () => (S.silver || 0) + g.net;
  const result = () => ({net:g.net, games:g.games, won:g.won, lost:g.lost, push:g.push, pay:g.pay || 0});
  const settle = () => { if (g.paid) return; g.paid = true; const pay = g.net > 0 ? Math.min(g.net, capLeft()) : Math.max(g.net, -(S.silver || 0));
    S.silver = (S.silver || 0) + pay; updSilver(); g.pay = pay; if (pay > 0) S.f.b7_shipsNet = (S.f.b7_shipsNet || 0) + pay; };
  const live = () => ['opp', 'me', 'call'].includes(g.phase);
  mgOpen({kick:'Above the beach · the marines\' shield', title:'Ships', leaveText:'Leave the dice', done:r => opt.after && opt.after(r),
    leave:() => { if (g.stake && live()) { g.net -= g.stake; g.games++; g.lost++; } g.phase = 'over'; settle(); mgClose(Object.assign(result(), {left:true})); }}); on = b7gOn();
  const score = h => h.got === 3 ? h.cargo : 0;
  const throwH = h => { const d = Array.from({length:5 - h.got}, () => 1 + R(6));
    while (h.got < 3) { const i = d.indexOf(B7G_CREW[h.got]); if (i < 0) break; d.splice(i, 1); h.got++; }
    h.dice = d; h.throws++; h.cargo = h.got === 3 ? d[0] + d[1] : null; };
  const say = (who, line) => { g.talk = mgSay(who, line); draw(); };
  const draw = () => { if (g.phase === 'stake') return stakePick();
    const again = g.phase === 'over' && purse() >= 1 && (S.f.b7_shipsNet || 0) + Math.max(0, g.net) < B7G_SHIPSCAP;
    mgPanel(`<div class="cpbar"><span>The marine: <b>${b7gShipsSay(g.opp)}</b></span><span>You: <b>${b7gShipsSay(g.me)}</b></span><span>Stake ${g.stake}</span></div>
      ${g.talk}${b7gRollHTML(g.check)}
      ${g.phase === 'over' ? `<div class="row mgbtns">${again ? `<button class="btn primary" id="shAgain" data-bot="1">Another game</button>` : ''}<button class="btn ${again ? '' : 'primary'}" id="shDone" data-bot="1">Back to the fire</button></div>`
      : g.phase === 'call' ? `<div class="row mgbtns"><button class="btn on" id="shCall" data-bot="1">That die went in the sand</button><button class="btn" id="shLet" data-bot="1">Let it go</button></div>`
      : `<div class="row mgbtns"><button class="btn primary" id="shThrow" data-bot="1" ${g.phase === 'me' && !g.roll && g.me.throws < 3 ? '' : 'disabled'}>${g.me.got === 3 ? 'Throw the cargo again' : 'Throw'} (${3 - g.me.throws} left)</button><button class="btn" id="shStand" data-bot="1" ${g.phase === 'me' && !g.roll && g.me.got === 3 ? '' : 'disabled'}>Stand on ${g.me.cargo || 0}</button></div>
        <p class="hint keys"><kbd>Space</kbd> throw · <kbd>S</kbd> stand · <kbd>Esc</kbd> leave</p>`}
      <p class="fine">A six, then a five, then a four, in that order; the two left over are the cargo. Three throws. Higher cargo takes it; a tie is a push. The dice pay at most ${B7G_SHIPSCAP} silver over what you sat down with, once.</p>`);
    if ($('#shThrow')) $('#shThrow').onclick = throwMe; if ($('#shStand')) $('#shStand').onclick = stand;
    if ($('#shCall')) $('#shCall').onclick = call; if ($('#shLet')) $('#shLet').onclick = () => { AUDIO.play('click'); finish(); };
    if ($('#shAgain')) $('#shAgain').onclick = () => { AUDIO.play('click'); g.phase = 'stake'; stakePick(); };
    if ($('#shDone')) $('#shDone').onclick = () => { AUDIO.play('click'); settle(); mgClose(result()); }; };
  const tumble = (who, cb) => { g.roll = performance.now(); g.who = who; AUDIO.play('shuffle'); draw(); T(() => { g.roll = 0; AUDIO.play('dice', true); cb(); }, REDUCE() ? 150 : 600); };
  const oppTurn = () => { if (g.phase !== 'opp') return; tumble('opp', () => { throwH(g.opp); const o = g.opp;
      if (o.throws >= 3 || (o.got === 3 && o.cargo >= 7)) { g.phase = 'me'; say('The marine', o.got === 3 ? `"${o.cargo} in the hold," he says. ${o.cargo >= 9 ? '"Beat that, heavy."' : '"Your throw."'}` : '"Sunk," he says, cheerfully. "Like everything else tonight. Your throw."'); }
      else { say('The marine', o.got === 3 ? `"${o.cargo}. Not enough." He scoops the cargo.` : b7gPick(['"Come on, little ship."', `"${['No ship', 'No captain', 'No crew'][o.got]}." He blows on the dice.`, 'He throws again without looking.'])); T(oppTurn, 650); } }); };
  const throwMe = () => { if (g.phase !== 'me' || g.roll || g.me.throws >= 3) return; g.check = null;
    tumble('me', () => { throwH(g.me); const h = g.me;
      if (h.throws >= 3) { if (h.got < 3 && !g.callUsed) { g.phase = 'call'; return say('', `${b7gShipsSay(h)}, after three. Sunk, unless one of those dice went into the sand. It is very soft sand.`); } return finish(); }
      say('', h.got === 3 ? `Ship, captain and crew. ${h.cargo} in the hold, and ${3 - h.throws} throw${h.throws === 2 ? '' : 's'} left to better it.` : `${b7gShipsSay(h)}. ${3 - h.throws} throw${h.throws === 2 ? '' : 's'} left.`); }); };
  const stand = () => { if (g.phase !== 'me' || g.roll || g.me.got !== 3) return; AUDIO.play('click'); finish(); };
  /* the check: a die in the sand (Guile 13). Made: one more throw. Yes, but: one more throw, and a silver for the marine's rum. */
  const call = () => { if (g.phase !== 'call') return; g.callUsed = true; AUDIO.play('click');
    const r = g.check = b7gRoll('guile', 13, null, [['she has argued dice off every blanket from Hissar to here', 2, 'sathi'], ['he counts the faces as they fall', 1, 'tangle'], ['you have heard every argument a dice game can hold', 1, 'sgt']]);
    if (r.ok) { g.me.throws = 2; g.phase = 'me'; say('', `${b7gWho(r)} ${b7gV(r, 'point', 'points')} at the sand by the shield's rim, where a die is half buried and leaning. "Cocked," ${b7gV(r, 'you say', b7gHe(r.who) + ' says')}. The marine looks at it, and at the ships burning, and shrugs. "Throw it again, then. Tonight of all nights."`); }
    else if (r.tier === 'near') { g.me.throws = 2; g.phase = 'me'; g.net -= 1; say('The marine', `"Fine. Throw it." He holds out a hand. "A silver for my rum, heavy, for the argument. We burned the rum with the boats." <span class="dim">(−1)</span>`); }
    else { say('The marine', '"Flat as a plank. Everyone saw." Everyone did.'); T(finish, 700); } };
  const finish = () => { if (g.phase === 'over' || g.phase === 'stake') return; g.phase = 'over'; g.games++; const a = score(g.me), b = score(g.opp);
    if (a > b) { g.net += g.stake; g.won++; mgDeed('b7ShipsWon'); AUDIO.play('coin'); say('The marine', `You take ${g.stake} silver. ${b7gPick(['"Heavies," he says, to his squad. "They float, apparently."', '"There goes my pay. Not that there is anywhere to spend it now."'])}`); }
    else if (a < b) { g.net -= g.stake; g.lost++; mgDeed('b7ShipsLost'); AUDIO.play('click'); say('The marine', `He takes ${g.stake} silver. ${b7gPick(['"Sorry, Sergeant. The sea is not your friend tonight."', '"Ships," he says, and nods down the dune at the burning. "Never trust them."'])}`); }
    else { g.push++; AUDIO.play('click'); say('The marine', a ? `"${a} each. Push." He pushes the stake back across the shield.` : '"Both sunk. Push." He pushes the stake back. "Seems fitting."'); } };
  const stakePick = () => { g.me = fresh(); g.opp = fresh(); g.callUsed = false; g.stake = null; g.check = null;
    mgPanel(`${g.talk}${mgSay('The marine', b7gPick(['"Ships, Sergeant. Seemed the night for it."', '"Sit in, heavy. We play for silver. There is nothing left to buy with it, so it is pure sport."']))}<p class="fine">What's the stake? You have ${purse()} silver.</p>
      <div class="row mgbtns">${[1, 2, 3].map(n => `<button class="btn ${n === 1 ? 'primary' : ''}" data-st="${n}" data-bot="1" ${purse() >= n ? '' : 'disabled'}>${n} silver</button>`).join('')}</div>
      <p class="fine">Five dice, three throws. Set aside a six, the ship; then a five, the captain; then a four, the crew, in that order. The two dice left are the cargo, and you may throw the cargo again while you have throws. No crew by the third throw and you are sunk. Once a sitting, a die can be argued.</p>`);
    document.querySelectorAll('#mgPanel [data-st]').forEach(b => b.onclick = () => { AUDIO.play('coin'); g.stake = +b.dataset.st; g.phase = 'opp'; g.talk = mgSay('', 'The marine throws first. The house always does.'); draw(); T(oppTurn, 500); }); };
  mgKeys({' ':() => { if (g.phase === 'over') { const b = $('#shAgain') || $('#shDone'); b && b.click(); } else if (g.phase === 'stake') { const b = $('#mgPanel [data-st]:not([disabled])'); b && b.click(); } else if (g.phase === 'call') call(); else throwMe(); }, s:stand});
  /* the dune: the sea below with the transports burning far out along it, their light on the water; sand; a shield face up; the dice */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, mo = REDUCE() ? 0 : 1;
    b6gNight(ctx, W, H, t, {top:'#05060c', mid:'#2a1612', cut:.34, low:'#0e0a08', seed:9401});
    ctx.fillStyle = '#0a0e14'; ctx.fillRect(0, H*.3, W, H*.16); // the sea
    for (let i = 0; i < 7; i++) { const x = W*(.06 + i*.145) + hash(i, 9402)*W*.04, y = H*(.31 + hash(i, 9403)*.03), fl = mo ? .7 + .3*Math.sin(t/180 + i*1.7) : .85;
      ctx.globalCompositeOperation = 'lighter'; glow(ctx, x, y, H*.09, '#ff7a2a', .35*fl); ctx.globalCompositeOperation = 'source-over';
      poly(ctx, [[x - 4, y], [x, y - 9*fl], [x + 4, y]], 'rgba(255,160,70,.9)'); ctx.fillStyle = `rgba(255,140,60,${(.25*fl).toFixed(2)})`; for (let k = 1; k < 5; k++) ctx.fillRect(x - 3 + Math.sin(t/300 + k)*mo*2, y + k*H*.02, 6, 1); } // the ships, burning at their anchors, and their light on the water
    ctx.fillStyle = '#2a2016'; ctx.beginPath(); ctx.moveTo(0, H*.46); for (let i = 0; i <= 8; i++) ctx.lineTo(W*i/8, H*(.44 + hash(i, 9404)*.05)); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill(); // the dune
    const fs = clamp(H/96, 1.5, 3.4); drawFigure(ctx, 'b2soldier', W*.84, H*.72, fs, t, {still:!(g.who === 'opp' && g.roll), dir:-1, phase:1}); drawFigure(ctx, 'b2soldier', W*.94, H*.66, fs*.85, t, {still:true, dir:-1, phase:3});
    drawFigure(ctx, 'sgt', W*.13, H*.74, fs, t, {still:!(g.who === 'me' && g.roll), dir:1});
    const sx = W*.5, sy = H*.74, sr = Math.min(W*.24, H*.2); ell(ctx, sx, sy + 4, sr*1.05, sr*.42, 'rgba(0,0,0,.4)'); ell(ctx, sx, sy, sr, sr*.38, '#4a4438'); ctx.strokeStyle = '#7a6a4a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(sx, sy, sr*.92, sr*.33, 0, 0, 7); ctx.stroke(); // the shield, face up
    const s = Math.min(26, W*.06, H*.08), rolling = !!g.roll, k = rolling ? (performance.now() - g.roll) / 600 : 1;
    const row = (h, y, sc, mine) => { const set = B7G_CREW.slice(0, h.got), all = [...set, ...h.dice];
      all.forEach((f, i) => { const x = sx + (i - 2)*s*sc*1.2, isSet = i < set.length, tumbling = rolling && g.who === (mine ? 'me' : 'opp') && !isSet;
        b7gDie(ctx, x, y, s*sc, tumbling ? 1 + (Math.floor(performance.now()/70 + i*2) % 6) : f, tumbling ? k*5 + i : 0, tumbling ? Math.abs(Math.sin(k*7))*8 : 0, isSet); }); };
    if (g.opp.throws || (rolling && g.who === 'opp')) row(g.opp, sy - sr*.16, .8, false);
    if (g.me.throws || (rolling && g.who === 'me')) row(g.me, sy + sr*.2, 1, true);
    if (g.phase === 'opp') b7gText(ctx, 'The marine throws', W*.82, H*.72 - 34*fs, Math.min(15, W*.035)); };
  g.talk = mgSay('', `In the lee of the dune, out of the wind, a squad of marines has a shield laid face up on the sand and five dice going round it. Below them, all along the water, the transports are burning at their anchors. Nobody at the shield looks down at them for long.`) +
    (b7In('tangle') ? mgSay('', 'Tangle sits on his heels at the edge of the light with the satchel in his lap, watching the marines\' dice, and counting.') : b7In('haddat') ? mgSay('Haddat', '"Ships," Haddat says, looking at the dice and then at the water. "They have a sense of humour, the marines. I am told."') : '');
  stakePick();
}
function b7ShipsPay(r){ if (!r || !r.games) return; S.f.b7_ships = {net:r.net, games:r.games, won:r.won, lost:r.lost, pay:r.pay || 0, done:true}; save(); }

/* ============ 2. Pass the Debt ============
   At the Sixth's brazier the company clerk (Book Five's, Indebted himself, ink to the wrist) has a bag of clay debt-tokens and one dock,
   which in this year of short coin is the only dock on the bench. Five debts, one at a time, each starting at 1. Whoever holds a debt takes
   it (it goes on the tally) or passes it: it doubles, and the dock is spun. Face up, the other side has it to take or pass; face down, it
   comes back and the passer takes it, doubled. A debt of 8 cannot be passed. Lowest tally after five wins; a tie is the clerk's. Once a
   game, you may spin the dock yourself (Guile; Tobet, Indebted-born, with an edge): made, it lands face up; "yes, but", face up, and the
   clerk adds a token to your tally for the cheek. For pride and a favour: won, the clerk leaves the squad's night off the roll he copies
   for the grey coats (a page of the file, b7Filed(-1)); with nothing on the file to lose, Perrit's regard if she walks; else a salve. */
const B7G_DEBTS = 5, B7G_DEBTMAX = 8;
function playB7Debt(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b7gSp());
  const g = MG.state = {n:0, v:1, holder:'me', mine:0, his:0, phase:'intro', over:false, talk:'', check:null, spunUsed:false, spin:0, face:null};
  const result = () => ({mine:g.mine, his:g.his, debts:g.n, won:g.over && g.mine < g.his, done:g.over});
  mgOpen({kick:'The Sixth\'s brazier · the clerk\'s bench', title:'Pass the Debt', leaveText:'Leave the bench', done:r => opt.after && opt.after(r), leave:() => mgClose(Object.assign(result(), {left:true, done:false, won:false}))}); on = b7gOn();
  const other = w => w === 'me' ? 'him' : 'me';
  const draw = () => { const mine = g.phase === 'mine';
    mgPanel(`<div class="cpbar"><span>${g.over ? 'The bag is empty' : `Debt ${g.n + 1} of ${B7G_DEBTS}: <b>${g.v}</b>`}</span><span>Your tally <b>${g.mine}</b> · the clerk's <b>${g.his}</b></span><span>Lowest wins</span></div>
      ${g.talk}${b7gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="dbDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' ? `<button class="btn primary" id="dbGo" data-bot="1">The first debt</button>`
        : mine ? `<button class="btn" id="dbTake" data-bot="1">Take it (${g.v})</button><button class="btn primary" id="dbPass" data-bot="1" ${g.v >= B7G_DEBTMAX ? 'disabled' : ''}>Pass it (${g.v * 2}) and spin</button>${!g.spunUsed && g.v < B7G_DEBTMAX ? `<button class="btn" id="dbSpin" data-bot="1">Pass it, and spin the dock yourself (once)</button>` : ''}`
        : `<button class="btn" disabled data-bot="1">${g.spin ? 'The dock is spinning' : 'The clerk is thinking'}</button>`}</div>
      <p class="fine">Take a debt onto your tally, or pass it: it doubles and the dock is spun. Face up, the clerk has it; face down, it comes back to you, doubled, and is yours. A debt of ${B7G_DEBTMAX} cannot be passed. Five debts; lowest tally wins; a tie is the clerk's.</p>
      <p class="hint keys"><kbd>T</kbd> take · <kbd>P</kbd> pass · <kbd>D</kbd> spin it yourself · <kbd>Esc</kbd> leave</p>`);
    if ($('#dbGo')) $('#dbGo').onclick = () => { AUDIO.play('click'); next(); };
    if ($('#dbTake')) $('#dbTake').onclick = () => take('me');
    if ($('#dbPass')) $('#dbPass').onclick = () => pass('me');
    if ($('#dbSpin')) $('#dbSpin').onclick = () => spinSelf();
    if ($('#dbDone')) $('#dbDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const next = () => { if (g.over) return; if (g.n >= B7G_DEBTS) return end(); g.v = 1; g.holder = g.n % 2 ? 'him' : 'me'; g.check = null;
    if (g.holder === 'me') { g.phase = 'mine'; g.talk = mgSay('The clerk', b7gPick(['He sets a token in front of you. "One dock owed. Yours, Sergeant."', '"A small one," he says, setting it down. "They start small."'])); draw(); }
    else { g.phase = 'his'; g.talk = mgSay('The clerk', 'He sets a token in front of himself, and considers it.'); draw(); T(clerk, 700); } };
  const take = w => { if (g.over || (w === 'me' && g.phase !== 'mine')) return; if (w === 'me') g.mine += g.v; else g.his += g.v; AUDIO.play('coin');
    g.talk = mgSay(w === 'me' ? '' : 'The clerk', w === 'me' ? `You take the ${g.v} onto your tally.` : `"${g.v}," he says, and writes it down, though there is no need. "On mine."`);
    g.n++; g.phase = 'between'; draw(); T(next, 600); };
  const spinTo = (w, up, after) => { g.phase = 'spin'; g.spin = performance.now(); AUDIO.play('shuffle'); draw();
    T(() => { g.spin = 0; g.face = up; AUDIO.play(up === (w === 'me') ? 'coin' : 'miss'); after(); }, REDUCE() ? 150 : 700); };
  const pass = (w, forced) => { if (g.over || g.v >= B7G_DEBTMAX || (w === 'me' && g.phase !== 'mine')) return; g.v *= 2;
    const up = forced != null ? forced : R(2) === 0;
    spinTo(w, up, () => { const pre = g.pre || ''; g.pre = ''; if (up) { g.holder = other(w);
        if (g.holder === 'me') { g.phase = 'mine'; g.talk = pre + mgSay('The clerk', `Face up. He slides the ${g.v} across the bench to you, politely.`); draw(); }
        else { g.phase = 'his'; g.talk = pre + mgSay('', `Face up. The ${g.v} goes across the bench to the clerk.`); draw(); T(clerk, 700); } }
      else { if (w === 'me') g.mine += g.v; else g.his += g.v; g.talk = pre + mgSay(w === 'me' ? 'The clerk' : '', w === 'me' ? `Face down. "Back to you, Sergeant, doubled. ${g.v}." He says it kindly. That is worse.` : `Face down. The ${g.v} comes back to the clerk, and he writes it down against himself with great care.`); g.n++; g.phase = 'between'; draw(); T(next, 700); } }); };
  /* the check: spin the dock yourself (Guile 13). Made: face up. Yes, but: face up, and a token on your tally for the cheek. */
  const spinSelf = () => { if (g.over || g.phase !== 'mine' || g.spunUsed || g.v >= B7G_DEBTMAX) return; g.spunUsed = true; AUDIO.play('click');
    const r = g.check = b7gRoll('guile', 13, null, [['an Indebted child spins a dock before it can count one', 2, 'tobet'], ['she has watched clerks palm coin for six years', 1, 'ilsa'], ['you have spun a coin on a barracks bench before', 1, 'sgt']]);
    if (r.ok) g.pre = mgSay('', `${b7gWho(r)} ${b7gV(r, 'spin', 'spins')} the dock with a flick that keeps it on its edge a long while before it settles.`);
    else if (r.tier === 'near') { g.mine += 1; g.pre = mgSay('The clerk', `"I saw the thumb, Sergeant." He puts a token on your tally for the cheek while the dock is still going round. <span class="dim">(+1 to your tally)</span>`); }
    else g.pre = mgSay('', 'The dock goes off the edge of the bench and rolls under it.');
    pass('me', r.ok || r.tier === 'near'); };
  /* the clerk: takes the small ones while he is ahead, passes the rest, and has to take an 8 */
  const clerk = () => { if (g.over || g.phase !== 'his') return; const v = g.v;
    if (v >= B7G_DEBTMAX || (v <= 2 && g.his <= g.mine + 1)) take('him');
    else { g.talk = mgSay('The clerk', b7gPick(['"I think not." He passes it.', '"Doubled, then." He spins.', 'He passes it without looking up from his tally.'])); draw(); pass('him'); } };
  const end = () => { g.over = true; g.phase = 'over'; const W = g.mine < g.his; mgDeed(W ? 'b7DebtWon' : 'b7DebtLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk = mgSay('The clerk', W ? `"${g.mine} to my ${g.his}." He sweeps the tokens into the bag. "I copy the company's night roll for the grey coats every morning," he says, to the bag. "I am getting old. I miss a line, now and then."` : `"${g.mine} to my ${g.his}." He sweeps the tokens into the bag. "The debt always finds the one holding it, Sergeant. That is the whole of Lether in a bag."`); draw(); };
  mgKeys({t:() => take('me'), p:() => pass('me'), d:() => spinSelf(), ' ':() => { const b = $('#dbDone') || $('#dbGo'); b && b.click(); }});
  /* the bench: the barracks yard at night, the brazier, the clerk, the tokens in two piles and the dock spinning */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, mo = REDUCE() ? 0 : 1;
    b6gNight(ctx, W, H, t, {top:'#06080e', mid:'#1a1e24', cut:.36, low:'#12100e', seed:9411});
    ctx.fillStyle = '#2a2a2c'; ctx.fillRect(0, H*.18, W, H*.2); ctx.fillStyle = 'rgba(255,200,110,.5)'; for (let i = 0; i < 5; i++) ctx.fillRect(W*(.1 + i*.19), H*.24, 6, 9); // the bunk-house wall and its windows
    ctx.fillStyle = '#1c1a18'; ctx.fillRect(0, H*.38, W, H*.62); b7gFire(ctx, W*.5, H*.5, t, H);
    ctx.fillStyle = '#5a4430'; ctx.fillRect(W*.18, H*.7, W*.64, H*.06); ctx.fillStyle = '#3a2a1c'; ctx.fillRect(W*.22, H*.76, 6, H*.12); ctx.fillRect(W*.76, H*.76, 6, H*.12); ctx.fillStyle = '#1a1210'; ctx.fillRect(W*.495, H*.7, 2, H*.06); // the bench with the split in it
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b5_c1_clerk', W*.86, H*.74, fs, t, {still:g.phase !== 'his', dir:-1}); drawFigure(ctx, 'sgt', W*.12, H*.76, fs, t, {still:g.phase !== 'mine', dir:1});
    const tok = (x, n, col) => { for (let i = 0; i < Math.min(n, 18); i++) { ell(ctx, x + (i % 2)*3, H*.7 - i*3, 8, 3, col); } };
    tok(W*.28, g.mine, '#a8704a'); tok(W*.72, g.his, '#8a6a52');
    if (!g.over && g.phase !== 'intro') { const tx = g.holder === 'me' ? W*.4 : W*.6; ell(ctx, tx, H*.69, 10, 4, '#c8885a'); b7gText(ctx, String(g.v), tx, H*.69 - 8, 12, '#f2d488'); }
    const cx = W*.5, cy = H*.66, wob = g.spin && mo ? Math.abs(Math.cos(performance.now()/40)) : 1; ell(ctx, cx, cy, 9*wob + 1, 9, g.face === false && !g.spin ? '#6a5a3a' : '#c8a860'); ctx.strokeStyle = 'rgba(60,40,20,.6)'; ctx.beginPath(); ctx.ellipse(cx, cy, 9*wob + 1, 9, 0, 0, 7); ctx.stroke(); // the dock
    if (!g.spin && g.face != null) b7gText(ctx, g.face ? 'face up' : 'face down', cx, cy - 14, 11, 'rgba(232,192,115,.8)'); };
  g.talk = mgSay('', `The company clerk has come out to the brazier with his oilskin case and a bag of clay tokens, the kind the paymasters used for debts when there was coin to pay them in. There is one dock on the bench. Nobody has seen two together since the spring.`) +
    mgSay('The clerk', '"Pass the Debt, Sergeant. Take it or pass it on. Passed, it doubles, and the dock decides." He sets the coin on its edge. "Lowest tally wins. A tie is mine. I keep the book."') +
    (b7In('perrit') ? mgSay('', 'Perrit moves along the bench to watch, and takes out her stick of charcoal, which is not a good sign for the clerk.') : b7In('tobet') ? mgSay('Tobet', '"Indebted game," Tobet says. "We played it with pebbles. The pebbles never paid either."') : '');
  draw();
}
/* what the bench leaves behind, once a book: a line off the roll (a page of the file), Perrit's regard, or a salve */
function b7DebtPay(r){ if (!r) return; S.f.b7_debt = {mine:r.mine, his:r.his, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b7_debtPaid) { S.f.b7_debtPaid = 1;
    if (b7File() > 0) { S.f.b7_debtPaid = 'file'; b7Filed(-1, 'the company clerk left a line off the roll'); }
    else if (b7In('perrit') && S.loy && S.loy.perrit != null) { S.f.b7_debtPaid = 'perrit'; loy('perrit', 1); }
    else { S.inv.salve = (S.inv.salve || 0) + 1; note('+1 salve: the clerk pays what he owes in kind.', 'good'); } }
  save(); }

/* ============ 3. The Timer-Count ============
   No light inland: the column lights nothing. So a marine sapper bites an acid timer (no fuse, no flame: acid through wax) on the hearthstone
   and puts a helmet over it, and the game is to count it in the dark: call "now" when you think the acid is through. He calls too. The helmet comes up, and whoever
   called nearer takes the round. First to two rounds. Before a timer is bitten, once a game, Tangle may score its wax at the half the Kanese way, so
   it ticks when the acid passes the score (Wits; Tangle with an edge): made, you hear the half; "yes, but", you hear it, and so does the
   sapper. A match won pays once a book: the sapper's stake, a burner out of the marines' issue, which the marines do not share. */
const B7G_FUSEWIN = 2, B7G_COUNT = 1000;
function playB7Fuse(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b7gSp());
  const unit = () => B7G_COUNT * b7gSp();
  const g = MG.state = {round:0, mine:0, his:0, phase:'ready', target:0, t0:0, burn:0, call:null, myErr:0, hisErr:0, notch:false, notchUsed:false, sharp:false, spit:0, spat:false, check:null, talk:'', over:false};
  const result = () => ({mine:g.mine, his:g.his, rounds:g.round, won:g.over && g.mine >= B7G_FUSEWIN, done:g.over});
  const barn = (S.f.b7_c3_ph || 1) >= 4;
  mgOpen({kick:barn ? 'The factor\'s barn · the hearth of nothing' : 'The farmhouse floor · the cold hearth', title:'The Timer-Count', leaveText:'Leave the hearth', done:r => opt.after && opt.after(r), leave:() => { g.over = true; mgClose(Object.assign(result(), {left:true, done:false, won:false})); }}); on = b7gOn();
  const cnt = ms => (ms / unit()).toFixed(1);
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? 'The last timer is through' : `Round ${g.round + 1}${g.target ? `: a ${numw(g.target)}-count` : ''}`}</span><span>You <b>${g.mine}</b> · the sapper <b>${g.his}</b></span><span>First to ${B7G_FUSEWIN}</span></div>
      ${g.talk}${b7gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="fcDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'ready' ? `<button class="btn primary" id="fcLight" data-bot="1">Bite it</button>${!g.notchUsed ? `<button class="btn" id="fcNotch" data-bot="1">Score it at the half first (once)</button>` : ''}`
        : g.phase === 'lit' ? `<button class="btn primary" id="fcNow" data-bot="1">Now</button>`
        : `<button class="btn" disabled data-bot="1">The helmet comes up</button>`}</div>
      <p class="fine">The sapper names a count, bites the timer and puts the helmet over it. Count it in your head and call "now" when you think the acid is through the wax. Nearer call takes the round.</p>
      <p class="hint keys"><kbd>Space</kbd> bite / now · <kbd>N</kbd> score · <kbd>Esc</kbd> leave</p>`),
    bind = () => { if ($('#fcLight')) $('#fcLight').onclick = () => light(); if ($('#fcNotch')) $('#fcNotch').onclick = () => notch(); if ($('#fcNow')) $('#fcNow').onclick = () => callNow(); if ($('#fcDone')) $('#fcDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  /* the check: score the wax at the half (Wits 13). Made: it ticks at the half. Yes, but: it ticks, and the sapper counts by it too. */
  const notch = () => { if (g.notchUsed || g.phase !== 'ready' || g.over) return; g.notchUsed = true; AUDIO.play('click');
    const r = g.check = b7gRoll('wits', 13, null, [['he has waxed timers since he could hold a knife', 2, 'tangle'], ['she waxes her timers by the width of her thumb', 1, 'rasp'], ['you have stood next to a lot of sappers', 1, 'sgt']]);
    if (r.ok) { g.notch = true; g.talk = mgSay(r.who === 'sgt' ? '' : NAME(r.who), r.who === 'sgt' ? 'You score the wax at the half with a thumbnail, small, where the sapper does not see. It will tick when the acid passes it.' : `${NAME(r.who)} takes the timer to look at it, and gives it back with a score at the half you only see because you were watching. "Kanese," ${b7gHe(r.who)} says, under ${b7gHis(r.who)} breath. "It'll tick."`); }
    else if (r.tier === 'near') { g.notch = true; g.sharp = true; g.talk = mgSay('The sapper', '"Scored it," he says, and grins. "Kanese trick. I know it. I\'ll count by it too, then, heavy." <span class="dim">(the sapper hears the half as well)</span>'); }
    else g.talk = mgSay('', `${NAME(r.who)} tries a score at the half and cuts too deep, and the sapper takes the timer back and waxes a fresh one with a look.`);
    redraw(); };
  const light = () => { if (g.phase !== 'ready' || g.over) return; g.target = 4 + R(4); g.t0 = performance.now(); g.burn = g.target * unit() * (.94 + R(13) / 100); g.call = null; g.spat = false; g.spit = 0; g.phase = 'lit'; AUDIO.play('click');
    g.talk = mgSay('The sapper', `"A ${numw(g.target)}-count." He cracks the acid into the wax with his thumb and puts the helmet over it. ${g.notch ? 'Under it, very faintly, the acid hisses.' : 'Under it, nothing you can hear.'}`); redraw(); setTimeout(tick, 40); };
  const tick = () => { if (!on() || g.phase !== 'lit') return; const e = performance.now() - g.t0;
    if (g.notch && !g.spat && e >= g.burn / 2) { g.spat = true; g.spit = performance.now(); AUDIO.play('click'); }
    if (e > g.burn + 2.5 * unit()) return callNow(true); setTimeout(tick, 40); };
  const callNow = (late) => { if (g.phase !== 'lit' || g.over) return; const e = performance.now() - g.t0; g.call = e; g.myErr = Math.abs(e - g.burn);
    g.hisErr = (.05 + R(80) / 100) * unit() * (g.sharp && g.notch ? .5 : 1); g.phase = 'lift'; AUDIO.play('click'); redraw();
    T(() => { const win = g.myErr < g.hisErr; g.round++; if (win) { g.mine++; AUDIO.play('coin'); } else { g.his++; AUDIO.play('miss'); }
      const yours = late ? 'You never called it.' : e < g.burn ? `You called it at ${cnt(e)} counts; the wax is still whole when the helmet comes up, ${cnt(g.burn - e)} short of the end.` : `You called it at ${cnt(e)} counts; it bit through at ${cnt(g.burn)}.`;
      g.talk = mgSay('', `${yours} The sapper was ${cnt(g.hisErr)} out. ${win ? b7gPick(['The round is yours.', 'Yours. He scratches a mark on the hearthstone with his knife.']) : b7gPick(['His.', 'His round. He scratches a mark on his side of the hearthstone.'])}`);
      g.notch = false; g.sharp = false; g.target = 0;
      if (g.mine >= B7G_FUSEWIN || g.his >= B7G_FUSEWIN) end(); else g.phase = 'ready'; redraw(); }, REDUCE() ? 150 : 600); };
  const end = () => { g.over = true; g.phase = 'over'; const W = g.mine >= B7G_FUSEWIN; mgDeed(W ? 'b7FuseWon' : 'b7FuseLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk += mgSay('The sapper', W ? '"Heavies who can count." He pushes the burner across the hearthstone, carefully, with one finger. "Marines don\'t share," he says. "Marines pay their bets. It\'s different."' : '"Two to me." He puts the burner back in his satchel. "Count in the dark long enough and you stop needing the light. Try it a few more years, heavy."') +
      (b7In('tangle') ? mgSay('Tangle', W ? '"Kan," Tangle says, very quietly, to the burner.' : '"His wax runs a touch thick," Tangle says. "Marine wax. Cold. I could have told you."') : ''); };
  mgKeys({n:() => notch(), ' ':() => { const b = $('#fcDone') || $('#fcLight') || $('#fcNow'); b && b.click(); }});
  /* the hearth: a dark room (the farmhouse, or the barn by day), grey light through the cracks, an upturned helmet over the timer */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now();
    ctx.fillStyle = barn ? '#14110c' : '#0e0c0a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = barn ? 'rgba(220,210,170,.18)' : 'rgba(170,180,200,.12)'; for (let i = 0; i < (barn ? 7 : 4); i++) ctx.fillRect(W*(.08 + i*(barn ? .13 : .24)), 0, barn ? 2 : 3, H*.55); // light through the boards, or the shutters
    if (barn) { ctx.fillStyle = '#3a3018'; ctx.beginPath(); ctx.moveTo(0, H*.62); ctx.quadraticCurveTo(W*.15, H*.36, W*.32, H*.62); ctx.fill(); } // the hay
    ctx.fillStyle = barn ? '#241e16' : '#1e1a16'; ctx.fillRect(0, H*.62, W, H*.38);
    const hx = W*.5, hy = H*.74, hw = Math.min(W*.3, 150); ctx.fillStyle = '#3a3632'; ctx.fillRect(hx - hw/2, hy - 4, hw, 10); // the hearthstone
    const lit = g.phase === 'lit', lifting = g.phase === 'lift' || (g.phase === 'ready' && g.round > 0) || g.over, e = lit ? now - g.t0 : g.call || 0, fl = hw*.7;
    ctx.strokeStyle = '#6a5a3a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx - fl/2, hy - 6); ctx.lineTo(hx + fl/2, hy - 6); ctx.stroke(); // the timer's wax
    if (lit && e < unit() * .6) { const x = hx - fl/2 + fl * Math.min(1, e / g.burn); glow(ctx, x, hy - 6, 14, '#b8e070', .5); } // the acid, before the helmet goes over
    if (g.phase === 'lift' || lifting) { const k = g.burn ? Math.min(1, (g.call || g.burn) / g.burn) : 1; ctx.strokeStyle = '#1a1612'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hx - fl/2, hy - 6); ctx.lineTo(hx - fl/2 + fl*k, hy - 6); ctx.stroke();
      if (g.call && g.call < g.burn && g.phase === 'lift') glow(ctx, hx - fl/2 + fl*k, hy - 6, 10, '#b8e070', .6); }
    if (lit && e >= unit() * .6) { ctx.fillStyle = '#5a6068'; ctx.beginPath(); ctx.arc(hx, hy - 4, hw*.42, Math.PI, 0); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(hx - hw*.3, hy - hw*.36, hw*.08, hw*.24); // the helmet, over it
      if (g.spit && now - g.spit < 250) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, hx + hw*.42, hy - 2, 10, '#c8f090', .4); ctx.globalCompositeOperation = 'source-over'; } } // the tick at the score, a wink at the helmet's rim
    else { ctx.fillStyle = '#5a6068'; ctx.save(); ctx.translate(W*.78, H*.6); ctx.rotate(-.4); ctx.beginPath(); ctx.arc(0, 0, hw*.3, Math.PI, 0); ctx.fill(); ctx.restore(); }
    for (let i = 0; i < g.mine; i++) { ctx.fillStyle = 'rgba(160,230,190,.8)'; ctx.fillRect(hx - hw/2 + 6 + i*7, hy + 1, 2, 5); }
    for (let i = 0; i < g.his; i++) { ctx.fillStyle = 'rgba(230,200,150,.8)'; ctx.fillRect(hx + hw/2 - 8 - i*7, hy + 1, 2, 5); }
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b2soldier', W*.86, H*.86, fs, t, {still:true, dir:-1}); drawFigure(ctx, 'sgt', W*.14, H*.86, fs, t, {still:true, dir:1});
    if (b7In('tangle')) drawFigure(ctx, 'tangle', W*.26, H*.84, fs*.92, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', `${barn ? 'In the factor\'s barn, with the doors barred on the day,' : 'On the farmhouse floor, with the shutters closed on the last of the light,'} a marine sapper from the next squad over has a pouch of acid timers, a knife and a helmet. The column lights nothing now. He has found a way round that.`) +
    mgSay('The sapper', '"Timer-count, heavy. I wax it, I bite it, the helmet goes over. You count. Call it when it\'s done." He sets a burner on the hearthstone between you. "Two rounds takes it. Marines don\'t share. Marines bet."') +
    (b7In('tangle') ? mgSay('', 'Tangle has moved round the hearth to watch the knife. He has the look of a man watching somebody else cook his mother\'s recipe.') : '');
  redraw();
}
/* what the hearth leaves behind, once a book: the sapper's burner */
function b7FusePay(r){ if (!r) return; S.f.b7_fuse = {mine:r.mine, his:r.his, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b7_fusePaid) { S.f.b7_fusePaid = 1; S.inv.burner = (S.inv.burner || 0) + 1; note('+1 burner: a marine sapper\'s bet, paid.', 'good'); }
  save(); }

/* ============ 4. The Horse-Trade ============
   At the horse lines below Kravos Hill an old Bluerose horse-coper is selling the last remounts the cavalry left behind. The Finadd has
   given the squad sixty docks of the company's money and an order for three pack horses. For each horse he names a price; you make an
   offer. At or above his floor, he takes it. Below, he comes down a little and loses a little patience; out of patience, his price is his
   last. Three horses within the purse wins. Once a game you may look in a horse's mouth (Wits; Sorvan, who was raised among these horses,
   with an edge): made, you know his floor on that horse; "yes, but", you know it, and he takes it ill, a little less patience. No silver
   moves (it is the company's purse). Won: Sorvan's regard (+1) if he walks; else the coper throws in a pot of liniment (a salve). */
const B7G_PURSE = 60, B7G_HORSES = [['a bay mare with a white blaze', '#5a3420'], ['a grey gelding, one white sock', '#7a7a74'], ['a chestnut with an old brand on the shoulder', '#7a4424']];
function playB7Horse(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b7gSp());
  const floors = B7G_HORSES.map(() => 14 + R(8)), asks = floors.map(f => f + 5 + R(6));
  const g = MG.state = {i:0, floors, asks, ask:asks[0], floor:floors[0], pat:3, spent:0, bought:[], phase:'intro', check:null, looked:false, known:false, talk:'', over:false, busy:false};
  const result = () => ({bought:g.bought.length, spent:g.spent, won:g.over && g.bought.length === 3 && g.spent <= B7G_PURSE, done:g.over});
  mgOpen({kick:'Kravos Hill · the horse lines', title:'The Horse-Trade', leaveText:'Leave the lines', done:r => opt.after && opt.after(r), leave:() => mgClose(Object.assign(result(), {left:true, done:false, won:false}))}); on = b7gOn();
  const offers = () => [...new Set([2, 4, 7, 10].map(d => g.ask - d))].filter(o => o >= 1 && o < g.ask);
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? 'The lines are quiet' : `Horse ${g.i + 1} of 3`}</span><span>Purse left <b>${b7Coin(B7G_PURSE - g.spent)}</b></span><span>${g.phase === 'haggle' ? `Patience ${'●'.repeat(g.pat)}${'○'.repeat(3 - g.pat)}` : ''}</span></div>
      ${g.talk}${b7gRollHTML(g.check)}
      ${g.phase === 'haggle' && g.known ? `<p class="fine">He will take ${b7Coin(g.floor)} for this one, not a dock under.</p>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="htDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' ? `<button class="btn primary" id="htGo" data-bot="1">Lead out the first</button>`
        : g.busy ? `<button class="btn" disabled data-bot="1">He is thinking about it</button>`
        : `${g.pat > 0 ? offers().map(o => `<button class="btn" data-of="${o}" data-bot="1">Offer ${b7Coin(o)}</button>`).join('') : ''}<button class="btn primary" id="htPay" data-bot="1">Pay ${b7Coin(g.ask)}${g.pat > 0 ? '' : ', his last price'}</button>${!g.looked && g.pat > 0 ? `<button class="btn" id="htLook" data-bot="1">Look in its mouth (once)</button>` : ''}`}</div>
      <p class="fine">Three pack horses on ${b7Coin(B7G_PURSE)} of the company's money. Offer at or above his floor and he takes it; under it he comes down a little and loses a little patience. Out of patience, his price is his last.</p>
      <p class="hint keys"><kbd>1</kbd>–<kbd>4</kbd> an offer · <kbd>Space</kbd> pay · <kbd>L</kbd> look · <kbd>Esc</kbd> leave</p>`),
    bind = () => { document.querySelectorAll('#mgPanel [data-of]').forEach(b => b.onclick = () => offer(+b.dataset.of));
      if ($('#htGo')) $('#htGo').onclick = () => { AUDIO.play('click'); lead(); }; if ($('#htPay')) $('#htPay').onclick = () => buy(g.ask); if ($('#htLook')) $('#htLook').onclick = () => look();
      if ($('#htDone')) $('#htDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const lead = () => { if (g.over || (g.phase !== 'intro' && g.phase !== 'between')) return; g.ask = g.asks[g.i]; g.floor = g.floors[g.i]; g.pat = 3; g.known = false; g.check = null; g.phase = 'haggle';
    g.talk = mgSay('The coper', `A groom leads out ${B7G_HORSES[g.i][0]}. "${b7gPick(['Sound in wind and limb,', 'Four good feet and a good heart,', 'Rode east with the best of them and came back,'])}" the coper says. "${b7Coin(g.ask)}."`); redraw(); };
  const buy = o => { if (g.over || g.phase !== 'haggle' || g.busy) return; g.spent += o; g.bought.push(o); AUDIO.play('coin');
    g.talk = mgSay('The coper', `"${b7Coin(o)}." He spits in his palm and holds it out. ${b7gPick(['The groom hands you the halter.', 'The horse looks at you as though it has been sold before.'])}`);
    g.i++; if (g.i >= 3) end(); else g.phase = 'between'; redraw(); if (!g.over) T(lead, 900); };
  const offer = o => { if (g.over || g.phase !== 'haggle' || g.busy || g.pat <= 0) return; AUDIO.play('click');
    if (o >= g.floor) return buy(o);
    g.busy = true; redraw(); T(() => { g.busy = false; g.pat--; g.ask = Math.max(g.floor, Math.ceil(g.ask - (g.ask - o) / 3));
      g.talk = mgSay('The coper', g.pat > 0 ? `"${b7Coin(o)}?" ${b7gPick(['He looks at the horse as if you had insulted its mother.', 'He laughs, once, without much in it.', 'He scratches his jaw.'])} "${b7Coin(g.ask)}."` : `"${b7Coin(g.ask)}," he says. "And that is the last I will say about it." He means it.`); redraw(); }, REDUCE() ? 100 : 500); };
  /* the check: look in its mouth (Wits 13). Made: you know his floor. Yes, but: you know it, and a little less patience. */
  const look = () => { if (g.looked || g.phase !== 'haggle' || g.over || g.busy || g.pat <= 0) return; g.looked = true; AUDIO.play('click');
    const r = g.check = b7gRoll('wits', 13, null, [['he was raised among these horses', 2, 'sorvan'], ['he has bought ponies off the Faraed and lived', 1, 'ruuk'], ['he groomed a factor\'s horses as a boy', 1, 'tobet'], ['you have bought remounts for a company before', 1, 'sgt']]);
    if (r.ok) { g.known = true; g.talk = mgSay(r.who === 'sorvan' ? 'Sorvan' : '', r.who === 'sorvan' ? `Sorvan runs a thumb along the horse's gums, looks at its teeth, and says something to the coper in the Bluerose tongue. The coper's face does not move. Sorvan turns to you. "${b7Coin(g.floor)}," he says. "Not a dock under, and not a dock over either."` : `${b7gWho(r)} ${b7gV(r, 'look', 'looks')} at the horse's teeth, and the wear on them, and the hooves. You know what it is worth to him now.`); }
    else if (r.tier === 'near') { g.known = true; g.pat = Math.max(0, g.pat - 1); g.talk = mgSay('The coper', `You know the horse now, and its price. "Nobody looks in my horses' mouths," the coper says, stiffly. "They are Bluerose horses." <span class="dim">(a little less patience)</span>`); }
    else g.talk = mgSay('', `${b7gWho(r)} ${b7gV(r, 'reach', 'reaches')} for the halter, and the horse takes a sleeve in its teeth instead and keeps it for a while. Nothing learned but that.`);
    redraw(); };
  const end = () => { g.over = true; g.phase = 'over'; const W = g.spent <= B7G_PURSE; mgDeed(W ? 'b7HorseWon' : 'b7HorseLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk += mgSay('', W ? `Three horses for ${b7Coin(g.spent)}, and ${b7Coin(B7G_PURSE - g.spent)} of the Finadd's purse to give back.` : `Three horses for ${b7Coin(g.spent)}. The Finadd's purse was ${b7Coin(B7G_PURSE)}. He will want to know where the rest came from, and so will the clerk.`) +
      (b7In('sorvan') ? mgSay('Sorvan', W ? '"He will tell the lines a Letherii sergeant bought three horses off him at a fair price," Sorvan says. "He will be ashamed of it for a month." He looks pleased.' : '"He robbed you," Sorvan says. "Politely. That is how we were taught."') : ''); };
  mgKeys({'1':() => { const o = offers()[0]; o && offer(o); }, '2':() => { const o = offers()[1]; o && offer(o); }, '3':() => { const o = offers()[2]; o && offer(o); }, '4':() => { const o = offers()[3]; o && offer(o); }, l:() => look(),
    ' ':() => { const b = $('#htDone') || $('#htGo') || $('#htPay'); b && !b.disabled && b.click(); }});
  /* the lines: night below the hill, the commanders' lamps on top, picket ropes, a lantern on a pole, the horse, the coper */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H;
    b6gNight(ctx, W, H, t, {top:'#06070c', mid:'#1a1c20', cut:.4, low:'#14120e', seed:9421});
    ctx.fillStyle = '#101216'; ctx.beginPath(); ctx.moveTo(W*.45, H*.4); ctx.quadraticCurveTo(W*.72, H*.06, W, H*.3); ctx.lineTo(W, H*.4); ctx.fill(); for (let i = 0; i < 6; i++) glow(ctx, W*(.62 + i*.06), H*(.2 + hash(i, 9422)*.08), 4, '#ffb060', .6); // the hill and its lamps
    ctx.fillStyle = '#1a1814'; ctx.fillRect(0, H*.4, W, H*.6);
    ctx.strokeStyle = 'rgba(120,100,70,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, H*.52); ctx.lineTo(W, H*.5); ctx.stroke(); for (let i = 0; i < 7; i++) { if (typeof B4VB !== 'undefined') B4VB.horse(ctx, W*(.06 + i*.14), H*.53, Math.max(.8, H/260), '#0c0a08', 0, 0, i % 2 ? 1 : -1); } // the picket line, far off
    const lx = W*.3, ly = H*.36; ctx.fillStyle = '#3a2a1a'; ctx.fillRect(lx, ly, 3, H*.36); ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx + 1, ly, H*.2, '#ffb050', .4); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#ffdc90'; ctx.fillRect(lx - 3, ly - 6, 9, 8); // the lantern on its pole
    if (!g.over && g.phase !== 'intro' && typeof B4VB !== 'undefined') B4VB.horse(ctx, W*.52, H*.8, Math.max(2, H/48), (B7G_HORSES[g.i] || B7G_HORSES[2])[1], 0, 0, 1);
    for (let i = 0; i < g.bought.length; i++) if (typeof B4VB !== 'undefined') B4VB.horse(ctx, W*(.12 + i*.07), H*.74, Math.max(1.2, H/90), B7G_HORSES[i][1], 0, 0, 1); // the ones bought, on the squad's rope
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b5_c5_refugee', W*.86, H*.86, fs, t, {still:!g.busy, dir:-1}); // the coper, an old man in a horse-blanket coat drawFigure(ctx, 'sgt', W*.2, H*.9, fs, t, {still:true, dir:1});
    if (b7In('sorvan')) drawFigure(ctx, 'sorvan', W*.34, H*.88, fs*.95, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', `At the horse lines, under the lantern on its pole, an old Bluerose horse-coper sits on an upturned bucket with his grooms round him and the last of the cavalry's remounts on the rope behind. The Finadd has given you ${b7Coin(B7G_PURSE)} of the company's money in a purse that the clerk counted twice, and an order for three pack horses.`) +
    mgSay('The coper', '"Three, is it." He looks at your badge, and at the purse. "Lether pays. Lether always pays. Let us see how much."') +
    (b7In('sorvan') ? mgSay('', 'Sorvan stands at your shoulder with his blue scale on, and the coper looks at the scale for a long breath before he looks at you again.') : '');
  redraw();
}
/* what the lines leave behind, once a book: Sorvan's regard, or a salve */
function b7HorsePay(r){ if (!r) return; S.f.b7_horse = {bought:r.bought, spent:r.spent, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b7_horsePaid) { S.f.b7_horsePaid = 1; if (b7In('sorvan') && S.loy && S.loy.sorvan != null) { S.f.b7_horsePaid = 'sorvan'; loy('sorvan', 1); }
    else { S.inv.salve = (S.inv.salve || 0) + 1; note('+1 salve: a pot of the coper\'s horse liniment. It works on sergeants.', 'good'); } }
  save(); }

/* ============ 5. The Rat Catchers' Wager ============
   On the city's last day a man at the corner with a slate says he is a Rat Catcher, which nobody in Letheras said aloud a month ago. His
   book is not on who the new king is: "nobody alive could give you odds on that". It is on the word the crowd will shout for him. Six words
   on the slate, with odds. Three gusts come over the roofs from the crowd two streets off; after each you hear a piece of a word, the odds
   move, and you may chalk one marker (a silver) on a word at the odds of the moment. Then the crowd gives its word, as the Third hears it
   from this corner, and the markers on it pay. The words the crowd shouts are canon (rg-canon §2, R24.2); which one carries to this corner
   first is chance, and the game never says who the crowd is shouting for. Once a game you may get up on the wall to listen (Wits; Wenna
   with an edge): made, that gust is heard plain; "yes, but", plain, and the Rat Catcher saw you climb and shortens every word by one.
   Silver, net capped at 8 over the book, paid as the slate is wiped. Leaving before the word: the stakes come back. */
const B7G_WAGERCAP = 8, B7G_WORDS = [['King', 2], ['Emperor', 3], ['Liberator', 4], ['Saviour', 5], ['Free Lether', 6], ['The Errant', 8]];
const B7G_CROWD = ['Saviour', 'Emperor']; // what the crowd shouts (canon); the corner hears one of them first
const B7G_FRAG = {Saviour:['…our…', 'Sa…', '…viour'], Emperor:['Em…', '…ror…', '…peror'], King:['…ing…'], Liberator:['…tor…'], 'Free Lether':['…ee…'], 'The Errant':['…rant…']};
function playB7Wager(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b7gSp());
  const word = opt.word || B7G_CROWD[R(2)];
  const g = MG.state = {word, odds:Object.fromEntries(B7G_WORDS), round:0, frag:[], marks:[], phase:'listen', climbed:false, plain:false, check:null, talk:'', over:false, net:0, paid:false, heard:null, gust:0};
  const capLeft = () => Math.max(0, B7G_WAGERCAP - (S.f.b7_wagerNet || 0));
  const result = () => ({marks:g.marks.length, net:g.net, pay:g.pay || 0, won:g.over && g.net > 0, done:g.over && g.marks.length > 0, heard:g.heard});
  const settle = () => { if (g.paid) return; g.paid = true; const pay = g.net > 0 ? Math.min(g.net, capLeft()) : Math.max(g.net, -(S.silver || 0));
    S.silver = (S.silver || 0) + pay; updSilver(); g.pay = pay; if (pay > 0) S.f.b7_wagerNet = (S.f.b7_wagerNet || 0) + pay; };
  mgOpen({kick:'The corner · the city\'s last day', title:'The Rat Catchers\' Wager', leaveText:'Leave the slate', done:r => opt.after && opt.after(r),
    leave:() => { if (g.over) settle(); mgClose(Object.assign(result(), g.over ? {} : {left:true, done:false, won:false, net:0, pay:0})); }}); on = b7gOn();
  const fits = (f, w) => (B7G_FRAG[w] || []).includes(f);
  const draw = () => { const free = (S.silver || 0) - g.marks.length;
    mgPanel(`<div class="cpbar"><span>${g.over ? 'The slate is wiped' : g.round < 3 ? `Gust ${g.round + (g.phase === 'bet' ? 0 : 1)} of 3` : 'The crowd\'s word'}</span><span>Markers <b>${g.marks.length}</b> of 3</span><span>Heard: <b>${g.frag.length ? g.frag.join(' · ') : 'nothing yet'}</b></span></div>
      ${g.talk}${b7gRollHTML(g.check)}
      ${!g.over ? `<p class="fine">The slate: ${B7G_WORDS.map(([w]) => `${w} ${g.odds[w]} to 1`).join(' · ')}${g.marks.length ? `. Your markers: ${g.marks.map(m => `${m.w} at ${m.o} to 1`).join(', ')}` : ''}.</p>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="wgDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'listen' ? `<button class="btn primary" id="wgListen" data-bot="1">Listen for the next gust</button>${!g.climbed ? `<button class="btn" id="wgClimb" data-bot="1">Up on the wall to listen (once)</button>` : ''}`
        : g.phase === 'bet' ? B7G_WORDS.map(([w], i) => `<button class="btn" data-wd="${i}" data-bot="1" ${free >= 1 && g.marks.length < 3 ? '' : 'disabled'}>${w}, ${g.odds[w]} to 1</button>`).join('') + `<button class="btn primary" id="wgHold" data-bot="1">${g.round >= 3 ? 'Done. Let them shout' : 'Hold, and listen again'}</button>`
        : g.phase === 'word' ? `<button class="btn primary" id="wgWord" data-bot="1">The crowd's word</button>`
        : `<button class="btn" disabled data-bot="1">Listening</button>`}</div>
      <p class="fine">After each gust, chalk one marker (a silver) on a word at the odds of the moment, or hold. When the crowd gives its word, as you hear it from this corner, markers on it pay their odds. The slate pays at most ${B7G_WAGERCAP} silver over what you staked, once.</p>
      <p class="hint keys"><kbd>1</kbd>–<kbd>6</kbd> a marker · <kbd>Space</kbd> listen / hold · <kbd>W</kbd> the wall · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-wd]').forEach(b => b.onclick = () => mark(+b.dataset.wd));
    if ($('#wgListen')) $('#wgListen').onclick = () => listen(); if ($('#wgClimb')) $('#wgClimb').onclick = () => climb();
    if ($('#wgHold')) $('#wgHold').onclick = () => hold(); if ($('#wgWord')) $('#wgWord').onclick = () => crowd();
    if ($('#wgDone')) $('#wgDone').onclick = () => { AUDIO.play('click'); settle(); mgClose(result()); }; };
  /* a gust: a piece of a word, truer as the crowd gathers; heard plain from the wall */
  const listen = () => { if (g.over || g.phase !== 'listen') return; g.phase = 'gust'; g.gust = performance.now(); AUDIO.play('shuffle'); draw();
    T(() => { const r = g.round, truth = g.plain || Math.random() < [.4, .65, .9][r];
      const f = truth ? B7G_FRAG[word][g.plain ? 2 : r] : b7gPick(B7G_WORDS.map(([w]) => w).filter(w => w !== word).flatMap(w => B7G_FRAG[w]));
      g.frag.push(f); g.plain = false; B7G_WORDS.forEach(([w]) => { g.odds[w] = fits(f, w) ? Math.max(1, Math.ceil(g.odds[w] / 2)) : g.odds[w] + 1; });
      g.round++; g.phase = 'bet'; g.gust = 0; AUDIO.play('click');
      g.talk = mgSay('', `A gust of the crowd comes over the roofs from two streets off, and in it, one piece of a word: <b>${f}</b>.`) + mgSay('The Rat Catcher', b7gPick(['He wipes a number with his thumb and chalks another.', '"Odds are moving," he says, chalking. "They always do, near the end."', 'He listens with his head on one side, and changes the slate.'])); draw(); }, REDUCE() ? 150 : 700); };
  /* the check: up on the wall (Wits 13). Made: the next gust heard plain. Yes, but: plain, and every word shortened by one. */
  const climb = () => { if (g.climbed || g.phase !== 'listen' || g.over) return; g.climbed = true; AUDIO.play('click');
    const r = g.check = b7gRoll('wits', 13, null, [['she can pick one gull out of a flock by its cry', 2, 'wenna'], ['she listens to fevers for a living', 1, 'marrow'], ['you have listened for orders under worse', 1, 'sgt']]);
    if (r.ok) { g.plain = true; g.talk = mgSay('', `${b7gWho(r)} ${b7gV(r, 'get', 'gets')} up on the wall by the brazier, where the wind off the river comes clean over the roofs. The next gust will come plain.`); }
    else if (r.tier === 'near') { g.plain = true; B7G_WORDS.forEach(([w]) => { g.odds[w] = Math.max(1, g.odds[w] - 1); }); g.talk = mgSay('The Rat Catcher', `Up on the wall, the next gust will come plain. The Rat Catcher watches the climb and wipes his slate. "Somebody's listening hard," he says. "Everything shortens." <span class="dim">(every word one shorter)</span>`); }
    else g.talk = mgSay('', `${b7gWho(r)} ${b7gV(r, 'get', 'gets')} up on the wall and the smoke off the brazier comes up with ${r.who === 'sgt' ? 'you' : B7G_SHE.includes(r.who) ? 'her' : 'him'}. Nothing to hear but coughing.`);
    draw(); };
  const mark = i => { if (g.over || g.phase !== 'bet' || g.marks.length >= 3 || (S.silver || 0) - g.marks.length < 1) return; const [w] = B7G_WORDS[i]; g.marks.push({w, o:g.odds[w]}); AUDIO.play('coin');
    g.talk = mgSay('The Rat Catcher', `He chalks your marker against ${w} at ${g.odds[w]} to 1 and holds out his hand for the silver. "Malazan coin," he says, weighing it. "Good. It will be worth something tomorrow, whoever's face is on ours."`); hold(true); };
  const hold = (marked) => { if (g.over || g.phase !== 'bet') return; if (!marked) AUDIO.play('click'); if (g.round >= 3) { g.phase = 'word'; if (!marked) g.talk = mgSay('', 'The slate is closed. Two streets off, the crowd draws breath.'); }
    else g.phase = 'listen'; draw(); };
  const crowd = () => { if (g.over || g.phase !== 'word') return; g.phase = 'gust'; g.gust = performance.now(); AUDIO.play('shuffle'); draw();
    T(() => { g.over = true; g.phase = 'over'; g.gust = 0; g.heard = word; let net = 0; g.marks.forEach(m => { net += m.w === word ? m.o : -1; }); g.net = net;
      if (g.marks.length) { mgDeed(net > 0 ? 'b7WagerWon' : 'b7WagerLost'); AUDIO.play(net > 0 ? 'win' : 'lose'); }
      g.talk = mgSay('', `And the crowd gives its word, all of it at once, from two streets off, and from this corner the Third hears it plain: <i>${word}</i>.`) +
        mgSay('The Rat Catcher', !g.marks.length ? '"No markers, Sergeant? A careful soldier." He wipes the slate.' : net > 0 ? `He counts silver into your hand, ${net} over your stakes, without much grief. "${word}," he says. "Who would have thought it." He does not look as though the book has hurt him. The Rat Catchers, people say, never do.` : `"${word}," he says, and wipes your markers off the slate. "The crowd decides, Sergeant. That is the whole of it." He does not look as though the book has troubled him.`);
      draw(); }, REDUCE() ? 150 : 900); };
  mgKeys({'1':() => mark(0), '2':() => mark(1), '3':() => mark(2), '4':() => mark(3), '5':() => mark(4), '6':() => mark(5), w:() => climb(), ' ':() => { const b = $('#wgDone') || $('#wgListen') || $('#wgHold') || $('#wgWord'); b && b.click(); }});
  /* the corner: smoke over the towers, a brazier, a wall, the Rat Catcher's slate on a crate, the crowd's noise as moving light two streets off */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, mo = REDUCE() ? 0 : 1;
    b6gNight(ctx, W, H, t, {top:'#2a1c18', mid:'#4a3022', cut:.42, low:'#1a1612', stars:false});
    for (let i = 0; i < 6; i++) { const x = W*(.38 + i*.11), h = H*(.18 + hash(i, 9431)*.16); ctx.fillStyle = '#1a1412'; ctx.fillRect(x, H*.42 - h, W*.05, h); } // the towers
    ctx.fillStyle = 'rgba(60,50,46,.5)'; for (let i = 0; i < 4; i++) { const x = (W*(.3 + i*.2) + (mo ? t*.006*(i + 1) : 0)) % W; ctx.beginPath(); ctx.ellipse(x, H*.12 + i*8, W*.14, H*.05, 0, 0, 7); ctx.fill(); } // smoke
    ctx.fillStyle = '#241c18'; ctx.fillRect(0, H*.42, W*.36, H*.3); ctx.fillStyle = '#2e241e'; ctx.fillRect(W*.36, H*.5, W*.64, H*.22); // the houses at the corner
    const k = g.gust ? Math.min(1, (performance.now() - g.gust) / 700) : 0; ctx.globalCompositeOperation = 'lighter'; glow(ctx, W*.78, H*.5, H*(.16 + k*.12), '#ffb060', .2 + k*.25); ctx.globalCompositeOperation = 'source-over'; // the crowd's torches, two streets off
    ctx.fillStyle = '#1c1814'; ctx.fillRect(0, H*.72, W, H*.28); b7gFire(ctx, W*.12, H*.74, t, H);
    const bx = W*.56, by = H*.6, bw = Math.min(W*.4, 220), bh = H*.24; ctx.fillStyle = '#5a4630'; ctx.fillRect(bx - bw/2, by + bh, bw, H*.08); ctx.fillStyle = '#1c2420'; ctx.fillRect(bx - bw/2, by, bw, bh); ctx.strokeStyle = '#6a5636'; ctx.lineWidth = 2; ctx.strokeRect(bx - bw/2, by, bw, bh); // the slate on its crate
    const sz = Math.max(8, Math.min(12, bh / 7)); B7G_WORDS.forEach(([w], i) => { const y = by + sz*1.3 + i*sz*1.2, hit = g.over && w === g.heard, marked = g.marks.some(m => m.w === w);
      b7gText(ctx, w, bx - bw/2 + 6, y, sz, hit ? '#f2d488' : 'rgba(236,232,220,.85)', 'left', '\'IM Fell English\', serif', 400); b7gText(ctx, `${g.odds[w]}`, bx + bw/2 - 6, y, sz, 'rgba(232,192,115,.85)', 'right');
      if (marked) { ctx.fillStyle = '#9fe0b8'; ctx.fillRect(bx + bw/2 - 30, y - sz*.4, 4, 4); } });
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b5_c5_refugee', W*.86, H*.9, fs, t, {still:!g.gust, dir:-1}); drawFigure(ctx, 'sgt', W*.3, H*.92, fs, t, {still:true, dir:1});
    if (b7In('wenna')) drawFigure(ctx, 'wenna', W*.2, H*.9, fs*.92, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', `At the corner, by the brazier, a man with a slate on a crate is taking bets. He says he is a Rat Catcher, out loud, in the street, which nobody in Letheras would have said a month ago. Two streets off, the crowd has been shouting all day.`) +
    mgSay('The Rat Catcher', '"Not who, Sergeant. Nobody alive could give you odds on who. What they shout for him: that is the book. Chalk a marker after a gust, a silver a time. The crowd decides. As you hear it, from here."') +
    (b7In('wenna') ? mgSay('', 'Wenna has her head on one side, listening to the crowd the way she listens to surf.') : '');
  draw();
}
function b7WagerPay(r){ if (!r || !r.done) return; S.f.b7_wager = {marks:r.marks, net:r.net, pay:r.pay || 0, won:!!r.won, done:true, heard:r.heard}; save(); }

/* ---- the Deeds page: Book Seven's fires, under the Rising ---- */
{ const _de = b7DeedsExtra; b7DeedsExtra = function(mine){ const out = _de(mine), d = k => mine.reduce((a, {s}) => a + (((s.deeds || {})[k]) || 0), 0);
    const rows = [['Ships above the beach', d('b7ShipsWon') || d('b7ShipsLost') ? `${d('b7ShipsWon')} won, ${d('b7ShipsLost')} lost` : 'Not yet'],
      ['Pass the Debt', d('b7DebtWon') ? 'The clerk missed a line' : d('b7DebtLost') ? 'The debt found you' : 'Not yet'],
      ['The Timer-Count', d('b7FuseWon') ? 'Counted in the dark' : d('b7FuseLost') ? 'The sapper\'s count' : 'Not yet'],
      ['The Horse-Trade', d('b7HorseWon') ? 'Three horses, within the purse' : d('b7HorseLost') ? 'Robbed, politely' : 'Not yet'],
      ['The Rat Catchers\' Wager', d('b7WagerWon') ? 'The crowd\'s word paid' : d('b7WagerLost') ? 'The crowd decided' : 'Not yet']];
    return out + `<h4 class="jh">At the fires</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }; }

/* ---- the chapters' fires: the games offered beside the squad's talk, and what they leave behind ---- */
{ const wrap = (CH, id, f) => { const _n = CH.dlg[id]; if (!_n) return; CH.dlg[id] = () => { const n = _n(); return f(n) || n; }; };
  const after = (n, t, ch) => { const i = n.ch.findIndex(c => typeof c.t === 'string' && new RegExp(t).test(c.t)); n.ch = n.ch.slice(); n.ch.splice(i < 0 ? n.ch.length - 1 : i + 1, 0, ...ch); return n; };
  const jn = (CH, fn) => { const j = CH.journal; if (j) CH.journal = () => { const x = j(), l = fn(); if (l) x.unshift(l); return x; }; };
  /* Ch1: ships, at the Third's fire above the beach the night the transports burn */
  if (typeof B7CH1 !== 'undefined') { wrap(B7CH1, 'b7_c1_fire', n => after(n, '^Talk with the squad', [{t:'In the lee of the dune a squad of marines has five dice going round a shield. Sit in.', tag:'Ships', req:()=>(S.f.b7_c1_ph || 1) === 2 && !S.f.b7_ships && (S.silver || 0) >= 1, go:()=>playB7Ships({after:r => { b7ShipsPay(r); S.f.b7_shipsLast = r; talk('b7_c1_ships_after'); }})}]));
    B7CH1.dlg.b7_c1_ships_after = () => { const r = S.f.b7_shipsLast || {}; return b7gAfter('The Third\'s fire', 'b7_coast_night', 'b7_c1_fire', !r.games ?
`You leave the marines' shield before the first throw. They do not mind. They have the whole night, and the ships to watch.` : (r.pay || 0) > 0 ?
`You come back to the Third's fire ${r.pay} silver heavier, with the transports still burning below. ${b7In('tangle') ? 'Tangle looks at the silver and then at the water. "Marine silver," he says. "No ship to spend it on. That\'s what they get."' : 'Behind you the marines are throwing again, and arguing about the sand.'}` : (r.pay || 0) < 0 ?
`You come back to the Third's fire ${-r.pay} silver lighter. ${b7In('haddat') ? 'Haddat does not ask. She looks at the ships for a while, and then at you, and passes the water skin.' : 'Down on the water the last of the transports settles, and goes out.'}` :
`You come back to the Third's fire with exactly what you sat down with, which the marine said was the most a heavy could hope for.`); };
    jn(B7CH1, () => { const r = S.f.b7_shipsLast; return r && r.games ? ((r.pay || 0) > 0 ? 'The night the transports burned, the marines played Ships on a shield above the beach. The sergeant sat in, and came out ahead.' : 'The night the transports burned, the marines played Ships on a shield above the beach. The sergeant sat in.') : ''; }); }
  /* Ch2: Pass the Debt with the company clerk, at the Sixth's brazier */
  if (typeof B7CH2 !== 'undefined') { wrap(B7CH2, 'b7_c2_fire', n => after(n, '^Talk with the squad', [{t:'The company clerk has a bag of clay debt-tokens and one dock on the bench. Pass the Debt.', tag:'Pass the Debt', req:()=>{ const ph = S.f.b7_c2_ph || 1; return (ph === 1 || ph >= 5) && !(S.f.b7_debt && S.f.b7_debt.done); }, go:()=>playB7Debt({after:r => { b7DebtPay(r); S.f.b7_debtLast = r; talk('b7_c2_debt_after'); }})}]));
    B7CH2.dlg.b7_c2_debt_after = () => { const r = S.f.b7_debtLast || {}, p = S.f.b7_debtPaid; return b7gAfter('The Sixth\'s brazier', 'b7_barracks', 'b7_c2_fire', !r.done ?
`You leave the clerk's bench before the bag is empty. He does not mind. He puts the tokens away in the order he took them out.` : r.won ?
`${r.mine} to his ${r.his}, and the debt went the clerk's way. ${p === 'file' ? 'In the morning the night roll goes across the canal to the grey coats with the Sixth\'s squad left off the bottom of it. The clerk is getting old. He says so to anyone who asks.' : p === 'perrit' ? 'Perrit sits back down by you with her charcoal. "He passed on four," she says. "Every time. A clerk should know better." She sounds fond of him.' : 'The clerk pays what he owes in kind before he goes: a salve out of the battalion\'s stores, signed for in a hand nobody will read.'}` :
`${r.mine} to his ${r.his}. The clerk puts the bag away. ${b7In('tobet') ? '"The pebbles never paid either," Tobet says again. It is still true.' : 'Across the yard, at the gate, the grey shape has not moved all game.'}`); };
    jn(B7CH2, () => { const r = S.f.b7_debtLast; return r && r.done ? (r.won ? 'At the Sixth\'s brazier the sergeant played Pass the Debt with the company clerk, and passed the debt on.' : 'At the Sixth\'s brazier the sergeant played Pass the Debt with the company clerk. The debt found the sergeant.') : ''; }); }
  /* Ch3: the Timer-Count with a marine sapper, on the farmhouse floor or in the factor's barn */
  if (typeof B7CH3 !== 'undefined') { wrap(B7CH3, 'b7_c3_fire', n => after(n, '^Talk with the squad', [{t:'A marine sapper has a pouch of acid timers and a helmet, and a burner for a stake. The Timer-Count.', tag:'The Timer-Count', req:()=>{ const ph = S.f.b7_c3_ph || 1; return (ph === 1 || ph >= 4) && !(S.f.b7_fuse && S.f.b7_fuse.done); }, go:()=>playB7Fuse({after:r => { b7FusePay(r); S.f.b7_fuseLast = r; talk('b7_c3_fuse_after'); }})}]));
    B7CH3.dlg.b7_c3_fuse_after = () => { const r = S.f.b7_fuseLast || {}, barn = (S.f.b7_c3_ph || 1) >= 4; return b7gAfter(barn ? 'The factor\'s barn' : 'The farmhouse floor', barn ? 'b7_c3_house' : 'b7_c3_floor', 'b7_c3_fire', !r.done ?
`You leave the hearth before the last timer. The sapper does not mind. He goes on waxing timers and counting them by himself in the dark, which seems to be how he likes it.` : r.won ?
`Two rounds to you, and a burner out of the marines' issue on the squad's side of the hearth. ${b7In('tangle') ? 'Tangle packs it in the satchel between two smokers, where it will travel quietly, and counts the satchel again.' : 'The squad passes it round, carefully, like an egg.'}` :
`The sapper's count, two rounds to ${r.mine}. ${b7In('marrow') ? 'Marrow says counting in the dark is how she spent her girlhood, and never once won anything by it either.' : 'He takes his burner and goes back to his own squad, whistling, very softly.'}`); };
    jn(B7CH3, () => { const r = S.f.b7_fuseLast; return r && r.done ? (r.won ? 'Inland, with no light allowed, a marine sapper played the Timer-Count with the Third under a helmet. The sergeant counted nearer, and won his burner.' : 'Inland, with no light allowed, a marine sapper played the Timer-Count with the Third under a helmet.') : ''; }); }
  /* Ch4: the Horse-Trade at the horse lines below Kravos Hill */
  if (typeof B7CH4 !== 'undefined') { wrap(B7CH4, 'b7_c4_fire', n => after(n, '^Talk with the squad', [{t:'The Finadd wants three pack horses, and an old Bluerose horse-coper at the lines has the last of the remounts. Go and trade.', tag:'The Horse-Trade', req:()=>{ const ph = S.f.b7_c4_ph || 1; return (ph === 1 || ph === 3) && !(S.f.b7_horse && S.f.b7_horse.done); }, go:()=>playB7Horse({after:r => { b7HorsePay(r); S.f.b7_horseLast = r; talk('b7_c4_horse_after'); }})}]));
    B7CH4.dlg.b7_c4_horse_after = () => { const r = S.f.b7_horseLast || {}; return b7gAfter('The Sixth\'s fire', 'b7_c4_tent', 'b7_c4_fire', !r.done ?
`You leave the horse lines with the purse still full. The coper does not mind. Lether always comes back, he says. Lether always pays.` : r.won ?
`Three pack horses on the Sixth's rope, and ${b7Coin(B7G_PURSE - (r.spent || 0))} back in the Finadd's purse, which the clerk will count twice. ${S.f.b7_horsePaid === 'sorvan' ? 'Sorvan walks the three of them back down the lane himself, one hand on each halter in turn, talking to them in his own tongue.' : 'The coper sends a groom after you with a pot of liniment, "for the bay\'s hocks, and the sergeant\'s".'}` :
`Three pack horses on the Sixth's rope, for ${b7Coin(r.spent || 0)} of a ${b7Coin(B7G_PURSE)} purse. ${b7In('perrit') ? 'Perrit does the sum on the back of her hand, and then does it again, and then puts her hand in her pocket.' : 'The Finadd will sign for it. He signs for everything now.'}`); };
    jn(B7CH4, () => { const r = S.f.b7_horseLast; return r && r.done ? (r.won ? 'At the horse lines below Kravos Hill the sergeant bought three pack horses off a Bluerose horse-coper, within the purse.' : 'At the horse lines below Kravos Hill the sergeant bought three pack horses off a Bluerose horse-coper, over the purse.') : ''; }); }
  /* Ch7: the Rat Catchers' wager, at the corner brazier on the city's last day */
  if (typeof B7CH7 !== 'undefined') { wrap(B7CH7, 'b7_c7_fire', n => after(n, '^Talk with the squad', [{t:'A man at the corner with a slate says he is a Rat Catcher, and is taking bets on what the crowd will shout.', tag:'The Rat Catchers\' Wager', req:()=>(S.f.b7_c7_ph || 1) === 3 && !S.f.b7_c7_view && !(S.f.b7_wager && S.f.b7_wager.done) && (S.silver || 0) >= 1, go:()=>playB7Wager({after:r => { b7WagerPay(r); S.f.b7_wagerLast = r; talk('b7_c7_wager_after'); }})}]));
    B7CH7.dlg.b7_c7_wager_after = () => { const r = S.f.b7_wagerLast || {}; return b7gAfter('The corner', 'b7_city_burning', 'b7_c7_fire', !r.done ?
`You leave the slate with nothing chalked on it. The Rat Catcher does not mind. He has a great many customers today, and none of them seem to be winning.` : (r.pay || 0) > 0 ?
`You come back to the brazier ${r.pay} silver heavier, on the crowd's word. ${b7In('wenna') ? 'Wenna says the crowd sounds like surf on a shingle beach, and that you can always hear which way it is going if you listen to the drag and not the break.' : 'Two streets off the crowd is still shouting, and the Rat Catcher is chalking new odds on something else.'}` :
`You come back to the brazier ${-(r.pay || 0)} silver lighter. The crowd said what it said. ${b7In('haddat') ? 'Haddat says the crowd in Hissar shouted too, once, and that she did not bet on it either time.' : 'At the corner the Rat Catcher has already wiped the slate.'}`); };
    jn(B7CH7, () => { const r = S.f.b7_wagerLast; return r && r.done ? `On the city's last day a Rat Catcher at a corner took bets on the crowd's word. The Third heard "${r.heard || 'it'}"${(r.pay || 0) > 0 ? ', and was paid on it' : ''}.` : ''; }); }
}
