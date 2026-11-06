/* ============ Book Seven, Chapter 2: The File ============ */
/* The Letherii: Book Five's squad of the Sixth Company, Whitefinder Battalion, still in Letheras, some years under the Edur (Reaper's Gale
   ch 1-9 as the barracks hear it; rg-canon §3, W1-W9). The Patriotists under Invigilator Karos Invictad, the loyal and the disloyal; the
   Chancellor between the Emperor and everybody; champions off the Edur fleets (headline); coin short; the Rat Catchers outlawed (rumour);
   the great quarrel between the Patriotists and the Edur after the First Concubine's arrest (barracks talk). Phase 1, night in the barracks
   yard: two Edur on the gate since spring (their "lesson", b7_c2_gate, optional), Finadd Ennic who signs less and reads more, the company
   clerk's second book, the tile-woman, the reading (B7READ[2], back b7_c2_yard). Phase 2, morning on the canal street: the cookshop
   across the lane with its door left open (a neighbour taken in the night), a torn broadsheet, the neighbours who look away (rise:true),
   and Ilsa, a Patriotist clerk who copied the squad's file (b7Join('ilsa')); the trick, the Clerk's Margin. Phase 3, dusk: agents in an
   alley off the canal (b7_c2_alley, main, stage 2); a page of the squad's own file. Phase 4, the next morning in the yard: a Patriotist
   in a grey coat wants a name. The key, S.f.b7_c2_key: 'name' (any name: b7Rise(-1), b7Filed(-1); somebody else's door opens) or
   'refuse' (b7Rise(1), b7Filed(2); the file grows). Phase 5, night: Ennic's copied lists, a page short, carried over a canal bridge where
   enforcers turn out satchels (b7_c2_bridge, harder when b7HeatTier() is noted or worse); home to the fire. Notes: docs/rg-ch2-notes.md. */
/* FOR THE ARTIST (122b): names this file uses.
   Items: ART['item/b7_c2_filepage'], ['item/b7_c2_agentknife'], ['item/b7_c2_greycoat'].
   Figures: ilsa (the recruit), b7_agent (a Patriotist in a grey coat: the engine's agents wear it from this chapter). Reused: b5_c1_ennic,
   b5_c1_clerk, b5_c1_tilewoman, b5_edur (the gate), b5_letherii (the lamplighter), b5_c5_refugee (the neighbour), bruiser (enforcers).
   Backdrops: b7_barracks and b7_letheras (120's, yours), and three this file adds that borrow until you draw them: b7_c2_greymorning (the
   barracks yard by a grey morning), b7_c2_alley (a narrow alley off a canal at dusk, one lamp, a door at its end), b7_c2_bridge (a stone
   canal bridge at night, lanterns at its far end, men in grey turning out a satchel).
   Ground (TILEX, all existing): b5_c1_barracks (the yard: '#' wall, '=' eaves, 'b' bunk-house door, 't' the clerk's table, 'F' the fire,
   '>' the gate), b5_c1_canal (the canal street by day: 's' a stall, 'n' the broadsheet wall, 'D' the cookshop door, ',' the canal steps,
   '-' the kerb, '~' the canal, 'P' a mooring post), b5_c7_canal (the canal at night: '-' the bridge deck, '~' water, 'A' the alley mouth,
   'B' the far end of the bridge). Fights: b5_c1_barracks (the gate), b5_c1_canal (the alley: '#' walls), b5_c1_walk (the bridge: '#' is the
   canal). Battle 't' is cover. */

/* ---- small helpers (b72: Book Seven, Chapter Two) ---- */
const b72L = (id, n) => { if (b7In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b72Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b7In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b72If = (id, s) => b7In(id) ? (typeof s === 'function' ? s() : s) : '';
const b72Who = () => (ROLL() && ROLL().who) || 'sgt';
const b72Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b72Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b72V = (id, you, they) => id === 'sgt' ? you : they;
const b72And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b72Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the first night in the yard, 2 the canal street next morning, 3 dusk and the alley, 4 the morning after (the key), 5 the bridge and home */
const b72Ph = () => S.f.b7_c2_ph || 1;
const b72Key = () => S.f.b7_c2_key || null;
const b72Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b7In(id));
const b72IlsaWaits = () => S.f.b7_ilsaDone === 2 && !b7In('ilsa');
/* who teaches the margin: Ilsa if she walks (or still sits on the steps, waiting to be told where to wait), else Perrit with her sums, else the company clerk */
const b72Teach = () => b7In('ilsa') || (b72Ph() === 2 && b72IlsaWaits()) ? 'ilsa' : b7In('perrit') ? 'perrit' : 'clerk';
/* "wait in a safe room": what b7Join does when six walk, done on purpose */
const b72Wait = () => { S.f.b7_ilsaDone = 2; S.camp = [...new Set([...(S.camp || []).filter(x => x !== 'ilsa'), 'ilsa'])]; S.loy.ilsa ??= 0; S.picks.ilsa ??= []; S.gear.ilsa ??= {};
  note('Ilsa waits in a safe room off the Quillas Canal. The roster at any fire can bring her in.'); save(); };
/* the bridge: four of them when the squad's file is clean, six when it carries a note (b7HeatTier noted or worse: the squad's names are on their list) */
const b72MScene = () => b72Ph() === 2 ? 'b7_letheras' : b72Ph() === 4 ? 'b7_c2_greymorning' : b72Ph() === 3 ? 'b7_c2_alley' : 'b7_barracks';
const b72Hot = () => b7HeatTier() !== 'clean';
const b72Bridge = (o = {}) => startBattle('b7_c2_bridge', Object.assign({}, o, b72Hot() ? {} : {drop:[4, 5]}));

/* ---- the Clerk's Margin: the Line (line, t_line), in a Patriotist clerk's words. A file is read from the margin in, and the agents are
   taught the marks: a hook for take him in, a stroke for the side he favours. Stand where the margin says you will not be, close up, and the
   knife comes at a shoulder that is not there. Not sorcery. The battle half sets B.line as the Line does, so 31's armour and flanking rules
   do the rest. ---- */
Object.assign(TRICKS, {
  b7_c2_margin:{name:'The Clerk\'s Margin', ch:2, use:'fight', ab:'t_b7_c2_margin', where:'Letheras, with a page of the squad\'s own file and someone who knows how it is read',
    lore:'A Patriotist file is read from the margin in. The clerk who copies it marks the margin for whoever acts on it: a stroke for watched, a ring for wanted, a hook for bring him in, and a small tick on the side a man favours, so the agents know which shoulder to come at. The agents are taught the marks and nothing else. They come the way the margin tells them, every time. Know the margin, close up on the side it calls open, and the knife finds a shield.',
    get fx(){ return `Once a fight: the bearer reads the margin aloud, and the bearer and every squadmate beside them close up on the side the file calls open. They take +${3 + lvT()} armour and cannot be flanked until the bearer's next turn. Grows with level. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b7_c2_margin:{name:TRICKS.b7_c2_margin.name, trick:'b7_c2_margin', self:true, desc:()=>TRICKS.b7_c2_margin.fx,
    run(u){ B.line = {u, turn:B.turn}; AUDIO.play('sword'); shakeMap();
      const in_ = party().filter(p => lineCovers(p)); in_.forEach(p => { float(p, 'the margin', '#d8d4e4'); sparks(p.x, p.y, 8, '#d8d4e4', .4); });
      blog(`${u.name}: "Hook on the left." ${in_.length > 1 ? `${in_.filter(p => p !== u).map(p => p.name).join(' and ')} close${in_.length > 2 ? '' : 's'} up on the side the file calls open, and the knife meets a shield there. Not sorcery. Paperwork.` : 'Nobody beside to close up with. The margin will have to do it alone.'}`); }},
});

/* ---- the clerk's grey coat: +1 on a Guile check among the people (c.rise) for whoever wears it (Claude's call, the brief's small effect).
   Book Seven only; the edge names itself. ---- */
{ const _ef = edgesFor; edgesFor = function(c, id){ const out = _ef(c, id);
    if (b7On() && c && c.rise && c.check && c.check[0] === 'guile' && id && typeof wears === 'function' && wears(id, 'b7_c2_greycoat')) out.push(['a clerk\'s grey coat: a clerk is not looked at', 1]);
    return out; }; }

/* ---- the Patriotists' agents wear the grey coat drawn for them (122b) from this chapter on; until it is drawn they borrow Book Five's soldier ---- */
if (typeof FIGX !== 'undefined') { FIGX.ilsa ??= (ctx, h, t, o) => (FIGX.b5_c1_clerk || FIGX.b5_letherii || (() => {}))(ctx, h, t, o); FIGX.b7_agent ??= (ctx, h, t, o) => (FIGX.b5_letherii || (() => {}))(ctx, h, t, o); }
if (typeof FOES !== 'undefined' && FOES.b7_agent) FOES.b7_agent.kind = 'b7_agent';
/* ---- borrowed pictures until 122b: three scenes and the three items ---- */
{ const like = {b7_c2_greymorning:'b7_barracks', b7_c2_alley:'b7_letheras', b7_c2_bridge:'b7_letheras'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof ART !== 'undefined') [['b7_c2_filepage', 'b5_c1_receipt'], ['b7_c2_agentknife', 'b5_c1_hookknife'], ['b7_c2_greycoat', 'b5_c2_sealcoat']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Seven's glossary ---- */
GLOSSX.rg.push(
  [2, 'The loyal and the disloyal', 'The Patriotists\' charter, as the broadsheets print it. It draws no line between Edur and Letherii, and the Patriotists decide which side of it anyone stands on.', ()=>!!(S && S.f && S.f.b7_c2_board)],
  [2, 'A margin mark', 'What a Patriotist clerk writes beside a name in a file for the agents who act on it: a stroke for watched, a ring for wanted, a hook for bring him in.', ()=>!!(S && S.f && (S.f.b7_c2_ilsaMet || S.f.b7_c2_marginTried))],
  [2, 'Enforcers', 'The Patriotists\' bullies, big men with weighted clubs who stand behind the agents and are paid by the head.', ()=>!!(S && S.f && (S.f.b7_c2_ph || 0) >= 3)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.rg = ROSTER_FIRES.rg || {}; ROSTER_FIRES.rg[2] = ['b7_c2_fire'];

const B7CH2 = {
  title:'The File', number:'Two',
  intro:{loc:'Letheras', sub:'The Whitefinders\' barracks · night', scene:'b7_barracks', cap:'Lamps in the barracks windows, the canal smell over the wall, and two grey shapes at the gate who are not Letherii.',
    paras:[
`Letheras has had an Emperor for some years now. He is Tiste Edur, he does not leave the palace, and the city has learned to say *the Emperor* quietly and then talk about the price of eels.`,
()=>{ const v = b72Mates().map(id => TPL[id].name);
  return `You are Sergeant {sgt}, Sixth Company, the Whitefinder Battalion, and the Sixth is still in Letheras, in the same barracks by the Quillas Canal, some years older and a good deal more careful. ${v.length ? `${b72And(v)} ${v.length > 1 ? 'are' : 'is'} the squad still. Everybody still owes the purser.` : 'The squad, these days, is you, and you still owe the purser.'}`; },
`The Edur put two of their own on the barracks gate last spring, and nobody asked why. Finadd Ennic signs less than he used to, and reads more. The company clerk has started keeping a second book.`,
`Everything in Lether was always written down. Now somebody reads it.`],
    go:'Into the yard', node:'b7_c2_yard'},

  areas:[
    /* 16 x 12 (b5_c1_barracks, night). . flagstones  # the yard wall  = barrack eaves  b a bunk-house door  t the clerk's table  F the fire  > the gate */
    { id:'b7_c2_barracks', title:'Letheras · the Whitefinders\' barracks', sub:'Night · the yard', hint:'Tap ground to move · tap a figure to talk · the clerk\'s table is west, the gate east', decor:'b5_c1_barracks', dark:true,
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
      walk:'.', triggers:{F:'b7_c2_fire', t:'b7_c2_clerk', b:'b7_c2_bunk', '>':'b7_c2_gate_view'}, start:{x:8, y:7},
      quest:()=> b72Ph() >= 5 ? (S.f.b7_c2_bridgeDone ? 'The fire. The night is the squad\'s, what is left of it.' : 'The lists, over the canal.')
        : !S.f.b7_c2_ennic ? 'Finadd Ennic, under his lamp.' : 'The fire, and then the bunk-houses. Something is happening in the lane tonight.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:12, y:2, node:()=>b72Ph() >= 5 ? 'b7_c2_ennic_eve' : 'b7_c2_ennic', fresh:()=>b72Ph() >= 5 ? !S.f.b7_c2_ennicEve : !S.f.b7_c2_ennic},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:11, y:9, node:()=>'b7_c2_tilewoman', fresh:()=>!S.f.b7_c2_tw},
        {id:'edur', name:'The Edur at the gate', kind:'b5_edur', x:14, y:5, node:()=>'b7_c2_gate_view', show:()=>!S.f.b7_c2_gateDone, fresh:()=>!S.f.b7_c2_gateSeen} ] },

    /* 16 x 12 (b5_c1_canal, day). . paving  , the canal steps  ~ the Quillas Canal  # wall  s an apothecary's barrow  n the broadsheet wall
       D the cookshop's door  - the walk's edge  P a mooring post  < back to the barracks gate  > on along the canal (dusk) */
    { id:'b7_c2_street', title:'Letheras · the canal street', sub:'Morning · the lane by the barracks', hint:'Tap ground to move · tap a figure to talk · the cookshop is the open door', decor:'b5_c1_canal',
      map:[ "################",
            "#.s....n...D...#",
            "<..............>",
            "#..............#",
            "#,,,,,,,,,,,,,,#",
            "#,,,,,,,,,,,,,,#",
            "#..............#",
            "#.P....P....P..#",
            "#--------------#",
            "#~~~~~~~~~~~~~~#",
            "#~~~~~~~~~~~~~~#",
            "################" ],
      walk:'.,-', triggers:{s:'b7_c2_stall', n:'b7_c2_board', D:'b7_c2_door', '<':'b7_c2_to_yard', '>':'b7_c2_to_alley'}, start:{x:2, y:2},
      quest:()=> !S.f.b7_c2_door ? 'The cookshop across the lane. Its door is open.' : !S.f.b7_c2_ilsaMet ? 'A woman in a grey coat on the canal steps, watching the barracks.' : 'Along the canal at dusk. The agents by the eel stall will follow.',
      npcs:[
        {id:'ilsa', name:'A woman in a grey coat', kind:'ilsa', x:9, y:5, node:()=>'b7_c2_ilsa', show:()=>!S.f.b7_c2_ilsaMet || b72IlsaWaits(), fresh:()=>!S.f.b7_c2_ilsaMet},
        {id:'neigh', name:'A neighbour at a window', kind:'b5_c5_refugee', x:13, y:2, node:()=>'b7_c2_neighbours', fresh:()=>!S.f.b7_c2_neighTried},
        {id:'agents', name:'Two men by the eel stall', kind:'b7_agent', x:4, y:6, node:()=>'b7_c2_agents', fresh:()=>!S.f.b7_c2_agents},
        {id:'eel', name:'The eel-seller', kind:'b5_letherii', x:5, y:1, node:()=>'b7_c2_eelseller', fresh:()=>!S.f.b7_c2_eel} ] },

    /* 16 x 12 (b5_c7_canal, night). . setts  # wall  ~ the canal  - the bridge deck  A the alley mouth  B the bridge's far end  P a post
       < west, back toward the barracks */
    { id:'b7_c2_canal', title:'Letheras · along the canal', sub:'Night · the lamps lit', hint:'Tap ground to move · tap a figure to talk · the alley is north, the bridge south over the water', decor:'b5_c7_canal', dark:true,
      map:[ "######A#########",
            "#..............#",
            "<..............#",
            "#..............#",
            "#.P.....-...P..#",
            "~~~~~~~~-~~~~~~~",
            "~~~~~~~~-~~~~~~~",
            "#.P.....-...P..#",
            "#.......B......#",
            "#..............#",
            "#..............#",
            "################" ],
      walk:'.-', triggers:{A:'b7_c2_alley_view', B:'b7_c2_bridge_view', '<':'b7_c2_canal_back'}, start:{x:2, y:2},
      quest:()=> b72Ph() >= 5 ? (!S.f.b7_c2_bridgeDone ? 'The bridge, south over the canal. The battalion office is on the far side.' : 'Back to the barracks.')
        : !S.f.b7_c2_alleyDone ? 'The alley off the canal, north. They are waiting in it.' : 'Back to the barracks before the lamps go out.',
      npcs:[
        {id:'lamp', name:'A lamplighter', kind:'b5_letherii', x:11, y:3, node:()=>'b7_c2_lamplighter', show:()=>b72Ph() === 3, fresh:()=>!S.f.b7_c2_lamp} ] },

    /* 16 x 12 (b5_c1_barracks, day): the same yard by a grey morning, the Patriotist at the gate */
    { id:'b7_c2_yardday', title:'Letheras · the Whitefinders\' barracks', sub:'Morning · a visitor at the gate', hint:'Tap ground to move · tap a figure to talk · the man in the grey coat is waiting', decor:'b5_c1_barracks',
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
      walk:'.', triggers:{F:'b7_c2_fire', t:'b7_c2_clerk', b:'b7_c2_bunk', '>':'b7_c2_yard_gate'}, start:{x:8, y:7},
      quest:()=> !b72Key() ? 'The man in the grey coat, with the Finadd. He wants a word.' : 'The Finadd\'s lists, over the canal at dusk. The gate.',
      npcs:[
        {id:'edur', name:'The Edur at the gate', kind:'b5_edur', x:14, y:5, node:()=>'b7_c2_edur_day', fresh:()=>!S.f.b7_c2_edurDay},
        {id:'pat', name:'A man in a grey coat', kind:'b7_agent', x:11, y:5, node:()=>'b7_c2_patriot', show:()=>!b72Key(), fresh:()=>!b72Key()},
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:12, y:4, node:()=>b72Key() ? 'b7_c2_patriot_after' : 'b7_c2_ennic_day', fresh:()=>!!b72Key() && !S.f.b7_c2_errand} ] } ],

  battles:{
    /* the Edur on the gate test the Sixth's blades: a lesson, not a killing */
    b7_c2_gate:{title:'The barracks gate', style:'b5_c1_barracks', dark:true, open:true, warrenText:'Night at the gate · the shadows lean toward the Edur, a little', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","...t....","........","........","........","....t...","........","........","#......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_edurl',2,1],['b7_edurl',5,1],['b7_edurl',4,2]], xp:150, after:'b7_c2_gate_after',
      preText:()=>`Three of them, not two: a third comes out of the shadow under the gate arch, which none of the squad saw him standing in. They lift their blades together, a lesson about to be given.`},
    /* agents in an alley off the canal: the main fight, two grounds */
    b7_c2_alley:{title:'The alley off the canal', style:'b5_c1_canal', dark:true, warrenText:'Dusk in Letheras · the Holds are quiet, and somebody is counting', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","#......#","#.t..t.#","#......#","##.t..##","#......#","#..t...#","#......#","#......#","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b7_agent',2,1],['b7_agent',5,1],['b7_agent',3,0],['b7_enforcer',4,2],['b7_enforcer',1,3]], xp:240, after:'b7_c2_alley_after',
      preText:()=>`Grey coats at both ends of the alley, and knives that come out of sleeves, and behind the knives the enforcers with their clubs, who are paid by the head and have started counting.`,
      stage2:{title:'The alley\'s end', xp:130,
        text:()=>`The alley is the squad's as far as the bend. Past the bend it opens into a court with one door, and in the door a man in a better grey coat than the others, with a folder under his arm and two more agents and an enforcer, who were waiting to take whoever the first lot brought them.${b72If('thegg', `\n\nThegg turns sideways to get round the bend, as he does for doors. "Behind me," he says.`)}`,
        map:["###.####","#......#","#.t..t.#","........","........","...t....","#......#","........","........","##....##"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b7_agentchief',3,1],['b7_agent',1,2],['b7_agent',6,2],['b7_enforcer',4,3]]} },
    /* enforcers on a canal bridge, turning out satchels. Six when the squad's file carries a note (b72Bridge drops two when it is clean) */
    b7_c2_bridge:{title:'The canal bridge', style:'b5_c1_walk', dark:true, warrenText:'Night on the bridge · the canal below, and the lanterns at the far end', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t..t..","##....##","##....##","##.t..##","##....##","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b7_enforcer',3,1],['b7_enforcer',5,1],['b7_agent',2,0],['b7_agent',6,0],['b7_enforcer',4,0],['b7_agent',1,1]], xp:180, after:'b7_c2_bridge_after',
      preText:()=> b72Hot() ? `There are more of them than there were. The one with the list has your names on it and has stopped pretending otherwise.` : `They want the satchel. The satchel has the Finadd's lists in it, a page short. They do not get the satchel.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b7_c2_filepage:{name:'A page of the squad\'s file', slot:'trinket', role:'any', who:null, stat:{guile:1},
      line:'One page of the Sixth\'s file at the Patriotists, copied in a clerk\'s small upright hand: the squad\'s names, its debts to the dock, where it eats and drinks and with whom, and a column of small marks down the margin that mean something to somebody. Whoever carries it knows what the Patriotists know about them, which helps when lying to them.'},
    b7_c2_agentknife:{name:'A Patriotist\'s sleeve-knife', slot:'weapon', role:'blade', who:null, atk:2, dmg:[1,6,2],
      line:'A thin, plain, very sharp knife that lives in a sleeve on a spring clip and comes out of it faster than seems reasonable. No maker\'s mark. The Patriotists issue them by the crate, and write each one down.'},
    b7_c2_greycoat:{name:'A clerk\'s grey coat', slot:'armour', role:'light', who:null, ac:1,
      line:'A Patriotist clerk\'s grey coat, good wool gone shiny at the elbows, ink on both cuffs, padded at the shoulders against long days at a desk. A clerk is not looked at. Whoever wears it is looked at less, among the people, and lies to them a little easier.'} },

  scenes:{
    b7_c2_greymorning:{loc:'Letheras', sub:'The Whitefinders\' barracks · morning', cap:'The yard by a grey morning, the gate open, and a man in a good grey coat standing in it as if he owned the flagstones.', amb:'explore'},
    b7_c2_alley:{loc:'Letheras', sub:'An alley off the canal · dusk', cap:'A narrow alley between blind walls off the canal, one lamp at the bend, and a door at the end of it that is not locked.', amb:'explore'},
    b7_c2_bridge:{loc:'Letheras', sub:'A canal bridge · night', cap:'A stone bridge over the canal at night, lanterns at its far end, and men in grey turning out a stranger\'s satchel on the parapet.', amb:'explore'} },

  end:{
    name:['A name given', 'In Letheras the Patriotists wanted a name for their file, and the sergeant of the Sixth gave them one. It was not one of the squad\'s. A door by the canal steps stood open the next night, and the squad\'s page went into a drawer, and Lether kept its head a little lower. A clerk who had copied the squad\'s file came to it with what she knew, and the Finadd\'s lists went over the canal a page short.'],
    refuse:['No name', 'In Letheras the Patriotists wanted a name for their file, and the sergeant of the Sixth would not give one. The man in the grey coat wrote something in the margin and thanked the sergeant for the answer, and the squad\'s file grew, and word went round the canal that the Sixth had said no. A clerk who had copied the squad\'s file came to it with what she knew, and the Finadd\'s lists went over the canal a page short.'] },
  endScene:'b7_barracks',
  endCap:()=> b72Key() === 'refuse' ? 'The barracks by night, the Edur at the gate, and a file across the city with a new mark in its margin.' : 'The barracks by night, the Edur at the gate, and a file across the city put away in a drawer.',
  tease:'Next: inland. The Third, the column, night raids on the farms, and a guide who knows the roads the maps leave out.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b7_c2_key === 'name') x.push('The sergeant gave the Patriotists a name. Not one of the squad\'s. A door by the canal steps stood open the next night.');
    if (f.b7_c2_key === 'refuse') x.push('The sergeant gave the Patriotists no name. The squad\'s file grew a mark in its margin.');
    if (f.b7_ilsaDone === 1) x.push(b7In('ilsa') ? 'Ilsa, a clerk who copied the squad\'s file for the Patriotists, walks with the squad now, with her knives.' : 'Ilsa, a clerk who copied the squad\'s file for the Patriotists, walks with the squad.');
    if (f.b7_ilsaDone === 2) x.push('Ilsa, a clerk who copied the squad\'s file for the Patriotists, waits in a safe room off the Quillas Canal.');
    if (f.b7_ilsaDone === 0) x.push('Ilsa, a clerk who copied the squad\'s file for the Patriotists, went out of the city, or tried to.');
    if (f.b7_c2_alleyDone) x.push('Patriotist agents waited in an alley off the canal. They were not there in the morning.');
    if (f.b7_c2_bridgeDone) x.push(`The Finadd's lists went over the canal a page short${f.b7_c2_bridgeHot ? ', past enforcers who had the squad\'s names on their list' : ''}.`);
    if (f.b7_c2_gateDone) x.push('The Edur on the barracks gate gave the squad a lesson, and took one.');
    if (f.b7_c2_marginOk) x.push('The squad learned to read a Patriotist margin.');
    if (f.b7_c2_cook) x.push('The cook across the lane, who fed the Sixth on credit for years, was taken in the night. Her door was left open.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b7_c2_key && (f.b7_c2_key === 'name' ? 'A man in a grey coat wanted a name for the file, and got one. Not one of the squad\'s.' : 'A man in a grey coat wanted a name for the file, and did not get one. He wrote in the margin instead.'),
    f.b7_c2_filepage && 'A page of the squad\'s own file, off a Patriotist captain in an alley: names, debts, where the squad eats. A column of marks down the margin.',
    f.b7_ilsaDone != null && 'Ilsa, a Patriotist clerk, copied the squad\'s file for six years of files and came to the squad with what she knew.',
    f.b7_c2_quarrel && 'The barracks say the Patriotists arrested the First Concubine, and an Edur walked into the Invigilator\'s office and walked out again, and now the Chancellor has his hand bound up.',
    f.b7_c2_board && 'A broadsheet on the canal wall: the loyal and the disloyal, signed at the foot by the Invigilator, Karos Invictad.',
    f.b7_c2_cook && 'The cook across the lane was taken in the night. Her door was left open in the morning.',
    'The Sixth Company is in Letheras still, under Edur eyes, with two of them on the gate.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the first night in the yard ======== */
    b7_c2_yard:()=>{ const ph = b72Ph();
      return {sp:'The barracks yard', scene:ph === 4 ? 'b7_c2_greymorning' : 'b7_barracks', fx:()=>{ S.f.b7_c2_ph = S.f.b7_c2_ph || 1; },
        again:()=> ph === 4 ? 'The yard by daylight, the gate open, the grey coat in it.' : 'The barracks yard under its lamps, the Edur still at the gate.', txt: ph >= 4 ?
`The yard, flagstones and eaves and the canal smell over the wall. ${ph === 4 ? 'By daylight it looks smaller, and the man at the gate makes it smaller still.' : 'Night again. The lamps are lit in the bunk-house windows, and at the gate the two grey shapes have not moved.'}` :
`The barracks yard at night: flagstones, the deep eaves down both sides, lamps in the bunk-house windows, the canal smell coming over the wall. At the gate, where the Sixth's own sentry used to lean and pick his teeth, two grey shapes stand quite still. They have stood there since spring. They do not lean.

Finadd Ennic's lamp is lit under the east eaves. The company clerk is at his table by the west wall with two books open in front of him instead of one. The tile-woman is on her stool by the bunk-house door.${b72Say({perrit:`\n\nPerrit has her back to the wall, as far from the canal side as the yard allows. "They changed the Edur at sunset," she says. "Same two. They just stood somewhere else for a count of three hundred." She does not say how she knows it was three hundred.`, thegg:`\n\nThegg is sitting on the bench by the fire with his knees up near his ears. He nods to you. He keeps his voice low these days, which in Thegg means nobody hears it at all.`, _:''})}`,
        ch:[b7ReadChoice(2),
            {t:'The fire.', go:'b7_c2_fire'},
            {t:'The Finadd.', req:()=>ph < 4, go:'b7_c2_ennic'},
            {t:'Walk the yard.', go:()=>startExplore()}]}; },
    b7_c2_read:()=>b7ReadOffer(2),
    b7_c2_card:()=>b7ReadCard(2),

    /* Finadd Ennic: signs less, reads more. The night's orders, and the barracks' news */
    b7_c2_ennic:()=>({sp:B5_FINADD.name, scene:'b7_barracks', fx:()=>{ S.f.b7_c2_ennic = 1; }, again:()=>'The Finadd, under his lamp, reading. "Keep them in tonight, Sergeant."', txt:
`Finadd Ravel Ennic has a lamp, a table under the eaves, and a stack of paper he is reading instead of signing. He was a neat man when the Sixth came back from the north. He is a neat man still, but older, and his pen lies beside the stack with the cap on.

"Sergeant." He squares the stack. "The Patriotists sent for the company's roll today. Every name, every debt, every lodging, every soldier's next of kin." He lays a hand flat on the paper. "I am to sign it and send it over the canal to the battalion office by the end of the week. I have read it four times. I have never read anything I signed before, you know. I find I do not care for it."

"Keep the squad in the barracks tonight. There are carriages in the lane after dark, lately, and I would rather count heads in the morning than names."`,
      ch:[{t:'"What are the barracks saying, sir?"', go:'b7_c2_ennic_news'},
          {t:'"In the barracks. Yes, sir."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c2_ennic_news:()=>({sp:B5_FINADD.name, scene:'b7_barracks', fx:()=>{ S.f.b7_c2_quarrel = 1; }, txt:
`He looks at the gate before he answers. The grey shapes there do not seem to be listening. They never seem to be.

"That the Patriotists arrested the First Concubine," he says, low. "That nobody has seen her since. That an Edur, the one the Emperor set to watch the Patriotists, walked into the Invigilator's office and walked out again, and that the Chancellor's hand has been in a sling since." He turns the pen over without uncapping it. "The Patriotists and the Edur, Sergeant. I would not care to be between them. I find we are."

"And that the Edur fleets bring back champions from across the seas to fight the Emperor, one after another, and the Emperor dies, and gets up." He almost smiles. "The Chancellor lets nobody near him, so nobody can say otherwise. That is all the barracks know. It is a great deal more than they should."${b72If('perrit', `\n\nPerrit, behind you, says quietly, "Dies and gets up. Every time. The sums on that are very bad for the champions."`)}`,
      ch:[{t:'"In the barracks tonight. Yes, sir."', go:()=>startExplore()}]}),

    /* the company clerk: two books now, and the coin short */
    b7_c2_clerk:()=>{ const day = b72Ph() >= 4, pg = (S.kit || []).includes('b7_c2_filepage');
      return {sp:'The company clerk', scene:day ? 'b7_c2_greymorning' : 'b7_barracks', fx:()=>{ S.f.b7_c2_clerk = 1; }, again:()=>'The company clerk, at his table, with both books open.', txt:
`The company clerk is at his table with the oilskin case at his elbow, as ever, and two books open in front of him, which is new. One is the company's paybook. The other is smaller, and he puts his hand on it when you come up, and then takes the hand away, because he is an honest man and the hand was not.

"The second book is what the Patriotists' clerk copied out of the first," he says. "A woman came for it in the spring. Grey coat, ink to the wrist, very polite. I wrote down everything she copied, so that I would know." He touches his own ink-stained cuff. "We are all clerks, Sergeant. I wanted to know what she knew."

"Also, the coin is short. The purser pays the company in docks that are lighter than last year's and fewer of them, and the market wants more for eels. Where the coin has gone, no one can say. Everybody says anyway."${day && pg && !S.f.b7_c2_marginTried && b72Teach() === 'clerk' ? `\n\nHe looks at the page you have brought out of the alley, and his eyebrows go up. "Margin marks," he says. "I know these. I was made to learn them once, for the audit."` : ''}`,
        ch:[{t:'Ask what the Patriotists\' clerk copied.', check:['wits', 14], req:()=>!S.f.b7_c2_clerkTried,
              edges:id=>[id === 'perrit' && ['a clerk\'s daughter reads another clerk\'s hand', 2], id === 'tobet' && ['he keeps a tally-stick; he knows what a list is for', 1], id === 'pessa' && ['she reads her own ledger line out loud every pay-day', 1], id === 'sgt' && ['you have stood at this table every pay-day for years', 1], id === 'thegg' && ['the clerk is frightened of very large men, even polite ones', -1], id === 'ruuk' && ['he will not look at writing', -1]],
              near:{t:()=>`Yes, but he reads the whole second book out, page by page, every name and debt in the company, and ${b72Nm(b72Who())} ${b72V(b72Who(), 'go', 'goes')} to bed with the Sixth's arithmetic going round: rattled.`, fx:()=>b72Rattle(b72Who())},
              fx:()=>{ S.f.b7_c2_clerkTried = 1; }, go:'b7_c2_clerk_ok', fail:'b7_c2_clerk_no'},
            {t:'The page out of the alley. "What do the marks say?"', req:()=>day && pg && !S.f.b7_c2_marginTried && b72Teach() === 'clerk', go:'b7_c2_margin'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c2_clerk_ok:()=>({sp:'The company clerk', scene:b72Ph() >= 4 ? 'b7_c2_greymorning' : 'b7_barracks', fx:()=>{ S.f.b7_c2_clerkOk = 1; }, txt:
`He turns the small book round so it faces you.

Every soldier in the Sixth, as the paybook has them. And beside some names, not all, a second column the paybook never had: where the soldier drinks, where he eats, who with. The cook across the lane is in it eleven times. The squad's names are beside hers in nine.

"She asked about the cookshop particularly," the clerk says. "She wrote it down twice, as if to be sure." He closes the book. "She did not look happy writing it, Sergeant. For what that is worth. I have been a clerk thirty years. I know what a clerk looks like when she does not like the sum."`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b7_c2_clerk_no:()=>({sp:'The company clerk', scene:b72Ph() >= 4 ? 'b7_c2_greymorning' : 'b7_barracks', txt:
`He begins to explain, and gets as far as the purser's new rate on lamp oil, and then the old rate, and then why the old rate was wrong, and then he looks at the gate and stops.

"Another night, Sergeant," he says. "I would rather not read it aloud with them standing there."`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the tile-woman: still here, still a dock */
    b7_c2_tilewoman:()=>({sp:'The tile-woman', scene:b72Ph() === 4 ? 'b7_c2_greymorning' : 'b7_barracks', fx:()=>{ S.f.b7_c2_tw = 1; }, again:()=>'The tile-woman on her stool, with her bag of tiles. "Still a dock."', txt:
`The tile-woman is older and smaller than she was, which hardly seemed possible, and sits on her stool by the bunk-house door with the bag of oiled cloth in her lap. She spits to one side for manners.

"Still here," she says. "So am I. The Edur don't read tiles, so they leave me be." She jerks her chin at the gate. "Those two have stood there since spring, and in all that time not one of them has bought a reading. No curiosity. That's what's wrong with empires." She pats the bag. "A dock, if you want one. The tiles cost what they cost."${b7In('perrit') ? `\n\n"Or your cadre girl can lay them for nothing," she adds, "and be wrong for free."` : ''}`,
      ch:[b7ReadChoice(2),
          {t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the Edur on the gate, and their lesson */
    b7_c2_gate_view:()=>{ const ph = b72Ph(), done = !!S.f.b7_c2_gateDone, day = ph === 4;
      if (done) return {sp:'The gate', scene:day ? 'b7_c2_greymorning' : 'b7_barracks', txt:
`The two Edur on the gate nod to the squad now, a short grey nod, when it goes in and out. It is more than the rest of the battalion gets.`,
        ch:[{t:'Back to the yard.', go:()=>startExplore()}]};
      return {sp:'The Edur at the gate', scene:'b7_barracks', fx:()=>{ S.f.b7_c2_gateSeen = 1; }, again:()=>'The Edur at the gate, grey and still, watching the yard.', txt:
`Two Tiste Edur stand in the gate arch, one each side, with long blades sheathed at their hips and their hands folded in front of them. Grey as ash in the lamplight. Their faces do not do anything at all.

When you come close the taller one speaks, in good Letherii with the vowels left long. "Sergeant. Your soldiers carry their blades as if they had forgotten what they are for." He unfolds his hands. "We are bored, and you are soft. A lesson, then. Not to the death. To the first one who cannot stand." A pause. "It is permitted. We asked."${b72If('thegg', `\n\nThegg looks at the Edur, and the Edur looks at Thegg, up, which is something Edur are not used to doing.`)}${b72If('ammet', `\n\nAmmet, behind you, says, "Hold still, the lot of you, and let me get my needle out first."`)}`,
        ch:[{t:'"A lesson, then." Take it.', go:()=>startBattle('b7_c2_gate', {})},
            {t:'Make him wait for it, and watch how they stand while he does.', check:['wits', 14],
              edges:id=>[id === 'thegg' && ['he has been watching them since spring', 2], id === 'tobet' && ['a bowman watches feet', 1], id === 'sgt' && ['you have walked past them every night since spring', 1], id === 'ruuk' && ['he watches everything, and grins', 1], id === 'pessa' && ['she is too angry to watch anything', -1]],
              near:{t:()=>`Yes, but the taller one sees ${b72Nm(b72Who())} watching, and is amused, and the lesson begins with ${b72Nm(b72Who())} still looking at the wrong foot. ${b72Nmc(b72Who())}'ll feel it in the fight.`, fx:()=>bruise(b72Who(), bruiseN())},
              go:()=>startBattle('b7_c2_gate', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c2_gate_seen'},
            {t:'"Another night." Decline, politely.', fx:()=>{ S.f.b7_c2_gateDeclined = 1; }, go:'b7_c2_gate_decline'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c2_gate_seen:()=>({sp:'The Edur at the gate', scene:'b7_barracks', txt:
`The taller one smiles for the first time. It does not improve him. "You were counting how we stand," he says. "Good. Now count this."`,
      ch:[{t:'Blades up.', go:()=>startBattle('b7_c2_gate', {surprise:'e'})}]}),
    b7_c2_gate_decline:()=>({sp:'The Edur at the gate', scene:'b7_barracks', txt:
`He inclines his head a finger's width. "Another night," he says. "We are here every night." He folds his hands again, and is a grey shape at a gate once more.`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b7_c2_gate_after:()=>({sp:'The Edur at the gate', scene:'b7_barracks', fx:()=>{ S.f.b7_c2_gateDone = 1; }, txt:
`The last of them goes down on one knee on the flagstones, and stays there, which is the rule they set. Then they get up, all three, slowly, and the taller one wipes his mouth and looks at the blood on his hand with some interest.

"Better," he says. "Not soft. Not good. Better." He bows, a short grey bow from the waist, the first any Edur has given the Sixth. "The Patriotists come to your gate tomorrow, Sergeant. They come to everybody's. We do not stop them. The Emperor's Chancellor says we may not." He turns back to the arch. "We would like to."${b72Say({ammet:`\n\nAmmet is already among the squad with the needle. "Hold still," she says. "An Edur lesson. I'll put it on the bill. Whose bill, I have not decided."`, thegg:`\n\nThegg rolls his shoulder, carefully. "Polite," he says. "For Edur."`, _:''})}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),

    /* the fire: by phase. 1 the yard brazier, night; 2 and 3 the squad is out (talk only); 4 morning, the brazier cold; 5 home, the way on. The games pass wraps this node: keep the id */
    b7_c2_fire:()=>{ const ph = b72Ph();
      if (ph === 2 || ph === 3) return {sp:'The squad', scene:ph === 2 ? 'b7_letheras' : 'b7_c2_alley', txt:
`No fire out here. The squad stands close in a doorway off the canal and talks low, as everybody in Letheras talks now.`,
        ch:[{t:'Talk with the squad.', go:'b7_c2_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      if (ph === 4) return {sp:'The Sixth\'s brazier', scene:'b7_c2_greymorning', txt:
`The brazier in the middle of the yard is cold ash in the morning, and the squad stands round it anyway, out of habit, with the man in the grey coat at the gate behind them.`,
        ch:[{t:'Talk with the squad.', go:'b7_c2_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      const home = ph >= 5, rk = 'b7_c2_rest' + (home ? 5 : 1);
      return {sp:'The Sixth\'s brazier', scene:'b7_barracks', html:risingHTML(),
        again:()=> home ? 'The brazier in the yard, built up again, and the squad round it, home.' : 'The Sixth\'s brazier in the middle of the yard, coals and a kettle.', txt:
`${home ? `The brazier is built up again, and the squad is round it, home, with the gate shut behind them and the Edur on the far side of it. Somewhere across the canal a page of a roll is missing, and a man in a grey coat has not noticed yet.${S.f.b7_ilsaDone === 1 && b7In('ilsa') ? `\n\nIlsa sits a little back from the coals with her grey coat folded on her knees and her hands open on top of it. She looks at the squad round the fire like a file she has not been given yet.` : ''}` : `The Sixth's brazier is in the middle of the yard where it has always been, coals and a kettle and the bench with the split in it. The squad sits round it with its back to the gate, which is not what soldiers do, and does it anyway, so as not to see the gate.`}${b72Say({tobet:`\n\nTobet is cutting a notch in his tally-stick, carefully, by the light of the coals.`, ammet:`\n\nAmmet is rolling bandage, and will not drink tonight, and says so.`, _:''})}`,
        ch:[...(home ? [] : [b7ReadChoice(2)]),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest(home ? 'The squad sleeps the rest of the night through, gate shut. Wounds close, mostly.' : 'The squad sits an hour at the brazier. Wounds close, mostly.'); }, go:'b7_c2_fire_rest'},
            {t:'Talk with the squad.', go:'b7_c2_fire_talk'},
            {t:'Bed. The carriages in the lane can do without you.', req:()=>ph === 1 && !!S.f.b7_c2_ennic, onward:true, go:'b7_c2_bunk'},
            {t:'The night is over. Let it be over.', req:()=>home && !!S.f.b7_c2_bridgeDone, onward:true, go:'b7_c2_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c2_fire_rest:()=>({sp:'The Sixth\'s brazier', scene:'b7_barracks', txt:
`${b72Ph() >= 5 ? 'The rest of the night, then, with the gate shut and the lamps going out one by one in the bunk-house windows.' : 'An hour, then, with the kettle and the coals and the gate at your back.'}

${b72Say({ammet:`Ammet goes round the squad with her roll of tools and her lamp. "Hold still." She stitches what wants it and splints what wants it and does not ask how. "If a god wanted this work," she says, "it could come and hold the lamp."`, perrit:`Perrit goes round the squad with a cup of the kettle each, counting the cups.`, _:'Some of them sleep sitting up. The rest watch the gate without meaning to.'})}${b72If('thegg', `\n\nThegg lies down on the bench, which complains, and talks to his mother's dead under his breath in her tongue, low.`)}${b72If('tobet', `\n\nTobet counts his arrows twice, then sleeps with them.`)}`,
      ch:[{t:'Back to the fire.', go:'b7_c2_fire'}]}),
    b7_c2_fire_talk:()=>{ const late = b72Ph() >= 4, ln = [];
      if (b7In('tobet')) ln.push(late ? `Tobet is turning the tally-stick over. "Everybody in Letheras has a file," he says. "I always thought nobody would bother with mine. Indebted. A plough I never saw." He puts the stick away. "Turns out they bother. It's nearly flattering."` : `Tobet is looking at the gate from half a step behind you, as ever. "From back here," he says, "the Edur look like they owe me money." He considers. "So does everybody. It's the angle."`);
      if (b7In('thegg')) ln.push(late ? `Thegg is sitting very still. "The cook gave me double," he says, after a while. "Always. She said a big man needs it. She never wrote the second bowl down." He looks at his hands. "I want to know who wrote her down."` : `Thegg has his back against the bench and his eyes on the coals. "My mother's people had a word for men who stand at your door and do not come in," he says. "I will not say it here. They might know it."`);
      if (b7In('perrit')) ln.push(late ? `Perrit is doing sums on her knee with a stick of charcoal. "A file is only a ledger," she says. "Debits, credits, and a balance someone else decides." She rubs a line out. "The Holds don't keep files. They're not gods. They're where the gods were, and nobody wrote anything down there either."` : `Perrit has her back to the wall and her tiles in their calfskin pouch. "The coin's short," she says. "Everyone says so. I counted the company's pay twice. It's short by a seventh, near enough." She frowns. "You do not steal a seventh of an empire's coin. You'd need a very large pocket."`);
      if (b7In('ammet')) ln.push(late ? `Ammet is sharpening a needle on a stone. "I've stitched three Patriotist enforcers this year," she says. "On the battalion's account. They tip." She tests the point. "I didn't ask what they'd been doing. You don't, in my trade. You hold still."` : `Ammet is rolling bandage. "In the old days I'd have a drink before a quiet night," she says. "Now there are no quiet nights. Only ones where nothing happens yet." She ties the roll off. "Hold still, Sergeant. You've got that look."`);
      if (b7In('ruuk')) ln.push(`Ruuk is perched on the wall-end, cheerful, swinging his heels. "In Faraed nobody writes anything down," he says. "We just remember who to throw spears at." He grins. "Simpler. Not better. Simpler."`);
      if (b7In('brune')) ln.push(`Brune has her boots off and her feet on the wet flags by the cistern, as near to water as the yard allows. "The Shore takes everything back," she says, a long while after anyone spoke. "Files too. I would just like it to hurry."`);
      if (b7In('pessa')) ln.push(`Pessa has the boathook upright between her knees. "The Rat Catchers are outlawed," she says. "Did you hear? Outlawed. In Letheras." She snorts. "Who catches the rats now? The Patriotists?" She considers it. "Well. Yes. I suppose they do."`);
      if (b7In('ilsa')) ln.push(late ? `Ilsa sits with her grey coat on her knees. "I used to read files at night," she says. "To get ahead of the next day's copying. I knew everyone in this city by their margins and nobody by their face." She looks round the fire. "I'm trying the faces now. It's slower."` : `Ilsa is reading the squad, one by one, the way she must once have read a page. "You all sit with your backs to the gate," she says. "Interesting. In the file it says you're careless." She almost smiles. "It's wrong. You're tired."`);
      if (b7In('sorvan')) ln.push(`Sorvan is oiling his blue scale. "Officers read files," he says. "Lancers read horses. I know which I'd rather."`);
      return {sp:'The Sixth\'s brazier', scene:b72Ph() === 4 ? 'b7_c2_greymorning' : b72Ph() === 2 ? 'b7_letheras' : b72Ph() === 3 ? 'b7_c2_alley' : 'b7_barracks', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b7_c2_fire'}]}; },

    /* the bunk-houses: the night, and what the lane sounds like */
    b7_c2_bunk:()=>{ const ph = b72Ph();
      if (ph !== 1) return {sp:'The bunk-house', scene:ph === 4 ? 'b7_c2_greymorning' : 'b7_barracks', txt:
`The bunk-house door, and the long room behind it with the Sixth's cots in two rows and the smell of wet wool. ${ph === 4 ? 'Not now. There is a man at the gate.' : 'Later.'}`,
        ch:[{t:'Back to the yard.', go:()=>startExplore()}]};
      if (!S.f.b7_c2_ennic) return {sp:'The bunk-house', scene:'b7_barracks', txt:
`The bunk-house door, lamplit. The Finadd's lamp is lit too, across the yard, and he has been looking for you all evening, the clerk says.`,
        ch:[{t:'Back to the yard.', go:()=>startExplore()}]};
      return {sp:'The bunk-house', scene:'b7_barracks', txt:
`The squad goes in to its cots. The lamps go out along the row.

Some time after the bells, in the lane outside the wall, there are wheels: a carriage, slow, with no lamps, and then the wheels stop. Voices, low and courteous. A door. A woman's voice, once, saying something about her pot on the fire, and a man's, kind, saying it will keep. Then the wheels again, going away.

In the yard the Edur on the gate do not move. In the bunk-house nobody gets up to look, and everybody is awake.${b72If('thegg', `\n\nIn the dark Thegg's cot creaks as he sits up, and then creaks again as he lies down.`)}`,
        ch:[{t:'Morning.', onward:true, fx:()=>{ S.f.b7_c2_ph = 2; }, go:()=>{ startExplore('b7_c2_street'); talk('b7_c2_morning'); }},
            {t:'Not now.', go:()=>startExplore()}]}; },

    /* ======== phase 2: the canal street, next morning ======== */
    b7_c2_morning:()=>({sp:'The canal street', scene:'b7_letheras', txt:
`Morning on the lane by the barracks, which runs down to the canal steps and along the water. Shutters closed in the middle of the day, all down the row, as if there were a storm coming. There is no storm.

Across the lane from the barracks gate the cookshop door is standing open. The cook kept it shut always against the canal flies. It is open now, on an empty room, and nobody on the street is looking at it.${b72Say({tobet:`\n\nTobet looks at the door from half a step behind you. "She fed us on credit," he says. "Four years."`, ammet:`\n\nAmmet looks at the door and then at the street. "Nobody is looking at it," she says. "Everybody is looking at it."`, _:''})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b7_c2_to_yard:()=>({sp:'The barracks gate', scene:'b7_letheras', txt:
`The barracks gate, back up the lane, with the Edur in it. The Finadd wants the squad in by dark. Until then the street is where the answers are, if there are any.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* the cookshop: a neighbour taken in the night */
    b7_c2_door:()=>({sp:'The cookshop', scene:'b7_letheras', fx:()=>{ S.f.b7_c2_door = 1; S.f.b7_c2_cook = 1; }, again:()=>'The cookshop, with its door open on nobody.', txt:
`One room, low, with a hearth at the back and four tables and a bench, and the pot still on its hook over a fire that went out in the night. The chairs are where people pushed them back. There is no sign of a struggle. There would not be. It was courteous.

On the wall by the hearth there is a slate with the Sixth's tab chalked on it, years of it, rubbed out and chalked again, a line for each soldier who ate on credit. The squad's names are on it, in her big round hand. Under the slate is a nail where a book used to hang. The book is gone.${b72If('thegg', `\n\nThegg stands in the doorway, sideways, as he does in every door. He does not come in.`)}${b72If('perrit', `\n\nPerrit looks at the empty nail. "She kept the tab twice," she says. "On the slate for us, and in the book for herself. They took the book."`)}`,
      ch:[{t:'Read the room. What did they come for?', check:['wits', 14], req:()=>!S.f.b7_c2_doorTried,
            edges:id=>[id === 'perrit' && ['she counts what is missing before what is there', 2], id === 'ammet' && ['a surgeon reads a room for what was done in it', 1], id === 'tobet' && ['he ate here more than anyone', 1], id === 'pessa' && ['canal people know a taking when they see one', 1], id === 'thegg' && ['he will not come in', -2]],
            near:{t:()=>`Yes, but ${b72Nm(b72Who())} ${b72V(b72Who(), 'are', 'is')} still in the room when the street starts to notice soldiers in a taken house, and ${b72Nm(b72Who())} ${b72V(b72Who(), 'come', 'comes')} out under every eye on the canal: rattled.`, fx:()=>b72Rattle(b72Who())},
            fx:()=>{ S.f.b7_c2_doorTried = 1; }, go:'b7_c2_door_look', fail:'b7_c2_door_no'},
          {t:'Wipe the Sixth\'s tab off her slate.', req:()=>!S.f.b7_c2_slate, fx:()=>{ S.f.b7_c2_slate = 1; b72L('thegg', 1); b72L('tobet', 1); }, go:'b7_c2_slate'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c2_door_look:()=>({sp:'The cookshop', scene:'b7_letheras', fx:()=>{ S.f.b7_c2_doorRead = 1; }, txt:
`They took the book from the nail and nothing else. Not the coin-box under the counter, which is still there and still has docks in it. Not the good pan. They knew where the book hung.

And somebody sat at the corner table and waited, a long while, while she was made ready to go: there is a ring from a cup, and beside it, on the table's edge, a small neat mark in ink, as if a pen had been tested there. A hook.

The Patriotists did not come for her cooking. They came for who ate it.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b7_c2_door_no:()=>({sp:'The cookshop', scene:'b7_letheras', txt:
`It is a room with a pot in it and nobody. Whatever they came for, they had it when they left. Out in the street a shutter opens a crack across the lane and closes again.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b7_c2_slate:()=>({sp:'The cookshop', scene:'b7_letheras', txt:
`${b72Say({thegg:'Thegg', tobet:'Tobet', _:'You'})} ${b72Say({thegg:'takes', tobet:'takes', _:'take'})} the rag from the hook and wipe${b72Say({thegg:'s', tobet:'s', _:''})} the Sixth's tab off the slate, years of it, line by line, until the slate is grey and clean.

It does not help her. It is not meant to. In Lether a debt is a thing you can stand on, and this one was hers, and now it is nobody's, and that is the only thing in the room anybody can still do anything about.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* the broadsheet: the Patriotists' charter, and chalk under it */
    b7_c2_board:()=>({sp:'A broadsheet', scene:'b7_letheras', fx:()=>{ S.f.b7_c2_board = 1; }, again:()=>'The torn broadsheet on the canal wall, and the chalk rat under it.', txt:
`A broadsheet pasted to the canal wall and half torn off, in the big black type the Patriotists like. *THE LOYAL AND THE DISLOYAL.* Underneath, in smaller type, what every citizen of the empire owes the Emperor and the empire, which is a great deal, and what a loyal citizen tells the Patriotists, which is everything. At the foot, a name: *Karos Invictad, Invigilator.*

The corner where the name was has been torn off, and a new corner pasted over it with the name again.

Below the broadsheet, low on the stones where a child could reach, somebody has chalked a small rat with its tail curled. The Rat Catchers' Guild is outlawed, the clerk said, and gone under the streets. The rat is very well drawn.${b72If('pessa', `\n\nPessa looks at the rat for some time. "Under the streets," she says. "Huh."`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* the neighbours: nobody saw anything (rise:true) */
    b7_c2_neighbours:()=>({sp:'A neighbour', scene:'b7_letheras', again:()=>'The window across the lane, shuttered now.', txt:
`An old man is at the window across the lane from the cookshop, with the shutter open a hand's width. He looks at the squad, and then away, too quickly, and then back, because there is nowhere else on the street to look.

He has lived on the lane for thirty years. He ate at the cookshop, the Sixth's clerk says, every evening of them.`,
      ch:[{t:'Ask him, quietly, who came for her.', check:['guile', 14], rise:true, req:()=>!S.f.b7_c2_neighTried,
            edges:id=>[id === 'tobet' && ['an Indebted boy asking an old man is no threat', 1], id === 'ammet' && ['she stitched his hand last winter', 2], id === 'pessa' && ['she talks canal, and he answers in it', 1], id === 'sgt' && ['you grew up two streets back from the Quillas', 1], id === 'thegg' && ['a very large man at a window frightens anyone', -2], id === 'ilsa' && ['he can smell the Patriotists on her coat', -2]],
            near:{t:()=>`Yes, but ${b72Nm(b72Who())} ${b72V(b72Who(), 'are', 'is')} seen asking, by somebody behind another shutter who also lives on the lane and also eats, and the Patriotists will know by dark who asked.`, fx:()=>{ b7Filed(1, 'someone saw you ask'); }},
            fx:()=>{ S.f.b7_c2_neighTried = 1; }, go:'b7_c2_neigh_ok', fail:'b7_c2_neigh_no'},
          {t:'Leave him be.', go:()=>startExplore()}]}),
    b7_c2_neigh_ok:()=>({sp:'A neighbour', scene:'b7_letheras', fx:()=>{ S.f.b7_c2_neighOk = 1; }, txt:
`He looks up and down the lane before he says anything. Then, through the gap, barely moving his mouth:

"Grey coats. Four, and a carriage with no lamps. Very polite. One of them read her name off a paper as if he were asking her to a wedding. She asked about her pot." He swallows. "They asked her which soldiers ate at her tables. She said all of them. They asked her which ones talked. She said all of them, too." His shutter starts to close. "She was a good cook. She talked. Everybody talks at a good cook's."

The shutter closes. A bar goes across behind it.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b7_c2_neigh_no:()=>({sp:'A neighbour', scene:'b7_letheras', txt:
`"I saw nothing," he says. "I heard nothing. I sleep very well." He closes the shutter, and the bar goes across, and through the wood his voice says, "Very well," once more, as if somebody might be writing it down.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* two men by the eel stall, watching the steps */
    b7_c2_agents:()=>({sp:'Two men by the eel stall', scene:'b7_letheras', fx:()=>{ S.f.b7_c2_agents = 1; }, again:()=>'The two men in grey by the eel stall, eating eels very slowly.', txt:
`Two men in grey coats by the eel stall, eating eels from paper twists very slowly, as men do who have been told to stand somewhere and need a reason. They are watching the canal steps, where a woman in another grey coat is sitting. When the squad comes by they watch the squad instead, pleasantly, and then go back to the steps.

They have been there since the bells, the eel-seller says, in a voice that wants it known he did not say so.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* the eel-seller at the canal steps, who talks: the name the sergeant may give */
    b7_c2_eelseller:()=>({sp:'The eel-seller', scene:'b7_letheras', fx:()=>{ S.f.b7_c2_eel = 1; }, again:()=>'The eel-seller, talking, to everybody, about everything.', txt:
`The eel-seller has his tray of eels at the head of the canal steps and his voice turned up to carry across the water, as it has been every morning for as long as the Sixth has bought his eels, which are not good.

"Champions," he is telling a woman with a basket, and the street, and the canal. "Off the Edur ships, from across the world. One a week, they say. Fights the Emperor, kills the Emperor, and the Emperor gets up." He slaps an eel on the board. "You want to know what I think? I'll tell you what I think." He does. He thinks a great deal, about the Emperor, the Chancellor, the price of salt and the Invigilator's mother, at the top of his voice, with a street of shut shutters listening.

He used to say all of it at the cook's tables too, of an evening. The cook used to tell him to keep it down.`,
      ch:[{t:'Ask about the carriage on the far bank.', go:'b7_c2_carriage'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    b7_c2_carriage:()=>({sp:'The eel-seller', scene:'b7_letheras', txt:
`On the far side of the canal a black carriage with a grey team has stopped at the top of the opposite steps, its curtains drawn. No one gets out, and no one gets in. It simply waits there, as if the street were a page it was reading.

"Ah," says the eel-seller, much more quietly, and then not at all. He looks at his eels. After a while the carriage moves on, and he lets out his breath.

"The Invigilator's," he says, under it. "People say. I never said." Then, louder, to the woman with the basket: "Eels."`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    /* the Edur on the gate, by day, on the Patriotists */
    b7_c2_edur_day:()=>({sp:'The Edur at the gate', scene:'b7_c2_greymorning', fx:()=>{ S.f.b7_c2_edurDay = 1; }, again:()=>'The Edur at the gate, stood aside, watching the grey coat.', txt:
`The two Edur on the gate have stood aside to let the man in the grey coat in, because they were told to, and they are watching him the way a cat watches somebody else's dog.

${S.f.b7_c2_gateDone ? `The taller one, the one who gave the lesson, speaks without turning his head. "That one has a file on our people too, Sergeant. On the Edur. Can you imagine it." He very nearly smiles. "An Edur walked into his master's house and showed him what we think of files. The Chancellor says we may not do it again. The Chancellor has one hand to say it with, now."` : `The taller one glances at you, and then back at the grey coat, and says something in his own tongue to the other one, short and contemptuous. It is not about the Sixth. It is the first thing the Edur on the gate and the Sixth have ever agreed on.`}`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    /* the apothecary's barrow: the coin short */
    b7_c2_stall:()=>({sp:'An apothecary\'s barrow', scene:'b7_letheras', again:()=>'The apothecary\'s barrow. "Six docks. It was four."', txt:
`An apothecary's barrow at the head of the steps, with jars of salve and twists of willow bark and a woman behind it who tells you the price before you ask, because everyone asks.

"Six docks a jar," she says. "It was four last year. Don't look at me. Look at the coin." She holds up a dock to the light, and it is thinner than a dock should be. "Everything's short. The coin's short. The patience is short." She puts the dock away. "Six."`,
      ch:[{t:'A jar of salve.', tag:'6 docks', req:()=>(S.silver || 0) >= 6, fx:()=>{ S.silver -= 6; S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A jar of salve, for six docks.', 'good'); }, go:'b7_c2_stall'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* Ilsa, on the canal steps */
    b7_c2_ilsa:()=>{ if (b72IlsaWaits()) return {sp:'Ilsa', scene:'b7_letheras', txt:
`Ilsa is still on the canal steps, with the grey coat buttoned to the throat, waiting to be told which room. The two men by the eel stall are still eating.`,
        ch:[{t:'"Walk with us, Ilsa."', fx:()=>{ S.f.b7_ilsaDone = null; S.camp = (S.camp || []).filter(x => x !== 'ilsa'); b7Join('ilsa'); b72L('perrit', 1); }, go:'b7_c2_ilsa_join'},
            {t:'Ask her how a file is read.', req:()=>!S.f.b7_c2_marginTried, go:'b7_c2_margin'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'A woman in a grey coat', scene:'b7_letheras', again:()=>'The woman in the grey coat on the canal steps, with her eels.', txt:
`A woman in a grey clerk's coat is sitting on the canal steps below the walk with a paper twist of eels she has not eaten. Ink on both cuffs. Twenty-eight or so, thin, with the stoop of somebody who has spent years at a desk and the eyes of somebody who has spent them reading.

She stands up when she sees the white fingertip on your shield, and does not come closer.

"Sergeant {sgt}," she says. "Sixth Company. You were born two streets back from the Quillas and you swim and you never say so. You owe the purser what you owe him to the dock. You pray to the Errant before everything." She says it as a clerk reads back a line. "I'm sorry. I'm a clerk at the Patriotists. I copy the files. I copied yours."`,
      ch:[{t:'"Go on."', go:'b7_c2_ilsa_file'},
          {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c2_ilsa_file:()=>({sp:'Ilsa', scene:'b7_letheras', fx:()=>{ if (!S.f.b7_c2_ilsaMet) { S.f.b7_c2_ilsaMet = 1; gain('b7_c2_greycoat'); } }, txt:
`"My name is Ilsa." She keeps her voice under the noise of the canal. "Six years in the copying room. Files of the loyal and the disloyal. I never met anyone in one. Then I bought bread from a cook across a lane from a barracks, and she talked, and I liked her, and her file came to my desk the next week."

"I wrote her margin. That's what we do. A mark beside the name for the agents who act on it." She makes a small hook in the air with one finger. "That one means bring her in. Yours has it too, Sergeant. Beside your name. It means they will ask you for a name, tomorrow or the next day. They always ask a soldier for a name. It saves them the work of finding one."

She looks past you at the two men by the eel stall. "They followed me from the headquarters. I didn't go back after the noon bell. They'll want me at dusk, when I go home through the alley off the canal. Or they'll want you, for talking to me." She takes off her coat, and there is another grey coat under it. She holds the top one out. "Take this. A clerk's coat. Nobody looks at a clerk."

"I don't have a plan," she says. "I have what I know. I would like, very much, to stop writing it down."${b72If('perrit', `\n\nPerrit is looking at Ilsa's cuffs. "Oak-gall ink," she says. "The good kind. Government."`)}${b72If('thegg', `\n\nThegg moves without seeming to, until he is between Ilsa and the eel stall.`)}`,
      ch:[{t:'"Then walk with us, Ilsa."', fx:()=>{ b7Join('ilsa'); b72L('perrit', 1); b72L('thegg', 1); }, go:'b7_c2_ilsa_join'},
          {t:'"There\'s a safe room off the Quillas. Wait there."', fx:()=>{ b72Wait(); }, go:'b7_c2_ilsa_wait'},
          {t:'"Get out of the city while you can."', fx:()=>{ S.f.b7_ilsaDone = 0; b72L('thegg', -1); }, go:'b7_c2_ilsa_away'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c2_ilsa_join:()=>({sp:'Ilsa', scene:'b7_letheras', txt:
`${b7In('ilsa') ? `She lets out a breath she seems to have been holding since the noon bell.

"I'll need a knife," she says. "I have a penknife, and a long one I've never used." She considers the squad. "And I'll need to stop reading you all like files. It's a habit. You'll tell me when I do it."${b72If('tobet', `\n\n"You're doing it now," Tobet says, softly, from half a step behind.`)}` : `She nods, and goes to wait off the Quillas: six walk already, and a clerk can count. "When there's room," she says.`}`,
      ch:[{t:'Ask her how a file is read.', req:()=>!S.f.b7_c2_marginTried && (b7In('ilsa') || b72IlsaWaits()), go:'b7_c2_margin'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    b7_c2_ilsa_wait:()=>({sp:'Ilsa', scene:'b7_letheras', txt:
`"A room nobody files," she says. "There are a few. I know three." She buttons the under-coat to the throat. "When you want me, I'll be in the one with the blue shutter. Knock twice and then once. Everybody knocks three times."

She does not move off the steps yet. The two men by the eel stall are still eating.`,
      ch:[{t:'Ask her how a file is read, before she goes.', req:()=>!S.f.b7_c2_marginTried, go:'b7_c2_margin'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    b7_c2_ilsa_away:()=>({sp:'Ilsa', scene:'b7_letheras', txt:
`She looks at you for a while, and then at the canal, and then up the steps toward the gates on the far side of the city.

"Out," she says. "Yes. I'll try." She goes up the steps at a clerk's quick walk, and does not look back, and the two men by the eel stall finish their eels, unhurried, and fold the paper, and do not follow her. They follow the squad with their eyes instead.${b72If('thegg', `\n\nThegg watches her go until she is out of sight, and then a little after.`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* the trick: the Clerk's Margin. Ilsa if she walks (or waits on the steps), else Perrit, else the company clerk, over the page of the file */
    b7_c2_margin:()=>{ const w = b72Teach();
      return {sp:w === 'ilsa' ? 'Ilsa' : w === 'perrit' ? 'Perrit' : 'The company clerk', scene:b72MScene(), again:()=>S.f.b7_c2_marginOk ? 'A margin, and the side it calls open.' : 'The marks in a margin.', txt: w === 'ilsa' ?
`Ilsa takes a stub of charcoal from her cuff and draws on the canal step: a column of names, and down the left of them a column of small marks.

"A stroke means watched. A ring, wanted. A hook, bring in. And this," a tiny tick, top or bottom of the stroke, "is the side he favours. Sword hand, or the side he turns to when he's startled. The agents are taught the marks and nothing else. They don't read the file. They read the margin, and they come at the side it tells them, every time." She rubs the tick out with her thumb. "So you know where the knife is coming. Close up on that side and it meets a shield."` : w === 'perrit' ?
`Perrit takes the page out of the alley and turns it to the light, and reads down the margin with her finger, as she reads a ledger.

"Marks," she says. "Not words. A stroke, a ring, a hook. They're consistent. Someone was taught to make them." Her finger stops at a tiny tick beside Thegg's name, at the bottom of a stroke. "And this is a side. Left or right. Every name has one." She frowns. "They're telling the agents which shoulder to come at. That's what the margin is for."` :
`The clerk takes the page and puts on his spectacles, which he never wears in front of the company.

"Audit marks," he says. "The Patriotists borrowed them from the pursers. Stroke for watched, ring for wanted, hook for bring in. And the tick, top or bottom, for which side the man is to be taken from." He taps the page. "Whoever acts on this comes at the side it says. Every time. They are not paid to think."`,
        ch:[{t:'Learn the marks, all of them, and what they mean for where a knife comes from.', check:['wits', 16], trick:'b7_c2_margin', req:()=>!S.f.b7_c2_marginTried, fx:()=>{ S.f.b7_c2_marginTried = 1; },
              edges:id=>[id === 'ilsa' && ['she made those marks for six years', 3], id === 'perrit' && ['a clerk\'s daughter: ledgers are her mother tongue', 2], id === 'tobet' && ['he keeps a tally-stick, and a tally is a margin', 1], id === 'pessa' && ['she reads her own ledger line out loud every pay-day', 1], id === 'sgt' && ['you have read every page the Finadd ever signed for you', 1], id === 'thegg' && ['he cannot see why anyone writes it down', -1], id === 'ruuk' && ['he will not look at writing', -1], id === 'brune' && ['she is looking at the water, not the page', -1]],
              near:{t:()=>`Yes, but the marks follow ${b72Nm(b72Who())} into sleep that night, a column of strokes and hooks behind the eyes, and ${b72Nm(b72Who())} ${b72V(b72Who(), 'wake', 'wakes')} reading the cracks in the ceiling for which side they favour: rattled.`, fx:()=>b72Rattle(b72Who())},
              go:'b7_c2_margin_ok', fail:'b7_c2_margin_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c2_margin_ok:()=>({sp:'The margin', scene:b72MScene(), fx:()=>{ S.f.b7_c2_marginOk = 1; }, txt:
`By the end of it ${by({sgt:'you can', ilsa:'Ilsa is correcting her own old marks, and', perrit:'Perrit has a table of them drawn in charcoal on her sleeve, and', _:'{who} can'})} read a column of strokes and hooks down a page and say, of every name in it, which way the knife will come.

${b72Teach() === 'ilsa' ? '"Good," Ilsa says. "Now you know more than an agent does. That is not difficult. It is still worth knowing."' : '"There," says the teacher, and squares the page. "Paperwork. It will kill you, or it will save you. Mostly it bores you first."'}`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),
    b7_c2_margin_no:()=>({sp:'The margin', scene:b72MScene(), txt:
`It is a lot of small marks. The stroke and the ring come easily, and then the hook gets confused with the tick, and the side comes out backwards, and by the reckoning of the margin the squad would close up beautifully on the side the knife is not coming from.

"It took me a year," ${b72Teach() === 'ilsa' ? 'Ilsa says' : 'the teacher says'}. "And I was paid for it."`,
      ch:[{t:'Back.', go:()=>startExplore()}]}),

    /* along the canal at dusk */
    b7_c2_to_alley:()=>{ const ok = !!S.f.b7_c2_ilsaMet;
      return {sp:'Along the canal', scene:'b7_letheras', txt: ok ?
`The light goes long and yellow down the canal, and the lamplighters come out with their poles. The two men by the eel stall fold their paper and drop it in the water and walk, unhurried, along the canal toward the alley Ilsa named, as if they had somewhere to be. They do.${b7In('ilsa') ? `\n\nIlsa walks between Thegg's shoulder and the wall. "They'll be at both ends," she says. "They always are. It's in the training."` : `\n\nThe men are not looking at the steps any more. They are looking at the squad.`}` :
`East along the canal, the lamps not lit yet. There is a woman in a grey coat on the canal steps who has been watching the barracks since the bells, and the squad has not yet asked her why.`,
        ch: ok ? [{t:'Along the canal, after them.', onward:true, fx:()=>{ S.f.b7_c2_ph = 3; }, go:()=>{ startExplore('b7_c2_canal'); talk('b7_c2_dusk'); }},
                  {t:'Not now.', go:()=>startExplore()}] :
                 [{t:'Back to the street.', go:()=>startExplore()}]}; },

    /* ======== phase 3: dusk, the alley ======== */
    b7_c2_dusk:()=>({sp:'Along the canal', scene:'b7_c2_alley', txt:
`Dusk on the canal. The lamps are lit along the walk and doubled in the water. Across the canal a stone bridge goes over to the Pursers' quarter, with lanterns at its far end and men in grey at the lanterns, stopping people.

On the near side, between two blind walls, an alley goes north off the canal into the dark, with one lamp at the bend. The two men in grey went into it a little while ago. Neither has come out.${b72Say({tobet:`\n\nTobet has an arrow on the string, held low. "Both ends," he says. "She said."`, ammet:`\n\nAmmet loosens the roll of tools at her belt. "Hold still afterwards," she says. "Whoever's left."`, _:''})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    /* a lamplighter: the one line of the other squad's news, as rumour */
    b7_c2_lamplighter:()=>({sp:'A lamplighter', scene:'b7_c2_alley', fx:()=>{ S.f.b7_c2_lamp = 1; }, again:()=>'The lamplighter, with his pole, going along the canal.', txt:
`A lamplighter is going along the walk with his pole and his little brass flame, lighting the lamps one by one, and talking to them, as lamplighters do, because nobody else will listen.

"My cousin's on a coaster," he says, to a lamp, as the squad passes. "Came in yesterday. Says there were ships burning off the north-west coast, a whole line of them, all at once, foreign ships." He reaches up. "${S.f.b7_c1_key === 'strip' ? 'And one of them burned last, a long while after the rest, as if somebody aboard had forgotten something. ' : ''}The broadsheets say it isn't true." The lamp catches. "My cousin's a liar. But not about ships."`,
      ch:[{t:'Back to the walk.', go:()=>startExplore()}]}),
    b7_c2_canal_back:()=>{ const ph = b72Ph();
      if (ph === 3 && S.f.b7_c2_alleyDone) return {sp:'Along the canal', scene:'b7_c2_alley', txt:
`West along the canal, back to the barracks lane, with the lamps going out behind the squad one by one and the alley quiet.`,
        ch:[{t:'Back to the barracks.', onward:true, go:'b7_c2_night2'},
            {t:'Not now.', go:()=>startExplore()}]};
      if (ph >= 5 && S.f.b7_c2_bridgeDone) return {sp:'Along the canal', scene:'b7_c2_bridge', txt:
`West along the canal, back to the barracks, with the satchel lighter and the night half gone.`,
        ch:[{t:'Home to the barracks.', onward:true, go:'b7_c2_home'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'Along the canal', scene:'b7_c2_alley', txt:
`West, back to the barracks lane. ${ph >= 5 ? 'The Finadd\'s lists are still in the satchel. The bridge is south, over the water.' : 'Not yet. The men in grey are in the alley, and they will not wait there forever.'}`,
        ch:[{t:'Back to the walk.', go:()=>startExplore()}]}; },

    /* the alley: the main fight */
    b7_c2_alley_view:()=>{ const done = !!S.f.b7_c2_alleyDone;
      if (b72Ph() >= 5 || done) return {sp:'The alley', scene:'b7_c2_alley', txt:
`The alley off the canal, with its one lamp at the bend. ${done ? 'Quiet now. The stones have been washed, very thoroughly. Only the Patriotists bother.' : 'Dark.'}`,
        ch:[{t:'Back to the walk.', go:()=>startExplore()}]};
      return {sp:'The alley', scene:'b7_c2_alley', txt:
`The alley goes north between two blind walls, narrow enough that Thegg would have to turn sideways in it, with one lamp at the bend and the dark past it. At the mouth there is a smell of eels and wet stone. Inside, somewhere, a man coughs politely, as a clerk coughs to let you know he is waiting.${b7In('ilsa') ? `\n\nIlsa, at your shoulder: "Two at the mouth, out of the lamp. More at the bend. And whoever sent them, at the end, with the folder. There's always a folder."` : ''}${b72If('thegg', `\n\n"Behind me," Thegg says, and turns sideways, and goes first.`)}`,
        ch:[{t:'"Sixth! In!" Straight down it.', go:()=>startBattle('b7_c2_alley', {})},
            {t:'Over the wall from the canal side, and down on them from above.', check:['guile', 15],
              edges:id=>[id === 'pessa' && ['canal people go over walls from boats all their lives', 2], id === 'ruuk' && ['he climbs anything, grinning', 2], id === 'tobet' && ['a bowman wants height', 1], S.f.b7_c2_marginOk && id === 'sgt' && ['the margin: you know which side they will be watching', 2], id === 'ilsa' && ['she knows where agents stand: it is in the training', 2], id === 'thegg' && ['a very large man on a wall is a very loud man on a wall', -2], id === 'ammet' && ['her knees are forty-one', -1]],
              near:{t:()=>`Yes, but the coping on the canal wall is green with slime, and ${b72Nm(b72Who())} ${b72V(b72Who(), 'come', 'comes')} down off it on ${b72V(b72Who(), 'your', 'a')} hip. ${b72Nmc(b72Who())}'ll be a step slow for a while.`, fx:()=>bruise(b72Who(), bruiseN())},
              go:()=>startBattle('b7_c2_alley', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c2_alley_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c2_alley_seen:()=>({sp:'The alley', scene:'b7_c2_alley', txt:
`A loose stone on the wall-top goes into the canal with a sound like a dropped dock. At the bend the cough stops. Grey coats come out of the dark at both ends together, as if they had rehearsed it, because they have.`,
      ch:[{t:'Blades out.', go:()=>startBattle('b7_c2_alley', {surprise:'e'})}]}),
    b7_c2_alley_after:()=>({sp:'The alley', scene:'b7_c2_alley', fx:()=>{ if (!S.f.b7_c2_alleyDone) { S.f.b7_c2_alleyDone = 1; S.f.b7_c2_filepage = 1; gain('b7_c2_agentknife'); gain('b7_c2_filepage'); } }, txt:
`The court at the alley's end is quiet. The man in the better grey coat is down by his own door, and the folder under his arm has come open on the stones, and the pages in it are the squad's.

Not all of the file. A page of it, copied fair for the man who was to act on it: the squad's names in a small upright hand, every debt to the dock, every place the squad eats and drinks, and down the left of the names a column of small marks. Beside your name, a hook.

It goes in the kit, with one of the thin knives out of their sleeves: no maker's mark, very sharp, and a spring clip to hold it.${b7In('ilsa') ? `\n\nIlsa picks up the page and looks at it for a long time. "That's my hand," she says. "I copied that in the spring." She gives it back. "Keep it. I would only look at it."` : ''}${b72Say({ammet:`\n\nAmmet is among the squad with the needle and the lamp. "Hold still," she says. "And then let's not be here."`, perrit:`\n\nPerrit is counting the grey coats on the stones. "Seven," she says. "They'll miss seven."`, _:''})}`,
      ch:[{t:'Back to the barracks, before anyone misses them.', onward:true, go:'b7_c2_night2'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c2_night2:()=>({sp:'The barracks', scene:'b7_barracks', txt:
`The squad comes back along the canal in the dark, and in at the gate past the Edur, who look at the blood on the squad's sleeves and say nothing about it in either language.

It sleeps badly. In the morning, early, there is a carriage in the lane again, with lamps this time, and a man gets out of it in a good grey coat and walks up to the barracks gate as if he owned the flagstones, and asks the Edur, courteously, for Finadd Ennic.${b7In('ilsa') ? `\n\nIlsa goes into the bunk-house and shuts the door. "I know him," she says through it. "He would know me."` : ''}`,
      ch:[{t:'Out into the yard.', onward:true, fx:()=>{ S.f.b7_c2_ph = 4; }, go:()=>{ startExplore('b7_c2_yardday'); talk('b7_c2_patriot_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 4: the morning after: the key ======== */
    b7_c2_patriot_arrive:()=>({sp:'The barracks yard', scene:'b7_c2_greymorning', txt:
`A grey morning, and the yard looks smaller in it. The man in the grey coat stands in the middle of the flagstones by the cold brazier with Finadd Ennic beside him and two enforcers behind, their hands folded over their clubs. He is looking at the bunk-house windows, one by one, pleasantly, as if counting them.

The Finadd has his pen in his hand and nothing in front of him to sign. When he sees you he lets out a breath.

"Sergeant," he says. "This gentleman would like a word."`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b7_c2_ennic_day:()=>({sp:B5_FINADD.name, scene:'b7_c2_greymorning', again:()=>'The Finadd, beside the man in the grey coat, pen capped.', txt:
`The Finadd stands beside the man in the grey coat with his pen capped, and looks at you, and at the man, and at the pen.

"He wants a word, Sergeant," he says quietly. "With you. Not with me." He seems to find this both a relief and a disgrace. "I would hear it, if I were you. And then I would think very carefully. And then I would think again."`,
      ch:[{t:'Back to the yard.', go:()=>startExplore()}]}),
    b7_c2_patriot:()=>({sp:'The Patriotist', scene:'b7_c2_greymorning', html:risingHTML(), again:()=>'The man in the grey coat, waiting, with his folder.', txt:
`He is a pleasant man of middle years in a good grey coat, and he has a folder under his arm of the kind clerks carry, tied with a grey tape. His shoes are very clean.

"Sergeant {sgt}." He knows the name without looking. "The cookshop across the lane. The woman who fed your squad on credit for four years." He sighs, as at a pity. "She talked against the Emperor at her own tables, and named soldiers of the Sixth among those who listened." He opens the folder a hand's width, enough to show your name in a clerk's upright hand with a small mark beside it, and closes it again.

"Her file is closed now. Yours could be. The Invigilator asks only for a name. Whoever else sat at her tables and talked. Anyone. Then the matter is settled, and your page goes in a drawer, and the drawer stays shut." He smiles. It is a professional's smile, not unkind. "Seven of my colleagues did not come home last night, Sergeant. I do not ask you about that. You see how reasonable I am being."${b7In('ilsa') ? `\n\nBehind the bunk-house door, Ilsa has stopped moving.` : ''}${b72If('thegg', `\n\nThegg has stopped talking. In Thegg that is loud.`)}${b72If('perrit', `\n\nPerrit is doing a sum under her breath. You can see her lips moving. You can guess the sum.`)}`,
      ch:[{t:'Give him a name. Any name. Not one of yours.', fx:()=>{ if (!S.f.b7_c2_key) { S.f.b7_c2_key = 'name'; b72L('thegg', -1); b72L('tobet', -1); b72L('perrit', 1); b72L('ilsa', -1); b7Rise(-1, 'the Sixth gave the Patriotists a name'); b7Filed(-1, 'a name given'); } }, go:'b7_c2_name'},
          {t:'"No name, sir."', fx:()=>{ if (!S.f.b7_c2_key) { S.f.b7_c2_key = 'refuse'; b72L('thegg', 1); b72L('tobet', 1); b72L('perrit', -1); b72L('ilsa', 1); b7Rise(1, 'the Sixth refused the Patriotists a name'); b7Filed(2, 'no name given'); } }, go:'b7_c2_refuse'},
          {t:'Not yet. "Give me a moment, sir."', go:()=>startExplore()}]}),
    b7_c2_name:()=>({sp:'The Patriotist', scene:'b7_c2_greymorning', html:risingHTML(), txt:
`You give him a name. Not one of yours. The eel-seller at the head of the canal steps, who sold the Sixth bad eel for three summers and talked, loudly, at the cook's tables among others, about everything. It comes out easier than it should.

He writes it down in a small neat hand, and blots it on his sleeve, and thanks you. "There," he says. "Settled." He ties the grey tape round the folder in a bow. "Your page goes in a drawer, Sergeant. I shall shut it myself." He nods to the Finadd, and to you, and to the bunk-house windows, and goes out past the Edur with the enforcers behind him.

The yard is quiet for some time.${b72Say({thegg:`\n\nThegg gets up and goes into the bunk-house, sideways, and shuts the door behind him very gently.`, tobet:`\n\n"From back here," Tobet says, quietly, "that looked easy." It is not a compliment.`, _:''})}${b72If('perrit', `\n\nPerrit closes her eyes. "The sum was right," she says. "I hate that it was right."`)}`,
      ch:[{t:'The Finadd.', go:'b7_c2_patriot_after'}]}),
    b7_c2_refuse:()=>({sp:'The Patriotist', scene:'b7_c2_greymorning', html:risingHTML(), txt:
`"No name, sir."

He waits, in case you might go on. When you do not, he opens the folder again, and takes a pen from his coat, and makes a small mark in the margin beside your name. It takes no time at all.

"Thank you, Sergeant," he says. "That is also an answer." He ties the grey tape round the folder in a bow. "We will speak again. I expect we will speak a great deal." He nods to the Finadd, and goes out past the Edur with the enforcers behind him, and the Edur on the gate watch him go, and the taller of them turns his head and spits, neatly, on the flagstone where the man stood.

By noon the lane knows the Sixth said no. By dusk the canal does.${b72Say({thegg:`\n\nThegg lets out a long breath. "Good," he says. Just that.`, tobet:`\n\nTobet cuts a notch in his tally-stick. He does not say what it is for.`, _:''})}${b72If('perrit', `\n\nPerrit is pale. "That's two marks," she says. "In a margin, two is a column."`)}`,
      ch:[{t:'The Finadd.', go:'b7_c2_patriot_after'}]}),
    b7_c2_patriot_after:()=>({sp:B5_FINADD.name, scene:'b7_c2_greymorning', fx:()=>{ S.f.b7_c2_errand = 1; }, again:()=>'The Finadd. "The battalion office, Sergeant. Over the bridge. At dusk."', txt:
`The Finadd watches the gate for a while after the carriage has gone. Then he takes a sheaf of paper out of his coat and holds it out: the company's roll, every name, every debt, every lodging, copied fair in his own neat hand.

"For the battalion office, over the canal, by tonight," he says. "As ordered." He does not let go of it at once. "I copied it myself. I am a careful copyist. I left a page out." He lets go. "The page with your squad on it, Sergeant. I should think nobody will notice for a week. The Patriotists are very busy."

He looks at his pen, capped. "I have never decided anything in my life," he says. "I find it is easier than I was told."${b72Key() === 'name' ? `\n\n"They have your name in a drawer," he adds. "Let us keep it there."` : `\n\n"They will come for that page," he adds. "Let them find it missing."`}${b7In('ilsa') ? `\n\nIlsa comes out of the bunk-house and stands by the brazier. "He'll be back," she says, of the man in grey. "He always comes back. It's the only thing he's good at."` : ''}`,
      ch:[{t:'The page out of the alley. What does its margin say?', req:()=>!S.f.b7_c2_marginTried && (S.kit || []).includes('b7_c2_filepage'), go:'b7_c2_margin'},
          {t:'"Over the bridge at dusk. Yes, sir."', go:()=>startExplore()}]}),
    b7_c2_yard_gate:()=>{ const ok = !!S.f.b7_c2_errand;
      return {sp:'The gate', scene:'b7_c2_greymorning', txt: ok ?
`The gate, and the lane past it, and the canal. ${S.f.b7_c2_gateDone ? 'The Edur nod as the squad goes by.' : 'The Edur watch the squad go by, grey and still.'} The battalion office is over the bridge to the Pursers' quarter. The Finadd's lists are in the satchel, a page short. Dusk is coming.` :
`The gate. ${!b72Key() ? 'The man in the grey coat is still in the yard, waiting for his word.' : 'The Finadd has something to give you first.'}`,
        ch: ok ? [{t:'Out along the canal at dusk, with the lists.', onward:true, fx:()=>{ S.f.b7_c2_ph = 5; }, go:()=>{ startExplore('b7_c2_canal'); talk('b7_c2_bridge_dusk'); }},
                  {t:'Not now.', go:()=>startExplore()}] :
                 [{t:'Back to the yard.', go:()=>startExplore()}]}; },

    /* ======== phase 5: the bridge, and home ======== */
    b7_c2_bridge_dusk:()=>({sp:'Along the canal', scene:'b7_c2_bridge', txt:
`Dusk again, and the lamps along the walk, and the alley off the canal with its stones washed clean.

${b72Key() === 'name' ? `On the way the squad passes the head of the canal steps, where the eel-seller's stall is. It is shut. The shutter is down and the stool is gone, and past it the door of the house behind is standing open on an empty room, and nobody on the walk is looking at it.` : `On the way the squad passes the head of the canal steps. An old woman at the eel stall looks at the white fingertips on the squad's shields and, without a word, puts a twist of eels in ${b72Say({thegg:'Thegg\'s', tobet:'Tobet\'s', _:'your'})} hand, and will not take a dock for it.`}

South across the canal the bridge to the Pursers' quarter has its lanterns lit at the far end, and men in grey at the lanterns, and enforcers, turning out satchels on the parapet.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b7_c2_bridge_view:()=>{ const ph = b72Ph(), hot = b72Hot();
      if (ph < 5) return {sp:'The bridge', scene:'b7_c2_bridge', txt:
`The stone bridge over to the Pursers' quarter, with lanterns at its far end and men in grey at the lanterns, stopping people, looking at faces, writing things down. The squad has no business over it tonight.`,
        ch:[{t:'Back to the walk.', go:()=>startExplore()}]};
      if (S.f.b7_c2_bridgeDone) return {sp:'The bridge', scene:'b7_c2_bridge', txt:
`The bridge, empty now, its lanterns guttering. The battalion office on the far side has the Finadd's lists, a page short, in a clerk's tray, and the clerk has gone home.`,
        ch:[{t:'Back to the walk.', go:()=>startExplore()}]};
      return {sp:'The bridge', scene:'b7_c2_bridge', html:risingHTML(), fx:()=>{ S.f.b7_c2_bridgeHot = hot ? 1 : 0; }, txt:
`The far end of the bridge, and the lanterns, and the men in grey. Four enforcers and their agents, turning out satchels on the parapet, holding papers to the lantern, looking at faces and then at a list. A porter goes through with his pack emptied on the stones. A woman goes through with her basket.

${hot ? `The agent with the list looks at the squad, and at the list, and at the squad again, and folds the list, and puts it in his coat. Your names are on it now. Two more grey coats come out of the lantern-light from the far side and stand behind the others. They were waiting.` : `They have a list, and the squad's faces mean nothing to them yet: your file is a file nobody reads. But they are turning out every satchel, and the Finadd's lists are in yours, a page short, and the page that is missing has the squad's names on it, and a sharp clerk can count.`}${b7In('ilsa') ? `\n\nIlsa, low: "${hot ? 'They\'ve read the margin. They\'ll come at your left, Sergeant.' : 'They don\'t know us. They\'ll still open the satchel. They open everything.'}"` : ''}`,
        ch:[{t:'"Sixth! Through them!" Straight over.', go:()=>b72Bridge({})},
            {t:'Walk up to them as clerks of the battalion, papers out, and take them at the parapet.', check:['guile', 15], rise:true,
              edges:id=>[id === 'ilsa' && ['she has walked past agents in that coat for six years', 2], id === 'perrit' && ['she can talk like a purser\'s clerk, because her mother was one', 1], id === 'pessa' && ['she has lied to canal wardens all her life', 1], id === 'sgt' && ['you have the Finadd\'s seal on the lists', 1], id === 'thegg' && ['nobody believes a clerk that size', -2], id === 'ruuk' && ['he grins, and clerks do not grin', -1]],
              near:{t:()=>`Yes, but the agent with the list takes the papers out of ${b72Nm(b72Who())}'s hand and reads the first line before ${b72Nm(b72Who())} can move, and gets an elbow into ${b72V(b72Who(), 'your', 'a')} ribs for it, and gives one back. ${b72Nmc(b72Who())}'ll carry that into the next fight.`, fx:()=>bruise(b72Who(), bruiseN())},
              go:()=>b72Bridge(nearMiss() ? {} : {surprise:'p'}), fail:'b7_c2_bridge_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c2_bridge_seen:()=>({sp:'The bridge', scene:'b7_c2_bridge', txt:
`"Papers," says the agent, and holds out a hand, and looks at the hand that gives them, and at the Whitefinder boss on the shield behind it. "Sixth Company," he says, pleasantly. "We have heard about the Sixth." The enforcers unfold their hands.`,
      ch:[{t:'Blades out.', go:()=>b72Bridge({surprise:'e'})}]}),
    b7_c2_bridge_after:()=>({sp:'The bridge', scene:'b7_c2_bridge', fx:()=>{ S.f.b7_c2_bridgeDone = 1; }, txt:
`The bridge is the squad's. The enforcers who could run have run, over to the Pursers' quarter, shouting for the watch, which in this part of Letheras takes a long time to come and is not paid enough to hurry.

The battalion office is a dark doorway on the far side with a slot in it. The Finadd's lists go through the slot, a page short, and drop into a clerk's tray with a soft sound, as of a drawer shutting.${b7In('ilsa') ? `\n\nIlsa watches the slot. "A clerk will copy that tomorrow," she says. "A clerk like me. They won't notice the page. They'll notice the Finadd's hand. It's very neat."` : ''}${b72Say({tobet:`\n\nTobet retrieves his arrows from the parapet, one by one, and counts them twice. "All there," he says. "Unlike the page."`, thegg:`\n\nThegg leans on the parapet and looks down at the canal for a while. "Behind me, going home," he says.`, _:''})}`,
      ch:[{t:'Home to the barracks.', onward:true, go:'b7_c2_home'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c2_home:()=>({sp:'The barracks', scene:'b7_barracks', txt:
`In at the gate, past the Edur, who look at the squad's sleeves again and this time, the taller one, say something short in their own tongue that might be *again* and might be *good*.

The yard is dark but for the brazier, built up, and the Finadd's lamp, which is lit, and under which the Finadd is reading.${b72Key() === 'refuse' ? ' He looks up when the squad comes in, and nods, and goes back to reading. He is reading your file. The page he left out of the roll.' : ' He looks up when the squad comes in, and nods, and goes back to reading.'}`,
      ch:[{t:'The fire.', onward:true, go:()=>{ startExplore('b7_c2_barracks'); talk('b7_c2_fire'); }},
          {t:'Not now.', go:()=>startExplore('b7_c2_barracks')}]}),
    /* the Finadd at night, at the end */
    b7_c2_ennic_eve:()=>({sp:B5_FINADD.name, scene:'b7_barracks', fx:()=>{ S.f.b7_c2_ennicEve = 1; }, again:()=>'The Finadd under his lamp, reading the page he left out.', txt:
`The Finadd is reading the page he left out of the roll: the squad's names, in his own neat hand.

"I signed a great many things, Sergeant," he says, without looking up. "Before. For years. I never read them. I thought that made it somebody else's doing." He turns the page over, and there is nothing on the back. "It does not. I know that now. It is a very late thing to learn."

"Go to bed. I will keep this one." He folds the page in four and puts it inside his coat, over his heart, which is not where a Finadd keeps paper.`,
      ch:[{t:'"Good night, sir."', go:()=>startExplore()}]}),

    /* the end: the night, and on */
    b7_c2_onward:()=>({sp:'The barracks', scene:'b7_barracks', html:risingHTML(), txt:
`The lamps go out along the bunk-house row. The canal smell comes over the wall. At the gate the Edur stand as they have stood since spring, and in the lane beyond them there are no wheels tonight, or none that stop.

${b72Key() === 'refuse' ? `Across the city, in a building nobody in the squad will ever see the inside of, there is a file with the Sixth's names in it and two marks in its margin now. It will be read in the morning, and copied.` : `Across the city, in a building nobody in the squad will ever see the inside of, there is a drawer with the Sixth's page in it, shut. And by the canal steps there is a door standing open that was shut yesterday.`}${b7In('ilsa') ? `\n\nIlsa sleeps in a borrowed cot at the end of the row with her grey coat over her for a blanket, and her hand open on top of it. She sleeps like somebody who has not slept in a while, and means to make up for it.` : ''}${b72Say({thegg:`\n\nIn the dark, low, Thegg talks to his mother's dead in her tongue. Tonight there is one more name in it, and it is the cook's.`, _:''})}`,
      ch:[{t:'Sleep. The city will still be watching in the morning.', onward:true, go:()=>chapterEnd(2, b72Key() || 'refuse')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
