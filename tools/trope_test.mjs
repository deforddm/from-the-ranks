// The trope budgets (v6.14.0, David's ask of Oct 20, 2026): every book's prose stays inside tools/trope_scan.mjs's budgets for the
// stock moves that had taken over (weather similes, "the way a man…", silence beats, Nobody/Somebody openers, "a long moment", the
// refrains). A new book is held to the same numbers. Usage: node tools/trope_test.mjs   (exit 1 on a failure)
import { scan, FAMILIES } from './trope_scan.mjs';
const { books, over } = scan();
let fail = 0; const ok = (c, m) => { console.log((c ? 'ok   ' : 'FAIL ') + m); if (!c) fail = 1; };
for (const [b, B] of Object.entries(books)) if (b !== 'shared') {
  const mine = over.filter(o => o.startsWith(b + ' '));
  ok(!mine.length, `${b}: ${B.words} words of prose inside every trope budget${mine.length ? ' — ' + mine.join('; ') : ''}`);
}
ok(FAMILIES.every(f => f.re.global), 'every family counts every hit (global regex)');
process.exit(fail);
