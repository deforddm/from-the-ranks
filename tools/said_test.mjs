// v6.12.0: words said once in a sitting, and the fight log that scrolls.
// A hub a branch comes back to shows its `again` line, or its words folded with "Read it again"; a topic already heard (its node's
// every way out comes back here or to what is offered here, with the same words) is not offered again, never the last choice; the
// picker's Back shows the words whole; a map, a fight, a vision or the sheet closing starts a new sitting; the deck is described once
// a book per reader; the fight log keeps eighty lines in a box that scrolls, and a narrow PC window gives the box its room.
// Usage: node tools/said_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { settings: { master: 0, music: 0, sfx: 0, amb: 0, motion: 'off', shake: false, speed: 1 } });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const choices = () => ev(() => [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()));
const click = re => ev(src => { const b = [...document.querySelectorAll('#sheet .choice')].find(b => new RegExp(src).test(b.textContent)); if (!b) return false; b.click(); return true; }, re);
const sheet = () => ev(() => ({ said: !!document.querySelector('#sheet .txt.said'), more: !!document.querySelector('#saidMore'), text: (document.querySelector('#sheet .txt') || {}).innerText || '' }));
const wait = ms => page.waitForTimeout(ms);

/* a little dialogue of its own, so the rules are tested bare */
await ev(() => {
  S = newState('Hask'); S.chapter = 2; S.squad = [...PORDER]; migrate(S); S.chapters = {0:'x', 1:'x'}; S.picksDue = []; save();
  const L = 'A long paragraph of words that the player has already read once, and would rather not read twice in the one sitting. '.repeat(3);
  DLG.__hub = () => ({sp:'The hub', txt:L + '\n\nWho?', ch:[{t:'Topic A.', go:'__a'}, {t:'Topic B.', go:'__b'}, {t:'Topic C.', go:'__c'}, {t:'Onward.', go:'__on'}]});
  DLG.__a = () => ({sp:'A', txt:'A says a thing. ' + L, ch:[{t:'Back.', go:'__hub'}]});
  DLG.__b = () => ({sp:'B', txt:'B says a thing. ' + L, ch:[{t:'Back.', go:'__hub'}, {t:'Onward from B.', go:'__on'}]});
  DLG.__c = () => ({sp:'C', txt:'C says a thing. ' + L, ch:[{t:'Back.', go:'__hub'}, {t:'Somewhere else.', go:'__else'}]});
  DLG.__on = () => ({sp:'On', txt:'Onward.', ch:[{t:'Back.', go:'__hub'}]});
  DLG.__else = () => ({sp:'Else', txt:'Elsewhere.', ch:[{t:'Back.', go:'__c'}]});
  DLG.__hub2 = () => ({sp:'The second hub', again:'The hub again, in a line.', txt:L, ch:[{t:'Topic A.', go:'__a2'}, {t:'Leave.'}]});
  DLG.__a2 = () => ({sp:'A', txt:'A says a thing.', ch:[{t:'Back.', go:'__hub2'}]});
  DLG.__only = () => ({sp:'Only', txt:L, ch:[{t:'The one topic.', go:'__onlyA'}]});
  DLG.__onlyA = () => ({sp:'A', txt:'A says the one thing. ' + L, ch:[{t:'Back.', go:'__only'}]});
  DLG.__pk = () => ({sp:'Picker', txt:L, ch:[{t:'Try the lock.', check:['wits', 12], go:'__on', fail:'__on'}, {t:'Leave.'}]});
  G.said = null; talk('__hub');
});
let c0 = await choices(), s0 = await sheet();
ok(c0.length === 4 && !s0.said, 'the hub shows its words whole the first time, with four choices');
await click('Topic A'); await wait(60); await click('^Back'); await wait(60); let c1 = await choices(), s1 = await sheet();
ok(s1.said && s1.more && c1.length === 3 && !c1.includes('Topic A.'), 'back from A: the hub folds, and A (its only way out is back here) is not offered again');
await click('Topic B'); await wait(60); await click('^Back'); await wait(60); let c2 = await choices();
ok(c2.length === 2 && !c2.includes('Topic B.'), 'B goes back here or onward, which the hub offers too: heard, so gone');
await click('Topic C'); await wait(60); await click('^Back'); await wait(60); let c3 = await choices();
ok(c3.includes('Topic C.'), 'C has a way out of its own (somewhere else): still offered');
await ev(() => document.querySelector('#saidMore').click()); await wait(60); let s3 = await sheet();
ok(!s3.said && !s3.more && /already read once/.test(s3.text), '"Read it again" unfolds the words');
await ev(() => { G.said = null; talk('__hub2'); }); await click('Topic A'); await wait(60); await click('^Back'); await wait(60); let s4 = await sheet(), c4 = await choices();
ok(!s4.said && s4.text.trim() === 'The hub again, in a line.' && c4.join('|') === 'Leave.', 'a hub with an again line shows that line, and A is gone');
await ev(() => { G.said = null; talk('__only'); }); await click('one topic'); await wait(60); await click('^Back'); await wait(60); let c5 = await choices();
ok(c5.join('|') === 'The one topic.', 'the last choice is never taken away');
await ev(() => { G.said = null; talk('__pk'); }); await click('Try the lock'); await wait(120);
const pk = await ev(() => !!document.querySelector('#sheet .choices.picker'));
await ev(() => { const b = document.querySelector('#sheet [data-back]'); if (b) b.click(); }); await wait(60); let s6 = await sheet();
ok(pk && !s6.said && /already read once/.test(s6.text), "the picker's Back shows the words whole, not folded");
/* a new sitting: the sheet closed, the map, a fight, a vision */
await ev(() => { G.said = null; talk('__hub'); closeSheet(); talk('__hub'); }); let s7 = await sheet();
await ev(() => { talk('__hub'); startExplore(); talk('__hub'); }); let s8 = await sheet();
await ev(() => { talk('__hub'); startBattle('deserters', {}); }); await wait(100); await ev(() => { talk('__hub'); }); let s9 = await sheet();
ok(!s7.said && !s8.said && !s9.said, 'the sheet closing, the map and a fight each start a new sitting');
const vis = await ev(() => { G.said = {x:1}; playVision('v1_paran', () => {}); const r = Object.keys(G.said || {}); VIS = null; document.body.classList.remove('vision'); return r; });
ok(!vis.includes('x') && vis.includes('vis_v1_paran_0'), 'a vision starts a new sitting');
/* the deck described once a book */
const deck = await ev(() => { setBook('dg'); S = newStateDG('Hask'); S.chapter = 1; S.squad = ['marrow', 'tangle']; migrate(S); S.picksDue = []; save(); G.said = null; const t = id => { talk(id); return document.querySelector('#sheet .txt').innerText; };
  const m1 = t('b2_c1_deck'); S.chapter = 2; const m2 = t('b2_c2_deck'); S.chapter = 3; const m3 = t('b2_c3_deck');
  S.squad = ['tangle']; S.f.b2_yedda = 1; S.chapter = 4; const y1 = t('b2_c4_deck'); S.chapter = 5; const y2 = t('b2_c5_deck');
  setBook('moi'); S = newStateMOI('Hask'); S.chapter = 1; S.squad = ['tuft', 'kettle']; migrate(S); S.picksDue = []; save(); G.said = null; const t1 = t('b3_c1_deck'); S.chapter = 2; const t2 = t('b3_c2_deck');
  S.squad = ['sohra']; S.chapter = 3; const so1 = t('b3_c3_deck'); S.chapter = 4; const so2 = t('b3_c4_deck');
  return {m1, m2, m3, y1, y2, t1, t2, so1, so2}; });
ok(/temple deck from Nap, old/.test(deck.m1) && /^Marrow has her Deck out, the temple deck from Nap\./.test(deck.m2) && /^Marrow has her Deck out, the temple deck from Nap\./.test(deck.m3), "Marrow's deck: described in full once, then a line");
ok(/rope-walk sacking/.test(deck.y1) && /^Yedda has the Deck out of her apron/.test(deck.y2), "Yedda's deck: in full the first time she reads, then a line");
ok(/paint worn off the House of Shadow/.test(deck.t1) && /^Tuft has the Deck out, the wooden one\./.test(deck.t2), "Tuft's deck in Book Three: once, then a line");
ok(/bone cup/.test(deck.so1) && /^Sohra has the bone cup out/.test(deck.so2), "Sohra's bones: once, then a line");
/* the fight log */
const log = await ev(() => { closeSheet(); setBook('gotm'); S = newState('Hask'); migrate(S); S.picksDue = []; save(); startBattle('deserters', {}); for (let i = 0; i < 100; i++) blog('Line ' + i + ' of the fight.');
  const lg = $('#blog'); return {kept:B.log.length, newest:B.log[0], h:lg.clientHeight, sh:lg.scrollHeight, oy:getComputedStyle(lg).overflowY, hidden:[...lg.children].filter(c => c.hidden).length, first:lg.firstElementChild.textContent}; });
ok(log.kept === 80 && log.newest === 'Line 99 of the fight.', 'the fight keeps its last eighty lines, the newest first');
ok(log.oy === 'auto' && log.sh > log.h * 3 && log.hidden === 0 && log.first === 'Line 99 of the fight.', `the log is a box that scrolls (${log.h}px showing ${log.sh}px), nothing hidden`);
const room = await ev(() => { const lg = $('#blog'); lg.dataset.room = 150; logFit(); const a = lg.style.maxHeight; delete lg.dataset.room; logFit(); return {a, b:lg.style.maxHeight}; });
ok(room.a === '150px' && room.b === '', 'a narrow PC window gives the box its room; otherwise the stylesheet does');
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
