// Polish plan §1 (Nov 14, 2026): art contact sheets. Every scene backdrop (drawScene), every squad portrait (drawPortrait) and
// every ART picture (titles, Deck, patrons, items, insignia …) on one page, book by book, as small JPEG thumbnails.
// Usage: node tools/contact_sheets.mjs --out=sheets.html   (build first)
import fs from 'fs';
import { server, browser as launch, openGame } from './page.mjs';
const arg = k => (process.argv.find(a => a.startsWith(`--${k}=`)) || '').split('=')[1];
const OUT = arg('out') || '/tmp/claude-0/contact_sheets.html';
const srv = await server(); const br = await launch();
const { page } = await openGame(br, srv.url, { fast: true });
const data = await page.evaluate(async () => {
  const bookOf = k => { const m = /^b(\d+)_/.exec(k); return m ? +m[1] : 1; };
  const jpg = (cv, q = .62) => cv.toDataURL('image/jpeg', q);
  const out = {scenes: [], portraits: [], art: []};
  // scenes: drawScene(cv, kind, t) on a 280x120 canvas
  const NEW = {1: () => { setBook('gotm'); S = newState('Hask'); }, 2: () => { S = newStateDG('Hask'); }, 3: () => { setBook('moi'); S = newStateMOI('Hask'); },
    4: () => { setBook('hoc'); S = newStateHOC('Hask'); }, 5: () => { S = newStateMT('Hask'); }, 6: () => { S = newStateBH('Hask'); }, 7: () => { S = newStateRG('Hask'); },
    8: () => { S = newStateTTH('Hask'); }, 9: () => { S = newStateDOD('Hask'); }, 10: () => { S = newStateTCG('Hask'); }};
  /* the same dispatch as the frame loop (src/990) */
  const draw = (cv, k, t) => { G.sceneKind = k; if (SCENEX[k]) SCENEX[k](cv, t); else if (FETE_SCENES.includes(k)) drawEstate(cv, k, t); else if (k === 'camp' || k === 'camp_night') drawCamp(cv, t, k === 'camp_night');
    else if (k === 'tent' || k === 'fire') drawInterior(cv, k, t); else if (k.startsWith('plain') || k.startsWith('hills')) drawPlain(cv, k, t);
    else if (k.startsWith('city') || ['inn','cellar','room','roof','roof_night'].includes(k)) drawCity(cv, k, t); else drawScene(cv, k, t); };
  let lastB = 0;
  for (const k of Object.keys(SCENES)) { const cv = document.createElement('canvas'); cv.width = 560; cv.height = 240; const b = bookOf(k);
    if (b !== lastB) { try { NEW[b](); S.picksDue = []; } catch (e) {} lastB = b; }
    try { draw(cv, k, 1200); } catch (e) { continue; }
    const sm = document.createElement('canvas'); sm.width = 280; sm.height = 120; sm.getContext('2d').drawImage(cv, 0, 0, 280, 120);
    out.scenes.push({k, b: bookOf(k), loc: (SCENES[k].loc || '') + (SCENES[k].sub ? ' · ' + SCENES[k].sub : ''), src: jpg(sm)}); }
  // portraits: every squad template, in its own book's look (setBook by the template's book where known)
  const tplBook = id => { for (const [bk, B] of Object.entries(BOOKS || {})) if ((B.squad || []).includes(id)) return bk; return null; };
  for (const id of Object.keys(TPL)) { const cv = document.createElement('canvas'); cv.width = 240; cv.height = 180;
    try { drawPortrait(cv.getContext('2d'), id, 240, 180, 0); } catch (e) { continue; }
    out.portraits.push({k: id, name: TPL[id].name || id, src: jpg(cv, .7)}); }
  // ART: the SVG strings as they are
  for (const k of Object.keys(ART)) out.art.push({k, g: k.split('/')[0], svg: String(ART[k])});
  return out;
});
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const BN = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
let h = `<title>From the Ranks Art Sheets</title><meta name="claude:viewport-fit-sides" content="cover"><style>
/* contact sheet: a dense grid of thumbnails under book headings; the art is the content, the page stays out of its way */
:root{--bg:#ece6dc;--fg:#231e18;--mut:#6a5f50;--card:#f8f4ec;--line:#d3c8b6;--accent:#8a4b2a;--disp:"Cormorant Garamond",Georgia,serif;--ui:"Inter",system-ui,sans-serif}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#15130f;--fg:#e9e1d2;--mut:#a29784;--card:#201c17;--line:#3a322a;--accent:#d2905e;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#15130f;--fg:#e9e1d2;--mut:#a29784;--card:#201c17;--line:#3a322a;--accent:#d2905e;color-scheme:dark}
body{background:var(--bg);color:var(--fg);font:14px/1.45 var(--ui)}
main{max-width:1200px;margin:0 auto;padding-block:20px 48px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
h1{font:600 30px/1.1 var(--disp);margin:0 0 6px;text-wrap:balance}h2{font:600 22px/1.2 var(--disp);margin:32px 0 10px;padding-bottom:4px;border-bottom:1px solid var(--line);text-wrap:balance}
h3{font:600 12px/1 var(--ui);letter-spacing:.08em;text-transform:uppercase;margin:20px 0 8px;color:var(--mut)}p{color:var(--mut);max-width:65ch}
nav{display:flex;flex-wrap:wrap;gap:6px 14px;margin:12px 0 4px}nav a{color:var(--accent);font-weight:500}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
figure{margin:0;background:var(--card);border:1px solid var(--line);border-radius:4px;overflow:hidden;min-width:0}figure img{width:100%;display:block;max-width:100%}
figcaption{font:11px/1.3 var(--ui);color:var(--mut);padding:4px 6px;overflow-wrap:anywhere}
</style><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Inter:wght@400;500;600&display=swap"><main><h1>Art contact sheets</h1><p>Every backdrop, squad portrait and picture in From the Ranks v13.5.1, book by book, for spotting the weak and the inconsistent at a glance. Captions are the game's own keys, then the place line the game shows.</p><nav>`;
const books = [...new Set(data.scenes.map(s => s.b))].sort((a, b) => a - b);
h += books.map(b => `<a href="#b${b}">Book ${BN[b]}</a>`).join('') + `<a href="#portraits">Portraits</a><a href="#art">Pictures</a></nav>`;
for (const b of books) { const sc = data.scenes.filter(s => s.b === b);
  h += `<h2 id="b${b}">Book ${BN[b]}: backdrops (${sc.length})</h2><div class="g">` + sc.map(s => `<figure><img loading="lazy" src="${s.src}" alt=""><figcaption>${esc(s.k)}<br>${esc(s.loc)}</figcaption></figure>`).join('') + '</div>'; }
h += `<h2 id="portraits">Portraits (${data.portraits.length})</h2><div class="g">` + data.portraits.map(p => `<figure><img loading="lazy" src="${p.src}" alt=""><figcaption>${esc(p.name)} · ${esc(p.k)}</figcaption></figure>`).join('') + '</div>';
h += `<h2 id="art">Pictures (${data.art.length})</h2>`;
for (const g of [...new Set(data.art.map(a => a.g))]) { const L = data.art.filter(a => a.g === g);
  h += `<h3>${esc(g)} (${L.length})</h3><div class="g">` + L.map(a => `<figure><img loading="lazy" src="data:image/svg+xml;base64,${Buffer.from(a.svg).toString('base64')}" alt=""><figcaption>${esc(a.k)}</figcaption></figure>`).join('') + '</div>'; }
h += '</main>';
fs.writeFileSync(OUT, h); console.log(`${OUT}: ${data.scenes.length} backdrops, ${data.portraits.length} portraits, ${data.art.length} pictures, ${(h.length / 1e6).toFixed(1)} MB`);
await br.close(); process.exit(0);
