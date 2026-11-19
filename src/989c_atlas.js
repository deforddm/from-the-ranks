/* ============ the atlas (v13.54.0; David, Nov 19, 2026: "draw up some more impressive maps") ============
   One hand for every drawn map in the game: the Deeds page's "Where the books meet" and each book's road map.
   Three geographies (Genabackis, Seven Cities, Lether to Kolanse), each a list of coasts, ranges, rivers and
   places in its own units; a map is a camera on one of them, inked on parchment, with the squad's road on top.
   The lie of the land, with sources (W = the Malazan Wiki, read Nov 19, 2026): Seven Cities lies west of
   Genabackis (W Seven Cities); Hissar on Seven Cities' east coast by the Sahul Sea, the Sialk Odhan to its
   west, Dosin Pali across the strait (W Hissar); Genabaris on Genabackis' north-west coast (W Malazan Empire);
   Pale north of the Tahlyn Mountains and Lake Azur, Darujhistan on the lake's south shore in the middle of the
   continent (W Darujhistan); Capustan on the Catlin's north bank in the east by the Rust Ocean (W Capustan);
   Coral on the south-east coast (W Genabackis); Kolanse east of Lether past the Wastelands and the Glass
   Desert (W Kolanse, W Glass Desert). Everything else is placed as the shipped road maps of Books One to
   Five placed it, and the chapters' own names. The coastlines are a sketch from the novels' maps, not a
   tracing, and every plate says so. No canon place is named here that the game's text does not already name.
   Rule 85 holds: a finale's world map stops at its own book (bookLive). Future stops are unnamed dots. */

const ATL_INK = '#3a2a1a', ATL_PAPER = '#dcc9a0', ATL_LAND = '#e6d6ae', ATL_SEA = '#b3bfb4', ATL_RED = '#9a2c1a', ATL_BLUE = '#2c4a78', ATL_WATER = '#4f6f84';
const atlR = (i, j, s) => hash(i | 0, j | 0, s | 0);

/* a coast with the wobble of a pen: midpoint displacement, the same every time */
function atlRough(pts, seed, amp, iters){
  let p = pts.map(q => q.slice());
  for (let it = 0; it < iters; it++) { const o = []; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length], dx = b[0] - a[0], dy = b[1] - a[1], k = (atlR(i, it, seed) - .5) * amp;
      o.push(a, [(a[0] + b[0]) / 2 - dy * k, (a[1] + b[1]) / 2 + dx * k]); } p = o; amp *= .62; }
  return p;
}
const atlEll = (cx, cy, rx, ry, n = 14) => Array.from({length:n}, (_, i) => [cx + Math.cos(i / n * 6.2832) * rx, cy + Math.sin(i / n * 6.2832) * ry]);

/* ---- the three geographies ---- */
const ATLAS = {
  gen: {seed:11, land:[[[120,70],[300,40],[520,60],[700,30],[880,50],[965,160],[940,300],[955,430],[905,560],[880,628],[850,690],[890,760],[870,830],[838,872],[900,905],[940,1000],[890,1120],[760,1230],[600,1285],[450,1250],[340,1150],[270,1010],[215,860],[235,700],[180,570],[150,450],[105,330],[130,240],[95,150]]],
    lakes:[atlEll(440, 520, 112, 58)],
    rivers:[[[600,668],[690,664],[780,652],[868,646]], [[330,520],[280,560],[236,640]]],
    ranges:[{p:[[385,415],[470,398],[560,408],[625,432]], n:11, z:1}, {p:[[226,290],[262,380],[292,470]], n:9, z:1.1}, {p:[[690,850],[770,884],[850,940]], n:9, z:1}, {p:[[560,566],[625,542],[690,566],[650,606],[590,600]], n:10, z:.6, hill:1}, {p:[[420,1000],[520,1060],[640,1080]], n:8, z:.9}],
    forests:[{x:800, y:112, rx:84, ry:40, n:24}],
    plains:[{x:690, y:330, rx:150, ry:70}, {x:660, y:720, rx:110, ry:50}],
    seas:[{t:'the Meningalle Ocean', x:20, y:760, rot:-90, z:1.15}, {t:'the Rust Ocean', x:1010, y:560, rot:90, z:1}],
    labels:[{t:'Lake Azur', x:440, y:524, k:'water'}, {t:'the Tahlyn Mountains', x:520, y:452, k:'feat', only:['gotm', 'moi']}, {t:'the Rhivi Plain', x:720, y:300, k:'region', only:['none']}, {t:'the Moranth Mountains', x:196, y:400, k:'feat', rot:-74, only:['none']},
      {t:'the Catlin', x:700, y:690, k:'water', only:['none']}, {t:'the Pannion Domin', x:560, y:900, k:'region', only:['moi']}, {t:'the Lamatath', x:660, y:735, k:'region', only:['tth']}],
    towns:{genabaris:{x:140, y:240, t:'Genabaris', k:'city'}, pale:{x:470, y:330, t:'Pale', k:'city', a:'l'}, daru:{x:478, y:586, t:'Darujhistan', k:'city', a:'b'}, capustan:{x:858, y:632, t:'Capustan', k:'city', a:'l'}, coral:{x:886, y:900, t:'Coral', k:'city', a:'l'}}},
  sev: {seed:23, land:[[[70,330],[110,262],[168,252],[214,236],[192,196],[232,166],[330,150],[430,90],[560,60],[700,70],[790,110],[860,170],[900,260],[895,350],[930,440],[900,540],[820,610],[740,650],[660,700],[600,735],[540,725],[470,760],[380,740],[300,690],[220,640],[150,560],[110,470],[120,400]],
      [[955,250],[994,272],[1000,360],[976,408],[950,340]]],
    lakes:[],
    rivers:[[[740,500],[655,558],[590,600],[540,660],[530,722]], [[768,348],[796,430],[782,505],[810,560]], [[640,640],[628,690],[610,722]]],
    ranges:[{p:[[330,205],[420,182],[505,172]], n:9, z:1}, {p:[[700,468],[740,486],[772,476]], n:6, z:.6, hill:1}, {p:[[520,520],[570,536],[610,520]], n:6, z:.6, hill:1}, {p:[[820,200],[850,250]], n:4, z:.8}],
    forests:[{x:625, y:548, rx:44, ry:22, n:14}],
    deserts:[{x:430, y:400, rx:112, ry:78}, {x:340, y:350, rx:70, ry:40, thin:1}],
    plains:[{x:790, y:380, rx:70, ry:60}, {x:640, y:420, rx:120, ry:60}, {x:560, y:300, rx:80, ry:40}],
    seas:[{t:'the Sahul Sea', x:968, y:520, rot:90, z:1}, {t:'Aren Bay', x:690, y:776, z:.9}],
    labels:[{t:'Raraku', x:520, y:420, k:'region', only:['dg', 'world'], w:[430, 428]}, {t:'the Sialk Odhan', x:640, y:330, k:'region', only:['dg']}],
    towns:{hissar:{x:893, y:345, t:'Hissar', k:'city', a:'l'}, aren:{x:585, y:728, t:'Aren', k:'city', a:'l'}, ehrlitan:{x:716, y:80, t:'Ehrlitan', k:'city'}, gdan:{x:540, y:250, t:"G'danisban", k:'city'}, yghatan:{x:300, y:332, t:"Y'Ghatan", k:'city', a:'l'}}},
  let: {seed:37, land:[[[60,300],[90,180],[150,128],[200,112],[330,70],[420,110],[520,60],[700,50],[900,70],[1100,60],[1300,90],[1480,70],[1600,130],[1650,250],[1622,380],[1660,480],[1600,600],[1450,680],[1250,700],[1000,720],[760,700],[560,720],[380,690],[230,640],[130,540],[80,420]]],
    lakes:[],
    rivers:[[[580,360],[470,410],[390,446],[330,472],[250,540],[196,618]], [[400,150],[380,240],[392,330],[390,446]]],
    ranges:[{p:[[520,110],[560,210],[545,300]], n:10, z:1}, {p:[[700,560],[800,600],[900,590]], n:8, z:.8}, {p:[[1480,180],[1540,230],[1570,300]], n:7, z:1}, {p:[[980,180],[1060,160],[1150,190]], n:7, z:.7, hill:1}],
    forests:[{x:250, y:230, rx:60, ry:40, n:18}, {x:430, y:590, rx:70, ry:36, n:16}],
    wastes:[{x:1090, y:390, rx:150, ry:150}],
    glass:[{x:1345, y:360, rx:100, ry:130}],
    plains:[{x:660, y:420, rx:90, ry:70}, {x:860, y:410, rx:70, ry:70}],
    seas:[{t:'the Reach', x:215, y:50, z:.9}],
    labels:[{t:'Lether', x:250, y:300, k:'realm', no:['rg', 'dod']}, {t:'Bluerose', x:660, y:190, k:'region', only:['dod']}, {t:"the Awl'dan", x:650, y:540, k:'region', only:['dod']}, {t:'Bolkando', x:850, y:270, k:'region', only:['dod'], from:'dod'},
      {t:'the Wastelands', x:1090, y:250, k:'region', from:'dod', w:[1090, 230]}, {t:'the Glass Desert', x:1340, y:476, k:'region', from:'tcg', w:[1320, 480]}, {t:'Kolanse', x:1440, y:222, k:'realm', from:'tcg', w:[1330, 140]}],
    towns:{letheras:{x:330, y:472, t:'Letheras', k:'city', a:'b'}, trate:{x:192, y:124, t:'Trate', k:'city', a:'l'}, highfort:{x:400, y:150, t:'High Fort', k:'town'}}}
};
const ATL_BUILT = {};
function atlGeo(id){ if (ATL_BUILT[id]) return ATL_BUILT[id]; const g = ATLAS[id];
  const b = {g, land:g.land.map((p, i) => atlRough(p, g.seed + i, .34, 4)), lakes:g.lakes.map((p, i) => atlRough(p, g.seed + 50 + i, .2, 2)), mt:[], trees:[]};
  g.ranges.forEach((r, ri) => { for (let i = 0; i < r.n; i++) { const f = r.n > 1 ? i / (r.n - 1) : 0, seg = Math.min(r.p.length - 2, Math.floor(f * (r.p.length - 1))), u = f * (r.p.length - 1) - seg, a = r.p[seg], c = r.p[seg + 1];
    b.mt.push({x:a[0] + (c[0] - a[0]) * u + (atlR(i, ri, 7) - .5) * 40, y:a[1] + (c[1] - a[1]) * u + (atlR(i, ri, 8) - .5) * 20, z:r.z * (.8 + atlR(i, ri, 9) * .5), hill:r.hill}); } });
  b.mt.sort((p, q) => p.y - q.y);
  (g.forests || []).forEach((f, fi) => { for (let i = 0; i < f.n; i++) { const an = atlR(i, fi, 21) * 6.2832, rr = Math.sqrt(atlR(i, fi, 22)); b.trees.push({x:f.x + Math.cos(an) * f.rx * rr, y:f.y + Math.sin(an) * f.ry * rr}); } });
  b.trees.sort((p, q) => p.y - q.y);
  return ATL_BUILT[id] = b;
}

/* ---- the roads: per book, a geography, a camera, and the stops by chapter (0 is where the book opens).
   q marks the second squad in the books where two take turns. to:1 ends a road off the plate's edge. ---- */
const ATL_ROUTES = {
  gotm:{geo:'gen', cam:[255, 262, 540, 400], title:'Genabackis', sub:"the Fourth's road", comp:[.92, .2], cart:'tl', stops:[
    {x:470, y:330, t:'Pale', a:'l'}, {x:492, y:348, t:'The camp at Pale', a:'b'}, {x:640, y:372, t:'The Rhivi Plain', a:'c'},
    {x:478, y:586, t:'Darujhistan', a:'c', via:[[730,420],[748,500],[690,560],[570,600]]}, {x:432, y:598, t:'The Daru roofs', a:'l', dy:8},
    {x:632, y:582, t:'The Gadrobi Hills', dy:8, via:[[478,586],[570,600]]}, {x:524, y:610, t:'The Fete', a:'b', via:[[570,600]]}, {x:612, y:540, t:'The quorl hill', a:'c', via:[[570,600]]}]},
  dg:{geo:'sev', cam:[480, 262, 500, 500], title:'Seven Cities', sub:'the Chain of Dogs', comp:[.1, .2], cart:'br', stops:[
    {x:893, y:345, t:'Hissar', a:'l'}, {x:852, y:386, t:"Bat'rol", a:'l'}, {x:796, y:430, t:'Dryj Spring · the Sekala', a:'l'}, {x:736, y:482, t:'Gelor Ridge', a:'l'},
    {x:655, y:558, t:'The Vathar'}, {x:628, y:626, t:'The Nenoth'}, {x:612, y:672, t:'Sanimon · the Geleen'}, {x:585, y:728, t:'Aren', a:'l', dy:-6}]},
  moi:{geo:'gen', cam:[400, 270, 580, 690], title:'Genabackis', sub:'the road to Coral', comp:[.1, .88], cart:'tr', stops:[
    {x:470, y:330, t:'Pale', a:'l'}, {x:496, y:346, t:'The Parley', dy:8}, {x:660, y:440, t:'The Rhivi Plain'}, {x:858, y:632, t:'Capustan', a:'l', dy:-8, via:[[770,540]]},
    {x:832, y:656, t:'The Prisoners', a:'l', dy:6}, {x:800, y:716, t:'South of the Catlin', a:'l'}, {x:812, y:810, t:'The Night Lift', a:'l'}, {x:886, y:900, t:'Coral', a:'l', dy:8}]},
  hoc:{geo:'sev', cam:[330, 340, 420, 440], title:'Seven Cities', sub:"the Fourteenth's march", comp:[.9, .2], cart:'bl', stops:[
    {x:585, y:728, t:'Aren', a:'b'}, {x:600, y:712, t:'The Muster'}, {x:606, y:672, t:"Coltaine's Fall"}, {x:598, y:596, t:'The Vathar'},
    {x:556, y:532, t:'The hills', a:'l'}, {x:500, y:466, t:'The Whirlwind Wall'}, {x:462, y:434, t:"Pan'arak", a:'l', dy:6}, {x:432, y:398, t:'Raraku', a:'c'}]},
  mt:{geo:'let', cam:[70, 30, 470, 520], title:'Lether', sub:"the Sixth Company's war", comp:[.9, .8], cart:'bl', stops:[
    {x:330, y:472, t:'Letheras', a:'l'}, {x:352, y:456, t:'The Drownings'}, {x:192, y:124, t:'Trate', a:'l', via:[[250,330],[200,220]]}, {x:300, y:92, t:"Kraig's Landing", a:'c'},
    {x:400, y:150, t:'High Fort'}, {x:396, y:280, t:'The Retreat'}, {x:306, y:352, t:'Brans Keep', a:'l'}, {x:334, y:498, t:'The Seventh Closure', dy:6}]},
  bh:{geo:'sev', cam:[30, 30, 880, 480], title:'Seven Cities', sub:'two squads, one summer', comp:[.93, .8], cart:'bl', squads:['the Third', 'the Fourth'], stops:[
    {x:432, y:404, t:'Raraku', a:'b'}, {x:372, y:366, t:'The Lato Odhan', dy:8}, {x:716, y:80, t:'The North Coast', q:1, a:'c'}, {x:300, y:332, t:"Y'Ghatan", a:'l', dy:8},
    {x:540, y:250, t:"G'danisban", q:1, a:'b', via:[[640,150]]}, {x:205, y:258, t:'The Kokakal Shore', dy:10}, {x:600, y:200, t:'The Falling Sky', q:1}, {x:60, y:130, t:'to Malaz City', to:1, via:[[150,200]]}]},
  rg:{geo:'let', cam:[30, 250, 420, 300], title:'Lether', sub:'one war, two sides', comp:[.08, .84], cart:'tr', squads:['the Third', 'the Sixth'], stops:[
    {x:92, y:330, t:'The coast', o:1}, {x:92, y:330, t:'The Burned Ships'}, {x:350, y:490, t:'The File', q:1, a:'b'}, {x:160, y:366, t:'Night Raids', a:'b'},
    {x:262, y:480, t:'The Muster', q:1, a:'l'}, {x:228, y:406, t:'The Village', a:'c'}, {x:292, y:436, t:'Before the Walls', q:1, a:'c'}, {x:330, y:472, t:'Letheras'}]},
  tth:{geo:'gen', cam:[330, 500, 630, 480], title:'Genabackis', sub:'the caravan road, and back', comp:[.92, .16], cart:'bl', stops:[
    {x:478, y:586, t:'Darujhistan', o:1}, {x:478, y:586, t:'Darujhistan', a:'c'}, {x:640, y:628, t:'The Black Coral Road', a:'c'}, {x:886, y:900, t:'Black Coral', a:'l', dy:10, via:[[810,740]]},
    {x:856, y:862, t:"The Pilgrims' Camp", a:'l', dy:-4}, {x:610, y:800, t:'The Road Back', a:'l', via:[[760,880]]}, {x:508, y:630, t:'The Night of the Hounds', dy:8, via:[[540,730]]}, {x:434, y:598, t:'The Toll', a:'b'}]},
  dod:{geo:'let', cam:[150, 170, 1250, 470], title:'Lether and the Wastes', sub:'the march east', comp:[.94, .17], cart:'br', squads:['the Third', 'the Sixth'], stops:[
    {x:330, y:472, t:'Letheras', o:1}, {x:330, y:472, t:'Letheras, Emptied', a:'c'}, {x:352, y:500, t:'The Escort', q:1, a:'b'}, {x:600, y:440, t:'The Road East', a:'c'},
    {x:780, y:462, t:'The Ration Book', q:1, a:'b', via:[[600,478]]}, {x:930, y:404, t:'Short Rations', a:'c'}, {x:1050, y:426, t:'Dust on the Horizon', q:1, a:'b'}, {x:1110, y:366, t:'The Rearguard'}]},
  tcg:{geo:'let', cam:[990, 150, 700, 560], title:'The Glass Desert', sub:'and Kolanse: the last road', comp:[.93, .86], cart:'bl', note:'tr', squads:['the Third', 'the Sixth'], stops:[
    {x:1130, y:374, t:'The Wastes', o:1}, {x:1130, y:374, t:'Missing Is Not Dead', a:'c'}, {x:1146, y:412, t:'The Parting', q:1, a:'l', dy:6}, {x:1270, y:360, t:'Night Marches', a:'b'},
    {x:1330, y:600, t:'The Long Way Round', q:1, dy:-10, via:[[1210,520]]}, {x:1400, y:352, t:'The Last Water', a:'c'}, {x:1592, y:452, t:'The Feint', q:1, a:'l', dy:8, via:[[1480,590]]}, {x:1520, y:350, t:'Over the Ridge', a:'b'}]}
};

/* ---- drawing ---- */
function atlView(cam, rx, ry, rw, rh){ const s = Math.min(rw / cam[2], rh / cam[3]), ox = rx + (rw - cam[2] * s) / 2 - cam[0] * s, oy = ry + (rh - cam[3] * s) / 2 - cam[1] * s; return {s, X:x => x * s + ox, Y:y => y * s + oy, rx, ry, rw, rh}; }
function atlPath(ctx, v, pts, close){ ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(v.X(p[0]), v.Y(p[1])) : ctx.moveTo(v.X(p[0]), v.Y(p[1]))); if (close) ctx.closePath(); }
function atlCurve(ctx, pts){ ctx.beginPath(); if (!pts.length) return; ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2, k = .18;
    ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k, p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k, p2[0], p2[1]); } }
function atlText(ctx, t, x, y, o = {}){ const sp = o.sp || 0; ctx.save(); ctx.translate(x, y); if (o.rot) ctx.rotate(o.rot * Math.PI / 180); ctx.font = o.font; ctx.textBaseline = 'alphabetic';
  let w = ctx.measureText(t).width + sp * (t.length - 1), sx = o.align === 'right' ? -w : o.align === 'center' ? -w / 2 : 0;
  const run = fn => { if (!sp) { fn(t, sx, 0); return; } let cx = sx; for (const ch of t) { fn(ch, cx, 0); cx += ctx.measureText(ch).width + sp; } };
  ctx.textAlign = 'left'; ctx.lineJoin = 'round';
  if (o.halo) { ctx.strokeStyle = o.halo; ctx.lineWidth = o.hw || 3; run((c, a, b) => ctx.strokeText(c, a, b)); }
  ctx.fillStyle = o.fill || ATL_INK; run((c, a, b) => ctx.fillText(c, a, b)); ctx.restore(); }

/* the land of one geography, seen through a view, clipped to the view's rectangle */
function atlLand(ctx, v, geoId, who, upTo, fs = 1){
  const b = atlGeo(geoId), g = b.g, u = Math.max(.6, Math.min(1.12, v.s * 1.9)); // u: how big the pen's glyphs are
  const lives = l => (!l.only || l.only.includes(who)) && !(l.no && l.no.includes(who)) && (!l.from || !upTo || MAP_ORDER.indexOf(l.from) <= MAP_ORDER.indexOf(upTo));
  ctx.save(); ctx.beginPath(); ctx.rect(v.rx, v.ry, v.rw, v.rh); ctx.clip();
  const land = () => { ctx.beginPath(); b.land.forEach(p => { p.forEach((q, i) => i ? ctx.lineTo(v.X(q[0]), v.Y(q[1])) : ctx.moveTo(v.X(q[0]), v.Y(q[1]))); ctx.closePath(); }); };
  ctx.lineJoin = 'round';
  [[15, .2], [9.5, .28], [4.5, .4]].forEach(([d, a]) => { land(); ctx.strokeStyle = `rgba(52,74,84,${a})`; ctx.lineWidth = (d * 2 + 1) * u; ctx.stroke(); land(); ctx.strokeStyle = ATL_SEA; ctx.lineWidth = (d * 2 - 1) * u; ctx.stroke(); }); // the coast's ripples
  land(); ctx.fillStyle = ATL_LAND; ctx.fill();
  ctx.save(); land(); ctx.clip();
  land(); ctx.strokeStyle = 'rgba(150,112,60,.22)'; ctx.lineWidth = 16 * u; ctx.stroke(); land(); ctx.strokeStyle = 'rgba(130,92,46,.2)'; ctx.lineWidth = 6 * u; ctx.stroke(); // the shore's wash
  (g.plains || []).forEach((p, pi) => { ctx.strokeStyle = 'rgba(96,104,52,.5)'; ctx.lineWidth = .8; for (let i = 0; i < 26; i++) { const an = atlR(i, pi, 31) * 6.2832, rr = Math.sqrt(atlR(i, pi, 32)), x = v.X(p.x + Math.cos(an) * p.rx * rr), y = v.Y(p.y + Math.sin(an) * p.ry * rr);
    ctx.beginPath(); ctx.moveTo(x - 2 * u, y); ctx.lineTo(x - 1 * u, y - 3 * u); ctx.moveTo(x, y); ctx.lineTo(x, y - 3.6 * u); ctx.moveTo(x + 2 * u, y); ctx.lineTo(x + 1.2 * u, y - 3 * u); ctx.stroke(); } });
  (g.deserts || []).forEach((d, di) => { const n = d.thin ? 50 : 150; for (let i = 0; i < n; i++) { const an = atlR(i, di, 41) * 6.2832, rr = Math.pow(atlR(i, di, 42), .62), x = v.X(d.x + Math.cos(an) * d.rx * rr), y = v.Y(d.y + Math.sin(an) * d.ry * rr);
      ctx.fillStyle = 'rgba(126,82,32,.55)'; ctx.fillRect(x, y, 1.1, 1.1); }
    if (!d.thin) { ctx.strokeStyle = 'rgba(126,82,32,.6)'; ctx.lineWidth = .9; for (let i = 0; i < 12; i++) { const an = atlR(i, di, 43) * 6.2832, rr = Math.sqrt(atlR(i, di, 44)) * .8, x = v.X(d.x + Math.cos(an) * d.rx * rr), y = v.Y(d.y + Math.sin(an) * d.ry * rr);
      ctx.beginPath(); ctx.moveTo(x - 6 * u, y); ctx.quadraticCurveTo(x - 1 * u, y - 5 * u, x + 6 * u, y); ctx.stroke(); } } });
  (g.wastes || []).forEach((d, di) => { if (upTo && MAP_ORDER.indexOf(upTo) < MAP_ORDER.indexOf('dod')) return; ctx.strokeStyle = 'rgba(70,52,34,.55)'; ctx.fillStyle = 'rgba(70,52,34,.5)'; ctx.lineWidth = .8; for (let i = 0; i < 110; i++) { const an = atlR(i, di, 51) * 6.2832, rr = Math.sqrt(atlR(i, di, 52)), x = v.X(d.x + Math.cos(an) * d.rx * rr), y = v.Y(d.y + Math.sin(an) * d.ry * rr), k = atlR(i, di, 53);
      if (k < .5) ctx.fillRect(x, y, 1.2, 1.2); else if (k < .8) { ctx.beginPath(); ctx.arc(x, y, 1.5 * u, 0, 7); ctx.stroke(); } else { ctx.beginPath(); ctx.moveTo(x - 4 * u, y); ctx.lineTo(x + 4 * u, y + (k - .9) * 12 * u); ctx.stroke(); } } });
  (g.glass || []).forEach((d, di) => { if (upTo && MAP_ORDER.indexOf(upTo) < MAP_ORDER.indexOf('tcg')) return; for (let i = 0; i < 46; i++) { const an = atlR(i, di, 61) * 6.2832, rr = Math.sqrt(atlR(i, di, 62)), x = v.X(d.x + Math.cos(an) * d.rx * rr), y = v.Y(d.y + Math.sin(an) * d.ry * rr), z = (1.6 + atlR(i, di, 63) * 2.4) * u;
      ctx.fillStyle = 'rgba(236,244,244,.9)'; ctx.strokeStyle = 'rgba(58,70,84,.75)'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(x - z * .7, y + z * .5); ctx.lineTo(x + z * .15, y - z * 1.7); ctx.lineTo(x + z * .8, y + z * .35); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + z * .15, y - z * 1.7); ctx.lineTo(x + z * .1, y + z * .42); ctx.stroke(); } });
  g.rivers.forEach(r => { const pts = r.map(q => [v.X(q[0]), v.Y(q[1])]); atlCurve(ctx, pts); ctx.strokeStyle = 'rgba(230,214,174,.9)'; ctx.lineWidth = 3.4 * u; ctx.stroke(); atlCurve(ctx, pts); ctx.strokeStyle = ATL_WATER; ctx.lineWidth = 1.5 * u; ctx.stroke(); });
  b.lakes.forEach(p => { atlPath(ctx, v, p, true); ctx.fillStyle = ATL_SEA; ctx.fill(); ctx.save(); ctx.clip(); atlPath(ctx, v, p, true); ctx.strokeStyle = 'rgba(52,74,84,.4)'; ctx.lineWidth = 9 * u; ctx.stroke(); atlPath(ctx, v, p, true); ctx.strokeStyle = ATL_SEA; ctx.lineWidth = 7 * u; ctx.stroke(); ctx.restore(); atlPath(ctx, v, p, true); ctx.strokeStyle = ATL_INK; ctx.lineWidth = 1.1; ctx.stroke(); });
  b.trees.forEach((t, i) => { const x = v.X(t.x), y = v.Y(t.y), r = (2.6 + atlR(i, 3, 71)) * u; ctx.strokeStyle = ATL_INK; ctx.lineWidth = .8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + r * .9); ctx.stroke();
    ctx.fillStyle = '#8f9a62'; ctx.beginPath(); ctx.arc(x, y - r * .4, r, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(40,52,24,.35)'; ctx.beginPath(); ctx.arc(x + r * .3, y - r * .2, r * .62, 0, 7); ctx.fill(); });
  b.mt.forEach((m, i) => { const x = v.X(m.x), y = v.Y(m.y), z = 7.5 * m.z * u; ctx.lineJoin = 'round';
    if (m.hill) { ctx.beginPath(); ctx.moveTo(x - z * 1.5, y); ctx.quadraticCurveTo(x - z * .4, y - z * 2, x + z * 1.5, y); ctx.fillStyle = ATL_LAND; ctx.fill(); ctx.strokeStyle = ATL_INK; ctx.lineWidth = 1; ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + z * .2, y - z * .8); ctx.lineTo(x + z * .9, y - z * .15); ctx.moveTo(x - z * .1, y - z * .5); ctx.lineTo(x + z * .4, y - z * .05); ctx.strokeStyle = 'rgba(58,42,26,.55)'; ctx.lineWidth = .7; ctx.stroke(); return; }
    const px = x + (atlR(i, 5, 81) - .5) * z * .3, py = y - z * 1.7;
    ctx.beginPath(); ctx.moveTo(x - z * 1.15, y); ctx.lineTo(px, py); ctx.lineTo(x + z * 1.15, y); ctx.closePath(); ctx.fillStyle = '#efe2be'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x + z * 1.15, y); ctx.lineTo(x + z * .1, y); ctx.lineTo(px + z * .12, py + z * .7); ctx.closePath(); ctx.fillStyle = 'rgba(58,42,26,.34)'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(x - z * 1.15, y); ctx.lineTo(px, py); ctx.lineTo(x + z * 1.15, y); ctx.strokeStyle = ATL_INK; ctx.lineWidth = 1.1; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - z * .08, py + z * .5); ctx.lineTo(x - z * .5, y - z * .1); ctx.strokeStyle = 'rgba(58,42,26,.5)'; ctx.lineWidth = .7; ctx.stroke(); });
  ctx.restore();
  land(); ctx.strokeStyle = ATL_INK; ctx.lineWidth = 1.5; ctx.stroke();
  // the names of seas, lands and waters
  const fz = n => Math.round(Math.max(9, n * fs * Math.max(.8, Math.min(1.3, v.rw / 380))));
  (g.seas || []).forEach(s => { const x = v.X(s.x), y = v.Y(s.y); if (x < v.rx + 6 || x > v.rx + v.rw - 6 || y < v.ry + 8 || y > v.ry + v.rh - 4) return; atlText(ctx, s.t, x, y, {font:`italic ${fz(12 * s.z)}px 'IM Fell English', Georgia, serif`, fill:'rgba(40,62,80,.85)', rot:s.rot, align:'center', sp:1.2}); });
  g.labels.filter(lives).forEach(l => { const x = v.X(who === 'world' && l.w ? l.w[0] : l.x), y = v.Y(who === 'world' && l.w ? l.w[1] : l.y);
    if (l.k === 'realm') atlText(ctx, l.t.toUpperCase(), x, y, {font:`${fz(15)}px 'IM Fell English SC', Georgia, serif`, fill:'rgba(74,44,22,.62)', align:'center', sp:5, rot:l.rot});
    else if (l.k === 'region') atlText(ctx, l.t, x, y, {font:`italic ${fz(12)}px 'IM Fell English', Georgia, serif`, fill:'rgba(74,44,22,.8)', align:'center', sp:1.6, rot:l.rot, halo:'rgba(230,214,174,.6)', hw:2.5});
    else if (l.k === 'water') atlText(ctx, l.t, x, y, {font:`italic ${fz(10.5)}px 'IM Fell English', Georgia, serif`, fill:'rgba(34,62,84,.95)', align:'center', rot:l.rot, halo:l.x && g.lakes.length && l.t === 'Lake Azur' ? null : 'rgba(230,214,174,.7)', hw:2.5});
    else atlText(ctx, l.t, x, y, {font:`italic ${fz(10)}px 'IM Fell English', Georgia, serif`, fill:'rgba(58,42,26,.9)', align:'center', rot:l.rot, halo:'rgba(230,214,174,.7)', hw:2.5}); });
  ctx.restore();
}
function atlTown(ctx, x, y, k, u = 1){ ctx.lineWidth = 1.2;
  if (k === 'city') { ctx.fillStyle = ATL_LAND; ctx.strokeStyle = ATL_INK; ctx.beginPath(); ctx.arc(x, y, 4 * u, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = ATL_INK; ctx.beginPath(); ctx.arc(x, y, 1.7 * u, 0, 7); ctx.fill(); }
  else { ctx.fillStyle = ATL_INK; ctx.beginPath(); ctx.arc(x, y, 2.2 * u, 0, 7); ctx.fill(); } }
function atlTownLabel(ctx, t, x, y, a, dy, px, r = 4){ const mid = a === 'c' || a === 'b'; atlText(ctx, t, x + (a === 'l' ? -r - 4 : mid ? 0 : r + 4), y + (a === 'c' ? -r - 4 : a === 'b' ? r + px * .95 : px * .32) + (dy || 0), {font:`${px}px 'IM Fell English SC', Georgia, serif`, align:a === 'l' ? 'right' : mid ? 'center' : 'left', halo:'rgba(232,218,180,.92)', hw:3.2}); }

/* the sheet itself: sea-wash, and at the end stains, folds, a burnt edge and the neatline */
function atlSheet(ctx, W, H){ ctx.fillStyle = ATL_SEA; ctx.fillRect(0, 0, W, H); }
function atlFinish(ctx, W, H, seed){
  for (let i = 0; i < 16; i++) { const x = atlR(i, seed, 91) * W, y = atlR(i, seed, 92) * H, r = (.12 + atlR(i, seed, 93) * .3) * Math.max(W, H), g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const dark = atlR(i, seed, 94) < .6; g.addColorStop(0, dark ? 'rgba(112,78,34,.13)' : 'rgba(255,244,214,.12)'); g.addColorStop(1, 'rgba(112,78,34,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  for (let i = 0; i < Math.round(W * H / 900); i++) { ctx.fillStyle = atlR(i, seed, 95) < .5 ? 'rgba(60,40,18,.16)' : 'rgba(255,246,220,.16)'; ctx.fillRect(atlR(i, seed, 96) * W, atlR(i, seed, 97) * H, 1 + atlR(i, seed, 98) * 1.6, 1); }
  [[W * .5, 0, W * .5, H], [0, H * .5, W, H * .5]].forEach(([x1, y1, x2, y2], i) => { ctx.strokeStyle = 'rgba(70,46,20,.13)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.strokeStyle = 'rgba(255,246,222,.16)'; ctx.beginPath(); ctx.moveTo(x1 + (i ? 0 : 1), y1 + (i ? 1 : 0)); ctx.lineTo(x2 + (i ? 0 : 1), y2 + (i ? 1 : 0)); ctx.stroke(); }); // the folds
  const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * .42, W / 2, H / 2, Math.hypot(W, H) * .56); vg.addColorStop(0, 'rgba(72,42,14,0)'); vg.addColorStop(1, 'rgba(58,32,10,.5)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = ATL_INK; ctx.lineWidth = 1.6; ctx.strokeRect(3.5, 3.5, W - 7, H - 7); ctx.lineWidth = .8; ctx.strokeRect(7.5, 7.5, W - 15, H - 15);
  ctx.lineWidth = .8; ctx.beginPath(); for (let x = 22; x < W - 12; x += 16) { ctx.moveTo(x, 3.5); ctx.lineTo(x, 7.5); ctx.moveTo(x, H - 7.5); ctx.lineTo(x, H - 3.5); } for (let y = 22; y < H - 12; y += 16) { ctx.moveTo(3.5, y); ctx.lineTo(7.5, y); ctx.moveTo(W - 7.5, y); ctx.lineTo(W - 3.5, y); } ctx.stroke();
}
function atlCompass(ctx, x, y, r){ ctx.save(); ctx.translate(x, y); ctx.strokeStyle = ATL_INK; ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(0, 0, r * .62, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r * .7, 0, 7); ctx.stroke();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, L = i % 2 ? r * .55 : r, w = i % 2 ? r * .11 : r * .17; ctx.save(); ctx.rotate(a);
    ctx.beginPath(); ctx.moveTo(0, -L); ctx.lineTo(w, 0); ctx.lineTo(0, 0); ctx.closePath(); ctx.fillStyle = ATL_INK; ctx.fill(); ctx.beginPath(); ctx.moveTo(0, -L); ctx.lineTo(-w, 0); ctx.lineTo(0, 0); ctx.closePath(); ctx.fillStyle = '#efe2be'; ctx.fill(); ctx.stroke(); ctx.restore(); }
  ctx.fillStyle = ATL_RED; ctx.beginPath(); ctx.arc(0, 0, r * .09, 0, 7); ctx.fill(); ctx.restore();
  atlText(ctx, 'N', x, y - r - 3, {font:`${Math.round(r * .55)}px 'IM Fell English SC', Georgia, serif`, align:'center', halo:'rgba(200,206,190,.8)', hw:2.5}); }
function atlCartouche(ctx, W, H, corner, title, sub, squads){ const tp = Math.round(Math.max(12, Math.min(17, W * .036))), sp = Math.round(tp * .74);
  ctx.font = `${tp}px 'IM Fell English SC', Georgia, serif`; let w = ctx.measureText(title).width; ctx.font = `italic ${sp}px 'IM Fell English', Georgia, serif`; w = Math.max(w, ctx.measureText(sub || '').width);
  const lg = squads ? squads.reduce((n, s) => n + ctx.measureText(s).width + 26, 0) : 0; w = Math.max(w, lg) + 22;
  const h = tp + (sub ? sp + 5 : 0) + (squads ? sp + 7 : 0) + 14, x = corner[1] === 'l' ? 14 : W - 14 - w, y = corner[0] === 't' ? 14 : H - 14 - h;
  ctx.fillStyle = 'rgba(40,24,8,.28)'; ctx.fillRect(x + 2, y + 2, w, h); ctx.fillStyle = '#ecdcb4'; ctx.fillRect(x, y, w, h); ctx.strokeStyle = ATL_INK; ctx.lineWidth = 1.3; ctx.strokeRect(x + .5, y + .5, w - 1, h - 1); ctx.lineWidth = .7; ctx.strokeRect(x + 3.5, y + 3.5, w - 7, h - 7);
  let ty = y + 8 + tp * .82; atlText(ctx, title, x + w / 2, ty, {font:`${tp}px 'IM Fell English SC', Georgia, serif`, align:'center'});
  if (sub) { ty += sp + 4; atlText(ctx, sub, x + w / 2, ty, {font:`italic ${sp}px 'IM Fell English', Georgia, serif`, align:'center', fill:'#5a3a1e'}); }
  if (squads) { ty += sp + 7; let cx = x + (w - lg) / 2 + 4; squads.forEach((s, i) => { ctx.strokeStyle = i ? ATL_BLUE : ATL_RED; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(cx, ty - sp * .3); ctx.lineTo(cx + 15, ty - sp * .3); ctx.stroke(); ctx.setLineDash([]);
    atlText(ctx, s, cx + 19, ty, {font:`italic ${sp}px 'IM Fell English', Georgia, serif`, fill:i ? ATL_BLUE : ATL_RED}); ctx.font = `italic ${sp}px 'IM Fell English', Georgia, serif`; cx += ctx.measureText(s).width + 26; }); } }
function atlRoad(ctx, pts, col, u = 1, faint){ atlCurve(ctx, pts); ctx.strokeStyle = 'rgba(236,222,186,.85)'; ctx.lineWidth = 4.4 * u; ctx.lineCap = 'round'; ctx.stroke(); atlCurve(ctx, pts); ctx.strokeStyle = col; ctx.globalAlpha = faint ? .55 : 1; ctx.lineWidth = 2 * u; ctx.setLineDash([5.5 * u, 3.5 * u]); ctx.lineCap = 'butt'; ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; }
function atlDisc(ctx, x, y, n, col, r){ ctx.fillStyle = '#f1e4c0'; ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = col; ctx.font = `700 ${Math.round(r * 1.25)}px 'Alegreya Sans SC', sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(n), x, y + r * .08); ctx.textBaseline = 'alphabetic'; }

/* ---- a book's road map ---- */
function atlRouteStatic(W, H, dpr, book, ch){
  const R = ATL_ROUTES[book], c = document.createElement('canvas'); c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const v = atlView(R.cam, 8, 8, W - 16, H - 16), u = Math.max(.8, Math.min(1.25, W / 400)), g = ATLAS[R.geo];
  atlSheet(ctx, W, H); atlLand(ctx, v, R.geo, book, book);
  ctx.save(); ctx.beginPath(); ctx.rect(8, 8, W - 16, H - 16); ctx.clip();
  const P = s => [v.X(s.x), v.Y(s.y)], px = Math.round(Math.max(9.5, Math.min(13, W * .03)));
  // the land's own cities that are not stops of this road, quietly
  Object.values(g.towns).forEach(t => { if (R.stops.some(s => Math.hypot(s.x - t.x, s.y - t.y) < 26)) return; const [x, y] = P(t); if (x < 16 || x > W - 16 || y < 16 || y > H - 16) return; ctx.globalAlpha = .7; atlTown(ctx, x, y, t.k, u * .85); atlTownLabel(ctx, book === 'tth' && t.t === 'Coral' ? 'Black Coral' : t.t, x, y, t.a, 0, px - 1); ctx.globalAlpha = 1; });
  if (book === 'gotm' && ch >= 3 && ch <= 6) { const x = v.X(420), y = v.Y(486); ctx.fillStyle = 'rgba(30,22,40,.3)'; ctx.beginPath(); ctx.ellipse(x + 3, y + 13 * u, 15 * u, 4 * u, 0, 0, 7); ctx.fill(); // the Moon's Spawn, over the lake from Chapter Three until it moves off after the Fete
    ctx.fillStyle = '#2a2430'; ctx.strokeStyle = ATL_INK; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - 15 * u, y - 2 * u); ctx.lineTo(x - 6 * u, y - 8 * u); ctx.lineTo(x + 8 * u, y - 7 * u); ctx.lineTo(x + 16 * u, y - 1 * u); ctx.lineTo(x + 5 * u, y + 7 * u); ctx.lineTo(x - 7 * u, y + 5 * u); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  [0, 1].forEach(q => { const mine = R.stops.map((s, n) => ({s, n})).filter(o => (o.s.q || 0) === q && o.n <= ch); if (mine.length < 2) return; const pts = [];
    mine.forEach((o, i) => { if (i) (o.s.via || []).forEach(p => pts.push([v.X(p[0]), v.Y(p[1])])); pts.push(P(o.s)); });
    atlRoad(ctx, pts, q ? ATL_BLUE : ATL_RED, u);
    const last = mine[mine.length - 1].s; if (last.to) { const a = pts[pts.length - 2], b2 = pts[pts.length - 1], an = Math.atan2(b2[1] - a[1], b2[0] - a[0]); ctx.fillStyle = q ? ATL_BLUE : ATL_RED; ctx.beginPath(); ctx.moveTo(b2[0] + Math.cos(an) * 7, b2[1] + Math.sin(an) * 7); ctx.lineTo(b2[0] + Math.cos(an + 2.5) * 6, b2[1] + Math.sin(an + 2.5) * 6); ctx.lineTo(b2[0] + Math.cos(an - 2.5) * 6, b2[1] + Math.sin(an - 2.5) * 6); ctx.fill(); } });
  [0, 1].forEach(pass => R.stops.forEach((s, n) => { const [x, y] = P(s), col = s.q ? ATL_BLUE : ATL_RED;
    if (s.o && ch > 0) return;
    if (n > ch) { if (!s.to && !pass) { ctx.fillStyle = 'rgba(58,42,26,.3)'; ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 7); ctx.fill(); } return; }
    if (s.to) { if (pass) atlText(ctx, s.t, x + 14, y + 5, {font:`italic ${px}px 'IM Fell English', Georgia, serif`, fill:col, halo:'rgba(200,206,190,.8)', hw:3}); return; }
    if (!pass) { if (n) atlDisc(ctx, x, y, n, col, 6.2 * u); else atlTown(ctx, x, y, 'city', u); }
    else atlTownLabel(ctx, s.t, x, y, s.a, s.dy, px, n ? 6.2 * u : 4 * u); }));
  ctx.restore();
  const cp = R.comp; atlCompass(ctx, 8 + (W - 16) * cp[0], 8 + (H - 16) * cp[1], Math.max(13, W * .042));
  atlCartouche(ctx, W, H, R.cart, R.title, R.sub, R.squads);
  { const nt = R.note || ('b' + (R.cart[1] === 'r' ? 'l' : 'r')); atlText(ctx, 'a sketch, not to scale', nt[1] === 'l' ? 16 : W - 16, nt[0] === 't' ? 21 : H - 13, {font:`italic ${Math.max(8, px - 2.5)}px 'IM Fell English', Georgia, serif`, align:nt[1] === 'l' ? 'left' : 'right', fill:'rgba(58,42,26,.75)'}); }
  atlFinish(ctx, W, H, ATLAS[R.geo].seed + ch);
  return c;
}
function atlasRoute(cv, s, t){
  const book = ATL_ROUTES[bookOf(s)] ? bookOf(s) : 'gotm', R = ATL_ROUTES[book], dpr = Math.min(2, window.devicePixelRatio || 1), W = cv.clientWidth, H = cv.clientHeight; if (!W || !H) return;
  if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
  const ch = Math.max(0, Math.min(7, s.chapter || 0)), fonts = document.fonts && document.fonts.check ? document.fonts.check("12px 'IM Fell English SC'") : true, key = [book, ch, W, H, dpr, fonts].join('|');
  if (!cv._atl || cv._atl.key !== key) cv._atl = {key, img:atlRouteStatic(W, H, dpr, book, ch)};
  const ctx = cv.getContext('2d'); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(cv._atl.img, 0, 0); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const here = R.stops[ch]; if (here && !here.to && !bookDone(s)) { const v = atlView(R.cam, 8, 8, W - 16, H - 16), x = v.X(here.x), y = v.Y(here.y), k = .5 + Math.sin((t || 0) / 300) * .5;
    ctx.strokeStyle = rgba(here.q ? ATL_BLUE : ATL_RED, .75 - k * .5); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 10 + k * 7, 0, 7); ctx.stroke(); }
}
drawRoute = atlasRoute;

/* ---- where the books meet: Seven Cities and Genabackis across the Meningalle, and below them, oceans away, Lether and the east ---- */
function atlWorldCanvas(upTo){
  const live = k => !!(BOOKS[k] && !BOOKS[k].coming) && (!upTo || MAP_ORDER.indexOf(k) <= MAP_ORDER.indexOf(upTo));
  // drawn at a phone's width, so the names read at their own size: Seven Cities upper left, Genabackis lower right, the ocean between
  const far = live('mt'), W = 400, H = far ? 668 : 488, IY = 492, IH = 168, dpr = 2, c = document.createElement('canvas'); c.width = W * dpr; c.height = H * dpr; const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  atlSheet(ctx, W, H);
  const vs = atlView([20, 20, 1000, 790], 8, 8, 262, 214), vg = atlView([30, 10, 1010, 1310], 192, 208, 200, 272), last = upTo || 'tcg';
  atlLand(ctx, vs, 'sev', 'world', last); atlLand(ctx, vg, 'gen', 'world', last);
  const T = (v, geo, id) => { const t = ATLAS[geo].towns[id]; return [v.X(t.x), v.Y(t.y)]; }, G = (v, pts) => pts.map(p => [v.X(p[0]), v.Y(p[1])]);
  { const a = T(vg, 'gen', 'genabaris'), b = T(vs, 'sev', 'aren'); atlCurve(ctx, [[a[0] - 5, a[1]], [a[0] - 34, a[1] + 4], [b[0] + 26, b[1] + 44], [b[0] + 3, b[1] + 6]]); ctx.strokeStyle = 'rgba(40,62,80,.85)'; ctx.lineWidth = 1.2; ctx.setLineDash([2, 4]); ctx.stroke(); ctx.setLineDash([]); } // the sea lane, Genabaris to Aren
  atlText(ctx, 'the Meningalle Ocean', 96, 318, {font:"italic 14px 'IM Fell English', Georgia, serif", fill:'rgba(40,62,80,.85)', align:'center', sp:1.4});
  const roads = [], disc = (k, x, y, col) => roads.push(() => atlDisc(ctx, x, y, BOOKS[k].n, col, 7));
  const road = (k, v, pts, col, at) => { if (!live(k)) return; const p = G(v, pts); atlRoad(ctx, p, col, .9); const d = at == null ? p[p.length - 1] : [v.X(at[0]), v.Y(at[1])]; disc(k, d[0], d[1], col); };
  road('gotm', vg, [[470,330],[640,372],[730,420],[748,500],[690,560],[560,598],[478,586]], ATL_RED, [742, 470]);
  road('moi', vg, [[470,330],[560,440],[770,560],[858,632],[800,716],[812,810],[886,900]], ATL_BLUE, [650, 492]);
  road('tth', vg, [[478,586],[640,628],[810,740],[886,900]], ATL_RED, [690, 660]);
  road('dg', vs, [[893,345],[796,430],[736,482],[655,558],[628,626],[585,728]], ATL_RED, [770, 452]);
  road('hoc', vs, [[585,728],[598,596],[556,532],[500,466],[432,404]], ATL_BLUE, [540, 510]);
  road('bh', vs, [[432,404],[372,366],[300,332],[205,258]], ATL_RED, [366, 362]);
  if (live('bh')) atlRoad(ctx, G(vs, [[716,80],[640,150],[540,250],[600,200]]), ATL_RED, .9);
  let vl = null;
  if (far) { const cam = live('tcg') ? [30, 20, 1660, 720] : live('dod') ? [30, 20, 1400, 720] : [10, 20, 640, 720]; vl = atlView(cam, 8, IY, 384, IH);
    ctx.save(); ctx.beginPath(); ctx.rect(8, IY, 384, IH); ctx.clip(); ctx.fillStyle = ATL_SEA; ctx.fillRect(8, IY, 384, IH); ctx.restore();
    atlLand(ctx, vl, 'let', 'world', last, .9);
    if (!live('tcg')) { const x0 = vl.X(live('dod') ? 1400 : 620), g2 = ctx.createLinearGradient(x0 - 70, 0, x0, 0); g2.addColorStop(0, 'rgba(179,191,180,0)'); g2.addColorStop(1, 'rgba(179,191,180,1)'); ctx.fillStyle = g2; ctx.fillRect(x0 - 70, IY, 392 - x0 + 70, IH); } // the map stops where the books so far stop
    road('mt', vl, [[330,472],[250,330],[192,124],[300,92],[400,150],[396,280],[306,352],[330,472]], ATL_RED, [400, 150]);
    road('rg', vl, [[84,318],[164,372],[236,416],[330,472]], ATL_BLUE, [118, 340]);
    road('dod', vl, [[330,472],[600,440],[820,452],[960,404],[1096,376]], ATL_RED, [720, 446]);
    road('tcg', vl, [[1096,376],[1270,360],[1400,352],[1520,350]], ATL_RED, [1330, 356]);
    if (live('tcg')) { atlRoad(ctx, G(vl, [[1096,376],[1210,520],[1330,600],[1480,590],[1592,452]]), ATL_BLUE, .9); atlText(ctx, 'the long way round', vl.X(1330), vl.Y(668), {font:"italic 9.5px 'IM Fell English', Georgia, serif", fill:ATL_BLUE, align:'center', halo:'rgba(232,218,180,.8)', hw:2.5}); } }
  const town = (v, geo, id, t, a) => { const o = ATLAS[geo].towns[id], x = v.X(o.x), y = v.Y(o.y); atlTown(ctx, x, y, o.k, .85); atlTownLabel(ctx, t || o.t, x, y, a || o.a, 0, 10.5, 3.4); };
  town(vs, 'sev', 'hissar'); town(vs, 'sev', 'aren'); if (live('bh')) { town(vs, 'sev', 'yghatan'); town(vs, 'sev', 'gdan'); town(vs, 'sev', 'ehrlitan', null, 'l'); }
  town(vg, 'gen', 'genabaris'); town(vg, 'gen', 'pale'); town(vg, 'gen', 'daru', null, 'l'); if (live('moi')) { town(vg, 'gen', 'capustan', null, 'c'); town(vg, 'gen', 'coral', live('tth') ? 'Black Coral' : 'Coral'); }
  if (vl) { town(vl, 'let', 'letheras'); town(vl, 'let', 'trate'); }
  roads.forEach(f => f());
  atlText(ctx, 'SEVEN CITIES', vs.X(300), vs.Y(628), {font:"13px 'IM Fell English SC', Georgia, serif", fill:'rgba(74,44,22,.66)', align:'center', sp:3});
  atlText(ctx, 'GENABACKIS', vg.X(560), vg.Y(1180), {font:"13px 'IM Fell English SC', Georgia, serif", fill:'rgba(74,44,22,.66)', align:'center', sp:3});
  if (far) { ctx.strokeStyle = ATL_INK; ctx.lineWidth = 1.3; ctx.strokeRect(8.5, IY + .5, 383, IH - 1); ctx.lineWidth = .7; ctx.strokeRect(11.5, IY + 3.5, 377, IH - 7);
    const lab = 'oceans away: Lether' + (live('dod') ? ' and the east' : ''); ctx.font = "italic 11px 'IM Fell English', Georgia, serif"; const lw = ctx.measureText(lab).width + 16; ctx.fillStyle = '#ecdcb4'; ctx.fillRect(200 - lw / 2, IY - 8, lw, 16); ctx.strokeStyle = ATL_INK; ctx.lineWidth = 1; ctx.strokeRect(200 - lw / 2 + .5, IY - 7.5, lw - 1, 15);
    atlText(ctx, lab, 200, IY + 4, {font:"italic 11px 'IM Fell English', Georgia, serif", align:'center'}); }
  atlCompass(ctx, 96, 396, 22);
  atlText(ctx, 'the numbers are the books', 96, 446, {font:"italic 10px 'IM Fell English', Georgia, serif", align:'center', fill:'rgba(40,62,80,.95)'});
  atlText(ctx, 'a sketch, not to scale', 96, 460, {font:"italic 10px 'IM Fell English', Georgia, serif", align:'center', fill:'rgba(40,62,80,.95)'});
  atlFinish(ctx, W, H, 5);
  return c;
}
const ATL_WORLD = {};
function atlasWorldHTML(upTo){
  const live = k => !!(BOOKS[k] && !BOOKS[k].coming) && (!upTo || MAP_ORDER.indexOf(k) <= MAP_ORDER.indexOf(upTo));
  const alt = `Map, drawn in ink on parchment: Seven Cities in the west, Genabackis in the east, the Meningalle Ocean between, the sea lane from Genabaris to Aren, the road from Pale to Coral, and the march from Aren to Raraku${live('mt') ? '; and below, oceans away, Lether' : ''}${live('tcg') ? ', with the march east from Letheras into the Wastes, the Glass Desert and Kolanse' : live('dod') ? ', with the march east from Letheras into the Wastes' : ''}. Each book's road carries its number.`;
  const fonts = document.fonts && document.fonts.check ? document.fonts.check("12px 'IM Fell English SC'") : true, key = [upTo || '', MAP_ORDER.filter(live).join(''), fonts].join('|');
  if (!ATL_WORLD[key]) { try { ATL_WORLD[key] = atlWorldCanvas(upTo).toDataURL('image/jpeg', .88); } catch (e) { return `<p class="fine worldmap">${alt}</p>`; } }
  return `<img class="worldmap" width="400" height="${live('mt') ? 668 : 488}" src="${ATL_WORLD[key]}" alt="${alt}">`;
}
