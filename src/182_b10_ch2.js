/* ============ Book Ten, Chapter 2: The Parting (the Letherii) ============ */
/* The Sixth Company, in the Commander's brigades, on the day the army splits (tcg-canon chapter table, Ch 2; R13 S1; WT ch 10). The brigades
   marched the night through behind the foreigners, along the glass's edge to where the road south bends away from it; at grey light the
   train halted on a low rise above the edge, and below it the foreigners' army lies up under its cloaks. At dusk the one goes out onto the
   glass and the other turns south. Then the first night south, and later on the road the lizard-folk join the column (seen, "the big ones";
   "Che'Malle" once, from Ennic; two foreign sergeants riding with them, far off).
   Phase 1 (S.f.b10_c2_ph), afternoon on the rise: the horse-lines (the first halt: Tirren the farrier asks for a place, b10Join('tirren');
   the reading's offer); Ennic's word; the drill against a file of the Ninth (b10_c2_spar, survive 4, the Letherii's first fight; the train-
   guard's spear); Yelt and the water ledger (the trick, The Water Ledger); Orla (the tally); Saffa (the one line of the Third); the tile-woman
   at a water wagon's tailboard (the reading, B10READ[2]); the overlook; Bolkando deserters at the water wagons ('escort'; b10_c2_deserters,
   main, stage 2; the dust-coat). Then the key from Ennic, S.f.b10_c2_key: 'watch' (go to the edge and watch the foreigners walk into the
   glass until they are gone; b10Witness(1, 'saw them go'), Tobet +1, S.f.b10_c2_watched) or 'count' (stay with Yelt and count the water for
   the long road; Brennet and Tirren +1, S.f.b10_c2_counted). Phase 2, dusk: the key's work. Phase 3, the first night south: the train's
   fire and the Witness beat (c2: "Why are they going?"); half-wild dogs at a dead horse (b10_c2_dogs, optional). Phase 4 ('escort'), the road
   south by day: the big ones come in along the column; the horse-lines held or not; the end.
   The 'adjunct' road (a few Letherii who stay with the foreigners; never beside Henar): the day on the rise is the same (no deserters); at
   dusk 'watch' is the brigades going south and 'count' is the Sixth's share counted onto its carts; phase 3 is the first halt on the glass,
   where the thirst is given once and stragglers who will not cross come for the Sixth's water (b10_c2_deserters, the stragglers' version,
   fought down, never killed in words); no phase 4.
   Never: Brys meeting the lizard-folk, the two foreign sergeants close or named, their dog-handler or the lizard-folk's speaker, Brys's tent
   and the King's letter, the Grey Helms' councils, their mortal commander, the Bolkando queen and her daughter. Notes: docs/tcg-ch2-notes.md. */
/* FOR THE ARTIST (182b): names this file uses.
   Items: ART['item/b10_c2_spear'], ['item/b10_c2_coat'], ['item/b10_c2_tally'].
   Figures: tirren (180's simple sprite, replaced in 182b), b5_c1_ennic (Ennic), b5_c1_clerk (Yelt), b9_c2_orla, b9_c2_saffa (162b's),
   b5_c1_tilewoman, b5_letherii (the Ninth's sergeant, the sparring file, the train's sentry), b6_bandit (the Bolkando deserters, the
   engine's), b2soldier (the stragglers, the engine's).
   Backdrops: b10_train, b10_south (180's, yours), and two this file adds: b10_c2_dusk (the rise at dusk: the train's wagons, and below the
   foreigners' column going out onto the glass, or on 'adjunct' the brigades going away south over the rise) and b10_c2_halt (the first
   night's halt south: wagons drawn up, the horse-lines, a farrier's lamp). The 'adjunct' halt uses 180's b10_glass_night.
   Ground (TILEX): b10_c2_ground (on Book Nine's road ground, 163b: 'W' a water wagon with a lamp at its tailboard, 'B' water barrels lashed
   on a flat wagon, 'c' Orla's water-cart, 'X' the rise's edge (the overlook), 'k' a dead horse; on the 'adjunct' halt the open ground is
   the glass). Battle 't' is low cover. */

/* ---- small helpers (b102: Book Ten, Chapter Two) ---- */
const b102L = (id, n) => { if (b10In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b102Here = id => b10In(id) || (!!(S.camp || []).includes(id) && !(S.dead && S.dead[id]));
const b102Lc = (id, n) => { if (b102Here(id) && S.loy && S.loy[id] != null) loy(id, n); }; // walking, or with the train
const b102Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b10In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b102If = (id, s) => b10In(id) ? (typeof s === 'function' ? s() : s) : '';
const b102Who = () => (ROLL() && ROLL().who) || 'sgt';
const b102Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b102Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b102V = (id, you, they) => id === 'sgt' ? you : they;
const b102And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b102Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the afternoon on the rise, 2 dusk (the key's work), 3 the first night south (or the first halt on the glass), 4 the road
   south by day ('escort' only) */
const b102Ph = () => S.f.b10_c2_ph || 1;
const b102Key = () => S.f.b10_c2_key || null;
const b102Watch = () => S.f.b10_c2_key === 'watch';
const b102Adj = () => b10LRoad() === 'adjunct';
const b102Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b10In(id));
const b102TirrenSettled = () => S.f.b10_tirrenDone != null;
const b102KeyReady = () => !!S.f.b10_c2_orders && !!S.f.b10_c2_sparDone && b102TirrenSettled() && (b102Adj() || !!S.f.b10_c2_desDone);
const b102DuskDone = () => b102Watch() ? !!S.f.b10_c2_watchDone : !!S.f.b10_c2_countDone;
const b102HaltDone = () => !b102Adj() || !!S.f.b10_c2_desDone;
const b102Ennic = () => B5_FINADD.short;
/* the one line of the other squad a chapter (camp talk; b10OtherName is not used): the Third's Chapter 1 key, or on its 'south' road the
   drill-sergeants Yelt was promised */
const b102Rumour = () => b10TRoad() === 'south'
  ? (b102Adj() ? 'Yelt was promised drill-sergeants for the train, and got one squad of foreign heavies at dusk, and says he was promised more. They go south with the brigades. You go east with theirs. The army has a sense of humour.'
    : 'Yelt was promised drill-sergeants for the train, and got one squad of foreign heavies at dusk, and says he was promised more. They are drilling the Twelfth at the far end of the train. One of them asked me for salt. Polite.')
  : (b10Key(1) || 'names') === 'water' ? 'Word at the pots is a squad of the foreigners\' heavies stood in a chain at their wells all night before they marched, and every skin they own went east full.'
  : 'Word at the pots is a squad of the foreigners\' heavies stood their burial lines all night before they marched, and said every name over the last trench.';

/* ---- The Water Ledger: Yelt's way of counting a barrel twice and believing the second count. It copies the Toll Count (Book Eight's
   b8_c7_toll, itself the Lady's Pull): chapter charges, twice a chapter (one more from level 5): after a failed check, count it again and
   roll again; or before an attack, roll twice and keep the better. The ledger wants balancing after: the squad's next check is −2. Not
   sorcery. ---- */
Object.assign(TRICKS, {
  b10_c2_ledger:{name:'The Water Ledger', ch:2, use:'chapter', n:2, ab:'t_b10_c2_ledger', where:'Yelt\'s tailboard, on the rise above the glass, the day the army split',
    lore:'Yelt counts every barrel twice. The first count is for the book. The second is for the barrel, and the second, he says, is the one that is true, because by then you know what you are looking at. Clerks laugh at him for it. Clerks have never had to make one barrel last a company a day on a road nobody has mapped. The squad learned to count his way, and found that a thing looked at twice is a different thing.',
    get fx(){ return `${trickTimes('b10_c2_ledger')} a chapter: count it again after a failed check and roll it again, or before an attack and roll twice, keeping the better. The ledger wants balancing after: the squad's next check is −2. One more use from level 5. Not sorcery. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b10_c2_ledger:{name:TRICKS.b10_c2_ledger.name, trick:'b10_c2_ledger', self:true, free:true, desc:()=>'Count it again: this turn\'s attack rolls twice and keeps the better. The ledger wants balancing: the squad\'s next check is −2. It does not use the action (one free trick a turn).',
    ok:u=>!B.acted && u.luckyTurn !== B.turn,
    run(u){ u.luckyTurn = B.turn; S.push = 1; AUDIO.play('coin'); float(u, 'counted twice', '#c8c0a8'); sparks(u.x, u.y, 10, '#c8c0a8', .4); blog(`${u.name} counts it once for the book and again for the barrel, Yelt's way, and believes the second.`); }},
});
/* The check half of the Pull lives in 16's rollDice, which asks for the trick 'pull' by name (Books Seven and Eight answered the same need
   the same way, 127 and 147). In Book Ten only, when the squad carries the Water Ledger and not the Pull, 'pull' is answered by the Ledger:
   its charges, its spending, its words. Guarded (b10On); other books, and a squad with the real Pull, are untouched. Reported to the lead. */
{ const _tl = trickLeft, _sp = spendTrick, _rd = rollDice, _nt = note, _bl = blog;
  const ledger = k => b10On() && k === 'pull' && S && S.tricks && S.tricks.b10_c2_ledger && !S.tricks.pull;
  trickLeft = function(k){ return _tl(ledger(k) ? 'b10_c2_ledger' : k); };
  spendTrick = function(k){ if (!ledger(k)) return _sp(k); _sp('b10_c2_ledger'); S.tricks.pull = {who:S.tricks.b10_c2_ledger.who, ch:2, b102:1}; }; // 16 names the counter through trickBy('pull') next: lend it the bearer for that one line
  rollDice = function(r, done, spun){ if (S && S.tricks && S.tricks.pull && S.tricks.pull.b102) delete S.tricks.pull; return _rd(r, done, spun); };
  note = function(t, c){ if (b10On() && typeof t === 'string' && /spins the coin\. The Lady pulls/.test(t)) t = t.replace(/spins the coin\. The Lady pulls; the Lord will push back on the next check \(−2\)\./, 'counts it again, Yelt\'s way, and believes the second count. The ledger wants balancing on the next check (−2).'); return _nt(t, c); };
  blog = function(m){ if (b10On() && typeof m === 'string') m = m.replace('<em>The Lady pulls.</em>', '<em>Counted twice.</em>'); return _bl(m); };
  if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') { const mo = new MutationObserver(() => { if (!b10On() || !(S && S.tricks && S.tricks.b10_c2_ledger && !S.tricks.pull)) return; const b = document.getElementById('dPull'); if (b && !b.dataset.b102) { b.dataset.b102 = 1; b.textContent = `Count it again · The Water Ledger (${trickLeft('pull')} left)`; } });
    const go = () => { const sh = document.getElementById('sheet'); if (sh) mo.observe(sh, {childList:true, subtree:true}); }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go(); } }

/* ---- the reading at a water wagon's tailboard (B10READ[2], 180c's worked example, kept for the evening; by day the wagon stands on the
   rise in the heat) ---- */
{ const eve = B10READ[2];
  B10READ[2] = {where:eve.where, back:eve.back, backT:eve.backT, say:eve.say,
    get scene(){ const ph = S && S.f ? b102Ph() : 1; return ph >= 3 ? (b102Adj() ? 'b10_glass_night' : 'b10_c2_halt') : ph === 2 ? 'b10_c2_dusk' : 'b10_train'; },
    get set(){ const ph = S && S.f ? b102Ph() : 1;
      if (ph >= 2) return b102Adj() ? 'Night on the glass on the day the army split, the brigades gone south over the rise, and the few Letherii who stayed walking at the tail of the foreigners\' column.' : eve.set;
      return 'Afternoon on the rise above the glass\'s edge, the train halted since grey light, the horses\' heads down, and below, the foreigners\' column lying up at the edge of the glass under its cloaks.'; }}; }

/* ---- borrowed pictures until the artist's file (182b) replaces them: two scenes, the ground, three items ---- */
{ const like = {b10_c2_dusk:'b10_train', b10_c2_halt:'b10_south_night'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b10_c2_ground ??= (...a) => (TILEX.b9_c3_road || (() => {}))(...a);
if (typeof ART !== 'undefined') [['b10_c2_spear', 'b9_c2_escortspear'], ['b10_c2_coat', 'b9_c2_carterscoat'], ['b10_c2_tally', 'b9_c2_tallystick']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* the train's scene (180's) says where it is: the glass's edge on this chapter's first two phases, south of the glass otherwise */
{ const sc = SCENES.b10_train, loc = sc && sc.loc; if (sc) Object.defineProperty(sc, 'loc', {configurable:true, enumerable:true,
    get(){ return S && S.book === 'tcg' && S.chapter === 2 && (S.f.b10_c2_ph || 1) <= 2 ? 'The glass\'s edge' : loc; }}); }

/* ---- the words this chapter adds to Book Ten's glossary ---- */
GLOSSX.tcg.push(
  [2, 'The water ledger', 'Yelt\'s book of the brigade\'s water: every barrel and skin, by wagon, counted twice. The first count is for the book, he says, and the second for the barrel.', ()=>!!(S && S.f && S.f.b10_c2_yelt)],
  [2, 'The big ones', 'What the train calls the lizard-folk who came in along the column on the road south: taller than a horse, quiet, walking. The officers have another word for them, and use it once.', ()=>!!(S && S.f && S.f.b10_c2_joined)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.tcg = ROSTER_FIRES.tcg || {}; ROSTER_FIRES.tcg[2] = ['b10_c2_fire'];

/* ---- the squad at the fire: a line by day and a line by night for every soldier the Letherii can field (g: the night is on the glass) ---- */
const B102TALK = {
  tobet:[()=>`Tobet is sitting on a barrel with his tally-stick across his knees, looking down the rise at the foreigners lying up under their cloaks. "They don't move," he says. "Whole army, lying in the sun like washing." He counts something on the stick. "I'd move. If it was me. Anywhere."`,
         g=>`Tobet has his bow unstrung across his knees. "${g ? 'Their sergeants walk the line every hour and count us with theirs,' : 'Ennic counted the company twice at the halt,'}" he says. "Got the same answer both times." He sounds as if that were a kind of luck.`],
  thegg:[()=>`Thegg is standing in the only shade on the rise, which is his own. "The Tarthenal had a word for a road like this one," he says. "It meant <em>the long way, but you are still going</em>." He thinks. "My mother used it about marriage."`,
         g=>`Thegg is talking low to his mother's dead, in her tongue, the way he does at night. He stops when you sit down. "I told them ${g ? 'about the glass' : 'about the foreigners walking out onto the glass'}," he says. "They had nothing to say about it either."`],
  perrit:[()=>`Perrit has three tiles out on her knee, face down. She turns them over one at a time and turns them back. "The Holds are very far away out here," she says. "I keep reaching. It is like putting a hand down a well and finding the rope longer than you thought."`,
          g=>`Perrit has her tiles in the calfskin and is not taking them out. "${g ? 'The glass is very quiet,' : 'It is very quiet tonight,'}" she says. "In the Holds, I mean. The tiles feel the same as ever. I am being a clerk about it and writing that down."`],
  ammet:[()=>`Ammet is sharpening a needle in the shade of a wagon. "Feet," she says, before you can ask. "All afternoon. The foreigners have their own surgeons. Ours have the feet." She tests the point. "Still. Feet I can do."`,
          g=>`Ammet is doing feet by the light of ${g ? 'the stars, which out here is nearly enough' : 'the fire'}. "Hold still," she says, to a boot. "The road is long. Feet first. Then everything else."`],
  ilsa:[()=>`Ilsa has a page of somebody's orders folded in her hand and is not reading it, which for Ilsa is restraint. "I know what the Commander told the brigades," she says. "I do not know what the foreigners' Adjunct told hers. I find I want to, very badly." She puts it away. "Old habit."`,
        g=>`Ilsa is writing in a small book by the fire, very small, to save the pages. "A list," she says. "${g ? 'Of who stayed with the foreigners.' : 'Of who turned south.'} Somebody should have one that isn't a file." She shows nobody.`],
  sorvan:[()=>`Sorvan has been down the horse-lines twice and come back angry both times. "Half of them won't see the coast," he says. "The farrier knows it. The officers don't." He keeps his scale blue with a rag while he talks. "Bluerose would have left the weak ones at the river."`,
          g=>`Sorvan is sitting where he can see the ${g ? 'last of the Sixth\'s horses on their picket, heads low on the glass' : 'horse-lines'}. "They're tired," he says. "Not finished. Tired." He looks at you. "So are we. Same thing."`],
  ruuk:[()=>`Ruuk is lying on his belly at the edge of the rise, looking down at the glass. "No birds," he says, when you sit. "None. I have been looking all day." He considers it. "Birds know things. I would like to know what they know about that."`,
        g=>`Ruuk is standing up eating, as usual, and looking ${g ? 'east, where the glass goes on' : 'back north, where the glass is'}. "My grandmother said every road ends," he says. "She never walked one this long. I will tell her."`],
  brune:[()=>`Brune has her feet bare on the hot ground, which is as near to water as the rise has. "The Shore is very far," she says. "Further every day." She does not sound unhappy. "It will be there. It is in no hurry. Neither am I."`,
         g=>`Brune has said the evening words to the Shore, facing west, with her feet in nothing. "It does not answer," she says. "It is busy. I think something is holding it." She shrugs. "I asked anyway. Politely."`],
  pessa:[()=>`Pessa is sitting on the boathook's shaft with her back to the glass. "I've looked," she says. "Once. That's enough. On the canal we'd call that a dry lock, and nobody sane poles into a dry lock." She jerks a thumb over her shoulder. "They're going to."`,
         g=>`Pessa has found the flattest piece of ground at the halt before anybody else looked, and is lying on it. "${g ? 'Glass is hard but it\'s level,' : 'Flat,'}" she says. "I'll give it that. Wake me when we're somewhere."`],
  brennet:[()=>`Brennet has been under three wagons since the halt and has grease to the elbows. "Axles are fine," he says. "Wheels are fine. It's the horses." He wipes his hands, which makes them worse. "Wagons don't get thirsty. That's the whole of what I like about wagons."`,
           g=>`Brennet is sitting a little back from the fire on a wagon-tongue, where he can see the train. "${g ? 'Our carts sound wrong on the glass,' : 'Lost a wheel on the march,'}" he says. "${g ? 'Hollow. I don\'t like it.' : 'Not ours. I fixed it anyway.'}"`],
  kaedra:[()=>`Kaedra has been out along the edge of the glass on foot, and come back with dust to the knee. "There's nothing on it," she says. "No spoor. No dung. No bones, even. Bones would be something." She sits. "My mother's people would say go round. They'd be right."`,
          g=>`Kaedra will not sleep under canvas and has her blanket out in the open. "${g ? 'Stars above and stars below,' : 'Good sky,'}" she says. "${g ? 'I keep thinking I\'ll fall up.' : 'You can see a long way south. Nothing to see. I keep looking.'}"`],
  tirren:[()=>`Tirren is sitting with her back to a wagon wheel and a horse's hoof in her lap, rasping it. "This one's called Plum," she says. "She'll go another hundred leagues if I keep her feet." She does not look up. "The officers think horses run on oats. They run on feet."`,
          g=>`Tirren has been down the horse-lines with a lamp and come back. She takes a stub of chalk out of her apron and makes a mark on the inside of it, low down, where the others are. "${g ? 'One more on the glass' : 'One on the march'}," she says. That is all she says about it.`],
};

const B10CH2 = {
  title:B10CH[2], number:'Two',
  intro:{loc:'The glass\'s edge', sub:'The brigades\' train · the day the army splits', scene:'b10_train', cap:'Wagons halted on a low rise in the afternoon heat, water barrels lashed under canvas, horses on their picket with their heads down, and beyond the rise the glass going away pale to the edge of the world.',
    paras:[
()=>b102Adj() ? `The brigades marched the night through behind the foreigners, along the edge of the glass, to the place where the Commander's road bends away from it south. At grey light the train halted on a low rise above the edge. The brigades go south from here. The Sixth does not: a few Letherii are going on east with the foreigners, and the Sixth asked to be among them, and nobody said no.` :
`The brigades marched the night through behind the foreigners, along the edge of the glass, to the place where the Commander's road bends away from it south. At grey light the train halted on a low rise above the edge, and it is still there, in the heat, with the horses' heads down.`,
()=>{ const v = b102Mates().map(id => NAME(id)), gone = Object.keys(S.dead || {}).filter(id => TPL[id]), rl = b10RationLine();
  return `You are Sergeant {sgt}, Sixth Company, and the squad is ${v.length ? `${b102And(v)}, and you` : 'you, and a paybook'}.${gone.length ? ' The rest are names in the company roll with a line through them.' : ''} The Sixth stood its stretch the day the short-tails came, and walked off it.${rl ? ' ' + rl : ''}`; },
`Below the rise, north and east, the foreigners' army has halted at the edge of the glass and lies under its cloaks in the heat. At dusk it goes out onto the glass. At dusk the brigades turn south. It is the last day the two armies can see each other.`],
    go:'To the horse-lines', node:'b10_c2_start'},

  areas:[
    /* 16 x 12 (b10_c2_ground, afternoon). The rise. . dry grass  # drystone and scrub  w wagons  o barrels  T tents  h the horse-lines
       W a water wagon with a lamp at its tailboard (the tile-woman)  B water barrels on flat wagons (Yelt's)  c Orla's water-cart  F the
       squad's fire  X the rise's edge, east (the overlook) */
    { id:'b10_c2_rise', title:'The glass\'s edge · the brigades\' train', sub:'Afternoon · the train halted on the rise', hint:'Tap ground to move · tap a figure to talk · the rise\'s edge is east, the horse-lines west', decor:'b10_c2_ground',
      map:[ "################",
            "#..w..w...T..T.#",
            "#..............#",
            "#.hhh.....W....#",
            "#..............#",
            "#......F.......X",
            "#..............#",
            "#..c.....BB....#",
            "#..............#",
            "#..T..w....T...#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b10_c2_fire', W:'b10_c2_tailboard', B:'b10_c2_wagons', c:'b10_c2_cart', X:'b10_c2_overlook'}, start:{x:2, y:4},
      quest:()=> !b102TirrenSettled() ? 'The horse-lines. A farrier with a horse that has gone down.' : !S.f.b10_c2_orders ? 'The Finadd, by the tents. He has the brigades\' word.' : !S.f.b10_c2_sparDone ? 'The Ninth\'s sergeant, by the wagons. The drill.' : (!b102Adj() && !S.f.b10_c2_desDone) ? 'The water wagons. Something is wrong down the row.' : 'The Finadd. The foreigners are moving.',
      npcs:[
        {id:'tirren', name:'A farrier at the horse-lines', kind:'tirren', x:3, y:4, node:()=>'b10_c2_tirren', show:()=>S.f.b10_tirrenDone == null || S.f.b10_tirrenDone === 2, fresh:()=>S.f.b10_tirrenDone == null},
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:6, y:2, node:()=>'b10_c2_ennic', fresh:()=>!S.f.b10_c2_orders || b102KeyReady()},
        {id:'sergeant', name:'A sergeant of the Ninth', kind:'b5_letherii', x:6, y:8, node:()=>'b10_c2_drill', fresh:()=>!!S.f.b10_c2_orders && !S.f.b10_c2_sparDone},
        {id:'yelt', name:'Yelt, the brigade clerk', kind:'b5_c1_clerk', x:11, y:6, node:()=>'b10_c2_yelt', fresh:()=>!S.f.b10_c2_yelt},
        {id:'orla', name:'Orla, at her water-cart', kind:'b9_c2_orla', x:4, y:7, node:()=>'b10_c2_cart', fresh:()=>!S.f.b10_c2_orla},
        {id:'saffa', name:'Saffa, the field cook', kind:'b9_c2_saffa', x:8, y:5, node:()=>'b10_c2_saffa', fresh:()=>!S.f.b10_c2_saffa} ] },

    /* 16 x 12 (b10_c2_ground, dusk). The rise at dusk: the same ground. X the edge (the parting), B the water wagons (the count), F the
       fire, < the road south (or down onto the glass) */
    { id:'b10_c2_dusk', title:'The glass\'s edge · the brigades\' train', sub:'Dusk · the parting', hint:'Tap ground to move · tap a figure to talk · the edge is east, the road west', decor:'b10_c2_ground', dark:true,
      map:[ "################",
            "#..w..w...T..T.#",
            "#..............#",
            "#.hhh.....W....#",
            "#..............#",
            "<......F.......X",
            "#..............#",
            "#..c.....BB....#",
            "#..............#",
            "#..T..w....T...#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b10_c2_fire', X:'b10_c2_edge', B:'b10_c2_count', W:'b10_c2_tailboard', c:'b10_c2_cart', '<':'b10_c2_south'}, start:{x:8, y:6},
      quest:()=> b102Watch() ? (!S.f.b10_c2_watchDone ? (b102Adj() ? 'The edge, east, down on the glass. The brigades are turning south.' : 'The edge of the rise, east. The foreigners are going out.') : 'The fire. Then the road.')
        : (!S.f.b10_c2_countDone ? 'Yelt, at the water wagons. Every barrel.' : 'The fire. Then the road.'),
      npcs:[
        {id:'yelt', name:'Yelt, at the water wagons', kind:'b5_c1_clerk', x:11, y:6, node:()=>'b10_c2_count', fresh:()=>!b102Watch() && !S.f.b10_c2_countDone},
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:6, y:2, node:()=>'b10_c2_ennic', fresh:()=>false} ] },

    /* 16 x 12 (b10_c2_ground, night). The first night's halt: wagons drawn up, the horse-lines, the fire, a dead horse at the edge of the
       picket (k), the Sixth's water barrels (B), the road on, south (>). On 'adjunct' the same halt is on the glass, at the column's tail. */
    { id:'b10_c2_halt', title:'The first halt', sub:'Night · the train drawn up', hint:'Tap ground to move · tap a figure to talk · the horse-lines are north, the barrels east', decor:'b10_c2_ground', dark:true,
      map:[ "################",
            "#.hhhh.....k...#",
            "#..............#",
            "#.w...w...w....#",
            "#..............#",
            "#......F.......#",
            "#..............>",
            "#.w.......BB...#",
            "#..............#",
            "#....w....w....#",
            "#..............#",
            "################" ],
      walk:'.', triggers:{F:'b10_c2_fire', k:'b10_c2_carcass', B:'b10_c2_barrels', '>':'b10_c2_onroad'}, start:{x:7, y:6},
      quest:()=> b102Adj() && !S.f.b10_c2_desDone ? 'The Sixth\'s water barrels, east. Shapes coming down the column.' : !b10BeatOf(2) ? 'The fire. The squad is talking about the foreigners.' : 'On, at first light.',
      npcs:[] },

    /* 16 x 12 (b10_c2_ground, day; 'escort' only). The road south: , the track  w wagons  h horses on the march  X the column's east flank,
       where the dust comes from  > on south */
    { id:'b10_c2_road', title:'South of the glass · the long way round', sub:'Morning · the column on the road', hint:'Tap ground to move · tap a figure to talk · the column\'s flank is east, the road on south', decor:'b10_c2_ground',
      map:[ "################",
            "#.....,,,......#",
            "#..w..,,,..h...#",
            "#.....,,,......#",
            "#..h..,,,..w...#",
            "#.....,,,......X",
            "#..w..,,,..h...#",
            "#.....,,,......#",
            "#..h..,,,..w...#",
            "#.....,,,......#",
            "#.....,,,......#",
            "#######>########" ],
      walk:'.,', triggers:{X:'b10_c2_flank', '>':'b10_c2_onroad'}, start:{x:7, y:2},
      quest:()=> !S.f.b10_c2_joined ? 'The column\'s east flank. The horses have smelled something.' : 'On south, with the column.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:4, node:()=>'b10_c2_ennic_road', fresh:()=>!!S.f.b10_c2_joined && !S.f.b10_c2_word}] } ],

  battles:{
    /* the drill: a file of the Ninth against the Sixth, wooden spear-shafts and real shields; the Letherii's first fight (near certain) */
    b10_c2_spar:{title:'The drill on the rise', style:'b10_c2_ground', warrenText:'Afternoon on the rise above the glass · dust, heat, a ring of watching soldiers · the warrens thin and far', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Hold four rounds against the Ninth\'s file. Wooden shafts. They still hurt.'},
      map:["........","........","..t..t..","........","........","........","...t....","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b10_c2_sparrer',2,1],['b10_c2_sparrer',5,1],['b10_c2_sparrer',4,0]], xp:120, after:'b10_c2_spar_after',
      waves:[{round:2, foes:[['b10_c2_sparrer',1,0],['b10_c2_sparrer',6,0]], text:'The Ninth\'s sergeant sends in his second file, who have been watching and think they can do better.'}],
      preText:()=>`The Ninth's file comes across the trodden ground in step, the foreigners' step, shields up and spear-shafts level, with no heads on the shafts and no hurry. They learned it on the same dry field outside Letheras the Sixth did. They would like to show they learned it better.`},
    /* the water wagons: Bolkando deserters by day on 'escort'; on 'adjunct', the first halt on the glass by night, stragglers who will not
       cross (fought down, never killed in words). The same id, two grounds each. */
    b10_c2_deserters:{get title(){ return b102Adj() ? 'The Sixth\'s barrels' : 'The water wagons'; }, style:'b10_c2_ground', get dark(){ return b102Adj(); },
      get warrenText(){ return b102Adj() ? 'Night on the glass · stars above and below, the column halted · the warrens quiet' : 'Afternoon on the rise · wagons, dust, the horses shying · the warrens thin and far'; }, warren:{meanas:1, denul:1}, music:'battle',
      map:["##....##","........","..t..t..","........","#......#","........","...t....","........","........","##....##"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b10_lspear',1,8]],
      get foes(){ return b102Adj() ? [['b10_lstraggler',2,1],['b10_lstraggler',5,1],['b10_lstraggler',3,0],['b10_lstraggler',4,0]] : [['b10_lbolkando',2,1],['b10_lbolkando',5,1],['b10_lbolkando',4,0],['b10_lbolkandobow',3,0]]; },
      xp:380, after:'b10_c2_deserters_after',
      preText:()=> b102Adj() ? `They come down the column's tail with their skins empty and their faces set, five or six of them from some company up the line: foreigners who have had one night of the glass and will not have a second. They want the Sixth's water to walk back west with. They do not want to hurt anybody. They will if they have to.`
        : `Five Bolkando in the brigades' dust-coats, with a horse already off the picket and two barrels on a hand-sled, and the look of soldiers who have decided their queen's road south is not their road. They drop the sled's rope when they see the squad, and draw.`,
      stage2:{get title(){ return b102Adj() ? 'Up the column' : 'Behind the wagons'; }, xp:170,
        text:()=> b102Adj() ? `The barrels are the Sixth's. Further up the dark column the rest of them have stopped, with a big man at their front who was a corporal once, and is telling them the Letherii are only Letherii, and the water is only water, and there is a lot of it.${b102If('tirren', `\n\nTirren has a horse's halter in one hand and her hammer in the other. "Not the water," she says. "Not on the first night."`)}`
          : `The wagons are the Sixth's. Behind them, in the lee of the last one, the rest have the horse and the sled, and a big Bolkando with a captain's rings in his beard is telling them to finish it and go.${b102If('tirren', `\n\nTirren has gone white round the mouth. "That's Copper," she says. "That's my horse. He's lame in the off fore." She goes round the wagon first, with the hammer.`)}`,
        map:["#......#","..t..t..","........","........","...tt...","........",".t....t.","........","........","#......#"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        get foes(){ return b102Adj() ? [['b10_lringleader',3,0],['b10_lstraggler',5,2]] : [['b10_lbolkandochief',3,0],['b10_lbolkando',5,2]]; }} },
    /* half-wild dogs at a dead horse at the edge of the halt (optional); on 'adjunct' the same dogs, followed the column out onto the glass */
    b10_c2_dogs:{title:'The dead horse', style:'b10_c2_ground', dark:true, get warrenText(){ return b102Adj() ? 'Night on the glass · a dead horse, the column halted · the warrens quiet' : 'Night at the halt · the horse-lines, a dead horse at the picket\'s end · the warrens quiet'; }, warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","........","..t.....","........","....t...","........",".t....t.","........","........","#......#"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b10_ldog',2,0],['b10_ldog',5,0],['b10_ldog',3,1],['b10_ldog',6,1]], xp:100, after:'b10_c2_dogs_after',
      preText:()=>`Four of them, lean and grey-brown, more wolf than dog, with the dead horse between them and the squad. They have followed the column from somewhere, for exactly this. They do not mean to give it up for a few soldiers with sticks.`} },

  foes:{
    /* a sparring spear of the Ninth: a wooden shaft with no head, a real shield, the foreigners' step */
    b10_c2_sparrer:{name:'Sparring spear of the Ninth', sig:'n', kind:'b5_letherii', hp:30, ac:14, atk:8, dmg:[1,4,2], rng:1, mv:4, init:1, verb:'cracks a spear-shaft across'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b10_c2_spear:{name:'A train-guard\'s spear', slot:'weapon', role:'reach', who:null, atk:1, dmg:[1,8,3], rng:2,
      line:'A long ash-shafted spear of the brigades\' new issue, with an iron crossbar below the head, so that whatever runs onto it stops there. The Commander had them made for the train\'s guards, because the Bolkando have long ones. The quartermaster gave the Sixth one for the drill and forgot to ask for it back.'},
    b10_c2_coat:{name:'A quilted dust-coat', slot:'armour', role:'light', who:null, ac:2, hp:3,
      line:'A long coat of quilted cotton, dust-coloured to begin with and more so now, padded thick at the shoulders and stitched in rows. It turns a knife, mostly, and keeps off the sun, wholly. It came off the water wagons the day the army split, and Yelt wrote it into the book as the train\'s, and then handed it over.'},
    b10_c2_tally:{name:'A water-tally', slot:'trinket', role:'any', who:null, hp:2, stat:{wits:1},
      line:'A hank of knotted cord, a knot for every barrel and a bead for every ten, worn smooth by a water-carter\'s fingers. Orla keeps two and gave one away. Whoever carries it finds themselves counting things at every halt without meaning to, and getting the count right.'} },

  scenes:{
    b10_c2_dusk:{loc:'The glass\'s edge', sub:'The rise at dusk · the parting', cap:'The train\'s wagons dark against the last of the light, and below the rise a long line of soldiers going out onto the pale glass without a lamp.', amb:'explore'},
    b10_c2_halt:{loc:'South of the glass', sub:'The first halt · night', cap:'Wagons drawn up in a rough ring, the horse-lines quiet, a farrier\'s lamp at the end of the picket, and the brigades\' fires in a long line going south.', amb:'explore'} },

  end:{
    get watch(){ return ['Seen to go', b102Adj() ? 'On the day the army split, the Sixth drilled on the rise against the Ninth, and took a farrier into the squad. At dusk it stood on the edge of the glass and watched the brigades go south over the rise until they were gone, so that somebody who stayed had seen them go. Then it went out onto the glass behind the foreigners, a few Letherii at the tail of a column that had no reason to give.' : 'On the day the army split, the Sixth drilled on the rise against the Ninth, took a farrier into the squad, and put a few Bolkando off the water wagons. At dusk it stood on the edge of the rise and watched the foreigners walk out onto the glass until there was nothing left to see, so that somebody had. Then it turned south with the brigades, the long way round, and on the road the lizard-folk came in along the column.']; },
    get count(){ return ['Every barrel counted', b102Adj() ? 'On the day the army split, the Sixth drilled on the rise against the Ninth, and took a farrier into the squad. At dusk it stood at the water wagons with Yelt and counted its share onto its own carts, every barrel, twice. Then it went out onto the glass behind the foreigners with water it could name, a few Letherii at the tail of a column that had no reason to give.' : 'On the day the army split, the Sixth drilled on the rise against the Ninth, took a farrier into the squad, and put a few Bolkando off the water wagons. At dusk, while the foreigners walked out onto the glass, it stood at the water wagons with Yelt and counted every barrel for the long road, twice. Then it turned south with the brigades, and on the road the lizard-folk came in along the column.']; } },
  get endScene(){ return b102Adj() ? 'b10_glass_night' : 'b10_south'; },
  endCap:()=> b102Adj() ? 'The glass at night, stars above and below, and a few Letherii carts at the tail of the foreigners\' column going east without a lamp.' : 'The column on the road south, the Bolkando ahead and the grey knights\' dust ahead of them, and walking along its flank, tall and quiet, the lizard-folk.',
  tease:'Next: the Third. Night marches on the glass, the water counted at every halt, and the beasts in the traces beginning to fail.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b10_c2_key === 'watch') x.push(b102Adj() ? 'The Sixth stood on the edge of the glass and watched the brigades go south until they were gone.' : 'The Sixth stood on the edge of the rise and watched the foreigners walk out onto the glass until they were gone.');
    if (f.b10_c2_key === 'count') x.push('The Sixth counted every barrel with Yelt the night the army split, twice, the second count for the barrel.');
    if (f.b10_tirrenDone === 1) x.push(b10In('tirren') ? 'Tirren, a farrier of the train who listens to horses before officers, walks with the squad.' : 'Tirren, a farrier, walks with the squad.');
    if (f.b10_tirrenDone === 2) x.push('Tirren, a farrier of the train, waits at the horse-lines, if the squad will have her.');
    if (f.b10_c2_ledgerOk) x.push('Yelt taught the squad to count a barrel twice and believe the second count.');
    if (f.b10_c2_desDone) x.push(b102Adj() ? 'Stragglers who would not cross came for the Sixth\'s water on the first night on the glass, and went back to their company without it.' : 'Bolkando deserters came for the water wagons on the rise, and went without them.');
    if (f.b10_c2_dogsDone) x.push('Half-wild dogs at a dead horse on the first night, and the squad put them off it.');
    if (f.b10_c2_joined) x.push(f.b10_c2_joined === 'held' ? 'The big ones came in along the column on the road south, and the Sixth\'s horse-lines held.' : 'The big ones came in along the column on the road south, and the horses went every way at once.');
    return x; },

  journal:()=>{ const f = S.f, adj = b102Adj(); return [
    f.b10_c2_joined && 'Lizard-folk, taller than horses, walking along the column on the road south as if they had always been there. Ennic called them by a name.',
    f.b10_c2_watchDone && (adj ? 'Watched the brigades go south over the rise from the edge of the glass, until the dust was the only thing left.' : 'Watched the foreigners walk out onto the glass at dusk, a long dark line with no lamp, until there was nothing to see.'),
    f.b10_c2_countDone && 'Every barrel counted with Yelt by lamplight, twice. The second count is the true one.',
    f.b10_c2_thirst && f.b10_c2_thirst !== 'none' && 'The first night on the glass. The thirst came early.',
    f.b10_c2_desDone && (adj ? 'Stragglers who would not cross, after the Sixth\'s water on the first night on the glass.' : 'Bolkando deserters at the water wagons, with one of the train\'s horses.'),
    f.b10_c2_sparDone && 'A drill on the rise against a file of the Ninth, in the foreigners\' step.',
    f.b10_tirrenDone != null && 'A farrier of the train named Tirren asked for a place in the squad, at the horse-lines, with a horse\'s head in her lap.',
    adj ? 'The Sixth Company, a few Letherii who stayed with the foreigners, on the day the army split.' : 'The Sixth Company, in the Commander\'s brigades, on the day the army split.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the rise, afternoon (the first halt: the horse-lines) ======== */
    b10_c2_start:()=>({sp:'The horse-lines', scene:'b10_train', fx:()=>{ S.f.b10_c2_ph = S.f.b10_c2_ph || 1; }, again:()=>'The horse-lines on the rise, the horses\' heads down in the heat.', txt:
`The horse-lines run along the west side of the rise, a long picket with the train's horses on it, and every head on the picket is down. They stand the way tired horses stand, hip-shot, tails going at the flies. A few are lying down, which horses do not do in daylight unless something is wrong.

At the near end a horse is down on its side, and a young woman in a farrier's leather apron is sitting at its head with a hoof-knife in one hand, talking to it quietly, as if it had asked her a question.

${b102Say({tobet:'Tobet looks along the picket and counts it without meaning to. "Fewer than at the river," he says. "A lot fewer."', thegg:'Thegg looks at the horse on its side. "That one is thinking about it," he says. "Whether to get up."', perrit:'Perrit looks at the horses, and then down the rise at the glass, and then back. "They know," she says. "Whatever it is, they know it first."', _:'The squad stands at the end of the picket in the heat and looks at the horses, and the horses do not look back.'})}`,
      ch:[{t:'The farrier.', go:'b10_c2_tirren'},
          b10ReadChoice(2),
          {t:'Walk the train.', go:()=>startExplore()}]}),
    b10_c2_read:()=>b10ReadOffer(2),
    b10_c2_card:()=>b10ReadCard(2),

    /* Tirren, at the horse-lines (the first halt) */
    b10_c2_tirren:()=>{ const d = S.f.b10_tirrenDone;
      if (d === 2) return {sp:'Tirren', scene:'b10_train', txt:
`Tirren is at the horse-lines with a hoof in her lap, rasping. She looks up when you come, and waits, and goes on rasping while she waits.`,
        ch:[{t:'"Walk with us, Tirren."', fx:()=>{ b10Join('tirren'); }, go:'b10_c2_tirren_join'},
            {t:'Not now.', go:()=>startExplore()}]};
      if (d === 1) return {sp:'The horse-lines', scene:'b10_train', txt:
`The horse that was down is up, on four feet, with its head low and a wet cloth tied over its eyes against the glare. The picket is quiet. Further along, the train's other farrier is at work on another horse, without much hope.`,
        ch:[{t:'Back to the train.', go:()=>startExplore()}]};
      return {sp:'A farrier at the horse-lines', scene:'b10_train', fx:()=>{ S.f.b10_c2_farrier = 1; }, again:()=>'The farrier at the horse-lines, sitting at a horse\'s head, talking to it.', txt:
`She is young, twenty or so, with a dust-scarf over her hair and a long braid out from under it over her left shoulder, and a leather apron scarred with hot iron. There is a rasp on a thong at her belt, worn thin as a leaf, and a farrier's hammer beside her on the ground.

"Not yet," she says, to the horse. Then, to you, without looking up: "She went down at grey light. She'll get up if she wants to. I'm asking her to want to." She runs a hand down the horse's neck. "This is Wren. She pulled the Sixth's ration wagon all night. You'll have eaten off her back."

The horse breathes out, long, and puts her front feet under her, and stands up in two movements, swaying. The farrier stands with her, one hand on the halter, and only then looks at the squad, feet first and then faces.

"Tirren," she says. "Farrier of the train. I've been waiting for the Sixth."`,
        ch:[{t:'"Waiting for us? Why?"', req:()=>!S.f.b10_c2_tirrenWhy, go:'b10_c2_tirren_why'},
            {t:'"Walk with us, Tirren."', fx:()=>{ b10Join('tirren'); }, go:'b10_c2_tirren_join'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c2_tirren_why:()=>({sp:'Tirren', scene:'b10_train', fx:()=>{ S.f.b10_c2_tirrenWhy = 1; }, txt:
`She takes a stub of chalk out of the apron's pocket and turns the apron's bib over. On the inside, low down, there are marks in rows. A lot of them.

"Horses lost since Letheras," she says. "The officers don't keep that count. I do." She lets the bib fall. "A horse can't decide when it stops. It goes until it can't. A squad can decide. The Sixth came off its stretch walking, I heard, all of it that could." She looks along the picket. "I'd like to be somewhere that gets to decide. I'll still do the feet. Yours too."${b102If('brennet', `\n\nBrennet nods slowly. "She does the train's feet," he says. "Best in it. The horses go quiet when she's on the picket."`)}${b102If('sorvan', `\n\nSorvan is looking at the horse she got up, and then at her, with a lancer's respect for anyone who knows horses. "Bluerose would have taken you," he says. "For the horses. Not for the squad."`)}`,
      ch:[{t:'"Walk with us, Tirren."', fx:()=>{ b10Join('tirren'); }, go:'b10_c2_tirren_join'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c2_tirren_join:()=>({sp:'Tirren', scene:'b10_train', txt:
`${b10In('tirren') ? `She nods once and picks up the hammer and hooks it on her belt, and pats Wren's neck, and walks over to the Sixth's end of the picket as if she had been told where to stand already.

"I'll want an hour at every halt for the horses," she says. "The Sixth's and anybody else's. That's my price." She looks at the squad's feet again. "Second price, those boots come off tonight."${b102If('ammet', ` Ammet looks at Tirren, and Tirren at Ammet. "Feet," Ammet says. "Feet," Tirren agrees. It is a whole conversation.`)}` : `She nods, and does not move. Six walk with the squad already, and a farrier can count a team. "I'll be at the horse-lines," she says. "When there's room. There'll be room. There always is, on a long road."`}`,
      ch:[{t:'Back to the train.', go:()=>startExplore()}]}),

    /* Finadd Ennic: the brigades' word; later, the key */
    b10_c2_ennic:()=>{ const ph = b102Ph();
      if (ph >= 2) return {sp:B5_FINADD.name, scene:'b10_c2_dusk', txt:
`${b102Ennic()} has his slate under his arm and is watching the ${b102Adj() ? 'brigades form up to go south' : 'foreigners go out onto the glass'}. "${b102Watch() ? 'The edge, Sergeant. Go on.' : 'Yelt is at the water wagons. He has started without you, which is like him.'}"`,
        ch:[{t:'Back to the rise.', go:()=>startExplore()}]};
      if (S.f.b10_c2_orders && b102KeyReady()) return {sp:B5_FINADD.name, scene:'b10_train', html:witnessHTML(), again:()=>`${b102Ennic()}, with his slate, watching the foreigners. "The edge or the barrels, Sergeant."`, txt:
`${b102Ennic()} is standing at the east end of the rise with the slate under his arm, looking down. Below, the foreigners have begun to stir under their cloaks: sergeants walking the lines, wagons being backed into the traces, a long dark column forming up along the edge of the glass, facing out onto it.

"They go at dusk," he says. "${b102Adj() ? 'And the brigades turn south at the same hour, and we go down onto the glass behind the foreigners, a few Letherii at the tail.' : 'And we go south at the same hour, the long way round.'} Nobody has said why, in either army. I have stopped expecting it." He taps the slate. "Two things want doing before we march, and the Sixth may pick.

"${b102Adj() ? 'The edge. Somebody who stays should stand on it and see the brigades go, so that somebody did. Lether has been seen off a great many times. It has never been seen off by its own.' : 'The edge. Somebody should be on it when the foreigners go out, and stay until they are gone. Lether owes them that, I think, and a little more. They came up out of a river at us once, and later stood beside us. I would like it to be said that we watched them go.'}

"Or Yelt." He almost smiles. "${b102Adj() ? 'He has the Sixth\'s share of the water on his book and will not give it over until every barrel is counted onto our own carts, twice, by lamplight.' : 'He wants hands at the water wagons to count every barrel for the long road, twice, before the Bolkando count it for him.'} The water is what will get anybody home. He says so. He is usually right, which is tiresome."${b102If('tobet', `\n\nTobet is already looking down at the foreigners. "I'd watch," he says. "If it was me."`)}${b102If('tirren', `\n\nTirren is looking at the water wagons. "Count it," she says. "The horses drink first. Nobody counts what the horses drink."`)}${b102If('brennet', `\n\nBrennet nods at the wagons. "Barrels," he says. "I know barrels."`)}`,
        ch:[{t:b102Adj() ? '"The edge. We\'ll see them go."' : '"The edge. We\'ll watch them go."', fx:()=>{ S.f.b10_c2_key = 'watch'; S.f.b10_c2_watched = 1; S.f.b10_c2_ph = 2; b102L('tobet', 1); }, go:'b10_c2_key_watch'},
            {t:'"Yelt. Every barrel, twice."', fx:()=>{ S.f.b10_c2_key = 'count'; S.f.b10_c2_counted = 1; S.f.b10_c2_ph = 2; b102Lc('brennet', 1); b102Lc('tirren', 1); }, go:'b10_c2_key_count'},
            {t:'Not yet.', go:()=>startExplore()}]};
      if (S.f.b10_c2_orders) return {sp:B5_FINADD.name, scene:'b10_train', txt:
`${b102Ennic()} is writing on his slate in the shade of a wagon. "The drill, Sergeant${!b102Adj() && S.f.b10_c2_sparDone && !S.f.b10_c2_desDone ? ', done; and now something is wrong at the water wagons, Yelt says. See to it' : ''}." He does not look up. "I will find you when the foreigners move."`,
        ch:[{t:'"Where are we going, Finadd? Truly."', req:()=>!S.f.b10_c2_where, go:'b10_c2_ennic_where'},
            {t:'Back to the train.', go:()=>startExplore()}]};
      return {sp:B5_FINADD.name, scene:'b10_train', fx:()=>{ S.f.b10_c2_orders = 1; }, again:()=>`${b102Ennic()}, with his slate. "The drill first, Sergeant."`, txt:
`Finadd Ravel Ennic looks older than he did at the river, and older than he did on the day the short-tails came, and has stopped minding. He has his slate under his arm. There is a line through some of the names on it.

"Sergeant." He nods down the rise, at the foreigners lying up at the glass's edge. "${b102Adj() ? 'You have heard. The Commander\'s staff said yes: the Sixth goes on with them, and a few others who asked. I asked as well. They said yes to me too, which I have decided to take as a compliment.' : 'You have heard. They go east, across that. We go south, the long way round, behind the Bolkando and the Grey Helms. Kolanse is at the end of both roads, they say. I have stopped asking what is in it.'}

"Two things. The Commander wants every company drilled at every halt, the foreigners' way, so the step is not forgotten on the road. The Ninth's sergeant has asked for the Sixth, by name, which is a compliment or a threat. And keep near the water wagons." He looks at the train. "The Bolkando have been walking past them all morning, looking."${b102If('perrit', `\n\nPerrit looks at the slate. "You still have the slate," she says. Ennic looks at it too. "Yes," he says. "Nobody has told me to rub it out."`)}`,
        ch:[{t:'"Where are we going, Finadd? Truly."', req:()=>!S.f.b10_c2_where, go:'b10_c2_ennic_where'},
            {t:'"The drill, then."', go:()=>startExplore()},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c2_ennic_where:()=>({sp:B5_FINADD.name, scene:'b10_train', fx:()=>{ S.f.b10_c2_where = 1; }, txt:
`"Kolanse." He says it the way he said it outside Letheras, carefully, a coin from a country he has not seen. "A drought, the foreigners' captain told me. Now the officers say more than a drought. They say it in tents, and come out with faces." He shrugs.

"The foreigners' Adjunct means to go straight across the glass, where there is no road and no water, and the Commander means to go round, where there is a road of sorts and some water, and both of them mean to be in the same place at the same time, at the end." He looks down the rise. "I asked a foreign officer why across. He said the Adjunct has a reason. I asked what it was. He said that was the reason." He tucks the slate away. "I find I believe him. That is the strange part."`,
      ch:[{t:'Back to the train.', go:()=>startExplore()}]}),
    b10_c2_key_watch:()=>({sp:B5_FINADD.name, scene:'b10_train', txt:
`Ennic nods, and writes something on the slate, and does not rub it out. "The edge, then," he says. "Stay until they are gone. Then come and find the column. It will not be hard to find. It is very large and very slow."

${b102Adj() ? 'The squad shoulders its kit. When the light goes, it will go down off the rise to the edge of the glass, where the foreigners\' tail is forming, and turn round, and watch the other way.' : 'The squad shoulders its kit and waits for the light to go.'}${b102If('tobet', `\n\nTobet has his bow strung, for no reason. "Watching's a bowman's work," he says. "Most of it."`)}`,
      ch:[{t:'Dusk.', go:()=>{ startExplore('b10_c2_dusk'); talk('b10_c2_dusk_arrive'); }}]}),
    b10_c2_key_count:()=>({sp:B5_FINADD.name, scene:'b10_train', txt:
`Ennic nods. "Yelt, then," he says. "He will be pleased. He will not show it. He never has." He writes it down.

The squad goes down the row to the water wagons, where Yelt has already lit a lamp, though it is not yet dark, and has the book open at a clean page.${b102If('tirren', `\n\nTirren walks with you, chalk in hand. "The horses' water goes in the book too," she says. "I'll see that it does."`)}`,
      ch:[{t:'Dusk.', go:()=>{ startExplore('b10_c2_dusk'); talk('b10_c2_dusk_arrive'); }}]}),

    /* the drill against the Ninth's file */
    b10_c2_drill:()=>{ if (S.f.b10_c2_sparDone) return {sp:'A sergeant of the Ninth', scene:'b10_train', txt:
`The Ninth's sergeant is sitting on a barrel with his helm off, drinking his half-mouthful very slowly. He lifts the cup to the Sixth. "Again at the next halt," he says. "And the one after. We'll get it right before Kolanse or die trying, and I'd rather the first."`,
        ch:[{t:'Back to the train.', go:()=>startExplore()}]};
      if (!S.f.b10_c2_orders) return {sp:'A sergeant of the Ninth', scene:'b10_train', txt:
`A sergeant of the Ninth Company is walking a file of his soldiers up and down a square of trodden ground between the wagons, in the foreigners' step, shield rim to shield rim. He sees the Sixth watching and nods, and does not stop. The Finadd will have a word first, probably.`,
        ch:[{t:'Back to the train.', go:()=>startExplore()}]};
      return {sp:'A sergeant of the Ninth', scene:'b10_train', again:()=>'The Ninth\'s sergeant, with his file, on the trodden ground. "When you\'re ready, Sixth."', txt:
`The Ninth's sergeant is a lean man with a sunburned scalp and a voice like a gate. His file stands behind him on the trodden ground with shields up and spear-shafts with the heads off, in the foreigners' step, which they learned outside Letheras from the same Malazan sergeant the Sixth did.

"Sixth," he says. "Commander's word. Every halt, the step, so we don't lose it on the road. I asked for you because you held your stretch the day the short-tails came. The Ninth would like to know if you can hold it against the Ninth." He looks at the squad. "Shafts, not heads. It'll still hurt."${b102If('thegg', `\n\nThegg has already taken a shaft from the rack and set his tower shield. "Behind me," he says. Then, to the Ninth: "Not you. You in front."`)}${b102If('tirren', `\n\nTirren looks at the shafts, and at her hammer, and hooks the hammer back on her belt and takes a shaft. "I've held worse," she says. "Horses don't fight fair."`)}`,
        ch:[{t:'"Ninth! In step." Take the square.', go:()=>startBattle('b10_c2_spar', {})},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c2_spar_after:()=>({sp:'A sergeant of the Ninth', scene:'b10_train', fx:()=>{ if (!S.f.b10_c2_sparDone) { S.f.b10_c2_sparDone = 1; gain('b10_c2_spear'); } }, txt:
`The Ninth's file steps back in step, which is the last thing the step teaches, and grounds its shields, and somebody in it laughs out loud, which nobody has done on the rise all day.

The sergeant walks the Sixth's line once, slowly. "You'll do," he says. "Out there, when it comes, stand like that." He takes one of the new long spears from the quartermaster's rack, with an iron crossbar below the head, and holds it out to the nearest soldier. "Train-guard issue. Commander's new spears, for the water. Quartermaster won't miss one." He considers the squad. "Probably."${b102Say({thegg:`\n\nThegg is rubbing his shoulder where three shafts found it at once. "Good file," he says, to the Ninth. They look pleased.`, tobet:`\n\nTobet has a red welt across the back of one hand and is looking at it with interest. "Wooden," he says. "Didn't feel wooden."`, _:''})}`,
      ch:[{t:'Back to the train.', go:()=>startExplore()}]}),

    /* Yelt and the water ledger: the trick */
    b10_c2_yelt:()=>({sp:'Yelt', scene:'b10_train', fx:()=>{ S.f.b10_c2_yelt = 1; }, again:()=> S.f.b10_c2_ledgerOk ? 'Yelt at his tailboard, counting a barrel twice. He nods without looking up.' : 'Yelt at his tailboard, with the book open and a barrel in front of him.', txt:
`Yelt is sitting on the tailboard of a water wagon under a square of canvas, narrow and grey and very clean, with the brigade's book open on his knee. It is thicker than it was outside Letheras. A barrel stands on the ground in front of him, and he is looking at it.

He counts it: taps the staves with a pencil, listens, writes a number. Then he puts the pencil down, and looks at the barrel again, longer, and taps it again, slower, and writes a second number beside the first. The second is smaller.

"The first count is for the book," he says, without being asked. "The second is for the barrel. By the second you know what you are looking at." He crosses out the first number. "Out there the book will be wrong a great many times. The barrel never is."${b102If('perrit', `\n\nPerrit is reading the page upside down. "Your sevens are honest," she says. Yelt looks almost pleased.`)}${b102If('tirren', `\n\nTirren looks at the book. "Is there a page for the horses' water?" she asks. Yelt turns a great many pages, and finds it, and shows her. She reads it twice.`)}`,
      ch:[{t:'Count the next barrel with him, his way: once for the book, and again for the barrel.', check:['wits', 20], trick:'b10_c2_ledger', req:()=>!S.f.b10_c2_ledgerTried, fx:()=>{ S.f.b10_c2_ledgerTried = 1; },
            edges:id=>[id === 'perrit' && ['a ledger is a sum, and she does sums out loud', 2], id === 'ilsa' && ['she copied Patriotist ledgers for six years, every line twice', 2], id === 'brennet' && ['he knows a barrel by the sound of its staves', 2], id === 'tobet' && ['he has kept a tally-stick his whole life, and counted it twice', 1], id === 'tirren' && ['she keeps the count of horses lost, which nobody else does', 1], id === 'sgt' && ['you have read Yelt\'s ration book before, on the Wastes', 1], id === 'thegg' && ['he counts slowly, and the second count comes out different every time', -1], id === 'ruuk' && ['he will not look at writing', -1]],
            go:'b10_c2_yelt_ok', fail:'b10_c2_yelt_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c2_yelt_ok:()=>({sp:'Yelt', scene:'b10_train', fx:()=>{ S.f.b10_c2_ledgerOk = 1; }, txt:
`${by({sgt:'You tap the staves, and write', perrit:'Perrit taps the staves, and writes', ilsa:'Ilsa taps the staves, and writes', brennet:'Brennet knocks the staves with a knuckle, and writes', _:'{who} taps the staves, and writes'})} a number. Then the second look, slower: the wet line on the inside of the stave where the water was last night, the hoop that has slipped, the faint damp at the bottom seam. The second number is smaller. It is also right.

Yelt looks at the two numbers for a while. Then he crosses out the first one himself. "Good," he says. "Most people believe the first. It is easier to carry." He turns a page. "Do it to everything, out there. Count it twice. Believe the second."`,
      ch:[{t:'Back to the train.', go:()=>startExplore()}]}),
    b10_c2_yelt_no:()=>({sp:'Yelt', scene:'b10_train', txt:
`The first count goes down in the book. The second count, somehow, comes out larger, and Yelt looks at it, and then at the squad, with great patience.

"Barrels do not grow," he says. "That is the one thing a barrel cannot do." He crosses out both. "It takes a while. Most clerks never learn it. Most clerks are never this thirsty."`,
      ch:[{t:'Back to the train.', go:()=>startExplore()}]}),

    /* Orla's water-cart: the tally */
    b10_c2_cart:()=>({sp:'Orla', scene:b102Ph() >= 2 ? 'b10_c2_dusk' : 'b10_train', fx:()=>{ if (!S.f.b10_c2_orla) { S.f.b10_c2_orla = 1; gain('b10_c2_tally'); } }, again:()=>'Orla\'s water-cart, its tap tied shut with a rag, Orla on the shaft with a cudgel across her knees.', txt: S.f.b10_c2_orla ?
`Orla is on the shaft of her water-cart with the cudgel across her knees and the tap tied shut with a rag, counting knots on a cord between finger and thumb. "${b102Ph() >= 2 ? 'Water\'s water,' : 'Still full,'}" she says. "${b102Ph() >= 2 ? 'Till it isn\'t. Then it\'s the only thing.' : 'I\'ll tell you when it isn\'t. You\'ll hear me.'}"` :
`Orla's water-cart is drawn up at the end of the row with its barrel under a wet sack, against the sun, and Orla on the shaft with her headscarf down over her eyes and a cudgel across her knees. She is not asleep. Two Bolkando drift past the cart, slowly, and look at the barrel, and look at the cudgel, and drift on.

"Sixth," she says, from under the scarf. "My brother went home to Brevos. He'd have been right to." She sits up and pulls a hank of knotted cord out of her coat: a knot for every barrel, a bead for every ten. "I keep two. Count the train every halt. Keep the count in your fingers, not your head. Heads lie when they're thirsty." She holds it out. "Take it. I'll know if you lose it."${b102If('brennet', `\n\nShe nods at Brennet. "Harbour Yard squeak," she says. "Still got it." He looks pleased.`)}`,
      ch:[{t:'Back to the train.', go:()=>startExplore()}]}),

    /* Saffa, the field cook: the one line of the Third */
    b10_c2_saffa:()=>({sp:'Saffa', scene:'b10_train', fx:()=>{ S.f.b10_c2_saffa = 1; }, again:()=>'Saffa at her pot, which is the size of a small boat and less full than it was.', txt:
`Saffa has the big pot on a low fire in a trench, against the wind off the glass, and is stirring something that is mostly water and has, she says, been introduced to an onion. She points the ladle at the squad, by way of hello.

"Second bell," she says. "Not first. First is the officers'." She stirs. "${b102Rumour()}"

She taps the ladle on the rim. "${b102Adj() ? 'You\'re going with them, I hear. Take your own salt. They won\'t have any.' : 'Down there they\'ve got no pots, I hear. Nothing to cook on. Nothing to cook.'} She looks down the rise at the glass, briefly, and back at the pot. "I'm not looking at it again. It looks back."${b102If('ammet', `\n\nAmmet looks at the trench fire. "Clever," she says. Saffa nods, as one professional to another.`)}`,
      ch:[{t:'Back to the train.', go:()=>startExplore()}]}),

    /* the tile-woman at a water wagon's tailboard (the reading's place) */
    b10_c2_tailboard:()=>({sp:'The tile-woman', scene:b102Ph() >= 2 ? 'b10_c2_dusk' : 'b10_train', again:()=>'The tile-woman at a water wagon\'s tailboard, her bone tiles in an oiled bag.', txt:
`The old tile-woman is sitting on the tailboard of a water wagon, because the wagon she came out on ran out of horses and this one has not yet. She has her oiled bag of bone tiles on her knee and a shawl over her head against the sun.

"South," she says. "Or east. Everybody's asking me which. As if the tiles know roads." She sniffs. "They know people. Roads are just where people go."${b102If('perrit', `\n\nShe looks at Perrit. "Your cadre girl's quiet today," she says. "Something's quiet. I can feel it in the bag."`)}`,
      ch:[b10ReadChoice(2),
          {t:'Back to the train.', go:()=>startExplore()}]}),

    /* the overlook: the foreigners below */
    b10_c2_overlook:()=>({sp:'The edge of the rise', scene:b102Ph() >= 2 ? 'b10_c2_dusk' : 'b10_train', fx:()=>{ S.f.b10_c2_looked = 1; }, again:()=>'The east edge of the rise, the glass below it, the foreigners lying up at its edge.', txt:
`From the east edge of the rise the ground falls away in a long slope of scrub and grit to the edge of the glass. The glass starts there with a line you could step over: on this side, dust; on that side, a flat pale shine going away east to the edge of the world, without a mark on it, too bright to look at for long.

At the edge, in the scrub, the foreigners' army is lying up under its cloaks: a long dark smear with wagons in it, and beasts on pickets, and here and there a sergeant walking. A handful of horsemen are camped off to one side on their own. Nothing moves that does not have to.${b102Say({ruuk:'\n\nRuuk is lying on his belly at the edge, looking. "No birds over it," he says. "None. Not one."', kaedra:'\n\nKaedra is crouched at the edge with her bow across her knees. "I scouted the Wastes six years," she says. "That is not the Wastes. That is the bottom of something."', pessa:'\n\nPessa looks once and turns her back on it. "Dry lock," she says. "Nobody sane."', _:''})}`,
      ch:[{t:'Back to the train.', go:()=>startExplore()}]}),

    /* the water wagons: the deserters ('escort'; on 'adjunct', a quiet row of barrels) */
    b10_c2_wagons:()=>{ const done = !!S.f.b10_c2_desDone;
      if (b102Adj() || done) return {sp:'The water wagons', scene:'b10_train', txt:
`The brigade's water wagons stand in a double row, barrels lashed three high under wet sacking against the sun, every barrel numbered and every number in Yelt's book. ${done ? 'A train-guard with one of the new long spears walks the row now, and does not stop walking.' : 'A train-guard with one of the new long spears walks the row, slowly, in the heat.'}`,
        ch:[{t:'Back to the train.', go:()=>startExplore()}]};
      if (!S.f.b10_c2_sparDone) return {sp:'The water wagons', scene:'b10_train', txt:
`The brigade's water wagons stand in a double row under wet sacking. A few Bolkando in dust-coats are sitting in the shade of the last wagon, talking low in their own tongue, and stop when the squad comes by, and start again when it has gone.${b102If('kaedra', `\n\nKaedra listens as you pass. "They're talking about home," she says. "Bolkando home. Not a good sign, out here."`)}`,
        ch:[{t:'Back to the train. The drill first.', go:()=>startExplore()}]};
      return {sp:'The water wagons', scene:'b10_train', txt:
`At the end of the row a train-guard is sitting against a wheel holding his head, with blood between his fingers. Behind the last wagon there is a hand-sled with two of the brigade's barrels roped onto it, and one of the train's horses off the picket with a Bolkando at its head, and four more of them in dust-coats going quietly to work on the lashings of a third.

A sling-man stands on the next wagon's tongue to watch the row.${b102If('tirren', `\n\nTirren has stopped dead. "That's Copper," she says. "That's my horse. He's lame." Her hand has gone to the hammer.`)}${b102If('kaedra', `\n\nKaedra says something short in Bolkando, under her breath. It is not a greeting.`)}`,
        ch:[{t:'"Sixth! Off the water." Straight down the row.', go:()=>startBattle('b10_c2_deserters', {})},
            {t:'Come at them along the far side of the row, under the wagons\' shadow, and be among them before the sling-man looks round.', check:['guile', 17],
              edges:id=>[id === 'kaedra' && ['half Bolkando, she knows how they watch and where they do not', 2], id === 'ruuk' && ['he walks ahead and waits, quietly, for a living', 1], id === 'pessa' && ['she has come up on a barge-thief in the dark more than once', 1], id === 'tobet' && ['he shot the holder\'s birds from cover for years', 1], id === 'thegg' && ['he is wider than the shadow under a wagon', -1], id === 'sorvan' && ['blue scale in the sun is a signal', -1]],
              near:{t:()=>`Yes, but the far side of the row is a ditch of loose grit, and ${b102Nm(b102Who())} ${b102V(b102Who(), 'go', 'goes')} in it to the knee getting there. ${b102Nmc(b102Who())}'ll carry that into the fight.`, fx:()=>bruise(b102Who(), bruiseN())},
              go:()=>startBattle('b10_c2_deserters', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c2_wagons_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c2_wagons_seen:()=>({sp:'The water wagons', scene:'b10_train', txt:
`The sling-man on the wagon-tongue shouts something in Bolkando, and the four at the lashings straighten and turn, and the knives that were cutting rope come round to the squad.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b10_c2_deserters', {surprise:'e'})}]}),
    b10_c2_deserters_after:()=>{ const adj = b102Adj();
      return {sp:adj ? 'The Sixth\'s barrels' : 'Behind the wagons', scene:adj ? 'b10_glass_night' : 'b10_train', fx:()=>{ if (!S.f.b10_c2_desDone) { S.f.b10_c2_desDone = 1; gain('b10_c2_coat'); } }, txt: adj ?
`The ones who could walk have walked, back up the dark column toward their own company, with their skins as empty as they came. The big corporal is sitting on the glass with his head in his hands, and stays down. His own sergeant comes down the column for him after a while, and looks at the Letherii, and at him, and says two words too low to carry, and hauls him up by the collar and takes him back to his company.

One of them dropped a long quilted coat by the barrels and did not come back for it. It goes in the kit. Ennic, when he hears, writes it on the slate as the Sixth's.${b102If('tirren', `\n\nTirren goes round the Sixth's barrels one by one with her palm flat on each, as if they were horses that had been frightened. "All there," she says. "First night." She does not say what she thinks of the second.`)}` :
`The Bolkando who could run have run, east and then south along the rise, without the horse and without the barrels. The big one with the captain's rings in his beard is down in the lee of the last wagon, and does not get up. A Bolkando officer comes down the train at a trot a little after, very correct, and looks, and apologises to Yelt in good Letherii, and has the body taken away, and does not say whose company it was.

Yelt has the barrels back on the wagon and is counting them, twice. On the sled, under the rope, there is a quilted dust-coat, the Bolkando kind, and Yelt writes it into the book as the train's, and then hands it to the squad. "The train thanks you," he says. "The train has nothing else to give. That was in the book as well."${b102Say({tirren:`\n\nTirren has Copper by the halter and is going over his legs with both hands, slowly, all four, talking to him. "Lame," she says. "Lame and frightened. Not cut." She leads him back to the picket herself.`, kaedra:`\n\nKaedra stands over the Bolkando captain a while. "He was from the forts," she says. "My mother's side of the line." That is all she says about it, and the squad lets it be.`, _:''})}`,
        ch:[{t:adj ? 'Back to the halt.' : 'Back to the train.', go:()=>startExplore()}]}; },

    /* ======== the fire: by phase. 1 the rise, 2 dusk, 3 the first night. The games pass wraps this node: keep the id ======== */
    b10_c2_fire:()=>{ const ph = b102Ph(), adj = b102Adj(), rk = ph >= 3 ? 'b10_c2_rest3' : 'b10_c2_rest1', beatOpen = ph === 3 && !b10BeatOf(2);
      const sc = ph >= 3 ? (adj ? 'b10_glass_night' : 'b10_c2_halt') : ph === 2 ? 'b10_c2_dusk' : 'b10_train';
      return {sp:ph >= 3 && adj ? 'The Sixth\'s circle' : 'The squad\'s fire', scene:sc, html:witnessHTML(),
        again:()=> ph >= 3 ? (adj ? 'The Sixth\'s circle on the glass, no fire, the stars above and below.' : 'The squad\'s fire at the halt, small, the horse-lines quiet behind it.') : 'The squad\'s fire on the rise, a pot on it with not much in the pot.', txt:
`${ph === 1 ? `The squad's fire on the rise is a few sticks of scrub in a ring of stones, with a pot on it that Saffa did not make and nobody is in a hurry to eat. The heat lies on everything. Every so often somebody looks down the rise at the glass, and then makes themselves look at something else.` : ph === 2 ? `The squad's fire at dusk is nearly out. All along the rise the train is putting its fires out and backing horses into the traces. ${b102DuskDone() ? (adj ? 'Below, the foreigners\' tail is already moving out onto the glass, and the Sixth\'s carts are waiting at the end of it.' : 'Below, there is nothing left at the edge of the glass but trodden scrub and dung. To the south the brigades are forming up on the road.') : (b102Watch() ? 'The edge is east. The light is going.' : 'Yelt\'s lamp is lit at the water wagons.')}` : adj ? `There is no fire. There is nothing on the glass to burn, and the foreigners would not allow one if there were. The Sixth sits in a circle at the column's tail with its carts behind it and its few horses on a picket, under more stars than any of them has seen, with the same stars thrown back up off the ground. It is very quiet. Up the column, a long way off, somebody coughs.` : `The first night south. The brigades halted near midnight on a flat stretch of nothing in particular, and the train drew its wagons up in a rough ring, and the Sixth has a fire of wagon-scraps and dung going small inside it. To the south the brigades' fires run away in a long line. To the north, where the glass is, there is no light at all.`}${b102If('tirren', ph >= 3 ? `\n\nTirren sits a little back from the fire with her lamp beside her, where she can see the horse-lines.` : '')}${ph >= 3 && S.f.b10_c2_thirst && S.f.b10_c2_thirst !== 'none' && b10In(S.f.b10_c2_thirst) ? `\n\n${NAME(S.f.b10_c2_thirst)} has the thirst already: split lips, and a mouthful from the skin that does nothing.` : ''}`,
        ch:[...(ph === 1 ? [b10ReadChoice(2)] : []),
            ...(beatOpen ? [{t:adj ? '"Why are they going? Why are we?" Ask it.' : '"Why are they going?" Ask it, at the fire.', go:'b10_c2_beat'}] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>!S.f[rk] && ph !== 2, fx:()=>{ S.f[rk] = 1; rest(ph >= 3 ? (adj ? 'The squad sits an hour in its circle on the glass. A mouthful each. Wounds close, mostly.' : 'The squad sits an hour by the fire at the halt. Wounds close, mostly.') : 'The squad sits an hour in the shade of the wagons. Wounds close, mostly.'); }, go:'b10_c2_fire_rest'},
            {t:'Talk with the squad.', go:'b10_c2_fire_talk'},
            {t:adj ? 'Dusk. Down onto the glass, behind the foreigners.' : 'Dusk. South, with the brigades.', req:()=>ph === 2 && b102DuskDone(), onward:true, go:'b10_c2_south'},
            {t:adj ? 'On. The column is moving.' : 'First light. The road south.', req:()=>ph === 3 && b102HaltDone(), onward:true, go:'b10_c2_onroad'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c2_fire_rest:()=>({sp:'The squad\'s fire', scene:b102Ph() >= 3 ? (b102Adj() ? 'b10_glass_night' : 'b10_c2_halt') : 'b10_train', txt:
`${b102Ph() >= 3 ? (b102Adj() ? 'An hour, then, on the glass, sitting close for the warmth, because the glass gives the day\'s heat back fast and then is cold.' : 'An hour, then, inside the ring of wagons, with the horses shifting on the picket and the brigades\' fires going away south.') : 'An hour, then, in the strip of shade along the wagons, with the heat lying on the rise and the flies at the horses.'}

${b102Say({ammet:'Ammet goes round the squad with the needle and the twists of herbs, and says "still" to each of them, and each of them is.', perrit:'Perrit sits with her eyes shut and her hand on the tile-pouch, reaching for the Holds. "Far," she says, after a while. "But there."', _:'Some of them sleep. The rest watch the horses.'})}${b102If('tirren', `\n\nTirren spends her hour on the squad's feet, one pair after another, and then goes and does the horses'.`)}`,
      ch:[{t:'Back to the fire.', go:'b10_c2_fire'}]}),
    b10_c2_fire_talk:()=>{ const ph = b102Ph(), g = b102Adj(), ln = [];
      Object.keys(B102TALK).forEach(id => { if (b10In(id)) ln.push(ph >= 3 ? B102TALK[id][1](g) : B102TALK[id][0]()); });
      return {sp:'The squad\'s fire', scene:ph >= 3 ? (g ? 'b10_glass_night' : 'b10_c2_halt') : ph === 2 ? 'b10_c2_dusk' : 'b10_train', txt:ln.length ? ln.join('\n\n') : `The squad is quiet. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b10_c2_fire'}]}; },

    /* ======== phase 2: dusk on the rise ======== */
    b10_c2_dusk_arrive:()=>({sp:'The rise at dusk', scene:'b10_c2_dusk', fx:()=>{ S.f.b10_c2_dusk = 1; }, again:()=>'The rise at dusk, the train backing horses into the traces.', txt:
`The light goes the way it goes out here: all at once, as if somebody had shut a door in the west. The heat goes after it more slowly. All along the rise the train is putting out its fires and backing horses into the traces, and the clerks are calling numbers.

Below, the foreigners are on their feet. The long dark smear at the edge of the glass has drawn itself up into a column, and the head of the column is moving: out past the last of the scrub, over the line you could step over, onto the glass. No lamps. No drums. A long dark line walking out onto a pale floor, getting no smaller, because there is nothing out there to measure it against.

You say the prayer before a march, the one every Letherii soldier says, out of habit. Something like a coin turning answers it, faintly, the way it always has.${b102Say({perrit:'\n\nPerrit has her hand on the tile-pouch. "Somebody should watch them," she says. "That is what the tile said. I did not say so at the time."', tobet:'\n\nTobet is watching already. He has not blinked in a while.', _:''})}`,
      ch:[{t:'To it.', go:()=>startExplore()}]}),

    /* 'watch': the edge (escort: the foreigners going out onto the glass; adjunct: from the glass's edge, the brigades going south) */
    b10_c2_edge:()=>{ if (!b102Watch() || b102Ph() !== 2) return {sp:'The edge', scene:'b10_c2_dusk', txt:
`${b102Adj() ? 'Down the slope the foreigners\' tail is forming at the edge of the glass, and the Sixth\'s carts with it.' : 'Down the slope, the foreigners\' column goes out onto the glass, a long dark line without a lamp.'} ${b102Watch() ? '' : 'The Sixth is at the water wagons tonight. Somebody else will have to watch.'}`.trim(),
        ch:[{t:'Back to the rise.', go:()=>startExplore()}]};
      if (S.f.b10_c2_watchDone) return {sp:'The edge', scene:'b10_c2_dusk', txt:
`${b102Adj() ? 'Up on the rise there is only trodden ground and wheel-ruts now, and to the south a long smudge of dust going away in the dark.' : 'Below the rise there is nothing at the edge of the glass now but trodden scrub, and wheel-ruts going over the line onto the pale, and on the glass itself, nothing at all.'}`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]};
      return {sp:'The edge', scene:'b10_c2_dusk', html:witnessHTML(), txt: b102Adj() ?
`The squad goes down off the rise to the edge of the glass, where the foreigners' tail is forming up and the Sixth's carts with it, and turns round, and looks back up.

On the rise the brigades are going. The train first, its wagons in a long string, the clerks' lamps lit at the tailboards. Then the companies in their files, Letherii and Bolkando, and ahead of all of them, a long way ahead already, the Grey Helms' dust. Somewhere in the middle of it, the Commander's banner, too far off to be more than a colour. They go south over the shoulder of the rise one company at a time, and each one, as it tops the rise, is against the last light for a breath, and then is not.

Behind the squad, the foreigners' sergeants are calling the step.${b102If('tobet', `\n\nTobet has his bow in his hand. He has not strung it. He is counting the companies as they go, under his breath.`)}` :
`The squad goes to the very edge of the rise and stands there in a line, as if on parade, and watches.

The column goes out onto the glass. Heavies in their files, with the big shields slung. Wagons, their barrels lashed and roped. Beasts in the traces, heads down. Here and there an officer on a horse, and at the very tail a few horsemen on thin horses, riding as if they had been told to and were thinking it over. Not one of them turns round. It goes on and on. The head of the column has gone pale with distance and then gone, and still the tail is going over the line.

Down there a voice is singing, very low, a marching song in the foreigners' tongue, and a sergeant's voice cuts it off, and after a while it starts again, lower.${b102If('tobet', `\n\nTobet has his bow in his hand. He has not strung it. He is counting the files as they go, under his breath.`)}`,
        ch:[{t:'Keep the squad on the edge until the last of them is out of sight, whatever is forming up behind.', check:['wits', 17], witness:true, req:()=>!S.f.b10_c2_watchTried, fx:()=>{ S.f.b10_c2_watchTried = 1; },
              edges:id=>[id === 'tobet' && ['he watched the holder\'s birds out of sight for years, for the holder\'s table', 2], id === 'kaedra' && ['a scout watches a column until it is gone; that is the work', 2], id === 'ruuk' && ['he watches birds until there is nothing left to see', 1], id === 'thegg' && ['he is very patient, and very hard to move', 1], id === 'sorvan' && ['the Bluerose watch their own ride out', 1], id === 'pessa' && ['she turned her back on the glass once already today', -1], id === 'ilsa' && ['she would rather read about it afterwards', -1]],
              near:{t:()=>`Yes, but by the time the last of them is gone it is full dark, and the squad has to find the ${b102Adj() ? 'foreigners\' tail on the glass' : 'brigades on the road'} at a run, and ${b102Nm(b102Who())} ${b102V(b102Who(), 'go', 'goes')} over on the slope in the dark. ${b102Nmc(b102Who())}'ll feel it on the march.`, fx:()=>bruise(b102Who(), bruiseN())},
              go:'b10_c2_edge_ok', fail:'b10_c2_edge_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c2_edge_ok:()=>({sp:'The edge', scene:'b10_c2_dusk', fx:()=>{ b102Watched('gone'); }, txt: b102Adj() ?
`The squad stands on the edge of the glass in a line and does not move. The last company tops the rise, and is against the last light, and goes over. Then the dust. Then nothing: the rise, empty, and the stars coming out over it.

"Seen," ${by({sgt:'you say', tobet:'Tobet says', _:'{who} says'})}, to nobody, and the squad turns round, and the foreigners' sergeants are waiting for it at the tail without saying anything about the wait. One of them nods.${b102If('tobet', `\n\nTobet has the count, and keeps it to himself. He cuts one notch in the tally-stick, and puts it away.`)}` :
`The squad stands on the edge of the rise in a line and does not move. Behind it the train goes south, wagon by wagon, and Ennic sends a runner, and then stops sending runners.

The tail of the column goes over the line onto the glass. Then the last few horsemen. Then nothing: wheel-ruts going out onto the pale, and the stars coming out over it, and the same stars, faintly, coming up out of the ground.

"Seen," ${by({sgt:'you say', tobet:'Tobet says', _:'{who} says'})}, to nobody, and then the squad turns round and goes to find the brigades.${b102If('tobet', `\n\nTobet has the count, and keeps it to himself. He cuts one notch in the tally-stick, and puts it away.`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b10_c2_edge_no:()=>({sp:'The edge', scene:'b10_c2_dusk', fx:()=>{ b102Watched('dark'); }, txt:
`It goes on longer than anybody thought it could. The light goes before ${b102Adj() ? 'the brigades do' : 'the column does'}, and the squad stands there in the dark watching shapes that might be soldiers and might be the dark itself, until nobody can say which, and then a runner comes from ${b102Adj() ? 'the foreigners\' tail' : 'Ennic'} and the squad has to go.

The dark took the last of them, not the distance. It still counts. ${b102Adj() ? 'Everybody on the edge saw them go.' : 'Everybody on the rise saw them go.'}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* 'count': Yelt at the water wagons by lamplight */
    b10_c2_count:()=>{ if (b102Watch() || b102Ph() !== 2) return {sp:'The water wagons', scene:'b10_c2_dusk', txt:
`Yelt's lamp is lit at the water wagons and the clerks are calling numbers down the row.${b102Watch() ? ' The Sixth has the edge tonight.' : ''}`,
        ch:[{t:'Back to the rise.', go:()=>startExplore()}]};
      if (S.f.b10_c2_countDone) return {sp:'Yelt', scene:'b10_c2_dusk', txt:
`Yelt has shut the book and is sitting with both hands flat on the cover, as if to keep something in. "Counted," he says. "Twice. I will sleep, now. On the wagon. Moving."`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]};
      return {sp:'Yelt', scene:'b10_c2_dusk', html:witnessHTML(), txt:
`Yelt has the lamp on a hook at the tailboard and the book open at a clean page, and the water wagons in a double row going away into the dusk. ${b102Adj() ? 'The Sixth\'s share is chalked on four of them, and two handcarts of its own are waiting to take it down to the glass.' : 'Every barrel the brigade owns is on them, and every barrel is going south tonight, and every barrel has to last.'}

"Once for the book," he says. "Once for the barrel. Every one. The Bolkando have been past three times today with their hands in their pockets, and the Grey Helms took their share at noon and a little more, and nobody wrote down the little more." He looks at the squad over the lamp. "We will. Start at the far end."${b102If('tirren', `\n\nTirren is already at the far end with her chalk, marking the horses' barrels on the staves.`)}${b102Here('brennet') ? `\n\nBrennet has come down from the train with his wagon-pin${b10In('brennet') ? '' : ', because barrels are barrels and the Sixth is the Sixth'}, and is knocking staves along the row, listening.` : ''}`,
        ch:[{t:'Count every barrel down the row, twice, by lamplight, as the light goes.', check:['wits', 17], req:()=>!S.f.b10_c2_countTried, fx:()=>{ S.f.b10_c2_countTried = 1; },
              edges:id=>[S.f.b10_c2_ledgerOk && trickBy('b10_c2_ledger') === id && ['Yelt\'s way: count it twice, believe the second', 2], id === 'perrit' && ['she does sums out loud, and the sums come out', 2], id === 'ilsa' && ['six years of ledgers, every line twice', 2], id === 'brennet' && ['he knows every barrel in the train by the sound of its staves', 2], id === 'tirren' && ['she has the horses\' water in chalk already', 1], id === 'sgt' && ['you have counted the company\'s stores every pay-day for years', 1], id === 'thegg' && ['he reads slowly, and the lamp is going down', -1], id === 'ruuk' && ['he will not look at writing', -1]],
              near:{t:()=>`Yes, but the row is long and the lamp is low, and the dust off the barrels is in everybody's eyes, and ${b102Nm(b102Who())} ${b102V(b102Who(), 'carry', 'carries')} the numbers down the road south and into sleep: rattled.`, fx:()=>b102Rattle(b102Who())},
              go:'b10_c2_count_ok', fail:'b10_c2_count_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c2_count_ok:()=>({sp:'Yelt', scene:'b10_c2_dusk', fx:()=>{ b102Counted('true'); }, txt:
`Barrel by barrel, down the row, in the last of the light and then by the lamp. ${by({sgt:'You tap', perrit:'Perrit taps', ilsa:'Ilsa taps', brennet:'Brennet knocks', _:'{who} taps'})} the staves and call${b102Who() === 'sgt' ? '' : 's'} the first number, and Yelt writes it, and then the second look, slower, and the second number, and Yelt crosses out the first.

By full dark it is done. The second count is smaller than the book by eleven barrels. Yelt looks at the eleven a while, and then writes beside them, very small: <em>Grey Helms, noon</em>.

"Now we know," he says. "Knowing is most of it." He shuts the book. ${b102Adj() ? '"The Sixth\'s share is on your carts. Every barrel. Don\'t let the foreigners count it for you."' : '"South, then. With the true number."'}${b102If('tirren', `\n\nTirren chalks a last mark on a stave: the horses' water, counted. "Now they're in the book," she says.`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b10_c2_count_no:()=>({sp:'Yelt', scene:'b10_c2_dusk', fx:()=>{ b102Counted('slow'); }, txt:
`It goes wrong halfway down the row, where two wagons were chalked the same number by somebody careless, and the count doubles back on itself and has to start again from the end. The light goes. The brigades start forming up on the road. Yelt does not hurry, and will not be hurried.

The count is done anyway, a long while after dark, with the train already moving round the squad. It is the true count. It took longer.${b102If('brennet', `\n\nBrennet finds the two wagons by the sound of their axles in the dark. "Same squeak," he says. "Different number." Yelt writes that down too.`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* the way on from dusk (the fire's, and the road's edge) */
    b10_c2_south:()=>({sp:b102Adj() ? 'Down onto the glass' : 'The road south', scene:'b10_c2_dusk', txt: b102DuskDone() ?
(b102Adj() ? `The squad goes down off the rise in the dark to the foreigners' tail, and the Sixth's carts, and the few Letherii who stayed. Ahead, the column is already on the glass. Underfoot, the dust gives way to grit, and the grit to something harder, and the starlight starts to come back up off it.` :
`The brigades are on the road, a long line of files going south in the dark, the train behind them with its lamps lit at the tailboards. Behind the squad, the rise is empty. Beyond it, to the north and east, the glass, and nothing on it at all.`) :
`${b102Adj() ? 'The foreigners\' tail is forming at the edge of the glass.' : 'The road south starts at the west end of the rise.'} The Sixth has the ${b102Watch() ? 'edge' : 'water wagons'} first.`,
      ch: b102DuskDone() ? [{t:b102Adj() ? 'Onto the glass, behind them.' : 'South, with the brigades.', onward:true, fx:()=>{ S.f.b10_c2_ph = 3; }, go:()=>{ startExplore('b10_c2_halt'); talk('b10_c2_halt_arrive'); }},
                             {t:'Not now.', go:()=>startExplore()}] :
        [{t:'Back to the rise.', go:()=>startExplore()}]}),

    /* ======== phase 3: the first night south (or the first halt on the glass) ======== */
    b10_c2_halt_arrive:()=>({sp:b102Adj() ? 'The first halt on the glass' : 'The first halt', scene:b102Adj() ? 'b10_glass_night' : 'b10_c2_halt', fx:()=>{ b102Thirst(); }, again:()=> b102Adj() ? 'The column halted on the glass, the Sixth\'s carts at its tail.' : 'The halt, the wagons in a rough ring, the horse-lines quiet.', txt: b102Adj() ?
`The column walks until somewhere past midnight, and halts, and sits down where it stands. The glass is warm underfoot still, giving back the day. Overhead there are more stars than anybody in the Sixth has seen, and underfoot, faintly, the same stars again, so that the column seems to be sitting on nothing in the middle of the sky.

The Sixth is at the very tail with its two carts and its few horses. Not one soldier up the column has said a word to it, or needed to.

${S.f.b10_c2_thirst && S.f.b10_c2_thirst !== 'none' && b10In(S.f.b10_c2_thirst) ? `${NAME(S.f.b10_c2_thirst)} has the thirst already, the first night: split lips and a dry tongue and a mouthful from the skin at the halt that does nothing at all. Everybody looks at the skin, and everybody takes one mouthful and no more.` : 'The thirst comes early on the glass. Everybody looks at the skins at the halt, and nobody takes more than a mouthful.'}${b102If('tirren', `\n\nTirren goes down the Sixth's few horses one by one with her hand on each neck. "They don't like it," she says. "The ground's wrong. It's too even. Nothing is that even."`)}` :
`The brigades march south until near midnight, and halt on a flat stretch of nothing in particular, and the train draws its wagons up in a rough ring and puts its horses on a picket inside it. To the south the brigades' fires come up in a long line. To the north, where the glass is, there is no light at all, and the soldiers keep their backs to it.

On the march a horse went down in the traces of a wagon two ahead of the Sixth's, and did not get up. It is lying at the end of the picket now, where they dragged it.${b102If('tirren', ` Tirren knew before it went down. She was walking beside it for the last hour, with her hand on its neck.`)}

Out in the dark, beyond the ring, something is moving round the dead horse. More than one something.`,
      ch:[{t:'The halt.', go:()=>startExplore()}]}),

    /* the dead horse at the picket's end: the dogs (optional) */
    b10_c2_carcass:()=>{ const done = !!S.f.b10_c2_dogsDone;
      if (b102Ph() !== 3) return {sp:'The horse-lines', scene:'b10_c2_halt', txt:`The end of the picket.`, ch:[{t:'Back.', go:()=>startExplore()}]};
      if (done) return {sp:'The dead horse', scene:b102Adj() ? 'b10_glass_night' : 'b10_c2_halt', txt:
`The dead horse is where it was, and nothing is at it now. ${b102If('tirren', 'Tirren has put a blanket over its head, which is not a thing a farrier needs to do, and done it anyway.') || 'Somebody has put a blanket over its head.'}`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]};
      return {sp:'The dead horse', scene:b102Adj() ? 'b10_glass_night' : 'b10_c2_halt', txt:
`${b102Adj() ? 'One of the Sixth\'s horses lay down at the halt and will not get up again, and is lying at the end of the picket on the glass.' : 'The dead horse lies at the end of the picket, a dark heap just past the firelight.'} Round it, low to the ground, four shapes: dogs, or what dogs become left unfed too long, lean and grey-brown and quiet. They have followed the column from somewhere for exactly this. The live horses on the picket are pulling at their ropes.${b102If('tirren', `\n\nTirren is on her feet with the hammer. "Not near the picket," she says. "If they spook the line, we lose three more."`)}`,
        ch:[{t:'Put them off it.', go:()=>startBattle('b10_c2_dogs', {})},
            {t:'Leave it to them. It\'s only meat now.', fx:()=>{ S.f.b10_c2_dogsLeft = 1; }, go:'b10_c2_dogs_left', req:()=>!S.f.b10_c2_dogsLeft},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c2_dogs_left:()=>({sp:'The dead horse', scene:b102Adj() ? 'b10_glass_night' : 'b10_c2_halt', txt:
`The squad goes back to the fire. Behind it the dogs go about their business, and the live horses on the picket pull at their ropes all night, and nobody sleeps well. It is only meat now. Everybody says so. Everybody hears it anyway.`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b10_c2_dogs_after:()=>({sp:'The dead horse', scene:b102Adj() ? 'b10_glass_night' : 'b10_c2_halt', fx:()=>{ S.f.b10_c2_dogsDone = 1; }, txt:
`The dogs go off into the dark the way they came, low and quick, the ones that can, and do not come back while the squad is watching. The horses on the picket stop pulling.${b102Say({tirren:`\n\nTirren puts a blanket over the dead horse's head. She does not say why, and nobody asks. Then she takes the chalk out and makes a mark on the inside of her apron, low down, with the others.`, sorvan:`\n\nSorvan stands by the dead horse a while. "Bluerose burned theirs," he says. "So nothing could have them." There is nothing out here to burn.`, _:''})}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* the Sixth's barrels at the halt: on 'adjunct', the stragglers who will not cross (the main fight) */
    b10_c2_barrels:()=>{ if (b102Ph() !== 3) return {sp:'The barrels', scene:'b10_c2_halt', txt:`The Sixth's water barrels.`, ch:[{t:'Back.', go:()=>startExplore()}]};
      if (!b102Adj()) return {sp:'The water barrels', scene:'b10_c2_halt', txt:
`The brigade's water barrels, lashed on their wagons inside the ring, ${S.f.b10_c2_counted ? 'every one counted twice and the true number in Yelt\'s book' : 'every one in Yelt\'s book'}. A train-guard with one of the new long spears sits on the tongue of the nearest, awake.`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]};
      if (S.f.b10_c2_desDone) return {sp:'The Sixth\'s barrels', scene:'b10_glass_night', txt:
`The Sixth's barrels on its two carts, roped and covered, and a soldier of the squad on watch beside them now, all night, every night.`,
        ch:[{t:'Back to the circle.', go:()=>startExplore()}]};
      return {sp:'The Sixth\'s barrels', scene:'b10_glass_night', txt:
`Up the dark column, shapes are coming down toward the tail: five or six soldiers in the foreigners' kit, walking quickly and not together, with empty skins on their shoulders. They do not go to their own company's wagons. They come straight down the column toward the Sixth's carts, because the Sixth is Letherii, and few, and last.

A big one at their front has a cudgel and a corporal's knot on his shoulder.${b102If('tirren', `\n\nTirren stands up by the horses. "They want the water," she says. "They want to go back."`)}`,
        ch:[{t:'"Sixth. On the carts." Stand in front of the water.', go:()=>startBattle('b10_c2_deserters', {})},
            {t:'Go out to meet them along the dark side of the column, and be on their flank before the big one sees.', check:['guile', 17],
              edges:id=>[id === 'kaedra' && ['she has crossed open ground at night all her life', 2], id === 'ruuk' && ['he walks ahead and waits, quietly, for a living', 1], id === 'pessa' && ['canal folk move at night without a lamp', 1], id === 'tobet' && ['he shot birds from cover for years', 1], id === 'thegg' && ['on the glass there is no dark side big enough for him', -1], id === 'sorvan' && ['blue scale in starlight is a lantern', -1]],
              near:{t:()=>`Yes, but the glass is slick with the night's cold, and ${b102Nm(b102Who())} ${b102V(b102Who(), 'go', 'goes')} down hard on it getting there. ${b102Nmc(b102Who())}'ll carry that into the fight.`, fx:()=>bruise(b102Who(), bruiseN())},
              go:()=>startBattle('b10_c2_deserters', nearMiss() ? {} : {surprise:'p'}), fail:'b10_c2_barrels_seen'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c2_barrels_seen:()=>({sp:'The Sixth\'s barrels', scene:'b10_glass_night', txt:
`The big one sees the squad coming against the stars, and says something short, and the others spread out on the glass, and the cudgels come off their shoulders.`,
      ch:[{t:'Shields up.', go:()=>startBattle('b10_c2_deserters', {surprise:'e'})}]}),

    /* ======== the Witness beat: at the fire on the first night ======== */
    b10_c2_beat:()=>({sp:b102Adj() ? 'The Sixth\'s circle' : 'The squad\'s fire', scene:b102Adj() ? 'b10_glass_night' : 'b10_c2_halt', html:witnessHTML(), txt:
`${b102Adj() ? 'The circle is quiet. Up the column the foreigners are asleep, or sitting up with their arms round their knees, which is what soldiers do when they cannot sleep. East, the glass goes on in the starlight.' : 'The fire is small and nobody feeds it. To the north, where the glass is, there is no light at all. Somewhere out on it, the foreigners are walking.'}

${b102Say({perrit:'Perrit has her hand on the tile-pouch. "The tile said somebody should watch them," she says. "Somebody did. Now I want to know why I watched."', tobet:'Tobet is turning the tally-stick over in his fingers. "Sergeant," he says, half a step behind, the way he says everything. "Why are they going?"', thegg:'Thegg looks at the dark north for a while. Then at you. "You are the sergeant," he says. "You ask it."', _:'Somebody in the squad looks at you across the fire, waiting.'})}

${b102Adj() ? 'Why are they going? And why are we?' : 'Why are they going?'}`,
      ch:[{t:'"They\'ve a reason we haven\'t been told. That\'s enough for soldiers."', fx:()=>{ b10Beat('kept', 'a reason nobody told them'); S.f.b10_c2_beat = 'reason'; }, go:'b10_c2_beat_done'},
          {t:b102Adj() ? '"The Commander let us follow. That will do."' : '"The Commander asked us to follow. That will do."', fx:()=>{ b10Beat('kept', 'the Commander asked'); S.f.b10_c2_beat = 'commander'; }, go:'b10_c2_beat_done'},
          {t:'"Foreigners. Mad, the lot of them. Don\'t look for more."', fx:()=>{ b10Beat('doubt', 'foreigners, mad'); S.f.b10_c2_beat = 'mad'; }, go:'b10_c2_beat_done'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b10_c2_beat_done:()=>{ const w = S.f.b10_c2_beat, adj = b102Adj();
      return {sp:adj ? 'The Sixth\'s circle' : 'The squad\'s fire', scene:adj ? 'b10_glass_night' : 'b10_c2_halt', html:witnessHTML(), txt:
`${w === 'reason' ? b102Say({perrit:'Perrit nods slowly. "A reason we have not been told," she says. "The tiles are like that. I have lived with it." She almost smiles. "I can live with it a while longer."', tobet:'Tobet nods. "Not told," he says. "Doesn\'t mean there isn\'t one." He puts the tally-stick away. "Holder never told me why the plough. There was still a plough."', tirren:'Tirren nods. "Horses never get told either," she says. "They go if the one ahead goes, and the one ahead knows something. Usually."', _:'The squad shifts a little closer round the fire. Not much. Enough.'})
  : w === 'commander' ? b102Say({thegg:'Thegg nods, once, slowly. "The Commander asked," he says. "He came back from the river too." That seems to be enough for Thegg.', ilsa:'Ilsa nods. "I have read a great many orders," she says. "His are the first I have not wanted to read twice."', sorvan:'Sorvan nods. "He rides at the front," he says. "Bluerose follow the one who rides at the front."', _:'Somebody at the fire says "the Commander" back, quietly, as if testing whether it would hold weight. It does.'})
  : b102Say({pessa:'Pessa laughs, short. "Mad," she says. "Good. I understand mad." She lies back down. "It\'s the sane ones you want to watch."', tobet:'Tobet nods. "Mad," he says. He does not sound sure. He looks north anyway.', brune:'Brune looks at the fire and shrugs, which from Brune is an answer.', _:'Somebody at the fire laughs, short, at a thing that is not funny.'})}${b102If('tirren', w !== 'mad' ? `\n\nTirren is looking toward the horse-lines. "We're going too," she says. "I keep forgetting that part."` : '')}

${adj ? 'Up the column, the foreigners\' sergeants start calling the step. The halt is over.' : 'The fire goes down. To the south the brigades\' fires go out one by one along the line.'}`,
        ch:[{t:'Back to the fire.', go:()=>startExplore()}]}; },

    /* the way on from the first night: the road south ('escort'), or on into the glass ('adjunct': the end) */
    b10_c2_onroad:()=>{ const ph = b102Ph();
      if (ph === 4) return {sp:'The road south', scene:'b10_south', txt: S.f.b10_c2_joined ?
`The road goes on south, a line of trodden ground between the files, and the column goes on along it at the pace of its slowest horse. Along the east flank, keeping pace without trying, walk the big ones.` :
`The road goes on south. The horses do not want to, and keep turning their heads east. Something along the flank first.`,
        ch: S.f.b10_c2_joined ? [{t:'South, the long way round.', onward:true, go:'b10_c2_onward'}, {t:'Not now.', go:()=>startExplore()}] : [{t:'Back to the column.', go:()=>startExplore()}]};
      if (ph !== 3) return {sp:'The road', scene:'b10_c2_halt', txt:`The road.`, ch:[{t:'Back.', go:()=>startExplore()}]};
      return {sp:b102Adj() ? 'The glass' : 'The road south', scene:b102Adj() ? 'b10_glass_night' : 'b10_c2_halt', txt: b102HaltDone() ?
(b102Adj() ? `Up the column the step is being called, and the foreigners are getting up off the glass in their files, and the Sixth's carts creak into motion at the tail, going east under the stars.` : `South of the ring the road goes on into the dark, toward first light and whatever is south of here. The brigades will march at dawn.`) :
`The column's tail is quiet. The Sixth's barrels first. Something is coming down the column toward them.`,
        ch: b102HaltDone() ? [{t:b102Adj() ? 'On, into the glass.' : 'First light. The road south.', onward:true, go:()=>{ if (b102Adj()) talk('b10_c2_onward'); else { S.f.b10_c2_ph = 4; startExplore('b10_c2_road'); talk('b10_c2_road_arrive'); } }},
                             {t:'Not now.', go:()=>startExplore()}] :
          [{t:'Back to the circle.', go:()=>startExplore()}]}; },

    /* ======== phase 4 ('escort'): the road south, the big ones ======== */
    b10_c2_road_arrive:()=>({sp:'The road south', scene:'b10_south', fx:()=>{ S.f.b10_c2_road = 1; }, again:()=>'The column on the road south, the horses\' heads down.', txt:
`South, then, by day as well as night, because the Commander means to make up the ground the glass would have saved. The road is mostly an idea: a line of trodden grit where the files ahead have been, going away south through dry country with low scrub and stones and, somewhere, water.

Far ahead, the Grey Helms' dust, very straight. Behind them, the Bolkando, trying to keep up. Behind the Bolkando, the brigades of Lether, trying to keep up with the Bolkando. The train last. The Sixth with the train.

On a morning like the others, the horses start turning their heads east, all together, and will not stop.${b102If('tirren', `\n\nTirren has stopped walking. "Something's coming," she says. "Something big. They can smell it." She is already going to the nearest horse.`)}`,
      ch:[{t:'The column.', go:()=>startExplore()}]}),
    b10_c2_flank:()=>{ if (S.f.b10_c2_joined) return {sp:'The east flank', scene:'b10_south', txt:
`Along the east flank of the column, a stone's throw off, the big ones walk: tall, grey-green, leaning forward as they go, with a stride that eats the ground and no hurry in it. The horses have stopped looking at them, mostly. The soldiers have not.`,
        ch:[{t:'Back to the column.', go:()=>startExplore()}]};
      return {sp:'The east flank', scene:'b10_south', html:witnessHTML(), txt:
`East of the column there is dust coming: not the Grey Helms' straight dust, but a broad low cloud, moving fast, coming in at an angle across the dry country toward the column's flank.

Then the shapes in it. Tall, taller than a horse, walking upright and leaning forward, grey-green as old bronze, with long heads and longer tails and a stride that eats the ground. Dozens. More. And among them, far off and small, two riders on ordinary horses, in foreign kit, riding with them as easily as with a herd of cattle.

Every horse on the train's picket screams at once.${b102If('tirren', `\n\nTirren is in among the horse-lines already, with a hand on a halter and her voice going low and steady. "Hold them," she says. "Heads down. Talk to them. Don't let them see your face."`)}`,
        ch:[{t:'Get into the horse-lines and hold them, rope and halter, while the big ones go by.', check:['might', 17],
              edges:id=>[id === 'tirren' && ['the horses know her voice before they know their own fear', 2], id === 'sorvan' && ['a Bluerose lancer has held a picket in a stampede', 2], id === 'brennet' && ['he has held a team on a bad road', 1], id === 'thegg' && ['he is heavier than most horses', 1], id === 'perrit' && ['she is built for sums, not halters', -1], id === 'ilsa' && ['a clerk holds paper', -1]],
              near:{t:()=>`Yes, but a big bay goes up on its hind legs at the end of the line and comes down on ${b102Nm(b102Who())}, glancing, and ${b102Nm(b102Who())} ${b102V(b102Who(), 'hold', 'holds')} on anyway. ${b102Nmc(b102Who())}'ll feel that a while.`, fx:()=>bruise(b102Who(), bruiseN())},
              go:'b10_c2_flank_ok', fail:'b10_c2_flank_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b10_c2_flank_ok:()=>({sp:'The horse-lines', scene:'b10_south', fx:()=>{ b102Joined('held'); }, txt:
`The line holds. ${by({sgt:'You have', tirren:'Tirren has', sorvan:'Sorvan has', _:'{who} has'})} two halters and a rope round a wrist, and the horses are shaking and wet-eyed and going nowhere, and the big ones come in alongside the column at a walk and fall into pace with it as if they had been told where to stand.

They do not look at the horses. They do not look at anything much. They walk.${b102If('tirren', `\n\nTirren is still talking to the horses, low, the same few words over and over. She has not looked at the big ones once. "Later," she says, when somebody asks her what she thinks. "When the horses have stopped."`)}`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),
    b10_c2_flank_no:()=>({sp:'The horse-lines', scene:'b10_south', fx:()=>{ b102Joined('bolted'); }, txt:
`The picket goes. Three horses at once pull their pegs and go west across the dry country with the rope trailing, and half the train goes after them, and the big ones come in alongside the column at a walk through the dust the horses raised, and fall into pace with it, as if they had been told where to stand.

The horses come back by noon, most of them, on their own, thirsty. They were always going to. There is nowhere else out here to go.`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),
    b10_c2_ennic_road:()=>({sp:B5_FINADD.name, scene:'b10_south', fx:()=>{ S.f.b10_c2_word = 1; }, again:()=>`${b102Ennic()}, walking with the train, looking at the big ones.`, txt:
`Ennic is walking beside the train with his horse led behind him, because the horse would not be ridden past the big ones. He has the slate under his arm and is looking at the flank.

"Che'Malle," he says. "That is the word the staff used. Allies, they said. They came out of the east with those two foreign sergeants, and they march with us now." He watches them a while. "I wrote it down. I find I do not know what else to do with it."

He looks at the squad. "In Letheras there are stories about lizards that walked like men, from before the first emperor. Children's stories. I never believed them." He tucks the slate away. "I am going to stop saying what nobody believes. It keeps walking alongside me."${b102If('perrit', `\n\nPerrit is looking at the big ones with an expression the squad has not seen on her before. "The Holds have nothing for them," she says. "Nothing at all. They are older than the tiles."`)}${b102If('ruuk', `\n\nRuuk has climbed onto a wagon to see better. "My grandmother never said anything about these," he says, with deep satisfaction. "I am going to tell her."`)}`,
      ch:[{t:'Back to the column.', go:()=>startExplore()}]}),

    /* ======== the end ======== */
    b10_c2_onward:()=>({sp:b102Adj() ? 'Into the glass' : 'The long way round', scene:b102Adj() ? 'b10_glass_night' : 'b10_south', html:witnessHTML(), txt: b102Adj() ?
`The column walks east into the glass through the rest of the night, and the Sixth walks at its tail with its two carts and its few horses, and nobody up the column turns round to see if it is still there. It is.

The glass goes on. The stars go on, above and below. At the halts the skins come round and everybody takes one mouthful, and the foreigners' sergeants count their files, and the Sixth counts its own${S.f.b10_c2_counted ? ', and its barrels, twice' : ''}.${b102If('tirren', `\n\nTirren walks at the head of the Sixth's horses with her hand on the first one's neck. She has not said which one she means to bring home. She talks to all of them the same.`)}${b102Say({tobet:'\n\nTobet walks half a step behind, as always, and every so often looks back west, where there is nothing to see.', perrit:'\n\nPerrit has her hand on the tile-pouch as she walks. "Quiet," she says, once, to nobody in particular. "Very quiet."', _:''})}` :
`The column goes on south through the dry country, the Grey Helms' dust very straight ahead, the Bolkando behind it, the brigades behind them, the train last, and along the east flank, tall and quiet and keeping pace without trying, the big ones.

Somewhere at the head of it, too far off to be more than a colour, the Commander's banner. Somewhere far to the north and east, on the glass, the foreigners. The road between is long, and has water in it somewhere, and every horse on it is dying slowly.

${S.f.b10_c2_watched ? 'The Sixth saw them go. It is the only thing in Lether\'s army anybody can say for certain about the foreigners, and the Sixth can say it.' : 'Every barrel in the brigade has been counted twice, and the true number is in Yelt\'s book. It is the only certain thing on the road, and the Sixth made it so.'}${b102If('tirren', `\n\nTirren walks at the horse-lines with her hand on Copper's neck. She has not said which one she means to bring home. She talks to all of them the same.`)}${b102Say({tobet:'\n\nTobet walks half a step behind, as always, and every so often looks back north, where there is nothing to see.', thegg:'\n\nThegg walks at the column\'s edge nearest the big ones, between them and the squad, without being asked.', _:''})}`,
      ch:[{t:b102Adj() ? 'East, into the glass.' : 'South, the long way round.', onward:true, go:()=>chapterEnd(2, b102Key() || 'watch')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};

/* the foreigners seen to go, once, by either road through the check: the key's Witness (the brief: 'saw them go') */
function b102Watched(how){ if (S.f.b10_c2_watchDone) return; S.f.b10_c2_watchDone = how; b10Witness(1, 'saw them go'); save(); }
/* every barrel counted, once */
function b102Counted(how){ if (S.f.b10_c2_countDone) return; S.f.b10_c2_countDone = how; save(); }
/* the big ones in along the column, once */
function b102Joined(how){ if (S.f.b10_c2_joined) return; S.f.b10_c2_joined = how; save(); }
/* the thirst, on 'adjunct' only, once: the first night on the glass (the brief) */
function b102Thirst(){ if (!b102Adj() || S.f.b10_c2_thirst) return; const id = b10ThirstPick(); S.f.b10_c2_thirst = id && b10Thirst(id) ? id : 'none'; save(); }
