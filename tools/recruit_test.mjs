// The recruits are acknowledged (v6.15.0, David's ask of Oct 20, 2026): tools/recruit_scan.mjs --check plays every node with each
// obtainable squadmate (Ellis, Vell; Ramin, Keth; Sohra, Dannet; Book Three's imported Ellis and Vell) with the squad and without:
// no roll of the squad skips one who is there, no head-count is wrong with them, and each is named in a fair share of every chapter.
// Usage: node tools/recruit_test.mjs   (exit 1 on a failure; build first)
import { spawnSync } from 'node:child_process'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const r = spawnSync('node', [path.join(here, 'recruit_scan.mjs'), '--check'], { encoding: 'utf8', maxBuffer: 1 << 26 });
const out = r.stdout || ''; const head = out.split('\n').filter(l => l.startsWith('=='));
const ok = (c, m) => console.log((c ? 'ok   ' : 'FAIL ') + m);
const n = re => +((head.find(l => re.test(l)) || '').match(/\((\d+) not yet reviewed\)|: (\d+)$/) || []).slice(1).find(x => x != null) || 0;
ok(n(/^== LISTED/) === 0, `no roll of the squad skips a recruit who is there (${n(/^== LISTED/)} unreviewed)`);
ok(n(/^== COUNT/) === 0, `no head-count is wrong with a recruit (${n(/^== COUNT/)} unreviewed)`);
ok(n(/^== BELOW/) === 0, `every recruit is named in a fair share of each chapter they walk in (${n(/^== BELOW/)} below the floor)`);
if (r.status) console.log(out.split('\n').filter(l => /^  \S/.test(l) && !/^  \d\d.*·.*·/.test(l) || /BELOW|^  \d\d[^·]*· [A-Z][a-z]+: \d/.test(l)).slice(0, 40).join('\n'));
process.exit(r.status ? 1 : 0);
