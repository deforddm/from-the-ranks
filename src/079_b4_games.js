/* ============ Book Four: the games at the fires (v7.0) ============ */
/* Five games for the road to Raraku, one at each chapter's fire, each played for what the book cares about: silver in Aren, the
   Khundryl's regard, the raw company's Nerve, munitions, and the Wickans' regard.
   - Shells (Ch1, the barracks yard): an Aren man's pea and three shells, and the recruits' pay on his blanket. Darrut or Haddat may
     catch the palm.
   - The Burned Tears' cup (Ch3, the feast): a horn round the fire, drunk level, and a boast after it that the Khundryl must believe.
   - The hand game (Ch4, the Seti fire): which hand holds the marked bone, against the wounded's archers, for tally sticks.
   - The Fuse (Ch5, the Wall's fire): a length of cord cut to a called count against the company's sapper, in the blown sand.
   - The feather (Ch6, the picket): a crow feather snatched off a stake at the gallop with Temul's youths.
   They use the tables' frame (36: mgOpen, mgPanel, mgKeys, MG.anim), keep their deeds on S.deeds, pay once a book as the table closes,
   and wrap the chapters' fire nodes from here, so the chapter files are untouched. */

/* ---- the frame: a sky for the desert, a fire, the games' own timers, and a check inside a game ---- */
const b4gSky = (ctx, W, H, t, o = {}) => { const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, o.dusk ? '#4a3026' : '#070910'); g.addColorStop(.55, o.dusk ? '#7a5034' : '#16121a'); g.addColorStop(1, o.dusk ? '#3a2818' : '#1e170e'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (!o.dusk && !o.dust) { ctx.fillStyle = 'rgba(225,220,240,.5)'; for (let i = 0; i < 44; i++) ctx.fillRect(hash(i, 81)*W, hash(i, 82)*H*.42, 1, 1); }
  if (o.dust) { ctx.fillStyle = `rgba(196,150,96,${.06 + .05*o.dust})`; ctx.fillRect(0, 0, W, H); ctx.fillStyle = 'rgba(214,176,120,.16)';
    for (let i = 0; i < 26 + 10*o.dust; i++) { const x = ((hash(i, 83)*W + t*(.12 + hash(i, 84)*.2)) % (W + 40)) - 20; ctx.fillRect(x, hash(i, 85)*H, 8 + hash(i, 86)*22, 1); } } };
const b4gFire = (ctx, x, y, s, t) => { glow(ctx, x, y, s*4, '#e8923a', .22 + Math.sin(t/140)*.04); ctx.fillStyle = '#2a1a10'; ctx.fillRect(x - s*1.1, y, s*2.2, s*.3);
  for (let i = 0; i < 3; i++) { const h = s*(1.1 + .4*Math.sin(t/(90 + i*30) + i)); ctx.fillStyle = ['#e8783a', '#f0a848', '#ffe0a0'][i]; ctx.beginPath(); ctx.moveTo(x - s*(.7 - i*.2), y); ctx.quadraticCurveTo(x, y - h*(1.3 - i*.25), x + s*(.7 - i*.2), y); ctx.closePath(); ctx.fill(); } };
const b4gText = (ctx, s, x, y, sz, col = 'rgba(232,192,115,.9)', al = 'center') => { ctx.fillStyle = col; ctx.font = `600 ${Math.round(sz)}px 'Alegreya Sans SC', sans-serif`; ctx.textAlign = al; ctx.fillText(s, x, y); };
const b4gOn = () => { const id = MG.gid; return () => MG.gid === id && mgOpenNow(); }; // a game's own timers stop when it closes (58b sets MG.gid)
const b4gPace = ms => (REDUCE() ? ms * .5 : ms) * Math.max(.4, SET.speed || 1);
const b4gPick = a => a[R(a.length)];
/* a check inside a game: the roller, the scene's edges, the tiers (16). The game reads the tier and pays its own "yes, but". */
function b4gRoll(stat, dc, who, edges){ const c = {check:[stat, dc, who], edges:id => (edges || []).filter(e => !e[2] || e[2] === id)};
  const r = check(stat, dc, who || roller(stat, null, c), c);
  S.lastRoll = {who:r.who, stat, tier:r.tier, ok:r.ok, pass:r.pass, margin:r.margin, nat:r.nat}; tally(r.pass ? 'checksOk' : 'checksFail'); if (r.tier === 'near') tally('checksNear'); if (r.tier === 'clean' || r.tier === 'crit') tally('checksClean');
  r.line = `${NAME(r.who)} · ${STATN[stat]}${SET.dice ? ` ${r.nat} ${r.mod >= 0 ? '+' : '−'} ${Math.abs(r.mod)} against ${r.dc}` : ''} · ${TIERW[r.tier]}`; return r; }
const b4gRollHTML = r => r ? `<p class="fine">${esc(r.line)}</p>` : '';
const b4gMates = () => SQUAD().filter(id => id !== 'sgt');

/* ============ 1. Shells ============
   An Aren man with a blanket, three walnut shells and a dried pea, and most of a hundred recruits' first pay in front of him. He shows
   the pea, he moves the shells, you put your finger on one. On the big stake he does not always leave the pea under anything at all;
   an Aren man in the squad, or a Hissari who has walked a market, may see it go into his hand. Silver, capped at 15 a book. */
const B4G_SHELLCAP = 15;
function b4ShellSpotter(){ return b4In('darrut') ? 'darrut' : b4In('haddat') ? 'haddat' : null; }
function playShells(opt = {}){
  let on = () => true; const spotter = b4ShellSpotter();
  const g = MG.state = {phase:'stake', stake:0, slot:[0, 1, 2], pea:R(3), palmed:false, swaps:[], sw:null, lift:-1, liftT:0, flick:0, spot:'', roll:null, over:false, talk:'', net:0, won:0, lost:0, called:0, folded:false, rounds:0};
  const capLeft = () => Math.max(0, B4G_SHELLCAP - (S.f.b4_shellsNet || 0));
  const result = () => ({rounds:g.rounds, net:g.net, won:g.won, lost:g.lost, called:g.called, folded:g.folded});
  mgOpen({kick:'The barracks yard · an Aren man\'s blanket', title:'Shells', leaveText:'Get up off the blanket', done:r => opt.after && opt.after(r), leave:() => mgClose(result())}); on = b4gOn();
  const draw = () => { const p = g.phase, can = n => S.silver >= n && !g.folded && capLeft() > 0;
    mgPanel(`<div class="cpbar"><span>Round ${g.rounds + (p === 'stake' ? 1 : 0)}</span><span>Purse: <b>${S.silver}</b> silver</span><span>${g.stake ? `Stake: <b>${g.stake}</b>` : 'No stake down'}</span></div>
      ${g.talk}${b4gRollHTML(g.roll)}
      <div class="row mgbtns">${p === 'stake' ? (g.folded || capLeft() <= 0 || S.silver < 1 ? `<button class="btn primary" id="shDone" data-bot="1">Back to the fire</button>`
          : [1, 2, 3].map(n => `<button class="btn ${n === 1 ? 'primary' : ''}" data-st="${n}" ${can(n) ? '' : 'disabled'}>${n} silver${n === 3 ? ' (the big stake)' : ''}</button>`).join('') + (g.rounds ? `<button class="btn" id="shDone" data-bot="1">Enough</button>` : ''))
        : p === 'pick' ? `<button class="btn" id="shCall" data-bot="1">Call the palm</button>` : `<span class="fine">${p === 'show' ? 'He shows you the pea.' : p === 'shuffle' ? 'Watch the shells.' : ''}</span>`}</div>
      <p class="fine">Put a stake down, watch the pea go under a shell, follow the shell, and tap the one it is under. A win pays the stake. If you think the pea is not under any of them, call the palm: right, and he pays double; wrong, and you lose the stake.</p>
      <p class="hint keys"><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> a stake, then a shell · <kbd>C</kbd> call the palm · <kbd>Esc</kbd> get up</p>`);
    document.querySelectorAll('#mgPanel [data-st]').forEach(b => b.onclick = () => { AUDIO.play('click'); stake(+b.dataset.st); });
    if ($('#shCall')) $('#shCall').onclick = () => { AUDIO.play('click'); call(); };
    if ($('#shDone')) $('#shDone').onclick = () => { AUDIO.play('click'); g.over = true; mgClose(result()); }; };
  const pay = n => { const k = Math.min(n, capLeft()); S.silver += k; S.f.b4_shellsNet = (S.f.b4_shellsNet || 0) + k; g.net += k; updSilver(); return k; };
  const lose = n => { S.silver = Math.max(0, S.silver - n); S.f.b4_shellsNet = (S.f.b4_shellsNet || 0) - n; g.net -= n; updSilver(); };
  const stake = n => { if (g.phase !== 'stake' || g.folded || S.silver < n || capLeft() <= 0) return; g.stake = n; g.rounds++; g.roll = null; g.lift2 = -1; g.spot = ''; g.palmed = false; g.pea = R(3); g.slot = [0, 1, 2];
    g.phase = 'show'; g.lift = g.pea; g.liftT = performance.now(); AUDIO.play('coin');
    g.talk = mgSay('The Aren man', n === 3 ? b4gPick(['"Three. A sergeant who means it." He lifts the shell to show you the pea, and smiles at the recruits as if you were his friend.', '"The big stake. Good, good." The pea, under the middle shell, for you to see. "Keep your eye on it. Everyone says that. Not one of them does."']) : b4gPick(['"There. The pea. You see it?" He lifts the shell with one finger. "Now you do."', '"A careful soldier." The pea shows under the shell. "Careful soldiers lose slower."', '"Watch my hands." He holds them up. Then he does something with them.']));
    draw(); setTimeout(() => { if (!on()) return; g.lift = -1; shuffle(); }, b4gPace(1000)); };
  const shuffle = () => { g.phase = 'shuffle'; const n = Math.min(9, 4 + g.rounds + (g.stake === 3 ? 1 : 0)), d = Math.max(240, 430 - g.rounds * 22 - (g.stake === 3 ? 40 : 0)); g.swaps = [];
    for (let i = 0; i < n; i++) { const a = R(3); let b = R(2); if (b >= a) b++; g.swaps.push({a, b, d}); }
    if (g.stake === 3 && Math.random() < .7) { g.palmed = true; g.palmAt = R(n); }
    draw(); let i = 0;
    const step = () => { if (!on()) return; if (i >= g.swaps.length) { g.sw = null; return ready(); } const s = g.swaps[i]; g.sw = Object.assign({t0:performance.now(), d:b4gPace(s.d)}, s); AUDIO.play('pick');
      if (g.palmed && i === g.palmAt) g.flick = performance.now(); i++;
      setTimeout(() => { if (!on()) return; const sa = g.slot.indexOf(s.a), sb = g.slot.indexOf(s.b); g.slot[sa] = s.b; g.slot[sb] = s.a; step(); }, b4gPace(s.d)); };
    step(); };
  const ready = () => { g.phase = 'pick';
    if (g.palmed && spotter) { const r = g.roll = b4gRoll('wits', 13, spotter, [['an Aren man: he grew up on this game', 2, 'darrut'], ['the markets of Hissar', 1, 'haddat']]);
      if (r.ok) { g.spot = 'told'; g.talk = mgSay(NAME(spotter), spotter === 'darrut' ? '"Left hand," Darrut says, without moving his lips. "It went into his left hand on the turn. It isn\'t under anything, Sergeant."' : '"He has it in his hand," Haddat says, very quietly, in Hissari, and then in Malazan for you. "The left. In Hissar they cut that hand off."'); }
      else if (r.tier === 'near') { g.spot = 'loud'; g.talk = mgSay(NAME(spotter), spotter === 'darrut' ? '"Palm," Darrut says, louder than he meant to. The Aren man hears it. His smile stays where it is, and the rest of his face goes away from it.' : '"It is in his hand," Haddat says, and says it in Hissari, which the Aren man speaks. He looks at her. He keeps smiling.'); }
      else g.talk = mgSay('', `${NAME(spotter)} watches the hands, and frowns, and has nothing to tell you.`); }
    else g.talk = mgSay('The Aren man', b4gPick(['"Well?"', '"Take your time. The army can wait."', '"Any one you like."', '"The recruits all chose the left. Just so you know."']));
    draw(); };
  const reveal = (shell, win, pd, line) => { g.lift = shell; g.liftT = performance.now(); g.phase = 'reveal';
    if (win) { const k = pay(pd); g.won++; mgDeed('b4ShellsWon'); AUDIO.play('win'); g.talk = mgSay('', line(k)); } else { lose(g.stake); g.lost++; mgDeed('b4ShellsLost'); AUDIO.play('lose'); g.talk = mgSay('', line(0)); }
    draw(); setTimeout(() => { if (!on()) return; g.lift = -1; g.stake = 0; g.phase = 'stake';
      if (capLeft() <= 0) { g.folded = true; g.talk += mgSay('The Aren man', '"No. No more. You have had the yard\'s pay back off me and some of mine." He rolls the blanket up with the shells inside it. "Go and be lucky at somebody else."'); }
      else if (g.folded) g.talk += mgSay('', 'The Aren man rolls up his blanket, shells and all, and is gone into the next yard before anyone can ask him to stay.');
      draw(); }, b4gPace(1300)); };
  const pick = pos => { if (g.phase !== 'pick' || pos < 0 || pos > 2) return; const shell = g.slot.indexOf(pos);
    if (g.palmed) { g.lift2 = g.slot.indexOf((pos + 1 + R(2)) % 3); return reveal(shell, false, 0, () => `Nothing under it. He lifts another with the same finger, and there is the pea, where it must have been all along, and he takes your ${g.stake}.${g.spot === 'told' ? ' You were told. You did not listen.' : ''}`); }
    const hit = shell === g.pea; reveal(shell, hit, g.stake, k => hit ? (k ? `The pea. He pays you ${k} without a flicker, which is the most frightening thing he has done. The recruits make a noise.` : 'The pea. He does not pay: you have had all he means to give.') : `Empty. He lifts the next one along, and there is the pea, and the ${g.stake} is his.`); };
  const call = () => { if (g.phase !== 'pick') return; g.called++; mgDeed('b4ShellsCall');
    if (g.palmed) { mgDeed('b4ShellsPalm'); S.f.b4_shellsCaught = 1; if (g.spot === 'loud') g.folded = true;
      reveal(-1, true, g.stake * 2, k => `You put your hand flat on the blanket. "Under none of them." He lifts all three, slowly, and there is nothing under any, and a hundred recruits see it. ${k ? `He pays ${k}. ` : ''}${g.spot === 'loud' ? 'Then he pays, and the game is over: he knows who told you.' : 'He laughs, which is worse for him than not.'}`); }
    else { const shell = g.pea; reveal(shell, false, 0, () => `"Under none of them," you say. He lifts the shell on the ${['left', 'middle', 'right'][g.slot[shell]]}. There is the pea. The ${g.stake} is his, and the recruits are on his side again.`); } };
  const geo = () => { const W = MG.W, H = MG.H, s = Math.min(W * .2, H * .24); return {W, H, s, y:H * .72, x:pos => W * (.5 + (pos - 1) * .26)}; };
  MG.cv.onpointerdown = e => { const r = MG.cv.getBoundingClientRect(), {s, y, x} = geo(), px = e.clientX - r.left, py = e.clientY - r.top; if (g.phase !== 'pick' || Math.abs(py - y) > s) return; for (let p = 0; p < 3; p++) if (Math.abs(px - x(p)) < s * .75) return pick(p); };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const {W, H, s, y, x} = geo(), now = performance.now();
    b4gSky(ctx, W, H, t); ctx.fillStyle = '#3a342c'; ctx.fillRect(0, H * .46, W, H); ctx.strokeStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(0, H * (.5 + i * .06)); ctx.lineTo(W, H * (.5 + i * .06)); ctx.stroke(); } // the flags of the yard
    glow(ctx, W * .88, H * .3, W * .3, '#e8b060', .18); ctx.fillStyle = '#e8c073'; ctx.fillRect(W * .88 - 3, H * .26, 6, 9); // the lantern
    const fs = clamp(H / 120, 1.5, 2.8); drawFigure(ctx, 'b4_c1_recruit', W * .1, H * .56, fs, t, {still:true, dir:1}); drawFigure(ctx, 'b4_c1_recruit', W * .9, H * .56, fs, t, {still:true, dir:-1, phase:2});
    drawFigure(ctx, 'hissari_m', W * .5, H * .5, fs * 1.1, t, {still:true});
    ctx.fillStyle = '#5a2a1e'; ctx.beginPath(); ctx.moveTo(W * .12, H * .96); ctx.lineTo(W * .88, H * .96); ctx.lineTo(W * .78, H * .56); ctx.lineTo(W * .22, H * .56); ctx.closePath(); ctx.fill(); // the blanket
    ctx.strokeStyle = 'rgba(232,192,115,.35)'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = 'rgba(232,192,115,.2)'; for (let i = 0; i < 8; i++) ctx.fillRect(W * (.27 + i * .065), H * .6, 3, 3);
    if (now - g.flick < b4gPace(140)) { ctx.fillStyle = '#efe6c8'; ctx.beginPath(); ctx.arc(W * .43, H * .5, 2.4, 0, 7); ctx.fill(); } // the pea, for a blink, going into the left hand
    // where each shell sits now, with the one moving
    const at = shell => { const p = g.slot[shell]; if (!g.sw) return {x:x(p), y}; const k = clamp((now - g.sw.t0) / g.sw.d, 0, 1), e = k * k * (3 - 2 * k);
      if (shell === g.sw.a || shell === g.sw.b) { const from = shell === g.sw.a ? g.slot[g.sw.a] : g.slot[g.sw.b], to = shell === g.sw.a ? g.slot[g.sw.b] : g.slot[g.sw.a], dir = shell === g.sw.a ? 1 : -1; return {x:x(from) + (x(to) - x(from)) * e, y:y + Math.sin(e * Math.PI) * s * .35 * dir}; }
      return {x:x(p), y}; };
    // the pea where it lies (shown when its shell is up)
    for (let sh = 0; sh < 3; sh++) { const q = at(sh), up = (g.lift === sh || g.lift2 === sh && g.phase === 'reveal') ? clamp((now - g.liftT) / 220, 0, 1) : (g.phase === 'reveal' && g.lift === -1 ? clamp((now - g.liftT) / 220, 0, 1) : 0);
      if ((sh === g.pea && !g.palmed || g.palmed && sh === g.lift2 && g.phase === 'reveal') && up > .3) { ctx.fillStyle = '#efe6c8'; ctx.beginPath(); ctx.arc(q.x, q.y + s * .18, s * .09, 0, 7); ctx.fill(); }
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(q.x, q.y + s * .26, s * .42, s * .1, 0, 0, 7); ctx.fill();
      ctx.save(); ctx.translate(q.x, q.y - up * s * .55); const gr = ctx.createLinearGradient(-s * .4, -s * .3, s * .4, s * .3); gr.addColorStop(0, '#9a7448'); gr.addColorStop(1, '#3e2a16'); ctx.fillStyle = gr;
      ctx.beginPath(); ctx.ellipse(0, s * .22, s * .4, s * .46, 0, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(30,18,8,.7)'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.strokeStyle = 'rgba(30,18,8,.45)'; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * s * .12, s * .2); ctx.quadraticCurveTo(i * s * .08, -s * .1, 0, -s * .22); ctx.stroke(); } ctx.restore();
      if (g.phase === 'pick') { ctx.strokeStyle = 'rgba(232,192,115,.4)'; ctx.setLineDash([4, 4]); ctx.strokeRect(q.x - s * .5, q.y - s * .35, s, s * .7); ctx.setLineDash([]); b4gText(ctx, String(g.slot[sh] + 1), q.x, q.y + s * .55, 12, 'rgba(232,192,115,.6)'); } }
  };
  mgKeys({'1':() => g.phase === 'stake' ? stake(1) : pick(0), '2':() => g.phase === 'stake' ? stake(2) : pick(1), '3':() => g.phase === 'stake' ? stake(3) : pick(2), c:() => call(), ' ':() => { const b = $('#mgPanel [data-st="1"]:not([disabled])') || $('#shDone'); if (g.phase === 'stake' && b) b.click(); }});
  g.talk = mgSay('', `A man of Aren with a blanket on the flags, three walnut shells and a dried pea, and a ring of the 9th's recruits round him with their first pay going into his hat a copper at a time. He has a smile for every one of them. He has a better one for a sergeant.`) +
    mgSay('The Aren man', `"Sit, sit. One silver, two, three. The pea under a shell, and you tell me which. Honest game. Ask anyone."`) +
    (spotter === 'darrut' ? mgSay('', 'Darrut has come to stand behind you with his arms folded. He grew up four streets from here. He keeps his opinions to himself, for now.') : spotter === 'haddat' ? mgSay('', 'Haddat has come to stand behind you. She has walked the markets of Hissar. She watches the man\'s hands and not the shells.') : '');
  draw();
}

/* ============ 2. The Burned Tears' cup ============
   A horn of the milk-spirit comes round the fire. Drink it level (stop the sway inside the band) or spill it down your front; then a
   boast, and the Khundryl decide whether to believe it. Plain is safe; bold wants a steady hand; tall wants a straight face (Guile,
   Orvas vouching). Four horns. Regard of 6 and the cup is the Third's. */
const B4G_BOASTS = {
  plain:[{t:'That the Third has eaten worse than this and lived.'}, {t:'That your squad has never lost a cart, which is true, because it has never been given one.'}, {t:'That you can sit a horse. For a while.'}, {t:'That the 9th\'s Second Company is the best company in the 9th, which the 9th will dispute.'}],
  bold:[{t:'That Tangle can blow a ford clear with one sharper and a prayer.', req:()=>b4In('tangle')}, {t:'That Marrow has closed wounds that a Denul priest in Nap would have buried.', req:()=>b4In('marrow')}, {t:'That Hessa once held a temple door for a whole night, alone, against a riot.', req:()=>b4In('hessa')},
    {t:'That Tebbet can hit a crow on a fencepost at two hundred paces, and has, and the crow knows.', req:()=>b4In('tebbet')}, {t:'That the Third walked into Aren and has walked out of it again, which is more than Aren managed.'}, {t:'That you once crossed a river in flood holding a mule by the ears.'}],
  tall:[{t:'That you once outdrank a Barghast, and the Barghast admitted it.'}, {t:'That a Wickan horse once followed you home and would not leave.'}, {t:'That the Adjunct knows your name.'}, {t:'That you have a brother in every legion, and they all owe you money.'}]};
const B4G_KHUNDRYL = ['A rider with the black tears down both cheeks says he once rode his horse into a river and out the other side without getting its knees wet, and the horse remembers it better than he does.',
  'A woman of the Burned Tears says she has twelve horses, and names them, and the fire counts along with her, and it comes to fourteen.',
  'An old rider says his grandfather broke a Semk wall with his forehead. His friends say it was a small wall. He says it was a Semk wall.',
  'A young rider stands without a word, and drinks his horn upside down, and sits. The fire roars for him.',
  'A rider with grey in his braids says he has wept so much this year that the Khundryl will have to find a new word for it. The fire does not laugh at that one. It drinks.'];
function playCup(opt = {}){
  let on = () => true; const orv = b4In('orvas'), HORNS = 4, GOAL = 6;
  const g = MG.state = {horn:0, drunk:0, regard:0, phase:'intro', sw0:0, spilt:false, boasts:[], roll:null, over:false, talk:'', told:[], cleanHorns:0};
  const result = () => ({regard:g.regard, horns:g.horn, done:g.over && g.horn >= HORNS, won:g.over && g.horn >= HORNS && g.regard >= GOAL});
  mgOpen({kick:'The Khundryl feast · the next fire over', title:'The Burned Tears\' cup', leaveText:'Hand the horn on', done:r => opt.after && opt.after(r), leave:() => { g.over = true; mgClose(Object.assign(result(), {left:true, done:false, won:false})); }}); on = b4gOn();
  const sway = () => Math.sin((performance.now() - g.sw0) / b4gPace(560 / (1 + g.drunk * .32))), band = () => Math.max(.1, .26 - g.drunk * .04);
  const draw = () => { const p = g.phase;
    mgPanel(`<div class="cpbar"><span>Horn ${Math.min(g.horn + 1, HORNS)} of ${HORNS}</span><span>Regard: <b>${g.regard}</b> of ${GOAL}</span><span>${['Sober', 'Warm', 'Merry', 'Unsteady', 'Gone'][Math.min(4, g.drunk)]}</span></div>
      ${g.talk}${b4gRollHTML(g.roll)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="cpDone" data-bot="1">Back to the Third's fire</button>`
        : p === 'intro' || p === 'answer' ? `<button class="btn primary" id="cpGo" data-bot="1">${p === 'intro' ? 'Take the horn' : 'The next horn'}</button>`
        : p === 'drink' ? `<button class="btn primary" id="cpDrink" data-bot="1">Drink</button>`
        : p === 'boast' ? g.boasts.map((b, i) => `<button class="btn ${i ? '' : 'primary'}" data-b="${i}"><b>${['Plain', 'Bold', 'Tall'][i]}.</b> ${esc(b.t)}</button>`).join('') : ''}</div>
      <p class="fine">Drink when the horn is level: stop the sway inside the band. Then a boast. Plain is safe. Bold needs the horn drunk clean. Tall needs a straight face${orv ? ', and Orvas will vouch' : ''}. Each horn sways harder than the last.</p>
      <p class="hint keys"><kbd>Space</kbd> drink / go on · <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> a boast · <kbd>Esc</kbd> hand it on</p>`);
    if ($('#cpGo')) $('#cpGo').onclick = () => { AUDIO.play('click'); horn(); };
    if ($('#cpDrink')) $('#cpDrink').onclick = () => drink();
    document.querySelectorAll('#mgPanel [data-b]').forEach(b => b.onclick = () => { AUDIO.play('click'); boast(+b.dataset.b); });
    if ($('#cpDone')) $('#cpDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const horn = () => { if (g.over) return; g.phase = 'drink'; g.sw0 = performance.now(); g.roll = null; g.talk = mgSay('', g.horn ? b4gPick(['The horn comes round again. It is heavier, or your arm is lighter.', 'Another horn. The fire has got louder. So have you.', 'The horn again. The Khundryl on your left fills it for you, to the brim, with great care.']) : 'The horn is a cow\'s horn bound in silver wire, full to the lip with the milk-spirit, and the whole fire is watching to see where it goes.'); draw(); };
  const drink = () => { if (g.phase !== 'drink') return; const off = Math.abs(sway()); g.spilt = off > band(); AUDIO.play(g.spilt ? 'miss' : 'pour');
    if (g.spilt) { g.regard = Math.max(0, g.regard - 1); g.talk = mgSay('', b4gPick(['Half of it goes down your front. The Khundryl cheer the half that does not.', 'The horn tips. The milk-spirit goes into your collar and the fire laughs, not unkindly, and a little.', 'You drink most of it. The rest is on the rider beside you, who wipes his face and says it is the custom.'])); }
    else { g.cleanHorns++; g.talk = mgSay('', b4gPick(['Level, and down, and empty, and you hold it up to show them. A rider bangs his cup on his knee.', 'You drink it off in one, and do not cough, which is noticed.', 'Down, clean. A rider across the fire says something in Khundryl that has your name in it, or a word like it.'])); }
    const pool = k => B4G_BOASTS[k].filter(b => (!b.req || b.req()) && !g.told.includes(b.t)); g.boasts = ['plain', 'bold', 'tall'].map(k => b4gPick(pool(k).length ? pool(k) : B4G_BOASTS[k].filter(b => !b.req || b.req())));
    g.phase = 'boast'; draw(); };
  const boast = i => { if (g.phase !== 'boast') return; const b = g.boasts[i]; if (!b) return; g.told.push(b.t); let gain = 0, line = '';
    if (i === 0) { gain = 1; line = b4gPick(['They hear it out and nod. It is a fair boast. No one at the fire can call it a lie.', 'A plain boast. The Khundryl give it what it is worth, which is a grunt each, and a grunt is something.']); }
    else if (i === 1) { if (g.spilt) { gain = 0; line = 'A bold boast from someone with milk-spirit down their shirt. The fire laughs until it has to drink to stop.'; } else { gain = 2; line = b4gPick(['The fire likes that. A rider slaps the ground. Another tells it again to the fire behind, bigger.', 'A bold boast from a steady hand. They believe it, and say so, loudly, to each other.']); } }
    else { const r = g.roll = b4gRoll('guile', 13, 'sgt', [orv ? ['Orvas vouches for it', 2] : null, g.drunk >= 2 ? ['the milk-spirit', -Math.floor(g.drunk / 2)] : null].filter(Boolean));
      if (r.ok) { gain = 3; line = orv ? 'Orvas, across the fire, nods slowly, as if he had been there. That settles it. The Burned Tears roar.' : 'You say it with a straight face, and keep it straight, and the Burned Tears roar and believe every word.'; }
      else if (r.tier === 'near') { gain = 3; g.drunk++; line = 'They believe it, nearly. "Then drink to it," says a rider with the black tears, and another horn is in your hand, and you drink to it. It sits badly.'; }
      else { gain = -1; line = 'A rider with the black tears down his cheeks looks at you for a while. Then he laughs, and then the whole fire laughs, and you will hear about this one all the way to the river.'; } }
    g.regard = Math.max(0, g.regard + gain); g.horn++; g.drunk++; AUDIO.play(gain > 0 ? 'up' : 'lose');
    g.talk = mgSay('', `You tell them ${b.t.charAt(0).toLowerCase() + b.t.slice(1)} ${line}`) + (g.horn < HORNS ? mgSay('', B4G_KHUNDRYL[(g.horn - 1) % B4G_KHUNDRYL.length]) : '');
    if (g.horn >= HORNS) { g.over = true; const W = g.regard >= GOAL; mgDeed(W ? 'b4CupWon' : 'b4CupLost'); S.f.b4_cupBest = Math.max(S.f.b4_cupBest || 0, g.regard); AUDIO.play(W ? 'win' : 'lose');
      g.talk += W ? mgSay('', `The horn comes round one last time and does not stop at you: the rider who brought it puts it in your hands and leaves it there. ${orv ? 'Orvas says it is the cup. That it is yours now, for tonight, and that he would not have bet on it.' : 'It is the cup, a Khundryl woman says, in good Malazan. Yours, for tonight. In the morning you may give it back.'}`) : mgSay('', `The horn goes on round the fire without you. The Burned Tears are kind about it, which is the worst part. ${orv ? 'Orvas tells you, later, that it was a good try for a Malazan, and does not explain what a bad one would look like.' : 'A rider pats your shoulder on the way past, as you would pat a horse that tried.'}`); }
    else g.phase = 'answer';
    draw(); };
  MG.cv.onpointerdown = () => { if (g.phase === 'drink') drink(); };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H;
    b4gSky(ctx, W, H, t); ctx.fillStyle = '#2a2416'; ctx.fillRect(0, H * .62, W, H); b4gFire(ctx, W * .5, H * .8, Math.min(W, H) * .045, t);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(W * (.06 + i * .22), H * .62); ctx.lineTo(W * (.13 + i * .22), H * .44); ctx.lineTo(W * (.2 + i * .22), H * .62); ctx.fill(); } // tents beyond
    const fs = clamp(H / 120, 1.5, 2.8); [[.14, 1], [.3, 1], [.7, -1], [.86, -1]].forEach(([x, d], i) => drawFigure(ctx, i === 1 && orv ? 'orvas' : 'b4_c3_khundryl', W * x, H * .74, fs, t, {still:true, dir:d, phase:i}));
    // the horn, tilting with the sway
    const s = g.phase === 'drink' ? sway() : 0, cx = W * .5, cy = H * .5, L = Math.min(W * .22, H * .32); ctx.save(); ctx.translate(cx, cy); ctx.rotate(s * .5);
    const hg = ctx.createLinearGradient(-L, 0, L, 0); hg.addColorStop(0, '#e8dcc0'); hg.addColorStop(1, '#6a5a40'); ctx.fillStyle = hg; ctx.beginPath(); ctx.moveTo(-L * .55, -L * .16); ctx.quadraticCurveTo(L * .2, -L * .3, L * .6, L * .08); ctx.lineTo(L * .52, L * .14); ctx.quadraticCurveTo(L * .1, -L * .08, -L * .55, L * .16); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#c0c0c8'; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { const x = -L * .3 + i * L * .25; ctx.beginPath(); ctx.moveTo(x, -L * .2 + i * L * .03); ctx.lineTo(x + L * .04, L * .12 - i * L * .02); ctx.stroke(); }
    ctx.fillStyle = 'rgba(240,236,220,.9)'; ctx.beginPath(); ctx.ellipse(-L * .55, 0, L * .05, L * .16, 0, 0, 7); ctx.fill(); ctx.restore();
    if (g.phase === 'drink') { const bx = W * .1, bw = W * .8, by = H * .14, b = band(); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(bx, by, bw, 14); ctx.fillStyle = 'rgba(159,224,184,.35)'; ctx.fillRect(bx + bw * (.5 - b / 2), by, bw * b, 14);
      ctx.fillStyle = '#e8c073'; ctx.fillRect(bx + bw * (.5 + s * .5) - 3, by - 4, 6, 22); b4gText(ctx, 'level', W * .5, by - 6, 12, 'rgba(159,224,184,.8)'); }
    for (let i = 0; i < GOAL; i++) { ctx.fillStyle = i < g.regard ? '#e8c073' : 'rgba(232,192,115,.2)'; ctx.beginPath(); ctx.arc(W / 2 + (i - (GOAL - 1) / 2) * 16, H * .96 - 8, 5, 0, 7); ctx.fill(); }
  };
  mgKeys({' ':() => { const b = $('#cpGo') || $('#cpDrink') || $('#cpDone'); b && b.click(); }, '1':() => boast(0), '2':() => boast(1), '3':() => boast(2)});
  g.talk = mgSay('', `At the next fire over the Burned Tears are passing a horn, and each one who drinks stands and says something about themselves, and the fire decides. A rider sees you watching and holds the horn out across the coals.`) + (orv ? mgSay('Orvas', '"Drink it level. Then say something they can believe, or something they will want to. They will know which." He thinks. "Do not say anything about the Chain."') : b43ONear() ? mgSay('', 'Orvas is at this fire, among his own. He lifts a hand to you, and sits back to see what you do.') : '');
  draw();
}

/* ============ 3. The hand game ============
   The Seti archers' game: a marked bone in one fist, the fists moving with a song, and the other side says which. Eight sticks in the
   middle, a stick to whoever is right. They hide and you guess (the hand that settles last is often the one); you hide and they guess
   (hold your face, or they read it). Once a game you may read the archer: Wits, Tebbet and Haddat with an edge. */
function playHands(opt = {}){
  let on = () => true; const TURNS = 8;
  const g = MG.state = {turn:0, mine:0, theirs:0, phase:'intro', bone:0, late:-1, settleT:0, songT:0, read:'', readUsed:false, seen:false, ringT:0, steady:null, myHand:-1, roll:null, over:false, talk:'', pick:-1, pickT:0};
  const result = () => ({mine:g.mine, theirs:g.theirs, done:g.over && g.turn >= TURNS, won:g.over && g.turn >= TURNS && g.mine > g.theirs, even:g.mine === g.theirs});
  mgOpen({kick:'The wounded camp · the Seti fire', title:'The hand game', leaveText:'Leave the sticks', done:r => opt.after && opt.after(r), leave:() => { g.over = true; mgClose(Object.assign(result(), {left:true, done:false, won:false})); }}); on = b4gOn();
  const theyHide = () => g.turn % 2 === 0;
  const draw = () => { const p = g.phase;
    mgPanel(`<div class="cpbar"><span>Turn ${Math.min(g.turn + 1, TURNS)} of ${TURNS}</span><span>Sticks: you <b>${g.mine}</b> · ${g.theirs} the archers</span><span>${theyHide() ? 'They hide' : 'You hide'}</span></div>
      ${g.talk}${b4gRollHTML(g.roll)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="hgDone" data-bot="1">Back to the fire</button>`
        : p === 'intro' || p === 'result' ? `<button class="btn primary" id="hgGo" data-bot="1">${p === 'intro' ? 'Sit down to it' : 'The next turn'}</button>`
        : p === 'guess' ? `<button class="btn primary" data-g="0">Her left hand</button><button class="btn primary" data-g="1">Her right hand</button>${g.readUsed ? '' : `<button class="btn" id="hgRead" data-bot="1">Read her (once a game)</button>`}`
        : p === 'hide' ? `<button class="btn primary" data-h="0">The bone in your left</button><button class="btn primary" data-h="1">The bone in your right</button>`
        : p === 'steady' ? `<button class="btn primary" id="hgSteady" data-bot="1">Hold your face</button>` : `<span class="fine">${p === 'song' ? 'The song.' : 'She looks at your hands.'}</span>`}</div>
      <p class="fine">They hide: watch the fists as the song stops; the hand that settles last has often got the bone, but not always. You hide: pick a hand, then hold your face when the ring closes on the circle, or she reads you.</p>
      <p class="hint keys"><kbd>←</kbd><kbd>→</kbd> a hand · <kbd>Space</kbd> go on / hold your face · <kbd>R</kbd> read her · <kbd>Esc</kbd> leave</p>`);
    if ($('#hgGo')) $('#hgGo').onclick = () => { AUDIO.play('click'); next(); };
    document.querySelectorAll('#mgPanel [data-g]').forEach(b => b.onclick = () => guess(+b.dataset.g));
    document.querySelectorAll('#mgPanel [data-h]').forEach(b => b.onclick = () => hide(+b.dataset.h));
    if ($('#hgRead')) $('#hgRead').onclick = () => { AUDIO.play('click'); read(); };
    if ($('#hgSteady')) $('#hgSteady').onclick = () => steady();
    if ($('#hgDone')) $('#hgDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const next = () => { if (g.over) return; g.roll = null; g.read = ''; g.pick = -1;
    if (theyHide()) { g.bone = R(2); const k = Math.random(); g.late = k < .62 ? g.bone : k < .86 ? 1 - g.bone : -1; g.phase = 'song'; g.songT = performance.now(); g.settleT = g.songT + b4gPace(1700);
      g.talk = mgSay('', b4gPick(['The archer across from you puts her fists behind her back, and the others start the song, low, and the fists come out and go round each other with it.', 'The song again, the same four lines. Her fists move with it, slow and then quick.', 'Her eyes are on you, not her hands. The song goes on.'])); draw(); AUDIO.play('shuffle');
      setTimeout(() => { if (!on() || g.phase !== 'song') return; g.phase = 'guess'; g.talk = mgSay('', 'The song stops. Two fists on her knees. Which?'); draw(); }, b4gPace(2050)); }
    else { g.phase = 'hide'; g.talk = mgSay('', 'Your turn. She hands you the bone with the red mark on it, and the song starts for you.'); draw(); } };
  const guess = h => { if (g.phase !== 'guess' || g.over) return; g.pick = h; g.pickT = performance.now(); const right = h === g.bone; if (right) g.mine++; else g.theirs++; AUDIO.play(right ? 'up' : 'miss');
    g.talk = mgSay('', right ? b4gPick(['She opens the hand. The red bone. She gives you a stick, and the archers groan, and laugh.', 'The bone, in the hand you said. She tosses you a stick without ceremony.']) : b4gPick(['She opens the hand you said, and it is empty, and she opens the other one, slowly, for the fire to see.', 'Empty. The archers sing one line of the song at you, which is the Seti way of mocking.'])); end(); };
  const hide = h => { if (g.phase !== 'hide') return; g.myHand = h; g.phase = 'steady'; g.ringT = performance.now(); AUDIO.play('click'); g.talk = mgSay('', 'The bone is in your fist. Now your face. She is watching it.'); draw(); setTimeout(() => { if (on() && g.phase === 'steady') steady(true); }, b4gPace(1700)); };
  const ring = () => 1 - clamp((performance.now() - g.ringT) / b4gPace(1300), 0, 1.3); // 1 → 0 (and past); the circle is at .35
  const steady = late => { if (g.phase !== 'steady') return; const k = ring(); g.steady = !late && Math.abs(k - .35) <= .09; g.phase = 'look';
    const p = g.seen ? 1 : g.steady ? .5 : .82, right = Math.random() < p; draw();
    setTimeout(() => { if (!on()) return; if (right) g.theirs++; else g.mine++; AUDIO.play(right ? 'miss' : 'up');
      g.talk = mgSay('', (g.seen ? 'She saw you reading her, and now she reads you back: she points at the bone before you have finished closing your hand. ' : g.steady ? 'You hold your face like a shut door. ' : 'Your face says something. She hears it. ') + (right ? 'She points. The right hand. A stick to the archers.' : 'She points at the empty hand. A stick to you.'));
      g.seen = false; end(); }, b4gPace(700)); };
  const read = () => { if (g.phase !== 'guess' || g.readUsed) return; g.readUsed = true;
    const r = g.roll = b4gRoll('wits', 13, null, [['a bowman reads a bowman', 2, 'tebbet'], ['Seven Cities hands', 1, 'haddat']]);
    if (r.ok) { g.read = 'shown'; g.talk = mgSay('', `${NAME(r.who)} leans to you. "${r.who === 'tebbet' ? 'Her draw hand. She favours it.' : 'Look at her thumb.'}" The ${g.bone ? 'right' : 'left'} fist, then.`); }
    else if (r.tier === 'near') { g.read = 'shown'; g.seen = true; g.talk = mgSay('', `${NAME(r.who)} has it: the ${g.bone ? 'right' : 'left'}. Yes, but she saw you being told, and she smiles, and she will read your face on the next turn the way you just read hers.`); }
    else g.talk = mgSay('', `${NAME(r.who)} watches her hands until the song stops, and learns the song.`);
    draw(); };
  const end = () => { g.turn++; if (g.turn >= TURNS) { g.over = true; const W = g.mine > g.theirs, E = g.mine === g.theirs; mgDeed(W ? 'b4HandsWon' : E ? 'b4HandsEven' : 'b4HandsLost'); AUDIO.play(W ? 'win' : 'lose');
      g.talk += mgSay('', W ? `${g.mine} sticks to ${g.theirs}. The archer holds up her empty hands, both of them, and the wounded who could not sit up have sat up to see it. Under the awnings a man is laughing who has not laughed since the gorge.` : E ? 'Four sticks each. The archers call it even, and argue about it among themselves in Seti for the rest of the night.' : `${g.theirs} sticks to ${g.mine}. The archer gathers them up. "Malazans," she says, in Malazan, "have faces like open doors," and the fire laughs, the wounded too.`); }
    else g.phase = 'result'; draw(); };
  const geo = () => { const W = MG.W, H = MG.H, s = Math.min(W * .14, H * .16); return {W, H, s, y:H * .64, x:h => W * (h ? .64 : .36)}; };
  MG.cv.onpointerdown = e => { const r = MG.cv.getBoundingClientRect(), {s, x, y} = geo(), px = e.clientX - r.left, py = e.clientY - r.top; if (Math.abs(py - y) > s * 1.2) return;
    const h = px < MG.W / 2 ? 0 : 1; if (g.phase === 'guess') guess(h); else if (g.phase === 'hide') hide(h); else if (g.phase === 'steady') steady(); };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const {W, H, s, y, x} = geo(), now = performance.now();
    b4gSky(ctx, W, H, t); ctx.fillStyle = '#2c2418'; ctx.fillRect(0, H * .5, W, H);
    ctx.fillStyle = 'rgba(120,96,64,.5)'; ctx.beginPath(); ctx.moveTo(0, H * .3); ctx.lineTo(W * .3, H * .2); ctx.lineTo(W * .32, H * .5); ctx.lineTo(0, H * .5); ctx.fill(); ctx.beginPath(); ctx.moveTo(W, H * .28); ctx.lineTo(W * .72, H * .2); ctx.lineTo(W * .7, H * .5); ctx.lineTo(W, H * .5); ctx.fill(); // the awnings
    b4gFire(ctx, W * .5, H * .93, Math.min(W, H) * .035, t);
    const fs = clamp(H / 120, 1.5, 2.8); drawFigure(ctx, 'b4_c4_setiarcher', W * .5, H * .44, fs * 1.1, t, {still:true}); drawFigure(ctx, 'b4_c4_setiwounded', W * .12, H * .56, fs, t, {still:true, dir:1}); drawFigure(ctx, 'b4_c4_seti', W * .88, H * .56, fs, t, {still:true, dir:-1});
    // the sticks in the middle, and each side's
    const left = TURNS - g.mine - g.theirs; ctx.strokeStyle = '#d8c8a0'; ctx.lineWidth = 2; for (let i = 0; i < left; i++) { ctx.beginPath(); ctx.moveTo(W * .44 + i * W * .016, H * .9); ctx.lineTo(W * .45 + i * W * .016, H * .8); ctx.stroke(); }
    for (let i = 0; i < g.mine; i++) { ctx.beginPath(); ctx.moveTo(W * .06 + i * 6, H * .97); ctx.lineTo(W * .07 + i * 6, H * .88); ctx.stroke(); } for (let i = 0; i < g.theirs; i++) { ctx.beginPath(); ctx.moveTo(W * .94 - i * 6, H * .97); ctx.lineTo(W * .93 - i * 6, H * .88); ctx.stroke(); }
    // the fists: theirs moving with the song, yours when you hide
    const mineUp = g.phase === 'hide' || g.phase === 'steady' || g.phase === 'look';
    for (let h = 0; h < 2; h++) { let fx = x(h), fy = y;
      if (g.phase === 'song') { const k = (now - g.songT) / b4gPace(1700), stopAt = g.settleT + (h === g.late ? b4gPace(260) : 0), live = now < stopAt; if (live) { fx += Math.sin(now / 150 + h * Math.PI) * s * .6 * (1 - Math.min(1, k) * .3); fy += Math.cos(now / 190 + h) * s * .25; } }
      const open = g.phase === 'result' || g.over ? (theyHideLast() ? true : false) : false;
      ctx.fillStyle = mineUp ? '#b08868' : '#9a6e4e'; ctx.beginPath(); ctx.ellipse(fx, fy, s * .42, s * .34, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(40,20,10,.6)'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.strokeStyle = 'rgba(40,20,10,.5)'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(fx - s * .22 + i * s * .15, fy - s * .3); ctx.lineTo(fx - s * .24 + i * s * .15, fy); ctx.stroke(); }
      if ((g.read === 'shown' && g.phase === 'guess' && h === g.bone) || (mineUp && h === g.myHand)) { ctx.fillStyle = '#c84a3a'; ctx.fillRect(fx - 2, fy - s * .5, 4, s * .2); } // the red mark showing at the fist
      if (open && h === g.bone) { ctx.fillStyle = '#efe6c8'; ctx.fillRect(fx - s * .18, fy - 3, s * .36, 6); ctx.fillStyle = '#c84a3a'; ctx.fillRect(fx - 2, fy - 3, 4, 6); }
      if (g.phase === 'guess' || g.phase === 'hide') b4gText(ctx, h ? '→' : '←', fx, fy + s * .75, 14, 'rgba(232,192,115,.6)'); }
    if (g.phase === 'steady') { const k = ring(); ctx.strokeStyle = 'rgba(159,224,184,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(W / 2, H * .3, s * .35 * 2, 0, 7); ctx.stroke(); ctx.strokeStyle = '#e8c073'; ctx.beginPath(); ctx.arc(W / 2, H * .3, Math.max(1, s * 2 * Math.max(0, k)), 0, 7); ctx.stroke(); }
  };
  const theyHideLast = () => (g.turn - 1) % 2 === 0;
  mgKeys({' ':() => { const b = $('#hgGo') || $('#hgSteady') || $('#hgDone'); b && b.click(); }, ArrowLeft:() => g.phase === 'guess' ? guess(0) : hide(0), ArrowRight:() => g.phase === 'guess' ? guess(1) : hide(1), r:() => read()});
  g.talk = mgSay('', `Two Seti archers by the fire, one with her leg strapped to a board and one with a bandage round her head, have a little heap of tally sticks between them and a knucklebone with a red mark on it. The one with the board sees you looking and pats the ground. "You know the hand game, Malazan? No? Good."`) + (b4In('tebbet') ? mgSay('', 'Tebbet sits down behind you, which for Tebbet is close.') : '');
  draw();
}

/* ============ 4. The Fuse ============
   The Second Company's sapper calls a count; the cord comes off the reel along the board, faster each length; cut it on the count.
   The blown sand hides the board's marks in gusts. Tangle keeps his thumb on the right mark if his read of the cord holds (Wits).
   Five lengths each; nearer in all than the company's sapper takes it. */
function playFuse(opt = {}){
  let on = () => true; const CUTS = 5, dust = Math.max(1, b4DustNow() || S.dust || 1), sapper = b4In('tangle') ? 'tangle' : null;
  const g = MG.state = {cut:0, err:[], theirs:[], want:0, phase:'intro', t0:0, speed:1.6, len:0, cutAt:null, burnT:0, thumb:false, roll:null, over:false, talk:'', checked:false};
  const result = () => { const mine = g.err.reduce((a, b) => a + b, 0), theirs = g.theirs.reduce((a, b) => a + b, 0), done = g.over && g.cut >= CUTS;
    return {done, mine, theirs, won:done && mine < theirs, clean:done && mine < theirs && g.err.every(e => e <= .25)}; };
  mgOpen({kick:'The lee of the rock · the Second Company\'s sappers', title:'The Fuse', leaveText:'Give the knife back', done:r => opt.after && opt.after(r), leave:() => { g.over = true; mgClose(Object.assign(result(), {left:true, done:false, won:false, clean:false})); }}); on = b4gOn();
  const counts = () => g.phase === 'reel' ? Math.min(10.2, (performance.now() - g.t0) / 1000 * g.speed / b4gPace(1)) : g.len;
  const draw = () => { const p = g.phase, r = result();
    mgPanel(`<div class="cpbar"><span>Length ${Math.min(g.cut + 1, CUTS)} of ${CUTS}</span><span>Off by: you <b>${r.mine.toFixed(1)}</b> · ${r.theirs.toFixed(1)} the sapper</span><span>${g.want ? `A ${numw(g.want)} count` : ''}</span></div>
      ${g.talk}${b4gRollHTML(g.roll)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="fuDone" data-bot="1">Back to the fire</button>`
        : p === 'intro' || p === 'between' ? `<button class="btn primary" id="fuGo" data-bot="1">${p === 'intro' ? 'Take the knife' : 'The next length'}</button>`
        : p === 'reel' ? `<button class="btn primary" id="fuCut" data-bot="1">Cut</button>` : `<span class="fine">The sapper counts it out.</span>`}</div>
      <p class="fine">The board is marked in counts. The sapper calls a count, the cord runs off the reel along the board, and you cut it when its end reaches the mark. The sand hides the marks in gusts${sapper ? '; Tangle keeps his thumb on the right one, if he has read the cord right' : ''}.</p>
      <p class="hint keys"><kbd>Space</kbd> cut / go on · <kbd>Esc</kbd> give the knife back</p>`);
    if ($('#fuGo')) $('#fuGo').onclick = () => { AUDIO.play('click'); start(); };
    if ($('#fuCut')) $('#fuCut').onclick = () => cut();
    if ($('#fuDone')) $('#fuDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const start = () => { if (g.over) return; g.roll = null;
    if (!g.checked && sapper) { g.checked = true; const r = g.roll = b4gRoll('wits', 12, 'tangle', [['a sapper', 3]]);
      if (r.ok) { g.thumb = true; g.talkPre = mgSay('Tangle', '"Old Moranth cord," Tangle says, running it through his fingers twice. "Dry. It runs true, though." He puts his thumb on the board. "I\'ll show you where. Cut at my thumb."'); }
      else if (r.tier === 'near') { g.thumb = true; const n = bruiseN(); bruise('tangle', n); g.talkPre = mgSay('Tangle', `"Let me see it burn," Tangle says, and touches a coal to an inch of it to read the rate, and it reads him back: it takes the skin off his thumb. He puts the thumb on the board anyway. (Yes, but Tangle starts the next fight ${n} health down.)`); }
      else g.talkPre = mgSay('Tangle', '"Can\'t tell," Tangle says. "Sand in the wrap. It could run any way. Count, Sergeant. Count in your head and trust it."'); }
    g.want = 3 + R(6); g.speed = 1.6 + g.cut * .42; g.t0 = performance.now(); g.phase = 'reel'; g.cutAt = null; AUDIO.play('pick');
    g.talk = (g.talkPre || '') + mgSay('The company\'s sapper', `"${numw(g.want, true)} count."`); g.talkPre = ''; draw();
    setTimeout(function watch(){ if (!on() || g.phase !== 'reel') return; if (counts() >= 10.2) return cut(true); setTimeout(watch, 60); }, 60); };
  const cut = over => { if (g.phase !== 'reel') return; g.len = counts(); const e = over ? 10 - g.want : Math.abs(g.len - g.want); g.err.push(Math.round(e * 100) / 100);
    const th = Math.round(Math.min(1.2, (.08 + Math.random() * .42) * (1 + g.cut * .12)) * 100) / 100; g.theirs.push(th);
    g.phase = 'burn'; g.burnT = performance.now(); AUDIO.play(over ? 'miss' : 'blunt'); draw();
    setTimeout(() => { if (!on()) return; g.cut++; const d = g.len - g.want;
      const said = over ? 'The cord runs off the end of the board into the sand, and the sapper picks it up and looks at you.' : e <= .15 ? b4gPick([`"${numw(g.want, true)}," the sapper says, as the flame goes out at the end. "On the count." She sounds put out.`, 'Out on the count, to the breath. The sapper writes a mark in the sand with her finger.']) : e <= .5 ? `A ${numw(g.want)} count and ${d < 0 ? 'a breath short' : 'a breath over'}. "Near," the sapper says. "Near kills sappers. Mostly it kills the ones next to them."` : `${d < 0 ? 'Short' : 'Long'}, by most of a count. "${d < 0 ? 'Short fuse. You\'re still running when it goes.' : 'Long fuse. The man you threw it at has time to throw it back.'}"`;
      g.talk = mgSay('', said) + mgSay('', `The company's sapper cuts hers: off by ${th <= .15 ? 'nothing you could measure' : th <= .5 ? 'a breath' : 'most of a count'}.`);
      if (g.cut >= CUTS) { g.over = true; const r = result(); mgDeed(r.won ? 'b4FuseWon' : 'b4FuseLost'); if (r.clean) mgDeed('b4FuseClean'); S.f.b4_fuseBest = Math.min(S.f.b4_fuseBest != null ? S.f.b4_fuseBest : 99, Math.round(r.mine * 10) / 10); AUDIO.play(r.won ? 'win' : 'lose');
        g.talk += mgSay('The company\'s sapper', r.won ? `"${r.clean ? 'All five on the count. In this.' : 'Better than me, tonight.'}" She wipes the knife on her sleeve and hands it back to you hilt first. ${r.clean ? '"Take a sharper. Don\'t tell the quartermaster. Don\'t tell anyone."' : '"Take a smoker. You\'ve earned something that hides you."'}` : `"Not bad, for the 9th." She takes her knife back. "Come and cut cord with me on a still night. There aren't any. Come anyway."`); }
      else g.phase = 'between'; draw(); }, b4gPace(900)); };
  MG.cv.onpointerdown = () => { if (g.phase === 'reel') cut(); };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now();
    b4gSky(ctx, W, H, t, {dust}); ctx.fillStyle = '#5a3a28'; ctx.beginPath(); ctx.moveTo(0, H * .45); ctx.lineTo(W * .2, H * .18); ctx.lineTo(W * .46, H * .26); ctx.lineTo(W * .6, H * .45); ctx.fill(); // the red rock
    ctx.fillStyle = '#3e3020'; ctx.fillRect(0, H * .45, W, H); b4gFire(ctx, W * .85, H * .4, Math.min(W, H) * .03, t);
    const fs = clamp(H / 130, 1.4, 2.6); drawFigure(ctx, 'sapper', W * .78, H * .4, fs, t, {still:true, dir:-1}); if (sapper) drawFigure(ctx, 'tangle', W * .66, H * .41, fs, t, {still:true, dir:-1});
    // the board, marked in counts; the gusts take the marks
    const bx = W * .06, bw = W * .88, by = H * .66, cw = bw / 10, gust = Math.pow(Math.max(0, Math.sin(t / 650) * Math.sin(t / 1730 + 1)), 2) * Math.min(.95, .55 + dust * .15);
    ctx.fillStyle = '#7a5e3e'; ctx.fillRect(bx - 4, by - 10, bw + 8, 30); ctx.strokeStyle = 'rgba(30,18,8,.6)'; ctx.strokeRect(bx - 4, by - 10, bw + 8, 30);
    ctx.globalAlpha = 1 - gust; for (let i = 0; i <= 10; i++) { ctx.fillStyle = i === g.want && g.phase === 'reel' ? '#ffe3a0' : '#2a1a0c'; ctx.fillRect(bx + i * cw - 1, by - 10, 2, i % 5 ? 10 : 16); b4gText(ctx, String(i), bx + i * cw, by + 34, 11, 'rgba(232,192,115,.75)'); } ctx.globalAlpha = 1;
    if (gust > .3) { ctx.fillStyle = `rgba(200,160,110,${gust * .55})`; ctx.fillRect(bx - 6, by - 14, bw + 12, 52); }
    if (g.thumb && g.phase === 'reel') { const tx = bx + g.want * cw; ctx.fillStyle = '#c49c80'; ctx.beginPath(); ctx.ellipse(tx, by - 16, 6, 9, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(40,20,10,.6)'; ctx.stroke(); }
    // the cord off the reel, and the flame on a cut length
    const n = g.phase === 'reel' ? counts() : g.len; ctx.fillStyle = '#3a2a1a'; ctx.beginPath(); ctx.arc(bx - 2, by + 4, 9, 0, 7); ctx.fill();
    if (g.phase === 'reel' || g.phase === 'burn') { ctx.strokeStyle = '#d8c090'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, by + 4); ctx.lineTo(bx + Math.min(10.2, n) * cw, by + 4); ctx.stroke();
      if (g.phase === 'burn') { const k = clamp((now - g.burnT) / b4gPace(800), 0, 1), fx = bx + Math.min(10.2, n) * cw * (1 - k); ctx.strokeStyle = '#2a2018'; ctx.beginPath(); ctx.moveTo(fx, by + 4); ctx.lineTo(bx + Math.min(10.2, n) * cw, by + 4); ctx.stroke(); glow(ctx, fx, by + 4, 14, '#ffb050', .7); } }
    if (g.phase === 'reel') b4gText(ctx, `${numw(g.want, true)} count`, W / 2, H * .9, Math.min(18, W * .05));
  };
  mgKeys({' ':() => { const b = $('#fuGo') || $('#fuDone'); if (b) b.click(); else cut(); }});
  g.talk = mgSay('', `In the lee of the rock the Second Company's sapper, a woman with sand in her eyebrows and a burn on every finger, is cutting fuse for the morning against a count, and losing to nobody. She holds out the knife.`) + mgSay('The company\'s sapper', '"Cord off the reel along the board. I call the count. You cut it. Nearest in five takes a munition off me, and I don\'t lose munitions."') + (sapper ? mgSay('', 'Tangle sits down on the other side of the board with both wrists wrapped in cord of his own, and looks at hers as if it might be stolen.') : '');
  draw();
}

/* ============ 5. The feather ============
   Behind the horse lines Temul's youths have a crow feather on a stake and a horse at the far end. Ride past and take it without
   stopping: lean when the hand will reach it, not before, and come up with it. Three passes against three of theirs. The horse is
   Wickan and has views on Malazans: a check to mount (Might; Sathi, Orvas, Keth with an edge) sets how it runs. */
function b4FeatherLead(){ return b4In('warlock') && b4Was('b2_c7_key') === 'wickans' ? 'warlock' : null; }
function playFeather(opt = {}){
  let on = () => true; const PASSES = 3, sathi = b4In('sathi'), keth = b4FeatherLead();
  const g = MG.state = {pass:0, mine:0, theirs:0, phase:'intro', horse:'', mul:1, fx:.6, t0:0, dur:2000, lean:null, got:null, rider:'me', roll:null, over:false, talk:''};
  const result = () => ({mine:g.mine, theirs:g.theirs, done:g.over && g.pass >= PASSES, won:g.over && g.pass >= PASSES && g.mine > g.theirs});
  mgOpen({kick:'Behind the horse lines · Temul\'s youths', title:'The feather', leaveText:'Get down off the horse', done:r => opt.after && opt.after(r), leave:() => { g.over = true; mgClose(Object.assign(result(), {left:true, done:false, won:false})); }}); on = b4gOn();
  const L = () => b4gPace(sathi ? 520 : 400), DOWN = () => b4gPace(110);
  const hx = () => clamp((performance.now() - g.t0) / g.dur, -.2, 1.25) * 1.3 - .15; // the horse's place, 0..1 across the flat
  const crossT = () => g.t0 + (g.fx + .15) / 1.3 * g.dur; // when the rider's hand passes the stake
  const draw = () => { const p = g.phase;
    mgPanel(`<div class="cpbar"><span>Pass ${Math.min(g.pass + 1, PASSES)} of ${PASSES}</span><span>Feathers: you <b>${g.mine}</b> · ${g.theirs} the youths</span><span>${g.horse ? {kind:'A kind horse', steady:'A steady horse', bolt:'A bolter', wild:'A horse with views'}[g.horse] : ''}</span></div>
      ${g.talk}${b4gRollHTML(g.roll)}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="feDone" data-bot="1">Back to the fire</button>`
        : p === 'intro' ? `<button class="btn primary" id="feMount" data-bot="1">Get up on the horse</button>`
        : p === 'ready' ? `<button class="btn primary" id="feGo" data-bot="1">${g.pass ? 'Again: ride' : 'Ride'}</button>`
        : p === 'ride' ? `<button class="btn primary" id="feLean" data-bot="1">Lean and take it</button>` : `<span class="fine">${p === 'youth' ? 'A youth rides.' : ''}</span>`}</div>
      <p class="fine">The horse goes the length of the flat at a gallop. Lean when your hand will reach the feather: you are down for a moment only, so lean just before the stake, not early. One lean a pass.${sathi ? ' Sathi rides beside you and calls it.' : ''}</p>
      <p class="hint keys"><kbd>Space</kbd> ride / lean · <kbd>Esc</kbd> get down</p>`);
    if ($('#feMount')) $('#feMount').onclick = () => { AUDIO.play('click'); mount(); };
    if ($('#feGo')) $('#feGo').onclick = () => { AUDIO.play('click'); ride(); };
    if ($('#feLean')) $('#feLean').onclick = () => lean();
    if ($('#feDone')) $('#feDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; };
  const mount = () => { if (g.phase !== 'intro') return; const r = g.roll = b4gRoll('might', 12, 'sgt', [sathi ? ['Sathi has the horse by the head', 2] : null, b4In('orvas') ? ['Orvas knows horses', 1] : null, keth ? ['Keth talks to it in Wickan', 1] : null].filter(Boolean));
    g.horse = r.tier === 'crit' ? 'kind' : r.ok ? 'steady' : r.tier === 'near' ? 'bolt' : 'wild'; g.mul = {kind:.9, steady:1, bolt:1, wild:1.18}[g.horse];
    g.talk = mgSay('', {kind:'The horse turns its head and looks at you, and decides something in your favour. It stands like a wall while you get up.', steady:'Up, and the horse lets you, and shifts once under you to say it noticed.', bolt:'Up, yes, but the horse has not agreed to it: it takes the bit and goes before you are ready, and the first pass is going to be fast.', wild:'You get up on the third try. The horse lets you know it has views on Malazans. It will run hot all the way.'}[g.horse]); g.phase = 'ready'; draw(); };
  const ride = () => { if (g.phase !== 'ready' || g.over) return; g.rider = 'me'; g.fx = .48 + Math.random() * .24; g.lean = null; g.got = null; g.roll = null;
    g.dur = b4gPace(2100 - g.pass * 260) / g.mul / (g.horse === 'bolt' && !g.pass ? 1.35 : 1); g.t0 = performance.now(); g.phase = 'ride'; AUDIO.play('step');
    g.talk = mgSay('', b4gPick(['The flat goes under you. The stake, and the black feather on it, coming.', 'Hooves, dust, the youths yelling. The feather.', 'The horse flattens out. The stake comes at you faster than it has any right to.'])); draw();
    setTimeout(function watch(){ if (!on() || g.phase !== 'ride') return; if (performance.now() > crossT() + 60) return settle(); setTimeout(watch, 30); }, 30); };
  const lean = () => { if (g.phase !== 'ride' || g.lean) return; g.lean = performance.now(); AUDIO.play('click'); };
  const settle = () => { const c = crossT(), got = !!g.lean && c >= g.lean + DOWN() && c <= g.lean + L(); g.got = got; if (got) g.mine++; AUDIO.play(got ? 'up' : 'miss'); g.phase = 'youth';
    g.talk = mgSay('', got ? b4gPick(['Your hand closes on it, and the stake goes by, and you come up with the feather and the youths howl.', 'You have it. You nearly have the stake too. The youths cheer the feather and boo the stake.']) : !g.lean ? 'The stake goes by with the feather on it. You did not lean at all. The youths are very kind about it, at the top of their voices.' : g.lean + L() < c ? 'You lean too soon and come up before the stake, with a handful of air. A youth shouts something that has *Malazan* in it.' : 'Late: your fingers touch the feather as it goes behind you.'); draw();
    setTimeout(() => { if (!on()) return; youth(); }, b4gPace(1000)); };
  const youth = () => { g.rider = 'youth'; g.fx = .5 + Math.random() * .2; g.dur = b4gPace(1700); g.t0 = performance.now(); g.lean = null;
    setTimeout(() => { if (!on()) return; const got = Math.random() < .58 + g.pass * .04; if (got) g.theirs++; g.pass++;
      g.talk += mgSay('', got ? b4gPick(['A youth takes it low off the stake without looking, as if he had dropped it there himself.', 'The youth hangs off the side of his horse by one heel and comes up with the feather in his teeth.']) : b4gPick(['The youth reaches and misses, and the others are merciless.', 'The youth\'s horse shies at the stake, and he comes back with nothing and a long story about it.']));
      if (g.pass >= PASSES) { g.over = true; const W = g.mine > g.theirs, E = g.mine === g.theirs; mgDeed(W ? 'b4FeatherWon' : 'b4FeatherLost'); if (g.mine) mgDeed('b4Feathers', g.mine); AUDIO.play(W ? 'win' : 'lose');
        g.talk += mgSay(keth ? 'Keth' : '', W ? (keth ? '"The Malazan wins," Keth tells the youths, in Wickan and then in Malazan, so there will be no argument. There is an argument. "*Let them have it,*" the grandmother says. "*They will need it.*"' : 'The youths give you the feathers you took, as is right, and one more, as is not, and will not say why.') : E ? 'Even. The youths decide this means they won, and tell each other so all the way back to the horse lines.' : (keth ? '"Wickans win," Keth says, with great satisfaction, and then, because the grandmother is pinching him: "You rode well. For a Malazan."' : 'The youths ride round you once, very fast, very close, which you are told afterwards is a compliment.')); }
      else g.phase = 'ready'; draw(); }, g.dur * .95); draw(); };
  MG.cv.onpointerdown = () => { if (g.phase === 'ride') lean(); };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now(), gy = H * .72;
    b4gSky(ctx, W, H, t, {dusk:true, dust:1}); ctx.fillStyle = '#4a3a26'; ctx.fillRect(0, gy, W, H); ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 18; i++) ctx.fillRect(hash(i, 91) * W, gy + hash(i, 92) * (H - gy), 6, 1);
    const fs = clamp(H / 130, 1.4, 2.6); for (let i = 0; i < 4; i++) drawFigure(ctx, 'wickan', W * (.08 + i * .07), gy - 2, fs * .9, t, {still:true, dir:1, phase:i}); if (keth) drawFigure(ctx, 'warlock', W * .92, gy - 2, fs, t, {still:true, dir:-1});
    // the stake and the feather
    const sx = W * g.fx, taken = g.got && g.rider === 'me' && now > crossT(); ctx.strokeStyle = '#6a5038'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, gy + 4); ctx.lineTo(sx, gy - H * .08); ctx.stroke();
    if (!taken && (g.phase === 'ride' || g.phase === 'ready' || g.phase === 'intro' || g.rider === 'youth')) { ctx.save(); ctx.translate(sx, gy - H * .08); ctx.rotate(-.4 + Math.sin(t / 300) * .12); ctx.fillStyle = '#0a0a10'; ctx.beginPath(); ctx.ellipse(0, -10, 3.5, 12, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#3a3a48'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(0, -22); ctx.stroke(); ctx.restore(); }
    // the horse and rider at the gallop
    if (g.phase === 'ride' || g.phase === 'youth' || g.rider === 'youth' && !g.over) { const k = clamp((now - g.t0) / g.dur, -.2, 1.25) * 1.3 - .15, x = W * k, gal = Math.sin(now / 55), s = Math.min(W * .09, H * .1), down = g.rider === 'me' && g.lean && now >= g.lean && now <= g.lean + L();
      if (k > -.1 && k < 1.1) { ctx.fillStyle = g.rider === 'me' ? '#1e140c' : '#0e0c0a'; ctx.strokeStyle = 'rgba(232,192,115,.45)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, gy - s * .9, s * 1.1, s * .42, 0, 0, 7); ctx.fill(); ctx.stroke(); // body
        ctx.beginPath(); ctx.moveTo(x + s * .8, gy - s * 1.1); ctx.lineTo(x + s * 1.45, gy - s * 1.6); ctx.lineTo(x + s * 1.6, gy - s * 1.4); ctx.lineTo(x + s * 1.05, gy - s * .75); ctx.fill(); // neck and head
        ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = Math.max(2, s * .16); [[-.7, 1], [-.45, -1], [.55, 1], [.8, -1]].forEach(([lx, ph]) => { ctx.beginPath(); ctx.moveTo(x + s * lx, gy - s * .7); ctx.lineTo(x + s * lx + gal * ph * s * .35, gy); ctx.stroke(); });
        ctx.beginPath(); ctx.moveTo(x - s * 1.05, gy - s * 1); ctx.quadraticCurveTo(x - s * 1.6, gy - s * .9, x - s * 1.7, gy - s * .5); ctx.stroke(); // tail
        drawFigure(ctx, g.rider === 'me' ? 'sgt' : 'wickan', x + (down ? s * .35 : 0), gy - s * 1.25 + (down ? s * .55 : 0), s / 16, t, {still:true, dir:1, air:true});
        if (sathi && g.rider === 'me' && g.phase === 'ride') { const c = crossT(), call = now > c - L() + 60 && now < c - DOWN() - 20; if (call) b4gText(ctx, 'NOW', x, gy - s * 2.3, Math.min(22, W * .06), '#9fe0b8'); }
        glow(ctx, x - s, gy, s * 1.5, '#c8a070', .18); } }
    for (let i = 0; i < PASSES; i++) { ctx.fillStyle = i < g.mine ? '#e8c073' : 'rgba(232,192,115,.2)'; ctx.fillRect(10 + i * 14, 10, 8, 18); ctx.fillStyle = i < g.theirs ? '#9ab0d0' : 'rgba(154,176,208,.2)'; ctx.fillRect(W - 18 - i * 14, 10, 8, 18); }
  };
  mgKeys({' ':() => { const b = $('#feMount') || $('#feGo') || $('#feDone'); if (b) b.click(); else lean(); }});
  g.talk = mgSay('', `Behind the horse lines Temul's youths have driven a stake into the hard sand with a crow feather in the top of it, and are taking it off at the gallop, one after another, and putting it back for the next. Some forty of them watch every pass and have something to say about each.`) +
    (keth ? mgSay('Keth', '"They want to see a Malazan try," Keth says. "I told them you would. The grandmother told them you would fall off." "*I said you might,*" the grandmother says.') : mgSay('A Wickan youth', '"Malazan. You ride? Three passes. You, then us. The feather does not care who you are."')) + (sathi ? mgSay('Sathi', '"I will ride beside you and tell you when," Sathi says, and grins with all her filed teeth. "Do what I say, not what the horse says."') : '');
  draw();
}

/* ---- the chapters' fires: the games offered, and what they leave behind ---- */
{ const wrap = (CH, id, f) => { const _n = CH.dlg[id]; if (!_n) return; CH.dlg[id] = () => { const n = _n(); return f(n) || n; }; };
  const after = (n, t, ch) => { const i = n.ch.findIndex(c => typeof c.t === 'string' && new RegExp(t).test(c.t)); n.ch.splice(i < 0 ? n.ch.length - 1 : i + 1, 0, ...ch); return n; }; // beside the squad's talk, before the ways on
  const back = id => [{t:'Back to the fire.', go:id}];
  /* Ch1: an Aren man's blanket in the barracks yard */
  if (typeof B4CH1 !== 'undefined') { wrap(B4CH1, 'b4_c1_yard', n => after(n, '^Talk with the squad', [{t:'An Aren man has three shells and a pea on a blanket, and the recruits\' pay in his hat. Sit in.', tag:'Shells', req:()=>S.silver >= 1 && (S.f.b4_shellsNet || 0) < B4G_SHELLCAP, go:()=>playShells({after:r => { S.f.b4_shellsLast = r; b4ShellsPay(r); talk('b4_c1_shells_after'); }})}]));
    B4CH1.dlg.b4_c1_shells_after = () => { const r = S.f.b4_shellsLast || {}; return {sp:'The Third\'s fire', scene:'b4_aren_yard', txt: !r.rounds ?
`You get up off the blanket without a stake down. The Aren man does not mind. He has a hundred recruits.` : r.called && r.won ?
`You get up off the blanket with the Aren man's silver, and a hundred recruits who saw his hand opened in front of them. By the time you are back at the fire the yard knows the story, and in the yard's version you broke his fingers. ${b4In('darrut') ? 'Darrut says he saw that game played on the quay when he was nine, by the same man\'s father, very likely. "The left hand," he says. "Always the left. The right is for the purse."' : b4In('haddat') ? 'Haddat says, in Hissari, a word for what he is, and then will not say it again in Malazan.' : 'Radde, passing, says that is the first useful thing a sergeant has done in this yard all week, and walks on before you can thank him.'}` : r.net > 0 ?
`You get up off the blanket ${r.net} silver heavier. The Aren man shakes your hand for the recruits to see, as if the two of you were in it together. Some of them believe it.` : r.net < 0 ?
`You get up off the blanket ${-r.net} silver lighter, and a recruit you have never seen before pats you on the back, and that tells you how bad it was. The Aren man has a smile for you as you go. He will have one for the 10th tomorrow.` :
`You get up off the blanket about where you sat down. The Aren man calls it a draw, and calls it loudly, for the recruits, as if a draw with a sergeant were a thing to boast of.`,
      ch:back('b4_c1_yard')}; };
    const j = B4CH1.journal; if (j) B4CH1.journal = () => { const x = j(), r = S.f.b4_shellsLast; if (r && r.rounds) x.unshift(r.called && r.won ? 'An Aren man ran shells for the recruits\' pay in the yard. The sergeant called his palm in front of all of them.' : 'An Aren man ran shells for the recruits\' pay in the yard. The sergeant sat in.'); return x; }; }
  /* Ch3: the Burned Tears' horn at the next fire */
  if (typeof B4CH3 !== 'undefined') { wrap(B4CH3, 'b4_c3_feast', n => after(n, '^Talk with the squad', [{t:'At the next fire the Burned Tears are passing a horn, and each who drinks stands up and boasts. Take the horn.', tag:'The Burned Tears\' cup', req:()=>!S.f.b4_c3_brawlDone, go:()=>playCup({after:r => { S.f.b4_cupLast = r; b4CupPay(r); talk('b4_c3_cup_after'); }})}]));
    B4CH3.dlg.b4_c3_cup_after = () => { const r = S.f.b4_cupLast || {}, orv = b4In('orvas'); return {sp:'The Third\'s fire', scene:'b4_feast', txt: !r.done ?
`You hand the horn on before it has been round. The Khundryl take it back without a word against you, and drink your share, which they had been hoping for.` : r.won ?
`You come back to the Third's fire with the cup still in your hand and the milk-spirit in your knees. The Khundryl at the next fire wave the horn at you every time it comes round, for the rest of the night. ${orv ? 'Orvas sits down beside you with his own horn, which is the first time he has sat inside the Third\'s firelight and not at the edge of it.' : b43ONear() ? 'Orvas, at the Khundryl fire, lifts his horn to you across the coals, and his whole fire lifts theirs.' : 'A Khundryl rider comes over later to ask which of the boasts were true. You tell him. He is disappointed, and drinks to it anyway.'}` :
`You come back to the Third's fire with milk-spirit on your shirt and ${r.regard ? 'some of the Khundryl\'s regard' : 'none of the Khundryl\'s regard to speak of'}. ${b4In('tangle') ? 'Tangle says he would have told them about the ford. You remind him there has not been a ford yet. He says he would have told them anyway.' : 'The squad tells you it was a good try. They are lying, kindly.'}`,
      ch:back('b4_c3_feast')}; };
    const j = B4CH3.journal; if (j) B4CH3.journal = () => { const x = j(), r = S.f.b4_cupLast; if (r && r.done) x.unshift(r.won ? 'At the Khundryl feast the sergeant drank the Burned Tears\' horn and boasted, and they gave the Third the cup for the night.' : 'At the Khundryl feast the sergeant drank the Burned Tears\' horn and boasted. The Khundryl were kind about it.'); return x; }; }
  /* Ch4: the Seti archers' sticks */
  if (typeof B4CH4 !== 'undefined') { wrap(B4CH4, 'b4_c4_setifire', n => after(n, '^Talk with the squad', [{t:'Two Seti archers by the fire have a heap of tally sticks and a marked bone between them. Sit across from them.', tag:'The hand game', go:()=>playHands({after:r => { S.f.b4_handsLast = r; b4HandsPay(r); talk('b4_c4_hands_after'); }})}]));
    B4CH4.dlg.b4_c4_hands_after = () => { const r = S.f.b4_handsLast || {}; return {sp:'The Seti fire', scene:'b4_seti_fire', txt: !r.done ?
`You leave the sticks before the heap is gone. The archers finish the game between themselves, and argue about whose turn it would have been.` : r.won ?
`The archers send you back to the Third's side of the fire with the sticks you won, which you are to keep, and are told to bring back tomorrow, so they can win them off you. Word goes round the awnings that the Chain squad sat the hand game with the wounded and took the sticks. Some of the wounded are still laughing at it when the cutters come round.${b4In('marrow') ? ` Marrow says laughing is good for them. "Not for the stitches, child. For the rest."` : ''}` : r.even ?
`Even, four and four. The archers are still arguing about it in Seti when you go, and both of them are winning.` :
`The archers keep the sticks, and the bone, and your reputation for a face. "Come back when you can lie," the one with the board says, and the wounded nearest the fire think that is the best thing anyone has said all day.`,
      ch:back('b4_c4_setifire')}; };
    const j = B4CH4.journal; if (j) B4CH4.journal = () => { const x = j(), r = S.f.b4_handsLast; if (r && r.done) x.unshift(r.won ? 'At the Seti fire the sergeant played the wounded archers\' hand game, and took the sticks.' : 'At the Seti fire the sergeant played the wounded archers\' hand game, and the archers kept the sticks.'); return x; }; }
  /* Ch5: the company's sappers in the lee of the rock */
  if (typeof B4CH5 !== 'undefined') { wrap(B4CH5, 'b4_c5_wallfire', n => after(n, '^Talk with the squad', [{t:'The Second Company\'s sapper is cutting fuse against a count in the lee of the rock. Cut a length.', tag:'The Fuse', go:()=>playFuse({after:r => { S.f.b4_fuseLast = r; b4FusePay(r); talk('b4_c5_fuse_after'); }})}]));
    B4CH5.dlg.b4_c5_fuse_after = () => { const r = S.f.b4_fuseLast || {}; return {sp:'The Third\'s fire', scene:'b4_wall_fire', txt: !r.done ?
`You give the knife back before the fifth length. The sapper goes on cutting without you, and does not seem to miss the company.` : r.won ?
`You come back round the rock with sand in your teeth and ${r.clean ? 'a sharper' : 'a smoker'} the company's sapper swears she never had. ${b4In('tangle') ? 'Tangle takes it off you and counts it into the satchel, and then counts the satchel, twice. "Off *her*," he says. "No one gets anything off her."' : 'The squad looks at it as if you had walked out of the Wall with it.'}` :
`You come back round the rock with sand in your teeth and nothing else. ${b4In('tangle') ? '"She cuts in her sleep," Tangle says. "I\'ve seen her. Cut, snore, cut."' : 'The company\'s sapper is still cutting when the fire burns down.'}`,
      ch:back('b4_c5_wallfire')}; };
    const j = B4CH5.journal; if (j) B4CH5.journal = () => { const x = j(), r = S.f.b4_fuseLast; if (r && r.done) x.unshift(r.won ? 'Short of the Wall the sergeant cut fuse against the Second Company\'s sapper, in the blown sand, and won a munition off her.' : 'Short of the Wall the sergeant cut fuse against the Second Company\'s sapper, in the blown sand. She kept her munitions.'); return x; }; }
  /* Ch6: Temul's youths behind the horse lines, by day */
  if (typeof B4CH6 !== 'undefined') { wrap(B4CH6, 'b4_c6_picketfire', n => after(n, '^Talk with the squad', [{t:()=>b4FeatherLead() ? 'Keth is over at the horse lines with Temul\'s youths, who are taking a crow feather off a stake at the gallop. Ride for it.' : 'Temul\'s youths are taking a crow feather off a stake at the gallop behind the horse lines. Ride for it.', tag:'The feather', req:()=>b46Ph() < 2, go:()=>playFeather({after:r => { S.f.b4_featherLast = r; b4FeatherPay(r); talk('b4_c6_feather_after'); }})}].map(c => Object.assign(c, {t:typeof c.t === 'function' ? c.t() : c.t}))));
    B4CH6.dlg.b4_c6_feather_after = () => { const r = S.f.b4_featherLast || {}, keth = b4FeatherLead(); return {sp:'The Third\'s fire', scene:b46Ph() >= 2 ? 'b4_c6_eve' : 'b4_picket', txt: !r.done ?
`You get down off the Wickan horse before the third pass. The horse is pleased. The youths are not, and say so, and go on without you.` : r.won ?
`You walk back to the fire with ${numw(r.mine || 0)} crow feather${r.mine === 1 ? '' : 's'} and dust to the knees. ${b4In('sathi') ? 'Sathi walks beside you with her arm round your neck, telling anyone who will listen that she taught you, which is not true, and that she taught the horse, which might be.' : keth ? 'Keth walks back with you. "They will talk about it," he says. "Wickans talk about everything. But they will talk about it more." The grandmother is quiet, which, Keth says, is her being impressed.' : 'Behind you the youths are already riding it again, and arguing about how you did it.'}` :
`You walk back to the fire with dust to the knees${r.mine ? ` and ${numw(r.mine)} feather${r.mine === 1 ? '' : 's'}` : ''}. The youths are still riding behind the horse lines, and every so often one of them takes the feather and holds it up toward the Third's fire, in case you were not watching.`,
      ch:back('b4_c6_picketfire')}; };
    const j = B4CH6.journal; if (j) B4CH6.journal = () => { const x = j(), r = S.f.b4_featherLast; if (r && r.done) x.unshift(r.won ? 'Before Pan\'arak the sergeant rode against Temul\'s youths for a crow feather at the gallop, and won.' : 'Before Pan\'arak the sergeant rode against Temul\'s youths for a crow feather at the gallop. The youths won, and said so.'); return x; }; }
}

/* what each game pays, once a book, paid as the table closes (a node's own fx runs once a save, and a game left early must not spend it) */
function b4ShellsPay(r){ if (!r || !r.called || !r.won || !S.f.b4_shellsCaught || S.f.b4_shellsPaid) return; S.f.b4_shellsPaid = 1; b4Nerve(1, 'The recruits saw the Aren man\'s hand opened'); save(); }
function b4CupPay(r){ if (!r || !r.done || !r.won || S.f.b4_cupPaid) return; S.f.b4_cupPaid = 1;
  if (b4In('orvas') || b43ONear()) { S.loy ??= {}; S.loy.orvas ??= 0; loy('orvas', 1); } else b4Nerve(1, 'The Khundryl drank with the Third'); save(); }
function b4HandsPay(r){ if (!r || !r.done || !r.won || S.f.b4_handsPaid) return; S.f.b4_handsPaid = 1; b4Nerve(1, 'The Seti wounded laughed with the Third'); save(); }
function b4FusePay(r){ if (!r || !r.done || !r.won || S.f.b4_fusePaid) return; S.f.b4_fusePaid = 1; const it = r.clean ? 'sharper' : 'smoker';
  S.inv[it] = (S.inv[it] || 0) + 1; note(`From the company's sapper: a ${it}.`, 'good'); save(); }
function b4FeatherPay(r){ if (!r || !r.done || !r.won || S.f.b4_featherPaid) return; S.f.b4_featherPaid = 1;
  if (b4In('sathi')) { S.loy.sathi ??= 0; loy('sathi', 1); } else if (b4FeatherLead()) { S.loy.warlock ??= 0; loy('warlock', 1); } else b4Nerve(1, 'The Wickan youths rode with the Third'); save(); }

/* ---- the Deeds page: Book Four's fires, under Nerve and Dust ---- */
{ const _x = typeof b4DeedsExtra === 'function' ? b4DeedsExtra : null;
  b4DeedsExtra = function(mine){ const base = _x ? _x(mine) : ''; const deeds = {}; mine.forEach(({s}) => Object.entries(s.deeds || {}).forEach(([k, v]) => deeds[k] = (deeds[k] || 0) + v)); const d = k => deeds[k] || 0;
    const cup = Math.max(0, ...mine.map(({s}) => (s.f && s.f.b4_cupBest) || 0)), fuse = Math.min(99, ...mine.map(({s}) => s.f && s.f.b4_fuseBest != null ? s.f.b4_fuseBest : 99));
    const fires = [['Shells', d('b4ShellsWon') || d('b4ShellsLost') ? `${d('b4ShellsWon')} won, ${d('b4ShellsLost')} lost${d('b4ShellsPalm') ? `, the palm called ${d('b4ShellsPalm') === 1 ? 'once' : d('b4ShellsPalm') + ' times'}` : ''}` : 'Not yet'],
      ['The Burned Tears\' cup', d('b4CupWon') || d('b4CupLost') ? `${d('b4CupWon') ? 'The cup, ' + (d('b4CupWon') === 1 ? 'once' : d('b4CupWon') + ' times') : 'Not the cup'}; best regard ${cup}` : 'Not yet'],
      ['The hand game', d('b4HandsWon') || d('b4HandsLost') || d('b4HandsEven') ? `${d('b4HandsWon')} won, ${d('b4HandsLost')} lost${d('b4HandsEven') ? `, ${d('b4HandsEven')} even` : ''}` : 'Not yet'],
      ['The Fuse', d('b4FuseWon') || d('b4FuseLost') ? `${d('b4FuseWon')} won, ${d('b4FuseLost')} lost; off by ${fuse.toFixed(1)} at best${d('b4FuseClean') ? ', all five on the count' : ''}` : 'Not yet'],
      ['The feather', d('b4FeatherWon') || d('b4FeatherLost') ? `${d('b4Feathers')} feather${d('b4Feathers') === 1 ? '' : 's'} taken; ${d('b4FeatherWon')} won, ${d('b4FeatherLost')} lost` : 'Not yet']];
    return base + `<h4 class="jh">At the fires</h4><div class="kv">${fires.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }; }
