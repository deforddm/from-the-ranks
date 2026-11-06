/* ============ Book Seven, Chapter 5: The Village ============ */
/* The Third, lent to Fist Keneb's column as a squad of heavies, near the river and a few days short of Letheras (rg-canon §2, ch 21; W21).
   The column has been funnelled between Edur bands to the north and the Lether River to the south and has gone to ground squad by squad
   in the villages. Phase 1, night on the river road: the lieutenant's orders, Edur scouts on the road (b7_c5_road; b7_edurspear,
   b7_wraith), an Indebted boy sent to bring the Third in. Phase 2, day in a mill village of the Third's own on the river side of the
   funnel (never the tavern village): the Indebted hide the squad in the empty factor's cellar (the first halt and the reading, B7READ[5],
   the Herald), the mill-woman, the bailiff who rode north to sell the village (b7_c5_bailiff, optional; the well's rise:true check), the
   old shield in the meeting house, the trick at the square (Hold the Square). Phase 3, dusk: an Edur band turns toward the village; if
   b7Guides() the village warns the Third in time (a round's head start). The key, S.f.b7_c5_key: 'hold' (THE BOOK'S ONE MORTAL FIGHT,
   b7_c5_village, mortal:true, stage2; signposted; a cusser in the factor's roof is the relief the Third makes for itself; b7Rise(2)) or
   'slip' (out by night along the river and leave the Indebted who hid them; b7_c5_slip, a running fight, not mortal; b7Rise(-2)).
   Phase 4, night on the riverbank, the column pulling together: the fire (the dead named), the lieutenant, and on.
   Notes for later chapters: docs/rg-ch5-notes.md. */
/* FOR THE ARTIST (125b): names this file uses.
   Items: ART['item/b7_c5_villageshield'], ['item/b7_c5_edurblade'].
   Figures, all existing: b2soldier (the lieutenant, marines), b5_c5_refugee (the mill-woman, the Indebted, the boy), b5_c1_clerk (the
   bailiff), b5_edur (Edur scouts seen on the road).
   Backdrops: b7_village (120's, yours: plaster and thatch, a well in the square, the factor's house the only one in stone; by day in
   phase 2, at dusk in phase 3; on 'hold' with the roof-cusser fired, the factor's roof gone and a thin smoke), and three this file adds
   that borrow until you draw them: b7_c5_lane (a road by night along a river, Edur fires on a ridge to the north), b7_c5_cellar (the
   factor's cellar by a rushlight: barrels, sacks, a vault, steps up to a trapdoor with daylight at its edge), b7_c5_river (the riverbank
   at night, reeds, the water, the village across the fields: dark and quiet on 'hold', a glow over the trees on 'slip').
   Ground (TILEX, all existing): plain_night (the road: '#' hedge, ',' grass, '.' road, 'r' rock, 'x' post, 'F' the halt), b5_c5_farm
   (the village: '#' walls, 'B' the factor's door, 'w' the well, 'e' the north gate, ',' trodden ash), b5_c3_bank (the river: '~'
   water, ',' reeds, '.' path, '#' rock, 'x' a stake). Battle 't' is low cover; on b5_c3_bank 'o' is the river. */

/* ---- small helpers (b75: Book Seven, Chapter Five) ---- */
const b75L = (id, n) => { if (b7In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b75Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b7In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b75If = (id, s) => b7In(id) ? (typeof s === 'function' ? s() : s) : '';
const b75Who = () => (ROLL() && ROLL().who) || 'sgt';
const b75Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b75Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b75V = (id, you, they) => id === 'sgt' ? you : they;
const b75Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const B75_SHE = ['haddat', 'sathi', 'marrow', 'mirrel', 'hessa', 'rasp', 'wenna'];
const b75He = id => B75_SHE.includes(id) ? 'she' : 'he';
const b75Him = id => B75_SHE.includes(id) ? 'her' : 'him';
const b75And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b75Num = n => ['none', 'one', 'two', 'three', 'four', 'five', 'six'][n] || String(n);
/* the phase: 1 the river road at night, 2 the village by day, 3 dusk (the Edur coming, the key and its fight), 4 the riverbank after */
const b75Ph = () => S.f.b7_c5_ph || 1;
const b75Key = () => S.f.b7_c5_key === 'hold' || S.f.b7_c5_key === 'slip' ? S.f.b7_c5_key : null;
const b75KeyDone = () => !!(S.f.b7_c5_holdDone || S.f.b7_c5_slipDone);
const b75Strip = () => S.f.b7_c1_key === 'strip';
/* Chapter Three's key decides who helps: 'ledger' and the word of the burned rolls came down the valleys first; else the mill-woman alone */
const b75Word = () => S.f.b7_c3_key === 'ledger';
const b75Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b7In(id));
/* who fell in this chapter's mortal fight (the dead from earlier books carry other chapters and a 'from') */
const b75Fell = () => Object.keys(S.dead || {}).filter(id => TPL[id] && S.dead[id] && S.dead[id].ch === 5 && !S.dead[id].from);
/* the sapper for the roof: Tangle, else Rasp, else nobody (the sergeant does it) */
const b75Sap = () => b7In('tangle') ? 'tangle' : b7In('rasp') ? 'rasp' : null;
const b75SapN = () => b75Sap() ? NAME(b75Sap()) : 'You';
/* the roof wants a cusser, or on 'strip' the transport's last two sharpers bound together */
const b75CanRoof = () => ((S.inv && S.inv.cusser) || 0) >= 1 || (b75Strip() && ((S.inv && S.inv.sharper) || 0) >= 2);
/* who teaches the square: Haddat (the blue shield), else Ottar (the Perish wall), else Darrut (the Aren Guard), else the sergeant's drill */
const b75Teacher = () => b7In('haddat') ? 'haddat' : b7In('ottar') ? 'ottar' : b7In('darrut') ? 'darrut' : 'sgt';
/* the Edur band's size: the bailiff's word gave them the squad's count, unless the Third stopped him on the lane */
const b75Told = () => !S.f.b7_c5_bailiffDone;

/* ---- Hold the Square: Blue Fire's mechanics (bluefire, t_bluefire), as Book Six's Grey Helms' Wall wore them, in the old legions' words.
   Four shields facing out, and on a word the square steps forward together, three paces, shields locked, and whatever is in front of it
   is hit by the whole squad's weight at once. Twice a chapter (one more from level 5): 2d6+level to everything in a 3x3 at range 4,
   squad included (stand clear of it), and everything caught is reeling: -3 to hit through the next round. Not sorcery. ---- */
Object.assign(TRICKS, {
  b7_c5_square:{name:'Hold the Square', ch:5, use:'chapter', n:2, ab:'t_b7_c5_square', where:'the square of a mill village on the river, at noon, with the shutters closed',
    lore:'The old legions fought in a square when they were caught in the open: four shields facing out, the corners locked, nobody looking behind because somebody else is. Most soldiers learn that much. The rest of it is older, and fewer know it: on a word, the square does not stand. It steps, all four faces at once, three paces, and what is in front of the shields meets the whole weight of the squad at the same heartbeat.',
    get fx(){ return `${trickTimes('b7_c5_square')} a chapter: call the square, range 4. 2d6${lvDmg() ? '+' + lvDmg() : ''} to everything in a 3×3, squad included (stand clear of it), and everything caught is reeling: −3 to hit through the next round. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b7_c5_square:{name:TRICKS.b7_c5_square.name, trick:'b7_c5_square', aoe:1, range:4, desc:()=>TRICKS.b7_c5_square.fx,
    run(u, x, y){ const pt = {x, y}; AUDIO.play('sword'); shakeMap();
      later(() => { const caught = B.units.filter(v => v.hp > 0 && cheb(v, pt) <= 1); caught.forEach(v => { v.dazzleUntil = B.round + 1; });
        blast(pt, [[2, 6, lvDmg()], [2, 6, lvDmg()]], '#b8a888'); sparks(pt.x, pt.y, 24, '#d8ccb0', .7); }, REDUCE() ? 1 : 260);
      blog(`${u.name} says the old word. The square steps, all four faces at once, three paces, shields locked, and what was in front of it is not standing there now.`); }},
});

/* ---- borrowed pictures until the artist's file (125b) replaces them: three scenes, the two items ---- */
{ const like = {b7_c5_lane:'b7_march_night', b7_c5_cellar:'b7_c3_floor', b7_c5_river:'b7_march_night'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof ART !== 'undefined') [['b7_c5_villageshield', 'b6_c7_greyhelmshield'], ['b7_c5_edurblade', 'b6_c1_rebeltulwar']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Seven's glossary ---- */
GLOSSX.rg.push(
  [5, 'The funnel', 'What the marines called the country between the Edur bands to the north and the Lether River to the south, near the end, when the column was pushed into it and broke into squads to hide in the villages.', ()=>!!(S && S.f && S.f.b7_c5_ph >= 1 && S.chapter >= 5)],
  [5, 'A bailiff', 'The factor\'s man in a village: he keeps the quarter-day board on his door, reads every family its line, and knows who is behind and by how much. Usually Indebted himself, a little less than the rest.', ()=>!!(S && S.f && S.f.b7_c5_ph >= 2)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.rg = ROSTER_FIRES.rg || {}; ROSTER_FIRES.rg[5] = ['b7_c5_fire'];

/* the reading: the village, the factor's cellar (rg:5); the Herald */
B7READ[5] = {scene:'b7_c5_cellar', where:'the flags of the factor\'s cellar, between the barrels, by a rushlight', set:'Daylight somewhere above, a village pretending to be asleep, and the Third under a factor\'s floor among his barrels, waiting for dusk.', back:'b7_c5_fire', backT:'Back to the cellar.',
  say:{marrow:'"A cellar," Marrow says. "Good. The Deck likes a roof over it, child, and something to drink close by." She taps a barrel. "Two somethings."',
       tallow:'"My grandmother read in a root cellar once," Tallow says, "with soldiers in the lane over her head. She said the cards come up honest when you\'re frightened." He lays the first one down. "I\'m honest."',
       oldninth:'An old marine of the column has come down the ladder after the Third, grey to the eyebrows, with a deck as worn as his boots. "Every column has one," he says. "The 9th\'s went home on a pinnace." He sets a cup on a barrel-head for the rum.'}};

const B7CH5 = {
  title:'The Village', number:'Five',
  intro:{loc:'Near the river, Lether', sub:'Keneb\'s column · a few days short of the city', scene:'b7_c5_lane', cap:'A road by night along a wide dark river, and on the ridge to the north, a long way off, a line of small fires that are not the column\'s.',
    paras:[
`Near the end the column was funnelled. The Edur came down out of the north in bands, hundreds of them, and the Lether River lay across the south, wide and slow and full of nothing that would carry a Malazan, and between the two the marines did what marines do when there is no room to fight: they broke up into squads and went to ground in the villages.`,
()=>{ const v = b75Mates().map(id => TPL[id].name);
  return `You are Sergeant {sgt}, Third squad, 9th Legion, lent to the Fist's column as heavies. ${v.length ? `The squad is ${b75And(v)}, and all of ${v.length > 1 ? 'them are' : 'it is'} thinner than they were on the coast.` : 'The Third, this summer, is you, and you are thinner than you were on the coast.'} ${S.f.b7_c3_key === 'ledger' ? 'Somewhere behind, a valley still remembers the smoke from a factor\'s counting room.' : S.f.b7_c3_key === 'loot' ? 'Somewhere behind, a factor\'s strongbox is a few silver lighter, and the squad has been eating.' : 'Somewhere behind are a hundred farms the column passed in the dark.'}`; },
`The word up the road is that marine squads have taken villages ahead of you, and in every one the factor's men and the money-lenders are dead, and the people let them go and then warn them when the Edur come. The word is also that the Edur are coming.`],
    go:'March', node:'b7_c5_start'},

  areas:[
    /* 16 x 12 (plain_night). , grass  . the road  # hedge  r rock  x a post  F the halt  < back west, toward the column  > east, to the village by the river */
    { id:'b7_c5_lane', title:'The river road', sub:'Night · the funnel', hint:'Tap ground to move · tap a figure to talk · the village is east, the river\'s edge south-east', decor:'plain_night', dark:true,
      map:[ "################",
            "#,,,,,,#,,,,,,,#",
            "#,,r,,,,,,,,#,,#",
            "#,,,,,#,,,,,,,,#",
            "<..............>",
            "#,,,,,,,,,,,,,,#",
            "#,,x,,,,,,,r,,,#",
            "#,,,,,,,,#,,,,,#",
            "#,#,,,F,,,,,,,,#",
            "#,,,,,,,,,,,,#,#",
            "#,,,,,,,,,,,,,R#",
            "################" ],
      walk:'.,', triggers:{F:'b7_c5_fire', '<':'b7_c5_lane_west', '>':'b7_c5_lane_east', R:'b7_c5_reeds'}, start:{x:1, y:4},
      quest:()=> !S.f.b7_c5_orders ? 'The lieutenant, in the ditch by the road.'
        : !S.f.b7_c5_roadDone ? 'Something on the road ahead, between the Third and the river.'
        : !S.f.b7_c5_boy ? 'Somebody small in the hedge, waiting.'
        : 'East, to the village by the river, before the light.',
      npcs:[
        {id:'lt', name:'The lieutenant', kind:'b2soldier', x:4, y:5, node:()=>'b7_c5_lt', fresh:()=>!S.f.b7_c5_orders},
        {id:'marines', name:'Marines going past', kind:'b2soldier', x:8, y:2, node:()=>'b7_c5_marines', fresh:()=>!S.f.b7_c5_marines},
        {id:'scouts', name:'Shapes on the road', kind:'b5_edur', x:11, y:4, node:()=>'b7_c5_scouts', show:()=>!!S.f.b7_c5_orders && !S.f.b7_c5_roadDone, fresh:()=>true},
        {id:'boy', name:'Somebody in the hedge', kind:'b5_c5_refugee', x:13, y:6, node:()=>'b7_c5_boy', show:()=>!!S.f.b7_c5_roadDone, fresh:()=>!S.f.b7_c5_boy} ] },

    /* 16 x 12 (b5_c5_farm). . the street and square  , trodden ash  # walls and houses  B the factor's door (his cellar: the Third's floor,
       the fire)  w the well  e the north gate, to the lane  > the mill-race and the river, south */
    { id:'b7_c5_street', title:'The mill village', sub:'A village on the river · the factor gone', hint:'Tap ground to move · tap a figure to talk · the factor\'s house is top left, the bailiff\'s door beside it, the meeting house top right, the north gate at the top, the mill-race south', decor:'b5_c5_farm', dark:false,
      map:[ "#######ee#######",
            "#..BB#.d...#.h.#",
            "#....#.....#...#",
            "#..............#",
            "##.....,.....###",
            "#......w.......#",
            "#.....,q,......#",
            "#..............#",
            "###...........##",
            "#,,...........,#",
            "#,,,,.m.....,,,#",
            "########>>######" ],
      walk:'.,', triggers:{B:'b7_c5_door', w:'b7_c5_well', e:'b7_c5_gate', '>':'b7_c5_race', d:'b7_c5_board', h:'b7_c5_hall', q:'b7_c5_square', m:'b7_c5_mill'}, start:{x:8, y:9},
      quest:()=> b75Ph() >= 3 && !b75Key() ? 'The mill-woman, in the square. The Edur are coming.'
        : b75Ph() >= 3 ? (b75Key() === 'hold' ? 'The square. Hold it.' : 'South, to the mill-race and the river path.')
        : !S.f.b7_c5_miller ? 'The mill-woman, who hid the Third.'
        : 'The village by day. At dusk the Edur will be wherever they are going.',
      npcs:[
        {id:'miller', name:'The mill-woman', kind:'b5_c5_refugee', x:9, y:5, node:()=> b75Ph() >= 3 ? 'b7_c5_key' : 'b7_c5_miller', fresh:()=> !S.f.b7_c5_miller || (b75Ph() >= 3 && !b75Key())},
        {id:'grandson', name:'The mill-woman\'s grandson', kind:'b5_c5_refugee', x:11, y:8, node:()=>'b7_c5_grandson', show:()=>b75Ph() === 2, fresh:()=>!S.f.b7_c5_grandson},
        {id:'women', name:'Women at the well', kind:'b5_c5_refugee', x:6, y:5, node:()=>'b7_c5_well', show:()=>b75Ph() === 2, fresh:()=>!!S.f.b7_c5_lane && !S.f.b7_c5_shortTried && !S.f.b7_c5_bailiffDone} ] },

    /* 16 x 12 (b5_c3_bank, night). ~ the river  , reeds  . the path  # rock  x a stake  F the lie-up in the reeds (the fire)  < west, the village across the fields */
    { id:'b7_c5_bank', title:'The riverbank', sub:'Night · the column pulling together', hint:'Tap ground to move · tap a figure to talk · the lie-up is in the reeds, a mooring stake by the water, the village back across the fields', decor:'b5_c3_bank', dark:true,
      map:[ "################",
            "#,,,,,,,,,,,,,,#",
            "#,.....,,,.....#",
            "<..............#",
            "#,..,....F.....#",
            "#,,......,,....#",
            "#...#......,,..#",
            "#,,.....x......#",
            "#~~~,,,,,,,,~~~#",
            "#~~~~~~~~~~~~~~#",
            "#~~~~~~~~~~~~~~#",
            "################" ],
      walk:'.,', triggers:{F:'b7_c5_fire', '<':'b7_c5_across', x:'b7_c5_water'}, start:{x:2, y:3},
      quest:()=> !S.f.b7_c5_lt3 ? 'The lieutenant, on the path.' : 'The lie-up in the reeds. At first light, on with the column.',
      npcs:[
        {id:'lt3', name:'The lieutenant', kind:'b2soldier', x:6, y:2, node:()=>'b7_c5_lt3', fresh:()=>!S.f.b7_c5_lt3},
        {id:'marines4', name:'Marines in the reeds', kind:'b2soldier', x:11, y:5, node:()=>'b7_c5_marines4', fresh:()=>!S.f.b7_c5_marines4} ] } ],

  battles:{
    /* Edur scouts on the road in: spearmen and the shadow-things that walk with them */
    b7_c5_road:{title:'The river road', style:'b5_c5_road', dark:true, open:true, warrenText:'Night on the river road · the shadows by the hedge are deeper than the hedge explains', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t.....","........","....t...","........",".t....t.","........","...t....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_edurspear',1,1],['b7_edurspear',5,1],['b7_edurspear',4,0],['b7_wraith',1,0],['b7_wraith',6,0]], xp:80, after:'b7_c5_road_after',
      preText:()=>`Three Edur with spears, walking the road as if they owned it, which they do, and with them, at the edges where the starlight goes thin, two things that are not men and do not walk so much as come along.`},
    /* the bailiff and the factor's men on the north lane, riding to sell the village to the Edur (optional) */
    b7_c5_bailiff:{title:'The north lane', style:'b5_c5_road', open:true, warrenText:'Afternoon on a farm lane · hot, dusty, and nobody about who means you well', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t..t..","........","........","...t....","........",".t....t.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_factorman',2,1],['b7_factorman',5,1],['b7_factorman',3,0],['b7_lethxbow',6,0]], xp:60, after:'b7_c5_bailiff_after',
      preText:()=>`The bailiff is on a cob, in a good coat, with a letter in it. Round him walk the factor's men with cudgels, and one with a crossbow who was a soldier once and has not forgotten how it goes.`},
    /* 'hold': THE BOOK'S MORTAL FIGHT. An Edur band comes into the village at dusk for the Malazans the village hid. The street is held
       four rounds while the Indebted get down to the river behind; then the square, where the relief the Third made for itself (a cusser
       in the factor's roof, b7_c5_roof) may come down on the war-leader's rush. The last foe of the first ground is the bailiff's word:
       dropped when the Third stopped him on the lane. */
    b7_c5_village:{title:'The village street', style:'b5_c5_farm', mortal:true, warrenText:'Dusk in a mill village · whoever falls here stays down · the shadows lean toward the Edur', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Hold the street four rounds, while the village gets down to the river behind you.'},
      map:["#......#","#......#","...t....","#......#","#.t..t.#","#......#","...tt...","#......#","#......#","#......#"],
      party:[[3,7],[4,7],[2,8],[5,8],[3,8],[4,8]],
      foes:[['b7_edur',2,1],['b7_edur',5,1],['b7_edurspear',1,0],['b7_edurspear',6,0],['b7_krisnan',3,0],['b7_wraith',4,0]], xp:130, after:'b7_c5_hold_after',
      waves:[{round:2, foes:[['b7_edur',0,2],['b7_wraith',7,2]], text:'More of them come over the garden walls on both sides, grey in the dusk, without a sound.'},
             {round:3, foes:[['b7_edurspear',3,0],['b7_wraith',4,1]], text:'Two more at the top of the street. They have been waiting for the first ones to find out how hard the Third is.'}],
      preText:()=>`They come down the village street in the last of the light, grey and unhurried, the way the Edur go into a place they mean to take: warriors in front with long blades, spearmen at the walls, and behind them a K'risnan with the dark gathering on his hands like smoke round a lamp. Behind the Third, the village is going down to the river as fast as old people and children can go.`,
      stage2:{title:'The square by the mill', xp:60,
        get text(){ return (S && S.f && S.f.b7_c5_roof) ?
`The street is held. The village is at the river. And now the war-leader comes, a tall Edur with a long blade, up the street into the square with the rest of his band at his back, straight for the factor's house where the Malazans hid. Straight under the factor's roof.\n\n${b75SapN()} ${b75Sap() ? 'has' : 'have'} the fuse-cord in ${b75Sap() ? (b75He(b75Sap()) === 'she' ? 'her' : 'his') : 'your'} fist. ${b75Say({tangle:'"Now," Tangle says, to nobody, and pulls.', rasp:'"Now," Rasp says, to nobody, and pulls.', _:'You pull.'})}\n\nThe factor's roof comes down into the square in one piece, slates and beams and the stone gable, with a sound like the end of the world, on the ones who were under it. When the dust thins, the war-leader is still standing. Fewer of his band are.` :
`The street is held. The village is at the river. And now the war-leader comes, a tall Edur with a long blade, up the street into the square with the whole of his band at his back, straight for the factor's house where the Malazans hid.\n\nNobody rigged the roof. There is nothing over the square but the evening, and nothing between the Third and the Edur but the Third.${b75If('haddat', `\n\nHaddat sets the blue shield. "Well," she says, in Hissari. "Here we are."`)}`; },
        map:["##....##","#......#","..t..t..","........","...tt...","........",".t....t.","........","........","#......#"],
        party:[[3,7],[4,7],[2,8],[5,8],[3,8],[4,8]],
        get foes(){ return (S && S.f && S.f.b7_c5_roof) ? [['b7_edurchief',3,1],['b7_edur',1,2],['b7_edur',6,2]] : [['b7_edurchief',3,1],['b7_edur',1,2],['b7_edur',6,2],['b7_edur',4,0],['b7_krisnan',2,0]]; },
        get surprise(){ return (S && S.f && S.f.b7_c5_roof) ? 'p' : null; }} },
    /* 'slip': out by night along the river path, leaving the village. A running fight: keep moving three rounds to the reeds, then the ford.
       Not mortal. The last foe is the bailiff's word, dropped when the Third stopped him on the lane. */
    b7_c5_slip:{title:'The river path', style:'b5_c3_bank', dark:true, warrenText:'Night on the river path · the water loud on the left, the Edur louder behind', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:3, text:'Keep moving: three rounds to the reeds.'},
      map:["o.......","o..t....","o.......","o....t..","o.......","o.t.....","o.......","o...t...","o.......","o......."], pitTxt:'the river',
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_edurspear',2,0],['b7_edurspear',5,0],['b7_wraith',1,1],['b7_wraith',6,1],['b7_edurspear',4,1]], xp:110, after:'b7_c5_slip_after',
      waves:[{round:2, foes:[['b7_wraith',7,3]], text:'Something comes along the bank from the east as well, low and quick, out of a shadow that was only a shadow.'}],
      preText:()=>`The path runs along the river under the willows, a cart wide, with the water on the left and the fields on the right, and the Edur have found it too. They come along it at a lope, spears low, and the shadow-things with them go through the reeds as if the reeds were not there.`,
      stage2:{title:'The ford', xp:50,
        text:()=>`The reeds, and past them the ford: a gravel bar across a backwater, knee-deep, where the village drives its cattle. On the far side the fields go up to a wood, and the column is somewhere beyond the wood.\n\nOn the bar, waiting, with the water round their knees, three Edur who came round by the fields to be there first.${b75If('wenna', `\n\nWenna looks at the water and then at the Edur in it. "They don't know rivers," she says. "Look how they stand."`)}`,
        map:["oo....oo","o......o","o..t...o","o......o","o......o","o.t..t.o","o......o","o......o","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b7_edur',3,1],['b7_edur',5,2],['b7_edurspear',2,2],['b7_wraith',6,3]]} } },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b7_c5_villageshield:{name:'The village\'s old shield', slot:'armour', role:'shield', who:null, ac:3, hp:2,
      line:'A wide oval of oak planks bound in iron, faced with bullock hide, with a heron painted on it in a blue that was bright once. It hung on the meeting-house wall above the village\'s one chair for longer than anyone can remember, from some war nobody in the village fought in. The mill-woman took it down and gave it to the Third. It is heavier than it looks, and it looks very heavy.'},
    b7_c5_edurblade:{name:'An Edur long blade', slot:'weapon', role:'heavyweapon', who:null, atk:1, dmg:[1,12,4],
      line:'A long single-edged blade of dark grey iron, made by Edur smiths for Edur hands, with a hilt long enough for two and an edge that has been kept like a promise. There is a line of small marks cut into the spine near the hilt, in the Edur fashion, and nobody in the Third can read them. Whoever carries it now adds no marks of their own. The Third does not keep count that way.'} },

  scenes:{
    b7_c5_lane:{loc:'Near the river', sub:'The river road · night', cap:'A road by night along a wide dark river, and on the ridge to the north a line of small fires that are not the column\'s.', amb:'explore'},
    b7_c5_cellar:{loc:'The mill village', sub:'The factor\'s cellar · by day', cap:'A stone cellar under a factor\'s house, barrels and sacks along the walls, a rushlight on a barrel-head, and daylight at the edge of a trapdoor at the top of the steps.', amb:'explore'},
    b7_c5_river:{loc:'The Lether River', sub:'The riverbank · night', cap:'Reeds, a willow, the river wide and black and quiet, and back across the fields the village.', amb:'explore'} },

  end:{
    hold:['The square by the mill', 'Near the end the column was funnelled between the Edur and the river, and went to ground in the villages. The Indebted of a mill village hid the Third in their factor\'s cellar for a day, and at dusk an Edur band came for the Malazans the village had hidden. The Third held the street while the village went down to the river, and then the square. The village is still there. Not everyone who held it is.'],
    slip:['The river path', 'Near the end the column was funnelled between the Edur and the river, and went to ground in the villages. The Indebted of a mill village hid the Third in their factor\'s cellar for a day, and at dusk an Edur band came for the Malazans the village had hidden. The Third went out by the river path in the dark, and fought its way to the ford, and came to the column whole. Behind it, over the trees where the village was, there was a light in the sky most of the night.'] },
  endScene:'b7_c5_river',
  endCap:()=> b75Key() === 'hold' ? 'A file of soldiers going on along the river in the grey before dawn, and behind them a village with its factor\'s roof in its square, and its people at their doors.' : 'A file of soldiers going on along the river in the grey before dawn, and behind them, over the trees, a smoke.',
  tease:'Next: the field before Letheras. The Sixth Company in the line below a ridge, a light on the horizon, and ships on the river.',

  extras:()=>{ const f = S.f, x = [], fell = b75Fell();
    if (f.b7_c5_key === 'hold') x.push(`The Third held a mill village on the river against an Edur band, so the people who hid it could get away.${fell.length ? ` ${b75And(fell.map(NAME))} did not get up.` : ' Everyone in the squad got up again.'}`);
    if (f.b7_c5_key === 'slip') x.push('The Third went out of a mill village by the river path at night, and left the people who hid it to the Edur.');
    if (f.b7_c5_roof) x.push('A cusser in a factor\'s roof brought it down on an Edur war-leader\'s band.');
    if (f.b7_c5_bailiffDone) x.push(f.b7_c5_bailiff === 'village' ? 'The village\'s bailiff, riding to sell it to the Edur, was stopped on the lane and handed to the village.' : 'The village\'s bailiff, riding to sell it to the Edur, was stopped on the lane and tied for the column.');
    if (f.b7_c5_squareOk) x.push('The Third learned the old square: four shields, and the step.');
    if (f.b7_c5_shield) x.push('The mill-woman gave the Third the village\'s old shield off the meeting-house wall.');
    if (f.b7_c5_warned) x.push('The village\'s children ran in from the fields to warn the Third, in time.');
    return x; },

  journal:()=>{ const f = S.f, fell = b75Fell(); return [
    f.b7_c5_lt3 && 'The Fist means to pull the column together and push hard for the capital.',
    fell.length && `${b75And(fell.map(NAME))} fell in the square of a mill village on the river, holding it, and ${fell.length > 1 ? 'are' : 'is'} buried by the mill-race.`,
    f.b7_c5_key && (f.b7_c5_key === 'hold' ? 'When the Edur came for the village that hid it, the Third held the street and the square.' : 'When the Edur came for the village that hid it, the Third went out by the river path in the dark.'),
    f.b7_c5_bailiffDone && 'The village\'s bailiff rode north with a letter for the Edur. The Third caught him on the lane.',
    f.b7_c5_miller && 'A mill-woman and the Indebted of her village hid the Third in their factor\'s cellar for a day.',
    f.b7_c5_roadDone && 'Edur scouts on the river road, with shadow-things walking beside them.',
    'Near the end the column was funnelled between the Edur and the river, and broke up into squads to hide in the villages.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the river road at night ======== */
    b7_c5_start:()=>({sp:'The river road', scene:'b7_c5_lane', fx:()=>{ S.f.b7_c5_ph = S.f.b7_c5_ph || 1; }, again:()=>'The river road at night, the column scattered, the fires on the ridge.', txt:
`The column is not a column any more. Somewhere in the last two nights it came apart into its squads, like a shoal when something big swims into it, and now the squads are everywhere and nowhere along the river road, in ditches, in orchards, in the backs of barns, going east in the dark by ones and twos.

To the north, on the long ridge above the fields, there are fires. Small ones, a great many, in a line that goes on further than you can see. Edur. To the south, beyond a last hedge and a strip of reeds, the river: very wide, very black, very quiet, and nothing on it.

${b75Say({haddat:'Haddat is looking at the fires. "Hundreds," she says. It is not a complaint. It is a count, as her mother counted water-skins.', tangle:'Tangle is looking at the fires. "That\'s a lot of Edur," he says. "That\'s more than a lot."', _:'The squad looks at the fires, and then at the river, and then at you.'})}${b75If('doss', `\n\nDoss is crouched at the hedge, looking at the fields. "Good land," he says. "A factor's." He would know.`)}${b75If('wenna', `\n\nWenna is looking at the river and nothing else. "No boats," she says. "Not one. They've all been taken."`)}

Down in the ditch by the road somebody is whistling the lieutenant's two notes, very softly.`,
      ch:[{t:'Down into the ditch, to the lieutenant.', go:'b7_c5_lt'},
          {t:'Walk the road.', go:()=>startExplore()}]}),

    /* the lieutenant: the funnel, the village, the orders */
    b7_c5_lt:()=>({sp:'The lieutenant', scene:'b7_c5_lane', fx:()=>{ S.f.b7_c5_orders = 1; }, again:()=>'The lieutenant, in the ditch. "The village by the river, Sergeant. Before the light."', txt:
`The lieutenant is lying in the ditch with her crossbow across her chest and the slate on her stomach, looking up at the stars as if she were in a field at home. She has lost weight since the coast. Her voice has not.

"We're in the funnel," she says. "Edur north, in bands, more than the Fist likes to count. River south. No boats. The Fist has the squads scattered into the villages till he can pull us back together, and the villages are taking us in." She turns her head. "Some of them. There are marines up the road who've been doing it the hard way: the factor's men, the money-lenders, the officials. The people loot the house and run, and then they come back and warn us. It works. I don't like it, but it works."

She taps the slate. "Yours is the village by the river with the mill, east along this road. Get in before the light. Lie up. Wait for the word." She looks at you a moment. "If they come for you, Sergeant, they come in hundreds. Don't be where they come."`,
      ch:[{t:'"How many hundreds?"', req:()=>!S.f.b7_c5_ltMore, go:'b7_c5_lt_more'},
          {t:'"The village with the mill. Yes, Lieutenant."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_lt_more:()=>({sp:'The lieutenant', scene:'b7_c5_lane', fx:()=>{ S.f.b7_c5_ltMore = 1; }, txt:
`"Ask the ridge." She is still looking at the stars. "They're moving on a village up the road where marine squads are holding, and I'd say they mean to take it house by house. That's most of them. The rest are in bands, out hunting whoever's in the other villages."

She is quiet a moment. "Captain Sort says the Letherii won't rise for us. Not all at once. But a village that hides a squad has risen, Sergeant, as far as the Edur are concerned. Whatever happens to us, happens to them twice." She rolls onto her side, toward the road. "There's scouts on the road ahead. Clear them, or go round. Your choice. I'd clear them."${b75Strip() ? `\n\nShe glances at the Third's packs out of an old habit, as she has since the beach. "Still carrying the transport, I see." It is nearly approval.` : ''}`,
      ch:[{t:'"Clear them. Yes, Lieutenant."', go:()=>startExplore()}]}),

    /* marines going past: camp talk on the move */
    b7_c5_marines:()=>({sp:'Marines going past', scene:'b7_c5_lane', fx:()=>{ S.f.b7_c5_marines = 1; }, again:()=>'The marines have gone on up the road.', txt:
`A marine squad goes past along the hedge-bottom at a crouching run, and its sergeant drops down beside the Third for a breath, sweating.

"Heavies," she says. "You're the river village? Lucky. We've got the one with the pig-farm." She wipes her face. "Word from up the road is the Edur are going for the big village with the tavern. Hundreds. Squads in there already, and not leaving." She shakes her head. "Rather them than me. Rather you than me, too, if they come your way."

She is up and gone before anybody can answer, after her squad, into the dark.${b75If('marrow', `\n\nMarrow watches them go. "They are tired, child," she says. "All of them. Tired in the way that makes you brave."`)}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* Edur scouts on the road */
    b7_c5_scouts:()=>({sp:'Shapes on the road', scene:'b7_c5_lane', again:()=>'The shapes on the road, between the Third and the river.', txt:
`Ahead on the road, where it bends down toward the river, there are shapes. Three of them walk upright with spears on their shoulders, tall and grey, talking low in a language like water over stones. The other shapes do not walk upright. They keep to the edges of the road, where the hedge-shadow is, and when one of them crosses a patch of starlight it does not seem to be there at all.${b75If('marrow', `\n\nMarrow's fingers close on her string. "Wraiths, child," she whispers. "The Edur bring their dead with them. I will never like it."`)}${b75If('wenna', `\n\nWenna has gone very still. "On the coast," she breathes, "we threw salt at those." She does not seem to have any salt.`)}`,
      ch:[{t:'"Third." Up out of the ditch and at them.', go:()=>startBattle('b7_c5_road', {})},
          {t:'Wait in the ditch till they are level, and come up behind them.', check:['guile', 15],
            edges:id=>[id === 'wenna' && ['she has hidden from Edur on the coast all her life', 2], id === 'doss' && ['he has lain in a ditch while the overseer rode by', 2], id === 'sathi' && ['the Weasels lay up by roads for a living', 1], S.f.b7_c3_tracksOk && id === 'sgt' && ['the Shake track: the squad is in the ditch-bottom, not on its sides', 2], id === 'ottar' && ['grey plate in a ditch is a bell', -2], id === 'darrut' && ['the Aren Guard did not lie in ditches', -1]],
            near:{t:()=>`Yes, but the ditch has a bramble in it that nobody saw, and ${b75Nm(b75Who())} ${b75V(b75Who(), 'come', 'comes')} up out of it torn along one arm. ${b75Nmc(b75Who())}'ll feel it in the fight.`, fx:()=>bruise(b75Who(), bruiseN())},
            go:()=>startBattle('b7_c5_road', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c5_scouts_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_scouts_seen:()=>({sp:'The river road', scene:'b7_c5_lane', txt:
`One of the shadow-things stops, in the middle of the road, and turns toward the ditch without a face to turn. Then all of them do.`,
      ch:[{t:'Shields.', go:()=>startBattle('b7_c5_road', {surprise:'e'})}]}),
    b7_c5_road_after:()=>({sp:'The river road', scene:'b7_c5_lane', fx:()=>{ S.f.b7_c5_roadDone = 1; }, txt:
`The shadow-things come apart when they are finished, the way smoke does, and there is nothing in the road where they were. The Edur do not. The Third drags them into the ditch and pulls the hedge over them, which is all there is time for.

On the ridge to the north the fires have not moved. Up there, it seems, they heard nothing. Probably.${b75Say({haddat:'\n\nHaddat says three names under her breath, which she does not know, and then the ones she does, and then she is done.', tangle:'\n\nTangle counts the satchel by feel in the dark, and nods to himself.', _:''})}

In the hedge further along, something small moves, and stops, and waits to see if it has been seen.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* an Indebted boy, sent from the village to bring the Third in */
    b7_c5_boy:()=>({sp:'Somebody in the hedge', scene:'b7_c5_lane', fx:()=>{ S.f.b7_c5_boy = 1; }, again:()=>'The boy from the village, waiting in the hedge to take you in.', txt:
`It is a boy of ten or so, barefoot, in a shirt that was his father's, crouched in the hedge with his knees under his chin. He has been watching the whole fight. He does not seem frightened of the Third. He seems frightened of being late.

"You're the ones for the mill," he says, in Letherii, and then, when the Third only looks at him, very carefully, in a soldier's trade-tongue somebody taught him that afternoon: "Mill. Come. Hide." He points east. "My gran says."

${b75Word() ? `He looks at the Third with frank interest. "Are you the ones that burned the rolls?" he asks. "In the valley? Everyone says." He does not wait for an answer. "Gran says if you're them, the whole village will hide you. She says the bailiff can go and drown."` : `He looks at the Third, and at the road, and back. "Gran says you're to come. The rest are scared. Gran isn't scared of anything." He seems to think that settles it. "Except the bailiff. A bit."`}${b75If('doss', `\n\nDoss crouches down to the boy's height. "Whose fields?" he asks, in Letherii. The boy names a factor, and Doss nods. He does not need to ask anything else.`)}`,
      ch:[{t:'"Take us in."', go:'b7_c5_boy_more'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_boy_more:()=>({sp:'The boy', scene:'b7_c5_lane', txt:
`"Before the light," he says. "Gran says. The bailiff gets up at the light." He is already moving along the hedge, east, without looking back to see if the Third is following, like a dog that knows the way home.${b75If('wenna', `\n\nWenna watches him go. "That one's a fisher's boy, or should be," she says. "Look how he walks in the dark."`)}`,
      ch:[{t:'East, after him.', go:'b7_c5_lane_east'},
          {t:'Not yet.', go:()=>startExplore()}]}),

    b7_c5_lane_west:()=>({sp:'The river road', scene:'b7_c5_lane', txt:
`West, the road runs back the way the column came, and somewhere along it the rest of the column is going to ground in the dark. Nothing for the Third back there now.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b7_c5_lane_east:()=>{ const ok = !!S.f.b7_c5_orders && !!S.f.b7_c5_roadDone && !!S.f.b7_c5_boy;
      return {sp:'The river road', scene:'b7_c5_lane', txt: ok ?
`The road goes down to the river, and along it, east, between the last hedge and the reeds. Ahead in the grey there is a village: thatch, a mill on a race off the river, one house of stone. The boy goes along the hedge at a trot toward it.` :
`The road runs east toward the river. ${!S.f.b7_c5_orders ? 'The lieutenant, in the ditch, has the orders.' : !S.f.b7_c5_roadDone ? 'There is something on the road ahead, at the bend.' : 'Somebody small in the hedge is waiting to be noticed.'}`,
        ch: ok ? [{t:'Into the village, before the light.', onward:true, fx:()=>{ S.f.b7_c5_ph = Math.max(2, S.f.b7_c5_ph || 1); }, go:()=>{ startExplore('b7_c5_street'); talk('b7_c5_arrive'); }},
                  {t:'Not now.', go:()=>startExplore()}] :
                 [{t:'Back to the road.', go:()=>startExplore()}]}; },

    /* ======== phase 2: the village by day ======== */
    b7_c5_arrive:()=>({sp:'The mill village', scene:'b7_village', txt:
`The village comes out of the grey as the Third comes into it: a street of plaster and thatch, a square with a well, a meeting house with a bell it does not ring, and the mill, turning slowly on its race with nobody to grind for. The only house of stone is the factor's, at the top of the square, with its shutters closed and its door standing a hand's width open.

${b75Word() ? 'There are people at every door. They do not come out. They watch the Third go by in the half-light, and one woman holds up a loaf as the squad passes, and another a jug, and a man takes his cap off and puts it back on again as if he had not meant to.' : 'Every door is shut. Behind some of the shutters there are eyes. Not one door opens.'}

The mill-woman is waiting in the factor's doorway with a rushlight. She is sixty or more, broad, floury to the elbow, with a face like a fist. "In," she says. "Down. The factor went to the city with his horses a month since. He won't miss his cellar." She looks the Third up and down. "Heavier than I was told. You'll fit."`,
      ch:[{t:'Down into the cellar.', go:'b7_c5_cellar'}]}),
    b7_c5_cellar:()=>({sp:'The factor\'s cellar', scene:'b7_c5_cellar', fx:()=>{ S.f.b7_c5_cellarSeen = 1; }, again:()=>'The factor\'s cellar, the barrels, the rushlight, daylight at the trapdoor\'s edge.', txt:
`The factor's cellar is cut into the rock under his house, vaulted, cool, smelling of old wine and apples. Barrels along one wall, sacks along another, a rack of the factor's bottles that the village has not touched, and a rushlight on a barrel-head. At the top of the steps, the trapdoor, with a line of daylight round its edge going from grey to gold.

The Third goes down into it, and puts its packs against the barrels, and sits, and for the first time in two nights nobody is looking at the ridge.${b75Say({haddat:`\n\nHaddat sets the blue shield against the steps, facing up, where she can reach it. "A door with one way in," she says. "My mother would have liked it."`, marrow:`\n\nMarrow sits down on a sack of meal with a long breath. "A roof, child," she says. "Another man's. I will take it."`, _:''})}${b75If('doss', `\n\nDoss stands at the bottom of the steps looking at the bottles. "The factor's," he says. He does not touch one. He looks as if he would like to break every one of them, and also as if he would like to read the labels.`)}`,
      ch:[b7ReadChoice(5),
          {t:'The cellar. Sit a while.', go:'b7_c5_fire'},
          {t:'Up into the village.', go:()=>startExplore()}]}),
    b7_c5_read:()=>b7ReadOffer(5),
    b7_c5_card:()=>b7ReadCard(5),

    /* the factor's door: the cellar */
    b7_c5_door:()=>({sp:'The factor\'s house', scene:'b7_village', txt: b75Ph() >= 4 ? `The factor's house.` : b75Ph() >= 3 && b75Key() === 'hold' ?
`The factor's house stands at the top of the square, door open, the cellar under it empty now. ${S.f.b7_c5_roof ? `In the roof-space, over the square side, ${b75SapN()} ${b75Sap() ? 'has' : 'have'} left something wedged against the gable beam with a fuse-cord running down the wall.` : ''}` :
`The factor's house, dressed stone, the shutters closed. The cellar under it is the Third's for the day.`,
      ch:[{t:'Down into the cellar.', req:()=>b75Ph() <= 3, go:'b7_c5_fire'},
          {t:'Up into the factor\'s rooms.', req:()=>b75Ph() === 2, go:'b7_c5_house'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the factor's rooms upstairs (phase 2): his desk, and his orders to the bailiff */
    b7_c5_house:()=>({sp:'The factor\'s rooms', scene:'b7_village', again:()=>'The factor\'s rooms, the sheets, the painted factor.', txt:
`Up the stair, the factor's rooms: good furniture under dust-sheets, a carpet rolled against the wall, a cold hearth with a brass fender the village has not touched, and over it a painting of the factor, a man in a blue coat painted a good deal thinner than the coat suggests. He took the horses and the plate. He left himself on the wall.

In the window, a desk with its pigeonholes empty: he took his books to the city too. The drawers are still in it.${b75Say({mehet:`\n\nMehet is already looking at the desk's lock. "Two locks," he says. "One for the thief, one for the son." He sounds almost fond of it.`, haddat:`\n\nHaddat looks at the painting a long time. "My mother would have said he had a water-seller's face," she says. "It was not a compliment."`, _:''})}${b75If('doss', `\n\nDoss stops at the top of the stair and does not come into the room. "I never went in the front," he says. "On the holding." He comes in anyway, slowly, and stands on the carpet's edge.`)}`,
      ch:[{t:'Search the desk.', req:()=>!S.f.b7_c5_desk, go:'b7_c5_house_desk'},
          {t:'Back down to the square.', go:()=>startExplore()}]}),
    b7_c5_house_desk:()=>({sp:'The factor\'s desk', scene:'b7_village', fx:()=>{ if (!S.f.b7_c5_desk) { S.f.b7_c5_desk = 1; S.inv.salve = (S.inv.salve || 0) + 1; note('In the factor\'s desk: a jar of his good salve, sealed with wax.', 'good'); } }, txt:
`${b75If('mehet', 'Mehet opens both locks, one with a pin and one with patience. ')}In the drawers: sealing wax, a broken pen, a jar of the factor's own salve, sealed, which the Third takes, and a copy of a letter in the bailiff's careful hand, kept because a factor keeps copies of everything.

*Should any foreigners come into the valley, the honoured warriors on the ridge are to be told at once, and the names of any who shelter them. By order.*

The factor's mark at the foot of it is a mill-wheel. He has signed it himself, above the bailiff's copy, in a different ink. He wanted to be sure.`,
      ch:[{t:'Back down to the square.', go:()=>startExplore()}]}),

    /* the fire: by phase. 1 the road (no fire); 2 the cellar by day; 3 dusk (no time); 4 the riverbank lie-up after.
       The games pass wraps this node: keep the id */
    b7_c5_fire:()=>{ const ph = b75Ph(), fell = b75Fell();
      if (ph === 1) return {sp:'The river road', scene:'b7_c5_lane', txt:
`No fire on the march. There are enough fires on the ridge for everybody.`,
        ch:[{t:'Talk with the squad.', go:'b7_c5_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      if (ph === 3) return {sp:'The factor\'s cellar', scene:'b7_c5_cellar', txt:
`The cellar is where the Third hid. There is no time to sit in it now. Up the steps, the light is going, and the village is waiting to hear what the Malazans will do.`,
        ch:[{t:'Talk with the squad.', go:'b7_c5_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      const bank = ph >= 4, rk = 'b7_c5_rest' + (bank ? 4 : 2);
      return {sp:bank ? 'The lie-up in the reeds' : 'The factor\'s cellar', scene:bank ? 'b7_c5_river' : 'b7_c5_cellar', html:risingHTML(),
        again:()=> bank ? 'The reeds by the river, the squad in a ring round no fire, the village across the fields.' : 'The factor\'s cellar, the rushlight, the day going over above.', txt:
`${bank ? `A hollow in the reeds above the water, with a willow over it. No fire. The column is coming together along the bank all round, squad by squad out of the dark, and nobody is lighting anything.${b75Key() === 'hold' ? `\n\n${fell.length ? `The Third sits in a ring with a gap in it, and leaves the gap where it is. ${b75And(fell.map(NAME))} ${fell.length > 1 ? 'are' : 'is'} back in the village, by the mill-race, under the earth the village dug with its own spades before the Third came away.` : 'The Third sits in a ring, all of it. You count twice, in the dark, and get the same number both times.'}` : `\n\nAcross the fields, over the trees where the village was, the sky has a light in it that is not the dawn. The Third watches the water instead.`}` : `The rushlight on its barrel-head, the barrels, the sacks, and the day going over above with the sound of the mill turning. No fire: there is never a fire now. The squad sits in a ring on the factor's flags round where one would be.`}${b75Say({marrow:'\n\nMarrow has her hands round a cup of nothing, for the warmth she remembers.', haddat:'\n\nHaddat has the blue shield face down on her knees, and is working a dent out of the rim with her thumb.', _:''})}`,
        ch:[...(bank ? [] : [b7ReadChoice(5)]),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(bank ? 'The squad sleeps an hour in the reeds. Wounds close, mostly.' : 'The squad sleeps the morning through on the factor\'s flags. Wounds close, mostly.'); }, go:'b7_c5_fire_rest'},
            {t:'Talk with the squad.', go:'b7_c5_fire_talk'},
            {t:'Wait for dusk.', req:()=>!bank && !!S.f.b7_c5_miller, onward:true, fx:()=>{ S.f.b7_c5_ph = 3; }, go:'b7_c5_dusk'},
            {t:'First light. On with the column.', req:()=>bank && !!S.f.b7_c5_lt3, onward:true, go:'b7_c5_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c5_fire_rest:()=>({sp:b75Ph() >= 4 ? 'The lie-up in the reeds' : 'The factor\'s cellar', scene:b75Ph() >= 4 ? 'b7_c5_river' : 'b7_c5_cellar', txt:
`${b75Ph() >= 4 ? 'An hour, then, in the reeds, with the river going by and the column coming in round you out of the dark.' : 'The morning, then, on the flags, with the mill turning overhead like a slow heart.'}

${b75Say({marrow:`Marrow sits beside each of them a moment with her palm on a forehead, as if testing bread. "Sleep, child," she says. "That is the medicine. I am only the bottle."`, mirrel:`Mirrel fills the skin at the factor's water butt and makes each of them drink in front of her. "All of it. Good."`, _:'Some of them sleep. The rest sit with their backs to the wall and do not.'})}${b75If('haddat', `\n\nHaddat lies down with her head on her pack and says names under her breath${b75Fell().length ? `, and at the end of them, new ones` : ''}.`)}`,
      ch:[{t:'Back.', go:'b7_c5_fire'}]}),
    b7_c5_fire_talk:()=>{ const ph = b75Ph(), late = ph >= 4, k = b75Key(), fell = b75Fell(), ln = [];
      if (b7In('haddat')) ln.push(late ? (k === 'hold' ? `Haddat has the blue shield across her knees, and her hand flat on it. "The village is still there," she says. "I looked back. The mill was still turning." A while goes by. "That is what a shield is for."` : `Haddat is not looking at the light over the trees. She is looking very carefully at the river instead. "My mother said a door you go out of stays open behind you," she says. "I never knew what she meant." She stops. "I know."`) : `Haddat is looking at the trapdoor. "These people," she says. "They have hidden us under their master's floor. If the Edur come, the floor will not hide them." She runs a thumb along the shield's rim. "I would like to be standing on it when they come."`);
      if (b7In('sathi')) ln.push(late ? `Sathi is cleaning her knife on a reed. "${k === 'hold' ? 'You stayed,' : 'You went,'}" she says. "Weasels would have ${k === 'hold' ? 'gone. And lived to say so. Maybe you\'re not so soft.' : 'gone too. Weasels always go.'}" She does not seem to know whether she approves.` : `Sathi is lying on a sack with her filed teeth showing. "A cellar with one door," she says. "Weasels called that a grave with a lid."`);
      if (b7In('tangle')) ln.push(late ? `Tangle has the satchel open in his lap, counting by feel. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}." ${S.f.b7_c5_roof ? 'He touches the Kanese bead. "Put a roof on a war-leader tonight. I\'ll tell my grandchildren. If I have any. If they believe me."' : 'He closes it. "Not much. Enough for the city, maybe. If the city\'s small."'}` : `Tangle has the satchel open, counting. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}. ${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}." He looks up at the vault. "Good stone, this. The factor's roof's not stone, though. I looked."`);
      if (b7In('marrow')) ln.push(late ? `Marrow has her string out, and is tying knots in it, one after another, slowly. ${fell.length ? `"One for each, child," she says, without looking up. "So my hands know. My head knows already."` : `"None to tie for tonight, child," she says. "I am tying anyway. For the ones up the road."`}` : `Marrow is sitting on an upturned crock with her shoulders up. "The Edur bring the dark with them, child," she says. "Their K'risnan. It sits in the warrens like a stone in a stream. Mine goes round it." She sniffs. "Slower."`);
      if (b7In('mirrel')) ln.push(late ? `Mirrel is counting the salves back into her bag in threes. "${numw(S.inv.salve || 0, true)}," she says. ${k === 'hold' ? '"I used most of them in the square. On ours. On theirs, after, the village ones." She closes the bag. "Good."' : '"I didn\'t use any." She closes the bag, and keeps her hand on it.'}` : `Mirrel is rolling her linen on the factor's flags. "A cellar keeps a wound clean," she says. "Cool. Dark. No flies." She ties the roll. "If we have to fight up there, bring them down here. I'll be here."`);
      if (b7In('tallow')) ln.push(`Tallow is turning his grandmother's deck over in his hands without opening it. "She said every village has one door the soldiers don't know about," he says. "${late ? 'I hope this one had it.' : 'I asked the boy. He showed me. It\'s the mill-race.'}"`);
      if (b7In('hessa')) ln.push(`Hessa sits straight with the spear upright. "D'rek is in the river here," she says. "The worm goes under all water." She puts her palm flat on the ${late ? 'bank' : 'flags'}. "${late ? 'It took what we gave it tonight. It always does.' : 'If the Edur come, I will ask it to be slow for them.'}"`);
      if (b7In('tebbet')) ln.push(`Tebbet is fletching arrows with goose feathers off the mill-woman's yard. "Edur go down to a good arrow," he says. "Slower than men. But down." He sights along a shaft. "${late ? 'I counted mine tonight. I\'ll not say the number.' : 'I would like a roof to shoot from.'}"`);
      if (b7In('darrut')) ln.push(`Darrut has his helm on his knee. "In the Aren Guard," he says, "we held gates. ${late && k === 'hold' ? 'Tonight we held a street with a mill at the end of it.' : 'Here there are no gates. There is a street, and a mill.'}" He turns the helm. "${late && k === 'hold' ? 'It was the same thing.' : 'It is the same thing, if you stand in it.'}"`);
      if (b7In('yorin')) ln.push(`Yorin has his copper wind-vane on his palm. It swings south, toward the river, and holds there. "Serc likes water," he says. "${late ? 'The wind goes down the river tonight, all the way to the city.' : 'Something on the ridge is pulling the other way. Something with a lot of Edur round it.'}"`);
      if (b7In('rasp')) ln.push(late ? `Rasp is checking fuses with her lips moving. "${S.f.b7_c5_roof ? 'A roof,' : 'Next time,'}" she says. "${S.f.b7_c5_roof ? 'A whole roof. I want to do it again.' : 'next time, a roof. I saw the gable beam. It wanted it.'}"` : `Rasp is looking up at the trapdoor. "The factor's roof," she says. "Slate on oak. Heavy. If something heavy came down on a square from up there, the square would know about it." She grins. "I'm only saying."`);
      if (b7In('orvas')) ln.push(`Orvas is looking at a bridle on a peg, left behind with the factor's horses gone. "Every horse in this country goes to the city ahead of us," he says. "The Burned Tears would laugh." He pulls a strap tight. "${late ? 'They are with the Adjunct. I keep remembering.' : 'I keep remembering they are with the Adjunct.'}"`);
      if (b7In('redblade')) ln.push(`Ramin is scraping the rust off his scale. "${late ? (k === 'hold' ? 'The village stood at its doors when we left,' : 'Nobody stood at the doors when we left,') : 'The village stands at its doors and watches us,'}" he says. "${late && k === 'hold' ? 'In Seven Cities, I would have called that a debt. Here I do not know the word.' : 'In Seven Cities they would have sold us by noon.'}"`);
      if (b7In('warlock')) ln.push(`Keth sits with his knees drawn up, very still. "*A people who hide soldiers under their master's floor,*" the grandmother says, out of his mouth. "*${late && k === 'slip' ? 'And soldiers who leave them there. I have seen that before, boy. I have seen it end.' : 'My mother\'s country had a word for such people. It was not a word for slaves.'}*"`);
      if (b7In('mehet')) ln.push(`Mehet is turning his ring of keys over. "${late ? 'There was a door in the mill to the race,' : 'The mill has a door to the race,'}" he says. "Every mill in Y'Ghatan did. For the miller, when the tax-men came." He holds one key up to the light. "${late ? 'I hope she used it.' : 'I showed the old woman how to bar it from the inside. She knew already.'}"`);
      if (b7In('ottar')) ln.push(`Ottar is cleaning the wolf on his shield with a thumb. "Today's word," he says, "is *mill-race*." He tries it again. "${late && k === 'hold' ? 'We held a square with a mill-race behind it. In Perish we would make a song. Here, I think, they will tell it in a kitchen. It is better.' : 'In Perish we do not have mills. We have wolves. Wolves do not need a race.'}"`);
      if (b7In('doss')) ln.push(late ? (k === 'hold' ? `Doss is looking back across the fields at the village. He has not stopped looking since the bank. "They hid us," he says. "Under the factor's own floor. And we stood up for them." He wipes his face with the back of his hand. "Not one soul ever stood up for us on the holding. Not once. Twenty-six harvests."` : `Doss is not looking back at the village. He is looking at his hands, which have the flail in them, and are very still. "They hid us," he says. "Under the factor's floor." That is all he says. It is enough. He turns the flail over in his hands.`) : `Doss is sitting by the barrels. "On the holding," he says, "if you hid a man from the overseer, you went in the rolls for his debt too." He looks up at the trapdoor. "Everyone up there knows that. They hid us anyway."`);
      if (b7In('wenna')) ln.push(late ? `Wenna has her bare feet in the river and her eyes shut. "${k === 'hold' ? 'The Shore heard,' : 'The Shore saw,'}" she says, after a while. "${k === 'hold' ? 'She liked it. She doesn\'t like much.' : 'She doesn\'t say anything. She never does, when she\'s angry.'}"` : `Wenna is listening to the mill-race through the wall. "That goes to the river," she says. "The river goes to the sea. Past the city, but it gets there." She shrugs. "Everything does, if you're patient."`);
      if (late && fell.length) ln.push(`${fell.length > 1 ? 'There are gaps' : 'There is a gap'} in the ring where ${b75And(fell.map(NAME))} ${fell.length > 1 ? 'would sit' : 'would sit'}. The squad sits round ${fell.length > 1 ? 'them' : 'it'}, and does not close ${fell.length > 1 ? 'them' : 'it'} up.`);
      return {sp:ph >= 4 ? 'The lie-up in the reeds' : ph === 1 ? 'The river road' : 'The factor\'s cellar', scene:ph >= 4 ? 'b7_c5_river' : ph === 1 ? 'b7_c5_lane' : 'b7_c5_cellar', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back.', go:'b7_c5_fire'}]}; },

    /* the mill-woman: who hid the Third, and the bailiff */
    b7_c5_miller:()=>({sp:'The mill-woman', scene:'b7_village', fx:()=>{ S.f.b7_c5_miller = 1; }, again:()=>'The mill-woman in the square, floury to the elbow, watching the north road.', txt:
`The mill-woman is standing by the well with her arms folded, watching the north road, which is empty. She keeps watching it when you come up.

"The factor's had this village forty years," she says. "His father before him. Every family in it owes him, and the mill owes him, and I owe him for the stones in it, which my husband's grandfather bought." She spits, neatly, into the dust. "${b75Word() ? 'Then word came down the valleys that Malazans were burning the rolls. Burning them. In the factor\'s own house.' : 'Then word came down the valleys that there were Malazans in the country, and the Edur hunting them.'} So when your lieutenant's runner came asking who'd hide a squad, I said I would." She looks at you at last. "${b75Word() ? 'And the rest said they would too, before I\'d finished saying it.' : 'The rest shut their doors. They\'re not bad. They\'re frightened. So am I.'}"

"There's one thing you should know." She jerks her chin at the house beside the factor's, with a board nailed to its door. "The bailiff. The factor's man. He rode north at noon on his cob, with two of the factor's men walking beside him, and he didn't say where." She is quiet a moment. "He doesn't need to."`,
      ch:[{t:'"Where does the north lane go?"', go:'b7_c5_miller_lane'},
          {t:'"Why hide us at all?"', req:()=>!S.f.b7_c5_millerWhy, go:'b7_c5_miller_why'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_miller_lane:()=>({sp:'The mill-woman', scene:'b7_village', fx:()=>{ S.f.b7_c5_lane = 1; }, txt:
`"Up past the orchards to the ridge," she says, "where the fires were last night. A cob walks it in an afternoon. A man walking beside a cob, longer." She looks at the sun. "If you went now, by the field-drains, you might be on the lane before he's at the top of it."

"And if you don't," she says, "he'll tell them how many of you there are, and where, and that it was me." She unfolds her arms. "I'm not asking. I'm telling you what's so."${b75If('doss', `\n\nDoss has heard. "The bailiff," he says. "On our holding he read the board on quarter-days. He wasn't a bad man." He picks up his flail. "He was the factor's."`)}`,
      ch:[{t:'Out by the north gate, after the bailiff.', go:'b7_c5_gate'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_miller_why:()=>({sp:'The mill-woman', scene:'b7_village', fx:()=>{ S.f.b7_c5_millerWhy = 1; }, txt:
`She considers the question as if it were a sack of grain she had been asked the weight of.

"My grandson's father went to the army," she says. "The Letherii army, to pay down the family's line. Two years since. The Edur sent his company east." She shrugs. "He's not come back. The line's not paid down. The factor added the cost of his boots."

"So." She looks at the north road again. "The Edur are the ones who came. The factor's the one who stayed in the city. And you're the ones who burn rolls, or so they say." She almost smiles. "Gran doesn't know much about soldiers. Gran knows about debts."`,
      ch:[{t:'"Where does the north lane go?"', go:'b7_c5_miller_lane'},
          {t:'Back to the square.', go:()=>startExplore()}]}),

    /* the well: the Indebted at the well, and the short way after the bailiff (rise:true) */
    b7_c5_well:()=>({sp:'The well in the square', scene:'b7_village', again:()=>'The well in the square, a bucket on its chain, the village\'s women filling jars and not looking at the Third.', txt:
`The well in the square has a stone head worn smooth by forty years of jars, and a bucket on a chain. ${b75Word() ? 'There are women filling jars at it, who stop when the Third comes, and then go on, and one of them holds out a cup of water to whoever is nearest.' : 'There are women filling jars at it, who stop when the Third comes, and wait, and fill their jars when the Third has gone by.'}

The water is cold and tastes of iron. The squad fills its skins.${!S.f.b7_c5_bailiffDone && S.f.b7_c5_lane ? `\n\nOne of the women is the boy's mother, or his aunt; she has his chin. She is looking at the north lane, and then at you.` : ''}`,
      ch:[{t:'Ask the women for the short way to the north lane, through the fields.', req:()=>b75Ph() === 2 && !!S.f.b7_c5_lane && !S.f.b7_c5_bailiffDone && !S.f.b7_c5_shortTried, check:['guile', 15], rise:true, fx:()=>{ S.f.b7_c5_shortTried = 1; },
            edges:id=>[id === 'doss' && ['he talks to them the way field-hands talk to field-hands', 3], id === 'wenna' && ['a woman from the coast, barefoot, not a soldier', 1], id === 'marrow' && ['an old woman with a string of knots; they trust her on sight', 1], b75Word() && id === 'sgt' && ['they know who burned the rolls', 2], id === 'ottar' && ['seven feet of grey plate frightens women at a well', -2], id === 'sathi' && ['her filed teeth frighten women at a well', -1]],
            near:{t:()=>`Yes, but they tell you a way that goes through the stinging nettles at the bottom of the orchard, and ${b75Nm(b75Who())} ${b75V(b75Who(), 'find', 'finds')} out about it first, the hard way.`, fx:()=>bruise(b75Who(), bruiseN())},
            go:'b7_c5_well_ok', fail:'b7_c5_well_no'},
          {t:'Back to the square.', go:()=>startExplore()}]}),
    b7_c5_well_ok:()=>({sp:'The well in the square', scene:'b7_village', fx:()=>{ S.f.b7_c5_short = 1; }, txt:
`The boy's mother puts down her jar. "The orchard," she says, "then the ditch along the barley, then the old hedge. You come out on the lane at the stone cross, above the bend." She draws it in the wet round the well-head with one finger. "He'll still be on the bend. He's a slow rider. He doesn't like to hurry the cob."

She wipes the drawing out with her foot before anybody else can see it.`,
      ch:[{t:'Out by the north gate, by the short way.', go:'b7_c5_gate'},
          {t:'Back to the square.', go:()=>startExplore()}]}),
    b7_c5_well_no:()=>({sp:'The well in the square', scene:'b7_village', txt:
`The women look at each other, and at their jars, and the well is very quiet. One of them picks up her jar and goes home. Then another.

It is not unfriendly. It is only that the bailiff has a board on his door with all their names on it, and the Third does not.`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),

    /* the north gate: after the bailiff (optional fight), or the way the Edur will come */
    b7_c5_gate:()=>{ const ph = b75Ph();
      return {sp:'The north gate', scene:'b7_village', txt: ph >= 3 ?
`The north gate stands open on the lane and the orchards and, above them, the ridge, going dark. That is where they will come from.` : S.f.b7_c5_bailiffDone ?
`The north gate, and the lane up through the orchards, empty now. ${S.f.b7_c5_bailiff === 'village' ? 'The bailiff is in the mill, with the door barred.' : 'The bailiff is tied in the factor\'s stable for the column.'}` : !S.f.b7_c5_lane ?
`The north gate: two posts and a hurdle, and the lane going up through the orchards toward the ridge. Empty. The village will know who went up it last.` :
`The north gate, and the lane going up through the orchards toward the ridge. ${S.f.b7_c5_short ? 'The boy\'s mother\'s way goes off to the left, through the orchard, by the barley ditch.' : 'Somewhere up there, a bailiff on a cob, going slow.'}`,
        ch:[{t:S.f.b7_c5_short ? 'The short way: the orchard, the ditch, the stone cross.' : 'Up the lane after the bailiff.', req:()=>ph === 2 && !!S.f.b7_c5_lane && !S.f.b7_c5_bailiffDone, go:'b7_c5_bailiff_view'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c5_bailiff_view:()=>({sp:'The north lane', scene:'b7_village', txt:
`${S.f.b7_c5_short ? 'The boy\'s mother\'s way is a good one. The Third comes out of the old hedge at the stone cross above the bend in the lane with the sun on its back, and there below, coming slowly up the bend, is the bailiff.' : 'The lane goes up through the orchards in the heat, and the Third goes up it as fast as heavies go up anything, and at the bend below the ridge, there is the bailiff.'}

He is on a grey cob, in a good coat with a letter in the breast of it, and round him walk the factor's men with cudgels, and one with a crossbow on his shoulder. He sees the Third, and his face does what a man's face does when he has done something he will now have to answer for.${b75If('doss', `\n\nDoss stops. "I know that coat," he says. "Not him. The coat. They all have the same coat."`)}`,
      ch:[{t:'"Third." At them.', go:()=>startBattle('b7_c5_bailiff', S.f.b7_c5_short ? {surprise:'p'} : {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_bailiff_after:()=>({sp:'The north lane', scene:'b7_village', fx:()=>{ S.f.b7_c5_bailiffDone = 1; }, html:risingHTML(), txt:
`The factor's men are down or gone into the orchards, and the cob is standing in the lane eating somebody's hedge, and the bailiff is sitting in the dust with his good coat torn and his hands up.

The letter is in his coat. It is short, and well written, in a bailiff's careful hand, addressed to *the honoured warriors of the Tiste Edur on the ridge*: Malazan soldiers, so many, in the factor's cellar, hidden there by the mill-woman and her family and others, whose names follow. There are a great many names.

"I owe him too," the bailiff says, without being asked. "The factor. More than any of them. He'd have known, after. He always knows." He looks at the letter in your hand. "What will you do with me?"`,
      ch:[{t:'"The village can decide." Take him back and hand him to the mill-woman.', fx:()=>{ if (!S.f.b7_c5_bailiff) { S.f.b7_c5_bailiff = 'village'; b7Rise(1, 'a bailiff handed to his village'); b75L('doss', 1); b75L('haddat', 1); b75L('mirrel', -1); } }, go:'b7_c5_bailiff_village'},
          {t:'Tie him in the factor\'s stable. The column can have him.', fx:()=>{ if (!S.f.b7_c5_bailiff) { S.f.b7_c5_bailiff = 'column'; b75L('mirrel', 1); b75L('marrow', 1); b75L('doss', -1); } }, go:'b7_c5_bailiff_column'}]}),
    b7_c5_bailiff_village:()=>({sp:'The mill-woman', scene:'b7_village', html:risingHTML(), txt:
`The mill-woman reads the letter standing in the square, all of it, every name, with her lips moving. Then she folds it and puts it in her apron.

"In the mill," she says, to two men who have come out of their doors. They take the bailiff by the arms, not roughly, and put him in the mill, and bar the door. What the village means to do with him after, it keeps to itself. The Third does not ask.

"He was at my wedding," the mill-woman says. She goes back to the well.${b75If('doss', `\n\nDoss watches the mill door a while. "On the holding," he says, "nobody ever got to decide anything." He does not say whether he is glad.`)}`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    b7_c5_bailiff_column:()=>({sp:'The factor\'s stable', scene:'b7_village', txt:
`The bailiff goes into the factor's empty stable without being pushed and sits down in the straw, and thanks you when the rope is tied. ${b75Say({mehet:'Mehet ties it, and then, out of habit, checks the knot twice.', tangle:'Tangle ties it with fuse-cord. "Comes off with a good pull," he says, "if you know where." The bailiff does not know where.', _:'The knots are good ones.'})}

The mill-woman watches from the square, and goes back to the well. The letter goes in your coat.`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),

    /* the bailiff's door: the quarter-day board (Doss) */
    b7_c5_board:()=>({sp:'The bailiff\'s door', scene:'b7_village', fx:()=>{ S.f.b7_c5_board = 1; }, again:()=>'The bailiff\'s door, and the board on it.', txt:
`The bailiff's house is next to the factor's and a size smaller, as if it had been told to stand there. On its door, nailed at the height of a man's eyes, is a board of planed wood with every family's name burned into it, and beside each name a row of notches cut with a knife, and every so often one of the notches filled in with red.

${b7In('doss') ? `Doss stands in front of it until the squad shifts its feet.

"Quarter-day board," he says at last. "Same as ours. You come on the day and the bailiff reads you your line off the book inside, and then he cuts the notch, so you can see it every time you go by." He touches one of the red ones. "That's when you missed. You can't read the book. You can read the red."

He does not take it down. He looks at the squad, and then at you.` : `It takes a moment to work out what it is. Then it does not.`}`,
      ch:[{t:'Take the board down and put it in the well.', req:()=>!S.f.b7_c5_boardDown, fx:()=>{ S.f.b7_c5_boardDown = 1; b75L('doss', 1); }, go:'b7_c5_board_down'},
          {t:'Leave it. It is the village\'s board, not the Third\'s.', go:()=>startExplore()}]}),
    b7_c5_board_down:()=>({sp:'The bailiff\'s door', scene:'b7_village', txt:
`It comes off the door with four nails and a squeal, and ${b75Say({doss:'Doss carries it', haddat:'Haddat carries it', _:'the squad carries it'})} across the square and drops it down the well, where it hits the water with a flat smack and floats, face up, all the names on it looking at the sky.

The women at the well look at it a while. Then one of them laughs, once, and puts her hand over her mouth.${b75If('doss', `\n\nDoss stands at the well-head, looking down. "It floats," he says. He sounds as if that were the most surprising thing he had ever seen.`)}`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),

    /* the meeting house: the old shield */
    b7_c5_hall:()=>({sp:'The meeting house', scene:'b7_village', again:()=>'The meeting house, its one chair, the pale place on the wall.', txt:
`The meeting house is one room with benches round the walls and one chair at the end, for whoever is speaking. ${S.f.b7_c5_shield ? 'Above the chair, on the wall, there is a pale oval where the old shield hung.' : 'Above the chair, on two pegs, hangs a shield: a wide oval of oak planks bound in iron and faced with hide, with a heron painted on it in a blue that was bright once.'}

${S.f.b7_c5_shield ? 'The mill-woman sweeps the floor round the chair, and keeps her back to the wall.' : `The mill-woman has followed you in. "From a war," she says, "before my grandmother. Not one of us was in it. A soldier left it here, going home, and nobody ever came back for it." She looks at it. "It's done nothing on that wall but get dusty."`}`,
      ch:[{t:'"Will the village lend it to the Third?"', req:()=>!S.f.b7_c5_shield, fx:()=>{ S.f.b7_c5_shield = 1; gain('b7_c5_villageshield'); b75L('haddat', 1); }, go:'b7_c5_hall_take'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_hall_take:()=>({sp:'The meeting house', scene:'b7_village', txt:
`She takes it down herself, standing on the chair, which nobody but the speaker is supposed to stand on. It is very heavy. She does not let anyone help.

"Lend," she says, and snorts, and hands it over. "Take it. A shield on a wall's a sad thing." She dusts the heron with her apron, once. "Bring it back if you're passing. You won't be."${b75Say({haddat:`\n\nHaddat takes it in both hands and tries the weight of it, and the grip, and the way it sits on her arm. "Old," she says. "Good." From her it is a speech.`, ottar:`\n\nOttar holds it up to the light. "A bird," he says. "In Perish we put wolves. A bird is braver, I think. It has less to fight with."`, _:''})}`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),

    /* the square at noon: the trick (Haddat; else Ottar; else Darrut; else the sergeant's own drill) */
    b7_c5_square:()=>{ const te = b75Teacher();
      return {sp:te === 'sgt' ? 'The square' : NAME(te), scene:'b7_village', again:()=> S.f.b7_c5_squareOk ? 'The square, where the Third learned the step.' : 'The square at noon, the shutters closed, the dust hot.', txt:
`The square at noon, the shutters closed against the heat and the Third against the eyes, and nobody on the north road. ${te === 'haddat' ? `Haddat walks out into the middle of it and stands there with the blue shield, looking at the four streets that come into it.

"My first sergeant in the Hissar garrison taught us the square," she says. "Everyone knows the square. Four shields out, corners locked, nobody looks behind." She sets the shield. "He taught the other part too. No other sergeant did. On the word, the square does not stand. It steps. All four faces, three paces, at once." She looks round. "It is hard. You need to hear the word with your feet."` : te === 'ottar' ? `Ottar walks out into the middle of it with his tall shield and stands there, considering the four streets.

"The Grey Helms have a wall that goes forward," he says. "You saw it at sea, perhaps." He sets the shield. "With four faces it is a square. With four faces that go forward at the same breath, it is a thing the enemy does not expect, because he thinks a square is a box. It is not a box. It is a fist." He looks round. "It is hard. In Perish the children practise it with wooden shields."` : te === 'darrut' ? `Darrut walks out into the middle of it with his helm under his arm and stands there, looking at the four streets.

"The Aren Guard drilled the square on the parade ground every morning," he says. "Four shields, corners locked. And the step: on the word, three paces, all four faces at once." He puts the helm on. "We were very good at it. We were very good at a great many things nobody needed." He looks round. "It is hard to learn in an afternoon."` : `You walk out into the middle of it and stand there, looking at the four streets.

Every soldier learns the square. Four shields out, corners locked, nobody looks behind. An old sergeant on the drill-ground at Aren taught the Third the other part of it, once, in a morning, and you have half-remembered it ever since: on the word, the square steps. All four faces, three paces, at once. You were never sure the old man had not made it up.`}`,
        ch:[{t:'Drill the square in the noon heat until it steps on the word.', check:['wits', 17], trick:'b7_c5_square', req:()=>!S.f.b7_c5_squareTried, fx:()=>{ S.f.b7_c5_squareTried = 1; },
              edges:id=>[id === 'haddat' && ['the blue shield, and a Hissar garrison sergeant\'s drill', 3], id === 'ottar' && ['the Grey Helms\' wall goes forward', 3], id === 'darrut' && ['the Aren Guard drilled it every morning', 2], id === 'hessa' && ['she fights behind a shield', 1], id === 'redblade' && ['the Red Blades held squares at Aren', 1], id === 'sgt' && ['the Aren drill-ground, half remembered', 1], id === 'tangle' && ['a sapper does not stand in squares', -1], id === 'marrow' && ['a healer stands in the middle of a square, not on its face', -1], id === 'wenna' && ['the Shake do not fight in squares', -1]],
              near:{t:()=>`Yes, but on the third try the square steps and ${b75Nm(b75Who())} ${b75V(b75Who(), 'do', 'does')} not, and ${b75V(b75Who(), 'take', 'takes')} a shield-rim in the ribs from the face behind. ${b75Nmc(b75Who())}'ll feel it tonight.`, fx:()=>bruise(b75Who(), bruiseN())},
              go:'b7_c5_square_ok', fail:'b7_c5_square_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c5_square_ok:()=>({sp:'The square', scene:'b7_village', fx:()=>{ S.f.b7_c5_squareOk = 1; b75L(b75Teacher(), 1); }, txt:
`It takes the whole of the afternoon, in the heat, with the shutters closed all round and, behind them, the village watching through the cracks. Then, late, ${by({sgt:'you say the word', haddat:'Haddat says the word', ottar:'Ottar says the word', darrut:'Darrut says the word', _:'{who} says the word'})}, and the square steps: four faces, three paces, one sound, like a door slammed by a giant.

Behind one of the shutters, somebody claps, twice, and stops.`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),
    b7_c5_square_no:()=>({sp:'The square', scene:'b7_village', txt:
`It is very hot. The square steps, and two of its faces step and the other two do not, and the corners come apart, and somebody sits down in the dust. It does it again. And again.

${b75Teacher() === 'haddat' ? '"It took us a year," Haddat says, not unkindly. "You had an afternoon."' : b75Teacher() === 'ottar' ? '"The children in Perish take a winter," Ottar says. "And they are good children."' : b75Teacher() === 'darrut' ? '"It took us a year," Darrut says, "and we did nothing else."' : 'Perhaps the old man did make it up.'}`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),

    /* the mill-woman's grandson (phase 2): the race door */
    b7_c5_grandson:()=>({sp:'The boy', scene:'b7_village', fx:()=>{ S.f.b7_c5_grandson = 1; }, again:()=>'The boy, with a sack of flour bigger than he is.', txt:
`The boy who brought the Third in is crossing the square with a sack of flour on his back that is nearly as big as he is, because the mill does not stop for Malazans. He puts it down to look at the Third properly in daylight.

"You're bigger in the day," he says. He considers this. "Gran says if the Edur come, you're to go out by the race door. In the back of the mill. That's what it's for. My great-grandad made it for when the tax-men came." He picks the sack up again. "The tax-men are the factor's now. It still works."

"Is it true in your country nobody owes anybody?" he asks, at the corner, and does not wait for an answer, which is as well.${b75If('tallow', `\n\nTallow watches him go. "He showed me the door this morning," he says. "Proud of it. Every village has one."`)}${b75If('doss', `\n\nDoss watches him go with the flour. "I carried sacks like that at his age," he says. "On my back. Twenty years." He rolls a shoulder, remembering.`)}`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),

    /* the mill (phase 2 and after) */
    b7_c5_mill:()=>({sp:'The mill', scene:'b7_village', again:()=>'The mill, its stones turning, the race loud under the floor.', txt:
`Inside, the mill is all noise and flour: the great wheel turning outside on the race, the shaft coming in through the wall, and the stones grinding on each other with a sound like a giant chewing, slowly, for ever. There is nothing between them. The mill-woman keeps them turning so the factor's men will hear the mill and think nothing has changed.

"My husband's grandfather bought those stones," she says, from the hopper, without turning round. "From the factor's father. We still owe for them." She brushes flour off her arm. "Three lifetimes, a pair of stones. You'd think they'd be paid for."

In the back wall, down by the water, there is a low door with a bar on the inside. Beyond it, the race and the river path.${b75If('mehet', `\n\nMehet tries the bar, and lifts it, and sets it again. "Every mill in Y'Ghatan had one," he says. "For the miller, when the tax-men came." He nods to the mill-woman. She nods back, as one tradesman nods to another.`)}`,
      ch:[{t:'Back to the square.', go:()=>startExplore()}]}),

    /* the river's edge on the road (phase 1) */
    b7_c5_reeds:()=>({sp:'The river\'s edge', scene:'b7_c5_lane', again:()=>'The river\'s edge, the posts with nothing tied to them.', txt:
`Down through the reeds the river comes right up to the road's edge, black and slow and very wide. There is a landing-stage here, three planks on posts, and the posts have ropes on them, cut, and nothing at the ends. In the reeds beside it lies a keel with the ribs burned off it, black, half under the water.

Whoever it was, they wanted the boats gone from this bank. The Edur, or the Letherii, or the people who owned them, before either could take them.${b75If('wenna', `\n\nWenna crouches and touches the burned keel. "Clinker," she says. "A good one. My brother's was like this." She stands up and does not touch anything else.`)}${b75If('tangle', `\n\nTangle looks at the river, and then at his satchel, and then at the river. "Can't swim," he says. "Never could. Just so everybody knows."`)}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* marines in the reeds (phase 4): the bank's news */
    b7_c5_marines4:()=>({sp:'Marines in the reeds', scene:'b7_c5_river', fx:()=>{ S.f.b7_c5_marines4 = 1; }, again:()=>'The marines in the reeds, passing a skin, telling the night over.', txt:
`A marine squad is sitting in the reeds next to the Third with its boots off, passing a skin and telling the night over to itself, the way squads do.

"The big village held," one of them says. "Up the road. House to house, all evening. They say a cusser took the factor's house and the whole street with it." He drinks. "They say a lot of things. Some of them didn't come out. They say that too."${b75Key() === 'hold' ? `\n\nAnother looks at the Third. "There's a story going up the bank," she says, "about heavies in a mill village and a roof." She looks at the Third's shields. "That you?" The Third lets the question go by. She nods as if it had been answered.` : `\n\nAnother looks across the fields at the light over the trees, and then at the Third, and passes the skin the other way.`}`,
      ch:[{t:'Back to the bank.', go:()=>startExplore()}]}),

    /* the mill-race, south: the river, and the way out (slip) */
    b7_c5_race:()=>({sp:'The mill-race', scene:'b7_c5_river', again:()=>'The mill-race, the wheel, the river beyond.', txt: b75Ph() >= 3 && b75Key() === 'slip' && !S.f.b7_c5_slipDone ?
`The mill-race runs out under the wheel to the river, and the river path goes off east under the willows into the dark. That is the way out.` :
`The mill-race runs from the river under the wheel and back to the river, fast and brown, and beyond it the river itself, very wide, very slow, with the light on it. There are no boats. There are posts in the bank where boats were tied, and nothing tied to them.${b75If('wenna', `\n\nWenna is sitting on the race wall with her feet in the water. "They took the boats," she says. "Up and down the river. All of them." She wriggles her toes. "The river doesn't care. It goes to the city anyway. Past the city, to the sea."`)}${b7In('tallow') ? `\n\nTallow is looking at the little door in the mill's back wall, down by the water. "Every village has one," he says. "The boy showed me."` : ''}`,
      ch:[{t:'The river path.', req:()=>b75Ph() >= 3 && b75Key() === 'slip' && !S.f.b7_c5_slipDone, onward:true, go:'b7_c5_slip_start'},
          {t:'Back to the square.', go:()=>startExplore()}]}),

    /* ======== phase 3: dusk; the warning; the key ======== */
    b7_c5_dusk:()=>({sp:'The mill village', scene:'b7_village', fx:()=>{ if (b7Guides()) S.f.b7_c5_warned = 1; }, txt: b7Guides() ?
`Dusk, and the Third comes up out of the factor's cellar into a village that is already moving.

Children are running in from the north fields, three of them, four, the boy in front, and none of them shouting, because somebody told them not to. The boy goes straight to the mill-woman and says something with his whole body. She listens, and nods, and turns to you across the square.

"Edur," she says. "Off the ridge. Coming down the north lane, a band of them. Forty, the boy says. Fifty. With one of their priests." She looks at the light. "Not yet. Soon. Before full dark." The children have been in the fields all afternoon, it seems, every one of them, watching the lane, because the whole village decided they should. The Third was not asked.

There is time. Not much. Enough to choose.` :
`Dusk, and the Third comes up out of the factor's cellar into a village that has gone very still.

There is somebody running down the north lane, through the orchards: a man of the village, coming home from the fields too late, and running as if something were behind him. He comes in through the north gate and does not stop, and the mill-woman catches his arm, and he says one word, and she lets him go.

"Edur," she says, across the square. "On the lane. A band of them. With one of their priests." She looks north, where the orchards are going dark. "They're at the top orchard. They'll be at the gate before the light's gone."`,
      ch:[{t:'The mill-woman, in the square.', go:'b7_c5_key'}]}),
    b7_c5_key:()=>({sp:'The mill-woman', scene:'b7_village', html:risingHTML(), again:()=> b75Key() ? (b75Key() === 'hold' ? 'The square, and the street, and the Edur coming. The Third holds.' : 'The mill-race and the river path. The Third goes.') : 'The mill-woman in the square, and the north lane going dark.', txt: b75Key() ?
`It is decided. ${b75Key() === 'hold' ? 'The Third holds the village.' : 'The Third goes out by the river path.'}` :
`The mill-woman stands in the middle of the square with her floury arms folded and her grandson beside her, and behind her the village is at its doors: old men, women, children, a dog. They are looking at the Third. The square is silent.

The Edur do not leave a village that has hidden Malazans. Everybody in the square knows it. The mill-woman knew it this morning when she opened the factor's door.

The river path runs east from the mill-race under the willows, a cart wide, toward the ford and the column, and in the dark a squad might go along it and be gone before the Edur are through the gate. Or the Third can stand in the street, between the gate and the square, while the village goes down to the river by the mill, and hold it, for as long as that takes, against whatever comes down the lane.

${b75Say({haddat:`Haddat has the blue shield on her arm. "Wherever you say, Sergeant," she says, in Hissari. She is looking at the children.`, _:'The squad waits for you.'})}${b75If('doss', `\n\nDoss is looking at the mill-woman. "They hid us," he says. "Under the factor's floor." He leaves it there. He does not need to say more.`)}${b75If('mirrel', `\n\nMirrel is counting the salves in her bag without taking them out. "Forty Edur," she says. "And a priest. And us." She does not say which she wants. She is a counter. She is saying what she counted.`)}${b75If('tangle', `\n\n${b75CanRoof() ? `Tangle is looking up at the factor's roof. "Slate on oak," he says. "Heavy. If somebody put the right thing in the right beam." He does not finish.` : `Tangle has the satchel on his back. "Not much left in it," he says. "I'm only saying."`}`)}${b75If('wenna', `\n\nWenna is looking at the river. Then she looks at the Edur end of the street, and her hand goes to her gaff. "I didn't come inland to run from Edur," she says. "But it's your crew."`)}

The mill-woman says, "Well, Malazan?" She does not beg. She asks.`,
      ch:[{t:'"We hold the village." (a mortal fight: whoever falls here stays down)', tag:'mortal', req:()=>!b75Key(), fx:()=>{ if (!S.f.b7_c5_key) { S.f.b7_c5_key = 'hold'; b7Rise(2, 'the Third held a village that hid it'); b75L('haddat', 1); b75L('doss', 2); b75L('wenna', 1); b75L('mirrel', -1); b75L('marrow', -1); } }, go:'b7_c5_hold'},
          {t:'"We go, by the river path. Tonight."', req:()=>!b75Key(), fx:()=>{ if (!S.f.b7_c5_key) { S.f.b7_c5_key = 'slip'; b7Rise(-2, 'the Third left a village that hid it'); b75L('mirrel', 1); b75L('marrow', 1); b75L('tangle', 1); b75L('haddat', -1); b75L('doss', -2); b75L('wenna', -1); } }, go:'b7_c5_slip'},
          {t:'"Not yet."', req:()=>!b75Key(), go:()=>startExplore()},
          {t:'The street.', req:()=>b75Key() === 'hold' && !S.f.b7_c5_holdDone, onward:true, go:'b7_c5_hold'},
          {t:'The river path.', req:()=>b75Key() === 'slip' && !S.f.b7_c5_slipDone, onward:true, go:'b7_c5_slip_start'},
          {t:'Not now.', req:()=>!!b75Key(), go:()=>startExplore()}]}),

    /* ---- 'hold': the street, the roof, the square (the mortal fight) ---- */
    b7_c5_hold:()=>({sp:'The mill-woman', scene:'b7_village', html:risingHTML(), txt:
`The mill-woman nods once, as if you had told her the price of flour, and turns to the village. "The mill," she says. "The race door. Down to the river and along the bank to the willows. Now." They go. Old men carrying children, women carrying old men, a dog carrying nothing and in everyone's way. Not one of them runs. They have done this in their heads all day.

She is the last. At the corner of the mill she stops and looks back at the Third in the square, all of it, one by one, the way she looked at the squad in the factor's doorway this morning, weighing.

"Heavier than I was told," she says. Then she is gone.${S.f.b7_c5_roof ? '' : b75CanRoof() ? `\n\n${b75Sap() ? `${NAME(b75Sap())} is looking up at the factor's roof again.` : 'The factor\'s roof hangs over the top of the square, slate on oak, heavy.'} There is a little time. Enough for one thing.` : ''}`,
      ch:[{t:`${b75SapN()} ${b75Sap() ? 'puts' : 'put'} ${((S.inv && S.inv.cusser) || 0) >= 1 ? 'the cusser' : 'the transport\'s last two sharpers, bound together,'} in the factor's roof, over the square.`, tag:((S.inv && S.inv.cusser) || 0) >= 1 ? 'uses 1 cusser' : 'uses 2 sharpers', req:()=>!S.f.b7_c5_roof && !S.f.b7_c5_roofTried && b75CanRoof(), check:['wits', 15], rise:true, fx:()=>{ S.f.b7_c5_roofTried = 1; },
            edges:id=>[(id === 'tangle' || id === 'rasp') && ['a cusser in a roof is a sapper\'s work', 3], id === 'mehet' && ['he knows how a roof sits on a house', 1], b75Word() && ['the village carries it up through the loft for you', 2], b75Strip() && id === b75Sap() && ['the transport\'s stores, saved off the beach for something like this', 1], id === 'ottar' && ['grey plate in a loft', -2], id === 'haddat' && ['she does not like being under what she is about to bring down', -1]],
            near:{t:()=>`Yes, but the loft floor goes under ${b75Nm(b75Who())} on the way back, and ${b75Nm(b75Who())} ${b75V(b75Who(), 'come', 'comes')} down through the factor's ceiling into his best room. Bruised. The fuse is set.`, fx:()=>bruise(b75Who(), bruiseN())},
            go:'b7_c5_roof_ok', fail:'b7_c5_roof_no'},
          {t:'The street. (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:'b7_c5_hold_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_roof_ok:()=>({sp:'The factor\'s roof', scene:'b7_village', fx:()=>{ if (!S.f.b7_c5_roof) { S.f.b7_c5_roof = 1; if ((S.inv.cusser || 0) >= 1) S.inv.cusser--; else S.inv.sharper = Math.max(0, (S.inv.sharper || 0) - 2); note(`The factor's roof is rigged. A fuse-cord runs down the gable to the square.`, 'good'); } }, txt:
`Up through the factor's house, through his best rooms with their good furniture under sheets, up a ladder into the roof-space, hot and dark and smelling of old thatch under the slate. ${b75Word() ? 'Three of the village\'s men come up the ladder behind with a lantern and a rope, without being asked, and hold the light, and say nothing, and go back down.' : ''}

The gable beam over the square is oak, black with age, as thick as a man. ${b75SapN()} ${b75Sap() ? 'wedges' : 'wedge'} ${((S.inv && S.inv.cusser) || 0) >= 1 ? 'the cusser' : 'the two sharpers, bound together with fuse-cord,'} into the joint where it meets the wall, packs it with the factor's own linen, and runs the fuse down the outside of the gable to a hook by the door.${b75Say({tangle:'\n\n"Pull it when they\'re under," Tangle says, coming down. "Not before. Not after. Under."', rasp:'\n\n"Pull it when they\'re under," Rasp says, coming down. "I\'ll pull it. I want to."', _:'\n\nWhen they are under it, you pull. Not before.'})}`,
      ch:[{t:'The street. (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:'b7_c5_hold_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_roof_no:()=>({sp:'The factor\'s roof', scene:'b7_village', txt:
`Up in the roof-space, in the dark, the gable beam turns out to be rotten through where it meets the wall, soft as cheese under a thumb. Anything put there would bring down a few slates and a great deal of dust and nothing else.

There is no time to find another. ${b75Sap() ? `${NAME(b75Sap())} comes back down with the munitions still in the satchel, and says something in Kanese that is not a prayer.` : 'The munitions go back in the satchel.'}`,
      ch:[{t:'The street. (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:'b7_c5_hold_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_hold_start:()=>({sp:'The village street', scene:'b7_village', txt:
`The street from the north gate to the square is forty paces of beaten earth between plaster walls, with garden walls and a cart and a water-butt and the well at the bottom of it, and it is the Third's.

The light goes. Through the gate, up the lane in the orchards, there is movement: grey shapes coming down between the trees without hurry, a great many, and in the middle of them one walking slower, with a darkness round his hands that the dusk does not explain.${S.f.b7_c5_warned ? '\n\nThe children saw them first. The Third is set, shields up, in the street, before the Edur are through the gate. They will have to come to it.' : '\n\nThey are at the gate before the Third is all the way set.'}${S.f.b7_c5_roof ? `\n\nAt the top of the square, the fuse-cord hangs down the factor's gable to its hook.` : ''}
Whoever falls here stays down.`,
      ch:[{t:'"Third. Hold." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:()=>startBattle('b7_c5_village', Object.assign(S.f.b7_c5_warned ? {surprise:'p'} : {}, S.f.b7_c5_bailiffDone ? {drop:[5]} : {}))},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_hold_after:()=>{ const fell = (S.f.lastFallen || []).filter(id => TPL[id]);
      return {sp:'The square by the mill', scene:'b7_village', fx:()=>{ if (!S.f.b7_c5_holdDone) { S.f.b7_c5_holdDone = 1; gain('b7_c5_edurblade'); } }, txt:
`The war-leader goes down in the middle of the square${S.f.b7_c5_roof ? ', in the dust of the factor\'s roof,' : ''} with the long blade still in his hand, and what is left of his band looks at him, and at the Third, and goes back up the street and out of the gate and into the orchards, without hurrying, the way the Edur do everything. The K'risnan's dark goes with them. It is very quiet.

${fell.length ? `${b75And(fell.map(NAME))} did not get up.\n\n${b75Say({haddat:`Haddat kneels by ${fell.length > 1 ? 'them' : b75Him(fell[0])} with the blue shield still on her arm, and says the ${fell.length > 1 ? 'names' : 'name'} in Hissari, and then all the names she has, from the Chain on, with ${fell.length > 1 ? 'these' : 'this one'} at the end.`, marrow:`Marrow kneels with one hand on ${fell.length > 1 ? 'the nearest' : b75Him(fell[0])}, as if the warren could still do something. It cannot. She keeps the hand there.`, _:'The squad stands round in the dark a while.'})}` : `Everyone in the Third got up. You count them twice, in the dark, and get the same number both times, and let your breath go.`}

The village comes back up from the river by the mill-race in ones and twos, the old and the children first, and stands at the corner of the square looking at it. The mill-woman comes last. She looks at the war-leader, and at the Third, and at the factor's house${S.f.b7_c5_roof ? ' with no roof on it' : ''}.

${fell.length ? `"We'll dig," she says. "By the race. We know how." And they do, with their own spades, by lantern-light, deep, and the Third stands by.` : `"Well," she says. "Heavier than I was told." She sounds, for the first time, almost pleased.`}

The war-leader's long blade lies in the dust where he fell. ${b75Say({haddat:'Haddat picks it up, and looks at the marks on its spine, and gives it to the squad.', _:'It goes in the kit.'})}`,
        ch:[{t:'Down to the river. The column is gathering.', go:'b7_c5_hold_out'}]}; },
    b7_c5_hold_out:()=>({sp:'The mill village', scene:'b7_village', txt:
`Toward midnight a marine comes down the river road with word: the Fist is pulling the column together on the riverbank below the village, squad by squad out of the dark. Heavies to the bank.

The mill-woman gives the Third a sack of bread at the race door, and will not take a silver for it. ${b75Fell().length ? `"We'll keep the place by the race," she says. "We'll put a stone. We can't cut letters. We'll know."` : `"Go on, then," she says. "Before I start liking you."`}${b75If('doss', `\n\nDoss is the last to go through the race door. He stops in it, and looks back at the village, at the mill-woman and the boy and the square, as if he were learning it by heart.`)}`,
      ch:[{t:'Down to the riverbank.', onward:true, fx:()=>{ S.f.b7_c5_ph = 4; }, go:()=>{ startExplore('b7_c5_bank'); talk('b7_c5_bank_arrive'); }}]}),

    /* ---- 'slip': out by the river path at night ---- */
    b7_c5_slip:()=>({sp:'The mill-woman', scene:'b7_village', html:risingHTML(), txt:
`The mill-woman looks at you. Then she nods, once, as if you had told her the price of flour, and it was more than she had.

"The race door," she says. "Then the path east under the willows to the ford. You'll find it." That is all. She turns to the village at its doors, and says something to them in Letherii, quietly, and they go in, and the doors close one after another all along the street.

Her grandson stays by her a moment longer, looking at the Third, and then she takes his hand and they go into the mill together.${b75If('doss', `\n\nDoss stands in the square a long time after the mill door has shut. Then he comes, because he said he would march, and he keeps his word. He walks at the back.`)}${b75If('haddat', `\n\nHaddat looks at the children's doors, one after another. Her silence is very loud.`)}`,
      ch:[{t:'The mill-race and the river path.', onward:true, go:'b7_c5_slip_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_slip_start:()=>({sp:'The river path', scene:'b7_c5_river', txt:
`Out through the little door in the mill's back wall, down onto the race wall, along it to the river and the path.

The path goes east under the willows, a cart wide, with the water on the left and the barley on the right, and the dark coming down. Behind, at the north gate, there are voices now, Edur voices, unhurried, and the sound of a gate being opened by people who do not need to knock.

And ahead on the path, coming the other way out of the dusk, spears: the Edur were never going to leave the river open. ${S.f.b7_c5_warned ? 'The children saw them too, and said. The Third is ready.' : ''}`,
      ch:[{t:'"Third. Through them."', onward:true, go:()=>startBattle('b7_c5_slip', Object.assign(S.f.b7_c5_warned ? {surprise:'p'} : {}, S.f.b7_c5_bailiffDone ? {drop:[4]} : {}))},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c5_slip_after:()=>({sp:'The ford', scene:'b7_c5_river', fx:()=>{ if (!S.f.b7_c5_slipDone) { S.f.b7_c5_slipDone = 1; gain('b7_c5_edurblade'); } }, txt:
`The last of them goes down in the shallows at the ford, and the water takes his blade out of his hand and puts it on the gravel at the Third's feet, as if returning it. It is a long Edur blade, dark iron, with marks cut along its spine. It goes in the kit.

The Third crosses the ford, knee-deep, cold, and goes up into the wood on the far side, and nobody follows.

Behind, across the fields, the village is quiet for a while. Then it is not. Then, over the trees, where the village is, there is a light in the sky that grows, slowly, and does not go out.${b75Say({haddat:`\n\nHaddat stops at the edge of the wood and looks back at the light. She stands there until somebody touches her arm. Then she comes.`, doss:`\n\nDoss walks into the wood with the flail on his shoulder and his face to the front, and keeps it there.`, _:'\n\nThe Third keeps its eyes on the wood ahead.'})}`,
      ch:[{t:'Through the wood, to the riverbank. The column is gathering.', onward:true, fx:()=>{ S.f.b7_c5_ph = 4; }, go:()=>{ startExplore('b7_c5_bank'); talk('b7_c5_bank_arrive'); }}]}),

    /* ======== phase 4: the riverbank at night, the column pulling together ======== */
    b7_c5_bank_arrive:()=>({sp:'The riverbank', scene:'b7_c5_river', again:()=>'The riverbank at night, the column coming together in the reeds.', txt:
`The riverbank below the village, in the reeds, in the dark. The column is coming together along it out of the night, squad by squad, the way water comes back together behind a stone: marines out of orchards, out of barns, out of ditches, sitting down in the reeds by their sergeants and counting each other.

${b75Key() === 'hold' ? `Across the fields, the village is dark. Its mill is still turning. ${b75Fell().length ? 'By the race, there is a lantern, and people round it with spades.' : 'Somebody in the square is singing, very quietly, and stops.'}` : `Across the fields, over the trees where the village was, the sky is lit from underneath, a long low red that does not move, and a smoke going up into it.`}

Further up the river, toward the big village with the tavern, there is fighting still: a far noise, and a glow, and once, a long way off, a cusser.${b75Say({marrow:'\n\nMarrow listens to it. "Up the road, child," she says. "Another squad\'s night."', _:''})}`,
      ch:[{t:'The lie-up in the reeds.', go:'b7_c5_fire'},
          {t:'Doss, at the water.', req:()=>b7In('doss') && !S.f.b7_c5_dossBank, go:'b7_c5_doss_bank'},
          {t:'Wenna, on the bank.', req:()=>b7In('wenna') && !S.f.b7_c5_wennaBank, go:'b7_c5_wenna_bank'},
          {t:'Walk the bank.', go:()=>startExplore()}]}),
    b7_c5_lt3:()=>({sp:'The lieutenant', scene:'b7_c5_river', fx:()=>{ S.f.b7_c5_lt3 = 1; }, again:()=>'The lieutenant on the path, her slate on her knee. "First light, Sergeant."', txt:
`The lieutenant is sitting on a stump on the path with her slate on her knee, writing by no light at all, the way she does. She looks up when the Third comes, and looks along it, and counts. ${b75Fell().length ? 'She stops counting before she reaches the end, and starts again, and stops at the same place.' : 'She gets to the end.'}

${b75Key() === 'hold' ? `"The mill village," she says. "I heard. A war-leader and his band, in the square." She makes a mark. "${b75Fell().length ? 'I\'m sorry, Sergeant. For what it\'s worth to anyone.' : 'And all of you still here.'}" She looks across the fields at the dark village. "The country will hear about that, Sergeant. From here to the city."` : `"The mill village," she says, and looks across the fields at the light, and does not make a mark. "You came out whole." It is not a question and it is not praise. "I'd have done the same. Probably. I'd like to think I'd have thought about it longer."`}

"The Fist's word," she says. "We pull together tonight and we go for the city, hard, at first light. No more villages. Captain Sort has the back of the column. The Third walks with my lot." She tucks the slate away. ${S.f.b7_c4_key === 'letherii' ? `"And they say the Letherii have mustered an army against us, and its officers and the Edur aren't speaking. Make of it what you like."` : S.f.b7_c4_key === 'edur' ? `"And they say the Letherii have mustered an army against us, with the Edur watching it from every hill. Make of it what you like."` : `"And they say the Letherii have an army out against us. We'll meet it, I expect."`}`,
      ch:[{t:'"First light. Yes, Lieutenant."', go:()=>startExplore()}]}),
    b7_c5_water:()=>({sp:'The river', scene:'b7_c5_river', fx:()=>{ S.f.b7_c5_water = 1; }, again:()=>'The river, wide and black, going to the city.', txt:
`The river at night is so wide that the far bank is only a line of darker dark, and so quiet that you can hear the column breathing in the reeds all along the bank. It goes east, toward the city, a few days off. There is nothing on it. Not a boat, not a raft, not a log.

${b75Key() === 'hold' ? 'The village\'s light, across the fields, is a lantern by the mill-race, and it stays lit most of the night.' : 'The light over the trees behind is reflected in it, long and red and shaking, all the way across.'}${b75If('wenna', `\n\nWenna crouches at the edge and puts her hand flat on the water. "The Shore's not here," she says. "It's a river." She keeps the hand there anyway.`)}`,
      ch:[{t:'Back to the bank.', go:()=>startExplore()}]}),
    b7_c5_across:()=>({sp:'Across the fields', scene:'b7_c5_river', txt: b75Key() === 'hold' ?
`Back across the fields, the village is dark, its mill turning, and by the race a lantern with people round it. ${b75Fell().length ? 'They are digging. They said they would.' : 'They are standing at their doors, watching the river, where the Malazans are.'} There is nothing for the Third to go back for. The village has what it needs.` :
`Back across the fields, over the trees where the village was, the light. The Third does not go that way. There is nothing to go back for that anyone could carry.`,
      ch:[{t:'Back to the bank.', go:()=>startExplore()}]}),
    b7_c5_doss_bank:()=>({sp:b7In('doss') ? 'Doss' : 'The water', scene:'b7_c5_river', fx:()=>{ S.f.b7_c5_dossBank = 1; }, txt: !b7In('doss') ?
`The water at the edge of the reeds, black and quiet.` : b75Key() === 'hold' ?
`Doss is sitting at the edge of the reeds with his boots off and his feet in the river, which he has never done before in his life, by the look of him. The flail is across his knees.

"She gave us bread," he says. "The mill-woman. At the race door. She wouldn't take silver." He looks at the water. "On the holding, nobody gave anybody anything. You owed it, or you were owed. Mostly you owed." He moves his feet. "I didn't know you could just give a thing."${S.f.b7_c5_boardDown ? `\n\n"The board floated," he says, after a while. "In the well. All the names, looking up." He almost laughs. "I'll remember that when I'm old."` : ''}` :
`Doss is standing at the edge of the reeds with the flail on his shoulder, looking at the river and nothing else. He has not looked across the fields since the ford.

"I said I'd march," he says, before you can say anything. "I'm marching." He is quiet a moment. "On the holding, when the overseer came, you hid. And when they found who hid you, you said nothing, and the factor added it to their line." He shifts the flail. "I thought the soldiers would be different." He does not say whether they were.`,
      ch:[{t:'Back to the bank.', go:()=>startExplore()}]}),
    b7_c5_wenna_bank:()=>({sp:b7In('wenna') ? 'Wenna' : 'The bank', scene:'b7_c5_river', fx:()=>{ S.f.b7_c5_wennaBank = 1; }, txt: !b7In('wenna') ?
`The bank, the reeds, the river going by.` :
`Wenna is crouched on a root above the water, mending a length of cord with her teeth, her gaff beside her.

"A river goes to the sea," she says, round the cord. "Always. This one goes past the city first. The Letherii's great city, with their emperor in it who dies and gets up." She bites the cord off. "We'll walk beside it all the way, I expect. Like a dog beside a cart."

${b75Key() === 'hold' ? `She looks across the fields at the dark village. "My brother would have liked tonight," she says. "He'd have stood in that square. He never ran from anything in his life. That's why he's in the sea."` : `She does not look across the fields. "On the coast," she says, "when the Edur came, we went to sea. Always. You can't hold a beach." She ties a knot. "A village isn't a beach. I'm not sure what it is."`}`,
      ch:[{t:'Back to the bank.', go:()=>startExplore()}]}),

    /* the end: first light, and on */
    b7_c5_onward:()=>({sp:'The riverbank', scene:'b7_c5_river', txt:
`First light, grey on the water, and the column stands up out of the reeds all along the bank at once and goes east along the river toward the city, squad by squad, no longer scattered: a column again, thinner than it was, and moving fast.

${b75Key() === 'hold' ? `Behind it, across the fields, the mill village sits in the grey with its factor's ${S.f.b7_c5_roof ? 'roof in its square' : 'house shut up and empty'} and its mill turning, and its people at their doors, watching the Malazans go. Some of them lift a hand. The mill-woman does not. She stands by the well with her arms folded until the Third is out of sight.` : `Behind it, across the fields, there is a smoke where the village was, going straight up in the still air, and nobody at any door to watch the Malazans go.`}

${b75Fell().length ? `The Third's line is shorter by ${b75Num(b75Fell().length)}. It closes up without being told.` : 'The Third walks in the middle of the lieutenant\'s lot, all of it, heavy and slow, the way the borrowed heavies go.'}${b7In('wenna') ? `\n\nWenna walks at the head of the Third along the river path, barefoot. "Three days to the city," she says. "If nobody stops us." She does not sound as if she expects that.` : ''}${b7In('doss') ? `\n\nDoss keeps to the back of the file${b75Key() === 'hold' ? ', and turns round at every bend for the mill, until the bends hide it.' : ', with his eyes on the ground in front of his boots.'}` : ''}${b75Say({haddat:`\n\nHaddat says the names under her breath as she walks${b75Fell().length ? `, and at the end, new ones: ${b75And(b75Fell().map(NAME))}` : ''}${b75Key() === 'slip' ? ', and after them, very quietly, *the mill village*' : ''}. Then she is done.`, _:''})}`,
      ch:[{t:'On, with the column.', onward:true, go:()=>chapterEnd(5, b75Key() || 'hold')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
