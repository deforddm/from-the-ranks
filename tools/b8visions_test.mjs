// Book Eight's seven visions (148_b8_visions.js, art 148b): each is reached the way a player reaches it, from its chapter's reading
// (b8_c<n>_read → "Let her draw." or "Let her throw." → the card screen → "✦ Look into the card"), played to the end, lands back on that
// chapter's card node (b8_c<n>_card), counted as the reader's, and that node's one button goes to the reading's back node (B8READ[n].back).
// Book Eight reads through Book Three's chain (140c's b8As): Tuft, else Sohra, else Old Benna. Every vision is played with every reader,
// set up the real way (Tuft dead or away, Sohra in the squad or not); the closing step is spoken by that reader, opens the house way
// ("Tuft lets the card go", "Sohra sweeps the bones together", "Old Benna puts the card down") and draws that reader's figure; "hands
// are cold" closes only the first and the last. Each vision is also played from the journal with every choice picked, and a second
// watching gets 36b's replay line; every step of every vision is reached (no node orphaned). No page errors, no undefined/NaN/${ in the
// text, no bare "—" button. Every backdrop paints at phone width, the new figures are drawn, each vision has its own backdrop. The words
// keep the book's closed doors (tth-canon §4, §5; series-canon §(a) 70-83): no never-use name, no year, no exclamation marks in
// narration; never who paid, Rake's death, Dassem, Hood's end, the Guardians' names, Dragnipur, Mother Dark, Nimander's kin, the Seerdomin's
// or Salind's end, Toc or torcs, the moon's why, Kallor's road.
// Usage: node tools/b8visions_test.mjs   (build first; exit 1 on a failure)
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const BAD = /\bundefined\b|\bNaN\b|\$\{|\[object/;
const RD = {
  tuft:{name:'Tuft', fig:'tuft', line:/^Tuft lets the card go/, draw:/^Let her draw\./},
  sohra:{name:'Sohra', fig:'sohra', line:/^Sohra sweeps the bones together/, draw:/^Let her throw\./},
  benna:{name:'Old Benna', fig:'b3v_benna', line:/^Old Benna puts the card down/, draw:/^Let her draw\./},
};
const READERS = ['tuft', 'sohra', 'benna'];
const KEYS = {1:'quiet', 2:'pass', 3:'stand', 4:'hold', 5:'wary', 6:'street'};
const setup = (ch, rid) => ev(([ch, rid, KEYS]) => {
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  setBook('tth'); S = newStateTTH('Hask'); S.chapters = {};
  for (let k = 1; k < ch; k++) { S.chapters[k] = KEYS[k]; S.f[`b8_c${k}_key`] = KEYS[k]; }
  const out = k => { S.squad = S.squad.filter(x => x !== k); }, inn = k => { if (!S.squad.includes(k)) S.squad.push(k); if (S.dead) delete S.dead[k]; S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; };
  if (rid === 'tuft') inn('tuft');
  if (rid === 'sohra') { out('tuft'); S.dead.tuft = {ch:7, where:'Coral', from:'moi'}; inn('sohra'); }
  if (rid === 'benna') { out('tuft'); out('sohra'); S.dead.tuft = {ch:7, where:'Coral', from:'moi'}; }
  migrate(S); S.picksDue = []; save(); startChapter(ch); S.picksDue = [];
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  S.seenVisions = []; S.tuftVisions = []; notes = []; save(); if (view !== 'explore') startExplore();
  return {rd:visReader().id, book:S.book, ch:S.chapter};
}, [ch, rid, KEYS]);

// ---- registration ----
const reg = await ev(() => { const mine = Object.keys(VISIONS).filter(k => VISIONS[k].book === 'tth');
  return {b8:mine.map(k => [k, VISIONS[k].ch, !VISIONS[k].cards, VISIONS[k].steps.length]),
  bgs:[...new Set(mine.flatMap(k => [VISIONS[k].bg, ...VISIONS[k].steps.map(s => s.bg).filter(Boolean)]))].filter(b => !VISBG[b]),
  ownBg:new Set(mine.map(k => VISIONS[k].bg)).size,
  figs:[...new Set(mine.flatMap(k => [VISIONS[k].fig, ...VISIONS[k].steps.map(s => typeof s === 'object' && !Object.getOwnPropertyDescriptor(s, 'fig')?.get ? s.fig : null).filter(f => typeof f === 'string' && f)]))],
  art:['b8v_picker', 'b8v_nimander', 'b8v_seerdomin', 'b8v_spinnock', 'b8v_samar', 'b8v_pilgrimgirl', 'b8v_iskar', 'b4_c7_karsa', 'kallor', 'greysword', 'b3_c7_bridgeburner', 'b3_c4_priest', 'b8_c3_priestess', 'b3v_benna', 'sohra'].filter(f => !FIGX[f]),
  openers:mine.map(k => { const V = VISIONS[k], t = V.steps.slice(0, 2).map(st => typeof st.txt === 'function' ? st.txt() : st.txt).join(' '); return [k, V.who, t]; }),
  hands:mine.map(k => { const end = VISIONS[k].steps[VISIONS[k].steps.length - 1], _vr = VISREADER, n = [];
    ['tuft', 'sohra', 'benna'].forEach(id => { VISREADER = () => ({id, name:id, he:false}); if (/hands are cold/.test(end.txt())) n.push(id); }); VISREADER = _vr; return n.length; }),
  }; });
ok(reg.b8.length === 7 && reg.b8.every(([k, ch, nc], i) => k === `b8v${i + 1}` && ch === i + 1 && nc), `seven Book Eight visions b8v1..b8v7, one per chapter, none keyed by card (${reg.b8.map(x => x[0]).join(' ')})`);
const WHO = ['Picker', 'Nimander', 'The Seerdomin', 'Spinnock Durav', 'Spinnock Durav', 'Karsa Orlong', 'Iskar Jarak'];
const KEY = [/Picker/, /Nimander/, /Seerdomin/, /Spinnock/, /Spinnock/, /Karsa/, /Iskar Jarak/];
ok(reg.openers.every(([k, who, t], i) => who === WHO[i] && KEY[i].test(t)), `each vision opens through its canon eyes (tth-canon §9: ${reg.openers.map(o => o[1]).join(', ')})`);
ok(!reg.bgs.length && reg.ownBg === 7, `every Book Eight vision has its own backdrop, a VISBG entry ${reg.bgs.join(' ')}`);
ok(!reg.art.length, `148b's figures, the reused canon figures and the readers' are all drawn ${reg.art.join(' ')}`);
const figOk = await ev(figs => figs.filter(f => !FIGX[f]), reg.figs);
ok(!figOk.length, `every vision figure exists (${reg.figs.join(' ')}) ${figOk.join(' ')}`);
ok(reg.hands.join() === '3,0,0,0,0,0,3', `"hands are cold" closes only the first and the last vision, for every reader (${reg.hands.join()})`);

// ---- visionFor: Book Eight by chapter; Books Three and Seven unchanged ----
const vf = await ev(() => { const was = S; const out = {};
  S = newStateTTH('V'); S.book = 'tth'; out.tth = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, B8POOL[c][0])).join() + '|' + visionFor(3, 'blank');
  S = {book:'rg'}; out.rg = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b2c_soldier')).join();
  S = {book:'moi'}; out.moi = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b3c_gate')).join();
  S = was; return out; });
ok(vf.tth === 'b8v1,b8v2,b8v3,b8v4,b8v5,b8v6,b8v7|null', `Book Eight's visionFor gives each chapter its vision, for any card but the blank (${vf.tth})`);
ok(vf.rg === 'b7v1,b7v2,b7v3,b7v4,b7v5,b7v6,b7v7' && vf.moi === 'b3v1,b3v2,b3v3,b3v4,b3v5,b3v6,b3v7', `Books Three and Seven's visionFor are unchanged (${vf.moi})`);

// ---- the closed doors: every word of every vision, every choice, every reader ----
const words = await ev(() => { const out = [];
  setBook('tth'); S = newStateTTH('W'); migrate(S);
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'tth').forEach(id => { const V = VISIONS[id];
    out.push(V.who, V.where, V.cap);
    const sets = {}; V.steps.forEach(st => (st.ch || []).forEach(c => { (sets[c.set[0]] ||= []).push(c.set[1]); }));
    const keys = Object.keys(sets); for (let r = 0; r < 3; r++) { keys.forEach(k => { S.f[k] = sets[k][r % sets[k].length]; });
      V.steps.forEach(st => { if (st.ch || !Object.getOwnPropertyDescriptor(st, 'sp')?.get) { out.push(typeof st.txt === 'function' ? st.txt() : st.txt); (st.ch || []).forEach(c => out.push(c.t)); if (st.go) out.push(st.go); } }); }
    const end = V.steps[V.steps.length - 1]; const _vr = VISREADER;
    ['tuft', 'sohra', 'benna', 'stranger'].forEach(id2 => { VISREADER = () => ({id:id2, name:id2 === 'stranger' ? 'A stranger' : id2, he:false}); out.push(end.txt()); });
    VISREADER = _vr; });
  return out.join('\n'); });
const NEVER = [/Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|\bTalon\b|\bEel\b|T'orrud/, /Burn's Sleep|\b1\d{3}\b|\bBS\b/, /Seba|Krute|Krafar|Dester|who paid/i,
  /\bRake\b|Son of Darkness|Anomander|Dragnipur|black sword|Draconus|chained|Apsal|\bDitch\b|Kadaspala/i, /Dassem|Dassembrae|Traveller|Hood's daughter/, /\bHood\b|Ice Throne|beheaded|Guardians? of the Gate/,
  /Whiskeyjack|\bToc\b|Herald|\btorcs?\b|torc-bearer/i, /Mother Dark|Kurald|Gate of Darkness|\bdragon|Eleint|Silanah|Korlat|Orfantal/i, /Skintick|Desra|Nenanda|Kedeviss|Aranatha|\bClip\b|Phaed|Bastion|the god's body/,
  /Salind|Gradithan|High Priestess|embrace|Itkovian/, /Challice|globe|Cutter|Gorlas/, /\bascend/i, /sacrifice/i, /Seguleh|Legate|Spawns|Tayschrenn|Dujek|Bult\b|Coltaine/, /Bridgeburner/];
NEVER.forEach(re => { const m = words.match(new RegExp('.{0,40}' + re.source + '.{0,40}', re.flags)); ok(!m, `no ${re.source} in the visions ${m ? '"' + m[0].replace(/\n/g, ' ') + '"' : ''}`); });
ok(!/!/.test(words.replace(/"[^"]*"/g, '')), 'no exclamation marks in the narration');
const stop = await ev(() => { const all = id => { const o = []; const sets = {}; VISIONS[id].steps.forEach(st => (st.ch || []).forEach(c => (sets[c.set[0]] ||= []).push(c.set[1])));
    for (let r = 0; r < 3; r++) { Object.keys(sets).forEach(k => S.f[k] = sets[k][r % sets[k].length]); o.push(VISIONS[id].steps.filter(st => st.ch || !Object.getOwnPropertyDescriptor(st, 'sp')?.get).map(st => typeof st.txt === 'function' ? st.txt() : st.txt).join(' ')); } return o.join(' '); };
  return {kallor:/Kallor|Black Coral|throne|falls|dies|dead\b|blood|wound/i.test(all('b8v5')), karsa:/daughter|god of war|gods of war|what he will do/i.test(all('b8v6')), moon:/because|why|\breason/i.test((all('b8v6').split('The moon is in pieces')[1] || '').split('That is new')[0]),
    seer:/(the Seerdomin|his friend|the big man) (dies|died|is killed|falls dead)|his death/i.test(all('b8v3') + all('b8v4')), nim:/Nimander/.test(all('b8v2').replace(/^[\s\S]*?Nimander walks/, '')) && /lord/i.test(all('b8v2')),
    picker:/killed him|kills him|blood|throat|(he|the man) (is|lies) dead/i.test(all('b8v1')), iskar:/Iskar Jarak/.test(all('b8v7')) && !/god (led|leads|brought)|his lord|wagon|chain/i.test(all('b8v7'))}; });
ok(!stop.picker, 'Vision 1 never shows what falls in the lane: "it is over", nothing more');
ok(!stop.nim, 'Vision 2 never makes Nimander a lord (rule 77)');
ok(!stop.seer, 'Visions 3 and 4 never give the Seerdomin an end (rule 78)');
ok(!stop.kallor, 'Vision 5 stops as the blades come up: no blow, no blood, no road on (rule 83)');
ok(!stop.karsa && !stop.moon, 'Vision 6 keeps Karsa a giant at a wall and the moon unexplained (rules 79, 81)');
ok(stop.iskar, 'Vision 7 names Iskar Jarak and no god at the head of the dead (rules 7, 74, 75)');

// ---- the readers, set up the real way ----
for (const rid of READERS) { const got = await setup(2, rid); ok(got.rd === rid && got.book === 'tth', `Book Eight's reader set up the real way: ${rid} (got ${got.rd})`); }

// ---- stepping a vision to its end ----
const stepThrough = async (run, seen) => { const probs = [], dashes = new Set(); let steps = 0, last = {};
  for (let i = 0; i < 40; i++) {
    const st = await ev(() => ({ vis:!!VIS, id:VIS && VIS.id, step:VIS && VIS.step, fig:VIS && VIS.fig, sp:($('#sheet .sp') || {}).textContent || '', txt:($('#sheet .txt') || {}).textContent || '',
      text:($('#app').innerText || '') + '\n' + ($('#sheet').hidden ? '' : $('#sheet').innerText), btns:[...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()) }));
    if (!st.vis) break;
    steps++; last = st; if (seen) seen.add(st.step);
    const m = st.text.match(new RegExp('.{0,40}(' + BAD.source + ').{0,40}'));
    if (m) probs.push(`step ${st.step}: "${m[0].replace(/\n/g, ' ')}"`);
    st.btns.forEach(t => { if (t === '—') dashes.add(st.step); });
    if (!st.btns.length) { probs.push(`step ${st.step}: no buttons`); break; }
    await page.click(`#sheet #ch${run % st.btns.length}`); await page.waitForTimeout(40);
  }
  if (await ev(() => !!VIS)) probs.push('never ended');
  return {probs, dashes, steps, last}; };

for (const [id, ch] of reg.b8) for (const rid of READERS) { const r = RD[rid];
  await setup(ch, rid);
  const card = await ev(async ([id, ch, drawSrc]) => { const wait = ms => new Promise(f => setTimeout(f, ms)), dr = new RegExp(drawSrc);
    talk(`b8_c${ch}_read`); await wait(60); const b = [...document.querySelectorAll('#sheet .choice')].find(x => dr.test(x.textContent.trim())); if (!b) return {err:`no "${drawSrc}" button: ${[...document.querySelectorAll('#sheet .choice')].map(x => x.textContent.trim()).join(' | ')}`}; b.click(); await wait(250);
    const fx = $('#cardfx'), vb = document.querySelector('#cfVis'); if (!vb) return {err:`no "Look into" button (card ${S.card}, cardfx ${fx && !fx.hidden})`};
    const label = vb.textContent.trim(); vb.click(); await wait(150); return {label, vis:VIS && VIS.id, card:S.card, kick:($('.vhud .kick') || {}).textContent, reader:S.f[`b8_c${ch}_reader`]}; }, [id, ch, r.draw.source]);
  if (card.err) { ok(false, `${id} (${r.name}): reachable from b8_c${ch}_read: ${card.err}`); continue; }
  ok(/Look into the card/.test(card.label) && card.kick === 'Through the Deck' && card.reader === rid, `${id} (${r.name}): from b8_c${ch}_read the screen offers "${card.label}", headed "${card.kick}", read by ${card.reader}`);
  const o = await stepThrough(1);
  const back = await ev(id => ({ node:S.node, sp:($('#sheet .sp') || {}).textContent || '', sheet:!$('#sheet').hidden, mine:(S.tuftVisions || []).includes(id), seen:(S.seenVisions || []).includes(id), body:document.body.classList.contains('vision'), book:S.book,
    btns:[...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()) }), id);
  ok(card.vis === id && !o.probs.length && [...o.dashes].length === 0, `${id} (${r.name}): from Chapter ${ch}'s reading (${card.card}) it plays, ${o.steps} steps, text clean ${o.probs.slice(0, 3).join(' | ')}`);
  ok(o.last.sp === r.name && r.line.test(o.last.txt) && o.last.fig === r.fig, `${id} (${r.name}): it ends in ${r.name}'s own words with ${r.name}'s figure ("${(o.last.txt || '').slice(0, 50)}…", ${o.last.fig})`);
  ok(back.node === `b8_c${ch}_card` && back.sheet && /Deck of Dragons/.test(back.sp) && back.mine && back.seen && !back.body && back.book === 'tth', `${id} (${r.name}): back on b8_c${ch}_card afterwards (node ${back.node}, "${back.sp}", book ${back.book}), counted as the reader's`);
  const home = await ev(async ch => { const wait = ms => new Promise(f => setTimeout(f, ms)); const want = B8READ[ch].back, b = document.querySelector('#sheet #ch0'); if (!b) return {err:'no button'}; b.click(); await wait(80); return {node:S.node, want, err:null}; }, ch);
  ok(!home.err && home.node === home.want, `${id} (${r.name}): the card's "${back.btns[0]}" goes to the reading's back node ${home.want} (now ${home.node})`);
}

// ---- from the journal: every choice, the replay line, every step reached ----
for (const [id, ch, , n] of reg.b8) { const rid = 'tuft', r = RD[rid];
  const runs = await ev(id => Math.max(1, ...VISIONS[id].steps.map(s => s.ch ? s.ch.length : 1)), id);
  let probs = [], steps = 0, listed = true, ends = []; const seen = new Set();
  for (let run = 0; run < runs; run++) {
    await setup(ch, rid); if (run) await ev(id => { S.seenVisions = [id]; }, id);
    const opened = await ev(id => { openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
      const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); const b = document.querySelector(`#modal [data-vision="${id}"]`); if (!b) return ids.join(' ') || false; b.click(); return true; }, id);
    if (opened !== true) { listed = false; probs.push(`journal lists: ${opened}`); break; }
    await page.waitForTimeout(120);
    const q = await stepThrough(run, seen); probs.push(...q.probs, ...[...q.dashes].map(d => `bare "—" at step ${d}`)); steps += q.steps; ends.push(q.last);
  }
  ok(listed && !probs.length, `${id}: ${runs} journal run(s), ${steps} steps, every choice, text clean ${probs.slice(0, 3).join(' | ')}`);
  if (!listed) continue;
  ok(seen.size === n, `${id}: every one of its ${n} steps is reached (no node orphaned: ${[...seen].sort().join(',')})`);
  const nodes = await ev(([id, n]) => Array.from({length:n}, (_, i) => typeof DLG[`vis_${id}_${i}`] === 'function').every(Boolean), [id, n]);
  ok(nodes, `${id}: its ${n} nodes vis_${id}_0..${n - 1} are registered`);
  ok(ends[0].sp === r.name && /Tuft lets the card go\. She doesn.t say anything/.test(ends[0].txt) && ends[0].fig === r.fig, `${id}: from the journal the last step is Tuft's replay line, with her figure (${ends[0].fig})`);
  if (ends[1]) ok(/She has watched this one before/.test(ends[1].txt), `${id}: watched again, "has watched this one before"`);
}
await setup(4, 'tuft');
const jl = await ev(() => { openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
  const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); $('#modal').hidden = true; return ids.join(' '); });
ok(jl === 'b8v1 b8v2 b8v3 b8v4', `the journal lists Book Eight's visions by chapter reached (Chapter 4: ${jl})`);

const paint = await ev(() => { const out = []; const cv = document.createElement('canvas'); cv.style.cssText = 'width:360px;height:154px;position:fixed;left:0;top:0'; document.body.appendChild(cv);
  setBook('tth'); S = newStateTTH('P');
  ['tuft', 'sohra', 'benna'].forEach(rid => { if (rid === 'sohra') { S.squad = S.squad.filter(x => x !== 'tuft'); S.squad.push('sohra'); } if (rid === 'benna') S.squad = S.squad.filter(x => x !== 'sohra');
    Object.keys(VISIONS).filter(k => VISIONS[k].book === 'tth').forEach(id => VISIONS[id].steps.forEach((st, i) => { [0, 3000, 17000].forEach(t => { try { VIS = {id, step:i}; drawVision(cv, {id, bg:st.bg || VISIONS[id].bg, fig:(Object.getOwnPropertyDescriptor(st, 'fig')?.get ? 'tuft' : st.fig) || VISIONS[id].fig, step:i}, t); } catch (e) { out.push(`${id}/${i}/${rid}: ${e.message}`); } }); })); });
  VIS = null; cv.remove(); return out; });
ok(!paint.length, 'every Book Eight vision backdrop paints at phone width, with every reader ' + paint.slice(0, 4).join(' | '));
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
