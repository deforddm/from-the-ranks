// The recruit scan (v6.15.0, David's ask of Oct 20, 2026: "make sure they are acknowledged when appropriate if they are currently
// with the party"). Every dialogue node is played under states where each obtainable squadmate is with the squad, and states where
// they are not, and three things are listed:
//   LISTED  — a sentence names three or more of the squad but not the recruit who is standing there (a roll of the squad that skips them)
//   COUNT   — a head-count in words ("the five of you", "all four") that doesn't match the squad on the map
//   ABSENT  — the recruit is named although they never joined, or have gone (lint's REVIEW list covers the same ground, Book One's Vell too here)
// Recruits by book: Book One Ellis (Ch2–5, Ch7) and Vell (Ch4 on); Book Two Ramin and Keth (Ch2 on), and the old hand from Book One;
// Book Three Sohra (Ch1 on) and Dannet (Ch3 on), and Ellis or Vell when an import brings them; Book Four Ramin and Keth (a Book Two
// transfer only) and Orvas (Ch3 on), with Book Two's four and the four new soldiers of the Fourteenth as the squad.
// Usage: node tools/recruit_scan.mjs [--json=FILE] [--file=SRCFILE]   (build first: python3 build.py)
//        exit 1 when LISTED or COUNT has a line not in tools/recruit_ok.json (the reviewed, deliberate ones)
import { server, browser as launch, openGame } from './page.mjs';
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = k => (process.argv.find(a => a.startsWith('--' + k + '=')) || '').split('=').slice(1).join('=');
// which src file defines each node, so each node is played in its own chapter
const files = fs.readdirSync(path.join(root, 'src')).filter(f => /^\d\d[a-z]?_.*\.js$/.test(f) && !/_art|art\.js/.test(f));
const fileOf = {};
for (const f of files) { const t = fs.readFileSync(path.join(root, 'src', f), 'utf8');
  for (const m of t.matchAll(/(?:^|[\s,{])((?:b[23]_)?c?\d?_?[A-Za-z0-9_]+)\s*:\s*\(\s*\)\s*=>/gm)) fileOf[m[1]] ??= f; }
const all = files.map(f => fs.readFileSync(path.join(root, 'src', f), 'utf8')).join('\n');
const flags = [...new Set([...all.matchAll(/S\.f\.([A-Za-z0-9_]+)(?![A-Za-z0-9_*])/g)].map(m => m[1]))];
const flagVals = {};
for (const m of all.matchAll(/S\.f\.([A-Za-z0-9_]+)\s*===?\s*'([^']+)'/g)) (flagVals[m[1]] ||= new Set()).add(m[2]);
for (const m of all.matchAll(/S\.f\.([A-Za-z0-9_]+)\s*=\s*'([^']+)'/g)) (flagVals[m[1]] ||= new Set()).add(m[2]);
const fv = Object.fromEntries(Object.entries(flagVals).map(([k, v]) => [k, [...v]]));

const srv = await server(); const br = await launch();
const { page } = await openGame(br, srv.url, {});
const out = await page.evaluate(({ fileOf, flags, fv }) => {
  let seed = 7; const rng = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const chOfFile = f => { const n = parseInt(f, 10);
    if (n >= 39 && n <= 46) return {book:'gotm', ch:n - 39}; if (n >= 48 && n <= 54) return {book:'dg', ch:n - 47};
    if (n >= 61 && n <= 67) return {book:'moi', ch:n - 60}; if (n === 47 || (n >= 55 && n <= 58)) return {book:'dg', ch:0};
    if (n >= 60 && n <= 69) return {book:'moi', ch:0}; if (n >= 71 && n <= 77) return {book:'hoc', ch:n - 70}; if (n >= 70 && n <= 79) return {book:'hoc', ch:0};
    if (n >= 81 && n <= 87) return {book:'mt', ch:n - 80}; if (n >= 80 && n <= 89) return {book:'mt', ch:0}; return null; };
  const BOOK = {
    gotm:{core:['brisk', 'kettle', 'tuft', 'ohl'], rec:[{id:'ellis', from:2, to:7}, {id:'vell', from:4, to:7}]},
    dg:{core:['haddat', 'sathi', 'tangle', 'marrow'], rec:[{id:'redblade', from:2, to:7}, {id:'warlock', from:2, to:7}, ...['brisk', 'kettle', 'tuft', 'ohl', 'ellis', 'vell'].map(id => ({id, from:7, to:7, old:1}))]}, // Book Two: Ramin, Keth, and in Aren an old hand of the Fourth (b2OldHand)
    moi:{core:['brisk', 'kettle', 'tuft', 'ohl'], rec:[{id:'sohra', from:1, to:7}, {id:'greysword', from:3, to:7}, {id:'ellis', from:1, to:7, imp:1}, {id:'vell', from:1, to:7, imp:1}]},
    // Book Four: Book Two's four and the Fourteenth's four new soldiers; Ramin and Keth (transfer only) and Orvas (from Chapter 3) as recruits
    hoc:{core:['haddat', 'sathi', 'tangle', 'marrow', 'tallow', 'hessa', 'tebbet', 'darrut'], rec:[{id:'redblade', from:1, to:7, imp:1}, {id:'warlock', from:1, to:7, imp:1}, {id:'orvas', from:3, to:7}, {id:'mirrel', from:1, to:7}, {id:'yorin', from:1, to:7}, {id:'rasp', from:1, to:7}]},
    // Book Five: the four, and Ruuk (Chapters 2-3 on), Brune (Chapter 3 on) and Pessa (Chapter 5 on) as recruits
    mt:{core:['tobet', 'thegg', 'perrit', 'ammet'], rec:[{id:'ruuk', from:2, to:7}, {id:'brune', from:3, to:7}, {id:'pessa', from:5, to:7}]},
  };
  const NUM = {two:2, three:3, four:4, five:5, six:6, seven:7};
  function mk(book, ch, v, withR, without) {
    if (book === 'gotm') { S = newState('Hask'); S.squad = [...PORDER]; }
    else if (book === 'dg') { S = newStateDG('Hask'); }
    else if (book === 'hoc') { S = newStateHOC('Hask'); S.squad = ['sgt', 'haddat', 'sathi', 'tangle', 'marrow']; }
    else if (book === 'mt') { S = newStateMT('Hask'); }
    else { S = newStateMOI('Hask'); }
    S.chapter = ch || 1; S.scene = 'talk'; S.lvl = Math.min(8, 1 + S.chapter); S.xp = LEVELS[S.lvl - 1] || 0;
    if (book === 'dg') { S.chain = {water:6, column:20}; } if (book === 'moi') S.ally = {trust:6, dread:3};
    S.inv = {sharper:2, burner:1, cusser:1, salve:2, smoker:1}; S.chapters = {}; for (let i = 0; i < S.chapter; i++) S.chapters[i] = 'x';
    if (withR && TPL[withR] && !S.squad.includes(withR)) { S.squad.push(withR); S.loy[withR] ??= 0; S.gear[withR] ??= {}; S.picks ||= {}; S.picks[withR] ??= []; }
    if (without) { S.squad = S.squad.filter(x => x !== without); }
    migrate(S);
    if (v > 0) flags.forEach(f => { if (rng() < 0.3) S.f[f] = fv[f] ? fv[f][Math.floor(rng() * fv[f].length)] : 1; });
    // the recruit present means their own leaving flags are off; the recruit absent means they were never asked or have gone
    if (withR) Object.keys(S.f).forEach(k => { if (k.startsWith(withR + 'Gone') || /ellisThrough|ellisToc|ellisRefused|ellisWalked/.test(k) && withR === 'ellis') delete S.f[k]; });
    if (book === 'dg' && withR && TPL[withR] && PORDER.concat(['ellis', 'vell']).includes(withR)) { S.squad = S.squad.filter(x => !['redblade', 'warlock'].includes(x) || x === withR); S.f.b2_oldHand = withR; S.imported = {from:'Kell', sid:'scan', road:'empire', lvl:5, dead:[], f:{}}; }
    if (book === 'moi' && withR && ['ellis', 'vell'].includes(withR)) S.imported = {from:'Kell', sid:'scan', road:'outlaw', lvl:8, dead:[], f:{}};
    if (book === 'hoc') { S.nerve = 5; delete S.dead.sathi; if (withR && ['redblade', 'warlock'].includes(withR)) S.imported = {from:'Kell', sid:'scan', road:'guard', lvl:8, mates:['haddat', 'sathi', 'tangle', 'marrow'], dead:[], f:{}, ramin:true, keth:true}; }
    S.card = null; return S;
  }
  const render = id => { let n; try { n = DLG[id](); } catch (e) { return null; } if (!n || typeof n.txt !== 'string') return null;
    let vis = []; try { vis = (n.ch || []).filter(c => { try { return !c.req || c.req(); } catch (e) { return false; } }); } catch (e) {}
    return fmt(n.txt + ' ' + (n.after || '')).replace(/<[^>]+>/g, ' ') + ' ⟦' + vis.map(c => c.t).join(' | ') + '⟧'; };
  const names = ids => ids.filter(x => TPL[x]).map(x => [x, TPL[x].name]);
  const res = {listed:{}, count:{}, absent:{}, seen:{}};
  for (const [id, f] of Object.entries(fileOf)) {
    if (typeof DLG[id] !== 'function') continue; const loc = chOfFile(f); if (!loc) continue;
    const B = BOOK[loc.book];
    for (const r of B.rec) {
      if (!TPL[r.id]) continue; if (loc.ch && (loc.ch < r.from || loc.ch > r.to)) continue;
      const rn = TPL[r.id].name, rre = new RegExp('\\b' + rn + '\\b');
      const squadNames = names([...B.core, ...B.rec.map(x => x.id)]).filter(([x]) => x !== r.id);
      for (let v = 0; v < 6; v++) {
        mk(loc.book, loc.ch, v, r.id, null);
        if (!S.squad.includes(r.id)) continue;
        const t = render(id); if (!t) continue;
        const prose = t.split('⟦')[0];
        // LISTED: a sentence naming 3+ of the squad (only those actually with the squad) and not the recruit
        for (const sent of prose.split(/(?<=[.?!"])\s+/)) {
          const here = squadNames.filter(([x, nm]) => S.squad.includes(x) && new RegExp('\\b' + nm + '\\b').test(sent));
          if (here.length >= 3 && !rre.test(sent)) { const k = `${f} · ${id} · ${rn}`; res.listed[k] ??= sent.trim().slice(0, 260); }
        }
        // COUNT: head-counts in words
        const size = S.squad.filter(x => !(S.dead && S.dead[x])).length;
        for (const m of prose.matchAll(/\b(?:the|all) (two|three|four|five|six|seven) of (?:you|us)\b|\b(two|three|four|five|six|seven) of (?:you|us)\b|\b(?:all|the) (four|five|six|seven) of the Fourth\b|\bthe Fourth's (four|five|six|seven)\b/gi)) {
          const n = NUM[(m[1] || m[2] || m[3] || m[4]).toLowerCase()]; if (n !== size && n !== size - 1) { const k = `${f} · ${id} · ${m[0]}`; res.count[k] ??= `squad of ${size} (with ${rn}): …${prose.slice(Math.max(0, m.index - 100), m.index + 80).replace(/\s+/g, ' ')}…`; }
        }
      }
      // SEEN: how many nodes of this chapter name the recruit when they are there, against the squad's own (a recruit who is a ghost shows up low)
      if (loc.ch) { mk(loc.book, loc.ch, 0, r.id, null); const t = render(id); if (t) { const key = `${f} · ${rn}`; res.seen[key] ??= {nodes:0, rec:0, core:0};
        res.seen[key].nodes++; if (rre.test(t)) res.seen[key].rec++; res.seen[key].core += B.core.filter(x => TPL[x] && S.squad.includes(x) && new RegExp('\\b' + TPL[x].name + '\\b').test(t)).length / B.core.length; } }
      // ABSENT: the recruit named when not with the squad (never asked, or gone)
      for (let v = 0; v < 4; v++) {
        mk(loc.book, loc.ch, v, null, r.id); const t = render(id); if (!t) continue; const mm = rre.exec(t);
        if (mm) { const k = `${f} · ${id} · ${rn}`; res.absent[k] ??= '…' + t.slice(Math.max(0, mm.index - 110), mm.index + 70).replace(/\s+/g, ' ') + '…'; break; }
      }
    }
  }
  return res;
}, { fileOf, flags, fv });
await br.close(); srv.kill();
const only = arg('file'); const pick = o => Object.fromEntries(Object.entries(o).filter(([k]) => !only || k.startsWith(only)));
const R = {listed:pick(out.listed), count:pick(out.count), absent:pick(out.absent), seen:pick(out.seen)};
if (arg('json')) fs.writeFileSync(arg('json'), JSON.stringify(R, null, 1));
const okPath = path.join(root, 'tools', 'recruit_ok.json'); const OK = fs.existsSync(okPath) ? JSON.parse(fs.readFileSync(okPath, 'utf8')) : {listed:[], count:[]};
const newL = Object.keys(R.listed).filter(k => !OK.listed.includes(k)), newC = Object.keys(R.count).filter(k => !OK.count.includes(k));
for (const [h, o, keys] of [['LISTED (a roll of the squad without the recruit standing there)', R.listed, newL], ['COUNT (a head-count that is wrong with the recruit)', R.count, newC]]) {
  console.log(`== ${h}: ${Object.keys(o).length} (${keys.length} not yet reviewed)`); for (const k of keys) console.log(`  ${k}\n      ${o[k]}`); }
console.log(`== ABSENT (named when not with the squad; review): ${Object.keys(R.absent).length}`); for (const [k, s] of Object.entries(R.absent)) console.log(`  ${k}\n      ${s}`);
console.log('== SEEN (chapter · recruit: nodes that name them when present / nodes played, against the average core squadmate)');
for (const [k, s] of Object.entries(R.seen)) console.log(`  ${k.padEnd(34)} ${String(s.rec).padStart(4)} / ${s.nodes}   core avg ${s.core.toFixed(0)}`);
// the floor: a recruit with the squad is named in at least 40% as many of a chapter's nodes as the average core squadmate (and 3),
// except the old hand in Book Two (Aren only, the last part of Ch7) and Book Three's imported Ellis and Vell (a smaller share: 25%)
const low = Object.entries(R.seen).filter(([k, s]) => { const [f, nm] = k.split(' · '); const n = parseInt(f, 10);
  if (n >= 48 && n <= 54 && !['Ramin', 'Keth'].includes(nm)) return false; // the old hand: checked by the review, not by a floor
  if ((OK.seen || []).includes(k)) return false;
  const share = n >= 61 && ['Ellis', 'Vell'].includes(nm) ? 0.25 : 0.4; return s.core >= 4 && s.rec < Math.max(3, Math.floor(share * s.core)); });
if (process.argv.includes('--check')) { console.log(`== BELOW THE FLOOR: ${low.length}`); low.forEach(([k, s]) => console.log(`  ${k}: ${s.rec} (core ${s.core.toFixed(0)})`)); }
process.exit(newL.length || newC.length || (process.argv.includes('--check') && low.length) ? 1 : 0);
