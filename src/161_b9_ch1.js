/* ============ Book Nine, Chapter 1: Letheras, Emptied ============ */
/* The Third, with the Bonehunters' heavies in Letheras, months after the city fell: the night the barracks emptied (the night of the Reading,
   dod-canon correction 8: seen from the street, never its room, its inn, the Errant or Brys; rule 92) and the days after, when the heavies
   muster for the march east. Phase 1 (S.f.b9_c1_ph), the barracks yard at dusk and into the night: the yard emptying and nobody saying why;
   Thallo, the drill sergeant's corporal (the brief's recurring invention); a clerk's list that folds Brask into the Third (b9Join('brask'),
   the first halt); the 9th's empty bunk-house and a mess-tin; the reading at a kit-crate (B9READ[1]); a woman at the gate. The key at the
   gate, S.f.b9_c1_key: 'stores' (sit the night watch on the heavies' stores in the emptied barracks: the dead dray-horse in the barracks'
   stable yard gets up, and thieves come for the stores, b9_c1_stores; at dawn the stores are counted twice, b9Ration(2)) or 'street' (go
   out into the quarter behind the barracks with the woman and help her household: the boy who ran, their dead horse that stood up; Haddat
   and Marrow +1, S.f.b9_c1_street = 1). On both roads, a roof goes in far off. Phase 3, the days after, by day: the heavies' muster in the
   yard (the quartermaster's scale; the drill sergeant's roll at the gate, the trick, The Roll at the Gate; the captain seen; one line of the
   other squad), and the emptied quarter by day (looters, b9_c1_looters, main, stage 2, the book's first fight; a soldiers' tavern and its
   Letherii veterans, b9_c1_brawl, optional; the household again on 'street'). Phase 4, the eve of the march: out of the gate with the heavies.
   Notes for later chapters: docs/dod-ch1-notes.md. */
/* FOR THE ARTIST (161b): names this file uses.
   Items: ART['item/b9_c1_heavyscale'], ['item/b9_c1_messtin'], ['item/b9_c1_gutterknife'].
   Figures: brask (160's simple sprite, replaced in 161b), b9_c1_thallo (the corporal; placeholder here with ??=). Reused: b2soldier (the
   clerk, the old marine, the quartermaster, the drill sergeant, the captain), b5_c5_refugee (the woman, the old carter), urchin (the boy),
   b5_letherii (the looters, the deserters, the veterans).
   Backdrops: b9_letheras_night and b9_barracks (160's, yours), and four this file adds that borrow until you draw them: b9_c1_street (the
   emptied quarter at night), b9_c1_stable (a stable yard at night, a dead dray-horse), b9_c1_lanes (the emptied quarter by day, doors
   broken in), b9_c1_tavern (a soldiers' taproom by the barracks).
   Ground (TILEX): b9_c1_barracks (b5_c1_barracks with 'S' the stores door, 'h' the stable gate, 'w' a wagon, 'k' kit-crates), b9_c1_quarter
   (the lanes: '#' house fronts, 'D' the household's door, 'Y' a stable-yard gate, 'T' the tavern, 'L' a looted door, 'g' an alley mouth,
   'c' a handcart, ',' the gutter), b9_c1_taproom (the brawl). Battle 't' is low cover. */

/* ---- small helpers (b91: Book Nine, Chapter One) ---- */
const b91L = (id, n) => { if (b9In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b91Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b9In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b91If = (id, s) => b9In(id) ? (typeof s === 'function' ? s() : s) : '';
const b91Who = () => (ROLL() && ROLL().who) || 'sgt';
const b91Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b91Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b91V = (id, you, they) => id === 'sgt' ? you : they;
const b91And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b91Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the yard at dusk and into the night, 2 the night after the key (stores: the yard; street: the quarter), 3 the days after,
   4 the eve of the march (the looters dealt with) */
const b91Ph = () => S.f.b9_c1_ph || 1;
const b91Key = () => S.f.b9_c1_key || null;
const b91Street = () => S.f.b9_c1_key === 'street';
const b91Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b9In(id));
const b91BraskSettled = () => S.f.b9_braskDone != null;
const b91WomanDue = () => !!S.f.b9_c1_orders1 && b91BraskSettled();
const b91NightDone = () => b91Street() ? !!S.f.b9_c1_dawn : !!S.f.b9_c1_storesDone;
const b91Sh = n => `${numw(n, true)} sharper${n === 1 ? '' : 's'}`;

/* ---- The Roll at the Gate: the heavies' muster call, every name answered, the file closing up on each answer. It copies the Line (Book
   One's line, t_line): B.line, so 31's armour and flanking rules do the rest. Not sorcery. v10.3: it strikes nobody, so it is free. ---- */
Object.assign(TRICKS, {
  b9_c1_rollcall:{name:'The Roll at the Gate', ch:1, use:'fight', ab:'t_b9_c1_rollcall', where:'the barracks gate in Letheras, the morning the heavies mustered for the march east',
    lore:'The heavies\' drill sergeant calls the roll at the gate before every march: every name in the company, in file order, and every soldier answers and steps up into the gap the last one left, so that by the end of the roll the file has closed itself without an order given. The Third stood a muster like it at the Aren gate the year the Fourteenth was raised. The heavies do it faster, and louder, and never miss a name.',
    get fx(){ return `Once a fight: the bearer calls the roll, and the bearer and every squadmate beside them answer and close up. They take +${3 + lvT()} armour and cannot be flanked until the bearer's next turn. Grows with level. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b9_c1_rollcall:{name:TRICKS.b9_c1_rollcall.name, trick:'b9_c1_rollcall', self:true, free:true, desc:()=>TRICKS.b9_c1_rollcall.fx,
    run(u){ B.line = {u, turn:B.turn}; AUDIO.play('sword'); shakeMap();
      const in_ = party().filter(p => lineCovers(p)); in_.forEach(p => { float(p, 'here', '#d8c8a0'); sparks(p.x, p.y, 8, '#d8c8a0', .4); });
      blog(`${u.name} calls the roll. ${in_.length > 1 ? `${in_.filter(p => p !== u).map(p => p.name).join(' and ')} answer${in_.length > 2 ? '' : 's'} and step${in_.length > 2 ? '' : 's'} up into the gap, the way the heavies do at the gate.` : 'Nobody close enough to answer. One name will have to hold the file.'}`); }},
});

/* ---- borrowed pictures until the artist's file (161b) replaces them: four scenes, the corporal, the three items ---- */
{ const like = {b9_c1_street:'b9_letheras_night', b9_c1_stable:'b9_letheras_night', b9_c1_lanes:'b9_barracks', b9_c1_tavern:'b9_barracks'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof FIGX !== 'undefined') FIGX.b9_c1_thallo ??= (ctx, h, t, o) => (FIGX.b2soldier || (() => {}))(ctx, h, t, o);
if (typeof ART !== 'undefined') [['b9_c1_heavyscale', 'b7_c1_charredcloak'], ['b9_c1_messtin', 'b7_c1_tallyash'], ['b9_c1_gutterknife', 'b7_c1_factorblade']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Nine's glossary ---- */
GLOSSX.dod.push(
  [1, 'The drill sergeant\'s roll', 'How the heavies leave a city: every name in the company called at the gate, in file order, and every soldier answering and stepping up. No soldier marches who has not answered.', ()=>!!(S && S.f && S.f.b9_c1_ph >= 3)],
  [1, 'The emptied quarter', 'The lanes behind the Malazan barracks in Letheras. Half the households left after the night of the cards and have not come back. Some of what they left has been taken since.', ()=>!!(S && S.f && S.f.b9_c1_ph >= 2)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.dod = ROSTER_FIRES.dod || {}; ROSTER_FIRES.dod[1] = ['b9_c1_fire'];

const B9CH1 = {
  title:B9CH[1], number:'One',
  intro:{loc:'Letheras', sub:'The Malazan barracks · dusk', scene:'b9_letheras_night', cap:'A barracks yard at dusk with its gate open, kit in heaps, and soldiers going out of it in twos and threes without looking back.',
    paras:[
`Months since the city fell. The army that took it has been told it is leaving, and has not been told why, or not in any words a soldier can carry from one fire to the next. East, the clerks say. The clerks have a word for where. Kolanse. Not one of the heavies can find it on a map, and the heavies have looked.`,
()=>{ const v = b91Mates().map(id => NAME(id)), gone = Object.keys(S.dead || {}).filter(id => TPL[id]);
  return `You are Sergeant {sgt}, Third squad, 9th Legion, and the Third marches with the heavies now, as it has since the landing. ${v.length ? `${b91And(v)} ${v.length > 1 ? 'are' : 'is'} the Third this year.` : 'The Third, this year, is you.'}${gone.length ? ` The rest are names ${b9In('haddat') ? 'Haddat says at night' : 'the squad says at night'}, now.` : ''}`; },
`Tonight the barracks is emptying, and nobody will say why.`],
    go:'Into the yard', node:'b9_c1_start'},

  areas:[
    /* 16 x 12 (b9_c1_barracks, night). . flagstones  # the yard wall  = barrack eaves  b a bunk-house door  S the stores door  t the clerk's
       table  k kit-crates  F the Third's fire  h the stable gate  > the street gate */
    { id:'b9_c1_yard', title:'Letheras · the Malazan barracks', sub:'Night · the yard emptying', hint:'Tap ground to move · tap a figure to talk · the stores are north, the stable east, the gate east', decor:'b9_c1_barracks', dark:true,
      map:[ "################",
            "#==b=====SS====#",
            "#..............#",
            "#.t.......k....#",
            "#...........k..#",
            "#......F.......>",
            "#..............#",
            "#.k............#",
            "#=====b........h",
            "#======........#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b9_c1_fire', t:'b9_c1_clerk', b:'b9_c1_bunk', S:'b9_c1_stores_door', h:'b9_c1_stable', '>':'b9_c1_gate'}, start:{x:8, y:6},
      quest:()=> b91Ph() === 1 ? (!S.f.b9_c1_orders1 ? 'Thallo, by the stores. He has the captain\'s word.' : !b91BraskSettled() ? 'The clerk\'s table. There is a man waiting by it with his kit.' : 'Somebody is at the gate.')
        : !S.f.b9_c1_horse ? 'The stores watch. Something is wrong in the stable yard.' : !S.f.b9_c1_storesDone ? 'Shapes at the stores door.' : 'Dawn. The stores, and the count.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:9, y:2, node:()=>b91Ph() === 1 ? 'b9_c1_thallo' : 'b9_c1_thallo_watch', fresh:()=>b91Ph() === 1 ? !S.f.b9_c1_orders1 : false},
        {id:'clerk', name:'A clerk with a list', kind:'b2soldier', x:3, y:3, node:()=>'b9_c1_clerk', show:()=>b91Ph() === 1, fresh:()=>!S.f.b9_c1_clerk},
        {id:'brask', name:'A heavy with his kit', kind:'brask', x:4, y:4, node:()=>'b9_c1_brask', show:()=>b91Ph() === 1 && !!S.f.b9_c1_clerk && (S.f.b9_braskDone == null || S.f.b9_braskDone === 2), fresh:()=>S.f.b9_braskDone == null},
        {id:'old', name:'An old marine by the cook-lines', kind:'b2soldier', x:12, y:7, node:()=>'b9_c1_oldmarine', fresh:()=>!S.f.b9_c1_old},
        {id:'woman', name:'A woman at the gate', kind:'b5_c5_refugee', x:14, y:5, node:()=>'b9_c1_woman', show:()=>b91Ph() === 1 && b91WomanDue(), fresh:()=>true},
        {id:'thieves', name:'Shapes at the stores door', kind:'b5_letherii', x:10, y:2, node:()=>'b9_c1_thieves', show:()=>b91Ph() === 2 && !b91Street() && !!S.f.b9_c1_horse && !S.f.b9_c1_storesDone, fresh:()=>true} ] },

    /* 16 x 12 (b9_c1_quarter, night). . setts  , the gutter  # shuttered house fronts  D the household's door  Y their stable-yard gate
       g an alley mouth  c a handcart  < back to the barracks gate  > the lane's end, toward the canal */
    { id:'b9_c1_quarter', title:'Letheras · the quarter behind the barracks', sub:'Night · every shutter closed', hint:'Tap ground to move · tap a figure to talk · the household is up the lane, the barracks gate west', decor:'b9_c1_quarter', dark:true,
      map:[ "################",
            "#####D####Y#####",
            "#..............#",
            "#.,,,,,,,,,,,,.#",
            "#.......c......#",
            "<..............>",
            "#..............#",
            "#.,,,,,,,,,,,,.#",
            "#..............#",
            "####g######g####",
            "################",
            "################" ],
      walk:'.,', triggers:{D:'b9_c1_house', Y:'b9_c1_yardgate', g:'b9_c1_alley', '<':'b9_c1_street_back', '>':'b9_c1_lane_end'}, start:{x:1, y:5},
      quest:()=> !S.f.b9_c1_house ? 'The woman\'s door, up the lane.' : !S.f.b9_c1_boy ? 'The boy. He ran into the alleys.' : !S.f.b9_c1_horseOut ? 'Their stable yard, and what is in it.' : 'Sit the night out with them. Dawn, and back to the barracks.',
      npcs:[
        {id:'woman', name:'The woman with the lamp', kind:'b5_c5_refugee', x:5, y:2, node:()=>'b9_c1_house', fresh:()=>!S.f.b9_c1_house},
        {id:'boy', name:'A small shape in the alley', kind:'urchin', x:11, y:8, node:()=>'b9_c1_alley', show:()=>!!S.f.b9_c1_house && !S.f.b9_c1_boy, fresh:()=>true} ] },

    /* 16 x 12 (b9_c1_barracks, day). The same yard, the days after: wagons backed up to the gate, kit in heaps, the heavies counting.
       w a wagon  k kit-crates  S the stores (the quartermaster)  F the fire  > the gate, the quarter and the march */
    { id:'b9_c1_muster', title:'Letheras · the Malazan barracks', sub:'The days after · the heavies muster', hint:'Tap ground to move · tap a figure to talk · the drill sergeant is at the gate', decor:'b9_c1_barracks',
      map:[ "################",
            "#==b=====SS====#",
            "#..............#",
            "#.k....w..w....#",
            "#..............#",
            "#......F.......>",
            "#..............#",
            "#.k.....k......#",
            "#=====b.....w..#",
            "#======........#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b9_c1_fire', b:'b9_c1_bunk', S:'b9_c1_qm', '>':'b9_c1_gate3'}, start:{x:8, y:6},
      quest:()=> !S.f.b9_c1_orders3 ? 'Thallo, by the wagons.' : !S.f.b9_c1_lootersDone ? 'The emptied quarter, through the gate. Looters.' : 'The fire, and then the gate. The heavies march at first light.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:9, y:4, node:()=>'b9_c1_thallo3', fresh:()=>!S.f.b9_c1_orders3},
        {id:'drill', name:'The heavies\' drill sergeant', kind:'b2soldier', x:13, y:5, node:()=>'b9_c1_drill', fresh:()=>!S.f.b9_c1_rollTried},
        {id:'qm', name:'The quartermaster', kind:'b2soldier', x:10, y:2, node:()=>'b9_c1_qm', fresh:()=>!S.f.b9_c1_scale},
        {id:'captain', name:'The captain', kind:'b2soldier', x:4, y:2, node:()=>'b9_c1_captain', fresh:()=>!S.f.b9_c1_captain},
        {id:'old', name:'The old marine', kind:'b2soldier', x:12, y:9, node:()=>'b9_c1_oldmarine', fresh:()=>false} ] },

    /* 16 x 12 (b9_c1_quarter, day). The quarter by day: L a looted house, its door broken in  T the soldiers' tavern  D the household's
       door  Y their yard gate  c a handcart  < back to the barracks */
    { id:'b9_c1_lanes', title:'Letheras · the emptied quarter', sub:'Day · doors standing open', hint:'Tap ground to move · tap a figure to talk · the looted house is east, the tavern north', decor:'b9_c1_quarter',
      map:[ "################",
            "#####D####Y##T##",
            "#..............#",
            "#.,,,,,,,,,,,,.#",
            "#....c.........#",
            "<..............#",
            "#.........c....#",
            "#.,,,,,,,,,,,,.#",
            "#..............#",
            "####L######L####",
            "################",
            "################" ],
      walk:'.,', triggers:{L:'b9_c1_looted', T:'b9_c1_tavern', D:'b9_c1_house_day', Y:'b9_c1_house_day', '<':'b9_c1_lanes_back'}, start:{x:1, y:5},
      quest:()=> !S.f.b9_c1_lootersDone ? 'The looted house, south side of the lane. Thallo says there are more inside.' : 'Back to the barracks. The heavies march at first light.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:3, y:6, node:()=>'b9_c1_thallo_lanes', fresh:()=>false} ] } ],

  battles:{
    /* the looters in the emptied quarter: the book's first fight (near certain), two grounds: the lane, then the house's yard */
    b9_c1_looters:{title:'The emptied quarter', style:'b9_c1_quarter', warrenText:'Day in the emptied quarter · shutters open on empty rooms · the warrens uneasy since the night of the cards', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","........","..t..t..","........","#......#","........","...t....","........","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b9_heavy',1,8]],
      foes:[['b9_c1_looter',2,1],['b9_c1_looter',5,1],['b9_c1_looter',4,2],['b9_deserterbow',3,0]], xp:380, after:'b9_c1_looters_after',
      preText:()=>`They come out of the house with what they were carrying still in their hands, a chair and a sack and somebody's good pot, and then they put it down, which is the first sensible thing they have done.`,
      stage2:{title:'The yard behind', xp:170,
        text:()=>`The lane is the Third's. The yard behind the house is not. There is a man in it with a Letherii officer's sword and a deserter's coat, shouting at the ones who ran to come back, and some of them do, because he is closer than the Third.${b91If('brask', `\n\nBrask goes through the house's back door sideways, because it is the only way the scale fits. "Officer," he says, looking at the sword. "Was."`)}`,
        map:["#......#","..t..t..","........","........","...tt...","........",".t....t.","........","........","#......#"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b9_desertercap',3,1],['b9_c1_looter',5,2]]} },
    /* on 'stores': thieves at the stores door in the emptied barracks, the night of the cards */
    b9_c1_stores:{title:'The stores door', style:'b5_c1_barracks', dark:true, warrenText:'Night in the emptied barracks · the dogs will not settle · the warrens loud and wrong', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","........","..t..t..","........","........","...t....","........",".t....t.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b9_deserter',2,1],['b9_deserter',5,1],['b9_raider',4,2]], xp:100, after:'b9_c1_stores_after',
      preText:()=>`Two of them in Letherii army coats with the badges cut off, and a third in a raider's leathers off some border nobody here has seen, all three of them with the look of men who were told the barracks would be empty tonight and believed it.`},
    /* the soldiers' tavern: an optional brawl with Letherii veterans. Fists and benches, in words */
    b9_c1_brawl:{title:'The soldiers\' tavern', style:'b9_c1_taproom', warrenText:'A taproom by the barracks · spilt beer, a low lamp · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t..t..","........","...tt...","........","........",".t....t.","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b9_c1_veteran',2,0],['b9_c1_veteran',5,0],['b9_c1_veteran',4,2]], xp:90, after:'b9_c1_brawl_after',
      preText:()=>`The bench goes over first, and then the table. No one draws a blade. The tavern-keeper takes the lamp off its hook and holds it up out of the way, which is plainly the house rule.`} },

  foes:{
    /* a looter in the emptied quarter: a city man with a cleaver and a sack, and no army behind him */
    b9_c1_looter:{name:'Looter', sig:'l', kind:'b5_letherii', hp:26, ac:13, atk:11, dmg:[1,6,4], rng:1, mv:4, init:2, verb:'swings a cleaver at'},
    /* a Letherii veteran in the soldiers' tavern: an old soldier of a beaten army, with fists, and the bench he was sitting on */
    b9_c1_veteran:{name:'Letherii veteran', sig:'v', kind:'b5_letherii', hp:30, ac:13, atk:10, dmg:[1,4,3], rng:1, mv:4, init:1, verb:'swings a fist at'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b9_c1_heavyscale:{name:'A heavy\'s scale', slot:'armour', role:'mail', who:null, ac:3, hp:4,
      line:'A long shirt of Malazan heavy scale, doubled at the shoulders where the blows come down, the leather under it dark with other men\'s years. The quartermaster signed it out of the stores with a face that said the stores were going a long way and would not be coming back. It weighs what it weighs. Brask says the weight is the point.'},
    b9_c1_messtin:{name:'A mess-tin of the 9th', slot:'trinket', role:'any', who:null, hp:2,
      line:'A dented mess-tin with a lid that has been beaten back into shape more than once, the 9th\'s number stamped into the bottom. Left on a shelf in the 9th\'s empty bunk-house the night the barracks cleared out. Whoever eats out of it eats a little more than they would, out of a soldier\'s superstition about leaving a tin half full.'},
    b9_c1_gutterknife:{name:'A gutter-knife', slot:'weapon', role:'blade', who:null, atk:2, dmg:[1,6,3],
      line:'A short broad Letherii knife with a cord-wrapped grip, the kind the canal boys carry and the watch confiscates. A looter dropped it in the emptied quarter when the Third came round the corner. It is cheap iron, honed thin. It goes where a sword will not, which in the Wastes may be most places.'} },

  scenes:{
    b9_c1_street:{loc:'Letheras', sub:'The quarter behind the barracks · night', cap:'A lane of shuttered houses with not one lamp in a window, a stable-yard gate, and one woman\'s lamp at a door.', amb:'explore'},
    b9_c1_stable:{loc:'Letheras', sub:'A stable yard · night', cap:'Stalls under a lean-to, a cart with its shafts down, straw, and something big and dark in the straw that was a horse this morning.', amb:'explore'},
    b9_c1_lanes:{loc:'Letheras', sub:'The emptied quarter · day', cap:'Shutters standing open on empty rooms, a door broken in, a handcart with one wheel, and the dust of a city that has gone quiet.', amb:'explore'},
    b9_c1_tavern:{loc:'Letheras', sub:'A soldiers\' tavern by the barracks', cap:'A low taproom with a lamp on a hook, a counter, and at the back a table of old Letherii soldiers who have not been asked to leave.', amb:'explore'} },

  end:{
    stores:['The stores counted twice', 'The night the barracks emptied, nobody would say why. The Third stayed in and sat on the heavies\' stores while the rest of the army hid in the taverns, and saw a dead horse stand up in the stable yard and lie down again, and heard a roof go in somewhere far across the city. Thieves came for the stores before dawn and did not leave with them. In the morning the quartermaster counted everything twice and found it all there. In the days after the heavies mustered, and cleared the looters out of the emptied quarter, and marched east.'],
    street:['A household in the quarter', 'The night the barracks emptied, nobody would say why. The Third went out into the shuttered quarter behind the barracks with a woman and her lamp, found her boy in an alley, and saw the household\'s dead horse stand up in its yard and lie down again, while a roof went in somewhere far across the city. Thallo sat on the stores alone, and counted them once. In the days after the heavies mustered, and cleared the looters out of the emptied quarter, and marched east.'] },
  endScene:'b9_barracks',
  endCap:()=> b91Street() ? 'The barracks gate at first light, the wagons rolling out, and in a lane behind it a door with a lamp-hook and nobody at it now.' : 'The barracks gate at first light, the wagons rolling out with every crate on them counted twice.',
  tease:'Next: the Letherii. The escort\'s muster ground outside the city, a Malazan sergeant of the heavies with opinions about Letherii feet, and a supply train to load.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b9_c1_key === 'stores') x.push(`The Third sat the night of the cards on the heavies' stores.${f.b9_c1_counted ? ' At dawn they were counted twice, and were all there.' : ''}`);
    if (f.b9_c1_key === 'street') x.push(`The Third went out into the quarter the night of the cards and helped a household.${f.b9_c1_boy === 'found' ? ' The boy who ran was found in an alley.' : ''}`);
    if (f.b9_braskDone === 1) x.push(b9In('brask') ? 'Brask, a heavy of the 9th whose squad was broken up in Letheras, walks with the Third, and has learned where to sit at the fire.' : 'Brask, a heavy of the 9th, walks with the Third.');
    if (f.b9_braskDone === 2) x.push('Brask, a heavy of the 9th, waits in the heavies\' lines, if the squad will have him.');
    if (f.b9_c1_rollOk) x.push('The heavies\' drill sergeant taught the Third the roll at the gate.');
    if (f.b9_c1_lootersDone) x.push('Looters in the emptied quarter met the Third, and the quarter is quieter.');
    if (f.b9_c1_brawlDone) x.push('Some Letherii veterans in a soldiers\' tavern met the Third, and bought it a drink after.');
    if (f.b9_c1_tin) x.push('A mess-tin of the 9th was left on a shelf in an empty bunk-house. It went east.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b9_c1_lootersDone && 'Looters in the emptied quarter behind the barracks, and a deserter officer with a better sword than he deserved.',
    f.b9_c1_rollOk && 'The drill sergeant calls the roll at the gate before every march. Every name. Every one answers.',
    f.b9_c1_brawlDone && 'A soldiers\' tavern by the barracks, and the old Letherii soldiers in it. They say nobody comes back from the Wastes with a map.',
    f.b9_c1_roof && 'A roof went in somewhere far across the city, the night the barracks emptied. Dust stood over it in the moonlight.',
    f.b9_c1_horse && 'A dead horse stood up in a stable yard the night the barracks emptied, and then lay down again. Nothing more.',
    f.b9_c1_key && (f.b9_c1_key === 'stores' ? 'The Third sat on the heavies\' stores the night the barracks emptied.' : 'The Third went out into the quarter the night the barracks emptied, with a woman and her lamp.'),
    f.b9_braskDone != null && 'A clerk\'s list folded a heavy of the 9th named Brask into the Third. His old squad was broken up in Letheras.',
    f.b9_c1_why && 'Everybody left the barracks the night of the cards because the marines did. The marines would not say why.',
    'The Third, with the heavies, in Letheras, before the march east.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the yard at dusk and into the night ======== */
    b9_c1_start:()=>({sp:'The barracks yard', scene:'b9_letheras_night', fx:()=>{ S.f.b9_c1_ph = S.f.b9_c1_ph || 1; }, again:()=>'The barracks yard, the gate open, and the last of the army going out of it.', txt:
`The yard is emptying. Not by order. None has been given that anybody heard. It started with the marines, who went out of the gate in their squads at dusk with their kit on their backs and the look of people who have been somewhere like this before, and then the regulars went after the marines, because the marines had gone, and then the heavies went after the regulars, slowly, as heavies do everything.

Now there are lamps going out in the bunk-house windows one by one, and kit in heaps where it was dropped, and a dog under a wagon that will not come out.

${b91Say({haddat:`Haddat stands in the middle of the yard with the blue shield on her arm and watches the gate. "They are not running," she says. "They are leaving early." She thinks about it. "My mother said that is how you tell."`, tangle:`Tangle watches the last of the regulars go. "Not a word," he says. "I asked. Not a word."`, _:'The squad stands in the yard and watches the army go out of the gate without it.'})}${b91If('marrow', `\n\nMarrow has sat down on a kit-crate and is not getting up. "Something is coming, child," she says. "Something loud. The old ones always know first. Let them go."`)}

Up by the stores, a big corporal of the heavies is standing with a heel of bread in one fist and a ring of keys in the other, looking at the Third like the last item on a list.`,
      ch:[{t:'The corporal by the stores.', go:'b9_c1_thallo'},
          b9ReadChoice(1),
          {t:'Walk the yard.', go:()=>startExplore()}]}),
    b9_c1_read:()=>b9ReadOffer(1),
    b9_c1_card:()=>b9ReadCard(1),

    /* Thallo, the drill sergeant's corporal: the captain's word on the stores */
    b9_c1_thallo:()=>({sp:'Thallo', scene:'b9_letheras_night', fx:()=>{ S.f.b9_c1_orders1 = 1; }, again:()=>'Thallo, by the stores, with the keys and the last of the bread. "One squad sits on it tonight, Sergeant."', txt:
`He is a corporal of the heavies, as big as a door and about as talkative, with a broken nose and a heel of bread he is eating as if somebody might take it off him. He swallows before he speaks, which is manners.

"Thallo," he says. "Drill sergeant's man. You're the Third. You stayed." He looks round the yard. "Captain's word. Somebody sits on the heavies' stores tonight, with the barracks empty. He didn't say who. He's gone to wherever the officers go." He holds up the ring of keys. "I'm saying you, if you'll have it. You and me."

He finishes the bread. "There's a clerk at the table by the wall with a list, too. Got a man for you, he says. Don't know what for."${b91If('tangle', `\n\nTangle looks at the stores door, which is iron-bound and chained. "What's in it?" he asks. Thallo tells him. Tangle looks happier than he has all day.`)}`,
      ch:[{t:'"Why is everybody leaving, Corporal?"', go:'b9_c1_thallo_why'},
          {t:'"The clerk first."', go:'b9_c1_clerk'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_thallo_why:()=>({sp:'Thallo', scene:'b9_letheras_night', fx:()=>{ S.f.b9_c1_why = 1; }, txt:
`"The marines went," he says. "That's why." He thinks about whether that is enough, and decides it isn't. "Word came round the marines' lines at noon. Out of the barracks tonight, all of you, till dawn. Didn't come from the captain. Didn't come from anybody with a rank. It came from the old hands, the ones who were at Y'Ghatan, and they went first."

"So the regulars went, and then us lot." He shrugs. "I asked one of the old hands what's happening. He said something's being dealt. Then he said he hadn't said that."`,
      ch:[{t:'Press him. He was told more than that.', check:['wits', 17], req:()=>!S.f.b9_c1_whyTried,
            edges:id=>[id === 'sgt' && ['you know a corporal who is holding something back', 1], id === 'brask' && ['heavy to heavy: he drank with Thallo\'s squad', 2], id === 'haddat' && ['she asks politely, and he is not used to it', 1], id === 'mehet' && ['a townsman knows when a man has heard a rumour', 1], id === 'sathi' && ['her teeth put him off his bread', -1], id === 'ottar' && ['the Malazan for this is beyond him', -1]],
            near:{t:()=>`Yes, but he wants to know what ${b91Nm(b91Who())} ${b91V(b91Who(), 'think', 'thinks')} it is, too, and the two of them go round it until the yard is dark, and ${b91Nm(b91Who())} ${b91V(b91Who(), 'carry', 'carries')} the not-knowing to the fire: rattled.`, fx:()=>b91Rattle(b91Who())},
            fx:()=>{ S.f.b9_c1_whyTried = 1; }, go:'b9_c1_thallo_more', fail:'b9_c1_thallo_nomore'},
          {t:'"Then we sit on it."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_thallo_more:()=>({sp:'Thallo', scene:'b9_letheras_night', fx:()=>{ S.f.b9_c1_whyMore = 1; }, txt:
`He looks at the gate, and then at the dark bunk-house windows, and lowers his voice, though there is nobody left to hear.

"The old hand said: when that lot go quiet and leave, you leave too, and you don't ask which lot. He said the last time they cleared out like this was a town on the Seven Cities coast, and the town was still there in the morning. Mostly." He rubs his broken nose. "I'm staying. The stores want sitting on, and I've never liked a tavern I didn't choose."`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c1_thallo_nomore:()=>({sp:'Thallo', scene:'b9_letheras_night', txt:
`"That's all he said." He looks at the empty heel of bread in his hand, as if it had let him down. "I'm a corporal, Sergeant. Nobody tells a corporal anything. They tell the drill sergeant, and he tells me to carry it."`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    /* Thallo in the night, on 'stores' */
    b9_c1_thallo_watch:()=>({sp:'Thallo', scene:'b9_letheras_night', txt: S.f.b9_c1_storesDone ?
`Thallo is sitting on an upturned bucket by the stores door with his back to the iron and his eyes shut. "They'll not come again," he says, without opening them. "Count's at dawn. Then bread."` :
`Thallo is walking the length of the stores wall and back, slowly, with the keys in his fist so they won't jingle. "Quiet," he says, when you come up. "Too quiet for a city this size." He listens. "Dogs have stopped. I don't like it when the dogs stop."`,
      ch:[{t:'Back to the watch.', go:()=>startExplore()}]}),

    /* the clerk's list: Brask (the first halt) */
    b9_c1_clerk:()=>({sp:'A clerk with a list', scene:'b9_letheras_night', fx:()=>{ S.f.b9_c1_clerk = 1; }, again:()=> S.f.b9_braskDone != null ? 'The clerk\'s table, bare now. The clerk has gone where the rest went.' : 'The clerk, with his list, waiting to be allowed to leave.', txt: S.f.b9_braskDone != null ?
`The clerk's table is bare, and the clerk has gone out of the gate with his list under his arm and the air of a man who did his duty and is now going to a tavern.` :
`The clerk is one of the Adjunct's, by his collar: a thin young man at a trestle by the wall with a lamp and a list and his satchel already packed. He has stayed only because the list is not finished. He looks up at you with relief.

"Third squad, 9th Legion," he reads. "Good. One heavy, transferred in. His squad was broken up." He turns the list round so you can see the line. "Brask. Two of his on the river, one in the Letherii healers' house, and his sergeant took the new emperor's coin and a post at a gate." He blots it. "That leaves him. The list says you."

Behind the clerk, a big man in heavy scale is standing with his kit on his back and a sword over his shoulder, waiting to find out which end of the yard is his.`,
      ch: S.f.b9_braskDone != null ? [{t:'Back to the yard.', go:()=>startExplore()}] :
        [{t:'The heavy with the kit.', go:'b9_c1_brask'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_brask:()=>{ const d = S.f.b9_braskDone;
      if (d === 2) return {sp:'Brask', scene:'b9_letheras_night', txt:
`Brask is sitting on his kit by the heavies' end of the yard, sharpening the big sword because it is there. He looks up when you come over, and waits.`,
        ch:[{t:'"Walk with us, Brask."', fx:()=>{ b9Join('brask'); }, go:'b9_c1_brask_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'A heavy with his kit', scene:'b9_letheras_night', again:()=>'Brask, with his kit on his back, waiting to be told which end is his.', txt:
`He is a little older than you would guess and bigger than the scale was made for, with a helm whose cheek-guards somebody has bent back so he can hear, and a heavy infantry sword slung over one shoulder like a carter's pole. His scale is doubled at the shoulders. Somewhere in the last year it has been mended by somebody who was not an armourer.

"Brask," he says. "Gris. Twelve years, six in the heavies." He looks the Third over, all of it, slowly, as heavies look at a wall before they lean on it. "My squad got dealt out like cards. I was the one nobody wanted. You lot will do." He considers that. "That came out wrong. You'll do fine."`,
        ch:[{t:'"Walk with us, Brask."', fx:()=>{ b9Join('brask'); }, go:'b9_c1_brask_join'},
            {t:'"What happened to your squad?"', req:()=>!S.f.b9_c1_braskSquad, go:'b9_c1_brask_squad'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c1_brask_squad:()=>({sp:'Brask', scene:'b9_letheras_night', fx:()=>{ S.f.b9_c1_braskSquad = 1; }, txt:
`He takes a tally-stick out of his belt, a heavies' squad stick, the sort a sergeant keeps the squad's names on in notches. Four of the notches have been filed flat.

"The river," he says, touching two. "The day we came over. One in the healers' house, still. Says she's coming back. Won't." He touches the last flat one. "Sergeant took the coin. Gate-captain, now, on the landward side. Good post. I'd have taken it too, maybe, if he'd asked me." He puts the stick away. "He didn't ask me."${b91If('haddat', `\n\nHaddat is looking at the stick. "Will you tell me their names?" she asks. "I say the names of the dead at night. I can say yours too." He looks at her for a while, and then he tells her.`)}`,
      ch:[{t:'"Walk with us, Brask."', fx:()=>{ b9Join('brask'); }, go:'b9_c1_brask_join'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_brask_join:()=>({sp:'Brask', scene:'b9_letheras_night', txt:
`${b9In('brask') ? `He nods once, as if a matter of drill had been settled, and walks over to the Third's end of the yard and puts his kit down there, and sits on it.

"Which end of the line's mine?" he asks. He is told. "Good," he says. "I like the end. You can see what's coming."${b91If('tangle', ` Tangle looks at the scale, and the sword, and the size of him, and moves the satchel to his other side, so Brask is between it and the gate.`)}` : `He nods, and goes to wait in the heavies' lines: six already walk with the Third, and a heavy can count. "When there's room," he says. "I'll be where I'm put."`}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the 9th's empty bunk-house: the mess-tin */
    b9_c1_bunk:()=>({sp:'The bunk-house', scene:b91Ph() >= 3 ? 'b9_barracks' : 'b9_letheras_night', fx:()=>{ if (!S.f.b9_c1_tin) { S.f.b9_c1_tin = 1; gain('b9_c1_messtin'); } }, again:()=>'The 9th\'s bunk-house, with its bunks stripped and its door open.', txt:
`The 9th's heavies slept here. The bunks are stripped down to the boards, and the straw ticks are gone, and the lamp-hooks are empty. Somebody left in a hurry and somebody else left in a bigger one.

On the shelf over the door there is one mess-tin, dented, with a lid that has been beaten back into shape more than once and the 9th's number stamped into the bottom. No one comes back for a mess-tin. It goes in the kit.${b91If('brask', `\n\nBrask looks at the shelf for a while. "Ours was the bunk by the window," he says. "Doesn't matter now." He does not say whose tin it was. He watches it go into the kit, and seems to think that is right.`)}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* an old marine by the cook-lines: the Deck's third reader, staying in */
    b9_c1_oldmarine:()=>({sp:'An old marine', scene:b91Ph() >= 3 ? 'b9_barracks' : 'b9_letheras_night', fx:()=>{ S.f.b9_c1_old = 1; }, again:()=>'The old marine by the cook-lines, with his cup and his cards.', txt: b91Ph() >= 3 ?
`The old marine is sitting on his crate in the sun with his cup, watching the wagons load. "East," he says. "Long way east. Further than I've walked." He drinks. "I'm going anyway. I've never once stayed behind when the army went, and I'm too old to learn."` :
`An old marine sits on a crate by the heavies' cook-lines with a cup in his hand and a soldier's deck in his lap, the only marine left in the barracks. He has been in the army so long it has forgotten to retire him.

"Stayed in," he says. "Smart. They'll all be in the taverns, hiding from it." He does not say from what. He shuffles the deck one-handed. "I'm too old to hide in a tavern. Too old to sit through what's going on tonight in some others, too." He drinks. "Sit down if you like. The cards are company."`,
      ch:[b9ReadChoice(1),
          {t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the stable yard: the heavies' baggage horse, dead since the morning. On 'stores' in the night it gets up */
    b9_c1_stable:()=>{ const ph = b91Ph();
      if (ph === 1 || b91Street()) return {sp:'The stable yard', scene:'b9_c1_stable', again:()=>'The stable yard, the mules uneasy, the sheet in the straw.', txt:
`The barracks' stable yard: the heavies' baggage mules in their stalls, and a dray-horse of the train lying in the straw under a sheet, dead since the morning of a colic. The knackers were sent for at noon. The knackers have not come. No one is coming anywhere tonight.

The mules do not like it. They stand at the back of their stalls with their ears flat, looking at the sheet.`,
        ch:[{t:'Back to the yard.', go:()=>startExplore()}]};
      if (!S.f.b9_c1_horse) return {sp:'The stable yard', scene:'b9_c1_stable', fx:()=>{ S.f.b9_c1_horse = 1; S.f.b9_c1_roof = 1; }, txt:
`The mules are screaming. All of them, at once, kicking at the backs of their stalls.

In the straw, under its sheet, the dead dray-horse lifts its head. Then it gets its legs under it, slowly, the way a tired horse does at dawn, and stands, and the sheet slides off it into the straw, and it stands there in the dark with its head up, looking at nothing.

Then nothing more. It stands. It does not move again.

${b91Say({marrow:`Marrow has come up behind you and has her hand flat on the stable wall. "It is not the horse, child," she says, very quietly. "Something is passing through. The horse is in the way of it." Her hand is shaking. "Leave it. It will lie down when it is done."`, haddat:`Haddat is saying a word under her breath, the one she says for the dead she has no name for, over and over.`, _:'The squad stands in the stable gate and watches it, and the horse does not look back.'})}${b91If('brask', `\n\nBrask has the heavy sword off his shoulder and in both hands. He does not seem to know what he means to do with it. "Twelve years," he says. "Never seen that." He does not put the sword back.`)}

Far off across the roofs to the south there is a long sound like a held breath let go, and a roof goes in somewhere a long way across the city. A little after, dust stands up over the roofs in the moonlight, pale and slow. Then the dogs start, everywhere in Letheras at once.`,
        ch:[{t:'Back to the stores. Quickly.', go:()=>startExplore()}]};
      return {sp:'The stable yard', scene:'b9_c1_stable', again:()=>'The stable yard, and the horse lying in the straw again.', txt:
`The dray-horse is lying down in the straw again, as it was. The sheet is still where it slid off. The mules have stopped screaming and are only trembling now, which is better.

No one goes in to put the sheet back.`,
        ch:[{t:'Back to the yard.', go:()=>startExplore()}]}; },
    /* the stores door: shut by day one, the watch on 'stores' */
    b9_c1_stores_door:()=>({sp:'The stores', scene:'b9_letheras_night', txt: b91Ph() === 1 ?
`The heavies' stores: a long low building at the head of the yard with an iron-bound door, chained, and Thallo's keys on the chain. Salt pork, biscuit, oil, lamp-wicks, spare scale, the munitions crates the column will carry east. The quartermaster has gone to the taverns with the rest. The door is the most watched thing in the barracks, because there is nothing left to watch but the door.` : S.f.b9_c1_storesDone ?
`The stores door is shut again, and chained, and the chain is new where the old one was cut. Thallo has sat himself down beside it on a bucket.` :
`The stores door, chained. Thallo is walking the wall. The squad has its lamp out, as ordered, and its eyes open, which nobody ordered, because nobody had to.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the gate: on the street, and the woman with the lamp */
    b9_c1_gate:()=>{ const ph = b91Ph();
      if (ph === 1 && b91WomanDue()) return {sp:'The gate', scene:'b9_c1_street', txt:
`There is a woman at the gate with a lamp, and she has been there a while, by the look of her, working up to asking.`,
        ch:[{t:'The woman.', go:'b9_c1_woman'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'The gate', scene:'b9_c1_street', txt: ph === 1 ?
`The gate stands open on a lane of shuttered houses. Not one lamp in a window. The last of the regulars went up it at dusk, laughing too loudly. The quarter behind the barracks has heard what the army heard, or has heard the army leave, which is the same thing. It has barred its doors.` :
`The gate, barred now. The lane beyond it is black. Somewhere a long way off the dogs are still at it.`,
        ch:[{t:'Back to the yard.', go:()=>startExplore()}]}; },

    /* the woman at the gate: the key */
    b9_c1_woman:()=>({sp:'A woman at the gate', scene:'b9_c1_street', html:rationsHTML(), again:()=>'The woman with the lamp, at the gate, waiting for an answer.', txt:
`She is Letherii, forty or so, in a shawl, with an unlit lamp in one hand and a lit one in the other, as if she had meant to bring one for somebody. She speaks to the Third in Letherii and then, when that does not land, in the trade-tongue.

"My boy," she says. "He ran. Into the alleys, when the horse..." She stops, and starts again at a place she can manage. "We are three houses up. My father cannot walk far. The watch-house is empty. Everyone is empty tonight." She looks past you at the yard. "You are soldiers. You stayed. I thought: somebody stayed."

Thallo has come down from the stores and is standing behind you with the keys. "Captain's word is the stores, Sergeant," he says, low. "But I can sit on them. I'll shout if anybody comes." He looks at the woman. "Can't sit on both, though. Your call."${b91If('brask', `\n\nBrask has come down too. He looks at the lane, and then at the stores, and says nothing at all, which is a heavy's way of saying he will go where he is put.`)}${b91If('haddat', `\n\nHaddat is already looking up the lane.`)}${b91If('tangle', `\n\nTangle is looking at the stores door. "The munitions are in there," he says. "Just so somebody said it."`)}`,
      ch:[{t:'"The stores. Corporal, walk her to the watch-house."', fx:()=>{ S.f.b9_c1_key = 'stores'; S.f.b9_c1_ph = 2; b91L('tangle', 1); b91L('brask', 1); }, go:'b9_c1_key_stores'},
          {t:'"We go with her. Corporal, the stores are yours."', fx:()=>{ S.f.b9_c1_key = 'street'; S.f.b9_c1_street = 1; S.f.b9_c1_ph = 2; b91L('haddat', 1); b91L('marrow', 1); }, go:'b9_c1_key_street'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b9_c1_key_stores:()=>({sp:'The gate', scene:'b9_c1_street', txt:
`Thallo walks her up the lane to the watch-house with her lamps, and comes back alone, and bars the gate behind him. He does not say what he found at the watch-house. He goes to the stores wall and starts walking it.

The Third takes the stores. The lamp goes on its hook by the iron door, and the squad sits round it with its backs to the wall and its eyes on the dark yard, and the barracks is quieter than any barracks has a right to be.${b91If('haddat', `\n\nHaddat looks once at the barred gate, and then sets her shield against the wall and sits by it.`)}`,
      ch:[{t:'The watch.', go:()=>startExplore()}]}),
    b9_c1_key_street:()=>({sp:'The gate', scene:'b9_c1_street', txt:
`Thallo unchains the stores door's lamp and gives it to the squad, and bars the gate behind it, and the Third goes up the lane after the woman and her light.

It is very dark. The houses on both sides have their shutters closed and barred, and behind the shutters people are being very quiet. It is the quiet of a whole quarter holding its breath.${b91If('marrow', `\n\nMarrow walks with one hand on the house walls as she goes. "Do not look at the sky, child," she says. "There is nothing in it. Do not look anyway."`)}`,
      ch:[{t:'Up the lane.', go:()=>{ startExplore('b9_c1_quarter'); talk('b9_c1_street_arrive'); }}]}),

    /* ======== phase 2, 'stores': the watch ======== */
    b9_c1_thieves:()=>({sp:'The stores door', scene:'b9_letheras_night', txt:
`They come over the back wall from the canal side, three of them, the way men come who know where the wall is lowest: two in Letherii army coats with the badges cut off, and one in a raider's leathers off some border a long way from here. Deserters, and a drifter who came into the city with the rest of the country's loose ends. One has bolt-cutters. They have been told the barracks is empty tonight.

They are going for the chain.${b91If('tangle', `\n\nTangle has a hand in the satchel. "Not in the yard," he says, to himself, and takes the hand out. "Not by the stores. Hood's balls."`)}`,
      ch:[{t:'"Third! At the door!" Straight at them.', go:()=>startBattle('b9_c1_stores', {})},
          {t:'Wait in the dark by the crates, and take them at the chain.', check:['guile', 17],
            edges:id=>[id === 'sathi' && ['she lay in wait for Odhan riders with the Weasels', 2], id === 'mehet' && ['he grew up keeping out of sight', 1], id === 'tebbet' && ['a bowman knows how to wait', 1], id === 'rasp' && ['marine-trained: she knows how to wait in a yard', 1], id === 'brask' && ['heavy scale in a dark yard is a bell', -1], id === 'ottar' && ['grey plate in a dark yard is a bigger bell', -2]],
            near:{t:()=>`Yes, but ${b91Nm(b91Who())} ${b91V(b91Who(), 'come', 'comes')} out from the crates too fast and ${b91V(b91Who(), 'take', 'takes')} a crate corner on the shin on the way. ${b91Nmc(b91Who())}'ll feel it in the fight.`, fx:()=>bruise(b91Who(), bruiseN())},
            go:()=>startBattle('b9_c1_stores', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c1_thieves_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_thieves_seen:()=>({sp:'The stores door', scene:'b9_letheras_night', txt:
`A crate creaks. Three heads come round together, and the bolt-cutters go down, and three blades come out instead.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c1_stores', {surprise:'e'})}]}),
    b9_c1_stores_after:()=>({sp:'The stores door', scene:'b9_letheras_night', fx:()=>{ S.f.b9_c1_storesDone = 1; }, txt:
`The yard is quiet again. The chain is cut through, and the door is still shut, and the stores are still in it. The thieves are past caring which.

Thallo comes down the wall at a run that is mostly noise and stops, and looks, and puts the keys back on his belt. "Well," he says. "Captain'll want to know they came over the canal wall. That's the low bit." He looks at the Third. "I'll tell him you stood in the door."${b91Say({brask:`\n\nBrask is standing in front of the stores door with the heavy sword point down on the flags and both hands on the pommel. "Door," he says. "Stood in it." He seems satisfied with the evening.`, haddat:`\n\nHaddat kneels by each of them, as she does by every dead soldier, and says a word. They were soldiers, once.`, _:''})}

There is a little of the night left. The dogs are still going, all over the city.`,
      ch:[{t:'Sit out the night. Dawn, and the count.', onward:true, go:'b9_c1_dawn_stores'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_dawn_stores:()=>({sp:'The stores', scene:'b9_barracks', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c1_counted) { S.f.b9_c1_counted = 1; b9Ration(2, 'the stores counted twice'); } }, txt:
`Dawn comes up grey over the wall, and the dogs stop, one by one, all over Letheras, and somewhere across the city a great many people come out of their doors and look at the sky.

The quartermaster comes back at sunrise with the rest of the heavies, red-eyed, and stands in front of his stores with his tally and counts. Then he counts again. Then he looks at the cut chain, and at the Third, and at Thallo, and counts a third time, out of disbelief.

"All there," he says. "Every crate." He writes something on the tally that might be the Third's name. "Squad that sat on my stores eats out of them first, on the road. That's the rule. I just made it."${b91If('tangle', `\n\nTangle has watched the munitions crates counted with a face of great peace.`)}`,
      ch:[{t:'The days after.', onward:true, fx:()=>{ S.f.b9_c1_ph = 3; }, go:()=>{ startExplore('b9_c1_muster'); talk('b9_c1_muster_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 2, 'street': the quarter ======== */
    b9_c1_street_arrive:()=>({sp:'The quarter', scene:'b9_c1_street', again:()=>'The lane, every shutter closed, the woman\'s lamp at her door.', txt:
`The lane runs up from the barracks gate between plaster houses two and three storeys high, with a gutter down each side and a canal somewhere at the far end, by the smell. Every shutter is closed. Every door is barred. There is no lamp in any window, except one, three houses up, where the woman has set her own lamp on its hook by the door so the soldiers can find it.

Behind the shutters, in the dark, a whole street is listening to the Third's boots.`,
      ch:[{t:'Her door.', go:'b9_c1_house'},
          {t:'Walk the lane.', go:()=>startExplore()}]}),
    b9_c1_house:()=>({sp:'The woman\'s door', scene:'b9_c1_street', fx:()=>{ S.f.b9_c1_house = 1; }, again:()=> S.f.b9_c1_dawn ? 'The household\'s door, the lamp out, the dawn coming.' : 'The woman\'s door, her father in the chair inside, the lamp on its hook.', txt: S.f.b9_c1_dawn ?
`The household's door. The lamp is out now. Inside, the old man is asleep in his chair and the boy is asleep across his knees, and the woman is sitting on the step watching the sky go grey.` :
`Inside the door there is a room with a cold hearth and an old man in a chair by it, with a blanket on his knees and a carter's whip hung on the wall over him, as a soldier hangs a sword. He was a carter, she says, forty years. His book of debts is on the shelf still, though the new emperor tore the books up. He keeps it to look at.

"The horse was his," she says. "Ours. It died two days ago, in the yard. Nobody would come for it. Everyone is leaving." She looks at the yard door at the back of the room. "Tonight it... my boy was in the yard. He ran out through the alley. I cannot leave my father."

The old man says something in Letherii, sharply. "He says the horse was a good horse," she says, "and did nothing wrong."${b91If('marrow', `\n\nMarrow lowers herself onto the bench by the old man without being asked. "I will sit with him, child," she says to the woman. "Go and stand in your door. The soldiers will find your boy."`)}`,
      ch: S.f.b9_c1_dawn ? [{t:'Back to the lane.', go:()=>startExplore()}] :
        [{t:'The alley. The boy.', go:'b9_c1_alley', req:()=>!S.f.b9_c1_boy},
         {t:'The yard, and the horse.', go:'b9_c1_yardgate', req:()=>!!S.f.b9_c1_boy && !S.f.b9_c1_horseOut},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_alley:()=>({sp:'An alley', scene:'b9_c1_street', again:()=>'The alley mouth, black, a smell of wet straw and canal.', txt: S.f.b9_c1_boy ?
`The alley is empty now. A barrel lies on its side where a small boy came out from behind it.` : !S.f.b9_c1_house ?
`An alley mouth between two houses, black as a pocket. Something small breathes in there, very fast, and stops when you stop.` :
`The alley goes back between the houses toward the canal, black, narrow, full of barrels and handcarts and the smell of wet straw. Somewhere in it a small boy is hiding from something he saw in his own yard, and he will not come out for a soldier he cannot see.`,
      ch: S.f.b9_c1_boy ? [{t:'Back to the lane.', go:()=>startExplore()}] : !S.f.b9_c1_house ? [{t:'Back to the lane. Find the woman\'s door first.', go:()=>startExplore()}] :
        [{t:'Go in slowly, with the lamp low, and listen for him.', check:['wits', 17], req:()=>!S.f.b9_c1_boyTried,
            edges:id=>[id === 'mehet' && ['he was a boy in Y\'Ghatan\'s alleys', 2], id === 'wenna' && ['she follows small tracks for a living', 2], id === 'marrow' && ['she has coaxed a great many children out of a great many corners', 1], id === 'doss' && ['he had brothers', 1], id === 'haddat' && ['she speaks to him as her mother spoke to her', 1], id === 'brask' && ['a boy hiding from a dead horse does not want to meet a heavy in scale', -1], id === 'ottar' && ['his plate frightens the boy further in', -2]],
            near:{t:()=>`Yes, but the boy only comes out for food, and ${b91Nm(b91Who())} ${b91V(b91Who(), 'have', 'has')} to coax him the length of the alley with the squad's bread, a piece at a time, until there is none: a ration gone.`, fx:()=>{ b9Ration(-1, 'bread for a boy in an alley'); }},
            fx:()=>{ S.f.b9_c1_boyTried = 1; }, go:'b9_c1_boy_ok', fail:'b9_c1_boy_no'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_boy_ok:()=>({sp:'An alley', scene:'b9_c1_street', fx:()=>{ S.f.b9_c1_boy = 'found'; }, txt:
`He is behind a rain-barrel at the alley's dog-leg, seven or so, with his knees up under his chin and his eyes as big as the lamp. ${by({sgt:'You get down on your heels beside the barrel and wait, which is the whole trick of it.', mehet:'Mehet gets down on his heels and says something in bad Letherii that makes the boy almost laugh.', wenna:'Wenna found the scuffs of his bare feet in the muck and followed them, and now she sits down beside the barrel and waits.', marrow:'Marrow says "There you are, child," as if he had been late for supper, and he comes out.', _:'{who} gets down beside the barrel and waits, and after a while he comes out.'})}

"The horse got up," he says, to the lamp. "It was dead and it got up."

He is told that it is lying down again now. He is not told whether that is true. He takes a soldier's hand anyway, and comes back up the lane to his mother's door, and holds the hand all the way.`,
      ch:[{t:'His mother\'s door.', go:'b9_c1_house'}]}),
    b9_c1_boy_no:()=>({sp:'An alley', scene:'b9_c1_street', fx:()=>{ S.f.b9_c1_boy = 'came'; }, txt:
`The alley is a maze of barrels and handcarts and it is too dark, and the lamp makes it worse, throwing big shadows that a frightened boy would run from. You hear him go deeper in, quick and quiet.

Then his mother calls his name from the lane, once, in a voice she has plainly used before, and he comes out on his own from somewhere you had already looked, and runs past the Third to her without looking at any of it.`,
      ch:[{t:'Her door.', go:'b9_c1_house'}]}),
    b9_c1_yardgate:()=>({sp:'Their stable yard', scene:'b9_c1_stable', fx:()=>{ if (S.f.b9_c1_boy) { S.f.b9_c1_horse = 1; S.f.b9_c1_roof = 1; } }, again:()=> S.f.b9_c1_horseOut ? 'The household\'s yard, its stable barred.' : 'The household\'s yard, and the horse standing in it.', txt: !S.f.b9_c1_boy ?
`A stable-yard gate, barred from the inside. Something big moves behind it, once, and is still. The woman's boy is still out in the alleys. Him first.` : S.f.b9_c1_horseOut ?
`The household's yard. ${S.f.b9_c1_horseOut === 'out' ? 'Empty now, but for the straw and the marks in it where the Third dragged the horse out to the lane for the knackers.' : 'The stable door is barred, and whatever is in the stable is lying down, by the sound of it, and staying down.'}` :
`The gate opens on a little yard with a lean-to stable and a cart with its shafts down, and the household's dray-horse standing in the middle of the yard in the dark.

It is dead. It has been dead two days. It stands with its head up and its eyes on nothing, and it does not breathe, and the flies that were on it this morning have gone somewhere else. Then, while the squad watches, it folds its legs under it slowly, the way a tired horse does at the end of a day, and lies down in the straw again, and is only a dead horse.

Then nothing more.

Far off across the roofs to the south there is a long sound like a held breath let go, and a roof goes in somewhere a long way across the city. A little after, dust stands up over the roofs in the moonlight, pale and slow. Then the dogs start, everywhere in Letheras at once.${b91Say({marrow:`\n\nMarrow has come to the yard door behind you. "It is not the horse, child," she says, very quietly. "Something is passing through tonight. The horse was in the way of it." She goes back in to the old man.`, haddat:`\n\nHaddat is saying a word under her breath, the one she says for the dead she has no name for.`, _:''})}${b91If('brask', `\n\nBrask has the heavy sword off his shoulder and in both hands. "Twelve years," he says. "Never seen that." He does not put it back for a while.`)}`,
      ch: !S.f.b9_c1_boy || S.f.b9_c1_horseOut ? [{t:'Back to the lane.', go:()=>startExplore()}] :
        [{t:'Drag it out to the lane, for the knackers. She asked.', check:['might', 17],
            edges:id=>[id === 'brask' && ['heavies carry what nobody else will', 2], id === 'ottar' && ['a Grey Helm is built for lifting', 1], id === 'doss' && ['he has dragged a dead ox off a field before', 2], id === 'haddat' && ['she will not let it be done badly', 1], id === 'marrow' && ['she is not built for this, child', -2], id === 'mehet' && ['a townsman, and slight', -1]],
            near:{t:()=>`Yes, but it is a dray-horse, and dead, and heavy as a wagon, and ${b91Nm(b91Who())} ${b91V(b91Who(), 'tear', 'tears')} something in the back getting it through the gate. ${b91Nmc(b91Who())}'ll feel it in the next fight.`, fx:()=>bruise(b91Who(), bruiseN())},
            go:'b9_c1_horse_ok', fail:'b9_c1_horse_no'},
         {t:'Bar the stable on it, and leave it for the knackers in the morning.', fx:()=>{ S.f.b9_c1_horseOut = 'barred'; }, go:'b9_c1_horse_barred'},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_horse_ok:()=>({sp:'Their stable yard', scene:'b9_c1_stable', fx:()=>{ S.f.b9_c1_horseOut = 'out'; }, txt:
`It takes ropes from the cart and every back in the squad, and it takes most of an hour, and nobody speaks while it is done. The horse goes out through the yard gate on its side and into the lane, where the knackers will find it when the knackers come, and the yard is only a yard again.

The woman stands in her back door with her arms folded the whole time and watches. When it is done she nods once, the way her father would have.`,
      ch:[{t:'Back to the house. Sit the night out with them.', go:'b9_c1_street_dawn'}]}),
    b9_c1_horse_no:()=>({sp:'Their stable yard', scene:'b9_c1_stable', fx:()=>{ S.f.b9_c1_horseOut = 'barred'; }, txt:
`It will not shift. It is a dray-horse, and dead, and the straw under it is wet, and the gate is narrow. After the third try the squad stands back and looks at it, and then shuts the stable on it instead, and bars the door.

"The knackers," the woman says from her back door. "In the morning." She does not sound as if she minds as much as she did.`,
      ch:[{t:'Back to the house. Sit the night out with them.', go:'b9_c1_street_dawn'}]}),
    b9_c1_horse_barred:()=>({sp:'Their stable yard', scene:'b9_c1_stable', txt:
`The squad drags the stable door to on the straw and drops the bar across it. Inside, there is no sound at all.

"The knackers," the woman says from her back door. "In the morning." She looks at the barred door for a while. "Yes. That is better."`,
      ch:[{t:'Back to the house. Sit the night out with them.', go:'b9_c1_street_dawn'}]}),
    b9_c1_lane_end:()=>({sp:'The lane\'s end', scene:'b9_c1_street', txt:
`The lane ends at a canal, black and still, with a footbridge over it and more shuttered houses beyond. ${S.f.b9_c1_roof ? 'Over the roofs to the south the dust of the fallen roof is still standing in the moonlight, thinning. The dogs have not stopped.' : 'Over the roofs to the south the sky is very clear and very quiet. The dogs on the far bank are all awake and none of them are barking.'}

There is nothing past the bridge that is the Third's business tonight.`,
      ch:[{t:'Back up the lane.', go:()=>startExplore()}]}),
    b9_c1_street_dawn:()=>({sp:'The woman\'s door', scene:'b9_c1_street', fx:()=>{ S.f.b9_c1_dawn = 1; }, txt:
`The Third sits the rest of the night in the household's front room with the door open and the lamp on its hook, ${b9In('marrow') ? 'Marrow on the bench by the old man, ' : ''}the boy asleep across his grandfather's knees, and the dogs going all over Letheras until they stop, one by one, a little before dawn.

No one tries the door. Nothing else gets up. When the sky goes grey over the roofs, people begin to come out of the houses up and down the lane and stand in their doorways looking at it, as if checking it was still the same sky.

The old man wakes and says something to his daughter in Letherii, and she says it to the Third in the trade-tongue. "He says that in forty years, the soldiers who came to his door came for the debt." She looks at the squad. "He says you did not."${b91If('haddat', `\n\nHaddat bows to the old man, the Hissari way, from the waist. He seems to understand it.`)}${b91If('brask', `\n\nBrask has spent the night on the step outside, with the sword across his thighs, in case. "Quiet," he says, when you come out. "Good door."`)}`,
      ch:[{t:'Back to the barracks. The days after.', onward:true, go:'b9_c1_street_back'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_street_back:()=>{ const done = !!S.f.b9_c1_dawn;
      return {sp:'The barracks gate', scene:done ? 'b9_barracks' : 'b9_c1_street', txt: done ?
`The barracks gate is open again in the grey morning, and the heavies are coming back up the lane in twos and threes from wherever they spent the night, looking at the sky and at each other and not talking about it.

Thallo is at the gate. "Some lads tried the stores door in the night," he says. "I shouted. They ran." He rubs his broken nose. "Counted once. Quartermaster says once is what you get, if you don't sit on his stores yourself." He looks up the lane, at the woman's door. "Worth it?" He seems to want to know.` :
`Back down the lane, the barracks gate is barred, and Thallo is behind it with the stores. The woman's door is up the lane, with her lamp on its hook. ${!S.f.b9_c1_boy ? 'Her boy is still out in the alleys.' : 'The night is not done yet.'}`,
        ch: done ? [{t:'Into the yard. The days after.', onward:true, fx:()=>{ S.f.b9_c1_ph = 3; }, go:()=>{ startExplore('b9_c1_muster'); talk('b9_c1_muster_arrive'); }},
                    {t:'Not now.', go:()=>startExplore()}] :
                   [{t:'Back up the lane.', go:()=>startExplore()}]}; },

    /* ======== the fire: by phase. 1 the night, 2 the watch (stores), 3 and 4 the days after. The games pass wraps this node: keep the id ======== */
    b9_c1_fire:()=>{ const ph = b91Ph(), day = ph >= 3, rk = day ? 'b9_c1_rest3' : 'b9_c1_rest1';
      return {sp:'The Third\'s fire', scene:day ? 'b9_barracks' : 'b9_letheras_night', html:rationsHTML(),
        again:()=> day ? 'The Third\'s cook-fire in the yard, the wagons loading round it.' : 'The Third\'s fire by the kit-crates, in a yard with nobody else in it.', txt:
`${day ? `The Third's fire in the yard by day is a cook-fire with a pot on it, in among the wagons, with the heavies going past it all day with crates and the drill sergeant's voice somewhere behind everything.${S.f.b9_c1_lootersDone ? ' The march is at first light. The pot is the last hot food the column will see that it did not carry.' : ''}` : ph === 2 ? `The Third's fire by the kit-crates has burned low, and nobody feeds it. The stores watch wants its eyes on the dark, not on a flame.` : `The Third's fire is a small one by the kit-crates at the yard's middle, in a barracks with nobody else in it but a corporal and an old marine. The bunk-house windows are all dark. Far off across the roofs there is a long low sound now and then, like a building settling, and the dogs will not settle either.`}${b91Say({marrow:day ? '' : `\n\nMarrow has her knotted string out, and every so often she stops and listens.`, _:''})}${b91If('brask', day ? '' : `\n\nBrask sits a little back from the fire, on his own kit, where he can see the gate.`)}`,
        ch:[...(ph === 1 || (ph === 2 && !b91Street()) ? [b9ReadChoice(1)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk] && ph !== 2, fx:()=>{ S.f[rk] = 1; rest(day ? 'The squad sits an hour by the cook-fire in the sun. Wounds close, mostly.' : 'The squad sits an hour by the fire in the empty yard. Wounds close, mostly.'); }, go:'b9_c1_fire_rest'},
            {t:'Talk with the squad.', go:'b9_c1_fire_talk'},
            {t:'Down to the gate. The woman.', req:()=>ph === 1 && b91WomanDue(), onward:true, go:'b9_c1_woman'},
            {t:'The gate, with the heavies. The march.', req:()=>day && !!S.f.b9_c1_lootersDone, onward:true, go:'b9_c1_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c1_fire_rest:()=>({sp:'The Third\'s fire', scene:b91Ph() >= 3 ? 'b9_barracks' : 'b9_letheras_night', txt:
`${b91Ph() >= 3 ? 'An hour, then, in the sun, with the wagons loading round the fire and the heavies stepping over the Third\'s legs.' : 'An hour, then, by a small fire in an empty barracks, with the city making its sounds beyond the wall.'}

${b91Say({mirrel:`Mirrel goes round the squad with the water skin, one mouthful each, and watches each one swallow. "Drink. Good."`, marrow:`Marrow goes round the squad with her hands, and stops at each of them long enough to frown. She closes a cut anyway.`, _:'Some of them sleep. The rest watch the gate.'})}${b91If('haddat', `\n\nHaddat says the names of the dead under her breath, the long list, and ${b9In('brask') && S.f.b9_c1_braskSquad ? 'four new ones at the end of it, that Brask gave her.' : 'has not run out.'}`)}${b91If('tangle', `\n\nTangle sleeps with the satchel under his head and the trip cord round both wrists.`)}`,
      ch:[{t:'Back to the fire.', go:'b9_c1_fire'}]}),
    b9_c1_fire_talk:()=>{ const day = b91Ph() >= 3, ln = [], sh = S.inv.sharper || 0, cu = S.inv.cusser || 0;
      if (b9In('haddat')) ln.push(day ? `Haddat is watching the heavies load the wagons. "They count everything twice," she says, approving. "My mother counted water-skins three times. She said the third count was for the god." She thinks. "I do not know who the third count is for now."` : `Haddat has the blue shield face down on the flags and is oiling its straps. "My mother said an empty house is the loudest kind," she says. She listens to the barracks. "She was right about that too."`);
      if (b9In('sathi')) ln.push(day ? `Sathi is watching the wagons form along the lane outside the gate. "East," she says. "Wide country, the Letherii say. No roads." She grins with her filed teeth. "Weasel country."` : `Sathi is lying on a crate lid looking at the stars, her filed teeth showing. "Everyone ran," she says, pleased. "Weasels never run till they know what from. Then they run very fast."`);
      if (b9In('tangle')) ln.push(day ? `Tangle has the satchel open in the sun. "${b91Sh(sh)}, ${numw(cu)} cusser${cu === 1 ? '' : 's'}," he says. "Quartermaster says the column's issue is what we've got. No more from the Moranth, not out there." He closes it. "I'll count it again at the first halt. It'll be the same. It'll feel worse."` : `Tangle is counting the satchel by the fire. "${b91Sh(sh)}," he says. "${numw(cu, true)} cusser${cu === 1 ? '' : 's'}." He touches the Kanese bead at his wrist. "When it's gone, it's gone. The Moranth are a very long way off."`);
      if (b9In('marrow')) ln.push(day ? `Marrow is sitting in the sun on a crate with her eyes shut. "Soliel opened her door again this morning, child," she says. "A crack. As if she were looking to see who was still standing." She opens one eye. "We were."` : `Marrow has her knotted string in her lap and is not knotting it. "Something is loose in the warrens tonight, child," she says. "Soliel has her door shut. I have never known her shut it." She tucks the string away. "We will sit by the fire and mind our business. That is a kind of prayer too."`);
      if (b9In('mirrel')) ln.push(day ? `Mirrel is checking feet, every pair in the squad, one by one, on a crate. "No healers' houses where we're going," she says. "Boots off. There. Good." She frowns at a heel. "That's the first blister. I will remember it."` : `Mirrel is rolling linen into her bag in tight rolls. "Every healer in this army packed tonight," she says. "No one told them to." She ties the bag. "In Li Heng we did that before the fever came."`);
      if (b9In('doss')) ln.push(day ? `Doss is watching the food wagons go by the gate. "Salt pork, biscuit, salt pork," he counts. "On the holding we ate better at harvest." He considers. "Worse the rest of the year. I'll take the pork."` : `Doss is turning over a bone die he found in the yard. "In Lether, on a night like this," he says, "the Indebted stay in and bar the door, and the rich go out to watch." He sets it down. "I've never been the ones who went out."`);
      if (b9In('wenna')) ln.push(day ? `Wenna is filling skins at the yard cistern, all of them, the squad's and some that are not the squad's. "Water is water till it isn't," she says. "Out there, I'm told, it isn't."` : `Wenna has been to the cistern in the corner of the yard and come back. "The water's wrong," she says. "Not foul. Listening." She sits. "The Shore doesn't like cities. I've never heard one go this quiet."`);
      if (b9In('mehet')) ln.push(day ? `Mehet has hung his ring of keys on his belt and stopped trying locks. "Nothing out east to unlock," he says, a little sadly. "Grass doesn't have doors."` : `Mehet is going round the yard's doors with his ring of keys, trying the locks out of habit. "In Y'Ghatan, when a whole quarter left," he says, "it was because they knew something the quarter didn't." He comes back. "No one's told this quarter either."`);
      if (b9In('ottar')) ln.push(day ? `Ottar is watching the drill sergeant walk the heavies' lines. "Today's word," he says, "is <em>muster</em>. In Perish it has three syllables and you sing it." He tries it in Malazan. "Here it has two, and you shout."` : `Ottar is polishing the grey plate in the firelight. "Today's word," he says, "is <em>emptied</em>. The clerk used it." He tries it. "A barracks emptied. A city emptied." He sets the rag down. "It is not a good word. I will keep it anyway."`);
      if (b9In('tallow')) ln.push(day ? `Tallow is eating standing up, the way the heavies do. "Grandmother said never start a long road on an empty belly," he says. "She'd have liked the quartermaster. She'd have robbed him."` : `Tallow has his grandmother's deck in its oilcloth and keeps touching it. "She'd have known what tonight is," he says. "She'd have had the cards out and her back to the door." He does not take them out. "I've got my back to the door. That's half."`);
      if (b9In('hessa')) ln.push(day ? `Hessa is looking down the lane toward the canal. "Last water we'll see that knows D'rek," she says. "The Wastes have no rivers, they say." She touches the spear's butt to the flags. "She'll be further down. She's always further down."` : `Hessa sits straight with the spear upright beside her. "D'rek is turning over under the city," she says. "I can feel it in the stones." She puts her palm flat on the flags. "Something is going on above her, and she doesn't care for it."`);
      if (b9In('tebbet')) ln.push(day ? `Tebbet is restringing his bow for the dry country. "Wet strings for Lether," he says. "Dry strings for the east. I'm told the east is very dry."` : `Tebbet is waxing his bowstring, though it doesn't need it. "Every marine I know left before dark," he says. "When a marine leaves a free billet, there's something wrong with the billet."`);
      if (b9In('darrut')) ln.push(day ? `Darrut is watching the heavies form up by squads. "The Aren Guard marched out of Aren once in my life," he says. "The streets were full, and everybody cried." He looks at the shuttered windows over the wall. "There's no one crying here. There's no one here."` : `Darrut has his helm on his knee. "In Aren," he says, "the Guard stayed when the city emptied. That was the job." He looks at the dark bunk-houses. "I suppose that is our job tonight. I did not ask for it either."`);
      if (b9In('yorin')) ln.push(day ? `Yorin's copper wind-vane points east this morning and stays there. "Serc's made up its mind," he says. "I wish it would tell me what about."` : `Yorin has his copper wind-vane flat on his palm. The little arrow will not settle. It turns and turns. "Serc doesn't know which way the wind is," he says. "That has never happened."`);
      if (b9In('rasp')) ln.push(day ? `Rasp has been helping the column's sappers pack their wagon, uninvited, and being allowed to. "They've got less than you'd think," she says, coming back. "Less than they'd like. A lot less than I'd like."` : `Rasp is checking the timers on the squad's munitions by the fire, one by one. "The marine sappers took every scrap of kit with them when they left," she says. "Didn't leave so much as a fuse." She closes the satchel. "Whatever's happening, they think it's loud."`);
      if (b9In('orvas')) ln.push(day ? `Orvas is looking east over the wall. "The heavies say the Burned Tears are coming by another road," he says. "Round by the south." He nods. "Then I will see them, somewhere out there. Or I will not."` : `Orvas is watching the dark sky over the wall. "In the Khundryl camps," he says, "when the old women see a night like this, they put the children in the middle of the herd." He shrugs. "There is no herd here. There is us."`);
      if (b9In('redblade')) ln.push(day ? `Ramin has his scale back on, and the heavies are looking at it with something like respect. "They ask where they can get some," he says. He shrugs. "I tell them Aren. They stop asking."` : `Ramin has the scale off for once and is scraping at a link. "The Red Blades would have stood a watch on an empty barracks and called it an honour," he says. He keeps scraping. "I call it the stores."`);
      if (b9In('warlock')) ln.push(day ? `Keth is eating, and the grandmother is quiet for once. "*East,*" she says, when he has finished. "*My mother's mother walked east once. She came back.*" Keth looks surprised. "She never told me that."` : `Keth sits close to the fire with his knees drawn up. "*Cards on the table, boy,*" the grandmother says, out of his mouth. "*Somebody has cards on a table tonight. Stay away from that table.*" Keth shivers. "She doesn't usually give advice."`);
      if (b9In('brask')) ln.push(day ? `Brask is eating standing up, with the heavy sword leaning on his hip. "Old squad marched out of Malaz City full," he says. "Then it was half. Then it was me." He finishes the biscuit. "This lot's got more in it. I'll stay where I can count you."` : `Brask is sharpening the heavy sword at the fire, though it needs nothing. "Old squad used to sit at this fire," he says. "Different crate." He tests the edge on his thumbnail. "You lot sit closer. That's fine. I'll learn where."`);
      return {sp:'The Third\'s fire', scene:day ? 'b9_barracks' : 'b9_letheras_night', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b9_c1_fire'}]}; },

    /* ======== phase 3: the days after, the muster ======== */
    b9_c1_muster_arrive:()=>({sp:'The barracks yard', scene:'b9_barracks', again:()=>'The yard, the wagons backed up to the gate, the heavies counting.', txt:
`The days after are loud, as if the barracks were making up for that night.

The heavies are mustering. The wagons are backed up to the gate in a line, and the yard is full of kit in heaps and crates and sacks and soldiers counting them, and the drill sergeant's voice goes over all of it like a cart over cobbles. No one talks about the night the barracks emptied. Everybody knows somebody who saw something. The city outside the wall is quieter than it was, and some of its quarters have more empty houses than they had.

${b91Say({haddat:`Haddat watches the wagons a while. "We are going, then," she says. "Truly." It does not seem to surprise her.`, tangle:`Tangle watches the munitions crates go onto a wagon. "That's all of it," he says. "That's everything the column's got." He watches it go, the way a man watches his money.`, _:'The Third stands in the middle of it and is stepped round, as heavies are.'})}

Thallo is by the wagons with a list he plainly did not write.`,
      ch:[{t:'Thallo.', go:'b9_c1_thallo3'},
          {t:'Walk the yard.', go:()=>startExplore()}]}),
    b9_c1_thallo3:()=>({sp:'Thallo', scene:'b9_barracks', fx:()=>{ S.f.b9_c1_orders3 = 1; }, again:()=> S.f.b9_c1_lootersDone ? 'Thallo, by the wagons, eating. "First light, Sergeant. Then walking."' : 'Thallo, by the wagons, with his list. "The quarter, Sergeant. The house with the door in."', txt: S.f.b9_c1_lootersDone ?
`Thallo is sitting on a wagon-tongue eating something out of a cloth. "Captain's pleased," he says, chewing. "Said so. Didn't say it to you, said it to me, so I'm saying it." He swallows. "First light, the march. Everybody's to have answered the roll by then. Drill sergeant's orders." He looks at his food sadly. "Last fresh bread in Lether, this."` :
`Thallo has a list in his fist and a face that says he has been given it rather than asked. "Captain's word," he says. "The quarter behind us. Since the night the barracks emptied, half of it's been empty houses, and the empty houses have been getting emptier. Looters. City men, and some deserters with them, and one who was an officer, they say." He folds the list. "Captain wants it cleared before we march. Can't leave the quarter to them when we go. Wouldn't be manners."

"I'll come. And a heavy of mine." He sniffs. "Also. The Letherii are mustering their escort on the plain outside the city. One of our heavies' sergeants is out there teaching them to stand still. Says they're coming on." He considers this. "Says they argue."`,
      ch: S.f.b9_c1_lootersDone ? [{t:'Back to the yard.', go:()=>startExplore()}] :
        [{t:'"The quarter, then."', go:()=>startExplore()},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_captain:()=>({sp:'The captain', scene:'b9_barracks', fx:()=>{ S.f.b9_c1_captain = 1; }, again:()=>'The captain, across the yard, with the quartermaster\'s lists.', txt:
`The captain of the heavies' company is across the yard by the stores with the quartermaster's lists in one hand and the drill sergeant at his elbow: a grey, square man in plain scale, who walks the wagon line the way a farmer walks a fence. He reads a list, hands it back, says a word, and the drill sergeant says the same word a great deal louder.

He looks over at the Third once, and nods to Thallo, and Thallo nods back, and that seems to be a whole conversation. Then he goes on down the line.${b91If('brask', `\n\nBrask watches him go. "Good captain," he says. "Doesn't talk. Means he's thinking."`)}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the quartermaster: the scale, by phase-3 key */
    b9_c1_qm:()=>({sp:'The quartermaster', scene:'b9_barracks', fx:()=>{ if (!S.f.b9_c1_scale) { S.f.b9_c1_scale = 1; gain('b9_c1_heavyscale'); } }, again:()=>'The quartermaster, at his stores, with his tally. "Four silver a salve, Sergeant."', txt:
`The quartermaster is a red-eyed heavy with a tally in his fist and a pen behind his ear, standing in his stores door as if he expected somebody to try it.

${b91Street() ? `"The squad that went walking," he says. "Thallo told me. I counted once." He goes in and comes out with a long shirt of heavy scale over his arm. "Spare from a squad that's not a squad any more."${b9In('brask') ? ` He looks at Brask. "One of theirs, that is. It goes with the man."` : ''}` : `"The squad that sat on my stores," he says. "Every crate there." He goes in and comes out with a long shirt of heavy scale over his arm. "Spare from a squad that's not a squad any more. First pick, I said. That's first pick."`}

It is doubled at the shoulders, and heavy as a promise. It goes in the kit.

"Salves are four silver," he adds. "And don't tell me the heavies get them free. Where we're going there's no more where these came from."`,
      ch:[{t:'A salve.', tag:'4 silver', req:()=>(S.silver || 0) >= 4, fx:()=>{ S.silver -= 4; S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for four silver.', 'good'); }, go:'b9_c1_qm'},
          {t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the drill sergeant's roll at the gate: the trick */
    b9_c1_drill:()=>({sp:'The drill sergeant', scene:'b9_barracks', again:()=> S.f.b9_c1_rollOk ? 'The drill sergeant at the gate, calling a squad\'s roll. Every name. Every one answers.' : 'The drill sergeant at the gate, with his list, calling names.', txt:
`The heavies' drill sergeant stands at the gate with a list he does not look at, calling the roll of a squad of the company: every name, in file order, without a pause between them. Each soldier answers and steps up into the gap the last one left, so that by the end of the roll the file has closed itself, and nobody gave an order to close it. Then the next squad.

${S.f.b9_c1_rollTried ? `He sees the Third watching. "Again tomorrow," he says. "First light. Be in the file."` : `He sees the Third watching, and does not stop. "Third squad, 9th," he says between two names, like one more name on it. "You'll answer at first light with the rest. Know how?" He calls the next name. "Nobody marches out of this gate who hasn't answered. Not since Malaz City. Not ever."`}${b91If('brask', `\n\nBrask is mouthing the names of a squad that is not his any more, a beat ahead of the sergeant.`)}`,
      ch:[{t:'Learn the roll the heavies\' way: the order, the answer, the step.', check:['wits', 19], trick:'b9_c1_rollcall', req:()=>!S.f.b9_c1_rollTried, fx:()=>{ S.f.b9_c1_rollTried = 1; },
            edges:id=>[(trickBy('b4_c1_gate') === id || (id === 'sgt' && !!trickBy('b4_c1_gate'))) && ['the Gate Drill at Aren: the Third has stood a muster at a gate before', 2], id === 'sgt' && ['the Fourteenth\'s musters: you have called a roll yourself', 1], id === 'brask' && ['six years of answering this roll', 2], id === 'haddat' && ['she says the names of the dead every night, in order', 1], id === 'tangle' && ['a roll is a count, and he counts', 1], id === 'ottar' && ['the Perish muster by name too, singing', 1], id === 'doss' && ['the clerk read his line out every quarter-day', 1], id === 'sathi' && ['she has never answered to her name on the first call', -1], id === 'tallow' && ['he answers for the man beside him', -1]],
            go:'b9_c1_drill_ok', fail:'b9_c1_drill_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_drill_ok:()=>({sp:'The drill sergeant', scene:'b9_barracks', fx:()=>{ S.f.b9_c1_rollOk = 1; }, txt:
`By the time the sergeant has called the company's last squad, ${by({sgt:'you can', brask:'Brask is calling it with him, and', _:'{who} can'})} call the Third's own roll the heavies' way: every name, in file order, no breath between them, and the squad stepping up on each answer into the gap the last one left, until the file is closed and no order was given.

The drill sergeant listens to it once, all the way through, without turning round. "That'll do," he says, to the gate. "First light."${b91If('haddat', `\n\nHaddat answers to her name as if it were a prayer. It might be one.`)}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b9_c1_drill_no:()=>({sp:'The drill sergeant', scene:'b9_barracks', txt:
`It goes well for three names, and then somebody answers for the soldier beside them, and two people step into the same gap, and the file comes apart in the middle like a bad seam.

The drill sergeant does not turn round. "Heavies learn it in a year," he says to the gate. "You've had a morning." He calls the next squad.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the gate by day: the quarter, and the march */
    b9_c1_gate3:()=>{ const done = !!S.f.b9_c1_lootersDone;
      return {sp:'The gate', scene:'b9_barracks', txt: done ?
`The gate, with the wagons lined up in the lane beyond it and the drill sergeant beside it with his list. The march is at first light.${S.f.b9_c1_rollOk ? ' The Third knows its roll.' : ''}` : !S.f.b9_c1_orders3 ?
`The gate stands open on the lane, with the wagons lined up along it. Thallo has the captain's word for the Third, by the wagons. He will want to see you before you go anywhere.` :
`The gate, and the lane beyond it going up into the emptied quarter. Thallo is waiting by it with one of his heavies, eating.`,
        ch: done ? [{t:'The march. Out of the gate with the heavies.', onward:true, go:'b9_c1_onward'},
                    {t:'Into the quarter again.', go:()=>{ startExplore('b9_c1_lanes'); }},
                    {t:'Not now.', go:()=>startExplore()}] :
          S.f.b9_c1_orders3 ? [{t:'Into the emptied quarter.', onward:true, go:()=>{ startExplore('b9_c1_lanes'); talk('b9_c1_lanes_arrive'); }},
                               {t:'Not now.', go:()=>startExplore()}] :
          [{t:'Back to the yard.', go:()=>startExplore()}]}; },

    /* ======== phase 3: the quarter by day ======== */
    b9_c1_lanes_arrive:()=>({sp:'The emptied quarter', scene:'b9_c1_lanes', again:()=>'The quarter by day, doors standing open.', txt:
`By day the quarter behind the barracks is a different place, and not a better one. Half the shutters are open now, and half the rooms behind them are empty, swept out by people who left the morning after the night of the cards and did not say for where. A chair stands in the middle of the lane by itself. A handcart has lost a wheel. Somewhere a door is banging in no wind at all.

${b91Street() ? `Three houses up, the woman's door is shut, and her lamp is on its hook, unlit.` : `Three houses up there is a door with a lamp-hook and no lamp, shut.`} Further on, across the lane, a house has had its door broken in, and there are voices inside it, and the sound of things being dropped into sacks.${b91If('brask', `\n\nBrask looks at the broken door. "Looters," he says. "Heavies hate looters." He thinks about why. "Untidy."`)}`,
      ch:[{t:'The broken door.', go:'b9_c1_looted'},
          {t:'Walk the lane.', go:()=>startExplore()}]}),
    b9_c1_thallo_lanes:()=>({sp:'Thallo', scene:'b9_c1_lanes', txt: S.f.b9_c1_lootersDone ?
`Thallo is leaning on the handcart with the lost wheel, eating an apple he did not have this morning. "Got given it," he says. "Out of a window. Never had that in Malaz City." He looks at it. "Good apple."` :
`Thallo is standing in the lane with a heavy of his, a big quiet woman with a shield, both of them looking at the broken door. "In there," he says. "Six or so. And the one who was an officer, round the back, I'd guess. Officers like the back." He chews. "Front door's the heavies' way. Back's the clever way. You're the sergeant."`,
      ch:[{t:'Back to the lane.', go:()=>startExplore()}]}),
    b9_c1_looted:()=>{ const done = !!S.f.b9_c1_lootersDone;
      if (done) return {sp:'The looted house', scene:'b9_c1_lanes', txt:
`The looted house stands open and empty. The sacks the looters filled are in a row in the lane, for whoever comes back for what is in them. Some of them already have.`,
        ch:[{t:'Back to the lane.', go:()=>startExplore()}]};
      return {sp:'The looted house', scene:'b9_c1_lanes', txt:
`A narrow house of three storeys, its door broken in off one hinge, and inside, men with sacks going through somebody's life at speed: city men in good boots they did not buy, and a few in Letherii army coats with the badges cut off. Upstairs a crossbow creaks as somebody leans out of a window to watch the lane. Round the back there is a yard, and a voice in it giving orders in an officer's Letherii.

Thallo and his heavy have their shields up. "Ready when you are," he says, as calmly as of a wagon to be loaded.`,
        ch:[{t:'"Third! Through the door!" Straight in.', go:()=>startBattle('b9_c1_looters', {})},
            {t:'Round by the next yard, and in from behind them.', check:['guile', 17],
              edges:id=>[id === 'mehet' && ['he has been over a great many yard walls', 2], id === 'sathi' && ['she came at Odhan camps from behind for the Weasels', 2], id === 'rasp' && ['marine-trained: yards are what she was taught on', 1], S.f.b9_c1_rollOk && id === 'sgt' && ['the roll: the squad moves on a word', 1], id === 'brask' && ['a heavy in scale and a garden wall disagree', -1], id === 'ottar' && ['grey plate and a wall disagree louder', -2]],
              near:{t:()=>`Yes, but the next yard's wall has a rotten coping, and ${b91Nm(b91Who())} ${b91V(b91Who(), 'come', 'comes')} down on the far side with it, on a knee. ${b91Nmc(b91Who())}'ll carry that into the fight.`, fx:()=>bruise(b91Who(), bruiseN())},
              go:()=>startBattle('b9_c1_looters', nearMiss() ? {} : {surprise:'p'}), fail:'b9_c1_looted_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c1_looted_seen:()=>({sp:'The looted house', scene:'b9_c1_lanes', txt:
`The crossbow at the upstairs window sees the Third go over the next yard's wall, and shouts, and the sacks go down all through the house at once.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b9_c1_looters', {surprise:'e'})}]}),
    b9_c1_looters_after:()=>({sp:'The looted house', scene:'b9_c1_lanes', fx:()=>{ if (!S.f.b9_c1_lootersDone) { S.f.b9_c1_lootersDone = 1; S.f.b9_c1_ph = 4; gain('b9_c1_gutterknife'); } }, txt:
`The lane is quiet. The looters who could run have run, through the yards and over the canal, and will not be back before the army is gone. The ones who could not are past running. The deserter officer is down in the back yard by the well with his good sword beside him, and the Third leaves it there for the watch, because it is the watch's business who he was.

One of the looters dropped a knife in the lane when the Third came round the corner: a short broad gutter-knife with a cord grip, canal iron, honed thin. It goes in the kit.${b91Say({brask:`\n\nBrask is putting the looters' sacks in a row in the lane, neatly, one beside another. "So they can find their things," he says, of the people who are not coming back. "Tidy."`, haddat:`\n\nHaddat kneels in the back yard by the officer and says a word. He was a soldier once, she says. Then he wasn't.`, _:''})}

Up and down the lane, a shutter opens here and there, and somebody looks out, and does not close it again.`,
      ch:[{t:'Back to the lane.', go:()=>startExplore()}]}),

    /* the soldiers' tavern: Letherii veterans; the optional brawl */
    b9_c1_tavern:()=>({sp:'A soldiers\' tavern', scene:'b9_c1_tavern', fx:()=>{ S.f.b9_c1_tavern = 1; }, again:()=> S.f.b9_c1_brawlDone ? 'The tavern, the benches back on their feet, the Letherii veterans at their table, raising a cup to the Third.' : 'The tavern, the veterans at their table at the back, watching.', txt: S.f.b9_c1_brawlDone ?
`The benches are back on their feet. The Letherii veterans at the back table raise their cups to the Third as it comes in, and the oldest of them, the one with the bad eye, says the same thing he said after.

"No one comes back from the Wastes with a map. Bring one back. Show us."` :
`A low soldiers' taproom at the corner of the lane, the sort of place a barracks keeps alive. The tavern-keeper is a Letherii with one arm, and he has a lamp on a hook and a cudgel under the counter, and he looks at the Third as if he had been expecting it.

At the back table there are old Letherii soldiers: five or six of them, grey, in the remains of uniforms of an army that lost, drinking slowly because they have nowhere else to be. They have been in this tavern every day since the city fell. They watch the Malazans come in.

"Going east," one of them says, in good trade-tongue, to the table. "Into the Wastes. With their little wagons." He has a bad eye. "We had a word in the army for soldiers who marched into the Wastes." He drinks. "We didn't have one for soldiers who marched out."${b91If('brask', `\n\nBrask has stopped in the doorway, as heavies do, filling it.`)}`,
      ch: S.f.b9_c1_brawlDone ? [{t:'Back to the lane.', go:()=>startExplore()}] :
        [{t:'Buy the table a round.', tag:'3 silver', req:()=>(S.silver || 0) >= 3 && !S.f.b9_c1_round, fx:()=>{ S.silver -= 3; updSilver(); S.f.b9_c1_round = 1; }, go:'b9_c1_tavern_round'},
         {t:'Talk them down. ("We marched out of a desert before.")', check:['guile', 17], req:()=>!S.f.b9_c1_talkTried && !S.f.b9_c1_round,
            edges:id=>[id === 'sgt' && ['you have talked down worse tables', 1], id === 'doss' && ['he talks to them as one Letherii to another', 2], id === 'haddat' && ['she speaks of the Chain of Dogs, and they have heard of it', 1], id === 'darrut' && ['the Aren Guard knew how to drink with a beaten army', 1], id === 'brask' && ['he has opinions about Letherii soldiers, and keeps fewer of them than he means to', -1], id === 'sathi' && ['her teeth do the talking', -2]],
            near:{t:'Yes, but the bad-eyed one wants it settled the soldiers\' way, which is with a round on the Malazans. It costs three silver.', fx:()=>{ S.silver = Math.max(0, (S.silver || 0) - 3); updSilver(); }},
            fx:()=>{ S.f.b9_c1_talkTried = 1; }, go:'b9_c1_tavern_ok', fail:'b9_c1_tavern_no'},
         {t:'"Outside, then. Or in here. Your choice."', go:()=>startBattle('b9_c1_brawl', {})},
         {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_tavern_round:()=>({sp:'A soldiers\' tavern', scene:'b9_c1_tavern', txt:
`The round goes to the back table on a tray, and the old soldiers look at it, and at the Third, and the bad-eyed one picks up a cup and turns it in his fingers.

"Malazan silver," he says. "Spends the same." He drinks. "No one comes back from the Wastes with a map," he says. "Lether sent soldiers in, my grandfather's time. Some came out. None of them could say where they'd been." He puts the cup down. "Bring one back. A map. Show us."`,
      ch:[{t:'Back to the lane.', go:()=>startExplore()}]}),
    b9_c1_tavern_ok:()=>({sp:'A soldiers\' tavern', scene:'b9_c1_tavern', txt:
`${by({doss:'Doss talks to them in Letherii, slowly, the way he would talk to men in a field at the end of a day, and after a while they are talking back.', haddat:'Haddat tells them, quietly, about a column of refugees that walked across a continent with an army round it, and they listen, because soldiers will.', _:'{who} tells them about a desert, and a march across it, and an army that came out the far end. They listen, because soldiers will.'})}

The bad-eyed one hears it out. "Huh," he says. "Seven Cities." He pushes a cup across the table, his own. "No one comes back from the Wastes with a map," he says. "So bring one. Show us."`,
      ch:[{t:'Back to the lane.', go:()=>startExplore()}]}),
    b9_c1_tavern_no:()=>({sp:'A soldiers\' tavern', scene:'b9_c1_tavern', txt:
`It goes wrong somewhere round the word "desert". The bad-eyed one stands up, slowly, and the rest of the table stands up with him, and the tavern-keeper sighs and reaches for the lamp.

"Malazans," the bad-eyed one says, without heat. "Always sure they've seen worse." He rolls his sleeves up. "Show us, then."`,
      ch:[{t:'Fists, then.', go:()=>startBattle('b9_c1_brawl', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c1_brawl_after:()=>({sp:'A soldiers\' tavern', scene:'b9_c1_tavern', fx:()=>{ S.f.b9_c1_brawlDone = 1; }, txt:
`It ends, as these things do, with everybody on the floor or sitting against the wall breathing hard, and the tavern-keeper hanging his lamp back on its hook and righting the bench nearest him without comment.

The bad-eyed one wipes his mouth and looks at the Third from the floor, and laughs, which he plainly has not done in a while. "Good," he says. "Good. Malazans." He gets up, with a hand from ${b91Say({brask:'Brask', haddat:'Haddat', _:'a squadmate'})}. "Sit. We'll buy." He means it. "No one comes back from the Wastes with a map. You lot might. Bring it here. Show us."${b91If('brask', `\n\nBrask sits down at the Letherii table like it was the heavies' own, and drinks what he is given. "Not bad," he says, of the beer, or the fight.`)}`,
      ch:[{t:'Back to the lane.', go:()=>startExplore()}]}),

    /* the household by day: on 'street', a loaf; on 'stores', a shut door */
    b9_c1_house_day:()=>({sp:'A door in the lane', scene:'b9_c1_lanes', fx:()=>{ if (b91Street() && !S.f.b9_c1_bread) { S.f.b9_c1_bread = 1; b9Ration(1, 'a loaf from the carter\'s house'); } }, again:()=> b91Street() ? 'The household\'s door, shut, the lamp on its hook.' : 'A shut door with an empty lamp-hook.', txt: b91Street() ?
`The woman's door opens before you knock. She has a loaf in a cloth, still warm, and a jar of oil, and she gives them to the nearest soldier without a speech, like a debt being paid that she is glad to pay.

"My father says the soldiers who came to his door for forty years came for the debt," she says. "He says these ones brought the boy home." Behind her the old man lifts a hand from his chair. The boy is not to be seen; he is somewhere in the house, hiding from Malazans, out of habit now.

"East," she says. "Into the Wastes. The old soldiers in the tavern say nobody comes back." She looks at the squad. "Come back."${b91If('brask', `\n\nBrask takes his helm off on the step, for the old man. He does not explain why.`)}` :
`A door in the lane with a lamp-hook beside it and no lamp, shut. There is a smell from the stable yard beside it that says a horse has been dead in there some days. The knackers have not come. Behind the shutters, somebody is moving about very quietly, and stops when the Third stops.

No one answers the door. It is not the Third's door to knock on.`,
      ch:[{t:'Back to the lane.', go:()=>startExplore()}]}),
    b9_c1_lanes_back:()=>({sp:'The lane', scene:'b9_c1_lanes', txt: S.f.b9_c1_lootersDone ?
`Back down the lane, the barracks gate stands open, and the wagons are lined up along the wall outside it with their tailboards down, waiting for the last of the crates. The march is at first light.` :
`Back down the lane, the barracks gate stands open. Thallo will want the looters dealt with before the march.`,
      ch:[{t:'Back to the barracks.', go:()=>{ startExplore('b9_c1_muster'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== the end: first light, out of the gate ======== */
    b9_c1_onward:()=>({sp:'The gate', scene:'b9_barracks', html:rationsHTML(), txt:
`First light, grey over the wall, and the drill sergeant at the gate with his list he does not look at, calling the roll of the company squad by squad. Every name. Every one answers.

"Third squad, 9th," he says, and the Third answers, ${S.f.b9_c1_rollOk ? 'the heavies\' way, every name in file order and the squad closing up on each one, and the drill sergeant does not look up, which from him is praise' : 'a beat late here and there, and closes up in the end, and the drill sergeant lets it pass, this once'}.${b91If('brask', `\n\nBrask answers to his name, and then, out of six years' habit, very quietly, to four more that nobody calls. Then he steps up into the Third's file, at the end, where he can see what's coming.`)}

Then the wagons roll, and the heavies go out of the gate behind them, and up the lane, ${b91Street() ? 'past a door with a lamp-hook where a woman and an old man are standing in the doorway to watch the soldiers go by, and a boy behind them, half hidden, waving' : 'past shuttered houses, some of them open now, with people in the doorways watching the soldiers go by and not waving, which is fair'}, and out toward the landward gate and the road east.${b91Say({haddat:`\n\nHaddat says the names of the dead under her breath as she walks, and at the end of them, quietly, a new word: <em>Letheras</em>. Then she is done.`, _:''})}`,
      ch:[{t:'East, with the heavies.', onward:true, go:()=>chapterEnd(1, b91Key() || 'stores')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
