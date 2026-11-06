/* ============ Book Seven, Chapter 6: Before the Walls ============ */
/* The Letherii: Book Five's squad of the Sixth Company, Whitefinder Battalion, in the army of Lether before Letheras (Reaper's Gale ch 22 and
   the battle canon tells after the fact; rg-canon correction 2, §3; W22, R24.1 S1, S9, S10). The battle before Letheras is two fights:
   the killing field (Letherii mages on a ridge, watched by the Chancellor's man and a veteran commander, loose a ritual a week in the making
   on the foreigners' circle out on the plain, meant to kill the foreigners and their own Edur together; a silver dome far off holds it; the
   Edur walk home), and, days later, the Adjunct's landing on the river, where the Letherii army breaks (told after the fact in the novel:
   free margin). The Sixth stands in the line below the ridge and never on it; sees the dome from far off and never the circle; and meets the
   Adjunct's regulars at the river, never marines and never the Third.
   Phase 1, the night before, in the line below the ridge: the Sixth's place (the reading, B7READ[6], the Gate), Finadd Ennic, the clerk
   and b7HeatTier() (a watched squad sleeps badly; the man in the grey coat at the next fire), a levy who carried water to the ridge
   (rise:true), and the Chapter 4 visitor: on 'edur' the eldest Edur (hold our picket while we are gone), on 'letherii' the captain (when
   the Edur go out onto the plain, the Sixth stays in the line, whoever says otherwise). Phase 2, dawn: the Edur go out; the trick (The
   Cadre's Ward); the wave off the ridge and a silver dome on the horizon; the Edur walk home; deserters running from the ridge
   (b7_c6_deserters, optional). Phase 3, the river: the Adjunct's soldiers off the ships (b7_c6_landing, main, stage 2), and the key as the
   line wavers, S.f.b7_c6_key: 'stand' (b7_c6_stand, a Malazan sergeant's squad) or 'break' (b7_c6_break, crossbows on the bank, a running
   fight; b7Rise(1)). Phase 4, under the walls of Letheras at night: the Letherii's road, S.f.b7_lethRoad (army / palace / free). This is
   the Letherii's last chapter: B7CH6.fates holds their fate pages for Ch7's finale (Book Six's corrected shape). Notes: docs/rg-ch6-notes.md. */
/* FOR THE ARTIST (126b): names this file uses.
   Items: ART['item/b7_c6_ridgecharm'], ['item/b7_c6_fingershield'].
   Figures: b7_malregular (the Adjunct's regular seen from the Letherii side: a grey-green cloak over mail, a half-helm, a big round shield,
   a short sword), and its two variants b7_malxbow (a heavy crossbow) and b7_malsgt (a sergeant: a heavier helm, a cloak pinned at the
   shoulder, a whistle on a cord). Reused: b5_c1_ennic, b5_c1_clerk, b5_c1_tilewoman, b5_edur (the eldest, the Edur going home),
   b5_letherii (the captain, the escort), b5_c5_refugee (the levy, deserters, refugees), b7_agent (the man in the grey coat).
   Backdrops: b7_field and b7_river (120's, yours), and two this file adds that borrow until drawn: b7_c6_dome (the plain at dawn from the
   line, the ridge on the right, and far out on the horizon a silver hemisphere with white light breaking over it), b7_c6_walls (the walls
   of Letheras at night from outside: towers, smoke, a glow over a quarter, a road with people on it coming out).
   Ground: TILEX.b7_c6_field (this chapter's: b5_c6_lines's . , = F, plus R the ridge's scree foot, ^ the ridge path, p the stake line
   facing the plain, > the plain's edge, W the city wall, G a gate). Explore at the river on b5_c3_bank (. path , reeds ~ river # rock
   x dead tree ^ the water's edge). Fights: b5_c6_lines (the deserters), b5_c3_bank (the landing, the stand, the break; 'o' the river).
   Battle 't' is cover. */

/* ---- small helpers (b76: Book Seven, Chapter Six) ---- */
const b76L = (id, n) => { if (b7In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b76Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b7In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b76If = (id, s) => b7In(id) ? (typeof s === 'function' ? s() : s) : '';
const b76Who = () => (ROLL() && ROLL().who) || 'sgt';
const b76Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b76Nmc = id => id === 'sgt' ? 'You' : NAME(id);
const b76And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b76Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
/* the phase: 1 the night before, in the line below the ridge; 2 dawn on the field; 3 the river; 4 under the walls of Letheras, night */
const b76Ph = () => S.f.b7_c6_ph || 1;
const b76Key = () => S.f.b7_c6_key || null;
const b76Road = () => S.f.b7_lethRoad || null;
/* Chapter 4's key decides where the Sixth stands and who it trusts; unset reads as 'edur' (Chapter 4's own default) */
/* the Finadd on the bank (continuity read): after the key he leads on, so a "Not now" at the key's fight or its after-node is never a dead end */
const b76BankNode = () => !S.f.b7_c6_landingDone ? 'b7_c6_bank_ennic' : !b76Key() ? 'b7_c6_key'
  : b76Key() === 'stand' ? (S.f.b7_c6_standDone ? 'b7_c6_stand_after' : 'b7_c6_key_stand') : (S.f.b7_c6_breakDone ? 'b7_c6_break_after' : 'b7_c6_key_break');
const b76K4 = () => S.f.b7_c4_key === 'letherii' ? 'letherii' : 'edur';
const b76Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b7In(id));
/* the night before: a squad whose file is watched or wanted has the man in the grey coat at the next fire */
const b76Watched = () => ['watched', 'wanted'].includes(b7HeatTier());
/* who teaches the Cadre's Ward: Perrit (the Holds), else Ammet (the surgeons' smoke of burning bedding), else the cadre's old escort */
const b76Teach = () => b7In('perrit') ? 'perrit' : b7In('ammet') ? 'ammet' : 'escort';
const b76TeachNm = () => ({perrit:'Perrit', ammet:'Ammet', escort:'The old escort'})[b76Teach()];

/* ---- The Cadre's Ward: A Courtesy of Darkness (dark, t_dark), in a cadre mage's words. The cadre puts a ward of the Holds over a stretch of
   the line so the other side's archers lose it: a grey that sits on the ground and will not be seen through. The surgeons' tents learned
   the line soldier's version of it years ago: a pot of wet bedding on a fire makes a smoke that lies low and hides a stretcher party. Once
   a fight: a 3×3 of grey within 5, for 2 rounds (3 from level 5). Nothing shoots into it, out of it or through it, and enemies standing in
   it are −2 to hit. ---- */
Object.assign(TRICKS, {
  b7_c6_ward:{name:'The Cadre\'s Ward', ch:6, use:'fight', ab:'t_b7_c6_ward', where:'the line below the cadre\'s ridge, at dawn, with something being built over everyone\'s heads',
    lore:'The cadre is taught to put a ward of the Holds over a stretch of the line before a battle: a grey that sits on the ground and that no archer on the other side can see through, so the bows lose the line and shoot at nothing. It is the first thing a cadre mage learns that is any use, and the last thing the army thanks them for. The surgeons\' tents learned the soldier\'s version of it long ago: a pot of wet bedding on a fire makes a smoke that lies low and hides a stretcher party. Either way the trick is the same. Put the grey where the bows are looking.',
    get fx(){ return `Once a fight: a 3×3 of grey within 5, for ${2 + lvAt(5)} rounds, a ward of the Holds or a pot of wet bedding, whichever the bearer knows. Nothing shoots into it, out of it or through it, and enemies standing in it are −2 to hit. Grows with level.`; }},
});
Object.assign(AB, {
  t_b7_c6_ward:{name:TRICKS.b7_c6_ward.name, trick:'b7_c6_ward', aoe:1, range:5, smoke:true, darkness:true, desc:()=>TRICKS.b7_c6_ward.fx,
    run(u, x, y){ AUDIO.play('shadow'); sparks(x, y, 22, '#9aa0aa', .5);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (!solid(x + dx, y + dy)) B.smoke.push({x:x + dx, y:y + dy, until:B.round + 2 + lvAt(5), dark:true, g:'w' + B.turn + ':' + x + ',' + y});
      blog(`${u.name} puts the grey down over the ${placeWord(B.def)}, the cadre's way or the surgeons', and the bows on the other side lose what they were looking at.`);
      updBattleUI(); afterAct(); }},
});

/* ---- a foe of this chapter's own: Letherii deserters running from the ridge (the brief's "your own"), and the Malazans' own figures ---- */
Object.assign(FOES, {
  b7_c6_deserter:{name:'Deserter', kind:'b5_letherii', sig:'d', hp:18, ac:13, atk:5, dmg:[1,8,1], rng:1, mv:4, init:1, verb:'cuts, wild, at'},
});
/* the brief: Ch6 draws the kind b7_malregular (a Malazan regular seen from the Letherii side); the crossbowman and the sergeant wear it too */
FOES.b7_malregular.kind = 'b7_malregular'; FOES.b7_malxbow.kind = 'b7_malxbow'; FOES.b7_malsgt.kind = 'b7_malsgt';

/* ---- borrowed pictures until 126b: the figures, two scenes, the ground and the two items ---- */
if (typeof FIGX !== 'undefined') ['b7_malregular', 'b7_malxbow', 'b7_malsgt'].forEach(k => { FIGX[k] ??= (ctx, h, t, o) => (FIGX.b2soldier || (() => {}))(ctx, h, t, o); });
{ const like = {b7_c6_dome:'b7_field', b7_c6_walls:'b7_letheras'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b7_c6_field ??= (...a) => (TILEX.b5_c6_lines || (() => {}))(...a);
if (typeof ART !== 'undefined') [['b7_c6_ridgecharm', 'b5_c5_girth'], ['b7_c6_fingershield', 'b5_c5_girth']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the words this chapter adds to Book Seven's glossary ---- */
GLOSSX.rg.push(
  [6, 'The ridge', 'The long low rise west of the field before Letheras where the cadre worked for a week before the battle, under guard, with the Chancellor\'s man watching. The army was told nothing of what was built there.', ()=>!!(S && S.f && S.f.b7_c6_ph)],
  [6, 'The landing', 'The foreigners\' main army, come up the river by ship to the bank below Letheras days after the field. The Letherii army marched to meet it there, and broke.', ()=>!!(S && S.f && (S.f.b7_c6_ph || 0) >= 3)],
  [6, 'Malazan regulars', 'The foreigners\' line infantry, as the Letherii met them at the river: grey-green cloaks over mail, round shields, short swords, and crossbows that put a quarrel through a shield and the man behind it.', ()=>!!(S && S.f && S.f.b7_c6_landingDone)]);

/* the fire is a roster fire (38c) */
ROSTER_FIRES.rg = ROSTER_FIRES.rg || {}; ROSTER_FIRES.rg[6] = ['b7_c6_fire'];

/* the reading: the line before the ridge, in the last hour before dawn, the Gate */
B7READ[6] = {scene:'b7_field', where:'a shield laid flat in the grass of the line', set:'The line below the ridge, the last hour before dawn, the whole army of Lether asleep in its places, and out on the plain a ring of foreign fires.', back:'b7_c6_fire', backT:'Back to the fire.',
  say:{perrit:'"On a shield," Perrit says, and lays it flat in the grass. "The Holds are loud tonight. Something on the ridge is pulling at all of them at once." She keeps her face from it. "Three tiles. Quick, Sergeant. Before it finishes."',
       tilewoman:'"Came out with the surgeon\'s cart again," the old woman says, settling by the shield. "Last time I read for an army it was the night before Brans Keep." She holds out a hand. "A dock. I don\'t do refunds after battles."'}};

/* ---- the Letherii's fate pages, for Ch7's finale (B7CH6.fates; shape in docs/rg-ch6-notes.md, as Book Six's B6CH6.fates). The Letherii's
   half of the save is S while they play and S.th.l while the Third does (Ch7); every page reads that half for names and loyalty, and the
   shared S.f for the keys and the road. ---- */
const b76Half = () => !S ? null : (S.book === 'rg' && (S.thread || 't') === 'l') ? S : ((S.th && S.th.l) || null);
const b76RoadOf = () => { const r = S && S.f && S.f.b7_lethRoad; return B7_LETHROADS.includes(r) ? r : 'army'; };
const b76KeyOf = () => (S && S.f && S.f.b7_c6_key) === 'break' ? 'break' : 'stand';
const B76_ROAD = {
  army:{title:'The army', scene:'b7_field'},
  palace:{title:'The palace', scene:'b7_letheras'},
  free:{title:'Out', scene:'b7_river'}};
/* each squadmate's page: (road, key, loyalty) → {title, txt}. Every one reads right on all three roads and both keys. */
const B76_FATE = {
  tobet:(r, k, l) => ({title:'The bowman', txt:
    (r === 'army' ? `Tobet stays in the army of the new Lether, and on the first pay-day the purser counts his whole pay into his hand, with nothing taken out for a ledger, because nobody can find the ledger. Tobet stands at the table counting it until the soldier behind him coughs. That summer a Malazan sergeant teaches the Letherii bowmen the crossbow. Tobet learns it, and goes back to the bow.`
     : r === 'palace' ? `Tobet stands a post at the palace, half a step behind the soldier in front of him, as he always has. There are more chairs with arms on them in that building than on every farm he ever worked. He does not sit in one. He cuts a notch in the tally-stick for every day of it, and stops counting at a hundred, and keeps the stick.`
     : `Tobet walks back to the farm his grandfather borrowed against for a plough. The man who held the debt is gone, and his ledger with him, and nobody in the valley is quite sure any more who owns the field. Tobet ploughs it anyway. He never does find the plough.`)
    + (k === 'break' ? ` He does not talk about the bank. When somebody else does, he goes and counts his arrows.` : ` He talks about the river once, to a levy who asks, and says only that the Sixth stood, and that it was the sergeant's doing.`)
    + (l >= 2 ? ` He still walks half a step behind you when you are in the same street. You have stopped asking him not to.` : '')}),
  thegg:(r, k, l) => ({title:'The shield', txt:
    (r === 'army' ? `Thegg stays with the army. The Malazan sergeants who come in to train it take one look at him and put him at the front of every drill, which is where he was going anyway, and one of them, a short woman with a voice like a gate, says something to him in her own tongue that makes him laugh out loud for the first time in the Sixth's memory.`
     : r === 'palace' ? `Thegg stands a palace door, and turns sideways for it every morning, and the new emperor's household have stopped staring and started saying good morning to him, which he answers, gravely, to every one of them.`
     : `Thegg goes out to the pit towns beyond the walls to tell his mother's people that the Edur are gone. Most of them already knew. He stays a season, and pays the tavern, and comes back into the city for the winter, very calm, saying nothing about what he found.`)
    + (S.f.b7_c4_key === 'edur' ? ` He looked up at an Edur once, on a picket, and was looked up at in turn. He talks to his mother's dead about it some nights.` : ` At night he still talks to his mother's dead, low, in her tongue. There are no new names in it.`)}),
  perrit:(r, k, l) => ({title:'The cadre mage', txt:
    (r === 'army' ? `Perrit stays with the army, and the cadre that is left asks her to teach, because so few of the cadre who stood on the ridge came down it fit to. She teaches the ward first and the lightning last. She never says what she felt through the Holds the morning the light went out over the plain, except once, to Ammet, and Ammet has not repeated it.`
     : r === 'palace' ? `Perrit takes the palace post and finds there is a cadre mage's place on every door of it, against whatever the last emperor's household were afraid of. She sits at hers with her tiles in her lap and corrects the household's arithmetic, out loud, until the steward stops sending his accounts past her door.`
     : `Perrit goes back to the Pursers' District with the cadre school's ledger in her head. The school's street burned the week the city turned over, and there is no ledger left to pay. She does the sum anyway, every quarter-day, and puts the coins in a jar on her mother's shelf, because a sum is a sum.`)
    + (k === 'break' ? '' : ` She laid three tiles the night after the river. The Gate came up twice. She put them away without a word.`)}),
  ammet:(r, k, l) => ({title:'The surgeon', txt:
    (r === 'army' ? `Ammet stays with the army, and the foreigners send their healers to its tents, and she watches one of them close a wound with a word and a warren and says it is cheating. Then she asks him to show her how. He cannot. She shows him the needle instead, and he goes away thoughtful.`
     : r === 'palace' ? `Ammet takes the palace post and finds the palace has its own physicians, who are expensive and slow. Within a month the guards come to her instead, and the physicians complain, and the steward lets them. "Hold still," she tells a captain of the Palace Guard, and he does.`
     : `Ammet hangs a board by a canal bridge with a needle painted on it, and sews up whoever comes, and takes what they can pay. She went to the cutler who holds the note on her tools to pay the last of it, and found his shop shut and the note gone with him. She drinks, the night after.`)
    + (l >= 2 ? ` She checks your stitches every time she sees you, in the street, without asking. You have learned to hold still.` : '')}),
  ruuk:(r, k, l) => ({title:'The guide', txt:
    r === 'army' ? `Ruuk stays with the army because it pays on the day, and when the foreigners ask whether any Letherii knows the roads east he says he knows all roads, which is a Faraed answer. They hire him anyway. He names every bird on the way out of the city, in Faraed, to a Malazan corporal who did not ask.`
    : r === 'palace' ? `Ruuk lasts eleven days on a palace post. On the twelfth he walks off it to find out where the canal birds go in the afternoons, and does not come back, and sends word from the north gate that the birds are fine.`
    : `Ruuk walks north for the Faraed hills with his three spears and a pouch of the trader's grain. He means to tell the trader in Trate that the grain was good and the trader was a bad man, and that the debt is settled, by Ruuk, unilaterally.`}),
  brune:(r, k, l) => ({title:'The Shake', txt:
    r === 'army' ? `Brune stays with the army. When word comes up the river that the Shake have a queen again, she goes down to the water after the evening muster and stands in it to the knees until dark, and comes back, and says nothing for an hour, and then something exact about the price of fish.`
    : r === 'palace' ? `Brune takes the palace post and asks for the watch on the river side, where she can hear the water. The steward gives it to her because nobody else wants it. She mends a net nobody gave her on the long nights, and prays to the Shore with her boots off.`
    : `Brune walks to the coast. The Shake have a queen again, people say, and a Shake with a fish-spear and no boat may find a use for both. The harbour master's receipt for the boat she lost goes into the sea at the first beach. She asks the Shore, politely, to take its time with it.`}),
  pessa:(r, k, l) => ({title:'The boathook', txt:
    r === 'army' ? `Pessa stays with the army, because the press-gang's chit with her name spelled wrong is the only paper anyone ever gave her, and she means to see it out. She teaches the Malazan sergeants canal cant, the very specific parts, and they teach her theirs, and the drill-ground has never sounded worse.`
    : r === 'palace' ? `Pessa takes the palace post and finds the driest place to stand before anyone else has looked. She holds the boathook upright at rest, and the household think it is ceremonial. She does not tell them what it is for.`
    : `Pessa goes back to the canals and finds a grain barge whose owner did not come back from the river, and poles it north, and nobody stops her, and she does not ask anyone's leave. She burns the press-gang's chit in the barge's stove the first cold night. She says the Errant had his chance.`}),
  ilsa:(r, k, l) => ({title:'The clerk', txt:
    (r === 'army' ? `Ilsa stays with the army as the battalion clerk's second, and keeps the roll in a hand the Patriotists would have known. When the files come out of the compound after it falls, carted to the river in barrows, she knows which of them were burned and which were kept, and by whom. She writes that down too. It is a habit.`
     : r === 'palace' ? `Ilsa takes the palace post, and in a month is clerking for the Palace Guard, because the new household cannot find anyone who knows how a file is read. She files nothing about anyone she has not met. It is a rule she made in the line below the ridge, and she keeps it.`
     : `Ilsa takes off the grey coat in a canal-side yard the week the compound falls, and puts it on a brazier, and watches it go. Then she goes to find the cook across the lane from the Sixth's old barracks, whose book was taken in the night, to tell her it was burned with the rest.`)
    + (S.f.b7_c2_key === 'name' ? ` She never asks what became of the eel-seller. She knows where to look, and does not look.` : ` The page of the Sixth's file she copied in the spring is in her coat, the new coat, folded small. She has not decided what to do with it.`)}),
  sorvan:(r, k, l) => ({title:'The lancer', txt:
    r === 'army' ? `Sorvan stays with the army, which needs cavalry and has no horses. He is made a corporal of no horses, and spends the summer at the remount pens beyond the walls teaching levies to walk a frightened line the Bluerose way. By autumn there are twelve horses in the pens that nobody is afraid of, and Sorvan is afraid of all twelve on their behalf.`
    : r === 'palace' ? `Sorvan takes the palace post and is given the escort's horses, eleven of them, ridden by men who cannot. He takes them out at dawn every day for a month until they can. Nobody in the palace asks to see the report. He has stopped waiting for them to.`
    : `Sorvan takes the only horse anyone will give him, a lame grey from the remount pens, and walks it north toward home at the grey's own pace. He says it will be fit to ride by the hills. Lether bought his people's horses. It never bought him. He goes home to say so.`}),
};
/* a squadmate with no page of their own above */
const b76FateDefault = (id, r) => ({title:TPL[id] ? TPL[id].role : 'One of the Sixth', txt:`${TPL[id] ? TPL[id].name : 'They'} ${r === 'free' ? 'goes out of the army with the rest of the Sixth who wanted it, into a city still deciding what it is' : r === 'palace' ? 'stands a palace post with the rest of the Sixth' : 'stays with the army of the new Lether, with the rest of the Sixth'}.`});
const b76SgtFate = (r, k) => ({title:'The sergeant', txt:
  (r === 'army' ? `You stay with the army of the new Lether, at the head of the Sixth, under whoever the new emperor makes Preda. Malazan sergeants come in that summer to drill the battalions, and one of them watches the Sixth on the ground for a morning and then comes over and asks where you learned to hold a line. You tell her the river. She nods as if that were an answer. Some of the army, people say, will march east with the foreigners under Brys Beddict, when the foreigners go. There is barracks talk that he walked back into the city alive, which nobody can explain.`
   : r === 'palace' ? `You take the Sixth into the Palace Guard, at a post on a door you were once told never to go near. The household in the palace now does not know what it is doing and says so, which you find you prefer. The Finadd keeps the roll. You stand your door, and the city goes past it.`
   : `You take your name off the battalion roll, and the Sixth's names with it, every one who wanted it, in the Finadd's own hand. What you owe and to whom, in a city where no one can find the ledgers, you have decided not to ask. You walk out of the barracks gate past the place the Edur used to stand, and it is only a gate.`)
  + (k === 'break' ? `\n\nAt the river the Sixth ran with the rest, and lived, and some who stood did not. You think about it some nights. You think the sum came out right, and that it cost somebody, and that both are true.` : `\n\nAt the river the Sixth stood when the line went, until a Malazan sergeant's squad broke on it, and then it walked off the field in order. You think about the ones who ran some nights. You would stand again.`)
  + (S.f.b7_c2_key === 'name' ? ` And some nights you think about an eel-seller on the canal steps, and a door left open.` : S.f.b7_c2_key === 'refuse' ? ` Somewhere in a barrow of files carted to the river there was a page with your name on it and two marks in the margin. You hope it burned.` : '')});
const b76Fallen = (id, h) => { const d = (h && h.dead && h.dead[id]) || {}; return {title:'Fallen', txt:`${TPL[id] ? TPL[id].name : 'They'} did not come to the walls of Letheras with the Sixth${d.where ? `: ${d.where}` : ''}. The squad said the name at the fire under the walls, and Thegg said it again in his mother's tongue, for the dead.`}; };
const B76FATES = {
  /* the Letherii's half of the save, wherever it is now (S while they play; S.th.l while the Third does) */
  half:() => b76Half(),
  /* the Letherii's road (army / palace / free) and the river key (stand / break), each with a default */
  road:() => b76RoadOf(),
  key:() => b76KeyOf(),
  /* the road page: {title, scene, paras[]} */
  roadPage(){ const r = b76RoadOf(), k = b76KeyOf(), h = b76Half(), R = B76_ROAD[r], f = (S && S.f) || {};
    const paras = [
      `The Sixth Company of the Whitefinder Battalion was ${f.b7_c2_key === 'name' ? 'asked for a name in Letheras, and gave one' : f.b7_c2_key === 'refuse' ? 'asked for a name in Letheras, and gave none' : 'watched in Letheras'}, and ${f.b7_c4_key === 'letherii' ? 'went in with the Letherii officers at the muster below Kravos Hill' : 'stood under Edur eyes at the muster below Kravos Hill'}. It stood in the line below the cadre's ridge and saw a light go out over the plain, and the Edur walk home.`,
      k === 'break' ? `At the river, when the foreigners came off their ships and the line went, the Sixth ran with the rest, and got off the bank through the reeds, and came to the walls of Letheras by night.` : `At the river, when the foreigners came off their ships and the line went, the Sixth stood until a Malazan sergeant's squad broke on it, and then walked off the field in order, and came to the walls of Letheras by night.`,
      r === 'army' ? `When the city had a new emperor, the Sixth stayed a company of the army, and Finadd Ennic kept its roll.`
        : r === 'palace' ? `When the city had a new emperor, the Sixth went into the Palace Guard, and Finadd Ennic kept its roll there.`
        : `When the city had a new emperor, the Sixth's names came off the battalion roll in Finadd Ennic's hand, and it went out of the army.`];
    if (h && h.name) paras.push(`Sergeant ${h.name}, Sixth Company, the Whitefinder Battalion.`);
    return {title:R.title, scene:R.scene, paras}; },
  /* one squadmate's page {title, txt} (also for the waiting) */
  page(id){ const h = b76Half(), r = b76RoadOf(), k = b76KeyOf(), l = (h && h.loy && h.loy[id]) || 0;
    return id === 'sgt' ? b76SgtFate(r, k) : (B76_FATE[id] ? B76_FATE[id](r, k, l) : b76FateDefault(id, r)); },
  /* every page, in order: walking squadmates, those waiting (Ilsa off the Quillas, Sorvan at the horse lines), those fallen in Book Seven,
     the sergeant last. Each: {id, k:'fate'|'gone', label, title, txt, loy}. The dead from Book Five (dead[id].from set) get no page here. */
  pages(){ const h = b76Half(); if (!h) return []; const dead = h.dead || {}, r = b76RoadOf();
    const walking = (h.squad || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id]);
    const camp = (h.camp || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id] && !walking.includes(id));
    const fell = Object.keys(dead).filter(id => id !== 'sgt' && TPL[id] && !dead[id].from);
    const loyOf = id => (h.loy && h.loy[id]) || 0;
    return [...walking.map(id => Object.assign({id, k:'fate', label:'The Sixth', loy:loyOf(id)}, this.page(id))),
      ...camp.map(id => Object.assign({id, k:'fate', label:'Waiting', loy:loyOf(id)}, this.page(id))),
      ...fell.map(id => Object.assign({id, k:'gone', label:'The fallen', loy:loyOf(id)}, b76Fallen(id, h))),
      Object.assign({id:'sgt', k:'fate', label:'The sergeant', loy:0, name:h.name || ''}, b76SgtFate(r, b76KeyOf()))]; },
};

/* the other squad, one line: the Third's village (Chapter 5's key), as a levy from the river villages heard it */
const b76Third = () => S.f.b7_c5_key === 'hold' ? 'the foreigners held a mill village on the river against an Edur band, a whole night, and in the morning the village was still standing and the Edur were not'
  : S.f.b7_c5_key === 'slip' ? 'the foreigners hid in a mill village on the river and slipped out of it by night, and the Edur came in after them and found only the villagers'
  : 'the foreigners are in the river villages, a squad here and a squad there, and the villages hide them';

const B7CH6 = {
  title:'Before the Walls', number:'Six',
  intro:{loc:'Before Letheras', sub:'The field · the night before', scene:'b7_field', cap:'A plain cleared of its crops, a ridge with banners on it, and the whole army of Lether drawn up and waiting.',
    paras:[
`The army marched when the hill said, and the hill said: west, to a plain a day out from the city, where the foreigners have come together at last out of the farms and the river villages, into one ring of fires on open ground.`,
()=>{ const v = b76Mates().map(id => TPL[id].name);
  return `You are Sergeant {sgt}, Sixth Company, the Whitefinder Battalion. The Sixth is in the line tonight with the rest of what Lether has left, below a long low ridge with banners on it. ${v.length ? `${b76And(v)} ${v.length > 1 ? 'are' : 'is'} with you.` : 'The squad, tonight, is you.'}`; },
`On the ridge the cadre has been working for a week, under guard, with lamps. Nobody below the ridge has been told what at.`,
`Out on the plain, the foreigners' fires. Between the army and the fires, the Edur, who will go out to meet them in the morning, and who keep their own camp, and do not come back to the line.`],
    go:'Into the line', node:'b7_c6_line'},

  areas:[
    /* 16 x 12 (b7_c6_field, night). R the ridge's scree foot  ^ the ridge path (never up it)  , trodden grass  . the lane along the line
       = a tent  F the Sixth's fire  p the stake line facing the plain  > the plain's edge */
    { id:'b7_c6_line', title:'Before Letheras · the line below the ridge', sub:'Night · the last before the field', hint:'Tap ground to move · tap a figure to talk · the ridge is north, the plain south', decor:'b7_c6_field', dark:true,
      map:[ "RRRRRRR^RRRRRRRR",
            ",,,,,,,.,,,,,,,,",
            ",,==,,,.,,,,==,,",
            ",,,,,,,.,,,,,,,,",
            "................",
            ",,,,,F,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,==,,,,,,,,==,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            "pppppppp>ppppppp" ],
      walk:'.,', triggers:{F:'b7_c6_fire', '^':'b7_c6_ridge', '>':'b7_c6_plain'}, start:{x:5, y:8},
      quest:()=> !S.f.b7_c6_ennic ? 'Finadd Ennic, by the battalion standard.' : !S.f.b7_c6_visitDone ? (b76K4() === 'edur' ? 'An Edur has come back from the forward camp to the Sixth\'s fire.' : 'The captain from the horse-lines tent is walking the line.') : 'The fire, and then sleep. The field is in the morning.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:4, node:()=>'b7_c6_ennic', fresh:()=>!S.f.b7_c6_ennic},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:3, y:5, node:()=>'b7_c6_clerk', fresh:()=>!S.f.b7_c6_clerk},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:13, y:8, node:()=>'b7_c6_tilewoman', fresh:()=>!S.f.b7_c6_tw},
        {id:'fifth', name:'The Fifth\'s sergeant', kind:'b5_letherii', x:14, y:3, node:()=>'b7_c6_fifth', fresh:()=>!S.f.b7_c6_fifth},
        {id:'levy', name:'A levy at the next fire', kind:'b5_c5_refugee', x:11, y:6, node:()=>'b7_c6_levy', fresh:()=>!S.f.b7_c6_levyTried},
        {id:'grey', name:'A grey coat at a fire across the lane', kind:'b7_agent', x:9, y:2, node:()=>'b7_c6_watcher', show:()=>b76Watched() && !S.f.b7_c6_watcherGone, fresh:()=>!S.f.b7_c6_watcherTried},
        {id:'visitE', name:'The eldest Edur', kind:'b5_edur', x:6, y:6, node:()=>'b7_c6_visit', show:()=>b76K4() === 'edur' && !S.f.b7_c6_visitDone, fresh:()=>!S.f.b7_c6_visitDone},
        {id:'visitL', name:'The captain', kind:'b5_letherii', x:6, y:6, node:()=>'b7_c6_visit', show:()=>b76K4() === 'letherii' && !S.f.b7_c6_visitDone, fresh:()=>!S.f.b7_c6_visitDone} ] },

    /* 16 x 12 (b7_c6_field, dawn): the same line by day */
    { id:'b7_c6_dawn', title:'Before Letheras · the line below the ridge', sub:'Dawn · the field', hint:'Tap ground to move · tap a figure to talk · the plain is south, past the stakes', decor:'b7_c6_field',
      map:[ "RRRRRRR^RRRRRRRR",
            ",,,,,,,.,,,,,,,,",
            ",,==,,,.,,,,==,,",
            ",,,,,,,.,,,,,,,,",
            "................",
            ",,,,,F,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,==,,,,,,,,==,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            ",,,,,,,,,,,,,,,,",
            "pppppppp>ppppppp" ],
      walk:'.,', triggers:{F:'b7_c6_fire', '^':'b7_c6_ridge', '>':'b7_c6_plain'}, start:{x:5, y:8},
      quest:()=> !S.f.b7_c6_dawnEnnic ? 'The Finadd, by the standard.' : !S.f.b7_c6_dome ? 'The stakes, and the plain beyond them. Something on the ridge is nearly finished.' : !S.f.b7_c6_homeDone ? 'The Edur are coming back across the plain.' : !S.f.b7_c6_orders ? 'The Finadd. A rider has come down from the hill.' : 'The fire. The army marches for the river.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:4, node:()=>!S.f.b7_c6_dawnEnnic ? 'b7_c6_dawn_ennic' : S.f.b7_c6_homeDone ? 'b7_c6_orders' : 'b7_c6_dawn_ennic', fresh:()=>!S.f.b7_c6_dawnEnnic || (!!S.f.b7_c6_homeDone && !S.f.b7_c6_orders)},
        {id:'fifth', name:'The Fifth\'s sergeant', kind:'b5_letherii', x:14, y:3, node:()=>'b7_c6_fifth_dawn', show:()=>!!S.f.b7_c6_dome, fresh:()=>!S.f.b7_c6_fifthDawn},
        {id:'escort', name:'The cadre\'s old escort', kind:'b5_letherii', x:7, y:1, node:()=>'b7_c6_ward', show:()=>b76Teach() === 'escort' && !S.f.b7_c6_wardTried && !S.f.b7_c6_orders, fresh:()=>!S.f.b7_c6_wardTried},
        {id:'homeE', name:'The eldest Edur, going home', kind:'b5_edur', x:8, y:9, node:()=>'b7_c6_home', show:()=>b76K4() === 'edur' && !!S.f.b7_c6_dome && !S.f.b7_c6_homeDone, fresh:()=>!S.f.b7_c6_homeDone},
        {id:'homeL', name:'The captain', kind:'b5_letherii', x:8, y:9, node:()=>'b7_c6_home', show:()=>b76K4() === 'letherii' && !!S.f.b7_c6_dome && !S.f.b7_c6_homeDone, fresh:()=>!S.f.b7_c6_homeDone},
        {id:'deserters', name:'Levies running from the ridge', kind:'b5_c5_refugee', x:2, y:3, node:()=>'b7_c6_deserters', show:()=>!!S.f.b7_c6_dome && !S.f.b7_c6_deserters && !S.f.b7_c6_orders, fresh:()=>!S.f.b7_c6_deserters} ] },

    /* 16 x 12 (b5_c3_bank, day). ~ the river  , reeds  . the bank path  # rock  x a dead tree  ^ the water's edge, where the boats come in */
    { id:'b7_c6_bank', title:'The Lether River · the bank below the city', sub:'Day · the landing', hint:'Tap ground to move · tap a figure to talk · the river is north, the boats coming in', decor:'b5_c3_bank',
      map:[ "~~~~~~~~~~~~~~~~",
            "~~~~~~~~~~~~~~~~",
            ",,,,,^,,,,,,x,,,",
            ",,..............",
            ",...,,,,,,,,,...",
            "..#.............",
            "................",
            ",,,,.......,,,,,",
            ",,,,.......,,#,,",
            ",x,,.......,,,,,",
            ",,,,.......,,,,,",
            ",,,,.......,,,,," ],
      walk:'.,', triggers:{'^':'b7_c6_ships'}, start:{x:7, y:10},
      quest:()=> !S.f.b7_c6_landingDone ? 'The water\'s edge. The boats are coming in.' : !b76Key() ? 'The Finadd. The line either side is going.' : 'The road to the city.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:6, node:()=>b76BankNode(), fresh:()=>!S.f.b7_c6_bankEnnic || (!!S.f.b7_c6_landingDone && !b76Key()) || (!!b76Key() && (S.f.b7_c6_ph || 0) < 4)},
        {id:'boats', name:'Soldiers off the boats', kind:'b7_malregular', x:7, y:3, node:()=>'b7_c6_boats', show:()=>!S.f.b7_c6_landingDone, fresh:()=>!S.f.b7_c6_landingDone} ] },

    /* 16 x 12 (b7_c6_field, night). W the walls of Letheras  G a gate  , grass  . the road  = a tent  F the Sixth's fire */
    { id:'b7_c6_walls', title:'Letheras · under the walls', sub:'Night · after the river', hint:'Tap ground to move · tap a figure to talk · the gate is north', decor:'b7_c6_field', dark:true,
      map:[ "WWWWWWWGWWWWWWWW",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,==,,,.,,,,,,,,",
            ",,,,,,,.,,,==,,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,F,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,==,,,.,,,,==,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,,",
            ",,,,,,,.,,,,,,,," ],
      walk:'.,', triggers:{F:'b7_c6_fire', G:'b7_c6_gate'}, start:{x:7, y:10},
      quest:()=> !b76Road() ? 'The Finadd, at the Sixth\'s fire. He has a question.' : 'The gate, in the morning. The fire until then.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:5, y:5, node:()=>'b7_c6_road', fresh:()=>!b76Road()},
        {id:'refugees', name:'People coming out of the city', kind:'b5_c5_refugee', x:9, y:2, node:()=>'b7_c6_refugees', fresh:()=>!S.f.b7_c6_refugees} ] } ],

  battles:{
    /* levies and soldiers running from the foot of the ridge after the light went out, with a cadre's bag they took on the way */
    b7_c6_deserters:{title:'The foot of the ridge', style:'b5_c6_lines', warrenText:'Morning below the ridge · the Holds still ringing from whatever was done up there', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","..t.....","........","....t...","........","........",".t....t.","........","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_c6_deserter',3,1],['b7_c6_deserter',5,2],['b7_rioter',1,1],['b7_rioter',6,1],['b7_rioter',2,2],['b7_rioter',4,0]], xp:180, after:'b7_c6_deserters_after',
      preText:()=>`They have thrown down their badges and kept their spears, and they come through the Sixth's stretch of the line at a run with the cadre's bag between two of them and the ridge at their backs. They do not want a fight. They want to be somewhere else, and the Sixth is standing in it.`},
    /* the Adjunct's regulars off the ships: the main fight, at the water's edge and then against the second boats */
    b7_c6_landing:{title:'The water\'s edge', style:'b5_c3_bank', warrenText:'Day on the Lether River · the water full of boats, and the Holds full of something foreign', warren:{meanas:1, denul:1}, music:'battle',
      map:["oooooooo","........","..t..t..","........","....t...","........",".t......","........","........","........"], pitTxt:'the river',
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b7_whitefinder',6,8]],
      foes:[['b7_malregular',2,1],['b7_malregular',5,1],['b7_malregular',4,1],['b7_malxbow',1,2],['b7_malxbow',6,2]], xp:260, after:'b7_c6_landing_after',
      preText:()=>`They come off the boats into the shallows with their shields up and their cloaks hitched, grey-green over mail, and they do not shout. They form up on the bank while they are still knee-deep, as if forming up were a thing the body did by itself, and then they come up the bank at the Sixth at a walk.`,
      stage2:{title:'The second boats', xp:160,
        text:()=>`The first boat's soldiers are down or back in the water. Behind them the second boats are already grounding, and these have crossbows: big ones, the kind the barracks said put a quarrel through a shield and the man behind it.${b76If('thegg', `\n\nThegg looks at the crossbows and then at the shields round him. "Behind me," he says, which is not a plan but is better than most.`)}${S.f.b7_c6_wardOk ? `\n\nThe grey. Put it where the bows are looking.` : ''}`,
        map:["oooooooo","oo....oo","........","...t....","........","..t..t..","........","........","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b7_malxbow',2,1],['b7_malxbow',5,1],['b7_malregular',3,2],['b7_malregular',4,2],['b7_malregular',1,2]]} },
    /* 'stand': the line has gone either side; the Sixth holds until a Malazan sergeant's squad breaks on it. Not mortal */
    b7_c6_stand:{title:'The Sixth\'s stretch of the bank', style:'b5_c3_bank', warrenText:'The line gone either side · the river loud, and the bank quieter than it should be', warren:{meanas:1, denul:1}, music:'battle',
      map:["oooooooo","........","...t....","........","..t..t..","........","........",".t....t.","........","........"], pitTxt:'the river',
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b7_whitefinder',6,8]],
      foes:[['b7_malsgt',4,1],['b7_malregular',2,1],['b7_malregular',6,1],['b7_malregular',5,2],['b7_malxbow',1,3]], xp:260, after:'b7_c6_stand_after',
      waves:[{round:3, foes:[['b7_malregular',7,2]], text:'One more comes up the bank from the east, where the levies were, and nothing is in his way.'}],
      preText:()=>`Either side of the Sixth the line has gone, levies and companies and all, down the bank and away. What comes up the bank at the Sixth now is one squad of the foreigners with a sergeant at its head, a whistle on a cord at the sergeant's neck, and no hurry at all. They mean to see whether this part of the line is going too.`},
    /* 'break': run with the rest; crossbows on the bank, three rounds to the reeds, then the reeds. Not mortal */
    b7_c6_break:{title:'The bank, running', style:'b5_c3_bank', warrenText:'The line gone · the bank a road for everyone, and the crossbows on it', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:3, text:'Keep moving: three rounds to the reeds.'},
      map:["o.......","o..t....","o.......","o....t..","o.......","o.t.....","o.......","o...t...","o.......","o......."], pitTxt:'the river',
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b7_malxbow',2,0],['b7_malxbow',5,0],['b7_malregular',1,1],['b7_malregular',6,1],['b7_malxbow',4,1]], xp:160, after:'b7_c6_break_after',
      waves:[{round:2, foes:[['b7_malregular',7,3]], text:'More of them up the bank from the boats, cutting across to the reeds.'}],
      preText:()=>`The whole line is going down the bank at once, the levies first and then everybody, and the Sixth goes with it. Behind, on the bank, the crossbows. The reeds are a long way ahead, and between here and there the foreigners are already on the path.`,
      stage2:{title:'The reeds', xp:100,
        text:()=>`The reeds, head-high, the water to the knee, and the whole bank behind full of noise. Here it is quieter. In front, three of the foreigners who came round by the water to be there first, standing in the reeds as if they had grown there.${b76If('pessa', `\n\nPessa looks at the water and the reeds and grins with all her teeth. "Canal," she says. "Mine."`)}`,
        map:["oo....oo","o......o","o..t...o","o......o","o......o","o.t..t.o","o......o","o......o","........","........"],
        party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
        foes:[['b7_malregular',3,1],['b7_malregular',5,2],['b7_malxbow',2,2],['b7_malregular',6,3]]} } },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b7_c6_ridgecharm:{name:'A charm off the ridge', slot:'trinket', role:'focus', who:null, stat:{wits:1}, hp:2,
      line:'A cadre mage\'s charm on a cord, a disc of black stone ruled with the Holds\' lines in silver, out of a bag that came down off the ridge with the wrong people. It is warm, and it should not be. Perrit will not touch it bare-handed. Whoever wears it thinks a little faster, and sleeps a little worse.'},
    b7_c6_fingershield:{name:'A Whitefinder shield', slot:'armour', role:'shield', who:null, ac:2, hp:4,
      line:'One of the battalion\'s old parade shields, oak under leather, the white fingertip painted on the face and repainted every spring by somebody who cared. The Finadd had six of them in the battalion wagon and nobody to give them to. It is heavy, and it was made to be looked at, and it turns a crossbow quarrel anyway.'} },

  scenes:{
    b7_c6_dome:{loc:'Before Letheras', sub:'The field · dawn', cap:'The plain from the line at dawn, the ridge on the right, and far out on the horizon a dome of silver light with something white breaking over it.', amb:'explore'},
    b7_c6_walls:{loc:'Letheras', sub:'Under the walls · night', cap:'The walls of Letheras at night from the road, towers against the smoke, a glow over one quarter, and people coming out of the gate with what they can carry.', amb:'explore'} },

  end:{
    stand:['The line that held', 'Before the walls of Letheras the Sixth stood in the line below the cadre\'s ridge and watched a light go out over the plain, and the Edur walk home. At the river, when the foreigners came off their ships and the line went, the sergeant held the Sixth on its stretch of bank until a Malazan sergeant\'s squad broke on it, and then walked it off the field in order. It came to the walls by night. Lether, watching what was left of its army come home, did not know what to make of a company that had walked.'],
    break:['The bank', 'Before the walls of Letheras the Sixth stood in the line below the cadre\'s ridge and watched a light go out over the plain, and the Edur walk home. At the river, when the foreigners came off their ships and the line went, the sergeant ran the Sixth with the rest, down the bank through the crossbows and into the reeds, and it lived. It came to the walls by night with the rest of Lether\'s army, what there was of it, and the city that let it in had already stopped believing in armies.'] },
  endScene:'b7_c6_walls',
  endCap:()=> b76Key() === 'break' ? 'The walls of Letheras at night, the road full of soldiers without companies, and the Sixth at a small fire under the gate, all of it there.' : 'The walls of Letheras at night, the road full of soldiers without companies, and the Sixth at a small fire under the gate in good order, as if anybody were still counting.',
  tease:'Next: Letheras. The Third at the gate with the Fist, a city with the mob in its streets, and a throne with no one sure who will sit on it.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b7_c6_key === 'stand') x.push('At the river the sergeant held the Sixth when the line went, until a Malazan sergeant\'s squad broke on it.');
    if (f.b7_c6_key === 'break') x.push('At the river the sergeant ran the Sixth with the rest, through the crossbows and into the reeds.');
    if (f.b7_lethRoad === 'army') x.push('When it is over, the Sixth means to stay a company of whatever army Lether has.');
    if (f.b7_lethRoad === 'palace') x.push('When it is over, the Sixth means to stand guard for whoever sits the throne.');
    if (f.b7_lethRoad === 'free') x.push('When it is over, the Sixth means to take its names off the roll and walk out of the army.');
    if (f.b7_c6_dome) x.push('From the line below the ridge the Sixth saw the cadre\'s light go out over the plain against a dome of silver fire, far off.');
    if (f.b7_c6_homeDone) x.push(b76K4() === 'edur' ? 'The Edur walked home across the plain past the Sixth\'s picket, and the eldest told the sergeant what the ridge had been for.' : 'The captain\'s officers had asked the Sixth to stay in the line when the Edur went out. After the light, the sergeant knew why.');
    if (f.b7_c6_deserters) x.push(f.b7_c6_deserters === 'fought' ? 'Deserters ran from the ridge through the Sixth\'s stretch of the line. The Sixth stopped them.' : 'Deserters ran from the ridge through the Sixth\'s stretch of the line. The Sixth let them go.');
    if (f.b7_c6_watcherGone) x.push('The man in the grey coat sat at the next fire the night before the field, and left before morning.');
    if (f.b7_c6_wardOk) x.push('The squad learned the cadre\'s ward, or the surgeons\' version of it.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b7_lethRoad && ({army:'The sergeant told the Finadd the Sixth will stay a company of the army, whatever army Lether has after.', palace:'The sergeant told the Finadd the Sixth will stand guard for whoever sits the throne.', free:'The sergeant told the Finadd the Sixth wants its names off the roll.'})[f.b7_lethRoad],
    f.b7_c6_key && (f.b7_c6_key === 'stand' ? 'At the river the Sixth stood when the line went, and walked off the field in order.' : 'At the river the Sixth ran with the rest of the line, and lived.'),
    f.b7_c6_homeDone && (b76K4() === 'edur' ? 'The eldest Edur said the cadre\'s light was meant for the Edur as well as the foreigners. The Edur have gone home.' : 'The captain\'s officers knew what the ridge was for. They asked the Sixth to stay in the line so it would not be out on the plain with the Edur.'),
    f.b7_c6_dome && 'From the line the Sixth saw a light come off the ridge and break against a dome of silver fire far out on the plain. Then the dome went out.',
    f.b7_c6_news && 'The Finadd says the cadre has been on the ridge a week, the Chancellor\'s man is up there with them, and the Edur go out onto the plain at dawn.',
    'The Sixth Company is in the line below the ridge, before the walls of Letheras.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: the night before, the line below the ridge ======== */
    b7_c6_line:()=>{ const ph = b76Ph();
      return {sp:'The Sixth\'s place in the line', scene:'b7_field', fx:()=>{ S.f.b7_c6_ph = S.f.b7_c6_ph || 1; },
        again:()=>'The Sixth\'s place in the line, the ridge at its back, the plain in front.', txt: ph > 1 ?
`The Sixth's place in the line: a stretch of trodden grass between the Fifth and a levy battalion, the ridge at its back and the stakes in front, and beyond the stakes the plain.` :
`The army of Lether sleeps in its line tonight, company by company, where it will stand in the morning. The Sixth's place is a stretch of trodden grass between the Fifth and a levy battalion, with the battalion standard planted in the lane and a Finadd's lamp beside it.

Behind the line, the ridge: long and low, with the cadre's lamps along its crest, and a guard on the one path up it who is not a Whitefinder. In front, a row of sharpened stakes, and past the stakes the plain, cleared of whatever crop it had, and out on the plain, a long way off, a ring of small fires.

The foreigners. All of them, it is said, in one place at last.${b76Say({perrit:`\n\nPerrit is sitting with her back to the ridge and her tiles in her lap, very still. "The Holds are wrong tonight," she says, without looking round. "All of them. Like a room before the roof comes in."`, ammet:`\n\nAmmet is unrolling her tools on a blanket by the standard, counting them twice. "One more battle," she says. "Then I'm buying a new needle."`, _:''})}`,
        ch:[b7ReadChoice(6),
            {t:'The fire.', go:'b7_c6_fire'},
            {t:'The Finadd.', req:()=>ph === 1, go:'b7_c6_ennic'},
            {t:'Walk the line.', go:()=>startExplore()}]}; },
    b7_c6_read:()=>b7ReadOffer(6),
    b7_c6_card:()=>b7ReadCard(6),

    /* Finadd Ennic: the orders, and the ridge */
    b7_c6_ennic:()=>({sp:B5_FINADD.name, scene:'b7_field', fx:()=>{ S.f.b7_c6_ennic = 1; }, again:()=>'The Finadd, by the standard, looking at the ridge more than at the plain.', txt:
`Finadd Ravel Ennic is by the standard with his pen capped, looking not at the plain but at the ridge behind the line.

"Sergeant. The Whitefinders stand here in the morning. The Edur go out onto the plain to meet the foreigners at first light, by order of the hill, and we stand in the line and watch them do it." He turns the pen in his fingers. "Those are the whole of my orders. I have read them four times. They do not get longer."

"The cadre will not need us. I am told that also."`,
      ch:[{t:'"What is the cadre doing up there, sir?"', go:'b7_c6_ennic_news'},
          {t:'"Stand and watch. Yes, sir."', go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c6_ennic_news:()=>({sp:B5_FINADD.name, scene:'b7_field', fx:()=>{ S.f.b7_c6_news = 1; }, txt:
`"Working," he says. "For a week, under guard, with lamps all night. The cadre's own escort is not allowed past the path. The Chancellor's man went up yesterday in his carriage and has not come down, and there is a commander with him, an old one, whose banner I have not seen since before the Edur came." He looks at the crest. "A great deal of trouble to watch somebody else's battle."

"The Edur went out to their forward camp at dusk. They did not say goodbye to the hill. I do not think the hill noticed."${S.f.b7_c2_ennicEve ? ' His hand goes to his coat, and stays.' : ''}${b76If('perrit', `\n\nPerrit, behind you, very quietly: "Sir. Whatever they're building, it's big enough to feel from Letheras."`)}${b76If('ilsa', `\n\nIlsa keeps quiet. Her eyes go to the carriage-ruts on the ridge path, and stay there.`)}`,
      ch:[{t:'"Yes, sir."', go:()=>startExplore()}]}),

    /* the company clerk: the file, and who is watching the Sixth tonight (b7HeatTier) */
    b7_c6_clerk:()=>{ const h = b7HeatTier();
      return {sp:'The company clerk', scene:'b7_field', fx:()=>{ S.f.b7_c6_clerk = 1; }, html:risingHTML(), again:()=>'The company clerk at his camp table, writing by the standard\'s lamp.', txt:
`The company clerk has his camp table set up by the standard, with both his books, writing up the Sixth's muster by the light of the Finadd's lamp, because tomorrow there may not be a Sixth to write up.

"The grey coats came along the line at dusk," he says, without stopping. "With lists. They stopped at most companies." ${h === 'clean' ? `He dips the pen. "They did not stop at ours. I find that I am almost offended."` : h === 'noted' ? `He dips the pen. "They stopped at ours, and counted us, and went on. One of them came back an hour later and counted us again." He blots a line. "The second count was the same as the first. I checked."` : `He dips the pen, and does not write. "They stopped at ours, and one of them stayed. He is at a fire across the lane, Sergeant, and he has been there since dusk, and he has not looked at anything but the Sixth." He blots the page carefully. "The company will not sleep much. I am telling you so that you know it is not the battle."`}`,
        ch:[{t:'Back to the line.', go:()=>startExplore()}]}; },

    /* the tile-woman */
    b7_c6_tilewoman:()=>({sp:'The tile-woman', scene:'b7_field', fx:()=>{ S.f.b7_c6_tw = 1; }, again:()=>'The tile-woman by the surgeon\'s cart, with her bag. "Still a dock."', txt:
`The tile-woman has come out with the surgeon's cart again, and sits on its tailboard with the oiled bag in her lap and her back to the ridge, on purpose.

"Wouldn't read up there," she says, jerking her chin over her shoulder without turning. "Not for a hundred docks. Every tile in the bag would come up the same." She spits to one side for manners. "And I'll tell you which, for nothing. The Gate. Something going through, fast, and not coming back the same."${b7In('perrit') ? `\n\n"Your cadre girl knows," she adds. "Look at her. She's sitting with her back to it too."` : ''}`,
      ch:[b7ReadChoice(6),
          {t:'Back to the line.', go:()=>startExplore()}]}),

    /* the ridge path: never up it */
    b7_c6_ridge:()=>{ const ph = b76Ph();
      return {sp:'The ridge path', scene:'b7_field', again:()=>'The ridge path, and the guard on it.', txt:
`The one path up the ridge goes between two posts, with a guard on it who is not a Whitefinder and does not look at the Whitefinders. Up on the crest the cadre's lamps are set in a long line, ${ph >= 2 && S.f.b7_c6_dome ? 'and they are out now, every one, and the crest is smoking a little in the morning air.' : 'and between them figures go back and forth, slowly, as people go back and forth who have been working all night for a week.'}

At the north end of the crest there is a carriage with its horses out of the traces, and beside it two banners: one the Chancellor's, and one so old its colours have gone the same grey. Under the banners, two figures in good cloaks, watching the plain. Neither of them looks down at the line.${ph === 2 && !S.f.b7_c6_wardTried && !S.f.b7_c6_dome ? `\n\n${b76Teach() === 'perrit' ? 'Perrit is standing at the foot of the path with her face turned up to the crest, very pale.' : b76Teach() === 'ammet' ? 'Ammet is at the foot of the path with a pot of something by her boots, looking at the crest the way she looks at a wound she does not like.' : 'An old Whitefinder of the cadre\'s escort is sitting at the foot of the path, turned back by the guard, looking up at the crest.'}` : ''}`,
        ch:[{t:`${b76TeachNm()}: "What is it they're building?"`, req:()=>ph === 2 && !S.f.b7_c6_wardTried && !S.f.b7_c6_dome, go:'b7_c6_ward'},
            {t:'Back to the line.', go:()=>startExplore()}]}; },

    /* the plain's edge: at night the foreigners' fires; at dawn the field, and the wave */
    b7_c6_plain:()=>{ const ph = b76Ph();
      if (ph >= 2) return DLG.b7_c6_wave();
      return {sp:'The stakes', scene:'b7_field', again:()=>'The stake line, and the plain beyond it.', txt:
`The stake line in front of the Whitefinders, chest-high, sharpened, planted at an angle by levies who did not believe in it. Past the stakes the plain goes out flat and grey in the dark, stubble and dust, all the way to a ring of small fires a long way off.

Between the line and the ring, nearer, the Edur's forward camp: no fires at all, and a long grey shape on the ground that is the Edur sleeping in their ranks. ${b76K4() === 'edur' ? 'At the near edge of it, a picket line of stakes of their own, with a gap in it the width of a squad.' : 'Not one soldier from the Letherii line has walked out to it tonight.'}${b76Say({tobet:`\n\nTobet, half a step behind you, counting the foreign fires under his breath. He stops at forty. "Not many," he says. "For all of them."`, thegg:`\n\nThegg looks out at the Edur camp a while. "They sleep in their ranks," he says. "My mother's people did that, before."`, _:''})}`,
        ch:[{t:'Back to the line.', go:()=>startExplore()}]}; },

    /* the Fifth's sergeant, the next stretch of the line: before, and after the light */
    b7_c6_fifth:()=>({sp:'The Fifth\'s sergeant', scene:'b7_field', fx:()=>{ S.f.b7_c6_fifth = 1; }, again:()=>'The Fifth\'s sergeant, at the Fifth\'s fire, polishing a helmet that does not need it.', txt:
`The Fifth Company's sergeant is a heavy Letherii of forty with a broken nose, polishing a helmet at the Fifth's fire that has been polished enough. The Fifth and the Sixth have shared a barracks wall for eleven years and a joke for most of them.

"Watching," he says, when you ask what the Fifth has been told. "Same as you. Stand in the line and watch the Edur do it." He spits on the helmet and rubs. "First time in my life the hill has asked me to do less. I keep looking for the catch."${b76If('thegg', `\n\nHe nods up at Thegg. "Still growing?" It is the joke. Thegg nods back, gravely. It is the answer.`)}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b7_c6_fifth_dawn:()=>({sp:'The Fifth\'s sergeant', scene:'b7_field', fx:()=>{ S.f.b7_c6_fifthDawn = 1; }, again:()=>'The Fifth\'s sergeant, sitting down at last.', txt:
`The Fifth's sergeant is sitting on his helmet at the Fifth's cold fire, with his back to the ridge, looking at the burned plain.

"That was the catch," he says. "That was what the hill wanted us watching for." He rubs his broken nose. "My lot are saying the foreigners did it. Some mage of theirs." He looks at the round unburned patch far out at the end of the black. "I've told them to shut up. I don't know what I've told them to shut up about. I just know I don't want it said in front of the Edur."${S.f.b7_c6_homeDone ? `\n\n"The Edur are gone," he adds. "So I suppose it doesn't matter now. I'll go on telling them anyway."` : ''}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* a levy at the next fire (rise:true): he carried water up the ridge all week. The other squad's one line of news */
    b7_c6_levy:()=>({sp:'A levy at the next fire', scene:'b7_field', again:()=>'The levy boy at the next fire, with his spear across his knees.', txt:
`At the levy battalion's nearest fire a boy of sixteen or so sits with a spear across his knees as if it might go off, in Indebted boots, with his hands wrapped in rag where the water-yoke has rubbed them raw.

The levies have been carrying for the cadre all week, the clerk said. Up the path with water, down with nothing, and told nothing either way. People who carry are like grooms: nobody notices they have eyes.`,
      ch:[{t:'Sit down by his fire and ask him what he saw on the ridge.', check:['wits', 14], rise:true, req:()=>!S.f.b7_c6_levyTried,
            edges:id=>[id === 'tobet' && ['Indebted, asking Indebted', 2], id === 'ammet' && ['she looks at his hands first, and he lets her', 2], id === 'pessa' && ['he is off the canal boats; she talks his cant', 1], id === 'sgt' && ['you ask him as a sergeant asks a soldier, which nobody has', 1], id === 'thegg' && ['a very large soldier at a boy\'s fire is a large thing', -1], id === 'ilsa' && ['the grey coat; he knows what it means', -2]],
            near:{t:()=>`Yes, but his corporal sees him talking to a squad of the line and comes over, and there is some shoving before it is sorted out, and ${b76Nm(b76Who())} ${b76Who() === 'sgt' ? 'take' : 'takes'} an elbow in the ribs for the boy's sake. ${b76Nmc(b76Who())}'ll feel it in the morning.`, fx:()=>bruise(b76Who(), bruiseN())},
            fx:()=>{ S.f.b7_c6_levyTried = 1; }, go:'b7_c6_levy_ok', fail:'b7_c6_levy_no'},
          {t:'Leave him to his fire.', go:()=>startExplore()}]}),
    b7_c6_levy_ok:()=>({sp:'A levy at the next fire', scene:'b7_field', fx:()=>{ S.f.b7_c6_levyOk = 1; }, txt:
`He talks to the fire, low, and what he says to the fire is for you.

"Lines. Chalk lines and silver wire all along the top, and stakes with things hung on them. The mages in the middle, sitting, not sleeping. Some of them have been sitting four days." He turns the spear over. "Yesterday one of them got up and walked off the edge of the ridge. Just walked. They said he was tired." He swallows. "And the old man with the banner keeps asking how far it reaches. Not how strong. How far." He looks out at the plain, at the Edur's grey shape on it. "I'm from the river villages. My uncle came up the road last week. He says ${b76Third()}." He shrugs. "Everyone hides somebody, he says. Now."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b7_c6_levy_no:()=>({sp:'A levy at the next fire', scene:'b7_field', txt:
`"I carry water," he says, to his knees. "Up and down. That's all I do." He puts another stick on the fire, and that is all, and in a while he lies down with his back to you and the spear in his arms.`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the man in the grey coat, at the next fire (b7HeatTier watched or wanted). rise:true; the chapter's one "yes, but" on the file */
    b7_c6_watcher:()=>({sp:'A grey coat at a fire', scene:'b7_field', again:()=>'The man in the grey coat, at his fire across the lane, watching.', txt:
`He is sitting alone at a small fire across the lane with his hands in his sleeves: a Patriotist of middle years in a grey coat, with a pleasant face that has been pleasant at a great many people. ${S.f.b7_c2_key ? 'The same man who came to the barracks for a name. He always comes back, Ilsa said.' : 'You have the feeling you have met him, or someone exactly like him, at a door.'}

"Sergeant," he says. "Good evening. Don't mind me. I'm only watching." He smiles. "${b7HeatTier() === 'wanted' ? 'There is a warrant, of course. It will keep until after the battle. If there is an after.' : 'Your file is very interesting reading. I wanted to see the people in it.'}"${b7In('ilsa') ? `\n\nIlsa, behind you, has gone very still. "Don't give him anything," she says, low. "Not a word he can write down."` : ''}`,
      ch:[{t:'Talk him away from the Sixth\'s fire for the night.', check:['guile', 15], rise:true, req:()=>!S.f.b7_c6_watcherTried,
            edges:id=>[id === 'ilsa' && ['she knows exactly what he can and cannot write down', 3], id === 'perrit' && ['she can sound like a purser\'s clerk, because her mother was one', 1], id === 'sgt' && ['you have met him before, and you are still here', 1], id === 'tobet' && ['an Indebted learns early to give a clerk nothing', 1], id === 'thegg' && ['a very large man is a thing to write down', -2], id === 'ruuk' && ['he grins, and the grey coat writes the grin down', -1]],
            near:{t:'Yes, but he writes down every word of it, pleasantly, as he goes, and the Patriotists will have the whole conversation by the end of the week.', fx:()=>{ b7Filed(1, 'he wrote down what you said'); }},
            fx:()=>{ S.f.b7_c6_watcherTried = 1; }, go:'b7_c6_watcher_ok', fail:'b7_c6_watcher_no'},
          {t:'Leave him to it.', go:()=>startExplore()}]}),
    b7_c6_watcher_ok:()=>({sp:'A grey coat at a fire', scene:'b7_field', fx:()=>{ S.f.b7_c6_watcherGone = 1; }, txt:
`You tell him, pleasantly, that the Edur will be passing this stretch of the line before dawn on their way out to the plain, and that the Edur are not fond of grey coats since the business with the First Concubine, and that a man alone at a fire is very easy to find in the dark.

He thinks about it, smiling. Then he gets up, and brushes his coat, and puts out his fire with his boot.

"Until after, then, Sergeant," he says, and goes away down the lane toward the levy battalions, and the Sixth breathes out.`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b7_c6_watcher_no:()=>({sp:'A grey coat at a fire', scene:'b7_field', txt:
`He listens to all of it with his head on one side, and then he puts another stick on his fire.

"I think I'll stay," he says. "It's a pleasant spot. And I've never seen a battle." He settles his hands back in his sleeves. "I'm told one should, once."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the Chapter 4 visitor: on 'edur', the eldest Edur (hold our picket); on 'letherii', the captain (stay in the line). The officers' ask, decided here */
    b7_c6_visit:()=>{ const e = b76K4() === 'edur';
      return {sp:e ? 'The eldest Edur' : 'The captain', scene:'b7_field', again:()=>e ? 'The eldest Edur at the Sixth\'s fire, standing.' : 'The captain at the Sixth\'s fire, his hands to the coals.', txt: e ?
`The eldest of the Edur from Kravos Hill has walked back from the forward camp to the Sixth's fire, alone, in the dark, ${S.f.b7_c4_edurDone ? 'with the cut on his forearm healed to a grey line' : 'with his long blade sheathed'}. He does not sit.

"Sergeant. At first light we go out onto the plain to meet the foreigners. Your commanders on the ridge asked it of us, and smiled when they asked." He looks past you at the crest, at the cadre's lamps. "The Sixth will hold our picket at the edge of the plain while we are gone. Not follow. Hold. Where we can see it when we look back."

He is quiet for a moment. "Your mages have been on that ridge a week, and not one of them will look at an Edur. In my experience, Sergeant, people who will not look at you are counting something."` :
`The captain of the levy battalion from the horse-lines tent at Kravos is at the Sixth's fire, in the good coat with the badges taken off it, his hands held out to the coals. He has walked the whole line tonight, the clerk says, and stopped at four fires.

"Sergeant. We said you would know it was us when we asked. This is the asking." He turns his hands over. "In the morning the Edur go out onto the plain. When they go, the Sixth stays in the line. Whatever the Edur say. Whatever the hill says. Whoever comes down the line with an order to follow them out, and someone may. The Sixth stays exactly where it is standing now."

"That is all. It is not much. It is the whole of it."`,
        ch: e ? [{t:'"The Sixth will hold your picket."', fx:()=>{ if (!S.f.b7_c6_visitDone) { S.f.b7_c6_visitDone = 1; S.f.b7_c6_ask = 'picket'; b76L('thegg', 1); } }, go:'b7_c6_visit_edur'},
                 {t:'"Counting what?"', fx:()=>{ if (!S.f.b7_c6_visitDone) { S.f.b7_c6_visitDone = 1; S.f.b7_c6_ask = 'picket'; b76L('perrit', 1); } }, go:'b7_c6_visit_edur'},
                 {t:'Not now.', go:()=>startExplore()}]
              : [{t:'"The Sixth stays in the line."', fx:()=>{ if (!S.f.b7_c6_visitDone) { S.f.b7_c6_visitDone = 1; S.f.b7_c6_ask = 'stay'; b76L('tobet', 1); } }, go:'b7_c6_visit_leth'},
                 {t:'"Why?"', fx:()=>{ if (!S.f.b7_c6_visitDone) { S.f.b7_c6_visitDone = 1; S.f.b7_c6_ask = 'stay'; S.f.b7_c6_askedWhy = 1; b76L('ilsa', 1); } }, go:'b7_c6_visit_leth'},
                 {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c6_visit_edur:()=>({sp:'The eldest Edur', scene:'b7_field', txt:
`"Good," he says, to the first, or, to the second, after a while: "I do not know. That is why I am asking for a squad I have watched stand."

He inclines his head a finger's width. "We will look back," he says. "We always do. It is a habit your people taught us." Then he walks out again past the stakes toward the long grey shape on the plain, unhurried, and the dark takes him before he reaches it.${b76Say({thegg:`\n\nThegg watches him go. "He came back to ask," he says. "Edur don't."`, perrit:`\n\nPerrit has her hand flat on the grass. "He's right," she says. "They're counting. I can feel the sum."`, _:''})}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b7_c6_visit_leth:()=>({sp:'The captain', scene:'b7_field', txt:
`${S.f.b7_c6_askedWhy ? `He looks at the coals. "Because I am asking," he says. "That is what you said yes to, at Kravos. If I told you why, Sergeant, you would have to decide something, and I would rather you did not have to." He stands.` : `He nods, as at a thing already written down. "Good," he says, and stands.`}

"The cadre is Letherii," he adds, buttoning the good coat. "Cadre mages talk to Letherii officers. Not to the hill, and not to the Edur." He looks once at the ridge, at the lamps. "Stay in the line, Sergeant. Whatever you see." He goes on along the lane to the next fire he means to stop at.${b76Say({tobet:`\n\nTobet lets out a breath. "Stay where we're standing," he says. "I can do that. I've been doing it my whole life."`, ilsa:`\n\nIlsa, very low: "That's the most an officer has ever told anyone without writing it down."`, _:''})}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the fire: 1 the night before; 2 dawn; 3 the river (talk only); 4 under the walls. The games pass wraps this node: keep the id */
    b7_c6_fire:()=>{ const ph = b76Ph();
      if (ph === 3) return {sp:'The squad', scene:'b7_river', txt:
`No fire on the riverbank. The squad stands in the lee of a rock with its shields up and talks low, as soldiers talk with a river full of boats in front of them.`,
        ch:[{t:'Talk with the squad.', go:'b7_c6_fire_talk'},
            {t:'Not now.', go:()=>startExplore()}]};
      const rk = 'b7_c6_rest' + ph, walls = ph >= 4, dawn = ph === 2;
      return {sp:'The Sixth\'s fire', scene:walls ? 'b7_c6_walls' : 'b7_field', html:risingHTML(),
        again:()=> walls ? 'The Sixth\'s fire under the walls of Letheras, small.' : dawn ? 'The Sixth\'s fire at dawn, banked, and the ridge behind it.' : 'The Sixth\'s fire in the line, small, with its back to the ridge.', txt:
`${walls ? `The Sixth's fire under the walls of Letheras, small, made of somebody's cart. All round it on the verges of the road the rest of Lether's army is lighting fires too, in ones and twos, soldiers without companies and companies without officers.${b76Key() === 'stand' ? ' The Sixth sits round its fire in its ranks, from habit, and the soldiers going by on the road look at it as they would at a statue.' : b76Key() === 'break' ? ' The Sixth sits round its fire, all of it, which is more than most fires on this road can say.' : ''}` : dawn ? `The Sixth's fire at dawn, banked. ${S.f.b7_c6_dome ? 'Behind it the ridge, smoking a little. In front, the plain, very quiet.' : 'Behind it the ridge, the cadre\'s lamps still burning in daylight. In front, the Edur going out onto the plain.'}` : `The Sixth's fire in the line, small, with its back to the ridge, as every fire in the line has its back to the ridge tonight without anybody having said so.`}${b76Say({tobet:`\n\nTobet cuts a notch in his tally-stick by the coals. He does not say what for.`, ammet:`\n\nAmmet has her bag in her lap and her hand on the clasp, as if somebody might ask.`, _:''})}${b7In('sorvan') ? `\n\nSorvan sits a little back from the coals with the blue scale on, which he has not taken off since Kravos, oiling his lance-head.` : ''}`,
        ch:[...(ph <= 2 && !S.f.b7_c6_dome ? [b7ReadChoice(6)] : []),
            {t:'Sit an hour. Let the squad rest.', req:()=>(ph === 1 || ph === 4 || (ph === 2 && !!S.f.b7_c6_dome)) && !S.f[rk], fx:()=>{ S.f[rk] = 1; rest(walls ? 'The squad sits an hour at the fire under the walls. Wounds close, mostly.' : 'The squad sits an hour at the fire in the line. Wounds close, mostly.'); }, go:'b7_c6_fire_rest'},
            {t:'Talk with the squad.', go:'b7_c6_fire_talk'},
            {t:`${b76TeachNm()} is looking at the ridge.`, req:()=>dawn && !S.f.b7_c6_wardTried && !S.f.b7_c6_dome && b76Teach() !== 'escort', go:'b7_c6_ward'},
            {t:'Sleep. The field is in the morning.', req:()=>ph === 1 && !!S.f.b7_c6_ennic && !!S.f.b7_c6_visitDone, onward:true, go:'b7_c6_sleep'},
            {t:'March. The army goes to the river.', req:()=>dawn && !!S.f.b7_c6_orders, onward:true, go:'b7_c6_march'},
            {t:'In through the gate, in the morning.', req:()=>walls && !!b76Road(), onward:true, go:'b7_c6_end'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c6_fire_rest:()=>({sp:'The Sixth\'s fire', scene:b76Ph() >= 4 ? 'b7_c6_walls' : 'b7_field', txt:
`${b76Ph() >= 4 ? 'An hour, then, under the walls, with the city making its noise on the far side of them.' : 'An hour, then, with the coals and the line and the ridge at your back.'}

${b76Say({ammet:`Ammet goes round the squad with her roll of tools. "Hold still." She stitches what wants it. "${b76Ph() >= 4 ? 'Drink, after,' : 'No drink tonight,'}" she says, to everybody, as a rule.`, perrit:`Perrit sits at the end of the row and counts the squad as it falls asleep, under her breath, like a sum she expects to come out.`, _:'Some of them sleep with their shields for pillows. The rest watch the dark without meaning to.'})}${b76If('thegg', `\n\nThegg lies down across the line of the squad, which is where he sleeps in the field, and talks to his mother's dead under his breath in her tongue.`)}${b76If('tobet', `\n\nTobet counts his arrows twice, then sleeps with them.`)}`,
      ch:[{t:'Back to the fire.', go:'b7_c6_fire'}]}),
    b7_c6_fire_talk:()=>{ const late = !!S.f.b7_c6_dome, ln = [];
      if (b7In('tobet')) ln.push(late ? `Tobet turns the tally-stick over and over. "They put the Indebted at the front of the levy battalions," he says. "At the river. I saw it from the line." He puts the stick away. "Same as always. It's just that this time the front was the part that got away."` : `Tobet looks out past the stakes at the foreign fires. "If they win," he says, carefully, "do you think they keep ledgers?" He considers. "Everybody keeps ledgers."`);
      if (b7In('thegg')) ln.push(late ? `Thegg sits very still with his hands on his knees. "The Edur walked home," he says at last. "Past all of us. Not one of them looked down." He thinks about it. "My mother's people walked away from a king like that, once. It's in the songs. Nobody in the songs looks down either."` : `Thegg has his back to the stakes and his face to the ridge. "I don't like a hill with lamps on it," he says. "In the pit towns, lamps on a hill meant the bailiff was counting." He looks at the cadre's line of lights. "That's a lot of counting."`);
      if (b7In('perrit')) ln.push(late ? `Perrit is doing sums on the back of her hand with a wet finger and wiping them out. "It was meant to reach the whole plain," she says. "The Edur and the foreigners, together. I felt the sum on it." She wipes it out again. "And something out there held it. Something foreign. I don't know what a Hold that size is called. We don't have one."` : `Perrit has her tiles in the calfskin and her back to the ridge. "The Holds are being pulled," she says. "All of them, toward the crest, like water toward a drain." She is quiet a moment. "Cadre school teaches you never to pull on all of them at once. I'd like to know who forgot."`);
      if (b7In('ammet')) ln.push(late ? `Ammet is counting her lint into piles. "Not one of them on the plain will need me," she says. "Whatever came off that ridge." She tests the point. "That's the first time I've been glad to be out of work."` : `Ammet puts the last of her bandage away. "Tomorrow they say we watch," she says. "Watching's when I get the worst of it. Afterwards." She looks at you. "Hold still, Sergeant. You've got the look."`);
      if (b7In('ruuk')) ln.push(late ? `Ruuk is lying on his back looking at the sky. "In Faraed," he says, "when the spirits shout like that, you go home for a season and let them settle." He grins at nothing. "The Edur went home. Faraed would call that sensible."` : `Ruuk is lying on his back in the grass, looking at the ridge upside down. "No birds on it," he says. "All week. Birds know."`);
      if (b7In('brune')) ln.push(late ? `Brune has her boots off. "The river tomorrow," she says, after a long quiet. "Water I know." She wriggles her toes in the dust. "The Shore will hear me there. I'll ask it to be slow about it."` : `Brune has her feet in the dust where she would have them in the water. "The plain's too flat," she says. "Like a sea with no sea in it." She looks at the foreign fires. "They came over the sea, those. The Shore let them."`);
      if (b7In('pessa')) ln.push(late ? `Pessa has the boathook upright between her knees. "The levies ran from the ridge," she says, "and it wasn't even them it was aimed at." She snorts. "Good. Somebody in this army should learn to run before they're told."` : `Pessa has the boathook upright between her knees. "The officers said the Edur go first," she says. "It's the first order I've liked in eleven years."`);
      if (b7In('ilsa')) ln.push(late ? `Ilsa sits with the grey coat on her knees, not wearing it. "Somebody will write this down," she says. "What the ridge was for. In a file." She folds the coat smaller. "It'll say something else. Files always do. I used to be the something else."` : `Ilsa is watching the carriage on the crest. "The Chancellor's man," she says. "I filed his expenses once. He bills the palace for his own carriage." She almost smiles. "I wonder who he's billing for tonight."`);
      if (b7In('sorvan')) ln.push(late ? `Sorvan has stopped oiling the lance. "In Bluerose," he says, "an officer who sends his own horse onto bad ground to see if it holds is hanged from his own stirrups." He goes back to the lance-head. "I would like to see the ridge's stirrups."` : `Sorvan is oiling his lance-head. "No cavalry on the field," he says. "Not one horse." He holds the head to the firelight. "Whoever planned this does not mean anybody to charge. They mean to watch."`);
      return {sp:'The Sixth\'s fire', scene:b76Ph() === 3 ? 'b7_river' : b76Ph() >= 4 ? 'b7_c6_walls' : 'b7_field', txt:ln.length ? ln.join('\n\n') : `The squad is quiet tonight. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b7_c6_fire'}]}; },

    /* the night: b7HeatTier read, a watched squad sleeps badly */
    b7_c6_sleep:()=>{ const h = b7HeatTier(), bad = b76Watched() && !S.f.b7_c6_watcherGone;
      return {sp:'The line, at night', scene:'b7_field', html:risingHTML(), txt:
`The squad lies down in its place in the line, in its cloaks, with its weapons by it.

${h === 'clean' ? 'The night is quiet. Up on the ridge the cadre\'s lamps burn steadily and somebody up there is chanting, so low it is more a feeling in the ground than a sound. The Sixth sleeps anyway, mostly, as soldiers sleep before a battle they have been told they will only watch.' : h === 'noted' ? 'Some time after midnight a lantern comes along the lane, slowly, held low, and stops at the Sixth, and goes along the row of sleepers face by face, and goes on. The Sixth sleeps very little after that, though everybody pretends.' : bad ? 'The man in the grey coat sits at his fire across the lane all night, with his hands in his sleeves, watching the Sixth sleep, and so the Sixth does not. By the time the sky goes grey every one of them has counted his breaths a thousand times.' : 'The grey coat\'s fire across the lane is cold, and the lane is empty. Up on the ridge the cadre\'s lamps burn, and the Sixth, for once, sleeps.'}${b76If('thegg', `\n\nIn the dark Thegg sits up once, and looks at the ridge, and lies down again.`)}`,
        ch:[S.area === 'b7_c6_dawn' ? {t:'First light. The field.', fx:()=>{ S.f.b7_c6_ph = Math.max(2, S.f.b7_c6_ph || 1); }, go:'b7_c6_dawn'} // already on the field at dawn: it stays
            : {t:'First light. The field.', onward:true, fx:()=>{ S.f.b7_c6_ph = 2; if (bad && !S.f.b7_c6_badNight) { S.f.b7_c6_badNight = 1; b76Mates().slice(0, 2).forEach(b76Rattle); } }, go:()=>{ startExplore('b7_c6_dawn'); talk('b7_c6_dawn'); }},
            {t:'Not now.', go:()=>startExplore()}]}; },

    /* ======== phase 2: dawn on the field ======== */
    b7_c6_dawn:()=>({sp:'The line, at dawn', scene:'b7_field', txt:
`Dawn on the field before Letheras. The sky goes grey and then white along the east, and out on the plain the long grey shape of the Edur stands up, all at once, and becomes an army.

They go out toward the foreigners' ring in a long column, unhurried, the way Edur go anywhere, with their long blades and their shadows. No drum. No Letherii company goes with them. ${b76K4() === 'edur' ? `The Sixth is at the Edur's picket at the plain's edge, in the gap the width of a squad. As the column passes, the eldest steps out of it, looks at the Sixth in the gap, nods once, and steps back in. "Hold," he says, and goes.` : `Down the line, at the levy battalion's standard, the captain watches the Edur go with his hands behind his back. A rider comes along the lane from the hill calling for the Whitefinders to follow the Edur out in support, and the Finadd reads the order, and folds it, and puts it in his coat, and the Sixth stays where it is standing.`}

On the ridge behind the line the cadre's lamps are still burning in the daylight. The chanting has stopped.${S.f.b7_c6_badNight ? `\n\nThe Sixth did not sleep. It shows.` : ''}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b7_c6_dawn_ennic:()=>({sp:B5_FINADD.name, scene:'b7_field', fx:()=>{ if (!S.f.b7_c6_dawnEnnic) { S.f.b7_c6_dawnEnnic = 1; gain('b7_c6_fingershield'); } }, again:()=>'The Finadd, by the standard, watching the ridge.', txt:
`The Finadd is by the standard with the battalion wagon's tailboard down behind him, and on the tailboard six old parade shields, oak under leather, with the white fingertip painted on every face.

"The battalion's," he says. "For the Emperor's birthday parade. There has not been one in some years." He hands you one. "The Sixth may as well carry one. I find I would like somebody to." He looks up at the ridge. "The chanting stopped an hour ago. In my experience, Sergeant, when the people on the hill go quiet, the people below it should find something solid to stand behind."${S.f.b7_c6_dome ? '' : ` He nods at the stakes. "The plain. Watch it. We were told to watch."`}`,
      ch:[{t:'"Yes, sir."', go:()=>startExplore()}]}),

    /* the trick: the Cadre's Ward. Perrit, else Ammet, else the cadre's old escort */
    b7_c6_ward:()=>{ const w = b76Teach();
      return {sp:w === 'escort' ? 'The cadre\'s old escort' : b76TeachNm(), scene:'b7_field', again:()=>S.f.b7_c6_wardOk ? 'A grey that sits on the ground.' : 'The ridge, and the grey you could put under it.', txt: w === 'perrit' ?
`Perrit is at the foot of the ridge path with her face turned up to the crest, pale to the lips.

"It's nearly done," she says. "Whatever it is. They've been pulling on every Hold at once for a week and now it's full." She swallows. "I can't stop it. I can do the first thing the cadre ever taught me, and put a ward over us." She crouches and lays her hand flat on the grass. "It's not much. It's a grey that sits on the ground and won't be seen through. Bows lose you in it. So does anything else that's looking." She holds her other hand out. "Here. Hand down. Feel where the Holds are thin and lay it there. Quickly."` : w === 'ammet' ?
`Ammet has a surgeon's pot by her boots, the one she burns soiled bedding in, and a blanket from the wagon soaking in a bucket.

"I can't do what they're doing up there," she says, with a look at the crest. "Nor what Perrit would. But every surgeons' tent in the army knows this." She shows you: wet wool on coals, the lid tilted just so. "Smoke that lies low and doesn't rise. You put it between the stretcher party and the bows, and the bows lose them." She hands you the blanket. "Not sorcery. Laundry. Wring that out. Not that much."` :
`The old soldier of the cadre's escort is sitting at the foot of the ridge path, turned back by the guard after twenty years of walking up it behind the cadre.

"They put a ward over the line before a battle," he says. "Every battle. I've stood under it a hundred times. A grey on the ground, and the bows lose you." He spits. "Soldiers can't do the ward. But the surgeons do the soldier's version, with smoke off wet bedding, and I've watched both long enough to know where it goes." He gets up stiffly. "Not where you'd think. Where the bows are looking. I'll show you."`,
        ch:[{t:'Learn it: where the grey goes, and how to lay it.', check:['wits', 16], trick:'b7_c6_ward', req:()=>!S.f.b7_c6_wardTried, fx:()=>{ S.f.b7_c6_wardTried = 1; },
              edges:id=>[id === 'perrit' && ['the cadre taught her this first', 3], id === 'ammet' && ['every surgeons\' tent burns bedding', 2], id === 'tobet' && ['a bowman knows what a bowman cannot see through', 1], id === 'brune' && ['sea mist; she has fished in worse', 1], id === 'sgt' && ['you have stood under the cadre\'s ward before', 1], S.f.b7_c6_levyOk && ['the levy told you what is on the ridge', 1], id === 'thegg' && ['he cannot make himself small enough to hide', -1], id === 'ruuk' && ['he will not look at the cadre\'s work', -1], id === 'pessa' && ['she would rather hit the bowman', -1]],
              near:{t:()=>`Yes, but laying it takes something out of ${b76Nm(b76Who())}: a nosebleed that will not stop till noon, and a ringing in the ears. Rattled.`, fx:()=>b76Rattle(b76Who())},
              go:'b7_c6_ward_ok', fail:'b7_c6_ward_no'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c6_ward_ok:()=>({sp:'The ridge path', scene:'b7_field', fx:()=>{ S.f.b7_c6_wardOk = 1; }, txt:
`For a breath the grass at your feet goes grey, and the ridge above you blurs, and then it is gone again. ${by({sgt:'You can', perrit:'Perrit nods, once. She', ammet:'Ammet grunts. She', _:'{who} can'})} put a grey on the ground where the bows are looking.

${b76Teach() === 'perrit' ? '"Good," Perrit says. "Now when the light comes off the ridge, don\'t be standing on anything." She does not explain. She does not look as if she could.' : b76Teach() === 'ammet' ? '"There," Ammet says. "Now you can hide from arrows, and I can stop sewing them out of you. Everyone wins."' : '"That\'s it," the old escort says. "Twenty years I carried their lamps. First time anybody asked."'}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b7_c6_ward_no:()=>({sp:'The ridge path', scene:'b7_field', txt:
`It will not lie down. The grey comes up and blows away, or the smoke rises straight, and the ridge stays exactly as sharp as it was.

"It takes years," ${b76Teach() === 'escort' ? 'the old escort says' : `${b76TeachNm()} says`}. "We haven't got years. We've got this morning."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the wave off the ridge, and a silver dome far off on the plain (seen from the line; never named, never nearer) */
    b7_c6_wave:()=>{ if (!S.f.b7_c6_dawnEnnic) return {sp:'The stakes', scene:'b7_field', txt:
`The stakes, and the plain beyond, and the Edur going out across it in their long column. The Finadd is at the standard and wants a word before the Sixth stands to.`,
        ch:[{t:'Back to the line.', go:()=>startExplore()}]};
      if (S.f.b7_c6_dome) return DLG.b7_c6_wave_after();
      return {sp:'The plain', scene:'b7_c6_dome', fx:()=>{ S.f.b7_c6_dome = 1; }, txt:
`The Edur are a long way out now, a grey line on the grey plain, nearly at the foreigners' ring. The whole army of Lether stands in its line and watches them, as it was told to.

Then the ridge behind the line takes a breath.

There is no other way to say it. The air goes tight. Every hair on every arm in the Whitefinders' line stands up at once, and the cadre's lamps along the crest flare white, all together, and something comes off the ridge and out over the heads of the army: a light, low, rolling, as wide as the plain, moving out across it faster than a horse, with the stubble going white in front of it and black behind.

It goes over the Edur. It goes toward the foreigners' ring.

And out on the horizon, where the ring was, a dome of silver fire stands up out of the ground, small with distance, bright as a coin in the sun, and the light off the ridge breaks against it like surf against a rock, and goes up, and over, and round, and does not get through.

It holds while the army watches. It holds longer than anybody in the line can bear to keep watching, and they keep watching.

Then the light off the ridge is spent, and falls, and the silver dome dims, slowly, as a coal goes out, and is gone.${b76Say({perrit:`\n\nPerrit is on her knees in the grass with both hands flat on the ground and blood on her lip. "It was for all of them," she says. "All of them. The Edur too."`, ammet:`\n\nAmmet has her hand over her mouth, and takes it away, and says, in her surgeon's voice, "Nobody move until I've looked at you."`, _:''})}`,
        ch:[{t:'Look at the plain.', go:'b7_c6_wave_after'}]}; },
    b7_c6_wave_after:()=>({sp:'The plain', scene:'b7_c6_dome', fx:()=>{ S.f.b7_c6_dome = 1; }, again:()=>'The plain, burned in a long fan from the ridge, and quiet.', txt:
`The plain is burned black in a long fan out from the ridge, all the way to where the ring was, and smoking. Out at the end of it, where the dome stood, there is a patch of ground that is not burned at all, round, and on it, small with distance, figures standing.

Grey figures, a great many of them. And others among them, not grey.

On the ridge the cadre's lamps are out. The two banners at the north end of the crest are still there. The figures under them have not moved.

All along the Letherii line there is no sound at all, and then there is a great deal of it.${b76K4() === 'letherii' ? `\n\nDown the line, at the levy battalion's standard, the captain is standing exactly where he stood at dawn, with his hands behind his back. He is not surprised. You can see from here that he is not surprised.` : `\n\nThe Edur's picket at the plain's edge is empty except for the Sixth.`}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the Edur walk home: on 'edur', the eldest stops at the Sixth's picket; on 'letherii', the captain */
    b7_c6_home:()=>{ const e = b76K4() === 'edur';
      return {sp:e ? 'The eldest Edur' : 'The captain', scene:'b7_field', txt:
`The Edur come back across the burned plain in the middle of the morning, walking, in no order at all, and come to the Letherii line, and walk through it.

They do not stop for the stakes. They do not stop for the companies. Letherii soldiers get out of their way without being asked, and the Edur go through the line and past the foot of the ridge and away north off the plain, toward their own villages a long way up the coast, every one of them, without looking up at the crest. They are going home. It is in the way they walk. An empire does not walk like that. People going home do.

${e ? `The eldest stops at the Sixth's picket. He is grey with ash to the knees, and there is a burn on one side of his face that has taken the eyebrow, and he looks at the Sixth in its gap in the stakes for a long breath.` : `When they have gone, the captain comes along the lane from the levy battalion's standard, alone, with his hands behind his back, and stops at the Sixth.`}`,
        ch:[{t:e ? '"You looked back."' : '"You knew."', go:e ? 'b7_c6_home_eldest' : 'b7_c6_home_captain'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b7_c6_home_eldest:()=>({sp:'The eldest Edur', scene:'b7_field', fx:()=>{ if (!S.f.b7_c6_homeDone) { S.f.b7_c6_homeDone = 1; S.f.b7_c6_edurWord = 1; b76L('thegg', 1); b76L('perrit', 1); } }, txt:
`"We looked back," he says. "You were standing." He looks past you at the crest. "Your ridge was for us as well, Sergeant. The foreigners and the Edur, in one place, and one fire for both. Something of theirs held it over all of us. I do not know what. It is not holding now."

He is quiet a moment. "We sheltered under a foreigner's fire from a Letherii one. I will remember that longer than I will remember the empire." He turns toward the north. "We are going home. Your emperor is yours. Your ridge is yours. Have them."

He goes. At the road he looks back once, at the Sixth's gap in the stakes, and lifts a hand, and then he is one more grey back among a great many, going away.${b76Say({thegg:`\n\nThegg watches him all the way to the road. "He looked up at me at Kravos," he says. "I'm glad it was us he looked back at."`, perrit:`\n\nPerrit wipes the blood off her lip. "He's right," she says. "It was for everyone."`, _:''})}${b7In('sorvan') ? `\n\nSorvan says something in Bluerose that is not a prayer.` : ''}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b7_c6_home_captain:()=>({sp:'The captain', scene:'b7_field', txt:
`"We knew it was meant to reach the plain," he says. "The cadre told us that much, and that the Edur would be out on it, and that the hill meant it to have both. We did not know the foreigners had anything to put against it." He looks out at the round unburned patch at the end of the black fan. "Nor did the hill."

"We asked you to stay in the line, Sergeant, so the Sixth would not be out there when it came. We asked twelve companies. Every one of them stayed." He looks at you. "You may think what you like of it. I would think it quietly."`,
      ch:[{t:'"Twelve companies kept out of it. And the rest of the Edur?"', fx:()=>{ if (!S.f.b7_c6_homeDone) { S.f.b7_c6_homeDone = 1; S.f.b7_c6_captainKnew = 'asked'; b76L('ilsa', 1); b76L('tobet', -1); } }, go:'b7_c6_home_captain2'},
          {t:'Say nothing. Let him go.', fx:()=>{ if (!S.f.b7_c6_homeDone) { S.f.b7_c6_homeDone = 1; S.f.b7_c6_captainKnew = 'quiet'; b76L('tobet', 1); b76L('thegg', -1); } }, go:'b7_c6_home_captain2'}]}),
    b7_c6_home_captain2:()=>({sp:'The captain', scene:'b7_field', txt:
`${S.f.b7_c6_captainKnew === 'asked' ? `"The Edur have gone home," he says. "Which is what we wanted. We would have liked it cheaper for them. We were not asked how." He turns to go. "Neither were you. Remember that, when somebody writes it down."` : `He waits for you to say it, and you do not, and he nods as if that were what he had come for.`}

He goes back along the lane to his standard. Up on the ridge, the two banners at the north end of the crest are being taken down.${b76Say({tobet:`\n\nTobet, half a step behind you, very low: "They saved us," he says. "I know. I just wish they'd been asked by somebody I liked."`, ilsa:`\n\nIlsa is pale. "There'll be a file," she says. "And the file will say the foreigners did it."`, _:''})}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* deserters running from the foot of the ridge (optional): stop them, talk them out of the bag (rise:true), or let them go. The chapter's own ±1 */
    b7_c6_deserters:()=>({sp:'Levies running from the ridge', scene:'b7_field', again:()=>'The levies from the ridge, stopped at the Sixth\'s stretch of the line, the bag between them.', txt:
`They come down off the foot of the ridge in a bunch, twenty or so, levies and two or three soldiers of the line who have torn their badges off: the ones who carried for the cadre, by their raw hands, running from whatever they saw up there when the light went out. Between two of them, a cadre mage's leather bag.

They have come through the levy battalion's stretch of the line without anyone stopping them. The Sixth is next. Down the lane a provost's corporal is shouting at the Whitefinders to hold them.

The one in front is a soldier with a cut lip and a drawn sword. "Let us by," he says. "We're not going back up there. Not for the hill. Not for anyone."${b76If('tobet', `\n\nTobet looks at their hands. "Water-carriers," he says. "Indebted, most of them."`)}`,
      ch:[{t:'"Hold them." Stop them, as the provost says.', go:()=>startBattle('b7_c6_deserters', {})},
          {t:'Talk to them. They can go, without the bag.', check:['guile', 15], rise:true,
            edges:id=>[id === 'tobet' && ['Indebted, talking to Indebted', 2], id === 'ammet' && ['she offers to look at their hands, and means it', 2], id === 'pessa' && ['she has run from an army herself, and says so', 1], id === 'sgt' && ['you have the Finadd\'s look about you this morning', 1], id === 'thegg' && ['a very large soldier in the way of running men is a wall', -1], id === 'ilsa' && ['they can smell the Patriotists on her', -2]],
            near:{t:()=>`Yes, but the soldier with the cut lip gives up the bag with his sword-hilt, hard, into ${b76Nm(b76Who())}'s ribs, before he goes. ${b76Nmc(b76Who())}'ll feel it at the river.`, fx:()=>bruise(b76Who(), bruiseN())},
            fx:()=>{ S.f.b7_c6_desTried = 1; }, go:'b7_c6_deserters_talk', fail:'b7_c6_deserters_no'},
          {t:'Step aside. Let them go, bag and all.', go:'b7_c6_deserters_let'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c6_deserters_no:()=>({sp:'Levies running from the ridge', scene:'b7_field', txt:
`The soldier with the cut lip hears the first sentence and decides it is a trick, and shouts, and the bunch comes at the Sixth's stretch of stakes all at once.`,
      ch:[{t:'Hold them.', go:()=>startBattle('b7_c6_deserters', {surprise:'e'})}]}),
    b7_c6_deserters_let:()=>({sp:'Levies running from the ridge', scene:'b7_field', fx:()=>{ if (!S.f.b7_c6_deserters) { S.f.b7_c6_deserters = 'let'; b7Rise(1, 'deserters let go before the walls'); b76L('tobet', 1); b76L('pessa', 1); b76L('perrit', -1); } }, txt:
`You step aside. The Sixth steps aside with you. The levies go through the gap in the stakes at a run, out onto the burned plain and away south, bag and all, and the provost's corporal down the lane shouts himself hoarse at the Whitefinders and gets nothing.

"Fourteen companies saw that," the Finadd says, later, mildly. "I will put it down as the confusion." He caps his pen. "There was a great deal of confusion this morning."${b76If('pessa', `\n\nPessa watches them go. "Good," she says. "Somebody should."`)}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b7_c6_deserters_talk:()=>({sp:'Levies running from the ridge', scene:'b7_field', fx:()=>{ if (!S.f.b7_c6_deserters) { S.f.b7_c6_deserters = 'talked'; b7Rise(1, 'deserters let go before the walls'); gain('b7_c6_ridgecharm'); b76L('tobet', 1); b76L('ammet', 1); } }, txt:
`You tell them the bag is the cadre's and the cadre will come for it, and a levy with a cadre bag is a levy the Patriotists will find, and a levy without one is just a man walking south who got lost in the confusion, of which there was a great deal this morning.

The soldier with the cut lip looks at the bag, and at you, and puts it down in the grass. Then they go through the gap in the stakes, out onto the burned plain, at a run.

In the bag: chalk, silver wire, a cadre mage's notebook in a hand too small to read, and on a cord, a disc of black stone ruled with the Holds' lines, warm in the hand.${b7In('perrit') ? ` Perrit will not touch it bare-handed. "It was on the ridge," she says. "It's still humming."` : ''}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b7_c6_deserters_after:()=>({sp:'The foot of the ridge', scene:'b7_field', fx:()=>{ if (!S.f.b7_c6_deserters) { S.f.b7_c6_deserters = 'fought'; gain('b7_c6_ridgecharm'); } }, txt:
`The deserters scatter back along the foot of the ridge, the ones who can, and the provost's corporal comes up the lane at last with two men to collect the ones who cannot, and thanks the Sixth, with his eyes on the grass.

The cadre's bag is in the grass. Chalk, silver wire, a notebook in a hand too small to read, and on a cord a disc of black stone ruled with the Holds' lines, warm in the hand. It goes in the kit.${b76Say({ammet:`\n\nAmmet is already among the deserters on the ground with the needle. "Hold still," she says. "You ran from the right thing. You just ran the wrong way."`, perrit:`\n\nPerrit looks at the disc and does not touch it. "It was on the ridge," she says.`, _:''})}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the hill's orders: march for the river */
    b7_c6_orders:()=>({sp:B5_FINADD.name, scene:'b7_field', fx:()=>{ S.f.b7_c6_orders = 1; }, again:()=>'The Finadd, by the standard, with the order folded in his hand.', txt:
`The Finadd has an order in his hand, come down off the hill by a rider whose horse is lathered to the girth.

"The foreigners have a fleet on the river," he says. "Their main army, it seems. The ones on the plain were not all of them, or even most." He reads it again, because he always does. "They are landing below the city. The army marches to meet them on the bank. All of it. Now." He folds it. "There is no mention of the Edur. There is no mention of the ridge. I gather we are to behave as if neither happened."

He looks up at the crest, where the cadre is being carried down the path on stretchers, one after another, under blankets.

"Get the Sixth on the road, Sergeant."`,
      ch:[{t:'"Yes, sir." To the fire, and the road.', go:'b7_c6_fire'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 3: the river ======== */
    b7_c6_march:()=>({sp:'The road to the river', scene:'b7_river', fx:()=>{ S.f.b7_c6_ph = 3; }, txt:
`The army of Lether marches east for the river, what is left of it, without the Edur and without the cadre, on a road that is suddenly very wide.

It marches a day and a night, and does not sing. The levy battalions lose men at every crossroads, quietly, and the officers do not count them, and by the second dawn the army comes down onto the flats along the Lether River below the city, and forms its line on the bank in the mist.

When the mist lifts, the river is full of ships.${b76If('brune', `\n\nBrune stops dead on the bank and looks at them, and her lips move. She is counting hulls, the Shake way, by the sail.`)}`,
      ch:[{t:'The bank.', onward:true, go:()=>{ startExplore('b7_c6_bank'); talk('b7_c6_bank'); }}]}),
    b7_c6_bank:()=>({sp:'The riverbank', scene:'b7_river', txt:
`Ships. Big ones with three masts and little ones with oars, barges and fishing boats and things that look like both, all the way down the river to the bend and out of sight, and every one of them crowded to the rail with soldiers in grey-green.

The boats are already coming in. They come in at a run, oars and sail together, and ground in the shallows, and the soldiers come off them into the water to the waist and form up while they are still in it. There are no shouted orders. They seem to know.

Lether's line is drawn up on the bank to meet them, as far as the eye goes in either direction. It looks very long and very thin.${b76Say({tobet:`\n\n"From back here," Tobet says, half a step behind you, "they look like they've done this before."`, ammet:`\n\nAmmet looks at the boats, and then at her roll of tools, and does a sum, and does not like it.`, _:''})}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b7_c6_bank_ennic:()=>({sp:B5_FINADD.name, scene:'b7_river', fx:()=>{ S.f.b7_c6_bankEnnic = 1; }, again:()=>'The Finadd, on the bank, with the standard planted in the reeds.', txt:
`The Finadd has planted the battalion standard in the reeds on the bank, and stands by it with his pen in his coat and a sword in his hand, which you have never seen.

"The Sixth holds the bank here," he says. "From the dead tree to the rock. The levies are either side." He watches the boats come in. "The foreigners do not seem to me to be an army that stops at the water's edge, Sergeant. I suggest we do not let them reach it."${S.f.b7_c6_wardOk ? `\n\nHe glances at the squad. "And if anybody in the Sixth knows how to make it hard for those crossbows to see us," he adds, "today would be the day."` : ''}`,
      ch:[{t:'"From the tree to the rock. Yes, sir."', go:()=>startExplore()}]}),
    b7_c6_ships:()=>({sp:'The water\'s edge', scene:'b7_river', again:()=>'The water\'s edge, and the river full of ships.', txt:
`The water's edge, reeds and mud and the river very wide. ${S.f.b7_c6_landingDone ? 'The boats that came in here are drifting now, empty, and more are going past downstream to land somewhere the line has already gone.' : 'Out on the river, a long way off, one ship bigger than the rest flies a standard nobody on the bank can read, and does not come in. Close in, the boats keep coming.'}`,
      ch:[{t:'Back to the bank.', go:()=>startExplore()}]}),

    /* the landing: the Adjunct's regulars off the boats (never marines, never the Third). The main fight */
    b7_c6_boats:()=>({sp:'Soldiers off the boats', scene:'b7_river', again:()=>'The foreigners at the water\'s edge, forming up.', txt:
`A boat grounds in the reeds below the Sixth's stretch of bank, and then another, and the soldiers come off them into the water: grey-green cloaks over mail, round shields, short swords, and helmets with cheek-pieces that hide everything but the eyes. They form up in the shallows in a line as straight as the Whitefinders' on parade, and start up the bank.

They are not the ones who were on the plain. Those were fewer, people said, and came at night. These have come by daylight, all of them at once, to the front door.${b76If('thegg', `\n\nThegg sets his feet in the mud. "Behind me," he says.`)}${b76If('sorvan', `\n\nSorvan levels the cut-down lance at the bank. "No horses," he says. "Mine or theirs. Good."`)}`,
      ch:[{t:'"Sixth. Hold the bank."', go:()=>startBattle('b7_c6_landing', {})},
          {t:'Meet them at the water, while they are still in it.', check:['might', 15],
            edges:id=>[id === 'thegg' && ['nobody comes up a bank past Thegg', 3], id === 'brune' && ['water is where she fights best', 2], id === 'pessa' && ['she has hooked men off boats before', 2], id === 'sorvan' && ['a lance is long enough to reach a boat', 1], id === 'sgt' && ['you know where the footing goes', 1], id === 'ilsa' && ['clerks do not fight in rivers', -2], id === 'perrit' && ['the Holds are full of something foreign; she flinches', -1]],
            near:{t:()=>`Yes, but the mud takes ${b76Nm(b76Who())}'s feet out at the first push, and the river is cold and full of shields. ${b76Nmc(b76Who())}'ll feel it in the fight.`, fx:()=>bruise(b76Who(), bruiseN())},
            go:()=>startBattle('b7_c6_landing', nearMiss() ? {} : {surprise:'p'}), fail:'b7_c6_boats_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c6_boats_seen:()=>({sp:'Soldiers off the boats', scene:'b7_river', txt:
`The Sixth goes down the bank at them, and the foreigners stop where they are, knee-deep, and lock their shields, and let the Sixth come to them through the mud. They have done this before. They have done it more than anyone on the bank.`,
      ch:[{t:'Hold.', go:()=>startBattle('b7_c6_landing', {surprise:'e'})}]}),
    b7_c6_landing_after:()=>({sp:'The riverbank', scene:'b7_river', fx:()=>{ S.f.b7_c6_landingDone = 1; }, txt:
`The Sixth's stretch of bank is the Sixth's. The boats that came in below it are drifting off downstream, empty, and the soldiers who came off them are back in the water or past caring.

It does not matter. Up and down the river, as far as you can see in either direction, the foreigners are on the bank, and Lether's line is going. Not breaking. Going: the levy battalions first, a company and then a whole battalion, backwards up the bank and then turning, and then running, and the companies of the line beside them looking at the gap where the levies were and then going too.

Either side of the Sixth there is nobody now. Down the bank to the east the foreigners are coming along the water's edge at a walk, and in front of them a squad with a sergeant at its head, a whistle on a cord at the sergeant's neck.${b76Say({ammet:`\n\nAmmet is among the squad with the needle. "Hold still," she says, very fast. "And then decide."`, perrit:`\n\nPerrit counts the companies going up the bank. She stops counting.`, _:''})}`,
      ch:[{t:'The Finadd.', go:'b7_c6_key'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the key, as the line wavers: stand or break */
    b7_c6_key:()=>({sp:B5_FINADD.name, scene:'b7_river', html:risingHTML(), again:()=>'The Finadd by the standard in the reeds, the line gone either side.', txt:
`The Finadd is by the standard in the reeds, with the sword in his hand, looking up and down the river at the army of Lether leaving it.

"The line has gone, Sergeant," he says. He says it as he would read a ration list. "Either side of us, and as far as I can see. The foreigners are coming along the bank, and the ones who ran are being run down on the flats behind us." He looks at the squad, and at you. "I have no orders. There is nobody left on this bank who could give me one."

"The Sixth can stand here, on its stretch of bank, from the tree to the rock, and see what that sergeant with the whistle makes of it. Or the Sixth can go with the rest, now, while the reeds are still between it and the crossbows." He waits. "I find I will do whichever you say. I find I have been doing that for some time."${b76If('thegg', `\n\nThegg has not moved. He is looking at the foreign sergeant coming along the bank.`)}${b76If('tobet', `\n\nTobet is looking up the bank, at the levies going. His people.`)}${b76If('pessa', `\n\nPessa has the boathook in both hands and is looking at the reeds.`)}${b7In('ilsa') ? `\n\nIlsa, very low: "Whichever. There's nobody left to write it down."` : ''}${b7In('sorvan') ? `\n\nSorvan, quietly: "In Bluerose a horse that runs from the line is a horse badly ridden. Nobody has ridden this army well."` : ''}`,
      ch:[{t:'"The Sixth stands." From the tree to the rock.', fx:()=>{ if (!S.f.b7_c6_key) { S.f.b7_c6_key = 'stand'; b76L('thegg', 1); b76L('sorvan', 1); b76L('perrit', 1); b76L('pessa', -1); b76L('tobet', -1); } }, go:'b7_c6_key_stand'},
          {t:'"With the rest. Into the reeds. Now."', fx:()=>{ if (!S.f.b7_c6_key) { S.f.b7_c6_key = 'break'; b76L('pessa', 1); b76L('tobet', 1); b76L('ammet', 1); b76L('thegg', -1); b76L('sorvan', -1); b7Rise(1, 'the Letherii army broke at the river'); } }, go:'b7_c6_key_break'},
          {t:'Not yet. "Give me a breath."', go:()=>startExplore()}]}),
    b7_c6_key_stand:()=>({sp:B5_FINADD.name, scene:'b7_river', html:risingHTML(), txt:
`"The Sixth stands."

The Finadd nods once, and pulls the standard out of the reeds and plants it again a pace forward, in the mud, where the foreign sergeant can see it.

"From the tree to the rock," he says. "I shall stand by the standard, which is what Finadds are for, I am told." He looks at his sword, and then at you. "Sergeant. I have never done this."${b76Say({thegg:`\n\nThegg sets his shield beside the Finadd's standard. "I have," he says. "Behind me, sir."`, sorvan:`\n\nSorvan sets the lance. "Good," he says. "Now we are a line."`, _:''})}${b76If('tobet', `\n\nTobet steps up beside you, not behind. For once, not behind.`)}`,
      ch:[{t:'The sergeant with the whistle.', go:()=>startBattle('b7_c6_stand', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c6_key_break:()=>({sp:B5_FINADD.name, scene:'b7_river', html:risingHTML(), txt:
`"With the rest. Into the reeds. Now."

The Finadd nods once, and pulls the standard out of the reeds, and looks at it, and gives it to the nearest levy running past, who takes it out of sheer surprise and keeps running with it.

"Then we run," he says. "Together, Sergeant, if you please. Not the way they are." He points with the sword along the bank to the west, to where the reeds go on head-high to the bend. "There. And do not stop for anybody until there are reeds over our heads."${b76Say({pessa:`\n\nPessa is already moving. "Reeds," she says. "Water. Follow me and don't splash."`, ammet:`\n\nAmmet slings her roll of tools. "I'll stitch you all when we stop," she says. "Run first."`, _:''})}${b76If('thegg', `\n\nThegg looks at the foreign sergeant a moment longer, and then turns, and runs, last, behind everyone.`)}`,
      ch:[{t:'Run.', go:()=>startBattle('b7_c6_break', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c6_stand_after:()=>({sp:'The Sixth\'s stretch of the bank', scene:'b7_river', fx:()=>{ if (!S.f.b7_c6_standDone) S.f.b7_c6_standDone = 1; }, txt:
`The foreign sergeant's squad pulls back down the bank, in order, the ones who can, and the sergeant with the whistle stands at the water's edge and looks at the Sixth for a long breath over the rim of a shield with three quarrels in it.

Then the sergeant points a short sword at the ground in front of the Sixth, and then along the bank toward the city, and says one word in a language nobody in the Sixth speaks.

It does not need translating. Walk.

The Sixth walks. The Finadd takes the standard out of the mud and carries it, and the Sixth goes up the bank in its file, in step, past foreigners who stop and watch it go and do not lift a crossbow at it. Behind, down on the flats, the foreigners are giving no quarter to the ones who ran. The Sixth keeps its face to the road.${b76Say({thegg:`\n\nThegg walks at the back, with his shield on his back, where a shield is no use at all. "They let us go," he says, low. "Because we stood." He shakes his head. "My mother's songs had that in them. I thought it was a song thing."`, perrit:`\n\nPerrit is walking very straight. "Stood," she says. "Stood, and lived. I didn't know that was one of the sums."`, _:''})}${b7In('sorvan') ? `\n\nSorvan, beside you: "That sergeant would have been cavalry, in Bluerose. Good hands."` : ''}`,
      ch:[{t:'The road to the city.', onward:true, fx:()=>{ S.f.b7_c6_ph = 4; }, go:()=>{ startExplore('b7_c6_walls'); talk('b7_c6_walls'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b7_c6_break_after:()=>({sp:'The reeds', scene:'b7_river', fx:()=>{ if (!S.f.b7_c6_breakDone) S.f.b7_c6_breakDone = 1; }, txt:
`The reeds close over the Sixth's heads, and the noise of the bank goes muffled and far, and for a long way there is only the water to the knee and the reeds and somebody's breathing, and then the reeds thin and there is a ditch, and a field, and a road, and the city's towers ahead in the haze.

The Sixth comes out onto the road all of it, by an arithmetic that would not stand an audit, and the Finadd counts it twice to be sure.

Behind, along the bank and the flats, the foreigners are giving no quarter to the ones who ran. You heard it in the reeds. You will hear it again, some nights. The Sixth keeps its face to the road.${b76Say({pessa:`\n\nPessa wrings out her shirt. "Canal," she says. "Told you. Never trust a soldier who can't wade."`, tobet:`\n\nTobet is shaking. "Ran," he says. "Ran, and lived. I've wanted to do that since I was born."`, _:''})}${b76If('thegg', `\n\nThegg comes out of the reeds last. He keeps whatever he saw back there to himself.`)}`,
      ch:[{t:'The road to the city.', onward:true, fx:()=>{ S.f.b7_c6_ph = 4; }, go:()=>{ startExplore('b7_c6_walls'); talk('b7_c6_walls'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== phase 4: under the walls of Letheras, night ======== */
    b7_c6_walls:()=>({sp:'Under the walls', scene:'b7_c6_walls', txt:
`The walls of Letheras at night, from the road. The gate is shut. The towers stand up black against a sky that is not dark enough, because somewhere inside the walls a quarter of the city is glowing, and the smoke from it lies along the battlements.

On the road the rest of Lether's army is coming in, in ones and twos, soldiers without companies and companies without officers, and lighting fires on the verges under the walls because the gate will not open until morning.

Going the other way, out of a postern by the gate that someone has left unbarred, people are coming out of the city with what they can carry, past the soldiers, without stopping. They are more frightened of what is inside the walls than of whatever is coming up the road behind the army.${b76Key() === 'stand' ? `\n\nThe Finadd sets the battalion standard in the verge by the Sixth's fire. A good many soldiers on the road look at it as they pass.` : `\n\nThe Finadd has no standard. He sits down by the Sixth's fire as if he had never had one.`}`,
      ch:[{t:'Walk on.', go:()=>startExplore()}]}),
    b7_c6_refugees:()=>({sp:'People coming out of the city', scene:'b7_c6_walls', fx:()=>{ S.f.b7_c6_refugees = 1; }, again:()=>'People on the road out of the city, going past the soldiers.', txt:
`A family comes along the road out of the city with a handcart: a man, a woman, two children, an old woman on the cart with the bedding. They stop at the Sixth's fire because the children are cold, and the woman holds their hands out to it without asking.

"There's no army in there," she says, when you ask. "There's the mob. They've got the streets from the canal to the Pursers' District, and they're round the Patriotists' place shouting a name." She shakes her head. "Not the Emperor's. Somebody else's. I didn't wait to hear whose." She looks at the soldiers along the road. "The Edur have gone. Every one. Walked out of the gates days ago and never looked back."

The children are warm. The family goes on, south, away.${b76If('ilsa', `\n\nIlsa watches them go. "Round the compound," she says. "I wish I could see it." She does not move to.`)}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),
    b7_c6_gate:()=>({sp:'The gate', scene:'b7_c6_walls', again:()=>'The gate of Letheras, shut till morning.', txt:
`The gate, shut, with a guard on the wall above it who calls down that it opens at first light for soldiers with officers and not before, and that there is nobody in the city to give him any other order, so it will have to do.

Through the gate's grating you can hear the city. It is not the sound a city makes at night. It is the sound a crowd makes when it has not decided yet what it is for.${b76Road() ? `\n\nIn the morning, then.` : `\n\nThe Finadd is at the Sixth's fire. He has something to ask before morning.`}`,
      ch:[{t:'Back to the fire.', go:()=>startExplore()}]}),

    /* the Letherii's road (S.f.b7_lethRoad): army / palace / free, read by Ch7's finale */
    b7_c6_road:()=>({sp:B5_FINADD.name, scene:'b7_c6_walls', html:risingHTML(), again:()=>'The Finadd at the Sixth\'s fire, with the roll open on his knee.', txt: b76Road() ?
`The Finadd is at the Sixth's fire with the company roll open on his knee and his pen uncapped. ${({army:'"The army, then," he says. "Whatever army it turns out to be." He writes.', palace:'"The palace, then," he says. "Whoever it turns out to be." He writes.', free:'"Out, then," he says. "I shall write every discharge myself. I have a pen." He writes.'})[b76Road()]}` :
`The Finadd is at the Sixth's fire with the company roll open on his knee, which he has carried through a battle and a river in an oilskin inside his coat beside the page, and his pen uncapped.

"It will be over in a day or two, Sergeant," he says. "One way or the other. The foreigners will come up the road behind us, and the gate will open, or it won't, and the mob will decide, or somebody will decide for it. And after that, whatever Lether is, it will need something from what is left of us."

He turns the roll so you can see the Sixth's page. "I should like to know, before then, what the Sixth means to be. I find I would like to write it down while it is still our choice."${b76Say({tobet:`\n\nTobet is listening from half a step behind. He does not say what he wants. He never has. He is waiting to see if anybody asks.`, thegg:`\n\nThegg is looking at the gate. "Somebody will want soldiers," he says. "Somebody always does."`, _:''})}${b7In('ilsa') ? `\n\nIlsa: "Whatever you say, he'll write it in ink. It's the only kind of file I trust."` : ''}`,
      ch: b76Road() ? [{t:'Back to the fire.', go:()=>startExplore()}] : [
          {t:'"Soldiers. Whatever army Lether has after."', fx:()=>{ if (!S.f.b7_lethRoad) { S.f.b7_lethRoad = 'army'; b76L('thegg', 1); b76L('sorvan', 1); b76L('ruuk', 1); b76L('pessa', -1); } }, go:'b7_c6_road_army'},
          {t:'"Whoever sits the throne will want guards who came back."', fx:()=>{ if (!S.f.b7_lethRoad) { S.f.b7_lethRoad = 'palace'; b76L('ilsa', 1); b76L('perrit', 1); b76L('ruuk', -1); } }, go:'b7_c6_road_palace'},
          {t:'"Out. Every one of us who wants it."', fx:()=>{ if (!S.f.b7_lethRoad) { S.f.b7_lethRoad = 'free'; b76L('tobet', 1); b76L('pessa', 1); b76L('brune', 1); b76L('thegg', -1); } }, go:'b7_c6_road_free'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b7_c6_road_army:()=>({sp:B5_FINADD.name, scene:'b7_c6_walls', txt:
`"Soldiers."

The Finadd writes it on the Sixth's page, in his neat hand, and blots it on his sleeve. "Whatever army Lether has after," he says. "I suspect it will be smaller, and better paid, and taught by foreigners, and I suspect I shall find that I do not mind." He caps the pen. "I shall keep the roll. Somebody must."${b76Say({thegg:`\n\nThegg nods slowly. "Soldiers," he says. "Good. I know how."`, sorvan:`\n\nSorvan: "An army will need horses. I will tell them so until they listen."`, _:''})}${b76If('pessa', `\n\nPessa says something in canal cant that is very specific, and then shrugs, and stays.`)}`,
      ch:[{t:'Back to the fire.', go:'b7_c6_fire'}]}),
    b7_c6_road_palace:()=>({sp:B5_FINADD.name, scene:'b7_c6_walls', txt:
`"Guards."

The Finadd writes it on the Sixth's page, and blots it, and looks at it. "Whoever sits the throne," he says. "There is a Palace Guard, I am told, which will be short of soldiers who did not run or did not lie. The Sixth has a record." He considers. "An interesting one. I shall present it in its best light. I have a great deal of practice with light."${b76Say({ilsa:`\n\nIlsa almost laughs. "Guarding a palace," she says. "From the other side of the door this time."`, perrit:`\n\nPerrit nods. "Walls," she says. "I like walls. They don't pull on anything."`, _:''})}${b76If('ruuk', `\n\nRuuk looks at the walls and sighs, cheerfully, as a man sighs who is already planning to leave.`)}`,
      ch:[{t:'Back to the fire.', go:'b7_c6_fire'}]}),
    b7_c6_road_free:()=>({sp:B5_FINADD.name, scene:'b7_c6_walls', txt:
`"Out."

The Finadd writes it on the Sixth's page, and blots it, and then, after a moment, writes something under it, smaller, and blots that too. "Every one of you who wants it," he says. "I shall write the discharges myself, when there is somebody to sign them for. I have a pen." He caps it. "What is owed, and to whom, in a city where nobody can find a ledger, I leave to the city."

"I wrote my own name under the Sixth's," he adds. "In case you were wondering. I find I would like to see what I am for, without a battalion."${b76Say({tobet:`\n\nTobet is quiet a while. Then he takes out the tally-stick and looks at it, and puts it away again, very carefully.`, pessa:`\n\nPessa grins. "Out," she says. "I've been out before. It's better with company."`, _:''})}${b76If('thegg', `\n\nThegg looks at the gate a long time. "Out," he says. "I'll have to think what that is."`)}`,
      ch:[{t:'Back to the fire.', go:'b7_c6_fire'}]}),

    /* the end: morning, and in through the gate */
    b7_c6_end:()=>{ const k = b76Key() || 'stand', r = b76Road() || 'army';
      return {sp:'The gate of Letheras', scene:'b7_c6_walls', html:risingHTML(), txt:
`Grey light along the battlements. Up on the wall the guard calls down that it is first light, and that soldiers with officers may come in, and the gate grinds open a man's width and stays there.

The Finadd stands up from the fire and brushes his coat. ${k === 'stand' ? 'He takes up the battalion standard.' : 'He has no standard to take up, and does not look for one.'} The Sixth falls in behind him, ${k === 'stand' ? 'in its file, in step, as it came off the bank' : 'all of it, which is more than the road can say'}, and goes in through the river gate of Letheras, the one that faces the way the army went, into a city that is deciding what it is.

${r === 'army' ? 'Whatever army Lether has after, the Sixth means to be a company of it.' : r === 'palace' ? 'Whoever sits the throne after, the Sixth means to stand at a door of it.' : 'Whatever Lether is after, the Sixth means to be out of its army, and in it.'} Behind them, on the road, the foreigners are coming.${b7In('sorvan') ? `\n\nSorvan goes in last but one, with the blue scale on, looking up at the gate-arch as a man looks at a stable he has been told is his.` : ''}${b7In('ilsa') ? `\n\nIlsa goes in with the grey coat over her arm, not on. "Home," she says. "Whatever that is now."` : ''}`,
        ch:[{t:'Into the city.', onward:true, go:()=>chapterEnd(6, k)},
            {t:'Not yet.', go:()=>startExplore()}]}; },
  },
  fates:B76FATES,
};
