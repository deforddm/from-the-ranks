// v5.3 (Book Two): the squad's kit, water as the money, and the five games at the fires.
// The new items are there (a weapon or armour in every chapter, specials, something in Chapter 7); every trader and giver stands on open,
// reachable ground; buying costs skins and puts the piece on whoever suits it; heavy armour cooks at noon and a desert robe stops it; the
// Semk fetish, the Silanda's plank, the cold iron knife and the Trygalle skin each do their one thing; the HUD and the pack count water;
// and each game opens from its own node, can be won by playing it, and pays in water (or in the column), once.
// Usage: node tools/b2kit_test.mjs   (build first; exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const wait = ms => page.waitForTimeout(ms);
const key = k => ev(k => window.dispatchEvent(new KeyboardEvent('keydown', {key:k, bubbles:true})), k);
const fresh = (o = {}) => ev(o => { if (!$('#mg').hidden) mgClose({}); setBook('dg'); S = newStateDG('Hask'); S.chapter = o.ch || 2; S.lvl = 1; S.xp = 0; (o.add || []).forEach(k => S.squad.push(k)); migrate(S);
  S.chain = {water:o.water ?? 10, column:20}; S.inv = {sharper:1, burner:1, cusser:1, salve:2, smoker:1}; save(); }, o);

// ---- the kit ----
await fresh();
const kit = await ev(() => { const by = {}; for (const [n, C] of Object.entries(BOOKSNAP.dg.ch)) by[n] = Object.entries(C.gear || {}).map(([k, it]) => it.slot);
  const all = Object.values(by).flat(); return {by, weapons:all.filter(s => s === 'weapon').length, armour:all.filter(s => s === 'armour').length, total:all.length,
    heavy:Object.values(ITEMS).filter(i => i.heavy).length, ch7:(by[7] || []).length, every:[1, 2, 3, 4, 5, 6, 7].every(n => (by[n] || []).some(s => s !== 'trinket') || n === 6 && (by[n] || []).length)}; });
ok(kit.weapons >= 8 && kit.armour >= 6 && kit.total >= 35, `Book Two now has ${kit.total} items: ${kit.weapons} weapons, ${kit.armour} armour`);
ok(kit.every && kit.ch7 >= 3 && kit.heavy >= 3, `a weapon or armour in every chapter, ${kit.ch7} things in Chapter 7, ${kit.heavy} heavy pieces`);

// ---- where they are: open, reachable ground, one figure to a tile ----
const tiles = await ev(() => { const errs = [], want = ['qm1', 'horseboy', 'follower2', 'tinker3', 'servant4', 'silanda4', 'icesapper', 'trader5', 'ktrader6', 'stores7', 'feather7', 'tavi', 'herd3', 'jacks6'];
  for (const A of Object.values(AREAS)) { const walk = A.walk || '.', trig = A.triggers || {}, ok = (x, y) => { const c = (A.map[y] || '')[x]; return c && walk.includes(c) && !trig[c]; };
    const mine = A.npcs.filter(n => want.includes(n.id)); if (!mine.length) continue;
    const seen = new Set([A.start.x + ',' + A.start.y]), q = [[A.start.x, A.start.y]]; while (q.length) { const [x, y] = q.shift(); [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx, dy]) => { const k = (x+dx) + ',' + (y+dy); if (!seen.has(k) && ok(x+dx, y+dy)) { seen.add(k); q.push([x+dx, y+dy]); } }); }
    mine.forEach(n => { if (!ok(n.x, n.y)) errs.push(`${A.id}/${n.id} not on open ground`); if (![[1,0],[-1,0],[0,1],[0,-1]].some(([dx, dy]) => seen.has((n.x+dx) + ',' + (n.y+dy)))) errs.push(`${A.id}/${n.id} cannot be walked to`);
      A.npcs.forEach(m => { if (m !== n && m.x === n.x && m.y === n.y) errs.push(`${A.id}/${n.id} on ${m.id}`); }); want.splice(want.indexOf(n.id), 1); }); }
  return {errs, missing:want}; });
ok(!tiles.errs.length && !tiles.missing.length, `fourteen traders, givers and games, each on open ground you can walk to${tiles.errs.concat(tiles.missing).length ? ': ' + tiles.errs.concat(tiles.missing).join('; ') : ''}`);

// ---- water as the money ----
await fresh({ch:5, water:9});
const buy = await ev(() => { const o = {}; startExplore('b2_karpcamp'); talk('b2_trader5'); o.txt = $('#sheet').innerText; o.hud = getComputedStyle($('#silver')).display;
  const c = curCh.find(c => /crossbow/.test(c.t)); choose(c); o.water = S.chain.water; o.has = S.kit.includes('b2_tcrossbow'); o.who = Object.keys(S.gear).find(w => S.gear[w].weapon === 'b2_tcrossbow');
  o.gone = !DLG.b2_trader5().ch.some(c => /crossbow/.test(c.t)); S.chain.water = 1; o.poor = !DLG.b2_trader5().ch.filter(c => !c.req || c.req()).some(c => /Buy/.test(c.t));
  closeSheet(); openModal('pack'); o.pack = /Water/.test($('#modal').innerText) && !/Silver/.test($('#modal').innerText.split('\n').slice(0, 4).join(' ')); $('#modal').hidden = true; return o; });
ok(/four skins: \+1 to hit/.test(buy.txt) && buy.hud === 'none', 'the trader prices in skins and says what each piece does; the HUD shows no silver in Book Two');
ok(buy.water === 5 && buy.has && buy.who === 'tangle', `buying the crossbow costs four skins and Tangle takes it (${buy.who})`);
ok(buy.gone && buy.poor && buy.pack, 'it is gone from the box; with one skin left nothing can be bought; the pack counts water');
await fresh({ch:1});
const qm = await ev(() => { talk('b2_qm1'); choose(curCh[0]); choose(curCh.find(c => /mail/.test(c.t))); return {k:S.kit.includes('b2_auxtulwar') && S.kit.includes('b2_auxmail'), water:S.chain.water}; });
ok(qm.k && qm.water === 10, 'Hissar\'s quartermaster gives the auxiliary kit away: no water asked');

// ---- what the special pieces do ----
await fresh({ch:5, add:['warlock']});
const spec = await ev(() => { const o = {};
  ['b2_officerscale', 'b2_robe', 'b2_fetish', 'b2_plank', 'b2_coldknife', 'b2_tskin'].forEach(k => S.kit.push(k)); S.gear.sathi = {armour:'b2_officerscale'}; o.heavy = B2_HEAVY('sathi'); S.gear.sathi.trinket = 'b2_robe'; o.robe = !B2_HEAVY('sathi');
  S.gear.marrow = {trinket:'b2_fetish'}; const m = {id:'marrow', name:'Marrow'}; B = {fx:[], units:[], used:{}, log:[]}; o.f1 = b2Steady(m); o.f2 = b2Steady(m); S.chapter = 6; o.f3 = b2Steady(m); B = null;
  S.gear.tangle = {trinket:'b2_tskin'}; S.chapter = 5; const w0 = S.chain.water; dgRest(); o.free = S.chain.water === w0; dgRest(); o.paid = S.chain.water === w0 - 1;
  S.gear.haddat = {trinket:'b2_plank'}; S.gear.sgt = {weapon:'b2_coldknife'}; S.gear.sathi = {}; save(); return o; });
ok(spec.heavy && spec.robe, 'an officer\'s scale is heavy; a desert robe over it keeps the noon off');
ok(spec.f1 && !spec.f2 && spec.f3, 'the Semk fetish saves one spoiled spell a chapter');
ok(spec.free && spec.paid, 'the Trygalle skin: one free rest a chapter, then rests cost water again');
const fight = await ev(() => { startBattle('b2_spring', {}); const h = B.units.find(u => u.id === 'haddat'), s = B.units.find(u => u.id === 'sgt'), f = foes()[0];
  f.atk = 50; f.x = h.x; f.y = h.y - 1; let hp0 = f.hp; for (let i = 0; i < 12; i++) { hp0 = f.hp; attack(f, h); if (hp0 - f.hp === 3 || f.hp <= 0) break; } window._k = {hp0, f}; // a natural 1 misses: swing until the plank has bitten once (v6.13.0) s.atk = 50; const f2 = foes()[1]; f2.x = s.x; f2.y = s.y - 1; attack(s, f2); window._k.f2 = f2; return true; });
await wait(700);
const fight2 = await ev(() => { const {hp0, f, f2} = window._k, o = {bit:hp0 - f.hp === 3 || f.hp <= 0, cold:f2.hp <= 0 || !!f2.slowTurn}; const h = B.units.find(u => u.id === 'haddat'); const hp1 = f.hp; attack(f, h); window._k.hp1 = hp1; return o; });
await wait(700);
const fight3 = await ev(() => { const o = {once:window._k.f.hp === window._k.hp1}; B = null; return o; });
ok(fight2.bit && fight3.once, 'the Silanda\'s plank bites back for 3, once a fight');
ok(fight2.cold, 'a blow from the cold iron knife leaves the enemy slowed');

// ---- the games ----
// the Water-Seller's Measure: solve the first by the shortest pours (8/5/3 → 4)
await fresh({ch:2, water:5});
await ev(() => { talk('b2_tavi'); choose(curCh[0]); });
for (const [a, b] of [[1, 2], [2, 3], [3, 1], [2, 3], [1, 2], [2, 3]]) { await key(String(a)); await key(String(b)); await wait(620); }
const ms = await ev(() => ({won:MG.state.won, moves:MG.state.moves, water:S.chain.water, done:(S.f.b2_measures || []).join(), txt:$('#mgPanel').innerText}));
ok(ms.won && ms.moves === 6 && ms.water === 6 && ms.done === '0', `the Measure: four in six pours, one skin paid (water ${ms.water})`);
await ev(() => { $('#msNext').click(); }); const ms2 = await ev(() => MG.state.i);
ok(ms2 === 1, 'and the next measure is harder');
await ev(() => mgClose({}));

// Ask the Ground: answer each saying back
await fresh({ch:3, water:4});
await ev(() => { talk('b2_nil3'); choose(curCh.find(c => /hands on the ground/.test(c.t))); $('#grGo').click(); });
for (let r = 0; r < 5; r++) { for (let i = 0; i < 80; i++) { if (await ev(() => MG.state.phase === 'you' || MG.state.over)) break; await wait(150); }
  const seq = await ev(() => MG.state.seq.slice()); for (const k of seq) await key(String(k + 1)); await wait(100); }
const gr = await ev(() => ({won:MG.state.won, water:S.chain.water, f:S.f.b2_ground, txt:$('#mgPanel').innerText}));
ok(gr.won && gr.f === 1 && gr.water === 6, `Ask the Ground: five sayings answered, and the ground shows water (+2, water ${gr.water})`);
await ev(() => { $('#grDone').click(); }); const gr2 = await ev(() => ({node:S.node, ask:DLG.b2_nil3().ch.map(c => c.t).join('|')})); ok(gr2.node === 'b2_ground_after' && !/hands on the ground/.test(gr2.ask), `it pays once: Nil does not ask again (${gr2.node}; ${gr2.ask})`);

// Hackle's herd: a bot steers the dog behind the hindmost straggler, toward the column
await fresh({ch:3});
await ev(() => { talk('b2_herd3'); choose(curCh[0]); $('#hdGo').click(); const g = MG.state;
  window._bot = setInterval(() => { const out = g.strays.filter(x => !x.in); if (!out.length || g.over) return; const s = out.sort((a, b) => a.x - b.x)[0], d = g.dog, want = {x:s.x - .07, y:s.y}; g.to = Math.hypot(d.x - want.x, d.y - want.y) < .05 ? {x:Math.min(.98, s.x + .05), y:s.y} : d.x > s.x - .02 ? {x:s.x - .12, y:s.y + (d.y < s.y ? -.15 : .15)} : want; }, 60); });
for (let i = 0; i < 140; i++) { if (await ev(() => MG.state.over)) break; await wait(500); }
const hd = await ev(() => { clearInterval(window._bot); return {n:MG.state.inN, col:S.chain.column, f:S.f.b2_herd, txt:$('#mgPanel').innerText}; });
ok(hd.n >= 5 && hd.col === 20 + hd.n && hd.f === hd.n, `Hackle's herd: ${hd.n} of 7 brought in before the dust, and they walk in the stretch (column ${hd.col})`);
await ev(() => mgClose({}));

// the Trygalle haggle: talk her down a skin and pay; push her past her patience and the price goes up
await fresh({ch:5, water:10});
await ev(() => { talk('b2_trader5'); choose(curCh.find(c => /Haggle for the trygalle crossbow/.test(c.t))); });
const hg = await ev(() => { const g = MG.state; Math.random = (r => () => 0.01)(Math.random); $('#hgNudge').click(); const p1 = g.price; $('#hgPay').click(); return {p1, has:S.kit.includes('b2_tcrossbow'), water:S.chain.water}; });
ok(hg.p1 === 3 && hg.has && hg.water === 7, `haggled down to ${hg.p1} skins and paid (water ${hg.water})`);
await ev(() => { $('#hgDone').click(); });
const hg2 = await ev(() => { choose(curCh.find(c => /Haggle for the trygalle leathers/.test(c.t))); const g = MG.state; g.pat = 0; $('#hgLow').click(); return {p:g.price, over:g.over, rec:S.f.b2_price['b2_trader5:b2_tleathers']}; });
await ev(() => { $('#mgLeave').click(); });
const hg3 = await ev(() => ({again:!DLG.b2_trader5().ch.some(c => /Haggle for the trygalle leathers/.test(c.t)), price:DLG.b2_trader5().ch.find(c => /leathers/.test(c.t)).tag}));
ok(hg2.p === 4 && hg2.over && hg2.rec === 4 && hg3.again && hg3.price === '4 water', 'pushed past her patience she shuts the box: the leathers cost a skin more, and no second haggle');

// Khundryl knucklebones: toss, scoop high, catch low; four catches take the stake
await fresh({ch:6, water:6});
await ev(() => { talk('b2_jacks6'); choose(curCh[0]); document.querySelector('[data-st="2"]').click(); });
const F = await ev(() => (REDUCE() ? 1500 : 1300) * Math.max(.8, SET.speed));
for (let r = 0; r < 4; r++) { for (let i = 0; i < 60; i++) { if (await ev(() => MG.state.who === 'me' || MG.state.over)) break; await wait(200); }
  if (await ev(() => MG.state.over)) break;
  await ev(() => $('#jkAct').click()); await wait(F * .3); await ev(() => $('#jkAct').click()); await wait(F * .58); await ev(() => $('#jkAct').click()); await wait(150); }
const jk = await ev(() => ({me:MG.state.me, opp:MG.state.opp, over:MG.state.over, water:S.chain.water, net:S.f.b2_jacksNet}));
ok(jk.me === 4 || (jk.over && jk.opp === 4), `knucklebones: timed right, every catch lands (${jk.me} to ${jk.opp})`);
ok(!jk.over || (jk.me === 4 ? jk.water === 8 && jk.net === 2 : jk.water === 4 && jk.net === -2), `the stake moves in skins (water ${jk.water})`);
await ev(() => mgClose({}));

// ---- the deeds page knows the fires ----
const deeds = await ev(() => { openModal('deeds'); const t = $('#modal').innerText; $('#modal').hidden = true; return /At the fires/.test(t) && /Water-Seller/.test(t) && /Khundryl knucklebones/.test(t); });
ok(deeds, 'the Deeds page has a section for the games at the fires');

await br.close(); srv.kill();
if (errors.length) { console.log('page errors:', errors); process.exit(1); }
console.log(fail ? 'b2kit: FAIL' : 'b2kit: all ok'); process.exit(fail);
