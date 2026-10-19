// Where a conversation repeats itself (v6.12.0 makes talk() handle it generically; this finds what still repeats, and where an again line would read better than a fold). Two kinds: (1) a hub node whose long words come up again unchanged when a branch comes
// straight back to it (X -> Y -> X, or X -> Y -> Z -> X), so the player reads the same paragraphs twice in one talk; (2) the same
// paragraph (140+ characters) written into two different nodes. Prints each with its length and the branch that returns.
// Usage: node tools/repeat_scan.mjs [--min=200] [--json]    (builds nothing; python3 build.py first)
import { server, browser as launch, openGame } from './page.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = k => { const a = process.argv.find(x => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : null; };
const MIN = +(arg('min') || 200), json = process.argv.includes('--json');
const all = fs.readdirSync(path.join(root, 'src')).filter(f => f.endsWith('.js')).map(f => fs.readFileSync(path.join(root, 'src', f), 'utf8')).join('\n');
const flags = [...new Set([...all.matchAll(/S\.f\.([A-Za-z0-9_]+)(?![A-Za-z0-9_*])/g)].map(m => m[1]))];
const flagVals = {}; for (const m of all.matchAll(/S\.f\.([A-Za-z0-9_]+)\s*=\s*'([^']+)'/g)) (flagVals[m[1]] ||= new Set()).add(m[2]);
const flagValsObj = Object.fromEntries(Object.entries(flagVals).map(([k, v]) => [k, [...v]]));
const objFlags = flags.filter(n => new RegExp(`S\\.f\\.${n}\\s*(=|\\?\\?=)\\s*[\\[{]|S\\.f\\.${n}\\s*\\[|S\\.f\\.${n}\\.(filter|map|includes|length|push|some|forEach)|in S\\.f\\.${n}\\b|= S\\.f\\.${n};`).test(all));

const srv = await server(); const browser = await launch();
const { page } = await openGame(browser, srv.url, {});
const res = await page.evaluate(({ flags, flagVals, objFlags, MIN }) => {
  let seed = 1; const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const chOf = id => { const m = /^c(\d)_/.exec(id); return m ? +m[1] : 0; };
  const isDG = id => /^b2_/.test(id), isMOI = id => /^b3_/.test(id);
  const chOfMOI = id => { const m = /^b3_c(\d)_/.exec(id); return m ? +m[1] : 1; };
  const chOfDG = id => { const m = /^b2_c(\d)_/.exec(id); return m ? +m[1] : 1; };
  const setFlags = v => { const setF = f => { if (objFlags.includes(f)) S.f[f] = f === 'lastFallen' ? [] : {}; else S.f[f] = flagVals[f] ? flagVals[f][Math.floor(rng() * flagVals[f].length)] : (rng() < .15 ? 2 : 1); };
    if (v === 1) flags.forEach(f => objFlags.includes(f) ? setF(f) : S.f[f] = (flagVals[f] && flagVals[f][0]) || 1); else if (v > 1) flags.forEach(f => { if (rng() < 0.35) setF(f); }); };
  function mkDG(v, ch) { setBook('dg'); S = newStateDG('Hask'); S.chapter = ch; S.scene = 'talk'; S.lvl = Math.min(8, 1 + ch); S.xp = LEVELS[S.lvl - 1] || 0;
    if (v % 2 === 0 && TPL.redblade) S.squad.push('redblade'); else if (v % 4 === 1 && TPL.warlock) S.squad.push('warlock'); migrate(S); S.chapters = {}; S.chain = {water:6, column:20}; S.inv = {sharper:2, burner:1, cusser:1, salve:2, smoker:1}; setFlags(v); S.card = null; return S; }
  function mkMOI(v, ch) { setBook('moi'); S = newStateMOI('Hask'); S.chapter = ch; S.scene = 'talk'; S.lvl = 8 + ch; S.xp = LEVELS[S.lvl - 1] || 0;
    if (v % 2 === 0 && TPL.sohra) S.squad.push('sohra'); else if (v % 4 === 1 && TPL.greysword) S.squad.push('greysword'); migrate(S); S.chapters = {}; S.ally = {trust:6, dread:3}; S.inv = {sharper:2, burner:1, cusser:1, salve:2, smoker:1}; setFlags(v); S.card = null; return S; }
  function mk(v, ch) { setBook('gotm'); S = newState('Hask'); S.chapter = ch; S.scene = 'talk'; S.lvl = Math.min(8, 1 + ch); S.xp = LEVELS[S.lvl - 1] || 0; S.squad = [...PORDER]; if (v % 2 === 0 && ch >= 2) S.squad.push('ellis'); migrate(S);
    S.chapters = {}; for (let i = 0; i < ch; i++) S.chapters[i] = 'x'; setFlags(v); S.f.wjRegard = 0; S.card = null; if (CHAPTERS[ch] && CHAPTERS[ch].card) S.card = CHAPTERS[ch].card.id; return S; }
  const mkFor = (id, v) => isDG(id) ? mkDG(v, chOfDG(id)) : isMOI(id) ? mkMOI(v, chOfMOI(id)) : mk(v, chOf(id));
  const plain = s => (typeof s === 'function' ? s() : s || '').replace(/\s+/g, ' ').trim();
  const render = id => { try { const n = DLG[id](); return {n, txt:plain(n.txt), again:n.again != null, ch:(n.ch || []).filter(c => { try { return !c.req || c.req(); } catch(e) { return false; } })}; } catch(e) { return null; } };
  const snap = () => JSON.stringify(S), restore = s => { S = JSON.parse(s); };
  const fx = c => { if (c && c.fx) { try { c.fx(); } catch(e) {} } };
  const hubs = {}, paras = {};
  const ids = Object.keys(DLG);
  for (const id of ids) {
    for (let v = 0; v < 4; v++) {
      mkFor(id, v); const X = render(id); if (!X || X.txt.length < MIN) continue;
      fx(X.n); // the node's own fx runs once, as talk() runs it, before any branch (a writer's revisit flag lives there)
      const base = snap();
      for (const c of X.ch) { if (typeof c.go !== 'string' || c.check || c.go === id) continue;
        restore(base); fx(c); const Y = render(c.go); if (!Y) continue; fx(Y.n);
        const ySnap = snap();
        for (const c2 of Y.ch) { if (c2.check) continue;
          if (c2.go === id) { restore(ySnap); fx(c2); const X2 = render(id); if (X2 && X2.txt === X.txt) { const k = id; (hubs[k] ||= {len:X.txt.length, again:X.again, via:new Set(), v:new Set()}); hubs[k].via.add(c.go); hubs[k].v.add(v); } }
          else if (typeof c2.go === 'string' && c2.go !== c.go) { restore(ySnap); fx(c2); const Z = render(c2.go); if (!Z) continue; fx(Z.n); const zSnap = snap();
            for (const c3 of Z.ch) { if (c3.check || c3.go !== id) continue; restore(zSnap); fx(c3); const X3 = render(id); if (X3 && X3.txt === X.txt) { (hubs[id] ||= {len:X.txt.length, again:X.again, via:new Set(), v:new Set()}); hubs[id].via.add(c.go + '>' + c2.go); hubs[id].v.add(v); } } }
        }
      }
    }
  }
  // the same paragraph in two nodes (variant 0 of each)
  for (const id of ids) { mkFor(id, 0); const X = render(id); if (!X) continue; const raw = (typeof X.n.txt === 'function' ? X.n.txt() : X.n.txt) || '';
    raw.split(/\n\s*\n/).map(p => p.replace(/\s+/g, ' ').trim()).filter(p => p.length >= 140).forEach(p => { (paras[p] ||= new Set()).add(id); }); }
  const dupes = Object.entries(paras).filter(([p, s]) => s.size > 1).map(([p, s]) => ({para:p.slice(0, 90), len:p.length, nodes:[...s]}));
  return {hubs:Object.entries(hubs).map(([id, h]) => ({id, len:h.len, again:h.again, via:[...h.via], variants:[...h.v].length})).sort((a, b) => b.len - a.len), dupes, nodes:ids.length};
}, { flags, flagVals: flagValsObj, objFlags, MIN });
await browser.close(); srv.kill();
if (json) { console.log(JSON.stringify(res, null, 1)); process.exit(0); }
const book = id => /^b2_/.test(id) ? 'Two' : /^b3_/.test(id) ? 'Three' : 'One';
console.log(`${res.nodes} nodes. ${res.hubs.length} hubs whose words (${MIN}+ chars) come back unchanged after a branch returns (in play, talk() folds them to a line with "Read it again", or shows the node's again line, and drops a topic already heard):`);
for (const h of res.hubs) console.log(`  ${h.len.toString().padStart(5)}  ${book(h.id).padEnd(5)} ${h.again ? 'again ' : 'folds '} ${h.id}  <- ${h.via.join(', ')}`);
console.log(`${res.dupes.length} paragraphs (140+ chars) written into more than one node:`);
for (const d of res.dupes) console.log(`  ${d.len.toString().padStart(5)}  ${d.nodes.join(', ')}: "${d.para}…"`);
