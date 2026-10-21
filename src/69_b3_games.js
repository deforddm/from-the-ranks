/* ============ Book Three: the games at the fires (v6.13.0) ============ */
/* Five games for the march north, each in its own chapter, each played for what the book cares about: silver at Pale, munitions
   from the Moranth, the Alliance's trust, a Barghast's respect, and a clean crossing.
   - Bones with the Bridgeburners (Ch1, the Fourth's fire at Pale): Hedge, Picker and Antsy deal, on the Book One bones (36).
   - Moranth Hand-Talk (Ch2, the Host's wagons): a Black Moranth shows a run of hand-signs; give it back, longer each round.
   - The Shield Wall (Ch4, the fire west of Capustan): shields up on the count against the volleys, then the push.
   - Blood-Iron (Ch5, the dead village): a White Face's knife game, three throws each, power and wind.
   - The Crossing (Ch6): the dark lift through the gusts on the quorl road; the barge through the currents on the river road.
   They use the tables' frame (36: mgOpen, mgPanel, mgKeys, MG.anim) and keep their deeds on S.deeds (the Deeds page reads them). */

/* ---- a sky for the north: cold, with stars, and the Spawn where the chapter has it ---- */
const b3Sky = (ctx, W, H, t, o = {}) => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, o.day ? '#7a8294' : '#06070c'); g.addColorStop(.6, o.day ? '#aeb3b8' : '#10141c'); g.addColorStop(1, o.day ? '#6e6a5c' : '#1a1712'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (!o.day) { ctx.fillStyle = 'rgba(220,225,240,.5)'; for (let i = 0; i < 50; i++) ctx.fillRect(hash(i, 51)*W, hash(i, 52)*H*.45, 1, 1); } };
const b3Text = (ctx, s, x, y, sz, col = 'rgba(232,192,115,.9)', al = 'center') => { ctx.fillStyle = col; ctx.font = `600 ${Math.round(sz)}px 'Alegreya Sans SC', sans-serif`; ctx.textAlign = al; ctx.fillText(s, x, y); };
const b3GameOn = () => { const id = MG.gid; return () => MG.gid === id && mgOpenNow(); }; // a game's own timers stop when it closes (58b sets MG.gid)
const b3Pace = ms => (REDUCE() ? ms * .5 : ms) * Math.max(.4, SET.speed || 1);

/* ============ 1. Bones with the Bridgeburners ============
   Picker and Antsy take a hand on Book One's bones (36: BONES, BONES_CHAT, playBones). Picker banks steady and early; Antsy is sure
   the bones are out to get him and pushes anyway. The figures: Picker's from the visions (68b), Antsy a Bridgeburner (67b). */
FIGX.picker = (ctx, h, t, o) => (FIGX.b3v_picker || FIGX.b3_c7_bridgeburner || (() => {}))(ctx, h, t, o);
FIGX.antsy = (ctx, h, t, o) => (FIGX.b3_c7_bridgeburner || FIGX.b3v_picker || (() => {}))(ctx, h, t, o);
Object.assign(BONES, {
  picker:{name:'Picker', kind:'picker', push:(turn, me, you) => turn < (you >= BONES_GOAL - 8 ? 20 : me < you - 9 ? 16 : 11),
    lines:{start:['"Corporal\'s rules. I keep count, Antsy keeps quiet, Hedge keeps his hands where I can see them."', '"Sit. Two bones. Don\'t explain the odds to me, I\'ve heard Kettle\'s."'], bust:['"Skull." Her voice does not change at all.', '"That\'s a skull. That\'s fine."'], hood:['Picker stares at the two skulls. "Blend. Did you touch these."'], bank:['"Banked. That\'s how it\'s done, Sergeant."', '"Enough. I didn\'t get to corporal by pushing."'], big:['"Hm." She throws again, because the fire is warm and the night is long.'],
      win:['"Mine." She sweeps the silver up without looking at it. "Don\'t sulk. It\'s bad for the squad."', '"That\'s the pot. Antsy, stop grinning, you didn\'t win anything."'], lose:['"Well." Picker counts it out exact. "Spend it before Hedge borrows it."', '"Yours. I\'ll have it back off you at Coral."']}},
  antsy:{name:'Antsy', kind:'antsy', push:(turn, me, you) => turn < (me < you - 9 ? 19 : 9),
    lines:{start:['"I don\'t like it. I never like it. Throw."', '"These bones are cursed. I bought them off a Gadrobi. Throw."'], bust:['"See? SEE? I said."', '"Skull. Of course it\'s a skull. Why wouldn\'t it be a skull."'], hood:['Antsy puts his face in his hands. "We\'re going to die at Coral. I\'ve known it for a month."'], bank:['"Banking. Banking while I still can."', '"That\'s mine. Nobody touch it. Nobody *breathe* on it."'], big:['"It\'s going to turn. It always turns. One more."'],
      win:['"HA. Ha. Right. That didn\'t happen. It was luck. It\'ll never happen again."', '"Mine. Don\'t look at me like that, Sergeant, I need it more than you do, I can feel it."'], lose:['"Course. Course you did." He pays up like a man at a funeral.', '"Take it. Take it. Hood\'s going to take it off you anyway."']}},
});
Object.assign(BONES_CHAT, {
  picker:{name:'Picker', to:{meBust:['"Should have banked. I\'d have banked."'], meBig:['"Bank it, Sergeant. That\'s a corporal talking."'], meHood:['"Hood\'s eyes." She doesn\'t even look up. "Antsy, you\'re next, and if you say it I\'ll have you on latrines."'], meWin:['"Hedge, pay the Sergeant. No, *now*."']}},
  antsy:{name:'Antsy', to:{meBust:['"Told you. I TOLD you."'], meBig:['"Don\'t. Don\'t push it. Why do I even talk."'], meHood:['"Hood\'s EYES. That\'s an omen, that is. That\'s Coral, that is."'], meWin:['"The marine won. Of course the marine won. The bones hate me personally."']}},
});

/* ============ 2. Moranth Hand-Talk ============
   Six signs. The chitin guard shows a run of them, one after another; you give the run back. Each round the run is longer, and each
   round you give back whole wins something off the crate. One slip and the Moranth turns away. With the Hand-Talk trick (62) the
   signs are shown slower and one slip a round is forgiven: you know the hands. */
const HANDSIGNS = [
  {id:'flat', name:'the flat hand', key:'1', draw:(c, s) => { c.fillRect(-s*.32, -s*.12, s*.64, s*.24); }},
  {id:'turn', name:'the hand turned', key:'2', draw:(c, s) => { c.save(); c.rotate(.7); c.fillRect(-s*.3, -s*.1, s*.6, s*.2); c.restore(); }},
  {id:'two', name:'two fingers, down', key:'3', draw:(c, s) => { c.fillRect(-s*.16, -s*.34, s*.1, s*.68); c.fillRect(s*.06, -s*.34, s*.1, s*.68); }},
  {id:'fist', name:'the fist', key:'4', draw:(c, s) => { c.beginPath(); c.arc(0, 0, s*.26, 0, 7); c.fill(); }},
  {id:'cross', name:'wrists crossed', key:'5', draw:(c, s) => { c.save(); c.rotate(.8); c.fillRect(-s*.34, -s*.07, s*.68, s*.14); c.rotate(-1.6); c.fillRect(-s*.34, -s*.07, s*.68, s*.14); c.restore(); }},
  {id:'point', name:'one finger, up', key:'6', draw:(c, s) => { c.fillRect(-s*.05, -s*.36, s*.1, s*.5); c.fillRect(-s*.2, s*.1, s*.4, s*.18); }},
];
const HAND_ROUNDS = [{n:3, prize:null, word:'a tilt of the helm'}, {n:4, prize:'sharper', word:'a sharper'}, {n:5, prize:'burner', word:'a burner'}, {n:6, prize:'smoker', word:'a smoker'}, {n:7, prize:'cusser', word:'a cusser'}];
function playHandTalk(opt = {}){
  const knows = !!(S.tricks && S.tricks.b3_c2_hand), pick = a => a[R(a.length)]; let on = () => true;
  const g = MG.state = {round:0, seq:[], at:0, phase:'intro', given:[], slips:0, won:0, over:false, lit:-1, litT:0, talk:'', last:''};
  const prizes = () => HAND_ROUNDS.slice(0, g.won).map(r => r.prize).filter(Boolean);
  mgOpen({kick:'The Host\'s wagons · the third crate', title:'Moranth Hand-Talk', leaveText:'Step back from the crate', done:r => opt.after && opt.after(r),
    leave:() => finish(false)}); on = b3GameOn();
  const say = (who, line) => { g.talk = mgSay(who, line); draw(); };
  const draw = () => { const RD = HAND_ROUNDS[g.round];
    mgPanel(`<div class="cpbar"><span>Run ${g.round + 1} of ${HAND_ROUNDS.length}</span><span>${RD.n} signs</span><span>For: <b>${RD.word}</b></span></div>
      ${g.talk}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="htDone" data-bot="1">Back to the wagons</button>` : g.phase === 'intro' ? `<button class="btn primary" id="htGo" data-bot="1">Watch the hands</button>` : g.phase === 'won' ? `<button class="btn primary" id="htNext" data-bot="1">The next run</button><button class="btn" id="htStop" data-bot="1">Enough. Keep what you have.</button>` : g.phase === 'answer' ? `<span class="fine">Give it back: tap the signs in the order shown${knows ? ' (you know the hands: one slip a run is forgiven)' : ''}.</span>` : `<span class="fine">Watch.</span>`}</div>
      <p class="hint keys"><kbd>1</kbd>–<kbd>6</kbd> the signs · <kbd>Space</kbd> go on · <kbd>Esc</kbd> step back</p>`);
    if ($('#htGo')) $('#htGo').onclick = () => { AUDIO.play('click'); show(); };
    if ($('#htNext')) $('#htNext').onclick = () => { AUDIO.play('click'); g.round++; show(); };
    if ($('#htStop')) $('#htStop').onclick = () => { AUDIO.play('click'); finish(true); };
    if ($('#htDone')) $('#htDone').onclick = () => { AUDIO.play('click'); mgClose({won:g.won, prizes:prizes(), all:g.won >= HAND_ROUNDS.length}); }; };
  const show = () => { const RD = HAND_ROUNDS[g.round]; g.seq = []; for (let i = 0; i < RD.n; i++) { let k; do { k = R(HANDSIGNS.length); } while (i && k === g.seq[i - 1]); g.seq.push(k); }
    g.given = []; g.slips = 0; g.phase = 'show'; g.at = 0; g.talk = mgSay('', g.round ? 'The guard\'s hands again. Longer.' : 'The guard lifts a hand. Then another sign, and another.'); draw();
    const step = () => { if (!on()) return; if (g.at >= g.seq.length) { g.lit = -1; g.phase = 'answer'; g.talk = mgSay('', 'Now you.'); draw(); return; } g.lit = g.seq[g.at]; g.litT = performance.now(); AUDIO.play('pick'); g.at++; setTimeout(step, b3Pace(knows ? 820 : 620)); };
    setTimeout(step, b3Pace(500)); };
  const give = k => { if (g.phase !== 'answer' || g.over) return; const i = g.given.length, want = g.seq[i]; g.lit = k; g.litT = performance.now();
    if (k !== want) { if (knows && !g.slips) { g.slips++; AUDIO.play('miss'); g.talk = mgSay('', `Not that one: ${HANDSIGNS[want].name}. The helm tilts, a little, and waits.`); draw(); return; }
      AUDIO.play('lose'); g.phase = 'lost'; g.over = true; mgDeed('b3HandLost'); g.talk = mgSay('', `${HANDSIGNS[want].name[0].toUpperCase() + HANDSIGNS[want].name.slice(1)}, not ${HANDSIGNS[k].name}. The guard lowers its hands and turns back to the crate, and that is all the Moranth has to say to you tonight.${g.won ? ` What you won, you keep.` : ''}`); draw(); return; }
    g.given.push(k); AUDIO.play('pick'); if (g.given.length < g.seq.length) { draw(); return; }
    const RD = HAND_ROUNDS[g.round]; g.won = g.round + 1; AUDIO.play('up');
    if (RD.prize) { S.inv[RD.prize] = (S.inv[RD.prize] || 0) + 1; note(`From the crate: ${RD.word}.`, 'good'); }
    mgDeed('b3Hand'); S.f.b3_handBest = Math.max(S.f.b3_handBest || 0, g.won);
    if (g.round >= HAND_ROUNDS.length - 1) { g.over = true; mgDeed('b3HandAll'); g.talk = mgSay('', `The whole run, back without a slip. The guard stands very still. Then it reaches into the crate, takes out ${RD.word}, and puts it in your hands as if that were a thing Moranth did. ${b3In('kettle') ? 'Kettle makes a small noise.' : 'Nobody in the Host will believe you.'}`); draw(); return; }
    g.phase = 'won'; g.talk = mgSay('', RD.prize ? `Right, all ${RD.n}. The guard reaches into the crate and sets ${RD.word} on the tailboard, and lifts a hand again: another run, if you want it.` : `Right, all three. The helm tilts, which is as much as a Moranth says. It lifts a hand again.`); draw(); };
  const finish = kept => { if (g.over) return mgClose({won:g.won, prizes:prizes(), all:g.won >= HAND_ROUNDS.length}); g.over = true; mgClose({won:g.won, prizes:prizes(), left:!kept && !g.won, all:false}); };
  const geo = () => { const W = MG.W, H = MG.H, s = Math.min(W / 7.4, H * .2), y = H * .78, x0 = W / 2 - s * 3.1; return {s, y, x0}; };
  MG.cv.onpointerdown = e => { const r = MG.cv.getBoundingClientRect(), {s, y, x0} = geo(), px = e.clientX - r.left, py = e.clientY - r.top; if (Math.abs(py - y) > s * .55) return; const k = Math.floor((px - x0) / (s * 1.05)); if (k >= 0 && k < HANDSIGNS.length) give(k); };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, {s, y, x0} = geo();
    b3Sky(ctx, W, H, t, {day:true});
    ctx.fillStyle = '#4a4034'; ctx.fillRect(0, H * .5, W, H); ctx.fillStyle = '#6a5a44'; ctx.fillRect(W * .1, H * .34, W * .8, H * .2); ctx.fillStyle = '#2a2622'; for (let i = 0; i < 3; i++) ctx.fillRect(W * (.2 + i * .25), H * .34, 6, H * .2); // the tailboard of the wagon, its straps
    ctx.fillStyle = '#16140f'; ctx.fillRect(W * .4, H * .2, W * .2, H * .16); ctx.strokeStyle = '#7a7060'; ctx.lineWidth = 2; ctx.strokeRect(W * .4, H * .2, W * .2, H * .16); ctx.beginPath(); ctx.moveTo(W * .4, H * .28); ctx.lineTo(W * .6, H * .28); ctx.stroke(); ctx.fillStyle = '#e8c073'; ctx.fillRect(W * .49, H * .25, 8, 6); // the crate, sealed
    const fs = clamp(H / 110, 2, 3.6); drawFigure(ctx, 'b3_moranth', W * .3, H * .5, fs, t, {still:true, dir:1}); drawFigure(ctx, 'sgt', W * .7, H * .52, fs, t, {still:true, dir:-1});
    // the guard's hand, lit with the sign it makes
    const lit = g.lit >= 0 && performance.now() - g.litT < (g.phase === 'show' ? b3Pace(knows ? 700 : 520) : 350);
    HANDSIGNS.forEach((h, i) => { const cx = x0 + i * s * 1.05 + s / 2, cy = y, isLit = lit && g.lit === i, given = g.phase === 'answer' && g.given.includes(i) && g.given[g.given.length - 1] === i && lit;
      ctx.fillStyle = isLit ? '#2a2418' : '#121010'; ctx.fillRect(cx - s / 2, cy - s / 2, s, s); ctx.strokeStyle = isLit ? '#e8c073' : 'rgba(232,192,115,.35)'; ctx.lineWidth = isLit ? 2.5 : 1; ctx.strokeRect(cx - s / 2 + 1, cy - s / 2 + 1, s - 2, s - 2);
      if (isLit) glow(ctx, cx, cy, s * .9, '#e8c073', .25);
      ctx.save(); ctx.translate(cx, cy); ctx.fillStyle = isLit ? '#ffe3a0' : '#9a8a6a'; h.draw(ctx, s); ctx.restore();
      b3Text(ctx, h.key, cx - s / 2 + 7, cy - s / 2 + 13, s * .18, 'rgba(232,192,115,.5)', 'left'); });
    if (g.phase === 'answer') for (let i = 0; i < g.seq.length; i++) { ctx.fillStyle = i < g.given.length ? '#e8c073' : 'rgba(232,192,115,.25)'; ctx.beginPath(); ctx.arc(W / 2 + (i - (g.seq.length - 1) / 2) * 14, y - s * .75, 4, 0, 7); ctx.fill(); }
    if (g.phase === 'show') for (let i = 0; i < g.seq.length; i++) { ctx.fillStyle = i < g.at ? '#e8c073' : 'rgba(232,192,115,.25)'; ctx.beginPath(); ctx.arc(W / 2 + (i - (g.seq.length - 1) / 2) * 14, y - s * .75, 4, 0, 7); ctx.fill(); }
  };
  mgKeys(Object.assign({' ':() => { const b = $('#htGo') || $('#htNext') || $('#htDone'); b && b.click(); }}, Object.fromEntries(HANDSIGNS.map((h, i) => [h.key, () => give(i)]))));
  g.talk = mgSay('', `The chitin guard by the third crate has been watching your hands since you came up. Now it lifts one of its own, flat, and holds it there: the start of something. ${knows ? `You know this. You learned it at the quorl lines.` : `Kettle, under her breath: "It's talking. Sergeant. It's *talking* to you."`}`);
  draw();
}

/* ============ 3. The Shield Wall ============
   Volleys come in: an arrow falls, and the shields go up when it reaches the line, not before and not after. Three volleys, each
   faster. Then the push, on three. Held arrows and a clean push are the Alliance's trust and a Grey Sword's regard. */
function playShieldWall(opt = {}){
  const dannet = b3In('greysword'), who = dannet ? 'Dannet' : 'The drill-sergeant', pick = a => a[R(a.length)]; let on = () => true;
  const VOLLEYS = [{n:4, gap:900}, {n:5, gap:760}, {n:6, gap:640}];
  const g = MG.state = {phase:'intro', volley:0, arrows:[], held:0, total:0, hits:[], flash:0, up:0, push:null, pushed:null, over:false, talk:'', t0:0};
  mgOpen({kick:'West of Capustan · the lines', title:'The Shield Wall', leaveText:'Fall out', done:r => opt.after && opt.after(r), leave:() => finish(true)}); on = b3GameOn();
  const say = (who, line) => { g.talk = mgSay(who, line); draw(); };
  const draw = () => mgPanel(`<div class="cpbar"><span>Volley ${Math.min(g.volley + 1, VOLLEYS.length)} of ${VOLLEYS.length}</span><span>Held: <b>${g.held}</b> of ${g.total}</span><span>${g.push ? 'The push' : ''}</span></div>
      ${g.talk}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="swDone" data-bot="1">Fall out</button>` : g.phase === 'intro' || g.phase === 'between' ? `<button class="btn primary" id="swGo" data-bot="1">${g.phase === 'intro' ? 'Shields.' : 'Ready.'}</button>` : `<button class="btn primary" id="swUp" data-bot="1">${g.push ? 'PUSH' : 'Shields up'}</button>`}</div>
      <p class="fine">Tap when the arrow reaches the line (or tap the line itself). Early and the shield is down again when it lands; late and it is through. Then the push, on three.</p>
      <p class="hint keys"><kbd>Space</kbd> shields up / push · <kbd>Esc</kbd> fall out</p>`),
    bind = () => { if ($('#swGo')) $('#swGo').onclick = () => { AUDIO.play('click'); start(); }; if ($('#swUp')) $('#swUp').onclick = up; if ($('#swDone')) $('#swDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const result = () => ({held:g.held, total:g.total, pushed:!!g.pushed, done:g.over && g.volley >= VOLLEYS.length});
  const start = () => { if (g.over) return; const V = VOLLEYS[g.volley]; g.phase = 'volley'; g.t0 = performance.now(); g.arrows = []; for (let i = 0; i < V.n; i++) g.arrows.push({at:g.t0 + b3Pace(1200 + i * V.gap + (hash(i, g.volley, 7) - .5) * 160), x:.2 + hash(i, g.volley, 9) * .6, done:false, held:false});
    g.total += V.n; g.talk = mgSay(who, pick(['"Volley!"', '"Heads down. Wait for it."', '"On the line. *Wait.*"'])); redraw(); setTimeout(tick, 50); };
  const tick = () => { if (!on() || g.phase !== 'volley') return; const now = performance.now(); let any = false;
    g.arrows.forEach(a => { if (a.done) return; any = true; if (now > a.at + b3Pace(170)) { a.done = true; a.held = false; g.hits.push(now); AUDIO.play('hurt'); } });
    if (!any) { setTimeout(endVolley, b3Pace(500)); return; } setTimeout(tick, 40); };
  const up = () => { if (g.over) return; if (g.push) return pushNow(); if (g.phase !== 'volley') return; const now = performance.now(); g.up = now; const a = g.arrows.find(a => !a.done && Math.abs(now - a.at) <= b3Pace(170));
    if (a) { a.done = true; a.held = true; g.held++; AUDIO.play('blunt'); } else { AUDIO.play('miss'); } };
  const endVolley = () => { if (!on() || g.over) return; g.volley++; const V = VOLLEYS[g.volley - 1], heldThis = g.arrows.filter(a => a.held).length;
    if (g.volley >= VOLLEYS.length) { g.phase = 'push'; g.push = {t0:performance.now(), at:performance.now() + b3Pace(2400)}; g.talk = mgSay(who, `"${heldThis === V.n ? 'Good. ' : ''}Now the push. On three. Not two. Not four." A breath. "One."`); redraw(); setTimeout(() => { if (on() && g.push && !g.pushed) { g.talk = mgSay(who, '"Two."'); redraw(); } }, b3Pace(800)); setTimeout(() => { if (on() && g.push && g.pushed === null) { g.talk = mgSay(who, '"*Three.*"'); redraw(); } }, b3Pace(1600)); setTimeout(() => { if (on() && g.push && g.pushed === null) pushNow(true); }, b3Pace(2400 + 350)); return; }
    g.phase = 'between'; g.talk = mgSay(who, heldThis === V.n ? pick(['"All of them. Again, and faster."', '"Clean. They\'ll come quicker now."']) : heldThis >= V.n - 1 ? pick(['"One through. One is a man down. Again."', '"Nearly. Nearly is a widow. Again."']) : pick(['"That line is full of holes. Again."', `"${numw(V.n - heldThis, true)} through. Shields *up*, when it *lands*. Again."`])); redraw(); };
  const pushNow = late => { if (!g.push || g.pushed !== null) return; const d = performance.now() - g.push.at; g.pushed = !late && Math.abs(d) <= b3Pace(260); g.over = true;
    AUDIO.play(g.pushed ? 'up' : 'blunt'); const frac = g.held / Math.max(1, g.total); mgDeed('b3Shield'); S.f.b3_shieldBest = Math.max(S.f.b3_shieldBest || 0, Math.round(frac * 100)); if (g.pushed && frac >= .9) mgDeed('b3ShieldClean');
    g.talk = mgSay(who, g.pushed ? (frac >= .9 ? '"*That* is a line." A pause that, from a Grey Sword, is a decoration. "The Shield Anvil would have you."' : frac >= .6 ? '"The push was right. The shields want work. Tomorrow, again."' : '"The push was right. The rest of it was a sieve. Tomorrow, again."') : late ? '"Three was a breath ago. The push goes without you and the line has a hole in it where a sergeant should be."' : (d < 0 ? '"That was two. On two you are alone in front of the line, and dead."' : '"Late. The line went. You followed. Followers die second."')); redraw(); };
  const finish = early => { if (g.over) return mgClose(result()); g.over = true; mgClose(Object.assign(result(), {left:early})); };
  const geo = () => { const W = MG.W, H = MG.H; return {W, H, lineY:H * .64}; };
  MG.cv.onpointerdown = () => up();
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const {W, H, lineY} = geo(), now = performance.now();
    b3Sky(ctx, W, H, t, {day:true}); ctx.fillStyle = '#4e4a3c'; ctx.fillRect(0, H * .5, W, H); ctx.fillStyle = 'rgba(255,255,255,.08)'; for (let i = 0; i < 30; i++) ctx.fillRect(hash(i, 61) * W, H * .5 + hash(i, 62) * H * .5, 2, 1); // frozen ground
    ctx.strokeStyle = 'rgba(232,192,115,.5)'; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(W * .08, lineY); ctx.lineTo(W * .92, lineY); ctx.stroke(); ctx.setLineDash([]); // the line
    const fs = clamp(H / 120, 1.6, 3), ids = SQUAD().slice(0, 5); ids.forEach((id, i) => drawFigure(ctx, id, W * (.2 + i * .15), lineY + fs * 14, fs, t, {still:true, dir:1}));
    if (now - g.up < 180) { ctx.fillStyle = 'rgba(200,210,230,.35)'; ctx.fillRect(W * .1, lineY - fs * 10, W * .8, fs * 12); } // the shields come up
    ctx.fillStyle = 'rgba(232,192,115,.1)'; ctx.fillRect(W * .08, lineY - 10, W * .84, 20); // the band: shields up while the arrow is in it
    g.arrows.forEach(a => { const k = clamp((now - (a.at - b3Pace(1200))) / b3Pace(1200), 0, 1.25), y = -24 + k * (lineY + 24), x = a.x * W;
      if (a.done) { if (now - a.at < 700) b3Text(ctx, a.held ? 'held' : 'through', x, lineY - 16 - (now - a.at) / 25, 13, a.held ? '#9fe0b8' : '#e08070'); if (a.held || now - a.at > 500) return; }
      ctx.save(); ctx.translate(x, y); ctx.strokeStyle = a.done ? '#8a3a30' : '#e8e0d0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, 0); ctx.stroke(); ctx.fillStyle = '#c8c8c8'; ctx.beginPath(); ctx.moveTo(-4, -2); ctx.lineTo(4, -2); ctx.lineTo(0, 8); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#9a7a4a'; ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(-5, -38); ctx.lineTo(0, -34); ctx.lineTo(5, -38); ctx.closePath(); ctx.fill(); ctx.restore(); });
    g.hits.forEach(h => { if (now - h < 400) { ctx.fillStyle = `rgba(160,40,30,${.35 * (1 - (now - h) / 400)})`; ctx.fillRect(0, 0, W, H); } });
    if (g.push) { const k = clamp((now - g.push.t0) / (g.push.at - g.push.t0), 0, 1.3); b3Text(ctx, g.pushed === null ? (k < .34 ? 'ONE' : k < .67 ? 'TWO' : 'THREE') : g.pushed ? 'THE LINE GOES FORWARD' : 'THE LINE GOES WITHOUT YOU', W / 2, H * .3, Math.min(34, W * .07), g.pushed ? '#9fe0b8' : 'rgba(232,192,115,.9)'); ctx.fillStyle = 'rgba(232,192,115,.5)'; ctx.fillRect(W * .2, H * .36, W * .6 * Math.min(1, k), 4); }
  };
  mgKeys({' ':() => { const b = $('#swGo') || $('#swDone'); if (b) b.click(); else up(); }, Enter:() => { const b = $('#swGo') || $('#swDone'); b && b.click(); }});
  g.talk = mgSay(who, dannet ? `"The Grey Swords drill at every halt. You will not like it." Dannet has her shield on her arm already. "Shields come up when the arrow reaches the line. Not when you see it. When it *reaches*. Then the push, on my count."` : `A Grey Sword with a drill-sergeant's voice and no patience in it has the Host's squads in a line on the frozen ground. "Marines. Shields come up when the arrow reaches the line. Not when you see it. Then the push, on my count. You will not like it."`);
  redraw();
}

/* ============ 4. Blood-Iron ============
   A White Face Barghast and a knife and a post. Three throws each, nearest the mark takes the round, two rounds takes the game.
   The power is a swing you stop with a tap; the wind is told you before the throw, and it moves the knife. The Barghast knows the wind. */
function playBloodIron(opt = {}){
  const pick = a => a[R(a.length)], name = 'Hetan\'s cousin'; let on = () => true;
  const g = MG.state = {round:0, mine:[], his:[], wind:0, phase:'intro', swing:0, power:null, knife:null, over:false, talk:'', wins:0, losses:0, mark:.72};
  mgOpen({kick:'The dead village · a White Face fire', title:'Blood-Iron', leaveText:'Leave the post to him', done:r => opt.after && opt.after(r), leave:() => finish(true)}); on = b3GameOn();
  const windWord = w => Math.abs(w) < .15 ? 'Still air. No wind to speak of.' : `${Math.abs(w) > .6 ? 'A hard wind' : Math.abs(w) > .35 ? 'A steady wind' : 'A breath'} from the ${w < 0 ? 'left' : 'right'}.`;
  const draw = () => mgPanel(`<div class="cpbar"><span>Round ${Math.min(g.round + 1, 3)} of 3</span><span>You ${g.wins} · ${g.losses} him</span><span>${windWord(g.wind)}</span></div>
      ${g.talk}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="biDone" data-bot="1">Back to the fire</button>` : g.phase === 'intro' || g.phase === 'between' ? `<button class="btn primary" id="biGo" data-bot="1">${g.phase === 'intro' ? 'Take the knife' : 'Again'}</button>` : g.phase === 'aim' ? `<button class="btn primary" id="biThrow" data-bot="1">Throw</button>` : `<span class="fine">The knife is in the air.</span>`}</div>
      <p class="fine">The swing is the power: stop it near the post's distance. The wind carries the knife with it; the harder the wind, the more you throw against it. Nearest the post takes the round.</p>
      <p class="hint keys"><kbd>Space</kbd> throw · <kbd>Esc</kbd> leave it</p>`),
    bind = () => { if ($('#biGo')) $('#biGo').onclick = () => { AUDIO.play('click'); aim(); }; if ($('#biThrow')) $('#biThrow').onclick = throwIt; if ($('#biDone')) $('#biDone').onclick = () => { AUDIO.play('click'); mgClose(result()); }; },
    redraw = () => { draw(); bind(); };
  const result = () => ({won:g.wins > g.losses && g.over, wins:g.wins, losses:g.losses, done:g.over});
  const aim = () => { if (g.over) return; g.wind = (R(2) ? 1 : -1) * (.15 + Math.random() * .7); if (Math.random() < .2) g.wind = 0; g.phase = 'aim'; g.swing = performance.now(); g.knife = null; g.talk = mgSay('', `${windWord(g.wind)} The post is where it was.`); redraw(); };
  const land = (power, wind) => clamp(power + wind * .22, 0, 1.1);
  const throwIt = () => { if (g.phase !== 'aim' || g.over) return; const k = (Math.sin((performance.now() - g.swing) / b3Pace(700)) + 1) / 2; g.phase = 'fly'; g.power = k; AUDIO.play('spear');
    const mine = land(k, g.wind); g.knife = {t0:performance.now(), from:.08, to:mine, who:'me'}; redraw();
    setTimeout(() => { if (!on()) return; const his = land(g.mark + (Math.random() - .5) * .16, 0); g.knife = {t0:performance.now(), from:.08, to:his, who:'his'}; AUDIO.play('spear');
      setTimeout(() => { if (!on()) return; g.mine.push(mine); g.his.push(his); const dm = Math.abs(mine - g.mark), dh = Math.abs(his - g.mark), won = dm < dh; if (won) g.wins++; else g.losses++; g.round++;
        const say = won ? pick(['He looks at your knife and then at you, and grunts. It is the first civil thing he has said.', '"Hm." He pulls both knives. "Again."', 'The Barghast spits, not at you. That is respect, among the White Faces.']) : pick(['His knife stands in the post a finger from the mark. Yours is in the dirt. He does not laugh, which is worse.', '"The wind," he says, as if you had never heard of it.', '"Closer." He is not talking to you.']);
        if (g.wins >= 2 || g.losses >= 2 || g.round >= 3) { g.over = true; const W = g.wins > g.losses; mgDeed(W ? 'b3BloodWon' : 'b3BloodLost'); AUDIO.play(W ? 'win' : 'lose');
          g.talk = mgSay('', say) + mgSay(name, W ? '"Blood-iron." He says it the way another man says a name. "You throw like a Barghast with a bad arm. It is not an insult. We have few good arms." He pulls your knife out of the post and gives it back hilt first.' : '"Malazan steel, Malazan arm." He pulls his knife out of the post. "Come back when you have a Barghast one. Or a Barghast."'); redraw(); return; }
        g.phase = 'between'; g.talk = mgSay('', say); redraw(); }, b3Pace(900)); }, b3Pace(1000)); };
  const finish = early => { if (g.over) return mgClose(result()); g.over = true; mgClose(Object.assign(result(), {left:early})); };
  MG.cv.onpointerdown = () => { if (g.phase === 'aim') throwIt(); };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, gy = H * .68, now = performance.now();
    b3Sky(ctx, W, H, t); ctx.fillStyle = '#2a2622'; ctx.fillRect(0, gy, W, H); glow(ctx, W * .12, gy, W * .4, '#e8923a', .25 + Math.sin(t / 130) * .04);
    const X = f => W * .06 + f * W * .86; ctx.fillStyle = '#5a4a34'; ctx.fillRect(X(g.mark) - 8, gy - H * .32, 16, H * .32); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(X(g.mark) + 4, gy - H * .32, 4, H * .32); ctx.fillStyle = '#e8c073'; ctx.fillRect(X(g.mark) - 9, gy - H * .17, 18, 5); // the post, the mark
    const fs = clamp(H / 120, 1.6, 3); drawFigure(ctx, 'sgt', X(.06), gy + fs * 12, fs, t, {still:true, dir:1}); drawFigure(ctx, 'b3_barghast', X(.16), gy + fs * 13, fs, t, {still:true, dir:1});
    // the wind: a pennant on the post
    ctx.strokeStyle = '#d8d0c0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(g.mark), gy - H * .3); ctx.lineTo(X(g.mark) + g.wind * W * .08 + Math.sin(t / 200) * 3 * Math.abs(g.wind), gy - H * .3 + 10 - Math.abs(g.wind) * 6); ctx.stroke();
    // knives that have landed, and the one in the air
    const drawKnife = (f, col) => { ctx.save(); ctx.translate(X(f), gy); ctx.rotate(-.9); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(4, -8); ctx.lineTo(0, -22); ctx.lineTo(-4, -8); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-3, 4, 6, 10); ctx.fillRect(-6, 3, 12, 3); ctx.restore(); };
    g.mine.forEach(f => drawKnife(f, '#b8b8c0')); g.his.forEach(f => drawKnife(f, '#8a5a3a'));
    if (g.knife) { const k = clamp((now - g.knife.t0) / b3Pace(850), 0, 1), f = g.knife.from + (g.knife.to - g.knife.from) * k, y = gy - Math.sin(k * Math.PI) * H * .35 - 8; ctx.save(); ctx.translate(X(f), y); ctx.rotate(k * 9); ctx.fillStyle = g.knife.who === 'me' ? '#d8d8e0' : '#a07a4a'; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(2, -3); ctx.lineTo(12, 0); ctx.lineTo(2, 3); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#3a2a1c'; ctx.fillRect(-14, -2, 6, 4); ctx.restore(); if (k >= 1 && g.knife.who === 'me' && !g.knife.landed) { g.knife.landed = 1; AUDIO.play('blunt'); } }
    if (g.phase === 'aim') { const k = (Math.sin((now - g.swing) / b3Pace(700)) + 1) / 2; ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(W * .06, H * .1, W * .86, 14); ctx.fillStyle = '#e8c073'; ctx.fillRect(W * .06, H * .1, W * .86 * k, 14); ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.moveTo(X(g.mark - g.wind * .22), H * .08); ctx.lineTo(X(g.mark - g.wind * .22), H * .1 + 18); ctx.stroke(); b3Text(ctx, 'the throw', W * .06, H * .1 - 4, 12, 'rgba(232,192,115,.7)', 'left'); }
  };
  mgKeys({' ':() => { const b = $('#biGo') || $('#biDone'); if (b) b.click(); else throwIt(); }});
  g.talk = mgSay(name, `A White Face Barghast at the next fire, with a post hammered into the dirt and a knife he has been throwing at it all evening, looks round. "Malazan. You throw?" He pulls the knife out of the post. "Three each. Nearest the mark. If you lose you are a Malazan, which you were already."`);
  redraw();
}

/* ============ 5. The Crossing ============
   The quorl road: the practice lift at the roost, through the gusts off the mountain, one count at a time. The river road: the
   barge across the Maurik in the dark, through the currents. One game, two skins. A gust or a current that catches you costs a
   count and sets you back; across in few counts and untouched is a clean crossing. The next count's gusts are shown faint. */
const CROSSING = {
  quorl:{kick:'The roost at the ledge', title:'The dark lift', leave:'Climb down', goal:'the far ledge', hazard:'gust', hazards:'the gusts', back:'The gust takes the quorl a length back down the mountain, and the roost-master\'s voice comes up after it.', clean:'The far ledge, and not one gust has had you. The roost-master clicks once, which from a Moranth is a speech.', over:'The far ledge. The quorl folds its wings. You are shaking, a little, and so is it.', fig:'quorl', rows:9, cols:9},
  barge:{kick:'The Maurik · the slips', title:'The night barge', leave:'Hand the pole back', goal:'the far bank', hazard:'current', hazards:'the currents', back:'The current has the barge and turns it, and you lose a length of river before the pole finds bottom again.', clean:'The far bank, dry, and the bargemen looking at you the way bargemen look at a marine who can pole. It does not happen often.', over:'The far bank. The barge grinds on the gravel. The bargeman takes his pole back without a word, which is a bargeman\'s thanks.', fig:'barge', rows:9, cols:9},
};
function playCrossing(opt = {}){
  const M = CROSSING[opt.mode] || CROSSING.quorl, rows = M.rows, cols = M.cols, pick = a => a[R(a.length)];
  const start = {x:Math.floor(cols / 2), y:rows - 1}, g = MG.state = {pos:{...start}, t:0, caught:0, over:false, flash:0, moves:0, talk:'', trail:[]};
  const bands = t => { const out = new Set(); for (let r = 1; r < rows - 1; r++) { const phase = (t + r * 2 + Math.floor(r / 3)) % 4; if (phase === 0) { const w = 2 + (hash(r, 3, 77) * 3 | 0), x0 = Math.floor(hash(r, t, 78) * (cols - w)); for (let x = x0; x < x0 + w; x++) out.add(K(x, r)); } } return out; };
  mgOpen({kick:M.kick, title:M.title, leaveText:M.leave, arrows:true, done:r => opt.after && opt.after(r), leave:() => mgClose({done:false, caught:g.caught, counts:g.t})});
  const can = (x, y) => y >= 0 && y < rows && x >= 0 && x < cols;
  const draw = () => mgPanel(`<div class="cpbar"><span>Count ${g.t}</span><span>Caught: <b class="${g.caught ? 'warnc' : ''}">${g.caught}</b></span><span>${g.moves} moves</span></div>
      ${g.talk}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="crDone" data-bot="1">${opt.mode === 'barge' ? 'Up the bank' : 'Down off the quorl'}</button>` : `<button class="btn" id="crWait" data-bot="1">Hold (wait a count)</button>`}</div>
      <p class="fine">Tap a square next to you to move (diagonals too). Every move is a count. End a count in ${M.hazards} and you are caught and set back. The faint squares are where ${M.hazards} will be on the next count.</p>
      <p class="hint keys"><kbd>←</kbd><kbd>↑</kbd><kbd>→</kbd><kbd>↓</kbd> move · <kbd>Space</kbd> hold · <kbd>Esc</kbd> ${M.leave.toLowerCase()}</p>`),
    bind = () => { if ($('#crWait')) $('#crWait').onclick = () => step(0, 0); if ($('#crDone')) $('#crDone').onclick = () => { AUDIO.play('click'); mgClose({done:true, caught:g.caught, counts:g.t, clean:!g.caught && g.t <= 14}); }; },
    redraw = () => { draw(); bind(); };
  const step = (dx, dy) => { if (g.over) return; const nx = g.pos.x + dx, ny = g.pos.y + dy; if ((dx || dy) && !can(nx, ny)) return;
    g.t++; g.moves += (dx || dy) ? 1 : 0; if (dx || dy) { g.trail.unshift({...g.pos}); g.trail = g.trail.slice(0, 3); g.pos = {x:nx, y:ny}; AUDIO.play('step'); } else AUDIO.play('click');
    if (bands(g.t).has(K(g.pos.x, g.pos.y))) { g.caught++; g.flash = performance.now(); AUDIO.play('hurt'); mgDeed('b3CrossCaught'); g.pos.y = Math.min(rows - 1, g.pos.y + 2); g.talk = mgSay('', M.back); return redraw(); }
    if (g.pos.y === 0) { g.over = true; AUDIO.play('coin'); mgDeed('b3Cross'); if (!g.caught && g.t <= 14) mgDeed('b3CrossClean'); g.talk = mgSay('', !g.caught && g.t <= 14 ? M.clean : M.over); return redraw(); }
    g.talk = ''; redraw(); };
  const geo = () => { const W = MG.W, H = MG.H, T = Math.floor(Math.min((W - 12) / cols, (H - 12) / rows)); return {T, ox:Math.round((W - T * cols) / 2), oy:Math.round((H - T * rows) / 2)}; };
  MG.cv.onpointerdown = e => { const r = MG.cv.getBoundingClientRect(), {T, ox, oy} = geo(), x = Math.floor((e.clientX - r.left - ox) / T), y = Math.floor((e.clientY - r.top - oy) / T), dx = x - g.pos.x, dy = y - g.pos.y; if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) step(dx, dy); };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, {T, ox, oy} = geo(), now = bands(g.t), next = g.over ? null : bands(g.t + 1), q = opt.mode !== 'barge';
    if (q) { b3Sky(ctx, W, H, t); glow(ctx, W * .8, H * .15, W * .3, '#6a6ab0', .15); } else { const gr = ctx.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#0a1016'); gr.addColorStop(1, '#13202a'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); }
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { const px = ox + x * T, py = oy + y * T;
      if (q) { ctx.fillStyle = y === 0 || y === rows - 1 ? '#2a2e36' : (x + y) % 2 ? 'rgba(20,24,34,.6)' : 'rgba(26,30,42,.6)'; } else { ctx.fillStyle = y === 0 || y === rows - 1 ? '#3a3a30' : (x + y) % 2 ? '#15303a' : '#183640'; }
      ctx.fillRect(px, py, T, T); if (!q && y > 0 && y < rows - 1) { ctx.strokeStyle = 'rgba(200,220,230,.08)'; ctx.beginPath(); ctx.moveTo(px, py + T * .5 + Math.sin(t / 700 + x) * 3); ctx.lineTo(px + T, py + T * .5 + Math.sin(t / 700 + x + 1) * 3); ctx.stroke(); }
      if (now.has(K(x, y))) { ctx.fillStyle = q ? `rgba(200,210,240,${.32 + Math.sin(t / 120) * .06})` : `rgba(120,180,210,${.35 + Math.sin(t / 150) * .06})`; ctx.fillRect(px, py, T, T); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); for (let i = 0; i < 3; i++) { ctx.moveTo(px + 2, py + T * (.25 + i * .25)); ctx.lineTo(px + T - 2, py + T * (.25 + i * .25) + (q ? -3 : 3)); } ctx.stroke(); }
      else if (next && next.has(K(x, y))) { ctx.strokeStyle = 'rgba(200,220,240,.45)'; ctx.setLineDash([3, 3]); ctx.strokeRect(px + 3, py + 3, T - 6, T - 6); ctx.setLineDash([]); }
      if (y === 0) { ctx.fillStyle = 'rgba(232,192,115,.14)'; ctx.fillRect(px + 2, py + 2, T - 4, T - 4); } }
    if (!g.over) { ctx.strokeStyle = 'rgba(232,192,115,.5)'; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if ((!dx && !dy) || !can(g.pos.x + dx, g.pos.y + dy)) continue; ctx.strokeRect(ox + (g.pos.x + dx) * T + 5.5, oy + (g.pos.y + dy) * T + 5.5, T - 11, T - 11); } }
    const cx = ox + g.pos.x * T + T / 2, cy = oy + g.pos.y * T + T / 2;
    if (q) { drawFigure(ctx, 'quorl', cx, cy + T * .35, T / 20, t, {dir:1}); drawFigure(ctx, 'sgt', cx - T * .05, cy - T * .1, T / 36, t, {still:true}); }
    else { ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(cx - T * .5, cy - T * .1, T, T * .5); ctx.fillStyle = '#5a4630'; ctx.fillRect(cx - T * .5, cy - T * .26, T, T * .5); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(cx - T * .5, cy + T * .16, T, T * .08); ctx.strokeStyle = 'rgba(0,0,0,.35)'; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(cx - T * .5, cy - T * .26 + i * T * .12); ctx.lineTo(cx + T * .5, cy - T * .26 + i * T * .12); ctx.stroke(); } drawFigure(ctx, 'sgt', cx + T * .12, cy, T / 38, t, {still:true}); drawFigure(ctx, SQUAD()[1] || 'kettle', cx - T * .2, cy - T * .02, T / 42, t, {still:true, alpha:.9}); ctx.strokeStyle = '#a08a5a'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx + T * .36, cy - T * .5); ctx.lineTo(cx + T * .2, cy + T * .24); ctx.stroke(); }
    if (g.flash && performance.now() - g.flash < 500) { ctx.fillStyle = `rgba(200,220,255,${.4 * (1 - (performance.now() - g.flash) / 500)})`; ctx.fillRect(0, 0, W, H); }
  };
  mgKeys({ArrowLeft:() => step(-1, 0), ArrowRight:() => step(1, 0), ArrowUp:() => step(0, -1), ArrowDown:() => step(0, 1), a:() => step(-1, 0), d:() => step(1, 0), w:() => step(0, -1), s:() => step(0, 1),
    q:() => step(-1, -1), e:() => step(1, -1), z:() => step(-1, 1), c:() => step(1, 1), ' ':() => { if (g.over) { const b = $('#crDone'); b && b.click(); } else step(0, 0); }, Enter:() => { const b = $('#crDone'); b && b.click(); }});
  g.talk = mgSay('', opt.mode === 'barge' ? `The bargemen run a barge across in the dark for practice, because the Host will cross at night and the river does not care. The pole is heavier than it looks. The current comes in bands you can see if you look for them, pale on the black water.` : `The roost-master puts you up on a practice quorl with a rider behind you whose hands do not touch the reins. The gusts come off the mountain in bands. You can see them coming, just: the stars go out in a line.`);
  redraw();
}

/* ---- the chapters' fires: the games offered, and what they leave behind ---- */
{ const wrap = (CH, id, f) => { const _n = CH.dlg[id]; if (!_n) return; CH.dlg[id] = () => { const n = _n(); return f(n) || n; }; };
  const before = (n, t, ch) => { const i = n.ch.findIndex(c => new RegExp(t).test(c.t)); n.ch.splice(i < 0 ? n.ch.length : i, 0, ...ch); return n; };
  /* Ch1: the Bridgeburners' blanket by the Fourth's fire */
  if (typeof B3CH1 !== 'undefined') { wrap(B3CH1, 'b3_c1_fire', n => before(n, '^Leave it', [{t:'The Bridgeburners have a blanket down and the bones out. Sit in.', tag:'Bones', req:()=>S.silver >= 1 && (S.f.b3c1_bonesNet || 0) < 15, go:'b3_c1_bones'}]));
    B3CH1.dlg.b3_c1_bones = () => ({sp:'The Bridgeburners\' blanket', txt:
`Three Bridgeburners on a blanket at the edge of the Fourth's firelight, as if they had always been there: Hedge, with an onion; a corporal with a flat face and a sapper's hands, who is Picker; and a man with the look of someone who has been expecting the worst since breakfast and been right twice, who is Antsy.

"Marines," Hedge says, delighted. "Our marines. Sit down, Sergeant. We're skint, and you're not."

You carry ${S.silver} silver.`,
      ch:[{t:'Sit in against Hedge.', tag:'Bones', req:()=>S.silver >= 1, go:()=>playBones({opp:'hedge', chat:'picker', stakes:[1,3,5], place:'b3c1', cap:15, after:r => { b3BonesAfter(r); talk('b3_c1_bones_after'); }})},
          {t:'Sit in against Picker.', tag:'Bones', req:()=>S.silver >= 1, go:()=>playBones({opp:'picker', chat:'hedge', stakes:[1,3,5], place:'b3c1', cap:15, after:r => { b3BonesAfter(r); talk('b3_c1_bones_after'); }})},
          {t:'Sit in against Antsy.', tag:'Bones', req:()=>S.silver >= 1, go:()=>playBones({opp:'antsy', chat:'hedge', stakes:[1,3,5], place:'b3c1', cap:15, after:r => { b3BonesAfter(r); talk('b3_c1_bones_after'); }})},
          {t:'Not tonight.', go:'b3_c1_fire'}]});
    B3CH1.dlg.b3_c1_bones_after = () => ({sp:'The Bridgeburners\' blanket', txt: S.f.b3_bonesLast === 'won' ?
`You get up from the blanket with their silver in your purse. Hedge says it was his silver, mostly, and that it will find its way home, and Picker tells him to be quiet, and Antsy says he knew.` : S.f.b3_bonesLast === 'lost' ?
`You get up from the blanket lighter. Picker counts the silver into a pouch without any expression at all. "Coral," Hedge says, with his mouth full. "Double or nothing at Coral, Sergeant." Antsy says they will all be dead at Coral, and nobody argues.` :
`You get up from the blanket about where you sat down. "Even," Picker says. "That's the worst way." She is not wrong.`,
      ch:[{t:'Back to the fire.', go:'b3_c1_fire'}]}); }
  /* Ch2: the chitin guard at the wagons */
  if (typeof B3CH2 !== 'undefined') { wrap(B3CH2, 'b3_c2_wagons', n => before(n, '^Leave them', [{t:'The chitin guard by the third crate is watching your hands.', tag:'Hand-Talk', go:()=>playHandTalk({after:r => { S.f.b3_handLast = r; talk('b3_c2_hand_after'); }})}]));
    B3CH2.dlg.b3_c2_hand_after = () => { const r = S.f.b3_handLast || {}; return {sp:'The Host\'s wagons', txt: r.all ?
`The guard has gone back to its crate as if nothing had happened, and nothing has, by Moranth reckoning: a thing was said and answered. The munitions in your satchel say otherwise.${b3In('kettle') ? ` Kettle walks away from the wagon very carefully, the way she walks when she is carrying something that could end her, which she is.` : ''}` : r.won ?
`The guard turns back to its crate. ${r.won >= 2 ? `What it set on the tailboard goes into the satchel. ` : ''}${b3In('kettle') ? `"It *talked* to you," Kettle says, for the third time. "Sergeant. A Moranth. It talked to you with its *hands*."` : `The Host will never believe you.`}` :
`The guard lowers its hands and turns back to the crate, and whatever it was going to say stays said in Moranth.`,
      ch:[{t:'Back to the wagons.', go:'b3_c2_wagons'}]}; }; }
  /* Ch4: the drill at the fire west of Capustan */
  if (typeof B3CH4 !== 'undefined') { wrap(B3CH4, 'b3_c4_fire', n => before(n, '^Sleep|^Not yet', [{t:()=>b3In('greysword') ? 'Dannet wants the squad in a line. Shields.' : 'A Grey Sword drill-sergeant is working the Host\'s squads on the frozen ground. Fall in.', tag:'The Shield Wall', go:()=>playShieldWall({after:r => { S.f.b3_shieldLast = r; b3ShieldPay(r); talk('b3_c4_shield_after'); }})}].map(c => Object.assign(c, {t:typeof c.t === 'function' ? c.t() : c.t}))));
    B3CH4.dlg.b3_c4_shield_after = () => { const r = S.f.b3_shieldLast || {}, frac = r.total ? r.held / r.total : 0; return {sp:'The lines', txt: !r.done ?
`You fall out of the line early. ${b3In('greysword') ? 'Dannet says nothing, which is a Grey Sword saying a great deal.' : 'The drill-sergeant keeps calling the count.'}` : frac >= .9 && r.pushed ?
`The line holds and the line goes forward, as one, and for a moment on the frozen ground west of Capustan the Fourth is something the Grey Swords would recognise. ${b3In('greysword') ? 'Dannet takes her shield off her arm, slowly. "Again tomorrow," she says. It is the kindest thing she has said.' : 'Somebody in the next squad over says "Hood" quietly, which from the Host is applause.'}` : frac >= .6 ?
`${r.held} of ${r.total} held, and the push ${r.pushed ? 'went right' : 'went ragged'}. It would do, against the Tenescowri. It would not do against anything with a bow and a mind.` :
`${r.held} of ${r.total}. ${b3In('greysword') ? '"Tomorrow," Dannet says. "And the day after." She means it as comfort.' : 'The drill-sergeant moves on to the next squad without a word, which is the word.'}`,
      ch:[{t:'Back to the fire.', go:'b3_c4_fire'}]}; }; }
  /* Ch5: the White Face at the next fire */
  if (typeof B3CH5 !== 'undefined') { wrap(B3CH5, 'b3_c5_fire', n => before(n, '^Sit the night|^Not now', [{t:'A White Face at the next fire is throwing knives at a post, and looking at you.', tag:'Blood-Iron', go:()=>playBloodIron({after:r => { S.f.b3_bloodLast = r; b3BloodPay(r); talk('b3_c5_blood_after'); }})}]));
    B3CH5.dlg.b3_c5_blood_after = () => { const r = S.f.b3_bloodLast || {}; return {sp:'The White Face fire', txt: !r.done ?
`You leave him his post. He does not seem to mind. He did not seem to mind anything.` : r.won ?
`Word goes round the Barghast fires before you are back at your own: the Malazan sergeant threw against one of Hetan's cousins and the knife stood in the post. By morning it will be three knives and a bear. ${b3In('sohra') ? 'Sohra says the Barghast will now expect you to fight at their side, and that this is a thing that happens to people who win at their fires, and that she tried to tell you.' : 'The White Faces look at the Fourth differently on the road the next day. It is not comfortable. It is better than the alternative.'}` :
`He takes his post down and goes to his fire with your silver's worth of respect and all of his own. The Barghast at the next fire over spits, not at you, which is nearly a kindness.`,
      ch:[{t:'Back to the fire.', go:'b3_c5_fire'}]}; }; }
  /* Ch6: the practice lift at the roost; the night barge at the slips */
  if (typeof B3CH6 !== 'undefined') { wrap(B3CH6, 'b3_c6_ledge_fire', n => before(n, '^Leave it', [{t:'The roost-master wants every rider to know the lift before the night. Up on the practice quorl.', tag:'The Crossing', go:()=>playCrossing({mode:'quorl', after:r => { S.f.b3_crossLast = Object.assign(r, {mode:'quorl'}); b3CrossPay(r); talk('b3_c6_cross_after'); }})}]));
    wrap(B3CH6, 'b3_c6_bank_fire', n => n && n.sp === 'The Fourth\'s fire' ? before(n, '^Leave it', [{t:'The bargemen are running a barge across in the dark for practice. Take the pole.', tag:'The Crossing', go:()=>playCrossing({mode:'barge', after:r => { S.f.b3_crossLast = Object.assign(r, {mode:'barge'}); b3CrossPay(r); talk('b3_c6_cross_after'); }})}]) : n);
    B3CH6.dlg.b3_c6_cross_after = () => { const r = S.f.b3_crossLast || {}, q = r.mode !== 'barge'; return {sp: q ? 'The roost' : 'The slips', txt: !r.done ?
`You come down before the far side. ${q ? 'The roost-master says the quorl will remember, and that the quorl is not the one he is worried about.' : 'The bargeman takes his pole back. He has seen marines before.'}` : r.clean ?
`${q ? `Across clean, and the roost-master, who has watched four hundred riders learn the lift, tilts his helm a hair. The rider behind you says one word in Moranth. You decide it was a good one.` : `Across clean, and the bargemen, who have seen four hundred marines fall in the Maurik, do not laugh once. One of them nods. You will take the nod.`}` :
`${q ? `Across, in the end, with ${numw(r.caught, true)} gust${r.caught === 1 ? '' : 's'} in it and the roost-master's whole opinion of marines confirmed. The quorl, at least, does not hold it against you.` : `Across, in the end, with the river having had its say ${numw(r.caught, true)} time${r.caught === 1 ? '' : 's'}. The bargeman takes his pole back and looks at it as if you might have bent it.`}`,
      ch:[{t:'Back to the fire.', go:()=>talk(q ? 'b3_c6_ledge_fire' : 'b3_c6_bank_fire')}]}; }; }
}
/* what each game pays, once a book, paid as the table closes (a node's own fx runs once a save, and a game left early must not spend it) */
function b3BonesAfter(r){ S.f.b3_bonesLast = r.games ? (r.net > 0 ? 'won' : r.net < 0 ? 'lost' : 'even') : 'left'; }
function b3ShieldPay(r){ if (!r.done || S.f.b3_shieldPaid) return; S.f.b3_shieldPaid = 1; const frac = r.total ? r.held / r.total : 0, xp = frac >= .9 && r.pushed ? 20 : frac >= .6 ? 10 : 5; gainXP(xp); note(`+${xp} experience.`, 'good'); if (frac >= .6) ally(frac >= .9 && r.pushed ? 2 : 1, 0, 'The Fourth held the line'); if (b3In('greysword') && frac >= .9) loy('greysword', 1); save(); }
function b3BloodPay(r){ if (!r.done || S.f.b3_bloodPaid) return; S.f.b3_bloodPaid = 1; const xp = r.won ? 15 : 5; gainXP(xp); note(`+${xp} experience.`, 'good'); if (r.won) ally(2, 0, 'A White Face called the Fourth blood-iron'); save(); }
function b3CrossPay(r){ if (!r.done || S.f.b3_crossPaid) return; S.f.b3_crossPaid = 1; const xp = r.clean ? 20 : 10; gainXP(xp); note(`+${xp} experience.`, 'good'); if (r.clean) ally(1, 0, 'The Fourth crossed clean'); save(); }

/* ---- the Deeds page: Book Three's fires, under the Alliance ---- */
{ const _x = typeof b3DeedsExtra === 'function' ? b3DeedsExtra : null;
  b3DeedsExtra = function(mine){ const base = _x ? _x(mine) : ''; const deeds = {}; mine.forEach(({s}) => Object.entries(s.deeds || {}).forEach(([k, v]) => deeds[k] = (deeds[k] || 0) + v)); const d = k => deeds[k] || 0;
    const hand = Math.max(0, ...mine.map(({s}) => (s.f && s.f.b3_handBest) || 0)), shield = Math.max(0, ...mine.map(({s}) => (s.f && s.f.b3_shieldBest) || 0));
    const fires = [['Bones with the Bridgeburners', d('bonesWon') || d('bonesLost') ? `${d('bonesWon')} won, ${d('bonesLost')} lost, across the books` : 'Not yet'],
      ['Moranth Hand-Talk', hand ? `${hand} of 5 runs given back${d('b3HandAll') ? ', the whole run at least once' : ''}` : d('b3HandLost') ? 'The guard turned away' : 'Not yet'],
      ['The Shield Wall', d('b3Shield') ? `${shield}% held at best${d('b3ShieldClean') ? ', and the push on three' : ''}` : 'Not yet'],
      ['Blood-Iron', d('b3BloodWon') || d('b3BloodLost') ? `${d('b3BloodWon')} won, ${d('b3BloodLost')} lost` : 'Not yet'],
      ['The Crossing', d('b3CrossClean') ? `Clean${d('b3CrossClean') > 1 ? ` (${d('b3CrossClean')} times)` : ''}` : d('b3Cross') ? `Across, caught ${d('b3CrossCaught')} time${d('b3CrossCaught') === 1 ? '' : 's'}` : 'Not yet']];
    return base + `<h4 class="jh">At the fires</h4><div class="kv">${fires.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }; }
