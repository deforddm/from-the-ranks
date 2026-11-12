/* ============ Book Nine, Chapter 7: The Rearguard (the Third, and the book's finale) ============ */
/* The Third's last chapter: the same battle's end, late in the day into the dark (dod-canon corrections 3 and 9). The marines and heavies
   hold while the regulars break (RT4 S3); the Third holds a stretch of the heavies' rearguard canon never names, "between a cut bank and a
   line of burned wagons", on a plain in the Wastes nobody has named. THE BOOK'S ONE MORTAL FIGHT (David, Nov 9): whoever falls in it stays
   down; canon outcomes are untouched. The enemy is "the short-tails" in narration (rule 88); never "K'Chain" or "Nah'ruk" here.
   Phase 1 (S.f.b9_c7_ph), late in the day, on the stretch: Thallo with the captain's word (hold until dark, so the column can get away;
   then walk back in step), the regulars coming back through the files, the surgeons' last cart (a long carry, rations:true, the
   chapter's ration "yes, but"), the sappers' last wagon (a cusser), the captain seen down the line, the far fight from the burned wagons,
   the heavies' brew-fire behind the line (the roster fire, b9_c7_fire, phase 1), the Witness beat ("before the dark, in the rearguard"),
   and the line: b9_c7_rearguard (main, MORTAL, stage 2; signposted on every step into it). Phase 2, after dark: the fallen, said once
   (headline; nothing close); the lull (the first halt after dark: the reading, B9READ[7], the plain after dark lit by what burns);
   horsemen going into the dust very far off, and fewer coming back (the Khundryl's charge, never named, rule 94); the trick, Fight Them
   Low (free), behind a ✦ wits 19 check; Into the dark (b9_c7_dark, survive 5, the short-tails thinning; death checks run); the walk back
   in step. Phase 3, a grey morning on the retreat trail: nothing found (Rations); the news ("the Fist is dead", "the High Mage is
   missing", "a captain went in alone", "the Adjunct was carried"; rules 86, 90; never the field after); stragglers; the quartermaster's
   abandoned wagon (b9_c7_rearguardcloak); Wastes dogs at the stragglers' edge (b9_c7_trail, optional). Phase 4, the retreat camp days
   after: the column's pot (+1), the other squad's one line, the fire (b9_c7_fire), the roll cut into a stick (b9_c7_rollstick), and the
   key: S.f.b9_c7_key, the Third's road, 'adjunct' (east with the army; canon's road, never the Glass Desert by name, rule 85) / 'south'
   (with the Letherii and whoever else comes up, the long way round) / 'home' (time served, walk back west); b9Faith('t') colours it.
   Then the book's finale (B9CH7.finale): a fate page for every soldier of the Third (walking, waiting, fallen this night and before) and
   of the Letherii (B9CH6.fates, read from S.th.l; their road S.f.b9_lethRoad), both sergeants, Where the books meet, the end page with
   the credit. Never: Keneb's or Ruthan Gudd's charges, Lostara and the Adjunct, Quick Ben struck, Bottle and the wyval, Hedge's salvo,
   any squad canon names; the Khundryl's charge closer than very far off; the field after (the bones, the crater); Gesler and Stormy's
   battle; what Deadsmell sees. Never speaks with anyone on dod-canon §4's list. Notes for the lead: docs/dod-ch7-notes.md. */
/* FOR THE ARTIST (167b): names this file uses.
   Items: ART['item/b9_c7_rearguardcloak'], ['item/b9_c7_rollstick'].
   Figures, all existing: b9_c1_thallo (161b), b2soldier (the captain far off, the regulars, the heavies, the old marine, the runner, the
   stragglers, the surgeons), b5_c7_greatwolf (the dogs), the short-tails ('khell', drawn as 166b's b9_nahruk in Book Nine).
   Backdrops: b9_dark and b9_retreat (160's, yours), and three this file adds: b9_c7_late (the heavies' stretch late in the day, the dust
   with tall shapes in it before the fight), b9_c7_camp (the retreat camp days after, dusk, dung-fires, fewer tents than there were),
   b9_c7_road (the finale's road page, drawn by the key: east into blank country, south with the long column, west into the sunset).
   Ground (TILEX): b9_c7_field (Ch 6's b9_c6_field underneath; 'K' a burned wagon, embers alight after dark). Battle 't': a burned
   wagon's wreck. */

/* ---- small helpers (b97: Book Nine, Chapter Seven) ---- */
const b97L = (id, n) => { if (b9In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b97Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b9In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b97If = (id, s) => b9In(id) ? (typeof s === 'function' ? s() : s) : '';
const b97Who = () => (ROLL() && ROLL().who) || 'sgt';
const b97Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b97V = (id, you, they) => id === 'sgt' ? you : they;
const B97SHE = ['haddat', 'sathi', 'marrow', 'mirrel', 'wenna', 'hessa', 'rasp', 'tegra', 'perrit', 'ammet', 'ilsa', 'brune', 'pessa', 'kaedra'];
const b97He = id => id === 'sgt' ? 'you' : B97SHE.includes(id) ? 'she' : 'he';
const b97Him = id => id === 'sgt' ? 'you' : B97SHE.includes(id) ? 'her' : 'him';
const b97His = id => id === 'sgt' ? 'your' : B97SHE.includes(id) ? 'her' : 'his';
const b97Cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const b97And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
/* the phase: 1 late in the day on the stretch, 2 after dark, 3 a grey morning on the retreat trail, 4 the retreat camp, days after */
const b97Ph = () => S.f.b9_c7_ph || 1;
const b97Key = () => ['adjunct', 'south', 'home'].includes(S.f.b9_c7_key) ? S.f.b9_c7_key : null;
const b97Mates = () => (S.squad || []).filter(id => id !== 'sgt' && b9In(id));
/* who fell tonight, in the rearguard (the dead from earlier books carry a 'from') */
const b97Fell = () => Object.keys(S.dead || {}).filter(id => TPL[id] && S.dead[id] && S.dead[id].ch === 7 && !S.dead[id].from);
const b97Faith = () => b9Faith('t');
/* earlier chapters, always with a default (B9KEY0) */
const b97Street = () => !!S.f.b9_c1_street || b9Key(1) === 'street';
const b97Boil = () => (b9Key(3) || 'boil') === 'boil';
const b97Shared = () => !!S.f.b9_c5_shared || (b9Key(5) || 'share') === 'share';
const b97LKey = () => (S.f.b9_c6_key || b9Key(6) || 'line') === 'train' ? 'train' : 'line';
const b97LRoad = () => b9LethRoad() || 'escort';
/* the trick's teacher: Brask, walking; else Thallo */
const b97Teach = () => b9In('brask') ? 'brask' : null;
const b97Rear = () => !!S.f.b9_c7_rearDone;
const b97DarkDone = () => !!S.f.b9_c7_darkDone;

/* ---- Fight Them Low: what the heavies learn in the rearguard about where the short-tails' plate will not give. Under the long head,
   behind the backward knee, where the bands of plate meet at the hip: you go in low, under the blade, and you do not come up until you
   are through. The marines will call it that after (RT4 S7: "they fought low, where the armour wouldn't give"). It copies Squint's
   Breath (Book Two's b2_squint): the bearer's next blow is surer and deeper. Not sorcery. v10.3: it strikes nobody by itself, so it is
   free. Its own ability; no engine change. ---- */
Object.assign(TRICKS, {
  b9_c7_low:{name:'Fight Them Low', ch:7, use:'fight', ab:'t_b9_c7_low', where:'the heavies\' rearguard on a plain in the Wastes, after dark',
    lore:'The short-tails are plated from the crown to the heel, and the plate turns a sword the way a roof turns rain. But a thing that tall has to bend somewhere. Under the long head. Behind the knee that bends the wrong way. Where the bands meet at the hip. You go in low, under the blade, and you do not come up until you are through. The heavies learned it in the dark from the ones who lived to say so. The marines will call it that after, and say they thought of it.',
    get fx(){ return `Once a fight: the bearer drops low, under the blade, the way the heavies learned in the dark. The next blow is +4 to hit and +2 damage${lvT() >= 2 ? ', and the bearer is +2 to hit until their next turn' : ''}. Not sorcery: it never sputters. It does not use the action (one free trick a turn).`; }},
});
Object.assign(AB, {
  t_b9_c7_low:{name:TRICKS.b9_c7_low.name, trick:'b9_c7_low', self:true, free:true, desc:()=>TRICKS.b9_c7_low.fx,
    run(u){ AUDIO.play('click'); u.steady = true; u.rallyUntil = Math.max(u.rallyUntil || 0, B.round + (lvT() >= 2 ? 1 : 0));
      float(u, 'low', '#d8c8a0'); blog(`${u.name} drops low, under where the blade will come, the way the heavies learned it in the dark: under the head, behind the knee, where the plate has to bend.`); }},
});

/* ---- borrowed pictures until the artist's file (167b) replaces them: three scenes, the two items, the ground ---- */
{ const like = {b9_c7_late:'b9_line', b9_c7_camp:'b9_wastes_night', b9_c7_road:'b9_column'};
  Object.entries(like).forEach(([k, l]) => { SCENEX[k] ??= (cv, t) => (SCENEX[l] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); }); }
if (typeof TILEX !== 'undefined') TILEX.b9_c7_field ??= (...a) => (TILEX.b9_c6_field || TILEX.b9_c4_wastes || (() => {}))(...a);
if (typeof ART !== 'undefined') [['b9_c7_rearguardcloak', 'b9_c6_escortscale'], ['b9_c7_rollstick', 'b9_c2_tallystick']].forEach(([k, l]) => { ART['item/' + k] ??= ART['item/' + l]; if (typeof ART_SIZE !== 'undefined') ART_SIZE['item/' + k] ??= ART_SIZE['item/' + l]; });

/* ---- the reading: the plain after dark, lit by what burns (READTABLE 'dod:7'); the first halt after dark ---- */
B9READ[7] = {scene:'b9_dark', where:'the plain after dark, by the light of a burning wagon', set:'After dark behind the rearguard: a line of wagons burning where the heavies set them alight for the light, the short-tails somewhere out past it, and the Third sitting on the ground with its shields beside it.', back:'b9_c7_lull', backT:'Back to the line.',
  say:{marrow:'"Not the place for it, child," Marrow says, and sits down anyway, in the wagon-light, with her bag in her lap. "Which is why we\'ll do it here." She smooths a patch of ground with her palm. "One card. Then back on your feet."',
       tallow:'"Grandmother read by a burning house once," Tallow says, crouching where the light is. "Said the cards come up honest by firelight. Nothing to hide behind." He lays the deck down. "One?"',
       oldninth:'The old marine comes along the back of the line with his deck in his fist and sits down by the Third without asking. "Read for the heavies after every bad day since Pale," he says. "This is a bad day." He sets his empty cup on the ground, out of habit. "One card."'}};

/* ---- the words this chapter adds to Book Nine's glossary ---- */
GLOSSX.dod.push(
  [7, 'The rearguard', 'The heavies who held the back of the army on the night the short-tails came, so the column could get away in the dark. Nobody wrote down which stretch was whose.', ()=>!!(S && S.f && S.f.b9_c7_orders)],
  [7, 'Fight them low', 'What the heavies learned in the dark about the short-tails: under the long head, behind the knee that bends the wrong way, where the plate has to bend. The marines say they thought of it.', ()=>!!(S && S.f && S.f.b9_c7_lowTried)],
  [7, 'The retreat trail', 'What the army left across the Wastes walking away in the dark: boot-prints, wheel-ruts, and whatever was too heavy to carry.', ()=>!!(S && S.f && (S.f.b9_c7_ph || 0) >= 3)]);

/* 160's scenes keep their captions; in this chapter the dark one names the burning wagons, and the morning one the stragglers */
{ const sc = SCENES.b9_dark, base = sc && sc.cap; if (sc) Object.defineProperty(sc, 'cap', {configurable:true, enumerable:true,
    get(){ return S && S.book === 'dod' && S.chapter === 7 ? 'After dark on the plain: a line of wagons burning for the light, the heavies\' shields along it, and out past the light, the dark the short-tails came out of.' : base; }}); }
{ const sc = SCENES.b9_retreat, base = sc && sc.cap; if (sc) Object.defineProperty(sc, 'cap', {configurable:true, enumerable:true,
    get(){ return S && S.book === 'dod' && S.chapter === 7 ? 'A grey morning on the Wastes: the army\'s trail of boots and wheel-ruts going away across the plain, stragglers on it, and nobody looking back.' : base; }}); }

/* the fire is a roster fire (38c): the heavies' brew-fire behind the line before the rearguard, and the retreat camp days after */
ROSTER_FIRES.dod = ROSTER_FIRES.dod || {}; ROSTER_FIRES.dod[7] = ['b9_c7_fire'];

/* ---- the fire's talk: a line by each soldier the Third can field, late in the day (before) and in the retreat camp (after) ---- */
const B97TALK = {
  haddat:[()=>`Haddat has the blue shield on her knees and is tightening its straps, one buckle and then the next. "My mother said you know a wall by the morning after," she says. "Not before." She pulls the last strap. "We will know in the morning."`,
          ()=>`Haddat says the names at the fire, the long list, slowly. ${b97Fell().length ? `The new ${b97Fell().length > 1 ? 'ones come' : 'one comes'} at the end, and she says ${b97Fell().length > 1 ? 'them' : 'it'} twice.` : 'There are no new ones at the end of it. She says the end twice anyway, to be sure.'}`],
  sathi:[()=>`Sathi is grinning at the dust. "Tall," she says. "Slow to turn." She tests her knife on her thumb. "The Weasels would have liked this."`,
         ()=>`Sathi is lying on her back with her hands behind her head, looking at the stars. "We lived," she says, as if somebody had argued. "Good."`],
  tangle:[()=>`Tangle has the satchel open. "${numw(S.inv.cusser || 0, true)} cusser${(S.inv.cusser || 0) === 1 ? '' : 's'}," he says. "The rest of it is half wasted on them. Plate turns it." He shuts the satchel. "Cussers, then. Close, and at the joints."`,
          ()=>`Tangle has the satchel open on his knees and is not counting it, for once. "Knew it wouldn't be enough," he says. "Wasn't." He closes it. "Was enough for the stretch, though."`],
  marrow:[()=>`Marrow is laying out her linen on a cloak in rows, and her salves, and her needles, as if for inspection. "I will be busy, child," she says. "Later. Not you, I hope." She ties a knot in her string, for luck.`,
          ()=>`Marrow is sitting with her eyes shut and her hands open in her lap. "Soliel's door is a long way off out here," she says. "She still came. Mostly." She opens her eyes. "Eat something."`],
  mirrel:[()=>`Mirrel is checking the squad's boots, one pair after another, and tightening what can be tightened. "If you have to walk back in the dark," she says, "you walk back on these." She does not like what she finds. She binds it anyway.`,
          ()=>`Mirrel is counting the wounded at the surgeons' lines across the camp in threes, under her breath. She stops before the end. "Too many to count in threes," she says. "I'll count them tomorrow. Fewer."`],
  doss:[()=>`Doss has the flail across his knees. "On the holding," he says, "when the river came up, the factor's men went to the high field with the stock. We stayed for the houses." He looks at the stretch. "Same thing. Somebody stays."`,
        ()=>`Doss is eating the pot slowly. "I was never in a battle," he says. "Before." He thinks about it. "I'm still not sure I was. I stood where I was put."`],
  wenna:[()=>`Wenna has her ear to the ground. "Lots of feet," she says. "Big ones. Coming and going." She sits up. "More coming than going."`,
         ()=>`Wenna is barefoot by the fire, rubbing her feet. "The Shore was a long way off that night," she says. "I talked to it anyway. Out loud. The heavies thought I was mad." She shrugs. "Maybe."`],
  mehet:[()=>`Mehet is looking at the burned wagons on the east end of the stretch. "Good wall," he says. "Already on fire, so nobody can set it on fire." He seems pleased with the reasoning.`,
         ()=>`Mehet turns his ring of keys over in his hands. "Nothing out there to open," he says. "Nothing to close either." He puts the ring away. "I'd have liked a door that night. Just one."`],
  ottar:[()=>`Ottar is buckling the grey plate tighter. "Today's word," he says, "is <em>rearguard</em>." He tries it twice. "In Perish it is the place of honour. In Malazan it is where they put the heavies." He nods. "Both."`,
         ()=>`Ottar has the grey plate off, and the dents in it are new. "Today's word," he says, "is <em>after</em>." He looks at the dents. "It is a good word. Not everyone gets it."`],
  tallow:[()=>`Tallow is shuffling his grandmother's deck and not dealing it. "Grandmother said never read before a fight," he says. "Read after. Then you know whether to believe it."`,
          ()=>`Tallow is dealing his grandmother's deck face-up on his knee, one card at a time, and not reading any of them. "Just counting," he says. "They're all still here." He sounds relieved.`],
  hessa:[()=>`Hessa has the spear upright beside her. "D'rek is under this plain," she says. "Deep. She is patient." She looks at the dust. "So am I, tonight."`,
         ()=>`Hessa is sitting very straight with her spear across her knees. "I held," she says. "The door held." She looks at her hands. "I was afraid the whole time. I am told that is how doors do it."`],
  tebbet:[()=>`Tebbet has the bow strung and three arrows in the ground in front of him. "They're too big to miss," he says. "That's the only good thing I've heard all day."`,
          ()=>`Tebbet is restringing the bow. "Shot every arrow I had," he says. "Picked up four in the morning." He looks east. "I'm not going back for the rest."`],
  darrut:[()=>`Darrut is sitting with his big shield on his knees. "The Aren Guard held a gate once," he says, "for a day. Told it for years." He sets the shield on the ground. "Nobody will tell this one. Good. Means nobody has to listen to me."`,
          ()=>`Darrut has a new dent in the big shield and is looking at it. "Aren never did that," he says. He does not say whether he means the dent or the night.`],
  yorin:[()=>`Yorin has the copper vane on his palm, and it will not settle. "Serc doesn't like what's in that dust," he says. "Neither do I. That makes two of us who know something."`,
         ()=>`Yorin's vane has settled at last, pointing east. "Clear tomorrow," he says. "And the day after." He closes his hand on it. "I'll take clear."`],
  rasp:[()=>`Rasp is fitting fuses by feel. "Lovely things, cussers," she says. "Lovelier close." She looks at the dust. "We'll be close."`,
        ()=>`Rasp has the satchel upside down on her knees, and it is empty. "Lovely," she says, very quietly. "All of it." She sets it down. "I'll want more."`],
  orvas:[()=>`Orvas has his lance across his knees and his face to the south-east. "Somewhere out there," he says, "horsemen." He does not say whose. He does not have to.`,
         ()=>`Orvas has wept for the horsemen who went into the dust, loudly, as is right, and now he is quiet and eating. "The tears are done for tonight," he says. "There will be more tomorrow. There always are."`],
  redblade:[()=>`Ramin is sitting very straight in his red scale. "The Red Blades held a ford once against twice their number," he says. "I was told about it every week." He looks at the dust. "I will not tell anyone about this."`,
            ()=>`Ramin has not taken off the red scale, though it is dented. "I did not run," he says, to the fire. "I wondered, all my life, if I would." He nods once. "Now I know."`],
  warlock:[()=>`Keth sits very close to the brew-fire. "*In my day,*" the grandmother says, out of his mouth, "*we did not wait for things to come out of the dust. We went into it.*" Keth looks at the dust and says, in his own voice, "We are not doing that."`,
           ()=>`Keth is asleep sitting up. "*He did well,*" the grandmother says, out of his mouth, quietly, so as not to wake him. "*Don't tell him I said so.*"`],
  brask:[()=>`Brask has the heavy sword across his knees and the tally-stick out, turning it. Four notches, filed flat. "Old squad held a gate in Letheras," he says. "I was on the other side of the city." He puts the stick away. "Not this time."`,
         ()=>`Brask is cutting a notch in the tally-stick with his belt-knife, slowly. ${b97Fell().length ? `"For the stretch," he says. He does not file it flat.` : `"For the stretch," he says. "We all walked off it. That's a notch too." He does not file it flat.`}`],
  tegra:[()=>`Tegra is squatting on her heels at the back of the line, running her hand over the dust, against the grain and with it. "They walk heavy," she says. "Like old bulls. Heavy things go down hard and get up slow." She stands. "Remember that."`,
         ()=>`Tegra sits with her face to the dark, as she always does. "Among my people the dead watch the living," she says. "I think the ones who fell on the stretch are watching you eat." She considers. "Eat well, then."`]};

const B9CH7 = {
  title:B9CH[7], number:'Seven',
  intro:{loc:'The Wastes', sub:'The heavies\' rearguard · late in the day', scene:'b9_c7_late', cap:'Late in the day on a plain in the Wastes: the heavies\' shields in a line, burned wagons at one end, and a wall of dust in front with shapes in it taller than any soldier.',
    paras:[
`The dust came out of the north in the morning, and by noon it was not dust. The Third has spent the day where the heavies were put, behind the marines' end of the field, moving up a stretch at a time as the files in front thinned, watching a fight it could not see the far side of.`,
()=>{ const v = b97Mates().map(id => NAME(id));
  return `You are Sergeant {sgt}, Third squad, 9th Legion, with the heavies. ${v.length ? `${b97And(v)} ${v.length > 1 ? 'are' : 'is'} with you, grey to the knees with dust.` : 'The Third, today, is you, grey to the knees with dust.'} Nobody has eaten since the morning. The ration was short before that.`; },
`Now it is late in the day. The regulars on the left have broken, and are coming back through the heavies' files in ones and twos, and then in hundreds. The heavies have been told to hold until dark, so the column can get away. The Third has a stretch of it, between a cut bank and a line of burned wagons, on ground nobody will ever name.`],
    go:'To the stretch', node:'b9_c7_start'},

  areas:[
    /* 16 x 12 (b9_c7_field, late day). ; the plain in front (no walking)  L the heavies' shield line  d the cut bank, west  K burned wagons,
       east  W the sappers' last wagon  c the surgeons' last cart  F the heavies' brew-fire behind the line  x scrub  < the column, away south */
    { id:'b9_c7_rear', title:'The Wastes · the heavies\' rearguard', sub:'Late in the day · the stretch', hint:'Tap ground to move · tap a figure to talk · the line is north, the burned wagons east, the brew-fire behind', decor:'b9_c7_field',
      map:[ ";;;;;;;;;;;;;;;;",
            ";;;;;;;;;;;;;;;;",
            "dLLLLLLLLLLLLLLK",
            "d..............K",
            "d.......,......K",
            "d.......,....W.r",
            "d..x....,......r",
            "d.....F.,......r",
            "d.......,......r",
            "d..c....,......r",
            "d.......,....x.r",
            "rrrrrrrr<rrrrrrr" ],
      walk:'.,', triggers:{L:'b9_c7_line', K:'b9_c7_wreck', W:'b9_c7_sappers', c:'b9_c7_cart', F:'b9_c7_fire', '<':'b9_c7_back'}, start:{x:8, y:9},
      quest:()=> !S.f.b9_c7_orders ? 'Thallo, by the brew-fire. He has the captain\'s word.' : b97Rear() ? 'The line. It is getting dark.' : 'The line. Hold until dark. Whoever falls out there stays down.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:7, y:6, node:()=>'b9_c7_thallo', fresh:()=>!S.f.b9_c7_orders},
        {id:'captain', name:'The captain, down the line', kind:'b2soldier', x:12, y:3, node:()=>'b9_c7_captain', show:()=>!!S.f.b9_c7_orders, fresh:()=>!S.f.b9_c7_captain},
        {id:'regulars', name:'Regulars coming back through the files', kind:'b2soldier', x:10, y:7, node:()=>'b9_c7_regulars', fresh:()=>!S.f.b9_c7_regTried},
        {id:'old', name:'The old marine', kind:'b2soldier', x:3, y:5, node:()=>'b9_c7_old1', fresh:()=>!S.f.b9_c7_old1} ] },

    /* 16 x 12 (b9_c7_field, dark). The same stretch after dark, the line pulled back a few paces: K burned wagons, still alight  E the stone
       at the line's east end, looking east  > the way back, south, once the dark is held */
    { id:'b9_c7_dark', title:'The Wastes · the rearguard after dark', sub:'Night · lit by what burns', hint:'Tap ground to move · tap a figure to talk · the line is north, the burning wagons behind it, the way back south', decor:'b9_c7_field', dark:true,
      map:[ ";;;;;;;;;;;;;;;;",
            ";;;;;;;;;;;;;;;;",
            "dLLLLLLLLLLLLLLE",
            "d..............r",
            "d..K...........r",
            "d.......,......r",
            "d.......,...K..r",
            "d.......,......r",
            "d...K...,......r",
            "d.......,......r",
            "d.......,......r",
            "rrrrrrrr>rrrrrrr" ],
      walk:'.,', triggers:{L:'b9_c7_dark_line', K:'b9_c7_burning', E:'b9_c7_horse', '>':'b9_c7_walk'}, start:{x:8, y:7},
      quest:()=> !S.f.b9_c7_thallo2 ? 'Thallo, at the back of the line.' : !b97DarkDone() ? 'The line. Hold the dark until the column\'s lamps are gone.' : 'South. The walk back, in step.',
      npcs:[
        {id:'thallo', name:'Thallo', kind:'b9_c1_thallo', x:9, y:5, node:()=>'b9_c7_thallo2', fresh:()=>!S.f.b9_c7_thallo2},
        {id:'old', name:'The old marine', kind:'b2soldier', x:5, y:5, node:()=>'b9_c7_lull', fresh:()=>!S.f.b9_c7_drawn && !S.f.b9_c7_noCard},
        {id:'heavy', name:'A heavy of the next file', kind:'b2soldier', x:11, y:4, node:()=>'b9_c7_low', show:()=>!b97Teach(), fresh:()=>!S.f.b9_c7_lowTried} ] },

    /* 16 x 12 (b9_c7_field, a grey morning). The retreat trail: , the trail  c a broken cart  W the quartermaster's abandoned wagon  x scrub
       > on, after the column */
    { id:'b9_c7_trail', title:'The Wastes · the retreat trail', sub:'A grey morning', hint:'Tap ground to move · tap a figure to talk · the trail goes on north, after the column', decor:'b9_c7_field',
      map:[ "rrrrrrr>rrrrrrrr",
            "r......,.......r",
            "r.x....,....c..r",
            "r......,.......r",
            "r......,.......r",
            "r......,.....W.r",
            "r......,.......r",
            "r..x...,.......r",
            "r......,....x..r",
            "r......,.......r",
            "r......,.......r",
            "rrrrrrrrrrrrrrrr" ],
      walk:'.,', triggers:{'>':'b9_c7_trail_on', W:'b9_c7_qm', c:'b9_c7_brokencart'}, start:{x:7, y:10},
      quest:()=> !S.f.b9_c7_news ? 'A runner coming back down the trail.' : 'North, after the column.',
      npcs:[
        {id:'runner', name:'A runner from the head of the column', kind:'b2soldier', x:7, y:4, node:()=>'b9_c7_runner', fresh:()=>!S.f.b9_c7_news},
        {id:'strag', name:'Stragglers by the trail', kind:'b2soldier', x:3, y:6, node:()=>'b9_c7_stragglers', fresh:()=>!S.f.b9_c7_stragTried},
        {id:'dogs', name:'Dogs at the stragglers\' edge', kind:'b5_c7_greatwolf', x:12, y:8, node:()=>'b9_c7_dogs', show:()=>!S.f.b9_c7_dogsDone, fresh:()=>true} ] },

    /* 16 x 12 (b9_c7_field, dusk, days after). The retreat camp: T tents (fewer than there were)  W the cook-wagon and the column's pot
       F the Third's fire  o barrels */
    { id:'b9_c7_camp', title:'The Wastes · the retreat camp', sub:'Days after · dusk', hint:'Tap ground to move · tap a figure to talk · the fire is in the middle, the cook-wagon north-west', decor:'b9_c7_field',
      map:[ "rrrrrrrrrrrrrrrr",
            "r.T..T....T..T.r",
            "r..............r",
            "r..W...........r",
            "r..............r",
            "r......F.......r",
            "r..............r",
            "r.T.........T..r",
            "r.....o........r",
            "r..............r",
            "r..T.......T...r",
            "rrrrrrrrrrrrrrrr" ],
      walk:'.', triggers:{F:'b9_c7_fire', W:'b9_c7_pot'}, start:{x:7, y:7},
      quest:()=> !S.f.b9_c7_slates ? 'Thallo has three slates, and wants a word.' : !b97Key() ? 'The roads. Thallo is waiting for the Third\'s answer.' : 'The fire. The last of it.',
      npcs:[
        {id:'thallo', name:'Thallo, with three slates', kind:'b9_c1_thallo', x:4, y:6, node:()=>S.f.b9_c7_slates ? 'b9_c7_key' : 'b9_c7_slates', fresh:()=>!S.f.b9_c7_slates || !b97Key()},
        {id:'next', name:'Heavies at the next fire', kind:'b2soldier', x:12, y:4, node:()=>'b9_c7_next', fresh:()=>!S.f.b9_c7_next},
        {id:'surgeons', name:'The surgeons\' lines', kind:'b2soldier', x:11, y:9, node:()=>'b9_c7_surgeons', fresh:()=>!S.f.b9_c7_surgeons},
        {id:'old', name:'The old marine', kind:'b2soldier', x:3, y:9, node:()=>'b9_c7_old4', fresh:()=>!S.f.b9_c7_old4} ] } ],

  battles:{
    /* THE BOOK'S MORTAL FIGHT. The short-tails come out of the dust onto the Third's stretch late in the day; then, as the light goes, a
       heavy one with two more behind it. Hunger counts (160). Death checks do not run here: whoever falls stays down. */
    b9_c7_rearguard:{title:'The rearguard', style:'b9_c7_field', mortal:true, warrenText:'Late in the day on a plain in the Wastes · whoever falls here stays down · the warrens thin, as if something had been drinking from them all day', warren:{meanas:1, denul:1}, music:'battle',
      map:["........",".t......","......t.","........","...t....","........",".t....t.","........","........","##....##"],
      party:[[3,7],[4,7],[2,8],[5,8],[3,8],[4,8]], allies:[['b9_heavy',1,7],['b9_heavy',6,7]],
      foes:[['b9_nahruk',2,1],['b9_nahruk',5,1],['b9_nahruk',3,0],['b9_nahrukcaster',6,0]], xp:400, after:'b9_c7_rear_after',
      preText:()=>`They come out of the dust onto the Third's stretch at a walk: three of them in front, taller than any soldier, plated from the crown to the heel in dark overlapping bands, long heads, short thick tails, great blades held low. Behind them a fourth, with pale light gathering in its hands. They do not hurry. They have not had to, all day.\n\nThe heavies of the next files set their shields. So does the Third.${b97Say({brask:'\n\nBrask sets his doubled shoulder to the shield. "Heavies," he says. "Hold."', haddat:'\n\nHaddat sets the blue shield beside yours. "Here," she says. "Here is good."', _:''})}\n\nWhoever falls here stays down.`,
      stage2:{title:'The rearguard, at dusk', xp:180,
        text:()=>`The first of them are down, or gone back into the dust. The light is going. And out of the dust, where the others went back into it, a bigger one comes, plated like a wall, a blade on it as long as a wagon-tongue, and two more behind it.\n\nIt walks straight at the Third's stretch, as if it had been told where the stretch was.${b97Say({tangle:`\n\nTangle has a cusser in his fist. "That one," he says. "Close. At the joint."`, rasp:`\n\nRasp has a cusser in her fist. "That one," she says. "Lovely and close."`, _:''})}\n\nWhoever falls here stays down.`,
        map:["##....##","........","..t.....","......t.","........","...t....","........",".t......","........","........"],
        party:[[3,7],[4,7],[2,8],[5,8],[3,8],[4,8]],
        foes:[['b9_nahrukbrute',3,1],['b9_nahruk',1,2],['b9_nahruk',6,2]]} },
    /* into the dark: hold until the column's lamps are out of sight. The short-tails thin out. Not mortal: death checks run. */
    b9_c7_dark:{title:'Into the dark', style:'b9_c7_field', dark:true, warrenText:'Night on the plain · lit only by burning wagons · the warrens very thin', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:5, text:'Hold the dark until the column\'s lamps are out of sight behind you.'},
      map:["........","..t.....","........",".....t..","........","..t.....","........","......t.","........","........"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]], allies:[['b9_heavy',6,8]],
      foes:[['b9_nahruk',2,0],['b9_nahruk',5,1],['b9_nahrukcaster',4,0]], xp:160, after:'b9_c7_dark_after',
      waves:[{round:3, foes:[['b9_nahruk',3,0]], text:'One more comes out of the dark past the wagon-light. Only one, now.'}],
      preText:()=>`They come again after dark, fewer than before, out of the dark past the wagon-light, so that the first anybody sees of them is plate catching fire-glow. Behind the line the column's lamps are going away south, slowly, too slowly.`},
    /* the retreat trail (optional): Wastes dogs at the stragglers' edge */
    b9_c7_trail:{title:'The stragglers\' edge', style:'b9_c7_field', warrenText:'A grey morning on the retreat trail · the warrens thin and far off', warren:{meanas:1, denul:1}, music:'battle',
      map:["#......#","..t.....","......t.","........","...t....","........",".t......","........","........","#......#"],
      party:[[3,8],[4,8],[2,9],[5,9],[3,9],[4,9]],
      foes:[['b9_dog',2,0],['b9_dog',5,1],['b9_dog',4,0]], xp:90, after:'b9_c7_dogs_after',
      preText:()=>`Three of them, grey as the morning, working along the stragglers' edge the way dogs work a herd: looking for the slow one. They have found the Third instead.`} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b9_c7_rearguardcloak:{name:'A rearguard\'s cloak', slot:'armour', role:'mail', who:null, ac:3, hp:5,
      line:'A heavies\' cloak of thick grey wool, oiled against the dust, with scale sewn over the shoulders and down the back where a blade comes from behind. The quartermasters keep a bale of them for the squads that walk last. This bale was left on a wagon on the retreat trail with its traces cut, and the Third took the cloaks off it, because they were for the rearguard, and the Third was.'},
    b9_c7_rollstick:{name:'The squad\'s roll, notched', slot:'trinket', role:'any', who:null, hp:2, stat:{wits:1},
      line:'A stick of hard wood off a broken wagon, cut with the squad\'s roll: a notch for every soldier who has walked with the Third since Letheras, and a line across the notch for every one who did not walk out. It sits in a belt, and whoever carries it can tell you, at any halt, how many the Third is, without counting.'} },

  scenes:{
    b9_c7_late:{loc:'The Wastes', sub:'The heavies\' rearguard · late in the day', cap:'Late in the day on a plain in the Wastes: the heavies\' shields in a line, burned wagons at one end, and a wall of dust in front with shapes in it taller than any soldier.', amb:'battle'},
    b9_c7_camp:{loc:'The Wastes', sub:'The retreat camp · days after', cap:'Dusk on the Wastes, days after: the column\'s camp with fewer tents than there were, dung-fires burning low, and the surgeons\' lines at one end.', amb:'explore'},
    b9_c7_road:{loc:'The Wastes', sub:'The road out', cap:'The Wastes at the end of a day, and a road going away across them.', amb:'explore'} },

  end:{
    adjunct:['East, with the army', 'The Third held a stretch of the heavies\' rearguard on the day the short-tails came, between a cut bank and a line of burned wagons, late in the day and into the dark, and walked back in step when the column\'s lamps were gone. Days after, when the slates came round, it put its names on the one that goes east with the Adjunct, wherever that is.'],
    south:['South, the long way round', 'The Third held a stretch of the heavies\' rearguard on the day the short-tails came, between a cut bank and a line of burned wagons, late in the day and into the dark, and walked back in step when the column\'s lamps were gone. Days after, when the slates came round, it put its names on the one that goes south with the Letherii, the long way round.'],
    home:['Time served', 'The Third held a stretch of the heavies\' rearguard on the day the short-tails came, between a cut bank and a line of burned wagons, late in the day and into the dark, and walked back in step when the column\'s lamps were gone. Days after, when the slates came round, it put its names on the time-served slate, and turned west.'] },
  endScene:'b9_c7_camp',
  endCap:()=> b97Key() === 'home' ? 'Dusk on the Wastes, and a squad with its packs on going west out of the camp, toward the last of the light.' : b97Key() === 'south' ? 'Dusk on the Wastes, and a squad going over to the Letherii wagons with its packs on.' : 'Dusk on the Wastes, and a squad sitting on its packs by its fire, waiting for the column to say east.',
  tease:'There is no Chapter Eight. The book ends on a plain in the Wastes nobody has named.',

  extras:()=>{ const f = S.f, x = [];
    if (f.b9_c7_rearDone) x.push(b97Fell().length ? `The Third held a stretch of the rearguard into the dark. ${b97And(b97Fell().map(NAME))} did not walk off it.` : 'The Third held a stretch of the rearguard into the dark, and every one of it walked off.');
    if (f.b9_c7_locked) x.push('The Third locked its shields with the heavies of the next files before the short-tails came.');
    if (f.b9_c7_darkDone) x.push('The Third held the dark until the column\'s lamps were gone, and walked back in step.');
    if (f.b9_c7_cart === 'ok') x.push('A heavy with a broken leg went out on the surgeons\' last cart. The Third carried him to it.');
    if (f.b9_c7_cusser) x.push('The sappers\' last wagon gave the Third a cusser for the short-tails.');
    if (f.b9_c7_lowOk) x.push(`${trickBy('b9_c7_low') ? NAME(trickBy('b9_c7_low')) : 'The Third'} learned to fight them low, in the dark, where the plate has to bend.`);
    if (f.b9_c7_horse) x.push('Horsemen went into the dust very far off as the light went. Fewer came back.');
    if (f.b9_c7_news) x.push('The Fist is dead. The High Mage is missing. A captain went in alone. The Adjunct was carried off the field.');
    if (f.b9_c7_dogsDone === 'fought') x.push('Wastes dogs working the stragglers\' edge found the Third instead.');
    if (S.b9 && S.b9.wit && S.b9.wit.c7) x.push(S.b9.wit.c7 === 'kept' ? 'Before the dark, the Third still had an answer for what it stood there for.' : 'Before the dark, the Third said it stood there because it was put there.');
    if (f.b9_c7_key) x.push(f.b9_c7_key === 'adjunct' ? 'The Third goes east with the army.' : f.b9_c7_key === 'south' ? 'The Third goes south with the Letherii, the long way round.' : 'The Third has served its time, and walks west.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b9_c7_key && (f.b9_c7_key === 'adjunct' ? 'Days after, the Third put its names on the slate that goes east with the Adjunct.' : f.b9_c7_key === 'south' ? 'Days after, the Third put its names on the slate that goes south with the Letherii.' : 'Days after, the Third put its names on the time-served slate.'),
    f.b9_c7_pot && 'The retreat camp, days after. The column\'s pot, and a little in it.',
    f.b9_c7_news && 'The Fist is dead. The High Mage is missing. A captain went in alone. The Adjunct was carried off the field.',
    f.b9_c7_darkDone && 'The heavies held the dark until the column\'s lamps were gone, and walked back in step through the night.',
    f.b9_c7_horse && 'Horsemen went into the dust very far off at dusk. Fewer came back. Nobody near the Third knew whose they were, or said.',
    f.b9_c7_rearDone && (b97Fell().length ? `The short-tails came onto the Third's stretch late in the day. ${b97And(b97Fell().map(NAME))} fell there.` : 'The short-tails came onto the Third\'s stretch late in the day. The Third held it.'),
    f.b9_c7_orders && 'The regulars broke. The heavies and the marines held the back of the army, so the column could get away in the dark.',
    'The short-tails came out of the dust in the morning. The Third spent the day behind the marines\' end of the field.'].filter(Boolean); },

  dlg:{
    /* ======== phase 1: late in the day, on the stretch ======== */
    b9_c7_start:()=>({sp:'The stretch', scene:'b9_c7_late', fx:()=>{ S.f.b9_c7_ph = S.f.b9_c7_ph || 1; }, again:()=>'The heavies\' stretch, between the cut bank and the burned wagons, and the dust in front.', txt:
`The heavies' stretch is two hundred paces of trampled grass with a cut bank at the west end, high as a man, and at the east end a line of supply wagons that somebody set on fire at noon, so that nothing could come round that way without walking through it. The shields are set along it. Behind it the ground runs down south, toward where the column is getting away.

In front of it there is the dust. It has been in front of it all day. There are shapes in it, too tall for soldiers, going one way and another along the far side, and now and then a pale light, there and gone.${b97If('tegra', `\n\nTegra comes up the back of the line from the guides' carts with an axe in each hand. "The guides are going with the column," she says. "I told them I was with the Third." She looks at the dust. "They did not argue."`)}${b97If('brask', `\n\nBrask is standing in the line already, as if he had been born in it. "Heavies' stretch," he says. "Nice and short." He sounds content.`)}

Thallo is at the heavies' brew-fire behind the line with the captain's word, eating something.`,
      ch:[{t:'Thallo.', go:'b9_c7_thallo'},
          {t:'The brew-fire behind the line.', go:'b9_c7_fire'},
          {t:'Look at the stretch.', go:()=>startExplore()}]}),

    b9_c7_thallo:()=>({sp:'Thallo', scene:'b9_c7_late', fx:()=>{ S.f.b9_c7_orders = 1; }, again:()=>'Thallo, by the brew-fire. "Till dark, Sergeant. Then in step."', txt:
`Thallo is eating a biscuit he has been saving, very slowly, with his eyes on the dust. When he sees the Third he puts the last of it away.

"Captain's word," he says. "The regulars have gone on the left. The marines are holding their end. We hold ours. Till dark. Then the column's away, and we walk back after it in step, and anybody who runs gets caught." He wipes his mouth. "That's the whole of it."

He looks along the stretch, at the shields, at the burned wagons.

"Your squad's between the bank and the wagons, with ours either side." He does not look at you when he says the next part. "Nobody's carrying anybody back off this, Sergeant. Whoever goes down out there tonight stays down. I'm telling every sergeant the same."`,
      ch:[{t:'"Why the heavies?"', go:'b9_c7_thallo_more'},
          {t:'"Till dark."', go:()=>startExplore()}]}),
    b9_c7_thallo_more:()=>({sp:'Thallo', scene:'b9_c7_late', html:rationsHTML(), txt:
`Thallo thinks about it, which with Thallo takes a while.

"Because heavies don't run," he says. "Not because we're brave. Because we're slow. By the time a heavy's decided to run, it's over." He shrugs. "Captain knows that. So does the Adjunct, they say."

He nods at the pot on the brew-fire. "Eat what's in that. There's nothing on the wagons. There's no wagons. That lot's what's left." The pot is thin. The Third eats it.${b97If('brask', `\n\nBrask nods slowly. "Slow," he agrees. "Old squad was slow too." He looks at the dust. "They held."`)}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the captain, seen down the line (never speaks to the sergeant) */
    b9_c7_captain:()=>({sp:'The captain, down the line', scene:'b9_c7_late', fx:()=>{ S.f.b9_c7_captain = 1; }, again:()=>'The captain, walking the back of the heavies\' line, a hand on each shoulder as he goes.', txt:
`The heavies' captain is walking the back of the line from the burned wagons toward the bank, slowly, a big grey man with his helm under his arm. At every file he puts a hand on a shoulder and says something too low to carry, and goes on.

He does not come as far as the Third. Halfway along he stops, and looks at the dust for a while, and puts his helm on, and goes back the way he came.${b97If('haddat', `\n\nHaddat watches him go. "He is saying their names," she says. "I can tell by his mouth."`)}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the regulars coming back through the files (RT4 S3: the regulars broke); a check: put a spear back in a boy's hands */
    b9_c7_regulars:()=>({sp:'Regulars coming back', scene:'b9_c7_late', again:()=>'The regulars coming back through the heavies\' files, fewer now, and none of them looking up.', txt:
`They come back through the heavies' files in a stream that thickens and thins: regulars of the line, grey with dust like everybody, some of them walking, some of them running, some of them without anything in their hands at all. The heavies let them through and close up behind them and do not say anything, which is worse than shouting.

One of them is a boy who cannot be older than the Third's newest boots. He has dropped his spear somewhere and keeps looking at his hands as if it might come back.${b97If('doss', `\n\nDoss watches him go past. "On the holding," he says, "we'd have run too." He sounds as if he is not sure that is an excuse.`)}`,
      ch:[{t:'Stop the boy, put a spear from the heavies\' spares in his hands, and point him south after the column, walking.', check:['wits', 17], req:()=>!S.f.b9_c7_regTried, fx:()=>{ S.f.b9_c7_regTried = 1; },
            edges:id=>[id === 'haddat' && ['she has set a shield in a frightened soldier\'s hands before', 2], id === 'brask' && ['a heavy knows what a spear in the hands does for the legs', 1], id === 'marrow' && ['she talks to the frightened as to children, and they listen', 1], id === 'sgt' && ['the Fourteenth\'s sergeants have done this since Seven Cities', 1], id === 'tegra' && ['among her people a warrior without a weapon is shamed, and she says so', -1], id === 'tangle' && ['he would rather count spears than hand them out', -1]],
            near:{t:()=>`Yes, but the boy is past caring, and swings an elbow at the first hand on his arm, and it takes ${b97Nm(b97Who())} in the ribs before he sees whose it is. He takes the spear. He walks.`, fx:()=>bruise(b97Who(), bruiseN())},
            go:'b9_c7_regulars_ok', fail:'b9_c7_regulars_no'},
          {t:'Let them through. The column needs them more than the line does.', req:()=>!S.f.b9_c7_regTried, fx:()=>{ S.f.b9_c7_regTried = 1; }, go:()=>startExplore()},
          {t:'Back to the stretch.', go:()=>startExplore()}]}),
    b9_c7_regulars_ok:()=>({sp:'Regulars coming back', scene:'b9_c7_late', fx:()=>{ S.f.b9_c7_regulars = 'ok'; }, txt:
`${by({sgt:'You take', _:'{who} takes'})} the boy by the shoulder, turn him round, and put a spear from the heavies' spares in his hands, the right way up. He looks at it. ${by({sgt:'You tell', _:'{who} tells'})} him the column is south, and that he is to walk to it, not run, and to carry the spear the whole way.

He walks. He holds the spear the whole way, as far as anybody can see. A few of the others coming back through the files see him walking, and slow down, and walk.${b97If('haddat', `\n\nHaddat nods once. "Walking is a kind of holding," she says.`)}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b9_c7_regulars_no:()=>({sp:'Regulars coming back', scene:'b9_c7_late', fx:()=>{ S.f.b9_c7_regulars = 'no'; }, txt:
`The boy will not stop. He goes through the heavies' files like water through a fence, past the hand on his shoulder, past the spear held out to him, and away south down the slope, running, with his empty hands out in front of him.

The heavies close up behind him and look at the dust.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the surgeons' last cart: a long carry (a rations check; the chapter's ration "yes, but") */
    b9_c7_cart:()=>({sp:'The surgeons\' last cart', scene:'b9_c7_late', again:()=> S.f.b9_c7_cart ? 'The place where the surgeons\' last cart stood, ruts going away south.' : 'The surgeons\' last cart, its team already in the traces.', txt: S.f.b9_c7_cart ?
`The surgeons' last cart has gone south after the column. Its ruts go away down the slope into the dust.` :
`The surgeons' last cart is at the back of the stretch with its team in the traces and its bed full, and the surgeon on the box is looking south and not at anything behind him. He is going now, whatever is on it.

A heavy of the next file is sitting in the grass twenty paces from the cart with his leg out in front of him at an angle no leg should go. He has his sword across his knees. He has decided, by the look of him, that he will be staying.${b97Say({marrow:'\n\nMarrow is already on her knees by him. "The cart, child," she says to you, not to him. "He goes on the cart."', mirrel:'\n\nMirrel is already on her knees by him, binding the leg straight with his own scabbard. "The cart," she says. "Now, or never."', _:''})}`,
      ch:[{t:'Carry him to the cart before it goes, at a run, with whatever has to be left on the ground to do it.', check:['might', 17], rations:true, req:()=>!S.f.b9_c7_cart, fx:()=>{ S.f.b9_c7_cartTried = 1; },
            edges:id=>[id === 'brask' && ['a heavy can carry a heavy; it is what the scale is for', 2], id === 'ottar' && ['the Perish carry their own off the field', 1], id === 'haddat' && ['she has carried the wounded off a wall before', 1], id === 'doss' && ['he carried sacks on the holding all his life', 1], id === 'mirrel' && ['she knows how to lift a broken leg so it stays broken in one place', 1], id === 'tangle' && ['the satchel goes nowhere without him', -1]],
            near:{t:()=>`Yes, but to run him to the cart in time ${b97Nm(b97Who())} ${b97V(b97Who(), 'have', 'has')} to drop the squad's last sack of biscuit in the grass, and when ${b97He(b97Who())} ${b97V(b97Who(), 'go', 'goes')} back for it the column's stragglers have been through it.`, fx:()=>{ if (!S.f.b9_c7_lost) { S.f.b9_c7_lost = 1; b9Ration(-1, 'a sack of biscuit left for a stretcher'); } else bruise(b97Who(), bruiseN()); }},
            go:'b9_c7_cart_ok', fail:'b9_c7_cart_no'},
          {t:'Back to the stretch.', go:()=>startExplore()}]}),
    b9_c7_cart_ok:()=>({sp:'The surgeons\' last cart', scene:'b9_c7_late', fx:()=>{ S.f.b9_c7_cart = 'ok'; }, txt:
`${by({sgt:'You get', _:'{who} gets'})} him up, sword and all, an arm over a shoulder, and run him the twenty paces with his good leg doing what it can and the bad one held off the ground by somebody else's hands. The surgeon sees them coming and waits, a breath longer than he meant to, and they put the heavy on the tail of the cart across the other wounded's feet.

The cart goes. The heavy lifts his sword at the Third as it goes, as if the Third were the one being left behind.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b9_c7_cart_no:()=>({sp:'The surgeons\' last cart', scene:'b9_c7_late', fx:()=>{ S.f.b9_c7_cart = 'no'; }, txt:
`The cart goes before the Third is halfway to it with him. The surgeon does not look back. The heavy laughs, which costs him, and lowers himself back down into the grass.

"Told you," he says. "Put me in the line, then. I can sit and hold a sword. That's most of heavy work anyway." They put him at the end of the next file, sitting, with his sword across his knees.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the sappers' last wagon: a cusser for the short-tails (the brief: cussers tear the short-tails open) */
    b9_c7_sappers:()=>({sp:'The sappers\' last wagon', scene:'b9_c7_late', fx:()=>{ if (!S.f.b9_c7_cusser) { S.f.b9_c7_cusser = 1; S.inv.cusser = (S.inv.cusser || 0) + 1; note('A cusser, off the sappers\' last wagon.', 'good'); } }, again:()=>'The sappers\' last wagon, its bed nearly bare, a clerk on the tailboard with a slate.', txt:
`The sappers' last wagon has been stopping at every company along the back of the line since noon, and it is nearly bare. A clerk sits on the tailboard with a slate, giving out what is left one at a time and writing down who took it, as if the slate were going to matter.

"Cussers," he says, before you ask. "Only thing that does them any good. The rest just bounces." He hands one down, wrapped in straw. "One a squad. Sign."${b97Say({tangle:'\n\nTangle takes it in both hands, the way you take a baby off somebody. "Close," he says. "At the joint. Got it."', rasp:'\n\nRasp takes it in both hands. "Lovely," she says, and means it.', _:''})}`,
      ch:[{t:'Talk the clerk out of a second one.', check:['guile', 17], req:()=>!S.f.b9_c7_cusser2Tried, fx:()=>{ S.f.b9_c7_cusser2Tried = 1; },
            edges:id=>[(id === 'tangle' || id === 'rasp') && ['a sapper knows what to say to a sappers\' clerk', 2], id === 'mehet' && ['he has talked his way into a locked store before', 1], id === 'sgt' && ['the Fourteenth\'s sergeants have been lying to clerks since Aren', 1], id === 'haddat' && ['she does not like lying to a man with a slate', -1]],
            near:{t:()=>'Yes, but the clerk wants something for his slate, and takes one of the squad\'s sharpers in trade. "Plate turns them anyway," he says, which is true, and does not help.', fx:()=>{ if ((S.inv.sharper || 0) > 0) S.inv.sharper--; else bruise(b97Who(), bruiseN()); }},
            go:'b9_c7_sappers_ok', fail:'b9_c7_sappers_no'},
          {t:'Back to the stretch.', go:()=>startExplore()}]}),
    b9_c7_sappers_ok:()=>({sp:'The sappers\' last wagon', scene:'b9_c7_late', fx:()=>{ if (!S.f.b9_c7_cusser2) { S.f.b9_c7_cusser2 = 1; S.inv.cusser = (S.inv.cusser || 0) + 1; note('A second cusser.', 'good'); } }, txt:
`The clerk looks at his slate, and at the dust, and at the slate again, and hands down a second one without a word, and writes something that is probably not the truth.

"Never saw you," he says. Then the wagon goes on to the next company.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),
    b9_c7_sappers_no:()=>({sp:'The sappers\' last wagon', scene:'b9_c7_late', txt:
`The clerk holds up his slate. "One a squad," he says. "There's squads further along with none." He is right, and the Third knows it, and the wagon goes on.`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the burned wagons at the east end: the far fight, at a distance (never closer; never a canon scene) */
    b9_c7_wreck:()=>({sp:'The burned wagons', scene:'b9_battle', fx:()=>{ S.f.b9_c7_wreck = 1; }, again:()=>'The burned wagons at the stretch\'s east end, still smoking, and the far fight beyond.', txt:
`From the end of the burned wagons you can see along the back of the army, east, to where the marines are: a long way off, a thin dark line under its own brown cloud, and in the cloud shapes a head and more above the shields, and now and then a light that is not fire, there and gone. Something over there goes off with a sound like a wall coming down, and the dust jumps, and settles.

The Third does not say what any of it is. It does not know.${b97If('yorin', `\n\nYorin's copper vane is spinning on his palm. He closes his hand on it.`)}${b97If('tegra', `\n\nTegra looks east a long while. "They are fighting well over there," she says. "I can tell by how the dust stands."`)}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the old marine, before the fight */
    b9_c7_old1:()=>({sp:'The old marine', scene:'b9_c7_late', fx:()=>{ S.f.b9_c7_old1 = 1; }, again:()=>'The old marine, sitting at the back of the heavies\' line with his deck in his shirt.', txt:
`The old marine is sitting at the back of the heavies' line with his deck in his shirt and his empty cup on his knee. He came up from the marines' end at noon, he says, when there stopped being a reason to be there.

"Read for a lot of them over there last night," he says. "Fair cards, mostly." He looks at the dust. "After dark, if we're still here, I'll read for you. Not before. Never before."`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* the way back, south: not yet */
    b9_c7_back:()=>({sp:'The way back', scene:'b9_c7_late', txt:
`The ground runs down south from the back of the stretch toward the column, which is going away under its own dust, wagons and files and the surgeons' carts, slowly. The heavies stay. That is the order, and it is the whole of the order.${b97If('mehet', `\n\nMehet looks down the slope after the column. "Never liked the back door," he says. "Always somebody waiting at it."`)}`,
      ch:[{t:'Back to the stretch.', go:()=>startExplore()}]}),

    /* ======== the fire: phase 1 the heavies' brew-fire behind the line; phase 4 the retreat camp. The games pass wraps this node: keep the id ======== */
    b9_c7_fire:()=>{ const ph = b97Ph(), camp = ph >= 4, rk = 'b9_c7_rest' + (camp ? 4 : 1), wit = S.b9 && S.b9.wit && S.b9.wit.c7;
      if (ph === 2 || ph === 3) return {sp:'The brew-fire', scene:ph === 2 ? 'b9_dark' : 'b9_retreat', html:rationsHTML(), txt:
`There is no fire. There is no time, and nothing to burn, and the heavies do not light fires in the dark with the short-tails out past the wagon-light.`,
        ch:[{t:'Not now.', go:()=>startExplore()}]};
      return {sp:camp ? 'The Third\'s fire' : 'The heavies\' brew-fire', scene:camp ? 'b9_c7_camp' : 'b9_c7_late', html:rationsHTML(),
        again:()=> camp ? 'The Third\'s fire in the retreat camp, a dung-fire burning low.' : 'The heavies\' brew-fire behind the line, a pot on it with not much in.', txt:
`${camp ? `The Third's fire in the retreat camp is a few cakes of dung in a ring of stones, as every fire has been since the Wastes began. ${b97Fell().length ? `There is a gap in the ring where ${b97And(b97Fell().map(NAME))} would be sitting. Nobody sits in it.` : 'Everybody who walked onto the stretch is sitting round it. The Third looks at itself a while, as if checking.'}` : `The heavies' brew-fire is behind the line, out of the dust, a pot on it with not much in, and the heavies of the next files coming back to it two at a time to eat what is there and go back.`}${b97If('brask', camp ? `\n\nBrask sits with his back to the fire and the tally-stick in his hand.` : `\n\nBrask eats standing up, so as to be back in the line sooner.`)}${b97If('tegra', `\n\nTegra squats on her heels with her face to the dark, as she always does.`)}`,
        ch:[{t:camp ? 'Sit an hour. Let the squad rest.' : 'Eat, and sit while there is time.', req:()=>!S.f[rk] && !(ph === 1 && b97Rear()), fx:()=>{ S.f[rk] = 1; rest(camp ? 'The Third sits an hour by its fire. Old linen comes off and clean goes on. The rest takes longer.' : 'The Third eats what is in the pot and sits while there is time. Straps tightened, cuts bound.'); }, go:'b9_c7_fire_rest'},
            {t:'Talk with the squad.', go:'b9_c7_fire_talk'},
            {t:'"What are we standing here for?"', req:()=>ph === 1 && !wit && !b97Rear(), go:'b9_c7_wit'},
            {t:'Cut the squad\'s roll into a stick.', req:()=>camp && !S.f.b9_c7_roll, go:'b9_c7_roll'},
            {t:'Into the line.', req:()=>ph === 1 && !!S.f.b9_c7_orders && !b97Rear(), onward:true, go:'b9_c7_line'},
            {t:'The last of it.', req:()=>camp && !!b97Key(), onward:true, go:'b9_c7_end'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b9_c7_fire_rest:()=>({sp:'The fire', scene:b97Ph() >= 4 ? 'b9_c7_camp' : 'b9_c7_late', txt: b97Ph() >= 4 ?
`An hour by the dung-fire, with the camp quiet round it, quieter than any camp the Third has been in, and the stars going over.

${b97Say({marrow:'Marrow goes round the squad with her hands, slowly, and stops at each of them. "Sleep, child," she says. "Tonight you can."', mirrel:'Mirrel goes round the squad\'s feet and the squad\'s cuts, and counts them, and frowns, and binds them.', _:'Some of the Third sleep. The rest watch the fire.'})}` :
`The pot is thin, and the Third eats it sitting on the ground behind the line, with its shields beside it and its eyes on the dust over the top of the shields.

${b97Say({marrow:'Marrow goes along the squad with her bag, closing what she can. "Quickly, child," she says. "While there is time."', mirrel:'Mirrel goes along the squad with her bag, closing what she can, and tightening boots.', _:'Nobody talks much. There is not much to say that the dust is not saying.'})}`,
      ch:[{t:'Back to the fire.', go:'b9_c7_fire'}]}),
    b9_c7_fire_talk:()=>{ const camp = b97Ph() >= 4, ln = [];
      Object.keys(B97TALK).forEach(id => { if (b9In(id)) ln.push(B97TALK[id][camp ? 1 : 0]()); });
      return {sp:'The Third', scene:camp ? 'b9_c7_camp' : 'b9_c7_late', txt:ln.length ? ln.join('\n\n') : `The Third is you, at this fire. You sit with it, and that is the talk.`,
        ch:[{t:'Back to the fire.', go:'b9_c7_fire'}]}; },

    /* ======== the Witness beat: before the dark, in the rearguard (the last time) ======== */
    b9_c7_wit:()=>({sp:'The stretch', scene:'b9_c7_late', html:rationsHTML(), txt:
`Down the line, a heavy of the next file says it, not loud, to the man beside him: <em>we shall be our own witness</em>. The man beside him says it back. It goes along the shields a little way, and stops.

The Third is quiet. The dust is very close now. ${b97Say({haddat:'Haddat looks at you. "Ask it," she says. "You have asked it before. Ask it here."', brask:'Brask looks along the line at you. "Go on," he says. "Ask it. Heavies like to know."', _:'Somebody in the Third looks at you, waiting.'})}

What are we standing here for?`,
      ch:[{t:'"Each other. Same as the road. Same as the stretch."', fx:()=>{ b9Wit('kept', 'for each other, in the rearguard'); S.f.b9_c7_wit = 'each'; }, go:'b9_c7_wit_done'},
          {t:'"So somebody walks off this and says the Third stood. Our own witness."', fx:()=>{ b9Wit('kept', 'our own witness, in the rearguard'); S.f.b9_c7_wit = 'own'; }, go:'b9_c7_wit_done'},
          {t:'"Because we\'re the ones they put here. That\'s all it is."', fx:()=>{ b9Wit('doubt', 'because they put us here'); S.f.b9_c7_wit = 'put'; }, go:'b9_c7_wit_done'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c7_wit_done:()=>{ const w = S.f.b9_c7_wit;
      return {sp:'The stretch', scene:'b9_c7_late', html:rationsHTML(), txt:
`${w === 'each' ? b97Say({haddat:'Haddat nods, once. "Each other," she says. "My mother would say that is enough. She said it about less."', marrow:'Marrow puts her hand on the nearest shoulder. "Each other, child," she says. "Always was."', _:'The Third shifts a little closer along the shields. Not much. Enough.'})
  : w === 'own' ? b97Say({brask:'Brask nods slowly. "Somebody walks off it," he says. "Somebody always has to. That\'s the job." He looks at the tally-stick. "Old squad had nobody."', haddat:'Haddat says the line back to you, quietly, the way the old marine said to say it. Then the next soldier says it to her.', _:'It goes along the Third, quietly, one to the next, the way the old hands say it.'})
  : b97Say({tangle:'Tangle nods. "Honest," he says. "We\'re here because they put us here." He looks at the satchel. "Still going to throw the cusser, mind."', tegra:'Tegra laughs, short. "At least you do not lie to yourselves," she says. "My people would like you better for it."', _:'Somebody in the Third laughs, short, at a thing that is true and not funny.'})}${b97If('tegra', w !== 'put' ? `\n\nTegra looks at the Third along the shields. "Among my people the dead watch," she says. "Tonight I think the living do." She lifts an axe.` : '')}

The dust comes on.`,
        ch:[{t:'Into the line. (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:'b9_c7_line'},
            {t:'Not now.', go:()=>startExplore()}]}; },

    /* ======== the line: the mortal fight, signposted on every step into it ======== */
    b9_c7_line:()=>({sp:'The line', scene:b97Rear() ? 'b9_dark' : 'b9_c7_late', html:rationsHTML(), txt: b97Rear() ?
`The stretch, in the last of the light. The short-tails have gone back into the dust. The heavies are setting the burned wagons alight again for the light, and pulling the line back a few paces into it.` : !S.f.b9_c7_orders ?
`The heavies' line, shields set along the stretch. Thallo has the captain's word, back at the brew-fire. The Third should hear it before it goes in.` :
`The Third takes its place in the line between the cut bank and the burned wagons, with the heavies of the next files on either side. Shields set. The dust is close now, close enough to taste, and the shapes in it are coming this way, not along.

This is the rearguard. It holds until dark. <b>Whoever falls here stays down.</b> There is no carrying anybody back off this, and no god's hand reaching down to stand anybody up again.${b97Hunger()}${b97If('brask', `\n\nBrask sets his shoulder to the next heavy's. "Lock it," he says. "Shield to shield. They'll have to come through the heavies and the Third both."`)}`,
      ch:[{t:'Lock shields with the heavies of the next files, rim to rim, the heavies\' way.', check:['might', 17], req:()=>!!S.f.b9_c7_orders && !S.f.b9_c7_lockTried && !b97Rear(), fx:()=>{ S.f.b9_c7_lockTried = 1; },
            edges:id=>[id === 'brask' && ['the heavies\' wall is his whole trade', 2], id === 'haddat' && ['she has set the blue shield in a hundred lines', 1], id === 'ottar' && ['the Perish lock grey shields the same way', 1], id === 'darrut' && ['the Aren Guard held a gate shield to shield', 1], id === 'sgt' && (S.tricks && S.tricks.b9_c1_rollcall) && ['the roll at the gate taught the Third to step into the gap', 1], id === 'tegra' && ['the Barghast do not fight in lines', -1], id === 'mehet' && ['a street fighter, not a wall', -1]],
            near:{t:()=>`Yes, but the next heavy's rim comes down on ${b97Nm(b97Who())}'s hand as the shields go together, and something in it cracks. The line is locked.`, fx:()=>bruise(b97Who(), bruiseN())},
            go:'b9_c7_line_ok', fail:'b9_c7_line_no'},
          {t:'"What are we standing here for?"', req:()=>!!S.f.b9_c7_orders && !(S.b9 && S.b9.wit && S.b9.wit.c7) && !b97Rear(), go:'b9_c7_wit'},
          {t:'"Third. Hold." (a mortal fight: whoever falls here stays down)', tag:'mortal', req:()=>!!S.f.b9_c7_orders && !b97Rear(), onward:true, go:'b9_c7_hold'},
          {t:'The dark.', req:()=>b97Rear() && b97Ph() === 1, onward:true, fx:()=>b97ToDark(), go:()=>{ startExplore('b9_c7_dark'); talk('b9_c7_lull'); }},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c7_line_ok:()=>({sp:'The line', scene:'b9_c7_late', fx:()=>{ S.f.b9_c7_locked = 1; }, txt:
`The shields go together rim to rim along the stretch with a sound like a door shutting, the Third's and the heavies' on either side, so that from the front it is one wall from the cut bank to the burned wagons. ${by({sgt:'You', _:'{who}'})} can feel the next heavy breathe through it.

"Good," says the heavy on the right, without looking round. "Now they come to us."`,
      ch:[{t:'"Third. Hold." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:'b9_c7_hold'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c7_line_no:()=>({sp:'The line', scene:'b9_c7_late', fx:()=>{ S.f.b9_c7_locked = 0; }, txt:
`The shields will not sit. The ground is uneven, the next file's heavies are tired and set their rims a hand too high, and every time the Third locks it a gap opens at the other end. In the end the line stands as it stands, close, not locked.

"It'll do," says the heavy on the right. "It'll have to."`,
      ch:[{t:'"Third. Hold." (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:'b9_c7_hold'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c7_hold:()=>({sp:'The rearguard', scene:'b9_c7_late', txt:
`The dust thins in front of the stretch, the way dust does just before something comes out of it.

${b97Mates().length ? `${b97And(b97Mates().map(NAME))} ${b97Mates().length > 1 ? 'are' : 'is'} in the line with you.` : 'You are in the line alone, with the heavies of the next files on either side.'} The heavies along the stretch go quiet, all at once, the way a crowd does. Somebody at the far end says the old god's name out of habit, and nobody answers it.

Whoever falls here stays down.${b9Rations() < B97_POT ? `\n\nA heavy comes down the back of the line with the column's pot and a ladle, and the Third eats what is in it standing up, out of its helms. It is not much. It is more than the Third had.` : ''}`,
      ch:[{t:'Hold. (a mortal fight: whoever falls here stays down)', tag:'mortal', onward:true, go:()=>{ b97Pot(); startBattle('b9_c7_rearguard', S.f.b9_c7_locked ? {surprise:'p'} : {}); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== after the rearguard: the fallen said once, headline; then phase 2 ======== */
    b9_c7_rear_after:()=>{ const fell = (S.f.lastFallen || []).filter(id => TPL[id]);
      return {sp:'The rearguard', scene:'b9_dark', fx:()=>{ if (!S.f.b9_c7_rearDone) { S.f.b9_c7_rearDone = 1; S.f.b9_c7_fell = fell.slice(); } }, txt:
`The big one goes down in front of the Third's shields as the last of the light goes, and does not get up, and the two behind it go back into the dust the way they came, not hurrying. Along the stretch the heavies of the next files are still standing. Most of them.

${fell.length ? `${b97And(fell.map(NAME))} did not get up.\n\n${b97Say({haddat:`Haddat kneels by ${fell.length > 1 ? 'them' : b97Him(fell[0])} with the blue shield still on her arm, and says the ${fell.length > 1 ? 'names' : 'name'}, and then all the names, the long list, with ${fell.length > 1 ? 'these' : 'this one'} at the end.`, marrow:`Marrow kneels with one hand flat on ${fell.length > 1 ? 'the nearest' : b97Him(fell[0])}, as if the warren could still do something. It cannot. She stays a moment anyway.`, brask:`Brask stands over ${fell.length > 1 ? 'them' : b97Him(fell[0])} with the heavy sword point-down in the grass, a long time, and then cuts a notch in the tally-stick and does not file it flat.`, _:'The Third stands a moment where it is.'})}\n\nThe heavies carry the fallen back to the burned wagons and lay them in a row with cloaks over them. There is no time for more. Thallo says so, and is right.` : `Everybody in the Third is standing. Everybody. ${b97Say({tangle:'Tangle counts it twice, out loud, and gets the same number both times, and does not believe it, and counts again.', haddat:'Haddat counts the Third under her breath, twice, and then says the names of the living, which she has never done before.', _:'The Third counts itself, twice, and gets the same number both times.'})}`}${S.f.sgtScar && !S.f.b9_c7_scarSaid ? `\n\nThere is blood on your face that is your own. Something opened your cheek to the bone and you did not feel it. You feel it now.` : ''}

It is dark. The heavies set the burned wagons alight again, so there is light along the front of the stretch. Behind them, south, the column's lamps are going away.`,
        ch:[{t:'The dark.', onward:true, fx:()=>b97ToDark(), go:()=>{ startExplore('b9_c7_dark'); talk('b9_c7_lull'); }},
            {t:'Not yet.', go:()=>startExplore()}]}; },

    /* ======== phase 2: after dark ======== */
    /* the lull: the first halt after dark (the reading's place: the plain after dark, lit by what burns) */
    b9_c7_lull:()=>({sp:'The old marine', scene:'b9_dark', fx:()=>{ S.f.b9_c7_lull = 1; }, again:()=>'The old marine at the back of the line in the wagon-light, with his deck.', txt:
`After dark, the heavies pull the line back a few paces into the light of the burning wagons, so that whatever comes will have to come out of the dark into it. Then there is nothing for a while. The dust settles. Out past the light, things move, big, and do not come.

The old marine comes along the back of the line with his deck in his fist, looking for the Third.${b97Fell().length ? ` He sees the gap and does not ask.` : ''}

"Told you," he says. "After dark. If we were still here." He sits.`,
      ch:[b9ReadChoice(7),
          {t:'Thallo.', go:'b9_c7_thallo2'},
          {t:b97Teach() ? 'Brask, at the next file, showing the heavies something with the flat of his sword.' : 'A heavy of the next file, showing the others something with the flat of his sword.', req:()=>!S.f.b9_c7_lowTried, go:'b9_c7_low'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c7_read:()=>b9ReadOffer(7),
    b9_c7_card:()=>b9ReadCard(7),

    b9_c7_thallo2:()=>({sp:'Thallo', scene:'b9_dark', fx:()=>{ S.f.b9_c7_thallo2 = 1; }, again:()=>'Thallo at the back of the line, looking south at the column\'s lamps.', txt:
`Thallo is at the back of the line looking south, where the column's lamps are going away, slowly, a long string of them down the slope and across the plain.

"Till those are out of sight," he says. "Then we go, in step, the whole rearguard, and nobody runs." He looks back at the dark past the wagon-light. "They'll come again before. Fewer. They've had a long day too."

He does not say anything about the stretch, or about who is not on it. He puts a biscuit in your hand, the one he was saving, and goes on along the line.${b97If('brask', `\n\nBrask watches him go. "Corporal's a good heavy," he says. "Slow." It is the highest thing he says of anybody.`)}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the horsemen far off (the Khundryl's charge; never named, never closer than very far off; rule 94) */
    b9_c7_horse:()=>({sp:'The line\'s east end', scene:'b9_dark', fx:()=>{ S.f.b9_c7_horse = 1; }, again:()=>'The stone at the line\'s east end, and the dark east past it.', txt:
`From the stone at the east end of the line, past the burning wagons, you can see a long way east in the last grey at the bottom of the sky.

Horsemen. Very far off, more than the eye can count, a long dark line of them going in at the gallop toward where the marines' end was, into the dust, with a sound that comes a long breath after them like distant surf. They go in. The dust takes them.

A long while later, some of them come back out of it. Fewer.${b97If('orvas', `\n\nOrvas watches them go in, and puts his hand flat over the black tears on his face, and holds it there.`)}${b97If('tegra', `\n\nTegra watches with her arms folded. "Horse-people charge like that when there is nothing else left to do," she says. "Mine would have."`)}`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the burning wagons: the fallen laid by them, under cloaks (headline only) */
    b9_c7_burning:()=>({sp:'The burning wagons', scene:'b9_dark', again:()=>'The burning wagons, and the row under cloaks beside them.', txt: b97Fell().length ?
`The burning wagons throw their light out over the front of the stretch and back over the row the heavies laid beside them: cloaks, and boots under the cloaks, and nothing else to see. The Third's ${b97Fell().length > 1 ? 'are' : 'is'} at the end of the row. ${b97And(b97Fell().map(NAME))}.

${b97Say({haddat:'Haddat has said the names. She stands by the row a moment more anyway, with her back to it, facing the dark, the way you stand in front of something.', _:'Somebody from the Third has put a stone on each cloak, so the wind will not take them. Nobody says who.'})}` :
`The burning wagons throw their light out over the front of the stretch. Beside them there is a row of cloaks laid over the heavies of the next files who did not get up, with boots under the cloaks and nothing else to see. None of them is the Third's.

The Third stands by the row a moment anyway.`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* the trick: Fight Them Low (✦ wits 19, free) */
    b9_c7_low:()=>{ const t = b97Teach();
      return {sp:t ? 'Brask' : 'A heavy of the next file', scene:'b9_dark', fx:()=>{ S.f.b9_c7_lowSeen = 1; }, again:()=> S.f.b9_c7_lowTried ? (t ? 'Brask, in the line, the heavy sword low.' : 'The heavy of the next file, sitting on his shield, his sword low.') : (t ? 'Brask, showing the heavies of the next file something with the flat of his sword.' : 'A heavy of the next file, showing the others something with the flat of his sword.'), txt:
`${t ? `Brask is down at the next file, showing the heavies there something with the flat of the heavy sword in the wagon-light: down, under, and through.` : `A heavy of the next file, a grey slow man with a long knife, is showing the others something with the flat of his sword in the wagon-light: down, under, and through.`}

"Saw a marine do it at noon," ${t ? 'Brask says' : 'the heavy says'}, "before they pulled the marines back. Didn't go at them. Went under them." He sets the sword's point low, under an imagined head. "They're tall. Tall bends somewhere. Under the head. Behind the knee, the one that bends wrong. Where the plate meets at the hip." He drops, fast for a heavy, and comes up past the place the blade would be. "You go in low. You don't come up till you're through."

"Plate won't give anywhere else," he says. "Found that out the hard way. Ask anybody who tried."`,
        ch:[{t:'Learn it the way the heavies learned it today: low, under the blade, and through.', check:['wits', 19], trick:'b9_c7_low', req:()=>!S.f.b9_c7_lowTried, fx:()=>{ S.f.b9_c7_lowTried = 1; },
              edges:id=>[id === 'brask' && ['he saw it done at noon, and the heavies\' trade is his', 2], (id === 'sgt' && S.tricks && S.tricks.b2_squint) && ['the old bowman\'s breath at Aren: go still, then go', 2], id === 'tangle' && ['a sapper goes under a wall, not through it', 1], id === 'haddat' && ['a shield held low covers the knee and lets the blade go in', 1], id === 'mirrel' && ['she knows where joints are, on anything', 1], id === 'tegra' && ['on the plains you take a bhederin bull at the hock', 1], id === 'ottar' && ['the Perish fight in a wall; going under it is not done', -1], id === 'marrow' && ['a healer of Soliel, not a cutter', -1]],
              go:'b9_c7_low_ok', fail:'b9_c7_low_no'},
            {t:'Back to the line.', go:()=>startExplore()}]}; },
    b9_c7_low_ok:()=>({sp:b97Teach() ? 'Brask' : 'A heavy of the next file', scene:'b9_dark', fx:()=>{ S.f.b9_c7_lowOk = 1; }, txt:
`${b97Teach() ? 'Brask' : 'The heavy'} makes ${by({sgt:'you', _:'{who}'})} do it against him, in the wagon-light, with the flat of the blade: down, too slow, and he taps a shoulder. Down again, faster, and he taps a helm. The third time ${by({sgt:'you go', _:'{who} goes'})} in under where his blade would be and comes up behind his knee, and he grunts, and nods.

"That's it," he says. "That's how the ones who lived did it." He sits down on his shield. "Marines'll say they thought of it."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),
    b9_c7_low_no:()=>({sp:b97Teach() ? 'Brask' : 'A heavy of the next file', scene:'b9_dark', txt:
`It will not come. Every time ${by({sgt:'you go', _:'{who} goes'})} down, the body wants to come back up before it is through, the way any body does with a blade over it, and ${b97Teach() ? 'Brask' : 'the heavy'} taps a shoulder, and a helm, and a shoulder.

"Can't teach it in the light," he says at last. "You learn it out there, or you don't." He sits down on his shield. "Most didn't."`,
      ch:[{t:'Back to the line.', go:()=>startExplore()}]}),

    /* into the dark (survive 5, not mortal) */
    b9_c7_dark_line:()=>({sp:'The line', scene:'b9_dark', html:rationsHTML(), txt: b97DarkDone() ?
`The line is quiet. The dark past the wagon-light is quiet. The column's lamps are gone south.` :
`The line in the wagon-light. Out past it, in the dark, something big is moving. More than one.

${!S.f.b9_c7_thallo2 ? 'Thallo is at the back of the line with the word for after dark.' : 'Behind the line, south, the column\'s lamps are going away, slowly. Hold until they are gone.'}${b97If('brask', `\n\nBrask lifts the heavy sword. "Fewer," he says. "Thallo was right." He does not sound comforted.`)}`,
      ch:[{t:'Hold the dark.', req:()=>!!S.f.b9_c7_thallo2 && !b97DarkDone(), onward:true, go:()=>startBattle('b9_c7_dark', {})},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c7_dark_after:()=>({sp:'The line', scene:'b9_dark', fx:()=>{ S.f.b9_c7_darkDone = 1; }, txt:
`After the last of them, nothing comes out of the dark for a long time. The wagons burn down. The column's lamps go over the rise to the south, one by one, and are gone.

Thallo comes along the back of the line. "That's it," he says. "Rearguard. In step." Along the stretch the heavies pick up their shields, and their wounded, and turn, and walk, all at once, the whole rearguard, with nobody running.${b97If('haddat', `\n\nHaddat walks backward the first twenty paces, facing the dark, with the blue shield up. Then she turns.`)}`,
      ch:[{t:'Walk back, in step.', onward:true, go:'b9_c7_walk'},
          {t:'Not yet.', go:()=>startExplore()}]}),
    b9_c7_walk:()=>({sp:'The walk back', scene:'b9_dark', txt: !b97DarkDone() ?
`South, the column's lamps are still in sight. The rearguard holds until they are not. That is the order.` :
`The rearguard walks back through the night in step, in a long line across the plain, with nothing behind it but the dark and the last of the burning wagons going out one by one.

Nobody talks. Every so often somebody looks back. There is never anything there.${b97If('tegra', `\n\nTegra walks at the back, behind the last heavy, with her axes. Once she stops and puts her hand flat on the ground, and listens, and gets up and walks on. "Nothing," she says. "Nothing close."`)}

Toward morning the light comes up grey over the Wastes, and there is the army's trail in front of them, going away north and east across the plain.`,
      ch: b97DarkDone() ? [{t:'The trail.', onward:true, fx:()=>{ S.f.b9_c7_ph = 3; }, go:()=>{ startExplore('b9_c7_trail'); talk('b9_c7_morning'); }},
          {t:'Not yet.', go:()=>startExplore()}] : [{t:'Back to the line.', go:()=>startExplore()}]}),

    /* ======== phase 3: a grey morning on the retreat trail ======== */
    b9_c7_morning:()=>({sp:'The retreat trail', scene:'b9_retreat', html:rationsHTML(), fx:()=>{ S.f.b9_c7_morning = 1; }, again:()=>'The retreat trail in the grey morning, boot-prints and ruts going away north.', txt:
`The retreat trail is a wide trampled road across the Wastes, boot-prints and wheel-ruts and dung, going away north and east as far as the eye goes. Along it there is whatever was too heavy to carry: a wheel, a broken pike, a cook-pot with its bottom out, a sandal.

There is no food on it. The Third looks, because it is the Third's habit, and there is nothing. The quartermasters' wagons went on in the night, and what they dropped, the stragglers picked up.${b97Say({tangle:'\n\nTangle is counting what is left in the packs. It does not take long. He stops.', doss:'\n\nDoss picks up the cook-pot with its bottom out and looks through it at the sky and puts it down again.', _:''})}

Up the trail a runner is coming back from the head of the column, against the stream of stragglers, with a slate under his arm.`,
      ch:[{t:'The runner.', go:'b9_c7_runner'},
          {t:'Look along the trail.', go:()=>startExplore()}]}),

    /* the news: rules 86, 90 (headline; the believed-dead are "missing" at most; nothing confirmed) */
    b9_c7_runner:()=>({sp:'A runner', scene:'b9_retreat', fx:()=>{ S.f.b9_c7_news = 1; }, again:()=>'The runner, gone on down the trail toward the next company.', txt:
`The runner is a marine, a girl with a split lip and a slate she keeps looking at as if it might have changed. She is going down the column company by company with the word, and has said it so many times the words have gone flat.

"The Fist is dead," she says. "He went in. The High Mage is missing. Nobody's found him. A captain went in alone, up the far end, and nobody's seen him since." She looks at the slate. "The Adjunct was carried off the field. That's all they'll say." She looks at the Third. "Column's stopping tonight. Days, maybe. Heavies at the back. That's all."

She goes on down the trail to the next company, saying it again.${b97Say({haddat:'\n\nHaddat stands very still. Then she adds a name to the long list, under her breath, a Fist\'s. She does not know it. She says "the Fist" instead.', marrow:'\n\nMarrow closes her eyes a moment. "Missing is not dead, child," she says. "Not yet. Not until somebody says it with their own mouth."', _:''})}`,
      ch:[{t:'Back to the trail.', go:()=>startExplore()}]}),

    /* stragglers: get them walking (a check) */
    b9_c7_stragglers:()=>({sp:'Stragglers', scene:'b9_retreat', again:()=> S.f.b9_c7_stragTried ? 'The stragglers\' place by the trail, empty now.' : 'Stragglers sitting by the trail.', txt:
`Half a dozen regulars are sitting by the side of the trail in the grey light, with their boots off, not going anywhere. One of them has a spear. The rest have nothing. They look at the Third coming up the trail like a column a long way off.

"Column's too far," one of them says. "We'll catch it up." He does not move.`,
      ch:[{t:'Get them on their feet and walking, heavies\' pace, behind the Third.', check:['wits', 17], req:()=>!S.f.b9_c7_stragTried, fx:()=>{ S.f.b9_c7_stragTried = 1; },
            edges:id=>[id === 'sgt' && ['a sergeant\'s voice at dawn is a thing they all know', 2], id === 'haddat' && ['she says it once, and the way she says it, once is enough', 1], id === 'brask' && ['a heavy who held the rearguard; they saw him walk past', 1], id === 'darrut' && ['the Aren Guard knew how to march men who did not want to', 1], id === 'tegra' && ['a Barghast telling Malazans to get up', -1]],
            near:{t:()=>`Yes, but the one who spoke takes it badly, and comes up off the ground swinging, and it takes ${b97Nm(b97Who())} a moment and a sore jaw to sit him down again and stand him up properly. Then they walk.`, fx:()=>bruise(b97Who(), bruiseN())},
            go:'b9_c7_strag_ok', fail:'b9_c7_strag_no'},
          {t:'Back to the trail.', go:()=>startExplore()}]}),
    b9_c7_strag_ok:()=>({sp:'Stragglers', scene:'b9_retreat', fx:()=>{ S.f.b9_c7_strag = 'ok'; }, txt:
`They put their boots back on. They get up. They fall in behind the Third, in no order, and then, after a while of watching the heavies walk, in something like one.

By noon they are walking in step and do not seem to notice. The one with the spear carries it the right way up.`,
      ch:[{t:'Back to the trail.', go:()=>startExplore()}]}),
    b9_c7_strag_no:()=>({sp:'Stragglers', scene:'b9_retreat', fx:()=>{ S.f.b9_c7_strag = 'no'; }, txt:
`They listen, and nod, and do not move. "We'll catch it up," the one says again.

The Third leaves them by the trail with their boots off. Later in the morning the heavies behind say they came in, after all, an hour behind everybody, and nobody said a word to them about it.`,
      ch:[{t:'Back to the trail.', go:()=>startExplore()}]}),

    /* the quartermaster's abandoned wagon: the rearguard's cloaks */
    b9_c7_qm:()=>({sp:'An abandoned wagon', scene:'b9_retreat', fx:()=>{ if (!S.f.b9_c7_cloak) { S.f.b9_c7_cloak = 1; gain('b9_c7_rearguardcloak'); } }, again:()=>'The quartermaster\'s abandoned wagon, its bed bare now.', txt:
`A quartermaster's wagon is standing by the trail with its traces cut and its team gone, tilted on a broken axle. The stragglers have been through it for food and found none. They left the rest.

The rest is a bale of heavies' cloaks, thick grey wool, oiled, with scale sewn over the shoulders and down the back. Rearguard cloaks. The quartermasters keep them for the squads that walk last.

${b97Say({brask:'Brask pulls one out of the bale and shakes the dust out of it. "These are ours," he says. "Always were." He holds it out to you.', haddat:'Haddat pulls one out of the bale and looks at the scale on the back. "For walking away," she says. "Facing the other way." She holds it out to you.', _:'The Third takes them. They are for the rearguard. The Third was.'})}`,
      ch:[{t:'Back to the trail.', go:()=>startExplore()}]}),
    b9_c7_brokencart:()=>({sp:'A broken cart', scene:'b9_retreat', txt:
`A handcart on its side by the trail, one wheel off, empty. Somebody pulled it this far with something in it they could not leave, and then left it, and the cart too.${b97If('mehet', `\n\nMehet rights it, for no reason, and sets the wheel against it. "Somebody'll want it," he says.`)}${b97If('wenna', `\n\nWenna puts her hand on the wheel and turns it once. "Going round," she says, "and getting nowhere." She smiles a little. "The Shore says that about the sea."`)}`,
      ch:[{t:'Back to the trail.', go:()=>startExplore()}]}),

    /* Wastes dogs at the stragglers' edge (optional) */
    b9_c7_dogs:()=>({sp:'Dogs at the stragglers\' edge', scene:'b9_retreat', again:()=>'Three grey dogs working the stragglers\' edge, looking for the slow one.', txt:
`Three Wastes dogs, grey and lean, are working along the edge of the trail where the stragglers are, the way dogs work a herd: keeping pace, a stone's throw off, looking for the one who will sit down.${b97If('tegra', `\n\nTegra watches them. "They followed the column out of the dust," she says. "They know what comes after a battle." She does not say what that is.`)}`,
      ch:[{t:'Go at them before they pick somebody.', onward:true, go:()=>startBattle('b9_c7_trail', {})},
          {t:'Shout them off, the heavies\' way: stamp, shields, a lot of noise.', check:['might', 17], req:()=>!S.f.b9_c7_dogsTried, fx:()=>{ S.f.b9_c7_dogsTried = 1; },
            edges:id=>[id === 'tegra' && ['the plains people drive wolves off the herds', 2], id === 'brask' && ['a heavy makes a lot of noise when he wants to', 1], id === 'sathi' && ['the Weasels ran with dogs', 1], id === 'wenna' && ['dogs on the Shake shore were nobody\'s and everybody\'s', 1], id === 'marrow' && ['she does not like to shout', -1]],
            near:{t:()=>`Yes, but the biggest of them does not go at once, and gets its teeth in ${b97Nm(b97Who())}'s boot, and through it, before a shield takes it across the head. Then they go.`, fx:()=>bruise(b97Who(), bruiseN())},
            go:'b9_c7_dogs_gone', fail:'b9_c7_dogs_seen'},
          {t:'Leave them. The stragglers can look after themselves.', fx:()=>{ S.f.b9_c7_dogsDone = 'left'; }, go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c7_dogs_gone:()=>({sp:'Dogs at the stragglers\' edge', scene:'b9_retreat', fx:()=>{ S.f.b9_c7_dogsDone = 'driven'; }, txt:
`The dogs go off the trail at a lope and stop a long bowshot out, and sit, and watch. After a while they get up and go back the way the army came, toward the dust, at a lope.`,
      ch:[{t:'Back to the trail.', go:()=>startExplore()}]}),
    b9_c7_dogs_seen:()=>({sp:'Dogs at the stragglers\' edge', scene:'b9_retreat', txt:
`The dogs back off a few paces, and no further, and watch the Third with their heads low. They have seen worse than a squad of heavies shouting. They have seen it lately.`,
      ch:[{t:'Go at them before they pick somebody.', onward:true, go:()=>startBattle('b9_c7_trail', {})},
          {t:'Leave them.', fx:()=>{ S.f.b9_c7_dogsDone = 'left'; }, go:()=>startExplore()},
          {t:'Not now.', go:()=>startExplore()}]}),
    b9_c7_dogs_after:()=>({sp:'The stragglers\' edge', scene:'b9_retreat', fx:()=>{ S.f.b9_c7_dogsDone = 'fought'; }, txt:
`The dogs are done. The stragglers along the trail watched it, and walk a little closer to the Third after, without being told.`,
      ch:[{t:'Back to the trail.', go:()=>startExplore()}]}),

    /* on to the camp, days after */
    b9_c7_trail_on:()=>({sp:'The trail', scene:'b9_retreat', txt: !S.f.b9_c7_news ?
`Up the trail, a runner is coming back from the head of the column with the word. The Third should hear it.` :
`North, after the column. The trail goes on across the Wastes, and the Third goes on along it, in step, at the heavies' pace, behind everybody.

That night the column stops. It stays stopped, the next day, and the next. The surgeons need the time. So does everybody.`,
      ch: S.f.b9_c7_news ? [{t:'Days after.', onward:true, fx:()=>{ S.f.b9_c7_ph = 4; }, go:()=>{ startExplore('b9_c7_camp'); talk('b9_c7_camp_arrive'); }},
          {t:'Not yet.', go:()=>startExplore()}] : [{t:'Back to the trail.', go:()=>startExplore()}]}),

    /* ======== phase 4: the retreat camp, days after ======== */
    b9_c7_camp_arrive:()=>({sp:'The retreat camp', scene:'b9_c7_camp', html:rationsHTML(), fx:()=>{ if (!S.f.b9_c7_pot) { S.f.b9_c7_pot = 1; b9Ration(1, 'the column\'s pot'); } }, again:()=>'The retreat camp at dusk, fewer tents than there were, the dung-fires low.', txt:
`Days after, the column is still stopped on the same stretch of the Wastes, and has begun, slowly, to look like an army again. Tents in rows. Wagons drawn in. The surgeons' lines at one end, long, and getting shorter. Fewer tents than there were at the start of the Wastes, in every company. Nobody counts them out loud.

The quartermasters have found what was in the wagons that came through, and put it in the column's pot, and the pot, for the first time since before the dust, has something in it. The Third eats it sitting on the ground and does not talk.${b97Fell().length ? `\n\n${b97Say({haddat:`Haddat sets a cup down at the fire for ${b97And(b97Fell().map(NAME))}, with water in it, as her mother would have.`, _:`There is a gap at the fire where ${b97And(b97Fell().map(NAME))} would sit. Nobody sits in it.`})}` : ''}

Thallo comes along the company's fires in the dusk with three slates under his arm instead of one.`,
      ch:[{t:'Thallo.', go:'b9_c7_slates'},
          {t:'The fire.', go:'b9_c7_fire'},
          {t:'Look round the camp.', go:()=>startExplore()}]}),

    b9_c7_pot:()=>({sp:'The cook-wagon', scene:'b9_c7_camp', html:rationsHTML(), again:()=>'The cook-wagon and the column\'s pot, a little in it.', txt:
`The company's cook-wagon came through the night with one wheel held on by rope and a cook who will not talk about it. The column's pot is on its tailboard: barley, and what the quartermasters found, and a bone somebody has been boiling for three days.

It is not much. It is more than the Third has had since before the dust. The cook ladles it out without looking at who he is ladling it to, and then looks, and gives the heavies of the rearguard a little more, without saying why.`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    b9_c7_slates:()=>({sp:'Thallo', scene:'b9_c7_camp', html:rationsHTML(), fx:()=>{ S.f.b9_c7_slates = 1; }, txt:
`Thallo sits down at the Third's fire with three slates and lays them on the ground in a row.

"Captain's word," he says. "Army's not going to stay one army. Clerks say the Adjunct means to go east, where there's no road. The Letherii are to go south, the long way round, with whoever else comes up. And there's a slate for time served." He taps each one. "East. South. Home. Every sergeant in the company gets asked." He looks at the fire. "Captain says the rearguard gets asked first. So."${b97Faith() === 'doubt' ? `\n\nThe Third looks at the fire.` : b97Faith() === 'kept' ? `\n\nHe looks round the Third at the fire, one by one, as if he already knew.` : ''}`,
      ch:[{t:'The slates.', go:'b9_c7_key'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ======== the key: the Third's road (b9Faith colours it) ======== */
    b9_c7_key:()=>{ const f = b97Faith(), k = b97Key();
      if (k) return {sp:'Thallo', scene:'b9_c7_camp', html:rationsHTML(), txt:
`The slate with the Third's names on it is with the captain's clerk now: ${k === 'adjunct' ? 'east' : k === 'south' ? 'south, with the Letherii' : 'time served'}. Thallo has gone on to the next fire with the other two.`,
        ch:[{t:'Back to the camp.', go:()=>startExplore()}]};
      return {sp:'Thallo', scene:'b9_c7_camp', html:rationsHTML(), txt:
`Three slates on the ground by the fire. East. South. Home.

${f === 'doubt' ? `The Third is quiet a long while. Then ${b97Say({tangle:'Tangle', mirrel:'Mirrel', doss:'Doss', marrow:'Marrow', _:'somebody'})} says the word home, out loud, as if testing whether it will hold weight. It does. Nobody argues with it.` : f === 'kept' ? `The Third looks at the east slate first, every one of it, and then at you.` : 'The Third looks at the slates, and at you.'}${b97If('brask', `\n\nBrask turns the tally-stick in his fingers. "Heavies go where the army goes," he says. "That's what I always thought heavies were for." He looks at you. "Up to you, Sergeant."`)}${b97If('tegra', `\n\nTegra looks east, and then south, and then back at the Third. "I go where the Third goes," she says. "I said it at the guides' fire. I meant it."`)}${b97If('haddat', `\n\nHaddat has the blue shield on her knees. "${f === 'doubt' ? 'Wherever we go, I will say the names,' : 'The names go where the Adjunct goes,'}" she says.`)}`,
        ch:[{t:f === 'doubt' ? '"East. Because the column does." The first slate.' : '"East, with the Adjunct. Wherever she takes it." The first slate.', fx:()=>{ if (!S.f.b9_c7_key) { S.f.b9_c7_key = 'adjunct'; b97L('haddat', 1); b97L('brask', 1); b97L('marrow', 1); b97L('mirrel', -1); } }, go:'b9_c7_key_adjunct'},
            {t:'"South, with the Letherii. The long way round." The second slate.', fx:()=>{ if (!S.f.b9_c7_key) { S.f.b9_c7_key = 'south'; b97L('tegra', 1); b97L('tangle', 1); b97L('doss', 1); b97L('brask', -1); } }, go:'b9_c7_key_south'},
            {t:f === 'doubt' ? '"Home. Say it plainly: home." The third slate.' : '"Time served. Home." The third slate.', fx:()=>{ if (!S.f.b9_c7_key) { S.f.b9_c7_key = 'home'; b97L('mirrel', 1); b97L('wenna', 1); if (f !== 'doubt') b97L('haddat', -1); } }, go:'b9_c7_key_home'},
            {t:'Not yet.', go:()=>startExplore()}]}; },
    b9_c7_key_adjunct:()=>({sp:'The first slate', scene:'b9_c7_camp', html:rationsHTML(), txt:
`Thallo writes the Third's names on the east slate, one after another, with a stub of chalk, slowly.${b97Fell().length ? ` He leaves a space at the bottom, and does not explain it.` : ''}

"East," he says. "Into country that's not on the maps. After the Adjunct, wherever that is." He looks at the slate. "Heavies' place. I'll be on it too." He stands up. "Good."${b97Say({haddat:'\n\nHaddat nods, once, and goes on tightening the blue shield\'s straps.', marrow:'\n\nMarrow ties a knot in her string. "East, child," she says. "There will be sick in the east too."', _:''})}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b9_c7_key_south:()=>({sp:'The second slate', scene:'b9_c7_camp', html:rationsHTML(), txt:
`Thallo writes the Third's names on the south slate, one after another, and looks at them a long breath.

"South," he says. "With the Letherii and whoever else turns up, the long way round. There'll be a road. There'll be towns, the clerks say." He stands up. "Won't be heavies. You'll be the heaviest thing they've got." He almost smiles. "Teach them to walk slow."${b97If('tegra', `\n\nTegra nods. "South is nearer the plains," she says. "I know the ground there. Some of it."`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),
    b9_c7_key_home:()=>({sp:'The third slate', scene:'b9_c7_camp', html:rationsHTML(), txt:
`Thallo writes the Third's names on the time-served slate, one after another, and when he gets to the end he sits with the chalk in his fingers.

"Time served," he says. "You've done it. Rearguard and all." He stands up. "It's a long walk west. There'll be others going. Letherii, some of them, and wounded who can walk." He hesitates. "Go and be bored somewhere, Sergeant. You've earned that."${b97Faith() === 'doubt' ? `\n\nThe Third does not argue. It does not look sorry, either.` : b97If('haddat', `\n\nHaddat looks east, the way the army will go, and then at the slate. "I will say the names in the west, then," she says. It costs her something to say it.`)}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the other squad's one line of news (the Letherii, by Ch 6's key) */
    b9_c7_next:()=>({sp:'Heavies at the next fire', scene:'b9_c7_camp', fx:()=>{ S.f.b9_c7_next = 1; }, again:()=>'The heavies at the next fire, talking low.', txt:
`The heavies at the next fire are talking about the Letherii. ${b97LKey() === 'train' ? '"Held their wagons," one of them says, "all afternoon, on the far side, with the short-tails come round behind. The wagons came through. That\'s why there\'s barley in the pot." He raises his cup toward the west of the camp. "Letherii."' : '"Held their stretch," one of them says, "all day, on the far side, and pulled back in step at dusk like they\'d been doing it all their lives." He raises his cup toward the west of the camp. "Letherii."'}

"Bonehunters walked off that plain," another says. "Didn't walk off it alone."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the surgeons' lines */
    b9_c7_surgeons:()=>({sp:'The surgeons\' lines', scene:'b9_c7_camp', fx:()=>{ S.f.b9_c7_surgeons = 1; }, again:()=>'The surgeons\' lines at the camp\'s end, getting shorter.', txt:
`The surgeons' lines are at the end of the camp, rows of the wounded on blankets in the dusk, and healers going down the rows with lamps. The rows are shorter than they were. The surgeons do not say which way they got shorter, and nobody asks.${S.f.b9_c7_cart === 'ok' ? `\n\nAt the end of one row a heavy with his leg in a splint lifts his hand at the Third as it passes. He has his sword across his knees.` : ''}${b97Say({marrow:'\n\nMarrow goes down a row without being asked, and kneels by somebody, and stays.', mirrel:'\n\nMirrel goes down a row without being asked, counting in threes, and stops counting, and kneels.', _:''})}`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the old marine, days after */
    b9_c7_old4:()=>({sp:'The old marine', scene:'b9_c7_camp', fx:()=>{ S.f.b9_c7_old4 = 1; }, again:()=>'The old marine at his small fire, his deck in his shirt.', txt:
`The old marine has his own small fire again, by the heavies' lines, and his cup, and somebody has put rum in the cup, which he has not drunk yet.

"Read for the marines that night," he says. "Fair cards. All of them." He turns the cup. "${S.f.b9_c7_drawn ? `Yours came up honest, in the dark. They do, out here.` : 'You never let me read for you. Out there in the dark. Probably right.'}" He drinks at last. "That's the end of a book, a night like that. Every army has one. Then it turns the page and keeps walking."`,
      ch:[{t:'Back to the camp.', go:()=>startExplore()}]}),

    /* the roll, cut into a stick (an item) */
    b9_c7_roll:()=>{ const cutter = b9In('haddat') ? 'Haddat takes' : b9In('brask') ? 'Brask takes' : 'You take';
      return {sp:'The roll', scene:'b9_c7_camp', fx:()=>{ if (!S.f.b9_c7_roll) { S.f.b9_c7_roll = 1; gain('b9_c7_rollstick'); } }, txt:
`${cutter} a stick of hard wood off a broken wagon-rail and a belt-knife, and cuts the Third's roll into it by the fire: a notch for every soldier who has walked with the Third since Letheras.${b97Fell().length ? ` For ${b97And(b97Fell().map(NAME))}, a line across the notch.` : ''}${Object.keys(S.dead || {}).some(id => S.dead[id] && S.dead[id].from) ? ` For the ones who fell before Letheras, a line across as well, because they walked with it in the ways that count.` : ''}

When it is done it goes round the fire, hand to hand, and everybody runs a thumb along it, and it comes back.${b97If('brask', `\n\nBrask looks at it a long while, and then at his own tally-stick, the four notches filed flat. He does not file anything.`)}`,
        ch:[{t:'Back to the fire.', go:'b9_c7_fire'}]}; },

    /* the end: the last of it */
    b9_c7_end:()=>({sp:'The last of it', scene:'b9_c7_camp', html:rationsHTML(), txt:
`The last night in the retreat camp. The packs by the fire, the slates with the clerk, the column getting ready to be whatever it is going to be next.

${({adjunct:'In the morning the army goes east, into country no map in the column has on it, after the Adjunct, wherever she means to take it. The Third goes with it, at the back, with the heavies, where it was put.', south:'In the morning the Letherii wagons turn south, and the Third goes over to them with its packs on, the heaviest thing in their column, to walk the long way round.', home:'In the morning the Third shoulders its packs and turns west, time served, toward Lether and whatever is past Lether, with a few Letherii going home and the wounded who can walk.'})[b97Key() || 'adjunct']}

${b97Fell().length ? `The Third is shorter by ${numw(b97Fell().length)} than it was on the stretch, and it carries the ${b97Fell().length > 1 ? 'names' : 'name'} with it.` : 'Everybody who stood on the stretch is still here. The Third checks it, out of habit, and then checks it again.'} ${b97Say({haddat:'Haddat says the names, all of them, standing. Then she picks up the blue shield.', brask:'Brask puts the tally-stick in his belt. Then he picks up the heavy sword.', _:'Then it picks up its packs.'})}${b97If('tegra', `\n\nTegra is already on her feet, axes in her belt, facing the way the Third is going. "Well," she says. "Walk."`)}`,
      ch:[{t:'Go.', onward:true, go:()=>chapterEnd(7, b97Key() || 'adjunct')},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};

/* the rearguard is done: on into the dark (phase 2) */
function b97ToDark(){ S.f.b9_c7_ph = 2; if (S.f.sgtScar) S.f.b9_c7_scarSaid = 1; }
/* a line on hunger before the mortal fight (the engine takes the health; this only says so) */
/* the column's pot before the rearguard (David, Nov 10, 2026): the Third goes into the line on at least 2 Rations; never lowers them */
const B97_POT = 2;
function b97Pot(){ const r = b9Rations(); if (r < B97_POT) b9Ration(B97_POT - r, 'the column\'s pot, before the rearguard'); return b9Rations(); }
function b97Hunger(){ const t = b9RatTier(); return t === 'short' ? '\n\nThe Third is on short rations, and has been. It will feel it out there.' : t === 'hungry' || t === 'starving' ? '\n\nThe Third is on half a ration and less, and has been for days. Every one of it will feel it out there.' : ''; }

/* ============ the end of Book Nine: both squads (37's pages, extended below for the Letherii's road and pages and Where the books meet) ============ */
const B97FIN = {};
B97FIN.KEYS = ['adjunct', 'south', 'home'];
B97FIN.key = k => B97FIN.KEYS.includes(k) ? k : B97FIN.KEYS.includes(S && S.f && S.f.b9_c7_key) ? S.f.b9_c7_key : 'adjunct';
B97FIN.join = ps => ps.filter(p => p && String(p).trim()).join('\n\n');
B97FIN.loy = (id, warm, cold, mid) => { const l = (S.loy && S.loy[id]) || 0; return l >= 2 ? warm : l <= -2 ? cold : mid; };
B97FIN.rat = h => { const r = (h && h.b9r && typeof h.b9r.n === 'number') ? h.b9r.n : B9_RAT0, t = b9RatTier(r); return `${r} of ${B9_RATMAX}, ${B9_RATW[t]}`; };
/* the Third's Book Nine in a line per soldier: Ch 1's last night, Ch 3's fever, Ch 5's cache, Ch 7's stretch (each read with a default;
   Tegra joined at Ch 5) */
B97FIN.book = id => { const w = id === 'sgt' ? 'you' : b97He(id), late = id === 'tegra';
  return [late ? '' : (b97Street() ? `In Letheras, on the last night, ${w} went out into the quarter where the dead stirred.` : `In Letheras, on the last night, ${w} sat on the heavies' stores.`),
    late ? '' : (b97Boil() ? `On the road east ${w} stopped and boiled everything.` : `On the road east ${w} kept the column's pace.`),
    b97Shared() ? `Deep in the Wastes ${w} put a dead sutler's cache in the company's pot.` : `Deep in the Wastes ${w} kept a dead sutler's cache for the squad.`,
    S.f.b9_c7_rearDone ? `On the night the short-tails came, ${w} held the stretch between the cut bank and the burned wagons.` : ''].filter(Boolean).join(' '); };

B97FIN.ending = key => {
  const T = {adjunct:['East, with the army', 'b9_c7_road'], south:['South, the long way round', 'b9_c7_road'], home:['Time served', 'b9_c7_road']}[key] || ['East, with the army', 'b9_c7_road'];
  if (typeof S === 'undefined' || !S || !S.f) return {title:T[0], scene:T[1], paras:[]};
  try {
    const mates = b97Mates().map(NAME), n = b97Mates().length + 1;
    let P;
    if (key === 'adjunct') P = [
`The army walks off the plain where the short-tails came out of the dust, and rests, and goes on east, because the Adjunct does. Behind it there is a field nobody in the column looks back at. Ahead there is country no map in the column has on it, and no road at all.`,
`${mates.length ? `${b97And(mates)} ${mates.length > 1 ? 'march' : 'marches'} with you at the back of the column, with the heavies, where the Third was put.` : 'You march alone at the back of the column with the heavies, and Thallo puts two of them beside you so that it looks like a squad.'} At every halt the Third counts itself, and gets ${numw(n)}, and checks it.`,
`The Third's road goes on, east with the Adjunct: Book Ten, when it is written, will offer this save.`];
    else if (key === 'south') P = [
`Days after the battle, the army stops being one army. The Adjunct goes east, where there is no road. The Letherii brigades turn south, the long way round, with whoever else comes up, and the Third goes over to their wagons with its packs on.`,
`${mates.length ? `${b97And(mates)} ${mates.length > 1 ? 'walk' : 'walks'} with you among the Letherii, the heaviest thing in their column.` : 'You walk alone among the Letherii, the heaviest thing in their column.'} They count their wagons twice. The Third counts itself, and gets ${numw(n)}, and checks it.`,
`The Third's road goes on, south with the long column: Book Ten, when it is written, will offer this save.`];
    else P = [
`The army goes on east without the Third. The Third is already walking west by then, time served, its names on a slate in the captain's clerk's box, with a few Letherii going home and the wounded who can walk.`,
`${mates.length ? `${b97And(mates)} ${mates.length > 1 ? 'walk' : 'walks'} with you.` : 'You walk alone.'} Behind you the Wastes, and somewhere in them a stretch between a cut bank and a line of burned wagons. Ahead, a long way off, Lether, and past Lether, whatever home turns out to be.`,
`There is no road onward from here for the Third. Nobody is looking for a squad that walked home.`];
    P.push(`The Third's rations, at the end: ${B97FIN.rat(S)}.${b97Faith() ? ` ${b97Faith() === 'kept' ? 'It still marches for something.' : 'It marches because the column does, and says so.'}` : ''}`);
    return {title:T[0], scene:T[1], paras:P};
  } catch(e) { return {title:T[0], scene:T[1], paras:[]}; }
};

/* a road line per soldier per road, the soldier's Book Nine in a sentence, and a warm closing line (the cold and middle ones are shared) */
B97FIN.T = {
  haddat:{title:'The names', adjunct:'Haddat goes east behind the Adjunct with the blue shield on her arm, and the list she says at night is longer by the Wastes, and she says all of it.', south:'Haddat goes south with the long column, and teaches the Letherii front rank to set a shield the Hissari way, and says the names at night in two languages now.', home:'Haddat walks west with the blue shield on her back, toward Lether and a ship and, somewhere past it, Hissar, and says the names every night of the walk.',
    mem:'She boiled the squad\'s water at every halt, counting to a hundred, all the way across the Wastes.', warm:'"You stood," she tells you. "I will say that with the names. It is not a small thing to say."'},
  sathi:{title:'Laughing', adjunct:'Sathi goes east laughing at the dust, which she says is the only thing in the Wastes fast enough to be worth chasing.', south:'Sathi goes south with the long column, because the Letherii have horses, and steals the worst one, and rides it laughing.', home:'Sathi walks west, which she says is the wrong way for a Wickan, and laughs about it every morning of the walk.',
    mem:'She went hungry in the Wastes the way the Weasels did, grinning at the dark.', warm:'"Next time," she tells you, "we chase them."'},
  tangle:{title:'The count', adjunct:'Tangle goes east with the satchel, counting it every morning, and the count does not get bigger, and he goes anyway.', south:'Tangle goes south with the long column and finds a Letherii armourer who has never seen a cusser, and does not let him near one.', home:'Tangle walks west with the satchel and counts it every morning, out of habit, though there is nothing left in it but the straps.',
    mem:'He learned on the stretch which munitions the short-tails feel and which they shrug off, and wrote it down.', warm:'"Still here," he tells you. He means you. He means it as the best thing he knows how to say.'},
  marrow:{title:'The string', adjunct:'Marrow goes east with her bag and her knotted string, and ties a knot for every one who walks out of the Wastes on their own feet.', south:'Marrow goes south with the long column and the Letherii surgeons, and they argue about herbs every halt, and the sick get better while they argue.', home:'Marrow walks west with the wounded who can walk, calling every one of them child, and ties a knot in her string at every halt where nobody died.',
    mem:'She found Soliel\'s door open a crack even in the Wastes, and kept it open as long as she could.', warm:'"You kept them alive, child," she tells you. "Most of them. That is what the job is."'},
  mirrel:{title:'Three, and up', adjunct:'Mirrel goes east, counting the sick in threes at every halt, and the count gets smaller, and she checks it twice.', south:'Mirrel goes south with the long column and the Letherii healers, and learns the water cure properly, and teaches it back.', home:'Mirrel walks west with the wounded, counting them in threes at every halt, and the count stays the same all the way, which she says is the best thing a count can do.',
    mem:'She bound the squad\'s feet at every halt in the Wastes, and did not like what she found, and bound them anyway.', warm:'"Feet," she tells you. "Show me." She means it kindly.'},
  mehet:{title:'The keys', adjunct:'Mehet goes east with his ring of keys into country with no doors at all, and says it is restful.', south:'Mehet goes south with the long column, where there will be towns, eventually, and walls, and locks, and he means to be first through all of them.', home:'Mehet walks west toward cities, any city, and every night of the walk he names the streets of one he knows, to keep them.',
    mem:'He said the Wastes had no locks, and meant it as a complaint.', warm:'"Next door we come to," he tells you, "I\'ll open it for you."'},
  ottar:{title:'The word for wall', adjunct:'Ottar goes east with the Third in his grey plate, and learns a word of the heavies\' Malazan every day, and the word today is <em>rearguard</em>.', south:'Ottar goes south, where the grey helms are said to be marching, and walks a little faster than the column, and does not say why.', home:'Ottar walks west with the Third as far as the column\'s edge, and there he turns south alone, toward where the grey helms are said to be, with his helm under his arm.',
    mem:'He stood on the stretch in grey plate and did not move, which is the Perish word for courage.', warm:'"Today\'s word," he tells you, "is <em>sergeant</em>. It means the one who stayed."'},
  tallow:{title:'Mostly they came back', adjunct:'Tallow goes east with his grandmother\'s cards in his shirt, and reads for the heavies at night, and does not read for himself.', south:'Tallow goes south with the long column and reads the Deck for the Letherii on a ration crate, and they bring their own tiles to argue with it.', home:'Tallow walks west reading the Deck at every halt for whoever is walking with him, and everybody draws something kind, which he says is the walk.',
    mem:'His grandmother said the Wastes had a card of their own. He never found out which.', warm:'"Grandmother would\'ve liked you," he tells you. "She liked people who came back."'},
  hessa:{title:'The door', adjunct:'Hessa goes east with her spear upright, and at every halt she stands between the Third and the dark like a temple door.', south:'Hessa goes south with the long column, and says the worm is nearer in the south, and nobody asks how she knows.', home:'Hessa walks west with her spear, and says the worm is patient, and so is she.',
    mem:'In the Wastes she fasted without meaning to, and the visions did not come.', warm:'"You held the door," she tells you. "That is all a temple is."'},
  tebbet:{title:'A long way off', adjunct:'Tebbet goes east out on the flanks, further out than anyone, looking for something to shoot, and finds the horizon.', south:'Tebbet goes south with the long column and rides with the Letherii outriders on a borrowed horse, with his bow, far out.', home:'Tebbet walks west on the column\'s flank, as far out as he can get, and comes in at night with nothing, because there is nothing.',
    mem:'He went a league out for a hare in the Wastes and came back with a story about the hare instead.', warm:'"Next time," he tells you, "I\'ll see them coming further off."'},
  darrut:{title:'The wall', adjunct:'Darrut goes east with his big shield and keeps Aren to himself, and the stretch with it, the Aren Guard\'s way of saying a thing was bad.', south:'Darrut goes south with the long column and finds that the Letherii keep their shields too low, and fixes it, one Letherii at a time.', home:'Darrut walks west with his big shield, and says at the first well that the Aren Guard would have been proud, and then does not mention the Wastes again.',
    mem:'In the Aren Guard, when the ration was cut, somebody told you why. In the Wastes he got used to it.', warm:'"A wall\'s a wall," he tells you. "We were one."'},
  yorin:{title:'Clear tomorrow', adjunct:'Yorin goes east and tells the quartermasters what the sky will do each morning, and the quartermasters listen, which is new.', south:'Yorin goes south and tells the Letherii what the wind will do, and they write it in a ledger, which pleases him enormously.', home:'Yorin walks west, and the copper vane points west too, every morning, which he says is Serc agreeing.',
    mem:'His vane would not settle the day the dust came, and he did not like it, and he was right.', warm:'"Clear tomorrow," he tells you. "I checked."'},
  rasp:{title:'Lovely', adjunct:'Rasp goes east with the satchel on her hip and the sappers\' last cusser in it, and says she is saving it for something that deserves it.', south:'Rasp goes south with the long column, where there are said to be walls, and is very happy about it.', home:'Rasp walks west toward the sea and the Malaz waterfront, and a cusser she means to throw into the harbour, she says, just to hear it.',
    mem:'She learned on the stretch that a cusser tears the plate open, and called it lovely, and did not smile.', warm:'"Lovely work, Sergeant," she tells you. "Lovely."'},
  orvas:{title:'The tears', adjunct:'Orvas goes east with his lance and the black tears on his face, and at night he looks back south-east, where the horsemen went in, and weeps for them, loudly, as is right.', south:'Orvas goes south with the long column, and does not say what he hopes to find, and weeps on the way, loudly, as is right.', home:'Orvas walks west with the Third, and at every halt he looks back south-east, where the horsemen went in, and weeps for them, loudly, as is right.',
    mem:'He saw horsemen go into the dust very far off as the light went, and put his hand over the black tears on his face.', warm:'"You weep for none of them," he tells you. "So I weep for you as well. It is no trouble."'},
  redblade:{title:'The red scale', adjunct:'Ramin goes east with the army in his red scale, very straight, and has stopped asking whether the Red Blades would approve.', south:'Ramin goes south with the long column, and the Letherii take his red scale for an officer\'s, and he does not correct them.', home:'Ramin walks west in his red scale, and does not say whether he means to go back to the Red Blades or to find out why he left.',
    mem:'He went hungry in the Wastes and called it discipline, and then, quieter, said that was what they told him.', warm:'"You did not run," he tells you. "I have served officers who did."'},
  warlock:{title:'The grandmother', adjunct:'Keth goes east, and the grandmother complains about the dust every day of it, out of his mouth, and once, on the stretch, said thank you.', south:'Keth goes south with the long column, and the grandmother says she likes the Letherii, who are polite to old women, even ones who live in boys.', home:'Keth walks west, and the grandmother says it is about time, out of his mouth, every morning.',
    mem:'"I starved once in a bad year," the grandmother said in the Wastes. "It is not interesting." Keth ate.', warm:'"*Good sergeant,*" the grandmother tells you, out of his mouth. "*For a foreigner.*"'},
  doss:{title:'The book', adjunct:'Doss goes east with the flail on his shoulder, further from the holding than any Indebted has walked, and nobody asks him what he owes.', south:'Doss goes south with the long column and the Letherii brigades, and some of them were Indebted too, and they talk about it at night, quietly, and laugh.', home:'Doss walks west with the Third, back toward Lether and the holding, and says he will walk past the factor\'s door without stopping, to see what it feels like.',
    mem:'On short rations he said the Indebted were hungry, and this was different: this was everybody.', warm:'"You never asked what I owed," he tells you. "Nobody ever didn\'t ask before."'},
  wenna:{title:'The sea', adjunct:'Wenna goes east, further from the sea than any Shake has gone, barefoot, and says there is sea in the east too. There is always sea.', south:'Wenna goes south with the long column, because the long way round must end at water somewhere, she says, and she is sure of it.', home:'Wenna walks west toward Lether and the river and the sea at the end of the river, and talks to the Shore every night of the walk.',
    mem:'She put her ear to the Wastes and heard water deep down, too deep for a spade.', warm:'"I\'ll tell the Shore about you," she tells you. "It listens."'},
  brask:{title:'Four names, and more', adjunct:'Brask goes east with the heavies\' line, doubled scale and the heavy sword over his shoulder, and the tally-stick in his belt has new notches now, and he does not file them flat.', south:'Brask goes south with the long column, a heavy among the Letherii, and stands in their front rank because nobody told him not to.', home:'Brask walks west with the Third and the tally-stick in his belt, and at the first well he files the old four notches clean and new, and keeps the rest.',
    mem:'In Letheras he answered to four names nobody called. In the Wastes he answered to the Third\'s.', warm:'"Heavies eat last," he tells you. "You ate last too. I noticed."'},
  tegra:{title:'The ground', adjunct:'Tegra goes east with the column as its guide, out ahead, reading the dry washes for water, and the captain pays her in water, which she says is fair.', south:'Tegra goes south with the long column, nearer the plains she knows, and does not go home to her clan, and is not asked why.', home:'Tegra walks west with the Third as far as the edge of the Wastes, and there she stops, and says the plains are that way, and goes.',
    mem:'She found water under the sand of a dry wash when the skins were empty, and did not pretend it was nothing.', warm:'"Among my people the dead watch," she tells you. "Among yours, you do. I have decided I prefer yours."'},
};
/* a page for a soldier of the Third who walks to the end */
B97FIN.fate = (id, key) => {
  key = B97FIN.key(key); if (id === 'sgt') return B97FIN.sgt(key);
  const t = B97FIN.T[id], nm = NAME(id);
  const tr = Object.entries(S.tricks || {}).filter(([k, v]) => v.who === id && TRICKS[k] && /^b9_/.test(k)).map(([k]) => `${b97Cap(b97He(id))} carries a trick out of Book Nine: ${TRICKS[k].name}.`)[0] || '';
  if (!t) return {title:TPL[id] ? TPL[id].role : '', txt:B97FIN.join([B97FIN.book(id), `${nm} ${key === 'home' ? 'walks west with the Third, time served' : key === 'south' ? 'goes south with the Third and the Letherii' : 'goes east with the Third'}.`])};
  return {title:t.title, txt:B97FIN.join([t[key], `${t.mem} ${B97FIN.book(id)}`, tr, B97FIN.loy(id, t.warm, `${nm} walks a little apart from you now, and you both know why.`, `${nm} walks with you as ${b97He(id)} has since Letheras.`)])};
};
/* a page for someone of the Third not walking at the end: the fallen (tonight's and before), a soldier waiting, a recruit sent away */
B97FIN.gone = (id, key) => {
  key = B97FIN.key(key);
  if (S.dead && S.dead[id]) { const d = S.dead[id];
    if (d.ch === 7 && !d.from) return {title:'Fallen', txt:B97FIN.join([
      `${NAME(id)} fell on the stretch between the cut bank and the burned wagons, late in the day, holding it while the column got away. Whoever fell there stayed down.`,
      `The heavies laid ${b97Him(id)} by the burning wagons with a cloak over ${b97Him(id)}, in a row with the heavies of the next files, and the Third walked back in step in the dark and could not take ${b97Him(id)} with it. That is what a rearguard is.`,
      `${B97FIN.book(id).replace(/On the night the short-tails came, .*$/, '').trim()} The Third said the name on the stretch, and on the retreat trail, and at every fire after. It is notched on the squad's roll, with a line across.`])};
    return {title:'Fallen', txt:B97FIN.join([`${NAME(id)} fell before this book${d.where ? `, at ${d.where}` : ''}, and did not come into the Wastes.`, `The Third carried the name out of Letheras and across the Wastes, and says it at night with the others.`])}; }
  const done = B9_DONE[id] ? S.f[B9_DONE[id]] : null, waits = (S.camp || []).includes(id) || done === 2;
  if (waits) return {label:'Waiting', title:B9_DONE[id] ? 'With the column' : 'With the heavies\' baggage', txt:`${NAME(id)} waited with ${B9_HOME[id] || 'the heavies\' baggage'} while six of the Third walked, and was with the column when the short-tails came, and walked off the plain with it. ${key === 'home' ? `${b97Cap(b97He(id))} walks west with the Third, time served.` : key === 'south' ? `${b97Cap(b97He(id))} goes south with the Third and the Letherii.` : `${b97Cap(b97He(id))} goes east with the Third, two companies back.`}`};
  if (done === 0) return {label:'Sent away', title:'Another road', txt:`${NAME(id)} went another way when the Third would not take ${b97Him(id)}. Word of the short-tails reached ${b97Him(id)} wherever that was, the way word does, a long time after.`};
  return null;
};
/* the Third's sergeant */
B97FIN.sgt = key => {
  const fell = b97Fell();
  return {title:'Third squad', txt:B97FIN.join([
    key === 'adjunct' ? 'You march east with the army, Third squad, 9th Legion, still with the heavies, at the back where the Third was put. When the Letherii ask what the rearguard was like, you tell them about a cut bank, and a line of burned wagons, and a corporal who gave you his last biscuit, and they do not understand, which is right.' :
    key === 'south' ? 'You go south with the Letherii and the long column, Third squad, 9th Legion, the heaviest thing in it. The Letherii sergeants ask what the rearguard was like, and you tell them about a cut bank and a line of burned wagons, and they write it down in their ration book, which is the Letherii way of saying they believe you.' :
    'You walk west with what is left of the Third, time served. Somewhere in a captain\'s clerk\'s box there is a slate with your names on it and the word <em>home</em>. At night, at the fire, you count, out of habit, and check it.',
    `${B97FIN.book('sgt')} ${fell.length ? `It cost ${b97And(fell.map(NAME))}.` : 'Everybody who stood on the stretch with you walked off it.'}`,
    trickBy('b9_c7_low') === 'sgt' ? 'You know how to fight them low. You hope you never have to again.' : '',
    S.f.sgtScar ? 'There is a scar on your cheek from the stretch. You do not look at it.' : ''])};
};

/* ---- the Letherii's pages: Chapter 6's B9CH6.fates (read defensively; from S.th.l), and a short fallback here if it is missing ---- */
const b97LHalf = () => (S && S.th && S.th.l) || null;
B97FIN.lethFates = () => { try { const F = typeof B9CH6 !== 'undefined' && B9CH6 && B9CH6.fates; return F && typeof F.pages === 'function' ? F : null; } catch(e) { return null; } };
B97FIN.lethRoad = () => { const r = b97LRoad(), h = b97LHalf(), k = b97LKey();
  return {title:{escort:'With the Commander', adjunct:'East, with the foreigners', home:'Home to Lether'}[r], scene:{escort:'b9_c6_dusk', adjunct:'b9_column', home:'b9_wagons'}[r],
    paras:[
      r === 'escort' ? 'The Sixth Company stayed with the Commander\'s brigades, and goes where he takes them.' : r === 'adjunct' ? 'The Sixth Company went on east with the foreigners, into country nobody in Lether has a legend for.' : 'The Sixth Company went home to Lether when there was a way home.',
      k === 'train' ? 'On the battle\'s day it held the supply wagons at the back of the line all afternoon, with the short-tails come round in the dust, and the wagons came through.' : 'On the battle\'s day it held its stretch of the line from the cairn to the dry wash, all day, and pulled back in step at dusk.',
      h && h.name ? `Sergeant ${h.name}, Sixth Company, the Whitefinder Battalion. Rations, at the end: ${B97FIN.rat(h)}.` : '',
      r === 'home' ? 'There is no road onward from here for the Sixth.' : 'The Sixth\'s road goes on: Book Ten, when it is written, will offer this save.'].filter(Boolean)}; };
B97FIN.lethPages = () => { const h = b97LHalf(); if (!h) return []; const F = B97FIN.lethFates(), r = b97LRoad(), dead = h.dead || {};
  const ttl = pg => pg.id === 'sgt' ? 'The Sixth\'s sergeant' : pg.k === 'gone' ? 'Fallen' : pg.label === 'Waiting' ? 'Waiting' : {escort:'With the brigades', adjunct:'East', home:'Home'}[r];
  let P = [];
  try { if (F) { const Q = F.pages(); if (Array.isArray(Q)) P = Q.map(pg => Object.assign({}, pg, {title:ttl(pg), loy:(h.loy && h.loy[pg.id]) || 0})); } } catch(e) { console.warn('finale', e); P = []; }
  /* the Sixth's sergeant gets the stretch or the wagons, and the dead, after Chapter 6's line */
  P = P.map(pg => pg.id !== 'sgt' ? pg : Object.assign({}, pg, {txt:B97FIN.join([pg.txt, b97LKey() === 'train' ? 'On the battle\'s day you held the supply wagons at the back of the line, and the wagons came through.' : 'On the battle\'s day you held the stretch from the cairn to the dry wash, and brought the Sixth back up the rise in step.',
    Object.keys(dead).filter(id => TPL[id]).length ? `You say the names at the fire: ${b97And(Object.keys(dead).filter(id => TPL[id]).map(id => TPL[id].name))}.` : 'Every one of the Sixth who came out of Lether is still walking.'])}));
  if (!P.length) { const walking = (h.squad || []).filter(id => id !== 'sgt' && TPL[id] && !dead[id]);
    P = [...walking.map(id => ({id, k:'fate', label:'The Sixth', title:ttl({id}), txt:`${TPL[id].name} came off the Wastes with the Sixth.`, loy:(h.loy && h.loy[id]) || 0})),
      {id:'sgt', k:'fate', label:'The sergeant', title:'The Sixth\'s sergeant', txt:'You came off the Wastes at the head of the Sixth.', loy:0, name:h.name || ''}]; }
  /* the Sixth's fallen from before this book (Chapter 6's pages leave them out): before the sergeant */
  const before = Object.keys(dead).filter(id => id !== 'sgt' && TPL[id] && dead[id].from && !P.some(p => p.id === id))
    .map(id => ({id, k:'gone', label:'The fallen', title:'Fallen', txt:`${TPL[id].name} fell before this book${dead[id].where ? `, at ${dead[id].where}` : ''}, and did not come out of Lether with the Sixth. The squad said the name at the fire on the rise.`}));
  const si = P.findIndex(p => p.id === 'sgt'); if (si < 0) P.push(...before); else P.splice(si, 0, ...before);
  return P; };
/* where the books meet */
B97FIN.meet = () => [
`Book Nine ran beside *Dust of Dreams*, after Book Seven, east out of Letheras into the Wastes. The Third came into it from Book Seven's road with the Adjunct; the Sixth Company from Book Seven's road with the army of the new Lether. They marched in the same column, a day's dust apart, and stood in the same battle on different ground, and never met, and never crossed a blade.`,
`Lether is behind them now, and the Wastes are country no earlier book walked. Book Eight's Fourth is on a ship toward the Malazans abroad, and has not reached them yet.`,
`The roads go on from a plain in the Wastes nobody has named: east, south, or home. Whatever comes after, for whoever went, it starts there.`];

/* the coda: both squads, the stretch, the line, the dark */
B97FIN.coda = key => { const fell = b97Fell(), h = b97LHalf(), lDead = h ? Object.keys(h.dead || {}).filter(id => h.dead[id] && !h.dead[id].from && h.dead[id].ch === 6 && TPL[id]) : [];
  return [
`The army marched east out of Letheras without being told why, into the Wastes, on a ration that got shorter. It caught a fever on the road and boiled its water. It found the Wastes empty of nearly everything. Then, one morning, there was dust on the horizon that was not a storm, and the short-tails came out of it. The marines and the heavies held while the regulars broke. The Fist died. The High Mage went missing. The Adjunct was carried off the field. Horsemen went into the dust at dusk, and fewer came back. The army walked away in the dark, and kept walking.`,
`The Third was there, on a stretch of the heavies' rearguard between a cut bank and a line of burned wagons. ${fell.length ? `${b97And(fell.map(NAME))} did not walk off it.` : 'Every one of the Third who stood on it walked off it.'} The Sixth was there too, on the escort's stretch from the cairn to the dry wash. ${lDead.length ? `${b97And(lDead.map(NAME))} did not come off it.` : 'Every one of the Sixth came off it.'} That is each squad's part. It is small. It is the only part anybody will tell right.`,
`Rations at the end: the Third ${B97FIN.rat(S)}; the Sixth ${h ? B97FIN.rat(h) : 'not counted'}. ${b97Mates().length ? 'The Third counts itself, and gets the number, and checks it.' : 'The sergeant counts, and gets one, and checks it.'}`]; };

B9CH7.finale = {
  ids:()=>[...new Set(['haddat', 'sathi', 'tangle', 'marrow', 'mirrel', 'mehet', 'ottar', 'tallow', 'hessa', 'tebbet', 'darrut', 'yorin', 'rasp', 'orvas', 'redblade', 'warlock', 'doss', 'wenna', 'brask', 'tegra',
    ...Object.keys((S && S.dead) || {}), ...((S && S.camp) || [])].filter(id => id !== 'sgt' && TPL[id]))],
  labels:{epi:'Epilogue', squad:'The Third', fallen:'The fallen', away:'Not on the march', sgtRole:'Sergeant · Third squad, with the heavies', road:'The road', prologue:false,
    list:()=>['The roll', `${Object.keys((S && S.dead) || {}).length + (b97LHalf() ? Object.keys(b97LHalf().dead || {}).length : 0)} names, both squads`], noDead:'None of the Third. Every one of them walked off the stretch.', paper:false,
    endline:'The End of <em>Dust on the Boots</em>',
    credit:'The Malazan world was created by Steven Erikson and Ian C. Esslemont, and it and its canon characters belong to them. With thanks to Steven Erikson for Dust of Dreams, the march into the Wastes, the short rations and the night the short-tails came, and to Ian C. Esslemont for the world they built together; the Third and the Sixth only walked beside it.'},
  endings:{ get adjunct(){ return B97FIN.ending('adjunct'); }, get south(){ return B97FIN.ending('south'); }, get home(){ return B97FIN.ending('home'); } },
  fate:(id, key)=>B97FIN.fate(id, key),
  gone:(id, key)=>B97FIN.gone(id, key),
  coda:(key)=>B97FIN.coda(key) };

/* ---- the finale for two squads (Book Nine only, guarded by b9On): 37's pages, with the Letherii's road, their pages and Where the books
   meet put in before the end. The extra page kinds are drawn here in 37's shape (the same buttons, so the swipe, the keys and the bot all
   work). Book Seven's 127 does the same for b7On(). An engine change in this file only. ---- */
{ const _fp = finPages, _sf = showFinale;
  const mine = k => /^b97/.test(k);
  finPages = function(){ const P = _fp(); if (!b9On()) return P;
    let add = []; try { const L = B97FIN.lethPages(); if (b97LHalf()) add = [{k:'b97road'}, ...L.map(pg => ({k:'b97leth', id:pg.id, pg}))]; } catch(e) { console.warn('finale', e); add = []; }
    add.push({k:'b97meet'}); P.splice(P.length - 1, 0, ...add); return P; };
  /* the Letherii sergeant's portrait: painted once in Book Five's look (S.thread 'l'), then lent to 19's cache for each frame */
  let b97SgtL = null;
  const sgtLLayer = () => { const key = `sgt|400x520|${portraitState('sgt')}|${BOOK}`, was = S.thread;
    try { b9SgtFor('l'); S.thread = 'l'; PORTRAIT_CACHE.delete(key); const cv = document.createElement('canvas'); cv.width = 400; cv.height = 520; drawPortrait(cv.getContext('2d'), 'sgt', 400, 520, 0); b97SgtL = PORTRAIT_CACHE.get(key) || null; PORTRAIT_CACHE.delete(key); }
    finally { S.thread = was; b9SgtFor(b9Thread()); } return key; };
  showFinale = function(i = 0){ if (!b9On()) return _sf(i);
    const P = finPages(); i = clamp(i | 0, 0, P.length - 1); const pg = P[i]; if (!mine(pg.k)) return _sf(i);
    S.scene = 'finale'; S.finPage = i; S.node = null; save();
    view = 'finale'; $('#sheet').hidden = true; B = null; titleAnim = null; finAnim = null; AUDIO.setScene('end');
    let body = '';
    if (pg.k === 'b97road') { const R = B97FIN.lethRoad(); G.sceneKind = SCENES[R.scene] ? R.scene : 'b9_wagons';
      body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">The Sixth Company</div><h1 class="fin-title">${esc(R.title)}</h1><div class="narr">${R.paras.map(p => fmt(p)).join('')}</div>`; }
    else if (pg.k === 'b97meet') { G.sceneKind = 'b9_retreat';
      body = `<div class="scene"><canvas id="scv" width="560" height="240"></canvas></div><div class="fin-k">Where the books meet</div><h1 class="fin-title">Into the Wastes</h1><div class="narr">${B97FIN.meet().map(p => fmt(p)).join('')}</div>${typeof worldSVG === 'function' ? `<div class="gloss meet">${(() => { try { return worldSVG('dod'); } catch(e) { return ''; } })()}</div>` : ''}`; }
    else { const L = pg.pg || {}, id = pg.id, sgt = id === 'sgt', gone = L.k === 'gone', h = b97LHalf() || {};
      const nm = sgt ? (L.name || h.name || 'The sergeant') : (TPL[id] ? TPL[id].name : id), role = sgt ? 'Sergeant · Sixth Company, the Whitefinder Battalion' : (TPL[id] ? TPL[id].role : '');
      const where = gone && h.dead && h.dead[id] ? [h.dead[id].where, h.dead[id].from ? '' : (h.dead[id].ch ? `Chapter ${h.dead[id].ch}` : '')].filter(Boolean).join(' · ') : '';
      if (sgt) sgtLLayer();
      body = `<div class="fin-k">${sgt ? 'The Sixth\'s sergeant' : gone ? 'The Sixth · the fallen' : L.label === 'Waiting' ? 'The Sixth · waiting' : 'The Sixth'}</div>
      <div class="fin-card"><div class="fin-por ${gone ? 'gone' : ''}"><canvas id="fpc" width="400" height="520" aria-hidden="true"></canvas>${gone ? '<span class="fin-mark">†</span>' : ''}</div>
        <div class="fin-who"><h2>${esc(nm)}</h2><div class="r">${esc(role)}</div>${sgt ? '' : gone ? (where ? `<div class="pips">${esc(where)}</div>` : '') : `<div class="pips">${loyLabel(L.loy || 0)}</div>`}</div></div>
      <h3 class="fin-h">${esc(L.title || '')}</h3><div class="narr fin-txt">${fmt(L.txt || '')}</div>`;
      finAnim = t => { const cv = $('#fpc'); if (!cv) { finAnim = null; return; }
        if (sgt && b97SgtL) { const key = `sgt|400x520|${portraitState('sgt')}|${BOOK}`, own = PORTRAIT_CACHE.get(key); PORTRAIT_CACHE.set(key, b97SgtL); try { drawPortrait(cv.getContext('2d'), 'sgt', 400, 520, t); } finally { if (own) PORTRAIT_CACHE.set(key, own); else PORTRAIT_CACHE.delete(key); } }
        else drawPortrait(cv.getContext('2d'), id, 400, 520, t); }; }
    toTop(); $('#app').innerHTML = `<div class="fin" id="fin">${body}
    <div class="fin-nav"><button class="btn" id="fBack">Back</button><span class="fin-pg">${i + 1} / ${P.length}</span><button class="btn primary" id="fNext">Next</button></div></div>`;
    window.scrollTo(0, 0);
    $('#fBack').onclick = () => { AUDIO.play('click'); finGo(-1); };
    $('#fNext').onclick = () => { AUDIO.play('click'); finGo(1); };
    let sx = null, sy = null; const el = $('#fin'); el.ontouchstart = e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    el.ontouchend = e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null; if (Math.abs(dx) > 70 && Math.abs(dy) < 50) { AUDIO.play('flip'); finGo(dx < 0 ? 1 : -1); } }; }; }

/* the onward roads: a finished Book Nine save is the one Book Ten may import (no import is written yet). The Third goes on on 'adjunct' or
   'south'; the Sixth on 'escort' or 'adjunct' (S.f.b9_lethRoad, 'escort' by default). b97Onward is true when either squad goes on. */
const b97OnwardT = s => !!(s && s.book === 'dod' && s.chapters && ['adjunct', 'south'].includes(s.chapters[7]));
const b97OnwardL = s => !!(s && s.book === 'dod' && s.chapters && s.chapters[7] != null && ['escort', 'adjunct'].includes((s.f && s.f.b9_lethRoad) || 'escort'));
const b97Onward = s => b97OnwardT(s) || b97OnwardL(s);
