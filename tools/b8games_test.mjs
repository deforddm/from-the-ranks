// v11.0: Book Eight's games at the fires (149). Each game is offered at its chapter's fire right after "Talk with the squad", with the
// fire's own choices still there and "Not now" last (and taken back to the map); opens on the tables' frame; plays to a win and to a loss
// from the panel and the keys; closes to its after-node; pays once a book; is not offered again once finished; and leaves its deed. A game
// left early pays nothing and is offered again (Orsa's Cup: leaving with the stake down loses it). Orsa's Cup (Ch1): silver, a one argued
// off the wall (Guile, its "yes, but"). The Last Peg (Ch2): the carter's watch-money, a palmed fourth peg (Guile, its "yes, but"). Lamp
// and Stone (Ch3): Tuft's regard, or Edrem's, or a salve; eyes to the dark (Wits, its "yes, but"). Keep the Fire (Ch4): Edrem's regard
// or a salve; turf (Wits, its "yes, but"). Stones on the Water (Ch7): the lowest-regard squadmate's +1, or a salve; a flat stone (Wits,
// its "yes, but"). The phases where each game is not offered; no game moves the Contract; the Deeds page, the journal, the after-nodes
// (no leaks, no never-names, no "!" in narration), phone width (390), and screenshots to /tmp/claude-0/shots/b8/games/.
// Usage: node tools/b8games_test.mjs   (build first; exit 1 on a failure or a page error)
import fs from 'fs';
import { server, browser as launch, openGame } from './page.mjs';
const SHOTS = '/tmp/claude-0/shots/b8/games'; fs.mkdirSync(SHOTS, { recursive: true });
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { mobile: true, touch: true, width: 390, height: 844, settings: { master: 0, music: 0, sfx: 0, amb: 0, motion: 'on', shake: false, speed: .15 } });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const wait = ms => page.waitForTimeout(ms);
/* a fresh Book Eight save at chapter ch, with the flags given */
const setup = (ch, extra = {}) => ev(({ ch, extra }) => { if (typeof mgOpenNow === 'function' && mgOpenNow()) mgClose({}); setBook('tth'); S = newStateTTH('Hask'); S.picksDue = []; save(); startChapter(ch);
  S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; S.silver = 30; S.inv = {sharper:1, burner:1, cusser:0, smoker:1, salve:2};
  Object.assign(S.f, extra.f || {}); (extra.join || []).forEach(id => b8Join(id)); window._con = b8Contract();
  S.picksDue = []; if (m) m.hidden = true; save(); G.said = null; }, { ch, extra });
const choices = () => ev(() => [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()));
const click = re => ev(src => { const b = [...document.querySelectorAll('#sheet .choice')].find(b => new RegExp(src).test(b.textContent)); if (!b) return false; b.click(); return true; }, re);
const key = k => ev(k => MG.keys && MG.keys({key:k, preventDefault(){}}), k);
const text = () => ev(() => (document.querySelector('#sheet .txt') || {}).innerText || '');
const panel = () => ev(() => ($('#mgPanel') || {}).innerText || '');
const btn = id => ev(id => { const b = document.getElementById(id); if (!b || b.disabled) return false; b.click(); return true; }, id);
const until = async (f, ms = 8000, arg) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await ev(f, arg)) return true; await wait(30); } return false; };
const fit = () => ev(() => { const vw = document.documentElement.clientWidth, bad = []; for (const el of document.querySelectorAll('#mg *')) { const b = el.getBoundingClientRect(); if (b.width && b.right > vw + 1) bad.push(el.tagName + '#' + el.id + '.' + el.className); } return {ok:document.documentElement.scrollWidth <= vw && !bad.length, bad:bad.slice(0, 3)}; });
const shot = async name => { await wait(150); await page.screenshot({ path: `${SHOTS}/${name}.png` }); };
const fireOk = async (fire, game) => { await ev(f => { G.said = null; talk(f); }, fire); const c = await choices(); return {game:c.some(t => game.test(t)), talk:c.some(t => /Talk with the squad/.test(t)), notNow:/^Not now/.test(c[c.length - 1] || ''), i:c.findIndex(t => game.test(t)), ti:c.findIndex(t => /Talk with the squad/.test(t))}; };
const fireLine = (f, m) => ok(f.game && f.talk && f.notNow && f.i === f.ti + 1, `${m}: offered right after the squad's talk; Not now still last`);
const notNow = async (fire, m) => { await ev(f => { G.said = null; talk(f); }, fire); await click('^Not now'); await wait(80); ok(await ev(() => view === 'explore' && !mgOpenNow()), `${m}: Not now goes back to the map, no table open`); };
const open = async (fire, re) => { await ev(f => { G.said = null; talk(f); }, fire); await click(re); await wait(100); };
const rnd = v => ev(v => { window._r ??= Math.random; Math.random = () => v; }, v), unrnd = () => ev(() => { if (window._r) Math.random = window._r; });
const tierLine = r => r ? `${r.who} ${r.stat} ${r.tier}` : 'no roll';
const nearNext = () => ev(() => { window._g ??= b5gRoll; b5gRoll = (...a) => { const r = window._g(...a); b5gRoll = window._g; r.tier = 'near'; r.ok = false; r.pass = true; return r; }; });
const conSame = async m => ok(await ev(() => b8Contract() === window._con), `${m}: the Contract does not move`);
const NEVER = /Bridgeburner|Seba|Krute|Picker|Mallet|Bluepearl|Antsy|Blend\b|Murillio|Kruppe|Kellanved|Dancer|Laseen|Ammanas|Burn's Sleep|\b1\d\d\d\b|Whiskeyjack|Dragnipur|Spawn|Mother Dark|Spinnock|Endest|Korlat|Seerdomin|Salind|Gradithan|Rake/; // Kef Tanar may be named (David, Nov 13, 2026); the squad still never sits at Spinnock's table
let allPanel = '';

/* ============ 1. Orsa's Cup (Ch1) ============ */
await setup(1, { f: { b8_c1_ph: 3 } });
fireLine(await fireOk('b8_c1_fire', /leather cup/), 'Ch1 the Fourth\'s door: Orsa\'s Cup');
await notNow('b8_c1_fire', 'Ch1');
await open('b8_c1_fire', 'leather cup');
ok(await ev(() => mgOpenNow() && /Orsa/.test($('#mg h2').textContent) && /single die/.test($('#mgPanel').innerText)), 'the den opens; Orsa, a cup and a single die');
allPanel += await panel(); await shot('1-cup-stake');
await key(' '); await wait(60); ok(await ev(() => MG.state.stake === 1 && MG.state.phase === 'me'), 'a stake of one silver; the guest throws first');
await rnd(.99); await key(' '); await until(() => !MG.state.roll && MG.state.run === 6); await unrnd();
ok(await ev(() => MG.state.run === 6 && MG.state.phase === 'me'), 'a six: six this round, still your throw');
await shot('2-cup-throw');
await key('b'); await until(() => MG.state.phase === 'me' || MG.state.phase === 'over', 10000);
ok(await ev(() => MG.state.me === 6), 'banked six; Orsa throws, and the cup comes back');
await ev(() => { MG.state.me = 18; MG.state.run = 0; }); await rnd(.99); await key(' '); await until(() => MG.state.phase === 'over'); await unrnd();
let c = await ev(() => ({net:MG.state.net, won:MG.state.won, deeds:S.deeds.b8CupWon}));
ok(c.net === 1 && c.won && c.deeds === 1, 'to twenty first: the stake won, the deed');
let f = await fit(); ok(f.ok, 'Orsa\'s Cup fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await btn('cuDone'); await wait(120);
let r = await ev(() => ({node:S.node, silver:S.silver, net:S.f.b8_cupNet, cup:S.f.b8_cup}));
ok(r.node === 'b8_c1_cup_after' && r.silver === 31 && r.net === 1 && r.cup && r.cup.done && /heavier/.test(await text()), 'back at the fire a silver heavier, the after-node');
ok(!(await fireOk('b8_c1_fire', /leather cup/)).game, 'played once: the cup is not offered again');
await ev(() => b8CupPay({done:true, net:5, pay:5})); ok((await ev(() => S.silver)) === 31, 'the pay hook pays no silver of its own: the table pays once');
await conSame('Orsa\'s Cup');
// a loss, with the one argued off the wall ("yes, but")
await setup(1, { f: { b8_c1_ph: 4 } }); await open('b8_c1_fire', 'leather cup'); await ev(() => document.querySelector('#mgPanel [data-st="3"]').click()); await wait(40);
await rnd(.01); await key(' '); await until(() => MG.state.phase === 'call'); await unrnd();
ok(await ev(() => MG.state.phase === 'call' && !!$('#cuCall')), 'a one: it can be argued off the wall');
await shot('3-cup-call');
await nearNext(); await btn('cuCall'); await wait(60);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, net:MG.state.net, phase:MG.state.phase, panel:$('#mgPanel').innerText}));
ok(c.tier === 'near' && c.net === -1 && c.phase === 'me' && /silver for the house/.test(c.panel), '"yes, but" on the wall: throw again, and a silver for the house');
await ev(() => { MG.state.opp = 19; }); await rnd(.01); await key(' '); await until(() => MG.state.phase === 'opp'); await rnd(.99); await until(() => MG.state.phase === 'over', 8000); await unrnd();
c = await ev(() => ({net:MG.state.net, won:MG.state.won, deeds:S.deeds.b8CupLost})); await btn('cuDone'); await wait(100);
ok(c.won === false && c.net === -4 && c.deeds === 1 && (await ev(() => S.silver)) === 26 && /lighter/.test(await text()), 'a one again, unargued; Orsa to twenty: three silver and the house\'s one lost');
// the check itself, as it rolls; and leaving with the stake down
await setup(1, { f: { b8_c1_ph: 3 } }); await open('b8_c1_fire', 'leather cup'); await key(' '); await wait(40);
await rnd(.01); await key(' '); await until(() => MG.state.phase === 'call'); await unrnd(); await btn('cuCall'); await wait(60);
c = await ev(() => ({check:MG.state.check, panel:$('#mgPanel').innerText}));
ok(c.check && c.check.stat === 'guile' && /Guile/.test(c.panel), `the wall: Guile (${tierLine(c.check)}), shown in the panel`);
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.f.b8_cup && S.f.b8_cup.done && S.silver <= 29)) && !(await fireOk('b8_c1_fire', /leather cup/)).game, 'leaving with the stake down loses it, and the cup is done');
await setup(1, { f: { b8_c1_ph: 3 } }); await open('b8_c1_fire', 'leather cup'); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b8_c1_cup_after' && (await ev(() => S.silver)) === 30 && /before the stake/.test(await text()) && (await fireOk('b8_c1_fire', /leather cup/)).game, 'left before the stake: nothing paid, offered again');
await ev(() => { S.f.b8_c1_ph = 2; }); ok(!(await fireOk('b8_c1_fire', /leather cup/)).game, 'before the lanes are open, no den');
await ev(() => { S.f.b8_c1_ph = 3; S.silver = 0; }); ok(!(await fireOk('b8_c1_fire', /leather cup/)).game, 'with no silver, no den');

/* ============ 2. The Last Peg (Ch2) ============ */
await setup(2, { f: { b8_c2_ph: 1 } });
fireLine(await fireOk('b8_c2_fire', /fifteen pegs/), 'Ch2 the caravan\'s fire: the Last Peg');
await notNow('b8_c2_fire', 'Ch2');
await open('b8_c2_fire', 'fifteen pegs');
ok(await ev(() => /Last Peg/.test($('#mg h2').textContent) && /tailboard/.test($('#mgPanel').innerText)), 'the tailboard opens');
allPanel += await panel(); await shot('4-peg-start');
await btn('pgGo'); await wait(40); ok(await ev(() => MG.state.phase === 'mine' && MG.state.n === 15), 'fifteen pegs, your hand first');
await key('2'); await wait(30); ok(await ev(() => MG.state.n === 13 && MG.state.phase === 'his'), 'take two: thirteen left, the carter\'s hand');
await until(() => MG.state.phase === 'mine'); await shot('5-peg-mid');
await ev(() => { MG.state.n = 2; }); await key('1'); await until(() => MG.state.mine === 1 || MG.state.his === 1);
ok(await ev(() => MG.state.mine === 1), 'one left for the carter: he takes the last peg, the round is yours');
await until(() => MG.state.phase === 'mine' && MG.state.round === 1, 8000);
await ev(() => { MG.state.n = 3; }); await key('2'); await until(() => MG.state.over, 6000);
c = await ev(() => ({over:MG.state.over, mine:MG.state.mine, deeds:S.deeds.b8PegWon}));
ok(c.over && c.mine === 2 && c.deeds === 1, 'two rounds: the match');
f = await fit(); ok(f.ok, 'the Last Peg fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await btn('pgDone'); await wait(100);
r = await ev(() => ({node:S.node, silver:S.silver, paid:S.f.b8_pegPaid}));
ok(r.node === 'b8_c2_peg_after' && r.silver === 32 && r.paid === 1 && /watch-money/.test(await text()), 'won: the carter\'s watch-money, two silver, the after-node');
ok(!(await fireOk('b8_c2_fire', /fifteen pegs/)).game, 'played once: the pegs are not offered again');
await ev(() => b8PegPay({won:true, done:true, mine:2, his:0})); ok((await ev(() => S.silver)) === 32, 'the watch-money is paid once a book');
await conSame('the Last Peg');
await setup(2, { f: { b8_c2_ph: 4 } }); await open('b8_c2_fire', 'fifteen pegs'); await btn('pgGo'); await wait(40); await nearNext(); await key('p'); await wait(60);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, n:MG.state.n, sharp:MG.state.sharp, palm:!!$('#pgPalm'), panel:$('#mgPanel').innerText}));
ok(c.tier === 'near' && c.n === 11 && c.sharp && !c.palm && /every peg/.test(c.panel), '"yes, but" on the palm: four taken, and the carter plays every peg true after');
await shot('6-peg-palm');
for (let i = 0; i < 2; i++) { await until(() => MG.state.phase === 'mine' || MG.state.over, 8000); if (await ev(() => MG.state.over)) break; await ev(() => { MG.state.n = 1; }); await key('1'); await wait(40); }
await until(() => MG.state.over, 8000);
c = await ev(() => ({his:MG.state.his, deeds:S.deeds.b8PegLost})); await btn('pgDone'); await wait(80);
ok(c.his === 2 && c.deeds === 1 && (await ev(() => S.silver)) === 30 && !(await ev(() => S.f.b8_pegPaid)) && /dog watch is the Fourth/.test(await text()), 'the last peg twice: the dog watch is yours, nothing paid');
await setup(2, { f: { b8_c2_ph: 1 } }); await open('b8_c2_fire', 'fifteen pegs'); await btn('pgGo'); await wait(40); await btn('pgPalm'); await wait(60);
c = await ev(() => ({check:MG.state.check, n:MG.state.n}));
ok(c.check && c.check.stat === 'guile' && (c.check.ok || c.check.tier === 'near' ? c.n === 11 : c.n === 14), `the palm: Guile (${tierLine(c.check)}); made or "yes, but" takes four, failed takes one`);
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b8_c2_peg_after' && /pegs still on it/.test(await text()) && (await fireOk('b8_c2_fire', /fifteen pegs/)).game, 'left early: nothing paid, offered again');
await ev(() => { S.f.b8_c2_ph = 6; }); ok(!(await fireOk('b8_c2_fire', /fifteen pegs/)).game, 'after the last wagon is decided, no pegs');

/* ============ 3. Lamp and Stone (Ch3) ============ */
await setup(3, { f: { b8_c3_ph: 1 } });
ok(!(await fireOk('b8_c3_fire', /shuttered lamp/)).game, 'before Thessaly is met at the gate, no game');
await ev(() => { S.f.b8_c3_thessaly = 1; window._con = b8Contract(); });
fireLine(await fireOk('b8_c3_fire', /shuttered lamp/), 'Ch3 the lodging: Lamp and Stone');
await notNow('b8_c3_fire', 'Ch3');
await open('b8_c3_fire', 'shuttered lamp');
ok(await ev(() => /Lamp and Stone/.test($('#mg h2').textContent) && /Thessaly/.test($('#mgPanel').innerText) && /Andii/.test($('#mgPanel').innerText)), 'the cloth opens; Thessaly, the Andii\'s game');
allPanel += await panel(); await shot('7-lamp-intro');
await btn('lmEyes'); await wait(60);
c = await ev(() => ({check:MG.state.check, eyes:MG.state.eyes, used:MG.state.used, btn:!!$('#lmEyes')}));
ok(c.check && c.check.stat === 'wits' && c.used && !c.btn && (c.check.ok || c.check.tier === 'near' ? c.eyes : !c.eyes), `eyes to the dark: Wits (${tierLine(c.check)}), once a game`);
for (let i = 0; i < 2; i++) { await until(() => !!$('#lmOpen'), 6000); await btn('lmOpen'); await wait(30);
  if (!i) { ok(await ev(() => MG.state.phase === 'show' && document.querySelectorAll('#mgPanel [data-cl]').length === 16), 'the lamp opens on sixteen squares'); await shot('8-lamp-show'); }
  await until(() => MG.state.phase === 'dark', 6000); if (!i) await shot('9-lamp-dark');
  await ev(() => { const s = MG.state.stones.slice(); const miss = [...Array(16).keys()].find(k => !s.includes(k)); document.querySelector(`#mgPanel [data-cl="${miss}"]`).click(); s.forEach(k => { const b = document.querySelector(`#mgPanel [data-cl="${k}"]`); b && b.click(); }); }); await wait(40); }
await until(() => MG.state.over, 6000);
c = await ev(() => ({over:MG.state.over, mine:MG.state.mine, deeds:S.deeds.b8LampWon}));
ok(c.over && c.mine === 2 && c.deeds === 1, 'every stone found twice, one wrong touch forgiven each time: the match');
f = await fit(); ok(f.ok, 'Lamp and Stone fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await btn('lmDone'); await wait(100);
r = await ev(() => ({node:S.node, loy:S.loy.tuft, paid:S.f.b8_lampPaid}));
ok(r.node === 'b8_c3_lamp_after' && r.loy === 1 && r.paid === 'tuft' && /Tuft/.test(await text()), 'won: Tuft\'s regard (+1), the after-node');
ok(!(await fireOk('b8_c3_fire', /shuttered lamp/)).game, 'played once: the cloth is not offered again');
await ev(() => b8LampPay({won:true, done:true, mine:2})); ok((await ev(() => S.loy.tuft)) === 1, 'the regard is paid once a book');
await conSame('Lamp and Stone');
await ev(() => { delete S.f.b8_lampPaid; S.dead.tuft = {ch:3}; b8Join('edrem'); b8LampPay({won:true, done:true}); });
ok((await ev(() => S.loy.edrem === 1 && S.f.b8_lampPaid === 'edrem')), 'won with Tuft gone and Edrem walking: Edrem\'s regard');
await ev(() => { delete S.f.b8_lampPaid; S.squad = S.squad.filter(k => k !== 'edrem'); b8LampPay({won:true, done:true}); });
ok((await ev(() => S.inv.salve === 3 && S.f.b8_lampPaid === 'salve')), 'won with neither: a salve');
await setup(3, { f: { b8_c3_ph: 2, b8_c3_thessaly: 1 } }); await open('b8_c3_fire', 'shuttered lamp'); await nearNext(); await key('e'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, eyes:MG.state.eyes, extra:MG.state.extra}));
ok(c.tier === 'near' && c.eyes && c.extra === 1, '"yes, but" on the dark: the lamp twice as long, and one more stone');
await key(' '); await wait(30); ok(await ev(() => MG.state.stones.length === 4), 'the first round lays four, not three');
for (let i = 0; i < 2; i++) { await until(() => MG.state.phase === 'dark' || MG.state.phase === 'ready' || MG.state.over, 6000); if (await ev(() => MG.state.phase === 'ready')) { await key(' '); await until(() => MG.state.phase === 'dark', 6000); }
  await ev(() => { const s = MG.state.stones; [...Array(16).keys()].filter(k => !s.includes(k)).slice(0, 2).forEach(k => document.querySelector(`#mgPanel [data-cl="${k}"]`).click()); }); await wait(40); }
await until(() => MG.state.over, 6000);
c = await ev(() => ({lost:MG.state.lost, deeds:S.deeds.b8LampLost})); await btn('lmDone'); await wait(80);
{ const t = await text(), ly = await ev(() => S.loy.tuft); ok(c.lost === 2 && c.deeds === 1 && ly === 0 && /The dark.s/.test(t), 'two wrong touches, twice: the dark has them, nothing paid' + (c.lost === 2 && c.deeds === 1 && ly === 0 && /The dark.s/.test(t) ? '' : ' ' + JSON.stringify([c, ly, t.slice(0, 80)]))); }
await setup(3, { f: { b8_c3_ph: 4, b8_c3_thessaly: 1 } }); await open('b8_c3_fire', 'shuttered lamp'); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b8_c3_lamp_after' && /stones still on it/.test(await text()) && (await fireOk('b8_c3_fire', /shuttered lamp/)).game, 'left early: nothing paid, offered again');

/* ============ 4. Keep the Fire (Ch4) ============ */
await setup(4, { f: { b8_c4_ph: 2 } });
ok(!(await fireOk('b8_c4_fire', /pilgrims are feeding/)).game, 'before Hurrin is met, no fire of his');
await ev(() => { S.f.b8_c4_hurrinMet = 1; });
fireLine(await fireOk('b8_c4_fire', /pilgrims are feeding/), 'Ch4 the camp\'s edge: Keep the Fire');
await notNow('b8_c4_fire', 'Ch4');
await open('b8_c4_fire', 'pilgrims are feeding');
ok(await ev(() => /Keep the Fire/.test($('#mg h2').textContent) && /Hurrin/.test($('#mgPanel').innerText) && /sweet smell/.test($('#mgPanel').innerText)), 'Hurrin\'s fire opens; the sweet smell kept behind');
allPanel += await panel(); await shot('10-fire-intro');
await nearNext(); await key('t'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, turf:MG.state.turf, sticks:MG.state.sticks, panel:$('#mgPanel').innerText}));
ok(c.tier === 'near' && c.turf > 0 && c.sticks === 9 && /stick to set it/.test(c.panel), '"yes, but" on the turf: banked, and a stick to set it');
await btn('kfGo'); await wait(200); await shot('11-fire-night');
await ev(() => { MG.state.flame = 50; }); await key(' '); await wait(20);
c = await ev(() => ({flame:MG.state.flame, sticks:MG.state.sticks})); ok(c.flame > 60 && c.flame <= 70 && c.sticks === 8, 'a stick lifts the flame');
await ev(() => { MG.state.flame = 95; }); await key(' '); await wait(20);
c = await ev(() => ({flame:MG.state.flame, wasted:MG.state.wasted})); ok(c.flame <= 100 && c.wasted >= 15, 'a stick on a roaring fire is wasted');
await ev(() => { MG.state.flame = 80; MG.state.el = 29.6; }); await until(() => MG.state.over, 6000);
c = await ev(() => ({over:MG.state.over, deeds:S.deeds.b8FireWon})); ok(c.over && c.deeds === 1, 'the bells say morning with the fire still in: won');
f = await fit(); ok(f.ok, 'Keep the Fire fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await btn('kfDone'); await wait(100);
r = await ev(() => ({node:S.node, salve:S.inv.salve, paid:S.f.b8_firePaid}));
ok(r.node === 'b8_c4_fire_after' && r.salve === 3 && r.paid === 'salve' && /willow bark/.test(await text()), 'won with no Edrem: the pilgrims\' willow bark (a salve), the after-node');
ok(!(await fireOk('b8_c4_fire', /pilgrims are feeding/)).game, 'played once: Hurrin\'s fire is not offered again');
await ev(() => b8FirePay({won:true, done:true})); ok((await ev(() => S.inv.salve)) === 3, 'paid once a book');
await conSame('Keep the Fire');
await ev(() => { delete S.f.b8_firePaid; b8Join('edrem'); b8FirePay({won:true, done:true}); }); ok(await ev(() => S.loy.edrem === 1 && S.f.b8_firePaid === 'edrem'), 'won with Edrem walking: his regard');
await setup(4, { f: { b8_c4_ph: 4 } }); ok((await fireOk('b8_c4_fire', /pilgrims are feeding/)).game, 'the morning by the bells: offered');
await open('b8_c4_fire', 'pilgrims are feeding'); await btn('kfTurf'); await wait(40);
c = await ev(() => ({check:MG.state.check, turf:MG.state.turf})); ok(c.check && c.check.stat === 'wits' && (c.check.ok || c.check.tier === 'near' ? c.turf > 0 : !c.turf), `the turf: Wits (${tierLine(c.check)})`);
await btn('kfGo'); await wait(60); await ev(() => { MG.state.flame = .3; MG.state.turf = 0; }); await until(() => MG.state.over, 6000);
c = await ev(() => ({deeds:S.deeds.b8FireLost})); await btn('kfDone'); await wait(80);
ok(c.deeds === 1 && (await ev(() => S.inv.salve)) === 2 && /lit it again|lit again/.test(await text()), 'the flame falls out: lost, nothing paid');
await setup(4, { f: { b8_c4_ph: 3, b8_c4_hurrinMet: 1 } }); ok(!(await fireOk('b8_c4_fire', /pilgrims are feeding/)).game, 'the bad night has its own fire: not offered');
await ev(() => { S.f.b8_c4_ph = 2; }); await open('b8_c4_fire', 'pilgrims are feeding'); await btn('kfGo'); await wait(60); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b8_c4_fire_after' && /to Hurrin/.test(await text()) && (await fireOk('b8_c4_fire', /pilgrims are feeding/)).game, 'left early: nothing paid, offered again');

/* ============ 5. Stones on the Water (Ch7) ============ */
await setup(7, { f: { b8_c7_ph: 3 } });
fireLine(await fireOk('b8_c7_fire', /flat stones/), 'Ch7 the shore, the night after: Stones on the Water');
await notNow('b8_c7_fire', 'Ch7');
await open('b8_c7_fire', 'flat stones');
ok(await ev(() => /Stones on the Water/.test($('#mg h2').textContent) && /Benlo/.test($('#mgPanel').innerText)), 'the shingle opens; Benlo');
allPanel += await panel(); await shot('12-skip-intro');
await nearNext(); await key('f'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, plus:MG.state.plus, hp:MG.state.hisPlus}));
ok(c.tier === 'near' && c.plus === 2 && c.hp === 1, '"yes, but" on the stone: two more skips for you, one more for Benlo');
await rnd(.5);
for (let i = 0; i < 3; i++) { await until(() => !!$('#skUp'), 8000); await btn('skUp'); await wait(30); if (!i) await shot('13-skip-angle');
  await ev(() => { MG.state.force = [0, .82]; }); await btn('skSet'); await wait(20); await btn('skSet'); await wait(30); if (!i) await shot('14-skip-rings'); }
await until(() => MG.state.over, 8000); await unrnd();
c = await ev(() => ({mine:MG.state.mine.slice(), his:MG.state.his.slice(), deeds:S.deeds.b8SkipWon}));
ok(c.mine.length === 3 && c.his.length === 3 && c.mine[0] === 11 && c.his[0] === 5 && c.deeds === 1, `three flat throws: ${c.mine.join('+')} to Benlo's ${c.his.join('+')}, won`);
f = await fit(); ok(f.ok, 'Stones on the Water fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await ev(() => { S.loy.ohl = -1; }); await btn('skDone'); await wait(100);
r = await ev(() => ({node:S.node, loy:S.loy.ohl, paid:S.f.b8_skipPaid}));
ok(r.node === 'b8_c7_skip_after' && r.loy === 0 && r.paid === 'ohl' && /Ohl threw the last/.test(await text()), 'won: the one who needed the evening most (Ohl, lowest regard) +1, the after-node');
ok(!(await fireOk('b8_c7_fire', /flat stones/)).game, 'played once: the stones are not offered again');
await ev(() => b8SkipPay({won:true, done:true})); ok((await ev(() => S.loy.ohl)) === 0, 'paid once a book');
await conSame('Stones on the Water');
await setup(7, { f: { b8_c7_ph: 3 } }); await open('b8_c7_fire', 'flat stones'); await btn('skPick'); await wait(40);
c = await ev(() => ({check:MG.state.check, plus:MG.state.plus})); ok(c.check && c.check.stat === 'wits' && (c.check.ok || c.check.tier === 'near' ? c.plus === 2 : !c.plus), `the flat stone: Wits (${tierLine(c.check)})`);
await ev(() => { MG.state.plus = 0; MG.state.hisPlus = 0; }); await rnd(.5);
for (let i = 0; i < 3; i++) { await until(() => !!$('#skUp'), 8000); await key(' '); await wait(30); await ev(() => { MG.state.force = [1, 0]; }); await key(' '); await wait(20); await key(' '); await wait(30); }
await until(() => MG.state.over, 8000); await unrnd();
c = await ev(() => ({mine:MG.state.mine.reduce((a, b) => a + b, 0), his:MG.state.his.reduce((a, b) => a + b, 0), deeds:S.deeds.b8SkipLost})); await btn('skDone'); await wait(80);
{ const t = await text(), pd = await ev(() => S.f.b8_skipPaid); ok(c.mine === 0 && c.his === 12 && c.deeds === 1 && !pd && /Benlo.s/.test(t), 'three steep throws, keys only: straight in each time, Benlo\'s lake, nothing paid' + (c.mine === 0 && c.his === 12 && c.deeds === 1 && !pd && /Benlo.s/.test(t) ? '' : ' ' + JSON.stringify([c, pd, t.slice(0, 80)]))); }
await setup(7, { f: { b8_c7_ph: 3 } }); await open('b8_c7_fire', 'flat stones'); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b8_c7_skip_after' && /put the stone down/.test(await text()) && (await fireOk('b8_c7_fire', /flat stones/)).game, 'left early: nothing paid, offered again');
await ev(() => { S.f.b8_c7_ph = 1; }); ok(!(await fireOk('b8_c7_fire', /flat stones/)).game, 'at first light, no stones');
await ev(() => { S.f.b8_c7_ph = 3; S.f.b8_c7_key = 'daru'; }); ok(!(await fireOk('b8_c7_fire', /flat stones/)).game, 'once the road is chosen, no stones');

/* the tables' words, the Deeds page, the journal, the after-nodes */
ok(!NEVER.test(allPanel) && !/!/.test(allPanel.replace(/"[^"]*"/g, '').replace(/“[^”]*”/g, '')), 'the tables name no one the book may not name, and no "!" in narration');
const dd = await ev(() => { S.deeds = Object.assign(S.deeds || {}, {b8CupWon:1, b8PegLost:1, b8LampWon:1, b8FireWon:1, b8SkipLost:1});
  const h = b8DeedsExtra([{s:S}]); return {fires:/At the fires/.test(h), con:/The Contract/.test(h), rows:['Orsa', 'Last Peg', 'Lamp and Stone', 'Keep the Fire', 'Stones on the Water'].every(k => h.includes(k)), leak:/undefined|NaN/.test(h)}; });
ok(dd.fires && dd.con && dd.rows && !dd.leak, 'the Deeds page lists Book Eight\'s fires under the Contract');
const jn = await ev(() => { S.f.b8_cupLast = {done:true, won:true}; S.f.b8_pegLast = {done:true, won:false}; S.f.b8_lampLast = {done:true, won:true}; S.f.b8_fireLast = {done:true, won:true}; S.f.b8_skipLast = {done:true, won:false};
  return [B8CH1.journal(), B8CH2.journal(), B8CH3.journal(), B8CH4.journal(), B8CH7.journal()].map(j => j[0]); });
ok(/Orsa/.test(jn[0]) && /Last Peg/.test(jn[1]) && /Thessaly/.test(jn[2]) && /Hurrin/.test(jn[3]) && /Benlo/.test(jn[4]), 'each game leaves a journal line');
const leak = await ev(NEVs => { const NEVER = new RegExp(NEVs), out = []; const cases = {b8_c1_cup_after:[{}, {done:true, pay:3}, {done:true, pay:-2}, {done:true, pay:0}], b8_c2_peg_after:[{}, {done:true, won:true, mine:2, his:1}, {done:true, won:false, mine:0, his:2}],
    b8_c3_lamp_after:[{}, {done:true, won:true, mine:2, lost:0}, {done:true, won:false, mine:1, lost:2}], b8_c4_fire_after:[{}, {done:true, won:true}, {done:true, won:false}], b8_c7_skip_after:[{}, {done:true, won:true, mine:20, his:9}, {done:true, won:false, mine:4, his:9}, {done:true, won:false, tie:true, mine:9, his:9}]};
  const last = {b8_c1_cup_after:'b8_cupLast', b8_c2_peg_after:'b8_pegLast', b8_c3_lamp_after:'b8_lampLast', b8_c4_fire_after:'b8_fireLast', b8_c7_skip_after:'b8_skipLast'};
  const paid = {b8_c3_lamp_after:['b8_lampPaid', ['tuft', 'edrem', 'salve']], b8_c4_fire_after:['b8_firePaid', ['edrem', 'salve']], b8_c7_skip_after:['b8_skipPaid', ['brisk', 'kettle', 'salve']]};
  Object.entries(cases).forEach(([k, rs]) => rs.forEach(r => (paid[k] ? paid[k][1] : [null]).forEach(p => { S.f[last[k]] = r; if (paid[k]) S.f[paid[k][0]] = p; const n = DLG[k](), t = n.txt;
    if (!t.trim() || /undefined|NaN|\[object|\$\{|\bnull\b/.test(t)) out.push(k + ' leaks'); if (NEVER.test(t)) out.push(k + ' a never-use name'); if (/!/.test(t.replace(/"[^"]*"/g, ''))) out.push(k + ' an exclamation mark in narration');
    if (n.scene && !SCENES[n.scene]) out.push(k + ' no scene ' + n.scene); if (!n.ch.length || n.ch[0].go !== k.replace(/_[a-z]+_after$/, '_fire')) out.push(k + ' no way back'); }))); return out; }, NEVER.source);
ok(!leak.length, 'the after-nodes read cleanly, every way' + (leak.length ? ': ' + leak.join(' ') : ''));
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
