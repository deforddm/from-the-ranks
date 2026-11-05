/* ============ Book Six, Chapter 5: The Kokakal Shore (the Third) ============ */
/* The Sotka road and the Kokakal shore (The Bonehunters ch 13, 16, 18; bh-canon §2). The Fourteenth marched from Y'Ghatan the next night
   because of the plague (W7), down the Sotka road to the coast, and waits on the Kokakal shore for Admiral Nok's transports (W13). Phase 1,
   the road's last miles above the sea: the first halt and the reading (on the bluff, the transports' lanterns below), the captain's orders,
   a cairn where people who cursed Coltaine now leave crow feathers for him (W13), the old soldier's camp talk (the 791; the Host before
   G'danisban in the rain, as rumour), an optional plague village off the road (its well: the chapter's one fever "yes, but"; plague-road
   looters in its doors: b6_c5_village, feverRisk), and deserters of the Fourteenth at a ruined way-station (b6_c5_deserters, main, with a
   stage2; then march the last of them back, or let them walk into the desert: b6_c5_desMercy). Phase 2, the shore: the loading, the
   Fourteenth's surgeons (a cure), Temul's Wickans at their horse lines, ashamed (W16; the trick), Nok's loading master (the rope; the black
   ship given to a marine sergeant, as sailors' talk), looters at the boats at night (b6_c5_boats, main, stage2), and the word along the
   beach that Fist Keneb has pulled his soldiers off the ships for a day on a boy's warning about Sepik (W16). The key (S.f.b6_c5_key):
   'wait' (the Third stays ashore a day with the company's last boat, as Keneb's do) or 'sail' (aboard with the company on the first day, as
   ordered; Ch7 reads it as a line about the ambush). Phase 3: the marines the army counted dead under Y'Ghatan walk in out of the desert (W16),
   seen from the beach or from the rail; on a Ch3 'in', one of the squad's own dead from the fire is not among them, said once. A heavy who
   came out through the fire offers the squad the finger bone (S.f.b6_bone = 1 if taken). Never the Silanda (sailors' talk only), the
   Adjunct's sigil for Sort and Sinn, a word with Keneb, Blistig, Temul, Grub, Fiddler, Quick Ben, Kalam, Sinn or Faradan Sort, or the name
   the bones will give the army. Notes for later chapters: docs/bh-ch5-notes.md. */
/* FOR THE ARTIST (105b): names this file uses.
   Items: ART['item/b6_c5_fingerbone'], ['item/b6_c5_nokrope'].
   Backdrop the artist replaces: b6_kokakal (100's, borrowed). This file adds three scenes that borrow Book Two's Odhan drawings
   (b6_c5_road from b2_odhan_day, b6_c5_dusk from b2_odhan_dusk, b6_c5_village from b2_well); the artist may redraw them.
   Figures reused: b4_c1_hollet (the captain), b2soldier, wickan, deserter, xbow, thug, cutpurse, bruiser, b4_c7_fleer, b4_c7_fleerbow.
   Ground: the road and the village are Book Two's 'odhan'; the shore is Book Five's 'b5_c2_strand' (~ sea, B boats, F fire, # dune grass). */

/* ---- small helpers (b65: Book Six, Chapter Five) ---- */
const b65L = (id, n) => { if (b6In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b65Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b6In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b65If = (id, s) => b6In(id) ? (typeof s === 'function' ? s() : s) : '';
const b65Who = () => (ROLL() && ROLL().who) || 'sgt';
const b65Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b65Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b65Ph = () => (S.f && S.f.b6_c5_ph) || 1;
const b65Key = () => (S.f && S.f.b6_c5_key) || null;
/* the earlier keys, each read with a default (a --from=5 save may hold either; unset reads as the quieter road) */
const b65In3 = () => S.f.b6_c3_key === 'in';                  // Ch3: into the burning streets to keep Sinn's path open (mortal)
const b65Bury = () => S.f.b6_c1_key === 'bury';               // Ch1: the old dead put back in the barrows
/* the squad's own dead from the fire (Ch3's mortal fight), by the chapter the engine wrote on them */
const b65Fallen3 = () => Object.entries((S && S.dead) || {}).filter(([id, d]) => d && d.ch === 3 && id !== 'sgt' && TPL[id]).map(([id]) => id);
/* the squad's sapper for the munitions: Tangle, else Rasp */
const b65Sap = () => b6In('tangle') ? 'tangle' : b6In('rasp') ? 'rasp' : null;
const b65SapN = () => b65Sap() ? NAME(b65Sap()) : 'The sapper';
/* the recruit and Book Four's who may walk with the Third, for the odd line */
const b65Rec = () => ['mehet', 'orvas', 'redblade', 'warlock'].find(id => b6In(id)) || null;
const b65R = m => { const r = b65Rec(), v = r && m[r]; return v ? (typeof v === 'function' ? v() : v) : ''; };
/* the road's gates: the deserters fetched; the shore's: the captain's orders, the boats, the key, the walk-in */
const b65RoadDone = () => !!S.f.b6_c5_desDone;
const b65Next = () => { const f = S.f; if (b65Ph() < 2) return b65RoadDone() ? 'b6_c5_road_on' : 'b6_c5_waystation';
  if (!f.b6_c5_capShore) return 'b6_c5_captain_shore'; if (!f.b6_c5_boatsDone) return 'b6_c5_boats'; if (!b65Key()) return 'b6_c5_word';
  if (!f.b6_c5_survivors) return 'b6_c5_morning'; return 'b6_c5_last'; };
/* back up the lane onto the road, at the lane's end */
const b65Back = () => { S.area = 'b6_c5_road'; S.pos = {x:7, y:10}; S.trail = [[-1,0],[1,0],[-1,-1],[0,-1],[1,-1],[0,1]].map(([dx, dy]) => ({x:7 + dx, y:10 + dy})); startExplore(); };
/* where a "Not now" goes in phase 3: aboard (sail), or the shore */
const b65Away = () => b65Key() === 'sail' && b65Ph() >= 3 ? talk('b6_c5_aboard') : startExplore();
/* cure every fevered soldier, from a scene */
const b65CureAll = how => b6FeverList().forEach(id => b6Cure(id, how));

/* ---- Wickan Horse-Talk: the Claw Hand-Cant (Book One's cant), in the Wickans' words. Clicks of the tongue and a hand held flat or
   cupped against the thigh, the way riders pass a word down a line at the gallop without a shout. Not sorcery. The battle half sets the
   same marks the hand-cant does (cantRound, cantLeft), so 31_battle's critical on the next hits does the rest. ---- */
Object.assign(TRICKS, {
  b6_c5_horsetalk:{name:'Wickan Horse-Talk', ch:5, use:'fight', ab:'t_b6_c5_horsetalk', where:'the Wickan horse lines on the Kokakal shore',
    lore:'Wickan riders talk across a field at the gallop without a word: a click of the tongue, a hand flat on the thigh or cupped, two fingers flicked toward the rider who is meant. Learned on horseback before a child can walk. A rider who knows it can put a whole line onto one enemy in a breath, and the enemy never hears the order.',
    get fx(){ const n = 1 + lvT(); return `Once a fight, and it does not use the bearer's action: click and sign an enemy within 6. The next ${n > 1 ? ['', '', 'two', 'three', 'four', 'five'][n] + ' hits' : 'hit'} on it this round ${n > 1 ? 'are criticals' : 'is a critical'}. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b6_c5_horsetalk:{name:TRICKS.b6_c5_horsetalk.name, trick:'b6_c5_horsetalk', free:true, desc:()=>TRICKS.b6_c5_horsetalk.fx,
    tiles:u=>foes().filter(f => cheb(u, f) <= 6 && f.cantRound !== B.round && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; t.cantRound = B.round; t.cantLeft = 1 + lvT(); AUDIO.play('click'); float(t, 'that one', '#e8c86a');
      blog(`${u.name} clicks twice, low, and a flat hand goes to the thigh and two fingers flick toward ${t.name}. The Wickan way: <em>that one, all of you, now.</em>${u.id === 'warlock' ? ' The grandmother clicks with him, out of the same mouth, and is louder.' : ''}`); }},
});

/* ---- the words this chapter adds to Book Six's glossary ---- */
GLOSSX.bh.push(
  [5, 'Admiral Nok\'s fleet', 'The Empire\'s transports, come to the Kokakal shore to carry the Fourteenth off Seven Cities. Where to, the army is not told.', ()=>(S.chapter || 0) >= 5],
  [5, 'The finger bone', 'A finger bone on a thong, worn by soldiers who walked out of Y\'Ghatan, and then by others. Ask one why, and the answer is different every time.', ()=>!!(S.f && S.f.b6_bone)]);

/* ---- the reading: the road's last night, on the bluff above the Kokakal shore, with the transports' lanterns below ---- */
B6DECK[5] = {scene:'b6_kokakal', where:'a flat of packed sand at the bluff\'s edge, with the transports\' lanterns below',
  set:'The Sotka road\'s last night, on the bluff above the Kokakal shore, and Admiral Nok\'s transports riding at anchor below with their lanterns lit.',
  back:'b6_c5_deck_back', backT:'Back to the halt.',
  say:{marrow:`"The sea," Marrow says, and looks at it a while before she looks at the cards. "Child, I have not seen the sea since Aren." She shuffles slowly. "One card. For the crossing."`,
    tallow:`"My grandmother said never read over water," Tallow says. "The sea reads back." He looks down at the lanterns. "We're not over it yet. Quick, Sergeant."`,
    oldninth:`The old soldier sits down at the bluff's edge with his legs over it. "Last reading in Seven Cities," he says. "For me, anyway. I came out on a ship like those and I'll go home on one." He shuffles one-handed. "Rum first."`}};

/* the fire is a roster fire (38c): the Third's, on the shore */
ROSTER_FIRES.bh = ROSTER_FIRES.bh || {};
ROSTER_FIRES.bh[5] = ['b6_c5_fire'];

/* the borrowed backdrops this chapter adds (Book Two's Odhan, until the artist redraws them) */
[['b6_c5_road', 'b2_odhan_day'], ['b6_c5_dusk', 'b2_odhan_dusk'], ['b6_c5_village', 'b2_well']].forEach(([k, like]) => {
  SCENEX[k] ??= (cv, t) => (SCENEX[like] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); });

const B6CH5 = {
  title:'The Kokakal Shore', number:'Five',
  intro:{loc:'The Sotka road', sub:'From Y\'Ghatan to the sea · the Fourteenth on the march', scene:'b6_c5_road', cap:'A road across scrub and stone toward the coast, and a long column on it, going away from a city that is still smoking.',
    paras:[
`The army marched from Y'Ghatan the night after the fire, because the plague was in the villages behind it and the Adjunct would not wait for it to catch up. There was no argument. Not one soldier in the Fourteenth wanted to stay near that city one more night.`,
()=>`You are Sergeant {sgt}, Third squad, 9th Legion. ${b65In3() ? 'The Third went into the burning streets to hold the way open, and came out by it.' : 'The Third held the gate and pulled the burned out of the smoke, as many as it could reach.'} ${b65Fallen3().length ? `${b65Fallen3().map(id => NAME(id)).join(' and ')} stayed in the fire.` : 'Everybody in the squad came out.'} The 9th was the reserve. The reserve is the part of an army that watches.`,
()=>{ const v = (S.squad || []).filter(id => id !== 'sgt' && b6In(id)).map(id => NAME(id));
  return `${v.length ? `${v.length > 1 ? v.slice(0, -1).join(', ') + ' and ' + v[v.length - 1] + ' walk' : v[0] + ' walks'} with you down the Sotka road.` : 'The squad, on the Sotka road, is you.'} Ahead is the sea, and on it, they say, ships.`; }],
    go:'Down the road', node:'b6_c5_start'},

  areas:[
    /* 16 x 12 (odhan, day). The Sotka road's last miles, on the bluffs above the coast: . the road  , scrub  # rock  r stones  x a dead
       tree  = tents  W the 9th's carts  F the halt's fire on the bluff  c a cairn with crow feathers  L the bluff's edge, the sea below
       < back up the road, west (the way-station)  > down to the shore, east  v a lane south to a village */
    { id:'b6_c5_road', title:'The Sotka road · the last miles', sub:'On the bluffs above the Kokakal shore', hint:'Tap ground to move · tap a figure to talk · the road goes down to the shore, east', decor:'odhan',
      map:[ "####,,,,,,,,,###",
            "#,,,,,=,,=,,,,,#",
            ",,r,,,,,,,,,,c,#",
            ",,,,,W,,,,,,,,,L",
            "................",
            "<..............>",
            ",,,,,,,F,,,,,,,,",
            ",,x,,,,,,,,=,,,,",
            ",,,,,,,,,,,,,,r,",
            "#,,,,,,,,,,,,,,#",
            "##,,,,,,,,,,,,##",
            "######,v,#######" ],
      walk:'.,', triggers:{F:'b6_c5_start', W:'b6_c5_carts', c:'b6_c5_shrine', L:'b6_c5_lookout', '<':'b6_c5_waystation', '>':'b6_c5_road_on', v:'b6_c5_villagelane'}, start:{x:8, y:4},
      quest:()=> !S.f.b6_c5_capSaid ? 'The captain, by the tents.' : !b65RoadDone() ? 'Back up the road, west, to the way-station.' : 'Down to the shore, east.',
      npcs:[
        {id:'captain', name:'The captain', kind:'b4_c1_hollet', x:9, y:2, node:()=>S.f.b6_c5_capSaid ? 'b6_c5_captain_again' : 'b6_c5_captain', fresh:()=>!S.f.b6_c5_capSaid},
        {id:'oldsoldier', name:'The old soldier of the 9th', kind:'b2soldier', x:3, y:7, node:()=>'b6_c5_rumour', fresh:()=>!S.f.b6_c5_rumour},
        {id:'burial', name:'A burial detail', kind:'b2soldier', x:11, y:8, node:()=>'b6_c5_burial', fresh:()=>!S.f.b6_c5_burial} ] },

    /* 16 x 12 (odhan, day; optional). A village off the road the plague went through: # walls  H the doors of the houses  w the well
       . the lane  , dust  e back up the lane to the road */
    { id:'b6_c5_village', title:'A village off the road', sub:'The plague has been here', hint:'Tap ground to move · the houses are at the top of the lane · the lane goes back to the road', decor:'odhan',
      map:[ "################",
            "#,,,#,,,,,#,,,,#",
            "#,H,#,,,,,#,,H,#",
            "#,,,##,..,##,,,#",
            "#,,,,,,..,,,,,,#",
            "#,,,,,,w.,,,,,,#",
            "#,,,,,,..,,,,,,#",
            "##,,,,,..,,,,,##",
            ",#,,,,,..,,,,,#,",
            ",,#,,,,..,,,,#,,",
            ",,,,,,,..,,,,,,,",
            ",,,,,,,ee,,,,,,," ],
      walk:'.,', triggers:{H:'b6_c5_houses', w:'b6_c5_well', e:'b6_c5_village_back'}, start:{x:7, y:10},
      quest:()=> !S.f.b6_c5_villageDone ? 'Somebody is going through the houses.' : 'Back down the lane to the road.',
      npcs:[] },

    /* 16 x 12 (b5_c2_strand, dusk). The Kokakal shore: ~ the sea  B the boats at the waterline  . the wet sand  , dry sand  # dune grass
       F the Third's fire  S the surgeons' tents */
    { id:'b6_c5_shore', title:'The Kokakal shore · the 9th\'s lines', sub:'Nok\'s transports at anchor', hint:'Tap ground to move · tap a figure to talk · the boats are at the waterline', decor:'b5_c2_strand',
      map:[ "~~~~~~~~~~~~~~~~",
            "~~~~~~~~~~~~~~~~",
            "~~~BB~~~~~BB~~~~",
            "................",
            ",,,,,,,,,,,,,,,,",
            ",,F,,,,,,,,,,S,,",
            ",,,,,,,,,,,,,,,,",
            "#,,,,,,,,,,,,,,#",
            "##,,,,,,,,,,,,##",
            "###,,,,,,,,,,###",
            "####,,,,,,,,####",
            "################" ],
      walk:'.,', triggers:{F:'b6_c5_fire', B:'b6_c5_boatline', S:'b6_c5_surgeons'}, start:{x:7, y:9},
      quest:()=> !S.f.b6_c5_capShore ? 'The captain, on the beach.' : !S.f.b6_c5_boatsDone ? 'The boats, tonight.' : !b65Key() ? 'The fire. There is talk along the beach.' : !S.f.b6_c5_survivors ? 'Morning.' : 'The boats, and the transport.',
      npcs:[
        {id:'captain', name:'The captain', kind:'b4_c1_hollet', x:6, y:6, node:()=>S.f.b6_c5_capShore ? (S.f.b6_c5_boatsDone && !b65Key() ? 'b6_c5_key' : 'b6_c5_captain_shore_again') : 'b6_c5_captain_shore', fresh:()=>!S.f.b6_c5_capShore || (!!S.f.b6_c5_boatsDone && !b65Key())},
        {id:'wickans', name:'Wickan riders at their horse lines', kind:'wickan', x:11, y:7, node:()=>S.f.b6_c5_wickans ? 'b6_c5_wickans_again' : 'b6_c5_wickans', fresh:()=>!S.f.b6_c5_wickans},
        {id:'nokmate', name:'The loading master', kind:'b2soldier', x:8, y:4, node:()=>'b6_c5_nokmate', fresh:()=>!S.f.b6_c5_nokmate},
        {id:'heavy', name:'A heavy of the 10th', kind:'b2soldier', x:10, y:5, node:()=>'b6_c5_bone', show:()=>!!S.f.b6_c5_survivors && b65Key() !== 'sail', fresh:()=>!!S.f.b6_c5_survivors && !S.f.b6_c5_boneSaid} ] } ],

  battles:{
    /* the plague village (optional): looters going through the shut houses. It spreads the fever. */
    b6_c5_village:{title:'The plague village', style:'odhan', feverRisk:'the plague village', warrenText:'A village the plague went through · the warren is sick here, like dirty water', warren:{meanas:.85, denul:.85}, music:'battle',
      map:["#..#...#","........","..t.....","........",".t....t.","........","...r....","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b6_bandit',1,1],['b6_bandit',5,1],['b6_bandit',3,3],['b6_rebelbow',6,0],['b6_c5_looterknife',3,2]], xp:130, after:'b6_c5_village_after',
      preText:()=>`They come out of the doorways with sacks: four, five, scarves over their mouths and knives out, and the sack nearest drops and something in it breaks. They were not expecting soldiers. They were expecting the dead.`},
    /* the deserters of the Fourteenth at the ruined way-station up the road. The second ground: the way-station's yard, their sergeant and
       the mule with the 9th's salves on it */
    b6_c5_deserters:{title:'The way-station', style:'odhan', open:true, warrenText:'The Sotka road · the warren is sick here, like dirty water', warren:{meanas:.85, denul:.85}, music:'battle',
      map:["##....##","#..t...#","........","..r..t..","........",".t......","......r.","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b6_c5_deserter',2,1],['b6_c5_deserter',5,2],['b6_c5_desxbow',4,0],['b6_c5_deserter',3,4],['b6_c5_desxbow',5,0]], xp:180, after:'b6_c5_des_after',
      waves:[{round:3, foes:[['b6_c5_deserter',7,4]], text:'Another comes round the end of the wall at a run, with his helm off and his sword out, shouting at the others to hold.'}],
      preText:()=>`${b65SapN()}'s sharpers go off against the way-station's wall, two flat cracks, and the wall that was cover is cover for nobody.`,
      stage2:{title:'The way-station\'s yard', xp:90,
        text:()=>`They go back through the gap in the wall, the way they came, and the squad goes after them into the yard, where the well is dry and the roof is long gone and a mule stands tied to a post with the 9th's salves on its back.\n\nTheir sergeant is in the yard, with two of them still beside him. He has a Malazan sergeant's shoulder knot and a face the fire has been at down one side, healed shiny. He does not look like a man who ran. He looks like a man who walked away, slowly, having thought about it.${b65Say({haddat:`\n\n"He was at the breach," Haddat says, low. "Look at him. He was inside." She does not lower the shield.`, darrut:`\n\n"Aren Guard would have hanged him already," Darrut says. "Aren Guard hanged a lot of people." He does not sound proud of it.`, _:''})}${b65Say({marrow:`\n\nMarrow says, "Child," to nobody, and ties a knot in her string, hard.`, mirrel:`\n\n"Don't kill the mule," Mirrel says, behind you. "The mule has our salves on."`, _:''})}`,
        map:["##....##","#..t...#","#......#","...r....","..t..t..","........","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b6_c5_desleader',2,1],['b6_c5_deserter',1,3],['b6_c5_deserter',6,3],['b6_c5_desxbow',5,0]]} },
    /* looters at the boats on the shore at night, after the stores waiting at the waterline. The second ground: the waterline itself, where
       their leader has a boat half off the sand */
    b6_c5_boats:{title:'The boats', style:'b5_c2_strand', dark:true, open:true, warrenText:'The Kokakal shore at night · the warren is sick, and the sea makes it worse', warren:{meanas:.85, denul:.85}, music:'battle',
      map:["~~~~~~~~","~~.~~~~~","........","..t...t.","........",".,....,.","...t....","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]], allies:[['b6_regular',1,7]],
      foes:[['b6_c5_looter',2,2],['b6_c5_looter',5,2],['b6_c5_looterknife',3,4],['b6_c5_looterknife',6,4],['b6_rebelbow',4,2]], xp:180, after:'b6_c5_boats_after',
      waves:[{round:2, foes:[['b6_c5_looter',0,4],['b6_c5_looterknife',7,3]], text:'Two more come in along the waterline from the dark, one at each end, splashing, as if they knew where the sentries would not be.'}],
      preText:()=>`${b65SapN()}'s burner goes off on the wet sand short of the stores, and the beach is orange for a breath, and every face on it turns at once.`,
      stage2:{title:'The waterline', xp:90,
        text:()=>`They break for the water, the way they came, and the squad goes after them into the surf to the knees, where a boat is half off the sand with sacks in it and a big man up to his waist beside it, shoving.\n\nHe sees the squad coming through the shallows and stops shoving. He has a boathook, and the look of somebody who has done this on other beaches, to other armies.${b65Say({mehet:`\n\nMehet stands at the edge of the wet sand with the sling in his hand and does not come in. "I don't swim," he says. "In Y'Ghatan, swimming is for fish." He looses from where he is.`, tangle:`\n\nTangle holds the satchel up over his head, out of the water. "Not wet," he says. "It stays dry."`, rasp:`\n\nRasp holds the satchel up over her head, out of the water. "Salt in a fuse," she says, hoarse. "Not tonight."`, _:''})}`,
        map:["~~~~~~~~","~~~~~~~~","~~~.~~~~","........","..t..t..","........","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b6_c5_lootboss',3,3],['b6_c5_looter',1,4],['b6_c5_looter',6,4],['b6_rebelbow',4,3]]} } },

  foes:{
    /* deserters of the Fourteenth: men of the 10th and the 8th who walked away after the fire, with a mule and the 9th's spare salves */
    b6_c5_deserter:{name:'Deserter of the Fourteenth', sig:'d', kind:'deserter', hp:30, ac:15, atk:10, dmg:[1,8,3], rng:1, mv:4, init:2, verb:'cuts at'},
    b6_c5_desxbow:{name:'Deserter with a crossbow', sig:'x', kind:'xbow', hp:24, ac:13, atk:10, dmg:[1,10,2], rng:6, mv:4, init:2, sk:['pin'], verb:'looses a quarrel at'},
    b6_c5_desleader:{name:'The burned sergeant', sig:'S', kind:'deserter', hp:58, ac:16, atk:11, dmg:[1,10,4], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'brings a short sword down on'},
    /* looters on the shore: men off the coast villages, after the army's stores at the waterline */
    b6_c5_looter:{name:'Looter with a club', sig:'l', kind:'thug', hp:26, ac:13, atk:9, dmg:[1,8,2], rng:1, mv:4, init:1, verb:'clubs at'},
    b6_c5_looterknife:{name:'Looter with a knife', sig:'k', kind:'cutpurse', hp:22, ac:14, atk:10, dmg:[1,6,3], rng:1, mv:5, init:3, sk:['bleed'], verb:'cuts at'},
    b6_c5_lootboss:{name:'The man with the boathook', sig:'L', kind:'bruiser', hp:52, ac:15, atk:11, dmg:[1,10,3], rng:1, mv:4, init:1, boss:true, sk:['reach', 'rally', 'shove'], verb:'swings a boathook at'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b6_c5_fingerbone:{name:'A finger bone on a thong', slot:'trinket', role:'any', who:null, hp:4,
      line:'A small bone, a finger\'s length, bored through and hung on a leather thong. Soldiers who walked out of Y\'Ghatan wear them, and then soldiers who did not. Ask what it is for and the answer changes. Whoever wears it stands a little longer. The healers say that is the point of it.'},
    b6_c5_nokrope:{name:'A hank of Nok\'s tarred rope', slot:'trinket', role:'any', who:null, stat:{might:1},
      line:'An arm\'s length of black tarred hawser off one of Admiral Nok\'s lighters, cut where it frayed and whipped at both ends with twine. It smells of the sea and the pitch-pot. The loading master gave it for a turn on the line. Whoever carries it has learned to put a back into a pull.'} },

  scenes:{
    b6_c5_road:{loc:'The Sotka road', sub:'The last miles · day', cap:'A road across scrub and stone toward the coast, a long column on it, and the smell of the sea coming up to meet it.', amb:'explore'},
    b6_c5_dusk:{loc:'The Sotka road', sub:'The way-station · dusk', cap:'A ruined way-station by the road, its roof long gone, smoke from a cook-fire inside its walls.', amb:'explore'},
    b6_c5_village:{loc:'Off the Sotka road', sub:'A village the plague went through', cap:'Shut doors, a dry lane, a well, and nobody at all.', amb:'explore'} },

  end:{
    wait:['The last boat', 'The Fourteenth came down the Sotka road from Y\'Ghatan with the plague behind it, and waited on the Kokakal shore for Admiral Nok\'s transports. The Third fetched deserters back from a way-station on the road and kept looters off the boats. When word went down the beach that Fist Keneb had pulled his soldiers off the ships for a day on a boy\'s warning, the Third stayed ashore a day with the company\'s last boat. It was on the sand when the marines the army had counted dead walked in out of the desert.'],
    sail:['Aboard', 'The Fourteenth came down the Sotka road from Y\'Ghatan with the plague behind it, and waited on the Kokakal shore for Admiral Nok\'s transports. The Third fetched deserters back from a way-station on the road and kept looters off the boats. When word went down the beach that Fist Keneb had pulled his soldiers off the ships for a day on a boy\'s warning, the Third went aboard with the company on the first day, as ordered. It watched from the rail as the marines the army had counted dead walked in out of the desert.'] },
  endScene:'b6_kokakal',
  endCap:()=> b65Key() === 'sail' ? 'The transport at anchor off the Kokakal shore, the Third at its rail, and the beach crowded with an army that has got some of its dead back.' : 'The Kokakal shore at dusk, the company\'s last boat drawn up on the sand, and the Third beside it with the sea in front.',
  tease:'Next: the sea. Nok\'s fleet, the Third aboard a transport, and the Empire\'s oldest city somewhere over the horizon.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b6_c5_key === 'wait') x.push('On a boy\'s warning about Sepik, Fist Keneb pulled his soldiers off the ships for a day. The Third stayed ashore a day too, with the company\'s last boat.');
    if (f.b6_c5_key === 'sail') x.push('The Third went aboard its transport on the first day, as ordered, and spent the day at anchor watching the beach.');
    if (f.b6_c5_survivors) x.push('The marines the army had counted dead under Y\'Ghatan walked in out of the desert. The Fourteenth went down the beach to meet them.');
    if (f.b6_c5_missing) x.push('The Third looked for its own among the ones who walked in. They were not there.');
    if (f.b6_bone) x.push('A heavy who came out through the fire gave the Third a finger bone apiece. The Third wears them.');
    else if (f.b6_c5_boneSaid) x.push('A heavy who came out through the fire offered the Third the finger bone. The Third did not take it, this time.');
    if (f.b6_c5_desMercy === 'go') x.push('The last of the deserters at the way-station walked off into the scrub. The Third told the captain they ran.');
    else if (f.b6_c5_desMercy === 'back') x.push('The Third marched the deserters from the way-station back to the column. What the army did with them is the army\'s.');
    if (f.b6_c5_horseOk) x.push('A Wickan rider at the horse lines taught the Third the horse-talk: clicks, and a hand on the thigh.');
    if (f.b6_c5_shrine) x.push('On the Sotka road, people who had cursed Coltaine were leaving crow feathers on a cairn for him.');
    if (f.b6_c5_villageDone) x.push('Looters were going through the shut houses of a plague village off the road. The Third put them out.');
    if (b6In('mehet')) x.push('Mehet saw the sea for the first time on the Kokakal shore. He did not think much of it, he said, and stood looking at it until dark.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b6_c5_key === 'wait' && 'The Third stayed ashore a day with the company\'s last boat, as Fist Keneb\'s soldiers did, on a boy\'s warning that sailing on the day meant drowning two days past Sepik.',
    f.b6_c5_key === 'sail' && 'The Third went aboard its transport with the company on the first day, as ordered.',
    f.b6_c5_survivors && 'The marines the army counted dead under Y\'Ghatan walked in out of the desert to the Kokakal shore.',
    f.b6_bone && 'The Third wears the finger bone now, as the soldiers who walked out of Y\'Ghatan do.',
    f.b6_c5_word && 'Fist Keneb pulled his soldiers off the ships for a day. The beach says a boy in his household warned him about Sepik.',
    f.b6_c5_wickans && 'Temul\'s Wickans are ashamed. They watched for breakouts while the city burned, and say they were denied their death. Some say they will go home.',
    f.b6_c5_ship && 'Sailors say a black ship was brought in that no sailor in the fleet will go near, and that it has been given to a marine sergeant.',
    f.b6_c5_boatsDone && 'Looters came for the stores at the boats on the Kokakal shore. The Third kept them off.',
    f.b6_c5_desDone && 'Deserters of the Fourteenth were holed up at a ruined way-station on the Sotka road. The Third fetched them.',
    f.b6_c5_rumour && 'Three thousand went into Y\'Ghatan, the camp says. Seven hundred and ninety-one came out.',
    f.b6_c5_shrine && 'On the Sotka road, a cairn with crow feathers in it, for Coltaine. The people leaving them cursed him a year ago.',
    'The Fourteenth came down the Sotka road from Y\'Ghatan to the Kokakal shore, with the plague behind it.'].filter(Boolean); },

  dlg:{
    /* ---- the road's last night, on the bluff above the shore: the first halt ---- */
    b6_c5_start:()=>({sp:'The bluff above the shore', scene:'b6_kokakal', html:feverHTML(), fx:()=>{ S.f.b6_c5_ph ??= 1; S.f.b6_c5_seaSeen = 1; },
      again:()=> b65Ph() >= 2 ? 'The bluff, and the road going down off it to the shore.' : 'The halt on the bluff, the column\'s fires along the road, and the transports\' lanterns below.', txt:
`The Sotka road comes over the last rise at dusk and stops being a road. Below it the ground falls away in a long bluff of sand and stone to a beach, and beyond the beach is the sea.

The column goes quiet for a while. The sea is grey and very large, and on it, out past the surf, there are ships. Dozens of them, riding at anchor in rows with their lanterns being lit one after another as the dark comes on.

The 9th halts on the bluff and makes its fires along the road's edge. Behind it, the plague is in the villages. In front of it is the Empire's fleet. The 9th sits between the two and boils its water twice.

${b65Say({haddat:`Haddat stands at the bluff's edge with the blue shield grounded. "My mother sold water in Hissar," she says. "She said the sea was the one water nobody could sell." She looks at it a while longer. "She would have tried."`, marrow:`Marrow sits down on a stone with her back to Y'Ghatan and her face to the sea. "Child," she says, and then nothing else until the fires are lit, and then: "Good."`, _:'The squad stands at the bluff\'s edge and looks at the sea, and the sea goes on being the sea.'})}${b65If('mehet', `\n\nMehet has gone very still beside you. He is looking at the water like a thing he was told about as a child and did not believe. "That is all water," he says at last. "All of it." He touches the ring of keys at his belt, once.`)}${b65Say({tallow:`\n\nTallow has his grandmother's deck out in its oilcloth already, and is looking from it to the ships and back. "She'd want to read," he says. "Over the water. She'd say not to, and then she'd want to."`, yorin:`\n\nYorin looks up at the sky over the sea, and then at his hands. "Clean air," he says. "First clean air since the fire." He does not reach for the warren. "I'll wait till it's clean in there too."`, _:''})}`,
      ch:[b6DeckChoice(5),
          {t:'Find the captain.', req:()=>!S.f.b6_c5_capSaid, go:()=>startExplore()},
          {t:'Look down at the fleet a while.', req:()=>!S.f.b6_c5_lookout, go:'b6_c5_lookout'},
          {t:'Walk the halt.', go:()=>startExplore()}]}),
    b6_c5_deck:()=>b6DeckOffer(5),
    b6_c5_card:()=>b6DeckCard(5),
    /* the reading's way back: to the halt on the road, or the fire on the shore if the squad sat down there */
    b6_c5_deck_back:()=>DLG[b65Ph() >= 2 ? 'b6_c5_fire' : 'b6_c5_start'](),

    b6_c5_lookout:()=>({sp:'The bluff\'s edge', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_lookout = 1; }, txt:
`From the edge of the bluff you can count them, if you want to, and somebody in the 9th always wants to. Forty, fifty, more past the point where the coast bends. Transports, broad in the beam and low, and here and there something leaner with more oars, keeping them in order.

Admiral Nok's fleet. Come to take the Fourteenth off Seven Cities.

Where to, the army has not been told. The camp says Quon Tali, and home, and the camp says a great many things. The ships ride at anchor and keep their counsel. A bell rings on one of them, very small and very clear across the water, and then on another, and another, down the line, as the watch changes.${b65Say({tebbet:`\n\nTebbet has counted. "Sixty-one I can see," he says. "Dal Hon has no sea. I don't like it already."`, darrut:`\n\nDarrut looks at the ships with his helm under his arm. "Aren had a harbour," he says. "Ships went out of it. Mostly they came back."`, _:''})}${b65R({orvas:`\n\nOrvas has come to the edge with you, and is not looking at the ships. He is looking north along the coast, where the Khundryl horse lines are. "The Burned Tears will not get on a boat," he says. "We have never got on a boat." He thinks about it. "I may be the first."`, warlock:`\n\n"*Ships,*" the grandmother says, out of Keth's mouth, with great disgust. "*Wickans on ships.*" Keth, in his own voice: "She was sick on a river once."`, redblade:`\n\nRamin looks at the ships for a while. Then: "My father said the Empire came over the sea in ships like those. He said they would leave the same way." He puts his helm on. "He did not say with me on them."`})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* ---- the captain: the deserters at the way-station ---- */
    b6_c5_captain:()=>({sp:'The captain · the 9th', scene:'b6_c5_road', txt:
`The captain is sitting on an upturned crate by the company's tents with a wax tablet on his knee and his helm off, which he never does in front of the company. His eyes are red. The whole 9th's eyes are red. It is the smoke, and it has been the smoke for days.

"Sergeant." He finds his place on the tablet. "Six of the 10th went off the column two nights back. And a sergeant. With a mule, and the mule had the 9th's spare salves on it, which is why it's my business and not the 10th's." He rubs his eyes. "There's an old way-station a few miles back up the road, west. A picket saw smoke there this morning."

He looks at the tablet, and not at you. "They were in the city, some of them. Inside, when it went. I'd like the salves back, and the men. In that order, if it has to be an order."`,
      ch:[{t:'"We\'ll fetch them, sir."', fx:()=>{ S.f.b6_c5_capSaid = 1; }, go:'b6_c5_captain_2'},
          {t:'"And when we bring them in, sir?"', req:()=>!S.f.b6_c5_capWhy, fx:()=>{ S.f.b6_c5_capWhy = 1; }, go:'b6_c5_captain_why'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_captain_why:()=>({sp:'The captain', scene:'b6_c5_road', txt:
`The captain puts the stylus down.

"The army will want them," he says. "On the shore, in front of the legions, so everybody sees what it costs. That's how it's done. I didn't write it." He looks west up the road, toward the city you cannot see from here and can still smell. "Three thousand went into that city, Sergeant. I watched them go in. I don't know what I'd have done, if I'd been one of the ones who came out."

He picks the stylus up again. "Bring them in. That's the order. I've given it."`,
      ch:[{t:'"Sir."', fx:()=>{ S.f.b6_c5_capSaid = 1; }, go:'b6_c5_captain_2'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_captain_2:()=>({sp:'The captain', scene:'b6_c5_road', txt:
`"Good." He writes the Third against something. "West, back up the road. A few miles. You'll see the walls." He looks up. "Go careful. They have crossbows, and they were soldiers last week."${b65Say({haddat:`\n\nHaddat, behind you, says quietly: "They are still soldiers, Captain. That is what makes it hard."\n\nThe captain looks at her for a while, and nods, and does not write that down.`, tebbet:`\n\nTebbet, behind you: "Crossbows. Ours." He checks his string.`, _:''})}${b65If('mehet', `\n\nMehet, at your shoulder: "The way-station on the Sotka road has a well that has been dry since my grandfather's time. They will be short of water." He shrugs. "Men short of water are not patient."`)}`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),
    b6_c5_captain_again:()=>({sp:'The captain', scene:'b6_c5_road', again:()=> b65RoadDone() ? 'The captain, writing. "Down to the shore, Sergeant."' : 'The captain, writing. "West, Sergeant. The way-station."', txt: b65RoadDone() ?
`The captain has the salves counted already, and written down. "Down to the shore with the rest of us, Sergeant," he says. "The fleet won't wait for ever. It says it will. It won't."` :
`The captain is still on his crate, still writing. "West, Sergeant," he says, without looking up. "Back up the road to the way-station. The salves, and the men."`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),

    /* ---- the camp on the bluff: the old soldier's talk (the 791, the Host), the burial detail, the carts, the cairn ---- */
    b6_c5_rumour:()=>({sp:'The old soldier of the 9th', scene:'b6_c5_road', fx:()=>{ S.f.b6_c5_rumour = 1; }, again:()=>'The old soldier, with his deck and his rum.', txt:
`The old soldier of the 9th is sitting with his back to a cart wheel with a cup of something in one hand and his deck in the other, doing neither.

"Seven hundred and ninety-one," he says, when you sit. "That's the count. The 8th's clerks did it on the road, by name. Seven hundred and ninety-one came out through the fire, by the girl's way. Out of three thousand." He drinks. "I've been in the army since before your mother's mother, Sergeant. I've never heard a count like it. I've heard worse. Never like it."

He turns the cup. "And the sailors off the supply boats say Onearm's Host is camped before G'danisban in the rain, with the plague in its tents the same as ours. Everybody's got the plague. Even the gods, I hear." He drinks again. "I don't hear much from gods."${b65Say({hessa:`\n\nHessa, beside you, very straight: "The priests of the Worm were the healers of Seven Cities. In the temple they said D'rek's priests could break any fever." She looks at the cup. "I would like to know where they all are."\n\nThe old soldier looks at her and does not tell her what the sailors say about that.`, tangle:`\n\n"Seven hundred and ninety-one," Tangle says, and you can see him holding it, the way he holds a number. He puts it away somewhere.`, _:''})}`,
      ch:[{t:'"The girl\'s way?"', req:()=>!S.f.b6_c5_rumour2, fx:()=>{ S.f.b6_c5_rumour2 = 1; }, go:'b6_c5_rumour_2'},
          {t:'Drink to the seven hundred and ninety-one.', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_rumour_2:()=>({sp:'The old soldier of the 9th', scene:'b6_c5_road', txt:
`"The girl. One of the Adjunct's strays, from the flood at Raraku." He shrugs. "She went into the fire and made a way through it, and they came out by it, the ones who did. That's what the 8th says. The 8th was there and I wasn't, so I say it too." He looks into the cup. "${b65In3() ? 'Your lot were in there, holding it open. You tell me.' : 'Your lot held the gate. You saw them come out.'}"

He does not wait for you to tell him. "There's a thing they're doing now, the ones who came out. I'll let them tell you. They'll want to." He drinks. "Soldiers. Give them a fire and a bit of bone and they'll make a religion out of it by morning."`,
      ch:[{t:'Leave him to his cup.', go:()=>startExplore()}]}),
    b6_c5_burial:()=>({sp:'A burial detail', scene:'b6_c5_road', fx:()=>{ S.f.b6_c5_burial = 1; }, txt:
`A detail of the 10th is digging by the road's edge in the last light: four men with spades and their scarves up over their mouths, and a long shape in a cloak on the ground beside them that they are not looking at.

"Fever," the corporal says, when you stop. He does not stop digging. "Three days ago he was shaking. Yesterday he couldn't keep water down. This morning he was quiet." He puts the spade in. "The surgeons say get it in the ground and burn the cloak. So we're getting it in the ground."

He straightens, and looks back up the road toward Y'Ghatan, and down it toward the sea. "The Adjunct's right to run," he says. "I'd run. I am running. We all are."${b65Say({mirrel:`\n\nMirrel looks at the shape in the cloak, and at the corporal's hands, and then at your squad's hands, one after another. "Boil your water," she says. "Twice. I mean it."`, marrow:`\n\nMarrow looks at the shape in the cloak and her lips move. Then she says to the corporal, quite kindly, "Deeper, child."`, _:''})}`,
      ch:[{t:'Lend a hand with the digging.', fx:()=>{ b65L('haddat', 1); b65L('darrut', 1); }, go:'b6_c5_burial_dug'},
          {t:'Leave them to it.', go:()=>startExplore()}]}),
    b6_c5_burial_dug:()=>({sp:'A burial detail', scene:'b6_c5_road', txt:
`The squad takes the spades for a while, and the 10th's detail sits down at the road's edge and watches, too tired to argue.

It goes faster with more hands. When it is done the corporal says the soldier's name, once, and his legion, and the squad adds nothing, because there is nothing to add to a name. Then the cloak goes on a fire, and the 10th goes back to its lines, and the squad goes back to its own, and boils its water twice.`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b6_c5_carts:()=>({sp:'The 9th\'s carts', scene:'b6_c5_road', fx:()=>{ S.f.b6_c5_carts = 1; }, again:()=>'The 9th\'s carts, and the carters asleep under them.', txt:
`The 9th's carts are drawn up in a line at the road's edge, the mules hobbled, the carters already asleep underneath with their boots on. The water barrels are lower than they were at Y'Ghatan. The salve chest is a good deal lower.

${S.f.b6_c5_desDone ? 'The mule from the way-station is tied at the end of the line, with the 9th\'s salves back on the carts where they belong, counted twice.' : 'The salve chest has a gap in it the size of a mule\'s load, and a carter has chalked on the lid, carefully, *10th*, and then crossed it out, and written *deserters*.'}${b65Say({tangle:`\n\n${b6In('tangle') ? 'Tangle' : 'The sapper'} goes along the carts out of habit and counts the munitions crates by feel, under the canvas. "${numw((S.inv && S.inv.sharper) || 0, true)} of ours left," he says. "Sharpers. Don't anyone ask me for more."`, rasp:`\n\nRasp goes along the carts out of habit and lays a hand on each munitions crate under its canvas, like a groom along a horse line. "${numw((S.inv && S.inv.sharper) || 0, true)} sharper${((S.inv && S.inv.sharper) || 0) === 1 ? '' : 's'} of ours," she says, hoarse. "That's all. Don't ask."`, _:''})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b6_c5_shrine:()=>({sp:'A cairn by the road', scene:'b6_c5_road', fx:()=>{ S.f.b6_c5_shrine = 1; }, again:()=>'The cairn with the crow feathers in it.', txt:
`At the road's edge, on the bluff, there is a cairn of white stones about as high as a man's waist. Feathers have been pushed into the cracks between the stones, black ones, dozens of them. Crow feathers. There is a strip of faded cloth tied round the top stone, and a bowl of water in front of it with a film of dust on it.

An old man from one of the coast villages is squatting beside it, changing the water. He sees the Malazan cloaks and stands, slowly, and does not run.

"For the Crow," he says, in the coast tongue, and then, in bad Malazan: "Coltaine. Who carried the refugees from Hissar to Aren with Kamist Reloe at his heels." He looks at the feathers. "A year ago we cursed him. Now we leave him feathers. Who can say why." He shrugs. "He kept his promise to people who were not his. There are not so many who do that."${b65Say({haddat:`\n\nHaddat has gone pale under the dust. "We walked with him," she says, to the old man, in the coast tongue. "The squad. We walked with him." The old man looks at her a long while, and then puts his hand on her shoulder, once, and takes it away.`, marrow:`\n\nMarrow looks at the cairn. "Child," she says, "he would have hated this." She takes a crow feather out of her own string, a black one, old, and pushes it into a crack with the others.`, _:''})}${b65Say({sathi:`\n\nSathi has her hand over her mouth. She does not take it away for some time.`, tangle:`\n\nTangle counts the feathers. He gets to forty and stops, and does not say the number.`, _:''})}${b65R({warlock:`\n\n"*The Crow,*" the grandmother says, out of Keth's mouth, very quietly, and then Keth himself says something in Wickan that is not for the squad, and kneels, and does not get up for a while.`, orvas:`\n\nOrvas touches the black tears on his own face, and then the stones. "The Khundryl rode too late for him," he says. "Everybody knows it. We know it best."`})}`,
      ch:[{t:'Leave something at the cairn.', req:()=>!S.f.b6_c5_left, fx:()=>{ S.f.b6_c5_left = 1; b65L('haddat', 1); b65L('marrow', 1); b65L('sathi', 1); b65L('warlock', 1); }, go:'b6_c5_shrine_left'},
          {t:'Ask him what the coast says about the fleet. (an old man, wary of soldiers)', check:['guile', 15], req:()=>!S.f.b6_c5_coast,
            edges:id=>[id === 'haddat' && ['Haddat speaks the coast tongue', 2], id === 'mehet' && ['Mehet is of Seven Cities', 2], id === 'sgt' && ['you walked the Chain', 1]],
            near:{t:()=>`Yes, but he answers in a long stream of coast dialect, and ${b65Nm(b65Who())} has to work for every word of it, and comes away with a headache. Rattled: −1 on the next check.`, fx:()=>b65Rattle(b65Who())},
            fx:()=>{ S.f.b6_c5_coast = 1; }, go:'b6_c5_shrine_coast', fail:'b6_c5_shrine_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_shrine_left:()=>({sp:'A cairn by the road', scene:'b6_c5_road', txt:
`You find something to leave. It does not matter much what: a copper, a bit of thread, a strip off a cloak. The old man watches you push it in among the feathers, and changes the water, and goes back down the bluff toward his village before the light goes.

${b65Say({haddat:'Haddat stays at the cairn after the rest have gone back to the fire. When she comes, she sits down without a word and cleans the blue shield until it is too dark to see it.', _:'The squad goes back to the fire, and talks little.'})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b6_c5_shrine_coast:()=>({sp:'The old man at the cairn', scene:'b6_c5_road', txt:
`The old man considers you, and the feathers, and decides.

"The ships have been in the bay four days," he says. "The sailors come ashore for water and say nothing to anybody, so they have been told to say nothing. The fishermen say the sea to the south and east is wrong this season. Ships seen far out that are no ships of ours. Grey ones, and black ones." He spreads his hands. "Fishermen. They see what they like." He picks up his water bowl. "Go with the Crow, soldier. He would have hated that, too."`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b6_c5_shrine_no:()=>({sp:'The old man at the cairn', scene:'b6_c5_road', txt:
`The old man listens to the question and looks at the Malazan cloaks and the swords, and decides he does not know anything about ships. He changes the water in the bowl, carefully, and goes back down the bluff toward his village, and does not hurry.`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* ---- the way-station: the deserters (main fight) ---- */
    b6_c5_waystation:()=>({sp:'The way-station', scene:'b6_c5_dusk', again:()=> b65RoadDone() ? 'The way-station, empty now, and the cook-fire out.' : 'The way-station\'s wall, and the smoke from inside it.', txt: b65RoadDone() ?
`The way-station is empty now, and the cook-fire inside its walls has gone to ash. It will be used again, one day, when there is a road worth stopping on.` : !S.f.b6_c5_capSaid ?
`The road goes back west the way the column came, toward Y'Ghatan. A few miles along, the walls of an old way-station stand off the road, and there is smoke from inside them. The captain will want to know about that before anybody goes looking.` :
`The way-station is a square of mud-brick walls off the road, roofless, older than the Empire, with a gap where the gate was and a thin smoke going up from inside. A mule complains somewhere behind the wall.

There are men on the wall, two of them, lying flat with crossbows. Malazan crossbows. They have seen the squad, or they have seen something; one of them lifts his head to look along the road, and puts it down again.${b65Say({haddat:`\n\n"Seven," Haddat says, very low. "If the captain counted right. Behind a wall, with water short." She sets the blue shield. "I would rather fight Leoman's."`, _:''})}${b65If('mehet', `\n\nMehet, at your elbow: "There is a drain under the north wall. For the rain, when there was rain. A boy can get through it." He measures you with his eye. "Not you."`)}`,
      ch:[{t:'"Shields. We go in through the gap."', req:()=>!b65RoadDone() && !!S.f.b6_c5_capSaid, go:()=>startBattle('b6_c5_deserters', {})},
          {t:`${b65SapN()} puts two sharpers against the wall.`, tag:'uses 2 sharpers', req:()=>!b65RoadDone() && !!S.f.b6_c5_capSaid && !!b65Sap() && ((S.inv && S.inv.sharper) || 0) >= 2, fx:()=>{ S.inv.sharper -= 2; }, go:()=>startBattle('b6_c5_deserters', {pre:true})},
          {t:'Call to them. ("The captain wants the salves. And you.")', check:['guile', 16], req:()=>!b65RoadDone() && !!S.f.b6_c5_capSaid,
            edges:id=>[id === 'sgt' && ['a sergeant\'s voice', 2], id === 'darrut' && ['Darrut sounds like the Guard', 1], id === 'haddat' && ['Haddat was at the breach too', 1]],
            near:{t:'Yes, but their sergeant shouts them down before they can answer, and only two of them put the crossbows down and walk out with their hands up. The rest stay on the wall.'},
            go:()=>startBattle('b6_c5_deserters', nearMiss() ? {drop:[2]} : {drop:[2, 4], surprise:'p'}), fail:'b6_c5_waystation_no'},
          {t:'Come at the wall from the north, by the drain. (quiet, in the last light)', check:['wits', 16], req:()=>!b65RoadDone() && !!S.f.b6_c5_capSaid,
            edges:id=>[id === 'mehet' && ['Mehet knows the drain', 3], id === 'tebbet' && ['Tebbet moves quiet', 1]],
            near:{t:'Yes, but a stone goes under a boot at the last, and the men on the wall turn, and nobody has the jump on anybody.'},
            go:()=>startBattle('b6_c5_deserters', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c5_waystation_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_waystation_no:()=>({sp:'The way-station', scene:'b6_c5_dusk', txt:
`A voice comes back over the wall, a sergeant's voice, rough down one side as if the smoke had got into it.

"Tell the captain we're dead," it says. "Tell him we died in the city with the rest. It's near enough true." A crossbow comes up over the parapet. "Go back to the column, Sergeant. We won't follow you."

They will not come out. The Third will have to go in.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c5_deserters', {})}]}),
    b6_c5_waystation_seen:()=>({sp:'The way-station', scene:'b6_c5_dusk', txt:
`Halfway along the north wall a man stands up on the parapet to piss, and looks down, and sees the squad.

He shouts. The crossbows come round.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b6_c5_deserters', {surprise:'e'})}]}),
    b6_c5_des_after:()=>({sp:'The way-station', scene:'b6_c5_dusk', fx:()=>{ if (!S.f.b6_c5_desDone) { S.f.b6_c5_desDone = 1; S.inv.salve = (S.inv.salve || 0) + 2; note('Two salves off the mule, for the squad\'s own pouches. The captain will not count them.', 'good'); } }, txt:
`It is quiet in the yard. The mule has stopped complaining. The cook-fire is still going, with a pot on it of something that might have been lentils.

Two of the deserters are alive, sitting against the wall with their hands where you can see them. One is a boy of the 10th who cannot be eighteen, with burns on both forearms wrapped in strips of his own shirt. The other is older, and has stopped caring what happens.

"We were inside," the boy says, to nobody. "When it went up. We got out by the girl's way." He looks at his arms. "Then we walked. That's all. We just kept walking."

Behind them the mule stands with the 9th's salves on its back, untouched. They had not even opened them.${b65Say({haddat:`\n\nHaddat looks at the boy's arms, and then at her own hands.`, marrow:`\n\nMarrow kneels by the boy and unwraps the strips without asking, and looks, and wraps them again properly. "Child," she says. That is all.`, mirrel:`\n\nMirrel kneels by the boy and unwraps the strips without asking, and looks, and swears quietly, and wraps them again properly.`, _:''})}`,
      ch:[{t:'March them back to the column.', fx:()=>{ S.f.b6_c5_desMercy = 'back'; b65L('tebbet', 1); b65L('darrut', 1); b65L('haddat', -1); }, go:'b6_c5_des_back'},
          {t:'Tell the two of them to walk the other way, and keep walking.', fx:()=>{ S.f.b6_c5_desMercy = 'go'; b65L('haddat', 1); b65L('marrow', 1); b65L('mirrel', 1); b65L('darrut', -1); }, go:'b6_c5_des_go'}]}),
    b6_c5_des_back:()=>({sp:'The Sotka road', scene:'b6_c5_road', txt:
`You march them back down the road to the column in the dark, the two of them in front with their hands tied, and the mule behind, and the squad round all three.

The captain meets you at the edge of the 9th's lines. He looks at the salves first, as he said he would, and then at the two men, and then at the boy's arms. "Well done, Sergeant," he says, and writes it down, and takes them away himself.

What the army does with them is the army's. The squad does not ask, and the captain does not say.${b65Say({tebbet:`\n\nTebbet, at the fire later, says: "Orders." He says it once, as a fact, and goes to sleep.`, darrut:`\n\nDarrut, at the fire later, says: "In the Guard we'd have done it on the road." He looks at the fire. "This is better. I think it's better."`, _:''})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),
    b6_c5_des_go:()=>({sp:'The way-station', scene:'b6_c5_dusk', txt:
`You tell them. The older one does not believe it, and then does, and gets up and goes over the north wall without a word and is gone into the scrub. The boy stays sitting against the wall with his wrapped arms on his knees.

"Where?" he says.

The squad has no answer to that. After a while he gets up and goes too, east, away from the road and the sea, into a country with the plague in it.

The squad brings the mule back down the road to the column in the dark. "They ran," you tell the captain. He looks at you a long while, and at the salves, and writes it down. "They ran," he says.${b65Say({darrut:`\n\nDarrut does not speak to you for the rest of the night. In the morning he does, as if nothing had happened, which is Darrut's way of saying something had.`, _:''})}`,
      ch:[{t:'Back to the halt.', go:()=>startExplore()}]}),

    /* ---- the plague village off the road (optional): its well, and looters in its doors ---- */
    b6_c5_villagelane:()=>({sp:'A lane off the road', scene:'b6_c5_road', again:()=>'The lane south to the village, and nobody on it.', txt: S.f.b6_c5_villageDone ?
`The lane goes south off the road to the village. There is nothing more there for the squad, and the squad would rather not go back.` :
`A lane goes south off the road between low walls to a village a quarter-mile away: a few dozen flat roofs, a palm or two, no smoke. The column has gone past it without slowing. The column has been going past villages like it since Y'Ghatan.

There are figures moving among the houses. Not many. Not villagers: villagers would be at their doors, watching the army go by, the way villagers always are.${b65Say({mirrel:`\n\n"Plague," Mirrel says. "That's why nobody's at the doors." She looks at you. "If we go in, we touch nothing. We drink nothing."`, _:''})}`,
      ch:[{t:'Down the lane.', req:()=>!S.f.b6_c5_villageDone, onward:true, go:()=>{ startExplore('b6_c5_village'); talk('b6_c5_village_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_village_arrive:()=>({sp:'A village off the road', scene:'b6_c5_village', txt:
`The lane comes out into the village's one street. The doors are shut, all of them, and somebody has chalked a ring on each one, white, at the height of a man's face. The well is in the middle of the street with its bucket on the wall.

It is very quiet. The smell is not strong. It is enough.

At the top of the street a door that was shut is standing open, and somebody inside is going through what was left.${b65Say({haddat:`\n\nHaddat pulls her scarf up over her mouth and nose without being told, and so does everyone else.`, _:''})}`,
      ch:[{t:'Look round.', go:()=>startExplore()}]}),
    b6_c5_well:()=>({sp:'The village well', scene:'b6_c5_village', again:()=>'The well, and its bucket on the wall.', txt:
`The well has a stone lip worn smooth by a few hundred years of hands, and the bucket on its rope is dry. The squad's skins are low. They have been low since the Sotka road began.

The water down there is clean, probably. Wells usually are. It is the village that is not.${b65Say({mirrel:`\n\n"Boil it," Mirrel says. "Twice. Don't let the bucket touch your skin. Don't let the skin touch the lip." She looks at the well. "I'd rather we didn't."`, marrow:`\n\n"Child," Marrow says, "if you must, boil it. I will not tell you twice, because you will not listen once."`, _:''})}`,
      ch:[{t:'Draw water, and be careful about it. (the bucket, the rope, the lip)', check:['wits', 15], req:()=>!S.f.b6_c5_water,
            edges:id=>[(id === 'mirrel' || id === 'marrow') && ['a healer\'s care', 2], id === 'mehet' && ['Mehet knows these wells', 1]],
            near:{t:()=>`Yes, but the rope slips and the wet of it runs over ${b65Nm(b65Who())}${b65Who() === 'sgt' ? 'r' : '\'s'} hands, and ${b65Who() === 'sgt' ? 'you wipe them' : 'they wipe them'} on a cloak that has been on this street. The fever comes on that night.`, fx:()=>{ b6Catch(b65Who(), 'the village well'); }},
            fx:()=>{ S.f.b6_c5_water = 1; }, go:'b6_c5_well_ok', fail:'b6_c5_well_no'},
          {t:'Leave it.', go:()=>startExplore()}]}),
    b6_c5_well_ok:()=>({sp:'The village well', scene:'b6_c5_village', txt:
`The bucket goes down and comes up full, and nobody's hands touch the wet of it. The water goes into the squad's pot, and the pot goes on a fire at the lane's end, and boils, and boils again.

It is good water. It is the first good water since Y'Ghatan. The squad drinks it slowly, as people drink something they are not sure they are allowed.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b6_c5_well_no:()=>({sp:'The village well', scene:'b6_c5_village', txt:
`The rope is rotten a fathom down, and the bucket goes into the dark with it and does not come up. There is a splash, a long way below.

The squad looks at the well, and at each other, and decides the skins are not so low after all.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b6_c5_houses:()=>({sp:'The houses', scene:'b6_c5_village', again:()=> S.f.b6_c5_villageDone ? 'The houses, their doors shut again.' : 'The open door at the top of the street.', txt: S.f.b6_c5_villageDone ?
`The doors are shut again. The squad has shut them, every one, without being asked, and chalked the rings back where the looters scuffed them.` :
`At the top of the street, three doors stand open now. Men are going in and out of them with sacks: five of them, maybe six, scarves over their faces, knives in their belts. One of them comes out with a brass lamp and a rolled rug and drops the rug in the dust to get a better grip on the lamp.

They are not from this village. The village is not going anywhere.${b65Say({hessa:`\n\nHessa's knuckles are white on her spear. "In Kartool," she says, "they would be given to the Worm for this." She does not explain what that means.`, mehet:`\n\nMehet watches them, and his face does a thing it has not done since the squad found him. "Lothal men," he says. "From the road. When Leoman sent us out, they were waiting on the road for us." He takes the sling off his belt.`, _:''})}`,
      ch:[{t:'"Put it down. All of it."', req:()=>!S.f.b6_c5_villageDone, go:()=>startBattle('b6_c5_village', {})},
          {t:'Get round behind them through the houses. (shut doors, and what is behind them)', check:['guile', 15], req:()=>!S.f.b6_c5_villageDone,
            edges:id=>[id === 'mehet' && ['Mehet knows these houses', 2], id === 'tebbet' && ['Tebbet moves quiet', 1]],
            near:{t:()=>`Yes, but the way through the houses is through the houses, and ${b65Nm(b65Who())} will not forget one of the rooms. Rattled: −1 on the next check.`, fx:()=>b65Rattle(b65Who())},
            go:()=>startBattle('b6_c5_village', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c5_houses_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_houses_seen:()=>({sp:'The houses', scene:'b6_c5_village', txt:
`A door the squad thought was shut opens as you pass it, and a man with a sack comes out of it face to face with ${b6In('haddat') ? 'Haddat\'s shield' : 'the squad'}, and yells.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c5_village', {surprise:'e'})}]}),
    b6_c5_village_after:()=>({sp:'A village off the road', scene:'b6_c5_village', fx:()=>{ if (!S.f.b6_c5_villageDone) { S.f.b6_c5_villageDone = 1; S.inv.salve = (S.inv.salve || 0) + 1; note('A salve, sealed, in one of the looters\' sacks. It is the squad\'s now.', 'good'); } }, html:feverHTML(), txt:
`The ones still standing run, east, over the walls, leaving the sacks. The squad does not chase them.

It puts what it can back. Lamps, rugs, a box of combs, a child's wooden horse. It does not go into the rooms. It sets each thing inside each door, and shuts the door, and the sergeant chalks the ring again where it was scuffed.

There is nothing else to do in the village. There was never anything to do in it.${b6FeverList().length ? `\n\n${b6FeverList().map(id => id === 'sgt' ? 'You are' : NAME(id) + ' is').join(' and ')} sweating by the time the squad reaches the road, and it is not the sun.` : ''}`,
      ch:[{t:'Back to the road.', onward:true, go:()=>b65Back()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_village_back:()=>({sp:'The lane', scene:'b6_c5_village', txt:
`The lane goes back up to the road between its low walls. Behind you the village sits with its doors shut and its well in the middle of its one street, and does not watch you go.`,
      ch:[{t:'Up the lane to the road.', onward:true, go:()=>b65Back()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the way down to the shore ---- */
    b6_c5_road_on:()=>({sp:'The road down to the shore', scene:'b6_kokakal', again:()=>'The road going down off the bluff to the beach.', txt: b65RoadDone() ?
`In the morning the 9th goes down off the bluff by the old road, which turns to sand halfway and then to beach. The sea is louder close to. The ships are bigger. The Fourteenth spreads itself along the shore for a mile in each direction and puts its tents up in the dunes, and the first boats are already coming in through the surf.` :
`The road goes down off the bluff to the beach. ${!S.f.b6_c5_capSaid ? 'The captain has something for the Third first; he is by the tents.' : 'The captain wants the salves and the deserters back before the 9th goes down to the sea. The way-station is back up the road, west.'}`,
      ch:[{t:'Down to the shore.', req:()=>b65RoadDone(), onward:true, go:()=>{ S.f.b6_c5_ph = 2; startExplore('b6_c5_shore'); talk('b6_c5_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the shore: the arrival, the captain's orders, the surgeons, the Wickans, the loading master ---- */
    b6_c5_arrive:()=>({sp:'The Kokakal shore', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_ph = Math.max(2, b65Ph()); }, txt:
`The 9th's lines go up in the dunes above the beach, among the grass, with the wet sand below and the boats coming and going through the surf all day.

The Kokakal shore is a long camp. The Fourteenth is strung out along it as far as you can see, legion by legion, the Wickans' horse lines to the north and the Khundryl beyond them, and in front of all of it the transports at anchor, rocking, with the lighters going out loaded and coming back empty.

It takes days to put an army on ships. The 9th is told two. It does not believe it.${b65Say({tallow:`\n\nTallow stands at the waterline and lets the surf come over his boots and go out again. "Cold," he says, astonished. "It's cold. They never said it'd be cold."`, darrut:`\n\nDarrut looks at the boats going out through the surf. "Every one of those comes back empty," he says. "I've been watching. Every one." He seems comforted.`, _:''})}${b65If('mehet', `\n\nMehet walks down to where the sand goes wet and stops, exactly, at the line, with the toes of his boots on dry sand. The next wave comes up and over them anyway. He does not step back.`)}`,
      ch:[{t:'Find the captain.', go:()=>startExplore()},
          {t:'The Third\'s fire, in the dunes.', go:'b6_c5_fire'}]}),
    b6_c5_captain_shore:()=>({sp:'The captain', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_capShore = 1; }, txt:
`The captain is on the beach with his tablet, watching the lighters, and counting them, and writing the count down, and counting again.

"Two days," he says. "The 9th goes aboard in two days, by companies. Ours is the third transport from the point, the one with the patched foresail." He points with the stylus. "Until then the stores sit on the sand by the boats, and the coast villages know it. There were men at the stores last night. Tonight the Third has the boats." He looks at you. "Not a sack goes off this beach that the Fourteenth doesn't hand over."

Up the beach, a knot of officers on horseback is riding slowly along the waterline. One of them is the Fist. He is looking out at the empty sea past the transports, as if he were counting something out there that is not there yet.${b65Say({haddat:`\n\nHaddat follows the captain's eye to the riders, and away from them. "The Fist does not like the sea," she says. "Nor do I. That is the only thing we have in common."`, _:''})}`,
      ch:[{t:'"The Third has the boats, sir."', go:()=>startExplore()},
          {t:'"Two days, sir?"', go:'b6_c5_captain_shore_2'}]}),
    b6_c5_captain_shore_2:()=>({sp:'The captain', scene:'b6_kokakal', txt:
`"Two days." He writes something. "The Admiral's people say two days. The Fist says two days is a sailor's two days. The Adjunct keeps her own counsel." He shuts the tablet on the stylus. "So, two days."

He looks at the transports. "I've never been on a ship further than Malaz to Kan, Sergeant. I was sick the whole way." He seems to think that is useful information. "Tonight, the boats."`,
      ch:[{t:'"Sir."', go:()=>startExplore()}]}),
    b6_c5_captain_shore_again:()=>({sp:'The captain', scene:'b6_kokakal', again:()=> !S.f.b6_c5_boatsDone ? 'The captain, counting lighters. "Tonight, Sergeant. The boats."' : 'The captain, counting lighters.', txt: !S.f.b6_c5_boatsDone ?
`The captain is still counting lighters. "Tonight, Sergeant," he says. "The boats. I'll sleep better knowing it's the Third."` : S.f.b6_c5_survivors ?
`The captain is not counting anything. He is standing on the beach looking at the ones who walked in, and his tablet is shut. "I wrote them off," he says, to nobody. "I wrote them all off, by name."` :
`The captain has his tablet open and the stylus in his hand and is not writing. "The boats held," he says. "Good." He looks at the transports.`,
      ch:[{t:'Leave him.', go:()=>b65Away()}]}),
    b6_c5_surgeons:()=>({sp:'The surgeons\' tents', scene:'b6_kokakal', html:feverHTML(), fx:()=>{ S.f.b6_c5_surgeons = 1; }, again:()=>'The surgeons\' tents, and the smell of vinegar.', txt:
`The Fourteenth's surgeons have their tents in a hollow in the dunes, away from the lines, upwind of nothing. There is a queue outside them that does not get shorter. Inside, the smell is vinegar and smoke and boiled linen, and under that, the other smell.

A surgeon in a leather apron comes out, wiping her hands. She looks the squad over like a quartermaster checking a delivery.

"Fever?" she says. "Bring them in. Water, willow bark, a cold cloth and a day on a cot. It breaks, or it doesn't." She jerks her head at the back of the tent. "We've a Denul hand who'll open the warren for the worst of them. It costs her. The warren's sick too, this year. She comes out grey." She looks at your squad again. "Anyone shaking?"`,
      ch:[{t:'Bring in the ones with the fever.', req:()=>b6FeverList().length > 0, fx:()=>{ b65CureAll('the Fourteenth\'s surgeons, and a Denul hand who came out grey'); }, go:'b6_c5_surgeons_done'},
          {t:'"Nobody, today."', req:()=>!b6FeverList().length, go:()=>b65Away()},
          {t:'Not now.', go:()=>b65Away()}]}),
    b6_c5_surgeons_done:()=>({sp:'The surgeons\' tents', scene:'b6_kokakal', html:feverHTML(), txt:
`A day on a cot at the back of the surgeons' tent, under a cold cloth, with the vinegar smell and somebody groaning two cots down. Late in the night the Denul hand comes along the row with a lamp, a thin woman with grey in her face, and stops at the squad's cots, and puts her hand on each forehead for the space of a breath.

Something passes. It is not warm. It is like the moment a fever turns, when the sweat goes cold and the shaking stops and the body remembers it is a body.

In the morning the fever has broken. The Denul hand is asleep sitting up on an upturned bucket by the tent flap, and nobody wakes her.`,
      ch:[{t:'Back to the lines.', go:()=>b65Away()}]}),

    b6_c5_wickans:()=>({sp:'The Wickan horse lines', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_wickans = 1; }, txt:
`The Wickans have their horse lines at the north end of the 9th's stretch of beach, where the dunes give way to scrub. Hundreds of horses on long pickets, and the riders among them, combing manes, mending tack, saying very little.

They are mostly young. The old ones died with Coltaine. The young ones watched at Y'Ghatan, round the walls, for breakouts, while the city burned with the army inside it, and nothing broke out but smoke. Now they are on a beach waiting for ships.

A rider not much older than a boy is braiding a horse's tail, and looks up at the squad with a face that has decided to be hard about something.

"You were in the 9th," he says. "The reserve." He goes back to the braid. "Then you know. You stood and watched it too." He pulls the braid tight. "Temul says most of us will go home. He says the Crow clan has been denied its death." He spits in the sand. "We were promised a war. We were given a fire and a beach."${b65R({warlock:`\n\nHe sees Keth then, and stops. The grandmother looks out of Keth's eyes at him and says something in Wickan, short and very old, and the rider goes red to the ears and bows his head over the braid.`, orvas:`\n\nHe sees Orvas, and the black tears, and nods to him as one rider to another, which is more than he has given the squad.`})}${b65If('sathi', `\n\nSathi answers him in Wickan before you can, short and sharp, and touches the Weasel teeth at her throat. The rider looks at the teeth and shuts his mouth. "Crow," Sathi says to you, in Malazan, with a sniff. "They think they are the only clan that was there."`)}`,
      ch:[{t:'"How do you talk, down the line, at the gallop?" (Wickan Horse-Talk)', check:['wits', 17], trick:'b6_c5_horsetalk', req:()=>!S.f.b6_c5_horseTried, fx:()=>{ S.f.b6_c5_horseTried = 1; },
            edges:id=>[id === 'warlock' && ['Keth is Wickan', 3], id === 'sathi' && ['Sathi is Wickan', 3], id === 'orvas' && ['Orvas rides with the Wickans', 2], id === 'redblade' && ['Ramin is a horseman', 1], id === 'sgt' && ['you rode beside the Wickans on the Chain', 1]],
            go:'b6_c5_horsetalk_ok', fail:'b6_c5_horsetalk_no'},
          {t:'"You\'ll get a war. Everybody does."', go:'b6_c5_wickans_war'},
          {t:'Not now.', go:()=>b65Away()}]}),
    b6_c5_horsetalk_ok:()=>({sp:'The Wickan horse lines', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_horseOk = 1; }, txt:
`The rider looks at ${b65Nm(b65Who())} for a while. Then he puts down the braid.

He clicks his tongue twice, low, and a horse on the far picket lifts its head. He lays his hand flat on his thigh, then cups it, then flicks two fingers. Another rider, thirty paces off, who has not been looking, looks, and turns his horse's head, and walks it over, and stands it exactly where the fingers said.

"Like that," the rider says. "At the gallop, with arrows coming. You don't shout. Shouting is for Malazans." He makes ${b65Nm(b65Who())} do it, and do it again, and again, until the second rider stops laughing and starts nodding.

"Good," he says at last, grudging. "For a footman." He picks up the braid again. "Now you can talk to a horse. Find one that will listen."`,
      ch:[{t:'Back to the lines.', go:()=>b65Away()}]}),
    b6_c5_horsetalk_no:()=>({sp:'The Wickan horse lines', scene:'b6_kokakal', txt:
`The rider shows it, once: two clicks, a hand flat on the thigh, two fingers flicked. It looks like nothing at all. ${b65Who() === 'sgt' ? 'You try it, and a horse on the picket lays its ears back at you.' : `${NAME(b65Who())} tries it, and a horse on the picket lays its ears back.`}

"No," the rider says, and goes back to the braid. "You have to have been born on one. Never mind." It is not unkind. It is not kind either.`,
      ch:[{t:'Back to the lines.', go:()=>b65Away()}]}),
    b6_c5_wickans_war:()=>({sp:'The Wickan horse lines', scene:'b6_kokakal', txt:
`The rider stops braiding.

"Coltaine got a war," he says. "My father got a war. He is on the Aren Way." He goes back to the braid, carefully. "Maybe I will get one. Maybe it will be in a place with grass."${b65Say({haddat:`\n\nHaddat says, quietly, "Your father died well, rider. I saw the Wickans on the Chain."\n\nHe does not answer. But he nods, once, to the braid.`, _:''})}`,
      ch:[{t:'Back to the lines.', go:()=>b65Away()}]}),
    b6_c5_wickans_again:()=>({sp:'The Wickan horse lines', scene:'b6_kokakal', again:()=>'The Wickan horse lines, and the young riders saying nothing.', txt:
`The Wickans are at their pickets, combing and mending and not talking. The rider who braids is still braiding. ${S.f.b6_c5_horseOk ? 'He clicks his tongue at you as you pass, twice, low, and almost smiles.' : 'He goes on braiding.'}`,
      ch:[{t:'Back to the lines.', go:()=>b65Away()}]}),

    b6_c5_nokmate:()=>({sp:'The loading master', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_nokmate = 1; S.f.b6_c5_ship = 1; }, txt:
`The loading master is a squat sailor in a tarred coat, standing knee-deep in the surf with a lighter's line in one fist, shouting at the lighter. He shouts at it the way other men pray.

"Soldiers," he says, when he sees the squad, the word he uses for a squall. "You'll be ours in two days. Keep your boots on and your breakfast down and we'll get on." He hauls on the line. "And keep off the black ship."

He jerks his head along the coast, to the south, where one hull lies apart from the rest at anchor. It is low and dark and has no lanterns. "Towed in yesterday. Not one of ours. No crew anybody wants to talk about." He spits in the surf. "They've given it to a marine sergeant. I'd not take it for a gift. I'd not take it for a fleet."

The lighter fouls on something under the surf and swings, and the line goes taut in his fist and drags him a step.${b65Say({darrut:`\n\nDarrut looks at the black ship and makes the sign the Aren Guard makes against bad luck, which is mostly rude.`, _:''})}`,
      ch:[{t:'Take a turn on the line with him. (a fouled lighter, the surf pulling)', check:['might', 15], req:()=>!S.f.b6_c5_rope,
            edges:id=>[(id === 'haddat' || id === 'darrut' || id === 'hessa') && ['a big back', 1], id === 'tallow' && ['Tallow grew up hauling boats', 2]],
            near:{t:()=>`Yes, but the line runs a hand's breadth through ${b65Nm(b65Who())}${b65Who() === 'sgt' ? 'r' : '\'s'} palms before it holds, and takes the skin with it. ${3 + lvT()} health down at the start of the next fight.`, fx:()=>bruise(b65Who(), 3 + lvT())},
            fx:()=>{ S.f.b6_c5_rope = 1; }, go:'b6_c5_rope_ok', fail:'b6_c5_rope_no'},
          {t:'Leave him to his lighter.', go:()=>b65Away()}]}),
    b6_c5_rope_ok:()=>({sp:'The loading master', scene:'b6_kokakal', fx:()=>{ if (!S.f.b6_c5_ropeGot) { S.f.b6_c5_ropeGot = 1; gain('b6_c5_nokrope'); } }, txt:
`${b65Who() === 'sgt' ? 'You get' : NAME(b65Who()) + ' gets'} a grip on the line behind him, and leans, and the lighter comes off whatever it was fouled on with a lurch and runs in on the next wave as sweet as a cart on a road.

The loading master looks at the line, and at the squad, and grunts. He takes a knife to the frayed end of it, an arm's length, and whips both ends with twine from his pocket in a few turns, quick as a woman knitting, and tosses it over.

"For the pull," he says. "Admiral's rope. Don't tell the Admiral." He is already shouting at the next lighter.`,
      ch:[{t:'Back up the beach.', go:()=>b65Away()}]}),
    b6_c5_rope_no:()=>({sp:'The loading master', scene:'b6_kokakal', txt:
`The surf picks the lighter up and drops it, and the line tears out of everyone's hands at once, and the loading master goes in to the chest after it, swearing, and comes up with it, still swearing.

"Soldiers," he says again, dripping, in a different tone. He does not ask for help a second time.`,
      ch:[{t:'Back up the beach.', go:()=>b65Away()}]}),

    /* ---- the Third's fire in the dunes (the games pass wraps this node: keep the id) ---- */
    b6_c5_fire:()=>({sp:'The Third\'s fire', scene:'b6_kokakal', html:feverHTML(), fx:()=>{ S.f.b6_c5_ph = Math.max(2, b65Ph()); },
      again:()=> !S.f.b6_c5_boatsDone ? 'The Third\'s fire in the dunes, and the surf below.' : !b65Key() ? 'The Third\'s fire in the dunes. There is talk going along the beach, fire to fire.' : 'The Third\'s fire in the dunes, burning low.', txt:
`The Third's fire is in a hollow in the dunes above the beach, out of the wind off the sea, made of driftwood that burns blue at the edges from the salt. Below, the surf comes in and goes out, and comes in, and does not stop, and the transports ride at anchor beyond it with their lanterns lit.

Behind the dunes is Seven Cities, and the plague. In front of the fire is the sea. The squad sits with its back to one and its face to the other, and does not talk about either.${b6FeverList().length ? `\n\n${b6FeverList().map(id => id === 'sgt' ? 'You are' : NAME(id) + ' is').join(' and ')} wrapped in a cloak by the fire, sweating and shaking at once.` : ''}${b65If('mehet', `\n\nMehet sits on the seaward side of the fire, facing the water, with the ring of keys in his lap. He turns them over, one after another, as if he were trying each in a lock.`)}${b65Say({tallow:`\n\nTallow has his grandmother's deck in his lap in its oilcloth, and his hand on it, and is watching the ships.`, tangle:`\n\nTangle has the satchel on his knees with the flap open, and is wiping each clay egg dry of the sea air with a rag, one at a time.`, _:''})}`,
      ch:[b6DeckChoice(5),
          {t:'Sit an hour. Let the squad rest.', req:()=>!S.f.b6_c5_rest, fx:()=>{ S.f.b6_c5_rest = 1; rest('The squad sits an hour in the hollow in the dunes, out of the wind, with the surf going. Wounds close, mostly.'); }, go:'b6_c5_fire_rest'},
          {t:'Talk with the squad.', go:'b6_c5_fire_talk'},
          {t:`${HEALER() ? NAME(HEALER()) : 'The healer'} sees to the fever.`, req:()=>b6FeverList().length > 0 && b6CanCure() && !!HEALER(), go:'b6_c5_fire_cure'},
          {t:'Walk down to the water with Mehet.', req:()=>b6In('mehet') && !S.f.b6_c5_mehet, go:'b6_c5_mehet'},
          {t:'The boats, tonight.', req:()=>!!S.f.b6_c5_capShore && !S.f.b6_c5_boatsDone, onward:true, go:'b6_c5_boatline'},
          {t:'The talk along the beach.', req:()=>!!S.f.b6_c5_boatsDone && !b65Key(), onward:true, go:'b6_c5_word'},
          {t:'Sleep. Morning.', req:()=>!!b65Key() && !S.f.b6_c5_survivors, onward:true, go:'b6_c5_morning'},
          {t:'Down to the boats, and the transport.', req:()=>!!S.f.b6_c5_survivors, onward:true, go:'b6_c5_last'},
          {t:'Find the captain first.', req:()=>!S.f.b6_c5_capShore, go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_fire_rest:()=>({sp:'The Third\'s fire', scene:'b6_kokakal', txt:
`An hour, then, in the hollow in the dunes, with the surf going and the salt in the fire.

${b65Say({marrow:`Marrow goes round the squad with her hands, the way she always has, and stops at the second of them and frowns. "The warren's sick, child," she says. "Like water with something dead in it upstream. It still heals. I don't like the taste of it."`, mirrel:`Mirrel goes round the squad with her bag and her hands, and stops halfway and wipes her palms on her trousers. "Warren's got something in it this year," she says. "Like grit. Like something worse than grit." She goes on anyway.`, _:'Some of them sleep. The rest listen to the sea.'})}${b65If('haddat', `\n\nHaddat sleeps sitting up against the blue shield, facing the water.`)}${b65If('tebbet', `\n\nTebbet unstrings his bow against the damp and wraps the string in oilcloth, and wraps the oilcloth in his shirt, and sleeps on it.`)}${b65If('yorin', `\n\nYorin opens his warren once, only to look, and shuts it again at once and wipes his hands on the sand. "Sick," he says. "The whole sky in there. Like a fever on it." He lies down with his back to the sea.`)}${b65If('rasp', `\n\nRasp sleeps with her arm across the satchel and snores like a cart on cobbles.`)}${b65If('mehet', `\n\nMehet does not sleep. He sits facing the water with his keys in his lap until the fire is coals.`)}`,
      ch:[{t:'Back to the fire.', go:'b6_c5_fire'}]}),
    b6_c5_fire_cure:()=>{ const h = HEALER();
      return {sp:'The Third\'s fire', scene:'b6_kokakal', html:feverHTML(), fx:()=>{ if (b6FeverList().length) { b65CureAll(`${h ? NAME(h) : 'the healer'}, at the fire`); if (h) b65Rattle(h); } }, txt:
`${h === 'marrow' ? `Marrow kneels by the fevered with her hands out, and shuts her eyes, and reaches. Her face changes. "Child," she says, through her teeth, "this is like putting your hand in a ditch." She keeps it there.` : h === 'mirrel' ? `Mirrel kneels by the fevered with the bag open and her hands out, and opens the warren, and her face goes tight. "Like a well with a dead thing in it," she says. "Don't talk to me." She keeps her hands where they are.` : 'The healer kneels by the fevered and reaches into the warren, and the warren is sick, and the healer reaches anyway.'}

It takes a long time. The fire burns down and somebody builds it up again. Then the shaking stops, and the sweat goes cold, and the fevered sleep, properly, for the first time in days.

${h ? `${NAME(h)} sits back on ${h === 'sgt' ? 'your' : 'her'} heels grey to the lips and does not get up for a while. Rattled: −1 on the next check.` : ''}`,
        ch:[{t:'Back to the fire.', go:'b6_c5_fire'}]}; },
    b6_c5_fire_talk:()=>{ const ln = [];
      if (b6In('haddat')) ln.push(`Haddat is cleaning the blue shield with sand, slowly, the way she does when she is thinking. "Hissar is behind us," she says. "And Aren, and Raraku, and that city." She works the sand round the rim. "I was born in Seven Cities, Sergeant. I am going to be the first of my mother's people to leave it on a ship." She looks at the sea. "I thought I would mind more. I mind enough."`);
      if (b6In('sathi')) ln.push(`Sathi has her chin on her knees and is watching the Wickan horses along the beach. "They'll put the horses on the ships too," she says. "I asked. In slings." She shudders. "I'd walk."`);
      if (b6In('tangle')) ln.push(`Tangle has the satchel closed now, both arms round it. "Salt air," he says, "gets into the clay. Swells it. A sharper that's swelled is a sharper with ideas." He counts by feel. "${numw((S.inv && S.inv.sharper) || 0, true)}. All dry. For now."`);
      if (b6In('marrow')) ln.push(`Marrow has her knotted string out and is not tying it. "I came over from Nap on a ship like those," she says. "Twelve years ago, child. I was sick the whole way and swore I'd die in Seven Cities rather than do it again." She looks at the transports. "Well. I nearly kept that one."`);
      if (b6In('mirrel')) ln.push(`Mirrel is measuring water into the cups herself, boiled twice, and will not be argued with. "On the ship," she says, "the fever will go through the hold like fire through straw, if it's aboard. So it won't be aboard." She hands you a cup. "Not on my squad."`);
      if (b6In('tallow')) ln.push(`Tallow has the deck out and is holding it, not reading it. "My grandmother said Mael listens to fishermen, a bit, and to soldiers never," he says. "She said never sail on a day you've dreamed of fish." He thinks. "I haven't dreamed of anything since the fire."`);
      if (b6In('hessa')) ln.push(`Hessa is sitting very straight with the spear upright beside her. "The Worm's priests were the healers of Seven Cities," she says. "The sailors say they were found dead in their temples, all along the coast. Before the plague came." She looks at the fire. "Someone wanted the healers out of the way first. I would like to know who. I would like very much to know."`);
      if (b6In('tebbet')) ln.push(`Tebbet has unstrung his bow and is wiping the string. "Ships," he says. "No range on a ship. Everything's close." He looks at the transports. "I'll learn." He goes back to the string.`);
      if (b6In('darrut')) ln.push(`Darrut has his feet to the fire and his helm on his knee. "When I was on the wall at Aren," he says, "I used to watch the ships come in from Quon. I thought, there goes somebody else's war." He turns the helm. "Now it's mine. Going the other way."`);
      if (b6In('yorin')) ln.push(`Yorin sits with his back to the sea, on purpose. "Serc is the sky," he says. "Over the sea there's more sky than anywhere. I should be happy." He rubs his arms. "It's sick in there, Sergeant. All of it. I don't want to borrow anything from it till it's well."`);
      if (b6In('rasp')) ln.push(`Rasp has the satchel open on her knees and is going through it by feel, one clay egg at a time. "Sea air," she says, hoarse. "Puts a sweat on the clay." She wraps another in a fresh rag. "${numw((S.inv && S.inv.sharper) || 0, true)} sharper${((S.inv && S.inv.sharper) || 0) === 1 ? '' : 's'}. Dry by morning. Don't help."`);
      if (b6In('mehet')) ln.push(`Mehet is turning his keys over in his lap. "My father's house," he says, holding one up. "The kiln shed. My aunt's door, in the street of the dyers." He puts them back on the ring. "The doors are ash. The keys still work." He looks at the sea. "I thought I would stay in Seven Cities and be a potter again, somewhere. Lothal. Anywhere." He shrugs. "Then I thought, who would I make pots for? So I am going over the sea with the people who burned my city." He says it without bitterness, which is worse.`);
      if (b6In('orvas')) ln.push(`Orvas is mending a strap by the firelight. "The Burned Tears will put their horses on the ships," he says. "Gall says so. Gall says a great many things now he did not used to." He pulls the strap tight. "I will go where the herd goes. The herd is going on ships. So." He does not finish.`);
      if (b6In('redblade')) ln.push(`Ramin is scraping salt off his scale with a thumbnail. "My father would spit to see me on an Imperial ship," he says. "Or he would be proud. With my father it was always one or the other, and you did not know which until he had done it."`);
      if (b6In('warlock')) ln.push(`Keth sits facing the Wickan horse lines. "*They are ashamed,*" the grandmother says. "*Good. Shame is a teacher.*" Keth, his own voice, low: "They are going home. Some of them." A pause. "I am not."`);
      return {sp:'The Third\'s fire', scene:'b6_kokakal', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and the sea does the talking.`,
        ch:[{t:'Back to the fire.', go:'b6_c5_fire'}]}; },
    b6_c5_mehet:()=>({sp:'Mehet', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_mehet = 1; b65L('mehet', 1); }, txt:
`Mehet walks down to the water with you in the dark, and stops where the sand goes wet, as he did the first day.

"In Y'Ghatan," he says, "water was the most precious thing in the city. The cisterns. The wells. My grandfather knew every one, and his father before him." He watches a wave come up the sand and go back. "And here is more water than all the cisterns of Seven Cities, and it is no good to anyone. You cannot drink it." He laughs, once. "My grandfather would have been very angry."

He takes the ring of keys off his belt and holds it out over the water, and for a moment you think he is going to throw it in.

He does not. He puts it back on his belt.

"Not yet," he says. "Maybe on the other side." He looks at you. "Is there another side, Sergeant? Truly? The camp says Quon Tali. I have only heard of it in stories. In the stories it is where the Malazans come from, and everything they come from is bad." He considers it. "I would like to see it for myself."`,
      ch:[{t:'"There\'s another side. It\'s not so bad."', fx:()=>{ S.f.b6_c5_mehetSaid = 'kind'; }, go:'b6_c5_fire'},
          {t:'"There\'s another side. Some of the stories are true."', fx:()=>{ S.f.b6_c5_mehetSaid = 'true'; b65L('mehet', 1); }, go:'b6_c5_fire'}]}),

    /* ---- the boats at night (main fight) ---- */
    b6_c5_boatline:()=>({sp:'The boats', scene:'b6_kokakal', again:()=> S.f.b6_c5_boatsDone ? 'The boats at the waterline, and the stores beside them.' : 'The boats at the waterline, and the dark coming down.', txt: S.f.b6_c5_boatsDone ?
`The boats are drawn up at the waterline with the stores beside them under canvas, every sack and barrel counted twice. A sentry of the 9th walks up and down past them and nods to the Third each time he passes.` : !S.f.b6_c5_capShore ?
`The boats are drawn up at the waterline, the lighters coming and going through the surf beside them, the stores in heaps under canvas. A sentry of the 9th walks past. The captain will want the Third for something tonight; he is up the beach.` :
`Night on the beach. The boats are drawn up at the waterline in a row, and the stores beside them under canvas, sacks and barrels and the company's chests, waiting for the morning lighters. One sentry of the 9th walks up and down the row with a spear and a lantern, and you can see him from a mile off, which is the point of a lantern and the trouble with it.

Out on the dark water the transports' lanterns ride and rock. Up the beach the camp's fires go down one by one.

At the far end of the row, past the last boat, something moves on the wet sand. Then two somethings. Then they stop moving, which is worse.${b65Say({tebbet:`\n\nTebbet has an arrow on the string already. "Five," he says, very low. "Maybe more, in the water."`, _:''})}`,
      ch:[{t:'"Leave the stores." Shields.', req:()=>!!S.f.b6_c5_capShore && !S.f.b6_c5_boatsDone, go:()=>startBattle('b6_c5_boats', {})},
          {t:`${b65SapN()} puts a burner on the wet sand short of the stores.`, tag:'uses 1 burner', req:()=>!!S.f.b6_c5_capShore && !S.f.b6_c5_boatsDone && !!b65Sap() && ((S.inv && S.inv.burner) || 0) > 0, fx:()=>{ S.inv.burner--; }, go:()=>startBattle('b6_c5_boats', {pre:true, mun:'burner'})},
          {t:'Douse the sentry\'s lantern and wait for them in the dark. (the boats for cover)', check:['wits', 16], req:()=>!!S.f.b6_c5_capShore && !S.f.b6_c5_boatsDone,
            edges:id=>[id === 'tebbet' && ['Tebbet sees in the dark', 2], id === 'tallow' && ['Tallow is a skirmisher', 1], id === 'mehet' && ['Mehet knows how thieves come at night', 1]],
            near:{t:'Yes, but the sentry fumbles the lantern and it goes over and rolls, still lit, and the looters see it and come on anyway, faster.'},
            go:()=>startBattle('b6_c5_boats', nearMiss() ? {} : {surprise:'p'}), fail:'b6_c5_boats_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_boats_seen:()=>({sp:'The boats', scene:'b6_kokakal', txt:
`The sentry's lantern goes out, and in the sudden dark somebody in the squad treads on a boat's painter and the boat grinds on the sand, loud as a door.

The shapes at the end of the row stop pretending to be shapes and come on at a run.`,
      ch:[{t:'Shields.', go:()=>startBattle('b6_c5_boats', {surprise:'e'})}]}),
    b6_c5_boats_after:()=>({sp:'The boats', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_boatsDone = 1; }, txt:
`The ones still standing go back into the dark along the waterline, splashing, and are gone. The boat they had half off the sand rocks in the shallows with the company's sacks in it, wet to the gunwales.

The sentry of the 9th relights his lantern with shaking hands. "Thought I was dead," he says. "Thought I was dead three times." He looks at the squad. "Thanks."

The squad drags the boat back up the sand and puts the sacks back under the canvas and counts them. One is missing. What was in it, the squad will never know.${b65Say({haddat:`\n\nHaddat stands in the shallows a while after the rest have come out, with the water round her knees and her shield on her arm, looking out at the transports.`, _:''})}`,
      ch:[{t:'Back to the fire.', go:()=>{ startExplore('b6_c5_shore'); talk('b6_c5_fire'); }}]}),

    /* ---- the word along the beach, and the key ---- */
    b6_c5_word:()=>({sp:'The talk along the beach', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_word = 1; }, again:()=>'The talk along the beach, fire to fire.', txt:
`It comes along the beach after midnight, fire to fire, the way talk does in an army: a sergeant of the 8th stopping at the 9th's fires on his way back from somewhere, and stopping at the Third's because it is still lit.

"Fist Keneb's pulled his companies off the ships," he says, squatting by the fire with his hands out. "For a day. The ones already aboard came off again, gear and all. The sailors are spitting." He rubs his hands. "There's a boy in his household. Little, strange. The boy said if we sail in two days, we drown two days past Sepik." He shrugs. "Keneb listened. Keneb's a careful man. So the 8th sits on the sand another day."

He gets up. "I don't know what Sepik is," he says. "Some island. I'd as soon not find out by drowning near it." He goes on along the beach to the next fire.${b65Say({tallow:`\n\nTallow has gone white. "A boy," he says. "My grandmother would have listened to a boy like that. She always listened to the strange ones."`, darrut:`\n\n"A boy," Darrut says. "We're putting off an army's sailing for a boy." He thinks about it. "The Fist won't."`, _:''})}`,
      ch:[{t:'Go and find the captain.', onward:true, go:'b6_c5_key'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_key:()=>({sp:'The captain', scene:'b6_kokakal', again:()=>'The captain, with his tablet, and a choice.', txt: b65Key() ?
`The captain has the Third written down already. ${b65Key() === 'wait' ? '"The last boat, Sergeant. Tomorrow."' : '"Aboard at first light, Sergeant."'}` :
`The captain is awake, of course. He is sitting on a chest by the company's stores with his tablet on his knee and a lamp beside him.

"You've heard," he says. "Everybody's heard. The 8th is sitting on the sand another day." He taps the tablet. "The 9th is not the 8th. The 9th goes aboard at first light, by companies, as ordered. Ours goes third, the transport with the patched foresail." He looks at you. "Except that somebody has to stay with the company's last boat and the stores till the end. A day, maybe. There is always a squad last off a beach."

He does not say *on a boy's word*. He does not have to. "I'll write down whichever you tell me, Sergeant," he says. "The last boat, or aboard with the rest. Both are orders. I've given both."${b65Say({tallow:`\n\nTallow, behind you, very quietly: "Sergeant. The boy."`, tebbet:`\n\nTebbet, behind you: "Orders say first light."`, _:''})}${b65If('mehet', `\n\nMehet is looking at the sea. His hand is on the keys.`)}`,
      ch:[{t:'"The Third will stay with the last boat, sir."', req:()=>!b65Key(), fx:()=>{ S.f.b6_c5_key = 'wait'; b65L('tallow', 1); b65L('mehet', 1); b65L('marrow', 1); b65L('tebbet', -1); }, go:'b6_c5_wait'},
          {t:'"The Third goes aboard with the company, sir. As ordered."', req:()=>!b65Key(), fx:()=>{ S.f.b6_c5_key = 'sail'; b65L('tebbet', 1); b65L('darrut', 1); b65L('tallow', -1); }, go:'b6_c5_sail'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b6_c5_wait:()=>({sp:'The captain', scene:'b6_kokakal', txt:
`"The last boat." He writes it. "The Third, with the stores and the company's last boat, till the end." He looks up. "I'll tell the Fist it's how the company loads. Last off is always a squad." He shuts the tablet. "It is, too."

At first light the company goes aboard without you, filing down the sand to the lighters with its kit on its back and its eyes on the water, and the transport with the patched foresail takes them up its side one by one. The Third stands by the last boat with the stores and watches them go.

It is a long day on the sand. There is not much to do on it but wait.${b65Say({tallow:`\n\nTallow sits on the last boat's gunwale with his deck in its oilcloth on his knee. "Thank you," he says, to nobody in particular, and then, to the sea: "Thank you."`, mehet:`\n\nMehet sits on the dry sand above the waterline, and does not look as if he minds waiting at all.`, _:''})}`,
      ch:[{t:'The day.', onward:true, go:'b6_c5_morning'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b6_c5_sail:()=>({sp:'The captain', scene:'b6_kokakal', txt:
`"Aboard, then." He writes it. "First light, with the company. Third transport, patched foresail." He shuts the tablet. "I'll find another squad for the last boat. There's always another squad."

At first light the Third goes down the sand to the lighters with the company, its kit on its back and its eyes on the water, and the lighter takes it out through the surf, wet to the knees, and the transport with the patched foresail takes it up its side on a net.

The deck moves. It goes on moving. The Third finds a place by the rail out of the sailors' way and sits on its packs, and the beach is a long way off already, and very small.${b65Say({tebbet:`\n\nTebbet looks at the beach from the rail. "Orders," he says. Then: "I don't like this deck."`, darrut:`\n\nDarrut finds the mast and puts his back to it and does not move from it.`, _:''})}${b65If('mehet', `\n\nMehet holds the rail with both hands. His face is grey. "It moves," he says. "They did not tell me it moves."`)}`,
      ch:[{t:'The day, at the rail.', onward:true, go:()=>{ S.f.b6_c5_ph = 3; talk('b6_c5_morning'); }},
          {t:'Not now.', go:()=>{ S.f.b6_c5_ph = 3; talk('b6_c5_aboard'); }}]}),
    /* aboard at anchor (sail): the hub for the day at the rail */
    b6_c5_aboard:()=>({sp:'Aboard the transport', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_ph = 3; }, again:()=>'The transport at anchor, the deck moving, the beach small.', txt:
`The transport rides at anchor with the company aboard, and the deck moves under everybody's feet, and goes on moving. Sailors walk round the soldiers as if they were cargo, which they are. The beach is a long line of sand with an army on it, a long way off.${b65If('mehet', ' Mehet is at the rail, holding it.')}`,
      ch:[{t:'The rail.', onward:true, go:()=>talk(S.f.b6_c5_survivors ? (S.f.b6_c5_boneSaid ? 'b6_c5_last' : 'b6_c5_bone') : 'b6_c5_morning')},
          {t:'Sit on the packs a while out of the sailors\' way.', go:'b6_c5_aboard_sit'}]}),
    b6_c5_aboard_sit:()=>({sp:'Aboard the transport', scene:'b6_kokakal', txt:
`The squad sits on its packs by the foremast out of the sailors' way and watches the beach, and the lighters, and the sky. The squad is not sick yet. It does not say *yet* out loud.`,
      ch:[{t:'Back to the rail.', go:'b6_c5_aboard'}]}),

    /* ---- the walk-in, and the bone ---- */
    b6_c5_morning:()=>({sp:b65Key() === 'sail' ? 'At the rail' : 'The Kokakal shore', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_ph = 3; }, again:()=>'The day, and the shout along the beach.', txt:
`${b65Key() === 'sail' ? `Late in the day, from the rail, you see it begin: a stir at the southern end of the beach, where the dunes give way to the desert, and then the stir running north along the camp like a wind through grass.` : `Late in the day, at the southern end of the beach where the dunes give way to the desert, somebody shouts. Then somebody else. Then the shout is running north along the camp like a wind through grass, and the Third is on its feet by the last boat with every head on the beach turned south.`}

Figures are coming in out of the desert. On foot. A file of them, ragged, burned brown, walking the way soldiers walk at the end of a long march: not fast, not stopping.

Malazans. Marines, by what is left of the kit.

The marines the army counted dead under Y'Ghatan. The ones who went in first at the breach and were inside when it went up, and did not come out by the girl's way, and were written off by name.`,
      ch:[{t:b65Key() === 'sail' ? 'Watch from the rail.' : 'Go down the beach with everybody else.', onward:true, go:'b6_c5_survivors'},
          {t:'Not now.', go:()=>b65Away()}]}),
    b6_c5_survivors:()=>{ const fallen = b65Fallen3(), look = b65In3() && fallen.length ? fallen[0] : null;
      return {sp:b65Key() === 'sail' ? 'At the rail' : 'The Kokakal shore', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_survivors = 1; if (look) S.f.b6_c5_missing = look; }, txt:
`${b65Key() === 'sail' ? `From the rail you can see the Fourteenth go down the beach to meet them: not in ranks, not by legions, just going, the whole army at once, until the file walking in out of the desert disappears into it. The shouting carries across the water. On the transport, the company stands at the rail and does not shout. It watches.` : `The Fourteenth goes down the beach to meet them. Not in ranks, not by legions. Just going, the whole army at once, at a walk and then at a run, until the file coming in out of the desert disappears into it and you cannot see them for the soldiers round them.`}

There are not many. More than anybody thought. They came out from under the city, the camp will say by evening, through the old ways under the ruins, and walked the Sotka road after an army that had already buried them.

Some of them are carrying others. The camp will tell the rest by evening, and get most of it wrong.${look ? `\n\n${b65Key() === 'sail' ? 'At the rail' : 'In the crowd'}, the squad looks for ${NAME(look)}. Each face, as it comes clear. It is a foolish thing to look for, and everybody in the squad does it anyway.\n\n${NAME(look)} is not among them.` : ''}`,
        ch:[{t:b65Key() === 'sail' ? 'Stay at the rail.' : 'Back toward the last boat.', onward:true, go:'b6_c5_bone'},
            {t:'Not now.', go:()=>b65Away()}]}; },
    b6_c5_bone:()=>({sp:'A heavy of the 10th', scene:'b6_kokakal', fx:()=>{ S.f.b6_c5_boneSaid = 1; }, again:()=>'The heavy of the 10th, and his handful of bones.', txt:
`${b65Key() === 'sail' ? 'Toward evening a lighter comes out to the transport with the last of the company\'s gear, and a heavy of the 10th comes up the side with it' : 'Toward evening a heavy of the 10th comes along the beach to the Third\'s boat'}: a big man with his arms wrapped to the elbow and the skin of his face shiny and new down one side. He came out through the fire, by the girl's way. Everybody who came out that way has that skin somewhere.

There is a finger bone on a thong round his neck.

"They brought them in," he says, meaning the marines. "Bones. Off the dead under the city, out of the old pits. They wear them." He opens his hand. There are bones in it, small, bored through, with thongs. "We've taken it up, us that came out through the fire. Some of the 8th have too. By tomorrow it'll be half the army." He holds them out. "${b65In3() ? 'You went in. The 9th went in, to hold the way. I saw you there.' : 'You held the gate. You pulled me out of the smoke, or somebody did who looked like you.'} You should have them."

He does not explain what they are for. He does not seem to know. He just holds them out.${b65Bury() ? `\n\n"And you put the old ones back," he says. "At the barrows, before. I heard." He nods. "That counts for something."` : ''}`,
      ch:[{t:'Take them.', req:()=>!S.f.b6_bone && !S.f.b6_c5_boneNo, fx:()=>{ S.f.b6_bone = 1; if (!S.f.b6_c5_boneGot) { S.f.b6_c5_boneGot = 1; gain('b6_c5_fingerbone'); } b65L('haddat', 1); b65L('tangle', 1); b65L('tallow', 1); }, go:'b6_c5_bone_take'},
          {t:'"Not yet. We didn\'t earn them."', req:()=>!S.f.b6_bone && !S.f.b6_c5_boneNo, fx:()=>{ S.f.b6_c5_boneNo = 1; }, go:'b6_c5_bone_no'},
          {t:'Not now.', go:()=>b65Away()}]}),
    b6_c5_bone_take:()=>({sp:'A heavy of the 10th', scene:'b6_kokakal', txt:
`You take them. One for each of the Third, and one over, which the heavy waves away when you hold it out. "For whoever comes next," he says, and goes ${b65Key() === 'sail' ? 'down the side to his lighter' : 'back along the beach'}.

The squad puts them on. It does not make a ceremony of it. The Fourteenth has not made a ceremony of anything since Y'Ghatan.${b65Say({haddat:`\n\nHaddat ties hers round her wrist, not her neck, and looks at it a while, and pulls the sleeve down over it.`, _:''})}${b65Say({tangle:`\n\nTangle puts his on and counts it, once. "One," he says.`, tallow:`\n\nTallow already wears one, from the old graveyard at Aren. He hangs the new one beside it, and touches both to the deck in his shirt, quickly, as if introducing them.`, _:''})}${b65If('mehet', `\n\nMehet holds his in his palm and turns it over. "A Y'Ghatan bone," he says. "From under my city." He hangs it on the ring with his keys.`)}`,
      ch:[{t:b65Key() === 'sail' ? 'Back to the rail.' : 'Back to the last boat.', go:'b6_c5_last'}]}),
    b6_c5_bone_no:()=>({sp:'A heavy of the 10th', scene:'b6_kokakal', txt:
`The heavy looks at you a while, and closes his hand. "Fair," he says. "There'll be more of them. There's always more bones." He goes ${b65Key() === 'sail' ? 'down the side to his lighter' : 'back along the beach'}, and you see him stop at the next fire, and open his hand again.`,
      ch:[{t:b65Key() === 'sail' ? 'Back to the rail.' : 'Back to the last boat.', go:'b6_c5_last'}]}),

    /* ---- the end of the chapter ---- */
    b6_c5_last:()=>{ const k = b65Key() || 'sail';
      return {sp:k === 'sail' ? 'At the rail' : 'The last boat', scene:'b6_kokakal', again:()=>'The transports, and the evening coming on.', txt:
`${k === 'sail' ? `Evening on the transport. The beach is crowded and loud and lit with more fires than last night, and out here on the water the company sits by the rail with its packs and listens to it come across the water.` : `Evening on the beach. The last of the stores goes out to the transport with the patched foresail in the company's last boat, with the Third in it, wet to the knees, and the transport takes it up its side on a net.`}

Somewhere out past the transports the sea goes on to the edge of the world. Somewhere over it, they say, is Quon Tali.

${b65Say({haddat:`Haddat stands at the rail with her face to the open water, away from Seven Cities. Then she turns, once, and looks.`, marrow:`Marrow sits on her pack with her back to the land. "Child," she says, "wake me when it's over." She does not sleep.`, _:'The squad sits on its packs by the rail and watches the coast go dark.'})}${b6In('tallow') ? `\n\nTallow has his grandmother's deck out, and puts it away, and takes it out again.` : ''}${b65If('mehet', `\n\nMehet holds the rail with both hands and watches Seven Cities. "Goodbye," he says, in his own tongue, and then, in Malazan, so the squad will hear it: "Goodbye."`)}${S.f.b6_bone ? '\n\nThe finger bones click against the squad\'s mail when the deck moves.' : ''}`,
        ch:[{t:'To the sea.', onward:true, go:()=>chapterEnd(5, k)},
            {t:'Not yet.', go:()=>b65Away()}]}; },
  },
};
