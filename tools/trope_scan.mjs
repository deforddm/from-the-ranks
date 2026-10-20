// The trope scan (v6.14.0): counts the prose habits David asked to be cut back (Oct 20, 2026) and fails a book that drifts over budget.
// Families: "as if it were weather" and its cousins, the "the way a man looks at…" simile, the silence beat (says nothing / doesn't
// look at you / nobody says anything), sentences opening on Nobody / Somebody, "for a long time / a long moment", and a list of
// stock phrases that turned into refrains. Every count is over the game text in src/ (comments and the art and engine files skipped),
// variants for different speakers included, since a book is judged on what it holds, not on one playthrough.
// Budgets: a rate per 10,000 words of prose for each book, plus a hard cap on a book for the refrains. A new book is held to the same.
// Usage: node tools/trope_scan.mjs            (the table; exit 1 when a book is over a budget)
//        node tools/trope_scan.mjs --hits=FILE (every hit in one src file, by line, for a writer)
//        node tools/trope_scan.mjs --files     (per-file counts)
import fs from 'node:fs'; import path from 'node:path';
const SRC = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'src');
const SKIP = /(_art|art\.js|sprites|portraits|pinup|drawing|audio|canvas|tiles|interp|pathfind|utilities|sigils|backdrop|19c|19d|boot)/;
// the book a file belongs to, by the shelf's numbering (playbook §2): 39–46 Book One, 47–58 Two, 60–69 Three, 70–79 Four, 80–89 Five
const bookOf = f => { const n = parseInt(f, 10); if (n >= 39 && n <= 46) return 'B1'; if (n >= 47 && n <= 58) return 'B2';
  if (n >= 60 && n <= 69) return 'B3'; if (n >= 70 && n <= 79) return 'B4'; if (n >= 80 && n <= 89) return 'B5'; return 'shared'; };
// rate budgets: hits per 10,000 words of a book's prose
export const FAMILIES = [
  {id:'weather', name:'"weather" (as if it were weather…)', re:/\bweather\b/gi, cap:3},
  {id:'theway', name:'"the way a man / you\'d / one…" simile', re:/\bthe way (a|an|one|you'd|you would|some|another|men|people|somebody|someone|soldiers|old|every)\b|\b(says?|said) it the way\b/gi, rate:5},
  {id:'silence', name:'silence beat (says nothing / doesn\'t look at / nobody says)', re:/says nothing|(doesn't|does not) say (anything|it|so)|says to nobody|(doesn't|does not|didn't) look (at|up|round|back)|nobody (says|answers|looks|speaks|laughs)/gi, rate:9},
  {id:'nobody', name:'sentence opening on Nobody / Somebody', re:/(?:^|[.?!]\s+|["`]\s*)(Nobody|Somebody)\b/gm, rate:14},
  {id:'long', name:'"for a long time / a long moment"', re:/for a long (time|moment|while)|a long moment/gi, rate:3},
  {id:'howknow', name:'"which is how you know"', re:/which is how/gi, rate:1},
  {id:'asifwere', name:'"as if it were"', re:/as if it were/gi, rate:1.5},
  {id:'manwho', name:'"a man who has" / "the face of a man who"', re:/a (man|woman|soldier) who has|(face|look|voice|eyes) of (a|an) (man|woman|soldier|someone) who/gi, rate:1.5},
  {id:'shield', name:'"shield across / on her knees / back"', re:/shield (across|on) her (knees|back)/gi, cap:8},
  {id:'edge', name:'"the edge of the light / fire"', re:/edge of the (light|fire)/gi, cap:8},
  {id:'cold', name:'"her / his hands are cold" (the reader\'s closer)', re:/hands are cold/gi, cap:8},
  {id:'regvoice', name:'"the regiment voice"', re:/regiment voice/gi, cap:4},
  {id:'heads', name:'"the fist is still counting heads"', re:/still counting heads/gi, cap:4},
  {id:'knife', name:'"a pause you could fit a knife into"', re:/pause you could fit/gi, cap:1},
  {id:'without', name:'"without anything in it (that isn\'t…)"', re:/without anything in it/gi, cap:2},
];
const strip = t => t.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' ')).replace(/^\s*\/\/.*$/gm, '');
const proseWords = t => { let n = 0; const r = /'((?:[^'\\\n]|\\.){30,})'|"((?:[^"\\\n]|\\.){30,})"|`((?:[^`\\]|\\.){30,})`/g; let m;
  while ((m = r.exec(t))) { const s = (m[1] || m[2] || m[3]).replace(/\$\{[^}]*\}/g, ' '); if ((s.match(/ /g) || []).length < 5) continue;
    if (/=>|S\.f\.|ctx\./.test(s)) { n += (s.replace(/\$\{[\s\S]*?\}/g, ' ').match(/\b[A-Za-z][a-z']+\b/g) || []).length * 0.5; continue; }
    n += (s.match(/\b[A-Za-z][A-Za-z']*\b/g) || []).length; } return Math.round(n); };
export function scan() {
  const files = fs.readdirSync(SRC).filter(f => f.endsWith('.js') && !SKIP.test(f)).sort();
  const books = {}, perFile = {};
  for (const f of files) {
    const t = strip(fs.readFileSync(path.join(SRC, f), 'utf8')); const b = bookOf(f);
    const B = books[b] ||= {words:0, hits:{}}; const w = proseWords(t); B.words += w; perFile[f] = {book:b, words:w, hits:{}};
    for (const fam of FAMILIES) { const n = (t.match(fam.re) || []).length; B.hits[fam.id] = (B.hits[fam.id] || 0) + n; perFile[f].hits[fam.id] = n; }
  }
  const over = [];
  for (const [b, B] of Object.entries(books)) for (const fam of FAMILIES) {
    const n = B.hits[fam.id] || 0;
    if (fam.cap != null && b !== 'shared' && n > fam.cap) over.push(`${b} ${fam.name}: ${n} (cap ${fam.cap})`);
    if (fam.rate != null && b !== 'shared' && B.words > 5000 && n / B.words * 1e4 > fam.rate) over.push(`${b} ${fam.name}: ${(n / B.words * 1e4).toFixed(1)} per 10k words (budget ${fam.rate}; ${n} hits, ≈${Math.floor(fam.rate * B.words / 1e4)} allowed)`);
  }
  return {books, perFile, over};
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = process.argv.slice(2); const hitsArg = arg.find(a => a.startsWith('--hits='));
  if (hitsArg) {
    const f = hitsArg.slice(7); const lines = strip(fs.readFileSync(path.join(SRC, f), 'utf8')).split('\n');
    for (const fam of FAMILIES) { const out = [];
      lines.forEach((l, i) => { const re = new RegExp(fam.re.source, fam.re.flags.replace('m', '') + (fam.re.flags.includes('m') ? 'm' : ''));
        let m; while ((m = re.exec(l))) { const a = Math.max(0, m.index - 70); out.push(`  L${i + 1}: …${l.slice(a, m.index + m[0].length + 60).replace(/\s+/g, ' ')}…`); if (!re.global) break; } });
      if (out.length) console.log(`${fam.name} (${out.length})\n${out.join('\n')}`); }
    process.exit(0);
  }
  const {books, perFile, over} = scan();
  if (arg.includes('--files')) for (const [f, p] of Object.entries(perFile)) { const s = FAMILIES.map(x => p.hits[x.id] ? `${x.id}:${p.hits[x.id]}` : '').filter(Boolean).join(' '); if (s) console.log(`${f.padEnd(26)} ${String(p.words).padStart(6)}w  ${s}`); }
  for (const [b, B] of Object.entries(books)) console.log(`${b}: ${B.words} words of prose · ` + FAMILIES.map(x => `${x.id} ${B.hits[x.id] || 0}`).join(' · '));
  if (over.length) { console.log('OVER BUDGET:\n  ' + over.join('\n  ')); process.exit(1); }
  console.log('ok   every book inside the trope budgets');
}
