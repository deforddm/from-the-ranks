// Book Four's seven Deck visions (78_b4_visions.js, art 78b): each is reached the way a player reaches it, from its chapter's reading in
// Book Four (b4_c<n>_deck → the card screen → "✦ Look into the card"), played to the end, and lands back on that chapter's card node
// (b4_c<n>_card), counted as the reader's; and each is played from the journal with every choice picked at least once. Each run is done
// with each of Book Four's readers, set up the real way (70's VISREADER): Marrow in the squad; Marrow out and Tallow in; neither (the old
// soldier of the 9th). No page errors, no undefined/NaN/${ in the text, no bare "—" button; the closing step is spoken by the reader and
// draws the reader's figure; a second watching gets 36b's replay line. The journal lists Book Four's visions only in Book Four, by chapter
// reached; Book One's, Two's and Three's lists and visionFor are unchanged. Every backdrop paints at phone width. The words keep the
// book's closed doors (hoc-canon §5, §10; series-canon §(a)): no never-use name, no Burn's Sleep year, never "Bonehunters", never the
// Adjunct's name, nothing tying Sha'ik to a sister in the army.
// While Chapter 7 is not in this checkout, its reading nodes are stood in for here with 70c's own b4DeckOffer(7) / b4DeckCard(7).
// Usage: node tools/b4visions_test.mjs   (build first; exit 1 on a failure)
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const BAD = /\bundefined\b|\bNaN\b|\$\{|\[object/;
const READERS = [{id:'marrow', name:'Marrow', fig:'marrow', line:/^Marrow lets the card go/, sh:'She'},
  {id:'tallow', name:'Tallow', fig:'tallow', line:/^Tallow puts the card face down/, sh:'He'},
  {id:'oldninth', name:'The old soldier', fig:'b4v_oldninth', line:/^The old soldier lets the card go/, sh:'He'}];
// a Book Four sergeant on the map in chapter ch, with the reader the squad gives (Marrow; else Tallow; else the old soldier)
const setup = (ch, rid) => ev(([ch, rid]) => {
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  setBook('hoc'); S = newStateHOC('Hask'); S.chapter = ch; S.picksDue = []; S.seenVisions = []; S.tuftVisions = []; notes = [];
  if (rid !== 'marrow') S.squad = S.squad.filter(k => k !== 'marrow');
  if (rid === 'tallow' && !S.squad.includes('tallow')) S.squad.push('tallow');
  if (rid === 'oldninth') S.squad = S.squad.filter(k => k !== 'tallow');
  if (!DLG[`b4_c${ch}_deck`]) { DLG[`b4_c${ch}_deck`] = () => b4DeckOffer(ch); DLG[`b4_c${ch}_card`] = () => b4DeckCard(ch); } // Chapter 7 not merged yet
  const area = CHAPTERS[ch] ? CHAPTERS[ch].area.id : CHAPTERS[6].area.id;
  save(); startExplore(area);
  return visReader().id;
}, [ch, rid]);
const journalIds = () => ev(() => { openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
  const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); $('#modal').hidden = true; return ids; });

// ---- registration ----
const reg = await ev(() => ({b4:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'hoc').map(k => [k, VISIONS[k].ch, !VISIONS[k].cards]),
  b3:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'moi'), b2:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'dg'), b1:VISION_IDS.slice(),
  bgs:[...new Set(Object.keys(VISIONS).filter(k => VISIONS[k].book === 'hoc').flatMap(k => [VISIONS[k].bg, ...VISIONS[k].steps.map(s => s.bg).filter(Boolean)]))].filter(b => !VISBG[b]),
  figs:[...new Set(Object.keys(VISIONS).filter(k => VISIONS[k].book === 'hoc').flatMap(k => [VISIONS[k].fig, ...VISIONS[k].steps.map(s => s.fig).filter(f => typeof f === 'string' && f)]))],
  art:['b4v_trull', 'b4v_onrack', 'b4v_gamet', 'b4v_havok', 'b4v_pearl', 'b4v_heboric_jade', 'b4v_shaik_armour', 'b4v_tearswoman', 'b4v_oldninth'].filter(f => !FIGX[f])}));
ok(reg.b4.length === 7 && reg.b4.every(([k, ch, nc], i) => k === `b4v${i + 1}` && ch === i + 1 && nc), `seven Book Four visions b4v1..b4v7, one per chapter, none keyed by card (${reg.b4.map(x => x[0]).join(' ')})`);
ok(!reg.bgs.length, `every Book Four vision backdrop is a VISBG entry ${reg.bgs.join(' ')}`);
ok(!reg.art.length, `78b's new figures are all drawn ${reg.art.join(' ')}`);
ok(reg.b1.length === 10 && reg.b1.every(k => !/^b[234]v/.test(k)), `Book One's VISION_IDS unchanged (${reg.b1.length})`);
ok(reg.b2.length === 7 && reg.b3.length === 7, `Books Two and Three still have their seven (${reg.b2.join(' ')} / ${reg.b3.join(' ')})`);
const figOk = await ev(figs => figs.filter(f => !FIGX[f]), reg.figs);
ok(!figOk.length, `every vision figure exists (${reg.figs.join(' ')}) ${figOk.join(' ')}`);

// ---- the closed doors: every word of every vision, all choices taken ----
const words = await ev(() => { const out = [];
  setBook('hoc'); S = newStateHOC('W');
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'hoc').forEach(id => { const V = VISIONS[id];
    out.push(V.who, V.where, V.cap);
    const sets = {}; V.steps.forEach(st => (st.ch || []).forEach(c => { (sets[c.set[0]] ||= []).push(c.set[1]); }));
    const keys = Object.keys(sets); for (let r = 0; r < 2; r++) { keys.forEach(k => { S.f[k] = sets[k][r % sets[k].length]; });
      V.steps.forEach(st => { out.push(typeof st.txt === 'function' ? st.txt() : st.txt); (st.ch || []).forEach(c => out.push(c.t)); if (st.go) out.push(st.go); }); } });
  return out.join('\n'); });
const NEVER = [/Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|\bTalon\b|\bEel\b|T'orrud/, /Burn's Sleep|\b1\d{3}\b/, /Bonehunter/, /Tavore/, /Felisin/, /First Sword/, /Crippled God|Chained One|Master of the Deck/, /Y'Ghatan/, /Hanavat|Picker|Duiker|Mallick/];
NEVER.forEach(re => { const m = words.match(new RegExp('.{0,40}' + re.source + '.{0,40}')); ok(!m, `no ${re.source} in the visions ${m ? '"' + m[0] + '"' : ''}`); });
ok(!/!\s/.test(words.replace(/"[^"]*"/g, '')), 'no exclamation marks in the narration');
const v6 = await ev(() => { const V = VISIONS.b4v6, t = V.steps.map(st => typeof st.txt === 'function' ? st.txt() : st.txt).join(' '); return {sister:(t.match(/sister/g) || []).length, adj:/Adjunct|army|Malazan|Fourteenth/.test(t)}; });
ok(v6.sister === 1 && !v6.adj, `Sha'ik thinks "her sister" once, and nothing in her vision ties the sister to the army (${v6.sister}, ${v6.adj})`);

// ---- Books One, Two and Three: their journals and visionFor are as they were ----
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
const b3 = await ev(() => { document.querySelectorAll('#modal,#chars,#settings').forEach(e => e.hidden = true); setBook('moi'); S = newStateMOI('Hask'); S.chapter = 7; S.picksDue = []; save();
  startExplore(CHAPTERS[7].area.id); openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
  const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); $('#modal').hidden = true;
  return {ids, vf:[1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b3c_knight')).join()}; });
ok(b3.ids.join() === reg.b3.join() && b3.vf === 'b3v1,b3v2,b3v3,b3v4,b3v5,b3v6,b3v7', `Book Three's journal and visionFor are unchanged (${b3.ids.join(' ')})`);

// ---- Book Four: readers, the journal by chapter reached, visionFor ----
for (const r of READERS) { const got = await setup(1, r.id); ok(got === r.id, `Book Four's reader set up the real way: ${r.id} (got ${got})`); }
for (const ch of [1, 4, 7]) {
  await setup(ch, 'marrow');
  const ids = await journalIds();
  ok(ids.join() === reg.b4.slice(0, ch).map(x => x[0]).join(), `Book Four chapter ${ch}: the journal lists ${ch} vision(s), all Book Four's (${ids.join(' ')})`);
}
const vf4 = await ev(() => [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b2c_soldier')).concat([visionFor(3, 'b4c_knightchains'), visionFor(6, 'b4c_leper'), visionFor(2, 'blank')]));
ok(vf4.join() === 'b4v1,b4v2,b4v3,b4v4,b4v5,b4v6,b4v7,b4v3,b4v6,', 'Book Four\'s visionFor gives each chapter its vision, for any card (the Chains cards too) but the blank');

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

for (const [id, ch] of reg.b4) {
  const runs = await ev(id => Math.max(1, ...VISIONS[id].steps.map(s => s.ch ? s.ch.length : 1)), id);
  for (const r of READERS) {
    // 1. from the chapter's reading: the deck node, the draw, the card screen, "Look into the card"; back to the card node afterwards
    await setup(ch, r.id);
    const card = await ev(async ([id, ch]) => { const wait = ms => new Promise(f => setTimeout(f, ms));
      talk(`b4_c${ch}_deck`); await wait(60); const b = [...document.querySelectorAll('#sheet .choice')].find(x => /draw/.test(x.textContent)); if (!b) return {err:'no draw button'}; b.click(); await wait(250);
      const fx = $('#cardfx'), vb = document.querySelector('#cfVis'); if (!vb) return {err:`no "Look into the card" (card ${S.card}, cardfx ${fx && !fx.hidden})`};
      const label = vb.textContent.trim(); vb.click(); await wait(150); return {label, vis:VIS && VIS.id, card:S.card}; }, [id, ch]);
    if (card.err) { ok(false, `${id} (${r.name}): reachable from b4_c${ch}_card's reading: ${card.err}`); continue; }
    const o = await stepThrough(1);
    const back = await ev(id => ({ node:S.node, sp:($('#sheet .sp') || {}).textContent || '', sheet:!$('#sheet').hidden, mine:(S.tuftVisions || []).includes(id), seen:(S.seenVisions || []).includes(id), body:document.body.classList.contains('vision') }), id);
    ok(card.vis === id && !o.probs.length && [...o.dashes].length === 0, `${id} (${r.name}): from Chapter ${ch}'s reading ("${card.label}", ${card.card}) it plays, ${o.steps} steps, text clean ${o.probs.slice(0, 3).join(' | ')}`);
    ok(o.last.sp === r.name && r.line.test(o.last.txt) && o.last.fig === r.fig, `${id} (${r.name}): it ends in ${r.name}'s own words with ${r.name}'s figure ("${(o.last.txt || '').slice(0, 56)}…", ${o.last.fig})`);
    ok(back.node === `b4_c${ch}_card` && back.sheet && /Deck of Dragons/.test(back.sp) && back.mine && back.seen && !back.body, `${id} (${r.name}): back on b4_c${ch}_card afterwards (node ${back.node}, "${back.sp}"), counted as the reader's`);
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
    ok(ends[0].sp === r.name && new RegExp(`${r.name} lets the card go\\. ${r.sh} doesn.t say anything`).test(ends[0].txt) && ends[0].fig === r.fig, `${id} (${r.name}): from the journal the last step is the reader's, with the reader's figure (${ends[0].fig})`);
    if (ends[1]) ok(new RegExp(`${r.sh} has watched this one before`).test(ends[1].txt), `${id} (${r.name}): watched again, "has watched this one before"`);
  }
}

// every backdrop of every step paints at phone width without throwing
const paint = await ev(() => { const out = []; const cv = document.createElement('canvas'); cv.style.cssText = 'width:360px;height:154px;position:fixed;left:0;top:0'; document.body.appendChild(cv);
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'hoc').forEach(id => VISIONS[id].steps.forEach((st, i) => { [0, 3000, 17000].forEach(t => { try { drawVision(cv, {id, bg:st.bg || VISIONS[id].bg, fig:st.fig != null ? st.fig : VISIONS[id].fig, step:i}, t); } catch (e) { out.push(`${id}/${i}: ${e.message}`); } }); }));
  cv.remove(); return out; });
ok(!paint.length, 'every Book Four vision backdrop paints at phone width ' + paint.slice(0, 4).join(' | '));
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
