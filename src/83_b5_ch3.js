/* ============ Book Five, Chapter 3: Kraig's Landing ============ */
/* Kraig's Landing, three buildings and a dock up the river from Trate, near the Edur border (Midnight Tides ch 13-15; mt-canon §1.3,
   §17c). A regiment is camped round it (the Cold Clay Battalion), with the Snakebelt Battalion's mage cadre come up from Awl, and ships at
   the dock fly the King's banner and the Ceda's. The Sixth Company guards the regiment's barges. Phase 1, the first evening: the news (the
   war, the council in Letheras as barracks talk, the Whitefinders recalled north, a Letherii who went over), the Faraed scouts' fire
   (Ruuk, the recruit, and the trader's man who takes a cut of his pay), a young cadre mage on the dock (the trick), the Nerek haulers,
   and the first night on the barges: river thieves cutting them loose (b5_c3_rivermen, the main fight; stage2 the drifting barge).
   Phase 2, the next day: two regiment men who walked off, at the scouts' fire (b5_c3_deserters, optional), and at evening what the
   mages mean to do, and that there are Nerek in the villages. The key, S.f.b5_c3_key: 'watch' (stay at the barges as ordered; the fire,
   the cheering, and drunk soldiers on the Nerek haulers, b5_c3_cheer) or 'warn' (a runner up the bank, too late; the squad goes after
   him, and something on the far bank is watching too, b5_c3_bank; the regiment notes the Sixth and fines the sergeant). Phase 3, dawn:
   ash on the dock, Fent Reach's surrender as news, and the road to High Fort. Never the ritual circle, the tavern or Buruk's barge;
   never a named mage, Seren, Buruk, Hull or any Edur; the river is never named. Notes for later chapters: docs/mt-ch3-notes.md. */
/* FOR THE ARTIST (83b): names this file uses.
   Items: ART['item/b5_c3_cadretile'], ['item/b5_c3_spear'], ['item/b5_c3_ash'].
   Figures: b5_c3_riverman, b5_c3_pole, b5_c3_riverboss, b5_c3_drunk, b5_c3_nerek, b5_c3_faraed, b5_c3_cadremage, b5_c3_trader. Reused:
   b5_c1_ennic, b5_c1_clerk, b5_c1_tilewoman, b5_letherii (the quartermaster, the regiment), ruuk, b5_wraith, b5_unblooded, b5_deserter.
   Backdrops (SCENEX): b5_landing (80's, redrawn), b5_c3_greenfire, b5_c3_tents, b5_c3_collapse.
   Ground (TILEX): b5_c3_dock (. trampled earth , mud # building wall = tent d dock planking ~ river F fire S the scouts' fire T the rise
   B the barges), b5_c3_barges (. barge deck ~ water - gangplank c cargo r rope coil ^ up to the dock), b5_c3_bank (. path , reeds
   ~ river # rock x dead tree ^ where the path gives out v back down). In fights 't' is cover (cargo, crates, reeds) and 'o' is the river. */

/* ---- small helpers (b53: Book Five, Chapter Three) ---- */
const b53L = (id, n) => { if (b5In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b53Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b5In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b53If = (id, s) => b5In(id) ? (typeof s === 'function' ? s() : s) : '';
const b53Who = () => (ROLL() && ROLL().who) || 'sgt';
const b53Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b53Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b53V = (id, you, they) => id === 'sgt' ? you : they;
const b53Ph = () => S.f.b5_c3_ph || 1;
const b53Key = () => S.f.b5_c3_key || null;
const b53KeyDone = () => !!(S.f.b5_c3_cheerDone || S.f.b5_c3_bankDone);
const b53Docks = (n, why) => { S.silver = (S.silver || 0) + n; updSilver(); note(`+${n} docks: ${why}.`, 'good'); };
const b53Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b53Here = () => S.squad.filter(id => id !== 'sgt' && b5In(id));
const b53And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* Ruuk walks with the squad, or waits with the scouts */
const b53Ruuk = () => b5In('ruuk') || b5Waiting('ruuk');
/* the runner on 'warn': Ruuk if he walks, else Tobet (the brief) */
const b53Runner = () => { const r = S.f.b5_c3_runner; return r === 'ruuk' || r === 'tobet' ? r : (b5In('ruuk') ? 'ruuk' : 'tobet'); };
/* "stay with the scouts for now": what b5Join does when there is no room, done on purpose */
const b53Wait = () => { S.f.b5_ruukDone = 2; S.camp = [...(S.camp || []).filter(x => x !== 'ruuk'), 'ruuk']; b5DebtInit('ruuk'); S.loy.ruuk ??= 0; S.picks.ruuk ??= []; S.gear.ruuk ??= {};
  note('Ruuk stays with the Faraed scouts for now. The roster at any fire can bring him in.'); save(); };
/* a "yes, but" in docks of debt on whoever rolled it (5 to 20), never past what the holder will wait for: if it would push the roller to
   'pressed', the scene takes another cost (alt: {t(id), fx(id)}). fx runs before t (16, settleRoll), so fx decides. */
let b53NearOk = true;
const b53Room = (id, n) => { const d0 = b5DebtStart(id), lim = d0 > 0 ? d0 * B5_PRESS : 50; return b5Debt(id) + n <= lim; };
const b53Owe = (n, why, line, alt) => ({
  fx:()=>{ const w = b53Who(); b53NearOk = b53Room(w, n); if (b53NearOk) b5Owe(w, n, why); else if (alt && alt.fx) alt.fx(w); },
  t:()=>{ const w = b53Who(); return b53NearOk ? line(w) : (alt && alt.t ? alt.t(w) : `Yes, but it costs ${b53Nm(w)} something.`); }});

/* ---- the Cadre's Link: the Claw Hand-Cant (Book One's cant), in Lether's words. From a young mage of the Snakebelt cadre on the dock
   (never one of the three, never in the ritual circle). It rides the Hold, but the bearer needn't be a mage. The battle half sets the
   same marks the hand-cant does (cantRound, cantLeft), so 31_battle's critical on the next hits does the rest. ---- */
Object.assign(TRICKS, {
  b5_c3_link:{name:'The Cadre\'s Link', ch:3, use:'fight', ab:'t_b5_c3_link', sorcery:true, where:'the dock at Kraig\'s Landing, with a young mage of the Snakebelt cadre',
    lore:'The cadre links a unit in an instant: a sign made with two fingers and a word under the breath, and the Hold opens a thread between the one who made it and everyone they have marked as theirs. For a breath they strike as one. The cadre uses it to aim a hundred bows. It works for six soldiers and a sword.',
    get fx(){ const n = 1 + lvT(); return `Once a fight, and it does not use the bearer's action: the bearer marks an enemy within 6, and the Hold opens a thread to the squad. The next ${n > 1 ? ['', '', 'two', 'three'][n] + ' hits' : 'hit'} on it this round ${n > 1 ? 'are criticals' : 'is a critical'}. Grows with level. It rides the Hold.`; }},
});
Object.assign(AB, {
  t_b5_c3_link:{name:TRICKS.b5_c3_link.name, trick:'b5_c3_link', free:true, sorcery:true, desc:()=>TRICKS.b5_c3_link.fx,
    tiles:u=>foes().filter(f => cheb(u, f) <= 6 && f.cantRound !== B.round && sees(u, f)),
    run(u, x, y){ const t = unitAt(x, y); if (!t) return; t.cantRound = B.round; t.cantLeft = 1 + lvT(); AUDIO.play('magic'); float(t, 'linked', '#9fd8c8'); sparks(t.x, t.y, 8, '#9fd8c8', .35);
      blog(`${u.name} makes the cadre's sign, two fingers and a word, and for a breath the squad feels the thread: <em>that one, all of us, now.</em>${u.id === 'perrit' ? ' Perrit\'s face does not change. Her hand does.' : ''}`); }},
});

/* ---- the words this chapter adds to Book Five's glossary ---- */
GLOSSX.mt.push(
  [3, 'The Cold Clay Battalion', 'The regiment camped round Kraig\'s Landing this summer, out of Trate. It guards the dock, the ships and the barges, and it cheers when it is told to, and sometimes when it is not.', ()=>(S.chapter || 0) >= 3],
  [3, 'The Snakebelt Battalion', 'A battalion out of Awl. Its mage cadre came up the river to Kraig\'s Landing with the Ceda\'s business.', ()=>!!(S && S.f && S.f.b5_c3_ph)]);

/* ---- the reading at the first halt: the barges at night ---- */
B5READ[3] = {scene:'b5_landing', where:'the planking of the outer barge, by a hooded lantern', set:'Night at Kraig\'s Landing, the barges tied three deep at the dock and the mist coming up off the river, with the regiment\'s fires on the bank behind.',
  back:'b5_c3_tiles_done', backT:'Back to the barges.',
  say:{get perrit(){ return `"Water on every side," Perrit says, looking at the barge, and at the river all round it, and at you. "Every side, Sergeant." She sits down on the planking exactly in the middle, with the lantern between her and the worst of it, and lays out her calfskin.${b5In('ruuk') ? ' Ruuk, who will not look at her tiles, goes and looks at the river instead.' : ''} "Sit. Quickly. Before I think about it."`; },
    tilewoman:`"A barge." The old woman spits over the side, for manners, and the river takes it. "Tiles don't float, Sergeant. That's why they tell the truth. A dock."`}};

/* the fire node is a roster fire (38c) */
ROSTER_FIRES.mt[3] = ['b5_c3_fire'];

const B5CH3 = {
  title:'Kraig\'s Landing', number:'Three',
  intro:{loc:'Kraig\'s Landing', sub:'Up the river from Trate · evening', scene:'b5_landing', cap:'Three buildings and a dock, a regiment\'s tents round them, barges tied three deep, and the mountains to the north very close.',
    paras:[
`The regiment's barges came up the river from Trate on poles and tow-ropes, against the current, for the better part of a week. Nerek haulers walked the tow-path on the bank with the ropes over their shoulders. The Sixth Company sat on the cargo and was told it was guarding it.`,
()=>{ const v = b53Here().map(id => TPL[id].name);
  return `${v.length ? `${b53And(v)} ${v.length > 1 ? 'are' : 'is'} with you, sunburnt on one side from a week of the river going past on the other.` : 'The squad, this month, is you.'} The clerk has the paybooks in the oilskin case on his knees, and has not let go of it since Trate.`; },
`Kraig's Landing comes round the last bend at evening: three buildings and a dock, and round them the tents of a whole regiment, and past them, to the north, the mountains. Up there is the border, and past the border, the Edur.`],
    go:'Onto the dock', node:'b5_c3_start'},

  areas:[
    /* 16 x 12 (b5_c3_dock, evening). The Landing: # the three buildings (the hostel and its tavern top-left, a storehouse, the outlying
       shed by the water) = the regiment's tents  . trampled earth , mud  d dock planking  ~ the river  F the barge crews' fire
       S the Faraed scouts' fire, above the dock  T the rise, where you can see the mages' tents  B the gangplank to the barges */
    { id:'b5_c3_dock', title:'Kraig\'s Landing · the dock', sub:'The Landing and the regiment\'s camp', hint:'Tap ground to move · tap a figure to talk · the barges are down the dock', decor:'b5_c3_dock',
      map:[ "###..###..==..,,",
            "###..###.....T,,",
            "..........==....",
            "..==..==..==..S,",
            "..==..==........",
            "................",
            ".##.......F.....",
            ",,,,,,,,,,,,,,,,",
            "dddddddddddddddd",
            "~~dd~~~~~~dd~~~~",
            "~~dB~~~~~~dd~~~~",
            "~~~~~~~~~~~~~~~~" ],
      walk:'.,d', triggers:{F:'b5_c3_fire', S:'b5_c3_scouts', T:'b5_c3_rise', B:'b5_c3_to_barges'}, start:{x:8, y:7},
      quest:()=> b53Ph() === 1 ? (!S.f.b5_c3_ennic ? 'The Finadd, on the dock.' : 'The barges, at nightfall. The first watch is the Sixth\'s.')
        : b53Ph() === 2 ? (!b53Key() ? 'The day before something. The fire, at evening, for the night\'s orders.' : !b53KeyDone() ? (b53Key() === 'watch' ? 'The barge-line, where the haulers sleep.' : 'Up the bank, after the runner.') : 'The fire.')
        : 'Dawn. The Finadd has the orders.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:6, y:5, node:()=>b53Ph() >= 3 ? 'b5_c3_dawn' : b53Ph() === 2 ? 'b5_c3_ennic_day' : 'b5_c3_ennic', fresh:()=>b53Ph() >= 3 ? !S.f.b5_c3_dawn : b53Ph() === 2 ? !S.f.b5_c3_ennicDay : !S.f.b5_c3_ennic},
        {id:'sailor', name:'A sailor off the ships', kind:'b5_c3_bargeman', x:13, y:8, node:()=>'b5_c3_ships', fresh:()=>!S.f.b5_c3_ships},
        {id:'soldier', name:'A soldier of the Cold Clay', kind:'b5_letherii', x:9, y:2, node:()=>'b5_c3_regiment', fresh:()=>!S.f['b5_c3_reg' + b53Ph()]},
        {id:'cadre', name:'A young mage in grey piping', kind:'b5_c3_cadremage', x:12, y:5, node:()=>S.f.b5_c3_linkTried ? 'b5_c3_cadre_again' : 'b5_c3_cadre', show:()=>b53Ph() <= 2, fresh:()=>!S.f.b5_c3_linkTried},
        {id:'ruuk', name:'A Faraed boy with throwing-spears', kind:'ruuk', x:15, y:2, node:()=>S.f.b5_ruukDone == null ? 'b5_c3_ruuk' : 'b5_c3_ruuk_again', show:()=>!b5In('ruuk') && S.f.b5_ruukDone !== 0 && b5CanRecruit('ruuk'), fresh:()=>S.f.b5_ruukDone == null},
        {id:'trader', name:'The trader\'s man', kind:'b5_c3_trader', x:13, y:4, node:()=>'b5_c3_trader', show:()=>b53Ruuk() && !S.f.b5_c3_traderDone, fresh:()=>true},
        {id:'nerek', name:'The Nerek haulers', kind:'b5_c3_nerek', x:4, y:7, node:()=>'b5_c3_nerek', fresh:()=>!S.f['b5_c3_ner' + b53Ph()]},
        {id:'qm', name:'The quartermaster', kind:'b5_letherii', x:14, y:5, node:()=>'b5_c3_qm', fresh:()=>!S.f.b5_c3_qm},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:1, y:5, node:()=>'b5_c3_clerk', fresh:()=>!S.f.b5_c3_clerk},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:15, y:7, node:()=>'b5_c3_tilewoman', fresh:()=>!S.f.b5_c3_tw} ] },

    /* 16 x 12 (b5_c3_barges, night). Three barges tied three deep off the dock: . deck  ~ the river between them  - the gangplanks
       c cargo, roped  r rope coils, where the mooring lines are made fast  ^ the plank up to the dock */
    { id:'b5_c3_barges', title:'Kraig\'s Landing · the barges', sub:'Night · tied three deep', hint:'Tap ground to move · the mooring lines are on the coils · the dock is up the plank', decor:'b5_c3_barges', dark:true,
      map:[ "~~~~~~~^~~~~~~~~",
            "~.c....-....c.~~",
            "~.cc.......r..~~",
            "~.....-.....c.~~",
            "~~~~~~-~~~~~~~~~",
            "~..c..-..cc...~~",
            "~.........r...~~",
            "~.cc.....-....~~",
            "~~~~~~~~~-~~~~~~",
            "~..r.....-..c.~~",
            "~.....c.....cc~~",
            "~~~~~~~~~~~~~~~~" ],
      walk:'.-', triggers:{r:'b5_c3_rope', '^':'b5_c3_to_dock'}, start:{x:7, y:2},
      quest:()=> !S.f.b5_c3_riverDone ? 'The mooring lines want checking.' : 'Up the plank to the dock.',
      npcs:[] },

    /* 16 x 12 (b5_c3_bank, night; 'warn' only). The upriver bank: ~ the river on the west  , reeds  . the path  # rock  x a dead tree
       ^ the top, where the path gives out in the reeds  v back down to the Landing */
    { id:'b5_c3_bank', title:'The river bank · upriver', sub:'Night · after the runner', hint:'Tap ground to move · the path goes north along the river', decor:'b5_c3_bank', dark:true,
      map:[ "~~~,,,,..^..##..",
            "~~~,,,,......#..",
            "~~~~,,,..,,..##.",
            "~~~~,,....x.....",
            "~~~,,,....,,..#.",
            "~~~,,......,,...",
            "~~~~,,..##......",
            "~~~,,,......,,..",
            "~~~,,..,,.....#.",
            "~~~~,,..........",
            "~~~,,,...,,.,...",
            "~~~~,,....v....." ],
      walk:'.,', triggers:{x:'b5_c3_deadtree', '^':'b5_c3_bank_edge', v:'b5_c3_bank_back'}, start:{x:9, y:10},
      quest:()=> S.f.b5_c3_bankDone ? 'Back down the path. It is nearly dawn.' : 'North, up the path, after the runner.',
      npcs:[] } ],

  battles:{
    /* the first night: river thieves on the barges, cutting them loose; a skiff more out of the water; then the barge that went */
    b5_c3_rivermen:{title:'The barges at night', style:'b5_c3_barges', dark:true, pitTxt:'the river', warrenText:'Kraig\'s Landing · the cadre\'s Hold is close tonight, and not for you', warren:{meanas:1, denul:1}, music:'battle',
      map:[".t..t..o","......oo","..t...oo",".......o","oooo.ooo","......t.","..t.....",".....t..","........","......t."],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_c3_riverman',1,1],['b5_c3_riverman',5,0],['b5_c3_riverman',3,2],['b5_c3_pole',4,3]], xp:150, after:'b5_c3_rivermen_after',
      waves:[{round:2, foes:[['b5_c3_riverman',7,5],['b5_c3_riverman',0,5],['b5_c3_riverman',7,6]], text:'Three more come up out of the river, over the side of the barge, with knives in their teeth and the water running off them.'}],
      preText:()=>`The thieves are on the near barge and the next one, black shapes against the water, with knives at the mooring lines. One of them has a bargeman's pole, and is using it to keep the barges apart while the others cut.`,
      stage2:{title:'The drifting barge', xp:70,
        text:()=>`The last of them on the near barge goes over the side, and the squad hears it before it sees it: the creak of a line giving, and the slap of water. The outer barge is loose. It swings off the others into the current with a lantern on its cargo and three men on its deck, and the one at the stern, the big one, is laughing.\n\nThere is a moment when it is close enough to jump. ${b53Say({thegg:'Thegg jumps first. The barge rocks under him and steadies. "Behind me," he says, and the rest of the squad comes across behind him.', _:'You jump. The squad comes after you.'})}`,
        map:["oo....oo","o..t...o","o......o","o.t..t.o","o......o","o......o","o..t...o","o......o","o......o","oo....oo"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b5_c3_riverboss',4,1],['b5_c3_riverman',2,2],['b5_c3_riverman',5,2]]} },
    /* phase 2 (optional): two regiment men who walked off before the strike, robbing the scouts' fire */
    b5_c3_deserters:{title:'The scouts\' fire', style:'b5_c3_dock', open:true, warrenText:'Kraig\'s Landing · the camp is busy, and looking the other way', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..t.....","......t.","........","...t....","........",".t......","......t.","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_deserter',2,2],['b5_deserter',5,2],['b5_deserterbow',4,0]], xp:100, after:'b5_c3_deserters_after',
      preText:()=>`Two of them with the scouts' packs over their shoulders and swords out, and a third further up the slope with a bow. Regiment blue-grey, with the regiment's flash cut off the sleeves.`},
    /* 'watch': after the fire, drunk soldiers of the regiment start on the Nerek haulers at the barge-line */
    b5_c3_cheer:{title:'The barge-line', style:'b5_c3_dock', dark:true, pitTxt:'the river', warrenText:'After the fire · the whole camp is singing', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Fists and boots, nobody killed. Keep them off the haulers until the provosts come.'},
      map:["........",".t......","......t.","........","..t..t..","...t....","........","........","oo....oo","oooooooo"],
      party:[[3,7],[4,7],[2,7],[5,7],[1,7],[6,7]],
      foes:[['b5_c3_drunk',1,0],['b5_c3_drunk',3,1],['b5_c3_drunk',5,0],['b5_c3_drunk',6,1]], xp:150, after:'b5_c3_cheer_after',
      waves:[{round:2, foes:[['b5_c3_drunk',0,2],['b5_c3_drunk',7,2]], text:'Two more come down from the camp with a jug between them, singing, to see what the noise is about.'}],
      preText:()=>`They come down from the camp in a crowd, singing, with jugs, and stop at the barge-line where the Nerek haulers sleep under the dock. One of them has a hauler by the collar. "There's some of yours up there," he is saying. "Was. Was some of yours." The others think this is very funny.`},
    /* 'warn': up the bank after the runner; on this side, among the reeds, something that is watching the villages too */
    b5_c3_bank:{title:'The reeds', style:'b5_c3_bank', dark:true, pitTxt:'the river', warrenText:'The bank at night · the green light is fading over the mountains, and something else is here', warren:{meanas:1, denul:1}, music:'battle',
      map:["ooo.t...","oo..t..#","ooot....","oo...t..","ooo.....","oo..t..#","oo......","ooo..t..","oo......","ooo....."],
      party:[[4,8],[5,8],[3,9],[6,8],[4,9],[5,9]],
      foes:[['b5_wraith',3,1],['b5_wraith',5,0],['b5_wraith',6,3],['b5_unblooded',4,2]], xp:150, after:'b5_c3_bank_after',
      preText:()=>`Shapes in the reeds where nothing should stand: three that do not move the reeds as they go, and one that does, tall and grey, with a long knife, crouched at the water's edge looking north the way the runner was looking.`} },

  foes:{
    /* river thieves, a bargeman's pole, and their boss */
    b5_c3_riverman:{name:'River thief', sig:'r', kind:'b5_c3_riverman', hp:12, ac:12, atk:4, dmg:[1,6,1], rng:1, mv:5, init:2, sk:['hitrun'], verb:'goes in low with a knife at'},
    b5_c3_pole:{name:'Thief with a bargeman\'s pole', sig:'p', kind:'b5_c3_pole', hp:16, ac:12, atk:4, dmg:[1,6,2], rng:1, mv:4, init:1, sk:['reach', 'shove'], verb:'drives the end of a barge-pole into'},
    b5_c3_riverboss:{name:'The river thieves\' boss', sig:'B', kind:'b5_c3_riverboss', hp:30, ac:13, atk:5, dmg:[1,8,2], rng:1, mv:4, init:1, boss:true, sk:['rally', 'shove'], verb:'brings a cargo-hook round at'},
    /* a soldier of the regiment, drunk, celebrating: fists and boots */
    b5_c3_drunk:{name:'Drunk regiment soldier', sig:'d', kind:'b5_c3_drunk', hp:12, ac:11, atk:3, dmg:[1,6,0], rng:1, mv:4, init:0, sk:['shove'], verb:'swings a fist at'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b5_c3_cadretile:{name:'A cadre\'s spare tile', slot:'trinket', role:'focus', who:null, stat:{wits:1},
      line:'A plain practice tile of black stone with no face, polished, blank, with a hairline crack across one corner: the kind the cadre schools give their students to lay before they are let near a real one. A young mage of the Snakebelt cadre gave it away on the dock at Kraig\'s Landing. Whoever carries it is a little quicker to see a pattern. +1 Wits.'},
    b5_c3_spear:{name:'A Faraed throwing-spear', slot:'weapon', role:'reach', who:null, atk:1, rng:1,
      line:'A light spear of fire-hardened wood with a leaf-shaped iron head and a tuft of feathers from a bird only the Faraed have a name for. Made to be thrown, and thrown again. +1 to hit and +1 range: in a hand that fights close, it is a throw at two tiles.'},
    b5_c3_ash:{name:'Green ash in a paper twist', slot:'trinket', role:'any', who:null,
      line:'A pinch of grey ash in a twist of brown paper, still faintly green at the open end. It came down on the dock at Kraig\'s Landing in the night after the fire. It does nothing. Somebody in the squad kept it anyway.'} },

  scenes:{
    b5_c3_greenfire:{loc:'Kraig\'s Landing', sub:'The fire over the mountains · night', cap:'A curtain of green fire hanging over the mountains from one end of the sky to the other, and the whole camp on its feet in front of it.', amb:'explore'},
    b5_c3_tents:{loc:'Kraig\'s Landing', sub:'The mages\' tents', cap:'Three tents above the camp with guards round them, and on the ships at the dock the King\'s banner and the Ceda\'s.', amb:'explore'},
    b5_c3_collapse:{loc:'Kraig\'s Landing', sub:'The outlying building · night', cap:'A shed by the water fallen in on itself, lanterns round it, and men digging.', amb:'explore'} },

  end:{
    watch:['The fire', 'The Sixth went up the river to Kraig\'s Landing to guard a regiment\'s barges, and guarded them, the first night against thieves with knives at the mooring lines. Then the regiment\'s mages and the Ceda put a curtain of green fire over the mountains, on the Edur villages, and there were Nerek up there. The Sixth stayed at the barges as ordered and watched it from the dock with everyone else. The camp cheered. Afterwards the squad stood between the haulers and the celebrating.'],
    warn:['The runner', 'The Sixth went up the river to Kraig\'s Landing to guard a regiment\'s barges, and guarded them, the first night against thieves with knives at the mooring lines. Then the squad learned what the mages meant to do, and that there were Nerek in the villages, and sent a runner up the bank in the dark to tell them. The fire came before he was a league up. The squad went after him, and found him, and something in the reeds that was watching too. He came back at dawn. The regiment wrote the Sixth down for it.'] },
  endScene:'b5_landing',
  endCap:()=> b53Key() === 'warn' ? 'The road north out of the Landing at dawn, the mountains grey again, and in the regiment\'s book a line about the Sixth.' : 'The road north out of the Landing at dawn, the mountains grey again, and ash on the dock behind.',
  tease:'Next: High Fort. The battalion\'s own station, on the frontier, where the battalion is going to meet the Sixth.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b5_c3_key === 'watch') x.push(`The squad stayed at the barges as ordered and watched the green fire go up over the mountains.${f.b5_c3_cheerDone ? ' After it, the squad kept the regiment\'s drunks off the Nerek haulers until the provosts came.' : ''}`);
    if (f.b5_c3_key === 'warn') x.push(`The squad sent ${f.b5_c3_runner === 'ruuk' ? 'Ruuk' : 'Tobet'} up the bank to warn the Nerek in the villages. The fire came first.${f.b5_c3_bankDone ? ' The squad went up after the runner and found something in the reeds watching the villages too.' : ''} The regiment fined the sergeant thirty docks for a runner sent without leave.`);
    if (f.b5_c3_riverDone) x.push('River thieves came for the regiment\'s barges on the first night and cut one loose. The squad went after it and brought it back.');
    if (f.b5_ruukDone === 1 && b5In('ruuk')) x.push('Ruuk, a Faraed guide from the scouts\' fire, walks with the squad, a step ahead of it.');
    else if (f.b5_ruukDone === 2) x.push('Ruuk the Faraed guide stays with the army\'s scouts for now. The roster can bring him in.');
    if (f.b5_c3_traderDone) x.push(f.b5_c3_trader === 'paid' ? 'The squad paid off the trader\'s cut of Ruuk\'s day-rate.' : f.b5_c3_trader === 'talked' ? 'The squad talked the Trate grain trader\'s man down to nothing.' : 'The Trate grain trader\'s man took his cut of Ruuk\'s pay, and wrote it down.');
    if (f.b5_c3_linkOk) x.push('A young mage of the Snakebelt cadre showed the squad the sign the cadre uses to link a unit in an instant.');
    if (f.b5_c3_desDone) x.push('Two regiment men who walked off before the strike were caught robbing the scouts\' fire.');
    if (f.b5_c3_haulers) x.push('Ammet saw to the Nerek haulers\' rope sores on the dock.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b5_fentReach && 'News at dawn: Fent Reach has surrendered, the Atri-Preda and her garrison with it. The Sixth goes north to High Fort to wait for the battalion.',
    f.b5_noted && 'The regiment has noted the Sixth for a runner sent without leave, and fined the sergeant thirty docks in its own book.',
    f.b5_c3_bankDone && 'Up the bank in the night, after the runner: shapes in the reeds, and one of the Edur\'s own young, watching the villages burn.',
    f.b5_c3_cheerDone && 'After the fire, the camp celebrated, and some of it went down to the barge-line for the Nerek haulers. The squad held them off until the provosts came.',
    f.b5_c3_key && (f.b5_c3_key === 'watch' ? 'The night of the strike: the squad stayed at the barges as ordered, and watched the fire go up over the mountains.' : `The night of the strike: the squad sent ${f.b5_c3_runner === 'ruuk' ? 'Ruuk' : 'Tobet'} up the bank to warn the Nerek in the villages.`),
    f.b5_c3_nerekWord && 'There were Nerek up there, in the villages, the haulers say: the ones who never came down.',
    f.b5_c3_desDone && 'Two regiment men walked off before the strike, and robbed the scouts\' fire on the way.',
    f.b5_c3_riverDone && 'River thieves came for the barges on the first night. One barge went down the river with their boss on it. The squad went with it, and brought it back.',
    f.b5_ruukDone === 1 && 'Ruuk, a Faraed guide paid by the day, walks with the squad.',
    f.b5_ruukDone === 2 && 'Ruuk, a Faraed guide paid by the day, stays with the scouts for now.',
    f.b5_c3_news && 'Barracks talk at the Landing: the King wants the Ceda\'s mages to strike first, the Preda has called the Whitefinders back north from their exercises, and a Letherii has gone over to the Edur. Which one is anybody\'s guess.',
    'The Sixth guards the regiment\'s barges at Kraig\'s Landing, three buildings and a dock near the border, with the Cold Clay Battalion camped round it.'].filter(Boolean); },

  dlg:{
    /* ---- the first evening: the dock, and the first halt ---- */
    b5_c3_start:()=>({sp:'Kraig\'s Landing · the dock', scene:'b5_landing', fx:()=>{ S.f.b5_c3_ph ??= 1; },
      again:()=>`The dock at Kraig's Landing. The barges, the camp, the three buildings, and the mountains.`, txt:
`Kraig's Landing, at evening.

Three buildings, none of them proud of it. A storehouse with a sagging roof. A shed down by the water that the river has been leaning on for years. And a hostel, solidly built, two storeys, with a tavern below: the only building at the Landing anybody meant to last. Lamps are lit in its windows already, and the noise coming out of it is officers and merchants. The Sixth's docks are spoken for, and the Sixth knows it.

Round the three buildings, a whole regiment's tents in rows: the Cold Clay Battalion, out of Trate, with its fires going up one by one in the dusk. Higher up, on their own patch of ground with their own guards, a cluster of tents with grey piping on the flaps: a battalion's mage cadre, up from Awl. And at the dock, below the barges, two ships, with the King's banner at one masthead and the Ceda's at the other.

The barges are tied three deep along the dock. The Nerek who hauled them are sitting under it, out of the way, with the ropes still across their knees.

${b53Say({perrit:`Perrit has seen the grey piping, and stopped. "Snakebelt cadre," she says, very quietly. "A whole cadre, here." She does not say what a whole cadre is for. She does not need to.`, tobet:`Tobet is looking past the camp at the mountains. "That's the border," he says. "Up there. That's where they are."`, _:'The squad looks at the camp, and then at the mountains.'})}${b53If('thegg', `\n\nThegg looks at the hostel door, and at the low lintel, and turns away before anyone asks.`)}${b53If('brune', `\n\nBrune walks to the end of the dock and puts her feet in the river, and looks downstream, toward the sea.`)}`,
      ch:[b5TileChoice(3),
          {t:'Find the Finadd.', go:'b5_c3_ennic'},
          {t:'Walk the Landing.', go:()=>startExplore()}]}),
    b5_c3_tiles:()=>b5TileOffer(3),
    b5_c3_card:()=>b5TileCard(3),
    b5_c3_tiles_done:()=>({sp:'The Tiles of the Holds', scene:'b5_landing', txt:
`${S.f.b5_c3_drawn ? (S.f.b5_c3_reader === 'perrit' ? 'Perrit counts the tiles back into the pouch one by one, and ties it twice, and gets off the barge faster than she got on.' : 'The tile-woman wraps the bone tiles in the oiled cloth, and the dock goes somewhere in her shawl, and she climbs back up the plank without looking down.') : 'The tiles stay in the pouch.'} The river goes on going past.`,
      ch:[{t:'Back to the Landing.', go:()=>startExplore()}]}),

    /* ---- the Finadd: the orders, and the barracks talk ---- */
    b5_c3_ennic:()=>({sp:B5_FINADD.name, scene:'b5_landing', fx:()=>{ S.f.b5_c3_ennic = 1; S.f.b5_c3_news = 1; },
      again:()=>`Finadd Ennic, with the regiment's order. "The barges, Sergeant. At night."`, txt:
`Finadd Ennic has been to see the regiment's officers in the hostel, and has come out again with an order, and a smell of the tavern's wine that he did not drink.

"We are the regiment's until we are not," he says. "The barges are ours at night. The Cold Clay has the camp and the dock by day, and the cadre has its own guards, and nobody is to go near the cadre's tents." He turns the page. "Nobody. They said it twice."

He lowers his voice. "Barracks talk, from the officers' table. There has been a council in Letheras: the King, the Preda, the Ceda. The King wants the Ceda's mages to strike first, before the Edur can." He looks up at the grey piping on the tents. "I think we are standing in it."

And then, more quietly still, and pleased about it: "The Preda has called the Whitefinders back north from their exercises. The battalion is coming, Sergeant. We are to meet it at High Fort, when the regiment lets us go."${b53If('perrit', `\n\nPerrit has gone still. "A strike," she says. "From here. With a cadre." She is working out the sum of it, and you can see her not liking the answer.`)}`,
      ch:[{t:'"The battalion. Good."', go:'b5_c3_ennic2'},
          {t:'"Yes, Finadd."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_ennic2:()=>({sp:B5_FINADD.name, scene:'b5_landing', txt:
`"Good," Ennic agrees. "The battalion's commander can decide things." He seems to find this restful. "Until then, I sign what the regiment puts in front of me. The barges, at night. The first watch is ours tonight."

He closes the book. "The Cold Clay's men say the river thieves come down out of the hills for barges like these, when they think nobody is looking. I said the Sixth would be looking." He hesitates. "I hope that was the right thing to say."`,
      ch:[{t:'"It was, Finadd."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    b5_c3_ennic_day:()=>({sp:B5_FINADD.name, scene:'b5_landing', fx:()=>{ S.f.b5_c3_ennicDay = 1; },
      again:()=>`Finadd Ennic, with his book shut. "Evening, Sergeant. The orders come at evening."`, txt:
`Finadd Ennic is walking the dock with his book under his arm and not reading it, which is unusual. He has been to the hostel again, and come out again, with nothing new written down.

"The regiment's officers are very busy today," he says, "and very cheerful, and none of them will tell me why." He looks up the slope at the tied flaps. "I have a feeling I am going to be told this evening, in writing, and that it will not need my signature." He considers that. "I find I mind more than I expected."${S.f.b5_c3_riverDone ? `

He lowers his voice. "The barge-master spoke well of the Sixth. In front of the Cold Clay's officers. I wrote it down before he could take it back."` : ''}`,
      ch:[{t:'"The orders at evening, Finadd."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the ships at the dock: the King's banner and the Ceda's, close ---- */
    b5_c3_ships:()=>{ const ph = b53Ph();
      return {sp:'The ships at the dock', scene:'b5_c3_tents', fx:()=>{ S.f.b5_c3_ships = 1; },
        again:()=>`The two ships at the dock, and a sailor coiling a line. "Not ours to say, soldier."`, txt:
`Two river ships at the end of the dock, broad and shallow, with oars as well as sails. One flies the King's banner. The other flies the Ceda's, and has guards of its own at the foot of its plank who are not the regiment's and do not look at the white fingertips on anybody's shields.

A sailor is coiling a line on the King's ship, slowly, so as to be seen working. ${ph === 1 ? `"Crates," he says, when you ask what they brought. "For the tents up the slope. Sealed. We carried them up the river from Trate and we carried them up the slope, and nobody told us what was in them, and we didn't ask." He coils. "You don't, with the Ceda's crates."` : ph === 2 ? `"We're to sail at first light tomorrow," he says. "Back down to Trate, or wherever we're told." He looks at the mountains. "After tonight, they say. Everybody says *after tonight* today."` : `He has stopped coiling, and is looking at the ash on the deck. "We sail on the tide," he says. "Whatever that was, we're not to talk about it." He sweeps a little of it over the side with his foot. "So I won't."`}`,
        ch:[{t:'Not now.', go:()=>startExplore()}]}; },

    /* ---- a soldier of the Cold Clay: the camp's talk, phase by phase ---- */
    b5_c3_regiment:()=>{ const ph = b53Ph();
      return {sp:'A soldier of the Cold Clay', scene:ph >= 2 && !b53KeyDone() ? 'b5_c3_tents' : 'b5_landing', fx:()=>{ S.f['b5_c3_reg' + ph] = 1; S.f.b5_c3_news = 1; },
        again:()=> ph === 1 ? `The Cold Clay soldier at his fire. "Whitefinders. You're a long way from home."` : ph === 2 ? `The Cold Clay soldier, polishing nothing. "Tonight, they say."` : `The Cold Clay soldier, hoarse from cheering.`, txt: ph === 1 ?
`A Cold Clay soldier is sitting on an upturned bucket by the nearest tent with a pot on the fire and his boots off, which in an army camp is the mark of a veteran. He looks at the white fingertips on the squad's shields with professional interest.

"Whitefinders," he says. "You're a long way from High Fort." He stirs the pot. "Everybody's a long way from somewhere this summer. The cadre's from Awl. The ships are from Letheras. Us, we're from Trate, which is a long way from nowhere."

He lowers his voice, because that is what you do with the next part. "You'll have heard the war's declared. You won't have heard this. One of ours went over to them. A Letherii. Went up into the Edur country and swore to their king." He shakes his head. "No name. Everybody says it's true."` : ph === 2 ?
`The Cold Clay soldier is up early, and polishing a helmet that does not need it. Up the slope the cadre's tents have their flaps tied shut, and there are more guards round them than there were last night.

"Three of them, in there," he says, with his chin, not his hand. "The sorceress from Trate, and two others. Very big. The biggest there is, after the Ceda." He spits, carefully, away from the tents. "Tonight, they say. Over the mountains. On the villages." He polishes. "We're to stay in the lines. Nobody's to go near."` :
`The Cold Clay soldier is sitting on his bucket with his voice gone from cheering and a cup in his hand, looking at the mountains, which are grey again.

"Did you see it?" he says. "Course you did. Everybody saw it." He drinks. "Over the mountains. I never saw anything like it. None of us did." He looks into the cup. "Best thing I ever saw," he says. And then, after a while, not looking up: "Nothing came down off them after. Nothing at all."`,
        ch:[{t:'Not now.', go:()=>startExplore()}]}; },

    /* ---- the rise: the mages' tents, seen at a distance ---- */
    b5_c3_rise:()=>({sp:'The rise above the dock', scene:'b5_c3_tents', fx:()=>{ S.f.b5_c3_rise = 1; }, txt: b53KeyDone() || b53Ph() >= 3 ?
`From the rise the cadre's tents look smaller than they did. Two of the flaps are open, and nobody comes out of them. The guards are still there. On the ships at the dock the banners hang, with no wind to lift them.` :
`From the rise above the dock you can see the whole Landing at once: the three buildings, the regiment's rows, the barges, the ships. And above the camp, on their own ground, the cadre's tents, three of them larger than the rest, with guards round them who face outward.

On the ships at the dock the King's banner and the Ceda's hang side by side. The Ceda is in Letheras. His banner is here.${b53Ph() === 2 ? `\n\nToday there are men in grey piping going in and out of the three large tents with their arms full, and nobody going in or out with them is talking.` : ''}${b53Say({perrit:`\n\nPerrit stands beside you, and looks, and then looks away, deliberately, at the river. "Not ours to look at," she says. "The school is very clear about that."`, ruuk:`\n\nRuuk is looking north, past the tents, at the mountains. "Up there are the villages," he says. "Edur villages. Nerek too, some. The road goes up past the falls."`, _:''})}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the cadre mage on the dock: the trick ---- */
    b5_c3_cadre:()=>({sp:'A young mage in grey piping', scene:'b5_landing', txt:
`On the dock, out of sight of the cadre's tents and plainly glad of it, a young mage in grey piping is sitting on a bollard eating an apple. She is about Perrit's age, with ink on her fingers and the look of someone who has been told to stay out of the way and is doing so with enthusiasm.

"Whitefinders," she says. "You've a mage?" ${b5In('perrit') ? `She sees Perrit, and the pouch at her hip, and brightens. "Cadre. Which school?" Perrit tells her. "Oh, *them*," the young mage says, with sympathy.` : `She sees there isn't one. "No? Pity. The Whitefinders' cadre is up at High Fort, I suppose."`}

She finishes the apple. "I'm not wanted in there till tonight," she says, with a nod up the slope. "They've three of the biggest there are in those tents, and they don't want the rest of us breathing on their sums. So." She holds up two fingers. "Do you want to see something useful? The cadre's link. It's how we aim a hundred bows at once. It works for a squad. It isn't secret. The schools just don't bother teaching it to soldiers, that's all."`,
      ch:[{t:'"Show us."', check:['wits', 16], trick:'b5_c3_link', req:()=>!S.f.b5_c3_linkTried, fx:()=>{ S.f.b5_c3_linkTried = 1; },
            edges:id=>[id === 'perrit' && ['the cadre is hers, and the sign is only half new', 3], id === 'tobet' && ['he has watched a hundred bows aimed by somebody else', 1], id === 'thegg' && ['the Hold does not much like Thegg, or he it', -2], id === 'ruuk' && ['he will not look at it', -1]],
            near:{t:()=>{ const w = b53Who(); return `Yes, but the thread goes through ${b53Nm(w)} like cold water through a cracked tooth, and ${b53Nm(w)} ${b53V(w, 'come', 'comes')} out of it with a nosebleed and a head that rings: rattled.`; }, fx:()=>b53Rattle(b53Who())},
            go:'b5_c3_cadre_ok', fail:'b5_c3_cadre_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_cadre_ok:()=>({sp:'A young mage in grey piping', scene:'b5_landing', fx:()=>{ S.f.b5_c3_linkOk = 1; gain('b5_c3_cadretile'); }, txt:
`She shows ${by({sgt:'you', _:'{who}'})} the sign: two fingers, a turn of the wrist, a word under the breath that is mostly a breath. ${by({sgt:'You make', _:'{who} makes'})} it wrong three times. The fourth time something opens, a hair's width, between ${by({sgt:'you', _:'{who}'})} and the rest of the squad, and for a breath everybody is looking at the same bollard, and knows it.

"That," the young mage says. "Not much, is it? It's enough." She digs in her satchel and holds out a tile: plain black stone with no face, polished, with a crack across one corner. "A practice tile. The school gives us a sack of them. Lay it when you want to steady your hand. It won't show you anything." She grins. "That's the point of it."${b53If('perrit', `\n\nPerrit looks at the blank tile, and at the young mage, and says, "Thank you," in a voice the squad has not heard her use before.`)}`,
      ch:[{t:'"Thank you." Back along the dock.', go:()=>startExplore()}]}),
    b5_c3_cadre_no:()=>({sp:'A young mage in grey piping', scene:'b5_landing', fx:()=>{ if (!(S.kit || []).includes('b5_c3_cadretile')) gain('b5_c3_cadretile'); }, txt:
`${by({sgt:'You make', _:'{who} makes'})} the sign until the fingers ache, and the word until it is only a word, and nothing opens anywhere.

"Never mind," the young mage says. "It took me a year." She holds out a tile, plain black stone with no face and a crack across one corner. "A practice tile. Lay it when you're bored. Try again when you're not." She looks up the slope at the tents, and stops grinning. "Try again soon, perhaps."`,
      ch:[{t:'Back along the dock.', go:()=>startExplore()}]}),
    b5_c3_cadre_again:()=>({sp:'A young mage in grey piping', scene:'b5_landing', again:()=>`The young mage on her bollard. "Not wanted yet."`, txt:
`The young mage is on her bollard, ${b53Ph() === 2 ? 'not eating anything. She has been sent for, she says, at sundown. She does not say what for, and she has stopped grinning.' : 'with another apple. "Still not wanted," she says, cheerfully. "Ask me tonight."'}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the Faraed scouts' fire: Ruuk (the recruit), the spear, and in phase 2 the deserters ---- */
    b5_c3_scouts:()=>{ const ph = b53Ph();
      return {sp:'The Faraed scouts\' fire', scene:'b5_landing', fx:()=>{ S.f.b5_c3_scoutsSeen = 1; },
        again:()=> ph === 2 && !S.f.b5_c3_desDone ? 'The scouts\' fire. Somebody is shouting there.' : 'The scouts\' fire above the dock, small and well made.', txt: ph === 2 && !S.f.b5_c3_desDone ?
`There is shouting at the scouts' fire. Two men in regiment blue-grey, with the regiment's flash cut off their sleeves, have a scout's pack each over their shoulders and their swords out, and the scouts are on their feet with their spears, and nobody has thrown anything yet. Further up the slope a third man has a bow, and an arrow on the string.

"We're going home," one of the two says, to everyone. "We're not stopping here for tonight. We're not stopping for what they're going to do up there. We'll want food for the road." He nods at the packs. "They won't miss it."${b53If('ruuk', `\n\nRuuk has a spear in his hand already. "That one is my uncle's pack," he says. "My uncle will miss it."`)}` :
`The army's Faraed scouts keep their own fire above the dock, apart from the regiment's: a small, well-made fire with a ring of stones and nothing wasted in it. A dozen of them, most of them boys, in hide over wool, with bundles of light throwing-spears stuck upright in the ground beside them. The army pays them by the day to find it the roads its maps get wrong.${ph >= 3 ? `\n\nThis morning there is a place left empty at the fire, a blanket rolled and a spear stuck in the ground beside it. One of the scouts up the north road has not come back. The scouts do not say anything about it, and leave the place as it is.` : ''}`,
        ch:[{t:'"Whitefinders. Put them down."', req:()=>ph === 2 && !S.f.b5_c3_desDone, go:()=>startBattle('b5_c3_deserters', {})},
            {t:'Come round behind the bowman, up the slope, quiet.', check:['guile', 13], req:()=>ph === 2 && !S.f.b5_c3_desDone,
              edges:id=>[id === 'ruuk' && ['these are his hills, near enough', 2], id === 'tobet' && ['he was taught to be where the blow is not', 1], id === 'thegg' && ['the slope is all loose stone, and Thegg is all Thegg', -2]],
              near:b53Owe(8, 'A tent-rope, cut', w => `Yes, but ${b53Nm(w)} ${b53V(w, 'go', 'goes')} through a Cold Clay tent-rope on the way up, and the tent comes down on its owner, and the regiment's quartermaster writes it against ${b53Pos(w)} line: ${b5Coin(8)}.`, {t:w => `Yes, but a stone goes from under ${b53Pos(w)} boot and down the slope, and the bowman turns: bruised on the way up.`, fx:w => bruise(w, bruiseN())}),
              go:()=>startBattle('b5_c3_deserters', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c3_deserters_seen'},
            {t:'A Faraed throwing-spear, in trade.', tag:'2 docks', req:()=>ph !== 2 || !!S.f.b5_c3_desDone ? !(S.kit || []).includes('b5_c3_spear') && !b53Ruuk() && (S.silver || 0) >= 2 : false, fx:()=>{ S.silver -= 2; updSilver(); gain('b5_c3_spear'); }, go:'b5_c3_spear_trade'},
            {t:'The boy with the spears.', req:()=>!b5In('ruuk') && S.f.b5_ruukDone !== 0 && b5CanRecruit('ruuk') && (ph !== 2 || !!S.f.b5_c3_desDone), go:()=>talk(S.f.b5_ruukDone == null ? 'b5_c3_ruuk' : 'b5_c3_ruuk_again')},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c3_spear_trade:()=>({sp:'The Faraed scouts\' fire', scene:'b5_landing', txt:
`A scout with a scar through one eyebrow pulls a spear out of his bundle, weighs it, decides it is not his favourite, and holds it out for two docks. Fire-hardened, a leaf-shaped iron head, a tuft of feathers. "That bird," he says, touching the feathers, and says its name in Faraed, which does not help. "Lucky bird."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_deserters_seen:()=>({sp:'The Faraed scouts\' fire', scene:'b5_landing', txt:
`The slope is loose stone. Halfway up, it moves, and keeps moving, all the way down to the fire, and the bowman turns round with the arrow already drawn.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b5_c3_deserters', {surprise:'e'})}]}),
    b5_c3_deserters_after:()=>({sp:'The Faraed scouts\' fire', scene:'b5_landing', fx:()=>{ S.f.b5_c3_desDone = 1; b53Docks(8, 'the scouts\' thanks, in docks, which the Faraed do not usually part with'); }, txt:
`The two who are still on their feet go off up the north road without the packs, and without looking back, and the regiment's provosts come up from the camp too late to do anything but write it down. The bowman goes with the provosts.

The scouts put their packs back where they were, and count what is in them, and then one of them comes and puts eight docks in your hand without saying anything, and goes back to the fire. ${b53Say({ruuk:`"That was my uncle," Ruuk says. "He doesn't like to say thank you. He pays instead. It's quicker."`, _:'The Faraed, the Cold Clay soldier tells you later, do not usually part with docks.'})}${b53If('ammet', `\n\nAmmet looks at the two going up the road. "They'll be hungry by the falls," she says. "And they'll be right about tonight." She does not say what she means by that.`)}`,
      ch:[{t:'Back to the dock.', go:()=>startExplore()}]}),

    /* Ruuk: the recruit. If the squad is full (Brune walks), b5Join leaves him waiting; then "Walk with us instead of Brune" swaps. */
    b5_c3_ruuk:()=>({sp:'Ruuk, of the Faraed', scene:'b5_landing', fx:()=>{ S.f.b5_c3_metRuuk = 1; },
      again:()=>`Ruuk, at the scouts' fire, with his spears. "Sergeant."`, txt:
`A Faraed boy of seventeen or so comes down from the scouts' fire to meet you before you have quite decided to go up to it: thin, wiry, hide over wool, a bundle of light spears over his shoulder, and a grin that has walked a long way ahead of him and is waiting for the rest of him to catch up.

"You are the Whitefinders," he says. "The Sixth. You pay on the day." It is not a question. "I am Ruuk. I am a guide. The army pays me a dock a day to tell it where the roads are, because its maps lie." He jerks his head at the camp. "They will not need guides tonight. After tonight they will go somewhere, and they will want roads. So will you."

He shrugs. "My clan owes a trader in Trate for a winter's grain. He takes it out of my day-rate. Forty docks. The grain was good." The grin comes back. "I would rather owe it walking with somebody who pays on the day."${b53If('thegg', `\n\nRuuk looks up at Thegg, a long way up, and seems delighted with what he finds.`)}${b53If('perrit', `\n\nHe sees the tile pouch at Perrit's hip, and looks somewhere else, politely and at once.`)}${b5In('brune') ? `\n\nBrune is with the squad. There is room on the Sixth's bench for one more who is not a soldier, and Brune is it.` : ''}`,
      ch:[{t:'"Walk with us."', req:()=>!b5In('brune') || b5Room() > 0, fx:()=>{ b5Join('ruuk'); if (b5In('ruuk')) gain('b5_c3_spear'); }, go:'b5_c3_ruuk_join'},
          {t:'"Walk with us, instead of Brune. She can wait with the company\'s followers."', req:()=>b5In('brune') && b5Room() <= 0, fx:()=>{ b5Join('ruuk'); b5SwapIn('ruuk'); if (b5In('ruuk')) gain('b5_c3_spear'); }, go:'b5_c3_ruuk_join'},
          {t:'"Stay with the scouts for now. We know where to find you."', fx:()=>{ if (b5Room() <= 0) b5Join('ruuk'); else b53Wait(); }, go:'b5_c3_ruuk_wait'},
          {t:'"The Sixth can\'t take you."', fx:()=>{ S.f.b5_ruukDone = 0; }, go:'b5_c3_ruuk_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_ruuk_join:()=>({sp:'Ruuk, of the Faraed', scene:'b5_landing', txt: b5In('ruuk') ?
`"Good," Ruuk says, as if he had arranged it, and pulls one of the spears out of his bundle and gives it to you to carry, because he has three and two hands. "A spare. Mine. Throw it at something. It comes back if you go and get it."

The company clerk, fetched from the dock, writes him into the paybooks by lamplight: a new line, forty docks, a winter's grain. Ruuk watches him do it. "You write everything down," he says, with interest. "My grandmother said the Letherii write everything down so they do not have to remember it." The clerk considers this, and writes it down.${b5Waiting('brune') ? `\n\nBrune shoulders her sealskin roll and goes back along the dock to the company's followers, where the roster can find her. She does not seem to mind. "The river is the same river," she says. "From there or from here."` : ''}` :
`Ruuk counts the squad, the way the scouts count a patrol, and laughs. "No room," he says. "You have your six. I will be at the fire. Shout."`,
      ch:[{t:'Back to the dock.', go:()=>startExplore()}]}),
    b5_c3_ruuk_wait:()=>({sp:'Ruuk, of the Faraed', scene:'b5_landing', txt:
`"For now," Ruuk says, and seems to find it a perfectly good answer. "I will be at the fire. When you want a road, shout." The clerk writes him into the paybooks anyway, on a page of his own, against the day. Ruuk watches him do it with great interest.`,
      ch:[{t:'Back to the dock.', go:()=>startExplore()}]}),
    b5_c3_ruuk_no:()=>({sp:'Ruuk, of the Faraed', scene:'b5_landing', txt:
`"Ah," Ruuk says. He does not seem hurt. He seems to be working out which road is next. "Then some other company that pays on the day." He goes back up to the scouts' fire, and by the morning he is not there, and nobody at the fire says where he went.`,
      ch:[{t:'Back to the dock.', go:()=>startExplore()}]}),
    b5_c3_ruuk_again:()=>({sp:'Ruuk, of the Faraed', scene:'b5_landing', again:()=>`Ruuk, at the scouts' fire. "Sergeant."`, txt:
`Ruuk is at the scouts' fire with his spears, naming a bird on the slope to anyone who will listen. "Sergeant," he says, and waits.`,
      ch:[{t:'"Walk with us now."', req:()=>b5Waiting('ruuk') && (b5Room() > 0 || !!b5Recruit_()), fx:()=>{ b5SwapIn('ruuk'); }, go:'b5_c3_ruuk_join'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the trader's man: the Trate grain trader's cut of Ruuk's pay (if Ruuk walks or waits) */
    b5_c3_trader:()=>({sp:'The trader\'s man', scene:'b5_landing', again:()=>`The trader's man, with his book. "The cut, Sergeant."`, txt:
`A man in a good coat that has been up a river is waiting by the scouts' path with a small book and a smaller pencil: the Trate grain trader's man, come up with the regiment's barges to collect. He has the look of somebody who is owed by everyone at the Landing and has written all of it down.

"The Faraed boy," he says, nodding at ${b5In('ruuk') ? 'Ruuk' : 'the scouts\' fire'}. "His clan's grain. My master takes his cut of the boy's day-rate at the paymaster's table, when the army pays." He opens the book. "The army doesn't pay the Sixth's people through the regiment's table, it seems. So I've come to you." He smiles. "Twenty docks clears his day-rate of me, Sergeant, this season. Or I write it on the grain at fifteen more, and he pays it when he can."${b53If('ruuk', `\n\nRuuk is studying a bird on the slope instead of the man. "He is a bad man," he says to you, cheerfully. "The grain was good."`)}`,
      ch:[{t:'"Twenty docks. Clear him."', req:()=>(S.silver || 0) >= 1, fx:()=>{ b5Pay('ruuk', 20, 'The trader\'s cut'); S.f.b5_c3_trader = 'paid'; S.f.b5_c3_traderDone = 1; }, go:'b5_c3_trader_done'},
          {t:'"Write it on the grain."', fx:()=>{ b5Owe('ruuk', 15, 'The trader\'s cut'); S.f.b5_c3_trader = 'ride'; S.f.b5_c3_traderDone = 1; }, go:'b5_c3_trader_done'},
          {t:'"The army pays its guides itself. Nothing in the regiment\'s book says the trader comes first."', check:['guile', 14], req:()=>!S.f.b5_c3_traderTried, fx:()=>{ S.f.b5_c3_traderTried = 1; },
            edges:id=>[id === 'sgt' && ['you know a paybook the way he knows his', 2], id === 'perrit' && ['she can read his sums upside down', 1], id === 'pessa' && ['she talks back for a living', 1], id === 'thegg' && ['he is very large and very polite, and the man does not like either', -1]],
            near:{t:()=>{ const w = b53Who(); return `Yes, but he writes ${b53Pos(w)} name in his book, slowly, spelling it out loud, with "the Sixth, the Whitefinders" after it. A name taken, in Lether, is a name somebody will come back for.`; }, fx:()=>{ S.f.b5_c3_nameTaken = b53Who(); }},
            go:'b5_c3_trader_talked', fail:'b5_c3_trader_firm'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_trader_talked:()=>({sp:'The trader\'s man', scene:'b5_landing', fx:()=>{ S.f.b5_c3_trader = 'talked'; S.f.b5_c3_traderDone = 1; }, txt:
`The trader's man reads his own book again, and then the line in the regiment's order that ${by({sgt:'you put', _:'{who} puts'})} in front of him, and then his own book once more. "The army's guides," he says. "Paid by the army." He licks the pencil, and crosses something out, neatly. "My master will not be pleased."

"Your master is in Trate," ${by({sgt:'you say', _:'{who} says'})}.

"So he is." He closes the book. "So he is." He goes off down the dock toward the hostel, to write a letter, by the look of him.${b53If('ruuk', `\n\nRuuk watches him go. "He will want it from somebody," he says. "But not from me. Good."`)}`,
      ch:[{t:'Back to the dock.', go:()=>startExplore()}]}),
    b5_c3_trader_firm:()=>({sp:'The trader\'s man', scene:'b5_landing', txt:
`The trader's man listens to all of it, politely, and taps his book. "The grain was delivered," he says. "It's written. Twenty, or fifteen on the grain. I'm not unreasonable, Sergeant. I'm only right."`,
      ch:[{t:'"Twenty docks. Clear him."', req:()=>(S.silver || 0) >= 1, fx:()=>{ b5Pay('ruuk', 20, 'The trader\'s cut'); S.f.b5_c3_trader = 'paid'; S.f.b5_c3_traderDone = 1; }, go:'b5_c3_trader_done'},
          {t:'"Write it on the grain."', fx:()=>{ b5Owe('ruuk', 15, 'The trader\'s cut'); S.f.b5_c3_trader = 'ride'; S.f.b5_c3_traderDone = 1; }, go:'b5_c3_trader_done'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_trader_done:()=>({sp:'The trader\'s man', scene:'b5_landing', txt: S.f.b5_c3_trader === 'paid' ?
`The trader's man counts the docks twice and writes a receipt in his small book, and tears it out, and gives it to you, which surprises everyone including him. "Cleared for the season," he says. "Next season is next season." He goes off down the dock.${b53If('ruuk', `\n\nRuuk looks at the receipt for a long while. Then he folds it very small and puts it inside his shirt, against the skin.`)}` :
`The trader's man writes it on the grain, fifteen docks, in a hand much neater than he is, and shows you the line, and closes the book. "When he can," he says. "My master is a patient man. Interest is very patient too." He goes off down the dock.${b53If('ruuk', `\n\nRuuk shrugs. "It was always going to be on the grain," he says. "Now it is more grain."`)}`,
      ch:[{t:'Back to the dock.', go:()=>startExplore()}]}),

    /* ---- the Nerek haulers under the dock: phase by phase; in phase 2, "there were Nerek up there" ---- */
    b5_c3_nerek:()=>{ const ph = b53Ph();
      return {sp:'The Nerek haulers', scene:'b5_landing', fx:()=>{ S.f['b5_c3_ner' + ph] = 1; if (ph >= 2) S.f.b5_c3_nerekWord = 1; },
        again:()=> ph === 1 ? 'The Nerek haulers, under the dock, with the tow-ropes.' : ph === 2 ? 'The haulers under the dock. The old one is looking at the mountains.' : 'The haulers under the dock, quiet.', txt: ph === 1 ?
`The Nerek who hauled the barges up from Trate are sitting under the dock out of the regiment's way, a dozen of them, with the tow-ropes still across their knees and their shoulders raw from them. They are Indebted, every one; the barge-master owns their debts, and the debts own the rest. They watch the Sixth come along the dock without much interest, and then with a little more, when they see the squad is not the regiment.${b53If('ammet', `\n\nAmmet has stopped. She is looking at their shoulders, and at the rope sores on them, and her hand has gone to her roll of tools.`)}` : ph === 2 ?
`Under the dock the haulers are awake and quiet. The oldest of them, a grey woman with a face folded in on itself, is looking north at the mountains, where the road goes up past the falls toward the villages.

"There were Nerek up there," she says, when you crouch down by her. She says it to the mountains. "In the villages. The ones who would not come down to the river when the traders came. Old ones. Some families." She shrugs, a very small shrug. "They work for the Edur, a little. The Edur are not worse than the barge-master." She looks at the cadre's tents on the slope. "My sister's people went up there. Long ago."${b53If('ammet', `\n\nAmmet crouches beside her, and says something in a language that is not Letherii, haltingly, a grandmother's words. The old woman looks at her for the first time.`)}` :
`The haulers are under the dock, sitting together, closer than they were. No one is talking. The old woman has a twist of ash in her hand from the planking, and is holding it, and not looking at it.${b53Key() === 'warn' ? `\n\nShe looks at you once, and at ${NAME(b53Runner())}, and nods. That is all. It is not thanks. It is something like it.` : ''}`,
        ch:[{t:'Ammet looks at the rope sores.', check:['wits', 13], req:()=>ph === 1 && b5In('ammet') && !S.f.b5_c3_hauledTried, fx:()=>{ S.f.b5_c3_hauledTried = 1; },
              edges:id=>[id === 'ammet' && ['the sick are hers, and so are the Nerek, a quarter of her', 3], id === 'tobet' && ['he knows what the Indebted will let you see', 1], id === 'thegg' && ['he makes the haulers nervous, being the size of the barge-master\'s man', -1]],
              near:{t:()=>`Yes, but there are a dozen of them and every shoulder wants dressing: the squad's own salve goes on the last of them, and Ammet does not ask before she uses it.`, fx:()=>{ if ((S.inv.salve || 0) > 0) S.inv.salve -= 1; else b53Rattle('ammet'); }},
              go:'b5_c3_nerek_ok', fail:'b5_c3_nerek_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c3_nerek_ok:()=>({sp:'The Nerek haulers', scene:'b5_landing', fx:()=>{ S.f.b5_c3_haulers = 1; }, txt:
`Ammet goes along the line of them with her pot of salve and a roll of clean linen, and does not ask, and does not explain, and says "Hold still" to a man who has not moved. The haulers let her, one after another, the way people do when nobody has asked them in a long time. The old woman at the end watches the whole of it before she lets Ammet near her own shoulders, and then she does.

"Half Nerek," the old woman says, looking at Ammet's hands. "A quarter." Ammet nods. "My grandmother." The old woman nods back, and that is the whole of the conversation, and it seems to be enough for both of them.`,
      ch:[{t:'Back to the dock.', go:()=>startExplore()}]}),
    b5_c3_nerek_no:()=>({sp:'The Nerek haulers', scene:'b5_landing', txt:
`Ammet starts along the line of them with her pot of salve, and the first hauler pulls his shoulder away, and the next, and the barge-master's man comes along the dock to see what the soldiers want with his haulers. Ammet stops. "Another time," she says, and puts the pot away, and does not look happy about it.`,
      ch:[{t:'Back to the dock.', go:()=>startExplore()}]}),

    /* ---- the barge crews' fire: a rest, the pay desk, the squad, the way on (the games pass, 89, wraps this node: keep the id) ---- */
    b5_c3_fire:()=>{ const ph = b53Ph(), k = b53Key();
      return {sp:'The barge crews\' fire', scene:'b5_landing', again:()=> ph >= 3 ? 'The barge crews\' fire at dawn, burnt down to ash. Green-grey ash has come down on it out of the sky.' : ph === 2 ? (k ? 'The barge crews\' fire. Nobody at it is talking about anything else.' : 'The barge crews\' fire, the day before something. The Finadd will have the night\'s orders at evening.') : 'The barge crews\' fire on the dock, driftwood and pitch.', txt:
`${ph >= 3 ? `The barge crews' fire on the dock in the grey before dawn, down to coals. The bargemen are sitting round it with their hoods up, not talking. Something has come down out of the sky in the night and lies on the planking in a fine grey-green dust, and on the coals, and on the bargemen's hoods.` : ph === 2 ? `The barge crews' fire on the dock, by day. The bargemen are mending lines and arguing about what the regiment will do with the barges after tonight, and every one of them stops short of what tonight is. Up on the slope the cadre's tents have their flaps tied shut.` : `The barge crews' fire on the dock: driftwood and a lump of pitch, and the bargemen round it with their poles laid on the planking and a pot on the coals. ${S.f.b5_c2_key === 'dead' ? 'They know the Sixth already. Word came up the river with the barges: the company that carried the dead out of the second hulk at Trate and laid them on the quay. They make room at the fire without being asked.' : S.f.b5_c2_key === 'salvage' ? 'They know the Sixth already. Word came up the river with the barges: the company that landed the harvest ships\' cargo at Trate for the harbour master\'s forty. They make room at the fire, and keep an eye on their own cargo.' : 'They make room at the fire for the soldiers who are to guard their barges, and say so.'}`}${b53If('brune', () => ph < 3 ? `\n\nBrune sits at the edge of the dock with her feet in the river, a little apart from the fire.` : '')}${b53If('ruuk', () => ph < 3 ? `\n\nRuuk eats standing up, at the edge of the firelight, looking at the slope.` : '')}`,
        ch:[b5TileChoice(3),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f['b5_c3_rest' + ph], fx:()=>{ S.f['b5_c3_rest' + ph] = 1; b5Rest('The squad sits an hour by the barge crews\' fire, with the river going past. Wounds close, mostly.'); }, go:'b5_c3_fire_rest'},
            {t:'The pay desk, at the clerk\'s crate.', go:'b5_c3_pay'},
            {t:'Talk with the squad.', go:'b5_c3_fire_talk'},
            {t:'Nightfall. The first watch on the barges is the Sixth\'s.', req:()=>ph === 1 && !S.f.b5_c3_riverDone, onward:true, go:'b5_c3_watch_start'},
            {t:'Evening. The Finadd has the night\'s orders.', req:()=>ph === 2 && !k, onward:true, go:'b5_c3_orders'},
            {t:'The barge-line, where the haulers sleep.', req:()=>ph === 2 && k === 'watch' && !S.f.b5_c3_cheerDone, onward:true, go:'b5_c3_cheer_start'},
            {t:'Up the bank, after the runner.', req:()=>ph === 2 && k === 'warn' && !S.f.b5_c3_bankDone, onward:true, go:()=>{ startExplore('b5_c3_bank'); talk('b5_c3_bank_arrive'); }},
            {t:'Dawn. The Finadd has the orders.', req:()=>ph >= 3, onward:true, go:'b5_c3_dawn'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c3_fire_rest:()=>({sp:'The barge crews\' fire', scene:'b5_landing', txt:
`An hour on the warm planking by the fire, while the river goes past underneath.

${b53Say({ammet:`Ammet goes round the squad and looks at hands and feet, and at the blisters from the barge-poles, and says "still" to anyone who moves, and does not drink the bargemen's spirit when it comes round.`, thegg:`Thegg lies on his back on the dock, which creaks, and goes to sleep at once, and the bargemen step over him.`, _:'One of them sleeps. The others listen to the river.'})}${b53If('tobet', `\n\nTobet cuts a notch in his tally-stick, and then sits with it across his knees, looking at the mountains.`)}${b53If('perrit', `\n\nPerrit sits with her back to the hostel wall, which is the only place on the dock with no water behind it, and reads the Snakebelt cadre's ration list upside down off a crate.`)}`,
      ch:[{t:'Back to the fire.', go:'b5_c3_fire'}]}),
    b5_c3_fire_talk:()=>{ const ph = b53Ph(), k = b53Key(), ln = [];
      if (b5In('tobet')) ln.push(ph >= 3 ? (k === 'warn' && b53Runner() === 'tobet' ? `Tobet has his tally-stick out, and has not cut anything on it. "I didn't get there," he says. "I was a league short. Less." He turns the stick over. "There's no notch for that, Sergeant."` : `Tobet is looking at the mountains, grey again. "They cheered," he says. "Everybody cheered." He cuts a notch, and looks at it, and you do not ask what it was for.`) : `Tobet is watching the slope, and the tents with their flaps tied. "From back here," he says, flat, "everything owes me money." He watches a while longer. "Not them. I don't want anything off them."`);
      if (b5In('thegg')) ln.push(ph >= 3 ? `Thegg is sitting very still, with his big hands on his knees. When you sit by him he says, low, "My mother's people burned like that. Long ago. The Letherii did it with sorcery too." He says nothing more, and neither do you.` : `Thegg sits with his back against a bollard, which creaks, and talks low in his mother's tongue to nobody at the fire. When he sees you listening he stops. "The river has a great many," he says. "I tell them the way."`);
      if (b5In('perrit')) ln.push(ph >= 3 ? (k === 'watch' ? `Perrit has not slept. "It was the most beautiful working I have ever seen," she says, very evenly. "Three of them and the Ceda, from a hundred leagues off, on one thread." Her hands are shut in her lap. "I hate that I think so. I am going to go on thinking so."` : `Perrit is sitting very straight. "The regiment's book," she says. "Thirty docks, and a line about the Sixth." She looks at the mountains. "It was the right line." Her arms stay folded.`) : `Perrit is sitting where she can see the cadre's tents, and not looking at them, carefully. "A whole cadre," she says, "and the three biggest there are, and the Ceda's banner on a ship." She does the sum out loud, under her breath, and stops before the end.`);
      if (b5In('ammet')) ln.push(ph >= 3 ? (k === 'warn' ? `Ammet is washing her hands in the river, and goes on doing it. "My grandmother was half Nerek," she says, without turning round. "She'd have sent the runner." She shakes the water off. "She'd have been too late too."` : `Ammet is washing her hands in the river, and goes on doing it after they are clean. "There were Nerek up there," she says. That is all she says.`) : `Ammet is boiling her needles in a pot of river water. "River's cleaner than the sea for it," she says. "Not by much." She is not drinking.`);
      if (b5In('brune')) ln.push(ph >= 3 ? (S.f.b5_c2_key === 'dead' ? `Brune is at the edge of the dock with her feet in the river, which is grey with ash this morning. "The Shore will have them too," she says, when you come down to her. "The ones from the fire. Sooner or later. Everything goes downriver." She watches the ash go past. "It is a long way to the sea from here."` : `Brune is at the edge of the dock with her feet in the river, which is grey with ash this morning. "Everything goes downriver," she says. "Eventually." She does not seem to find it a comfort today.`) : `Brune sits on the edge of the dock with her feet in the river. "It is not the sea," she says, when you come down to her. "But it is going there." That seems to settle something for her.`);
      if (b5In('ruuk')) ln.push(ph >= 3 ? `Ruuk is up at the edge of the firelight looking north, and for once he is not a step ahead of anything. "The birds went up off the hills before it," he says. "All of them. Every bird I know." He is quiet a while. "They knew first."` : `Ruuk eats standing up and points his chin at the slope. "That one is a rain-bird," he says, and names it in Faraed. "That one says rain too. They are both right, and both liars." He grins. "Like maps."`);
      if (b5In('pessa')) ln.push(`Pessa sits with her boathook upright beside her, looking at the barges. "Good barges," she says. "Somebody's." She thinks about it. "Always somebody's."`);
      return {sp:'The barge crews\' fire', scene:'b5_landing', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b5_c3_fire'}]}; },

    /* the pay desk (80's b5PayChoices), at the clerk's crate */
    b5_c3_clerk:()=>({sp:'The company clerk', scene:'b5_landing', html:debtHTML('The Sixth Company · Kraig\'s Landing'), fx:()=>{ S.f.b5_c3_clerk = 1; },
      again:()=>`The clerk's crate. The paybooks are dry, and he is sitting on them.`, txt:
`The company clerk has found a crate on the dock as far from the water as the dock allows, and set the oilskin case on it, and sits beside it with one hand on the lid. The river makes him nervous. Everything makes him nervous, but the river has the paybooks in reach.

"The regiment pays us by the night," he says, "through its own table, less its own table." A pause. "I have written down what it keeps. It has written down what I wrote." He sounds almost fond of it.${b5In('ruuk') || b5Waiting('ruuk') ? `\n\nHe turns to a new page, in his small hand. "The Faraed boy. Forty docks, a winter's grain, to a trader in Trate." He looks up. "His trader's man has been asking me for the boy's day-rate. I told him the boy's day-rate is the army's business." He swallows. "Was that right?"` : ''}${b5Debt('sgt') > b5DebtStart('sgt') ? `\n\nHe runs his pen down your own line, and it stops further down than it started. He lets the line speak for itself.` : ''}`,
      ch:[{t:'The pay desk.', go:'b5_c3_pay'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_pay:()=>({sp:'The clerk\'s crate · the pay desk', scene:'b5_landing', html:debtHTML('The Sixth Company · Kraig\'s Landing'), again:()=>`The pay desk. The clerk's pen is wet, and the squad has ${b5Coin(S.silver || 0)} in hand.`, txt:
`The clerk wets his pen. "Anything the squad pays down out of its own docks, I write as paid, today, in front of you," he says. "The holders get it at the quarter. From here it goes down the river." He looks at the river. "With the barges. Which we are guarding." This seems to reassure him a little.`,
      ch:b5PayChoices('b5_c3_fire')}),

    /* the quartermaster: salves at six docks */
    b5_c3_qm:()=>({sp:'The quartermaster', scene:'b5_landing', fx:()=>{ S.f.b5_c3_qm = 1; }, again:()=>`The quartermaster, counting. "Salves, six. The river doesn't change the price either."`, txt:
`The quartermaster has set up on the dock behind the company's barrels and is counting them against the regiment's list, which has more barrels on it than he brought, and arguing about it with a Cold Clay quartermaster who has fewer. His salves are in a dry crate: Letherii field salve, in waxed paper.

"Six docks," he says. "Docks. Not the regiment's chits, not a bargeman's promise, not a Faraed spear." He writes something down. "I was offered a Faraed spear. I said no. What would I do with a spear?"`,
      ch:[{t:'A salve.', tag:'6 docks', req:()=>(S.silver || 0) >= 6, fx:()=>{ S.silver -= 6; S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for six docks.', 'good'); }, go:'b5_c3_qm'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the tile-woman: she reads when Perrit doesn't */
    b5_c3_tilewoman:()=>({sp:'The tile-woman', scene:'b5_landing', fx:()=>{ S.f.b5_c3_tw = 1; }, txt:
`The tile-woman came up the river on the quartermaster's barge with her bag of oiled cloth in her lap, and sits now on a coil of the regiment's rope at the end of the dock, watching the cadre's tents on the slope. She spits to one side when you come over.

${b5In('perrit') ? `"Grey piping," she says, with her chin. "Your mage has seen it." She considers the tents, professionally. "Tiles is a small trade, next to that. A dock at a time." She does not offer a reading. Your mage does that.` : `"No mage," she says. "Then it's bone, and it's a dock, and we'll do it on the barge, where the tiles like it." She shakes the bag, and it clicks. "Sit, if you want it."`}`,
      ch:[Object.assign(b5TileChoice(3), {req:()=>!b5In('perrit') && !S.f.b5_c3_drawn && !S.f.b5_c3_noCard}),
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the ways between the dock and the barges ---- */
    b5_c3_to_barges:()=>({sp:'The gangplank', scene:'b5_landing', txt: b53Ph() === 1 && !S.f.b5_c3_watch ?
`The plank goes down from the dock onto the first of the barges. The regiment's own men have the barges until nightfall, and are not interested in sharing them before.` :
`The plank goes down from the dock onto the first of the barges, and from there to the next, and the next, three deep, with the river between.`,
      ch:[{t:'Down onto the barges.', req:()=>b53Ph() >= 2 || !!S.f.b5_c3_watch, onward:true, go:()=>startExplore('b5_c3_barges')},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_to_dock:()=>({sp:'The gangplank', scene:'b5_landing', txt:
`Up the plank from the barges to the dock.${!S.f.b5_c3_riverDone && S.f.b5_c3_watch ? ' The watch is the Sixth\'s until dawn, and the mooring lines are down here.' : ''}`,
      ch:[{t:'Up to the dock.', onward:true, go:()=>startExplore('b5_c3_dock')},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the first night: the watch on the barges, and the river thieves ---- */
    b5_c3_watch_start:()=>({sp:'The barges · nightfall', scene:'b5_landing', fx:()=>{ S.f.b5_c3_watch = 1; }, txt:
`Nightfall. The regiment's watch comes off the barges and goes up to its fires, and the Sixth goes down the plank and onto them with a hooded lantern and the clerk's best wishes.

Three barges, tied three deep: the near one to the dock, the next to the near one, the outer one to the next, with the river slapping between them in the dark. Cargo roped under tarpaulins. The mooring lines made fast round coils on each deck. Out past the outer barge the river is black, and fast, and makes the sort of noise that is easy to stop hearing.${b53If('perrit', `\n\nPerrit goes down the plank last, and stands in the exact middle of the near barge, and stays there.`)}${b53If('brune', `\n\nBrune goes straight to the outer barge and sits on its edge with her feet over the side.`)}`,
      ch:[{t:'Down onto the barges.', onward:true, go:()=>startExplore('b5_c3_barges')},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b5_c3_rope:()=>({sp:'The mooring lines', scene:'b5_landing', txt: S.f.b5_c3_riverDone ?
`The mooring line is made fast round its coil, new rope spliced into old where the thieves' knives went in. The bargemen have checked it twice${b5In('thegg') ? ', and so has Thegg' : ''}.` : !S.f.b5_c3_watch ?
`A mooring line, made fast round its coil. By day the regiment's men have the barges.` :
`A mooring line, made fast round its coil, wet and taut. You put your hand on it. It is too taut, and then, under your hand, it is not: somewhere further along, on the next barge, it has been cut half through, and is still being cut.

There is a sound out on the water that is not the river. Oars, muffled, very close. And then, on the next barge, a shape gets up from behind the cargo that is not a bargeman.${b53If('tobet', `\n\n"Four," Tobet breathes, behind you. "On the next one and the outer. One with a pole. More on the water."`)}`,
      ch:[{t:'"Whitefinders." Lantern up, and over onto the next barge.', req:()=>!!S.f.b5_c3_watch && !S.f.b5_c3_riverDone, go:()=>startBattle('b5_c3_rivermen', {})},
          {t:'Shutter the lantern and go along the cargo in the dark, low.', check:['wits', 14], req:()=>!!S.f.b5_c3_watch && !S.f.b5_c3_riverDone,
            edges:id=>[id === 'brune' && ['she has crossed decks in the dark all her life', 2], id === 'tobet' && ['he sees in the dark, and is where the blow is not', 1], id === 'pessa' && ['she was raised on barges', 1], id === 'thegg' && ['every barge he steps on tells the river about it', -2], id === 'perrit' && ['the water is right there', -1]],
            near:b53Owe(6, 'A regiment lantern, in the river', w => `Yes, but the hooded lantern goes out of ${b53Pos(w)} hand on the cargo and into the river with a hiss, and it is the regiment's lantern: ${b5Coin(6)} against ${b53Pos(w)} line.`, {t:w => `Yes, but ${b53Nm(w)} ${b53V(w, 'go', 'goes')} into the gap between the barges up to the waist, and the thieves hear the splash: rattled.`, fx:w => b53Rattle(w)}),
            go:()=>startBattle('b5_c3_rivermen', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c3_rope_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_rope_seen:()=>({sp:'The barges · night', scene:'b5_landing', txt:
`A tarpaulin flaps on the cargo where a boot catches it. Every shape on the next barge turns at once, with knives out, and the one with the pole swings it round.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c3_rivermen', {surprise:'e'})}]}),
    b5_c3_rivermen_after:()=>({sp:'The barges · before dawn', scene:'b5_landing', fx:()=>{ S.f.b5_c3_riverDone = 1; }, txt:
`The boss goes over the stern of the drifting barge into the river and does not come up where anybody is looking, and the last of his men go after him. The barge turns slowly in the current, a long way down from the Landing now, with its lantern still burning on the cargo.

Then the work: poles, and the barge's own sweep, and the current against all of it. ${b53Say({brune:'Brune takes the sweep without being asked and brings the barge across the current to the bank as if she had been doing it all her life, which she has.', pessa:'Pessa takes a pole and shows the squad how, without being asked, and swears at the river in canal cant the whole way.', thegg:'Thegg takes the heaviest pole and leans on it, and the barge goes where he leans it.', _:'It takes the squad the rest of the night to pole it back.'})} By the grey before dawn the outer barge is tied up again, three deep, with new rope spliced into the old where the knives went in.

The barge-master comes down the dock at first light and walks the length of all three barges, counting, and finds nothing missing. He seems almost disappointed.`,
      ch:[{t:'Up to the dock.', onward:true, go:()=>{ startExplore('b5_c3_dock'); talk('b5_c3_morning'); }}]}),
    b5_c3_morning:()=>({sp:'Kraig\'s Landing · morning', scene:'b5_landing', fx:()=>{ if (!S.f.b5_c3_paid1) { S.f.b5_c3_paid1 = 1; S.f.b5_c3_ph = Math.max(2, S.f.b5_c3_ph || 1); b53Docks(12, 'the barge-master\'s bounty for three barges kept, less the regiment\'s share'); b53Docks(6, 'the regiment\'s rate for a night on the barges, after deductions'); } }, txt:
`Morning at the Landing. The regiment is up and about, and the camp smells of porridge and smoke.

The barge-master pays a bounty for barges kept, and counts it into the clerk's hand in front of a Cold Clay officer, who takes the regiment's share before the clerk can close his fingers on it: twelve docks come to the squad. And the regiment pays its rate for the night on the barges, after deductions, which are read out by nobody: six more.

Up on the slope, the cadre's tents have their flaps tied shut this morning, and there are more guards round them than there were last night. ${b53Say({perrit:'Perrit sees it, and goes very still.', tobet:'Tobet sees it, and goes on watching.', _:'The squad sees it.'})}`,
      ch:[{t:'Back to the dock.', go:()=>startExplore()}]}),

    /* ---- the evening of the second day: the orders, and what the mages mean to do. The key. ---- */
    b5_c3_orders:()=>({sp:B5_FINADD.name, scene:'b5_c3_tents', fx:()=>{ S.f.b5_c3_orders = 1; S.f.b5_c3_nerekWord = 1; },
      again:()=>`Finadd Ennic, with the night's orders. "The barges, Sergeant. All night."`, txt:
`Evening. Finadd Ennic comes down from the hostel with the night's orders in his book, and reads them to the squad by the fire, in his neat voice, because he has been told to.

"Tonight the regiment stays in its lines," he says. "Every company. No one goes up the slope, no one goes up the river bank, no one leaves the Landing. The Sixth is at the barges, all night." He turns the page. "The cadre, and the three in the tents, and the Ceda from Letheras, are to strike the Edur villages across the mountains. With sorcery. Tonight." He closes the book. "That is all it says."

He stands there with it closed. "The officers say the villages will burn from end to end," he says. "They seemed very pleased."

Down at the barge-line, under the dock, the Nerek haulers have heard it too. The old woman is looking at the mountains. "There were Nerek up there," she says, to nobody, to the mountains. "In the villages. The ones who would not come down."

${b53Say({ammet:`Ammet turns her head and looks at the old woman, and then at you, and does not say anything at all. She does not need to.`, _:'The squad looks at you.'})}`,
      ch:[{t:'Decide.', onward:true, go:'b5_c3_key'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_key:()=>({sp:'The barge crews\' fire · evening', scene:'b5_c3_tents', again:()=>`The fire, and the mountains going dark. The night's orders, and the haulers under the dock.`, txt: b53Key() ?
`It is decided. ${b53Key() === 'watch' ? 'The Sixth is at the barges, as ordered.' : `${NAME(b53Runner())} has gone up the bank in the dark.`}` :
`The mountains go dark against the last of the sky. Up on the slope, lamps are lit in the three large tents, and men in grey piping are going up toward a level place above them, a long way off, with their arms full.

The order is the barges, all night. The road up the river bank goes north past the falls toward the villages, and a runner who knew it could be a long way up it by midnight.

${b5In('ruuk') ? `Ruuk is at your elbow. "I know the bank road," he says, very low. "To the falls, and past. I could be at the first village by morning." He is not grinning. "Maybe before."` : `Tobet is at your elbow, half a step behind, as always. "Sergeant," he says softly. "I can run. I'm the quickest you've got." He does not say what he is offering. He does not need to.`}${b53If('perrit', `\n\nPerrit says, very precisely, "The order is the barges, Sergeant. It is the cadre's work up there, and it is not ours to stop." She sounds as if she is reading it off a page. Her hands are shaking.`)}${b53If('thegg', `\n\nThegg is looking at the haulers under the dock, and his jaw is set.`)}${b53If('brune', `\n\nBrune is looking at the river. "Everything goes down it," she says. "Whatever you do tonight."`)}`,
      ch:[{t:'"The barges, as ordered. We watch, and we keep our posts."', req:()=>!b53Key(), fx:()=>{ S.f.b5_c3_key = 'watch'; b53L('perrit', 1); b53L('ammet', -1); }, go:'b5_c3_thefire'},
          {t:`"${b5In('ruuk') ? 'Ruuk' : 'Tobet'}. Up the bank. Tell them to get out."`, req:()=>!b53Key(), fx:()=>{ S.f.b5_c3_key = 'warn'; S.f.b5_c3_runner = b5In('ruuk') ? 'ruuk' : 'tobet'; b53L('ammet', 2); b53L('thegg', 1); b53L('perrit', -1); }, go:'b5_c3_runner'},
          {t:'"Not yet."', req:()=>!b53Key(), go:()=>startExplore()},
          {t:'Not now.', req:()=>!!b53Key(), go:()=>startExplore()}]}),

    /* 'watch': the fire, the cheering, the building that falls, and the drunks at the barge-line */
    b5_c3_thefire:()=>({sp:'Kraig\'s Landing · the fire', scene:'b5_c3_greenfire', fx:()=>{ S.f.b5_c3_fireSeen = 1; }, txt:
`The squad goes down onto the barges, and sits, and waits, with the lantern hooded.

Past midnight it begins. There is no sound. There is a light on the slope above the tents, where the men in grey piping went, and then the light is not on the slope, it is over the mountains: a line of green along their tops from one end of the sky to the other, and then a curtain of it, rising, hanging, enormous, lighting the whole Landing green, the tents and the barges and the river and every face on the dock.

It goes down on the far side of the mountains, onto whatever is there. It goes on going down.

And the camp cheers. The whole regiment is on its feet in its lines, roaring, and the bargemen on the dock, and the officers out of the hostel with their cups, and the noise comes down the slope and across the water. Somebody starts a song.${b53If('perrit', `\n\nPerrit is on her feet in the middle of the barge with her face lit green, and she is not cheering. "Look at it," she says. "Three of them and the Ceda, on one thread, from a hundred leagues apart." Her voice is very steady. "It is the finest working I have ever seen. I hate that I think so."`)}${b53If('ammet', `\n\nAmmet sits on the cargo with her hands in her lap, and watches it, and does not move at all.`)}${b53If('brune', `\n\nBrune watches it with her feet in the river. "The Shore will have them," she says. "The ones under that. Sooner or later."`)}${b53If('ruuk', `\n\nRuuk has his face turned away from it, toward the river. "The birds went up," he says. "Before it. All of them."`)}`,
      ch:[{t:'On.', go:'b5_c3_collapse'}]}),
    b5_c3_collapse:()=>({sp:'Kraig\'s Landing · the shed by the water', scene:'b5_c3_collapse', fx:()=>{ S.f.b5_c3_collapse = 1; }, txt:
`Then something comes back the other way. Not light: a push, a long low shove through the ground and the air and the water, that rocks the barges against each other and puts every lantern on the dock out at once.

Down by the water, the old shed the river has been leaning on for years stops leaning, and goes down on itself with a long tearing sound, and the cheering on the dock stops.

There were men in it. Bargemen sleeping out of the wind, two or three of them, and a Cold Clay soldier with a jug. Lanterns come, and men with spades, and the squad is there among them, digging. ${b5In('ammet') ? 'Ammet is in the rubble before anybody else, on her knees, with her roll of tools open. "Hold still," she is saying, to a man under a beam. "Hold still. Here. Lift on three."' : 'The regiment\'s surgeon comes down from the camp with his roll of tools, at a run.'}

Not one of them in the shed is killed. Two of them will not walk for a while. By the time they are carried up to the camp the green light over the mountains is fading, and the cheering has started again, further up the slope.`,
      ch:[{t:'Back to the barge-line.', onward:true, go:'b5_c3_cheer_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_cheer_start:()=>({sp:'The barge-line · night', scene:'b5_c3_greenfire', txt:
`The celebrating comes down the slope in the small hours: a crowd of the regiment, with jugs, singing, the green light gone out of the sky behind them. They are looking for more to cheer. At the barge-line, under the dock, they find the Nerek haulers.

"There's some of yours up there," one of them is telling a hauler, with a fist in the man's collar. "Was. Was some of yours." The others think this is very funny. One of them has picked up a barge-pole.${S.f.b5_c3_haulers ? `\n\nThe old woman Ammet saw to is behind the haulers, and she is looking at you.` : ''}${b53If('thegg', `\n\nThegg puts his shield down on the dock with a sound like a door shutting, and steps in front of the haulers. "Behind me," he says, to them, very politely.`)}`,
      ch:[{t:'"Whitefinders. Back off." Between them and the haulers.', go:()=>startBattle('b5_c3_cheer', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_cheer_after:()=>({sp:'The barge-line · before dawn', scene:'b5_landing', fx:()=>{ S.f.b5_c3_cheerDone = 1; S.f.b5_c3_ph = 3; }, txt:
`The provosts come down from the camp at last with lanterns and staves, and the celebrating goes back up the slope with them, mostly upright, still singing, a little less. No one is dead. Two of the regiment will have their jaws strapped for a week, and are told by the provosts that they walked into a barge.

The haulers go back under the dock, closer together than they were. ${b53Say({ammet:'Ammet goes in among them with her pot and her linen, and nobody pulls away this time.', thegg:'Thegg sits down on the dock at the end of the barge-line with his back to the haulers and his face to the camp, and stays there till dawn.', _:'The squad sits on the dock at the end of the barge-line till dawn.'})}`,
      ch:[{t:'Dawn.', onward:true, go:'b5_c3_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* 'warn': the runner up the bank; the fire comes first; the squad goes after him */
    b5_c3_runner:()=>{ const r = b53Runner();
      return {sp:'The river bank · dusk', scene:'b5_c3_tents', fx:()=>{ S.f.b5_c3_ranOut = 1; }, txt:
`${r === 'ruuk' ? `Ruuk does not wait to be told twice. He leaves his spare spears with you and goes up the bank road at a lope, past the scouts' fire and the last of the regiment's tents and into the dusk, and the dark takes him before he is out of earshot. He never once turns round. He is a step ahead of everyone, as always.` : `Tobet takes nothing but his knife and his tally-stick. "Sergeant," he says, softly, and then he is going up the bank road at a run, past the scouts' fire and the last of the regiment's tents and into the dusk, and the dark takes him before you can say anything to his back.`}

The squad goes down onto the barges, as ordered, and sits, and waits, with the lantern hooded.

Past midnight it begins. A light on the slope above the tents, and then over the mountains, from one end of the sky to the other: a curtain of green fire, rising, hanging, enormous, lighting the whole Landing green. The camp cheers. The whole regiment is on its feet and roaring.

${NAME(r)} is not a league up the bank. Not yet. Not near.

Then the push comes back through the ground and the water, and rocks the barges, and puts every lantern on the dock out at once, and somewhere down by the water a building goes down with a long tearing sound.${b53If('perrit', `\n\nPerrit, lit green, says, "The bank is open ground under that, Sergeant. All the way to the falls." Her voice is very steady, and very angry, and not with you.`)}${b53If('ammet', `\n\nAmmet is already on her feet.`)}`,
        ch:[{t:'"Up the bank. After him."', onward:true, go:()=>{ startExplore('b5_c3_bank'); talk('b5_c3_bank_arrive'); }},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c3_bank_arrive:()=>({sp:'The river bank · night', scene:'b5_c3_greenfire', txt:
`The bank road goes north out of the Landing along the river, between the water and the hill: a path, reeds on the river side, rocks on the hill side, and here and there a dead tree the floods have left. The green light is fading over the mountains ahead, and the camp's cheering fades behind.

${NAME(b53Runner())} went this way. ${b53Runner() === 'ruuk' ? 'Somewhere ahead, a step ahead.' : 'Somewhere ahead, running.'}${b53If('thegg', `\n\nThegg goes first, with the shield up, and says "Behind me," and the squad goes behind him.`)}`,
      ch:[{t:'North.', go:()=>startExplore()}]}),
    b5_c3_deadtree:()=>({sp:'A dead tree', scene:'b5_c3_greenfire', fx:()=>{ S.f.b5_c3_mark = 1; }, txt:
`A dead tree the floods left on the bank, white in the last of the green light. On its trunk, at the height of a man's hand, a fresh cut: ${b53Runner() === 'ruuk' ? 'two short strokes and a long one, the Faraed scouts\' mark for *this way, and go quiet*.' : 'a notch, cut with a knife, the same notch Tobet cuts in his tally-stick. He came this way, and he wanted you to know it.'}${b53If('ammet', `\n\nAmmet puts her hand flat on the cut. "Still wet," she says.`)}`,
      ch:[{t:'On, north.', go:()=>startExplore()}]}),
    b5_c3_bank_edge:()=>({sp:'The reeds · night', scene:'b5_c3_greenfire', txt: S.f.b5_c3_bankDone ?
`Where the path gives out in the reeds, the river goes on north into the dark toward the falls. Nothing is watching from the reeds now.` :
`Where the path gives out, the reeds go up to the water and over a man's head, and in the reeds, flat, looking north, is ${NAME(b53Runner())}. ${b53Runner() === 'ruuk' ? 'Ruuk does not turn his head.' : 'Tobet does not turn his head.'} "Down," ${b5He(b53Runner())} breathes. "Sergeant. Down. There's something here. On this side."

There is. Ahead, at the water's edge, shapes stand in the reeds where nothing should stand: three that do not move the reeds as they go, and one that does, tall and grey-skinned, crouched with a long knife, looking north at the dying green light the way ${NAME(b53Runner())} was looking. Watching the villages. Watching them burn.

It turns its head.`,
      ch:[{t:'"Shields." Up out of the reeds.', req:()=>!S.f.b5_c3_bankDone, go:()=>startBattle('b5_c3_bank', {})},
          {t:'Through the reeds, along the water, low.', check:['wits', 14], req:()=>!S.f.b5_c3_bankDone,
            edges:id=>[id === 'ruuk' && ['he reads ground, and this is his kind of ground', 2], id === 'brune' && ['she knows what water hides', 1], id === 'tobet' && ['he is where the blow is not', 1], id === 'thegg' && ['the reeds were not made for Thegg', -2]],
            near:{t:()=>{ const w = b53Who(); return `Yes, but the reeds are standing in the river, and ${b53Nm(w)} ${b53V(w, 'go', 'goes')} the last of the way in cold water to the chest: bruised with the cold.`; }, fx:()=>bruise(b53Who(), bruiseN())},
            go:()=>startBattle('b5_c3_bank', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c3_bank_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_bank_seen:()=>({sp:'The reeds · night', scene:'b5_c3_greenfire', txt:
`The reeds rattle. The grey shape is on its feet at once, and the three others come round without seeming to move.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c3_bank', {surprise:'e'})}]}),
    b5_c3_bank_after:()=>({sp:'The river bank · before dawn', scene:'b5_landing', fx:()=>{ S.f.b5_c3_bankDone = 1; }, txt:
`The shapes go up into nothing. The grey one goes into the river, and across it, and up the far bank into the dark, and is gone.

The squad stays in the reeds a long time after, looking north. The green light is gone from over the mountains. Nothing comes down the bank road. Nothing comes down the river.

${NAME(b53Runner())} gets up at last. "I didn't get there," ${b5He(b53Runner())} says. "I was a league short. Less." ${b53Runner() === 'ruuk' ? `Ruuk looks north a while longer. "I do not know," he says, "if anyone was there to tell."` : `Tobet looks north a while longer. "I don't know," he says. "I don't know if there was anybody to tell."`}

At first light the squad comes back down the bank road into the Landing, the runner with it.`,
      ch:[{t:'Down to the Landing.', onward:true, go:()=>{ startExplore('b5_c3_dock'); talk('b5_c3_noted'); }}]}),
    b5_c3_bank_back:()=>({sp:'The bank road', scene:'b5_c3_greenfire', txt: S.f.b5_c3_bankDone ?
`The bank road goes back south to the Landing.` :
`The bank road goes back south to the Landing. ${NAME(b53Runner())} is somewhere north of here.`,
      ch:[{t:'Down to the Landing.', req:()=>!!S.f.b5_c3_bankDone, onward:true, go:()=>{ startExplore('b5_c3_dock'); talk('b5_c3_noted'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_noted:()=>({sp:'Kraig\'s Landing · dawn', scene:'b5_landing', fx:()=>{ if (!S.f.b5_noted) { S.f.b5_noted = 1; S.f.b5_c3_ph = 3; b5Owe('sgt', 30, 'A runner sent without leave, the regiment\'s book'); } }, txt:
`A Cold Clay officer is waiting on the dock when the squad comes down the bank road, with a provost, and a book of his own, and Finadd Ennic beside him looking as if he would rather be anywhere else on the river.

"The Sixth," the officer says. "A soldier of the Sixth was seen going up the bank road in the night, against the order. The regiment's lines were to be kept." He writes. "A runner sent without leave. The regiment's fine is thirty docks, against the sergeant's line." He looks up. "And the Sixth is noted."

He shows Ennic the line. Ennic reads it, and signs under it, because it is put in front of him, and his hand is very neat and very slow. When the officer has gone he stands on the dock with his book shut.

"Noted," he says. He looks at you, and then at ${NAME(b53Runner())}, and something in his face decides. "Good," he says. And then, more quietly, as if signing it: "I would have sent him too. I would have wanted you to tell me first." He goes back up the dock.${b53If('ammet', `\n\nAmmet puts her hand on ${NAME(b53Runner())}'s shoulder as she goes past, and leaves it there a moment.`)}`,
      ch:[{t:'Dawn.', onward:true, go:'b5_c3_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 3, dawn: the ash, the news, and the road ---- */
    b5_c3_dawn:()=>({sp:B5_FINADD.name, scene:'b5_landing', fx:()=>{ S.f.b5_c3_ph = 3; S.f.b5_c3_dawn = 1; S.f.b5_fentReach = 1; if (!S.f.b5_c3_ashGot) { S.f.b5_c3_ashGot = 1; gain('b5_c3_ash'); } },
      again:()=>`Ennic, with the order. "High Fort, Sergeant."`, txt:
`Dawn at the Landing. The mountains are grey again. In the night something came down out of the sky on the whole Landing, a fine grey dust, faintly green, on the tents and the barges and the dock, and the regiment is sweeping it into the river. ${b53Say({tobet:'Tobet has twisted a pinch of it into a scrap of paper, and gives it to you without saying why. You put it away.', ammet:'Ammet has twisted a pinch of it into a scrap of paper, and gives it to you without saying why. You put it away.', _:'Somebody has twisted a pinch of it into a scrap of brown paper and left it on the clerk\'s crate. You put it away.'})}

Finadd Ennic has a runner's paper in his hand, and has read it more than once.

"From the coast," he says. "Through the regiment. Fent Reach has surrendered. The Atri-Preda, and her garrison, and the town, to the Edur, who came by sea." He looks at the word *surrendered* as if he had spelled it wrong. "The officers are not cheering this morning."

He folds it. "We are released to the battalion. The Sixth goes north to High Fort, the battalion's own station, to wait for it there. With a guide. Today." He considers this. "The battalion's commander can decide things," he says, and seems to find it as restful as he did two days ago, and to know he does not.${S.f.b5_noted ? `\n\nHe does not mention the regiment's book. He has put it in his own, under the line about High Fort, in his neat hand.` : ''}${b5In('ruuk') ? `\n\nRuuk is already at the head of the road. "Not that way," he says, to a Cold Clay sergeant who is pointing. "The map lies. Come."` : ''}`,
      ch:[{t:'"High Fort, Finadd."', onward:true, go:'b5_c3_road'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c3_road:()=>({sp:'The road north · morning', scene:'b5_landing', txt:
`The Sixth Company goes out of Kraig's Landing by the north road in the morning, with its paybooks in the oilskin case, ${b5In('ruuk') ? 'and Ruuk a step ahead' : 'and a Faraed scout from the fire a step ahead, to show it the road'}.

Behind the company the Landing is sweeping itself: the tents, the barges tied three deep, the hostel with its windows dark, the ships at the dock with their banners hanging, and down by the water a heap of boards where a shed was. On the road a merchant's wagons go past the other way, toward the dock, heavy, iron-banded, with their drivers looking at the mountains.${b53Key() === 'watch' ? '\n\nThe Nerek haulers are under the dock, where they always are. The old woman watches the company go.' : `\n\nThe Nerek haulers are under the dock, where they always are. The old woman watches the company go, and lifts one hand, once.`}

${b5In('brune') ? `Brune walks at the back, looking downriver. "It all goes to the sea," she says, to nobody. "All of it."` : b5Waiting('brune') ? 'Brune walks with the company\'s followers at the back, with her fish-spear. The roster at any fire can bring her in.' : ''}${b5Waiting('ruuk') ? `${b5In('brune') || b5Waiting('brune') ? '\n\n' : ''}Ruuk is with the scouts at the head of the column. He is still in the paybook. The roster at any fire can send for him.` : ''}${b53If('tobet', `\n\nTobet walks half a step behind you, as always, cutting a notch in the tally-stick.`)}${b53If('thegg', `\n\nThegg walks in the middle of the road, where the ground is firmest, and talks low to his mother's people's dead, and this morning there are a great many of them.`)}${b53If('perrit', `\n\nPerrit walks with her back to the river until it is out of sight, and then a little further.`)}${b53If('ammet', `\n\nAmmet walks with her roll of tools under her arm and looks at the mountains once, and not again.`)}

You touch the white fingertip on your shield's boss, for the Errant, and take the road.`,
      ch:[{t:'North, to High Fort.', onward:true, go:()=>chapterEnd(3, b53Key() || 'watch')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
