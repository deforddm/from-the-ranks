// v6.13.0: Book Three's games at the fires (69), and the masks no longer walked past (45).
// Each game is offered at its fire, opens, plays through from the keys and the panel, closes to its after-node, pays once, and
// leaves its deed; a game left early pays nothing. Bones: Picker and Antsy deal. Hand-Talk: a run given back wins the crate's
// prize, a slip ends it. The Shield Wall: held arrows and the push on three are trust. Blood-Iron: best of three. The Crossing:
// the quorl road and the river road, clean or caught. Book One Ch6: the man from the doorway waits until the hall doors are seen.
// Usage: node tools/b3games_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { settings: { master: 0, music: 0, sfx: 0, amb: 0, motion: 'on', shake: false, speed: 1 } });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const wait = ms => page.waitForTimeout(ms);
const setup = (ch, squad) => ev(({ ch, squad }) => { setBook('moi'); S = newStateMOI('Hask'); S.chapter = ch; S.squad = squad; migrate(S); S.picksDue = []; S.silver = 12; S.inv = {sharper:1, burner:0, cusser:0, smoker:0, salve:1}; S.ally = {trust:5, dread:1}; save(); G.said = null; }, { ch, squad });
const choices = () => ev(() => [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()));
const click = re => ev(src => { const b = [...document.querySelectorAll('#sheet .choice')].find(b => new RegExp(src).test(b.textContent)); if (!b) return false; b.click(); return true; }, re);
const key = k => ev(k => MG.keys && MG.keys({key:k, preventDefault(){}}), k);
const text = () => ev(() => (document.querySelector('#sheet .txt') || {}).innerText || '');

/* bones at Pale: the blanket, three dealers, the after-node */
await setup(1, ['tuft', 'kettle', 'brisk', 'ohl']); await ev(() => { S.f.b3_c1_tunnelsDone = 1; talk('b3_c1_fire'); });
ok((await choices()).some(t => /blanket down and the bones/.test(t)), "Ch1: the Bridgeburners' blanket is offered at the Fourth's fire");
await click('blanket'); await wait(60); const dealers = await choices();
ok(/Hedge/.test(dealers[0]) && /Picker/.test(dealers[1]) && /Antsy/.test(dealers[2]), 'three dealers: Hedge, Picker, Antsy');
await click('against Antsy'); await wait(200); const bo = await ev(() => ({open:mgOpenNow(), title:$('#mg h2').textContent, opp:BONES.antsy && BONES.antsy.name, fig:typeof FIGX.antsy === 'function' && typeof FIGX.picker === 'function'}));
ok(bo.open && /Antsy deals you in/.test(bo.title) && bo.fig, 'Antsy deals, with a figure of his own');
await ev(() => { const b = document.querySelector('#mgPanel [data-st]'); b && b.click(); }); await wait(100); await ev(() => $('#bgThrow').click()); await wait(900);
const silver0 = await ev(() => S.silver); await ev(() => mgClose({games:1, net:3, won:true, last:'me'})); await wait(100);
ok((await ev(() => S.node)) === 'b3_c1_bones_after' && /their silver in your purse/.test(await text()), 'a won hand: the after-node says so');

/* hand-talk: a run given back, the prize, a slip */
await setup(2, ['tuft', 'kettle', 'brisk', 'ohl']); await ev(() => talk('b3_c2_wagons'));
ok((await choices()).some(t => /chitin guard/.test(t)), 'Ch2: the chitin guard at the wagons');
await click('chitin guard'); await wait(100); await ev(() => $('#htGo').click()); await wait(2600);
let st = await ev(() => ({phase:MG.state.phase, seq:MG.state.seq.slice()}));
ok(st.phase === 'answer' && st.seq.length === 3, `the guard shows three signs (${st.seq.join(',')}) and waits`);
for (const k of st.seq) { await key(String(k + 1)); await wait(60); }
st = await ev(() => ({phase:MG.state.phase, won:MG.state.won})); ok(st.phase === 'won' && st.won === 1, 'given back whole: the first run');
await ev(() => $('#htNext').click()); await wait(3300); st = await ev(() => ({phase:MG.state.phase, seq:MG.state.seq.slice()}));
ok(st.phase === 'answer' && st.seq.length === 4, 'the second run: four signs');
for (const k of st.seq) { await key(String(k + 1)); await wait(60); }
const inv = await ev(() => ({won:MG.state.won, sharper:S.inv.sharper})); ok(inv.won === 2 && inv.sharper === 2, 'the second run wins a sharper off the crate');
await ev(() => $('#htNext').click()); await wait(4000); st = await ev(() => ({phase:MG.state.phase, seq:MG.state.seq.slice()}));
const wrong = (st.seq[0] + 1) % 6; await key(String(wrong + 1)); await wait(60);
st = await ev(() => ({phase:MG.state.phase, over:MG.state.over, won:MG.state.won, deeds:S.deeds})); ok(st.phase === 'lost' && st.over && st.won === 2 && st.deeds.b3HandLost === 1 && st.deeds.b3Hand === 2, 'a slip ends it; what was won is kept');
await ev(() => $('#htDone').click()); await wait(100); ok((await ev(() => S.node)) === 'b3_c2_hand_after' && /turns back to its crate/.test(await text()), 'the after-node, after the guard turns away');

/* the shield wall: every arrow held and the push on three pay trust; left early pays nothing */
await setup(4, ['tuft', 'kettle', 'greysword']); await ev(() => talk('b3_c4_fire'));
ok((await choices()).some(t => /Dannet wants the squad in a line/.test(t)), 'Ch4: Dannet drills the squad when she is in it');
await click('Shields'); await wait(100); await ev(() => MG.leave()); await wait(100);
ok((await ev(() => S.node)) === 'b3_c4_shield_after' && !(await ev(() => S.f.b3_shieldPaid)) && (await ev(() => S.ally.trust)) === 5, 'falling out early pays nothing');
await ev(() => talk('b3_c4_fire')); await click('Shields'); await wait(100); await ev(() => $('#swGo').click());
for (let i = 0; i < 90; i++) { const s2 = await ev(() => { const a = MG.state.arrows.find(a => !a.done); return {phase:MG.state.phase, at:a ? a.at - performance.now() : null, pushAt:MG.state.push ? MG.state.push.at - performance.now() : null, pushed:MG.state.pushed}; });
  if (s2.phase === 'volley' && s2.at != null) { if (s2.at > 15) await wait(s2.at); await ev(() => { const b = $('#swUp'); b && b.click(); }); }
  else if (s2.phase === 'between') { await ev(() => $('#swGo').click()); await wait(200); }
  else if (s2.phase === 'push') { if (s2.pushed !== null) break; if (s2.pushAt > 0) await wait(s2.pushAt); await ev(() => $('#swUp').click()); break; }
  else await wait(150); }
await wait(200); const sw = await ev(() => ({held:MG.state.held, total:MG.state.total, pushed:MG.state.pushed, over:MG.state.over}));
ok(sw.over && sw.total === 15 && sw.held >= 13 && sw.pushed === true, `held ${sw.held} of ${sw.total}, and the push on three`);
await ev(() => $('#swDone').click()); await wait(100); const paid = await ev(() => ({node:S.node, trust:S.ally.trust, paid:S.f.b3_shieldPaid, loy:S.loy.greysword, deeds:S.deeds}));
ok(paid.node === 'b3_c4_shield_after' && paid.trust === 7 && paid.paid === 1 && paid.deeds.b3Shield === 1 && paid.deeds.b3ShieldClean === 1, `a clean drill: +2 trust (${paid.trust}), the deed, paid once`);
await setup(4, ['tuft', 'kettle']); await ev(() => talk('b3_c4_fire')); ok((await choices()).some(t => /Grey Sword drill-sergeant/.test(t)), 'without Dannet a Grey Sword drill-sergeant runs it');

/* blood-iron: three throws, a result, trust on a win */
await setup(5, ['tuft', 'kettle', 'sohra']); await ev(() => talk('b3_c5_fire'));
ok((await choices()).some(t => /White Face/.test(t)), 'Ch5: the White Face at the next fire');
await click('White Face'); await wait(100); await ev(() => $('#biGo').click()); await wait(100);
let rounds = 0; for (let r = 0; r < 3; r++) { await ev(() => { MG.state.swing = performance.now() - 350; }); await ev(() => $('#biThrow').click()); await wait(2200); rounds++; const s3 = await ev(() => ({over:MG.state.over, phase:MG.state.phase})); if (s3.over) break; await ev(() => $('#biGo').click()); await wait(100); }
const bi = await ev(() => ({over:MG.state.over, w:MG.state.wins, l:MG.state.losses, deeds:S.deeds}));
ok(bi.over && bi.w + bi.l === rounds && (bi.deeds.b3BloodWon || 0) + (bi.deeds.b3BloodLost || 0) === 1, `three throws each: ${bi.w} to ${bi.l}, the deed kept`);
await ev(() => $('#biDone').click()); await wait(100); const bp = await ev(() => ({node:S.node, trust:S.ally.trust, w:S.f.b3_bloodLast.won}));
ok(bp.node === 'b3_c5_blood_after' && bp.trust === (bp.w ? 7 : 5), `the after-node${bp.w ? ', +2 trust for the win' : ', no trust for the loss'}`);

/* the crossing: the quorl road and the river road */
const cross = async (fire, re, mode) => { await setup(6, ['tuft', 'kettle']); await ev(f => talk(f), fire); const offered = (await choices()).some(t => re.test(t)); await click(re.source); await wait(100);
  const open = await ev(() => ({open:mgOpenNow(), title:$('#mg h2').textContent}));
  for (let i = 0; i < 40; i++) { if (await ev(() => MG.state.over)) break; await ev(() => { const g = MG.state, bands = t => { const out = new Set(); for (let r = 1; r < 8; r++) { if ((t + r * 2 + Math.floor(r / 3)) % 4 === 0) { const w = 2 + (hash(r, 3, 77) * 3 | 0), x0 = Math.floor(hash(r, t, 78) * (9 - w)); for (let x = x0; x < x0 + w; x++) out.add(K(x, r)); } } return out; }, nb = bands(g.t + 1);
      for (const [dx, dy, k] of [[0, -1, 'ArrowUp'], [-1, -1, 'q'], [1, -1, 'e'], [-1, 0, 'ArrowLeft'], [1, 0, 'ArrowRight'], [0, 0, ' ']]) { const nx = g.pos.x + dx, ny = g.pos.y + dy; if (nx < 0 || nx > 8 || ny < 0) continue; if (!nb.has(K(nx, ny))) { MG.keys({key:k, preventDefault(){}}); return; } } }); await wait(40); }
  const end = await ev(() => ({over:MG.state.over, t:MG.state.t, caught:MG.state.caught, deeds:S.deeds})); await ev(() => $('#crDone').click()); await wait(100);
  const after = await ev(() => ({node:S.node, mode:S.f.b3_crossLast.mode, clean:S.f.b3_crossLast.clean, trust:S.ally.trust, text:document.querySelector('#sheet .txt').innerText}));
  return {offered, open, end, after}; };
const q = await cross('b3_c6_ledge_fire', /practice quorl/, 'quorl');
ok(q.offered && q.open.open && /dark lift/.test(q.open.title), 'Ch6, the roost: the dark lift is offered and opens');
ok(q.end.over && q.end.caught === 0 && q.end.t <= 14 && q.end.deeds.b3CrossClean === 1, `across clean in ${q.end.t} counts`);
ok(q.after.node === 'b3_c6_cross_after' && q.after.mode === 'quorl' && q.after.clean && q.after.trust === 6 && /roost-master/.test(q.after.text), 'the roost after-node, +1 trust for a clean crossing');
const b = await cross('b3_c6_bank_fire', /Take the pole/, 'barge');
ok(b.offered && b.open.open && /night barge/.test(b.open.title), 'Ch6, the slips: the night barge is offered and opens');
ok(b.after.node === 'b3_c6_cross_after' && b.after.mode === 'barge' && /bargemen|bargeman/.test(b.after.text), 'the slips after-node');
/* the Deeds page shows the fires */
const deeds = await ev(() => { const h = b3DeedsExtra([{s:S}]); return {fires:/At the fires/.test(h), cross:/The Crossing/.test(h) && /Clean/.test(h), hand:/Moranth Hand-Talk/.test(h)}; });
ok(deeds.fires && deeds.cross && deeds.hand, "the Deeds page lists Book Three's fires");

/* Book One, Ch6: the man from the doorway waits until the hall doors have been looked in at */
const masks = await ev(() => { setBook('gotm'); S = newState('Hask'); S.chapter = 6; S.squad = [...PORDER]; migrate(S); S.chapters = {0:'x', 1:'x', 2:'x', 3:'x', 4:'x', 5:'x'}; S.picksDue = []; save(); G.said = null;
  const A = AREAS.simtal_terrace, ral = A.npcs.find(n => n.id === 'rallick_t'), before = !!ral.show(), steps0 = DLG.c6_steps().txt; S.f.c6_knivesDone = 1; const title0 = QUESTS.simtal_terrace(); delete S.f.c6_knivesDone;
  talk('c6_hall'); const hallCh = [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()); const seen = S.f.c6_hallSeen; const after = !!ral.show(); closeSheet();
  return {before, after, seen, steps0, title0, masks:hallCh.some(t => /put names to the masks/.test(t))}; });
ok(!masks.before && masks.seen === 1 && masks.after, 'the man from the doorway is not on the terrace until the hall doors are seen, then he is');
ok(/Whiskeyjack wants his names/.test(masks.steps0) && /hall doors/.test(masks.title0) && masks.masks, 'the steps and the title point at the hall doors; the masks are offered there');
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
