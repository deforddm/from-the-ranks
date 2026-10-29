/* ============ Book Five, Chapter 5: The Retreat ============ */
/* South from High Fort to Brans Keep, through country burned to the root by Letherii hands so the Edur would find nothing (Midnight Tides
   ch 19-21; mt-canon §7.1, §9, §17c). "The fort has surrendered, as has the entire frontier." On Ch4 'hold' the Sixth walks in the long
   column of the disarmed, with knives, shields and paybooks; on 'run' it walks armed, ahead of the column. Phase 1, the road south: the
   burned farms, the first of the army's hidden caches dug out by somebody who knew exactly where to dig (never who), refugees (Trate has
   fallen: b5_trateFell), a Grass Jacket's rumours (a Finadd upriver whose garrison answers to nobody now, never named and never placed:
   b5_breakaway; Second Maiden's Fort still holds; three companies of the frontier army on the frontier road), a Bluerose courier whose
   girth-strap goes, a burned farm with deserters in it (b5_c5_farm, optional), a press-gang at work (Pessa, the recruit: the claim, or the
   fight b5_c5_press, or let them keep her), the second cache in a burned copse (the trick, and b5Rearm on 'hold'), the fire in the lee of
   a burned wall (the Token Auction, 89). Phase 2, Brans Keep: the Whitefinders are there; the Sixth learns its own battalion burned the
   road on its retreat from First Reach, and rejoins it. A Letheras counting-house's factor is buying soldiers' paybooks for coin and kit:
   the key, S.f.b5_c5_key: 'sign' (the house: +40 docks, its scale, its first interest; on Ch1 'pay' the fine lines bought at half) or
   'refuse' (the army keeps the books). Phase 3, the night: on 'sign' deserters raid the house's wagons (b5_c5_wagons); on 'refuse' the
   house's hired men come for the paybook case (b5_c5_factor). Never Brous, the Dresh horse farm, the grove, the pursuit, the frontier-road
   meeting, Thetil, Hull or Udinaas; never Moroch's group, his recruiting at Brans Keep, or the Artisans' standard; never who emptied the
   first cache. Notes for later chapters: docs/mt-ch5-notes.md. */
/* FOR THE ARTIST (85b): names this file uses.
   Items: ART['item/b5_c5_cacheblade'], ['item/b5_c5_cachebow'], ['item/b5_c5_housemail'], ['item/b5_c5_girth'].
   Figures: b5_c5_deserterboss, b5_c5_refugee, b5_c5_courier, b5_c5_factor, b5_c5_quartermaster, b5_c5_nerek. Reused: b5_c1_ennic,
   b5_c1_clerk, b5_c1_tilewoman, b5_c4_grassjacket, b5_letherii (the press-gang, the battalion), pessa, b5_letherii_bow.
   Backdrops (SCENEX): b5_road_south (80's, redrawn), b5_c5_burned, b5_c5_cache, b5_c5_arrival.
   Ground (TILEX): b5_c5_road (. road , ash # burned wall x burned tree c cart m milestone k the copse F fire f the farm lane v on south),
   b5_c5_farm (. yard , ash # wall B barn door w well e back to the road), b5_c5_keep (. grass , trodden earth = tent w wagon ~ the dry
   channel's lip F fire q the battalion's carts ^ the north road). In fights 't' is cover (a burned cart, a fallen beam, a wagon) and '#'
   is a burned wall. */

/* ---- small helpers (b55: Book Five, Chapter Five) ---- */
const b55L = (id, n) => { if (b5In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b55Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b5In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b55If = (id, s) => b5In(id) ? (typeof s === 'function' ? s() : s) : '';
const b55Who = () => (ROLL() && ROLL().who) || 'sgt';
const b55Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b55Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b55V = (id, you, they) => id === 'sgt' ? you : they;
const b55Ph = () => S.f.b5_c5_ph || 1;
const b55Key = () => S.f.b5_c5_key || null;
const b55Docks = (n, why) => { S.silver = (S.silver || 0) + n; updSilver(); note(`+${n} docks: ${why}.`, 'good'); };
const b55Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b55Here = () => S.squad.filter(id => id !== 'sgt' && b5In(id));
const b55And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* the earlier keys, each read with a default (a --from=5 save may have taken either; an unset key reads as the quieter road) */
const b55Ran = () => S.f.b5_c4_key === 'run';                  // Ch4: broke west, armed, and came out ahead of the column
const b55Bare = () => !!S.f.b5_disarmed;                        // Ch4 'hold': disarmed at the pile, until the cache
const b55Warned = () => S.f.b5_c3_key === 'warn';               // Ch3: the runner to the Nerek
const b55Drowned = () => S.f.b5_c2_key === 'dead';              // Ch2: the Sixth carried the drowned out at Trate
const b55Fine = () => S.f.b5_c1_key === 'pay';                  // Ch1: the fine on five paybooks
/* the Ch1 'pay' shares of Thegg's fine, by the brief: on 'sign' the house buys each at half */
const B55_FINE = {sgt:80, thegg:60, perrit:60, tobet:60, ammet:40};
/* where the chapter goes on from, if a "Not now" stepped away between its steps */
const b55Next = () => { const f = S.f; if (b55Ph() < 2) return 'b5_c5_onward'; if (!f.b5_c5_key) return 'b5_c5_key'; if (!f.b5_c5_nightDone) return 'b5_c5_night'; return 'b5_c5_dawn'; };
/* the road south is open once the cache is dug and the press-gang is settled one way or another */
const b55Ready = () => !!S.f.b5_c5_cache && !!S.f.b5_c5_pressDone;
/* back up the farm lane onto the road, at the lane's end */
const b55Back = () => { S.area = 'b5_c5_road'; S.pos = {x:1, y:4}; S.trail = [[1,0],[1,1],[0,1],[2,0],[2,1],[1,-1]].map(([dx, dy]) => ({x:1 + dx, y:4 + dy})); startExplore(); };
/* "walk with the refugee column for now": what b5Join does when there is no room, done on purpose */
const b55Wait = () => { S.f.b5_pessaDone = 2; S.camp = [...(S.camp || []).filter(x => x !== 'pessa'), 'pessa']; b5DebtInit('pessa'); S.loy.pessa ??= 0; S.picks.pessa ??= []; S.gear.pessa ??= {};
  note('Pessa walks with the refugee column for now. The roster at any fire can bring her in.'); save(); };
/* a "yes, but" in docks of debt on whoever rolled it (5 to 20), never past what the holder will wait for: if it would press the roller,
   the scene takes another cost (alt: {t(id), fx(id)}). fx runs before t (16, settleRoll), so fx decides. As b54Owe. */
let b55NearOk = true;
const b55Room = (id, n) => { const d0 = b5DebtStart(id), lim = d0 > 0 ? d0 * B5_PRESS : 50; return b5Debt(id) + n <= lim; };
const b55Owe = (n, why, line, alt) => ({
  fx:()=>{ const w = b55Who(); b55NearOk = b55Room(w, n); if (b55NearOk) b5Owe(w, n, why); else if (alt && alt.fx) alt.fx(w); },
  t:()=>{ const w = b55Who(); return b55NearOk ? line(w) : (alt && alt.t ? alt.t(w) : `Yes, but it costs ${b55Nm(w)} something.`); }});

/* ---- the Quartermaster's Mark: the Rhivi Spirit-Song (song, t_song), in Lether's words. The army's caches are marked so that any soldier
   who knows the cut can find the water, the linen and the salves within a few paces of any road. Not sorcery. Once a fight: every
   squadmate within 4 heals 1d6+2 and 1 more for each squad level past the first, wakes from any daze, and steps out of any fire. ---- */
Object.assign(TRICKS, {
  b5_c5_mark:{name:'The Quartermaster\'s Mark', ch:5, use:'fight', ab:'t_b5_c5_mark', where:'a milestone in a burned copse on the road south, with the Sixth\'s quartermaster',
    lore:'The army hides its stores along its own roads: buried jars of water, linen, salve and kit, and a cut on the nearest milestone that says how many paces and which way. Every quartermaster knows the cut. Hardly any soldier does, which is the point. A soldier who does can find a jar of clean water and a roll of linen within a few paces of any road in Lether, in the middle of a fight if need be.',
    fx:'Once a fight: the bearer gets a cache-jar open and the water and linen go round. Every squadmate within 4 heals 1d6+2, and 1 more for each squad level past the first, wakes from any daze, and steps out of any fire under them. Not sorcery.'},
});
Object.assign(AB, {
  t_b5_c5_mark:{name:TRICKS.b5_c5_mark.name, trick:'b5_c5_mark', self:true, desc:()=>TRICKS.b5_c5_mark.fx,
    run(u){ AUDIO.play('heal'); const near = party().filter(p => !p.ally && cheb(p, u) <= 4);
      near.forEach(p => { heal(p, roll(1, 6, 2 + lvB())); if (p.stun) { p.stun = false; float(p, 'awake', '#9fe0b8'); } B.fires = B.fires.filter(f => !(f.x === p.x && f.y === p.y)); putOut(p); sparks(p.x, p.y, 10, '#c8e0a0', .35); });
      blog(`${u.name} has a cache-jar open, the way the quartermaster showed it: the seal cut, the water out, the linen torn into lengths and going round ${near.length > 1 ? 'the squad' : 'nobody else'} hand to hand. Not sorcery. Stores.`); }},
});

/* ---- the words this chapter adds to Book Five's glossary ---- */
GLOSSX.mt.push(
  [5, 'The army\'s caches', 'Stores the Letherii army buries along its own roads: water, linen, salve and kit in sealed jars, found by a quartermaster\'s cut on the nearest milestone.', ()=>(S.chapter || 0) >= 5 && !!(S.f && S.f.b5_c5_cache)],
  [5, 'The burned country', 'The farms and fields on the road south from the frontier, burned to the root by the Letherii army on its retreat, so that the Edur would find nothing to eat.', ()=>(S.chapter || 0) >= 5]);

/* ---- the reading: the road south through the burned country, on ash, by the coals of a farm ---- */
B5READ[5] = {scene:'b5_road_south', where:'the ash at the road\'s edge, where a farm\'s coals are still warm', set:'The road south through the burned country, the fields black to the hedges on both sides, and a farm\'s last coals going grey a few paces off.',
  back:'b5_c5_tiles_done', backT:'Back to the road.',
  get say(){ return {perrit:`"Ash." Perrit brushes a patch of it smooth with the side of her hand, and looks at what is under it, which is more ash. "It takes a print. The tiles like that." She lays out the calfskin on the black.${b5In('ruuk') ? ' Ruuk goes off along the hedge-line to look for a bird, any bird.' : ''} "Sit, Sergeant. Somebody should read this road. It was written by somebody."`,
    tilewoman:`"Ash." The old woman spits to one side, for manners, and the ash takes it without a sound. "Ash reads true. Nothing left in it to lie. A dock, Sergeant, and sit where it's warm."`}; }};

/* the fires are roster fires (38c): the road's, and Brans Keep's */
ROSTER_FIRES.mt[5] = ['b5_c5_fire', 'b5_c5_keepfire'];

const B5CH5 = {
  title:'The Retreat', number:'Five',
  intro:{loc:'The road south', sub:'From High Fort toward Brans Keep · morning', scene:'b5_road_south', cap:'A straight military road through farm country burned to the root on both sides, and a long file of soldiers on it going south.',
    paras:[
`The fort has surrendered, and the whole frontier with it. The road south from High Fort runs straight as a ruler toward Brans Keep, through what the map calls farm country. The map is out of date.`,
()=> b55Ran() ? `The Sixth walks ahead of the long file of the disarmed, armed, which nobody behind it fails to notice. Finadd Ennic has written that it is "keeping ahead of the column". He has underlined *ahead*.` :
  `The Sixth walks in the long file of the disarmed, with its knives and its shields and the clerk's oilskin case, and nothing else that cuts. Finadd Ennic walks at its head with his book under his arm, which the Edur did not want either.`,
()=>{ const v = b55Here().map(id => TPL[id].name);
  return `${v.length ? `${b55And(v)} ${v.length > 1 ? 'walk' : 'walks'} with you.` : 'The squad, this week, is you.'} Behind the Sixth, the Edur, unhurried. Ahead, Brans Keep, and somewhere on the road between, the battalion that never came to High Fort.`; }],
    go:'South', node:'b5_c5_start'},

  areas:[
    /* 16 x 12 (b5_c5_road, day). The military road south through the burned country: . the road  , ash  # burned walls  x burned trees
       c refugees' carts  m a milestone, where the first cache was  k a burned copse with a milestone in it (the second cache)  F the fire
       in the lee of a burned wall  f the lane to a burned farm  v on, south, to Brans Keep */
    { id:'b5_c5_road', title:'The road south', sub:'The burned country', hint:'Tap ground to move · tap a figure to talk · the road goes south, to Brans Keep', decor:'b5_c5_road',
      map:[ "xx,,,,,.,,,,,,xx",
            "x,,##,,.m,,,,,,x",
            ",,,#,,,.,,,cc,,,",
            ",,,,,,,.,,,,,,,,",
            "f,,,,,,.,,,,,x,,",
            ",,,,,,,.,,,,xkx,",
            ",,,,,,,.,,,,,,,,",
            ",#F#,,,.,,,,,,,,",
            ",,,,,,,.,,,cc,,,",
            "x,,,,,,.,,,,,,,x",
            "xx,,,,,.,,,,,,xx",
            "xxxxxxxvxxxxxxxx" ],
      walk:'.,', triggers:{m:'b5_c5_milestone', k:'b5_c5_copse', F:'b5_c5_fire', f:'b5_c5_farmlane', v:'b5_c5_south'}, start:{x:7, y:1},
      quest:()=> !S.f.b5_c5_pressDone ? 'South. There is a crowd at the crossroads ahead.' : !S.f.b5_c5_cache ? (b55Bare() ? 'The army hides stores along its roads. The squad has knives.' : 'The army hides stores along its roads.') : 'South, to Brans Keep.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:6, y:2, node:()=>'b5_c5_ennic_road', fresh:()=>!S.f.b5_c5_ennicRoad},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:5, y:3, node:()=>'b5_c5_clerk', fresh:()=>!S.f.b5_c5_clerk},
        {id:'qm', name:'The quartermaster', kind:'b5_c5_quartermaster', x:9, y:1, node:()=>'b5_c5_qm', fresh:()=>!S.f.b5_c5_qm},
        {id:'refugees', name:'Refugees with a cart', kind:'b5_c5_refugee', x:10, y:3, node:()=>'b5_c5_refugees', fresh:()=>!S.f.b5_c5_refugees},
        {id:'grass', name:'A Grass Jacket on the verge', kind:'b5_c4_grassjacket', x:4, y:5, node:()=>'b5_c5_grass', fresh:()=>!S.f.b5_c5_grass},
        {id:'courier', name:'A courier, on foot', kind:'b5_c5_courier', x:9, y:6, node:()=>'b5_c5_courier', fresh:()=>!S.f.b5_c5_courier},
        {id:'nerek', name:'A Nerek family by a cart', kind:'b5_c5_nerek', x:13, y:8, node:()=>'b5_c5_nerek', show:()=>b55Warned(), fresh:()=>!S.f.b5_c5_nerek},
        {id:'press', name:'The press-gang\'s sergeant', kind:'b5_letherii', x:10, y:7, node:()=>S.f.b5_c5_pressDone ? 'b5_c5_pressgang_again' : 'b5_c5_pressgang', fresh:()=>!S.f.b5_c5_pressDone},
        {id:'pessa', name:'Pessa', kind:'pessa', x:11, y:9, node:()=>'b5_c5_pessa_again', show:()=>!!S.f.b5_c5_pressDone && b5Waiting('pessa'), fresh:()=>false},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:4, y:8, node:()=>'b5_c5_tilewoman', fresh:()=>!S.f.b5_c5_tw} ] },

    /* 16 x 12 (b5_c5_farm, afternoon; optional). A farm the burning did not finish: # walls standing  B the barn door  . the yard
       , ash  w the well  e the lane back to the road */
    { id:'b5_c5_farm', title:'A burned farm', sub:'Off the road south', hint:'Tap ground to move · the barn is at the top of the yard · the lane goes back to the road', decor:'b5_c5_farm',
      map:[ "################",
            "#,,,,#,,,,#,,,,#",
            "#,,,,#,,,,#,,,,#",
            "#,,,,##BB##,,,,#",
            "#,,,,,,,,,,,,,,#",
            "#,,..........,,#",
            "#,,....w.....,,#",
            "#,,..........,,#",
            "##,,,,,,,,,,,,##",
            ",#,,,,,..,,,,,#,",
            ",,#,,,,..,,,,#,,",
            ",,,,,,,ee,,,,,,," ],
      walk:'.,', triggers:{B:'b5_c5_barn', w:'b5_c5_well', e:'b5_c5_farm_back'}, start:{x:7, y:10},
      quest:()=> !S.f.b5_c5_farmDone ? 'The barn. There are men in it.' : 'Back down the lane to the road.',
      npcs:[] },

    /* 16 x 12 (b5_c5_keep, dusk; night in phase 3). The Whitefinders' lines at Brans Keep, across the dry channel: , trodden earth
       . grass  = tents  w wagons  ~ the dry channel's lip  F the Sixth's fire  q the battalion's carts  ^ the north road */
    { id:'b5_c5_keep', title:'Brans Keep · the Whitefinders\' lines', sub:'Across the dry channel', hint:'Tap ground to move · tap a figure to talk · the Sixth\'s fire is by the tents', decor:'b5_c5_keep',
      map:[ "==,,==,,^,,==,~~",
            "==,,==,,.,,==,~~",
            ",,,,,,,,.,,,,,~~",
            ",,F,,,,,.,,,q,~~",
            ",,,,,,,,.,,,,,~~",
            "==,,==,,.,,==,,~",
            "==,,==,,.,,==,,~",
            ",,,,,,,,.,,,,,,~",
            ",,,,,,,,.,,,,,,~",
            ",ww,ww,,.,,ww,,~",
            ",,,,,,,,.,,,,,,~",
            ",,,,,,,,.,,,,,,~" ],
      walk:'.,', triggers:{F:'b5_c5_keepfire', q:'b5_c5_carts', '^':'b5_c5_north', w:'b5_c5_wagonline'}, start:{x:8, y:1},
      quest:()=> !b55Key() ? 'The house\'s factor, and the Finadd. The paybooks.' : !S.f.b5_c5_nightDone ? 'The fire. Night is coming.' : 'The fire, and the morning.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:6, y:4, node:()=>'b5_c5_ennic_keep', fresh:()=>!S.f.b5_c5_ennicKeep},
        {id:'factor', name:'The house\'s factor', kind:'b5_c5_factor', x:10, y:8, node:()=>b55Key() ? 'b5_c5_factor_again' : 'b5_c5_factor', fresh:()=>!S.f.b5_c5_offer},
        {id:'regular', name:'A Whitefinder of the Second', kind:'b5_letherii', x:5, y:2, node:()=>'b5_c5_regular', fresh:()=>!S.f.b5_c5_regular},
        {id:'qm', name:'The quartermaster', kind:'b5_c5_quartermaster', x:11, y:3, node:()=>'b5_c5_qm', fresh:()=>false},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:3, y:7, node:()=>'b5_c5_clerk', fresh:()=>false},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:1, y:8, node:()=>'b5_c5_tilewoman', show:()=>!b5In('perrit') && !S.f.b5_c5_drawn, fresh:()=>false} ] } ],

  battles:{
    /* the burned farm (optional): deserters digging for what the family buried; then the barn and their leader */
    b5_c5_farm:{title:'The burned farm', style:'b5_c5_farm', warrenText:'A burned farm on the road south · the Holds are thin here, as if the fire took them too', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t..t..","........",".t....t.","........","...t....","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_deserter',1,1],['b5_deserter',4,1],['b5_deserter',4,3],['b5_deserterbow',1,0],['b5_deserterbow',6,0]], xp:130, after:'b5_c5_farm_after',
      preText:()=>`Five of them in the yard, in army blue-grey with the flashes cut off: three with swords, two with bows by the barn's black wall. They have been digging by the well with a spade they did not bring.${b55Bare() ? ' The Sixth has knives, and a fence-post or two out of the ash, and its shields. It will have to do, and the deserters can see that it will have to do.' : ''}`,
      stage2:{title:'The barn', xp:60,
        text:()=>`The last of the yard's five goes over the wall and away across the black field. Inside the barn, under what is left of its roof, somebody is shouting orders at somebody else, and two more come out of the dark between the stalls with a man behind them who is not running at all.\n\n${b55Say({thegg:'"Behind me," Thegg says, and goes in first, turned sideways for the door.', _:'The squad goes in after them.'})}`,
        map:["##....##","#..t...#","#......#","#.t..t.#","#......#","#..t...#","#......#","#......#","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b5_c5_deserterboss',4,1],['b5_deserter',2,2],['b5_deserter',6,2]]} },
    /* the press-gang over Pessa and the refugees: non-lethal, on the King's road */
    b5_c5_press:{title:'The crossroads', style:'b5_c5_road', warrenText:'The road south · the Holds take no side in this', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t.....","........","....t...","........",".t....t.","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_presssgt',4,2],['b5_pressman',2,3],['b5_pressman',6,3],['b5_pressman',3,1],['b5_pressman',5,1]], xp:150, after:'b5_c5_press_after',
      objective:{type:'survive', rounds:4, text:'Cudgels and shields; nobody killed. They are Letherii soldiers too, and nobody is killed on the King\'s road. Four rounds, or put them down.'},
      preText:()=>`The press sergeant puts his ledger down on the cart-tail, carefully, and picks up a cudgel. His four come round the cart. Behind them the refugees have stopped being a column and become a crowd, which is worse, and Pessa has her boathook down off the upright.`},
    /* 'sign': deserters raid the house's kit wagons outside the Whitefinders' lines at night; a Whitefinder picket beside the Sixth */
    b5_c5_wagons:{title:'The house\'s wagons', style:'b5_c5_keep', dark:true, warrenText:'Brans Keep at night · the Holds are crowded, as if something were coming to stand here too', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..t...t.","........","...t....","........",".t....t.","........","..t.....","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b5_regular',1,7]],
      foes:[['b5_deserter',1,0],['b5_deserter',5,1],['b5_deserter',3,0],['b5_deserterbow',6,0]], xp:160, after:'b5_c5_wagons_after',
      waves:[{round:2, foes:[['b5_deserter',0,3],['b5_deserterbow',7,2]], text:'Two more come in off the dark field on the flanks, one of them with a bow, going for the wagon at the end.'}],
      preText:()=>`They come in off the dark field without torches, like men who have done it before: blue-grey cloaks with the flashes cut off, swords and two bows, making for the wagons with the house's mark on the canvas. A Whitefinder of the picket is beside you with his shield up, and swearing, quietly, at the house.`},
    /* 'refuse': the house's hired men come for the Sixth's paybook in the clerk's case; non-lethal, four rounds, until the provosts come */
    b5_c5_factor:{title:'The clerk\'s tent', style:'b5_c5_keep', dark:true, warrenText:'Brans Keep at night · the Holds look the other way', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..t.....","......t.","........","....t...","........",".t......","......t.","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_collector',4,1],['b5_bully',2,2],['b5_bully',5,1],['b5_bully',3,0],['b5_bully',5,0]], xp:160, after:'b5_c5_factor_after',
      objective:{type:'survive', rounds:4, text:'Cudgels at the clerk\'s tent; nobody killed. Hold them four rounds, until the battalion\'s provosts come.'},
      preText:()=>`Five men in good boots and plain cloaks come into the Sixth's lines as if they had every right to, and one of them has a list. They are not looking for the squad. They are looking for a clerk with an oilskin case, and they have cudgels to ask him with.`} },

  foes:{
    /* the deserters' leader in the burned farm's barn */
    b5_c5_deserterboss:{name:'The deserters\' leader', sig:'L', kind:'b5_c5_deserterboss', hp:24, ac:14, atk:5, dmg:[1,8,2], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'cuts at'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b5_c5_cacheblade:{name:'A cache shortsword, still in grease', slot:'weapon', role:'blade', who:null, atk:1,
      line:'A Letherii issue shortsword out of a buried jar, wrapped in greased cloth with the cache\'s clay seal still on the cord. It has never been drawn in anger, and it is sharper than anything that has. +1 to hit.'},
    b5_c5_cachebow:{name:'A cache bow, unstrung', slot:'weapon', role:'ranged', who:null, atk:1,
      line:'A plain yew bow lashed to a bark tube with a waxed string inside it, and the cache\'s seal on the lashing. The army buries them dry and unstrung, and they come up straight. A bow, not a crossbow: Lether has no crossbows. +1 to hit.'},
    b5_c5_housemail:{name:'The house\'s scale', slot:'armour', role:'mail', who:null, ac:1,
      line:'Bright new scale on a padded coat, off the counting-house\'s wagons at Brans Keep, with a small stamp of a scale-balance inside the collar where only the wearer sees it. It is better scale than the army\'s. It was meant to be. +1 armour.'},
    b5_c5_girth:{name:'A Bluerose girth-strap, cut through', slot:'trinket', role:'any', who:null, stat:{guile:1},
      line:'A leather girth-strap with an iron buckle, from a Letherii courier\'s Bluerose saddle on the road south. It did not wear through. It was cut most of the way through on the inside, where the eye never goes, by a hand that knew where the eye never goes. Whoever carries it has learned the same. +1 Guile.'} },

  scenes:{
    b5_c5_burned:{loc:'The road south', sub:'The burned country', cap:'Fields burned to the root on both sides of a straight road, black to the hedges, and smoke on the horizon.', amb:'explore'},
    b5_c5_cache:{loc:'The road south', sub:'A burned copse · a milestone', cap:'A milestone in a burned copse, a quartermaster\'s cut in its side, and clay jars coming up out of the ash.', amb:'explore'},
    b5_c5_arrival:{loc:'Brans Keep', sub:'From the north road · dusk', cap:'The keep squat against its cliff, the lake grey on one side, the dry channel on the other, and the army\'s tents spread in front.', amb:'explore'} },

  end:{
    sign:['The house', 'The Sixth walked south from High Fort through country burned to the root, past a cache somebody had already emptied and a press-gang at a crossroads, and armed itself out of a second cache in a burned copse. At Brans Keep the Whitefinders were waiting: the battalion had burned that road itself, on its retreat from First Reach. The Sixth rejoined it. A Letheras counting-house was buying soldiers\' paybooks for coin and kit, and the Sixth signed. The house\'s scale is better than the army\'s, and the house\'s interest is one part in ten.'],
    refuse:['The army\'s book', 'The Sixth walked south from High Fort through country burned to the root, past a cache somebody had already emptied and a press-gang at a crossroads, and armed itself out of a second cache in a burned copse. At Brans Keep the Whitefinders were waiting: the battalion had burned that road itself, on its retreat from First Reach. The Sixth rejoined it. A Letheras counting-house was buying soldiers\' paybooks for coin and kit, and the Sixth said no. In Lether a refused offer is an open question, and that night the house asked it again, with cudgels.'] },
  endScene:'b5_c5_arrival',
  endCap:()=> b55Key() === 'sign' ? 'Brans Keep in the morning, the house\'s wagons standing in a row with new canvas on them, and the Sixth in the Whitefinders\' lines again.' : 'Brans Keep in the morning, the Sixth in the Whitefinders\' lines again, and the clerk asleep sitting up with the oilskin case in his arms.',
  tease:'Next: Brans Keep. The army of Lether, drawn up in front of its last great work, and the Edur coming down the road behind it.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b5_c5_key === 'sign') x.push('At Brans Keep the Sixth sold its paybooks to a Letheras counting-house for forty docks and the house\'s kit. The house charged its first interest at the signing.');
    if (f.b5_c5_key === 'refuse') x.push(`At Brans Keep the Sixth refused the counting-house, and the army kept its books.${f.b5_c5_nightDone ? ' That night the house\'s hired men came for the paybook case, and did not get it.' : ''}`);
    if (f.b5_c5_cache) x.push(f.b5_c5_rearmed ? 'In a burned copse the squad found the army\'s second cache by the cut on a milestone, and armed itself out of the jars.' : 'In a burned copse the squad found the army\'s second cache by the cut on a milestone.');
    if (f.b5_c5_markOk) x.push('The quartermaster taught the squad to read the cut on a milestone: water, linen and salve, a few paces off any road.');
    if (f.b5_pessaDone === 1 && b5In('pessa')) x.push('Pessa, a canal boatwoman pressed on the road, walks with the squad, with her boathook and her grievance.');
    else if (f.b5_pessaDone === 2) x.push('Pessa, pressed on the road south, walks with the refugee column for now. The roster can bring her in.');
    else if (f.b5_pessaDone === 0) x.push('The press-gang kept Pessa, and took her to another company.');
    if (f.b5_c5_farmDone) x.push('Deserters were digging in a burned farm off the road. The squad put them out of it.');
    if (f.b5_c5_ledger === 'burned') x.push('The press-gang\'s ledger went on the fire at the crossroads, and three refugees walked away unwritten.');
    if (f.b5_c5_girth) x.push('A courier\'s Bluerose girth-strap gave on the road. It had been cut.');
    if (b5In('ruuk')) x.push('Ruuk found the squad a road round every burned village he could.');
    if (b5In('brune')) x.push('Brune walked the burned road with her fish-spear, and said the ash was a kind of shore.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b5_c5_key === 'sign' && 'The Sixth\'s paybooks were sold to a Letheras counting-house at Brans Keep. The house holds the debts now, at one part in ten.',
    f.b5_c5_key === 'refuse' && 'The Sixth refused the counting-house at Brans Keep. The army keeps its books, in the clerk\'s case.',
    f.b5_c5_rejoined && 'The Whitefinders are at Brans Keep. They burned the road south on their retreat from First Reach. The Sixth has rejoined its battalion.',
    f.b5_c5_cache && 'The army hides stores along its roads: the first cache was dug out already, neatly. The second was not.',
    f.b5_trateFell && 'Trate has fallen, say the refugees on the road.',
    f.b5_breakaway && 'A Grass Jacket says a Finadd somewhere upriver has told the capital his garrison answers to nobody now.',
    f.b5_c5_grass && 'Second Maiden\'s Fort still holds, they say. Three companies of the frontier army are waiting on the frontier road.',
    f.b5_c5_girth && 'A courier\'s Bluerose saddle-girth gave on the road. Cut, not worn.',
    f.b5_c5_nerek && 'A Nerek family on the road knew the Sixth\'s name, from the river bank.',
    'The Sixth is on the road south from High Fort, through the burned country.'].filter(Boolean); },

  dlg:{
    /* ---- phase 1: the road south ---- */
    b5_c5_start:()=>({sp:'The road south', scene:'b5_c5_burned', fx:()=>{ S.f.b5_c5_ph ??= 1; },
      again:()=>`The road south, through the burned country. Black fields to the hedges, and the hedges black.`, txt:
`The first farm is burned to the root. So is the second, and the field between them, and the field on the other side of the road, black to the hedge-line and the hedges black too. The smoke has gone. The smell has not.

It was done carefully. The barns are down, the wells are fouled, the granaries are ash in neat squares, and on every gatepost somebody has nailed a board with the army's stamp burned into it, in case the fields want to know whom to complain to.

${b55Ran() ? `Up the road behind the Sixth, a long way back, the column of the disarmed comes on, and looks at the fields as it comes, and so does the Sixth, with its swords on.` : `The column of the disarmed walks through it in silence, five hundred soldiers without a sword between them, and the Sixth in the middle with its knives and its shields and its paybooks.`}

${b55Say({tobet:'Tobet looks at the boards on the gateposts, board after board. "Army stamp," he says, flat. "Somebody signed for this."', perrit:'Perrit reads the stamp on the nearest gatepost and does not say what she makes of it, which is unlike her.', thegg:'Thegg walks on the crown of the road, where the ash is thinnest, and does not look left or right.', _:'The squad walks.'})}`,
      ch:[b5TileChoice(5),
          {t:'Find the Finadd.', go:'b5_c5_ennic_road'},
          {t:'Walk on.', go:()=>startExplore()}]}),
    b5_c5_tiles:()=>b5TileOffer(5),
    b5_c5_card:()=>b5TileCard(5),
    b5_c5_tiles_done:()=>({sp:'The Tiles of the Holds', scene:'b5_road_south', txt:
`${S.f.b5_c5_drawn ? (S.f.b5_c5_reader === 'perrit' ? 'Perrit counts the tiles back into the pouch, wipes the ash off each one first with her sleeve, and ties the pouch twice.' : 'The tile-woman shakes the ash out of the oiled cloth, wraps the bone tiles in it, and the dock goes somewhere in her shawl.') : 'The tiles stay in the pouch.'} The road goes on south, black on both sides.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    b5_c5_ennic_road:()=>({sp:B5_FINADD.name, scene:'b5_c5_burned', fx:()=>{ S.f.b5_c5_ennicRoad = 1; },
      again:()=>`Finadd Ennic, with his book shut. "Brans Keep, Sergeant. That is where the road goes."`, txt:
`Finadd Ennic walks with his book under his arm and looks at the black fields as if they were a column of figures that will not add.

"Brans Keep," he says. "It is where the road goes, and it is where the army will be, if there is an army." He considers the nearest gatepost and its stamp. "The army burned this. Our army. So the Edur would find nothing to eat." He says it carefully, as if reading it back. "I understand the reasoning, Sergeant. I would have signed it." A pause. "I would rather not have walked through it afterwards."${b55Bare() ? `\n\nHe looks at the Sixth's empty belts. "The army hides stores along its roads," he says. "The quartermaster knows how they are marked. I have told him to look." He seems relieved to have found something to tell somebody.` : `\n\nHe looks back up the road, at the column of the disarmed coming on behind. "We are armed, and they are not," he says. "I keep writing it down. I do not know what it is evidence of."`}`,
      ch:[{t:'"Brans Keep, Finadd."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the first cache, at a milestone: dug out already, by somebody who knew exactly where to dig (never who) ---- */
    b5_c5_milestone:()=>({sp:'A milestone', scene:'b5_c5_cache', fx:()=>{ S.f.b5_c5_empty = 1; },
      again:()=>`The milestone, and the neat holes beside it, and the empty jars.`, txt:
`A milestone at the road's edge, a squat post of grey stone with the leagues to Brans Keep cut into it, and lower down, where nobody reads, a second cut: a short line and three notches, like a tally.

Beside it, four paces off in the ash, somebody has dug. Not a farmer's dig: a square hole, straight-sided, exactly where the cut says, and the clay jars lifted out and set in a row and opened and emptied. Water, linen, salve, kit. All of it gone. The seals are cut, not broken.

The quartermaster looks at the row of jars for a while. "That's the army's cache," he says. "That's the army's cut. Whoever dug it knew exactly where to dig." He does not say who he thinks it was. The squad lets it lie.${b55Say({tobet:'\n\n"Neat," Tobet says. "Neater than us." He does not make it sound like a compliment.', ruuk:'\n\nRuuk crouches at the hole and looks at the boot-marks round it, and then at the road, and then stands up. "Many men," he says. "Not long ago. Going south." That is all he will say about it.', _:''})}`,
      ch:[{t:'Go through the spoil, in case they missed something.', check:['wits', 12], req:()=>!S.f.b5_c5_spoilTried, fx:()=>{ S.f.b5_c5_spoilTried = 1; },
            edges:id=>[id === 'ammet' && ['she knows what a salve-jar looks like in pieces', 2], id === 'ruuk' && ['he reads a dig like a track', 1], id === 'pessa' && ['she has gone through a burned village for what was left', 1], id === 'thegg' && ['his hands are too big for broken clay', -1]],
            near:{t:()=>{ const w = b55Who(); return `Yes, but the jar ${b55Nm(w)} ${b55V(w, 'find', 'finds')} it in is in pieces, and the pieces go into ${b55Pos(w)} palm: cut, and bruised.`; }, fx:()=>bruise(b55Who(), bruiseN())},
            go:'b5_c5_spoil_ok', fail:'b5_c5_spoil_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_spoil_ok:()=>({sp:'A milestone', scene:'b5_c5_cache', fx:()=>{ if (!S.f.b5_c5_spoil) { S.f.b5_c5_spoil = 1; S.inv.salve = (S.inv.salve || 0) + 1; note('A salve, in waxed paper, out of the spoil.', 'good'); } }, txt:
`${by({sgt:'You find', _:'{who} finds'})} it under the last jar in the row, where it rolled when the jar was tipped: a salve in waxed paper, dry. Whoever dug here was neat, and in a hurry. The quartermaster writes it down as "recovered", which is a word he seems to like.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b5_c5_spoil_no:()=>({sp:'A milestone', scene:'b5_c5_cache', txt:
`There is nothing in the spoil but clay and ash. Whoever dug here was neat, and thorough, and did not leave a dock's worth behind. The quartermaster looks at the cut seals again, and puts one in his pocket, and does not say why.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* ---- refugees: a burned canal village's cart; Trate has fallen (headline); on Ch2 'dead', a Trate dockhand ---- */
    b5_c5_refugees:()=>({sp:'Refugees on the road', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_refugees = 1; S.f.b5_trateFell = 1; },
      again:()=>`The refugees' cart, its wheel in the ditch, and the family round it.`, txt:
`A cart with one wheel in the ditch and a family round it, pushing, and everything they own on it under a tarpaulin: a canal village's people, from north of the capital, burned out a week ago by their own army going past. They are not angry with the Sixth. They are past it. They are trying to get a wheel out of a ditch.

There are others behind them on the road, carts and handbarrows and people with bundles, and among them men and women off the coast road with a different story. "Trate," one of them says, when you ask. "Gone. From the sea, in a night." He does not want to say more than that, and does not. The road is full of people who do not want to say more than that.${b55Drowned() ? `\n\nA broad man in a docker's apron looks at the white fingertips on the Sixth's shields, and then at you. "Whitefinders," he says. "You were the ones carried the drowned out of the hulks, after the wave. With the Shake." He nods, once. "I'll remember it. For what that's worth on this road."` : ''}`,
      ch:[{t:'Put a shoulder to the cart.', check:['might', 13], req:()=>!S.f.b5_c5_cartTried, fx:()=>{ S.f.b5_c5_cartTried = 1; },
            edges:id=>[id === 'thegg' && ['he lifts the corner of it off the ground', 3], id === 'brune' && ['she has dragged boats up worse than a ditch', 1], id === 'pessa' && ['she knows a stuck barge from a stuck cart', 1], id === 'perrit' && ['she is small, and the cart is not', -1]],
            near:{t:()=>{ const w = b55Who(); return `Yes, but the wheel comes up all at once and the cart's tail comes round into ${b55Pos(w)} hip: wrenched, and bruised.`; }, fx:()=>bruise(b55Who(), bruiseN())},
            go:'b5_c5_cart_ok', fail:'b5_c5_cart_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_cart_ok:()=>({sp:'Refugees on the road', scene:'b5_road_south', fx:()=>{ if (!S.f.b5_c5_cart) { S.f.b5_c5_cart = 1; b55L('thegg', 1); } }, txt:
`The wheel comes out of the ditch with a noise like a cork, and the cart is on the road again, and the family is round it saying something in canal cant that is either thanks or blame, or both. An old woman on the tailboard gives ${by({sgt:'you', _:'{who}'})} a dried apple out of her apron, solemnly, as if paying a debt. It is the only food on the road that nobody has written down.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b5_c5_cart_no:()=>({sp:'Refugees on the road', scene:'b5_road_south', txt:
`The wheel will not come. In the end a dozen of the column of the disarmed, who have nothing in their hands to carry, come over and lift the cart out by its sides, and set it on the road, and go back to walking. The family says something in canal cant. The road has no breath left to answer it.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* ---- a Grass Jacket on the verge: the breakaway Finadd upriver (never named, never placed); Second Maiden's Fort; three companies ---- */
    b5_c5_grass:()=>({sp:'A Grass Jacket on the verge', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_grass = 1; S.f.b5_breakaway = 1; },
      again:()=>`The Grass Jacket on the verge, with his boots off. "Answers to nobody."`, txt:
`A Grass Jacket is sitting on the verge with his boots off and his feet in the ash, which is warm. He ran at High Fort, with the rest of the brigade, and he has been walking ever since, and he would like everyone to know he is not proud of either.

"Talk on the road," he says, when you sit. "Want it? It's free. Nothing else is." He counts it off on his fingers. "Second Maiden's Fort still holds, they say. Three companies of the frontier army are waiting on the frontier road for the Edur, like three companies were a wall." He snorts. "And there's a Finadd upriver, somewhere, with a garrison, who's sent word to the capital that his garrison answers to nobody now. Not the King, not the Preda." He shakes his head. "There's always a first to say it."

He looks at his feet. "Don't ask me where. I don't know where. Upriver. Everybody says upriver."${b55If('thegg', `\n\nThegg looks at the man's helm, with its strip of green cloth. "You ran," he says, not unkindly. "So did I, once." The Grass Jacket looks up at him for a while, and nods, and puts his boots back on.`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the courier: a Bluerose saddle that fails (cut, not worn); rule 37: Bluerose is a conquered horse country, nothing more ---- */
    b5_c5_courier:()=>({sp:'A courier, on foot', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_courier = 1; if (!S.f.b5_c5_girth) { S.f.b5_c5_girth = 1; gain('b5_c5_girth'); } },
      again:()=>`The courier, walking south with his dispatch-case and no horse.`, txt:
`A courier came down the road at a canter a quarter of an hour ago, on a fine grey horse, with a dispatch-case on a strap across his chest, shouting for the road. The road made way for him. Two hundred paces on, his saddle came off sideways, with him on it, and the horse went on south without him, faster, as if relieved.

He is sitting in the ash at the road's edge now, holding his arm, with the saddle beside him and the girth-strap still buckled to it. "Bluerose," he says, when you come up. "Bluerose horse, Bluerose saddle, Bluerose officers to teach us to sit them. We hadn't a horse in the kingdom till we took Bluerose." He looks down the road after the grey. "Now we've horses that go on without us."

He unbuckles the strap and throws it at you. "Keep it. I'll not ride on that again."`,
      ch:[{t:'Look at the strap.', check:['wits', 13], req:()=>!S.f.b5_c5_strapTried, fx:()=>{ S.f.b5_c5_strapTried = 1; },
            edges:id=>[id === 'pessa' && ['she knows leather that has been cut from leather that has given', 2], id === 'ruuk' && ['his people make their own straps', 1], id === 'tobet' && ['he has mended harness on a tenant farm', 1], id === 'perrit' && ['she has never been near a horse, and would like to keep it that way', -1]],
            near:{t:()=>{ const w = b55Who(); return `Yes, but the courier wants a witness's name for his report, and the Finadd gives him ${b55Pos(w)}, and then ${b55Nm(w)} ${b55V(w, 'spend', 'spends')} the rest of the halt walking him to the surgeon's cart: no rest at the fire on this stretch of the road.`; }, fx:()=>{ S.f.b5_c5_rest1 = 1; }},
            go:'b5_c5_girth_cut', fail:'b5_c5_girth_worn'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_girth_cut:()=>({sp:'A courier, on foot', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_cut = 1; }, txt:
`The strap did not wear through. ${by({sgt:'You turn', _:'{who} turns'})} it over: on the outside it is good leather, oiled. On the inside, where it lies against the horse and no rider ever sees it, it has been cut most of the way through with a sharp knife, a long time ago, so that it would hold for a while, and then not.

The courier looks at it. He goes a little white. "That's not wear," he says. He has nothing more to say about Bluerose for the rest of the time he walks with the Sixth, which is until the surgeon's cart, and then he is gone.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b5_c5_girth_worn:()=>({sp:'A courier, on foot', scene:'b5_road_south', txt:
`It is a girth-strap. It has given. Saddles fail, on long roads. The courier gets up, holding his arm, and goes looking for the surgeon's cart, and the Sixth keeps the strap, because he did not want it.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* ---- Ch3 'warn': a Nerek family among the refugees knows the Sixth's name from the river bank. Ammet's scene; nothing is settled. ---- */
    b5_c5_nerek:()=>({sp:'A Nerek family', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_nerek = 1; if (b5In('ammet')) b55L('ammet', 1); },
      again:()=>`The Nerek family by their cart, the grandmother with her hand on the wheel.`, txt:
`A Nerek family walks beside a handcart with nothing much on it: a grandmother, two women, children, a man with a hauler's shoulders. They do not walk with the other refugees. The other refugees do not walk with them. That is how it has always been on Letherii roads, and the burned country has not changed it.

The grandmother looks at the white fingertips on the Sixth's shields a while, and then she says something to the man, and the man comes over. "Whitefinders," he says. "The Sixth?" When you nod, he says, "At the river. A runner came up the bank in the night, before the fire. From the Sixth. Word goes along a river." He does not say what came of it.

${b5In('ammet') ? `Ammet goes to the grandmother, and kneels in the ash by the wheel, and they talk for a while, very low, in a language Ammet's own grandmother spoke half of. The rest of the squad keeps back. When Ammet comes back she has her roll of tools under her arm and her face shut. "She had a sister in the villages," she says. "She doesn't know." That is all, and the squad lets it be all.` : `The grandmother looks at the Sixth a while longer, and puts her hand on the cart-wheel, and the family goes on south. Nothing is settled.`}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the press-gang at work: Pessa, the recruit (the claim, the fight, or let them keep her). Her ledger line stands whatever. ---- */
    b5_c5_pressgang:()=>({sp:'The crossroads', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_metPress = 1; },
      again:()=>`The crossroads, the press-gang's cart, the ledger on the tailboard, and Pessa with her boathook upright.`, txt:
`At a crossroads where an inn has burned, a press-gang has stopped the refugee column. It is a sergeant with a ledger open on a cart-tail and four soldiers with cudgels, and it is doing what press-gangs do, which is write. Anyone who can stand and is not a child goes past the cart-tail and comes away with a jack over one arm and a name in the book.

One of them will not go past. She is a lean woman with a burn-scar down one cheek and a canal boathook held upright beside her like a pole, and she is telling the press sergeant, in canal cant, very specific canal cant, what the army did to her village a week ago, and what it can do with its jack.

"Name," the press sergeant says, writing. "Pessa," she says. He writes it wrong. She watches him write it wrong. "And the jack," he says, "and the boots, and today's ration. A hundred and twenty docks against you, woman, and the army wants its kit back if you die in it." He has not looked up once.

"I am not a soldier," she says, loud, to the whole crossroads. "I am a woman with a boathook and a grievance."${b55Ran() ? `\n\nThe press sergeant sees the Sixth's swords and spears, and looks somewhere else. Armed soldiers are not pressed. He knows it, and so do you.` : `\n\nThe press sergeant sees the Sixth coming, and the empty belts, and looks at them with real interest. "High Fort's," he says. "Disarmed. Men without swords are men, Sergeant, and men are what I'm short of." Then he sees the clerk's oilskin case, and the white fingertips, and makes a face like a man doing a sum.`}${b55Drowned() ? `\n\nIn the column behind him, the broad dockhand from Trate is watching, with his arms folded.` : ''}`,
      ch:[{t:'"She\'s the Sixth\'s. We were a hand short at High Fort." Claim her.', check:['guile', 14], req:()=>!S.f.b5_c5_claimTried, fx:()=>{ S.f.b5_c5_claimTried = 1; },
            edges:id=>[id === 'sgt' && ['you know a paybook from a press ledger to the dock', 2], id === 'tobet' && ['he knows how an Indebted\'s line is written', 1], b55Drowned() && ['the Trate dockhand says the Sixth carried the drowned', 2], b55Ran() && ['the Sixth is armed, and armed soldiers are not pressed', 2]],
            near:{t:'Yes, but the press sergeant takes your name for his book, with the date, and a dock out of your purse "for the trouble of the ink".', fx:()=>{ S.f.b5_c5_named = 1; if ((S.silver || 0) > 0) { S.silver -= 1; updSilver(); } }},
            go:'b5_c5_claim_ok', fail:'b5_c5_claim_no'},
          {t:'"Take her off them." Shields up.', go:()=>startBattle('b5_c5_press', {})},
          {t:'"The army\'s business. Leave it." Let the press-gang keep her.', go:'b5_c5_let'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_claim_ok:()=>({sp:'The press sergeant', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_claimed = 1; S.f.b5_c5_pressDone = 1; }, txt:
`The press sergeant looks at the clerk's oilskin case, which the clerk is holding out like a warrant, and at the Finadd behind it, who has his book open, and at the white fingertips${b55Drowned() ? ', and at the dockhand from Trate, who has said his piece loudly to the whole crossroads' : ''}. He does the sum.

"Sixth Company," he says. "Whitefinders." He draws a line through something in his ledger, neatly, and writes beside it. "She's yours, then. Her line stands, mind. The jack, the boots, the ration. The army has a copy." He shuts the ledger. "The army always has a copy."

Pessa looks at the line, and at you, and at the Sixth, with an expression the squad will come to know.`,
      ch:[{t:'"Walk with us."', go:'b5_c5_pessa'}]}),
    b5_c5_claim_no:()=>({sp:'The press sergeant', scene:'b5_road_south', txt:
`"No," the press sergeant says. "Nice try." He puts his ledger down on the cart-tail, carefully, with a stone on it against the wind, and picks up a cudgel. "Disarmed men, armed men, I don't care whose paybook. She's in my book." His four come round the cart.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c5_press', {})}]}),
    b5_c5_press_after:()=>({sp:'The crossroads', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_pressWon = 1; S.f.b5_c5_pressDone = 1; }, txt:
`The press-gang sits in the ash by its own cart, nursing what the Sixth gave it, and nobody is dead, which on the King's road is the rule. The press sergeant looks at his ledger, lying on the cart-tail with a stone on it, and then at you.

"Go on, then," he says. "It's yours. It won't do her any good. The army has a copy." He spits. "But there's three more in there I wrote this morning. They'd walk, if the book was ash."

Three refugees at the edge of the crowd are looking at the ledger very hard, and at nothing else.`,
      ch:[{t:'Burn it.', fx:()=>{ S.f.b5_c5_ledger = 'burned'; b55L('pessa', 1); b55L('tobet', 1); }, go:'b5_c5_ledger_burn'},
          {t:'Give it to the clerk.', fx:()=>{ S.f.b5_c5_ledger = 'kept'; }, go:'b5_c5_ledger_keep'}]}),
    b5_c5_ledger_burn:()=>({sp:'The crossroads', scene:'b5_road_south', txt:
`The ledger goes on what is left of the inn's fire, and burns like any other book. The three refugees watch until the last page curls, and then walk away up the road, quickly, without a word, unwritten.

Pessa's line is not cleared by it. The army has a copy. She knows it. She watches it burn anyway, with her boathook upright beside her, and when it is ash she turns round to you.

"I'll come," she says. "Since I'm written down either way. I would rather be written down by people who burn books."${b55If('tobet', `\n\nTobet watches the ash after everyone else has stopped. "That's the first ledger I've seen burn," he says. "It was smaller than I thought."`)}`,
      ch:[{t:'"Walk with us."', go:'b5_c5_pessa'}]}),
    b5_c5_ledger_keep:()=>({sp:'The crossroads', scene:'b5_road_south', txt:
`The clerk takes the press-gang's ledger in both hands and puts it in the oilskin case with the Sixth's paybooks, where it will be looked after properly, and the three refugees at the edge of the crowd go back to looking at the road.

Pessa watches it go into the case. "So I'm in two books now," she says. "That's a promotion, on the canal." She turns round to you. "I'll come. Since I'm written down either way."`,
      ch:[{t:'"Walk with us."', go:'b5_c5_pessa'}]}),
    b5_c5_let:()=>({sp:'The crossroads', scene:'b5_road_south', fx:()=>{ S.f.b5_pessaDone = 0; S.f.b5_c5_pressDone = 1; S.f.b5_c5_let = 1; }, txt:
`The press sergeant finishes writing, and Pessa goes past the cart-tail with a jack over her arm that is two sizes too big, and her boathook upright, and joins a file of the pressed going east toward another company. She keeps her face to the road. She has decided the Sixth is not worth it.

The press sergeant blots the line and shuts his book. "Obliged, Sergeant," he says.${b55If('tobet', `\n\nTobet watches the file go. "A hundred and twenty," he says, flat. "For those boots." He looks at the road. "I'd have argued."`)}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* Pessa joins: one recruit walks at a time; if one walks already, she waits at the refugee column or walks instead */
    b5_c5_pessa:()=>{ const r = b5Recruit_(), full = b5Room() <= 0;
      return {sp:'Pessa', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_pressDone = 1; S.f.b5_c5_metPessa = 1; },
        again:()=>`Pessa, at the crossroads, with her boathook upright.`, txt:
`Pessa looks the Sixth over, one soldier at a time, the way a bargewoman looks over a crew she has been sold with the barge.

"I poled grain on the canals north of the capital," she says. "Till the army came back down the road burning what it couldn't carry, and my village was on its list. I've a boathook and a short knife and a jack that isn't mine, and a hundred and twenty docks against a name that's spelled wrong." She shrugs. "I'm not a soldier. Point me at something."${full && r ? `\n\nThere is room in the Sixth's file for one more who is not a soldier, and ${NAME(r)} is it.` : ''}`,
        ch:[{t:'"Walk with us."', req:()=>!full, fx:()=>{ b5Join('pessa'); if (b5In('pessa') && b5In('thegg')) S.f.b5_c5_pack = 1; }, go:'b5_c5_pessa_join'},
            {t:`"Walk with us, instead of ${r ? NAME(r) : 'the one who walks'}. ${r ? b5He(r).replace(/^./, c => c.toUpperCase()) : 'They'} can walk with the company's followers."`, req:()=>full && !!r, fx:()=>{ b5Join('pessa'); b5SwapIn('pessa'); if (b5In('pessa') && b5In('thegg')) S.f.b5_c5_pack = 1; }, go:'b5_c5_pessa_join'},
            {t:'"Walk with the refugee column for now. We know where to find you."', fx:()=>{ if (b5Room() <= 0) b5Join('pessa'); else b55Wait(); }, go:'b5_c5_pessa_wait'},
            {t:'"The Sixth can\'t take you."', fx:()=>{ S.f.b5_pessaDone = 0; }, go:'b5_c5_pessa_no'}]}; },
    b5_c5_pessa_join:()=>({sp:'Pessa', scene:'b5_road_south', txt: b5In('pessa') ?
`"Good," Pessa says, as if she had won an argument, and perhaps she has.

The company clerk writes her into the Sixth's paybooks on the cart-tail, a new line under the others: *Pessa*, spelled right this time, and a hundred and twenty docks beside it, copied from the press-gang's figure. She reads it upside down as he writes it, and reads it again when he turns the book round. "That's my line," she says. "I'll be watching it."${S.f.b5_c5_pack ? `\n\nThegg picks up her pack, which is a sack with a strap, and puts it on his own shoulder with his own, and walks on. He does not ask. Pessa opens her mouth to say something about it, and shuts it again, and walks on beside him with her boathook upright.` : ''}${b5Waiting('brune') ? `\n\nBrune shoulders her sealskin roll and goes back to walk with the company's followers, where the roster can find her. "It is all one road," she says. "From there or from here."` : b5Waiting('ruuk') ? `\n\nRuuk shrugs and goes back to walk with the army's scouts, where the roster can find him. "I will find you a road round the next village anyway," he says. "Shout."` : ''}` :
`Pessa counts the squad on her fingers, and laughs, short. "No room," she says. "You've your six. I'll be with the refugees. Shout when you want a boathook."`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b5_c5_pessa_wait:()=>({sp:'Pessa', scene:'b5_road_south', txt:
`"For now," Pessa says. "That's the army's favourite word." She goes back to the refugee column with her boathook upright. The clerk writes her into the paybooks anyway, on a page of her own, against the day, with the hundred and twenty beside her name.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b5_c5_pessa_no:()=>({sp:'Pessa', scene:'b5_road_south', txt:
`"Then I'm a refugee with a line against me," Pessa says. "There's a lot of us." She goes back up the road to the column with her boathook upright, and by the next halt she is gone into it, and nobody in it says where.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b5_c5_pessa_again:()=>({sp:'Pessa', scene:'b5_road_south', again:()=>`Pessa, at the refugee column. "Sergeant."`, txt:
`Pessa is walking with the refugee column with her boathook upright, arguing with a carter about the right way to load a handcart, and winning. "Sergeant," she says, and waits.`,
      ch:[{t:'"Walk with us now."', req:()=>b5Waiting('pessa') && (b5Room() > 0 || !!b5Recruit_()), fx:()=>{ b5SwapIn('pessa'); }, go:'b5_c5_pessa_join'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_pressgang_again:()=>({sp:'The crossroads', scene:'b5_road_south', again:()=>`The crossroads, and the burned inn.`, txt:
`${S.f.b5_c5_let ? 'The press-gang has moved on east with its file of the pressed. The crossroads is a burned inn and a signpost.' : S.f.b5_c5_pressWon ? 'The press-gang has gone on east, without its ledger, rubbing its bruises. The crossroads is a burned inn and a signpost, and a patch of ash that was a book.' : 'The press-gang has gone on east with its cart and its ledger, writing as it goes. The crossroads is a burned inn and a signpost.'}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the quartermaster: salves at six docks; on the road, and at the battalion's carts ---- */
    b5_c5_qm:()=>({sp:'The quartermaster', scene:b55Ph() >= 2 ? 'b5_c5_arrival' : 'b5_road_south', fx:()=>{ S.f.b5_c5_qm = 1; },
      again:()=>`The quartermaster, counting. "Salves, six. The Edur haven't changed the price."`, txt: b55Ph() >= 2 ?
`The quartermaster has found the battalion's carts and the battalion's quartermaster, and the two of them are standing over a list with their heads together like men at a deathbed. "Salves, six docks," he says, without looking up. "The battalion's or mine, same price. Some things the war doesn't change."` :
`The quartermaster walks beside his one cart with the Sixth's stores on it, which is what the Edur left him: salves, linen, a sack of meal, and a pot of clay tokens he will not explain yet. His salves are in a dry crate, in waxed paper.

"Six docks," he says. "The Edur took the swords and left me the salves. I don't know what that says about the Edur." He writes something down. "Or the salves."`,
      ch:[{t:'A salve.', tag:'6 docks', req:()=>(S.silver || 0) >= 6, fx:()=>{ S.silver -= 6; S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for six docks.', 'good'); }, go:'b5_c5_qm'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the tile-woman: she reads when Perrit doesn't */
    b5_c5_tilewoman:()=>({sp:'The tile-woman', scene:b55Ph() >= 2 ? 'b5_c5_arrival' : 'b5_road_south', fx:()=>{ S.f.b5_c5_tw = 1; }, txt:
`The tile-woman walks with the company's followers at the back of the Sixth, with her bag of oiled cloth over her shoulder and her shawl over her head against the ash. She spits to one side when you come over.

${b5In('perrit') ? `"Your mage reads," she says. "Good. This road's had enough of me." She looks at the black fields. "Bone burns too, you know. I've seen it."` : `"No mage," she says. "Then it's bone, and it's a dock, and it's ash to lay them on, which is honest." She shakes the bag, and it clicks. "Sit, if you want it."`}`,
      ch:[Object.assign(b5TileChoice(5), {req:()=>!b5In('perrit') && !S.f.b5_c5_drawn && !S.f.b5_c5_noCard}),
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the second cache, in a burned copse: the trick, and the rearming on 'hold' ---- */
    b5_c5_copse:()=>({sp:'A burned copse', scene:'b5_c5_cache', fx:()=>{ S.f.b5_c5_copse = 1; },
      again:()=>`The burned copse, and the milestone in it${S.f.b5_c5_cache ? ', and the holes where the jars were' : ', with its cut'}.`, txt: S.f.b5_c5_cache ?
`The burned copse off the road, the milestone in it with its quartermaster's cut, and four square holes in the ash where the jars came up. The quartermaster has filled one back in, out of habit.` :
`Off the road, a copse of trees burned to black poles, and in the middle of it, where no road runs any more, an old milestone, leaning: the road moved, once, and the stone did not. Low on its side there is a cut, a short line and two notches and a hook.

The quartermaster stops dead in front of it${S.f.b5_c5_empty ? ', and looks back up the road at the other milestone, the empty one, and then at this' : ''}. "That's not been dug," he says. He walks four paces from the stone, then two to the left, and stamps, and the ash under his boot rings hollow. "That has not been dug." He looks almost happy.

He looks round at the squad. "The cut. Every quartermaster knows it. Hardly any soldier does, which is the point." He considers you. "I could show you. It'll be no use to anybody once the war's over, and it won't be over."`,
      ch:[{t:'"Show us." (the Quartermaster\'s Mark)', check:['wits', 16], trick:'b5_c5_mark', req:()=>!S.f.b5_c5_cache && !S.f.b5_c5_markTried, fx:()=>{ S.f.b5_c5_markTried = 1; },
            edges:id=>[id === 'ammet' && ['she has stocked a surgeon\'s cart from army stores', 2], id === 'pessa' && ['she knows the marks the canal-men cut on a lock-post', 1], id === 'ruuk' && ['his people mark their trails', 1], id === 'tobet' && ['he counts paces the way he counts arrows', 1], id === 'thegg' && ['he reads tavern slates, not milestones', -1]],
            near:b55Owe(6, 'A cache-jar broken in the digging', w => `Yes, but the first jar comes up cracked, and the water goes into the ash, and the quartermaster writes the jar against ${b55Pos(w)} line: ${b5Coin(6)}.`, {t:w => `Yes, but the first jar's seal is a blade-edge of fired clay, and it opens ${b55Pos(w)} thumb to the bone: cut, and bruised.`, fx:w => bruise(w, bruiseN())}),
            go:'b5_c5_mark_ok', fail:'b5_c5_mark_no'},
          {t:'"Dig."', req:()=>!S.f.b5_c5_cache, go:'b5_c5_cache'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_mark_ok:()=>({sp:'A burned copse', scene:'b5_c5_cache', fx:()=>{ S.f.b5_c5_markOk = 1; }, txt:
`He shows ${by({sgt:'you', _:'{who}'})} with his finger in the cut. The line is the road. The notches are paces, fours of them. The hook says which side. "Every road in Lether," he says, "and every one of them marked the same. Water, linen, salve, then kit, in that order, deepest last." He taps the stone. "Get the first jar open and the linen going round, and you can stand up again in a fight. That's what it's for. Not sorcery. Stores."

${by({sgt:'You find', _:'{who} finds'})} the jars by the cut alone, without his help, the second time of asking. He looks satisfied, which on him is a small thing about the eyes.${b55If('ammet', `\n\nAmmet is already counting the linen. "Clean," she says. "Boiled, and dried, and buried. One person in the army thinks about wounds." She sounds surprised, and grudging, and pleased.`)}`,
      ch:[{t:'"Dig."', go:'b5_c5_cache'}]}),
    b5_c5_mark_no:()=>({sp:'A burned copse', scene:'b5_c5_cache', txt:
`The cut stays a scratch on a stone. Four paces, two to the left, and the hook means something, and none of it adds up in the ash the way it does in his head. The quartermaster takes pity, in the end, and stamps on the place again.

"Takes a year," he says. "I'll show you at the next stone. If there's a next stone with anything under it."`,
      ch:[{t:'"Dig."', go:'b5_c5_cache'}]}),
    b5_c5_cache:()=>({sp:'The second cache', scene:'b5_c5_cache', fx:()=>{ if (S.f.b5_c5_cache) return; S.f.b5_c5_cache = 1; S.inv.salve = (S.inv.salve || 0) + 2; note('Two salves, out of the cache.', 'good');
        if (S.f.b5_disarmed) { const got = b5Rearm(['b5_c5_cacheblade', 'b5_c5_cachebow']); S.f.b5_c5_rearmed = 1; S.f.b5_c5_rearmedWith = got; }
        gain('b5_c5_cacheblade'); gain('b5_c5_cachebow'); }, txt:
`The jars come up out of the ash one after another, clay, sealed with clay, the size of a child: water, sweet; linen, boiled and dried; salve in waxed paper; and, deepest, wrapped in greased cloth and lashed to bark tubes, the army's kit. Shortswords. Bows, unstrung, with their strings in the tubes.

${S.f.b5_c5_rearmed ? `The Sixth arms itself out of the jars, standing in a burned copse at the side of a road, one soldier at a time, while the quartermaster writes down every piece against every name, because somebody will want it written down. It is not everything the Edur took. It is enough to stop being a column of men with knives.${b55Say({tobet:`\n\nTobet strings a cache bow, and draws it, and lets it down slowly. "Straight," he says. "Buried straight and came up straight." He sounds as if it is the first good news in a week, which it is.`, thegg:'\n\nThegg takes a shortsword out of its grease and wipes it on the ash, and holds it, and puts it through his belt without a word.', _:''})}` : `The Sixth is armed already. The quartermaster takes the swords and the bows anyway, and the salves and the linen, and writes them all down as "recovered", and loads them on his cart, and looks at the column of the disarmed coming on behind with an expression you have never seen on a quartermaster before, which is generosity. "For Brans Keep," he says. "They'll be needed there."`}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* ---- the burned farm, off the road (optional) ---- */
    b5_c5_farmlane:()=>({sp:'A lane off the road', scene:'b5_c5_burned', again:()=>`The lane to the burned farm, and the smoke from its barn.`, txt: S.f.b5_c5_farmDone ?
`The lane to the burned farm. Nothing moves in it now.` :
`A lane goes off the road to a farm that the burning did not finish: walls still standing, a barn with its roof fallen in, and smoke from the barn that is not old. There are men in there, and they have lit a fire, and is not hiding it, which means they do not think anybody will come.${b55If('tobet', `\n\nTobet shades his eyes. "Five in the yard," he says. "Army cloaks. No flashes." He lets his hand down. "Deserters."`)}`,
      ch:[{t:'Down the lane.', req:()=>!S.f.b5_c5_farmDone, onward:true, go:()=>{ startExplore('b5_c5_farm'); talk('b5_c5_farm_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_farm_arrive:()=>({sp:'A burned farm', scene:'b5_c5_burned', txt:
`The farmyard, black, with the house's walls standing round nothing and the barn at the top of the yard. A spade is stuck in the ash by the well, and a hole beside it, and another, and another: somebody is digging for what the family buried before it went south, and has not found it yet.

From the barn, a voice, and laughter, and the clink of a bottle.${b55Bare() ? `\n\nThe Sixth has knives, and its shields, and whatever comes out of the ash: a fence-post, a hay-fork with the tines burned off. ${b55Say({thegg:'Thegg picks up a charred gatepost and weighs it, and seems content.', _:'It will have to do.'})}` : ''}`,
      ch:[{t:'Up the yard.', go:()=>startExplore()}]}),
    b5_c5_well:()=>({sp:'The well', scene:'b5_c5_burned', again:()=>`The well, fouled, and the holes in the ash round it.`, txt:
`The well, with its windlass burned off and a dead sheep in it, put there on purpose by the army going past, so the water would be no use to anybody coming after. The holes the deserters dug are all round it, each one a little further out than the last, and none of them has found anything.${b55If('pessa', `\n\nPessa looks into the well and away again. "They did ours like that," she says. "Ours had a dog in it." That is all.`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_barn:()=>({sp:'The barn', scene:'b5_c5_burned', again:()=>`The barn door, black, and the yard in front of it.`, txt: S.f.b5_c5_farmDone ?
`The barn, empty now, with the deserters' fire kicked out on its floor.` :
`The barn door stands open on a black inside. The yard in front of it has five men in it now, come out at the sound of boots: army cloaks with the flashes cut off, three swords, two bows, and the look of men who have decided that whatever they were before High Fort they are not it any more.

"Whitefinders," one of them says, and laughs, not well. "${b55Bare() ? 'With knives.' : 'Come for your stores?'}" He spits. "There's nothing here. We looked."`,
      ch:[{t:'"Whitefinders. Put them down."', req:()=>!S.f.b5_c5_farmDone, go:()=>startBattle('b5_c5_farm', {})},
          {t:'Round behind the house\'s wall, and at the bows first.', check:['wits', 14], req:()=>!S.f.b5_c5_farmDone,
            edges:id=>[id === 'ruuk' && ['he reads ground, and a burned yard is ground', 2], id === 'tobet' && ['he is where the blow is not', 1], id === 'pessa' && ['she keeps low', 1], id === 'thegg' && ['there is no wall in this yard that hides Thegg', -2]],
            near:{t:()=>{ const w = b55Who(); return `Yes, but the house's wall is still hot on the inside, and ${b55Nm(w)} ${b55V(w, 'go', 'goes')} along it with a hand on it: burned, and bruised.`; }, fx:()=>bruise(b55Who(), bruiseN())},
            go:()=>startBattle('b5_c5_farm', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c5_barn_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_barn_seen:()=>({sp:'The barn', scene:'b5_c5_burned', txt:
`A charred beam gives under a boot with a crack like a branch. All five of them turn at once, and the two with bows already have arrows on the string.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c5_farm', {surprise:'e'})}]}),
    b5_c5_farm_after:()=>({sp:'A burned farm', scene:'b5_c5_burned', fx:()=>{ if (!S.f.b5_c5_farmDone) { S.f.b5_c5_farmDone = 1; b55Docks(12, 'the deserters\' purse, army pay they took with them'); } }, txt:
`The leader goes down in the barn's black straw and stays down, and the two with him go out through the back wall where it has fallen, and across the field, and do not stop.

In the leader's coat there is a purse, and in the purse is army pay, a quarter's worth, the kind that goes out to companies on pay-day and that these men took with them when they walked away from theirs. The clerk, fetched, counts it, and writes it as "recovered", and looks at you, and then writes it again as the squad's.

Behind the barn, under a stone the deserters never lifted, is what the family buried before it went south: a box with a christening cup in it, and a lock of hair in paper, and nothing else worth a dock. The squad puts the stone back.${b55If('ammet', `\n\nAmmet goes round with her linen. "Hold still," she says. "Hold still. You fought with a fence-post. I saw."`)}`,
      ch:[{t:'Back down the lane.', go:()=>startExplore()}]}),
    b5_c5_farm_back:()=>({sp:'The lane', scene:'b5_c5_burned', txt: S.f.b5_c5_farmDone ?
`The lane back to the road, and the column going past at its end.` :
`The lane back to the road. Behind you the barn's smoke goes up, and somebody in it laughs again.`,
      ch:[{t:'Back to the road.', onward:true, go:()=>b55Back()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the clerk and the pay desk ---- */
    b5_c5_clerk:()=>({sp:'The company clerk', scene:b55Ph() >= 2 ? 'b5_c5_arrival' : 'b5_road_south', html:debtHTML('The Sixth Company · the road south'), fx:()=>{ S.f.b5_c5_clerk = 1; },
      again:()=>`The clerk, with the case held to his chest.`, txt:
`The company clerk walks with the oilskin case held to his chest in both arms, through country where every gatepost has the army's stamp on it, and looks at each stamp as he passes it, as if checking it against something.

"Every farm on this road was on a list," he says, quietly, when you fall in beside him. "A hand wrote the list. A hand signed it. A hand ticked them off." He holds the case tighter. "I would like to think it was not a clerk. It was a clerk." He walks a while. "I can still take a payment on a line, Sergeant. That has not changed."`,
      ch:[{t:'The pay desk.', go:'b5_c5_pay'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_pay:()=>({sp:'The clerk\'s case · the pay desk', scene:b55Ph() >= 2 ? 'b5_c5_arrival' : 'b5_road_south', html:debtHTML('The Sixth Company · the road south'), again:()=>`The pay desk. The clerk's pen is wet, and the squad has ${b5Coin(S.silver || 0)} in hand.`, txt:
`The clerk opens the oilskin case on whatever is flat: a cart-tail, a milestone, his own knee. "Anything the squad pays down out of its own docks, I write as paid, today," he says. "The holders get it at the quarter, from the battalion's paymaster.${b55Key() === 'sign' ? ' The house, now. The house gets it.' : ''}" He wets the pen. "The war has not changed the arithmetic, Sergeant. I find that a comfort. I am not sure I should."`,
      ch:b5PayChoices(b55Ph() >= 2 ? 'b5_c5_keepfire' : 'b5_c5_fire')}),

    /* ---- the road's fire, in the lee of a burned wall (the Token Auction goes here, from 89; keep the id) ---- */
    b5_c5_fire:()=>({sp:'The fire on the road', scene:'b5_road_south', again:()=>`The fire in the lee of the burned wall, and the black fields beyond it.`, txt:
`The Sixth's fire on the road, made in the lee of a burned farmhouse wall out of the farm's own fence, which is the only wood on the road that nobody has a claim on any more. The wall still holds the day's heat, and some of the fire's. Beyond it the fields go away black to the hedges in every direction.${b55If('pessa', () => `\n\nPessa sits with her back to the warm wall and her boathook upright beside her, and reads her own line in the clerk's book upside down from across the fire.`)}${b55If('ruuk', `\n\nRuuk sits on the wall's top, which nobody else will, and watches the road north.`)}${b55If('brune', `\n\nBrune sits with her bare feet in the warm ash at the edge of the fire, the nearest thing to sand for a hundred leagues.`)}`,
      ch:[b5TileChoice(5),
          {t:'Sit an hour. Let the squad rest.', req:()=>!S.f.b5_c5_rest1, fx:()=>{ S.f.b5_c5_rest1 = 1; b5Rest('The squad sits an hour against the warm wall, out of the wind and the ash. Wounds close, mostly.'); }, go:'b5_c5_fire_rest'},
          {t:'The pay desk, at the clerk\'s case.', go:'b5_c5_pay'},
          {t:'Talk with the squad.', go:'b5_c5_fire_talk'},
          {t:'Pessa asks Perrit to read for somebody.', req:()=>b5In('pessa') && b5In('perrit') && !S.f.b5_c5_husband, go:'b5_c5_husband'},
          {t:'South, to Brans Keep.', req:()=>b55Ready(), onward:true, go:'b5_c5_onward'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_fire_rest:()=>({sp:'The fire on the road', scene:'b5_road_south', txt:
`An hour against a warm wall, with the column going past on the road and nobody asking the Sixth for anything.

${b55Say({ammet:`Ammet goes round the squad and looks at feet, and at hands, and says "Hold still" to anyone who moves. She does not drink the quartermaster's spirit when it comes round. She does not know when the next fight is, and so she assumes it is tomorrow.`, thegg:`Thegg lies down in the lee of the wall with his shield over his face against the ash, and is asleep before the shield has settled.`, _:'One of them sleeps. The others watch the road north.'})}${b55If('tobet', `\n\nTobet counts his arrows, then his debts, then his arrows, and cuts a notch in the tally-stick, and puts it away.`)}${S.f.b5_c5_pack && b5In('pessa') && b5In('thegg') ? `\n\nThegg has put Pessa's pack down beside his own. He has carried it all day without being asked, and she has let him, and neither of them has said anything about it.` : ''}`,
      ch:[{t:'Back to the fire.', go:'b5_c5_fire'}]}),
    b5_c5_fire_talk:()=>{ const ln = [];
      if (b5In('tobet')) ln.push(`Tobet is looking at the black fields. "My grandfather's plough," he says. "Somewhere in Lether. Nine hundred docks of it." He thinks. "If it was up this road, it's ash. Does the debt burn with it?" He knows the answer. He asks anyway.${b5In('pessa') ? ` Pessa, across the fire, says, "No." He nods. "No," he agrees.` : ''}`);
      if (b5In('thegg')) ln.push(`Thegg is talking low in his mother's tongue at the edge of the firelight, to his mother's people's dead. When he sees you listening he stops. "My mother's people kept groves once," he says. "Old ones in stone, under the trees, off the roads. There are still a few. An old man keeps each one quiet." He looks at the black fields. "I hope they did not burn the groves. Nobody sane wants the old ones woken." He does not say which, or where, and you do not ask.`);
      if (b5In('perrit')) ln.push(`Perrit is doing sums in her small book by the firelight. "Every farm on this road," she says, "a granary, a barn, a house, the fields. The army will pay the holders for them out of the King's purse, at the quarter." She closes the book. "Or it will not, and the holders will want it from the farmers, who are on the road, Indebted to somebody for the ground they are walking on." She looks at the road. "The arithmetic is perfectly clear. That is what I cannot forgive it."`);
      if (b5In('ammet')) ln.push(b5In('pessa') ? `Ammet is boiling her needles, and Pessa is holding the lamp for her, close and steady, without being asked. Ammet looks at the lamp, and at Pessa, and goes on boiling. Later she says, to nobody, "That one has sense." It is the highest thing she has said about anybody since Letheras.` : `Ammet is boiling her needles over the fire. "Burns," she says. "On the road, all day. Children who went back for something." That is all she says about it. She goes on boiling.`);
      if (b5In('ruuk')) ln.push(`Ruuk is on the wall's top, looking north. "No birds," he says. "There is nothing for them to eat now. They have gone south ahead of everybody." He thinks. "Birds know first, then Faraed, then armies." He grins, but not much.`);
      if (b5In('brune')) ln.push(`Brune has her feet in the warm ash. "It is a kind of shore," she says. "Everything on it is going to be taken back. Slowly, by the rain." She considers it. "The Shore is patient. This is too patient for me."`);
      if (b5In('pessa')) ln.push(`Pessa reads her line in the clerk's book, out loud, from across the fire, upside down: "*Pessa*. A hundred and twenty." She sniffs. "Spelled right, at least. The press-gang had me with two esses at the end." She looks at the fire. "My husband couldn't spell either. It never did him any harm." That is all she says about her husband, and she says it as plainly as the price of the boots.`);
      return {sp:'The fire on the road', scene:'b5_road_south', fx:()=>{ if (b5In('pessa') && b5In('ammet')) S.f.b5_c5_lamp = 1; }, txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b5_c5_fire'}]}; },
    /* Pessa asks Perrit to read for her dead husband; Perrit lies about one tile, and never tells anyone (only if both are present; the
       narrator never says which tile) */
    b5_c5_husband:()=>({sp:'Perrit and Pessa', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_husband = 1; b55L('pessa', 1); }, txt:
`Pessa sits down across the fire from Perrit, very straight, as people sit for a clerk. "You read the tiles," she says. "Read for a man. He's gone. On the canal, before all this." She does not say how. "I'd like to know if he's somewhere."

Perrit looks at her for a while. Then she takes out the calfskin pouch, and lays the black tiles out on a flat stone by the fire, carefully, the way the school lays them, and reads them, one at a time, out loud, in her clerk's voice: what each is, and which Hold, and what it says.

She reads every one of them true but one. You see her hand stop over it, and go on.

"He is somewhere," Perrit says, at the end. "The tiles are quite clear about it." Pessa nods, once, and gets up, and goes to sit with her back to the wall. Perrit puts the tiles back in the pouch one at a time, with her face shut, and never tells anyone which one it was.`,
      ch:[{t:'Back to the fire.', go:'b5_c5_fire'}]}),

    /* ---- the way on: south to Brans Keep, once the cache is dug and the press-gang settled ---- */
    b5_c5_south:()=>({sp:'The road south', scene:'b5_road_south', again:()=>`The road going on south, black on both sides.`, txt: b55Ready() ?
`The road goes on south, straight, black on both sides, toward the hills and the lake country and Brans Keep. The column is strung out along it as far as you can see.` :
`The road goes on south. ${!S.f.b5_c5_pressDone ? 'There is a crowd at the crossroads behind you, and a press-gang at work in it, and the Sixth will have to go past it either way.' : ''}${!S.f.b5_c5_cache ? ` ${b55Bare() ? 'And the Sixth has knives. The quartermaster says the army hides stores along its roads, and that there will be a cache within a league that nobody has dug.' : 'The quartermaster says the army hides stores along its roads, and that there will be a cache within a league that nobody has dug.'}` : ''}`,
      ch:[{t:'South, to Brans Keep.', req:()=>b55Ready(), onward:true, go:'b5_c5_onward'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_onward:()=>({sp:'The road south · the last day', scene:'b5_road_south', fx:()=>{ S.f.b5_c5_learned = 1; }, again:()=>`The last day of the road, and the hills ahead.`, txt:
`Two more days of it. The same road, straight, the same black on both sides, the same boards nailed to the same gateposts with the same stamp.

On the second day the Sixth catches up with men who were burning. Not the act: the end of it, a day old, a village of forty houses gone to grey on a slope above the road, and a picket of soldiers on the road below it in blue-grey, with white fingertips painted on their shield-bosses.

Whitefinders. The rear picket of the battalion, left on the road to bring in stragglers. They see the Sixth's shields at the same time the Sixth sees theirs, and for a moment neither file knows what to say.

"The Sixth," the picket's sergeant says, at last. "From High Fort. You're alive." He looks up at the grey village, and back at you, and says it plainly, because there is no other way to say it. "We were recalled north, from the exercises at First Reach. Then the fort went. We were ordered south to Brans Keep instead, and to leave nothing behind us the Edur could eat." He does not look at the village again. "Orders. We left nothing."

${b55Say({tobet:`Tobet looks at the white fingertip on the picket sergeant's shield, and at the one on his own, and back. Nothing, for a while. Then: "It was signed for," he says, flat. "I said so."`, thegg:'Thegg looks at the grey village, and at the picket, and stops talking, which in Thegg is anger.', _:'The squad keeps walking. There is nothing in the arithmetic to say.'})}`,
      ch:[{t:'On, to Brans Keep, with the picket.', req:()=>S.area !== 'b5_c5_keep', onward:true, go:()=>{ S.f.b5_c5_ph = 2; startExplore('b5_c5_keep'); talk('b5_c5_arrive'); }},
          {t:'On, to Brans Keep, with the picket.', req:()=>S.area === 'b5_c5_keep', onward:true, fx:()=>{ S.f.b5_c5_ph = 2; }, go:'b5_c5_arrive'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 2: Brans Keep; the Whitefinders are there; the Sixth rejoins its battalion ---- */
    b5_c5_arrive:()=>({sp:'Brans Keep', scene:'b5_c5_arrival', fx:()=>{ if (!S.f.b5_c5_rejoined) { S.f.b5_c5_rejoined = 1; if (S.f.b5_disarmed) { b5Rearm(['b5_c5_cacheblade', 'b5_c5_cachebow']); S.f.b5_c5_rearmed = 1; } b55Docks(10, 'the battalion\'s road-money for the Sixth, three weeks owing'); } },
      again:()=>`The Whitefinders' lines across the dry channel, and Brans Keep against its cliff.`, txt:
`The road comes over the last rise at dusk and there it is: Brans Keep, squat and grey against its cliff, facing north, with barren hills behind it. Lake Brans lies on one side of it, grey and very still. On the other, a long dry channel runs away north-east, a seasonal drainage course with nothing in it but stones.

And in front of the keep, spread over the field in lines and lines of tents, the army of Lether, or what is left of it, with its banners, and its fires coming out one at a time in the dusk. On the right, across the dry channel, a battalion with white fingertips painted on its shield-bosses.

The Whitefinders are at Brans Keep.

The Sixth comes in across the channel at the picket's tail, and is looked at, and counted, and written into the battalion's book by a battalion clerk who seems very surprised to be writing it. The battalion's commander does not come over. Word comes from his tent by a runner: the Sixth is welcome, the Sixth will draw from the battalion's carts, and the battalion's paymaster owes the Sixth three weeks' road-money, which he pays, in docks, into Finadd Ennic's hand, with a receipt.

Down the field, at the carts by the keep's walls, High Fort's other survivors are being rearmed by the hundred and sent wherever a battalion is short. Word along the carts is that the Artisans have taken a whole column of them. The Sixth does not go and look.${b55Say({perrit:`\n\nPerrit looks at the keep, and the lake, and the channel, and the hills, and does a sum, under her breath, and does not finish it.`, ruuk:`\n\nRuuk looks at the hills behind the keep. "Good hills," he says. "For running into." Then, seeing your face: "I only say."`, _:''})}`,
      ch:[{t:'Find the Finadd.', go:'b5_c5_ennic_keep'},
          {t:'Walk the lines.', go:()=>startExplore()}]}),
    b5_c5_ennic_keep:()=>({sp:B5_FINADD.name, scene:'b5_c5_arrival', fx:()=>{ S.f.b5_c5_ennicKeep = 1; },
      again:()=>`Finadd Ennic, with the battalion's receipt in his book. "The factor, Sergeant."`, txt:
`Finadd Ennic has the paymaster's receipt folded into his book, and looks better than he has since the Landing: the battalion is here, and has a commander, and the commander decides things.

"Except this," he says. He nods down the lines, toward a group of wagons outside them with new canvas on, and a man in a good coat standing by them with a ledger open, and a clerk holding an umbrella over the ledger, though it is not raining. "A factor from a counting-house in Letheras. The house is buying soldiers' paybook debts from the army, for coin and kit, to rearm the burned-out companies quickly. The army is selling. The commander says each Finadd may decide for his own company." He looks pained. "Decide. Sergeant, you know I would rather sign than decide."

He looks at you. "So I will ask you what to sign, and sign it."

There is talk in the lines of a bounty from the King for every soldier who stands here. Nothing is written yet. Ennic does not believe in anything that is not written yet.`,
      ch:[{t:'Talk to the factor.', req:()=>!b55Key(), go:'b5_c5_factor'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_regular:()=>({sp:'A Whitefinder of the Second', scene:'b5_c5_arrival', fx:()=>{ S.f.b5_c5_regular = 1; },
      again:()=>`The Whitefinder of the Second Company, painting his boss.`, txt:
`A soldier of the battalion's Second Company is sitting on a cask outside his tent with a pot of white paint and a brush, touching up the fingertip on his shield-boss. He looks up as the Sixth goes past. "The Sixth," he says. "You were at High Fort. While we were—" He looks at the brush. "On the road."

He paints a while. "Why the finger? Nobody knows. My sergeant says it's for the Errant. His sergeant said it was for counting." He holds the shield up and looks at it. "I know what it's for this month. It's so you can tell us from the ones who did it, from a long way off. Except we're the ones who did it." He puts the shield down.${b55If('tobet', `\n\nTobet looks at the paint, and at his own boss, which is chipped. He holds out his shield. The man of the Second touches up the fingertip on it without a word, and gives it back.`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the house's factor: the offer ---- */
    b5_c5_factor:()=>({sp:'The house\'s factor', scene:'b5_c5_arrival', fx:()=>{ S.f.b5_c5_offer = 1; },
      again:()=>`The factor, with his ledger open under the umbrella. "The house's terms, Sergeant."`, txt:
`The factor is a neat man of about fifty in a coat that has come a long way from Letheras and does not show it. His clerk holds the umbrella. His ledger is open on a folding desk. He has a pleasant face, and uses it.

"The Sixth Company," he says. "Whitefinders. High Fort." He turns a page and finds you already written down, which he seems to think you will find reassuring. "The house buys your company's paybook debts from the army, at a price the army likes. In return, the company has forty docks today, in hand, as an advance, and the house's kit off these wagons: new scale, sergeant, not cache-grease. The house holds your lines from tonight. Interest at the house's rate, one part in ten, charged at the signing, and then at the quarter."${b55Fine() ? `\n\nHe turns another page. "And the house sees there are fines-court lines on five of your soldiers, from Letheras: three hundred docks, for a Tarthenal's assault without cause. The house will buy those from the court at half, and write them off at half. The house likes a clean book."` : ''}

He smiles. "Everybody in Lether owes somebody, Sergeant. The house only asks to be the somebody."`,
      ch:[{t:'Take it to the Finadd.', go:'b5_c5_key'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_factor_again:()=>({sp:'The house\'s factor', scene:'b5_c5_arrival', again:()=>`The factor, writing. "A pleasure, Sergeant."`, txt: b55Key() === 'sign' ?
`The factor is writing the Sixth into the house's books in a clean hand, line by line, from the clerk's copy. "A pleasure, Sergeant," he says, without looking up. "The house is very easy to deal with, once one is dealing with it."` :
`The factor is writing in his ledger under the umbrella. "The Sixth has declined," he says pleasantly, when he sees you. "I have written it down." He turns a page. "In Lether, Sergeant, a declined offer is only an open question."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the key: sign the paybooks to the house, or refuse */
    b5_c5_key:()=>({sp:'The Finadd and the factor', scene:'b5_c5_arrival', again:()=>`The factor's desk, the clerk's case, and the Finadd waiting with his pen.`, txt: b55Key() ?
`It is decided. ${b55Key() === 'sign' ? 'The house holds the Sixth\'s paybooks.' : 'The army keeps the Sixth\'s paybooks.'}` :
`Finadd Ennic stands at the factor's desk with his pen, and the company clerk stands beside him with the oilskin case held to his chest so hard his knuckles are white. "Sergeant," Ennic says, and waits for you to put something in front of him.${b55Say({tobet:`\n\nTobet is at the edge of the lamplight. "The army bought my grandfather's debt," he says, very quietly, "and me with it. Now the army sells it on." He looks at the factor. "I would like it written down somewhere that I noticed."`, _:''})}${b55If('perrit', `\n\nPerrit has read the factor's terms upside down, twice. "Forty in hand, the kit, one part in ten," she says. "${b55Fine() ? 'And the fine at half. ' : ''}The terms are not bad." She sounds annoyed about it. "That is the trouble with them."`)}${b55If('thegg', `\n\nThegg looks at the factor, a long way down, and at the umbrella. "My mother's tab," he says. "Does the house buy that too?" The factor looks at his ledger. "It does," he says. Thegg considers this, and leaves it there.`)}${b55If('pessa', `\n\nPessa has her boathook upright. "Sell me twice in a week," she says. "The press-gang wrote me down for the boots, and now a house buys the boots." She looks at you. "Your call, Sergeant. I'd only say no."`)}${b55If('ruuk', `\n\nRuuk is looking at the wagons. "My grandmother said the Letherii write everything down so they can sell it," he says. He seems to find it interesting rather than anything else.`)}${b55If('brune', `\n\nBrune shrugs. "The harbour took my boat. A house takes the debt for it. It is the same water."`)}`,
      ch:[{t:'"Sign it, Finadd. Forty docks and new scale, and the house can have the paper."', req:()=>!b55Key(), fx:()=>{ S.f.b5_c5_key = 'sign'; S.f.b5_holder = 'house'; b55L('tobet', -2); b55L('perrit', 1); b55L('pessa', -1); }, go:'b5_c5_sign'},
          {t:'"No. The army keeps the books. We arm from the army\'s stores."', req:()=>!b55Key(), fx:()=>{ S.f.b5_c5_key = 'refuse'; S.f.b5_holder = 'army'; b55L('tobet', 2); b55L('pessa', 1); b55L('perrit', -1); }, go:'b5_c5_refuse'},
          {t:'"Not yet."', req:()=>!b55Key(), go:()=>startExplore()},
          {t:'Not now.', req:()=>!!b55Key(), go:()=>startExplore()}]}),
    /* 'sign': +40 docks advance and the house's kit; on Ch1 'pay' the fine lines bought at half; then the house's first interest */
    b5_c5_sign:()=>({sp:'The house\'s factor', scene:'b5_c5_arrival', fx:()=>{ if (S.f.b5_c5_signed) return; S.f.b5_c5_signed = 1;
        b55Docks(40, 'the house\'s advance to the Sixth'); gain('b5_c5_housemail');
        if (b55Fine()) Object.entries(B55_FINE).forEach(([id, n]) => { if ((id === 'sgt' || b5In(id) || (S.camp || []).includes(id)) && !(S.dead && S.dead[id]) && b5Debt(id) > 0) b5Forgive(id, Math.min(b5Debt(id), Math.floor(n / 2)), 'the house bought the fine at half'); });
        b5Debtors().forEach(id => { const n = Math.ceil(b5Debt(id) / 10); if (n > 0) b5Owe(id, n, 'the house\'s first interest'); }); }, txt:
`"Sign it," you say, and Finadd Ennic signs it, in his neat hand, at the foot of the factor's page, with something on his face like relief.

The company clerk opens the oilskin case in front of strangers for the first time since Letheras, and the factor's clerk copies every line in it, name by name, dock by dock, into the house's ledger, while the house's carters unload scale and sword-belts and new boots from the wagons onto the grass. The factor counts forty docks into Ennic's hand${b55Fine() ? ', and writes off half the fines court\'s lines with a single neat stroke, and then, on the next page, writes the house\'s first interest on every line in the book' : ', and then, on the next page, writes the house\'s first interest on every line in the book'}, one part in ten, and blots it.

"A pleasure," he says. "The house is very easy to deal with, once one is dealing with it."${b55If('tobet', `\n\nTobet watches his line go into the house's book. "I have been sold twice now," he says, flat. He says it to the road.`)}${b55If('perrit', `\n\nPerrit reads the house's page over the factor's shoulder. "Not bad," she says. "Not good. Not bad." She writes the figure in her own book anyway.`)}${b55If('pessa', `\n\nPessa watches her line copied across, a hundred and twenty and the house's tenth on top. "They've bought the boots," she says. "I'd like the boots to know."`)}`,
      ch:[{t:'The house\'s kit, and the night.', onward:true, fx:()=>{ S.f.b5_c5_ph = 3; }, go:'b5_c5_night'},
          {t:'Not now.', go:()=>startExplore()}]}),
    /* 'refuse': the army keeps the books; the quartermaster's old stores; Tobet shows Pessa her ledger line */
    b5_c5_refuse:()=>({sp:'The house\'s factor', scene:'b5_c5_arrival', fx:()=>{ if (S.f.b5_c5_refused) return; S.f.b5_c5_refused = 1; if (b5In('tobet') && b5In('pessa')) S.f.b5_c5_ledgerShown = 1; }, txt:
`"No," you say. Finadd Ennic writes *The Sixth declines* at the foot of the factor's page, in his neat hand, and signs it, which is the kind of deciding he can do.

The factor looks at the line. He does not seem put out. "As the Sixth wishes," he says, and closes his ledger, and his clerk moves the umbrella. "In Lether, Finadd, a declined offer is only an open question." He tips his hat. "Good evening."

The company clerk closes the oilskin case and holds it to his chest, and it is a while before he lets go of it enough to walk. The Sixth draws its kit from the battalion's carts instead: the cache pieces, what the quartermaster had, and the battalion's old stores, some of them older than Ennic.${S.f.b5_c5_ledgerShown && b5In('tobet') && b5In('pessa') ? `\n\nAfterwards, by the fire, Tobet sits down by Pessa with the clerk's book open across his knees, and shows her how her line is written: the name, the figure, the date, the holder, the column where the payments go. "So you can watch it," he says. "Every pay-day. Out loud, if you like." Pessa reads the line twice. "Out loud," she says.` : ''}`,
      ch:[{t:'The night.', onward:true, fx:()=>{ S.f.b5_c5_ph = 3; }, go:'b5_c5_night'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the battalion's carts, the north road, the wagons ---- */
    b5_c5_carts:()=>({sp:'The battalion\'s carts', scene:'b5_c5_arrival', again:()=>`The battalion's carts, and the battalion's quartermaster with his list.`, txt:
`The battalion's carts stand in a row by the channel's lip, with the battalion's quartermaster and the Sixth's at the tailboards, comparing lists. There is less on the carts than on the lists. There always is.${b55Key() === 'sign' ? ' The house\'s scale has gone out to the Sixth already, and the battalion\'s quartermaster looks at it the way a farmer looks at another man\'s horse.' : ''}`,
      ch:[{t:'"The Sixth is owed the better pieces, quartermaster."', check:['guile', 13], req:()=>!S.f.b5_c5_cartsTried, fx:()=>{ S.f.b5_c5_cartsTried = 1; },
            edges:id=>[id === 'sgt' && ['you know what a company is owed to the dock', 2], id === 'perrit' && ['she can read his list upside down', 1], id === 'pessa' && ['she talks back for a living', 1], id === 'thegg' && ['he is very large and the carts are very small', -1]],
            near:b55Owe(8, 'The battalion\'s stores, drawn against a name', w => `Yes, but the battalion's quartermaster writes the better pieces against ${b55Pos(w)} line, "until the Sixth's own quartermaster settles": ${b5Coin(8)}.`, {t:w => `Yes, but the battalion's quartermaster wants to talk about it, and ${b55Nm(w)} ${b55V(w, 'lose', 'loses')} the evening to him: no rest at the fire tonight.`, fx:w => { S.f.b5_c5_rest2 = 1; }}),
            go:'b5_c5_carts_ok', fail:'b5_c5_carts_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_carts_ok:()=>({sp:'The battalion\'s carts', scene:'b5_c5_arrival', fx:()=>{ if (!S.f.b5_c5_carts) { S.f.b5_c5_carts = 1; S.inv.salve = (S.inv.salve || 0) + 1; note('The battalion\'s stores: a salve, and the better straps.', 'good'); } }, txt:
`The battalion's quartermaster looks at his list, and at ${by({sgt:'you', _:'{who}'})}, and at the Sixth's quartermaster, who nods, very slightly. "The Sixth was at High Fort," the battalion's man says, to nobody. He finds a salve at the bottom of a crate, and a coil of good straps, and puts them in ${by({sgt:'your', _:'{who}\'s'})} hands. "Don't tell the Second."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b5_c5_carts_no:()=>({sp:'The battalion\'s carts', scene:'b5_c5_arrival', txt:
`"Everybody's owed the better pieces," the battalion's quartermaster says. "That's why there aren't any." He goes back to his list.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b5_c5_north:()=>({sp:'The north road', scene:'b5_c5_arrival', again:()=>`The north road, going back up into the dusk.`, txt:
`The north road, the way the Sixth came: up the slope from the channel, and over the rise, and back through the burned country to High Fort and the frontier. There is still a file of stragglers coming down it in the dusk, a few at a time. Behind them, somewhere, unhurried, the Edur.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_wagonline:()=>({sp:'The wagons', scene:'b5_c5_arrival', again:()=>`The wagons at the edge of the lines.`, txt: b55Key() === 'sign' ?
`The house's wagons stand in a row outside the Whitefinders' lines, with the house's mark on the canvas: a scale-balance, very neat. They are lighter by the Sixth's kit, and not by much. Whoever is out on the dark field will want what is left in them.` :
`Wagons at the edge of the lines: the battalion's, and further out, with new canvas and a scale-balance painted on it, the house's.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the keep's fire (a second roster fire): a rest, the pay desk, the squad, the night ---- */
    b5_c5_keepfire:()=>({sp:'The Sixth\'s fire at Brans Keep', scene:'b5_c5_arrival', again:()=>`The Sixth's fire in the Whitefinders' lines${b55Ph() >= 3 && !S.f.b5_c5_nightDone ? ', and the dark coming down' : ''}.`, txt:
`The Sixth's fire among the Whitefinders' tents, with the battalion's fires all round it in lines, and the army's beyond those, more fires than anybody in the squad has ever seen in one place, all the way to the keep's black walls and the lake.${b55Ph() >= 3 && !S.f.b5_c5_nightDone ? ' Night is coming down over the channel, and with it the feeling that something is going to happen tonight that has nothing to do with the Edur.' : ''}${b55If('pessa', `\n\nPessa sits with her back to a cart-wheel, which is the nearest thing to a wall, with her boathook upright beside her.`)}${b55If('ruuk', `\n\nRuuk is looking at the hills behind the keep, the way he looks at any hill.`)}${b55If('brune', `\n\nBrune is looking at the lake, the way she looks at any water.`)}`,
      ch:[{t:'Sit an hour. Let the squad rest.', req:()=>!S.f.b5_c5_rest2, fx:()=>{ S.f.b5_c5_rest2 = 1; b5Rest('The squad sits an hour by its own fire in its own battalion\'s lines, which is more than it has had since Letheras. Wounds close, mostly.'); }, go:'b5_c5_keep_rest'},
          {t:'The pay desk, at the clerk\'s case.', go:'b5_c5_pay'},
          {t:'Talk with the squad.', go:'b5_c5_keep_talk'},
          {t:'The factor\'s offer. The Finadd is waiting.', req:()=>!b55Key(), onward:true, go:'b5_c5_key'},
          {t:'The night.', req:()=>!!b55Key() && !S.f.b5_c5_nightDone, onward:true, fx:()=>{ S.f.b5_c5_ph = 3; }, go:'b5_c5_night'},
          {t:'The morning.', req:()=>!!S.f.b5_c5_nightDone, onward:true, go:'b5_c5_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c5_keep_rest:()=>({sp:'The Sixth\'s fire at Brans Keep', scene:'b5_c5_arrival', txt:
`An hour by a fire with the battalion all round it. The Second Company's cook comes over with a pot of something and leaves it, and asks nothing about High Fort, which is the kindest thing anybody in the battalion has managed so far.${b55If('ammet', `\n\nAmmet looks at the pot, and smells it, and eats it, which from Ammet is an endorsement.`)}`,
      ch:[{t:'Back to the fire.', go:'b5_c5_keepfire'}]}),
    b5_c5_keep_talk:()=>{ const ln = [], k = b55Key();
      if (b5In('tobet')) ln.push(k === 'sign' ? `Tobet is not talking. He is cutting a notch in his tally-stick, and then another, and then looking at the two notches. "One for the army buying me," he says. "One for the house." He puts it away.` : k === 'refuse' ? `Tobet is almost cheerful, for Tobet. "Nobody bought me today," he says. "I'll write that down. It's the first day in a while."` : `Tobet is looking at the factor's wagons. "Everybody wants to buy the paper," he says. "Nobody wants to buy the plough."`);
      if (b5In('thegg')) ln.push(`Thegg is looking at the keep against its cliff. "My mother's people would have liked this place," he says. "A wall at your back. A lake at your side." He thinks about it. "They would not have liked the army in front of it."`);
      if (b5In('perrit')) ln.push(k === 'sign' ? `Perrit is reading the house's terms again in her own book, where she copied them. "One part in ten at the signing," she says, "and one part in ten at the quarter. It is perfectly fair." She shuts the book. "I would like it to be less perfectly fair."` : `Perrit is looking at the keep's corner towers. "There will be mages on those," she says. "Battalion cadre, and the keep's. They will link them." She does not finish the thought, and her hand goes to the tile pouch at her hip and stays there.`);
      if (b5In('ammet')) ln.push(`Ammet has found the battalion's surgeons, and come back. "Eleven of them," she says. "For the battalion. They have needles." She sounds faintly put out to have nothing to give anybody.`);
      if (b5In('ruuk')) ln.push(`Ruuk is lying on his back looking at the stars over the hills. "In the hills behind the keep there are good places to hide," he says. "I looked." He turns his head. "I always look, Sergeant. It is my work."`);
      if (b5In('brune')) ln.push(`Brune is looking at the lake. "It does not go to the sea," she says. "I asked. It goes nowhere." She seems to find this troubling. "Still water. The Shore does not come here."`);
      if (b5In('pessa')) ln.push(`Pessa is reading her line in the clerk's book, out loud: "*Pessa*. A hundred and twenty.${k === 'sign' ? ' The house\'s tenth.' : ''}" She looks at the battalion's fires. "So this is the army," she says. "The one that burned my village." She considers it. "It's smaller than I thought, close up."`);
      return {sp:'The Sixth\'s fire at Brans Keep', scene:'b5_c5_arrival', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b5_c5_keepfire'}]}; },

    /* ---- phase 3, the night: the key fight ---- */
    b5_c5_night:()=>{ const k = b55Key() || 'refuse';
      return {sp:'Brans Keep · night', scene:'b5_c5_arrival', fx:()=>{ S.f.b5_c5_ph = 3; }, again:()=> k === 'sign' ? `The house's wagons in the dark outside the lines.` : `The clerk's tent in the dark, and men in good boots coming.`, txt: S.f.b5_c5_nightDone ?
`The night is over, nearly. The lines are quiet.` : k === 'sign' ?
`That night the house sends a man to the Sixth's fire with a lantern and a purse: the house's wagons stand outside the Whitefinders' lines, with the house's kit on them, and the house would take it kindly if the Sixth stood by them until morning, at ten docks. "There are deserters on the field," the man says. "From the frontier. They know what's on wagons."

Ennic signs for it. The Sixth goes out past the last of the battalion's tents to the row of wagons in the dark, with a Whitefinder of the picket, and waits. An hour after the moon goes down, something moves on the field.` :
`That night, late, the company clerk comes to the Sixth's fire with the oilskin case in his arms and his face very white. "There are men in the lines," he says. "Not ours. Not the battalion's. Good boots. They asked a man of the Second where the Sixth's clerk sleeps." He holds the case tighter. "He told them. He thought they were the house's. They are the house's."

In Lether, a refused offer is an open question. Five men in good boots and plain cloaks come round the end of the Sixth's tents in the dark, unhurried, and one of them has a list.`,
        ch:[{t:k === 'sign' ? '"Whitefinders. Off the wagons."' : '"Whitefinders. Round the clerk."', req:()=>!S.f.b5_c5_nightDone, go:()=>startBattle(k === 'sign' ? 'b5_c5_wagons' : 'b5_c5_factor', {})},
            {t:k === 'sign' ? 'Out into the dark field, round behind them.' : 'Into the dark between the tents, and onto them first.', check:['wits', 14], req:()=>!S.f.b5_c5_nightDone && !S.f.b5_c5_nightTried, fx:()=>{ S.f.b5_c5_nightTried = 1; },
              edges:id=>[id === 'ruuk' && ['he reads dark ground', 2], id === 'tobet' && ['he is where the blow is not', 1], id === 'pessa' && ['she keeps low', 1], id === 'thegg' && ['the dark was not made for Thegg', -2]],
              near:{t:()=>{ const w = b55Who(); return `Yes, but a tent-rope takes ${b55Nm(w)} at the ankle in the dark, and ${b55Nm(w)} ${b55V(w, 'go', 'goes')} into the fight with ${b55Pos(w)} heart going like a drum: rattled.`; }, fx:()=>b55Rattle(b55Who())},
              go:()=>startBattle(k === 'sign' ? 'b5_c5_wagons' : 'b5_c5_factor', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c5_night_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c5_night_seen:()=>{ const k = b55Key() || 'refuse';
      return {sp:'Brans Keep · night', scene:'b5_c5_arrival', txt:
`A tent-pole goes over with a noise like a door slamming. ${k === 'sign' ? 'Out on the field every shape in the dark turns at once, and comes on running.' : 'The five men in good boots turn at once, and the one with the list puts it away and takes out a cudgel.'}`,
        ch:[{t:'Shields.', go:()=>startBattle(k === 'sign' ? 'b5_c5_wagons' : 'b5_c5_factor', {surprise:'e'})}]}; },
    b5_c5_wagons_after:()=>({sp:'The house\'s wagons', scene:'b5_c5_arrival', fx:()=>{ if (!S.f.b5_c5_nightDone) { S.f.b5_c5_nightDone = 1; b55Docks(10, 'the house\'s fee for a night by its wagons'); } }, txt:
`The last of them goes away across the dark field toward the hills, and does not come back. The wagons stand. One of them has an arrow in its canvas, through the house's painted scale-balance, exactly in the middle.

The house's man comes out at dawn with his lantern and his purse, and counts ten docks into your hand, and looks at the arrow in the canvas for a while. "The house will want that canvas mended," he says. Then, seeing your face: "At the house's charge, Sergeant. At the house's charge."${b55If('pessa', `\n\nPessa pulls the arrow out of the canvas and looks at it. "Army arrow," she says. "Army deserter, shooting at a house's wagon, to steal back the army's kit the army sold." She snaps it. "Lether."`)}`,
      ch:[{t:'Back to the fire.', go:()=>{ startExplore('b5_c5_keep'); talk('b5_c5_keepfire'); }}]}),
    b5_c5_factor_after:()=>({sp:'The clerk\'s tent', scene:'b5_c5_arrival', fx:()=>{ S.f.b5_c5_nightDone = 1; S.f.b5_c5_paybookKept = 1; }, txt:
`The battalion's provosts come at a run with lanterns, at the end, and the men in good boots are suddenly men who were lost among the tents, looking for a friend, and very sorry. The provosts write their names down. The names are not the house's. Nothing on them is the house's. The provosts let them go at dawn.

The company clerk sits on the ground in front of his tent with the oilskin case in his lap and both arms round it, and does not get up till the sun is on the tents.

In the morning the factor comes past the Sixth's lines on his way to the wagons, with his clerk and the umbrella, and stops, and looks at the clerk with the case, and tips his hat. "Good morning, Sergeant," he says pleasantly. "The house hopes the Sixth slept well." He walks on.${b55If('tobet', `\n\nTobet watches him go. "I'd like that written down too," he says.`)}`,
      ch:[{t:'Back to the fire.', go:()=>{ startExplore('b5_c5_keep'); talk('b5_c5_keepfire'); }}]}),

    /* ---- the morning: the end ---- */
    b5_c5_dawn:()=>{ const k = b55Key() || 'refuse';
      return {sp:'Brans Keep · morning', scene:'b5_c5_arrival', txt:
`Morning over Brans Keep: the keep's grey walls against the grey cliff, the lake like a sheet of lead, and the army of Lether getting up out of its tents in lines that go on to the keep and past it, a great many soldiers, and banners, and smoke from ten thousand breakfasts.

The Sixth gets up in the Whitefinders' lines, on the right, across the dry channel, among its own battalion for the first time since the spring. ${k === 'sign' ? 'It has new scale on, and the house\'s mark inside the collars, and forty docks less owing than it had in coin and a tenth more owing than it had in debt.' : 'It has cache swords and battalion straps and old stores, and its paybooks in the clerk\'s case, and the clerk has not let go of the case since the night.'}

Finadd Ennic stands with his book open and writes the date at the top of a fresh page. "The Sixth," he writes. "Brans Keep. With the battalion." He looks at it, and seems to like it.${b55Say({tobet:`\n\nTobet strings his bow, and tests the string, and looks north up the road. "They'll come down that," he says. "Unhurried."`, thegg:'\n\nThegg sets his shield on his arm and looks at the dry channel. "A ditch," he says. "Good." He does not say for what.', _:''})}${b55If('pessa', `\n\nPessa stands with her boathook upright in a Whitefinder's borrowed jack, two sizes too big, and looks at the army. "I am still not a soldier," she says. "But I'm standing in the right place for one."`)}${b55If('ruuk', `\n\nRuuk is a step ahead of the squad already, looking at the hills. "I will find us a road out," he says. "In case." He grins. "There is always a road out."`)}${b55If('brune', `\n\nBrune looks at the lake. "Still water," she says. "I would rather the sea." She shoulders her fish-spear.`)}

You touch the white fingertip on your shield's boss, for the Errant, among a battalion of them.`,
        ch:[{t:'To the Whitefinders\' place in the line.', onward:true, go:()=>chapterEnd(5, k)},
            {t:'Not yet.', go:()=>startExplore()}]}; },
  },
};
