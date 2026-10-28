// v6.11.0: the Deck reading on a table. Every place the squad reads at has a table (21b READTABLE, keyed book:chapter), each table paints
// without an error and is not one flat colour; each reader's deck has its own back and its own spread; the sequence runs in every book
// with every reader (the table fades in, the words come up at 5.6 s, a tap hurries it, the way out fades and gives the music back,
// Back hurries it like a tap and then puts the cards away); Sohra's bones; the vision button; reduced motion. Prints the frame cost.
// Usage: node tools/reading_test.mjs   (exit 1 on a failure or a page error)
import { server, browser as launch, openGame } from './page.mjs';
const srv = await server(); const br = await launch();
const { page, errors } = await openGame(br, srv.url, { settings: { master: 0, music: 0, sfx: 0, amb: 0, motion: 'on', shake: false, speed: 1 } });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const wait = ms => page.waitForTimeout(ms);

/* 1. the tables: one for every reading place, each paints and is not flat */
const tables = await ev(() => { const out = {keys:Object.keys(READTABLE), bad:[], flat:[], resolved:{}};
  const probe = (key, W, H) => { const cv = makeReadingTable(READTABLE[key], W, H, 1, 'tuft', {deckX:W/2 - 50, deckY:H*.8, CW:100, CH:150}); const d = cv.getContext('2d').getImageData(0, 0, W, H).data; const seen = new Set(); for (let i = 0; i < d.length; i += 4 * 97) seen.add((d[i] >> 4) + ',' + (d[i+1] >> 4) + ',' + (d[i+2] >> 4)); return seen.size; };
  for (const k of out.keys) { try { const n = probe(k, 390, 844), m = probe(k, 1280, 720); if (n < 6 || m < 6) out.flat.push(k + ':' + n + '/' + m); } catch (e) { out.bad.push(k + ': ' + e.message); } }
  const want = (book, ch, setup) => { setup(); return readingTableKey(); };
  for (let ch = 0; ch <= 7; ch++) out.resolved['gotm:' + ch] = want('gotm', ch, () => { S = newState('Hask'); S.chapter = ch; migrate(S); });
  out.resolved['gotm:6self'] = (() => { S = newState('Hask'); S.chapter = 6; migrate(S); return readingTableKey({self:true}); })();
  for (let ch = 1; ch <= 7; ch++) out.resolved['dg:' + ch] = want('dg', ch, () => { setBook('dg'); S = newStateDG('Hask'); S.chapter = ch; migrate(S); });
  for (let ch = 1; ch <= 6; ch++) out.resolved['moi:' + ch] = want('moi', ch, () => { setBook('moi'); S = newStateMOI('Hask'); S.chapter = ch; migrate(S); });
  out.resolved['moi:7a'] = want('moi', 7, () => { setBook('moi'); S = newStateMOI('Hask'); S.chapter = 7; S.f.b3_flew = 1; migrate(S); });
  out.resolved['moi:7b'] = want('moi', 7, () => { setBook('moi'); S = newStateMOI('Hask'); S.chapter = 7; S.f.b3_river = 1; migrate(S); });
  for (let ch = 1; ch <= 7; ch++) out.resolved['hoc:' + ch] = want('hoc', ch, () => { setBook('hoc'); S = newStateHOC('Hask'); S.chapter = ch; migrate(S); }); // v7.0: Book Four's seven places
  for (let ch = 1; ch <= 7; ch++) out.resolved['mt:' + ch] = want('mt', ch, () => { setBook('mt'); S = newStateMT('Hask'); S.chapter = ch; migrate(S); }); // v8.0: Book Five's seven places
  return out; });
ok(tables.keys.length >= 38, `${tables.keys.length} tables (Book One 9, Book Two 7, Book Three 8, Book Four 7, Book Five 7)`);
ok(!tables.bad.length, 'every table paints without an error' + (tables.bad.length ? ': ' + tables.bad.join('; ') : ''));
ok(!tables.flat.length, 'no table is one flat colour' + (tables.flat.length ? ': ' + tables.flat.join(', ') : ''));
const unresolved = Object.entries(tables.resolved).filter(([k, v]) => v !== k || !tables.keys.includes(v));
ok(!unresolved.length, 'every reading place resolves to its own table' + (unresolved.length ? ': ' + unresolved.map(([k, v]) => k + '→' + v).join(', ') : ''));

/* 2. the decks' backs: one per reader, each its own; and the spreads */
const backs = await ev(() => { const sig = {}; for (const r of ['tuft', 'marrow', 'yedda', 'kanese', 'benna', 'sohra', 'tallow', 'oldninth']) { const cv = document.createElement('canvas'); cv.width = 120; cv.height = 180; const ctx = cv.getContext('2d'); DECKBACK_NOW = r; drawCard(ctx, null, 120, 180, false, 0); const d = ctx.getImageData(0, 0, 120, 180).data; let h = 0; for (let i = 0; i < d.length; i += 4) h = (h * 31 + d[i] + d[i+1] * 3 + d[i+2] * 7) | 0; sig[r] = h; } DECKBACK_NOW = 'tuft';
  const sp = {}; for (const r of ['tuft', 'marrow', 'yedda', 'kanese', 'benna', 'sohra', 'tallow', 'oldninth']) { const s = readingSpread(r); sp[r] = {n:s.slots.length, ans:s.slots.filter(x => x.ans).length, bones:!!s.bones, name:READER_SPREAD[r]}; }
  return {sig, sp, nowAfter:DECKBACK_NOW}; });
ok(new Set(Object.values(backs.sig)).size === 8, 'eight readers, eight different deck backs (Book Four adds Tallow\'s grandmother\'s deck and the old soldier\'s)');
/* v8.0 Book Five: tiles, not cards. Perrit's black stone and the tile-woman's bone have their own backs; each reader her own spread; every tile face draws */
const tiles = await ev(() => { const out = {}; setBook('mt'); S = newStateMT('Hask'); migrate(S); const sig = {};
  for (const r of ['perrit', 'tilewoman']) { const cv = document.createElement('canvas'); cv.width = 120; cv.height = 180; const ctx = cv.getContext('2d'); DECKBACK_NOW = r; drawCardFlip(ctx, null, 0, 0, 120, 180, 0, 0); const d = ctx.getImageData(0, 0, 120, 180).data; let h = 0, top = 0; for (let i = 0; i < d.length; i += 4) h = (h * 31 + d[i] + d[i+1] * 3 + d[i+2] * 7) | 0; for (let i = 0; i < 120 * 6 * 4; i += 4) top += d[i + 3]; sig[r] = h; out['square_' + r] = top === 0; }
  out.backs = sig; out.faces = []; Object.keys(B5TILES).forEach(id => { const cv = document.createElement('canvas'); cv.width = 120; cv.height = 120; const ctx = cv.getContext('2d'); DECKBACK_NOW = 'perrit'; try { drawHoldTile(ctx, id, 120, true, 0); const d = ctx.getImageData(0, 0, 120, 120).data; const seen = new Set(); for (let i = 0; i < d.length; i += 4 * 37) seen.add(d[i] >> 4); if (seen.size < 3) out.faces.push(id + ':flat'); } catch (e) { out.faces.push(id + ':' + e.message); } });
  DECKBACK_NOW = 'tuft'; out.sp = {perrit:READER_SPREAD.perrit, tilewoman:READER_SPREAD.tilewoman, pAns:readingSpread('perrit').slots.filter(x => x.ans).length, tAns:readingSpread('tilewoman').slots.filter(x => x.ans).length};
  out.square = CARDBOOK.square(); out.done = CARDBOOK.done(); out.look = CARDBOOK.look(); S = newState('Hask'); out.squareOff = CARDBOOK.square(); return out; });
ok(tiles.backs.perrit !== tiles.backs.tilewoman && tiles.square_perrit && tiles.square_tilewoman, `Book Five: Perrit's stone and the tile-woman's bone have their own backs, and they lie square (${JSON.stringify(tiles.backs)})`);
ok(!tiles.faces.length, 'every tile of the Holds draws a face' + (tiles.faces.length ? ': ' + tiles.faces.join(', ') : ''));
ok(tiles.sp.perrit === 'spiral5' && tiles.sp.tilewoman === 'row4' && tiles.sp.pAns === 1 && tiles.sp.tAns === 1, `Perrit lays a spiral, the tile-woman a row with one above (${JSON.stringify(tiles.sp)})`);
ok(tiles.square && tiles.done === 'Gather the tiles' && tiles.look === 'Look into the tile' && !tiles.squareOff, 'the reading lays square tiles in Book Five only, and gathers them');
ok(backs.sp.tallow.name === 'step3' && backs.sp.oldninth.name === 'pair3', 'Tallow lays them as the old woman did; the old soldier crosses two on the ground');
ok(Object.values(backs.sp).every(s => s.ans === 1), 'every spread has one card that answers');
ok(backs.sp.marrow.n === 5 && backs.sp.marrow.name === 'cross5', "Marrow's temple cross: five cards");
ok(backs.sp.sohra.bones && backs.sp.sohra.n === 6, "Sohra throws the bones: five in a ring and the card");
ok(backs.sp.tuft.name === 'row3' && backs.sp.yedda.name === 'rope3' && backs.sp.kanese.name === 'fan3' && backs.sp.benna.name === 'askew3', 'Tuft a row, Yedda the rope, the old Kanese a fan, Benna askew');

/* 3. the sequence, in every book with every reader */
const CASES = [
  ['gotm', 3, 'tuft', "S = newState('Hask'); S.chapter = 3; migrate(S); save();", 'magi'],
  ['gotm', 0, 'tuft', "S = newState('Hask'); S.chapter = 0; migrate(S); save();", 'oponn'],
  ['dg', 1, 'marrow', "setBook('dg'); S = newStateDG('Hask'); S.chapter = 1; S.squad = ['marrow','tangle']; migrate(S); save();", 'b2c_king'],
  ['dg', 5, 'yedda', "setBook('dg'); S = newStateDG('Hask'); S.chapter = 5; S.squad = ['tangle']; S.f.b2_yedda = 1; migrate(S); save();", 'b2c_queen'],
  ['dg', 7, 'kanese', "setBook('dg'); S = newStateDG('Hask'); S.chapter = 7; S.squad = ['tangle']; migrate(S); save();", 'b2c_mason'],
  ['moi', 1, 'tuft', "setBook('moi'); S = newStateMOI('Hask'); S.chapter = 1; S.squad = ['tuft','kettle']; migrate(S); save();", 'b3c_knight'],
  ['moi', 2, 'sohra', "setBook('moi'); S = newStateMOI('Hask'); S.chapter = 2; S.squad = ['sohra','kettle']; migrate(S); save();", 'b3c_gate'],
  ['moi', 6, 'benna', "setBook('moi'); S = newStateMOI('Hask'); S.chapter = 6; S.squad = ['kettle']; migrate(S); save();", 'b3c_kingchains'],
  ['hoc', 1, 'marrow', "setBook('hoc'); S = newStateHOC('Hask'); S.chapter = 1; migrate(S); save();", 'b2c_soldier'],
  ['hoc', 3, 'tallow', "setBook('hoc'); S = newStateHOC('Hask'); S.chapter = 3; S.squad = ['sgt','tallow','tangle']; migrate(S); save();", 'b4c_knightchains'],
  ['hoc', 7, 'oldninth', "setBook('hoc'); S = newStateHOC('Hask'); S.chapter = 7; S.squad = ['sgt','haddat']; migrate(S); save();", 'b4c_leper'],
  ['mt', 1, 'perrit', "setBook('mt'); S = newStateMT('Hask'); S.chapter = 1; migrate(S); save();", 'b5t_throne'],
  ['mt', 4, 'perrit', "setBook('mt'); S = newStateMT('Hask'); S.chapter = 4; migrate(S); save();", 'b5t_wall'],
  ['mt', 6, 'tilewoman', "setBook('mt'); S = newStateMT('Hask'); S.chapter = 6; S.squad = ['sgt','thegg']; migrate(S); save();", 'b5t_axe'],
];
for (const [book, ch, reader, setup, card] of CASES) {
  const r0 = await ev(({ setup, card }) => { eval(setup); S.card = card; AUDIO.setScene('explore'); const want0 = AUDIO._dev.state.want; cardSequence(() => { window.__done = (window.__done || 0) + 1; }, {}); return {reader:readingReader(), key:readingTableKey(), back:DECKBACK_NOW, want0, hidden:$('#cardfx').hidden, text:$('#cfText').classList.contains('show')}; }, { setup, card });
  await wait(300);
  const r1 = await ev(() => ({ inCls:$('#cardfx').classList.contains('in'), want:AUDIO._dev.state.want, anim:!!cardAnim, shown:!!$('#cardfx').dataset.shown }));
  await wait(6400);
  const r2 = await ev(() => ({ text:$('#cfText').classList.contains('show'), shown:!!$('#cardfx').dataset.shown, btn:!!$('#cfGo'), label:$('#cfGo').textContent, tbl:getComputedStyle($('#cardfx')).getPropertyValue('--tbl').trim() }));
  await ev(() => $('#cfGo').click()); const r3 = await ev(() => ({ hiddenNow:$('#cardfx').hidden, inCls:$('#cardfx').classList.contains('in'), done:window.__done }));
  await wait(800);
  const r4 = await ev(() => ({ hidden:$('#cardfx').hidden, anim:!!cardAnim, back:DECKBACK_NOW, want:AUDIO._dev.state.want, html:$('#cardfx').innerHTML.length }));
  const tag = `${book} ch${ch} ${reader}`;
  ok(r0.reader === reader && r0.back === reader, `${tag}: the reader and the deck on the table (${r0.key})`);
  ok(!r0.text && r1.inCls && r1.anim && !r1.shown, `${tag}: the table fades in and the words wait`);
  ok(r1.want === 'dark', `${tag}: the Deck's music while it is out (was ${r0.want0}, now ${r1.want})`);
  ok(r2.text && r2.shown && r2.btn && /^rgba\(/.test(r2.tbl), `${tag}: the words are up by 6.7 s under the table's dark (${r2.tbl}); the button says "${r2.label}"`);
  ok(reader !== 'sohra' || /Gather the bones/.test(r2.label), `${tag}: Sohra's button gathers the bones`);
  ok(book !== 'mt' || /Gather the tiles/.test(r2.label), `${tag}: Book Five's button gathers the tiles`);
  ok(!r3.hiddenNow && !r3.inCls && r3.done >= 1, `${tag}: putting the cards away calls back at once and starts the fade`);
  ok(r4.hidden && !r4.anim && r4.back === 'tuft' && r4.html === 0 && r4.want === r0.want0, `${tag}: after the fade the table is gone and the music is back (${r4.want})`);
}

/* 4. a tap hurries it; Back hurries it and then puts the cards away; the vision button; reduced motion */
await ev(() => { S = newState('Hask'); S.chapter = 1; migrate(S); save(); S.card = 'hounds'; cardSequence(() => { window.__done2 = 1; }, {}); });
await wait(500); await ev(() => $('#cardfx').click()); await wait(350);
const tap = await ev(() => ({ shown:!!$('#cardfx').dataset.shown, text:$('#cfText').classList.contains('show'), vis:!!$('#cfVis') }));
ok(tap.shown && tap.text, 'a tap on the table hurries the reading to the words');
ok(tap.vis, 'a card with a vision in it offers "Look into the card"');
await ev(() => $('#cfVis').click()); await wait(600);
const vis = await ev(() => ({ view, visOn:!!VIS, hidden:$('#cardfx').hidden }));
ok(vis.view === 'scene' && vis.visOn && vis.hidden, 'looking into the card opens the vision and the table is gone');
await ev(() => { VIS = null; document.body.classList.remove('vision'); $('#sheet').hidden = true; view = 'explore'; });
await ev(() => { S = newState('Hask'); S.chapter = 2; migrate(S); save(); S.card = 'raven'; cardSequence(() => { window.__done3 = 1; }, {}); });
await wait(400); const b1 = await ev(() => ({ took:backTop(), shown:!!$('#cardfx').dataset.shown })); await wait(300);
const b2 = await ev(() => ({ shown:!!$('#cardfx').dataset.shown, took:backTop(), done:window.__done3 }));
ok(b1.took && !b1.shown && b2.shown && b2.took && b2.done === 1, 'Back during a reading hurries it; Back once the words are up puts the cards away');
await wait(800);
await ev(() => { SET.motion = 'off'; S = newState('Hask'); S.chapter = 5; migrate(S); save(); S.card = 'herald'; cardSequence(() => { window.__done4 = 1; }, {}); });
await wait(2700); const rm = await ev(() => ({ text:$('#cfText').classList.contains('show') })); await ev(() => $('#cfGo').click()); const rm2 = await ev(() => ({ hidden:$('#cardfx').hidden, done:window.__done4 })); await ev(() => { SET.motion = 'on'; });
ok(rm.text && rm2.hidden && rm2.done === 1, 'reduced motion: the words are up within 2.7 s and the way out is instant');

/* 5. the frame cost, on this machine (no GPU): a number to watch, not a gate */
await ev(() => { setBook('dg'); S = newStateDG('Hask'); S.chapter = 2; S.squad = ['marrow']; migrate(S); save(); S.card = 'b2c_queen'; cardSequence(() => {}, {}); });
await wait(3000);
const cost = await ev(() => { const t0 = performance.now(); for (let i = 0; i < 30; i++) cardAnim(); return (performance.now() - t0) / 30; });
await ev(() => $('#cfGo').click()); await wait(700);
console.log(`info  a frame of the reading costs ${cost.toFixed(1)} ms here (software rendering)`);
ok(cost < 80, 'a frame of the reading is not absurd even without a GPU');

ok(!errors.length, 'no page errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
await br.close(); srv.kill(); process.exit(fail);
