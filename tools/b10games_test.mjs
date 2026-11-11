// v13.0: Book Ten's games at the fires (189). Each game is offered at its chapter's fire, for the squad that chapter belongs to, right
// after "Talk with the squad", with the fire's own choices still there and "Not now" last (and taken back to the map); opens on the
// tables' frame; plays to a win and to a loss; closes to its after-node; pays once in the book's own coin (+1 regard to the squadmate who
// needed it most, or +1 Witness) and nothing else; is not offered again once finished; and leaves its deed. A game left early pays nothing
// and is offered again. The Corporal's Ladder (Ch1, the Third): count the pack (Wits, its "yes, but"). Yelt's Measures (Ch2, the
// Letherii): do the sums (Wits, its "yes, but"). Straws (Ch3, the Third, the circle under the cloaks by day, no fire): read the heap (Wits,
// its "yes, but"). Fists (Ch4, the Letherii): read the knuckles (Guile, its "yes, but"). Coins on the Shield (Ch7, the Third, the night
// before): read the shield (Wits, its "yes, but"). The phases where each game is not offered (the marches by night, the line, the
// barrows); no game at Ch5's fire with no fire or Ch6's battle day; both roads where a game changes with them; the pay touching nothing
// else (thirst, coin, gear, the other coin); the Deeds page, the journal, the after-nodes (no leaks, no never-names, no "!" in narration,
// no rounds or turns, no sentence opening on Nobody/Somebody); phone width (412); screenshots to /tmp/claude-0/shots/b10/games/.
// Usage: node tools/b10games_test.mjs   (build first; exit 1 on a failure or a page error)
import fs from 'fs';
import { server, browser as launch, openGame } from './page.mjs';
const SHOTS = '/tmp/claude-0/shots/b10/games'; fs.mkdirSync(SHOTS, { recursive: true });
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { mobile: true, touch: true, width: 412, height: 915, settings: { master: 0, music: 0, sfx: 0, amb: 0, motion: 'on', shake: false, speed: .15 } });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const wait = ms => page.waitForTimeout(ms);
/* a fresh Book Ten save at chapter ch (the chapter's squad swapped in), with the flags given; everything but the pay is remembered */
const setup = (ch, extra = {}) => ev(({ ch, extra }) => { if (typeof mgOpenNow === 'function' && mgOpenNow()) mgClose({}); setBook('tcg'); S = newStateTCG('Hask', 'Brann'); S.picksDue = []; save();
  Object.assign(S.f, extra.road || {}); startChapter(ch);
  S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true;
  Object.assign(S.f, extra.f || {}); (extra.join || []).forEach(id => b10Join(id)); (S.squad || []).forEach(k => { if (k !== 'sgt' && S.loy) S.loy[k] = 0; });
  window._snap = JSON.stringify({w:S.b10w, loy:S.loy, inj:S.injury || {}, silver:S.silver, gear:S.gear, inv:S.inv, xp:S.xp, beat:S.b10});
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
const tierLine = r => r ? `${r.who} ${r.stat} ${r.tier}` : 'no roll';
const nearNext = () => ev(() => { window._g ??= b5gRoll; b5gRoll = (...a) => { const r = window._g(...a); b5gRoll = window._g; r.tier = 'near'; r.ok = false; r.pass = true; return r; }; });
const okNext = () => ev(() => { window._g ??= b5gRoll; b5gRoll = (...a) => { const r = window._g(...a); b5gRoll = window._g; r.tier = 'clean'; r.ok = true; r.pass = true; return r; }; });
/* what moved since setup: Witness, regard (the sum of rises), and anything else (thirst, coin, gear, items, xp, beats) */
const moved = () => ev(() => { const a = JSON.parse(window._snap), wit = (S.b10w ? S.b10w.n : 5) - (a.w ? a.w.n : 5), up = Object.keys(S.loy || {}).filter(k => (S.loy[k] || 0) > (a.loy[k] || 0)), loyUp = up.reduce((n, k) => n + S.loy[k] - (a.loy[k] || 0), 0);
  const gr = o => Object.fromEntries(Object.entries(o || {}).filter(([, v]) => v && Object.keys(v).length)); // the engine fills empty gear rows as squadmates show; only real gear counts
  const now = {inj:S.injury || {}, silver:S.silver, gear:gr(S.gear), inv:S.inv, xp:S.xp, beat:S.b10}, was = {inj:a.inj, silver:a.silver, gear:gr(a.gear), inv:a.inv, xp:a.xp, beat:a.beat};
  const diff = Object.keys(now).filter(k => JSON.stringify(now[k]) !== JSON.stringify(was[k])).map(k => `${k}: ${JSON.stringify(was[k])} -> ${JSON.stringify(now[k])}`).join('; ');
  return {wit, loyUp, up, other:!!diff, diff}; });
const NEVER = /Bridgeburner|Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|Burn's Sleep|\b11\d\d\b|K'Chain|Che'Malle|Nah'ruk|Fiddler|Tarr\b|Cuttle|Hedge|Bavedict|Keneb|Blistig|Errant|Brys|Aranict|Henar|Kalam|Tehol|Tavore|Paran|Gesler|Stormy|Krughava|Forkrul|\bPures?\b|Crippled God|\bdays?\b|\bweeks?\b|\bmonths?\b/;
const ROUNDS = /\b(a|the|next|this|each|every|one)\s+(round|turn)\b/;
const OPEN = /(?:^|[.?!]\s+|["“`]\s*)(Nobody|Somebody)\b/m;
let allPanel = '';

/* ============ 1. The Corporal's Ladder (Ch1, the Third) ============ */
await setup(1, { f: { b10_c1_ph: 1 } });
ok(await ev(() => S.thread === 't'), 'Ch1 is the Third\'s');
fireLine(await fireOk('b10_c1_fire', /Corporal.s Ladder/), 'Ch1 the camp by day: the Corporal\'s Ladder');
await notNow('b10_c1_fire', 'Ch1');
await open('b10_c1_fire', 'Corporal.s Ladder');
ok(await ev(() => mgOpenNow() && /Corporal/.test($('#mg h2').textContent) && /Thallo/.test($('#mgPanel').innerText)), 'the cards come out; Thallo and his pack');
allPanel += await panel(); await shot('1-ladder-intro');
await btn('ldGo'); await wait(40); ok(await ev(() => MG.state.phase === 'call' && MG.state.up >= 1 && MG.state.up <= 12), 'a card up; call higher or lower');
// climb to the top three times: force each next card the right way
for (let c = 0; c < 3; c++) { if (c) { await until(() => MG.state.phase === 'next', 4000); await btn('ldNext'); await wait(30); }
  for (let i = 0; i < 5; i++) { await ev(() => { MG.state.up = 6; MG.state.force = 10; }); await key('h'); await wait(20); } }
await shot('2-ladder-top');
await ev(() => { window._rr ??= Math.random; Math.random = () => .999; }); // Thallo's draws come off the top of a fresh pack; we only need his climbs to end
await until(() => MG.state.over, 15000); await ev(() => { if (window._rr) Math.random = window._rr; });
let c = await ev(() => ({over:MG.state.over, mine:MG.state.mine.reduce((a, b) => a + b, 0), his:MG.state.his.reduce((a, b) => a + b, 0), deeds:S.deeds && S.deeds.b10LadderWon}));
ok(c.over && c.mine === 15, `three climbs to the top: fifteen rungs (Thallo ${c.his})`);
let f = await fit(); ok(f.ok, 'the Ladder fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
if (c.his < 15) { allPanel += await panel(); await btn('ldDone'); await wait(100);
  let r = await ev(() => ({node:S.node, paid:S.f.b10_ladderPaid}));
  let m = await moved();
  ok(r.node === 'b10_c1_ladder_after' && !!r.paid && m.loyUp === 1 && m.wit === 0 && !m.other && /rungs to his/.test(await text()), `won: +1 regard to ${r.paid}, nothing else; the after-node`);
  ok(!(await fireOk('b10_c1_fire', /Corporal.s Ladder/)).game, 'played once: the Ladder is not offered again');
  await ev(() => b10LadderPay({won:true, done:true, mine:15, his:0})); m = await moved(); ok(m.loyUp === 1, 'the Ladder pays once a book');
} else { ok(false, 'Thallo reached the top every climb (a rare tie): re-run'); await btn('ldDone'); }
// a loss, and the count's "yes, but"
await setup(1, { f: { b10_c1_ph: 2 } }); await open('b10_c1_fire', 'Corporal.s Ladder'); await btn('ldGo'); await wait(40);
await nearNext(); await key('c'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, stat:MG.state.check && MG.state.check.stat, slip:MG.state.slip, tslip:MG.state.tslip, count:!!$('#ldCount'), panel:$('#mgPanel').innerText}));
ok(c.tier === 'near' && c.stat === 'wits' && c.slip && c.tslip && !c.count && /one for Thallo/.test(c.panel), '"yes, but" on the count: a slip this climb, and one for Thallo');
await shot('3-ladder-count');
await ev(() => { MG.state.up = 6; MG.state.force = 2; }); await key('h'); await wait(20); ok(await ev(() => MG.state.phase === 'call' && !MG.state.slip && MG.state.rung === 0), 'the slip saves one wrong call');
for (let cl = 0; cl < 3; cl++) { if (cl) { await until(() => MG.state.phase === 'next', 4000); await btn('ldNext'); await wait(30); } await ev(() => { MG.state.up = 6; MG.state.force = 6; }); await key('h'); await wait(30); }
await until(() => MG.state.over, 15000);
c = await ev(() => ({mine:MG.state.mine.reduce((a, b) => a + b, 0), his:MG.state.his.reduce((a, b) => a + b, 0), lost:S.deeds && S.deeds.b10LadderLost}));
await btn('ldDone'); await wait(80);
let mv = await moved();
if (c.his > 0) ok(c.mine === 0 && c.lost === 1 && mv.loyUp === 0 && mv.wit === 0 && !(await ev(() => S.f.b10_ladderPaid)) && /Thallo.s,/.test(await text()), 'off every climb on the first card: Thallo\'s, nothing paid');
else ok(/No one.s/.test(await text()) && mv.loyUp === 0, 'nought each: no one\'s, nothing paid');
await setup(1, { f: { b10_c1_ph: 1 } }); await open('b10_c1_fire', 'Corporal.s Ladder'); await btn('ldGo'); await key('c'); await wait(40);
c = await ev(() => MG.state.check); ok(c && c.stat === 'wits', `the count as it rolls: Wits (${tierLine(c)})`);
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b10_c1_ladder_after' && (await moved()).loyUp === 0 && /back his cards/.test(await text()) && (await fireOk('b10_c1_fire', /Corporal.s Ladder/)).game, 'left early: nothing paid, offered again');
await ev(() => { S.f.b10_c1_ph = 3; }); ok(!(await fireOk('b10_c1_fire', /Corporal.s Ladder/)).game, 'late, after the key: no cards');

/* ============ 2. Yelt's Measures (Ch2, the Letherii) ============ */
await setup(2, { f: { b10_c2_ph: 1 }, join: ['tirren'] });
ok(await ev(() => S.thread === 'l'), 'Ch2 is the Letherii\'s');
fireLine(await fireOk('b10_c2_fire', /Yelt.s Measures/), 'Ch2 the rise: Yelt\'s Measures');
await notNow('b10_c2_fire', 'Ch2');
await open('b10_c2_fire', 'Yelt.s Measures');
ok(await ev(() => /Yelt.s Measures/.test($('#mg h2').textContent) && /Yelt/.test($('#mgPanel').innerText)), 'the skins come out; Yelt');
allPanel += await panel(); await shot('4-meas-intro');
await btn('msGo'); await wait(40);
c = await ev(() => ({A:MG.state.A, B:MG.state.B, want:MG.state.want, left:MG.state.left, min:b10gMeasMin(5, 3, 4), min2:b10gMeasMin(7, 4, 6), min3:b10gMeasMin(9, 4, 7)}));
ok(c.A === 5 && c.B === 3 && c.want === 4 && c.left === c.min + 2 && c.min === 6 && c.min2 < 99 && c.min3 < 99, `five and three for four, in the fewest pours and two (${c.left}; the others ${c.min2}, ${c.min3})`);
// five-three for four: fill the skin, skin into jug, empty the jug, skin into jug, fill the skin, skin into jug
for (const k of ['1', '3', '6', '3', '1', '3']) { await key(k); await wait(15); }
await shot('5-meas-pour');
ok(await ev(() => MG.state.mine === 1), 'four in the skin: the first measure');
await until(() => MG.state.phase === 'next', 4000); await btn('msGo'); await wait(30);
// seven-four for six: fill the skin; into the jug (3 left); empty the jug; into the jug (0,3); fill the skin (7,3); into the jug (6,4)
for (const k of ['1', '3', '6', '3', '1', '3']) { await key(k); await wait(15); }
await until(() => MG.state.over, 4000);
c = await ev(() => ({won:MG.state.mine >= 2, deeds:S.deeds && S.deeds.b10MeasWon}));
ok(c.won && c.deeds === 1, 'six in the skin: two measures, won');
f = await fit(); ok(f.ok, 'the Measures fit a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await btn('msDone'); await wait(100);
let r = await ev(() => ({node:S.node, paid:S.f.b10_measPaid})); mv = await moved();
ok(r.node === 'b10_c2_meas_after' && !!r.paid && mv.loyUp === 1 && mv.wit === 0 && !mv.other && /honest column/.test(await text()), `won: +1 regard to ${r.paid}, nothing else; the after-node (${mv.loyUp} ${mv.wit} ${mv.diff})`);
ok(!(await fireOk('b10_c2_fire', /Yelt.s Measures/)).game, 'played once: the Measures are not offered again');
await ev(() => b10MeasPay({won:true, done:true, mine:2, lost:0})); ok((await moved()).loyUp === 1, 'the Measures pay once a book');
// the sums' "yes, but", then out of pours twice
await setup(2, { f: { b10_c2_ph: 1 } }); await open('b10_c2_fire', 'Yelt.s Measures'); await btn('msGo'); await wait(30);
await key('1'); await wait(10); await key('3'); await wait(10);
ok(await ev(() => !$('#msSums')), 'the sums are offered only before the first pour of a measure');
for (let i = 0; i < 6; i++) { await key('5'); await wait(10); }
await until(() => MG.state.phase === 'next', 4000);
await nearNext(); await key('s'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, stat:MG.state.check && MG.state.check.stat, bonus:MG.state.bonus, panel:$('#mgPanel').innerText}));
ok(c.tier === 'near' && c.stat === 'wits' && c.bonus === 2 && /both empty/.test(c.panel), '"yes, but" on the sums: two more pours, and the jug goes over');
await shot('6-meas-sums');
await btn('msGo'); await wait(30); ok(await ev(() => MG.state.left === b10gMeasMin(7, 4, 6) + 4), 'the next measure has its two more pours');
for (let i = 0; i < 20; i++) { if (await ev(() => MG.state.phase !== 'pour')) break; await key('5'); await wait(10); }
await until(() => MG.state.over, 4000);
c = await ev(() => ({lost:MG.state.lost, deeds:S.deeds && S.deeds.b10MeasLost})); await btn('msDone'); await wait(80);
mv = await moved(); ok(c.lost === 2 && c.deeds === 1 && mv.loyUp === 0 && mv.wit === 0 && !(await ev(() => S.f.b10_measPaid)), 'out of pours twice: lost, nothing paid');
await setup(2, { f: { b10_c2_ph: 1 } }); await open('b10_c2_fire', 'Yelt.s Measures'); await btn('msGo'); await key('s'); await wait(40);
c = await ev(() => MG.state.check); ok(c && c.stat === 'wits', `the sums as they roll: Wits (${tierLine(c)})`);
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b10_c2_meas_after' && /leave Yelt his skins/.test(await text()) && (await fireOk('b10_c2_fire', /Yelt.s Measures/)).game, 'left early: nothing paid, offered again');
await ev(() => { S.f.b10_c2_ph = 2; }); ok(!(await fireOk('b10_c2_fire', /Yelt.s Measures/)).game, 'dusk, the train loading: no measures');
await ev(() => { S.f.b10_c2_ph = 3; }); ok((await fireOk('b10_c2_fire', /Yelt.s Measures/)).game, 'the halt that night with the brigades: the measures');
await setup(2, { road: { b10_lRoad: 'adjunct' }, f: { b10_c2_ph: 3 } }); ok(!(await fireOk('b10_c2_fire', /Yelt.s Measures/)).game, 'on the glass (\'adjunct\'), Yelt went south: no measures that night');
await ev(() => { S.f.b10_c2_ph = 1; }); ok((await fireOk('b10_c2_fire', /Yelt.s Measures/)).game, 'but on the rise before the parting, on either road');

/* ============ 3. Straws (Ch3, the Third, the circle under the cloaks) ============ */
await setup(3, { f: { b10_c3_ph: 1 } });
ok(await ev(() => S.thread === 't'), 'Ch3 is the Third\'s');
fireLine(await fireOk('b10_c3_fire', /Straws/), 'Ch3 the lie-up, no fire: Straws');
await notNow('b10_c3_fire', 'Ch3');
await open('b10_c3_fire', 'Straws');
ok(await ev(() => /Straws/.test($('#mg h2').textContent) && /slivers off the glass/.test($('#mgPanel').innerText) && !/\bdice\b|\bfire\b/i.test($('#mgPanel').innerText)), 'the heap: slivers off the glass, in the shade; no dice, no fire');
allPanel += await panel(); await shot('7-straws-intro');
await btn('swGo'); await wait(40);
c = await ev(() => { const g = MG.state, cr = (p, q) => { const d = (a, b, c) => (b[0] - a[0])*(c[1] - a[1]) - (b[1] - a[1])*(c[0] - a[0]); return d([p.x1, p.y1], [p.x2, p.y2], [q.x1, q.y1])*d([p.x1, p.y1], [p.x2, p.y2], [q.x2, q.y2]) < 0 && d([q.x1, q.y1], [q.x2, q.y2], [p.x1, p.y1])*d([q.x1, q.y1], [q.x2, q.y2], [p.x2, p.y2]) < 0; };
  return {n:g.st.length, top:!g.st.slice(0, -1).some(s => cr(s, g.st[g.st.length - 1])) || true, phase:g.phase}; });
ok(c.n === 11 && c.phase === 'pick', 'eleven slivers in a heap; your go');
// take only free ones, in order from the top, and keep going while the heap lasts (Thallo forced to miss)
await ev(() => { window._rr ??= Math.random; Math.random = () => .99; });
for (let i = 0; i < 40; i++) { const st = await ev(() => ({over:MG.state.over, phase:MG.state.phase})); if (st.over) break; if (st.phase !== 'pick') { await wait(40); continue; }
  await ev(() => { const g = MG.state; for (let j = g.st.length - 1; j >= 0; j--) if (!g.st[j].gone) { const b = document.querySelector(`#mgPanel [data-sw="${j}"]`); b && b.click(); return; } }); await wait(15); }
await until(() => MG.state.over, 8000); await ev(() => { if (window._rr) Math.random = window._rr; });
c = await ev(() => ({mine:MG.state.mine, his:MG.state.his, deeds:S.deeds && S.deeds.b10StrawsWon}));
ok(c.mine === 11 && c.his === 0 && c.deeds === 1, `from the top down, every one comes away clean: ${c.mine} to ${c.his}`);
f = await fit(); ok(f.ok, 'Straws fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await shot('8-straws-won'); await btn('swDone'); await wait(100);
r = await ev(() => ({node:S.node, paid:S.f.b10_strawsPaid})); mv = await moved();
ok(r.node === 'b10_c3_straws_after' && !!r.paid && mv.loyUp === 1 && mv.wit === 0 && !mv.other, `won: +1 regard to ${r.paid}, nothing else; the after-node`);
ok(!(await fireOk('b10_c3_fire', /Straws/)).game, 'played once: Straws is not offered again');
// the read's "yes, but", a covered one touched, and a loss
await setup(3, { f: { b10_c3_ph: 4 } }); await open('b10_c3_fire', 'Straws'); await btn('swGo'); await wait(30);
await nearNext(); await key('r'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, glint:MG.state.glint, tsure:MG.state.tsure, on:document.querySelectorAll('#mgPanel [data-sw].on').length}));
ok(c.tier === 'near' && c.glint && c.tsure && c.on >= 1, `"yes, but" on the read: the free ones catch the light (${c.on}), and Thallo's next is sure`);
await shot('9-straws-read');
await ev(() => { const g = MG.state; const cr = (p, q) => { const d = (a, b, c) => (b[0] - a[0])*(c[1] - a[1]) - (b[1] - a[1])*(c[0] - a[0]); return d([p.x1, p.y1], [p.x2, p.y2], [q.x1, q.y1])*d([p.x1, p.y1], [p.x2, p.y2], [q.x2, q.y2]) < 0 && d([q.x1, q.y1], [q.x2, q.y2], [p.x1, p.y1])*d([q.x1, q.y1], [q.x2, q.y2], [p.x2, p.y2]) < 0; };
  g.st = [{x1:.2, y1:.5, x2:.8, y2:.5, gone:false}, {x1:.5, y1:.2, x2:.5, y2:.8, gone:false}, {x1:.2, y1:.3, x2:.3, y2:.3, gone:false}]; g.mine = 0; g.his = 0; void cr; });
await sel('#mgPanel [data-sw="0"]'); await wait(30);
ok(await ev(() => MG.state.phase === 'wait' && !MG.state.st[0].gone && /lying across/.test($('#mgPanel').innerText)), 'touch one with another across it: the heap shifts, Thallo\'s go');
await ev(() => { window._rr ??= Math.random; Math.random = () => .01; });
await until(() => MG.state.over, 8000); await ev(() => { if (window._rr) Math.random = window._rr; });
c = await ev(() => ({mine:MG.state.mine, his:MG.state.his, lost:S.deeds && S.deeds.b10StrawsLost})); await btn('swDone'); await wait(80);
mv = await moved(); ok(c.his === 3 && c.mine === 0 && c.lost === 1 && mv.loyUp === 0 && mv.wit === 0 && /Thallo.s,/.test(await text()), 'Thallo takes the heap: his, nothing paid');
await setup(3, { f: { b10_c3_ph: 1 } }); await open('b10_c3_fire', 'Straws'); await btn('swGo'); await key('r'); await wait(40);
c = await ev(() => MG.state.check); ok(c && c.stat === 'wits', `the read as it rolls: Wits (${tierLine(c)})`);
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b10_c3_straws_after' && /leave Thallo his heap/.test(await text()) && (await fireOk('b10_c3_fire', /Straws/)).game, 'left early: nothing paid, offered again');
await ev(() => { S.f.b10_c3_ph = 2; }); ok(!(await fireOk('b10_c3_fire', /Straws/)).game, 'on the march by night: no circle, no straws');
await setup(3, { road: { b10_tRoad: 'south' }, f: { b10_c3_ph: 1 } });
const sf = await fireOk('b10_c3_fire', /Straws/); ok(sf.game, 'on the long way round (\'south\'): Straws in the wagon\'s shade');
await open('b10_c3_fire', 'Straws'); ok(await ev(() => /spoke/.test($('#mgPanel').innerText) && !/glass/.test($('#mgPanel').innerText)), 'splinters off a dead spoke, not the glass'); allPanel += await panel(); await ev(() => MG.leave()); await wait(60);

/* ============ 4. Fists (Ch4, the Letherii) ============ */
await setup(4, { f: { b10_c4_ph: 1 }, join: ['tirren'] });
ok(await ev(() => S.thread === 'l'), 'Ch4 is the Letherii\'s');
fireLine(await fireOk('b10_c4_fire', /Fists/), 'Ch4 the horse-lines at dusk: Fists');
await notNow('b10_c4_fire', 'Ch4');
await open('b10_c4_fire', 'Fists');
ok(await ev(() => /Fists/.test($('#mg h2').textContent) && /Orla/.test($('#mgPanel').innerText)), 'Orla, with a purse of docks');
allPanel += await panel(); await shot('10-fists-intro');
const hand = async (hideN, callN, oh, oc) => { await until(() => MG.state.phase === 'hide' || MG.state.phase === 'intro' || MG.state.phase === 'show', 3000);
  if (await ev(() => MG.state.phase !== 'hide')) { await ev(oh => { MG.state.forceHide = oh; }, oh); await key(' '); await wait(20); }
  await ev(([oh, oc]) => { MG.state.oh = oh; MG.state.forceCall = oc; }, [oh, oc]); await key(String(hideN)); await wait(15); await key(String(callN)); await wait(30); };
await hand(2, 3, 1, 4); ok(await ev(() => MG.state.mine === 1 && MG.state.hers === 0), 'two and one, called three: yours (she called four)');
await shot('11-fists-show');
await hand(0, 2, 2, 2); ok(await ev(() => MG.state.mine === 1 && MG.state.hers === 0), 'both right: no one\'s');
await hand(1, 1, 0, 2); await hand(3, 6, 3, 5);
await until(() => MG.state.over, 4000);
c = await ev(() => ({mine:MG.state.mine, deeds:S.deeds && S.deeds.b10FistsWon}));
ok(c.mine === 3 && c.deeds === 1, 'three hands: won');
f = await fit(); ok(f.ok, 'Fists fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await btn('fsDone'); await wait(100);
r = await ev(() => ({node:S.node, paid:S.f.b10_fistsPaid})); mv = await moved();
ok(r.node === 'b10_c4_fists_after' && r.paid === 1 && mv.wit === 1 && mv.loyUp === 0 && !mv.other && /laughing/.test(await text()), `won: Witness +1, nothing else; the after-node (${mv.wit} ${mv.loyUp} ${mv.diff})`);
ok(!(await fireOk('b10_c4_fire', /Fists/)).game, 'played once: Fists is not offered again');
await ev(() => b10FistsPay({won:true, done:true, mine:3, hers:0})); ok((await moved()).wit === 1, 'Fists pays once a book');
// the knuckles' "yes, but", then a loss
await setup(4, { f: { b10_c4_ph: 3 } }); await open('b10_c4_fire', 'Fists'); await key(' '); await wait(30);
await nearNext(); await key('k'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, stat:MG.state.check && MG.state.check.stat, see:MG.state.see, seen:MG.state.seen, panel:$('#mgPanel').innerText}));
ok(c.tier === 'near' && c.stat === 'guile' && c.see && c.seen && /sees yours/.test(c.panel), '"yes, but" on the knuckles: you see hers, she sees yours');
await shot('12-fists-knuckles');
await key('2'); await ev(() => { MG.state.oh = 1; }); await key('3'); await wait(30); ok(await ev(() => MG.state.oc === 3 && MG.state.mine === 0 && MG.state.hers === 0), 'she saw yours: both right, no one\'s');
for (let i = 0; i < 3; i++) await hand(1, 1, 2, 3);
await until(() => MG.state.over, 4000);
c = await ev(() => ({hers:MG.state.hers, lost:S.deeds && S.deeds.b10FistsLost})); await btn('fsDone'); await wait(80);
mv = await moved(); ok(c.hers === 3 && c.lost === 1 && mv.wit === 0 && mv.loyUp === 0 && !(await ev(() => S.f.b10_fistsPaid)) && /Orla.s,/.test(await text()), 'three hands to her: Orla\'s, nothing paid');
await setup(4, { f: { b10_c4_ph: 1 } }); await open('b10_c4_fire', 'Fists'); await key(' '); await key('k'); await wait(40);
c = await ev(() => MG.state.check); ok(c && c.stat === 'guile', `the knuckles as they roll: Guile (${tierLine(c)})`);
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b10_c4_fists_after' && /give it up/.test(await text()) && (await fireOk('b10_c4_fire', /Fists/)).game, 'left early: nothing paid, offered again');
await ev(() => { S.f.b10_c4_ph = 2; }); ok(!(await fireOk('b10_c4_fire', /Fists/)).game, 'on the road by night: no fire, no game');
await setup(4, { road: { b10_lRoad: 'adjunct' }, f: { b10_c4_ph: 1 } }); ok((await fireOk('b10_c4_fire', /carter at the column/)).game, 'on the glass (\'adjunct\'): a carter at the column\'s tail, not Orla');
await open('b10_c4_fire', 'carter at the column'); ok(await ev(() => /carter/.test($('#mgPanel').innerText) && !/Orla/.test($('#mgPanel').innerText)), 'the carter plays'); allPanel += await panel(); await ev(() => MG.leave()); await wait(60);

/* ============ 5. Coins on the Shield (Ch7, the Third) ============ */
await setup(7, { f: { b10_c7_ph: 1 } });
ok(await ev(() => S.thread === 't'), 'Ch7 is the Third\'s');
fireLine(await fireOk('b10_c7_fire', /Coins on the Shield/), 'Ch7 the night before: Coins on the Shield');
await notNow('b10_c7_fire', 'Ch7');
await open('b10_c7_fire', 'Coins on the Shield');
ok(await ev(() => /Coins on the Shield/.test($('#mg h2').textContent) && /regular/.test($('#mgPanel').innerText)), 'a regular of the company, his shield flat');
allPanel += await panel(); await shot('13-shield-intro');
for (let i = 0; i < 5; i++) { await until(() => MG.state.phase === 'intro' || MG.state.phase === 'ready', 3000); await key(' '); await wait(15); await ev(() => { MG.state.force = .84; }); await key(' '); await wait(30); }
await shot('14-shield-coins');
await ev(() => { window._rr ??= Math.random; Math.random = () => 0; }); // his coins fall short
await until(() => MG.state.over, 10000); await ev(() => { if (window._rr) Math.random = window._rr; });
c = await ev(() => ({mine:MG.state.mine, his:MG.state.his, deeds:S.deeds && S.deeds.b10ShieldWon}));
ok(c.mine === 15 && c.his < 15 && c.deeds === 1, `five on the boss: fifteen to his ${c.his}`);
f = await fit(); ok(f.ok, 'the Shield fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
allPanel += await panel(); await btn('shDone'); await wait(100);
r = await ev(() => ({node:S.node, paid:S.f.b10_shieldPaid})); mv = await moved();
ok(r.node === 'b10_c7_shield_after' && r.paid === 1 && mv.wit === 1 && mv.loyUp === 0 && !mv.other && /file-closers who could shove/.test(await text()), 'won: Witness +1, nothing else; the after-node');
ok(!(await fireOk('b10_c7_fire', /Coins on the Shield/)).game, 'played once: the Shield is not offered again');
await ev(() => b10ShieldPay({won:true, done:true, mine:15, his:0})); ok((await moved()).wit === 1, 'the Shield pays once a book');
// the read's "yes, but", then a loss
await setup(7, { f: { b10_c7_ph: 1 } }); await open('b10_c7_fire', 'Coins on the Shield');
await nearNext(); await key('r'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, stat:MG.state.check && MG.state.check.stat, slow:MG.state.slow, sure:MG.state.sure, panel:$('#mgPanel').innerText}));
ok(c.tier === 'near' && c.stat === 'wits' && c.slow && c.sure && /sits on the boss/.test(c.panel), '"yes, but" on the read: slower next coin, and his next sits on the boss');
await shot('15-shield-read');
for (let i = 0; i < 5; i++) { await until(() => MG.state.phase === 'intro' || MG.state.phase === 'ready', 3000); await key(' '); await wait(15); await ev(() => { MG.state.force = .1; }); await key(' '); await wait(30); }
await until(() => MG.state.over, 10000);
c = await ev(() => ({mine:MG.state.mine, his:MG.state.his, lost:S.deeds && S.deeds.b10ShieldLost})); await btn('shDone'); await wait(80);
mv = await moved(); ok(c.mine === 0 && c.his >= 3 && c.lost === 1 && mv.wit === 0 && !(await ev(() => S.f.b10_shieldPaid)) && /His,/.test(await text()), `every coin short: his (${c.his}), nothing paid`);
await setup(7, { f: { b10_c7_ph: 1 } }); await open('b10_c7_fire', 'Coins on the Shield'); await key('r'); await wait(40);
c = await ev(() => MG.state.check); ok(c && c.stat === 'wits', `the read as it rolls: Wits (${tierLine(c)})`);
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b10_c7_shield_after' && /back his coins/.test(await text()) && (await fireOk('b10_c7_fire', /Coins on the Shield/)).game, 'left early: nothing paid, offered again');
await ev(() => { S.f.b10_c7_ph = 4; S.f.b10_c7_key = 'colours'; }); ok(!(await fireOk('b10_c7_fire', /Coins on the Shield/)).game, 'at the barrows: no game');
await setup(7, { road: { b10_tRoad: 'south' }, f: { b10_c7_ph: 1 } }); ok((await fireOk('b10_c7_fire', /spearman/)).game, 'on \'south\': a Letherii spearman\'s shield');

/* ============ no game at Ch5's fire with no fire, or Ch6's battle day ============ */
const ours = /Corporal|Measures|Straws|Fists|Coins on the Shield/;
for (const ph of [1, 2, 4]) { await setup(5, { f: { b10_c5_ph: ph } }); ok(!(await fireOk('b10_c5_fire', ours)).game, `the fire with no fire (Ch5, phase ${ph}): no game`); }
for (const ph of [1, 4]) { await setup(6, { f: { b10_c6_ph: ph } }); ok(!(await fireOk('b10_c6_fire', ours)).game, `the battle's day (Ch6, phase ${ph}): no game`); }

/* the tables' words, the Deeds page, the journal, the after-nodes */
ok(!NEVER.test(allPanel) && !/!/.test(allPanel.replace(/"[^"]*"/g, '').replace(/“[^”]*”/g, '')), 'the tables name no one the book may not name, and no "!" in narration' + (NEVER.test(allPanel) ? ': ' + allPanel.match(NEVER)[0] : ''));
ok(!OPEN.test(allPanel), 'no line at the tables opens on Nobody or Somebody');
const dd = await ev(() => { setBook('tcg'); S = newStateTCG('D', 'E'); S.deeds = {b10LadderWon:1, b10FistsLost:1};
  const h = b10DeedsExtra([{s:S}]); return {fires:/At the fires/.test(h), wit:/Witness/.test(h), rows:['Corporal', 'Yelt', 'Straws', 'Fists', 'Coins on the Shield'].every(k => h.includes(k)), leak:/undefined|NaN/.test(h)}; });
ok(dd.fires && dd.wit && dd.rows && !dd.leak, 'the Deeds page lists Book Ten\'s fires under Witness');
const jn = await ev(() => { S.f.b10_ladderLast = {done:true, won:true}; S.f.b10_measLast = {done:true, won:false}; S.f.b10_strawsLast = {done:true, won:true}; S.f.b10_fistsLast = {done:true, won:false}; S.f.b10_shieldLast = {done:true, won:true};
  return [B10CH1.journal(), B10CH2.journal(), B10CH3.journal(), B10CH4.journal(), B10CH7.journal()].map(j => j[0]); });
ok(/Ladder/.test(jn[0]) && /Yelt/.test(jn[1]) && /Straws/.test(jn[2]) && /Fists/.test(jn[3]) && /Shield/.test(jn[4]), 'each game leaves a journal line');
const after = await ev(() => { const out = []; const roads = [['adjunct', 'escort'], ['south', 'adjunct']];
  const nodes = [['b10_c1_ladder_after', 1, 'b10_ladder'], ['b10_c2_meas_after', 2, 'b10_meas'], ['b10_c3_straws_after', 3, 'b10_straws'], ['b10_c4_fists_after', 4, 'b10_fists'], ['b10_c7_shield_after', 7, 'b10_shield']];
  for (const [tr, lr] of roads) for (const [id, ch, k] of nodes) for (const res of [{done:false}, {done:true, won:true, mine:3, his:1, hers:1, lost:0}, {done:true, won:false, tie:true, mine:2, his:2, hers:2, lost:2}, {done:true, won:false, mine:1, his:3, hers:3, lost:2}]) {
    setBook('tcg'); S = newStateTCG('A', 'B'); S.f.b10_tRoad = tr; S.f.b10_lRoad = lr; startChapter(ch); S.f[k + 'Last'] = res; if (res.won) S.f[k + 'Paid'] = ch === 4 || ch === 7 ? 1 : (S.squad.find(x => x !== 'sgt') || 'witness');
    try { const n = DLG[id](); out.push({id, txt:n.txt, html:n.html || '', scene:n.scene, sc:!!SCENES[n.scene], back:n.ch && n.ch[0] && n.ch[0].go}); } catch (e) { out.push({id, err:e.message}); } }
  return out; });
const bad = after.filter(a => a.err || !a.sc || /undefined|NaN|\[object|\$\{/.test(a.txt + a.html) || NEVER.test(a.txt) || /!/.test(a.txt.replace(/"[^"]*"/g, '')) || ROUNDS.test(a.txt) || OPEN.test(a.txt) || !/Witness/.test(a.html));
ok(!bad.length && after.length === 40, `the after-nodes render cleanly on both roads, every way (${after.length}), each with its scene and the Witness box` + (bad.length ? ': ' + bad.slice(0, 3).map(b => `${b.id} ${b.err || b.scene || ''} ${(b.txt || '').slice(0, 80)}`).join(' | ') : ''));
ok(after.every(a => a.back === `b10_c${a.id.match(/c(\d)/)[1]}_fire`), 'each after-node goes back to its own fire');
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
