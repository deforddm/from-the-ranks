// Book Nine's seven visions (168_b9_visions.js, art 168b): each is reached the way a player reaches it, from its chapter's reading
// (b9_c<n>_read → "Let him/her draw." or "Let her lay them." → the card or tile screen → "✦ Look into the card/tile"), played to the end,
// lands back on that chapter's card node (b9_c<n>_card), counted as the reader's, and that node's one button goes to the reading's back
// node (B9READ[n].back). Book Nine reads through each squad's own reader (160c's b9As): the Third (1, 3, 5, 7) Marrow, else Tallow, else
// the old marine; the Letherii (2, 4, 6) Perrit, else the tile-woman. Every vision is played with every reader its squad has, set up the
// real way (the squad changed, the chain unchanged); the closing step is spoken by that reader, opens the house way ("lets the card go",
// "puts the card face down", "turns the tile face down", "puts her hand over the tile") and draws that reader's figure; "hands are cold"
// closes only each squad's first and last vision, and only for the women readers (inside the trope cap). Each vision is also played from
// the journal with every choice picked, and a second watching gets 36b's replay line; every step of every vision is reached (no node
// orphaned). The choices set words-only flags (b9v<n>_*, read by nothing outside 168). No page errors, no undefined/NaN/${ in the text,
// no bare "—" button. Every backdrop paints at phone width, each vision has its own; each opener names its canon viewpoint; the new
// figures are drawn. The words keep the book's closed doors (dod-canon §4, §5; series-canon §(a), rules 84-97): no never-use name, no
// Burn's Sleep year, no exclamation marks in narration, never Tavore's thoughts, never a card dealt outside vision 1 or "King of Life",
// never the Errant, never the Forkrul or the Che'Malle's side, never the Glass Desert, never a missing officer found dead.
// Usage: node tools/b9visions_test.mjs   (build first; exit 1 on a failure)
import fs from 'node:fs'; import path from 'node:path';
import { server, browser, openGame } from './page.mjs';
const SRC = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'src');
const srv = await server(); const br = await browser();
const { page, errors } = await openGame(br, srv.url, { fast: true, width: 390, height: 844 });
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
const ev = (f, a) => page.evaluate(f, a);
const BAD = /\bundefined\b|\bNaN\b|\$\{|\[object/;
const RD = {
  marrow:{name:'Marrow', fig:'marrow', line:/^Marrow lets the card go/, sh:'She', cd:'card'},
  tallow:{name:'Tallow', fig:'tallow', line:/^Tallow puts the card face down/, sh:'He', cd:'card'},
  oldninth:{name:'The old marine', fig:'b4v_oldninth', line:/^The old marine lets the card go/, sh:'He', cd:'card'},
  perrit:{name:'Perrit', fig:'perrit', line:/^Perrit turns the tile face down/, sh:'She', cd:'tile'},
  tilewoman:{name:'The tile-woman', fig:'b5_c1_tilewoman', line:/^The tile-woman puts her hand/, sh:'She', cd:'tile'},
};
const THIRD = ['marrow', 'tallow', 'oldninth'], LETH = ['perrit', 'tilewoman'];
const setup = (ch, rid) => ev(([ch, rid]) => {
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  setBook('dod'); S = newStateDOD('Hask', 'Brann'); S.chapters = {};
  migrate(S); S.picksDue = []; if (S.th && S.th.l) S.th.l.picksDue = []; if (S.th && S.th.t) S.th.t.picksDue = []; save(); startChapter(ch); S.picksDue = [];
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  const out = k => { S.squad = S.squad.filter(x => x !== k); }, inn = k => { if (!S.squad.includes(k)) S.squad.push(k); if (S.dead) delete S.dead[k]; S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; };
  if (rid === 'tallow') { out('marrow'); inn('tallow'); } if (rid === 'oldninth') { out('marrow'); out('tallow'); }
  if (rid === 'tilewoman') out('perrit'); if (rid === 'perrit') inn('perrit'); if (rid === 'marrow') inn('marrow');
  S.seenVisions = []; S.tuftVisions = []; notes = []; save(); if (view !== 'explore') startExplore();
  return {rd:visReader().id, name:visReader().name, thread:S.thread, book:S.book, ch:S.chapter};
}, [ch, rid]);

// ---- registration ----
const reg = await ev(() => { setBook('dod'); S = newStateDOD('R', 'T'); migrate(S); const mine = Object.keys(VISIONS).filter(k => VISIONS[k].book === 'dod');
  return {b9:mine.map(k => [k, VISIONS[k].ch, !VISIONS[k].cards, VISIONS[k].steps.length]),
  bgs:[...new Set(mine.flatMap(k => [VISIONS[k].bg, ...VISIONS[k].steps.map(s => s.bg).filter(Boolean)]))].filter(b => !VISBG[b]),
  ownBg:new Set(mine.map(k => VISIONS[k].bg)).size,
  figs:[...new Set(mine.flatMap(k => [VISIONS[k].fig, ...VISIONS[k].steps.map(s => typeof s === 'object' && !Object.getOwnPropertyDescriptor(s, 'fig')?.get ? s.fig : null).filter(f => typeof f === 'string' && f)]))],
  art:['b9v_brys', 'b9v_koryk', 'b9v_aranict', 'b9v_henar', 'b9v_gurull', 'b7v_fiddler', 'keneb', 'b7_malregular', 'b2soldier', 'b5_letherii', 'b9_c3_healer', 'marrow', 'tallow', 'b4v_oldninth', 'perrit', 'b5_c1_tilewoman'].filter(f => !FIGX[f]),
  openers:mine.map(k => { const V = VISIONS[k], t = typeof V.steps[0].txt === 'function' ? V.steps[0].txt() : V.steps[0].txt; return [k, V.who, t.slice(0, 160)]; }),
  sets:mine.flatMap(k => VISIONS[k].steps.flatMap(st => (st.ch || []).map(c => [k, c.set[0]]))),
  hands:mine.map(k => { const end = VISIONS[k].steps[VISIONS[k].steps.length - 1], _vr = VISREADER, n = [];
    ['marrow', 'tallow', 'oldninth', 'perrit', 'tilewoman'].forEach(id => { VISREADER = () => ({id, name:id, he:id === 'tallow' || id === 'oldninth'}); if (/hands are cold/.test(end.txt())) n.push(id); }); VISREADER = _vr; return n.join('+') || '-'; }),
  }; });
ok(reg.b9.length === 7 && reg.b9.every(([k, ch, nc], i) => k === `b9v${i + 1}` && ch === i + 1 && nc), `seven Book Nine visions b9v1..b9v7, one per chapter, none keyed by card (${reg.b9.map(x => x[0]).join(' ')})`);
const WHO = ['Fiddler', 'Brys Beddict', 'Koryk', 'Aranict', 'Keneb', 'Henar Vygulf', 'Gu\'Rull'];
ok(reg.openers.every(([k, who, t], i) => who === WHO[i] && t.includes(who)), `each vision's opener is through its canon eyes (dod-canon §9: ${reg.openers.map(o => o[1]).join(', ')})`);
ok(!reg.bgs.length && reg.ownBg === 7, `every Book Nine vision has its own backdrop, a VISBG entry ${reg.bgs.join(' ')}`);
ok(!reg.art.length, `168b's figures, the reused canon figures and the readers' are all drawn ${reg.art.join(' ')}`);
const figOk = await ev(figs => figs.filter(f => !FIGX[f]), reg.figs);
ok(!figOk.length, `every vision figure exists (${reg.figs.join(' ')}) ${figOk.join(' ')}`);
ok(reg.hands.join() === 'marrow,perrit+tilewoman,-,-,-,perrit+tilewoman,marrow', `"hands are cold" closes only each squad's first and last vision, for its women readers (${reg.hands.join()})`);
// words-only flags: every choice sets a b9v<n>_ key of its own vision, and no file but 168 reads one
const own = reg.sets.every(([k, f]) => f.startsWith(k + '_'));
const readers = fs.readdirSync(SRC).filter(f => f.endsWith('.js') && !/^168/.test(f) && /\bb9v\d_/.test(fs.readFileSync(path.join(SRC, f), 'utf8')));
const artReads = (fs.readFileSync(path.join(SRC, '168b_b9_visions_art.js'), 'utf8').match(/S\.f\.(\w+)/g) || []).filter(x => !/S\.f\.b9v\d_/.test(x));
ok(own && reg.sets.length >= 14 && !readers.length && !artReads.length, `the choices set words-only flags (${reg.sets.length}, each b9v<n>_*), read by nothing outside 168 ${readers.join(' ')} ${artReads.join(' ')}`);

// ---- visionFor: Book Nine by chapter; Books Seven and Eight unchanged ----
const vf = await ev(() => { const was = S; const out = {};
  S = newStateDOD('V', 'W'); S.book = 'dod'; out.dod = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, B9POOL[c][0])).join() + '|' + visionFor(3, 'blank');
  S = {book:'rg'}; out.rg = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b2c_soldier')).join();
  S = {book:'tth'}; out.tth = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b2c_soldier')).join();
  S = was; return out; });
ok(vf.dod === 'b9v1,b9v2,b9v3,b9v4,b9v5,b9v6,b9v7|null', `Book Nine's visionFor gives each chapter its vision, for any card but the blank (${vf.dod})`);
ok(vf.rg === 'b7v1,b7v2,b7v3,b7v4,b7v5,b7v6,b7v7' && vf.tth === 'b8v1,b8v2,b8v3,b8v4,b8v5,b8v6,b8v7', `Books Seven and Eight's visionFor are unchanged (${vf.tth})`);
const nm = await ev(() => { const was = S, _vr = VISREADER; const out = {};
  S = {book:'hoc', squad:[], dead:{}}; out.hoc = visReader().name; S = was; return out; });
ok(nm.hoc === 'The old soldier', `the old marine's Book Nine name leaves Book Four's old soldier alone (${nm.hoc})`);

// ---- the closed doors: every word of every vision, every choice, every reader ----
const words = await ev(([ALL]) => { const out = [];
  setBook('dod'); S = newStateDOD('W', 'X'); migrate(S);
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'dod').forEach(id => { const V = VISIONS[id];
    out.push(V.who, V.where, V.cap);
    const sets = {}; V.steps.forEach(st => (st.ch || []).forEach(c => { (sets[c.set[0]] ||= []).push(c.set[1]); }));
    const keys = Object.keys(sets); for (let r = 0; r < 3; r++) { keys.forEach(k => { S.f[k] = sets[k][r % sets[k].length]; });
      V.steps.forEach(st => { if (st.ch || !Object.getOwnPropertyDescriptor(st, 'sp')?.get) { out.push(typeof st.txt === 'function' ? st.txt() : st.txt); (st.ch || []).forEach(c => out.push(c.t)); if (st.go) out.push(st.go); } }); }
    const end = V.steps[V.steps.length - 1]; const _vr = VISREADER;
    [...ALL, 'stranger'].forEach(id2 => { VISREADER = () => ({id:id2, name:id2 === 'stranger' ? 'A stranger' : id2, he:id2 === 'tallow' || id2 === 'oldninth'}); out.push(end.txt()); });
    VISREADER = _vr; });
  return out.join('\n'); }, [[...THIRD, ...LETH]]);
const NEVER = [/Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|\bTalon\b|\bEel\b|T'orrud/, /Burn's Sleep|\b1\d{3}\b|\bBS\b/, /Crippled God|Chained One|\bchains?\b|Fallen God/i, /Kolanse|Sinter|\bheart of\b|god's heart/,
  /Glass Desert|drink(ing)? (blood|urine)|Bugg|dagger/i, /Forkrul|Akhrast|Korvalain|\bPures?\b|Quitters/, /Che'Malle|K'Chain|Nah'ruk|Matron|Kalyth|Shi'gal|sky keep|Gesler|Stormy|Mortal Sword|Shield Anvil/,
  /\bTool\b|T'lan|Imass|Senan|Hetan|Stolmen|Sekara/, /\bSinn\b|\bGrub\b|Icarium|warren/, /King of Life|Virgin of Death|Errant|Errastas|Ublala|Seren|Trull/, /Hedge|Bridgeburner|Bavedict|kitten/,
  /Run'Thurvian|Tanakalian|Krughava|Felash|Abrastal|\bGall\b|Khundryl|Perish|Bolkando/, /Draconus|Kilmandaros|Sechul|Olar Ethil|\bHood\b/, /Twilight|Yedan|Shake|Liosan/, /Kalam|Deadsmell|Lostara|Ruthan|Banaschar|Pores/,
  /Whiskeyjack|\bToc\b|Tavore/, /\bdragons?\b|Eleint/i, /\bmonths?\b|\bspring\b|\bsummer\b|\bautumn\b|\bwinter\b/i, /ascend|sacrifice/i];
NEVER.forEach(re => { const m = words.match(new RegExp('.{0,40}' + re.source + '.{0,40}', re.flags)); ok(!m, `no ${re.source} in the visions ${m ? '"' + m[0].replace(/\n/g, ' ') + '"' : ''}`); });
ok(!/!/.test(words.replace(/"[^"]*"/g, '')), 'no exclamation marks in the narration');
const stop = await ev(() => { const t = id => VISIONS[id].steps.filter(st => st.ch || !Object.getOwnPropertyDescriptor(st, 'sp')?.get).map(st => typeof st.txt === 'function' ? st.txt() : st.txt).join(' ');
  const all = id => { const o = []; const sets = {}; VISIONS[id].steps.forEach(st => (st.ch || []).forEach(c => (sets[c.set[0]] ||= []).push(c.set[1]))); for (let r = 0; r < 3; r++) { Object.keys(sets).forEach(k => S.f[k] = sets[k][r % sets[k].length]); o.push(t(id)); } return o.join(' '); };
  const every = [1, 2, 3, 4, 5, 6, 7].map(n => all('b9v' + n)).join(' ');
  return {tavore:/(Adjunct|she)('s| is| was)? (thinks|thought|wants|wanted|feels|felt|knows|knew|means|meant|fears|hopes|plans)\b|her (purpose|plan|reason)/i.test((all('b9v1') + all('b9v5')).replace(/what the Adjunct wants, because he does not know/g, '')),
    card:/(Magus of Dark)/.test(every.replace(all('b9v1'), '')) || /King of Life|card (for|in front of) the King's brother/i.test(every), cardOne:/The Magus of Dark/.test(all('b9v1')) && /gives her nothing/.test(all('b9v1')),
    brys:/(died|dead|death|came back|woke|wakes|rose|risen)\b/i.test(all('b9v2') + all('b9v4') + all('b9v6')),
    keneb:/(dies|died|killed|charge|his death|last ride|never come back)/i.test(all('b9v5')),
    gurull:/(Quick Ben|Bottle|Keneb|Fist|High Mage|Adjunct|captain)/.test(all('b9v7')) || /sent (him|by)|who sent/.test(all('b9v7')), field:/short-tails/.test(all('b9v7')) && /trail/.test(all('b9v7')),
    henar:/(Forkrul|Assail|Korvalain|the Pure|Nah'ruk|K'Chain)/.test(all('b9v6'))}; });
ok(!stop.tavore, 'Visions 1 and 5 never give the Adjunct\'s thoughts (rules 55, 84)');
ok(!stop.card && stop.cardOne, 'a card is dealt only in vision 1 (the Magus of Dark; nothing for the Adjunct), and the King\'s brother\'s card is never turned (rule 92)');
ok(!stop.brys, 'Visions 2, 4 and 6 never touch Brys\'s death or waking (rule 92)');
ok(!stop.keneb, 'Vision 5 stops at the summons: nothing of the charge or after (rule 86)');
ok(!stop.gurull && stop.field, 'Vision 7 is headline: the short-tails, a trail away, nobody on the field found or named, never who sent him (rules 86, 88)');
ok(!stop.henar, 'Vision 6\'s stories name no people (rule 87)');

// ---- the readers, set up the real way ----
for (const [ch, list] of [[1, THIRD], [2, LETH]]) for (const rid of list) { const got = await setup(ch, rid); ok(got.rd === rid && got.name === RD[rid].name && got.book === 'dod' && got.thread === (ch % 2 ? 't' : 'l'), `Chapter ${ch}: Book Nine's reader set up the real way: ${rid} "${got.name}" (got ${got.rd}, thread ${got.thread})`); }

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
for (const [id, ch] of reg.b9) (ch % 2 ? THIRD : LETH).forEach(rid => plays.push([id, ch, rid]));
for (const [id, ch, rid] of plays) { const r = RD[rid];
  await setup(ch, rid);
  const card = await ev(async ([id, ch]) => { const wait = ms => new Promise(f => setTimeout(f, ms));
    talk(`b9_c${ch}_read`); await wait(60); const b = [...document.querySelectorAll('#sheet .choice')].find(x => /^Let (him|her) (draw|lay them)\./.test(x.textContent.trim())); if (!b) return {err:`no "Let him/her draw" button: ${[...document.querySelectorAll('#sheet .choice')].map(x => x.textContent.trim()).join(' | ')}`}; b.click(); await wait(250);
    const fx = $('#cardfx'), vb = document.querySelector('#cfVis'); if (!vb) return {err:`no "Look into" button (card ${S.card}, cardfx ${fx && !fx.hidden})`};
    const label = vb.textContent.trim(); vb.click(); await wait(150); return {label, vis:VIS && VIS.id, card:S.card, kick:($('.vhud .kick') || {}).textContent, drawn:S.f[`b9_c${ch}_drawn`], reader:S.f[`b9_c${ch}_reader`]}; }, [id, ch]);
  if (card.err) { ok(false, `${id} (${r.name}): reachable from b9_c${ch}_read: ${card.err}`); continue; }
  const kick = r.cd === 'tile' ? 'Through the Tiles' : 'Through the Deck';
  ok(new RegExp(`Look into the ${r.cd}`).test(card.label) && card.kick === kick && card.reader === rid, `${id} (${r.name}): from b9_c${ch}_read the screen offers "${card.label}", headed "${card.kick}", read by ${card.reader}`);
  const o = await stepThrough(1);
  const back = await ev(id => ({ node:S.node, sp:($('#sheet .sp') || {}).textContent || '', sheet:!$('#sheet').hidden, mine:(S.tuftVisions || []).includes(id), seen:(S.seenVisions || []).includes(id), body:document.body.classList.contains('vision'), book:S.book,
    btns:[...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()) }), id);
  ok(card.vis === id && !o.probs.length && [...o.dashes].length === 0, `${id} (${r.name}): from Chapter ${ch}'s reading (${card.card}) it plays, ${o.steps} steps, text clean ${o.probs.slice(0, 3).join(' | ')}`);
  ok(o.last.sp === r.name && r.line.test(o.last.txt) && o.last.fig === r.fig, `${id} (${r.name}): it ends in ${r.name}'s own words with ${r.name}'s figure ("${(o.last.txt || '').slice(0, 56)}…", ${o.last.fig})`);
  ok(back.node === `b9_c${ch}_card` && back.sheet && (r.cd === 'tile' ? /Tiles of the Holds/ : /Deck of Dragons/).test(back.sp) && back.mine && back.seen && !back.body && back.book === 'dod', `${id} (${r.name}): back on b9_c${ch}_card afterwards (node ${back.node}, "${back.sp}", book ${back.book}), counted as the reader's`);
  const home = await ev(async ch => { const wait = ms => new Promise(f => setTimeout(f, ms)); const want = B9READ[ch].back, b = document.querySelector('#sheet #ch0'); if (!b) return {err:'no button'}; b.click(); await wait(80); return {node:S.node, want, err:null}; }, ch);
  ok(!home.err && home.node === home.want, `${id} (${r.name}): the card's "${back.btns[0]}" goes to the reading's back node ${home.want} (now ${home.node})`);
}

// ---- from the journal: every choice, the replay line, every step reached ----
for (const [id, ch, , n] of reg.b9) { const rid = ch % 2 ? 'oldninth' : 'perrit', r = RD[rid];
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
ok(jl === 'b9v1 b9v2 b9v3 b9v4', `the journal lists Book Nine's visions by chapter reached (Chapter 4: ${jl})`);

const paint = await ev(() => { const out = []; const cv = document.createElement('canvas'); cv.style.cssText = 'width:360px;height:154px;position:fixed;left:0;top:0'; document.body.appendChild(cv);
  setBook('dod'); S = newStateDOD('P', 'Q');
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'dod').forEach(id => VISIONS[id].steps.forEach((st, i) => { ['low', 'high'].forEach(lw => { S.f.b9v7_low = lw; [0, 3000, 17000].forEach(t => { try { VIS = {id, step:i}; drawVision(cv, {id, bg:st.bg || VISIONS[id].bg, fig:(Object.getOwnPropertyDescriptor(st, 'fig')?.get ? 'marrow' : st.fig) || VISIONS[id].fig, step:i}, t); } catch (e) { out.push(`${id}/${i}: ${e.message}`); } }); }); }));
  VIS = null; cv.remove(); return out; });
ok(!paint.length, 'every Book Nine vision backdrop paints at phone width ' + paint.slice(0, 4).join(' | '));
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
