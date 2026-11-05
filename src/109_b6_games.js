/* ============ Book Six: the games at the fires (v9.1) ============ */
/* Book Six keeps its games here and wraps the chapters' fire nodes from this file, as Books Four (79) and Five (89) do, so the chapter
   files are untouched. Five games, one at each fire the plan names (docs/bh-games-notes.md):
   - Bones (Ch1, the Third, b6_c1_fire): with the new draft come up to the 9th on the Odhan. Book One's bones. Silver, because a dice
     blanket is the one place in the Fourteenth where money is the scene. Net capped at 10 silver.
   - Falari Tide (Ch2, the Fourth, b6_c2_fire): three dice against a Falari corporal of Sweetcreek's, for pride. Brannoc's regard, or a salve.
   - Who's Next (Ch4, the Fourth, b6_c4_fire): the Seventh's chalk board of duties, drawn from a helmet. Headline only: it is a board of
     details (water, the pits, the night picket), never of names or the sick. A fever broken, or a salve.
   - The Jetty Race (Ch5, the Third, b6_c5_fire): crates into a longboat against the next squad down. A sharper.
   - The Grey Helms' Signs (Ch7, the Third, b6_c7_fire at sea): the Perish shield-line signs, given back in order. Ottar's regard, or a salve.
   Each is declinable (the fire's own choices stay), played once a book (the fire stops offering it once it is finished), pays once as the
   table closes, and keeps its deeds on S.deeds. A game left early can be come back to and pays nothing. They use the tables' frame (36)
   and Book Five's in-game check (89: b5gRoll and its tiers), with a "yes, but" of each scene's own. */

const b6gOn = () => b5gOn(), b6gPick = a => b5gPick(a), b6gRoll = (s, dc, who, e) => b5gRoll(s, dc, who, e), b6gRollHTML = r => b5gRollHTML(r);
const b6gText = (...a) => b5gText(...a);
const B6G_SHE = ['haddat', 'sathi', 'marrow', 'hessa', 'mirrel', 'rasp', 'brisk', 'kettle', 'tuft', 'ellis', 'sohra', 'greysword', 'ressa'];
const b6gHe = id => id === 'sgt' ? 'you' : B6G_SHE.includes(id) ? 'she' : 'he';
const b6gSp = () => Math.max(.4, SET.speed || 1);
/* a night sky, a ground line and a fire, the way each table starts */
function b6gNight(ctx, W, H, t, o = {}){ const sk = ctx.createLinearGradient(0, 0, 0, H); sk.addColorStop(0, o.top || '#06070c'); sk.addColorStop(o.cut || .5, o.mid || '#1a1612'); sk.addColorStop(1, o.low || '#0e0b08'); ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H);
  if (o.stars !== false) for (let i = 0; i < 28; i++) { ctx.fillStyle = `rgba(220,226,250,${(.1 + hash(i, o.seed || 9301)*.4).toFixed(2)})`; ctx.fillRect(hash(i, 9302)*W, hash(i, 9303)*H*.34, 1, 1); }
  if (o.fx != null) { const fx = o.fx, fy = o.fy, fl = b2Fl(t); ctx.globalCompositeOperation = 'lighter'; glow(ctx, fx, fy, H*.45, o.fcol || '#ff8a3a', .3*fl); ctx.globalCompositeOperation = 'source-over';
    poly(ctx, [[fx - 10, fy + 3], [fx - 3, fy - 20*fl], [fx + 1, fy - 8], [fx + 5, fy - 16*fl], [fx + 10, fy + 3]], 'rgba(255,150,60,.95)'); poly(ctx, [[fx - 4, fy + 3], [fx, fy - 9*fl], [fx + 4, fy + 3]], '#fff1c2'); } }
/* the after-node's shape: words for left early, won, lost */
const b6gAfter = (sp, scene, back, txt) => ({sp, scene, txt, ch:[{t:'Back to the fire.', go:back}]});

/* ============ 1. Bones, with the new draft ============
   On the Lato Odhan and under Y'Ghatan's walls the 9th has taken in a draft of recruits out of Aren, and the recruits have bones. Book
   One's rules: two bones, throw as often as you like and bank when you are scared; a skull wipes the throw, two skulls (Hood's eyes) wipe
   what you have banked, a pair that isn't skulls counts double. First to 25 takes the stake, a silver to three. Once a sitting, after a
   single skull that cost six or more, the sergeant may call the bone cocked (Guile; Sathi, who has cheated at bones since she could walk,
   with an edge): made, the recruits let it be thrown again; "yes, but", they let it, and their corporal takes a silver for the argument.
   Silver, net capped at 10 over the book, paid as the blanket is rolled up; played once. */
const B6G_BONESCAP = 10, B6G_BONESGOAL = 25;
const B6G_DRAFT = {name:'The recruit', push:(turn, me, you) => turn < (you >= B6G_BONESGOAL - 6 ? 18 : me < you - 8 ? 15 : 11),
  start:['"Two bones, Sergeant. Aren rules. A skull wipes it."', '"We\'ve played since the boats. Only fair to warn you."'],
  bust:['"Skull. That\'s Aren for you."', 'He shrugs. "That\'s bones."'], drown:['"Hood\'s eyes." He goes quiet. The recruits round the blanket go quiet with him.'],
  bank:['"That\'ll do."', '"Banking. My sergeant says I never bank."'], big:['"Watch this, Sergeant. Watch the bones."'],
  win:['"Sorry, Sergeant." He is not sorry.', 'He holds out his hand, and then remembers who you are, and holds it out more politely.'],
  lose:['He pays, and looks at the bones as if they have let Aren down.', '"Again? We\'ve got all night. We\'ve got all siege."']};
const B6G_DRAFTCHAT = {meBust:['"Skull, Sergeant."', 'A recruit winces for you, then grins.'], meBig:['"Bank it, Sergeant. Bank it."'], meDrown:['"Hood\'s eyes. Oh, that\'s hard. Sorry, Sergeant."'], meWin:['"The sergeant took him. Write it home."']};
function playB6Bones(opt = {}){
  let on = () => true; const O = B6G_DRAFT, pick = b6gPick, T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b6gSp());
  const g = MG.state = {me:0, opp:0, turn:0, who:'me', dice:[1 + R(6), 1 + R(6)], roll:0, busy:false, over:false, stake:null, started:false, talk:'', net:0, games:0, won:0, lost:0, callUsed:false, callReady:false, lastTurn:0, check:null};
  const capLeft = () => Math.max(0, B6G_BONESCAP - (S.f.b6_bonesNet || 0));
  const purse = () => (S.silver || 0) + g.net;
  const result = () => ({net:g.net, games:g.games, won:g.won, lost:g.lost, pay:g.pay || 0});
  const settle = () => { if (g.paid) return; g.paid = true; const pay = g.net > 0 ? Math.min(g.net, capLeft()) : Math.max(g.net, -(S.silver || 0));
    S.silver = (S.silver || 0) + pay; updSilver(); g.pay = pay; if (pay > 0) S.f.b6_bonesNet = (S.f.b6_bonesNet || 0) + pay; };
  const close = () => { settle(); mgClose(result()); };
  mgOpen({kick:'The 9th\'s lines · the recruits\' blanket', title:'Bones', leaveText:'Leave the bones', done:r => opt.after && opt.after(r),
    leave:() => { if (!g.over && g.stake && (g.me || g.opp || g.turn)) { g.net -= g.stake; g.games++; g.lost++; } g.over = true; settle(); mgClose(Object.assign(result(), {left:true})); }}); on = b6gOn();
  const say = (who, line) => { g.talk = mgSay(who, line); draw(); };
  const draw = () => { if (!g.started) return stakePick();
    const mine = g.who === 'me' && !g.busy && !g.over && !g.callReady, pct = n => Math.min(100, n / B6G_BONESGOAL * 100);
    const again = g.over && purse() >= 1 && (S.f.b6_bonesNet || 0) + Math.max(0, g.net) < B6G_BONESCAP;
    mgPanel(`<div class="bscore"><div class="bs ${g.who === 'me' && !g.over ? 'on' : ''}"><span>${esc(S.name)}</span><b>${g.me}</b><i style="width:${pct(g.me)}%"></i>${g.who === 'me' && g.turn ? `<em>+${g.turn}</em>` : ''}</div>
      <div class="bs ${g.who === 'opp' && !g.over ? 'on' : ''}"><span>${O.name}</span><b>${g.opp}</b><i style="width:${pct(g.opp)}%"></i>${g.who === 'opp' && g.turn ? `<em>+${g.turn}</em>` : ''}</div></div>
      <p class="fine bgoal">First to ${B6G_BONESGOAL}. A skull wipes the throw; two skulls wipe your bank; a pair counts double. Stake: ${g.stake} silver. ${g.net ? `${g.net > 0 ? 'Up' : 'Down'} ${Math.abs(g.net)} tonight.` : ''}</p>
      ${g.talk}${b6gRollHTML(g.check)}
      ${g.over ? `<div class="row mgbtns">${again ? `<button class="btn primary" id="b6bAgain" data-bot="1">Another game</button>` : ''}<button class="btn ${again ? '' : 'primary'}" id="b6bDone" data-bot="1">Back to the fire</button></div>`
      : g.callReady ? `<div class="row mgbtns"><button class="btn on" id="b6bCall" data-bot="1">Call the bone cocked</button><button class="btn" id="b6bLet" data-bot="1">Let it go</button></div>`
      : `<div class="row mgbtns"><button class="btn primary" id="b6bThrow" data-bot="1" ${mine ? '' : 'disabled'}>Throw the bones</button><button class="btn" id="b6bBank" data-bot="1" ${mine && g.turn ? '' : 'disabled'}>Bank ${g.turn || ''}</button></div>
        <p class="hint keys"><kbd>Space</kbd> throw · <kbd>B</kbd> bank · <kbd>Esc</kbd> leave</p>`}
      <p class="fine">The bones pay at most ${B6G_BONESCAP} silver over what you sat down with, once.</p>`);
    if ($('#b6bThrow')) $('#b6bThrow').onclick = throwMe; if ($('#b6bBank')) $('#b6bBank').onclick = bank;
    if ($('#b6bCall')) $('#b6bCall').onclick = call;
    if ($('#b6bLet')) $('#b6bLet').onclick = () => { AUDIO.play('click'); g.callReady = false; pass(); };
    if ($('#b6bAgain')) $('#b6bAgain').onclick = () => { AUDIO.play('click'); g.started = false; stakePick(); };
    if ($('#b6bDone')) $('#b6bDone').onclick = () => { AUDIO.play('click'); close(); }; };
  /* the check: call the bone cocked (Guile 13). Made: thrown again. Yes, but: thrown again, and a silver to the recruits' corporal. */
  const call = () => { if (!g.callReady) return; g.callReady = false; g.callUsed = true; AUDIO.play('click');
    const r = g.check = b6gRoll('guile', 13, null, [['she has cheated at bones since she could walk', 2, 'sathi'], ['he counts the faces as they fall', 1, 'tangle'], ['you have heard every argument a blanket can hold', 1, 'sgt']]);
    if (r.ok) { g.turn = g.lastTurn; say('', `${r.who === 'sgt' ? 'You pick' : `${NAME(r.who)} picks`} the bone up and turns it in the firelight. "Cocked," ${r.who === 'sgt' ? 'you say' : b6gHe(r.who) + ' says'}. "Landed on the blanket's edge." The recruit looks at the edge, and at your stripes, and lets it be thrown again.`); }
    else if (r.tier === 'near') { g.turn = g.lastTurn; g.net -= 1; say('The recruits\' corporal', `"Fine. Throw it again." She holds out a hand. "A silver for the argument, Sergeant. We have a lot of argument in the draft, and it all costs." <span class="dim">(−1)</span>`); }
    else { say('The recruit', '"It landed flat, Sergeant. Everyone saw." Everyone did.'); T(pass, 700); } };
  const tumble = cb => { g.busy = true; g.roll = performance.now(); AUDIO.play('shuffle'); draw();
    T(() => { const a = 1 + R(6), b = 1 + R(6); g.dice = [a, b]; g.roll = 0; AUDIO.play('dice', !(a === 1 || b === 1)); cb(a, b); }, REDUCE() ? 150 : 600); };
  const score = (a, b) => a === 1 && b === 1 ? 'drown' : a === 1 || b === 1 ? 'bust' : a === b ? (a + b) * 2 : a + b;
  const throwMe = () => { if (g.who !== 'me' || g.busy || g.over || g.callReady) return; g.check = null;
    tumble((a, b) => { g.busy = false; const s = score(a, b);
      if (s === 'drown') { g.lastTurn = g.turn; g.me = 0; g.turn = 0; say('A recruit', pick(B6G_DRAFTCHAT.meDrown)); return pass(); }
      if (s === 'bust') { g.lastTurn = g.turn; g.turn = 0; if (!g.callUsed && g.lastTurn >= 6) { g.callReady = true; say('', `A skull. ${g.lastTurn} gone, unless somebody argues.`); return; } say('A recruit', pick(B6G_DRAFTCHAT.meBust)); return pass(); }
      g.turn += s; if (g.me + g.turn >= B6G_BONESGOAL) { g.me += g.turn; g.turn = 0; return finish('me'); }
      say(g.turn >= 14 ? 'A recruit' : '', g.turn >= 14 ? pick(B6G_DRAFTCHAT.meBig) : a === b ? `A pair of ${a}s, doubled: ${s}. ${g.turn} this turn.` : `${a} and ${b}. ${g.turn} this turn.`); }); };
  const bank = () => { if (g.who !== 'me' || g.busy || g.over || !g.turn || g.callReady) return; g.me += g.turn; AUDIO.play('coin'); say('', `You bank ${g.turn}.`); g.turn = 0; pass(); };
  const pass = () => { if (g.over) return; g.callReady = false; if (g.who === 'me') { g.who = 'opp'; g.turn = 0; draw(); T(oppTurn, 800); } else { g.who = 'me'; g.turn = 0; draw(); } };
  const oppTurn = () => { if (g.over || g.who !== 'opp') return;
    tumble((a, b) => { g.busy = false; const s = score(a, b);
      if (s === 'drown') { g.opp = 0; g.turn = 0; say(O.name, pick(O.drown)); return T(pass, 1000); }
      if (s === 'bust') { g.turn = 0; say(O.name, pick(O.bust)); return T(pass, 900); }
      g.turn += s; if (g.opp + g.turn >= B6G_BONESGOAL) { g.opp += g.turn; g.turn = 0; return finish('opp'); }
      if (O.push(g.turn, g.opp, g.me)) { if (g.turn >= 14) say(O.name, pick(O.big)); else draw(); T(oppTurn, 700); }
      else T(() => { g.opp += g.turn; say(O.name, `${pick(O.bank)} <span class="dim">(${g.turn})</span>`); g.turn = 0; T(pass, 600); }, 500); }); };
  const finish = w => { g.over = true; g.busy = false; g.games++; const won = w === 'me';
    g.net += won ? g.stake : -g.stake; if (won) g.won++; else g.lost++; AUDIO.play(won ? 'coin' : 'click'); mgDeed(won ? 'b6BonesWon' : 'b6BonesLost');
    say(won ? 'A recruit' : O.name, won ? `You take ${g.stake} silver. ` + pick(B6G_DRAFTCHAT.meWin.concat(O.lose)) : `The recruit takes ${g.stake} silver. ` + pick(O.win)); };
  const stakePick = () => { g.me = g.opp = g.turn = 0; g.who = 'me'; g.over = false; g.callUsed = false; g.callReady = false; g.stake = null; g.check = null;
    mgPanel(`${g.talk}${mgSay(O.name, pick(O.start))}<p class="fine">What's the stake? You have ${purse()} silver.</p>
      <div class="row mgbtns">${[1, 2, 3].map(n => `<button class="btn ${n === 1 ? 'primary' : ''}" data-st="${n}" data-bot="1" ${purse() >= n ? '' : 'disabled'}>${n} silver</button>`).join('')}</div>
      <p class="fine bgoal">First to ${B6G_BONESGOAL}. Throw as often as you like and bank when you're scared. A skull wipes the throw; two skulls, Hood's eyes, wipe everything you've banked. A pair that isn't skulls counts double. Once a sitting, a skull can be argued.</p>`);
    document.querySelectorAll('#mgPanel [data-st]').forEach(b => b.onclick = () => { AUDIO.play('coin'); g.stake = +b.dataset.st; g.started = true; g.talk = mgSay('', 'You throw first. Rank has that much.'); draw(); }); };
  mgKeys({' ':() => { if (g.over) { const b = $('#b6bAgain') || $('#b6bDone'); b && b.click(); } else if (!g.started) { const b = $('#mgPanel [data-st]:not([disabled])'); b && b.click(); } else if (g.callReady) call(); else throwMe(); }, b:bank, Enter:() => { if (g.over) { const b = $('#b6bDone'); b && b.click(); } else bank(); }});
  /* the blanket: the 9th's cook-fire, the recruits round it in new grey-green, and behind them the Odhan dark, or the walls */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, walls = (S.f.b6_c1_ph || 1) >= 3;
    b6gNight(ctx, W, H, t, {top:'#07060a', mid:walls ? '#3a241c' : '#1a1610', cut:.42, low:'#0f0b08', fx:W*.5, fy:H*.5});
    if (walls) { ctx.fillStyle = '#b8a888'; ctx.fillRect(0, H*.24, W, H*.16); ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let i = 0; i < 14; i++) ctx.fillRect(i*W/14, H*.22, W/28, H*.03); for (let i = 0; i < 8; i++) glow(ctx, hash(i, 9311)*W, H*.3, 6, '#ffb060', .5); }
    else { ctx.fillStyle = '#14100c'; ctx.beginPath(); ctx.moveTo(0, H*.42); for (let i = 0; i <= 10; i++) ctx.lineTo(W*i/10, H*(.38 + hash(i, 9312)*.04)); ctx.lineTo(W, H*.42); ctx.fill(); }
    ctx.fillStyle = '#18120c'; ctx.fillRect(0, H*.42, W, H*.58);
    const fs = clamp(H/96, 1.5, 3.4); drawFigure(ctx, 'b2soldier', W*.16, H*.74, fs, t, {still:!(g.who === 'opp' && g.busy), dir:1, phase:1}); drawFigure(ctx, 'b2soldier', W*.86, H*.72, fs*.92, t, {still:true, dir:-1, phase:3});
    ctx.save(); ctx.translate(W/2, H*.76); ctx.transform(1, 0, -.08, 1, 0, 0); const bw = Math.min(W*.5, 260), bh = Math.min(H*.22, 80); ctx.fillStyle = '#4a4232'; ctx.fillRect(-bw/2, -bh/2, bw, bh); ctx.strokeStyle = '#6a5e44'; ctx.lineWidth = 2; ctx.strokeRect(-bw/2 + 4, -bh/2 + 4, bw - 8, bh - 8); ctx.restore(); // the army blanket
    const k = g.roll ? (performance.now() - g.roll) / 600 : 1, s = Math.min(54, W*.1, H*.15);
    [0, 1].forEach(i => { const face = g.roll ? 1 + (Math.floor(performance.now()/70 + i*3) % 6) : g.dice[i], x = W/2 + (i ? 1 : -1)*s*.8 + (g.roll ? Math.sin(k*9 + i)*10 : 0), lift = g.roll ? Math.abs(Math.sin(k*Math.PI*2.5))*22*(1 - k) : 0;
      drawBone(ctx, x, H*.76, s, face, g.roll ? k*6 + i : (i ? .12 : -.08), lift); });
    if (g.who === 'opp' && !g.over && g.started) b6gText(ctx, 'The recruit throws', W*.18, H*.74 - 34*fs, Math.min(15, W*.035)); };
  g.talk = mgSay('', `The draft out of Aren came up to the 9th on the march, forty recruits in new grey-green with the creases still in it, and the first thing they unpacked was a pair of bones. They have an army blanket spread by the cook-fire and their pay in a helmet.`) +
    (b6In('sathi') ? mgSay('Sathi', '"Recruits," Sathi says, with deep affection, and sits down at the edge of the blanket to watch them lose.') : b6In('haddat') ? mgSay('', 'Haddat looks at the recruits, and at the bones, and goes back to oiling the straps of the blue shield.') : '');
  stakePick();
}
function b6BonesPay(r){ if (!r || !r.games) return; S.f.b6_bones = {net:r.net, games:r.games, won:r.won, lost:r.lost, pay:r.pay || 0, done:(r.games || 0) > 0}; save(); }

/* ============ 2. Falari Tide ============
   At the Fourth's fire above the sea, one of Sweetcreek's Falari, a corporal with a red beard to rival Brannoc's, has three dice and a
   tide-table scratched on a board. A round: the Falari throws three (and bails his lowest once if he is under ten), then you throw three
   and may bail one die (throw it again), once a round. Higher total takes the round; three alike is a full tide and beats any total; a tie
   is the sea's, and the sea is Falari. First to three rounds. Once a game you may throw the Falari way, off the wrist (Guile; Brannoc with
   an edge): made, all three of yours go again; "yes, but", all three go again and the Falari takes a point on his total for the cheek.
   For pride, not silver: the Falari do not dice for money with the Seventh, by Sweetcreek's order. A match won pays once a book: Brannoc's
   regard (+1) if he walks; else a pot of Falari seal fat for the rain (a salve). */
const B6G_TIDEWIN = 3;
const b6gDie = (ctx, x, y, s, face, rot = 0, lift = 0, mark = false) => { ctx.save(); ctx.translate(x, y - lift); ctx.rotate(rot);
  ell(ctx, 2, s*.55 + lift, s*.5, s*.13, 'rgba(0,0,0,.45)'); const h = s/2, r = s*.16; ctx.beginPath(); ctx.moveTo(-h + r, -h); ctx.arcTo(h, -h, h, h, r); ctx.arcTo(h, h, -h, h, r); ctx.arcTo(-h, h, -h, -h, r); ctx.arcTo(-h, -h, h, -h, r); ctx.closePath();
  const gr = ctx.createLinearGradient(-h, -h, h, h); gr.addColorStop(0, '#d8c8a8'); gr.addColorStop(1, '#8a7656'); ctx.fillStyle = gr; ctx.fill(); ctx.strokeStyle = mark ? '#e8c073' : 'rgba(40,24,12,.6)'; ctx.lineWidth = mark ? 2 : 1; ctx.stroke();
  ({1:[[0,0]], 2:[[-1,-1],[1,1]], 3:[[-1,-1],[0,0],[1,1]], 4:[[-1,-1],[1,-1],[-1,1],[1,1]], 5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]], 6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]}[face] || []).forEach(([a, b]) => { ctx.beginPath(); ctx.arc(a*s*.26, b*s*.26, s*.08, 0, 7); ctx.fillStyle = '#7a2a1a'; ctx.fill(); }); // Falari red pips
  ctx.restore(); };
function playTide(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b6gSp()), d3 = () => [1 + R(6), 1 + R(6), 1 + R(6)];
  const g = MG.state = {round:0, mine:0, theirs:0, fal:[0, 0, 0], me:[0, 0, 0], phase:'ready', bailed:false, wristUsed:false, cheek:0, over:false, talk:'', check:null, roll:0, last:null};
  const tide = a => a[0] === a[1] && a[1] === a[2], sum = a => a[0] + a[1] + a[2];
  const val = (a, extra = 0) => tide(a) ? 100 + a[0] : sum(a) + extra;
  const result = () => ({mine:g.mine, theirs:g.theirs, rounds:g.round, won:g.over && g.mine >= B6G_TIDEWIN, done:g.over});
  mgOpen({kick:'Above the sea · Sweetcreek\'s Falari', title:'Falari Tide', leaveText:'Leave the dice', done:r => opt.after && opt.after(r), leave:() => mgClose(Object.assign(result(), {left:true, done:false}))}); on = b6gOn();
  const draw = () => { const mine = g.phase === 'mine' && !g.over;
    mgPanel(`<div class="cpbar"><span>${g.over ? 'The tide is out' : `Round ${g.round + 1}`}</span><span>You <b>${g.mine}</b> · the Falari <b>${g.theirs}</b></span><span>First to ${B6G_TIDEWIN}</span></div>
      ${g.talk}${b6gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="tdDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'ready' ? `<button class="btn primary" id="tdGo" data-bot="1">${g.round ? 'Next round' : 'The Falari throws'}</button>`
        : mine ? [0, 1, 2].map(i => `<button class="btn" data-bail="${i}" data-bot="1" ${g.bailed ? 'disabled' : ''}>Bail the ${g.me[i]}</button>`).join('') + `<button class="btn primary" id="tdStand" data-bot="1">Stand on ${tide(g.me) ? 'a full tide' : sum(g.me)}</button>${!g.wristUsed ? `<button class="btn" id="tdWrist" data-bot="1">Throw it Falari, off the wrist (once)</button>` : ''}`
        : `<button class="btn" disabled data-bot="1">The dice are rolling</button>`}</div>
      <p class="fine">Three dice each. Bail one of yours once a round. Higher total takes the round; three alike, a full tide, beats any total; a tie is the sea's, and the sea is Falari. First to ${B6G_TIDEWIN} rounds. For pride: the Falari do not dice for money with the Seventh.</p>
      <p class="hint keys"><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> bail a die · <kbd>Space</kbd> stand / next · <kbd>W</kbd> the wrist · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-bail]').forEach(b => b.onclick = () => bail(+b.dataset.bail));
    if ($('#tdGo')) $('#tdGo').onclick = () => { AUDIO.play('click'); round(); };
    if ($('#tdStand')) $('#tdStand').onclick = () => { AUDIO.play('click'); stand(); };
    if ($('#tdWrist')) $('#tdWrist').onclick = () => wrist();
    if ($('#tdDone')) $('#tdDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const round = () => { if (g.over || g.phase !== 'ready') return; g.phase = 'fal'; g.bailed = false; g.cheek = 0; g.check = null; g.roll = performance.now(); AUDIO.play('shuffle'); draw();
    T(() => { g.fal = d3(); if (!tide(g.fal) && sum(g.fal) < 10) { const lo = g.fal.indexOf(Math.min(...g.fal)); g.fal[lo] = 1 + R(6); g.talk = mgSay('The Falari', 'He bails his lowest with a flick of the wrist, and grins at what comes up.'); }
      else g.talk = mgSay('The Falari', tide(g.fal) ? '"Full tide," he says, very pleased, and spreads his hands.' : b6gPick(['"Beat that, landsman."', '"The sea is kind tonight."', '"Your throw, Sergeant."']));
      g.me = d3(); g.roll = 0; g.phase = 'mine'; AUDIO.play('dice', true);
      g.talk += mgSay('', `His three: <b>${g.fal.join(' · ')}</b>${tide(g.fal) ? ', a full tide' : `, ${sum(g.fal)}`}. Yours: <b>${g.me.join(' · ')}</b>${tide(g.me) ? ', a full tide' : `, ${sum(g.me)}`}.`); draw(); }, REDUCE() ? 150 : 600); };
  const bail = i => { if (g.phase !== 'mine' || g.bailed || g.over) return; g.bailed = true; const was = g.me[i]; g.me[i] = 1 + R(6); AUDIO.play('dice', g.me[i] > was);
    g.talk = mgSay('', `You bail the ${was}. It comes up ${g.me[i]}. ${tide(g.me) ? 'A full tide.' : `${sum(g.me)} against his ${tide(g.fal) ? 'full tide' : sum(g.fal)}.`}`); draw(); };
  /* the check: the Falari throw, off the wrist (Guile 13). Made: all three again. Yes, but: all three again, and he takes a point for the cheek. */
  const wrist = () => { if (g.phase !== 'mine' || g.wristUsed || g.over) return; g.wristUsed = true; AUDIO.play('click');
    const r = g.check = b6gRoll('guile', 13, null, [['Brannoc shows you the wrist', 2, 'brannoc'], ['she has watched sailors throw on every deck from Pale to here', 1, 'kettle'], ['you learned to throw on a troopship', 1, 'sgt']]);
    if (r.ok || r.tier === 'near') { g.me = d3(); AUDIO.play('dice', true); }
    if (r.ok) g.talk = mgSay('The Falari', `${r.who === 'sgt' ? 'You flick' : `${NAME(r.who)} flicks`} all three off the wrist the island way, and they come up <b>${g.me.join(' · ')}</b>. ${b6In('brannoc') ? 'The corporal looks at the wrist, and then at Brannoc, as if somebody has been telling island secrets.' : 'The corporal looks at the wrist with deep suspicion.'} "Fair," he says.`);
    else if (r.tier === 'near') { g.cheek = 1; g.talk = mgSay('The Falari', `All three again, off the wrist, near enough: <b>${g.me.join(' · ')}</b>. "That was a landsman's wrist," he says, "and I'll take a point off the sea for the cheek of it." <span class="dim">(+1 to his total this round)</span>`); }
    else g.talk = mgSay('The Falari', 'The dice go off the wrist and off the board and into the dark. When they are found, the round is the sea\'s. He laughs for some time.');
    if (!r.ok && r.tier !== 'near') { g.bailed = true; settle(false); return; } draw(); };
  const stand = () => { if (g.phase !== 'mine' || g.over) return; const a = val(g.me), b = val(g.fal, g.cheek); settle(a > b); };
  const settle = win => { g.phase = 'ready'; g.round++; if (win) { g.mine++; AUDIO.play('coin'); } else { g.theirs++; AUDIO.play('miss'); } g.last = win;
    g.talk += mgSay('', win ? b6gPick(['The round is yours. The Falari round the board groan, cheerfully.', 'Yours. The corporal scratches a mark on your side of the board with his knife.']) : b6gPick(['The sea\'s. The Falari cheer.', 'His. He scratches a mark on his side of the board and blows on it.']));
    if (g.mine >= B6G_TIDEWIN || g.theirs >= B6G_TIDEWIN) { g.over = true; const W = g.mine >= B6G_TIDEWIN; mgDeed(W ? 'b6TideWon' : 'b6TideLost'); AUDIO.play(W ? 'win' : 'lose');
      g.talk += mgSay('The Falari', W ? '"Three tides to the Seventh." He holds out a hand to shake, which is a thing the Falari do not do often. "Sweetcreek will hear of it. She will not believe it."' : '"Three to the islands." He sweeps up the dice. "Come and lose again. The Falari like the Seventh. You lose cheerfully."'); }
    draw(); };
  mgKeys({'1':() => bail(0), '2':() => bail(1), '3':() => bail(2), w:() => wrist(), ' ':() => { const b = $('#tdDone') || $('#tdGo') || $('#tdStand'); b && b.click(); }});
  /* the board: the sail over the coals, the rain on it, the sea below, the Falari corporal and his scratched tide-table */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, mo = REDUCE() ? 0 : 1;
    b6gNight(ctx, W, H, t, {top:'#05080e', mid:'#121a24', cut:.4, low:'#10100e', stars:false, fx:W*.16, fy:H*.6});
    ctx.fillStyle = '#0c141c'; ctx.fillRect(0, H*.3, W, H*.14); ctx.fillStyle = 'rgba(200,214,230,.18)'; for (let i = 0; i < 5; i++) ctx.fillRect(((hash(i, 9321)*W + t*mo*.01*(i + 1)) % W), H*(.33 + i*.022), 20 + hash(i, 9322)*30, 1); // the sea
    ctx.fillStyle = '#1e1a14'; ctx.fillRect(0, H*.44, W, H*.56);
    ctx.fillStyle = 'rgba(180,170,140,.55)'; ctx.beginPath(); ctx.moveTo(0, H*.06); ctx.quadraticCurveTo(W*.5, H*.16, W, H*.04); ctx.lineTo(W, H*.1); ctx.quadraticCurveTo(W*.5, H*.22, 0, H*.12); ctx.fill(); // the old sail
    ctx.strokeStyle = 'rgba(200,214,240,.22)'; ctx.lineWidth = 1; for (let i = 0; i < 30; i++) { const x = (hash(i, 9323)*W + (mo ? t*.05 : 0)) % W, y = (hash(i, 9324)*H + (mo ? t*.4 : 0)) % H; if (y < H*.14) continue; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 2, y + 8); ctx.stroke(); } // rain beyond the canvas
    const fs = clamp(H/96, 1.5, 3.2); drawFigure(ctx, 'brannoc', W*.86, H*.7, fs, t, {still:g.phase !== 'fal', dir:-1});
    if (b6In('brannoc')) drawFigure(ctx, 'brannoc', W*.3, H*.66, fs*.9, t, {still:true, dir:1, phase:2});
    ctx.fillStyle = '#4a3a26'; ctx.fillRect(W*.34, H*.62, W*.42, H*.3); ctx.strokeStyle = '#2a1e12'; ctx.lineWidth = 2; ctx.strokeRect(W*.34, H*.62, W*.42, H*.3); // the board
    for (let i = 0; i < g.theirs; i++) { ctx.strokeStyle = 'rgba(230,200,150,.7)'; ctx.beginPath(); ctx.moveTo(W*.72 - i*8, H*.64); ctx.lineTo(W*.72 - i*8, H*.68); ctx.stroke(); }
    for (let i = 0; i < g.mine; i++) { ctx.strokeStyle = 'rgba(160,230,190,.8)'; ctx.beginPath(); ctx.moveTo(W*.38 + i*8, H*.88); ctx.lineTo(W*.38 + i*8, H*.92); ctx.stroke(); }
    const s = Math.min(36, W*.075, H*.11), rolling = !!g.roll, k = rolling ? (performance.now() - g.roll) / 600 : 1;
    [0, 1, 2].forEach(i => { const x = W*.55 + (i - 1)*s*1.25; b6gDie(ctx, x, H*.7, s*.8, rolling ? 1 + (Math.floor(performance.now()/70 + i*2) % 6) : g.fal[i] || 1, rolling ? k*5 + i : 0, rolling ? Math.abs(Math.sin(k*7))*10 : 0);
      if (g.phase !== 'fal' && g.me[0]) b6gDie(ctx, x, H*.84, s, g.me[i], (i - 1)*.06, 0, g.phase === 'mine' && !g.bailed); }); };
  g.talk = mgSay('', `Down the slope, under a stretched sail of their own, Sweetcreek's Falari have a fire and a plank with a tide-table scratched in it, and a red-bearded corporal with three dice. "Three each," he says. "Bail one if you don't like it. Three alike is a full tide. A tie is the sea's." He grins. "The sea is Falari."`) +
    (b6In('brannoc') ? mgSay('Brannoc', '"He cheats," Brannoc says. "Not with the dice. With his face. Watch the dice, Sergeant, not the beard."') : '');
  draw();
}
/* what the tide leaves behind, once a book: Brannoc's regard, or a salve */
function b6TidePay(r){ if (!r) return; S.f.b6_tide = {mine:r.mine, theirs:r.theirs, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b6_tidePaid) { S.f.b6_tidePaid = 1; if (b6In('brannoc') && S.loy && S.loy.brannoc != null) { S.f.b6_tidePaid = 'brannoc'; loy('brannoc', 1); }
    else { S.inv.salve = (S.inv.salve || 0) + 1; note('+1 salve: a pot of Falari seal fat, for the rain.', 'good'); } }
  save(); }

/* ============ 3. Who's Next ============
   Under the oiled canvas before G'danisban the Seventh keeps a board: the company's six squads chalked down the side, a tally of the
   details each has drawn, and WHO'S NEXT chalked across the top by somebody who thought it was funny. It is. Every detail is drawn by lot
   from a helmet, and a squad with fewer tallies has more stones in it (the company's idea of fair). Three details tonight: the water, the
   bedding pits, the night picket. Before each draw you chalk your mark against the squad you think is next; two of three right and the
   corporal who keeps the board owes you. It is a board of details, never of names, and nobody on it is sick. Once a game you may count the
   stones (Wits; Kettle with an edge): made, the counts show; "yes, but", they show, and the corporal drops a second stone for the Fourth in,
   since you are so interested. Pays once a book on a win: one squadmate's fever breaks (a draught out of the surgeons' tent the corporal
   was owed), or if nobody has it, a salve. */
const B6G_SQUADS = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'], B6G_DETAILS = ['the water detail', 'the bedding pits', 'the night picket on the city side'];
function playWhosNext(opt = {}){
  let on = () => true; const T = (f, ms) => setTimeout(() => { if (on()) f(); }, ms * b6gSp());
  const tal = B6G_SQUADS.map((_, i) => 1 + Math.floor(hash(i, S.chapter || 4, (S.sid || '').length) * 4)); tal[3] = Math.max(tal[3], 2);
  const g = MG.state = {d:0, tal, stones:tal.map(n => Math.max(1, 6 - n)), mark:null, drawn:[], right:0, counted:false, check:null, talk:'', over:false, busy:false};
  const result = () => ({right:g.right, draws:g.drawn.length, won:g.over && g.right >= 2, done:g.over, fourth:g.drawn.filter(i => i === 3).length});
  mgOpen({kick:'Before G\'danisban · under the canvas', title:'Who\'s Next', leaveText:'Leave the board', done:r => opt.after && opt.after(r), leave:() => mgClose(Object.assign(result(), {left:true, done:false}))}); on = b6gOn();
  const draw = () => { const tot = g.stones.reduce((a, b) => a + b, 0);
    mgPanel(`<div class="cpbar"><span>${g.over ? 'The board is wiped' : `Draw ${g.d + 1} of 3: ${B6G_DETAILS[g.d]}`}</span><span>Right: <b>${g.right}</b></span><span>${g.counted === true ? `${tot} stones in the helmet` : 'The helmet'}</span></div>
      ${g.talk}${b6gRollHTML(g.check)}
      ${g.counted === true && !g.over ? `<p class="fine">In the helmet: ${B6G_SQUADS.map((s, i) => `${s} ${g.stones[i]}`).join(', ')}.</p>` : ''}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="wnDone" data-bot="1">Back to the fire</button>`
        : g.busy ? `<button class="btn" disabled data-bot="1">The corporal's hand is in the helmet</button>`
        : B6G_SQUADS.map((s, i) => `<button class="btn ${g.mark === i ? 'on' : ''}" data-sq="${i}" data-bot="1">${s}</button>`).join('') + `<button class="btn primary" id="wnDraw" data-bot="1" ${g.mark == null ? 'disabled' : ''}>Draw</button>` + (g.counted ? '' : `<button class="btn" id="wnCount" data-bot="1">Count the stones (once)</button>`)}</div>
      <p class="fine">Chalk your mark against the squad you think is next, then the corporal draws. A squad with fewer tallies has more stones in the helmet. Two of three right and the corporal owes you.</p>
      <p class="hint keys"><kbd>1</kbd>–<kbd>6</kbd> a squad · <kbd>Space</kbd> draw · <kbd>C</kbd> count · <kbd>Esc</kbd> leave</p>`);
    document.querySelectorAll('#mgPanel [data-sq]').forEach(b => b.onclick = () => { AUDIO.play('click'); mark(+b.dataset.sq); });
    if ($('#wnDraw')) $('#wnDraw').onclick = () => drawLot();
    if ($('#wnCount')) $('#wnCount').onclick = () => count();
    if ($('#wnDone')) $('#wnDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const mark = i => { if (g.over || g.busy || i < 0 || i > 5) return; g.mark = i; g.talk = mgSay('', `You chalk your mark against the ${B6G_SQUADS[i]}.${i === 3 ? ' The squad looks at you.' : ''}`); draw(); };
  /* the check: count the stones (Wits 13). Made: the counts show. Yes, but: they show, and a second Fourth stone goes in. */
  const count = () => { if (g.counted || g.over || g.busy) return; g.counted = true; AUDIO.play('click');
    const r = g.check = b6gRoll('wits', 13, null, [['she counts charges in her sleep', 2, 'kettle'], ['she counted everything in the city, to have something to count', 1, 'ressa'], ['you have drawn more details than anybody here', 1, 'sgt']]);
    if (r.ok) g.talk = mgSay(r.who === 'sgt' ? '' : NAME(r.who), r.who === 'sgt' ? 'You watch the corporal shake the helmet and count the stones going round in it by their clatter, the way you counted on your first company board. You have it.' : `${NAME(r.who)} watches the helmet go round and moves ${B6G_SHE.includes(r.who) ? 'her' : 'his'} lips. "Got it," ${b6gHe(r.who)} says, very quietly.`);
    else if (r.tier === 'near') { g.stones[3] += 2; g.talk = mgSay('The corporal', `"Counting my stones, Fourth?" He drops two more in, painted for the Fourth. "Since you're so interested." You have the count, and the Fourth has two more chances at everything. <span class="dim">(two Fourth stones in)</span>`); }
    else { g.counted = 'tried'; g.talk = mgSay('', `${NAME(r.who)} tries to count the stones by their clatter and loses it when the rain comes down harder on the canvas.`); }
    draw(); };
  const drawLot = () => { if (g.over || g.busy || g.mark == null) return; g.busy = true; AUDIO.play('shuffle'); g.talk = mgSay('The corporal', `"${b6gPick(['Who\'s next.', 'Next.', 'Hands off the board.'])}" He shakes the helmet and puts his hand in without looking.`); draw();
    T(() => { const tot = g.stones.reduce((a, b) => a + b, 0); let x = R(tot), pick = 0; for (let i = 0; i < 6; i++) { if (x < g.stones[i]) { pick = i; break; } x -= g.stones[i]; }
      g.drawn.push(pick); g.tal[pick]++; g.stones[pick] = Math.max(1, g.stones[pick] - 1); const hit = pick === g.mark; if (hit) g.right++; g.busy = false; AUDIO.play(hit ? 'coin' : 'click');
      g.talk = mgSay('', `The stone says <b>${B6G_SQUADS[pick]}</b>: ${B6G_DETAILS[g.d]}. ${pick === 3 ? b6gPick(['The Fourth has it. Of course the Fourth has it.', 'The Fourth. The squad looks at the rain.']) : b6gPick(['A groan from the ' + B6G_SQUADS[pick] + '\'s end of the canvas.', 'The ' + B6G_SQUADS[pick] + ' swears at the helmet, which has heard it before.'])} ${hit ? 'Your mark was on it.' : 'Your mark was not.'}`);
      g.d++; g.mark = null; if (g.d >= 3) end(); draw(); }, REDUCE() ? 150 : 650); };
  const end = () => { g.over = true; const W = g.right >= 2; mgDeed(W ? 'b6NextWon' : 'b6NextLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk += mgSay('The corporal', W ? `"${numw(g.right, true)} of three." He looks at the board, and at you. "I'll owe you, then. There's a surgeon who owes me. It goes round." He wipes the board with his sleeve for tomorrow.` : `"${numw(g.right, true)} of three." He wipes the board with his sleeve for tomorrow. "Nobody gets it. That's the point of it. That's why we play."`); };
  mgKeys({'1':() => mark(0), '2':() => mark(1), '3':() => mark(2), '4':() => mark(3), '5':() => mark(4), '6':() => mark(5), c:() => count(), ' ':() => { const b = $('#wnDone') || $('#wnDraw'); b && !b.disabled && b.click(); }});
  /* the board: oiled canvas, rain, a chalk board on a tent-pole, the tallies, the helmet */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, mo = REDUCE() ? 0 : 1;
    b6gNight(ctx, W, H, t, {top:'#0a0c10', mid:'#1a1c1e', cut:.3, low:'#121210', stars:false, fx:W*.86, fy:H*.86});
    ctx.fillStyle = '#2a2a22'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, H*.08); ctx.quadraticCurveTo(W/2, H*.14, 0, H*.08); ctx.fill(); // the canvas
    ctx.strokeStyle = 'rgba(190,200,220,.25)'; for (let i = 0; i < 26; i++) { const x = hash(i, 9331)*W, y = H*.1 + ((hash(i, 9332)*H + (mo ? t*.35 : 0)) % (H*.9)); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 1, y + 7); ctx.stroke(); } // the drip off it
    const bx = W*.05, by = H*.14, bw = Math.min(W*.64, 400), bh = H*.66; ctx.fillStyle = '#1c2420'; ctx.fillRect(bx, by, bw, bh); ctx.strokeStyle = '#5a4a32'; ctx.lineWidth = 3; ctx.strokeRect(bx, by, bw, bh);
    const sz = Math.max(9, Math.min(15, bh / 11)), chalk = 'rgba(236,232,220,.9)'; b6gText(ctx, 'WHO\'S NEXT', bx + bw/2, by + sz*1.4, sz*1.1, chalk, 'center', '\'IM Fell English SC\', serif', 400);
    B6G_SQUADS.forEach((s, i) => { const y = by + sz*(3 + i*1.45), hot = g.drawn[g.drawn.length - 1] === i && !g.busy;
      b6gText(ctx, s, bx + sz*.6, y, sz*.85, hot ? '#f2d488' : chalk, 'left', '\'IM Fell English\', serif', 400);
      for (let k = 0; k < g.tal[i]; k++) { const x = bx + bw*.4 + (k % 5)*sz*.5 + Math.floor(k/5)*sz*3; if (k % 5 === 4) { ctx.strokeStyle = chalk; ctx.beginPath(); ctx.moveTo(x - sz*2.1, y - sz*.6); ctx.lineTo(x + sz*.1, y); ctx.stroke(); } else { ctx.strokeStyle = chalk; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x, y - sz*.75); ctx.lineTo(x, y); ctx.stroke(); } }
      if (g.mark === i) { ctx.strokeStyle = '#9fe0b8'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.ellipse(bx + sz*2.2, y - sz*.3, sz*2, sz*.62, 0, 0, 7); ctx.stroke(); }
      if (g.counted === true && !g.over) b6gText(ctx, `${g.stones[i]}`, bx + bw - sz, y, sz*.8, 'rgba(232,192,115,.8)', 'right'); });
    const hx = W*.82, hy = H*.62, hs = Math.min(W*.08, H*.12), sh = g.busy && mo ? Math.sin(t/40)*4 : 0; ell(ctx, hx + sh, hy + hs*.6, hs*.9, hs*.2, 'rgba(0,0,0,.45)'); ctx.fillStyle = '#5a6068'; ctx.beginPath(); ctx.arc(hx + sh, hy, hs*.8, Math.PI, 0); ctx.lineTo(hx + sh + hs*.8, hy + hs*.3); ctx.lineTo(hx + sh - hs*.8, hy + hs*.3); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(hx + sh - hs*.5, hy - hs*.5, hs*.12, hs*.6); // the helmet, upside down on a crate
    const fs = clamp(H/110, 1.4, 2.8); drawFigure(ctx, 'b2soldier', W*.82, H*.92, fs, t, {still:!g.busy, dir:-1}); };
  g.talk = mgSay('', `Under the oiled canvas the Seventh keeps a chalk board on a tent-pole: the company's six squads down the side, a tally of every detail each has drawn, and across the top, in somebody's best hand, WHO'S NEXT. The details are drawn from a helmet by the corporal who keeps the board. It is not about the fever. Everybody agrees about that, loudly.`) +
    mgSay('The corporal', '"Water, the pits, the picket on the city side. Chalk your mark. Fewer tallies, more stones: that\'s fair, the captain says." He shakes the helmet. "Two right and I owe you."') +
    (b6In('kettle') ? mgSay('', 'Kettle sits on an upturned bucket where she can see the helmet, and starts counting.') : b6In('ressa') ? mgSay('', 'Ressa watches the board from the dry end of the canvas. "In G\'danisban the dyers drew lots for the vats," she says. "The blue was the one you didn\'t want." She looks at her fingers, and then at the helmet.') : '');
  draw();
}
/* what the board leaves behind, once a book: a fever broken, or a salve */
function b6NextPay(r){ if (!r) return; S.f.b6_next = {right:r.right, won:!!r.won, done:!!r.done, fourth:r.fourth || 0};
  if (r.won && !S.f.b6_nextPaid) { const f = b6FeverList(); S.f.b6_nextPaid = 1;
    if (f.length) { S.f.b6_nextPaid = f[0]; b6Cure(f[0], 'a surgeon\'s draught the corporal was owed'); }
    else { S.inv.salve = (S.inv.salve || 0) + 1; note('+1 salve: what the corporal was owed, passed on.', 'good'); } }
  save(); }

/* ============ 4. The Jetty Race ============
   On the Kokakal shore the engineers have run timber jetties out past the surf, and the 9th loads its own longboats for Nok's transports.
   The next squad down has bet the Third a clay sharper that it loads eight crates first. The longboat rises and falls against the jetty; a
   crate swung down when the gunwale is level goes in; swung too soon or too late it goes in the sea, and the line has to be hauled back.
   Before the race the squad may rig the yard to take two at a time (Wits; Tangle with a sapper's edge): made, the first three lifts are
   doubles; "yes, but", doubles, and the first lift snaps a lashing and goes in the sea. A race won pays the sharper, once a book. */
const B6G_LOAD = 8, B6G_PERIOD = 1500, B6G_WIN = .3;
function playJetty(opt = {}){
  let on = () => true;
  const g = MG.state = {phase:'intro', mine:0, theirs:0, t0:0, nextRival:0, rivalGap:1650, lock:0, doubles:0, rigged:false, check:null, talk:'', over:false, splash:0, lifts:0, wet:0};
  const pace = ms => ms * b6gSp();
  const result = () => ({mine:g.mine, theirs:g.theirs, won:g.over && g.mine >= B6G_LOAD, done:g.over, wet:g.wet});
  mgOpen({kick:'The Kokakal shore · the 9th\'s jetty', title:'The Jetty Race', leaveText:'Leave the jetty', done:r => opt.after && opt.after(r), leave:() => { g.over = true; mgClose(Object.assign(result(), {left:true, done:false, won:false})); }}); on = b6gOn();
  const lvl = (now = performance.now()) => Math.sin(2 * Math.PI * (now - g.t0) / pace(B6G_PERIOD)); // −1..1, 0 is level with the jetty
  const draw = () => mgPanel(`<div class="cpbar"><span>The Third <b>${g.mine}</b> of ${B6G_LOAD}</span><span>The next squad <b>${g.theirs}</b> of ${B6G_LOAD}</span><span>${g.doubles ? `Doubles left: <b>${g.doubles}</b>` : ''}</span></div>
      ${g.talk}${b6gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="jtDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' ? `<button class="btn primary" id="jtGo" data-bot="1">Go</button>${!g.rigged ? `<button class="btn" id="jtRig" data-bot="1">Rig the yard for two first</button>` : ''}`
        : `<button class="btn primary" id="jtSwing" data-bot="1">Swing it down</button>`}</div>
      <p class="fine">Swing the crate down when the longboat's gunwale is level with the jetty (or tap the boat). Too soon or too late and it goes in the sea, and the line has to come back. Eight crates. The next squad loads steadily.</p>
      <p class="hint keys"><kbd>Space</kbd> swing · <kbd>R</kbd> rig · <kbd>Esc</kbd> leave</p>`),
    bind = () => { if ($('#jtGo')) $('#jtGo').onclick = () => { AUDIO.play('click'); start(); }; if ($('#jtRig')) $('#jtRig').onclick = () => rig(); if ($('#jtSwing')) $('#jtSwing').onclick = swing; if ($('#jtDone')) $('#jtDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  /* the check: rig the yard (Wits 13). Made: three doubles. Yes, but: three doubles, and the first lift goes in the sea. */
  const rig = () => { if (g.rigged || g.phase !== 'intro') return; g.rigged = true; AUDIO.play('click');
    const r = g.check = b6gRoll('wits', 13, null, [['a sapper can rig anything to anything', 2, 'tangle'], ['she loaded water-skins on camels in Hissar, two by two', 1, 'haddat'], ['you have watched a lot of yards swung', 1, 'sgt']]);
    if (r.ok) { g.doubles = 3; g.talk = mgSay(r.who === 'sgt' ? '' : NAME(r.who), r.who === 'sgt' ? 'You lash a second sling to the yard-arm and test it with your weight. Two at a time, for a while.' : `${NAME(r.who)} lashes a second sling to the yard-arm, hauls on it, and nods. "Two at a time," ${b6gHe(r.who)} says. "For a while. Then it'll go."`); }
    else if (r.tier === 'near') { g.doubles = 3; g.wet = 1; g.splash = performance.now(); g.talk = mgSay('', `The second sling holds, mostly. The first test lift snaps a lashing and a crate goes in the sea between the jetty and the boat, and the next squad cheers. Two at a time from here, for a while. <span class="dim">(a crate lost)</span>`); }
    else g.talk = mgSay('', `${NAME(r.who)} tries a second sling on the yard, and it fouls, and has to come off again. One at a time, then, like everybody else.`);
    AUDIO.play(r.ok ? 'up' : 'miss'); redraw(); };
  const start = () => { if (g.phase !== 'intro') return; g.phase = 'race'; g.t0 = performance.now(); g.nextRival = g.t0 + pace(g.rivalGap + 600); g.talk = mgSay('The next squad\'s sergeant', '"Go," he shouts, and his squad is already swinging.'); redraw(); setTimeout(tick, 60); };
  const tick = () => { if (!on() || g.over || g.phase !== 'race') return; const now = performance.now();
    if (now >= g.nextRival) { g.theirs++; g.nextRival = now + pace(g.rivalGap * (.85 + hash(g.theirs, 9341)*.3)); if (g.theirs >= B6G_LOAD) return end(); draw(); bind(); }
    setTimeout(tick, 60); };
  const swing = () => { if (g.over || g.phase !== 'race') return; const now = performance.now(); if (now < g.lock) return; g.lifts++;
    if (Math.abs(lvl(now)) <= B6G_WIN) { const n = g.doubles > 0 ? 2 : 1; if (g.doubles > 0) g.doubles--; g.mine = Math.min(B6G_LOAD, g.mine + n); AUDIO.play('blunt');
      g.talk = mgSay('', n === 2 ? 'Two crates down into the boat at once, and the boatmen stow them.' : b6gPick(['A crate down, square on the thwarts.', 'In. The boatman pats it like a horse.', 'In, and stowed.'])); if (g.mine >= B6G_LOAD) return end(); }
    else { g.wet++; g.splash = now; g.lock = now + pace(650); AUDIO.play('miss'); g.talk = mgSay('', lvl(now) > 0 ? 'The boat was still coming up. The crate hits the gunwale and goes in the sea, and the line has to come back.' : 'The boat had dropped away. The crate goes into the gap and the sea, and the line has to come back.'); }
    draw(); bind(); };
  const end = () => { if (g.over) return; g.over = true; const W = g.mine >= B6G_LOAD; mgDeed(W ? 'b6JettyWon' : 'b6JettyLost'); AUDIO.play(W ? 'win' : 'lose');
    g.talk = mgSay('The next squad\'s sergeant', W ? '"Eight," he says, and spits in the sea. "Fine." He turns out a satchel and puts a clay sharper in your hands, carefully. "Don\'t drop it in the boat."' : '"Eight." He grins down the jetty at you. "Keep your sharper, Third. We\'ll want you to have it when we\'re all aboard."') +
      (g.wet ? mgSay('', `${numw(g.wet, true)} crate${g.wet === 1 ? '' : 's'} in the sea. The boatmen will be fishing for ${g.wet === 1 ? 'it' : 'them'} till dark.`) : '');
    redraw(); };
  MG.cv.onpointerdown = () => swing();
  /* the jetty: dusk over the Kokakal, the transports at anchor, the jetty's timbers, the longboat rising and falling, the yard and its sling */
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now(), mo = REDUCE() ? 0 : 1;
    b6gNight(ctx, W, H, t, {top:'#1a1426', mid:'#8a4a32', cut:.36, low:'#1a2430', stars:false});
    ctx.fillStyle = '#18222c'; ctx.fillRect(0, H*.36, W, H*.64);
    for (let i = 0; i < 9; i++) { const x = W*(.05 + i*.11), y = H*(.38 + (i % 2)*.015); ctx.fillStyle = '#0c1014'; ctx.fillRect(x - 6, y - 2, 12, 3); ctx.fillRect(x - .5, y - 12, 1, 10); glow(ctx, x, y - 4, 4, '#ffb060', .4); } // Nok's transports, far off
    const jy = H*.56; ctx.fillStyle = '#5a4630'; ctx.fillRect(0, jy - 8, W*.46, 10); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#3a2c1e'; ctx.fillRect(i*W*.08 + 4, jy, 6, H*.3); } // the jetty and its piles
    const amp = H*.08, L = g.phase === 'race' && !g.over ? lvl(now) : (mo ? Math.sin(t/240) : 0), by = jy + 2 - L*amp; // the longboat
    ctx.fillStyle = '#4a3220'; ctx.beginPath(); ctx.moveTo(W*.47, by - 6); ctx.lineTo(W*.9, by - 6); ctx.quadraticCurveTo(W*.88, by + 14, W*.8, by + 18); ctx.lineTo(W*.54, by + 18); ctx.quadraticCurveTo(W*.48, by + 14, W*.47, by - 6); ctx.fill();
    ctx.fillStyle = Math.abs(L) <= B6G_WIN && g.phase === 'race' ? '#9fe0b8' : '#7a5a3a'; ctx.fillRect(W*.47, by - 8, W*.43, 3); // the gunwale, lit when level
    for (let i = 0; i < Math.min(g.mine, 8); i++) { ctx.fillStyle = '#8a6a42'; ctx.fillRect(W*(.55 + (i % 4)*.075), by - 4 - Math.floor(i/4)*9, W*.06, 8); ctx.strokeStyle = '#3a2a18'; ctx.strokeRect(W*(.55 + (i % 4)*.075), by - 4 - Math.floor(i/4)*9, W*.06, 8); }
    ctx.strokeStyle = 'rgba(232,192,115,.5)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(W*.46, jy - 8); ctx.lineTo(W*.92, jy - 8); ctx.stroke(); ctx.setLineDash([]); // the jetty's line: level
    ctx.strokeStyle = '#2a2018'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(W*.38, jy - 8); ctx.lineTo(W*.38, H*.16); ctx.lineTo(W*.68, H*.2); ctx.stroke(); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(W*.68, H*.2); ctx.lineTo(W*.68, H*.34); ctx.stroke(); ctx.fillStyle = '#8a6a42'; ctx.fillRect(W*.68 - 9, H*.34, 18, 12); if (g.doubles) ctx.fillRect(W*.68 - 9, H*.34 + 13, 18, 12); // the yard and the crate on the sling
    if (now - g.splash < 600) { const k = (now - g.splash) / 600; ctx.fillStyle = `rgba(220,236,250,${.6*(1 - k)})`; for (let i = 0; i < 7; i++) ctx.fillRect(W*.5 + (i - 3)*8*k*3, jy + 20 - Math.sin(k*Math.PI)*24 + i % 2*4, 3, 3); }
    const rw = W*.3, rx = W*.06, ry = H*.1; ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(rx, ry, rw, 8); ctx.fillStyle = '#e08070'; ctx.fillRect(rx, ry, rw * g.theirs / B6G_LOAD, 8); b6gText(ctx, 'the next squad', rx, ry - 4, 11, 'rgba(232,192,115,.8)', 'left');
    const fs = clamp(H/110, 1.4, 2.8); ['sgt', ...(S.squad || []).filter(id => id !== 'sgt' && b6In(id)).slice(0, 2)].forEach((id, i) => drawFigure(ctx, id, W*(.12 + i*.1), jy - 12, fs, t, {still:g.phase !== 'race', dir:1, phase:i})); };
  mgKeys({' ':() => { const b = $('#jtDone') || $('#jtGo'); if (b) b.click(); else swing(); }, r:() => rig()});
  g.talk = mgSay('', `The engineers have run timber jetties out past the surf, and the 9th loads its own longboats for the transports. The next squad down is loading the boat on the other side of the jetty, and its sergeant has a clay sharper on the planking between the two piles of crates.`) +
    mgSay('The next squad\'s sergeant', '"Eight crates each, Third. First boat full takes the egg." He taps the sharper with his boot, gently. "Mind the swell. The boat comes up to meet you, then it doesn\'t."') +
    (b6In('tangle') ? mgSay('', 'Tangle looks at the sharper on the planking, and at the yard-arm, and starts unwinding cord from his wrist.') : '');
  redraw();
}
/* what the race leaves behind, once a book: the sharper */
function b6JettyPay(r){ if (!r) return; S.f.b6_jetty = {mine:r.mine, theirs:r.theirs, won:!!r.won, done:!!r.done};
  if (r.won && !S.f.b6_jettyPaid) { S.f.b6_jettyPaid = 1; S.inv.sharper = (S.inv.sharper || 0) + 1; note('+1 sharper: the next squad\'s wager, paid in clay.', 'good'); }
  save(); }

/* ============ 5. The Grey Helms' Signs ============
   On the transport's waist, at the cook's sandbox, the Grey Helms who came across from the Perish ships show the squad the signs their
   shield-line speaks in when the noise is too great for orders: Shield, Wolf, Close, Hold. A Grey Helm gives a run of signs; you give it
   back in order. Four runs, three signs to six. One wrong and the Grey Helm lowers his hands. Once a game you may ask for a run again,
   slower (Wits; Ottar, who signs it with you, with an edge): made, it is given again; "yes, but", given again, and a Grey Helm adds a sign
   to the end of it, because the Perish do not repeat themselves for nothing. Three runs or more given back pays once a book: Ottar's
   regard (+1) if he walks; else a jar of Perish salve with a wolf on the wax. Book Three's Hand-Talk for the shape. */
const B6G_SIGNS = [['Shield', 'a fist raised'], ['Wolf', 'two fingers hooked'], ['Close', 'the flat hand drawn in'], ['Hold', 'the open palm out']], B6G_RUNS = [3, 4, 5, 6];
function playSigns(opt = {}){
  let on = () => true; const pace = ms => ms * b6gSp();
  const g = MG.state = {run:0, seq:[], at:0, phase:'intro', show:-1, given:0, over:false, asked:false, check:null, talk:'', flash:null, err:false};
  const result = () => ({given:g.given, runs:B6G_RUNS.length, won:g.over && g.given >= 3, done:g.over, all:g.given >= B6G_RUNS.length});
  mgOpen({kick:'At sea · the transport\'s waist', title:'The Grey Helms\' Signs', leaveText:'Step back', done:r => opt.after && opt.after(r), leave:() => mgClose(Object.assign(result(), {left:true, done:false, won:false}))}); on = b6gOn();
  const draw = () => mgPanel(`<div class="cpbar"><span>${g.over ? 'The Grey Helm lowers his hands' : `Run ${g.run + 1} of ${B6G_RUNS.length}: ${g.seq.length || B6G_RUNS[g.run]} signs`}</span><span>Given back: <b>${g.given}</b></span><span>${g.phase === 'echo' ? `${g.at} of ${g.seq.length}` : ''}</span></div>
      ${g.talk}${b6gRollHTML(g.check)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="sgDone" data-bot="1">Back to the fire</button>`
        : g.phase === 'intro' || g.phase === 'between' ? `<button class="btn primary" id="sgGo" data-bot="1">${g.phase === 'intro' ? 'Watch his hands' : 'The next run'}</button>`
        : g.phase === 'show' ? `<button class="btn" disabled data-bot="1">Watching</button>`
        : B6G_SIGNS.map(([n], i) => `<button class="btn" data-sg="${i}" data-bot="1">${n}</button>`).join('') + (!g.asked ? `<button class="btn" id="sgAgain" data-bot="1">Ask for it again, slower (once)</button>` : '')}</div>
      <p class="fine">Watch the run of signs, then give it back in order: ${B6G_SIGNS.map(([n, w]) => `${n}, ${w}`).join('; ')}. One wrong and the run is over.</p>
      <p class="hint keys"><kbd>1</kbd>–<kbd>4</kbd> a sign · <kbd>Space</kbd> next · <kbd>A</kbd> again · <kbd>Esc</kbd> step back</p>`),
    bind = () => { document.querySelectorAll('#mgPanel [data-sg]').forEach(b => b.onclick = () => give(+b.dataset.sg)); if ($('#sgGo')) $('#sgGo').onclick = () => { AUDIO.play('click'); next(); }; if ($('#sgAgain')) $('#sgAgain').onclick = () => again(); if ($('#sgDone')) $('#sgDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const show = () => { g.phase = 'show'; g.show = -1; g.at = 0; redraw(); let i = 0;
    const step = () => { if (!on() || g.over) return; if (i >= g.seq.length) { g.show = -1; g.phase = 'echo'; g.talk = mgSay('', 'His hands go still. Your turn.'); redraw(); return; }
      g.show = g.seq[i]; AUDIO.play('click'); setTimeout(() => { if (!on()) return; g.show = -1; i++; setTimeout(step, pace(180)); }, pace(560)); };
    setTimeout(step, pace(400)); };
  const next = () => { if (g.over || (g.phase !== 'intro' && g.phase !== 'between')) return; g.seq = []; for (let i = 0; i < B6G_RUNS[g.run]; i++) g.seq.push(R(4)); g.check = null;
    g.talk = mgSay('A Grey Helm', b6gPick(['He raises his hands.', '"Watch."', 'He signs it at the speed of a line closing.'])); show(); };
  /* the check: ask for it again, slower (Wits 13). Made: shown again. Yes, but: shown again, one sign longer. */
  const again = () => { if (g.asked || g.phase !== 'echo' || g.over) return; g.asked = true; AUDIO.play('click');
    const r = g.check = b6gRoll('wits', 13, null, [['Ottar signs it with you, slowly', 2, 'ottar'], ['he learned a trade by watching hands', 1, 'mehet'], ['you have learned hand-talk before, from stranger people', 1, 'sgt']]);
    if (r.ok) { g.talk = mgSay('A Grey Helm', `${r.who === 'ottar' ? 'Ottar says something to him in their own tongue.' : 'You ask.'} He gives it again, slower, and the second time each sign is plain.`); show(); }
    else if (r.tier === 'near') { g.seq.push(R(4)); g.talk = mgSay('A Grey Helm', 'He gives it again, slower, and then adds one more sign on the end of it, and looks at you. The Perish do not repeat themselves for nothing. <span class="dim">(one sign longer)</span>'); show(); }
    else { g.talk = mgSay('A Grey Helm', 'He looks at you, and waits. The Perish say a thing once.'); redraw(); } };
  const give = i => { if (g.phase !== 'echo' || g.over) return; g.flash = {i, t:performance.now()};
    if (i !== g.seq[g.at]) { g.err = true; g.over = true; AUDIO.play('miss'); end(); return redraw(); }
    g.at++; AUDIO.play('click');
    if (g.at >= g.seq.length) { g.given++; g.run++; AUDIO.play('coin');
      if (g.run >= B6G_RUNS.length) { g.over = true; end(); }
      else { g.phase = 'between'; g.talk = mgSay('A Grey Helm', b6gPick(['He nods, once.', 'He touches his fist to his chest. Good, then.', '"Again," he says. "Longer."'])); } }
    redraw(); };
  const end = () => { const W = g.given >= 3; mgDeed(W ? 'b6SignsWon' : 'b6SignsLost'); if (g.given >= B6G_RUNS.length) mgDeed('b6SignsAll');
    g.talk = mgSay('A Grey Helm', g.err ? `He lowers his hands. ${g.given ? `${numw(g.given, true)} run${g.given === 1 ? '' : 's'} given back.` : 'None given back.'} ${W ? '"A line could stand beside you," he says, in careful Malazan.' : 'He says something in his own tongue to the others, not unkindly.'}` : '"The whole of it." He touches his fist to his chest, and then, after a moment, to yours. "The wolves would know you in a line."') +
      (b6In('ottar') ? mgSay('Ottar', W ? '"He says you have quick hands for a Malazan," Ottar says. "He means it as praise. Mostly."' : '"Tomorrow again," Ottar says. "It took me a year. I was nine."') : ''); };
  mgKeys({'1':() => give(0), '2':() => give(1), '3':() => give(2), '4':() => give(3), a:() => again(), ' ':() => { const b = $('#sgDone') || $('#sgGo'); b && b.click(); }});
  /* the deck: grey sea and sky, the fleet behind, the cook's sandbox, a Grey Helm signing; the sign drawn large over the waist */
  const sign = (ctx, x, y, s, k, lit) => { ctx.save(); ctx.translate(x, y); ctx.fillStyle = lit ? '#e8dcc4' : 'rgba(200,190,170,.45)'; ctx.strokeStyle = 'rgba(40,30,20,.6)'; ctx.lineWidth = 1;
    const palm = () => { ctx.beginPath(); ctx.ellipse(0, s*.15, s*.32, s*.36, 0, 0, 7); ctx.fill(); ctx.stroke(); };
    if (k === 0) { palm(); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(-s*.24 + i*s*.16, -s*.2, s*.08, s*.1, 0, 0, 7); ctx.fill(); ctx.stroke(); } } // Shield: a fist raised
    else if (k === 1) { palm(); [[-.12, -.55], [.08, -.55]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(a*s, -s*.1); ctx.quadraticCurveTo(a*s, b*s, (a + .12)*s, (b + .1)*s); ctx.lineWidth = s*.12; ctx.strokeStyle = lit ? '#e8dcc4' : 'rgba(200,190,170,.45)'; ctx.stroke(); }); } // Wolf: two fingers hooked
    else if (k === 2) { ctx.beginPath(); ctx.ellipse(0, 0, s*.5, s*.16, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.strokeStyle = lit ? '#e8c073' : 'rgba(232,192,115,.3)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s*.6, 0); ctx.lineTo(s*.25, 0); ctx.moveTo(s*.34, -s*.08); ctx.lineTo(s*.25, 0); ctx.lineTo(s*.34, s*.08); ctx.stroke(); } // Close: the flat hand drawn in
    else { palm(); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(-s*.24 + i*s*.16, -s*.36, s*.07, s*.2, 0, 0, 7); ctx.fill(); ctx.stroke(); } ctx.beginPath(); ctx.ellipse(s*.4, s*.05, s*.07, s*.16, -.7, 0, 7); ctx.fill(); ctx.stroke(); } // Hold: the open palm
    ctx.restore(); };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, mo = REDUCE() ? 0 : 1, roll = mo ? Math.sin(t/1400)*.02 : 0;
    b6gNight(ctx, W, H, t, {top:'#3a4048', mid:'#5a6068', cut:.4, low:'#22262a', stars:false});
    ctx.fillStyle = '#2a3238'; ctx.fillRect(0, H*(.4 + roll), W, H*.2); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#4a4e52'; const x = W*(.1 + i*.16), y = H*(.42 + roll); ctx.fillRect(x - 8, y, 16, 3); ctx.fillRect(x - .5, y - 14, 1, 14); poly(ctx, [[x, y - 14], [x + 7, y - 6], [x, y - 4]], '#7a7468'); } // the fleet behind, the grey ships among them
    ctx.save(); ctx.translate(W/2, H*.6); ctx.rotate(roll); ctx.fillStyle = '#4a3a2a'; ctx.fillRect(-W, 0, W*2, H); ctx.strokeStyle = 'rgba(0,0,0,.3)'; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-W, i*H*.07); ctx.lineTo(W, i*H*.07); ctx.stroke(); } ctx.restore(); // the deck
    ctx.fillStyle = '#7a6a4a'; ctx.fillRect(W*.06, H*.74, W*.14, H*.08); glow(ctx, W*.13, H*.74, H*.12, '#ff8a3a', .3); ctx.fillStyle = '#2a2420'; ctx.fillRect(W*.1, H*.68, W*.06, H*.06); // the cook's sandbox and its pot
    const fs = clamp(H/100, 1.5, 3); drawFigure(ctx, 'ottar', W*.84, H*.8, fs, t, {still:g.phase !== 'show', dir:-1}); if (b6In('ottar')) drawFigure(ctx, 'ottar', W*.3, H*.82, fs*.9, t, {still:true, dir:1, phase:2});
    const s = Math.min(W*.22, H*.34); sign(ctx, W*.55, H*.3, s, g.show >= 0 ? g.show : g.flash && performance.now() - g.flash.t < 300 ? g.flash.i : 0, g.show >= 0 || (g.flash && performance.now() - g.flash.t < 300));
    if (g.show >= 0) b6gText(ctx, B6G_SIGNS[g.show][0], W*.55, H*.3 + s*.7, Math.max(12, s*.14), '#f2d488');
    for (let i = 0; i < g.seq.length; i++) { const x = W*.55 + (i - (g.seq.length - 1)/2)*14, y = H*.06; ell(ctx, x, y, 4, 4, g.phase === 'echo' && i < g.at ? '#9fe0b8' : 'rgba(232,192,115,.4)'); } };
  g.talk = mgSay('', `At the cook's sandbox, when the work is done, the Grey Helms who came across from the Perish ships sit with the squad, and one of them shows the signs their shield-line speaks in when the noise is too great for orders. Shield. Wolf. Close. Hold. He gives them slowly once, and then not slowly.`) +
    (b6In('ottar') ? mgSay('Ottar', '"He will give a run," Ottar says. "You give it back. In a line, a wrong sign is a dead man. Here it is only that he stops."') : '');
  redraw();
}
/* what the signs leave behind, once a book: Ottar's regard, or a salve */
function b6SignsPay(r){ if (!r) return; S.f.b6_signs = {given:r.given, won:!!r.won, done:!!r.done, all:!!r.all};
  if (r.won && !S.f.b6_signsPaid) { S.f.b6_signsPaid = 1; if (b6In('ottar') && S.loy && S.loy.ottar != null) { S.f.b6_signsPaid = 'ottar'; loy('ottar', 1); }
    else { S.inv.salve = (S.inv.salve || 0) + 1; note('+1 salve: a jar of Perish salve with a wolf on the wax.', 'good'); } }
  save(); }

/* ---- the Deeds page: Book Six's fires, under Fever ---- */
{ const _de = b6DeedsExtra; b6DeedsExtra = function(mine){ const out = _de(mine), d = k => mine.reduce((a, {s}) => a + (((s.deeds || {})[k]) || 0), 0);
    const rows = [['Bones with the new draft', d('b6BonesWon') || d('b6BonesLost') ? `${d('b6BonesWon')} won, ${d('b6BonesLost')} lost` : 'Not yet'],
      ['Falari Tide', d('b6TideWon') ? 'Three tides to the Seventh' : d('b6TideLost') ? 'The sea\'s' : 'Not yet'],
      ['Who\'s Next', d('b6NextWon') ? 'The corporal owed you' : d('b6NextLost') ? 'Nobody gets it' : 'Not yet'],
      ['The Jetty Race', d('b6JettyWon') ? 'Eight crates first' : d('b6JettyLost') ? 'The next squad\'s boat' : 'Not yet'],
      ['The Grey Helms\' Signs', d('b6SignsAll') ? 'The whole of it' : d('b6SignsWon') ? 'A line could stand beside you' : d('b6SignsLost') ? 'He lowered his hands' : 'Not yet']];
    return out + `<h4 class="jh">At the fires</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }; }

/* ---- the chapters' fires: the games offered beside the squad's talk, and what they leave behind ---- */
{ const wrap = (CH, id, f) => { const _n = CH.dlg[id]; if (!_n) return; CH.dlg[id] = () => { const n = _n(); return f(n) || n; }; };
  const after = (n, t, ch) => { const i = n.ch.findIndex(c => typeof c.t === 'string' && new RegExp(t).test(c.t)); n.ch = n.ch.slice(); n.ch.splice(i < 0 ? n.ch.length - 1 : i + 1, 0, ...ch); return n; };
  /* Ch1: bones with the new draft, at the Third's fire */
  if (typeof B6CH1 !== 'undefined') { wrap(B6CH1, 'b6_c1_fire', n => after(n, '^Talk with the squad', [{t:'The new draft out of Aren has a pair of bones out on a blanket by the cook-fire. Sit in.', tag:'Bones', req:()=>!S.f.b6_bones && (S.silver || 0) >= 1, go:()=>playB6Bones({after:r => { b6BonesPay(r); S.f.b6_bonesLast = r; talk('b6_c1_bones_after'); }})}]));
    B6CH1.dlg.b6_c1_bones_after = () => { const r = S.f.b6_bonesLast || {}; return b6gAfter('The Third\'s fire', (S.f.b6_c1_ph || 1) >= 3 ? 'b6_ghatan_walls' : 'b6_odhan_night', 'b6_c1_fire', !r.games ?
`You leave the recruits' blanket before the first throw. They do not mind. They have each other, and a siege.` : (r.pay || 0) > 0 ?
`You come back to the Third's fire ${r.pay} silver heavier. ${b6In('sathi') ? 'Sathi looks at the silver with approval. "Taking it off recruits," she says. "That\'s their first lesson. You\'re a good teacher, Sergeant."' : 'Behind you the recruits are already throwing again, louder, and arguing about Aren rules.'}` : (r.pay || 0) < 0 ?
`You come back to the Third's fire ${-r.pay} silver lighter. ${b6In('tangle') ? 'Tangle tells you how many times you threw past twelve before you banked. You did not ask.' : 'The recruits will write home about it. Most of them can write.'}` :
`You come back to the Third's fire with exactly what you sat down with, which the recruit seemed to take personally.`); };
    const j = B6CH1.journal; if (j) B6CH1.journal = () => { const x = j(), r = S.f.b6_bonesLast; if (r && r.games) x.unshift((r.pay || 0) > 0 ? 'The new draft out of Aren had bones on a blanket by the 9th\'s fire. The sergeant sat in, and came out ahead.' : 'The new draft out of Aren had bones on a blanket by the 9th\'s fire. The sergeant sat in.'); return x; }; }
  /* Ch2: Falari Tide with Sweetcreek's Falari, at the fire above the sea */
  if (typeof B6CH2 !== 'undefined') { wrap(B6CH2, 'b6_c2_fire', n => after(n, '^Talk with the squad', [{t:'Down the slope Sweetcreek\'s Falari have three dice and a tide-table scratched on a plank. Sit in.', tag:'Falari Tide', req:()=>(S.f.b6_c2_ph || 1) === 1 && !(S.f.b6_tide && S.f.b6_tide.done), go:()=>playTide({after:r => { b6TidePay(r); S.f.b6_tideLast = r; talk('b6_c2_tide_after'); }})}]));
    B6CH2.dlg.b6_c2_tide_after = () => { const r = S.f.b6_tideLast || {}; return b6gAfter('The Fourth\'s fire above the sea', 'b6_coast', 'b6_c2_fire', !r.done ?
`You leave the Falari dice before the tide turns. The corporal does not mind. There are a great many Falari, and all of them want a game.` : r.won ?
`You come back up the slope with three tides to the Seventh scratched on a Falari plank. ${S.f.b6_tidePaid === 'brannoc' ? 'Brannoc walks back beside you, singing, badly, a song about it that he is making up as he goes. "Sweetcreek will not believe it," he says. He sounds as if he will tell her anyway.' : 'The corporal sends a pot of seal fat up after you, "for the rain". The Falari lose generously.'}` :
`You come back up the slope with the sea's three tides to your one${r.mine === 2 ? ' or two' : ''}. ${b6In('brannoc') ? 'Brannoc claps you on the shoulder. "Nobody beats him," he says. "He cheats with his face. I told you."' : 'Down the slope the Falari are singing about it already.'}`); };
    const j = B6CH2.journal; if (j) B6CH2.journal = () => { const x = j(), r = S.f.b6_tideLast; if (r && r.done) x.unshift(r.won ? 'Above the sea the sergeant played the Falari at Tide, three dice against a corporal of Sweetcreek\'s, and took three tides.' : 'Above the sea the sergeant played the Falari at Tide, three dice against a corporal of Sweetcreek\'s. The sea took it.'); return x; }; }
  /* Ch4: Who's Next, under the Seventh's canvas before G'danisban */
  if (typeof B6CH4 !== 'undefined') { wrap(B6CH4, 'b6_c4_fire', n => after(n, '^Talk with the squad', [{t:'Under the canvas the Seventh\'s corporal is chalking up the board for tonight\'s details. WHO\'S NEXT, it says across the top.', tag:'Who\'s Next', req:()=>(S.f.b6_c4_ph || 1) === 1 && !(S.f.b6_next && S.f.b6_next.done), go:()=>playWhosNext({after:r => { b6NextPay(r); S.f.b6_nextLast = r; talk('b6_c4_next_after'); }})}]));
    B6CH4.dlg.b6_c4_next_after = () => { const r = S.f.b6_nextLast || {}, cured = S.f.b6_nextPaid && S.f.b6_nextPaid !== 1 ? S.f.b6_nextPaid : null; return b6gAfter('The Fourth\'s fire', 'b6_gdanisban_rain', 'b6_c4_fire', !r.done ?
`You leave the board before the last stone. The corporal does not mind. He will chalk it up again tomorrow, and the day after.` : r.won ?
`${numw(r.right, true)} of three, and the corporal owes you. ${cured ? `Before the next bell he comes back across the duckboards with a cup of something bitter out of the surgeons' tent, and gives it to ${cured === 'sgt' ? 'you' : NAME(cured)}, and does not stay to be thanked. By morning the fever has broken.` : 'He pays it the next morning with a salve out of somebody\'s kit, and does not say whose.'}${r.fourth ? ' The Fourth drew a detail anyway. The Fourth always does.' : ''}` :
`${numw(r.right, true)} of three. The corporal wipes the board with his sleeve. ${b6In('kettle') ? 'Kettle tells you the odds of every draw, after. You did not ask.' : 'Under the canvas, for a while, nobody talks about anything but the board.'}${r.fourth ? ' And the Fourth drew a detail, which nobody needed a board to predict.' : ''}`); };
    const j = B6CH4.journal; if (j) B6CH4.journal = () => { const x = j(), r = S.f.b6_nextLast; if (r && r.done) x.unshift(r.won ? 'Before G\'danisban the Seventh played Who\'s Next for the night\'s details under the canvas. The sergeant called two of three.' : 'Before G\'danisban the Seventh played Who\'s Next for the night\'s details under the canvas.'); return x; }; }
  /* Ch5: the Jetty Race, from the Third's fire in the dunes */
  if (typeof B6CH5 !== 'undefined') { wrap(B6CH5, 'b6_c5_fire', n => after(n, '^Talk with the squad', [{t:'Down on the jetty the next squad\'s sergeant has a clay sharper on the planking and a wager about loading boats.', tag:'The Jetty Race', req:()=>!S.f.b6_c5_survivors && !(S.f.b6_jetty && S.f.b6_jetty.done), go:()=>playJetty({after:r => { b6JettyPay(r); S.f.b6_jettyLast = r; talk('b6_c5_jetty_after'); }})}]));
    B6CH5.dlg.b6_c5_jetty_after = () => { const r = S.f.b6_jettyLast || {}; return b6gAfter('The Third\'s fire', 'b6_kokakal', 'b6_c5_fire', !r.done ?
`You leave the jetty before the boat is full. The next squad's sergeant does not mind. He loads his anyway.` : r.won ?
`You come back up the dunes to the fire with a clay sharper held in both hands, carefully. ${b6In('tangle') ? 'Tangle takes it off you, turns it over, and puts it in the satchel. "Theirs was better packed than ours," he says, and counts the satchel again.' : 'The next squad\'s boat is still half full on the other side of the jetty.'}` :
`You come back up the dunes with nothing, and the next squad's boat full. ${b6In('haddat') ? 'Haddat says the sea moves too much to load from. She would like a word with whoever is in charge of it.' : 'The boatmen are still fishing for crates.'}`); };
    const j = B6CH5.journal; if (j) B6CH5.journal = () => { const x = j(), r = S.f.b6_jettyLast; if (r && r.done) x.unshift(r.won ? 'On the Kokakal shore the Third raced the next squad to load a longboat, and won the next squad\'s sharper.' : 'On the Kokakal shore the Third raced the next squad to load a longboat, and lost.'); return x; }; }
  /* Ch7: the Grey Helms' signs, at the cook's sandbox at sea */
  if (typeof B6CH7 !== 'undefined') { wrap(B6CH7, 'b6_c7_fire', n => after(n, '^Talk with the squad', [{t:'The Grey Helms are showing their shield-line\'s hand-signs at the sandbox. Watch their hands.', tag:'The Grey Helms\' Signs', req:()=>!!S.f.b6_c7_perish && (S.f.b6_c7_ph || 1) >= 2 && (S.f.b6_c7_ph || 1) < 4 && !(S.f.b6_signs && S.f.b6_signs.done), go:()=>playSigns({after:r => { b6SignsPay(r); S.f.b6_signsLast = r; talk('b6_c7_signs_after'); }})}]));
    B6CH7.dlg.b6_c7_signs_after = () => { const r = S.f.b6_signsLast || {}; return b6gAfter('The cook\'s sandbox', 'b6_sea', 'b6_c7_fire', !r.done ?
`You step back from the Grey Helms before the last run. They do not mind. They go on signing to each other, quickly, about something.` : r.won ?
`${numw(r.given, true)} run${r.given === 1 ? '' : 's'} given back${r.all ? ', the whole of it' : ''}. ${S.f.b6_signsPaid === 'ottar' ? 'Ottar sits down by you at the sandbox afterwards, and makes the sign for Hold, small, on his knee, where only you can see it. Then he goes back to sharpening his shield-rim.' : 'Before the evening is out a Grey Helm comes along the deck and puts a jar of salve in your hand, with a wolf pressed into the wax, and goes away again.'}` :
`${r.given ? `${numw(r.given, true)} run${r.given === 1 ? '' : 's'} given back` : 'None given back'}, and then a wrong sign. ${b6In('ottar') ? '"Tomorrow," Ottar says. "And the day after. It is a long way to Malaz."' : 'The Grey Helms go back to their own end of the deck.'}`); };
    const j = B6CH7.journal; if (j) B6CH7.journal = () => { const x = j(), r = S.f.b6_signsLast; if (r && r.done) x.unshift(r.won ? 'At sea the Grey Helms showed the squad the signs their shield-line speaks in, and the sergeant gave them back.' : 'At sea the Grey Helms showed the squad the signs their shield-line speaks in.'); return x; }; }
}
