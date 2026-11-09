/* ============ Book Eight, Chapter 1: Before the Fete ============ */
/* The Fourth, years out of the army, in Darujhistan: the winter before the Gedderone Fete (tth-canon correction 1, fix (A)). K'rul's is not
   touched yet. The Guild's first knife for the Fourth comes on a paper of its own (correction 3): a second paper, client never said (rule 70).
   Phase 1 (S.f.b8_c1_ph), a winter night at the Fourth's door: the table, the reading (B8READ[1]), something on the roof that is not the wind,
   the first knife (b8_c1_alley, guild:true, stage 2 the roofs). Phase 2, the roofs over the alley and the paper on the table: the Guild's
   lines between the chimneys (the trick, The Roof-Line), a pair of roof-boots, the paper with five strokes on it, and Vell's mark if he walks
   (callback 4). Phase 3, the Gadrobi lanes, days on: the tavern with the painted sign (Rumjugs and Sweetlard), the retired Malazan from the
   Seven Cities lot (Neffarias Bredd; the old historian at K'rul's, callback 6; the Hood-touched charm), Benlo's barrow (the Moranth's at a
   buyer's price), Orsa's dice den (an optional brawl, b8_c1_den); then the key at the fire, S.f.b8_c1_key: 'hunt' (go after who is paying:
   b8Con(2)) or 'quiet' (lie low: b8Con(-1)). Phase 4: on 'hunt' Orsa's word (the go-between check, contract:true), the go-between's house
   (b8_c1_hunt, stage 2 the stair) and a closed door; on 'quiet' the bar across the door, and chancers at it (b8_c1_chancers, not the Guild).
   Phase 5: home. On 'hunt' Vasso is sitting on the Fourth's step (b8Join('vasso')); then winter's end, and the road east.
   Notes for later chapters: docs/tth-ch1-notes.md. */
/* FOR THE ARTIST (141b): names this file uses.
   Items: ART['item/b8_c1_guildknife'], ['item/b8_c1_roofboots'] (b8_hoodcharm is 140b's).
   Figures: vasso (140's simple sprite, replaced in 141b), b8_c1_veteran (the retired Malazan), b8_c1_orsa (the dice-den keeper), b8_c1_benlo
   (the street vendor and his barrow); placeholders here with ??=. Reused: urchin (the lamplighter's boy), thug and houseguard (bravos),
   guildknife (the knives).
   Backdrops: b8_daru_night, b8_gadrobi, b8_door (140's, yours), and four this file adds that borrow until you draw them: b8_c1_tavern (the
   tavern with the painted sign, inside), b8_c1_den (Orsa's dice den, a cellar), b8_c1_roofs (the Gadrobi roofs at night, the Guild's lines
   between the chimneys), b8_c1_house (a go-between's courtyard, a door shut on it). The tavern sign: two painted women, faces nobody's in
   particular, a ribbon over them (Rumjugs and Sweetlard; Ch 6 sees it again).
   Ground (TILEX, all existing): city_night (the Fourth's street: 'D' the Fourth's door, 'g' the alley mouth, 'L' lamps, 'B' barrels, '<' down
   toward the Phoenix, '>' on into the Gadrobi lanes; the go-between's courtyard: 'D' his door, 'g' the gate, 'F' a brazier), roof_night (the
   roofs: 'C' chimneys, 'p' planks, 'x' the Guild's line on its post, 'S' the skylight, '<' the way down), city_dusk (the Gadrobi lanes: 'D' the
   tavern, 'S' the steps down to Orsa's, 'W' Benlo's barrow, 'x' the dyers' lines). Battle 't' is low cover; on the roofs '#' is the drop. */

/* ---- small helpers (b81: Book Eight, Chapter One) ---- */
const b81L = (id, n) => { if (b8In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b81Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b8In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b81If = (id, s) => b8In(id) ? (typeof s === 'function' ? s() : s) : '';
const b81Who = () => (ROLL() && ROLL().who) || 'sgt';
const b81Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b81Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b81V = (id, you, they) => id === 'sgt' ? you : they;
const b81Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the night at the door, 2 the roofs and the paper, 3 the Gadrobi days, 4 the key's road (hunt: the go-between; quiet: the bar
   across the door), 5 home, and winter's end */
const b81Ph = () => S.f.b8_c1_ph || 1;
const b81Key = () => S.f.b8_c1_key || null;
const b81Hunt = () => S.f.b8_c1_key === 'hunt';
const b81Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b8In(id));
const b81CoreDead = () => B8_FRESH.filter(id => S.dead && S.dead[id]);
const b81VassoSettled = () => S.f.b8_vassoDone != null;
const b81KeyOpen = () => !!S.f.b8_c1_alleyDone && !!S.f.b8_c1_vetMet;
/* the Phoenix line, for a Book Three save: the fates put Brisk in its door, and the Phoenix had other ideas */
const b81FromMoi = () => !!(S.imported && S.imported.book === 'moi');

/* ---- The Roof-Line: the Guild's lines strung chimney to chimney across the Gadrobi roofs. It copies the Rope's Way (Book One's rope):
   swap places with a squadmate, no free swings. v10.3: it strikes nobody, so it is free. ---- */
Object.assign(TRICKS, {
  b8_c1_roofline:{name:'The Roof-Line', ch:1, use:'fight', ab:'t_b8_c1_roofline', where:'the Gadrobi roofs over the alley behind the Fourth\'s door, the night of the first knife',
    lore:'The Guild\'s lines: tarred cord strung chimney to chimney across the Gadrobi roofs, belayed on iron hooks driven into the mortar, so that a journeyman can cross a street without touching it. No one admits to stringing them. The Fourth crossed lines like these once, years ago, over the Daru District, behind a rope boy who never looked down.',
    get fx(){ return `Once a fight: by the Guild's lines, swap places with any squadmate within ${5 + lvT()}. No free swings. Grows with level. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b8_c1_roofline:{name:TRICKS.b8_c1_roofline.name, trick:'b8_c1_roofline', free:true, desc:()=>TRICKS.b8_c1_roofline.fx,
    tiles:u=>party().filter(p => p !== u && !p.ally && cheb(u, p) <= 5 + lvT()),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; const ux = u.x, uy = u.y; sparks(ux, uy, 10, '#8aa4c8', .4); sparks(t.x, t.y, 10, '#8aa4c8', .4);
      u.x = t.x; u.y = t.y; t.x = ux; t.y = uy; AUDIO.play('shadow'); B.moved = true; blog(`${u.name} goes up a line nobody saw, and comes down where ${t.name} was. ${t.name} is where ${u.name} was. The Guild strings its cord for anyone who knows the knots.`); }},
});

/* ---- borrowed pictures until the artist's file (141b) replaces them: four scenes, three figures, the two items ---- */
{ const like = {b8_c1_tavern:'b8_door', b8_c1_den:'b8_door', b8_c1_roofs:'b8_daru_night', b8_c1_house:'b8_daru_night'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof FIGX !== 'undefined') { FIGX.b8_c1_veteran ??= (ctx, h, t, o) => (FIGX.b2soldier || (() => {}))(ctx, h, t, o);
  FIGX.b8_c1_orsa ??= (ctx, h, t, o) => (FIGX.b5_c1_tilewoman || FIGX.b2soldier || (() => {}))(ctx, h, t, o);
  FIGX.b8_c1_benlo ??= (ctx, h, t, o) => (FIGX.b5_c3_trader || FIGX.b2soldier || (() => {}))(ctx, h, t, o); }
if (typeof ART !== 'undefined') [['b8_c1_guildknife', 'b7_c2_agentknife'], ['b8_c1_roofboots', 'b6_c1_wellrope']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Eight's glossary ---- */
GLOSSX.tth.push(
  [1, 'The Fourth\'s door', 'A narrow house up the street from the Phoenix, in the Gadrobi District: a fire, a table, five chairs and one more, and a bar across the door at night. The Fourth keeps the rent paid.', ()=>!!(S && S.book === 'tth' && (S.chapter || 0) >= 1)],
  [1, 'A Guild paper', 'How the Assassins\' Guild takes work: a paper, through a go-between, with the job on it and never the client. The knives never know who paid. That is the point of the go-between.', ()=>!!(S && S.f && S.f.b8_c1_paperRead)],
  [1, 'The painted sign', 'Two big painted women over a Gadrobi tavern door, arm in arm, one with a rum jug and one with a tray of cakes. No one in the tavern knows who they are. The painter is not saying.', ()=>!!(S && S.f && S.f.b8_c1_sign)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tth = ROSTER_FIRES.tth || {}; ROSTER_FIRES.tth[1] = ['b8_c1_fire'];

const B8CH1 = {
  title:B8CH[1], number:'One',
  intro:{loc:'Darujhistan', sub:'The Gadrobi District · winter', scene:'b8_door', cap:'A narrow room with a fire, a table with five chairs and one more, and a bar across the door at night.',
    paras:[
`Winter in Darujhistan. Every evening the lake breathes fog up into the streets, and the gas-lamps hiss blue in it, and the Gadrobi District smells of tannery and wet stone and other people's suppers. The Fete is weeks off. The city is already counting.`,
()=>{ const v = b81Mates().map(id => NAME(id));
  return `You are Sergeant {sgt}, once of the Fourth Squad, Seventh Company, and now of nothing in particular. ${b8ArriveWords()} ${v.length ? `${v.length > 1 ? v.slice(0, -1).join(', ') + ' and ' + v[v.length - 1] : v[0]} ${v.length > 1 ? 'are' : 'is'} still with you, which none of you planned either.` : 'The rest of the Fourth is a column in the ledger now. You keep it anyway.'}`; },
`The rent is paid. The ledger balances. Tonight the bar went across the door early, for no reason anyone said out loud.`],
    go:'To the table', node:'b8_c1_start'},

  areas:[
    /* 16 x 12 (city_night). . cobbles  , gutter  # house fronts  D the Fourth's door  g the alley mouth  L gas-lamps  B barrels
       < down the street, toward the Phoenix  > on into the Gadrobi lanes */
    { id:'b8_c1_street', title:'Darujhistan · the Fourth\'s street', sub:'The Gadrobi District · winter', hint:'Tap ground to move · tap a figure to talk · the Fourth\'s door is the one with the bar behind it', decor:'city_night', dark:true,
      map:[ "################",
            "###L####D##g#L##",
            "#..............#",
            "#.,,.........,.#",
            "#......B.......#",
            "<..............>",
            "#..,...........#",
            "#L....,.....,.L#",
            "######....######",
            "######.,..######",
            "######L..L######",
            "################" ],
      walk:'.,Dg<>', triggers:{D:'b8_c1_fire', g:'b8_c1_alley_mouth', '<':'b8_c1_phoenix', '>':'b8_c1_to_lanes'}, start:{x:8, y:2},
      quest:()=> b81Ph() === 1 ? 'Something on the roof. The alley behind the door.'
        : b81Ph() === 2 ? 'The paper, on the table by the fire.'
        : b81Ph() === 3 ? (!S.f.b8_c1_vetMet ? 'The Gadrobi lanes, east. The tavern with the painted sign.' : 'The fire. The paper is still on the table.')
        : b81Ph() === 4 ? (b81Hunt() ? (S.f.b8_c1_huntDone ? 'The go-between\'s door.' : 'Orsa, in her den in the lanes. She hears who brokers what.') : (!S.f.b8_c1_chancersDone ? 'There are men in the street who are not neighbours.' : 'The fire.'))
        : b81Hunt() && !b81VassoSettled() ? 'There is somebody sitting on the Fourth\'s step.' : 'The fire. Winter is nearly over.',
      npcs:[
        {id:'lampboy', name:'The lamplighter\'s boy', kind:'urchin', x:4, y:6, node:()=>'b8_c1_lampboy', show:()=>b81Ph() === 1, fresh:()=>!S.f.b8_c1_lampboy},
        {id:'chancers', name:'Men by the barrels', kind:'thug', x:7, y:5, node:()=>'b8_c1_chancers_start', show:()=>b81Ph() === 4 && b81Key() === 'quiet' && !S.f.b8_c1_chancersDone, fresh:()=>true},
        {id:'vasso', name:'A young man on the step', kind:'vasso', x:9, y:2, node:()=>'b8_c1_vasso', show:()=>b81Ph() >= 5 && b81Hunt() && (S.f.b8_vassoDone == null || S.f.b8_vassoDone === 2), fresh:()=>S.f.b8_vassoDone == null} ] },

    /* 16 x 12 (roof_night). . tile  , slate  # the drop  C chimneys  p planks between roofs  x the Guild's line on its post  S the skylight
       < the way down, a drainpipe to the alley */
    { id:'b8_c1_roofs', title:'Darujhistan · the Gadrobi roofs', sub:'Night · over the alley', hint:'Tap roof to move · the planks hold · the line is on its post by the chimney · down is west', decor:'roof_night', dark:true,
      map:[ "################",
            "#..C...#,,,,,,,#",
            "#......p,,C,,,,#",
            "#......#,,,,,x,#",
            "#......#,,,,,,,#",
            "<......p,,S,,,,#",
            "#..C...#,,,,,,,#",
            "#......#,,,,C,,#",
            "#.,....p,,,,,,,#",
            "#......#,,,,,,,#",
            "#......#,,,,,,,#",
            "################" ],
      walk:'.,pxS<', triggers:{x:'b8_c1_line', S:'b8_c1_boots', '<':'b8_c1_roofs_down'}, start:{x:2, y:5},
      quest:()=> !S.f.b8_c1_lineTried ? 'The Guild\'s line, on its post by the far chimney.' : !S.f.b8_c1_boots ? 'The skylight, where the crossbow knelt.' : 'Down, west. The paper wants reading by a fire.',
      npcs:[] },

    /* 16 x 12 (city_dusk). . cobbles  , gutter  # house fronts  D the tavern with the painted sign  S the steps down to Orsa's den
       W Benlo's barrow  x the dyers' lines  L lamps  < back to the Fourth's street  > on into the Daru District */
    { id:'b8_c1_gadrobi', title:'Darujhistan · the Gadrobi lanes', sub:'Winter · the lamps coming on', hint:'Tap ground to move · tap a figure to talk · the tavern is north, Orsa\'s is down the steps', decor:'city_dusk',
      map:[ "################",
            "##L###D####L####",
            "#..............#",
            "#.x..x....,....#",
            "#..............#",
            "<.....W........>",
            "#..,...........#",
            "#.....,.....x..#",
            "#L..##S##.....L#",
            "#...##.##......#",
            "#..............#",
            "################" ],
      walk:'.,DS<>', triggers:{D:'b8_c1_tavern', S:'b8_c1_den_door', '<':'b8_c1_lanes_back', '>':'b8_c1_to_daru'}, start:{x:1, y:5},
      quest:()=> !S.f.b8_c1_vetMet ? 'The tavern with the painted sign.'
        : b81Ph() === 3 ? 'Back to the Fourth\'s door. The paper is waiting for an answer.'
        : b81Hunt() && b81Ph() === 4 ? (!S.f.b8_c1_named ? 'Orsa, down the steps. She hears who brokers what.' : 'East, into the Daru District. The go-between\'s house.') : 'The lanes.',
      npcs:[
        {id:'benlo', name:'Benlo, at his barrow', kind:'b8_c1_benlo', x:7, y:5, still:true, node:()=>'b8_c1_benlo', fresh:()=>!S.f.b8_c1_benlo},
        {id:'dyer', name:'A dyer at her lines', kind:'b5_c5_refugee', x:3, y:4, node:()=>'b8_c1_dyer', fresh:()=>!S.f.b8_c1_dyer} ] },

    /* 16 x 12 (city_night). . the courtyard  , gutter  # walls  D the go-between's door  g the gate  B barrels  F the bravos' brazier
       L lamps  < back west to the Gadrobi lanes */
    { id:'b8_c1_house', title:'Darujhistan · a house below the Daru tier', sub:'Night · a go-between\'s courtyard', hint:'Tap ground to move · tap a figure to talk · the door is north · the lanes are west', decor:'city_night', dark:true,
      map:[ "################",
            "#####L##D##L####",
            "#..............#",
            "#..B.......B...#",
            "#..............#",
            "#.....F........#",
            "#..............#",
            "#L.....,.....,L#",
            "#######gg#######",
            "#######..#######",
            "<..............#",
            "################" ],
      walk:'.,gD<', triggers:{D:'b8_c1_closed', '<':'b8_c1_house_back'}, start:{x:2, y:10},
      quest:()=> !S.f.b8_c1_huntDone ? 'The men round the brazier in the courtyard.' : !S.f.b8_c1_closed ? 'The go-between\'s door.' : 'West, and home.',
      npcs:[
        {id:'bravos', name:'Bravos round a brazier', kind:'thug', x:7, y:5, node:()=>'b8_c1_hunt_start', show:()=>!S.f.b8_c1_huntDone, fresh:()=>true},
        {id:'captain', name:'A bravo with a name', kind:'houseguard', x:9, y:4, node:()=>'b8_c1_hunt_start', show:()=>!S.f.b8_c1_huntDone} ] } ],

  battles:{
    /* the first knife: two Guild knives in the alley behind the Fourth's door and a crossbow on the roof; the second ground is the roofs */
    b8_c1_alley:{title:'The alley behind the door', style:'city', dark:true, guild:true, warrenText:'Night in a Gadrobi alley · fog off the lake, gas-light at the far end · warrens steady', warren:{meanas:1, denul:1}, music:'dark',
      map:["##....##","#......#","..t..t..","........","#..##..#","........","..t..t..","........","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_knife',2,1],['b8_knife',5,2],['b8_guildbow',4,0]], xp:300, after:'b8_c1_alley_after',
      preText:()=>`They are dark on dark, quilted, quick, with the blades blackened so the gas-light will not find them. Two in the alley. One somewhere higher, by the sound of the slate.`,
      stage2:{title:'The roofs', xp:150, style:'roof',
        text:()=>`The alley is the Fourth's. The roof is not. The crossbow went up a drainpipe when the first knife went down, and another shape has come over the ridge to stand beside it, and the two of them are looking down into the alley with a sapper's interest in a fuse: curious, not worried.${b81Say({kettle:`\n\nKettle is already at the drainpipe. "Up," she says. "I hate up."`, brisk:`\n\nBrisk looks at the drainpipe, and then at her shield, and then at you. She goes up anyway.`, _:''})}`,
        map:["#......#","...##...","........",".#....#.","........","##....##","........","..t..t..","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_knife',2,1],['b8_guildbow',5,0]]} },
    /* Orsa's dice den: an optional brawl with the bravos at the table */
    b8_c1_den:{title:'Orsa\'s dice den', style:'cellar', warrenText:'A cellar under the Gadrobi lanes · lamp-smoke, spilt wine · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t..t..","........","...tt...","........","........",".t....t.","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_bravo',2,1],['b8_bravo',5,1],['b8_bravo',4,2]], xp:150, after:'b8_c1_den_after',
      preText:()=>`The table goes over, and the dice with it, and somebody's wine. Orsa says a word that is not in any polite dialect of Daru and gets her lamps out of the way, which is what she always does first.`},
    /* on 'hunt': the go-between's courtyard and the bravos he pays; the second ground is his stair */
    b8_c1_hunt:{title:'The go-between\'s courtyard', style:'city', dark:true, warrenText:'Night below the Daru tier · a brazier, a shut door · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t..t..","........","........","...t....","........",".t....t.","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_bravo',2,1],['b8_bravo',5,1],['b8_bravocaptain',4,2]], xp:260, after:'b8_c1_hunt_after',
      preText:()=>`Bravos: rapiers, good coats, and the easy, insulting way of standing that a man pays extra for. The one with a name has his hand on his hilt and has not drawn yet, so that you will know he does not need to.`,
      stage2:{title:'The stair', xp:130, style:'cellar',
        text:()=>`The courtyard is the Fourth's. Inside the door is a stair, and on the stair are the go-between's own two, who were paid to stand on it and have decided to earn it.${b81Say({brisk:`\n\nBrisk sets her shield at the foot of it. "Stairs," she says. "Good."`, ohl:`\n\nOhl sighs, and rolls his sleeves another turn. "Up, then. Mind the banister. They always forget the banister."`, _:''})}`,
        map:["###..###","##....##","#......#","#..tt..#","........","........","#......#","#......#","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_bravo',3,1],['b8_bravo',4,2]]} },
    /* on 'quiet': chancers at the Fourth's door. Not the Guild: men who have heard there is money on it */
    b8_c1_chancers:{title:'The Fourth\'s street', style:'city', dark:true, warrenText:'Night in the Gadrobi District · the lamps hiss · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t.....","........","....t...","........",".t....t.","........","...t....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b8_bravo',2,1],['b8_bravo',5,1],['b8_bravo',4,2]], xp:200, after:'b8_c1_chancers_after',
      preText:()=>`Three of them, with rapiers and a borrowed confidence. Not the Guild. The Guild does not send men who talk this much on the way in.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b8_c1_guildknife:{name:'A blackened Guild knife', slot:'weapon', role:'blade', who:null, atk:2, dmg:[1,6,3],
      line:'A thin Guild knife, long in the blade and short in the grip, blackened with lamp-soot and tallow so the gas-light will not find it. The first knife the Guild sent for the Fourth. It was very well looked after. Whoever carries it now should look after it too, out of professional respect.'},
    b8_c1_roofboots:{name:'A pair of roof-boots', slot:'trinket', role:'any', who:null, mv:1,
      line:'Soft-soled boots of oiled felt, laced to the knee, left on the slates by a crossbow who kicked them off to run. They make no sound on tile and grip on wet slate. The Guild buys them by the dozen. The wearer gets about faster, and quieter, and develops opinions about gutters.'} },

  scenes:{
    b8_c1_tavern:{loc:'Darujhistan', sub:'The tavern with the painted sign', cap:'A long low Gadrobi taproom, a fire at one end, benches, and over the door outside two painted women nobody can explain.', amb:'explore'},
    b8_c1_den:{loc:'Darujhistan', sub:'Orsa\'s dice den', cap:'A cellar under the Gadrobi lanes, lamp-smoke, a long table, the rattle of bones in a cup.', amb:'explore'},
    b8_c1_roofs:{loc:'Darujhistan', sub:'The Gadrobi roofs · night', cap:'Wet slate and chimneys under the fog, a tarred line strung between two of them, and the upper city\'s blue fire far off above it all.', amb:'explore'},
    b8_c1_house:{loc:'Darujhistan', sub:'A go-between\'s courtyard · night', cap:'A small walled courtyard below the Daru tier, a brazier, and a door shut on all of it.', amb:'explore'} },

  end:{
    hunt:['Names asked', 'The Guild\'s first knife came for the Fourth over the winter roofs, on a paper of its own, and went no further than the alley behind the door. The Fourth went after whoever had paid for it, through a dice den and a go-between\'s courtyard, and found a door shut on the answer, which is what a go-between is for. The city noticed the names being asked. A Guild journeyman noticed too, and came and sat on the Fourth\'s step.'],
    quiet:['The bar across the door', 'The Guild\'s first knife came for the Fourth over the winter roofs, on a paper of its own, and went no further than the alley behind the door. The Fourth did not go asking who had paid. It kept the bar across the door and the lamp out early, and let the city forget it was there, which the city, being busy, very nearly did.'] },
  endScene:'b8_daru_night',
  endCap:()=> b81Hunt() ? 'The Fourth\'s street at the end of winter, the fog thinning, and one more shape than there used to be on the step.' : 'The Fourth\'s street at the end of winter, the fog thinning, the door shut, the lamp out.',
  tease:'Next: the road east at winter\'s end, over the old Domin, with a merchant\'s wagons and a paper that wants time to cool.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b8_c1_alleyDone) x.push('The Guild\'s first knife for the Fourth came over the roofs, and went no further than the alley.');
    if (f.b8_c1_key === 'hunt') x.push(`The Fourth went asking who had paid.${f.b8_c1_huntDone ? ' A go-between\'s bravos answered, and then a shut door.' : ''}`);
    if (f.b8_c1_key === 'quiet') x.push(`The Fourth kept the bar across the door.${f.b8_c1_chancersDone ? ' The only men who came for it were chancers.' : ''}`);
    if (f.b8_vassoDone === 1) x.push(b8In('vasso') ? 'Vasso, a Guild journeyman who read the paper twice, walks with the Fourth.' : 'Vasso, a Guild journeyman, walks with the Fourth.');
    if (f.b8_vassoDone === 2) x.push('Vasso, a Guild journeyman, waits at the Fourth\'s door, if the squad will have him.');
    if (f.b8_vassoDone === 0) x.push('Vasso, a Guild journeyman, went back to the roofs. No journeyman gets out of the Guild. He meant to be the first.');
    if (f.b8_c1_lineOk) x.push('The Fourth learned the Guild\'s lines between the chimneys.');
    if (f.b8_c1_charm) x.push('An old soldier from the Seven Cities lot let a Hood-touched charm go to the Fourth.');
    if (f.b8_c1_denDone) x.push('Orsa\'s dice den needs a new table.');
    if (f.b8_c1_vell) x.push(f.b8_c1_vell === 'cut' ? 'Vell cut a Guild knot out of a dead knife\'s cord. It had his name in it.' : 'Vell kept a Guild knot that had his name in it.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b8_vassoDone != null && 'A Guild journeyman named Vasso sat on the Fourth\'s step after the go-between\'s door and said the paper had five old soldiers on it.',
    f.b8_c1_closed && 'The go-between\'s door was shut, and stayed shut on whatever was behind it. The papers were ash.',
    f.b8_c1_huntDone && 'A go-between\'s courtyard below the Daru tier, and the bravos he pays.',
    f.b8_c1_chancersDone && 'Chancers at the Fourth\'s door, who had heard there was money on it. Not the Guild.',
    f.b8_c1_bredd && 'An old soldier in the tavern with the painted sign says Neffarias Bredd stopped the Whirlwind with a shovel.',
    f.b8_c1_historian && 'There is an old man up at K\'rul\'s who walked the Chain of Dogs and wrote it down.',
    f.b8_c1_paperRead && 'The paper on the first knife: five strokes, the chalk sign that was on the Fourth\'s door, and no name.',
    f.b8_c1_alleyDone && 'The Guild came for the Fourth on a winter night, over the roofs.',
    'The Fourth, in Darujhistan, the winter before the Fete.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: a winter night at the Fourth's door ======== */
    b8_c1_start:()=>({sp:'The Fourth\'s door', scene:'b8_door', fx:()=>{ S.f.b8_c1_ph = S.f.b8_c1_ph || 1; }, again:()=>'The table by the fire, the cups, the bar across the door.', txt:
`The room is narrow and warm and smells of the tea Ohl swears is medicine. There is a fire, and a table with five chairs at it and one more against the wall for whoever comes, and a bar of oak across the door that somebody put up an hour before anyone usually does.

${b81Say({brisk:`Brisk is sitting where she always sits, facing the door, with her boots on. She has not said why she put the bar up early. She has not needed to.`, _:`You put the bar up early yourself. You could not have said why.`})}${b81If('kettle', `\n\nKettle is at the table with the munitions ledger open, counting what is left of the war under her breath. She does it every winter. It never comes out more.`)}${b81If('tuft', `\n\nTuft has the Deck out of her sleeve and is not shuffling it, only holding it, the way she holds it when the room has something in it.`)}${b81If('ohl', `\n\nOhl is warming his hands round a cup. "It's the wind," he says, to nobody in particular, and does not believe it either.`)}

Overhead, on the slates, something shifts its weight. It is not the wind. The wind does not stop when you stop talking.`,
      ch:[b8ReadChoice(1),
          {t:'Listen.', go:'b8_c1_listen'},
          {t:'Out into the street, quietly.', go:()=>startExplore()}]}),
    b8_c1_read:()=>b8ReadOffer(1),
    b8_c1_card:()=>b8ReadCard(1),

    b8_c1_listen:()=>({sp:'The Fourth\'s door', scene:'b8_door', again:()=>'The room, very quiet, listening to the roof.', txt:
`The room holds still. ${b81Say({brisk:'Brisk has the shield off its peg without seeming to have stood up.', kettle:'Kettle closes the ledger very gently.', _:'The fire settles.'})}

Slate, again: a soft weight, and then another, going toward the back of the house, where the roof comes down low over the alley. A pause. The scrape of something light and iron being set against a chimney.

${b81Say({tuft:`"Three," Tuft says, very low. "Two on the alley side. One staying high." She puts the Deck away. "They aren't thieves. Thieves don't stay high."`, ohl:`"There are only so many reasons," Ohl says, very low, "for a man to stand still on your roof in winter."`, _:`Whoever it is, they are not thieves. Thieves do not stand still.`})}`,
      ch:[{t:'Out the back, into the alley. Now.', onward:true, go:'b8_c1_alley_start'},
          {t:'Out the front, and look round from the street.', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the lamplighter's boy: a word about the roof, for a copper */
    b8_c1_lampboy:()=>({sp:'The lamplighter\'s boy', scene:'b8_daru_night', fx:()=>{ S.f.b8_c1_lampboy = 1; }, again:()=>'The lamplighter\'s boy, on his ladder, pretending not to look at your roof.', txt:
`The lamplighter's boy is up his ladder at the corner, trimming the gas-cock on a lamp that does not need trimming. He comes down when he sees you, and looks at your roof, and then very carefully does not.

"There's men on your slates, Sergeant," he says. He has called every one of you Sergeant since he was six. "Came over from Tanner's Row along the ridge. Dark coats." He puts his hand out, flat, for a copper, and then thinks better of it and puts it away. "Didn't see me. I'm a lamplighter. People don't see lamplighters."`,
      ch:[{t:'Give him a copper anyway, and send him home.', fx:()=>{ S.f.b8_c1_lampboyPaid = 1; }, go:'b8_c1_lampboy_home'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_lampboy_home:()=>({sp:'The lamplighter\'s boy', scene:'b8_daru_night', txt:
`He takes the copper, and bites it from habit, and goes off down the street at a walk that wants very badly to be a run. At the corner he stops and looks back once at the roof, and then he is gone into the fog.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* the alley mouth: the fight, by phase */
    b8_c1_alley_mouth:()=> b81Ph() === 1 ? DLG.b8_c1_alley_start() : {sp:'The alley', scene:'b8_daru_night', again:()=>'The alley behind the Fourth\'s door, swept.', txt:
`The alley behind the Fourth's door, narrow, wet, with the drainpipe going up the back wall to the roof. ${S.f.b8_c1_alleyDone ? 'It has been swept since. Alleys get swept, in the Gadrobi, and the street does not ask by whom.' : ''}`,
      ch:[{t:'Up the drainpipe, to the roofs.', req:()=>!!S.f.b8_c1_alleyDone, go:()=>{ startExplore('b8_c1_roofs'); talk('b8_c1_roofs_arrive'); }},
          {t:'Back to the street.', go:()=>startExplore()}]},
    b8_c1_alley_start:()=>({sp:'The alley', scene:'b8_daru_night', txt:
`The alley behind the house is a slot of wet dark between two back walls, with the gas-light from the far end lying along it in a blue line. Two shapes are standing in it, very still, by the Fourth's back door. They have their backs to the wall and their faces up toward the roof, waiting for something to come down off it.

Something is up there, on the low eave over the door. You can hear it breathing.${b81If('kettle', `\n\nKettle has a sharper in her hand already and is looking at the eave, measuring. "I could," she says. "But then we'd need a new roof."`)}${b81If('vell', `\n\nVell is looking at the roofline the way he looks at everything, as a way across. "There's a line on the next chimney," he whispers. "Guild cord. That's how they came."`)}`,
      ch:[{t:'"Fourth. On me." Straight down the alley at them.', go:()=>startBattle('b8_c1_alley', {})},
          {t:'Round by the neighbour\'s yard, and come at them from the dark end.', check:['guile', 15],
            edges:id=>[id === 'tuft' && ['Meanas: the shadows in an alley are hers', 2], id === 'ellis' && ['Claw-trained, and she grew up on docks like this', 2], id === 'vell' && ['he knows how the Guild watches an alley', 2], id === 'sgt' && ['you have lived on this street for years', 1], id === 'kettle' && ['she knows every yard on the street by its dog', 1], id === 'brisk' && ['a heavy in mail is not built for yards', -1], id === 'greysword' && ['the Grey Swords did not teach creeping', -1]],
            near:{t:()=>`Yes, but the neighbour's yard has a goat in it now, and ${b81Nm(b81Who())} ${b81V(b81Who(), 'go', 'goes')} down over it in the dark and up again with a wrenched knee. ${b81Nmc(b81Who())}'ll feel it in the fight.`, fx:()=>bruise(b81Who(), bruiseN())},
            go:()=>startBattle('b8_c1_alley', nearMiss() ? {} : {surprise:'p'}), fail:'b8_c1_alley_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_alley_seen:()=>({sp:'The alley', scene:'b8_daru_night', txt:
`The neighbour's dog has an opinion. Both shapes turn at once, smoothly, and the one on the eave above the door moves too, and there is a click in the dark that is a crossbow's.`,
      ch:[{t:'Down the alley, before it looses.', go:()=>startBattle('b8_c1_alley', {surprise:'e'})}]}),
    b8_c1_alley_after:()=>({sp:'The roofs', scene:'b8_c1_roofs', fx:()=>{ if (!S.f.b8_c1_alleyDone) { S.f.b8_c1_alleyDone = 1; gain('b8_c1_guildknife'); } S.f.b8_c1_ph = Math.max(2, S.f.b8_c1_ph || 1); }, txt:
`It is quiet on the roofs, after. The fog has come up off the lake and is lying in the streets below like milk in a bowl, and the slates are wet, and the whole of the Gadrobi District is shut and dark under it but for the blue of the lamps.

Far off and above, the upper city burns its gas-fire in a thousand windows, as it does every night, and does not know any of this happened.

The first knife lies where it was dropped, on the eave over the Fourth's back door: thin, long in the blade, blackened with soot so the light would not find it. It goes in the kit. There is a paper too, folded small and sealed with nothing, in the inside of a quilted sleeve.${b81Say({brisk:`\n\nBrisk stands on the ridge with her shield on her arm, looking down at her own back door. "Our door," she says. "They came to our door."`, ohl:`\n\nOhl is sitting on the ridge-tiles getting his breath. "Twenty-odd years in the army," he says, "and the first time anyone came for me in my own house was after I'd left it."`, _:''})}`,
      ch:[{t:'Look about the roofs.', onward:true, go:()=>{ startExplore('b8_c1_roofs'); talk('b8_c1_roofs_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 2: the roofs, and the paper ======== */
    b8_c1_roofs_arrive:()=>({sp:'The Gadrobi roofs', scene:'b8_c1_roofs', again:()=>'The Gadrobi roofs, wet slate, fog below.', txt:
`The roofs of the Gadrobi District run on east in the fog, ridge after ridge, with chimneys standing up out of them like old men in a crowd. Between two of the chimneys, very fine and nearly invisible, a line is strung: tarred cord, taut, belayed on an iron hook. That is how they came.

By the skylight, where the crossbow knelt, something has been left on the slates.`,
      ch:[{t:'Walk the roofs.', go:()=>startExplore()}]}),
    /* the Guild's line: the trick */
    b8_c1_line:()=>({sp:'The Guild\'s line', scene:'b8_c1_roofs', again:()=> S.f.b8_c1_lineOk ? 'The Guild\'s line between the chimneys. The Fourth knows its knots now.' : 'The Guild\'s line between the chimneys, taut, tarred, going away east into the fog.', txt:
`The line runs from an iron hook in this chimney's mortar to another chimney three roofs east, low enough to reach and high enough to clear a street. Close to, it is not one cord but two, laid together, with a sliding loop on the lower one and a knot every few paces that means something to somebody.

You have seen lines like this before. Years ago, over the Daru District, the night of a roof the Fourth does not talk about, behind a rope boy who never looked down. The Guild strings them for its own. It does not take them down after.${b81If('vell', `\n\nVell has his hand on it already. "Mine were better," he says. "These are a clan's. Look at the belay." His fingers find the knots without looking. "You can read the way home off them, if you know how."`)}${b81If('tuft', `\n\nTuft looks along it into the fog. "The Rope's," she says. "The Patron of Assassins. They say he likes it when somebody uses his lines who isn't his." She does not sound as if she likes that.`)}`,
      ch:[{t:'Learn the lines: the loop, the knots, the way across.', check:['wits', 17], trick:'b8_c1_roofline', req:()=>!S.f.b8_c1_lineTried, fx:()=>{ S.f.b8_c1_lineTried = 1; },
            edges:id=>[id === 'vell' && ['he strung lines like these for four years', 3], trickBy('rope') === id && ['the Rope\'s Way: it has crossed lines like these before', 2], id === 'ellis' && ['the Claw taught her ropes and roofs', 2], id === 'vasso' && ['six years on the Guild\'s lines', 3], id === 'sgt' && ['you crossed the Daru roofs once behind a rope boy', 1], id === 'kettle' && ['she knows what a hook in mortar will hold, to the ounce', 1], id === 'tuft' && ['Meanas; the Rope\'s own warren', 1], id === 'brisk' && ['a heavy on a line is a weight, not a soldier', -1], id === 'ohl' && ['old knees, wet slate', -1], id === 'greysword' && ['Grey Sword plate on a cord is a bell', -2]],
            near:{t:()=>`Yes, but the loop runs before ${b81Nm(b81Who())} ${b81V(b81Who(), 'are', 'is')} ready, and ${b81Nm(b81Who())} ${b81V(b81Who(), 'come', 'comes')} back off the line with both palms burned raw on the tar. ${b81Nmc(b81Who())}'ll feel it in the next fight.`, fx:()=>bruise(b81Who(), bruiseN())},
            go:'b8_c1_line_ok', fail:'b8_c1_line_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_line_ok:()=>({sp:'The Guild\'s line', scene:'b8_c1_roofs', fx:()=>{ S.f.b8_c1_lineOk = 1; }, txt:
`By the time the fog has thinned ${by({sgt:'you can', vell:'Vell has gone across and back twice, showing off, and', ellis:'Ellis has gone across and back once, without a sound, and', _:'{who} can'})} put a body across the gap on the sliding loop and back again, and read the knots for which way the line goes home: a single for east, a double for down, a twist for "this one is watched".

It is a good line. Whoever strung it takes pride in it. It is a thing the Fourth will remember the next time it is on a roof with somebody's knives, and the next squadmate along needs to be where you are.`,
      ch:[{t:'Back along the ridge.', go:()=>startExplore()}]}),
    b8_c1_line_no:()=>({sp:'The Guild\'s line', scene:'b8_c1_roofs', txt:
`The loop slides, and sticks, and slides again, and the knots go by under the fingers like words in a language half heard. The double might mean down. It might mean "do not". There is a fall of four storeys under the line to find out.

The line stays where it is, taut, tarred, minding its own business.`,
      ch:[{t:'Back along the ridge.', go:()=>startExplore()}]}),
    /* the skylight: the roof-boots */
    b8_c1_boots:()=>({sp:'The skylight', scene:'b8_c1_roofs', fx:()=>{ if (!S.f.b8_c1_boots) { S.f.b8_c1_boots = 1; gain('b8_c1_roofboots'); } }, again:()=>'The skylight, where the crossbow knelt.', txt:
`Where the crossbow knelt by the skylight there is a pair of boots on the slates: soft felt, oiled, laced to the knee, standing side by side as neatly as if their owner had stepped out of them at his own front door. He kicked them off to run, when the roof stopped being his. Barefoot on wet slate in winter is a hard way to leave.

They go in the kit. ${b81Say({kettle:`Kettle turns one over and looks at the sole. "Felt," she says, with respect. "Not a sound. I want three pairs."`, ellis:`Ellis turns one over and nods at the sole. "Claw used to buy these," she says. "From the same man, probably."`, _:'They are very good boots.'})}`,
      ch:[{t:'Back along the ridge.', go:()=>startExplore()}]}),
    b8_c1_roofs_down:()=>({sp:'The way down', scene:'b8_c1_roofs', txt:
`The drainpipe goes down the back wall of the house to the alley, the way the knives came. Below, the back door is still on its hinges, which is something. Inside, the fire will still be in.`,
      ch:[{t:'Down, and in by the fire, with the paper.', onward:true, go:()=>{ startExplore('b8_c1_street'); talk('b8_c1_paper'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the paper on the table (and Vell's mark, if he walks: callback 4) */
    b8_c1_paper:()=>{ const dead = b81CoreDead().length;
      return {sp:'The paper', scene:'b8_door', html:contractHTML(), fx:()=>{ S.f.b8_c1_paperRead = 1; S.f.b8_c1_ph = Math.max(2, S.f.b8_c1_ph || 1); }, again:()=>'The paper on the table by the fire, held flat under a cup.', txt:
`By the fire, with the bar back across the door, the paper comes open on the table under a cup.

It is good paper, Daru rag, and there is very little on it. A chalk sign drawn small, the same sign somebody chalked on the Fourth's door-post a week ago and the rain took off again. The name of the street. And five short strokes in a row, a soldier's tally, a clerk's count of heads.${dead ? ` Five, which was true once. Whoever wrote it had old news.` : ''}

No name. No client. A Guild paper never has the client on it; that is what a go-between is for.

${b81Say({kettle:`Kettle counts the strokes with one sooty finger. "Five," she says. "They counted us." She sounds more offended than frightened, which in Kettle is the same thing.`, brisk:`Brisk looks at the five strokes for some time. "Paid for, that," she says at last. "By someone with the money."`, _:`Five strokes, paid for. By someone with the money.`})}${b81If('tuft', `\n\nTuft has gone very still. "It isn't the Claw," she says. "The Claw doesn't write anything down." That seems to comfort her, a little.`)}${b81If('vell', `\n\nVell is not looking at the paper. He is looking at the cord off the dead knife's wrist, which came in with the knife: Guild cord, knotted in a run, the way the clans keep their tallies. One of the knots is a shape you have seen him tie in his sleep. It is his mark.`)}`,
      ch:[{t:'"Vell. What does it say?"', req:()=>b8In('vell') && !S.f.b8_c1_vell, go:'b8_c1_vell'},
          {t:'Back to the fire.', go:'b8_c1_fire'}]}; },
    b8_c1_vell:()=>({sp:'Vell', scene:'b8_door', txt:
`Vell turns the cord over in his hands, knot by knot, and his lips move, the way they do when he is counting roofs.

"It isn't on the paper," he says. "It's the clan's cord. Every knife carries his clan's tally, who it owes and who owes it." He puts his thumb on the knot. "That's me. A runner's knot, and a twist after it." He swallows. "The twist means owed. Not paid for, not a job. Owed." He laughs, not well. "They remember, Sergeant. I told you they remember."

"No one paid for me. It's not like yours." He holds the cord out. "They're just keeping count."`,
      ch:[{t:'"Then cut it out of the cord, Vell. Your count is with us now."', fx:()=>{ S.f.b8_c1_vell = 'cut'; b81L('vell', 2); }, go:'b8_c1_vell_cut'},
          {t:'"Keep it. Know what they think you owe."', fx:()=>{ S.f.b8_c1_vell = 'kept'; b81L('vell', 1); }, go:'b8_c1_vell_kept'}]}),
    b8_c1_vell_cut:()=>({sp:'Vell', scene:'b8_door', txt:
`He takes his knife, the one he is still learning which end of, and cuts the one knot out of the run, and holds it a moment, a little twist of tarred cord the size of a fingernail.

Then he puts it in the fire. It spits once, the tar, and is gone. "There," he says, and says his own name under his breath three times, which is what he does when he is frightened. He does not look frightened. He looks like somebody who has put a thing down.`,
      ch:[{t:'Back to the fire.', go:'b8_c1_fire'}]}),
    b8_c1_vell_kept:()=>({sp:'Vell', scene:'b8_door', txt:
`He winds the cord round two fingers and puts it in his coat, with the copper with the hole in it and the whistle he is not supposed to have.

"Better to know," he says. "On the roofs, the line you can see is the one that doesn't kill you." He ties a knot in nothing, out of habit, and undoes it. "Thank you, Sergeant."`,
      ch:[{t:'Back to the fire.', go:'b8_c1_fire'}]}),

    /* the fire: the Fourth's door, by phase. The games pass wraps this node: keep the id */
    b8_c1_fire:()=>{ const ph = b81Ph(), rk = 'b8_c1_rest' + ph;
      const way = ph === 1 ? {t:'Out the back, into the alley.', onward:true, go:'b8_c1_alley_start'}
        : ph === 2 ? (S.f.b8_c1_paperRead ? {t:'Sleep, such as it is. In the morning, the lanes.', onward:true, fx:()=>{ S.f.b8_c1_ph = 3; }, go:'b8_c1_morning'} : {t:'The paper.', go:'b8_c1_paper'})
        : ph === 3 ? (b81KeyOpen() ? {t:'The paper on the table. Decide.', go:'b8_c1_key'} : null)
        : ph === 5 ? ((!b81Hunt() || b81VassoSettled()) ? {t:'Winter\'s end. The road east.', onward:true, go:'b8_c1_onward'} : null) : null;
      return {sp:'The Fourth\'s door', scene:'b8_door', html:contractHTML(),
        again:()=>'The Fourth\'s fire, the table, the bar across the door.', txt:
`${ph === 1 ? `The fire is in, and the cups are on the table, and over your heads the slates have gone quiet, which is worse.` : ph === 2 ? `The fire is low and the bar is across the door again. No one suggests going to bed. ${S.f.b8_c1_paperRead ? 'The paper lies on the table under a cup, five strokes up.' : 'The paper off the first knife is still folded small on the table, waiting.'}` : ph === 3 ? `Days, now, since the alley. The fire, the table, the ledger. ${b81KeyOpen() ? 'The paper is still on the table under its cup. It wants an answer.' : 'The paper is still on the table under its cup. The lanes might know something the paper does not.'}` : ph === 4 ? (b81Hunt() ? `The fire is in, and nobody is sitting by it long. The squad is out asking names, and the city is noticing.` : `The bar is across the door from dusk now, and the lamp goes out early, and the Fourth sits by the fire in the dark and listens to the roof.`) : `The end of winter. The fog comes up off the lake later every evening, and thinner, and the street smells of the first thaw.${b8In('vasso') ? ' There is a sixth chair at the table now that has somebody in it.' : ''}`}${b81Say({kettle:`\n\nKettle has the ledger open again.`, ohl:`\n\nOhl is making the tea.`, _:''})}`,
        ch:[...(ph === 1 ? [b8ReadChoice(1)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>ph >= 2 && !S.f[rk], fx:()=>{ S.f[rk] = 1; rest('The Fourth sits an hour by its own fire. Wounds close, mostly.'); }, go:'b8_c1_fire_rest'},
            {t:'Talk with the squad.', go:'b8_c1_fire_talk'},
            ...(way ? [way] : []),
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c1_fire_rest:()=>({sp:'The Fourth\'s door', scene:'b8_door', txt:
`An hour, then, by the fire, with the bar across the door.

${b81Say({ohl:`Ohl goes round the squad with his tea and his hands, and closes what wants closing, and complains about each of you while he does it. "Knife cuts," he says. "In the city. At my age."`, _:'The squad sees to its own cuts. It has had practice.'})}${b81If('brisk', `\n\nBrisk sleeps sitting up, facing the door, with her shield against her knee.`)}${b81If('tuft', `\n\nTuft sleeps with the lamp lit. In all these years no one has asked her to put it out.`)}`,
      ch:[{t:'Back to the fire.', go:'b8_c1_fire'}]}),
    b8_c1_fire_talk:()=>{ const ph = b81Ph(), late = ph >= 3, ln = [];
      if (b8In('brisk')) ln.push(late ? `Brisk is mending a strap on the shield that does not need mending. "Years," she says. "Years of paying rent, and nobody's tried the door. Now this." She pulls the stitch tight. "Should have known. Hood waits. That's all he does."` : `Brisk is sitting with the shield against her chair. "Two at the back," she says. "One on the roof." She touches two fingers to her brow, the old salute, to nobody. "Not tonight, Hood. Not in my kitchen."`);
      if (b8In('kettle')) ln.push(late ? `Kettle has the ledger open. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," she says. "${numw(S.inv.burner || 0, true)} burner${(S.inv.burner || 0) === 1 ? '' : 's'}. ${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}. Years I've kept these for a rainy day." She looks at the window, where it is raining. "Well."` : `Kettle is counting under her breath. "I've got all my fingers," she says, apropos of nothing, to the ledger. "Chub would be proud. Chub would also be up on that roof by now."`);
      if (b8In('tuft')) ln.push(late ? `Tuft is shuffling the Deck and not dealing it. "The Assassin keeps turning up," she says. "Every time. I'm not even drawing." She puts it away. "I'd stop, but it'd only come anyway."` : `Tuft is sitting very still, with the lamp near her. "They weren't afraid of us," she says. "That's what I keep thinking. They were told we were old."`);
      if (b8In('ohl')) ln.push(late ? `Ohl is reading his list by the fire, the oilcloth open on his knee, two hundred and more names. "No new ones," he says, and folds it. "I'd like to keep it that way. I'm too old to start a second column."` : `Ohl is warming his hands. "I used to argue with Hood in the field," he says. "Now he comes to the house." He drinks his tea. "Rude, I call it."`);
      if (b8In('sohra')) ln.push(late ? `Sohra is sitting cross-legged by the hearth with her bone cup. "A city has no herds," she says. "Only roofs. The bones do not know what to do with roofs." She throws them anyway, and frowns.` : `Sohra has not moved from the window. "The dead in this city are very many and very quiet," she says. "Tonight three more. They are not saying who sent them."`);
      if (b8In('greysword')) ln.push(late ? `Dannet is oiling the grey shield. "In Capustan the Guild of the city would have been hanged from the walls," she says. "Here they have a Grand Master." She considers that. "The Daru are very tolerant."` : `Dannet stands by the door with her back to the wall, the way the Grey Swords stood the walls of Capustan. "The Wolves are quiet," she says. "I think they are listening too."`);
      if (b8In('ellis')) ln.push(late ? `Ellis is sitting with her back to the wall, facing out, the gloved hand in her lap. "I counted their sentries for six years," she says. "Now somebody's counting ours." She almost smiles. "Five strokes. They didn't count me."` : `Ellis is at the back window with the shutter open a crack. "They came over from Tanner's Row," she says. "On the ridge. Good line." She closes the shutter. "I'd have come the same way."`);
      if (b8In('vell')) ln.push(late ? `Vell is tying knots in a bit of cord and untying them again, faster than anyone can follow. "The clans talk," he says. "On the roofs. I could find out what they say." He looks at you. "I'd rather not. But I could."` : `Vell is sitting under the table, which is where he likes to sit in a room with a roof that has been walked on. "Clan work," he says. "Not a master's. Too neat." He thinks about it. "That's worse, probably."`);
      if (b8In('brannoc')) ln.push(late ? `Brannoc is going on about Falar, where, he says, a man with a price on his head gets a better class of assassin, and a boat to leave in. "Here it's all roofs," he says. "This city has never heard of the sea."` : `Brannoc is cleaning his blade and talking, which is what he does when he is frightened. "In Falar," he says, "they'd have sent a man with a letter first. Politeness. This city has none."`);
      if (b8In('ressa')) ln.push(late ? `Ressa is sitting with her hands round a cup, warming them. "The temples here ring bells for everything," she says. "Births, deaths, the hour." She listens. "There's no bell for this."` : `Ressa has her hands round a cup. "It took my street and left me," she says, of something else entirely. "This city keeps trying to take the house." She drinks. "It won't."`);
      if (b8In('vasso')) ln.push(`Vasso sits with his back to the wall and his face away from the window, which is where he always sits. "The bells," he says. "Listen." Somewhere across the city an old one is ringing the hour, very low. "That's K'rul's. No one rings it. It rings anyway." He seems to find that a comfort.`);
      return {sp:'The Fourth\'s door', scene:'b8_door', txt:ln.length ? ln.join('\n\n') : `The house is quiet tonight. You sit by the fire with the ledger, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b8_c1_fire'}]}; },

    /* the street's ends */
    b8_c1_phoenix:()=>({sp:'Down the street', scene:'b8_daru_night', again:()=>'Down the street, the Phoenix\'s lamp, and the Fourth not going in.', txt:
`Down the street, at the bottom where it meets the lane, there is a painted bird over a door and a lamp lit under it, and noise behind it, as there always is: the Phoenix. The Fourth does not go in. The Fourth has its own door.${b81FromMoi() && b8In('brisk') ? `\n\nBrisk stops at the corner, as she always does, and glares at the Phoenix's door for a breath. There was a winter once when she meant to stand in it. The Phoenix had other ideas. She has not forgiven it.` : b8In('brisk') ? `\n\nBrisk looks at the Phoenix's lamp, and at the door under it, and walks the other way, as she always does.` : ''}`,
      ch:[{t:'Back up the street.', go:()=>startExplore()}]}),
    b8_c1_to_lanes:()=>{ const ph = b81Ph();
      if (ph <= 2) return {sp:'The street', scene:'b8_daru_night', txt:
`East, the street runs on into the Gadrobi lanes, all shut and dark under the fog at this hour. Nothing is open at the end of it that would talk to the Fourth tonight. ${ph === 1 ? 'And there is something on your roof.' : 'And the paper wants reading first, by the fire.'}`,
        ch:[{t:'Back to the street.', go:()=>startExplore()}]};
      return {sp:'The street', scene:'b8_gadrobi', txt:
`East, the street runs on into the Gadrobi lanes: tanners' yards, the dyers' lines strung across the lane, cheap rooms, a tavern, and a set of steps going down to Orsa's.`,
        ch:[{t:'Into the lanes.', onward:true, go:()=>{ startExplore('b8_c1_gadrobi'); if (!S.f.b8_c1_lanesSeen) talk('b8_c1_lanes'); }},
            {t:'Not now.', go:()=>startExplore()}]}; },

    /* ======== phase 3: the Gadrobi lanes, days on ======== */
    b8_c1_morning:()=>({sp:'The Fourth\'s door', scene:'b8_door', txt:
`Morning comes, grey, and then another one, and then a third. Nothing comes over the roof. The lamplighter's boy looks at the house every evening and does not cross the street. The alley gets swept.

The paper stays on the table under its cup. The Fourth goes about the city as it always does, and listens harder.

${b81Say({kettle:`"The lanes talk," Kettle says, on the third morning, pulling her boots on. "The tavern with the painted sign. There's always some old soldier in there who knows a man who knows a man."`, ohl:`"The lanes talk," Ohl says, on the third morning. "There's a tavern on the corner of the dyers' row with old soldiers in it. Old soldiers talk most of all."`, _:`The lanes talk. There is a tavern at the corner of the dyers' row with old soldiers in it, and old soldiers talk most of all.`})}`,
      ch:[{t:'Out, into the street.', go:()=>startExplore()}]}),
    b8_c1_lanes:()=>({sp:'The Gadrobi lanes', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c1_lanesSeen = 1; }, txt:
`The Gadrobi lanes in a winter dusk: the tanners' vats steaming in their yards, the dyers' lines strung across the lane with the day's cloth stiff on them in three colours of blue, the hills close and black behind the roofs, and the lamps coming on one by one, blue, as the lamplighters go by with their poles.

On the corner of the dyers' row there is a tavern with a painted sign over its door. Down a set of steps under a cobbler's, Orsa keeps her dice den. And Benlo is where Benlo always is, at his barrow, with his brazier and his chestnuts and whatever else he has under the cloth this week.`,
      ch:[{t:'Walk the lanes.', go:()=>startExplore()}]}),
    b8_c1_lanes_back:()=>({sp:'The Gadrobi lanes', scene:'b8_gadrobi', txt:
`West, the lane runs back to the Fourth's street and the Fourth's door.`,
      ch:[{t:'Home, to the Fourth\'s street.', onward:true, go:()=>startExplore('b8_c1_street')},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_to_daru:()=>{ const go = b81Hunt() && b81Ph() === 4 && !!S.f.b8_c1_named;
      return {sp:'The lanes', scene:'b8_gadrobi', txt: go ?
`East, the lanes climb out of the Gadrobi toward the Daru tier, steps and terraces and better lamps, and the houses get taller and quieter and further apart. Orsa's go-between keeps a house on the last of the Gadrobi streets before the Daru begins, with a wall round its courtyard and a lamp on the gate.` :
`East, the lanes climb toward the Daru District, steps and terraces and better lamps. There is nothing up there for the Fourth tonight${b81Hunt() && b81Ph() === 4 ? ' that Orsa has not yet put a name to' : ''}.`,
        ch: go ? [{t:'Up to the go-between\'s house.', onward:true, go:()=>{ startExplore('b8_c1_house'); talk('b8_c1_house_arrive'); }},
                  {t:'Not now.', go:()=>startExplore()}]
               : [{t:'Back down the lane.', go:()=>startExplore()}]}; },

    /* the dyer at her lines: a word about the city's gossip */
    b8_c1_dyer:()=>({sp:'A dyer at her lines', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c1_dyer = 1; }, again:()=>'The dyer, her arms blue to the elbow, taking in the day\'s cloth.', txt:
`A dyer is taking in the day's cloth off her lines before the fog gets at it, with her arms blue to the elbow and a pole with a hook on the end of it.

"Malazans," she says, not unkindly, when she sees you. "Your sort are all the fashion up the hill this winter. The young lords wear your torcs. Iron ones, like soldiers." She hooks a length of blue down. "There's three of them on the Council now, young ones. Vidikas, and Lim, and an Orr. They duel. They wear torcs." She folds the cloth over her arm. "I dye their linen. You'd be surprised what comes out of it."`,
      ch:[{t:'Back to the lane.', go:()=>startExplore()}]}),

    /* Benlo at his barrow: chestnuts, torcs, and the Moranth's at a buyer's price */
    b8_c1_benlo:()=>({sp:'Benlo', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c1_benlo = 1; }, again:()=>'Benlo, at his barrow, with his brazier and his cloth.', txt:
`Benlo is a small, round Gadrobi with a brazier on his barrow and a cloth over the back half of it that he lifts for people he knows. On the front half, chestnuts. Under the cloth this week, a row of iron torcs, very bad copies of Malazan ones, for the young lords up the hill who want to look like soldiers.

"Sergeant." He gives you a chestnut without being asked, as he always does. "I heard about your roof." Everybody in the Gadrobi has heard about your roof. "Nasty. On a winter night, too." He lowers his voice. "If the squad wanted to be ready for the next one, I know a man with a crate of clay that fell off a Moranth cart. The price is the price. The price is a buyer's price."${b81If('kettle', `\n\nKettle has gone very still beside you, like a cat at a mousehole.`)}`,
      ch:[{t:'A sharper.', tag:`${S.f.b8_c1_cheap ? 3 : 5} silver`, req:()=>(S.silver || 0) >= (S.f.b8_c1_cheap ? 3 : 5) && (S.f.b8_c1_bought || 0) < 3, fx:()=>{ const p = S.f.b8_c1_cheap ? 3 : 5; S.silver -= p; S.inv.sharper = (S.inv.sharper || 0) + 1; S.f.b8_c1_bought = (S.f.b8_c1_bought || 0) + 1; updSilver(); note(`A sharper off a Moranth cart, for ${p} silver.`, 'good'); }, go:'b8_c1_benlo'},
          {t:'A burner.', tag:`${S.f.b8_c1_cheap ? 4 : 6} silver`, req:()=>(S.silver || 0) >= (S.f.b8_c1_cheap ? 4 : 6) && (S.f.b8_c1_bought || 0) < 3, fx:()=>{ const p = S.f.b8_c1_cheap ? 4 : 6; S.silver -= p; S.inv.burner = (S.inv.burner || 0) + 1; S.f.b8_c1_bought = (S.f.b8_c1_bought || 0) + 1; updSilver(); note(`A burner off a Moranth cart, for ${p} silver.`, 'good'); }, go:'b8_c1_benlo'},
          {t:'Talk the price down. ("A buyer\'s price, Benlo. We are the buyers.")', check:['guile', 15], req:()=>!S.f.b8_c1_haggle,
            edges:id=>[id === 'kettle' && ['she ran contraband for a Falari smuggler, and knows what a crate costs', 3], id === 'brannoc' && ['Falari: they haggle in their sleep', 2], id === 'vell' && ['a Daru boy knows a Gadrobi barrow', 1], id === 'sgt' && ['you have bought his chestnuts for years', 1], id === 'brisk' && ['she counts, but she does not bargain', -1], id === 'greysword' && ['a Capan lady does not haggle', -1]],
            near:{t:()=>`Yes, but Benlo will only come down if ${b81Nm(b81Who())} ${b81V(b81Who(), 'stand', 'stands')} and hear the whole story of his cousin's lungs, and by the end of it ${b81Nm(b81Who())} ${b81V(b81Who(), 'are', 'is')} coughing in sympathy: rattled.`, fx:()=>b81Rattle(b81Who())},
            fx:()=>{ S.f.b8_c1_haggle = 1; }, go:'b8_c1_benlo_down', fail:'b8_c1_benlo_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_benlo_down:()=>({sp:'Benlo', scene:'b8_gadrobi', fx:()=>{ S.f.b8_c1_cheap = 1; }, txt:
`Benlo looks at the sky, and at the chestnuts, and at the Fourth, and sighs as if he were selling his own children.

"Three," he says. "And four for a burner. And you never had them from me, and I never knew a man with a crate, and the Moranth never had a cart." He turns a chestnut over. "Very bad roads up there, I hear. Carts fall over all the time."`,
      ch:[{t:'Back to the barrow.', go:'b8_c1_benlo'}]}),
    b8_c1_benlo_no:()=>({sp:'Benlo', scene:'b8_gadrobi', txt:
`"The price is the price, Sergeant," Benlo says, sorrowfully. "My man has expenses. Carts are expensive to fall off."`,
      ch:[{t:'Back to the barrow.', go:'b8_c1_benlo'}]}),

    /* the tavern with the painted sign (Rumjugs and Sweetlard, rule 16) */
    b8_c1_tavern:()=>({sp:'The tavern with the painted sign', scene:'b8_c1_tavern', fx:()=>{ S.f.b8_c1_sign = 1; }, again:()=>'The tavern with the painted sign, the fire at one end, the old soldier on his bench at the other.', txt:
`The tavern on the corner of the dyers' row has no name anybody uses. It has a sign instead, over the door, freshly painted every spring by somebody who takes it seriously: two big women, arm in arm, laced into bodices that are losing an argument, one with a rum jug sat on the muscle of her arm, one with a tray of honey-cakes and a wink. Across the top, on a red ribbon, it says *Rumjugs and Sweetlard*.

No one in the tavern knows who they are. The landlord says the sign came with the lease. The painter, asked, says he paints what he sees.${b81If('kettle', `\n\nKettle has stopped under the sign with her hands behind her back and her head tipped up. "I've seen them before," she says slowly. "Years ago. On a crate lid, at the crossing." She looks at the arm. "I'd still follow them into a breach."${b81If('brisk', `\n\n"You'd follow the cake," says Brisk.`)}`)}

Inside, the taproom is long and low and warm, with a fire at one end and benches down both walls. At the end of one bench, by himself, an old man in a faded Seven Cities telaba is drinking with the steady care of a soldier paying for it himself.`,
      ch:[{t:'The old soldier at the end of the bench.', go:'b8_c1_vet'},
          {t:'Back out to the lane.', go:()=>startExplore()}]}),
    b8_c1_vet:()=>({sp:'An old soldier', scene:'b8_c1_tavern', fx:()=>{ S.f.b8_c1_vetMet = 1; }, again:()=>'The old soldier from the Seven Cities lot, on his bench, with his cup.', txt:
`He is grey all over, beard and hair and the telaba, with the brown of Seven Cities still in his face after however many years in this one, and a Malazan's way of sitting: back to the wall, door in view.

"Malazans," he says, before you have said anything, and moves his cup so there is room on the bench. "I can always tell. You count the door when you come in." He drinks. "Seven Cities lot, me. Out of it now. Time served, same as you, I'd guess." He looks you over. "You're the ones with the roof."

${b81Say({brisk:`He looks at Brisk, and at the old salute she gives him without thinking, two fingers to the brow. Something in his face eases. "Heavy infantry," he says. "Course you are."`, ohl:`He looks at Ohl, and Ohl at him, two old men who have both been in Seven Cities, and neither of them says a word about it, which says most of it.`, _:''})}`,
      ch:[{t:'"The Guild came over our roof. Has it been busy, this winter?"', go:'b8_c1_vet_guild'},
          {t:'"Any news from the Seven Cities lot?"', go:'b8_c1_bredd'},
          {t:'"They say there\'s an old soldier in the city who knows things."', req:()=>!!S.f.b8_c1_bredd, go:'b8_c1_historian'},
          {t:'The charm on his cord.', req:()=>!S.f.b8_c1_charm, go:'b8_c1_charm'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_vet_guild:()=>({sp:'An old soldier', scene:'b8_c1_tavern', fx:()=>{ S.f.b8_c1_vetGuild = 1; }, txt:
`"Busy," he says. "There's always somebody on a roof in this city. But busy, this winter, yes." He turns his cup round on the bench. "Knives where there aren't usually knives. Old Malazans being looked at in the street. I've been looked at." He drinks. "No one's come over my roof. Yet."

"Papers are being written, Sergeant. That's all a soldier can know. Who's paying, and why, is a go-between's business, and a go-between's business is to keep it." He looks at you over the cup. "There's a woman with a dice den down the lane hears most of what gets brokered in the Gadrobi. Orsa. If you wanted to ask." He shrugs. "I wouldn't. But I'm old."`,
      ch:[{t:'Back to the bench.', go:'b8_c1_vet'}]}),
    /* Neffarias Bredd: the biggest yet (Books Four, Six and Seven are the scale to beat) */
    b8_c1_bredd:()=>({sp:'An old soldier', scene:'b8_c1_tavern', fx:()=>{ S.f.b8_c1_bredd = 1; }, again:()=>'The old soldier, telling Bredd to the fire.', txt:
`"News," he says. "From the Seven Cities lot. There's always news." He leans in. "You heard about Neffarias Bredd?"

He does not wait. "Raraku. The Whirlwind, the whole wall of it, sand from the ground to the sky, a hundred leagues round, and a goddess in the middle. The Adjunct's army sat outside it for days, waiting. And one night Bredd gets up, takes a shovel, and walks into it." He drinks. "In the morning the Whirlwind was gone. Just gone. The Adjunct gets the credit. Bredd went back to his tent and slept till noon, because it had been a long night."

He sets the cup down. "My sergeant's cousin was in the next tent. Heard him snoring." He shakes his head. "Never met him myself. Nobody has. That's how good he is."${b81Say({kettle:`\n\n"A shovel," Kettle says. "Not a cusser."\n\n"He doesn't need a cusser," the old soldier says, with real contempt. "He's Neffarias Bredd."`, brisk:`\n\nBrisk considers this. "A shovel's a good tool," she says. It is the most she has said all evening.`, _:''})}${b81Say({ohl:`\n\nOhl, who was in Seven Cities for twenty years, says, "I knew a man who knew Bredd," and then, gently, "he lied too."`, tuft:`\n\nTuft says, "A goddess," quietly, and turns her cup round on the table, and does not laugh.`, _:''})}`,
      ch:[{t:'Drink to Neffarias Bredd.', go:'b8_c1_vet'},
          {t:'"A shovel\'s plenty."', go:'b8_c1_vet'}]}),
    /* callback 6: the old historian at K'rul's (rule 17: never his name, never how he lives) */
    b8_c1_historian:()=>({sp:'An old soldier', scene:'b8_c1_tavern', fx:()=>{ S.f.b8_c1_historian = 1; }, again:()=>'The old soldier, talking of the man at K\'rul\'s.', txt:
`"Knows things," he says, and laughs into his cup. "Not me. I know Bredd." He sobers a little. "There's an old man up at K'rul's, now, that knows things. Up at the old belfry, where some of the Genabackis lot drink. Walked the Chain of Dogs, they say, all of it, and wrote it down."

He looks at the fire. "I was at Aren, after. Saw what came in." He is quiet a moment. "If a man walked that and wrote it down, I'd not want to read it. But I'd want it written."${b81Say({ohl:`\n\nOhl puts his own cup down very carefully. "It should be written," he says. "Somebody should have, long since."`, _:''})}`,
      ch:[{t:'Back to the bench.', go:'b8_c1_vet'}]}),
    /* the Hood-touched charm: he will sell it, or give it for a story */
    b8_c1_charm:()=>({sp:'An old soldier', scene:'b8_c1_tavern', again:()=>'The old soldier, and the charm on its black cord.', txt:
`On a black cord round his neck, where a younger man would wear a torc, he has a knucklebone worn smooth as soap, with a hole through it nobody bored.

"Hood's," he says, when he sees you looking. "Or touched by him, anyway. Came off a man at Y'Ghatan who should have died and didn't, and he gave it to me in Aren for a drink, and I've not died since either." He weighs it in his palm. "It takes the one blow, they say. The bad one. And gives it to someone who's earned it more." He looks at the squad. "I'm done with bad blows. You're the ones with the roof."

"Eight silver. Or a story I've not heard. I'm partial to a story."`,
      ch:[{t:'Eight silver.', tag:'8 silver', req:()=>(S.silver || 0) >= 8, fx:()=>{ S.silver -= 8; updSilver(); S.f.b8_c1_charm = 'bought'; gain('b8_hoodcharm'); }, go:'b8_c1_charm_got'},
          {t:'Trade him a story: Pale, or Coral, or the night the Fourth stood on a roof for a rope boy.', check:['wits', 15], req:()=>!S.f.b8_c1_storyTried,
            edges:id=>[id === 'brisk' && ['she salutes Hood, and he saw her do it', 2], id === 'ohl' && ['twenty years of arguing with Hood is a story', 1], id === 'tuft' && ['she tells Pale the way the cadre would, which nobody else can', 1], id === 'sgt' && ['you have told it before, to worse company', 1], id === 'kettle' && ['she cannot tell a story without the munitions in it, and the munitions take over', -1], id === 'vell' && ['he talks too fast when it matters', -1]],
            near:{t:()=>`Yes, but he wants the whole of it, every name and every street, and by the end ${b81Nm(b81Who())} ${b81V(b81Who(), 'have', 'has')} said more about Pale than in years, and goes home with it still going round: rattled.`, fx:()=>b81Rattle(b81Who())},
            fx:()=>{ S.f.b8_c1_storyTried = 1; }, go:'b8_c1_charm_story', fail:'b8_c1_charm_nostory'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_charm_story:()=>({sp:'An old soldier', scene:'b8_c1_tavern', fx:()=>{ S.f.b8_c1_charm = 'story'; gain('b8_hoodcharm'); }, txt:
`He listens to all of it, with his cup forgotten, and when it is done he sits a while looking at the fire.

"That'll do," he says at last. He lifts the cord over his head and holds it out. "That's a story worth a bone." His hand is steady. "Mind it takes the bad one. It's not choosy about who it gives it to."`,
      ch:[{t:'Back to the bench.', go:'b8_c1_vet'}]}),
    b8_c1_charm_nostory:()=>({sp:'An old soldier', scene:'b8_c1_tavern', txt:
`He listens politely, and nods in the right places, and at the end he says, "Heard it," kindly, as one old soldier tells another the soup is cold.

"Eight silver still stands," he says. "No hurry. I'm not going anywhere, and Hood's in no hurry for me either."`,
      ch:[{t:'Back to the bench.', go:'b8_c1_vet'}]}),
    b8_c1_charm_got:()=>({sp:'An old soldier', scene:'b8_c1_tavern', txt:
`He lifts the cord over his head and holds the knucklebone out on it. It is warmer than it should be, from his neck, and then, oddly, it is not.

"There," he says. He looks lighter. "Mind it takes the bad one. It's not choosy about who it gives it to."`,
      ch:[{t:'Back to the bench.', go:'b8_c1_vet'}]}),

    /* Orsa's dice den: the brawl (optional), and on 'hunt' the go-between's name (the go-between check, contract:true) */
    b8_c1_den_door:()=>({sp:'Orsa\'s steps', scene:'b8_gadrobi', txt:
`A set of steps goes down under a cobbler's shop to a door with a slot in it and a lamp over it. Behind the door, the rattle of bones in a cup and a woman's voice telling somebody exactly what she thinks of him.`,
      ch:[{t:'Down the steps.', go:'b8_c1_den'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_den:()=>({sp:'Orsa', scene:'b8_c1_den', again:()=>'Orsa\'s den: the long table, the lamps, Orsa watching all of it.', txt:
`Orsa's den is a cellar with a long table down the middle and lamps hung low over it, so that the faces round it are lit from underneath and look worse than they are. The bones go round in a leather cup. The house takes a copper in ten.

Orsa sits at the head of the table on a high stool, a big Gadrobi woman with forearms like a tanner's and rings on every finger, watching all of it. She knows the Fourth. Everybody in the Gadrobi knows the Fourth.

"Sergeant," she says. "I heard about your roof." She does not lower her voice; in Orsa's den, nobody lowers their voice, because Orsa hears it anyway. "You'll be wanting to play, or wanting to ask. Asking costs more."${S.f.b8_c1_denDone ? '\n\nThe table is new. It does not quite match the benches.' : ''}${b81Hunt() && b81Ph() === 4 && !S.f.b8_c1_named ? `\n\nAt the far end of the table three Daru bravos are playing, and watching the door.` : ''}`,
      ch:[{t:'Play a round of bones.', req:()=>!S.f.b8_c1_denDone && !S.f.b8_c1_denTried, go:'b8_c1_den_play'},
          {t:'"Who brokers the Guild\'s papers in the Gadrobi, Orsa?"', req:()=>b81Hunt() && b81Ph() === 4 && !S.f.b8_c1_named, go:'b8_c1_orsa_ask'},
          {t:'"Just passing, Orsa."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_den_play:()=>({sp:'Orsa\'s den', scene:'b8_c1_den', fx:()=>{ S.f.b8_c1_denTried = 1; }, txt:
`${b81Say({kettle:`Kettle takes the cup. Kettle cheats at bones, and admits it if asked, and three Daru bravos at the far end of the table have just watched her throw four Hood's-eyes running and are about to ask.`, brannoc:`Brannoc takes the cup, and talks the whole time, and throws four Hood's-eyes running while three Daru bravos at the far end of the table stop talking.`, _:`${b81Nmc(b81Mates()[0] || 'sgt')} ${b81Mates()[0] ? 'takes' : 'take'} the cup, and throws four Hood's-eyes running, honestly, which nobody at the far end of the table believes.`})}

The biggest of the bravos stands up. He has a rapier, a good coat, and the look of a man who waited all winter for a reason. "Malazans," he says to the table. "I heard there was money on Malazans this winter." He smiles. "I heard it was on old ones."

Orsa looks at the ceiling, where her best lamps hang, and sighs.`,
      ch:[{t:'"Sit down, friend. It was only dice."', check:['guile', 14],
            edges:id=>[id === 'ohl' && ['an old healer\'s voice calms a room', 2], id === 'vell' && ['he knows how a Daru bravo likes to be spoken to', 1], id === 'sgt' && ['you have talked down worse in worse places', 1], id === 'ressa' && ['she has a voice for sickrooms', 1], id === 'kettle' && ['she has just cheated him, and he knows it', -2], id === 'brisk' && ['she does not talk men down; she stands in front of them', -1]],
            near:{t:()=>`Yes, but he sits down only after he has poured the last of ${b81Nm(b81Who())}'s wine over the table, slowly, to make the point, and the whole den watches ${b81Nm(b81Who())} let him: rattled.`, fx:()=>b81Rattle(b81Who())},
            go:'b8_c1_den_calm', fail:'b8_c1_den_row'},
          {t:'"It was dice. If you want something else, it\'s outside."', go:'b8_c1_den_row'},
          {t:'Pay Orsa for the trouble, and leave.', tag:'2 silver', req:()=>(S.silver || 0) >= 2, fx:()=>{ S.silver -= 2; updSilver(); }, go:'b8_c1_den_leave'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_den_calm:()=>({sp:'Orsa\'s den', scene:'b8_c1_den', txt:
`He looks at the Fourth a while, all of it, and works something out, and sits down.

"Old ones," he says again, to his friends, but quieter. They laugh, a little. No one gets up. Orsa takes her copper in ten without a word, which in Orsa is a kindness.`,
      ch:[{t:'Back to the table.', go:'b8_c1_den'}]}),
    b8_c1_den_leave:()=>({sp:'Orsa\'s den', scene:'b8_c1_den', txt:
`Orsa takes the silver without looking at it. "Wise," she says. "My lamps thank you." The bravos laugh as the Fourth goes up the steps, and let it go up them.`,
      ch:[{t:'Up into the lane.', go:()=>startExplore()}]}),
    b8_c1_den_row:()=>({sp:'Orsa\'s den', scene:'b8_c1_den', txt:
`His two friends stand up behind him. A man further down the table picks up his own drink and moves to a stool by the wall, with the air of a paying customer.

Orsa is already unhooking her lamps.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c1_den', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_den_after:()=>({sp:'Orsa\'s den', scene:'b8_c1_den', fx:()=>{ S.f.b8_c1_denDone = 1; }, txt:
`The bravos go up the steps, two of them carrying the third, and the den lets out its breath. Orsa hangs her lamps back up one by one and looks at the table, which is in three pieces.

"That's a table," she says. "You'll owe me a table." She considers. "Or you won't, because I'll put it on his." She nods up the steps, after the bravos. "Money on old Malazans. Huh." She looks at you. "There's been talk in my den that shouldn't have been. I'll remember the faces."${b81If('kettle', `\n\nKettle is gathering the dice off the floor. "Four Hood's-eyes," she says, to nobody, pleased. "Running."`)}`,
      ch:[{t:'Back to the den.', go:'b8_c1_den'}]}),
    /* on 'hunt': the go-between check (contract:true; its "yes, but" may cost one Contract point) */
    b8_c1_orsa_ask:()=>({sp:'Orsa', scene:'b8_c1_den', again:()=>'Orsa, on her stool, weighing what a name is worth.', txt:
`Orsa looks at you for a while, and then at the bravos at the end of the table, and then back at you.

"Asking costs more," she says again. "And asking that costs more than anything, because a go-between who finds out who sent the Malazans to his door will know it came out of my den." She turns a ring on her finger. "Ask me nicely. Ask me so that nobody at that end of the table hears a word. Then maybe."`,
      ch:[{t:'Ask her quietly, so that the far end of the table hears dice and nothing else.', check:['guile', 15], contract:true, req:()=>!S.f.b8_c1_orsaTried,
            edges:id=>[id === 'vell' && ['a Guild boy knows how a name is passed in a room', 2], id === 'ellis' && ['the Claw taught her to talk under a room', 2], id === 'tuft' && ['a Meanas mage can make a room look the other way', 1], id === 'sgt' && ['Orsa has known you for years', 1], id === 'kettle' && ['Kettle\'s quiet is louder than most people\'s talk', -1], id === 'brannoc' && ['a Falari cannot whisper', -2]],
            near:{t:'Yes, but someone on a roof saw it: when the Fourth comes up the steps, there is a shape on the cobbler\'s ridge, very still, and then there is not.', fx:()=>{ if (!S.f.b8_c1_roofSaw) { S.f.b8_c1_roofSaw = 1; b8Con(1, 'someone on a roof saw it'); } }},
            fx:()=>{ S.f.b8_c1_orsaTried = 1; }, go:'b8_c1_orsa_name', fail:'b8_c1_orsa_heard'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_orsa_name:()=>({sp:'Orsa', scene:'b8_c1_den', fx:()=>{ S.f.b8_c1_named = 1; S.f.b8_c1_quietName = 1; }, txt:
`She leans down from her stool to take her copper in ten off the table in front of you, and while she is there, under the rattle of the bones, she says a street, and a house on it, and a lamp on a gate.

"Below the Daru tier," she murmurs. "Last of the Gadrobi. He keeps bravos in his yard, and a door he doesn't open. Papers come to him, and go out from him, and he takes his tenth." She straightens and calls the throw. "Hood's-eye. House wins."

She does not look at you again. That is the price.`,
      ch:[{t:'Back up the steps.', go:()=>startExplore()}]}),
    b8_c1_orsa_heard:()=>({sp:'Orsa', scene:'b8_c1_den', fx:()=>{ S.f.b8_c1_named = 1; S.f.b8_c1_expected = 1; }, txt:
`She tells you, low: a street, a house below the Daru tier, a lamp on the gate. But at the far end of the table one of the bravos has stopped throwing, and a moment later he is gone up the steps, and his friends are counting coppers very carefully and not looking up.

Orsa watches him go. "Well," she says. "He'll know you're coming now." She sighs. "Don't come back here for a while, Sergeant. Not for asking."`,
      ch:[{t:'Back up the steps.', go:()=>startExplore()}]}),

    /* ======== phase 4, 'hunt': the go-between's house ======== */
    b8_c1_house_arrive:()=>({sp:'Below the Daru tier', scene:'b8_c1_house', txt:
`The last street of the Gadrobi before the Daru tier begins is quieter than the lanes and better lit. The house Orsa named stands back behind a wall, with a lamp on its gate and a small courtyard inside it, and in the courtyard a brazier, and round the brazier men in good coats, standing about as men stand who are paid to.

At the top of the courtyard, the house's door. It is shut. There is no light behind it.${S.f.b8_c1_expected ? `\n\nThe bravos are not round the brazier like men who are bored. They are round it like men who were told someone was coming.` : ''}`,
      ch:[{t:'Into the courtyard.', go:()=>startExplore()}]}),
    b8_c1_hunt_start:()=>({sp:'The go-between\'s courtyard', scene:'b8_c1_house', txt:
`Three bravos round a brazier, and one of them with a name, by the way the others leave him room. He has seen you at the gate. He does not stop warming his hands.

"The go-between is not receiving," he says. "He was not receiving yesterday either. He is very much not receiving tonight." He smiles. "Malazans. Old ones. I was told you might be along."${b81If('brisk', `\n\nBrisk has her shield up already, at the gate, filling it.`)}${b81If('vell', `\n\nVell, at your shoulder: "That's a gentleman's bravo, Sergeant. He gets paid whether he wins or not."`)}`,
      ch:[{t:'"Then we\'ll wait inside." Through the gate.', go:()=>startBattle('b8_c1_hunt', S.f.b8_c1_quietName && !S.f.b8_c1_expected ? {surprise:'p'} : {})},
          {t:'Over the side wall while he talks, and come at them out of the dark.', check:['wits', 15], req:()=>!S.f.b8_c1_wallTried,
            edges:id=>[id === 'ellis' && ['she counted sentries for the Claw for six years', 2], id === 'vell' && ['walls are just short roofs', 2], S.f.b8_c1_lineOk && id === 'sgt' && ['the Guild\'s lines: the wall has a hook in it', 2], id === 'kettle' && ['she reads a wall for its loose course', 1], id === 'brisk' && ['a wall is something a heavy stands in front of', -1], id === 'greysword' && ['plate and a wall disagree', -2]],
            near:{t:()=>`Yes, but the coping is glass, set in the mortar the Daru way, and ${b81Nm(b81Who())} ${b81V(b81Who(), 'come', 'comes')} down off it with a hand cut open. ${b81Nmc(b81Who())}'ll carry that into the fight.`, fx:()=>bruise(b81Who(), bruiseN())},
            fx:()=>{ S.f.b8_c1_wallTried = 1; }, go:()=>startBattle('b8_c1_hunt', nearMiss() ? {} : {surprise:'p'}), fail:'b8_c1_hunt_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_hunt_seen:()=>({sp:'The go-between\'s courtyard', scene:'b8_c1_house', txt:
`A bell on a string along the top of the wall, Daru-fashion, rings once. The bravo with a name laughs, and draws, at last.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b8_c1_hunt', {surprise:'e'})}]}),
    b8_c1_hunt_after:()=>({sp:'The go-between\'s courtyard', scene:'b8_c1_house', fx:()=>{ S.f.b8_c1_huntDone = 1; }, txt:
`The courtyard is quiet. The brazier has gone over and is burning a little on the flagstones by itself. The bravos who can walk have walked, over the wall and down toward the lanes, and the one with a name went with them, holding his arm, with his good coat ruined.

The stair inside the door is empty now. At the top of it, another door. Shut.${b81Say({ohl:`\n\nOhl is going from man to man with a lamp, the way he does, theirs as well as ours. "They'll live," he says, of most of them. "Expensive way to earn a wage."`, _:''})}`,
      ch:[{t:'Back to the courtyard.', go:()=>startExplore()}]}),
    /* the trail ends at a closed door: never who paid (rule 70) */
    b8_c1_closed:()=>{ const done = !!S.f.b8_c1_closed;
      if (!S.f.b8_c1_huntDone) return {sp:'The go-between\'s door', scene:'b8_c1_house', txt:
`The door at the top of the courtyard is shut, and there are men in good coats between it and you.`,
        ch:[{t:'Back to the courtyard.', go:()=>startExplore()}]};
      if (done) return {sp:'The go-between\'s door', scene:'b8_c1_house', again:()=>'The go-between\'s door, shut on nothing.', txt:
`The go-between's door, at the top of his stair. ${S.f.b8_c1_closed === 'broke' ? 'It hangs on one hinge now, on an empty room and a grate full of ash.' : 'It is still shut. The Fourth left it so.'}`,
        ch:[{t:'Home, west, to the Fourth\'s door.', onward:true, go:'b8_c1_home'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'The go-between\'s door', scene:'b8_c1_house', txt:
`At the top of the stair the go-between's door is shut, and barred inside, and there is no light under it and no sound behind it. Not a breath. Not a chair moved.

There is a smell, faint, through the crack at the sill: sealing wax, melted, and paper burning, and under it the cold of a grate that has been put out.${b81If('vell', `\n\nVell crouches at the sill and sniffs, and sits back on his heels. "He's gone," he says. "Out the back, over the roof, hours ago. They always keep a way over the roof." He looks up at the door. "And he burned the papers first. Every go-between does. That's what they're for."`)}`,
        ch:[{t:'Put a shoulder to it.', fx:()=>{ S.f.b8_c1_closed = 'broke'; b81L('brisk', 1); }, go:'b8_c1_closed_broke'},
            {t:'Leave it shut. A door like that is shut on purpose.', fx:()=>{ S.f.b8_c1_closed = 'left'; b81L('ohl', 1); }, go:'b8_c1_closed_left'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c1_closed_broke:()=>({sp:'The go-between\'s room', scene:'b8_c1_house', txt:
`${b81Say({brisk:'Brisk', greysword:'Dannet', brannoc:'Brannoc', _:'You'})} ${b81Say({brisk:'puts', greysword:'puts', brannoc:'puts', _:'put'})} a shoulder to it, twice, and the bar inside gives with a crack like a bone.

The room behind it is small and bare and very tidy: a desk with nothing on it, a chair pushed in, a shelf of pigeonholes with nothing in any of them, and a window open on the back roofs, the shutter knocking a little in the draught. In the grate there is ash, a great deal of it, still warm at the bottom, and a stick of red sealing wax melted to a puddle with no device on it at all.

Nothing else. No name. No ledger. Whoever paid for five strokes on a paper paid a man to forget it, and he has.`,
      ch:[{t:'Home, west, to the Fourth\'s door.', onward:true, go:'b8_c1_home'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_closed_left:()=>({sp:'The go-between\'s door', scene:'b8_c1_house', txt:
`You leave it shut. Behind it there is ash and an open window and nothing else; you would bet the rent on it. A go-between who keeps bravos in his yard keeps a way over the roof too, and he will have taken it while his bravos were earning their wage.

Whoever paid for five strokes on a paper paid a man to forget it. The door is the answer. It is the only one there is going to be.`,
      ch:[{t:'Home, west, to the Fourth\'s door.', onward:true, go:'b8_c1_home'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_house_back:()=>({sp:'The street', scene:'b8_c1_house', txt:
`West, the street goes back down into the Gadrobi lanes.`,
      ch:[{t:S.f.b8_c1_closed ? 'Home, to the Fourth\'s door.' : 'Back down to the lanes.', onward:true, go:()=>S.f.b8_c1_closed ? talk('b8_c1_home') : startExplore('b8_c1_gadrobi')},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_home:()=>({sp:'The Fourth\'s street', scene:'b8_daru_night', fx:()=>{ S.f.b8_c1_ph = 5; }, txt:
`It is late by the time the Fourth comes back down through the lanes to its own street. The fog is up. The lamplighter's boy has gone home. The lamp over the Fourth's door has gone out, or been put out.

There is somebody sitting on the Fourth's step, in the dark, with his hands open on his knees where the gas-light at the corner can find them.`,
      ch:[{t:'The step.', go:()=>{ startExplore('b8_c1_street'); talk('b8_c1_vasso'); }}]}),

    /* Vasso (the recruit, on 'hunt'): a Guild journeyman who read the paper twice */
    b8_c1_vasso:()=>{ const d = S.f.b8_vassoDone;
      if (d === 2) return {sp:'Vasso', scene:'b8_daru_night', txt:
`Vasso is still on the step, or on it again. He sits with his back to the door and his face away from the windows across the street, counting the bells under his breath. He has plainly decided to wait as long as it takes.`,
        ch:[{t:'"Come in, Vasso. There\'s a chair."', fx:()=>{ b8Join('vasso'); b81L('tuft', 1); }, go:'b8_c1_vasso_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'A young man on the step', scene:'b8_daru_night', again:()=>'The young man on the step, with his hands open on his knees, waiting.', txt:
`He is young, twenty-odd, Gadrobi by his face, in a dark quilted jack with the Guild's cut to it and soft boots. There is a knife's hilt over his shoulder and another at his hip, and he has put both his hands where you can see them, open, on his knees, and kept them there. He has been sitting like that for some time. His fingers are blue with it.

"Malazans," he says. "The paper said Malazans. The Guild doesn't ask which." He looks up. "I asked. That is why I am sitting on your step."

"Vasso. Journeyman. Six years on the roofs." He does not get up. "They handed me your paper after the alley. Second on it, after the man you left on your eave. I read it twice. Then I heard the Fourth had gone up the hill asking names, and that the go-between had burned his papers and gone out the window." He breathes out. "You don't ask names of the Guild. You don't walk up to a go-between's door. You did both."`,
        ch:[{t:'"Who paid?"', go:'b8_c1_vasso_who'},
            {t:'"And now you\'re sitting on our step. Why?"', go:'b8_c1_vasso_why'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c1_vasso_who:()=>({sp:'Vasso', scene:'b8_daru_night', txt:
`He almost laughs. "No one on the roofs knows who paid. Not the knife, not his clan, not his master. That is the whole of the Guild, Sergeant. The paper comes down. You don't ask where from." He shrugs. "The go-between knew. He was the only one. And now he is a grate full of ash and a window."

"Malazans, the paper said. Five strokes and your door." He looks at the street. "There may be other papers. I've heard there are. Old soldiers in this city, this winter, being looked at." He shakes his head. "I don't know whose. I would tell you if I did. That's new, for me."${b81If('vell', `\n\nVell is watching him from the doorway. Vasso looks back. "You're the rope boy," he says. "The one the clans keep a knot for." He nods, once, as one journeyman to another. "I know the knot. It's an old count. No one's paid on it."`)}`,
      ch:[{t:'"And now you\'re on our step. Why?"', go:'b8_c1_vasso_why'}]}),
    b8_c1_vasso_why:()=>({sp:'Vasso', scene:'b8_daru_night', fx:()=>{ if (b8In('vell')) S.f.b8_c1_vellRead = 1; }, txt:
`He thinks about that for a while, honestly, with his hands still open on his knees.

"Because I'm not going to do it," he says. "And a journeyman who won't do a paper is a journeyman with a paper of his own, soon. No journeyman gets out of the Guild." He looks at the door behind him, the Fourth's door, with its bar and its lamp out. "I thought I'd like to be the first. And I thought the best place to try it was the one house in the Gadrobi the Guild has already failed at once."

"I know the roofs. I know the lines and the knots, and which clans are on which streets, and the bells. I'm good with a knife." He pauses. "I've never put it in anybody. I'd like it noted that I'm not optimistic."${b81Say({kettle:`\n\nKettle, behind you, says, "I like him," as if that settled it, and in Kettle's experience it usually does.`, ohl:`\n\nOhl, behind you, says, "His hands are blue, Sergeant. Whatever you decide, decide it inside."`, _:''})}`,
      ch:[{t:'"Then come in, Vasso. There\'s a chair."', fx:()=>{ b8Join('vasso'); b81L('tuft', 1); }, go:'b8_c1_vasso_join'},
          {t:'"Wait at the door a while. We\'ll see how it goes."', fx:()=>{ S.f.b8_vassoDone = 2; }, go:'b8_c1_vasso_wait'},
          {t:'"Go home, Vasso. This door is the last place you want to be."', fx:()=>{ S.f.b8_vassoDone = 0; b81L('kettle', -1); }, go:'b8_c1_vasso_home'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_vasso_join:()=>({sp:'Vasso', scene:'b8_door', txt:
`${b8In('vasso') ? `He gets up, stiff with the cold, and comes in under the bar, and stands in the narrow room looking at the table, the five chairs and the one against the wall.

"There's always one more," he says. "Everybody in the Gadrobi knows. The Fourth keeps a chair." He sits in it. It seems to be the right size. "Thank you, Sergeant." Across the city, low, an old bell nobody rings is humming the hour. He counts it without seeming to.` : `He nods, and stays on the step. The Fourth's chairs are full, and a journeyman can count. "When there's room," he says. "I'll be at the door."`}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c1_vasso_wait:()=>({sp:'Vasso', scene:'b8_daru_night', txt:
`He nods slowly, as if that were more than he expected, and moves along the step so that he is out of the way of the door and out of the line of the windows across the street.

"I'll be here," he says. "It's a good step. No one's ever been killed on it."`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c1_vasso_home:()=>({sp:'Vasso', scene:'b8_daru_night', txt:
`He looks at you for a while, and then up at the roofs, and then he gets up, stiffly, and puts his hands in his jack.

"Home," he says, like a word in a language he had nearly learned. "Yes, Sergeant." He goes off up the street, keeping to the middle of it, away from the walls, as a journeyman walks when he knows the roofs are watching. At the corner he looks back once. Then the fog has him.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* ======== phase 4, 'quiet': the bar across the door; chancers in the street ======== */
    b8_c1_quiet:()=>({sp:'The Fourth\'s door', scene:'b8_door', html:contractHTML(), txt:
`So the Fourth lies low. The bar goes across at dusk, and the lamp over the door goes out early, and nobody goes up the hill asking names. The paper goes in the fire, in the end, five strokes up; it burns like any paper.

The days go by, and nobody comes over the roof. The lanes talk about something else. The city, being busy, starts to forget there was anything to talk about.

Not all of it forgets. One night, near the end of the winter, there are men in the street outside the Fourth's door who are not neighbours, and who have been there an hour, by the barrels, talking loudly about nothing.${b81Say({brisk:`\n\nBrisk looks at them through the shutter. "Not Guild," she says. "Guild don't talk."`, ellis:`\n\nEllis looks at them through the shutter. "Not Guild," she says. "Chancers. They've been told there's money on the door."`, _:`\n\nNot Guild. The Guild does not talk. Chancers, then: somebody has told them there is money on the door.`})}`,
      ch:[{t:'Out to them.', go:'b8_c1_chancers_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_chancers_start:()=>({sp:'The Fourth\'s street', scene:'b8_daru_night', txt:
`Three of them, by the barrels, in good coats on credit and rapiers they have not paid for yet. They stop talking when the Fourth's door opens.

"Evening," says the one in front. "We heard there was a price on this door. We heard it was on old ones." He looks you over, and sees what he wants to see. "Thought we'd come and collect, before the Guild did."`,
      ch:[{t:'"Collect, then."', go:()=>startBattle('b8_c1_chancers', {})},
          {t:'"Go home. There\'s no price. There\'s only us."', check:['might', 15],
            edges:id=>[id === 'brisk' && ['she fills a doorway, and they can see her do it', 3], id === 'greysword' && ['the Grey Swords stood the walls of Capustan', 2], id === 'brannoc' && ['he is very large and very cheerful about it', 1], id === 'sgt' && ['you have faced down bravos before', 1], id === 'tuft' && ['she looks nineteen still', -1], id === 'ohl' && ['he looks his age, and they are counting on it', -1]],
            near:{t:()=>`Yes, but the one in front goes only after he has spat on the Fourth's step, and ${b81Nm(b81Who())} ${b81V(b81Who(), 'stand', 'stands')} there and ${b81V(b81Who(), 'let', 'lets')} him, and it costs: ${b81Nm(b81Who())} will be stiff with it in the next fight.`, fx:()=>bruise(b81Who(), bruiseN())},
            go:'b8_c1_chancers_gone', fail:'b8_c1_chancers_row'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c1_chancers_row:()=>({sp:'The Fourth\'s street', scene:'b8_daru_night', txt:
`He laughs, and his friends laugh with him, a little late, and the rapiers come out.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c1_chancers', {})}]}),
    b8_c1_chancers_gone:()=>({sp:'The Fourth\'s street', scene:'b8_daru_night', fx:()=>{ S.f.b8_c1_chancersDone = 1; S.f.b8_c1_chancersSent = 1; S.f.b8_c1_ph = 5; }, txt:
`They look at the Fourth in the doorway, and then at each other, and work it out the slow way. The one in front says something about another night. They go off down the street toward the Phoenix with the walk of men who have just remembered an appointment.

No one comes after them. No one comes after them for the rest of the winter.`,
      ch:[{t:'Back inside.', go:'b8_c1_fire'}]}),
    b8_c1_chancers_after:()=>({sp:'The Fourth\'s street', scene:'b8_daru_night', fx:()=>{ S.f.b8_c1_chancersDone = 1; S.f.b8_c1_ph = 5; }, txt:
`They go off down the street toward the Phoenix, all three, the last of them on one leg and his friends' shoulders. The rapiers stay behind on the cobbles. The Fourth leaves them there; somebody in the Gadrobi will be glad of them by morning.

${b81Say({brisk:`Brisk looks after them. "Chancers," she says. "Next time it'll be the Guild again. The Guild won't talk."`, kettle:`Kettle looks after them. "Didn't even need a sharper," she says. She sounds almost sorry.`, _:`Chancers. The next time, if there is one, it will be the Guild again, and the Guild will not talk.`})}

There is no next time, this winter.`,
      ch:[{t:'Back inside.', go:'b8_c1_fire'}]}),

    /* the key: the paper on the table, and what the Fourth does about it */
    b8_c1_key:()=>({sp:'The paper', scene:'b8_door', html:contractHTML(), txt:
`The paper is on the table under its cup, five strokes up, where it has been for days.

There are two things an old soldier can do about a paper. ${S.f.b8_c1_vetGuild ? 'Orsa hears most of what is brokered in the Gadrobi, the old soldier said. ' : ''}You could go after whoever is paying: up the hill, through Orsa's den, to whichever go-between carried it, and knock. The city would notice. The Guild would notice more. Or you could lie low: the bar across the door at dusk, the lamp out, nobody asking anything, and let a city that has a great deal else to think about forget there was ever a paper.${b81Say({brisk:`\n\n"They came to our door," Brisk says. That is her vote.`, _:''})}${b81Say({ohl:`\n\n"I've been on a list before," Ohl says. "The way off it is to be dull." That is his.`, _:''})}${b81Say({kettle:`\n\nKettle keeps her mouth shut, which is unlike her, and turns a sharper over in her fingers, which is not.`, tuft:`\n\nTuft has the Deck out, and puts it away again without drawing. "It doesn't matter what it says," she says. "You'll choose anyway."`, _:''})}`,
      ch:[{t:'"We go and find out who\'s paying." Hunt.', fx:()=>{ S.f.b8_c1_key = 'hunt'; S.f.b8_c1_ph = 4; b8Con(2, 'names asked'); b81L('brisk', 1); b81L('ohl', -1); }, go:'b8_c1_hunt_go'},
          {t:'"We lie low. Let them forget." Quiet.', fx:()=>{ S.f.b8_c1_key = 'quiet'; S.f.b8_c1_ph = 4; b8Con(-1, 'kept quiet'); b81L('ohl', 1); b81L('brisk', -1); }, go:'b8_c1_quiet'},
          {t:'Not yet.', go:'b8_c1_fire'}]}),
    b8_c1_hunt_go:()=>({sp:'The Fourth\'s door', scene:'b8_door', html:contractHTML(), txt:
`So the Fourth goes asking.

It is not quiet about it, because a squad of old Malazans asking names in the Gadrobi cannot be quiet about anything. By the second evening the lanes know. By the third, so does every roof.

${b81Say({brisk:`Brisk takes the shield down off its peg, and puts it on her arm, and does not take it off again.`, _:`The squad takes its kit down off the pegs, and puts it on, and does not take it off again.`})} The way to a go-between is through somebody who knows which go-between, and in the Gadrobi that is Orsa.`,
      ch:[{t:'To the lanes, and Orsa.', go:()=>startExplore()}]}),

    /* ======== the end: winter's end, and the road east ======== */
    b8_c1_onward:()=>({sp:'The Fourth\'s door', scene:'b8_daru_night', txt:
`Winter goes out of the city the way it came in, by the lake, in fog. The Fete is near now, and the lanes are full of masks being painted in doorways and lanterns being strung, and the whole of Darujhistan is getting ready to be in the streets for days on end, which is very good for knives.

${b81Hunt() ? `The Contract is not cooling. The roofs are watched; the Fourth is talked about up the hill. It wants time, and distance, and a while out of the city.` : `The paper is ash, and the lanes have stopped talking, and the roof is quiet. But a quiet roof is not the same as a forgotten one, and the Fete is coming, and the whole city will be out on it.`} At Benlo's barrow there is word of a merchant's man hiring guards for wagons going east at winter's end, over the old Domin, a long way, for weeks, for old soldiers who know which end of a road is which.${b8In('vasso') ? `\n\nVasso, at the table, says he has never been outside the walls. He says it like a confession. "Then that's the first thing," Kettle tells him.` : ''}${b81Say({brisk:`\n\nBrisk takes the shield down off its peg. "East," she says. "I've been east." It is not a complaint.`, _:''})}`,
      ch:[{t:'East, at winter\'s end.', onward:true, go:()=>chapterEnd(1, b81Key() || B8KEY0[1])},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
