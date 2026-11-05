/* ============ Book Six, Chapter 3: Y'Ghatan ============ */
/* The Third, in Blistig's 9th Legion of the Fourteenth, on the reserve line under Y'Ghatan on the day of the assault (The Bonehunters ch 7;
   bh-canon §2, §4, §5, §14). Phase 1, the afternoon and dusk: the captain's orders (the marines lead at dusk, Keneb's and Baralta's follow,
   the 9th holds the reserve, Fist Blistig at a distance only), an old soldier of the 9th, a sapper on the forward trench (the trick, The
   Sapper's Breath), the water wagon (the chapter's one fever risk, as a "yes, but"), a Khundryl rider watching for breakouts, and Leoman's
   people out of a drain to fire the reserve's wagons (b6_c3_sally, the main fight; stage2 the drain mouth). Phase 2, dusk into night: the
   wall goes down, the marines go in, the streets light from inside with nearly three thousand of the Fourteenth in them (headline only),
   and the order comes down the reserve line to hold the way out open. The key, S.f.b6_c3_key: 'in' (into the burning streets to keep the
   way open: b6_c3_streets, the book's MORTAL fight, the fire spreading tile by tile; stage2 the mouth of the way) or 'line' (hold the gate
   and pull the burned out: b6_c3_gate, hard, not mortal; stage2 the side of the walls). Phase 3, the night after: the barrow field, Ch1's
   key read at the old barrows ('bury': the old dead were put back before the new ones joined them), the long barrow for the dead the army
   could carry out, the squad's own dead remembered there, the Deck (the Herald), strays among the barrows (b6_c3_strays, optional), and
   the order to march for Sotka the next night because of the plague. Never the palace gate, Truth, the temple with Corabb and the children,
   the tunnels under the city, or the warren of D'riss; the squad never speaks with Sinn, Keneb, Blistig or Faradan Sort. Never a burning
   figure. Notes for later chapters: docs/bh-ch3-notes.md. */
/* FOR THE ARTIST (103b): names this file uses.
   Items: ART['item/b6_c3_scorchedmail'], ['item/b6_c3_fanaticknife'].
   Backdrops (SCENEX, the brief's): b6_ghatan_fire, b6_barrows. Also used, not ours: b6_ghatan_walls.
   Figures: none new. Foes are the engine's b6_rebel, b6_rebelbow, b6_fanatic, b6_rebelchief. NPCs borrow b4_c1_hollet (the captain),
   b2soldier (the old soldier, the surgeon, the sapper), b4_c3_khundryl (the rider), b4_c1_recruit (the water-carrier).
   Ground: b6_c3_line on Book Two's odhan_night (. hardpan , scrub s sand r spoil heaps at the forward lip # rock = tents W the water
   wagon h horse lines F the 9th's fire ^ forward to the walls); b6_c3_breach on Book Two's hissar, at night (# the city, burning
   D the breach and the gate , ash . street c the carts where the burned are laid w the old well = the surgeons' awnings v back to the
   line); b6_c3_barrows on odhan_night with this file's small wrapper (m an old barrow, o an old barrow that is a trigger, M the new long
   barrow, b the far barrows where the strays are, x a dead tree, F the barrow-side fire). Battles use odhan_night and hissar. */

/* ---- small helpers (b63: Book Six, Chapter Three) ---- */
const b63Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b6In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b63If = (id, s) => b6In(id) ? (typeof s === 'function' ? s() : s) : '';
const b63Who = () => (ROLL() && ROLL().who) || 'sgt';
const b63Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b63Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b63V = (id, you, they) => id === 'sgt' ? you : they;
const b63L = (id, n) => { if (b6In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b63Ph = () => S.f.b6_c3_ph || 1;
const b63Key = () => S.f.b6_c3_key === 'in' || S.f.b6_c3_key === 'line' ? S.f.b6_c3_key : null;
const b63KeyDone = () => !!(S.f.b6_c3_streetsDone || S.f.b6_c3_gateDone);
/* Chapter One's key, read at the old barrows: 'bury' or 'leave', or null when a save never played it */
const b63K1 = () => S.f.b6_c1_key === 'bury' || S.f.b6_c1_key === 'leave' ? S.f.b6_c1_key : null;
const b63Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b63Here = () => S.squad.filter(id => id !== 'sgt' && b6In(id));
const b63And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const B63_SHE = ['haddat', 'sathi', 'marrow', 'mirrel', 'hessa', 'rasp'];
const b63He = id => B63_SHE.includes(id) ? 'she' : 'he';
/* who fell in this chapter's mortal fight (the dead from earlier books carry other chapters) */
const b63Fell = () => Object.keys(S.dead || {}).filter(id => TPL[id] && S.dead[id] && S.dead[id].ch === 3 && !S.dead[id].from);
const b63Healer = () => HEALER();

/* ---- the fire in the streets: b6_c3_streets burns at its far end when it starts, and every round from the second it takes more of the
   street, tile by tile, edges first. The middle stays open: that is the way the squad is holding. Fire only lands on empty ground. ---- */
const B63_FIRE = {
  1:{lit:[[2,0],[3,0],[4,0],[5,0]], spread:[[[1,1],[6,1]], [[1,2],[6,2],[3,1]], [[0,3],[7,3],[4,1]], [[1,4],[6,4]], [[1,6],[6,6]], [[1,7],[6,7]], [[0,8],[7,8]]],
     say:['The fire comes down the street a doorway at a time.', 'A roof goes in somewhere to the left, and the heat comes out of the gap after it.', 'The smoke is at knee height now, and rolling.', 'Another house takes, all by itself. It is that hot.']},
  2:{lit:[[1,0],[6,0],[1,1],[6,1]], spread:[[[1,2],[6,2]], [[1,3],[6,3]], [[0,4],[7,4]], [[1,5],[6,5]], [[1,7],[6,7]], [[0,8],[7,8]]],
     say:['The walls either side of the way are burning, and the way between them is not. Yet.', 'The fire leans in from both sides and stops short of the middle, like a crowd at a rope.', 'Something gives inside a house on the right, all at once, and sparks come down across the way.']}};
function b63Light(){ if (!b6On() || !B || B.id !== 'b6_c3_streets' || B.b63lit) return; B.b63lit = 1;
  const F = B63_FIRE[B.def.isStage2 ? 2 : 1]; F.lit.forEach(([x, y]) => { if (!unitAt(x, y)) preFire(x, y, 99, 'the burning street'); });
  blog(`<em>${B.def.isStage2 ? 'The houses either side of the way are alight from end to end.' : 'The far end of the street is already burning.'} It will not stay where it is.</em>`); }
function b63Spread(){ const F = B63_FIRE[B.def.isStage2 ? 2 : 1], row = F.spread[B.round - 2]; if (!row) return; let n = 0;
  row.forEach(([x, y]) => { if (inB(x, y) && !wall(x, y) && !unitAt(x, y) && !fireAt(x, y)) { preFire(x, y, 99, 'the burning street'); n++; } });
  if (n) { blog(`<em>${F.say[(B.round - 2) % F.say.length]}</em>`); sparks(3.5, 1, 14, '#ff8a3a', .5); } }
{ const _sb = startBattle; startBattle = function(id, opt = {}){ const r = _sb(id, opt); if (b6On() && B && B.id === 'b6_c3_streets') b63Light(); return r; }; }
{ const _nr = newRound; newRound = function(){ const r = _nr(); if (b6On() && B && !B.over && B.id === 'b6_c3_streets' && B.round >= 2) b63Spread(); return r; }; }

/* ---- the barrow field's ground: Book Two's Odhan at night, with the barrows on it. An old barrow is a low mound of stony earth; with
   Chapter One's 'leave' it is still dug open. The new long barrow is fresh earth. (The artist may redraw it; this is the plain one.) ---- */
TILEX.b6_c3_barrows ??= (ctx, ch, x, y, T, dark) => {
  const base = TILEX.odhan_night || TILEX.odhan; if (!base) return;
  if (!'moMb'.includes(ch)) return base(ctx, ch, x, y, T, true);
  base(ctx, '.', x, y, T, true); const px = x*T, py = y*T, open = ch !== 'M' && typeof S !== 'undefined' && S && S.f && S.f.b6_c1_key === 'leave';
  ctx.save(); ctx.beginPath(); ctx.rect(px, py, T, T); ctx.clip();
  if (ch === 'M') { ell(ctx, px + T*.5, py + T*.62, T*.62, T*.3, '#2a2018'); ell(ctx, px + T*.5, py + T*.56, T*.56, T*.22, '#3a2c20'); ell(ctx, px + T*.42, py + T*.5, T*.3, T*.08, 'rgba(255,150,80,.12)'); }
  else { ell(ctx, px + T*.5, py + T*.64, T*.44, T*.24, '#22201e'); ell(ctx, px + T*.5, py + T*.58, T*.38, T*.17, '#34302a');
    if (open) { ell(ctx, px + T*.5, py + T*.58, T*.2, T*.08, '#08070a'); ell(ctx, px + T*.78, py + T*.72, T*.12, T*.06, '#3e3830'); } }
  ctx.restore(); };

/* ---- The Sapper's Breath: The Rope's Way (Book One's rope), in a sapper's words. From a sapper of the 9th on the forward trench: in a
   gallery fire you go low, cloth wet over the mouth, and you go to your mate, not away. Not sorcery. The battle half is The Rope's: swap
   places with a squadmate, once a fight, free. ---- */
Object.assign(TRICKS, {
  b6_c3_breath:{name:'The Sapper\'s Breath', ch:3, use:'fight', ab:'t_b6_c3_breath', where:'the forward trench under Y\'Ghatan, with a sapper of the 9th',
    lore:'When the timbers take in a gallery, the air goes bad from the top down. Sappers learn it the once: cloth wet over the mouth, down on the floor where the last good air lies, and you crawl to your mate, not away from the fire, because your mate is the one who knows the way out. Not sorcery. Practice, and the ones who did not practise.',
    get fx(){ return `Once a fight, and it does not use the bearer's action: go low under the smoke with a wet cloth over the mouth, and swap places with any squadmate within ${5 + lvT()}. No free swings. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b6_c3_breath:{name:TRICKS.b6_c3_breath.name, trick:'b6_c3_breath', free:true, desc:()=>TRICKS.b6_c3_breath.fx,
    tiles:u=>party().filter(p => p !== u && !p.ally && cheb(u, p) <= 5 + lvT()),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; const ux = u.x, uy = u.y; sparks(ux, uy, 10, '#9a968e', .35); sparks(t.x, t.y, 10, '#9a968e', .35);
      u.x = t.x; u.y = t.y; t.x = ux; t.y = uy; AUDIO.play('smoker', .4); B.moved = true;
      blog(`${u.name} goes down on the ground with a wet cloth over the mouth, under the smoke, and comes up where ${t.name} was. ${t.name} is where ${u.name} was. The other side never saw either of them go.`); }},
});

/* ---- the words this chapter adds to Book Six's glossary ---- */
GLOSSX.bh.push(
  [3, 'The maethgara', 'Y\'Ghatan\'s old olive-oil stores, under the city. Leoman emptied them before the siege, and the city knew it, and nobody outside asked why.', ()=>!!(S && S.f && S.f.b6_c3_oil)],
  [3, 'The way out', 'What the soldiers of the Fourteenth call the road out of the fire at Y\'Ghatan. They say the girl Sinn made it. They say a great deal.', ()=>!!(S && S.f && S.f.b6_c3_order)]);

/* ---- the reading: the barrow field the night after (bh:3), the Herald ---- */
B6DECK[3] = {scene:'b6_barrows', where:'a flat stone at the foot of an old barrow, with the coals between', set:'The barrow field outside Y\'Ghatan, the night after the fire, with one new barrow among the old ones and the city still smoking behind them.',
  back:'b6_c3_fire', backT:'Back to the fire.',
  say:{marrow:'"Not tonight," Marrow says, and lays the cloth out anyway, because her hands want something to do. "Sit, child. One card. If it is the one I think it is, I will not say its name out loud."',
    tallow:'"My grandmother never read in a graveyard," Tallow says. He looks at the long barrow, and at the city, and unwraps the oilcloth anyway. "I think she would tonight."',
    oldninth:'The old soldier does not ask for rum. "Sit," he says. "On the stone. Not on them." He shuffles one-handed with his eyes on the city. "One card. They\'re listening tonight, all of them."'}};

/* the fire node is a roster fire (38c) */
ROSTER_FIRES.bh = ROSTER_FIRES.bh || {}; ROSTER_FIRES.bh[3] = ['b6_c3_fire'];

const B6CH3 = {
  title:'Y\'Ghatan', number:'Three',
  intro:{loc:'Y\'Ghatan', sub:'The reserve line · the day of the assault', scene:'b6_ghatan_walls', cap:'Walls the colour of old bone, the siege lines dug in, and the barrows of the Empire\'s dead along the road.',
    paras:[
`Y'Ghatan is old. It has been taken before, by the Empire among others, and the Empire left its dead outside the walls in barrows along the road, and Leoman's people dug some of them up when they came in. The walls are the colour of the bones in them. That is what the soldiers say, and nobody has gone close enough to check.`,
()=>{ const v = b63Here().map(id => TPL[id].name);
  return `You are Sergeant {sgt}, Third squad, 9th Legion. ${v.length ? `${b63And(v)} ${v.length > 1 ? 'are' : 'is'} with you, sitting in a scrape behind the 9th's line with your backs to the spoil.` : 'The Third, today, is you, sitting in a scrape behind the 9th\'s line with your back to the spoil.'}${b6In('mehet') ? ' Mehet is looking at the walls. He grew up behind them.' : ''}`; },
`The assault goes in at dusk. The marines lead it. Fist Keneb's and Tene Baralta's people go in after them. Blistig's 9th holds the reserve. The Wickans and the Khundryl ride the plain outside the walls, for anyone who tries to leave.`,
`The reserve, the old soldiers say, is where you sit and watch other people get killed, and are grateful, and then get sent in anyway.`],
    go:'To the line', node:'b6_c3_start'},

  areas:[
    /* 16 x 12 (b6_c3_line, dusk; Book Two's Odhan at night). The 9th's reserve line on the plain south of the walls: ^ forward to the
       walls (the marines' trench, then the gate)  r the spoil heaps at the forward lip, where the walls can be seen  = the 9th's tents
       W the water wagon  h the horse lines  F the 9th's fire  # rock  , scrub  s sand */
    { id:'b6_c3_line', title:'Y\'Ghatan · the reserve line', sub:'The 9th\'s lines south of the walls', hint:'Tap ground to move · tap a figure to talk · the walls are north, past the spoil', decor:'odhan_night', dark:true,
      map:[ "##,,,,..^...,,##",
            "#,,..ss.....s.,#",
            ",,...r....r....,",
            "................",
            "..=..=....=..=..",
            "................",
            ".W.....F....h.h.",
            "..,..........,..",
            ",,..=......=..,,",
            "......s.........",
            "#,,...........,#",
            "##,,,,....,,,,##" ],
      walk:'.,s', triggers:{F:'b6_c3_fire', W:'b6_c3_water', r:'b6_c3_spoil', '^':'b6_c3_to_breach'}, start:{x:7, y:9},
      quest:()=> b63Ph() === 1 ? (!S.f.b6_c3_orders ? 'The captain, on the line.' : !S.f.b6_c3_sallyDone ? 'The forward lip, by the spoil. The walls.' : 'Dusk. The assault goes in at dusk.')
        : !S.f.b6_c3_order ? 'The walls.' : 'North, to the gate.',
      npcs:[
        {id:'capt', name:'The captain', kind:'b4_c1_hollet', x:9, y:5, node:()=> S.f.b6_c3_wallSeen && !S.f.b6_c3_order ? 'b6_c3_order' : S.f.b6_c3_orders ? 'b6_c3_capt_again' : 'b6_c3_capt', show:()=>b63Ph() <= 2, fresh:()=>!S.f.b6_c3_orders || (!!S.f.b6_c3_wallSeen && !S.f.b6_c3_order)},
        {id:'old', name:'An old soldier of the 9th', kind:'b2soldier', x:4, y:7, node:()=>'b6_c3_old', show:()=>b63Ph() === 1, fresh:()=>!S.f.b6_c3_oldMet},
        {id:'sapper', name:'A sapper on the forward trench', kind:'b2soldier', x:11, y:3, node:()=>S.f.b6_c3_breathTried ? 'b6_c3_sapper_again' : 'b6_c3_sapper', show:()=>b63Ph() === 1, fresh:()=>!S.f.b6_c3_breathTried},
        {id:'rider', name:'A Khundryl rider', kind:'b4_c3_khundryl', x:14, y:7, node:()=>'b6_c3_rider', show:()=>b63Ph() === 1, fresh:()=>!S.f.b6_c3_rider},
        {id:'carrier', name:'A water-carrier', kind:'b4_c1_recruit', x:2, y:5, node:()=>'b6_c3_water', show:()=>b63Ph() === 1 && !S.f.b6_c3_waterTried, fresh:()=>!S.f.b6_c3_waterTried} ] },

    /* 16 x 12 (b6_c3_breach, night; Book Two's Hissar). Under the walls at the breach, the city burning past it: # the city's walls and
       houses  D at the top the breach (into the streets), and at the right the gate  F fire  , ash and rubble  . the open ground
       c the carts where the burned are laid  w an old well outside the walls  = the surgeons' awnings  v back to the reserve line */
    { id:'b6_c3_breach', title:'Y\'Ghatan · under the walls', sub:'Night · the city burning', hint:'Tap ground to move · the breach is north, the gate east · the line is south', decor:'hissar', dark:true,
      map:[ "####F###D###F###",
            "###,,,,,,,,,,#G#",
            ",,,,....,,......",
            "..F.....c.......",
            ".............w..",
            "..c....,,....c..",
            "................",
            ",,..........,,,,",
            "................",
            "..=....=....=...",
            "................",
            ".......v........" ],
      walk:'.,', triggers:{D:'b6_c3_breach', G:'b6_c3_gatedoor', c:'b6_c3_burned', w:'b6_c3_well', v:'b6_c3_to_line'}, start:{x:7, y:10},
      quest:()=> !b63Key() ? 'The captain, under the walls, with the order.' : !b63KeyDone() ? (b63Key() === 'in' ? 'The breach. Into the streets.' : 'The gate.') : 'The night. The captain.',
      npcs:[
        {id:'capt', name:'The captain', kind:'b4_c1_hollet', x:9, y:7, node:()=> b63KeyDone() ? 'b6_c3_night' : 'b6_c3_key', fresh:()=>!b63Key() || b63KeyDone()},
        {id:'surgeon', name:'The 9th\'s surgeon', kind:'b2soldier', x:3, y:8, node:()=>'b6_c3_surgeon', fresh:()=>!S.f.b6_c3_surgeon} ] },

    /* 16 x 12 (b6_c3_barrows, the night after; odhan_night with this file's barrows). The barrow field by the road, south-west of the
       walls: m the old barrows  o an old barrow (a trigger)  M the new long barrow  b the far barrows, where something moves  x a dead
       tree, where the city can be seen  F the barrow-side fire */
    { id:'b6_c3_barrows', title:'Y\'Ghatan · the barrow field', sub:'The night after', hint:'Tap ground to move · tap a figure to talk · the new barrow is in the middle', decor:'b6_c3_barrows', dark:true,
      map:[ ",,..m....x...m,,",
            ",.m...m.......m,",
            "..o.......m..b..",
            "..........m.....",
            ".m...MMMM.......",
            "......F.....m...",
            "..m.........o...",
            ".......,,.......",
            ",,m.......m..b.,",
            "................",
            ",..m..,....m...,",
            ",,,,..........,," ],
      walk:'.,', triggers:{F:'b6_c3_fire', M:'b6_c3_long', o:'b6_c3_oldbarrow', b:'b6_c3_far', x:'b6_c3_city'}, start:{x:7, y:9},
      quest:()=> !S.f.b6_c3_long ? 'The new barrow.' : !S.f.b6_c3_capt3 ? 'The captain. The army has orders.' : 'The road to Sotka, tomorrow night.',
      npcs:[
        {id:'capt', name:'The captain', kind:'b4_c1_hollet', x:9, y:6, node:()=>'b6_c3_capt3', fresh:()=>!S.f.b6_c3_capt3},
        {id:'old', name:'The old soldier of the 9th', kind:'b2soldier', x:4, y:6, node:()=>'b6_c3_count', fresh:()=>!S.f.b6_c3_count} ] } ],

  battles:{
    /* dusk: Leoman's people come up out of an old drain to fire the reserve's wagons; then the squad goes after them to the drain mouth */
    b6_c3_sally:{title:'The reserve\'s wagons', style:'odhan_night', dark:true, warrenText:'Y\'Ghatan · dusk · the warrens are thick with something sick', warren:{meanas:1, denul:1}, music:'battle',
      map:["..t..t..","........","..t...t.","........","...tt...","........",".t....t.","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b6_rebel',2,1],['b6_rebel',5,1],['b6_fanatic',1,0],['b6_fanatic',6,0],['b6_rebelbow',4,0]], xp:190, after:'b6_c3_sally_after',
      waves:[{round:2, foes:[['b6_fanatic',0,2],['b6_fanatic',7,2]], text:'Two more come up out of the dark at a run, low, with clay jars held against their chests.'}],
      preText:()=>`They are among the wagons before the pickets have finished shouting: men in desert robes with tulwars, a bowman behind them, and two with clay jars and torches, making for the wagon with the reserve's ladders on it.`,
      stage2:{title:'The drain mouth', xp:100, pitTxt:'the drain',
        text:()=>`The last of them break and run, back the way they came, north across the open ground toward the walls. ${b63Say({mehet:'"The old storm drain," Mehet says. "Under the potters\' gate. It was bricked up when I was a boy." He is already running after them. "It is open now."', tangle:'Tangle has seen where they are running. "A drain," he says. "Under the wall. If they go back down it, they come back up it." He is already running.', _:'They are running for something at the foot of the walls: a low black mouth in the ground. The squad goes after them.'})}\n\nAt the drain mouth their captain is waiting for them, with a bowman on the rubble above, and he does not let them go down it.`,
        map:["########","...o....","..t...t.","........","...t....","........",".t....t.","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b6_rebelchief',4,1],['b6_rebel',1,2],['b6_rebel',5,2],['b6_rebelbow',1,1]]} },
    /* 'in': into the burning streets to hold the way out open. The book's mortal fight. The fire spreads tile by tile (B63_FIRE). */
    b6_c3_streets:{title:'The burning streets', style:'hissar', dark:true, mortal:true, warrenText:'Inside Y\'Ghatan · whoever falls here stays down · the air itself is burning', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","#..t...#","#......#","...#....","........","..t..t..","#......#","#..t...#","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b6_fanatic',2,1],['b6_fanatic',5,1],['b6_rebel',1,3],['b6_rebel',6,3],['b6_rebelbow',4,2]], xp:260, after:'b6_c3_streets_after',
      waves:[{round:3, foes:[['b6_fanatic',1,2],['b6_fanatic',6,2]], text:'Two more come out of a doorway that is already alight, with torches, through the smoke.'}],
      preFx:B => b63Light(),
      preText:()=>`The street is the width of a cart. The far end of it is burning, and the houses either side are thinking about it. Between the squad and the fire, Leoman's people: two with torches, going from door to door, and others with swords to see they are let.`,
      stage2:{title:'The mouth of the way', xp:130,
        text:()=>`The street opens, at its end, onto something nobody in the squad has a word for. The fire is everywhere, on both sides, up the walls and over the roofs, and down the middle of it runs a way where the fire is not: a road through the burning, the flames leaning back from it.\n\nThe soldiers say a girl made it. You cannot see her. You can see the ones coming out along it, Malazans, in what is left of their kit, carrying each other. And you can see who has come to close it: a knot of Leoman's people at its mouth, with a captain, and torches.`,
        map:["#..##..#","#......#","#.t..t.#","#......#","...##...","........","#.t..t.#","#......#","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b6_rebelchief',3,1],['b6_fanatic',2,0],['b6_fanatic',5,0],['b6_rebel',2,3],['b6_rebel',5,3]]} },
    /* 'line': hold the gate while the burned are pulled out behind; rebels come out along the side of the walls */
    b6_c3_gate:{title:'The gate', style:'hissar', dark:true, warrenText:'Under the walls · night · the warrens taste of smoke and something sicker', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Hold the gate four rounds, while the burned are carried out behind you.'},
      map:["##......","#...t...","#.......","#..t..t.","#.......","#.......","#..tt...","#.......","#.......","##......"],
      party:[[3,7],[4,7],[2,7],[5,7],[3,8],[4,8]],
      foes:[['b6_rebel',3,0],['b6_rebel',6,0],['b6_rebelbow',5,1]], xp:240, after:'b6_c3_gate_after',
      waves:[{round:2, foes:[['b6_rebel',2,1],['b6_fanatic',7,2]], text:'More of them come along the foot of the wall, out of the smoke, from somewhere further round.'},
             {round:3, foes:[['b6_rebel',4,0],['b6_rebelbow',7,0]], text:'Two more, from the same place. There is a door in the wall somewhere, round the curve.'}],
      preText:()=>`Behind the squad, the gate, and in the gate the burned coming out, carried or walking. In front, out of the smoke along the foot of the wall, Leoman's people, who have found that the way out of a burning city is the same way for everyone.`,
      stage2:{title:'The side of the walls', xp:120,
        text:()=>`The burned are out, the ones who were coming. The ones along the wall have pulled back round the curve of it, and the squad goes after them, because there is a door in that wall and it will not stay shut on its own.\n\n${b63Say({mehet:'"The tanners\' postern," Mehet says, running. "It lets out by the ditch. They will try to go back in, or out past the Wickans."', haddat:'Haddat runs at the front, shield up. "There," she says, and there it is: a low door in the wall, open, and men at it.', _:'There it is: a low door in the wall, open, and men at it.'})}`,
        map:["##......","#..o....","#...t...","#.......","#..t..t.","#.......","#.......","#.....t.","#.......","##......"], pitTxt:'the ditch',
        party:[[3,7],[4,7],[2,7],[5,7],[3,8],[4,8]],
        foes:[['b6_rebelchief',4,1],['b6_rebel',2,2],['b6_rebel',6,3],['b6_fanatic',5,2]]} },
    /* the night after (optional): Leoman's people who got out in the smoke, hiding among the far barrows */
    b6_c3_strays:{title:'The far barrows', style:'odhan_night', dark:true, open:true, warrenText:'The barrow field · the night after · the warrens are very quiet', warren:{meanas:1, denul:1}, music:'battle',
      map:["..t...t.","........",".t..t...","........","......t.","..t.....","........",".....t..","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b6_rebel',2,1],['b6_rebel',5,2],['b6_rebel',5,0],['b6_rebelbow',1,0]], xp:150, after:'b6_c3_strays_after',
      preText:()=>`Three of them in the hollow between two old barrows, with swords out, and a fourth on the slope above with a bow. Leoman's colours, what is left of them, black with smoke.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b6_c3_scorchedmail:{name:'Scorched mail', slot:'armour', role:'mail', who:null, ac:2, hp:4,
      line:'A marine\'s mail shirt, dropped in a street at Y\'Ghatan when the heat made mail a thing you took off or died in. The rings on one shoulder are blued and fused, and the leather under it is gone. It still turns a blade. Whoever wears it does not talk about where it came from.'},
    b6_c3_fanaticknife:{name:'A fanatic\'s long knife', slot:'weapon', role:'blade', who:null, atk:2, dmg:[1,6,3],
      line:'A long, straight, single-edged knife with a grip wrapped in oiled cord, taken off one of Leoman\'s people at the reserve\'s wagons. The cord smells of lamp-oil, and always will. It is very sharp, and very quick in the hand.'} },

  end:{
    in:['The way out', 'The Third sat on the reserve line under Y\'Ghatan while the marines went in at dusk, and fought Leoman\'s people off the reserve\'s wagons before it. Then the city went up from the inside with nearly three thousand of the Fourteenth in it, and the order came down the line to hold the way out open. The Third went in. It held the mouth of the way while the ones still coming came along it. Some of the Third did not come back out.'],
    line:['The gate', 'The Third sat on the reserve line under Y\'Ghatan while the marines went in at dusk, and fought Leoman\'s people off the reserve\'s wagons before it. Then the city went up from the inside with nearly three thousand of the Fourteenth in it, and the order came down the line. The Third held the gate, and pulled the burned out of it, and kept Leoman\'s people off them until the ones who were coming had come.'] },
  endScene:'b6_barrows',
  endCap:()=> b63Key() === 'in' ? 'The barrow field at dusk the next night, the army forming up for the Sotka road, and in the long barrow, the Third\'s own.' : 'The barrow field at dusk the next night, the army forming up for the Sotka road, and the city behind it still smoking.',
  tease:'Next: the Sotka road, with the plague behind it, and the sea at the end.',

  extras:()=>{ const f = S.f, x = [], fell = b63Fell();
    if (f.b6_c3_key === 'in') x.push(`The Third went into the burning streets to hold the way out open.${fell.length ? ` ${b63And(fell.map(NAME))} did not come back. ${fell.length > 1 ? 'They are' : (b63He(fell[0]) === 'she' ? 'She is' : 'He is')} in the long barrow outside the walls.` : ' Everyone came back out.'}`);
    if (f.b6_c3_key === 'line') x.push('The Third held the gate at Y\'Ghatan and pulled the burned out of it.');
    if (f.b6_c3_sallyDone) x.push('Leoman\'s people came up out of an old drain at dusk to fire the reserve\'s wagons. The Third stopped them at the drain mouth.');
    if (f.b6_c3_breathOk) x.push('A sapper of the 9th showed the squad how to breathe in a fire.');
    if (f.b6_c3_strays) x.push('On the night after, strays from the city were found among the far barrows.');
    if (b63K1() === 'bury') x.push('The old barrows were whole again when the new one was raised beside them. The Third had seen to that, the night before the siege.');
    if (b63K1() === 'leave') x.push('The new barrow was raised beside old ones still standing open.');
    return x; },

  journal:()=>{ const f = S.f, fell = b63Fell(); return [
    f.b6_c3_capt3 && 'Orders: the army marches for Sotka tomorrow night. The plague is behind it on the roads, and the army is not waiting to meet it.',
    f.b6_c3_count && 'Seven hundred and ninety-one came out by the way through the fire. Out of nearly three thousand.',
    fell.length && `${b63And(fell.map(NAME))} fell in the streets of Y'Ghatan, holding the way out open, and ${fell.length > 1 ? 'lie' : 'lies'} in the long barrow.`,
    f.b6_c3_key && (f.b6_c3_key === 'in' ? 'When the city burned, the Third went into the streets to hold the way out open.' : 'When the city burned, the Third held the gate and pulled the burned out of it.'),
    f.b6_c3_oil && 'Mehet says Leoman emptied the maethgara, the old oil stores, before he sent the city to Lothal.',
    f.b6_c3_wallSeen && 'At dusk the wall went down, and the marines went in. Then the city burned from the inside.',
    f.b6_c3_sallyDone && 'Leoman\'s people came up an old drain at dusk to fire the reserve\'s wagons.',
    'The 9th holds the reserve at Y\'Ghatan. The marines lead the assault at dusk.'].filter(Boolean); },

  dlg:{
    /* ================= phase 1: the reserve line, the afternoon ================= */
    b6_c3_start:()=>({sp:'Y\'Ghatan · the reserve line', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c3_ph ??= 1; },
      again:()=>`The reserve line, and the walls to the north.`, txt:
`The 9th's line runs across the plain south of the walls, a trench and a bank of spoil and the tents behind, and behind the tents the wagons with the ladders on them. The 9th has not been told yet what the ladders are for. The 9th knows.

Past the forward lip, the walls. Close enough to see the men on them. Too far to see their faces. Along the road between the line and the walls run the barrows, old ones, low and long, the Empire's dead from the last time.

${b63Say({mehet:`Mehet is standing on the spoil with his hand over his eyes, looking at a place on the walls. "The potters' gate," he says. "Our street ran down to it."`, haddat:`Haddat is looking at the walls the way she looks at a horizon with riders on it. "A city waiting," she says. "I have seen this one before. A different city."`, tangle:`Tangle is counting the satchel, which he did an hour ago. "The marines have the good munitions," he says, to nobody. "We have the ladders."`, _:'The squad looks at the walls, and then at the sun, which is going down very slowly.'})}${b63If('marrow', `\n\nMarrow has sat down already, on a water cask, with her hat over her eyes. "Wake me for the end of the world," she says.`)}`,
      ch:[{t:'Find the captain.', go:'b6_c3_capt'},
          {t:'Walk the line.', go:()=>startExplore()}]}),

    /* ---- the captain: the orders ---- */
    b6_c3_capt:()=>({sp:'The captain', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c3_orders = 1; },
      again:()=>`The captain, with the day's orders. "The reserve, Sergeant. Until we're not."`, txt:
`The company's captain is sitting on an upturned crate behind the tents with the orders on his knee, reading them for the third time as if they might have changed.

"The assault goes in at dusk," he says. "The marines first, through the wall where the sappers bring it down. Fist Keneb's people after them, and Tene Baralta's. The 9th is the reserve." He folds the paper. "Fist Blistig commands the reserve. The Fist will tell us when we're wanted. He has told me he does not expect to want us."

He looks along the line toward a knot of horsemen far down it, where a banner hangs. Blistig, somewhere under it. The Third has never been nearer the Fist than that.

"Until dusk, the wagons are ours. Leoman knows what ladders are for." He stands. "Keep your squad near the forward lip, Sergeant. If anything comes out of that city before the marines go in, I would like it to meet someone awake."`,
      ch:[{t:'"And if we are wanted?"', go:'b6_c3_capt2'},
          {t:'"Yes, Captain."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_capt2:()=>({sp:'The captain', scene:'b6_ghatan_walls', txt:
`"Then we will be told by somebody running," the captain says. "That is how the reserve is told things."

He looks at the walls. "There are a great many of them in there, and it is a great many streets. The marines will go in hard. The Fist thinks it will be over by midnight." He considers that. "The Fist has been wrong before. So have I. I would rather be wrong in the reserve."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b6_c3_capt_again:()=>({sp:'The captain', scene:'b6_ghatan_walls', again:()=>`The captain, watching the sun.`, txt: S.f.b6_c3_sallyDone ?
`The captain has watched the drain mouth being filled in by the sappers, and does not look happy about it. "There will be others," he says. "Old cities are like that. All holes." He looks at the sun. "Dusk soon. The marines are forming up."` :
`The captain is watching the sun, which is not going down fast enough for anyone. "The forward lip, Sergeant," he says. "Leoman knows what ladders are for."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the old soldier of the 9th: the last time, the barrows, and news of the other squad ---- */
    b6_c3_old:()=>({sp:'An old soldier of the 9th', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c3_oldMet = 1; },
      again:()=>`The old soldier, polishing his helm. "Y'Ghatan," he says. "Again."`, txt:
`An old soldier of the 9th is sitting in the door of his tent polishing a helm that has been polished so often it has gone thin at the brow. He is the one who reads the Deck behind the cook-lines for a finger of rum. His name is his own business. He has been asked.

"Y'Ghatan," he says. "The Empire took it before. The First Sword fell here, that time. So they say." He breathes on the helm. "The barrows out there are the ones who went in with him. Leoman's lot dug some of them up when they came."${b63K1() === 'bury' ? ` He looks at you. "Your lot put them back, I heard. The night before the siege. I saw the earth turned." He goes back to the helm. "Good."` : b63K1() === 'leave' ? ` He looks at the road. "Still open, some of them. The night got spent on other things." He goes back to the helm.` : ''}

"Third time's the one, in a city," he says. "They say that too."`,
      ch:[{t:'"Any word from anywhere else?"', go:'b6_c3_old2'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_old2:()=>({sp:'An old soldier of the 9th', scene:'b6_ghatan_walls', txt:
`"Word." He turns the helm over. "Onearm's Host is on the north coast, they say, and the plague with it. The officers say the old man's spirit is broken, and the Host won't come south to help us." He shrugs. "Officers say a lot of things in front of the cook-fires.${S.f.b6_c2_key === 'burn' ? ' A courier in from the coast says the Host is firing its plague villages as it goes.' : S.f.b6_c2_key === 'pass' ? ' A courier in from the coast says the Host goes round its plague villages and leaves them be.' : ''}"

He spits, to one side. "Plague behind, Leoman in front, and the sea somewhere after. I've had worse summers. I don't remember them."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* ---- the water wagon: the chapter's one fever risk, as a "yes, but" ---- */
    b6_c3_water:()=>({sp:'The water wagon', scene:'b6_ghatan_walls', again:()=>`The water wagon. The casks are counted.`, txt: S.f.b6_c3_waterTried ?
`The water wagon, with its casks counted and the bad one marked with a smear of ash. The water-carrier is filling canteens from the good ones.` :
`A boy of the 9th, a water-carrier, is up on the wagon with the casks, handing down canteens. There is a queue. There is always a queue.

"Three casks from the cistern at the Odhan crossing," he says, "and two from the wells here." He lowers his voice. "The crossing's where the courier came from. The one who was sick. They burned his tent." He looks at the casks. "They haven't said which is which."${b63If('marrow', `\n\nMarrow has woken up. "Not a drop," she says, "until somebody has looked."`)}${b63If('mirrel', `\n\nMirrel is already climbing up onto the wagon. "One, two, three," she says, to the casks, as if they were patients.`)}`,
      ch:[{t:'Go through the casks before anybody drinks.', check:['wits', 14], req:()=>!S.f.b6_c3_waterTried, fx:()=>{ S.f.b6_c3_waterTried = 1; },
            edges:id=>[(id === 'marrow' || id === 'mirrel') && ['the sick are a healer\'s, and so is the water they drink', 2], id === 'mehet' && ['he knows the wells here, and which are sweet', 2], id === 'haddat' && ['her family sold water in Hissar', 2], id === 'tangle' && ['he counts everything twice', 1]],
            near:{t:()=>{ const w = b63Who(); return `Yes, but by the time ${b63Nm(w)} ${b63V(w, 'find', 'finds')} the cask that smells wrong, ${b63Nm(w)} ${b63V(w, 'have', 'has')} already tasted three of them, and the third was that one.`; }, fx:()=>b6Catch(b63Who(), 'the crossing water')},
            go:'b6_c3_water_ok', fail:'b6_c3_water_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_water_ok:()=>({sp:'The water wagon', scene:'b6_ghatan_walls', txt:
`${by({sgt:'You find', _:'{who} finds'})} it by the smell, faint, sweetish, under the pitch of the cask: one of the three from the crossing. The boy pulls the bung and lets it run out into the dirt, and stands well back from it, and marks the empty cask with a smear of ash so it goes back on nobody's wagon.

"The other two are sweet," ${by({sgt:'you tell', _:'{who} tells'})} him. He fills canteens from them, and the queue moves.${b6Fevered(b63Who()) ? `\n\n${b63Who() === 'sgt' ? 'Your' : b63Pos(b63Who())} stomach does not agree about the third cask. By the time the queue is through, ${b63Who() === 'sgt' ? 'your' : (b63He(b63Who()) === 'she' ? 'her' : 'his')} hands will not stop shaking.` : ''}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b6_c3_water_no:()=>({sp:'The water wagon', scene:'b6_ghatan_walls', txt:
`Five casks, and they all smell of pitch and the wagon and each other. ${by({sgt:'You give', _:'{who} gives'})} up before the queue does. The boy marks all three from the crossing with ash, to be sure, and the 9th drinks from the other two and grumbles about the ration, and does not get sick from it. That is the most anyone can say.`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* ---- the sapper on the forward trench: the trick ---- */
    b6_c3_sapper:()=>({sp:'A sapper on the forward trench', scene:'b6_ghatan_walls', txt:
`A sapper of the 9th is sitting on the edge of the forward trench with his boots in it, soaking a strip of cloth in a canteen and wringing it out, and soaking it again. He has done it enough times that he is not thinking about it.

"For later," he says, when he sees you looking. "The marines' sappers bring the wall down. Then everybody goes in, and everything in there is timber and plaster and lamp-oil, and somebody's munitions go off inside a house." He wrings the cloth. "Fire in a street is fire in a gallery, with the lid off. Same rules."${b63If('tangle', `\n\nTangle sits down beside him without being asked. They nod at each other the way sappers do, as if it had been decided years ago.`)}

He holds up the wet cloth. "Want the rules? They're short."`,
      ch:[{t:'"Show us."', check:['wits', 17], trick:'b6_c3_breath', req:()=>!S.f.b6_c3_breathTried, fx:()=>{ S.f.b6_c3_breathTried = 1; },
            edges:id=>[(id === 'tangle' || id === 'rasp') && ['a sapper knows the gallery rules already, and half of these', 3], id === 'mehet' && ['he has crawled every drain under the city as a boy', 1], (id === 'haddat' || id === 'darrut') && ['a shield fighter stands up in smoke, from habit', -1], id === 'marrow' && ['she would rather be sitting down for this, and she cannot be', -1]],
            near:{t:()=>{ const w = b63Who(); return `Yes, but the sapper makes ${b63Nm(w)} do it for real, face down in the trench with the cloth on and a smoker gone off at the far end of it, and ${b63Nm(w)} ${b63V(w, 'come', 'comes')} out coughing and grey and rattled.`; }, fx:()=>b63Rattle(b63Who())},
            go:'b6_c3_sapper_ok', fail:'b6_c3_sapper_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_sapper_ok:()=>({sp:'A sapper on the forward trench', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c3_breathOk = 1; }, txt:
`"Three rules," the sapper says. "Wet cloth over the mouth and nose. Down on the ground, where the last good air is: smoke goes up first and comes down last. And you go to your mate. Not away from the fire. To your mate. Because your mate is the one who knows where the way out is, and you are the one who knows where your mate is."

${by({sgt:'You do it', _:'{who} does it'})} in the trench, twice, flat on the dirt, crawling to the next soldier along and back, until the sapper grunts.

"That's it," he says. "The rest is not being stupid. I can't teach you that." He gives ${by({sgt:'you', _:'{who}'})} the second wet cloth. "Keep it wet."`,
      ch:[{t:'"Thank you." Back along the trench.', go:()=>startExplore()}]}),
    b6_c3_sapper_no:()=>({sp:'A sapper on the forward trench', scene:'b6_ghatan_walls', txt:
`${by({sgt:'You get', _:'{who} gets'})} the cloth on, and get down, and get up again too soon, and go away from the soldier at the end of the trench, not to him. The sapper watches the whole of it.

"Again tomorrow," he says, and then, because he is a sapper, and counts things: "If."`,
      ch:[{t:'Back along the trench.', go:()=>startExplore()}]}),
    b6_c3_sapper_again:()=>({sp:'A sapper on the forward trench', scene:'b6_ghatan_walls', again:()=>`The sapper, with his cloths. "Keep it wet."`, txt:
`The sapper is still wringing out cloths, a pile of them now, for the marines' squads, who have not asked for them and will be glad of them. "Keep it wet," he says, without looking up.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- a Khundryl rider: the horsemen watching for breakouts ---- */
    b6_c3_rider:()=>({sp:'A Khundryl rider', scene:'b6_ghatan_walls', fx:()=>{ S.f.b6_c3_rider = 1; },
      again:()=>`The Khundryl rider, at the horse lines. "Anything that comes out."`, txt:
`A Khundryl rider of the Burned Tears is at the 9th's horse lines, watering a horse that does not belong to the 9th. The black tears down her cheeks are inked, and old. She has a lance across her back and a look of someone who has been told to wait, and is waiting badly.

"We ride the plain tonight," she says. "Us and the Wickans. Anything that comes out of the city that is not yours, we have." She looks at the walls. "My chief says Leoman will come out. Leoman always comes out. He is not the kind to die in a house."${b63If('orvas', `\n\nShe sees Orvas, and says something in the Khundryl tongue, and he answers, and they both look at the walls. "She says there will be good riding," Orvas tells you. "She says it as if she does not believe it."`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the forward lip: the walls, and the drain ---- */
    b6_c3_spoil:()=>{ const ph = b63Ph();
      return {sp:'The forward lip', scene:'b6_ghatan_walls', again:()=>`The forward lip, and the walls.`, txt: ph >= 2 && S.f.b6_c3_order ?
`From the forward lip the city is a wall of light. The gate is north and east, where the carts are going. The breach is north, where the marines went in.` : S.f.b6_c3_sallyDone ?
`From the spoil you can see the drain mouth at the foot of the walls, where the sappers are filling it in with rubble by the basketful. On the walls, men are watching them do it. Neither side throws anything. The sun is very low.` :
`From the top of the spoil the walls are close enough to count the merlons. The barrows lie along the road between, and the sappers' trench runs out toward the wall at a slant, roofed with hides, to the place where the marines' sappers have been digging since dawn.

${b63Say({mehet:`Mehet is beside you. "That," he says, pointing at a low black place at the foot of the wall, west of the sappers' trench, "is the old storm drain under the potters' gate. My father bricked it up when I was a boy, for the council." He frowns. "It is not bricked now."`, tangle:`Tangle is looking at a low black place at the foot of the wall, west of the sappers' trench. "That's a drain," he says. "It's had its bricks out." He starts counting the satchel again.`, _:`At the foot of the wall, west of the sappers' trench, there is a low black place in the ground that might be a drain. Something moves in it.`})}${!S.f.b6_c3_orders ? '\n\nThe captain will want to know. So will the wagons.' : ''}`,
        ch:[{t:'"Shields. Something is coming out of that drain."', req:()=>ph === 1 && !!S.f.b6_c3_orders && !S.f.b6_c3_sallyDone, onward:true, go:'b6_c3_sally_start'},
            {t:'Dusk. The assault.', req:()=>ph === 1 && !!S.f.b6_c3_sallyDone, onward:true, fx:()=>{ S.f.b6_c3_ph = 2; }, go:'b6_c3_wall'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b6_c3_sally_start:()=>({sp:'The forward lip · late afternoon', scene:'b6_ghatan_walls', txt:
`They come up out of the drain in a line, quick and low, in desert robes, and go flat in the scrub between the barrows, and then they are up again and running, not at the trench, at the wagons. Ten, a dozen. Two of them carry clay jars against their chests, and one has a torch he has not lit yet.

The pickets shout. The 9th is putting down its cards and its bowls. The wagons are nearer the squad than anyone.${b63If('mehet', `\n\nMehet has his sling out already. "Lamp-oil," he says, looking at the jars. "They are going to burn the ladders."`)}`,
      ch:[{t:'"Third. On the wagons."', onward:true, go:()=>startBattle('b6_c3_sally', {})},
          {t:'Go down the back of the spoil and come at them from among the wagons, unseen.', check:['guile', 15], onward:true,
            edges:id=>[id === 'mehet' && ['he grew up playing in that scrub', 2], (id === 'sathi' || id === 'tebbet') && ['being where the blow is not is the whole of the work', 1], id === 'tallow' && ['a fishing boy keeps low on a deck', 1], (id === 'haddat' || id === 'darrut' || id === 'hessa') && ['a big shield is a hard thing to hide behind a wheel', -2]],
            near:{t:()=>{ const w = b63Who(); return `Yes, but ${b63Nm(w)} ${b63V(w, 'go', 'goes')} the last of the way on knees and elbows over the spoil-stones: bruised before the first blow.`; }, fx:()=>bruise(b63Who(), bruiseN())},
            go:()=>startBattle('b6_c3_sally', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c3_sally_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_sally_seen:()=>({sp:'The wagons', scene:'b6_ghatan_walls', txt:
`A spoil-stone goes out from under a boot and down the back of the bank, rattling, and every robed head among the wagons turns at once. The torch is lit before anyone can reach it.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c3_sally', {surprise:'e'})}]}),
    b6_c3_sally_after:()=>({sp:'The drain mouth', scene:'b6_ghatan_walls', fx:()=>{ if (!S.f.b6_c3_sallyDone) { S.f.b6_c3_sallyDone = 1; gain('b6_c3_fanaticknife'); if (b6In('mehet')) S.f.b6_c3_oil = 1; } }, txt:
`Their captain goes down at the drain mouth, and the last of his people go down the drain past him, and do not come back up it. The sappers come across from the trench with baskets of rubble and start filling it in, and the men on the walls above watch them do it and throw nothing.

The ladders are whole. One of the clay jars broke among the wagons, and the oil in it ran out into the dirt and soaked in, and the 9th throws sand on it, a lot of sand, more than it needs.

${b63Say({mehet:`Mehet crouches over the broken jar with his face very still. "Olive oil," he says. "Not lamp-oil. Olive oil, the old kind, from the maethgara." He looks at the walls. "Leoman emptied the maethgara before he sent us out. Every jar. I thought it was for the walls, to pour on the ladders." He stands up. "It is a great deal of oil, for ladders."`, tangle:`Tangle crouches over the broken jar and sniffs it, and sits back on his heels. "Oil," he says. "Not lamp-oil. Cooking oil." He looks at the walls for a while. "That's a lot of cooking."`, _:'The oil is olive oil, the good kind, in a jar with a city seal on it. At the time, it seems a small thing.'})}

One of them left a long knife in the dirt by the wagons, with oiled cord on the grip. The squad keeps it.`,
      ch:[{t:'Dusk. The assault.', onward:true, fx:()=>{ S.f.b6_c3_ph = 2; }, go:'b6_c3_wall'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the 9th's fire (phases 1-2) and the barrow-side fire (phase 3): a rest, the fever, the squad, the Deck, the way on ---- */
    b6_c3_fire:()=>{ const ph = b63Ph(), k = b63Key();
      return {sp:ph >= 3 ? 'The barrow-side fire' : 'The 9th\'s fire', scene:ph >= 3 ? 'b6_barrows' : 'b6_ghatan_walls', html:feverHTML(),
        again:()=> ph >= 3 ? 'The barrow-side fire, low, and the city smoking past it.' : ph === 2 ? 'The 9th\'s fire, with no one at it.' : 'The 9th\'s fire, and the sun going down.', txt:
`${ph >= 3 ? `A fire among the barrows, small, built out of a broken cart, with the squad round it and nobody saying much. Past the long barrow the city is still smoking. Now and then, inside it, something falls in, and the sound comes out across the plain a long time after.` : ph === 2 ? `The 9th's fire is burning on by itself. The squads that sat at it are all on their feet along the forward lip, looking north. The light on their faces is not from this fire.` : `The 9th's fire, behind the tents: a pot on it that has been a pot of something since noon, and a ring of soldiers who are not hungry and are eating anyway.`}${b63If('mehet', () => ph >= 3 ? `\n\nMehet sits with his back to the city.` : ph === 1 ? `\n\nMehet sits where he can see the walls.` : '')}`,
        ch:[ph >= 3 ? b6DeckChoice(3) : null,
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f['b6_c3_rest' + ph] && ph !== 2, fx:()=>{ S.f['b6_c3_rest' + ph] = 1; rest(ph >= 3 ? 'The Third sits an hour by the barrow-side fire. Wounds close, mostly.' : 'The Third sits an hour by the 9th\'s fire. Wounds close, mostly.'); }, go:'b6_c3_fire_rest'},
            {t:'The fever.', tag:'fever', req:()=>b6FeverList().length > 0, go:'b6_c3_fever'},
            {t:'Talk with the squad.', go:'b6_c3_fire_talk'},
            {t:'Dusk. The assault.', req:()=>ph === 1 && !!S.f.b6_c3_sallyDone, onward:true, fx:()=>{ S.f.b6_c3_ph = 2; }, go:'b6_c3_wall'},
            {t:'North, to the gate.', req:()=>ph === 2 && !!S.f.b6_c3_order, onward:true, go:()=>{ startExplore('b6_c3_breach'); talk('b6_c3_breach_arrive'); }},
            {t:'The captain. The army has orders.', req:()=>ph >= 3 && !S.f.b6_c3_capt3, go:'b6_c3_capt3'},
            {t:'Not now.', go:()=>startExplore()}].filter(Boolean)}; },
    b6_c3_fire_rest:()=>({sp:'The fire', scene:b63Ph() >= 3 ? 'b6_barrows' : 'b6_ghatan_walls', txt: b63Ph() >= 3 ?
`An hour by the fire among the barrows, while the city smokes.

${b63Say({marrow:'Marrow goes round the squad with her salve and her knotted string, and ties no knots tonight, and sits down again before anyone asks her to.', mirrel:'Mirrel goes round the squad, one, two, three, and up, and then sits with her hands in her lap, counting nothing.', _:'Some of them sleep. The others watch the city.'})}${b63If('haddat', `\n\nHaddat says her prayers to no god she will name, very quietly, facing the city.`)}` :
`An hour by the 9th's fire, with the sun going down.

${b63Say({marrow:'Marrow sleeps sitting up on the water cask with her hat over her face, and wakes exactly when the hour is gone.', tangle:'Tangle lays the satchel out on a blanket and counts it, and wraps it, and lays it out again.', _:'The squad eats, because it is there.'})}${b63If('mehet', `\n\nMehet turns a ring of keys over and over in his hands. None of them open anything any more.`)}`,
      ch:[{t:'Back to the fire.', go:'b6_c3_fire'}]}),
    b6_c3_fever:()=>{ const f = b6FeverList(), h = b63Healer();
      return {sp:'The fever', scene:b63Ph() >= 3 ? 'b6_barrows' : 'b6_ghatan_walls', html:feverHTML(), again:()=>`The fever.`, txt: !f.length ?
`The squad is clear of it now.` : b6CanCure() ?
`${f.map(id => id === 'sgt' ? 'You are' : NAME(id) + ' is').join('; ')} sweating, and cold, and cannot keep water down. ${h ? `${NAME(h)} looks, and does not like what ${b63He(h)} sees, and reaches for the warren anyway. "It's in there too," ${b63He(h)} says. "The sickness. In Denul. Like ink in a well. I can still get my hands under it."` : 'There is somebody here who can treat it.'}` :
`${f.map(id => id === 'sgt' ? 'You are' : NAME(id) + ' is').join('; ')} sweating, and cold, and cannot keep water down. There is nobody in the squad who can break it. The 9th's surgeon has his hands full tonight.`,
        ch:[...f.map(id => ({t:`${h ? NAME(h) : 'Someone'} sees to ${id === 'sgt' ? 'you' : NAME(id)}.`, req:()=>b6CanCure() && b6Fevered(id), fx:()=>{ b6Cure(id, h ? `${NAME(h)}, with Denul, at the fire` : 'at the fire'); if (h && h !== id) b63Rattle(h); }, go:'b6_c3_fever_done'})),
            {t:'Back to the fire.', go:'b6_c3_fire'}]}; },
    b6_c3_fever_done:()=>({sp:'The fever', scene:b63Ph() >= 3 ? 'b6_barrows' : 'b6_ghatan_walls', html:feverHTML(), txt:
`It breaks as fevers do: all at once, in a sweat, and then sleep. ${b63Healer() ? `${NAME(b63Healer())} sits back afterwards with a grey face and wipes ${b63He(b63Healer()) === 'she' ? 'her' : 'his'} hands on a clean cloth, finger by finger. "The warren has a taste tonight," ${b63He(b63Healer())} says. "I'll be a while getting it out of my mouth."` : ''}`,
      ch:[{t:'Back to the fire.', go:'b6_c3_fire'}]}),
    b6_c3_fire_talk:()=>{ const ph = b63Ph(), k = b63Key(), fell = b63Fell(), ln = [];
      if (b6In('haddat')) ln.push(ph >= 3 ? `Haddat is looking at the city. "I looked at every face that came out of that gate," she says. "Ours and theirs." She does not say whose face she was looking for. "None of them was anyone."` : `Haddat is checking the straps on her shield, one by one. "A city full of my own people," she says, "and I am going to help burn it down." She tightens the last strap. "Or not burn it. Take it. I don't know the word for what we are going to do."`);
      if (b6In('tangle')) ln.push(ph >= 3 ? `Tangle has the satchel on his knees and is not counting it. "Oil in the walls," he says. "Oil in the houses. They didn't need munitions. They had a whole city of it." He puts the satchel down. "I'll never get the smell out of the fuse-cord."` : `Tangle is humming his four notes over the satchel. He stops. "The marines' sappers are bringing the wall down with cussers," he says. "Four, I heard. Under the one place." He starts humming again. "Lovely work, if it's true."`);
      if (b6In('marrow')) ln.push(ph >= 3 ? `Marrow sits by the fire with her knotted string in her lap. "The warren was full of them," she says. "All night. Like a well with too many buckets in it." She ties one knot, and stops. "I can't count the rest. There's no string long enough."` : `Marrow is awake, which is unusual. "Something is wrong with the warren tonight," she says. "Not with me." She looks at the city. "Thick. Like before a storm, except there's no storm."`);
      if (b6In('mirrel')) ln.push(ph >= 3 ? `Mirrel is washing her hands in a bucket, and keeps on after they are clean. "In Li Heng we had a fire once," she says. "Two streets. We called it the great fire for ten years." She shakes the water off. "I'm going to stop calling it that."` : `Mirrel has laid her linen out in rolls on a blanket, in threes. "For later," she says. "Whatever later is." She counts the rolls again.`);
      if (b6In('mehet')) ln.push(ph >= 3 ? `Mehet is turning his ring of keys over, one by one. "The potters' street," he says. "The tanners'. The cistern by the gate. The house." He holds up a key. "Doors that aren't there. I had a ring of them before. Now it's all of them."` : `Mehet is looking at the walls. "Everybody I know is in Lothal," he says. "Leoman sent them, with their pots and their goods. I stayed." He turns a key over. "Somebody had to know where the cisterns are." Why that had to be him, he keeps to himself.`);
      if (b6In('sathi')) ln.push(ph >= 3 ? `Sathi is not laughing, which for Sathi is a kind of shouting. "The Weasels laugh at funerals," she says. "Not this one."` : `Sathi is restringing her bow. "The Wickans ride the plain tonight," she says. "Without me." She bites through the string. "I said nothing. I am being Malazan about it."`);
      if (b6In('tallow')) ln.push(`Tallow has his grandmother's deck in its oilcloth, in both hands. ${ph >= 3 ? 'He has not opened it.' : '"I counted the barrows on the road," he says. "I said I would stop counting things." He has not stopped.'}`);
      if (b6In('hessa')) ln.push(ph >= 3 ? `Hessa has her palm flat on the ground. "Everything rots," she says. "Not everything burns first." That is all.` : `Hessa is sharpening the spear by feel, with her eyes on the walls. "Old cities have old floors," she says. "The Worm is under all of them."`);
      if (b6In('tebbet')) ln.push(ph >= 3 ? `Tebbet has his bow across his knees. "I dreamed of fire last month," he says. "I thought it was the sun." He looks at the city. "It wasn't the sun."` : `Tebbet is sighting along the walls, counting the men on them. "From back here," he says, "it looks almost easy." He lowers the bow. "That's the trouble with back here."`);
      if (b6In('darrut')) ln.push(`Darrut has a story ready, about the Aren Guard and a camel, and does not tell it.`);
      if (b6In('yorin')) ln.push(ph >= 3 ? `Yorin is looking up. "The sky's full of it," he says. "The smoke. It'll be over the sea in three days." He lowers his eyes. "I wish I didn't know that."` : `Yorin is looking at the sky over the city. "Clear," he says. "That's the trouble with it."`);
      if (b6In('rasp')) ln.push(`Rasp weighs the satchel in one hand. ${ph >= 3 ? '"They didn\'t need any of this," she says. "That\'s what I can\'t get past."' : '"Marines get the good fuse," she says. "Tonight they can have it."'}`);
      if (b6In('redblade')) ln.push(`Ramin cleans his blade, slowly. ${ph >= 3 ? 'The Red Blades\' commander came out of the city burned, the camp says. Ramin goes on cleaning the blade.' : '"The Red Blades go in with Baralta," he says. "I go in with you." He does not say which he would rather.'}`);
      if (b6In('warlock')) ln.push(`Keth has ochre across his eyes. ${ph >= 3 ? '"*So many,*" the grandmother\'s voice says, very low. "*All at once. The spirits could not carry them all.*"' : '"*That city is holding its breath,*" the grandmother\'s voice says. "*Cities do not do that.*"'}`);
      if (b6In('orvas')) ln.push(`Orvas watches the plain where his people ride. ${ph >= 3 ? '"Nothing came out past us," he says. "Nothing. All night."' : '"They will ride all night," he says, "for something that may not come."'}`);
      if (ph >= 3 && fell.length) ln.push(`The squad leaves ${fell.length > 1 ? 'the places' : 'the place'} by the fire empty where ${b63And(fell.map(NAME))} would have sat.`);
      return {sp:'The fire', scene:ph >= 3 ? 'b6_barrows' : 'b6_ghatan_walls', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b6_c3_fire'}]}; },
    b6_c3_deck:()=>b6DeckOffer(3),
    b6_c3_card:()=>b6DeckCard(3),

    /* ================= phase 2: dusk. The wall, the fire, the order ================= */
    b6_c3_wall:()=>({sp:'The forward lip · dusk', scene:'b6_ghatan_walls', txt:
`Dusk. The marines are formed up behind the sappers' trench, in their squads, lighter-armoured than the line, with their crossbows. The heavies are close behind them. Behind the heavies, Keneb's people and Baralta's, in their ranks, waiting to be told.

The 9th stands along its forward lip and watches, because that is what the reserve does.

Then the wall goes down.

There is a flash at its foot first, white, and then the sound comes, and the ground jumps under the squad's boots, and a section of the wall the width of a house leans out and slides down into its own dust. Before the dust has settled the marines are running into it.${b63If('tangle', `\n\nTangle lets out a breath. "Four," he says. "Four cussers, under the one place. Lovely."`)}`,
      ch:[{t:'Watch.', fx:()=>{ S.f.b6_c3_wallSeen = 1; }, go:'b6_c3_wall2'}]}),
    b6_c3_wall2:()=>({sp:'The forward lip · dusk', scene:'b6_ghatan_walls', txt:
`The marines go into the breach and the city takes them. For a while there is the sound of fighting from inside, crossbows and shouting, and then the heavies go in, and then Keneb's people and Baralta's, rank after rank, into the gap in the wall and out of sight.

The 9th stands on its lip. Down the line, under the banner, the horsemen sit their horses. Fist Blistig among them, somewhere. None of them moves.

It is very nearly dark. The fighting inside sounds further off, and then nearer, and then further.${b63Say({mehet:`\n\nMehet says, very quietly, "The streets past the potters' gate are narrow. Very narrow. The houses lean together over them."`, haddat:`\n\nHaddat says, "Too quiet. They let them in too easily."`, _:''})}`,
      ch:[{t:'Wait.', go:'b6_c3_light'}]}),
    b6_c3_light:()=>({sp:'Y\'Ghatan · night', scene:'b6_ghatan_fire', txt:
`The first fire is a glow, somewhere inside, behind the walls, that could be a house. The second is another. Then they are everywhere at once, from one end of the city to the other: not houses catching one after another but all of them, as if the city had been waiting for it.

The light comes up over the walls and lights the whole plain orange, the barrows and the trench and the 9th on its lip, every face.

Then the sound. Not fighting. Fire, the noise of a whole city burning, and in it, very faint, voices.

Nearly three thousand of the Fourteenth went in through the breach. A third of the army. They are in there.${b6In('mehet') ? `\n\nMehet has gone the colour of the spoil. "The oil," he says. "The maethgara. It was never for the ladders."` : ''}${b63If('marrow', `\n\nMarrow is on her feet. "Gods below," she says. "All of them. All at once."`)}`,
      ch:[{t:'Find the captain.', fx:()=>{ if (b6In('mehet')) S.f.b6_c3_oil = 1; }, go:'b6_c3_order'}]}),
    b6_c3_order:()=>({sp:'The captain', scene:'b6_ghatan_fire', fx:()=>{ S.f.b6_c3_wallSeen = 1; },
      again:()=>`The captain, with the order. "The gate, Sergeant. Then we see."`, txt:
`A runner comes down the line from the banner, and then another, and the captain listens to the second one with his face lit orange, and then turns round.

"There is a way out," he says. "A way has been made, through the fire. Don't ask me how. The camp says a girl did it, the strange one who came in off the Raraku sea. It's open, and people are coming out along it." He takes a breath. "The reserve is to keep it open. Some squads go in, to the mouth of it, and hold it against Leoman's people, who are trying to close it. The rest hold the gate and pull out whoever comes."

He looks at you. "I am not ordering the Third in. I'm telling you what the order is. Get your squad to the gate, Sergeant, and choose there."`,
      ch:[{t:'North, to the gate.', onward:true, fx:()=>{ S.f.b6_c3_order = 1; S.f.b6_c3_ph = 2; }, go:()=>{ startExplore('b6_c3_breach'); talk('b6_c3_breach_arrive'); }},
          {t:'Not now.', fx:()=>{ S.f.b6_c3_order = 1; S.f.b6_c3_ph = 2; }, go:()=>startExplore()}]}),
    b6_c3_to_breach:()=>({sp:'The forward trench', scene:S.f.b6_c3_order ? 'b6_ghatan_fire' : 'b6_ghatan_walls', txt: S.f.b6_c3_order ?
`North across the open ground, past the barrows, toward the walls and the light. The gate is north and east of the breach.` :
`The forward trench is the marines' tonight. The sappers at the end of it wave the squad back without looking round.`,
      ch:[{t:'North, to the gate.', req:()=>!!S.f.b6_c3_order, onward:true, go:()=>{ startExplore('b6_c3_breach'); talk('b6_c3_breach_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- under the walls ---- */
    b6_c3_breach_arrive:()=>({sp:'Under the walls', scene:'b6_ghatan_fire', txt:
`Under the walls the heat is a thing you lean against. The breach is north, a ragged gap full of light. The gate is east, open, and through it, out of the light, people are coming: soldiers, carried and walking, in what is left of their kit. Some of them have no kit at all. They took their armour off in the streets, the ones carrying them say, because mail in that heat is an oven.

The 9th's surgeon has set up awnings by the road with carts under them. The carts are filling.

${b63Say({haddat:'Haddat stands where she can see the gate, and looks at every face that comes out of it.', marrow:'Marrow is already walking toward the carts with her bag.', mirrel:'Mirrel is already walking toward the carts with her bag, counting under her breath.', _:'The squad stands and looks at it.'})}`,
      ch:[{t:'The captain.', go:'b6_c3_key'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_to_line:()=>({sp:'Under the walls', scene:'b6_ghatan_fire', txt:
`The reserve line is back south across the open ground, past the barrows. The 9th's fire is still burning there by itself.`,
      ch:[{t:'Back to the line.', go:()=>startExplore('b6_c3_line')},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_surgeon:()=>({sp:'The 9th\'s surgeon', scene:'b6_ghatan_fire', fx:()=>{ S.f.b6_c3_surgeon = 1; },
      again:()=>`The surgeon, at the carts. "Water. Linen. Hands."`, txt:
`The 9th's surgeon is a big, tired man with his sleeves rolled to the shoulder, moving from cart to cart under the awnings without stopping. He has two orderlies and a boy with a bucket, and more burned than that.

"Water," he says, when he sees the squad. "Linen. Hands, if you have them." He looks at the gate. "They're coming out by the hundred and not by the thousand. I don't know what that means. I know what I think it means."${b63Healer() ? `\n\nHe sees ${NAME(b63Healer())}'s bag. "Denul?" ${NAME(b63Healer())} nods. "Then you know already," he says. "The warren's sick tonight. Use it anyway."` : ''}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_burned:()=>({sp:'The carts', scene:'b6_ghatan_fire', again:()=>`The carts under the awnings.`, txt: S.f.b6_c3_burnedTried ?
`The carts under the awnings are full. The squad has done what it could here. The surgeon is doing the rest.` :
`Under the awnings the carts are full of the burned. The Third has seen burns before. Not like these, and not this many. The soldiers carrying them in say only that it was hot, and that the walls were full of oil, and that the girl's way through the fire was the only way.

A young soldier of Keneb's sits against a wheel with his hands held out in front of him, not touching anything, waiting for someone.${b63Healer() ? `\n\n${NAME(b63Healer())} is already kneeling.` : ''}`,
      ch:[{t:'Help with the burned.', check:['wits', 14], req:()=>!S.f.b6_c3_burnedTried, fx:()=>{ S.f.b6_c3_burnedTried = 1; },
            edges:id=>[(id === 'marrow' || id === 'mirrel') && ['this is the work, the whole of it', 3], id === 'hessa' && ['the temple taught her to sit with the dying and not look away', 1], id === 'tangle' && ['he knows burns from munitions, some', 1], id === 'sathi' && ['she is seventeen', -1]],
            near:{t:()=>{ const w = b63Who(); return `Yes, but the squad's own salves go on the burned, all of them but one, and ${b63Nm(w)} ${b63V(w, 'do', 'does')} not ask before using them.`; }, fx:()=>{ if ((S.inv.salve || 0) > 1) S.inv.salve = 1; else b63Rattle(b63Who()); }},
            go:'b6_c3_burned_ok', fail:'b6_c3_burned_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_burned_ok:()=>({sp:'The carts', scene:'b6_ghatan_fire', fx:()=>{ S.f.b6_c3_burnedOk = 1; b63L('marrow', 1); b63L('mirrel', 1); }, txt:
`Water first, cool, poured slow. Clean linen, loose, never tight. Hands held still so that nobody touches anything that should not be touched. ${by({sgt:'You work', _:'{who} works'})} down a cart and then the next, and the young soldier of Keneb's is one of them, and at the end of it he says thank you, which surprises everyone, him most.

${b63Healer() ? `${NAME(b63Healer())} works beside ${by({sgt:'you', _:'{who}'})} with the warren open, and comes out of it grey to the lips. "It's in there," ${b63He(b63Healer())} says. "The sickness. Under everything. I can heal past it. Tonight I can."` : 'The surgeon comes along the cart behind, and nods, once, and moves on.'}`,
      ch:[{t:'Back under the walls.', go:()=>startExplore()}]}),
    b6_c3_burned_no:()=>({sp:'The carts', scene:'b6_ghatan_fire', txt:
`There are too many of them, and the linen runs out, and the water, and ${by({sgt:'your', _:'{who}\'s'})} hands do not know the work. The surgeon's orderly takes over from ${by({sgt:'you', _:'{who}'})} without saying anything. It is not unkind. There is no time for it to be anything.`,
      ch:[{t:'Back under the walls.', go:()=>startExplore()}]}),
    b6_c3_well:()=>({sp:'The old well', scene:'b6_ghatan_fire', fx:()=>{ S.f.b6_c3_well = 1; }, again:()=>`The old well outside the walls.`, txt:
`An old well outside the walls, with a stone lip and a rope, where the carters watered their mules before the siege. The surgeon's boy is drawing from it, bucket after bucket, for the carts.${b6In('mehet') ? `

Mehet takes the rope from the boy without a word and draws for him, steadily, hand over hand. "This one is sweet," he says. "It comes from under the hill, not the city. It will not have oil in it." He hauls the bucket up. "My mother sent me here for water, when the city wells were low. Every summer." He pours it into the boy's bucket, and lets the rope back down.` : `

The water is sweet. Whatever is in the city wells tonight, this one comes from somewhere else.`}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_breach:()=>{ const k = b63Key();
      return {sp:'The breach', scene:'b6_ghatan_fire', again:()=>`The breach, full of light.`, txt: k === 'in' && !S.f.b6_c3_streetsDone ?
`The breach is a slope of broken wall, and at the top of it the city, and the city is on fire. Through the gap a street runs north, and somewhere at its end the way the soldiers talk about. Hot air comes out of the breach as if something very large were breathing out of it.

This is where the Third goes in.${S.f.b6_c3_breathOk ? ' The sapper\'s cloths are wet.' : ''}` : S.f.b6_c3_streetsDone ?
`The breach, still full of light. The Third has been in. It does not want to look at it now.` :
`The breach is a slope of broken wall with the city burning past it. Squads of the reserve are going up it into the light, wet cloths over their faces. The Third's place is the gate.`,
        ch:[{t:'Into the streets.', req:()=>k === 'in' && !S.f.b6_c3_streetsDone, onward:true, go:'b6_c3_streets_start'},
            {t:'Not now.', go:()=>startExplore()}]}; },

    b6_c3_gatedoor:()=>{ const k = b63Key();
      return {sp:'The gate', scene:'b6_ghatan_fire', again:()=>`The gate, open, with the light behind it.`, txt: k === 'line' && !S.f.b6_c3_gateDone ?
`The gate stands open with the light behind it, and the burned coming out of it. Along the foot of the wall, in the smoke, something is moving that is not the Fourteenth.

This is the Third's place.` : S.f.b6_c3_gateDone ?
`The gate stands open with the light behind it, and nobody coming out of it now.` :
`The gate stands open with the light behind it, and the burned coming out of it, and squads of the reserve standing to either side of it with their shields up.${k === 'in' ? ' The Third\'s place is the breach.' : ''}`,
        ch:[{t:'Hold the gate.', req:()=>k === 'line' && !S.f.b6_c3_gateDone, onward:true, go:'b6_c3_gate_start'},
            {t:'Not now.', go:()=>startExplore()}]}; },

    /* ---- the key: the captain under the walls ---- */
    b6_c3_key:()=>({sp:'The captain', scene:'b6_ghatan_fire', again:()=>`The captain, under the walls. The breach north, the gate east.`, txt: b63Key() ?
`It is decided. ${b63Key() === 'in' ? 'The Third goes in, through the breach, to the mouth of the way.' : 'The Third holds the gate.'}` :
`The captain is standing between the breach and the gate with his sword out, though there is nothing near to use it on. Squads of the reserve are coming up past him in the orange light, and he is sending them on, one to the breach and the next to the gate, with a word each.

"Third," he says. "Breach or gate."

Through the breach, the street, and the fire, and at the end of it the way out, with Leoman's people trying to shut it. Whoever goes in there will be inside a burning city. Through the gate, the burned, coming out, and the ones who come out with them along the wall, and somebody has to stand between.

${b63Say({mehet:'Mehet is looking at the breach. "I know those streets," he says. "Every one. I can find the way." He swallows. "I do not want to. I can."', haddat:'Haddat has her shield on her arm. "Wherever you say, Sergeant," she says, in Hissari. It sounds like an oath.', _:'The squad waits for you.'})}${b63If('marrow', `\n\nMarrow says, "The gate. They'll need hands at the gate." She does not say she is afraid of the other. She is a healer. She is saying what she knows.`)}${b63If('tangle', `\n\nTangle's satchel is on his back. "In there," he says, "you can't throw anything. Everything's already burning." He does not say which he wants.`)}`,
      ch:[{t:'"The breach. We go in and hold the way open." (a mortal fight: whoever falls here stays down)', tag:'mortal', req:()=>!b63Key(), fx:()=>{ S.f.b6_c3_key = 'in'; b63L('mehet', 1); b63L('haddat', 1); b63L('marrow', -1); }, go:'b6_c3_in'},
          {t:'"The gate. We hold it, and we pull them out."', req:()=>!b63Key(), fx:()=>{ S.f.b6_c3_key = 'line'; b63L('marrow', 1); b63L('mirrel', 1); b63L('mehet', -1); }, go:'b6_c3_line'},
          {t:'"Not yet."', req:()=>!b63Key(), go:()=>startExplore()},
          {t:'Into the streets.', req:()=>b63Key() === 'in' && !S.f.b6_c3_streetsDone, onward:true, go:'b6_c3_streets_start'},
          {t:'The gate.', req:()=>b63Key() === 'line' && !S.f.b6_c3_gateDone, onward:true, go:'b6_c3_gate_start'},
          {t:'Not now.', req:()=>!!b63Key(), go:()=>startExplore()}]}),
    b6_c3_in:()=>({sp:'The captain', scene:'b6_ghatan_fire', txt:
`The captain looks at you for a moment longer than he looks at the others. Then he nods. "The breach," he says. "Hold the mouth of it. When the ones inside are out, or when you can't, come back." He does not say which he expects.

${b63Say({mehet:'Mehet is already tying a wet cloth over his face. "Follow me," he says. "I know where the street goes."', haddat:'Haddat goes first, because she always goes first.', _:'The squad ties wet cloths over its faces.'})}${b63If('marrow', `\n\nMarrow ties her cloth on without a word, and checks her bag, and checks it again.`)}`,
      ch:[{t:'Into the streets.', onward:true, go:'b6_c3_streets_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_line:()=>({sp:'The captain', scene:'b6_ghatan_fire', txt:
`"The gate," the captain says, and nods, and sends the next squad to the breach.

At the gate the burned are coming out, and along the foot of the wall, out of the smoke, there are shapes coming too that are not the Fourteenth's.${b63If('mehet', `\n\nMehet looks at the breach once, a long look, and then turns his back on it.`)}`,
      ch:[{t:'The gate.', onward:true, go:'b6_c3_gate_start'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- 'in': the burning streets (the mortal fight) ---- */
    b6_c3_streets_start:()=>({sp:'The streets', scene:'b6_ghatan_fire', txt:
`Up over the rubble of the breach, and into it.

The street is the width of a cart, and the houses lean in over it, and every house is burning or about to. The air is something you drink through the cloth in sips. Ahead, through the smoke, shapes going from door to door with torches, and others with swords to see they are let. At the end of the street, somewhere, the way.

This is the place the reserve was sent to hold.${S.f.b6_c3_breathOk ? ' The sapper\'s rules are three. You remember all three.' : ''}`,
      ch:[{t:'"Third. Forward." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:()=>startBattle('b6_c3_streets', {})},
          {t:'Down under the smoke, cloths wet, and come at them out of it.', check:['guile', 15], onward:true,
            edges:id=>[(id === 'tangle' || id === 'rasp') && ['the sapper\'s rules are a sapper\'s', 2], id === 'mehet' && ['these are his streets', 3], (id === 'haddat' || id === 'darrut' || id === 'hessa') && ['a big shield in a small street is noticed', -1], ...(S.f.b6_c3_breathOk ? [['the sapper showed the squad how', 1]] : [])],
            near:{t:()=>{ const w = b63Who(); return `Yes, but the smoke comes down lower than anyone thought it could, and ${b63Nm(w)} ${b63V(w, 'come', 'comes')} up out of it coughing, half-blind and rattled.`; }, fx:()=>b63Rattle(b63Who())},
            go:()=>startBattle('b6_c3_streets', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c3_streets_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_streets_seen:()=>({sp:'The streets', scene:'b6_ghatan_fire', txt:
`A roof comes down to the left in a long rush of sparks, and in its light every one of them turns and sees the squad, crouched in the middle of the street with nothing to hide behind.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c3_streets', {surprise:'e'})}]}),
    b6_c3_streets_after:()=>{ const fell = (S.f.lastFallen || []).filter(id => TPL[id]);
      return {sp:'The mouth of the way', scene:'b6_ghatan_fire', fx:()=>{ if (!S.f.b6_c3_streetsDone) { S.f.b6_c3_streetsDone = 1; gain('b6_c3_scorchedmail'); } }, txt:
`Their captain goes down in the mouth of the way, and his people break, back into the burning, and the burning has them.

The way stays open. Along it, out of the fire, the last of them come: Malazans, a few at a time, carrying each other, wet cloths and no cloths, past the Third at the mouth of it and on out toward the breach and the night. Some of them look at the squad as they go by. Most of them look at nothing.

${fell.length ? `${b63And(fell.map(NAME))} did not get up.\n\nThe Third carries ${fell.length > 1 ? 'them' : (b63He(fell[0]) === 'she' ? 'her' : 'him')} out. That is what you do. ${b63Say({haddat:`Haddat carries more than her share, and says the ${fell.length > 1 ? 'names' : 'name'} in Hissari the whole way, under her breath.`, marrow:`Marrow walks beside, with one hand on the ${fell.length > 1 ? 'nearest' : 'one'} the whole way, as if the warren could still do something. It cannot. She keeps the hand there.`, _:'It is a long way, out to the breach.'})}` : `Everyone in the Third got up. You count them twice, in the smoke, and get the same number both times, and let your breath go.`}

In the street behind, somebody has left a mail shirt where they took it off: a marine's, with one shoulder of rings fused blue by the heat. ${fell.length ? 'The squad takes it, because it is there.' : 'The squad takes it. It is there, and the squad is.'}`,
        ch:[{t:'Out along the way.', go:'b6_c3_path'}]}; },
    b6_c3_path:()=>({sp:'The way out', scene:'b6_ghatan_fire', txt:
`The way goes back out through the fire, and the Third goes along it with the last of the ones coming out, and the flames on either side lean back from it and do not touch anyone. You do not see who made it. The soldiers say a girl. You see what she made, and you walk along it, and it holds.

Out through the breach, onto the rubble, into the night, and the air outside is cold enough to hurt.${b6In('mehet') ? `\n\nMehet stops at the top of the breach and looks back into the city. Then he comes down.` : ''}`,
      ch:[{t:'The night.', go:'b6_c3_night'}]}),

    /* ---- 'line': the gate ---- */
    b6_c3_gate_start:()=>({sp:'The gate', scene:'b6_ghatan_fire', txt:
`The gate stands open with the light behind it. Out of it, the burned, carried and walking. Behind the squad, the carts. In front, along the foot of the wall, out of the smoke, men in desert robes with swords, coming round the curve of the wall toward the gate, because it is the way out for everyone.

Which it is.${b63If('haddat', `\n\nHaddat sets her shield. "Behind me," she says, to the burned, very gently.`)}`,
      ch:[{t:'"Third. Hold the gate."', onward:true, go:()=>startBattle('b6_c3_gate', {})},
          {t:'Get the carts across the gate-mouth first, for a wall.', check:['might', 15], onward:true,
            edges:id=>[(id === 'haddat' || id === 'darrut' || id === 'hessa') && ['a shield fighter knows where a wall should be', 2], id === 'tangle' && ['he has built a barricade out of less', 1], id === 'mirrel' && ['she is small, and the carts are full', -1]],
            near:{t:()=>{ const w = b63Who(); return `Yes, but a cart wheel goes over ${b63Pos(w)} foot on the way across: bruised before the first blow.`; }, fx:()=>bruise(b63Who(), bruiseN())},
            go:()=>startBattle('b6_c3_gate', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c3_gate_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_gate_seen:()=>({sp:'The gate', scene:'b6_ghatan_fire', txt:
`The cart sticks halfway across, one wheel in a rut, and they are on the squad before it moves.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c3_gate', {surprise:'e'})}]}),
    b6_c3_gate_after:()=>({sp:'The side of the walls', scene:'b6_ghatan_fire', fx:()=>{ if (!S.f.b6_c3_gateDone) { S.f.b6_c3_gateDone = 1; gain('b6_c3_scorchedmail'); } }, txt:
`Their captain goes down at the postern, and the door in the wall is shut on the rest of them, from outside, with a beam across it that the squad finds in the ditch. Whatever is on the other side of it can stay there.

Back at the gate the burned are still coming out, fewer now, a few at a time. By one of the carts there is a mail shirt somebody took off in the streets and carried out over an arm and dropped: a marine's, one shoulder of it fused blue with heat. The surgeon tells the squad to take it. "Its owner isn't coming back for it," he says. "Or they are, and they'll want you to have it."`,
      ch:[{t:'The gate.', go:'b6_c3_gate_pull'}]}),
    b6_c3_gate_pull:()=>({sp:'The gate', scene:'b6_ghatan_fire', txt:
`The Third stands at the gate the rest of the night and pulls out whoever comes. ${b63Say({haddat:'Haddat carries them out of the light on her shield, one after another, and looks at each face.', marrow:'Marrow works at the carts until her hands shake, and then keeps working with them shaking.', mirrel:'Mirrel works at the carts in threes, one, two, three, and up, until there is nobody left to count.', _:'The squad carries them out of the light, one after another.'})}

Toward the middle of the night, they stop coming. The gate stands open with the light behind it, and nobody comes out of it at all.${b63If('mehet', `\n\nMehet stands in the gate a long time, looking in. Then he comes away from it.`)}`,
      ch:[{t:'The night.', go:'b6_c3_night'}]}),

    /* ---- the night, and dawn ---- */
    b6_c3_night:()=>({sp:'Y\'Ghatan · the night', scene:'b6_ghatan_fire', txt:
`The city burns all night. It burns like a forge, without hurry, from the inside out, and toward dawn the walls are still standing round it, black, with the light inside them going red, then dull.

The word comes down the line with the grey: the way through the fire is closed. Whoever came out of it is out. The marines who went in first are not among them. The camp says they are dead. The camp says a great deal tonight.

${b63Key() === 'in' ? (b63Fell().length ? `The Third sits by the breach with its own dead under a cloak, and waits for the light.` : 'The Third sits by the breach in the grey and does not say much.') : 'The Third sits by the gate in the grey with its hands wrapped, and does not say much.'}`,
      ch:[{t:'To the barrow field.', onward:true, fx:()=>{ S.f.b6_c3_ph = 3; }, go:()=>{ startExplore('b6_c3_barrows'); talk('b6_c3_barrows_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ================= phase 3: the barrow field, the night after ================= */
    b6_c3_barrows_arrive:()=>({sp:'The barrow field', scene:'b6_barrows', again:()=>`The barrow field, at night, and the city smoking.`, txt:
`All day the army dug. By dusk there is a new barrow among the old ones by the road: long, low, fresh earth, for the dead the Fourteenth could carry out. The ones who died at the breach and the gate, and the ones who came out along the way and died after. The city keeps the rest.

Now it is night again. The city is still smoking. The barrow field is full of soldiers sitting by small fires, and nobody is singing.${b63K1() === 'bury' ? `\n\nThe old barrows around the new one are whole. The old dead were put back before the new ones came to join them. The Third did it. It was a night's work, the night before the siege. It feels like a long time ago.` : b63K1() === 'leave' ? `\n\nSome of the old barrows around the new one still stand open, as Leoman's people left them. There was no night to spare for them then, and there is none now.` : ''}`,
      ch:[b6DeckChoice(3),
          {t:'The new barrow.', go:'b6_c3_long'},
          {t:'Walk the field.', go:()=>startExplore()}]}),
    b6_c3_long:()=>{ const fell = b63Fell();
      return {sp:'The long barrow', scene:'b6_barrows', fx:()=>{ S.f.b6_c3_long = 1; }, again:()=>`The long barrow, fresh earth.`, txt:
`The long barrow is fresh earth, packed down with shovel-backs, and along its top someone has pushed in a line of broken spear-shafts, one after another, as far as the light goes. Soldiers walk along it in ones and twos and stop, and go on.

${fell.length ? `${b63And(fell.map(NAME))} ${fell.length > 1 ? 'are' : 'is'} in it. The Third put ${fell.length > 1 ? 'them' : (b63He(fell[0]) === 'she' ? 'her' : 'him')} there with its own hands this afternoon, near the end, where the squad can find the place again.\n\n${b63Say({haddat:`Haddat says the ${fell.length > 1 ? 'names' : 'name'}, and then all the names she has, from the Chain on, with ${fell.length > 1 ? 'these' : 'this one'} at the end.`, marrow:`Marrow ties a knot in her string, and another, and puts it away.`, tangle:`Tangle lays a coil of fuse-cord on the earth, and does not explain it.`, _:'The squad stands at the place a while.'})}` : `None of the Third is in it. You stand at the end of it anyway, because the squad is still here and that is not nothing, and because nearly everyone else in the barrow field is standing somewhere along it too.`}${b63If('mehet', `\n\nMehet stands at the barrow with his ring of keys in his hand. "They came to take my city," he says. "I know. I am still sorry."`)}`,
        ch:[{t:'Not now.', go:()=>startExplore()}]}; },
    b6_c3_oldbarrow:()=>({sp:'The old barrows', scene:'b6_barrows', fx:()=>{ S.f.b6_c3_oldSeen = 1; }, again:()=>`The old barrows, low and long.`, txt:
`The old barrows are low and long and grassed over with scrub, older than anyone in the army. The Empire's dead from the last time it took this city. ${b63K1() === 'bury' ? `This one the Third put back, the night before the siege: the earth still shows where, darker than the rest. Whoever is in it is in it again. The new dead have old neighbours who were let lie.` : b63K1() === 'leave' ? `This one stands open, the way Leoman's people left it, the stones pulled out of its side and the dark inside it. The new barrow is fifty paces off. The old dead and the new are close enough to talk, if dead men talk, and one lot has a roof and the other has not.` : `Leoman's people dug into some of them, when they came. This one has been put to rights since.`}${b63If('hessa', `\n\nHessa puts her palm on the old earth. "Patient," she says. "These ones have been patient a long time."`)}`,
      ch:[{t:'Put the stones back in its side.', req:()=>b63K1() === 'leave' && !S.f.b6_c3_mended, fx:()=>{ S.f.b6_c3_mended = 1; b63L('haddat', 1); }, go:'b6_c3_old_mend'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_old_mend:()=>({sp:'The old barrows', scene:'b6_barrows', txt:
`It takes the squad an hour, in the dark, by the light of the city, to put the stones back in the old barrow's side and the earth over them. It is not a night's work, the way it would have been before. It is one barrow, out of the ones that were opened. It is what there is time for.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_city:()=>({sp:'The dead tree', scene:'b6_barrows', fx:()=>{ S.f.b6_c3_city = 1; }, again:()=>`The dead tree, and the city past it.`, txt:
`From the dead tree on the rise at the edge of the field you can see the whole of Y'Ghatan at once: the walls standing, black, with the breach in them, and inside the walls nothing standing very much, and the smoke going straight up into a sky with no wind in it.

${b63Say({mehet:`Mehet stands beside you with his ring of keys. He takes them off the ring one at a time and names each one, quietly: the potters' street, the cistern, the shop, the house, his aunt's house. When he has named them all he puts them back on the ring, every one, and puts the ring away. "I will keep them," he says. "A man should remember where the doors were."`, haddat:`Haddat stands beside you and looks at it. "Hissar burned," she says. "I was there. It did not burn like this." She turns away.`, _:'You look at it as long as you can, and then a little longer, and then go back down.'})}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_count:()=>({sp:'The old soldier of the 9th', scene:'b6_barrows', fx:()=>{ S.f.b6_c3_count = 1; }, again:()=>`The old soldier, by his fire. "Seven hundred and ninety-one."`, txt:
`The old soldier of the 9th has a fire of his own, and his deck in his lap, and does not offer to read it.

"Seven hundred and ninety-one," he says, when you sit down. "Came out along the way. They counted them at the breach, the clerks did, one by one." He looks at the long barrow. "Out of three thousand. Near enough."

He turns a card over, face down. "The Red Blades' commander came out burned, they say. The girl who made the way was put under guard after. Under guard, for that." He spits into the fire. "And was out of it by morning, and nobody will say how. Good."

"Third time's the one, in a city," he says. "I said that. I shouldn't have said that."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_far:()=>({sp:'The far barrows', scene:'b6_barrows', again:()=>`The far barrows.`, txt: S.f.b6_c3_strays ?
`The far barrows are quiet now. The squad has seen to that.` :
`At the far end of the field, past the last of the soldiers' fires, something is moving among the old barrows: low, careful, more than one. Not the Fourteenth. The Fourteenth is not careful tonight.

${b63Say({mehet:'Mehet looks, and his face goes still. "Some of Leoman\'s got out in the smoke," he says. "Not all of them wanted to die in a house."', sathi:'Sathi has seen them already. "Three," she says. "And one up on the side of the barrow. With a bow."', tebbet:'Tebbet has seen them already. "Four," he says. "One with a bow, on the barrow. They\'re digging."', _:'Some of Leoman\'s people got out in the smoke, it seems. Not all of them wanted to die in a house.'})}`,
      ch:[{t:'"Third. With me."', req:()=>!S.f.b6_c3_strays, onward:true, go:()=>startBattle('b6_c3_strays', {})},
          {t:'Come round behind the barrow, quiet, between them and the bow.', check:['guile', 15], req:()=>!S.f.b6_c3_strays, onward:true,
            edges:id=>[(id === 'sathi' || id === 'tebbet') && ['the night is theirs to see in', 2], id === 'mehet' && ['he knows how a barrow lies', 1], (id === 'haddat' || id === 'darrut' || id === 'hessa') && ['the scrub is loud under a big shield', -1]],
            near:{t:()=>{ const w = b63Who(); return `Yes, but ${b63Nm(w)} ${b63V(w, 'go', 'goes')} over a buried stone on the barrow's flank in the dark and comes down hard: bruised.`; }, fx:()=>bruise(b63Who(), bruiseN())},
            go:()=>startBattle('b6_c3_strays', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c3_strays_seen'},
          {t:'Leave them to the Wickans.', req:()=>!S.f.b6_c3_strays && !S.f.b6_c3_strayLeft, fx:()=>{ S.f.b6_c3_strayLeft = 1; }, go:'b6_c3_strays_left'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_strays_seen:()=>({sp:'The far barrows', scene:'b6_barrows', txt:
`The bowman on the barrow sees the squad come round it, and shouts, and the three in the hollow come up with their swords out.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c3_strays', {surprise:'e'})}]}),
    b6_c3_strays_left:()=>({sp:'The far barrows', scene:'b6_barrows', txt:
`You send word to the Wickan pickets riding the edge of the field. They come, quiet, a handful of them, and go among the far barrows, and what happens there happens without the Third. The pickets ride back out of the dark a while later and do not say anything, and nothing moves at the far end of the field after that.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_strays_after:()=>({sp:'The far barrows', scene:'b6_barrows', fx:()=>{ S.f.b6_c3_strays = 1; }, txt:
`The last of them goes down in the hollow between the barrows. They had been digging, with their hands, into the side of the oldest one, for whatever the Empire buries with its dead. There was nothing. The Empire does not bury anything with its dead but the dead.

${b63Say({haddat:'Haddat looks at each of their faces in the light of the city, one after another, the way she looks at every face. None of them is anyone. She stands up.', mehet:'Mehet looks at the dead men a long while. "I knew that one," he says, of one of them. "He sold lamps."', _:'The squad fills in what they dug, and goes back to the fire.'})}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* ---- the captain: the march for Sotka (the chapter's end) ---- */
    b6_c3_capt3:()=>({sp:'The captain', scene:'b6_barrows', fx:()=>{ S.f.b6_c3_capt3 = 1; }, again:()=>`The captain, by the long barrow. "Sotka. Tomorrow night."`, txt:
`The captain is standing at the end of the long barrow with his helm under his arm, which is the first time the Third has seen him without it.

"Orders," he says. "The army marches tomorrow night. For Sotka, and the coast." He turns the helm round in his hands. "The plague is on the roads behind us, and closing. The Adjunct is not waiting to meet it."

He looks at the city. "We leave them here. The ones in the barrow, and the ones in there." He puts the helm back on. "That's the order. I've written it down, so I'll know I didn't dream it."${b63Fell().length ? `\n\nHe looks along the Third, and counts, and stops counting. "I'm sorry, Sergeant," he says. "For what it's worth to anyone."` : ''}`,
      ch:[{t:'"Yes, Captain."', go:'b6_c3_march'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c3_march:()=>({sp:'The barrow field', scene:'b6_barrows', again:()=>`The barrow field. Tomorrow night, the Sotka road.`, txt:
`The next day the army sleeps, and packs, and burns what it cannot carry, which is not much. At dusk it forms up on the road west of the barrows, legion by legion, the 9th near the back, the Wickans and the Khundryl on the flanks, and the wagons with the burned in them at the rear with their own guard.

${b63Say({mehet:'Mehet walks at the back of the squad with the keys in his fist, his face to the road.', haddat:'Haddat walks at the front, and looks round once, at the city, and then not again.', _:'The Third forms up with the 9th.'})}${b63Fell().length ? ` The squad's line is shorter by ${b63Fell().length > 1 ? `${b63Fell().length === 2 ? 'two' : b63Fell().length === 3 ? 'three' : 'more than three'}` : 'one'}. It closes up without being told.` : ''}

Behind the army the city smokes. Ahead, the road, and the plague somewhere on it, and the sea.`,
      ch:[{t:'West, on the Sotka road.', onward:true, go:()=>chapterEnd(3, b63Key() || 'line')},
          {t:'Not now.', go:()=>startExplore()}]}),
  },
};
