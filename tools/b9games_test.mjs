// v12.0: Book Nine's games at the fires (169). Each game is offered at its chapter's fire, for the squad that chapter belongs to, right
// after "Talk with the squad", with the fire's own choices still there and "Not now" last (and taken back to the map); opens on the
// tables' frame; plays to a win and to a loss; closes to its after-node; pays once (Rations +1, or Knife in the Dirt's regard); is not
// offered again once finished; and leaves its deed. A game left early pays nothing and is offered again. The Short Sack (Ch1, the Third):
// heft (Might, its "yes, but"). The Canal Locks (Ch2, the Letherii): still in the lock (Guile, its "yes, but"). Yelt's Tally (Ch4, the
// Letherii): the stick (Wits, its "yes, but"). Under the Helmet (Ch5, the Third): read his face (Wits, its "yes, but"). Knife in the
// Dirt (Ch7, the Third): soft ground (Wits, its "yes, but"). The phases where each game is not offered; no game at the fever-fire (Ch3)
// or the battle's day (Ch6); the Witness untouched; the Deeds page, the journal, the after-nodes (no leaks, no never-names, no "!" in
// narration, no rounds or turns); phone width (412); screenshots to /tmp/claude-0/shots/b9/games/.
// Usage: node tools/b9games_test.mjs   (build first; exit 1 on a failure or a page error)
import fs from 'fs';
import { server, browser as launch, openGame } from './page.mjs';
const SHOTS = '/tmp/claude-0/shots/b9/games'; fs.mkdirSync(SHOTS, { recursive: true });
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { mobile: true, touch: true, width: 412, height: 915, settings: { master: 0, music: 0, sfx: 0, amb: 0, motion: 'on', shake: false, speed: .15 } });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const wait = ms => page.waitForTimeout(ms);
/* a fresh Book Nine save at chapter ch (the chapter's squad swapped in), with the flags given */
const setup = (ch, extra = {}) => ev(({ ch, extra }) => { if (typeof mgOpenNow === 'function' && mgOpenNow()) mgClose({}); setBook('dod'); S = newStateDOD('Hask', 'Brann'); S.picksDue = []; save(); startChapter(ch);
  S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true;
  Object.assign(S.f, extra.f || {}); (extra.join || []).forEach(id => b9Join(id)); window._wit = JSON.stringify(S.b9); window._rat = b9Rations();
  S.picksDue = []; if (m) m.hidden = true; save(); G.said = null; }, { ch, extra });
const choices = () => ev(() => [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()));
const click = re => ev(src => { const b = [...document.querySelectorAll('#sheet .choice')].find(b => new RegExp(src).test(b.textContent)); if (!b) return false; b.click(); return true; }, re);
const key = k => ev(k => MG.keys && MG.keys({key:k, preventDefault(){}}), k);
const text = () => ev(() => (document.querySelector('#sheet .txt') || {}).innerText || '');
const panel = () => ev(() => ($('#mgPanel') || {}).innerText || '');
const btn = id => ev(id => { const b = document.getElementById(id); if (!b || b.disabled) return false; b.click(); return true; }, id);
const sel = s => ev(s => { const b = document.querySelector(s); if (!b || b.disabled) return false; b.click(); return true; }, s);
const until = async (f, ms = 8000, arg) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await ev(f, arg)) return true; await wait(30); } return false; };
const fit = () => ev(() => { const vw = document.documentElement.clientWidth, bad = []; for (const el of document.querySelectorAll('#mg *')) { const b = el.getBoundingClientRect(); if (b.width && b.right > vw + 1) bad.push(el.tagName + '#' + el.id + '.' + el.className); } return {ok:document.documentElement.scrollWidth <= vw && !bad.length, bad:bad.slice(0, 3)}; });
const shot = async name => { await wait(180); await page.screenshot({ path: `${SHOTS}/${name}.png` }); };
const fireOk = async (fire, game) => { await ev(f => { G.said = null; talk(f); }, fire); const c = await choices(); return {game:c.some(t => game.test(t)), talk:c.some(t => /Talk with the squad/.test(t)), notNow:/^Not now/.test(c[c.length - 1] || ''), i:c.findIndex(t => game.test(t)), ti:c.findIndex(t => /Talk with the squad/.test(t))}; };
const fireLine = (f, m) => ok(f.game && f.talk && f.notNow && f.i === f.ti + 1, `${m}: offered right after the squad's talk; Not now still last`);
const notNow = async (fire, m) => { await ev(f => { G.said = null; talk(f); }, fire); await click('^Not now'); await wait(80); ok(await ev(() => view === 'explore' && !mgOpenNow()), `${m}: Not now goes back to the map, no table open`); };
const open = async (fire, re) => { await ev(f => { G.said = null; talk(f); }, fire); await click(re); await wait(100); };
const rnd = v => ev(v => { window._r ??= Math.random; Math.random = () => v; }, v), unrnd = () => ev(() => { if (window._r) Math.random = window._r; });
const tierLine = r => r ? `${r.who} ${r.stat} ${r.tier}` : 'no roll';
const nearNext = () => ev(() => { window._g ??= b5gRoll; b5gRoll = (...a) => { const r = window._g(...a); b5gRoll = window._g; r.tier = 'near'; r.ok = false; r.pass = true; return r; }; });
const rat = () => ev(() => b9Rations() - window._rat);
const witSame = async m => ok(await ev(() => JSON.stringify(S.b9) === window._wit), `${m}: the Witness does not move`);
const NEVER = /Bridgeburner|Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|Burn's Sleep|\b11\d\d\b|K'Chain|Nah'ruk|short-tail|Fiddler|Tarr\b|Cuttle|Hedge|Bavedict|Keneb|Blistig|Errant|Brys|Aranict|Henar|Ublala|Kalam|Tehol|Tool\b|Hetan|Tavore|Gesler|Stormy|Bonehunters|\bweeks?\b|\bmonths?\b|Glass Desert|Forkrul/;
const ROUNDS = /\b(a|the|next|this|each|every|one)\s+(round|turn)\b/;
let allPanel = '';

/* ============ 1. The Short Sack (Ch1, the Third) ============ */
await setup(1, { f: { b9_c1_ph: 3 } });
ok(await ev(() => S.thread === 't'), 'Ch1 is the Third\'s');
fireLine(await fireOk('b9_c1_fire', /biscuit sacks/), 'Ch1 the barracks yard by day: the Short Sack');
await notNow('b9_c1_fire', 'Ch1');
await open('b9_c1_fire', 'biscuit sacks');
ok(await ev(() => mgOpenNow() && /Short Sack/.test($('#mg h2').textContent) && /quartermaster/.test($('#mgPanel').innerText)), 'the scale opens; the quartermaster and his sacks');
allPanel += await panel(); await shot('1-sack-intro');
await btn('skGo'); await wait(40); ok(await ev(() => MG.state.phase === 'load' && MG.state.n === 9 && MG.state.left === 2), 'nine sacks, two weighings');
await ev(() => { MG.state.short = 0; }); await sel('#mgPanel [data-sk="0"]'); await sel('#mgPanel [data-sk="1"]'); await sel('#mgPanel [data-sk="1"]'); await wait(30);
ok(await ev(() => MG.state.pans[0] === 1 && MG.state.pans[1] === 2), 'a sack on each pan');
await shot('2-sack-pans');
await key('w'); await wait(40);
let c = await ev(() => ({left:MG.state.left, tilt:MG.state.tilt, log:MG.state.log.join(' ')}));
ok(c.left === 1 && c.tilt === -1 && /left pan rises/.test(c.log), 'weighed: the left pan rises (the short sack is on it)');
await shot('3-sack-weighed');
await key('n'); await sel('#mgPanel [data-sk="0"]'); await wait(40); ok(await ev(() => MG.state.mine === 1), 'named sack one: the lot is yours');
await until(() => MG.state.phase === 'load' && MG.state.lot === 1, 6000); await ev(() => { MG.state.short = 4; }); await key('n'); await sel('#mgPanel [data-sk="4"]');
await until(() => MG.state.over, 6000);
c = await ev(() => ({over:MG.state.over, mine:MG.state.mine, deeds:S.deeds.b9SackWon}));
ok(c.over && c.mine === 2 && c.deeds === 1, 'two lots: the game, the deed');
let f = await fit(); ok(f.ok, 'the Short Sack fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await shot('4-sack-won'); await btn('skDone'); await wait(100);
let r = await ev(() => ({node:S.node, paid:S.f.b9_sackPaid, html:(DLG[S.node]().html || '')}));
ok(r.node === 'b9_c1_sack_after' && r.paid === 1 && (await rat()) === 1 && /sack of biscuit/.test(await text()) && /Rations/.test(r.html), 'won: a sack of biscuit, Rations +1, the after-node with the Rations box');
ok(!(await fireOk('b9_c1_fire', /biscuit sacks/)).game, 'played once: the sacks are not offered again');
await ev(() => b9SackPay({won:true, done:true, mine:2, lost:0})); ok((await rat()) === 1, 'the sack is paid once a book');
await witSame('the Short Sack');
// a loss, and the heft's "yes, but"
await setup(1, { f: { b9_c1_ph: 4 } }); await open('b9_c1_fire', 'biscuit sacks'); await btn('skGo'); await wait(40);
await nearNext(); await key('h'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, stat:MG.state.check && MG.state.check.stat, left:MG.state.left, n:MG.state.n, heft:!!$('#skHeft'), panel:$('#mgPanel').innerText}));
ok(c.tier === 'near' && c.stat === 'might' && c.left === 3 && c.n === 12 && !c.heft && /three more sacks/.test(c.panel), '"yes, but" on the heft: a third weighing, and three more sacks in the lot');
await shot('5-sack-heft');
for (let i = 0; i < 2; i++) { await until(() => MG.state.phase === 'load', 6000); await ev(() => { MG.state.short = 2; }); await key('n'); await sel('#mgPanel [data-sk="5"]'); await wait(40); }
await until(() => MG.state.over, 6000);
c = await ev(() => ({lost:MG.state.lost, deeds:S.deeds.b9SackLost})); await btn('skDone'); await wait(80);
ok(c.lost === 2 && c.deeds === 1 && (await rat()) === 0 && !(await ev(() => S.f.b9_sackPaid)) && /quartermaster.s,/.test(await text()), 'the wrong sack twice: the quartermaster\'s, nothing paid');
await setup(1, { f: { b9_c1_ph: 3 } }); await open('b9_c1_fire', 'biscuit sacks'); await btn('skGo'); await key('h'); await wait(40);
c = await ev(() => MG.state.check); ok(c && c.stat === 'might', `the heft as it rolls: Might (${tierLine(c)})`);
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b9_c1_sack_after' && (await rat()) === 0 && /still on the scale/.test(await text()) && (await fireOk('b9_c1_fire', /biscuit sacks/)).game, 'left early: nothing paid, offered again');
await ev(() => { S.f.b9_c1_ph = 1; }); ok(!(await fireOk('b9_c1_fire', /biscuit sacks/)).game, 'the first night, an empty yard: no scale');

/* ============ 2. The Canal Locks (Ch2, the Letherii) ============ */
await setup(2, { f: { b9_c2_ph: 1 }, join: ['brennet'] });
ok(await ev(() => S.thread === 'l'), 'Ch2 is the Letherii\'s');
fireLine(await fireOk('b9_c2_fire', /bread-board/), 'Ch2 the muster ground: the Canal Locks');
await notNow('b9_c2_fire', 'Ch2');
await open('b9_c2_fire', 'bread-board');
ok(await ev(() => /Canal Locks/.test($('#mg h2').textContent) && /Saffa/.test($('#mgPanel').innerText)), 'the board opens; Saffa');
allPanel += await panel(); await shot('6-locks-intro');
await btn('lkGo'); await wait(40); ok(await ev(() => MG.state.phase === 'roll'), 'boats on the quay; the guest throws first');
await ev(() => { MG.state.forceDie = 3; }); await key(' '); await until(() => MG.state.phase === 'move');
ok(await ev(() => MG.state.die === 3 && document.querySelectorAll('#mgPanel [data-bt]').length === 2), 'a three: either boat');
await key('1'); await wait(30); ok(await ev(() => MG.state.me[0] === 3), 'the dock to lock three');
await until(() => MG.state.phase === 'roll' || MG.state.phase === 'call', 8000); await shot('7-locks-mid');
await ev(() => { MG.state.phase = 'roll'; MG.state.pend = null; MG.state.me = [13, 9]; MG.state.opp = [0, 0]; MG.state.forceDie = 5; }); await key(' '); await until(() => MG.state.phase === 'move'); await key('2');
await until(() => MG.state.over, 4000);
c = await ev(() => ({won:MG.state.won, deeds:S.deeds.b9LocksWon}));
ok(c.won && c.deeds === 1, 'both boats into the basin: won');
f = await fit(); ok(f.ok, 'the Canal Locks fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await btn('lkDone'); await wait(100);
r = await ev(() => ({node:S.node, paid:S.f.b9_locksPaid}));
ok(r.node === 'b9_c2_locks_after' && r.paid === 1 && (await rat()) === 1 && /bottom of Saffa.s pot/.test(await text()), 'won: the bottom of the pot, Rations +1, the after-node');
ok(!(await fireOk('b9_c2_fire', /bread-board/)).game, 'played once: the board is not offered again');
await ev(() => b9LocksPay({won:true, done:true})); ok((await rat()) === 1, 'the pot is paid once a book');
await witSame('the Canal Locks');
// still in the lock ("yes, but"), then a loss
await setup(2, { f: { b9_c2_ph: 4 } }); await open('b9_c2_fire', 'bread-board'); await btn('lkGo'); await wait(40);
await ev(() => { MG.state.me = [5, 0]; MG.state.forceDie = 1; }); await key(' '); await until(() => MG.state.phase === 'move'); await key('2'); await ev(() => { MG.state.forceDie = 5; });
await until(() => MG.state.phase === 'call', 6000);
ok(await ev(() => MG.state.phase === 'call' && !!$('#lkCall')), 'Saffa lands on your boat at lock five: it can be argued');
await shot('8-locks-call');
await nearNext(); await btn('lkCall'); await wait(60);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, stat:MG.state.check && MG.state.check.stat, me:MG.state.me.slice(), panel:$('#mgPanel').innerText}));
ok(c.tier === 'near' && c.stat === 'guile' && c.me[0] === 4 && /last lock-house/.test(c.panel), '"yes, but": half in the lock, back to the lock-house at four');
await ev(() => { MG.state.me = [0, 0]; MG.state.opp = [13, 10]; MG.state.forceDie = 1; }); await key(' '); await until(() => MG.state.phase === 'move'); await key('1'); await ev(() => { MG.state.forceDie = 4; });
await until(() => MG.state.over, 6000);
c = await ev(() => ({won:MG.state.won, deeds:S.deeds.b9LocksLost})); await btn('lkDone'); await wait(80);
ok(c.won === false && c.deeds === 1 && (await rat()) === 0 && /Saffa.s, both/.test(await text()), 'Saffa\'s boats both in: lost, nothing paid');
await setup(2, { f: { b9_c2_ph: 1 } }); await open('b9_c2_fire', 'bread-board'); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b9_c2_locks_after' && /boats still on it/.test(await text()) && (await fireOk('b9_c2_fire', /bread-board/)).game, 'left early: nothing paid, offered again');
await ev(() => { S.f.b9_c2_ph = 2; }); ok(!(await fireOk('b9_c2_fire', /bread-board/)).game, 'the drill day: no board');

/* ============ 3. Yelt's Tally (Ch4, the Letherii) ============ */
await setup(4, { f: { b9_c4_ph: 1 } });
ok(await ev(() => S.thread === 'l'), 'Ch4 is the Letherii\'s');
fireLine(await fireOk('b9_c4_fire', /Keep his tally/), 'Ch4 the train\'s fire: Yelt\'s Tally');
await notNow('b9_c4_fire', 'Ch4');
await open('b9_c4_fire', 'Keep his tally');
ok(await ev(() => /Yelt's Tally/.test($('#mg h2').textContent) && /Yelt/.test($('#mgPanel').innerText)), 'the book opens; Yelt');
allPanel += await panel(); await shot('9-tally-intro');
await btn('tlGo'); await until(() => MG.state.phase === 'calling' && MG.state.i >= 1, 4000); await shot('10-tally-call');
ok(await ev(() => MG.state.calls.length === 5 && /on|off/.test($('#mgPanel').innerText)), 'five calls, one at a time');
await until(() => MG.state.phase === 'answer', 8000);
c = await ev(() => ({opts:MG.state.opts.slice(), ans:MG.state.answer, sum:MG.state.base + MG.state.calls.reduce((a, x) => a + x.n, 0)}));
ok(c.opts.length === 4 && c.opts.includes(c.ans) && c.ans === c.sum, 'four totals to choose from, one of them the true count');
await shot('11-tally-answer');
await sel(`#mgPanel [data-tl="${c.ans}"]`); await until(() => MG.state.phase === 'ready', 4000);
await key(' '); await until(() => MG.state.phase === 'answer', 10000); await ev(() => document.querySelector(`#mgPanel [data-tl="${MG.state.answer}"]`).click());
await until(() => MG.state.over, 6000);
c = await ev(() => ({mine:MG.state.mine, deeds:S.deeds.b9TallyWon}));
ok(c.mine === 2 && c.deeds === 1, 'two wagons right: won');
f = await fit(); ok(f.ok, 'Yelt\'s Tally fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await btn('tlDone'); await wait(100);
r = await ev(() => ({node:S.node, paid:S.f.b9_tallyPaid}));
ok(r.node === 'b9_c4_tally_after' && r.paid === 1 && (await rat()) === 1 && /honest/.test(await text()), 'won: a sack the count found, Rations +1, the after-node');
ok(!(await fireOk('b9_c4_fire', /Keep his tally/)).game, 'played once: the book is not offered again');
await ev(() => b9TallyPay({won:true, done:true})); ok((await rat()) === 1, 'the sack is paid once a book');
await witSame('Yelt\'s Tally');
await setup(4, { f: { b9_c4_ph: 5 } }); await open('b9_c4_fire', 'Keep his tally');
await nearNext(); await key('s'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, stat:MG.state.check && MG.state.check.stat, slow:MG.state.slow, extra:MG.state.extra}));
ok(c.tier === 'near' && c.stat === 'wits' && c.slow && c.extra === 2, '"yes, but" on the stick: twice as slow, and two more calls');
await btn('tlGo'); await wait(30); ok(await ev(() => MG.state.calls.length === 7), 'seven calls on the first wagon');
for (let i = 0; i < 2; i++) { await until(() => MG.state.phase === 'answer' || MG.state.phase === 'ready', 20000); if (await ev(() => MG.state.phase === 'ready')) await key(' '); await until(() => MG.state.phase === 'answer', 20000);
  await ev(() => document.querySelector(`#mgPanel [data-tl]:not([data-tl="${MG.state.answer}"])`).click()); await wait(40); }
await until(() => MG.state.over, 6000);
c = await ev(() => ({lost:MG.state.lost, deeds:S.deeds.b9TallyLost})); await btn('tlDone'); await wait(80);
ok(c.lost === 2 && c.deeds === 1 && (await rat()) === 0 && /Yelt shuts the book/.test(await text()), 'the count lost twice: nothing paid');
await setup(4, { f: { b9_c4_ph: 2 } }); ok(!(await fireOk('b9_c4_fire', /Keep his tally/)).game, 'the night of the raid: no tally');
await ev(() => { S.f.b9_c4_ph = 1; }); await open('b9_c4_fire', 'Keep his tally'); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b9_c4_tally_after' && /Yelt to his book/.test(await text()) && (await fireOk('b9_c4_fire', /Keep his tally/)).game, 'left early: nothing paid, offered again');

/* ============ 4. Under the Helmet (Ch5, the Third) ============ */
await setup(5, { f: { b9_c5_ph: 1 } });
ok(await ev(() => S.thread === 't'), 'Ch5 is the Third\'s');
fireLine(await fireOk('b9_c5_fire', /Under the Helmet/), 'Ch5 the dung-fire: Under the Helmet');
await notNow('b9_c5_fire', 'Ch5');
await open('b9_c5_fire', 'Under the Helmet');
ok(await ev(() => /Under the Helmet/.test($('#mg h2').textContent) && /heavy/.test($('#mgPanel').innerText)), 'the helmet opens; a heavy from the next fire');
allPanel += await panel(); await shot('12-helm-intro');
await btn('hmGo'); await until(() => MG.state.phase === 'mine', 6000);
ok(await ev(() => !!MG.state.bid && MG.state.bid.by === 'him' && MG.state.my.length === 4), 'the heavy opens the first hand; four dice under your helmet');
await shot('13-helm-bid');
await ev(() => { MG.state.bid = {c:7, f:5, by:'him'}; MG.state.my = [2, 2, 3, 3]; MG.state.his = [5, 5, 6, 6]; }); await key('l'); await wait(40);
ok(await ev(() => MG.state.mine === 1 && MG.state.shown), 'called a lie on seven fives: two under both, the hand is yours');
await shot('14-helm-show');
await until(() => MG.state.phase === 'ready', 6000); await key(' '); await wait(40);
ok(await ev(() => MG.state.phase === 'mine' && !MG.state.bid), 'the second hand: your bid first');
await key('3'); await wait(20); ok(await ev(() => MG.state.bid && MG.state.bid.f === 3 && MG.state.bid.c === 1), 'bid one three');
await until(() => MG.state.phase === 'mine' || MG.state.phase === 'show', 6000);
await ev(() => { MG.state.phase = 'mine'; MG.state.bid = {c:8, f:4, by:'him'}; MG.state.my = [2, 2, 2, 2]; MG.state.his = [6, 6, 6, 6]; MG.state.mine = 1; MG.state.lost = 0; }); await key('l');
await until(() => MG.state.over, 6000);
c = await ev(() => ({mine:MG.state.mine, deeds:S.deeds.b9HelmWon}));
ok(c.mine === 2 && c.deeds === 1, 'two hands: the pot');
f = await fit(); ok(f.ok, 'Under the Helmet fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await btn('hmDone'); await wait(100);
r = await ev(() => ({node:S.node, paid:S.f.b9_helmPaid}));
ok(r.node === 'b9_c5_helm_after' && r.paid === 1 && (await rat()) === 1 && /bottom of the pot/.test(await text()), 'won: the pot\'s scrapings and a biscuit, Rations +1, the after-node');
ok(!(await fireOk('b9_c5_fire', /Under the Helmet/)).game, 'played once: the helmet is not offered again');
await ev(() => b9HelmPay({won:true, done:true})); ok((await rat()) === 1, 'the pot is paid once a book');
await witSame('Under the Helmet');
await setup(5, { f: { b9_c5_ph: 3 } }); await open('b9_c5_fire', 'Under the Helmet'); await btn('hmGo'); await until(() => MG.state.phase === 'mine', 6000);
await ev(() => { MG.state.bid = {c:1, f:2, by:'him'}; MG.state.my = [2, 3, 3, 3]; MG.state.his = [4, 4, 5, 5]; }); await nearNext(); await key('r'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, stat:MG.state.check && MG.state.check.stat, told:MG.state.told, must:MG.state.mustBid, liar:!!$('#hmLiar'), panel:$('#mgPanel').innerText}));
ok(c.tier === 'near' && c.stat === 'wits' && c.told === true && c.must && !c.liar && /must bid/.test(c.panel), '"yes, but" on his face: his bid stands, and he saw you looking: you must bid');
await shot('15-helm-read');
await key('l'); ok(await ev(() => MG.state.phase === 'mine' && MG.state.lost === 0), 'no calling a lie while you must bid');
for (let i = 0; i < 2; i++) { await until(() => MG.state.phase === 'mine' || MG.state.phase === 'ready' || MG.state.over, 8000); if (await ev(() => MG.state.over)) break;
  if (await ev(() => MG.state.phase === 'ready')) { await key(' '); await until(() => MG.state.phase === 'mine', 6000); }
  await ev(() => { MG.state.phase = 'mine'; MG.state.mustBid = false; MG.state.bid = {c:2, f:6, by:'him'}; MG.state.my = [6, 2, 2, 2]; MG.state.his = [6, 3, 3, 3]; }); await key('l'); await wait(40); }
await until(() => MG.state.over, 6000);
c = await ev(() => ({lost:MG.state.lost, deeds:S.deeds.b9HelmLost})); await btn('hmDone'); await wait(80);
ok(c.lost === 2 && c.deeds === 1 && (await rat()) === 0 && /heavy.s,/.test(await text()), 'two sixes were there, twice: the heavy\'s, nothing paid');
await setup(5, { f: { b9_c5_ph: 2 } }); ok(!(await fireOk('b9_c5_fire', /Under the Helmet/)).game, 'the day\'s march: no helmet');
await ev(() => { S.f.b9_c5_ph = 1; }); await open('b9_c5_fire', 'Under the Helmet'); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b9_c5_helm_after' && /heavy with his helmet/.test(await text()) && (await fireOk('b9_c5_fire', /Under the Helmet/)).game, 'left early: nothing paid, offered again');

/* ============ 5. Knife in the Dirt (Ch7, the Third) ============ */
await setup(7, { f: { b9_c7_ph: 4 } });
ok(await ev(() => S.thread === 't'), 'Ch7 is the Third\'s');
fireLine(await fireOk('b9_c7_fire', /Knife in the Dirt/), 'Ch7 the retreat camp, days after: Knife in the Dirt');
await notNow('b9_c7_fire', 'Ch7');
await open('b9_c7_fire', 'Knife in the Dirt');
ok(await ev(() => /Knife in the Dirt/.test($('#mg h2').textContent) && /heavy/.test($('#mgPanel').innerText)), 'the knife comes out; a heavy from the next fire');
allPanel += await panel(); await shot('16-knife-intro');
for (let i = 0; i < 5; i++) { await until(() => !!$('#knUp'), 6000); await btn('knUp'); await wait(40); if (!i) await shot('17-knife-swing'); await ev(() => { MG.state.force = 0; }); await btn('knGo'); await wait(30); }
ok(await ev(() => MG.state.mine === 5), 'five throws, five stuck');
await rnd(.99); await until(() => MG.state.over, 8000); await unrnd();
c = await ev(() => ({mine:MG.state.mine, his:MG.state.his, deeds:S.deeds.b9KnifeWon}));
ok(c.mine === 5 && c.his === 0 && c.deeds === 1, 'the heavy\'s first lands flat: won');
f = await fit(); ok(f.ok, 'Knife in the Dirt fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await shot('18-knife-won');
const low = await ev(() => { const k = S.squad.find(x => x !== 'sgt' && b9In(x)); S.loy[k] = -2; return k; }); await btn('knDone'); await wait(100);
r = await ev(k => ({node:S.node, loy:S.loy[k], paid:S.f.b9_knifePaid}), low);
ok(r.node === 'b9_c7_knife_after' && r.loy === -1 && r.paid === low && (await rat()) === 0 && /laughs/.test(await text()), `won: the one who needed the evening most (${low}) +1, the after-node`);
ok(!(await fireOk('b9_c7_fire', /Knife in the Dirt/)).game, 'played once: the knife is not offered again');
await ev(() => b9KnifePay({won:true, done:true})); ok((await ev(k => S.loy[k], low)) === -1, 'the regard is paid once a book');
await witSame('Knife in the Dirt');
await setup(7, { f: { b9_c7_ph: 4 } }); await open('b9_c7_fire', 'Knife in the Dirt');
await nearNext(); await key('g'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, stat:MG.state.check && MG.state.check.stat, wide:MG.state.wide, sure:MG.state.sure}));
ok(c.tier === 'near' && c.stat === 'wits' && c.wide && c.sure, '"yes, but" on the soft ground: twice the room, and the heavy\'s next is sure');
await key(' '); await wait(40); await ev(() => { MG.state.force = 1; }); await key(' '); await wait(30);
ok(await ev(() => MG.state.mine === 0 && MG.state.phase === 'him'), 'point up: it lands flat, none stuck');
await rnd(.01); await until(() => MG.state.over, 8000); await unrnd();
c = await ev(() => ({his:MG.state.his, deeds:S.deeds.b9KnifeLost})); await btn('knDone'); await wait(80);
ok(c.his === 5 && c.deeds === 1 && !(await ev(() => S.f.b9_knifePaid)) && /The heavy.s,/.test(await text()), 'the heavy sticks all five: lost, nothing paid');
await setup(7, { f: { b9_c7_ph: 4 } }); await open('b9_c7_fire', 'Knife in the Dirt'); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b9_c7_knife_after' && /back his knife/.test(await text()) && (await fireOk('b9_c7_fire', /Knife in the Dirt/)).game, 'left early: nothing paid, offered again');
await ev(() => { S.f.b9_c7_ph = 1; }); ok(!(await fireOk('b9_c7_fire', /Knife in the Dirt/)).game, 'the brew-fire before the dark: no knife');
await ev(() => { S.f.b9_c7_ph = 2; }); ok(!(await fireOk('b9_c7_fire', /Knife in the Dirt/)).game, 'in the dark, no fire and no knife');
await ev(() => { S.f.b9_c7_ph = 4; S.squad = ['sgt']; S.f.b9_knifePaid = undefined; window._rat = b9Rations(); b9KnifePay({won:true, done:true}); });
ok((await ev(() => S.f.b9_knifePaid)) === 'ration' && (await rat()) === 1, 'with nobody else walking, the knife pays Rations +1 instead');

/* no table at the fever-fire (Ch3) or on the battle's day (Ch6) */
const ours = /biscuit sacks|bread-board|Keep his tally|Under the Helmet|Knife in the Dirt/;
await setup(3, { f: { b9_c3_ph: 1 } }); ok(!(await fireOk('b9_c3_fire', ours)).game, 'the fever-fire (Ch3): no game');
await setup(6, { f: { b9_c6_ph: 1 } }); ok(!(await fireOk('b9_c6_fire', ours)).game, 'the battle\'s day (Ch6): no game');

/* the tables' words, the Deeds page, the journal, the after-nodes */
ok(!NEVER.test(allPanel) && !/!/.test(allPanel.replace(/"[^"]*"/g, '').replace(/“[^”]*”/g, '')), 'the tables name no one the book may not name, and no "!" in narration');
const dd = await ev(() => { S.deeds = Object.assign(S.deeds || {}, {b9SackWon:1, b9LocksLost:1, b9TallyWon:1, b9HelmWon:1, b9KnifeLost:1});
  const h = b9DeedsExtra([{s:S}]); return {fires:/At the fires/.test(h), rat:/Rations/.test(h), rows:['Short Sack', 'Canal Locks', 'Yelt', 'Under the Helmet', 'Knife in the Dirt'].every(k => h.includes(k)), leak:/undefined|NaN/.test(h)}; });
ok(dd.fires && dd.rat && dd.rows && !dd.leak, 'the Deeds page lists Book Nine\'s fires under Rations');
const jn = await ev(() => { S.f.b9_sackLast = {done:true, won:true}; S.f.b9_locksLast = {done:true, won:false}; S.f.b9_tallyLast = {done:true, won:true}; S.f.b9_helmLast = {done:true, won:true}; S.f.b9_knifeLast = {done:true, won:false};
  return [B9CH1.journal(), B9CH2.journal(), B9CH4.journal(), B9CH5.journal(), B9CH7.journal()].map(j => j[0]); });
ok(/quartermaster/.test(jn[0]) && /Saffa/.test(jn[1]) && /Yelt/.test(jn[2]) && /Helmet/.test(jn[3]) && /Knife/.test(jn[4]), 'each game leaves a journal line');
const leak = await ev(([NEVs, RDs]) => { const NEVER = new RegExp(NEVs), RD = new RegExp(RDs), out = [];
  const cases = {b9_c1_sack_after:[{}, {done:true, won:true, mine:2, lost:1}, {done:true, won:false, mine:0, lost:2}], b9_c2_locks_after:[{}, {done:true, won:true}, {done:true, won:false}],
    b9_c4_tally_after:[{}, {done:true, won:true, mine:2, lost:0}, {done:true, won:false, mine:1, lost:2}], b9_c5_helm_after:[{}, {done:true, won:true, mine:2, lost:1}, {done:true, won:false, mine:0, lost:2}],
    b9_c7_knife_after:[{}, {done:true, won:true, mine:4, his:2}, {done:true, won:false, mine:1, his:3}, {done:true, won:false, tie:true, mine:2, his:2}]};
  const last = {b9_c1_sack_after:'b9_sackLast', b9_c2_locks_after:'b9_locksLast', b9_c4_tally_after:'b9_tallyLast', b9_c5_helm_after:'b9_helmLast', b9_c7_knife_after:'b9_knifeLast'};
  const paid = {b9_c7_knife_after:['b9_knifePaid', ['haddat', 'brask', 'ration']]};
  Object.entries(cases).forEach(([k, rs]) => rs.forEach(r => (paid[k] ? paid[k][1] : [null]).forEach(p => { S.f[last[k]] = r; if (paid[k]) S.f[paid[k][0]] = p; const n = DLG[k](), t = n.txt, bare = t.replace(/"[^"]*"/g, '');
    if (!t.trim() || /undefined|NaN|\[object|\$\{|\bnull\b/.test(t)) out.push(k + ' leaks'); if (NEVER.test(t)) out.push(k + ' a never-use name'); if (/!/.test(bare)) out.push(k + ' an exclamation mark in narration');
    if (RD.test(bare)) out.push(k + ' rounds or turns'); if (n.scene && !SCENES[n.scene]) out.push(k + ' no scene ' + n.scene); if (!n.ch.length || n.ch[0].go !== k.replace(/_[a-z]+_after$/, '_fire')) out.push(k + ' no way back'); }))); return out; }, [NEVER.source, ROUNDS.source]);
ok(!leak.length, 'the after-nodes read cleanly, every way' + (leak.length ? ': ' + leak.join(' ') : ''));
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
