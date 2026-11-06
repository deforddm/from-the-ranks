// Book Seven's seven visions (128_b7_visions.js, art 128b): each is reached the way a player reaches it, from its chapter's reading
// (b7_c<n>_read → "Let him/her draw." or "Let her lay them." → the card or tile screen → "✦ Look into the card/tile"), played to the end,
// lands back on that chapter's card node (b7_c<n>_card), counted as the reader's, and that node's one button goes to the reading's back
// node (B7READ[n].back). Book Seven reads through each squad's own reader (120c's b7As): the Third (1, 3, 5, 7) Marrow, else Tallow,
// else the old soldier; the Letherii (2, 4, 6) Perrit, else the tile-woman. Every vision is played with every reader its squad has, set up
// the real way (the squad changed, the chain unchanged); the closing step is spoken by that reader, opens the house way ("lets the card
// go", "puts the card face down", "turns the tile face down", "puts her hand over the tile") and draws that reader's figure. Each vision is
// also played from the journal with every choice picked, and a second watching gets 36b's replay line; every step of every vision is
// reached (no node orphaned). No page errors, no undefined/NaN/${ in the text, no bare "—" button. Every backdrop paints at phone width;
// each opener names its canon viewpoint; the new figures are drawn. The words keep the book's closed doors (rg-canon §5–§7, series-canon
// §(a)): no never-use name, no Burn's Sleep year, no exclamation marks in narration, never Mael or the Crippled God, never Kettle or a
// dragon, never Tavore's thoughts, never who drained the treasury, never Beak received by Hood, never Brys risen.
// Usage: node tools/b7visions_test.mjs   (build first; exit 1 on a failure)
import { server, browser, openGame } from './page.mjs';
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const BAD = /\bundefined\b|\bNaN\b|\$\{|\[object/;
const RD = {
  marrow:{name:'Marrow', fig:'marrow', line:/^Marrow lets the card go/, sh:'She', cd:'card'},
  tallow:{name:'Tallow', fig:'tallow', line:/^Tallow puts the card face down/, sh:'He', cd:'card'},
  oldninth:{name:'The old soldier', fig:'b4v_oldninth', line:/^The old soldier lets the card go/, sh:'He', cd:'card'},
  perrit:{name:'Perrit', fig:'perrit', line:/^Perrit turns the tile face down/, sh:'She', cd:'tile'},
  tilewoman:{name:'The tile-woman', fig:'b5_c1_tilewoman', line:/^The tile-woman puts her hand/, sh:'She', cd:'tile'},
};
const THIRD = ['marrow', 'tallow', 'oldninth'], LETH = ['perrit', 'tilewoman'];
const KEYS = {1:'burn', 2:'name', 3:'ledger', 4:'edur', 5:'hold', 6:'stand'};
const setup = (ch, rid) => ev(([ch, rid, KEYS]) => {
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  setBook('rg'); S = newStateRG('Hask', 'Brann'); S.chapters = {};
  for (let k = 1; k < ch; k++) { S.chapters[k] = KEYS[k]; S.f[`b7_c${k}_key`] = KEYS[k]; }
  migrate(S); S.picksDue = []; if (S.th && S.th.l) S.th.l.picksDue = []; save(); startChapter(ch); S.picksDue = [];
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  const out = k => { S.squad = S.squad.filter(x => x !== k); }, inn = k => { if (!S.squad.includes(k)) S.squad.push(k); if (S.dead) delete S.dead[k]; S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; };
  if (rid === 'tallow') { out('marrow'); inn('tallow'); } if (rid === 'oldninth') { out('marrow'); out('tallow'); }
  if (rid === 'tilewoman') out('perrit'); if (rid === 'perrit') inn('perrit'); if (rid === 'marrow') inn('marrow');
  S.seenVisions = []; S.tuftVisions = []; notes = []; save(); if (view !== 'explore') startExplore();
  return {rd:visReader().id, thread:S.thread, book:S.book, ch:S.chapter};
}, [ch, rid, KEYS]);

// ---- registration ----
const reg = await ev(() => ({b7:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'rg').map(k => [k, VISIONS[k].ch, !VISIONS[k].cards, VISIONS[k].steps.length]),
  bgs:[...new Set(Object.keys(VISIONS).filter(k => VISIONS[k].book === 'rg').flatMap(k => [VISIONS[k].bg, ...VISIONS[k].steps.map(s => s.bg).filter(Boolean)]))].filter(b => !VISBG[b]),
  figs:[...new Set(Object.keys(VISIONS).filter(k => VISIONS[k].book === 'rg').flatMap(k => [VISIONS[k].fig, ...VISIONS[k].steps.map(s => typeof s === 'object' && !Object.getOwnPropertyDescriptor(s, 'fig')?.get ? s.fig : null).filter(f => typeof f === 'string' && f)]))],
  art:['b7v_tehol', 'b7v_fiddler', 'b7v_bruthen', 'b7v_hellian', 'b7v_hanradi', 'b7v_lostara', 'keneb', 'b5_edur', 'b7_malregular', 'b2soldier', 'b5_letherii', 'marrow', 'tallow', 'b4v_oldninth', 'perrit', 'b5_c1_tilewoman'].filter(f => !FIGX[f]),
  openers:Object.keys(VISIONS).filter(k => VISIONS[k].book === 'rg').map(k => { const V = VISIONS[k], t = typeof V.steps[0].txt === 'function' ? V.steps[0].txt() : V.steps[0].txt; return [k, V.who, t.slice(0, 140)]; }),
}));
ok(reg.b7.length === 7 && reg.b7.every(([k, ch, nc], i) => k === `b7v${i + 1}` && ch === i + 1 && nc), `seven Book Seven visions b7v1..b7v7, one per chapter, none keyed by card (${reg.b7.map(x => x[0]).join(' ')})`);
const WHO = ['Keneb', 'Tehol Beddict', 'Fiddler', 'Bruthen Trana', 'Hellian', 'Hanradi Khalag', 'Lostara Yil'];
ok(reg.openers.every(([k, who, t], i) => who === WHO[i] && t.includes(who)), `each vision's opener is through its canon eyes (${reg.openers.map(o => o[1]).join(', ')})`);
ok(!reg.bgs.length, `every Book Seven vision backdrop is a VISBG entry ${reg.bgs.join(' ')}`);
ok(!reg.art.length, `128b's figures, the reused canon figures and the readers' are all drawn ${reg.art.join(' ')}`);
const figOk = await ev(figs => figs.filter(f => !FIGX[f]), reg.figs);
ok(!figOk.length, `every vision figure exists (${reg.figs.join(' ')}) ${figOk.join(' ')}`);

// ---- visionFor: Book Seven by chapter; Books Five and Six unchanged ----
const vf = await ev(() => { const was = S; const out = {};
  S = newStateRG('V', 'W'); S.book = 'rg'; out.rg = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, B7POOL[c][0])).join() + '|' + visionFor(3, 'blank');
  S = {book:'bh'}; out.bh = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b2c_soldier')).join();
  S = {book:'mt'}; out.mt = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, B5POOL[c][0])).join();
  S = was; return out; });
ok(vf.rg === 'b7v1,b7v2,b7v3,b7v4,b7v5,b7v6,b7v7|null', `Book Seven's visionFor gives each chapter its vision, for any card but the blank (${vf.rg})`);
ok(vf.bh === 'b6v1,b6v2,b6v3,b6v4,b6v5,b6v6,b6v7' && vf.mt === 'b5v1,b5v2,b5v3,b5v4,b5v5,b5v6,b5v7', 'Books Five and Six\'s visionFor are unchanged');

// ---- the closed doors: every word of every vision, every choice, every reader ----
const words = await ev(([ALL]) => { const out = [];
  setBook('rg'); S = newStateRG('W', 'X'); migrate(S);
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'rg').forEach(id => { const V = VISIONS[id];
    out.push(V.who, V.where, V.cap);
    const sets = {}; V.steps.forEach(st => (st.ch || []).forEach(c => { (sets[c.set[0]] ||= []).push(c.set[1]); }));
    const keys = Object.keys(sets); for (let r = 0; r < 3; r++) { keys.forEach(k => { S.f[k] = sets[k][r % sets[k].length]; });
      V.steps.forEach(st => { if (st.ch || !Object.getOwnPropertyDescriptor(st, 'sp')?.get) { out.push(typeof st.txt === 'function' ? st.txt() : st.txt); (st.ch || []).forEach(c => out.push(c.t)); if (st.go) out.push(st.go); } }); }
    const end = V.steps[V.steps.length - 1]; const _vr = VISREADER;
    [...ALL, 'stranger'].forEach(id2 => { VISREADER = () => ({id:id2, name:id2 === 'stranger' ? 'A stranger' : id2, he:id2 === 'tallow' || id2 === 'oldninth'}); out.push(end.txt()); });
    VISREADER = _vr; });
  return out.join('\n'); }, [[...THIRD, ...LETH]]);
const NEVER = [/Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|\bTalon\b|\bEel\b|T'orrud/, /Burn's Sleep|\b1\d{3}\b|\bBS\b/, /Master of the Deck|\bParan\b|Ganoes/, /Crippled God|Chained One|\bchaos\b|Fallen God/i,
  /\bMael\b|Errastas|\bElder\b/, /Kettle|Silchas|Menandore|Refugium|Azath seed/, /Eleint|dragon/i, /Kalam|Quick Ben|\bHedge\b/, /Bolkando|Wastes|Nah'ruk|Aranict|K'Chain/, /Tehol the Only|Emperor Tehol|Empress/,
  /\bTrull\b|\bSeren\b|\bKarsa\b|Icarium|Sirryn/, /\bPearl\b|Felisin|Sha'ik/, /\bToc\b|Redmask|Andii|Yedan/, /Bonehunter/];
NEVER.forEach(re => { const m = words.match(new RegExp('.{0,40}' + re.source + '.{0,40}', re.flags)); ok(!m, `no ${re.source} in the visions ${m ? '"' + m[0].replace(/\n/g, ' ') + '"' : ''}`); });
ok(!/!/.test(words.replace(/"[^"]*"/g, '')), 'no exclamation marks in the narration');
const stop = await ev(() => { const t = id => VISIONS[id].steps.filter(st => st.ch || !Object.getOwnPropertyDescriptor(st, 'sp')?.get).map(st => typeof st.txt === 'function' ? st.txt() : st.txt).join(' ');
  const all = id => { const o = []; const sets = {}; VISIONS[id].steps.forEach(st => (st.ch || []).forEach(c => (sets[c.set[0]] ||= []).push(c.set[1]))); for (let r = 0; r < 3; r++) { Object.keys(sets).forEach(k => S.f[k] = sets[k][r % sets[k].length]); o.push(t(id)); } return o.join(' '); };
  return {tavore:/(Adjunct|Tavore)('s| is| was)? (think|thinks|thought|wants?|wanted|feels?|felt|knows?|knew|means?|meant|fears?|hopes?|plans?)\b|her (purpose|plan|reason)/i.test((all('b7v1') + all('b7v7')).replace(/He doesn't know what she wants|what she has asked for|Lostara has served her long enough to be sure|the Adjunct already knows it/g, '')),
    treasury:/\b(Tehol|Bugg|Karos)\b[^.]*\b(drained|emptied|took|stole|hid|hidden|buried) (the |all the )?(coin|treasury|money)/i.test(all('b7v2')), bugg:/\bgod\b|\bsea\b|\bdrown|\bwater\b/i.test(all('b7v2')),
    hood:/\bHood\b/.test(all('b7v6')), beak:/\bBeak\b/.test(all('b7v6')), brys:/Brys (rises|rose|stood|stands|breathes|opens|wakes|woke|lives|alive|returns|came back)|comes back|back to life/i.test(all('b7v4')),
    mosag:/Mosag (dies|died|is dead|fell)|under Settle Lake/i.test(all('b7v4')), sender:/(Mael|the Errant|a god|the sea) sent him/i.test(all('b7v4'))}; });
ok(!stop.tavore, 'Visions 1 and 7 never give the Adjunct\'s thoughts (rule 55)');
ok(!stop.treasury, 'Vision 2 never settles who drained the treasury (rule 69)');
ok(!stop.bugg, 'Vision 2 gives Bugg nothing of the sea (rule 56)');
ok(!stop.hood && !stop.beak, 'Vision 6 keeps Beak a light that holds and goes out: unnamed, and no Hood (rule 63)');
ok(!stop.brys && !stop.sender, 'Vision 4 stops at the name: Brys never rises, and no one is named as the sender');
ok(!stop.mosag, 'Vision 4 never shows Mosag\'s end or the demon (rule 68)');

// ---- the readers, set up the real way ----
for (const [ch, list] of [[1, THIRD], [2, LETH]]) for (const rid of list) { const got = await setup(ch, rid); ok(got.rd === rid && got.book === 'rg' && got.thread === (ch % 2 ? 't' : 'l'), `Chapter ${ch}: Book Seven's reader set up the real way: ${rid} (got ${got.rd}, thread ${got.thread})`); }

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

const plays = [];
for (const [id, ch] of reg.b7) (ch % 2 ? THIRD : LETH).forEach(rid => plays.push([id, ch, rid]));
for (const [id, ch, rid] of plays) { const r = RD[rid];
  await setup(ch, rid);
  const card = await ev(async ([id, ch]) => { const wait = ms => new Promise(f => setTimeout(f, ms));
    talk(`b7_c${ch}_read`); await wait(60); const b = [...document.querySelectorAll('#sheet .choice')].find(x => /^Let (him|her) (draw|lay them)\./.test(x.textContent.trim())); if (!b) return {err:'no "Let him/her draw" button'}; b.click(); await wait(250);
    const fx = $('#cardfx'), vb = document.querySelector('#cfVis'); if (!vb) return {err:`no "Look into" button (card ${S.card}, cardfx ${fx && !fx.hidden})`};
    const label = vb.textContent.trim(); vb.click(); await wait(150); return {label, vis:VIS && VIS.id, card:S.card, kick:($('.vhud .kick') || {}).textContent, drawn:S.f[`b7_c${ch}_drawn`], reader:S.f[`b7_c${ch}_reader`]}; }, [id, ch]);
  if (card.err) { ok(false, `${id} (${r.name}): reachable from b7_c${ch}_read: ${card.err}`); continue; }
  const kick = r.cd === 'tile' ? 'Through the Tiles' : 'Through the Deck';
  ok(new RegExp(`Look into the ${r.cd}`).test(card.label) && card.kick === kick && card.reader === rid, `${id} (${r.name}): from b7_c${ch}_read the screen offers "${card.label}", headed "${card.kick}", read by ${card.reader}`);
  const o = await stepThrough(1);
  const back = await ev(id => ({ node:S.node, sp:($('#sheet .sp') || {}).textContent || '', sheet:!$('#sheet').hidden, mine:(S.tuftVisions || []).includes(id), seen:(S.seenVisions || []).includes(id), body:document.body.classList.contains('vision'), book:S.book,
    btns:[...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()) }), id);
  ok(card.vis === id && !o.probs.length && [...o.dashes].length === 0, `${id} (${r.name}): from Chapter ${ch}'s reading (${card.card}) it plays, ${o.steps} steps, text clean ${o.probs.slice(0, 3).join(' | ')}`);
  ok(o.last.sp === r.name && r.line.test(o.last.txt) && o.last.fig === r.fig, `${id} (${r.name}): it ends in ${r.name}'s own words with ${r.name}'s figure ("${(o.last.txt || '').slice(0, 56)}…", ${o.last.fig})`);
  ok(back.node === `b7_c${ch}_card` && back.sheet && (r.cd === 'tile' ? /Tiles of the Holds/ : /Deck of Dragons/).test(back.sp) && back.mine && back.seen && !back.body && back.book === 'rg', `${id} (${r.name}): back on b7_c${ch}_card afterwards (node ${back.node}, "${back.sp}", book ${back.book}), counted as the reader's`);
  const home = await ev(async ch => { const wait = ms => new Promise(f => setTimeout(f, ms)); const want = B7READ[ch].back, b = document.querySelector('#sheet #ch0'); if (!b) return {err:'no button'}; b.click(); await wait(80); return {node:S.node, want, err:null}; }, ch);
  ok(!home.err && home.node === home.want, `${id} (${r.name}): the card's "${back.btns[0]}" goes to the reading's back node ${home.want} (now ${home.node})`);
}

// ---- from the journal: every choice, the replay line, every step reached ----
for (const [id, ch, , n] of reg.b7) { const rid = ch % 2 ? 'marrow' : 'perrit', r = RD[rid];
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
  ok(ends[0].sp === r.name && new RegExp(`${r.name} lets the ${r.cd} go\\. ${r.sh} doesn.t say anything`).test(ends[0].txt) && ends[0].fig === r.fig, `${id}: from the journal the last step is ${r.name}'s replay line, with ${r.name}'s figure (${ends[0].fig})`);
  if (ends[1]) ok(new RegExp(`${r.sh} has watched this one before`).test(ends[1].txt), `${id}: watched again, "has watched this one before"`);
}
await setup(4, 'perrit');
const jl = await ev(() => { openModal('journal'); document.querySelectorAll('#modal details').forEach(d => d.open = true);
  const ids = [...document.querySelectorAll('#modal [data-vision]')].map(b => b.dataset.vision); $('#modal').hidden = true; return ids.join(' '); });
ok(jl === 'b7v1 b7v2 b7v3 b7v4', `the journal lists Book Seven's visions by chapter reached (Chapter 4: ${jl})`);

const paint = await ev(() => { const out = []; const cv = document.createElement('canvas'); cv.style.cssText = 'width:360px;height:154px;position:fixed;left:0;top:0'; document.body.appendChild(cv);
  setBook('rg'); S = newStateRG('P', 'Q');
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'rg').forEach(id => VISIONS[id].steps.forEach((st, i) => { [0, 3000, 17000].forEach(t => { try { drawVision(cv, {id, bg:st.bg || VISIONS[id].bg, fig:(Object.getOwnPropertyDescriptor(st, 'fig')?.get ? 'marrow' : st.fig) || VISIONS[id].fig, step:i}, t); } catch (e) { out.push(`${id}/${i}: ${e.message}`); } }); }));
  cv.remove(); return out; });
ok(!paint.length, 'every Book Seven vision backdrop paints at phone width ' + paint.slice(0, 4).join(' | '));
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
