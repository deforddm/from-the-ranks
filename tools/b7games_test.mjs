// v10.0: Book Seven's games at the fires (129). Each game is offered at its chapter's fire beside the fire's own choices (the rest, the squad's
// talk, Not now), opens on the tables' frame, plays to a win and to a loss from the panel and the keys, closes to its after-node, pays once a
// book, is not offered again once finished, and leaves its deed; a game left early pays nothing and can be come back to. Ships (Ch1, the
// Third): silver won, a die argued out of the sand (Guile, its "yes, but"). Pass the Debt (Ch2, the Letherii): a line off the roll (the
// file −1), Perrit +1, or a salve; the dock spun by hand (Guile, its "yes, but"). The Fuse-Count (Ch3, the Third): a burner; the fuse notched
// at the half (Wits, its "yes, but"). The Horse-Trade (Ch4, the Letherii): Sorvan +1 or a salve; a look in its mouth (Wits, its "yes, but").
// The Rat Catchers' Wager (Ch7, the Third): silver on the crowd's word, never a name; up on the wall (Wits, its "yes, but"). The Deeds page,
// the journal, the after-nodes, phone width (412), and screenshots of each table to /tmp/claude-0/shots/b7/games/.
// Usage: node tools/b7games_test.mjs   (build first; exit 1 on a failure or a page error)
import fs from 'fs';
import { server, browser as launch, openGame } from './page.mjs';
const SHOTS = '/tmp/claude-0/shots/b7/games'; fs.mkdirSync(SHOTS, { recursive: true });
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { mobile: true, touch: true, width: 412, height: 860, settings: { master: 0, music: 0, sfx: 0, amb: 0, motion: 'on', shake: false, speed: .15 } });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const wait = ms => page.waitForTimeout(ms);
/* a Book Seven save at chapter ch (the squad that plays it swapped in), with a purse and the flags given */
const setup = (ch, extra = {}) => ev(({ ch, extra }) => { if (typeof mgOpenNow === 'function' && mgOpenNow()) mgClose({}); setBook('rg'); S = newStateRG('Hask', 'Brann'); S.picksDue = []; S.th.l.picksDue = []; save(); startChapter(ch);
  S.picksDue = []; const m = document.getElementById('modal'); if (m) m.hidden = true; S.silver = 12; S.inv = {sharper:1, burner:1, cusser:0, smoker:1, salve:2};
  Object.assign(S.f, extra.f || {}); (extra.join || []).forEach(id => { b7Join(id); if (S.loy[id] == null) S.loy[id] = 0; });
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
const fireOk = async (fire, game) => { await ev(f => { G.said = null; talk(f); }, fire); const c = await choices(); return {game:c.some(t => game.test(t)), rest:c.some(t => /rest/.test(t)), talk:c.some(t => /Talk with the squad/.test(t)), notNow:/^Not now/.test(c[c.length - 1] || ''), i:c.findIndex(t => game.test(t)), ti:c.findIndex(t => /Talk with the squad/.test(t))}; };
const fireLine = (f, m) => ok(f.game && f.rest && f.talk && f.notNow && f.i === f.ti + 1, `${m}: offered beside the squad's talk; the rest and Not now still there`);
const notNow = async (fire, m) => { await ev(f => { G.said = null; talk(f); }, fire); await click('^Not now'); await wait(80); ok(await ev(() => view === 'explore' && !mgOpenNow()), `${m}: Not now goes back to the map, no table open`); };
const open = async (fire, re) => { await ev(f => { G.said = null; talk(f); }, fire); await click(re); await wait(100); };
const rnd = v => ev(v => { window._r ??= Math.random; Math.random = () => v; }, v), unrnd = () => ev(() => { if (window._r) Math.random = window._r; });
const tierLine = r => r ? `${r.who} ${r.stat} ${r.tier}` : 'no roll';
/* force the next in-game check to its "yes, but" tier (the roll itself is real; only the tier is read) */
const nearNext = () => ev(() => { window._g ??= b5gRoll; b5gRoll = (...a) => { const r = window._g(...a); b5gRoll = window._g; r.tier = 'near'; r.ok = false; r.pass = true; return r; }; });

/* ============ 1. Ships (Ch1, the Third) ============ */
await setup(1, { f: { b7_c1_ph: 2 } });
ok(await ev(() => S.thread === 't'), 'Chapter One: the Third');
fireLine(await fireOk('b7_c1_fire', /five dice/), 'Ch1 the fire above the beach: Ships');
await notNow('b7_c1_fire', 'Ch1');
await open('b7_c1_fire', 'five dice');
ok(await ev(() => mgOpenNow() && /Ships/.test($('#mg h2').textContent) && /transports are burning/.test($('#mgPanel').innerText)), 'the shield opens; the transports burning below');
await shot('1-ships-stake');
await key(' '); await wait(60); ok(await ev(() => MG.state.stake === 1 && MG.state.phase === 'opp'), 'a stake of one silver; the marine throws first');
ok(await until(() => MG.state.phase === 'me', 10000), 'the marine stands, and it is your throw');
await shot('2-ships-throw');
await ev(() => { MG.state.opp = {got:3, dice:[2, 2], throws:3, cargo:4}; MG.state.me = {got:3, dice:[6, 6], throws:1, cargo:12}; }); await key('s'); await wait(60);
let s1 = await ev(() => ({net:MG.state.net, won:MG.state.won, deeds:S.deeds.b7ShipsWon, again:!!$('#shAgain')}));
ok(s1.net === 1 && s1.won === 1 && s1.deeds === 1 && s1.again, '12 in the hold against 4: the stake won, the deed, another game offered');
// another game: sunk after three, and the die argued out of the sand
await btn('shAgain'); await wait(40); await ev(() => document.querySelector('#mgPanel [data-st="2"]').click()); await until(() => MG.state.phase === 'me', 10000);
await ev(() => { MG.state.me = {got:0, dice:[1, 1, 1, 1, 1], throws:2, cargo:null}; }); await rnd(.01); await key(' '); await until(() => MG.state.phase !== 'me' || MG.state.me.throws === 3); await wait(40); await unrnd();
ok(await ev(() => MG.state.phase === 'call' && !!$('#shCall')), 'sunk after three: a die can be argued out of the sand');
await shot('3-ships-call');
let n0 = await ev(() => MG.state.net); await btn('shCall'); await wait(60);
s1 = await ev(() => ({check:MG.state.check, throws:MG.state.me.throws, net:MG.state.net, phase:MG.state.phase, panel:$('#mgPanel').innerText}));
ok(s1.check && s1.check.stat === 'guile' && (s1.check.ok ? s1.throws === 2 && s1.net === n0 && s1.phase === 'me' : s1.check.tier === 'near' ? s1.throws === 2 && s1.net === n0 - 1 && /rum/.test(s1.panel) : true), `the sand: Guile (${tierLine(s1.check)}): made gives one more throw; "yes, but" one more for a silver`);
ok(/Guile/.test(s1.panel), 'the check is shown in the panel');
await until(() => MG.state.phase === 'me' || MG.state.phase === 'over', 4000);
if (await ev(() => MG.state.phase === 'me')) { await ev(() => { MG.state.me = {got:3, dice:[6, 6], throws:2, cargo:12}; MG.state.opp = {got:0, dice:[1, 1, 1, 1, 1], throws:3, cargo:null}; }); await key('s'); await wait(60); }
let f = await fit(); ok(f.ok, 'Ships fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
s1 = await ev(() => ({net:MG.state.net})); await btn('shDone'); await wait(120);
let r = await ev(() => ({node:S.node, silver:S.silver, paidNet:S.f.b7_shipsNet, ships:S.f.b7_ships}));
ok(r.node === 'b7_c1_ships_after' && r.silver === 12 + s1.net && (r.paidNet || 0) === Math.max(0, s1.net) && r.ships && r.ships.done, `back at the fire: ${s1.net} silver settled as the shield is picked up, the after-node`);
ok((await choices()).some(t => /Back to the fire/.test(t)), 'the after-node leads back to the fire');
ok(!(await fireOk('b7_c1_fire', /five dice/)).game, 'played once: Ships is not offered again');
await ev(() => b7ShipsPay({games:1, net:5, pay:5})); ok((await ev(() => S.silver)) === r.silver, 'the pay hook pays no silver of its own: the shield pays once, at the table');
// left early: nothing paid, offered again; a game left under way costs the stake
await setup(1, { f: { b7_c1_ph: 2 } }); await open('b7_c1_fire', 'five dice'); await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.node)) === 'b7_c1_ships_after' && (await ev(() => S.silver)) === 12 && /before the first throw/.test(await text()) && (await fireOk('b7_c1_fire', /five dice/)).game, 'left before a throw: nothing paid, the after-node says so, Ships offered again');
await open('b7_c1_fire', 'five dice'); await ev(() => document.querySelector('#mgPanel [data-st="3"]').click()); await until(() => MG.state.phase === 'me', 10000);
await ev(() => { MG.state.me = {got:0, dice:[1, 1, 1, 1, 1], throws:2, cargo:null}; }); await rnd(.01); await key(' '); await until(() => MG.state.phase === 'call'); await unrnd();
await nearNext(); await btn('shCall'); await wait(60); s1 = await ev(() => ({tier:MG.state.check && MG.state.check.tier, throws:MG.state.me.throws, net:MG.state.net, panel:$('#mgPanel').innerText}));
ok(s1.tier === 'near' && s1.throws === 2 && s1.net === -1 && /silver for my rum/.test(s1.panel), '"yes, but" on the sand: one more throw, and a silver for the marine\'s rum');
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.silver)) === 8 && (await ev(() => S.f.b7_ships && S.f.b7_ships.lost)) === 1, 'leaving a game under way loses its stake (3 silver, and 1 for the rum), and the dice are done');
await setup(1, { f: { b7_c1_ph: 1 } }); ok(!(await fireOk('b7_c1_fire', /five dice/)).game, 'before the landing, no dice');
await ev(() => { S.f.b7_c1_ph = 5; }); ok(!(await fireOk('b7_c1_fire', /five dice/)).game, 'at the lie-up inland, no dice');

/* ============ 2. Pass the Debt (Ch2, the Letherii) ============ */
await setup(2);
ok(await ev(() => S.thread === 'l' && b7In('perrit')), 'Chapter Two: the Letherii, Perrit walking');
fireLine(await fireOk('b7_c2_fire', /debt-tokens/), 'Ch2 the Sixth\'s brazier: Pass the Debt');
await notNow('b7_c2_fire', 'Ch2');
await open('b7_c2_fire', 'debt-tokens');
ok(await ev(() => /Pass the Debt/.test($('#mg h2').textContent) && /company clerk/.test($('#mgPanel').innerText)), 'the clerk\'s bench opens');
await shot('4-debt-start');
await btn('dbGo'); await wait(40); ok(await ev(() => MG.state.phase === 'mine' && MG.state.v === 1), 'the first debt: one, yours to take or pass');
await btn('dbSpin'); await until(() => MG.state.phase !== 'spin' && MG.state.face != null, 6000);
let d = await ev(() => ({check:MG.state.check, face:MG.state.face, used:MG.state.spunUsed, mine:MG.state.mine, spin:!!$('#dbSpin')}));
ok(d.check && d.check.stat === 'guile' && d.used && !d.spin && (d.check.ok ? d.face === true : d.check.tier === 'near' ? d.face === true && d.mine >= 1 : d.face === false), `the dock spun by hand: Guile (${tierLine(d.check)}), once a game`);
await shot('5-debt-spun');
await until(() => MG.state.phase === 'mine' || MG.state.phase === 'between' || MG.state.over, 6000); await wait(800); await until(() => MG.state.phase === 'mine', 8000);
await ev(() => { MG.state.mine = 0; MG.state.his = 20; MG.state.n = 4; }); await key('t'); await until(() => MG.state.over, 4000);
d = await ev(() => ({over:MG.state.over, deeds:S.deeds.b7DebtWon}));
ok(d.over && d.deeds === 1, 'the last debt taken, the lower tally: won');
f = await fit(); ok(f.ok, 'Pass the Debt fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('dbDone'); await wait(100);
d = await ev(() => ({node:S.node, loy:S.loy.perrit, paid:S.f.b7_debtPaid}));
ok(d.node === 'b7_c2_debt_after' && d.loy === 1 && d.paid === 'perrit' && /Perrit/.test(await text()), 'won with nothing on the file: Perrit +1, the after-node');
ok(!(await fireOk('b7_c2_fire', /debt-tokens/)).game, 'played once: the bench is not offered again');
await ev(() => b7DebtPay({won:true, done:true, mine:1, his:9})); ok((await ev(() => S.loy.perrit)) === 1, 'the clerk\'s favour is paid once a book');
await ev(() => { delete S.f.b7_debtPaid; S.b7.file = 2; b7DebtPay({won:true, done:true}); }); d = await ev(() => ({file:b7File(), paid:S.f.b7_debtPaid}));
ok(d.file === 1 && d.paid === 'file', 'won with a file: the clerk leaves a line off the roll (the file −1)');
ok(/left off the bottom/.test(await ev(() => { S.f.b7_debtLast = {done:true, won:true, mine:2, his:9}; return DLG.b7_c2_debt_after().txt; })), 'the after-node tells the line left off');
await setup(2); await open('b7_c2_fire', 'debt-tokens'); await btn('dbGo'); await wait(40); await nearNext(); await key('d'); await until(() => MG.state.phase !== 'spin' && MG.state.face != null, 6000);
d = await ev(() => ({tier:MG.state.check && MG.state.check.tier, face:MG.state.face, mine:MG.state.mine})); ok(d.tier === 'near' && d.face === true && d.mine === 1, '"yes, but" on the spin: face up, and a token on your tally for the cheek');
await until(() => MG.state.phase === 'mine', 8000);
await ev(() => { MG.state.mine = 20; MG.state.his = 0; MG.state.n = 4; }); await key('t'); await until(() => MG.state.over, 4000);
d = await ev(() => ({over:MG.state.over, deeds:S.deeds.b7DebtLost})); await btn('dbDone'); await wait(80);
const dl = {salve:await ev(() => S.inv.salve), loy:await ev(() => S.loy.perrit), txt:await text()};
ok(d.over && d.deeds === 1 && dl.salve === 2 && dl.loy === 0 && /\d+ to his \d+/.test(dl.txt), 'lost: the debt found you, nothing paid' + (d.over && d.deeds === 1 && dl.salve === 2 && dl.loy === 0 ? '' : ' ' + JSON.stringify([d, dl])));
await ev(() => { delete S.f.b7_debtPaid; S.b7.file = 0; S.squad = S.squad.filter(k => k !== 'perrit'); b7DebtPay({won:true, done:true}); }); ok((await ev(() => S.inv.salve)) === 3, 'won with no file and no Perrit: a salve');
await setup(2, { f: { b7_c2_ph: 3 } }); ok(!(await fireOk('b7_c2_fire', /debt-tokens/)).game, 'out in the streets there is no bench');
await ev(() => { S.f.b7_c2_ph = 5; }); ok((await fireOk('b7_c2_fire', /debt-tokens/)).game, 'home at the brazier, the bench again');

/* ============ 3. The Fuse-Count (Ch3, the Third) ============ */
await setup(3);
ok(await ev(() => S.thread === 't'), 'Chapter Three: the Third');
fireLine(await fireOk('b7_c3_fire', /coil of fuse/), 'Ch3 the farmhouse floor: the Fuse-Count');
await notNow('b7_c3_fire', 'Ch3');
await open('b7_c3_fire', 'coil of fuse');
ok(await ev(() => /Fuse-Count/.test($('#mg h2').textContent) && /helmet/.test($('#mgPanel').innerText)), 'the hearth opens; a fuse and a helmet');
await shot('6-fuse-ready');
await btn('fcNotch'); await wait(60);
let c = await ev(() => ({check:MG.state.check, notch:MG.state.notch, sharp:MG.state.sharp, used:MG.state.notchUsed, btn:!!$('#fcNotch')}));
ok(c.check && c.check.stat === 'wits' && c.used && !c.btn && (c.check.ok ? c.notch && !c.sharp : c.check.tier === 'near' ? c.notch && c.sharp : !c.notch), `the fuse notched at the half: Wits (${tierLine(c.check)}); "yes, but" lets the sapper count by it`);
for (let i = 0; i < 2; i++) { await btn('fcLight'); await wait(40);
  if (!i) { const notched = await ev(() => MG.state.notch); if (notched) { await ev(() => { MG.state.t0 = performance.now() - MG.state.burn * .6; }); await wait(120); ok(await ev(() => MG.state.spat), 'the notch spits as the burn passes the half'); } await shot('7-fuse-lit'); }
  await ev(() => { MG.state.t0 = performance.now() - MG.state.burn; }); await btn('fcNow'); await until(() => MG.state.phase === 'ready' || MG.state.over, 6000); }
c = await ev(() => ({over:MG.state.over, mine:MG.state.mine, deeds:S.deeds.b7FuseWon})); ok(c.over && c.mine === 2 && c.deeds === 1, 'called on the burn both times: two rounds, the match');
f = await fit(); ok(f.ok, 'the Fuse-Count fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('fcDone'); await wait(100);
c = await ev(() => ({node:S.node, burner:S.inv.burner, paid:S.f.b7_fusePaid}));
ok(c.node === 'b7_c3_fuse_after' && c.burner === 2 && c.paid === 1 && /burner/.test(await text()), 'won: the sapper\'s burner, the after-node');
ok(!(await fireOk('b7_c3_fire', /coil of fuse/)).game, 'played once: the hearth is not offered again');
await ev(() => b7FusePay({won:true, done:true})); ok((await ev(() => S.inv.burner)) === 2, 'the burner is paid once a book');
await setup(3); await open('b7_c3_fire', 'coil of fuse'); await nearNext(); await key('n'); await wait(40);
c = await ev(() => ({tier:MG.state.check && MG.state.check.tier, notch:MG.state.notch, sharp:MG.state.sharp})); ok(c.tier === 'near' && c.notch && c.sharp, '"yes, but" on the notch: it spits, and the sapper counts by it too');
for (let i = 0; i < 2; i++) { await key(' '); await wait(40); await ev(() => { MG.state.t0 = performance.now(); }); await key(' '); await until(() => MG.state.phase === 'ready' || MG.state.over, 6000); }
c = await ev(() => ({over:MG.state.over, his:MG.state.his, deeds:S.deeds.b7FuseLost})); await btn('fcDone'); await wait(80);
const cl = {burner:await ev(() => S.inv.burner), txt:await text()};
ok(c.over && c.his === 2 && c.deeds === 1 && cl.burner === 1 && /sapper.s count/.test(cl.txt), 'called at once both times: the sapper\'s match, no burner' + (c.over && c.his === 2 && c.deeds === 1 && cl.burner === 1 ? '' : ' ' + JSON.stringify([c, cl])));
await setup(3, { f: { b7_c3_ph: 2 } }); ok(!(await fireOk('b7_c3_fire', /coil of fuse/)).game, 'on the march there is no hearth');
await ev(() => { S.f.b7_c3_ph = 4; }); ok((await fireOk('b7_c3_fire', /coil of fuse/)).game, 'in the factor\'s barn by day, the fuse again');

/* ============ 4. The Horse-Trade (Ch4, the Letherii) ============ */
await setup(4, { join: ['sorvan'] });
ok(await ev(() => S.thread === 'l' && b7In('sorvan')), 'Chapter Four: the Letherii, Sorvan walking');
fireLine(await fireOk('b7_c4_fire', /horse-coper/), 'Ch4 the Sixth\'s fire: the Horse-Trade');
await notNow('b7_c4_fire', 'Ch4');
await open('b7_c4_fire', 'horse-coper');
ok(await ev(() => /Horse-Trade/.test($('#mg h2').textContent) && /Bluerose/.test($('#mgPanel').innerText) && /docks/.test($('#mgPanel').innerText)), 'the horse lines open; the purse counted in docks');
await shot('8-horse-intro');
await btn('htGo'); await wait(40); ok(await ev(() => MG.state.phase === 'haggle' && MG.state.i === 0), 'the first horse led out');
await shot('9-horse-haggle');
await btn('htLook'); await wait(60);
let h = await ev(() => ({check:MG.state.check, known:MG.state.known, pat:MG.state.pat, look:!!$('#htLook'), panel:$('#mgPanel').innerText}));
ok(h.check && h.check.stat === 'wits' && !h.look && (h.check.ok ? h.known && h.pat === 3 && /not a dock under/.test(h.panel) : h.check.tier === 'near' ? h.known && h.pat === 2 : !h.known), `a look in its mouth: Wits (${tierLine(h.check)}); "yes, but" costs patience`);
await ev(() => { MG.state.ask = 20; MG.state.floor = 19; MG.state.pat = 3; }); await key('4'); await until(() => !MG.state.busy, 3000);
h = await ev(() => ({pat:MG.state.pat, ask:MG.state.ask, bought:MG.state.bought.length})); ok(h.pat === 2 && h.ask === 19 && !h.bought, 'an offer under his floor: he comes down, and loses a little patience');
for (let i = 0; i < 3; i++) { await until(i => MG.state.phase === 'haggle' && MG.state.i === i && !MG.state.busy, 6000, i); await ev(() => { MG.state.ask = 15; MG.state.floor = 10; MG.state.pat = 3; }); await key('1'); await wait(40); }
await until(() => MG.state.over, 4000);
h = await ev(() => ({over:MG.state.over, spent:MG.state.spent, deeds:S.deeds.b7HorseWon})); ok(h.over && h.spent === 39 && h.deeds === 1, 'three horses at 13 docks each: within the purse');
f = await fit(); ok(f.ok, 'the Horse-Trade fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('htDone'); await wait(100);
h = await ev(() => ({node:S.node, loy:S.loy.sorvan, paid:S.f.b7_horsePaid}));
ok(h.node === 'b7_c4_horse_after' && h.loy === 1 && h.paid === 'sorvan' && /Sorvan walks the three/.test(await text()), 'won: Sorvan +1 loyalty, the after-node');
ok(!(await fireOk('b7_c4_fire', /horse-coper/)).game, 'played once: the coper is not offered again');
await ev(() => b7HorsePay({won:true, done:true})); ok((await ev(() => S.loy.sorvan)) === 1, 'Sorvan\'s regard is paid once a book');
await setup(4); await open('b7_c4_fire', 'horse-coper'); await key(' '); await wait(40); await nearNext(); await key('l'); await wait(40);
h = await ev(() => ({tier:MG.state.check && MG.state.check.tier, known:MG.state.known, pat:MG.state.pat})); ok(h.tier === 'near' && h.known && h.pat === 2, '"yes, but" on the look: his floor known, and a little less patience');
for (let i = 0; i < 3; i++) { await until(i => MG.state.phase === 'haggle' && MG.state.i === i && !MG.state.busy, 6000, i); await ev(() => { MG.state.ask = 30; MG.state.floor = 30; }); await key(' '); await wait(40); }
await until(() => MG.state.over, 4000);
h = await ev(() => ({over:MG.state.over, spent:MG.state.spent, deeds:S.deeds.b7HorseLost})); await btn('htDone'); await wait(80);
ok(h.over && h.spent === 90 && h.deeds === 1 && (await ev(() => S.inv.salve)) === 2 && /90 docks|90d/.test(await text() + ' ' + await ev(() => b7Coin(90))), 'paid his price three times: over the purse, nothing paid');
await ev(() => { delete S.f.b7_horsePaid; b7HorsePay({won:true, done:true}); }); ok((await ev(() => S.inv.salve)) === 3, 'won without Sorvan walking: a pot of liniment (a salve)');
await setup(4, { f: { b7_c4_ph: 2 } }); ok(!(await fireOk('b7_c4_fire', /horse-coper/)).game, 'at the muster gate there is no trading');
await ev(() => { S.f.b7_c4_ph = 4; }); ok(!(await fireOk('b7_c4_fire', /horse-coper/)).game, 'at dawn the coper is gone');
await ev(() => { S.f.b7_c4_ph = 3; }); ok((await fireOk('b7_c4_fire', /horse-coper/)).game, 'the night at the horse lines, the coper again');

/* ============ 5. The Rat Catchers' Wager (Ch7, the Third) ============ */
await setup(7, { f: { b7_c7_ph: 3 }, join: ['wenna'] });
ok(await ev(() => S.thread === 't'), 'Chapter Seven: the Third in Letheras');
fireLine(await fireOk('b7_c7_fire', /Rat Catcher/), 'Ch7 the corner brazier: the Rat Catchers\' Wager');
await notNow('b7_c7_fire', 'Ch7');
await open('b7_c7_fire', 'Rat Catcher');
ok(await ev(() => /Rat Catchers/.test($('#mg h2').textContent) && /Not who/.test($('#mgPanel').innerText)), 'the slate opens: not who, but what they shout');
await shot('10-wager-slate');
const NAMES = /Tehol|the Only|Bugg|Mael|Karos/;
let pText = await panel();
await btn('wgClimb'); await wait(60);
let w = await ev(() => ({check:MG.state.check, plain:MG.state.plain, king:MG.state.odds.King, climb:!!$('#wgClimb')}));
ok(w.check && w.check.stat === 'wits' && !w.climb && (w.check.ok ? w.plain && w.king === 2 : w.check.tier === 'near' ? w.plain && w.king === 1 : !w.plain), `up on the wall: Wits (${tierLine(w.check)}); "yes, but" shortens every word`);
const plain = w.plain;
await btn('wgListen'); await until(() => MG.state.phase === 'bet', 6000); pText += await panel();
w = await ev(() => ({frag:MG.state.frag[0], word:MG.state.word, i:B7G_WORDS.findIndex(([x]) => x === MG.state.word), full:B7G_FRAG[MG.state.word][2]}));
ok(['Saviour', 'Emperor'].includes(w.word) && (!plain || w.frag === w.full), `the crowd's word is one the crowd shouts (${w.word}); from the wall the gust comes plain (${w.frag})`);
await shot('11-wager-gust');
const o0 = await ev(i => MG.state.odds[B7G_WORDS[i][0]], w.i); await key(String(w.i + 1)); await wait(40);
ok(await ev(() => MG.state.marks.length === 1 && MG.state.phase === 'listen'), 'a marker chalked at the odds of the moment');
for (let i = 0; i < 2; i++) { await btn('wgListen'); await until(() => MG.state.phase === 'bet', 6000); pText += await panel(); await btn('wgHold'); await wait(40); }
ok(await ev(() => MG.state.phase === 'word'), 'three gusts: the slate closes');
await btn('wgWord'); await until(() => MG.state.over, 6000); pText += await panel();
w = await ev(() => ({net:MG.state.net, heard:MG.state.heard, deeds:S.deeds.b7WagerWon, word:MG.state.word}));
ok(w.net === o0 && w.heard === w.word && w.deeds === 1, `the crowd's word, as the Third hears it: ${w.heard}; the marker pays ${o0} to 1`);
ok(!NAMES.test(pText), 'the slate and the talk never name who the crowd is shouting for');
await shot('12-wager-word');
f = await fit(); ok(f.ok, 'the Wager fits a phone' + (f.ok ? '' : ': ' + f.bad.join(' ')));
await btn('wgDone'); await wait(100);
w = await ev(() => ({node:S.node, silver:S.silver, wager:S.f.b7_wager}));
ok(w.node === 'b7_c7_wager_after' && w.silver === 12 + Math.min(8, o0) && w.wager && w.wager.done && /heavier, on the crowd.s word/.test(await text()), 'won: paid on the crowd\'s word, the after-node');
ok(!(await fireOk('b7_c7_fire', /Rat Catcher/)).game, 'played once: the slate is not offered again');
await setup(7, { f: { b7_c7_ph: 3 } }); await open('b7_c7_fire', 'Rat Catcher'); await nearNext(); await key('w'); await wait(40);
w = await ev(() => ({tier:MG.state.check && MG.state.check.tier, plain:MG.state.plain, odds:Object.assign({}, MG.state.odds)})); ok(w.tier === 'near' && w.plain && w.odds.King === 1 && w.odds['The Errant'] === 7, '"yes, but" on the wall: heard plain, and every word one shorter');
await key(' '); await until(() => MG.state.phase === 'bet', 6000); await key('1'); await wait(40); // on King, which the crowd does not shout
await ev(() => MG.leave()); await wait(80);
ok((await ev(() => S.silver)) === 12 && (await fireOk('b7_c7_fire', /Rat Catcher/)).game, 'left before the word: the stake comes back, the slate offered again');
await open('b7_c7_fire', 'Rat Catcher'); await key(' '); await until(() => MG.state.phase === 'bet', 6000); await key('1'); await wait(40);
for (let i = 0; i < 2; i++) { await key(' '); await until(() => MG.state.phase === 'bet', 6000); await key(' '); await wait(40); }
await key(' '); await until(() => MG.state.over, 6000);
w = await ev(() => ({net:MG.state.net, deeds:S.deeds.b7WagerLost})); await btn('wgDone'); await wait(80);
ok(w.net === -1 && w.deeds === 1 && (await ev(() => S.silver)) === 11 && /lighter/.test(await text()), 'a marker on King: the crowd said otherwise, a silver lost');
await ev(() => { S.f.b7_c7_ph = 4; delete S.f.b7_wager; }); ok(!(await fireOk('b7_c7_fire', /Rat Catcher/)).game, 'three weeks on, no slate');
await ev(() => { S.f.b7_c7_ph = 3; S.f.b7_c7_view = 1; }); ok(!(await fireOk('b7_c7_fire', /Rat Catcher/)).game, 'once the surrender is seen, the book is closed');

/* the Deeds page, the journal, the after-nodes */
const dd = await ev(() => { S.deeds = Object.assign(S.deeds || {}, {b7ShipsWon:2, b7DebtWon:1, b7FuseLost:1, b7HorseWon:1, b7WagerWon:1});
  const h = b7DeedsExtra([{s:S}]); return {fires:/At the fires/.test(h), rising:/The Rising/.test(h), rows:['Ships', 'Pass the Debt', 'Fuse-Count', 'Horse-Trade', 'Rat Catchers'].every(k => h.includes(k)), leak:/undefined|NaN/.test(h)}; });
ok(dd.fires && dd.rising && dd.rows && !dd.leak, 'the Deeds page lists Book Seven\'s fires under the Rising');
const jn = await ev(() => { S.f.b7_shipsLast = {games:1, pay:2}; S.f.b7_debtLast = {done:true, won:true}; S.f.b7_fuseLast = {done:true, won:false}; S.f.b7_horseLast = {done:true, won:true}; S.f.b7_wagerLast = {done:true, won:true, pay:3, heard:'Emperor'};
  return [B7CH1.journal(), B7CH2.journal(), B7CH3.journal(), B7CH4.journal(), B7CH7.journal()].map(j => j[0]); });
ok(/Ships/.test(jn[0]) && /Pass the Debt/.test(jn[1]) && /Fuse-Count/.test(jn[2]) && /horse/.test(jn[3]) && /crowd's word/.test(jn[4]), 'each game leaves a journal line');
const leak = await ev(() => { const out = []; const cases = {b7_c1_ships_after:[{}, {games:1, pay:3}, {games:2, pay:-2}, {games:1, pay:0}], b7_c2_debt_after:[{}, {done:true, won:true, mine:2, his:9}, {done:true, won:false, mine:9, his:2}], b7_c3_fuse_after:[{}, {done:true, won:true, mine:2}, {done:true, won:false, mine:1}], b7_c4_horse_after:[{}, {done:true, won:true, spent:40}, {done:true, won:false, spent:80}], b7_c7_wager_after:[{}, {done:true, won:true, pay:4, heard:'Saviour'}, {done:true, won:false, pay:-2, heard:'Emperor'}]};
  const last = {b7_c1_ships_after:'b7_shipsLast', b7_c2_debt_after:'b7_debtLast', b7_c3_fuse_after:'b7_fuseLast', b7_c4_horse_after:'b7_horseLast', b7_c7_wager_after:'b7_wagerLast'};
  const BAN = /Laseen|Kellanved|Dancer|Ammanas|Surly|Topper|the Talon|the Eel|Burn's Sleep|Kettle|Tehol|the Only|\b11\d\d\b/;
  Object.entries(cases).forEach(([k, rs]) => rs.forEach(r => { S.f[last[k]] = r; const n = DLG[k](), t = n.txt; if (!t.trim() || /undefined|NaN|\[object|\$\{/.test(t)) out.push(k + ' leaks'); if (BAN.test(t)) out.push(k + ' a never-use name'); if (/!/.test(t.replace(/"[^"]*"/g, ''))) out.push(k + ' an exclamation mark in narration'); if (n.scene && !SCENES[n.scene]) out.push(k + ' no scene ' + n.scene); if (!n.ch.length || n.ch[0].go !== k.replace(/_[a-z]+_after$/, '_fire')) out.push(k + ' no way back'); })); return out; });
ok(!leak.length, 'the after-nodes read cleanly, every way' + (leak.length ? ': ' + leak.join(' ') : ''));
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
