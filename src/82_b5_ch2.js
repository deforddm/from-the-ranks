/* ============ Book Five, Chapter 2: Trate ============ */
/* Trate, Lether's northernmost city, some days after the wave (Midnight Tides ch 6; the Sixth stays on into ch 13; mt-canon §1.2, §17c).
   The wave came with the last of the sun on a summer evening (the game's reading) and left the poachers' harvest ships on the quays. The
   Sixth Company is lent to the Trate Legion to clear the harbour. Phase 1, the first evening on the quays: the harbour master's board,
   the pilot at the quay's end (the trick), the market, the flooded sheds (looters), and at dusk the first hulk, where shapes hang in
   the rigging that are not men (the squad's first sight of Edur sorcery; b5_c2_hulk, the main fight). Phase 2, the strand by the Shake
   boats, where the Sixth's lines are: the fire, Brune of the Shake (the recruit), the fish-hook. Phase 3, weeks on: the delegation has
   sailed north, and the harbour master posts a bounty on the harvest ships' cargo with the dead still aboard. The key, S.f.b5_c2_key:
   'salvage' (the harbour's coin first; that night rival wreckers at the chests, b5_c2_wreckers) or 'dead' (the drowned first, laid on the
   quay with the Shake; at the evening tide the wraiths come off the hulk, b5_c2_tide). Phase 4: the Edur have declared war, and the Sixth
   goes up the river by barge to Kraig's Landing. Notes for later chapters: docs/mt-ch2-notes.md. */
/* FOR THE ARTIST (82b): names this file uses.
   Items: ART['item/b5_c2_sealcoat'], ['item/b5_c2_tooth'], ['item/b5_c2_gaff'], ['item/b5_c2_shells'].
   Figures: b5_c2_looter, b5_c2_wrecker, b5_c2_wreckboss, b5_c2_drowned, b5_c2_pilot, b5_c2_harbourmaster, b5_c2_shake. Reused: b5_c1_ennic,
   b5_c1_clerk, b5_c1_tilewoman, b5_letherii (the quartermaster, the Legion), b5_letherii_bow, b5_wraith, brune.
   Backdrops (SCENEX): b5_trate_harbour (80's, redrawn), b5_c2_wrecks, b5_c2_hold, b5_c2_strand.
   Ground (TILEX): b5_c2_quay (. planking , wet stone ~ harbour w wreckage # shed wall c the cart of the drowned f fish D a shed door M a
   market stall H the plank to the first hulk <), b5_c2_hulk (. deck - the open, flooded hold # bulkhead m mast h hatch <), b5_c2_strand
   (. sand , shingle ~ sea B a drawn-up boat F fire # the dune bank >), and b5_c2_wharf for the fights on the quay's edge (# is the harbour
   there). Battle 't' is cover: nets and crates in the sheds, chests on the wharf, cargo in the hold. */

/* ---- small helpers (b52: Book Five, Chapter Two) ---- */
const b52L = (id, n) => { if (b5In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b52Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b5In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b52If = (id, s) => b5In(id) ? (typeof s === 'function' ? s() : s) : '';
const b52Who = () => (ROLL() && ROLL().who) || 'sgt';
const b52Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b52Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b52V = (id, you, they) => id === 'sgt' ? you : they;
const b52Ph = () => S.f.b5_c2_ph || 1;
const b52Key = () => S.f.b5_c2_key || null;
const b52KeyDone = () => !!(S.f.b5_c2_wreckDone || S.f.b5_c2_tideDone);
/* Brune walks with the squad, or waits with the Shake boats on the strand */
const b52Near = () => b5In('brune') || b5Waiting('brune');
const b52BruneL = n => { if (b52Near() && S.loy && S.loy.brune != null) loy('brune', n); };
/* "stay with your boats for now": what b5Join does when there is no room, done on purpose */
const b52Wait = () => { S.f.b5_bruneDone = 2; S.camp = [...(S.camp || []).filter(x => x !== 'brune'), 'brune']; b5DebtInit('brune'); S.loy.brune ??= 0; S.picks.brune ??= []; S.gear.brune ??= {};
  note('Brune stays with the Shake boats on the strand for now. The roster at any fire can bring her in.'); save(); };
const b52Docks = (n, why) => { S.silver = (S.silver || 0) + n; updSilver(); note(`+${n} docks: ${why}.`, 'good'); };
const b52Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b52Here = () => S.squad.filter(id => id !== 'sgt' && b5In(id));
const b52And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* a "yes, but" in docks of debt on whoever rolled it (5 to 20), never past what the holder will wait for: if it would push the roller to
   'pressed', the scene takes another cost (alt: {t(id), fx(id)}). fx runs before t (16, settleRoll), so fx decides. */
let b52NearOk = true;
const b52Room = (id, n) => { const d0 = b5DebtStart(id), lim = d0 > 0 ? d0 * B5_PRESS : 50; return b5Debt(id) + n <= lim; };
const b52Owe = (n, why, line, alt) => ({
  fx:()=>{ const w = b52Who(); b52NearOk = b52Room(w, n); if (b52NearOk) b5Owe(w, n, why); else if (alt && alt.fx) alt.fx(w); },
  t:()=>{ const w = b52Who(); return b52NearOk ? line(w) : (alt && alt.t ? alt.t(w) : `Yes, but it costs ${b52Nm(w)} something.`); }});

/* ---- the Pilot's Eye: the Long Listen (Book Four's b4_c6_listen), in Lether's words. From an old harbour pilot at the end of the long
   quay. Not sorcery. Its battle half is guarded by b5On() and keeps its own state (B.b52eye). ---- */
Object.assign(TRICKS, {
  b5_c2_pilot:{name:'The Pilot\'s Eye', ch:2, use:'fight', ab:'t_b5_c2_pilot', where:'the end of the long quay at Trate, with an old harbour pilot',
    lore:'A pilot reads the water off the end of the quay: where it is going to break, where it is going to run, which way the ship will come before the ship knows. You do not watch the thing. You watch the shape round it, and the shape moves first. The old pilot saw the wave coming that way, before the bell.',
    get fx(){ return `Once a fight: the bearer goes still and watches the water's shape. The first enemy to move after it is marked: +2 to hit it for the squad until the end of the next round. Until the bearer's next turn nobody in the squad can be flanked. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b5_c2_pilot:{name:TRICKS.b5_c2_pilot.name, trick:'b5_c2_pilot', self:true, desc:()=>TRICKS.b5_c2_pilot.fx,
    run(u){ B.b52eye = {u, on:true, marked:null}; AUDIO.play('click'); float(u, 'watching', '#cfe0dc'); sparks(u.x, u.y, 6, '#cfe0dc', .3);
      blog(`${u.name} goes still and watches, not the enemy, the shape round it, the way the old pilot watched the water. "${u.id === 'brune' ? 'There. That one. It leans before it goes.' : u.id === 'tobet' ? 'Left one. Sergeant. It\'s going first.' : 'That one first.'}" For a turn nothing gets round the squad's side.`); }},
});
{ const _bfts = boonFoeTurnStart;
  boonFoeTurnStart = function(u){ const r = _bfts(u); const L = b5On() && B && B.b52eye;
    if (L && L.on && !L.marked && u && u.side === 'e' && u.hp > 0) { L.marked = u; u.b52markUntil = B.round + 1; float(u, 'seen', '#f2c46b'); blog(`${u.name} moves, and the squad saw it lean first. <em>+2 to hit it.</em>`); }
    return r; }; }
{ const _fl = flanked;
  flanked = function(a, t, from){ if (b5On() && B && B.b52eye && B.b52eye.on && t && t.side === 'p' && a && a.side === 'e') return false; return _fl(a, t, from); }; }
{ const _ac = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _ac(a, t, o); if (!b5On() || !B || !a || !t || a.side !== 'p') return c;
    if (t.b52markUntil >= B.round) c.bonus += 2;
    return c; }; }
{ const _sts = squadTurnStart;
  squadTurnStart = function(u){ const r = _sts(u); const L = b5On() && B && B.b52eye; if (L && L.on && L.u === u) { L.on = false; blog('The watching is done. The water is only water again.'); } return r; }; }

/* ---- the words this chapter adds to Book Five's glossary ---- */
GLOSSX.mt.push(
  [2, 'The Trate Legion', 'The garrison of Trate. It holds the walls, the harbour and the North Gate, and since the wave it has also held the shovels.', ()=>(S.chapter || 0) >= 2],
  [2, 'The harvest ships', 'The seal-poachers\' ships that sailed north into Edur waters in the spring, and came back on the wave with nobody alive aboard.', ()=>!!(S && S.f && S.f.b5_c2_ph)],
  [2, 'Tarancede Tower', 'A tower of black stone on an island of rocks in the south of Trate\'s harbour, with no door and no window. The Ceda\'s business, the dockers say, and leave it there.', ()=>!!(S && S.f && S.f.b5_c2_ph)]);

/* ---- the reading at the first halt: the quay, the first evening ---- */
B5READ[2] = {scene:'b5_trate_harbour', where:'the wet planking of the quay, beside a coil of rope', set:'A summer evening in Trate, some days after the wave, with the mist coming in off the harbour and the gulls still at the fish.',
  back:'b5_c2_tiles_done', backT:'Back to the work.',
  say:{perrit:`"Wet wood," Perrit says, and looks at it with dislike. "The school says a reading wants a dry table." She lays her calfskin square on the planks anyway, with her back to the town and her face to the water, where she can see it. "The school has never been to Trate. Sit, Sergeant."`,
    tilewoman:`"Whitefinders, at the sea." The old woman spits to one side, for manners, and the gulls take an interest. "A dock, Sergeant. The tiles do not mind the wet. Bone has been wetter."`}};

/* the fire node is a roster fire (38c) */
ROSTER_FIRES.mt[2] = ['b5_c2_fire'];

const B5CH2 = {
  title:'Trate', number:'Two',
  intro:{loc:'Trate', sub:'The harbour after the wave · a summer evening', scene:'b5_trate_harbour', cap:'Wrecks on the quays, fish on the cobbles, and the lighthouse standing over all of it as if nothing happened.',
    paras:[
`Trate is Lether's northernmost city: a walled port, a lighthouse over its harbour front, and a black tower out on the rocks that nobody goes into. Some days ago, on a summer evening, a wave came out of the sea and into the harbour with the last of the sun on it. It brought ships with it. When it went back out it left them on the quays.`,
()=>{ const v = b52Here().map(id => TPL[id].name);
  return `The Sixth Company came up the north road at the pace of its slowest boots, with its paybooks in the clerk's oilskin case and Finadd Ennic's order in Finadd Ennic's neat hand: lent to the Trate Legion, to clear the harbour. ${v.length ? `${b52And(v)} ${v.length > 1 ? 'are' : 'is'} with you, a little footsore, and ${v.length > 1 ? 'all of them' : 'that one'} owing the same as they did in Letheras.` : 'The squad, this month, is you.'}`; },
`The road comes down through the North Gate and the town, and the town smells of the sea, and of what the sea left behind.`],
    go:'Down to the quays', node:'b5_c2_start'},

  areas:[
    /* 16 x 12 (b5_c2_quay, evening). ~ the harbour  w wreckage  . planking  , wet stone  f fish  c the Legion's cart for the drowned
       H the plank up to the first hulk  # the harbour-front sheds  D a shed door  M a market stall  < south, to the strand */
    { id:'b5_c2_quay', title:'Trate · the harbour front', sub:'The quays after the wave', hint:'Tap ground to move · tap a figure to talk · the strand is south-west', decor:'b5_c2_quay',
      map:[ "~~~~~~~~~~~~~~~~",
            "~ww~~~~~~~~~~ww~",
            "~ww~~~~H~~~~~ww~",
            "................",
            "..f.......c..f..",
            "................",
            ",,,,,,,,,,,,,,,,",
            "####D###,,M#####",
            "#,,,,,,,,,,,,,,#",
            "<,,,,,,f,,,,,,,#",
            "#,,,,,,,,,,,,,,#",
            "################" ],
      walk:'.,f', triggers:{H:'b5_c2_gangplank', D:'b5_c2_sheds', M:'b5_c2_market', c:'b5_c2_cartdead', '<':'b5_c2_to_strand'}, start:{x:8, y:5},
      quest:()=> b52Ph() === 1 ? (S.f.b5_c2_hm ? 'The first hulk, at dusk: the plank from the quay.' : 'The harbour master, at his board on the quay.')
        : b52Ph() === 2 ? 'The Sixth\'s lines are on the strand, south-west.'
        : !b52Key() ? 'The harbour master has posted something on his board.'
        : !b52KeyDone() ? (b52Key() === 'dead' ? 'The dead on the quay, and the tide coming in.' : 'The strand, and the fire. The chests are on the quay.') : 'Back to the strand. Something is coming down from the town.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:5, y:4, node:()=>'b5_c2_ennic', show:()=>b52Ph() === 1, fresh:()=>!S.f.b5_c2_ennic},
        {id:'hm', name:'The harbour master', kind:'b5_c2_harbourmaster', x:11, y:3, node:()=>b52Ph() === 3 && !(S.f.b5_c2_hauled || S.f.b5_c2_laid) ? 'b5_c2_bounty' : 'b5_c2_harbourmaster', fresh:()=>b52Ph() === 1 ? !S.f.b5_c2_hm : b52Ph() === 3 && !(S.f.b5_c2_hauled || S.f.b5_c2_laid)},
        {id:'pilot', name:'An old harbour pilot', kind:'b5_c2_pilot', x:14, y:3, node:()=>S.f.b5_c2_pilotTried ? 'b5_c2_pilot_again' : 'b5_c2_pilot', fresh:()=>!S.f.b5_c2_pilotTried},
        {id:'tide', name:'The Shake, sitting with the dead', kind:'b5_c2_shake', x:9, y:5, node:()=>'b5_c2_tide_start', show:()=>b52Key() === 'dead' && !!S.f.b5_c2_laid && !S.f.b5_c2_tideDone, fresh:()=>true} ] },

    /* 16 x 12 (b5_c2_hulk, dusk). The first harvest ship, on her side across the end of the long quay: the slope of her deck, the open
       hold with water in it (-), her masts (m), her bulkheads (#), the hatch to the hold (h), and the plank back down to the quay (<) */
    { id:'b5_c2_hulk', title:'Trate · the first hulk', sub:'Dusk · the tide off her', hint:'Tap ground to move · the hatch is amidships · the plank is aft', decor:'b5_c2_hulk', dark:true,
      map:[ "################",
            "#......m.......#",
            "#..............#",
            "#...----.......#",
            "#...----...h...#",
            "#..............#",
            "#......m.......#",
            "#..............#",
            "#.....---......#",
            "#.....---......#",
            "#.....<........#",
            "################" ],
      walk:'.', triggers:{h:'b5_c2_hatch', m:'b5_c2_rigging', '<':'b5_c2_hulk_back'}, start:{x:7, y:7},
      quest:()=> S.f.b5_c2_hulkDone ? 'Down the plank to the harbour master.' : 'The hatch, amidships. The hold.',
      npcs:[] },

    /* 16 x 12 (b5_c2_strand, night). ~ the sea  , shingle  . sand  B the Shake boats, drawn up  F the Sixth's fire  # the dune bank
       > north-east, back to the quays */
    { id:'b5_c2_strand', title:'Trate · the strand', sub:'South of the quays · the Shake boats', hint:'Tap ground to move · tap a figure to talk · the quays are north-east', decor:'b5_c2_strand', dark:true,
      map:[ "~~~~~~~~~~~~~~~~",
            "~~~~~~~~~~~~~~~~",
            ",,,~~~,,,,~~~,,,",
            ",B,,,,,B,,,,,B,,",
            "................",
            ".......F........",
            "................",
            ".,......,.....,.",
            "................",
            "...............>",
            "....,......,....",
            "################" ],
      walk:'.,', triggers:{F:'b5_c2_fire', B:'b5_c2_boats', '>':'b5_c2_to_quay'}, start:{x:9, y:8},
      quest:()=> b52Ph() === 2 ? (S.f.b5_bruneDone == null ? 'The Shake boats. One of them has somebody waiting by it.' : 'The fire. The work goes on in the morning.')
        : b52Ph() === 3 ? (!b52Key() ? 'The quay: the harbour master has posted something.' : b52Key() === 'salvage' && !S.f.b5_c2_wreckDone ? 'The fire, and then the chests on the quay.' : 'The fire.')
        : 'The Finadd is coming down the strand.',
      npcs:[
        {id:'brune', name:'Brune, of the Shake', kind:'brune', x:2, y:4, node:()=>S.f.b5_bruneDone == null ? 'b5_c2_brune' : 'b5_c2_brune_again', show:()=>!b5In('brune') && S.f.b5_bruneDone !== 0 && b5CanRecruit('brune'), fresh:()=>S.f.b5_bruneDone == null},
        {id:'shake', name:'A Shake woman at the boats', kind:'b5_c2_shake', x:12, y:4, node:()=>'b5_c2_shakewoman', fresh:()=>!S.f.b5_c2_shake},
        {id:'qm', name:'The quartermaster', kind:'b5_letherii', x:11, y:7, node:()=>'b5_c2_qm', fresh:()=>!S.f.b5_c2_qm},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:4, y:7, node:()=>'b5_c2_clerk', fresh:()=>!S.f.b5_c2_clerk},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:13, y:9, node:()=>'b5_c2_tilewoman', fresh:()=>!S.f.b5_c2_tw},
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:6, node:()=>'b5_c2_war', show:()=>b52Ph() >= 4, fresh:()=>true} ] } ],

  battles:{
    /* the flooded sheds on the harbour front: looters going through what the wave left */
    b5_c2_looters:{title:'The flooded sheds', style:'b5_c2_quay', open:true, warrenText:'Trate · the Holds are far off, and the sea is close', warren:{meanas:1, denul:1}, music:'battle',
      map:["########","#.t..t.#","#......#","#..t...#","#.....t#","#......#","#.t....#","#......#","#......#","###..###"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_c2_looter',1,2],['b5_c2_looter',5,2],['b5_c2_looter',3,4],['b5_c2_looterbow',4,1]], xp:110, after:'b5_c2_looters_after',
      preText:()=>`Water a hand deep on the shed floor, and the looters standing in it with their arms full. They put down what they are holding. They do not put down the knives.`},
    /* the first hulk at dusk: the hold half flooded, wraiths, and one more out of the dark at the top of the hold; then the deck */
    b5_c2_hulk:{title:'The first hulk', style:'b5_c2_hulk', dark:true, warrenText:'Something is holding these shapes, and it is not a Hold', warren:{meanas:1, denul:1}, music:'battle',
      map:["########","#--tt--#","#------#","#-t--t-#","#------#","#-#--#-#","#------#","#--t---#","#-....-#","###..###"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_wraith',2,2],['b5_wraith',5,2],['b5_wraith',3,4]], xp:170, after:'b5_c2_hulk_after',
      waves:[{round:2, foes:[['b5_wraith',6,1]], text:'Another comes down out of the dark at the top of the hold, where the rigging would be if a hold had rigging.'}],
      preText:()=>`The hold is black and half full of water, and the water is cold to the thigh. There are shapes in it that are not floating, and do not touch the water at all.`,
      stage2:{title:'The deck', xp:80,
        text:()=>`The last of them in the hold goes up into nothing like smoke off a pinched wick, and the squad comes up the ladder into the last of the light.\n\nThe deck is not empty. The shapes that were in the rigging have come down. And among them, aft by the wheel, one of them wears a coat: a poacher's coat, a drowned man's, sodden and buttoned to the neck, with nothing in the collar where a face would be.${b52If('perrit', `\n\nPerrit says, very low, "It's using the coat. Not the man. Only the coat."`)}`,
        map:["#......#","#..#...#","#......#","#.t..t.#","#......#","#...#..#","#......#","#..t...#","#......#","##....##"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b5_c2_drowned',3,2],['b5_wraith',2,1],['b5_wraith',5,1],['b5_wraith',1,4],['b5_wraith',6,4]]} },
    /* 'salvage': the quay at night, rival wreckers at the squad's chests */
    b5_c2_wreckers:{title:'The salvage chests', style:'b5_c2_wharf', dark:true, open:true, warrenText:'Night on the quay · the lighthouse turning, and nothing else watching', warren:{meanas:1, denul:1}, music:'battle',
      map:["#.......","#..t....","#.......","#....t..","#.......","#.tt....","#.......","#.......","#.......","#......."],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b5_c2_wreckboss',4,1],['b5_c2_wrecker',2,2],['b5_c2_wrecker',6,2],['b5_c2_wrecker',5,4],['b5_deserterbow',7,0]], xp:170, after:'b5_c2_wreckers_after',
      preText:()=>`The wreckers spread out along the quay with the harbour at their backs and the chests between, and their boss tells the squad, reasonably, that he has a chit for every one of them.`},
    /* 'dead': the evening tide, the dead laid on the quay, and the wraiths come off the second hulk */
    b5_c2_tide:{title:'The evening tide', style:'b5_c2_wharf', dark:true, open:true, warrenText:'Dusk on the quay · the dead behind you, and the Shore close', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Keep them off the dead until the Legion\'s lamps come.'},
      map:[".......#","...t...#",".......#",".t...t.#",".......#",".......#","..t....#",".......#",".......#",".......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b5_wraith',1,1],['b5_wraith',4,0],['b5_wraith',6,1],['b5_wraith',3,2]], xp:170, after:'b5_c2_tide_after',
      waves:[{round:2, foes:[['b5_wraith',0,0],['b5_wraith',6,0]], text:'Two more come down off the hulk\'s rigging and across the water without touching it.'}],
      preText:()=>`The light is going. Out on the hulk the shapes have come down out of the rigging, all at once, the way starlings come down, and now they are coming along the quay toward the row under the sailcloth.`} },

  foes:{
    /* harbour-front looters, and one with a sling */
    b5_c2_looter:{name:'Harbour looter', sig:'l', kind:'b5_c2_looter', hp:10, ac:12, atk:3, dmg:[1,6,1], rng:1, mv:5, init:2, sk:['hitrun'], verb:'goes in with a gutting knife at'},
    b5_c2_looterbow:{name:'Looter with a sling', sig:'s', kind:'b5_letherii_bow', hp:8, ac:11, atk:3, dmg:[1,6,0], rng:5, mv:4, init:2, sk:['pin'], verb:'slings a stone at'},
    /* the wraith in a drowned man's coat: a shadow wearing it, no face; never a raised corpse */
    b5_c2_drowned:{name:'A shape in a drowned man\'s coat', sig:'W', kind:'b5_c2_drowned', hp:18, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:2, boss:true, sk:['drain'], verb:'closes a cold sleeve round'},
    /* rival wreckers and their boss */
    b5_c2_wrecker:{name:'Wrecker', sig:'w', kind:'b5_c2_wrecker', hp:12, ac:12, atk:4, dmg:[1,6,1], rng:1, mv:4, init:1, sk:['shove'], verb:'swings a boathook at'},
    b5_c2_wreckboss:{name:'The wreckers\' boss', sig:'B', kind:'b5_c2_wreckboss', hp:24, ac:13, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, boss:true, sk:['rally', 'shove'], verb:'brings a mallet round on'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b5_c2_sealcoat:{name:'A poacher\'s sealskin coat', slot:'armour', role:'light', who:null, ac:1,
      line:'A short coat of grey sealskin, oiled, with bone toggles, out of a chest in the second hulk\'s hold. It still smells of the north. The poachers went a long way for the skins, and the skins came home. +1 armour.'},
    b5_c2_tooth:{name:'A tooth nobody can name', slot:'trinket', role:'any', who:null, hp:3,
      line:'A long curved tooth, yellowed, bound at the root with copper wire, bought for a dock off a market stall in Trate. The stall-keeper did not know what it came out of. Neither does anyone the squad has shown it to. Whoever carries it seems harder to kill, which nobody can explain either. +3 health.'},
    b5_c2_gaff:{name:'A harbour gaff', slot:'weapon', role:'reach', who:null, atk:1, rng:1, reach:true, ac:-1,
      line:'The Trate Legion\'s long hooked pole for dragging wreckage, and the drowned, out of the harbour: a long ash pole with an iron hook and a spike. Reach: it strikes an enemy two tiles off, but it takes both hands, so the shield goes on the back (−1 armour).'},
    b5_c2_shells:{name:'A cord of Shake burial shells', slot:'trinket', role:'any', who:null, stat:{wits:1},
      line:'Small white shells on a knotted cord, one of them black: the shells the Shake lay on their drowned, given to the squad on the quay at Trate for carrying the dead out. Whoever wears it thinks a little more slowly before doing something stupid. +1 Wits.'} },

  scenes:{
    b5_c2_wrecks:{loc:'Trate', sub:'The harvest ships on the quays · dusk', cap:'Ships broken on the quays at dusk, their masts leaning, and shapes in the rigging that do not move when the gulls do.', amb:'explore'},
    b5_c2_hold:{loc:'Trate', sub:'Inside a flooded hold', cap:'Black water to the thigh, light through a split in the hull, and the benches where the crew sat.', amb:'explore'},
    b5_c2_strand:{loc:'Trate', sub:'The strand · the Shake boats', cap:'Long black boats drawn up on the shingle, a fire of wreck-wood, and the sea coming in and going out in the dark.', amb:'explore'} },

  end:{
    salvage:['The harbour\'s coin', 'The Sixth went north to Trate to clear a harbour a wave had wrecked, and cleared it, a wreck at a time. There were shapes in the rigging of the harvest ships that were not men, and the squad went into the first hulk at dusk and came out again. When the harbour master posted a bounty on the cargo, the squad landed the cargo, and took the forty docks, and stood over the chests that night against a crew who had a chit for the same ones. The dead in the second hulk waited for somebody else.'],
    dead:['The drowned first', 'The Sixth went north to Trate to clear a harbour a wave had wrecked, and cleared it, a wreck at a time. There were shapes in the rigging of the harvest ships that were not men, and the squad went into the first hulk at dusk and came out again. When the harbour master posted a bounty on the cargo, the squad brought out the dead instead, and laid them on the quay with the Shake, and stood between them and what came off the hulk at the evening tide. Nobody paid for that.'] },
  endScene:'b5_trate_harbour',
  endCap:()=> b52Key() === 'dead' ? 'The barges going up the river from Trate at first light, and behind them on the quay a row of shells where the dead were laid.' : 'The barges going up the river from Trate at first light, and the squad a few docks heavier, sitting on its kit.',
  tease:'Next: Kraig\'s Landing. Three buildings and a dock upriver, a regiment camped round them, and the mountains very close.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b5_c2_key === 'salvage') x.push(`The squad landed the second hulk's cargo for the harbour master's bounty: forty docks.${f.b5_c2_wreckDone ? ' A crew of wreckers came for the chests that night with a chit for every one of them, and did not get them.' : ''}${f.b5_c2_forgiven ? ' The bounty paid off part of Brune\'s boat.' : ''}`);
    if (f.b5_c2_key === 'dead') x.push(`The squad brought the dead out of the second hulk and laid them on the quay with the Shake.${f.b5_c2_tideDone ? ' At the evening tide the shapes came off the hulk, and the squad held them off the dead until the Legion\'s lamps came.' : ''}`);
    if (f.b5_c2_hulkDone) x.push('The squad cleared the first hulk at dusk: the hold, then the deck. It was the first time any of them had seen the Edur\'s sorcery, and nobody could say what it was.');
    if (f.b5_bruneDone === 1 && b5In('brune')) x.push('Brune of the Shake walks with the squad, with her own fish-spear and her feet in any water there is.');
    else if (f.b5_bruneDone === 2) x.push('Brune of the Shake stays with her people\'s boats for now. The roster can bring her in.');
    if (f.b5_bruneHook) x.push('Brune came to Ammet with a fish-hook through her palm and asked her not to make a fuss. Ammet did not.');
    if (f.b5_c2_pilotOk) x.push('An old harbour pilot at the end of the long quay taught the squad to watch the shape of a thing before the thing moves.');
    if (f.b5_c2_lootDone) x.push('The squad cleared looters out of the flooded sheds on the harbour front. The shed-owners paid, through the harbour master, less his share.');
    if (f.b5_c2_watchOk) x.push('On the night watch the squad caught a skiff of looters going out to the hulks on the rocks.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b5_c2_war && 'The Edur have declared war on Lether. The Sixth goes up the river by barge to Kraig\'s Landing, to guard a regiment\'s barges near the border.',
    f.b5_c2_tideDone && 'At the evening tide the shapes came down off the second hulk for the dead on the quay. The squad held them until the Legion\'s lamps came.',
    f.b5_c2_wreckDone && 'Rival wreckers came for the salvage chests on the quay at night. Their boss had a chit from the harbour master for the same cargo.',
    f.b5_c2_key && (f.b5_c2_key === 'salvage' ? 'The harbour master posted a bounty on the harvest ships\' cargo, with the dead still aboard. The squad landed the cargo first.' : 'The harbour master posted a bounty on the harvest ships\' cargo, with the dead still aboard. The squad brought out the dead first.'),
    f.b5_c2_weeks && 'Weeks of the harbour: the drowned dragged out, the wrecks cut loose, the waterfront watched at night. Rumour says the Prince\'s delegation has sailed north to the Edur.',
    f.b5_bruneDone === 1 && 'Brune of the Shake asked the Sixth for work at the strand, with her own fish-spear, and walks with the squad.',
    f.b5_bruneDone === 2 && 'Brune of the Shake asked the Sixth for work at the strand. She is staying with her people\'s boats for now.',
    f.b5_c2_hulkDone && 'The first hulk at dusk: shapes in the rigging that were not men, wraiths, the Legion calls them, and one wearing a drowned man\'s coat. The squad cleared the hold and the deck.',
    f.b5_wraithSeen && 'There are shapes in the rigging of the harvest ships. The Legion\'s men will not go aboard after dark.',
    'The Sixth is lent to the Trate Legion to clear Trate\'s harbour after the wave. The harvest ships, the poachers\' ships, lie wrecked on the quays.'].filter(Boolean); },

  dlg:{
    /* ---- the first evening: the quay, and the first halt ---- */
    b5_c2_start:()=>({sp:'Trate · the harbour front', scene:'b5_trate_harbour', fx:()=>{ S.f.b5_c2_ph ??= 1; S.f.b5_trate = 1; },
      again:()=>`The harbour front, in the evening. The harbour master's board, the wrecks, and the gulls.`, txt:
`The quays of Trate, an evening some days after the wave.

The harbour front is planking on stone, and the planking is mostly still there. The sheds along the back of it stand with their doors burst in and a tide-line drawn on their walls at the height of a tall man's chest. Fish lie on the stones where the water left them. The gulls have been at them for days and are not finished.

And the ships. Three of them, out of the north, lying where the wave put them: one on her side across the end of the long quay, one with her bow up on the stone and her stern under water, one further out on the harbour's rocks. Their masts lean. Their rigging hangs. The Legion calls them the harvest ships, because that is what the poachers called them when they sailed in the spring.

Over all of it the lighthouse stands on the harbour front as if nothing had happened. Out in the south of the harbour, on its island of rocks, the Tarancede Tower stands black and doorless, which is how it has always stood. On the sea wall above the harbour mouth a figure in a long dark robe watches the water, alone. The Legion's sorceress, a docker tells you, and goes back to his shovel.

${b52Say({tobet:`Tobet is looking at the masts. "There's nobody up there," he says quietly. "Sergeant. There's nobody up there, is there."`, _:'The squad looks at the masts for a while, and then at the work.'})}${b52If('perrit', `\n\nPerrit stops at the top of the quay steps with the town at her back and the water in front of her, where she can see it.`)}${b52If('ammet', `\n\nAmmet has already seen the row along the shed wall under the sailcloth, and is looking at it the way she looks at a queue.`)}`,
      ch:[b5TileChoice(2),
          {t:'Find the harbour master.', go:'b5_c2_harbourmaster'},
          {t:'Walk the quay.', go:()=>startExplore()}]}),
    b5_c2_tiles:()=>b5TileOffer(2),
    b5_c2_card:()=>b5TileCard(2),
    b5_c2_tiles_done:()=>({sp:'The Tiles of the Holds', scene:b52Ph() >= 2 ? 'b5_c2_strand' : 'b5_trate_harbour', txt:
`${S.f.b5_c2_drawn ? (S.f.b5_c2_reader === 'perrit' ? 'Perrit wipes the salt off each tile with her thumb before it goes back in the pouch, and counts them in.' : 'The tile-woman shakes the bone tiles back into the oiled cloth and ties it, and the dock goes somewhere in her shawl.') : 'The tiles stay in the pouch.'} The harbour goes on making its noises: water, gulls, the Legion's shovels.`,
      ch:[{t:'Back to the work.', go:()=>startExplore()}]}),

    /* ---- the Finadd ---- */
    b5_c2_ennic:()=>({sp:B5_FINADD.name, scene:'b5_trate_harbour', fx:()=>{ S.f.b5_c2_ennic = 1; },
      again:()=>`Finadd Ennic, with the Legion's order in his book. "The hulk, Sergeant. At dusk."`, txt:
`Finadd Ennic is standing on the quay with his book open and the Legion's order pinned in it, reading it again in case it has changed. It has not.

"We are the Legion's until we are not," he says. "Their harbour master has the work. He has asked for our best for the first hulk, at dusk, when the tide is off her." He turns a page. "I have given him you. I hope that was the right thing to sign."

He lowers his voice. "The Legion's own men will not go aboard her after dark. They say there is something in the rigging. Their officers say it is gulls." He looks at the masts. "I have not seen a gull go near it."`,
      ch:[{t:'"Yes, Finadd."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the harbour master: the work, the hulk, the bounty later ---- */
    b5_c2_harbourmaster:()=>{ const ph = b52Ph();
      return {sp:'The harbour master', scene:'b5_trate_harbour', fx:()=>{ S.f.b5_c2_hm = 1; },
        again:()=> ph === 1 ? `The harbour master at his board. "The first hulk, Sergeant. Dusk."` : ph === 2 ? `The harbour master at his board. "The work's chalked up. Same as yesterday."` : b52KeyDone() ? `The harbour master at his board, chalking. "The Legion thanks the Sixth. In writing."` : `The harbour master at his board. "One tide, Sergeant."`, txt:
`The harbour master is a grey, square man in a salt-stained coat, with a ledger under one arm and a harbour gaff in the other hand. He stands at a trestle on the quay where the Legion's work is chalked on a board: which quay, which wreck, how many hands, how many brought out. The last column has been wiped and chalked so many times the board is grey with it.

"Whitefinders," he says. "Good. The Legion's own won't go aboard after sundown." He points the gaff at the ship on her side across the end of the long quay. "That one first. The tide's off her at dusk, and you can get into the hold dry, or near enough. Bring out what's in it. The dead go on the Legion's carts. Anything else comes to me and goes in the book."

He taps the ledger. "Everything goes in the book. The harbour pays the Legion by the wreck, the Legion pays the Sixth, and somebody pays me. In Trate, if it isn't in a book it didn't happen."`,
        ch:[{t:'"What happened here?"', req:()=>!S.f.b5_c2_wave, go:'b5_c2_hm_wave'},
            {t:'"We\'ll board her at dusk."', req:()=>ph === 1 && !S.f.b5_c2_hulkDone, onward:true, go:'b5_c2_board_go'},
            {t:'"The bounty."', req:()=>ph === 3 && !b52Key(), go:'b5_c2_bounty'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c2_hm_wave:()=>({sp:'The harbour master', scene:'b5_trate_harbour', fx:()=>{ S.f.b5_c2_wave = 1; }, txt:
`"Evening," the harbour master says. "Summer. The last of the sun on the water. Three sail out of the north, and the pilot scow went out to bring them in over the bar, the way it does." He looks at the bar. "It came back faster than it went. Then the alarm bell. Then the sea stood up."

He does not tell it any better than that, and does not try. "I was on this quay. I ran up the town steps with everybody else, and looked back from the top, and the water was in the streets with the fish in it, and the ships were riding on top of it as if somebody had carried them in." He taps the board. "When it went back out, it left those. Crews and all."

"The Legion's still counting," he says. "I've stopped."${b52If('ammet', `\n\nAmmet nods, once, as if he had told her something about a patient.`)}`,
      ch:[{t:'Back to the board.', go:'b5_c2_harbourmaster'}]}),

    /* ---- the pilot at the end of the long quay: the trick ---- */
    b5_c2_pilot:()=>({sp:'An old harbour pilot', scene:'b5_trate_harbour', txt:
`At the end of the long quay an old man sits on a bollard with his elbows on his knees, looking at the water. He has a pilot's coat, oiled and patched, and a pilot's squint, and nothing to pilot. There is nothing coming in.

"Forty years I took them in over the bar," he says, before you ask. "Never wrecked one. That's the pilot's whole boast." He nods at the hulks. "Those came in without me."

He does not look away from the water while he talks. "I saw it coming before the bell. The water went the wrong shape. Out past the rocks, before anything, it leaned. You don't watch the thing, see. You watch the shape round it. The shape moves first." He turns his head at last and looks at the squad's shields, the white fingertips. "Soldiers could use that. I'll show one of you, if you can sit still long enough. Most can't."`,
      ch:[{t:'"Show us."', check:['wits', 16], trick:'b5_c2_pilot', req:()=>!S.f.b5_c2_pilotTried, fx:()=>{ S.f.b5_c2_pilotTried = 1; },
            edges:id=>[id === 'brune' && ['the sea is her people\'s', 2], id === 'tobet' && ['the far view is his', 1], id === 'ruuk' && ['he reads ground, and water is ground that moves', 1], id === 'thegg' && ['he looks at a thing until it stops moving', -1]],
            near:{t:()=>{ const w = b52Who(); return `Yes, but he keeps ${b52Nm(w)} out at the end of the quay until full dark, watching, and every swell that comes over the planks comes over ${w === 'sgt' ? 'you' : b5Him(w)}.`; }, fx:()=>bruise(b52Who(), bruiseN())},
            go:'b5_c2_pilot_ok', fail:'b5_c2_pilot_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_pilot_ok:()=>({sp:'An old harbour pilot', scene:'b5_trate_harbour', fx:()=>{ S.f.b5_c2_pilotOk = 1; }, txt:
`He makes ${by({sgt:'you', _:'{who}'})} sit on the next bollard and watch the water off the end of the quay, and say when the next swell will break on the rocks, and where. ${by({sgt:'You are', _:'{who} is'})} wrong four times. The fifth time ${by({sgt:'you', _:'{who}'})} ${by({sgt:'see', _:'sees'})} it: before the swell, the water round it leans, a little, the way a man's shoulders go before his feet do.

"That," the pilot says. "Not sorcery. Nobody'll sing about it. Just looking at the right thing." He goes back to his own watching. "Watch the shape. It'll lie to you less than the thing does."`,
      ch:[{t:'"Thank you." Back along the quay.', go:()=>startExplore()}]}),
    b5_c2_pilot_no:()=>({sp:'An old harbour pilot', scene:'b5_trate_harbour', txt:
`${by({sgt:'You watch', _:'{who} watches'})} the water off the end of the quay until it is all the same water, and the swells break where they break, and none of them say anything first.

"You're watching the swell," the pilot says, not unkindly. "Everybody watches the swell." He spits in the harbour. "Come back when you can watch nothing."`,
      ch:[{t:'Back along the quay.', go:()=>startExplore()}]}),
    b5_c2_pilot_again:()=>({sp:'An old harbour pilot', scene:'b5_trate_harbour', again:()=>`The pilot on his bollard. "Still nothing coming in."`, txt:
`The pilot is on his bollard, watching the water. ${S.f.b5_c2_hulkDone ? '"I saw you go aboard her," he says, without turning. "And come off. More came off than went on, by the shape of it."' : '"Nothing coming in," he says. "Nothing for a while."'}${b52Key() === 'dead' && S.f.b5_c2_laid ? ' He looks along the quay at the row under the sailcloth, and takes his cap off, and puts it back on.' : ''}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the market: curios, bones and teeth, and a tooth for a dock ---- */
    b5_c2_market:()=>({sp:'A market stall', scene:'b5_trate_harbour', fx:()=>{ S.f.b5_c2_market = 1; },
      again:()=>`The curio stall. "Teeth, bones, Fent work, Nerek work. Cheap."`, txt:
`Lether's markets open the day after anything. A stall has been set up again on the dry stones behind the sheds: Fent carvings, Nerek beadwork, a tray of polished bones and a jar of teeth, long and curved and yellow, that nobody can put a name to. The stall-keeper cannot either. "Out of the ground up north," he says. "Or out of the sea. Somebody digs them up and somebody buys them. I'm the bit in between."

At the next stall a girl is selling paper flowers on wire for the dancers. Trate is known for its flower dancers, the stall-keeper says, and they have gone on dancing since the wave, in the square by the North Gate, because the town needs it more than it did. ${b52Say({tobet:`Tobet looks at the flowers for a while and does not buy one.`, perrit:`Perrit picks up a Nerek bracelet, turns it over, reads the price scratched on the back, and puts it down.`, _:'The squad looks, and keeps its docks.'})}`,
      ch:[{t:'A tooth from the jar.', tag:'1 dock', req:()=>(S.silver || 0) >= 1 && !(S.kit || []).includes('b5_c2_tooth'), fx:()=>{ S.silver -= 1; updSilver(); gain('b5_c2_tooth'); }, go:'b5_c2_tooth'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_tooth:()=>({sp:'A market stall', scene:'b5_trate_harbour', txt:
`He picks one out of the jar for you, the longest, and binds the root with copper wire so it can hang from a cord, and takes the dock. "What is it?" somebody asks, and he says, "A tooth," and that is all anyone in Trate ever knows about it.${b52If('ammet', `\n\nAmmet holds it up to the light and runs her thumb along it. "Not a fish," she says. "Not a horse. Not anything I've stitched." She gives it back.`)}`,
      ch:[{t:'Back along the quay.', go:()=>startExplore()}]}),

    /* ---- the cart of the drowned ---- */
    b5_c2_cartdead:()=>({sp:'The Legion\'s cart', scene:'b5_trate_harbour', txt:
`The Legion's cart for the drowned stands by the shed wall with its mule asleep in the shafts. Along the wall, under sailcloth, the ones still waiting for it. A Legion soldier with a slate counts them onto the cart and off it at the top of the town steps, and does not say the number.

${b52Say({ammet:`Ammet walks down the row once, lifting a corner here and there, and lets it fall again. "They came in with the water," she says. "Nothing to be done for any of these but the cart."`, thegg:`Thegg stands at the end of the row with his head down and says something low in his mother's tongue.`, _:'The squad stands by the row for a while.'})}`,
      ch:[{t:'Lend the Legion a hand with the cart.', req:()=>!S.f.b5_c2_cart, fx:()=>{ S.f.b5_c2_cart = 1; }, go:'b5_c2_cart_help'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_cart_help:()=>({sp:'The Legion\'s cart', scene:'b5_trate_harbour', txt:
`It is a short job and a heavy one. The squad lifts, and the cart fills, and the mule wakes up and objects, and the Legion soldier writes on his slate.

${b52Say({thegg:`Thegg takes the heavy end every time without being asked, and is careful with it.`, _:'Nobody in the squad talks while it is done.'})} When the cart goes, the soldier with the slate nods to the squad, once, which in the Legion is a great deal.`,
      ch:[{t:'Back along the quay.', go:()=>startExplore()}]}),

    /* ---- the flooded sheds: looters (optional) ---- */
    b5_c2_sheds:()=>({sp:'The flooded sheds', scene:'b5_trate_harbour', txt: S.f.b5_c2_lootDone ?
`The shed is empty, with water still standing on its floor and the owner's mark freshly painted on the door. Somebody has nailed it shut.` :
`The sheds along the back of the quay took the wave through their front doors and out through their back walls. Water still stands a hand deep on the floors. In this one, by the sound of it, somebody is going through what the wave left: nets, oil jars, a merchant's crates, a chest that is not theirs. They are not hurrying. The Legion is busy.${b52If('tobet', `\n\n"Four," Tobet says, low. "One with a sling, up on the crates."`)}`,
      ch:[{t:'"Whitefinders. Put it down." In through the door.', req:()=>!S.f.b5_c2_lootDone, go:()=>startBattle('b5_c2_looters', {})},
          {t:'Round the back, through the hole the wave made, quiet.', check:['guile', 13], req:()=>!S.f.b5_c2_lootDone,
            edges:id=>[id === 'tobet' && ['he was taught to be where the blow is not', 2], id === 'sgt' && ['you grew up round canal-side sheds', 1], id === 'pessa' && ['a barge-woman knows a shed', 1], id === 'thegg' && ['there is no quiet way for Thegg', -2], id === 'perrit' && ['the back of the shed is in the water', -1]],
            near:b52Owe(10, 'A Legion net, torn', w => `Yes, but ${b52Nm(w)} ${b52V(w, 'go', 'goes')} through a Legion net hung to dry on the way, and the Legion's quartermaster knows a Whitefinder's boot-print: ${b5Coin(10)} against ${b52Pos(w)} line.`, {t:w => `Yes, but ${b52Nm(w)} ${b52V(w, 'go', 'goes')} through the hole in the back wall into water up to the waist, and the looters hear the splash: rattled.`, fx:w => b52Rattle(w)}),
            go:()=>startBattle('b5_c2_looters', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c2_sheds_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_sheds_seen:()=>({sp:'The flooded sheds', scene:'b5_trate_harbour', txt:
`The back of the shed is further into the harbour than it looked. Somebody goes in to the chest, and the looters turn with their knives out and the one on the crates has a stone in his sling already.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b5_c2_looters', {surprise:'e'})}]}),
    b5_c2_looters_after:()=>({sp:'The flooded sheds', scene:'b5_trate_harbour', fx:()=>{ S.f.b5_c2_lootDone = 1; b52Docks(8, 'the shed-owners, through the harbour master, less his share'); }, txt:
`The looters go out through the hole in the back wall faster than they came in, and leave what they were holding in the water. The squad carries it out onto the quay and the harbour master writes it in his book, item by item: nets, oil, a chest of tools, a bolt of cloth ruined by the sea and still in the book.

The shed-owners pay the Sixth for it in the evening, through the harbour master, who keeps a share for writing it down. Eight docks come to the squad. ${b52Say({perrit:`Perrit works out what the share was, and says so, and the harbour master says that sounds about right.`, _:'Nobody asks what the share was.'})}`,
      ch:[{t:'Back along the quay.', go:()=>startExplore()}]}),

    /* ---- the first hulk at dusk ---- */
    b5_c2_gangplank:()=>({sp:'The first hulk', scene:'b5_c2_wrecks', txt: S.f.b5_c2_hulkDone ?
`The first hulk lies across the end of the long quay where the wave put her, and the Legion's men are aboard her by day now, cutting her loose a plank at a time. At night they leave her alone, and so does everything else.` : !S.f.b5_c2_hm ?
`A plank runs up from the quay to the rail of the ship on her side. A Legion soldier stands at the foot of it. "Harbour master's orders, soldier. Nobody aboard till he says."` :
`A plank runs up from the quay to the rail of the ship on her side. The tide is going off her. Up in the rigging, against the evening sky, the shapes are where they were.`,
      ch:[{t:'Up the plank. It is near enough to dusk.', req:()=>!!S.f.b5_c2_hm && !S.f.b5_c2_hulkDone, onward:true, go:'b5_c2_board_go'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_board_go:()=>({sp:'The first hulk · dusk', scene:'b5_c2_wrecks', txt:
`Dusk, and the tide off her. The light goes red on the water and then grey. The Legion's men on the quay find work further along it.

The plank is steep and wet, and at the top of it the rail is at the wrong angle, and the deck beyond it slopes like a roof.`,
      ch:[{t:'Aboard.', onward:true, go:()=>{ startExplore('b5_c2_hulk'); talk('b5_c2_board'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b5_c2_board:()=>({sp:'The first hulk · the deck', scene:'b5_c2_wrecks', fx:()=>{ S.f.b5_wraithSeen = 1; S.f.b5_c2_aboard = 1; }, txt:
`Everything on deck that was not tied down went over the side when she rolled, and everything that was tied down is still tied, at an angle. The masts lean out over the quay. The hatch amidships is open, and below it there is water, and the sound of water moving.

Up in the rigging, against the last of the light, there are shapes.

They are not birds; birds move. They are not sails. They hang where a man would hang if a man could hang from nothing, and when you look straight at one it is hard to say it is there, and when you look away it is.

${b52Say({perrit:`"That's sorcery," Perrit says, very quietly. "Not ours. Not any Hold I was taught." She has her hand on the tile pouch at her hip and keeps it there.`, _:'Nobody in the squad says the word. Everybody in the squad is thinking it.'})}${b52If('tobet', `\n\nTobet has an arrow on the string and nowhere to put it.`)}${b52If('thegg', `\n\nThegg moves to stand between the squad and the mast, without being asked, and says, "Behind me," to nobody in particular.`)}

You touch the white fingertip on your shield's boss, for the Errant.`,
      ch:[{t:'The hatch.', go:'b5_c2_hatch'},
          {t:'Walk the deck.', go:()=>startExplore()}]}),
    b5_c2_rigging:()=>({sp:'The first hulk · the mast', scene:'b5_c2_wrecks', txt: S.f.b5_c2_hulkDone ?
`The mast leans out over the quay with its rigging hanging. There is nothing in it now but rope.` :
`You look up the mast. The rigging goes up into the dusk in a black net, and in it, three spans up, something slides down a span, and stops, and is still. Two pale points where a face would be. Then you blink, and it is rigging.${b52If('ammet', `\n\nAmmet looks up beside you and then looks at you. "Don't look at them," she says. "Look at the hatch. That's the job."`)}`,
      ch:[{t:'Back along the deck.', go:()=>startExplore()}]}),
    b5_c2_hatch:()=>({sp:'The hatch', scene:'b5_c2_hold', txt: S.f.b5_c2_hulkDone ?
`The hold is empty now except for the water, and the benches, and the cold.` :
`The hatch is a square of black with a ladder going down into it. The smell that comes up is the sea, and the spring's catch, and under those something nobody in the squad wants to name.

Below, the water moves, slow, the way water moves when something is in it.`,
      ch:[{t:'Down the ladder, shields first.', req:()=>!S.f.b5_c2_hulkDone, go:()=>startBattle('b5_c2_hulk', {})},
          {t:'Down quiet, with the lamp hooded.', check:['wits', 14], req:()=>!S.f.b5_c2_hulkDone,
            edges:id=>[id === 'tobet' && ['he was taught to be somewhere the blow is not', 2], id === 'ammet' && ['she keeps calm, which is most of being quiet', 1], id === 'sgt' && ['you have gone down into worse cellars', 1], id === 'thegg' && ['the ladder was built for a smaller man', -1], id === 'perrit' && ['the hold is full of water, and she is going into it', -1]],
            near:b52Owe(6, 'A Legion lamp, lost in a hold', w => `Yes, but the lamp goes out of ${b52Pos(w)} hand and into the water with a hiss, and the Legion's quartermaster will have a word with ${w === 'sgt' ? 'you' : b5Him(w)} about lamps: ${b5Coin(6)} against ${b52Pos(w)} line.`, {t:w => `Yes, but the lamp goes into the water and ${b52Nm(w)} ${b52V(w, 'go', 'goes')} into the dark after it, and comes up shaking: rattled.`, fx:w => b52Rattle(w)}),
            go:()=>startBattle('b5_c2_hulk', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c2_hatch_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_hatch_seen:()=>({sp:'The hold', scene:'b5_c2_hold', txt:
`Halfway down, the ladder creaks. Every shape in the hold turns at once, without turning, the way a flock does, and two pale points look up the ladder.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c2_hulk', {surprise:'e'})}]}),
    b5_c2_hulk_after:()=>({sp:'The first hulk', scene:'b5_c2_hold', fx:()=>{ S.f.b5_c2_hulkDone = 1; S.f.b5_c2_ph = Math.max(2, S.f.b5_c2_ph || 1); }, txt:
`The last of them goes up into nothing, and the coat it was wearing falls on the deck and lies there, sodden, with nothing in it.

Then the work. The crew is still aboard, at the benches in the hold where the wave found them. The squad carries them up the ladder one at a time, wrapped in sailcloth, and lays them on the quay for the Legion's carts. It takes until full dark. ${b52Say({ammet:`Ammet looks at each one as it comes up, quickly, and keeps what she sees to herself.`, _:'Nobody in the squad says much while it is done.'})}${b52If('tobet', `\n\nTobet counts them, under his breath, and then stops counting, and cuts no notch for it.`)}${b52If('perrit', `\n\nPerrit sits on the quay afterwards with her back to the town and her face to the hulk, and her hands are shaking, and she lets them.`)}`,
      ch:[{t:'Down the plank to the harbour master.', go:()=>{ startExplore('b5_c2_quay'); talk('b5_c2_hulk_report'); }}]}),
    b5_c2_hulk_back:()=>({sp:'The plank', scene:'b5_c2_wrecks', txt: S.f.b5_c2_hulkDone ?
`The plank goes back down to the quay.` :
`The plank goes back down to the quay. The hold is still below you, and the harbour master's chalk says this hulk, tonight.`,
      ch:[{t:'Down the plank.', go:()=>startExplore('b5_c2_quay')},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_hulk_report:()=>({sp:'The harbour master', scene:'b5_c2_wrecks', fx:()=>{ if (!S.f.b5_c2_paid1) { S.f.b5_c2_paid1 = 1; b52Docks(10, 'the Legion\'s rate for a cleared hulk, of which the Legion keeps the larger part'); gain('b5_c2_gaff'); } }, txt:
`The harbour master is at his board by lamplight. He listens to it all, and writes it in his book, the crew's count too, and then wipes the first hulk off his board and chalks it again under *Cleared*.

"The Legion's rate for a cleared wreck," he says, and counts ten docks into your hand, "of which the Legion keeps the larger part, and so do I." He holds out a harbour gaff, a long ash pole with an iron hook and a spike. "And one of these. You'll want it in the morning. Everybody does."

He looks at the hulk, and then at the squad. "Nobody's come off her before," he says. "Not after dark." He writes that down too. "The Sixth's lines are on the strand, south of the quays, by the Shake boats. Get some sleep."`,
      ch:[{t:'To the strand.', onward:true, go:()=>{ startExplore('b5_c2_strand'); talk('b5_c2_strand_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_to_strand:()=>({sp:'The way to the strand', scene:'b5_trate_harbour', txt: b52Ph() === 1 ?
`The strand is south of the quays, where the Sixth's lines are going up. The harbour master wants the first hulk cleared before anybody pitches a tent, and so does the Finadd.` :
`Down past the last shed and onto the shingle: the strand, the Shake boats, and the Sixth's fire.`,
      ch:[{t:'Down to the strand.', req:()=>b52Ph() >= 2, onward:true, go:()=>startExplore('b5_c2_strand')},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_to_quay:()=>({sp:'The way to the quays', scene:'b5_c2_strand', txt:
`Up off the shingle and along the back of the sheds to the harbour front.`,
      ch:[{t:'Up to the quays.', onward:true, go:()=>startExplore('b5_c2_quay')},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the strand: the Sixth's lines, the Shake boats ---- */
    b5_c2_strand_arrive:()=>({sp:'The strand', scene:'b5_c2_strand', txt:
`South of the quays the harbour wall ends and the shore goes on as shingle, and then sand, under a bank of dune grass. The Sixth's tents are up along the top of it, above the tide-line, and the company's fire is lit.

Below the tents, drawn up on the shingle, are boats: long, low, black-tarred, a dozen of them, with fires of their own beside them. The Shake have come up the coast. When a wave takes a harbour, the Shake come, for the drowned and for the salvage, and they work both, and the harbour master pays them for one and complains about the other.

${b52Say({ammet:`Ammet is already walking down to the nearest Shake fire, where somebody is holding a cut hand out to the light.`, thegg:`Thegg sits down on the shingle as if somebody had taken his legs, and stays there.`, _:'The squad stands at the top of the strand and lets the sea be the loudest thing for a while.'})}`,
      ch:[{t:'To the fire.', go:'b5_c2_fire'},
          {t:'Walk the strand.', go:()=>startExplore()}]}),

    /* the fire: a rest, the pay desk, the squad, the way on (the games pass, 89, wraps this node: keep the id) */
    b5_c2_fire:()=>{ const ph = b52Ph(), k = b52Key();
      return {sp:'The Sixth\'s fire on the strand', scene:'b5_c2_strand', again:()=> ph >= 4 ? 'The fire on the strand, the last night. The Finadd is coming down the shingle.' : ph === 3 ? (k ? 'The fire on the strand. The chests are on the quay, or the dead are; the night is the same either way.' : 'The fire on the strand, weeks on. Something is posted on the harbour master\'s board.') : 'The Sixth\'s fire on the strand, wreck-wood burning green at the edges.', txt:
`${ph >= 4 ? `The Sixth's fire on the strand, the night after. The harbour is clearer than it has been since the wave. The Shake are mending nets at their own fires. Up in the town, somebody is ringing a bell that is not the alarm bell, and then another one answers it.` : ph === 3 ? `The fire on the strand, weeks on. The harbour is half cleared: the quays are mostly planking again, the sheds have doors, and the gulls have finished the fish. Two hulks are left, the one with her bow on the stone and the one on the rocks, and the shapes are still in their rigging.` : `The Sixth's fire on the strand, driftwood and wreck-wood, burning green at the edges where the salt is in it. The sea comes in and goes out in the dark a few paces off. Along the shingle the Shake's fires burn by their boats, and the boats are drawn up black against the water.`}${b52If('brune', () => ph < 4 ? `\n\nBrune sits at the edge of the firelight with her feet in the wash, and her fish-spear across her knees.` : '')}`,
        ch:[b5TileChoice(2),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f['b5_c2_rest' + ph], fx:()=>{ S.f['b5_c2_rest' + ph] = 1; b5Rest('The squad sits an hour by its own fire on the strand, with the sea for company. Wounds close, mostly.'); }, go:'b5_c2_fire_rest'},
            {t:'The pay desk, at the clerk\'s tent.', go:'b5_c2_pay'},
            {t:'Talk with the squad.', go:'b5_c2_fire_talk'},
            {t:'Brune comes up from the water to Ammet, holding out her hand.', req:()=>ph >= 2 && b5In('brune') && b5In('ammet') && !S.f.b5_bruneHook, go:'b5_c2_hook'},
            {t:'Sleep. The work goes on in the morning, and the morning after.', req:()=>ph === 2 && !!S.f.b5_c2_hulkDone, onward:true, go:'b5_c2_weeks'},
            {t:'Up to the quay. The harbour master has posted something.', req:()=>ph === 3 && !k, onward:true, go:()=>{ startExplore('b5_c2_quay'); talk('b5_c2_bounty'); }},
            {t:'Somebody is on the quay at the salvage chests.', req:()=>ph === 3 && k === 'salvage' && !!S.f.b5_c2_hauled && !S.f.b5_c2_wreckDone, onward:true, go:'b5_c2_wreck_start'},
            {t:'Back to the quay, where the dead are laid.', req:()=>ph === 3 && k === 'dead' && !S.f.b5_c2_tideDone, onward:true, go:()=>{ startExplore('b5_c2_quay'); talk(S.f.b5_c2_laid ? 'b5_c2_tide_start' : 'b5_c2_dive'); }},
            {t:'The Finadd is coming down the strand with a runner.', req:()=>ph >= 4, onward:true, go:'b5_c2_war'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c2_fire_rest:()=>({sp:'The Sixth\'s fire on the strand', scene:'b5_c2_strand', txt:
`An hour on the warm shingle by the fire, while the sea goes in and out.

${b52Say({ammet:`Ammet goes round the squad without asking and looks at hands and feet, and at the rope burns from the gaffs, and puts salve on the worst of them out of her own pot, and says "still" to anyone who moves.`, thegg:`Thegg lies on his back on the shingle, which is the first bed in a month long enough for him, and goes to sleep at once.`, _:'One of them sleeps. The others listen to the sea.'})}${b52If('tobet', `\n\nTobet cuts a notch in his tally-stick, and then sits looking at the hulks out on the rocks, with the stick across his knees.`)}${b52If('brune', `\n\nBrune does not come up to the fire. She sleeps by the water, rolled in a sealskin, with one hand in the wash.`)}`,
      ch:[{t:'Back to the fire.', go:'b5_c2_fire'}]}),
    b5_c2_fire_talk:()=>{ const ph = b52Ph(), k = b52Key(), ln = [];
      if (b5In('tobet')) ln.push(ph >= 4 ? (k === 'salvage' ? `Tobet has worked out his share of the forty. "Eight docks," he says, "if you spread it over the paybooks." He looks at his tally-stick, which is mostly notches. "Eight's a lot of notches. It doesn't look like much."` : `Tobet is looking at the quay, where the shells are still lying in a row on the planks. "Nobody paid us for that," he says. He sounds surprised that he doesn't mind.`) : `Tobet is watching the hulks out on the rocks. "They're still up there," he says. "In the rigging. You can see them when you don't look." He keeps not looking, very carefully.`);
      if (b5In('thegg')) ln.push(ph >= 4 ? `Thegg has his back against a drawn-up boat, which creaks. "Up the river," he says. "Away from the sea." He thinks about it. "I will miss the sea. My mother never saw it."` : `Thegg sits with his back to a drawn-up boat and talks low, in his mother's people's tongue, to nobody at the fire. When he sees you listening he stops. "There are a great many new ones here," he says. "I tell them the way."`);
      if (b5In('perrit')) ln.push(ph >= 4 ? `Perrit is laying her tiles out and putting them away again without turning them. "War," she says. "The cadre will be sent somewhere. Not with us. Somewhere important." She ties the pouch. "I hope it is very far from water."` : `Perrit sits on the landward side of the fire, so the sea is in front of her where she can see it. "What was in that rigging," she says, "was held. Somebody was holding it. A long way off." She does the sum of how far, and does not like the answer, and says so.`);
      if (b5In('ammet')) ln.push(ph >= 4 ? `Ammet is packing her roll of tools, each one in its pocket, the same order as always. "Barges," she says. "Good. You can sew on a barge. You can't sew on a horse."` : `Ammet is boiling her needles in a pot of seawater. "Salt's good for it," she says. "So's the fire. So's not drinking." She is not drinking.`);
      if (b5In('brune')) ln.push(ph >= 4 ? `Brune is at the water's edge, as always. "The river runs into the sea," she says, when you come down to her. "So it is the Shore's too. Only further up." She seems content with that.` : `Brune sits at the water's edge with her feet in the wash, a little apart from the fire. "The Shore takes everything back," she says, when you come down to her. "I would just like it to wait."`);
      if (b5In('ruuk')) ln.push(`Ruuk is up on the dune bank, looking inland. "Gulls," he says. "Nothing but gulls. The hills are better. The hills have forty birds."`);
      if (b5In('pessa')) ln.push(`Pessa sits with her boathook upright beside her, looking at the Shake boats. "Good boats," she says. "No tax on a boat that isn't in a harbour." She thinks about it. "Yet."`);
      return {sp:'The Sixth\'s fire on the strand', scene:'b5_c2_strand', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b5_c2_fire'}]}; },

    /* the fish-hook (Brune's bio): only if both are here */
    b5_c2_hook:()=>({sp:'The Sixth\'s fire on the strand', scene:'b5_c2_strand', fx:()=>{ S.f.b5_bruneHook = 1; }, txt:
`Brune comes up from the water with a fish-hook through the meat of her palm, the barb out the back of her hand, and holds it out to Ammet across the fire.

"Don't make a fuss," she says.

Ammet doesn't. She takes the hand and turns it to the light, cuts the barb off with a pair of pliers, backs the shank out the way it went in, washes it with spirit and binds it, and the whole of it takes less time than telling it. Brune watches the sea the whole time.

"Hold still," Ammet says, once, though Brune has not moved.

"Thank you," Brune says, and goes back down to her nets. Ammet goes back to her needles. Neither of them mentions it again.`,
      ch:[{t:'Back to the fire.', go:'b5_c2_fire'}]}),

    /* the pay desk (80's b5PayChoices), at the clerk's tent */
    b5_c2_clerk:()=>({sp:'The company clerk', scene:'b5_c2_strand', html:debtHTML('The Sixth Company · Trate'), fx:()=>{ S.f.b5_c2_clerk = 1; },
      again:()=>`The clerk's tent. The paybooks are dry, which in Trate is an achievement.`, txt:
`The company clerk has pitched his tent at the top of the strand, as far from the water as the dune bank allows, and has the oilskin case on his knees inside it. The paybooks are dry. He checks that they are dry several times an hour.

"The Legion pays us by the wreck," he says, "through the harbour master, less the harbour master. I have written down what he keeps." A pause. "He has written down what I wrote down. We are both very thorough."${S.f.b5_c1_key === 'pay' ? `\n\nHe turns to the court's fine, five lines in his own small hand. "Still there," he says. "They will be for some time."` : S.f.b5_c1_key === 'swim' ? `\n\nHe turns to Thegg's line, and the court's fee for the rope. "Forty docks for a rope," he says. "I have checked. That is what they charge."` : ''}`,
      ch:[{t:'The pay desk.', go:'b5_c2_pay'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_pay:()=>({sp:'The clerk\'s tent · the pay desk', scene:'b5_c2_strand', html:debtHTML('The Sixth Company · Trate'), again:()=>`The pay desk. The clerk's pen is wet, and the squad has ${b5Coin(S.silver || 0)} in hand.`, txt:
`The clerk wets his pen. "Anything the squad pays down out of its own docks, I write as paid, today, in front of you," he says. "The holders get it at the quarter. In Trate it goes by sea." He considers this. "Usually."`,
      ch:b5PayChoices('b5_c2_fire')}),

    /* the quartermaster: salves at six docks */
    b5_c2_qm:()=>({sp:'The quartermaster', scene:'b5_c2_strand', fx:()=>{ S.f.b5_c2_qm = 1; }, again:()=>`The quartermaster, counting. "Salves, six. The sea doesn't change the price."`, txt:
`The quartermaster has set up on the strand behind a barricade of the company's barrels and is counting them against the list, and finding one more barrel than he brought, and is not happy about that either. His salves are in a dry crate on top: Letherii field salve, in waxed paper.

"Six docks," he says. "Docks. Not the Legion's chits, not the harbour master's book, not salvage. I have been offered a quarter of a drowned man's boat for a salve this week." He writes something down. "I said no."`,
      ch:[{t:'A salve.', tag:'6 docks', req:()=>(S.silver || 0) >= 6, fx:()=>{ S.silver -= 6; S.inv.salve = (S.inv.salve || 0) + 1; updSilver(); note('A salve, for six docks.', 'good'); }, go:'b5_c2_qm'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the tile-woman: she reads when Perrit doesn't */
    b5_c2_tilewoman:()=>({sp:'The tile-woman', scene:'b5_c2_strand', fx:()=>{ S.f.b5_c2_tw = 1; }, txt:
`The tile-woman has followed the company up the north road on the back of the quartermaster's cart, and sits now on an upturned crate at the top of the strand, with her bag of oiled cloth in her lap, watching the Shake. She spits to one side when you come over.

${b5In('perrit') ? `"The Shake read the sea," she says. "Not tiles. The sea, and the birds on it." She considers this, professionally. "It's cheaper. Nobody charges for the sea." She does not offer a reading. Your mage does that.` : `"No mage," she says. "Then it's bone, and it's a dock." She shakes the bag, and it clicks. "Sit, if you want it."`}`,
      ch:[Object.assign(b5TileChoice(2), {req:()=>!b5In('perrit') && !S.f.b5_c2_drawn && !S.f.b5_c2_noCard}),
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the Shake: Brune (the recruit), the boats, a Shake woman ---- */
    b5_c2_brune:()=>({sp:'Brune, of the Shake', scene:'b5_c2_strand', fx:()=>{ S.f.b5_c2_metBrune = 1; },
      again:()=>`Brune, by her boat, with the fish-spear. "Sergeant."`, txt:
`By one of the Shake boats a young woman is sitting on the shingle with her feet in the wash and a fish-spear across her knees: a long ash shaft and a barbed iron head, kept very clean. When the squad comes down to the boats she stands up, and waits, and then says what she came to say.

"I am Brune. Of the Shake." A long silence, in which the sea does most of the talking. "The harbour pays the soldiers by the wreck. The soldiers need hands that know a boat, and a net, and the water in a hold. I know those." She lifts the fish-spear a little. "And this. It is mine. I owe nobody for it."

Another silence. "I owe the harbour sixty docks, for a boat the harbour tax took. The army pays that down out of a soldier's pay, so it stops growing. I asked."${b52If('ammet', `\n\nAmmet is looking at the way Brune holds the spear, which is the way a person holds a thing they have used on more than fish. She does not mention it.`)}${b52If('thegg', `\n\nThegg nods to her, slowly, one big person to another, though she comes up to his chest.`)}`,
      ch:[{t:'"Walk with us."', fx:()=>{ b5Join('brune'); }, go:'b5_c2_brune_join'},
          {t:'"Stay with your boats for now. We know where to find you."', fx:()=>{ b52Wait(); }, go:'b5_c2_brune_wait'},
          {t:'"The Sixth can\'t take you."', fx:()=>{ S.f.b5_bruneDone = 0; }, go:'b5_c2_brune_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_brune_join:()=>({sp:'Brune, of the Shake', scene:'b5_c2_strand', txt: b5In('brune') ?
`Brune nods, once, as if a price had been agreed, and picks up a sealskin roll from the boat and puts it on her shoulder.

The company clerk, fetched from his tent, writes her into the paybooks by lamplight: a new line, sixty docks, a boat. She watches him do it, and reads it upside down, and nods again. "That is right," she says. He looks pleased, briefly, and then suspicious.${b52If('perrit', `\n\nPerrit looks at the spear. "Do you read tiles?" she asks. "No," Brune says. "I read the sea." Perrit seems relieved.`)}` :
`Brune nods, once. Then she looks at the squad, and counts it, the way the Shake count a boat's crew, and sits down again by her boat. "There is no room on your bench," she says. "I will be here. Call me from the fire."`,
      ch:[{t:'Back to the fire.', go:'b5_c2_fire'},
          {t:'Walk the strand.', go:()=>startExplore()}]}),
    b5_c2_brune_wait:()=>({sp:'Brune, of the Shake', scene:'b5_c2_strand', txt:
`"For now," Brune says. She sits back down on the shingle by her boat with her feet in the wash. "The Shore is patient. So am I." The clerk, fetched from his tent, writes her into the paybooks anyway, on a page of her own, against the day.`,
      ch:[{t:'Back to the fire.', go:'b5_c2_fire'},
          {t:'Walk the strand.', go:()=>startExplore()}]}),
    b5_c2_brune_no:()=>({sp:'Brune, of the Shake', scene:'b5_c2_strand', txt:
`Brune looks at you for a while, and then nods, and sits down by her boat again, and goes back to the sea. In the morning the Shake boat is a little further along the strand, and in the evening a little further still.`,
      ch:[{t:'Back to the fire.', go:'b5_c2_fire'},
          {t:'Walk the strand.', go:()=>startExplore()}]}),
    b5_c2_brune_again:()=>({sp:'Brune, of the Shake', scene:'b5_c2_strand', again:()=>`Brune, by her boat. "Sergeant."`, txt:
`Brune is by her boat, mending a net with the fish-spear stuck upright in the shingle beside her. "Sergeant," she says, and waits.`,
      ch:[{t:'"Walk with us now."', req:()=>b5Waiting('brune') && (b5Room() > 0 || !!b5Recruit_()), fx:()=>{ b5SwapIn('brune'); }, go:'b5_c2_brune_join'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_boats:()=>({sp:'The Shake boats', scene:'b5_c2_strand', txt:
`The Shake boats are long and low and black with tar, built for beaches, not harbours, with a high prow carved into nothing in particular. Each has its family's fire beside it. The Shake are mending nets, salting fish, sleeping in the boats' shadow. They watch the Sixth without much interest.

${S.f.b5_bruneDone == null ? 'By one of the boats, a young woman with a fish-spear across her knees is watching the soldiers with a great deal more interest than the rest.' : b5In('brune') ? `${b52Say({brune:'Brune walks along the boats with you, and nods to each fire, and each fire nods back.', _:''})}` : 'The Shake go on with their nets.'}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_shakewoman:()=>({sp:'A Shake woman', scene:'b5_c2_strand', fx:()=>{ S.f.b5_c2_shake = 1; }, again:()=>`The Shake woman at her boat. "Soldiers."`, txt:
`A broad Shake woman with grey in her hair is trying to get her boat up the shingle above the tide-line on her own, with a rope over her shoulder and the boat not going anywhere.

"The Shore takes everything back," she says, when she sees the squad watching, in a voice that suggests she has said it a great many times this month. "We come to see it done properly. The harbour pays us for the drowned and calls the rest stealing." She leans on the rope. "The boat is not interested in either."`,
      ch:[{t:'Get a shoulder to the boat.', check:['might', 13], req:()=>!S.f.b5_c2_boatTried, fx:()=>{ S.f.b5_c2_boatTried = 1; },
            edges:id=>[id === 'thegg' && ['there is a great deal of him to push with', 2], id === 'brune' && ['she has dragged this kind of boat up every beach on the coast', 2], id === 'pessa' && ['she has hauled barges', 1], id === 'perrit' && ['she is small and the boat is not, and it is in the water', -1], id === 'tobet' && ['he is all bow arm and no back', -1]],
            near:{t:()=>`Yes, but the boat comes up all at once and the rope takes the skin off ${b52Pos(b52Who())} palms.`, fx:()=>bruise(b52Who(), bruiseN())},
            go:'b5_c2_boat_ok', fail:'b5_c2_boat_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_boat_ok:()=>({sp:'A Shake woman', scene:'b5_c2_strand', fx:()=>{ S.f.b5_c2_boatOk = 1; S.inv.salve = (S.inv.salve || 0) + 1; note('A Shake salve in a shell: fish-oil and something green.', 'good'); }, txt:
`The boat comes up the shingle with a long grinding noise and stops above the weed, and the Shake woman makes the rope fast to a stake and looks at ${by({sgt:'you', _:'{who}'})} with approval.

She gives ${by({sgt:'you', _:'{who}'})} a salve in a clam shell, closed with wax: fish-oil and something green and sharp. "For rope burns," she says. "And for soldiers. Same thing, mostly."${b52If('ammet', `\n\nAmmet opens it and smells it and closes it. "That's good," she says, surprised. "I'll want to know what's in it."`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_boat_no:()=>({sp:'A Shake woman', scene:'b5_c2_strand', txt:
`The boat rocks, and settles back into the wet shingle deeper than before. The Shake woman looks at the squad, and sighs, and whistles, and two of her sons come up from the next fire and walk it up the beach between them without seeming to try.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the weeks of the harbour ---- */
    b5_c2_weeks:()=>({sp:'The harbour, weeks on', scene:'b5_trate_harbour', fx:()=>{ if (!S.f.b5_c2_weeks) { S.f.b5_c2_weeks = 1; S.f.b5_c2_ph = 3; b52Docks(6, 'the Legion\'s harbour money, after deductions'); } }, txt:
`The work goes on, and the days go with it.

By day the squad drags the drowned out of the water with the Legion's gaffs and lays them on the carts, and the carts go up into the town. By day it cuts the wreckage loose from the quays a plank at a time, and the harbour master chalks it off his board. By night it stands watch on the waterfront with a lamp, against looters, and against the two hulks still out on the stone and the rocks, where the shapes stay in the rigging and do not come down.

Rumour comes down the quays from the Legion's officers: the King's delegation has sailed north to the Edur, the Prince and the First Eunuch, with Finadd Moroch Nevath and Finadd Gerun Eberict, to talk about the seals. "About the price of them," a docker says. "Lether always talks about the price."

On the first of the month the Legion pays the Sixth its harbour money: six docks to the squad, after deductions. ${b52Say({perrit:'Perrit reads the deductions out loud, one by one, to the Legion\'s paymaster, who had not planned on anybody reading them.', _:'The deductions are read out loud by nobody, which is how the Legion likes them.'})}`,
      ch:[{t:'Take the night watch on the waterfront yourself, one night.', check:['wits', 13], req:()=>!S.f.b5_c2_watchTried, fx:()=>{ S.f.b5_c2_watchTried = 1; },
            edges:id=>[id === 'tobet' && ['he sees far, and he sees in the dark', 2], id === 'brune' && ['she knows what a boat sounds like on a night tide', 2], id === 'sgt' && ['you have stood a hundred watches', 1], id === 'thegg' && ['he is very easy to see', -1]],
            near:{t:()=>`Yes, but it takes the whole night, and ${b52Nm(b52Who())} ${b52V(b52Who(), 'come', 'comes')} back to the strand at dawn with no sleep in ${b52Who() === 'sgt' ? 'you' : b5Him(b52Who())}: no rest at the fire tonight.`, fx:()=>{ S.f.b5_c2_rest3 = 1; }},
            go:'b5_c2_watch_ok', fail:'b5_c2_watch_no'},
          {t:'Back to the fire.', go:()=>{ startExplore('b5_c2_strand'); talk('b5_c2_fire'); }}]}),
    b5_c2_watch_ok:()=>({sp:'The night watch', scene:'b5_c2_wrecks', fx:()=>{ S.f.b5_c2_watchOk = 1; b52Docks(5, 'a looter\'s purse, handed in and handed back'); }, txt:
`Past midnight, with the lighthouse turning, a skiff comes round the end of the long quay with its oars muffled and three men in it, making for the hulk on the rocks. ${by({sgt:'You see', _:'{who} sees'})} it before it is halfway, and the lamp goes up, and the Legion's whistle goes, and the skiff turns round and goes back the way it came a great deal faster, and drops something over the side to lighten itself.

In the morning the tide leaves it on the shingle: a purse, sodden, with five docks in it. The harbour master writes it in his book and hands it back. "Finder's fee," he says. "It's in the book now. That makes it yours."`,
      ch:[{t:'Back to the fire.', go:()=>{ startExplore('b5_c2_strand'); talk('b5_c2_fire'); }}]}),
    b5_c2_watch_no:()=>({sp:'The night watch', scene:'b5_c2_wrecks', txt:
`A long night with a lamp, and the lighthouse turning, and the sea doing what it does. In the morning a Legion boat finds the hulk on the rocks has been gone over in the night by somebody with a skiff. Nobody on the watch saw a thing.`,
      ch:[{t:'Back to the fire.', go:()=>{ startExplore('b5_c2_strand'); talk('b5_c2_fire'); }}]}),

    /* ---- the key: the harbour master's bounty ---- */
    b5_c2_bounty:()=>({sp:'The harbour master', scene:'b5_c2_wrecks', fx:()=>{ S.f.b5_c2_ph = Math.max(3, S.f.b5_c2_ph || 1); },
      again:()=>`The harbour master at his board, under the new notice. "One tide, Sergeant. One or the other."`, txt: b52Key() ?
`The notice is still nailed to the harbour master's board. ${b52Key() === 'salvage' ? 'The cargo line has a chalk mark through it: landed.' : 'Under the second line, in fresh chalk: *Brought out. The Sixth.*'}` :
`A new notice is nailed to the harbour master's board, in good square paint, with the harbour's seal. *Salvage: the cargo of the harvest ships, by weight, to the harbour, at a bounty. The dead to be landed for burial at the Legion's charge.*

The harbour master taps the first line with his gaff. "The second hulk," he says, "the one with her bow on the stone. Her hold's full: furs, oil, sealskins, tools, a season's catch. Forty docks of bounty to whoever lands it. Today, at the bottom of the tide." He taps the second line. "And the dead. They're still aboard her. The Legion will pay to bury them, when somebody brings them out. Nobody has."

He looks at the tide, and does not say which comes first. "One tide, Sergeant. Your squad can do one or the other before it turns. Not both. The other will keep." He considers this. "One of them will keep."

${b52Say({ammet:`"They've been in there since the spring," Ammet says. "Somebody is waiting for them to come home."`, _:''})}${S.f.b5_c1_key === 'pay' ? b52If('perrit', `\n\nPerrit is already doing the sums. "Forty docks," she says. "Over the paybooks, that's eight a line. The first eight anybody's taken off since Letheras." She hates that it is tempting, and says so, which helps nobody.`) : S.f.b5_c1_key === 'swim' ? b52If('thegg', `\n\nThegg is looking at the second hulk's flooded hold. "Somebody will have to go down into her either way," he says. "I have been under once this year already."`) : ''}${b5In('brune') ? `\n\nBrune looks at the hulk for a long time. "The Shore will want them back either way," she says. "The cargo and the crew."` : b5Waiting('brune') ? `\n\nDown on the strand the Shake are standing by their boats, watching the second hulk. Brune is among them, with her fish-spear.` : ''}`,
      ch:[{t:'"The harbour\'s coin first. Land the cargo."', req:()=>!b52Key(), fx:()=>{ S.f.b5_c2_key = 'salvage';
              b52Docks(40, 'the harbour master\'s salvage bounty'); if (b52Near()) { b5Forgive('brune', 30, 'The harbour master\'s salvage bounty'); S.f.b5_c2_forgiven = 30; }
              b52L('tobet', 1); b52L('perrit', 1); b52L('brune', -1); b52L('ammet', -1); }, go:'b5_c2_dive'},
          {t:'"The drowned first. Bring out the dead."', req:()=>!b52Key(), fx:()=>{ S.f.b5_c2_key = 'dead';
              b52BruneL(2); b52L('ammet', 1); b52L('thegg', 1); }, go:'b5_c2_dive'},
          {t:'Down into the second hulk.', req:()=>!!b52Key() && !(S.f.b5_c2_hauled || S.f.b5_c2_laid), go:'b5_c2_dive'},
          {t:'"Not yet."', req:()=>!b52Key(), go:()=>startExplore()},
          {t:'Not now.', req:()=>!!b52Key(), go:()=>startExplore()}]}),

    /* the dive into the second hulk's hold, either way (Ch1 swim: Thegg goes down, +2) */
    b5_c2_dive:()=>({sp:'The second hulk', scene:'b5_c2_hold', txt:
`The second hulk at the bottom of the tide: her bow up on the stone, her stern in the harbour, and her hold flooded to the beams. ${b52Key() === 'salvage' ? 'The cargo is down there, in bales and chests, and it will not come up by itself.' : 'The crew is down there, at the benches, and they will not come up by themselves.'} Somebody has to go down into the water with a rope.

${S.f.b5_c1_key === 'swim' && b5In('thegg') ? `Thegg is already taking his shirt off. "I have been under once this year already," he says, and ties the rope round his own chest, a turn and a knot at the back, the way the rope-man did.` : b52Say({brune:`Brune is already at the edge of the hatch with the rope in her hand. "The water in a hold is like the water anywhere," she says. "Only darker."`, _:'The rope is ready. The water in the hatch is black.'})}`,
      ch:[{t:'Down into the hold, on the rope.', check:['might', 14], req:()=>!S.f.b5_c2_dived, fx:()=>{ S.f.b5_c2_dived = 1; },
            edges:id=>[id === 'thegg' && S.f.b5_c1_key === 'swim' && ['he swam the Quillas Canal with the court\'s three hundred docks tied to him', 2], id === 'brune' && ['the sea is hers', 2], id === 'sgt' && ['you swim, and have never said so', 1], id === 'pessa' && ['she was raised on a canal', 1], id === 'perrit' && ['she will not go into the water', -2], id === 'tobet' && ['all bow arm and no breath', -1]],
            near:{t:()=>`Yes, but ${b52Nm(b52Who())} ${b52V(b52Who(), 'come', 'comes')} up the last time with a lungful of the harbour, and Ammet has to thump it out: bruised, and rattled.`, fx:()=>{ bruise(b52Who(), bruiseN()); b52Rattle(b52Who()); }},
            go:'b5_c2_dive_ok', fail:'b5_c2_dive_no'},
          {t:'On.', req:()=>!!S.f.b5_c2_dived, go:()=>talk(b52Key() === 'dead' ? 'b5_c2_laid' : 'b5_c2_hauled')},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_dive_ok:()=>({sp:'The second hulk', scene:'b5_c2_hold', txt:
`${by({sgt:'You go', _:'{who} goes'})} down into the black water on the rope, and up, and down again, and each time the rope comes up heavier. It is cold enough to stop the heart and does not quite. By the turn of the light it is done, and done well, and the harbour master's clerk on the quay has run out of chalk.`,
      ch:[{t:'On.', go:()=>talk(b52Key() === 'dead' ? 'b5_c2_laid' : 'b5_c2_hauled')}]}),
    b5_c2_dive_no:()=>({sp:'The second hulk', scene:'b5_c2_hold', txt:
`${by({sgt:'You go', _:'{who} goes'})} down into the black water on the rope and come${by({sgt:'', _:'s'})} up with nothing but cold, twice, and the third time the rope fouls on a bench and has to be cut. In the end it is done the slow way, with hooks and the Legion's gaffs from the hatch, a piece at a time, and it takes the whole of the tide.`,
      ch:[{t:'On.', go:()=>talk(b52Key() === 'dead' ? 'b5_c2_laid' : 'b5_c2_hauled')}]}),

    /* 'salvage': the cargo landed; that night, the wreckers */
    b5_c2_hauled:()=>({sp:'The quay', scene:'b5_trate_harbour', fx:()=>{ if (!S.f.b5_c2_hauled) { S.f.b5_c2_hauled = 1; gain('b5_c2_sealcoat'); } }, txt:
`The cargo comes up out of the second hulk and onto the quay: bales of skins, jars of oil, a chest of a poacher's tools, a season's catch that went a long way north to be caught. The harbour master weighs it on the Legion's scales, writes it in the book, and pays the bounty, and has the chests stacked under a tarpaulin on the quay with a Legion lamp on top, to be carted up to the harbour's store in the morning.

In one of the chests, under the tools, there is a short coat of grey sealskin with bone toggles. The harbour master looks at it, and at the book, and does not write it down. "Salvor's right," he says. "Customary." He has just made the custom up, and everybody knows it, and nobody says so.

The dead in the second hulk stay where they are.${b52If('brune', `\n\nBrune looks at the hulk, and then at the coat. "They will want that back too," she says. "The Shore. Eventually."`)}${b52If('ammet', `\n\nAmmet does not look at the hulk at all.`)}`,
      ch:[{t:'To the strand. The chests stay on the quay till morning.', onward:true, go:()=>{ startExplore('b5_c2_strand'); talk('b5_c2_fire'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_wreck_start:()=>({sp:'The quay · night', scene:'b5_c2_wrecks', txt:
`Past midnight a shout comes down from the quay, and then the Legion's whistle, cut off. When the squad comes up off the shingle, there are lamps round the salvage chests that are not the Legion's: a crew of wreckers with a handcart, six or seven of them, with boathooks and mallets, and a man up on the hulk's bow with a bow.

Their boss is a big man in a docker's apron with a mallet over his shoulder and a paper in his hand. "Chit," he says, waving it. "From the harbour master. For this cargo. Sealed." He sounds genuinely aggrieved. "You've got my chests."`,
      ch:[{t:'"Shields." Between them and the chests.', go:()=>startBattle('b5_c2_wreckers', {})},
          {t:'Come along the back of the sheds and out behind them, quiet.', check:['wits', 14],
            edges:id=>[id === 'tobet' && ['he knows how to be where he is not expected', 2], id === 'brune' && ['she has come up a beach in the dark before', 1], id === 'sgt' && ['you have walked this quay for weeks', 1], id === 'thegg' && ['he is very easy to see, even at night', -1], id === 'perrit' && ['the back of the sheds is on the water', -1]],
            near:b52Owe(8, 'A Legion tarpaulin, cut', w => `Yes, but ${b52Nm(w)} ${b52V(w, 'cut', 'cuts')} through the Legion's tarpaulin to get round the stack, and the Legion will want it paid for: ${b5Coin(8)} against ${b52Pos(w)} line.`, {t:w => `Yes, but the wrecker on the bow sees ${b52Nm(w)} coming round the sheds and shouts the name off ${b52Pos(w)} kit-bag across the quay: rattled.`, fx:w => b52Rattle(w)}),
            go:()=>startBattle('b5_c2_wreckers', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c2_wreck_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_wreck_seen:()=>({sp:'The quay · night', scene:'b5_c2_wrecks', txt:
`The man on the hulk's bow is looking the right way. He shouts, and points, and the wreckers turn from the chests with their boathooks up.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b5_c2_wreckers', {surprise:'e'})}]}),
    b5_c2_wreckers_after:()=>({sp:'The quay · night', scene:'b5_c2_wrecks', fx:()=>{ S.f.b5_c2_wreckDone = 1; S.f.b5_c2_ph = 4; }, txt:
`The wreckers go back up the quay with their handcart empty, and their boss sits on a bollard with his mallet across his knees and his chit in his hand, bleeding a little, and tells anyone who will listen that he had a chit.

In the morning the harbour master looks at the chit for a long time. It is his seal. It is his hand. "Ah," he says. "That was before the notice." He writes something in his book, and crosses something else out, and does not explain. The chests go up to the harbour's store under the Legion's guard.${b52If('perrit', `\n\n"He sold it twice," Perrit says, flatly. "He sold the same cargo twice, and wrote both down." She sounds, for a moment, almost admiring.`)}${b52If('brune', `\n\nBrune sits on the end of the quay with her feet over the water, and does not look at the second hulk, where the dead still are.`)}`,
      ch:[{t:'To the strand.', onward:true, go:()=>{ startExplore('b5_c2_strand'); talk('b5_c2_fire'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* 'dead': the dead laid on the quay with the Shake; at the evening tide, the wraiths */
    b5_c2_laid:()=>({sp:'The quay', scene:'b5_trate_harbour', fx:()=>{ if (!S.f.b5_c2_laid) { S.f.b5_c2_laid = 1; gain('b5_c2_shells'); } }, txt:
`The dead come up out of the second hulk one at a time, wrapped in sailcloth, and the squad lays them on the quay in a row: the harbour's dead out of the sheds, and the poachers out of the hold, side by side, for their people.

The Shake come up from the strand without being asked, and sit down beside the row, and lay shells on the sailcloth, white ones, one to each, and a black one here and there that nobody explains. They do not ask whose dead are whose.

${b5In('brune') ? `Brune lays the shells with them. At the end of the row she stands, and takes a cord of the same shells from round her own neck, and puts it into your hand. "For carrying them," she says. "It is what we give."` : `At the end of the row the Shake woman from the boats stands, and takes a cord of shells from round her own neck, and puts it into your hand. "For carrying them," she says. "It is what we give."`}${b52If('thegg', `\n\nThegg stands at the end of the row with his head down and talks to them, low, in his mother's tongue. They are not his people's dead. He does not seem to think that matters.`)}${b52If('ammet', `\n\nAmmet goes down the row once and straightens the sailcloth where it has slipped. That is all. It is enough.`)}

The light is going. The tide is coming back in, and the shapes are still in the second hulk's rigging.`,
      ch:[{t:'Stay with the dead until the Legion\'s lamps come.', onward:true, go:'b5_c2_tide_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_tide_start:()=>({sp:'The quay · the evening tide', scene:'b5_c2_wrecks', txt:
`The tide turns, and the light goes, and out on the second hulk the shapes come down out of the rigging all at once, the way starlings come down, and across the water without touching it.

They are coming along the quay toward the row under the sailcloth. Behind it the Shake have stood up, with their fish-spears and their oars, and nobody has run.${b52If('brune', `\n\nBrune steps up beside you with her spear. "They want them too," she says. "They cannot have them."`)}`,
      ch:[{t:'"Shields. Between them and the dead."', go:()=>startBattle('b5_c2_tide', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_tide_after:()=>({sp:'The quay · night', scene:'b5_c2_wrecks', fx:()=>{ S.f.b5_c2_tideDone = 1; S.f.b5_c2_ph = 4; }, txt:
`The Legion's lamps come along the quay at last, a whole file of them, at a run. By the time they arrive the shapes have gone back up into the rigging, or into nothing, and the sailcloth on the quay has not been touched.

The Legion's carts take the harbour's dead up the town steps in the morning, to be buried at the Legion's charge, which the harbour master writes down. The Shake take the poachers' dead out in their boats on the morning tide, which the harbour master does not write down, because nobody tells him. Nobody pays the Sixth for any of it.${b52If('brune', `\n\nBrune goes out with the boats. She comes back at noon with her feet wet and sits down by the fire and does not say where she has been. Everybody knows.`)}${b52If('tobet', `\n\nTobet sits on the quay where the row was. "Nobody's going to pay us for that," he says. Then, after a while: "Good."`)}`,
      ch:[{t:'To the strand.', onward:true, go:()=>{ startExplore('b5_c2_strand'); talk('b5_c2_fire'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the end: the war, and the river ---- */
    b5_c2_war:()=>({sp:B5_FINADD.name, scene:'b5_c2_strand', fx:()=>{ S.f.b5_c2_war = 1; }, again:()=>`Ennic, with the order. "Up the river, Sergeant."`, txt:
`Ennic comes down the shingle with an army runner beside him and a lamp, and an order in his hand that he has read three times. The bells are still going up in the town.

"From the Preda," he says. "Through the Legion. The Edur have declared war on Lether." He looks at the word in his own neat hand as if he had spelled it wrong. "The delegation went north to talk about the price of seals, and the Edur answered with that, the runner says. The runner says a great deal."

He folds the order. "A regiment is camped at Kraig's Landing, upriver, near the border, with its barges. The Sixth goes up to guard the barges. By barge, at first light." He considers this. "The Legion thanks us. In writing." He holds up a second paper to show that it does.${b52If('perrit', `\n\nPerrit has gone pale, and then very calm, which in Perrit is worse. "War with the Edur," she says. "With whatever was in that rigging." She does not say anything else.`)}${b52If('brune', `\n\nBrune looks at the river mouth, where the barges are. "Up the river," she says. "Away from the sea." She shrugs. "The river runs back down to it."`)}`,
      ch:[{t:'"Up the river, Finadd."', onward:true, go:'b5_c2_road'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c2_road:()=>({sp:'The barges · first light', scene:'b5_trate_harbour', txt:
`At first light the Sixth Company goes aboard the regiment's barges at the stage by the river mouth, with its paybooks in the oilskin case, and the barges push off and pole out into the current, and turn upstream.

Behind the company, Trate is waking up: the lighthouse going pale against the morning, the Tarancede Tower black on its rocks, the cleared quays with the Legion's carts already on them, and on the strand the Shake boats drawn up by their fires. ${b52Key() === 'dead' ? 'On the long quay, where the row was, a few white shells are still lying on the planks. Nobody has swept them up.' : 'On the long quay the second hulk is still on the stone with her bow up, and the shapes are still in her rigging, and the dead are still in her hold.'}

${b5In('brune') ? `Brune sits in the stern of the barge with her feet over the side, in the river. "It is not the sea," she says. "It will get there."` : b5Waiting('brune') ? `As the barge turns into the current, Brune is standing by her boat on the strand, watching. She lifts the fish-spear, once. She is still in the paybook. The roster at any fire can send for her.` : ''}${b52If('tobet', `\n\nTobet sits half a step behind you on the barge's bench, as always, cutting a notch in the tally-stick.`)}${b52If('thegg', `\n\nThegg sits in the middle of the barge, where his weight keeps it level, and the bargemen thank him for it.`)}${b52If('perrit', `\n\nPerrit sits with her back to the cargo and her face to the river, where she can see it.`)}${b52If('ammet', `\n\nAmmet is asleep, sitting up, with her roll of tools in her lap.`)}

You touch the white fingertip on your shield's boss, for the Errant, and watch the river.`,
      ch:[{t:'Up the river.', onward:true, go:()=>chapterEnd(2, b52Key() || 'salvage')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
