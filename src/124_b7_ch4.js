/* ============ Book Seven, Chapter 4: The Muster ============ */
/* The Letherii: Book Five's squad of the Sixth Company, Whitefinder Battalion, mustered out of Letheras with what is left of the home army
   (Reaper's Gale ch 15-20 as the lines hear it; rg-canon §3, correction 6; W15-W20). The Patriotists and the Edur at war in all but name;
   the Emperor's father and mother in the Chancellor's keeping (headline); the Awl'dan war a thousand leagues east (news only); "five
   armies" gone east, so the army left at home is thin; the home army raised against the invaders; the commanders' camp on Kravos Hill,
   where Hanradi Khalag's Edur hold the hill's shoulder and do not sit with the Letherii. Phase 1, dusk in the Whitefinders' lines below the
   hill: the Sixth's tent (the reading, B7READ[4], the Wall), Finadd Ennic's orders, the clerk's muster roll, the tile-woman, Edur down
   from the hill to see what Lether has left (b7_c4_edurcamp, optional). Phase 2, the muster gate by day: the battalions counted at tables,
   a Patriotist table among them, a crowd of levies' families at the palisade that does not want to be an army (b7_c4_riot), and Sorvan, a
   Bluerose lancer left behind (b7Join('sorvan')). Phase 3, night at the horse lines: the trick (Bluerose Horse-Sense), the Indebted grooms
   (rise:true), the provost's wagon, and Patriotist agents come for a name on the squad's list (b7_c4_patriots, main, stage 2); if
   b7Wanted(), the arrest branch first (the sergeant in the wagon; out by Ilsa, Sorvan, a check, or Ennic's signature; never a cell). The
   key at the Sixth's fire, S.f.b7_c4_key: 'edur' (serve under Edur eyes: b7Rise(-1), b7Filed(-1)) or 'letherii' (join the Letherii
   officers who want the Edur gone: b7Rise(1), b7Filed(1)). Phase 4, dawn. Notes: docs/rg-ch4-notes.md. */
/* FOR THE ARTIST (124b): names this file uses.
   Items: ART['item/b7_c4_bluelance'], ['item/b7_c4_bluescale'], ['item/b7_c4_musterbadge'].
   Figures: sorvan (the recruit: blue-enamelled scale over a riding coat, a cut-down lance, a sabre). Reused: b5_c1_ennic, b5_c1_clerk,
   b5_c1_tilewoman, b5_edur (the Edur from the hill), b5_letherii (the press-gang's sergeant, the captain, the provost, a sutler), bruiser
   (enforcers), b7_agent, b5_c5_refugee (a groom, the crowd).
   Backdrops: b7_kravos (120's, yours), and three this file adds that borrow until drawn: b7_c4_tent (the Sixth's tent at night, a lantern on
   the pole, a blanket on the floor), b7_c4_gate (the muster gate by day: a palisade, tables under awnings, a crowd beyond the gate),
   b7_c4_horselines (the horse lines at night: picketed remounts, a lantern, the provost's wagon with a barred door).
   Ground: TILEX.b7_c4_lines (this chapter's, in 124b: b5_c6_lines plus 'H' a horse picket, 'w' the provost's wagon, '^' the hill road with
   the banners above; '=' tents, 'F' the fire), b5_c6_dissent (the muster gate: '#' the palisade, '.' the road, 'c' a cart, 'G' the gate,
   't' the tables, 's' a sutler's cart). Fights: b5_c6_dissent (the gate), b7_c4_lines (the Edur, the horse lines). Battle 't' is cover. */

/* ---- small helpers (b74: Book Seven, Chapter Four) ---- */
const b74L = (id, n) => { if (b7In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b74Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b7In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b74If = (id, s) => b7In(id) ? (typeof s === 'function' ? s() : s) : '';
const b74Who = () => (ROLL() && ROLL().who) || 'sgt';
const b74Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b74Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b74V = (id, you, they) => id === 'sgt' ? you : they;
const b74And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b74Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 dusk in the lines below Kravos Hill, 2 the muster gate by day, 3 night (the lines, the horse lines, the key), 4 dawn */
const b74Ph = () => S.f.b7_c4_ph || 1;
const b74Key = () => S.f.b7_c4_key || null;
const b74Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b7In(id));
const b74SorvanWaits = () => S.f.b7_sorvanDone === 2 && !b7In('sorvan');
/* the name on the Patriotists' list for the squad (Chapter 2's key): on 'refuse', or unset, the sergeant's own, with its two marks; on
   'name', Ilsa if she walks (a clerk who walked out of the copying room), else the first of the squad the eel-seller named back */
const b74List = () => { if (S.f.b7_c4_listName) return S.f.b7_c4_listName;
  if (S.f.b7_c2_key !== 'name') return 'sgt'; if (b7In('ilsa')) return 'ilsa';
  return ['thegg', 'tobet', 'ammet', 'perrit', 'pessa', 'ruuk', 'brune', 'sorvan'].find(b7In) || 'sgt'; };
const b74ListNm = () => { const w = b74List(); return w === 'sgt' ? 'your name' : `${NAME(w)}'s name`; };
/* who teaches Horse-Sense: Sorvan if he walks or waits at the horse lines, else Ruuk, else Tobet, else an old groom of the lines */
const b74Teach = () => b7In('sorvan') || b74SorvanWaits() ? 'sorvan' : b7In('ruuk') ? 'ruuk' : b7In('tobet') ? 'tobet' : 'groom';
const b74TeachNm = () => ({sorvan:'Sorvan', ruuk:'Ruuk', tobet:'Tobet', groom:'The old groom'})[b74Teach()];
/* "wait at the horse lines": what b7Join does when six walk, done on purpose */
const b74Wait = () => { S.f.b7_sorvanDone = 2; S.camp = [...new Set([...(S.camp || []).filter(x => x !== 'sorvan'), 'sorvan'])]; S.loy.sorvan ??= 0; S.picks.sorvan ??= []; S.gear.sorvan ??= {};
  note('Sorvan waits at the Bluerose horse lines. The roster at any fire can bring him in.'); save(); };
const b74Scene = () => ({1:'b7_kravos', 2:'b7_c4_gate', 3:'b7_c4_horselines', 4:'b7_kravos'})[b74Ph()];

/* ---- Bluerose Horse-Sense: the Rhivi Spirit-Song (song, t_song), in a Bluerose lancer's words. A horse line that panics kills more riders
   than the enemy does, and Bluerose grooms are taught to bring one back: a hand flat on the neck, the low count the horse-masters use, the
   water-bottle and the leech's salve every lancer carries. It works on soldiers. Not sorcery. Once a fight: every squadmate within 4 heals
   1d6+2 and 1 more for each squad level past the first, wakes from any daze, and steps out of any fire under them. ---- */
Object.assign(TRICKS, {
  b7_c4_horse:{name:'Bluerose Horse-Sense', ch:4, use:'fight', ab:'t_b7_c4_horse', where:'the horse lines below Kravos Hill, at night, with the remounts gone wild',
    lore:'A horse line that panics kills more riders than any enemy does, and in Bluerose every groom is taught to bring one back before it breaks: walk in slow, a hand flat on the neck, the horse-masters\' low count that has no words in it, water from the bottle, the leech\'s salve on whatever is bleeding, and never once look frightened. Lether bought the horses and the grooms and never asked how it was done. It works on soldiers, who are not so different, when the line is about to go.',
    fx:'Once a fight: the bearer walks the line the Bluerose way, a hand on each shoulder, the low count, water and salve. Every squadmate within 4 heals 1d6+2, and 1 more for each squad level past the first, wakes from any daze, and steps out of any fire under them. Not sorcery.'},
});
Object.assign(AB, {
  t_b7_c4_horse:{name:TRICKS.b7_c4_horse.name, trick:'b7_c4_horse', self:true, desc:()=>TRICKS.b7_c4_horse.fx,
    run(u){ AUDIO.play('heal'); const near = party().filter(p => !p.ally && cheb(p, u) <= 4);
      near.forEach(p => { heal(p, roll(1, 6, 2 + lvB())); if (p.stun) { p.stun = false; float(p, 'steadied', '#9fb8e0'); } B.fires = B.fires.filter(f => !(f.x === p.x && f.y === p.y)); putOut(p); sparks(p.x, p.y, 10, '#a8bce0', .35); });
      blog(`${u.name} walks the line the Bluerose way, slow, a hand flat on each shoulder, counting low under the noise, the water-bottle going round ${near.length > 1 ? 'the squad' : 'nobody but ' + u.name} and the leech's salve after it. Not sorcery. Grooming.`); }},
});

/* ---- borrowed pictures until 124b: the figure, three scenes, the ground and the three items ---- */
if (typeof FIGX !== 'undefined') FIGX.sorvan ??= (ctx, h, t, o) => (FIGX.b5_letherii || (() => {}))(ctx, h, t, o);
{ const like = {b7_c4_tent:'b7_barracks', b7_c4_gate:'b7_kravos', b7_c4_horselines:'b7_kravos'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b7_c4_lines ??= (...a) => (TILEX.b5_c6_lines || (() => {}))(...a);
if (typeof ART !== 'undefined') [['b7_c4_bluelance', 'b5_c3_spear'], ['b7_c4_bluescale', 'b5_c5_girth'], ['b7_c4_musterbadge', 'b5_c5_girth']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Seven's glossary ---- */
GLOSSX.rg.push(
  [4, 'The levies', 'What the army calls the Indebted and the poor brought in by the press-gangs to fill the home army: roped at the wrists on the road, untied at the muster gate, given a spear.', ()=>!!(S && S.f && (S.f.b7_c4_ph || 0) >= 2)],
  [4, 'A muster badge', 'A lead tag stamped at the muster tables and hung round a soldier\'s neck: the battalion\'s mark, and over it the Edur\'s. A soldier with a badge is where the army says.', ()=>!!(S && S.f && S.f.b7_c4_badge)],
  [4, 'The provost\'s wagon', 'The camp lockup: a wagon with a barred door and a bench, a tired provost and a lantern. Whoever is in it in the morning is somebody else\'s problem.', ()=>!!(S && S.f && (S.f.b7_c4_ph || 0) >= 3)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.rg = ROSTER_FIRES.rg || {}; ROSTER_FIRES.rg[4] = ['b7_c4_fire'];

/* the reading: the Sixth's tent in the Whitefinders' lines below Kravos Hill, the Wall */
B7READ[4] = {scene:'b7_c4_tent', where:'a folded blanket on the floor of the Sixth\'s tent', set:'The Sixth\'s tent below Kravos Hill, the lantern swinging on the pole, and outside it an army made of what was left.', back:'b7_c4_fire', backT:'Back to the fire.',
  say:{perrit:'"In a tent," Perrit says, and smooths the blanket flat with both hands. "The Holds don\'t care where. I do. Tents leak sound." She lowers her voice. "Sit, Sergeant. Three tiles, and nobody in the next tent the wiser."',
       tilewoman:'"Followed the company out," the old woman says, settling on the blanket with her bag. "Armies want their tiles read more than barracks do. A dock. Same price under a hill as under a roof."'}};

const B7CH4 = {
  title:'The Muster', number:'Four',
  intro:{loc:'Kravos Hill', sub:'The army\'s camp · dusk', scene:'b7_kravos', cap:'Tents on the slopes below a hill, the commanders\' banners on its top, and Edur fires on its shoulder, set apart.',
    paras:[
`The army Lether was proud of went east. Five armies, the barracks say, against the borders and the Awl, and the best of the cavalry with them, and the good wagons, and most of the officers anybody had heard of.`,
()=>{ const v = b74Mates().map(id => TPL[id].name);
  return `What is left is being mustered. You are Sergeant {sgt}, Sixth Company, the Whitefinder Battalion, and the Sixth marched out of Letheras with it, four companies of what used to be a battalion, to a camp on the slopes below a hill called Kravos. ${v.length ? `${b74And(v)} ${v.length > 1 ? 'march' : 'marches'} with you.` : 'The squad, these days, is you.'}`; },
`Somewhere to the west, the broadsheets do not say where, foreigners have come ashore and are burning things. Lether is raising an army against them out of what it has left. It is counting what it has left very carefully.`,
`On the top of the hill are the commanders' banners. On its shoulder are the Edur, who have their own fires, and do not come down.`],
    go:'Into the lines', node:'b7_c4_tent'},

  areas:[
    /* 16 x 12 (b7_c4_lines, dusk). , trodden grass  . the lane  = tents  F the Sixth's fire  ^ the hill road (the banners above)  > east to the horse lines */
    { id:'b7_c4_lines', title:'Kravos Hill · the Whitefinders\' lines', sub:'Dusk · below the hill', hint:'Tap ground to move · tap a figure to talk · the hill road is north-west, the horse lines east', decor:'b7_c4_lines', dark:true,
      map:[ "^,,==,,.,,==,,,,",
            ",,,==,,.,,==,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,==,,,.,,,,==,,",
            ",,==,,,F,,,,==,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,==,,,.,,,==,,,",
            ",,==,,,.,,,==,,>",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,," ],
      walk:'.,', triggers:{F:'b7_c4_fire', '^':'b7_c4_hill', '>':'b7_c4_to_horse'}, start:{x:7, y:10},
      quest:()=> b74Ph() >= 3 ? (!S.f.b7_c4_patriotsDone ? 'The horse lines, east. The grey coats have a wagon there.' : !b74Key() ? 'The fire. Two people are waiting at it.' : 'The fire. Dawn is coming.')
        : !S.f.b7_c4_ennic ? 'Finadd Ennic, by the battalion standard.' : 'The fire, and then sleep. The muster is in the morning.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:5, node:()=>b74Ph() >= 3 ? 'b7_c4_dusk' : 'b7_c4_ennic', fresh:()=>b74Ph() >= 3 ? !S.f.b7_c4_dusk : !S.f.b7_c4_ennic},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:5, y:6, node:()=>'b7_c4_clerk', show:()=>b74Ph() < 3, fresh:()=>!S.f.b7_c4_clerk},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:9, y:9, node:()=>'b7_c4_tilewoman', show:()=>b74Ph() < 3, fresh:()=>!S.f.b7_c4_tw},
        {id:'edur', name:'Edur from the hill', kind:'b5_edur', x:13, y:6, node:()=>'b7_c4_edur_view', show:()=>b74Ph() === 1 && !S.f.b7_c4_edurDone && !S.f.b7_c4_edurDeclined, fresh:()=>!S.f.b7_c4_edurSeen},
        {id:'visit', name:'Two visitors at the fire', kind:'b5_letherii', x:6, y:5, node:()=>'b7_c4_key', show:()=>b74Ph() === 3 && !!S.f.b7_c4_patriotsDone && !b74Key(), fresh:()=>!b74Key()} ] },

    /* 16 x 12 (b5_c6_dissent, day). , grass  . the road through the gate  # the palisade  G the gate, the crowd beyond  c a cart  t the muster
       tables  s a sutler's cart  < back to the lines */
    { id:'b7_c4_gate', title:'Kravos Hill · the muster gate', sub:'Morning · the battalions counted', hint:'Tap ground to move · tap a figure to talk · the crowd is at the gate, the tables west', decor:'b5_c6_dissent',
      map:[ "#######GG#######",
            ",,,,,,,..,,,,,,,",
            ",c,,,,,..,,,,,c,",
            ",,,,,,,..,,,,,,,",
            ",,,,t,,..,,s,,,,",
            ",,,,,,,..,,,,,,,",
            ",,,,,,,..,,,,,,,",
            ",,,,,,,..,,,,,,,",
            ",,,,,,,..,,,,,,,",
            ",,,,,,,..,,,,,,,",
            ",,,,,,,..,,,,,,,",
            "<,,,,,,..,,,,,,," ],
      walk:'.,', triggers:{G:'b7_c4_crowd', t:'b7_c4_tables', s:'b7_c4_sutler', '<':'b7_c4_gate_back'}, start:{x:7, y:10},
      quest:()=> !S.f.b7_c4_riotDone ? 'The gate. The crowd will not let the levies in, or out.' : !S.f.b7_c4_sorvanMet ? 'A Bluerose lancer with no horse, by the empty horse pickets.' : 'Back to the lines at dusk.',
      npcs:[
        {id:'sorvan', name:'A lancer with no horse', kind:'sorvan', x:2, y:7, node:()=>'b7_c4_sorvan', show:()=>!S.f.b7_c4_sorvanMet || b74SorvanWaits(), fresh:()=>!S.f.b7_c4_sorvanMet},
        {id:'press', name:'The press-gang\'s sergeant', kind:'b5_letherii', x:9, y:2, node:()=>'b7_c4_crowd', show:()=>!S.f.b7_c4_riotDone, fresh:()=>!S.f.b7_c4_riotDone},
        {id:'agent', name:'A grey coat at the tables', kind:'b7_agent', x:5, y:5, node:()=>'b7_c4_tables', fresh:()=>!S.f.b7_c4_badge} ] },

    /* 16 x 12 (b7_c4_lines, night). , grass  H the horse pickets  = tents (the provost's, the officers' at the back)  w the provost's wagon
       < west, back to the Whitefinders' lines */
    { id:'b7_c4_horse', title:'Kravos Hill · the horse lines', sub:'Night · the remounts', hint:'Tap ground to move · tap a figure to talk · the wagon is east, the pickets north', decor:'b7_c4_lines', dark:true,
      map:[ ",,,,,,,,,,,,,,,,",
            ",HHHHHH,,,,,==,,",
            ",,,,,,,,,,,,==,,",
            ",HHHHHH,,,,,,,,,",
            ",,,,,,,,,,,,,,w,",
            ",,,,,,,,,,,,,,,,",
            ",,,,==,,,,,,,,,,",
            ",,,,==,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            "<,,,,,,,,,,,,,,," ],
      walk:',', triggers:{H:'b7_c4_horses', w:'b7_c4_wagon', '<':'b7_c4_horse_back'}, start:{x:1, y:10},
      quest:()=> !S.f.b7_c4_patriotsDone ? 'The provost\'s wagon. The grey coats are waiting by it.' : 'Back to the lines. Somebody is waiting at the fire.',
      npcs:[
        {id:'groom', name:'An Indebted groom', kind:'b5_c5_refugee', x:7, y:2, node:()=>'b7_c4_grooms', fresh:()=>!S.f.b7_c4_groomsTried},
        {id:'sorvanw', name:'Sorvan, at the pickets', kind:'sorvan', x:3, y:4, node:()=>'b7_c4_horse_trick', show:()=>b74SorvanWaits() && !S.f.b7_c4_horseTried, fresh:()=>!S.f.b7_c4_horseTried},
        {id:'pat', name:'Grey coats by the wagon', kind:'b7_agent', x:12, y:5, node:()=>'b7_c4_patriots', show:()=>!S.f.b7_c4_patriotsDone, fresh:()=>!S.f.b7_c4_patriotsDone} ] },

    /* 16 x 12 (b7_c4_lines, dawn): the same lines by first light */
    { id:'b7_c4_dawn', title:'Kravos Hill · the Whitefinders\' lines', sub:'Dawn · the drums on the hill', hint:'Tap ground to move · tap a figure to talk · the fire is in the middle of the lines', decor:'b7_c4_lines',
      map:[ "^,,==,,.,,==,,,,",
            ",,,==,,.,,==,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,==,,,.,,,,==,,",
            ",,==,,,F,,,,==,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,==,,,.,,,==,,,",
            ",,==,,,.,,,==,,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,," ],
      walk:'.,', triggers:{F:'b7_c4_fire', '^':'b7_c4_hill'}, start:{x:7, y:10},
      quest:()=> !S.f.b7_c4_dawnEnnic ? 'The Finadd, by the standard.' : 'The fire. The army moves when the hill says.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:5, node:()=>'b7_c4_dawn_ennic', fresh:()=>!S.f.b7_c4_dawnEnnic} ] } ],

  battles:{
    /* the crowd at the muster gate: levies' families and the city's poor, who do not want to be an army. Staves and stones; the Sixth uses the flat */
    b7_c4_riot:{title:'The muster gate', style:'b5_c6_dissent', warrenText:'Day at the gate · the Holds are quiet, and the crowd is not', warren:{meanas:1, denul:1}, music:'battle',
      map:["###..###","........","..t.....","........",".....t..","........","...t....","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b7_whitefinder',6,8]],
      foes:[['b7_rioter',3,1],['b7_rioter',4,1],['b7_rioter',2,2],['b7_rioter',6,2],['b7_rioter',1,3],['b7_rioter',5,3],['b7_rioter',4,0]], xp:180, after:'b7_c4_riot_after',
      preText:()=>`Staves and stones and the press-gang's own ropes, and a great many people who have decided that if they must be killed for Lether they would rather it happened here, in front of their mothers, than in a field in the west. Blades flat, the Finadd said. Blades flat.`},
    /* the Edur from the hill test what Lether has left: a lesson, to the first who cannot stand */
    b7_c4_edurcamp:{title:'Below the hill', style:'b7_c4_lines', dark:true, open:true, warrenText:'Dusk below Kravos Hill · the shadows lean toward the Edur', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","...t....","........","........","......t.","........","..t.....","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_edurl',2,1],['b7_edurl',5,1],['b7_edurl',4,2],['b7_edurl',1,0]], xp:200, after:'b7_c4_edur_after',
      preText:()=>`Four of them, with their long blades out and their faces doing nothing at all. "To the first who cannot stand," the eldest says. "Then we will know what Lether has left."`},
    /* Patriotist agents come for a name on the squad's list: the main fight, at the horse lines and then at the provost's wagon */
    b7_c4_patriots:{title:'The horse lines', style:'b7_c4_lines', dark:true, warrenText:'Night at the horse lines · the remounts screaming, and somebody counting', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..t..t..","........","........","...t....","........","......t.","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b7_agent',2,1],['b7_agent',5,1],['b7_agent',3,0],['b7_enforcer',4,2],['b7_enforcer',1,2]], xp:250, after:'b7_c4_patriots_after',
      preText:()=>`Grey coats among the horse pickets, and knives out of sleeves, and the remounts going wild on their tethers between the two sides. Behind the agents, the enforcers with their clubs. Behind the enforcers, the wagon with its barred door, standing open, waiting for ${b74ListNm()}.`,
      stage2:{title:'The provost\'s wagon', xp:150,
        text:()=>`The pickets are the squad's. Past them, at the wagon, a man in a better grey coat with the list in his hand, and two more agents and two enforcers who were waiting to put whoever was brought them behind the bar. The provost has gone to look for his supper and is taking his time about finding it.${b74If('thegg', `\n\nThegg looks at the wagon's door and then at the man with the list. "Behind me," he says.`)}`,
        map:["....t...","........","..t..t..","........","........","...t....","........","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b7_agentchief',4,0],['b7_agent',2,1],['b7_agent',6,1],['b7_enforcer',3,2],['b7_enforcer',5,2]]} } },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b7_c4_bluelance:{name:'A Bluerose lance, cut down', slot:'weapon', role:'reach', who:null, atk:1, rng:1, reach:true, dmg:[1,10,1],
      line:'A Bluerose cavalry lance sawn off to fight on foot, the ash shaft dark with years of hands and the long iron head still keen. The pennon-ring is empty. The company it belonged to rode east and left the spares behind with a man who had no horse. It still reaches past a shield.'},
    b7_c4_bluescale:{name:'Bluerose scale', slot:'armour', role:'heavy', who:null, ac:3, hp:4,
      line:'A Bluerose officer\'s scale shirt, every plate blue-enamelled and laced in rows, heavy as a bad debt and twice as hard to get out of. It came out of the provost\'s wagon, where it had been put away with a lot of other things whose owners were not coming back for them. It turns a blade. It also turns heads.'},
    b7_c4_musterbadge:{name:'A muster badge', slot:'trinket', role:'any', who:null, stat:{guile:1},
      line:'A lead tag on a cord, stamped at the muster tables: the Whitefinders\' fingertip, and struck over it, a little crooked, the Edur\'s mark. A soldier wearing one is where the army says he is, as far as anybody asks, which makes it easier to be somewhere else.'} },

  scenes:{
    b7_c4_tent:{loc:'Kravos Hill', sub:'The Sixth\'s tent · night', cap:'A soldiers\' tent below the hill, a lantern swinging on the pole, a blanket on the floor, and the noise of an army through the canvas.', amb:'explore'},
    b7_c4_gate:{loc:'Kravos Hill', sub:'The muster gate · morning', cap:'A palisade gate below the hill, clerks at tables under awnings counting soldiers, and beyond the gate a crowd that will not go home.', amb:'explore'},
    b7_c4_horselines:{loc:'Kravos Hill', sub:'The horse lines · night', cap:'Remounts on their pickets in the dark, a lantern on a pole, and the provost\'s wagon with its barred door standing open.', amb:'explore'} },

  end:{
    edur:['Under Edur eyes', 'At the muster below Kravos Hill the Sixth was counted, and badged, and asked twice in one night where it stood. The sergeant chose to stand where the Edur could see it: on their picket, under their eyes, in front of the whole camp. The Patriotists took a page out of the squad\'s file the next morning, and Lether, watching, kept its head a little lower.'],
    letherii:['Among their own', 'At the muster below Kravos Hill the Sixth was counted, and badged, and asked twice in one night where it stood. The sergeant chose the Letherii officers who want the Edur gone, in a horse-lines tent with the lantern turned down, and the camp knew it by dawn. Lether, watching, lifted its head a little, and the Patriotists wrote it down.'] },
  endScene:'b7_kravos',
  endCap:()=> b74Key() === 'edur' ? 'The lines below Kravos Hill at dawn, the Edur fires on the shoulder, and the Sixth\'s fire closer to them than anybody else\'s.' : 'The lines below Kravos Hill at dawn, the Edur fires on the shoulder, and a lantern going out in a tent at the horse lines.',
  tease:'Next: the river side of the funnel. The Third, a village of its own, and an Edur band coming in their hundreds.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b7_c4_key === 'edur') x.push('The sergeant took the Sixth onto the Edur\'s picket, under Edur eyes, in front of the camp.');
    if (f.b7_c4_key === 'letherii') x.push('The sergeant took the Sixth in with the Letherii officers who want the Edur gone.');
    if (f.b7_sorvanDone === 1) x.push(b7In('sorvan') ? 'Sorvan, a Bluerose lancer the cavalry left behind, walks with the squad now, with his lance.' : 'Sorvan, a Bluerose lancer the cavalry left behind, walks with the squad.');
    if (f.b7_sorvanDone === 2) x.push('Sorvan, a Bluerose lancer the cavalry left behind, waits at the horse lines.');
    if (f.b7_sorvanDone === 0) x.push('Sorvan, a Bluerose lancer the cavalry left behind, went looking for a company that rides.');
    if (f.b7_c4_riotDone) x.push(f.b7_c4_crowd === 'let' ? 'At the muster gate the Sixth cleared a crowd, and then cut the press-gang\'s rope and looked the other way.' : 'At the muster gate the Sixth cleared a crowd, and handed the roped levies back to the press-gang.');
    if (f.b7_c4_edurDone) x.push('Edur came down from the hill to see what Lether had left. They went back up knowing.');
    if (f.b7_c4_patriotsDone) x.push(`Patriotist agents came to the horse lines for ${f.b7_c4_listName === 'sgt' || !f.b7_c4_listName ? 'the sergeant' : NAME(f.b7_c4_listName)}. They did not take anybody back.`);
    if (f.b7_c4_arrest) x.push(`The sergeant spent an hour in the provost's wagon, and came out ${({ilsa:'on a warrant Ilsa read backwards', sorvan:'on a word from the Bluerose horse lines', talk:'on the provost\'s own say-so', ennic:'on the Finadd\'s signature'})[f.b7_c4_out] || 'again'}.`);
    if (f.b7_c4_horseOk) x.push('The squad learned to bring a horse line back the Bluerose way.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b7_c4_key && (f.b7_c4_key === 'edur' ? 'The Edur asked for the Sixth on their picket, under their eyes. The sergeant said yes.' : 'Letherii officers in a horse-lines tent asked the Sixth to be theirs when it comes to it. The sergeant said yes.'),
    f.b7_c4_listName && `The Patriotists' list for the camp had ${f.b7_c4_listName === 'sgt' ? 'the sergeant\'s name' : NAME(f.b7_c4_listName) + '\'s name'} on it, with a hook in the margin.`,
    f.b7_sorvanDone != null && 'Sorvan, a Bluerose lancer, came to the Sixth at the muster gate with a dead horse and a bad report.',
    f.b7_c4_news && 'The Finadd says the Patriotists and the Edur are at war in all but name, the Emperor\'s own father and mother are in the Chancellor\'s keeping, and the Awl are fighting Preda Bivatt\'s army a thousand leagues east.',
    f.b7_c4_badge && 'Every soldier at the muster got a lead badge: the Whitefinders\' fingertip, and the Edur\'s mark struck over it.',
    'The Sixth Company is in the camp below Kravos Hill, in an army made of what was left.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: dusk in the lines below Kravos Hill ======== */
    b7_c4_tent:()=>{ const ph = b74Ph();
      return {sp:'The Sixth\'s tent', scene:'b7_c4_tent', fx:()=>{ S.f.b7_c4_ph = S.f.b7_c4_ph || 1; },
        again:()=>'The Sixth\'s tent, the lantern on the pole, the lines outside.', txt: ph > 1 ?
`The Sixth's tent, pitched on the slope with the others, its guy-ropes humming in the wind off the hill. The lantern on the pole. The blanket on the floor. Outside, the army, making the noise armies make when they have not decided yet whether to be one.` :
`The Sixth's tent goes up on the slope below Kravos Hill at dusk, in a row of Whitefinder tents that used to be four rows. The battalion standard is planted in the lane with its white fingertip, and a Finadd's lamp beside it.

Up the slope, tents in their thousands, more than the eye wants to count, and at the top of the hill the commanders' banners, too far to read. On the hill's shoulder, apart, are fires that are not Letherii fires. Nobody in the Whitefinders' lines walks toward them.${b74Say({perrit:`\n\nPerrit is crouched in the tent mouth, unrolling the calfskin. "Sit, Sergeant," she says. "Before the Finadd finds you. He has a face on."`, ammet:`\n\nAmmet is laying out her roll of tools on a blanket by the lantern, one by one, counting them. "Armies," she says. "More work and worse light."`, _:''})}`,
        ch:[b7ReadChoice(4),
            {t:'The fire.', go:'b7_c4_fire'},
            {t:'The Finadd.', req:()=>ph === 1, go:'b7_c4_ennic'},
            {t:'Walk the lines.', go:()=>startExplore()}]}; },
    b7_c4_read:()=>b7ReadOffer(4),
    b7_c4_card:()=>b7ReadCard(4),

    /* Finadd Ennic: the orders, and the news */
    b7_c4_ennic:()=>({sp:B5_FINADD.name, scene:'b7_kravos', fx:()=>{ S.f.b7_c4_ennic = 1; }, again:()=>'The Finadd, by the standard. "The gate at first light, Sergeant."', txt:
`Finadd Ravel Ennic stands by the battalion standard with a paper in his hand that he has read, and folded, and read again.${S.f.b7_c2_ennicEve ? ' His other hand, when it is not doing anything, goes to his coat, over the place he keeps a page.' : ''}

"Sergeant. The battalion is counted at the muster gate at first light, with the levies. Every soldier, every spear, every badge." He folds the paper again. "The Preda's orders are that no soldier of the Whitefinders goes up the hill road. The commanders keep their tent up there, and the Edur keep the shoulder, and we keep down here." He looks up the slope at the far fires. "I gather the Edur gave the same order to themselves."

"The Patriotists have a table at the muster gate, too. I did not ask why. One learns not to."`,
      ch:[{t:'"What are the lines saying, sir?"', go:'b7_c4_ennic_news'},
          {t:'"First light. Yes, sir."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c4_ennic_news:()=>({sp:B5_FINADD.name, scene:'b7_kravos', fx:()=>{ S.f.b7_c4_news = 1; }, txt:
`He glances up at the shoulder of the hill before he answers.

"That the Patriotists and the Edur are at war in all but name," he says, low. "Since the business with the First Concubine. That the Emperor's own father and mother are in the Chancellor's keeping, and the Edur are not permitted to ask after them." He turns the folded paper over. "That the Awl have risen in the east, a thousand leagues off, and Preda Bivatt's army is out there with half the cavalry in the kingdom. That five armies went east, and what is left is us."

"And that the foreigners in the west raid by night and burn by night and are never where the cavalry is sent." He almost smiles. "Which is easy, Sergeant, when the cavalry is a thousand leagues away."${b74If('perrit', `\n\nPerrit, behind you, says quietly, "Five armies east. One here. The sums on that are not in our favour, sir."`)}${b74If('sorvan', `\n\nSorvan says nothing about the cavalry, very loudly.`)}`,
      ch:[{t:'"First light. Yes, sir."', go:()=>startExplore()}]}),

    /* the company clerk: the muster roll, and the Patriotists' list */
    b7_c4_clerk:()=>({sp:'The company clerk', scene:'b7_kravos', fx:()=>{ S.f.b7_c4_clerk = 1; }, again:()=>'The company clerk, at a camp table by the standard, copying.', txt:
`The company clerk has a camp table by the standard, with the oilskin case and both his books, and a third sheet he is copying from, slowly, in a hand that is not his best.

"The muster roll," he says. "For the gate tomorrow. And this." He touches the third sheet. "A Patriotist clerk came down the lines this afternoon with a list for every battalion, and asked each company clerk to check his names against it. Very polite. I checked them." He does not look up. "I also copied it. I have been a clerk thirty years. I like to know what I have checked."`,
      ch:[{t:'Read the list over his shoulder. Whose names, and what marks?', check:['wits', 14], req:()=>!S.f.b7_c4_clerkTried,
            edges:id=>[id === 'ilsa' && ['she wrote lists like this one for six years', 3], id === 'perrit' && ['a clerk\'s daughter reads another clerk\'s hand', 2], id === 'tobet' && ['he keeps a tally-stick; he knows what a list is for', 1], id === 'sgt' && ['you have read your own page of this file', 1], id === 'thegg' && ['the clerk is frightened of very large men, even polite ones', -1], id === 'ruuk' && ['he will not look at writing', -1]],
            near:{t:'Yes, but the clerk reads out every name on the list, battalion by battalion, and the hooks with them, and the sum of it goes to sleep with whoever listened: rattled.', fx:()=>b74Rattle(b74Who())},
            fx:()=>{ S.f.b7_c4_clerkTried = 1; }, go:'b7_c4_clerk_ok', fail:'b7_c4_clerk_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c4_clerk_ok:()=>({sp:'The company clerk', scene:'b7_kravos', fx:()=>{ S.f.b7_c4_clerkOk = 1; S.f.b7_c4_listName = b74List(); }, txt:
`He turns the sheet so it faces you, and runs his pen down it to the Whitefinders.

Six names for the whole battalion. One of them is the Sixth's. ${b74List() === 'sgt' ? `It is yours, Sergeant {sgt}, and beside it in the margin there is a hook, and a ring, and a small tick at the bottom of the stroke.` : `It is ${NAME(b74List())}'s, and beside it in the margin a hook.`}

"Bring in," the clerk says, touching the hook. "At the muster, or after. I asked the Patriotist clerk why ours." He sets the pen down. "${b74List() === 'sgt' ? 'He said the Sixth had been asked for a name once and given the wrong answer.' : b74List() === 'ilsa' ? 'He said the Patriotists like their clerks to come home.' : 'He said a man by the canal steps had been asked for names, and had given some back.'} Then he thanked me for my time."${b74If('ilsa', `\n\nIlsa looks at the margin. "That's not my hand," she says. "Somebody new. They write the hook too big."`)}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b7_c4_clerk_no:()=>({sp:'The company clerk', scene:'b7_kravos', txt:
`He begins to explain the list's arrangement, by battalion and then by company and then by a column he does not understand himself, and then a grey coat goes by at the end of the lane, and he puts the sheet face down under the paybook.

"Tomorrow, Sergeant," he says. "Ask me tomorrow."`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the tile-woman: followed the company out */
    b7_c4_tilewoman:()=>({sp:'The tile-woman', scene:'b7_kravos', fx:()=>{ S.f.b7_c4_tw = 1; }, again:()=>'The tile-woman on a folded tent-cloth, with her bag. "Still a dock."', txt:
`The tile-woman has followed the company out of Letheras on the back of the surgeon's cart, and sits now on a folded tent-cloth at the end of the row with the oiled bag in her lap. She spits to one side for manners.

"Five armies went east," she says, "and not one of them took a tile-woman. Fools." She jerks her chin up the slope at the Edur fires. "Those up there don't read tiles either. Nor do the Patriotists. Nobody reads anything any more but lists."${b7In('perrit') ? `\n\n"Your cadre girl's got her own," she adds. "Tell her the hill's a bad place for the Wall. Too many people standing on it."` : ''}`,
      ch:[b7ReadChoice(4),
          {t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the hill road: never up it */
    b7_c4_hill:()=>({sp:'The hill road', scene:'b7_kravos', again:()=>'The hill road, and the banners at its top.', txt:
`The hill road goes up out of the Whitefinders' lines between two sentries who are not Whitefinders, past the Edur fires on the shoulder, to the top of Kravos Hill, where the commanders' banners hang in the dusk too far off to read. A carriage went up it this afternoon with outriders, and has not come down. The Chancellor's man, people say, with the Chancellor's orders.

The Edur banner on the shoulder is Hanradi Khalag's, the clerk says. You can see the Edur moving round their fires up there, unhurried, grey in the firelight. They never look down at the Letherii lines. It is a thing they do on purpose, and every soldier below the hill knows it.

The Preda's order is that no Whitefinder goes up. ${b74Ph() >= 4 ? 'The drums have started up there, with the dawn.' : 'It is not an order anyone feels like breaking.'}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* Edur down from the hill, to see what Lether has left: a lesson */
    b7_c4_edur_view:()=>({sp:'Edur from the hill', scene:'b7_kravos', fx:()=>{ S.f.b7_c4_edurSeen = 1; }, again:()=>'The Edur at the end of the row, grey and still, looking at the lines.', txt:
`Four Tiste Edur have come down from the shoulder of the hill and stand at the end of the Whitefinders' row, with their hands folded over their sword-hilts, looking at the Letherii tents as a buyer looks at a field that has been let go.

The eldest of them speaks, in good Letherii with the vowels long. "Sergeant. We are told we will stand beside your people when the foreigners come." He lets his eyes go down the row of tents, and back. "We would like to know what we will be standing beside. A lesson, then. Not to the death. To the first who cannot stand." A pause. "It is permitted. Nobody asked us not to."${S.f.b7_c2_gateDone ? `\n\n"The Sixth," he adds. "The two on your barracks gate spoke of you. They said: better. Not good. Better."` : ''}${b74If('thegg', `\n\nThegg looks at the Edur. The eldest looks back, up, which Edur are not used to doing.`)}${b74If('ammet', `\n\nAmmet, behind you: "Hold still, all of you, until I've got my needle out."`)}`,
      ch:[{t:'"A lesson, then." Take it.', go:()=>startBattle('b7_c4_edurcamp', {})},
          {t:'Keep them talking, and watch how they stand while they do.', check:['wits', 15],
            edges:id=>[id === 'thegg' && ['he has watched Edur stand on a gate for a year', 2], id === 'tobet' && ['a bowman watches feet', 1], id === 'sorvan' && ['a lancer reads how a man sets his weight', 2], id === 'sgt' && ['you have walked past Edur every night for a year', 1], id === 'pessa' && ['she is too angry to watch anything', -1]],
            near:{t:()=>`Yes, but the eldest sees ${b74Nm(b74Who())} watching, and is amused, and the lesson starts with ${b74Nm(b74Who())} still looking at the wrong foot. ${b74Nmc(b74Who())}'ll feel it in the fight.`, fx:()=>bruise(b74Who(), bruiseN())},
            go:()=>startBattle('b7_c4_edurcamp', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c4_edur_seen'},
          {t:'"Another night." Decline, politely.', fx:()=>{ S.f.b7_c4_edurDeclined = 1; }, go:'b7_c4_edur_decline'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c4_edur_seen:()=>({sp:'Edur from the hill', scene:'b7_kravos', txt:
`The eldest smiles. It does not help. "You were counting how we stand," he says. "Good. Count this."`,
      ch:[{t:'Blades up.', go:()=>startBattle('b7_c4_edurcamp', {surprise:'e'})}]}),
    b7_c4_edur_decline:()=>({sp:'Edur from the hill', scene:'b7_kravos', txt:
`He inclines his head a finger's width. "Another night," he says, in a voice that has already decided what it thinks of Letherii nights. The four of them turn and walk back up toward the shoulder, unhurried, and do not look back at the lines, on purpose.`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),
    b7_c4_edur_after:()=>({sp:'Edur from the hill', scene:'b7_kravos', fx:()=>{ if (!S.f.b7_c4_edurDone) { S.f.b7_c4_edurDone = 1; b74L('thegg', 1); b74L('sorvan', 1); } }, txt:
`The last of them goes down on one knee in the trodden grass and stays there, which is the rule they set. Then all four get up, slowly, and the eldest looks at the cut on his forearm with some interest, and at the Sixth with a little more.

"Most of your people will run," he says. "When the foreigners come. We have watched your army make itself out of what was left, and it is mostly running, waiting to start." He sheathes his blade. "Some of you will not." He looks at you for a moment longer than an Edur usually looks at a Letherii. "We will remember which."

They walk back up to the shoulder. Half the Whitefinders' lines watched it, and every one of them is pretending otherwise.${b74Say({ammet:`\n\nAmmet is among the squad with the needle. "Hold still," she says. "Edur. Again. I am going to start charging the Emperor."`, thegg:`\n\nThegg rolls his shoulder, carefully. "Polite," he says. "For Edur."`, _:''})}`,
      ch:[{t:'Back to the lines.', go:()=>startExplore()}]}),

    /* the fire: 1 dusk in the lines; 2 the gate by day (talk only); 3 night, back in the lines; 4 dawn. The games pass wraps this node: keep the id */
    b7_c4_fire:()=>{ const ph = b74Ph();
      if (ph === 2) return {sp:'The squad', scene:'b7_c4_gate', txt:
`No fire at the muster gate. The squad stands in the lee of a cart with its badges on and talks low, as soldiers talk at a muster where a grey coat sits at one of the tables.`,
        ch:[{t:'Talk with the squad.', go:'b7_c4_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      const rk = 'b7_c4_rest' + ph, dawn = ph >= 4;
      return {sp:'The Sixth\'s fire', scene:dawn ? 'b7_kravos' : 'b7_c4_tent', html:risingHTML(),
        again:()=> dawn ? 'The Sixth\'s fire at dawn, banked, and the drums on the hill.' : 'The Sixth\'s fire in front of the tent, small, as fires in the Whitefinders\' lines are.', txt:
`${dawn ? `The Sixth's fire at dawn, banked, the squad round it in its cloaks. Up on the hill the drums have started, and on the shoulder the Edur fires are going out one by one.${b74Key() === 'edur' ? ' The Edur on the picket nearest the Whitefinders nod to the Sixth\'s fire as they pass it. Nobody else\'s.' : b74Key() === 'letherii' ? ' A lantern at the horse lines has gone out. Two officers going by on the lane look at the Sixth\'s fire and keep walking, a little slower.' : ''}` : ph === 3 ? `The Sixth's fire again, in front of the tent, small. The lines have gone quiet the way an army goes quiet when it has been told something and is deciding whether to believe it. East, at the horse lines, the remounts are restless, and there is a lantern by the provost's wagon.` : `The Sixth's fire in front of the tent, small, as fires in the Whitefinders' lines are small tonight, since the fires on the shoulder of the hill are watching them. The squad sits round it with its back to the slope.`}${b74Say({tobet:`\n\nTobet is cutting a notch in his tally-stick by the light of the coals. He does not say what this one is for.`, ammet:`\n\nAmmet is rolling bandage, and will not drink, and says so.`, _:''})}${b7In('sorvan') ? `\n\nSorvan sits a little back from the coals with his blue scale across his knees and an oil-rag, working the lacing plate by plate. He looks at the fire like a man who has spent eleven years watching other people's.` : ''}`,
        ch:[...(ph === 1 || ph === 3 ? [b7ReadChoice(4)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>(ph === 1 || ph === 3) && !S.f[rk], fx:()=>{ S.f[rk] = 1; rest(ph === 3 ? 'The squad sits an hour at the fire, with the horse lines quiet at last. Wounds close, mostly.' : 'The squad sits an hour at the fire below the hill. Wounds close, mostly.'); }, go:'b7_c4_fire_rest'},
            {t:'Talk with the squad.', go:'b7_c4_fire_talk'},
            {t:'Sleep. The muster is at first light.', req:()=>ph === 1 && !!S.f.b7_c4_ennic, onward:true, go:'b7_c4_sleep'},
            {t:'The two visitors.', req:()=>ph === 3 && !!S.f.b7_c4_patriotsDone && !b74Key(), go:'b7_c4_key'},
            {t:'The night is over. Let the hill decide the rest.', req:()=>dawn && !!S.f.b7_c4_dawnEnnic, onward:true, go:'b7_c4_onward'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c4_fire_rest:()=>({sp:'The Sixth\'s fire', scene:'b7_c4_tent', txt:
`${b74Ph() >= 3 ? 'An hour, then, with the horse lines quiet at last and the lantern by the wagon put out.' : 'An hour, then, with the coals and the canvas and the Edur fires at your back.'}

${b74Say({ammet:`Ammet goes round the squad with her roll of tools and the lantern off the pole. "Hold still." She stitches what wants it and does not ask how. "A whole army," she says, "and one surgeon to a battalion. Somebody did these sums."`, perrit:`Perrit goes round the squad with a cup of water each, counting the cups.`, _:'Some of them sleep sitting up. The rest watch the hill without meaning to.'})}${b74If('thegg', `\n\nThegg lies down across the tent mouth, which is where he sleeps in a camp, and talks to his mother's dead under his breath in her tongue.`)}${b74If('tobet', `\n\nTobet counts his arrows twice, then sleeps with them.`)}`,
      ch:[{t:'Back to the fire.', go:'b7_c4_fire'}]}),
    b7_c4_fire_talk:()=>{ const late = b74Ph() >= 3, ln = [];
      if (b7In('tobet')) ln.push(late ? `Tobet turns the tally-stick over. "They roped the levies on the road," he says. "Wrists. I saw it. Indebted, mostly." He puts the stick away. "Lether's had my wrists in a rope since I was born. It just used to be paper."` : `Tobet is looking up the slope from half a step behind you. "From back here," he says, "the hill looks like it's got all the officers on it." He considers. "From anywhere, really."`);
      if (b7In('thegg')) ln.push(late ? `Thegg is sitting very still with his hands on his knees. "The eldest Edur," he says at last. "He looked up at me. They don't like to." He thinks about it. "I didn't like it either. Looking down at him. It felt like I owed him something."` : `Thegg has his back to the tent pole. "My mother's people stood in lines like this," he says. "For other people's kings." He looks at the banners on the hill. "Nobody ever came down to tell them why."`);
      if (b7In('perrit')) ln.push(late ? `Perrit is doing sums on the tent-cloth with charcoal. "Six names on the list for the battalion," she says. "Six out of four companies. That's not a purge, it's a sample." She rubs it out. "They're testing what a list does to an army. I'd like to not be the answer."` : `Perrit has her tiles in the calfskin and her back to the canvas. "The Holds are noisy here," she says. "Too many people afraid in one place. It comes up through the ground like damp." She frowns. "And something on the ridges west. A long way off. Somebody building something."`);
      if (b7In('ammet')) ln.push(late ? `Ammet is sharpening a needle on a stone. "I've stitched Edur twice now," she says. "Grey under the skin all the way down, if you were wondering. Bleeds like anyone." She tests the point. "Don't tell them I said so. They'd want a better surgeon."` : `Ammet ties off a roll of bandage. "One surgeon to a battalion," she says, "and a battalion made of levies who've never held a spear." She looks at the slope. "Hold still, Sergeant. You've got that look again."`);
      if (b7In('ruuk')) ln.push(`Ruuk is lying on his back in the trodden grass, looking at the hill upside down. "In Faraed," he says, "we would have burned the hill and gone home." He grins at the sky. "Lether builds an army on it instead. Bigger idea. Worse."`);
      if (b7In('brune')) ln.push(`Brune has her boots off and her feet in the dew. "Too far from the sea," she says, after nobody has spoken for a while. "The Shore can't hear me here." She wriggles her toes. "It'll have to read about it."`);
      if (b7In('pessa')) ln.push(`Pessa has the boathook upright between her knees, which in a camp below a hill makes no sense to anyone but her. "The press-gangs took half the canal," she says. "Boys off the eel-boats. They gave them spears." She snorts. "They'll be good with them. They're used to things that bite back."`);
      if (b7In('ilsa')) ln.push(late ? `Ilsa sits with her grey coat on her knees. "The man with the list at the wagon," she says. "I used to file his reports. He spells Whitefinder with two Fs." She looks at the fire. "I always corrected it. I don't know why I'm telling you that."` : `Ilsa is reading the lines, tent by tent, the way she reads a page. "Four companies," she says. "In the file it was a battalion." She almost smiles. "Files are always a year behind. It's the one thing in Lether that is."`);
      if (b7In('sorvan')) ln.push(late ? `Sorvan has stopped oiling the scale. "In Bluerose," he says, "we have a word for a horse that runs from the line. It's the same word as the one for a horse that's been badly ridden." He goes back to the lacing. "Nobody in Lether has ever asked what it was."` : `Sorvan is oiling his blue scale, plate by plate. "Officers read lists," he says. "Lancers read horses. The horses up that hill are all being ridden by men who can't." He holds a plate to the firelight. "I know which I'd rather."`);
      return {sp:'The Sixth\'s fire', scene:b74Ph() === 2 ? 'b7_c4_gate' : 'b7_c4_tent', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b7_c4_fire'}]}; },

    /* the night: the levies brought in on the road */
    b7_c4_sleep:()=>({sp:'The Sixth\'s tent', scene:'b7_c4_tent', txt:
`The squad goes in under the canvas. The lantern goes out.

Some time after the camp's last bell there is a column on the road below the lines, slow, with torches: the press-gangs bringing the levies in from the villages, roped at the wrists in long files, and behind the files the people who followed them out, women mostly, calling names. The names go on a long while after the torches have passed.

On the shoulder of the hill the Edur fires burn all night. In the Sixth's tent everybody is awake, and nobody says so.${b74If('thegg', `\n\nIn the dark Thegg sits up, and listens to the names, and lies down again.`)}`,
      ch:[{t:'First light. The muster gate.', onward:true, fx:()=>{ S.f.b7_c4_ph = 2; }, go:()=>{ startExplore('b7_c4_gate'); talk('b7_c4_morning'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 2: the muster gate by day ======== */
    b7_c4_morning:()=>({sp:'The muster gate', scene:'b7_c4_gate', txt:
`The muster gate is a gap in a palisade at the foot of the camp, where the road comes in. Inside it a row of tables under awnings, each with a battalion's clerk and a battalion's ledger, and a long queue of soldiers being counted, given a badge, and told where to stand. One table has no battalion. A man in a grey coat sits at it with a list.

Outside the gate, on the road, there is a crowd. The levies who came in last night are inside, untied, holding spears as if somebody had handed them a snake. The people who followed them out are outside, and will not go home, and the press-gang's sergeant at the gate has run out of ways to tell them to.${b74Say({tobet:`\n\nTobet looks at the crowd from half a step behind you. "Indebted," he says. "All of them. You can tell by the shoes."`, ammet:`\n\nAmmet looks at the crowd and then at the press-gang's clubs. "I'm going to be busy," she says.`, _:''})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),

    /* the muster tables: counted, badged, and looked at by a grey coat */
    b7_c4_tables:()=>({sp:'The muster tables', scene:'b7_c4_gate', fx:()=>{ if (!S.f.b7_c4_badge) { S.f.b7_c4_badge = 1; gain('b7_c4_musterbadge'); } }, again:()=>'The muster tables, the queue, and the grey coat at the table with no battalion.', txt:
`The Whitefinders' clerk counts the Sixth off his ledger, name by name, and a boy with a stamping block hammers out a lead tag for each and hangs it on a cord round each neck: the battalion's white fingertip, and over it, a little crooked, the Edur's mark. One goes in the squad's kit spare, in case.

At the next table the man in the grey coat watches the Sixth counted. He has a list, and a pen, and he runs the pen down the list as the names are called. ${b7HeatTier() === 'clean' ? 'When the Sixth\'s names come he stops at one of them, and makes a small mark, and goes on.' : 'When the Sixth\'s names come he stops, and looks up, and looks at you for a while, pleasantly, and makes a mark beside a name without looking down.'}${b7In('ilsa') ? `\n\nIlsa keeps her face turned away from the grey coat's table. "I know him," she says, low. "He knows my hand. Not my face. Clerks never look up."` : ''}`,
      ch:[{t:'Back to the gate.', go:()=>startExplore()}]}),

    /* the crowd at the gate: the riot (a "yes, but" on the talking that is a bruise, not the file) */
    b7_c4_crowd:()=>{ const done = !!S.f.b7_c4_riotDone;
      if (done) return {sp:'The gate', scene:'b7_c4_gate', txt:
`The gate is clear. Out on the road the last of the crowd is walking away toward the villages, slowly, looking back. ${S.f.b7_c4_crowd === 'let' ? 'Some of them are walking with men who were roped this morning and are not now.' : 'The press-gang has its rope back, and its levies on the end of it.'}`,
        ch:[{t:'Back to the tables.', go:()=>startExplore()}]};
      return {sp:'The press-gang\'s sergeant', scene:'b7_c4_gate', again:()=>'The press-gang\'s sergeant at the gate, and the crowd beyond it.', txt:
`The press-gang's sergeant is a big tired Letherii with a club and a rope over his shoulder, and he is very glad to see a squad of the line.

"They won't shift," he says. "Wives, mothers, the odd uncle. They want their boys back. They've been told the boys are the Emperor's now. They didn't care for it." Beyond the gate the crowd surges, and a stone comes over and hits an awning. "Clear the gate, the Preda says. Blades flat. I've got eleven men and a rope."

The front of the crowd is close enough to talk to. An old woman at the front has a stave and a face like a closed door.${b74If('pessa', `\n\nPessa looks at the old woman. "That's an eel-wife," she says. "From the canal. She'll hit you."`)}`,
        ch:[{t:'"Sixth. Blades flat. Clear the gate."', go:()=>startBattle('b7_c4_riot', {})},
            {t:'Talk to the front of the crowd first. Some of them will go.', check:['guile', 15], rise:true,
              edges:id=>[id === 'tobet' && ['Indebted, talking to Indebted', 2], id === 'pessa' && ['she talks canal, and they answer in it', 2], id === 'ammet' && ['a surgeon is listened to', 1], id === 'sgt' && ['you grew up two streets back from the Quillas', 1], id === 'thegg' && ['a very large soldier at a gate is a threat whatever he says', -2], id === 'ilsa' && ['they can smell the Patriotists on her coat', -2], id === 'sorvan' && ['Bluerose; nobody in Lether trusts the accent', -1]],
              near:{t:()=>`Yes, but the old woman with the stave hears all of it out, nods, and hits ${b74Nm(b74Who())} across the shins with it before she goes. ${b74Nmc(b74Who())}'ll feel it in the fight.`, fx:()=>bruise(b74Who(), bruiseN())},
              go:()=>startBattle('b7_c4_riot', {drop:[5, 6]}), fail:'b7_c4_crowd_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c4_crowd_no:()=>({sp:'The gate', scene:'b7_c4_gate', txt:
`The old woman with the stave listens to the first sentence, and then spits on the road at your feet, neatly, and the crowd behind her roars, and comes through the gate.`,
      ch:[{t:'Blades flat.', go:()=>startBattle('b7_c4_riot', {surprise:'e'})}]}),
    b7_c4_riot_after:()=>({sp:'The gate', scene:'b7_c4_gate', fx:()=>{ S.f.b7_c4_riotDone = 1; }, txt:
`The crowd breaks, and goes back out onto the road, carrying its hurt, and stands there in the dust a long stone's throw off, looking at the gate. Nobody on either side is dead. The press-gang's sergeant counts his men twice, surprised by the answer.

In the gateway, where the crowd was, there is a file of levies who were not untied: twelve boys and two old men on one rope, who had been pulled out through the gate in the push and are sitting in the road now with the rope between them, waiting to find out whose they are.

The press-gang's sergeant is looking the other way, at his men. The rope's end is in the dust at your feet.${b74Say({tobet:`\n\nTobet looks at the rope. He looks at you. He does not say anything, because he is Indebted and you are not.`, ammet:`\n\nAmmet looks at the rope, and at the crowd on the road, and at you. "Your call, Sergeant," she says.`, _:''})}`,
      ch:[{t:'Cut the rope, and look the other way.', fx:()=>{ if (!S.f.b7_c4_crowd) { S.f.b7_c4_crowd = 'let'; b7Rise(1, 'levies let go at the muster gate'); b74L('tobet', 1); b74L('pessa', 1); b74L('thegg', 1); b74L('perrit', -1); } }, go:'b7_c4_riot_cut'},
          {t:'Hand the rope back to the press-gang.', fx:()=>{ if (!S.f.b7_c4_crowd) { S.f.b7_c4_crowd = 'kept'; b7Rise(-1, 'levies handed back to the press-gang'); b74L('tobet', -1); b74L('pessa', -1); b74L('perrit', 1); } }, go:'b7_c4_riot_back'}]}),
    b7_c4_riot_cut:()=>({sp:'The gate', scene:'b7_c4_gate', txt:
`${b74Say({tobet:'Tobet has his knife out before you have finished nodding. He', thegg:'Thegg takes the rope in both hands and', _:'You'})} ${b74Say({tobet:'cuts the rope between each pair of wrists, quickly, the way you cut a net, and', thegg:'pulls, and the rope parts, and', _:'cut it, wrist to wrist, and'})} the fourteen get up off the road and walk, not run, out to the crowd, which takes them in without a sound and starts back toward the villages.

The press-gang's sergeant turns round when it is done, and looks at the cut rope, and at the Sixth, and at the road. "Fourteen short," he says. "I'll put it down as the riot." He coils what is left of the rope. "Everybody hates a riot."`,
      ch:[{t:'Back to the tables.', go:()=>startExplore()}]}),
    b7_c4_riot_back:()=>({sp:'The gate', scene:'b7_c4_gate', txt:
`You pick up the rope's end and hand it to the press-gang's sergeant. He takes it, and looks at it, and nods. "Obliged," he says. He gets the file up off the road and marches it in through the gate, past the tables, toward the levy lines, and out on the road the crowd watches it go and does not shout any more.

The Patriotist at the table with no battalion writes something down. It is probably nothing.${b74If('tobet', `\n\nTobet watches the rope go. "From back here," he says, very quietly, "that looked easy." It is not a compliment.`)}`,
      ch:[{t:'Back to the tables.', go:()=>startExplore()}]}),

    /* a sutler's cart: salve for docks, and the one line of the other squad's news */
    b7_c4_sutler:()=>({sp:'A sutler\'s cart', scene:'b7_c4_gate', fx:()=>{ S.f.b7_c4_rumour = 1; }, again:()=>'The sutler\'s cart. "Seven docks. It was five in the city."', txt:
`A sutler has his cart inside the gate with salve and twine and bad wine and a price for everything that is two docks more than it was in the city, because he has come a long way and wants you to know it.

"Seven a jar," he says. "Everything's short." He leans on the tailboard. "My cousin drives for the factors west of here. Says the foreigners are inland, raiding by night, burning factors' houses. ${S.f.b7_c3_key === 'ledger' ? 'Says one lot burned every debt-roll in a factor\'s house in one night, and the Indebted came from three valleys round to look at the smoke.' : S.f.b7_c3_key === 'loot' ? 'Says one lot emptied a factor\'s strongbox and left his debt-rolls on the shelf, which is a funny sort of foreigner.' : 'Says they never take anything but food and never leave anything but smoke.'} Not a soul has seen one in daylight." He shrugs. "Seven docks. War's coming. Salve's going up."`,
      ch:[{t:'A jar of salve.', tag:'7 docks', req:()=>(S.silver || 0) >= 7, fx:()=>{ S.silver -= 7; S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A jar of salve, for seven docks.', 'good'); }, go:'b7_c4_sutler'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* Sorvan, by the empty Bluerose pickets inside the gate */
    b7_c4_sorvan:()=>{ if (b74SorvanWaits()) return {sp:'Sorvan', scene:'b7_c4_gate', txt:
`Sorvan is still on his saddle by the empty pickets, with the lances stacked beside him, waiting to be told when.`,
        ch:[{t:'"Walk with us, Sorvan."', fx:()=>{ S.f.b7_sorvanDone = null; S.camp = (S.camp || []).filter(x => x !== 'sorvan'); b7Join('sorvan'); b74L('thegg', 1); }, go:'b7_c4_sorvan_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      return {sp:'A lancer with no horse', scene:'b7_c4_gate', again:()=>'The Bluerose lancer on his saddle by the empty pickets.', txt:
`By the empty horse pickets just inside the palisade, where the Bluerose companies kept their remounts before they rode east, a man is sitting on a saddle with no horse under it. Blue-enamelled scale over a riding coat that has been mended more than it has been worn. A cavalry sabre. A stack of lances beside him, sawn short.

He has been turned away from three battalion tables this morning, the press-gang's sergeant says. He watched the Sixth clear the gate, and he stood up while it was doing it.

"Sergeant," he says, as you come by. A Bluerose voice, the vowels short. "That was well done. Blades flat. Most of the line would have used the edge."`,
        ch:[{t:'"Who left you here?"', go:'b7_c4_sorvan_more'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c4_sorvan_more:()=>({sp:'Sorvan', scene:'b7_c4_gate', fx:()=>{ if (!S.f.b7_c4_sorvanMet) { S.f.b7_c4_sorvanMet = 1; gain('b7_c4_bluelance'); } }, txt:
`"The company did," he says. "Sorvan. Eleven years a lancer. The company rode east with the Preda in the spring and I had a lame horse, and an officer who did not like me wrote a report. The horse died. The report did not." He touches the stack of lances. "They left me the spares. Nobody else wanted a Bluerose with a report."

"Lether bought our horses. It never bought us. It keeps forgetting that." He picks a lance off the stack and holds it out, shaft first: ash, sawn short, the iron head keen. "Have one. I have six. I can only carry one."

"The battalions want to know what is in the report before they take me. I gather the Sixth does not ask about reports." He looks at you steadily. "I do not ask about the Sixth. The grey coat at the table has been watching you all morning. I have been watching him."${b74If('thegg', `\n\nThegg looks Sorvan up and down, which takes a while. "He stands like a soldier," he says.`)}${b74If('ilsa', `\n\nIlsa, low: "There's a report on him. I've seen it. It says he hit an officer." A pause. "It doesn't say why."`)}`,
      ch:[{t:'"Then walk with us, Sorvan."', fx:()=>{ b7Join('sorvan'); b74L('thegg', 1); b74L('tobet', 1); }, go:'b7_c4_sorvan_join'},
          {t:'"Wait at the horse lines. We\'ll send for you."', fx:()=>{ b74Wait(); }, go:'b7_c4_sorvan_wait'},
          {t:'"Find a company that rides, lancer."', fx:()=>{ S.f.b7_sorvanDone = 0; b74L('thegg', -1); }, go:'b7_c4_sorvan_away'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c4_sorvan_join:()=>({sp:'Sorvan', scene:'b7_c4_gate', txt:
`${b7In('sorvan') ? `He stands, and slings the saddle over one shoulder from habit, and then looks at it, and sets it down on the empty pickets and leaves it there.

"I hit an officer," he says. "In the report. You should know." He settles the lance in his hand. "He was beating a horse. I would hit him again." He looks along the squad. "Which of you was cavalry?" A pause while nobody answers. "Then I will have to teach all of you."${b74If('tobet', `\n\n"Teach me last," Tobet says, from half a step behind. "I'm Indebted. We walk."`)}` : `He nods, and goes back to the horse lines to wait: six walk with the Sixth already, and a lancer can count a file. "When there is room," he says.`}`,
      ch:[{t:'Back to the gate.', go:()=>startExplore()}]}),
    b7_c4_sorvan_wait:()=>({sp:'Sorvan', scene:'b7_c4_gate', txt:
`"The horse lines," he says. "Yes. They are the only part of this camp I understand." He picks up the saddle. "There are no horses in them worth the name, and fifty remounts that have never been ridden by anyone who knew how. I will be there. They need somebody."

He does not move from the pickets yet. The grey coat at the table is still watching.`,
      ch:[{t:'Back to the gate.', go:()=>startExplore()}]}),
    b7_c4_sorvan_away:()=>({sp:'Sorvan', scene:'b7_c4_gate', txt:
`He looks at you for a while, and then at the lances, and then out of the gate at the road east, where the cavalry went.

"There are none," he says. "But I will look." He shoulders the saddle and takes one lance and leaves the rest stacked on the pickets, and walks out of the gate past the crowd, which parts for him, and does not look back.${b74If('thegg', `\n\nThegg watches him go until he is out of sight. "He stood like a soldier," he says again.`)}`,
      ch:[{t:'Back to the gate.', go:()=>startExplore()}]}),

    /* back to the lines at dusk */
    b7_c4_gate_back:()=>{ const ok = !!S.f.b7_c4_riotDone && !!S.f.b7_c4_sorvanMet;
      return {sp:'The muster gate', scene:'b7_c4_gate', txt: ok ?
`The muster is done. The tables are being folded under the awnings, and the grey coat's table is folded first, and carried away, not back into the camp but east, toward the horse lines. The light is going long and yellow across the slope.${b7In('sorvan') ? `\n\nSorvan watches the table go east. "The provost's wagon is at the horse lines," he says. "They are taking their list to it."` : ''}` :
`Back to the lines. ${!S.f.b7_c4_riotDone ? 'Not yet. The crowd is still at the gate, and the Sixth was told to clear it.' : 'Not yet. There is a Bluerose lancer by the empty pickets who stood up when the Sixth cleared the gate, and the squad has not asked him why.'}`,
        ch: ok ? [{t:'Back to the lines at dusk.', onward:true, fx:()=>{ S.f.b7_c4_ph = 3; }, go:()=>{ startExplore('b7_c4_lines'); talk('b7_c4_dusk'); }},
                  {t:'Not now.', go:()=>startExplore()}] :
                 [{t:'Back to the gate.', go:()=>startExplore()}]}; },

    /* ======== phase 3: night, the lines and the horse lines ======== */
    b7_c4_dusk:()=>({sp:B5_FINADD.name, scene:'b7_kravos', fx:()=>{ S.f.b7_c4_dusk = 1; }, again:()=>'The Finadd, by the standard, watching the horse lines.', txt:
`Dusk in the Whitefinders' lines again, and the Finadd waiting by the standard with his pen capped and his paper folded.

"The Patriotists took their table to the horse lines," he says. "The provost has a wagon there with a bar on the door. They have asked him to keep it empty tonight, for somebody." He looks at you. "${b74List() === 'sgt' ? 'I think it is you, Sergeant. I think it has been you since the morning the man in the grey coat came to the barracks.' : `I think it is ${NAME(b74List())}. I think they want to see what the Sixth does about it.`}"

"I cannot order you to go to the horse lines, and I cannot order you not to. I find I am not sorry about either." He puts the pen in his coat.${S.f.b7_c2_ennicEve ? ' His hand stays there a moment, over the page.' : ''}`,
      ch:[{t:'"Then I\'ll go and see, sir."', go:()=>startExplore()}]}),
    b7_c4_to_horse:()=>{ const ph = b74Ph();
      if (ph < 3) return {sp:'The lane east', scene:'b7_kravos', txt:
`The lane east runs down to the horse lines, where the cavalry's remounts are picketed. Nothing there for the Sixth tonight. ${ph === 1 ? 'The muster is in the morning.' : ''}`,
        ch:[{t:'Back to the lines.', go:()=>startExplore()}]};
      return {sp:'The lane east', scene:'b7_c4_horselines', txt: S.f.b7_c4_patriotsDone ?
`East to the horse lines, quiet now, the wagon's lantern out.` :
`East down the lane to the horse lines, in the dark, with the remounts restless ahead and a lantern on a pole by the provost's wagon.${b74Say({tobet:`\n\nTobet has an arrow on the string, held low.`, thegg:`\n\n"Behind me," Thegg says.`, _:''})}`,
        ch:[{t:'To the horse lines.', onward:true, go:()=>{ startExplore('b7_c4_horse'); talk(S.f.b7_c4_patriotsDone ? 'b7_c4_wagon' : 'b7_c4_night'); }},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c4_night:()=>({sp:'The horse lines', scene:'b7_c4_horselines', txt:
`The horse lines are two long pickets of remounts in the dark, fifty horses that the cavalry did not want to take east, tethered head to rope and stamping. They do not like the camp. They do not like the drums that have started on the hill, or the smell of so many frightened men, and every few breaths one of them screams, and the rest answer.

Past the pickets, at the east end, a lantern on a pole and the provost's wagon under it: a high-sided cart with a barred door at the back, standing open. Three men in grey coats are sitting on the tailboard, and two enforcers are standing by the wheel, and none of them are talking.

Between the pickets, the Indebted grooms move in and out among the horses, trying to keep them from breaking their tethers.${b74If('sorvan', `\n\nSorvan stops at the end of the first picket and listens to the horses. "They are about to go," he says. "All of them. Nobody here knows how to stop it."`)}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b7_c4_horse_back:()=>({sp:'The horse lines', scene:'b7_c4_horselines', txt: S.f.b7_c4_patriotsDone ?
`West, back up the lane to the Whitefinders' lines. ${!b74Key() ? 'There are two people waiting at the Sixth\'s fire, the clerk sends to say. One of them is not Letherii.' : 'The fire, and the rest of the night.'}` :
`West, back to the Whitefinders' lines. Not yet. The grey coats are still on the wagon's tailboard, waiting for ${b74ListNm()}, and they will wait all night if they must.`,
      ch: S.f.b7_c4_patriotsDone ? [{t:'Back to the lines.', onward:true, go:()=>{ startExplore('b7_c4_lines'); talk(b74Key() ? 'b7_c4_fire' : 'b7_c4_invite'); }}, {t:'Not now.', go:()=>startExplore()}] : [{t:'Back to the horse lines.', go:()=>startExplore()}]}),

    /* the horses, going wild: the trick's place */
    b7_c4_horses:()=>({sp:'The pickets', scene:'b7_c4_horselines', again:()=>'The remounts on their pickets, restless.', txt:
`Fifty remounts on two pickets, and every one of them about to break. Ears flat. Eyes white. A grey at the end of the near line has his tether at full stretch and his weight on his haunches, and the grooms are standing well back from him, because the last groom who went near him is sitting in the grass holding his arm.

${S.f.b7_c4_horseOk ? 'The near picket is quiet now. Somebody walked it the Bluerose way.' : b74Teach() === 'sorvan' ? 'Sorvan is already walking down the line toward the grey, slow, with one hand out flat.' : b74Teach() === 'ruuk' ? 'Ruuk is watching the grey with his head on one side, grinning. "Faraed has ponies," he says. "Ponies are worse."' : b74Teach() === 'tobet' ? 'Tobet is watching the grey. "We had a plough-horse on the holding," he says. "Same look, the day the factor came."' : 'An old groom, bent, Indebted by his boots, is walking down the line toward the grey without hurrying, counting under his breath.'}`,
      ch:[{t:`Watch ${b74Teach() === 'groom' ? 'the old groom' : b74TeachNm()} bring the line back.`, req:()=>!S.f.b7_c4_horseTried, go:'b7_c4_horse_trick'},
          {t:'Not now.', go:()=>startExplore()}]}),
    /* the trick: Bluerose Horse-Sense. Sorvan if he walks or waits here, else Ruuk, else Tobet, else the old groom */
    b7_c4_horse_trick:()=>{ const w = b74Teach();
      return {sp:w === 'groom' ? 'An old groom' : b74TeachNm(), scene:'b7_c4_horselines', again:()=>S.f.b7_c4_horseOk ? 'A horse line, steadied.' : 'The grey at the end of the line.', txt: w === 'sorvan' ?
`Sorvan walks in to the grey at the end of the line, slow, not quite toward him, and lays one hand flat on the horse's neck below the mane, and starts to count. Not numbers. A low sound under the breath, over and over, that has no words in it.

"Bluerose grooms learn it at six," he says, without stopping it. "Walk in slow. Hand flat. The count. Water. Salve on whatever is bleeding. And never once look frightened, whatever is happening, because they can smell it." The grey's ears come up. "A line that breaks kills more riders than the enemy does. So does a squad." He holds out his free hand. "Come. Hand here. Count with me."` : w === 'ruuk' ?
`Ruuk walks in to the grey, cheerful, not quite toward him, and puts a hand on the horse's neck as if they had been introduced.

"Faraed ponies," he says. "They bite. They kick. They run off a cliff to spite you. You go in slow, you put your hand there, you hum. Not a song. Just a noise, the same noise, all the time." He hums. The grey's ears move. "And you never let them see you're scared. They know. So do people." He grins. "Come and hum."` : w === 'tobet' ?
`Tobet goes in to the grey, slow, from the side, and puts a hand flat on the horse's shoulder, as if it were a plough-horse in a furrow on the factor's holding.

"Our horse was the factor's," he says, low and even. "We weren't allowed to let it panic. Hand flat. Talk low, the same thing over and over. Water when he'll take it. And you don't look frightened, ever, or he knows." The grey's head comes down a finger's width. "My father said it worked on the factor's men too." He almost smiles. "It doesn't. But it works on most things."` :
`The old groom walks in to the grey, bent, not quite toward him, and lays a hand flat on the horse's neck, and counts under his breath, low, a sound with no words in it.

"Bluerose men taught us," he says, without stopping. "When Lether bought their horses it bought their grooms, and the grooms taught us, and nobody in Lether ever asked what we were doing." The grey's ears come forward. "Hand flat. The count. Water. Salve. And never look frightened." He nods at you. "Works on soldiers. I've seen it."`,
        ch:[{t:'Learn it: the walk, the hand, the count, the water, the face.', check:['wits', 16], trick:'b7_c4_horse', req:()=>!S.f.b7_c4_horseTried, fx:()=>{ S.f.b7_c4_horseTried = 1; },
              edges:id=>[id === 'sorvan' && ['he learned it at six', 3], id === 'ruuk' && ['Faraed ponies are worse', 2], id === 'tobet' && ['a plough-horse on the factor\'s holding', 1], id === 'ammet' && ['calm is her trade', 1], id === 'sgt' && ['you have walked a line of frightened soldiers before', 1], id === 'thegg' && ['horses do not like very large men', -1], id === 'perrit' && ['the Holds hum louder than the horses', -1], id === 'pessa' && ['she has never been near a horse and would like to keep it so', -1]],
              near:{t:()=>`Yes, but the grey takes a mouthful of ${b74Nm(b74Who())}'s shoulder before he settles, and leaves a bruise the size of a dock. ${b74Nmc(b74Who())}'ll feel it in the fight.`, fx:()=>bruise(b74Who(), bruiseN())},
              go:'b7_c4_horse_ok', fail:'b7_c4_horse_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c4_horse_ok:()=>({sp:'The pickets', scene:'b7_c4_horselines', fx:()=>{ S.f.b7_c4_horseOk = 1; b74L('sorvan', 1); }, txt:
`By the end of it the grey has his head down and his tether slack, and the near picket has gone quiet along its length, one horse after another, as the hand and the count go down the line. ${by({sgt:'You can', sorvan:'Sorvan nods, once. He', ruuk:'Ruuk is humming still, and', tobet:'Tobet is talking low to the last of them, and', _:'{who} can'})} walk a line of frightened things and bring it back.

${b74Teach() === 'sorvan' ? '"Good," Sorvan says. "Now you know more than half the cavalry. That is not hard. It is still worth knowing."' : '"There," says the teacher, wiping a hand on a coat. "Horses. Soldiers. Same thing, mostly. Less biting with soldiers."'}`,
      ch:[{t:'Back to the horse lines.', go:()=>startExplore()}]}),
    b7_c4_horse_no:()=>({sp:'The pickets', scene:'b7_c4_horselines', txt:
`The hand goes on the neck too fast, and the count comes out as a mutter, and the grey's ears go flat again, and the whole picket starts to move. It takes the grooms a long while to settle it after.

"It took me years," ${b74Teach() === 'groom' ? 'the old groom says' : `${b74TeachNm()} says`}. "And I was six. Six is easier."`,
      ch:[{t:'Back to the horse lines.', go:()=>startExplore()}]}),

    /* the Indebted grooms (rise:true): where the agents sleep, and when they mean to move. The chapter's one "yes, but" on the file */
    b7_c4_grooms:()=>({sp:'An Indebted groom', scene:'b7_c4_horselines', again:()=>'The grooms among the horses, keeping their heads down.', txt:
`A groom is holding two remounts by their head-ropes between the pickets, a boy of sixteen or so in Indebted boots, with a split lip a horse gave him. He watches the squad come up, and then watches the wagon, and then the squad again, because there is nowhere else to look.

The grooms have been at the horse lines all day. They will have seen the grey coats come, and heard them talk. Grooms are like servants: nobody notices they have ears.`,
      ch:[{t:'Ask him, quietly, what the grey coats have said.', check:['wits', 14], rise:true, req:()=>!S.f.b7_c4_groomsTried,
            edges:id=>[id === 'tobet' && ['Indebted, asking Indebted', 2], id === 'sorvan' && ['the grooms know a Bluerose lancer, and trust him', 2], id === 'ammet' && ['she looks at his lip before she asks anything', 1], id === 'sgt' && ['you ask him as a sergeant asks a soldier', 1], id === 'thegg' && ['a very large soldier frightens a boy holding two horses', -1], id === 'ilsa' && ['the grey coat; he knows what it means', -2]],
            near:{t:'Yes, but another groom down the line sees the boy talking to soldiers, and will tell the grey coats for a dock before morning, and the Patriotists will know who asked.', fx:()=>{ b7Filed(1, 'a groom will say who asked'); }},
            fx:()=>{ S.f.b7_c4_groomsTried = 1; }, go:'b7_c4_grooms_ok', fail:'b7_c4_grooms_no'},
          {t:'Leave him to the horses.', go:()=>startExplore()}]}),
    b7_c4_grooms_ok:()=>({sp:'An Indebted groom', scene:'b7_c4_horselines', fx:()=>{ S.f.b7_c4_groomsOk = 1; }, txt:
`He keeps his eyes on the horses and talks to them, and what he says to the horses is for you.

"Five of them on the wagon, and one in the provost's tent with the list, the one in the good coat. They mean to take ${b74List() === 'sgt' ? 'a sergeant' : 'somebody out of a squad of the line'} at the second bell, when the lines are asleep. They asked which way the Whitefinders come down to the horse lines." He rubs a horse's nose. "We told them the lane. The pickets are quicker. Between the horses. They won't look between the horses." He swallows. "They never look at anything that's ours."`,
      ch:[{t:'Back to the horse lines.', go:()=>startExplore()}]}),
    b7_c4_grooms_no:()=>({sp:'An Indebted groom', scene:'b7_c4_horselines', txt:
`"I hold horses," he says, to the horses. "That's all I do. I hold horses." He leads them away down the line, and does not come back.`,
      ch:[{t:'Back to the horse lines.', go:()=>startExplore()}]}),

    /* the provost's wagon */
    b7_c4_wagon:()=>({sp:'The provost\'s wagon', scene:'b7_c4_horselines', again:()=>'The provost\'s wagon, its door open.', txt: S.f.b7_c4_patriotsDone ?
`The provost's wagon, with its door open and its lantern out. The provost has come back from his supper and is sitting on the tailboard looking at the bar, which is bent. He does not ask the Sixth anything. He has decided, on balance, that he did not see it.` :
`The provost's wagon: a high-sided cart with a barred door at the back and a bench inside, and a lantern on a pole. That is all it is. The army's lockup, for drunks and deserters and whoever the Patriotists ask the provost to keep for them overnight.

The door is standing open. On the tailboard three grey coats sit with their hands in their sleeves, and the enforcers stand by the wheel. They are waiting, and they are good at it.`,
      ch:[{t:'Back to the horse lines.', go:()=>startExplore()}]}),

    /* the Patriotists come for a name on the squad's list: the main fight, or, if the squad's file is wanted, the arrest first */
    b7_c4_patriots:()=>{ if (b7Wanted() && !S.f.b7_c4_arrest) return DLG.b7_c4_arrest();
      const who = b74List();
      return {sp:'Grey coats by the wagon', scene:'b7_c4_horselines', html:risingHTML(), fx:()=>{ S.f.b7_c4_listName = who; }, again:()=>'The grey coats on the wagon\'s tailboard, waiting.', txt:
`The three on the tailboard get up as the squad comes along the pickets, without hurrying, and one of them takes a folded paper from his sleeve.

"Sixth Company," he says, pleasantly. "Good. It saves us walking." He reads off the paper. "${who === 'sgt' ? `Sergeant {sgt}. A hook and a ring.` : `${NAME(who)}, of the Sixth. A hook.`}" He folds it. "The Invigilator would like a word. In the morning. The wagon is quite comfortable for a night." He nods at the open door. "Nobody else need be inconvenienced. We are very reasonable."${who === 'ilsa' ? `\n\nIlsa has gone white to the lips. "I wrote those," she says. "The papers. I know what a word in the morning means."` : ''}${who !== 'sgt' && who !== 'ilsa' ? `\n\n${NAME(who)} looks at the open door of the wagon, and at you.` : ''}${b74If('thegg', `\n\nThegg moves without seeming to, until he is between the grey coats and ${who === 'thegg' ? 'the rest of the squad' : 'the wagon'}.`)}`,
        ch:[{t:'"No." Blades out.', go:()=>startBattle('b7_c4_patriots', {})},
            {t:'Come at them between the horses, the way the grooms said.', req:()=>!!S.f.b7_c4_groomsOk, go:()=>startBattle('b7_c4_patriots', {surprise:'p'})},
            {t:'Walk them away from the wagon into the dark of the pickets, talking.', req:()=>!S.f.b7_c4_groomsOk, check:['guile', 15],
              edges:id=>[id === 'ilsa' && ['she knows how agents expect to be talked to', 2], id === 'sorvan' && ['he knows every rope in these pickets', 2], id === 'perrit' && ['she can sound like a purser\'s clerk, because her mother was one', 1], id === 'sgt' && ['they want you to come quietly; you can seem to', 1], id === 'thegg' && ['nobody walks away from a man that size', -2], id === 'ruuk' && ['he grins, and agents do not trust a grin', -1]],
              near:{t:()=>`Yes, but the agent with the paper takes hold of ${b74Nm(b74Who())}'s sleeve as they go, and gets an elbow for it, and gives one back. ${b74Nmc(b74Who())}'ll feel it in the fight.`, fx:()=>bruise(b74Who(), bruiseN())},
              go:()=>startBattle('b7_c4_patriots', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c4_patriots_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c4_patriots_seen:()=>({sp:'Grey coats by the wagon', scene:'b7_c4_horselines', txt:
`The agent with the paper stops at the first picket and smiles. "No," he says. "I don't think we will go into the dark with the Sixth. We have heard about the Sixth." The enforcers unfold their hands from their clubs.`,
      ch:[{t:'Blades out.', go:()=>startBattle('b7_c4_patriots', {surprise:'e'})}]}),

    /* the arrest branch (b7Wanted): the sergeant in the provost's wagon for an hour. Never a cell: a wagon, a bar, a bench */
    b7_c4_arrest:()=>({sp:'The provost\'s wagon', scene:'b7_c4_horselines', html:risingHTML(), fx:()=>{ if (!S.f.b7_c4_arrest) { S.f.b7_c4_arrest = 1; S.f.b7_c4_listName = 'sgt'; } }, again:()=>'The provost\'s wagon, and you in it.', txt:
`They do not wait for the squad to come to them. They come along the pickets with the provost between them, and the provost has a paper with a seal on it, and a warrant is a warrant, even here.

"Sergeant {sgt}," the provost says. He is a tired Letherii of fifty with a bad knee, and he reads it as if it were a ration list. "Wanted by the Invigilator, it says. A ring, and a hook, and a warrant clipped on." He looks at the squad, and at the agents, and at you. "Come quietly, Sergeant, and nobody's hurt tonight, and in the morning it's somebody else's problem."

It is a wagon with a bench and a bar across the door. You sit on the bench. The bar goes across. The lantern hangs outside, and through the bars you can see the squad standing in the dark among the horses, and the grey coats on the tailboard, settling in to wait for morning.${b7In('ilsa') ? `\n\nIlsa is looking at the warrant in the provost's hand. Not at the seal. At the margin.` : ''}${b7In('sorvan') || b74SorvanWaits() ? `\n\nSorvan has gone along the pickets toward the provost's tent, not hurrying, as a man goes to look at a horse.` : ''}`,
      ch:[{t:'Ilsa, at the bars: "Read me the warrant."', req:()=>b7In('ilsa'), go:'b7_c4_arrest_ilsa'},
          {t:'Wait for Sorvan to come back from the provost\'s tent.', req:()=>b7In('sorvan') || b74SorvanWaits(), go:'b7_c4_arrest_sorvan'},
          {t:'Talk to the provost through the bars. Tired men listen.', check:['guile', 15], req:()=>!S.f.b7_c4_arrestTried, fx:()=>{ S.f.b7_c4_arrestTried = 1; },
            edges:id=>[id === 'sgt' && ['you know what a tired Letherii of fifty wants', 2], id === 'ammet' && ['she offers to look at his knee', 2], id === 'tobet' && ['he talks to the provost as an Indebted boy talks to a man who has a bad knee', 1], id === 'perrit' && ['she quotes the warrant\'s own article back to him', 1], id === 'thegg' && ['a very large man at the bars is not reassuring', -2], id === 'ilsa' && ['the provost does not trust the grey coat either', -1]],
            near:{t:'Yes, but the provost keeps the squad\'s salve-jar for his knee, as the price of his name on the release: one salve fewer.', fx:()=>{ if ((S.inv.salve || 0) > 0) S.inv.salve -= 1; }},
            go:'b7_c4_arrest_talk', fail:'b7_c4_arrest_no'},
          {t:'Send for the Finadd.', go:'b7_c4_arrest_ennic'}]}),
    b7_c4_arrest_ilsa:()=>({sp:'Ilsa', scene:'b7_c4_horselines', fx:()=>{ S.f.b7_c4_out = S.f.b7_c4_out || 'ilsa'; b74L('ilsa', 1); }, txt:
`Ilsa takes the warrant out of the provost's hand as a clerk takes a page off a desk, without asking, and he lets her because she is in a grey coat, and reads it at the lantern.

"It's a warrant to bring in," she says, loud enough for the provost. "Not to hold. To bring in, to the Invigilator, in Letheras. The camp has no standing to keep anybody on it overnight. It's in the margin." She taps it. "Somebody new wrote it. They used the hook when they meant the ring." She hands it back. "If you keep the sergeant in your wagon on this, provost, it's your name on the hold, not theirs. I used to file the complaints."

The provost reads the margin for some time. Then he takes the bar off the door.`,
      ch:[{t:'Out.', go:'b7_c4_arrest_out'}]}),
    b7_c4_arrest_sorvan:()=>({sp:'Sorvan', scene:'b7_c4_horselines', fx:()=>{ S.f.b7_c4_out = S.f.b7_c4_out || 'sorvan'; b74L('sorvan', 1); }, txt:
`Sorvan comes back from the provost's tent with the provost's second, a lancer's son by his walk, and the two of them talk low by the wheel in a Bluerose voice for a while, about horses.

Then the provost's second goes and talks to the provost, and the provost looks at the grey coats on his tailboard, and at the horse lines, which are his, and the grooms, who are his, and the fifty remounts, which are his too and would go through his wagon like a flood if somebody untied the wrong rope.

"The lockup's needed," he says. "For a drunk." He takes the bar off the door. "Sorry, Sergeant. Somewhere else for you."${b7In('sorvan') ? `\n\nSorvan, as you come out: "His father rode with mine. Nobody in Lether ever asks who rode with whom."` : ''}`,
      ch:[{t:'Out.', go:'b7_c4_arrest_out'}]}),
    b7_c4_arrest_talk:()=>({sp:'The provost', scene:'b7_c4_horselines', fx:()=>{ S.f.b7_c4_out = S.f.b7_c4_out || 'talk'; }, txt:
`You talk to him through the bars about his knee, and the army, and the last time anybody thanked a provost for anything, and what the Patriotists will say about him in their file if the sergeant of a squad of the line is found in his wagon in the morning with the Edur watching from the hill.

He listens to all of it, rubbing the knee. Then he gets up, slowly, and takes the bar off the door.

"I never had you," he says. "Write that down, if anybody's writing."`,
      ch:[{t:'Out.', go:'b7_c4_arrest_out'}]}),
    b7_c4_arrest_no:()=>({sp:'The provost', scene:'b7_c4_horselines', txt:
`He hears you out, and shakes his head, and rubs his knee. "Warrant's a warrant, Sergeant," he says. "I'd need a signature over mine to undo it. An officer's." He sits down on the tailboard by the grey coats. "I'm not going anywhere."`,
      ch:[{t:'Send for the Finadd.', go:'b7_c4_arrest_ennic'}]}),
    b7_c4_arrest_ennic:()=>({sp:B5_FINADD.name, scene:'b7_c4_horselines', fx:()=>{ S.f.b7_c4_out = S.f.b7_c4_out || 'ennic'; S.f.b7_c4_ennicSigned = 1; }, txt:
`The Finadd comes down the lane at a walk, with his pen in his hand and the cap off it, which in Finadd Ennic is a run.

He reads the warrant at the lantern. Then he takes the provost's paper, and turns it over, and writes on the back in his neat hand, and signs it, and blots it on his sleeve. "Released into my keeping," he says. "On my signature. The Sixth is needed in the line in the morning, by order of the Preda, and I am the officer who says so." He gives the paper back. "You may send my name to the Invigilator, provost. I gather he has it already."${S.f.b7_c2_ennicEve ? ' His other hand goes to his coat as he says it.' : ''}

The provost takes the bar off the door. The Finadd caps his pen.

"I have now signed two things in my life that I read first," he says to you, quietly, on the way out. "I find I could get used to it."`,
      ch:[{t:'Out.', go:'b7_c4_arrest_out'}]}),
    b7_c4_arrest_out:()=>({sp:'The provost\'s wagon', scene:'b7_c4_horselines', txt:
`You come down off the wagon's step into the dark, among the squad, and the grey coats on the tailboard stand up.

"That is irregular," says the one with the paper. He looks at the provost, who is looking at the horses, and at the squad, and at the dark between the pickets. "Very well." He takes his hand out of his sleeve, and there is a knife in it. "Then we will take you to Letheras ourselves."`,
      ch:[{t:'Blades out.', go:()=>startBattle('b7_c4_patriots', {})}]}),

    /* after the fight: the list, the scale out of the wagon */
    b7_c4_patriots_after:()=>({sp:'The provost\'s wagon', scene:'b7_c4_horselines', fx:()=>{ if (!S.f.b7_c4_patriotsDone) { S.f.b7_c4_patriotsDone = 1; S.f.b7_c4_listName = S.f.b7_c4_listName || b74List(); gain('b7_c4_bluescale'); } }, txt:
`The horse lines are quiet. The remounts have stopped screaming, mostly. The man in the better grey coat is sitting against the wagon's wheel with his list on his knees, and he is not going to read it to anybody.

In the wagon, under the bench, wrapped in sacking, there is a shirt of scale, every plate blue-enamelled, laced in rows: a Bluerose officer's. It has been there since the spring, the provost says, coming back from his supper at last and looking at nothing in particular. Its owner was taken to Letheras in this wagon and has not sent for it.

It goes in the kit. The list goes on the brazier by the provost's tent. The provost watches it burn and says he never saw a list.${b7In('sorvan') ? `\n\nSorvan looks at the scale for a long breath. "I knew him," he says. "He beat nobody's horse." He does not say anything else about it.` : ''}${b7In('ilsa') ? `\n\nIlsa watches the list burn. "They'll write another," she says. "But it will be a week. Lists take a week."` : ''}${b74Say({ammet:`\n\nAmmet is among the squad with the needle and the provost's lantern. "Hold still," she says. "And then let's not be here."`, perrit:`\n\nPerrit counts the grey coats on the grass. "Eight," she says. "Last time it was seven. They're learning."`, _:''})}`,
      ch:[{t:'Back to the lines.', onward:true, go:()=>{ startExplore('b7_c4_lines'); talk('b7_c4_invite'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* two visitors at the Sixth's fire: the key's two roads */
    b7_c4_invite:()=>({sp:'The Sixth\'s fire', scene:'b7_c4_tent', txt:
`There are two people at the Sixth's fire when the squad comes back up the lane, and they are not sitting together.

One is an Edur, standing, with his hands folded over his sword-hilt: ${S.f.b7_c4_edurDone ? 'the eldest of the four who came down from the hill at dusk, with the cut on his forearm bound up.' : 'one of the four who came down from the hill at dusk and went back up without their lesson.'} He has been standing there, the clerk says, since the second bell, and has not sat down.

The other is a Letherii captain of one of the levy battalions, older, in a good coat with the badges taken off it, sitting on the Sixth's bench with his hands held out to the coals as if he had every right. He came from a tent at the horse lines with its lantern turned down.

The whole camp heard what happened at the provost's wagon. Both of them have come to ask the Sixth the same thing: where it stands.`,
      ch:[{t:'Hear them out.', go:'b7_c4_key'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c4_key:()=>({sp:'Two visitors', scene:'b7_c4_tent', html:risingHTML(), again:()=>'The Edur and the captain at the Sixth\'s fire, not sitting together.', txt:
`The Edur speaks first, because Edur do. "When the foreigners come, Lether will run," he says. "We have said so to your commanders on the hill, and they have smiled at us, which is how Letherii say they agree and mean to do otherwise." He looks at the Sixth. "We are asking for squads who will stand on our picket, under our eyes, where we can see them stand. Not many. Yours. The Patriotists will leave alone a squad the Edur have asked for by name. That much they still fear."

The captain waits until he has finished, politely, and then speaks to you as if the Edur were not there.

"There are officers in this camp, Sergeant, more than the hill knows, who think the Edur should be the first to meet the foreigners, and the last to leave the field, and that Lether has stood behind Edur long enough." He turns his hands over at the coals. "We are asking for squads who will be ours when it comes to it. Not many. Yours. The Patriotists will write it down, of course. They write everything down."

Neither of them looks at the other. Both of them are waiting.${b74If('thegg', `\n\nThegg is looking at the Edur. The Edur, for once, is looking back at him, level.`)}${b74If('perrit', `\n\nPerrit's lips are moving. She is doing a sum. You can guess the sum.`)}${b74If('tobet', `\n\nTobet is watching the captain's hands. Good hands. They never held a plough.`)}${b7In('ilsa') ? `\n\nIlsa, beside you, very low: "Either way there's a file. One's thinner."` : ''}${b7In('sorvan') ? `\n\nSorvan, low: "I know that captain's tent. Cavalry officers meet in it. They have been meeting in it since the spring."` : ''}`,
      ch:[{t:'"The Sixth will stand on your picket." Under Edur eyes.', fx:()=>{ if (!S.f.b7_c4_key) { S.f.b7_c4_key = 'edur'; b74L('thegg', 1); b74L('perrit', 1); b74L('tobet', -1); b74L('sorvan', -1); b74L('ilsa', 1); b7Rise(-1, 'the Sixth stood under Edur eyes'); b7Filed(-1, 'asked for by the Edur'); } }, go:'b7_c4_key_edur'},
          {t:'"The Sixth is Lether\'s." Go with the captain.', fx:()=>{ if (!S.f.b7_c4_key) { S.f.b7_c4_key = 'letherii'; b74L('tobet', 1); b74L('sorvan', 1); b74L('pessa', 1); b74L('thegg', -1); b74L('ilsa', -1); b7Rise(1, 'the Sixth went with the Letherii officers'); b7Filed(1, 'seen in a horse-lines tent'); } }, go:'b7_c4_key_letherii'},
          {t:'Not yet. "Give me a moment."', go:()=>startExplore()}]}),
    b7_c4_key_edur:()=>({sp:'The Edur', scene:'b7_c4_tent', html:risingHTML(), txt:
`"The Sixth will stand on your picket."

The Edur inclines his head a finger's width further than an Edur usually does to a Letherii. "Good," he says. "At dawn. The picket nearest your lines. We will see you stand." He turns and goes back up the slope toward the shoulder, unhurried.

The captain gets up from the bench and brushes his coat. "A pity," he says, quite kindly. "They will leave you on that picket, Sergeant, when it suits them. Edur always leave." He goes back down the lane toward the horse lines, and the lantern in the tent there goes out.

By dawn the camp knows the Edur asked for the Sixth by name. The Patriotists will take a page out of a file for that. Lether, which saw it too, will keep its head down a little longer.${b74Say({thegg:`\n\nThegg lets out a long breath. "They looked up at me," he says. "I'll stand where they can see it."`, perrit:`\n\nPerrit closes her eyes. "The sum was right," she says. "I hate that it's always right."`, _:''})}${b74If('tobet', `\n\nTobet cuts a notch in his tally-stick. "Under their eyes," he says. "Same as always. Just closer."`)}${b7In('sorvan') ? `\n\nSorvan oils one plate of his scale, slowly, and says nothing about Edur, at length.` : ''}${b7In('ilsa') ? `\n\nIlsa almost smiles. "A page out," she says. "I've never seen a file get thinner."` : ''}`,
      ch:[{t:'Sleep, what is left of the night.', onward:true, fx:()=>{ S.f.b7_c4_ph = 4; }, go:()=>{ startExplore('b7_c4_dawn'); talk('b7_c4_dawn'); }}]}),
    b7_c4_key_letherii:()=>({sp:'The captain', scene:'b7_c4_tent', html:risingHTML(), txt:
`"The Sixth is Lether's."

The captain nods, as if it were a thing already written down somewhere and he were only checking it. "Good," he says. "Nobody will ask anything of you yet. When they do, you will know it is us." He gets up from the bench and goes back down the lane toward the horse lines.

The Edur watches him go. Then he looks at you, for a long breath, as at a storm he has seen come in before. "Most of your people will run," he says. "I had hoped you would not be the ones running from us." He turns and walks back up the slope toward the shoulder, unhurried, and does not look back, on purpose.

By dawn the camp knows the Sixth went to the horse-lines tent. Lether, which saw it, lifts its head a little. The Patriotists, who also saw it, write it down.${b74Say({tobet:`\n\nTobet lets out a breath. "Ours," he says. "I've never been anybody's who wasn't the factor's."`, sorvan:`\n\nSorvan nods, once. "Cavalry officers," he says. "They will want horses for this. They will not have them."`, _:''})}${b74If('thegg', `\n\nThegg watches the Edur all the way up to the shoulder. "He looked up at me," he says. "I wish he hadn't."`)}${b7In('ilsa') ? `\n\nIlsa is pale. "That's another mark," she says. "In a margin, three is a page."` : ''}`,
      ch:[{t:'Sleep, what is left of the night.', onward:true, fx:()=>{ S.f.b7_c4_ph = 4; }, go:()=>{ startExplore('b7_c4_dawn'); talk('b7_c4_dawn'); }}]}),

    /* ======== phase 4: dawn ======== */
    b7_c4_dawn:()=>({sp:'The Whitefinders\' lines', scene:'b7_kravos', txt:
`Dawn below Kravos Hill. The drums have started on the top, slow, and the commanders' banners have gone up on their poles where the whole camp can see them. On the shoulder the Edur fires are going out one by one.

${b74Key() === 'edur' ? 'On the picket nearest the Whitefinders\' lines, where the Edur keep their watch, there is a space left in the line of grey warriors exactly the width of a squad. The Edur standing either side of it do not look at it. Everybody else in the lines does.' : 'At the horse lines the tent with the lantern is struck already, and its officers gone back to their battalions as if they had never left them. Two of them pass the Sixth\'s fire on the lane, and one of them touches his hat, very slightly.'}

The army will move when the hill says. The hill has not said yet.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b7_c4_dawn_ennic:()=>({sp:B5_FINADD.name, scene:'b7_kravos', fx:()=>{ S.f.b7_c4_dawnEnnic = 1; }, again:()=>'The Finadd, by the standard, watching the hill.', txt:
`The Finadd is by the standard, watching the banners go up on the hill.

"${b74Key() === 'edur' ? 'The Edur asked for the Sixth by name,' : 'The captain\'s tent at the horse lines asked for the Sixth,'}" he says, without turning. "I have been told twice before breakfast. Once by somebody who approved." He does not say which way it went. ${S.f.b7_c4_ennicSigned ? '"And my name is on a release in the provost\'s book, which the Invigilator will read by the end of the week." He touches his coat. "I find I do not mind as much as I expected."' : '"I signed nothing last night. I find I was ready to."'}

"The army moves for Letheras when the hill says, Sergeant. The foreigners are coming to it, and the Preda means to meet them in front of the walls." He caps his pen. "Wherever the Sixth stands in that line, it will be standing there because you chose it. Not many sergeants in this camp can say so." He looks at you at last. "I am not sure I envy you."`,
      ch:[{t:'"Yes, sir."', go:()=>startExplore()}]}),

    /* the end: dawn, and on */
    b7_c4_onward:()=>({sp:'The Whitefinders\' lines', scene:'b7_kravos', html:risingHTML(), txt:
`The drums on the hill change their beat, and all down the slope the camp starts to strike its tents, battalion by battalion, the way an army does when it has been told at last which way to face.

${b74Key() === 'edur' ? 'The Sixth strikes its tent and shoulders its kit and walks up the slope to the Edur picket, under Edur eyes, past every Letherii fire in the Whitefinders\' lines. Nobody says anything to it on the way. Everybody watches it go.' : 'The Sixth strikes its tent and shoulders its kit and falls in with the Whitefinders in the line, and two captains of the levy battalions, going past on horseback, look down at it and nod. Up on the shoulder, the Edur do not look down at all.'}${b7In('sorvan') ? `\n\nSorvan walks with the squad with the cut-down lance on his shoulder and his blue scale on, which is too heavy for a man on foot and which he does not take off. He watches the remounts go by on the road, led by levies who hold the ropes too short, and winces every time.` : ''}${b7In('ilsa') ? `\n\nIlsa walks between Thegg's shoulder and the rest of the column, as near to the middle of the squad as she can get, in a grey coat with a muster badge on it. "The first time in six years," she says, "I've been on a list and not in a file."` : ''}${b74Say({thegg:`\n\nThegg talks to his mother's dead, low, in her tongue, as the column moves. There are no new names in it this morning. He seems to be telling them about the Edur.`, _:''})}`,
      ch:[{t:'March. The walls of Letheras are somewhere ahead.', onward:true, go:()=>chapterEnd(4, b74Key() || 'edur')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
