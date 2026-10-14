// Book Three's seven Deck visions (68_b3_visions.js, art 68b): each is reached the way a player reaches it, from its chapter's reading in
// Book Three (b3_c<n>_deck → the card screen → "✦ Look into the card"), played to the end, and lands back on that chapter's card node
// (b3_c<n>_card), counted as the reader's; and each is played from the journal with every choice picked at least once. Each run is done
// with each of Book Three's readers, set up the real way (60's VISREADER): Tuft in the squad; Tuft out and Sohra in; neither (Old Benna).
// No page errors, no undefined/NaN/${ in the text, no bare "—" button; the closing step is spoken by the reader and draws the reader's
// figure; a second watching gets 36b's replay line. The journal lists Book Three's visions only in Book Three, by chapter reached; Book
// One's and Book Two's lists and visionFor are unchanged. Every backdrop paints at phone width.
// Usage: node tools/b3visions_test.mjs   (exit 1 on a failure)
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const BAD = /\bundefined\b|\bNaN\b|\$\{|\[object/;
const READERS = [{id:'tuft', name:'Tuft', fig:'tuft', line:/^Tuft lets the card go[\s\S]*Her hands are cold\.$/},
  {id:'sohra', name:'Sohra', fig:'sohra', line:/^Sohra sweeps the bones together[\s\S]*Her hands are cold\.$/},
  {id:'benna', name:'Old Benna', fig:'b3v_benna', line:/^Old Benna puts the card down[\s\S]*Her hands are cold\.$/}];
// a Book Three sergeant on the map in chapter ch, with the reader the squad gives (Tuft; else Sohra; else Old Benna)
const setup = (ch, rid) => ev(([ch, rid]) => {
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  setBook('moi'); S = newStateMOI('Hask'); S.chapter = ch; S.picksDue = []; S.seenVisions = []; S.tuftVisions = []; notes = [];
  if (rid !== 'tuft') S.squad = S.squad.filter(k => k !== 'tuft');
  if (rid === 'sohra') { b3Join('sohra'); S.picksDue = []; }
  save(); startExplore(CHAPTERS[ch].area.id);
  return visReader().id;
}, [ch, rid]);
const journalIds = () => ev(() => { openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
  const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); $('#modal').hidden = true; return ids; });

// ---- registration ----
const reg = await ev(() => ({b3:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'moi').map(k => [k, VISIONS[k].ch, !VISIONS[k].cards]),
  b2:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'dg'), b1:VISION_IDS.slice(),
  bgs:[...new Set(Object.keys(VISIONS).filter(k => VISIONS[k].book === 'moi').flatMap(k => [VISIONS[k].bg, ...VISIONS[k].steps.map(s => s.bg).filter(Boolean)]))].filter(b => !VISBG[b]),
  figs:[...new Set(Object.keys(VISIONS).filter(k => VISIONS[k].book === 'moi').flatMap(k => [VISIONS[k].fig, ...VISIONS[k].steps.map(s => s.fig).filter(f => typeof f === 'string' && f)]))]}));
ok(reg.b3.length === 7 && reg.b3.every(([k, ch, nc], i) => k === `b3v${i + 1}` && ch === i + 1 && nc), `seven Book Three visions b3v1..b3v7, one per chapter, none keyed by card (${reg.b3.map(x => x[0]).join(' ')})`);
ok(!reg.bgs.length, `every Book Three vision backdrop is a VISBG entry ${reg.bgs.join(' ')}`);
ok(reg.b1.length === 10 && reg.b1.every(k => !/^b[23]v/.test(k)), `Book One's VISION_IDS unchanged (${reg.b1.length})`);
ok(reg.b2.length === 7, `Book Two still has its seven (${reg.b2.join(' ')})`);
const figOk = await ev(figs => figs.filter(f => !FIGX[f] && !['tuft', 'qb', 'kruppe', 'rake', 'paran', 'wj', 'crone'].includes(f)), reg.figs);
ok(!figOk.length, `every vision figure exists (${reg.figs.join(' ')}) ${figOk.join(' ')}`);

// ---- Book One and Book Two: their journals and visionFor are as they were ----
const b1 = await ev(() => { document.querySelectorAll('#modal,#chars,#settings').forEach(e => e.hidden = true); setBook('gotm'); S = newState('Hask'); S.chapter = 7; S.squad = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl']; migrate(S); S.picksDue = []; save();
  startExplore(CHAPTERS[7].area.id); openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
  const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision);
  const vf = [1, 2, 3, 5, 6, 7].map(c => visionFor(c, 'oponn')).concat(['assassin', 'knight', 'oponn', 'herald'].map(c => visionFor(4, c)));
  $('#modal').hidden = true; return {ids, vf}; });
ok(b1.ids.join() === reg.b1.join(), `Book One's journal lists its ten visions, and only those (${b1.ids.length})`);
ok(b1.vf.join() === 'v1_paran,v2_crone,v3_qb,v5_paran,v6_rake,v7_lorn,v4_rallick,v4_hunter,v4_crokus,v4_sorry', 'Book One\'s visionFor is unchanged');
const b2 = await ev(() => { document.querySelectorAll('#modal,#chars,#settings').forEach(e => e.hidden = true); setBook('dg'); S = newStateDG('Hask'); S.chapter = 7; migrate(S); S.picksDue = []; save();
  startExplore(CHAPTERS[7].area.id); openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
  const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); $('#modal').hidden = true;
  return {ids, vf:[1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'oponn')).join()}; });
ok(b2.ids.join() === reg.b2.join() && b2.vf === 'b2v1,b2v2,b2v3,b2v4,b2v5,b2v6,b2v7', `Book Two's journal and visionFor are unchanged (${b2.ids.join(' ')})`);

// ---- Book Three: readers, the journal by chapter reached, visionFor ----
for (const r of READERS) { const got = await setup(1, r.id); ok(got === r.id, `Book Three's reader set up the real way: ${r.id} (got ${got})`); }
for (const ch of [1, 4, 7]) {
  await setup(ch, 'tuft');
  const ids = await journalIds();
  ok(ids.join() === reg.b3.slice(0, ch).map(x => x[0]).join(), `Book Three chapter ${ch}: the journal lists ${ch} vision(s), all Book Three's (${ids.join(' ')})`);
}
const vf3 = await ev(() => [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b3c_knight')).concat([visionFor(4, 'b3c_kingchains'), visionFor(3, 'blank')]));
ok(vf3.join() === 'b3v1,b3v2,b3v3,b3v4,b3v5,b3v6,b3v7,b3v4,', 'Book Three\'s visionFor gives each chapter its vision, for any card but the blank');

// ---- stepping a vision to its end ----
const stepThrough = async (run) => { const probs = [], dashes = new Set(); let steps = 0, last = {};
  for (let i = 0; i < 40; i++) {
    const st = await ev(() => ({ vis:!!VIS, step:VIS && VIS.step, fig:VIS && VIS.fig, sp:($('#sheet .sp') || {}).textContent || '', txt:($('#sheet .txt') || {}).textContent || '',
      text:($('#app').innerText || '') + '\n' + ($('#sheet').hidden ? '' : $('#sheet').innerText), btns:[...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()) }));
    if (!st.vis) break;
    steps++; last = st;
    const m = st.text.match(new RegExp('.{0,40}(' + BAD.source + ').{0,40}'));
    if (m) probs.push(`step ${st.step}: "${m[0].replace(/\n/g, ' ')}"`);
    st.btns.forEach(t => { if (t === '—') dashes.add(st.step); });
    if (!st.btns.length) { probs.push(`step ${st.step}: no buttons`); break; }
    await page.click(`#sheet #ch${run % st.btns.length}`); await page.waitForTimeout(40);
  }
  if (await ev(() => !!VIS)) probs.push('never ended');
  return {probs, dashes, steps, last}; };

for (const [id, ch] of reg.b3) {
  const runs = await ev(id => Math.max(1, ...VISIONS[id].steps.map(s => s.ch ? s.ch.length : 1)), id);
  for (const r of READERS) {
    // 1. from the chapter's reading: the deck node, the draw, the card screen, "Look into the card"; back to the card node afterwards
    await setup(ch, r.id);
    const card = await ev(async ([id, ch]) => { const wait = ms => new Promise(f => setTimeout(f, ms));
      talk(`b3_c${ch}_deck`); await wait(60); const b = document.querySelector('#sheet #ch0'); if (!b) return {err:'no draw button'}; b.click(); await wait(250);
      const fx = $('#cardfx'), vb = document.querySelector('#cfVis'); if (!vb) return {err:`no "Look into the card" (card ${S.card}, cardfx ${fx && !fx.hidden})`};
      const label = vb.textContent.trim(); vb.click(); await wait(150); return {label, vis:VIS && VIS.id, card:S.card}; }, [id, ch]);
    if (card.err) { ok(false, `${id} (${r.name}): reachable from b3_c${ch}_card's reading: ${card.err}`); continue; }
    const o = await stepThrough(1);
    const back = await ev(id => ({ node:S.node, sp:($('#sheet .sp') || {}).textContent || '', sheet:!$('#sheet').hidden, mine:(S.tuftVisions || []).includes(id), seen:(S.seenVisions || []).includes(id), body:document.body.classList.contains('vision') }), id);
    ok(card.vis === id && !o.probs.length && [...o.dashes].length === 0, `${id} (${r.name}): from Chapter ${ch}'s reading ("${card.label}", ${card.card}) it plays, ${o.steps} steps, text clean ${o.probs.slice(0, 3).join(' | ')}`);
    ok(o.last.sp === r.name && r.line.test(o.last.txt) && o.last.fig === r.fig, `${id} (${r.name}): it ends in ${r.name}'s own words with ${r.name}'s figure ("${(o.last.txt || '').slice(0, 56)}…", ${o.last.fig})`);
    ok(back.node === `b3_c${ch}_card` && back.sheet && /Deck of Dragons/.test(back.sp) && back.mine && back.seen && !back.body, `${id} (${r.name}): back on b3_c${ch}_card afterwards (node ${back.node}, "${back.sp}"), counted as the reader's`);
    // 2. from the journal, every choice at least once; a second watching gets the replay line
    let probs = [], steps = 0, listed = true, ends = [];
    for (let run = 0; run < runs; run++) {
      await setup(ch, r.id); if (run) await ev(id => { S.seenVisions = [id]; }, id);
      const opened = await ev(id => { openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
        const b = document.querySelector(`#modal [data-vision="${id}"]`); if (!b) return false; b.click(); return true; }, id);
      if (!opened) { listed = false; break; }
      await page.waitForTimeout(120);
      const q = await stepThrough(run); probs.push(...q.probs, ...[...q.dashes].map(d => `bare "—" at step ${d}`)); steps += q.steps; ends.push(q.last);
    }
    ok(listed && !probs.length, `${id} (${r.name}): ${runs} journal run(s), ${steps} steps, every choice, text clean ${listed ? '' : 'NOT LISTED '}${probs.slice(0, 3).join(' | ')}`);
    if (!listed) continue;
    ok(ends[0].sp === r.name && new RegExp(`${r.name} lets the card go\\. She doesn.t say anything`).test(ends[0].txt) && ends[0].fig === r.fig, `${id} (${r.name}): from the journal the last step is the reader's, with the reader's figure (${ends[0].fig})`);
    if (ends[1]) ok(/She has watched this one before/.test(ends[1].txt), `${id} (${r.name}): watched again, "has watched this one before"`);
  }
}

// every backdrop of every step paints at phone width without throwing
const paint = await ev(() => { const out = []; const cv = document.createElement('canvas'); cv.style.cssText = 'width:360px;height:154px;position:fixed;left:0;top:0'; document.body.appendChild(cv);
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'moi').forEach(id => VISIONS[id].steps.forEach((st, i) => { [0, 3000, 17000].forEach(t => { try { drawVision(cv, {id, bg:st.bg || VISIONS[id].bg, fig:st.fig != null ? st.fig : VISIONS[id].fig, step:i}, t); } catch (e) { out.push(`${id}/${i}: ${e.message}`); } }); }));
  cv.remove(); return out; });
ok(!paint.length, 'every Book Three vision backdrop paints at phone width ' + paint.slice(0, 4).join(' | '));
const gl = await ev(() => { setBook('moi'); S = newStateMOI('G'); S.chapter = 7; const row = n => GLOSSX.moi.find(g => g[1] === n), on = n => !!row(n) && (!row(n)[3] || row(n)[3]());
  const before = [on('Saltoan'), on('Ortnal\'s Cut')]; S.seenVisions = ['b3v1', 'b3v6']; return {before, after:[on('Saltoan'), on('Ortnal\'s Cut')]}; });
ok(gl.before.join() === 'false,false' && gl.after.join() === 'true,true', `the glossary's Saltoan and Ortnal's Cut unlock only once their visions are seen (${gl.before} → ${gl.after})`);
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
