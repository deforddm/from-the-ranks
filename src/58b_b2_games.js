/* ============ Book Two: the games at the fires (v5.3) ============ */
/* Five games for the Chain, each in its own chapter, each played for water or for the column:
   - The Water-Seller's Measure (Ch2, the night march): pour between skins until one holds exactly the measure. Three puzzles.
   - Hackle's Herd (Ch3, the Shallows): the column's stragglers are scattered and the dust is coming; Hackle brings them in.
   - Ask the Ground (Ch3, before the warlocks' tunnel): the ground answers in lights and tones; answer it back the same.
   - Haggling (every water-trader on the Chain; first the Trygalle shareholder, Ch5): talk a price down, skin by skin, before patience runs out.
   - Khundryl Knucklebones (Ch6, the hills above Sanimon): toss the taw, scoop the bones, catch it. Played for skins.
   They use the tables' frame (36: mgOpen, mgPanel, mgKeys, MG.anim) and keep their deeds on S.deeds (the Deeds page reads them). */

const b2Night = (ctx, W, H, t, o = {}) => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, o.day ? '#6a5a44' : '#07080e'); g.addColorStop(.55, o.day ? '#a88a5e' : '#141016'); g.addColorStop(1, o.day ? '#7a6244' : '#1a120c'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (!o.day) { ctx.fillStyle = 'rgba(220,220,240,.45)'; for (let i = 0; i < 46; i++) ctx.fillRect(hash(i, 41)*W, hash(i, 42)*H*.4, 1, 1); } };
{ const _o = mgOpen; mgOpen = function(o){ MG.gid = (MG.gid || 0) + 1; return _o(o); }; } // every table opened is a new game
const b2Game = () => { const id = MG.gid; return () => MG.gid === id && mgOpenNow(); }; // a game's own timers stop when it closes
const b2Text = (ctx, s, x, y, sz, col = 'rgba(232,192,115,.9)', al = 'center') => { ctx.fillStyle = col; ctx.font = `600 ${Math.round(sz)}px 'Alegreya Sans SC', sans-serif`; ctx.textAlign = al; ctx.fillText(s, x, y); };

/* ============ 1. The Water-Seller's Measure ============
   Skins of different sizes, one of them full. Pour from one into another: it runs until the one is empty or the other is full, never
   half. Get the measure exactly. Ressan's daughters learned it at six; the water-sellers say a child who can measure can be trusted with a well. */
const MEASURES = [
  {cap:[8, 5, 3], fill:[8, 0, 0], goal:4, par:6, prize:1, ask:'Four. Exactly four, in any skin. For a mother with a child at the breast.'},
  {cap:[12, 7, 5], fill:[12, 0, 0], goal:6, par:10, prize:1, ask:'Six. Exactly six, in any skin. For the six in the wheelwright\'s cart.'},
  {cap:[10, 7, 3], fill:[10, 0, 0], goal:5, two:true, par:9, prize:2, ask:'Two fives. Five in one skin and five in another, for two sisters, so neither says the other was given more.'}];
function measureSolved(m, v){ return m.two ? v.filter(n => n === m.goal).length >= 2 : v.includes(m.goal); }
function playMeasure(opt = {}){
  const done = S.f.b2_measures || [], pick = a => a[R(a.length)];
  const g = MG.state = {i:Math.max(0, MEASURES.findIndex((m, k) => !done.includes(k))), v:null, sel:-1, moves:0, pour:null, won:false, talk:'', all:done.length >= MEASURES.length};
  if (g.all) g.i = 0;
  const M = () => MEASURES[g.i], reset = () => { g.v = M().fill.slice(); g.sel = -1; g.moves = 0; g.won = false; g.pour = null; };
  mgOpen({kick:'The night march · a water-carrier\'s game', title:'The Water-Seller\'s Measure', leaveText:'Back to the fire', done:r => opt.after && opt.after(r), leave:() => mgClose({solved:(S.f.b2_measures || []).length})});
  const live = b2Game(), say = (who, line) => { if (live()) { g.talk = mgSay(who, line); draw(); } };
  const draw = () => { const m = M();
    mgPanel(`<div class="cpbar"><span>Measure ${g.i + 1} of ${MEASURES.length}</span><span>${g.moves} pour${g.moves === 1 ? '' : 's'}${g.won ? '' : ` · the water-sellers do it in ${m.par}`}</span><span>${done.includes(g.i) ? 'solved' : `${m.prize} skin${m.prize === 1 ? '' : 's'} to the one who measures`}</span></div>
      ${g.talk}
      <div class="row mgbtns">${g.won ? `${g.i < MEASURES.length - 1 ? `<button class="btn primary" id="msNext" data-bot="1">The next measure</button>` : ''}<button class="btn ${g.i < MEASURES.length - 1 ? '' : 'primary'}" id="msDone" data-bot="1">Back to the fire</button>`
        : `<button class="btn" id="msReset" data-bot="1">Pour it all back and start again</button>`}</div>
      <p class="fine">Tap a skin to pour from it, then the skin to pour into. It runs until the first is empty or the second is full.</p>
      <p class="hint keys"><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> pick a skin · <kbd>R</kbd> start again · <kbd>Esc</kbd> leave</p>`);
    if ($('#msReset')) $('#msReset').onclick = () => { AUDIO.play('click'); reset(); say('', 'You pour it all back into the big skin. Nothing spilt. The old man nods: that is the first rule.'); };
    if ($('#msNext')) $('#msNext').onclick = () => { AUDIO.play('click'); g.i++; reset(); say('Old Tavi', `"${M().ask}"`); };
    if ($('#msDone')) $('#msDone').onclick = () => { AUDIO.play('click'); mgClose({solved:(S.f.b2_measures || []).length}); }; };
  const tap = k => { if (g.won || g.pour || k < 0 || k >= g.v.length) return;
    if (g.sel < 0) { if (!g.v[k]) return say('', 'That skin is empty. There is nothing in it to pour.'); g.sel = k; AUDIO.play('click'); return draw(); }
    if (g.sel === k) { g.sel = -1; return draw(); }
    const from = g.sel, n = Math.min(g.v[from], M().cap[k] - g.v[k]); g.sel = -1;
    if (!n) { say('', 'It is full. Not one drop more goes in.'); return; }
    g.pour = {from, to:k, n, t0:performance.now()}; AUDIO.play('pour'); g.moves++;
    setTimeout(() => { if (!live()) return; g.v[from] -= n; g.v[k] += n; g.pour = null;
      if (measureSolved(M(), g.v)) { g.won = true; const first = !done.includes(g.i); AUDIO.play('up');
        if (first) { done.push(g.i); S.f.b2_measures = done; chain(M().prize, 0, 'The water-carrier pays the one who measures'); mgDeed('b2Measure'); }
        if (g.moves <= M().par) mgDeed('b2MeasurePar');
        say('Old Tavi', g.moves <= M().par ? `"${pick(['Exact, and quick. You could sell water in the quarter.', 'Ha! A water-seller\'s hands. Who taught you? Never mind. Drink.', 'That is the measure, and in as few pours as I would take. Fewer, perhaps. Do not tell my sons.'])}"${first ? '' : ' He does not pay twice for the same measure. He grins about it.'}` : `"${pick(['The measure. Slow, but the measure. A slow honest measure beats a quick wrong one.', 'There. You see? Water is patient. So must the one who pours it be.'])}"${first ? '' : ' He does not pay twice for the same measure.'}`); }
      else draw(); }, REDUCE() ? 40 : 520);
    draw(); };
  MG.cv.onpointerdown = e => { const r = MG.cv.getBoundingClientRect(), x = e.clientX - r.left, n = g.v.length; tap(Math.floor(x / (MG.W / n))); };
  mgKeys({'1':() => tap(0), '2':() => tap(1), '3':() => tap(2), r:() => { const b = $('#msReset'); b && b.click(); }, Enter:() => { const b = $('#msNext') || $('#msDone'); b && b.click(); }});
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, m = M(), n = g.v.length, cw = W / n;
    b2Night(ctx, W, H, t); glow(ctx, W*.5, H*.95, W*.6, '#e8923a', .18);
    const maxCap = Math.max(...m.cap), now = performance.now();
    m.cap.forEach((cap, k) => { const cx = cw*k + cw/2, hh = H*.62 * (.45 + .55*cap/maxCap), ww = Math.min(cw*.5, hh*.55), by = H*.88, top = by - hh;
      let level = g.v[k]; if (g.pour) { const p = Math.min(1, (now - g.pour.t0)/520); if (g.pour.from === k) level -= g.pour.n*p; if (g.pour.to === k) level += g.pour.n*p; }
      // a goatskin, upright: a rounded body, a tied neck
      ctx.save(); ctx.beginPath(); ctx.moveTo(cx - ww*.5, by); ctx.quadraticCurveTo(cx - ww*.62, top + hh*.25, cx - ww*.22, top + hh*.08); ctx.lineTo(cx - ww*.14, top); ctx.lineTo(cx + ww*.14, top); ctx.lineTo(cx + ww*.22, top + hh*.08); ctx.quadraticCurveTo(cx + ww*.62, top + hh*.25, cx + ww*.5, by); ctx.closePath();
      const sk = ctx.createLinearGradient(cx - ww/2, 0, cx + ww/2, 0); sk.addColorStop(0, '#8a6644'); sk.addColorStop(.5, '#5e4028'); sk.addColorStop(1, '#2e1e10'); ctx.fillStyle = sk; ctx.fill(); ctx.clip();
      const wy = by - (hh*.92)*(level/cap); ctx.fillStyle = 'rgba(70,130,170,.82)'; ctx.beginPath(); ctx.moveTo(cx - ww, by + 2); ctx.lineTo(cx - ww, wy); for (let i = 0; i <= 12; i++) { const xx = cx - ww + i*ww/6; ctx.lineTo(xx, wy + Math.sin(t/300 + i + k)*1.4); } ctx.lineTo(cx + ww, by + 2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(200,230,250,.35)'; ctx.fillRect(cx - ww, wy - 1, ww*2, 1.5);
      ctx.strokeStyle = 'rgba(240,220,180,.25)'; ctx.lineWidth = 1; for (let i = 1; i < cap; i++) { const y = by - (hh*.92)*(i/cap); ctx.beginPath(); ctx.moveTo(cx + ww*.3, y); ctx.lineTo(cx + ww*.42, y); ctx.stroke(); } // notches, one a measure
      ctx.restore();
      ctx.strokeStyle = g.sel === k ? 'rgba(255,214,140,.95)' : 'rgba(0,0,0,.6)'; ctx.lineWidth = g.sel === k ? 2.5 : 1; ctx.beginPath(); ctx.moveTo(cx - ww*.5, by); ctx.quadraticCurveTo(cx - ww*.62, top + hh*.25, cx - ww*.22, top + hh*.08); ctx.lineTo(cx - ww*.14, top); ctx.lineTo(cx + ww*.14, top); ctx.lineTo(cx + ww*.22, top + hh*.08); ctx.quadraticCurveTo(cx + ww*.62, top + hh*.25, cx + ww*.5, by); ctx.stroke();
      if (g.sel === k) glow(ctx, cx, top + hh*.5, ww, '#ffd28a', .18);
      ctx.fillStyle = '#c8a24a'; ctx.fillRect(cx - ww*.16, top + hh*.02, ww*.32, 3); // the tie
      b2Text(ctx, `${Math.round(level)} of ${cap}`, cx, by + 16, Math.min(16, cw*.12), g.won && level === m.goal ? '#9fe0b8' : 'rgba(232,192,115,.9)');
      b2Text(ctx, `${k + 1}`, cx, top - 8, 12, 'rgba(200,190,170,.6)'); });
    if (g.pour) { const p = Math.min(1, (now - g.pour.t0)/520), a = cw*g.pour.from + cw/2, b = cw*g.pour.to + cw/2; ctx.strokeStyle = `rgba(110,170,210,${.8*(1 - Math.abs(p - .5))})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(a, H*.28); ctx.quadraticCurveTo((a + b)/2, H*.12, b, H*.3); ctx.stroke(); }
    b2Text(ctx, `The measure: ${m.two ? `${m.goal} and ${m.goal}` : m.goal}`, W/2, 22, Math.min(17, W*.04)); };
  reset(); g.talk = mgSay('Old Tavi', `"${g.all ? 'Again? Good. A water-seller measures every day, or forgets.' : 'Ressan\'s game. Every child in the quarter can do it, and the column is full of grown men who cannot.'} ${M().ask}"`); draw();
}

/* ============ 2. Hackle's Herd ============
   The column is strung out along the Shallows and seven of the stretch's stragglers are scattered over the flat: children, goats, an
   old man with a cow. Dust to the west: riders. Tap (or hold) where Hackle should run. Whatever he comes near moves away from him.
   Bring them into the column, on the right, before the dust arrives. Every one brought in walks in the squad's stretch after. */
function playHerd(opt = {}){
  const dog = b2In('sathi') ? 'Hackle' : 'the herder\'s dog', DUR = opt.seconds || 60;
  const kinds = ['child', 'child', 'cattle', 'hissari_w', 'child', 'cattle', 'hissari_m'];
  const g = MG.state = {dog:{x:.85, y:.5}, to:{x:.85, y:.5}, strays:kinds.map((k, i) => ({k, x:.08 + hash(i, 7)*.5, y:.15 + hash(i, 9)*.7, vx:0, vy:0, in:false, ph:i})), t0:null, left:DUR, over:false, inN:0, talk:'', lastBark:0};
  mgOpen({kick:'The Shallows · the column strung out', title:`${dog === 'Hackle' ? 'Hackle\'s' : 'The dog\'s'} herd`, leaveText:'Leave them', done:r => opt.after && opt.after(r), leave:() => mgClose({brought:g.inN, left:true})});
  const say = (who, line) => { g.talk = mgSay(who, line); redraw(); };
  const draw = () => mgPanel(`<div class="cpbar"><span>In the column: <b>${g.inN}</b> of ${g.strays.length}</span><span>${g.over ? 'The dust is here' : g.t0 ? `The dust: ${Math.ceil(g.left)}s` : 'The dust is coming'}</span></div>
    ${g.talk}
    <div class="row mgbtns">${g.over ? `<button class="btn primary" id="hdDone" data-bot="1">Back to the column</button>` : !g.t0 ? `<button class="btn primary" id="hdGo" data-bot="1">${dog === 'Hackle' ? 'Sathi whistles. Go!' : 'Go!'}</button>` : `<button class="btn" id="hdStop" data-bot="1">Call the dog back</button>`}</div>
    <p class="fine">Tap or hold where the dog should run. Whatever he comes near moves away from him. Bring them all to the column on the right before the dust.</p>
    <p class="hint keys"><kbd>←</kbd><kbd>↑</kbd><kbd>→</kbd><kbd>↓</kbd> run · <kbd>Space</kbd> go · <kbd>Esc</kbd> leave</p>`),
    bind = () => { if ($('#hdGo')) $('#hdGo').onclick = go; if ($('#hdStop')) $('#hdStop').onclick = () => end(true); if ($('#hdDone')) $('#hdDone').onclick = () => { AUDIO.play('click'); mgClose({brought:g.inN}); }; },
    redraw = () => { draw(); bind(); };
  const go = () => { if (g.t0 || g.over) return; g.t0 = performance.now(); AUDIO.play('bark', 2); g.talk = mgSay(dog === 'Hackle' ? 'Sathi' : 'The herder', dog === 'Hackle' ? '"Go on, clever one. Bring them."' : '"Go on, then. Show the Malazans."'); redraw(); };
  const end = early => { if (g.over) return; g.over = true; AUDIO.play(g.inN >= g.strays.length ? 'up' : 'click');
    const prev = S.f.b2_herd || 0, gain = Math.max(0, g.inN - prev); if (gain) chain(0, gain, `${dog === 'Hackle' ? 'Hackle' : 'The dog'} brought them in`); S.f.b2_herd = Math.max(prev, g.inN);
    mgDeed('b2Herd'); if (g.inN >= g.strays.length) mgDeed('b2HerdAll');
    g.talk = mgSay(dog === 'Hackle' ? 'Sathi' : 'The herder', g.inN >= g.strays.length ? (dog === 'Hackle' ? '"All of them. Every one." She is laughing. "He is the clever one. I told you. I only ride."' : '"All of them! The Malazans will want to buy him now. He is not for sale."') :
      g.inN ? `"${numw(g.inN, true)}." ${early ? 'The dog comes back, tongue out.' : 'The dust comes over the flat and the riders in it, and the stretch closes up, and whoever is still out there is out there.'} ${prev && !gain ? 'No more than last time. The ones from last time are still with you.' : ''}` : '"None." That is the whole count.');
    redraw(); };
  const setTo = e => { const r = MG.cv.getBoundingClientRect(); g.to = {x:clamp((e.clientX - r.left)/MG.W, .02, .98), y:clamp((e.clientY - r.top)/MG.H, .05, .95)}; if (!g.t0 && !g.over) go(); };
  MG.cv.onpointerdown = e => { MG.cv.setPointerCapture && MG.cv.setPointerCapture(e.pointerId); g.drag = true; setTo(e); };
  MG.cv.onpointermove = e => { if (g.drag) setTo(e); }; MG.cv.onpointerup = () => { g.drag = false; };
  const nudge = (dx, dy) => { g.to = {x:clamp(g.dog.x + dx*.18, .02, .98), y:clamp(g.dog.y + dy*.2, .05, .95)}; if (!g.t0) go(); };
  mgKeys({ArrowLeft:() => nudge(-1, 0), ArrowRight:() => nudge(1, 0), ArrowUp:() => nudge(0, -1), ArrowDown:() => nudge(0, 1), a:() => nudge(-1, 0), d:() => nudge(1, 0), w:() => nudge(0, -1), s:() => nudge(0, 1), ' ':() => { if (g.over) { const b = $('#hdDone'); b && b.click(); } else go(); }});
  let last = null;
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now(), dt = last ? Math.min(.05, (now - last)/1000) : 0; last = now;
    if (g.t0 && !g.over) { const l0 = Math.ceil(g.left); g.left = Math.max(0, DUR - (now - g.t0)/1000); if (!g.left) end(false); else if (Math.ceil(g.left) !== l0) redraw();
      const d = g.dog, dx = g.to.x - d.x, dy = g.to.y - d.y, dist = Math.hypot(dx, dy), sp = .55*dt; if (dist > .005) { d.x += dx/dist*Math.min(sp, dist); d.y += dy/dist*Math.min(sp*1.2, dist); d.face = dx < 0 ? -1 : 1; }
      g.strays.forEach(s => { if (s.in) { s.x = Math.min(.96, s.x + .05*dt); return; }
        const ex = s.x - d.x, ey = (s.y - d.y)*1.3, e = Math.hypot(ex, ey), R0 = .16;
        if (e < R0) { const f = (R0 - e)/R0; s.vx += ex/e*f*1.8*dt*3; s.vy += ey/e*f*1.8*dt*3; if (now - g.lastBark > 1400 && b2In('sathi')) { g.lastBark = now; AUDIO.play('bark', 1); } }
        else { s.vx += (hash(Math.floor(now/900), s.ph) - .5)*.04*dt*3; s.vy += (hash(Math.floor(now/900), s.ph + 50) - .5)*.04*dt*3; if (s.k === 'child') s.vx -= .006*dt*3; } // children wander back toward the riverbed
        s.vx *= .9; s.vy *= .9; s.x = clamp(s.x + s.vx*dt*4, .02, .97); s.y = clamp(s.y + s.vy*dt*4, .08, .94);
        if (s.x > .86) { s.in = true; g.inN++; AUDIO.play('coin'); if (g.inN >= g.strays.length) end(false); else redraw(); } }); }
    // the flat, the dust to the west, the column on the right
    b2Night(ctx, W, H, t, {day:true}); ctx.fillStyle = 'rgba(60,44,28,.25)'; for (let i = 0; i < 60; i++) ctx.fillRect(hash(i, 3)*W, H*.1 + hash(i, 4)*H*.85, 2 + hash(i, 5)*3, 1);
    const prog = g.t0 ? 1 - g.left/DUR : 0; glow(ctx, -W*.05 + prog*W*.25, H*.5, H*.8, '#d8b880', .35 + prog*.25); for (let i = 0; i < 40; i++) { const y = hash(i, 11)*H, x = prog*W*.25 - W*.02 + Math.sin(t/500 + i)*8 + hash(i, 12)*W*.08; ctx.fillStyle = `rgba(210,180,130,${(.12 + prog*.2)*hash(i, 13)})`; ctx.fillRect(x, y, 3 + hash(i, 14)*6, 2); }
    ctx.fillStyle = 'rgba(232,192,115,.14)'; ctx.fillRect(W*.86, 0, W*.14, H); ctx.strokeStyle = 'rgba(232,192,115,.5)'; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(W*.86, 0); ctx.lineTo(W*.86, H); ctx.stroke(); ctx.setLineDash([]);
    for (let i = 0; i < 5; i++) drawFigure(ctx, ['hissari_m', 'hissari_w', 'child', 'hissari_w', 'b2soldier'][i], W*.93, H*(.14 + i*.18), Math.min(1.4, H/220), t, {still:false, dir:1, phase:i, alpha:.75});
    b2Text(ctx, 'the column', W*.93, 14, 11, 'rgba(232,192,115,.75)');
    const sc = Math.min(1.5, H/200);
    g.strays.forEach(s => drawFigure(ctx, s.k, s.x*W, s.y*H, sc*(s.k === 'cattle' ? 1 : .9), t, {still:!g.t0 || s.in, dir:s.vx < 0 ? -1 : 1, phase:s.ph}));
    if (g.t0 && !g.over) { ctx.strokeStyle = 'rgba(255,214,140,.4)'; ctx.beginPath(); ctx.arc(g.to.x*W, g.to.y*H, 6, 0, 7); ctx.stroke(); }
    drawFigure(ctx, 'hackle', g.dog.x*W, g.dog.y*H, sc, t, {still:!g.t0 || g.over, dir:g.dog.face || -1}); };
  g.talk = mgSay(dog === 'Hackle' ? 'Sathi' : 'A Weasel herder', dog === 'Hackle' ? `"Seven of yours are out on the flat. Children. Goats. An old man with a cow." She points west, at a smear of dust. "Riders. Not soon. Soon." She puts two fingers in her mouth. "Tell him where. He knows what."` : `"Seven of yours are out on the flat." He points at the dust. "Riders. Take my dog. Tell him where. He knows what. He is better at this than you."`);
  redraw();
}

/* ============ 3. Ask the Ground ============
   Four places on the bare ground, four voices under it. The ground says something, a light and a note at a time; say it back the same.
   Five sayings, each a note longer. Get one wrong and it says it again, slower; get two wrong and it stops talking. If it talks to the
   end, it shows you water. With Keth beside you, the grandmother forgives one more mistake: she has been talking to the ground longer. */
function playGround(opt = {}){
  const host = opt.host || 'Nil', keth = b2In('warlock'), lives0 = keth ? 3 : 2, pick = a => a[R(a.length)];
  const g = MG.state = {round:0, seq:[], at:0, lit:-1, litT:0, phase:'intro', lives:lives0, talk:'', over:false, won:false, tap:-1, tapT:0};
  mgOpen({kick:'The camp · bare ground, and hands on it', title:'Ask the Ground', leaveText:'Take your hands off the ground', done:r => opt.after && opt.after(r), leave:() => mgClose({won:false, round:g.round})});
  const live = b2Game(), say = (who, line) => { if (live()) { g.talk = mgSay(who, line); redraw(); } };
  const draw = () => mgPanel(`<div class="cpbar"><span>Saying ${Math.min(5, g.round + 1)} of 5</span><span>${'●'.repeat(g.lives)}${'○'.repeat(lives0 - g.lives)} patience</span><span>${g.phase === 'you' ? 'Your turn: say it back' : g.phase === 'ground' ? 'The ground speaks' : ''}</span></div>
    ${g.talk}
    <div class="row mgbtns">${g.over ? `<button class="btn primary" id="grDone" data-bot="1">Get up</button>` : g.phase === 'intro' ? `<button class="btn primary" id="grGo" data-bot="1">Put your hands on the ground</button>` : ''}</div>
    <p class="fine">Watch which of the four lights, and hear its note. Then tap them back in the same order.</p>
    <p class="hint keys"><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd><kbd>4</kbd> answer · <kbd>Space</kbd> begin · <kbd>Esc</kbd> leave</p>`),
    bind = () => { if ($('#grGo')) $('#grGo').onclick = begin; if ($('#grDone')) $('#grDone').onclick = () => { AUDIO.play('click'); mgClose({won:g.won, round:g.round}); }; }, redraw = () => { draw(); bind(); };
  const show = () => { g.phase = 'ground'; g.at = 0; redraw(); const slow = g.lives < lives0 ? 1.35 : 1, step = (REDUCE() ? 380 : 620)*slow;
    g.seq.forEach((k, i) => setTimeout(() => { if (g.over || !live()) return; g.lit = k; g.litT = performance.now(); AUDIO.play('stone', k); }, 500 + i*step));
    setTimeout(() => { if (g.over || !live()) return; g.lit = -1; g.phase = 'you'; redraw(); }, 500 + g.seq.length*step); };
  const begin = () => { if (g.phase !== 'intro') return; AUDIO.play('click'); g.seq = [R(4), R(4), R(4)]; g.round = 0; say(host, `"Listen," ${host === 'Keth' ? 'he says, and the old woman says it with him' : 'he says, in that quiet voice'}. "It is going to say something."`); show(); };
  const answer = k => { if (g.phase !== 'you' || g.over) return; g.tap = k; g.tapT = performance.now(); AUDIO.play('stone', k);
    if (k !== g.seq[g.at]) { g.lives--; AUDIO.play('miss');
      if (g.lives <= 0) { g.over = true; g.phase = 'done'; mgDeed('b2GroundLost'); say(host, pick(['"It has stopped talking." He takes his hands off the ground. "It does not like to be got wrong. Nobody does."', '"Gone quiet." A long breath. "Another night, perhaps."'])); return; }
      say(keth ? 'Keth' : host, keth && g.lives === lives0 - 1 ? '"Again," the grandmother says, out of him. "Slower. It is old. It does not mind saying things twice. I do."' : '"Again. It will say it slower."'); return setTimeout(() => live() && show(), 700); }
    g.at++; if (g.at < g.seq.length) return draw();
    g.phase = 'wait'; g.round++; if (g.round >= 5) { g.over = true; g.won = true; g.phase = 'done'; const first = !S.f.b2_ground; AUDIO.play('up'); mgDeed('b2Ground');
      if (first) { S.f.b2_ground = 1; chain(2, 0, 'Water the ground showed you'); }
      say(host, first ? `"It says thank you." He presses his palm flat, once, and under it the dry earth goes dark, and then wet. "It says there is water, here, a hand down. Dig." You dig. There is.` : '"It knows you now." He seems pleased about it, in a very small way.'); return; }
    g.seq.push(R(4)); say('', pick(['The ground goes quiet, and then says more.', 'A pause, like somebody drawing breath a long way down.', 'The lights dim, and come again.'])); setTimeout(() => live() && show(), 600); };
  const geo = () => { const W = MG.W, H = MG.H, r = Math.min(W, H)*.17; return [[W/2, H*.27], [W*.5 + r*1.9, H*.55], [W/2, H*.83], [W*.5 - r*1.9, H*.55]].map(([x, y]) => ({x, y, r})); };
  MG.cv.onpointerdown = e => { const rc = MG.cv.getBoundingClientRect(), x = e.clientX - rc.left, y = e.clientY - rc.top; if (g.phase === 'intro') return begin(); geo().forEach((p, k) => { if (Math.hypot(x - p.x, y - p.y) < p.r*1.15) answer(k); }); };
  mgKeys({'1':() => answer(0), '2':() => answer(1), '3':() => answer(2), '4':() => answer(3), ' ':() => { if (g.over) { const b = $('#grDone'); b && b.click(); } else begin(); }});
  const COL = ['#9fbf7a', '#c8a24a', '#8aa6c8', '#c88a6a'];
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H, now = performance.now();
    b2Night(ctx, W, H, t); ctx.fillStyle = '#16100a'; ctx.fillRect(0, H*.18, W, H); glow(ctx, W/2, H*.55, Math.min(W, H)*.6, '#6a7a4a', .12 + Math.sin(t/900)*.03);
    for (let i = 0; i < 70; i++) { ctx.fillStyle = `rgba(90,70,46,${.25 + hash(i, 2)*.3})`; ctx.fillRect(hash(i, 5)*W, H*.2 + hash(i, 6)*H*.8, 2, 1); }
    geo().forEach((p, k) => { const on = (g.lit === k && now - g.litT < 480) || (g.tap === k && now - g.tapT < 260), a = on ? 1 : .22 + Math.sin(t/700 + k*1.7)*.05;
      glow(ctx, p.x, p.y, p.r*(on ? 1.9 : 1.1), COL[k], on ? .55 : .12); ell(ctx, p.x, p.y + p.r*.35, p.r*.9, p.r*.32, 'rgba(0,0,0,.45)');
      ctx.fillStyle = on ? COL[k] : `rgba(70,60,48,${.9})`; ctx.beginPath(); ctx.ellipse(p.x, p.y, p.r*.7, p.r*.42, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = `rgba(230,220,190,${a})`; ctx.lineWidth = 1.5; ctx.stroke();
      for (let i = 0; i < 3; i++) { const q = t/900 + i*2.1 + k; ell(ctx, p.x + Math.cos(q)*p.r*.55, p.y - p.r*.2 + Math.sin(q*1.3)*p.r*.2, 2.4, 1.4, `rgba(220,230,210,${on ? .7 : .12})`); }
      b2Text(ctx, `${k + 1}`, p.x, p.y + 4, 12, on ? '#1a1410' : 'rgba(200,190,170,.5)'); });
    drawFigure(ctx, host === 'Keth' ? 'warlock' : 'nil', W/2, H*.6, Math.min(1.8, H/170), t, {still:true}); };
  g.talk = mgSay(host, host === 'Keth' ? '"Put your hands flat, next to mine. Not like that. Like you would on a horse that might bolt." The old woman, out of him: "Now be quiet. It talks to the quiet ones."' : `"Put your hands down, Malazan. Flat. It does not talk to many. It might talk to you, because you are new. It likes new."${keth ? ' Keth sits down on your other side, and the old woman in him says something to the ground that sounds like an introduction.' : ''}`);
  redraw();
}

/* ============ 4. Haggling on the Chain (the Trygalle Haggle, v5.3; every water-trader, v6.4.1) ============
   A trader, a price in skins, and their patience, which they do not show you except by a tell when it is nearly gone.
   Nudge (a skin off, likely), lowball (two off, a long shot, and it costs more patience), or have a squadmate say something: each of
   them knows a way to buy you a little time, once. Pay when you are happy. Push past their patience and they close on that piece, and
   the price goes up a skin. One haggle a piece.
   And once a haggle, the squad's own argument: "We're guarding your life." The Seventh's squads hold the stretches; every soul in the
   column walks inside them. Said to someone who walks in the column, it is a strong argument: two skins off, and the bottom with them.
   Said to a Trygalle shareholder it is a weak one (the Guild guards the Guild); said to a Khundryl who rode four hundred leagues to
   fight for you, it is a joke, and he likes the nerve. */
const HAGGLERS = {
  b2_follower2:{who:'The camp follower', g:'f', kick:'The Sekala · the west bank', fig:'hissari_w', prop:'blanket', day:true, tell:'She starts rolling up the blanket.',
    open:(p, it) => `"${p} skins, ${it}." She does not move her hand anywhere near the fetish. "Haggle if you like. I have nowhere to be but the next river."`,
    yes1:['"One less."', 'She sucks her teeth. "One."', '"One. For the Seventh. Don\'t tell the weavers."'], yes2:['"Two. Two, and I never want to see that axe again."', 'A long look. "Two less. You haggle like my mother."'],
    no:['"No."', '"I picked those off the dead myself, Sergeant. No."', 'She shakes her head and looks at the river.'],
    bottom:'"That\'s the bottom. Below that I\'d sooner throw it in the Sekala."', shut:p => `She rolls the blanket over it. "No. Now it's ${p}. Because you pushed."`,
    paid:['"Done," she says, and does not count the skins twice, which is the nicest thing anyone has done for you all day.', '"Done."', '"Done." She is not sorry at all.'],
    guard:{p:.8, ok:'She looks past you, at the bank, where the Semk came down at the carts yesterday and the squad was between. For a long breath she says nothing. "Two less," she says. "And the bottom with it. Don\'t make me say why."', no:'"Everybody guards everybody," she says. "That\'s what the Chain is. No."'}},
  b2_tinker3:{who:'The tinker', g:'m', kick:'The P\'atha · the tinker\'s handcart', fig:'hissari_m', prop:'cart', day:false, tell:'He starts whistling, and not cheerfully.',
    open:(p, it) => `"${p} skins, ${it}." He folds his hands on the handle of the cart. "In Kan we haggle for an hour before tea. Out here, I give you until the water boils."`,
    yes1:['"One less. Only because you are polite."', '"One." He writes it on his palm with a burnt stick.', 'He spreads his hands. "One, then."'], yes2:['"Two. Two! The Kanese do not do two. Nobody tell Kan."', 'He laughs, painfully. "Two less. My grandfather is turning in the sea."'],
    no:['"No."', '"I walked this cart from Hissar, Sergeant. No."', 'He shakes his head, very slowly, as at a grandson.'],
    bottom:'"That is the bottom. Under that, I am giving it away, and I do not give."', shut:p => `He puts it back under the canvas. "No. Now it is ${p}. You made an old man say no."`,
    paid:['"Done. You haggled like a Kanese. It is the highest thing I can say."', '"Done."', '"Done," he says, satisfied, and counts the skins twice.'],
    guard:{p:.75, ok:'He stops. He looks at you for a while, and at the squad, and back along the column, at all the carts that are still carts. "Yes," he says. "Yes, you are. Two less. And I will not go under it again, but I will go to it."', no:'"And I sharpen your knives," he says, quite kindly. "We are all paying each other, on the Odhan. No."'}},
  b2_servant4:{who:'The noble\'s man', g:'m', kick:'The ring of carts · behind the last carriage', fig:'hissari_m', prop:'bundle', day:false, tell:'He looks back at the carriages.',
    open:(p, it) => `"${p} skins, ${it}." He keeps his voice very low. "Please be quick. If the steward sees me, there will be no kitchen cart to bring it to."`,
    yes1:['"One less. Please."', '"One." He looks back at the carriages.', '"Yes, yes, one less."'], yes2:['"Two. Two, and quickly."', 'He winces. "Two less. The children will drink less. Two."'],
    no:['"No. The children."', '"I cannot. I am sorry. No."', 'He shakes his head, and keeps looking at the carriages.'],
    bottom:'"That is the bottom. Under that it does not fill the kitchen cart\'s skins, and then why did I steal it?"', shut:p => `He rolls the bundle closed. "No. ${p}. I am sorry. I have to go back."`,
    paid:['"Thank you." He says it as if it hurt. "The children will not know who to thank. I will tell them a soldier."', '"Thank you."', '"Done." He is already walking back to the kitchen cart.'],
    guard:{p:.85, ok:'He looks at your squad, at the dust on the shields, at the stretch the carriages sit inside like eggs in a nest. "My master would not say it," he says. "So I will. Two less. And the bottom with it. You are the only wall we have."', no:'"My master says the Seventh is paid for that," he says, ashamed of it. "I am sorry. No."'}},
  b2_trader5:{who:'The shareholder', g:'f', kick:'The Nenoth · the Trygalle carriage', fig:'trygalle_guard', prop:'carriage', day:false, tell:'She taps her glove.',
    open:(p, it) => `"${p} skins, ${it}." She folds her arms. One of them has a scorched glove on it. "Go on, then. Everybody haggles. It's the only fun we get."`,
    yes1:['"One less. One."', 'She sighs, theatrically. "One."', '"For a sergeant of the Seventh, one." She does not mean it kindly.'], yes2:['A long look. "Fine. Two. You have a face like a tax-collector\'s mother."', '"Two." She says it like a curse. "Two less. Take it before I come to my senses."'],
    no:['"No."', 'She weighs it. "No."', '"The Guild crossed a warren with a war in it. The Guild does not take one less."'],
    bottom:'"That\'s the bottom. I\'d sooner give it to the Semk."', shut:p => `She shuts the lid. "No," she says, quite pleasantly. "Now it's ${p}. Because you made me say no."`,
    paid:['"Robbery," she says, and shakes your hand. "Come and work for the Guild. You\'d hate it."', '"Done," she says. "Don\'t tell the partners."', '"Done." She does not even pretend to be sorry.'],
    help:{haddat:'Haddat says something to her in the trade-talk of the Odhan, very politely. The shareholder laughs despite herself.', tangle:'Tangle counts her crate out loud, item by item, with a sapper\'s precision. She is impressed despite herself.', sathi:'Sathi says the carriage horses are the best she has seen on the continent, which is true, and the shareholder softens, which is truer.', marrow:'Marrow looks at the scorched glove and says, "That wants dressing, child." The shareholder lets her. It takes a while.', redblade:'Ramin bows to her, the Ehrlitan way, from the waist, and says something gracious about the Guild. She has not been bowed to in a year.', warlock:'The old woman in Keth says something to her about the warrens that the shareholder very much wants to hear more of.'},
    guard:{p:.25, free:true, ok:'She laughs out loud. "You? Guard the Trygalle?" And then, because the Fist\'s camp is all that stands between her horses and Korbolo Dom tonight, and she knows it: "All right. That one\'s fair. Two less, and the bottom with it, and you never say it again."', no:'She laughs out loud. "Sergeant. The Guild guards the Guild. We came through a warren with a war in it." But she is still smiling, and it costs you nothing.'}},
  b2_ktrader6:{who:'The Khundryl', g:'m', kick:'The hills above Sanimon · the Khundryl horse lines', fig:'khundryl', prop:'hide', day:true, tell:'He goes back to his paint.',
    open:(p, it) => `"${p}," he says, in trade-talk, ${it} across his knees. "Skins. Talk if you like. The Khundryl like a man who talks before he pays. It means he has thought."`,
    yes1:['"One less."', 'He shrugs. "One."', '"One. My horses will drink less. They will forgive you."'], yes2:['"Two." He laughs. "Two, for the nerve."', 'A long look, through the paint. "Two less. You fight like that too, I think."'],
    no:['"No."', 'He looks at you through the paint and shakes his head, once.', '"No. My horses are thirsty, Malazan. Ask them."'],
    bottom:'"That is the bottom. Under it I am giving gifts, and a gift is not given to a man who haggles."', shut:p => `He puts it back across his knees. "No. ${p}. You pushed a Khundryl. Remember it, it is a good story."`,
    paid:['He clasps your forearm, Khundryl fashion. "Good trade. I will tell my sons a Malazan robbed me."', '"Good."', 'He nods, once, and goes back to his paint.'],
    guard:{p:.2, gain:true, ok:'He stares at you. Then he laughs, the whole of him, until he has to wipe the paint off his eyes. "You guard me? Malazan, I rode four hundred leagues to guard you!" He holds up two fingers. "Two less. For the joke. It is the best I have heard since the river."', no:'He stares at you. Then he laughs, the whole of him. "You guard me? Malazan, I rode four hundred leagues to guard you." He does not take anything off. But he likes you better now, and he is in no hurry.'}}};
const HAGGLE_HELP = {haddat:['Haddat talks trade-talk', P => `Haddat says something to ${P.him} in the trade-talk of the Odhan, very politely. ${P.She} laughs despite ${P.self}.`],
  tangle:['Tangle counts at {him}', P => `Tangle counts ${P.his} wares out loud, item by item, with a sapper's precision. ${P.She} is impressed despite ${P.self}.`],
  sathi:['Sathi talks horses', P => `Sathi says something about horses, the way a Weasel does, and ${P.lc} turns out to have opinions about horses. Everybody on the Odhan does. It takes a while.`],
  marrow:['Marrow looks at {his} hands', P => `Marrow looks at ${P.his} cracked hands and says, "Those want seeing to, child." ${P.She} lets her. It takes a while.`],
  redblade:['Ramin bows', P => `Ramin bows to ${P.him}, the Ehrlitan way, from the waist, and says something gracious. ${P.She} has not been bowed to in a year.`],
  warlock:['Keth\'s grandmother speaks up', P => `The old woman in Keth says something to ${P.him}, rude and very old and very funny, and ${P.she} laughs before ${P.she} can stop ${P.self}.`],
  sgt:['Tell {him} about the road', P => `You tell ${P.him} about the road from Hissar. Not all of it. Enough. ${P.She} is quiet a moment.`]};
const haggler = node => { const h = HAGGLERS[node] || HAGGLERS.b2_trader5, f = h.g === 'f';
  return Object.assign({She:f ? 'She' : 'He', she:f ? 'she' : 'he', his:f ? 'her' : 'his', him:f ? 'her' : 'him', self:f ? 'herself' : 'himself', lc:h.who.replace(/^The /, 'the ')}, h); };
function playHaggle(o){
  const it = ITEMS[o.item], P = haggler(o.node), pick = a => a[R(a.length)], iname = it.name.replace(/^(A|An) /, 'the ').toLowerCase();
  const g = MG.state = {price:o.price, floor:Math.max(1, o.price - 3), pat:3 + R(2), used:{}, over:false, paid:false, talk:'', tap:0, guard:false};
  mgOpen({kick:P.kick, title:`Haggling for ${it.name.replace(/^(A|An|The) /, 'the ').toLowerCase()}`, leaveText:'Walk away', done:() => talk(o.node), leave:() => { finish(false); }});
  const say = (who, line) => { g.talk = mgSay(who, line); draw(); };
  const seal = () => { S.f.b2_haggled ??= {}; S.f.b2_haggled[o.item] = 1; S.f.b2_price ??= {}; S.f.b2_price[o.node + ':' + o.item] = g.price; };
  const finish = paid => { if (!g.over) { g.over = true; seal(); } mgClose({paid, price:g.price}); };
  const tap = () => { g.tap = g.pat <= 1 ? 1 : 0; };
  const helpTxt = k => (P.help && P.help[k]) || HAGGLE_HELP[k][1](P), helpLabel = k => HAGGLE_HELP[k][0].replace('{him}', P.him).replace('{his}', P.his);
  const draw = () => { const helpers = [...SQUAD().filter(k => HAGGLE_HELP[k] && !g.used[k] && !mateAway(k))];
    mgPanel(`<div class="cpbar"><span>${P.his[0].toUpperCase() + P.his.slice(1)} price: <b>${g.price}</b> skin${g.price === 1 ? '' : 's'}</span><span>You have ${chainW()}</span><span>${g.tap ? `<b class="warnc">${P.tell}</b>` : `${P.She} waits.`}</span></div>
      ${g.talk}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="hgDone" data-bot="1">Back</button>` : `
        <button class="btn" id="hgNudge" data-bot="1" ${g.price > g.floor ? '' : 'disabled'}>"One skin less."</button>
        <button class="btn" id="hgLow" ${g.price - 2 >= g.floor ? '' : 'disabled'}>"Two less, or I walk."</button>
        <button class="btn primary" id="hgPay" ${chainW() >= g.price ? '' : 'disabled'}>Pay ${g.price}</button>`}</div>
      ${g.over ? '' : `<div class="row mgbtns">${g.guard ? '' : `<button class="btn" id="hgGuard">"We're guarding your life."</button>`}${helpers.slice(0, 4).map(k => `<button class="btn" data-help="${k}">${esc(helpLabel(k))}</button>`).join('')}</div>`}
      <p class="fine">Nudge a skin off, or lowball for two. Every push tries ${P.his} patience; a squadmate can buy some back, once each. When ${P.she} ${P.tell.replace(/^(She|He) /, '').replace(/\.$/, '')}, ${P.she} is nearly done: push past it and the price goes up. Once, you can remind ${P.him} who holds the stretch.</p>`);
    if ($('#hgNudge')) $('#hgNudge').onclick = () => push(1); if ($('#hgLow')) $('#hgLow').onclick = () => push(2);
    if ($('#hgGuard')) $('#hgGuard').onclick = () => guard();
    if ($('#hgPay')) $('#hgPay').onclick = () => { if (!b2Buy(o.item, g.price, P.who)) return; const saved = o.price - g.price; if (saved > 0) { mgDeed('b2HaggleSaved', saved); tally('haggled', saved); } AUDIO.play('coin'); g.over = true; seal();
      say(P.who, saved >= 2 ? P.paid[0] : saved ? P.paid[1] : P.paid[2]); };
    if ($('#hgDone')) $('#hgDone').onclick = () => { AUDIO.play('click'); finish(true); };
    document.querySelectorAll('#mgPanel [data-help]').forEach(b => b.onclick = () => { const k = b.dataset.help; g.used[k] = 1; g.pat += 1; tap(); AUDIO.play('click'); say(k === 'sgt' ? '' : NAME(k), helpTxt(k)); }); };
  /* the squad's own argument, once a haggle */
  const guard = () => { if (g.over || g.guard) return; g.guard = true; const G = P.guard;
    if (Math.random() < G.p) { g.floor = Math.max(1, g.floor - 1); g.price = Math.max(g.floor, g.price - 2); AUDIO.play('coin'); tap(); mgDeed('b2HaggleGuard'); return say(P.who, G.ok); }
    if (G.gain) { g.pat += 1; tap(); AUDIO.play('click'); return say(P.who, G.no); }
    if (!G.free) { g.pat -= 1; if (g.pat < 0) return shut(); }
    tap(); AUDIO.play('click'); say(P.who, G.no); };
  const shut = () => { g.price += 1; g.over = true; AUDIO.play('miss'); seal(); mgDeed('b2HaggleLost'); say(P.who, `${P.shut(g.price)} ${P.She} will not haggle over this one again.`); };
  const push = n => { if (g.over) return; const chance = n === 1 ? .78 : .42; g.pat -= n;
    if (g.pat < 0) return shut();
    if (Math.random() < chance) { g.price = Math.max(g.floor, g.price - n); AUDIO.play('coin'); tap(); say(P.who, g.price <= g.floor ? P.bottom : pick(n === 2 ? P.yes2 : P.yes1)); }
    else { tap(); AUDIO.play('click'); say(P.who, pick(P.no)); } };
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H; b2Night(ctx, W, H, t, {day:P.day}); glow(ctx, W*.2, H*.7, W*.4, P.day ? '#f2d08a' : '#e8923a', P.day ? .14 : .22);
    if (P.prop === 'carriage') { // the Trygalle carriage, black, its wheels steaming
      ctx.fillStyle = '#120e0c'; ctx.fillRect(W*.55, H*.22, W*.38, H*.42); ctx.fillStyle = '#2a1e16'; ctx.fillRect(W*.58, H*.28, W*.12, H*.14); ctx.fillStyle = 'rgba(255,190,110,.25)'; ctx.fillRect(W*.59, H*.29, W*.1, H*.12);
      [W*.62, W*.86].forEach((x, i) => { ctx.strokeStyle = '#3a2a1e'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, H*.68, H*.11, 0, 7); ctx.stroke(); for (let s = 0; s < 3; s++) { const y = H*.55 - ((t/18 + s*20 + i*9) % 50); ctx.fillStyle = `rgba(220,220,230,${.12*(1 - (H*.55 - y)/50)})`; ell(ctx, x + Math.sin(t/300 + s)*4, y, 6, 4, ctx.fillStyle); } }); }
    else if (P.prop === 'cart') { ctx.fillStyle = '#3a2a1c'; ctx.fillRect(W*.6, H*.48, W*.3, H*.14); ctx.strokeStyle = '#2a1c12'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(W*.75, H*.68, H*.08, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(W*.9, H*.52); ctx.lineTo(W*.98, H*.6); ctx.stroke();
      for (let i = 0; i < 5; i++) ell(ctx, W*(.63 + i*.055), H*.47, W*.02, H*.025, ['#6a5a48', '#8a6a3a', '#5a6a6a', '#7a5a3a', '#6a6a5a'][i]); }
    else if (P.prop === 'bundle') { ctx.fillStyle = '#1a1410'; ctx.fillRect(W*.6, H*.2, W*.34, H*.36); ctx.fillStyle = 'rgba(255,200,120,.18)'; ctx.fillRect(W*.64, H*.26, W*.1, H*.1); ctx.strokeStyle = '#2a1e16'; ctx.lineWidth = 3; [W*.66, W*.88].forEach(x => { ctx.beginPath(); ctx.arc(x, H*.62, H*.09, 0, 7); ctx.stroke(); }); }
    else if (P.prop === 'hide') { for (let i = 0; i < 2; i++) { const x = W*(.66 + i*.17), y = H*.5, c = i ? '#3a2a1c' : '#241a12', b = (RM => RM ? 0 : Math.sin(t/700 + i*2)*2)(REDUCE()); // two horses at the line, heads down to nothing
      ctx.fillStyle = c; [[-.055, 0], [-.035, .01], [.035, .01], [.055, 0]].forEach(([dx, dl]) => ctx.fillRect(x + W*dx, y + H*.02, Math.max(2, W*.008), H*(.17 - dl)));
      ell(ctx, x, y, W*.075, H*.05, c); ctx.beginPath(); ctx.moveTo(x + W*.05, y - H*.02); ctx.lineTo(x + W*.1, y + H*.06 + b); ctx.lineTo(x + W*.085, y + H*.075 + b); ctx.lineTo(x + W*.035, y + H*.01); ctx.closePath(); ctx.fill();
      ell(ctx, x + W*.1, y + H*.085 + b, W*.018, H*.03, c, .5); ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - W*.07, y - H*.01); ctx.quadraticCurveTo(x - W*.1, y + H*.05, x - W*.085, y + H*.11); ctx.stroke(); } }
    // the goods, on trestles or a blanket; the skins you would pay
    if (P.prop === 'blanket' || P.prop === 'hide') { ell(ctx, W*.29, H*.66, W*.2, H*.05, P.prop === 'hide' ? '#5a4230' : '#6a4a4a'); }
    else { ctx.fillStyle = '#4a3420'; ctx.fillRect(W*.1, H*.62, W*.38, 6); ctx.fillRect(W*.13, H*.62, 4, H*.18); ctx.fillRect(W*.44, H*.62, 4, H*.18); }
    b2Text(ctx, it.name, W*.29, H*.58, Math.min(15, W*.034), 'rgba(240,220,180,.9)');
    for (let i = 0; i < g.price; i++) { const x = W*.13 + (i%6)*W*.055, y = H*.86 - Math.floor(i/6)*H*.08; ell(ctx, x, y, W*.022, H*.035, '#6a4a2c'); ell(ctx, x - 2, y - 3, W*.008, H*.012, 'rgba(255,230,200,.2)'); }
    drawFigure(ctx, P.fig, W*.5, H*.8, Math.min(2.2, H/120), t, {still:true, dir:-1});
    if (g.tap && !g.over) { const k = (Math.sin(t/120) + 1)/2; ell(ctx, W*.5 + 14, H*.8 - 30, 4 + k*2, 4 + k*2, `rgba(240,140,110,${.4 + k*.4})`); } };
  g.talk = mgSay(P.who, P.open(o.price, iname));
  draw();
}

/* ============ 5. Khundryl Knucklebones ============
   Five bones on a hide. Toss the taw; while it is up, scoop the bones (ones, then twos, then threes, then all four); catch the taw as
   it comes down. Scoop late and you miss the catch; catch early and it is in your hand before you have the bones. A miss passes the
   bones. First through the fours takes the stake, in skins. The Khundryl play it at funerals, mostly their own. */
const JACKS_ROUNDS = 4;
function playJacks(opt = {}){
  const pick = a => a[R(a.length)], net0 = S.f.b2_jacksNet || 0, CAP = 4;
  const g = MG.state = {me:0, opp:0, who:'me', phase:'stake', stake:0, toss:null, scooped:false, scoopT:0, over:false, talk:'', games:0, net:0};
  mgOpen({kick:'The hills above Sanimon · a Khundryl fire', title:'Khundryl Knucklebones', leaveText:'Leave the fire', done:r => opt.after && opt.after(r),
    leave:() => { if (g.phase === 'play' && g.stake && !g.over) { chain(-g.stake, 0, 'A forfeit to the Khundryl'); g.net -= g.stake; } mgClose({net:g.net, games:g.games}); }});
  const live = b2Game(), say = (who, line) => { if (live()) { g.talk = mgSay(who, line); draw(); } };
  const FLIGHT = () => (REDUCE() ? 1500 : 1300) * Math.max(.8, SET.speed);
  const pct = n => Math.round(n / JACKS_ROUNDS * 100);
  const draw = () => {
    if (g.phase === 'stake') { const capped = net0 + g.net >= CAP;
      mgPanel(`${g.talk}<p class="fine">What do you put on the hide? You have ${chainW()} skin${chainW() === 1 ? '' : 's'}.${capped ? ' The Khundryl will not play you for water again: they say you have had enough of theirs.' : ''}</p>
        <div class="row mgbtns">${[1, 2].map(n => `<button class="btn ${n === 1 ? 'primary' : ''}" data-st="${n}" data-bot="1" ${chainW() >= n && !capped ? '' : 'disabled'}>${n} skin${n === 1 ? '' : 's'}</button>`).join('')}<button class="btn" data-st="0" data-bot="1">For the honour of it</button></div>
        <p class="fine">Toss, then <b>scoop</b> while the taw is high, then <b>catch</b> it as it comes down. Ones, twos, threes, then all four. A miss passes the bones.</p>`);
      document.querySelectorAll('#mgPanel [data-st]').forEach(b => b.onclick = () => { AUDIO.play('coin'); g.stake = +b.dataset.st; g.phase = 'play'; g.me = g.opp = 0; g.who = 'me'; g.over = false; say('', 'Your bones first. The Khundryl insist: guests go first, so the guests can be watched.'); }); return; }
    const mine = g.who === 'me' && !g.over, stage = !g.toss ? 'Toss the taw' : !g.scooped ? `Scoop ${Math.min(4, g.me + 1)}` : 'Catch!';
    mgPanel(`<div class="bscore"><div class="bs ${g.who === 'me' && !g.over ? 'on' : ''}"><span>${esc(S.name)}</span><b>${g.me}</b><i style="width:${pct(g.me)}%"></i></div><div class="bs ${g.who === 'opp' && !g.over ? 'on' : ''}"><span>The Khundryl</span><b>${g.opp}</b><i style="width:${pct(g.opp)}%"></i></div></div>
      <p class="fine bgoal">Ones, twos, threes, fours: first through the fours.${g.stake ? ` On the hide: ${g.stake} skin${g.stake === 1 ? '' : 's'}.` : ' For the honour of it.'}</p>
      ${g.talk}
      <div class="row mgbtns">${g.over ? `<button class="btn primary" id="jkAgain" data-bot="1">Another round</button><button class="btn" id="jkDone" data-bot="1">Leave the fire</button>` : `<button class="btn primary" id="jkAct" data-bot="1" ${mine ? '' : 'disabled'}>${stage}</button>`}</div>
      <p class="hint keys"><kbd>Space</kbd> toss · scoop · catch · <kbd>Esc</kbd> leave</p>`);
    if ($('#jkAct')) $('#jkAct').onclick = act; if ($('#jkAgain')) $('#jkAgain').onclick = () => { AUDIO.play('click'); g.phase = 'stake'; g.talk = mgSay('The Khundryl', pick(['"Again. The dead are patient. We are not."', '"Again!" The others round the fire bang their cups.'])); draw(); };
    if ($('#jkDone')) $('#jkDone').onclick = () => { AUDIO.play('click'); mgClose({net:g.net, games:g.games}); }; };
  /* the taw's height, 0..1, k = 0..1 through the flight */
  const flightK = () => g.toss ? (performance.now() - g.toss) / FLIGHT() : 0;
  const act = () => { if (g.who !== 'me' || g.over || g.phase !== 'play') return; const k = flightK();
    if (!g.toss) { const my = g.toss = performance.now(); g.scooped = false; AUDIO.play('click'); draw(); setTimeout(() => { if (live() && g.toss === my && g.who === 'me' && !g.over) miss('The taw comes down on the hide. You never caught it.'); }, FLIGHT() + 120); return; }
    if (!g.scooped) { if (k > .62) return miss('Too late: you are still scooping when it lands.'); g.scooped = true; g.scoopT = performance.now(); AUDIO.play('shuffle'); draw(); return; }
    if (k < .78) return miss('Too soon: your hand closes on air, and the taw comes down beside it.');
    if (k > 1.02) return miss('It has landed. Late.');
    g.toss = null; g.me++; AUDIO.play('dice', true); mgDeed('b2JacksCatch');
    if (g.me >= JACKS_ROUNDS) return finish('me');
    say('', pick(['Caught. The fire nods.', 'Clean. A Khundryl says something that is probably praise.', 'Bones in the fist, taw in the palm. Next.'])); };
  const miss = why => { g.toss = null; AUDIO.play('miss'); say('', why); g.who = 'opp'; setTimeout(() => live() && oppTurn(), 900); };
  const oppTurn = () => { if (g.over || !live()) return; draw(); const p = [.82, .72, .6, .5][g.opp] ?? .5; g.toss = performance.now(); g.oppToss = true;
    setTimeout(() => { if (g.over || !live()) return; g.toss = null; g.oppToss = false;
      if (Math.random() < p) { g.opp++; AUDIO.play('dice', true); if (g.opp >= JACKS_ROUNDS) return finish('opp'); say('The Khundryl', pick(['He scoops without looking and catches without looking.', '"Ha."', 'Caught. He does not even look pleased.'])); setTimeout(() => live() && oppTurn(), 800); }
      else { AUDIO.play('miss'); g.who = 'me'; say('The Khundryl', pick(['The taw comes down on his knuckles. Everyone at the fire laughs, him loudest.', '"Hood\'s breath." Your bones.', 'He drops one. He holds it up so everyone can see, and laughs.'])); } }, FLIGHT()); };
  const finish = w => { g.over = true; g.games++; const won = w === 'me';
    if (g.stake) { chain(won ? g.stake : -g.stake, 0, won ? 'Won off the Khundryl' : 'Lost to the Khundryl'); g.net += won ? g.stake : -g.stake; S.f.b2_jacksNet = (S.f.b2_jacksNet || 0) + (won ? g.stake : -g.stake); }
    mgDeed(won ? 'b2JacksWon' : 'b2JacksLost'); AUDIO.play(won ? 'up' : 'click');
    say('The Khundryl', won ? pick(['He laughs and slaps the hide. "A Malazan! Through the fours! Paint yourself, you are already dead and the gods have nothing left to take."', '"Good hands. Soldier\'s hands." He pays without a word, and then one word: "Again."']) : pick(['"The fours," he says, holding up the bones. "The fours are where the old men win."', 'He takes the stake and pours half of it back into your skin. "For the road. You will need it more than my horse."'])); };
  let lastT = 0;
  MG.anim = t => { const ctx = MG.ctx; if (!ctx || !MG.W) return; const W = MG.W, H = MG.H;
    drawTableFire(ctx, W, H, t, {fx:W*.5, fy:H*.32}); drawFigure(ctx, 'khundryl', W*.16, H*.8, Math.min(2.2, H/110), t, {still:!(g.who === 'opp'), dir:1}); drawFigure(ctx, 'sgt_dg', W*.84, H*.8, Math.min(2.2, H/110), t, {still:true, dir:-1});
    const s = Math.min(26, W*.05), left = g.who === 'me' ? JACKS_ROUNDS - g.me : JACKS_ROUNDS - g.opp, scooped = g.toss && (g.scooped || g.oppToss);
    for (let i = 0; i < JACKS_ROUNDS; i++) { const x = W/2 + (i - 1.5)*s*1.6 + Math.sin(i*2.3)*6, y = H*.74 + Math.cos(i*1.7)*5; if (scooped && i < 1) continue; drawBone(ctx, x, y, s*.8, 1 + (i*2) % 6, i*.6); }
    if (g.toss) { const k = Math.min(1.05, flightK()), hy = Math.sin(Math.min(1, k)*Math.PI)*H*.5, x = g.oppToss ? W*.24 : W*.76; drawBone(ctx, x, H*.7 - hy, s, 6, k*12);
      if (!g.oppToss) { ctx.strokeStyle = 'rgba(232,192,115,.35)'; ctx.lineWidth = 2; ctx.strokeRect(x - s, H*.7 - Math.sin(.62*Math.PI)*H*.5 - 2, s*2, 4); // the scoop line: below it, too late to scoop
        ctx.fillStyle = 'rgba(159,224,184,.18)'; ctx.fillRect(x - s*1.4, H*.7 - Math.sin(.78*Math.PI)*H*.5, s*2.8, Math.sin(.78*Math.PI)*H*.5); } } // the catch zone: low, as it comes down
    lastT = t; };
  g.talk = mgSay('The Khundryl', `A Khundryl warrior with half his face painted grins at you across the hide and holds up five knucklebones in one hand. "Malazan. You know the bones?" He does not wait. "You will."`);
  draw();
}

/* MG.state: the open game's state, for the tests */
/* ---------------- where the games are ---------------- */
b2Npc(2, 'b2_road', {id:'tavi', name:'Old Tavi, a water-carrier', kind:'hissari_m', x:13, y:5, node:()=>'b2_tavi', fresh:()=>!S.f.b2_tavi});
b2Npc(3, 'b2_shallows', {id:'herd3', name:'The stragglers', kind:'weasel', x:13, y:4, node:()=>'b2_herd3', fresh:()=>!S.f.b2_herd3});
b2Npc(6, 'b2_hills', {id:'jacks6', name:'A Khundryl fire', kind:'khundryl', x:6, y:7, node:()=>'b2_jacks6', fresh:()=>!S.f.b2_jacks6});
Object.assign(B2CH2.dlg, {
  b2_tavi:()=>({sp:'Old Tavi', fx:()=>{ S.f.b2_tavi = 1; }, txt:
`An old water-carrier from the quarter is sitting by the squad's fire with three skins in front of him, a big one and two small, and nothing in his hands. He has no water to sell any more. He sold water for fifty years.

"Ressan's game," he says, when he sees you looking. "Every child in the water-sellers' quarter learns it at six. You have the big skin full and two that are not. You pour. You never spill. And you give exactly what was asked for, not a mouthful more." He nods at the column, asleep in the dark. "I have water left in the big one. I will give it to whoever can measure it. The quarter's way."${b2In('redblade') ? `\n\nRamin, at the edge of the firelight, smiles at the skins. "In Ehrlitan the water-sellers' children played it at the Old Quarter gate," he says. "My father kept the toll there. He always lost."` : ''}${(S.f.b2_measures || []).length >= MEASURES.length ? `\n\nHe grins. "You have done all three. Again, for the pleasure of it?"` : ''}`,
    ch:[{t:'Play the measure.', tag:'The Measure', go:()=>playMeasure({after:()=>talk('b2_tavi_after')})}, {t:'Leave him.', go:()=>startExplore()}]}),
  b2_tavi_after:()=>({sp:'Old Tavi', txt:`${(S.f.b2_measures || []).length >= MEASURES.length ? '"All three. Ressan would have hired you. He would have paid you badly and fed you well."' : (S.f.b2_measures || []).length ? '"Good. Come back for the next. It is harder. They all are."' : '"Water is patient. Come back when you are."'}`, ch:[{t:'On.', go:()=>startExplore()}]}),
});
Object.assign(B2CH3.dlg, {
  b2_herd3:()=>({sp:b2In('sathi') ? 'Sathi' : 'A Weasel herder', fx:()=>{ S.f.b2_herd3 = 1; }, txt: S.f.b2_herd != null ?
`${S.f.b2_herd >= 7 ? 'All seven of them are in the stretch, the cow included. The old man with the cow has not stopped thanking the dog.' : `${numw(S.f.b2_herd, true)} of them came in. The rest are out on the flat, and the dust is closer.`}` :
`The column is strung out along the Shallows like a dropped rope, and out on the flat to the west, between the column and a smear of dust that is getting bigger, are seven of your stretch: three children who went for firewood, an old man with a cow, a woman with a goat on a string that will not come, and one more child, chasing the goat.

${b2In('sathi') ? '"Riders," Sathi says, shading her eyes. "Not soon. Soon." Hackle is already up, every muscle in him pointing west. She puts two fingers in her mouth. "Tell him where, Sergeant. He knows what."' : 'A Weasel herder is watching them with his dog at his knee. "Riders," he says. "You want them back? Take my dog. Tell him where. He knows what."'}${b2In('warlock') ? `\n\nKeth, who was minding the Foolish Dog's dogs when the grandmother found him, watches the dog with a professional eye. "Low and wide," he says. "Let him go wide." The old woman, out of him: "He knows. Dogs always know. Tell the Malazan, not the dog."` : ''}`,
    ch:S.f.b2_herd != null && S.f.b2_herd >= 7 ? [{t:'On.', go:()=>startExplore()}] : [{t:S.f.b2_herd != null ? 'Send the dog out again for the rest.' : 'Send the dog.', tag:'The herd', go:()=>playHerd({after:()=>talk('b2_herd3')})}, {t:'Leave them.', go:()=>startExplore()}]}),
});
/* Nil, before the tunnel: put your hands on the ground beside him */
{ const f = B2CH3.dlg.b2_nil3; B2CH3.dlg.b2_nil3 = () => { const n = f(); n.ch = [...(S.f.b2_ground ? [] : [{t:'Put your hands on the ground beside him.', tag:'Ask the Ground', go:()=>playGround({host:'Nil', after:()=>talk('b2_ground_after')})}]), ...n.ch]; return n; }; }
Object.assign(B2CH3.dlg, {
  b2_ground_after:()=>({sp:'Nil', txt:S.f.b2_ground ? `Nil puts his hands back on the earth. "Tonight it will be asked for a great deal," he says. "It will remember you were polite."` : `"Another time," Nil says, without looking up. "It is tired tonight. So am I."`, ch:[{t:'Leave them to it.', go:()=>startExplore()}]}),
});
/* a haggle comes back to the trader's node itself (playHaggle's done → talk(node)) */
Object.assign(B2CH6.dlg, {
  b2_jacks6:()=>({sp:'A Khundryl fire', fx:()=>{ S.f.b2_jacks6 = 1; }, txt:
`A ring of Khundryl round a fire, half of them painted already, passing a cup, and in the middle of them a warrior with five knucklebones on a hide in front of him, playing against everyone in turn and beating them.

He sees you watching and holds up the bones. "Malazan! Water on the hide, and the bones decide. Or for the honour of it, if you are poor. We are all going to die tomorrow, so it is a very good time to gamble."${b2In('warlock') ? `\n\nKeth sits down at the edge of the ring, and the painted men make room for him without being asked. The old woman, out of him: "Watch his left hand, Malazan. The taw goes up out of the right. The bones are in the left."` : ''}${b2In('redblade') ? `\n\nRamin stays standing, as a Red Blade does among another people's fire, until the warrior with the bones waves him down. Then he sits, correctly.` : ''}`,
    ch:[{t:'Sit down at the hide.', tag:'Knucklebones', go:()=>playJacks({after:()=>startExplore()})}, {t:'Leave them to it.', go:()=>startExplore()}]}),
});
