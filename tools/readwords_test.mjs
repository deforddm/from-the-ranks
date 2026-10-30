// v8.0.1 (David, Oct 29: Marrow lays a cross of five, and the words said "two refuse her, the third does not"): the words of a reading
// follow the spread on the table, in every book with every reader. The captions on the reading screen count the refused cards (or tiles)
// as they turn, the lay line names how many are laid, the answer is the right ordinal; and the line after the reading says the same count.
// Sohra's bones keep their three throws. The prologue's reading after the Fold was noticed lays four, and says so.
// Usage: node tools/readwords_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { settings: { master: 0, music: 0, sfx: 0, amb: 0, motion: 'on', shake: false, speed: 1 } });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);

await ev(() => { const f = CanvasRenderingContext2D.prototype.fillText; window.__caps = [];
  CanvasRenderingContext2D.prototype.fillText = function (s, ...a) { if (this.canvas && this.canvas.id === 'ccv' && typeof s === 'string' && s && window.__caps[window.__caps.length - 1] !== s) window.__caps.push(s); return f.call(this, s, ...a); }; });

const CASES = [
  ['gotm', 0, 'tuft', "S = newState('Hask'); S.chapter = 0; migrate(S); save();", 'oponn', "DLG.card().txt", {}],
  ['gotm', 0, 'tuft (the Fold noticed)', "S = newState('Hask'); S.chapter = 0; S.f.p_foldFail = 1; migrate(S); save();", 'oponn', "DLG.card().txt", {spread:'row4'}],
  ['gotm', 3, 'tuft', "S = newState('Hask'); S.chapter = 3; migrate(S); save();", 'magi', "DLG.c3_card().txt", {}],
  ['dg', 1, 'marrow', "setBook('dg'); S = newStateDG('Hask'); S.chapter = 1; S.squad = ['marrow','tangle']; migrate(S); save();", 'b2c_king', "b2DeckCard(1).txt", {}],
  ['dg', 5, 'yedda', "setBook('dg'); S = newStateDG('Hask'); S.chapter = 5; S.squad = ['tangle']; S.f.b2_yedda = 1; migrate(S); save();", 'b2c_queen', "b2DeckCard(5).txt", {}],
  ['dg', 7, 'kanese', "setBook('dg'); S = newStateDG('Hask'); S.chapter = 7; S.squad = ['tangle']; migrate(S); save();", 'b2c_mason', "b2DeckCard(7).txt", {}],
  ['moi', 1, 'tuft', "setBook('moi'); S = newStateMOI('Hask'); S.chapter = 1; S.squad = ['tuft','kettle']; migrate(S); save();", 'b3c_knight', "b3DeckCard(1).txt", {}],
  ['moi', 2, 'sohra', "setBook('moi'); S = newStateMOI('Hask'); S.chapter = 2; S.squad = ['sohra','kettle']; migrate(S); save();", 'b3c_gate', "b3DeckCard(2).txt", {}],
  ['moi', 6, 'benna', "setBook('moi'); S = newStateMOI('Hask'); S.chapter = 6; S.squad = ['kettle']; migrate(S); save();", 'b3c_kingchains', "b3DeckCard(6).txt", {}],
  ['hoc', 1, 'marrow', "setBook('hoc'); S = newStateHOC('Hask'); S.chapter = 1; migrate(S); save();", 'b2c_soldier', "b4DeckCard(1).txt", {}],
  ['hoc', 3, 'tallow', "setBook('hoc'); S = newStateHOC('Hask'); S.chapter = 3; S.squad = ['sgt','tallow','tangle']; migrate(S); save();", 'b4c_knightchains', "b4DeckCard(3).txt", {}],
  ['hoc', 7, 'oldninth', "setBook('hoc'); S = newStateHOC('Hask'); S.chapter = 7; S.squad = ['sgt','haddat']; migrate(S); save();", 'b4c_leper', "b4DeckCard(7).txt", {}],
  ['mt', 1, 'perrit', "setBook('mt'); S = newStateMT('Hask'); S.chapter = 1; migrate(S); save();", 'b5t_throne', "b5TileCard(1).txt", {}],
  ['mt', 6, 'tilewoman', "setBook('mt'); S = newStateMT('Hask'); S.chapter = 6; S.squad = ['sgt','thegg']; migrate(S); save();", 'b5t_axe', "b5TileCard(6).txt", {}],
];
const NUM = ['no', 'one', 'two', 'three', 'four', 'five', 'six'], ORD = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
for (const [book, ch, label, setup, card, node, opt] of CASES) {
  const r0 = await ev(({ setup, card, opt }) => { eval(setup); S.card = card; window.__caps = []; cardSequence(() => {}, opt);
    const sp = (opt.spread && SPREADS[opt.spread]) || readingSpread(readingReader());
    return {reader:readingReader(), all:sp.slots.length, ref:sp.slots.filter(s => !s.ans).length, bones:!!sp.bones}; }, { setup, card, opt });
  await page.waitForTimeout(6300);
  const r1 = await ev(({ node }) => { const caps = window.__caps.slice(); $('#cfGo').click(); return {caps, txt:eval(node)}; }, { node });
  await page.waitForTimeout(700);
  const tag = `${book} ch${ch} ${label}`, caps = [...new Set(r1.caps)], txt = r1.txt || '';
  if (r0.bones) {
    ok(caps.some(c => /throw/.test(c)) && caps.some(c => /^Again\.$/.test(c)) && /Two throws .* The third/.test(txt), `${tag}: three throws on the screen and in the words (${caps.length} captions)`);
    continue;
  }
  const refCaps = caps.filter(c => /refuses|^And the |^Nor the |shows nothing/.test(c));
  const ans = caps.find(c => /does not\.$|^The last tile does\.$/.test(c)) || '';
  const lay = caps.find(c => new RegExp(`^(${NUM.join('|')}) cards\\b`, 'i').test(c)) || ''; // a lay line that counts them ("Two down, one up" counts the refused)
  const layN = lay ? NUM.indexOf(lay.split(/[ ,.]/)[0].toLowerCase()) : -1;
  ok(refCaps.length === r0.ref, `${tag}: ${r0.ref} refused on the table, ${refCaps.length} refusals said on the screen: ${JSON.stringify(refCaps)}`);
  ok(ans && (/last tile/.test(ans) || ans.startsWith(`The ${ORD[r0.ref]} `)), `${tag}: the one that answers is the ${ORD[r0.ref]}: "${ans}"`);
  ok(layN < 0 || layN === r0.all, `${tag}: the lay line counts ${r0.all}: "${lay || '(names no number)'}"`);
  const m = txt.match(/(\w+) (cards|tiles) refuse \w+\. The (\w+) does not/) || txt.match(/The first (\w+) show \w+ nothing/);
  const said = m ? NUM.indexOf(m[1].toLowerCase()) : -1, saidOrd = m && m[3] ? ORD.indexOf(m[3]) : r0.ref;
  ok(said === r0.ref && saidOrd === r0.ref, `${tag}: the words after say ${r0.ref} refused, the ${ORD[r0.ref]} answering: "${(m && m[0]) || txt.slice(0, 120)}"`);
}
ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.kill();
console.log(fail ? 'readwords: FAIL' : 'readwords: all ok'); process.exit(fail);
