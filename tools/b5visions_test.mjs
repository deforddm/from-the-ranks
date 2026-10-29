// Book Five's seven "Through the Tiles" visions (88_b5_visions.js, art 88b): each is reached the way a player reaches it, from its chapter's
// tile reading (b5_c<n>_tiles → "Let her lay them." → the tile screen → "✦ Look into the tile"), played to the end, and lands back on
// that chapter's tile node (b5_c<n>_card), counted as the reader's; and each is played from the journal with every choice picked at
// least once. Each run is done with both of Book Five's readers, set up the real way (80's VISREADER): Perrit in the squad; Perrit out
// (the tile-woman). No page errors, no undefined/NaN/${ in the text, no bare "—" button; the closing step is spoken by the reader and
// draws the reader's figure; a second watching gets 36b's replay line ("lets the tile go"). The journal lists Book Five's visions only
// in Book Five, by chapter reached; Book Four's list and visionFor are unchanged. Every backdrop paints at phone width; the opener of
// each vision names its canon viewpoint; the new figures are all drawn. The words keep the book's closed doors (mt-canon §10, rules
// 31-44, and rule 13): no never-use name, no Burn's Sleep year, nothing of the Shake's blood, Mosag's power never named.
// Usage: node tools/b5visions_test.mjs   (build first; exit 1 on a failure)
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const BAD = /\bundefined\b|\bNaN\b|\$\{|\[object/;
const READERS = [{id:'perrit', name:'Perrit', fig:'perrit', line:/^Perrit turns the tile face down/, sh:'She'},
  {id:'tilewoman', name:'The tile-woman', fig:'b5_c1_tilewoman', line:/^The tile-woman puts her hand/, sh:'She'}];
const setup = (ch, rid) => ev(([ch, rid]) => {
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  setBook('mt'); S = newStateMT('Hask'); S.chapter = ch; migrate(S); S.picksDue = []; S.seenVisions = []; S.tuftVisions = []; notes = [];
  if (rid === 'perrit' && !S.squad.includes('perrit')) S.squad.push('perrit');
  if (rid !== 'perrit') S.squad = S.squad.filter(k => k !== 'perrit');
  save(); startExplore(CHAPTERS[ch].area.id);
  return visReader().id;
}, [ch, rid]);
const journalIds = () => ev(() => { openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
  const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); $('#modal').hidden = true; return ids; });

// ---- registration ----
const reg = await ev(() => ({b5:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'mt').map(k => [k, VISIONS[k].ch, !VISIONS[k].cards]),
  b4:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'hoc'),
  bgs:[...new Set(Object.keys(VISIONS).filter(k => VISIONS[k].book === 'mt').flatMap(k => [VISIONS[k].bg, ...VISIONS[k].steps.map(s => s.bg).filter(Boolean)]))].filter(b => !VISBG[b]),
  figs:[...new Set(Object.keys(VISIONS).filter(k => VISIONS[k].book === 'mt').flatMap(k => [VISIONS[k].fig, ...VISIONS[k].steps.map(s => s.fig).filter(f => typeof f === 'string' && f)]))],
  art:['b5v_trull', 'b5v_kuruqan', 'b5v_yantovis', 'b5v_nekal', 'b5v_moroch', 'b5v_preda', 'b5v_emperor', 'perrit', 'b5_c1_tilewoman'].filter(f => !FIGX[f]),
  openers:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'mt').map(k => { const V = VISIONS[k], t = typeof V.steps[0].txt === 'function' ? V.steps[0].txt() : V.steps[0].txt; return [k, V.who, t.slice(0, 120)]; })}));
ok(reg.b5.length === 7 && reg.b5.every(([k, ch, nc], i) => k === `b5v${i + 1}` && ch === i + 1 && nc), `seven Book Five visions b5v1..b5v7, one per chapter, none keyed by tile (${reg.b5.map(x => x[0]).join(' ')})`);
const WHO = ['Trull Sengar', 'Kuru Qan', 'Yan Tovis', 'Nekal Bara', 'Moroch Nevath', 'Unnutal Hebaz', 'Moroch Nevath'];
ok(reg.openers.every(([k, who, t], i) => who === WHO[i] && t.includes(who.split(' ')[who === 'Unnutal Hebaz' ? 0 : 0])), `each vision's opener is through its canon eyes (${reg.openers.map(o => o[1]).join(', ')})`);
ok(!reg.bgs.length, `every Book Five vision backdrop is a VISBG entry ${reg.bgs.join(' ')}`);
ok(!reg.art.length, `88b's figures and the readers' are all drawn ${reg.art.join(' ')}`);
ok(reg.b4.length === 7, `Book Four still has its seven (${reg.b4.join(' ')})`);
const figOk = await ev(figs => figs.filter(f => !FIGX[f]), reg.figs);
ok(!figOk.length, `every vision figure exists (${reg.figs.join(' ')}) ${figOk.join(' ')}`);

// ---- the closed doors: every word of every vision, all choices taken, both readers ----
const words = await ev(() => { const out = [];
  setBook('mt'); S = newStateMT('W'); migrate(S);
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'mt').forEach(id => { const V = VISIONS[id];
    out.push(V.who, V.where, V.cap);
    const sets = {}; V.steps.forEach(st => (st.ch || []).forEach(c => { (sets[c.set[0]] ||= []).push(c.set[1]); }));
    const keys = Object.keys(sets); for (let r = 0; r < 2; r++) { keys.forEach(k => { S.f[k] = sets[k][r % sets[k].length]; });
      if (r) S.squad = S.squad.filter(k => k !== 'perrit'); else if (!S.squad.includes('perrit')) S.squad.push('perrit');
      V.steps.forEach(st => { out.push(typeof st.txt === 'function' ? st.txt() : st.txt); (st.ch || []).forEach(c => out.push(c.t)); if (st.go) out.push(st.go); }); } });
  return out.join('\n'); });
const NEVER = [/Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|\bTalon\b|\bEel\b/, /Burn's Sleep|\b1\d{3}\b/, /Bonehunter|Malazan/, /Tiam|Draconus|\bRake\b|K'rul|Errastas|Saddick|Knight of Shadows|Kettle|\bMael\b|Seregahl|Crippled God|Chained One/,
  /\bchaos\b/i, /Shake|Twilight|royal blood|Yedan|Tiste blood/, /\bshorn\b|\bshear/i, /\bBrys\b|\bTehol\b|\bBugg\b|Champion's/, /Errant/, /Udinaas|Seren|Iron Bars|Hull Beddict/, /Patriotist|Karos|Bivatt|Awl/];
NEVER.forEach(re => { const m = words.match(new RegExp('.{0,40}' + re.source + '.{0,40}', re.flags)); ok(!m, `no ${re.source} in the visions ${m ? '"' + m[0].replace(/\n/g, ' ') + '"' : ''}`); });
ok(!/!\s/.test(words.replace(/"[^"]*"/g, '')), 'no exclamation marks in the narration');
const stop = await ev(() => { const t = id => VISIONS[id].steps.map(st => typeof st.txt === 'function' ? st.txt() : st.txt).join(' ');
  return {mosag:/summon|demon|kraken|serpent|beast/i.test(t('b5v1')), spirit:/\bnamed\b|its name|\bMother\b/i.test(t('b5v2')), sword:/his sword|the sword in his hand|blade/i.test(t('b5v7').replace(/Moroch[^.]*sword/g, '')),
    preda:/\bdies\b|\bdead\b|\bkilled\b|crushed/i.test(t('b5v6')), pron:(t('b5v6').match(/\bshe\b/gi) || []).length > 0}; });
ok(!stop.mosag, 'Vision 1 stops before what the Warlock King summoned (no thing is named or described)');
ok(!stop.spirit, 'Vision 2 gives the spirit no name');
ok(!stop.sword, 'Vision 7 says nothing of the Emperor\'s sword');
ok(!stop.preda && stop.pron, 'Vision 6 stops before the Preda\'s death, and she is "she"');

// ---- Book Four: its journal and visionFor are as they were ----
const b4 = await ev(() => { document.querySelectorAll('#modal,#chars,#settings').forEach(e => e.hidden = true); setBook('hoc'); S = newStateHOC('Hask'); S.chapter = 7; S.picksDue = []; save();
  startExplore(CHAPTERS[7].area.id); openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
  const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); $('#modal').hidden = true;
  return {ids, vf:[1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b2c_soldier')).join()}; });
ok(b4.ids.join() === reg.b4.join() && b4.vf === 'b4v1,b4v2,b4v3,b4v4,b4v5,b4v6,b4v7', `Book Four's journal and visionFor are unchanged (${b4.ids.join(' ')})`);

// ---- Book Five: readers, the journal by chapter reached, visionFor ----
for (const r of READERS) { const got = await setup(1, r.id); ok(got === r.id, `Book Five's reader set up the real way: ${r.id} (got ${got})`); }
for (const ch of [1, 4, 7]) {
  await setup(ch, 'perrit');
  const ids = await journalIds();
  ok(ids.join() === reg.b5.slice(0, ch).map(x => x[0]).join(), `Book Five chapter ${ch}: the journal lists ${ch} vision(s), all Book Five's (${ids.join(' ')})`);
}
const vf5 = await ev(() => [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, B5POOL[c][0])).concat([visionFor(3, 'b5t_seed'), visionFor(2, 'blank')]));
ok(vf5.join() === 'b5v1,b5v2,b5v3,b5v4,b5v5,b5v6,b5v7,b5v3,', 'Book Five\'s visionFor gives each chapter its vision, for any tile but the blank');

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

for (const [id, ch] of reg.b5) {
  const runs = await ev(id => Math.max(1, ...VISIONS[id].steps.map(s => s.ch ? s.ch.length : 1)), id);
  for (const r of READERS) {
    await setup(ch, r.id);
    const card = await ev(async ([id, ch]) => { const wait = ms => new Promise(f => setTimeout(f, ms));
      talk(`b5_c${ch}_tiles`); await wait(60); const b = [...document.querySelectorAll('#sheet .choice')].find(x => /lay them/.test(x.textContent)); if (!b) return {err:'no "Let her lay them" button'}; b.click(); await wait(250);
      const fx = $('#cardfx'), vb = document.querySelector('#cfVis'); if (!vb) return {err:`no "Look into the tile" (tile ${S.card}, cardfx ${fx && !fx.hidden})`};
      const label = vb.textContent.trim(); vb.click(); await wait(150); return {label, vis:VIS && VIS.id, card:S.card, kick:($('.vhud .kick') || {}).textContent}; }, [id, ch]);
    if (card.err) { ok(false, `${id} (${r.name}): reachable from b5_c${ch}_tiles: ${card.err}`); continue; }
    ok(/Look into the tile/.test(card.label) && card.kick === 'Through the Tiles', `${id} (${r.name}): the tile screen offers "${card.label}", and the vision is headed "${card.kick}"`);
    const o = await stepThrough(1);
    const back = await ev(id => ({ node:S.node, sp:($('#sheet .sp') || {}).textContent || '', sheet:!$('#sheet').hidden, mine:(S.tuftVisions || []).includes(id), seen:(S.seenVisions || []).includes(id), body:document.body.classList.contains('vision') }), id);
    ok(card.vis === id && !o.probs.length && [...o.dashes].length === 0, `${id} (${r.name}): from Chapter ${ch}'s reading (${card.card}) it plays, ${o.steps} steps, text clean ${o.probs.slice(0, 3).join(' | ')}`);
    ok(o.last.sp === r.name && r.line.test(o.last.txt) && o.last.fig === r.fig, `${id} (${r.name}): it ends in ${r.name}'s own words with ${r.name}'s figure ("${(o.last.txt || '').slice(0, 56)}…", ${o.last.fig})`);
    ok(back.node === `b5_c${ch}_card` && back.sheet && /Tiles of the Holds/.test(back.sp) && back.mine && back.seen && !back.body, `${id} (${r.name}): back on b5_c${ch}_card afterwards (node ${back.node}, "${back.sp}"), counted as the reader's`);
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
    ok(ends[0].sp === r.name && new RegExp(`${r.name} lets the tile go\\. ${r.sh} doesn.t say anything`).test(ends[0].txt) && ends[0].fig === r.fig, `${id} (${r.name}): from the journal the last step is the reader's, with the reader's figure (${ends[0].fig})`);
    if (ends[1]) ok(new RegExp(`${r.sh} has watched this one before`).test(ends[1].txt), `${id} (${r.name}): watched again, "has watched this one before"`);
  }
}

const paint = await ev(() => { const out = []; const cv = document.createElement('canvas'); cv.style.cssText = 'width:360px;height:154px;position:fixed;left:0;top:0'; document.body.appendChild(cv);
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'mt').forEach(id => VISIONS[id].steps.forEach((st, i) => { [0, 3000, 17000].forEach(t => { try { drawVision(cv, {id, bg:st.bg || VISIONS[id].bg, fig:st.fig != null ? st.fig : VISIONS[id].fig, step:i}, t); } catch (e) { out.push(`${id}/${i}: ${e.message}`); } }); }));
  cv.remove(); return out; });
ok(!paint.length, 'every Book Five vision backdrop paints at phone width ' + paint.slice(0, 4).join(' | '));
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
