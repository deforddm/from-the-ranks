/* ============ Book Four, Chapter 5: The Wall ============ */
/* The Whirlwind Wall and into Raraku (House of Chains, ch 21–22). The Fourteenth camps short of the Wall, a sandstorm a mile deep round
   the Holy Desert. Across the camp medium squads of the 8th are read onto the marines' rolls in Keneb's company (seen, never the 9th); a
   marine mage of the 8th is "playing with dolls" (camp talk); an officer walks out to the Wall alone in the night and walks back (never
   named, nobody with him seen). At first light the Third holds a 9th's picket at the Wall's edge, and the Whirlwind's riders come out of
   the sand at it. Then, a mile off at the army's head, the Wall goes back off the plain before a grey figure on a grey horse, and the army
   walks in onto an old sea floor. Next morning Blistig rides the line with his nose in a bandage, and the story runs. Water is short; the
   wells are foul. Key (S.f.b4_c5_key): 'seep' (Haddat, or whoever knows it, leads a water party off the column to a seep in the old sea bed;
   riders of the Whirlwind are watering there; the squad comes back with water: S.f.b4_seepWater = 1) or 'column' (stay in the column under
   the dust; the rearguard, with the company, when riders come out of the sand at the wagons). Then the ruined canal city at dusk, and
   deserters of the Whirlwind stripping the dead of a forage party of the 10th. Dust 1 from here (B4DUST; the engine sets it). The seep is an
   invention: no spring inside Raraku is named in canon (hoc-canon §7.4). Notes for later chapters: docs/hoc-ch5-notes.md. */
/* FOR THE ARTIST (75b): names this file uses.
   Items: ART['item/b4_c5_conch'], ['item/b4_c5_seaglass'], ['item/b4_c5_veil'].
   Figures: b4_c5_rider (a Whirlwind rider in the sand, blade or lance), b4_c5_riderbow (the same with a horn bow), b4_c5_waterman (the
   water-master at the seep), b4_c5_deserter (a Whirlwind deserter, ragged, a sack), b4_c5_desbow (the same with a sling), b4_c5_desleader. Reused: b4_c1_hollet, b4_c1_radde, b4_c1_recruit, b2soldier,
   blistig, wickan, orvas. Backdrops (SCENEX): b4_wall_fire (70's, redrawn), b4_c5_wall, b4_c5_withdraw, b4_c5_seabed, b4_c5_seep (the
   sea bed with the seep), b4_c5_canal. Ground (TILEX): b4_c5_wall ('.' sand, ',' blown sand, '#' or 'R' rock, 'S' sand-wall, 'F' fire, 'f' a
   fire, '=' a tent, 'W' a wagon, 'L' a lookout cairn, 'P' the picket's stakes), b4_c5_seabed ('.' old sea floor, ',' shell, '#' coral rock,
   's' petrified ship, 'w' seep, 'r' old road, 'c' a bank of conch shells, 'm' a road-marker stone), b4_c5_canal ('.' paving, '#' ruin, '~'
   dry canal, '-' broken bridge, 'g' the road of standing stones). In fights 't' is low cover and 'o' a drop. */

/* ---- small helpers (b45: Book Four, Chapter Five) ---- */
const b45L = (id, n) => { if (b4In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b45Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b4In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
/* the recruit who walks with the squad (one at a time), and a line for them */
const b45Rec = () => b4In('orvas') ? 'orvas' : b4In('redblade') ? 'redblade' : b4In('warlock') ? 'warlock' : null;
const b45R = m => { const r = b45Rec(), v = r && m[r]; return v ? (typeof v === 'function' ? v() : v) : ''; };
/* Hackle is with the squad: at Sathi's knee, or at the sergeant's if the whistle brought him home in Book Two */
const b45Dog = () => b4In('sathi') || (!!b4Was('b2_hackleBack') && !(S.dead && S.dead.hackle));
const b45New = () => HOC_NEW.filter(id => b4In(id));
/* the phase: 1 the camp short of the Wall (night), 2 the Wall's edge (first light), 3 the sea bed (inside), 4 the canal city (dusk) */
const b45Ph = () => S.f.b4_c5_ph || 1;
const b45Key = () => S.f.b4_c5_key || '';
const b45KeyDone = () => !!(S.f.b4_c5_seepDone || S.f.b4_c5_rearDone);
/* the dust in the scenes (S.dust; the engine sets 1 at the chapter's start). Read S, not a fight left over in B */
const b45Dust = () => (S && S.dust != null ? S.dust : 1);
/* Haddat's mood, from the road so far: her regard, the dead carried out of the Vathar (Ch3), the Fall climbed at night (Ch2) */
const b45HMood = () => { const l = (S.loy && S.loy.haddat) || 0, s = l + (S.f.b4_carried === 1 ? 1 : 0) + (S.f.b4_fallClimbed === 1 ? 1 : 0); return s >= 3 ? 'easy' : s <= 0 ? 'hard' : ''; };
/* who knows the seep: Haddat (her mother's people sold water in Hissar), else Orvas if he walks with the squad, else a Seti scout who
   remembers the Third (Ch4's seti road), else Darrut (an old map in Aren's Guard house), else a Seti scout of the column's screen */
const b45Finder = () => b4In('haddat') ? 'haddat' : b4In('orvas') ? 'orvas' : S.f.b4_setiSaved ? 'seti' : b4In('darrut') ? 'darrut' : 'scout';
/* the finder as chosen at the key, if still with the squad (else the Seti scout who rode along) */
const b45F = () => { const f = S.f.b4_c5_finder || b45Finder(); return f === 'seti' || f === 'scout' || b4In(f) ? f : 'scout'; };
const b45FName = () => ({haddat:'Haddat', orvas:'Orvas', darrut:'Darrut', seti:'the Seti scout', scout:'the Seti scout'})[b45F()];
/* the chapter's one quiet line for the Barrow dead (one of them), on the sea floor */
const b45Barrow = () => { const f = b4Fallen(); if (!f.length) return ''; const id = f[0];
  return ({sathi:`Sathi would have found a horse by now, somehow, and been off across this floor at a gallop to see what the ship was, with Hackle running flat out behind. She stayed on the Barrow. ${b45Dog() ? 'Hackle came home, and walks the old sea with his nose down.' : 'Hackle did not come home.'}`,
    haddat:'Haddat would have known what this floor was called before it was a floor, and said it, and then said the names. She stayed on the Barrow.',
    tangle:'Tangle would have counted the shells. Out loud, by the handful, until somebody threw one at him. He stayed on the Barrow.',
    marrow:'Marrow would have sat down on the first shell bank and said, "Child, the sea went away and left its bones, and nobody buried them either." She stayed on the Barrow.'})[id] || `${TPL[id].name} would have had something to say about this floor. ${TPL[id].name} stayed on the Barrow.`; };
/* the kit worn by a squadmate in a fight */
const b45Wears = (u, key) => !!(u && u.side === 'p' && !u.ally && S.gear && S.gear[u.id] && Object.values(S.gear[u.id]).includes(key));

/* ---- the dust and the squad's range: what the bow would reach without the sand (u.b4rng0), so the veil, the sea-glass and the trick can
   give it back. The shortening itself is 70's (b4Shorten); this works it out again with the veil's half. ---- */
const b45Pen = u => { const d = b4DustNow(); return b45Wears(u, 'b4_c5_veil') ? Math.floor(d / 2) : d; };
const b45Rng = (u, clear) => { const r0 = u.b4rng0; if (!r0 || r0 <= 1) return u.rng; return Math.max(2, r0 - (clear ? 0 : b45Pen(u))) + (u.b4glass ? 1 : 0); };
{ const _mkParty = mkParty;
  mkParty = function(id, x, y){ if (!b4On() || !B || !B.def) return _mkParty(id, x, y);
    const sd = S.dust, has = Object.prototype.hasOwnProperty.call(B.def, 'dust'), bd = B.def.dust; let u;
    try { S.dust = 0; B.def.dust = 0; u = _mkParty(id, x, y); } finally { S.dust = sd; if (has) B.def.dust = bd; else delete B.def.dust; }
    u.b4rng0 = u.rng; if (u.rng > 1 && b4DustNow() && b45Wears(u, 'b4_c5_seaglass')) u.b4glass = true;
    u.rng = b45Rng(u); return u; }; }
/* the sea-glass: its first shot in the dust reaches one further, and then it is an ordinary lens */
{ const _attack = attack;
  attack = function(a, t, o = {}){ const g = b4On() && B && a && a.b4glass && t && cheb(a, t) > 1; const r = _attack(a, t, o);
    if (g && a.b4glass) { a.b4glass = false; a.rng = B.b4road && B.b4road.on ? b45Rng(a, true) : b45Rng(a); blog(`${a.name} sights through the old sea-glass, and the shot goes further into the dust than it should.`); }
    return r; }; }
/* the veil: half the dust's sputter on the wearer's sorcery too */
{ const _useAb = useAb;
  useAb = function(k, x, y){ const u = B && B.cur; if (!b4On() || !B || !B.def || !b45Wears(u, 'b4_c5_veil') || !b4DustNow()) return _useAb(k, x, y);
    const has = Object.prototype.hasOwnProperty.call(B.def, 'dust'), bd = B.def.dust; B.def.dust = Math.floor(b4DustNow() / 2);
    try { return _useAb(k, x, y); } finally { if (has) B.def.dust = bd; else delete B.def.dust; } }; }

/* ---- The Sea-Bed Road: reading the old sea floor, the water-sellers' way. Not sorcery. ---- */
Object.assign(TRICKS, {
  b4_c5_seabed:{name:'The Sea-Bed Road', ch:5, use:'fight', ab:'t_b4_c5_seabed', where:'the old sea road inside Raraku, at a marker stone',
    lore:'The floor of Raraku was a sea, and before the sea went away there were roads along its shore and out across its shallows, and the water-sellers of Hissar still cut their marks on the old marker stones. Read the marks and the ground reads itself: where the dust lies thin, where the old road runs firm under it, where the eye can see further than the sand wants it to.',
    get fx(){ return `Once a fight: the bearer reads the ground for the squad. Until the bearer's next turn every squadmate ignores the dust's range penalty and moves +1. Not sorcery: it never sputters.`; }},
});
Object.assign(AB, {
  t_b4_c5_seabed:{name:TRICKS.b4_c5_seabed.name, trick:'b4_c5_seabed', self:true, desc:()=>TRICKS.b4_c5_seabed.fx,
    run(u){ const sq = B.units.filter(p => p.side === 'p' && !p.ally && p.hp > 0); B.b4road = {u, on:true};
      sq.forEach(p => { p.b4roadMv = true; p.mv += 1; p.rng = b45Rng(p, true); float(p, '+1 move', '#e8d8a8'); });
      AUDIO.play('pick'); sparks(u.x, u.y, 8, '#d8c8a0', .4); float(u, 'the old road', '#f0e0b0');
      blog(`${u.name} goes down on one knee and reads the ground: where the old road runs firm under the sand, where the dust lies thin. "${u.id === 'haddat' ? 'There. And there. Along the marks.' : 'There. Along the old road.'}" For a turn the squad moves on it, and sees through it.`); }},
});
{ const _sts = squadTurnStart;
  squadTurnStart = function(u){ const r = _sts(u); const R0 = b4On() && B && B.b4road;
    if (R0 && R0.on && R0.u === u) { R0.on = false; B.units.filter(p => p.b4roadMv).forEach(p => { p.b4roadMv = false; p.mv -= 1; p.rng = b45Rng(p); }); blog('The dust closes over the old road again.'); }
    return r; }; }

/* ---- the words this chapter adds to Book Four's glossary ---- */
GLOSSX.hoc.push(
  [5, 'The Whirlwind Wall', 'The sandstorm round Raraku, more than a mile deep, standing up off the desert like a cliff of brass. It went back off the plain the day the Fourteenth came to it, and the army walked in.', ()=>!!(S.f && S.f.b4_c5_wallSeen)],
  [5, 'The old sea', 'Inside the Wall, Raraku\'s floor is the bed of a sea that went away: shell banks, sea bones, ships turned to stone, roads along shores that are not there, and a city on canals with no water in them.', ()=>!!(S.f && S.f.b4_c5_inside)]);

/* ---- the reading short of the Wall (the chapter's first halt and its fire) ---- */
B4DECK[5] = {scene:'b4_wall_fire', where:'the sand in the lee of the rock, smoothed flat with a palm', set:'Night short of the Whirlwind Wall, a fire in the lee of a rock, and the Wall itself a mile off, louder than the fire.',
  back:'b4_c5_wallfire', backT:'Back to the fire.',
  say:{marrow:`"Sand in the warren," Marrow says, "sand in the bread, sand in the cards." She smooths a place flat with her palm and blows on it, and it is not flat any more. "One card, child. Before the wind chooses for us."`,
    tallow:`"My grandmother never read in a wind," Tallow says, holding the deck in both hands against it. "She said the cards go where they like." He shuffles very carefully, close to his chest. "One, Sergeant. Quick."`,
    oldninth:`The old soldier finds the Third's fire by the smell of it and sits down out of the wind. "The 8th's got a mage playing with dolls," he says. "Grass dolls, by his fire. The marines won't say why." He shuffles one-handed, slowly. "Mine's cards. One. Then we'll know as much as he does."`}};

const B4CH5 = {
  title:'The Wall', number:'Five',
  intro:{loc:'The Whirlwind Wall', sub:'Weeks north of the Vathar · the Fourteenth before Raraku', scene:'b4_c5_wall', cap:'A storm of sand standing up off the desert from one end of the sky to the other, and the column very small under it.',
    paras:[
`For days it was a smudge on the horizon, and then a bank of cloud the colour of old brass, and then it was not cloud. It stands up off the desert from one edge of the world to the other, a wall of moving sand more than a mile deep, and it does not come closer and it does not go away. Behind it is Raraku. Inside Raraku is the Whirlwind.`,
()=>`You are Sergeant {sgt}, Third squad, 9th Legion. The dust has been in everything since the hills: in the water, in the bread, in the seams of the bones at the squad's throats. It shortens the eye. It shortens the bow. ${b4In('marrow') ? 'Marrow says it is in the warren too, and that the warren does not like it.' : 'The healers say it is in the warren too.'}${S.f.b4_leoman ? ' The raids have stopped since the Wall came up over the horizon. The 9th does not believe Leoman has gone home.' : ''}`,
`The Fourteenth makes camp at dusk a mile short of the Wall, and sits in the noise of it, and waits for the Adjunct to decide what an army does about a storm.`],
    go:'Into the camp', node:'b4_c5_start'},

  areas:[
    /* 16 x 12 (b4_c5_wall, night).  . sand  , blown sand  R red rock  S drifted sand (blocks)  F the Third's fire in the lee of the rocks
       f other fires  = tents  W the water wagons  L a lookout cairn on the north drift  > north-east, toward the Wall's edge */
    { id:'b4_c5_camp', title:'Short of the Wall · the 9th\'s camp', sub:'Night · the Wall a mile off', hint:'Tap ground to move · tap a figure to talk · the Third\'s fire is in the lee of the rocks', decor:'b4_c5_wall', dark:true,
      map:[ "SSSSSSSSSSSSSSSS",
            "S,,..,,L,....,,S",
            "S.=..=......=..>",
            "S......RFR.....S",
            "S.=............S",
            "S....,....,..=.S",
            "S..f.....W...W.S",
            "S..............S",
            "S.=...,....=...S",
            "S......f.......S",
            "S.,.......,..,.S",
            "SSSSSSSSSSSSSSSS" ],
      walk:'.,', triggers:{F:'b4_c5_wallfire', W:'b4_c5_wagon', L:'b4_c5_lookout', '>':'b4_c5_to_edge'}, start:{x:8, y:5},
      quest:()=> !S.f.b4_c5_raddeSaid ? 'Sergeant Radde, by the tents.' : 'The Third\'s fire, and sleep. The Wall\'s edge at first light, north-east.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:4, y:4, node:()=>S.f.b4_c5_raddeSaid ? 'b4_c5_radde_again' : 'b4_c5_radde', fresh:()=>!S.f.b4_c5_raddeSaid},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:10, y:7, node:()=>'b4_c5_hollet', fresh:()=>!S.f.b4_c5_hollet},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:6, y:9, node:()=>S.f.b4_c5_recTold ? 'b4_c5_recruits_again' : 'b4_c5_recruits', fresh:()=>!S.f.b4_c5_recTold},
        {id:'eighth', name:'The 8th\'s fires, across the hollow', kind:'b2soldier', x:13, y:4, node:()=>'b4_c5_reshuffle', fresh:()=>!S.f.b4_c5_reshuffle},
        {id:'tenth', name:'A regular of the 10th', kind:'b2soldier', x:3, y:7, node:()=>'b4_c5_bredd', fresh:()=>!S.f.b4_c5_bredd} ] },

    /* 16 x 12 (b4_c5_wall, first light).  S the Wall itself  , blown sand at its foot  . sand  R red rock  P the 9th's picket stakes
       < back to the camp */
    { id:'b4_c5_edge', title:'The Whirlwind Wall · the 9th\'s picket', sub:'First light · the Wall a quarter-mile off', hint:'Tap ground to move · tap a figure to talk · the picket is in front of the Wall', decor:'b4_c5_wall',
      map:[ "SSSSSSSSSSSSSSSS",
            "SSSSSSSSSSSSSSSS",
            ",,S,,,SS,,,,S,,,",
            ",,,,,,,,,,,,,,,,",
            "..,,..,...,,..,.",
            "....R.......R...",
            "......PPP.......",
            "..RR............",
            "...........R....",
            "<...............",
            "......,.........",
            "R..........,..RR" ],
      walk:'.,', triggers:{P:'b4_c5_picket', S:'b4_c5_sandwall', '<':'b4_c5_edge_back'}, start:{x:7, y:9},
      quest:()=> !S.f.b4_c5_ridersDone ? 'The picket stakes, in front of the Wall.' : 'Watch the head of the army, west along the line.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:9, y:8, node:()=>S.f.b4_c5_ridersDone ? 'b4_c5_withdraw' : 'b4_c5_radde_edge', fresh:()=>!!S.f.b4_c5_ridersDone || !S.f.b4_c5_raddeEdge},
        {id:'scouts', name:'Wickan riders', kind:'wickan', x:2, y:5, node:()=>'b4_c5_scouts', show:()=>!!S.f.b4_c5_withdrawn, fresh:()=>!!S.f.b4_c5_withdrawn && !S.f.b4_c5_scouts} ] },

    /* 16 x 12 (b4_c5_seabed, day).  . old sea floor  , shell  # coral rock  s a petrified ship  r the old road  c a bank of conch shells
       m a marker stone on the old road  < back toward the Wall  > on, toward the canal city */
    { id:'b4_c5_seabed', title:'Raraku · the old sea floor', sub:'Morning · the column halted on the road', hint:'Tap ground to move · tap a figure to talk · the column is on the old road', decor:'b4_c5_seabed',
      map:[ "##..,,....rr..##",
            "#..,,,....rr...#",
            "..ss......rr..,,",
            ".ssss.....rr.,,c",
            "..........rr....",
            "..........rr..#.",
            "...,......rr....",
            "..##..,...mr....",
            "..........rr...>",
            "<.,.......rr....",
            "....,,....rr..,.",
            "##........rr..##" ],
      walk:'.,r', triggers:{s:'b4_c5_ship', c:'b4_c5_shells', m:'b4_c5_marker', '<':'b4_c5_sea_back', '>':'b4_c5_to_canal'}, start:{x:9, y:9},
      quest:()=> !b45Key() ? 'Sergeant Radde, on the road. The water.' : !b45KeyDone() ? (b45Key() === 'seep' ? `${b45FName().replace(/^t/, 'T')} and the water party.` : 'The wagons at the back of the column.') : 'On, toward the canal city, east.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:12, y:6, node:()=>b45Key() ? 'b4_c5_radde_sea' : 'b4_c5_key', fresh:()=>!b45Key()},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:8, y:4, node:()=>'b4_c5_hollet_sea', fresh:()=>!S.f.b4_c5_holletSea},
        {id:'recruits', name:'The freckled recruit', kind:'b4_c1_recruit', x:6, y:10, node:()=>'b4_c5_recruit_sea', fresh:()=>!S.f.b4_c5_recSea},
        {id:'seti', name:'A Seti archer', kind:'b4_c4_setiarcher', x:13, y:2, node:()=>'b4_c5_seti', show:()=>!!S.f.b4_setiSaved, fresh:()=>!!S.f.b4_setiSaved && !S.f.b4_c5_seti},
        {id:'waterparty', name:'The water party', kind:'b4_c1_recruit', x:14, y:9, node:()=>'b4_c5_seep_go', show:()=>b45Key() === 'seep' && !S.f.b4_c5_seepDone, fresh:()=>b45Key() === 'seep' && !S.f.b4_c5_seepDone},
        {id:'wagons', name:'The column\'s last wagons', kind:'b2soldier', x:2, y:9, node:()=>'b4_c5_rear_start', show:()=>b45Key() === 'column' && !S.f.b4_c5_rearDone, fresh:()=>b45Key() === 'column' && !S.f.b4_c5_rearDone} ] },

    /* 16 x 12 (b4_c5_canal, dusk).  . paving  # ruin  ~ a dry canal  - a broken bridge  g the road of standing stones  < back  > on, the night */
    { id:'b4_c5_canal', title:'Raraku · the canal city', sub:'Dusk · the column camped in the ruins', hint:'Tap ground to move · tap a figure to talk · the canals are dry; cross by the bridges', decor:'b4_c5_canal', dark:true,
      map:[ "####..####..####",
            "#..#..#..#..#..#",
            "......g.........",
            "~~~~~~~-~~~~~~~~",
            "~~~~~~~-~~~~~~~~",
            "....#.......#...",
            "..g.........##..",
            "#...........#..#",
            "~~~~~~~~-~~~~~~~",
            "................",
            "<..#........#..>",
            "####..####..####" ],
      walk:'.-', triggers:{g:'b4_c5_ghosts', '~':'b4_c5_canalbed', '<':'b4_c5_canal_back', '>':'b4_c5_night'}, start:{x:7, y:9},
      quest:()=> !S.f.b4_c5_desDone ? 'The 10th\'s forage party. Across the canals, north.' : 'The night, east, with the column.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:10, y:9, node:()=>'b4_c5_radde_canal', fresh:()=>!S.f.b4_c5_raddeCanal},
        {id:'deserters', name:'Shapes among the ruins', kind:'b4_c5_deserter', x:10, y:1, node:()=>'b4_c5_des_start', show:()=>!!S.f.b4_c5_raddeCanal && !S.f.b4_c5_desDone, fresh:()=>!!S.f.b4_c5_raddeCanal && !S.f.b4_c5_desDone} ] } ],

  battles:{
    /* the 9th's picket at the Wall's edge at first light: riders of the Whirlwind come out of the sand, in blowing sand (dust 2), with the
       company. The second ground: the Wall's foot, where the sand is moving and the rest of them are. */
    b4_c5_wallriders:{title:'The picket at the Wall', style:'b4_c5_wall', dust:2, open:true, warrenText:'The Whirlwind Wall · the warren is full of sand, and something else', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8], [0, 9]], n:1},
      map:["..,,..,,",".,....t.","..,.....","..t..,..","........",".,....,.","...t....","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c5_ridechief',3,1],['b4_c5_rider',1,2],['b4_c5_rider',6,2],['b4_c5_riderbow',4,0],['b4_c5_rider',5,3]], xp:160, after:'b4_c5_riders_after',
      waves:[{round:3, foes:[['b4_c5_rider',7,3]], text:'Another comes out of the sand at the side, at a walk, as if the Wall had put him down there and gone back for more.'}],
      preText:()=>`Tangle's sharpers go off at the foot of the sand, two flat cracks the wind takes away at once, and the riders coming out of it come out of it in pieces.`,
      stage2:{title:'The Wall\'s foot', xp:80,
        text:()=>`They go back into the sand the way they came, and the squad goes after them, which is the stupidest thing the Third has done since Aren, up to the very foot of the Wall, where the sand is moving.\n\nUp close it is not a wall. It is a river of sand going sideways, roaring, a hundred feet high and then a thousand, and at its foot, where it drops what it is carrying, there are dunes being made and unmade while you watch. The riders who are left have turned at the foot of it with their backs to the storm. Their veils are up. Their eyes are the only thing about them that is still.${b45Say({haddat:`\n\n"They will go back into it if we let them," Haddat says, with her shield up against the grit. "They know the way through. We do not."`, tebbet:`\n\nTebbet has an arrow on the string and nowhere to shoot it that the wind will let him. "Nothing to aim at," he says. "Only wind."`, _:''})}`,
        map:["SSSSSSSS",",,S,,,S,",",,,,,,,,","..t..,..","........",".,...t..","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c5_ridechief',3,3],['b4_c5_rider',1,4],['b4_c5_rider',6,4],['b4_c5_riderbow',4,2]]} },
    /* 'seep': the water party at the seep in the old sea bed, and a band of the Whirlwind's riders watering there. The second ground: the
       seep's lip, where their water-master stands with the skins. */
    b4_c5_seep:{title:'The seep', style:'b4_c5_seabed', dust:1, open:true, warrenText:'The old sea bed · the warren here is very old, and dry', warren:{meanas:1, denul:1}, music:'battle',
      map:["..##..,.",".,....t.","...ww...","..twwt..","...ww...",".,....,.","..t.....","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c5_waterman',3,1],['b4_c5_rider',1,3],['b4_c5_rider',6,3],['b4_c5_riderbow',5,0],['b4_c5_rider',2,5]], xp:160, after:'b4_c5_seep_after',
      waves:[{round:2, foes:[['b4_c5_rider',7,5]], text:'Another comes up out of a fold in the shell banks leading a string of horses, and lets them go, and draws.'}],
      preText:()=>`Tangle's burner goes into the dry weed round the seep's far side, and the horses on their picket go up on their hind legs, and the riders who were filling skins are suddenly riders without horses.`,
      stage2:{title:'The seep\'s lip', xp:80,
        text:()=>`They fall back round the seep, the way they came, and the squad goes after them, round the wet black lip of it where the old sea bed is soft, to the far side where their skins are stacked and their water-master is standing over them.\n\nHe is older than the rest, with a grey veil and a staff of black sea-wood, and he has been watering riders at this hole for longer than the Whirlwind has had a name. He does not run. He is not going to leave the water to anybody.${b45Say({haddat:`\n\nHaddat sees the staff, and the marks cut in it, and says something under her breath in Hissari that might be a prayer and might be the water-sellers' word for a thief.`, orvas:`\n\nOrvas grounds his lance in the soft bed. "That is the one who keeps the water," he says. "In the Odhan you would let him live. Here I do not know."`, _:''})}`,
        map:["##....##","#..t...#","...ww...","..wwww..","...ww...","#......#","#..t...#","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c5_waterman',2,0],['b4_c5_rider',1,4],['b4_c5_rider',6,4],['b4_c5_riderbow',4,0]]} },
    /* 'column': the column's rearguard in the dust, riders out of the sand at the last wagons, with the company. The second ground: the
       last wagons themselves, where the riders have got among the water barrels. */
    b4_c5_rearguard:{title:'The rearguard', style:'b4_c5_seabed', open:true, warrenText:'The old sea bed · the warren is full of sand', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8], [0, 9]], n:1},
      map:["..,...,.",".,....t.","..rr....","..rrt...","..rr....",".,rr..,.","..rr....","..rr....","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c5_ridechief',3,1],['b4_c5_rider',1,2],['b4_c5_rider',6,2],['b4_c5_riderbow',4,0],['b4_c5_rider',5,3]], xp:160, after:'b4_c5_rear_after',
      waves:[{round:2, foes:[['b4_c5_rider',7,4]], text:'Another comes out of the dust on the flank at a dead gallop, low on his horse, and goes for the wagon nearest the end.'}, {round:3, foes:[['b4_c5_riderbow',0,3]], text:'And a bow, from a shell bank nobody had looked at, a short horn bow and a rider who has done this before.'}],
      preText:()=>`Tangle's sharpers go off under the first riders' horses, and the charge on the last wagons is two charges, going different ways.`,
      stage2:{title:'The last wagons', xp:80,
        text:()=>`They break back along the column, the way they came, and the squad goes after them to the last of the wagons, where three of the riders are off their horses among the water barrels with knives out, cutting the lashings.\n\nThe barrels are what they came for. A barrel cut loose on the old road is a barrel the 9th does not drink from, and the carters are under the wagon beds where they have the sense to be, and the riders' leader is standing on the tailboard of the last wagon with a lance, shouting the others on in a tongue of the deep desert.${b45Say({darrut:`\n\nDarrut sets his big shield. "Water barrels," he says. "In the Guard we'd have had crossbows in those." He sounds as if this were the worst day of his life, and he has had worse.`, tangle:`\n\nTangle looks at the barrels and the riders among them and puts his hand flat over the satchel. "Not in among the water," he says. "Not even me."`, _:''})}`,
        map:["........",".tt..tt.","........","..t..t..","........",".,....,.","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c5_ridechief',3,1],['b4_c5_rider',1,3],['b4_c5_rider',6,3],['b4_c5_riderbow',4,0]]} },
    /* the ruined canal city at dusk: deserters of the Whirlwind stripping the dead of a forage party of the 10th. The second ground: the
       broken bridge, where their leader and the plunder are. */
    b4_c5_deserters:{title:'The canal city', style:'b4_c5_canal', dark:true, open:true, pitTxt:'the dry canal', warrenText:'The canal city · the warren is old here, older than the Vathar\'s', warren:{meanas:1, denul:1}, music:'battle',
      map:["#..#..#.",".,....t.","........","oooo-ooo","oooo-ooo","........","..t..t..","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c5_deserter',2,1],['b4_c5_deserter',5,1],['b4_c5_desbow',5,0],['b4_c5_deserter',3,6],['b4_c5_deserter',5,5]], xp:150, after:'b4_c5_des_after',
      waves:[{round:2, foes:[['b4_c5_deserter',0,6]], text:'Another comes up out of the dry canal at the side with a sack over his shoulder, and drops it, and has a knife.'}],
      preText:()=>`Tangle's burner goes up in the ruin at the canal's edge, and the dusk is orange, and the men stooped over the 10th's dead stand up out of it all at once.`,
      stage2:{title:'The broken bridge', xp:75,
        text:()=>`They go back across the canal by the one bridge left, the way they came, and the squad goes after them over the broken stones with the dry canal yawning on either side, to a little square on the far bank where the old city kept something once, a market or a temple, with three walls left.\n\nThe plunder is there in a heap: the 10th's boots, the 10th's water skins, a pair of Malazan short swords. Their leader is a big man in a Whirlwind officer's sash with the badges cut off it, and he has the look of somebody who walked out of Sha'ik's army in the night and is not going to be taken back to anybody's.${b45Say({haddat:`\n\n"He left her," Haddat says. "He left the goddess. And this is what he did with it." She cannot decide what she feels about that, and does not try.`, marrow:`\n\n"Deserters," Marrow says. "Every army grows them, child. Ours too." She ties a knot in her string, hard.`, _:''})}`,
        map:["##....##","#..t...#","#......#","..t..t..","........","oooo-ooo","oooo-ooo","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c5_desleader',2,0],['b4_c5_deserter',1,3],['b4_c5_deserter',6,3],['b4_c5_desbow',4,0]]} } },

  foes:{
    /* the Whirlwind's riders: desert warriors of the deep tribes, veiled against the sand, out of the Wall on its own side */
    b4_c5_rider:{name:'Whirlwind rider', sig:'r', kind:'b4_c5_rider', hp:20, ac:13, atk:7, dmg:[1,8,2], rng:1, mv:5, init:3, sk:['hitrun'], verb:'cuts at'},
    b4_c5_riderbow:{name:'Rider with a horn bow', sig:'b', kind:'b4_c5_riderbow', hp:16, ac:12, atk:7, dmg:[1,8,2], rng:5, mv:4, init:2, sk:['pin'], verb:'shoots at'},
    b4_c5_ridechief:{name:'The riders\' leader', sig:'C', kind:'b4_c5_rider', hp:40, ac:14, atk:8, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'brings a tulwar down on'},
    b4_c5_waterman:{name:'The water-master', sig:'W', kind:'b4_c5_waterman', hp:36, ac:14, atk:8, dmg:[1,10,3], rng:1, mv:3, init:1, boss:true, sk:['reach', 'rally', 'shove'], verb:'swings a sea-wood staff at'},
    /* the deserters: men who walked out of Sha'ik's army in the night and are picking the dead of both armies for what will sell */
    b4_c5_deserter:{name:'Whirlwind deserter', sig:'d', kind:'b4_c5_deserter', hp:20, ac:12, atk:6, dmg:[1,8,2], rng:1, mv:4, init:2, sk:['bleed'], verb:'slashes at'},
    b4_c5_desbow:{name:'Deserter with a sling', sig:'g', kind:'b4_c5_desbow', hp:16, ac:11, atk:7, dmg:[1,6,2], rng:5, mv:4, init:2, sk:['pin'], verb:'slings a stone at'},
    b4_c5_desleader:{name:'The sash with no badges', sig:'D', kind:'b4_c5_desleader', hp:36, ac:14, atk:8, dmg:[1,10,3], rng:1, mv:4, init:1, boss:true, sk:['rally', 'shove'], verb:'brings a heavy tulwar down on'} },

  gear:{ // slot ∈ weapon|armour|trinket. who = ids that can wear it, or null for anyone.
    b4_c5_conch:{name:'A conch from the sea bed', slot:'trinket', who:null, stat:{wits:1},
      line:'A big spiral shell the colour of old cream inside, pink as a mouth, picked up off a bank of thousands on the floor of a sea that went away. Hold it to the ear and there is the sea in it, the Quon coast says. Whoever carries it listens a little harder: +1 wits. Tallow\'s grandmother would have known what it meant to find one this far from water.'},
    b4_c5_seaglass:{name:'A lens of old sea-glass', slot:'trinket', who:null,
      line:'A disc of thick green glass, clouded at the edge and clear at the heart, prised out of the stern-light of a ship turned to stone. Held to the eye it cuts through haze. In the dust, the bearer\'s first shot in a fight reaches one further. After that it is only a pretty stone.'},
    b4_c5_veil:{name:'A desert rider\'s veil', slot:'trinket', who:null,
      line:'A long strip of fine grey cotton, wound about the head and across the mouth and nose the deep-desert way, with a loop of red thread at one end that meant something to whoever wore it first. Worn so, the dust is half as bad: half its range penalty on the wearer\'s shots, and half its sputter on the wearer\'s sorcery.'} },

  scenes:{
    b4_c5_wall:{loc:'The Whirlwind Wall', sub:'The Wall · a mile off', cap:'A storm of sand standing up off the desert from one end of the sky to the other, brass-coloured and roaring, and the column very small under it.', amb:'wind'},
    b4_c5_withdraw:{loc:'The Whirlwind Wall', sub:'The Wall goes back', cap:'Far off along the plain the Wall drawing back from the army like a tide going out, and the army very small in front of it.', amb:'wind'},
    b4_c5_seabed:{loc:'Raraku', sub:'The old sea floor', cap:'A white floor of shell going away to the haze, the bones of great fish standing out of it, a ship of stone on its side, and an old road running straight through it all.', amb:'wind'},
    b4_c5_seep:{loc:'Raraku', sub:'The seep · the old sea bed', cap:'A black wet hole in the white floor of the old sea, a picket of horses beside it, and coral standing round it like broken teeth.', amb:'wind'},
    b4_c5_canal:{loc:'Raraku', sub:'The canal city · dusk', cap:'A city of pale stone on dry canals, its bridges broken, its towers without tops, the last of the light red on it, and a road of standing stones going away into the dark.', amb:'explore'} },

  end:{
    seep:['The water party', 'The Whirlwind Wall stood a mile deep round Raraku, and riders came out of it at the 9th\'s picket at first light. A mile off at the army\'s head the Wall went back before a grey rider, and the Fourteenth walked in onto the floor of an old sea. The wells were foul. The Third went off the column to a seep in the sea bed that only one of them knew, and found the Whirlwind watering there, and came back with the water. At dusk, in a dead city on dry canals, deserters were stripping the 10th\'s dead. They stopped.'],
    column:['The column', 'The Whirlwind Wall stood a mile deep round Raraku, and riders came out of it at the 9th\'s picket at first light. A mile off at the army\'s head the Wall went back before a grey rider, and the Fourteenth walked in onto the floor of an old sea. The wells were foul. The Third stayed in the column under the dust, as ordered, and when riders came out of the sand at the last wagons, the Third and the Second Company were there. At dusk, in a dead city on dry canals, deserters were stripping the 10th\'s dead. They stopped.'] },
  endScene:'b4_c5_canal',
  endCap:()=> b45Key() === 'seep' ? 'In the dead city on its dry canals, the Third sleeps with full water skins under its heads. Somewhere ahead, past the coral and the dust, is the oasis, and the Whirlwind.' : 'In the dead city on its dry canals, the 9th sleeps round its water wagons, every barrel still lashed. Somewhere ahead, past the coral and the dust, is the oasis, and the Whirlwind.',
  tease:'Next: the oasis, and the lines in front of it. The waiting.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b4_c5_key === 'seep') x.push(`${f.b4_c5_finder === 'haddat' ? 'Haddat' : f.b4_c5_finder === 'orvas' ? 'Orvas' : f.b4_c5_finder === 'darrut' ? 'Darrut' : 'A Seti scout'} led the Third off the column to a seep in the old sea bed. The Whirlwind was watering there. The Third came back with the water, and the company, who had watched them go, watched them come back.`);
    if (f.b4_c5_key === 'column') x.push('The Third stayed in the column under the dust, and held the last wagons when the riders came out of the sand for the water barrels. Radde wrote it down.');
    if (f.b4_c5_lone) x.push('In the night short of the Wall, an officer walked out to it alone and stood there, and after a long while walked back. The Third has not said who.');
    if (f.b4_c5_bandage === 'told') x.push('Fist Blistig rode the line with his nose in a bandage, and the Third told the recruits the story. The recruits have not stopped telling it.');
    if (f.b4_c5_bandage === 'kept') x.push('Fist Blistig rode the line with his nose in a bandage. The Third kept the story to itself.');
    if (f.b4_orvasDone === 1) x.push('Orvas walks with the Third into Raraku. He says the Khundryl scouts are ahead, and that he is not jealous of them, often.');
    else if (f.b4_orvasDone === 2) x.push('Orvas rides with the Khundryl, ahead of the column in the dust. He will come if he is sent for.');
    if (f.b4_raminDone === 1) x.push('Ramin walks with the squad in his red scale, which in the dust is brown.');
    if (f.b4_kethDone === 1) x.push('Keth walks with the squad. The grandmother does not like Raraku, and says so.');
    if (f.b4_c5_desDone) x.push('Deserters of the Whirlwind were stripping a forage party of the 10th in the canal city at dusk. The Third brought the 10th\'s dead back to the column.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b4_c5_desDone && 'In a dead city on dry canals inside Raraku, deserters of the Whirlwind were stripping the dead of a forage party of the 10th. The Third stopped them.',
    f.b4_c5_seepDone && 'The Third went off the column to a seep in the old sea bed and found riders of the Whirlwind watering there. It came back with the water.',
    f.b4_c5_rearDone && 'Riders came out of the dust at the column\'s last wagons for the water barrels. The Third held them, with the Second Company.',
    f.b4_c5_bandage && 'The morning after the Wall went back, Fist Blistig rode the 9th\'s line with his nose broken and bandaged. The camp says Fist Gamet did it.',
    f.b4_c5_inside && 'Inside the Wall, Raraku is the floor of an old sea: shell banks, the bones of great fish, ships turned to stone, roads, and a city on dry canals. The wells are foul.',
    f.b4_c5_withdrawn && 'The Whirlwind Wall went back off the plain before the army, a mile off at its head, as a grey rider came to it. The Fourteenth walked into Raraku.',
    f.b4_c5_ridersDone && 'At first light riders of the Whirlwind came out of the Wall at the 9th\'s picket. The Third held the picket.',
    f.b4_c5_reshuffle && 'Short of the Wall, medium squads of the 8th were read onto the marines\' rolls in Captain Keneb\'s company. Not the 9th.',
    'The Fourteenth came to the Whirlwind Wall, a sandstorm a mile deep round Raraku, and camped a mile short of it.'].filter(Boolean); },

  dlg:{
    /* ---- the camp short of the Wall, at dusk: the first halt ---- */
    b4_c5_start:()=>({sp:'Short of the Wall', scene:'b4_c5_wall', fx:()=>{ S.f.b4_c5_ph = 1; S.f.b4_c5_wallSeen = 1; if (!S.f.b4_c5_omen) { S.f.b4_c5_omen = 1; b4Nerve(-1, 'The Wall, and the noise of it'); } }, txt:
`The 9th puts its tents up in a hollow among red rocks a mile short of the Wall, with its back to the column and its face to the storm, because there is nowhere in this country to put a tent that is not facing the storm. It fills the north. It goes up off the desert brown and then brass and then a colour without a name, and it does not end where the sky begins. The sound of it is a long low roar with no gaps, the way surf would sound if surf never drew back.

The light is wrong under it. The sun goes down somewhere to the west behind the column's dust, and the Wall goes on shining after it, dull, like a lamp somebody has put a hand over. The grit is in the air even here, a mile off: in the mouth, in the water, in the joints of the fingers.

${b45Say({haddat:`Haddat stands at the edge of the hollow with the blue shield grounded and looks at the Wall with her lips moving. "Raraku," she says at last. "My mother's people walked into the Holy Desert every year to sell water to the people who lived inside. There was no wall then. Sand, and heat, and the old roads." She looks at the storm as if it had insulted her. "She said the desert had a door. You only had to know how to knock." She does not say how.`, marrow:`Marrow sits down on a rock with her back to the Wall and her hands in her lap. "Child," she says, to nobody in particular, and then, after a while: "No. I'll look at it in the morning."`, _:`The squad stands at the edge of the hollow and looks at the Wall, and the Wall roars.`})}${b4In('tallow') ? `\n\nTallow has his grandmother's deck in its oilcloth inside his shirt, and his hand on it, the way you hold your purse in a crowd.` : ''}${b45R({orvas:`\n\nOrvas has climbed the highest rock in the hollow to see it better, and comes down with his face grey under the black tears. "The Khundryl do not go into the Holy Desert," he says. "We ride round it. We always have." He looks back at the storm. "That was not there when my father rode round. That is new. That is hers."`, redblade:`\n\nRamin has his helm off and the grit in his hair. "My father rode the edge of Raraku once, after bandits," he says. "Sand and stones, he said. He never saw that." He puts the helm back on. "Nobody's father saw that."`, warlock:`\n\n"*Oh,*" the grandmother says, out of Keth's mouth, very quietly. "*Oh, she is angry. Listen to her.*"`})}`,
      ch:[b4DeckChoice(5),
          {t:'The Third\'s fire, in the lee of the rocks.', go:'b4_c5_wallfire'},
          {t:'Walk the camp.', go:()=>startExplore()}]}),
    b4_c5_deck:()=>b4DeckOffer(5),
    b4_c5_card:()=>{ const n = b4DeckCard(5); n.fx = () => { if (['b4c_knightchains', 'b4c_leper'].includes(S.card)) S.f.b4_chains = 1; }; return n; },

    /* the fire: the swap, a rest, the squad, and the way on (the games pass, 79, wraps this node: keep the id) */
    b4_c5_wallfire:()=>({sp:'The Third\'s fire', scene:'b4_wall_fire', again:()=> S.f.b4_c5_raddeSaid ? 'The Third\'s fire in the lee of the rocks, burning low against the wind. First light, and the Wall.' : 'The Third\'s fire in the lee of the rocks. The Wall roars over the top of them.', txt:
`The Third's fire is a ring of stones in the lee of a red rock, with the rock between it and the Wall, and still the flames lean north, toward the storm, as if the storm were drawing breath through them. The sand comes over the top of the rock in a fine endless hiss and settles on the coals and on the bread and on the backs of hands. Everything the squad eats tonight it will eat twice.${S.f.b4_c5_raddeSaid ? `\n\nRadde has the Third down for the picket at the Wall's edge at first light. The fire has not said out loud what that means.` : ''}${b45Dog() ? `\n\nHackle lies with his back to the rock and his nose under his tail, and every so often lifts his head toward the Wall and growls at it, very low.` : ''}`,
      ch:[b4DeckChoice(5),
          {t:'Sit an hour out of the wind. Let the squad rest.', req:()=>!S.f.b4_c5_rest, fx:()=>{ S.f.b4_c5_rest = 1; b4Rest('The squad sits an hour in the lee of the rock with the Wall roaring over the top of it, and eats sand, and rests. Wounds close, mostly.'); }, go:'b4_c5_wallfire_rest'},
          {t:'Talk with the squad.', go:'b4_c5_wallfire_talk'},
          ...b4Offers().map(id => ({t:`Send for ${NAME(id)}.`, fx:()=>{ b4SwapIn(id); }, go:'b4_c5_wallfire_swap'})),
          b4SpareChoice('b4_c5_wallfire'),
          b4PipeChoice('b4_c5_wallfire'),
          {t:'Find Radde first.', req:()=>!S.f.b4_c5_raddeSaid, go:()=>startExplore()},
          {t:'Sleep. The Wall\'s edge at first light.', req:()=>!!S.f.b4_c5_raddeSaid, onward:true, go:'b4_c5_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c5_wallfire_rest:()=>({sp:'The Third\'s fire', scene:'b4_wall_fire', txt:
`An hour, then, with backs to the rock and the hiss of the sand coming over it.

${b45Say({marrow:`Marrow goes round the squad with her hands, the way she always has, and at the third of them stops and frowns at her own palms. "Sand in it," she says. "In the warren. Like a wound with grit in it, child. It closes. It does not close clean."`, haddat:`Haddat sleeps sitting up against the blue shield. Once she wakes, and turns her head toward the Wall, and listens to it, and sleeps again.`, _:`Some of them sleep. The rest listen to the Wall.`})}${b4In('tallow') ? `\n\nTallow cannot sleep. He sits with his back to the rock and counts the gusts out loud under his breath, and loses count, and starts again.` : ''}${b4In('hessa') ? `\n\nHessa sleeps flat on her back with her spear along her side, as temple guards sleep on the steps at Kartool. "D'rek does not mind sand," she says, before she goes. "Everything ends up sand. She is patient."` : ''}${b4In('darrut') ? `\n\nDarrut wraps his whole head in his cloak and is asleep before the fire settles. "Aren in the dry season," he says, through it. "Same thing, smaller."` : ''}${b45R({orvas:`\n\nOrvas sleeps with his back to the Wall and his face to the fire, near enough to hear the horse lines.`, redblade:`\n\nRamin sleeps in his scale with his helm over his face, and in the morning the helm is full.`, warlock:`\n\nKeth sleeps with his cloak over his head, and the grandmother, in his sleep, argues with something.`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c5_wallfire'}]}),
    b4_c5_wallfire_swap:()=>({sp:'The Third\'s fire', scene:'b4_wall_fire', txt:
`${b4In('orvas') ? `Orvas comes across the camp from the Khundryl's lines on foot, with his cloak over his face against the sand, and drops his kit by the fire. "The herd sent for me," he says. "In this. Of course in this."` : b4In('redblade') ? `Ramin comes in from the Red Blades' lines with the grit in his teeth and his scale gone brown with it. He puts his kit down by the fire. "Here," he says. "My captain did not even sigh. He has sand in his throat."` : b4In('warlock') ? `Keth comes in from the Wickan youths with his head down into the wind, and the grandmother complaining every step of it. "*Off you go, says Temul,*" she says. "*A boy, saying it like a Fist.*"` : `The swap is made. The wind takes no notice.`}`,
      ch:[{t:'Back to the fire.', go:'b4_c5_wallfire'}]}),
    b4_c5_wallfire_talk:()=>{ const ln = [], m = b45HMood();
      if (b4In('haddat')) ln.push(m === 'easy' ? `Haddat is cleaning sand out of the blue shield's grip with the point of a knife. "My mother would know where the water is in there," she says, of the Wall, without looking up from it. "She knew every hole in that sea. She sold it to the people who lived on the bottom of it." She works the knife. "I think I know some of them. I am going to find out."` : m === 'hard' ? `Haddat has her back to the Wall and her eyes shut. "Hissar is ash," she says, when you sit. "The quarter where my mother sold water is ash. And there is the place the ash came from." She opens her eyes. "Do not ask me how I am, Sergeant."` : `Haddat is cleaning sand out of the blue shield's grip with the point of a knife. "My mother's people sold water in there," she says, of the Wall. "Every year. They knew where it was." She works the knife. "I knew too, when I was small. I am trying to remember."`);
      if (b4In('sathi')) ln.push(`Sathi has her head inside her cloak and Hackle's head inside it with her. "The Weasels say the Whirlwind eats horses," she says, muffled. "Whole. I don't believe them." A pause. "I'm keeping him in here anyway."`);
      if (b4In('tangle')) ln.push(`Tangle has the satchel inside his shirt and both arms round it. "Sand in a fuse," he says, "is a fuse that goes when it likes." He counts by feel, twice. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}. All of them full of sand. I'll know tomorrow which ones."`);
      if (b4In('marrow')) ln.push(`Marrow is turning her knotted string in her fingers, not tying. "There is something in there," she says, of the Wall, "that the warren does not want to look at, child. Like a big dog in a small room." She puts the string away. "Sleep. It will still be there."`);
      if (b4In('tallow')) ln.push(`Tallow has the deck out and is holding it, not reading it. "My grandmother said you don't read in a wind," he says, "because the wind reads you back." He puts it away, quickly. "She said a lot of things. Most of them came true."`);
      if (b4In('hessa')) ln.push(`Hessa is sitting very straight with the spear upright beside her. "In the temple they said the Whirlwind was a worm too," she says. "Another worm. D'rek's sister, or her enemy, or her meal." She considers the Wall. "I preferred it as a story."`);
      if (b4In('tebbet')) ln.push(`Tebbet has unstrung his bow and is wiping the string. "Shots'll fall short tomorrow," he says. "In that." He looks at the Wall. "I'd rather be in Dal Hon." He goes back to the string.`);
      if (b4In('darrut')) ln.push(`Darrut has his feet to the fire and his helm on his knee, full of sand. "When I was on the wall at Aren," he says, "we watched the Whirlwind's dust come up out of the north every evening." He empties the helm, and does not go on.`);
      if (b4In('orvas')) ln.push(`Orvas is mending a strap on his lance by the firelight, without looking at the Wall. "Gall's scouts will go in first," he says. "With Temul's. The Burned Tears ride where the Wickans ride now." He pulls the strap tight. "I want to be with them. I am with you. Both are true."`);
      if (b4In('redblade')) ln.push(`Ramin is scraping grit out of the links of his scale with a thumbnail, one at a time. "Behind that," he says, "is every Seven Cities soldier who did not take the silver." He keeps scraping. "Some of them I grew up with. I hope not to meet them."`);
      if (b4In('warlock')) ln.push(`Keth sits facing the Wall. "*She is in there,*" the grandmother says. "*The goddess. Listen. She does not sleep.*" Keth, his own voice, small: "I wish she would."`);
      if (b45Dog() && !b4In('sathi')) ln.push(`Hackle lies across your boots with his ears flat, and growls at the Wall every time it gets louder.`);
      return {sp:'The Third\'s fire', scene:'b4_wall_fire', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and the Wall talks for everybody.`,
        ch:[{t:'Back to the fire.', go:'b4_c5_wallfire'}]}; },

    /* ---- the camp: Radde, Hollet, the recruits, the reshuffle across the hollow, the 10th's rumour, the water wagons, the lookout ---- */
    b4_c5_radde:()=>({sp:'Sergeant Radde · Second Company', html:nerveHTML('The Second Company'), txt:
`Radde is sitting on an upturned bucket by the tents with the book open on his knee and his hand flat on the page to keep the wind out of it. He writes a word, and blows the sand off it, and writes another.

"Picket," he says, without looking up. "First light, a quarter-mile short of the Wall, where the 9th's front stops. Somebody has to stand between the legion and that, the Fist says, in case anything comes out of it." He blows on the page. "I asked the Fist what might come out of it. He said that was the point of a picket."

He looks up then. "The company's not right, Sergeant. They've walked from Aren to here into that noise, and they've been looking at it all day, and now they've to sleep under it. I've seven written down as won't stand. I'd like a few of them on the picket with the Chain lot." He shuts the book on a finger. "It's that, or they lie awake all night making it bigger."`,
      ch:[{t:'"We\'ll take the picket. Send the seven."', fx:()=>{ S.f.b4_c5_raddeSaid = 1; S.f.b4_c5_seven = 1; }, go:'b4_c5_radde_2'},
          {t:'"We\'ll take it. Send who you like."', fx:()=>{ S.f.b4_c5_raddeSaid = 1; }, go:'b4_c5_radde_2'},
          {t:'"What\'s across the hollow? The 8th\'s up late."', req:()=>!S.f.b4_c5_raddeWhy, fx:()=>{ S.f.b4_c5_raddeWhy = 1; }, go:'b4_c5_radde_why'}]}),
    b4_c5_radde_why:()=>({sp:'Sergeant Radde', txt:
`Radde looks across the hollow at the lanterns along the 8th's lines, and at the shapes going to and fro between them with their kit on their backs.

"The 8th's moving its mediums in with its marines," he says. "One captain's company of it. Keneb's, the one with the boy." He writes something. "Greymane's way, they're calling it, after a Fist who did it somewhere else. Medium squads stood in with the marines, to hold the rear on bad ground." He shrugs. "There's a young officer of good family doing the sums for it. The sergeants over there aren't happy. Sergeants are never happy. It's how you know it's a sergeant."

He opens the book again. "Not the 9th. The Fist would sooner march his mediums into the Wall than lend them to the 8th. You can tell your recruits that, if they ask. They'll ask."`,
      ch:[{t:'"We\'ll take the picket."', fx:()=>{ S.f.b4_c5_raddeSaid = 1; }, go:'b4_c5_radde_2'}]}),
    b4_c5_radde_2:()=>({sp:'Sergeant Radde', txt:
`"Good." He writes the Third against something, and blows the sand off it. "First light. I'll find you."${S.f.b4_c5_seven ? ` He writes seven names under it, small. "They'll come with their spears and their stomachs in their mouths. Let them stand."` : ''}${b45Say({darrut:` He glances at Darrut. "Aren Guard. You've stood a picket in a sandstorm."\n\n"Once," Darrut says. "It was smaller."`, tebbet:` He glances at Tebbet. "Dal Hon. Your bow won't carry in that. Stand anyway."`, _:''})}${b45R({orvas:`\n\nHe looks at Orvas. "The Khundryl say they'll scout the Wall when it's light. Will they?" Orvas looks at the Wall. "If the boy asks," he says. "Temul. They will do anything he asks. It is very strange."`, redblade:`\n\nHe looks at Ramin. "And you, Red Blade. If something comes out of that, ride for help."\n\nRamin looks at the Wall, and at his feet, which are the only horse he has tonight. "On what?"`, warlock:`\n\nHe looks at Keth. "And the Wickan stays where I can find him."`})}`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()}]}),
    b4_c5_radde_again:()=>({sp:'Sergeant Radde', txt:
`Radde is still on the bucket, still writing, with the sand coming over the page as fast as he can blow it off. "First light, Sergeant," he says. "Sleep, if you can. I can't. I'm writing instead."`,
      ch:[{t:'Leave him to it.', go:()=>startExplore()}]}),
    b4_c5_hollet:()=>({sp:'Captain Hollet · Second Company', fx:()=>{ S.f.b4_c5_hollet = 1; }, txt:
`Captain Hollet is sitting in the lee of a water wagon with his tablet on his knee and a cloth over his mouth, counting skins by lantern-light.

"Sergeant." He finds his place. "Nine days. That's the water, at the rate we're drinking it, for the 9th. Nine days. The wells along the road were foul, the last three. Dead goats in them. Fist Gamet thinks Korbolo Dom's people did it, ahead of us. Salted the road." He lowers the tablet. "I don't know what's inside that. None of us do. If there's no water in there, nine days is the whole war."

He looks at the Wall over the wagon, and away from it, quickly. "I keep the numbers. The numbers don't care how brave anybody is."${b45Say({haddat:`\n\nHaddat, behind you, says quietly: "There is water in Raraku, Captain. There was always water. The question is who knows where."\n\nHollet looks at her as if she had handed him a coin.`, _:''})}`,
      ch:[{t:'"Nine days is a long time, sir."', go:()=>startExplore()},
          {t:'"We\'ll find water, sir. Someone will."', go:()=>startExplore()}]}),
    b4_c5_recruits:()=>({sp:'The Second Company\'s recruits', txt:
`The company's recruits are in a huddle in the lee of their tent with their cloaks over their heads, like sheep in a storm, and the freckled girl from Aren is in the middle of them with her spear upright, because she has decided that a spear should be upright.

"Sergeant." She has to shout over the Wall. "Is it true they're going to march us into it? The whole army? Into that?" Behind her a boy says *the goddess* and somebody else says *it eats you* and a third voice says *the 8th are being made marines so they can go in first*.

${b45New().includes('tallow') ? `Tallow is sitting with them, as he does, with his cloak over his head like theirs, and he is not saying anything, which for Tallow is the worst sign there is.` : b45New().includes('hessa') ? `Hessa is standing over them with her shield, like a temple door they have taken shelter in.` : `They look at the squad the way the drowning look at a rope.`}`,
      ch:[{t:'"The Adjunct didn\'t bring us this far to feed us to a storm. Sleep."', fx:()=>{ S.f.b4_c5_recTold = 'steady'; b4Nerve(1, 'The Chain squad said sleep'); }, go:'b4_c5_recruits_steady'},
          {t:'"I don\'t know. Keep your water close and your spear closer."', fx:()=>{ S.f.b4_c5_recTold = 'true'; b45L('haddat', 1); b45L('marrow', 1); }, go:'b4_c5_recruits_true'}]}),
    b4_c5_recruits_steady:()=>({sp:'The Second Company\'s recruits', txt:
`You sit down in the lee of their tent with your back to the Wall, the way the Chain taught you to sit with your back to anything you cannot fight, and pull your cloak over your head, and shut your eyes. After a while the freckled girl does the same. Then the boy. It goes round the huddle like a yawn.

${b45Say({marrow:`Marrow sits down among them and starts to hum, tunelessly, an old Napan thing with no end to it. Under the Wall's roar it is barely there. They lean toward it.`, tangle:`Tangle sits down among them and goes to sleep at once, loudly, with his mouth open and the satchel on his chest. It is the most reassuring thing any of them has seen all day.`, _:`The squad sits down among them, and stays.`})}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b4_c5_recruits_true:()=>({sp:'The Second Company\'s recruits', txt:
`The freckled girl nods slowly, and lowers her spear, and lays it along her side where her hand can find it in the dark. The others do the same. They do not look happier. They look like people who have been told the truth by somebody who has been somewhere, and have decided they would rather have that than a story.

${b45Say({haddat:`"Good," Haddat says to the girl, and then, in Hissari, so only the squad can follow it: "Water close. Spear closer. My mother said it about the desert. She was not talking about spears."`, marrow:`"There," Marrow says. "Now you know as much as the Adjunct, child. Sleep on it."`, _:`"Right," the girl says. "Right." She puts her water skin inside her shirt.`})}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b4_c5_recruits_again:()=>({sp:'The Second Company\'s recruits', txt:
`The recruits are asleep, or pretending, in a heap in the lee of their tent with the sand settling on them. ${S.f.b4_c5_recTold === 'steady' ? 'Somebody is snoring.' : 'Every one of them has a hand on a water skin.'}`,
      ch:[{t:'Let them sleep.', go:()=>startExplore()}]}),
    b4_c5_reshuffle:()=>({sp:'The 8th\'s fires, across the hollow', fx:()=>{ S.f.b4_c5_reshuffle = 1; }, txt:
`Across the hollow, at the 8th's fires, there is a lantern held up on a pole and a captain under it reading from a list: a broad, tired-looking man in a captain's cloak. Keneb, the camp says. As he reads, whole squads of the 8th's medium infantry get up off the sand, sergeants first, and pick up their kit and walk across to the marines' fires, and sit down there among strangers.

It goes on for an hour. The marines make room. The sergeants coming over do not look pleased, and the ones already there do not look pleased either, and a young officer in very good boots stands at the captain's elbow with a second list, checking it against the first. Even from here you can see what the sergeants think of him.

${b45Say({darrut:`Darrut watches it with his arms folded. "In the Guard," he says, "when they started mixing the squads, it meant somebody thought there'd be fewer of us soon."`, haddat:`Haddat watches it a long breath. "They are making the rear stronger," she says. "The Adjunct thinks the rear is where it will be bad."`, marrow:`Marrow watches it with her head on one side. "Moving the furniture, child," she says. "Before the guests come."`, _:`The squad watches it from across the hollow, and says what it thinks only to itself.`})}${b4In('tallow') ? `\n\nTallow has come up beside you. "Are they going to do that to us?" he says. "Make us marines?" He sounds as if he cannot decide whether he wants it.` : ''}${b45R({orvas:`\n\n"The Khundryl do this," Orvas says, interested. "Before a big fight. The old men and the young men in one band, so the young men do not run and the old men do not sit down." He considers it. "It works, mostly."`, redblade:`\n\n"The Red Blades did this," Ramin says. "In Ehrlitan. Before it went bad." He does not say how bad.`, warlock:`\n\n"*Moving the pieces,*" the grandmother says, out of Keth's mouth. "*She plays a long game, your Adjunct.*"`})}`,
      ch:[{t:'"Not the 9th. The Fist wouldn\'t lend them a spoon."', go:()=>startExplore()},
          {t:'Watch until the lantern goes out.', go:()=>startExplore()}]}),
    b4_c5_bredd:()=>({sp:'A regular of the 10th', fx:()=>{ S.f.b4_c5_bredd = 1; }, txt:
`A regular of the 10th has wandered over from the next hollow with a skin of something that is not water, looking for company. He finds the Third's, because it is the nearest.

"You heard about Neffarias Bredd?" he says, sitting down without being asked. "Heavy infantry. The 8th, or the 10th, depends who you ask. He killed fifty of Leoman's riders on his own one night with a tent pole. Fifty." He drinks. "Some say a hundred. And the next night he went out and did it again, because the first lot had friends." He passes the skin. "Never seen him. That's how good he is."${b45Say({tangle:`\n\n"A tent pole," Tangle says. "Not a cusser."\n\n"He doesn't need a cusser," the regular says, with contempt. "He's Neffarias Bredd."`, darrut:`\n\n"In Aren," Darrut says, "there was a man in the Guard who killed forty of the Whirlwind off the wall with a bucket of hot sand. I never met him either."`, _:''})}${b4In('tallow') ? `\n\nTallow is listening with his mouth open. "A hundred," he says, later, to the recruits, and by morning it is two hundred.` : ''}`,
      ch:[{t:'Drink to Neffarias Bredd.', go:()=>startExplore()},
          {t:'"Fifty\'s plenty."', go:()=>startExplore()}]}),
    b4_c5_wagon:()=>({sp:'The water wagons', fx:()=>{ S.f.b4_c5_dolls = 1; }, txt:
`The 9th's water wagons, three of them, the barrels lashed down under hides gone the colour of the sand, and a queue of soldiers with skins waiting for the carter to measure them a ration. The ration is smaller than it was at the Vathar. Everybody in the queue has noticed.

A pair of the 8th's regulars are in it, talking low, queue talk. "...dolls," one of them is saying. "Grass dolls. Their mage. Sits by the fire with a little grass man and talks to it, and the marines just let him." The other spits. "Marines," he says, as if that explained it. "Dolls next. What's after dolls?"${b45Say({marrow:`\n\nMarrow, beside you in the queue, makes a small dry sound. "There are worse ways to listen to a warren, child," she says. "Dolls are honest. They don't pretend to be anything else."`, tallow:`\n\nTallow has gone a little pale. "My grandmother did that," he says, very low. "With rag dolls. For the fishermen's wives, when a boat was late." He does not say what the dolls told them.`, _:''})}`,
      ch:[{t:'Take the ration and go.', go:()=>startExplore()}]}),
    b4_c5_lookout:()=>({sp:'The lookout cairn', txt: S.f.b4_c5_lone || S.f.b4_c5_loneNo ?
`The cairn on the north drift, and the Wall beyond it, and the long dark between, empty now.` :
`A cairn of red stones on the north drift, the camp's lookout, with a regular of the 9th sitting in the lee of it with his cloak over his head and a crossbow across his knees. From up here the Wall fills everything: the whole north, roaring, dull brass under no moon, and between it and the camp a mile of bare sand going grey.

"Somebody's out there," the regular says, as you come up. "Walking. From the 8th's lines, toward it." He points with the crossbow. "On his own. No lantern."

Far out on the grey sand, there is a shape. One man, walking north, toward the Wall, not fast, not slow.`,
      ch:[{t:'Get a proper look at him. (in the dark, at a half-mile)', check:['wits', 15], req:()=>!S.f.b4_c5_lone && !S.f.b4_c5_loneNo,
            edges:id=>[id === 'tebbet' && ['the far view is his, even at night', 2], id === 'sathi' && ['she has watched riders in the dark all her life', 1], id === 'orvas' && ['he has kept night watch for a herd', 1], id === 'darrut' && ['he stood the Aren walls at night', 1], id === 'tallow' && ['he keeps looking at the Wall instead', -1]],
            near:{t:()=>`Yes, but a gust comes off the Wall full of grit and ${NAME(ROLL().who || 'sgt')} takes it full in the eyes and sees the rest of the night through tears. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c5_lookout_ok', fail:'b4_c5_lookout_no'},
          {t:'Leave the sentry to it.', go:()=>startExplore()}]}),
    b4_c5_lookout_ok:()=>({sp:'The lookout cairn', fx:()=>{ S.f.b4_c5_lone = 1; }, txt:
`${by({tebbet:`Tebbet lies on his belly on the cold stones of the cairn and watches without blinking. "An officer," he says, after a while. "By the cloak. An old one, by the walk. He's not armed that I can see." He watches. "He's stopped. Right at the foot of it. He's just standing there."`, _:`{who} watches a long time. "An officer, by the cloak," at last. "An old one, by the walk. He's stopped. Right at the foot of it. He's just standing there."`})}

He stands at the foot of the Wall an hour, a dark speck against the moving brass, close enough to it that the sand must be at his face like a file. He does not go in. He does not come back. The regular with the crossbow stops breathing for most of it.

Then the speck turns, and comes back across the grey sand toward the 8th's lines, slowly, a tired walk. The regular lets out his breath. "Who was that?" he says. The cairn cannot tell him, and the squad does not guess out loud.`,
      ch:[{t:'Back down to the fire.', go:()=>startExplore()}]}),
    b4_c5_lookout_no:()=>({sp:'The lookout cairn', fx:()=>{ S.f.b4_c5_loneNo = 1; }, txt:
`The dark and the sand and the Wall's dull shine make one grey nothing, and the shape in it comes and goes. ${by({sgt:'You lose', _:'{who} loses'})} it, and finds it, and loses it for good when a gust comes over the drift. When the gust has gone there is nothing on the sand at all. The regular with the crossbow says he saw it come back. He says it twice, as if to make it true.`,
      ch:[{t:'Back down to the fire.', go:()=>startExplore()}]}),
    b4_c5_to_edge:()=> !S.f.b4_c5_raddeSaid ? ({sp:'The north-east of the camp', txt:
`North-east, past the last tents, the ground goes out bare toward the Wall. There is nothing out there yet for the Third. Radde will want to talk first.`,
      ch:[{t:'Not yet.'}]}) : ({sp:'The north-east of the camp', txt:
`North-east, past the last tents, the ground goes out bare toward the Wall, and the 9th's picket line will be out there at first light. It is not first light yet.`,
      ch:[{t:'Sleep, and go out at first light.', onward:true, go:'b4_c5_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c5_dawn:()=>({sp:'The camp · first light', scene:'b4_c5_wall', fx:()=>{ if (!S.f.b4_c5_slept) { S.f.b4_c5_slept = 1; if (!S.f.b4_c5_rest) b4Rest('The squad sleeps in the lee of the rock with the Wall roaring over it, inside the 9th\'s lines. Wounds close, mostly.'); } }, txt:
`The 9th barely sleeps. The Wall roars all night, and the sand comes over the rock all night, and toward morning the wind changes its note and every soldier in the 9th sits up at once.

First light comes brown. Radde comes down the tents with the book under his arm and the stick in his hand, ${S.f.b4_c5_seven ? 'and seven recruits behind him with their spears, white as milk' : 'and two regulars behind him with their spears'}, and the only words out of him are "Up," and "Picket," and "Now."`,
      ch:[{t:'Out to the Wall.', onward:true, go:()=>{ S.f.b4_c5_ph = 2; startExplore('b4_c5_edge'); talk('b4_c5_edge_arrive'); }},
          {t:'"A moment, Sergeant."', go:()=>startExplore()}]}),

    /* ---- the Wall's edge at first light: the picket, the riders out of the sand ---- */
    b4_c5_edge_arrive:()=>({sp:'The Whirlwind Wall', scene:'b4_c5_wall', txt:
`A quarter of a mile from the Wall the 9th's ground stops, because past it nobody can stand up. The picket line is a row of stakes driven into the sand there, and a shallow scrape behind them, and in front of them, filling the whole of the world from left to right and from the sand to the top of the sky, the Wall.

It is not a wall, this close. It is a river going sideways: sand the colour of brass and rust and bone, moving, roaring, so fast at the foot that it hisses and so high up that it seems to stand still. Things go by in it. A thorn bush, whole. Something that might be a bird. The grit comes off it in sheets and finds every gap in a cloak. The eye will not go further into it than an arm's length.

Along the line, west, the rest of the army is drawn up on the plain in its legions, very small, facing the Wall too.${b45Say({haddat:`\n\nHaddat stands at the stakes with her veil up and her shield up and watches the sand go by. "My mother's people came in from the south," she says. "Over sand you could walk on. There was nothing standing here then." She watches it go by. "There was nothing like this standing anywhere."`, tebbet:`\n\nTebbet strings his bow and looks at the Wall, and at his arrows, and at the Wall. "There's no out of range of that," he says. "There's just that."`, _:''})}${S.f.b4_c5_seven ? `\n\nRadde's seven recruits stand in the scrape behind the stakes with their spears, and their eyes go from the Wall to the Third and back again, all the time.` : ''}`,
      ch:[{t:'Take the picket.', go:()=>startExplore()}]}),
    b4_c5_radde_edge:()=>({sp:'Sergeant Radde', fx:()=>{ S.f.b4_c5_raddeEdge = 1; }, txt:
`Radde has his cloak wound round his head with only the eyes showing, and the book inside his shirt, for once. He has to shout.

"The Adjunct's at the head of the army," he shouts, pointing west along the line, "doing whatever she's going to do. The 9th's not been told what. We stand here till somebody does." He looks at the Wall. "If anything comes out of that, it comes out at us first. That's what a picket's for." He wipes his eyes. "I'm told."`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()},
          {t:'Out to the stakes.', onward:true, go:'b4_c5_picket'}]}),
    b4_c5_sandwall:()=>({sp:'The foot of the Wall', txt:
`${b45Say({marrow:`Marrow goes as near as she can bear and stands with her hands open toward it, the way she stood at the Vathar. "There is a warren in there," she says, without turning. "A piece of one. Torn off something and kept, like a stone in a child's pocket." She lowers her hands. "It is like the warren at the Vathar, child. Only older. Much older. And it is awake."`, warlock:`Keth goes as near as he can bear. "*There,*" the grandmother says. "*Something torn off something old. She keeps it in there like a coal in a pot.*"`, tangle:`Tangle goes up to the foot of it with a sharper in his fist, unlit, and stands looking at it, and comes back. "No," he says. "No, I don't think so. Not even a cusser."`, _:`The Wall roars a few hundred paces off, close enough to feel the sand on the face like a file. The squad goes no nearer.`})}`,
      ch:[{t:'Back from it.', go:()=>startExplore()}]}),
    b4_c5_edge_back:()=>({sp:'The way back', txt:
`Back across the bare ground, the 9th's camp in its hollow, and the rest of the legion getting ready to move or not move, whichever it is told. The picket is here.`,
      ch:[{t:'Not that way.'}]}),
    b4_c5_picket:()=> S.f.b4_c5_ridersDone ? ({sp:'The picket stakes', txt:
`The stakes, and the scrape behind them, and the marks of the fight in the sand already going soft as the wind works on them. The 10th has the picket now.`,
      ch:[{t:'Watch the head of the army.', onward:true, go:'b4_c5_withdraw'},
          {t:'Not now.', go:()=>startExplore()}]}) : ({sp:'The picket stakes', fx:()=>{ S.f.b4_c5_onPicket = 1; }, txt:
`The squad takes the stakes, and the regulars ${S.f.b4_c5_seven ? 'and Radde\'s seven ' : ''}take the scrape behind them, and everybody faces the Wall with their veils up and their eyes slitted, and waits.

The sun comes up somewhere. The Wall goes from brown to brass. And then, in the roaring sand at the foot of it, there are shapes that do not go by with the rest: dark, upright, coming this way. Horses, heads down into it. Riders, veiled to the eyes, in robes the colour of the storm, lances low. They come out of the Wall at a walk, as if the Wall had opened a door for them and shut it again, a dozen of them, more, and they see the stakes, and the walk becomes something else.${b45Say({tebbet:`\n\n"Riders," Tebbet says, very calm, an arrow on the string. "Out of it. I can't count them in that."`, haddat:`\n\nHaddat has her shield up. "The Wall's own," she says. "They ride inside it. They know the way through."`, _:''})}${b45R({orvas:`\n\nOrvas laughs once, short, with no joy in it, and sets his lance. "They ride well," he says. "In that. Somebody must teach me how."`, redblade:`\n\nRamin draws, and sets himself on the sand. "Desert tribes," he says. "Not the Whirlwind's army. Worse. They were born in it."`, warlock:`\n\n"*Out of her skirts,*" the grandmother says. "*Mind the eyes, children.*"`})}`,
      ch:[{t:'"Stakes. Here they come."', go:()=>startBattle('b4_c5_wallriders', {})},
          {t:'Tangle puts two sharpers at the foot of the sand.', tag:'uses 2 sharpers', req:()=>b4In('tangle') && (S.inv.sharper || 0) >= 2, fx:()=>{ S.inv.sharper -= 2; }, go:()=>startBattle('b4_c5_wallriders', {pre:true})},
          {t:'Read where they\'ll come through the sand, and be there first.', check:['wits', 15],
            edges:id=>[id === 'haddat' && ['her mother\'s people knew this Wall', 2], id === 'tebbet' && ['he watches movement, not shapes', 1], id === 'orvas' && ['he reads horses in any sand a horse will stand in', 1], id === 'darrut' && ['he stood the Aren walls in the dust', 1], id === 'tallow' && ['he cannot look at the Wall long', -1], b45Wears({side:'p', id}, 'b4_c5_veil') && ['the veil keeps the grit out of the eyes', 1]],
            near:{t:'Yes, but the Wall moves as the squad does, and the riders come out of the sand a dozen paces from where they should have, already at a trot.'},
            go:()=>startBattle('b4_c5_wallriders', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c5_picket_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c5_picket_seen:()=>({sp:'The picket stakes', txt:
`The sand at the Wall's foot is a hundred moving shapes and every one of them a rider until it is not, and ${by({sgt:'you guess', _:'{who} guesses'})} wrong. The riders come out a long throw to the side, where the stakes are thinnest, and they are on the picket before the squad has turned.`,
      ch:[{t:'Shields.', go:()=>startBattle('b4_c5_wallriders', {surprise:'e'})}]}),
    b4_c5_riders_after:()=>({sp:'The picket stakes', fx:()=>{ S.f.b4_c5_ridersDone = 1; gain('b4_c5_veil'); }, txt:
`The last of them goes back into the sand on a horse with an empty saddle beside it, and the Wall takes them both without a sound. Those who did not go back are lying in front of the stakes with the sand already drifting over them.

One of the regulars is sitting in the scrape with his arm round a gash in his thigh, swearing into his veil. ${S.f.b4_c5_seven ? 'Radde\'s seven are still standing, every one, with their spears up and their mouths open, and looking at each other as if to check.' : 'The rest are on their feet.'}

At the stakes there is a veil caught on the wood, torn off one of the riders in the fight: a long strip of fine grey cotton with a loop of red thread at one end, the deep-desert way of winding it. A regular pulls it free. It is better than anything the 9th was issued, and it goes into the kit.${b45Say({haddat:`\n\nHaddat stands over one of the dead riders a while with her shield on her arm. She does not lift the veil off his face. She looks at the hands, and the boots, and the stitching on the robe. "Not Hissari," she says at last, to herself. "Not from the city." She breathes out.`, marrow:`\n\nMarrow kneels by the regular with the gash. "Sand in it already," she says. "Of course there is." She works. "Hold still, child. The warren's gritty this morning."`, _:''})}${b45R({orvas:`\n\nOrvas is walking among the riders' horses that did not go back, talking to them in Khundryl, and they let him.`, redblade:`\n\nRamin wipes his blade on the sand and looks at the Wall. "They will come back," he says. "They live in it."`, warlock:`\n\n"*Gone home,*" the grandmother says, of the ones who rode back into the sand. "*Into her. Lucky them.*"`})}`,
      ch:[{t:'Watch the head of the army.', onward:true, go:'b4_c5_withdraw'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c5_withdraw:()=>({sp:'The Whirlwind Wall', scene:'b4_c5_withdraw', fx:()=>{ if (!S.f.b4_c5_withdrawn) { S.f.b4_c5_withdrawn = 1; b4Nerve(1, 'The Wall went back'); } }, txt:
`Far along the line, a mile off and more, at the head of the army where the Adjunct's standard is a speck against the brass, a rider goes out alone from the front of the legions toward the Wall. A grey shape on a grey horse, the 9th says, though nobody in the 9th can see the colour at a mile. Whether it is her, nobody on the picket can swear to. Everybody on the picket knows.

The rider stops at the foot of the Wall, a dot at the bottom of a cliff.

And the Wall goes back.

It does not fall, or open. It draws back off the plain the way the sea draws back off a beach, all along its length, as far as the eye goes east and west: the foot of it lifting off the sand, the roar of it going down and down, the whole brass face of it leaning away north and dwindling, slowly at first and then not slowly, until where it stood there is only a long bare stretch of rippled sand going away into a pale haze. The silence after it is so loud that the regular with the gash in his thigh stops swearing.

The army does not cheer. The army does not do anything at all for a while. Then along the line the legions start to breathe again, and somebody in the 9th laughs, and stops.${b45Say({haddat:`\n\n"A door," Haddat says. She is holding her shield very tight. "My mother said the desert had a door." She does not look as if she likes being right about it.`, marrow:`\n\nMarrow lets out a breath she has held since the camp. "Child," she says, "it did not go because we knocked. It went because it wanted to." She does not say what it wanted.`, _:''})}${b45R({orvas:`\n\nOrvas has his lance up over his head. "The boy," he says, "the boy will send the scouts in now. The Khundryl with the Wickans." His face is wild. "Into it. Into Raraku. My father would have spat."`, redblade:`\n\nRamin has gone very still. "My father would not believe it," he says. "I do not believe it. I am looking at it."`, warlock:`\n\n"*She stepped back,*" the grandmother says, out of Keth's mouth, low and furious. "*The goddess. She stepped back to let us in. Mind that, child. Mind it.*"`})}`,
      ch:[{t:'"Fall in. We\'re going in."', onward:true, go:'b4_c5_walkin'},
          {t:'Watch the scouts go in.', go:()=>startExplore()}]}),
    b4_c5_scouts:()=>({sp:'Wickan riders', fx:()=>{ S.f.b4_c5_scouts = 1; }, txt:
`Wickan riders go past the 9th's picket at a gallop, out across the rippled sand where the Wall stood, in a long loose screen: Temul's youths, and with them Khundryl riders with black tears on their faces, lances up, riding where the Wickans ride. They go into the haze and the haze takes them.${b4In('orvas') ? `\n\nOrvas watches them go, every one, until there is nothing to watch. "Gall's," he says. "And the boy's. Together." He turns back to the squad, and grins, and it costs him something.` : ''}${b45Say({sathi:`\n\nSathi has her arm round Hackle's neck and her eyes on the youths. "Scouts," she says. "Into the Holy Desert. Temul sends them." She laughs, short. "The old Crow will die."`, _:''})}`,
      ch:[{t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c5_walkin:()=>({sp:'Into Raraku', scene:'b4_c5_seabed', txt:
`The army goes in after the scouts, legion by legion, the 8th first and then the 9th and then the 10th, across the strip of rippled sand where the Wall stood and into the haze.

The ground changes under the boots. The sand goes thin, and under it is something white and hard that crunches: shell, a whole floor of it, broken fine as meal and then not so fine, and then whole shells, a bank of them, a hill of them, going away into the haze. There are bones standing up out of it here and there, white, the length of a wagon: the ribs of something that swam. The air smells of nothing, and then faintly, impossibly, of salt.

It is the floor of a sea. The sea went away, a long time ago, and left its bed to the sun. The 9th will be on it by noon, behind the 8th's dust, and on it all day.`,
      ch:[{t:'The morning.', onward:true, fx:()=>{ S.f.b4_c5_inside = 1; }, go:()=>{ S.f.b4_c5_ph = 3; startExplore('b4_c5_seabed'); talk('b4_c5_sea_arrive'); }},
          {t:'Not yet. One more look at where the Wall stood.', go:()=>startExplore()}]}),

    /* ---- inside: the old sea floor, the morning after the Wall went back ---- */
    b4_c5_sea_arrive:()=>({sp:'Raraku · the old sea floor', scene:'b4_c5_seabed', txt:
`The 9th marched on the old sea floor until dusk and camped on it, among the shell banks, and slept badly on ground that crunched whenever anybody turned over. In the morning the dust is still there, thinner than at the Wall, and the haze, and the sea floor goes on: white, flat, going away in every direction to a soft pale nothing, with the bones of great fish standing out of it, and here and there a darker shape that might be rock and might not.

The column halts at mid-morning on a road. An old road, of fitted stone gone smooth, running dead straight across the floor of the sea from somewhere to somewhere else, as if the sea had been in the way and somebody had built across it anyway.${b45Barrow() ? `\n\n${b45Barrow()}` : ''}

${b45Say({haddat:`Haddat walks a little way off the road onto the shell and stands there with her shield grounded, looking south, toward Hissar, which is ash. "My mother walked here," she says, when you come up. "Every year. With the water-skins on a donkey. She sold water to the people who lived on the bottom of the sea, and they paid her in salt." She does not move. "There is nobody to sell it to now. And nobody to sell it."`, _:`The squad stands on the old road and looks at the sea floor, and the sea floor looks back.`})}${b4In('marrow') ? `\n\nMarrow sits down on the road's edge with her hands on her knees. "The warren is very old here, child," she says. "Like the warren at the Vathar, with all those dead in it. Only older. Much older. Whatever died here, died before anybody had a name."` : ''}${b45Say({tallow:`\n\nTallow has picked up a shell and is holding it to his ear. "It's true," he says, astonished. "You can hear it. The sea."`, _:''})}${b45R({orvas:`\n\nOrvas has gone off the road a way, and comes back with a fish's tooth as long as his hand. "The Khundryl tell a story," he says, "that the Holy Desert was a sea, and the sea was a god, and the god went away in a temper." He looks at the tooth. "I thought it was a story."`, redblade:`\n\nRamin crouches and touches the road's stones. "They built this," he says. "In the sea. My father said the old empires were mad. He was right."`, warlock:`\n\nKeth crouches on the shell. "*Drowned,*" the grandmother says. "*All of it. A long, long time ago. It does not remember the water.*"`})}`,
      ch:[{t:'Fall in on the road.', go:'b4_c5_bandage'}]}),
    b4_c5_bandage:()=>({sp:'The 9th\'s line', scene:'b4_c5_seabed', fx:()=>{ S.f.b4_blistig = 1; }, txt:
`Down the halted column comes the Fist of the 9th on his horse, with his officers behind him, riding the line the way he does every morning, looking at the legion as if it owed him money. Fist Blistig. He is the same as every morning, except for his face.

His nose is a bandage. A wide white wad of linen across the middle of his face, tied behind his head, gone brown at the edges with the dust, and under his eyes the skin is purple and black and swelling up. He rides past the Third's stretch looking straight ahead, breathing through his mouth.${S.f.b4_blistigNoticed ? ` At the Third he turns his head, and looks at the sergeant, a long hard look over the bandage, and the 9th sees him do it. The Fist knows the Third's name now. It is not a comfortable thing to know.` : ''}

The story is down the column before he is. *Fist Gamet's taken the 8th back. From Keneb. Yesterday, after the Wall went.* And then: *and the Fist said something to him about it. Our Fist. And the old man broke his nose for him.* By the time Blistig reaches the end of the 9th's line the story has three versions and a song.${b45Say({darrut:`\n\nDarrut, who followed Blistig out of the Aren Guard, watches his Fist ride by with a face like a shut door. "He'll have said something," he says at last. "He always says something." He does not laugh. He is the only one in earshot who does not.`, _:''})}${b4In('tallow') ? `\n\nTallow is trying very hard not to laugh, and failing, and then laughing into his hands with his shoulders shaking.` : ''}${b45R({orvas:`\n\nOrvas watches Blistig go by with great interest. "Among the Khundryl," he says, "an old chief would do that to a young one who talked too much. Then they would drink." He considers it. "I do not think they will drink."`, redblade:`\n\n"Fist Baralta will have heard by now," Ramin says. "He will be insufferable about it, in silence, for a week."`, warlock:`\n\n"*Good,*" the grandmother says, out of Keth's mouth, quite loudly, and the nearest recruits hear it.`})}

The recruits round the Third are looking at the squad. They want the story.`,
      ch:[{t:'Tell the recruits the story. The best version.', fx:()=>{ S.f.b4_c5_bandage = 'told'; b4Nerve(1, 'The recruits laughed at a Fist'); b45L('darrut', -1); }, go:'b4_c5_bandage_told'},
          {t:'"A Fist walked into a door. Eyes front."', fx:()=>{ S.f.b4_c5_bandage = 'kept'; b45L('darrut', 1); b45L('hessa', 1); }, go:'b4_c5_bandage_kept'}]}),
    b4_c5_bandage_told:()=>({sp:'The 9th\'s line', scene:'b4_c5_seabed', txt:
`You tell it the way the column has it best: the Fist of the 8th, grey and old and sad, and the Fist of the 9th telling him what to do with his legion, and the old man listening, and nodding, and then hitting him once, very hard, in the middle of the face. The recruits howl. The freckled girl has to sit down on the road.

It goes down the 9th like water down a slope. By noon the whole Second Company is telling it, and by evening it will be the 10th's, and the 9th will have to hear it back from them, worse. But the recruits are laughing at a Fist, out loud, in the Holy Desert, and they have not laughed since the Wall came over the horizon.${b45Say({darrut:` Darrut stands a little way off from it with his back to the laughter, and his shield on his arm.`, _:''})}`,
      ch:[{t:'Walk the halt.', go:()=>startExplore()}]}),
    b4_c5_bandage_kept:()=>({sp:'The 9th\'s line', scene:'b4_c5_seabed', txt:
`"A Fist walked into a door," you tell the recruits. "Eyes front." They look disappointed, and then, because the sergeant said it, they face front, and the story goes by the Third's stretch of the line on its way somewhere else.

${b45Say({darrut:`Darrut nods to you once, very slightly, as if you had done him a favour he did not ask for.`, hessa:`Hessa nods once. "In the temple," she says, "we did not laugh at the priests where the novices could see." She thinks. "We laughed after."`, _:`The squad faces front too.`})}`,
      ch:[{t:'Walk the halt.', go:()=>startExplore()}]}),
    b4_c5_ship:()=>({sp:'A ship of stone', scene:'b4_c5_seabed', txt: S.f.b4_c5_glass || S.f.b4_c5_glassNo ?
`The ship of stone lies on its side in the shell, the way it has for longer than anybody has had a name for it, with ${S.f.b4_c5_glass ? 'a raw pale socket in the stern where the squad prised the glass out' : 'its green eye still set fast in the stern'}.` :
`A little way off the road there is a ship lying on its side in the shell, half buried: a long, high-sterned hull with the ribs showing through the planking in places, and every plank and rib and peg of it turned to grey stone. The sea went away and the ship stayed where it lay, and the stone came up into it from the sea bed, slowly, a grain at a time, until it was all stone.

In the high stern, where a captain would have stood, there is a window: a round stern-light with its frame turned to stone like the rest, and in the frame, still set, a disc of thick green glass, clouded at the edge and clear in the middle. The sun is in it.${b45Say({tallow:`\n\nTallow puts his hand flat on the hull and keeps it there. "My grandfather would've wept," he says. "He'd have known what she was. What port." He takes his hand away. "There's no sea."`, tangle:`\n\nTangle walks round the ship once, slowly. "Stone," he says. "All the way through. Like a cusser that went off very, very slowly."`, _:''})}`,
      ch:[{t:'Prise the glass out of its frame. (stone, set hard)', check:['might', 14], req:()=>!S.f.b4_c5_glass && !S.f.b4_c5_glassNo,
            edges:id=>[(id === 'hessa' || id === 'darrut') && ['shield-line shoulders', 1], id === 'tallow' && ['he knows how a stern-light is set', 1], id === 'tangle' && ['he has opened tighter things than this', 1], id === 'marrow' && ['old hands, old stone', -1]],
            near:{t:()=>`Yes, but the stone frame gives all at once, and the edge of the glass opens ${NAME(ROLL().who || 'sgt')}'s palm on the way out. ${3 + lvT()} health down at the start of the next fight.`, fx:()=>bruise(ROLL().who || 'sgt', 3 + lvT())},
            go:'b4_c5_ship_ok', fail:'b4_c5_ship_no'},
          {t:'Leave it to the sea.', go:()=>startExplore()}]}),
    b4_c5_ship_ok:()=>({sp:'A ship of stone', scene:'b4_c5_seabed', fx:()=>{ S.f.b4_c5_glass = 1; gain('b4_c5_seaglass'); }, txt:
`${by({tallow:`Tallow does it the way the shipwrights did it at home, which is mostly patience: a knife-point worked round and round the frame, a grain at a time, and then his thumb on the glass and a word to it. It comes out into his hand.`, _:`{who} works a knife-point round the stone frame until the stone gives, and the glass comes out whole.`})} It is heavy and cool, green as deep water, and when it is held up to the eye the haze on the old sea floor goes thin and sharp in the middle of it. It goes into the kit.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b4_c5_ship_no:()=>({sp:'A ship of stone', scene:'b4_c5_seabed', fx:()=>{ S.f.b4_c5_glassNo = 1; }, txt:
`The stone has the glass, and keeps it. ${by({sgt:'You work', _:'{who} works'})} at the frame until the knife-point snaps, and the green eye in the stern of the ship goes on looking out over the sea floor at a sea that is not there. It has done that for longer than the Empire. It can do it a while yet.`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b4_c5_shells:()=>({sp:'A bank of shells', scene:'b4_c5_seabed', fx:()=>{ if (!S.f.b4_c5_conch) { S.f.b4_c5_conch = 1; gain('b4_c5_conch'); } }, txt:
`Off the road the floor rises into a long bank of shells, whole ones, washed up here by a tide nobody alive has seen: thousands of them, pale and spiral and ridged, crunching under the boots, and among them big ones as long as a forearm, cream outside and pink inside, the colour of a mouth.

${b45Say({tallow:`Tallow goes down on his knees in them and picks one up, the biggest, and turns it over in his hands, quiet for once. "A conch," he says. "My grandmother kept one by the door. You blew it when a boat was late, so they'd hear it out on the water and know which way was home." He holds it out to you. "She'd say find one this far from the sea and it's a sign." He does not say of what. "You keep it, Sergeant. I'd only blow it."`, _:`One of the big ones comes away from the bank whole, heavy and cool, and when it is held to the ear there is the sea in it, faint and far off, going in and out. It goes into the kit. The Quon recruits will want to hear it.`})}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    b4_c5_marker:()=>({sp:'A marker stone on the old road', scene:'b4_c5_seabed', txt:
`At the road's edge there is a marker stone, waist high, older than the road by the look of it, worn round as a loaf by a wind that was a sea once. Its face is covered in marks: deep old ones nobody can read, and over them newer ones, cut and recut, simple, a hand's width apart. A circle with a line through it. Three dots. A wavy line, and an arrow.${b4In('haddat') ? `\n\nHaddat stops dead in front of it. Then she puts out her hand and traces the wavy line with one finger, and the arrow after it. "Water-sellers' marks," she says, very quietly. "Hissar's. My mother cut these. Not these ones. Ones like them." She traces the circle. "This one is *the road is firm*. This is *a day's walk*. This is *water*."` : `\n\nThe newer marks have been cut by somebody who came this way often, and wanted to come back.`}`,
      ch:[{t:'Learn to read the marks, and the ground they read. (the Sea-Bed Road)', check:['wits', 16], trick:'b4_c5_seabed', req:()=>!S.f.b4_c5_roadTried, fx:()=>{ S.f.b4_c5_roadTried = 1; },
            edges:id=>[id === 'haddat' && ['her mother cut marks like these', 3], id === 'orvas' && ['the Khundryl read the ground of the Odhan', 1], id === 'tebbet' && ['the far view, and the hills', 1], id === 'darrut' && ['the Guard kept old maps of the desert', 1], id === 'tallow' && ['he has never read anything but cards', -1], id === 'hessa' && ['a temple door has no use for roads', -1]],
            near:{t:()=>`Yes, but it takes the whole halt, bent over the stone in the sun with the dust in the eyes, and ${NAME(ROLL().who || 'sgt')} comes back to the column with a head like a drum. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c5_marker_ok', fail:'b4_c5_marker_no'},
          {t:'Walk on.', go:()=>startExplore()}]}),
    b4_c5_marker_ok:()=>({sp:'A marker stone on the old road', scene:'b4_c5_seabed', txt:
`${by({haddat:`Haddat crouches at the stone with you and goes through the marks one by one, as her mother went through them with her when she was small, her finger in the grooves. *Firm. Soft. A day. Water. Do not.* Then she stands, and looks out across the floor, and points. "There," she says. "See where the shell lies flat, and the dust lies thin over it? The old road is under that. And there, where it humps: not." She shows you how to look at it so the haze goes thin. "It is not magic, Sergeant. It is just knowing where you are."`, orvas:`Orvas crouches at the stone and does not read the marks. He reads the floor round it instead, the way the Khundryl read the Odhan: where the shell lies flat and firm, where the dust settles thin, where the eye can see further. "There," he says, pointing. "And there. A horse would know." He grins. "We are the horse."`, _:`{who} crouches at the stone with the marks, and the old road beside it, until they read together: where the shell lies flat and firm under the dust, where the dust lies thin, where the eye goes further through the haze than it wants to. It is not magic. It is knowing where you are.`})}`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),
    b4_c5_marker_no:()=>({sp:'A marker stone on the old road', scene:'b4_c5_seabed', txt:
`The marks are marks. ${by({sgt:'You look', _:'{who} looks'})} at them until the halt is called, and at the sea floor round the stone, and the floor is white and the haze is white and the dust comes and goes, and none of it says anything. Whoever cut the marks knew what they meant. Whoever reads them has to have been told.`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),
    b4_c5_sea_back:()=>({sp:'The way back', txt:
`Back along the old road, the dust of the 10th coming up behind, and past it, far back, the strip of rippled sand where the Wall stood. Nothing back there now.`,
      ch:[{t:'Not that way.'}]}),
    b4_c5_hollet_sea:()=>({sp:'Captain Hollet', scene:'b4_c5_seabed', fx:()=>{ S.f.b4_c5_holletSea = 1; }, txt:
`Captain Hollet is walking beside a water wagon with his tablet against his chest, counting as he walks, with his lips moving. When he sees the Third he stops counting, and that is the worst sign the Third has had all morning.

"Seven days," he says. "It was nine. It's seven. The scouts found two wells this morning and both of them were foul. Fist Gamet was right. They've been ahead of us, killing goats in every well in the desert." He looks at the tablet. "We can go back. Or we can go on and find the Whirlwind's water before we run out of ours."

He looks across the white floor into the haze. "There's nothing in my books about a sea that's dry, Sergeant."`,
      ch:[{t:'"Seven days, sir. Long enough."', go:()=>startExplore()}]}),
    b4_c5_recruit_sea:()=>({sp:'The freckled recruit', scene:'b4_c5_seabed', fx:()=>{ S.f.b4_c5_recSea = 1; }, txt:
`The freckled girl from Aren is sitting on her pack on the road's edge with a little shell in each hand, comparing them very seriously. She holds one up as you come by.

"Sergeant. Is it true it was a sea? A real one? With fish?" She turns the shell. "I'm from inland, me. I'd never seen the sea till the transports. Then I'd never seen a desert. Now it's both." She puts the shells in her pocket, both. "My mother won't believe me."${b4In('tallow') ? `\n\nTallow, beside her, holds his conch out to her ear without a word, and she listens, and her face changes.` : ''}${b45Say({hessa:`\n\nHessa looks down at her. "Write it down," she says. "Then she will have to believe you. That is what letters are for."`, _:''})}`,
      ch:[{t:'"It was a sea. Keep the shells."', go:()=>startExplore()}]}),
    b4_c5_seti:()=>({sp:'A Seti archer', scene:'b4_c5_seabed', fx:()=>{ S.f.b4_c5_seti = 1; }, txt:
`A Seti woman archer rides up the column on a shaggy horse with her bow across her knees, one of the women archers whose wounded the Third sat with on the barrow night, and stops beside the squad, and lifts her chin to the sergeant.

"Chain squad," she says. "My society remembers." She looks out at the white floor. "We scout for the column now, the Seti, ahead of the Wickans' line. There is nothing out there. White, and bones, and dust." She grins, tight. "And somewhere, water. When the 9th finds it, tell the Seti." She rides on.`,
      ch:[{t:'Lift a hand to her.', go:()=>startExplore()}]}),

    /* ---- the key: the seep off the column, or the column under the dust ---- */
    b4_c5_key:()=>{ const fd = b45Finder();
      return {sp:'Sergeant Radde', scene:'b4_c5_seabed', fx:()=>{ S.f.b4_c5_finder = fd; }, txt:
`Radde is standing on the old road with the book open and nothing written on the page, looking at the water wagons going by.

"Seven days," he says. "The captain's told you. Every well the scouts find, somebody's been there first with a dead goat. Fist Gamet says Dom. I'd say it doesn't matter who." He shuts the book. "Orders are the column keeps together and keeps walking, and the water's rationed from noon. No one leaves the road. The riders are out there in the dust, picking off whatever leaves the road."

${fd === 'haddat' ? `Haddat steps up beside you before he has finished. "There is a seep," she says. "Half a day off the road, north and west, in the old sea bed, under a coral reef that stands up out of the floor like a broken jaw. My mother's people watered there. They called it *the Widow*, because it never ran dry and it never ran sweet." She looks at Radde. "I was there when I was eight. I know the marks on the road that lead to it. I passed one this morning."` : fd === 'orvas' ? `Orvas steps up beside you before he has finished. "There is water," he says. "North and west, half a day, under a reef of coral that stands up out of the floor. A Khundryl scout found it yesterday, when the Wall went back. The Whirlwind's horses had been at it. Their tracks go there and come back." He grins. "Gall's scouts tell Gall. Gall's scouts' cousins tell me."` : fd === 'seti' ? `A Seti woman archer is waiting at Radde's elbow on her shaggy horse: the one whose society remembers the Third. "There is a seep," she says. "North and west, half a day, under a reef that stands up out of the floor. We found it this morning, scouting. Riders of the Whirlwind water there; we saw their horses. Our officers will not hear of it. It is off the road." She looks at the sergeant. "The Chain squad might."` : fd === 'darrut' ? `Darrut clears his throat, behind you. "In the Guard house at Aren," he says, "there was an old map on the wall. Of the Holy Desert, from before the rising. Water-sellers' map, somebody said, bought off a caravan." He frowns, remembering. "There was a seep marked on it. A day in from the Wall, north and west of the old road, under a reef. I used to look at it on night watch." He shrugs. "I don't know if it's still there. A seep's a seep. They don't move."` : `A Seti scout has ridden up to Radde's elbow on a shaggy horse while he talks, a young woman archer with the dust thick in her braids. "There is a seep," she says. "North and west, half a day off the road, under a reef that stands up out of the floor. We saw it this morning, scouting. Riders of the Whirlwind water there. Our officers will not leave the road for it." She looks at the Third, at the bones at its throats and the Chain written all over it. "They say you are the ones who do not stay on roads."`}

Radde looks at you a long breath. "That's off the road, Sergeant. Half a day there, half back, with skins, under the dust, and riders watering at it, like as not." He opens the book. "Or the column, as ordered. Under the dust, at the back, where the riders have been coming out of the sand at the last wagons all morning." He holds the stylus. "I'll write it either way. The company will see you go, if you go."${b45R({orvas:`\n\nOrvas waits, with his lance grounded, watching you the way he watched you at the river.`, redblade:`\n\n"An order," Ramin says, "and a way round it. The Red Blades know both."`, warlock:`\n\nThe grandmother is watching through Keth's eyes, and she is thirsty.`})}`,
      ch:[{t:fd === 'haddat' ? '"Show us the Widow, Haddat. We\'ll bring the water back."' : '"Show us the seep. We\'ll bring the water back."', fx:()=>{ S.f.b4_c5_key = 'seep'; b4Nerve(-1, 'The company saw the Chain squad go off the line'); b45L('haddat', 2); b45L('tebbet', 1); if (fd === 'orvas') b45L('orvas', 1); }, go:'b4_c5_seep_chosen'},
          {t:'"The column, as ordered. We hold the back."', fx:()=>{ S.f.b4_c5_key = 'column'; S.f.b4_seepWater = 0; b4Nerve(1, 'Radde wrote the Chain squad down as steady'); b45L('haddat', -1); }, go:'b4_c5_column'},
          {t:'"Give me a moment, Sergeant."', go:()=>startExplore()}]}; },
    b4_c5_seep_chosen:()=>({sp:'Sergeant Radde', scene:'b4_c5_seabed', txt:
`Radde writes it before you have finished, and shuts the book on it. "Skins from the wagons," he says. "All you can carry. Six regulars to carry the rest. Back to the road before the light goes. The column's slow; you'll catch it." He looks at the company along the road, who are watching the Chain squad and the water skins and drawing their own conclusions. "And come back, Sergeant. I don't want to write the other thing."

${b45F() === 'haddat' ? `Haddat is already at the water wagon, counting skins, with a face you have not seen on her since Hissar. She looks, for a moment, almost young.` : `${b45FName().replace(/^t/, 'T')} is already at the water wagon, counting skins.`}${b45Say({tebbet:` Tebbet strings his bow. "Off the road," he says. "Good. Columns make me nervous."`, _:''})}`,
      ch:[{t:'Off the road, with the skins.', onward:true, go:'b4_c5_seep_go'},
          {t:'"Not yet. Let them load."', go:()=>startExplore()}]}),
    b4_c5_seep_go:()=>({sp:'Off the road', scene:'b4_c5_seabed', txt:
`The water party goes off the old road onto the white floor with the empty skins on their backs, six regulars behind the squad, and the column's dust closes behind them in a hundred paces. After that there is the floor, and the haze, and the bones of great fish going by on either side, and the dust coming and going, and no road.

${b45F() === 'haddat' ? `Haddat leads. She walks with her head up and the blue shield slung, and every so often she stops at a stone that looks like any other stone and crouches and touches it, and gets up, and goes on, a little to the left.` : b45F() === 'orvas' ? `Orvas leads, on foot, reading the ground as if there were a horse under him: the riders' tracks in the shell, a dropping, a scrape where a hoof turned.` : b45F() === 'darrut' ? `Darrut leads, with a frown, counting paces out loud under his breath and squinting at the sun through the dust. "North and west," he says, every so often, to himself. "North and west."` : `The Seti archer leads on her shaggy horse, at a walk, looking back every so often to see that the infantry have not lost her in the dust.`} Half a day, if the way is right. The dust gives no sign either way.`,
      ch:[{t:'Find it in the dust. (half a day, no road)', check:['wits', 15], req:()=>!S.f.b4_c5_found,
            edges:id=>[id === 'haddat' && ['her mother\'s marks, and her own memory', 3], id === 'orvas' && ['the riders\' tracks are as good as a road to him', 2], id === 'darrut' && ['the old map on the Guard-house wall', 1], id === 'tebbet' && ['the far view, even in this', 1], S.tricks && S.tricks.b4_c5_seabed && ['the old road\'s marks, learned at the stone', 1], id === 'tallow' && ['he gets lost in a camp', -1]],
            near:{t:'Yes, but the way is longer than it was when it was remembered, and the party walks an hour in the dust on the wrong side of a shell bank before the reef shows. Every squadmate starts the next fight thirsty and sore: a little health down.', fx:()=>{ SQUAD().forEach(id => bruise(id, 2 + lvT())); }},
            go:'b4_c5_seep_found', fail:'b4_c5_seep_lost'},
          {t:'"Not yet. Rest a moment in the lee of the bones."', go:()=>startExplore()}]}),
    b4_c5_seep_lost:()=>({sp:'Off the road', scene:'b4_c5_seabed', fx:()=>{ S.f.b4_c5_found = 'late'; SQUAD().forEach(id => bruise(id, 3 + lvT())); }, txt:
`The dust thickens in the afternoon and the haze comes down, and for two hours the water party walks on a white floor with a white sky over it and nothing in between, and ${b45FName()} stops more and more often, and says less. A regular drinks the last of his own water when nobody is looking, and then everybody is looking.

It is late in the afternoon when the reef comes up out of the haze: a long ragged wall of grey coral standing up out of the sea floor like a jaw with half its teeth gone. The squad comes to it the long way round, dry-mouthed, every one of them sore with the walk. Everybody starts the next fight down.`,
      ch:[{t:'Up to the reef, quietly.', go:'b4_c5_seep_start'}]}),
    b4_c5_seep_found:()=>({sp:'Off the road', scene:'b4_c5_seabed', fx:()=>{ S.f.b4_c5_found = 'ok'; }, txt:
`${b45F() === 'haddat' ? `Haddat finds the last of the marks in the early afternoon, on a stone you would have walked past, and stands up from it, and points. Out of the haze ahead a reef comes up: a long ragged wall of grey coral standing up out of the sea floor like a jaw with half its teeth gone. "The Widow," she says, and her voice goes, and comes back. "She is still here."` : `In the early afternoon a reef comes up out of the haze ahead: a long ragged wall of grey coral standing up out of the sea floor like a jaw with half its teeth gone. ${b45FName().replace(/^t/, 'T')} stops, and points.`}

And under the reef, from somewhere, the sound of horses.`,
      ch:[{t:'Up to the reef, quietly.', go:'b4_c5_seep_start'}]}),
    b4_c5_seep_start:()=>({sp:'The seep', scene:'b4_c5_seep', txt:
`Under the reef, in a hollow of the old sea bed where the coral has kept the wind off, there is a hole. It is not much to look at: a black wet mouth in the white floor, a few paces across, with a lip of dark mud round it and the shell gone grey and soft for a stone's throw on every side. The water in it is low and still and smells of salt and iron. It is the only water anybody has seen since the Wall.

And it is taken. A picket of horses stands at the far side of it, heads down, a dozen and more, and round the hole riders of the Whirlwind are filling skins: veiled men in robes the colour of the dust, unhurried, laughing at something. An old man in a grey veil with a staff of black sea-wood stands over the skins, counting them.${b45Say({haddat:`\n\nHaddat looks at the riders a long breath, at their faces, the ones she can see. ${b4Was('b2_ilhar') === 'lost' ? 'She looks at every one, and you see her stop looking at the third, and make herself look again, and breathe out. ' : b4Was('b2_ilhar') === 'parted' ? 'Water-carriers, every one of them. You see her think it, and look harder, and not find what she is afraid of finding. ' : ''}"They have our water," she says, in Hissari, very low. "My mother's water."`, orvas:`\n\nOrvas counts the horses, by habit. "Fourteen," he says. "Good horses. Better than ours." He sets his lance. "That is not why."`, _:''})}${b45R({redblade:`\n\nRamin draws, slowly, so as not to catch the light. "The Whirlwind's water," he says. "Ours now, I think."`, warlock:`\n\n"*Thirsty,*" the grandmother says. "*Everybody is thirsty. One of them is going to be thirsty a long time.*"`})}`,
      ch:[{t:'"Shields. The water\'s ours."', go:()=>startBattle('b4_c5_seep', {})},
          {t:'Tangle puts a burner in the dry weed round the horse picket.', tag:'uses 1 burner', req:()=>b4In('tangle') && (S.inv.burner || 0) > 0, fx:()=>{ S.inv.burner--; }, go:()=>startBattle('b4_c5_seep', {pre:true})},
          {t:'Come down on them along the reef, out of the sun.', check:['wits', 15],
            edges:id=>[id === 'tebbet' && ['he likes high ground, and finds it', 2], id === 'haddat' && ['she knows the Widow\'s reef', 1], id === 'orvas' && ['he knows where a horse will look', 1], id === 'darrut' && ['he is broad, and the coral is narrow', -1], id === 'hessa' && ['a temple guard does not creep', -1]],
            near:{t:'Yes, but a horse on the picket throws its head up at the smell of strangers and screams, and the riders at the water look up all at once.'},
            go:()=>startBattle('b4_c5_seep', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c5_seep_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c5_seep_seen:()=>({sp:'The seep', scene:'b4_c5_seep', txt:
`The coral is sharp and loud underfoot, and somebody's boot sends a slab of it sliding down into the hollow with a noise like breaking crockery. The riders at the water are on their feet before it stops. The old man in the grey veil lifts his staff and shouts, and the riders come round the hole at the squad with their blades out.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c5_seep', {surprise:'e'})}]}),
    b4_c5_seep_after:()=>({sp:'The seep', scene:'b4_c5_seep', fx:()=>{ if (!S.f.b4_c5_seepDone) { S.f.b4_c5_seepDone = 1; S.f.b4_seepWater = 1; } }, txt:
`The riders who can still ride are gone into the haze on their own horses, the rest of the picket stampeded after them. The old man in the grey veil is sitting on the lip of the seep with his staff across his knees, alive, watching the Malazans fill their skins from his water, and saying nothing in any tongue.

It takes an hour. The seep gives slowly and grudgingly, the Widow, never dry and never sweet, and every skin the regulars carry comes up out of the black water salt-tasting and cold and full. When the last of them is stoppered the party stands up under the weight of it, and drinks, once, all of them together, and nobody in the squad has tasted anything so good since the Vathar.${b45Say({haddat:`\n\nHaddat kneels at the lip of the seep last, when the skins are done, and puts her hands in the water to the wrist, and holds them there. She says a name, and then another, and then the names, all of them, quietly, into the Widow, the way her mother's people must have said something here once. Then she stands up with her hands wet and her face wet and does not wipe either.`, _:''})}${b45Say({tebbet:`\n\nTebbet drinks his skin half down in one go and wipes his mouth. "That," he says, "was worth the walk."`, _:''})}${b45R({orvas:`\n\nOrvas brings back two of the riders' horses that did not run, and loads them with skins, and grins. "The herd walks," he says. "The water rides."`, redblade:`\n\nRamin fills his helm from the seep and drinks from it, and offers it to the old man in the grey veil, who looks at it a long while, and takes it.`, warlock:`\n\nKeth drinks, and the grandmother speaks before he has swallowed. "*Old,*" the grandmother says. "*Older than the sea. The sea was the newcomer.*"`})}

They catch the column on the old road as the light starts to go, with the skins on their backs and two horses' worth besides. The Second Company sees them come in over the shell, and sees what they are carrying, and gets up off the ground.`,
      ch:[{t:'Into the column with the water.', onward:true, fx:()=>{ if (!S.f.b4_c5_waterIn) { S.f.b4_c5_waterIn = 1; b4Nerve(2, 'The Chain squad came back with the water'); } }, go:'b4_c5_to_canal'},
          {t:'"A moment. Let them drink first."', go:()=>startExplore()}]}),
    b4_c5_column:()=>({sp:'Sergeant Radde', scene:'b4_c5_seabed', txt:
`Radde licks the pencil and writes. "Steady," he says, reading it back. "I've written steady." He shuts the book. "The back of the column, then. The last wagons, where the water is. The riders have come out of the dust at them twice this morning and gone back in before anybody could get a shield up." He looks at the company. "Take a few of ours. They'll stand better with you there."

${b45Say({haddat:`Haddat looks north and west into the haze for a long breath, where nothing is, and then turns away from it and settles her shield. "Orders," she says, to nobody, and falls in. She does not look that way again.`, _:`The squad falls in at the back of the column.`})}${b45R({orvas:`\n\nOrvas falls in beside you. "My grandmother says a herd that stays together is a herd that drinks last," he says. "But it drinks."`, redblade:`\n\nRamin falls in at the back, very straight. "The rearguard," he says. "The Red Blades' place. Good."`, warlock:`\n\n"*Thirsty,*" the grandmother says, out of Keth, and he tells her to be quiet.`})}`,
      ch:[{t:'To the last wagons.', onward:true, go:'b4_c5_rear_start'},
          {t:'"In a moment."', go:()=>startExplore()}]}),
    b4_c5_rear_start:()=>({sp:'The last wagons', scene:'b4_c5_seabed', txt:
`The back of the column is the worst place in it: the dust of everybody in front coming back in a long brown cloud, the water wagons grinding along the old road at a walk, the carters with their faces wound in cloth, and on both sides the white floor going off into a haze that could hold anything.

It holds riders. In the early afternoon they come out of it on the left, a dozen and more, veiled, at a gallop, low on their horses, straight for the last three wagons and the barrels on them.${b45Say({darrut:`\n\nDarrut has his big shield up before anybody has shouted. "The barrels," he says. "They want the barrels." He sounds personally insulted.`, tebbet:`\n\n"Out of the haze," Tebbet says, with an arrow up and nowhere yet to put it. "Left. A lot."`, _:''})}${b45R({orvas:`\n\nOrvas laughs once and sets his lance. "They ride as well as we do," he says. "Almost."`, redblade:`\n\nRamin draws. "The rearguard," he says, satisfied, as if he had been promised this.`, warlock:`\n\n"*Here they come, children,*" the grandmother says.`})}`,
      ch:[{t:'"Wagons! Shields to the wagons!"', go:()=>startBattle('b4_c5_rearguard', {})},
          {t:'Tangle puts two sharpers under the first horses.', tag:'uses 2 sharpers', req:()=>b4In('tangle') && (S.inv.sharper || 0) >= 2, fx:()=>{ S.inv.sharper -= 2; }, go:()=>startBattle('b4_c5_rearguard', {pre:true})},
          {t:'Listen for them in the dust, and turn the wagons before they come.', check:['wits', 15],
            edges:id=>[id === 'darrut' && ['gates and drill: he has turned wagons into a wall before', 2], id === 'sathi' && ['she hears horses before she sees them', 2], id === 'orvas' && ['he hears horses before he sees them', 2], id === 'tebbet' && ['the far view', 1], S.tricks && S.tricks.b4_c5_seabed && ['the old road\'s marks: where the dust lies thin', 1], id === 'tallow' && ['he is listening to his own heart', -1]],
            near:{t:'Yes, but the carters are slower than the riders, and the last wagon is still turning when they hit it.'},
            go:()=>startBattle('b4_c5_rearguard', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c5_rear_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c5_rear_seen:()=>({sp:'The last wagons', scene:'b4_c5_seabed', txt:
`The dust is full of hooves and every one of them is coming from somewhere else. ${by({sgt:'You turn', _:'{who} turns'})} the wagons the wrong way, and the riders come round the other side of them, on the squad's back, at a gallop.`,
      ch:[{t:'Shields.', go:()=>startBattle('b4_c5_rearguard', {surprise:'e'})}]}),
    b4_c5_rear_after:()=>({sp:'The last wagons', scene:'b4_c5_seabed', fx:()=>{ S.f.b4_c5_rearDone = 1; }, txt:
`The riders go back into the haze the way they came, fewer, and the haze closes behind them. On the old road the last three wagons stand with their barrels still lashed, every one, and one barrel with a lance through it, leaking a slow dark stain onto the stones that the carters are trying to stop with their hands.

The Second Company's regulars are standing round the wagons with their shields up, breathing, looking at the haze and at each other. ${b4Mood() === 'steady' ? 'They stood. They know it.' : 'They held. They are not sure how.'}

Radde comes back down the column at a run, and stops, and looks at the barrels, and opens the book. "Lashed," he says. "All of them." He writes. "One leaking." He writes that too. "Good. That's good, Sergeant."${b45Say({darrut:`\n\nDarrut is sitting on the shaft of the last wagon with his shield across his knees and his hand on the leaking barrel, holding the stave in with his palm. "In the Guard," he says, "we'd have had crossbows in these." He does not take his hand away.`, haddat:`\n\nHaddat stands at the back of the last wagon, looking north and west into the haze. She never mentions the seep, then or later.`, _:''})}${b45R({orvas:`\n\nOrvas has caught a riderless horse and is walking it up and down to cool it. "Spoils," he says. "Do not tell the Fist."`, redblade:`\n\nRamin wipes his blade on a carter's cloth. "The rearguard," he says. "Held."`, warlock:`\n\n"*There,*" the grandmother says. "*Now drink.*" The squad cannot, yet.`})}`,
      ch:[{t:'On, with the column.', onward:true, go:'b4_c5_to_canal'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c5_radde_sea:()=>({sp:'Sergeant Radde', scene:'b4_c5_seabed', txt: b45Key() === 'seep' ?
`Radde is walking beside the water wagon with the book under his arm. "${S.f.b4_c5_seepDone ? 'You came back,' : 'Off the road, Sergeant,'}" he says. "${S.f.b4_c5_seepDone ? 'With water. I wrote it down twice.' : 'with the skins, and back before dark. I\'ve written it. Don\'t make me rub it out.'}"` :
`Radde is walking at the back of the column with the book open. "${S.f.b4_c5_rearDone ? 'Lashed, all of them,' : 'The last wagons, Sergeant,'}" he says. "${S.f.b4_c5_rearDone ? 'The canal city by dusk, the scouts say. Then we\'ll see.' : 'That\'s where they come. I\'d be there.'}"`,
      ch:[{t:'Off the road, with the skins.', req:()=>b45Key() === 'seep' && !S.f.b4_c5_seepDone, onward:true, go:'b4_c5_seep_go'},
          {t:'To the last wagons.', req:()=>b45Key() === 'column' && !S.f.b4_c5_rearDone, onward:true, go:'b4_c5_rear_start'},
          {t:'On, toward the canal city.', req:()=>b45KeyDone(), onward:true, go:'b4_c5_to_canal'},
          {t:'Leave him.', go:()=>startExplore()}]}),
    b4_c5_to_canal:()=> !b45KeyDone() ? ({sp:'The road east', txt:
`East, the old road goes on across the sea floor into the haze, and the head of the column is already on it. ${!b45Key() ? 'Radde will want the Third first.' : b45Key() === 'seep' ? 'The water party has not gone yet.' : 'The last wagons are behind you, and the riders are out there.'}`,
      ch:[{t:'Not yet.'}]}) : ({sp:'The road east', scene:'b4_c5_canal', txt:
`The road runs on east across the floor of the sea until the light is going, and then out of the haze ahead, against the red of the sky, there are towers. Pale towers, broken at the top, and walls, and the long straight lines of streets, and bridges going over nothing: a city of pale stone, standing on the sea floor as if the sea had gone out from under it one morning and the city had decided to stay.

It is built on canals. The canals are dry. The bridges go over beds of white shell and black weed gone to dust, and the column comes into it over the bridges, slowly, wagon by wagon, the way you go into a house where you are not sure anyone is home.`,
      ch:[{t:'Into the canal city.', onward:true, go:()=>{ S.f.b4_c5_ph = 4; startExplore('b4_c5_canal'); talk('b4_c5_canal_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the canal city at dusk: the 10th's forage party, and the deserters ---- */
    b4_c5_canal_arrive:()=>({sp:'The canal city', scene:'b4_c5_canal', txt:
`The column camps in the canal city's squares and streets, wagon by wagon, with the dry canals all round it like moats nobody filled. The stone is pale and smooth and warm from the day, and carved: fish, and waves, and long-necked birds, worn soft. The towers have no tops. The doors have no doors. Whoever lived here took everything with them that would carry and left the rest to the shell.

The light goes red, and then purple, and the dust in the air takes the colour and holds it.

${b45Say({marrow:`Marrow stands in the middle of the first square and turns round slowly with her hands a little away from her sides. "Child," she says. "Child, child." She lowers her hands. "Too many. A long, long time ago. All at once." She does not explain, and the squad does not ask her to.`, haddat:`Haddat walks along the edge of a dry canal, looking down into it. "My mother never came here," she says. "The water-sellers would not. They said the city kept its people." She does not say whether she believes it.`, _:`The squad finds a corner out of the wind and puts its packs down.`})}${b45R({orvas:`\n\nOrvas has climbed a broken stair to look out over the city. He comes down quickly. "There is a road going out to the west," he says, "lined with stones. Standing stones. Like men." He frowns. "I do not like it."`, redblade:`\n\nRamin stands in a doorway with no door, looking at the carving round it. "My father would have known whose this was," he says. "I am glad he is not here to tell me."`, warlock:`\n\nKeth will not put his palms on this stone. "*No,*" the grandmother says. "*Not here. There are too many listening.*"`})}`,
      ch:[{t:'Find Radde.', go:()=>startExplore()}]}),
    b4_c5_radde_canal:()=>({sp:'Sergeant Radde', scene:'b4_c5_canal', fx:()=>{ S.f.b4_c5_raddeCanal = 1; }, txt:
`Radde is at the edge of the 9th's square with a lantern, talking to a corporal of the 10th who has his helm off and his face grey. When the Third comes up the corporal stops talking.

"Forage party of the 10th," Radde says. "Six of them. Went over the north canals at noon looking for wells, ahead of the column, and didn't come back. Their sergeant's asked the Fist for a squad to look. The Fist of the 10th's asked ours. Ours has given them us." He holds up the lantern. "It's getting dark, Sergeant. Across the north canals. There's only the one bridge left standing, the corporal says."

The corporal of the 10th looks at the Third. "They're dead," he says. "I know they're dead. I want them back."${b45Say({haddat:` Haddat nods to him, once. It is not comfort. It is a promise.`, _:''})}`,
      ch:[{t:'"We\'ll bring them back."', go:()=>startExplore()}]}),
    b4_c5_ghosts:()=>({sp:'The road of standing stones', scene:'b4_c5_canal', fx:()=>{ S.f.b4_c5_ghosts = 1; }, txt:
`At the west edge of the city a road goes out of it, straight, across the sea floor into the dusk, and on either side of the road, a pace apart, all the way to where the light ends, there are stones standing on end. Tall as a man. Narrow as a man. Grey, and weathered, and leaning a little, every one of them, toward the road, like a crowd leaning to see something go by.

They are stones. In the last of the light they are stones.

When the dust comes across the road, and goes, there are more of them than there were. When it comes again, fewer. One of them, a long way out, is not leaning toward the road but standing straight, with its face toward the city, and when you look for it again you cannot find which one.${b45Say({marrow:`\n\nMarrow will not look at the road. "Don't count them, child," she says, low. "They don't like being counted."`, tallow:`\n\nTallow has his hand inside his shirt on the deck in its oilcloth. "My grandmother said you don't walk a road like that after dark," he says. "She said it's not your road." He takes a step back from it.`, tebbet:`\n\nTebbet looks down the road a long while with his hand up against the last of the light. "There's somebody out there," he says at last, very quietly. "And there isn't." He looks away. "I'm not going to look again."`, _:''})}`,
      ch:[{t:'Back from the road.', go:()=>startExplore()}]}),
    b4_c5_canalbed:()=>({sp:'A dry canal', scene:'b4_c5_canal', txt:
`The canal is a long straight trench of fitted stone, twice a man's height deep, with steps going down into it here and there to where boats tied up once. The bed is white shell and black weed gone to dust, and in the shell, here and there, a bright thing: a bead, a hook, a coin worn smooth with a face on it nobody knows. ${S.f.b4_c5_desDone ? 'The deserters\' tracks go along it, toward the north, and stop.' : 'There are tracks in the shell, fresh ones, going north.'}`,
      ch:[{t:'Leave it.', go:()=>startExplore()}]}),
    b4_c5_canal_back:()=>({sp:'The way back', txt:
`Back over the bridge, the column's fires going up in the squares behind, and past them the old road west, and its stones. Not that way, after dark.`,
      ch:[{t:'Not that way.'}]}),
    b4_c5_des_start:()=>({sp:'Among the ruins', scene:'b4_c5_canal', fx:()=>{ if (!S.f.b4_c5_found10) { S.f.b4_c5_found10 = 1; b4Nerve(-1, 'The 10th\'s dead in the canal city'); } }, txt:
`Over the one bridge left standing, past the north canals, the city goes on in the near dark: a square, a broken tower, a street of doorways. In the street there are men stooped over something on the ground, a dozen of them, with a hooded lantern between them and sacks. They are taking the boots off it. It is one of the 10th's forage party, and there are others further along, in a row, where they fell.

The men are not riders. They are on foot, ragged, in what is left of the Whirlwind's colours with the badges cut off: deserters, out of the oasis and Sha'ik's army, picking the dead of both sides for anything that will sell to anybody. One of them has a 10th's short sword through his belt. Their leader, a big man with an officer's sash and no badges on it, is sorting the boots into pairs.${b45Say({haddat:`\n\nHaddat stops dead at the end of the street. "They left her," she says, of the deserters. "They left the goddess. And they came to do this." Her shield comes up off her back.`, hessa:`\n\nHessa grounds her spear. "In the temple," she says, "we had a word for men who rob the dead. D'rek ate them." She lifts the spear. "Eventually."`, _:''})}${b45R({orvas:`\n\nOrvas says one word in Khundryl, and spits.`, redblade:`\n\n"Deserters," Ramin says. "From both sides, once, the Red Blades hanged them." He draws. "Both sides."`, warlock:`\n\n"*Crows,*" the grandmother says. "*Two-legged ones.*"`})}`,
      ch:[{t:'"Leave them alone." Shields.', go:()=>startBattle('b4_c5_deserters', {})},
          {t:'Tangle puts a burner in the ruin at their backs.', tag:'uses 1 burner', req:()=>b4In('tangle') && (S.inv.burner || 0) > 0, fx:()=>{ S.inv.burner--; }, go:()=>startBattle('b4_c5_deserters', {pre:true})},
          {t:'Tell them to run. ("The Fourteenth is behind us. All of it.")', check:['guile', 15],
            edges:id=>[id === 'haddat' && ['she can say it in Hissari, and mean it', 2], id === 'darrut' && ['he has talked looters off the Aren docks', 1], id === 'redblade' && ['a Red Blade, saying it', 1], id === 'tallow' && ['his voice cracks on "all of it"', -1], id === 'tebbet' && ['he would rather shoot them than say them', -1]],
            near:{t:'Yes, but the leader in the sash laughs, and keeps the ones nearest him, and the talk only takes the edges off his band.'},
            go:'b4_c5_des_talked', fail:'b4_c5_des_fail'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c5_des_fail:()=>({sp:'Among the ruins', scene:'b4_c5_canal', txt:
`${by({sgt:'You call', _:'{who} calls'})} it down the street, and the deserters look up from the dead, and see how many the squad is, and how many they are, and do the sum, and do not like the answer the sergeant wanted them to get. The leader in the sash drops the boots and draws.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c5_deserters', {surprise:'e'})}]}),
    b4_c5_des_talked:()=>({sp:'Among the ruins', scene:'b4_c5_canal', txt:
`${by({haddat:`Haddat calls it down the street in Hissari, the city's own tongue, in a voice like a door slamming: the Fourteenth is behind us, all of it, every legion, and the Adjunct, and the Khundryl, and the Wickans' dogs. Half the deserters drop what they are holding and go off into the dark between the towers without looking back.`, _:`{who} calls it down the street, loud, in Malazan and in the trade tongue, and half the deserters drop what they are holding and go off into the dark between the towers without looking back.`})}

Not the leader. He looks at the ones who ran, and at the Third, and at the boots, and his face settles. The ones nearest him settle with it.`,
      ch:[{t:'Shields. Fewer of them now.', go:()=>startBattle('b4_c5_deserters', {surprise:'p'})}]}),
    b4_c5_des_after:()=>({sp:'The broken bridge', scene:'b4_c5_canal', fx:()=>{ S.f.b4_c5_desDone = 1; }, txt:
`The leader in the sash is sitting against the wall of the little square with his tulwar a long way from his hand, and the deserters who could run have run, into the dark of the city, toward the oasis or away from it. The squad lets them go.

The squad carries the 10th's dead back across the one bridge in the dark, six of them, on their own cloaks, with their boots back on. The corporal of the 10th is waiting at the bridge's end with a lantern. He looks at each one as it goes by, and says each name, and then he walks behind them to the 10th's square without a word to anybody, which is the only thanks there is.${b45Say({haddat:`\n\nHaddat says the six names after him, under her breath, so she will have them. She has a great many now.`, marrow:`\n\nMarrow walks beside the last of the cloaks with her hand on it. "Six," she says. "Six, child. Write it down for him."`, _:''})}${b45R({orvas:`\n\nOrvas carries the last of them, alone, on his shoulder. He is very quiet, after.`, redblade:`\n\nRamin carries the leader's badgeless sash back with them, and drops it at the 10th's fire. The 10th know what it means.`, warlock:`\n\n"*Six,*" the grandmother says. "*And all of them looking for water.*"`})}`,
      ch:[{t:'The night, with the column.', onward:true, go:'b4_c5_night'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c5_night:()=> !S.f.b4_c5_desDone ? ({sp:'The 9th\'s square', txt:
`The 9th's square, the fires going up, the water wagons in the middle. The 10th's forage party is still out there across the north canals.`,
      ch:[{t:'Not yet.'}]}) : ({sp:'The canal city · night', scene:'b4_c5_canal', txt:
`The column sleeps in the canal city, in its squares and streets and doorways, with the dry canals round it and the towers with no tops standing up against the stars. The dust has dropped with the wind. For the first time since the Wall there is a sky: enormous, and hard, and white with stars, and under it the old sea floor going away pale in every direction to nothing.

${b45Key() === 'seep' ? `The 9th has water tonight. Not a great deal; a mouthful more each, out of the Third's skins and the two horses' worth. The company drinks it slowly, the way you drink something you were not sure you would get, and looks at the Third over the rims.` : `The 9th drinks its ration out of the barrels the Third kept lashed, and goes to sleep a little thirsty, round the water wagons, with the Second Company's regulars sitting up by the last of them with their spears.`}${b45Say({haddat:` ${b45Key() === 'seep' ? 'Haddat sleeps with her head on a full skin, and her hand on it, like a child with a doll.' : 'Haddat lies awake a long while, looking north and west at the dark. Then she sleeps.'}`, _:''})}

Somewhere ahead, past the coral and the dust, is the oasis, and the Whirlwind, and whatever is waiting there for the Fourteenth. The scouts say three days. Radde, by the fire, writes it down.${b45R({orvas:`\n\nOrvas sits up late by the fire with his lance across his knees, and before he lies down he says, to the sergeant, very low: "When it comes, I would like to be on a horse. I know I will not be. I would like it written down that I would have liked it."`, redblade:`\n\nRamin sits up late by the fire, polishing a scale that will be brown again by morning. "Three days," he says. "Then the Whirlwind." He keeps polishing. "Good."`, warlock:`\n\nKeth sleeps with his back to the west road and its stones, and the grandmother, in his sleep, keeps watch.`})}`,
      ch:[{t:'Sleep.', onward:true, go:()=>chapterEnd(5, b45Key() || 'column')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
