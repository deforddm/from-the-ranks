/* ============ Book Eight, Chapter 7: The Toll (the Fourth, and the book's finale) ============ */
/* The morning after the Fete's last night (tth-canon correction 2; W Anomander Rake, ch 24 and the Epilogue): Darujhistan stops. Every bell
   in the city tolls for the Son of Darkness, and under them the Fourth rings its own, a bell for every soldier. Caladan Brood walks an ox cart
   out of the city to a barrow, tens of thousands following; the Fourth walks at the far back of them, never sees the barrow sealed, never
   reaches Brood, and sees no Andii (rules 72, 76, 77). From this morning the Guardians of the Gate answer for the dead (rule 75): a soldier at
   the crowd's back says a thing only one captain ever said to the Fourth, and is gone. Never his name.
   Phase 1 (S.f.b8_c7_ph), first light: the lake shore (the fire, the reading on the shingle, B8READ[7]; the Contract cools by 2 if the
   Ch 6 knives went down), then the Fourth's street the morning after (the door and who got into it, b8_c7_doorway, optional; Benlo's
   news; Vasso on the step if he waits; looters in the dyers' row at Orsa's, b8_c7_looters, main, stage 2 the yard; whoever is left on the
   roofs, b8_c7_roofs, optional, guild:true, b8Roofs(7) on its tiles). Phase 2, the procession: the road out of the city at the back of the
   crowd (old Benna and the Tufty rumour if Tuft walks; the Guardian; Tuft's cold that turns warm; the crowd stops, the cart goes on).
   Phase 3, evening on the shore: the bell for every soldier (Ohl's list read or not; the trick, The Toll Count), and the key
   S.f.b8_c7_key, the roads: 'daru' (the door kept), 'coral' (Black Coral, in the Andii's pay or on the Redeemer's road), 'east' (a ship
   toward the Malazans abroad; Book Nine may import it). Then the finale (B8CH7.finale: the road, a page per squadmate, the fallen and the
   waiting, the sergeant, Where the books meet, the coda with the roll of the dead and the credit).
   Notes for later books: docs/tth-ch7-notes.md. */
/* FOR THE ARTIST (147b): names this file uses.
   Items: ART['item/b8_c7_bell'], ['item/b8_c7_mourningband'].
   Figures: b8_c7_guardian (a soldier in old grey kit, helm, the badge scraped off, face in shadow), b8_c7_benna (old Benna, a Daru
   washerwoman: a shawl, a basket on her hip); placeholders here with ??=. Reused: b8_c1_benlo, b8_c1_orsa (141b), thug, guildknife.
   Backdrops: b8_lakeshore and b8_morning (140's, yours), b8_c7_street (this file's: the Fourth's street the morning after). */

/* ---- small helpers (b87: Book Eight, Chapter Seven) ---- */
const b87L = (id, n) => { if (b8In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b87Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b8In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b87If = (id, s) => b8In(id) ? (typeof s === 'function' ? s() : s) : '';
const b87Who = () => (ROLL() && ROLL().who) || 'sgt';
const b87Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b87Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b87V = (id, you, they) => id === 'sgt' ? you : they;
const b87Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b87And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b87Cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const B87_SHE = ['brisk', 'kettle', 'tuft', 'sohra', 'greysword', 'ellis', 'ressa'];
const b87He = id => id === 'sgt' ? 'you' : B87_SHE.includes(id) ? 'she' : 'he';
const b87Him = id => id === 'sgt' ? 'you' : B87_SHE.includes(id) ? 'her' : 'him';
const b87His = id => id === 'sgt' ? 'your' : B87_SHE.includes(id) ? 'her' : 'his';
/* the phase: 1 first light (the shore, the street), 2 the procession, 3 evening on the shore */
const b87Ph = () => S.f.b8_c7_ph || 1;
const b87Key = () => ['daru', 'coral', 'east'].includes(S.f.b8_c7_key) ? S.f.b8_c7_key : null;
const b87Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b8In(id));
/* earlier chapters, read with defaults (a --from=7 save sets keys only) */
const b87K = n => b8Key(n) || B8KEY0[n];
const b87Wall = () => b87K(6) === 'wall';
const b87Knelt = () => b87K(3) === 'kneel';
const b87Hunt = () => b87K(1) === 'hunt';
const b87Kelyk = () => S.f.b8_c2_kelyk || (b87K(2) === 'fields' ? 'burned' : 'passed');
const b87Down = () => !!S.f.b8_c6_knivesDown;
const b87Way = () => ['quiet', 'roofs', 'word', 'fought'].includes(S.f.b8_c6_wayOut) ? S.f.b8_c6_wayOut : null;
const b87RoofList = () => b8Roofs(7);
/* the dead: this book's (by chapter), the mortal night's, and those who fell before it (a transfer's) */
const b87Book = () => Object.keys(S.dead || {}).filter(id => TPL[id] && S.dead[id] && !S.dead[id].from);
const b87Fell6 = () => b87Book().filter(id => S.dead[id].ch === 6);
const b87Before = () => Object.keys(S.dead || {}).filter(id => TPL[id] && S.dead[id] && S.dead[id].from);
const b87Names = a => b87And(a.map(id => NAME(id)));
/* Vasso on the Fourth's step if he waits (or a save that never met him): he joins in the street */
const b87VassoHere = () => !b8In('vasso') && b8CanRecruit('vasso');
const b87Edrem = () => b8In('edrem');
const b87LoopDone = () => !!S.f.b8_c7_lootDone;
const b87RoofsOpen = () => b87RoofList().length > 0 && !S.f.b8_c7_roofsDone;
const b87Tolled = () => !!S.f.b8_c7_tolled;
const b87Bell = () => (S.kit || []).includes('b8_c7_bell');

/* ---- The Toll Count: counting the bells the way soldiers count heads. It copies the Lady's Pull (pull, t_pull): chapter charges, twice a
   chapter (one more from level 5): after a failed check, count it again and roll again; or before an attack, roll twice and keep the
   better. The bell rings on after: the squad's next check is −2. Not sorcery, and no god's: a habit. ---- */
Object.assign(TRICKS, {
  b8_c7_toll:{name:'The Toll Count', ch:7, use:'chapter', n:2, ab:'t_b8_c7_toll', where:'the lake shore in Darujhistan, the evening after every bell in the city rang for one death',
    lore:'Soldiers count. At every halt they count the squad, get the number, and check it. The day the whole city rang for one death, the Fourth sat on the shingle and counted the strokes the way it counts heads, twice, and found the second count comes out where you need it more often than the first. It is not a prayer. It is what you do with your hands while the bells go on.',
    get fx(){ return `${trickTimes('b8_c7_toll')} a chapter: count it again after a failed check and roll it again, or before an attack and roll twice, keeping the better. The bell rings on after: the squad's next check is −2. One more use from level 5. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b8_c7_toll:{name:TRICKS.b8_c7_toll.name, trick:'b8_c7_toll', self:true, free:true, desc:()=>'Count it again: this turn\'s attack rolls twice and keeps the better. The bell rings on: the squad\'s next check is −2. It does not use the action (one free trick a turn).',
    ok:u=>!B.acted && u.luckyTurn !== B.turn,
    run(u){ u.luckyTurn = B.turn; S.push = 1; AUDIO.play('coin'); float(u, 'counted twice', '#c8c0b0'); sparks(u.x, u.y, 10, '#c8c0b0', .4); blog(`${u.name} counts under ${u.id === 'sgt' ? 'their' : b87His(u.id)} breath, the way the Fourth counts at a halt, and counts it again.`); }},
});
/* The check half of the Pull lives in 16's rollDice, which asks for 'pull' by name (Book Seven's Crowd's Luck answered it the same way, 127).
   In Book Eight only, when the squad carries the Toll Count and not the Pull, 'pull' is answered by the Toll Count: its charges, its
   spending, its words. Guarded (b8On); other books, and a squad with the real Pull, are untouched. Reported to the lead. */
{ const _tl = trickLeft, _sp = spendTrick, _rd = rollDice, _nt = note, _bl = blog;
  const toll = k => b8On() && k === 'pull' && S && S.tricks && S.tricks.b8_c7_toll && !S.tricks.pull;
  trickLeft = function(k){ return _tl(toll(k) ? 'b8_c7_toll' : k); };
  spendTrick = function(k){ if (!toll(k)) return _sp(k); _sp('b8_c7_toll'); S.tricks.pull = {who:S.tricks.b8_c7_toll.who, ch:7, b87:1}; }; // 16 names the counter through trickBy('pull') next: lend it the bearer for that one line
  rollDice = function(r, done, spun){ if (S && S.tricks && S.tricks.pull && S.tricks.pull.b87) delete S.tricks.pull; return _rd(r, done, spun); };
  note = function(t, c){ if (b8On() && typeof t === 'string' && /spins the coin\. The Lady pulls/.test(t)) t = t.replace(/spins the coin\. The Lady pulls; the Lord will push back on the next check \(−2\)\./, 'counts it again, the way the Fourth counts at a halt. The second count comes out; the bell rings on into the next check (−2).'); return _nt(t, c); };
  blog = function(m){ if (b8On() && typeof m === 'string') m = m.replace('<em>The Lady pulls.</em>', '<em>Counted twice.</em>'); return _bl(m); };
  if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') { const mo = new MutationObserver(() => { if (!b8On() || !(S && S.tricks && S.tricks.b8_c7_toll && !S.tricks.pull)) return; const b = document.getElementById('dPull'); if (b && !b.dataset.b87) { b.dataset.b87 = 1; b.textContent = `Count it again · The Toll Count (${trickLeft('pull')} left)`; } });
    const go = () => { const sh = document.getElementById('sheet'); if (sh) mo.observe(sh, {childList:true, subtree:true}); }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go(); } }

/* ---- borrowed pictures until the artist's file (147b) replaces them: one scene, two figures, the two items ---- */
SCENEX.b8_c7_street ??= (cv, t) => (SCENEX.b8_daru_night || ((c, tt) => drawCamp(c, tt, true)))(cv, t);
if (typeof FIGX !== 'undefined') { FIGX.b8_c7_guardian ??= (ctx, h, t, o) => (FIGX.b2soldier || (() => {}))(ctx, h, t, o);
  FIGX.b8_c7_benna ??= (ctx, h, t, o) => (FIGX.b8_c4_mossa || FIGX.b2soldier || (() => {}))(ctx, h, t, o); }
if (typeof ART !== 'undefined') [['b8_c7_bell', 'b8_c4_ashrag'], ['b8_c7_mourningband', 'b8_c4_ashrag']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Eight's glossary ---- */
GLOSSX.tth.push(
  [7, 'The toll', 'The morning after the Fete\'s last night, every bell in Darujhistan rang for one death, all day, and the city stopped to listen. The Fourth rang one of its own under them.', ()=>!!(S && S.book === 'tth' && (S.chapter || 0) >= 7)],
  [7, 'Mourning bands', 'Strips of black cloth the Daru tie round the arm for the dead. On the morning after, the dyers\' row gave them away by the armful.', ()=>!!(S && S.f && S.f.b8_c7_band)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tth = ROSTER_FIRES.tth || {}; ROSTER_FIRES.tth[7] = ['b8_c7_fire'];

/* the reading: the shingle by the lake (the King of High House Death leans, B8POOL[7]) */
B8READ[7] = {scene:'b8_lakeshore', where:'the shingle by the lake', set:'The lake shore at first light, the morning after the Fete\'s last night: grey water, the boats drawn up, smoke going up from the Gadrobi side, and behind the Fourth the city beginning to ring.', back:'b8_c7_fire', backT:'Back to the fire.',
  say:{tuft:'Tuft sweeps a flat place in the shingle with the side of her hand. "One card," she says. "It\'ll be the same one. I know which." She turns her back on the bells. "Sit anyway."',
       sohra:'"The stones here are round," Sohra says, and sets the cup down among them. "The water does that. Years of it." She listens to the bells a while. "The bones will not like this morning. Sit."',
       benna:'"On the stones, then," says Benna, lowering herself onto them with her basket. "I came down to wash. There\'s no washing today." She holds her hand out. "Copper. It\'s a day for it."'}};

const B8CH7 = {
  title:B8CH[7], number:'Seven',
  intro:{loc:'Darujhistan', sub:'The lake shore · the morning after', scene:'b8_lakeshore', cap:'Grey water at first light, boats drawn up on the shingle, and smoke going up from the Gadrobi side behind.',
    paras:[
`The last night of the Fete is over. What follows it is not morning, exactly, by any Daru reckoning: a grey light coming up over the lake on a city with its wall broken, the Gadrobi District still smoking, and masks lying in every gutter where people dropped them running.`,
()=>{ const v = b87Mates().map(id => NAME(id)), f6 = b87Fell6();
  return `You are Sergeant {sgt}, and the Fourth has come down to the lake to wash the smoke off, because everyone in the street did, and because there was nothing else to do with its hands. ${v.length ? `${b87And(v)} ${v.length > 1 ? 'are' : 'is'} on the shingle with you.` : 'You are on the shingle by yourself. The ledger came too.'}${f6.length ? ` ${b87Names(f6)} ${f6.length > 1 ? 'are' : 'is'} not.` : ''}`; },
`Then, up in the city, a bell starts. Then another. By the time the sun is clear of the hills every bell in Darujhistan is ringing, and nobody has said for whom, and everybody knows.`],
    go:'To the water', node:'b8_c7_start'},

  areas:[
    /* 16 x 12 (lakefront). ~ the lake  n boats drawn up  p a jetty  , wet shingle  . shingle  F the Fourth's fire  k a bollard  # the
       warehouse backs  > east, up into the Gadrobi District */
    { id:'b8_c7_shore', title:'The lake shore', sub:'The morning after · the bells', hint:'Tap ground to move · tap a figure to talk · the street is east', decor:'lakefront',
      map:[ "~~~~~~~~~~~~~~~~",
            "~~n~~~~~~~~~n~~~",
            "~~~~~~~p~~~~~~~~",
            ",,,,,,,p,,,,,,,,",
            "...n...p....n...",
            "..k............,",
            "......F........>",
            "................",
            "...,......,.....",
            "##..........####",
            "####......######",
            "################" ],
      walk:'.,p>', triggers:{F:'b8_c7_fire', n:'b8_c7_boats', k:'b8_c7_lake', '>':'b8_c7_to_street'}, start:{x:6, y:8},
      quest:()=> b87Ph() === 1 ? (!S.f.b8_c7_street ? 'The street, east. The door, and what the night left of it.' : !b87LoopDone() ? 'Back up to the street. Something is wrong in the dyers\' row.' : 'The street, and the east road. The whole city is going out of it.')
        : b87Ph() === 2 ? 'The road, behind the crowd.'
        : !b87Tolled() ? 'The fire. A bell for every soldier.' : !b87Key() ? 'The fire, and the roads.' : 'The fire.',
      npcs:[] },

    /* 16 x 12 (city_dusk, the grey morning). The Fourth's street, up from the Phoenix. # house fronts  D the Fourth's door  x the post with
       the painted sign  l a Fete pole, masks still on its string  r rubble  W a handcart  < west, down to the lake  > east, the road out */
    { id:'b8_c7_street', title:'The Fourth\'s street', sub:'The Gadrobi District · the morning after', hint:'Tap ground to move · tap a figure to talk · the lake is west, the east road east', decor:'city_dusk',
      map:[ "################",
            "####D######x#S##",
            "................",
            "..l....r....l...",
            "<...............",
            "...............>",
            "#####...r.######",
            "#####.....######",
            "##W...........##",
            "##....r.....####",
            "####........####",
            "################" ],
      walk:'.,<>', triggers:{D:'b8_c7_door', x:'b8_c7_sign', l:'b8_c7_masks', S:'b8_c7_roofs_look', '<':'b8_c7_street_back', '>':'b8_c7_to_road'}, start:{x:1, y:4},
      quest:()=> b87Ph() !== 1 ? 'The east road.' : !S.f.b8_c7_doorDone ? 'The door. There are voices inside it.' : !b87LoopDone() ? 'The dyers\' row, south. Orsa\'s, and the men at her shutters.' : b87RoofsOpen() && !S.f.b8_c7_roofsLeft ? 'Somebody on the roofs, watching: the outside stair goes up. And the east road.' : 'The east road. The whole street is going out of it.',
      npcs:[
        {id:'benlo', name:'Benlo, at his barrow', kind:'b8_c1_benlo', x:9, y:4, still:true, node:()=>'b8_c7_benlo', show:()=>b87Ph() === 1, fresh:()=>!S.f.b8_c7_benlo},
        {id:'vasso', name:'Vasso, on the Fourth\'s step', kind:'vasso', x:5, y:2, node:()=>'b8_c7_vasso', show:()=>b87Ph() === 1 && b87VassoHere(), fresh:()=>!S.f.b8_c7_vassoTalk},
        {id:'looters', name:'Men at Orsa\'s shutters', kind:'thug', x:8, y:9, node:()=>'b8_c7_looters_look', show:()=>b87Ph() === 1 && !b87LoopDone(), fresh:()=>true},
        {id:'orsa', name:'Orsa, at her door', kind:'b8_c1_orsa', x:11, y:9, node:()=>'b8_c7_orsa', show:()=>b87LoopDone() && b87Ph() === 1, fresh:()=>!S.f.b8_c7_orsa} ] },

    /* 16 x 12 (plain). The road out of the city behind the crowd, the Fourth at its very back. . the road  , verge  # hedge  r stones  x a
       milestone  ^ north, toward the cart (never reached)  v south, back to the city */
    { id:'b8_c7_road', title:'The road out of the city', sub:'Behind the crowd · the bells behind', hint:'Tap ground to move · tap a figure to talk · the cart is north, far ahead', decor:'plain',
      map:[ ",,,,,,,^,,,,,,,,",
            ",#,,,,...,,,,#,,",
            ",,,,,,...,,,,,,,",
            ",,r,,,...,,,r,,,",
            ",,,,,,...,,,,,,,",
            "#,,,,,...,,,,,,#",
            ",,,,,,...,,,,,,,",
            ",,x,,,...,,,,,,,",
            ",,,,,,...,,,,r,,",
            ",#,,,,...,,,,,#,",
            ",,,,,,...,,,,,,,",
            ",,,,,,,v,,,,,,,," ],
      walk:'.,^v', triggers:{'^':'b8_c7_ahead', x:'b8_c7_milestone', r:'b8_c7_crowd', 'v':'b8_c7_road_back'}, start:{x:7, y:9},
      quest:()=> !S.f.b8_c7_guardian ? 'The back of the crowd. There is someone walking behind the Fourth.' : 'North, as far as the crowd goes.',
      npcs:[
        {id:'guardian', name:'A soldier at the back', kind:'b8_c7_guardian', x:8, y:11, node:()=>'b8_c7_guardian', show:()=>b87Ph() === 2 && !S.f.b8_c7_guardian, fresh:()=>true},
        {id:'benna', name:'Old Benna, with her basket', kind:'b8_c7_benna', x:4, y:6, node:()=>'b8_c7_benna', show:()=>b87Ph() === 2 && b8In('tuft'), fresh:()=>!S.f.b8_c7_tufty} ] } ],

  battles:{
    /* the dyers' row: men who think a city that has stopped will not notice its shutters going; Orsa's den behind them */
    b8_c7_looters:{title:'The dyers\' row', style:'city', open:true, warrenText:'A grey morning in the Gadrobi District · every bell in the city ringing · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","........","..t..t..","........","#......#","........","...tt...","........","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_bravo',2,1],['b8_bravo',5,1],['b8_bravo',4,1],['b8_bravocaptain',3,0]], xp:260, after:'b8_c7_looters_after',
      preText:()=>`They are not Guild, and not hungry. They are men with good boots and empty sacks who have worked out that a city listening to its bells is not watching its shutters, and their leader has a name he would like the Fourth to have heard of.`,
      stage2:{title:'The dyers\' yard', xp:130,
        text:()=>`The row is the Fourth's. The yard behind Orsa's is not: two more of them came over the back wall with a handcart while the front went badly, and they have the den's strongbox on it and the gate shut.${b87Say({brisk:`\n\nBrisk looks at the gate, and at her shield, and the gate does not stay shut much longer.`, kettle:`\n\nKettle looks at the handcart. "That's Orsa's," she says. "She'll want it back in one piece. Pity."`, _:''})}`,
        map:["#..##..#","........","..t..t..","........","........","........","..t..t..","........","........","##....##"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b8_bravo',2,1],['b8_bravo',5,1],['b8_raider',5,0]]} },
    /* whoever is still on the roofs: b8Roofs(7) on the contract tiles (one fewer than the last night; nobody if the Ch 6 knives went down) */
    b8_c7_roofs:{title:'The roofs over the street', style:'roof', open:true, guild:true, warrenText:'The Gadrobi roofs in a grey light · the bells loud up here · warrens steady', warren:{meanas:1, denul:1}, music:'dark',
      contract:[[2,1],[5,1],[4,0]],
      map:["#......#","........","..t..t..","........","........","...t....","........",".t....t.","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[], xp:220, after:'b8_c7_roofs_after',
      preText:()=>`They are dark on grey this morning, which suits them worse than dark on dark. They did not expect the Fourth to come up. Up here the bells are so loud that nobody hears anybody's feet on the slate, theirs or yours.`},
    /* the Fourth's door: men who heard the old soldiers did not come home last night */
    b8_c7_doorway:{title:'The Fourth\'s door', style:'cellar', open:true, warrenText:'A narrow room up the street from the Phoenix · the fire out · warrens steady', warren:{meanas:1, denul:1}, music:'battle',
      map:["########","#......#","#.t..t.#","#......#","#......#","#..t...#","#......#","#......#","#......#","###..###"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b8_bravo',2,1],['b8_bravo',5,1],['b8_bravo',3,1]], xp:150, after:'b8_c7_door_after',
      preText:()=>`Three of them, in the Fourth's own room, with the Fourth's own chairs. They had heard nobody was coming back. They are finding out about that the slow way.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b8_c7_bell:{name:'A small brass bell', slot:'trinket', role:'any', who:null, stat:{wits:1},
      line:'A little brass bell off a Fete pole, the kind the city strings across its streets by the hundred for the festival, cut down the morning after by a sapper who wanted something to ring. It has a dent in it from the cobbles. The Fourth rang it once for every name it owed, on the shingle by the lake, and then kept it, because you do not throw away a thing that has done that.'},
    b8_c7_mourningband:{name:'A dyer\'s mourning band', slot:'trinket', role:'any', who:null, hp:3,
      line:'A strip of cloth dyed black in a Gadrobi vat, the way the Daru tie them round the arm for their dead. Orsa\'s neighbours in the dyers\' row gave them away by the armful the morning the bells rang. It is not the Fourth\'s custom. It is the Fourth\'s city, though, and the Fourth had its own to wear it for.'} },

  scenes:{
    b8_c7_street:{loc:'Darujhistan', sub:'The Fourth\'s street · the morning after', cap:'A Gadrobi street in a grey light: smoke going up beyond the roofs, shutters hanging, masks in the gutter, and every bell in the city ringing.', amb:'explore'} },

  end:{
    daru:['The door kept', 'The morning after the Fete\'s last night, every bell in Darujhistan rang for one death, and the Fourth walked at the very back of the crowd that followed the cart out of the city. That evening, on the shingle by the lake, it rang a bell of its own for every name it owed. Then it went back up the street, and unbarred its door, and stayed.'],
    coral:['Back to Black Coral', 'The morning after the Fete\'s last night, every bell in Darujhistan rang for one death, and the Fourth walked at the very back of the crowd that followed the cart out of the city. That evening, on the shingle by the lake, it rang a bell of its own for every name it owed. Then it packed, and took the east road back the way it had come, to the dark city on the coast.'],
    east:['A ship east', 'The morning after the Fete\'s last night, every bell in Darujhistan rang for one death, and the Fourth walked at the very back of the crowd that followed the cart out of the city. That evening, on the shingle by the lake, it rang a bell of its own for every name it owed. Then it went looking for a boat, and a coast, and a ship going toward wherever the Malazans are now.'] },
  endScene:'b8_lakeshore',
  endCap:()=> S.f.b8_c7_key === 'coral' ? 'The east road at dawn, the city behind, and the bells quiet at last.' : S.f.b8_c7_key === 'east' ? 'A lake boat at first light, loaded, and the city going away behind it.' : 'The lake shore at dusk, the bells quiet at last, and the city lighting its blue fire as if nothing had happened anywhere.',
  tease:'There is no Chapter Eight. The book ends where the road does.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b8_c7_cooled === 2) x.push('The Guild has counted enough. The Contract cooled the morning after.');
    if (f.b8_c7_roofsDone) x.push('Whoever was left on the roofs came down the hard way.'); else if (f.b8_c7_roofsLeft) x.push('Whoever was left on the roofs watched the Fourth walk out with the mourners, and went home.');
    if (f.b8_c7_lootDone) x.push('Orsa\'s den kept its shutters, and its strongbox.');
    if (f.b8_c7_doorDone) x.push('The Fourth\'s door is the Fourth\'s again.');
    if (f.b8_c7_guardian) x.push('A soldier at the back of the crowd counted the Fourth, and said a thing the sergeant had heard once before, a long way from here. Then he was not there.');
    if (f.b8_c7_tufty) x.push('Old Benna has a story about a dead white cat. Tuft would like it known she has not heard it.');
    if (f.b8_c7_warm) x.push('Tuft felt something in the east turn from cold to warm, the morning after. She has not said what.');
    if (f.b8_c7_toll) x.push(f.b8_c7_toll === 'list' ? 'Ohl read the list on the shingle, every name, and the bell rang for each.' : f.b8_c7_toll === 'ledger' ? 'The sergeant read the ledger\'s last column on the shingle, and the bell rang for each name in it.' : 'The bell rang on the shingle, and nobody read anything. Everybody counted.');
    if (f.b8_c7_tollOk) x.push('The Fourth learned to count the bells twice.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b8_c7_key === 'daru' && 'The door kept. The Fourth stays in Darujhistan.',
    f.b8_c7_key === 'coral' && 'Back to Black Coral, the way the Fourth came.',
    f.b8_c7_key === 'east' && 'A ship east, toward the Malazans abroad.',
    f.b8_c7_tolled && 'A bell for every soldier, on the shingle by the lake.',
    f.b8_c7_guardian && 'A soldier at the back of the crowd, counting. Then nobody.',
    f.b8_c7_ph >= 2 && 'The whole city walked out behind an ox cart. The Fourth walked at the very back.',
    'The morning after the Fete\'s last night. Every bell in Darujhistan is ringing.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: first light on the shore ======== */
    b8_c7_start:()=>({sp:'The lake shore', scene:'b8_lakeshore', fx:()=>{ S.f.b8_c7_ph = S.f.b8_c7_ph || 1;
        if (!S.f.b8_c7_cooled) { S.f.b8_c7_cooled = b87Down() ? 2 : 1; if (b87Down()) b8Con(-2, 'the Guild has counted enough'); } },
      again:()=>'The shingle by the lake, grey water, and the bells.', html:contractHTML(), txt:
`The shingle is cold and wet and full of people doing what the Fourth is doing: kneeling at the water's edge in their Fete clothes, washing the night off their hands and faces, not talking. The lake does not care. It is grey, and flat, and takes the smoke-black off everyone the same.

${b87Wall() ? `The Fourth stood a stretch of the broken wall last night, with the watch, and saw more of the night than anyone should. You have stopped trying to put it in order.` : `The Fourth held its own street last night, and its own door, and something went past the end of the street that nobody in the squad will describe. You have stopped trying.`} ${b87Down() ? `And the Guild's knives came for the Fourth under cover of all of it, and did not go home. Somewhere in the city this morning somebody is crossing a paper out, or adding to it. The bells make it hard to care which.` : b87Way() === 'quiet' ? `The Guild did not come last night. No one came. You are not sure that is better.` : b87Way() ? `The Guild came close last night, and the Fourth got out from under it. The paper is still a paper.` : `Whatever the Guild meant for last night, the night had other plans for everybody.`}${b87Say({brisk:`\n\nBrisk is on her knees at the water with her helm off. When the first bell starts up in the city she stops, and lifts two fingers to her brow toward it, and then goes on washing.`, _:''})}${b87If('vasso', `\n\nVasso has his head up, listening. "That's the Temple of Burn," he says. "And Hood's. And the one on the Second Tier that cracked in the winter." He goes quiet. "All of them. I've never heard all of them."`)}${b87If('edrem', `\n\nEdrem stands at the edge of the water, not washing. "In Black Coral there are no bells," he says. "I had forgotten what a city sounds like when it grieves."`)}`,
      ch:[b8ReadChoice(7),
          {t:'Wash the night off, with everyone else.', req:()=>!S.f.b8_c7_washed, go:'b8_c7_wash'},
          {t:'Sit by the fire a while.', go:'b8_c7_fire'},
          {t:'Walk the shore.', go:()=>startExplore()}]}),
    b8_c7_wash:()=>({sp:'The lake shore', scene:'b8_lakeshore', fx:()=>{ S.f.b8_c7_washed = 1; }, txt:
`You kneel at the edge of the water among strangers and put your hands in it. It is very cold. The smoke comes off your skin in a grey film and goes away across the lake, and the soot comes out from under your nails, and the blood, some of it yours.

Beside you a Daru woman in a torn green Fete gown is washing a child's face, slowly, with the corner of her sleeve. The child is asleep. She keeps on washing. Further along an old man in a mask with the eyes burned out has forgotten to take it off, and washes round it.${b87Say({ohl:`\n\nOhl goes along the water's edge from one to the next, looking at hands and faces, saying a word here and there. He is not asked who he is. On a morning like this a man who knows what to do with a burn is everybody's.`, kettle:`\n\nKettle scrubs at her hands until the black is out of the creases, and then keeps scrubbing.`, _:''})}${b87If('edrem', `\n\nEdrem washes the mace before he washes his hands. Then he washes his hands, and goes on washing them.`)}`,
      ch:[{t:'Back up the shingle.', go:()=>startExplore()}]}),
    b8_c7_read:()=>b8ReadOffer(7),
    b8_c7_card:()=>b8ReadCard(7),
    /* Tuft and the east: a cold that turns warm, never named (rule 11) */
    b8_c7_lake:()=>({sp:'The water', scene:'b8_lakeshore', fx:()=>{ if (b8In('tuft') && !S.f.b8_c7_warm) S.f.b8_c7_warm = 1; }, again:()=>'The lake, grey and flat, and the far shore going east.', txt:
`The lake goes away east, flat and grey, to a far shore you cannot see this morning. Boats are drawn up all along the shingle. None of them are going anywhere today; the fishermen are sitting on the gunwales, listening to the bells like everyone else.${b8In('tuft') ? `\n\nTuft is standing at the water's edge with her arms wrapped round herself, facing east, very still. When you come up beside her she says, "Something's changed. Out there. A long way." She does not take her eyes off the far grey. "It's been cold my whole life, that way. Since Pale. A cold you get used to." She breathes out. "It's not cold now. It's warm. Like coming in out of the snow to a lit room." She shakes her head. "I don't know what it is. I don't want to know. I want it to stay."` : `\n\nYou watch the water a while. It does not ask you anything, which is the best thing anyone has done for you since the Fete began.`}`,
      ch:[{t:'Back up the shingle.', go:()=>startExplore()}]}),
    b8_c7_boats:()=>({sp:'The boats', scene:'b8_lakeshore', fx:()=>{ S.f.b8_c7_boatsSeen = 1; }, again:()=>'The boats drawn up on the shingle, the fishermen on their gunwales.', txt: b87Ph() < 3 ?
`A fisherman sits on the gunwale of his boat with his net in his lap, not mending it. "No boats today," he says, before you ask. "Not a boat goes out on a day like this." He nods up at the city. "Tomorrow. Tomorrow everything goes back to how it was, and then a bit worse."` :
`The boats are being turned and readied for the morning, quietly, by lamplight. A lake boatman with a wide back is loading barrels for the river at the far end, where the lake goes out to the south and the coast. "Passengers?" he says, without looking up. "Tomorrow. Down the lake, down the river, to the sea. There's ships at the coast taking anybody who's got coin, going every way there is." He looks at your kit, and the way you stand. "Malazans," he says. "There's ships going your people's way. East and over, they say. No two of them agree where."${b87If('brannoc', `\n\nBrannoc is already looking at the boat's lines with a Falari eye. "She's sound," he says. "For a lake. I'd not take her past the river mouth."`)}`,
      ch:[{t:'Back up the shingle.', go:()=>startExplore()}]}),

    /* the fire: the shore, by phase. The games pass wraps this node: keep the id */
    b8_c7_fire:()=>{ const ph = b87Ph(), rk = 'b8_c7_rest' + ph;
      const way = ph === 3 ? (!b87Tolled() ? {t:'A bell for every soldier.', onward:true, go:'b8_c7_toll'} : {t:'The roads. Where the Fourth goes from here.', onward:true, go:'b8_c7_roads'}) : null;
      return {sp:'The lake shore', scene:'b8_lakeshore', html:contractHTML(), again:()=>'The Fourth\'s fire on the shingle, the lake behind it.', txt:
`${ph === 3 ? `The bells have not stopped all day, and they are not stopping now. The fire on the shingle is small. The lake behind it has gone the colour of slate, and the first of the city's blue lamps are coming on along the shore, the way they always do, as if nothing had happened anywhere.` : `A fire of driftwood on the shingle, somebody else's, left burning when they went up into the city. The Fourth has taken it over without asking. No one minds. The whole city has stopped minding things this morning.`}${b87Say({kettle:`\n\nKettle is laying out what is left in the satchel on a flat stone, and counting it twice.`, ohl:`\n\nOhl has his list out on his knee, in its oilcloth, and has not unfolded it.`, _:''})}`,
        ch:[...(ph === 1 ? [b8ReadChoice(7)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk], fx:()=>{ S.f[rk] = 1; rest('An hour by a driftwood fire on the shingle. The bells do not stop. Most of what the night did closes.'); }, go:'b8_c7_fire_rest'},
            {t:'Talk with the squad.', go:'b8_c7_fire_talk'},
            {t:'Sit with Vasso, and listen for the oldest bell.', req:()=>ph === 3 && b8In('vasso') && !S.f.b8_c7_hum, go:'b8_c7_hum'},
            ...(way ? [way] : []),
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c7_fire_rest:()=>({sp:'The lake shore', scene:'b8_lakeshore', txt:
`An hour, then, on the shingle, with the bells going over the water.

${b87Say({ohl:`Ohl goes round the squad with his needle and his opinions, and closes what wants closing. "Burns," he says, of one. "Glass," of another. "This one's yours, Sergeant. You did it to yourself." He is probably right.`, ressa:`Ressa goes round the squad with a basin of lake water and her two quick hands, and keeps her opinions of it to herself.`, _:'The squad sees to its own hurts. It has had practice.'})}${b87If('vasso', `\n\nVasso sleeps on his back on the stones with his arm over his eyes, and in his sleep his lips move with the bells, counting.`)}${b87If('edrem', `\n\nEdrem does not sleep. He sits facing east, where the barrow is, a long way off past the lake and the hills.`)}`,
      ch:[{t:'Back to the fire.', go:'b8_c7_fire'}]}),
    b8_c7_fire_talk:()=>{ const late = b87Ph() >= 3, ln = [];
      if (b8In('brisk')) ln.push(late ? `Brisk has her shield across her knees and is not working on it. "Something answered, last night," she says. "Not him. He didn't. Someone else, at the gate." She touches two fingers to her brow. "I'll salute whoever's there. I always did."` : `Brisk is cleaning her sword in the lake water and drying it on her sleeve, slowly. "Death didn't come last night," she says. "I called. The house was empty." She looks at the blade. "I'd like to know where he went. I'd like to know who's minding the door."`);
      if (b8In('kettle')) ln.push(late ? `Kettle turns the little bell over in her fingers. "I've counted everything I own twice today," she says. "Munitions. Silver. Us." She rings it once, very softly. "It keeps coming out the same. That's the trouble with counting."` : `Kettle is counting the bells. "Forty-one," she says. "Forty-two. That's the one with the crack." She stops. "I can't stop. It's like hearing a fuse."`);
      if (b8In('tuft')) ln.push(late ? `Tuft has the Deck in her lap and keeps not drawing. "The King's seat was empty," she says. "This morning. I've never seen it empty." She looks east over the water. "And something out there's warm. I keep wanting to tell someone, and there's nobody it would mean anything to but me."` : `Tuft is sitting with her knees drawn up, listening to the bells. "When the Fete ended, last time," she says, "the city put its masks away and pretended nothing had happened." She almost smiles. "It can't pretend this one."`);
      if (b8In('ohl')) ln.push(late ? `Ohl has the list open now, and a stub of pencil, and is not writing. "I'll not put him on it," he says, of the one the bells are for. "He's not ours." He folds the oilcloth over. "I keep wanting to anyway. Everybody in this city has him on theirs today."` : `Ohl watches the people washing in the lake. "Half of them have burns they don't know about," he says. "They'll know tomorrow." He does not get up yet. "I'll go up the street after. Today I'm going to sit."`);
      if (b8In('sohra')) ln.push(late ? `Sohra has thrown the bones once today and swept them up without reading them. "Some days are not for asking," she says. "My mother said that. I never believed her." She listens to the bells. "I believe her today."` : `Sohra has her face turned up to the bells with her eyes shut. "The Rhivi sing for the dead," she says. "These people ring. It is the same thing with more iron in it."`);
      if (b8In('greysword')) ln.push(late ? `Dannet sits with the grey shield beside her, the wolf on it turned to the water. "In Capustan we held the walls and the walls held," she says. "Last night the wall broke and the city held anyway." She looks at the shield. "I do not know what the Wolves make of that. I think they approve."` : `Dannet is on one knee on the shingle, as she kneels to pray, but she is not praying. "Whoever the bells are for," she says, "was a soldier. You can hear it. A city rings like that for a soldier."`);
      if (b8In('ellis')) ln.push(late ? `Ellis has walked the shore twice already. "Every boat counted," she says, sitting down. "Every way off this shingle." She looks at the city. "We could go any of them. That's new."` : `Ellis comes back from the end of the shingle and sits. "The roofs are full of people," she says. "Watching the smoke. Not the Guild. People." She almost smiles. "They're all looking up, on a day like this."`);
      if (b8In('vell')) ln.push(late ? `Vell is coiling a rope he has not used all day. "I went up, this morning," he says. "Just to look. You can see the whole road from the Gadrobi ridge-lines, all the way out." He coils. "Every soul in the city on it. I never saw the roofs empty before."` : `Vell is looking up at the roofline above the warehouses. "If they're still up there," he says, of the Guild, "they're listening to the bells like everyone else." He does not sound sure.`);
      if (b8In('brannoc')) ln.push(late ? `Brannoc has stopped talking, which for Brannoc is a eulogy. After a while he says, "In Falar they put the dead out on the water in a boat, burning." He looks at the lake. "I'd have liked that. For him. Whoever he was to them."` : `Brannoc sits with his boots off and his feet in the lake. "Cold," he says. "Good. Everything else this morning is too warm."`);
      if (b8In('ressa')) ln.push(late ? `Ressa has her hands round a cup of lake water boiled on the fire. "In G'danisban, at the end, there was no one left to ring the bells," she says. "So they stopped." She drinks. "This is better. Loud is better."` : `Ressa is looking at the smoke over the Gadrobi side. "The dyers' row," she says. "It's mostly the dyers' row burning. The vats keep it from spreading." She has worked it out the way she works everything out: alone, and right.`);
      if (b8In('vasso')) ln.push(late ? `Vasso is lying on his back on the stones, listening. "There's one under all the others," he says. "Very low. No one's ringing it." He closes his eyes. "It hums. It's been humming all day. I think it's the oldest bell in the city, and it's ringing for everyone."` : `Vasso sits with his back to the warehouses and his face to the water, where there are no roofs. "The Guild doesn't work on a day like this," he says. "There'd be nobody to pay, and nobody to see." He turns a knife over. "I think. I've never been out on a day like this."`);
      if (b8In('edrem')) ln.push(late ? `Edrem sits facing east, the mace across his knees. "They will hear of it in Black Coral," he says. "Whatever this was. The pilgrims will hear of it." He keeps facing east. "I do not know what they will make of it. I do not know what I make of it."` : `Edrem stands by the fire; it is how he sits. "I have seen a city grieve before," he says. "Coral, after the Seer. It was quiet, then. The bells stayed still." He listens. "This is better. They are not ashamed of it."`);
      return {sp:'The lake shore', scene:'b8_lakeshore', txt:ln.length ? ln.join('\n\n') : `It is quiet at the fire, under the bells. You sit with the ledger open on your knee, and do not write in it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b8_c7_fire'}]}; },

    b8_c7_hum:()=>({sp:'Vasso', scene:'b8_lakeshore', fx:()=>{ S.f.b8_c7_hum = 1; b87L('vasso', 1); }, txt:
`${b8In('vasso') ? `Vasso lies back on the shingle with his hands behind his head. "Listen under them," he says. "Under all of them. There."

You listen. The temple bells, the tower bells, the cracked one on the Second Tier, the little ones on the Fete strings. And under all of it, so low you hear it in your teeth before your ears, a hum. It does not start or stop. It goes on longer than a bell should.

"No one rings that one," Vasso says. "Not in years. It's the oldest bell in the city. I've never met anyone who has seen it rung. It hums when it wants." He closes his eyes. "My mother said it hums for everybody. Not lords. Everybody." He is quiet a while. "I think it's humming for ours, too."` : `You sit and listen to the bells. Under them, very low, something hums, the way an old bell hums long after it is struck.`}`,
      ch:[{t:'Back to the fire.', go:'b8_c7_fire'}]}),
    /* the shore's way up into the city, and back */
    b8_c7_to_street:()=>{ const ph = b87Ph();
      if (ph === 3) return {sp:'The way up', scene:'b8_lakeshore', txt:`Not tonight. The street will keep, and so will the door. Tonight the Fourth is on the shingle.`, ch:[{t:'Back to the fire.', go:()=>startExplore()}]};
      return {sp:'The way up', scene:'b8_lakeshore', txt:
`East, a lane goes up from the shingle between the warehouse backs into the Gadrobi District, toward the Fourth's street. The smoke is thicker that way. So are the bells.`,
        ch:[{t:'Up into the street.', onward:true, go:()=>{ startExplore('b8_c7_street'); if (!S.f.b8_c7_street) talk('b8_c7_street_arrive'); }},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b8_c7_street_back:()=>({sp:'The Fourth\'s street', scene:'b8_c7_street', txt:
`West, the lane runs down between the warehouse backs to the shingle, the fire, the grey water.`,
      ch:[{t:'Down to the lake.', onward:true, go:()=>startExplore('b8_c7_shore')},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== the Fourth's street, the morning after ======== */
    b8_c7_street_arrive:()=>({sp:'The Fourth\'s street', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_street = 1; }, txt:
`The Fourth's street is still there. That is the first thing. The second is that it does not look like it: shutters hanging off their hinges, a cart on its side, the Fete poles still up with their strings of masks and little bells, and the masks all turned the wrong way by the wind. Beyond the roofs to the south the smoke goes up from the dyers' row in a slow grey column, and nobody is running to it. The fire there has burned down to what the vats would let it have.

The whole street is out, standing in its doorways, listening to the bells. The stalls are shut. The doors are open.${b87Wall() ? `\n\nThe Fourth was on the wall all night. The door has been on its own since dusk. From the street you can see it is not quite shut.` : `\n\nThe Fourth held this street last night. You can see where: the marks in the cobbles, the barrels still across the alley mouth. You left it at first light to go down to the water. From here you can see the door is not quite shut, and you are sure you shut it.`}${b87If('vasso', `\n\nVasso looks up at the roofline before he looks at anything else. He always will.`)}`,
      ch:[{t:'Look about the street.', go:()=>startExplore()},
          {t:'Look up at the roofline first, out of habit.', go:'b8_c7_roofs_look'}]}),
    /* the door: men who heard the Fourth did not come home (optional fight, or faced down) */
    b8_c7_door:()=> S.f.b8_c7_doorDone ? DLG.b8_c7_door_home() : ({sp:'The Fourth\'s door', scene:'b8_door', fx:()=>{ S.f.b8_c7_doorSeen = 1; }, txt:
`There are three men in the Fourth's room. They have the fire lit, with the Fourth's wood, and they have the Fourth's chairs pulled up to it, and one of them is going through the drawer where the ledger lives, and stops when the door opens.

"Thought you'd gone," says the one by the fire, not getting up. "${b87Wall() ? 'Everyone said. Old soldiers on the wall, and the wall came down.' : 'Down the street said you went out at first light and didn\'t look like coming back.'} A door going spare, on a morning like this." He spreads his hands. "Finders."${b87If('brisk', `\n\nBrisk fills the doorway behind you, and the room gets smaller.`)}${b87If('kettle', `\n\n"That's my chair," Kettle says, very quietly.`)}`,
      ch:[{t:'"Out." Clear the room.', go:()=>startBattle('b8_c7_doorway', {})},
          {t:'Tell them, in the voice that used to clear a parade ground, whose door it is.', check:['might', 15],
            edges:id=>[id === 'brisk' && ['she has been standing in doors since Pale', 3], id === 'edrem' && ['a big man in grey scale with a mace, in a small room', 2], id === 'greysword' && ['a Grey Sword in full plate, in a small room', 2], id === 'sgt' && ['you have been a sergeant a very long time', 1], id === 'brannoc' && ['Falari, loud, and enormous', 1], id === 'tuft' && ['she looks nineteen still, and always will', -1], id === 'vasso' && ['he looks like what he is, a boy from the roofs', -1]],
            near:{t:()=>`Yes, but the one by the fire takes his time getting up, and on his way past ${b87Nm(b87Who())} he puts a shoulder into ${b87Him(b87Who())}, hard, against the door-frame, and ${b87Nm(b87Who())} ${b87V(b87Who(), 'let', 'lets')} it go. It costs: stiff with it in the next fight.`, fx:()=>bruise(b87Who(), bruiseN())},
            go:'b8_c7_door_talked', fail:'b8_c7_door_row'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c7_door_talked:()=>({sp:'The Fourth\'s door', scene:'b8_door', fx:()=>{ S.f.b8_c7_doorDone = 1; S.f.b8_c7_doorTalked = 1; }, txt:
`They go. Not quickly, and not looking at anybody, but they go, out into the street and away down it toward the smoke, and the last of them leaves the drawer open on his way past.

The ledger is still in it. So is the rent jar. So is the iron cap on its nail by the door. The fire they lit is a good one, as it happens, and the Fourth does not put it out.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c7_door_row:()=>({sp:'The Fourth\'s door', scene:'b8_door', txt:
`The one by the fire looks at you a moment longer, and then at his friends, and then he picks up the poker.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c7_doorway', {})}]}),
    b8_c7_door_after:()=>({sp:'The Fourth\'s door', scene:'b8_door', fx:()=>{ S.f.b8_c7_doorDone = 1; S.f.b8_c7_doorFought = 1; }, txt:
`The room is the Fourth's again. It is a smaller room with five people and a broken chair in it than it was with three strangers and a fire, and it smells of their boots, and the drawer is still open.

The ledger is in it. The rent jar is not; one of them had it under his coat, and it is on the floor now, in pieces, and the coins all over the boards.${b87Say({kettle:`\n\nKettle goes down on her knees and picks up every coin, counting, and puts them in her own pocket for now. "Forty-three," she says. "There were forty-three. Good."`, _:'\n\nYou pick up the coins. They are all there, as it happens.'})}${b87If('vasso', `\n\nVasso looks at the broken jar. "On the roofs they'd have said that was the door telling you it's yours," he says. "I never knew what they meant."`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c7_door_home:()=>({sp:'The Fourth\'s door', scene:'b8_door', again:()=>'The Fourth\'s door, the morning after: the room, the fire, the iron cap on its nail.', txt:
`The room: the table, five chairs and the sixth against the wall, the iron cap on its nail, the bar leaning by the door where it always leans. The bells come through the shutters as if they were in the room.${b87Say({brisk:`\n\nBrisk sets her helm down on the table, and sits, for the first time since the Fete began, and puts both hands flat on the wood.`, _:''})}`,
      ch:[{t:'Open the ledger.', go:'b8_c7_ledger'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c7_ledger:()=>({sp:'The ledger', scene:'b8_door', fx:()=>{ S.f.b8_c7_ledger = 1; }, txt:
`The ledger is waterproofed, and greasy at the corners, and full. The squad's rent, in your hand, every quarter-day since the Fourth came to the city. The squad's debts, mostly to Orsa. The price of bread, which you started writing down the first winter and never stopped. ${b87Hunt() ? 'A page this winter with a go-between\'s street on it, and a line through the street. ' : 'A page this winter with a chalk sign copied off the door-post, and nothing after it. '}

And at the back, the last column. No money in it. Names, in the order they stopped being owed anything.${b87Book().length ? ` You write ${b87Names(b87Book())} at the bottom of it, now, with the bells going, and your hand is steadier than you thought it would be.` : ' You do not add anything to it this morning. You look at it a while anyway.'}`,
      ch:[{t:'Close it, and back to the street.', go:()=>startExplore()}]}),

    /* Benlo: the city's news, the morning after (rules 72 to 83: the city hears, it never sees) */
    b8_c7_benlo:()=>({sp:'Benlo', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_benlo = 1; }, again:()=>'Benlo at his barrow, the brazier cold.', txt:
`Benlo is at his barrow at the corner, as he is every morning, except that the brazier is cold and there are no chestnuts on it, and he is standing with his cap in his hands.

"Sergeant," he says. "You're alive. Good. That's one." He looks up at the bells. "You'll have heard. Everybody's heard. No one saw, mind. No one I know saw anything, and anybody who says they did is lying."`,
      ch:[{t:'"The bells. Who are they for?"', go:'b8_c7_benlo_bells'},
          {t:'"What else?"', go:'b8_c7_benlo_city'},
          {t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c7_benlo_bells:()=>({sp:'Benlo', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_benloBells = 1; }, txt:
`"The Son of Darkness," Benlo says, and lowers his voice, as if that would help. "The lord of the black city on the coast. Dead, in this city, last night. No one knows how. No one's saying." He turns his cap round in his hands. "And this morning there's a man walking him out of the city on an ox cart. A big man. Caladan Brood, they're saying, the one from the wars. Walking. And the whole city's going out behind him."

He looks at the empty brazier. "My father said that when a great one dies, the bells ring by themselves," he says. "I never believed him. I don't know who's ringing them."${b87If('vasso', `\n\nVasso says, "The temples are. And something under them that isn't." Benlo does not ask what he means.`)}${b87If('edrem', `\n\nEdrem has gone very still. "Black Coral's lord," he says. "His city will be dark without him." He frowns. "Or it will not. I do not know which would be worse."`)}`,
      ch:[{t:'Back to Benlo.', go:'b8_c7_benlo'}]}),
    b8_c7_benlo_city:()=>({sp:'Benlo', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_benloCity = 1; }, txt:
`"The moon," Benlo says. "You saw that. Everyone saw that. Went to pieces right over the city, and the pieces went off east, burning." He shakes his head. "The wall's down in three places. There was a giant in the street up on the hill, they say, as big as a door, and nobody would tell me what he was doing there."

"A councillor's dead. A young one. And a councillor's widow fell from a tower on the estates, and nobody's saying if she was pushed." He spreads his hands. "And the Gadrobi side burned, and the gaol's open, and the bells are ringing. That's the news. I sell chestnuts. I'd like to go back to selling chestnuts."${b87Say({ohl:`\n\n"You will," Ohl tells him. "Tomorrow. Today nobody's selling anything."`, _:''})}`,
      ch:[{t:'Back to Benlo.', go:'b8_c7_benlo'}]}),
    /* the painted sign (Ch 1, seen again on the last night; a mask hung on its bracket) */
    b8_c7_sign:()=>({sp:'The painted sign', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_sign = 1; }, again:()=>'The tavern\'s painted sign, two big women arm in arm, and a mask on the bracket.', txt:
`Down at the corner of the dyers' row the tavern's painted sign is still hanging: two big women arm in arm on the board, one with a rum jug and one with a tray of cakes, freshly painted for the spring and none the worse for the night. Someone has hung a Fete mask on the bracket over them, a plain white one, and left it.

No one in the tavern knows who they are. No one there knows who hung the mask, either.${b87Say({kettle:`\n\nKettle looks up at the two of them a while. "Still there," she says. "Someone ought to find out who they are, before the paint goes."`, brisk:`\n\nBrisk looks up at the sign. "Still standing," she says, which is more than she has said about most things this morning.`, _:''})}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    /* the Fete's poles, still up, masks on their strings (callback 1's echo: the last Fete, years ago) */
    b8_c7_masks:()=>({sp:'The Fete poles', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_masks = 1; }, again:()=>'A Fete pole with its string of masks and little bells, turned every way by the wind.', txt:
`The Fete poles are still up along the street, with their strings across it, and on the strings the masks the street hung out for the festival: painted faces, animals, moons, a great many moons, all turned every way by the night's wind so that half of them are looking at the wall. Little brass bells hang between them. Under all the city's iron they are ringing too, very small, whenever the wind moves them.

The last Fete the Fourth saw in this city ended with the sky on fire over an estate garden, and in the morning the city took its masks down and put them away and said nothing about any of it. This morning nobody has taken anything down.${b87Say({tuft:`\n\nTuft reaches up and turns one of the moon masks back to face the street. "Someone should," she says.`, brisk:`\n\n"Last time they swept the streets by noon," Brisk says. "Like a parade ground." She looks at the masks. "Not this time."`, _:''})}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    /* Vasso, waiting on the Fourth's step (b8_vassoDone 2), or a save that never met him */
    b8_c7_vasso:()=>({sp:'Vasso', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_vassoTalk = 1; }, again:()=>'Vasso, on the Fourth\'s step, listening to the bells.', txt:
`Vasso is sitting on the Fourth's step with his knees up and his hands open on them, the way he sat the first night he came. There is soot in his hair and a cut over one eye.

"Sergeant," he says. "I kept the door as long as there was a door to keep. Then the street needed hands." He looks up at the roofline, and then at the bells. "I heard you were on the ${b87Wall() ? 'wall' : 'street'}. I heard a lot of things. I'm glad most of them weren't true."`,
      ch:[{t:'"Walk with us, Vasso."', fx:()=>{ b8Join('vasso'); }, go:'b8_c7_vasso_join'},
          {t:'"Keep the step. We\'ll be back."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c7_vasso_join:()=>({sp:'Vasso', scene:'b8_c7_street', txt:
`${b8In('vasso') ? `He gets up off the step and falls in, at the end of the line, where the light one goes. "Good," he says. "I didn't want to listen to them on my own."` : `He nods, and stays where he is. "Six walk already," he says. "I can count. I'll keep the step."`}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* the dyers' row: looters at Orsa's shutters (the main fight, and its yard) */
    b8_c7_looters_look:()=>({sp:'The dyers\' row', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_lootSeen = 1; }, again:()=>'Men with sacks at Orsa\'s shutters in the dyers\' row.', txt:
`At the bottom of the street, where the dyers' row begins, there are men at Orsa's shutters. Not Guild: their boots are too loud. Men with sacks and a pry-bar and the confidence of people who have noticed that everyone in the city is looking up at the bells.

Orsa is in her own doorway with a dice cup in one fist and a cleaver in the other, and four of them in front of her, and a fifth behind them in a good coat with a rapier, smiling. Up and down the row people are watching from their doors, and not moving.${b87Say({kettle:`\n\n"That's Orsa's," Kettle says. "Orsa lets me cheat." She has a hand in the satchel already.`, brisk:`\n\nBrisk has her shield off her back before you have said anything at all.`, _:''})}${b87If('edrem', `\n\nEdrem looks at the man in the good coat. "I have met him," he says. "On the pilgrims' road, and on every road. Always the same man."`)}`,
      ch:[{t:'Down the row, straight at them.', go:()=>startBattle('b8_c7_looters', {})},
          {t:'Come at them out of the dyers\' lines, behind the hanging cloth, before the man in the coat sees it coming.', check:['wits', 15],
            edges:id=>[id === 'vasso' && ['he grew up in this row, under the drying lines', 3], id === 'ellis' && ['Claw-trained: the cloth is cover, and she knows it', 2], id === 'ressa' && ['she grew up among dyers\' vats in G\'danisban', 2], id === 'vell' && ['the drying lines are only ropes', 1], id === 'sgt' && ['you have come at men from behind a curtain before', 1], id === 'brisk' && ['a heavy in mail does not creep', -1], id === 'brannoc' && ['Brannoc cannot be quiet in a wet sheet', -1]],
            near:{t:()=>`Yes, but the cloth ${b87Nm(b87Who())} ${b87V(b87Who(), 'push', 'pushes')} through is still wet from the vat, and it is black, and it goes all over ${b87Nm(b87Who())}, and ${b87He(b87Who())} ${b87V(b87Who(), 'come', 'comes')} out of the line looking like a ghost from a bad Fete: rattled.`, fx:()=>b87Rattle(b87Who())},
            go:'b8_c7_looters_flank', fail:'b8_c7_looters_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c7_looters_flank:()=>({sp:'The dyers\' row', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_lootFlank = 1; }, txt:
`Through the drying lines, under the black cloth and the blue, close enough to smell the vats. The man in the good coat is telling Orsa what will happen to her if she does not put the cleaver down, and enjoying it. He does not hear the Fourth come out of the cloth behind him. The row holds its breath, and watches.`,
      ch:[{t:'Now.', go:()=>startBattle('b8_c7_looters', nearMiss() ? {} : {surprise:'p'})}]}),
    b8_c7_looters_seen:()=>({sp:'The dyers\' row', scene:'b8_c7_street', txt:
`A sheet comes down off its line as somebody brushes it, and the man in the good coat turns at the sound, and sees the Fourth in the cloth, and smiles wider.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c7_looters', {})}]}),
    b8_c7_looters_after:()=>({sp:'The dyers\' row', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_lootDone = 1; }, txt:
`The dyers' row is quiet after, under the bells. The man in the good coat is sitting against Orsa's wall holding his arm, and his friends are gone over the back wall without the strongbox, and up and down the row the doors are opening and people are coming out to look.

Orsa puts the cleaver down on her step, carefully, and the dice cup beside it.${b87If('vasso', `\n\nVasso is standing in the middle of the row with his knife out, looking at it. "Still never put it in anybody," he says. "There was always somebody nearer." He sounds less surprised than he used to.`)}`,
      ch:[{t:'See to Orsa.', go:'b8_c7_orsa'}]}),
    b8_c7_orsa:()=>({sp:'Orsa', scene:'b8_c7_street', fx:()=>{ if (!S.f.b8_c7_orsa) { S.f.b8_c7_orsa = 1; S.f.b8_c7_band = 1; gain('b8_c7_mourningband'); } }, again:()=>'Orsa at her door in the dyers\' row, with the black bands.', txt:
`Orsa is a big woman, and she sits down on her own step as if her legs had been told something first. "Malazans," she says. "I knew you'd come down the row. I said to myself, they'll come, they always come down the row when there's noise." She wipes her face. "There's always noise."

The dyers from up the row are coming out with armfuls of black cloth, strips of it, the way the Daru tie them round the arm for the dead, and handing them to anyone who stands still. One of them ties one round your arm before you can say anything. Orsa ties another round her own.

"For him," she says, nodding up at the bells. "For whoever. Everybody's got somebody this morning." She looks at the Fourth. "You lot more than most, I'd think."${b87If('kettle', `\n\n"You'll still let me cheat?" Kettle says. Orsa laughs, which is the first laugh in the row all morning. "Tomorrow," she says. "Today nobody's playing."`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* whoever is still on the roofs (b8Roofs(7)): fight, or let them see the Fourth walk out with the mourners; nobody if the knives went down */
    b8_c7_roofs_look:()=> !b87RoofsOpen() || S.f.b8_c7_roofsLeft ? DLG.b8_c7_roofs_none() : ({sp:'The roofline', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_roofsSeen = 1; }, html:contractHTML(), again:()=>'A dark shape on the roofline over the Fourth\'s street, watching.', txt:
`Up on the roofline over the Fourth's street, against a grey sky, there is a shape that is not a chimney. ${b87RoofList().length > 1 ? `Then there are ${['', 'one', 'two', 'three'][b87RoofList().length] || 'several'} of them.` : 'Just the one.'} Dark quilting, a good crouch, and no hurry at all.

The paper is still a paper. Not everyone who was on it last night came off the roofs.${b87If('vasso', `\n\nVasso looks up at them and his face does something complicated. "I know that one's crouch," he says, very low. "Journeyman, like me. He'll not want to be up there today either."`)}${b87If('vell', `\n\nVell is looking at the line they came along, chimney to chimney. "Easy line," he says. "I could be up it before they turned round."`)}`,
      ch:[{t:'Go up and finish it.', go:()=>startBattle('b8_c7_roofs', {})},
          {t:'Let them see you: bareheaded, the black band on, turning your back on the roofs to walk out with the mourners.', check:['guile', 17], contract:true,
            edges:id=>[id === 'vasso' && ['he gives the journeyman\'s sign for "not today", which the Guild knows', 3], id === 'vell' && ['he still knows the old signs from the roofs', 2], id === 'ellis' && ['Claw-trained: she knows what a watcher needs to see', 2], (S.kit || []).includes('b8_c7_mourningband') && id === 'sgt' && ['the black band on your arm, like the whole city', 1], id === 'sgt' && ['you have turned your back on worse, and lived', 1], id === 'kettle' && ['she keeps looking back up at them', -1], id === 'brannoc' && ['Brannoc cannot help glaring', -1]],
            near:{t:'Yes, but someone on a roof saw it, and is not sure it was meant: the paper notes it, one more mark on it.', fx:()=>b8Con(1, 'someone on a roof saw it')},
            go:'b8_c7_roofs_talked', fail:'b8_c7_roofs_row'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b8_c7_roofs_talked:()=>({sp:'The roofline', scene:'b8_c7_street', fx:()=>{ if (!S.f.b8_c7_roofsLeft) { S.f.b8_c7_roofsLeft = 1; b8Con(-1, 'the paper put down for a day'); } }, txt:
`You turn your back on the roofs, and walk down the street with the black band on your arm and your head bare, at the pace of everyone else in the city this morning, which is the pace of a funeral.

When you look back from the corner, the roofline is only roofline. Whoever was up there has gone back along the chimneys, the way they came. Not today. Perhaps not for a while. The bells make it a poor day for paper.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b8_c7_roofs_row:()=>({sp:'The roofline', scene:'b8_c7_street', txt:
`You turn your back, and somebody up there does not believe it. A slate comes sliding off the roof and breaks on the cobbles at your heel, and when you look up they are already coming down.`,
      ch:[{t:'Fight.', go:()=>startBattle('b8_c7_roofs', {})}]}),
    b8_c7_roofs_after:()=>({sp:'The roofline', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_roofsDone = 1; }, html:contractHTML(), txt:
`The roofs over the Fourth's street are empty, except for the Fourth, and the bells are very loud up here. Down in the street people are looking up at you, and then back up at the bells, as if they could not decide which to watch.

Somewhere in the city, on a day like this, somebody will hear about it, and write it down.${b87If('vasso', `\n\nVasso crouches by the last of them, and closes the eyes, and sits back on his heels. "I knew him," he says. "Not well. Well enough." He does not get up for a while.`)}`,
      ch:[{t:'Back down to the street.', go:()=>startExplore()}]}),
    b8_c7_roofs_none:()=>({sp:'The roofline', scene:'b8_c7_street', fx:()=>{ S.f.b8_c7_roofsNone = 1; }, txt:
`You look up at the roofline over the Fourth's street, out of habit, and there is nothing on it but chimneys and a grey sky and the bells.${b87Down() ? ` The Guild has counted enough, for now. Last night it sent knives, and they did not come home, and this morning it is counting what that cost.` : ` ${S.f.b8_c7_roofsLeft ? 'Whoever was up there this morning has gone back along the chimneys, and has not come back.' : 'Whoever was on the paper is not on the roofs today.'}`}${b87If('vasso', `\n\n"No one," Vasso says, looking up. "No one at all." He sounds as if he does not trust it, and would like to.`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* the street's way east: the whole city going out behind the cart (phase 1 to 2, once the dyers' row is done) */
    b8_c7_to_road:()=>{ const ph = b87Ph();
      if (ph === 1 && !b87LoopDone()) return {sp:'The east end of the street', scene:'b8_c7_street', txt:
`East, the street runs out toward the gate and the road. People are drifting that way, in ones and twos, and then in families. ${S.f.b8_c7_lootSeen ? 'But there are still men at Orsa\'s shutters, at the bottom of the row.' : 'Something is going on at the bottom of the dyers\' row first: you can hear wood splitting under the bells.'}`,
        ch:[{t:'Back to the street.', go:()=>startExplore()}]};
      if (ph === 3) return {sp:'The east road', scene:'b8_c7_street', txt:`Not tonight. The road is empty now, and the crowd is home.`, ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:'The east end of the street', scene:'b8_c7_street', txt:
`The bells change. All of them at once, the way they do for a procession: slower, and further apart. And the whole street, the whole district, the whole city it seems like, puts down whatever it was doing and starts walking east, toward the gate and the road out, quietly, not pushing.${ph === 2 ? '' : `\n\nThey have not been told to. They do not need to be.`}`,
        ch:[{t:'Go with them, at the back.', onward:true, fx:()=>{ S.f.b8_c7_ph = Math.max(2, S.f.b8_c7_ph || 1); }, go:()=>{ startExplore('b8_c7_road'); if (!S.f.b8_c7_road) talk('b8_c7_road_arrive'); }},
            {t:'Not now.', go:()=>startExplore()}]}; },

    /* ======== phase 2: the procession, from the very back ======== */
    b8_c7_road_arrive:()=>({sp:'The road out of the city', scene:'b8_morning', fx:()=>{ S.f.b8_c7_road = 1; }, txt:
`The road out of the gate is full from hedge to hedge, and so are the fields either side of it, and so is the next rise, and the one after that: tens of thousands of people, walking, not talking, in their Fete clothes and their work clothes and their black bands, all going the same way at the same pace behind something none of them can see from here.

From the very back, where the Fourth is, what is ahead is a long way ahead. A shape on the road at the head of it all that might be a cart, and an ox, and a big man walking at the ox's head. That is all. No one at the back is going to get any nearer than this, and no one is trying.

Behind you, the city's bells are still going, every one of them, all the way out here.${b87Say({brisk:`\n\nBrisk walks with her helm under her arm. When the bells change she lifts two fingers to her brow, toward the front, and keeps them there a while.`, _:''})}${b87If('edrem', `\n\nEdrem walks at the end of the Fourth's line, as he walks at the end of every line. "I walked behind a cart like this once," he says. "Out of Coral, after. No one followed that one."`)}${b87If('vasso', `\n\n"I've never been out of the gate on foot with this many people," Vasso says. "You can't see any roofs out here." He keeps looking round anyway.`)}`,
      ch:[{t:'Walk.', go:()=>startExplore()},
          {t:'Walk beside Brisk a while.', req:()=>b8In('brisk') && !S.f.b8_c7_brisk, go:'b8_c7_brisk'},
          {t:'Walk at the end of the line, with Edrem.', req:()=>b8In('edrem') && !S.f.b8_c7_edrem, go:'b8_c7_edrem'}]}),
    b8_c7_ahead:()=> !S.f.b8_c7_guardian ? ({sp:'Toward the front', scene:'b8_morning', txt:
`North, the crowd goes on, a slow river of backs, and somewhere at the head of it the cart. You could push. The crowd is not pushing, and neither do you. It is not a day for pushing.${b87Say({tuft:`\n\nTuft has stopped, and is looking back past you, down the road behind the Fourth, frowning, as if she heard her name.`, _:`\n\nSomebody behind you, at the very back of everything, coughs. You had thought the Fourth was the very back.`})}`,
      ch:[{t:'Back along the crowd\'s edge.', go:()=>startExplore()}]}) : DLG.b8_c7_halt(),
    b8_c7_milestone:()=>({sp:'A milestone', scene:'b8_morning', again:()=>'A milestone by the road, and the city behind.', txt:
`A milestone by the road, old, the numbers on it worn smooth by Daru rain and Daru hands. From here, looking back, you can see the whole city: the broken places in the wall, the smoke going up from the Gadrobi side, the domes on the hill with the morning on them, and every bell tower with its bell going.

It is a long way to have come for a city. ${b87Say({brisk:`Brisk looks back at it with her hands on her hips. "Ours," she says. "Mostly." She sounds surprised.`, kettle:`Kettle looks back at it and counts the towers. "Eleven," she says. "Eleven I can see." She does not say what the number is for.`, _:'It is the only one that ever let the Fourth sit down.'})}`,
      ch:[{t:'Back to the road.', go:()=>startExplore()}]}),
    /* the crowd: a Daru family at the back, and a child's question */
    b8_c7_crowd:()=>({sp:'The crowd', scene:'b8_morning', fx:()=>{ S.f.b8_c7_crowd = 1; }, again:()=>'A Daru family by the stones at the road\'s edge, the child on the father\'s shoulders.', txt:
`At the edge of the road, sitting on a stone to rest, there is a family from somewhere up the hill: a man in a good coat with the sleeve burned, a woman, a boy of six or so on the man's shoulders, craning to see the front.

"Who is it?" the boy says, for what is plainly not the first time. "On the cart. Who is it?"

The father does not know how to answer. He looks at the soldiers going by, at the Fourth, as if soldiers might.`,
      ch:[{t:'"A soldier," you tell the boy. "A lord, too. But a soldier."', fx:()=>{ S.f.b8_c7_crowd = 'soldier'; }, go:'b8_c7_crowd_answer'},
          {t:'Let the father answer. Walk on.', go:()=>startExplore()}]}),
    b8_c7_crowd_answer:()=>({sp:'The crowd', scene:'b8_morning', txt:
`The boy considers this from his height. "How do you know?" he says.

"The bells," you tell him. "A city rings like that for a soldier."

He listens to them for a while, with his chin on his father's head. Then he says, "Are you a soldier?" and you say you were, and he says, "Will they ring for you?" and his mother takes him down off his father's shoulders before you have to answer that.${b87Say({brisk:`\n\n"They'll not have to," Brisk says, walking on. "We've got our own bell." The rest of the Fourth will know what she means by evening.`, kettle:`\n\n"We'll ring our own," Kettle says, walking on, and you see her look at the little bells on the Fete poles by the road.`, _:''})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    /* Brisk's god from this morning: the Guardians of the Gate (her salute, at the bells) */
    b8_c7_brisk:()=>({sp:'Brisk', scene:'b8_morning', fx:()=>{ S.f.b8_c7_brisk = 1; }, txt:
`${b8In('brisk') ? `Brisk walks with her helm under her arm and her eyes on the front of the crowd, where nobody can see anything. When the bells change she salutes, two fingers to her brow, the way she always has.

"Last night I called him," she says, without looking round. "On the street, when it went bad. Death. He always came, before. Or he always might have, which is the same." She walks a while. "He didn't. The gate was empty. I've never felt it like that."

"This morning there's somebody," she says. "I don't know who. Soldiers, by the feel of them. A lot of them." She salutes again. "I'll salute whoever's there. I always did. It was never really him I was saluting."` : `You walk on behind the crowd. Someone near the front has started to sing, very low, and stopped.`}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    /* Edrem, who walked behind a cart out of Coral once */
    b8_c7_edrem:()=>({sp:'Edrem', scene:'b8_morning', fx:()=>{ S.f.b8_c7_edrem = 1; }, txt:
`${b8In('edrem') ? `Edrem walks at the end of the Fourth's line with the mace over his shoulder, as he walks at the end of every line.

"Out of Coral, after the Seer fell," he says, "I walked behind a cart like this. A dead captain of ours on it, and twelve of us behind, and nobody else. The city did not come out. The city was glad." He looks at the crowd, the tens of thousands of backs. "I did not know a city could do this. For anyone."

"I will tell the pilgrims," he says, after a while. "If I ever stand on the road again. They should know there was a morning like this."` : `You walk on behind the crowd, and think of other carts, and other roads.`}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    /* callback 5, Tuft and Tufty: a rumour, never in one scene with the house or the cat (rule 6, §(b)) */
    b8_c7_benna:()=>({sp:'Old Benna', scene:'b8_morning', fx:()=>{ S.f.b8_c7_tufty = 1; }, again:()=>'Old Benna with her basket, walking at the back.', txt:
`Old Benna is walking at the back of the crowd with a basket of somebody's washing on her hip, because the washing does not stop for anybody, and she falls in beside the Fourth as if she had been looking for it.

"You'll not have heard this one," she says, low, with relish; she has been carrying it all morning. "My cousin's girl does for a house on the estates. Up near that old house nobody goes into, with the garden and the tower. The one with whatever lives in it now. A Jaghut, my cousin says, and my cousin says a lot." She leans in. "He's got a cat. A white one. Dead, mind, walks about the garden dead as you like. And he calls it Tufty."

She looks straight at Tuft, and waits.`,
      ch:[{t:'Look at Tuft.', go:'b8_c7_tufty'}]}),
    b8_c7_tufty:()=>({sp:'Tuft', scene:'b8_morning', txt:
`Tuft does not say anything for a while. Then she says, "No," very firmly, to the road ahead.

"Dead as you like," says Benna happily. "White as a sheet."

"I have never," Tuft says, "been white as a sheet." She walks a little faster. "And I am not dead. And I have not heard this. No one has heard this."${b87Say({kettle:`\n\nKettle is making a small noise into her sleeve that is not crying.`, brisk:`\n\nBrisk says nothing at all, very loudly.`, _:''})}

Benna goes off up the edge of the crowd with her basket, well pleased. Behind her, for the first time since the bells started, the Fourth is not thinking about the bells.`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    /* callback 8, the Guardians of the Gate: a soldier who answers for the dead, at the very back. Never his name (rule 75) */
    b8_c7_guardian:()=>({sp:'A soldier at the back', scene:'b8_morning', fx:()=>{ S.f.b8_c7_guardianSeen = 1; }, txt:
`There is a soldier behind the Fourth. At the very back, where there should be nobody, walking at the pace of the crowd with his hands loose at his sides. Old grey kit, dust on all of it, a helm with the badge scraped off, a long sword at his hip in a scabbard gone pale. You cannot see his face. The light is wrong for it, or the helm is.

He looks the Fourth over, the way a captain looks a squad over at a halt, counting. ${(() => { const n = b87Mates().length + 1; return `He gets to ${numw(n)}.`; })()} Then he looks at you.

"Fourth Squad," he says.${b87Say({brisk:`\n\nBrisk has stopped dead in the road. Her two fingers go up to her brow, and stay there, and her hand is shaking. The soldier in grey lifts his own hand, slow, and returns it.`, _:''})}`,
      ch:[{t:'"Sir."', go:'b8_c7_guardian_say'},
          {t:'"Who are you?"', go:'b8_c7_guardian_say'}]}),
    b8_c7_guardian_say:()=>({sp:'A soldier at the back', scene:'b8_morning', fx:()=>{ S.f.b8_c7_guardian = 1; }, txt:
`He nods, as if that were an answer to something. The crowd goes past him on either side and does not seem to notice him at all.

"Anything else, Sergeant," he says, "ask it now."

You know the voice. You heard it say that, word for word, once, at a fire outside Pale with a sword across its knees, the first night it ever spoke to the Fourth. You open your mouth to ask it something, and you do not know what, and then a woman with a child on her shoulders goes between you, and when she is past there is only the road, and the dust, and the bells.${b87If('tuft', `\n\nTuft is staring at the place where he was. Her face is wet. "Someone's holding the gate," she says. "Someone new." She wipes her face with the back of her hand. "Good. Good."`)}${b87If('ohl', `\n\nOhl has his list half out of his coat. He puts it back. "Not today," he says, to nobody. "Not him."`)}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    /* the crowd stops at the edge of the fields; the cart goes on alone. Never the barrow sealed, never Brood reached (correction 2) */
    b8_c7_halt:()=>({sp:'The edge of the fields', scene:'b8_morning', txt:
`At the top of a long rise the crowd stops, all of it, slowly, from the front back, the way a column stops. No order has been given. Far ahead, past the last of the people, the shape that might be a cart goes on alone across the fields toward a low place in the land, and gets smaller, and does not stop.

You will never know what is at the end of that road. No one at the back will. The Fourth stands on the rise with ten thousand strangers and watches a speck go over a fold in the ground, and then there is only the fields, and the hills, and the bells behind you, all the way from the city.

After a while, people start to turn round.`,
      ch:[{t:'Back to the city, and the lake.', onward:true, fx:()=>{ S.f.b8_c7_ph = 3; }, go:()=>{ startExplore('b8_c7_shore'); talk('b8_c7_dusk'); }},
          {t:'Not yet. Stand a while longer.', go:()=>startExplore()}]}),
    b8_c7_road_back:()=>({sp:'The road back', scene:'b8_morning', txt:
`South, the road goes back to the city gate, empty, every soul on it going the other way. ${S.f.b8_c7_guardian ? 'Not yet. Not until the crowd turns.' : 'Not yet. The Fourth walks this to the end, as far as anyone at the back walks it.'}`,
      ch:[{t:'Back to the crowd.', go:()=>startExplore()}]}),

    /* ======== phase 3: evening on the shore ======== */
    b8_c7_dusk:()=>({sp:'The lake shore', scene:'b8_lakeshore', txt:
`By evening the city has come home, and gone indoors, and the shingle is nearly empty. The bells have not stopped. Some of them have the ringers changed, and you can hear it in the rhythm; some of them${b8In('vasso') ? ', Vasso says,' : ''} nobody is ringing at all.

The Fourth has its fire back on the shingle, its own this time, and the lake has gone the colour of slate, and along the shore the blue lamps are coming on one by one as if nothing had happened anywhere.${b87Say({kettle:`\n\nKettle has something in her hand: a little brass bell, the kind the city strings across its streets by the hundred for the Fete, with a dent in it. "Cut it off a pole on the way back," she says. "Someone should ring one for ours."`, _:`\n\nOn the way back you cut a little brass bell off a Fete pole, the kind the city strings by the hundred across its streets. Someone should ring one for the Fourth's.`})}`,
      ch:[{t:'To the fire.', go:'b8_c7_fire'}]}),

    /* the bell for every soldier: the Fourth's own toll, under the city's. Ohl's list read, or the ledger, or no names */
    b8_c7_toll:()=>({sp:'The bell', scene:'b8_lakeshore', fx:()=>{ if (!b87Bell()) gain('b8_c7_bell'); }, again:()=>'The Fourth\'s little brass bell on the shingle, by the fire.', txt:
`The little bell sits on a flat stone by the fire, dented, ordinary, a thing the city strings up by the hundred and throws away after.

Every bell in Darujhistan is ringing for one death tonight. The Fourth has more than one. ${b87Book().length ? `${b87Names(b87Book())}, this year. ` : ''}${b87Before().length ? `${b87Names(b87Before())}, before. ` : ''}And the old names, the ones from Pale and from the road south and from Coral, that are in the ledger's last column and on Ohl's list and in everybody's head at night.${S.f.b8_c5_mallet ? ` And two more, from the news at the gate: two of the K'rul's Malazans, one of them a healer the Fourth once knew.` : ''}

There is nobody to say how it is done. The Fourth is going to have to decide.`,
      ch:[{t:'"Ohl. Read the list."', req:()=>b8In('ohl'), fx:()=>{ S.f.b8_c7_toll = 'list'; S.f.b8_c7_tolled = 1; b87L('ohl', 1); }, go:'b8_c7_toll_list'},
          {t:'Read the ledger\'s last column yourself.', fx:()=>{ S.f.b8_c7_toll = 'ledger'; S.f.b8_c7_tolled = 1; }, go:'b8_c7_toll_ledger'},
          {t:'No names. Ring it, and let everyone count their own.', fx:()=>{ S.f.b8_c7_toll = 'quiet'; S.f.b8_c7_tolled = 1; b87L('tuft', 1); }, go:'b8_c7_toll_quiet'},
          {t:'Not yet.', go:'b8_c7_fire'}]}),
    b8_c7_toll_list:()=>({sp:'Ohl\'s list', scene:'b8_lakeshore', txt:
`Ohl unwraps the oilcloth, and unfolds the list, all of it, which takes a while, and holds it up to the fire so he can see, and reads.

He reads every name. The ones from Pale. The ones from the road south. Coral. The two marines on the hill he could never find more for, written by what they did. Strangers, some of them, put on the list because somebody had to. ${b87Book().length ? `${b87Names(b87Book())}, at the end, in his steadiest hand. ` : ''}After each one he stops, and ${b8In('kettle') ? 'Kettle' : 'you'} ${b8In('kettle') ? 'rings' : 'ring'} the little bell once, and the sound goes out over the water, very small under all the city's iron, and then he reads the next.

It takes a long while. The Fourth sits through all of it. When he is done he folds the list back into its oilcloth, and his hands are steady, and he says, "That's all of them. That's all the ones I know."`,
      ch:[{t:'Sit with it a while.', go:'b8_c7_count'}]}),
    b8_c7_toll_ledger:()=>({sp:'The ledger', scene:'b8_lakeshore', txt:
`You open the ledger at the back, where the column is: the one with no money in it, the names that are not owed anything any more. You read them out, every one, in the order you wrote them, ${b87Book().length ? `down to ${b87Names(b87Book())} at the bottom, the ink still new, ` : ''}and after each one ${b8In('kettle') ? 'Kettle rings' : 'you ring'} the little bell once, and the sound goes out over the water.

${b87If('ohl', `Ohl sits with his list in his lap and does not open it. Some of his names are not in your column, and some of yours are not on his list, and neither of you says anything about that. `)}It is not a long column, for the years it covers. It is long enough.`,
      ch:[{t:'Sit with it a while.', go:'b8_c7_count'}]}),
    b8_c7_toll_quiet:()=>({sp:'The bell', scene:'b8_lakeshore', txt:
`No one reads anything. ${b8In('kettle') ? 'Kettle' : 'You'} ${b8In('kettle') ? 'rings' : 'ring'} the little bell, once, and waits, and rings it again, and goes on ringing it, slowly, with a space after each stroke for a name, and in each space everybody at the fire puts their own.

You do not know whose names the others are putting in. You can see their lips move. ${b87If('tuft', `Tuft's go on after everyone else's have stopped. `)}${b87If('vasso', `Vasso's move with the bells, all of them, and then with this one. `)}When the ringing stops, it is because the last of them has stopped moving their lips, and nobody needed to say so.`,
      ch:[{t:'Sit with it a while.', go:'b8_c7_count'}]}),
    /* the trick: The Toll Count, behind a hard check that names what the squad knows (counting at a halt; the bells; the Lady's spin) */
    b8_c7_count:()=>({sp:'The bells', scene:'b8_lakeshore', again:()=>'The Fourth on the shingle, counting the city\'s bells.', txt:
`After, the Fourth sits and listens to the city's bells, because there is nothing else to listen to. ${b87Say({vasso:`Vasso is counting them. He has been counting them all day, the way he counts the hours at night on the roofs, and he knows every one by its voice.`, kettle:`Kettle is counting them, under her breath. She has been counting them all day.`, _:`Someone is counting them. Someone always is.`})}

It is how the Fourth has always done it. At every halt, all the way from Pale: count the squad, get the number, check it. Count it again. The second count is the one you believe. The bells go on, and the count goes on under them, and it is the steadiest thing on the shore.`,
      ch:[{t:'Count them the soldiers\' way: once, and again, and believe the second.', check:['wits', 17], trick:'b8_c7_toll', req:()=>!S.f.b8_c7_tollTried, fx:()=>{ S.f.b8_c7_tollTried = 1; },
            edges:id=>[id === 'vasso' && ['he counts the bells every night on the roofs, and knows each by its voice', 3], trickBy('pull') === id && ['the Lady\'s Pull: the same spin, a second roll', 2], id === 'kettle' && ['she counts everything, twice', 2], id === 'ohl' && ['the list: every name, counted and checked', 2], id === 'sgt' && ['at every halt since Pale, you have counted them', 2], id === 'ellis' && ['she counts the horses first, and then everyone', 1], id === 'brisk' && ['she counts by saluting, which is slower', -1], id === 'brannoc' && ['Falari count by shouting', -1], id === 'tuft' && ['her lips are moving with names, not numbers', -1]],
            near:{t:()=>`Yes, but the count will not come right until ${b87Nm(b87Who())} ${b87V(b87Who(), 'have', 'has')} said every number out loud, and somewhere past three hundred the numbers start sounding like names, and they go on sounding like names all night: rattled.`, fx:()=>b87Rattle(b87Who())},
            go:'b8_c7_count_ok', fail:'b8_c7_count_no'},
          {t:'Let the bells count themselves.', go:'b8_c7_fire'},
          {t:'Not now.', go:'b8_c7_fire'}]}),
    b8_c7_count_ok:()=>({sp:'The bells', scene:'b8_lakeshore', fx:()=>{ S.f.b8_c7_tollOk = 1; }, txt:
`${by({sgt:'You count', vasso:'Vasso counts', kettle:'Kettle counts', ohl:'Ohl counts', _:'{who} counts'})} them through, once, and then again, and the second count comes out where the first did not, and is the one ${by({sgt:'you believe', _:'everyone believes'})}. It is not much. It is a way of holding a number steady while everything round it rings.

"Twice," ${by({sgt:'you say', vasso:'Vasso says', kettle:'Kettle says', ohl:'Ohl says', _:'{who} says'})}. "Always twice. The second one's yours."`,
      ch:[{t:'Back to the fire.', go:'b8_c7_fire'}]}),
    b8_c7_count_no:()=>({sp:'The bells', scene:'b8_lakeshore', txt:
`The count slips. Somewhere in the forties the cracked bell on the Second Tier and the one by the lake strike together, and the number goes, and you start again, and lose it again. The bells do not mind. They will go on all night whether anyone counts them or not.`,
      ch:[{t:'Back to the fire.', go:'b8_c7_fire'}]}),

    /* the key: the roads (B8KEYS[7]) */
    b8_c7_roads:()=>({sp:'The roads', scene:'b8_lakeshore', html:contractHTML(), txt:
`The fire is low. The bells are still going, slower now. The city behind the Fourth is lighting its blue fire along the shore as it does every night, and tomorrow it will go back to how it was, and then a bit worse, as Benlo would say.

There are three roads from here, and the Fourth has always taken one of them together.

${b87Say({brisk:`"The door," Brisk says. "We kept it last night. We keep it." That is her vote.`, _:''})}${b87If('edrem', `${b8In('brisk') ? '\n\n' : ''}"Black Coral," Edrem says. "${b87Knelt() ? 'The pilgrims\' road wants keeping. Someone should keep it.' : 'The Andii hire guards who can stand in the dark. I know some who could.'}" That is his.`)}${b87Say({ohl:`\n\n"East," says Ohl, surprising everyone, himself included. "Wherever the army is. I'd like to see some of them again before they're on the list." He looks into the fire.`, kettle:`\n\n"East," says Kettle. "There's Moranth munitions going east. I've heard."`, _:''})}${b87If('vasso', `\n\nVasso looks at the city's lamps, and back at you. "I'll go where you go," he says. "I'd rather it was somewhere with roofs."`)}${b87If('tuft', `\n\nTuft is looking east over the water, at the warm thing she will not name. She has made up her mind already. It shows.`)}`,
      ch:[{t:'"We stay. The door\'s ours." Darujhistan.', fx:()=>{ S.f.b8_c7_key = 'daru'; b87L('brisk', 1); b87L('vasso', 1); b87L('ellis', 1); }, go:'b8_c7_daru_go'},
          {t:`"Back to Black Coral." ${b87Knelt() ? 'The Redeemer\'s road.' : 'The Andii\'s pay.'}`, fx:()=>{ S.f.b8_c7_key = 'coral'; b87L('edrem', 1); b87L('tuft', 1); b87L('vasso', -1); }, go:'b8_c7_coral_go'},
          {t:'"East. A ship, and the Malazans, wherever they are now."', fx:()=>{ S.f.b8_c7_key = 'east'; b87L('ohl', 1); b87L('kettle', 1); b87L('brannoc', 1); b87L('brisk', -1); }, go:'b8_c7_east_go'},
          {t:'Not yet.', go:'b8_c7_fire'}]}),
    b8_c7_daru_go:()=>({sp:'The door', scene:'b8_lakeshore', html:contractHTML(), txt:
`So the Fourth stays.

It is not a decision, quite. It is the thing the Fourth has been doing for years, said out loud on a shingle on a night the whole city is listening. The door up the street from the Phoenix. The rent jar, mended. The bar across the door at night, and the ledger, and the bread at the price it is.${b87If('vasso', `\n\nVasso lets out a breath he has been holding since Black Coral. "Roofs," he says. "Good."`)}${b87If('edrem', `\n\nEdrem looks east, once, and then at the fire. "A city with bells," he says. "I could learn that."`)}`,
      ch:[{t:'That\'s the road.', onward:true, go:()=>chapterEnd(7, 'daru')},
          {t:'Not yet.', fx:()=>{ delete S.f.b8_c7_key; }, go:'b8_c7_roads'}]}),
    b8_c7_coral_go:()=>({sp:'The east road', scene:'b8_lakeshore', html:contractHTML(), txt:
`So the Fourth goes back.

${b87Knelt() ? `To the barrow outside Black Coral, and the pilgrims' road to it, which wants keeping now more than ever, by people who know how to stand where the walkers can see them.` : `To Black Coral, under its night, where the Andii hire human guards who can stand a watch in the dark without minding it, and pay in a coin nobody else in the world has seen.`} Calder's merchant will want guards for the wagons again, east over the old Domin, and this time the Fourth will know what is in them.${b87If('edrem', `\n\nEdrem is quiet for a while. Then he says, "Thank you," which nobody in the Fourth has ever heard him say.`)}${b87If('tuft', `\n\nTuft turns her face east, to the warm thing, and smiles, properly, for the first time all day.`)}`,
      ch:[{t:'That\'s the road.', onward:true, go:()=>chapterEnd(7, 'coral')},
          {t:'Not yet.', fx:()=>{ delete S.f.b8_c7_key; }, go:'b8_c7_roads'}]}),
    b8_c7_east_go:()=>({sp:'The boats', scene:'b8_lakeshore', html:contractHTML(), txt:
`So the Fourth goes east. Down the lake on a boatman's barrels, down the river to the coast, and onto whatever ship is going toward wherever the Malazans are now, with old soldiers' papers that say time served, and a purse that will not last the voyage.

No one on the shingle can say where the army is. Somewhere east and over the sea, the boatmen say, and nobody agrees. The Fourth will find out the way it always has: by going, and counting at every halt.${b87If('vasso', `\n\nVasso looks at the lake, which to him is a very large roof with nothing on it. "I've never been on a boat," he says. "Is it like a roof?" No one tells him.`)}${b87If('brannoc', `\n\nBrannoc is grinning for the first time since the Fete began. "A ship," he says. "Finally. Something I know."`)}`,
      ch:[{t:'That\'s the road.', onward:true, go:()=>chapterEnd(7, 'east')},
          {t:'Not yet.', fx:()=>{ delete S.f.b8_c7_key; }, go:'b8_c7_roads'}]}),
  },
};

/* ============ the end of Book Eight: the Fourth (37's showFinale; Where the books meet is put in before the end page, below) ============ */
const B87FIN = {};
B87FIN.KEYS = ['daru', 'coral', 'east'];
B87FIN.key = k => B87FIN.KEYS.includes(k) ? k : B87FIN.KEYS.includes(S && S.f && S.f.b8_c7_key) ? S.f.b8_c7_key : 'daru';
B87FIN.join = ps => ps.filter(p => p && String(p).trim()).join('\n\n');
B87FIN.loy = (id, warm, cold, mid) => { const l = (S.loy && S.loy[id]) || 0; return l >= 2 ? warm : l <= -2 ? cold : mid; };
/* the Fourth's last night in a line per soldier (Ch 6's key, read with its default) */
B87FIN.night = id => { const w = id === 'sgt' ? 'you' : b87He(id); return b87Wall() ? `On the last night of the Fete ${w} stood a broken stretch of the city wall with the watch.` : `On the last night of the Fete ${w} held the Fourth's own street, and the door, while something went past the end of it.`; };
B87FIN.contract = () => { const c = b8Contract(), hi = b8S().hi ?? c; return `The Contract, at the end: ${c} of ${B8_CONMAX}, ${B8_CONW[b8ConTier()]}${hi > c ? `, and it was ${hi} at its worst` : ''}.`; };

B87FIN.ending = key => {
  const T = {daru:['The door kept', 'b8_daru_night'], coral:['Back to Black Coral', 'b8_blackcoral'], east:['A ship east', 'b8_lakeshore']}[key] || ['The door kept', 'b8_daru_night'];
  if (typeof S === 'undefined' || !S || !S.f) return {title:T[0], scene:T[1], paras:[]};
  try {
    const mates = b87Mates().map(NAME), n = b87Mates().length + 1;
    let P;
    if (key === 'daru') P = [
`The bells stop at last on the third day after, and the city goes back to how it was, and then a little worse, as Benlo said it would. The wall is mended by summer. The Gadrobi District rebuilds the dyers' row with the same vats and a better well. Masks go back into chests. There is talk in the taverns that the Malazans may come back one day; the Fourth does not join in.`,
`${mates.length ? `${b87And(mates)} ${mates.length > 1 ? 'keep' : 'keeps'} the door with you, up the street from the Phoenix.` : 'You keep the door alone, up the street from the Phoenix.'} The rent jar is mended with glue and a strip of the black band. The bar goes across the door at night. The ledger's last column is not any shorter, and the Fourth counts itself at the table every evening and gets ${numw(n)}, and checks it.`,
`There is no road onward from here. The Fourth is in Darujhistan, which is a thing old soldiers can be.`];
    else if (key === 'coral') P = [
`The Fourth takes the east road again before the bells have stopped, with Calder's merchant's wagons and this time no question about what is in them. Weeks over the old Domin, and the scarecrow fields, and the towns coming back wrong, and at the end of it a city where the sky does not do what it is told.`,
`Black Coral is not as the Fourth left it. The camp round the barrow burned, people say, on the same night the Hounds were in Darujhistan: fire from the sky, told after, and nobody the Fourth meets saw it. There is a young lord in Black Coral now. And the dark over the city is still kept, still held up like a cloak over a lamp, but it is warmer.${b8In('tuft') ? ' Tuft walks under it with her face turned up, and does not say why.' : ''}`,
`${b87Knelt() ? `The Fourth keeps the pilgrims' road to the barrow now, unpaid, standing where the walkers can see it${b8In('edrem') ? ', with Edrem at the end of the line where he always is' : b8CanRecruit('edrem') ? ', and Edrem is on it when the Fourth arrives, and moves up to make room' : ''}.` : `The Fourth takes the Andii's pay, through a clerk called Thessaly who keeps the human guards' ledger, and stands its watches in a city where noon looks like midnight and nobody minds${b8In('edrem') ? '; Edrem goes back to the pilgrims\' road on his own days, out of habit' : ''}.`} ${mates.length ? `${b87And(mates)} ${mates.length > 1 ? 'are' : 'is'} with you.` : 'You went back alone.'} The Fourth counts itself at every watch, and gets ${numw(n)}, and checks it.`,
`There is no road onward from here. The Fourth is in Black Coral, a long way from any army.`];
    else P = [
`The Fourth goes down the lake on a boatman's barrels before the bells have stopped, and down the river to the coast, and onto a big-bellied transport whose master takes anybody with coin and a paper that says time served. Behind it Darujhistan goes down into its own haze, blue fire on the water, and nobody at the rail says goodbye to it out loud.`,
`${mates.length ? `${b87And(mates)} ${mates.length > 1 ? 'are' : 'is'} at the rail with you.` : 'You are at the rail alone.'} Somewhere east and over the sea there are Malazans still in the field, the sailors say, an army or two of them, and nobody aboard agrees which or where. The Fourth will find out the way it always has: by going there, and counting at every halt, and getting ${numw(n)}, and checking it.`,
`The Fourth's road goes on, east: Book Nine, when it is written, may offer this save.`];
    P.push(B87FIN.contract());
    return {title:T[0], scene:T[1], paras:P};
  } catch(e) { return {title:T[0], scene:T[1], paras:[]}; }
};

/* a road line per soldier per road, a line from the soldier's Book Eight, and a warm closing line (the cold and middle ones are shared) */
B87FIN.T = {
  brisk:{title:'The salute', daru:'Brisk stands in the Fourth\'s door up the street from the Phoenix, and glares at the Phoenix\'s door down the street every morning, for old times\' sake. The Phoenix has never noticed.', coral:'Brisk stands at the edge of the lamplight in Black Coral with her shield on her arm, and salutes the dark every evening, two fingers, toward whoever is keeping the gate.', east:'Brisk stands at the ship\'s rail with her shield on her arm and her helm in her hand, and salutes the coast as it goes down. At the rail they let her be.',
    mem:()=>`${b87K(4) === 'hold' ? 'She held a camp\'s far edge outside Black Coral through one bad night, and does not talk about it.' : 'She stood at a store-yard gate outside Black Coral while it burned, which she did not like, and would do again.'} Death did not answer her on the last night. Someone does now, at the gate. She salutes them.`, warm:'"Sergeant," she says to you, still, like the whole of a conversation. It still is.'},
  kettle:{title:'Twice', daru:'Kettle finds a buyer for the Moranth munitions in the Gadrobi District at last, and does not sell, and counts the satchel every morning at the Fourth\'s table, twice.', coral:'Kettle counts the wagons east again, every night, and this time she knows what is in all of them. In Black Coral she counts lamps, because there is nothing else to count in the dark.', east:'Kettle counts the satchel at the ship\'s rail every morning, twice. There are Moranth munitions going east, she has heard. She means to find them.',
    mem:()=>`${b87Kelyk() === 'burned' ? 'She burned a merchant\'s kelyk in a scarecrow field on the Domin road, and counted the smoke.' : 'She counted a merchant\'s wagons east every night, and one of them had kelyk in it, and she saw the seal again at Black Coral.'} She cut a little brass bell off a Fete pole, the morning after, and rang it for every name.`, warm:'"You point," she tells you, "and I make it stop being a thing." From a sapper there is nothing warmer.'},
  tuft:{title:'Warm', daru:'Tuft reads the Deck at the Fourth\'s table for the street, for coppers she never takes. The King\'s seat comes up empty, sometimes. She holds it a moment longer than the others.', coral:'Tuft walks the streets of Black Coral under the kept dark with her face turned up, and it is warm, and she does not say why, and the Andii she passes look at her as if they knew.', east:'Tuft stands at the stern and watches the east go by, and something out there, a long way behind, stays warm all the way, like a lit room left behind with the door open.',
    mem:()=>`${S.f.b8_c3_wreck === 'tuft' ? 'She saw the wreck in the bay at Black Coral and knew it at once.' : 'She read the Deck all the way to Black Coral and back.'} The morning after the Fete she felt a cold she had carried since Pale turn warm, somewhere east, and has not put a name to it.`, warm:'"The cards say nothing about you, Sergeant," she says. "I checked." It is still the best thing she knows how to say.'},
  ohl:{title:'The list', daru:'Ohl patches the street for nothing at the Fourth\'s table and complains about it, and Soliel\'s temple asks him once a season to come and stay, and he says no, for reasons he calls theological.', coral:'Ohl sits with the sick at the edge of the pilgrims\' camp, what is left of it, with his needle and his list, and does not put any of them on it if he can help it.', east:'Ohl goes down into the ship\'s hold every day with his needle and his opinions. He wants to see some of them again, he says, the ones still in the field, before they are on the list.',
    mem:()=>`${S.f.b8_c7_toll === 'list' ? 'He read the list on the shingle the morning after, every name, and the bell rang for each.' : 'He kept the list in its oilcloth on the morning after, and did not read it aloud, and knows every name in it anyway.'} ${S.f.b8_c5_mallet ? 'There is a healer on it now he knew once, from the news at the gate.' : ''}`, warm:'"Drink the tea, Sergeant," he says. "It\'s not poison. It\'s just unpleasant." He still keeps your name off the list.'},
  sohra:{title:'The bones', daru:'Sohra finds the cattle market and the drovers again, and is happy, and still sleeps on the roof under the sky, and throws the bones for the street.', coral:'Sohra goes east with the Fourth and hates Black Coral\'s dark out loud for a good while, and then finds that the bones fall straighter in it, and stops complaining.', east:'Sohra rides the ship east as she rides everything, badly and singing, and throws the bones on the deck in a calm, and they fall toward the sunrise every time.',
    mem:()=>'Years in a city have not changed the bones. They have changed the smoke: it smells of the lake now.', warm:'"Herd-mother," she says. She means you. She does not explain it to anyone.'},
  greysword:{title:'The wolf', daru:'Dannet stands in the Fourth\'s door with the grey shield, saying *sir* to everyone, on the Grey Swords\' business and her own.', coral:'Dannet stands watches in Black Coral with the grey shield, and visits the barrow on her own days, and stands at its edge, not kneeling.', east:'Dannet takes ship east with the Fourth, the wolf on her shield turned to the sea. The Wolves go where they are needed, she says. She does not know where that is. She goes.',
    mem:()=>`${S.f.b8_c3_anvil === 'greysword' ? 'At the barrow outside Black Coral she gave back some of what a Shield Anvil once taught her.' : 'At the barrow outside Black Coral she stood at the edge, and remembered Capustan\'s wall.'}`, warm:'"Shield up, Sergeant," she says. "Not for you. For me. I like to know where it is."'},
  ellis:{title:'Counted', daru:'Ellis takes the post across the street from the Fourth\'s door, which is not the same as standing in it, and counts everyone who goes in and comes out, and the numbers always match.', coral:'Ellis scouts the old Domin road for the wagons, east and back, and counts the scarecrow fields, and they are fewer every time.', east:'Ellis counts every soul on the ship the first morning, and every boat in every harbour after, and comes back every time.',
    mem:()=>`${b87K(5) === 'wary' ? 'She found the Guild\'s road knives on the Lamatath before they found the Fourth.' : 'She counted the Lamatath\'s grass on the road back, and the torches far off at dusk.'}`, warm:'She counts you first now, at every halt, before the horses. She has never said so. Kettle told you.'},
  vell:{title:'Sky', daru:'Vell goes back up on the Gadrobi roofs, once a week, to look, and comes down again, and says the roofs are smaller than he remembered.', coral:'Vell finds there are no roofs worth the name in Black Coral, only walls, and goes up them anyway, and says the dark is the best sky he has ever had.', east:'Vell goes up the ship\'s rigging the first day, because a mast is a roof that moves, and the crew lets him.',
    mem:()=>`${S.f.b8_c1_vell === 'cut' ? 'He cut the Guild\'s owed knot out of a dead knife\'s cord in the winter, and burned it.' : S.f.b8_c1_vell === 'kept' ? 'He keeps the Guild\'s owed knot in his coat, cut from a dead knife\'s cord in the winter.' : 'The Guild wrote something against his name once. It has not come to collect.'}`, warm:'"Off is the hard part," he says, of the Fourth. "The sergeant\'s good at off."'},
  brannoc:{title:'Loud', daru:'Brannoc finds the one tavern in the Gadrobi District that lets him sing, and makes it his, and the street learns the Falari words whether it wants to or not.', coral:'Brannoc goes back to Black Coral and complains, loudly, that it is always night, and tells the Andii about a Falari harbour where it is always noon.', east:'Brannoc is on a ship at last, and grinning, and tells the crew how to sail it, and some of them listen.',
    mem:()=>'He stopped talking the morning the bells rang, which for Brannoc is a eulogy.', warm:'"You\'re all right," he tells you, "for a sergeant." From a Falari it is a medal.'},
  ressa:{title:'Not the fever', daru:'Ressa works the dyers\' vats in the Gadrobi District, which she knows, and sits with the sick in the street at night, which she also knows.', coral:'Ressa sits with the sick at the edge of the pilgrims\' camp, and does not catch anything, and keeps it to herself.', east:'Ressa takes ship east with the Fourth, away from every city she has known, and sits with the sick in the hold, and does not catch anything.',
    mem:()=>'The fever took her street and left her. She does not ask it why any more. She has the Fourth\'s door now, or its ship.', warm:'"You came back for people," she tells you. "No one came back for my street." That is all she says.'},
  vasso:{title:'The roofs', daru:'Vasso stays in his city, with the Fourth\'s door to come down to, and goes up on the roofs at night to count the bells, and the Guild leaves him be, for now.', coral:'Vasso goes east with the Fourth, out of the Guild\'s reach and away from every roof he knows, and finds that Black Coral has bells after all, very old ones, and nobody ringing them.', east:'Vasso stands at the ship\'s rail and looks at the sea, which to him is a very large roof with nothing on it, and asks if it is like a roof, and nobody tells him.',
    mem:()=>`${b87Hunt() ? 'He came to the Fourth\'s step the winter the paper came, and asked, and stayed.' : 'He came to the Fourth on the road east, the winter the paper came, and stayed.'} ${S.f.b8_c6_wayOut === 'word' ? 'On the last night he gave his word to a journeyman he knew, for the Fourth.' : ''} Out of the Guild alive, which nobody does. He is the first. He would like it noted.`, warm:'"I asked," he tells you. "That is why I am standing in your door." He still is.'},
  edrem:{title:'The road', daru:'Edrem stays in Darujhistan with the Fourth, and learns the bells, and stands at the corner by the Fourth\'s door where the street can see him, which is what he does.', coral:'Edrem goes back to the pilgrims\' road with the Fourth, and stands where the walkers can see him, and is not alone on it.', east:'Edrem takes ship east with the Fourth, away from the road for the first time in years, and stands at the end of the line on the deck, where a heavy goes.',
    mem:()=>`${b87Knelt() ? 'He watched the Fourth lay something on the barrow, and did not kneel himself. He never will.' : 'He stood witness at the barrow\'s edge with the Fourth, which is all he ever does, and enough.'} He wore the grey once. Not now.`, warm:'"Somewhere a man can stop guarding a road," he says. "I thought there was not one." He looks at the Fourth. "There is."'},
};
/* a page for a squadmate of the Fourth who walks to the end */
B87FIN.fate = (id, key) => {
  key = B87FIN.key(key); if (id === 'sgt') return B87FIN.sgt(key);
  const t = B87FIN.T[id], nm = NAME(id);
  const tr = Object.entries(S.tricks || {}).filter(([k, v]) => v.who === id && TRICKS[k] && /^b8_/.test(k)).map(([k]) => `${b87Cap(b87He(id))} carries a trick out of Book Eight: ${TRICKS[k].name}.`)[0] || '';
  if (!t) return {title:TPL[id] ? TPL[id].role : '', txt:B87FIN.join([TPL[id] ? TPL[id].quest : '', B87FIN.night(id), `${nm} ${key === 'east' ? 'takes ship east with the Fourth' : key === 'coral' ? 'goes back to Black Coral with the Fourth' : 'stays in Darujhistan with the Fourth'}.`])};
  return {title:t.title, txt:B87FIN.join([t[key], `${typeof t.mem === 'function' ? t.mem() : t.mem} ${B87FIN.night(id)}`.trim(), tr, B87FIN.loy(id, t.warm, `${nm} keeps a little apart from you now, and you both know why.`, `${nm} walks with you as ${b87He(id)} has since the winter the paper came.`)])};
};
/* a page for someone of the Fourth not walking at the end: the fallen (this book's, and before it), a recruit waiting or sent away, an old
   soldier waiting at the Fourth's door */
B87FIN.gone = (id, key) => {
  key = B87FIN.key(key);
  if (S.dead && S.dead[id]) { const d = S.dead[id];
    if (!d.from && d.ch === 6) return {title:'Fallen', txt:B87FIN.join([
      `${NAME(id)} fell on the last night of the Fete, ${b87Wall() ? 'on a broken stretch of the city wall' : 'in the Gadrobi streets by the Fourth\'s own door'}, to the Guild's knives, while the moon went to pieces overhead and Death did not answer anybody.`,
      `The Fourth carried ${b87Him(id)} down to the lake at first light. The next morning every bell in the city rang, for somebody else, and the Fourth let them ring for ${b87Him(id)} too.`,
      `On the shingle that evening a little brass bell rang once for ${b87Him(id)}. Someone is holding the gate now. The Fourth hopes ${b87He(id)} knew the face.`])};
    if (!d.from) return {title:'Fallen', txt:B87FIN.join([
      `${NAME(id)} fell${d.where ? ` at ${d.where}` : ''}, ${CHAPTERS[d.ch] ? `in the chapter the Fourth calls ${CHAPTERS[d.ch].title}` : 'this year'}, and did not come back to Darujhistan.`,
      `On the shingle by the lake, the morning after the Fete, a little brass bell rang once for ${b87Him(id)}. The Fourth carried the name the rest of the way.`])};
    return {title:'Fallen', txt:B87FIN.join([`${NAME(id)} fell before this book${d.where ? `, at ${d.where}` : ''}, and never saw Darujhistan's last Fete.`, `The Fourth rang the bell for ${b87Him(id)} anyway, on the shingle, with the old names. It always will.`])}; }
  const done = B8_DONE[id] ? S.f[B8_DONE[id]] : null, waits = (S.camp || []).includes(id) || done === 2;
  if (id === 'vasso') {
    if (waits) return {label:'Waiting', title:'The step', txt:`Vasso kept the Fourth's step while six of them walked, and the door when there was a door to keep, and the street when there was not. ${key === 'daru' ? 'He is still on it, most mornings, listening to the bells.' : key === 'coral' ? 'When the Fourth went east again he stayed, and kept the door for it, in case.' : 'When the Fourth went down the lake he walked it to the boat, and stood on the shingle until it was out of sight, and then went up onto the roofs to watch it longer.'}`};
    if (done === 0) return {label:'Sent away', title:'The roofs', txt:'Vasso went back up onto the roofs when the Fourth would not take him, and the Guild found a use for a journeyman who had read the paper twice. On the morning the bells rang he was on a roof over the Gadrobi District, counting them. He knows every one by its voice.'};
    return null; }
  if (id === 'edrem') {
    if (waits) return {label:'Waiting', title:'The pilgrims\' road', txt:`Edrem kept the pilgrims' road outside Black Coral while six of the Fourth walked, standing where the walkers could see him. ${key === 'coral' ? 'When the Fourth came back east he was on it, and moved up to make room.' : 'Word of the bells reached the road weeks after. He listened to it, and went on standing.'}`};
    if (done === 0) return {label:'Sent away', title:'The pilgrims\' road', txt:'Edrem went back to his road when the Fourth would not take him, and stood on it, and kept the worst of it off the people walking. No one paid him. That was the point of it.'};
    return null; }
  if ((S.camp || []).includes(id)) return {label:'Waiting', title:'At the Fourth\'s door', txt:`${NAME(id)} waited at the Fourth's door while six of them walked, and kept it, and was there when they came home from the lake. ${key === 'daru' ? `${b87Cap(b87He(id))} keeps it still.` : key === 'coral' ? `${b87Cap(b87He(id))} went east with them in the end, at the back of the wagons.` : `${b87Cap(b87He(id))} went down the lake with them in the end, and took ship.`}`};
  return null;
};
/* the Fourth's sergeant */
B87FIN.sgt = key => {
  const f = S.f, fell = b87Book();
  return {title:'Time served', txt:B87FIN.join([
    key === 'daru' ? 'You keep a door in Darujhistan, up the street from the Phoenix, which is a thing a sergeant can do in any city, and a ledger nobody asked for, and the city\'s blue fire comes up every night over the lake as if nothing had happened anywhere.' :
    key === 'coral' ? 'You went back to Black Coral with what is left of the Fourth, and stand watches in a dark that is warmer than it was, and keep the ledger by lamplight at noon. When the pilgrims ask what Darujhistan was like, you tell them about bells.' :
    'You took ship east from the coast with what is left of the Fourth, time served, toward an army that may or may not want you back. At night, at the rail, you count, out of habit, and check it.',
    `${B87FIN.night('sgt')} ${fell.length ? `It cost ${b87Names(fell)}.` : 'Everybody who walked into this book with you walked out of it.'}`,
    f.b8_c7_guardian ? 'At the back of a crowd behind an ox cart, a soldier in old grey kit counted the Fourth and said a thing you heard once, at a fire outside Pale, the first night it was ever said to the Fourth. You have not told anyone. You would not know how.' : 'Someone is holding the gate now. You salute it, some evenings, when nobody is looking.',
    trickBy('b8_c7_toll') === 'sgt' ? 'You count the bells twice, now. The second count is yours.' : '',
    B87FIN.contract(),
    f.sgtScar ? 'There is a scar you do not look at.' : ''])};
};

/* where the books meet */
B87FIN.meet = () => [
`Book Eight ran beside *Toll the Hounds*, years after Book Three, in Darujhistan and Black Coral: the city of Book One and the city that was Book Three's Coral. The Fourth came into it from Book Three's road to Darujhistan, or its stand-down, or back across the ocean from Book Six; out of the army, and not out of reach.`,
`The Guild's paper on the Fourth was a second paper, never the one on the K'rul's Malazans, and who paid it is not known. The Fourth walked at the back of everything the novel puts in front: the Fete, the night of the Hounds, the morning after. It never saw the street where the bells began, and never needed to.`,
`The east road goes on: a ship toward the Malazans abroad. Whatever comes after, for whoever went, it starts on the shingle by the lake.`];

/* the coda: the canon at the headline, the Fete echoed, the Fourth's part, the bell */
B87FIN.coda = key => { const fell = b87Book();
  return [
`On the last night of the Gedderone Fete the wall of Darujhistan broke, the moon went to pieces over the city and its pieces fell east, and Death did not answer anybody who called. In the morning every bell in the city rang for the Son of Darkness, dead in it, and Caladan Brood walked him out on an ox cart to a barrow in the fields with the whole city behind him, and sealed it, and nobody at the back saw that part. The dead have new keepers at the gate.`,
`The last Fete the Fourth saw in this city ended with the sky on fire over an estate garden, and the city put its masks away in the morning and pretended nothing had happened. This one ended with bells, and the city did not pretend.`,
`The Fourth was there. It held ${b87Wall() ? 'a stretch of the broken wall' : 'its own street and its own door'} on the last night, and walked at the very back of the crowd in the morning. ${fell.length ? `${b87Names(fell)} did not walk out of the book.` : 'Every one of the Fourth who walked into this book walked out of it.'} That is the Fourth's part. It is small. It is the only part anybody will tell right.`,
`On the shingle by the lake a little brass bell rang once for every soldier. ${b87Mates().length ? 'The Fourth counts itself, and gets the number, and checks it.' : 'The sergeant counts, and gets one, and checks it.'}`]; };

B8CH7.finale = {
  ids:()=>['brisk', 'kettle', 'tuft', 'ohl', 'sohra', 'greysword', 'ellis', 'vell', 'brannoc', 'ressa', 'vasso', 'edrem'],
  labels:{epi:'Epilogue', squad:'The Fourth', fallen:'The fallen', away:'Waiting', sgtRole:'Sergeant · Fourth Squad, once of the Seventh Company · time served', road:'The Fourth\'s road', prologue:false,
    list:()=>['The roll', `${Object.keys((S && S.dead) || {}).length} names, and the old ones`], noDead:'None of the Fourth. Every one of them walked out of this book.', paper:false,
    endline:'The End of Book Eight: <em>Time Served</em>',
    credit:'The Malazan world was created by Steven Erikson and Ian C. Esslemont, and it and its canon characters belong to them. With thanks to Steven Erikson for Toll the Hounds, Darujhistan\'s last night of the Fete and the long walk behind the cart, and to Ian C. Esslemont for the world they built together; the Fourth only walked at the back of it.'},
  endings:{ get daru(){ return B87FIN.ending('daru'); }, get coral(){ return B87FIN.ending('coral'); }, get east(){ return B87FIN.ending('east'); } },
  fate:(id, key)=>B87FIN.fate(id, key),
  gone:(id, key)=>B87FIN.gone(id, key),
  coda:(key)=>B87FIN.coda(key) };

/* ---- Where the books meet, put in before the end page (Book Eight only, guarded): drawn in 37's shape, the same buttons, so the swipe,
   the keys and the bot all work. Wraps whatever finPages and showFinale are by now (Book Seven's wrappers pass through outside 'rg'). ---- */
{ const _fp = finPages, _sf = showFinale;
  finPages = function(){ const P = _fp(); if (!b8On()) return P; P.splice(P.length - 1, 0, {k:'b87meet'}); return P; };
  showFinale = function(i = 0){ if (!b8On()) return _sf(i);
    const P = finPages(); i = clamp(i | 0, 0, P.length - 1); const pg = P[i]; if (pg.k !== 'b87meet') return _sf(i);
    S.scene = 'finale'; S.finPage = i; S.node = null; save();
    view = 'finale'; $('#sheet').hidden = true; B = null; titleAnim = null; finAnim = null; AUDIO.setScene('end');
    G.sceneKind = 'b8_lakeshore';
    const body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">Where the books meet</div><h1 class="fin-title">Darujhistan, again</h1><div class="narr">${B87FIN.meet().map(p => fmt(p)).join('')}</div>${typeof worldSVG === 'function' ? `<div class="gloss meet">${(() => { try { return worldSVG('tth'); } catch(e) { return ''; } })()}</div>` : ''}`;
    toTop(); $('#app').innerHTML = `<div class="fin" id="fin">${body}
    <div class="fin-nav"><button class="btn" id="fBack">Back</button><span class="fin-pg">${i + 1} / ${P.length}</span><button class="btn primary" id="fNext">Next</button></div></div>`;
    window.scrollTo(0, 0);
    $('#fBack').onclick = () => { AUDIO.play('click'); finGo(-1); };
    $('#fNext').onclick = () => { AUDIO.play('click'); finGo(1); };
    let sx = null, sy = null; const el = $('#fin'); el.ontouchstart = e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    el.ontouchend = e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null; if (Math.abs(dx) > 70 && Math.abs(dy) < 50) { AUDIO.play('flip'); finGo(dx < 0 ? 1 : -1); } }; }; }

/* the onward road: a finished Book Eight save on the 'east' road is the one Book Nine may import (no import is written yet) */
const b87Onward = s => !!(s && s.book === 'tth' && s.chapters && s.chapters[7] === 'east');
