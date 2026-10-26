// v7.0.1 (David, Oct 26: the munitions cart in Book Four Ch1 "keeps looping"): a check is rolled once. Every book's every check is
// taken both ways (made and missed) from a fresh state of its book, its result node's effect run, and the node shown again: the same
// check must not be offered a second time (S.rolled, src/16_skill_checks.js). Then the cart itself through the real sheet.
// Allowed: nodes the story never shows twice (their way in is a flag or a one-way scene). Usage: node tools/recheck_test.mjs
import { server, browser as launch, openGame } from './page.mjs';
const ALLOW = {b2_fever:'the grandmother is b2_fever_again once the fever is settled', b2_bait_wait:'one way in, from the Shallows bait'};
const srv = await server(); const br = await launch();
const { page } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
const r = await page.evaluate(() => {
  const out = [], books = [['gotm', () => newState('Scan'), /^(?!b2_|b3_|b4_)/], ['dg', () => newStateDG('Scan'), /^b2_/], ['moi', () => newStateMOI('Scan'), /^b3_/], ['hoc', () => newStateHOC('Scan'), /^b4_/]];
  const clone = o => JSON.parse(JSON.stringify(o));
  const fxOf = id => { try { const n = DLG[id](); if (n.fx) n.fx(); } catch (e) {} };
  const noop = () => {}; const saved = {note: window.note, talk: window.talk, startBattle: window.startBattle, startExplore: window.startExplore, save: window.save};
  for (const [bk, mk, re] of books) {
    try { setBook(bk); } catch (e) {}
    let base; try { base = mk(); } catch (e) { out.push('no state ' + bk + ' ' + e.message); continue; }
    for (const id of Object.keys(DLG).filter(k => re.test(k))) {
      S = clone(base); let n; try { n = DLG[id](); } catch (e) { continue; }
      for (const c of (n.ch || [])) { if (!c.check) continue;
        let vis = true; try { vis = !c.req || c.req(); } catch (e) { vis = false; } if (!vis) continue;
        for (const leg of ['go', 'fail']) { const g = c[leg]; if (typeof g !== 'string' || !DLG[g]) continue;
          S = clone(base); try { if (leg === 'go' && c.fx) c.fx(); } catch (e) {}
          fxOf(g); S.rolled = {[rolledKey(id, c)]: 1}; let again; try { again = DLG[id](); } catch (e) { continue; }
          const vis2 = (again.ch || []).filter(x => { try { return !x.req || x.req(); } catch (e) { return false; } }); const fr = vis2.filter(x => !rolledHere(id, x)); const shown = fr.length ? fr : vis2; const same = shown.find(x => x.check && x.t === c.t);
          if (same) out.push(`${bk}\t${id}\t${leg}\t${c.t.slice(0, 70)}`); } } } }
  return out; });
const bad = r.filter(l => !ALLOW[l.split('\t')[1]]);
const ui = await page.evaluate(async () => {
  const wait = ms => new Promise(res => setTimeout(res, ms));
  setBook('hoc'); S = newStateHOC('Recheck'); S.picksDue = []; save(); startChapter(1); await wait(80);
  S.f.b4_c1_errand = 1; startExplore('b4_c1_line'); talk('b4_c1_cart'); await wait(50);
  const c = DLG.b4_c1_cart().ch[0]; settleRoll({who:'sgt', stat:'guile', tier:'fail', ok:false, pass:false, margin:-5, nat:3}, c); talk(c.fail); await wait(30);
  talk('b4_c1_cart'); await wait(30); const after = [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent);
  S.f.b4_c1_cartTried = 0; talk('b4_c1_cart'); await wait(30); const engine = [...document.querySelectorAll('#sheet .choice')].map(b => b.textContent);
  startChapter(1); return {after, engine, cleared: !S.rolled}; });
let fail = 0;
for (const l of bad) { fail = 1; console.log('FAIL a check offered again after it was rolled: ' + l.replace(/\t/g, ' · ')); }
if (!bad.length) console.log(`ok   no check offered again after it was rolled (${r.length - bad.length} allowed: ${Object.keys(ALLOW).join(', ')})`);
const noCheck = a => a.length && !a.some(t => /sharper off the guard/.test(t));
if (noCheck(ui.after)) console.log('ok   the munitions cart, once tried, says so and offers only Walk on'); else { fail = 1; console.log('FAIL cart after a try: ' + JSON.stringify(ui.after)); }
if (noCheck(ui.engine)) console.log('ok   without the cart\'s own flag the engine still holds the rolled check back'); else { fail = 1; console.log('FAIL engine rule: ' + JSON.stringify(ui.engine)); }
if (ui.cleared) console.log('ok   a chapter start (a replay) clears what was rolled'); else { fail = 1; console.log('FAIL S.rolled not cleared at a chapter start'); }
await br.close(); srv.kill(); process.exit(fail);
