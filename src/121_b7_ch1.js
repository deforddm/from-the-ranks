/* ============ Book Seven, Chapter 1: The Burned Ships ============ */
/* The Third, lent to Fist Keneb's column as a squad of heavies (rg-canon correction 1, fix (A); Reaper's Gale ch 13, W13). A month of
   reversed sleep at sea behind an Edur fleet, and the captain's order in the hold: the Third goes ashore with the marines, "the way the City
   Garrison lot were moved into the marines last year" (BH R5). Phase 1, the landing beach at night: the lieutenant of the marine company
   (unnamed, a she), the column's quartermaster, an old soldier of the 9th going back with the last pinnace (the Deck's third reader). The
   key at the waterline as the lamp goes up to fire the transports, S.f.b7_c1_key: 'burn' (fire your own with the rest, on time) or 'strip'
   (save its stores first: +2 sharpers and +1 salve here, +1 salve from a farm on the road, b7Rise(-1); and late, so the riders on the coast
   road catch the squad and must be fought). Phase 2, the first halt above the beach, the ships burning: the fire, the reading (B7READ[1]),
   a marine's night signs (the trick, Finger-Talk), an Edur patrol in the dunes (b7_c1_dunes). Phase 3, the coast road by night: Letherii
   riders (b7_c1_riders, optional on 'burn'), the farm (on 'strip'), the factor's tally-shed and its guards (b7_c1_tally, main, stage 2).
   Phase 4, the shed: the tally-book burned (b7Rise(1)), the tally-clerk. Phase 5, the lie-up by day and the next dusk: Doss walks in and
   asks what the Malazans pay (b7Join('doss')). Notes for later chapters: docs/rg-ch1-notes.md. */
/* FOR THE ARTIST (121b): names this file uses.
   Items: ART['item/b7_c1_charredcloak'], ['item/b7_c1_factorblade'], ['item/b7_c1_tallyash'].
   Figures: doss (the recruit; a placeholder here with ??=). Reused: b4_c1_hollet (not on a map: the captain is in the intro only), b2soldier
   (the lieutenant, the quartermaster, the marine, the old soldier), b5_c5_refugee (the farm), b5_c1_clerk (the tally-clerk), b4_c5_rider
   (the riders on the road), b5_edur (the dunes).
   Backdrops: b7_coast_burning and b7_coast_night (120's, yours), and two this file adds that borrow until you draw them: b7_c1_landing
   (the beach before the burning: the transports at anchor, lamps at their sterns, boats on the sand) and b7_c1_shed (a fieldstone tally-shed
   off a coast road at night, a lamp in its window, a walled yard). Borrowed and left for Ch3: b7_march_night, b7_camp_night, b7_farm_night.
   Ground (TILEX, all existing): b5_c2_strand (the beach: '~' sea, 'B' a boat, '#' dune grass, 'F' the fire, '>' the way inland),
   plain_night (the coast road: '#' hedge, 'C' the farm, 'R' the shed, 'r' rock, 'x' a post, 'F' the lie-up), b5_c5_farm (the shed's yard:
   '#' wall, 'B' the shed door, 'w' the well, 'e' the gate). Battle 't' is low cover. */

/* ---- small helpers (b71: Book Seven, Chapter One) ---- */
const b71L = (id, n) => { if (b7In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b71Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b7In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b71If = (id, s) => b7In(id) ? (typeof s === 'function' ? s() : s) : '';
const b71Who = () => (ROLL() && ROLL().who) || 'sgt';
const b71Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b71Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b71V = (id, you, they) => id === 'sgt' ? you : they;
const b71And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b71Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the landing beach, 2 the first halt above the beach (the ships burning), 3 the coast road, 4 the tally-shed, 5 the lie-up and the next dusk */
const b71Ph = () => S.f.b7_c1_ph || 1;
const b71Key = () => S.f.b7_c1_key || null;
const b71Strip = () => S.f.b7_c1_key === 'strip';
const b71Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b7In(id));
/* on 'strip' the riders and the farm stand between the squad and the shed */
const b71ShedOpen = () => !!S.f.b7_c1_orders3 && (!b71Strip() || (!!S.f.b7_c1_ridersDone && !!S.f.b7_c1_farmDone));
const b71DossSettled = () => S.f.b7_dossDone != null;

/* ---- Finger-Talk: the Claw Hand-Cant (Book One's cant), in the marines' words. The night signs Keneb's marines pass down a file in the
   dark: a fist for hold, two fingers for there, a flat hand for low, a hooked finger drawn across the palm for that one, all of you, now.
   Not sorcery. The battle half sets the same marks the hand-cant does (cantRound, cantLeft), so 31_battle's critical does the rest. ---- */
Object.assign(TRICKS, {
  b7_c1_fingertalk:{name:'Finger-Talk', ch:1, use:'fight', ab:'t_b7_c1_fingertalk', where:'a hollow above the Lether beach, the night the ships burned, with a marine of the column',
    lore:'The marines talk in the dark with their hands: a fist held up for hold, two fingers pointed for there, the flat of the hand pressed down for low, and a hooked finger drawn across the palm that means that one, all of you, now. A file of marines can put six crossbows on one man without a word said. The Third has watched them do it for a month.',
    get fx(){ const n = 1 + lvT(); return `Once a fight, and it does not use the bearer's action: sign an enemy within 6. The next ${n > 1 ? ['', '', 'two', 'three', 'four', 'five', 'six'][n] + ' hits' : 'hit'} on it this round ${n > 1 ? 'are criticals' : 'is a critical'}. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b7_c1_fingertalk:{name:TRICKS.b7_c1_fingertalk.name, trick:'b7_c1_fingertalk', free:true, desc:()=>TRICKS.b7_c1_fingertalk.fx,
    tiles:u=>foes().filter(f => cheb(u, f) <= 6 && f.cantRound !== B.round && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; t.cantRound = B.round; t.cantLeft = 1 + lvT(); AUDIO.play('click'); float(t, 'that one', '#d8c8a0');
      blog(`${u.name}'s hand comes up in the dark: a fist, two fingers at ${t.name}, a hooked finger across the palm. The marines' sign: <em>that one, all of you, now.</em>`); }},
});

/* ---- borrowed pictures until the artist's file (121b) replaces them: two scenes, the recruit, the three items ---- */
{ const like = {b7_c1_landing:'b7_coast_night', b7_c1_shed:'b7_farm_night'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof FIGX !== 'undefined') FIGX.doss ??= (ctx, h, t, o) => (FIGX.b5_c5_refugee || FIGX.b2soldier || (() => {}))(ctx, h, t, o);
if (typeof ART !== 'undefined') [['b7_c1_charredcloak', 'b6_c7_malazcloak'], ['b7_c1_factorblade', 'b6_c1_rebeltulwar'], ['b7_c1_tallyash', 'b6_c1_wellrope']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Seven's glossary ---- */
GLOSSX.rg.push(
  [1, 'The borrowed heavies', 'What Keneb\'s marines call the Third: a squad of the 9th\'s heavy infantry lent to the Fist\'s column before the landing. Not marines. Reminded of it.', ()=>!!(S && S.book === 'rg' && (S.chapter || 0) >= 1)],
  [1, 'A tally-shed', 'A factor\'s outpost on a Letherii road, where his clerk keeps the book of every debt for a day\'s ride around, so the factor need not ride out to count.', ()=>!!(S && S.f && S.f.b7_c1_ph >= 3)],
  [1, 'Mockra', 'The warren of the mind. The column\'s mages lay it over the files at night, so that an eye slides off a line of soldiers and a dog does not smell them.', ()=>!!(S && S.f && S.f.b7_c1_ph >= 3)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.rg = ROSTER_FIRES.rg || {}; ROSTER_FIRES.rg[1] = ['b7_c1_fire'];

const B7CH1 = {
  title:'The Burned Ships', number:'One',
  intro:{loc:'Off the Lether coast', sub:'The Fourteenth\'s transports · night', scene:'b7_c1_landing', cap:'A long line of transports at anchor in the dark, a lamp at each stern, and a pale beach beyond them that nobody aboard has seen before.',
    paras:[
`A month at sea behind an Edur fleet, sleeping by day and standing watches by night, until the whole Fourteenth has forgotten what noon looks like. The marines did it first. The rest of the army did it because the marines were doing it and nobody wanted to be asked why not.`,
()=>{ const v = b71Mates().map(id => TPL[id].name);
  return `You are Sergeant {sgt}, Third squad, 9th Legion. ${v.length ? `${b71And(v)} ${v.length > 1 ? 'are' : 'is'} the Third this year, and ${v.length > 1 ? 'have' : 'has'} been seasick in your company since Malaz City.` : 'The Third, this year, is you.'} At dusk the captain came down into the hold with his slate and his cough and told you where the Third was going. Not with the 9th. "Ashore with the marines tonight, Sergeant. Lent to the Fist's column, as heavies. The way the City Garrison lot were moved into the marines last year." He coughed. "The 9th stays with the fleet. You don't."`; },
`Tonight the boats go in.`],
    go:'Into the boats', node:'b7_c1_start'},

  areas:[
    /* 16 x 12 (b5_c2_strand, night). ~ the sea  , . sand  B a boat drawn up  # dune grass  F the Third's fire in a hollow  > inland, off the beach */
    { id:'b7_c1_beach', title:'The Lether coast · the beach', sub:'Night · the landing', hint:'Tap ground to move · tap a figure to talk · the boats are at the waterline, the way inland is east', decor:'b5_c2_strand', dark:true,
      map:[ "~~~~~~~~~~~~~~~~",
            "~~~~~~~~~~~~~~~~",
            ",,~~~,,,,,~~~,,,",
            ",,B,,,,B,,,,,B,,",
            "................",
            "................",
            ".,......,.....,.",
            "......##........",
            "...F..##...#..,.",
            ".,..........##.>",
            "##..,...#....###",
            "################" ],
      walk:'.,', triggers:{B:'b7_c1_boats', F:'b7_c1_fire', '>':'b7_c1_inland'}, start:{x:7, y:5},
      quest:()=> b71Ph() === 1 ? (!S.f.b7_c1_orders1 ? 'The lieutenant, up the beach.' : 'The boats at the waterline. The lamp goes up soon.')
        : !S.f.b7_c1_orders2 ? 'The lieutenant, by the fires in the dunes.' : !S.f.b7_c1_dunesDone ? 'The Edur patrol in the dunes to the east.' : 'The fire, and then inland. The column moves tonight.',
      npcs:[
        {id:'lt', name:'The lieutenant', kind:'b2soldier', x:10, y:5, node:()=>b71Ph() === 1 ? 'b7_c1_lt' : 'b7_c1_lt2', fresh:()=>b71Ph() === 1 ? !S.f.b7_c1_orders1 : !S.f.b7_c1_orders2},
        {id:'old', name:'An old soldier of the 9th', kind:'b2soldier', x:4, y:6, node:()=>'b7_c1_old', fresh:()=>!S.f.b7_c1_oldTried},
        {id:'qm', name:'The column\'s quartermaster', kind:'b2soldier', x:12, y:7, node:()=>'b7_c1_qm', show:()=>b71Ph() === 1, fresh:()=>!S.f.b7_c1_qm},
        {id:'marine', name:'A marine at the next fire', kind:'b2soldier', x:2, y:7, node:()=>'b7_c1_marine', show:()=>b71Ph() >= 2, fresh:()=>!S.f.b7_c1_fingerTried},
        {id:'crest', name:'A marine picket on the crest', kind:'b2soldier', x:9, y:8, node:()=>'b7_c1_crest', show:()=>b71Ph() >= 2, fresh:()=>!S.f.b7_c1_crest},
        {id:'dunes', name:'Shapes on a dune crest', kind:'b5_edur', x:13, y:8, node:()=>'b7_c1_dunes_start', show:()=>b71Ph() >= 2 && !!S.f.b7_c1_orders2 && !S.f.b7_c1_dunesDone, fresh:()=>true} ] },

    /* 16 x 12 (plain_night). , grass  . the coast road  # hedge  C the farm  R the tally-shed off the road  r a rock  x a post  F the lie-up
       < west, back toward the beach  > east, after the column */
    { id:'b7_c1_road', title:'The coast road', sub:'Night · a day\'s march inland', hint:'Tap ground to move · tap a figure to talk · the farm is west, the tally-shed east', decor:'plain_night', dark:true,
      map:[ "################",
            "#,,,,,#,,,,,,,,#",
            "#,C,,,,,,,,,R,,#",
            "#,,,,,,,,,,,,,,#",
            "<..............>",
            "#,,,,,,,,,,,,,,#",
            "#,,#,,,,,,,,,,,#",
            "#,,,,,,,,r,,,,,#",
            "#,,,,,F,,,,,,,,#",
            "#,,,,,,,,,,,#,,#",
            "#,,,x,,,,,,,,,,#",
            "################" ],
      walk:'.,', triggers:{C:'b7_c1_farm', R:'b7_c1_shed_view', F:'b7_c1_fire', '<':'b7_c1_road_back', '>':'b7_c1_road_east'}, start:{x:1, y:4},
      quest:()=> b71Ph() >= 5 ? (!b71DossSettled() ? 'There is a man at the pickets asking for the heavies.' : 'The lie-up. At dusk the column moves on.')
        : !S.f.b7_c1_orders3 ? 'The lieutenant, by the road.'
        : b71Strip() && !S.f.b7_c1_farmDone ? 'The farm to the west. The squad needs what the transport did not give it.'
        : b71Strip() && !S.f.b7_c1_ridersDone ? 'The riders on the road behind.'
        : !S.f.b7_c1_tallyDone ? 'The tally-shed, east of the road.' : 'The shed.',
      npcs:[
        {id:'lt', name:'The lieutenant', kind:'b2soldier', x:11, y:5, node:()=>'b7_c1_lt3', show:()=>b71Ph() === 3, fresh:()=>!S.f.b7_c1_orders3},
        {id:'barley', name:'Marines in the barley', kind:'b2soldier', x:4, y:2, node:()=>'b7_c1_barley', show:()=>b71Ph() === 3 || b71Ph() === 4, fresh:()=>!S.f.b7_c1_barley},
        {id:'riders', name:'Riders on the road', kind:'b4_c5_rider', x:8, y:4, node:()=>'b7_c1_riders_start', show:()=>b71Ph() === 3 && !S.f.b7_c1_ridersDone && !S.f.b7_c1_ridersPassed, fresh:()=>true},
        {id:'doss', name:'A man at the pickets', kind:'doss', x:3, y:8, node:()=>'b7_c1_doss', show:()=>b71Ph() >= 5 && (S.f.b7_dossDone == null || S.f.b7_dossDone === 2), fresh:()=>S.f.b7_dossDone == null},
        {id:'lt5', name:'The lieutenant', kind:'b2soldier', x:9, y:9, node:()=>'b7_c1_lt5', show:()=>b71Ph() >= 5, fresh:()=>!S.f.b7_c1_lt5} ] },

    /* 16 x 12 (b5_c5_farm, night). . the yard  , ash and weeds  # fieldstone walls  B the shed door  w the well  e the gate, back to the road */
    { id:'b7_c1_shed', title:'The coast road · the tally-shed', sub:'Night · the factor\'s outpost', hint:'Tap ground to move · the shed door is at the top of the yard · the gate is south', decor:'b5_c5_farm', dark:true,
      map:[ "################",
            "#....#....#....#",
            "#....#....#....#",
            "#....##BB##....#",
            "#..............#",
            "#,.............#",
            "#,.....w.......#",
            "#,.............#",
            "##............##",
            ",#,,...........#",
            ",,#,,..........#",
            ",,,,,,,ee,,,,,,," ],
      walk:'.,', triggers:{B:'b7_c1_book', w:'b7_c1_shed_well', e:'b7_c1_shed_out'}, start:{x:7, y:10},
      quest:()=> !S.f.b7_c1_bookBurned ? 'The shed. The tally-book is inside.' : 'The gate, and the road. Dawn is coming.',
      npcs:[
        {id:'clerk', name:'The tally-clerk', kind:'b5_c1_clerk', x:11, y:6, node:()=>'b7_c1_clerk', fresh:()=>!S.f.b7_c1_clerk} ] } ],

  battles:{
    /* an Edur patrol come down the coast to look at the fires */
    b7_c1_dunes:{title:'The dunes above the beach', style:'b5_c2_strand', dark:true, open:true, warrenText:'Night above the beach · the shadows are thick here, and something in them is awake', warren:{meanas:1, denul:1}, music:'battle',
      map:["#..t...#","........","..t..t..","........","...tt...","........",".t....t.","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_edur',2,1],['b7_edur',5,1],['b7_edurspear',3,2],['b7_edurspear',4,0]], xp:200, after:'b7_c1_dunes_after',
      preText:()=>`They are grey in the firelight off the sea, and they come down off the crest without a sound, spears first.`},
    /* Letherii riders on the coast road at night (optional on 'burn'; on 'strip' they catch the late squad) */
    b7_c1_riders:{title:'The coast road', style:'plain', dark:true, open:true, warrenText:'Night on the coast road · the column\'s mages have the air muddied for a league', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t.....","........","....t...","........",".t....t.","........","...t....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_lethsoldier',2,1],['b7_lethsoldier',5,1],['b7_lethsoldier',4,2],['b7_lethxbow',1,0],['b7_lethxbow',6,0]], xp:180, after:'b7_c1_riders_after',
      preText:()=>`The horses smell the smoke off the coast and will not come on. The riders come down off them and come on without them, which is braver, and slower.`},
    /* the factor's tally-shed and its guards: the main fight, two grounds */
    b7_c1_tally:{title:'The tally-shed', style:'b5_c5_farm', dark:true, warrenText:'Night at the factor\'s shed · a lamp in the window, and the warrens thin', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t..t..","........",".t....t.","........","...t....","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b7_factorman',2,1],['b7_factorman',5,1],['b7_factorman',4,3],['b7_lethsoldier',3,2],['b7_lethxbow',6,0]], xp:300, after:'b7_c1_tally_after',
      preText:()=>`The factor's men come out of the yard with cudgels and a lantern, and the two soldiers the factor pays to stand behind them come out behind them, as they are paid to.`,
      stage2:{title:'The shed door', xp:150,
        text:()=>`The yard is the Third's. The shed door is not. Somebody inside has barred it, and somebody inside is shouting orders in Letherii at people who are mostly lying in the yard, and then the door comes open and the shed's sergeant comes out of it with a sword and the last of his soldiers, because a shed with a lamp in it is the worst place in the world to be when the other side has munitions.${b71If('tangle', `\n\nTangle, with a hand in the satchel: "I was going to knock," he says.`)}`,
        map:["##.##.##","#......#","..t..t..","........","........","...t....","........","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b7_c1_shedsgt',3,1],['b7_lethsoldier',1,2],['b7_lethsoldier',6,2],['b7_factorman',4,3]]} } },

  foes:{
    /* the shed's sergeant: a Letherii soldier the factor hires by the season, with a better sword than his pay */
    b7_c1_shedsgt:{name:'The shed\'s sergeant', sig:'S', kind:'b5_letherii', hp:52, ac:16, atk:12, dmg:[1,10,4], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'cuts at'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b7_c1_charredcloak:{name:'A charred transport cloak', slot:'armour', role:'light', who:null, ac:1, hp:2,
      line:'A grey-green Malazan cloak of the heavy sea weave, scorched black along one edge where a spark came down on it in the boat the night the transports burned. It smells of the fire still, and always will. Whoever wears it stops noticing the smell after a week, and so does nobody else.'},
    b7_c1_factorblade:{name:'The factor\'s guard-sword', slot:'weapon', role:'blade', who:null, atk:1, dmg:[1,8,4],
      line:'A straight Letherii sword with a brass guard and the factor\'s mark stamped on the ricasso: a set of scales. The shed\'s sergeant kept it oiled and sharp, which is more than the factor paid him to. It is better steel than a coast road deserves.'},
    b7_c1_tallyash:{name:'A page of the tally-book', slot:'trinket', role:'any', who:null, stat:{wits:1},
      line:'One page saved out of the factor\'s burning tally-book, black at the edges and brown in the middle: a family\'s line of debts in a clerk\'s small hand, four generations of names, each owing what the last one owed and more. The last name on it is Doss. Whoever carries it reads the country a little better, and is reminded what the country owes.'} },

  scenes:{
    b7_c1_landing:{loc:'The Lether coast', sub:'The landing · night', cap:'The transports at anchor in a long line with a lamp at each stern, the boats run up on a pale beach, and marines going up the sand in the dark.', amb:'explore'},
    b7_c1_shed:{loc:'The coast road', sub:'A factor\'s tally-shed · night', cap:'A long fieldstone shed behind a yard wall off the coast road, a lamp in its one window, and the fields dark all round it.', amb:'explore'} },

  end:{
    burn:['On the lamp', 'The Fourteenth came across the sea behind an Edur fleet and put its marines ashore on the Lether coast, and burned the ships that brought them so there was no way back. The Third, lent to the Fist\'s column as heavies, fired its own transport on the lamp with the rest, and the column saw it done. A day inland a factor\'s tally-book went up in a shed by the road, and a farmhand who watched it burn walked into the camp the next night to ask what the Malazans pay.'],
    strip:['Last off the beach', 'The Fourteenth came across the sea behind an Edur fleet and put its marines ashore on the Lether coast, and burned the ships that brought them so there was no way back. The Third stripped its own transport before it fired her, and was the last ship to burn and the last squad off the beach, and the Letherii riders on the coast road found it alone. It took the rest of what it needed from a farm. A day inland a factor\'s tally-book went up in a shed by the road, and a farmhand who watched it burn walked into the camp the next night to ask what the Malazans pay.'] },
  endScene:'b7_coast_night',
  endCap:()=> b71Key() === 'strip' ? 'The Lether coast at dusk, the hulks still smoking along the water, and a file of soldiers going inland with full packs.' : 'The Lether coast at dusk, the hulks still smoking along the water, and a file of soldiers going inland with nothing behind them.',
  tease:'Next: Letheras. The Sixth Company, the Edur at the barracks gate, and a file at the Patriotists with your names in it.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b7_c1_key === 'burn') x.push('The Third fired its own transport on the lamp with the rest of the line. The column saw it done.');
    if (f.b7_c1_key === 'strip') x.push(`The Third stripped its transport before it fired her, and was late off the beach.${f.b7_c1_farmDone ? ' The rest of its stores came from an Indebted farm on the coast road.' : ''}`);
    if (f.b7_c1_bookBurned) x.push('A factor\'s tally-book burned in a shed on the coast road. Lether noticed.');
    if (f.b7_dossDone === 1) x.push(b7In('doss') ? 'Doss, an Indebted farmhand off the factor\'s holding, walks with the Third, with his flail.' : 'Doss, an Indebted farmhand off the factor\'s holding, walks with the Third.');
    if (f.b7_dossDone === 2) x.push('Doss, an Indebted farmhand, waits with the column\'s camp followers, if the squad will have him.');
    if (f.b7_dossDone === 0) x.push('Doss, an Indebted farmhand, went back to the factor\'s fields.');
    if (f.b7_c1_fingerOk) x.push('A marine of the column taught the Third the night signs.');
    if (f.b7_c1_ridersDone) x.push('Letherii riders on the coast road met the Third and did not ride on.');
    if (f.b7_c1_ridersPassed) x.push('Letherii riders went by on the coast road without knowing the column was in the fields either side of them.');
    if (f.b7_c1_clerk === 'freed') x.push('The factor\'s tally-clerk went home with a story about Malazans.');
    if (f.b7_c1_clerk === 'tied') x.push('The factor\'s tally-clerk was left tied in his shed for the factor\'s people to find.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b7_dossDone != null && 'A farmhand named Doss walked into the camp the night after the tally-shed and asked what the Malazans pay.',
    f.b7_c1_bookBurned && 'The Third burned a factor\'s tally-book: every debt for a day\'s ride around, four generations of some of them.',
    f.b7_c1_tallyDone && 'A factor\'s tally-shed on the coast road, guarded by his men and two soldiers he hired. Not any more.',
    f.b7_c1_ridersDone && 'Letherii riders on the coast road, at night.',
    f.b7_c1_dunesDone && 'An Edur patrol came down the dunes to look at the burning. The first Edur the Third has seen close.',
    f.b7_c1_why && 'The Adjunct told her officers that what the army does here will be unwitnessed. A runner off the flagship had it from them.',
    f.b7_c1_key && (f.b7_c1_key === 'burn' ? 'The transports burned all along the shore, the Third\'s with them, on the lamp.' : 'The transports burned all along the shore. The Third\'s burned last, after the squad stripped her.'),
    'The Third is lent to Fist Keneb\'s column as a squad of heavies, ashore on the Lether coast with the marines.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the landing beach ======== */
    b7_c1_start:()=>({sp:'The beach', scene:'b7_c1_landing', fx:()=>{ S.f.b7_c1_ph = S.f.b7_c1_ph || 1; }, again:()=>'The beach, the boats at the waterline, and the transports riding at anchor beyond them with their lamps lit.', txt:
`The boat grinds up onto sand in the dark, and the marines are over the side before it has stopped. The Third is not. Heavies go over the side the way they do everything, in order, and with more noise than anybody wants.

The beach is long and pale and runs away north and south into nothing. Behind it are dunes, and behind the dunes is a country nobody in the Fourteenth has seen. Out on the water the transports ride at anchor in a long line with a lamp at each stern, and further out are the warships of the fleet, which are going somewhere else.

${b71Say({haddat:`Haddat wades the last of it with the blue shield held up out of the water, and stands on the sand a breath. "Lether," she says, trying the word. She has not had to say it before.`, marrow:`Marrow is handed down out of the boat by two marines who do not ask first. "Sand again, child," she says. "They keep it on every shore."`, _:`The squad stands on the sand and works out which way is up the beach.`})}${b71If('tangle', `\n\nTangle comes ashore with the satchel held over his head in both hands like a temple relic, and counts it on the sand before he counts anyone.`)}${b71If('mirrel', `\n\nMirrel is already crouched by the boat. "Boots off, then on again. Wet feet on a march is blisters by morning. Sit. Good."`)}

Up the beach a voice is calling the squads by name, and one of the names is not a name: "Heavies. The borrowed heavies. To me."`,
      ch:[{t:'The lieutenant.', go:'b7_c1_lt'},
          {t:'Walk the beach.', go:()=>startExplore()}]}),

    /* the lieutenant of the marine company the Third is lent to: the orders for the night */
    b7_c1_lt:()=>({sp:'The lieutenant', scene:'b7_c1_landing', fx:()=>{ S.f.b7_c1_orders1 = 1; }, again:()=>'The lieutenant, with her slate. "When the lamp goes up, Sergeant."', txt:
`The lieutenant of the marine company the Third has been lent to is a narrow, sunburned woman with a crossbow on her back and a slate in her hand. She looks the Third over, all of it, and then looks at the slate, as if one of the two might be wrong.

"Sergeant. You're mine till the Fist says otherwise." She points the slate at the line of lamps on the water. "When the lamp goes up on the flagship, every crew fires its own ship. Yours is third from the north end. Your boat goes back out with a sapper's pot for the hold and comes back without the ship."

"Then up into the dunes. We move at night from now on, and we sleep by day, and you'll get used to it. My lot already have." She tucks the slate under her arm. "Heavies. The Fist asked for a squad that can stand in a doorway. I hope you can stand in a doorway."`,
      ch:[{t:'"Burn them, Lieutenant? All of them?"', go:'b7_c1_lt_why'},
          {t:'"We can stand in a doorway."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c1_lt_why:()=>({sp:'The lieutenant', scene:'b7_c1_landing', fx:()=>{ S.f.b7_c1_why = 1; }, txt:
`"All of them. The Fist's order." She watches the lamps a while. "A runner came off the flagship at dusk with a word from the Adjunct to her officers. What we do here, she told them, nobody will see. Not the Empress. Not the histories. Unwitnessed, was her word." She shrugs. "The runner said it better than me. He'd had it from somebody who'd had it from somebody who was there."

"So. No ships, no way back, and nobody watching." She almost smiles. "Bonehunters don't go back, Sergeant. That's the short of it."${b71If('tangle', `\n\nBehind you Tangle says, "Wasn't planning to," quietly, to the satchel.`)}${b71If('haddat', `\n\nHaddat repeats the Adjunct's word under her breath, the way she repeats the names of the dead. It sounds like one of them.`)}`,
      ch:[{t:'"Yes, Lieutenant."', go:()=>startExplore()}]}),

    /* an old soldier of the 9th, who came over with the dispatches and goes back with the last pinnace: the Deck's third reader */
    b7_c1_old:()=>({sp:'An old soldier of the 9th', scene:b71Ph() === 1 ? 'b7_c1_landing' : 'b7_coast_night', again:()=>'The old soldier of the 9th, on his bucket, with his cup. "Last pinnace before dawn," he says. "Not you."', txt:
`An old soldier of the 9th sits on an upturned bucket by the waterline with a cup in his hand. He came over in the Third's boat with the captain's dispatches, and he goes back to the fleet with the last pinnace before dawn, and he is the only soldier on this beach who is going back anywhere. Behind the 9th's cook-lines he reads the Deck for a finger of rum.

"Edur," he says, before you have said anything. "The sailors who chased their fleet say they fight in fours, and the dark helps them. Grey as ash. Long spears." He turns the cup. "Never fought one. Don't mean to start. That's your end of it now."`,
      ch:[{t:'Ask him what the sailors said about fighting them.', check:['wits', 15], req:()=>!S.f.b7_c1_oldTried,
            edges:id=>[id === 'sgt' && ['you have bought his rum before', 1], id === 'haddat' && ['she listens politely, and old soldiers talk to polite people', 1], id === 'rasp' && ['marine-trained: she knows what to ask a man about ground', 2], id === 'mehet' && ['he listens to an old man the way a townsman does', 1], id === 'tallow' && ['he talks over the answers', -1], id === 'sathi' && ['she grins at him, and he loses the thread', -1]],
            near:{t:()=>`Yes, but he wants a story back for every one he gives, and ${b71Nm(b71Who())} ${b71V(b71Who(), 'are', 'is')} still telling them when the lamp goes up: rattled.`, fx:()=>b71Rattle(b71Who())},
            fx:()=>{ S.f.b7_c1_oldTried = 1; }, go:'b7_c1_old_ok', fail:'b7_c1_old_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c1_old_ok:()=>({sp:'An old soldier of the 9th', scene:b71Ph() === 1 ? 'b7_c1_landing' : 'b7_coast_night', fx:()=>{ S.f.b7_c1_duneWarned = 1; }, txt:
`"Ground," he says. "The sailors said it was always ground with them. The Edur came along the top of a mole at them, along the high line, and saw everything coming." He draws a hump in the sand with his finger and pokes a hole at the bottom of it. "They watch a crest like a hawk watches a field. Come at them from under it, out of the hollow, and they've got to come down to you to see you."

He holds out the empty cup, in case.`,
      ch:[{t:'Back to the beach.', go:()=>startExplore()}]}),
    b7_c1_old_no:()=>({sp:'An old soldier of the 9th', scene:b71Ph() === 1 ? 'b7_c1_landing' : 'b7_coast_night', txt:
`He tells a long story about a sailor he once shared a cell with in Kartool, who had a cousin who had seen a Tiste Edur, or a very tall Seti. It has no end that he can find.

"Grey," he says finally. "That's what they all say. Grey." He holds out the cup.`,
      ch:[{t:'Back to the beach.', go:()=>startExplore()}]}),

    /* the column's quartermaster: salves for silver, and no wagon behind him */
    b7_c1_qm:()=>({sp:'The column\'s quartermaster', scene:'b7_c1_landing', fx:()=>{ S.f.b7_c1_qm = 1; }, again:()=>'The column\'s quartermaster, on his crate. "Four silver. There\'s no wagon behind us."', txt:
`The column's quartermaster is a marine with a crate of field salves under him on the sand, sitting on it so that it cannot be issued by accident.

"Four silver," he says. "And don't tell me the 9th gets them free, Sergeant, because the 9th is out there on the water and you're in here with me. The column carries what it carries." He looks at the line of transports. "There's no wagon behind us. There's no anything behind us, after tonight."`,
      ch:[{t:'A salve.', tag:'4 silver', req:()=>(S.silver || 0) >= 4, fx:()=>{ S.silver -= 4; S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for four silver.', 'good'); }, go:'b7_c1_qm'},
          {t:'Talk him down. ("After tonight, what is silver for?")', check:['guile', 15], req:()=>(S.silver || 0) >= 2 && !S.f.b7_c1_haggle,
            edges:id=>[id === 'sgt' && ['you have argued with quartermasters for years', 1], id === 'rasp' && ['marine-trained: she knows what a marine quartermaster skims', 2], id === 'tallow' && ['he talks too much, and some of it lands', 1], id === 'darrut' && ['the Aren Guard knew every quartermaster\'s trick', 1], id === 'haddat' && ['she is too formal to haggle', -1], id === 'ottar' && ['he does not yet have the Malazan for it', -2]],
            near:{t:()=>`Yes, but he makes ${b71Nm(b71Who())} carry two of his crates up into the dunes for the price, and the crates take the hour the squad would have had by the fire. No rest at the first halt.`, fx:()=>{ S.f.b7_c1_rest2 = 1; }},
            fx:()=>{ S.f.b7_c1_haggle = 1; }, go:'b7_c1_qm_haggled', fail:'b7_c1_qm_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c1_qm_haggled:()=>({sp:'The column\'s quartermaster', scene:'b7_c1_landing', fx:()=>{ S.silver = Math.max(0, (S.silver || 0) - 2); S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for two silver.', 'good'); }, txt:
`He thinks about that. It plainly troubles him. He looks out at the ships, and then down at the silver, and then at the ships again.

"Two," he says. "And it's for afterwards. There'll be an afterwards. There has to be, or what's the point of a quartermaster."`,
      ch:[{t:'Back to the beach.', go:()=>startExplore()}]}),
    b7_c1_qm_no:()=>({sp:'The column\'s quartermaster', scene:'b7_c1_landing', txt:
`"Silver's for afterwards," he says. "Four, Sergeant. Afterwards, it'll be more."`,
      ch:[{t:'Back to the beach.', go:()=>startExplore()}]}),

    /* the waterline: the key, when the lamp goes up */
    b7_c1_boats:()=>{ const k = b71Key();
      if (!S.f.b7_c1_orders1) return {sp:'The waterline', scene:'b7_c1_landing', txt:
`The boats are drawn up at the waterline with their crews sitting by them, looking out at the transports. The lieutenant is up the beach calling for the heavies. She will want to see you before anybody rows anywhere.`,
        ch:[{t:'Back up the beach.', go:()=>startExplore()}]};
      if (k) return {sp:'The waterline', scene:'b7_coast_burning', again:()=>'The waterline, and the ships burning beyond it.', txt:
`The transports burn all along the water, and the beach is lit gold from end to end by them. ${k === 'strip' ? 'The Third\'s is still burning hardest, at the north end, because it was the last to go.' : 'The Third\'s burns with the rest, third from the north end, as ordered.'} The boats are drawn up on the sand again with nothing left to row out to.`,
        ch:[{t:'Up into the dunes.', onward:true, go:'b7_c1_above'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'The waterline', scene:'b7_c1_landing', html:risingHTML(), txt:
`Far out, a lamp goes up the flagship's mast, red, and holds there.

All along the beach the boat crews stand. A sapper comes down the line with a bag of clay pots, fuses in their necks, and gives one out to each boat, as if handing out bread. Third from the north end, the transport that brought the Third from Malaz City rides at her anchor with her stern lamp lit. There is still a hold of stores in her that nobody had time to bring ashore: water, salt pork, the squad's spare salves, a crate of sharpers the sappers missed.

The lieutenant is watching the line. The order is to fire them together, on the lamp.${b71If('tangle', `\n\nTangle is looking at the transport. "Crate of sharpers in her forward hold," he says. "Counted it on the way over. Twice."`)}${b71If('haddat', `\n\n"It is the order, Sergeant," Haddat says. She does not say which way she would take it.`)}${b71If('marrow', `\n\nMarrow sniffs. "The salves are in the after hold, child. If anybody is asking."`)}${b71If('ottar', `\n\nOttar watches the flagship's lamp. "In Perish," he says carefully, "a ship is not burned while it floats. Here, I see, it is." He seems to file it away with the day's word.`)}`,
        ch:[{t:'Fire her with the rest. On the lamp.', fx:()=>{ S.f.b7_c1_key = 'burn'; b71L('haddat', 1); b71L('mirrel', 1); b71L('tangle', -1); }, go:'b7_c1_burn'},
            {t:'Strip her first. The stores, then the pot. We will be late.', fx:()=>{ S.f.b7_c1_key = 'strip'; S.f.b7_c1_late = 1; b71L('tangle', 1); b71L('marrow', 1); b71L('haddat', -1); }, go:'b7_c1_strip'},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b7_c1_burn:()=>({sp:'The waterline', scene:'b7_c1_landing', txt:
`The boat goes out with four at the oars and the pot in ${b71Say({tangle:'Tangle\'s lap', rasp:'Rasp\'s lap', _:'the bow'})}, and comes alongside, and somebody goes up the side and down into the hold with it and comes back up faster than they went. The fuse is a red eye in the dark below the hatch. Then oars, and the beach.

Halfway in, the whole line catches together, as if somebody had drawn a match along it.

Up the beach the lieutenant watches the Third's ship go up on the lamp with the rest and makes a mark on her slate. It is the first mark she has made beside the Third's name. It might be a good one.${b71If('tangle', `\n\nTangle watches the forward hold go. "Two sharpers," he says, to nobody in particular. "Just so somebody said it."`)}`,
      ch:[{t:'Ashore, and look back.', go:'b7_c1_burning'}]}),
    b7_c1_strip:()=>({sp:'The waterline', scene:'b7_c1_landing', fx:()=>{ S.inv.sharper = (S.inv.sharper || 0) + 2; S.inv.salve = (S.inv.salve || 0) + 1; note('Out of the transport\'s holds: two sharpers and a salve.', 'good'); }, txt:
`The boat goes out with every hand at the oars, and the Third goes up the side and down into the holds by the light of a shuttered lantern, and hauls.

The forward hold is half under water. The sharpers are there, in their crate, with the water a hand below them. The after hold gives up one jar of salve before the stores turn out to have been broached by somebody else on the voyage, which is a sailor's crime and none of the Third's business now. The pork is spoiled. The water casks are too heavy to lift into a boat in the dark.

All along the line the other transports catch together on the lamp while the Third is still in its ship's belly, and the light comes down through the hatch, gold and then white. The pot goes in last. The Third's transport burns alone, a long count after the rest, and the whole beach can see it.${b71If('tangle', `\n\nTangle sits in the bottom of the boat with the crate in his lap and both arms round it. "Two," he says. "Two is two."`)}

Up the beach the lieutenant is looking at the one late ship. She does not make a mark on her slate. You would have preferred the mark.`,
      ch:[{t:'Ashore, and look back.', go:'b7_c1_burning'}]}),
    b7_c1_burning:()=>({sp:'The burning', scene:'b7_coast_burning', fx:()=>{ if (!S.f.b7_c1_burned) { S.f.b7_c1_burned = 1; gain('b7_c1_charredcloak'); } S.f.b7_c1_ph = Math.max(2, S.f.b7_c1_ph || 1); }, again:()=>'The ships burning all along the shore, and the column with its back to them.', txt:
`They burn all along the shore.

A transport takes a long time to burn. The fire goes up the rigging first and the sails go in one breath each, a sheet of light and then nothing; then the decks, then the holds, and the masts stand up out of it like burning trees, and one by one they lean and go down into the sea with a hiss you can hear on the beach. The light lies on the water in long gold roads. The smoke goes up into the low cloud and spreads, and the underside of the cloud glows.

The marines go up the beach with their backs to it. Most of them do not look round. Down the line a voice the Third knows from Raraku, the Fist's, says "Inland. Squads, inland," without raising itself, and the column goes.${b71Say({haddat:`\n\nHaddat stands with the blue shield on her arm and watches until the Third's own ship is down to its ribs. Then she turns her back on it with the others.`, marrow:`\n\nMarrow watches with her string in her fingers. "No ships, child," she says. "Well. I never liked them."`, _:''})}

A spark came down on ${b71Say({tangle:'Tangle\'s', mirrel:'Mirrel\'s', haddat:'Haddat\'s', _:'somebody\'s'})} cloak in the boat, and the edge of it is charred black and still smoking. It is a better cloak for it, somehow. It goes in the kit.`,
      ch:[{t:'Up into the dunes.', onward:true, go:'b7_c1_above'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 2: the first halt above the beach ======== */
    b7_c1_above:()=>({sp:'Above the beach', scene:'b7_coast_night', fx:()=>{ S.f.b7_c1_ph = Math.max(2, S.f.b7_c1_ph || 1); }, again:()=>'The column\'s first halt in the dunes above the beach, the smoke lying along the water below.', txt:
`The column halts in the dunes above the beach, in the hollows out of the wind. Below, the ships are burning down to the waterline, and the smoke lies along the water in a long brown bank that will be there at dawn.

The lieutenant lets the squads light small fires in the hollows. Tonight the whole coast is lit anyway, she says, and after tonight there will be no fires at all, so warm your hands while you can.${b71Say({mirrel:`\n\nMirrel is counting the squad's salves into her bag in threes. "Three, six," she says. "And a jar." She looks at the jar for some time.`, marrow:`\n\nMarrow lowers herself onto the sand in a hollow and sets her bag between her feet. "Sit, child," she says. "Before the Fist thinks of something."`, _:''})}`,
      ch:[b7ReadChoice(1),
          {t:'The fire.', go:'b7_c1_fire'},
          {t:'The lieutenant.', go:'b7_c1_lt2'},
          {t:'Walk the dunes.', go:()=>startExplore()}]}),
    b7_c1_read:()=>b7ReadOffer(1),
    b7_c1_card:()=>b7ReadCard(1),

    /* the lieutenant, at the first halt: the Edur patrol in the dunes */
    b7_c1_lt2:()=>({sp:'The lieutenant', scene:'b7_coast_night', fx:()=>{ S.f.b7_c1_orders2 = 1; }, again:()=> S.f.b7_c1_dunesDone ? 'The lieutenant, by her fire. "Rest an hour. Then we go."' : 'The lieutenant, by her fire. "The dunes, Sergeant. East."', txt:
`The lieutenant is crouched by her own squad's fire with the slate on her knee, writing in the light of the ships. ${b71Key() === 'strip' ? 'She looks up at you, and then at the Third\'s full packs, and then back at the slate.' : 'She looks up at you and nods.'}

"Edur," she says. "A patrol, four or five, came down the coast to see what the light was. My pickets saw them on a dune crest east of here and let them be, because my pickets are clever and want to live." She points with the stylus. "The column moves in an hour. I don't want them following it. Heavies like a fight, I'm told."

"Then rest. Then inland."`,
      ch:[{t:'"East. Yes, Lieutenant."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the fire: by phase. 1 laid and not lit, 2 the first halt, 3 and 4 on the march (no fire), 5 the cold lie-up. The games pass wraps this node: keep the id */
    b7_c1_fire:()=>{ const ph = b71Ph();
      if (ph === 1) return {sp:'The Third\'s fire', scene:'b7_c1_landing', txt:
`A fire is laid in a hollow below the dunes, wood off the boats and dry weed, and not lit. No light on the beach until the lamp goes up, the lieutenant said. After that, she said, nobody will notice one more.`,
        ch:[{t:'Talk with the squad.', go:'b7_c1_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      if (ph === 3 || ph === 4) return {sp:'The coast road', scene:'b7_march_night', txt:
`No fire on the march. The column does not stop, and the Third, which is heavier than the marines round it, does not get to stop either.`,
        ch:[{t:'Talk with the squad.', go:'b7_c1_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      const camp = ph >= 5, rk = 'b7_c1_rest' + (camp ? 5 : 2);
      return {sp:camp ? 'The lie-up' : 'The Third\'s fire', scene:camp ? 'b7_camp_night' : 'b7_coast_night', html:risingHTML(),
        again:()=> camp ? 'The Third\'s lie-up under the hedge. No fire. The squad sits where a fire would be.' : 'The Third\'s fire in its hollow, burning boat-wood, with the ships burning below.', txt:
`${camp ? `The Third's fire in the lie-up is not a fire. The column lights none by day and none by night now, so the squad sits under its hedge in a ring round the place where a fire would be, out of habit, and passes the water skin round it instead.${S.f.b7_dossDone === 1 && b7In('doss') ? `\n\nDoss sits a little outside the ring with the flail across his knees, watching the Malazans sit round nothing. He seems to find it reasonable.` : ''}` : `The Third's fire in its hollow is boat-wood and dry weed, and it burns blue at the edges from the salt. Below the dune the transports are burning down to the water, and their light comes up over the crest and puts the squad's shadows on the sand behind them, long, all pointing inland.`}${b71Say({marrow:`\n\nMarrow has her knotted string out and is running it through her fingers.`, haddat:`\n\nHaddat is oiling the blue shield's straps against the salt.`, _:''})}`,
        ch:[...(camp ? [] : [b7ReadChoice(1)]),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(camp ? 'The squad sleeps the day through under its hedge, in turns. Wounds close, mostly.' : 'The squad sits an hour by the boat-wood fire. Wounds close, mostly.'); }, go:'b7_c1_fire_rest'},
            {t:'Talk with the squad.', go:'b7_c1_fire_talk'},
            {t:'Inland. The column moves.', req:()=>ph === 2 && !!S.f.b7_c1_dunesDone, onward:true, go:'b7_c1_inland'},
            {t:'Dusk. On with the column.', req:()=>camp && b71DossSettled(), onward:true, go:'b7_c1_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c1_fire_rest:()=>({sp:'The Third\'s fire', scene:b71Ph() >= 5 ? 'b7_camp_night' : 'b7_coast_night', txt:
`${b71Ph() >= 5 ? 'The day, then, under the hedge, with the sun going over and the column asleep in its cloaks across three fields and a wood, and the pickets awake.' : 'An hour, then, with the boat-wood burning blue and the ships burning gold below.'}

${b71Say({marrow:`Marrow goes round the squad with her hands, and stops at each of them long enough to frown. "Salt," she says. "In every cut, child." She closes one anyway.`, mirrel:`Mirrel goes round the squad with the water skin, one mouthful each, and watches each one swallow. "Drink. Good."`, _:'Some of them sleep. The rest watch the light.'})}${b71If('haddat', `\n\nHaddat lies down with her head on her pack and says names under her breath, the dead of Hissar and the Chain and the road since, and Y'Ghatan's. She has not run out.`)}${b71If('tangle', `\n\nTangle sleeps with the satchel under his head and the fuse-cord round both wrists.`)}`,
      ch:[{t:'Back to the fire.', go:'b7_c1_fire'}]}),
    b7_c1_fire_talk:()=>{ const ph = b71Ph(), camp = ph >= 5, ln = [];
      if (b7In('haddat')) ln.push(camp ? `Haddat is looking out under the hedge at the fields. "My mother said a farm is a debt you can stand on," she says. "I did not know what she meant. I think they would know what she meant, here."` : `Haddat is looking down at the ships. "My mother said you never burn a boat you might need," she says. "She sold water. She knew about needing things." She turns her back on the light. "The Adjunct did not ask my mother."`);
      if (b7In('sathi')) ln.push(camp ? `Sathi is lying in the hedge-bottom with her filed teeth showing. "Sleeping in the day," she says. "Weasels did it for years. Nobody else in this army knows how. Watch them twitch."` : `Sathi is watching the ships go down and grinning at them. "No way back," she says. "Good. I never liked going back. It's the same road."`);
      if (b7In('tangle')) ln.push(camp ? `Tangle has the satchel open in his lap and is counting by daylight, which he finds restful. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}." He touches the Kanese bead at his wrist. "No resupply. I keep saying it so I'll believe it."` : `Tangle is counting the satchel by the light of the ships. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}." He closes it. "That's all there is in the world now. That and the marines', and they won't share."`);
      if (b7In('marrow')) ln.push(camp ? `Marrow is tying a slow knot in her string. "The column's mages are at it again, child," she says. "Mockra. Somebody is telling the whole countryside we are a hedge." She draws the knot tight. "It is a good lie. I would believe it."` : `Marrow is warming her knuckles at the fire. "Soliel has no temple on this shore, child," she says. "I asked the warren. It was polite. It was far away." She sniffs. "We will manage. We always have."`);
      if (b7In('mirrel')) ln.push(camp ? `Mirrel is rolling her linen. "Sleep by day, march by night, eat cold," she says. "In Li Heng that was a fever ward. Here it's an army." She ties the roll. "I don't see the difference yet."` : `Mirrel is looking at the jar of salve, then at the squad, then at the jar. "There's no hospice in the next town," she says. "There's no next town that's ours." She puts the jar away. "Don't get cut."`);
      if (b7In('tallow')) ln.push(`Tallow has his grandmother's deck in its oilcloth and is not opening it. "She said never read with your back to the sea," he says. "She never said anything about the sea being on fire."`);
      if (b7In('hessa')) ln.push(`Hessa sits straight with the spear upright. "D'rek is under every shore," she says. "Under this one too." She puts her palm flat on the sand. "Further down, here. But there."`);
      if (b7In('tebbet')) ln.push(`Tebbet is waxing his bowstring against the salt. "The marines carry crossbows," he says. "Every one." He sights along the string. "They look at my bow like I brought a stick."`);
      if (b7In('darrut')) ln.push(`Darrut has his helm on his knee. "The Aren Guard never went anywhere it could not walk back from," he says. He looks at the ships. "I suppose that was the point of the Aren Guard."`);
      if (b7In('yorin')) ln.push(`Yorin has his copper wind-vane flat on his palm. The little arrow swings round and points out to sea, where the smoke is going. "Serc likes a fire," he says. "Too much, tonight."`);
      if (b7In('rasp')) ln.push(`Rasp is watching the marines at the next fire with a professional eye. "They're good," she says. "Better than the ones who trained me." She checks a fuse. "Don't tell them I said."`);
      if (b7In('orvas')) ln.push(`Orvas is looking north along the coast. "The Burned Tears are with the fleet," he says. "With the Adjunct. Somewhere out there." He pulls a strap tight. "I am here. I keep finding that I am here."`);
      if (b7In('redblade')) ln.push(`Ramin is scraping salt out of the links of his scale with a thumbnail. "No horses," he says. "The Red Blades would not have believed it. An army that walks into a country with no horses and no ships." He keeps scraping. "I am not sure I believe it."`);
      if (b7In('warlock')) ln.push(`Keth sits facing the burning with his knees drawn up. "*Fire on the water,*" the grandmother says, out of his mouth. "*My mother's mother told of that, boy. It ended badly for everybody.*"`);
      if (b7In('mehet')) ln.push(`Mehet is turning his ring of keys over, one at a time. "In Y'Ghatan we burned the city behind us," he says. "Here they burn the ships." He holds up a key to the firelight. "Malazans are very thorough about doors."`);
      if (b7In('ottar')) ln.push(`Ottar is cleaning the wolf on his shield with a thumb. "Today's word," he says, "is *unwitnessed*. The lieutenant's runner said it." He tries it again, slowly. "In Perish we have a better word. It means the same, and it is longer."`);
      if (b7In('doss')) ln.push(`Doss is watching the squad, one by one, the way he might watch new cattle. "Do Malazans own their own boots?" he asks. Somebody says yes. He thinks about that. "Then that's the first thing," he says.`);
      return {sp:camp ? 'The lie-up' : 'The Third\'s fire', scene:ph === 1 ? 'b7_c1_landing' : ph >= 5 ? 'b7_camp_night' : ph >= 3 ? 'b7_march_night' : 'b7_coast_night', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b7_c1_fire'}]}; },

    /* a marine at the next fire: the night signs (the trick) */
    b7_c1_marine:()=>({sp:'A marine of the column', scene:'b7_coast_night', again:()=> S.f.b7_c1_fingerOk ? 'The marine at the next fire, who taught the Third its hands. A fist, held up: hold.' : 'The marine at the next fire, watching the heavies talk out loud.', txt:
`A marine at the next fire over has been watching the Third pass an order down its file the usual way, by saying it, and wincing each time.

"In the dark," she says, when you look over, "we don't talk. Not a word. Watch." She holds up a fist: *hold.* Two fingers pointed past your ear: *there.* The flat of a hand pressed down: *low.* Then a finger hooked and drawn across the palm, quick. "That one. All of you. Now." She shrugs. "Six crossbows on one man and nobody said a thing. If you're walking with us you'd better learn it, heavies, or you'll be the loud ones the Edur find first."`,
      ch:[{t:'Learn the signs, all of them, before the column moves.', check:['wits', 17], trick:'b7_c1_fingertalk', req:()=>!S.f.b7_c1_fingerTried, fx:()=>{ S.f.b7_c1_fingerTried = 1; },
            edges:id=>[id === 'rasp' && ['marine-trained: she knows half of them already', 3], id === 'tangle' && ['sappers sign at the fuse-end all the time', 1], id === 'orvas' && ['the Khundryl sign across a field at the gallop', 1], id === 'haddat' && ['she has been watching them do it for a month', 1], id === 'sgt' && ['you have been watching too', 1], id === 'tallow' && ['he cannot keep his mouth shut long enough to use his hands', -1], id === 'ottar' && ['his gauntlets are not made for it, and he is still on the words', -1], id === 'darrut' && ['the Aren Guard shouted its orders and was proud of it', -1]],
            near:{t:()=>`Yes, but she makes the squad practise until the ships are down to embers, and ${b71Nm(b71Who())} ${b71V(b71Who(), 'go', 'goes')} inland with the signs still twitching in the fingers: rattled.`, fx:()=>b71Rattle(b71Who())},
            go:'b7_c1_finger_ok', fail:'b7_c1_finger_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c1_finger_ok:()=>({sp:'A marine of the column', scene:'b7_coast_night', fx:()=>{ S.f.b7_c1_fingerOk = 1; }, txt:
`By the time the ships are down to their ribs ${by({sgt:'you can', rasp:'Rasp is correcting the marine on two of them, and', _:'{who} can'})} put the whole file of the Third onto a dune-top with the hands alone, and back, and onto the next one.

"Good," the marine says, without enthusiasm, which from a marine is praise. "Now you're only loud when you walk."`,
      ch:[{t:'Back to the fire.', go:'b7_c1_fire'}]}),
    b7_c1_finger_no:()=>({sp:'A marine of the column', scene:'b7_coast_night', txt:
`It is a lot of hands. The fist and the two fingers come easily, and then *low* gets mixed up with *wait*, and *that one* comes out, by the marine's reading, as *I have lost a boot.*

"Took me a year," she says. "You had an hour." She goes back to her own fire.`,
      ch:[{t:'Back to the fire.', go:'b7_c1_fire'}]}),

    /* a marine picket on the crest, counting the ships down */
    b7_c1_crest:()=>({sp:'A marine picket', scene:'b7_coast_night', fx:()=>{ S.f.b7_c1_crest = 1; }, again:()=>'The picket on the crest, counting hulks.', txt:
`A marine lies on the crest of the dune above the halt with a crossbow beside him, watching the beach and the sea and, mostly, the ships going down. He is counting them under his breath.

"Nineteen," he says, when you get down beside him. "Twenty. That's yours, third from the north. Just went." He watches the masts lean. "My grandfather was a shipwright in Malaz City. He'd have something to say." He sights along the crossbow at nothing, out of habit. "He'd say it to the Fist, though. Not to me."${b71Say({haddat:`\n\nHaddat lies down on the crest beside him and watches the last of the Third's ship go. Then she says a word under her breath, the one she says for the dead she has no name for.`, tangle:`\n\nTangle lies down on the crest and watches the forward hold go. "Two sharpers," he says, "in there, if anyone wanted to know."`, _:''})}`,
      ch:[{t:'Back down into the hollow.', go:()=>startExplore()}]}),

    /* the Edur patrol in the dunes */
    b7_c1_dunes_start:()=>({sp:'The dunes', scene:'b7_coast_night', txt:
`East of the halt, three dunes over, there are four of them on a crest against the light of the ships: tall, still, grey in the gold light, with long spears. Tiste Edur. They are watching the beach and the burning, and they have not yet looked down into the hollows where the column is.${S.f.b7_c1_duneWarned ? `\n\nThe old soldier's sailors were right. They are watching along the crest, and only along it.` : ''}${b71If('haddat', `\n\nHaddat studies them over the sand. "They are taller than the stories," she says.`)}${b71If('marrow', `\n\nMarrow's hand has gone to her string. "There is a warren on them, child," she says. "Old, and dark. Mind the shadows near them."`)}`,
      ch:[{t:'"Third! Up the dune!" Straight at them.', go:()=>startBattle('b7_c1_dunes', {})},
          {t:'Under the crest, out of the hollow, quiet.', check:['guile', 15],
            edges:id=>[S.f.b7_c1_duneWarned && id === 'sgt' && ['the old soldier told you how', 2], id === 'sathi' && ['she crept up on Odhan camps for the Weasels', 2], id === 'tebbet' && ['he was taught to be a long way off and unseen', 1], id === 'rasp' && ['marine-trained, she moves like one', 1], id === 'mehet' && ['he grew up keeping out of sight', 1], id === 'darrut' && ['an Aren Guard\'s kit was not made for creeping', -1], id === 'ottar' && ['grey plate in sand is a bell', -2]],
            near:{t:()=>`Yes, but the sand slides out from under ${b71Nm(b71Who())} halfway up, and ${b71Nm(b71Who())} ${b71V(b71Who(), 'go', 'goes')} down hard on a buried timber off some older wreck. ${b71Nmc(b71Who())}'ll feel it in the fight.`, fx:()=>bruise(b71Who(), bruiseN())},
            go:()=>startBattle('b7_c1_dunes', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c1_dunes_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c1_dunes_seen:()=>({sp:'The dunes', scene:'b7_coast_night', txt:
`Halfway up the hollow a buckle catches the light off the ships. Four grey heads turn together, and the spears come down level.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b7_c1_dunes', {surprise:'e'})}]}),
    b7_c1_dunes_after:()=>({sp:'The dunes', scene:'b7_coast_night', fx:()=>{ S.f.b7_c1_dunesDone = 1; }, txt:
`The crest is the Third's. The Edur on it are past caring who holds it.

Close to, in the light of the ships, they are taller than any of the squad, and grey, the grey of ash or old pewter, and their faces are very still even now. Their spears are longer than a Malazan spear and better made. One of them has a string of small bones braided into his hair, and nobody wants to know whose.${b71Say({haddat:`\n\nHaddat kneels by the nearest one, as she does by every dead soldier, and says a word. She does not know his name, so she says *a soldier*. Then she gets up.`, mirrel:`\n\nMirrel looks the dead over with a healer's eye. "They bleed the same," she says. "That's something to know."`, _:''})}

They will be missed by somebody. By then the column will be a long way inland.`,
      ch:[{t:'Back to the fire.', go:'b7_c1_fire'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the way inland, off the beach */
    b7_c1_inland:()=>{ const ph = b71Ph(), ok = ph >= 2 && !!S.f.b7_c1_dunesDone;
      return {sp:'Inland', scene:ph === 1 ? 'b7_c1_landing' : 'b7_coast_night', txt: ph === 1 ?
`A path goes up between the dunes, east, into the dark. The column will take it tonight. The lieutenant said: when the ships have burned. Not before.` : !ok ?
`The path inland goes up between the dunes. ${!S.f.b7_c1_orders2 ? 'The lieutenant has the night\'s orders, by her fire.' : 'The lieutenant wants the Edur in the dunes dealt with before the column turns its back on them.'}` :
`The column goes up off the beach in the dark, squad by squad, without a lamp, and over the last dune the light of the ships goes behind them and there is only the night and the country.

Somewhere in the files a mage is doing something to the air. The eye slides off a line of soldiers like rain off oilcloth, and a dog in a farmyard a field away lifts its head and puts it down again.${b71Say({marrow:` "Mockra, child," Marrow says, low. "Somebody is telling the night we are not here."`, yorin:` Yorin's wind-vane spins once on his palm and stops. "Mockra," he says. "Not mine."`, _:''})}

The Fist wants the coast road by dawn.`,
        ch: !ok ? [{t:'Back to the beach.', go:()=>startExplore()}] :
          [{t:'Inland, to the coast road.', onward:true, fx:()=>{ S.f.b7_c1_ph = 3; }, go:()=>{ startExplore('b7_c1_road'); talk('b7_c1_road_arrive'); }},
           {t:'Not now.', go:()=>startExplore()}]}; },

    /* ======== phase 3: the coast road ======== */
    b7_c1_road_arrive:()=>({sp:'The coast road', scene:'b7_march_night', txt:
`${b71Strip() ? `By the time the Third comes over the last dune the column has gone, files and all, the way marines go: completely. There is a road, and the marks of a great many boots going east along it, and the Third, heavy with what it saved, a long way behind.` : `The coast road runs north and east a day inland, a cart-track between hedges with fields either side, and the column is spread through the fields either side of it in the dark, squad by squad, not on it.`}

There are farms off the road, dark, and fields of something tall that whispers. East, a little off the road behind a wall, there is a long stone building with a lamp in its one window: the only lamp in all this country. The scouts say a factor keeps his tally there.${b71Strip() ? `\n\nThe squad needs what the transport did not give it. There is a farm by the road, west.\n\nAnd behind you, from the south, faint along the road: hooves.` : ''}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b7_c1_road_back:()=>({sp:'The coast road', scene:'b7_march_night', txt:
`West, back the way the column came, the sky over the coast is still a dirty orange from the ships. There is nothing back there now but a beach.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b7_c1_road_east:()=>{ const ph = b71Ph();
      return {sp:'The coast road', scene:ph >= 5 ? 'b7_camp_night' : 'b7_march_night', txt: ph >= 5 ?
`East, along the road, the column will go on at dusk. ${b71DossSettled() ? 'The squad is ready, or as ready as it gets.' : 'There is a man at the pickets asking for the heavies first.'}` :
`East, the road goes on after the column. ${S.f.b7_c1_tallyDone ? 'The shed is the Third\'s. Go and see what it was keeping.' : 'The lieutenant wants the factor\'s shed taken first, so that its lamp tells nobody anything.'}`,
        ch:[{t:'Dusk. On with the column.', req:()=>ph >= 5 && b71DossSettled(), onward:true, go:'b7_c1_onward'},
            {t:'Back to the road.', go:()=>startExplore()}]}; },

    /* the lieutenant on the road: the shed */
    b7_c1_lt3:()=>({sp:'The lieutenant', scene:'b7_march_night', fx:()=>{ S.f.b7_c1_orders3 = 1; }, again:()=>'The lieutenant, by the hedge. "The shed, Sergeant. It has walls. You like walls."', txt:
`${b71Strip() ? `The lieutenant is waiting by the road with two of her own, which means she came back for the Third, which means she had to. "You're late," she says. Then, because she is fair: "You're late with sharpers, I see."` : `The lieutenant is crouched behind a hedge with the slate, watching the lamp in the shed's window.`}

"Factor's tally-shed," she says. "His men, a clerk, and a couple of soldiers he hires by the season. That lamp can be seen from a long way, and a shed like that keeps a signal fire for when it sees something it doesn't like." She tucks the slate away. "The shed's got walls and a door. Walls and doors are heavies' work. My lot will hold the road."${b71Strip() ? `\n\n"And Sergeant: there are riders on the road behind you. They've been following your tracks up from the beach. Deal with them, or they'll deal with the shed for you, from behind."` : ''}`,
      ch:[{t:'"The shed. Yes, Lieutenant."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* marines lying up in the barley along the road: camp talk */
    b7_c1_barley:()=>({sp:'Marines in the barley', scene:'b7_march_night', fx:()=>{ S.f.b7_c1_barley = 1; }, again:()=>'The marines in the barley, flat, whispering.', txt:
`A squad of marines is lying flat in the barley by the road, waiting for the order to move, and whispering, which they are not supposed to do.

"Their capital's a week's march," one of them is saying. "Two. Nobody knows. Canals and towers, the sailors say, and an Edur on the throne who can't be killed. Dies, and gets up again." She considers it. "I'd like to see that once."

"No you wouldn't," says the one beside her. They both look up at the Third standing over them, and stop. "Evening, heavies," the first one says. "Mind the barley. It talks."`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* the farm by the road: on 'strip', the rest of the stores */
    b7_c1_farm:()=>{ const done = !!S.f.b7_c1_farmDone;
      if (!b71Strip()) return {sp:'A farm', scene:'b7_farm_night', again:()=>'The farm by the road, shuttered.', txt:
`A farmhouse of plaster and thatch by the road, shuttered, no light. The column went past it in the fields in the dark and did not knock. Behind the shutters somebody is breathing very quietly, and a child is being told to hush, in Letherii, in a whisper that carries.

The column lives off the land. It does not have to live off this bit of it tonight.`,
        ch:[{t:'Leave them be.', go:()=>startExplore()}]};
      if (done) return {sp:'A farm', scene:'b7_farm_night', again:()=>'The farm, with its door shut again.', txt:
`The farm's door is shut again. There is no light behind it, and nobody breathing near the shutters now. They have gone to the back of the house, where Malazans are less.`,
        ch:[{t:'Back to the road.', go:()=>startExplore()}]};
      return {sp:'A farm', scene:'b7_farm_night', txt:
`A farmhouse of plaster and thatch by the road, and a woman in its doorway with a lamp she has not lit, because the Third's boots woke her. Behind her an old man, and behind him, children, and behind all of them a room with almost nothing in it.

They are Indebted. Everyone on this coast is, the scouts say, to one factor or another. What is in the house is the factor's, the woman says, in Letherii and then in a trade-tongue the squad can follow. The pork, the meal, the jar of goose-grease for burns, the blankets: all of it is written down in a book somewhere, against her name.

The Third needs the salve. The transport did not give it enough.${b71If('haddat', `\n\nHaddat looks at the children, and then at you.`)}`,
        ch:[{t:'Take what the squad needs.', fx:()=>{ S.f.b7_c1_farmDone = 1; S.f.b7_c1_farmPaid = 0; S.inv.salve = (S.inv.salve || 0) + 1; b71L('haddat', -1); b71L('tangle', 1); note('Off the farm: a jar of goose-grease, as good as a salve.', 'good'); b7Rise(-1, 'a farm stripped'); }, go:'b7_c1_farm_take'},
            {t:'Take it, and leave five silver on the table.', tag:'5 silver', req:()=>(S.silver || 0) >= 5, fx:()=>{ S.f.b7_c1_farmDone = 1; S.f.b7_c1_farmPaid = 1; S.silver -= 5; updSilver(); S.inv.salve = (S.inv.salve || 0) + 1; b71L('marrow', 1); note('Off the farm: a jar of goose-grease, as good as a salve.', 'good'); b7Rise(-1, 'a farm stripped'); }, go:'b7_c1_farm_take'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c1_farm_take:()=>({sp:'A farm', scene:'b7_farm_night', txt:
`The squad takes the goose-grease, and a sack of meal, and does not take the blankets. ${S.f.b7_c1_farmPaid ? `The five silver go on the table by the cold hearth. The woman looks at them as if they were somebody else's. "The factor will have that by the month's end," she says, quite calmly. "He will want to know where I got Malazan coin."` : `The woman watches it go out of her door with no expression at all. She has watched things go out of her door before. The factor's men take more, she says, and write it down.`}

When the Third is back on the road the door shuts behind it, and a bar goes across.${b71Say({marrow:` Marrow looks back at the farm once. "That was hers, child," she says. "Whatever the book says."`, mirrel:` Mirrel says, "We needed it," to nobody in particular, and does not sound sure.`, _:''})}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* the riders on the coast road: optional on 'burn'; on 'strip' they caught up */
    b7_c1_riders_start:()=>({sp:'The coast road', scene:'b7_march_night', txt: b71Strip() ?
`They have followed the Third's tracks up from the beach: five Letherii riders, lancers and two with crossbows across their saddles, coming up the road at a trot with a hooded lantern. The marines are in the fields, a long way ahead. The Third is on the open road with full packs, and the riders have seen it.` :
`Five riders come up the road from the south at a walk, Letherii, three with lances and two with crossbows across their saddles, and a hooded lantern. They are talking. They do not know that the column is lying in the fields on either side of them, close enough to touch the horses.

The marines in the fields let them come. The marines are watching the Third, to see what heavies do.`,
      ch:[{t:'"Third! Into the road!" Take them.', go:()=>startBattle('b7_c1_riders', {})},
          {t:'Down into the ditch, and take them as they pass.', check:['guile', 15],
            edges:id=>[id === 'tebbet' && ['a bowman knows how to wait', 1], id === 'sathi' && ['she ambushed riders for the Weasels', 2], id === 'orvas' && ['a rider knows where a rider looks', 1], id === 'rasp' && ['marine-trained', 1], S.f.b7_c1_fingerOk && id === 'sgt' && ['the night signs: the squad moves without a word', 2], id === 'ottar' && ['grey plate in a ditch still shines', -2], id === 'darrut' && ['he is not built for ditches', -1]],
            near:{t:()=>`Yes, but the ditch is half full of water, and ${b71Nm(b71Who())} ${b71V(b71Who(), 'come', 'comes')} up out of it cold to the bone. ${b71Nmc(b71Who())}'ll feel it in the fight.`, fx:()=>bruise(b71Who(), bruiseN())},
            go:()=>startBattle('b7_c1_riders', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c1_riders_seen'},
          {t:'Let them pass. The shed matters more.', req:()=>!b71Strip(), fx:()=>{ S.f.b7_c1_ridersPassed = 1; }, go:'b7_c1_riders_pass'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c1_riders_seen:()=>({sp:'The coast road', scene:'b7_march_night', txt:
`A horse smells the Third before it sees it, and says so. The lantern comes unhooded. The lances come down.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b7_c1_riders', {surprise:'e'})}]}),
    b7_c1_riders_pass:()=>({sp:'The coast road', scene:'b7_march_night', txt:
`The riders go by at a walk, talking, a lance-length from a hundred Malazans lying in the barley, and go on north up the road and out of sight. Not one horse so much as twitches an ear. The column's mages are good.

In the field a marine lifts her head and looks at the Third, and puts it down again.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b7_c1_riders_after:()=>({sp:'The coast road', scene:'b7_march_night', fx:()=>{ S.f.b7_c1_ridersDone = 1; }, txt:
`The road is quiet again. The horses have gone off south, riderless, into the dark, where somebody will find them in the morning and wonder.

${b71Strip() ? `The lieutenant comes back down the road with two of hers in time to see the end of it. She looks at the riders, and at the Third, and makes the mark on her slate that she did not make on the beach.` : `In the barley a marine says something to another marine, and the second one laughs, very quietly.`}${b71Say({tangle:`\n\nTangle counts the satchel. "Nothing," he says. "Didn't need a thing." He sounds almost sorry.`, sathi:`\n\nSathi wipes her blade on a dead man's cloak. "Lancers on foot," she says. "Sad."`, _:''})}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),

    /* the tally-shed: the main fight */
    b7_c1_shed_view:()=>{ const done = !!S.f.b7_c1_tallyDone;
      if (done) return {sp:'The tally-shed', scene:'b7_c1_shed', txt:
`The shed is the Third's. Its gate stands open on the yard.`,
        ch:[{t:'Into the yard.', onward:true, go:()=>{ startExplore('b7_c1_shed'); talk('b7_c1_shed_arrive'); }},
            {t:'Not now.', go:()=>startExplore()}]};
      if (!b71ShedOpen()) return {sp:'The tally-shed', scene:'b7_c1_shed', txt:
`A long building of fieldstone behind a yard wall, east of the road, with a lamp in its one window. ${!S.f.b7_c1_orders3 ? 'The lieutenant will want a word before the Third goes knocking.' : !S.f.b7_c1_farmDone ? 'The squad is short of salve, and the farm to the west has some.' : 'There are riders on the road behind the Third. Turn your back on them and they will be in the shed\'s yard with you.'}`,
        ch:[{t:'Back to the road.', go:()=>startExplore()}]};
      return {sp:'The tally-shed', scene:'b7_c1_shed', txt:
`A long building of fieldstone behind a yard wall, with a slate roof and one window with a lamp in it, and a pile of dry brush on a frame by the gate that is a signal fire waiting to be lit. Through the gate the yard is lit by a lantern on a post. There are men in it: the factor's men, big, with cudgels, and two in Letherii soldiers' kit who are not quite with them.

Inside, somewhere, a clerk keeps the factor's book. Every debt for a day's ride round is written in it.${b71If('tangle', `\n\nTangle looks at the brush pile. "I could light that for them," he says. "Saves them the trouble."`)}`,
        ch:[{t:'"Third! Through the gate!" Straight in.', go:()=>startBattle('b7_c1_tally', {})},
          {t:'Round by the seaward wall, and over it.', check:['wits', 15],
            edges:id=>[id === 'tangle' && ['a sapper reads a wall for its weak course', 1], id === 'rasp' && ['marine-trained: walls are what she was taught on', 2], id === 'mehet' && ['he has been over a great many walls', 1], S.f.b7_c1_fingerOk && id === 'sgt' && ['the night signs: the squad goes over without a word', 2], id === 'haddat' && ['a shield is no help on a wall', -1], id === 'ottar' && ['grey plate and a wall disagree', -2]],
            near:{t:()=>`Yes, but the coping-stone turns under ${b71Nm(b71Who())} at the top, and ${b71Nm(b71Who())} ${b71V(b71Who(), 'land', 'lands')} on the far side on ${b71V(b71Who(), 'your', 'a')} knee. ${b71Nmc(b71Who())}'ll feel it in the fight.`, fx:()=>bruise(b71Who(), bruiseN())},
            go:()=>startBattle('b7_c1_tally', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c1_shed_seen'},
          {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c1_shed_seen:()=>({sp:'The tally-shed', scene:'b7_c1_shed', txt:
`A dog in the yard that nobody knew about has an opinion about the seaward wall. The factor's men come round the corner of the shed with the lantern, and one of them runs for the signal fire.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b7_c1_tally', {surprise:'e'})}]}),
    b7_c1_tally_after:()=>({sp:'The tally-shed', scene:'b7_c1_shed', fx:()=>{ S.f.b7_c1_tallyDone = 1; S.f.b7_c1_ph = Math.max(4, S.f.b7_c1_ph || 1); gain('b7_c1_factorblade'); }, txt:
`The yard is quiet. The signal fire is not lit. The factor's men who could run have run, inland, across the fields, and will be at the factor's house by morning with a story that grows with every league.

The shed's sergeant is down by his own door with a better sword than his pay: a straight Letherii blade with a brass guard and a set of scales stamped on it, the factor's mark. It goes in the kit.${b71Say({haddat:`\n\nHaddat stands in the shed's doorway with the blue shield on her arm, the way the lieutenant hoped heavies would. "It is a doorway," she says. "I am standing in it."`, _:''})}

Inside, the lamp is still burning, and somebody is crying very quietly behind the tally-boards.`,
      ch:[{t:'Into the yard.', onward:true, go:()=>{ startExplore('b7_c1_shed'); talk('b7_c1_shed_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 4: the tally-shed ======== */
    b7_c1_shed_arrive:()=>({sp:'The tally-shed', scene:'b7_c1_shed', again:()=>'The factor\'s yard, the shed door open, the lamp still lit inside.', txt:
`The shed is one long room. Down both walls there are tally-boards, notched sticks hung in rows on pegs, hundreds of them, each with a name burned into its end. At the far end there is a lectern with a book on it, bound in board and brass, as big as a paving-stone.

The factor's tally-book. Every family for a day's ride in every direction is in it, the scouts said: what they owe, and what their parents owed, and what their children will.

The clerk who keeps it is the one crying. He has ink on his cuffs and has stopped trying to hide behind the tally-boards.`,
      ch:[{t:'The book.', go:'b7_c1_book'},
          {t:'Walk the yard.', go:()=>startExplore()}]}),
    b7_c1_book:()=>{ const done = !!S.f.b7_c1_bookBurned;
      return {sp:'The tally-book', scene:'b7_c1_shed', html:done ? risingHTML() : '', again:()=> done ? 'The lectern, and the ash on it.' : 'The book on its lectern.', txt: done ?
`The lectern is bare but for ash, and a brass corner of the binding gone blue with the heat. The tally-boards on the walls are down and burned with it. The yard smells of it.` :
`The book is open at the last written page. The clerk's hand is small and neat and very regular: names, in families, one under another, and beside each a figure in docks, and beside that a figure for the interest, and beside that the next quarter-day's figure, already worked out in advance. Some of the families go back four lines. None of the figures go down.

The lieutenant said it on the road, in passing: anything of the factors' the people hate, burn where the people can see the smoke. The Adjunct wants Lether turned. This is where Lether keeps the reasons.${b71If('tangle', `\n\nTangle has a fuse out already. "Sappers' privilege," he says.`)}${b71If('haddat', `\n\nHaddat reads a line upside down, slowly. "This one is a child," she says. "Six years old. She owes forty docks."`)}`,
        ch: done ? [{t:'Back to the yard.', go:()=>startExplore()}] : [
          {t:'Burn it. The boards too.', fx:()=>{ S.f.b7_c1_bookBurned = 1; b71L('haddat', 1); b71L('tangle', 1); b71L('marrow', 1); }, go:'b7_c1_book_burn'},
          {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c1_book_burn:()=>({sp:'The tally-book', scene:'b7_c1_shed', html:risingHTML(), fx:()=>{ if (!S.f.b7_c1_bookAsh) { S.f.b7_c1_bookAsh = 1; b7Rise(1, 'a factor\'s tally-book burned'); gain('b7_c1_tallyash'); } }, txt:
`It goes up slowly at first, as a thick book does, the edges first and then the pages curling back one by one as if somebody were reading it very fast. Then the tally-boards go, all down both walls, the names on their ends going black, and the shed fills with a smoke that smells of ink and old wood and something else that might only be the years.

One page lifts off the burning book on the heat and goes up toward the roof, and ${b71Say({haddat:'Haddat', tebbet:'Tebbet', sathi:'Sathi', _:'somebody'})} catches it out of the air. It is black at the edges. In the middle, in the clerk's small hand, there is one family's line, four generations, each name owing what the one above it owed and more. The last name on the page is *Doss*.

It goes in the kit. It seems wrong to let it burn twice.

Out past the yard wall, in the dark of the field, somebody is standing quite still, watching the shed burn. When ${b71Say({tebbet:'Tebbet', haddat:'Haddat', _:'you'})} look${b71Say({tebbet:'s', haddat:'s', _:''})} again, they are gone.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    /* the tally-clerk */
    b7_c1_clerk:()=>({sp:'The tally-clerk', scene:'b7_c1_shed', again:()=> S.f.b7_c1_clerk ? 'The clerk has been seen to.' : 'The clerk, with ink on his cuffs, waiting to be told what he is now.', txt:
`The clerk is a thin Letherii with ink on both cuffs and a pen still behind his ear, which he has forgotten. He has stopped crying, mostly. He keeps looking at the lectern.

"They will put it on me," he says, in careful trade-tongue. "The book. The factor will say I let it burn. He will add it to my own line." He laughs, once, and it is not a laugh. "I am in it too, you know. Every clerk is. I wrote my own figure in it every quarter-day."${S.f.b7_c1_bookBurned ? `\n\nHe looks at the ash on the lectern. "Was in it," he says, and seems unsure what to do with his face.` : ''}`,
      ch:[{t:'"Go home. Tell the factor the Malazans did it. It is even true."', fx:()=>{ S.f.b7_c1_clerk = 'freed'; b71L('haddat', 1); b71L('marrow', 1); }, go:'b7_c1_clerk_free'},
          {t:'Tie him in the shed for the factor\'s people to find. It will look better for him.', fx:()=>{ S.f.b7_c1_clerk = 'tied'; b71L('tangle', 1); b71L('mirrel', 1); }, go:'b7_c1_clerk_tie'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c1_clerk_free:()=>({sp:'The tally-clerk', scene:'b7_c1_shed', txt:
`He goes out of the gate and stops, and looks back, and then goes off across the fields at a fast walk that wants to be a run.

${b71Say({haddat:'"He will tell them it was a hundred of us," Haddat says.', tangle:'"He\'ll say there were a hundred of us," Tangle says. "With a dragon."', _:'He will tell the factor there were a hundred of you. Let him.'})}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b7_c1_clerk_tie:()=>({sp:'The tally-clerk', scene:'b7_c1_shed', txt:
`He holds his own wrists out for the cord, and thanks you when it is not too tight. ${b71Say({mirrel:'Mirrel checks the knots. "Not so it cuts," she says. "Sit. There. Good."', tangle:'Tangle ties it with a sapper\'s knot, which will come undone with one pull, if you know where. The clerk does not know where.', _:'The knots are firm and fair.'})}

"Thank you," he says again, sitting against the wall under the burned boards. "It will look much better. He might believe me."`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b7_c1_shed_well:()=>({sp:'The shed\'s well', scene:'b7_c1_shed', txt:
`The shed's well, with its windlass charred off by a burner in the fight, or by something. The water at the bottom is a long way down and sweet. The squad lowers a helmet on a cord and fills its skins, which is the first fresh water it has had since Malaz City that did not taste of cask.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b7_c1_shed_out:()=>{ const ok = !!S.f.b7_c1_bookBurned;
      return {sp:'The gate', scene:'b7_c1_shed', txt: ok ?
`Through the gate the coast road runs east in the last of the dark. The sky over the sea behind is going grey. The column will lie up by day in the copses and hedges along the road, and the lieutenant's runner is at the gate to say where.` :
`Through the gate the coast road runs east in the dark. The book is still on its lectern in the shed. The lieutenant said: where the people can see the smoke.`,
        ch: ok ? [{t:'To the lie-up, before the light.', onward:true, fx:()=>{ S.f.b7_c1_ph = 5; }, go:()=>{ startExplore('b7_c1_road'); talk('b7_c1_lieup'); }},
                  {t:'Not now.', go:()=>startExplore()}] :
                 [{t:'Back to the yard.', go:()=>startExplore()}]}; },

    /* ======== phase 5: the lie-up by day, and the next dusk ======== */
    b7_c1_lieup:()=>({sp:'The lie-up', scene:'b7_camp_night', txt:
`The column lies up by day across three fields and a wood a league east of the shed, under hedges, in ditches, in the edge of the trees, every soldier in a cloak, and the mages' Mockra laid over it all so that a farmer walking his field at noon sees a hedge and a ditch and nothing else. The Third sleeps under a hedge of thorn, in turns, while the sun goes over a country that does not know it is there.

${b71Say({sathi:`Sathi sleeps at once, like a cat. Everybody else lies awake for an hour hating her.`, marrow:`Marrow sleeps sitting up, with her string in her lap, and her lips move.`, _:'You sleep as soldiers sleep in a strange country: badly, and all at once.'})}

At dusk the pickets bring word down the hedge: there is a man at the pickets, asking for the heavies. Not the marines. The heavies. He says he watched them burn the book.`,
      ch:[{t:'See the man at the pickets.', go:'b7_c1_doss'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the lieutenant at dusk: the column's word (and the Rising, as the marines see it) */
    b7_c1_lt5:()=>({sp:'The lieutenant', scene:'b7_camp_night', fx:()=>{ S.f.b7_c1_lt5 = 1; }, again:()=>'The lieutenant, rolling her blanket. "Dusk soon."', txt:
`The lieutenant is rolling her blanket under the hedge-end with the speed of long practice. "The Fist's word," she says. "Inland, a long way. Farms, villages, the factors' houses. Hit what the Edur and the factors use, and leave the rest." She ties the roll. "The Adjunct wants the Letherii on our side. The Letherii haven't been asked yet. We're the asking."

She looks back toward the shed, where a thin smoke still stands up from the coast road in the evening air. "That was a good bit of asking, Sergeant. They'll have seen it for leagues."${b7Rising() >= 3 ? `\n\n"There's talk in the column already. A farm put a bucket of water out by the road this morning, where the marines would pass. Nobody made it do that."` : ''}`,
      ch:[{t:'"Inland. Yes, Lieutenant."', go:()=>startExplore()}]}),

    /* Doss: an Indebted farmhand who watched the book burn */
    b7_c1_doss:()=>{ const d = S.f.b7_dossDone;
      if (d === 2) return {sp:'Doss', scene:'b7_camp_night', txt:
`Doss is still at the pickets with the camp followers, sitting on his heels with the flail across his knees, watching the Malazans get ready to go. He has the look of a man who has decided to wait exactly as long as it takes, and not a day longer.`,
        ch:[{t:'"Walk with us, Doss."', fx:()=>{ b7Join('doss'); b71L('haddat', 1); }, go:'b7_c1_doss_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'A man at the pickets', scene:'b7_camp_night', again:()=>'The farmhand at the pickets, with his flail, waiting for an answer.', txt:
`The man at the pickets is a farmhand, broad, sunburned, twenty-five or so, in a jerkin with more patches than jerkin and a quilted cap, with a threshing flail over his shoulder and a sickle through his belt. The marines on the picket have not taken the flail off him. He has not given them a reason to.

"You burned the book," he says, in Letherii, and then again in a trade-tongue with the corners knocked off it. "In the factor's shed. I watched." He looks at the Third, one by one. "Doss," he says, and touches his chest. "Off the factor's holding, a day inland. Born on it. My father, his father." He takes a breath. "What do the Malazans pay?"`,
        ch:[{t:'"A soldier\'s pay. Silver, when there is any."', go:'b7_c1_doss_pay'},
            {t:'Ask him about the roads inland first, and who is on them.', check:['wits', 15], rise:true, req:()=>!S.f.b7_c1_dossTried,
              edges:id=>[id === 'haddat' && ['she asks politely, and he is not used to it', 1], id === 'mehet' && ['a townsman knows how to ask a farmer', 1], id === 'sgt' && ['you have asked a hundred locals the way', 1], id === 'sathi' && ['her teeth frighten him', -1], id === 'ottar' && ['the Malazan is hard enough; the trade-tongue is beyond him', -2]],
              near:{t:()=>`Yes, but he tells it all, every road and every farm and who owes whom, until the light is gone, and ${b71Nm(b71Who())} ${b71V(b71Who(), 'march', 'marches')} out at dusk with the whole coast's debts going round in ${b71V(b71Who(), 'your', 'the')} head: rattled.`, fx:()=>b71Rattle(b71Who())},
              fx:()=>{ S.f.b7_c1_dossTried = 1; }, go:'b7_c1_doss_roads', fail:'b7_c1_doss_noroads'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c1_doss_roads:()=>({sp:'Doss', scene:'b7_camp_night', fx:()=>{ S.f.b7_c1_dossRoads = 1; }, txt:
`He squats and draws in the dirt with the end of the flail. The coast road, here. The factor's holding, a day inland, here, the big house in stone. The cart-tracks between the fields that the Letherii maps leave out, because nobody who draws maps walks them. Where the Letherii soldiers ride at night, and where they don't, because their horses go lame on the old field-drains.

"The factor's men come out to the shed on quarter-days," he says. "Next one's in nine days. They'll find what you left." He looks up. "I'd like to see their faces. I won't. I'll be wherever you are."`,
      ch:[{t:'"A soldier\'s pay, then. Silver, when there is any."', go:'b7_c1_doss_pay'}]}),
    b7_c1_doss_noroads:()=>({sp:'Doss', scene:'b7_camp_night', txt:
`He starts to tell it, and stops, and starts again, and the roads come out in the order he walked them as a boy, which is not any order a map would know. The factor's holding is a day inland. Or two. There is a road. There are several roads.

"I know them with my feet," he says, unhappily. "Not with my mouth."`,
      ch:[{t:'"A soldier\'s pay. Silver, when there is any."', go:'b7_c1_doss_pay'}]}),
    b7_c1_doss_pay:()=>({sp:'Doss', scene:'b7_camp_night', txt:
`He considers that for a while.

"More than nothing," he says. "Nothing is what I have." He shifts the flail on his shoulder. "On the holding you are paid in what you owe. Every quarter-day the clerk reads your line and it is longer. I have worked twenty-six harvests and I owe the factor more than I did when I was born. My father died owing. His father." He looks at the Third. "You burned it. I watched you. I have been waiting my whole life for somebody to do that."${b71If('haddat', `\n\nHaddat is watching him with her head on one side. She does not say anything, but she has stopped looking at the flail.`)}${b71If('tangle', `\n\n"He's a farmer," Tangle says, aside. "We're heavies. We march." He considers Doss's shoulders. "He'd march."`)}`,
      ch:[{t:'"Then walk with us, Doss."', fx:()=>{ b7Join('doss'); b71L('haddat', 1); }, go:'b7_c1_doss_join'},
          {t:'"Wait with the camp followers. We will see how it goes."', fx:()=>{ S.f.b7_dossDone = 2; }, go:'b7_c1_doss_wait'},
          {t:'"Go home, Doss. This is no road for a farmhand."', fx:()=>{ S.f.b7_dossDone = 0; b71L('haddat', -1); }, go:'b7_c1_doss_home'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c1_doss_join:()=>({sp:'Doss', scene:'b7_camp_night', txt:
`${b7In('doss') ? `He takes the cap off, and looks at it, and puts it back on, which seems to be the Indebted way of saying a great many things at once.

"Where are we going?" he asks. Somebody tells him: inland. He nods as if that were an answer. "I've never been anywhere the factor didn't own," he says. "That'll be most places, then."` : `He nods, and goes to wait with the camp followers: six already walk with the Third, and a farmhand can count. "When there's room," he says.`}`,
      ch:[{t:'Show him the page out of the book.', req:()=>b7In('doss') && !!(S.kit || []).includes('b7_c1_tallyash') && !S.f.b7_c1_dossPage, go:'b7_c1_doss_page'},
          {t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b7_c1_doss_page:()=>({sp:'Doss', scene:'b7_camp_night', fx:()=>{ S.f.b7_c1_dossPage = 1; b71L('doss', 2); }, txt:
`He cannot read it. He holds it the right way up anyway, and turns it to the last of the light, and puts his thumb under the last line.

"That's me," he says. "That shape. The clerk wrote it on my board every quarter-day, so I know it." His thumb goes up the page. "My father. His. Her, that's my grandmother's mother. She came off a ship from somewhere, they said, owing for the passage." He holds it out, carefully, by the corner. "Keep it. I'd only look at it."

He watches it go back into the kit. "Burnt at the edges," he says. "That's right. That's how it should look."`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b7_c1_doss_wait:()=>({sp:'Doss', scene:'b7_camp_night', txt:
`He nods slowly, as if he had expected that, and goes and sits on his heels among the camp followers at the column's tail: the sutlers, a marine's wife, two boys with a goat. He does not look disappointed. He looks like a man who has waited twenty-six years and can wait a few days more.

"When you want me," he says, "I'm at the back. The back is where I'm used to."`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),
    b7_c1_doss_home:()=>({sp:'Doss', scene:'b7_camp_night', txt:
`He looks at you for a while, and then at the road east, and then back the way he came.

"Home," he says, as if it were a word in a language he had nearly learned. "Yes, Sergeant." He goes off across the field toward the factor's holding with the flail on his shoulder. He walks like a man going to work.${b71If('haddat', `\n\nHaddat watches him go, and keeps what she thinks of it to herself. It shows anyway.`)}`,
      ch:[{t:'Back to the lie-up.', go:()=>startExplore()}]}),

    /* the end: dusk, and inland */
    b7_c1_onward:()=>({sp:'The coast road', scene:'b7_coast_night', txt:
`At dusk the column stands up out of its hedges and ditches all at once, as if the country had decided to walk, and goes on east and inland in the falling dark, squad by squad, without a lamp. Behind it, on the coast, the hulks of the transports are still smoking along the water, and a thin smoke goes up from a shed on the coast road.

${b71Key() === 'strip' ? `The Third walks heavy, with full packs and a satchel that has more in it than any other squad's, and the lieutenant has stopped looking at it sideways.` : `The Third walks light, with what it came ashore with and nothing else, and the lieutenant has put it in the middle of the file, where the heavies go.`}${b7In('doss') ? `\n\nDoss walks at the back of the Third with the flail on his shoulder, looking at everything: every field, every hedge, every farmhouse with its door shut. "I've never been past that hill," he says, when the road goes over it. Then he has.` : ''}${b71Say({haddat:`\n\nHaddat says the names under her breath as she walks, and at the end of them, quietly, a new one: *the transport*. Then she is done.`, _:''})}`,
      ch:[{t:'Inland, with the column.', onward:true, go:()=>chapterEnd(1, b71Key() || 'burn')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
