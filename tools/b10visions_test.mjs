// Book Ten's seven visions (188_b10_visions.js, art 188b): each is reached the way a player reaches it, from its chapter's reading
// (b10_c<n>_read -> "Let him/her draw." or "Let her lay them." -> the card or tile screen -> "Look into the card/tile"), played to the end,
// lands back on that chapter's card node (b10_c<n>_card; Ch 7's is b10_c7_card), counted as the reader's, and that node's one button goes to
// the reading's back node (B10READ[n].back). Book Ten reads through each squad's own reader (180c's b10As): the Third (1, 3, 5, 7) Marrow,
// else Tallow, else the old marine; the Letherii (2, 4, 6) Perrit, else the tile-woman. Every vision is played with every reader its squad
// has; the closing step is spoken by that reader, opens the house way and draws that reader's figure; "hands are cold" closes only each
// squad's first and last vision, for the women readers. Each vision is also played from the journal with every choice picked, and a second
// watching gets 36b's replay line; every step is reached. The choices set words-only flags (b10v<n>_*, read by nothing outside 188). No
// page errors, no undefined/NaN/${ in the text. Every backdrop paints at phone width on both roads of each squad. The words keep the
// book's closed doors (tcg-canon §4, §5 rules 98-111; series-canon §(a)) on both roads: no never-use name, no Burn's Sleep year, no count
// of days, weeks or months, no "!" in narration, no sentence opening on Nobody/Somebody, never the Adjunct's thoughts, the Crippled God
// named by the narration only in vision 7 and never by a reader, never the god's heart or bonds, never the gate, the Snake, the lake, a Pure,
// the Che'Malle by name, Krughava, Tanakalian, Abrastal, Paran, Kalam or Hood; vision 1 stops before Bottle walks in, vision 3 has no child
// in the traces, vision 4 no rider, vision 6 never the Gilk's orders or Spax's end, vision 7 names no one and ends on the book opened.
// Usage: node tools/b10visions_test.mjs   (build first; exit 1 on a failure)
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
  setBook('tcg'); S = newStateTCG('Hask', 'Brann'); S.chapters = {};
  migrate(S); S.picksDue = []; if (S.th && S.th.l) S.th.l.picksDue = []; if (S.th && S.th.t) S.th.t.picksDue = []; save(); startChapter(ch); S.picksDue = [];
  document.querySelectorAll('#modal,#chars,#settings,#cardfx').forEach(e => e.hidden = true);
  const out = k => { S.squad = S.squad.filter(x => x !== k); }, inn = k => { if (!S.squad.includes(k)) S.squad.push(k); if (S.dead) delete S.dead[k]; S.loy[k] ??= 0; S.gear[k] ??= {}; S.picks[k] ??= []; };
  if (rid === 'tallow') { out('marrow'); inn('tallow'); } if (rid === 'oldninth') { out('marrow'); out('tallow'); }
  if (rid === 'tilewoman') out('perrit'); if (rid === 'perrit') inn('perrit'); if (rid === 'marrow') inn('marrow');
  S.seenVisions = []; S.tuftVisions = []; notes = []; save(); if (view !== 'explore') startExplore();
  return {rd:visReader().id, name:visReader().name, thread:S.thread, book:S.book, ch:S.chapter};
}, [ch, rid]);

// ---- registration ----
const reg = await ev(() => { setBook('tcg'); S = newStateTCG('R', 'T'); migrate(S); const mine = Object.keys(VISIONS).filter(k => VISIONS[k].book === 'tcg');
  return {b10:mine.map(k => [k, VISIONS[k].ch, !VISIONS[k].cards, VISIONS[k].steps.length]),
  bgs:[...new Set(mine.flatMap(k => [VISIONS[k].bg, ...VISIONS[k].steps.map(s => s.bg).filter(Boolean)]))].filter(b => !VISBG[b]),
  ownBg:new Set(mine.map(k => VISIONS[k].bg)).size,
  figs:[...new Set(mine.flatMap(k => [VISIONS[k].fig, ...VISIONS[k].steps.map(s => typeof s === 'object' && !Object.getOwnPropertyDescriptor(s, 'fig')?.get ? s.fig : null).filter(f => typeof f === 'string' && f)]))].filter(Boolean),
  art:['b10v_cuttle', 'b10v_shortnose', 'b10v_bottle', 'b10v_spax', 'b9v_aranict', 'b9v_brys', 'gesler', 'bent', 'b7_malregular', 'marrow', 'tallow', 'b4v_oldninth', 'perrit', 'b5_c1_tilewoman'].filter(f => !FIGX[f]),
  openers:mine.map(k => { const V = VISIONS[k], t = typeof V.steps[0].txt === 'function' ? V.steps[0].txt() : V.steps[0].txt; return [k, V.who, t.slice(0, 160)]; }),
  sets:mine.flatMap(k => VISIONS[k].steps.flatMap(st => (st.ch || []).map(c => [k, c.set[0]]))),
  hands:mine.map(k => { const end = VISIONS[k].steps[VISIONS[k].steps.length - 1], _vr = VISREADER, n = [];
    ['marrow', 'tallow', 'oldninth', 'perrit', 'tilewoman'].forEach(id => { VISREADER = () => ({id, name:id, he:id === 'tallow' || id === 'oldninth'}); if (/hands are cold/.test(end.txt())) n.push(id); }); VISREADER = _vr; return n.join('+') || '-'; }),
  }; });
ok(reg.b10.length === 7 && reg.b10.every(([k, ch, nc], i) => k === `b10v${i + 1}` && ch === i + 1 && nc), `seven Book Ten visions b10v1..b10v7, one per chapter, none keyed by card (${reg.b10.map(x => x[0]).join(' ')})`);
const WHO = ['Cuttle', 'Aranict', 'Shortnose', 'Gesler', 'Bottle', 'Spax', 'The Crippled God'];
ok(reg.openers.every(([k, who, t], i) => who === WHO[i] && t.includes(who)), `each vision's opener is through its canon eyes (tcg-canon §9: ${reg.openers.map(o => o[1]).join(', ')})`);
ok(!reg.bgs.length && reg.ownBg === 7, `every Book Ten vision has its own backdrop, a VISBG entry ${reg.bgs.join(' ')}`);
ok(!reg.art.length, `188b's figures, the reused canon figures and the readers' are all drawn ${reg.art.join(' ')}`);
const figOk = await ev(figs => figs.filter(f => !FIGX[f]), reg.figs);
ok(!figOk.length, `every vision figure exists (${reg.figs.join(' ')}) ${figOk.join(' ')}`);
ok(reg.hands.join() === 'marrow,perrit+tilewoman,-,-,-,perrit+tilewoman,marrow', `"hands are cold" closes only each squad's first and last vision, for its women readers (${reg.hands.join()})`);
// words-only flags: every choice sets a b10v<n>_ key of its own vision, and no file but 188 reads one
const own = reg.sets.every(([k, f]) => f.startsWith(k + '_'));
const readers = fs.readdirSync(SRC).filter(f => f.endsWith('.js') && !/^188/.test(f) && /\bb10v\d_/.test(fs.readFileSync(path.join(SRC, f), 'utf8')));
const artReads = (fs.readFileSync(path.join(SRC, '188b_b10_visions_art.js'), 'utf8').match(/S\.f\.(\w+)/g) || []).filter(x => !/S\.f\.b10v\d_/.test(x));
ok(own && reg.sets.length >= 14 && !readers.length && !artReads.length, `the choices set words-only flags (${reg.sets.length}, each b10v<n>_*), read by nothing outside 188 ${readers.join(' ')} ${artReads.join(' ')}`);

// ---- visionFor: Book Ten by chapter; Books Eight and Nine unchanged ----
const vf = await ev(() => { const was = S; const out = {};
  S = newStateTCG('V', 'W'); S.book = 'tcg'; out.tcg = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, B10POOL[c][0])).join() + '|' + visionFor(3, 'blank');
  S = {book:'dod'}; out.dod = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b2c_soldier')).join();
  S = {book:'tth'}; out.tth = [1, 2, 3, 4, 5, 6, 7].map(c => visionFor(c, 'b2c_soldier')).join();
  S = was; return out; });
ok(vf.tcg === 'b10v1,b10v2,b10v3,b10v4,b10v5,b10v6,b10v7|null', `Book Ten's visionFor gives each chapter its vision, for any card but the blank (${vf.tcg})`);
ok(vf.dod === 'b9v1,b9v2,b9v3,b9v4,b9v5,b9v6,b9v7' && vf.tth === 'b8v1,b8v2,b8v3,b8v4,b8v5,b8v6,b8v7', `Books Eight and Nine's visionFor are unchanged (${vf.dod})`);

// ---- the closed doors: every word of every vision, every choice, every reader, both roads of each squad ----
const words = await ev(([ALL]) => { const out = [];
  setBook('tcg'); S = newStateTCG('W', 'X'); migrate(S);
  [['adjunct', 'escort'], ['south', 'adjunct']].forEach(([tr, lr]) => { S.f.b10_tRoad = tr; S.f.b10_lRoad = lr;
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'tcg').forEach(id => { const V = VISIONS[id];
    S.thread = V.ch % 2 ? 't' : 'l'; S.chapter = V.ch;
    out.push(V.who, V.where, V.cap);
    const sets = {}; V.steps.forEach(st => (st.ch || []).forEach(c => { (sets[c.set[0]] ||= []).push(c.set[1]); }));
    const keys = Object.keys(sets); for (let r = 0; r < 3; r++) { keys.forEach(k => { S.f[k] = sets[k][r % sets[k].length]; });
      V.steps.forEach(st => { if (st.ch || !Object.getOwnPropertyDescriptor(st, 'sp')?.get) { out.push(typeof st.txt === 'function' ? st.txt() : st.txt); (st.ch || []).forEach(c => out.push(c.t)); if (st.go) out.push(st.go); } }); }
    const end = V.steps[V.steps.length - 1]; const _vr = VISREADER;
    [...ALL, 'stranger'].forEach(id2 => { VISREADER = () => ({id:id2, name:id2 === 'stranger' ? 'A stranger' : id2, he:id2 === 'tallow' || id2 === 'oldninth'}); out.push('@@' + id + '@@' + end.txt()); });
    VISREADER = _vr; }); });
  S.thread = 't'; return out.join('\n'); }, [[...THIRD, ...LETH]]);
const NEVER = [/Kellanved|Dancer|Ammanas|Laseen|Surly|Topper|\bTalon\b|\bEel\b|T'orrud/, /Burn's Sleep|\b1\d{3}\b|\bBS\b/, /\bchain|\bheart\b|Korabas|Cotillion|\bknife\b/i,
  /Icarias|\bgate\b|Snake|Badalle|Saddic|Rutt\b|\bHeld\b|Shards|cairn/, /Blistig|Pores|Tarr\b|Bugg|dagger|blood|urine/i, /Forkrul|Akhrast|Korvalain|\bPures?\b|Watered|Reverence|Diligence|Serenity|\bCalm\b|Aloft/,
  /Che'Malle|K'Chain|Ve'Gath|Matron|Kalyth|Gu'Rull|Krughava|Tanakalian|Setoc|Syndecan|Mortal Sword|Shield Anvil/, /Abrastal|Felash|Faint|Amby|Precious|Trygalle|Empty Hold|Saphii/,
  /Tavore|Paran|Ganoes|Mathok|Kalam|Quick Ben|Hood\b|Whiskeyjack|Korlat|Errant|Errastas|Ruthan|Banaschar|Hedge|Bavedict/, /Silchas|Tulas|T'iam|Apsal|Nimander|Eleint|Draconus|Olar Ethil|Kilmandaros|Sechul|Icarium|Karsa/,
  /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|a few|few|many|several|some) (days?|weeks?|months?)\b|\b(weeks?|months?)\b/i, /Bridgeburner|\bTool\b|Onrack|Urugal/];
NEVER.forEach(re => { const m = words.match(new RegExp('.{0,40}' + re.source + '.{0,40}', re.flags)); ok(!m, `no ${re.source} in the visions ${m ? '"' + m[0].replace(/\n/g, ' ') + '"' : ''}`); });
ok(!/!/.test(words.replace(/"[^"]*"/g, '')), 'no exclamation marks in the narration');
ok(!/(^|[.?!]\s+|["`]\s*)(Nobody|Somebody)\b/m.test(words), 'no sentence opens on Nobody or Somebody (the trope budget is tight)');
const stop = await ev(() => { const t = id => VISIONS[id].steps.filter(st => st.ch || !Object.getOwnPropertyDescriptor(st, 'sp')?.get).map(st => typeof st.txt === 'function' ? st.txt() : st.txt).join(' ');
  const all = id => { const o = []; const sets = {}; VISIONS[id].steps.forEach(st => (st.ch || []).forEach(c => (sets[c.set[0]] ||= []).push(c.set[1]))); for (let r = 0; r < 3; r++) { Object.keys(sets).forEach(k => S.f[k] = sets[k][r % sets[k].length]); o.push(t(id)); } return o.join(' '); };
  const each = [1, 2, 3, 4, 5, 6, 7].map(n => [n, all('b10v' + n) + ' ' + VISIONS['b10v' + n].who + ' ' + VISIONS['b10v' + n].where + ' ' + VISIONS['b10v' + n].cap]);
  return {god:each.filter(([n, w]) => /Crippled God/.test(w)).map(x => x[0]).join(), godOnce:(all('b10v7').match(/Crippled God/g) || []).length,
    adjunct:/(Adjunct|Tavore)('s| is| was)? (thinks|thought|wants|wanted|feels|felt|knows|knew|means|meant|fears|hopes|plans)\b|Adjunct's (purpose|plan|reason)/i.test(each.map(x => x[1]).join(' ')),
    bottle:/walks? in\b|walked in|comes back|is alive|alive after all/i.test(all('b10v1')),
    child:/\b(child|children|girl|boy)\b/i.test(all('b10v3')), rider:/\b(rider|rides? (in|up|out)|horsem)/i.test(all('b10v4')),
    spax:/(dies|died|killed|his death|falls dead|ordered|order)/i.test(all('b10v6')), names:/\b(names? (them|him|her)\b|wrote [A-Z])/.test(all('b10v7').replace(/names no one/, '')),
    book:/a book, opened\.$/.test(all('b10v7').trim()), lake:/\b(water under|lake|wet ground)\b/i.test(all('b10v5').replace(/as water comes up through wet ground/, '')) }; });
ok(stop.god === '7' && stop.godOnce >= 1, `the narration names the Crippled God only in vision 7 (rule 98: ${stop.god})`);
ok(!stop.adjunct, 'no vision gives the Adjunct\'s thoughts (rules 55, 84)');
ok(!stop.bottle, 'Vision 1 stops before Bottle walks in');
ok(!stop.child, 'Vision 3 has no child in the traces (tcg-canon §9.3)');
ok(!stop.rider, 'Vision 4 stops at grey light, before any rider (Krughava\'s ride never shown)');
ok(!stop.spax, 'Vision 6 never touches the Gilk\'s orders or Spax\'s end');
ok(!stop.names && stop.book, 'Vision 7: the god names no one, and it ends on the book being opened');
ok(!stop.lake, 'Vision 5 keeps the lake out (rule 102)');
// the readers' words: soldiers say "the Fallen One", never the god's name
const rd7 = words.split('\n').filter(l => l.startsWith('@@b10v7@@')).join(' ');
ok(/Fallen One/.test(rd7) && !/Crippled God/.test(rd7), 'the readers of vision 7 say "the Fallen One", never the god\'s name (rule 98)');

// ---- the readers, set up the real way ----
for (const [ch, list] of [[1, THIRD], [2, LETH]]) for (const rid of list) { const got = await setup(ch, rid); ok(got.rd === rid && got.name === RD[rid].name && got.book === 'tcg' && got.thread === (ch % 2 ? 't' : 'l'), `Chapter ${ch}: Book Nine's reader set up the real way: ${rid} "${got.name}" (got ${got.rd}, thread ${got.thread})`); }

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
for (const [id, ch] of reg.b10) (ch % 2 ? THIRD : LETH).forEach(rid => plays.push([id, ch, rid]));
for (const [id, ch, rid] of plays) { const r = RD[rid];
  await setup(ch, rid);
  const card = await ev(async ([id, ch]) => { const wait = ms => new Promise(f => setTimeout(f, ms));
    talk(`b10_c${ch}_read`); await wait(60); const b = [...document.querySelectorAll('#sheet .choice')].find(x => /^Let (him|her) (draw|lay them)\./.test(x.textContent.trim())); if (!b) return {err:`no "Let him/her draw" button: ${[...document.querySelectorAll('#sheet .choice')].map(x => x.textContent.trim()).join(' | ')}`}; b.click(); await wait(250);
    const fx = $('#cardfx'), vb = document.querySelector('#cfVis'); if (!vb) return {err:`no "Look into" button (card ${S.card}, cardfx ${fx && !fx.hidden})`};
    const label = vb.textContent.trim(); vb.click(); await wait(150); return {label, vis:VIS && VIS.id, card:S.card, kick:($('.vhud .kick') || {}).textContent, drawn:S.f[`b10_c${ch}_drawn`], reader:S.f[`b10_c${ch}_reader`]}; }, [id, ch]);
  if (card.err) { ok(false, `${id} (${r.name}): reachable from b10_c${ch}_read: ${card.err}`); continue; }
  const kick = r.cd === 'tile' ? 'Through the Tiles' : 'Through the Deck';
  ok(new RegExp(`Look into the ${r.cd}`).test(card.label) && card.kick === kick && card.reader === rid, `${id} (${r.name}): from b10_c${ch}_read the screen offers "${card.label}", headed "${card.kick}", read by ${card.reader}`);
  const o = await stepThrough(1);
  const back = await ev(id => ({ node:S.node, sp:($('#sheet .sp') || {}).textContent || '', sheet:!$('#sheet').hidden, mine:(S.tuftVisions || []).includes(id), seen:(S.seenVisions || []).includes(id), body:document.body.classList.contains('vision'), book:S.book,
    btns:[...document.querySelectorAll('#sheet .choice')].map(b => b.textContent.trim()) }), id);
  ok(card.vis === id && !o.probs.length && [...o.dashes].length === 0, `${id} (${r.name}): from Chapter ${ch}'s reading (${card.card}) it plays, ${o.steps} steps, text clean ${o.probs.slice(0, 3).join(' | ')}`);
  ok(o.last.sp === r.name && r.line.test(o.last.txt) && o.last.fig === r.fig, `${id} (${r.name}): it ends in ${r.name}'s own words with ${r.name}'s figure ("${(o.last.txt || '').slice(0, 56)}…", ${o.last.fig})`);
  ok(back.node === `b10_c${ch}_card` && back.sheet && (r.cd === 'tile' ? /Tiles of the Holds/ : /Deck of Dragons/).test(back.sp) && back.mine && back.seen && !back.body && back.book === 'tcg', `${id} (${r.name}): back on b10_c${ch}_card afterwards (node ${back.node}, "${back.sp}", book ${back.book}), counted as the reader's`);
  const home = await ev(async ch => { const wait = ms => new Promise(f => setTimeout(f, ms)); const want = B10READ[ch].back, b = document.querySelector('#sheet #ch0'); if (!b) return {err:'no button'}; b.click(); await wait(80); return {node:S.node, want, err:null}; }, ch);
  ok(!home.err && home.node === home.want, `${id} (${r.name}): the card's "${back.btns[0]}" goes to the reading's back node ${home.want} (now ${home.node})`);
}

// ---- from the journal: every choice, the replay line, every step reached ----
for (const [id, ch, , n] of reg.b10) { const rid = ch % 2 ? 'oldninth' : 'perrit', r = RD[rid];
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
ok(jl === 'b10v1 b10v2 b10v3 b10v4', `the journal lists Book Ten's visions by chapter reached (Chapter 4: ${jl})`);

const paint = await ev(() => { const out = []; const cv = document.createElement('canvas'); cv.style.cssText = 'width:360px;height:154px;position:fixed;left:0;top:0'; document.body.appendChild(cv);
  setBook('tcg'); S = newStateTCG('P', 'Q');
  Object.keys(VISIONS).filter(k => VISIONS[k].book === 'tcg').forEach(id => VISIONS[id].steps.forEach((st, i) => { [['adjunct', 'escort'], ['south', 'adjunct']].forEach(([tr, lr]) => { S.f.b10_tRoad = tr; S.f.b10_lRoad = lr; [0, 3000, 17000].forEach(t => { try { VIS = {id, step:i}; drawVision(cv, {id, bg:st.bg || VISIONS[id].bg, fig:(Object.getOwnPropertyDescriptor(st, 'fig')?.get ? 'marrow' : st.fig) || VISIONS[id].fig, step:i}, t); } catch (e) { out.push(`${id}/${i}: ${e.message}`); } }); }); }));
  VIS = null; cv.remove(); return out; });
ok(!paint.length, 'every Book Ten vision backdrop paints on both roads at phone width ' + paint.slice(0, 4).join(' | '));
ok(!errors.length, 'no page errors ' + errors.join(' | '));
await br.close(); srv.kill(); process.exit(fail);
