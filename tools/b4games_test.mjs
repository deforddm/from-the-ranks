// v7.0: Book Four's games at the fires (79). Each game is offered at its chapter's fire beside the fire's own choices (the rest, the
// squad's talk, Not now), opens on the tables' frame, plays to a win and to a loss from the panel and the keys, closes to its
// after-node, pays once a book, and leaves its deed; a game left early pays nothing. Shells: a stake won and lost, the palm called
// (Nerve +1, once), Darrut's check and its "yes, but" (the blanket folds), the silver cap. The cup: drunk level and boasted (Orvas +1),
// spilt (nothing). The hand game: the sticks taken (Nerve +1), Tebbet's read. The Fuse: five on the count (a sharper), Tangle's thumb.
// The feather: three passes (Sathi +1), Keth's lead on the Wickan road, and none after nightfall. The Deeds page, the journal, phone
// width, and screenshots of each table to /tmp/claude-0/shots/b4/games/.
// Usage: node tools/b4games_test.mjs   (build first; exit 1 on a failure or a page error)
import fs from 'fs';
import { server, browser as launch, openGame } from './page.mjs';
const SHOTS = '/tmp/claude-0/shots/b4/games'; fs.mkdirSync(SHOTS, { recursive: true });
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { mobile: true, touch: true, width: 360, height: 780, settings: { master: 0, music: 0, sfx: 0, amb: 0, motion: 'on', shake: false, speed: 1 } });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const wait = ms => page.waitForTimeout(ms);
const setup = (ch, squad, extra = {}) => ev(({ ch, squad, extra }) => { setBook('hoc'); S = newStateHOC('Hask'); S.chapter = ch; S.squad = ['sgt', ...squad]; S.dead = {}; migrate(S); S.picksDue = [];
  S.squad.forEach(k => { if (k !== 'sgt') S.loy[k] = 0; }); S.silver = 12; S.nerve = 5; S.inv = {sharper:1, burner:1, cusser:0, smoker:1, salve:2}; Object.assign(S.f, extra.f || {}); if (extra.imported) S.imported = extra.imported; save(); G.said = null; }, { ch, squad, extra });
const choices = () => ev(() => [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()));
const click = re => ev(src => { const b = [...document.querySelectorAll('#sheet .choice')].find(b => new RegExp(src).test(b.textContent)); if (!b) return false; b.click(); return true; }, re);
const key = k => ev(k => MG.keys && MG.keys({key:k, preventDefault(){}}), k);
const text = () => ev(() => (document.querySelector('#sheet .txt') || {}).innerText || '');
const btn = id => ev(id => { const b = document.getElementById(id); if (!b) return false; b.click(); return true; }, id);
const until = async (f, ms = 6000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await ev(f)) return true; await wait(40); } return false; };
const fit = () => ev(() => { const vw = document.documentElement.clientWidth, bad = []; for (const el of document.querySelectorAll('#mg *')) { const b = el.getBoundingClientRect(); if (b.width && b.right > vw + 1) bad.push(el.tagName + '#' + el.id + '.' + el.className); } return {ok:document.documentElement.scrollWidth <= vw && !bad.length, bad:bad.slice(0, 3)}; });
const shot = async name => { await wait(120); await page.screenshot({ path: `${SHOTS}/${name}.png` }); };
/* the fire still offers its own choices beside the game */
const fireOk = async (fire, game) => { await ev(f => { G.said = null; talk(f); }, fire); const c = await choices(); return {game:c.some(t => game.test(t)), rest:c.some(t => /rest/.test(t)), talk:c.some(t => /Talk with the squad/.test(t)), notNow:c.some(t => /^Not now/.test(t)), i:c.findIndex(t => game.test(t)), ti:c.findIndex(t => /Talk with the squad/.test(t))}; };
const fireLine = (f, m) => ok(f.game && f.rest && f.talk && f.notNow && f.i === f.ti + 1, `${m}: offered beside the squad's talk; the rest and Not now still there`);

/* ============ 1. Shells ============ */
await setup(1, ['darrut', 'tangle', 'marrow', 'tallow']);
fireLine(await fireOk('b4_c1_yard', /three shells/), 'Ch1 the yard: Shells');
await click('three shells'); await wait(100);
ok(await ev(() => mgOpenNow() && /Shells/.test($('#mg h2').textContent) && /Darrut has come to stand/.test($('#mgPanel').innerText)), 'the blanket opens; Darrut stands behind the sergeant');
await shot('1-shells-stake');
// a stake of one, won
await key('1'); await until(() => MG.state.phase === 'shuffle'); await wait(300); await shot('2-shells-shuffle');
await until(() => MG.state.phase === 'pick'); let sh = await ev(() => ({slot:MG.state.slot[MG.state.pea], silver:S.silver}));
await key(String(sh.slot + 1)); await wait(150); let sr = await ev(() => ({silver:S.silver, won:MG.state.won, deeds:S.deeds, net:S.f.b4_shellsNet}));
ok(sr.silver === sh.silver + 1 && sr.won === 1 && sr.deeds.b4ShellsWon === 1 && sr.net === 1, 'the right shell: the stake paid, the deed');
await until(() => MG.state.phase === 'stake');
// a stake of two, lost
await key('2'); await until(() => MG.state.phase === 'pick'); sh = await ev(() => ({slot:MG.state.slot[MG.state.pea], silver:S.silver}));
await key(String((sh.slot + 1) % 3 + 1)); await wait(150); sr = await ev(() => ({silver:S.silver, lost:MG.state.lost, deeds:S.deeds}));
ok(sr.silver === sh.silver - 2 && sr.lost === 1 && sr.deeds.b4ShellsLost === 1, 'the wrong shell: the stake lost');
await until(() => MG.state.phase === 'stake');
// the big stake, palmed: Darrut rolls to spot it (a fumble, then a made roll); the palm called pays double and Nerve +1, once
await ev(() => { window._r = Math.random; Math.random = () => .01; }); await key('3'); await until(() => MG.state.phase === 'pick'); await ev(() => { Math.random = window._r; });
sr = await ev(() => ({palmed:MG.state.palmed, who:MG.state.roll && MG.state.roll.who, tier:MG.state.roll && MG.state.roll.tier, spot:MG.state.spot, panel:$('#mgPanel').innerText}));
ok(sr.palmed && sr.who === 'darrut' && sr.tier === 'fumble' && sr.spot === '' && /Darrut · Wits/.test(sr.panel), `the big stake palmed; Darrut's Wits check shown (${sr.tier}): nothing seen`);
await shot('3-shells-palm'); sh = await ev(() => ({silver:S.silver, nerve:S.nerve}));
await key('c'); await wait(150); sr = await ev(() => ({silver:S.silver, called:MG.state.called, deeds:S.deeds, caught:S.f.b4_shellsCaught}));
ok(sr.silver === sh.silver + 6 && sr.deeds.b4ShellsPalm === 1 && sr.caught === 1, 'the palm called: double the stake');
await until(() => MG.state.phase === 'stake');
await ev(() => { Math.random = () => .69; }); await key('3'); await until(() => MG.state.phase === 'pick'); await ev(() => { Math.random = window._r; });
sr = await ev(() => ({palmed:MG.state.palmed, tier:MG.state.roll && MG.state.roll.tier, spot:MG.state.spot, talk:$('#mgPanel').innerText}));
ok(sr.palmed && (sr.spot === 'told' ? /Left hand/.test(sr.talk) : sr.spot === 'loud' ? /Palm/.test(sr.talk) : true), `a made roll tells the sergeant where the pea went (${sr.tier}, ${sr.spot || 'nothing'})`);
// the "yes, but": Darrut says it out loud; the call pays, and the Aren man folds the blanket
await ev(() => { MG.state.spot = 'loud'; }); await key('c'); await wait(150); await until(() => MG.state.phase === 'stake');
sr = await ev(() => ({folded:MG.state.folded, done:!!$('#shDone'), stakes:document.querySelectorAll('#mgPanel [data-st]').length}));
ok(sr.folded && sr.done && !sr.stakes, '"yes, but": said out loud, the call pays, and the blanket is rolled up');
let f = await fit(); ok(f.ok, 'Shells fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('shDone'); await wait(120);
sr = await ev(() => ({node:S.node, nerve:S.nerve, paid:S.f.b4_shellsPaid, last:S.f.b4_shellsLast}));
ok(sr.node === 'b4_c1_shells_after' && /palm|hand opened|Aren man's silver/.test(await text()) && sr.nerve === sh.nerve + 1 && sr.paid === 1, 'back at the fire: the after-node, Nerve +1 for the hand opened');
ok((await choices()).some(t => /Back to the fire/.test(t)), 'the after-node leads back to the fire');
// a second palm called pays no more Nerve; the cap stops the game; left early pays nothing
await ev(() => { b4ShellsPay({called:1, won:1}); }); ok((await ev(() => S.nerve)) === sh.nerve + 1, 'the Nerve is paid once a book');
await ev(() => { S.f.b4_shellsNet = 15; }); ok(!(await fireOk('b4_c1_yard', /three shells/)).game, 'at the cap (15 silver won) the blanket is not offered');
await ev(() => { S.f.b4_shellsNet = 14; S.silver = 10; G.said = null; talk('b4_c1_yard'); }); await click('three shells'); await wait(80); await key('2'); await until(() => MG.state.phase === 'pick');
sh = await ev(() => MG.state.slot[MG.state.pea]); await key(String(sh + 1)); await wait(150); await until(() => MG.state.phase === 'stake');
sr = await ev(() => ({net:S.f.b4_shellsNet, folded:MG.state.folded, silver:S.silver})); ok(sr.net === 15 && sr.folded && sr.silver === 11, 'a win past the cap pays only to 15, then he folds');
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => B4CH1.journal().some(l => /Aren man ran shells/.test(l)))), 'the journal has the shells');

/* ============ 2. The Burned Tears' cup ============ */
await setup(3, ['haddat', 'tangle', 'marrow', 'orvas'], { f: { b4_orvasDone: 1 } });
fireLine(await fireOk('b4_c3_feast', /passing a horn/), 'Ch3 the feast: the cup');
await click('passing a horn'); await wait(100); ok(await ev(() => /Burned Tears/.test($('#mg h2').textContent) && /Orvas/.test($('#mgPanel').innerText)), 'the cup opens; Orvas has his line');
const level = () => ev(() => { MG.state.sw0 = performance.now(); });
const spill = () => ev(() => { const g = MG.state; g.sw0 = performance.now() - b4gPace(560 / (1 + g.drunk * .32)) * Math.PI / 2; });
await btn('cpGo'); await wait(60); await shot('4-cup-drink');
for (let h = 0; h < 4; h++) { if (h) await btn('cpGo'); await wait(40); await level(); await key(' '); await wait(40); if (!h) await shot('5-cup-boast'); await key('2'); await wait(60); }
let cr = await ev(() => ({over:MG.state.over, regard:MG.state.regard, deeds:S.deeds, spilt:MG.state.cleanHorns}));
ok(cr.over && cr.regard === 8 && cr.spilt === 4 && cr.deeds.b4CupWon === 1, `four horns drunk level, four bold boasts: regard ${cr.regard}, the cup`);
f = await fit(); ok(f.ok, 'the cup fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('cpDone'); await wait(100); cr = await ev(() => ({node:S.node, loy:S.loy.orvas, nerve:S.nerve, paid:S.f.b4_cupPaid}));
ok(cr.node === 'b4_c3_cup_after' && cr.loy === 1 && cr.nerve === 5 && cr.paid === 1 && /cup still in your hand/.test(await text()), 'the cup won: Orvas +1 loyalty, the after-node');
// a tall boast is a Guile check with Orvas vouching; a spilt horn sinks a bold one; losing pays nothing
await setup(3, ['haddat', 'tangle', 'marrow', 'tallow']); await ev(() => talk('b4_c3_feast')); await click('passing a horn'); await wait(80); await btn('cpGo'); await wait(40);
await spill(); await key(' '); await wait(40); await key('2'); await wait(60); cr = await ev(() => ({regard:MG.state.regard, horn:MG.state.horn}));
ok(cr.regard === 0 && cr.horn === 1, 'a horn spilt and a bold boast after it: the fire laughs, no regard');
await btn('cpGo'); await wait(40); await level(); await key(' '); await wait(40); await key('3'); await wait(60);
cr = await ev(() => ({roll:MG.state.roll, regard:MG.state.regard}));
ok(cr.roll && cr.roll.who === 'sgt' && cr.roll.stat === 'guile' && (cr.roll.ok ? cr.regard === 3 : cr.roll.tier === 'near' ? cr.regard === 3 : cr.regard === 0), `a tall boast: the sergeant's Guile check (${cr.roll && cr.roll.tier}), regard ${cr.regard}`);
for (let h = 2; h < 4; h++) { await btn('cpGo'); await wait(40); await spill(); await key(' '); await wait(40); await key('1'); await wait(60); }
cr = await ev(() => ({over:MG.state.over, won:MG.state.regard >= 6, deeds:S.deeds}));
await btn('cpDone'); await wait(100); const cl = await ev(() => ({nerve:S.nerve, paid:S.f.b4_cupPaid}));
ok(cr.over && !cr.won && cr.deeds.b4CupLost === 1 && cl.nerve === 5 && !cl.paid && /good try|kindly|ford/.test(await text()), 'the cup lost: no Nerve, no pay, the after-node');
await ev(() => { S.f.b4_c3_brawlDone = 1; }); ok(!(await fireOk('b4_c3_feast', /passing a horn/)).game, 'after the brawl the feast is going out, and the horn is not offered');
await ev(() => { delete S.f.b4_cupPaid; b4CupPay({done:true, won:true}); }); ok((await ev(() => S.nerve)) === 6, 'without Orvas near, the cup won is Nerve +1');

/* ============ 3. The hand game ============ */
await setup(4, ['haddat', 'tangle', 'marrow', 'tebbet']);
fireLine(await fireOk('b4_c4_setifire', /tally sticks/), 'Ch4 the Seti fire: the hand game');
await click('tally sticks'); await wait(100); ok(await ev(() => /hand game/.test($('#mg h2').textContent)), 'the hand game opens');
await btn('hgGo'); await wait(500); await shot('6-hands-song');
let read = null;
for (let turn = 0; turn < 8; turn++) { if (turn) await btn('hgGo');
  if (turn % 2 === 0) { await until(() => MG.state.phase === 'guess'); if (!read) { await btn('hgRead'); await wait(60); read = await ev(() => MG.state.roll); await shot('7-hands-guess'); }
    const b = await ev(() => MG.state.bone); await key(b ? 'ArrowRight' : 'ArrowLeft'); await wait(60); }
  else { await until(() => MG.state.phase === 'hide'); await ev(() => document.querySelector('#mgPanel [data-h="0"]').click()); await wait(845); if (turn === 1) await shot('8-hands-face');
    await ev(() => { MG.state.seen = false; window._r = Math.random; Math.random = () => .99; }); await btn('hgSteady'); await wait(900); await ev(() => { Math.random = window._r; }); } }
let hr = await ev(() => ({over:MG.state.over, mine:MG.state.mine, theirs:MG.state.theirs, deeds:S.deeds}));
ok(read && read.who === 'tebbet' && read.stat === 'wits', `Tebbet reads the archer (a bowman reads a bowman): ${read && read.tier}`);
ok(hr.over && hr.mine === 8 && hr.deeds.b4HandsWon === 1, `every guess right, every face held: ${hr.mine} sticks to ${hr.theirs}`);
f = await fit(); ok(f.ok, 'the hand game fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('hgDone'); await wait(100); hr = await ev(() => ({node:S.node, nerve:S.nerve, paid:S.f.b4_handsPaid}));
ok(hr.node === 'b4_c4_hands_after' && hr.nerve === 6 && hr.paid === 1 && /took the sticks/.test(await text()), 'the sticks taken: Nerve +1, the after-node');
await ev(() => { G.said = null; talk('b4_c4_setifire'); }); await click('tally sticks'); await wait(80); await btn('hgGo');
for (let turn = 0; turn < 8; turn++) { if (turn) await btn('hgGo');
  if (turn % 2 === 0) { await until(() => MG.state.phase === 'guess'); const b = await ev(() => MG.state.bone); await key(b ? 'ArrowLeft' : 'ArrowRight'); await wait(60); }
  else { await until(() => MG.state.phase === 'hide'); await key('ArrowRight'); await wait(100); await ev(() => { window._r = Math.random; Math.random = () => .01; }); await btn('hgSteady'); await wait(900); await ev(() => { Math.random = window._r; }); } }
hr = await ev(() => ({over:MG.state.over, theirs:MG.state.theirs, deeds:S.deeds})); await btn('hgDone'); await wait(100);
ok(hr.over && hr.theirs === 8 && hr.deeds.b4HandsLost === 1 && (await ev(() => S.nerve)) === 6 && /keep the sticks/.test(await text()), 'every guess wrong: the archers keep the sticks, no more Nerve ' + JSON.stringify([hr.over, hr.theirs, hr.deeds.b4HandsLost]));
await ev(() => { G.said = null; talk('b4_c4_setifire'); }); await click('tally sticks'); await wait(80); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b4_c4_hands_after' && /leave the sticks/.test(await text()), 'left early: the after-node says so');

/* ============ 4. The Fuse ============ */
await setup(5, ['haddat', 'tangle', 'marrow', 'tallow']); await ev(() => { S.dust = 1; });
fireLine(await fireOk('b4_c5_wallfire', /cutting fuse/), 'Ch5 the Wall\'s fire: the Fuse');
await click('cutting fuse'); await wait(100); ok(await ev(() => /Fuse/.test($('#mg h2').textContent) && /Tangle sits down/.test($('#mgPanel').innerText)), 'the Fuse opens; Tangle sits down to it');
const onCount = () => ev(() => { const g = MG.state; g.t0 = performance.now() - g.want * 1000 * b4gPace(1) / g.speed; });
let fr0 = await ev(() => S.inv.sharper);
for (let c = 0; c < 5; c++) { await btn('fuGo'); await wait(40); if (!c) { const r = await ev(() => MG.state.roll); ok(r && r.who === 'tangle' && r.stat === 'wits', `Tangle reads the cord first (Wits, a sapper's edge): ${r && r.tier}, thumb ${await ev(() => MG.state.thumb)}`); await wait(500); await shot('9-fuse-reel'); }
  await onCount(); await key(' '); await wait(80); if (!c) await shot('10-fuse-burn'); await until(() => MG.state.phase === 'between' || MG.state.over, 3000); }
let fr = await ev(() => ({over:MG.state.over, err:MG.state.err, deeds:S.deeds}));
ok(fr.over && fr.err.every(e => e <= .1) && fr.deeds.b4FuseWon === 1 && fr.deeds.b4FuseClean === 1, `five lengths on the count (${fr.err.join(', ')}): won, clean`);
f = await fit(); ok(f.ok, 'the Fuse fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('fuDone'); await wait(100); fr = await ev(() => ({node:S.node, sharper:S.inv.sharper, paid:S.f.b4_fusePaid}));
ok(fr.node === 'b4_c5_fuse_after' && fr.sharper === fr0 + 1 && fr.paid === 1 && /a sharper/.test(await text()), 'clean: a sharper off the company\'s sapper, the after-node');
await ev(() => { G.said = null; talk('b4_c5_wallfire'); }); await click('cutting fuse'); await wait(80);
for (let c = 0; c < 5; c++) { await btn('fuGo'); await wait(40); await key(' '); await wait(60); await until(() => MG.state.phase === 'between' || MG.state.over, 3000); }
fr = await ev(() => ({over:MG.state.over, deeds:S.deeds})); await btn('fuDone'); await wait(100);
ok(fr.over && fr.deeds.b4FuseLost === 1 && (await ev(() => S.inv.sharper)) === fr0 + 1 && /nothing else/.test(await text()), 'every length cut at once: lost, no munition');
await ev(() => { delete S.f.b4_fusePaid; const s0 = S.inv.smoker; b4FusePay({done:true, won:true, clean:false}); window._sm = S.inv.smoker - s0; }); ok((await ev(() => window._sm)) === 1, 'a win that is not clean pays a smoker');

/* ============ 5. The feather ============ */
await setup(6, ['haddat', 'sathi', 'tangle', 'marrow'], { f: { b4_c6_ph: 1 } });
fireLine(await fireOk('b4_c6_picketfire', /crow feather/), 'Ch6 the picket: the feather');
await click('crow feather'); await wait(100); ok(await ev(() => /feather/.test($('#mg h2').textContent) && /Sathi/.test($('#mgPanel').innerText)), 'the feather opens; Sathi rides beside');
await btn('feMount'); await wait(60); let fe = await ev(() => ({roll:MG.state.roll, horse:MG.state.horse}));
ok(fe.roll && fe.roll.who === 'sgt' && fe.roll.stat === 'might' && fe.horse, `the sergeant mounts the Wickan horse (Might, Sathi's edge): ${fe.roll && fe.roll.tier}, ${fe.horse}`);
for (let p = 0; p < 3; p++) { await btn('feGo'); await wait(30);
  await ev(async () => { const g = MG.state, c = g.t0 + (g.fx + .15) / 1.3 * g.dur, at = c - (b4gPace(110) + b4gPace(520)) / 2; while (performance.now() < at) await new Promise(r => setTimeout(r, 8)); MG.keys({key:' ', preventDefault(){}}); });
  if (!p) await shot('11-feather-ride');
  await until(() => MG.state.phase === 'youth'); await ev(() => { window._r = Math.random; Math.random = () => .99; }); await until(() => MG.state.phase === 'ready' || MG.state.over, 4000); await ev(() => { Math.random = window._r; }); }
fe = await ev(() => ({over:MG.state.over, mine:MG.state.mine, theirs:MG.state.theirs, deeds:S.deeds}));
ok(fe.over && fe.mine === 3 && fe.theirs === 0 && fe.deeds.b4FeatherWon === 1 && fe.deeds.b4Feathers === 3, `three feathers taken at the gallop, the youths none: ${fe.mine} to ${fe.theirs}`);
f = await fit(); ok(f.ok, 'the feather fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('feDone'); await wait(100); fe = await ev(() => ({node:S.node, loy:S.loy.sathi, nerve:S.nerve, paid:S.f.b4_featherPaid}));
ok(fe.node === 'b4_c6_feather_after' && fe.loy === 1 && fe.nerve === 5 && fe.paid === 1 && /Sathi walks beside you/.test(await text()), 'won: Sathi +1 loyalty, the after-node');
await ev(() => { G.said = null; talk('b4_c6_picketfire'); }); await click('crow feather'); await wait(80); await btn('feMount'); await wait(40);
for (let p = 0; p < 3; p++) { await btn('feGo'); await until(() => MG.state.phase === 'youth', 5000); await ev(() => { window._r = Math.random; Math.random = () => .01; }); await until(() => MG.state.phase === 'ready' || MG.state.over, 4000); await ev(() => { Math.random = window._r; }); }
fe = await ev(() => ({over:MG.state.over, mine:MG.state.mine, theirs:MG.state.theirs, deeds:S.deeds})); await btn('feDone'); await wait(100);
ok(fe.over && fe.mine === 0 && fe.theirs === 3 && fe.deeds.b4FeatherLost === 1 && (await ev(() => S.loy.sathi)) === 1, 'no lean: the youths take all three, no pay');
await ev(() => { S.f.b4_c6_ph = 2; }); ok(!(await fireOk('b4_c6_picketfire', /crow feather/)).game, 'after nightfall there is no riding behind the lines');
// the Wickan road with Keth walking: Keth leads the game, and the win is his loyalty
await setup(6, ['haddat', 'tangle', 'marrow', 'warlock'], { f: { b4_c6_ph: 1, b4_kethDone: 1 }, imported: { from:'Kell', sid:'t', road:'wickans', lvl:8, mates:['haddat', 'tangle', 'marrow'], dead:[], ramin:false, keth:true, f:{b2_c7_key:'wickans'} } });
let kc = await choices(); await ev(() => talk('b4_c6_picketfire')); kc = await choices();
ok(kc.some(t => /Keth is over at the horse lines/.test(t)), 'on the Wickan road Keth leads the feather');
await click('crow feather'); await wait(80); ok(await ev(() => /Keth/.test($('#mgPanel').innerText)), 'Keth has the first word at the horse lines'); await shot('12-feather-keth');
await ev(() => MG.leave()); await wait(80); ok((await ev(() => S.node)) === 'b4_c6_feather_after' && !(await ev(() => S.f.b4_featherPaid)), 'left early: nothing paid');
await ev(() => { b4FeatherPay({done:true, won:true}); }); ok((await ev(() => S.loy.warlock)) === 1, 'a win with Keth leading is Keth\'s loyalty');

/* the Deeds page and the journal */
const dd = await ev(() => { S.deeds = Object.assign(S.deeds || {}, {b4ShellsWon:2, b4ShellsLost:1, b4ShellsPalm:1, b4CupWon:1, b4HandsWon:1, b4FuseWon:1, b4FuseClean:1, b4FeatherWon:1, b4Feathers:3}); S.f.b4_cupBest = 8; S.f.b4_fuseBest = .3;
  const h = b4DeedsExtra([{s:S}]); return {fires:/At the fires/.test(h), nerve:/Nerve and Dust/.test(h), rows:['Shells', 'Burned Tears', 'hand game', 'The Fuse', 'The feather'].every(k => h.includes(k)), palm:/palm called once/.test(h), leak:/undefined|NaN/.test(h)}; });
ok(dd.fires && dd.nerve && dd.rows && dd.palm && !dd.leak, "the Deeds page lists Book Four's fires under Nerve and Dust");
const jn = await ev(() => { S.f.b4_cupLast = {done:true, won:true}; S.f.b4_handsLast = {done:true, won:false}; S.f.b4_fuseLast = {done:true, won:true}; S.f.b4_featherLast = {done:true, won:true};
  return [B4CH3.journal(), B4CH4.journal(), B4CH5.journal(), B4CH6.journal()].map(j => j[0]); });
ok(/horn/.test(jn[0]) && /hand game/.test(jn[1]) && /fuse/.test(jn[2]) && /feather/.test(jn[3]), 'each game leaves a journal line');
const leak = await ev(() => ['b4_c1_shells_after', 'b4_c3_cup_after', 'b4_c4_hands_after', 'b4_c5_fuse_after', 'b4_c6_feather_after'].filter(k => { const t = DLG[k]().txt; return !t.trim() || /undefined|NaN|\[object|\$\{/.test(t); }));
ok(!leak.length, 'the after-nodes read cleanly' + (leak.length ? ': ' + leak.join(' ') : ''));
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
