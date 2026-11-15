// Every check in one go: build, syntax, lint, then every tools/*_test.mjs in turn (and play.mjs N times with --play=N).
// One line per step, then PASS or FAIL overall; exits 1 on any failure. Full output of a failed step is printed after it.
// Usage (no npm needed):  node tools/run_all.mjs [--play=N] [--verbose] [--books=hoc,tth | --changed[=ref]]
//   --books=…   v13.5 (polish plan §0c.5): only those books' own tests (b4*, b8*, moi_test …) beside every shared test; onward_test
//               audits only their maps; the plays are one per book named, fights won outright (--cheat: the story's flow; balance.mjs measures the fights). For a change inside one or two books, not for the engine.
//   --changed   the books from `git diff --name-only <ref>` (default origin/main) by the src shelf; any change outside a book's
//               block (engine, shared art, tools, sw.js) means the full run, and it says so.
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = k => (process.argv.find(a => a.startsWith(`--${k}=`)) || '').split('=')[1];
const plays = Math.max(0, parseInt(arg('play') || '0', 10) || 0), verbose = process.argv.includes('--verbose');
fs.mkdirSync('/tmp/claude-0/shots', { recursive: true });
const SHELF = [[40, 47, 'gotm'], [47, 60, 'dg'], [60, 70, 'moi'], [70, 80, 'hoc'], [80, 89, 'mt'], [100, 120, 'bh'], [120, 140, 'rg'], [140, 160, 'tth'], [160, 180, 'dod'], [180, 200, 'tcg']];
const NUM = {gotm:1, dg:2, moi:3, hoc:4, mt:5, bh:6, rg:7, tth:8, dod:9, tcg:10};
let books = (arg('books') || '').split(',').filter(b => NUM[b]);
const chg = process.argv.find(a => a === '--changed' || a.startsWith('--changed='));
if (chg) { const ref = chg.split('=')[1] || 'origin/main', files = spawnSync('git', ['diff', '--name-only', ref], { cwd: root, encoding: 'utf8' }).stdout.split('\n').filter(f => f && !/^docs\/|\.md$|^index\.html$/.test(f));
  const of = f => { const m = /^src\/(\d{3})/.exec(f); if (!m) return null; const n = +m[1]; const r = SHELF.find(([a, b]) => n >= a && n < b); return r ? r[2] : null; };
  const shared = files.filter(f => !of(f)); books = [...new Set(files.map(of).filter(Boolean))];
  if (shared.length || !books.length) { console.log(`--changed: ${shared.length ? 'shared files changed (' + shared.slice(0, 4).join(', ') + (shared.length > 4 ? ' …' : '') + '), the full run' : 'nothing in a book changed, the full run'}`); books = []; }
  else console.log(`--changed: ${files.length} files, books ${books.join(', ')}`); }
const testBook = t => { const m = /^b(\d+)/.exec(t); if (m) return +m[1]; const k = /^(moi|hoc|mt|bh|rg|tth|dod|tcg|dg)_/.exec(t); return k ? NUM[k[1]] : 0; };
const want = books.map(b => NUM[b]); if (books.length) { process.env.FTR_BOOKS = books.join(','); console.log(`books: ${books.join(', ')} (and every shared test)`); }
const steps = [['build', 'python3', ['build.py']]];
const js = [...fs.readdirSync(path.join(root, 'src')).filter(f => f.endsWith('.js')).sort().map(f => 'src/' + f), 'sw.js'].filter(f => fs.existsSync(path.join(root, f)));
steps.push(['node --check (' + js.length + ' files)', null, js]);
steps.push(['lint', 'node', ['tools/lint.mjs']]);
for (const t of fs.readdirSync(path.join(root, 'tools')).filter(f => f.endsWith('_test.mjs')).sort()) { const tb = testBook(t); if (want.length && tb && !want.includes(tb)) continue; steps.push([t.replace('.mjs', ''), 'node', ['tools/' + t]]); }
if (want.length) { if (plays) books.forEach(b => steps.push([`play ${b} (story)`, 'node', ['tools/play.mjs', '1', '--cheat', '--quiet', ...(b === 'gotm' ? [] : ['--book=' + b])]])); } // fights won outright: the plays test the story's flow; balance.mjs measures the fights
else for (let i = 1; i <= plays; i++) steps.push([`play ${i}/${plays}`, 'node', ['tools/play.mjs']]);
let bad = 0; const t00 = Date.now();
const run = (cmd, args) => spawnSync(cmd, args, { cwd: root, encoding: 'utf8', timeout: 45 * 60 * 1000, maxBuffer: 64 << 20 });
for (const [name, cmd, args] of steps) {
  const t0 = Date.now(); let ok, out, note = '';
  if (!cmd) { const errs = args.map(f => [f, run('node', ['--check', f])]).filter(([, r]) => r.status !== 0); ok = !errs.length; out = errs.map(([f, r]) => f + ':\n' + r.stderr).join('\n'); }
  else { const r = run(cmd, args); out = (r.stdout || '') + (r.stderr || ''); ok = r.status === 0; if (r.error) out += '\n' + r.error.message;
    const fails = out.split('\n').filter(l => /^FAIL\b/.test(l)).length, oks = out.split('\n').filter(l => /^ok\b/.test(l)).length;
    note = name === 'lint' ? (out.split('\n').find(l => /SUMMARY/.test(l)) || '').trim() : name === 'build' ? (out.trim().split('\n').pop() || '') : oks || fails ? `${oks} ok, ${fails} FAIL` : ''; }
  if (!ok) bad++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(26)} ${((Date.now() - t0) / 1000).toFixed(1).padStart(6)}s  ${note}`);
  if (!ok || verbose) console.log(out.trim().split('\n').filter(l => verbose || !/^ok\b/.test(l)).slice(-40).map(l => '      | ' + l).join('\n'));
}
console.log(`${bad ? 'FAIL' : 'PASS'}  overall: ${steps.length - bad}/${steps.length} steps passed in ${((Date.now() - t00) / 1000).toFixed(0)}s`);
process.exit(bad ? 1 : 0);
