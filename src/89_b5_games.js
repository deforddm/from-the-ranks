/* ============ Book Five: the games at the fires (v8.0) ============ */
/* The games pass for Book Five keeps its games here and wraps the chapters' fire nodes from this file, as Book Four's 79 does, so the
   chapter files are untouched. The brief's table (docs/mt-book-brief.md, "The fires and the games"):
   - The Wager Board (Ch1, the barracks yard, b5g_wager): the bookmaker's chalk board for tomorrow's Special Drownings. Written with
     Chapter One (session 6); headline only: a chalked list of categories and odds, and one line of result the next morning. Never a
     named swimmer, never the swim itself.
   - Harbour Tiles (Ch2), Knucklebones (Ch3), the Token Auction (Ch5), the Whitefinders' Drill (Ch6): the games pass adds them below.
   They use the tables' frame (36: mgOpen, mgPanel, mgKeys, MG.anim), keep their deeds on S.deeds, and pay once a book as the table closes. */

/* ---- the frame: a night sky over Letheras, a lamp, a game's own timers ---- */
const b5gOn = () => { const id = MG.gid; return () => MG.gid === id && mgOpenNow(); };
const b5gPick = a => a[R(a.length)];
const b5gText = (ctx, s, x, y, sz, col = 'rgba(232,192,115,.9)', al = 'center', font = '\'Alegreya Sans SC\', sans-serif', w = 600) => { ctx.fillStyle = col; ctx.font = `${w} ${Math.round(sz)}px ${font}`; ctx.textAlign = al; ctx.fillText(s, x, y); };
/* a check inside a game: the roller, the scene's edges, the tiers (16). The game reads the tier and pays its own "yes, but". */
function b5gRoll(stat, dc, who, edges){ const c = {check:[stat, dc, who], edges:id => (edges || []).filter(e => !e[2] || e[2] === id)};
  const r = check(stat, dc, who || roller(stat, null, c), c);
  S.lastRoll = {who:r.who, stat, tier:r.tier, ok:r.ok, pass:r.pass, margin:r.margin, nat:r.nat}; tally(r.pass ? 'checksOk' : 'checksFail'); if (r.tier === 'near') tally('checksNear'); if (r.tier === 'clean' || r.tier === 'crit') tally('checksClean');
  r.line = `${NAME(r.who)} · ${STATN[stat]}${SET.dice ? ` ${r.nat} ${r.mod >= 0 ? '+' : '−'} ${Math.abs(r.mod)} against ${r.dc}` : ''} · ${TIERW[r.tier]}`; return r; }
const b5gRollHTML = r => r ? `<p class="fine">${esc(r.line)}</p>` : '';

/* ============ 1. The Wager Board ============
   A bookmaker by the barracks gate on the festival night, with an easel and a chalk board: tomorrow's three Special Drownings, by the
   fine's weight only, and the six words the Low Walk bets on (canon: Drownings, Strokes, Risings, Flailings, Flounderings and Vanishings)
   with his odds against each. A stake of 1 to 3 docks on one word for each line, or none. Before the first stake the squad may read the
   board (Wits; the sergeant was born two streets back from the canal): the bookmaker shades one word on each line long, because he
   wants nobody on it, and a canal child knows which. The book closes, the chalk says what it says in the morning, and the board pays.
   Docks, net capped at 12 a book; it is played once. */
const B5G_WAGERCAP = 12;
const B5G_WORDS = [['Drowning', 'under, and stays'], ['Stroke', 'the far steps'], ['Rising', 'under, and up again'], ['Flailing', 'a struggle the length of the rope'], ['Floundering', 'turns back'], ['Vanishing', 'the canal keeps the coins too']];
/* tomorrow's list, by weight: a heavier fine is worse odds on the far steps. w: the chance of each word (they sum to 100). */
const B5G_LINES = [{fine:500, w:[46, 6, 16, 14, 10, 8]}, {fine:250, w:[30, 16, 20, 14, 12, 8]}, {fine:300, w:[36, 12, 18, 14, 12, 8]}];
function playWager(opt = {}){
  let on = () => true;
  const g = MG.state = {line:0, bets:[null, null, null], read:false, roll:null, shade:B5G_LINES.map(L => { const k = [1, 2, 4].map(i => [i, L.w[i]]); return k[R(k.length)][0]; }), phase:'bet', pick:null, talk:'', res:null, net:0, staked:0};
  /* the bookmaker's odds: fair from the weights, less his cut, and the shaded word chalked long, as if it were rare */
  const odds = (li, wi) => { const p = B5G_LINES[li].w[wi] / 100, fair = (1 - p) / p; let o = Math.max(1, Math.round(fair * .75)); if (g.shade[li] === wi) o = Math.max(o + 3, Math.round(fair * 1.6)); return o; };
  const capLeft = () => Math.max(0, B5G_WAGERCAP - (S.f.b5_wagerNet || 0));
  const result = () => ({net:g.net, staked:g.staked, bets:g.bets.filter(Boolean).length, read:g.read, res:g.res, done:!!g.res});
  mgOpen({kick:'The barracks yard · the festival night', title:'The Wager Board', leaveText:'Leave the board', done:r => opt.after && opt.after(r), leave:() => mgClose(result())}); on = b5gOn();
  const fineW = li => `${b5Coin(B5G_LINES[li].fine)} of fine`;
  const draw = () => { const li = g.line, done = !!g.res;
    mgPanel(`<div class="cpbar"><span>${done ? 'The book is closed' : `Line ${li + 1} of 3 · ${fineW(li)}`}</span><span>Purse: <b>${S.silver}</b> docks</span><span>${g.staked ? `On the board: <b>${g.staked}</b>` : 'Nothing down'}</span></div>
      ${g.talk}${b5gRollHTML(g.roll)}
      <div class="row mgbtns">${done ? `<button class="btn primary" id="wgDone" data-bot="1">Back to the fire</button>`
        : g.pick == null ? B5G_WORDS.map(([w], wi) => `<button class="btn" data-w="${wi}" data-bot="1">${w} · ${odds(li, wi)} to 1</button>`).join('') + `<button class="btn" id="wgPass" data-bot="1">Nothing on this line</button>${!g.read && li === 0 && !g.staked ? `<button class="btn" id="wgRead" data-bot="1">Read the board first</button>` : ''}`
        : [1, 2, 3].map(n => `<button class="btn ${n === 1 ? 'primary' : ''}" data-st="${n}" ${S.silver >= n ? '' : 'disabled'} data-bot="1">${b5Coin(n)}</button>`).join('') + `<button class="btn" id="wgBack" data-bot="1">Another word</button>`}</div>
      <p class="fine">Tomorrow's Special Drownings, by the weight of the fine. Put one stake, 1 to 3 docks, on one word for each line, or nothing. When all three lines are done the book closes, and the morning's chalk pays at the odds written. The board pays at most ${b5Coin(B5G_WAGERCAP)} over what you put down, once.</p>
      <p class="hint keys"><kbd>1</kbd>–<kbd>6</kbd> a word · <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> a stake · <kbd>0</kbd> nothing on this line · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-w]').forEach(b => b.onclick = () => { AUDIO.play('click'); word(+b.dataset.w); });
    document.querySelectorAll('#mgPanel [data-st]').forEach(b => b.onclick = () => { AUDIO.play('coin'); stake(+b.dataset.st); });
    if ($('#wgPass')) $('#wgPass').onclick = () => { AUDIO.play('click'); pass(); };
    if ($('#wgRead')) $('#wgRead').onclick = () => { AUDIO.play('click'); read(); };
    if ($('#wgBack')) $('#wgBack').onclick = () => { AUDIO.play('click'); g.pick = null; draw(); };
    if ($('#wgDone')) $('#wgDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const read = () => { if (g.read) return; g.read = true;
    const r = g.roll = b5gRoll('wits', 13, null, [['born two streets back from the Quillas Canal', 2, 'sgt'], ['two years of watching these boards for the holder', 1, 'tobet'], ['she poled grain through this canal', 1, 'pessa'], ['she is doing the bookmaker\'s sums backwards', 1, 'perrit']]);
    if (r.ok) g.talk = mgSay(r.who === 'sgt' ? '' : NAME(r.who), r.who === 'sgt' ? 'You look at the board the way you looked at boards on the tiers at nine years old. He has chalked one word on each line long, longer than the canal would give it, because he does not want a dock on it. You can see which. The chalk is thinner there, where his hand hurried.' : `${NAME(r.who)} reads the board line by line, and then leans in. "He's chalked one word on each line long," ${b5He(r.who)} says, very quietly. "Longer than it should be. He doesn't want anybody on it. Look at the chalk: it's thinner there."`);
    else if (r.tier === 'near') { g.talk = mgSay('The bookmaker', '"Reading my board, soldier?" He wipes a number and chalks it again, a point shorter, smiling. "It reads the same from there."'); g.shade[0] = -1; }
    else g.talk = mgSay('', `${NAME(r.who)} looks at the board, and it is a board, with numbers on it.`);
    draw(); };
  const word = wi => { if (g.res || g.pick != null) return; g.pick = wi; g.talk = mgSay('The bookmaker', b5gPick([`"${B5G_WORDS[wi][0]}. A soldier who knows his own mind." He wets the chalk.`, `"${B5G_WORDS[wi][0]}, at ${odds(g.line, wi)}." He writes nothing yet. "How much?"`, `"${B5G_WORDS[wi][0]}." He looks at you over the board. "Bold." It is not clear which way he means it.`])); draw(); };
  const stake = n => { if (g.res || g.pick == null || S.silver < n) return; S.silver -= n; updSilver(); g.staked += n; g.bets[g.line] = {w:g.pick, n, o:odds(g.line, g.pick)}; mgDeed('b5WagerStake');
    g.talk = mgSay('', `${b5Coin(n)} on ${B5G_WORDS[g.pick][0]}, line ${g.line + 1}, at ${odds(g.line, g.pick)} to 1. He writes it in his book and gives you a chit with a chalk number on it.`); next(); };
  const pass = () => { if (g.res) return; g.bets[g.line] = null; g.talk = mgSay('The bookmaker', b5gPick(['"Nothing on that one? Wise." He does not mean it.', '"Your choice." He chalks a small dash, for you.'])); next(); };
  const next = () => { g.pick = null; g.line++; if (g.line > 2) close(); draw(); };
  const close = () => { g.line = 2; const res = B5G_LINES.map(L => { let x = R(100); for (let i = 0; i < 6; i++) { if (x < L.w[i]) return i; x -= L.w[i]; } return 0; }); g.res = res;
    let back = 0; g.bets.forEach((b, li) => { if (b && b.w === res[li]) back += b.n * (b.o + 1); });
    const gain = back - g.staked, paidGain = Math.min(gain, capLeft()), pay = gain > 0 ? g.staked + paidGain : back;
    S.silver += pay; updSilver(); g.net = pay - g.staked; S.f.b5_wagerNet = (S.f.b5_wagerNet || 0) + Math.max(0, g.net); if (g.net > 0) mgDeed('b5WagerWon'); else if (g.staked) mgDeed('b5WagerLost');
    const words = res.map((wi, li) => `${B5G_WORDS[wi][0]}`);
    g.line1 = `It says ${words[0]}, ${words[1]}, ${words[2]}, in that order, and then somebody wipes it.`;
    g.talk = mgSay('', 'The book closes. In the morning, the chalk on the bookmaker\'s board by the tiers says what it says:') + `<p class="mgsay"><b>${words.join(' · ')}</b></p>` +
      mgSay('', !g.staked ? 'You had nothing on it. The board does not mind.' : g.net > 0 ? `He pays ${b5Coin(pay)} back across his board, ${b5Coin(g.net)} more than you put down${gain > paidGain ? ', which is all he will pay one soldier at a festival, he says, and shuts the book on the rest' : ''}.` : back > 0 ? `He pays ${b5Coin(back)} back across his board, which is less than you put down.` : `The ${b5Coin(g.staked)} is his. He says so kindly.`);
    AUDIO.play(g.net > 0 ? 'win' : 'lose'); };
  /* the board, drawn: an easel under a lamp by the gate, the chalked lines, the bookmaker, the canal's glint beyond */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, mo = REDUCE() ? 0 : 1;
    const sk = ctx.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, '#070a16'); sk.addColorStop(.5, '#1a1a2a'); sk.addColorStop(1, '#141418'); ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 12; i++) { const k = mo ? (Math.sin(t/(3000 + i*500) + i) + 1)/2 : .5; glow(ctx, W*(.05 + i*.08), H*(.12 + (i % 3)*.04) + k*2, 9, '#ffb060', .3); }
    ctx.fillStyle = '#2a2a30'; ctx.fillRect(0, H*.62, W, H*.38); ctx.strokeStyle = 'rgba(0,0,0,.35)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(0, H*(.66 + i*.06)); ctx.lineTo(W, H*(.66 + i*.06)); ctx.stroke(); }
    glow(ctx, W*.86, H*.22, W*.3, '#ffc070', .2); ctx.fillStyle = '#c9a35a'; ctx.fillRect(W*.86 - 3, H*.18, 6, 9);
    const fs = Math.max(1.4, Math.min(2.6, H / 120)); drawFigure(ctx, 'b5_c1_bookman', W*.84, H*.66, fs, t, {still:true, dir:-1});
    // the easel and the board
    const bx = W*.06, by = H*.1, bw = Math.min(W*.68, 420), bh = H*.62; ctx.strokeStyle = '#4a3420'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + bw*.2, by + bh); ctx.lineTo(bx + bw*.24, by + bh + H*.12); ctx.moveTo(bx + bw*.8, by + bh); ctx.lineTo(bx + bw*.76, by + bh + H*.12); ctx.stroke();
    ctx.fillStyle = '#1c2420'; ctx.fillRect(bx, by, bw, bh); ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 4; ctx.strokeRect(bx, by, bw, bh);
    const sz = Math.max(9, Math.min(15, bh / 13)), chalk = 'rgba(236,232,220,.9)', dim = 'rgba(236,232,220,.38)', cols = 3, cw = bw / (cols + 1.2);
    b5gText(ctx, 'THE ERRANT\'S SPECIAL LIST', bx + bw/2, by + sz*1.4, sz, chalk, 'center', '\'IM Fell English SC\', serif', 400);
    for (let li = 0; li < 3; li++) { const cx = bx + cw*(1.2 + li) + cw*.1; b5gText(ctx, `${B5G_LINES[li].fine}`, cx, by + sz*3, sz*.9, li === g.line && !g.res ? '#f2d488' : dim); }
    B5G_WORDS.forEach(([w], wi) => { const y = by + sz*(4.4 + wi*1.5); b5gText(ctx, w, bx + sz*.6, y, sz*.85, chalk, 'left', '\'IM Fell English\', serif', 400);
      for (let li = 0; li < 3; li++) { const cx = bx + cw*(1.2 + li) + cw*.1, o = odds(li, wi), shaded = g.read && g.roll && g.roll.ok && g.shade[li] === wi, picked = g.bets[li] && g.bets[li].w === wi, won = g.res && g.res[li] === wi;
        if (won) { ctx.strokeStyle = '#f2d488'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.ellipse(cx, y - sz*.3, sz*1.2, sz*.62, 0, 0, 7); ctx.stroke(); }
        b5gText(ctx, `${o}`, cx, y, sz*.85, picked ? '#9fe0b8' : shaded ? 'rgba(236,232,220,.55)' : chalk);
        if (shaded) { ctx.strokeStyle = 'rgba(232,192,115,.7)'; ctx.setLineDash([2, 2]); ctx.beginPath(); ctx.moveTo(cx - sz*.8, y + 3); ctx.lineTo(cx + sz*.8, y + 3); ctx.stroke(); ctx.setLineDash([]); } } });
    if (g.res) { ctx.fillStyle = 'rgba(28,36,32,.55)'; ctx.fillRect(bx + 4, by + bh*.8, bw - 8, bh*.18); b5gText(ctx, 'The morning\'s chalk', bx + bw/2, by + bh*.92, sz*.8, '#f2d488', 'center', '\'IM Fell English\', serif', 400); } };
  mgKeys({'1':() => g.pick == null ? word(0) : stake(1), '2':() => g.pick == null ? word(1) : stake(2), '3':() => g.pick == null ? word(2) : stake(3), '4':() => word(3), '5':() => word(4), '6':() => word(5), '0':() => pass(), ' ':() => { const b = $('#wgDone'); if (b) b.click(); }});
  g.talk = mgSay('', `By the barracks gate, under the lamp, a bookmaker from the Low Walk has set up an easel and a chalk board, and the company is round it with its festival docks. Tomorrow's Special Drownings: three lines, a weight of fine on each, no names. The court does not give the bookmakers names. The bookmakers do not ask.`) +
    mgSay('The bookmaker', '"Six words, soldiers, the same six since the Errant was a boy. A dock, two, three. Every stake in my book and every book honest." He taps the board with the chalk. "Ask anyone on the Low Walk."') +
    (b5In('tobet') ? mgSay('', 'Tobet stands at the back of the crowd round the board, and when the soldiers round him make the old jokes he laughs at the right places.') : '');
  draw();
}
/* what the board leaves behind: one line of the morning's chalk, for the tiers */
function b5WagerPay(r){ if (!r || !r.done) return; const w = (r.res || []).map(i => B5G_WORDS[i] ? B5G_WORDS[i][0] : '').filter(Boolean);
  S.f.b5_wager = {net:r.net, staked:r.staked, line:`${w.length ? `Its chalk says ${w.join(', ')}, and then he wipes it.` : 'He wipes it.'} ${r.staked ? (r.net > 0 ? 'Some of that was yours, and he has paid it.' : 'None of that was yours.') : 'You had nothing on it.'}`}; save(); }

/* ============ 2. Harbour Tiles ============
   The dockers' game on the strand at Trate (Ch2, b5g_tiles): plain counting-tiles, the bone squares the harbour gangs tally crates with,
   two of each from one to nine, eighteen in a bag. Nothing of the Holds on them: pips, no faces. The docker turns one up; you put a dock
   or two down and call the next one higher or lower; a tile the same is the docker's. Eight calls. Every tile turned stays turned, face up
   in a row, so a soldier who counts can know what is left in the bag. Once a game you may count the bag outright (Wits; Perrit, the
   sergeant, Brune and Tobet with an edge): the tally of what is left shows for the rest of the game. A near count, and the docker sees it
   and charges a dock for the lesson. Book Four's hand game for the shape (turns, a read once a game). Docks, net capped at 12 a book,
   paid as the table closes; played once a chapter. */
const B5G_TILESCAP = 12;
function playHarbourTiles(opt = {}){
  let on = () => true; const TURNS = 8;
  const bag = []; for (let n = 1; n <= 9; n++) bag.push(n, n); for (let i = bag.length - 1; i > 0; i--) { const j = R(i + 1); [bag[i], bag[j]] = [bag[j], bag[i]]; }
  const g = MG.state = {turn:0, face:bag.pop(), bag, shown:[], net:0, won:0, lost:0, counted:false, roll:null, talk:'', over:false, last:null, flipT:0};
  g.shown.push(g.face);
  const capLeft = () => Math.max(0, B5G_TILESCAP - (S.f.b5_tilesNet || 0));
  const purse = () => (S.silver || 0) + g.net;
  const result = () => ({net:g.net, won:g.won, lost:g.lost, turns:g.turn, counted:g.counted, done:g.over && g.turn >= TURNS});
  const finish = () => { if (g.paid) return; g.paid = true; const pay = g.net > 0 ? Math.min(g.net, capLeft()) : Math.max(g.net, -(S.silver || 0));
    S.silver = (S.silver || 0) + pay; updSilver(); g.pay = pay; if (pay > 0) S.f.b5_tilesNet = (S.f.b5_tilesNet || 0) + pay; };
  const close = () => { finish(); mgClose(result()); };
  mgOpen({kick:'The strand at Trate · the dockers\' fire', title:'Harbour Tiles', leaveText:'Leave the tiles', done:r => opt.after && opt.after(r), leave:() => { g.over = true; finish(); mgClose(Object.assign(result(), {left:true, done:false})); }}); on = b5gOn();
  const left = () => { const c = {}; g.bag.forEach(n => { c[n] = (c[n] || 0) + 1; }); return c; };
  const odds = () => { const c = left(), hi = g.bag.filter(n => n > g.face).length, lo = g.bag.filter(n => n < g.face).length, eq = g.bag.filter(n => n === g.face).length; return {hi, lo, eq, c}; };
  const draw = () => { const o = odds();
    mgPanel(`<div class="cpbar"><span>${g.over ? 'The tiles are put away' : `Call ${Math.min(g.turn + 1, TURNS)} of ${TURNS}`}</span><span>Purse: <b>${purse()}</b> docks</span><span>${g.net ? `${g.net > 0 ? 'Up' : 'Down'} <b>${Math.abs(g.net)}</b>` : 'Even'}</span></div>
      ${g.talk}${b5gRollHTML(g.roll)}
      ${g.counted === true && !g.over ? `<p class="fine">In the bag: ${o.hi} higher than ${g.face}, ${o.lo} lower, ${o.eq} the same (the docker's).</p>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="htDone" data-bot="1">Back to the fire</button>`
        : [['h', 1], ['h', 2], ['l', 1], ['l', 2]].map(([c, n]) => `<button class="btn ${n === 1 ? 'primary' : ''}" data-c="${c}${n}" ${purse() >= n ? '' : 'disabled'} data-bot="1">${c === 'h' ? 'Higher' : 'Lower'} · ${b5Coin(n)}</button>`).join('') + (g.counted ? '' : `<button class="btn" id="htCount" data-bot="1">Count the bag (once)</button>`)}</div>
      <p class="fine">The docker turns a tile. Call the next one higher or lower, for a dock or two; a tile the same is the docker's. Eight calls. Every tile turned stays face up, so you can count what is left. The tiles pay at most ${b5Coin(B5G_TILESCAP)} over what you sat down with, once.</p>
      <p class="hint keys"><kbd>↑</kbd> higher · <kbd>↓</kbd> lower (a dock) · <kbd>Shift</kbd> with it for two · <kbd>C</kbd> count · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-c]').forEach(b => b.onclick = () => { AUDIO.play('click'); call(b.dataset.c[0], +b.dataset.c[1]); });
    if ($('#htCount')) $('#htCount').onclick = () => { AUDIO.play('click'); count(); };
    if ($('#htDone')) $('#htDone').onclick = () => { AUDIO.play('click'); close(); }; };
  const count = () => { if (g.counted || g.over) return; g.counted = true;
    const r = g.roll = b5gRoll('wits', 13, null, [['she counts for pleasure', 2, 'perrit'], ['you count debts to the dock', 1, 'sgt'], ['she grew up on the Shake beaches, where the dockers play', 1, 'brune'], ['he counts arrows, then debts, then arrows', 1, 'tobet']]);
    if (r.ok) g.talk = mgSay(r.who === 'sgt' ? '' : NAME(r.who), r.who === 'sgt' ? 'You count the row of turned tiles, and take it from eighteen, and know what is in the bag as well as the docker does.' : `${NAME(r.who)} looks along the row of turned tiles, lips moving. "Eighteen to start, two of each," ${b5He(r.who)} says, very quietly. "So the bag's got this in it." And it does.`);
    else if (r.tier === 'near') { g.net -= 1; g.talk = mgSay('The docker', `"Counting, soldier?" He grins, and holds out his hand for a dock. "Docker's manners. You pay for the lesson." You pay. You have the count. <span class="dim">(−1)</span>`); }
    else { g.counted = 'tried'; g.talk = mgSay('', `${NAME(r.who)} tries to count the row and loses it at eleven, when the docker turns a tile over to straighten it.`); }
    draw(); };
  const call = (c, n) => { if (g.over || purse() < n) return; const next = g.bag.pop(), right = c === 'h' ? next > g.face : next < g.face;
    g.last = {from:g.face, to:next, c, right}; g.flipT = performance.now(); g.face = next; g.shown.push(next);
    if (right) { g.net += n; g.won++; AUDIO.play('coin'); } else { g.net -= n; g.lost++; AUDIO.play('miss'); }
    g.talk = mgSay('', `${b5Coin(n)} on ${c === 'h' ? 'higher' : 'lower'} than ${g.last.from}. The docker turns it: <b>${next}</b>. ${right ? b5gPick(['He pushes your docks back across with his.', 'He swears, mildly, and pays.', '"Errant\'s luck," he says, and pays.']) : next === g.last.from ? b5gPick(['The same. "Docker\'s," he says, and takes it.', 'A pair. The docker taps it and takes your dock.']) : b5gPick(['He takes the dock without comment.', '"Not tonight," he says, and takes it.'])}`);
    g.turn++; if (g.turn >= TURNS || !g.bag.length) end(); draw(); };
  const end = () => { g.over = true; finish(); const W = g.net > 0;
    mgDeed(W ? 'b5TilesWon' : g.net < 0 ? 'b5TilesLost' : 'b5TilesEven'); AUDIO.play(W ? 'win' : 'lose');
    g.talk += mgSay('The docker', W ? `"${g.won} calls of ${TURNS}." He sweeps the tiles into the bag. "Whitefinders. I'll not play the Sixth again till you've gone up the river."${g.net > g.pay ? ' He pays what the board pays one soldier, he says, and not a dock more.' : ''}` : g.net < 0 ? `"${g.won} of ${TURNS}." He sweeps the tiles into the bag, and your docks after them. "The harbour always wins. Ask anyone."` : '"Even," he says, and seems to find that the most annoying result of all.'); };
  const geo = () => { const W = MG.W, H = MG.H, s = Math.min(W * .1, H * .17); return {W, H, s}; };
  const tile = (ctx, x, y, s, n, face = true, k = 1) => { ctx.save(); ctx.translate(x, y); ctx.scale(k, 1);
    ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-s/2 + 2, -s/2 + 3, s, s);
    ctx.fillStyle = face ? '#e6dcc4' : '#b8a888'; ctx.fillRect(-s/2, -s/2, s, s); ctx.strokeStyle = '#7a6a4a'; ctx.lineWidth = 1; ctx.strokeRect(-s/2 + .5, -s/2 + .5, s - 1, s - 1);
    ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-s/2, -s/2, s, Math.max(1, s*.06));
    if (face) { const P = {1:[[1,1]], 2:[[0,0],[2,2]], 3:[[0,0],[1,1],[2,2]], 4:[[0,0],[2,0],[0,2],[2,2]], 5:[[0,0],[2,0],[1,1],[0,2],[2,2]], 6:[[0,0],[2,0],[0,1],[2,1],[0,2],[2,2]], 7:[[0,0],[2,0],[0,1],[1,1],[2,1],[0,2],[2,2]], 8:[[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2]], 9:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]]}[n] || [];
      P.forEach(([i, j]) => { ctx.fillStyle = '#2a2018'; ctx.beginPath(); ctx.arc(-s*.28 + i*s*.28, -s*.28 + j*s*.28, s*.07, 0, 7); ctx.fill(); }); } // pips, scored and blacked: a counting-tile
    else { ctx.strokeStyle = 'rgba(90,70,40,.5)'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-s*.3, -s*.2 + i*s*.2); ctx.lineTo(s*.3, -s*.2 + i*s*.2); ctx.stroke(); } } // the plain back, scored for grip
    ctx.restore(); };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const {W, H, s} = geo(), mo = REDUCE() ? 0 : 1, now = performance.now();
    const sk = ctx.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, '#060814'); sk.addColorStop(.45, '#141a2c'); sk.addColorStop(.46, '#141e2a'); sk.addColorStop(.6, '#0a121a'); sk.addColorStop(.61, '#2a2620'); sk.addColorStop(1, '#141210'); ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 30; i++) { ctx.fillStyle = `rgba(220,226,250,${(.15 + hash(i, 8921)*.4).toFixed(2)})`; ctx.fillRect(hash(i, 8922)*W, hash(i, 8923)*H*.4, 1, 1); }
    const wy = H*(.6 + (mo ? Math.sin(t/2200) : 0)*.01); ctx.fillStyle = 'rgba(200,214,230,.2)'; ctx.fillRect(0, wy, W, 2);
    const fx = W*.86, fy = H*.9, fl = b2Fl(t); ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, H*.4, '#ff8a3a', .32*fl); ctx.globalCompositeOperation = 'source-over'; poly(ctx, [[fx - 8, fy], [fx - 2, fy - 16*fl], [fx + 1, fy - 7], [fx + 4, fy - 13*fl], [fx + 8, fy]], 'rgba(255,150,60,.95)');
    const fs = Math.max(1.3, Math.min(2.4, H / 130)); drawFigure(ctx, 'b5_c2_wrecker', W*.84, H*.6, fs, t, {still:true, dir:-1, phase:2}); // the docker, across the board
    // the board: an upturned crate lid on the shingle
    ctx.fillStyle = '#3a2c1e'; ctx.fillRect(W*.06, H*.62, W*.68, H*.32); ctx.strokeStyle = '#1e160e'; ctx.lineWidth = 2; ctx.strokeRect(W*.06, H*.62, W*.68, H*.32); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(W*.06, H*(.62 + i*.08)); ctx.lineTo(W*.74, H*(.62 + i*.08)); ctx.stroke(); }
    // the face tile, big, flipping in when it is turned
    const k = Math.min(1, (now - g.flipT) / 260), fk = g.flipT && k < 1 ? Math.abs(Math.cos(k * Math.PI)) : 1, showFace = !(g.flipT && k < .5);
    tile(ctx, W*.4, H*.3, s*1.6, showFace ? g.face : 0, showFace, Math.max(.05, fk));
    if (g.last && !g.over && k >= 1) b5gText(ctx, g.last.right ? 'paid' : 'the docker\'s', W*.4, H*.3 + s*1.25, Math.max(10, s*.3), g.last.right ? '#9fe0b8' : 'rgba(232,192,115,.75)');
    tile(ctx, W*.14, H*.3, s*.9, 0, false); b5gText(ctx, `${g.bag.length} in the bag`, W*.14, H*.3 + s*.8, Math.max(9, s*.24), 'rgba(232,192,115,.7)');
    // the row of turned tiles along the board
    const row = g.shown.slice(0, -1), rs = Math.min(s*.62, (W*.64) / Math.max(9, row.length + 1)); row.forEach((n, i) => tile(ctx, W*.09 + rs*.6 + i*rs*1.06, H*.7 + (i % 2)*rs*.1, rs, n, true));
    if (g.counted === true && !g.over) { const c = left(); for (let n = 1; n <= 9; n++) { const x = W*.09 + (n - 1)*W*.07, y = H*.88; b5gText(ctx, `${n}`, x + rs*.3, y, Math.max(9, rs*.36), 'rgba(236,232,220,.85)'); for (let j = 0; j < (c[n] || 0); j++) { ctx.fillStyle = '#e8c073'; ctx.fillRect(x + rs*.3 - 5 + j*6, y + 4, 4, 4); } } }
  };
  mgKeys({ArrowUp:e => call('h', e && e.shiftKey ? 2 : 1), ArrowDown:e => call('l', e && e.shiftKey ? 2 : 1), c:() => count(), ' ':() => { const b = $('#htDone'); if (b) b.click(); }});
  g.talk = mgSay('', `Down the strand from the Sixth's fire the harbour gang has a fire of its own, and an upturned crate lid on the shingle, and a bag of counting-tiles: the plain bone squares the dockers tally crates with, scored with pips, two of each from one to nine. Nothing of the Holds on them. "Nobody reads these," the docker says. "You just count them."`) +
    mgSay('The docker', `"I turn one. You say the next is higher or lower, a dock or two. Same is mine." He turns the first. It is a ${g.face}. "Sit, soldier."`) +
    (b5In('perrit') ? mgSay('', 'Perrit sits down behind you, and looks at the bag, and you can see her starting to count.') : '');
  draw();
}
/* what the tiles leave behind */
function b5TilesPay(r){ if (!r) return; S.f.b5_tiles = {net:r.net, won:r.won, lost:r.lost, done:!!r.done}; save(); }

/* ---- the chapters' fires: the games offered, and what they leave behind ---- */
{ const wrap = (CH, id, f) => { const _n = CH.dlg[id]; if (!_n) return; CH.dlg[id] = () => { const n = _n(); return f(n) || n; }; };
  const after = (n, t, ch) => { const i = n.ch.findIndex(c => typeof c.t === 'string' && new RegExp(t).test(c.t)); n.ch.splice(i < 0 ? n.ch.length - 1 : i + 1, 0, ...ch); return n; }; // beside the squad's talk, before the ways on
  const back = id => [{t:'Back to the fire.', go:id}];
  /* Ch1: the bookmaker's board by the barracks gate on the festival night */
  if (typeof B5CH1 !== 'undefined') { wrap(B5CH1, 'b5_c1_yard', n => after(n, '^Talk with the squad', [{t:'A bookmaker has a chalk board by the gate with tomorrow\'s Special Drownings on it. Look at the odds.', tag:'The Wager Board', req:()=>(S.f.b5_c1_ph || 1) >= 3 && !S.f.b5_wager && (S.silver || 0) >= 1, go:()=>playWager({after:r => { b5WagerPay(r); S.f.b5_wagerLast = r; talk('b5_c1_wager_after'); }})}]));
    B5CH1.dlg.b5_c1_wager_after = () => { const r = S.f.b5_wagerLast || {}; return {sp:'The Sixth\'s fire', scene:'b5_barracks', txt: !r.done ?
`You leave the board without a stake down. The bookmaker does not mind. He has a company.` : !r.staked ?
`You watched the board fill and put nothing on it. In the morning the chalk will say what it says, and none of it will be yours.` : r.net > 0 ?
`You come back to the fire a few docks heavier, with a chit in your pocket that the bookmaker has already paid. ${b5In('tobet') ? 'Tobet looks at the chit and then at the fire. "Long odds," he says. He does not say on what.' : 'The squad does not ask what you had on it.'}` :
`You come back to the fire ${r.net < 0 ? `${b5Coin(-r.net)} lighter` : 'about where you started'}. ${b5In('perrit') ? 'Perrit has already worked out the bookmaker\'s cut, and tells you what it was. You did not ask.' : 'The bookmaker\'s cut is in it somewhere.'}`,
      ch:back('b5_c1_yard')}; };
    const j = B5CH1.journal; if (j) B5CH1.journal = () => { const x = j(), r = S.f.b5_wagerLast; if (r && r.done && r.staked) x.unshift(r.net > 0 ? 'A bookmaker set up a chalk board by the barracks gate on the festival night. The sergeant laid a few docks on the Special list, and came out ahead.' : 'A bookmaker set up a chalk board by the barracks gate on the festival night. The sergeant laid a few docks on the Special list.'); return x; }; }
  /* Ch2: the dockers' counting-tiles down the strand at Trate */
  if (typeof B5CH2 !== 'undefined') { wrap(B5CH2, 'b5_c2_fire', n => after(n, '^Talk with the squad', [{t:'Down the strand the harbour gang has a bag of counting-tiles out on a crate lid. Sit in.', tag:'Harbour Tiles', req:()=>(S.f.b5_c2_ph || 1) >= 2 && !S.f.b5_tiles && (S.silver || 0) >= 1, go:()=>playHarbourTiles({after:r => { b5TilesPay(r); S.f.b5_tilesLast = r; talk('b5_c2_tiles_after'); }})}]));
    B5CH2.dlg.b5_c2_tiles_after = () => { const r = S.f.b5_tilesLast || {}; return {sp:'The Sixth\'s fire on the strand', scene:'b5_c2_strand', txt: !r.turns ?
`You leave the dockers' tiles before the first call. The docker does not mind. There is a whole harbour gang to play.` : r.net > 0 ?
`You come back up the strand to the fire a few docks heavier. ${b5In('brune') ? 'Brune looks at the docks, and at the dockers\' fire. "They let you win the last one," she says. "So you will come back." She does not say whether that is a bad thing.' : 'Down the strand the dockers are already playing each other again, louder.'}` : r.net < 0 ?
`You come back up the strand to the fire ${b5Coin(-r.net)} lighter. ${b5In('perrit') ? 'Perrit tells you which call you should not have made, and why, with the count. You did not ask.' : 'The harbour always wins. Everybody in Trate says so.'}` :
`You come back up the strand to the fire with exactly what you went down with, which the docker seemed to take personally.`,
      ch:back('b5_c2_fire')}; };
    const j = B5CH2.journal; if (j) B5CH2.journal = () => { const x = j(), r = S.f.b5_tilesLast; if (r && r.turns) x.unshift(r.net > 0 ? 'On the strand at Trate the sergeant sat in on the dockers\' counting-tiles, and came out ahead.' : 'On the strand at Trate the sergeant sat in on the dockers\' counting-tiles.'); return x; }; }
}
