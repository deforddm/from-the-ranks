// v9.1: Book Six's games at the fires (109). Each game is offered at its chapter's fire beside the fire's own choices (the rest, the squad's
// talk, Not now), opens on the tables' frame, plays to a win and to a loss from the panel and the keys, closes to its after-node, pays once a
// book, is not offered again once finished, and leaves its deed; a game left early pays nothing and can be come back to. Bones (Ch1, the
// Third): silver won, the cocked bone argued (Guile, its "yes, but"). Falari Tide (Ch2, the Fourth): Brannoc +1, the wrist (Guile, its
// "yes, but"), a salve without him. Who's Next (Ch4, the Fourth): a fever broken, the stones counted (Wits, its "yes, but"). The Jetty Race
// (Ch5, the Third): a sharper, the yard rigged (Wits, its "yes, but"). The Grey Helms' Signs (Ch7, the Third at sea): Ottar +1, asked again
// (Wits, its "yes, but"). The Deeds page, the journal, phone width (412), and screenshots of each table to /tmp/claude-0/shots/b6/games/.
// Usage: node tools/b6games_test.mjs   (build first; exit 1 on a failure or a page error)
import fs from 'fs';
import { server, browser as launch, openGame } from './page.mjs';
const SHOTS = '/tmp/claude-0/shots/b6/games'; fs.mkdirSync(SHOTS, { recursive: true });
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { mobile: true, touch: true, width: 412, height: 860, settings: { master: 0, music: 0, sfx: 0, amb: 0, motion: 'on', shake: false, speed: .15 } });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const wait = ms => page.waitForTimeout(ms);
/* a Book Six save at chapter ch (the squad that plays it swapped in), with a purse and the flags given */
const setup = (ch, extra = {}) => ev(({ ch, extra }) => { if (typeof mgOpenNow === 'function' && mgOpenNow()) mgClose({}); setBook('bh'); S = newStateBH('Hask', 'Brann'); S.picksDue = []; S.th.h.picksDue = []; save(); startChapter(ch);
  S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; S.silver = 12; S.inv = {sharper:1, burner:1, cusser:0, smoker:1, salve:2}; S.fever = {};
  Object.assign(S.f, extra.f || {}); (extra.join || []).forEach(id => { b6Join(id); if (S.loy[id] == null) S.loy[id] = 0; }); if (extra.fever) S.fever = {[extra.fever]:ch};
  S.picksDue = []; if (m) m.hidden = true; save(); G.said = null; }, { ch, extra });
const choices = () => ev(() => [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()));
const click = re => ev(src => { const b = [...document.querySelectorAll('#sheet .choice')].find(b => new RegExp(src).test(b.textContent)); if (!b) return false; b.click(); return true; }, re);
const key = k => ev(k => MG.keys && MG.keys({key:k, preventDefault(){}}), k);
const text = () => ev(() => (document.querySelector('#sheet .txt') || {}).innerText || '');
const btn = id => ev(id => { const b = document.getElementById(id); if (!b || b.disabled) return false; b.click(); return true; }, id);
const until = async (f, ms = 8000, arg) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await ev(f, arg)) return true; await wait(30); } return false; };
const fit = () => ev(() => { const vw = document.documentElement.clientWidth, bad = []; for (const el of document.querySelectorAll('#mg *')) { const b = el.getBoundingClientRect(); if (b.width && b.right > vw + 1) bad.push(el.tagName + '#' + el.id + '.' + el.className); } return {ok:document.documentElement.scrollWidth <= vw && !bad.length, bad:bad.slice(0, 3)}; });
const shot = async name => { await wait(150); await page.screenshot({ path: `${SHOTS}/${name}.png` }); };
const fireOk = async (fire, game) => { await ev(f => { G.said = null; talk(f); }, fire); const c = await choices(); return {game:c.some(t => game.test(t)), rest:c.some(t => /rest/.test(t)), talk:c.some(t => /Talk with the squad/.test(t)), notNow:/^Not now/.test(c[c.length - 1] || ''), i:c.findIndex(t => game.test(t)), ti:c.findIndex(t => /Talk with the squad/.test(t))}; };
const fireLine = (f, m) => ok(f.game && f.rest && f.talk && f.notNow && f.i === f.ti + 1, `${m}: offered beside the squad's talk; the rest and Not now still there`);
const notNow = async (fire, m) => { await ev(f => { G.said = null; talk(f); }, fire); await click('^Not now'); await wait(80); ok(await ev(() => view === 'explore' && !mgOpenNow()), `${m}: Not now goes back to the map, no table open`); };
const rnd = v => ev(v => { window._r ??= Math.random; Math.random = () => v; }, v), unrnd = () => ev(() => { if (window._r) Math.random = window._r; });
const tierLine = r => r ? `${r.who} ${r.stat} ${r.tier}` : 'no roll';
/* force the next in-game check to its "yes, but" tier (the roll itself is real; only the tier is read) */
const nearNext = () => ev(() => { window._g ??= b5gRoll; b5gRoll = (...a) => { const r = window._g(...a); b5gRoll = window._g; r.tier = 'near'; r.ok = false; r.pass = true; return r; }; });

/* ============ 1. Bones, with the new draft (Ch1, the Third) ============ */
await setup(1);
fireLine(await fireOk('b6_c1_fire', /pair of bones/), 'Ch1 the Third\'s fire: Bones');
await notNow('b6_c1_fire', 'Ch1');
await ev(() => { G.said = null; talk('b6_c1_fire'); }); await click('pair of bones'); await wait(100);
ok(await ev(() => mgOpenNow() && /Bones/.test($('#mg h2').textContent) && /draft out of Aren/.test($('#mgPanel').innerText)), 'the blanket opens; the draft out of Aren');
await shot('1-bones-stake');
await key(' '); await wait(60); ok(await ev(() => MG.state.started && MG.state.stake === 1), 'a stake of one silver');
// a win: two sixes doubled from 1 is 25
await ev(() => { MG.state.me = 1; }); await rnd(.9); await key(' '); await until(() => MG.state.over); await unrnd();
let b = await ev(() => ({net:MG.state.net, won:MG.state.won, deeds:S.deeds.b6BonesWon, again:!!$('#b6bAgain')}));
ok(b.net === 1 && b.won === 1 && b.deeds === 1 && b.again, 'two sixes to 25: the stake won, the deed, another game offered');
await shot('2-bones-won');
// another game: a skull that costs 8, and the bone called cocked
await btn('b6bAgain'); await wait(40); await ev(() => document.querySelector('#mgPanel [data-st="2"]').click()); await wait(40);
await ev(() => { MG.state.turn = 8; let i = 0; const seq = [.01, .9]; window._r ??= Math.random; Math.random = () => seq[i++ % 2]; }); await key(' '); await until(() => MG.state.callReady || MG.state.who === 'opp'); await unrnd();
ok(await ev(() => MG.state.callReady && !!$('#b6bCall')), 'a skull after 8: the bone can be argued');
await shot('3-bones-call');
let n0 = await ev(() => MG.state.net); await btn('b6bCall'); await wait(60);
b = await ev(() => ({check:MG.state.check, turn:MG.state.turn, net:MG.state.net, who:MG.state.who, panel:$('#mgPanel').innerText}));
ok(b.check && b.check.stat === 'guile' && (b.check.ok ? b.turn === 8 && b.net === n0 : b.check.tier === 'near' ? b.turn === 8 && b.net === n0 - 1 && /corporal/.test(b.panel) : b.turn === 0), `the call: Guile (${tierLine(b.check)}): made gives the 8 back; "yes, but" gives it back for a silver`);
ok(/Guile/.test(b.panel), 'the check is shown in the panel');
await until(() => MG.state.who === 'me' && !MG.state.busy, 15000);
await ev(() => { MG.state.me = 1; MG.state.opp = 0; }); await rnd(.9); await key(' '); await until(() => MG.state.over); await unrnd();
let f = await fit(); ok(f.ok, 'Bones fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
b = await ev(() => ({net:MG.state.net})); await btn('b6bDone'); await wait(120);
let r = await ev(() => ({node:S.node, silver:S.silver, paidNet:S.f.b6_bonesNet, bones:S.f.b6_bones, deeds:S.deeds.b6BonesWon}));
ok(r.node === 'b6_c1_bones_after' && r.silver === 12 + b.net && r.paidNet === Math.max(0, b.net) && r.deeds === 2 && /silver heavier/.test(await text()), `back at the fire: ${b.net} silver paid as the blanket is rolled up, the after-node`);
ok((await choices()).some(t => /Back to the fire/.test(t)), 'the after-node leads back to the fire');
ok(!(await fireOk('b6_c1_fire', /pair of bones/)).game, 'played once: the bones are not offered again');
await ev(() => b6BonesPay({games:1, net:5, pay:5})); ok((await ev(() => S.silver)) === r.silver, 'the pay hook pays no silver of its own: the blanket pays once, at the table');
// left early: nothing paid, offered again; a lost game costs the stake
await setup(1); await ev(() => talk('b6_c1_fire')); await click('pair of bones'); await wait(60); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b6_c1_bones_after' && (await ev(() => S.silver)) === 12 && /before the first throw/.test(await text()) && (await fireOk('b6_c1_fire', /pair of bones/)).game, 'left before a throw: nothing paid, the after-node says so, the bones offered again');
await ev(() => talk('b6_c1_fire')); await click('pair of bones'); await wait(60); await ev(() => document.querySelector('#mgPanel [data-st="3"]').click()); await wait(40);
await ev(() => { MG.state.opp = 14; }); // the recruit is ahead
await ev(() => { MG.state.turn = 8; let i = 0; const seq = [.01, .9]; window._r ??= Math.random; Math.random = () => seq[i++ % 2]; }); await key(' '); await until(() => MG.state.callReady); await unrnd();
await nearNext(); await btn('b6bCall'); await wait(60); b = await ev(() => ({tier:MG.state.check && MG.state.check.tier, turn:MG.state.turn, net:MG.state.net, panel:$('#mgPanel').innerText}));
ok(b.tier === 'near' && b.turn === 8 && b.net === -1 && /A silver for the argument/.test(b.panel), '"yes, but" on the call: the 8 back, and a silver to the corporal for the argument');
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.silver)) === 8 && (await ev(() => S.f.b6_bones && S.f.b6_bones.lost)) === 1, 'leaving a game under way loses its stake (3 silver, and 1 for the argument), and the bones are done');

/* ============ 2. Falari Tide (Ch2, the Fourth) ============ */
await setup(2, { f: { b6_c2_ph: 1 }, join: ['brannoc'] });
ok(await ev(() => S.thread === 'h' && b6In('brannoc')), 'Chapter Two: the Fourth, with Brannoc walking');
fireLine(await fireOk('b6_c2_fire', /tide-table/), 'Ch2 the fire above the sea: Falari Tide');
await notNow('b6_c2_fire', 'Ch2');
await ev(() => { G.said = null; talk('b6_c2_fire'); }); await click('tide-table'); await wait(100);
ok(await ev(() => /Falari Tide/.test($('#mg h2').textContent) && /Brannoc/.test($('#mgPanel').innerText)), 'the Falari board opens; Brannoc has his word');
await shot('4-tide-start');
await btn('tdGo'); await until(() => MG.state.phase === 'mine'); await shot('5-tide-mine');
// the wrist, once: Guile; made, all three again; "yes, but", again and the Falari takes a point for the cheek; failed, the round is the sea's
await ev(() => { MG.state.fal = [5, 5, 4]; }); await btn('tdWrist'); await wait(60);
let t = await ev(() => ({check:MG.state.check, phase:MG.state.phase, cheek:MG.state.cheek, theirs:MG.state.theirs, wrist:!!$('#tdWrist')}));
ok(t.check && t.check.stat === 'guile' && !t.wrist && (t.check.ok ? t.phase === 'mine' && !t.cheek : t.check.tier === 'near' ? t.phase === 'mine' && t.cheek === 1 : t.phase === 'ready' && t.theirs === 1), `the wrist: Guile (${tierLine(t.check)}), once a game`);
for (let i = 0; i < 6; i++) { const ph = await ev(() => MG.state.over ? 'over' : MG.state.phase); if (ph === 'over') break;
  if (ph === 'ready') { await btn('tdGo'); await until(() => MG.state.phase === 'mine'); }
  await ev(() => { MG.state.me = [6, 6, 6]; MG.state.fal = [2, 3, 4]; }); await key(' '); await wait(40); }
t = await ev(() => ({over:MG.state.over, mine:MG.state.mine, deeds:S.deeds.b6TideWon}));
ok(t.over && t.mine === 3 && t.deeds === 1, `three full tides: the match to the Seventh (${t.mine})`);
f = await fit(); ok(f.ok, 'Falari Tide fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('tdDone'); await wait(100);
t = await ev(() => ({node:S.node, loy:S.loy.brannoc, paid:S.f.b6_tidePaid, salve:S.inv.salve}));
ok(t.node === 'b6_c2_tide_after' && t.loy === 1 && t.paid === 'brannoc' && t.salve === 2 && /Brannoc walks back beside you/.test(await text()), 'won: Brannoc +1 loyalty, the after-node');
ok(!(await fireOk('b6_c2_fire', /tide-table/)).game, 'played once: the Falari board is not offered again');
await ev(() => b6TidePay({won:true, done:true, mine:3, theirs:0})); ok((await ev(() => S.loy.brannoc)) === 1, 'Brannoc\'s regard is paid once a book');
// without Brannoc: a lost match pays nothing; a won one is a salve
await setup(2, { f: { b6_c2_ph: 1 } }); await ev(() => talk('b6_c2_fire')); await click('tide-table'); await wait(60); await key(' '); await until(() => MG.state.phase === 'mine'); await nearNext(); await key('w'); await wait(40);
t = await ev(() => ({tier:MG.state.check && MG.state.check.tier, cheek:MG.state.cheek, phase:MG.state.phase})); ok(t.tier === 'near' && t.cheek === 1 && t.phase === 'mine', '"yes, but" on the wrist: all three again, and a point to the Falari for the cheek');
for (let i = 0; i < 6; i++) { const ph = await ev(() => MG.state.over ? 'over' : MG.state.phase); if (ph === 'over') break;
  if (ph === 'ready') { await key(' '); await until(() => MG.state.phase === 'mine'); }
  await ev(() => { MG.state.me = [1, 2, 3]; MG.state.fal = [4, 4, 4]; }); await key(' '); await wait(40); }
t = await ev(() => ({over:MG.state.over, theirs:MG.state.theirs, deeds:S.deeds.b6TideLost})); await btn('tdDone'); await wait(80);
ok(t.over && t.theirs === 3 && t.deeds === 1 && (await ev(() => S.inv.salve)) === 2 && /three tides to your/.test(await text()), 'lost: the sea\'s three tides, nothing paid');
await ev(() => { delete S.f.b6_tidePaid; b6TidePay({won:true, done:true}); }); ok((await ev(() => S.inv.salve)) === 3, 'won without Brannoc walking: a pot of seal fat (a salve)');
await ev(() => { S.f.b6_c2_ph = 2; delete S.f.b6_tide; }); ok(!(await fireOk('b6_c2_fire', /tide-table/)).game, 'on the march inland the Falari board is not there');

/* ============ 3. Who's Next (Ch4, the Fourth) ============ */
await setup(4, { f: { b6_c4_ph: 1 }, fever: 'kettle' });
ok(await ev(() => S.thread === 'h' && b6Fevered('kettle')), 'Chapter Four: the Fourth, Kettle fevered');
fireLine(await fireOk('b6_c4_fire', /chalking up the board/), 'Ch4 the Fourth\'s fire: Who\'s Next');
await notNow('b6_c4_fire', 'Ch4');
await ev(() => { G.said = null; talk('b6_c4_fire'); }); await click('chalking up the board'); await wait(100);
ok(await ev(() => /Next/.test($('#mg h2').textContent) && /not about the fever/.test($('#mgPanel').innerText)), 'the board opens; it is not about the fever');
await shot('6-next-board');
let s0 = await ev(() => MG.state.stones[3]); await btn('wnCount'); await wait(60);
let w = await ev(() => ({check:MG.state.check, counted:MG.state.counted, s:MG.state.stones[3], panel:$('#mgPanel').innerText}));
ok(w.check && w.check.stat === 'wits' && (w.check.ok ? w.counted === true && w.s === s0 && /In the helmet/.test(w.panel) : w.check.tier === 'near' ? w.counted === true && w.s === s0 + 2 : w.counted === 'tried'), `the stones counted: Wits (${tierLine(w.check)}); "yes, but" puts two Fourth stones in`);
for (let d = 0; d < 3; d++) { await key('4'); await ev(() => { MG.state.stones = [0, 0, 0, 5, 0, 0]; }); await key(' '); await until(d => !MG.state.busy && MG.state.d === d + 1, 8000, d); if (!d) await shot('7-next-drawn'); }
w = await ev(() => ({over:MG.state.over, right:MG.state.right, deeds:S.deeds.b6NextWon}));
ok(w.over && w.right === 3 && w.deeds === 1, 'three of three: the corporal owes you');
f = await fit(); ok(f.ok, 'Who\'s Next fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('wnDone'); await wait(100);
w = await ev(() => ({node:S.node, kettle:b6Fevered('kettle'), paid:S.f.b6_nextPaid}));
ok(w.node === 'b6_c4_next_after' && !w.kettle && w.paid === 'kettle' && /fever has broken/.test(await text()), 'won: Kettle\'s fever broken by a surgeon\'s draught, the after-node');
ok(!(await fireOk('b6_c4_fire', /chalking up the board/)).game, 'played once: the board is not offered again');
await ev(() => { S.fever = {tuft:4}; b6NextPay({won:true, done:true, right:3}); }); ok(await ev(() => b6Fevered('tuft')), 'the corporal owes you once a book');
await setup(4, { f: { b6_c4_ph: 1 } }); await ev(() => talk('b6_c4_fire')); await click('chalking up the board'); await wait(60); s0 = await ev(() => MG.state.stones[3]); await nearNext(); await key('c'); await wait(40);
w = await ev(() => ({tier:MG.state.check && MG.state.check.tier, s:MG.state.stones[3], counted:MG.state.counted})); ok(w.tier === 'near' && w.s === s0 + 2 && w.counted === true, '"yes, but" on the count: the counts show, and two Fourth stones go in');
for (let d = 0; d < 3; d++) { await key('6'); await ev(() => { MG.state.stones = [5, 0, 0, 0, 0, 0]; }); await key(' '); await until(d => !MG.state.busy && MG.state.d === d + 1, 8000, d); }
w = await ev(() => ({over:MG.state.over, right:MG.state.right, deeds:S.deeds.b6NextLost})); await btn('wnDone'); await wait(80);
ok(w.over && w.right === 0 && w.deeds === 1 && (await ev(() => S.inv.salve)) === 2 && /wipes the board/.test(await text()), 'none right: nothing owed');
await ev(() => { delete S.f.b6_nextPaid; b6NextPay({won:true, done:true, right:2}); }); ok((await ev(() => S.inv.salve)) === 3, 'won with nobody fevered: a salve');
await ev(() => { S.f.b6_c4_ph = 2; delete S.f.b6_next; }); ok(!(await fireOk('b6_c4_fire', /chalking up the board/)).game, 'at the picket fire there is no board');

/* ============ 4. The Jetty Race (Ch5, the Third) ============ */
await setup(5);
fireLine(await fireOk('b6_c5_fire', /clay sharper/), 'Ch5 the Third\'s fire: the Jetty Race');
await notNow('b6_c5_fire', 'Ch5');
await ev(() => { G.said = null; talk('b6_c5_fire'); }); await click('clay sharper'); await wait(100);
ok(await ev(() => /Jetty Race/.test($('#mg h2').textContent) && /next squad/.test($('#mgPanel').innerText)), 'the jetty opens; the next squad\'s wager');
await shot('8-jetty-intro');
await btn('jtRig'); await wait(60);
let j = await ev(() => ({check:MG.state.check, doubles:MG.state.doubles, wet:MG.state.wet, rig:!!$('#jtRig')}));
ok(j.check && j.check.stat === 'wits' && !j.rig && (j.check.ok ? j.doubles === 3 && !j.wet : j.check.tier === 'near' ? j.doubles === 3 && j.wet === 1 : j.doubles === 0), `the yard rigged: Wits (${tierLine(j.check)}); "yes, but" loses the first crate`);
await btn('jtGo'); await wait(40); await ev(() => { MG.state.nextRival = Infinity; });
const P = await ev(() => B6G_PERIOD * Math.max(.4, SET.speed || 1));
await ev(P => { MG.state.t0 = performance.now() - P / 4; }, P); await key(' '); await wait(40); // the boat at the top of its swell
j = await ev(() => ({wet:MG.state.wet, mine:MG.state.mine})); ok(j.wet >= 1 && j.mine === 0, 'swung with the boat at the top of the swell: the crate goes in the sea');
await shot('9-jetty-race');
await wait(P * .5 + 50);
for (let i = 0; i < 10 && !(await ev(() => MG.state.over)); i++) { await ev(() => { MG.state.t0 = performance.now(); MG.state.lock = 0; }); await key(' '); await wait(30); }
j = await ev(() => ({over:MG.state.over, mine:MG.state.mine, deeds:S.deeds.b6JettyWon}));
ok(j.over && j.mine === 8 && j.deeds === 1, 'every crate swung on the level: eight first, the race won');
f = await fit(); ok(f.ok, 'the Jetty Race fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('jtDone'); await wait(100);
j = await ev(() => ({node:S.node, sharper:S.inv.sharper, paid:S.f.b6_jettyPaid}));
ok(j.node === 'b6_c5_jetty_after' && j.sharper === 2 && j.paid === 1 && /clay sharper held in both hands/.test(await text()), 'won: the next squad\'s sharper, the after-node');
ok(!(await fireOk('b6_c5_fire', /clay sharper/)).game, 'played once: the jetty is not offered again');
await ev(() => b6JettyPay({won:true, done:true})); ok((await ev(() => S.inv.sharper)) === 2, 'the sharper is paid once a book');
await setup(5); await ev(() => talk('b6_c5_fire')); await click('clay sharper'); await wait(60); await nearNext(); await key('r'); await wait(40);
j = await ev(() => ({tier:MG.state.check && MG.state.check.tier, doubles:MG.state.doubles, wet:MG.state.wet})); ok(j.tier === 'near' && j.doubles === 3 && j.wet === 1, '"yes, but" on the rig: doubles, and the first crate in the sea');
await btn('jtGo'); await wait(40);
await ev(() => { MG.state.rivalGap = 20; MG.state.nextRival = 0; }); await until(() => MG.state.over, 8000);
j = await ev(() => ({over:MG.state.over, theirs:MG.state.theirs, deeds:S.deeds.b6JettyLost})); await btn('jtDone'); await wait(80);
ok(j.over && j.theirs === 8 && j.deeds === 1 && (await ev(() => S.inv.sharper)) === 1 && /boat full/.test(await text()), 'too slow: the next squad loads first, no sharper');
await ev(() => { S.f.b6_c5_survivors = 1; delete S.f.b6_jetty; }); ok(!(await fireOk('b6_c5_fire', /clay sharper/)).game, 'the morning the Third goes aboard, the jetty is not offered');

/* ============ 5. The Grey Helms' Signs (Ch7, the Third at sea) ============ */
await setup(7, { f: { b6_c7_perish: 1, b6_c7_ph: 2 }, join: ['ottar'] });
ok(await ev(() => S.thread === 'r' && b6In('ottar')), 'Chapter Seven: the Third at sea, Ottar walking');
fireLine(await fireOk('b6_c7_fire', /hand-signs/), 'Ch7 the cook\'s sandbox: the Grey Helms\' Signs');
await notNow('b6_c7_fire', 'Ch7');
await ev(() => { G.said = null; talk('b6_c7_fire'); }); await click('hand-signs'); await wait(100);
ok(await ev(() => /Grey Helms/.test($('#mg h2').textContent) && /Ottar/.test($('#mgPanel').innerText)), 'the Grey Helms open; Ottar has his word');
await shot('10-signs-intro');
await btn('sgGo'); await until(() => MG.state.show >= 0); await shot('11-signs-show'); await until(() => MG.state.phase === 'echo');
let len0 = await ev(() => MG.state.seq.length); await btn('sgAgain'); await wait(40);
let g5 = await ev(() => ({check:MG.state.check, len:MG.state.seq.length, phase:MG.state.phase}));
ok(g5.check && g5.check.stat === 'wits' && (g5.check.ok ? g5.len === len0 && g5.phase === 'show' : g5.check.tier === 'near' ? g5.len === len0 + 1 && g5.phase === 'show' : g5.phase === 'echo'), `asked again, slower: Wits (${tierLine(g5.check)}); "yes, but" adds a sign`);
for (let run = 0; run < 4; run++) { if (run) { await btn('sgGo'); }
  await until(() => MG.state.phase === 'echo', 15000); const seq = await ev(() => MG.state.seq.slice());
  for (const s of seq) { await key(String(s + 1)); await wait(15); } }
g5 = await ev(() => ({over:MG.state.over, given:MG.state.given, deeds:[S.deeds.b6SignsWon, S.deeds.b6SignsAll]}));
ok(g5.over && g5.given === 4 && g5.deeds[0] === 1 && g5.deeds[1] === 1, 'every run given back: the whole of it');
f = await fit(); ok(f.ok, 'the Signs fit a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('sgDone'); await wait(100);
g5 = await ev(() => ({node:S.node, loy:S.loy.ottar, paid:S.f.b6_signsPaid}));
ok(g5.node === 'b6_c7_signs_after' && g5.loy === 1 && g5.paid === 'ottar' && /sign for Hold/.test(await text()), 'won: Ottar +1 loyalty, the after-node');
ok(!(await fireOk('b6_c7_fire', /hand-signs/)).game, 'played once: the Grey Helms do not offer again');
await ev(() => b6SignsPay({won:true, done:true, given:4})); ok((await ev(() => S.loy.ottar)) === 1, 'Ottar\'s regard is paid once a book');
await setup(7, { f: { b6_c7_perish: 1, b6_c7_ph: 2 } }); await ev(() => talk('b6_c7_fire')); await click('hand-signs'); await wait(60); await btn('sgGo'); await until(() => MG.state.phase === 'echo', 15000);
let l1 = await ev(() => MG.state.seq.length); await nearNext(); await key('a'); await wait(40); g5 = await ev(() => ({tier:MG.state.check && MG.state.check.tier, len:MG.state.seq.length})); ok(g5.tier === 'near' && g5.len === l1 + 1, '"yes, but" on asking again: shown again, one sign longer'); await until(() => MG.state.phase === 'echo', 15000);
await ev(() => { const s = MG.state.seq[0]; MG.keys({key:String((s + 1) % 4 + 1), preventDefault(){}}); }); await wait(40);
g5 = await ev(() => ({over:MG.state.over, given:MG.state.given, deeds:S.deeds.b6SignsLost})); await btn('sgDone'); await wait(80);
ok(g5.over && g5.given === 0 && g5.deeds === 1 && (await ev(() => S.inv.salve)) === 2 && /None given back/.test(await text()), 'a wrong sign first: he lowers his hands, nothing paid');
await ev(() => { delete S.f.b6_signsPaid; b6SignsPay({won:true, done:true, given:3}); }); ok((await ev(() => S.inv.salve)) === 3, 'won without Ottar walking: a jar of Perish salve');
await ev(() => { S.f.b6_c7_ph = 4; delete S.f.b6_signs; }); ok(!(await fireOk('b6_c7_fire', /hand-signs/)).game, 'ashore at Malaz the Grey Helms are not signing');
await ev(() => { S.f.b6_c7_ph = 1; delete S.f.b6_c7_perish; }); ok(!(await fireOk('b6_c7_fire', /hand-signs/)).game, 'before the grey ships come, no Grey Helms');

/* the Deeds page, the journal, the after-nodes */
const dd = await ev(() => { S.deeds = Object.assign(S.deeds || {}, {b6BonesWon:2, b6TideWon:1, b6NextLost:1, b6JettyWon:1, b6SignsAll:1, b6SignsWon:1});
  const h = b6DeedsExtra([{s:S}]); return {fires:/At the fires/.test(h), fever:/Fever/.test(h), rows:['Bones', 'Falari Tide', 'Who\'s Next', 'Jetty Race', 'Grey Helms'].every(k => h.includes(k)), leak:/undefined|NaN/.test(h)}; });
ok(dd.fires && dd.fever && dd.rows && !dd.leak, 'the Deeds page lists Book Six\'s fires under Fever');
const jn = await ev(() => { S.f.b6_bonesLast = {games:1, pay:2}; S.f.b6_tideLast = {done:true, won:true}; S.f.b6_nextLast = {done:true, won:false, right:1}; S.f.b6_jettyLast = {done:true, won:true}; S.f.b6_signsLast = {done:true, won:true, given:3};
  return [B6CH1.journal(), B6CH2.journal(), B6CH4.journal(), B6CH5.journal(), B6CH7.journal()].map(j => j[0]); });
ok(/bones/.test(jn[0]) && /Tide/.test(jn[1]) && /Who's Next/.test(jn[2]) && /longboat/.test(jn[3]) && /signs/.test(jn[4]), 'each game leaves a journal line');
const leak = await ev(() => { const out = []; const cases = {b6_c1_bones_after:[{}, {games:1, pay:3}, {games:2, pay:-2}, {games:1, pay:0}], b6_c2_tide_after:[{}, {done:true, won:true, mine:3}, {done:true, won:false, mine:2}], b6_c4_next_after:[{}, {done:true, won:true, right:2, fourth:1}, {done:true, won:false, right:0}], b6_c5_jetty_after:[{}, {done:true, won:true}, {done:true, won:false}], b6_c7_signs_after:[{}, {done:true, won:true, given:3, all:false}, {done:true, won:false, given:1}]};
  const last = {b6_c1_bones_after:'b6_bonesLast', b6_c2_tide_after:'b6_tideLast', b6_c4_next_after:'b6_nextLast', b6_c5_jetty_after:'b6_jettyLast', b6_c7_signs_after:'b6_signsLast'};
  const BAN = /Laseen|Kellanved|Dancer|Ammanas|Surly|Topper|the Talon|the Eel|Burn's Sleep|\b11\d\d\b/;
  Object.entries(cases).forEach(([k, rs]) => rs.forEach(r => { S.f[last[k]] = r; const n = DLG[k](), t = n.txt; if (!t.trim() || /undefined|NaN|\[object|\$\{/.test(t)) out.push(k + ' leaks'); if (BAN.test(t)) out.push(k + ' a never-use name'); if (/!/.test(t.replace(/"[^"]*"/g, ''))) out.push(k + ' an exclamation mark in narration'); if (!n.ch.length || n.ch[0].go !== k.replace(/_[a-z]+_after$/, '_fire')) out.push(k + ' no way back'); })); return out; });
ok(!leak.length, 'the after-nodes read cleanly, both ways' + (leak.length ? ': ' + leak.join(' ') : ''));
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
