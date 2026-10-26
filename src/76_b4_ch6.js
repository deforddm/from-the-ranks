/* ============ Book Four, Chapter 6: Pan'arak ============ */
/* The lines before the oasis (House of Chains, ch 23–24). The Fourteenth comes up to the Pan'arak oasis and the dead city in Raraku and
   faces the Dogslayers' trenches on three ramps, within sight across a basin. One legion, a third of the army, goes round to block the
   way out behind the oasis (the legion is never named here: R24's "Keneb's legion" is open, hoc-canon §7.4). The Third is lent from the
   9th to hold the flank pickets of that blocking force, at the end of the line where it runs out into rock (Claude's call, §7.4): never
   the blocking force, never a legion's main line. On b4_blistigNoticed (Ch4's picket) the Fist asked for the Chain squad by name;
   otherwise Radde volunteered them. Nil and Nether walk the lines at dusk (seen); the horse is held back for lack of room (seen); the
   rite and the Adjunct's council are not here at all. The afternoon: a Dogslayer post on a rock spur over the flank (the nest). Dusk:
   Dogslayer skirmishers probe the picket (with the company). The eve: the squad's talk, one scene each. Key (S.f.b4_c6_key): 'hold' (the
   picket as posted, all night; a Dogslayer patrol tests it after midnight, with the company: S.f.b4_saw = 'far') or 'forward' (out from
   the picket in the dark to the foot of the ramps; the trenches full, the Dogslayers' fires, something wrong in the dark above the
   oasis; an outpost at the trenches' foot sees them, and a running fight back: S.f.b4_saw = 'close'). On b4_setiSaved (Ch4) a Seti
   archer stands the picket with them and fights in the key fight. Dust 2 (B4DUST; the engine sets it). Notes: docs/hoc-ch6-notes.md. */
/* FOR THE ARTIST (76b): names this file uses.
   Items: ART['item/b4_c6_dogslayer'], ['item/b4_c6_trenchspade'], ['item/b4_c6_pickethorn'].
   Figures: b4_c6_dogslayer (a Dogslayer: Dom's soldier, Malazan-shaped, badges cut off), b4_c6_dogxbow (the same with a crossbow),
   b4_c6_dogscout (a skirmisher, lighter, a scarf), b4_c6_dogsgt (their sergeant, bigger, a whistle), b4_c6_setiarcher (a Seti woman
   archer; b4_c4_setiarcher if Chapter 4 drew one). Reused: b4_c1_hollet, b4_c1_radde, b4_c1_recruit, b2soldier, wickan, nil, nether.
   Backdrops (SCENEX): b4_picket (70's, redrawn: the picket at dusk, the reading place), b4_c6_trenches (the Dogslayer trenches on the
   ramps at dusk, the dead city behind), b4_c6_eve (the 9th's lines at night, dust in the fires), b4_c6_dawn (the same at first light), b4_c6_close (the foot of the ramps at
   night, close: the trenches full, their fires, the dark above the oasis). Ground (TILEX): b4_c6_lines ('.' hard sand, ',' scrub, '#'
   rock, '=' picket screen, 'F' shielded fire, 't' a scrape, 'L' a lookout rock in the screen), b4_c6_ramp ('.' sand, ',' scrub, 'r' ramp,
   't' trench, '#' rock, 'F' the outpost's fire). In fights 't' is low cover. */

/* ---- small helpers (b46: Book Four, Chapter Six) ---- */
const b46L = (id, n) => { if (b4In(id) && S.loy && S.loy[id] != null) loy(id, n); };
/* the first line in m whose speaker is here (keys in order; 'sgt' always is), else m._ */
const b46Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b4In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
/* the recruit who walks with the squad (one at a time), and a line for them */
const b46Rec = () => b4In('orvas') ? 'orvas' : b4In('redblade') ? 'redblade' : b4In('warlock') ? 'warlock' : null;
const b46R = m => { const r = b46Rec(), v = r && m[r]; return v ? (typeof v === 'function' ? v() : v) : ''; };
/* Hackle is with the squad: at Sathi's knee, or at the sergeant's if the whistle brought him home in Book Two */
const b46Dog = () => b4In('sathi') || (!!b4Was('b2_hackleBack') && !(S.dead && S.dead.hackle));
const b46New = () => HOC_NEW.filter(id => b4In(id));
/* the phase: 1 the picket at dusk, 2 the picket at night, 3 the basin (forward), 4 the foot of the ramps (forward) */
const b46Ph = () => S.f.b4_c6_ph || 1;
const b46Key = () => S.f.b4_c6_key || '';
const b46KeyDone = () => !!(S.f.b4_c6_patrolDone || S.f.b4_c6_outpostDone);
/* Ch4's picket road: the Fist asked for the Chain squad by name. Ch4's seti road: a Seti archer stands the picket with them */
const b46Asked = () => !!S.f.b4_blistigNoticed;
const b46Seti = () => !!S.f.b4_setiSaved;
/* the chapter's one quiet line for the Barrow dead (one of them), at the picket in the night */
const b46Barrow = () => { const f = b4Fallen(); if (!f.length) return ''; const id = f[0];
  return ({sathi:`Sathi would have hated a picket. A whole night standing still in a scrape, and no horse within a long walk. She would have said so until somebody gave her their bread to stop. She stayed on the Barrow.${b46Dog() ? ' Hackle lies at the end of the scrape where she would have been, with his chin on his paws.' : ''}`,
    haddat:`Haddat would have stood the first watch, because she always did, and said the names at the end of it. ${b4In('tallow') ? 'Tallow says them tonight, from a list he wrote down, and gets one wrong.' : 'You say them tonight, and get one wrong.'} She stayed on the Barrow.`,
    tangle:'Tangle would have counted the satchel twice and then counted the stars, out loud, to annoy the recruits. The satchel is counted once tonight. He stayed on the Barrow.',
    marrow:'Marrow would have gone along the scrape in the dark with her hands, the way she did on the Chain, a touch on every shoulder, and called the whole picket "child". She stayed on the Barrow.'})[id] || `${TPL[id].name} would have stood this picket. ${TPL[id].name} stayed on the Barrow.`; };
/* the kit worn by a squadmate in a fight */
const b46Wears = (u, key) => !!(u && u.side === 'p' && !u.ally && S.gear && S.gear[u.id] && Object.values(S.gear[u.id]).includes(key));
const b46Dogs = u => !!(u && u.side === 'e' && /^b4_c6_dog/.test(u.id || ''));
/* the Barrow token tied on the bone (Ch1's chain key), for the eve */
const b46Token = () => S.f.b4_bone === 'chain' || S.f.b4_c1_key === 'chain';

/* ---- the Seti archer who remembers the Third (Ch4's seti road): an ally in the key fight, levelled as the 9th's regulars are ---- */
FOES.b4_c6_seti = {name:'Seti archer', kind:'b4_c6_setiarcher', sig:'s', hp:13, ac:12, atk:4, dmg:[1,8,1], rng:6, mv:5, init:2, verb:'shoots at'};
{ const _mkAlly = mkAlly; mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y); if (b4On() && k === 'b4_c6_seti' && !u.b4seti) { u.b4seti = true; u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); } return u; }; }
{ const _battleDef = battleDef;
  battleDef = function(id, stage){ const d = _battleDef(id, stage); if (!d || !b4On() || !(id === 'b4_c6_patrol' || id === 'b4_c6_outpost') || !b46Seti()) return d;
    const p = d.party[d.party.length - 1]; return Object.assign({}, d, {allies:[...(d.allies || []), ['b4_c6_seti', Math.min(7, p[0] + 2), p[1]]], b4seti:true}); }; }

/* ---- the first fight with the Widow's water in the skins (Ch5's seep: S.f.b4_seepWater = 1): +3 health each, and for its first round
   the dust does not shorten the squad's shots (Ch5's b45Rng works the range out without the dust). And the outpost's "nobody down". ---- */
{ const _sb = startBattle;
  startBattle = function(id, opt = {}){ if (b4On() && id === 'b4_c6_outpost' && !opt.stage) S.f.b4_c6_downed = 0;
    const r = _sb(id, opt); if (!b4On() || !B || !B.def) return r;
    if (B.id === 'b4_c6_nest' && !B.def.isStage2 && !opt.carry && S.f.b4_seepWater === 1) { B.b4skins = true;
      B.units.filter(u => u.side === 'p' && !u.ally).forEach(u => { u.maxhp += 3; u.hp += 3; if (u.b4rng0 > 1 && typeof b45Rng === 'function') u.rng = b45Rng(u, true); });
      blog(`<em>The squad's skins are full of the seep's water, and the squad drank before it came up the spur: +3 health each, and for the first round the dust does not shorten the squad's shots.</em>`); }
    if (B.def.b4seti) blog(`A Seti archer stands with the squad, the one whose society remembers. She has her own arrows.`);
    return r; }; }
{ const _nr = newRound;
  newRound = function(){ const r = _nr(); if (b4On() && B && B.b4skins && B.round >= 2) { B.b4skins = false;
      B.units.filter(u => u.side === 'p' && !u.ally && u.b4rng0 > 1).forEach(u => { u.rng = typeof b45Rng === 'function' ? b45Rng(u) : u.rng; }); blog('The dust closes in again over the spur.'); }
    return r; }; }
{ const _stg = stageBreak;
  stageBreak = function(){ if (b4On() && B && B.id === 'b4_c6_outpost' && B.units.some(u => u.side === 'p' && !u.ally && u.hp <= 0)) S.f.b4_c6_downed = 1; return _stg(); }; }
{ const _win = win;
  win = function(){ if (b4On() && B && B.id === 'b4_c6_outpost' && B.units.some(u => u.side === 'p' && !u.ally && u.hp <= 0)) S.f.b4_c6_downed = 1; return _win(); }; }

/* ---- The Long Listen: an old picket's art, Radde's (or Darrut's gate nights). Not sorcery. Once a fight, the bearer listens: the first
   enemy to move after it is heard and marked (+2 to hit it for the squad, until the end of the next round), and nobody in the squad can
   be flanked until the bearer's next turn. ---- */
Object.assign(TRICKS, {
  b4_c6_listen:{name:'The Long Listen', ch:6, use:'fight', ab:'t_b4_c6_listen', where:'the 9th\'s picket before Pan\'arak',
    lore:'A picket hears before it sees: the creak of a strap, a boot finding a stone, the change in the crickets where something has gone by. Lie still, breathe through the mouth, put the ear to the ground and the hand over the other ear, and the dark tells you which way it is coming from and how many. Old sergeants teach it to the ones they mean to keep.',
    get fx(){ return `Once a fight: the bearer goes still and listens. The first enemy to move after it is heard and marked: +2 to hit it for the squad until the end of the next round. Until the bearer's next turn nobody in the squad can be flanked. Not sorcery: it never sputters.`; }},
});
Object.assign(AB, {
  t_b4_c6_listen:{name:TRICKS.b4_c6_listen.name, trick:'b4_c6_listen', self:true, desc:()=>TRICKS.b4_c6_listen.fx,
    run(u){ B.b4listen = {u, on:true, marked:null}; AUDIO.play('click'); float(u, 'listening', '#d8d0b0'); sparks(u.x, u.y, 6, '#d8d0b0', .3);
      blog(`${u.name} goes down flat with an ear to the sand and a hand over the other one, and the squad hears nothing at all for a breath. Then: "${u.id === 'tebbet' ? 'There. Coming left.' : u.id === 'darrut' ? 'Boots. Left. Like the gate at night.' : 'Left. One of them first.'}" For a turn the dark cannot get round the squad's side.`); }},
});
{ const _bfts = boonFoeTurnStart;
  boonFoeTurnStart = function(u){ const r = _bfts(u); const L = b4On() && B && B.b4listen;
    if (L && L.on && !L.marked && u && u.side === 'e' && u.hp > 0) { L.marked = u; u.b4heardUntil = B.round + 1; float(u, 'heard', '#f2c46b'); blog(`${u.name} moves, and the squad knew it would. <em>+2 to hit it.</em>`); }
    return r; }; }
{ const _fl = flanked;
  flanked = function(a, t, from){ if (b4On() && B && B.b4listen && B.b4listen.on && t && t.side === 'p' && a && a.side === 'e') return false; return _fl(a, t, from); }; }
{ const _ac = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _ac(a, t, o); if (!b4On() || !B || !a || !t || a.side !== 'p') return c;
    if (t.b4heardUntil >= B.round) c.bonus += 2;
    if (!a.ally && b46Dogs(t) && b46Wears(a, 'b4_c6_dogslayer')) c.bonus += 1; // the badge: the squad knows what Dom did to the Chain
    return c; }; }
{ const _sts = squadTurnStart;
  squadTurnStart = function(u){ const r = _sts(u); const L = b4On() && B && B.b4listen; if (L && L.on && L.u === u) { L.on = false; blog('The listening is done. The dark is only the dark again.'); } return r; }; }

/* ---- the picket's horn: once a book, its bearer blows it and two regulars of the 9th come up into the fight ---- */
{ const _mkParty = mkParty;
  mkParty = function(id, x, y){ const u = _mkParty(id, x, y); if (b4On() && B && !S.f.b4_c6_hornBlown && b46Wears(u, 'b4_c6_pickethorn')) u.ab.splice(Math.max(0, u.ab.length - 1), 0, 't_b4_c6_horn'); return u; }; }
Object.assign(AB, {
  t_b4_c6_horn:{name:'The picket\'s horn', self:true, desc:()=>'Once a book: blow the picket\'s horn, and two regulars of the 9th come up into the fight beside the bearer. After that the 9th knows the sound, and the horn is only a horn.', ok:()=>!S.f.b4_c6_hornBlown,
    run(u){ S.f.b4_c6_hornBlown = 1; AUDIO.play('growl'); float(u, 'the horn', '#e8c073'); let n = 0;
      [[0, 1], [1, 1], [-1, 1], [1, 0], [-1, 0], [0, -1]].some(([dx, dy]) => { const at = freeNear(u.x + dx, u.y + dy); if (!at) return false; const a = mkAlly('b4_regular', at.x, at.y); a.ini = d20() + (a.init || 0); a.arrived = performance.now(); B.units.push(a); if (!B.initOrder.includes(a)) B.initOrder.push(a); sparks(at.x, at.y, 10, '#e8c073', .5); n++; return n >= 2; });
      blog(`${u.name} puts the picket's horn to the mouth and blows it, one long flat note out over the sand, and two regulars of the 9th come up out of the scrapes at a run with their shields on their arms. They have been waiting all night to be asked.`); }},
});

/* ---- the words this chapter adds to Book Four's glossary ---- */
GLOSSX.hoc.push(
  [6, 'Pan\'arak', 'The oasis at the heart of Raraku, and the dead city beside it, where the Whirlwind has its camp. The Fourteenth came up to it across the old sea floor and drew its lines in sight of it.', ()=>!!(S.f && S.f.b4_c6_panarak)],
  [6, 'The Dogslayers', 'Korbolo Dom\'s army: Malazans, many of them, or once, who took the rebellion\'s silver and harried the Chain of Dogs from Hissar to the walls of Aren. The name is theirs. They hold the trenches on the ramps in front of the oasis.', ()=>!!(S.f && S.f.b4_c6_dogs)]);

/* ---- the reading at the picket before Pan'arak (the chapter's first halt, and its fire) ---- */
B4DECK[6] = {scene:'b4_picket', where:'an upturned shield in the scrape behind the screen', set:'Dusk at the end of the picket line before Pan\'arak, with the Dogslayers\' trenches across the basin, close enough to count, and the dust coming down red.',
  back:'b4_c6_picketfire', backT:'Back to the fire.',
  say:{marrow:`Marrow turns a shield over in the scrape and smooths the dust off its belly with her sleeve. "A heavy night for it, child," she says. "They are all heavy, the nights before." She shuffles slowly, and does not look across the basin. "One card. Not for us. For the night."`,
    tallow:`Tallow sits down on his heels by the upturned shield and takes the deck out of its oilcloth as if it might bite him. "My grandmother wouldn't read the night before the boats went out after the big shoals," he says. "She said the sea hears you." He shuffles anyway, badly, with his hands not quite steady. "One, Sergeant. Just one."`,
    oldninth:`The old soldier comes down the scrape at dusk with his rum cup and sits on his heels by the upturned shield without being asked. "I've read the night before for three armies," he says, and lays his deck down on the leather. "It's always the same night." He cuts once. "One. For whoever's left to want it."`}};

const B4CH6 = {
  title:'Pan\'arak', number:'Six',
  intro:{loc:'Before Pan\'arak', sub:'Raraku · the lines in front of the oasis', scene:'b4_c6_trenches', cap:'Three long ramps going up out of a basin to the trenches, the dead city pale behind them, and the dust coming down red.',
    paras:[
`Three days across the old sea floor, and then the coral gives out and the ground goes down into a long shallow basin, and on the far side of the basin the ground comes up again in three long ramps, and at the top of the ramps there are trenches. Behind the trenches, pale in the dust, are the towers of a dead city and the palms of an oasis. Pan'arak. The Whirlwind is in there, and the goddess, and everything the Fourteenth has walked from Aren to kill.`,
()=>`You are Sergeant {sgt}, Third squad, 9th Legion. The trenches are held by the Dogslayers, Korbolo Dom's army, who ran the Chain down the Aren Way. ${b4In('haddat') || b4In('marrow') || b4In('tangle') || b4In('sathi') ? 'The squad knows the name the way you know a scar.' : 'You know the name the way you know a scar.'} The lines are close enough to see each other's cooking fires, and the dust is thick enough that some days they cannot.`,
()=>`One legion, a third of the army, has gone round in the afternoon to sit across the way out behind the oasis, so that nothing that runs gets far. Its line ends in broken rock on the flank, and somebody has to hold the pickets at the end of it. ${b46Asked() ? 'The Fist of the 9th asked for the Chain squad by name.' : 'Sergeant Radde put his hand up for the Third before anybody asked.'} So the Third is lent out to the end of somebody else's line, at the edge of everything, with a screen of stakes and a fire behind a shield.`],
    go:'To the picket', node:'b4_c6_start'},

  areas:[
    /* 16 x 12 (b4_c6_lines, dusk).  . hard sand  , scrub  # rock  = the picket screen (stakes and brush)  L the lookout rock in the screen
       F the Third's shielded fire  t a scrape  > east, the spur at the end of the line  < west, along the blocking legion's pickets */
    { id:'b4_c6_lines', title:'Before Pan\'arak · the flank pickets', sub:'Dusk · the trenches across the basin', hint:'Tap ground to move · tap a figure to talk · the Third\'s fire is behind the screen', decor:'b4_c6_lines',
      map:[ "R..,,..R..,,...R",
            ".,..R.....,..R.,",
            "..,.....,.......",
            "==========L=====",
            ".t..t....t...t.>",
            "................",
            "<.....F.....R...",
            "..,.........,...",
            "....R.....,.....",
            "..,....,........",
            ".......,........",
            "R..,.....,.....R" ],
      walk:'.,', triggers:{F:'b4_c6_picketfire', L:'b4_c6_lookout', '=':'b4_c6_screen', t:'b4_c6_scrape', '>':'b4_c6_to_spur', '<':'b4_c6_west'}, start:{x:7, y:7},
      quest:()=> !S.f.b4_c6_raddeSaid ? 'Sergeant Radde, behind the screen.' : !S.f.b4_c6_nestDone ? 'The spur at the end of the line, east.' : !S.f.b4_c6_duskDone ? 'The screen. Dusk is coming.' : 'The fire, and the night.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:4, y:5, node:()=> !S.f.b4_c6_raddeSaid ? 'b4_c6_radde' : S.f.b4_c6_nestDone && !S.f.b4_c6_duskDone ? 'b4_c6_dusk_start' : S.f.b4_c6_duskDone ? 'b4_c6_nightfall' : 'b4_c6_radde_again', fresh:()=>!S.f.b4_c6_raddeSaid || (!!S.f.b4_c6_nestDone && !S.f.b4_c6_duskDone)},
        {id:'hollet', name:'Captain Hollet', kind:'b4_c1_hollet', x:10, y:7, node:()=>'b4_c6_hollet', fresh:()=>!S.f.b4_c6_hollet},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:8, y:9, node:()=>S.f.b4_c6_recTold ? 'b4_c6_recruits_again' : 'b4_c6_recruits', fresh:()=>!S.f.b4_c6_recTold},
        {id:'nil', name:'Two Wickan children', kind:'nil', x:2, y:9, node:()=>'b4_c6_nilnether', show:()=>!!S.f.b4_c6_raddeSaid, fresh:()=>!!S.f.b4_c6_raddeSaid && !S.f.b4_c6_nil},
        {id:'nether', name:'Two Wickan children', kind:'nether', x:3, y:9, node:()=>'b4_c6_nilnether', show:()=>!!S.f.b4_c6_raddeSaid},
        {id:'horse', name:'A Wickan rider, held back', kind:'wickan', x:13, y:10, node:()=>'b4_c6_horse', fresh:()=>!S.f.b4_c6_horse},
        {id:'seti', name:'A Seti archer', kind:'b4_c6_setiarcher', x:13, y:6, node:()=>'b4_c6_seti', show:()=>b46Seti(), fresh:()=>b46Seti() && !S.f.b4_c6_seti} ] },

    /* 16 x 12 (b4_c6_lines, night).  the same picket after dark: a gap in the screen at the middle, and the way out across the basin
       north (^), which is nobody's way unless the Third goes forward */
    { id:'b4_c6_night', title:'Before Pan\'arak · the picket at night', sub:'Night · the Dogslayers\' fires across the basin', hint:'Tap ground to move · tap a figure to talk · the fire is behind the screen', decor:'b4_c6_lines', dark:true,
      map:[ "R..,,..^..,,...R",
            ".,..R.....,..R.,",
            "..,.....,.......",
            "=======.==L=====",
            ".t..t....t...t.>",
            "................",
            "<.....F.....R...",
            "..,.........,...",
            "....R.....,.....",
            "..,....,........",
            ".......,........",
            "R..,.....,.....R" ],
      walk:'.,', triggers:{F:'b4_c6_picketfire', L:'b4_c6_listenpost', '=':'b4_c6_screen', t:'b4_c6_scrape', '^':'b4_c6_gap', '>':'b4_c6_to_spur', '<':'b4_c6_west'}, start:{x:7, y:7},
      quest:()=> !b46Key() ? 'Midnight, and Radde.' : !b46KeyDone() ? (b46Key() === 'hold' ? 'The screen. After midnight.' : 'The gap in the screen, north, and out.') : 'The fire, and first light.',
      npcs:[
        {id:'radde', name:'Sergeant Radde', kind:'b4_c1_radde', x:4, y:5, node:()=> !b46Key() ? 'b4_c6_radde_night' : 'b4_c6_radde_after', fresh:()=>!b46Key()},
        {id:'recruits', name:'Second Company recruits', kind:'b4_c1_recruit', x:8, y:9, node:()=>'b4_c6_recruits_night', fresh:()=>!S.f.b4_c6_recNight},
        {id:'seti', name:'A Seti archer', kind:'b4_c6_setiarcher', x:13, y:5, node:()=>'b4_c6_seti_night', show:()=>b46Seti(), fresh:()=>b46Seti() && !S.f.b4_c6_setiNight},
        {id:'patrol', name:'Movement in the dark beyond the screen', kind:'b4_c6_dogscout', x:12, y:1, node:()=>'b4_c6_patrol_start', show:()=>b46Key() === 'hold' && !S.f.b4_c6_patrolDone, fresh:()=>b46Key() === 'hold' && !S.f.b4_c6_patrolDone} ] },

    /* 16 x 12 (b4_c6_lines, night).  the basin between the lines: scrub, rock, nothing to hide in.  L a rock to look from  ^ on to the ramps
       v back to the picket */
    { id:'b4_c6_basin', title:'Pan\'arak · the basin', sub:'Night · between the lines', hint:'Tap ground to move · keep low · the ramps are north', decor:'b4_c6_lines', dark:true,
      map:[ "RR,...,^,...,.RR",
            "R.,..R.....,...R",
            "...,.....,..R...",
            ".R....,.....,...",
            "......L.........",
            "..,......R...,..",
            "....,.........R.",
            ".R.......,......",
            "....,..R........",
            "..,..........,..",
            "R.......,......R",
            "RR.....v......RR" ],
      walk:'.,', triggers:{L:'b4_c6_basin_rock', '^':'b4_c6_to_ramp', v:'b4_c6_basin_back'}, start:{x:7, y:10},
      quest:()=>'North across the basin, to the foot of the ramps. Low, and quiet.', npcs:[] },

    /* 16 x 12 (b4_c6_ramp, night).  the foot of the trenches: r the ramps going up (nobody's way)  t the trench at the top of the foot
       F the outpost's fire  v back across the basin */
    { id:'b4_c6_ramp', title:'Pan\'arak · the foot of the ramps', sub:'Night · under the trenches', hint:'Tap ground to move · tap a figure to look · the outpost is at the foot of the middle ramp', decor:'b4_c6_ramp', dark:true,
      map:[ "rrrrtttrrrrtttrr",
            "rrrttRrrrrRttrrr",
            "R..t..........tR",
            "...........,....",
            "..R....F......R.",
            "......R.........",
            ".,..........,...",
            "....R......R....",
            "..,.............",
            "........,....R..",
            "R..............R",
            "RR.....v......RR" ],
      walk:'.,', triggers:{r:'b4_c6_ramp_up', t:'b4_c6_ramp_look', F:'b4_c6_outpost_start', v:'b4_c6_ramp_back'}, start:{x:7, y:10},
      quest:()=> !S.f.b4_c6_outpostDone ? 'Look. Then the outpost at the foot of the middle ramp.' : 'Back, across the basin, to the line.',
      npcs:[
        {id:'outpost', name:'The outpost at the foot', kind:'b4_c6_dogslayer', x:8, y:3, node:()=>'b4_c6_outpost_start', show:()=>!S.f.b4_c6_outpostDone, fresh:()=>!S.f.b4_c6_outpostDone} ] } ],

  battles:{
    /* the afternoon: a Dogslayer post on a rock spur over the flank, watching the blocking legion go round. The second ground: the top of
       the spur, the nest itself, where their sergeant is. The first fight of the chapter: on b4_seepWater the skins are full (above). */
    b4_c6_nest:{title:'The spur', style:'b4_c6_lines', open:true, warrenText:'Before Pan\'arak · the warren is full of dust, and something old under it', warren:{meanas:1, denul:1}, music:'battle',
      map:["##.#..##","#..t.,.#","..,...#.",".t...t..","........","..#...,.","....t...","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c6_dogxbow',2,1],['b4_c6_dogxbow',5,1],['b4_c6_dogslayer',3,3],['b4_c6_dogslayer',6,3],['b4_c6_dogscout',1,4]], xp:140, after:'b4_c6_nest_after',
      waves:[{round:3, foes:[['b4_c6_dogscout',7,2]], text:'Another comes down off the spur\'s far side at a slither, in a fall of grit, with a short sword out.'}],
      preText:()=>`Tangle's sharpers go up among the rocks under the crossbows, two flat cracks, and the dust on the spur comes down in a sheet with stones in it.`,
      stage2:{title:'The spur\'s top', xp:70,
        text:()=>`They go back up the spur the way they came, and the squad goes after them, hand over hand on the hot rock, to a hollow at the top where the wind has scooped out a bowl and somebody has built a wall of stones round it, waist high, very neatly, the way the Malazan drill-books say.\n\nThere is a sergeant in it with a whistle on a cord, and the badges cut off his sleeves, and Malazan kit on him from the helm down. He looks at the Third coming over his wall and does not look surprised. He has been watching the blocking legion go round all afternoon, and knew somebody would come.${b46Say({haddat:`\n\nHaddat stops on the wall with her shield up. "Malazan," she says, very quietly. "He is wearing our helm."`, darrut:`\n\nDarrut sets his big shield on the wall. "Aren Guard drill," he says. "That wall. That's how we built them." He looks as if he would rather not know it.`, _:''})}`,
        map:["#..##..#","..t..t..","#......#","...#....","........",".t....t.","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c6_dogsgt',3,1],['b4_c6_dogslayer',1,2],['b4_c6_dogslayer',6,2],['b4_c6_dogxbow',5,0]]} },
    /* dusk: Dogslayer skirmishers probe the flank where the picket runs out, with the company. The second ground: the end of the screen,
       where the stakes stop and the rock starts, and their second try at it */
    b4_c6_dusk:{title:'The probe at dusk', style:'b4_c6_lines', open:true, warrenText:'Before Pan\'arak · dust in the warren, red at dusk', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8], [0, 9]], n:1},
      map:["..,...,.",".,..t...","...,....","..t...t.","........",".,....,.","tt.tt.tt","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c6_dogscout',1,1],['b4_c6_dogscout',6,1],['b4_c6_dogxbow',3,0],['b4_c6_dogslayer',4,2],['b4_c6_dogscout',1,2]], xp:160, after:'b4_c6_dusk_after',
      waves:[{round:3, foes:[['b4_c6_dogscout',7,2]], text:'Another comes in low out of the scrub on the flank, where the screen ends, the way they were told the screen would end.'}],
      preText:()=>`Tangle's sharpers go off in the scrub in front of the screen, and the skirmishers coming through it come through it in a hurry.`,
      stage2:{title:'The end of the screen', xp:80,
        text:()=>`They go back into the dust, and come again, along the line this time, to the very end of the screen where the stakes stop and the broken rock starts, because that is where a picket is thinnest and every skirmisher alive knows it.\n\nThe squad gets there first, just. Their sergeant is with them now: a heavy man in a Malazan helm with a whistle in his teeth, blowing it short and sharp, and every time he blows it they move as one.${b46Say({tebbet:`\n\nTebbet has an arrow up and the dust between him and the whistle. "I can't see him," he says. "I can hear him fine."`, hessa:`\n\nHessa plants her spear at the last stake and her shield in front of it. "A door," she says. "I have stood a door before."`, _:''})}`,
        map:["#..,..##","#.t.....","...#..t.","........","..,...,.","t.tt.tt.","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c6_dogsgt',3,1],['b4_c6_dogscout',1,2],['b4_c6_dogscout',5,1],['b4_c6_dogxbow',4,0]]} },
    /* 'hold': a Dogslayer patrol tests the picket after midnight, with the company (and the Seti archer, on b4_setiSaved). The second
       ground: the gap in the screen, where they come through */
    b4_c6_patrol:{title:'The patrol after midnight', style:'b4_c6_lines', dark:true, open:true, warrenText:'The picket at night · the warren is quiet, and listening', warren:{meanas:1, denul:1}, music:'battle',
      company:{at:[[1, 8], [6, 8], [0, 9]], n:1},
      map:[".,....,.","...t....",".#....#.","........","..t..t..","........","tt.tttt.","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c6_dogsgt',3,0],['b4_c6_dogslayer',2,2],['b4_c6_dogscout',6,3],['b4_c6_dogxbow',4,1],['b4_c6_dogscout',0,4]], xp:170, after:'b4_c6_patrol_after',
      preText:()=>`Tangle's sharpers go off in the dark beyond the screen, two white flashes, and for a heartbeat the whole patrol is lit up standing, and then it is not standing.`,
      stage2:{title:'The gap in the screen', xp:85,
        text:()=>`They go back from the screen the way they came, and then they do not go back: they come along the outside of it in the dark to the gap in the middle, where the stakes were never driven, because the Third's own fire is behind it.\n\nIt is a Malazan way to do it. The squad knows it is a Malazan way to do it. Their sergeant's whistle goes once, very short, and they come through the gap together with their shields locked.${b46Say({darrut:`\n\nDarrut sets his big shield in the gap. "The gate," he says, to nobody. "It's always the gate."`, marrow:`\n\nMarrow is behind the fire with her hands open. "Come on, then," she says to the dark, softly. "Come on, children. I am ready for you."`, _:''})}`,
        map:["........",".t....t.","........","...##...","........","ttt..ttt","........","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c6_dogsgt',3,1],['b4_c6_dogslayer',2,3],['b4_c6_dogslayer',5,3],['b4_c6_dogxbow',4,0]]} },
    /* 'forward': the outpost at the trenches' foot sees them (with the Seti archer, on b4_setiSaved). The second ground: the run back
       across the basin, with the outpost's friends behind them */
    b4_c6_outpost:{title:'The outpost at the foot', style:'b4_c6_ramp', dark:true, open:true, warrenText:'The foot of the ramps · the warren will not look up the hill', warren:{meanas:1, denul:1}, music:'battle',
      map:["tttt.ttt","..#....#","...t....","........",".t...t..","........","..,...,.","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b4_c6_dogsgt',4,1],['b4_c6_dogslayer',2,3],['b4_c6_dogslayer',6,3],['b4_c6_dogxbow',4,0]], xp:170, after:'b4_c6_outpost_after',
      waves:[{round:3, foes:[['b4_c6_dogscout',4,0]], text:'Another comes down out of the trench through the gap in the lip, a skirmisher in a scarf, still knotting it.'}],
      preText:()=>`Tangle's sharpers go off against the trench lip, and the outpost's fire goes out in a shower of sparks, and for a breath nobody on either side can see anything.`,
      stage2:{title:'The run back', xp:85, style:'b4_c6_lines',
        text:()=>`The outpost is done, and the trench above it is not. There are voices up there now, and a whistle, and lanterns going along the lip, and the squad runs.\n\nHalf the basin, in the dark, with the dust in the mouth and the scrub catching at the ankles, and behind them the sound of the Dogslayers coming down the ramp after them, not fast, keeping its order, a drilled company. Halfway back the squad turns, because there is no outrunning a company that keeps its order, and the screen is still too far.${b46Say({sathi:`\n\nSathi is laughing, which is what she does. "We'd be home by now," she says, "on a horse." She turns with her blade out.`, tebbet:`\n\nTebbet stops and turns and has an arrow on the string before anybody else has turned. "There," he says. "Him first."`, _:''})}`,
        map:["..,....,","........",".#...,..","........","..t...t.","........",".,...#..","........","........","........"],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b4_c6_dogsgt',3,0],['b4_c6_dogscout',1,1],['b4_c6_dogscout',6,1],['b4_c6_dogxbow',4,0]]} } },

  foes:{
    /* the Dogslayers: Korbolo Dom's soldiers, many of them Malazans once, in Malazan kit with the badges cut off, drilled the Malazan way */
    b4_c6_dogslayer:{name:'Dogslayer', sig:'d', kind:'b4_c6_dogslayer', hp:22, ac:14, atk:7, dmg:[1,8,2], rng:1, mv:4, init:2, sk:['parry'], verb:'cuts at'},
    b4_c6_dogxbow:{name:'Dogslayer crossbow', sig:'x', kind:'b4_c6_dogxbow', hp:16, ac:13, atk:7, dmg:[1,10,1], rng:6, mv:4, init:2, sk:['pin'], verb:'looses a bolt at'},
    b4_c6_dogscout:{name:'Dogslayer skirmisher', sig:'s', kind:'b4_c6_dogscout', hp:18, ac:13, atk:7, dmg:[1,6,2], rng:1, mv:5, init:3, sk:['hitrun'], verb:'stabs at'},
    b4_c6_dogsgt:{name:'Dogslayer sergeant', sig:'S', kind:'b4_c6_dogsgt', hp:40, ac:15, atk:8, dmg:[1,10,3], rng:1, mv:4, init:2, boss:true, sk:['rally', 'shove'], verb:'brings a Malazan sword down on'} },

  gear:{ // slot ∈ weapon|armour|trinket. who = ids that can wear it, or null for anyone.
    b4_c6_dogslayer:{name:'A Dogslayer\'s cut-off badge', slot:'trinket', who:null,
      line:'A square of cloth cut off a Dogslayer\'s sleeve with a knife, the threads still hanging: a dog\'s head stitched in black on red, and a bar of black across its throat. Dom\'s soldiers wear it where the Empire\'s badges were. The squad knows what it is for. Whoever carries it hits Dom\'s soldiers +1.'},
    b4_c6_trenchspade:{name:'A sapper\'s short spade', slot:'trinket', who:['tangle'], ac:1,
      line:'A Malazan sapper\'s short spade, the blade a hand and a half across and ground sharp on one edge, the haft worn dark where somebody\'s grip went. Dom\'s people dug the trenches on the ramps with spades like it. Tangle carries it across his back, where it turns a blow: +1 armour. He has started to talk to it.'},
    b4_c6_pickethorn:{name:'The picket\'s horn', slot:'trinket', who:null,
      line:'A cow\'s horn with a brass mouthpiece and a thong, scratched with the 9th\'s number and years of tallies, handed down from picket to picket. Once a book, in a fight, its bearer blows it, and two regulars of the 9th come up beside them. After that the 9th knows the sound, and it is only a horn.'} },

  scenes:{
    b4_c6_trenches:{loc:'Before Pan\'arak', sub:'The ramps · dusk', cap:'Three long ramps going up out of a basin to the trenches, the dead city pale behind them, and the dust coming down red.', amb:'explore'},
    b4_c6_eve:{loc:'Before Pan\'arak', sub:'The 9th\'s lines · night', cap:'Fires behind shields all along the lines, the dust going through their light, and across the basin the other army\'s fires doing the same.', amb:'explore'},
    b4_c6_dawn:{loc:'Before Pan\'arak', sub:'The ramps · first light', cap:'The basin flat and empty in the grey, the ramps and the trenches quiet across it, and cooking smoke going up straight from them.', amb:'explore'},
    b4_c6_close:{loc:'Pan\'arak', sub:'The foot of the ramps · night', cap:'The ramps going up into the dark close enough to touch, the trenches full of fires and men, and over the oasis a darkness that sits wrong.', amb:'explore'} },

  end:{
    hold:['The picket', 'The Fourteenth came up to the oasis of Pan\'arak and faced the Dogslayers\' trenches across a basin. One legion went round to block the way out, and the Third held the pickets at the end of its flank. In the afternoon it cleared a Dogslayer post off the spur, and at dusk it threw back their skirmishers. It held the picket as posted, all night. After midnight a patrol came to test the screen, and the Third and the Second Company were there.'],
    forward:['Forward', 'The Fourteenth came up to the oasis of Pan\'arak and faced the Dogslayers\' trenches across a basin. One legion went round to block the way out, and the Third held the pickets at the end of its flank. In the afternoon it cleared a Dogslayer post off the spur, and at dusk it threw back their skirmishers. In the night the Third went out from the picket to the foot of the ramps, and saw the trenches full, and the dark over the oasis. An outpost saw them. They came back.'] },
  endScene:'b4_c6_dawn',
  endCap:()=> b46Key() === 'forward' ? 'First light before Pan\'arak. The trenches on the ramps are quiet. The Third has been close enough to hear them breathing, and does not talk about the dark over the oasis.' : 'First light before Pan\'arak. The picket held. The trenches on the ramps are quiet, and the dust comes down on both armies the same.',
  tease:'Next: the night everything happens.',

  extras:()=>{ const f = S.f, x = [];
    x.push(f.b4_blistigNoticed ? 'The Fist of the 9th asked for the Chain squad by name, for the end of the line. Radde says that is a compliment. Radde has a strange idea of compliments.' : 'Sergeant Radde volunteered the Third for the flank pickets before anybody asked. He says it was the kindest thing he could think of.');
    if (f.b4_c6_key === 'hold') x.push('The Third held the picket as posted, all night. Radde wrote it in the book, and Captain Hollet signed it, which he does not do.');
    if (f.b4_c6_key === 'forward') x.push(`The Third went out from the picket to the foot of the ramps in the dark, and saw the trenches close.${f.b4_c6_downed ? ' Not everybody walked all the way back.' : ' Everybody came back.'} The picket was short a squad for an hour, and the Second Company noticed.`);
    if (f.b4_c6_setiStood) x.push('A Seti archer stood the picket with the Third, because her society remembers. She left before light without saying goodbye, which the Seti think is polite.');
    if (f.b4_c6_nil) x.push('At dusk two Wickan children walked the length of the lines, barefoot, and the soldiers went quiet as they passed.');
    if (f.b4_orvasDone === 1) x.push('Orvas stood the picket on foot, with the horse lines a long way behind him. He has asked that this be written down.');
    else if (f.b4_orvasDone === 2) x.push('Orvas is with the Khundryl, held back with the horse for lack of room. He will come if he is sent for.');
    if (f.b4_raminDone === 1) x.push('Ramin stood the picket in his red scale, with no horse within a long walk, and said nothing about it, loudly.');
    if (f.b4_kethDone === 1) x.push('Keth stood the picket with the squad. The grandmother would not say what she heard.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b4_c6_outpostDone && 'The Third went out from the picket in the night to the foot of the ramps. The trenches were full, and there were fires all along them, and over the oasis the dark was wrong. An outpost at the foot saw them, and the Third fought its way back across the basin.',
    f.b4_c6_patrolDone && 'After midnight a Dogslayer patrol came to test the picket at the end of the line. The Third held it, with the Second Company.',
    f.b4_c6_duskDone && 'At dusk Dogslayer skirmishers probed the end of the picket line. The Third and the company threw them back.',
    f.b4_c6_nestDone && 'A Dogslayer post on a rock spur was watching the blocking legion go round. The Third cleared it.',
    f.b4_c6_nil && 'At dusk two Wickan children walked the lines, barefoot, saying nothing.',
    f.b4_c6_horse && 'The horse is held back behind the lines. There is no room on the ramps for it.',
    'The Fourteenth came up to the oasis of Pan\'arak in Raraku and faced the Dogslayers\' trenches on three ramps, across a basin. One legion went round to block the way out, and the Third held the pickets at the end of its flank.'].filter(Boolean); },

  dlg:{
    /* ---- the picket at the end of the line, late afternoon: the first halt ---- */
    b4_c6_start:()=>({sp:'The end of the line', scene:'b4_c6_trenches', fx:()=>{ S.f.b4_c6_ph = 1; S.f.b4_c6_panarak = 1; S.f.b4_c6_dogs = 1; if (!S.f.b4_c6_omen) { S.f.b4_c6_omen = 1; b4Nerve(-1, 'The trenches, within sight'); } }, txt:
`The end of the line is a place where the ground stops being ground an army can stand on. The blocking legion's pickets come along the basin's edge from the west, a screen of stakes every hundred paces with a squad behind each, and here, where the basin's rim breaks up into red rock and gullies, they stop. The Third is what is there instead.

There is a screen: stakes driven in a row and thorn-brush woven through them, chest high, with a lookout rock in the middle of it. Behind the screen, a row of scrapes in the hard sand, and a ring of stones for a fire with a shield set up on edge on the basin side of it, so the Dogslayers will not see the flame. East, a long arm of rock runs out from the rim into the basin like a finger pointing. The spur.

Across the basin, a long bowshot and then another and another, the three ramps go up to the trenches. You can see men on them. You can see their helms. The dust comes down between, red now, as the sun goes.${b46Say({haddat:`\n\nHaddat stands at the screen with her shield grounded and looks across at the trenches. "Hissari stood in those," she says at last. "Some of them. When Dom came through." She does not say who.`, marrow:`\n\nMarrow sits down on the lip of the scrape with her back to the basin. "Child," she says, to the sergeant. "I'll look at them tomorrow. I have looked at them enough."`, _:`The squad stands at the screen and looks at the trenches, and the trenches look back.`})}${b4In('tallow') ? `\n\nTallow has his grandmother's deck in its oilcloth inside his shirt, and keeps touching it through the cloth, the way you touch a sore tooth with your tongue.` : ''}${b46R({orvas:`\n\nOrvas looks back over his shoulder at the horse lines, a long way behind, where the Khundryl are picketed with the Wickans' herd. "No room for them," he says. "On the ramps. They say." He looks at the ramps. "They are right. I hate that they are right."`, redblade:`\n\nRamin looks at the trenches with his helm under his arm. "Dogslayers," he says. "In Malazan helms." He puts his own on. "The Red Blades have a long list. They are on it."`, warlock:`\n\n"*There,*" the grandmother says, out of Keth's mouth, low. "*In the city. Under the palms. She is awake, and she is listening to every one of you.*"`})}`,
      ch:[b4DeckChoice(6),
          {t:'Find Radde, behind the screen.', go:()=>startExplore()},
          {t:'The Third\'s fire, behind its shield.', go:'b4_c6_picketfire'}]}),
    b4_c6_deck:()=>b4DeckOffer(6),
    b4_c6_card:()=>{ const n = b4DeckCard(6); n.fx = () => { if (['b4c_knightchains', 'b4c_leper'].includes(S.card)) S.f.b4_chains = 1; }; return n; },

    /* the fire: the swap, a rest, the squad, the eve, and the way on (the games pass, 79, wraps this node: keep the id) */
    b4_c6_picketfire:()=>({sp:'The Third\'s fire', scene:b46Ph() >= 2 ? 'b4_c6_eve' : 'b4_picket', again:()=> b46Ph() >= 2 ? (b46KeyDone() ? 'The fire behind its shield, down to coals. First light is not far.' : 'The fire behind its shield, low. Across the basin the Dogslayers\' fires, the same.') : 'The fire behind its shield, the screen in front, the trenches across the basin going red.', txt:
`${b46Ph() >= 2 ? `The fire is a ring of stones in the scrape with a shield on edge on the basin side of it, and its light goes up and not out, and the dust going through it is red and then gone. All along the lines to the west there are fires like it, a long low string of them behind their shields, and across the basin, on the ramps, the Dogslayers' fires, the same, as if the two armies were one camp with a hole in the middle.` : `The fire is a ring of stones in the scrape with a shield set on edge on the basin side of it, so that from the trenches it is a glow and nothing more. The dust settles on the coals and spits. Everything at the end of the line tastes of it.`}${b46KeyDone() ? `\n\nThe night has been long and is nearly over. The fire does not say how long.` : ''}${b46Dog() ? `\n\nHackle lies with his back to the shield and his nose toward the basin, and every so often he lifts it and tests the air, and puts it down again.` : ''}`,
      ch:[b4DeckChoice(6),
          {t:'Sit an hour behind the shield. Let the squad rest.', req:()=>!S.f['b4_c6_rest' + Math.min(2, b46Ph())], fx:()=>{ S.f['b4_c6_rest' + Math.min(2, b46Ph())] = 1; b4Rest('The squad sits an hour behind the shield with the dust coming down, inside the 9th\'s pickets. Wounds close, mostly.'); }, go:'b4_c6_picketfire_rest'},
          {t:'Talk with the squad.', go:'b4_c6_picketfire_talk'},
          {t:'The eve. Sit with each of them a while.', req:()=>b46Ph() >= 2, go:'b4_c6_eve'},
          ...b4Offers().map(id => ({t:`Send for ${NAME(id)}.`, fx:()=>{ b4SwapIn(id); }, go:'b4_c6_picketfire_swap'})),
          b4SpareChoice('b4_c6_picketfire'),
          b4PipeChoice('b4_c6_picketfire'),
          {t:'Find Radde first.', req:()=>b46Ph() === 1 && !S.f.b4_c6_raddeSaid, go:()=>startExplore()},
          {t:'Out to the spur.', req:()=>b46Ph() === 1 && !!S.f.b4_c6_raddeSaid && !S.f.b4_c6_nestDone, onward:true, go:'b4_c6_to_spur'},
          {t:'To the screen. Dusk is coming.', req:()=>b46Ph() === 1 && !!S.f.b4_c6_nestDone && !S.f.b4_c6_duskDone, onward:true, go:'b4_c6_dusk_start'},
          {t:'Nightfall.', req:()=>b46Ph() === 1 && !!S.f.b4_c6_duskDone, onward:true, go:'b4_c6_nightfall'},
          {t:'Midnight. Radde.', req:()=>b46Ph() >= 2 && !b46Key(), onward:true, go:'b4_c6_radde_night'},
          {t:'Wait for first light.', req:()=>b46KeyDone(), onward:true, go:'b4_c6_dawn'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c6_picketfire_rest:()=>({sp:'The Third\'s fire', scene:b46Ph() >= 2 ? 'b4_c6_eve' : 'b4_picket', txt:
`An hour, then, behind the shield, with the dust coming down.

${b46Say({marrow:`Marrow goes along the squad with her hands, the way she always has, and stops at the last of them and wipes her palms on her coat. "Dust in it," she says. "In the warren, child. It closes things up. It closes them up gritty."`, haddat:`Haddat sleeps sitting up against the screen, with the blue shield beside her. Once she wakes, and listens to the basin, and sleeps again.`, _:`Some of them sleep. The rest listen to the basin.`})}${b4In('tallow') ? `\n\nTallow lies on his back in the scrape and looks at the sky, which has no stars in it for the dust, and talks quietly about his grandmother's village to nobody until he is asleep.` : ''}${b4In('hessa') ? `\n\nHessa sleeps with her spear along her side and her hand on it. "D'rek does not hurry," she says, before she goes. "Neither will I."` : ''}${b4In('tebbet') ? `\n\nTebbet does not sleep. He sits with his bow across his knees and his eyes open, which the Dal Honese call resting.` : ''}${b46R({orvas:`\n\nOrvas sleeps with his face toward the horse lines, a long way behind, as if he could hear them from here.`, redblade:`\n\nRamin sleeps in his scale with his helm beside him, crown down, so the dust will not get in.`, warlock:`\n\nKeth sleeps, and the grandmother, in his sleep, keeps very still.`})}`,
      ch:[{t:'Back to the fire.', go:'b4_c6_picketfire'}]}),
    b4_c6_picketfire_swap:()=>({sp:'The Third\'s fire', scene:b46Ph() >= 2 ? 'b4_c6_eve' : 'b4_picket', txt:
`${b4In('orvas') ? `Orvas comes along the back of the pickets on foot from the horse lines, a long walk, with his lance over his shoulder and the dust in his braids, and drops his kit by the fire. "The horse is held back," he says. "I am not a horse." He sits. "Mostly."` : b4In('redblade') ? `Ramin comes along the back of the pickets from the Red Blades' lines with his helm under his arm, and puts his kit down by the fire. "Lent," he says. "My captain says the end of the line is where the Red Blades belong. I think it was a joke."` : b4In('warlock') ? `Keth comes along the back of the pickets from Temul's youths with his head down, and the grandmother muttering. "*Go, says the boy,*" she says. "*He says everything now, and they listen.*"` : `The swap is made. The basin takes no notice.`}`,
      ch:[{t:'Back to the fire.', go:'b4_c6_picketfire'}]}),
    b4_c6_picketfire_talk:()=>{ const ln = [], night = b46Ph() >= 2;
      if (b4In('haddat')) ln.push(night ? `Haddat is polishing the auxiliary's brass and the 9th's badge, side by side, by the firelight. "My mother would have sold them water," she says, of the trenches, without looking up. "Both armies. She would have said water has no side." She polishes. "She would have been wrong tonight."` : `Haddat is sharpening the edge of the blue shield's rim with a stone. "They took our helms," she says, of the Dogslayers. "They took our drill. They took our road, from Hissar." She tests the edge. "They can keep the helms."`);
      if (b4In('sathi')) ln.push(`Sathi has her arm round Hackle's neck. "Dogslayers," she says. "They named themselves for it. For us." She grins with all her filed teeth. "I'd like to meet the one who thought of it."`);
      if (b4In('tangle')) ln.push(`Tangle has the satchel open on his knees and is counting by feel, twice. "${numw(S.inv.sharper || 0, true)} sharper${(S.inv.sharper || 0) === 1 ? '' : 's'}," he says. "Dust in the fuses. Dust in me." He shuts it. "They dug those trenches with our spades. I want one."`);
      if (b4In('marrow')) ln.push(`Marrow is tying a knot in her string, hard. "The warren is very quiet here, child," she says. "Quiet the way a room goes quiet when somebody big comes in." She puts the string away. "I'd sleep, if I could. I won't."`);
      if (b4In('tallow')) ln.push(`Tallow has the deck out, and is not reading it. "My grandmother said a picket is the loneliest place in an army," he says. "She said it about my grandfather. He stood one in the Wars." He turns a card over and back. "He came home."`);
      if (b4In('hessa')) ln.push(`Hessa sits very straight with the spear upright. "In the temple," she says, "the night before the Autumn rites, nobody slept, and the priests said that was the rite." She considers the basin. "I think this is a rite too."`);
      if (b4In('tebbet')) ln.push(`Tebbet is waxing his bowstring by feel. "In the dust they'll be in arm's reach before I see them," he says. He looks at the basin. "Three months from Dal Hon, and I'll be shooting at arm's length."`);
      if (b4In('darrut')) ln.push(`Darrut has his helm on his knee. "When I was on the wall at Aren," he says, "the Dogslayers were the ones under it, at the end." He puts the helm on and finds something to do with the strap.`);
      if (b4In('orvas')) ln.push(`Orvas is mending a strap on his lance. "Gall says the Burned Tears will ride where they are sent," he says. "And we are sent behind." He pulls the strap tight. "I am in front. On my feet. It is not how I imagined it."`);
      if (b4In('redblade')) ln.push(`Ramin is scraping dust out of his scale with a thumbnail. "Some of the Dogslayers wore the red once," he says. "Not many. Some." He scrapes. "The Red Blades remember every one."`);
      if (b4In('warlock')) ln.push(`Keth sits looking across the basin. "*They are afraid over there too,*" the grandmother says. "*Listen. The same fear. Different songs.*" Keth, his own voice: "I can't hear it." The grandmother: "*You will.*"`);
      if (b46Dog() && !b4In('sathi')) ln.push(`Hackle lies across your boots with his nose to the basin, and growls, once, very low, at nothing you can see.`);
      return {sp:'The Third\'s fire', scene:night ? 'b4_c6_eve' : 'b4_picket', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and the dust comes down.`,
        ch:[{t:'Back to the fire.', go:'b4_c6_picketfire'}]}; },

    /* ---- the picket at dusk: Radde, Hollet, the recruits, the lookout, Nil and Nether, the horse held back, the Seti archer ---- */
    b4_c6_radde:()=>({sp:'Sergeant Radde · Second Company', txt:
`Radde is sitting on a rock behind the screen with the book open on his knee and his hand flat on the page to keep the dust off it.

"The end of the line," he says, without looking up. "Ours, for the night. The blocking legion's pickets come along from the west and stop here, at the rock, and past here there's nothing but the spur and the gullies." He points with the stylus at the spur without looking at it. "And on the spur, since noon, there's somebody. A post. Dom's. They've been watching the legion go round all afternoon and sending runners back up the ramps." He writes a word. "Before dark, Sergeant, there's not to be anybody on that spur but us."

He looks up then. ${b46Asked() ? `"You'll be wondering why the Third. The Fist asked. By name." He makes a face. "He remembered the hills, and the fog, and the picket at the far end. He said, 'Give the Chain lot the end of the line, they like the far end.' I don't think it was a compliment. I've decided it was."` : `"You'll be wondering why the Third. I put my hand up." He makes a face. "Some squad was going to get the end of the line. I'd sooner it was a squad that's stood at the end of something before."`}`,
      ch:[{t:'"The spur, before dark."', fx:()=>{ S.f.b4_c6_raddeSaid = 1; }, go:'b4_c6_radde_2'},
          {t:'"Who\'s on our left, along the screen?"', req:()=>!S.f.b4_c6_raddeWhy, fx:()=>{ S.f.b4_c6_raddeWhy = 1; }, go:'b4_c6_radde_why'}]}),
    b4_c6_radde_why:()=>({sp:'Sergeant Radde', txt:
`Radde looks west along the basin's edge, where the blocking legion's pickets go away in the dust, a squad every hundred paces, and then further than that.

"Not the 9th," he says. "Not ours. The 9th's sat in the main line, over there, facing the ramps." He waves a hand west and north, toward the middle of the army, without looking. "This lot's a legion gone round to sit across the back door. A third of the army. We're lent to the end of their pickets because they hadn't enough to reach the rock." He writes. "Which legion, the orders don't say, and I didn't ask. When a Fist lends you out, Sergeant, you don't ask whose fire you're sitting at."

He opens the book again. "And the horse is held back. All of it. Wickans, Khundryl, the Seti, the lot. There's no room on the ramps for horse, the officers say, and they're right. So it's foot. Ours."`,
      ch:[{t:'"The spur, then. Before dark."', fx:()=>{ S.f.b4_c6_raddeSaid = 1; }, go:'b4_c6_radde_2'}]}),
    b4_c6_radde_2:()=>({sp:'Sergeant Radde', txt:
`"Good." He writes the Third against something, and blows the dust off it. "The gullies run up the near side of it. They'll have a crossbow at the top and they'll see you coming, unless they don't." He shuts the book on a finger.${b46Say({darrut:` He glances at Darrut. "Aren Guard. You've cleared a roof with crossbows on it."\n\n"Once," Darrut says. "We used ladders."`, tangle:` He glances at Tangle. "And the sapper keeps the big one for the trenches. Not for a rock."\n\nTangle puts his hand flat on the satchel. "It's a very big rock," he says.`, _:''})}${b46R({orvas:`\n\nHe looks at Orvas. "And you're on your feet." Orvas looks at the spur. "The spur is a horse," he says. "A bad one. I have ridden worse."`, redblade:`\n\nHe looks at Ramin. "Red Blade. Up a rock in scale, in this." Ramin puts his helm on. "It is what the scale is for," he says.`, warlock:`\n\nHe looks at Keth. "And the Wickan keeps his head down. I'm told they'd pay well for it, over there."`})}`,
      ch:[{t:'"Sergeant."', go:()=>startExplore()},
          {t:'Out to the spur.', onward:true, go:'b4_c6_to_spur'}]}),
    b4_c6_radde_again:()=>({sp:'Sergeant Radde', txt:
`Radde is on his rock with the book, writing, and blowing the dust off what he writes. "The spur, Sergeant," he says. "Before dark. I'll be here."`,
      ch:[{t:'Leave him to it.', go:()=>startExplore()}]}),
    b4_c6_hollet:()=>({sp:'Captain Hollet · Second Company', fx:()=>{ S.f.b4_c6_hollet = 1; }, txt:
`Captain Hollet has come along the back of the pickets from the 9th's lines with a regular carrying a lantern, which is not lit, because nobody lights anything at the end of the line. He has his tablet against his chest and a cloth over his mouth, and he talks through it.

"Sergeant. The Fist said the Third was lent to the flank and I wanted to see it." He looks at the screen, and the scrapes, and the spur, and does not say what he thinks of them. "Water for two days, at the rate. The scouts say there's water in the oasis." A pause. "On the other side of them."

He looks across the basin at the trenches for a breath, and away, quickly. "I keep the numbers, Sergeant. I've done the numbers on the ramps. Three ramps, the trenches behind." He puts the tablet away inside his coat, as if he did not want it to see. "I'd like the Third back on the books in the morning. All of it."${b46Say({hessa:`\n\nHessa, behind you, says: "The numbers are not the thing that walks up the ramp, Captain."\n\nHollet looks at her, and nods, slowly, as if that were the first comfort anyone had offered him in a month.`, _:''})}`,
      ch:[{t:'"You\'ll have us back, sir."', go:()=>startExplore()},
          {t:'"Keep the numbers, sir. We\'ll keep the picket."', go:()=>startExplore()}]}),
    b4_c6_recruits:()=>({sp:'The Second Company\'s recruits', html:nerveHTML('The Second Company'), txt:
`Radde has given the end of the line a handful of the Second Company's recruits to fill the scrapes. They have dug theirs too shallow and too close together, the way frightened people dig, and they are sitting in it shoulder to shoulder with their faces toward the basin, very white under the dust. One of them is scratching his name into his spear-haft with a nail, so it will be known whose it was. The freckled girl from Aren takes the nail off him as the squad comes up, and puts it in her own pocket.

"Sergeant." She keeps her voice down, because everybody at the end of the line keeps their voice down. "Is it true they're Malazans? Over there? The Dogslayers?" Behind her a boy says *they ate the Chain* and somebody else says *the Fist says we'll go up the ramps in the morning* and a third says *the Fist says we won't*.

${b46New().includes('tallow') ? `Tallow is in the scrape with them, as he always is, with his spear upright like theirs, and he is not saying anything, which for Tallow means he has heard every word.` : b46New().includes('darrut') ? `Darrut is standing over them with his big shield, like a wall they have been told to sit behind.` : `They are watching the squad's hands, to see whether those shake too.`}`,
      ch:[{t:'"Malazans once. Not now. Get some sleep; I\'ll wake you."', fx:()=>{ S.f.b4_c6_recTold = 'steady'; b4Nerve(1, 'The Chain squad said sleep'); }, go:'b4_c6_recruits_steady'},
          {t:'"They are. They ran the Chain down the Aren Way. That\'s why we\'re here."', fx:()=>{ S.f.b4_c6_recTold = 'true'; b46L('haddat', 1); b46L('sathi', 1); }, go:'b4_c6_recruits_true'}]}),
    b4_c6_recruits_steady:()=>({sp:'The Second Company\'s recruits', txt:
`You get down into their scrape and show them how the Chain slept on the march: by count, in turns, two awake for every three down, the awake ones with a hand on a sleeper's ankle so that waking is a squeeze and not a shout. The freckled girl takes the first watch, because of course she does. The boy with the scratched haft is asleep before the count reaches him.

${b46Say({marrow:`Marrow sits on the lip above them and names the stars for them in Napan, the ones she can see through the dust, and gets most of them wrong on purpose so that they will argue with her. Two of them do. Arguing, it turns out, is as good as sleep.`, tangle:`Tangle crouches at the end of the scrape and shows them how to bank a cloak against the lip so the dust stays out of your mouth. He does it badly, and swears at it, and does it again, and by the third time they are laughing at him, quietly, which he pretends not to notice.`, _:`The squad stays a while at the scrape's end, and then goes back to its own, and nobody in the row calls after it.`})}`,
      ch:[{t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c6_recruits_true:()=>({sp:'The Second Company\'s recruits', txt:
`The freckled girl looks across the basin at the trenches, and then at the bones at the Third's throats, and at the squad's faces, one after another.

"Right," she says. "Right." She sets her spear between her knees again. Down the row a boy who has been crying without any noise stops, and wipes his face with the back of his wrist, and looks across at the trenches as if they owed him something.

${b46Say({sathi:`"The Chain," Sathi says to the boy who said *ate*. "They didn't eat it. They tried." She grins. "We were tough."`, haddat:`"Good," Haddat says to the girl. Then, lower, to the squad: "Better they hate them than fear them. Hate stands up."`, _:`"Right," the girl says again, to herself.`})}`,
      ch:[{t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c6_recruits_again:()=>({sp:'The Second Company\'s recruits', txt:
`The recruits are in their scrape with their spears, ${S.f.b4_c6_recTold === 'steady' ? 'some of them asleep, one of them snoring, very softly, into his sleeve' : 'every one of them awake and watching the basin'}.`,
      ch:[{t:'Let them be.', go:()=>startExplore()}]}),
    b4_c6_lookout:()=>({sp:'The lookout rock', scene:'b4_c6_trenches', txt: S.f.b4_c6_counted || S.f.b4_c6_countNo ?
`The lookout rock, and the basin from it, and the three ramps across the basin going up into the dust to the trenches. ${S.f.b4_c6_counted ? 'You know them now: the left one steep and narrow, the middle one broad, the right one bending in under the palms.' : 'They go in and out of the dust as they like.'}` :
`The lookout rock is a knob of red stone in the middle of the screen, chest high on the basin side, with a notch worn in the top of it by whoever has stood here before. From the notch the basin goes away north in the red light, flat, scrubby, a long bowshot and then three more, and on the far side of it the ground comes up in three long ramps.

At the top of the ramps there are trenches, earth thrown up in a long bank with stakes in it, and men moving along behind the bank. Helms. Malazan helms, round-topped, the way the 9th's are. Behind the trenches the palms of the oasis, very green for Raraku, and behind the palms the towers of the dead city, pale, broken, going up into the dust.

${b4Was('b2_ilhar') === 'lost' && b4In('haddat') ? `Haddat comes up to the rock beside you, and stands there a long breath, looking at the trenches, at the men behind the bank, one after another, as far as an eye can pick them out at this distance, which is not far. Then she makes herself stop. "The green cloths that went over to Dom," she says. "At the end. Some of them would be there." She does not say a name. She has not said it since the river.` : b4Was('b2_ilhar') === 'parted' && b4In('haddat') ? `Haddat comes up to the rock beside you and looks at the trenches a long breath. "Ilhar went back to Dom," she says. "With our mother's skins. If Dom is here, his water-carts are here." She does not look away from the fires, and she does not say anything else.` : b46Say({haddat:`Haddat comes up to the rock beside you and looks. "Hissar is that way," she says, south, behind her, without turning. "And this is where it went." She means the rebellion, or the ash, or both.`, _:`The dust comes and goes across the basin. When it comes, the trenches are not there. When it goes, they are closer.`})}`,
      ch:[{t:'Count the ramps and the trenches through the dust. (at three bowshots, in failing light)', check:['wits', 14], req:()=>!S.f.b4_c6_counted && !S.f.b4_c6_countNo,
            edges:id=>[id === 'tebbet' && ['the far view is his', 2], id === 'darrut' && ['he counted the Whirlwind from the Aren walls', 1], id === 'orvas' && ['he reads ground for a living', 1], id === 'haddat' && ['she knows how Dom\'s people dig', 1], id === 'tallow' && ['he keeps looking at the helms', -1]],
            near:{t:()=>`Yes, but a gust comes up the basin full of grit and ${NAME(ROLL().who || 'sgt')} takes it in the eyes at the notch, and sees the rest of the evening through tears. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c6_lookout_ok', fail:'b4_c6_lookout_no'},
          {t:'Come down off the rock.', go:()=>startExplore()}]}),
    b4_c6_lookout_ok:()=>({sp:'The lookout rock', scene:'b4_c6_trenches', fx:()=>{ S.f.b4_c6_counted = 1; }, txt:
`${by({tebbet:`Tebbet lies along the top of the rock with his chin in the notch and counts without moving his lips. "Three ramps," he says. "Left one's steep. Middle's broad, a wagon would go up it. Right one bends in under the palms, you can't see the top." He watches. "The trench goes along all three. Stakes in the bank. They've a fire every forty paces, shielded, like ours." He breathes out. "They know what they're doing. I'd rather they didn't."`, _:`{who} counts it out, slowly, ramp by ramp: the left one steep and narrow, the middle one broad enough for a wagon, the right one bending in under the palms where the top cannot be seen. The trench along all three, stakes in the bank, a shielded fire every forty paces. "They know what they're doing," at last.`})}

It goes into the squad's heads, where it will be wanted, and into Radde's book, where he says it will be wanted more.`,
      ch:[{t:'Come down off the rock.', go:()=>startExplore()}]}),
    b4_c6_lookout_no:()=>({sp:'The lookout rock', scene:'b4_c6_trenches', fx:()=>{ S.f.b4_c6_countNo = 1; }, txt:
`The dust thickens and thins and thickens, and the ramps go in and out of it, and ${by({sgt:'you count', _:'{who} counts'})} two of them twice and the third not at all. When the light goes red and then brown there is nothing across the basin but a long dark shape with fires on it.`,
      ch:[{t:'Come down off the rock.', go:()=>startExplore()}]}),
    b4_c6_nilnether:()=>({sp:'Two Wickan children', scene:'b4_c6_trenches', fx:()=>{ if (!S.f.b4_c6_nil) { S.f.b4_c6_nil = 1; } }, txt:
`Along the back of the pickets, from the west, in the last of the red light, two children are walking: a boy and a girl, Wickan, barefoot, dirty, in clothes too big for them, holding hands. They are alone. They walk the line slowly, the way you walk a field, looking at nothing in particular, and as they pass each picket the soldiers behind the screen go quiet and stay quiet until they have gone by.

Nil and Nether. The witches of the Chain, who could speak to every spirit in the Odhan and make them answer, and cannot any more, the camp says. They come as far as the Third's fire and stop, and look at the end of the line, at the rock, at the spur, as if they had been sent to look at it. Then they turn round and walk back the way they came, still holding hands, and the dust closes behind them.${b46Say({sathi:`\n\nSathi has stood up. She watches them go the whole way, with her hand on Hackle's ruff to keep him still. "They used to make the crows talk," she says, when they have gone. Her voice is very small. "I saw it."`, marrow:`\n\nMarrow watches them go. "That is grief, child," she says. "Not sorcery. I would know it anywhere."`, haddat:`\n\nHaddat watches them go with her shield grounded. "They were children on the Chain too," she says. "Now they are older children." It is the kindest thing she could find.`, _:`\n\nThe squad watches them go. The recruits watch the squad.`})}${b46R({warlock:`\n\nKeth has gone very still. "*Look at them,*" the grandmother says, out of his mouth, harsh. "*Look at what she has done to them. And she walks them about like dogs on a string.*" Keth, his own voice: "Grandmother." The grandmother: "*Yes. Yes. I know.*"`, orvas:`\n\nOrvas watches them all the way out of sight. "The Wickans' witches," he says. "The Khundryl shamans would not sit near them at the feast. They said there was a hole where the spirits used to be." He does not say whether he believes it.`, redblade:`\n\nRamin takes his helm off as they pass, which nobody else does, and puts it back on when they are gone.`})}`,
      ch:[{t:'Let them go.', go:()=>startExplore()}]}),
    b4_c6_horse:()=>({sp:'A Wickan rider, held back', fx:()=>{ S.f.b4_c6_horse = 1; }, txt:
`Behind the pickets, a long walk back, there is a dip in the ground and the horse lines in it: the Wickans' herd, the Khundryl's, the Seti's, thousands of horses on long pickets with their heads down in the dust, and a Wickan rider of the youths sitting on a rock at the near end of them with his knees up, watching the trenches.

"No room," he says, when the sergeant comes by, as if he had been asked. "On the ramps. For horse. The officers say." He is fourteen, perhaps. He has a long knife across his knees and a scar on his cheek that is newer than he is. "So we wait here, and you go up." He looks at the infantry with a kind of envy that he would cut his own hand off rather than admit. "If they run, we ride them down. If they don't run." He shrugs.${b46Say({sathi:`\n\nSathi crouches down by him and says something in Wickan, low and fast, and he laughs, startled, and answers, and for a while they are talking about horses, which is what Wickans talk about when they are frightened.`, _:''})}${b46R({orvas:`\n\nOrvas nods to him, rider to rider. "The Khundryl wait too," he says. "Behind you." The boy looks at the black tears. "Then we'll be first," he says, and Orvas laughs.`, warlock:`\n\nThe boy sees Keth, and stands up. "You're with the Malazans," he says, in Wickan. "Temul said." Keth nods. The grandmother is silent in him.`})}`,
      ch:[{t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c6_seti:()=>({sp:'A Seti archer', fx:()=>{ S.f.b4_c6_seti = 1; }, txt:
`A Seti woman archer is standing at the end of the screen with her bow across her back and her horse left behind with the herd, looking at the spur with her chin up. She is one of the women archers whose wounded the Third sat with on the barrow night, and she has walked from the horse lines to the end of the line on foot, which for a Seti is a long way and an insult.

"Chain squad," she says. "My society remembers." She looks at the screen, and the scrapes, and the Third. "The horse is held back. The officers say no room. So the Seti are nothing tonight." She takes her bow off her back. "I asked my society. They said go and stand with the ones who stood with us." She grins, tight. "I will stand your picket. I have my own arrows."`,
      ch:[{t:'"Stand with us, then."', fx:()=>{ S.f.b4_c6_setiStood = 1; b46L('tebbet', 1); }, go:()=>startExplore()},
          {t:'Lift a hand to her.', fx:()=>{ S.f.b4_c6_setiStood = 1; }, go:()=>startExplore()}]}),
    b4_c6_screen:()=>({sp:'The picket screen', txt:
`The screen is stakes driven in a row a pace apart, sharpened, leaning out toward the basin, with thorn-brush woven through them chest high. It will not stop anybody who means it. It will stop them for long enough. ${b46Ph() >= 2 ? `At night it is a black line against a blacker basin, and the Dogslayers' fires across the way are on the other side of it, a string of red sparks along the ramps that comes and goes in the dust.` : `Through the brush the basin goes away north, red, toward the ramps.`}`,
      ch:[{t:'Back from it.', go:()=>startExplore()}]}),
    b4_c6_scrape:()=>({sp:'A scrape behind the screen', txt: S.f.b4_c6_dug || S.f.b4_c6_digNo ?
`The scrape behind the screen, ${S.f.b4_c6_dug ? 'knee deep now, with its lip built up toward the basin' : 'as shallow as the sand would let it be'}, and the dust settling in the bottom of it.` :
`A scrape in the hard sand behind the screen, the length of a man and a hand deep, which is as deep as whoever dug it could get before the sand turned to something like stone. It will hold a soldier lying down. It will not hold one kneeling.`,
      ch:[{t:'Dig the scrapes deeper before dark. (sand like stone, short tools)', check:['might', 14], req:()=>!S.f.b4_c6_dug && !S.f.b4_c6_digNo,
            edges:id=>[id === 'tangle' && ['a sapper digs for a living', 2], (id === 'hessa' || id === 'darrut') && ['shield-line shoulders', 1], id === 'haddat' && ['she knows this sand', 1], id === 'tebbet' && ['an archer\'s hands are for the string', -1]],
            near:{t:()=>`Yes, but the sand under the sand is stone, and ${NAME(ROLL().who || 'sgt')} tears both palms open on the haft getting through it. ${2 + lvT()} health down at the start of the next fight.`, fx:()=>bruise(ROLL().who || 'sgt', 2 + lvT())},
            go:'b4_c6_scrape_ok', fail:'b4_c6_scrape_no'},
          {t:'Leave it.', go:()=>startExplore()}]}),
    b4_c6_scrape_ok:()=>({sp:'A scrape behind the screen', fx:()=>{ S.f.b4_c6_dug = 1; }, txt:
`${by({tangle:`Tangle does it the sappers' way, which is to find where the stone is weakest and go through it there, and then to make everybody else do the rest. By dusk every scrape at the end of the line is knee deep with its lip built up toward the basin. "Now it's a trench," he says. "A small one. Don't tell the trenches."`, _:`{who} goes at it until the stone under the sand gives, and the rest of the squad takes turns after, and by dusk every scrape at the end of the line is knee deep with its lip built up toward the basin.`})}${b4In('tallow') ? ` Tallow lies down in his and says it is the best bed he has had since the transports.` : ''}`,
      ch:[{t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c6_scrape_no:()=>({sp:'A scrape behind the screen', fx:()=>{ S.f.b4_c6_digNo = 1; }, txt:
`The sand under the sand is stone, and the short tools the 9th was issued were made for sand. ${by({sgt:'You get', _:'{who} gets'})} a hand's depth further and the haft snaps. The scrapes stay as they are: deep enough to lie in, and no deeper.`,
      ch:[{t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c6_west:()=>({sp:'Along the pickets', txt:
`West along the basin's edge the blocking legion's pickets go away into the dust, a screen and a squad every hundred paces, and none of them is the Third's.`,
      ch:[{t:'Not that way.'}]}),

    /* ---- the spur: the Dogslayer post that watches the blocking legion (the afternoon fight) ---- */
    b4_c6_to_spur:()=> !S.f.b4_c6_raddeSaid ? ({sp:'The spur', txt:
`East, the arm of red rock runs out from the rim into the basin. Radde will want to talk before anybody goes out there.`,
      ch:[{t:'Not yet.'}]}) : S.f.b4_c6_nestDone ? ({sp:'The spur', txt:
`The spur, and the wall of stones at the top of it, and nobody on it now but a pair of the blocking legion's regulars with a horn, who wave.`,
      ch:[{t:'Not that way.'}]}) : ({sp:'The spur', txt:
`The spur runs out from the rim into the basin, a long arm of red rock with gullies up its near side and a knob at the end, and at the top of the knob, if you look long enough, there is a wall of stones that the wind did not build. A shape moves behind it. A helm. The glint of a crossbow's prod.

The gullies go up toward it, steep, full of loose stone.`,
      ch:[{t:'Up the gullies.', onward:true, go:'b4_c6_spur_start'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c6_spur_start:()=>({sp:'Under the spur', scene:'b4_c6_trenches', txt:
`At the foot of the gullies the dust is thick and the rock is hot from the day, and there is the sound, above, of somebody laughing and somebody else telling him to be quiet, in Malazan. Plain Malazan. A Quon voice and a Kartool one. Soldiers' talk: a bet, and a sergeant ending it.

The post on the spur is Dom's. The talk is the Empire's.${b46Say({hessa:`\n\nHessa grips her spear. "Kartool," she says. "That one is from my city." She sounds as if she has been waiting for it.`, darrut:`\n\nDarrut has his shield up already. "Aren," he says, of one of the voices. "Old Quarter. I'd know it anywhere." He does not say any more.`, _:''})}${b46R({orvas:`\n\nOrvas looks up the gullies. "A bad horse," he says again, and grins. "I will go first."`, redblade:`\n\nRamin draws, slowly, so as not to catch the light. "They speak our tongue," he says. "That is worse than anything they could say in theirs."`, warlock:`\n\n"*Malazans,*" the grandmother says, low. "*Killing Malazans. The Empire eats itself, children. It always did.*"`})}`,
      ch:[{t:'"Up. Shields over heads."', go:()=>startBattle('b4_c6_nest', {})},
          {t:'Tangle puts two sharpers up among the rocks under the crossbows.', tag:'uses 2 sharpers', req:()=>b4In('tangle') && (S.inv.sharper || 0) >= 2, fx:()=>{ S.inv.sharper -= 2; }, go:()=>startBattle('b4_c6_nest', {pre:true})},
          {t:'Go up the far gully, out of their sight, and be on them first.', check:['wits', 15],
            edges:id=>[id === 'tebbet' && ['hills: he grew up on slopes like this', 2], id === 'sathi' && ['she can move without a sound', 1], id === 'orvas' && ['he reads the ground', 1], id === 'haddat' && ['she knows rock like this', 1], (id === 'hessa' || id === 'darrut') && ['the big shields scrape the rock', -1]],
            near:{t:'Yes, but a stone goes from under a boot halfway up and rattles all the way down, and the laughing at the top stops.'},
            go:()=>startBattle('b4_c6_nest', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c6_spur_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c6_spur_seen:()=>({sp:'Under the spur', scene:'b4_c6_trenches', txt:
`The far gully is longer than it looked, and looser, and a whole slab of it goes out from under ${by({sgt:'you', _:'{who}'})} and down in a slide of grit and noise. A whistle goes, at the top. Crossbows come over the wall of stones.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b4_c6_nest', {surprise:'e'})}]}),
    b4_c6_nest_after:()=>({sp:'The spur\'s top', scene:'b4_c6_trenches', fx:()=>{ if (!S.f.b4_c6_nestDone) { S.f.b4_c6_nestDone = 1; gain('b4_c6_trenchspade'); } }, txt:
`The spur is the Third's. Those who could run have gone down its far side and away across the basin toward the ramps, and the rest are lying among the stones of their own wall. The sergeant with the whistle is sitting against it with his helm off and his eyes open, and the badges cut off his sleeves, and a Malazan army knife in his belt.

In the hollow there is their kit, laid out the Malazan way, and among it a sapper's short spade, issue, the haft worn dark, with an edge ground on one side of the blade. The trenches on the ramps were dug with spades like it.${b46Say({tangle:`\n\nTangle picks it up and weighs it and looks at the edge. "Ours," he says. "Moranth steel, sapper issue, Unta forge." He looks across the basin at the trenches. "They dug those with ours." He slings it across his back without asking anybody. "Now it digs for us."`, _:`\n\nIt goes into the kit. Tangle will want it, if anybody does.`})}${b46Say({haddat:`\n\nHaddat stands over the sergeant a while with her shield on her arm. She looks at the cut threads on his sleeve where the badges were, and at his face. "He was ours," she says. "Then he was theirs." She breathes out. "Now he is nobody's."`, marrow:`\n\nMarrow kneels by him, out of habit, and then does not touch him. "Gone, child," she says, to herself.`, _:''})}${b46R({orvas:`\n\nOrvas stands on the wall at the top of the spur and looks back along the line, west, at the blocking legion's pickets going away into the dust. "From here they could see everything," he says. "Now we can."`, redblade:`\n\nRamin wipes his blade on the sergeant's cloak. "One fewer on the list," he says.`, warlock:`\n\n"*There,*" the grandmother says. "*The spur is quiet. The rock is glad of it.*"`})}

The blocking legion sends two regulars and a horn to hold the spur. The Third goes back to the end of the line. The sun is very low.`,
      ch:[{t:'Back to the picket, and Radde.', onward:true, go:()=>startExplore()},
          {t:'Not now. A moment on the spur.', go:()=>startExplore()}]}),

    /* ---- dusk: the Dogslayer skirmishers probe the end of the line ---- */
    b4_c6_dusk_start:()=>({sp:'Sergeant Radde', scene:'b4_c6_trenches', txt:
`Radde is at the screen with the book shut and his stick in his hand, looking at the basin, where the dust has gone the colour of rust and the light is going out of it.

"They'll come," he says. "Now, while there's light enough to find the end of the line and not enough to shoot them by. The spur was their eyes. They'll want to know what's become of their eyes." He looks along the scrapes, at the recruits, at the company's regulars getting their shields up. "Second Company's with you. All of it I could find."

And out in the basin, low, in the scrub, there is movement: shapes going from bush to bush, bent double, in twos, coming for the end of the screen.${b46Say({tebbet:`\n\n"Skirmishers," Tebbet says, very calm, with an arrow on the string. "Twos. Left and middle. I can't count them in the dust."`, sathi:`\n\n"Out there," Sathi says, low. Hackle's lip is up. "Left. Lots."`, _:''})}${b46R({orvas:`\n\nOrvas sets his lance in the scrape. "On foot," he says. "Both sides. Good. It is fair."`, redblade:`\n\nRamin puts his helm on. "Dusk," he says. "The Dogslayers' hour. They took the Chain at dusk, twice."`, warlock:`\n\n"*Here they come, children,*" the grandmother says. "*Bent over like old women. Mind them.*"`})}`,
      ch:[{t:'"Screen! Here they come."', go:()=>startBattle('b4_c6_dusk', {})},
          {t:'Tangle puts two sharpers in the scrub in front of the screen.', tag:'uses 2 sharpers', req:()=>b4In('tangle') && (S.inv.sharper || 0) >= 2, fx:()=>{ S.inv.sharper -= 2; }, go:()=>startBattle('b4_c6_dusk', {pre:true})},
          {t:'Let them come close, and stand up all at once.', check:['wits', 15],
            edges:id=>[id === 'darrut' && ['gates and drill: hold, then all at once', 2], id === 'tebbet' && ['he watches movement, not shapes', 1], id === 'sathi' && ['she hears them before she sees them', 1], S.f.b4_c6_counted && ['the squad counted the ground from the rock', 1], S.f.b4_c6_dug && ['the scrapes are deep enough to wait in', 1], id === 'tallow' && ['he wants to stand up now', -1]],
            near:{t:'Yes, but one of the recruits stands up too soon, and the skirmishers go flat in the scrub, and come on more carefully.'},
            go:()=>startBattle('b4_c6_dusk', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c6_dusk_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c6_dusk_seen:()=>({sp:'The screen at dusk', scene:'b4_c6_trenches', txt:
`The skirmishers do not come close. They go flat in the scrub a long throw off and wait, and then they come all at once from somewhere else, round the end of the screen where the rock starts, and ${by({sgt:'you are', _:'{who} is'})} still looking at the scrub.`,
      ch:[{t:'Shields.', go:()=>startBattle('b4_c6_dusk', {surprise:'e'})}]}),
    b4_c6_dusk_after:()=>({sp:'The screen at dusk', scene:'b4_c6_trenches', fx:()=>{ if (!S.f.b4_c6_duskDone) { S.f.b4_c6_duskDone = 1; gain('b4_c6_dogslayer'); gain('b4_c6_pickethorn'); } }, txt:
`They go back into the dark the way they came, fewer, and the basin closes behind them, and the end of the line is the end of the line again.

The company's regulars are standing in the scrapes with their shields up, breathing, looking at each other. ${b4Mood() === 'steady' ? 'They held, and they know it.' : 'They held. They are not sure how.'} The freckled girl is sitting in the bottom of her scrape with her spear across her knees and blood on the point of it, looking at the blood.

One of the skirmishers is lying against the screen where he fell. On his sleeve, where the Empire's badge would be, there is a square of red cloth with a dog's head stitched on it in black, and a bar of black across its throat. A regular cuts it off with his knife and holds it out to the sergeant, without a word. The Third knows what it is. It goes into the kit.${b46Say({haddat:`\n\nHaddat looks at the badge in your hand a long while. "They named themselves for it," she says. "For us. For the Chain." She closes your hand over it with hers. "Keep it. Remember what they think they are."`, sathi:`\n\nSathi spits at the badge, carefully, and grins. "Now it's ours," she says.`, _:''})}

Radde comes along the scrapes with the book and a cow's horn on a thong, and puts the horn in the sergeant's hand. "The picket's horn," he says. "It goes with the end of the line. Blow it and two of ours come up, wherever you are. Once." He looks at it. "After that they know the sound, and it's only a horn." He writes.${b46R({orvas:`\n\nOrvas is sitting on the lip of a scrape with his lance across his knees. "On foot," he says, to nobody. "We held on foot." He seems surprised by himself.`, redblade:`\n\nRamin cleans his blade on the scrub. "Their hour," he says. "Not tonight."`, warlock:`\n\n"*There,*" the grandmother says, out of Keth. "*They will tell the trenches the end of the line has teeth.*"`})}`,
      ch:[{t:'The night.', onward:true, go:'b4_c6_nightfall'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c6_nightfall:()=> !S.f.b4_c6_duskDone ? ({sp:'The picket', txt:
`The light is going. Radde will want the screen before it goes.`,
      ch:[{t:'Not yet.'}]}) : S.area === 'b4_c6_night' ? ({sp:'The picket at night', txt:
`The night has come already. Radde has set the watch, and the Third has its scrapes at the end of the line.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}) : ({sp:'Nightfall', scene:'b4_c6_eve', txt:
`The light goes. It goes red and then brown and then it is gone, and the dust goes on coming down in the dark, and all along the lines to the west the fires come up behind their shields, a long low string of them, and across the basin, on the ramps, the Dogslayers' fires come up the same.

Radde sets the watch. He puts the Third in the scrapes at the end, the company's regulars along the screen, and the recruits in the middle, where they can see the squad on one side and the regulars on the other. "Midnight," he says. "I'll want you at midnight, Sergeant. Sleep till then if you can."`,
      ch:[{t:'The night.', onward:true, go:()=>{ S.f.b4_c6_ph = 2; startExplore('b4_c6_night'); talk('b4_c6_night_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}]}),

    /* ---- the night at the picket: the eve, the Barrow line, the listen, the recruits, the Seti archer, and the key at midnight ---- */
    b4_c6_night_arrive:()=>({sp:'The picket at night', scene:'b4_c6_eve', fx:()=>{ if (b46Seti()) S.f.b4_c6_setiStood = 1; }, txt:
`Night at the end of the line. The screen is a black row of stakes against a blacker basin, and beyond it the Dogslayers' fires go along the ramps in a string of red sparks that the dust puts out and lights again. Somewhere over there somebody is singing, faint, a Malazan marching song with the words changed. The squad knows the tune.

Radde has opened a gap in the middle of the screen, in front of the Third's fire, where a picket can go out and come back. The orders are that it stays shut.${b46Barrow() ? `\n\n${b46Barrow()}` : ''}

${b46Say({haddat:`Haddat stands the first watch at the screen, because she always does. At the end of it she says the names, under her breath, all of them, the Chain's and the 9th's, ${S.f.b4_c5_desDone ? 'and the six of the 10th from the canal city, ' : ''}and adds the sergeant on the spur, whose name she does not know. "A man," she says. "He was a man."`, marrow:`Marrow goes along the scrapes in the dark with her hands, a touch on every shoulder, the squad's and the recruits', and calls them all "child", and none of them minds.`, _:`The squad takes the scrapes at the end of the line and lies down in them with the dust coming down, and waits for midnight.`})}${b46R({orvas:`\n\nOrvas lies in his scrape on his back with his lance along his side. "The horse lines are very far," he says, to the dark. "I can hear them. I think I can hear them."`, redblade:`\n\nRamin sits up in his scrape with his helm on his knees. "The song," he says. "It is ours. They have changed the words." He listens. "Badly."`, warlock:`\n\nKeth lies on his back in the scrape. "*Hush,*" the grandmother says, to the squad, to the night. "*Hush. She is listening. Let her hear nothing.*"`})}`,
      ch:[{t:'The fire, behind its shield.', go:'b4_c6_picketfire'},
          {t:'Walk the picket.', go:()=>startExplore()}]}),
    b4_c6_eve:()=>({sp:'The eve', scene:'b4_c6_eve', again:()=>'The fire behind its shield, and the squad round it in the dark. Who they were, before.', txt:
`The eve of a thing is the night before it, and nobody at the end of the line has been told what the thing is, or when, but everybody knows it is the eve. It is in the dust, and the songs across the basin, and the way the regulars along the screen keep touching their gear.

At the fire the squad talks, one at a time, low, the way soldiers talk the night before: about before. Before the Chain. Before the 9th. Before any of it.`,
      ch:[{t:'Haddat.', req:()=>b4In('haddat'), go:'b4_c6_eve_haddat'},
          {t:'Sathi.', req:()=>b4In('sathi'), go:'b4_c6_eve_sathi'},
          {t:'Tangle.', req:()=>b4In('tangle'), go:'b4_c6_eve_tangle'},
          {t:'Marrow.', req:()=>b4In('marrow'), go:'b4_c6_eve_marrow'},
          {t:'Tallow.', req:()=>b4In('tallow'), go:'b4_c6_eve_tallow'},
          {t:'Hessa.', req:()=>b4In('hessa'), go:'b4_c6_eve_hessa'},
          {t:'Tebbet.', req:()=>b4In('tebbet'), go:'b4_c6_eve_tebbet'},
          {t:'Darrut.', req:()=>b4In('darrut'), go:'b4_c6_eve_darrut'},
          {t:'Orvas.', req:()=>b4In('orvas'), go:'b4_c6_eve_orvas'},
          {t:'Ramin.', req:()=>b4In('redblade'), go:'b4_c6_eve_redblade'},
          {t:'Keth.', req:()=>b4In('warlock'), go:'b4_c6_eve_warlock'},
          {t:'Back to the fire.', go:'b4_c6_picketfire'}]}),
    /* the eve: one scene a squadmate, who they were before (each guarded by the menu above; each once raises their regard) */
    b4_c6_eve_haddat:()=>({sp:'Haddat', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_haddat) { S.f.b4_c6_eve_haddat = 1; b46L('haddat', 1); } }, txt:
`Haddat sits with the blue shield across her knees and the brass and the badge on its rim catching the firelight. For a while she polishes them. Then she stops.

"Before," she says. "Before, I was a water-seller's daughter in Hissar, in the quarter by the old wells, and I carried skins on a yoke from the time I could stand. My mother knew every hole in the Holy Desert and sold water to anybody who would pay, and some who would not." She turns the shield a little. "I took the Empire's silver when I was twenty-one, because the Empire paid in coin and the tribes paid in salt, and my mother said I was a fool, and then she said I was her fool, and then she gave me this." She touches the rim. "It was my grandfather's. He took the silver too."

${b4Was('b2_ilhar') === 'came' ? `"My brother sells water in Aren now," she says. "The old way. He came over at the end. He says I was right." She smiles, a little. "He has never said that before."` : b4Was('b2_ilhar') === 'fell' ? `"My brother would have been over there," she says, of the trenches, very low. "If he had lived." She says his name, once, into the fire. She does not often.` : b4Was('b2_ilhar') === 'parted' ? `"My brother went back to Dom," she says, of the trenches. "With our mother's water." She does not look at the fires. "He was alive when he went. I hold on to that part."` : b4Was('b2_ilhar') === 'lost' ? `She looks across the basin at the fires on the ramps. "My brother is somewhere," she says. "I do not know where. I have stopped looking at faces." A breath. "Nearly."` : `"I had a brother," she says, and does not go on, and you do not ask.`}${S.f.b4_fallClimbed === 1 ? `\n\n"On the hill outside Aren I said the names," she says. "All of them. I will say them again after this." She looks at the squad round the fire. "I would like there to be no new ones."` : ''}`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),
    b4_c6_eve_sathi:()=>({sp:'Sathi', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_sathi) { S.f.b4_c6_eve_sathi = 1; b46L('sathi', 1); } }, txt:
`Sathi lies on her back in the scrape with her head on Hackle's flank, and he lets her.

"Before," she says, to the sky, which has no stars in it. "Before, I stole a horse when I was nine. From my uncle. A grey mare with one white foot. I rode her out onto the plain and didn't come back for three days, and when I came back he beat me, and then he gave her to me." She laughs, with all her filed teeth. "That's the Weasels. They beat you for the thing and then they give it you."

She is quiet a while. "The clan sent us south with Coltaine. All the young ones. The grey mare's daughter died at the river. The Weasels are scattered now, the ones that are left." She scratches Hackle's ear. "This one's my clan. And you lot. That's the whole herd."

"Don't tell anyone I said it," she says, after a while. "I'll say you made it up."`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),
    b4_c6_eve_tangle:()=>({sp:'Tangle', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_tangle) { S.f.b4_c6_eve_tangle = 1; b46L('tangle', 1); } }, txt:
`Tangle has the satchel on his knees, shut, and the new spade across his back, and the Kanese prayer bead between his finger and thumb, turning.

"Before," he says. "Before, I blew stumps for farmers in Itko Kan. A Moranth cracker, bought off a trader in Kan city at a price that would make you weep. A stump in a field is a whole season's work with an axe. With me it was a morning and a bang." He turns the bead. "My mother gave me this the day I went for a sapper. She said, *pray before you light it, not after.* I said, *what if there isn't time before.* She said, *then there won't be an after either, so it doesn't matter.*" He looks at the bead. "She was right. I hate when they're right."

He counts the satchel by feel, through the leather, without opening it. Twice. "The Moranth don't do stumps," he says. "Everything they make is for people." He hums the four notes, and stops.`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),
    b4_c6_eve_marrow:()=>({sp:'Marrow', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_marrow) { S.f.b4_c6_eve_marrow = 1; b46L('marrow', 1); } }, txt:
`Marrow is tying knots in her string, not for anybody, just tying them.

"Before, child," she says, "I was a novice of Soliel in Nap, and I scrubbed the temple steps for two years before they let me near a warren, and when they did, I was good at it, and they did not like that, because I was a fisherman's daughter." She ties a knot. "So I left, and the army does not care whose daughter you are if you can close a wound. Thirteen years." Another knot. "I have closed a great many wounds."

She holds the string up to the firelight. It is long now. "One for each one I couldn't," she says. "I started it in Hissar. I thought it would be short." She lowers it. "The warren is very quiet tonight. Like a held breath. I don't like it, child. I don't like anything a warren does when it holds its breath."${S.f.b4_carried === 1 ? `\n\n"We carried them out of the ford," she says. "At the Vathar. Our dead, and the Chain's." She ties a knot, gently. "I would carry them again."` : ''}`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),
    b4_c6_eve_tallow:()=>({sp:'Tallow', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_tallow) { S.f.b4_c6_eve_tallow = 1; b46L('tallow', 1); } }, txt:
`Tallow has his grandmother's deck out of its oilcloth, and he lays three cards on the upturned shield without being asked, face down, quick, the way she did for the boats on the last night before the big shoals. "She'd read the night," he says. "Not the fish. The night. She said the night tells you whether to go out."

He turns the first. A soldier, small, worn nearly white at the corners. The second: a door with a grey figure in it, face turned away. He turns the third, and stops, and the squad sees it: a figure in rags with a bell, walking, its face gone in the paint. It is not one of hers. It is one the deck has started turning up since the Wall, and none of the readers in the 9th can say where it came from.

He puts all three back in the pack very fast and wraps it in the oilcloth and puts it inside his shirt. "She'd have said stay in," he says. His voice is not steady. "She'd have said, *not tonight, Tal.* She always said that when the bell came." He swallows. "But there's no in. Is there."

"Before," he says, after a while, because it is the eve and that is what everybody is talking about. "Before, I gutted fish in a shed with forty other people and sang. That's it. That's all I was." He laughs, shakily. "I was good at it."`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),
    b4_c6_eve_hessa:()=>({sp:'Hessa', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_hessa) { S.f.b4_c6_eve_hessa = 1; b46L('hessa', 1); } }, txt:
`Hessa sits very straight with the spear upright beside her and the shield grounded, the way she must have sat on the temple steps.

"Before," she says, "I stood a door. The Grand Temple's east door, in Kartool, where the pilgrims come in from the river. Six years. A spear, a shield, a face like a door." She considers the basin. "You learn a great deal standing a door. Who comes in with their hands open. Who comes in with them shut. Who comes back out."

"The priests said D'rek eats everything in the end, and that is not cruelty, it is the floor of the world. Rot is the floor." She turns the spear a little in her fingers. "I believed it. I believe it now. It is a comfort, on a night like this." A breath. "I did not leave because I stopped believing."

She does not say why she did leave. "After," she says, when you wait. "I will tell you after. If there is an after." She seems to think that is a fair bargain.`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),
    b4_c6_eve_tebbet:()=>({sp:'Tebbet', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_tebbet) { S.f.b4_c6_eve_tebbet = 1; b46L('tebbet', 1); } }, txt:
`Tebbet is lying along the lip of his scrape with his bow beside him and his chin on his fists, watching the fires on the ramps, and does not turn his head.

"Before," he says, "I kept goats on a hill in Dal Hon. My father's goats, and his father's. You sit on a rock above them all day with a bow across your knees, and you watch for the wild dogs, and sometimes the dogs come." A pause. "That's where you learn to want to be a long way off, and up high, and nothing moving that you didn't see first."

"The Dal Honese dream," he says. "My grandmother dreamt the day the Empire came up the valley. Three days before." He watches the fires. "I've dreamt of sand for a year. Before I'd seen any. And last night I dreamt of this. The ramps. The fires." He does not say what else.

"I'd rather be a long way off," he says, quietly. "I'd rather be on my hill." He picks up the bow. "I'm here."`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),
    b4_c6_eve_darrut:()=>({sp:'Darrut', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_darrut) { S.f.b4_c6_eve_darrut = 1; b46L('darrut', 1); } }, txt:
`Darrut has his feet to the fire and his helm on his knee, full of dust, and he empties it and fills it again with nothing and looks into it.

"Before," he says, "I was the baker's boy in the Old Quarter. Ovens under the street. My father's, then my brother's. I could have had it." He turns the helm. "I joined the Guard because the Guard ate first in a famine and didn't knead at four in the morning. Twelve years. Gates, drill, the drunk captains, the camel in the governor's garden." He nearly smiles. "I've told you the camel."

"When the Fist came out of the Guard to command the 9th," he says, "some of us asked to go with him. Because once, when it mattered, he'd stood with us. On a day I don't talk about." He puts the helm on. "He's a sour old bastard. He thinks we're all finished. He's probably right." He looks at the basin. "I came anyway."

"I was on the wall," he says, after a while, low. Then he stops. "That's all I'll say about the wall." But for a breath he very nearly did.`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),
    b4_c6_eve_orvas:()=>({sp:'Orvas', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_orvas) { S.f.b4_c6_eve_orvas = 1; b46L('orvas', 1); } }, txt:
`Orvas is sitting with his lance across his knees and his face toward the horse lines, a long way behind in the dark, and the black tears on his cheeks go red and dark in the firelight.

"Before," he says. "Before, I was my mother's third son and the worst rider of the three, and I minded very much." He laughs. "I rode every day until I was not. Every summer of my life on a horse." He turns the lance. "And then the Chain went down the Aren Way, and the Khundryl rode away from it. And Gall said we had shamed ourselves, and he was right, and we put the tears on." He touches one. "They are the reason. That is all."

"Gall says, *we are not Wickans, but we shall strive to be.*" He says it carefully, a heavy thing to carry. "I say it too. I do not know yet what it means." He looks at the trenches. "Perhaps tomorrow."

"I would like to be on a horse," he says. "I am on my feet, at the end of the Malazans' line, with a Malazan squad." He grins, and it costs him nothing at all. "My mother would laugh until she fell over."`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),
    b4_c6_eve_redblade:()=>({sp:'Ramin', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_redblade) { S.f.b4_c6_eve_redblade = 1; b46L('redblade', 1); } }, txt:
`Ramin is sitting in his red scale with his helm on his knees, polishing it with his sleeve, slowly, though the dust will have it again by morning.

"Before," he says, "I was my father's son, in Ehrlitan, and my father was a Red Blade, and so I was going to be a Red Blade, and that was before." He polishes. "We swore to the Empire in a city that hated us for it. My father said that was the point. Anybody can swear to a thing everybody loves." He holds the helm up to the firelight. "In Aren they put us in the cells for it. And the Fist of the 9th let us out."

He looks at the trenches across the basin. "Some of the men over there wore the red once. Not many. Some." He puts the helm down. "My father would want to know their names. I will find out, after." He seems certain there will be an after for that.`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),
    b4_c6_eve_warlock:()=>({sp:'Keth', scene:'b4_c6_eve', fx:()=>{ if (!S.f.b4_c6_eve_warlock) { S.f.b4_c6_eve_warlock = 1; b46L('warlock', 1); } }, txt:
`Keth sits with his palms flat on the sand, and for a while it is only Keth: a boy of the Foolish Dog, thin, tired, with the dust in his hair.

"Before," he says, in his own voice, "I was the boy who could hear her. My grandmother. After she died. Nobody else could." He looks at his hands. "The clan didn't know what to do with me. Then Coltaine took us south, and on the Chain everybody could hear something." He smiles, a little. "I wasn't strange any more."

"*He was always strange,*" the grandmother says, out of his mouth, fond. "*A strange, good boy. Now listen.*" Her voice goes low. "*Over there, under the palms, she is awake. The goddess. She is pulling everything in Raraku toward her, like a woman pulling in a net.*" A breath. "*And the old things in the sand are pulling back. Something is going to tear, children. Soon. Mind where you stand when it does.*"

Keth, his own voice again, small: "She doesn't know what. She never knows what." He takes his palms off the sand.`,
      ch:[{t:'Back to the eve.', go:'b4_c6_eve'}]}),

    /* the listening post: the Long Listen, taught by Radde (or Darrut's gate nights) */
    b4_c6_listenpost:()=>({sp:'The lookout rock at night', scene:'b4_c6_eve', txt: S.f.b4_c6_listenTried ?
`The lookout rock in the dark, with a regular lying along the top of it with his ear to the stone, listening to the basin.` :
`At night the lookout rock is a listening post. Radde is lying along the top of it on his belly, with his cheek on the cold stone and one hand over his other ear, and he does not move when the squad comes up.

"Listen," he says, very low. "Not look. You can't see anything out there. Listen." He breathes through his mouth. "Two wars, Sergeant, and the picket that lived was the one that listened. Lie down. Ear to the rock. Hand over the other. Breathe through your mouth, your nose whistles." He shuts his eyes. "And then wait till the dark tells you something."${b46Say({darrut:`\n\nDarrut is already lying down beside him. "Gate nights at Aren," he says. "The old ones taught us this on the gate. You hear the cart before the drivers know they're coming."`, tebbet:`\n\nTebbet lies down along the rock without being asked, and goes so still that the regular beside him checks he is breathing.`, _:''})}`,
      ch:[{t:'Learn to hear the dark. (the Long Listen)', check:['wits', 15], trick:'b4_c6_listen', req:()=>!S.f.b4_c6_listenTried, fx:()=>{ S.f.b4_c6_listenTried = 1; },
            edges:id=>[id === 'tebbet' && ['a goat-herd listens for the dogs all day', 3], id === 'darrut' && ['gate nights at Aren', 1], id === 'sathi' && ['she hears horses before she sees them', 1], id === 'orvas' && ['he has kept night watch for a herd', 1], id === 'tallow' && ['his heart is louder than the basin', -1], id === 'hessa' && ['a temple door listens to footsteps, not the dark', -1]],
            near:{t:()=>`Yes, but it takes half the night with a cheek on cold stone and the dust in the ear, and ${NAME(ROLL().who || 'sgt')} comes down off the rock stiff in every joint and half deaf on one side. Rattled: −1 on the next check.`, fx:()=>{ S.rattled ??= {}; S.rattled[ROLL().who || 'sgt'] = 1; }},
            go:'b4_c6_listen_ok', fail:'b4_c6_listen_no'},
          {t:'Leave Radde to it.', go:()=>startExplore()}]}),
    b4_c6_listen_ok:()=>({sp:'The lookout rock at night', scene:'b4_c6_eve', txt:
`${by({tebbet:`Tebbet lies with his ear on the rock and his eyes shut, and after a long while he says, very low: "Crickets out on the left, then not. Something went by them." A while more. "A man, walking, far out, stops every ten paces. Then two. Then they go back." He opens his eyes. "Like the dogs on the hill. You hear where they've been by where the noise stops."\n\nRadde opens one eye and looks at him. "Dal Hon," he says. "You'll do."`, darrut:`Darrut lies with his ear to the rock and his hand over the other one, and his lips move, counting. "Boots," he says at last. "Two. Left. Walking and stopping." He breathes. "Like carts at the gate. You know them by the stopping."\n\nRadde opens one eye. "Aren Guard," he says. "They did teach you something."`, _:`{who} lies with an ear on the cold stone and a hand over the other, and breathes through the mouth, and waits. After a long while the dark says something: crickets on the left that stop, and start again further on, where something has gone by them. A boot on a stone. Two. Then nothing, going away.\n\nRadde opens one eye. "That's it," he says. "Now you're a picket."`})}`,
      ch:[{t:'Back to the screen.', go:()=>startExplore()}]}),
    b4_c6_listen_no:()=>({sp:'The lookout rock at night', scene:'b4_c6_eve', txt:
`${by({sgt:'You lie', _:'{who} lies'})} with an ear to the rock until the cold has gone through it into the jaw, and hear the dust, and the far singing, and a heartbeat, and nothing that means anything. "It comes," Radde says, without opening his eyes. "Or it doesn't. Mine took a war."`,
      ch:[{t:'Back to the screen.', go:()=>startExplore()}]}),

    /* the recruits at night: Nerve at its test */
    b4_c6_recruits_night:()=>({sp:'The recruits in the dark', scene:'b4_c6_eve', html:nerveHTML('The Second Company'), txt: S.f.b4_c6_recNight ?
`The recruits in their scrape in the dark, ${S.f.b4_c6_recNight === 'sat' ? 'closer together than they were, and some of them asleep' : 'one fewer than there were, and none of them asleep'}.` :
`In the middle scrape, in the dark, one of the recruits has started to shake. A boy, from Quon, one of the ones who said *they ate the Chain*: he is sitting with his spear across his knees and his whole body going, quite silently, and the ones either side of him are trying not to look and looking anyway.

"I'm going back," he says, when the sergeant crouches by him. It is a whisper. "To the lines. Just to the lines. I can't, Sergeant. I can't with them right there. I can hear them singing." His teeth are going. "I'm going back."

Along the scrape every recruit is watching to see what the Chain squad will do. So are the regulars on the screen.${b4In('tallow') ? `\n\nTallow is beside him. He has his own hand clamped on his own knee, hard, to keep it still.` : ''}`,
      ch:[{t:'Sit down by him. Talk about anything but this.', req:()=>!S.f.b4_c6_recNight, fx:()=>{ S.f.b4_c6_recNight = 'sat'; b4Nerve(1, 'The Chain squad sat with the boy who shook'); b46L('marrow', 1); b46L('tallow', 1); }, go:'b4_c6_recruits_sat'},
          {t:'"Go, then. Back to the lines. Tell them the end of the line is held."', req:()=>!S.f.b4_c6_recNight, fx:()=>{ S.f.b4_c6_recNight = 'gone'; b4Nerve(-1, 'A recruit went back from the picket'); b46L('hessa', 1); }, go:'b4_c6_recruits_gone'},
          {t:'Let them be.', go:()=>startExplore()}]}),
    b4_c6_recruits_sat:()=>({sp:'The recruits in the dark', scene:'b4_c6_eve', txt:
`You sit down in the scrape by him with your shoulder against his, the way you sat on the Chain with soldiers who had stopped being able to stand, and talk. About nothing. About Quon, which you have never seen, and the fish, and whether the transports had rats, and the camel in the governor's garden at Aren, which you have heard about too many times. After a while he answers. After a longer while his teeth stop.

${b46Say({tallow:`Tallow takes over the camel, and tells it wrong, and the boy corrects him, and the scrape laughs, very quietly, all along its length, in the dark at the end of the line.`, marrow:`Marrow comes along the scrape and puts her hand on the back of his neck and leaves it there. "There, child," she says. "There. It goes. It always goes."`, _:`The ones either side of him lean in, without knowing they are.`})}

He stays. Along the scrape, they all stay.`,
      ch:[{t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c6_recruits_gone:()=>({sp:'The recruits in the dark', scene:'b4_c6_eve', txt:
`He goes. Back along the pickets in the dark, at a crouching run, with his spear trailing, and the dust takes him in twenty paces.

The scrape watches him go. Not one of them follows. A picket is better without a man who will break on it, and every old soldier on the screen knows it, and the recruits know the old soldiers know it. It does not help them at all.${b46Say({hessa:`\n\n"Better," Hessa says, quietly, to the sergeant. "A door with a crack in it is worse than no door." She is right. It costs something anyway.`, _:''})}`,
      ch:[{t:'Back to the picket.', go:()=>startExplore()}]}),
    b4_c6_seti_night:()=>({sp:'A Seti archer', scene:'b4_c6_eve', fx:()=>{ S.f.b4_c6_setiNight = 1; S.f.b4_c6_setiStood = 1; }, txt:
`The Seti archer is standing at the screen at the end of the line with an arrow nocked and her chin up, as still as the stakes, watching the basin. She has been there since dark.

"Chain squad," she says, without turning. "The Seti see in the dark better than you. We hunt at night, on the plains, for the big cats." She draws a little, and lets it back. "If they come, I will see them first. Then you will hear me." She grins at the basin. "Then they will."`,
      ch:[{t:'Leave her to the screen.', go:()=>startExplore()}]}),

    /* ---- the key at midnight: hold the picket as posted, or go forward and look ---- */
    b4_c6_radde_night:()=>({sp:'Sergeant Radde', scene:'b4_c6_eve', txt:
`Radde is sitting by the gap in the screen with the book shut on his knee, and when the sergeant comes he holds up a hand, and listens, and then lowers it.

"Midnight," he says. "Near enough."`,
      ch:[{t:'"Sergeant."', onward:true, go:'b4_c6_key'},
          {t:'"In a while."', go:()=>startExplore()}]}),
    b4_c6_key:()=>({sp:'Sergeant Radde', scene:'b4_c6_eve', txt:
`"Two things," Radde says, low, with his head toward the basin. "The orders are the picket holds where it is, all night, and nobody goes out. That's the orders. A picket that goes out isn't a picket." He turns the book over in his hands. "And they'll come. They came at dusk to find the end of the line and they found it. They'll come again after midnight to see if it's still there. Hold, and they'll find us."

He looks out through the gap at the dark. "The other thing. Up the line they don't know what's at the foot of those ramps. Not really. The officers have looked from the ridge, in daylight, with the dust in it. What's in the trenches tonight, how many, where their posts are at the foot: nobody's been to look." He shrugs. "Nobody's ordered anybody to look. A squad should. A squad that knows how to go quiet could be there and back before light, and the picket'd be short one squad for an hour."

He opens the book. "I'll write it either way, Sergeant. Hold as posted, and the Fist will hear the Chain lot did as they were told. Or go and look, and come back, and I'll write what you saw." He holds the stylus. "Don't make me write the third thing."${b46Say({tebbet:`\n\nTebbet is looking out at the dark. "I could get there," he says, very quietly. "And back." He does not finish it.`, darrut:`\n\nDarrut has his shield on his arm. "Orders are the picket holds," he says. He says it as a fact, not an argument.`, _:''})}${b46R({orvas:`\n\nOrvas looks at the basin, and then at you, and grins. He likes both.`, redblade:`\n\nRamin is already checking his scale for anything that rings. He has decided what he thinks, and keeps it to himself, which for a Red Blade is manners.`, warlock:`\n\n"*Over there,*" the grandmother says, so softly that only the sergeant hears. "*Don't look too close, child. Something over there is looking back.*"`})}`,
      ch:[{t:'"We hold the picket as posted. All night."', fx:()=>{ S.f.b4_c6_key = 'hold'; S.f.b4_saw = 'far'; S.f.b4_c6_holletSigned = 1; b4Nerve(2, 'The Chain squad held the end of the line as posted'); b46L('darrut', 1); b46L('hessa', 1); }, go:'b4_c6_hold'},
          {t:'"We\'ll go and look. Back before light."', fx:()=>{ S.f.b4_c6_key = 'forward'; S.f.b4_saw = 'close'; b4Nerve(-1, 'The picket was short a squad'); b46L('tebbet', 1); b46L('sathi', 1); }, go:'b4_c6_forward'},
          {t:'"Give me a moment, Sergeant."', go:()=>startExplore()}]}),
    b4_c6_hold:()=>({sp:'Sergeant Radde', scene:'b4_c6_eve', txt:
`Radde writes a short line by the coals, and reads it back to himself. "Held as posted," he says. "I like writing that." He shuts the book.

Along the back of the pickets in the dark, a lantern with its shutter nearly closed comes bobbing: Captain Hollet, with a regular, walking the line at midnight because he cannot sleep. He stops at the Third's fire and Radde shows him the book, and he reads the line by the coals, and takes the stylus, and signs it, which he does not do. "Good," he says. "Good, Sergeant. I'd like the end of the line still here in the morning." He goes on along the pickets with his lantern.

The squad goes back to the screen. Out in the basin the crickets stop, and start again closer.${b46R({orvas:`\n\nOrvas settles in the scrape with his lance across the lip. "We wait," he says. "Like the horse. Good. I know how to wait like the horse."`, redblade:`\n\nRamin takes his place at the gap. "The Red Blades hold where they are put," he says. "It is the only thing anybody ever praised us for."`, warlock:`\n\n"*Good,*" the grandmother says. "*Stay where the fire is, child. Let them come to the light.*"`})}`,
      ch:[{t:'To the screen. Wait for them.', onward:true, go:'b4_c6_patrol_start'},
          {t:'Not yet. The fire a while.', go:()=>startExplore()}]}),
    b4_c6_patrol_start:()=> S.f.b4_c6_patrolDone ? ({sp:'The screen', scene:'b4_c6_eve', txt:`The screen, and the gap, and the basin beyond, empty now.`, ch:[{t:'Back to the fire.', go:'b4_c6_picketfire'}]}) : ({sp:'The screen after midnight', scene:'b4_c6_eve', txt:
`After midnight the dust thins a little and there is a moon somewhere behind it, a smear, and the basin goes grey instead of black. The Third lies in the scrapes with the regulars along the screen${b46Seti() ? ', and the Seti archer standing at the end of it with an arrow nocked' : ''}, and waits.

The crickets stop on the left. Then in the middle. Then, a long throw out in the grey, there are shapes: bent, moving bush to bush, a dozen of them, more, with a bigger one in the middle, and they are not going round the end of the line this time. They are coming for the gap, where the fire is.${b46Say({tebbet:`\n\n"Patrol," Tebbet breathes, with an arrow up. "A whistle in the middle. They know where the gap is."`, sathi:`\n\nHackle's lip is up and his whole back stiff. "Here," Sathi whispers. "Now."`, _:''})}${b46R({orvas:`\n\nOrvas sets his lance in the lip of the scrape. "On foot," he whispers. "Again. I am getting good at it."`, redblade:`\n\nRamin draws, slowly, without a sound. "At the gap," he whispers. "Of course at the gap."`, warlock:`\n\n"*Now, children,*" the grandmother whispers. "*Now.*"`})}`,
      ch:[{t:'"Screen! Up!"', go:()=>startBattle('b4_c6_patrol', {})},
          {t:'Tangle puts two sharpers out into the dark beyond the screen.', tag:'uses 2 sharpers', req:()=>b4In('tangle') && (S.inv.sharper || 0) >= 2, fx:()=>{ S.inv.sharper -= 2; }, go:()=>startBattle('b4_c6_patrol', {pre:true})},
          {t:'Hear where they\'ll come through, and be there first.', check:['wits', 15],
            edges:id=>[id === 'tebbet' && ['the dark is his', 2], id === 'darrut' && ['the gate: it is always the gate', 1], id === 'sathi' && ['she hears them before she sees them', 1], S.tricks && S.tricks.b4_c6_listen && ['the Long Listen, learned on the rock', 1], S.f.b4_c6_dug && ['the scrapes are deep enough to wait in', 1], id === 'tallow' && ['his heart is louder than they are', -1]],
            near:{t:'Yes, but a regular on the screen stands up too soon, and the whistle goes, and they come on fast instead of slow.'},
            go:()=>startBattle('b4_c6_patrol', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c6_patrol_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c6_patrol_seen:()=>({sp:'The screen after midnight', scene:'b4_c6_eve', txt:
`The dark is full of small sounds and every one of them is coming from somewhere else. ${by({sgt:'You call', _:'{who} calls'})} the left, and they come through the middle, at the gap, by the fire, over the screen, with the whistle going.`,
      ch:[{t:'Shields.', go:()=>startBattle('b4_c6_patrol', {surprise:'e'})}]}),
    b4_c6_patrol_after:()=>({sp:'The screen after midnight', scene:'b4_c6_eve', fx:()=>{ S.f.b4_c6_patrolDone = 1; }, txt:
`They go back into the grey the way they came, fewer, and the whistle with them, going short and sharp and then not going at all. The crickets start again on the left.

The gap in the screen is still a gap. The fire behind it is still a fire. The company's regulars along the screen are on their feet, breathing, looking at the basin and at each other. ${b4Mood() === 'steady' ? 'They held, and they know it, and one of them laughs out loud and is told to shut up by four people at once.' : 'They held. They are not sure how, and they are not going to ask.'}

Radde comes along the screen with the book, and stops at the gap, and looks at the basin, and writes. "Held," he says. "As posted." He writes it again, underneath, which is something you have never seen him do.${b46Seti() ? `\n\nThe Seti archer is pulling her arrows out of the ground in front of the screen, the ones that missed, and looking at the ones that did not. "The society will hear of it," she says. "The Chain squad stood. The Seti stood with it." She seems pleased with both.` : ''}${b46Say({darrut:`\n\nDarrut is sitting in the gap with his big shield across his knees. "The gate," he says. "It's always the gate." He sounds very tired, and almost content.`, marrow:`\n\nMarrow is going along the regulars with her hands. "Hold still, child," she says to one. "The warren's dusty tonight. It works, it just complains."`, _:''})}${b46R({orvas:`\n\nOrvas sits back on his heels in the scrape, breathing hard. "On foot," he says. "Three times. I will tell my mother."`, redblade:`\n\nRamin wipes his blade on the scrub. "Held," he says, as if tasting the word.`, warlock:`\n\n"*There,*" the grandmother says. "*Now they know. The end of the line is a wall.*"`})}`,
      ch:[{t:'Back to the fire. First light is not far.', onward:true, go:'b4_c6_picketfire'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- forward: out from the picket in the dark, across the basin, to the foot of the ramps ---- */
    b4_c6_forward:()=>({sp:'Sergeant Radde', scene:'b4_c6_eve', txt:
`Radde looks at you a long moment, and then writes. "Out to look," he says, reading it back. "Back before light." He shuts the book. "Through the gap. Low. No metal that rings, no fire, nobody talks. The basin's flat, and their posts at the foot will have ears too." He looks at the company along the screen, who have heard every word, and who are now one squad fewer. "I'll keep the end of the line. Go."

${b46Say({tebbet:`Tebbet is already at the gap, unstrapping anything on him that might knock against anything else. "Good," he says. "Out in front, in the dark. That's where I'm best."`, sathi:`Sathi is already at the gap with Hackle at her knee, and her hand on his muzzle. "Quiet," she tells him, in Wickan, and he is.`, _:`The squad strips off anything that rings and goes to the gap.`})}${b46R({orvas:`\n\nOrvas lays his lance down by the fire. "Too long for creeping," he says, and draws a knife instead. "I will be a Wickan tonight."`, redblade:`\n\nRamin unbuckles his scale, piece by piece, and leaves it by the fire in a heap, and stands there in his padding, looking naked. "It rings," he says. "I know."`, warlock:`\n\n"*Not too close,*" the grandmother says. "*I said it. Remember I said it.*"`})}`,
      ch:[{t:'To the gap in the screen.', onward:true, go:'b4_c6_gap'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b4_c6_gap:()=> b46Key() !== 'forward' || S.f.b4_c6_out ? ({sp:'The gap in the screen', scene:'b4_c6_eve', txt:
`The gap in the screen, in front of the fire, and the basin beyond it in the dark${S.f.b4_c6_outpostDone ? ', where the squad has been and come back from' : ''}. ${b46Key() === 'hold' || !b46Key() ? 'The picket holds where it is. The gap stays shut.' : ''}`,
      ch:[{t:'Not that way.', go:()=>startExplore()}]}) : ({sp:'The gap in the screen', scene:'b4_c6_eve', txt:
`The gap in the screen, and the basin beyond it, grey and black and going away north to the string of red fires on the ramps. A long bowshot, and three more, of flat ground with scrub on it and nothing to hide behind but the dark.

Somewhere out there, the Dogslayers have posts at the foot of the ramps, and ears.`,
      ch:[{t:'Out across the basin, low and quiet. (flat ground, posts with ears)', check:['wits', 15],
            edges:id=>[id === 'tebbet' && ['he can cross ground nobody sees him cross', 2], id === 'sathi' && ['she can cross a plain without a sound', 2], id === 'orvas' && ['he reads the ground in the dark', 1], S.tricks && S.tricks.b4_c6_listen && ['the Long Listen: where the crickets stop', 1], (id === 'hessa' || id === 'darrut') && ['the big shields', -1], id === 'tallow' && ['he is very loud when he is frightened', -1]],
            near:{t:'Yes, but halfway across a Dogslayer post at the foot of the ramps hears something, and a lantern opens and shuts, and opens again. They know something is out there.', fx:()=>{ S.f.b4_c6_seen = 'near'; }},
            fx:()=>{ S.f.b4_c6_seen = S.f.b4_c6_seen || 'no'; }, go:'b4_c6_out', fail:'b4_c6_gap_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c6_gap_seen:()=>({sp:'The basin', scene:'b4_c6_close', fx:()=>{ S.f.b4_c6_seen = 'early'; }, txt:
`The basin is flatter than it looked and louder than it should be. A boot finds a dry bush that goes off like a string of firecrackers, and out at the foot of the ramps a lantern opens and stays open, and a whistle goes, and is answered from the trench above. They know something is coming.

The squad goes on anyway, because the gap is behind it now and the picket was short the moment it left.`,
      ch:[{t:'On, across the basin.', go:'b4_c6_out'}]}),
    b4_c6_out:()=>({sp:'The basin', scene:'b4_c6_close', fx:()=>{ S.f.b4_c6_out = 1; S.f.b4_c6_ph = 3; }, txt:
`Out through the gap, and the screen is behind, and then the fire is a glow, and then it is nothing. The basin at night is a flat grey floor going away into a dark that has fires on it, and the squad goes across it bent double, in a file, a pace apart, one hand on the shoulder of whoever is in front.${S.f.b4_c6_seen === 'near' ? ' Out at the foot of the ramps a lantern opens and shuts, opens and shuts, like somebody asking a question.' : S.f.b4_c6_seen === 'early' ? ' Out at the foot of the ramps a lantern burns open and steady now, and there are shapes moving round it.' : ' Nothing moves at the foot of the ramps but the fires.'}`,
      ch:[{t:'On, low.', onward:true, go:()=>{ startExplore('b4_c6_basin'); }},
          {t:'Not yet.', go:()=>{ startExplore('b4_c6_basin'); }}]}),
    b4_c6_basin_rock:()=>({sp:'A rock in the basin', scene:'b4_c6_close', txt:
`A rock the size of a wagon, alone in the middle of the basin, and in the lee of it the squad lies down and breathes. From here the ramps are close enough to see the stakes in the trench bank, black against the fires behind them, and men moving along behind the stakes, and the glint of helms.

${b46Say({tebbet:`Tebbet lies along the top of the rock with his chin on the stone. "More fires than from the line," he says, very low. "They're behind the bank too. Back and back. The trenches are full." A breath. "Full of men."`, haddat:`Haddat lies against the rock with her shield flat on the sand. "They are singing again," she says. "The same song. Our song." She listens. "One of them is Hissari. He sings it badly."`, _:`From here the trenches are full: fires behind the bank, and behind those more fires, and men between.`})}${b46R({orvas:`\n\nOrvas has his ear to the ground. "Horses," he says. "Not many. Behind the city." He frowns. "They have not much horse either."`, redblade:`\n\nRamin, without his scale, lies flat and very still. "If they see us," he whispers, "I will regret the scale."`, warlock:`\n\nKeth will not put his palms on the sand here. "*Not here,*" the grandmother whispers. "*Too close. She would feel us.*"`})}`,
      ch:[{t:'On, to the foot of the ramps.', onward:true, go:'b4_c6_to_ramp'},
          {t:'Lie still a while longer.', go:()=>startExplore()}]}),
    b4_c6_basin_back:()=>({sp:'The way back', scene:'b4_c6_close', txt: S.f.b4_c6_outpostDone ?
`Back across the basin, the picket's fire a faint glow behind its shield, and the screen.` :
`Back, the screen is somewhere behind in the dark, and the picket is short a squad for every breath the squad spends out here. Forward first.`,
      ch: S.f.b4_c6_outpostDone ? [{t:'Back to the line.', onward:true, go:'b4_c6_return'}, {t:'Not yet.', go:()=>startExplore()}] : [{t:'Not yet.', go:()=>startExplore()}]}),
    b4_c6_to_ramp:()=>({sp:'The foot of the ramps', scene:'b4_c6_close', txt:
`The last of the basin is the worst: flat, open, with the fires of the trenches throwing their light down the ramps onto it, and the squad goes across it on its belly, a hand's breadth at a time, until the ground starts to tilt up under it and there are the ramps.`,
      ch:[{t:'Up to the foot of the middle ramp.', onward:true, go:()=>{ S.f.b4_c6_ph = 4; startExplore('b4_c6_ramp'); talk('b4_c6_ramp_arrive'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c6_ramp_arrive:()=>({sp:'The foot of the ramps', scene:'b4_c6_close', fx:()=>{ S.f.b4_c6_sawClose = 1; }, txt:
`The squad lies in the dark at the foot of the middle ramp, close enough to hear the trench breathing.

They see more than they want. The trench at the top of the ramp is full: men in it shoulder to shoulder, sitting, sleeping, standing, Malazan helms and desert headcloths side by side, spears stacked, crossbows on the bank. Fires behind it every few paces, shielded, and behind the fires another trench, and behind that another, back and back up the slope toward the palms. A whetstone goes on a blade. A man laughs. Another is saying a woman's name over and over in his sleep. Dogslayers. The ones who ran the Chain down.

And above it all, above the trenches and the palms and the towers of the dead city, there is the dark over the oasis, and the dark is wrong. It is darker than the night round it, and heavier, the way the air is heavier before a storm, and it sits on the oasis like a hand. Nothing moves in it. You cannot look at it for long. When you look away, the back of the neck goes on looking.${b46Say({marrow:`\n\nMarrow has her hands pressed flat on the sand and her eyes shut. "Child," she whispers. "Child, there is something up there the warren will not look at. It is turning its face away." Her voice shakes. "I have never felt it turn its face away."`, tallow:`\n\nTallow has his hand inside his shirt on the deck in its oilcloth, gripping it. "The bell," he whispers, to nobody. "That's the bell."`, _:`\n\nThe squad lies very still, and does not look at the dark for long.`})}${b46R({orvas:`\n\nOrvas has gone grey under the black tears. "The shamans would not come here," he whispers. "Now I know why."`, redblade:`\n\nRamin, without his scale, presses his face into the sand. "My father's gods," he whispers. "All of them. Every one."`, warlock:`\n\nKeth is shaking. The grandmother says nothing at all, which is the most frightening thing the squad has heard tonight.`})}

At the foot of the middle ramp, a stone's throw off, there is a post: a low wall, a shielded fire, and shapes round it.`,
      ch:[{t:'Look closer at the trench.', go:()=>startExplore()},
          {t:'The outpost.', onward:true, go:'b4_c6_outpost_start'}]}),
    b4_c6_ramp_look:()=>({sp:'Under the trench', scene:'b4_c6_close', txt:
`Up close the trench bank is earth and rubble thrown up and stamped down, with stakes in it, sharpened, leaning out, and the earth still dark where it was dug. Malazan sappers' work, by the cut of it.${b4In('tangle') ? ' "Ours," Tangle breathes. "Our way. Our spades."' : ''} Over the lip, the men in it. You could reach up and touch a boot.

${['lost', 'parted'].includes(b4Was('b2_ilhar')) && b4In('haddat') ? `Haddat lies with her face a hand's width from the bank, and you see her look, along the trench, at the faces she can see by the firelight, one after another, and make herself stop. She does not say anything.` : b46Say({haddat:`Haddat lies with her face a hand's width from the bank, listening to the men in it. "Hissari," she breathes. "Two of them. Arguing about dice." She shuts her eyes.`, _:`The squad lies under the bank and listens to the trench above it breathe.`})}

The squad does not go up. Up is the trench, and the trench is theirs.`,
      ch:[{t:'Back from the bank.', go:()=>startExplore()}]}),
    b4_c6_ramp_up:()=>({sp:'The ramps', scene:'b4_c6_close', txt:
`The ramps go up into the firelight and the trenches. That way is Dom's whole army, awake.`,
      ch:[{t:'Not that way.', go:()=>startExplore()}]}),
    b4_c6_outpost_start:()=> S.f.b4_c6_outpostDone ? ({sp:'The outpost', scene:'b4_c6_close', txt:`The outpost at the foot of the middle ramp, its fire scattered and out, and the trench above it awake.`, ch:[{t:'Not that way.', go:()=>startExplore()}]}) : ({sp:'The outpost at the foot', scene:'b4_c6_close', txt:
`The outpost at the foot of the middle ramp is a low wall of stones in a half ring, a shielded fire behind it, and half a dozen Dogslayers round the fire with a sergeant among them, the post that watches the basin so the trench above can sleep.

${S.f.b4_c6_seen === 'early' ? `They are not watching the basin any more. They are watching the dark where the squad is, with their crossbows up and the lantern open, and the sergeant's whistle in his teeth. They know.` : S.f.b4_c6_seen === 'near' ? `They are awake, all of them, standing, looking out at the basin with their crossbows in their hands, because a lantern told them something was out there. They have not seen what yet.` : `They are sitting round the fire with their backs to the trench, talking low, dicing. One of them stands up, and stretches, and looks out into the dark, straight at the squad, and does not see it. Then he does.`}

The outpost sees them. That was always going to happen. It is a long way back.${b46Say({tebbet:`\n\nTebbet has an arrow on the string. "Run when I say," he breathes. "Not before."`, sathi:`\n\nSathi has her blade out and is grinning in the dark. "Now," she whispers. "Then run."`, _:''})}${b46R({orvas:`\n\nOrvas has his knife up. "Then the run," he whispers. "I am good at running. On anything."`, redblade:`\n\nRamin, in his padding, draws. "Without the scale," he whispers. "My father would laugh."`, warlock:`\n\n"*Quick, children,*" the grandmother whispers. "*Quick, and then away from here.*"`})}`,
      ch:[{t:'"Now. Over the wall."', go:()=>startBattle('b4_c6_outpost', S.f.b4_c6_seen === 'early' ? {surprise:'e'} : {})},
          {t:'Tangle puts two sharpers against the trench lip, over their heads.', tag:'uses 2 sharpers', req:()=>b4In('tangle') && (S.inv.sharper || 0) >= 2, fx:()=>{ S.inv.sharper -= 2; }, go:()=>startBattle('b4_c6_outpost', {pre:true})},
          {t:'Take them before the one who saw you can shout.', check:['wits', 16], req:()=>S.f.b4_c6_seen === 'no',
            edges:id=>[id === 'sathi' && ['she is already moving', 2], id === 'tebbet' && ['one arrow, the one who stood up', 2], id === 'orvas' && ['he is fast', 1], (id === 'hessa' || id === 'darrut') && ['the big shields', -1]],
            near:{t:'Yes, but the one who stood up gets half a shout out before he goes down, and the rest come up off the fire with their swords.'},
            go:()=>startBattle('b4_c6_outpost', nearMiss() ? {} : {surprise:'p'}), fail:'b4_c6_outpost_shout'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b4_c6_outpost_shout:()=>({sp:'The outpost at the foot', scene:'b4_c6_close', fx:()=>{ S.f.b4_c6_seen = 'early'; }, txt:
`The one who stood up shouts before anybody reaches him, one word, and the whistle answers it from the trench above, and the outpost comes up off its fire with its crossbows already spanned.`,
      ch:[{t:'Over the wall anyway.', go:()=>startBattle('b4_c6_outpost', {surprise:'e'})}]}),
    b4_c6_outpost_after:()=>({sp:'Back across the basin', scene:'b4_c6_close', fx:()=>{ if (!S.f.b4_c6_outpostDone) { S.f.b4_c6_outpostDone = 1; if (!S.f.b4_c6_downed) b4Nerve(1, 'The Chain squad came back from the ramps, every one'); } }, txt:
`They break off at last, the Dogslayers who came down the ramp after them, and go back up it in good order, the way a drilled company goes, because the officers in the trench have whistled them back and nobody up there wants a night fight in the basin with the whole Fourteenth awake behind it.

The squad goes on, back across the basin in the dark, the last of it at a walk, because nobody can run any more. ${S.f.b4_c6_downed ? 'Some of them are being carried, or held up, an arm over a shoulder.' : 'Every one of them on their own feet.'} The screen comes up out of the dark, and the gap in it, and Radde standing in the gap with the book.

"Back," he says. He looks along them, counting. "${S.f.b4_c6_downed ? 'Back,' : 'All of you. Back.'}" He writes. "What did you see?"

What the squad tells him goes in the book, and the book goes up the line at first light, and what the officers make of it nobody tells the Third. But the squad saw the trenches full, and the fires back and back up the slope, and the dark over the oasis. That does not go in the book. Radde does not ask what it was, and nobody tells him.${b46Seti() ? `\n\nThe Seti archer comes in last, walking backward, with her last arrow on the string. "They will not follow," she says. "They do not want to see what is behind your screen." She slings the bow. "Neither would I."` : ''}${b46R({orvas:`\n\nOrvas picks his lance up from beside the fire and holds it, just holds it, with both hands.`, redblade:`\n\nRamin puts his scale back on piece by piece in the dark by the fire, and does not speak until the last buckle is done.`, warlock:`\n\nKeth puts his palms on the sand, at last, inside the screen. "*There,*" the grandmother says, and her voice is very old. "*Now you have seen her house. Now you know.*"`})}`,
      ch:[{t:'Inside the screen. The fire.', onward:true, go:'b4_c6_return'},
          {t:'Not now. Breathe first.', go:'b4_c6_return'}]}),
    b4_c6_ramp_back:()=>({sp:'The way back', scene:'b4_c6_close', txt: S.f.b4_c6_outpostDone ?
`Back across the basin. The picket is that way, behind its screen.` :
`Back, across the basin, the picket is short a squad. There is the outpost first, and what the squad came to see.`,
      ch: S.f.b4_c6_outpostDone ? [{t:'Back to the line.', onward:true, go:'b4_c6_return'}, {t:'Not yet.', go:()=>startExplore()}] : [{t:'Not yet.', go:()=>startExplore()}]}),
    b4_c6_return:()=>({sp:'The picket', scene:'b4_c6_eve', fx:()=>{ S.f.b4_c6_ph = 2; }, txt:
`Inside the screen, and the fire behind its shield, and the company's regulars along the screen looking at the squad as it comes in, and looking away.${S.f.b4_c6_downed ? (b4In('marrow') ? ' Marrow goes to work by the coals with her hands, and does not say "child" once.' : ' The company\'s healer comes along the pickets at a run, and goes to work by the coals.') : ''} The night is nearly over. Across the basin the Dogslayers' fires are burning low, the same as the 9th's.`,
      ch:[{t:'The fire.', onward:true, go:()=>{ startExplore('b4_c6_night'); talk('b4_c6_picketfire'); }}]}),
    b4_c6_radde_after:()=>({sp:'Sergeant Radde', scene:'b4_c6_eve', txt: b46Key() === 'hold' ?
`Radde is at the gap with the book. "${S.f.b4_c6_patrolDone ? 'Held as posted,' : 'As posted, Sergeant,'}" he says. "${S.f.b4_c6_patrolDone ? 'Twice in the book. First light soon.' : 'They\'ll come. I\'d be at the screen.'}"` :
`Radde is at the gap with the book. "${S.f.b4_c6_outpostDone ? 'You came back,' : 'Out and back, Sergeant,'}" he says. "${S.f.b4_c6_outpostDone ? 'I\'ve written what you saw. Not all of it.' : 'before light. I\'ve written it. Don\'t make me rub it out.'}"`,
      ch:[{t:'To the screen.', req:()=>b46Key() === 'hold' && !S.f.b4_c6_patrolDone, onward:true, go:'b4_c6_patrol_start'},
          {t:'To the gap, and out.', req:()=>b46Key() === 'forward' && !S.f.b4_c6_out, onward:true, go:'b4_c6_gap'},
          {t:'First light.', req:()=>b46KeyDone(), onward:true, go:'b4_c6_dawn'},
          {t:'Leave him.', go:()=>startExplore()}]}),

    /* ---- first light: the chapter's end ---- */
    b4_c6_dawn:()=> !b46KeyDone() ? ({sp:'The picket', txt:`The night is not over yet.`, ch:[{t:'Not yet.'}]}) : ({sp:'First light', scene:'b4_c6_dawn', fx:()=>{ if (!S.f.b4_c6_slept) { S.f.b4_c6_slept = 1; b4Rest('The squad sleeps an hour in the scrapes at first light, inside the 9th\'s pickets. Wounds close, mostly.'); } }, txt:
`First light comes grey and then brown through the dust, and the basin is there again, flat and empty, and across it the three ramps and the trenches, quiet, with the smoke of the cooking fires going up straight from them. Behind them the palms. Behind the palms the dead city. ${b46Key() === 'forward' ? 'Over the oasis, in daylight, the sky is only the sky. The squad does not look at it long anyway.' : 'Over the oasis the sky is only the sky.'}

The blocking legion's pickets are standing down along the basin's edge, one by one, for the day. The Third's is the last. Radde closes the book.${b46Seti() && S.f.b4_c6_setiStood ? `\n\nThe Seti archer is gone. Sometime before light she walked back to the horse lines without a word, which the Seti think is polite. In the sand at the end of the screen there is one of her arrows, stuck upright, fletched in her society's colours.` : ''}

"Nothing today," he says. "The camp says. Nothing today, and then we'll see." He looks across at the trenches. "Sleep, Sergeant. All of you. Whatever's coming, it's coming at night."${b46Say({haddat:`\n\nHaddat stands at the screen in the grey light and looks across at the trenches a long while. Then her lips move a long while, under her breath. "None new," she says, when she has finished. She sounds as if she does not trust it.`, marrow:`\n\nMarrow lies down in the scrape and pulls her coat over her face. "Wake me when it's the end of the world, child," she says, through it. "Not before."`, _:''})}${b46R({orvas:`\n\nOrvas looks back at the horse lines, where the herds are being watered, and then forward at the ramps. "Tonight," he says. "Whatever it is." He lies down with his lance. "I would still like it written down that I would have liked a horse."`, redblade:`\n\nRamin sits with his back to the screen and his helm on his knees. "Tonight," he says. "Good." He says it twice more, to the dark, to be sure.`, warlock:`\n\nKeth stands at the screen in the grey light. "*Tonight,*" the grandmother says. "*Something tears tonight. Sleep now, children. Sleep while she does.*"`})}`,
      ch:[{t:'Sleep.', onward:true, go:()=>chapterEnd(6, b46Key() || 'hold')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};
