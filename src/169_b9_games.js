/* ============ Book Nine: the games at the fires (v12.0) ============ */
/* Book Nine keeps its games here and wraps the chapters' fire nodes from this file, as Books Six to Eight do (109, 129, 149), so the
   chapter files 161-167 are untouched. Five games, one at each place the book's people gather, over both squads (docs/dod-games-notes.md):
   - The Short Sack (Ch1, the Third, b9_c1_fire, the yard by day): nine biscuit sacks off a Letherii wagon, one of them short; two
     weighings on the quartermaster's scale, then name it. Three lots. A sack of biscuit: Rations +1.
   - The Canal Locks (Ch2, the Letherii, b9_c2_fire): Saffa's bread-board race, two boats each up twelve locks of a Letheras canal; land on a
     boat and it goes in the canal. The bottom of Saffa's pot: Rations +1.
   - Yelt's Tally (Ch4, the Letherii, b9_c4_fire): Yelt calls a wagon off, sacks on and sacks off; keep the count in your head. A sack the
     count found: Rations +1.
   - Under the Helmet (Ch5, the Third, b9_c5_fire): four dice each under a helmet with the heavies at the next fire; bid what is under
     both, or call the bid a lie. Best of three hands. The pot's scrapings and a spare biscuit: Rations +1.
   - Knife in the Dirt (Ch7, the Third, b9_c7_fire, the retreat camp days after): five throws of a knife into the ground, each harder,
     against a heavy from the next fire. The regard of whichever squadmate needed the evening most, or Rations +1.
   No fire in Ch3 (the fever), Ch6 (the battle's day) or Ch7 before the dark: the squads are not at a table there (Claude's call).
   Each is declinable (the fire's own choices stay), played once a book, pays at most +1 Rations or +1 regard once, as the table closes,
   and keeps its deeds on S.deeds. None touches the Witness. They use the tables' frame (36), the in-game check (89: b5gRoll and its
   tiers), Book Six's night sky (109: b6gNight) and Book Seven's fire and die (129: b7gFire, b7gDie). */

const b9gOn = () => b5gOn(), b9gPick = a => b5gPick(a), b9gRoll = (s, dc, who, e) => b5gRoll(s, dc, who, e), b9gRollHTML = r => b5gRollHTML(r);
const b9gText = (...a) => b5gText(...a);
const B9G_SHE = ['haddat', 'sathi', 'marrow', 'mirrel', 'hessa', 'rasp', 'wenna', 'tegra', 'perrit', 'ammet', 'ilsa', 'brune', 'pessa', 'kaedra'];
const b9gHe = id => id === 'sgt' ? 'you' : B9G_SHE.includes(id) ? 'she' : 'he';
const b9gWho = r => r.who === 'sgt' ? 'You' : NAME(r.who);
const b9gV = (r, you, they) => r.who === 'sgt' ? you : they;
const b9gSp = () => Math.max(.4, SET.speed || 1);
const B9G_DCT = 15, B9G_DCL = 13; // the Third at 19 to 24, the Letherii at 11 to 16 (Claude's call, as Books Seven and Eight)
const b9gAfter = (sp, scene, back, txt) => ({sp, scene, txt, html:rationsHTML(), ch:[{t:'Back to the fire.', go:back}]});
const b9gSay = m => { for (const k of Object.keys(m)) if (k !== '_' && b9In(k)) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b9gList = a => a.map(i => i + 1).join(', ');

/* ============ 1. The Short Sack, in the barracks yard ============
   The quartermaster has nine biscuit sacks off a Letherii wagon, and one is short: a clerk's skim. Load sacks on the two pans, the same
   number each side; the light pan rises. Two weighings, then name the sack. Three lots: nine sacks, nine, then twelve (the clerk's three
   added, and two weighings are not always enough for twelve). Two lots take it. Once a game, at the start of a lot, heft the sacks by hand
   (Might; Brask, who has carried a heavy's kit, with an edge): made, a third weighing this lot; "yes, but", the third weighing, and a seam
   goes and the quartermaster tips three more sacks into the lot. Won: a sack of biscuit off his wagon, Rations +1, once. */
const B9G_SACKLOTS = [9, 9, 12], B9G_SACKW = 2, B9G_SACKWIN = 2;
function playB9Sack(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b9gSp());
  const g = MG.state = {lot:0, n:0, short:-1, pans:[], left:0, log:[], phase:'intro', talk:'', check:null, used:false, mine:0, lost:0, over:false, tilt:0, named:-1, hefted:false};
  const result = () => ({mine:g.mine, lost:g.lost, won:g.over && g.mine >= B9G_SACKWIN, done:g.over});
  mgOpen({kick:'The barracks yard · the quartermaster\'s scale', title:'The Short Sack', leaveText:'Leave the scale', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b9gOn();
  const side = s => g.pans.map((p, i) => p === s ? i : -1).filter(i => i >= 0);
  const canWeigh = () => g.phase === 'load' && g.left > 0 && side(1).length && side(1).length === side(2).length;
  const cell = i => { const p = g.pans[i], done = g.phase === 'between' || g.phase === 'over', sh = done && i === g.short, nm = i === g.named;
    return `<button class="btn${p || nm ? ' on' : ''}" data-sk="${i}" data-bot="1" style="min-width:0;width:100%;padding:0;height:42px;font-size:15px" ${g.phase === 'load' || g.phase === 'name' ? '' : 'disabled'}>${sh ? '✕ ' : ''}${i + 1}${p === 1 ? ' ◂' : p === 2 ? ' ▸' : ''}</button>`; };
  const draw = () => { mgPanel(`<div class="cpbar"><span>${g.over ? 'The scale is put away' : `Lot ${g.lot + 1} of 3: <b>${g.n || B9G_SACKLOTS[g.lot]}</b> sacks`}</span><span>Weighings left <b>${g.left}</b></span><span>You <b>${g.mine}</b> · the quartermaster <b>${g.lost}</b></span></div>
      ${g.talk}${b9gRollHTML(g.check)}${g.log.length ? `<p class="fine">${g.log.join('<br>')}</p>` : ''}
      ${g.phase !== 'intro' ? `<div style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:5px;width:100%;max-width:340px;margin:6px auto;box-sizing:border-box">${Array.from({length:g.n}, (_, i) => cell(i)).join('')}</div>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="skDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' ? `<button class="btn primary" id="skGo" data-bot="1">Lay out the sacks</button>`
        : g.phase === 'load' ? `<button class="btn primary" id="skWeigh" data-bot="1" ${canWeigh() ? '' : 'disabled'}>Weigh them</button><button class="btn" id="skName" data-bot="1">Name the short one</button>${!g.used && !g.hefted && g.left === B9G_SACKW ? `<button class="btn" id="skHeft" data-bot="1">Heft them by hand first (once)</button>` : ''}`
        : g.phase === 'name' ? `${g.left > 0 ? `<button class="btn" id="skBack" data-bot="1">Back to the scale</button>` : ''}<button class="btn" disabled data-bot="1">Tap the short sack</button>`
        : `<button class="btn" disabled data-bot="1">The quartermaster opens it</button>`}</div>
      <p class="fine">Tap a sack to put it on the left pan, again for the right, again to take it off. The same number each side; the light pan rises. Two weighings a lot, then name the short sack. Two lots of three take it.</p>
      <p class="hint keys"><kbd>W</kbd> weigh · <kbd>N</kbd> name · <kbd>H</kbd> heft · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-sk]').forEach(b => b.onclick = () => tap(+b.dataset.sk));
    if ($('#skGo')) $('#skGo').onclick = () => { AUDIO.play('click'); deal(); }; if ($('#skWeigh')) $('#skWeigh').onclick = () => weigh();
    if ($('#skName')) $('#skName').onclick = () => toName(); if ($('#skBack')) $('#skBack').onclick = () => { if (g.phase !== 'name') return; g.phase = 'load'; draw(); };
    if ($('#skHeft')) $('#skHeft').onclick = () => heft(); if ($('#skDone')) $('#skDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const deal = () => { if (g.over) return; g.n = B9G_SACKLOTS[g.lot]; g.short = R(g.n); g.pans = new Array(g.n).fill(0); g.left = B9G_SACKW; g.log = []; g.named = -1; g.tilt = 0; g.hefted = false; g.phase = 'load'; g.check = null;
    g.talk = mgSay('The quartermaster', g.lot === 2 ? '"Twelve, this lot. The clerk\'s three went on the end. Same scale, same two weighings."' : g.lot ? b9gPick(['"Another nine. Another clerk, I expect."', '"Nine. One light. You know the game now."']) : '"Nine sacks. One\'s light. Two goes on the scale, and then you tell me which."'); AUDIO.play('shuffle'); draw(); };
  const tap = i => { if (g.over || i < 0 || i >= g.n) return; if (g.phase === 'name') return name(i); if (g.phase !== 'load') return; g.pans[i] = (g.pans[i] + 1) % 3; AUDIO.play('click'); draw(); };
  const weigh = () => { if (!canWeigh()) return; const L = side(1), Rr = side(2), res = L.includes(g.short) ? 'left' : Rr.includes(g.short) ? 'right' : 'even'; g.left--;
    g.tilt = res === 'left' ? -1 : res === 'right' ? 1 : 0; AUDIO.play(res === 'even' ? 'click' : 'coin');
    g.log.push(`${b9gList(L)} against ${b9gList(Rr)}: ${res === 'even' ? 'they balance' : `the ${res} pan rises`}.`); g.pans = g.pans.map(() => 0);
    g.talk = mgSay('', res === 'even' ? b9gPick(['The beam settles level. Neither pan has it.', 'Level. The quartermaster grunts.']) : `The ${res} pan comes up a finger's width and stays there.`);
    if (!g.left) { g.phase = 'name'; g.talk += mgSay('The quartermaster', '"That\'s your weighings. Which one?"'); } draw(); };
  const toName = () => { if (g.phase !== 'load') return; g.phase = 'name'; g.talk = mgSay('The quartermaster', '"Go on, then. Which?"'); draw(); };
  const name = i => { if (g.phase !== 'name') return; g.named = i; const ok = i === g.short; if (ok) g.mine++; else g.lost++; g.phase = 'between'; AUDIO.play(ok ? 'coin' : 'miss');
    g.talk = mgSay('The quartermaster', ok ? b9gPick([`He slits sack ${i + 1} and puts his hand in. "Short. A good two fingers." He looks at you. "Huh."`, `"Sack ${i + 1}." He weighs it alone, and it is light, and he writes something on his slate.`])
      : `He slits sack ${i + 1}. Full. Sack ${g.short + 1} is the light one. ${b9gPick(['"The clerks are better at this than you," he says. "Practice."', '"Close," he says. It was not close.'])}`);
    draw(); if (g.mine >= B9G_SACKWIN || g.lost >= B9G_SACKWIN) return T(end, 900); T(() => { g.lot++; deal(); }, 1100); };
  /* the check: heft them by hand (Might). Made: a third weighing. Yes, but: the third weighing, and three more sacks in the lot. */
  const heft = () => { if (g.used || g.over || g.phase !== 'load' || g.left !== B9G_SACKW) return; g.used = g.hefted = true; AUDIO.play('click');
    const r = g.check = b9gRoll('might', B9G_DCT, null, [['he has carried a heavy\'s kit and a heavy\'s grudges since Letheras', 2, 'brask'], ['her mother weighed water-skins by hand on the Pan\'potsun', 1, 'haddat'], ['he knows the weight of a full satchel to the grain', 1, 'tangle'], ['you have humped biscuit sacks off a lot of wagons', 1, 'sgt']]);
    if (r.ok) { g.left++; g.talk = mgSay(r.who === 'brask' ? 'Brask' : '', r.who === 'brask' ? 'Brask picks up two sacks, one in each fist, and holds them out at arm\'s length like a heavy holding a shield. "Hands are a scale," he says. "Just a slow one." <span class="dim">(a third weighing this lot)</span>' : `${b9gWho(r)} ${b9gV(r, 'heft', 'hefts')} the sacks two at a time, arms out. The quartermaster lets it count as a weighing. <span class="dim">(a third weighing this lot)</span>`); }
    else if (r.tier === 'near') { g.left++; g.n += 3; g.pans = new Array(g.n).fill(0); g.short = R(g.n);
      g.talk = mgSay('The quartermaster', 'A seam goes with a sound like a sigh, and biscuit runs out on the flags. "Weigh by hand if you like," the quartermaster says. "I\'ll count the spill as the clerk\'s." He tips three more sacks into the lot. <span class="dim">(a third weighing; three more sacks)</span>'); }
    else g.talk = mgSay('', `${b9gWho(r)} ${b9gV(r, 'heft', 'hefts')} two sacks, one in each hand, and they weigh exactly the same, which is to say a lot.`);
    draw(); };
  const end = () => { g.over = true; g.phase = 'over'; const W = g.mine >= B9G_SACKWIN; mgDeed(W ? 'b9SackWon' : 'b9SackLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk = mgSay('The quartermaster', W ? `"${g.mine} lots." He drags a full sack off the wagon's end with his boot and leaves it at your feet. "Biscuit. Off the Letherii's count, not ours. If the clerks can skim it, a sergeant can win it."` : `"${g.lost} lots to me." He sweeps the spilled biscuit back into a sack with the side of his hand. "Keep your eyes on the clerks, Sergeant. They've had more practice than you."`) +
      b9gSay({tangle:() => mgSay('Tangle', W ? '"Thirds," Tangle says. "Split it in three, every time. Same as counting a satchel."' : '"Thirds," Tangle says, after. "You split it in halves. You never split anything in halves."'), haddat:() => mgSay('Haddat', '"My mother would have known by the smell," Haddat says. "The short sack is the one the clerk opened."'), _:''}); draw(); };
  mgKeys({w:() => weigh(), n:() => toName(), h:() => heft(), ' ':() => { const b = $('#skDone') || $('#skGo') || $('#skWeigh'); b && !b.disabled && b.click(); }});
  /* the yard by day: the barracks wall, the wagons, the quartermaster's beam scale on its post, the sacks in a row */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H;
    const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#b8a27a'); bg.addColorStop(.45, '#8a7656'); bg.addColorStop(1, '#5a4a36'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#6a5a44'; ctx.fillRect(0, H*.08, W, H*.32); for (let i = 0; i < 8; i++) { ctx.fillStyle = '#3a3024'; ctx.fillRect(W*(.05 + i*.12), H*.16, W*.05, H*.08); } // the barracks wall, its windows
    for (let i = 0; i < 2; i++) { const x = W*(.04 + i*.62); ctx.fillStyle = '#4a3624'; ctx.fillRect(x, H*.36, W*.3, H*.1); ell(ctx, x + W*.05, H*.47, H*.03, H*.03, '#2a1e14'); ell(ctx, x + W*.25, H*.47, H*.03, H*.03, '#2a1e14'); } // the wagons
    ctx.fillStyle = '#7a6448'; ctx.fillRect(0, H*.5, W, H*.5);
    const cx = W*.5, py = H*.36, bw = Math.min(W*.3, 130), a = (g.tilt || 0) * .14; ctx.fillStyle = '#3a2a1a'; ctx.fillRect(cx - 3, py, 6, H*.24); // the post
    ctx.save(); ctx.translate(cx, py); ctx.rotate(-a); ctx.fillStyle = '#5a4026'; ctx.fillRect(-bw/2, -3, bw, 6); ctx.restore();
    [-1, 1].forEach(s => { const x = cx + s*bw/2*Math.cos(a), y = py + s*bw/2*Math.sin(-a); // the beam turned by -a: the light pan up ctx.strokeStyle = '#c8b088'; ctx.beginPath(); ctx.moveTo(x - bw*.12, y + H*.08); ctx.lineTo(x, y); ctx.lineTo(x + bw*.12, y + H*.08); ctx.stroke(); ell(ctx, x, y + H*.08, bw*.18, 5, '#a07a4a');
      const on = g.pans.filter(p => p === (s < 0 ? 1 : 2)).length; for (let k = 0; k < Math.min(on, 4); k++) ell(ctx, x - 8 + k*5, y + H*.08 - 5 - (k % 2)*3, 5, 4, '#c8b088'); });
    for (let i = 0; i < g.n; i++) { const x = W*.1 + (W*.8)*(i + .5)/Math.max(1, g.n), y = H*.72, sh = (g.phase === 'between' || g.phase === 'over') && i === g.short;
      ell(ctx, x, y, Math.min(9, W/(g.n*3)), 7, sh ? '#a08a60' : '#d0b88a'); ctx.fillStyle = '#5a4026'; ctx.fillRect(x - 1, y - 9, 2, 3); }
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b2soldier', W*.86, H*.92, fs, t, {still:true, dir:-1}); drawFigure(ctx, 'sgt', W*.12, H*.92, fs, t, {still:true, dir:1});
    const mate = ['brask', 'tangle', 'haddat'].find(k => b9In(k)); if (mate) drawFigure(ctx, mate, W*.26, H*.9, fs*.92, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', 'By the quartermaster\'s wagon, in the middle of the muster, there is a beam scale on a post and a row of biscuit sacks off a Letherii wagon. The quartermaster has his slate under his arm and the look of somebody robbed politely all morning.') +
    mgSay('The quartermaster', '"One of these is short. The Letherii clerks skim a sack in every wagon and sew it up again, neat as a wound. Find it on the scale and I\'ll stand you a sack. Two weighings. I haven\'t got all day, and neither has the army."') +
    b9gSay({brask:() => mgSay('', 'Brask stands at the wagon\'s end with his arms folded, looking at the sacks as if one of them owes him.'), tangle:() => mgSay('', 'Tangle has already started counting the sacks, and then counting them again.'), _:''});
  draw();
}
function b9SackPay(r){ if (!r) return; S.f.b9_sack = {mine:r.mine, lost:r.lost, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b9_sackPaid) { S.f.b9_sackPaid = 1; b9Ration(1, 'the quartermaster\'s sack of biscuit'); }
  save(); }

/* ============ 2. The Canal Locks, on the muster ground ============
   Saffa, the field cook, has the Letheras canal scratched on a bread-board: twelve locks between the quay and the far basin, and two
   boats each (a dock and a button). Throw one die and move one boat. Land on the other side's boat and it goes in the canal, back to the
   quay; the fourth and the eighth locks are lock-houses, where nobody goes in. Both boats into the basin wins. Once a game, when one of
   yours goes in, you may say it was still in the lock (Guile; Brennet, who has argued right of way with every carter on the Gate road,
   with an edge): made, it stays; "yes, but", it goes back to the last lock-house instead; failed, in it goes. Won: the bottom of the
   pot, Rations +1, once. */
const B9G_LOCKN = 12, B9G_LOCKHOME = 13, B9G_LOCKSAFE = [4, 8];
function playB9Locks(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b9gSp());
  const g = MG.state = {me:[0, 0], opp:[0, 0], die:0, phase:'intro', talk:'', check:null, argued:false, roll:0, pend:null, won:null, over:false, forceDie:0};
  const result = () => ({won:g.over && !!g.won, me:g.me.slice(), opp:g.opp.slice(), done:g.over});
  mgOpen({kick:'The muster ground · Saffa\'s bread-board', title:'The Canal Locks', leaveText:'Leave the board', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b9gOn();
  const dieOf = () => { if (g.forceDie) { const d = g.forceDie; g.forceDie = 0; return d; } return 1 + R(6); };
  const home = a => a.every(p => p >= B9G_LOCKHOME);
  const where = p => p <= 0 ? 'the quay' : p >= B9G_LOCKHOME ? 'the basin' : `lock ${p}${B9G_LOCKSAFE.includes(p) ? ' (a lock-house)' : ''}`;
  const draw = () => { mgPanel(`<div class="cpbar"><span>Your boats: <b>${g.me.map(p => p >= B9G_LOCKHOME ? '⌂' : p).join(' · ')}</b></span><span>Saffa: <b>${g.opp.map(p => p >= B9G_LOCKHOME ? '⌂' : p).join(' · ')}</b></span><span>${g.die ? `Thrown <b>${g.die}</b>` : 'Twelve locks'}</span></div>
      ${g.talk}${b9gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="lkDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' ? `<button class="btn primary" id="lkGo" data-bot="1">Boats on the quay</button>`
        : g.phase === 'roll' ? `<button class="btn primary" id="lkThrow" data-bot="1" ${g.roll ? 'disabled' : ''}>Throw</button>`
        : g.phase === 'move' ? g.me.map((p, i) => p < B9G_LOCKHOME ? `<button class="btn ${i ? '' : 'primary'}" data-bt="${i}" data-bot="1">${i ? 'The button' : 'The dock'}: ${where(p)} to ${where(Math.min(B9G_LOCKHOME, p + g.die))}</button>` : '').join('')
        : g.phase === 'call' ? `<button class="btn on" id="lkCall" data-bot="1">It was still in the lock</button><button class="btn" id="lkLet" data-bot="1">Let it go in</button>`
        : `<button class="btn" disabled data-bot="1">Saffa throws</button>`}</div>
      <p class="fine">Throw, then move one boat that many locks. Land on Saffa's boat and it goes in the canal, back to the quay; she does the same to yours. Lock-houses (4 and 8) are safe. Both boats into the basin wins.</p>
      <p class="hint keys"><kbd>Space</kbd> throw · <kbd>1</kbd> <kbd>2</kbd> move a boat · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-bt]').forEach(b => b.onclick = () => move(+b.dataset.bt));
    if ($('#lkGo')) $('#lkGo').onclick = () => { AUDIO.play('click'); g.phase = 'roll'; g.talk = mgSay('Saffa', '"Guest first. My mother\'s rule. She drowned every guest she ever had, on this board."'); draw(); };
    if ($('#lkThrow')) $('#lkThrow').onclick = () => throwMe(); if ($('#lkCall')) $('#lkCall').onclick = () => call(); if ($('#lkLet')) $('#lkLet').onclick = () => { if (g.phase !== 'call') return; AUDIO.play('click'); sink(); };
    if ($('#lkDone')) $('#lkDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const tumble = cb => { g.roll = performance.now(); AUDIO.play('shuffle'); draw(); T(() => { g.roll = 0; g.die = dieOf(); AUDIO.play('dice', true); cb(); }, REDUCE() ? 120 : 420); };
  const throwMe = () => { if (g.phase !== 'roll' || g.roll) return; tumble(() => { g.phase = 'move'; g.talk = mgSay('', `A ${numw(g.die)}. Which boat?`); draw(); }); };
  /* land on the other side: boats there go in the canal, unless the lock is a lock-house */
  const hits = (to, other) => to > 0 && to < B9G_LOCKHOME && !B9G_LOCKSAFE.includes(to) ? other.map((p, i) => p === to ? i : -1).filter(i => i >= 0) : [];
  const move = i => { if (g.phase !== 'move' || g.me[i] >= B9G_LOCKHOME) return; const to = Math.min(B9G_LOCKHOME, g.me[i] + g.die); g.me[i] = to; AUDIO.play('click');
    const h = hits(to, g.opp); h.forEach(k => { g.opp[k] = 0; });
    g.talk = mgSay('', to >= B9G_LOCKHOME ? `${i ? 'The button' : 'The dock'} goes through the last lock into the basin.` : h.length ? `${i ? 'The button' : 'The dock'} comes down on lock ${to}, and Saffa's boat there goes in the canal. ${b9gPick(['"Drowned," she says. "Fair."', 'She fishes it out and puts it back on the quay without a word.'])}` : `${i ? 'The button' : 'The dock'} to ${where(to)}.`);
    if (home(g.me)) return end(true); g.phase = 'opp'; draw(); T(oppTurn, 700); };
  /* Saffa: drown a boat if she can, else into the basin, else onto a lock-house, else the boat behind */
  const oppTurn = () => { if (g.phase !== 'opp') return; tumble(() => { const d = g.die, opts = g.opp.map((p, i) => ({i, p, to:Math.min(B9G_LOCKHOME, p + d)})).filter(o => o.p < B9G_LOCKHOME);
      opts.forEach(o => { o.s = (hits(o.to, g.me).length ? 40 : 0) + (o.to >= B9G_LOCKHOME ? 30 : 0) + (B9G_LOCKSAFE.includes(o.to) ? 10 : 0) - o.p + Math.random()*6; });
      const o = opts.sort((a, b) => b.s - a.s)[0]; g.opp[o.i] = o.to; const h = hits(o.to, g.me);
      if (home(g.opp)) return end(false);
      if (h.length) { g.pend = {idx:h, at:o.to}; if (!g.argued) { g.phase = 'call'; g.talk = mgSay('Saffa', `A ${numw(d)}. Her boat comes down on lock ${o.to}, on top of yours. "In the canal," she says, and reaches for it.`); return draw(); } return sink(); }
      g.phase = 'roll'; g.talk = mgSay('Saffa', `A ${numw(d)}. ${o.to >= B9G_LOCKHOME ? 'One of hers into the basin. "There."' : `Her boat to ${where(o.to)}.`} ${b9gPick(['"Yours."', 'She pushes the die across.', '"Throw, Sergeant."'])}`); draw(); }); };
  const sink = () => { const p = g.pend; if (!p) return; g.pend = null; p.idx.forEach(k => { g.me[k] = 0; }); AUDIO.play('miss'); g.phase = 'roll';
    g.talk = mgSay('Saffa', `Your boat goes in at lock ${p.at}, back to the quay. ${b9gPick(['"Swim," she says.', '"My mother would have laughed."', 'She looks pleased with herself, and then with the board.'])}`); draw(); };
  /* the check: it was still in the lock (Guile). Made: it stays. Yes, but: back to the last lock-house. Failed: in it goes. */
  const call = () => { if (g.phase !== 'call' || !g.pend) return; g.argued = true; AUDIO.play('click');
    const r = g.check = b9gRoll('guile', B9G_DCL, null, [['he has argued right of way with every carter on the Gate road', 2, 'brennet'], ['an Indebted child learns to argue a number down', 1, 'tobet'], ['she knows how the board was cut', 1, 'perrit'], ['you have argued with cooks before, and eaten after', 1, 'sgt']]);
    const p = g.pend;
    if (r.ok) { g.pend = null; g.phase = 'roll'; g.talk = mgSay('Saffa', `${b9gWho(r)} ${b9gV(r, 'point', 'points')} out that the gate of lock ${p.at} was still shut, which on this board is a scratch, and that a boat behind a shut gate cannot be drowned. Saffa looks at the scratch a long time. "Stays," she says. "This once."`); draw(); }
    else if (r.tier === 'near') { const back = B9G_LOCKSAFE.filter(s => s < p.at).pop() || 0; g.pend = null; p.idx.forEach(k => { g.me[k] = back; }); g.phase = 'roll';
      g.talk = mgSay('Saffa', `"Half in the lock, half out," she says, and moves it back to ${where(back)}. "That's where half-in boats go." <span class="dim">(back to the last lock-house)</span>`); draw(); }
    else { g.talk = mgSay('Saffa', '"In the canal is in the canal," Saffa says. "Ask anybody who was ever in one."'); draw(); T(sink, 600); } };
  const end = mine => { g.over = true; g.phase = 'over'; g.won = mine; mgDeed(mine ? 'b9LocksWon' : 'b9LocksLost'); AUDIO.play(mine ? 'win' : 'lose');
    g.talk = mgSay('Saffa', mine ? '"Both in the basin." She sweeps the boats off the board. "Fine. Come by the pot at the end of the line tomorrow. There\'s always something at the bottom of it the officers don\'t get."' : '"Both mine in." She sweeps the boats off the board. "My mother never lost on this board either. She never once got out of Letheras, mind." She looks east. "I have, now. I think."') +
      b9gSay({brennet:() => mgSay('Brennet', mine ? '"Right of way," Brennet says, as though he had won it himself. "Always ask for it. Sometimes they give it."' : '"She plays it like a carter," Brennet says. "She takes the lock, and makes you go round."'), tobet:() => mgSay('Tobet', '"We played it with stones in the Indebted quarter," Tobet says. "The canal was real. No one went in on purpose."'), _:''}); draw(); };
  mgKeys({'1':() => move(0), '2':() => move(1), ' ':() => { if (g.phase === 'roll') return throwMe(); const b = $('#lkDone') || $('#lkGo'); b && !b.disabled && b.click(); }});
  /* the muster ground at evening: tents, the train's lamps at the tailboards, a bread-board with the canal scratched on it */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H;
    b6gNight(ctx, W, H, t, {top:'#0c0e18', mid:'#3a2e3a', cut:.4, low:'#1a1612', seed:9901});
    for (let i = 0; i < 6; i++) { const x = W*(.02 + i*.17); poly(ctx, [[x, H*.42], [x + W*.07, H*.3], [x + W*.14, H*.42]], '#2a2420'); glow(ctx, x + W*.14, H*.36, H*.04, '#e8c070', .45); } // the tents, the lamps at the tailboards
    b7gFire(ctx, W*.12, H*.5, t, H);
    const bx = W*.08, bw = W*.84, by = H*.56, bh = H*.24; ctx.fillStyle = '#8a6a44'; ctx.fillRect(bx, by, bw, bh); ctx.fillStyle = '#6a5034'; ctx.fillRect(bx, by + bh, bw, 4); // the bread-board
    const lx = i => bx + bw*(i + .5)/(B9G_LOCKN + 2), cy = by + bh*.5;
    ctx.strokeStyle = 'rgba(40,60,90,.8)'; ctx.lineWidth = Math.max(6, bh*.22); ctx.beginPath(); ctx.moveTo(lx(0), cy); ctx.lineTo(lx(B9G_LOCKN + 1), cy); ctx.stroke(); ctx.lineWidth = 1; // the canal
    for (let i = 1; i <= B9G_LOCKN; i++) { ctx.fillStyle = B9G_LOCKSAFE.includes(i) ? '#3a2a1a' : '#5a4228'; ctx.fillRect(lx(i) - 1.5, cy - bh*.2, 3, bh*.4); if (B9G_LOCKSAFE.includes(i)) ctx.fillRect(lx(i) - 6, cy - bh*.32, 12, 5); }
    b9gText(ctx, 'quay', lx(0), by + bh - 4, Math.min(11, W*.026), 'rgba(40,24,12,.9)'); b9gText(ctx, 'basin', lx(B9G_LOCKN + 1), by + bh - 4, Math.min(11, W*.026), 'rgba(40,24,12,.9)');
    const boat = (p, k, col) => { const x = lx(Math.min(p, B9G_LOCKN + 1)) + (k ? 5 : -5), y = cy + (col === 'me' ? -bh*.12 : bh*.12); ell(ctx, x, y, 6, 4, col === 'me' ? (k ? '#9fd0e8' : '#c8a868') : (k ? '#e8a070' : '#8a7a6a')); };
    g.me.forEach((p, k) => boat(p, k, 'me')); g.opp.forEach((p, k) => boat(p, k, 'opp'));
    if (g.die || g.roll) b7gDie(ctx, W*.5, H*.9, Math.min(26, W*.06), g.roll ? 1 + (Math.floor(performance.now()/70) % 6) : g.die, 0, 0);
    const fs = clamp(H/100, 1.3, 2.6); drawFigure(ctx, 'b9_c2_saffa', W*.9, H*.5, fs, t, {still:g.phase !== 'opp', dir:-1}); drawFigure(ctx, 'sgt', W*.28, H*.5, fs, t, {still:true, dir:1});
    const mate = ['brennet', 'tobet', 'perrit'].find(k => b9In(k)); if (mate) drawFigure(ctx, mate, W*.4, H*.5, fs*.92, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', 'Saffa has finished at the pot and come over to the squad\'s fire with a bread-board under her arm. Scratched into it with a knife-point is a canal, twelve locks long, and in her fist are two docks and two horn buttons.') +
    mgSay('Saffa', '"The Canal Locks. Every kitchen in Letheras plays it, between the bread and the soup. Throw, move a boat. Land on mine and mine goes in the canal." She sets the board on her knees. "Beat me, and there\'s the bottom of the pot for you tomorrow. That\'s the best of it."') +
    b9gSay({brennet:() => mgSay('', 'Brennet drags his wagon-tongue a little nearer, to watch.'), perrit:() => mgSay('', 'Perrit looks at the scratched board and smiles, which she does not do often.'), _:''});
  draw();
}
function b9LocksPay(r){ if (!r) return; S.f.b9_locks = {won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b9_locksPaid) { S.f.b9_locksPaid = 1; b9Ration(1, 'the bottom of Saffa\'s pot'); }
  save(); }

/* ============ 3. Yelt's Tally, at the train's fire ============
   Yelt calls a wagon off the book: what it held, then sacks off for the cooks and sacks on from the spare, one call at a time, each gone
   when the next comes. Keep the count in your head and give him the total. Three wagons, of five, seven and nine calls; two right take it.
   Once a game, before a wagon, notch it on a stick (Wits; Tobet, who has kept a tally-stick since he was Indebted, with an edge): made,
   Yelt calls twice as slow; "yes, but", twice as slow, and he adds two more calls. Won: a sack the count found, written in honest,
   Rations +1, once. */
const B9G_TALLYN = [5, 7, 9], B9G_TALLYWIN = 2, B9G_TALLYMS = 1300;
const B9G_ON = ['from the spare wagon', 'found under the tarp', 'off the next wagon, owed', 'counted twice, and it was there'], B9G_OFF = ['for the cooks', 'for the outriders', 'split, and thrown out', 'to the Bluerose lines', 'for the sick'];
function playB9Tally(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b9gSp());
  const g = MG.state = {round:0, base:0, calls:[], i:-1, answer:0, opts:[], phase:'intro', talk:'', check:null, used:false, slow:false, extra:0, mine:0, lost:0, over:false, picked:null};
  const result = () => ({mine:g.mine, lost:g.lost, won:g.over && g.mine >= B9G_TALLYWIN, done:g.over});
  mgOpen({kick:'The train\'s fire · Yelt\'s book', title:'Yelt\'s Tally', leaveText:'Leave the book', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b9gOn();
  const callText = c => `${numw(Math.abs(c.n), true)} ${c.n > 0 ? 'on' : 'off'}, ${c.why}.`;
  const draw = () => { const showing = g.phase === 'calling';
    mgPanel(`<div class="cpbar"><span>${g.over ? 'The book is shut' : `Wagon ${g.round + 1} of 3`}</span><span>Right <b>${g.mine}</b> · wrong <b>${g.lost}</b></span><span>${showing ? `Call ${g.i + 1} of ${g.calls.length}` : g.slow ? 'Slow' : ''}</span></div>
      ${g.talk}${b9gRollHTML(g.check)}
      ${showing ? `<p class="mgsay" style="font-size:1.25em;text-align:center"><b>${g.i < 0 ? `${g.base} sacks in the book.` : esc(callText(g.calls[g.i]))}</b></p>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="tlDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' || g.phase === 'ready' ? `<button class="btn primary" id="tlGo" data-bot="1">Call the wagon</button>${!g.used ? `<button class="btn" id="tlStick" data-bot="1">Notch it on a stick (once)</button>` : ''}`
        : g.phase === 'answer' ? g.opts.map((n, k) => `<button class="btn" data-tl="${n}" data-bot="1">${n} sacks</button>`).join('')
        : `<button class="btn" disabled data-bot="1">${showing ? 'Yelt is calling' : 'Yelt checks the book'}</button>`}</div>
      <p class="fine">Yelt says what the wagon held, then calls sacks on and sacks off, one at a time. Keep the count. Give him the total when he stops. Two wagons right of three take it.</p>
      <p class="hint keys"><kbd>Space</kbd> call the wagon · <kbd>S</kbd> the stick · <kbd>1</kbd>–<kbd>4</kbd> a total · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-tl]').forEach(b => b.onclick = () => answer(+b.dataset.tl));
    if ($('#tlGo')) $('#tlGo').onclick = () => start(); if ($('#tlStick')) $('#tlStick').onclick = () => stick();
    if ($('#tlDone')) $('#tlDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const start = () => { if (g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; const n = B9G_TALLYN[g.round] + g.extra; g.extra = 0;
    g.base = 14 + R(18); let tot = g.base; g.calls = [];
    for (let k = 0; k < n; k++) { let d = 1 + R(4); if (Math.random() < .55 && tot - d >= 3) d = -d; tot += d; g.calls.push({n:d, why:b9gPick(d > 0 ? B9G_ON : B9G_OFF)}); }
    g.answer = tot; const o = new Set([tot]); while (o.size < 4) { const k = tot + b9gPick([-3, -2, -1, 1, 2, 3]); if (k > 0) o.add(k); } g.opts = [...o].sort((a, b) => a - b);
    g.i = -1; g.phase = 'calling'; g.check = null; g.talk = mgSay('Yelt', b9gPick([`"Wagon ${numw(g.round + 3)}. Ready?"`, '"Next one. Keep up."', '"This one\'s been opened. Listen."'])); AUDIO.play('shuffle'); draw(); T(next, B9G_TALLYMS * (g.slow ? 2 : 1)); };
  const next = () => { if (g.phase !== 'calling') return; g.i++; if (g.i >= g.calls.length) { g.phase = 'answer'; g.slow = false; g.talk = mgSay('Yelt', '"That\'s the wagon. How many?"'); return draw(); }
    AUDIO.play('click'); draw(); T(next, B9G_TALLYMS * (g.slow ? 2 : 1)); };
  const answer = n => { if (g.phase !== 'answer') return; g.picked = n; const ok = n === g.answer; if (ok) g.mine++; else g.lost++; g.round++; g.phase = 'between'; AUDIO.play(ok ? 'coin' : 'miss');
    g.talk = mgSay('Yelt', ok ? b9gPick([`"${n}." He runs his finger down the page. "${n}. Good."`, `"${n}," he says, and writes it, and goes on writing, which from Yelt is praise.`]) : `"${n}?" He turns the book round so you can see it. "${g.answer}. You lost ${Math.abs(g.answer - n) === 1 ? 'one' : 'some'} somewhere. So did the last clerk."`);
    draw(); if (g.mine >= B9G_TALLYWIN || g.lost > B9G_TALLYN.length - B9G_TALLYWIN) return T(end, 900); T(() => { g.phase = 'ready'; draw(); }, 900); };
  /* the check: notch it on a stick (Wits). Made: twice as slow. Yes, but: twice as slow, and two more calls. */
  const stick = () => { if (g.used || g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; g.used = true; AUDIO.play('click');
    const r = g.check = b9gRoll('wits', B9G_DCL, null, [['he has kept a tally-stick since he was Indebted', 2, 'tobet'], ['she does sums in the dust for pleasure', 1, 'perrit'], ['he loads by count, not by eye', 1, 'brennet'], ['you have counted a company\'s kit more times than you have slept', 1, 'sgt']]);
    if (r.ok) { g.slow = true; g.talk = mgSay(r.who === 'tobet' ? 'Tobet' : '', r.who === 'tobet' ? 'Tobet takes out his tally-stick and a knife and turns the stick to a smooth side. "Notch for on, scratch for off," he says. "You don\'t remember. The stick does." Yelt, watching, slows down to let him. <span class="dim">(twice as slow, next wagon)</span>' : `${b9gWho(r)} ${b9gV(r, 'take', 'takes')} a stick out of the fire-wood and a knife to it. Yelt sees, and slows his calls to the knife. <span class="dim">(twice as slow, next wagon)</span>`); }
    else if (r.tier === 'near') { g.slow = true; g.extra = 2; g.talk = mgSay('Yelt', '"A stick." He watches the knife. "I\'ll call slow, then, for the stick. And the wagon behind it while I\'m at it." <span class="dim">(twice as slow; two more calls)</span>'); }
    else g.talk = mgSay('', `${b9gWho(r)} ${b9gV(r, 'notch', 'notches')} the stick for a while, and then ${b9gV(r, 'are', 'is')} not sure which notches were on and which were off, and that is the train's book in a sentence.`);
    draw(); };
  const end = () => { g.over = true; g.phase = 'over'; const W = g.mine >= B9G_TALLYWIN; mgDeed(W ? 'b9TallyWon' : 'b9TallyLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk = mgSay('Yelt', W ? `"${g.mine} of three." He shuts the book on his finger. "There's a sack on the last wagon that isn't in anybody's count. It is now. Against the Sixth's name, honest." He writes it, and shows you.` : `"${g.mine} of three." He shuts the book. "Most of my clerks get one. The runner got none, and he was stealing." He almost smiles. "You weren't. That's something."`) +
      b9gSay({tobet:() => mgSay('Tobet', W ? '"A count kept honest," Tobet says, "is the only thing in Lether nobody owes on."' : '"The stick remembers," Tobet says. "Next time, a stick."'), perrit:() => mgSay('Perrit', '"His book adds up," Perrit says, after. "I checked. Not one of the others ever has."'), _:''}); draw(); };
  mgKeys({s:() => stick(), '1':() => answer(g.opts[0]), '2':() => answer(g.opts[1]), '3':() => answer(g.opts[2]), '4':() => answer(g.opts[3]), ' ':() => { const b = $('#tlDone') || $('#tlGo'); b && b.click(); }});
  /* the wagon ring at dusk: the plain going red, the wagons drawn in, the fire, Yelt with his book on his knee by a lamp */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H;
    const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#2a2030'); bg.addColorStop(.35, '#8a4a30'); bg.addColorStop(.46, '#3a2a20'); bg.addColorStop(1, '#1a1410'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 5; i++) { const x = W*(.02 + i*.2); ctx.fillStyle = '#1e1812'; ctx.fillRect(x, H*.34, W*.16, H*.1); ctx.fillStyle = '#2a221a'; ctx.beginPath(); ctx.ellipse(x + W*.08, H*.34, W*.08, H*.05, 0, Math.PI, 0); ctx.fill(); } // the wagon ring
    b7gFire(ctx, W*.5, H*.6, t, H);
    const lx = W*.78, ly = H*.66; glow(ctx, lx, ly - 10, H*.12, '#ffd890', .3); ctx.fillStyle = '#ffd890'; ctx.fillRect(lx - 3, ly - 14, 6, 8); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(lx - 22, ly - 2, 18, 12); ctx.fillStyle = '#2a1a10'; ctx.fillRect(lx - 13, ly - 2, 1, 12); // the lamp, the book
    if (g.phase === 'calling') { const s = g.i < 0 ? `${g.base}` : `${g.calls[g.i].n > 0 ? '+' : '−'}${Math.abs(g.calls[g.i].n)}`; b9gText(ctx, s, W*.5, H*.24, Math.min(40, W*.1), g.i < 0 ? 'rgba(232,220,192,.95)' : g.calls[g.i].n > 0 ? 'rgba(159,208,232,.95)' : 'rgba(232,160,112,.95)'); }
    for (let k = 0; k < g.mine; k++) ell(ctx, W*.08 + k*10, H*.96, 3, 3, '#9fd0e8'); for (let k = 0; k < g.lost; k++) ell(ctx, W*.92 - k*10, H*.96, 3, 3, '#e8c073');
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b5_c1_clerk', W*.88, H*.86, fs, t, {still:g.phase !== 'calling', dir:-1}); drawFigure(ctx, 'sgt', W*.14, H*.88, fs, t, {still:true, dir:1});
    const mate = ['tobet', 'perrit', 'brennet'].find(k => b9In(k)); if (mate) drawFigure(ctx, mate, W*.28, H*.88, fs*.92, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', 'Yelt comes over from the water wagons with his book under his arm and a lamp, and sits on the ground by the squad\'s fire with the book open on his knee. He looks, for Yelt, almost cheerful.') +
    mgSay('Yelt', '"I call the wagons off to my clerks at night, to see who\'s awake. What it held, then on and off, as it happened. They keep the count in their heads and give me the end of it." He licks his thumb and turns a page. "Most of them can\'t. Shall we see if a sergeant can?"') +
    b9gSay({tobet:() => mgSay('', 'Tobet has his tally-stick out before Yelt has finished talking.'), kaedra:() => mgSay('', 'Kaedra sits back out of the light, listening, and moves her lips with the numbers.'), _:''});
  draw();
}
function b9TallyPay(r){ if (!r) return; S.f.b9_tally = {mine:r.mine, lost:r.lost, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b9_tallyPaid) { S.f.b9_tallyPaid = 1; b9Ration(1, 'a sack Yelt\'s count found, written in honest'); }
  save(); }

/* ============ 4. Under the Helmet, at the dung-fire ============
   The heavies at the next fire play for the pot's scrapings: four dice each, thrown under a helmet and looked at under the rim. Bid what
   is under both helmets ("three fours"): the next bid must be more dice, or the same number of a higher face. Or call the last bid a
   lie: the helmets come up, and if there are that many, the bidder takes the hand; if not, the caller does. Best of three hands. Once a
   game, when the heavy has bid, read his face (Wits; Sathi, who watches faces the way she watches the dark, with an edge): made, you know
   whether his bid stands; "yes, but", you know, and he saw you looking: this time you must bid. Won: the pot's scrapings and a spare
   biscuit, Rations +1, once. */
const B9G_HELMD = 4, B9G_HELMWIN = 2;
function playB9Helm(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b9gSp());
  const g = MG.state = {hand:0, my:[], his:[], bid:null, phase:'intro', talk:'', check:null, used:false, told:null, mustBid:false, mine:0, lost:0, over:false, shown:false};
  const result = () => ({mine:g.mine, lost:g.lost, won:g.over && g.mine >= B9G_HELMWIN, done:g.over});
  mgOpen({kick:'The heavies\' dung-fire · a helmet on the ground', title:'Under the Helmet', leaveText:'Leave the helmet', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b9gOn();
  const FACE = ['', 'one', 'two', 'three', 'four', 'five', 'six'], FACES = ['', 'ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
  const bidW = b => `${numw(b.c)} ${b.c === 1 ? FACE[b.f] : FACES[b.f]}`;
  const cnt = (a, f) => a.filter(d => d === f).length;
  const minFor = f => !g.bid ? 1 : f > g.bid.f ? g.bid.c : g.bid.c + 1;
  const canBid = () => [2, 3, 4, 5, 6].some(f => minFor(f) <= B9G_HELMD*2);
  const draw = () => { const my = g.phase === 'mine';
    mgPanel(`<div class="cpbar"><span>${g.over ? 'The helmet is back on a head' : `Hand ${g.hand + 1} of 3`}</span><span>You <b>${g.mine}</b> · the heavy <b>${g.lost}</b></span><span>${g.bid ? `Bid: <b>${bidW(g.bid)}</b>` : 'No bid'}</span></div>
      ${g.talk}${b9gRollHTML(g.check)}
      ${g.my.length ? `<p class="fine">Under your helmet: <b>${g.my.join(' · ')}</b>${g.shown ? ` · under his: <b>${g.his.join(' · ')}</b>` : ''}</p>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="hmDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' || g.phase === 'ready' ? `<button class="btn primary" id="hmGo" data-bot="1">Dice under the helmets</button>`
        : my ? `${[2, 3, 4, 5, 6].map(f => { const c = minFor(f); return `<button class="btn" data-hf="${f}" data-bot="1" ${c > B9G_HELMD*2 ? 'disabled' : ''}>${bidW({c, f})}</button>`; }).join('')}${g.bid && (!g.mustBid || !canBid()) ? `<button class="btn primary" id="hmLiar" data-bot="1">A lie. Lift the helmets</button>` : ''}${g.bid && !g.used ? `<button class="btn" id="hmRead" data-bot="1">Read his face (once)</button>` : ''}`
        : `<button class="btn" disabled data-bot="1">${g.phase === 'his' ? 'The heavy thinks about it' : 'The helmets come up'}</button>`}</div>
      <p class="fine">Four dice each, under helmets. Bid what is under both: more dice, or the same number of a higher face. Or call the last bid a lie: if there are that many, the bidder takes the hand. Ones count as nothing. Two hands of three take it.</p>
      <p class="hint keys"><kbd>2</kbd>–<kbd>6</kbd> bid a face · <kbd>L</kbd> a lie · <kbd>R</kbd> read his face · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-hf]').forEach(b => b.onclick = () => bid(+b.dataset.hf));
    if ($('#hmGo')) $('#hmGo').onclick = () => deal(); if ($('#hmLiar')) $('#hmLiar').onclick = () => liar('me'); if ($('#hmRead')) $('#hmRead').onclick = () => read();
    if ($('#hmDone')) $('#hmDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const deal = () => { if (g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; const d = () => Array.from({length:B9G_HELMD}, () => 1 + R(6)).sort((a, b) => a - b);
    g.my = d(); g.his = d(); g.bid = null; g.told = null; g.mustBid = false; g.shown = false; g.check = null; AUDIO.play('dice', true);
    if (g.hand % 2 === 0) { g.phase = 'his'; g.talk = mgSay('The heavy', b9gPick(['"I\'ll open. I always open. It\'s a character flaw."', '"Mine first."'])); draw(); T(heavy, 800); }
    else { g.phase = 'mine'; g.talk = mgSay('The heavy', '"Your bid, Sergeant."'); draw(); } };
  const bid = f => { if (g.phase !== 'mine' || f < 2 || f > 6) return; const c = minFor(f); if (c > B9G_HELMD*2) return; g.bid = {c, f, by:'me'}; g.mustBid = false; g.told = null; AUDIO.play('click');
    g.phase = 'his'; g.talk = mgSay('', `"${bidW(g.bid)}," you say.`); draw(); T(heavy, 800); };
  /* the heavy: knows his own helmet, guesses yours (two-thirds of a die each face); calls a lie when the bid outruns that, else raises his best face */
  const heavy = () => { if (g.phase !== 'his') return;
    if (g.bid) { const exp = cnt(g.his, g.bid.f) + B9G_HELMD/6; if (g.bid.c > exp + .9 + (Math.random() - .5)*.6) return liar('him'); }
    const best = [2, 3, 4, 5, 6].map(f => ({f, n:cnt(g.his, f) + Math.random()*.4})).sort((a, b) => b.n - a.n);
    let pick = null; for (const o of best) { const c = minFor(o.f); if (c <= cnt(g.his, o.f) + 1.6 && c <= B9G_HELMD*2) { pick = {c, f:o.f}; break; } }
    if (!pick) { if (g.bid) return liar('him'); pick = {c:1, f:best[0].f}; }
    g.bid = {c:g.bid ? pick.c : Math.max(1, cnt(g.his, pick.f)), f:pick.f, by:'him'}; g.phase = 'mine'; AUDIO.play('click');
    g.talk = mgSay('The heavy', `"${bidW(g.bid)}." ${b9gPick(['He looks at you over the helmet.', 'He taps the helmet once.', 'He scratches his jaw.'])}`); draw(); };
  const liar = who => { if (!g.bid || (who === 'me' && (g.phase !== 'mine' || (g.mustBid && canBid())))) return; const n = cnt(g.my, g.bid.f) + cnt(g.his, g.bid.f), stands = n >= g.bid.c;
    const winner = stands ? g.bid.by : who === 'me' ? 'me' : 'him'; if (winner === 'me') g.mine++; else g.lost++; g.shown = true; g.phase = 'show'; AUDIO.play(winner === 'me' ? 'coin' : 'miss');
    g.talk = mgSay(who === 'me' ? '' : 'The heavy', `${who === 'me' ? '"A lie," you say.' : '"A lie," the heavy says.'} The helmets come up. ${numw(n, true)} ${n === 1 ? FACE[g.bid.f] : FACES[g.bid.f]} under both. ${stands ? 'The bid stands.' : 'The bid was a lie.'} ${winner === 'me' ? 'The hand is yours.' : 'The hand is his.'}`);
    g.hand++; draw(); if (g.mine >= B9G_HELMWIN || g.lost >= B9G_HELMWIN) return T(end, 1000); T(() => { g.phase = 'ready'; draw(); }, 1100); };
  /* the check: read his face (Wits). Made: you know whether his bid stands. Yes, but: you know, and you must bid. */
  const read = () => { if (g.used || g.phase !== 'mine' || !g.bid || g.bid.by !== 'him') return; g.used = true; AUDIO.play('click');
    const r = g.check = b9gRoll('wits', B9G_DCT, null, [['she watches faces at a fire the way she watches the dark', 2, 'sathi'], ['he has sat at heavies\' fires half his life', 1, 'brask'], ['her mother traded with men who lied for a living', 1, 'haddat'], ['you have watched a lot of soldiers lie about a lot of things', 1, 'sgt']]);
    const stands = cnt(g.my, g.bid.f) + cnt(g.his, g.bid.f) >= g.bid.c;
    if (r.ok) { g.told = stands; g.talk = mgSay(r.who === 'sathi' ? 'Sathi' : '', r.who === 'sathi' ? `Sathi leans over to your ear, filed teeth showing. "${stands ? 'He has them. He\'s bored.' : 'He hasn\'t. He\'s scratching.'}" <span class="dim">(his bid ${stands ? 'stands' : 'is a lie'})</span>` : `${b9gWho(r)} ${b9gV(r, 'watch', 'watches')} him while he waits. ${stands ? 'He is easy. He has them.' : 'He scratches his jaw again. He has not.'} <span class="dim">(his bid ${stands ? 'stands' : 'is a lie'})</span>`); }
    else if (r.tier === 'near') { g.told = stands; g.mustBid = true; g.talk = mgSay('The heavy', `${stands ? 'He has them, by his face.' : 'He has not, by his face.'} He sees you looking. "Staring\'s a bid, at this fire," he says. "Bid." <span class="dim">(his bid ${stands ? 'stands' : 'is a lie'}; you must bid this time)</span>`); }
    else g.talk = mgSay('', `${b9gWho(r)} ${b9gV(r, 'watch', 'watches')} his face. It is a heavy\'s face, and it gives back exactly as much as a shield.`);
    draw(); };
  const end = () => { g.over = true; g.phase = 'over'; const W = g.mine >= B9G_HELMWIN; mgDeed(W ? 'b9HelmWon' : 'b9HelmLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk = mgSay('The heavy', W ? `"${g.mine} hands." He tips the pot toward you, and what is at the bottom of it, and adds a biscuit out of his own pack, wrapped in a rag. "Pot\'s yours. The Third eats tonight. Don\'t tell my squad."` : `"${g.lost} hands to me." He scrapes the pot with the side of the biscuit and eats it slowly. "Come back tomorrow. There won\'t be any more in it, but come back."`) +
      b9gSay({sathi:() => mgSay('Sathi', W ? '"He scratches when he lies," Sathi says, delighted. "All heavies do. Weasels do it with the tail."' : '"He scratches when he lies," Sathi says. "I should have said."'), brask:() => mgSay('Brask', '"He opens high," Brask says. "Every time. They all do, at that fire."'), _:''}); draw(); };
  mgKeys({'2':() => bid(2), '3':() => bid(3), '4':() => bid(4), '5':() => bid(5), '6':() => bid(6), l:() => liar('me'), r:() => read(), ' ':() => { const b = $('#hmDone') || $('#hmGo'); b && b.click(); }});
  /* the dung-fire under the stars: the column's other fires going away east, the heavies' fire, two helmets upside down on the ground */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H;
    b6gNight(ctx, W, H, t, {top:'#04060c', mid:'#141822', cut:.46, low:'#0e0c0a', seed:9911});
    for (let i = 0; i < 9; i++) glow(ctx, W*(.05 + i*.11), H*(.45 - i*.004), 4, '#ff9a40', .5); // the column's fires going away east
    b7gFire(ctx, W*.5, H*.62, t, H);
    const helm = (x, up) => { ctx.fillStyle = '#5a5a60'; ctx.beginPath(); ctx.ellipse(x, H*.78, W*.08, H*.05, 0, up ? 0 : Math.PI, up ? Math.PI : 0); ctx.fill(); ctx.fillStyle = '#3a3a40'; ctx.fillRect(x - W*.08, H*.78 - 1, W*.16, 3); };
    const s = Math.min(18, W*.04); helm(W*.3, false); helm(W*.7, false);
    g.my.forEach((d, i) => b7gDie(ctx, W*.3 - s*1.6 + i*s*1.05, H*.88, s, d, 0, 0, g.bid && d === g.bid.f));
    if (g.shown) g.his.forEach((d, i) => b7gDie(ctx, W*.7 - s*1.6 + i*s*1.05, H*.88, s, d, 0, 0, g.bid && d === g.bid.f));
    if (g.bid) b9gText(ctx, `${g.bid.c} × ${g.bid.f}`, W*.5, H*.3, Math.min(28, W*.07), g.bid.by === 'me' ? 'rgba(159,208,232,.9)' : 'rgba(232,192,115,.9)');
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b2soldier', W*.88, H*.72, fs, t, {still:g.phase !== 'his', dir:-1}); drawFigure(ctx, 'sgt', W*.12, H*.72, fs, t, {still:true, dir:1});
    const mate = ['sathi', 'brask', 'haddat', 'tegra'].find(k => b9In(k)); if (mate) drawFigure(ctx, mate, W*.22, H*.7, fs*.92, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', 'At the next fire, a heavy has his helmet off and upside down on the ground, and four dice in it, and a pot by the fire with something stuck to the bottom of it that the whole fire is pretending not to look at.') +
    mgSay('The heavy', '"Under the Helmet, Sergeant. Four dice under yours, four under mine, and we lie about what\'s under both. Take two hands and the pot\'s yours, bottom and all." He knocks the helmet. "And a biscuit out of my pack. I\'ve been saving it. I\'m bored of saving it."') +
    b9gSay({sathi:() => mgSay('', 'Sathi sits down beside you, cross-legged, and looks at the heavy\'s face with great interest.'), tegra:() => mgSay('', 'Tegra watches from her heels, just outside the firelight. Her people have a game like it, she says, with knuckle-bones. They do not eat after.'), _:''});
  draw();
}
function b9HelmPay(r){ if (!r) return; S.f.b9_helm = {mine:r.mine, lost:r.lost, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b9_helmPaid) { S.f.b9_helmPaid = 1; b9Ration(1, 'the bottom of the heavies\' pot, and a biscuit'); }
  save(); }

/* ============ 5. Knife in the Dirt, at the retreat camp ============
   Days after, in the retreat camp, a heavy from the next fire has a knife out and a patch of ground by the fire. Five throws, each
   harder: off the palm, off the back of the hand, off the fist, off the elbow, over the shoulder. The knife turns as it goes; let it go
   as the point comes round to the ground. Stick it and go on; miss and that is your count. Then the heavy throws his. Most stuck wins;
   level is nobody's. Once a game, before a throw, find soft ground (Wits; Tegra, who has read ground across half the plains, with an
   edge): made, the next throw has twice the room; "yes, but", twice the room, and the heavy throws on the same soft patch, so his next
   is sure. Won: the regard of whichever squadmate walking needed the evening most (the lowest regard), else Rations +1, once. */
const B9G_KNIFE = ['off the palm', 'off the back of the hand', 'off the fist', 'off the elbow', 'over the shoulder'], B9G_KNIFEW = [.34, .27, .21, .16, .12], B9G_KNIFEP = [.92, .8, .66, .5, .34];
function playB9Knife(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b9gSp());
  const g = MG.state = {k:0, mine:0, his:0, hk:0, phase:'intro', talk:'', check:null, used:false, wide:false, sure:false, t0:0, a:null, force:null, over:false, last:null};
  const result = () => ({mine:g.mine, his:g.his, won:g.over && g.mine > g.his, tie:g.over && g.mine === g.his, done:g.over});
  mgOpen({kick:'The retreat camp · days after', title:'Knife in the Dirt', leaveText:'Leave the knife', done:r => opt.after && opt.after(r), leave:() => mgClose(g.over ? result() : Object.assign(result(), {left:true, done:false, won:false}))}); on = b9gOn();
  const spin = () => Math.sin((performance.now() - g.t0) / (520 * Math.max(.6, b9gSp()))); // the knife's turn, -1..1 (0 is point down)
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? 'The knife is back in its sheath' : g.phase === 'him' ? `The heavy: ${B9G_KNIFE[Math.min(g.hk, 4)]}` : `Yours: ${B9G_KNIFE[Math.min(g.k, 4)]}`}</span><span>You <b>${g.mine}</b> · the heavy <b>${g.his}</b></span><span>Five throws</span></div>
      ${g.talk}${b9gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="knDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' || g.phase === 'ready' ? `<button class="btn primary" id="knUp" data-bot="1">Take the knife</button>${!g.used ? `<button class="btn" id="knSoft" data-bot="1">Find soft ground first (once)</button>` : ''}`
        : g.phase === 'swing' ? `<button class="btn primary" id="knGo" data-bot="1">Let it go</button>`
        : `<button class="btn" disabled data-bot="1">${g.phase === 'him' ? 'The heavy throws' : 'The knife turns'}</button>`}</div>
      <p class="fine">The knife turns as it goes. Let it go as the point comes round to the ground. Five throws, each harder; stick it and go on, miss and that is your count. Then the heavy throws his. Most stuck wins.</p>
      <p class="hint keys"><kbd>Space</kbd> take / let go · <kbd>G</kbd> soft ground · <kbd>Esc</kbd> leave</p>`),
    bind = () => { if ($('#knUp')) $('#knUp').onclick = () => up(); if ($('#knSoft')) $('#knSoft').onclick = () => soft(); if ($('#knGo')) $('#knGo').onclick = () => go();
      if ($('#knDone')) $('#knDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const up = () => { if (g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; g.phase = 'swing'; g.t0 = performance.now(); AUDIO.play('click');
    g.talk = mgSay('', `The knife ${B9G_KNIFE[g.k]}. It turns, slowly, and then not slowly.`); redraw(); };
  const go = () => { if (g.phase !== 'swing') return; const a = g.force != null ? g.force : spin(); g.force = null; g.a = a; const w = B9G_KNIFEW[g.k] * (g.wide ? 2 : 1), stuck = Math.abs(a) <= w; g.wide = false;
    g.last = {stuck, t:performance.now()}; AUDIO.play(stuck ? 'coin' : 'miss');
    if (stuck) { g.mine++; g.k++; g.talk = mgSay('', b9gPick(['It goes in to the guard and stands.', 'Point down, and in, and it stays.', 'In. The heavy nods.'])); if (g.k >= B9G_KNIFE.length) { g.phase = 'him'; redraw(); return T(heavy, 900); } g.phase = 'ready'; return redraw(); }
    g.talk = mgSay('', `It lands flat, and slides, and lies there. ${g.mine ? `${numw(g.mine, true)} stuck.` : 'None stuck.'} The heavy picks it up.`); g.phase = 'him'; redraw(); T(heavy, 900); };
  /* the heavy: each throw harder; soft ground makes his next one sure */
  const heavy = () => { if (g.over || g.phase !== 'him') return; if (g.hk >= B9G_KNIFE.length) return end();
    const ok = g.sure || Math.random() < B9G_KNIFEP[g.hk]; g.sure = false; g.last = {stuck:ok, t:performance.now(), him:true}; AUDIO.play(ok ? 'coin' : 'miss');
    if (ok) { g.his++; g.hk++; g.talk = mgSay('The heavy', `${B9G_KNIFE[g.hk - 1][0].toUpperCase() + B9G_KNIFE[g.hk - 1].slice(1)}. In. ${b9gPick(['"Hah."', 'He only shrugs.', '"Still got it."'])}`); redraw(); return T(heavy, 800); }
    g.talk = mgSay('The heavy', `${B9G_KNIFE[g.hk][0].toUpperCase() + B9G_KNIFE[g.hk].slice(1)}, and it lands flat. "There," he says. "That's me."`); g.hk = B9G_KNIFE.length; redraw(); T(end, 800); };
  /* the check: soft ground (Wits). Made: twice the room. Yes, but: twice the room, and the heavy's next is sure. */
  const soft = () => { if (g.used || g.over || !(g.phase === 'intro' || g.phase === 'ready')) return; g.used = true; AUDIO.play('click');
    const r = g.check = b9gRoll('wits', B9G_DCT, null, [['she has read ground across half the plains', 2, 'tegra'], ['he has dug a heavy\'s share of latrines', 1, 'brask'], ['she has buried knives in worse dirt than this', 1, 'sathi'], ['you have dug in on a lot of bad ground', 1, 'sgt']]);
    if (r.ok) { g.wide = true; g.talk = mgSay(r.who === 'tegra' ? 'Tegra' : '', r.who === 'tegra' ? 'Tegra presses a palm flat on the ground, then a hand\'s width over, then again. "Here," she says. "Water was here once. It remembers." <span class="dim">(twice the room, next throw)</span>' : `${b9gWho(r)} ${b9gV(r, 'find', 'finds')} a patch by the fire where the ground gives under a thumb. <span class="dim">(twice the room, next throw)</span>`); }
    else if (r.tier === 'near') { g.wide = true; g.sure = true; g.talk = mgSay('The heavy', '"Soft there, is it?" He moves his heel onto the same patch. "Thanks." <span class="dim">(twice the room; his next throw is sure)</span>'); }
    else g.talk = mgSay('', `${b9gWho(r)} ${b9gV(r, 'press', 'presses')} the ground all round the fire. It is the Wastes. It is all the same, and all of it hard.`);
    redraw(); };
  const end = () => { if (g.over) return; g.over = true; g.phase = 'over'; const W = g.mine > g.his, tie = g.mine === g.his; mgDeed(W ? 'b9KnifeWon' : 'b9KnifeLost'); AUDIO.play(W ? 'win' : tie ? 'click' : 'lose');
    g.talk = mgSay('The heavy', W ? `"${g.mine} to my ${g.his}." He pulls the knife out of the dirt and wipes it on his knee. "My brother taught me that one. He was better at it." Where his brother is now, he leaves alone, and so does the Third.` : tie ? `"${g.mine} each." He sheathes the knife. "Nobody's. Suits me. Suits tonight."` : `"${g.his} to your ${g.mine}." He sheathes it. "Good, though. Better than you were, I expect, before." He looks round the camp, at the gaps in it. "Everybody's better than they were. That's the joke."`) +
      b9gSay({tegra:() => mgSay('Tegra', W ? '"The ground took it," Tegra says. "It takes everything out here. It gave that back."' : '"My people throw them at a post," Tegra says. "The post does not mind."'), brask:() => mgSay('Brask', '"The heavies played it on the transports," Brask says. "In the deck. Into the planks. Quartermaster went mad."'), _:() => mgSay('', 'Round the camp the other fires are low, and quiet, and spaced wider than they used to be.')}); redraw(); };
  mgKeys({g:() => soft(), ' ':() => { const b = $('#knDone') || $('#knUp') || $('#knGo'); b && !b.disabled && b.click(); }});
  /* the retreat camp at dusk: tents with gaps, dung-fires spaced wide, the patch of dirt by the fire, the knife turning */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now();
    b6gNight(ctx, W, H, t, {top:'#10101a', mid:'#4a3a3a', cut:.44, low:'#16120e', seed:9921});
    for (let i = 0; i < 7; i++) { if (i === 2 || i === 5) continue; const x = W*(.02 + i*.14); poly(ctx, [[x, H*.46], [x + W*.06, H*.36], [x + W*.12, H*.46]], '#1e1a18'); } // tents, with gaps
    for (let i = 0; i < 4; i++) glow(ctx, W*(.1 + i*.27), H*.47, 5, '#ff9a40', .45);
    b7gFire(ctx, W*.2, H*.62, t, H);
    ell(ctx, W*.55, H*.8, W*.2, H*.06, '#3a2e22'); // the patch of dirt
    for (let i = 0; i < g.mine; i++) { ctx.fillStyle = '#b8b8c0'; ctx.fillRect(W*.45 + i*8, H*.76, 2, 10); }
    for (let i = 0; i < g.his; i++) { ctx.fillStyle = '#c8a070'; ctx.fillRect(W*.62 + i*8, H*.78, 2, 10); }
    if (g.phase === 'swing') { const cx = W*.55, cy = H*.6, Rr = Math.min(W*.12, H*.12), a = spin(), ang = Math.PI/2 + a*Math.PI; // the knife, turning; point down at 0
      const w = B9G_KNIFEW[g.k] * (g.wide ? 2 : 1); ctx.strokeStyle = 'rgba(159,208,232,.35)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, Rr, Math.PI/2 - w*Math.PI, Math.PI/2 + w*Math.PI); ctx.stroke(); ctx.lineWidth = 1;
      ctx.strokeStyle = '#e8e8f0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - Math.cos(ang)*Rr*.4, cy - Math.sin(ang)*Rr*.4); ctx.lineTo(cx + Math.cos(ang)*Rr, cy + Math.sin(ang)*Rr); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = '#5a3a22'; ctx.fillRect(cx - Math.cos(ang)*Rr*.4 - 3, cy - Math.sin(ang)*Rr*.4 - 3, 6, 6); }
    if (g.last && now - g.last.t < 700) { const k = (now - g.last.t) / 700; ctx.strokeStyle = `rgba(${g.last.stuck ? '159,208,232' : '232,160,112'},${(1 - k).toFixed(2)})`; ctx.beginPath(); ctx.ellipse(W*.55, H*.8, 10 + k*30, 3 + k*8, 0, 0, 7); ctx.stroke(); }
    const fs = clamp(H/100, 1.4, 3); drawFigure(ctx, 'b2soldier', W*.86, H*.88, fs, t, {still:g.phase !== 'him', dir:-1}); drawFigure(ctx, 'sgt', W*.3, H*.9, fs, t, {still:g.phase !== 'swing', dir:1});
    const mate = ['tegra', 'brask', 'sathi', 'haddat'].find(k => b9In(k)); if (mate) drawFigure(ctx, mate, W*.12, H*.86, fs*.92, t, {still:true, dir:1, phase:2}); };
  g.talk = mgSay('', 'A heavy from the next fire comes over in the dusk with a knife in his hand, hilt first, and squats by the Third\'s fire. He has not been sleeping either. He smooths a patch of dirt with the flat of his hand.') +
    mgSay('The heavy', '"Knife in the Dirt, Sergeant. Five throws. Palm, back of the hand, fist, elbow, over the shoulder. Stick it, go on. Miss, stop." He turns the knife over. "Something to do with the hands."') +
    b9gSay({tegra:() => mgSay('', 'Tegra watches the patch of dirt, not the knife.'), brask:() => mgSay('', 'Brask nods to the heavy. They know each other from the line, the way the heavies all do now.'), _:''});
  redraw();
}
function b9KnifePay(r){ if (!r) return; S.f.b9_knife = {mine:r.mine, his:r.his, won:!!r.won, tie:!!r.tie, done:!!r.done};
  if (r.won && !S.f.b9_knifePaid) { const low = (S.squad || []).filter(k => k !== 'sgt' && b9In(k) && S.loy && S.loy[k] != null).sort((a, b) => S.loy[a] - S.loy[b])[0];
    if (low) { loy(low, 1); S.f.b9_knifePaid = low; } else { S.f.b9_knifePaid = 'ration'; b9Ration(1, 'a heavy\'s spare biscuit, for the knife'); } }
  save(); }

/* ---- the Deeds page: Book Nine's fires, under Rations ---- */
{ const _de = b9DeedsExtra; b9DeedsExtra = function(mine){ const out = _de(mine), d = k => mine.reduce((a, {s}) => a + (((s.deeds || {})[k]) || 0), 0);
    const rows = [['The Short Sack', d('b9SackWon') ? 'Found it on the scale' : d('b9SackLost') ? 'The clerks were better at it' : 'Not yet'],
      ['The Canal Locks', d('b9LocksWon') ? 'Both boats in the basin' : d('b9LocksLost') ? 'Saffa\'s board' : 'Not yet'],
      ['Yelt\'s Tally', d('b9TallyWon') ? 'Kept the count' : d('b9TallyLost') ? 'Lost one somewhere' : 'Not yet'],
      ['Under the Helmet', d('b9HelmWon') ? 'The pot was the Third\'s' : d('b9HelmLost') ? 'The heavy scraped the pot' : 'Not yet'],
      ['Knife in the Dirt', d('b9KnifeWon') ? 'Most stuck, days after' : d('b9KnifeLost') ? 'The heavy\'s knife' : 'Not yet']];
    return out + `<h4 class="jh">At the fires</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }; }

/* ---- the chapters' fires: the games offered beside the squad's talk, and what they leave behind ---- */
{ const wrap = (CH, id, f) => { const _n = CH.dlg[id]; if (!_n) return; CH.dlg[id] = () => { const n = _n(); return f(n) || n; }; };
  const after = (n, t, ch) => { const i = n.ch.findIndex(c => typeof c.t === 'string' && new RegExp(t).test(c.t)); n.ch = n.ch.slice(); n.ch.splice(i < 0 ? n.ch.length - 1 : i + 1, 0, ...ch); return n; };
  const jn = (CH, fn) => { const j = CH.journal; if (j) CH.journal = () => { const x = j(), l = fn(); if (l) x.unshift(l); return x; }; };
  /* Ch1 (the Third): the Short Sack, in the yard by day (phases 3 and 4), by the quartermaster's wagon */
  if (typeof B9CH1 !== 'undefined') { wrap(B9CH1, 'b9_c1_fire', n => after(n, '^Talk with the squad', [{t:'The quartermaster has nine biscuit sacks off a Letherii wagon, and one of them is short. Find it on his scale.', tag:'The Short Sack', req:()=>(S.f.b9_c1_ph || 1) >= 3 && !(S.f.b9_sack && S.f.b9_sack.done), go:()=>playB9Sack({after:r => { b9SackPay(r); S.f.b9_sackLast = r; talk('b9_c1_sack_after'); }})}]));
    B9CH1.dlg.b9_c1_sack_after = () => { const r = S.f.b9_sackLast || {}; return b9gAfter('The quartermaster\'s wagon', 'b9_barracks', 'b9_c1_fire', !r.done ?
`You leave the quartermaster with his sacks still on the scale. He does not mind. He weighs them himself, two at a time, and finds the short one, and writes the clerk's name on his slate with a line under it.` : r.won ?
`${numw(r.mine, true)} lots to his ${numw(r.lost)}, and a full sack of biscuit on the Third's kit-pile, off the Letherii's count. ${b9In('brask') ? 'Brask carries it to the wagon himself, on one shoulder, and stands it upright, and looks at it as if it might wander off.' : 'The Third puts it at the bottom of the wagon, under everything, where it will be the last thing eaten.'}` :
`The quartermaster's, ${numw(r.lost)} lots to ${numw(r.mine)}. ${b9In('tangle') ? 'Tangle explains thirds on the walk back, twice, with pebbles, until the squad would rather have lost again.' : 'Somewhere across the yard a Letherii clerk is sewing up another sack, very neatly.'}`); };
    jn(B9CH1, () => { const r = S.f.b9_sackLast; return r && r.done ? (r.won ? 'In the barracks yard the sergeant found the quartermaster\'s short sack on his scale, and won a sack of biscuit.' : 'In the barracks yard the sergeant hunted the quartermaster\'s short sack on his scale. The clerks were better at it.') : ''; }); }
  /* Ch2 (the Letherii): the Canal Locks with Saffa, on the first evening and on the last day */
  if (typeof B9CH2 !== 'undefined') { wrap(B9CH2, 'b9_c2_fire', n => after(n, '^Talk with the squad', [{t:'Saffa has scratched the Letheras canal on a bread-board, twelve locks long, and wants a game. The Canal Locks.', tag:'The Canal Locks', req:()=>{ const ph = S.f.b9_c2_ph || 1; return (ph === 1 || ph >= 4) && !(S.f.b9_locks && S.f.b9_locks.done); }, go:()=>playB9Locks({after:r => { b9LocksPay(r); S.f.b9_locksLast = r; talk('b9_c2_locks_after'); }})}]));
    B9CH2.dlg.b9_c2_locks_after = () => { const r = S.f.b9_locksLast || {}, day = (S.f.b9_c2_ph || 1) >= 4; return b9gAfter('The squad\'s fire', day ? 'b9_wagons' : 'b9_muster', 'b9_c2_fire', !r.done ?
`You leave the board with the boats still on it. Saffa does not mind. She plays both sides against each other, and drowns them both, and goes back to her pot.` : r.won ?
`Both boats in the basin. In the morning there is the bottom of Saffa's pot for the squad, scraped into a cloth, which is the best of it, as she said. ${b9In('brennet') ? 'Brennet carries the cloth back to the fire like a wagon of his own.' : 'The squad shares it out by the fire and does not tell the next company.'}` :
`Saffa's, both her boats in. ${b9In('tobet') ? 'Tobet says the canal was always going to win. It won in the Indebted quarter too.' : 'She goes back to her pot humming something from the kitchens of Letheras, and the lamps go on along the train.'}`); };
    jn(B9CH2, () => { const r = S.f.b9_locksLast; return r && r.done ? (r.won ? 'On the muster ground Saffa the cook played the sergeant at the Canal Locks, on a bread-board, and lost the bottom of her pot.' : 'On the muster ground Saffa the cook played the sergeant at the Canal Locks, on a bread-board, and drowned every boat.') : ''; }); }
  /* Ch4 (the Letherii): Yelt's Tally at the train's fire, at dusk (phase 1) and at evening after the key (phases 4 and 5); never the night of the raid */
  if (typeof B9CH4 !== 'undefined') { wrap(B9CH4, 'b9_c4_fire', n => after(n, '^Talk with the squad', [{t:'Yelt has his book open on his knee and a wagon to call off. Keep his tally.', tag:'Yelt\'s Tally', req:()=>{ const ph = S.f.b9_c4_ph || 1; return (ph === 1 || ph >= 4) && !(S.f.b9_tally && S.f.b9_tally.done); }, go:()=>playB9Tally({after:r => { b9TallyPay(r); S.f.b9_tallyLast = r; talk('b9_c4_tally_after'); }})}]));
    B9CH4.dlg.b9_c4_tally_after = () => { const r = S.f.b9_tallyLast || {}; return b9gAfter('The squad\'s fire', 'b9_c4_dusk', 'b9_c4_fire', !r.done ?
`You leave Yelt to his book. He does not mind. He calls the wagon off to himself, under his breath, and gets it right, and looks a little lonely about it.` : r.won ?
`${numw(r.mine, true)} wagons of three. The sack the count found is on the Sixth's tailboard by full dark, with Yelt's mark on it and the squad's name against it in the book, honest. ${b9In('perrit') ? 'Perrit reads the line he wrote, and nods, and says it is the first true thing she has seen written since the river.' : 'The squad eats from it with the book shut.'}` :
`${numw(r.mine, true)} wagons of three. Yelt shuts the book. ${b9In('tobet') ? 'Tobet sits with his tally-stick, notching the last wagon from memory, to see where it went wrong.' : 'Out on the plain the light goes, and the train\'s lamps come up one by one, each with a clerk under it counting.'}`); };
    jn(B9CH4, () => { const r = S.f.b9_tallyLast; return r && r.done ? (r.won ? 'At the train\'s fire Yelt called wagons off his book, and the sergeant kept the count. A sack it found went down against the Sixth\'s name.' : 'At the train\'s fire Yelt called wagons off his book, and the sergeant lost the count.') : ''; }); }
  /* Ch5 (the Third): Under the Helmet with the heavies at the next fire, on both nights at the dung-fire */
  if (typeof B9CH5 !== 'undefined') { wrap(B9CH5, 'b9_c5_fire', n => after(n, '^Talk with the squad', [{t:'At the next fire the heavies have dice under a helmet, and a pot with something left at the bottom. Under the Helmet.', tag:'Under the Helmet', req:()=>{ const ph = S.f.b9_c5_ph || 1; return (ph === 1 || ph >= 3) && !(S.f.b9_helm && S.f.b9_helm.done); }, go:()=>playB9Helm({after:r => { b9HelmPay(r); S.f.b9_helmLast = r; talk('b9_c5_helm_after'); }})}]));
    B9CH5.dlg.b9_c5_helm_after = () => { const r = S.f.b9_helmLast || {}; return b9gAfter('The Third\'s fire', 'b9_wastes_night', 'b9_c5_fire', !r.done ?
`You leave the heavy with his helmet. He does not mind. He goes on playing against the man beside him, for nothing, out of habit.` : r.won ?
`${numw(r.mine, true)} hands, and the bottom of the pot, and a biscuit in a rag. The Third shares it round the dung-fire, a mouthful each. ${b9In('haddat') ? 'Haddat breaks hers in two and puts half in her pack for tomorrow, as she does with everything now.' : 'Not one of them says it was good. Everybody eats slowly.'}` :
`The heavy's, ${numw(r.lost)} hands to ${numw(r.mine)}. He scrapes the pot. ${b9In('sathi') ? 'Sathi watches him eat it, and says she will remember his face, in a way that makes him eat faster.' : 'Belts stay on the same hole. The fire burns low to make the dung last.'}`); };
    jn(B9CH5, () => { const r = S.f.b9_helmLast; return r && r.done ? (r.won ? 'Deep in the Wastes, at the heavies\' fire, the sergeant played Under the Helmet for the bottom of the pot, and won it.' : 'Deep in the Wastes, at the heavies\' fire, the sergeant played Under the Helmet for the bottom of the pot. The heavy ate it.') : ''; }); }
  /* Ch7 (the Third): Knife in the Dirt, in the retreat camp days after (phase 4); no game at the brew-fire before the dark */
  if (typeof B9CH7 !== 'undefined') { wrap(B9CH7, 'b9_c7_fire', n => after(n, '^Talk with the squad', [{t:'A heavy from the next fire has a knife out and a patch of smoothed dirt. Knife in the Dirt.', tag:'Knife in the Dirt', req:()=>(S.f.b9_c7_ph || 1) >= 4 && !(S.f.b9_knife && S.f.b9_knife.done), go:()=>playB9Knife({after:r => { b9KnifePay(r); S.f.b9_knifeLast = r; talk('b9_c7_knife_after'); }})}]));
    B9CH7.dlg.b9_c7_knife_after = () => { const r = S.f.b9_knifeLast || {}, p = S.f.b9_knifePaid; return b9gAfter('The Third\'s fire', 'b9_c7_camp', 'b9_c7_fire', !r.done ?
`You give the heavy back his knife. He does not mind. He throws it a few times on his own, off the palm, and stops, and sits a while.` : r.won ?
`${numw(r.mine, true)} stuck to his ${numw(r.his)}. ${p && p !== 'ration' && b9In(p) ? `${NAME(p)} borrows the knife after, and throws it off the palm, and misses, and laughs, and looks surprised at having laughed. ${b9gHe(p) === 'she' ? 'She' : 'He'} sits closer to the fire after that.` : 'The heavy leaves a biscuit by the Third\'s fire when he goes, in a rag, and does not say why.'}` :
`${r.tie ? `${numw(r.mine, true)} each. No one's.` : `The heavy's, ${numw(r.his)} to ${numw(r.mine)}.`} He goes back to his own fire. The camp is quiet round it, quieter than any camp the Third has been in.`); };
    jn(B9CH7, () => { const r = S.f.b9_knifeLast; return r && r.done ? (r.won ? 'In the retreat camp, days after, a heavy from the next fire played Knife in the Dirt with the sergeant, and the sergeant stuck the most.' : 'In the retreat camp, days after, a heavy from the next fire played Knife in the Dirt with the sergeant.') : ''; }); }
}
