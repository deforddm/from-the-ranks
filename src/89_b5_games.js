/* ============ Book Five: the games at the fires (v8.0) ============ */
/* The games pass for Book Five keeps its games here and wraps the chapters' fire nodes from this file, as Book Four's 79 does, so the
   chapter files are untouched. The brief's table (docs/mt-book-brief.md, "The fires and the games"):
   - The Wager Board (Ch1, the barracks yard, b5g_wager): the bookmaker's chalk board for tomorrow's Special Drownings. Written with
     Chapter One (session 6); headline only: a chalked list of categories and odds, and one line of result the next morning. Never a
     named swimmer, never the swim itself.
   - Harbour Tiles (Ch2) and Knucklebones (Ch3) are written below with their chapters; the Token Auction (Ch5) is written below with its
     chapter; the Whitefinders' Drill (Ch6): the games pass adds it below.
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

/* ============ 3. Knucklebones ============
   With the barge crews on the dock at Kraig's Landing (Ch3, b5g_bones). Book One's bones (playBones) for the rules, Book Three's voices
   for the shape: two knucklebones, throw as often as you like and bank when you are scared. The bargemen mark one face of each bone with a
   lead sinker, the Drownings' weight: a sinker wipes the throw, and two sinkers (a Drowning) wipe everything you have banked. A pair that
   isn't sinkers counts double. First to thirty takes the stake, a dock to three. Once a sitting the sergeant may touch the white fingertip
   for the Errant and throw a single sinker again (the Errant is Lether's god of chance as the Letherii pray to him, nothing more). Another
   game is offered while there are docks; the net is paid as the table closes, at most 15 docks over the book, once. */
const B5G_BONESCAP = 15, B5G_BONESGOAL = 30;
const B5G_BARGE = {name:'The bargeman', push:(turn, me, you) => turn < (you >= B5G_BONESGOAL - 8 ? 22 : me < you - 9 ? 18 : 14),
  start:['"Two bones. A sinker on each. Throw, bank, don\'t weep on my tarpaulin."', '"House rules: the river keeps count. I keep the docks."'],
  bust:['"Sinker. The river wanted that one."', 'He shrugs. "That\'s bones."'], drown:['A long silence. "A Drowning," he says, and does not laugh. Nobody on the dock laughs.'],
  bank:['"That\'ll do."', '"Banking. A bargeman knows when to tie up."'], big:['"Watch this. Watch the bones, not me."'],
  win:['"Pay the river. Me. I\'m the river."', 'He holds out a hand without looking up.'], lose:['He pays without a word, and then one word: "Again?"', '"Well thrown. The river\'ll have it back off you somewhere."']};
const B5G_CHAT = {meBust:['"Ha. Sinker."', '"That\'s the river, that is."'], meBig:['"Tie up, soldier. Bank it."'], meDrown:['"A Drowning! Oh, that\'s a hard one. Sorry. That\'s a hard one."'], meWin:['"He lost to a Whitefinder. I\'m telling the whole river."']};
function b5gBone(ctx, x, y, s, face, rot = 0, lift = 0){
  ctx.save(); ctx.translate(x, y - lift); ctx.rotate(rot);
  ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.ellipse(2, s*.55 + lift, s*.5, s*.14, 0, 0, 7); ctx.fill();
  const r = s*.2, h = s/2; ctx.beginPath(); ctx.moveTo(-h + r, -h); ctx.arcTo(h, -h, h, h, r); ctx.arcTo(h, h, -h, h, r); ctx.arcTo(-h, h, -h, -h, r); ctx.arcTo(-h, -h, h, -h, r); ctx.closePath();
  const g = ctx.createLinearGradient(-h, -h, h, h); g.addColorStop(0, '#ece2c8'); g.addColorStop(1, '#b0a07c'); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = 'rgba(60,40,20,.55)'; ctx.lineWidth = 1; ctx.stroke();
  if (face === 1) { // the sinker: a lead weight on a loop of cord, let into the bone
    ctx.strokeStyle = '#3a2616'; ctx.lineWidth = Math.max(1, s*.05); ctx.beginPath(); ctx.arc(0, -s*.16, s*.09, Math.PI, 0); ctx.stroke();
    ctx.fillStyle = '#4a4e56'; ctx.beginPath(); ctx.moveTo(-s*.16, -s*.08); ctx.lineTo(s*.16, -s*.08); ctx.lineTo(s*.22, s*.2); ctx.lineTo(-s*.22, s*.2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(220,226,236,.45)'; ctx.fillRect(-s*.12, -s*.04, s*.05, s*.2); }
  else ({2:[[-1,-1],[1,1]], 3:[[-1,-1],[0,0],[1,1]], 4:[[-1,-1],[1,-1],[-1,1],[1,1]], 5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]], 6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]}[face] || []).forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a*s*.27, b*s*.27, s*.075, 0, 7); ctx.fillStyle = '#3a2616'; ctx.fill(); });
  ctx.restore(); }
function playKnuckles(opt = {}){
  let on = () => true; const O = B5G_BARGE, pick = b5gPick, sp = () => Math.max(.4, SET.speed || 1), T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * sp());
  const g = MG.state = {me:0, opp:0, turn:0, who:'me', dice:[1 + R(6), 1 + R(6)], roll:0, busy:false, over:false, stake:null, started:false, talk:'', net:0, games:0, won:0, lost:0, errantUsed:false, errantReady:false, lastTurn:0, last:null};
  const capLeft = () => Math.max(0, B5G_BONESCAP - (S.f.b5_bonesNet || 0));
  const purse = () => (S.silver || 0) + g.net;
  const result = () => ({net:g.net, games:g.games, won:g.won, lost:g.lost, last:g.last, pay:g.pay || 0});
  const settle = () => { if (g.paid) return; g.paid = true; const pay = g.net > 0 ? Math.min(g.net, capLeft()) : Math.max(g.net, -(S.silver || 0));
    S.silver = (S.silver || 0) + pay; updSilver(); g.pay = pay; if (pay > 0) S.f.b5_bonesNet = (S.f.b5_bonesNet || 0) + pay; };
  const close = () => { settle(); mgClose(result()); };
  mgOpen({kick:'The dock at Kraig\'s Landing · the barge crews\' fire', title:'Knucklebones', leaveText:'Leave the bones', done:r => opt.after && opt.after(r),
    leave:() => { if (!g.over && g.stake && (g.me || g.opp || g.turn)) { g.net -= g.stake; g.games++; g.lost++; g.last = 'opp'; } g.over = true; settle(); mgClose(Object.assign(result(), {left:true})); }}); on = b5gOn();
  const say = (who, line) => { g.talk = mgSay(who, line); draw(); };
  const draw = () => { if (!g.started) return stakePick();
    const mine = g.who === 'me' && !g.busy && !g.over && !g.errantReady, pct = n => Math.min(100, n / B5G_BONESGOAL * 100);
    const again = g.over && purse() >= 1 && (S.f.b5_bonesNet || 0) + Math.max(0, g.net) < B5G_BONESCAP;
    mgPanel(`<div class="bscore"><div class="bs ${g.who === 'me' && !g.over ? 'on' : ''}"><span>${esc(S.name)}</span><b>${g.me}</b><i style="width:${pct(g.me)}%"></i>${g.who === 'me' && g.turn ? `<em>+${g.turn}</em>` : ''}</div>
      <div class="bs ${g.who === 'opp' && !g.over ? 'on' : ''}"><span>${O.name}</span><b>${g.opp}</b><i style="width:${pct(g.opp)}%"></i>${g.who === 'opp' && g.turn ? `<em>+${g.turn}</em>` : ''}</div></div>
      <p class="fine bgoal">First to ${B5G_BONESGOAL}. A sinker wipes the throw; two sinkers, a Drowning, wipe your bank; a pair counts double. Stake: ${b5Coin(g.stake)}. ${g.net ? `${g.net > 0 ? 'Up' : 'Down'} ${b5Coin(Math.abs(g.net))} tonight.` : ''}</p>
      ${g.talk}
      ${g.over ? `<div class="row mgbtns">${again ? `<button class="btn primary" id="kbAgain" data-bot="1">Another game</button>` : ''}<button class="btn ${again ? '' : 'primary'}" id="kbDone" data-bot="1">Back to the fire</button></div>`
      : g.errantReady ? `<div class="row mgbtns"><button class="btn on" id="kbErrant" data-bot="1">Touch the white fingertip: throw it again</button><button class="btn" id="kbLet" data-bot="1">Let it go</button></div>`
      : `<div class="row mgbtns"><button class="btn primary" id="kbThrow" data-bot="1" ${mine ? '' : 'disabled'}>Throw the bones</button><button class="btn" id="kbBank" data-bot="1" ${mine && g.turn ? '' : 'disabled'}>Bank ${g.turn || ''}</button></div>
        <p class="hint keys"><kbd>Space</kbd> throw · <kbd>B</kbd> bank · <kbd>Esc</kbd> leave</p>`}
      <p class="fine">The bones pay at most ${b5Coin(B5G_BONESCAP)} over what you sat down with, once.</p>`);
    if ($('#kbThrow')) $('#kbThrow').onclick = throwMe; if ($('#kbBank')) $('#kbBank').onclick = bank;
    if ($('#kbErrant')) $('#kbErrant').onclick = () => { AUDIO.play('magic'); g.errantReady = false; g.errantUsed = true; g.turn = g.lastTurn; say('', 'You touch the white fingertip on your shield\'s boss, for the Errant, and pick the sinker up again. The bargeman looks at the shield and decides not to say anything.'); };
    if ($('#kbLet')) $('#kbLet').onclick = () => { AUDIO.play('click'); g.errantReady = false; pass(); };
    if ($('#kbAgain')) $('#kbAgain').onclick = () => { AUDIO.play('click'); g.started = false; stakePick(); };
    if ($('#kbDone')) $('#kbDone').onclick = () => { AUDIO.play('click'); close(); }; };
  const tumble = cb => { g.busy = true; g.roll = performance.now(); AUDIO.play('shuffle'); draw();
    T(() => { const a = 1 + R(6), b = 1 + R(6); g.dice = [a, b]; g.roll = 0; AUDIO.play('dice', !(a === 1 || b === 1)); cb(a, b); }, REDUCE() ? 150 : 650); };
  const score = (a, b) => a === 1 && b === 1 ? 'drown' : a === 1 || b === 1 ? 'bust' : a === b ? (a + b) * 2 : a + b;
  const throwMe = () => { if (g.who !== 'me' || g.busy || g.over || g.errantReady) return; g.errantReady = false;
    tumble((a, b) => { g.busy = false; const s = score(a, b);
      if (s === 'drown') { g.lastTurn = g.turn; g.me = 0; g.turn = 0; say('A bargeman', pick(B5G_CHAT.meDrown)); return pass(); }
      if (s === 'bust') { g.lastTurn = g.turn; g.turn = 0; if (!g.errantUsed && g.lastTurn >= 6) { g.errantReady = true; say('', `A sinker. ${g.lastTurn} gone, unless the Errant is listening.`); return; } say('A bargeman', pick(B5G_CHAT.meBust)); return pass(); }
      g.turn += s; if (g.me + g.turn >= B5G_BONESGOAL) { g.me += g.turn; g.turn = 0; return finish('me'); }
      say(g.turn >= 15 ? 'A bargeman' : '', g.turn >= 15 ? pick(B5G_CHAT.meBig) : a === b ? `A pair of ${a}s, doubled: ${s}. ${g.turn} this turn.` : `${a} and ${b}. ${g.turn} this turn.`); }); };
  const bank = () => { if (g.who !== 'me' || g.busy || g.over || !g.turn || g.errantReady) return; g.me += g.turn; AUDIO.play('coin'); say('', `You bank ${g.turn}.`); g.turn = 0; pass(); };
  const pass = () => { if (g.over) return; g.errantReady = false; if (g.who === 'me') { g.who = 'opp'; g.turn = 0; draw(); T(oppTurn, 900); } else { g.who = 'me'; g.turn = 0; draw(); } };
  const oppTurn = () => { if (g.over || g.who !== 'opp') return;
    tumble((a, b) => { g.busy = false; const s = score(a, b);
      if (s === 'drown') { g.opp = 0; g.turn = 0; say(O.name, pick(O.drown)); return T(pass, 1100); }
      if (s === 'bust') { g.turn = 0; say(O.name, pick(O.bust)); return T(pass, 1000); }
      g.turn += s; if (g.opp + g.turn >= B5G_BONESGOAL) { g.opp += g.turn; g.turn = 0; return finish('opp'); }
      if (O.push(g.turn, g.opp, g.me)) { if (g.turn >= 15) say(O.name, pick(O.big)); else draw(); T(oppTurn, 800); }
      else T(() => { g.opp += g.turn; say(O.name, `${pick(O.bank)} <span class="dim">(${g.turn})</span>`); g.turn = 0; T(pass, 700); }, 600); }); };
  const finish = w => { g.over = true; g.busy = false; g.games++; const won = w === 'me'; g.last = w;
    g.net += won ? g.stake : -g.stake; if (won) g.won++; else g.lost++; AUDIO.play(won ? 'coin' : 'click');
    mgDeed(won ? 'b5BonesWon' : 'b5BonesLost');
    say(won ? 'A bargeman' : O.name, won ? `You take ${b5Coin(g.stake)}. ` + pick(B5G_CHAT.meWin.concat(O.lose)) : `The bargeman takes ${b5Coin(g.stake)}. ` + pick(O.win)); };
  const stakePick = () => { g.me = g.opp = g.turn = 0; g.who = 'me'; g.over = false; g.errantUsed = false; g.errantReady = false; g.stake = null;
    mgPanel(`${g.talk}${mgSay(O.name, pick(O.start))}<p class="fine">What's the stake? You have ${b5Coin(purse())}.</p>
      <div class="row mgbtns">${[1, 2, 3].map(n => `<button class="btn ${n === 1 ? 'primary' : ''}" data-st="${n}" data-bot="1" ${purse() >= n ? '' : 'disabled'}>${b5Coin(n)}</button>`).join('')}</div>
      <p class="fine bgoal">First to ${B5G_BONESGOAL}. Throw as often as you like and bank when you're scared. A sinker wipes the throw; two sinkers, a Drowning, wipe everything you've banked. A pair that isn't sinkers counts double. Once a sitting, a single sinker can be thrown again, for the Errant.</p>`);
    document.querySelectorAll('#mgPanel [data-st]').forEach(b => b.onclick = () => { AUDIO.play('coin'); g.stake = +b.dataset.st; g.started = true; g.talk = mgSay('', 'You throw first.'); draw(); }); };
  mgKeys({' ':() => { if (g.over) { const b = $('#kbAgain') || $('#kbDone'); b && b.click(); } else if (!g.started) { const b = $('#mgPanel [data-st]:not([disabled])'); b && b.click(); } else if (g.errantReady) { const b = $('#kbErrant'); b && b.click(); } else throwMe(); }, b:bank, Enter:() => { if (g.over) { const b = $('#kbDone'); b && b.click(); } else bank(); }});
  // the table: the dock at night, the river behind, the bargemen's fire, a tarpaulin on the planking for the bones
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, mo = REDUCE() ? 0 : 1;
    const sk = ctx.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, '#05070e'); sk.addColorStop(.36, '#121a28'); sk.addColorStop(.37, '#0e1a20'); sk.addColorStop(.52, '#08121a'); sk.addColorStop(.53, '#2a2218'); sk.addColorStop(1, '#14100c'); ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 30; i++) { ctx.fillStyle = `rgba(220,226,250,${(.12 + hash(i, 8931)*.4).toFixed(2)})`; ctx.fillRect(hash(i, 8932)*W, hash(i, 8933)*H*.3, 1, 1); }
    ctx.fillStyle = '#0a0c12'; ctx.beginPath(); ctx.moveTo(0, H*.36); for (let i = 0; i <= 12; i++) ctx.lineTo(W*i/12, H*(.3 - hash(i, 8934)*.1)); ctx.lineTo(W, H*.36); ctx.fill(); // the mountains
    for (let i = 0; i < 14; i++) { const y = H*(.38 + hash(i, 8935)*.13), x = ((hash(i, 8936)*W + t*mo*.012) % (W + 30)) - 15; ctx.fillStyle = `rgba(255,200,140,${(.06 + .1*hash(i, 8937)).toFixed(2)})`; ctx.fillRect(x, y, 6 + 10*hash(i, 8938), 1); } // the river going past
    ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(0, H*(.53 + i*.08)); ctx.lineTo(W, H*(.53 + i*.08)); ctx.stroke(); } // the dock's planks
    const fx = W*.5, fy = H*.5, fl = b2Fl(t); ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, H*.5, '#ff8a3a', .3*fl); ctx.globalCompositeOperation = 'source-over';
    poly(ctx, [[fx - 12, fy + 4], [fx - 3, fy - 22*fl], [fx + 2, fy - 9], [fx + 6, fy - 18*fl], [fx + 12, fy + 4]], 'rgba(255,150,60,.95)'); poly(ctx, [[fx - 5, fy + 4], [fx, fy - 10*fl], [fx + 5, fy + 4]], '#fff1c2');
    const fs = clamp(H/92, 1.6, 3.6); drawFigure(ctx, 'b5_c3_bargeman', W*.18, H*.74, fs, t, {still:!(g.who === 'opp' && g.busy), dir:1, phase:1}); drawFigure(ctx, 'b5_c3_bargeman', W*.84, H*.74, fs*.94, t, {still:true, dir:-1, phase:3});
    ctx.save(); ctx.translate(W/2, H*.76); ctx.transform(1, 0, -.08, 1, 0, 0); const bw = Math.min(W*.5, 260), bh = Math.min(H*.22, 80); ctx.fillStyle = '#3a4038'; ctx.fillRect(-bw/2, -bh/2, bw, bh); ctx.strokeStyle = '#5a6254'; ctx.lineWidth = 2; ctx.strokeRect(-bw/2 + 4, -bh/2 + 4, bw - 8, bh - 8); ctx.restore(); // the tarpaulin
    const k = g.roll ? (performance.now() - g.roll) / 650 : 1, s = Math.min(56, W*.1, H*.15);
    [0, 1].forEach(i => { const face = g.roll ? 1 + (Math.floor(performance.now()/70 + i*3) % 6) : g.dice[i], x = W/2 + (i ? 1 : -1)*s*.8 + (g.roll ? Math.sin(k*9 + i)*10 : 0), lift = g.roll ? Math.abs(Math.sin(k*Math.PI*2.5))*24*(1 - k) : 0;
      b5gBone(ctx, x, H*.76, s, face, g.roll ? k*6 + i : (i ? .12 : -.08), lift); });
    if (g.who === 'opp' && !g.over && g.started) b5gText(ctx, 'The bargeman throws', W*.18, H*.74 - 34*fs, Math.min(15, W*.035));
  };
  g.talk = mgSay('', `The barge crews have a tarpaulin spread on the planking by their fire, and two knucklebones on it, old and yellow, each with a lead sinker let into one face. "The Drownings' weight," a bargeman says, and taps it. "Throw that, and the river has your throw. Throw two, and it has the lot."`) +
    (S.f.b5_c2_key === 'dead' ? mgSay('A bargeman', '"The Sixth. You carried them out at Trate. Sit down. We\'ll only take a few docks off you."') : S.f.b5_c2_key === 'salvage' ? mgSay('A bargeman', '"The Sixth. The harbour master\'s forty. Sit down. Let\'s see some of it."') : '') +
    (b5In('ruuk') ? mgSay('', 'Ruuk squats at the edge of the tarpaulin and watches the bones the way he watches a spear in the air.') : '');
  stakePick();
}
/* what the bones leave behind */
function b5BonesPay(r){ if (!r) return; S.f.b5_bones = {net:r.net, games:r.games, won:r.won, lost:r.lost, pay:r.pay || 0}; save(); }

/* ============ 4. The Token Auction ============
   At the Sixth's fire on the road south (Ch5, b5g_tokens): the quartermaster sells what the column cannot carry and what nobody has
   signed for, by sealed bids, the old army way. Each bidder drops a clay token with a figure scratched on it into his pot, and the figure
   is docks written against the bidder's own line in the paybook, not docks in hand: Lether's way of paying for what you have not got.
   Three lots, one at a time; you choose whose line the token goes on (the roster that walks), or no token. Two soldiers of the column bid
   against you on every lot, sealed; the highest token takes the lot, and a tie goes to the token in the pot first, which is never yours.
   Once a game the squad may watch the tokens go in (Wits; Perrit, the sergeant, Pessa and Tobet with an edge) and see the top figure
   on the lot in hand; a near look costs a dock to the quartermaster for his trouble. No token may take a soldier past what the holder
   will wait for (the line where the collectors come). As the table closes, every winning token is written as debt (b5Owe) and its lot
   is handed over; then, once a book, a Grass Jacket will buy one consumable lot off you for 10 docks. Book Two's haggle for the feel. */
const B5G_TOKENS = [5, 10, 15, 20];
const B5G_RIVALS = ['A Grass Jacket', 'A garrison man from High Fort', 'A soldier of the Queen\'s Battalion', 'A Trate Legion straggler'];
function playTokens(opt = {}){
  let on = () => true;
  const kitLot = !(S.kit || []).includes('b5_c5_cachebow') ? 'b5_c5_cachebow' : !(S.kit || []).includes('b5_c5_cacheblade') ? 'b5_c5_cacheblade' : null;
  const LOTS = [
    {id:'salves', name:'Two salves in a jar', what:'field salve in waxed paper, two of them, in a jar with a cut seal', rv:[3, 12], resell:true, give:() => { S.inv.salve = (S.inv.salve || 0) + 2; }, take:() => { S.inv.salve = Math.max(0, (S.inv.salve || 0) - 2); }},
    kitLot ? {id:'kit', item:kitLot, name:ITEMS[kitLot].name, what:'out of a jar from somewhere up the road, the quartermaster says, and does not say where', rv:[6, 18], give:() => gain(kitLot)}
      : {id:'linen', name:'Linen and gut', what:'a roll of boiled linen and a coil of surgeon\'s gut, sealed in wax', rv:[2, 10], resell:true, give:() => { S.inv.salve = (S.inv.salve || 0) + 1; }, take:() => { S.inv.salve = Math.max(0, (S.inv.salve || 0) - 1); }},
    {id:'boots', name:'Dry boots for the squad', what:'six pairs of dry army boots, nobody\'s, in a sack', rv:[4, 14], give:() => { S.f.b5_c5_boots = 1; b5Rest('Dry boots all round, out of the quartermaster\'s sack, and the squad sits an hour with its feet out of the ash. Wounds close, mostly.'); }}];
  const rivals = LOTS.map(() => { const a = B5G_RIVALS.slice().sort(() => R(3) - 1).slice(0, 2); return a; });
  const g = MG.state = {lot:0, who:'sgt', pend:{}, wins:[], seen:[], read:false, peek:{}, roll:null, talk:'', closed:false, resold:false, sale:false};
  const walkers = () => (S.squad || []).filter(id => id === 'sgt' || (TPL[id] && B5_DEBT0[id] != null));
  const room = (id, n) => { const d0 = b5DebtStart(id), lim = d0 > 0 ? d0 * B5_PRESS : 50; return b5Debt(id) + (g.pend[id] || 0) + n <= lim; };
  const line = id => id === 'sgt' ? 'your line' : `${NAME(id)}'s line`;
  const rivalBid = L => L.rv[0] + R(L.rv[1] - L.rv[0] + 1);
  const result = () => ({done:g.closed, wins:g.wins.map(w => ({id:w.id, name:w.name, bid:w.bid, who:w.who})), owed:g.wins.reduce((a, w) => a + w.bid, 0), resold:g.resold, lots:g.seen.length});
  const apply = () => { if (g.applied) return; g.applied = true;
    g.wins.forEach(w => { b5Owe(w.who, w.bid, `the quartermaster's token auction: ${w.name.replace(/^An? /, 'a ').replace(/^The /, 'the ').replace(/^Two /, 'two ').replace(/^Dry /, 'dry ').replace(/^Linen /, 'linen ')}`); const L = LOTS.find(x => x.id === w.id); if (L && L.give) L.give(); });
    if (g.wins.length) mgDeed('b5TokensWon', g.wins.length); else mgDeed('b5TokensNone'); };
  const finish = () => { apply(); g.closed = true; const sell = g.wins.map(w => LOTS.find(x => x.id === w.id)).filter(L => L && L.resell);
    g.sale = !!sell.length && !S.f.b5_tokensResold; draw(); };
  mgOpen({kick:'The road south · the quartermaster\'s fire', title:'The Token Auction', leaveText:'Leave the tokens', done:r => opt.after && opt.after(r), leave:() => { apply(); g.closed = true; mgClose(Object.assign(result(), {left:true})); }}); on = b5gOn();
  const draw = () => { const L = LOTS[g.lot], done = g.closed;
    mgPanel(`<div class="cpbar"><span>${done ? 'The pot is empty' : `Lot ${g.lot + 1} of ${LOTS.length}`}</span><span>${done ? '' : `On: <b>${esc(line(g.who))}</b>`}</span><span>${g.wins.length ? `Tokens won: <b>${g.wins.length}</b>` : 'Nothing won yet'}</span></div>
      ${g.talk}${b5gRollHTML(g.roll)}
      ${!done ? `<p class="fine"><b>${esc(L.name)}</b>: ${esc(L.what)}.${g.peek[g.lot] != null ? ` The top token in the pot says <b>${g.peek[g.lot]}</b>.` : ''}</p>` : ''}
      <div class="row mgbtns">${done ? (g.sale ? `<button class="btn" id="tkSell" data-bot="1">Sell a lot on to the Grass Jacket for ${b5Coin(10)}</button>` : '') + `<button class="btn primary" id="tkDone" data-bot="1">Back to the fire</button>`
        : B5G_TOKENS.map(n => `<button class="btn ${n === 10 ? 'primary' : ''}" data-bid="${n}" ${room(g.who, n) ? '' : 'disabled'} data-bot="1">A token for ${n}</button>`).join('') + `<button class="btn" id="tkPass" data-bot="1">No token on this lot</button>`
          + (walkers().length > 1 ? `<button class="btn" id="tkWho" data-bot="1">Whose line: ${esc(g.who === 'sgt' ? 'yours' : NAME(g.who) + '\'s')}</button>` : '') + (!g.read ? `<button class="btn" id="tkRead" data-bot="1">Watch the tokens go in (once)</button>` : '')}</div>
      <p class="fine">Sealed bids, the old army way: a figure on a clay token, in docks written against a soldier's line in the paybook, not docks in hand. The highest token takes the lot; a tie goes to the token in the pot first. No token may take a soldier past the line where the collectors come. The tokens are written as the table closes.</p>
      <p class="hint keys"><kbd>1</kbd>–<kbd>4</kbd> a token · <kbd>0</kbd> no token · <kbd>W</kbd> whose line · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-bid]').forEach(b => b.onclick = () => { AUDIO.play('coin'); bid(+b.dataset.bid); });
    if ($('#tkPass')) $('#tkPass').onclick = () => { AUDIO.play('click'); bid(0); };
    if ($('#tkWho')) $('#tkWho').onclick = () => { AUDIO.play('click'); who(); };
    if ($('#tkRead')) $('#tkRead').onclick = () => { AUDIO.play('click'); read(); };
    if ($('#tkSell')) $('#tkSell').onclick = () => { AUDIO.play('coin'); sell(); };
    if ($('#tkDone')) $('#tkDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const who = () => { if (g.closed) return; const w = walkers(); g.who = w[(w.indexOf(g.who) + 1) % w.length] || 'sgt'; draw(); };
  const read = () => { if (g.read || g.closed) return; g.read = true; const L = LOTS[g.lot];
    if (g.bidsFor == null || g.bidsFor !== g.lot) { g.rb = rivals[g.lot].map(() => rivalBid(L)); g.bidsFor = g.lot; }
    const r = g.roll = b5gRoll('wits', 13, null, [['she counts the tokens as they go in', 2, 'perrit'], ['you know a quartermaster\'s pot to the dock', 1, 'sgt'], ['she has watched canal-men bid for a cargo', 1, 'pessa'], ['he counts everything', 1, 'tobet']]);
    if (r.ok) { g.peek[g.lot] = Math.max(...g.rb); g.talk = mgSay(r.who === 'sgt' ? '' : NAME(r.who), r.who === 'sgt' ? `You watch the tokens go into the pot the way you watched the bookmakers' chalk on the tiers at nine years old, and you see the scratches on the top one before it drops: ${g.peek[g.lot]}.` : `${NAME(r.who)} watches the two soldiers drop their tokens in, and leans to you. "The top one's a ${g.peek[g.lot]}," ${b5He(r.who)} says, very quietly.`); }
    else if (r.tier === 'near') { g.peek[g.lot] = Math.max(...g.rb); if ((S.silver || 0) > 0) { S.silver -= 1; updSilver(); } g.talk = mgSay('The quartermaster', `"Watching my pot, Sergeant?" He holds out his hand. "A dock, for my trouble. You've seen it now." You have: the top token says ${g.peek[g.lot]}. <span class="dim">(−1 dock)</span>`); }
    else g.talk = mgSay('', `${NAME(r.who)} watches the tokens go in, and they are clay, and they go in.`);
    draw(); };
  const bid = n => { if (g.closed || (n && !room(g.who, n))) return; const L = LOTS[g.lot];
    if (g.bidsFor !== g.lot) { g.rb = rivals[g.lot].map(() => rivalBid(L)); g.bidsFor = g.lot; }
    const top = Math.max(...g.rb), ti = g.rb.indexOf(top), mine = n > top;
    if (n) mgDeed('b5TokensBid');
    g.seen.push({id:L.id, mine:n, rb:g.rb.slice(), won:mine});
    if (mine) { g.wins.push({id:L.id, name:L.name, bid:n, who:g.who}); g.pend[g.who] = (g.pend[g.who] || 0) + n; AUDIO.play('win'); }
    else AUDIO.play(n ? 'lose' : 'click');
    g.talk = mgSay('The quartermaster', `He tips the pot out on the cloth and turns the tokens over: ${g.rb.map((b, i) => `${rivals[g.lot][i].replace(/^A /, 'a ')}, ${b}`).join('; ')}${n ? `; and ${line(g.who)}, ${n}` : ''}.`) +
      mgSay('', mine ? `${L.name} is the Sixth's, for ${b5Coin(n)} on ${line(g.who)}. The quartermaster makes a mark, and says he will write it when the pot is empty.` : n && n === top ? `A tie, and the tie goes to the token in the pot first, which was not yours. ${rivals[g.lot][ti]} takes it.` : n ? `${rivals[g.lot][ti]} takes it, for ${top}. Your token goes back in your hand.` : `${rivals[g.lot][ti]} takes it, for ${top}. The Sixth put nothing in.`);
    g.lot++; if (g.lot >= LOTS.length) { g.lot = LOTS.length - 1; finish(); } else draw(); };
  const sell = () => { if (!g.sale || g.resold || S.f.b5_tokensResold) return; const w = g.wins.find(x => { const L = LOTS.find(y => y.id === x.id); return L && L.resell; }); if (!w) return;
    const L = LOTS.find(y => y.id === w.id); if (L.take) L.take(); S.silver = (S.silver || 0) + 10; updSilver(); S.f.b5_tokensResold = 1; g.resold = true; g.sale = false; mgDeed('b5TokensResold');
    g.talk = mgSay('A Grass Jacket', `"${L.name}? I'll give you ten for it. Docks. Real ones." He counts them out. "The paybook can have the other figure."`) + mgSay('', `${L.name} goes to the Grass Jacket for ${b5Coin(10)} in hand. The token stays written against the line it was on, because that is how tokens work.`); draw(); };
  /* the table: a burned wall, the fire, the quartermaster at his cart, a pot on a cloth, tokens */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, mo = REDUCE() ? 0 : 1;
    const sk = ctx.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, '#06070c'); sk.addColorStop(.4, '#161618'); sk.addColorStop(.41, '#1a1714'); sk.addColorStop(1, '#0e0c0a'); ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 24; i++) { ctx.fillStyle = `rgba(220,226,250,${(.1 + hash(i, 8941)*.35).toFixed(2)})`; ctx.fillRect(hash(i, 8942)*W, hash(i, 8943)*H*.32, 1, 1); }
    ctx.fillStyle = '#242020'; ctx.beginPath(); ctx.moveTo(0, H*.62); for (let i = 0; i <= 8; i++) ctx.lineTo(W*.42*i/8, H*(.3 + hash(i, 8944)*.08)); ctx.lineTo(W*.42, H*.62); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(0, H*.3, W*.42, H*.04); // the burned wall
    const fx = W*.22, fy = H*.66, fl = b2Fl(t); ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, H*.5, '#ff8a3a', .3*fl); ctx.globalCompositeOperation = 'source-over'; poly(ctx, [[fx - 10, fy], [fx - 3, fy - 20*fl], [fx + 1, fy - 8], [fx + 5, fy - 16*fl], [fx + 10, fy]], 'rgba(255,150,60,.95)'); poly(ctx, [[fx - 4, fy], [fx, fy - 9*fl], [fx + 4, fy]], '#fff1c2');
    const fs = clamp(H/92, 1.5, 3.4); drawFigure(ctx, 'b5_c5_quartermaster', W*.84, H*.72, fs, t, {still:true, dir:-1});
    ctx.fillStyle = '#3a3226'; ctx.fillRect(W*.36, H*.74, W*.36, H*.14); ctx.strokeStyle = '#5a4a32'; ctx.lineWidth = 2; ctx.strokeRect(W*.36 + 3, H*.74 + 3, W*.36 - 6, H*.14 - 6); // the cloth on a crate
    const px = W*.54, py = H*.66, ps = Math.min(W*.06, H*.1); ell(ctx, px, py + ps*.55, ps*.6, ps*.14, 'rgba(0,0,0,.5)'); ctx.fillStyle = '#8a5a3a'; ctx.beginPath(); ctx.moveTo(px - ps*.36, py - ps*.4); ctx.quadraticCurveTo(px - ps*.6, py + ps*.1, px - ps*.3, py + ps*.55); ctx.lineTo(px + ps*.3, py + ps*.55); ctx.quadraticCurveTo(px + ps*.6, py + ps*.1, px + ps*.36, py - ps*.4); ctx.fill(); ell(ctx, px, py - ps*.42, ps*.32, ps*.1, '#2a1a10'); ctx.fillStyle = 'rgba(255,220,180,.18)'; ctx.fillRect(px - ps*.4, py - ps*.3, ps*.08, ps*.6); // the pot
    const last = g.seen[g.seen.length - 1]; if (last) { const toks = [...last.rb.map(b => [b, 0]), ...(last.mine ? [[last.mine, 1]] : [])]; toks.forEach(([b, m], i) => { const tx = W*.39 + i*W*.08, ty = H*.81; ell(ctx, tx, ty + 2, 11, 4, 'rgba(0,0,0,.4)'); ell(ctx, tx, ty, 11, 9, m ? '#c89a6a' : '#a87a52'); ctx.strokeStyle = m ? '#e8c073' : '#5a3a22'; ctx.lineWidth = m ? 1.4 : 1; ctx.beginPath(); ctx.ellipse(tx, ty, 11, 9, 0, 0, 7); ctx.stroke(); b5gText(ctx, `${b}`, tx, ty + 4, 11, '#2a1a10', 'center', '\'IM Fell English\', serif', 600); }); }
    if (!g.closed && mo) { const k = (t % 2400) / 2400; if (k < .4) { const u = k/.4, tx = lerp(W*.2, px, u), ty = lerp(H*.5, py - ps*.4, u) - Math.sin(u*Math.PI)*H*.12; ell(ctx, tx, ty, 4, 3.4, '#a87a52'); } } // a token arcing into the pot
    b5gText(ctx, g.closed ? 'The pot is empty' : `Lot ${g.lot + 1}: ${LOTS[g.lot].name}`, W*.5, H*.12, Math.max(11, Math.min(16, W*.036)), 'rgba(232,192,115,.9)'); };
  mgKeys({'1':() => bid(5), '2':() => bid(10), '3':() => bid(15), '4':() => bid(20), '0':() => bid(0), w:() => who(), ' ':() => { const b = $('#tkDone'); if (b) b.click(); }});
  g.talk = mgSay('', `The quartermaster has set a pot on a cloth on a crate by the Sixth's fire, and a bag of clay tokens beside it, and a list. The column has more on its carts than it can pull, and some of it is nobody's. "Sealed bids," he says. "The old army way. A token each, with a figure on it." He shakes the bag. "In docks against your own line, soldiers. Not in your hand. You haven't got it in your hand."`) +
    mgSay('The quartermaster', '"Highest token takes the lot. A tie goes to the token in first. I write it all when the pot\'s empty, and not before."') +
    (b5In('perrit') ? mgSay('', 'Perrit sits down where she can see the pot, and you can see her starting to count.') : b5In('pessa') ? mgSay('', 'Pessa looks at the bag of tokens. "So that is how the army sells you boots," she says.') : '');
  draw();
}
/* what the tokens leave behind */
function b5TokensPay(r){ if (!r) return; S.f.b5_tokens = {wins:(r.wins || []).length, owed:r.owed || 0, resold:!!r.resold, lots:r.lots || 0}; save(); }

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
  /* Ch3: knucklebones with the barge crews on the dock at Kraig's Landing */
  if (typeof B5CH3 !== 'undefined') { wrap(B5CH3, 'b5_c3_fire', n => after(n, '^Talk with the squad', [{t:'The bargemen have two knucklebones out on a tarpaulin by their fire. Sit in.', tag:'Knucklebones', req:()=>(S.f.b5_c3_ph || 1) <= 2 && !S.f.b5_bones && (S.silver || 0) >= 1, go:()=>playKnuckles({after:r => { b5BonesPay(r); S.f.b5_bonesLast = r; talk('b5_c3_bones_after'); }})}]));
    B5CH3.dlg.b5_c3_bones_after = () => { const r = S.f.b5_bonesLast || {}; return {sp:'The barge crews\' fire', scene:'b5_landing', txt: !r.games ?
`You leave the bones before the first throw. The bargemen do not mind. There is a whole river of bargemen.` : (r.pay || 0) > 0 ?
`You come back round the fire a few docks heavier. ${b5In('ruuk') ? 'Ruuk looks at the docks with approval. "You throw like a Faraed," he says. "Often, and as if you expect to win." He means it kindly.' : 'The bargemen are already throwing against each other again, louder.'}` : (r.pay || 0) < 0 ?
`You come back round the fire ${b5Coin(-r.pay)} lighter. ${b5In('perrit') ? 'Perrit tells you the odds of a sinker on two bones, and of two, and how many times you threw past twelve. You did not ask.' : 'The river has it. The bargemen say the river always has it.'}` :
`You come back round the fire with exactly what you sat down with, which the bargeman seemed to take personally.`,
      ch:back('b5_c3_fire')}; };
    const j = B5CH3.journal; if (j) B5CH3.journal = () => { const x = j(), r = S.f.b5_bonesLast; if (r && r.games) x.unshift((r.pay || 0) > 0 ? 'On the dock at Kraig\'s Landing the sergeant threw knucklebones with the barge crews, and came out ahead.' : 'On the dock at Kraig\'s Landing the sergeant threw knucklebones with the barge crews.'); return x; }; }

  /* Ch5: the quartermaster's token auction at the fire on the road south */
  if (typeof B5CH5 !== 'undefined') { wrap(B5CH5, 'b5_c5_fire', n => after(n, '^Talk with the squad', [{t:'The quartermaster has a pot and a bag of clay tokens out on a crate. Sealed bids, on the paybook.', tag:'The Token Auction', req:()=>(S.f.b5_c5_ph || 1) < 2 && !S.f.b5_tokens, go:()=>playTokens({after:r => { b5TokensPay(r); S.f.b5_tokensLast = r; talk('b5_c5_tokens_after'); }})}]));
    B5CH5.dlg.b5_c5_tokens_after = () => { const r = S.f.b5_tokensLast || {}, w = r.wins || []; return {sp:'The fire on the road', scene:'b5_road_south', txt: !r.lots ?
`You leave the quartermaster's pot before the first lot. He does not mind. There is a whole column to sell to.` : !w.length ?
`The pot is empty, and none of it went to the Sixth. ${b5In('tobet') ? 'Tobet looks at the clay tokens in his hand, unspent. "First time I\'ve come away from the army owing nothing more," he says. "I should do it more often."' : 'The tokens go back in the bag.'}` :
`The pot is empty, and the quartermaster writes it all in the clerk's book, by the fire, token by token: ${w.map(x => `${x.name.replace(/^An? /, 'a ').replace(/^The /, 'the ').replace(/^Two /, 'two ').replace(/^Dry /, 'dry ').replace(/^Linen /, 'linen ')}, ${b5Coin(x.bid)} on ${x.who === 'sgt' ? 'your line' : NAME(x.who) + '\'s'}`).join('; ')}.${r.resold ? ' One lot has gone on to a Grass Jacket for ten docks in hand, and the token stays written all the same.' : ''} ${b5In('perrit') ? 'Perrit adds it up out loud, which nobody asked her to do.' : 'The clerk blots it.'}`,
      ch:back('b5_c5_fire')}; };
    const j = B5CH5.journal; if (j) B5CH5.journal = () => { const x = j(), r = S.f.b5_tokensLast; if (r && r.lots) x.unshift((r.wins || []).length ? 'On the road south the quartermaster sold the column\'s spare stores by sealed tokens on the paybook, and the Sixth bought some of them, on its own lines.' : 'On the road south the quartermaster sold the column\'s spare stores by sealed tokens on the paybook. The Sixth bought nothing.'); return x; }; }
}
