/* ============ Book Five, Chapter 4: High Fort ============ */
/* The Sixth Company marches north from Kraig's Landing through the forest to High Fort, the Whitefinders' own station on the frontier, to
   wait there for its battalion, which never comes (Midnight Tides ch 16-18; mt-canon §1.4, §5, §17c). It leaves the river before Trate
   falls: the fall reaches it only as a straggler's talk. Phase 1, the march: the forest road, the stream in spate (Thegg carries Ruuk), a
   hill (Ruuk's stone for Perrit, a herb for Ammet). Phase 2, High Fort, the evening and night before: the garrison puts the Sixth on the
   westernmost rampart under the largest bastion tower, the end of the line furthest from the royals, the stone fort and Moroch; the
   reading by the fire; the garrison's old hand and his brand-pots (the trick); the fort's cadre-master, who does not link a junior of a
   battalion that is not there; the view from the firing step (Dry Gully, the far ramparts, the royal standards, one uneasy officer far
   off); a night patrol into the gully (b5_c4_gully, optional). Phase 3, the battle, headline only from the west rampart: the sorcery
   opens and comes back, the eleven die, a column of lightning far along the line, the wraiths come over the west rampart first
   (b5_c4_wraiths, with the garrison; stage2 the bastion's foot). The line in front breaks, and the key, S.f.b5_c4_key: 'hold' (a bound
   demon inside the rampart, b5_c4_demon, until the horns; the wounded carried in; word of the surrender down the line; b5Disarm(); the
   long file south) or 'run' (west with the Grass Jackets into the wood, armed; the Jheck in the trees, b5_c4_wolves; out on the road
   south ahead of the disarmed column). Never the Queen's rampart, the stone fort, the capture, Moroch's fall or the messenger, Trull, the
   demon Lilac, Fear's tent, the river scene or Hanradi; never a named Edur; never Moroch's group on the road; Perrit is never one of the
   eleven and never called the last of anything. Notes for later chapters: docs/mt-ch4-notes.md. */
/* FOR THE ARTIST (84b): names this file uses.
   Items: ART['item/b5_c4_helm'], ['item/b5_c4_wolftooth'], ['item/b5_c4_pitchpot'].
   Figures: b5_c4_garrison, b5_c4_grassjacket, b5_c4_cadremaster. Reused: b5_c1_ennic, b5_c1_clerk, b5_c1_tilewoman, b5_c3_faraed (the
   guide), b5_letherii (a Trate straggler), b5_wraith, b5_unblooded, b5_edur, b5_demon, b5_jheck.
   Backdrops (SCENEX): b5_highfort (80's, redrawn), b5_c4_forest, b5_c4_field, b5_c4_lightning, b5_c4_surrender.
   Ground (TILEX): b5_c4_road (. road , leaf litter T tree ~ stream - ford # rock h the hill ^ on to High Fort), b5_c4_rampart (. turf
   , trampled earth = rampart crest # bastion wall F fire p brand-pot store g the gate v the firing step ^ the sally-steps to the gully),
   b5_c4_gully (. stones , dry grass # bank x brush e the tracks v back up), b5_c4_wood (. forest floor T tree , fern # rock w the wolf
   sign v the road south). In fights 't' is cover (a brand-pot crate, a boulder, a fallen trunk) and '#' is wall, tower or bank. */

/* ---- small helpers (b54: Book Five, Chapter Four) ---- */
const b54L = (id, n) => { if (b5In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b54Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b5In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b54If = (id, s) => b5In(id) ? (typeof s === 'function' ? s() : s) : '';
const b54Who = () => (ROLL() && ROLL().who) || 'sgt';
const b54Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b54Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b54V = (id, you, they) => id === 'sgt' ? you : they;
const b54Ph = () => S.f.b5_c4_ph || 1;
const b54Key = () => S.f.b5_c4_key || null;
const b54Docks = (n, why) => { S.silver = (S.silver || 0) + n; updSilver(); note(`+${n} docks: ${why}.`, 'good'); };
const b54Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b54Here = () => S.squad.filter(id => id !== 'sgt' && b5In(id));
const b54And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* Chapter Three's key, read with a default: an unset key (a --from=4 save that skipped it) reads as 'watch' */
const b54Warned = () => S.f.b5_c3_key === 'warn';
/* the guide on the march: Ruuk if he walks, else a Faraed scout from the Landing (the brief) */
/* where the battle goes on from, if a player stepped away ("Not now") between its steps: the fire offers it again */
const b54Next = () => { const f = S.f; if (!f.b5_c4_wraithsDone) return 'b5_c4_crest'; if (!f.b5_c4_key) return 'b5_c4_key';
  if (f.b5_c4_key === 'run') return 'b5_c4_run';
  return !f.b5_c4_demonDone ? 'b5_c4_hold' : !f.b5_c4_wounded ? 'b5_c4_wounded' : !f.b5_c4_word ? 'b5_c4_word' : !f.b5_disarmed ? 'b5_c4_pile' : 'b5_c4_south'; };
const b54Guide = () => b5In('ruuk') ? 'Ruuk' : 'the Faraed scout';
/* a "yes, but" in docks of debt on whoever rolled it (5 to 20), never past what the holder will wait for: if it would press the roller,
   the scene takes another cost (alt: {t(id), fx(id)}). fx runs before t (16, settleRoll), so fx decides. As b53Owe. */
let b54NearOk = true;
const b54Room = (id, n) => { const d0 = b5DebtStart(id), lim = d0 > 0 ? d0 * B5_PRESS : 50; return b5Debt(id) + n <= lim; };
const b54Owe = (n, why, line, alt) => ({
  fx:()=>{ const w = b54Who(); b54NearOk = b54Room(w, n); if (b54NearOk) b5Owe(w, n, why); else if (alt && alt.fx) alt.fx(w); },
  t:()=>{ const w = b54Who(); return b54NearOk ? line(w) : (alt && alt.t ? alt.t(w) : `Yes, but it costs ${b54Nm(w)} something.`); }});

/* ---- the Brand-Pot: Book Four's Oil Bola (b4_c4_bola), in Lether's words. From the High Fort garrison's old hands, who keep pitch-pots
   and brands on the west rampart because wolves will not cross fire. Not sorcery. The pot bursts on the mark (1d6) and the pitch burns a
   3x3 for 2 rounds: 1d6 + the level step to anyone who starts a turn there, the squad included. The level step is added the same way
   74's oil adds it, under its own flag, only in Book Five. ---- */
Object.assign(TRICKS, {
  b5_c4_brand:{name:'The Brand-Pot', ch:4, use:'fight', ab:'t_b5_c4_brand', where:'the west rampart at High Fort, from the garrison\'s old hands',
    lore:'A squat clay pot of pitch and tallow, sealed, with a tarred rag for a wick. Light the rag, throw the pot, and it breaks and burns where it lands, a ring of fire the size of a cart. The garrison keeps a store of them under the bastion tower because the wolves of the north will not cross fire, and the old hands say so to anyone who will stand still for it.',
    get fx(){ return `Once a fight: the bearer lights a brand-pot and throws it, range 4. It bursts on the mark (1d6), and the pitch burns round it, a 3×3, for 2 rounds: 1d6 + ${lvT()} to anyone who starts a turn there, the squad included. Not sorcery.`; }},
});
function b54Pitch(pt, rounds){ for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (!wall(pt.x + dx, pt.y + dy)) B.fires.push({x:pt.x + dx, y:pt.y + dy, until:B.round + rounds, txt:'the burning pitch', b5pitch:true}); }
Object.assign(AB, {
  t_b5_c4_brand:{name:TRICKS.b5_c4_brand.name, trick:'b5_c4_brand', boom:true, aoe:1, range:4, desc:()=>TRICKS.b5_c4_brand.fx,
    run(u, x, y){ const pt = scatter(u, x, y, 1, 1); throwArc(u, pt, () => { b54Pitch(pt, 2); blast(pt, [[1,6,0]], '#ff8a3a'); AUDIO.play('burner'); sparks(pt.x, pt.y, 26, '#ff9a3a', .7); });
      blog(`${u.name} puts the rag to a coal, waits for it to catch, and throws the pot the way the old hands showed it: underarm, high, and away from ${u.id === 'sgt' ? 'yourself' : 'everyone'}.`); }},
});
{ const _blog = blog;
  blog = function(m){ if (b5On() && B && typeof m === 'string' && /is caught in the burning pitch\.$/.test(m)) B.b54pitchNext = true; return _blog(m); }; }
{ const _hurt = hurt;
  hurt = function(u, n, crit){ if (b5On() && B && B.b54pitchNext) { B.b54pitchNext = false; n += lvT(); } return _hurt(u, n, crit); }; }
/* the High Fort garrison fight at the squad's level, as 80's Whitefinder regular does */
{ const _mkAlly = mkAlly; mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y);
    if (b5On() && k === 'b5_c4_garrison' && !u.b54g) { u.b54g = true; u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); } return u; }; }

/* ---- the words this chapter adds to Book Five's glossary ---- */
GLOSSX.mt.push(
  [4, 'The Grass Jackets', 'A brigade of the frontier, in green cloth at the helm. At High Fort it stood forward, on the ramparts along Dry Gully, with its sorcerers in the small stone fort.', ()=>(S.chapter || 0) >= 4 && !!(S.f && S.f.b5_c4_ph)],
  [4, 'Dry Gully', 'An old drainage course across the pasture north of High Fort, about a thousand paces out. Three earth ramparts run beside it.', ()=>(S.chapter || 0) >= 4 && (S.f && (S.f.b5_c4_ph || 0) >= 2)]);

/* ---- the reading: the west rampart at night, by the fire, with a helm ---- */
B5READ[4] = {scene:'b5_highfort', where:'the turf by the fire, beside a helm set down crown-first', set:'Night on the westernmost rampart at High Fort, the bastion tower black over it, and a long way across the pasture past Dry Gully, the fires of an army.',
  back:'b5_c4_tiles_done', backT:'Back to the rampart.',
  get say(){ return {perrit:`"Turf." Perrit tests it with a palm, and finds it dry, and nothing behind her but earth and a tower. "At last. Somewhere a person can think." She sets a helm down on its crown for a bowl, and lays out the calfskin.${b5In('ruuk') ? ' Ruuk goes to look at the gully instead, as he always does.' : ''} "Sit, Sergeant. The tiles like a wall."`,
    tilewoman:`"Earth." The old woman spits to one side, for manners, and the rampart takes it. "Earth's honest. It holds what you put in it. A dock, Sergeant, and a helm to throw them in."`}; }};

/* the fire node is a roster fire (38c) */
ROSTER_FIRES.mt[4] = ['b5_c4_fire'];

const B5CH4 = {
  title:'High Fort', number:'Four',
  intro:{loc:'The road north', sub:'From Kraig\'s Landing, through the forest · morning', scene:'b5_c4_forest', cap:'A military road gone to leaf litter under old trees, a stream loud somewhere ahead, and a company walking north to meet its battalion.',
    paras:[
`The Sixth Company goes north from Kraig's Landing by the forest road, with its paybooks in the oilskin case and its orders in Finadd Ennic's book: High Fort, the battalion's own station, to wait there for the battalion.`,
()=>{ const v = b54Here().map(id => TPL[id].name);
  return `${v.length ? `${b54And(v)} ${v.length > 1 ? 'walk' : 'walks'} with you, under trees that were old when Lether was a colony.` : 'The squad, this month, is you, under trees that were old when Lether was a colony.'} ${b5In('ruuk') ? 'Ruuk walks a step ahead, as always, and the road goes where he says.' : 'A Faraed scout from the Landing walks a step ahead, and the road goes where he says.'}`; },
`Behind the company, the river, and Trate at the end of it. Ahead, the frontier. The Sixth has not been home to its own barracks since the spring, and its home is a fort.`],
    go:'Up the road', node:'b5_c4_start'},

  areas:[
    /* 16 x 12 (b5_c4_road, day). The forest road north: . the road , leaf litter  T trees  ~ the stream in spate  - the ford
       # rock  h a bare hill off the road  ^ on, north, to High Fort */
    { id:'b5_c4_road', title:'The forest road', sub:'North from the Landing', hint:'Tap ground to move · tap a figure to talk · the road goes north, over the stream', decor:'b5_c4_road',
      map:[ "TTTTTTT^TTTTTTTT",
            "TT,,TT,.,TT,,,TT",
            "T,,#,,..,,,,h,,T",
            "T,,,,,.,,,,,,,,T",
            "TT,,,,.,,,TT,,TT",
            ",,,TT,.,,,,,,#,,",
            "~~~~~~-~~~~~~~~~",
            ",,,,,,.,,TT,,,,,",
            "TT,#,,.,,,,,,,TT",
            "T,,,,..,,,,T,,,T",
            "TT,,,.,,,,,,,,TT",
            "TTTTT.TTTTTTTTTT" ],
      walk:'.,-', triggers:{'-':'b5_c4_ford', h:'b5_c4_hill', '^':'b5_c4_north'}, start:{x:5, y:10},
      quest:()=> !S.f.b5_c4_ford ? 'North, up the road. There is a stream ahead.' : 'North, to High Fort.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:7, y:9, node:()=>'b5_c4_ennic_road', fresh:()=>!S.f.b5_c4_ennicRoad},
        {id:'guide', name:'The Faraed scout', kind:'b5_c3_faraed', x:7, y:7, node:()=>'b5_c4_guide', show:()=>!b5In('ruuk'), fresh:()=>!S.f.b5_c4_guide},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:4, y:9, node:()=>'b5_c4_clerk_road', fresh:()=>!S.f.b5_c4_clerkRoad} ] },

    /* 16 x 12 (b5_c4_rampart). The westernmost rampart at High Fort, under the largest bastion tower: # the tower (top left) and the fort's
       inner wall (bottom)  = the rampart crest  . turf , trampled earth  F the rampart's fire  p the garrison's brand-pot store under the
       tower  v the firing step, where you can see the field  ^ the sally-steps down to the gully  g the gate into the fort */
    { id:'b5_c4_rampart', title:'High Fort · the west rampart', sub:'Under the bastion tower', hint:'Tap ground to move · tap a figure to talk · the firing step looks out over the field', decor:'b5_c4_rampart',
      map:[ "####============",
            "####==========^=",
            "####p..v........",
            "....,,......,,..",
            "..,,....F.....,,",
            "................",
            ",,....,,.....,,.",
            "......,,,.......",
            "..,,..........,,",
            ",,......,,......",
            "........,,......",
            "#######g########" ],
      walk:'.,', triggers:{F:'b5_c4_fire', p:'b5_c4_pots', v:'b5_c4_view', '^':'b5_c4_sally', g:'b5_c4_gate'}, start:{x:8, y:9},
      quest:()=> b54Ph() <= 2 ? (!S.f.b5_c4_posted ? 'The garrison\'s officer, on the rampart.' : S.f.b5_c4_patrol && !S.f.b5_c4_gullyDone ? 'The sally-steps, and Dry Gully.' : 'The fire. The night before something.')
        : !S.f.b5_c4_wraithsDone ? 'The crest. They are coming.' : 'The rampart.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:6, y:5, node:()=>b54Ph() >= 3 ? 'b5_c4_ennic_dawn' : 'b5_c4_ennic', fresh:()=>b54Ph() >= 3 ? !S.f.b5_c4_ennicDawn : !S.f.b5_c4_ennic},
        {id:'officer', name:'The garrison\'s Finadd', kind:'b5_c4_garrison', x:10, y:3, node:()=>S.f.b5_c4_posted ? 'b5_c4_posting_again' : 'b5_c4_posting', show:()=>b54Ph() <= 2, fresh:()=>!S.f.b5_c4_posted},
        {id:'oldhand', name:'An old hand of the garrison', kind:'b5_c4_garrison', x:5, y:3, node:()=>S.f.b5_c4_brandTried ? 'b5_c4_oldhand_again' : 'b5_c4_oldhand', show:()=>b54Ph() <= 2, fresh:()=>!S.f.b5_c4_brandTried},
        {id:'cadre', name:'The fort\'s cadre-master', kind:'b5_c4_cadremaster', x:13, y:5, node:()=>'b5_c4_cadre', show:()=>b54Ph() === 2 && !S.f.b5_c4_cadre, fresh:()=>true},
        {id:'grass', name:'A Grass Jacket', kind:'b5_c4_grassjacket', x:3, y:7, node:()=>'b5_c4_grass', show:()=>b54Ph() <= 2, fresh:()=>!S.f.b5_c4_grass},
        {id:'straggler', name:'A soldier off the coast road', kind:'b5_letherii', x:11, y:8, node:()=>'b5_c4_straggler', show:()=>b54Ph() <= 2, fresh:()=>!S.f.b5_c4_trate},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:1, y:9, node:()=>'b5_c4_clerk', fresh:()=>!S.f.b5_c4_clerk},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:14, y:9, node:()=>'b5_c4_tilewoman', show:()=>b54Ph() <= 2, fresh:()=>!S.f.b5_c4_tw} ] },

    /* 16 x 12 (b5_c4_gully, night; the optional patrol). Dry Gully under the far ramparts: # the banks  . stones on the old bed
       , dry grass  x brush  e where the tracks are  v back up the bank to the sally-steps */
    { id:'b5_c4_gully', title:'Dry Gully', sub:'Night · the patrol', hint:'Tap ground to move · the gully runs east · the way back is up the bank', decor:'b5_c4_gully', dark:true,
      map:[ "################",
            "##,,..xx...,,###",
            "#,,....,,..x..,#",
            "#..x...,,....,.#",
            ".....,,...x.....",
            "..,,......,,...e",
            "....x....,,.....",
            "#,,....,,..x..,#",
            "#..,,...x....,,#",
            "##..,,.....,,###",
            "###,,..v..,,####",
            "################" ],
      walk:'.,x', triggers:{e:'b5_c4_tracks', v:'b5_c4_gully_back'}, start:{x:7, y:9},
      quest:()=> !S.f.b5_c4_gullyDone ? 'East, along the gully bed.' : 'Back up the bank to the rampart.',
      npcs:[] },

    /* 16 x 12 (b5_c4_wood, failing light; 'run' only). The wood west of the fort: . forest floor  T trees  , fern  # rock
       w where the wolves have been  v south, out of the trees to the road */
    { id:'b5_c4_wood', title:'The wood west of the fort', sub:'Failing light · armed', hint:'Tap ground to move · the way out is south, to the road', decor:'b5_c4_wood', dark:true,
      map:[ "TTTTTTTTTTTTTTTT",
            "TT,,..TT..,,.TTT",
            "T,,...,,....,,..",
            "T.w,,TT..#..,...",
            "TT,,....,,..TT..",
            "T..,,#...,,.....",
            "TT....,,TT..,,TT",
            "T,,.TT....,,...T",
            "T...,,..#...,,TT",
            "TT,,......,,...T",
            "TTT,,..,,....TTT",
            "TTTTTTTTvTTTTTTT" ],
      walk:'.,', triggers:{w:'b5_c4_wolfsign', v:'b5_c4_wood_edge'}, start:{x:14, y:2},
      quest:()=> !S.f.b5_c4_wolvesDone ? 'West, into the trees, ahead of whatever is in them.' : 'South, out of the trees, to the road.',
      npcs:[] } ],

  battles:{
    /* the night patrol into Dry Gully (optional): Edur unblooded scouting the gully, and one warrior with them */
    b5_c4_gully:{title:'Dry Gully', style:'b5_c4_gully', dark:true, warrenText:'Dry Gully at night · the Holds are uneasy tonight, all along the line', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..x.....","....t...","........",".t....x.","........","...t....","........","#......#","##....##"].map(r => r.replace(/x/g, 't')),
      party:[[3,8],[4,8],[2,7],[5,7],[3,9],[4,9]],
      foes:[['b5_unblooded',1,0],['b5_unblooded',5,1],['b5_unblooded',6,3],['b5_edur',3,0]], xp:120, after:'b5_c4_gully_after',
      preText:()=>`Four of them in the gully bed, where the tracks went: three young ones with spears, lighter on their feet than anything that size should be, and one older, with a long sword, who has turned his head already.`},
    /* the battle: the wraiths come over the west rampart first, ahead of everything; the garrison beside the Sixth; then the bastion's foot */
    b5_c4_wraiths:{title:'The west rampart', style:'b5_c4_rampart', warrenText:'High Fort · the Holds are full of something coming back the other way', warren:{meanas:1, denul:1}, music:'battle',
      map:["##..##..","........","..t...t.","........","....t...","........",".t....t.","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b5_c4_garrison',1,7],['b5_c4_garrison',6,7]],
      foes:[['b5_wraith',2,1],['b5_wraith',5,1],['b5_wraith',3,0]], xp:170, after:'b5_c4_wraiths_after',
      waves:[{round:2, foes:[['b5_wraith',0,3],['b5_wraith',7,3]], text:'Two more come over the crest at the ends of the line, low, the way smoke comes over a wall.'}],
      preText:()=>`They come over the crest of the rampart in front of everything else, as the old hand said they would: shapes of dark with no feet under them, and two pale points where faces should be. The garrison's two beside the Sixth lock shields and say a word to the Errant that the Sixth has heard before.`,
      stage2:{title:'The bastion\'s foot', xp:90, keepAllies:true,
        text:()=>`The last of them on the crest comes apart like a torn sheet. Behind the squad, at the foot of the bastion tower, there is shouting: the tower door is open, and something has come round the end of the rampart at it, low and dark, and two young Edur with spears behind it, running.\n\n${b54Say({thegg:'Thegg is already going. "Behind me," he says, and the squad goes behind him.', _:'The squad goes, the garrison with it.'})}`,
        map:["##......","##..t...","##......","##g.....","##....t.","##......","##..t...","##......","........","........"].map(r => r.replace(/g/g, '.')),
        party:[[4,8],[5,8],[3,8],[6,8],[4,9],[5,9]],
        foes:[['b5_wraith',3,2],['b5_wraith',5,1],['b5_unblooded',3,4],['b5_unblooded',6,3]]} },
    /* 'hold': a bound demon inside the rampart, out of nothing, as they did all along the line; then the back slope until the horns */
    b5_c4_demon:{title:'Inside the rampart', style:'b5_c4_rampart', warrenText:'High Fort · the line has broken in front, and the Holds are quiet now, very quiet', warren:{meanas:1, denul:1}, music:'battle',
      map:["========","........","...t....","........",".t....t.","........","...t....","........","........","........"].map(r => r.replace(/=/g, '#')),
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_demon',4,3],['b5_wraith',1,1],['b5_wraith',6,1],['b5_wraith',4,1]], xp:110, after:'b5_c4_demon_after',
      preText:()=>`It is not there, and then it is, on the inside of the rampart among the Sixth's own packs: twice the height of Thegg, armoured in plates like a door studded over, with a crested head and two coals for eyes. Three wraiths come down the crest behind it.`,
      stage2:{title:'The back slope', xp:70,
        text:()=>`The demon is not hit so much as hit enough. It steps back, and is not there.\n\nIt is there again lower down, on the rampart's back slope, between the Sixth and the gate, with two young Edur coming over the crest to it. Somewhere far along the line, horns are blowing that are not Letherii horns, and not yet the ones the Sixth is waiting for.\n\n${b54Say({ammet:'"Hold still," Ammet says, to the squad, to the slope, to the demon. "All of you. Not long now."', _:'Not long now. Hold.'})}`,
        objective:{type:'survive', rounds:4, text:'Hold the back slope for four rounds, until the horns sound and the Edur stop.'},
        map:["........","..t.....","......t.","........","...t....","........",".t....t.","........","........","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,7],[4,7]],
        foes:[['b5_demon',4,1],['b5_unblooded',1,2],['b5_unblooded',5,1]]} },
    /* 'run': the Jheck in the trees west of the fort, in failing light */
    b5_c4_wolves:{title:'The wood', style:'b5_c4_wood', dark:true, warrenText:'The wood west of High Fort · something in the trees has been a man today, and is not now', warren:{meanas:1, denul:1}, music:'battle',
      map:["t..t...t","........","..t..t..","........","t......t","...t....","........",".t....t.","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_jheck',1,1],['b5_jheck',4,0],['b5_jheck',6,2]], xp:180, after:'b5_c4_wolves_after',
      waves:[{round:2, foes:[['b5_jheck',0,5]], text:'A fourth comes out of the ferns on the flank, low and grey, without a sound.'}],
      preText:()=>`Wolves among the trees, grey and very big, three of them, heads low, coming on at a trot as if they had all day and knew where the Sixth was going.`} },

  foes:{
    /* a soldier of the High Fort garrison, beside the Sixth on the west rampart (an ally; grown with the squad as 80's regular is) */
    b5_c4_garrison:{name:'High Fort garrison soldier', sig:'g', kind:'b5_c4_garrison', hp:15, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:1, verb:'cuts at'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each. No weapons in this chapter: everything here a disarmed soldier still keeps.
    b5_c4_helm:{name:'A Grass Jacket\'s helm', slot:'trinket', role:'any', who:null, ac:1,
      line:'An open iron helm with a strip of faded green cloth tied at the crest, dented once over the left ear. It was lying on the west rampart at High Fort where its owner dropped it, running. Whoever wears it is a little harder to hit. +1 armour.'},
    b5_c4_wolftooth:{name:'A tooth too big for a wolf', slot:'trinket', role:'any', who:null, stat:{might:1},
      line:'A canine tooth as long as a finger, yellowed, on a thong. It came from the wolves at High Fort. Nobody in the squad discusses why it is too big for a wolf. Whoever wears it pulls a little harder. +1 Might.'},
    b5_c4_pitchpot:{name:'A brand-pot from the west rampart', slot:'trinket', role:'any', who:null,
      line:'A squat black-glazed clay pot, sealed with pitch, a tarred rag for a wick, a scorch mark down one side where somebody tried it too early. An old hand of the High Fort garrison gave it to the Sixth on the west rampart. The wolves will not cross fire. Neither, it turns out, will anyone sensible.'} },

  scenes:{
    b5_c4_forest:{loc:'The forest road', sub:'North from the Landing · day', cap:'A straight military road gone soft with leaf litter under old trees, and the company on it, single file.', amb:'explore'},
    b5_c4_field:{loc:'High Fort', sub:'The field, from the west rampart', cap:'Dry Gully across the pasture, the far ramparts along it, the royal standards on the furthest, the stone fort, and past all of it a dark line that is an army.', amb:'explore'},
    b5_c4_lightning:{loc:'High Fort', sub:'The battle, far along the line', cap:'A column of white lightning standing on the field a long way off, and shapes in front of it that do not walk.', amb:'explore'},
    b5_c4_surrender:{loc:'High Fort', sub:'After the surrender', cap:'A pile of swords on the turf, soldiers walking south in a long file, and tall grey figures watching them go.', amb:'explore'} },

  end:{
    hold:['The rampart', 'The Sixth went north through the forest to High Fort, the battalion\'s station, to wait for the battalion, and was put under the garrison on the westernmost rampart, as far from the royals as the fort has. The battalion did not come. The Edur did. The wraiths came over the west rampart first, and the Sixth held it with the garrison. When the line in front broke, the Sixth stayed, and held it against a demon that came out of nothing, until the horns. It carried its wounded in through the gate. Then the fort surrendered, and the frontier with it, and the Sixth put its swords on the Edur\'s pile and walked south.'],
    run:['The wood', 'The Sixth went north through the forest to High Fort, the battalion\'s station, to wait for the battalion, and was put under the garrison on the westernmost rampart, as far from the royals as the fort has. The battalion did not come. The Edur did. The wraiths came over the west rampart first, and the Sixth held it with the garrison. When the line in front broke, the Sixth broke with the Grass Jackets, west into the wood, with its weapons, and met what was in the trees. It came out on the road south ahead of the column of the disarmed, still armed.'] },
  endScene:'b5_c4_surrender',
  endCap:()=> b54Key() === 'run' ? 'The road south from High Fort at evening, the wood behind, and behind that a long file of soldiers without swords.' : 'The road south from High Fort at evening, and a long file of soldiers without swords on it, the Sixth among them.',
  tease:'Next: the retreat. South, through country somebody has burned, toward Brans Keep.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b5_c4_key === 'hold') x.push(`The squad held the west rampart until the horns${f.b5_c4_demonDone ? ', against a bound demon that came out of nothing inside it' : ''}, carried its wounded in through the gate, and was disarmed with the rest.`);
    if (f.b5_c4_key === 'run') x.push(`The squad broke west with the Grass Jackets into the wood, armed${f.b5_c4_wolvesDone ? ', met the Jheck in the trees' : ''}, and came out on the road south ahead of the disarmed column.`);
    if (f.b5_c4_wraithsDone) x.push('The wraiths came over the west rampart first. The Sixth held it beside the garrison, and then the bastion\'s foot.');
    if (f.b5_c4_gullyDone) x.push('A night patrol into Dry Gully met Edur scouting it.');
    if (f.b5_ruukCarried) x.push('On the march, Thegg carried Ruuk over a stream in spate without being asked.');
    if (f.b5_c4_brandOk) x.push('An old hand of the High Fort garrison showed the squad the brand-pots: wolves will not cross fire.');
    if (b5In('ruuk')) x.push(f.b5_c4_key === 'run' ? 'Ruuk walked the wood a step ahead of the squad, and it was his kind of wood.' : 'Ruuk stood the rampart with the squad, and said once that it could have been in the trees.');
    if (b5In('brune')) x.push('Brune stood the rampart with her fish-spear, a long way from any shore.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b5_c4_key === 'hold' && 'The fort surrendered, and the whole frontier with it, the word ran. The Queen and the Prince are taken. The Sixth was disarmed with the rest and told to go.',
    f.b5_c4_key === 'run' && 'The Sixth broke west with the Grass Jackets into the wood before the surrender, and kept its weapons. Behind it, the fort surrendered, and the whole frontier with it.',
    f.b5_c4_wounded && 'The Sixth carried its wounded in through the fort\'s gate before the surrender, out of the wolves\' reach.',
    f.b5_c4_mages && 'Every one of the fort\'s eleven mages died when the sorcery came back along the links. Perrit was not linked.',
    f.b5_c4_wraithsDone && 'The wraiths came over the west rampart first, ahead of everything. The Sixth held it with the garrison.',
    f.b5_c4_gullyDone && 'A night patrol in Dry Gully: Edur scouts, three young ones and an older one.',
    f.b5_c4_moroch && 'On the royals\' rampart, far off, one officer walking it was not easy. The garrison says he is the Prince\'s Finadd.',
    f.b5_c4_trate && 'A soldier off the coast road says Trate has fallen, from the sea, in a night.',
    f.b5_c4_posted && (f.b5_noted ? 'The garrison has put the noted company on the westernmost rampart, as far from the royals as the fort has.' : 'The garrison has put the Sixth on the westernmost rampart, under the bastion tower.'),
    'The Sixth is at High Fort, the battalion\'s station, waiting for a battalion that has not come.'].filter(Boolean); },

  dlg:{
    /* ---- the march: the forest road ---- */
    b5_c4_start:()=>({sp:'The forest road', scene:'b5_c4_forest', fx:()=>{ S.f.b5_c4_ph ??= 1; },
      again:()=>`The forest road north, under the old trees. A stream somewhere ahead.`, txt:
`The forest road was a military road once, laid straight as a ruler by somebody with a budget. The forest has been arguing with it since, and is winning: leaf litter to the ankle, roots under the paving, and the trees closing overhead into a roof that lets the light down in coins.

${b5In('ruuk') ? `Ruuk walks a step ahead, looking at the road the way other people look at a liar. "Not that way," he says, at the first fork, where the map says that way. "The map lies. Come."` : `The Faraed scout from the Landing walks a step ahead, a boy of the scouts' fire with three spears over his shoulder, and takes the fork the map does not like without a word to anybody.`}

${b54Say({tobet:'Tobet is naming birds under his breath, badly, then counting arrows, then debts. He gets to the end of the debts and starts again on the birds.', thegg:'Thegg walks in the middle of the road, where it is firmest, and ducks under branches nobody else has noticed.', _:'The squad walks.'})}${b54If('brune', `\n\nBrune has not seen trees like these. She keeps looking up, as if the roof might leak.`)}`,
      ch:[{t:'Find the Finadd.', go:'b5_c4_ennic_road'},
          {t:'Walk on.', go:()=>startExplore()}]}),
    b5_c4_ennic_road:()=>({sp:B5_FINADD.name, scene:'b5_c4_forest', fx:()=>{ S.f.b5_c4_ennicRoad = 1; },
      again:()=>`Finadd Ennic, walking with his book shut. "High Fort, Sergeant. The battalion."`, txt:
`Finadd Ennic walks with his book under his arm and his eyes on the trees, which he seems to find untidy.

"Five days' march from First Reach, the battalion, by good road," he says. "It was recalled before we left the Landing. It should be at High Fort before us, or the day after." He looks pleased, and then careful. "Should. The battalion's commander can decide things, Sergeant. I am looking forward to it more than an officer ought to."

He considers the road. "The garrison will want us on a wall until the battalion comes. I have written that we are at its disposal." A pause. "I underlined *until*."`,
      ch:[{t:'"Good, Finadd."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_guide:()=>({sp:'The Faraed scout', scene:'b5_c4_forest', fx:()=>{ S.f.b5_c4_guide = 1; },
      again:()=>`The Faraed scout, a step ahead. "Stream, then hill, then fort."`, txt:
`The scout is a boy of fifteen or sixteen from the fire at the Landing, with a hide coat and three throwing-spears and the look, common to every Faraed the Sixth has met, of somebody who finds the Letherii army very funny and is too polite to say so.

"Stream, then hill, then fort," he says, pointing at each in turn, though you can see none of them. "The stream is high. It rained in the mountains." He shrugs. "The map says there is a bridge. There was a bridge. My uncle saw it."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_clerk_road:()=>({sp:'The company clerk', scene:'b5_c4_forest', fx:()=>{ S.f.b5_c4_clerkRoad = 1; },
      again:()=>`The clerk, with the oilskin case held to his chest.`, txt:
`The company clerk walks with the oilskin case held to his chest in both arms, as people carry a child they have been told not to drop. There is a stream ahead. He can hear it. So can everybody.

"The paybooks are oilskinned," he tells you, before you ask. "Twice. And waxed at the seams." He swallows. "I am told the stream is high."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the stream in spate, the ford, and the river carry (Ruuk's bio): if Thegg and Ruuk both walk, Thegg carries him over unasked */
    b5_c4_ford:()=>{ const carry = b5In('thegg') && b5In('ruuk');
      return {sp:'The stream', scene:'b5_c4_forest', fx:()=>{ if (!S.f.b5_c4_ford) { S.f.b5_c4_ford = 1; if (carry) S.f.b5_ruukCarried = 1; } },
        again:()=>`The ford, waist-deep and loud, with the road going on north on the far side.`, txt: S.f.b5_c4_crossed ?
`The ford, brown water over stones, louder than it is deep. The road goes on north on the far side.` :
`The stream has come down out of the mountains overnight and taken the bridge the map promised with it: two stone piers stand in the water with nothing between them. The ford beside them is brown and fast and comes to a tall man's waist, and over the stones it is very loud.

${carry ? `Ruuk is pulling his boots off at the edge, cheerfully, to wade it, when Thegg picks him up. Thegg does not ask. He puts Ruuk on his shoulders the way you would put a pack on, and walks into the stream, and across it, leaning on the current with his whole side, and puts Ruuk down on the far bank with his boots still in his hand.\n\nRuuk looks at Thegg, a long way up, and laughs out loud. "Thank you," he says, and then, in Faraed, something longer. Thegg nods as if he understood it. Perhaps he did.` : b5In('ruuk') ? `Ruuk wades in to the waist with his spears held over his head, laughing at the cold, and is across before anybody has decided how to do it.` : `The scout wades in to the waist with his spears held over his head and is across before anybody has decided how to do it.`}${b54If('brune', `\n\nBrune stands in the edge of it to the knee, and looks downstream. "Even this goes to the sea," she says.`)}`,
        ch:[{t:'Across, the company holding the line.', req:()=>!S.f.b5_c4_crossed, check:['might', 12], fx:()=>{ S.f.b5_c4_crossed = 1; },
              edges:id=>[id === 'thegg' && ['the current has to go round him', 3], id === 'brune' && ['she has stood in worse water all her life', 2], id === 'pessa' && ['she knows a rope across moving water', 1], id === 'perrit' && ['the water is right there, all round her', -2]],
              near:{t:()=>{ const w = b54Who(); return `Yes, but ${b54Nm(w)} ${b54V(w, 'go', 'goes')} under once in the middle and ${b54V(w, 'come', 'comes')} up with a mouthful of the mountains and a knee cracked on a stone: bruised.`; }, fx:()=>bruise(b54Who(), bruiseN())},
              go:'b5_c4_ford_over', fail:'b5_c4_ford_wet'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c4_ford_over:()=>({sp:'The stream', scene:'b5_c4_forest', txt:
`The company goes over on a rope with the big ones at the deep end, one soldier at a time, and the clerk in the middle with the case held over his head in both hands like an offering. Nothing is lost. The clerk checks the case on the far bank, and then again, and then sits down on a root.${b54If('perrit', `\n\nPerrit comes out of the water white to the lips and very straight, and walks on north without looking behind her. Not one of them mentions it, which is the squad's kindness.`)}`,
      ch:[{t:'North.', go:()=>startExplore()}]}),
    b5_c4_ford_wet:()=>({sp:'The stream', scene:'b5_c4_forest', fx:()=>{ if ((S.inv.salve || 0) > 0) S.inv.salve -= 1; }, txt:
`The rope goes slack at the wrong moment and half the company goes in to the chest. Everyone comes out. Not everything does: one of the squad's salves goes down the stream in its waxed paper, toward the river, toward Trate, toward the sea. The clerk comes out with the case held up over his head and will not put it down for an hour.`,
      ch:[{t:'North.', go:()=>startExplore()}]}),

    /* the hill: Ruuk brings Perrit a stone from it, and Ammet a herb she knows only half of (their bios) */
    b5_c4_hill:()=>({sp:'A bare hill', scene:'b5_c4_forest', fx:()=>{ S.f.b5_c4_hill = 1; if (b5In('ruuk') && b5In('perrit')) S.f.b5_c4_stone = 1; if (b5In('ruuk') && b5In('ammet')) S.f.b5_c4_herb = 1; },
      again:()=>`The bare hill off the road, with the forest all round it and the mountains behind.`, txt:
`Off the road, a bare hill stands up out of the trees, grass and stones, the only place in the forest where the sky comes all the way down. From the top you can see north over the treetops: a long green pasture, and a fort on it, small and square, with earth ramparts in front. Past it, the mountains. Past them, the pass.

${b5In('ruuk') ? `Ruuk goes up it at a run and comes down again with his hands full.${b5In('perrit') ? ` He gives Perrit a stone: grey, flat, with a white vein through it like a crack in a tile. "For your bag," he says. "It is a good stone. It does not tell anything." Perrit looks at it, and at him, and puts it in her pouch with the tiles, where she has never let anything else go.` : ''}${b5In('ammet') ? ` He gives Ammet a sprig of something grey-leaved with a smell like pepper. "My grandmother puts it on burns," he says. Ammet crushes a leaf, smells it, and frowns. "Mine put it in tea," she says. "For the bowels." They look at each other with mutual professional suspicion. She keeps it.` : ''}` : 'The scout points at the fort. "High Fort," he says. "Your fort." He seems to find it small.'}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the road's end: on to High Fort */
    b5_c4_north:()=>({sp:'The forest\'s edge', scene:'b5_c4_forest', txt: !S.f.b5_c4_ford ?
`The road goes on north through the trees. The stream is between here and there, and you can hear it.` :
`The trees stop all at once, as if they had been told to, and the road goes out across a long green pasture toward a fort: earth ramparts and a ditch, square bastions at the corners with engines on them, and a tall bastion tower at the western end. North of it, a long way out across the grass, a line in the ground that must be the gully, and past that the mountains.

There are a great many more soldiers in front of High Fort than any garrison needs, and none of them has a white fingertip on the shield.`,
      ch:[{t:'On, to High Fort.', req:()=>!!S.f.b5_c4_ford, onward:true, go:()=>{ S.f.b5_c4_ph = 2; startExplore('b5_c4_rampart'); talk('b5_c4_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- High Fort: the first halt (the reading) ---- */
    b5_c4_arrive:()=>({sp:'High Fort · the west rampart', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_arrived = 1; },
      again:()=>`The west rampart, under the bastion tower. The garrison, and no battalion.`, txt:
`The battalion is not at High Fort.

The garrison's gate-sergeant has never heard of the battalion coming, or rather, he has heard of it, and has written it down, and is still waiting, like everybody. What is at High Fort instead is the Queen. She came in yesterday with the Queen's Battalion and the Quillas Brigade and the Prince, falling back on the fort from the pass, which the Edur crossed first. The royal standards are on a rampart of their own out in front, the furthest east. The Grass Jackets are forward on the ramparts along the gully. The garrison has the walls.

The Sixth is shown the westernmost rampart, a long bank of earth under the largest of the bastion towers, at the far end of the line. It has a fire-pit, a crate of something under the tower, and a view.${b54Say({perrit:`\n\nPerrit looks at the ground under her feet, which is earth, and at the gully, which is dry, and lets out a breath she has been holding since Trate.`, tobet:`\n\nTobet looks along the ramparts to the royal standards, very small at the far end. "The far end," he says quietly. "Good. Nobody looks at the far end."`, _:''})}`,
      ch:[b5TileChoice(4),
          {t:'Find the garrison\'s officer.', go:'b5_c4_posting'},
          {t:'Walk the rampart.', go:()=>startExplore()}]}),
    b5_c4_tiles:()=>b5TileOffer(4),
    b5_c4_card:()=>b5TileCard(4),
    b5_c4_tiles_done:()=>({sp:'The Tiles of the Holds', scene:'b5_highfort', txt:
`${S.f.b5_c4_drawn ? (S.f.b5_c4_reader === 'perrit' ? `Perrit counts the tiles back into the pouch${b5In('ruuk') && S.f.b5_c4_stone ? ', and Ruuk\'s grey stone with them' : ''}, and ties the pouch twice. She sits on with her back to the turf for a while, because she can.` : 'The tile-woman wraps the bone tiles in the oiled cloth, and the dock goes somewhere in her shawl, and she gives the helm back crown-first.') : 'The tiles stay in the pouch.'} Out past the gully, the fires.`,
      ch:[{t:'Back to the rampart.', go:()=>startExplore()}]}),

    /* the posting: the garrison's Finadd puts the Sixth under the garrison, on the westernmost rampart (on Ch3 'warn': "as far from the
       royals as the fort has"); the Sixth's rations, a check */
    b5_c4_posting:()=>({sp:'The garrison\'s Finadd', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_posted = 1; },
      again:()=>`The garrison's Finadd, with the line's list. "The west rampart, Sergeant. Under the tower."`, txt:
`The garrison's Finadd is a short square man with a list, and a pencil behind each ear, and he has had the Queen in his fort for a day and a night. It shows.

"Whitefinders," he says. "The Sixth. Ahead of the battalion." He finds you on the list, which surprises him. "Under the garrison until the battalion comes. The westernmost rampart, under the bastion tower. The tower's engines are ours. The rampart is yours." He makes a mark. "Keep the wolves off it."${S.f.b5_noted ? `

Finadd Ennic, beside him, reads the line over his shoulder, and something in his face goes careful. When the garrison's Finadd has gone on along the line, Ennic says, very quietly, "The regiment's book came up the river ahead of us. The garrison has read it." He looks along the ramparts to the royal standards at the far end. "We are as far from the royals as the fort has, Sergeant. I believe that was the point."` : ''}`,
      ch:[{t:'"The Sixth\'s rations, Finadd. The garrison\'s, while we are the garrison\'s."', check:['guile', 13], req:()=>!S.f.b5_c4_rationsTried, fx:()=>{ S.f.b5_c4_rationsTried = 1; },
            edges:id=>[id === 'sgt' && ['you know what a company is owed to the dock', 2], id === 'perrit' && ['she can read his list upside down', 1], id === 'pessa' && ['she talks back for a living', 1], id === 'thegg' && ['he is very large and very polite, and the Finadd is very tired', -1]],
            near:b54Owe(6, 'The garrison\'s rations, written against a name', w => `Yes, but the garrison's quartermaster writes the Sixth's bread against ${b54Pos(w)} line, to be settled with the battalion: ${b5Coin(6)}.`, {t:w => `Yes, but the bread comes with the garrison's quartermaster, who wants to talk about it, and ${b54Nm(w)} ${b54V(w, 'lose', 'loses')} an hour of the evening to him: no rest at the fire tonight.`, fx:w => { S.f.b5_c4_rest2 = 1; }}),
            go:'b5_c4_rations', fail:'b5_c4_rations_no'},
          {t:'"The west rampart, Finadd."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_rations:()=>({sp:'The garrison\'s Finadd', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_rations = 1; S.inv.salve = (S.inv.salve || 0) + 1; note('The garrison\'s stores: bread, and a salve from the bastion\'s chest.', 'good'); }, txt:
`The garrison's Finadd looks at the list, and at ${by({sgt:'you', _:'{who}'})}, and at the list, and writes something with the pencil from his left ear. "Bread," he says. "From the garrison's stores, while you are the garrison's. And a salve from the bastion's chest, which nobody will miss until they do." He moves on along the line. "Keep the wolves off it."`,
      ch:[{t:'Back to the rampart.', go:()=>startExplore()}]}),
    b5_c4_rations_no:()=>({sp:'The garrison\'s Finadd', scene:'b5_highfort', txt:
`"Your battalion feeds you," the garrison's Finadd says, without looking up. "When it comes." He moves on along the line, writing.`,
      ch:[{t:'Back to the rampart.', go:()=>startExplore()}]}),
    b5_c4_posting_again:()=>({sp:'The garrison\'s Finadd', scene:'b5_highfort', again:()=>`The garrison's Finadd, going along the line with his list.`, txt:
`The garrison's Finadd goes along the line with his list, from the west rampart toward the royals, making marks. "Keep the wolves off it," he says, going past.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the Finadd on the rampart ---- */
    b5_c4_ennic:()=>({sp:B5_FINADD.name, scene:'b5_highfort', fx:()=>{ S.f.b5_c4_ennic = 1; },
      again:()=>`Finadd Ennic, looking south down the road. "No battalion yet, Sergeant."`, txt:
`Finadd Ennic stands on the turf at the back of the rampart, looking south down the road the battalion will come up, with his book open and nothing new in it.

"Five days from First Reach," he says. "By good road." He turns a page back, and then forward. "They will be on the road, Sergeant. Somewhere." He shuts the book. "I find I would like very much to hand all this to somebody. And there is nobody here to hand it to but the Queen, and I do not think she wants it."

He looks north, across the gully, where the light is going. "We have a rampart. That is something to be going on with. Do what you think best with it, Sergeant, and tell me what it was. I will sign it."`,
      ch:[{t:'"Yes, Finadd."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the old hand of the garrison: the brand-pots (the trick) ---- */
    b5_c4_oldhand:()=>({sp:'An old hand of the garrison', scene:'b5_highfort', txt:
`An old hand of the garrison is sitting on the crate under the bastion tower, with a pipe and no tobacco in it and a face like a boot left out all winter. He has been on this rampart, by his own count, nineteen years, and has outlived three Finadds and a well.

"Whitefinders," he says. "Your lot's station, this. They'll put you here and forget you." He knocks the pipe on the crate. "Know what's in this?" He does not wait. "Pots. Pitch and tallow, sealed, with a rag in. Brand-pots. Light the rag, throw the pot, and it burns where it lands, a ring of it the size of a cart." He looks north. "There's wolves up there. Not wolves like you've got. The Jheck. They come with the Edur. And a wolf won't cross fire, not even one of those. Not for anybody's king."

He grins, with three teeth. "Want to see how you throw one without setting your own arse alight? It's the only trick this rampart's got."`,
      ch:[{t:'"Show us." (the Brand-Pot)', check:['wits', 16], trick:'b5_c4_brand', req:()=>!S.f.b5_c4_brandTried, fx:()=>{ S.f.b5_c4_brandTried = 1; },
            edges:id=>[id === 'ruuk' && ['he has seen his people keep wolves off a camp with fire', 1], id === 'brune' && ['the Shake fish by torchlight off the rocks', 1], id === 'tobet' && ['a throw is a throw, and he has the arm for it', 1], id === 'thegg' && ['he throws things too hard and too far', -1]],
            near:{t:()=>{ const w = b54Who(); return `Yes, but the rag catches before ${b54Nm(w)} ${b54V(w, 'have', 'has')} let go, and the pitch runs down ${b54Pos(w)} fingers: a burned hand, bruised and stinging.`; }, fx:()=>bruise(b54Who(), bruiseN())},
            go:'b5_c4_oldhand_ok', fail:'b5_c4_oldhand_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_oldhand_ok:()=>({sp:'An old hand of the garrison', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_brandOk = 1; gain('b5_c4_pitchpot'); }, txt:
`He shows ${by({sgt:'you', _:'{who}'})} with a pot that is already cracked: the rag to a coal, a count of three while it catches, underarm and high and away from everyone, and the pot comes down in the ditch beyond the crest and breaks, and burns, a ring of yellow fire on the wet ground that the whole garrison on the tower stops to watch. The tower does not clap. The old hand looks satisfied anyway.

"That," he says. "Not sorcery. Not anything. Pitch." He takes a whole pot out of the crate and puts it in ${by({sgt:'your', _:'{who}\'s'})} hands, carefully. "Keep that one. It's had its scorch already. It'll not go off in your pack." He thinks about it. "Probably."${b54If('ruuk', `\n\nRuuk is grinning. "My grandmother kept a fire all night when the wolves were close," he says. "She said they hate it because they remember what it is for."`)}`,
      ch:[{t:'"Thank you." Back along the rampart.', go:()=>startExplore()}]}),
    b5_c4_oldhand_no:()=>({sp:'An old hand of the garrison', scene:'b5_highfort', fx:()=>{ if (!(S.kit || []).includes('b5_c4_pitchpot')) gain('b5_c4_pitchpot'); }, txt:
`The first pot goes out before it lands. The second goes too far and lands in the gully's grass a long way out, and burns there on its own, and the garrison on the tower laughs, kindly enough.

"Takes a year," the old hand says. He puts a whole pot in ${by({sgt:'your', _:'{who}\'s'})} hands anyway: black glaze, a tarred rag, a scorch down the side. "Keep that one. When the wolves come, you'll get it right first time. Everybody does." He relights the pipe that has nothing in it. "Or they don't, and then it doesn't matter."`,
      ch:[{t:'Back along the rampart.', go:()=>startExplore()}]}),
    b5_c4_oldhand_again:()=>({sp:'An old hand of the garrison', scene:'b5_highfort', again:()=>`The old hand on his crate, with his empty pipe. "Nineteen years."`, txt:
`The old hand is on his crate under the tower with his empty pipe, looking north. "Nineteen years on this rampart," he says. "First time I've seen their fires from it." He sucks the pipe. "Moroch Nevath's up on the royals' rampart, see him? The Prince's Finadd. Walking up and down." He spits. "Only one up there who looks like he's counted them."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_pots:()=>({sp:'Under the bastion tower', scene:'b5_highfort', txt:
`The garrison's crate under the bastion tower: black-glazed clay pots packed in straw, each with a tarred rag for a wick, and a bucket of sand beside it, and a tin of coals with a lid on. On the crate, in a slow hand, someone has chalked *NOT FOR THE QUEEN*.${S.f.b5_c4_brandTried ? '' : `\n\nThe old hand sitting on it watches you read that, and does not explain.`}`,
      ch:[{t:'The old hand on the crate.', req:()=>b54Ph() <= 2, go:()=>talk(S.f.b5_c4_brandTried ? 'b5_c4_oldhand_again' : 'b5_c4_oldhand')},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the fort's cadre-master: he does not link a junior of a battalion that is not there (the brief's call, binding) ---- */
    b5_c4_cadre:()=>({sp:'The fort\'s cadre-master', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_cadre = 1; S.f.b5_c4_unlinked = 1; }, txt:
`An older mage in grey piping comes along the line at dusk with two juniors behind him and a list, the way the garrison's Finadd did. He is going east, toward the stone fort on the far rampart, where the Grass Jackets' sorcerers are. Four of the fort's mages will stand there tomorrow, he is saying to the juniors, and four with the Queen, and three with the Prince, and every one of them on one thread.

${b5In('perrit') ? `Perrit steps out to meet him, very straight, and gives him her name and her school and the Sixth's, in that order.

He looks at the white fingertip on the nearest shield. "Whitefinders," he says. "Battalion cadre." He checks the list, which does not have her on it. "Your cadre-master is with your battalion, girl, and your battalion is not here. I do not link a junior I have not tested to eleven who have." He is not unkind about it. He is not anything about it. "Stand your rampart. If the Holds open tomorrow, keep your head down and your hands to yourself." He goes on east.

Perrit stands where he left her. "Eleven," she says, after a while. "On one thread." She does the sum out loud, under her breath, and does not like the end of it, and does not say why.` : `He looks along the Sixth's rampart for a mage, and finds none, and makes a mark on his list. "No cadre," he says to the juniors. "Good. One less to link." He goes on east.`}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- a Grass Jacket, back from the forward ramparts for water ---- */
    b5_c4_grass:()=>({sp:'A Grass Jacket', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_grass = 1; },
      again:()=>`The Grass Jacket, with the water-skins. "Forward, us."`, txt:
`A Grass Jacket has come back from the forward ramparts with six water-skins over his shoulders to fill at the fort's well, and has stopped at the Sixth's fire because it is the nearest. He has a strip of faded green cloth tied at the crest of his helm, and the brigade's way of standing, which is as if the ground were slightly in its debt.

"Forward, us," he says, with his chin at the gully. "On the gully ramparts. Our sorcerers are in the stone fort, the little one on the end." He fills a skin from the Sixth's barrel without asking, which the Sixth lets him. "They say the Queen meant to go up the pass and hit them first. They came down it first instead." He shrugs. "So now it's here, and it's us in front."`,
      ch:[{t:'"What\'s out there?" Trade him the barrel for it.', check:['guile', 12], req:()=>!S.f.b5_c4_grassTried, fx:()=>{ S.f.b5_c4_grassTried = 1; },
            edges:id=>[id === 'tobet' && ['he knows what a soldier in front wants', 1], id === 'pessa' && ['she talks back for a living', 1], id === 'ruuk' && ['he has seen the gully today, and the man knows it', 1], id === 'thegg' && ['the Grass Jacket keeps looking up at him', -1]],
            near:{t:()=>{ const w = b54Who(); return `Yes, but he takes the Sixth's barrel as well as the water, and ${b54Nm(w)} ${b54V(w, 'spend', 'spends')} the last of the evening carrying another up from the well: tired, and no rest at the fire tonight.`; }, fx:()=>{ S.f.b5_c4_rest2 = 1; }},
            go:'b5_c4_grass_ok', fail:'b5_c4_grass_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_grass_ok:()=>({sp:'A Grass Jacket', scene:'b5_c4_field', fx:()=>{ S.f.b5_c4_grassWord = 1; }, txt:
`"Wraiths first," the Grass Jacket says, low, so the fire does not hear it. "That's what the Reach said, and the pass. Shadows with no feet, in front of everything. Then the big ones, the armoured ones. They go out like a lamp and come on again in your line." He hoists the skins. "And wolves. Wolves at the back. For after."

He looks at the Sixth's rampart, the tower, the crate under it. "You're at the end. That's good. The end's furthest from where it'll be worst." He goes back out toward the gully with the water, and does not say where that is.`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b5_c4_grass_no:()=>({sp:'A Grass Jacket', scene:'b5_highfort', txt:
`"You'll see," the Grass Jacket says, and hoists the skins, and goes back out toward the gully. "Everybody will."`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* ---- a soldier off the coast road: Trate's fall, as survivors' talk only (headline; never the lighthouse, never Rhulad) ---- */
    b5_c4_straggler:()=>({sp:'A soldier off the coast road', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_trate = 1; },
      again:()=>`The soldier off the coast road, by the wall, eating.`, txt:
`A soldier in a filthy blue-grey cloak with a Trate Legion flash on the sleeve is sitting against the inner wall eating garrison bread as if somebody might take it off him. He came in on the coast road this afternoon with nine others, the garrison says, and nothing else.

"Trate," he says, when you crouch down by him. "Gone. From the sea, in a night." He chews. "Their ships came in after dark. Shadows went up the walls ahead of them, the way smoke does. By morning they had the gates." He looks at the bread. "They didn't kill the townsfolk. Just us. As if they had all the time there was." He swallows. "I was on the north wall. I don't know why I'm here and the rest aren't."${S.f.b5_c2_key === 'dead' ? `\n\nHe looks at the white fingertip on your shield. "Whitefinders," he says. "You were the lot carried the dead out of the hulks, after the wave." He nods, once. "Somebody will have to do that again, now."` : ''}${b54If('brune', `\n\nBrune has gone still. She was on the strand at Trate this summer. She does not ask him anything.`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the firing step: the field, by phase ---- */
    b5_c4_view:()=>{ const ph = b54Ph();
      return {sp:'The firing step', scene:ph >= 3 && !S.f.b5_c4_wraithsDone ? 'b5_c4_lightning' : 'b5_c4_field', fx:()=>{ S.f.b5_c4_view = 1; if (ph === 2) S.f.b5_c4_moroch = 1; },
        again:()=> ph === 2 ? 'The firing step, and the field: the gully, the ramparts, the royal standards at the far end.' : 'The firing step, and the field.', txt: ph === 2 ?
`From the firing step under the crest you can see the whole line at once, west to east.

The pasture runs north from the fort a thousand paces to Dry Gully, an old drainage course gone to grass, and along the gully three ramparts of earth, like this one, the Grass Jackets on them in green. On the easternmost and largest a small fort of stone stands up out of the earth. Behind it, nearer the fort, on a rampart of their own, the royal standards, and engines: the Dresh ballistae, long-armed, sighted north.

On the royals' rampart, small with distance, officers in bright cloaks are standing about in the evening light as though at a feast. One of them is not. He walks the rampart end to end, and back, and stops at the north edge and looks at the gully every time, and walks again.

Past the gully the grass goes on to the foot of the mountains, and on it, very far off, a dark line that is not a hedge.${b54Say({tobet:`\n\nTobet has his eyes narrowed at the dark line. "Edur," he says. "And something in front of them that doesn't stand still." He counts, and stops counting. "A lot, Sergeant."`, ruuk:`\n\nRuuk looks at the dark line, and at the mountains above it. "The birds are gone off the pass," he says. "All of them."`, _:''})}` : !S.f.b5_c4_wraithsDone ?
`From the firing step the whole field is moving. Sorcery has gone out from the royals' end of the line and come back along it; somewhere far east a column of white lightning stands on the field, and things in front of it are not standing any more. Shapes of dark come across the pasture ahead of the Edur, fast, and some of them are coming this way.` :
`From the firing step the field is a thing nobody on the rampart wants to look at for long. The far end of the line, by the royals, is smoke. The gully ramparts are empty. The Edur are across the pasture in their thousands, unhurried, and the shapes in front of them have stopped moving.`,
        ch:[{t:'Not now.', go:()=>startExplore()}]}; },

    /* ---- the gate into the fort ---- */
    b5_c4_gate:()=>({sp:'The fort\'s gate', scene:'b5_highfort', again:()=>`The gate in the fort's inner wall.`, txt: b54Ph() >= 3 ?
`The gate in the inner wall stands half open, with garrison men on it.` :
`The gate in the fort's inner wall, with two of the garrison on it, who look at the white fingertips and let nobody of the Sixth through. "The fort's full," one of them says. "Queen's people." He looks at the rampart. "You're out there. That's where you are."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the clerk and the pay desk (nothing to buy at High Fort; paying still works) ---- */
    b5_c4_clerk:()=>({sp:'The company clerk', scene:'b5_highfort', html:debtHTML('The Sixth Company · High Fort'), fx:()=>{ S.f.b5_c4_clerk = 1; },
      again:()=>`The clerk on his crate by the inner wall, with the case on his knees.`, txt:
`The company clerk has found a crate against the fort's inner wall, as far from the gully as the rampart allows, and sits on it with the oilskin case on his knees and both hands flat on the lid.

"There is nothing to buy at High Fort," he says. "The garrison's quartermaster has nothing to sell. The Queen's people have bought it." He looks surprised. "But the paybooks are the paybooks. A dock paid down is a dock paid down, here as in Letheras." He seems to find this a comfort. "I can still write it."${b5Debt('sgt') > b5DebtStart('sgt') ? `\n\nHe runs his pen down your own line, and it stops further down than it started.` : ''}`,
      ch:[{t:'The pay desk.', go:'b5_c4_pay'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_pay:()=>({sp:'The clerk\'s crate · the pay desk', scene:'b5_highfort', html:debtHTML('The Sixth Company · High Fort'), again:()=>`The pay desk. The clerk's pen is wet, and the squad has ${b5Coin(S.silver || 0)} in hand.`, txt:
`The clerk wets his pen, with a glance north. "Anything the squad pays down out of its own docks, I write as paid, today," he says. "The holders will get it at the quarter, from the battalion's paymaster." He stops. "When the battalion comes." He writes the date at the top of a fresh page anyway, neatly. "Even here," he says, with some surprise. "It still works, even here."`,
      ch:b5PayChoices('b5_c4_fire')}),

    /* the tile-woman: she reads when Perrit doesn't */
    b5_c4_tilewoman:()=>({sp:'The tile-woman', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_tw = 1; }, txt:
`The tile-woman has come up from the followers' carts behind the fort and sits on the turf at the back of the rampart with her bag of oiled cloth in her lap, looking north at the dark line on the grass. She spits to one side when you come over.

${b5In('perrit') ? `"Your mage reads tonight," she says. "Good. I'd not want to." She looks north again. "There's tiles I'd not want to lay with that out there." She does not say which.` : `"No mage," she says. "Then it's bone, and it's a dock, and a helm to throw them in." She shakes the bag, and it clicks. "Sit, if you want it. Tonight they'll talk."`}`,
      ch:[Object.assign(b5TileChoice(4), {req:()=>!b5In('perrit') && !S.f.b5_c4_drawn && !S.f.b5_c4_noCard}),
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the rampart's fire: a rest, the pay desk, the squad, the way on (no game in this chapter; keep the id) ---- */
    b5_c4_fire:()=>{ const ph = b54Ph();
      return {sp:'The west rampart\'s fire', scene:'b5_highfort', again:()=> ph >= 3 ? 'The rampart\'s fire, kicked out. The crest is in front of you.' : S.f.b5_c4_posted ? 'The rampart\'s fire, and past the crest the fires of an army.' : 'The rampart\'s fire-pit, under the bastion tower.', txt:
`${ph >= 3 ? `The fire on the west rampart is kicked out and the turf round it trampled. The garrison is on the tower with its engines, and every soldier of the Sixth is at the crest or going to it.` : `The fire-pit on the west rampart, turf-banked, with the bastion tower black over it. The Sixth has made a fire in it out of a garrison ration of wood that the garrison does not know about. Out past the crest, past the gully, a long way off on the dark grass, the fires of an army, more of them every time you look.`}${b54If('brune', () => ph < 3 ? `\n\nBrune sits at the edge of the firelight with her back to the crest, facing south, toward the sea she cannot see.` : '')}${b54If('ruuk', () => ph < 3 ? `\n\nRuuk sits on the crest itself, which nobody else will, and watches the gully.` : '')}`,
        ch:[b5TileChoice(4),
            {t:'Sit an hour. Let the squad rest.', req:()=>ph < 3 && !S.f['b5_c4_rest' + ph], fx:()=>{ S.f['b5_c4_rest' + ph] = 1; b5Rest('The squad sits an hour by the fire on the west rampart, with an army\'s fires out past the gully. Wounds close, mostly.'); }, go:'b5_c4_fire_rest'},
            {t:'The pay desk, at the clerk\'s crate.', go:'b5_c4_pay'},
            {t:'Talk with the squad.', go:'b5_c4_fire_talk'},
            {t:'Night. The garrison wants Dry Gully walked.', req:()=>ph === 2 && !!S.f.b5_c4_posted && !S.f.b5_c4_patrol && !S.f.b5_c4_night, onward:true, go:'b5_c4_patrol'},
            {t:'Sleep, and wait for the dawn.', req:()=>ph === 2 && !!S.f.b5_c4_posted && !S.f.b5_c4_night, onward:true, go:'b5_c4_night'},
            {t:'Dawn.', req:()=>ph === 2 && !!S.f.b5_c4_night, onward:true, go:'b5_c4_dawn'},
            {t:'To the crest.', req:()=>ph >= 3 && !S.f.b5_c4_wraithsDone, onward:true, go:'b5_c4_crest'},
            {t:'On, along the rampart.', req:()=>ph >= 3 && !!S.f.b5_c4_wraithsDone, onward:true, go:()=>talk(b54Next())},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c4_fire_rest:()=>({sp:'The west rampart\'s fire', scene:'b5_highfort', txt:
`An hour on dry turf, with a wall at your back and earth under you, which is more than the Sixth has had since the spring.

${b54Say({ammet:`Ammet goes round the squad and looks at feet, and at the stream's bruises, and says "Hold still" to anyone who moves. She lays out her needles and gut and splints on a cloth, in rows, and counts them, and does not drink the garrison's spirit when it comes round. Not tonight.`, thegg:`Thegg lies on his back on the turf, which does not creak, and seems pleased about it, and goes to sleep at once.`, _:'One of them sleeps. The others watch the fires past the gully.'})}${b54If('tobet', `\n\nTobet counts his arrows, then his debts, then his arrows, and cuts a notch in the tally-stick, and puts it away without saying what it was for.`)}${b54If('perrit', `\n\nPerrit sits with her back against the bastion tower, with nothing behind her but stone and earth, and closes her eyes.`)}`,
      ch:[{t:'Back to the fire.', go:'b5_c4_fire'}]}),
    b5_c4_fire_talk:()=>{ const ph = b54Ph(), ln = [];
      if (b5In('tobet')) ln.push(ph >= 3 ? `Tobet is stringing his bow, and stringing it again. "From back here," he says, flat, "I'll see all of it." He tests the string. "I don't want to see all of it, Sergeant."` : `Tobet is looking at the fires past the gully. "My grandfather's plough," he says, "is somewhere in Lether. Nine hundred docks of it. I've never seen it." He counts the fires, and stops. "If they come through, does it still count? The plough?" He doesn't seem to want an answer.`);
      if (b5In('thegg')) ln.push(ph >= 3 ? `Thegg has his shield on his arm and his back to the crest. "Behind me," he says, to the squad, to the rampart, to nobody. Then, low, in his mother's tongue, something longer, to the dead.` : `Thegg talks low in his mother's tongue to his mother's people's dead, at the edge of the firelight. When he sees you listening he stops. "There are not many of them here," he says. "This was never their country." He considers the dark line on the grass. "There will be more tomorrow. Not theirs either."`);
      if (b5In('perrit')) ln.push(ph >= 3 ? (S.f.b5_c4_mages ? (b54Warned() ? `Perrit is sitting very straight with her hands in her lap. "Eleven," she says. "And not me, because I was nobody's." She looks at her hands. "I wrote it down, Sergeant, the night the runner went. That the Sixth was right. I wrote it in my own book." Her mouth goes thin. "I am going to go on being right. Somebody has to."` : `Perrit is sitting very straight with her hands in her lap. "I knew two of them," she says. "From the school. One of them corrected my sums in my first year, in red, and was wrong." She looks at her hands. "I never told her she was wrong. I was going to." She does not say anything more, and her hands stay where they are.`) : `Perrit has her fingers on the pouch at her hip. "The Holds are very full this morning," she says. "Something is in them that is not ours."`) : (b54Warned() ? `Perrit has her book out, the small one she keeps for herself, and is reading a page of it by the firelight: the night of the green fire, the night the runner went. "*The Sixth was right*," she reads, very quietly, to nobody. She closes it. "I wrote that, Sergeant. I am keeping it."` : `Perrit is sitting where she can see east along the line, toward the stone fort. "Eleven on one thread," she says. "I have never seen it done with more than four." She does the sum out loud, under her breath, and stops before the end.`));
      if (b5In('ammet')) ln.push(ph >= 3 ? `Ammet has her roll of tools open on the turf behind the crest, and her linen, and a pot of water, and the herbs in a row. "Bring them to me," she says. "Bring me all of them. Don't bring me the ones I can't help. I'll tell you which." She is not drinking.` : `Ammet is laying her needles out on a cloth, in a row. "The garrison's surgeon has four of them," she says. "Four needles, for a fort." She does not seem to want sympathy. "I gave him two of mine. He wanted to pay." She snorts. "Pay. Here."`);
      if (b5In('ruuk')) ln.push(ph >= 3 ? `Ruuk is looking west, at the wood, not north. "The trees are close," he says. "That way. Very close." He is not grinning.` : `Ruuk is sitting on the crest with his spears across his knees, watching the gully. "No birds on the pass," he says. "No birds on the gully either. There were birds when we came." He thinks about it. "They know first."${S.f.b5_ruukCarried && b5In('thegg') ? ` He looks over his shoulder at Thegg. "He carried me," he says, to you, as if it still surprised him. "Nobody asked him."` : ''}`);
      if (b5In('brune')) ln.push(ph >= 3 ? `Brune has her fish-spear upright beside her. "The Shore takes everything back," she says. "I would just like it to wait." She looks north at the field. "I do not think it is going to wait."` : `Brune is facing south, away from the fires. "It is a long way to the sea from here," she says. "The longest I have been." She thinks about it. "The Shore is patient. It will still be there."`);
      if (b5In('pessa')) ln.push(`Pessa sits with her boathook upright beside her, looking at the gully. "Dry," she says. "A canal with nothing in it." She does not seem to think much of it.`);
      return {sp:'The west rampart\'s fire', scene:'b5_highfort', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b5_c4_fire'}]}; },

    /* ---- the night patrol into Dry Gully (optional) ---- */
    b5_c4_patrol:()=>({sp:'The garrison\'s Finadd', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_patrol = 1; },
      again:()=>`The night's order: Dry Gully, from the west end, and back before the moon.`, txt:
`The garrison's Finadd comes along the line at dark with his list and a lantern. "The Grass Jackets have the gully ramparts," he says. "Nobody has the gully. It runs right across the field from the hills, and anything that wants to can walk down it to the end of the line." He looks at you. "This end of the line." He makes a mark. "Walk it from the west end, Sergeant, and back before the moon. If there's anything in it, I want to know what. The garrison pays its patrols." He looks pained. "Eight docks. The rate has not changed in nineteen years."`,
      ch:[{t:'Down the sally-steps, into the gully.', onward:true, go:'b5_c4_sally'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_sally:()=>({sp:'The sally-steps', scene:'b5_highfort', txt: !S.f.b5_c4_patrol ?
`Steps cut in the back of the crest, going down the far side into the ditch and the pasture. The garrison does not want anybody on them without an order.` : S.f.b5_c4_gullyDone ?
`The sally-steps, down the far side of the crest into the dark. The gully is walked.` :
`Steps cut in the back of the crest, going down the far side into the ditch, and from the ditch a path through the grass toward the gully, a thousand paces off in the dark.`,
      ch:[{t:'Down, and out to the gully.', req:()=>!!S.f.b5_c4_patrol && !S.f.b5_c4_gullyDone && b54Ph() === 2, onward:true, go:()=>{ startExplore('b5_c4_gully'); talk('b5_c4_gully_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_gully_arrive:()=>({sp:'Dry Gully · night', scene:'b5_c4_field', txt:
`Dry Gully at night: an old drainage course, a bed of stones between banks of earth a man's height, gone to dry grass and brush. It runs east across the field toward the hills, under the Grass Jackets' ramparts, and the ramparts are dark shapes above it with a fire here and there.

There is no wind down here. There is no sound but the squad's boots on the stones, and then not even that, because the squad has stopped making it.${b54If('tobet', `\n\n"Tracks," Tobet breathes, crouched on the bed. "Fresh. Going east. Barefoot, some of them." He looks up. "Big feet."`)}${b54If('ruuk', `\n\nRuuk is a step ahead, and then two, and then gone into the dark, and back again. "This way," he whispers. "They went this way. Not long."`)}`,
      ch:[{t:'East, along the bed.', go:()=>startExplore()}]}),
    b5_c4_tracks:()=>({sp:'Dry Gully · night', scene:'b5_c4_field', txt: S.f.b5_c4_gullyDone ?
`The gully bed where the Edur were. Nothing here now but their tracks, and the Sixth's, and the stones.` :
`At the east end of the stretch, where the bank comes down and the gully bends, the tracks stop going anywhere. Four of them are standing in the bend, tall, in dark leather, looking up at the nearest Grass Jacket rampart the way a buyer looks at a wall he means to have taken down.

One of them turns his head.`,
      ch:[{t:'"Whitefinders." Out of the dark at them.', req:()=>!S.f.b5_c4_gullyDone, go:()=>startBattle('b5_c4_gully', {})},
          {t:'Through the brush along the bank, low, and in behind them.', check:['wits', 14], req:()=>!S.f.b5_c4_gullyDone,
            edges:id=>[id === 'ruuk' && ['he reads ground, and this is ground', 2], id === 'tobet' && ['he is where the blow is not', 1], id === 'brune' && ['she has waited in the dark for fish all her life', 1], id === 'thegg' && ['the brush was not made for Thegg', -2]],
            near:b54Owe(8, 'A garrison lantern, broken in the gully', w => `Yes, but the garrison's lantern on ${b54Pos(w)} belt cracks against a stone, and the Finadd will want it paid for: ${b5Coin(8)} against ${b54Pos(w)} line.`, {t:w => `Yes, but ${b54Nm(w)} ${b54V(w, 'go', 'goes')} the last of the way on hands and knees through thorn: scratched and bruised.`, fx:w => bruise(w, bruiseN())}),
            go:()=>startBattle('b5_c4_gully', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c4_tracks_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_tracks_seen:()=>({sp:'Dry Gully · night', scene:'b5_c4_field', txt:
`A stone turns under a boot. All four of them are facing the Sixth before it has stopped rolling, and the older one has his sword out, and is smiling.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c4_gully', {surprise:'e'})}]}),
    b5_c4_gully_after:()=>({sp:'Dry Gully · night', scene:'b5_c4_field', fx:()=>{ S.f.b5_c4_gullyDone = 1; }, txt:
`The older one goes back up the gully into the dark, fast, with one of the young ones over his shoulder, and the others go after him. They do not run. They go, the way a tide goes out.

The squad stands in the bend a while, breathing. Up on the nearest rampart a Grass Jacket leans over with a torch and asks who is down there, and is told, and says something about Whitefinders that the squad decides not to hear.${b54If('ammet', `\n\nAmmet is already going round the squad with her linen. "Hold still," she says. "Hold still. Here."`)}`,
      ch:[{t:'Back along the gully.', go:()=>startExplore()}]}),
    b5_c4_gully_back:()=>({sp:'Dry Gully · the bank', scene:'b5_c4_field', txt: S.f.b5_c4_gullyDone ?
`Up the bank, through the grass, to the sally-steps, and the Finadd's lantern on the crest, waiting.` :
`The bank, and the path back through the grass to the sally-steps. The gully is not walked yet. The Finadd wanted to know what was in it.`,
      ch:[{t:'Up, and back to the rampart.', onward:true, go:()=>{ startExplore('b5_c4_rampart'); talk(S.f.b5_c4_gullyDone ? 'b5_c4_reported' : 'b5_c4_fire'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_reported:()=>({sp:'The garrison\'s Finadd', scene:'b5_highfort', fx:()=>{ if (!S.f.b5_c4_paid) { S.f.b5_c4_paid = 1; b54Docks(8, 'the garrison\'s rate for a patrol, unchanged in nineteen years'); } }, txt:
`The garrison's Finadd hears it all on the crest by lantern-light, and writes it down: four, in the bend, looking at the rampart. Three young and one old. Gone east up the gully.

"Then they know the gully," he says. "Good. Now so do I." He counts eight docks into your hand from a purse that has been counted many times. "The rate," he says, and moves on along the line, writing, to tell somebody further east who will not listen.`,
      ch:[{t:'Back to the fire.', go:'b5_c4_fire'}]}),

    /* ---- the night before: Ennic, and the dark ---- */
    b5_c4_night:()=>({sp:'The west rampart · night', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_night = 1; }, txt:
`The fire burns down. The garrison changes the watch on the tower with a word to the Errant, the same word every time. Out past the gully the Edur fires do not burn down at all.

Finadd Ennic comes and sits by the coals for a while, with his book closed on his knee. "No battalion," he says. "No word of it." He looks south down the road, which is dark. "We will do it without them, then. Whatever it is." He seems surprised to hear himself say it. He stays a while longer, and then goes to his blanket, and does not sleep, by the sound of it.${b54Say({thegg:`\n\nThegg sits up all night at the crest with his shield on his knees, talking low to the dead, and some of what he says sounds like a list.`, tobet:`\n\nTobet sits up at the crest with his bow across his knees, counting fires.`, _:''})}

You touch the white fingertip on your shield's boss, for the Errant, and lie down on the turf with your boots on.`,
      ch:[{t:'Dawn.', onward:true, go:'b5_c4_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 3, the battle: headline from the west rampart ---- */
    b5_c4_dawn:()=>({sp:'High Fort · dawn', scene:'b5_c4_lightning', fx:()=>{ S.f.b5_c4_ph = 3; S.f.b5_c4_mages = 1; }, txt:
`It begins at the royals' end of the line, far east, a long way from the Sixth.

The sorcery goes out first: the fort's mages and the Queen's and the Prince's, on one thread, and the air over the field goes tight, and white light walks out across the grass toward the Edur. And then it comes back. Something on the far side takes hold of it and turns it along the links, back into the line, and the light goes out of the ramparts one place after another like lamps going out down a street.

Every one of the eleven dies in the time it takes to say so. The word comes down the line afterward, but the Sixth knows before the word does.${b5In('perrit') ? `

Perrit goes down on one knee on the turf as if somebody had pushed her. "Oh," she says. She has both hands flat on the ground. "Oh. It went through the Hold like a door slammed in a long corridor. All of them at once." Her face is grey. She is not linked. She was nobody's, and so she is alive, and she knows it, and she gets up.${b54Warned() ? '' : ` "I knew two of them," she says, very precisely. "From the school." That is all, for now.`}` : ''}

Far east, where the stone fort is, a column of white lightning stands up on the field and stays there, and the shapes in front of it stop. Hundreds. Then the shapes of dark come on again across the pasture ahead of the Edur, faster than anything should, and behind them something huge and armoured goes out like a lamp, and is somewhere else, among the Grass Jackets, and the garrison's ballistae on the bastions start their long slow work.

And some of the shapes are coming this way. Low. Toward the end of the line.`,
      ch:[{t:'To the crest.', onward:true, go:'b5_c4_crest'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_crest:()=>({sp:'The west rampart · the crest', scene:'b5_c4_lightning', txt:
`The Sixth is at the crest, shields locked, with two of the garrison beside it on the right where the tower comes down. Out on the pasture the wraiths come on across the grass toward the west rampart in a long low rush, ahead of everything, the way the Grass Jacket said they would.${S.f.b5_c4_brandOk ? `\n\nThe old hand's crate is open at the foot of the tower, and the coals are lit.` : ''}`,
      ch:[{t:'"Whitefinders. Shields."', go:()=>startBattle('b5_c4_wraiths', {})},
          {t:'Brand-pots along the crest before they reach it.', check:['wits', 13], req:()=>!S.f.b5_c4_crestTried, fx:()=>{ S.f.b5_c4_crestTried = 1; },
            edges:id=>[id === 'tobet' && ['a throw is a throw, and he sees them coming', 2], id === 'ruuk' && ['his grandmother kept the wolves off with fire', 1], id === 'thegg' && ['he throws things too hard and too far', -1]],
            near:{t:()=>{ const w = b54Who(); return `Yes, but the last pot breaks too close, and ${b54Nm(w)} ${b54V(w, 'come', 'comes')} back from the crest with ${b54Pos(w)} sleeve alight and smothered in the sand-bucket: burned, bruised and smoking.`; }, fx:()=>bruise(b54Who(), bruiseN())},
            go:()=>startBattle('b5_c4_wraiths', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c4_crest_late'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_crest_late:()=>({sp:'The west rampart · the crest', scene:'b5_c4_lightning', txt:
`The first pot will not catch. By the time the second does, they are on the crest.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c4_wraiths', {surprise:'e'})}]}),
    b5_c4_wraiths_after:()=>({sp:'The west rampart', scene:'b5_c4_lightning', fx:()=>{ S.f.b5_c4_wraithsDone = 1; }, txt:
`The west rampart is the Sixth's still. The garrison's two are on their feet, or one of them is, and the other is ${b5In('ammet') ? 'on the turf behind the crest with Ammet\'s hands on him' : 'being carried to the garrison\'s surgeon, who has four needles'}. The tower's engines are still working.

Then the charge. Far east, at the royals' end, the Letherii go forward across the pasture to meet the Edur, and something takes the charge apart. There is no other way to say it from here. Sorcery goes through it, and there is no charge any more. Later the count will be thousands.

And then the line in front breaks. The Grass Jackets come back off the gully ramparts, running, past the end of the line and over the west rampart and through the Sixth, green cloth at their crests, throwing things away as they come. One of them drops his helm at your feet and does not stop for it. Behind them the wood is very close, to the west. Behind them the Edur are coming on across the grass, unhurried.`,
      ch:[{t:'The helm, and the rampart.', onward:true, fx:()=>{ if (!S.f.b5_c4_helmGot) { S.f.b5_c4_helmGot = 1; gain('b5_c4_helm'); } }, go:'b5_c4_key'},
          {t:'Not now.', fx:()=>{ if (!S.f.b5_c4_helmGot) { S.f.b5_c4_helmGot = 1; gain('b5_c4_helm'); } }, go:()=>startExplore()}]}),

    /* the key: hold the west rampart to the surrender, or run with the Grass Jackets west into the wood */
    b5_c4_key:()=>({sp:'The west rampart · the break', scene:'b5_c4_lightning', again:()=>`The rampart, and the Grass Jackets going past it, and the wood to the west.`, txt: b54Key() ?
`It is decided. ${b54Key() === 'hold' ? 'The Sixth holds the west rampart.' : 'The Sixth goes west.'}` :
`The Grass Jackets go past, and keep going, west, toward the wood: the end of the line is the nearest way out, and the Sixth is standing in it.

The garrison on the tower is not going anywhere. Its Finadd is on the tower stair with his list, and he has stopped writing. Finadd Ennic is beside you with his book shut and a sword in his hand, which you have never seen before. "Sergeant," he says, and nothing else, and waits for you to put something in front of him.${b5In('ruuk') ? `\n\nRuuk is at your elbow. "The trees," he says, very low. "There. Very close. In the trees I can take you anywhere." He is not grinning.` : ''}${b54If('thegg', `\n\nThegg has not moved. He stands at the crest with his shield on his arm, and looks at the Grass Jackets going past, and at you. "I stand behind," he says. "I do not run." Then, quieter: "I ran, once."`)}${b54If('ammet', `\n\nAmmet is on her knees behind the crest with a garrison man's leg across her lap and her hands red to the wrist. She does not look up. "I have four here who cannot walk," she says.`)}${b54If('brune', `\n\nBrune looks west at the trees, and then at the tower. "The Shore takes everything back," she says. "Either way."`)}`,
      ch:[{t:'"The Sixth holds the west rampart. We stay, and we bring our wounded in."', req:()=>!b54Key(), fx:()=>{ S.f.b5_c4_key = 'hold'; b54L('thegg', 1); b54L('ammet', 1); b54L('ruuk', -1); }, go:'b5_c4_hold'},
          {t:'"West, with them. Into the trees. Now, while we have our weapons."', req:()=>!b54Key(), fx:()=>{ S.f.b5_c4_key = 'run'; b54L('ruuk', 2); b54L('tobet', 1); b54L('thegg', -1); }, go:'b5_c4_run'},
          {t:'"Not yet."', req:()=>!b54Key(), go:()=>startExplore()},
          {t:'Not now.', req:()=>!!b54Key(), go:()=>startExplore()}]}),

    /* 'hold': the demon inside the rampart, the back slope, the horns; the wounded carried in; the word; the pile */
    b5_c4_hold:()=>({sp:'The west rampart', scene:'b5_c4_lightning', txt:
`"Holding," Finadd Ennic says, as if signing it, and goes to the crest beside you.${b5In('ruuk') ? `\n\nRuuk looks west at the trees once, and comes to the crest with his spears. "We could have been in the trees," he says, to nobody. Then he finds his place.` : ''}${b54If('thegg', `\n\nThegg nods, once, and sets his shield.`)}

All along the line, the bound things have been doing what the Grass Jacket said they would: going out like lamps and coming on again inside the Letherii ramparts, among the soldiers. Now one does it here. There is a smell like a struck forge, and the air inside the west rampart folds, and something is standing among the Sixth's own packs that was not there.`,
      ch:[{t:'"Shields. On it."', go:()=>startBattle('b5_c4_demon', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_demon_after:()=>({sp:'The west rampart · the horns', scene:'b5_c4_lightning', fx:()=>{ S.f.b5_c4_demonDone = 1; if (!S.f.b5_c4_toothGot) { S.f.b5_c4_toothGot = 1; gain('b5_c4_wolftooth'); } }, txt:
`The horns sound. Not the Edur's: the fort's own, from the gate-tower, long, again and again, and the Edur in front of the west rampart stop where they are, and lower what they carry, and stand.

The demon on the back slope is simply not there any more, and does not come back.

Out on the field, past the ramparts, the Jheck's wolves are going among the wounded. The rampart does not watch it for long.

At the rampart's foot, where the wraiths came over, there is a wolf's tooth in the trampled turf, too long, on a broken thong, as if something wore it. One of the squad picks it up. Not one of them asks why it is too big for a wolf.`,
      ch:[{t:'"Our wounded. In through the gate. Now."', onward:true, go:'b5_c4_wounded'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_wounded:()=>({sp:'The fort\'s gate', scene:'b5_highfort', again:()=>`The gate, and the wounded on the turf in front of it.`, txt: S.f.b5_c4_wounded ?
`The Sixth's wounded, and the garrison's two, and three Grass Jackets who did not run fast enough, are inside the gate on the cobbles, out of the wolves' reach.` :
`The gate in the inner wall stands half open now, with nobody on it. The Sixth's wounded are on the turf behind the crest, and the garrison's, and three Grass Jackets who did not run fast enough${b5In('ammet') ? ', with Ammet among them' : ''}. The wolves are on the field. They will be at the ramparts soon.`,
      ch:[{t:'Carry them in, all of them, before the wolves come.', check:['might', 13], req:()=>!S.f.b5_c4_wounded,
            edges:id=>[id === 'thegg' && ['he carries two at a time, and does not notice', 3], id === 'ammet' && ['she knows which ones to lift how', 2], id === 'brune' && ['she has hauled nets heavier than a man', 1], id === 'perrit' && ['she is small, and the men are not', -1]],
            near:{t:()=>{ const w = b54Who(); return `Yes, but the last of them is a big man in scale, and ${b54Nm(w)} ${b54V(w, 'carry', 'carries')} him the whole way with ${b54Pos(w)} back screaming about it: wrenched, and bruised.`; }, fx:()=>bruise(b54Who(), bruiseN())},
            go:'b5_c4_wounded_in', fail:'b5_c4_wounded_slow'},
          {t:'On.', req:()=>!!S.f.b5_c4_wounded, onward:true, go:'b5_c4_word'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_wounded_in:()=>({sp:'Inside the gate', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_wounded = 1; }, txt:
`The Sixth carries them in: its own, and the garrison's, and the Grass Jackets', on shields and shoulders and a door off the gate-house, through the gate and onto the cobbles inside, where the wolves cannot come. ${b54Say({ammet:'Ammet goes in with the first of them and does not come out again. "Hold still," you can hear her saying, all afternoon, to one after another. "Hold still. Here."', thegg:'Thegg carries two at a time, one on each shoulder, and goes back for more, and goes back again.', _:'It takes the rest of the afternoon.'})}

Not one of them is left on the turf when the wolves reach the west rampart. The wolves look at the gate, and at the Sixth in front of it, and go on along the line.`,
      ch:[{t:'On.', onward:true, go:'b5_c4_word'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_wounded_slow:()=>({sp:'Inside the gate', scene:'b5_highfort', fx:()=>{ S.f.b5_c4_wounded = 1; S.inv.salve = Math.max(0, (S.inv.salve || 0) - 1); }, txt:
`It is slow. The men are heavy and the gate is narrow and half of them scream when they are lifted, and the squad's salves go on the worst of them on the turf before they can be moved at all. But the Sixth carries them in, every one, onto the cobbles inside the gate, the last of them as the first wolf comes over the crest of the west rampart and stops, and looks at the gate, and at the Sixth in front of it, and goes on along the line.`,
      ch:[{t:'On.', onward:true, go:'b5_c4_word'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_word:()=>({sp:'The west rampart · the word', scene:'b5_c4_surrender', fx:()=>{ S.f.b5_c4_word = 1; }, txt:
`The word comes down the ramparts from the east, soldier to soldier, the way word does.

The fort has surrendered. *And the whole frontier with it.* The Queen is taken, and the Prince. Nobody on the west rampart saw it. Everybody on the west rampart says it, and then says it again, as if it might change.

Then the terms, behind the word: the surviving Letherii soldiers are to be disarmed, and let go. That is all. Let go.

Finadd Ennic listens to it with his book open, and writes it down, all of it, in his neat hand, and signs under it. Then he looks at what he has written for a while.${b54Say({tobet:`\n\n"Let go," Tobet says, flat. "Where to?" Nobody tells him.`, perrit:`\n\n"Let go," Perrit says. "They do not even want us." She sounds, for once, as if she cannot do the sum.`, _:''})}`,
      ch:[{t:'To the pile.', onward:true, go:'b5_c4_pile'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_pile:()=>({sp:'The west rampart · the pile', scene:'b5_c4_surrender', fx:()=>{ b5Disarm(); }, txt:
`The Edur come along the ramparts with no hurry at all, tall and grey, in dark leather, and the Letherii put their weapons down in front of them on the turf. A pile at every rampart. Swords, spears, bows. The Edur do not count them. They watch.

The Sixth puts its swords and spears and bows on the pile at the west rampart with the garrison's. Knives they keep: nobody asks for knives. Shields they keep, white fingertip and all. ${b54Say({thegg:'Thegg puts his sword down very gently, as if it might wake.', tobet:'Tobet unstrings his bow before he puts it down, and coils the string, and keeps the string.', _:'You put your sword down.'})}

The clerk keeps the oilskin case. An Edur looks at it, and at the clerk holding it in both arms, and lets it go by. Paper, the Edur do not want. ${b54If('ruuk', 'Ruuk lays his spears down last, one at a time, and says something to each one in Faraed.')}${b54If('brune', `${b5In('ruuk') ? ' ' : ''}Brune lays her fish-spear down and looks at it on the pile, and does not touch it again.`)}`,
      ch:[{t:'South.', onward:true, go:'b5_c4_south'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_south:()=>({sp:'The road south · evening', scene:'b5_c4_surrender', txt:
`The disarmed go south down the road from High Fort in a long file, garrison and Grass Jackets and the Queen's Battalion and the Sixth, without swords, with the Edur standing at the ramparts watching them go and the wolves somewhere out on the grass.

The Sixth walks in the middle of the file, among people it does not know. Somewhere far ahead of it on the road is everyone who was at the royals' end, and whoever is leading them. The Sixth is not with them, and does not try to be.

${b54Say({ammet:'Ammet walks with her roll of tools under her arm and blood dried to the elbow, and looks back once at the fort, at the gate, and not again.', thegg:'Thegg walks with his shield on his back and his empty hand opening and closing.', _:'The squad walks.'})}${b54If('ruuk', `\n\nRuuk walks beside you, for once, not ahead. "This road goes to Brans Keep," he says. "Then the city." He looks back at the wood. "We could have been in the trees," he says again, and then, because he is Ruuk: "But you carried them in. That is a good thing to have done. I will remember it."`)}${b54If('brune', `\n\nBrune walks at the back, with her empty hands. "South," she says. "Toward the sea." It seems to help.`)}

You touch the white fingertip on your shield's boss, for the Errant, because it is still there.`,
      ch:[{t:'South, to wherever it goes.', onward:true, go:()=>chapterEnd(4, 'hold')},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* 'run': west into the wood with the Grass Jackets, armed; the Jheck in the trees; out on the road south ahead of the column */
    b5_c4_run:()=>({sp:'The west rampart · the break', scene:'b5_c4_lightning', txt:
`"West," Finadd Ennic says, as if signing it, and puts his sword through his belt, and picks up his book.

${b5In('ruuk') ? `Ruuk is already moving. "Come," he says. "Not that way. This way. The trees are close."` : `The Grass Jackets are going west at a run, and the Sixth goes with them, at the end of the line, where the nearest way out was all along.`}${b54If('thegg', `\n\nThegg looks at the crest, and at the tower, and at you. "I stand behind," he says. "I do not run. I ran." He goes anyway, at the back, last, with the shield on his arm facing the field, walking.`)}${b54If('ammet', `\n\nAmmet gets up from the garrison man with her hands red. "He can walk," she says, of the one she can lift. "The others can't." She picks up her roll of tools and does not look back at the others, deliberately.`)}

Behind the Sixth, the garrison is still on its tower. Ahead, the wood.`,
      ch:[{t:'Into the trees.', onward:true, go:()=>{ startExplore('b5_c4_wood'); talk('b5_c4_wood_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_wood_arrive:()=>({sp:'The wood west of the fort', scene:'b5_c4_forest', txt:
`Under the trees the battle is suddenly a long way off: a noise like a far river, through leaves. The Grass Jackets are scattering in every direction, by twos and threes, toward the river, toward the hills, toward anywhere. The Sixth keeps together.

The light is failing early under the roof of the wood. The Sixth is on the edge of the Jheck's country here, and knows it, and goes quietly.${b54If('tobet', `\n\n"Something's been along here," Tobet breathes. "Big. Four feet."`)}${b54If('ruuk', `\n\nRuuk is out in front, in his own country at last, and for the first time today he is grinning. "Quiet," he says. "Quiet. And then south."`)}`,
      ch:[{t:'West, quietly.', go:()=>startExplore()}]}),
    b5_c4_wolfsign:()=>({sp:'The wood · failing light', scene:'b5_c4_forest', txt: S.f.b5_c4_wolvesDone ?
`The place in the ferns where the wolves were. The ferns are standing up again already.` :
`In a hollow among the ferns, a Grass Jacket's helm, and a strip of green cloth, and nothing else, and the ferns all pressed flat in a wide circle as if something heavy had lain there. Behind the Sixth, on the field, the wolves are at the wounded. You can hear it from here, a little.

Ahead, between the trees, three grey shapes get up out of the ferns, unhurried, very big, and look at the Sixth.`,
      ch:[{t:'"Shields. Close up."', req:()=>!S.f.b5_c4_wolvesDone, go:()=>startBattle('b5_c4_wolves', {})},
          {t:'Through the ferns, downwind, and onto them first.', check:['wits', 14], req:()=>!S.f.b5_c4_wolvesDone,
            edges:id=>[id === 'ruuk' && ['these are his trees, near enough', 2], id === 'tobet' && ['he knows where the blow is not', 1], id === 'thegg' && ['the ferns were not made for Thegg', -2]],
            near:{t:()=>{ const w = b54Who(); return `Yes, but the downwind way goes through a thorn-brake, and ${b54Nm(w)} ${b54V(w, 'come', 'comes')} out of it torn to the elbow: scratched and bruised.`; }, fx:()=>bruise(b54Who(), bruiseN())},
            go:()=>startBattle('b5_c4_wolves', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c4_wolfsign_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_wolfsign_seen:()=>({sp:'The wood · failing light', scene:'b5_c4_forest', txt:
`The wind turns. Three heads come round at once, and then all three of them are running, and not away.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c4_wolves', {surprise:'e'})}]}),
    b5_c4_wolves_after:()=>({sp:'The wood · dusk', scene:'b5_c4_forest', fx:()=>{ S.f.b5_c4_wolvesDone = 1; if (!S.f.b5_c4_toothGot) { S.f.b5_c4_toothGot = 1; gain('b5_c4_wolftooth'); } }, txt:
`The last of them goes away into the ferns, limping, and as it goes it is for a moment not quite a wolf, and then it is gone, and nobody in the squad says what they saw.

On the moss where the first one fell there is a tooth on a thong, a canine as long as a finger, as if something had been wearing it. ${b54Say({tobet:'Tobet picks it up, and turns it over, and puts it away. "Too big for a wolf," he says. None of them discusses it.', _:'One of the squad picks it up. None of them discusses why it is too big for a wolf.'})}${b54If('ruuk', `\n\nRuuk is breathing hard and grinning. "Good," he says. "Now south. Quickly. Before more of them remember they are wolves."`)}`,
      ch:[{t:'South, out of the trees.', go:()=>startExplore()}]}),
    b5_c4_wood_edge:()=>({sp:'The wood\'s edge', scene:'b5_c4_forest', txt: S.f.b5_c4_wolvesDone ?
`The trees thin to the south, and through them, the road.` :
`The trees thin to the south, and through them, the road. But something is between here and there in the ferns, by the sound of it, and the Sixth would rather meet it than have it follow.`,
      ch:[{t:'Out, to the road south.', req:()=>!!S.f.b5_c4_wolvesDone, onward:true, go:'b5_c4_road_out'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c4_road_out:()=>({sp:'The road south · evening', scene:'b5_c4_surrender', fx:()=>{ S.f.b5_c4_word = 1; }, txt:
`The Sixth comes out of the wood onto the road south from High Fort at dusk, armed, with its own wounded walking and the Grass Jackets long gone.

Up the road behind it, a long way back, the column is coming: a long file of soldiers walking south from the fort, without swords. The first of them who reaches the Sixth tells it, the way word goes. The fort has surrendered. *And the whole frontier with it.* The Queen is taken, and the Prince. The terms: the soldiers disarmed, and let go.

Finadd Ennic writes it all down in his neat hand, standing in the road, and signs under it. Then he looks at the Sixth, armed, in front of a column that is not.

"We are ahead of them," he says. "We had better stay ahead." He seems to find that a thing he can decide.${b54If('ruuk', `\n\nRuuk is already out in front. "Brans Keep," he says. "That way. The map is right, this once."`)}${b54If('thegg', `\n\nThegg looks back up the road at the column of the disarmed coming on, and turns, and walks at the back of the Sixth between it and them, with his shield on his arm. He does not say anything. He does not need to.`)}${b54If('brune', `\n\nBrune walks with her fish-spear. "South," she says. "Toward the sea."`)}

You touch the white fingertip on your shield's boss, for the Errant, and take the road.`,
      ch:[{t:'South, ahead of the column.', onward:true, go:()=>chapterEnd(4, 'run')},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ---- the Finadd on the morning of the battle ---- */
    b5_c4_ennic_dawn:()=>({sp:B5_FINADD.name, scene:'b5_c4_lightning', fx:()=>{ S.f.b5_c4_ennicDawn = 1; },
      again:()=>`Finadd Ennic, at the crest with his book shut.`, txt:
`Finadd Ennic is at the crest with his book shut under his arm and his sword, for once, on his belt where he can find it.

"No battalion," he says. "Well." He looks east along the line, at the lightning standing on the field. "I always thought it would be somebody else's decision, Sergeant, when it came." He considers the field. "It is, I suppose. Only not anybody's I can sign for."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
  },
};
