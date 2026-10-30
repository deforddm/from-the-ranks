/* ============ Book Five, Chapter 1: The Drownings ============ */
/* Letheras in summer, the eve and first days of the Errant's festival (Midnight Tides ch 2, 4, 6; mt-canon §1.1). The Sixth Company of the
   Whitefinder Battalion is in the capital with the battalion's sick and its paybooks, for the pursers' audit and new kit, billeted near
   the Drownings District. Night one in the barracks yard (the clerk, the Finadd, the quartermaster, the tile-woman, the tiles). Day two on
   the Low Walk of the Quillas Canal (the rope-man and his haul, the cutpurses in the Down Market crowd, a builder's board with the name
   Bugg on it, street talk of the court), and at dusk the pit town outside the walls, where the tavern's collector says the army has
   stopped paying Thegg's mother's tab: a brawl, and the City Garrison takes the biggest man there for assault without cause, 300 docks.
   The fines court on the Low Walk that night is the key, S.f.b5_c1_key: 'pay' (the fine on five paybooks with the Finadd's signature;
   that night the collector comes to the barracks lane, b5_c1_lane) or 'swim' (Thegg swims the Quillas Canal at first light weighted
   with the court's 300 docks, and lives; then the bookmaker's men on the Low Walk, b5_c1_lowwalk). The festival night: the Wager Board
   (89) at the yard fire, the lanterns, the King's party far off. Next morning the Special Drownings from the tiers, headline only, and
   the Trate news: the Sixth is lent north. Notes for later chapters: docs/mt-ch1-notes.md. */
/* FOR THE ARTIST (81b): names this file uses.
   Items: ART['item/b5_c1_hookknife'], ['item/b5_c1_chit'], ['item/b5_c1_receipt'], ['item/b5_c1_weightbag'].
   Figures: b5_c1_ennic, b5_c1_clerk, b5_c1_tilewoman, b5_c1_ropeman, b5_c1_bookman, b5_c1_cutpurse, b5_c1_drunk. Reused: b5_letherii
   (the quartermaster, the Garrison, the court's men), thug (the collector), bruiser (the bullies, the minder).
   Backdrops (SCENEX): b5_barracks (80's, redrawn), b5_c1_lowwalk, b5_c1_pittown, b5_c1_court, b5_c1_festival.
   Ground (TILEX): b5_c1_barracks (. flags, # wall, = eaves, F fire, b bunk-house door, t the clerk's table, > the gate), b5_c1_canal
   (. paving, , steps, ~ canal, # wall, s stall, - the Low Walk's edge, P mooring post, n a builder's board, D the court's door, < >),
   b5_c1_pittown (. mud, , rubbish, # shack wall, D door, c cart, F brazier, ^), and b5_c1_walk for the fight on the Low Walk
   (# is the canal there). Battle 't' is cover: a stall, a table, a post. */

/* ---- small helpers (b51: Book Five, Chapter One) ---- */
/* loyalty only for a squadmate who is here */
const b51L = (id, n) => { if (b5In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b51Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b5In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
/* a line for a squadmate only if they are here */
const b51If = (id, s) => b5In(id) ? (typeof s === 'function' ? s() : s) : '';
/* who rolled the last check */
const b51Who = () => (ROLL() && ROLL().who) || 'sgt';
const b51Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b51Nmc = id => id === 'sgt' ? 'You' : NAME(id);
/* the phase: 1 the first night in the yard, 2 the festival's first day (the Low Walk, then the pit town at dusk and the court), 3 the
   festival night in the yard, 4 the morning after (the Low Walk, the tiers, the road) */
const b51Ph = () => S.f.b5_c1_ph || 1;
const b51Key = () => S.f.b5_c1_key || null;
const b51Slept = () => !!S.f.b5_c1_slept;
/* the key fight is behind the squad */
const b51Night = () => S.area === 'b5_c1_canalnight';
const b51KeyDone = () => !!(S.f.b5_c1_laneDone || S.f.b5_c1_walkDone);
/* the fine on five paybooks (the brief's numbers): the sergeant carries the most */
const B51_FINE = {sgt:80, thegg:60, perrit:60, tobet:60, ammet:40};
/* a "yes, but" in docks of debt on whoever rolled it, 5 to 20, never past what the holder will wait for: if it would push the roller to
   'pressed' (or beyond), the scene takes another cost instead (alt: {t(id), fx(id)}). fx runs before t (16, settleRoll), so fx decides. */
let b51NearOk = true;
/* room is kept for the court's fine (B51_FINE) and Thegg's rope fee while the key is still to come, so the key leaves everyone just short */
const b51Room = (id, n) => { const d0 = b5DebtStart(id), lim = d0 > 0 ? d0 * B5_PRESS : 50, keep = S.f.b5_c1_key ? 0 : Math.max(B51_FINE[id] || 0, id === 'thegg' ? 40 : 0); return b5Debt(id) + n + keep <= lim; };
const b51Owe = (n, why, line, alt) => ({
  fx:()=>{ const w = b51Who(); b51NearOk = b51Room(w, n); if (b51NearOk) b5Owe(w, n, why); else if (alt && alt.fx) alt.fx(w); },
  t:()=>{ const w = b51Who(); return b51NearOk ? line(w) : (alt && alt.t ? alt.t(w) : `Yes, but it costs ${b51Nm(w)} something.`); }});
const b51Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b51And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* the four who are here, by name */
const b51Four = () => ['tobet', 'thegg', 'perrit', 'ammet'].filter(id => b5In(id));

/* ---- the Rope-Man's Haul: the Rope's Way (Book One's rope mechanic), in Lether's words. From an old rope-man of the Drownings on the
   Low Walk. Not sorcery. ---- */
Object.assign(TRICKS, {
  b5_c1_haul:{name:'The Rope-Man\'s Haul', ch:1, use:'fight', ab:'t_b5_c1_haul', where:'the Low Walk of the Quillas Canal, with an old rope-man of the Drownings',
    lore:'The rope-men haul the court\'s coins back out of the canal after a Drowning. Now and then, when the crowd is looking the other way, they have hauled out something heavier that was still breathing. A hand on a strap, a hip against the post, and the whole weight comes across in one pull.',
    get fx(){ return `Once a fight, and it does not use the bearer's action: the bearer gets a hand on a squadmate's strap within ${5 + lvT()} and hauls. The two of them swap places. No free swings. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b5_c1_haul:{name:TRICKS.b5_c1_haul.name, trick:'b5_c1_haul', free:true, desc:()=>TRICKS.b5_c1_haul.fx,
    tiles:u=>party().filter(p => p !== u && !p.ally && cheb(u, p) <= 5 + lvT()),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; const ux = u.x, uy = u.y; sparks(ux, uy, 10, '#c8a060', .4); sparks(t.x, t.y, 10, '#c8a060', .4);
      u.x = t.x; u.y = t.y; t.x = ux; t.y = uy; AUDIO.play('sword', .5); B.moved = true; float(t, 'hauled', '#e8c073');
      blog(`${u.name} gets a hand on ${t.name}'s strap and hauls, the rope-man's way, hip against nothing. They are each where the other was.`); }},
});

/* ---- the words this chapter adds to Book Five's glossary ---- */
GLOSSX.mt.push(
  [1, 'The Low Walk', 'The paved walk along the Quillas Canal in the Drownings District, under the tiers. The court\'s rope-men work from it. On a Drowning day it is the best place in Letheras to lose money.', ()=>!!(S && S.f && S.f.b5_c1_walked)],
  [1, 'The fines court', 'A low stone hall by the canal where fines are weighed: paid in docks, or swum. In festival week it sits all night, because the festival fills the cells.', ()=>!!(S && S.f && S.f.b5_c1_fine)],
  [1, 'The pit towns', 'Shanty towns outside the walls of Letheras, where what is left of the Tarthenal lives, mostly on drink and mostly on credit.', ()=>!!(S && S.f && S.f.b5_c1_pit)]);

/* ---- the reading at the first halt: the barracks yard, the first night ---- */
B5READ[1] = {scene:'b5_barracks', where:'the flagstones of the barracks yard, under the lamp', set:'Night in Letheras, the eve of the Errant\'s festival, and the canal smell coming over the wall.',
  back:'b5_c1_yard', backT:'To the fire.',
  say:{perrit:`"Three tiles," she says, "the night before a festival. The school says it is superstition. The school also says to do it, and it marks you down if you don't." She clears a flagstone with the side of her hand. "Sit, Sergeant."`,
    tilewoman:`"The Whitefinders," the old woman says, and spits to one side, for manners. "Down from the frontier to be counted. Sit, then. A dock first. The tiles do not work for nothing, and neither do I."`}};

/* the fire node is a roster fire (38c) */
ROSTER_FIRES.mt[1] = ['b5_c1_yard'];

const B5CH1 = {
  title:'The Drownings', number:'One',
  intro:{loc:'Letheras', sub:'The Whitefinders\' barracks · the eve of the Errant\'s festival', scene:'b5_barracks', cap:'Lamps in the barracks windows, the canal smell over the wall, and a company paying its debts in its sleep.',
    paras:[
`Letheras in summer smells of its canals, and its canals smell of everything Letheras has put into them for a thousand years. The Sixth Company of the Whitefinder Battalion came down the river from High Fort with the battalion's sick and its paybooks, to have the books audited by the army's pursers and to draw new kit. The rest of the battalion has gone out to the summer's exercises. The Sixth has been sent home to be counted.`,
()=>{ const v = b51Four().map(id => TPL[id].name);
  return `You are Sergeant {sgt}, of the Sixth. You were born two streets back from the Quillas Canal, and you owe the army ${b5Coin(b5Debt('sgt'))} for the privilege of having left. ${v.length ? `${b51And(v)} ${v.length > 1 ? 'are' : 'is'} yours: ${v.length > 1 ? 'the squad you would pick if anyone had asked you, which nobody did' : 'the squad, such as it is'}.` : 'The squad, this year, is you.'} Finadd Ravel Ennic signs what you put in front of him, and lets you run the company.`; },
`The company is billeted in an old barracks near the Drownings District, which the Sixth believes is a joke somebody in the army's offices made on purpose. Tomorrow is the first day of the Errant's festival. The city is already counting what it will make from it.`],
    go:'Into the yard', node:'b5_c1_start'},

  areas:[
    /* 16 x 12 (b5_c1_barracks, night).  . flagstones  # the yard wall  = barrack eaves  b a bunk-house door  t the clerk's table  F the
       Sixth's fire  > the gate, east, to the Drownings District */
    { id:'b5_c1_barracks', title:'Letheras · the Whitefinders\' barracks', sub:'Night · the eve of the festival', hint:'Tap ground to move · tap a figure to talk · the clerk\'s table is west, the gate east', decor:'b5_c1_barracks', dark:true,
      map:[ "################",
            "#===b=====..===#",
            "#..............#",
            "#.t............#",
            "#..............#",
            "#.......F......>",
            "#..............#",
            "#..............#",
            "#=====b........#",
            "#======........#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b5_c1_yard', t:'b5_c1_clerk', b:'b5_c1_bunk', '>':'b5_c1_gate'}, start:{x:8, y:7},
      quest:()=> b51Ph() >= 3 ? (b51KeyDone() || b51Key() === 'swim' ? 'The fire, and then sleep.' : 'The fire. The festival is on the far side of the wall.')
        : !S.f.b5_c1_clerk ? 'The company clerk, at his table under the lamp.' : b51Slept() ? 'Out through the gate, into the festival.' : 'The fire, and then the bunk-houses. The festival is tomorrow.',
      npcs:[
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:3, y:3, node:()=>'b5_c1_clerk', fresh:()=>!S.f.b5_c1_clerk},
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:12, y:2, node:()=>b51Ph() >= 3 ? 'b5_c1_ennic_eve' : 'b5_c1_ennic', fresh:()=>b51Ph() >= 3 ? !S.f.b5_c1_purse : !S.f.b5_c1_ennic},
        {id:'qm', name:'The quartermaster', kind:'b5_letherii', x:13, y:7, node:()=>'b5_c1_qm', fresh:()=>!S.f.b5_c1_qm},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:11, y:9, node:()=>'b5_c1_tilewoman', fresh:()=>!S.f.b5_c1_tw} ] },

    /* 16 x 12 (b5_c1_canal, day).  . paving  , the tiers' steps  ~ the Quillas Canal  # wall  s a stall  n a builder's board  D the fines
       court's door  - the Low Walk's edge  P a mooring post  < west, back to the barracks  > east, the gate to the pit towns */
    { id:'b5_c1_canal', title:'Letheras · the Low Walk', sub:'The Drownings District · the Errant\'s festival', hint:'Tap ground to move · tap a figure to talk · the barracks are west, the gate to the pit towns east', decor:'b5_c1_canal',
      map:[ "################",
            "#.s....n....s..#",
            "<..............>",
            "#.....D........#",
            "#,,,,,,,,,,,,,,#",
            "#,,,,,,,,,,,,,,#",
            "#..............#",
            "#.P....P....P..#",
            "#--------------#",
            "#~~~~~~~~~~~~~~#",
            "#~~~~~~~~~~~~~~#",
            "################" ],
      walk:'.,-', triggers:{s:'b5_c1_stall', n:'b5_c1_board', D:'b5_c1_courtdoor', '<':'b5_c1_to_yard', '>':'b5_c1_to_pit'}, start:{x:2, y:2},
      quest:()=> b51Ph() >= 4 ? (b51Key() === 'swim' && !S.f.b5_c1_swam ? 'The court\'s bench by the steps. First light.' : b51Key() === 'swim' && !S.f.b5_c1_walkDone ? 'The bookmaker\'s men are waiting on the Low Walk.' : !S.f.b5_c1_tiers ? 'Up onto the tiers. The Special Drownings.' : 'The Finadd, on the tiers. The company is going somewhere.')
        : 'East through the gate to the pit town, at dusk, for Thegg\'s mother\'s tab. The Low Walk until then.',
      npcs:[
        {id:'ropeman', name:'An old rope-man', kind:'b5_c1_ropeman', x:8, y:7, node:()=>S.f.b5_c1_ropeTried ? 'b5_c1_ropeman_again' : 'b5_c1_ropeman', fresh:()=>!S.f.b5_c1_ropeTried},
        {id:'crowd', name:'A crowd at the eel stall', kind:'b5_c1_cutpurse', x:11, y:2, node:()=>'b5_c1_crowd', show:()=>b51Ph() < 4 && !S.f.b5_c1_cutDone, fresh:()=>!S.f.b5_c1_cutDone},
        {id:'steps', name:'The court\'s bench by the steps', kind:'b5_letherii', x:4, y:6, node:()=>'b5_c1_steps', show:()=>b51Ph() >= 4 && b51Key() === 'swim' && !S.f.b5_c1_swam, fresh:()=>true},
        {id:'bookmen', name:'The bookmaker\'s men', kind:'b5_c1_bookman', x:6, y:6, node:()=>'b5_c1_walk_start', show:()=>b51Ph() >= 4 && b51Key() === 'swim' && !!S.f.b5_c1_swam && !S.f.b5_c1_walkDone, fresh:()=>true},
        {id:'tiers', name:'The crowd on the tiers', kind:'b5_letherii', x:10, y:4, node:()=>'b5_c1_tiers', show:()=>b51Ph() >= 4 && (b51Key() !== 'swim' || !!S.f.b5_c1_walkDone) && !S.f.b5_c1_tiers, fresh:()=>true},
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:5, node:()=>'b5_c1_trate', show:()=>!!S.f.b5_c1_tiers, fresh:()=>!S.f.b5_trate} ] },

    /* 16 x 12 (b5_c1_canal, night): the same walk, lamplit, with the stalls shut and the court's door open */
    { id:'b5_c1_canalnight', title:'Letheras · the Low Walk', sub:'Night · the fines court is sitting', hint:'Tap ground to move · the court\'s door is lit', decor:'b5_c1_canal', dark:true,
      map:[ "################",
            "#.s....n....s..#",
            "<..............>",
            "#.....D........#",
            "#,,,,,,,,,,,,,,#",
            "#,,,,,,,,,,,,,,#",
            "#..............#",
            "#.P....P....P..#",
            "#--------------#",
            "#~~~~~~~~~~~~~~#",
            "#~~~~~~~~~~~~~~#",
            "################" ],
      walk:'.,-', triggers:{s:'b5_c1_stall', n:'b5_c1_board', D:'b5_c1_court', '<':'b5_c1_to_yard', '>':'b5_c1_to_pit'}, start:{x:6, y:4},
      quest:()=>'The fines court, by the lit door. Thegg is inside.',
      npcs:[
        {id:'garrison', name:'A Garrison man at the court door', kind:'b5_letherii', x:7, y:3, node:()=>'b5_c1_court', fresh:()=>!b51Key()} ] },

    /* 16 x 12 (b5_c1_pittown, night).  . mud  , rubbish  # shack walls  D the tavern's door  c a cart  F a brazier  ^ north, back to the gate */
    { id:'b5_c1_pittown', title:'The pit town', sub:'Outside the walls · dusk going to night', hint:'Tap ground to move · tap a figure to talk · the tavern is the door with the light in it', decor:'b5_c1_pittown', dark:true,
      map:[ "#######^^#######",
            "#.....,........#",
            "#.###.....####.#",
            "#.#D#..c..#..#.#",
            "#.....,........#",
            "#..,.....F.....#",
            "#.####.....###.#",
            "#.#..#..,..#.#.#",
            "#......c.......#",
            "#.,.........,..#",
            "#..............#",
            "################" ],
      walk:'.,', triggers:{D:'b5_c1_taverndoor', c:'b5_c1_cart', '^':'b5_c1_pit_back'}, start:{x:7, y:9},
      quest:()=> S.f.b5_c1_tavernDone ? 'Back north to the city, after Thegg.' : 'The tavern, with the light in the door. Thegg\'s mother\'s tab.',
      npcs:[
        {id:'oldman', name:'An old Tarthenal by the brazier', kind:'b5_c1_drunk', x:10, y:5, node:()=>'b5_c1_oldman', show:()=>!S.f.b5_c1_tavernDone, fresh:()=>!S.f.b5_c1_oldman} ] } ],

  battles:{
    /* the Down Market crowd on the festival's first day: cutpurses working the stalls, and the man who minds them */
    b5_c1_cutpurses:{title:'The Down Market crowd', style:'b5_c1_canal', open:true, warrenText:'Letheras · the Holds are close here, and indifferent', warren:{meanas:1, denul:1}, music:'battle',
      map:["#..t..t#","........","..t.....","........",".....t..","........","..t.....","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b5_c1_cutpurse',1,1],['b5_c1_cutpurse',5,2],['b5_c1_minder',4,1],['b5_c1_cutpurse',6,4]], xp:100, after:'b5_c1_cutpurses_after',
      preText:()=>`The crowd goes back from the stall in a ring. In Letheras a crowd makes room for anything it might be able to bet on.`},
    /* the pit-town tavern: the collector's bullies and the drinkers who join in. Nobody is to die: it is Letheras, and the Garrison is coming */
    b5_c1_tavern:{title:'The pit-town tavern', style:'b5_c1_pittown', dark:true, open:true, warrenText:'Night in the pit town · the Holds have no interest in a tavern', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Fists, stools and cudgels; nobody killed. It is Letheras: the Garrison is coming.'},
      map:["#.t..t.#","........","..t..t..","........",".t....t.","........","...tt...","........","........","#......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b5_bully',2,1],['b5_bully',5,1],['b5_bully',4,3]], xp:160, after:'b5_c1_tavern_after',
      waves:[{round:2, foes:[['b5_c1_drunk',0,4]], text:'A drunk the size of a door gets up from the corner bench, decides whose side he is on, and is wrong about it.'}],
      stage2:{title:'The back room', xp:80,
        text:()=>`The bullies go back through the curtain into the back room, and the squad goes after them. It is where the tavern keeps its books: a table, a strongbox, a lamp, and a slate on the wall with every tab in the pit town chalked on it.\n\nThe collector is behind the table with a cudgel he has clearly never needed to use himself. He would like you to know that he has a receipt for everything.${b51If('thegg', `\n\nThegg looks at the slate. Halfway down it there is a mark, not a name, and a sum beside it. He stops talking.`)}`,
        map:["########","#..tt..#","#......#","#.t..t.#","#......#","#......#","#......#","#......#","#......#","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b5_collector',3,2],['b5_bully',1,3],['b5_bully',6,3]]} },
    /* 'pay': the barracks lane that night. A fine paid to the court is not a tab paid to the collector. */
    b5_c1_lane:{title:'The barracks lane', style:'b5_c1_barracks', dark:true, open:true, warrenText:'Night · the festival is loud enough to cover anything', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Cudgels in a lane behind the barracks; nobody killed. Hold them four rounds, until the company comes out of the bunk-houses.'},
      map:["##.##.##","........","..t.....","........","........",".....t..","........","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b5_collector',3,1],['b5_bully',1,2],['b5_bully',6,2],['b5_bully',4,3]], xp:160, after:'b5_c1_lane_after'},
    /* 'swim': the Low Walk the morning after Thegg's swim. The bookmaker's men laid against a Rising, and want their losses back from somebody */
    b5_c1_lowwalk:{title:'The Low Walk', style:'b5_c1_walk', open:true, warrenText:'Morning on the Quillas Canal · the Holds are down there under the water', warren:{meanas:1, denul:1}, music:'battle',
      map:["#.......","#..t....","#.......","#.....t.","#.......","#..t....","#.......","#.......","#.......","#......."],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b5_c1_bookman',4,1],['b5_bully',2,2],['b5_bully',6,2],['b5_bully',4,4]], xp:160, after:'b5_c1_walk_after',
      preText:()=>`The bookmaker's men spread out along the Low Walk with the canal at their backs, which is either confidence or not knowing the canal.`} },

  foes:{
    /* the festival's cutpurses, quick and thin, and the big man who minds them and their takings */
    b5_c1_cutpurse:{name:'Festival cutpurse', sig:'c', kind:'b5_c1_cutpurse', hp:9, ac:12, atk:3, dmg:[1,6,0], rng:1, mv:5, init:3, sk:['hitrun'], verb:'flicks a thin knife at'},
    b5_c1_minder:{name:'The cutpurses\' minder', sig:'M', kind:'bruiser', hp:18, ac:12, atk:4, dmg:[1,8,0], rng:1, mv:4, init:1, sk:['shove'], verb:'swings a weighted sap at'},
    /* a pit-town drunk the size of a door */
    b5_c1_drunk:{name:'A big drunk', sig:'d', kind:'b5_c1_drunk', hp:20, ac:10, atk:3, dmg:[1,8,1], rng:1, mv:3, init:0, sk:['shove'], verb:'swings a bench-leg at'},
    /* the bookmaker who laid against a Rising */
    b5_c1_bookman:{name:'The bookmaker', sig:'K', kind:'b5_c1_bookman', hp:22, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'cracks a weighted cane across'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b5_c1_issuesword:{name:'A Letherii issue sword', slot:'weapon', role:'blade', who:null, atk:1, dmg:[1,8,1],
      line:'A Letherii army sword, straight and plain, with a wire-bound grip and the regiment\'s number stamped in the ricasso, and an inventory tag on the guard with the price on it. The army issues every soldier a sword, and then sells them a better one. This is the better one. It is still owed for somewhere.'},
    b5_c1_tarthclub:{name:'A Tarthenal war-club', slot:'weapon', role:'heavyweapon', who:null, dmg:[1,10,2],
      line:'A club of black root-wood as long as a man\'s leg, the head studded with old iron nails driven in and clinched, the grip wound with plaited hide gone smooth. The old man by the brazier says it was made for a hand the size of Thegg\'s, which is the only size the Tarthenal made them. He did not say whose hand. He did not have to.'},
    b5_c1_hookknife:{name:'A rope-man\'s hook-knife', slot:'weapon', role:'blade', who:null, atk:2, dmg:[1,6,1],
      line:'The short hooked knife the rope-men of the Drownings carry, for cutting a weight-sack free of the rope. A short blade with a back-turned hook, a cord-wrapped grip, and the court\'s brass tag on the pommel.'},
    b5_c1_chit:{name:'A wager-chit from the Low Walk', slot:'trinket', role:'any', who:null, stat:{guile:1},
      line:'A stamped oblong of pale wood with a rope and a wave burned into it and a chalk number on the back: a wager on a Rising that never paid. Whoever carries it is a little better at talking, which is what a chit like this is for.'},
    b5_c1_receipt:{name:'The fines court\'s receipt', slot:'trinket', role:'any', who:null, stat:{wits:1},
      line:'A folded square of heavy paper, a blob of grey wax, the court\'s cord through it: three hundred docks, received, for Thegg\'s fine. The clerk says to keep it somewhere dry. The court has a long memory and a bad filing system.'},
    b5_c1_weightbag:{name:'The weight-sack', slot:'trinket', role:'any', who:['thegg'], ac:1,
      line:'The empty canvas sack the court tied its three hundred docks in, wet-dark, with its mouth cord knotted and an iron ring for the rope. Thegg ties it to his shield\'s strap and will not say why.'} },

  scenes:{
    b5_c1_lowwalk:{loc:'Letheras', sub:'The Low Walk · the Quillas Canal', cap:'The Quillas Canal from the tiers, a hundred paces of dark water, a rope out over it, and the crowd above in a long curve of shapes.', amb:'explore'},
    b5_c1_pittown:{loc:'The pit town', sub:'Outside the walls · night', cap:'Shacks and smoke under the white walls of Letheras, braziers in the lanes, and one door with the light in it.', amb:'explore'},
    b5_c1_court:{loc:'Letheras', sub:'The fines court · night', cap:'A low stone hall by the canal: a clerk\'s desk, a ledger, and a brass scale with docks in one pan.', amb:'explore'},
    b5_c1_festival:{loc:'Letheras', sub:'The Errant\'s festival · night', cap:'Lanterns along every canal, towers against the last of the light, and the city out in the streets to be lucky.', amb:'explore'} },

  end:{
    pay:['The paybooks', 'The Sixth came down to Letheras to be counted, and was. A pit-town tavern said the army had stopped paying Thegg\'s mother\'s tab, which it had, by a clerk\'s error, and the Garrison fined Thegg three hundred docks for the brawl that followed. The squad put the fine on five paybooks with the Finadd\'s signature, and the tavern\'s collector came for his tab anyway. Everyone in the squad now owes a little more than they can comfortably carry. Thegg has the receipt.'],
    swim:['The canal', 'The Sixth came down to Letheras to be counted, and was. A pit-town tavern said the army had stopped paying Thegg\'s mother\'s tab, which it had, by a clerk\'s error, and the Garrison fined Thegg three hundred docks for the brawl that followed. Thegg swam it. He went into the Quillas Canal at first light with the court\'s coins tied to him and came out on the far steps, and the squad owes him something it has not yet found a word for. He has the sack.'] },
  endScene:'b5_march',
  endCap:()=> b51Key() === 'swim' ? 'The road north out of Letheras, the city behind in the morning haze, and the Sixth on it, one soldier walking a little wet.' : 'The road north out of Letheras, the city behind in the morning haze, and the Sixth on it, every soldier a few docks heavier in the paybook.',
  tease:'Next: Trate. A harbour a wave came into, and the ships that came with it.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b5_c1_key === 'pay') x.push(`Thegg's fine is on five paybooks with Finadd Ennic's signature: yours, Thegg's, Perrit's, Tobet's and Ammet's.${f.b5_c1_laneDone ? ' The tavern\'s collector came for his tab in the barracks lane, and went away with his interest struck out.' : ''}`);
    if (f.b5_c1_key === 'swim') x.push(`Thegg swam the Quillas Canal with the court's three hundred docks tied to him, and came out on the far steps. The court charged him for the rope.${f.b5_c1_walkDone ? ' The bookmaker who laid against him came to collect from somebody, and did not.' : ''}`);
    if (f.b5_c1_cutDone) x.push('The squad broke up a ring of festival cutpurses in the Down Market. The stall-keepers paid in docks and gratitude, in that order.');
    if (f.b5_c1_ropeOk) x.push('An old rope-man of the Drownings showed the squad how a body is hauled. He has done it, now and then, when nobody was watching.');
    if (f.b5_c1_brys) x.push('Far off on a palace balcony on the festival night: the King\'s party, and the King\'s new Champion with them.');
    if (f.b5_c1_sums === 'ok') x.push('The company clerk found six docks the auditors had owed the Sixth since the spring. He was quietly appalled.');
    if (f.b5_c1_carter) x.push('A Tarthenal carter in the pit town owes the squad a favour for a wheel out of the mud.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b5_trate && 'News from the north: a wave out of the sea wrecked Trate\'s harbour, and ships rode it in with nobody alive aboard. The Sixth is lent to the Trate Legion to clear the harbour.',
    f.b5_c1_tiers && 'The Errant\'s festival had its Special Drownings in the Quillas Canal. The squad watched from the tiers. The chalk boards were wiped by noon.',
    f.b5_c1_laneDone && 'The tavern\'s collector came to the barracks lane at night for his tab. A fine paid to the court is not a tab paid to him, he said. He went away with his interest struck out.',
    f.b5_c1_walkDone && 'The bookmaker who laid against Thegg\'s Rising came to the Low Walk with his men for his losses. He did not get them.',
    f.b5_c1_swam && 'Thegg swam the Quillas Canal at first light, weighted with the court\'s three hundred docks, and came out on the far steps.',
    f.b5_c1_key && (f.b5_c1_key === 'pay' ? 'At the fines court the squad put Thegg\'s fine on five paybooks, with the Finadd\'s signature, and the court sealed a receipt.' : 'At the fines court the squad let Thegg swim it. The court released him to the Finadd for the night, to be at the steps at first light.'),
    f.b5_c1_fine && 'After the brawl in the pit-town tavern, the City Garrison took the biggest man there: Thegg. Assault without cause, three hundred docks.',
    f.b5_c1_tab && 'The pit-town tavern says the army has stopped paying Thegg\'s mother\'s tab, and has added interest.',
    f.b5_brizad && 'Tavern talk: the Queen\'s First Consort, Turudal Brizad, has the Queen\'s ear, and half the court owes him a favour.',
    f.b5_bugg && 'A builder\'s board on the street up toward the new palace says Bugg. The palace\'s clay heave is a city joke.',
    'The court is quarrelling: the Preda and the Queen\'s faction. Brys Beddict is the new King\'s Champion. The delegation to the Edur is being chosen, and Finadd Gerun Eberict has the King\'s Leave.',
    'The Sixth Company is in Letheras with the battalion\'s sick and its paybooks, for the pursers\' audit and new kit.'].filter(Boolean); },

  dlg:{
    /* ---- the first night: the barracks yard, and the first halt ---- */
    b5_c1_start:()=>({sp:'The Whitefinders\' barracks', scene:'b5_barracks', fx:()=>{ S.f.b5_c1_ph = 1; S.f.b5_company = 1; }, txt:
`The barracks are older than the Whitefinders, and were built for a regiment that has since been disbanded for debt. A flagged yard, long bunk-houses with deep eaves, a wall with the canal smell coming over the top of it, and a gate on the Drownings District side that the company has been told to keep barred.

The company clerk has set up his table under the lamp by the west wall, with the oilskin case at his elbow, and is already writing. The quartermaster is counting the barrels, aloud, for the benefit of anyone who has taken one. Over the wall, somebody is hanging lanterns for the festival and swearing at them.

${b51Say({thegg:`Thegg ducks under the eaves of the bunk-house door, turns sideways to get through it, and comes back out without his pack. "It is the same bunk," he says. "I had it seven years ago. They have not mended it."`, tobet:`Tobet stands half a step behind you with his bow unstrung over his shoulder, looking at the gate. "Letheras," he says quietly. "Sergeant."`, _:`The squad drops its packs by the wall and looks at the city's lights over it.`})}${b51If('perrit', `\n\nPerrit has already found the one place in the yard from which she cannot see the canal.`)}${b51If('ammet', `\n\nAmmet goes to look at the battalion's sick in the end bunk-house before she looks at anything else.`)}`,
      ch:[b5TileChoice(1),
          {t:'The clerk\'s table.', go:'b5_c1_clerk'},
          {t:'The fire.', go:'b5_c1_yard'},
          {t:'Walk the yard.', go:()=>startExplore()}]}),
    b5_c1_tiles:()=>b5TileOffer(1),
    b5_c1_card:()=>b5TileCard(1),

    /* the fire: a rest, the pay desk, the squad, and the way on (the games pass, 89, wraps this node: keep the id) */
    b5_c1_yard:()=>{ const ph = b51Ph();
      return {sp:'The Sixth\'s fire', scene:'b5_barracks', again:()=> ph >= 3 ? `The Sixth's fire, on the festival night. ${b51KeyDone() ? 'The lane is quiet now.' : 'The lanterns are lit over the wall.'}` : b51Slept() ? 'The fire, gone to ash. It is morning.' : 'The Sixth\'s fire, in the yard. The lanterns are going up over the wall.', txt:
`${ph >= 3 ? `The Sixth's fire, on the first night of the festival. Over the wall the city is lit from end to end, and the sound of it comes over in a long roar with music in it. The company has drunk the Finadd's festival dock and is working on its own.${b51Key() === 'swim' ? `\n\nThegg sits on the far side of the fire with his back very straight. At first light the court wants him at the steps. Nobody at the fire mentions it, and everybody looks at him when he reaches for the water.` : b51Key() === 'pay' ? `\n\nEvery soldier at the fire owes a few docks more than they did this morning, and every one of them knows exactly how many.` : ''}` : b51Slept() ? `The fire has burned down to ash in its ring. The yard is grey with morning, and the gate is open on the Drownings District. The festival has started without the Sixth.` : `The Sixth's fire, in a ring of old stones on the flags. The yard is full of the battalion's sick sitting up to see the lanterns go up over the wall, and of the company's soldiers pretending not to want to see them.`}${ph < 3 && !b51Slept() ? b51Say({ammet:`\n\nAmmet has the battalion's sick in a row along the bunk-house wall, and is going down it with a lamp.`, perrit:`\n\nPerrit sits on the side of the fire away from the gate, and from the canal behind it.`, _:''}) : ''}`,
        ch:[b5TileChoice(1),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f['b5_c1_rest' + ph] && !b51Slept(), fx:()=>{ S.f['b5_c1_rest' + ph] = 1; b5Rest('The squad sits an hour by its own fire, inside the barracks walls. Wounds close, mostly.'); }, go:'b5_c1_yard_rest'},
            {t:'The pay desk, at the clerk\'s table.', go:'b5_c1_pay'},
            {t:'Talk with the squad.', go:'b5_c1_yard_talk'},
            {t:'Out to the end of the street to see the lanterns.', req:()=>ph >= 3 && !S.f.b5_c1_brys, go:'b5_c1_festival'},
            {t:'Turn in. The festival is tomorrow.', req:()=>ph === 1 && !b51Slept() && !!S.f.b5_c1_clerk, onward:true, go:'b5_c1_sleep1'},
            {t:'Out through the gate, into the festival.', req:()=>ph === 1 && b51Slept(), onward:true, go:'b5_c1_out'},
            {t:'The noise in the lane behind the barracks.', req:()=>ph === 3 && b51Key() === 'pay' && !S.f.b5_c1_laneDone, onward:true, go:'b5_c1_lane_start'},
            {t:'Turn in. The court wants Thegg at the steps at first light.', req:()=>ph === 3 && b51Key() === 'swim', onward:true, go:'b5_c1_sleep2'},
            {t:'Turn in.', req:()=>ph === 3 && b51Key() === 'pay' && !!S.f.b5_c1_laneDone, onward:true, go:'b5_c1_sleep2'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c1_yard_rest:()=>({sp:'The Sixth\'s fire', scene:'b5_barracks', txt:
`An hour, then, on the warm flags by the fire, while ${b51Ph() >= 3 ? 'the festival roars on the far side of the wall' : 'the lanterns go up one by one over the wall'}.

${b51Say({ammet:`Ammet goes round the squad without asking, the way she always does, and looks at hands and feet and the backs of necks, and says "still" to anyone who moves.`, thegg:`Thegg lies on his back on the flags, which is the only bed in the barracks long enough for him, and goes to sleep at once.`, _:`One of them sleeps. The others pretend to.`})}${b51If('tobet', `\n\nTobet cuts a notch in his tally-stick, looks at it, and cuts another beside it. He does not say what either one is for.`)}${b51If('perrit', `\n\nPerrit writes in the copy of the school's ledger she keeps in her own hand, and checks it against the figure in her head, and is satisfied, and does not look happy about it.`)}${b51If('thegg', b5In('ammet') ? `\n\nThegg sleeps. In his sleep he says something low in his mother's tongue, to somebody who is not at the fire.` : '')}`,
      ch:[{t:'Back to the fire.', go:'b5_c1_yard'}]}),
    b5_c1_yard_talk:()=>{ const ph = b51Ph(), k = b51Key(), ln = [];
      if (b5In('tobet')) ln.push(ph >= 3 ? (k === 'swim' ? `Tobet is sitting very still with his tally-stick across his knees. "They'll be laying odds on him already," he says. "On the Low Walk. Strokes and Risings." He laughs, a short flat sound, and then stops, as if he had heard somebody else do it.` : `Tobet has his tally-stick out and has cut a new notch on the far end, away from the others. "Sixty," he says. "For Thegg." He looks at it. "It's the first one I didn't mind."`) : `Tobet is restringing his bow by the firelight. "The holder used to bring us to the city for the festival," he says. "To watch the Special Drownings. So we'd know." He tests the string. "We knew."`);
      if (b5In('thegg')) ln.push(ph >= 3 ? (k === 'swim' ? `Thegg is turning his clay beads through his fingers, his mother's. "I have four lungs, Sergeant," he says. "Ammet says. The Tarthenal side." He thinks about it. "I hope she is right. I have never counted them."` : `Thegg is looking at the receipt by the firelight, folding it and unfolding it. "Three hundred docks," he says. "For one stool." He folds it again. "It was a very good stool."`) : `Thegg sits with his back against the bunk-house wall, which creaks. "There will be a note for me at the tavern," he says. "There is always a note. My mother kept them in a box." He does not say what happened to the box.`);
      if (b5In('perrit')) ln.push(ph >= 3 ? `Perrit is laying three tiles out and putting them away again without turning them, which is a thing the school says not to do. "${k === 'pay' ? 'Sixty docks is two months of the school\'s interest,' : 'A man weighs about what three hundred docks weighs,'}" she says, to nobody. "I did the sum. I wish I hadn't."` : `Perrit has her back to the wall and her face to the gate. "The school is four streets from here," she says. "I could walk there and pay the month in person." She does not get up. "I could also not."`);
      if (b5In('ammet')) ln.push(ph >= 3 ? `Ammet is cleaning a needle that is already clean. ${k === 'swim' ? `"Water in the lungs is a matter of how long," she says. "Four of them is a lot of how long." She puts the needle away. "I am not drinking tonight."` : `"The collector won't let it be," she says. "His kind never do. I've stitched three of his kind and four of the men they sent." She does not drink.`}` : `Ammet is rolling linen into tight cylinders and setting them in a row. "Half the battalion's sick are sick of being sick," she says. "The other half are sick of me." She ties off a roll. "Both are improvements."`);
      if (b5In('brune')) ln.push(`Brune has found the yard's one rain-barrel and is sitting with her feet in it. "Canal water," she says. "It is still water. The Shore is patient about canals."`);
      if (b5In('ruuk')) ln.push(`Ruuk is on the yard wall, watching the lanterns. "Too many lights," he says. "The birds will think it is morning, and be wrong all night."`);
      if (b5In('pessa')) ln.push(`Pessa sits with the boathook upright beside her and looks at the canal side of the wall. "I poled grain in through that canal," she says. "The city charged us for the water."`);
      return {sp:'The Sixth\'s fire', scene:'b5_barracks', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b5_c1_yard'}]}; },

    /* ---- the clerk's table: the paybooks, each soldier's line, the pay desk ---- */
    b5_c1_clerk:()=>({sp:'The company clerk', scene:'b5_barracks', html:debtHTML('The Sixth Company · Letheras'), fx:()=>{ S.f.b5_c1_clerk = 1; S.f.b5_c1_tab = 1; },
      again:()=>`The clerk's table, under the lamp. The paybooks are open. ${S.f.b5_c1_fine ? 'He has added a page.' : 'He is waiting for the auditors.'}`, txt:
`The company clerk is Indebted himself, ink to the wrist, a thin polite man who keeps the Sixth's paybooks in an oilskin case and has never been seen without one hand on it. Tonight the case is open and the paybooks are out on the table, squared to the edge, for the pursers in the morning.

"Sergeant." He turns the book so you can read it. Every soldier in the company is a line, and every line is a debt, and beside every debt is the month it was last paid down. "The auditors come at the second bell. I would be grateful if nobody owed anything new before then."

He takes a folded paper from under the book's cover. "And this was left at the gate for Thegg, by a man from the pit town. I have not read it." He has read it. "It says the tavern has not been paid on his mother's tab since the spring, and has added interest." A pause. "The army pays that tab out of his pay. I have the entries." Another pause, longer. "I have the entries."`,
      ch:[{t:'Ask about Tobet\'s line.', req:()=>b5In('tobet'), go:'b5_c1_line_tobet'},
          {t:'Ask about Thegg\'s line.', req:()=>b5In('thegg'), go:'b5_c1_line_thegg'},
          {t:'Ask about Perrit\'s line.', req:()=>b5In('perrit'), go:'b5_c1_line_perrit'},
          {t:'Ask about Ammet\'s line.', req:()=>b5In('ammet'), go:'b5_c1_line_ammet'},
          {t:'Go through the company\'s sums with him, before the auditors do.', check:['wits', 13], req:()=>!S.f.b5_c1_sums,
            edges:id=>[id === 'perrit' && ['she corrects the company\'s arithmetic for pleasure', 2], id === 'sgt' && ['you know the company\'s debts better than its birthdays', 1], id === 'tobet' && ['he has read his own ledger line every month for two years', 1], id === 'thegg' && ['he reads tavern slates, mostly', -1], id === 'ruuk' && ['he remembers things instead of writing them down', -1]],
            near:b51Owe(5, 'The clerk\'s copying fee', w => `Yes, but the clerk has to copy the page out fair for the auditors after, and Lether charges for copying: ${b5Coin(5)} against ${b51Nm(w) === 'you' ? 'your' : b51Nm(w) + '\'s'} line.`, {t:w => `Yes, but it takes the rest of the evening, and ${b51Nm(w)} goes to bed with columns behind the eyes: rattled.`, fx:w => b51Rattle(w)}),
            fx:()=>{ S.f.b5_c1_sums = 'tried'; }, go:'b5_c1_sums_ok', fail:'b5_c1_sums_no'},
          {t:'The pay desk.', go:'b5_c1_pay'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_sums_ok:()=>({sp:'The company clerk', scene:'b5_barracks', fx:()=>{ S.f.b5_c1_sums = 'ok'; S.silver = (S.silver || 0) + 6; updSilver(); note('+6 docks: the pursers\' short-count, back to the company.', 'good'); }, txt:
`It takes an hour, ${by({sgt:'your', perrit:'Perrit\'s', _:'{who}\'s'})} finger going down the columns and the clerk's going down beside it. Most of it is right. Lether's clerks are good at sums. They are better at sums that come out in somebody else's favour.

Near the end ${by({sgt:'you find', _:'{who} finds'})} it: the spring's festival pay, short-counted by the pursers by six docks, the whole company's, and carried forward ever since as if the pursers had paid it. The clerk reads the line twice, and then a third time, with his pen.

"Six docks," he says. "They will say it is a rounding." He counts six out of the company's box onto the table and pushes them across, and writes the line that says he did, and initials it. "It is not a rounding." He is quietly appalled. He usually is.`,
      ch:[{t:'Back to the table.', go:'b5_c1_clerk'}]}),
    b5_c1_sums_no:()=>({sp:'The company clerk', scene:'b5_barracks', txt:
`An hour of columns, and they all come out. Either the company's books are in order or the error is somewhere cleverer than the two of you.

"In order," the clerk says. He does not sound relieved. "That is what worries me about them."`,
      ch:[{t:'Back to the table.', go:'b5_c1_clerk'}]}),
    b5_c1_line_tobet:()=>({sp:'The company clerk', scene:'b5_barracks', txt:
`"Tobet," the clerk says, and puts his finger on the line. "Nine hundred docks. A plough, bought by his grandfather from the holder who held the farm. The army bought the debt two years ago." He does not say *and the boy with it*. He does not need to.

${b51If('tobet', `Tobet has come to stand half a step behind you, the way he does. "I've never seen it," he says. "The plough. I've paid on it every year of my life." He holds up the tally-stick: two years of notches, cut small, to make the stick last. "At a soldier's pay I'm clear at fifty-one. If nothing goes wrong."\n\nThe clerk writes nothing, which for him is a kind of sympathy.`)}`,
      ch:[{t:'Back to the table.', go:'b5_c1_clerk'}]}),
    b5_c1_line_thegg:()=>({sp:'The company clerk', scene:'b5_barracks', fx:()=>{ S.f.b5_c1_tab = 1; }, txt:
`"Thegg." The finger on the line. "Two hundred and sixty docks: his mother's tab at a tavern in the pit town outside the east gate. It passed to him as her heir, which is the army's own rule turned the other way. The army took it on when he joined, and pays it out of his pay, so it stops growing." He looks at the folded note. "So it should stop growing."

${b51If('thegg', `Thegg reads the note slowly, his lips moving, and folds it very small. "It says I owe forty more," he says. "For the interest." He is very calm about it, which in Thegg is not a good sign. "I will go out tomorrow and see them. Politely."\n\nHe puts the note in the same pocket as his mother's clay beads.`)}`,
      ch:[{t:'Back to the table.', go:'b5_c1_clerk'}]}),
    b5_c1_line_perrit:()=>({sp:'The company clerk', scene:'b5_barracks', txt:
`"Perrit. Four hundred and ten docks to the cadre school in the Pursers' District. The school does not charge fees." The clerk's face does not move. "It lends them."

${b51If('perrit', `Perrit reads the line over his shoulder, and then the line under it, and then puts her finger on the clerk's last addition. "That's a seven," she says, "not a one. You've carried it wrong since the winter." He looks. It is a seven. He corrects it in a smaller hand and thanks her, and she nods as if that settled something between them.\n\n"I pay on the first," she says. "Every month. In person." She does not say what that is like. Her face says it for her, and then closes.`)}`,
      ch:[{t:'Back to the table.', go:'b5_c1_clerk'}]}),
    b5_c1_line_ammet:()=>({sp:'The company clerk', scene:'b5_barracks', txt:
`"Ammet. One hundred and eighty docks to a cutler in the Down Market, for her tools." The clerk turns the page back. "Nineteen years of payments. The note has been sold twice. The cutler who holds it now was not born when it was written."

${b51If('ammet', `Ammet takes the clerk's inky hand off the paybook, turns it over, and looks at the burn across his knuckles that he has been hiding under the case all evening. "Hold still," she says, and puts salve on it from a twist of paper. "That's lamp oil. Stop putting your hand on the chimney." He holds still.\n\n"No charge," she says, before he can write anything. "I'm already paying for the knife."`)}`,
      ch:[{t:'Back to the table.', go:'b5_c1_clerk'}]}),
    /* the pay desk (80's b5PayChoices) */
    b5_c1_pay:()=>({sp:'The clerk\'s table · the pay desk', scene:'b5_barracks', html:debtHTML('The Sixth Company · Letheras'), again:()=>`The pay desk. The clerk's pen is wet, and the squad has ${b5Coin(S.silver || 0)} in hand.`, txt:
`The clerk opens the paybooks and wets his pen. "Anything the squad pays down out of its own docks, I write as paid, today, in front of you," he says. "The holders get it at the quarter. It is the only thing in Lether that happens on time."`,
      ch:b5PayChoices('b5_c1_yard')}),

    /* ---- the Finadd ---- */
    b5_c1_ennic:()=>({sp:B5_FINADD.name, scene:'b5_barracks', fx:()=>{ S.f.b5_c1_ennic = 1; },
      again:()=>`Finadd Ennic, by the officers' door, with his book open. "Sergeant."`, txt:
`Finadd Ravel Ennic is about forty, a merchant's younger son with a neat hand and a neat book, and the good sword at his hip has never been drawn in the Sixth's sight. He is standing by the officers' door with the book open, writing by the lamp, and he looks up as you come over with the relief of a man who would rather be told what to do than decide it.

"Sergeant. The auditors come at the second bell, and will go through the books until the festival makes them stop, which will be by the third." He turns a page. "The company has the festival. Keep them out of the canal. If a soldier of the Sixth goes into the Quillas, the battalion's commander will hear of it, and then I will, and then you will, in that order."

He lowers his voice, though there is nobody to hear but the eaves. "And keep them off the court's business. The whole city is talking about the court."`,
      ch:[{t:'"What is the city saying, Finadd?"', go:'b5_c1_ennic_court'},
          {t:'"The company will be no trouble, Finadd."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_ennic_court:()=>({sp:B5_FINADD.name, scene:'b5_barracks', fx:()=>{ S.f.b5_c1_court = 1; }, txt:
`"Barracks talk," Ennic says, "which I do not repeat." He repeats it, carefully, as if reading it from the book.

"The Preda and the Queen's faction are not speaking, except to the King, about each other. Finadd Brys Beddict is the King's new Champion: the best sword in Lether, everyone says, and very quiet about it. The King is sending a delegation north to the Edur for the Great Meeting: Prince Quillas, with Finadd Moroch Nevath, who heads the Prince's guard, and the First Eunuch. And Finadd Gerun Eberict."

He shuts the book on his finger. "Eberict holds the King's Leave, for saving the King's life. There is a list. The city says thirty-one names, and the city counts these things." He looks at you. "If you meet him, Sergeant, be very polite, and very brief, and somewhere else."${b51If('perrit', `\n\nPerrit, at your shoulder, says under her breath, "Thirty-one is the count the city knows."`)}`,
      ch:[{t:'"Yes, Finadd."', go:()=>startExplore()}]}),
    b5_c1_ennic_eve:()=>({sp:B5_FINADD.name, scene:'b5_barracks', fx:()=>{ S.f.b5_c1_purse = 1; S.silver = (S.silver || 0) + 5; updSilver(); note('+5 docks: the Finadd\'s festival dock, a dock a head.', 'good'); },
      again:()=>`Finadd Ennic, by the officers' door. He has signed everything he is going to sign tonight.`, txt:
`Ennic is by the officers' door with a purse in one hand and the book in the other, giving every soldier in the company a dock for the festival out of his own pocket and writing down that he has. He gives you the squad's five, in a stack, and writes that down too.

${b51Key() === 'pay' ? `"Five signatures," he says. "In one night. I have never signed so much at once for one man." He considers this. "It felt very decisive. I did not decide anything, of course. You put it in front of me." He sounds almost pleased.` : `"First light," he says. "The court has my signature for him. If he is not at the steps, they will come for me, and I will come for you, and the canal will come for all of us." He looks across the yard at Thegg's back. "He will be at the steps."`}

"Enjoy the festival, Sergeant," he says. "Somewhere I can't see it."`,
      ch:[{t:'"Thank you, Finadd."', go:()=>startExplore()}]}),

    /* ---- the quartermaster: salves at six docks ---- */
    b5_c1_qm:()=>({sp:'The quartermaster', scene:'b5_barracks', fx:()=>{ S.f.b5_c1_qm = 1; }, again:()=>`The quartermaster, counting. "Salves, six. Docks, not promises."`, txt:
`The quartermaster is counting barrels, and then counting them again, and writing both numbers down in case one of them turns out to be the true one. He has salves in a crate by his foot: Letherii field salve, in waxed paper, very good and not cheap.

"Six docks," he says, without looking up. "Docks, Sergeant. Not paybook, not promises, not the Finadd's signature. I have the Finadd's signature on eleven things this week and I can't eat one of them."`,
      ch:[{t:'A salve.', tag:'6 docks', req:()=>(S.silver || 0) >= 6, fx:()=>{ S.silver -= 6; S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for six docks.', 'good'); }, go:'b5_c1_qm'},
          {t:'A sword off the rack, a better one than issue.', tag:'8 docks', req:()=>(S.silver || 0) >= 8 && !(S.kit || []).includes('b5_c1_issuesword'), fx:()=>{ S.silver -= 8; updSilver(); gain('b5_c1_issuesword'); note('A Letherii sword, for eight docks. The tag stays on.', 'good'); }, go:'b5_c1_qm'},
          {t:'Talk him down to four. ("Who counted those barrels, if not us?")', check:['guile', 12], req:()=>(S.silver || 0) >= 4 && !S.f.b5_c1_haggle,
            edges:id=>[id === 'sgt' && ['you have watched him count for five years', 1], id === 'tobet' && ['he knows what the quartermaster skims, and how', 2], id === 'pessa' && ['canal cant, and a grievance', 2], id === 'thegg' && ['he asks too politely to haggle', -1], id === 'ammet' && ['she would rather have the salve than the argument', -1]],
            near:{t:()=>`Yes, but he makes ${b51Nm(b51Who())} count the spare boots for him while he wraps it, and the boots take the hour the squad would have spent by the fire. No rest at this fire.`, fx:()=>{ S.f['b5_c1_rest' + b51Ph()] = 1; }},
            fx:()=>{ S.f.b5_c1_haggle = 1; }, go:'b5_c1_qm_haggled', fail:'b5_c1_qm_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_qm_haggled:()=>({sp:'The quartermaster', scene:'b5_barracks', fx:()=>{ S.silver = Math.max(0, (S.silver || 0) - 4); S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for four docks.', 'good'); }, txt:
`He looks at the barrels. He looks at the book where he has written two numbers for them. "Four," he says, "and you never saw me count."

He wraps the salve in its paper as if it hurt him.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b5_c1_qm_no:()=>({sp:'The quartermaster', scene:'b5_barracks', txt:
`"Six," he says. "The barrels are counted. I counted them myself. Twice, and the numbers agree, which is more than the army's do." He goes back to counting.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* ---- the tile-woman: she reads when Perrit doesn't; tonight she watches ---- */
    b5_c1_tilewoman:()=>({sp:'The tile-woman', scene:'b5_barracks', fx:()=>{ S.f.b5_c1_tw = 1; }, txt:
`An old woman of the company's followers sits on an upturned bucket by the bunk-house wall with a bag of oiled cloth in her lap. She has walked behind the Whitefinders for longer than most of them have been in it, and reads bone tiles for a dock to anyone who asks. She spits to one side when you come over, which is her manners.

${b5In('perrit') ? `"Your mage reads for you," she says, and nods across the yard at Perrit. "Black stone, the school's way. Good tiles. Too clean." She shrugs. "Tiles want handling. Bone remembers the hand." She does not offer. She watches the lanterns over the wall instead, and counts them, under her breath.` : `"No mage tonight," she says. "Then it's bone, and it's a dock." She shakes the bag, and it clicks. "Sit, if you want it."`}`,
      ch:[Object.assign(b5TileChoice(1), {req:()=>!b5In('perrit') && !S.f.b5_c1_drawn && !S.f.b5_c1_noCard}),
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the bunk-houses and the gate ---- */
    b5_c1_bunk:()=>{ const ph = b51Ph();
      return {sp:'The bunk-houses', scene:'b5_barracks', txt:
`A long low room under the eaves with forty bunks in it, built for a regiment of shorter men. ${ph >= 3 ? 'The company is mostly out at the festival. The bunks are empty except for the sick, who are asleep, and Thegg\'s, which is too short for him, and empty too.' : 'The battalion\'s sick are in the end bunks. The rest are the company\'s, with a pack on each.'}`,
        ch:[{t:'Turn in. The festival is tomorrow.', req:()=>ph === 1 && !b51Slept() && !!S.f.b5_c1_clerk, onward:true, go:'b5_c1_sleep1'},
            {t:'Turn in. The court wants Thegg at the steps at first light.', req:()=>ph === 3 && b51Key() === 'swim', onward:true, go:'b5_c1_sleep2'},
            {t:'Turn in.', req:()=>ph === 3 && b51Key() === 'pay' && !!S.f.b5_c1_laneDone, onward:true, go:'b5_c1_sleep2'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c1_gate:()=>{ const ph = b51Ph();
      return {sp:'The barracks gate', scene:'b5_barracks', txt: ph === 1 && !b51Slept() ?
`The gate is barred on the Drownings District side, on the Finadd's orders, and the bar is chained. Through the gap at the hinge you can see the street: lanterns, a canal-boat full of musicians, and a man selling wagers off a tray.

The festival is tomorrow. The street does not seem to know that.` : ph === 1 ?
`The gate is open. The street beyond it is already full: the festival's first morning, and the whole city out on it to be lucky.` :
`The gate is open on the festival night. The street is a river of lanterns going down toward the canal, and the noise of it comes in through the gate and fills the yard.`,
        ch:[{t:'Out through the gate, into the festival.', req:()=>ph === 1 && b51Slept(), onward:true, go:'b5_c1_out'},
            {t:'Out to the end of the street to see the lanterns.', req:()=>ph >= 3 && !S.f.b5_c1_brys, go:'b5_c1_festival'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c1_sleep1:()=>({sp:'The barracks · morning', scene:'b5_barracks', fx:()=>{ S.f.b5_c1_slept = 1; }, txt:
`A night in barracks: forty soldiers in a room built for forty shorter ones, and the festival starting early on the far side of the wall.

In the morning the auditors arrive at the second bell, three pursers in grey with a porter carrying their own ink. Ennic meets them at the gate, bows, and hands them the company's books as if handing over a child he is fond of but not sorry to see go. Then he turns round and gives the company the day.

"The festival," he says. "Be back by dark. Nobody drowns."${b51If('thegg', `\n\nThegg is already at the gate with the folded note in his hand. "The tavern does not open before dusk," he says. "I would like to go then. If the sergeant will come."`)}`,
      ch:[{t:'Out through the gate, into the festival.', onward:true, go:'b5_c1_out'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b5_c1_out:()=>({sp:'The Drownings District', scene:'b5_c1_lowwalk', fx:()=>{ S.f.b5_c1_ph = 2; }, txt:
`Out through the gate and two streets down, and the street ends in the Low Walk: the paved walk along the Quillas Canal, a hundred paces of dark green water to the far side, and above the walk on both banks the tiers, stone steps going up like seats in a theatre, which is what they are.

This morning the tiers are filling for nothing in particular. The festival's Special Drownings are tomorrow. Today the city has come out to look at the canal and say what it will bet.`,
      ch:[{t:'Walk the Low Walk.', go:()=>{ startExplore('b5_c1_canal'); talk('b5_c1_canal_arrive'); }}]}),

    /* ---- the festival's first day: the Low Walk ---- */
    b5_c1_canal_arrive:()=>({sp:'The Low Walk', scene:'b5_c1_lowwalk', fx:()=>{ S.f.b5_c1_walked = 1; }, txt:
`The Low Walk is wide enough for a cart, and has mooring posts along its edge, with rope burns on every one of them a hand's breadth deep. On the Drownings District side the walk runs under a row of low stone buildings with their backs to the street above, and one of them has a brass scale painted over its door. The fines court.

Along the street at the top of the tiers there are stalls already: eels, wine, festival bread, and three men with chalk boards, writing odds.

${b51Say({sgt:`You grew up two streets back from here. You learned to swim in this canal at five, in the shallows by the boat-steps, and you learned why at six, from the tiers. You do not say so. You never have.`})}${b51If('tobet', `\n\nTobet looks at the boards and then looks away from them, as if he had touched something hot.`)}${b51If('perrit', `\n\nPerrit has stopped at the top of the tiers and will come no nearer the water than that.`)}`,
      ch:[{t:'Walk the Low Walk.', go:()=>startExplore()}]}),
    b5_c1_to_yard:()=>({sp:'The way back to the barracks', scene:b51Night() ? 'b5_c1_festival' : 'b5_c1_lowwalk', txt: b51Ph() === 2 && b51Key() ?
`Two streets back to the barracks, through the festival.` : b51Ph() >= 4 ?
`The company is packing in the yard: the Finadd has sent word for every soldier of the Sixth to be at the tiers this morning, for the battalion's honour, which nobody has explained. The yard can wait.` : S.f.b5_c1_fine ?
`Not without Thegg. The court has him.` :
`The barracks are two streets back, and full of auditors until dark. Ennic was very clear: the company has the day, and the day is out here.`,
      ch:[{t:'Back to the barracks.', req:()=>b51Ph() === 2 && !!b51Key(), onward:true, go:'b5_c1_evening_go'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_courtdoor:()=>({sp:'The fines court', scene:'b5_c1_lowwalk', txt:
`A low stone hall with its back to the street and its front on the Low Walk, and over the door a brass scale painted on the stone, one pan heavy with coins. The door is open. Inside, a clerk at a high desk is writing, and a short line of people is waiting on a bench to be told what they owe.

${b51Say({sgt:`You know this door. Every child two streets back from the canal knows this door. You don't stop.`, _:'The squad does not stop.'})}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_board:()=>({sp:'A builder\'s board', scene:'b5_c1_lowwalk', fx:()=>{ S.f.b5_bugg = 1; }, txt:
`At the end of the street, where it turns up toward the city's middle, somebody has nailed a builder's board to a post. Up the street, over the roofs, is the great dome of the new palace, the Eternal Domicile, under its scaffolding: seventeen years in the building, and still not done. The board says, in good square paint, *Bugg*, and under it, smaller, *Builder*.

Letheras has a joke about the new palace, which is that it is sinking. The clay under it heaves, and the builders shore it up, and the clay heaves again. ${b51Say({tobet:`"They say the King will be Emperor in it," Tobet says. "If it's still above ground."`, perrit:`"Seventeen years," Perrit says. "At the King's rates. I would like to see those books."`, _:'A carter going past points at the dome and says the joke out loud, in case you had not heard it.'})}${b51If('thegg', `\n\nThegg looks up at the scaffolding, measuring it, as a builder might. "My mother said the Tarthenal raised the first walls here," he says. "She said a great many things."`)}`,
      ch:[{t:'On along the Walk.', go:()=>startExplore()}]}),
    b5_c1_stall:()=>({sp:'An eel stall on the tiers', scene:b51Night() ? 'b5_c1_festival' : 'b5_c1_lowwalk', fx:()=>{ S.f.b5_c1_stall = 1; },
      again:()=> b51Night() ? 'The stall is shuttered for the night.' : `The eel stall. "Eel, wine, the odds." The woman has opinions about all three.`, txt: b51Night() ?
`The stall is shuttered for the night, with a chain through the shutters. The woman who keeps it is sitting on the step in front of it with a cup, watching the lit door of the fines court.

"Festival week," she says. "The court sits all night. The cells fill up." She drinks. "It's good for trade, in the morning."` :
`A woman with forearms like a docker's is frying eels on a griddle and selling wine by the cup, and talking all the time, to everyone, about the festival. Tomorrow's Special Drownings, she says, are the best list in years: the court has saved its worst for the Errant, and the boards are offering long odds on Risings.

"And Eberict," she says, lower, because everybody says his name lower. "Thirty-one now. He did a jeweller's man last month in the street, they say, in front of his own door, and walked home. The King's Leave." She flips an eel. "And he's going north with the Prince to talk to the Edur, so there's a mercy. They'll be glad of him up there, I'm sure."`,
      ch:[{t:'A round of eel and a cup each.', tag:'3 docks', req:()=>!b51Night() && (S.silver || 0) >= 3 && !S.f.b5_c1_eel, fx:()=>{ S.silver -= 3; updSilver(); S.f.b5_c1_eel = 1; S.rattled = {}; note('Hot eel and bad wine. The rattled settle.', 'good'); }, go:'b5_c1_stall_eel'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_stall_eel:()=>({sp:'An eel stall on the tiers', scene:'b5_c1_lowwalk', txt:
`Eel, hot off the griddle in a twist of paper, and wine that has been somewhere warm for too long. The squad eats it standing up on the tiers, looking at the canal, the way everyone in Letheras eats on a festival day.

${b51Say({thegg:`Thegg eats his and then looks at the griddle until the woman gives him a second for nothing. "For the size of you," she says. He thanks her very politely.`, tobet:`Tobet eats his slowly, to make it last, out of a habit older than the army.`, _:'It is very good eel.'})}`,
      ch:[{t:'On along the Walk.', go:()=>startExplore()}]}),

    /* ---- the Down Market crowd: festival cutpurses ---- */
    b5_c1_crowd:()=>({sp:'The Down Market crowd', scene:'b5_c1_lowwalk', txt:
`A crowd round the eel stall at the end of the tiers, thick enough to lose a cart in, and moving through it, thin and quick and not buying anything, three young men and a girl with the kind of hands that have never been still. Behind them, leaning on the post of a wine stall with his arms folded, a big man in a good coat is watching where their hands go and counting.

A woman with a market basket turns round to pay for her eel, and her purse is not there, and she starts looking at the ground for it, because it has to be somewhere.${b51If('tobet', `\n\n"Four of them," Tobet says quietly. "And him. The girl's the best. She's had two since we've been watching."`)}`,
      ch:[{t:'"Whitefinders. Stand where you are." Shields up.', go:()=>startBattle('b5_c1_cutpurses', {})},
          {t:'Come at them round the back of the stalls, quiet.', check:['guile', 13],
            edges:id=>[id === 'tobet' && ['he was taught to be somewhere the blow is not', 2], id === 'sgt' && ['you grew up in these streets', 1], id === 'pessa' && ['canal-side markets are her home ground', 1], id === 'thegg' && ['there is no quiet way for Thegg to go round anything', -2], id === 'ammet' && ['she would rather be stitching than sneaking', -1]],
            near:b51Owe(8, 'An eel-seller\'s basket', w => `Yes, but ${b51Nm(w)} ${w === 'sgt' ? 'put' : 'puts'} a foot through an eel-seller's basket on the way, and she knows where the Whitefinders are billeted, and says so. The company clerk will have her bill by the evening: ${b5Coin(8)} against ${w === 'sgt' ? 'your' : NAME(w) + '\'s'} line.`, {t:w => `Yes, but ${b51Nm(w)} ${w === 'sgt' ? 'go' : 'goes'} through an eel-seller's basket on the way, and the eels go everywhere, and so does ${w === 'sgt' ? 'your' : b5His(w)} dignity: rattled.`, fx:w => b51Rattle(w)}),
            go:()=>startBattle('b5_c1_cutpurses', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c1_crowd_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_crowd_seen:()=>({sp:'The Down Market crowd', scene:'b5_c1_lowwalk', txt:
`The girl sees you first. She whistles once, two notes, and the three young men stop being three young men in a crowd and turn, with thin knives, and the big man unfolds his arms and comes off the post.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b5_c1_cutpurses', {surprise:'e'})}]}),
    b5_c1_cutpurses_after:()=>({sp:'The Down Market', scene:'b5_c1_lowwalk', fx:()=>{ S.f.b5_c1_cutDone = 1; S.silver = (S.silver || 0) + 8; updSilver(); note('+8 docks from the stall-keepers, for the purses.', 'good'); gain('b5_c1_chit'); }, txt:
`The minder is sitting on the tiers holding his head, and the cutpurses are mostly gone into the crowd, all but one young man who is sitting on the girl's account, because she left him. Between them they had eleven purses. The woman with the basket gets hers back and counts it, in front of you, before she thanks you.

The stall-keepers along the tiers give the squad eight docks between them, because the cutpurses have been working their stalls all morning and a robbed customer buys nothing. In the minder's coat there is a wooden wager-chit, stamped with a rope and a wave and a chalk number: a bet on a Rising that never paid. ${b51Say({tobet:`Tobet turns it over. "Long odds," he says. "Somebody believed." He gives it back.`, _:'It goes in the kit.'})}

A Garrison man strolls up when it is all over, looks at the minder, looks at the squad's shields, and writes something down. "Whitefinders," he says. "Lovely."`,
      ch:[{t:'On along the Walk.', go:()=>startExplore()}]}),

    /* ---- the rope-man: the trick ---- */
    b5_c1_ropeman:()=>({sp:'An old rope-man', scene:'b5_c1_lowwalk', txt:
`An old man in a tarred apron is coiling a rope round a mooring post at the edge of the Low Walk: a thick rope, wet a long way up, with an iron hook at the end of it. He is one of the court's rope-men. On a Drowning day they tie the coins to the accused, and when it is over they haul the coins back out, because the coins are the court's.

He looks at the squad's shields, and the white fingertips on the bosses. "Soldiers," he says. "Here for the Special list tomorrow? Everybody is." He spits in the canal. "I've hauled forty years of coins out of that water. And now and then something heavier." He does not lower his voice; he just says it more slowly. "When the crowd's looking at the boards and not at the rope. A man who's made it most of the way across. You don't ask the court, you just haul."

He pats the post. "A hand on the strap, a hip against the post, and all of you in one pull. It's not strength. It's knowing where the weight is. I'll show one of you, if you like. Once."`,
      ch:[{t:'"Show us."', check:['might', 15], trick:'b5_c1_haul', req:()=>!S.f.b5_c1_ropeTried, fx:()=>{ S.f.b5_c1_ropeTried = 1; },
            edges:id=>[id === 'sgt' && ['canal-born: you watched the rope-men haul from the tiers as a child', 2], id === 'thegg' && ['he is strong enough to haul anybody', 1], id === 'pessa' && ['she has hauled barges on a canal rope', 1], id === 'tobet' && ['he is light, and the weight takes him', -1], id === 'perrit' && ['she will not stand with her back to the water', -1]],
            near:{t:()=>`Yes, but the rope runs through ${b51Nm(b51Who()) === 'you' ? 'your' : b51Nm(b51Who()) + '\'s'} hands on the first try and takes the skin with it.`, fx:()=>bruise(b51Who(), bruiseN())},
            go:'b5_c1_rope_ok', fail:'b5_c1_rope_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_rope_ok:()=>({sp:'An old rope-man', scene:'b5_c1_lowwalk', fx:()=>{ S.f.b5_c1_ropeOk = 1; gain('b5_c1_hookknife'); }, txt:
`He makes ${by({sgt:'you', _:'{who}'})} stand with one hip to the post and a hand through the strap of his own apron, and then he steps back off the edge of the Low Walk into the air over the canal, all at once, and ${by({sgt:'you haul', _:'{who} hauls'})}, and he comes back across the edge in one pull and stands on the stones as if he had never left them.

"Again," he says, and does it again. On the third time he does not even look where he is falling.

"That's the haul," he says. "Not sorcery. They'll not sing about it. It's just knowing where a body's weight is when it doesn't." He unhooks a short hooked knife from his apron, the kind the rope-men use to cut a weight-sack off the rope, and holds it out handle first. "For the strap. You'll want to cut somebody loose one day. Better with the right knife."`,
      ch:[{t:'"Thank you." On along the Walk.', go:()=>startExplore()}]}),
    b5_c1_rope_no:()=>({sp:'An old rope-man', scene:'b5_c1_lowwalk', txt:
`He steps back off the edge into the air over the canal, and ${by({sgt:'you haul', _:'{who} hauls'})}, and the weight goes the wrong way, and he has to catch the post himself with his other hand and come back on his own.

"Arms," he says, not unkindly. "You hauled with your arms. Arms are for waving at the boards." He coils the rope. "Come back when you know where you are."`,
      ch:[{t:'On along the Walk.', go:()=>startExplore()}]}),
    b5_c1_ropeman_again:()=>({sp:'An old rope-man', scene:'b5_c1_lowwalk', again:()=>`The rope-man, at his post. "Soldiers."`, txt:
`The rope-man is at his post, coiling, uncoiling, coiling. ${S.f.b5_c1_swam ? 'He nods at Thegg as the squad comes up. "I hauled your coins out," he says. "Three hundred, every one. You didn\'t need me for the rest." He sounds almost sorry.' : b51Ph() >= 4 ? 'This morning the court\'s rope is out across the canal, and he is minding it.' : '"Tomorrow," he says, of the Special list. "Tomorrow there\'s work."'}`,
      ch:[{t:'Buy a hook-knife off him.', tag:'8 docks', req:()=>!S.f.b5_c1_ropeOk && !(S.kit || []).includes('b5_c1_hookknife') && (S.silver || 0) >= 8, fx:()=>{ S.silver -= 8; updSilver(); gain('b5_c1_hookknife'); }, go:'b5_c1_ropeman_knife'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_ropeman_knife:()=>({sp:'An old rope-man', scene:'b5_c1_lowwalk', txt:
`He unhooks a short hooked knife from his apron and takes the eight docks and bites one, which is a thing people only do in stories, and does it anyway. "The court will dock me for it," he says. "The court docks me for everything."`,
      ch:[{t:'On along the Walk.', go:()=>startExplore()}]}),

    /* ---- out to the pit town at dusk ---- */
    b5_c1_to_pit:()=>({sp:'The east gate', scene:'b5_c1_lowwalk', txt: b51Ph() >= 4 || S.f.b5_c1_tavernDone ?
`The pit town is outside the east gate. There is nothing for the squad out there now.` :
`The east gate stands open for the festival, and the road beyond it runs out under the white walls of Letheras to where the pit towns are: shacks and smoke and the people Lether did not have a use for, mostly Tarthenal. It will be dusk by the time you are there, and dark soon after.${b51If('thegg', `\n\nThegg has the folded note in his hand again. "The tavern is by the third brazier," he says. "My mother's. It was hers to drink in, I mean. Not hers."`)}`,
      ch:[{t:'Out to the pit town.', req:()=>b51Ph() === 2 && !S.f.b5_c1_tavernDone && !!S.f.b5_c1_tab, onward:true, go:()=>{ startExplore('b5_c1_pittown'); talk('b5_c1_pit_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_pit_arrive:()=>({sp:'The pit town', scene:'b5_c1_pittown', fx:()=>{ S.f.b5_c1_pit = 1; }, txt:
`The pit town is built out of what the city threw over its walls: old boards, old canvas, old doors, and on one shack a whole shopfront with the shop's name still on it. Braziers burn in the lanes. The people round them are big, most of them, and slow, and the drink they are drinking is the cheapest thing in Lether that will still burn.

Tarthenal. What is left of them. Lether took their country a long time ago, and the pit towns are where the people went who would not go anywhere else.

${b51Say({thegg:`Thegg walks down the middle of the lane with his shield on his back, turning sideways for nobody now. People look up from the braziers as he passes, at the size of him, and then at the Whitefinder's cloak, and then away.`, _:'The squad walks down the middle of the lane, and the pit town looks at its cloaks, and then away.'})}`,
      ch:[{t:'Walk.', go:()=>startExplore()}]}),
    b5_c1_pit_back:()=>({sp:'The road back to the gate', scene:'b5_c1_pittown', txt: S.f.b5_c1_tavernDone ?
`The road back to the east gate, and the city lit up beyond it, and the fines court on the Low Walk. The Garrison has taken Thegg there.` :
`${b51Say({thegg:`Thegg is looking back at the tavern door. "I would like to see them first," he says. "Politely."`, _:'The tavern\'s door is the only lit one in the lane. The tab is in there.'})}`,
      ch:[{t:'Back to the city, to the court.', req:()=>!!S.f.b5_c1_tavernDone && !b51Key(), onward:true, go:()=>{ startExplore('b5_c1_canalnight'); talk('b5_c1_court'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_oldman:()=>({sp:'An old Tarthenal', scene:'b5_c1_pittown', fx:()=>{ S.f.b5_c1_oldman = 1; }, txt:
`An old man the size of a wardrobe sits on a crate by the third brazier with a jar between his feet, and watches the squad come down the lane. When he sees Thegg he puts the jar down, which in the pit town is a mark of respect.

"Her boy," he says. "The soldier." He looks Thegg up and down, the whole long way. "You have her shoulders. Not her temper. Good." He picks the jar up again. "The tavern says the army stopped paying. The tavern says a lot of things. The collector says them louder."${b51If('thegg', `\n\nThegg says something low to him in the tongue he uses at night, and the old man answers in it, and for a moment the two of them are somewhere else.`)}`,
      ch:[{t:'"Tell us about the collector."', check:['wits', 12], req:()=>!S.f.b5_c1_warnTried, fx:()=>{ S.f.b5_c1_warnTried = 1; },
            edges:id=>[id === 'thegg' && ['he speaks the old man\'s tongue, and the old man knew his mother', 3], id === 'ammet' && ['her grandmother was half Nerek; she knows how the conquered talk about debt', 1], id === 'perrit' && ['she sounds like the Pursers\' District', -1], id === 'tobet' && ['an Indebted boy knows the questions', 1]],
            near:{t:()=>`Yes, but the old man wants a drink for every answer, and ${b51Nm(b51Who())} ${b51Who() === 'sgt' ? 'have' : 'has'} to match him: rattled, and slower in the head for it.`, fx:()=>b51Rattle(b51Who())},
            go:'b5_c1_oldman_ok', fail:'b5_c1_oldman_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_oldman_ok:()=>({sp:'An old Tarthenal', scene:'b5_c1_pittown', fx:()=>{ S.f.b5_c1_warned = 1; if (!S.f.b5_c1_club) { S.f.b5_c1_club = 1; gain('b5_c1_tarthclub'); } }, txt:
`"Three bullies," the old man says. "Letherii, from inside the walls. Cudgels. The collector keeps the book in the back room, behind the curtain, and he never comes out from behind his table himself." He drinks. "And there's always a drunk on the corner bench who thinks a fight is his. Don't hit that one. He has a family."

He looks at Thegg. "She paid every month," he says. "Every month she could. That's in no book of theirs."

Then he reaches down beside the crate and lifts out a club of black root-wood with old nails in the head, and holds it out to Thegg by the wrong end, so that he has to take it. "Her people's," he says. "Not mine to keep."`,
      ch:[{t:'"Thank you, grandfather."', go:()=>startExplore()}]}),
    b5_c1_oldman_no:()=>({sp:'An old Tarthenal', scene:'b5_c1_pittown', txt:
`The old man looks at the squad's cloaks and decides, slowly, that he has said enough to soldiers for one night. "Go and ask them," he says. "They'll tell you. They love telling."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_cart:()=>({sp:'A cart in the mud', scene:'b5_c1_pittown', txt: S.f.b5_c1_cartDone ?
`The cart is gone. There is a deep rut where it was, already filling with water.` :
`A carter's cart is down to the axle in the lane's mud, loaded with empty jars for the tavern, and the carter, a Tarthenal woman nearly as big as the cart, is pushing on the tailboard alone and saying a word over and over in her own tongue that does not need translating.`,
      ch:[{t:'Get a shoulder under it.', check:['might', 13], req:()=>!S.f.b5_c1_cartDone, fx:()=>{ S.f.b5_c1_cartDone = 1; },
            edges:id=>[id === 'thegg' && ['there is a great deal of him to push with', 2], id === 'brune' && ['she has dragged boats up a beach', 1], id === 'perrit' && ['she is small and the cart is not', -1], id === 'tobet' && ['he is all bow arm and no back', -1]],
            near:{t:()=>`Yes, but the wheel comes up out of the mud and down on ${b51Nm(b51Who()) === 'you' ? 'your' : b51Nm(b51Who()) + '\'s'} foot.`, fx:()=>bruise(b51Who(), bruiseN())},
            go:'b5_c1_cart_ok', fail:'b5_c1_cart_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_cart_ok:()=>({sp:'A cart in the mud', scene:'b5_c1_pittown', fx:()=>{ S.f.b5_c1_carter = 1; S.silver = (S.silver || 0) + 5; updSilver(); note('+5 docks from the carter. She insisted.', 'good'); }, txt:
`The cart comes up out of the lane with a noise like a cow leaving a bog, and rolls, and the carter catches the shafts before it gets away. She looks at the squad's cloaks, and at ${by({thegg:'Thegg', sgt:'you', _:'{who}'})}, and counts five docks into ${by({sgt:'your', _:'{who}\'s'})} hand from a purse on a thong round her neck, and will not take them back.

"Soldiers' pay," she says. "I know what it is. My son is in the Artisans." She takes the shafts and goes, and the jars clink all the way down the lane.`,
      ch:[{t:'On.', go:()=>startExplore()}]}),
    b5_c1_cart_no:()=>({sp:'A cart in the mud', scene:'b5_c1_pittown', txt:
`The cart rocks, and settles back deeper. The carter looks at the squad with something like pity, puts her own shoulder to the tailboard, and lifts it out alone, which is somehow worse.`,
      ch:[{t:'On.', go:()=>startExplore()}]}),

    /* ---- the tavern: the tab, the collector, the brawl ---- */
    b5_c1_taverndoor:()=>({sp:'The pit-town tavern', scene:'b5_c1_pittown', fx:()=>{ S.f.b5_brizad = 1; }, txt: S.f.b5_c1_tavernDone ?
`The tavern is shut, with a Garrison man on the door and the stools stacked inside. There is a great deal of broken jar in the lane.` :
`The tavern is a long low room with a fire at one end and a curtain at the other, and a slate on the wall beside the curtain with tabs chalked on it, a column of them, each beside a mark instead of a name. It is full of Tarthenal drinking quietly, and two tables of Letherii from inside the walls drinking loudly, who have come out to the pit town for the festival because it is cheaper.

The Letherii are talking about the court. "...the First Consort," one of them is saying. "Turudal Brizad. Has the Queen's ear and half the court's notes in his pocket, my cousin says. Whatever the Queen's faction wants, ask him first." "Your cousin cleans the palace privies." "Which is where you hear things."

The curtain moves and a neat man comes out from behind it with a book under his arm and three big Letherii behind him with cudgels, and looks at Thegg.

"The soldier," the collector says. "Good. The army has paid nothing on your mother's tab since the spring, so the tavern has added interest, as is its right. Forty docks. Today. And the tab, of course." He smiles. "Or the court, and you can explain it to them."${b51If('thegg', `\n\nThegg says, very politely, "The army pays it. Out of my pay. The clerk has the entries." He does not raise his voice. He has stopped moving entirely.`)}`,
      ch:[{t:'Talk it down. ("The army pays its debts. Take it up with the army.")', check:['guile', 14], req:()=>!S.f.b5_c1_tavernDone,
            edges:id=>[S.f.b5_c1_warned && ['you know who is behind the curtain, and how many', 2], id === 'sgt' && ['you know the company\'s paybooks to the dock', 1], id === 'tobet' && ['he knows the words the Indebted use to holders', 1], id === 'perrit' && ['she can recite the clerk\'s entries from memory', 1], id === 'thegg' && ['it is his mother\'s tab; he has stopped talking', -2], id === 'ammet' && ['she would rather stitch the collector than argue with him', -1]],
            near:{t:()=>`Yes, but somebody at the Letherii table throws a stool before the collector has finished listening, and it finds ${b51Nm(b51Who()) === 'you' ? 'you' : b51Nm(b51Who())}.`, fx:()=>bruise(b51Who(), bruiseN())},
            go:'b5_c1_tavern_talked', fail:'b5_c1_tavern_ugly'},
          {t:'"Shields. No blades." Between Thegg and the cudgels.', req:()=>!S.f.b5_c1_tavernDone, go:()=>startBattle('b5_c1_tavern', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_tavern_talked:()=>({sp:'The pit-town tavern', scene:'b5_c1_pittown', txt:
`${by({sgt:'You talk', _:'{who} talks'})}: the paybooks, the entries, the army's signature on the tab, the clerk who has the dates. The collector listens, which surprises everybody, and opens his book, and runs his finger down a page, and stops.

He would very likely have closed the book. But one of the Letherii from the loud table has decided that a Whitefinder in a pit-town tavern is an insult to every honest drinker inside the walls, and swings at Thegg with a jar, and Thegg's shield is in the way, and the jar is not any more. The collector closes his book and steps back behind his bullies. "Well," he says. "Now it's assault."`,
      ch:[{t:'Shields up. No blades.', go:()=>startBattle('b5_c1_tavern', {surprise:'p'})}]}),
    b5_c1_tavern_ugly:()=>({sp:'The pit-town tavern', scene:'b5_c1_pittown', txt:
`${by({sgt:'You talk', _:'{who} talks'})}, and the collector smiles all the way through it, and at the end of it he nods to his bullies, as he might nod to a waiter for the bill. The first cudgel is already coming.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b5_c1_tavern', {surprise:'e'})}]}),
    b5_c1_tavern_after:()=>({sp:'The pit-town tavern', scene:'b5_c1_pittown', fx:()=>{ S.f.b5_c1_tavernDone = 1; S.f.b5_c1_fine = 300; }, txt:
`The collector is sitting on the floor of the back room with his book in his lap and his nose bleeding into it. His bullies are where they fell. Nobody is dead. The tavern's furniture has not been so lucky.

The City Garrison comes in through the front door the moment it is over, the way the Garrison always does: six of them with staves and a sergeant of their own with a slate. The sergeant looks round the tavern, at the broken stools and the bullies and the Tarthenal drinkers sitting very still against the walls, and does what the Garrison always does, which is take the biggest man there.

It is Thegg.

"Assault without cause," the Garrison sergeant says, writing. "Three hundred docks. The man's fine." He looks up at Thegg, a long way up. "Or the canal. The fines court is sitting all night, it's festival week. Come along, big lad."${b51If('thegg', `\n\nThegg looks at you. Then he turns sideways for the door, and goes with them, quietly, the way he does everything.`)}${b51If('ammet', `\n\nAmmet stops the Garrison on the step long enough to look at the cut over Thegg's eye, and say "still," and close it with two stitches. The Garrison sergeant waits. Everybody waits for Ammet.`)}`,
      ch:[{t:'After him, to the fines court.', onward:true, go:()=>{ startExplore('b5_c1_canalnight'); talk('b5_c1_court'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the fines court: the key ---- */
    b5_c1_court:()=>({sp:'The fines court', scene:'b5_c1_court', again:()=>`The fines court. The clerk at the high desk, the brass scale, and Thegg on the bench. "Paid, or swum, Sergeant?"`, txt: b51Key() ?
`The fines court has gone on to the next case. ${b51Key() === 'pay' ? 'Thegg\'s fine is paid, and the receipt is sealed.' : 'Thegg is the army\'s until first light, on the Finadd\'s signature.'}` :
`The fines court is a low stone hall with lamps on chains, a bench along one wall full of people waiting to be told what they owe, and at the far end a high desk with a clerk at it and a brass scale beside him, one pan heavy with docks. Thegg is on the end of the bench with a Garrison man either side of him, sitting very straight.

The court does not trouble itself with a hearing. The Garrison's slate is the hearing. "Assault without cause," the court's clerk reads. "Three hundred docks, the man's fine. Paid, or swum. First light."

Finadd Ennic arrives a quarter of an hour later, sent for, with the company clerk behind him and the oilskin case under the clerk's arm. Ennic looks at the scale, and at Thegg, and then at you, the way he looks at you over anything that needs signing.

The company clerk has the paybooks open on the end of the court's desk. "The Sixth can carry it," he says, low. "On the paybooks, against the squad, with the Finadd's signature. Three hundred, across five lines." He looks at the page, and his face does something. "And Sergeant. The army has been taking the tab out of Thegg's pay since the spring. It has not been sending it. A clerk's error." A pause. "The last clerk's."

${b51Say({thegg:`Thegg says, "I can swim it, Sergeant." He says it the way he says *behind me*. "I have four lungs. Ammet says."`, _:'The court\'s clerk waits, pen up. The scale does not move.'})}${b51If('ammet', ` Ammet, behind him, has gone very still, which from her is an opinion.`)}${b51If('perrit', `\n\nPerrit is already doing the sums under her breath. "Three hundred over five is sixty," she says. "But you'll make the sergeant carry more. You always do."`)}${b51If('tobet', `\n\nTobet is looking at the scale. "Short odds on a Tarthenal," he says, too quietly, and then looks as if he wished he had not.`)}`,
      ch:[{t:'"Put it on the paybooks. All of us."', req:()=>!b51Key(), fx:()=>{ S.f.b5_c1_key = 'pay';
              Object.entries(B51_FINE).forEach(([id, n]) => { if (id === 'sgt' || b5Debtors().includes(id)) b5Owe(id, n, 'Thegg\'s fine'); });
              const fee = Math.min(10, S.silver || 0); S.silver = (S.silver || 0) - fee; S.f.b5_c1_fee = fee; updSilver(); if (fee) note(`The court clerk's fee: ${b5Coin(fee)}, in hand.`, 'bad');
              b51L('thegg', 2); b51L('perrit', -1); gain('b5_c1_receipt'); }, go:'b5_c1_court_pay'},
          {t:'"Let him swim it."', req:()=>!b51Key(), fx:()=>{ S.f.b5_c1_key = 'swim'; }, go:'b5_c1_court_swim'},
          {t:'"Not yet." (step out onto the Low Walk)', req:()=>!b51Key(), go:()=>startExplore()},
          {t:'Back to the barracks.', req:()=>!!b51Key(), onward:true, go:'b5_c1_evening_go'},
          {t:'Not now.', req:()=>!!b51Key(), go:()=>startExplore()}]}),
    b5_c1_court_pay:()=>({sp:'The fines court', scene:'b5_c1_court', txt:
`The company clerk writes five lines, one on each paybook, in his smallest hand, and turns each book round for Ennic, and Ennic signs five times, quickly, without reading, the way he signs everything you put in front of him. Eighty docks on yours. Sixty on Thegg's, and Perrit's, and Tobet's. Forty on Ammet's.

The court's clerk writes a receipt for three hundred docks, received, and seals it with grey wax, and threads the court's cord through the seal, and takes ${S.f.b5_c1_fee ? `${b5Coin(S.f.b5_c1_fee)} for the sealing, in hand, not on any paybook` : 'nothing for the sealing, because the squad has nothing in hand to take'}. Lether charges for its receipts.

${b51Say({perrit:`Perrit says the totals out loud as the clerk writes them, every one, and then the squad's whole debt, to the dock. She was not asked. She is not thanked.`, _:''})}${b51If('thegg', `\n\nThegg stands up off the bench, and the Garrison men stand back to let him. He looks at the squad. "I will pay it back," he says. "Every dock." He means the docks, and something else, and he knows you know it.`)}

The clerk holds out the receipt. "Somewhere dry," he says.`,
      ch:[{t:'Back to the barracks.', onward:true, go:'b5_c1_evening_go'},
          {t:'Not now. (the Low Walk)', go:()=>startExplore()}]}),
    b5_c1_court_swim:()=>({sp:'The fines court', scene:'b5_c1_court', txt:
`"Swum," the court's clerk says, and writes it, and the scale does not move.

There is a form for this too, in Lether. The court will weigh Thegg with the fine, three hundred docks of the court's own coin in a canvas sack, so that the coins can be hauled back out on the rope after. If he reaches the far steps, he is free and the fine is struck. The court will charge him for the rope, and the sack, and the weighing, whichever way it goes.

Ennic signs for Thegg's body until first light. The court trusts the army to deliver a soldier the way it trusts a counting-house to deliver a dock: in writing. "First light," the clerk says. "The steps by the third post. The ordinary list, before the festival's."

${b51If('thegg', `Thegg stands up off the bench. "Thank you, Sergeant," he says, and you are not sure, and neither is he, what for.`)}${b51If('ammet', `\n\nOn the way out, Ammet puts her ear against Thegg's back through the scale, in the doorway of the court, and listens, and keeps listening, until the Garrison man coughs. Then she walks on.`)}`,
      ch:[{t:'Back to the barracks.', onward:true, go:'b5_c1_evening_go'},
          {t:'Not now. (the Low Walk)', go:()=>startExplore()}]}),
    b5_c1_evening_go:()=>({sp:'The festival night', scene:'b5_c1_festival', fx:()=>{ S.f.b5_c1_ph = 3; }, txt:
`Back through the streets to the barracks, with the festival roaring round the squad on every side: lanterns on every canal, boats full of music, crowds on the bridges, and at every corner a man with a chalk board selling tomorrow's odds.

The gate is open. The yard is full of lanterns somebody has borrowed from the street.`,
      ch:[{t:'Into the yard.', go:()=>{ startExplore('b5_c1_barracks'); talk('b5_c1_evening'); }}]}),

    /* ---- the festival night in the yard ---- */
    b5_c1_evening:()=>({sp:'The barracks yard · the festival night', scene:'b5_barracks', txt:
`The yard on the festival night: lanterns on the eaves, the battalion's sick sitting up on their bunks in the doorways to see them, and the company drinking its festival dock round the fires and then drinking the next one on credit.

By the gate, somebody has let in a bookmaker. He has set up a chalk board on an easel under the lamp, with tomorrow's Special Drownings on it, and the odds, and he is taking the company's docks one at a time and writing every one of them down.

${b51Key() === 'swim' ? `The board has a line of its own at the bottom, in fresh chalk, for the ordinary list at first light. It does not have a name on it. It has a weight: three hundred. The company is not looking at that line, very carefully.` : `The company has heard about the fine. Soldiers come by the squad's fire all evening to look at Thegg, and some of them stand him a cup, and one of them, a soldier of the Fourth Squad, tells you he would have let the big lad swim it. You thank him for his opinion.`}`,
      ch:[{t:'The fire.', go:'b5_c1_yard'},
          {t:'Walk the yard.', go:()=>startExplore()}]}),
    b5_c1_festival:()=>({sp:'The Errant\'s festival', scene:'b5_c1_festival', fx:()=>{ S.f.b5_c1_brys = 1; }, txt:
`Out at the end of the barracks street, where it gives on to a bridge over a side canal, you can see half of Letheras lit: lanterns along every canal, strung across the streets, hung in the rigging of the boats, and over all of it the old towers dark against the last of the light, and the new palace's dome under its scaffolding.

Far off across the water there is a lit balcony on the palace side with a crowd of small figures on it: the King's party, out to be seen on the Errant's night. One of them stands a little apart from the rest with a sword at his hip, and the people on the bridge beside you say that is Brys Beddict, the new Champion. From here he is a shape with a sword, and very still.

${b51Say({tobet:`Tobet watches the balcony for a while. "The holder took us to see the King once," he says. "On a festival. We stood a long way off, like this." He thinks. "It was very like this."`, perrit:`Perrit has her back to the canal, as usual, and is watching the lanterns instead. "Every one of those is on somebody's account," she says. "I'd like to see that ledger."`, _:'The squad watches the lit city for a while, and then goes back in.'})}`,
      ch:[{t:'Back to the fire.', go:'b5_c1_yard'}]}),

    /* ---- 'pay': the lane that night ---- */
    b5_c1_lane_start:()=>({sp:'The barracks lane', scene:'b5_barracks', txt:
`The noise in the lane behind the barracks is the noise of men who want to be heard by somebody in particular. When the squad comes round through the bunk-house's back door, the tavern's collector is standing in the lane in the light of a borrowed festival lantern with a fresh bandage across his nose, and three bullies behind him, and one more he has brought in from somewhere, and his book under his arm.

"A fine paid to the court," he says, "is not a tab paid to me." He opens the book. "Forty docks of interest, Sergeant, and the tab, and the damage to the tavern, which I will be generous about." He smiles round the bandage. "Or I shall have to collect it from the big one personally."${b51If('thegg', `\n\nThegg comes out of the back door behind you and stands there. He does not say anything. He does not need to.`)}`,
      ch:[{t:'"Shields. No blades." Hold the lane.', go:()=>startBattle('b5_c1_lane', {})},
          {t:'Come round behind them through the end bunk-house, quiet.', check:['wits', 14],
            edges:id=>[id === 'sgt' && ['you have known this barracks for five years', 1], id === 'tobet' && ['he knows how to be where he is not expected', 2], id === 'ammet' && ['she knows which of the sick will keep quiet and which will shout', 1], id === 'thegg' && ['he is already in the lane, being looked at', -1], id === 'perrit' && ['the end bunk-house backs on the canal', -1]],
            near:{t:()=>`Yes, but one of the battalion's sick sits up in his bunk as ${b51Nm(b51Who())} ${b51Who() === 'sgt' ? 'go' : 'goes'} past and asks very loudly what the noise is, and the lane hears him.`},
            go:()=>startBattle('b5_c1_lane', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c1_lane_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_lane_seen:()=>({sp:'The barracks lane', scene:'b5_barracks', txt:
`The end bunk-house's door sticks, as it has stuck for five years, and comes open with a shriek, and every head in the lane turns. The collector sighs, and nods to his bullies.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b5_c1_lane', {surprise:'e'})}]}),
    b5_c1_lane_after:()=>({sp:'The barracks lane', scene:'b5_barracks', fx:()=>{ S.f.b5_c1_laneDone = 1; b5Forgive('thegg', 20, 'The collector\'s interest, struck out'); }, txt:
`The company comes out of the bunk-houses at the end of it, forty soldiers in their shirts with whatever came to hand, and stands round the lane looking at the collector's men on the ground and at the squad, and somebody starts to clap, and is told to stop.

The collector is sitting against the barracks wall holding his book. ${b51Say({perrit:`Perrit takes it off him, gently, and opens it at Thegg's mother's page, and reads it under the lantern, and then reads the interest out loud, line by line, with the dates. She shows the company clerk, who has come out in his nightshirt with the oilskin case. The clerk looks at it the way he looks at most things.`, _:`The company clerk has come out in his nightshirt with the oilskin case, and takes the collector's book off him, and reads it under the lantern, and looks at it the way he looks at most things.`})}

"Twenty docks of this interest," the clerk says, "was charged on payments the army did make. Before the spring." He takes the collector's own pen out of the collector's own coat and strikes the lines through, neatly, and initials each one, and writes the same twenty back on Thegg's paybook line. "There. Struck out. You may take the rest of it up with the army's pursers. They are in the barracks until the third bell tomorrow." He hands the book back. "They will enjoy you."${b51If('thegg', `\n\nThegg helps the collector up, because he is Thegg, and the collector lets him, and neither of them says anything.`)}`,
      ch:[{t:'The fire.', go:'b5_c1_yard'}]}),

    /* ---- the night, and the morning after ---- */
    b5_c1_sleep2:()=>({sp:'The barracks · first light', scene:'b5_c1_lowwalk', fx:()=>{ S.f.b5_c1_ph = 4; }, txt: b51Key() === 'swim' ?
`Nobody in the squad sleeps much. Thegg sleeps all night, on his back on the flags by the fire, and wakes before first light, and eats two breakfasts, and asks first.

At first light the Low Walk is grey and quiet, and the tiers above it are nearly empty: the ordinary list draws nobody on a festival morning, when the special one is three hours off. There is a short line of people on the court's bench by the steps. Thegg is the fourth.` :
`The festival night goes on loudly, and then is all at once quiet. In the morning the auditors are back, and Ennic sends word that every soldier of the Sixth is to be on the tiers for the Special Drownings, for the battalion's honour. Nobody explains what the battalion's honour has to do with it.

The Low Walk is full by the third bell, and the tiers above it fuller.`,
      ch:[{t: b51Key() === 'swim' ? 'Down to the steps.' : 'Up onto the tiers.', onward:true, go:()=> { startExplore('b5_c1_canal'); talk(b51Key() === 'swim' ? 'b5_c1_steps' : 'b5_c1_tiers'); }},
          {t:'Not yet.', go:()=>startExplore('b5_c1_canal')}]}),

    /* ---- 'swim': the bench by the steps, the swim in five lines, and after ---- */
    b5_c1_steps:()=>({sp:'The steps by the third post', scene:'b5_c1_lowwalk', txt:
`The court's bench by the steps: three people ahead of Thegg on the ordinary list, and the court's clerk at a portable desk, and the rope-man with the rope coiled at his feet. The three ahead go one at a time. You do not watch them. ${b51Say({thegg:`Thegg does not either. He sits on the bench with his hands on his knees and breathes, slow and deep, more breath than a man that size should have room for.`, _:'The squad watches the water instead.'})}

Then the clerk says, "Three hundred," and looks up.`,
      ch:[{t:'Thegg goes down the steps.', onward:true, go:'b5_c1_swim'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_swim:()=>({sp:'The steps by the third post', scene:'b5_c1_lowwalk', fx:()=>{ if (!S.f.b5_c1_swam) { S.f.b5_c1_swam = 1; b5Owe('thegg', 40, 'The court\'s fee for the rope and the weights'); b51L('tobet', -1); gain('b5_c1_weightbag'); } }, txt:
`The rope-man ties the sack to the rope and the rope to Thegg, a turn round his chest and a knot at the back, and steps away.

Thegg goes down the steps into the canal and the water closes over his shoulders, and then over his head, and the rope goes taut and stays taut.

The few people on the tiers stop talking. Then, a long way out, the noise they make changes.

The rope goes slack. On the far steps a hand comes out of the water, a very big hand, and finds the stone, and holds it.`,
      ch:[{t:'Round by the bridge to the far steps.', go:'b5_c1_swim_after'}]}),
    b5_c1_swim_after:()=>({sp:'The far steps', scene:'b5_c1_lowwalk', txt:
`By the time the squad comes round by the bridge, Thegg is sitting on the far steps with water running off him and the empty sack in his lap, and the rope-man on the near side is hauling the court's three hundred docks back across on the rope, hand over hand, every one.

${b51Say({ammet:`Ammet kneels on the wet stone and puts her ear to his chest, and listens, with her hand flat on his back, until the squad has stopped breathing for him. Then she sits back on her heels and does not say anything. From Ammet, that is a great deal.`, _:'Thegg breathes, and breathes, and coughs up most of the Quillas Canal, and breathes.'})}${b51If('tobet', `\n\nTobet stands at the top of the steps. On the far side the few people on the tiers are laughing about it, a Tarthenal, a Stroke, long odds, and he laughed at those jokes for two years. He does not laugh now. He looks at you, and then at Thegg, and then at nothing.`)}${b51If('thegg', `\n\nThegg looks down at the sack. "They will want this back," he says. "I think I will keep it." Nobody from the court comes to ask.`)}

The court's clerk comes round by the bridge with his book and writes *Struck*, and the fee for the rope.`,
      ch:[{t:'Up onto the Low Walk.', onward:true, go:()=>startExplore('b5_c1_canal')},
          {t:'Sit a while on the steps.', go:()=>startExplore('b5_c1_canal')}]}),
    /* the bookmaker's men */
    b5_c1_walk_start:()=>({sp:'The Low Walk', scene:'b5_c1_lowwalk', txt:
`A bookmaker in a good coat is waiting on the Low Walk with his chalk board under his arm and three men behind him, and he has not had a good morning.

"The big one," he says. "I had him for a Drowning. Long odds against a Rising, longer against a Stroke. Half the Low Walk laid against him, on my board, because nobody swims three hundred." He looks at Thegg, dripping. "And now I am out a great deal of money, and somebody is going to give it back to me. I don't greatly mind who."`,
      ch:[{t:'"Shields." Hold the Walk.', go:()=>startBattle('b5_c1_lowwalk', {})},
          {t:'Talk to him. ("Your board, your odds. Take it up with the Errant.")', check:['guile', 14],
            edges:id=>[id === 'sgt' && ['you grew up two streets back; you know the Low Walk\'s bookmakers', 2], id === 'tobet' && ['he has watched these boards for two years', 1], id === 'pessa' && ['canal cant', 1], id === 'thegg' && ['he is the reason the man lost', -2]],
            near:{t:()=>`Yes, but the bookmaker writes ${b51Nm(b51Who()) === 'you' ? 'your' : b51Nm(b51Who()) + '\'s'} name on the back of his board while he listens, slowly, in chalk, where ${b51Nm(b51Who()) === 'you' ? 'you' : b5He(b51Who())} can see it: rattled.`, fx:()=>b51Rattle(b51Who())},
            go:'b5_c1_walk_talked', fail:'b5_c1_walk_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_walk_talked:()=>({sp:'The Low Walk', scene:'b5_c1_lowwalk', txt:
`${by({sgt:'You talk', _:'{who} talks'})}: the board, the odds he chalked himself, the Errant who is the god of exactly this. The bookmaker listens with the face of a man adding up what it would cost him to agree. Then one of his men, who had money on the Drowning himself, swings without being told.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b5_c1_lowwalk', {surprise:'p'})}]}),
    b5_c1_walk_seen:()=>({sp:'The Low Walk', scene:'b5_c1_lowwalk', txt:
`The bookmaker hears you out, and nods, and says, "Yes," and his men are already moving.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b5_c1_lowwalk', {surprise:'e'})}]}),
    b5_c1_walk_after:()=>({sp:'The Low Walk', scene:'b5_c1_lowwalk', fx:()=>{ S.f.b5_c1_walkDone = 1; S.silver = (S.silver || 0) + 10; updSilver(); note('+10 docks: a Stroke, at long odds, paid.', 'good'); }, txt:
`The bookmaker's men are sitting on the edge of the Low Walk with their feet over the water, and the bookmaker is sitting on his board.

It turns out, when the squad looks at the back of his board, that somebody in the Sixth Company laid a single dock on a Stroke last night, at twelve to one, and the board says so in the bookmaker's own chalk. ${b51Say({tobet:`Tobet looks at the line for a while. "I don't know who," he says, and does not look at anyone.`, _:'Nobody in the squad will say who.'})} The bookmaker pays ten of it, which is all he has on him, to be rid of the squad, and writes that he has.

The rope-man, at his post, has watched the whole thing. He does not seem surprised by any of it.`,
      ch:[{t:'On along the Walk.', go:()=>startExplore()}]}),

    /* ---- the morning: the Special Drownings from the tiers (headline only), the Trate news, the road ---- */
    b5_c1_tiers:()=>({sp:'The tiers', scene:'b5_c1_lowwalk', fx:()=>{ S.f.b5_c1_tiers = 1; }, txt:
`The Special Drownings, from the tiers, with the whole Sixth Company standing together in its cloaks for the battalion's honour.

There is not much to see from that high up. A rope going out over the water and going taut. The crowd's noise rising and changing and falling. The bookmakers on the street behind wiping their boards and chalking them again.

${b51Say({tobet:`Tobet laughs at the jokes the men round him make, at the right places, the way he has always laughed at them. He does not mean it. You can tell, now, when you could not before.`, _:'The company stands it, for the battalion\'s honour, and does not watch the rope.'})}${S.f.b5_wager && S.f.b5_wager.line ? `\n\nOn the street behind, the bookmaker from the barracks has his board up. ${S.f.b5_wager.line}` : ''}

By noon the boards are wiped, and the crowd is going home, and the canal looks exactly the same as it did this morning.`,
      ch:[{t:'Find the Finadd.', onward:true, go:'b5_c1_trate'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_trate:()=>({sp:B5_FINADD.name, scene:'b5_c1_lowwalk', fx:()=>{ S.f.b5_trate = 1; }, again:()=>`Ennic, with the orders. "North, Sergeant."`, txt:
`Ennic finds you first. He is at the top of the tiers with a runner beside him, an army runner in road dust, and an order in his hand that he has read twice and is reading again.

"From the north," he says. "From Trate. A wave came out of the sea, two evenings ago, and into the harbour, and wrecked it. Every quay, every ship at anchor." He reads on. "And ships rode in on it. Ships that went out after the Edur seals in the spring. With nobody alive aboard." He looks up. "The runner says the crews were at their oars, and dead. The runner did not see it himself."

He folds the order. "The Sixth is lent to the Trate Legion, to clear the harbour. We march north tomorrow. The battalion's commander says the audit can finish without us." He considers this. "The pursers will be delighted."${b51If('perrit', `\n\nPerrit has gone very pale. "Ships," she says. "Crewed." She does not ask how. She looks at the pouch on her hip, where the tiles are.`)}`,
      ch:[{t:'"North, Finadd."', onward:true, go:'b5_c1_road'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c1_road:()=>({sp:'The road north', scene:'b5_march', txt:
`The next morning the Sixth Company goes out of Letheras by the north road, with its paybooks and without its sick, who stay with the auditors, and a new order in Ennic's neat hand.

Behind the company the city is going back to work: the festival lanterns coming down, the boards wiped, the canal the colour it always is. ${b5DrowningThreat() ? `At the gate, a court's runner is going down the column with a list, looking at the cloaks. ${(() => { const id = b5Debtors().find(x => b5Standing(x) === 'drowning'); return id === 'sgt' || !id ? 'Your name is on it.' : `${NAME(id)}'s name is on it.`; })()} The column does not stop for him, and he does not run after it. The road north is the way out of that list, for now.\n\n` : ''}${b51Key() === 'swim' ? `${b51Say({thegg:`Thegg walks at the front of the squad with the empty weight-sack tied to his shield's strap, still damp.`, _:'The squad takes its place in the column.'})}` : `${b51Say({thegg:`Thegg walks at the front of the squad with the receipt in his shirt, under the beads.`, _:'The squad takes its place in the column.'})}`}${b51If('tobet', `\n\nTobet walks half a step behind you, as always, cutting a notch in the tally-stick as he goes.`)}${b51If('perrit', `\n\nPerrit walks on the side of the road away from the river.`)}${b51If('ammet', `\n\nAmmet walks at the back, where the stragglers will be, with her roll of tools clinking.`)}

You touch the white fingertip on your shield's boss, for the Errant, and walk.`,
      ch:[{t:'North.', onward:true, go:()=>chapterEnd(1, b51Key() || 'pay')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
