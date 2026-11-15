// Polish plan §1 (Nov 14, 2026): art contact sheets. Every scene backdrop (drawScene), every squad portrait (drawPortrait) and
// every ART picture (titles, Deck, patrons, items, insignia …) on one page, book by book, as small JPEG thumbnails.
// Usage: node tools/contact_sheets.mjs --out=sheets.html   (build first)
//        --wear=DIR also writes DIR/wear_<squad>_<before|after>.png (the recurring squadmates across their books, close); --wear-only stops there
import fs from 'fs';
import { server, browser as launch, openGame } from './page.mjs';
const arg = k => (process.argv.find(a => a.startsWith(`--${k}=`)) || '').split('=')[1];
const OUT = arg('out') || '/tmp/claude-0/contact_sheets.html';
const WEAR_DIR = arg('wear'), WEAR_ONLY = process.argv.includes('--wear-only');
const srv = await server(); const br = await launch();
const { page } = await openGame(br, srv.url, { fast: true });
/* Polish plan §3 (v13.6.x): each recurring squadmate across their books, in a row, so the road on the face can be judged side by side.
   wearRows(on): on = false paints every book with the first book's look (WEAR_OFF, the "before"). Each cell: the book's state, the
   squad's thread where a book has two, the bust drawn as the game draws it. FLAGS: the scars that a save's flags give, drawn once each. */
const wearRows = (on, big) => page.evaluate(({on, big}) => {
  const NEWB = {gotm:() => newState('Hask'), dg:() => newStateDG('Hask'), moi:() => newStateMOI('Hask'), hoc:() => newStateHOC('Hask'), mt:() => newStateMT('Hask'),
    bh:() => newStateBH('Hask', 'Hask'), rg:() => newStateRG('Hask', 'Hask'), tth:() => newStateTTH('Hask'), dod:() => newStateDOD('Hask', 'Hask'), tcg:() => newStateTCG('Hask', 'Hask')};
  const at = (bk, th, f, imp) => { setBook(bk); try { S = NEWB[bk](); } catch (e) {} S.book = bk; if (th) S.thread = th; S.f = Object.assign({}, f || {}); if (imp) S.imported = imp; setBook(bk); };
  const G4 = [['gotm'], ['moi'], ['bh', 'h'], ['tth'], ['tcg']], G3 = [['dg'], ['hoc'], ['bh', 'r'], ['rg', 't'], ['dod', 't'], ['tcg', 't']], GL = [['mt'], ['rg', 'l'], ['dod', 'l'], ['tcg', 'l']];
  const GROUPS = [{g:'fourth', title:'The Fourth', books:G4, rows:[['sgt', 'Sergeant (Book One\'s look)'], ['brisk'], ['kettle'], ['tuft'], ['ohl']], skip:{sgt:['tcg']}},
    {g:'third', title:'The Third', books:G3, rows:[['sgt', 'Sergeant (Book Two\'s look)'], ['haddat'], ['tangle'], ['marrow'], ['sathi'], ['mirrel']], skip:{mirrel:['dg']}},
    {g:'lether', title:'The Letherii', books:GL, rows:[['sgt', 'Sergeant (Book Five\'s look)'], ['tobet'], ['thegg'], ['perrit'], ['ammet']], skip:{}}];
  /* the flag-given scars, each with the state that shows it */
  const FLAGS = [['sgt', 'gotm', null, {sgtScar:1}, null, 'the alley scar'], ['sgt', 'tth', null, {sgtScar:1}, null, 'the Guild\'s knives'],
    ['sgt', 'bh', 'h', {sgtScar:1}, null, 'not the Fourth\'s (Y\'Ghatan)'], ['sgt', 'hoc', null, {sgtScar:1}, null, 'the end of the line'], ['sgt', 'dod', 't', {sgtScar:1}, null, 'the stretch'],
    ['sgt', 'tcg', 'l', {sgtScar:1, b10_c6_scarSaid:1}, null, 'the Sixth\'s stretch'], ['tuft', 'gotm', null, {c5_tuftMarked:1}, null, 'the grey lock'],
    ['tuft', 'moi', null, {}, {f:{c5_tuftMarked:1}}, 'the lock, carried'], ['ellis', 'gotm', null, {c7_ellisBack:1}, null, 'out of the grey'], ['ellis', 'moi', null, {}, {f:{c7_ellisBack:1}}, 'the streak, carried']];
  const PW = big ? 280 : 200, PH = big ? 280 : 200, LW = 150, HEAD = 26, BN = {gotm:'One', dg:'Two', moi:'Three', hoc:'Four', mt:'Five', bh:'Six', rg:'Seven', tth:'Eight', dod:'Nine', tcg:'Ten'};
  /* big: the head, close (drawn at 600 high, cropped to the face and hair); small: the bust as the game shows it */
  const cell = (id) => { const H = big ? 600 : PH, W = big ? 900 : Math.round(PW*1.5), cv = document.createElement('canvas'); cv.width = W; cv.height = H; PORTRAIT_CACHE.clear(); drawPortrait(cv.getContext('2d'), id, W, H, 0);
    if (!big) return cv; const o = document.createElement('canvas'); o.width = PW + (W - PW)/1; o.height = PH; o.getContext('2d').drawImage(cv, W/2 - PW/2, 60, PW, PH, (o.width - PW)/2, 0, PW, PH); return o; };
  WEAR_OFF = !on; const out = {};
  try {
    for (const G of GROUPS) { const cv = document.createElement('canvas'); cv.width = LW + G.books.length*PW; cv.height = HEAD + G.rows.length*PH; const x = cv.getContext('2d');
      x.fillStyle = '#15130f'; x.fillRect(0, 0, cv.width, cv.height); x.fillStyle = '#e9e1d2'; x.font = '600 14px sans-serif';
      G.books.forEach(([bk, th], i) => x.fillText(`Book ${BN[bk]}${th ? ' · ' + th : ''}`, LW + i*PW + 8, 18));
      G.rows.forEach(([id, nm], r) => { x.fillStyle = '#e9e1d2'; x.fillText(nm ? nm.split(' (')[0] : TPL[id].name, 8, HEAD + r*PH + 22); if (nm) { x.fillStyle = '#a29784'; x.font = '12px sans-serif'; x.fillText(nm.split(' (')[1].replace(')', ''), 8, HEAD + r*PH + 40); x.font = '600 14px sans-serif'; }
        G.books.forEach(([bk, th], i) => { if ((G.skip[id] || []).includes(bk)) return; at(bk, th); const c = cell(id); x.drawImage(c, (c.width - PW)/2, 0, PW, PH, LW + i*PW, HEAD + r*PH, PW, PH); }); });
      out[G.g] = cv.toDataURL('image/png'); }
    const n = FLAGS.length, cv = document.createElement('canvas'); cv.width = Math.min(n, 5)*PW; cv.height = Math.ceil(n/5)*(PH + HEAD); const x = cv.getContext('2d'); x.fillStyle = '#15130f'; x.fillRect(0, 0, cv.width, cv.height);
    FLAGS.forEach(([id, bk, th, f, imp, why], k) => { const cx = (k%5)*PW, cy = Math.floor(k/5)*(PH + HEAD); at(bk, th, f, imp); const c = cell(id); x.drawImage(c, (c.width - PW)/2, 0, PW, PH, cx, cy + HEAD, PW, PH);
      x.fillStyle = '#e9e1d2'; x.font = '12px sans-serif'; x.fillText(`${TPL[id].name || 'Sergeant'} · Book ${BN[bk]}: ${why}`, cx + 6, cy + 17); });
    out.flags = cv.toDataURL('image/png');
  } finally { WEAR_OFF = false; }
  return out; }, {on, big});
if (WEAR_DIR) { fs.mkdirSync(WEAR_DIR, { recursive: true });
  for (const [on, tag] of [[false, 'before'], [true, 'after']]) { const o = await wearRows(on, true);
    for (const [g, url] of Object.entries(o)) { const f = `${WEAR_DIR}/wear_${g}_${tag}.png`; fs.writeFileSync(f, Buffer.from(url.split(',')[1], 'base64')); console.log(f); } } }
if (WEAR_ONLY) { await br.close(); srv.kill(); process.exit(0); }
const wearSheet = await wearRows(true, false);
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
  /* the sergeant shares one id across the books and takes the book's look (v13.6): draw each look, Book One's first */
  const SGT = [[1, 'Sergeant (the Fourth: Book One\'s look)'], [2, 'Sergeant (the Third: Book Two\'s look)'], [5, 'Sergeant (the Sixth Company: Book Five\'s look)']];
  for (const [b, nm] of SGT) { try { NEW[b](); } catch (e) {} const cv = document.createElement('canvas'); cv.width = 240; cv.height = 180;
    try { if (typeof PORTRAIT_CACHE !== 'undefined') PORTRAIT_CACHE.clear(); drawPortrait(cv.getContext('2d'), 'sgt', 240, 180, 0); } catch (e) { continue; }
    out.portraits.push({k: 'sgt', name: nm, src: jpg(cv, .7)}); }
  for (const id of Object.keys(TPL)) { if (id === 'sgt') continue; const cv = document.createElement('canvas'); cv.width = 240; cv.height = 180;
    try { drawPortrait(cv.getContext('2d'), id, 240, 180, 0); } catch (e) { continue; }
    out.portraits.push({k: id, name: TPL[id].name || id, src: jpg(cv, .7)}); }
  /* the squad's walking figures (drawFigure), beside the busts, so the two can be compared */
  out.figs = [];
  for (const [b, nm] of SGT) { try { NEW[b](); } catch (e) {} const cv = document.createElement('canvas'); cv.width = 120; cv.height = 120; const x = cv.getContext('2d'); x.fillStyle = '#5a5648'; x.fillRect(0, 0, 120, 120);
    try { drawFigure(x, 'sgt', 60, 82, 3, 0, {still: true}); } catch (e) { continue; } out.figs.push({k: 'sgt', name: nm, src: jpg(cv, .8)}); }
  for (const id of Object.keys(TPL)) { if (id === 'sgt') continue; const cv = document.createElement('canvas'); cv.width = 120; cv.height = 120; const x = cv.getContext('2d'); x.fillStyle = '#5a5648'; x.fillRect(0, 0, 120, 120);
    try { drawFigure(x, id, 60, 82, 3, 0, {still: true}); } catch (e) { continue; } out.figs.push({k: id, name: TPL[id].name || id, src: jpg(cv, .8)}); }
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
</style><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Inter:wght@400;500;600&display=swap"><main><h1>Art contact sheets</h1><p>Every backdrop, squad portrait and picture in From the Ranks v13.6.0, book by book, for spotting the weak and the inconsistent at a glance. Captions are the game's own keys, then the place line the game shows.</p><nav>`;
const books = [...new Set(data.scenes.map(s => s.b))].sort((a, b) => a - b);
h += books.map(b => `<a href="#b${b}">Book ${BN[b]}</a>`).join('') + `<a href="#portraits">Portraits</a><a href="#wear">Across the books</a><a href="#figs">Figures</a><a href="#art">Pictures</a></nav>`;
for (const b of books) { const sc = data.scenes.filter(s => s.b === b);
  h += `<h2 id="b${b}">Book ${BN[b]}: backdrops (${sc.length})</h2><div class="g">` + sc.map(s => `<figure><img loading="lazy" src="${s.src}" alt=""><figcaption>${esc(s.k)}<br>${esc(s.loc)}</figcaption></figure>`).join('') + '</div>'; }
h += `<h2 id="portraits">Portraits (${data.portraits.length})</h2><div class="g">` + data.portraits.map(p => `<figure><img loading="lazy" src="${p.src}" alt=""><figcaption>${esc(p.name)} · ${esc(p.k)}</figcaption></figure>`).join('') + '</div>';
h += `<h2 id="wear">Across the books (${Object.keys(wearSheet).length - 1} squads)</h2><p>Each recurring squadmate in every book they walk in, oldest look first: the road on the face (polish plan §3). The last strip is the scars a save's flags give.</p>` + Object.entries(wearSheet).map(([g, src]) => `<figure style="margin-bottom:10px"><img loading="lazy" src="${src}" alt=""><figcaption>${esc(g)}</figcaption></figure>`).join('');
h += `<h2 id="figs">Walking figures (${data.figs.length})</h2><div class="g">` + data.figs.map(p => `<figure><img loading="lazy" src="${p.src}" alt=""><figcaption>${esc(p.name)} · ${esc(p.k)}</figcaption></figure>`).join('') + '</div>';
h += `<h2 id="art">Pictures (${data.art.length})</h2>`;
for (const g of [...new Set(data.art.map(a => a.g))]) { const L = data.art.filter(a => a.g === g);
  h += `<h3>${esc(g)} (${L.length})</h3><div class="g">` + L.map(a => `<figure><img loading="lazy" src="data:image/svg+xml;base64,${Buffer.from(a.svg).toString('base64')}" alt=""><figcaption>${esc(a.k)}</figcaption></figure>`).join('') + '</div>'; }
h += '</main>';
fs.writeFileSync(OUT, h); console.log(`${OUT}: ${data.scenes.length} backdrops, ${data.portraits.length} portraits, ${data.art.length} pictures, ${(h.length / 1e6).toFixed(1)} MB`);
await br.close(); srv.kill(); process.exit(0);
