// v5.2 (Book Two): Keth, the Foolish Dog's warlock, the second recruit. Met on the west bank with Ramin; one recruit at a time, and
// either one asked back at a fire on each chapter's map (the other goes back to their people, kit remembered); the swap closes at the
// Geleen's partings and in sight of Aren. His spirit-craft (the Land's Teeth, the Grandmother's Hand, the two talents) works and costs no
// strain; he chooses at the split and can fall at the Barrow; he goes to the Wickan children in Aren; the end of the book has his page.
// And Hackle's voice: bark, yelp, whine, a growl at an ambush, and the sounds the story says he makes (never a "does not growl").
// Usage: node tools/keth_test.mjs   (build first; exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { fast: true });
const warns = []; page.on('console', m => { if (m.type() === 'warning' && /AUDIO/.test(m.text())) warns.push(m.text()); });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const fresh = (o = {}) => ev(o => { setBook('dg'); S = newStateDG('Hask'); S.chapter = o.ch || 2; S.lvl = o.lvl || 1; S.xp = LEVELS[S.lvl - 1]; S.chain = {water:6, column:20};
  Object.assign(S.f, o.f || {}); (o.add || []).forEach(k => S.squad.push(k)); migrate(S); S.inv = {sharper:1, burner:1, cusser:1, salve:2, smoker:1}; save(); }, o);
const bad = /\bundefined\b|\bNaN\b|\[object |\$\{/;

// ---- who he is ----
await fresh();
const who = await ev(() => { const c = document.createElement('canvas'); c.width = 120; c.height = 160; const x = c.getContext('2d'); let por = true, fig = true;
  try { x.save(); x.translate(60, 140); POR.warlock(x); x.restore(); } catch (e) { por = e.message; }
  try { drawFigure(x, 'warlock', 60, 120, 2, 1000, {}); } catch (e) { fig = e.message; }
  const t = TPL.warlock; return {name:t.name, ab:t.ab.join(','), por, fig, quest:t.quest, picks:PICKS[3].warlock.map(p => p[0]).join(','), patron:!!PATRONS.warlock, he:B2FIN.he('warlock'), fin:B2CH7.finale.ids().includes('warlock'), split:B2_SPLIT.includes('warlock')}; });
ok(who.name === 'Keth' && who.ab === 'b2_teeth,b2_hand,salve', `Keth: ${who.ab}`);
ok(who.por === true && who.fig === true, `his portrait and his figure draw (${who.por}, ${who.fig})`);
ok(who.picks === 'crowcall,deepground' && who.patron && who.he && !bad.test(who.quest), 'his talents, his god, his pronoun, his quest');
ok(who.fin && who.split, 'he is in the split and on the last page');

// ---- the west bank: met with Ramin; one at a time ----
await fresh({f:{b2_blown:1}});
const meet = await ev(() => { const A = AREAS.b2_westbank, k = A.npcs.find(n => n.id === 'keth2'), r = A.npcs.find(n => n.id === 'ramin2'), out = {};
  out.shown = k.show() && k.node() === 'b2_keth' && k.name === 'A young Wickan';
  out.ch = DLG.b2_keth().ch.map(c => c.go).join(',');
  talk('b2_keth_yes'); out.in = b2In('warlock') && b2Ally() === 'warlock' && S.f.b2_kethDone === 1; out.name = k.name;
  const rc = DLG.b2_ramin().ch.map(c => c.t); out.rSwap = rc.some(t => /Keth goes back/.test(t)) && rc.some(t => /Not now/.test(t));
  const txt = DLG.b2_ramin_yes().txt; out.rTxt = /Keth gets up/.test(txt);
  talk('b2_ramin_yes'); out.after = {ramin:b2In('redblade'), keth:b2In('warlock'), off:b2AllyOff('warlock'), count:S.squad.filter(k => B2_ALLIES.includes(k)).length};
  out.kNode = k.node(); out.kShow = k.show(); return out; });
ok(meet.shown, 'Keth stands on the west bank once the ford is blown');
ok(meet.ch === 'b2_keth_ask,b2_keth_yes,b2_keth_later,b2_keth_no', `his answers: ${meet.ch}`);
ok(meet.in && meet.name === 'Keth', 'taking him puts him in the squad, and he has a name now');
ok(meet.rSwap && meet.rTxt, 'with Keth walking, Ramin\'s offer is a swap, and can be "not now"');
ok(meet.after.ramin && !meet.after.keth && meet.after.off && meet.after.count === 1, 'taking Ramin sends Keth back to the Foolish Dog: one recruit at a time');
ok(meet.kNode === 'b2_swap_warlock' && meet.kShow, 'and Keth waits at his fire on the same bank, to be asked back');

// ---- "not now", "no", and the swap at a later chapter's fire, kit and all ----
await fresh({f:{b2_blown:1}});
const later = await ev(() => { const o = {}; talk('b2_keth_later'); o.later = S.f.b2_kethDone === 2 && b2AllyOff('warlock') && !b2In('warlock');
  talk('b2_ramin_later'); o.rLater = S.f.b2_raminDone === 2 && b2AllyOff('redblade') && S.f.b2_raminDone != null;
  S.f.b2_kethDone = 0; o.no = !b2AllyOff('warlock'); S.f.b2_kethDone = 2; return o; });
ok(later.later && later.rLater, '"not now": either one walks near the stretch, never having walked with the squad');
ok(later.no, '"no": Keth is gone for good');
const swap = await ev(() => { const o = {}; S.chapter = 3; b2SwapIn('redblade'); gain('b2_sash'); equip('redblade', 'b2_sash'); S.loy.redblade = 2;
  const A = AREAS.b2_east, off = id => A.npcs.find(n => n.id === id); o.offK = off('off_keth_b2_east').show(); o.offR = off('off_ramin_b2_east').show();
  o.ch = DLG.b2_swap_warlock().ch[0].t; talk('b2_swap_warlock'); choose(curCh[0]);
  o.k = b2In('warlock') && !b2In('redblade') && S.f.b2_kethDone === 1; o.rGear = JSON.stringify(S.gear.redblade); o.kept = S.kit.includes('b2_sash');
  o.offR2 = off('off_ramin_b2_east').show(); o.talk = off('keth_b2_east').show() && off('keth_b2_east').node() === 'b2_keth3';
  talk('b2_swap_redblade'); choose(curCh[0]); o.back = b2In('redblade') && JSON.stringify(S.gear.redblade) === '{"trinket":"b2_sash"}' && S.loy.redblade === 2;
  o.txt = $('#sheet').innerText; return o; });
ok(swap.offK && !swap.offR, 'Chapter 3: Keth waits at the Foolish Dog\'s fire; Ramin, with the squad, does not wait anywhere');
ok(/Ramin goes back to the Red Blades/.test(swap.ch), `the swap says who goes back: ${swap.ch}`);
ok(swap.k && swap.rGear === '{}' && swap.kept, 'Keth in, Ramin out; Ramin\'s kit comes off him and stays in the squad\'s kit');
ok(swap.offR2 && swap.talk, 'now Ramin waits at the Red Blades\' fire, and Keth has his own talk on Ramin\'s tile');
ok(swap.back && !bad.test(swap.txt), 'asked back, Ramin comes with his sash on and his loyalty where he left it');
const shut = await ev(() => { const o = {}; S.chapter = 6; S.f.b2_silverDone = 0; o.six = b2SwapOpen(); S.f.b2_silverDone = 1; o.paid = b2SwapOpen();
  S.chapter = 7; S.f.b2_ph7 = 0; o.balahn = b2SwapOpen(); S.f.b2_ph7 = 1; o.aren = b2SwapOpen(); return o; });
ok(shut.six && !shut.paid && shut.balahn && !shut.aren, 'the swap closes when the silver is paid, opens at Balahn, closes in sight of Aren');

// ---- every new figure stands on open ground, and never on another figure that can show at the same time ----
const tiles = await ev(() => { const errs = [], ids = ['b2_westbank', 'b2_east', 'b2_carriages', 'b2_farbank', 'b2_vforest', 'b2_hills', 'b2_geleen', 'b2_balahn', 'b2_aren'];
  const states = [{sq:['redblade'], f:{b2_raminDone:1, b2_kethDone:2}}, {sq:['warlock'], f:{b2_raminDone:2, b2_kethDone:1}}, {sq:[], f:{b2_raminDone:2, b2_kethDone:2}}];
  for (const aid of ids) { const A = AREAS[aid], walk = A.walk || '.';
    for (const n of A.npcs.filter(n => /keth|ramin|warlock|redblade/.test(n.id + n.kind))) { const c = (A.map[n.y] || '')[n.x]; if (!c || !walk.includes(c) || (A.triggers || {})[c]) errs.push(`${aid}/${n.id} on '${c}'`); }
    for (const st of states) for (const ch of [2, 3, 4, 5, 6, 7]) for (const flags of [{}, {b2_blown:1, b2_silverDone:1}]) {
      S = newStateDG('T'); S.chapter = ch; st.sq.forEach(k => S.squad.push(k)); Object.assign(S.f, st.f, flags);
      const seen = {}; A.npcs.forEach(n => { let s; try { s = !n.show || n.show(); } catch (e) { s = false; } if (!s) return; const k = n.x + ',' + n.y; if (seen[k] && /keth|ramin/.test(n.id + seen[k])) errs.push(`${aid} ch${ch}: ${seen[k]} and ${n.id} at ${k}`); seen[k] = n.id; }); } }
  return [...new Set(errs)]; });
ok(!tiles.length, `the new fires and talks are on open ground, one figure to a tile${tiles.length ? ': ' + tiles.slice(0, 6).join('; ') : ''}`);

// ---- the talks read right, with and without the others ----
const talks = await ev(() => { const errs = [], nodes = ['b2_keth', 'b2_keth_ask', 'b2_keth_yes', 'b2_keth_later', 'b2_keth_no', 'b2_swap_warlock', 'b2_swap_redblade', 'b2_swap_in', 'b2_keth3', 'b2_keth3b', 'b2_keth3c', 'b2_keth4', 'b2_keth4b', 'b2_keth4d', 'b2_keth4e', 'b2_keth4f', 'b2_keth5', 'b2_keth5_ok', 'b2_keth5_no', 'b2_keth6', 'b2_keth6b', 'b2_part_keth', 'b2_p_keth_stay', 'b2_p_keth_go', 'b2_keth7', 'b2_keth7b', 'b2_keth_go', 'b2_keth_go2', 'b2_night', 'b2_raid_back', 'b2_butterflies', 'b2_youngest', 'b2_wall_crows', 'b2_evening'];
  for (let v = 0; v < 6; v++) for (const id of nodes) { S = newStateDG('T'); S.chapter = 4; if (v % 2) S.squad.push('warlock'); else S.f.b2_kethDone = 1; if (v % 3 === 0) S.squad = S.squad.filter(k => k !== 'sathi' && k !== 'marrow'); if (v === 4) S.squad.push('redblade');
    S.f.b2_kethSormo = ['laughed', 'sat', 'up'][v % 3]; S.f.b2_raminDone = v % 2 ? 2 : 1; migrate(S);
    let n; try { n = DLG[id](); } catch (e) { errs.push(id + ': ' + e.message); continue; }
    const t = [n.txt, ...(n.ch || []).map(c => c.t)].join(' '), bad = /\bundefined\b|\bNaN\b|\[object |\$\{/; if (bad.test(t)) errs.push(id + ': ' + t.match(bad)[0]); }
  return errs; });
ok(!talks.length, `every new talk reads clean in six squads${talks.length ? ': ' + talks.slice(0, 4).join('; ') : ''}`);

// ---- in a fight: spirit-craft, no strain, never sputters ----
await fresh({ch:5, lvl:6, add:['warlock']});
const fight = await ev(() => { const o = {}; startBattle('b2_spring', {}); const k = B.units.find(u => u.id === 'warlock'), f = foes()[0], h = B.units.find(u => u.id === 'haddat');
  o.ab = k.ab.join(','); o.strain = !!(AB.b2_teeth.strain || AB.b2_hand.strain); o.spirit = AB.b2_teeth.spirit && AB.b2_hand.spirit;
  k.x = 3; k.y = 6; f.x = 3; f.y = 3; f.ac = -50; B.cur = k; o.tile = AB.b2_teeth.tiles(k).includes(f);
  window._hp0 = f.hp; AB.b2_teeth.run(k, f.x, f.y); o.cd = k.cdTeeth > B.round;
  return o; });
await page.waitForTimeout(600);
const fight2 = await ev(() => { const o = {}, k = B.units.find(u => u.id === 'warlock'), f = B.units.filter(u => u.side === 'e')[0], h = B.units.find(u => u.id === 'haddat'); o.dmg = window._hp0 - f.hp;
  o.held = f.hp <= 0 || (f.earthUntil > B.round - 1 && f.slowTurn); h.x = 4; h.y = 6; o.handTile = AB.b2_hand.tiles(k).includes(h);
  AB.b2_hand.run(k, h.x, h.y); o.until = h.handUntil > B.round; o.left = AB.b2_hand.ok(k); h.hp = 5; hurt(h, 40); o.stood = h.hp === 1; o.spent = h.handUntil === -1; hurt(h, 40); o.down = h.hp === 0;
  S.picks.warlock = ['crowcall', 'deepground']; const u2 = mkParty('warlock', 0, 0); o.crow = u2.ab.includes('b2_crow'); k.x = 3; k.y = 7; const far = foes().find(x => x.hp > 0); if (far) { far.x = 3; far.y = 2; o.reach5 = AB.b2_teeth.tiles(k).includes(far); } else o.reach5 = true;
  B = null; return o; });
ok(fight.ab === 'b2_teeth,b2_hand,salve' && !fight.strain && fight.spirit, 'in a fight: the Land\'s Teeth, the Grandmother\'s Hand, a salve; no strain, spirit-craft');
ok(fight.tile && fight.cd && fight2.dmg > 0 && fight2.held, `the Land's Teeth bites (${fight2.dmg}) and holds by the feet, then waits a round`);
ok(fight2.handTile && fight2.until && fight2.left, 'the Grandmother\'s Hand on a squadmate within 4; twice a fight from level 6');
ok(fight2.stood && fight2.spent && fight2.down, 'a blow that would drop them leaves them at 1, once; the next one drops them');
ok(fight2.crow && fight2.reach5, 'the talents: the Old Woman\'s Crows; Deep Ground reaches 5');

// ---- the split, the Barrow, the night after, the last page ----
await fresh({ch:6, lvl:7, add:['warlock'], f:{b2_c4_key:'keep', b2_silverDone:1}});
const split = await ev(() => { const o = {}; o.here = b2Here6().includes('warlock'); o.lean = b2Lean('warlock'); const n = DLG.b2_part_keth(); o.ch = n.ch.length;
  talk('b2_p_keth_stay'); o.said = b2Said('warlock') && b2Staying('warlock'); b2AllSaid(); ['haddat', 'sathi', 'tangle', 'marrow'].forEach(k => b2Choose(k, false, 'own'));
  b2DoSplit(); o.left = !b2In('warlock') && b2Rearguard().includes('warlock') && S.kit.includes('b2_dogtooth') && !b2AllyOff('warlock');
  o.bar = B2_BAR7.warlock() + B2_BAREND7.warlock(); S.chapter = 7; b2LastStand(); o.stand = S.squad.includes('warlock'); b2LastStandEnd(); o.fell = b2Fell('warlock');
  o.page = B2FIN.gone('warlock', 'guard'); return o; });
ok(split.here && split.lean === 'go' && split.ch === 3, 'at the Geleen he is one of those who choose; he leans to go with the children');
ok(split.said && split.left, 'asked to stay, he stays: out of the squad, his first dog\'s tooth with the sergeant, not waiting at any fire');
ok(split.stand && split.fell && !bad.test(split.bar), 'he is on the Barrow with the rearguard, and falls there');
ok(split.page && /Two voices/.test(split.page.title) && !bad.test(split.page.txt), `the last pages remember him: ${split.page && split.page.title}`);
await fresh({ch:7, lvl:7, add:['warlock'], f:{b2_ph7:2, b2_kethDone:1, b2_raminDone:2}});
const night = await ev(() => { const o = {}; o.old = b2OldHand('kettle') === false; const n = DLG.b2_evening(); o.ch = n.ch.map(c => c.t).join('|');
  talk('b2_keth_go'); choose(curCh[0]); o.gone = !b2In('warlock') && !!S.f.b2_kethGone; o.next = S.node;
  const p = B2FIN.gone('warlock', 'wickans'); o.page = p && p.label; o.txt = p && p.txt; o.end = DLG.b2_c7_end().txt; return o; });
ok(night.old, 'no Old Hand of the Fourth while Keth walks with the squad: one at a time');
ok(night.ch === 'Keth.' && night.gone && night.next === 'b2_evening2', 'the night after the Barrow he goes to the Wickan children');
ok(night.page === 'With the children' && !bad.test(night.txt) && /Keth, with the children/.test(night.end), 'the end of the book: "With the children"');
await fresh({ch:7, lvl:7, f:{b2_ph7:2, b2_kethDone:1, b2_raminDone:1}});
const near = await ev(() => { const n = DLG.b2_evening(); talk('b2_evening'); return {txt:/among them, with his palms flat/.test(n.txt) && /At the end of the rank/.test(n.txt), keth:!!S.f.b2_kethGone, ramin:!!S.f.b2_raminGone}; });
ok(near.txt && near.keth && near.ramin, 'whoever was walking near, not with, goes their own way that night too, and has a last page');

// ---- Hackle's voice ----
await fresh({ch:2});
const dog = await ev(async () => { const o = {}, heard = []; const play = AUDIO.play; AUDIO.play = (k, ...a) => { heard.push(k); };
  o.words = [b2DogSound('Hackle barks, once, and goes and lies down.'), b2DogSound('Hackle, at Sathi\'s knee, does not growl.'), b2DogSound('Hackle wakes the squad, not by barking. By shaking.'), b2DogSound('Hackle growls, low.'), b2DogSound('Hackle whines, and the dogs start to howl.'), b2DogSound('Haddat barks an order.')];
  heard.length = 0; S.f.b2_blown = 1; S.squad.push('warlock'); talk('b2_keth_yes'); await new Promise(r => setTimeout(r, 450)); o.talk = heard.slice();
  heard.length = 0; startBattle('b2_spring', {}); await new Promise(r => setTimeout(r, 700)); o.start = heard.slice();
  const h = B.units.find(u => u.kind === 'hackle'), f = foes()[0]; heard.length = 0; f.ac = -50; attack(h, f); await new Promise(r => setTimeout(r, 400)); o.bite = heard.slice();
  heard.length = 0; hurt(h, 1); o.hit = heard.slice(); heard.length = 0; hurt(h, 999); o.down = heard.slice();
  B = null; AUDIO.play = play; ['bark', 'yelp', 'whine', 'snarl', 'howl'].forEach(k => AUDIO.play(k)); return o; });
ok(dog.words.join(',') === 'bark,,,snarl,whine,', `the story's words: ${dog.words.map(w => w || '·').join(' ')}`);
ok(dog.talk.includes('bark'), 'Hackle barks when the story says he barks (Keth joins)');
ok(dog.start.includes('bark'), 'Hackle barks when he comes into a fight');
ok(dog.bite.includes('bark') && dog.hit.includes('yelp') && dog.down.includes('whine'), 'a bark when he bites, a yelp when he is hit, a whine when he goes down');
await page.waitForTimeout(200);
ok(!warns.length, `every dog sound is in the engine${warns.length ? ': ' + warns.join('; ') : ''}`);

await br.close(); srv.kill();
if (errors.length) { console.log('page errors:', errors); process.exit(1); }
console.log(fail ? 'keth: FAIL' : 'keth: all ok'); process.exit(fail);
