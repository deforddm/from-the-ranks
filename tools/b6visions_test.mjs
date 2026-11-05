// Book Six's seven visions (108_b6_visions.js, art 108b): each is reached the way a player reaches it, from its chapter's Deck reading
// (b6_c<n>_deck → "Let him/her draw." → the card screen → "✦ Look into the card"), played to the end, and lands back on that chapter's
// card node (b6_c<n>_card), counted as the reader's. Book Six reads through each squad's own reader (100c's b6As): the Third (1, 3, 5, 7)
// Marrow, else Tallow, else the old soldier of the 9th; the Fourth (2, 4, 6) Tuft, else Sohra, else old Benna. Every vision is played from
// the card with its chapter's first reader; Chapters 1 (the Third) and 2 (the Fourth) are played with all three readers, set up the real way
// (the squad changed, the chain unchanged). The closing step is spoken by that reader and draws that reader's figure. Each vision is also
// played from the journal with every choice picked, and a second watching gets 36b's replay line. No page errors, no undefined/NaN/${ in
// the text, no bare "—" button. Every backdrop paints at phone width; each opener names its canon viewpoint; the new figures are drawn.
// The words keep the book's closed doors (bh-canon §5–§7, series-canon §(a)): no never-use name, no Burn's Sleep year, no Master of the
// Deck, no "Paran", nothing of where Leoman went or what the lights were. Earlier books' visionFor is unchanged.
// Usage: node tools/b6visions_test.mjs   (build first; exit 1 on a failure)
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const BAD = /\bundefined\b|\bNaN\b|\$\{|\[object/;
const RD = {
  marrow:{name:'Marrow', fig:'marrow', line:/^Marrow lets the card go/, sh:'She'},
  tallow:{name:'Tallow', fig:'tallow', line:/^Tallow puts the card face down/, sh:'He'},
  oldninth:{name:'The old soldier', fig:'b4v_oldninth', line:/^The old soldier lets the card go/, sh:'He'},
  tuft:{name:'Tuft', fig:'tuft', line:/^Tuft lets the card go/, sh:'She'},
  sohra:{name:'Sohra', fig:'sohra', line:/^Sohra sweeps the bones/, sh:'She'},
  benna:{name:'Old Benna', fig:'b3v_benna', line:/^Old Benna puts the card down/, sh:'She'},
};
const THIRD = ['marrow', 'tallow', 'oldninth'], FOURTH = ['tuft', 'sohra', 'benna'];
const KEYS = {1:'bury', 2:'pass', 3:'line', 4:'vote', 5:'wait', 6:'letgo'};
const setup = (ch, rid) => ev(([ch, rid, KEYS]) => {
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  setBook('bh'); S = newStateBH('Hask', 'Brann'); S.chapters = {};
  for (let k = 1; k < ch; k++) { S.chapters[k] = KEYS[k]; S.f[`b6_c${k}_key`] = KEYS[k]; }
  migrate(S); S.picksDue = []; save(); startChapter(ch); S.picksDue = [];
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  const out = k => { S.squad = S.squad.filter(x => x !== k); }, inn = k => { if (!S.squad.includes(k)) S.squad.push(k); if (S.dead) delete S.dead[k]; };
  if (rid === 'tallow') { out('marrow'); inn('tallow'); } if (rid === 'oldninth') { out('marrow'); out('tallow'); }
  if (rid === 'sohra') { out('tuft'); inn('sohra'); } if (rid === 'benna') { out('tuft'); out('sohra'); }
  if (rid === 'marrow') inn('marrow'); if (rid === 'tuft') inn('tuft');
  S.seenVisions = []; S.tuftVisions = []; notes = []; save(); if (view !== 'explore') startExplore();
  return {rd:visReader().id, thread:S.thread, book:S.book, ch:S.chapter};
}, [ch, rid, KEYS]);

// ---- registration ----
const reg = await ev(() => ({b6:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'bh').map(k => [k, VISIONS[k].ch, !VISIONS[k].cards]),
  bgs:[...new Set(Object.keys(VISIONS).filter(k => VISIONS[k].book === 'bh').flatMap(k => [VISIONS[k].bg, ...VISIONS[k].steps.map(s => s.bg).filter(Boolean)]))].filter(b => !VISBG[b]),
  figs:[...new Set(Object.keys(VISIONS).filter(k => VISIONS[k].book === 'bh').flatMap(k => [VISIONS[k].fig, ...VISIONS[k].steps.map(s => typeof s === 'object' && !Object.getOwnPropertyDescriptor(s, 'fig')?.get ? s.fig : null).filter(f => typeof f === 'string' && f)]))],
  art:['b6v_apsalar', 'b6v_corabb', 'b6v_noto', 'b6v_dunsparrow', 'leoman', 'keneb', 'hurlochel', 'b4_c4_grub', 'marrow', 'tallow', 'b4v_oldninth', 'tuft', 'sohra', 'b3v_benna'].filter(f => !FIGX[f] && !['tuft'].includes(f)),
  openers:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'bh').map(k => { const V = VISIONS[k], t = typeof V.steps[0].txt === 'function' ? V.steps[0].txt() : V.steps[0].txt; return [k, V.who, t.slice(0, 140)]; }),
}));
ok(reg.b6.length === 7 && reg.b6.every(([k, ch, nc], i) => k === `b6v${i + 1}` && ch === i + 1 && nc), `seven Book Six visions b6v1..b6v7, one per chapter, none keyed by card (${reg.b6.map(x => x[0]).join(' ')})`);
const WHO = ['Leoman', 'Apsalar', 'Corabb Bhilan Thenu\'alas', 'Hurlochel', 'Keneb', 'Noto Boil', 'Keneb'];
ok(reg.openers.every(([k, who, t], i) => who === WHO[i] && t.includes(who)), `each vision's opener is through its canon eyes (${reg.openers.map(o => o[1]).join(', ')})`);
ok(!reg.bgs.length, `every Book Six vision backdrop is a VISBG entry ${reg.bgs.join(' ')}`);
ok(!reg.art.length, `108b's figures, the reused canon figures and the readers' are all drawn ${reg.art.join(' ')}`);
const figOk = await ev(figs => figs.filter(f => !FIGX[f]), reg.figs);
ok(!figOk.length, `every vision figure exists (${reg.figs.join(' ')}) ${figOk.join(' ')}`);

// ---- visionFor: Book Six by chapter; Books Four and Five unchanged ----
const vf = await ev(() => { const was = S; const out = {};
  S = newStateBH('V', 'W'); S.book = 'bh'; out.bh = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, B6POOL[c][0])).join() + '|' + visionFor(3, 'blank');
  S = {book:'hoc'}; out.hoc = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b2c_soldier')).join();
  S = {book:'mt'}; out.mt = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, B5POOL[c][0])).join();
  S = was; return out; });
ok(vf.bh === 'b6v1,b6v2,b6v3,b6v4,b6v5,b6v6,b6v7|null', `Book Six's visionFor gives each chapter its vision, for any card but the blank (${vf.bh})`);
ok(vf.hoc === 'b4v1,b4v2,b4v3,b4v4,b4v5,b4v6,b4v7' && vf.mt === 'b5v1,b5v2,b5v3,b5v4,b5v5,b5v6,b5v7', 'Books Four and Five\'s visionFor are unchanged');

// ---- the closed doors: every word of every vision, every choice, every reader ----
const words = await ev(([THIRD, FOURTH]) => { const out = [];
  setBook('bh'); S = newStateBH('W', 'X'); migrate(S);
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'bh').forEach(id => { const V = VISIONS[id];
    out.push(V.who, V.where, V.cap);
    const sets = {}; V.steps.forEach(st => (st.ch || []).forEach(c => { (sets[c.set[0]] ||= []).push(c.set[1]); }));
    const keys = Object.keys(sets); for (let r = 0; r < 2; r++) { keys.forEach(k => { S.f[k] = sets[k][r % sets[k].length]; });
      V.steps.forEach(st => { if (st.ch || !Object.getOwnPropertyDescriptor(st, 'sp')?.get) { out.push(typeof st.txt === 'function' ? st.txt() : st.txt); (st.ch || []).forEach(c => out.push(c.t)); if (st.go) out.push(st.go); } }); }
    const end = V.steps[V.steps.length - 1]; const _vr = VISREADER;
    [...THIRD, ...FOURTH, 'stranger'].forEach(id2 => { VISREADER = () => ({id:id2, name:id2 === 'stranger' ? 'A stranger' : id2, he:id2 === 'tallow' || id2 === 'oldninth'}); out.push(end.txt()); });
    VISREADER = _vr; });
  return out.join('\n'); }, [THIRD, FOURTH]);
const NEVER = [/Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|\bTalon\b|\bEel\b|T'orrud/, /Burn's Sleep|\b1\d{3}\b|\bBS\b/, /Master of the Deck|\bParan\b|Ganoes/, /Crippled God|Chained One|\bchaos\b|Fallen God/i,
  /\bMael\b|Hood's gate|\bgate\b.*\bHood\b/, /L'oric|Felisin|Sha'ik|Heboric|Whiskeyjack/, /Poliel|Soliel/, /Eleint|dragon/i, /Mallick|Korbolo|First Sword|Tene Baralta|Red Blade/, /Kalam|Quick Ben/, /Run'Thurvian|Togg|Fanderay|Wolves? of Winter/, /Bonehunter/];
NEVER.forEach(re => { const m = words.match(new RegExp('.{0,40}' + re.source + '.{0,40}', re.flags)); ok(!m, `no ${re.source} in the visions ${m ? '"' + m[0].replace(/\n/g, ' ') + '"' : ''}`); });
ok(!/!/.test(words.replace(/"[^"]*"/g, '')), 'no exclamation marks in the narration');
const stop = await ev(() => { const t = id => VISIONS[id].steps.filter(st => st.ch || !Object.getOwnPropertyDescriptor(st, 'sp')?.get).map(st => { const x = typeof st.txt === 'function' ? st.txt() : st.txt; return x; }).join(' ');
  const all = id => { const o = []; const sets = {}; VISIONS[id].steps.forEach(st => (st.ch || []).forEach(c => (sets[c.set[0]] ||= []).push(c.set[1]))); for (let r = 0; r < 2; r++) { Object.keys(sets).forEach(k => S.f[k] = sets[k][r % sets[k].length]); o.push(t(id)); } return o.join(' '); };
  return {leoman:/went to|bound for|through the gate to|Dreams'? (realm|warren)/i.test(all('b6v3')), fire:/burning (man|men|figure|bod)|flesh|screams? of/i.test(all('b6v3')),
    lights:/\b(were|are) (the|a|pieces|shards|stars of)\b|otataral|\bjade\b/i.test(all('b6v6').replace(/are coming down/, '')), grub:/\bpower\b|\bgift\b|\bprophe/i.test(all('b6v5')), hold:/Empress|Laseen/.test(all('b6v7')),
    shades:/dragon|Eleint|throne/i.test(all('b6v2')), plague:/bubo|pus|rot\b|black(ened)? (skin|flesh)/i.test(all('b6v4') + all('b6v6'))}; });
ok(!stop.leoman, 'Vision 3 never says where Leoman went through the door');
ok(!stop.fire, 'Vision 3 keeps the fire headline only (no burning figure)');
ok(!stop.lights, 'Vision 6 never says what the lights are');
ok(!stop.grub, 'Vision 5 gives Grub no power: a boy, and his word');
ok(!stop.hold, 'Vision 7 never names the Empress');
ok(!stop.shades, 'Vision 2 gives the shades no nature beyond shades');
ok(!stop.plague, 'Visions 4 and 6 keep the plague headline only');

// ---- the readers, set up the real way ----
for (const [ch, list] of [[1, THIRD], [2, FOURTH]]) for (const rid of list) { const got = await setup(ch, rid); ok(got.rd === rid && got.book === 'bh' && got.thread === (ch % 2 ? 'r' : 'h'), `Chapter ${ch}: Book Six's reader set up the real way: ${rid} (got ${got.rd}, thread ${got.thread})`); }

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

const plays = [];
for (const [id, ch] of reg.b6) { const list = ch % 2 ? THIRD : FOURTH; (ch <= 2 ? list : [list[0]]).forEach(rid => plays.push([id, ch, rid])); }
for (const [id, ch, rid] of plays) { const r = RD[rid];
  await setup(ch, rid);
  const card = await ev(async ([id, ch]) => { const wait = ms => new Promise(f => setTimeout(f, ms));
    talk(`b6_c${ch}_deck`); await wait(60); const b = [...document.querySelectorAll('#sheet .choice')].find(x => /^Let (him|her) draw\./.test(x.textContent.trim())); if (!b) return {err:'no "Let him/her draw" button'}; b.click(); await wait(250);
    const fx = $('#cardfx'), vb = document.querySelector('#cfVis'); if (!vb) return {err:`no "Look into the card" (card ${S.card}, cardfx ${fx && !fx.hidden})`};
    const label = vb.textContent.trim(); vb.click(); await wait(150); return {label, vis:VIS && VIS.id, card:S.card, kick:($('.vhud .kick') || {}).textContent, drawn:S.f[`b6_c${ch}_drawn`], reader:S.f[`b6_c${ch}_reader`]}; }, [id, ch]);
  if (card.err) { ok(false, `${id} (${r.name}): reachable from b6_c${ch}_deck: ${card.err}`); continue; }
  ok(/Look into the card/.test(card.label) && card.kick === 'Through the Deck' && card.reader === rid, `${id} (${r.name}): from b6_c${ch}_deck the card screen offers "${card.label}", headed "${card.kick}", read by ${card.reader}`);
  const o = await stepThrough(1);
  const back = await ev(id => ({ node:S.node, sp:($('#sheet .sp') || {}).textContent || '', sheet:!$('#sheet').hidden, mine:(S.tuftVisions || []).includes(id), seen:(S.seenVisions || []).includes(id), body:document.body.classList.contains('vision'), book:S.book }), id);
  ok(card.vis === id && !o.probs.length && [...o.dashes].length === 0, `${id} (${r.name}): from Chapter ${ch}'s reading (${card.card}) it plays, ${o.steps} steps, text clean ${o.probs.slice(0, 3).join(' | ')}`);
  ok(o.last.sp === r.name && r.line.test(o.last.txt) && o.last.fig === r.fig, `${id} (${r.name}): it ends in ${r.name}'s own words with ${r.name}'s figure ("${(o.last.txt || '').slice(0, 56)}…", ${o.last.fig})`);
  ok(back.node === `b6_c${ch}_card` && back.sheet && /Deck of Dragons/.test(back.sp) && back.mine && back.seen && !back.body && back.book === 'bh', `${id} (${r.name}): back on b6_c${ch}_card afterwards (node ${back.node}, "${back.sp}", book ${back.book}), counted as the reader's`);
}

// ---- from the journal: every choice, and the replay line ----
for (const [id, ch] of reg.b6) { const rid = ch % 2 ? 'marrow' : 'tuft', r = RD[rid];
  const runs = await ev(id => Math.max(1, ...VISIONS[id].steps.map(s => s.ch ? s.ch.length : 1)), id);
  let probs = [], steps = 0, listed = true, ends = [];
  for (let run = 0; run < runs; run++) {
    await setup(ch, rid); if (run) await ev(id => { S.seenVisions = [id]; }, id);
    const opened = await ev(id => { openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
      const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); const b = document.querySelector(`#modal [data-vision="${id}"]`); if (!b) return ids.join(' ') || false; b.click(); return true; }, id);
    if (opened !== true) { listed = false; probs.push(`journal lists: ${opened}`); break; }
    await page.waitForTimeout(120);
    const q = await stepThrough(run); probs.push(...q.probs, ...[...q.dashes].map(d => `bare "—" at step ${d}`)); steps += q.steps; ends.push(q.last);
  }
  ok(listed && !probs.length, `${id}: ${runs} journal run(s), ${steps} steps, every choice, text clean ${probs.slice(0, 3).join(' | ')}`);
  if (!listed) continue;
  ok(ends[0].sp === r.name && new RegExp(`${r.name} lets the card go\\. ${r.sh} doesn.t say anything`).test(ends[0].txt) && ends[0].fig === r.fig, `${id}: from the journal the last step is ${r.name}'s replay line, with ${r.name}'s figure (${ends[0].fig})`);
  if (ends[1]) ok(new RegExp(`${r.sh} has watched this one before`).test(ends[1].txt), `${id}: watched again, "has watched this one before"`);
}
await setup(4, 'tuft');
const jl = await ev(() => { openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
  const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); $('#modal').hidden = true; return ids.join(' '); });
ok(jl === 'b6v1 b6v2 b6v3 b6v4', `the journal lists Book Six's visions by chapter reached (Chapter 4: ${jl})`);

const paint = await ev(() => { const out = []; const cv = document.createElement('canvas'); cv.style.cssText = 'width:360px;height:154px;position:fixed;left:0;top:0'; document.body.appendChild(cv);
  setBook('bh'); S = newStateBH('P', 'Q');
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'bh').forEach(id => VISIONS[id].steps.forEach((st, i) => { [0, 3000, 17000].forEach(t => { try { drawVision(cv, {id, bg:st.bg || VISIONS[id].bg, fig:st.fig != null ? st.fig : VISIONS[id].fig, step:i}, t); } catch (e) { out.push(`${id}/${i}: ${e.message}`); } }); }));
  cv.remove(); return out; });
ok(!paint.length, 'every Book Six vision backdrop paints at phone width ' + paint.slice(0, 4).join(' | '));
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
