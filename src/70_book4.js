/* ============ Book Four: Unblooded (beside House of Chains) — Book Two's squad in the Fourteenth, Nerve and Dust ============ */
/* Book Four is Book Two's squad again, the year after the Chain: broken up into the Adjunct's Fourteenth Army as canon does with every unit
   of Chain survivors, serving as medium infantry in Blistig's 9th Legion, from Aren north to Raraku. Its chapters register with
   registerChapter(n, B4CHn, 'hoc') (90) and every id carries a b4_ prefix (areas, nodes, fights, foes, gear, scenes, tricks, flags S.f.b4_*).
   This file holds what the book needs outside a chapter: the Book Two four's lives a few months on (swapped in and out by setBook), the four
   new soldiers of the Fourteenth who fill the squad to five, the three recruits (Ramin, Keth, Orvas), Nerve and Dust, the company
   regulars who come when the company is steady, the transfer of a finished Book Two save, the glossary, the gods, the journal and Deeds.
   Everything here is guarded by S.book === 'hoc' (or BOOK === 'hoc'); Books One to Three play exactly as before.
   The names a chapter writer uses are listed in docs/v7.0-notes.md, "For chapter writers". */

const HOC_CORE = ['haddat', 'sathi', 'tangle', 'marrow'];      // Book Two's four: whoever lived keeps a place, in this order
const HOC_NEW = ['tallow', 'hessa', 'tebbet', 'darrut'];       // the Fourteenth fills the squad back to five from these, in this order
const B4_RECRUITS = ['redblade', 'warlock', 'orvas'];          // one at a time, swapped at a fire
const b4On = () => !!(S && S.book === 'hoc');
const b4In = id => !!(S && Array.isArray(S.squad) && S.squad.includes(id) && !(S.dead && S.dead[id]));
/* the Book Two save a Book Four game was carried from: b4Was(k) reads one of its flags (undefined on a fresh start) */
const b4Was = k => (S && S.imported && S.imported.f) ? S.imported.f[k] : undefined;
/* who Book Two left at the Barrow: the transfer's dead, or on a fresh start the canon of the plan (Sathi fell; Hackle was not seen again) */
const b4Fallen = () => S && S.imported && Array.isArray(S.imported.dead) ? S.imported.dead.filter(id => TPL[id]) : ['sathi'];
const b4FallenNames = () => { const n = b4Fallen().map(id => TPL[id].name); return n.length > 1 ? n.slice(0, -1).join(', ') + ' and ' + n[n.length - 1] : n[0] || ''; };
const b4Fresh = () => !(S && S.imported);

/* ---- the sergeant in Book Four: Book Two's sergeant, a year on, in the 9th ---- */
BOOKSNAP.hoc.sgt = Object.getOwnPropertyDescriptors({
  name:'', role:'Sergeant', sig:'S', col:'#d6a24a', hp:22, ac:14, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, st:{might:2, wits:2, guile:1}, ab:['rally','shove','salve'],
  epithet:'Third squad, 9th Legion, the Fourteenth Army', origin:'Jakata, Quon Tali', age:37, service:'Fifteen years, the last seven in Seven Cities, and the Chain', height:'Middling, and burnt darker by a summer on the Aren Way.',
  weapon:'Malazan longsword, and the shield that has had three regiments painted on it and now has a fourth', armour:'Boiled leather over quilting, the sand scarf, and a finger bone on a thong, because the whole legion wears one',
  bio:`Walked the Chain of Dogs from Hissar to Aren and came in through the gate with what was left. The army that took the survivors in did not keep them together. It broke them up and dealt them out across three new legions like cards, so the recruits would have someone to copy. You were dealt to Blistig's 9th.`,
  get bio2(){ const f = b4Fallen();
    return `Kept the squad's number, and very little else from the Seventh except the habits. ${f.length ? `${b4FallenNames()} stayed on the Barrow. You still count ${f.length > 1 ? 'them' : TPL[f[0]] && ['tangle', 'redblade', 'warlock'].includes(f[0]) ? 'him' : 'her'} at the end of the roll, out loud, and the recruits have learned not to ask.` : 'Every one of them came off the Chain, which the 9th thinks is a story and is not.'}\n\nRessan's brass token is still on its cord. The Fourteenth has never fought. You have, and you are to teach them in the time it takes to walk to Raraku.`; },
  traits:['Speaks gutter Hissari better than the officers speak Malazan', 'Drinks water slowly, always', 'Counts the column, still, though nobody asked', 'Will not sit on a horse unless ordered'],
  gear:['Ressan\'s brass token, worn smooth', 'The squad roll, with new names under the old ones', 'Field kit: needle, thread, salt'],
  get quest(){ return `The Fourteenth is green. Half of it came off the transports from Quon Tali and has never heard a sword drawn in anger. The Adjunct marches it north anyway, to Raraku and the Whirlwind, and somewhere in it is your squad, which has to be ready first.`; },
});

/* ---- Book Two's four, a few months on, in the Fourteenth: these fields swap in when the book is Book Four, and Book Two's come back
   when it isn't (stats, abilities, portraits, sprites, traits and gear stay Book Two's: the same soldiers) ---- */
const B4_FIELDS = ['epithet', 'service', 'bio2', 'quest', 'banter', 'rel'];
const B4REL_NEW = { // how the new soldiers sit with each of Book Two's: merged into each overlay's rel
  haddat:{tallow:'Makes him stand behind the shield in drill until he stops flinching. He has nearly stopped.', hessa:'Two women who keep their gods to themselves. They pray at the same hour, apart, and nod after.', tebbet:'Asks him what he sees from the back. He tells her. She believes him, which surprised him.', darrut:'He was on Aren\'s wall the day she came in under it. Neither has brought it up.', orvas:'Speaks to him in a tribal tongue of the Odhan, badly. He answers in Malazan, worse. They both find it restful.'},
  sathi:{tallow:'Calls him "the foal". He has decided it is a compliment. It is, nearly.', hessa:'Asked if D\'rek eats people. Hessa said "Eventually." Sathi liked that very much.', tebbet:'Shoots against him every evening for a strip of dried meat. They are even, which neither will admit.', darrut:'Hackle growled at him on the first day and has not since. Sathi counts this in his favour.', orvas:'A Weasel and a Burned Tear. They agree about horses and about nothing else, loudly.'},
  tangle:{tallow:'Lets him count the satchel once, as a privilege. Tallow got it right. Tangle counted it again.', hessa:'She asked what was in the clay. He told her. She stood further off, which he respects.', tebbet:'Two men who would rather do it from a distance. They get on.', darrut:'Darrut asked if a cusser could take down a wall. Tangle asked which wall. They have not resolved it.', orvas:'Keeps the satchel on the side away from the horse. "Nothing personal. Horses kick."'},
  marrow:{tallow:'Watches him read the old woman\'s deck with her mouth shut, which for Marrow is a kind of review.', hessa:'Talks warrens with her: Denul, and whatever it is D\'rek does instead. Neither has convinced the other.', tebbet:'Stitched his bow hand after drill. He thanked her in Dal Honese, at length.', darrut:'He comes to her with every blister. She has started to suspect he likes the company.', orvas:'Asked about the tears on his face, once. He said, "They are the reason." She let it be.'},
};
BOOKSNAP.hoc.tpl = {
  haddat:Object.getOwnPropertyDescriptors({
    epithet:'"The Empire\'s silver. Still."', service:'Eight years, auxiliary, and a few months in the 9th',
    get bio2(){ const il = b4Was('b2_ilhar');
      return `Her family sold water in Hissar, and Hissar is ash. She came off the Chain into Aren with the squad and the Fourteenth took her in, and she has put the 9th's badge beside the auxiliary's brass and polishes both every night.\n\n${il === 'came' ? `Ilhar came over to the column before the end. He is somewhere in Aren now, selling water the old way, and she goes to see him when there is leave, and comes back quiet.` : il === 'fell' ? `Ilhar is dead. She has said his name aloud once since, to the sergeant, and has gone back to not saying it.` : il === 'lost' ? `Her brother rode with the green cloths and she lost him somewhere on the Chain. She does not know where he is. She has stopped looking at faces. Nearly.` : il === 'parted' ? `Ilhar went back north to Dom at the end, alive, with the family's skins on his back. She does not know where he is now. She has a good idea, and does not like it.` : b4Fresh() ? `She has not said her brother's name since Hissar.` : `She does not say her brother's name often.`}`; },
    get quest(){ return `The Fourteenth marches north for Raraku, where the green cloths came from. Haddat walks at the front of the squad with the shield up, and at every halt she teaches the recruits the five words in Hissari that mean "water", "well", "poisoned", "enough" and "run".`; },
    banter:[`"Sergeant." In Hissari still. The recruits have started saying it too, wrongly.`, `"The new ones lock shields like a gate with no hinges. We will fix it before the hills."`, `"Drink. Then drink again. The desert does not care that you are from Quon Tali."`],
    rel:Object.assign({sathi:'Answers the girl\'s Wickan insults in Wickan. The recruits think they are fighting.', tangle:'Still pays him in water for a riot in Hissar. He has stopped pretending to mind.', marrow:'Carries the healer\'s kit at the end of a march. Has still never been thanked, and prefers it.', redblade:'Two Seven Cities soldiers who took the silver. They are polite about it in two languages, and now in a third.', warlock:'Asks the boy whether the Chain\'s dead are resting. He says some of them are.'}, B4REL_NEW.haddat)}),
  sathi:Object.getOwnPropertyDescriptors({
    epithet:'"Hackle remembers this road. So do I."', service:'One summer with the Seventh, and the season after with the Fourteenth',
    get bio2(){ return `The Weasel Clan sent its young south with Coltaine. Most of them did not come back from the Chain, and the clan that sent them is scattered. Sathi rides with a Malazan legion now because it is the nearest thing to a herd she has left, and says so, loudly, to anyone who looks at her as if she should be with the Wickans.${b4Was('b2_hackleBack') ? ' Hackle found his way home along the Way once already. He does not let her out of his sight now.' : ''}\n\nThe Crow elders came off the ships in Aren and will not take orders from a boy. She has opinions about the Crow elders. Most of them are about horses.`; },
    get quest(){ return `The road north goes back past Coltaine's Fall. Sathi has not said she will climb it. She has asked Hackle, in Wickan, what he thinks, and Hackle has gone to sleep on her feet.`; },
    banter:[`"Your recruits walk like cows, Sergeant. Hackle agrees." Hackle is asleep.`, `"The Crow elders say a boy cannot lead them. The Weasels say the Crow cannot count. We are both right."`, `"Lowlanders. You have brought a whole army to a desert and forgotten the horses."`],
    rel:Object.assign({haddat:'A fine soldier and a bad Hissari, she tells the recruits, in Wickan, where Haddat can hear.', tangle:'Lets Hackle sleep on his feet. He has stopped pretending not to notice.', marrow:'Still "foal". Sathi has stopped arguing, which Marrow counts as growing up.', redblade:'"The red horse with no horse." Still a rank.', warlock:'Foolish Dog and Weasel: the insults go on, in Wickan, with real affection.'}, B4REL_NEW.sathi)}),
  tangle:Object.getOwnPropertyDescriptors({
    epithet:'Fuse-cord round both wrists. Counts the new satchel twice.', service:'Eleven years, sapper, and the Chain',
    get bio2(){ return `Mincer's sappers came off the Chain fewer than they went on, and the Fourteenth dealt what was left of them out like the rest. Tangle went with the squad, because, he says, the squad knows where to stand when he lights something.\n\nThere are Moranth munitions in Aren again, in the Fourteenth's wagons, under guard. Tangle has counted the guards. He hums the same four notes over the satchel, and stops when it matters, and the recruits have started to listen for the stop as well.`; },
    get quest(){ return `The satchel is not the only one on the march any more, and Tangle does not trust that. Somewhere in the 8th, people say, there is a sapper who is very good indeed and would rather nobody knew it. Tangle would like to see his fuse-work, and has decided not to go looking.`; },
    banter:[`"Same as this morning. Don't make me say it at the next halt."`, `"The recruits want to hold a sharper. Nobody holds a sharper. You throw a sharper, or you're the sharper."`, `"Point. I'll make it go away. Just not in the column, please."`],
    rel:Object.assign({sathi:'Lets the dog sleep on his feet.', haddat:'Owes her his life from Hissar. Pays in water, still.', marrow:'She stitched his ear on the Chain. He still hears it.', redblade:'Counts the satchel with Ramin, out loud, to help.', warlock:'Upwind. "Nothing personal."'}, B4REL_NEW.tangle)}),
  marrow:Object.getOwnPropertyDescriptors({
    epithet:'"The warren is still strange. So am I."', service:'Thirteen years, ten of them a squad healer',
    get bio2(){ return `Trained at a temple of Soliel in Nap, left it for the army, and kept the squad alive from Hissar to Aren with a warren that gave back mud. It still does, some days. The knotted string is on its third length.\n\nNil and Nether walk with the Wickan children now, and the camp says their spirits have gone quiet. Marrow has looked at them across the horse lines and said, "That is grief, child, not sorcery," and gone back to her needles.`; },
    get quest(){ return `Denul is thinner this side of Aren, and thick and wrong near the desert, as if something were standing in it at a distance and breathing. Marrow keeps the string. She reads the Deck for the squad at the first halt of every road, as she always has, and lately she holds each card a moment before she turns it.`; },
    banter:[`"Sit. No, sit. Raraku will still be there, child."`, `"The recruits bleed like they're surprised. They'll learn."`, `"Soliel answers when she likes. The Adjunct, I'm told, the same."`],
    rel:Object.assign({sathi:'Still "foal".', tangle:'Still checks the ear.', haddat:'Leans on her at the end of a march.', redblade:'Asked nothing about the company. He has decided she is still the only Malazan in the squad.', warlock:'Talks shop with the old woman in him, healer to witch.'}, B4REL_NEW.marrow)}),
  /* Ramin and Keth keep their Book Two templates; their road and their relations move on (a Book Two transfer can bring them) */
  redblade:Object.getOwnPropertyDescriptors({
    get quest(){ return `The Red Blades are out of the cells and the company rides for the Adjunct under its own command, with Tene Baralta. Ramin has a horse again. He has asked to be lent to the squad again, and his captain, who does not understand it, has said yes.`; },
    rel:{haddat:'Another Seven Cities soldier who took the silver.', sathi:'"The red horse with no horse," she still says. He has a horse now. She has not changed it.', tangle:'Counts the satchel with him, out loud.', marrow:'The only Malazan in the squad, he says. He has started to include the sergeant, on good days.', tallow:'Shows him how to keep a blade the way the Red Blades do. Tallow has never kept anything that carefully.', hessa:'They speak of temples and companies, and find they mean the same thing.', tebbet:'Two straight backs. They stand together at drill without discussing it.', darrut:'Darrut was Aren Guard. Ramin was in Aren\'s cells. They are working round it.', orvas:'Rides beside him on the march and talks horses. It is the happiest anyone has seen him.'}}),
  warlock:Object.getOwnPropertyDescriptors({
    get quest(){ return `Keth rides with Temul's Wickan youths, the ones who came through the Chain, and the old woman in him keeps them in line. The Crow who came by ship will not follow a boy. The grandmother has views on the Crow. She shares them.`; },
    rel:{haddat:'Asks him about the Chain\'s dead every morning.', sathi:'Weasel and Foolish Dog: the insults go on.', tangle:'Keeps upwind of him.', marrow:'The only one the grandmother respects.', tallow:'The grandmother looked at Tallow\'s cards and laughed for a long breath. Tallow has not asked why.', hessa:'The old woman and the temple guard: two women who have met a god, and are not impressed.', tebbet:'Tebbet makes the sign against the evil eye when the old voice speaks. The grandmother makes a ruder one back.', darrut:'Darrut is frightened of him and hides it well. The boy is grateful.', orvas:'The Khundryl grieve their own dead. Keth carries his. They sit together some nights without speaking.'}}),
};
/* Book Two's own descriptors for those fields, kept at load (TPL here is still Book Two's) so setBook can put them back exactly */
const B4_TWO = Object.fromEntries(Object.keys(BOOKSNAP.hoc.tpl).map(id => [id, Object.fromEntries(Object.keys(BOOKSNAP.hoc.tpl[id]).map(k => [k, Object.getOwnPropertyDescriptor(TPL[id], k)]))]));
function b4Wear(on){ Object.entries(on ? BOOKSNAP.hoc.tpl : B4_TWO).forEach(([id, ds]) => { const t = TPL[id]; if (!t) return;
  Object.entries(ds).forEach(([k, d]) => { if (k === 'name' || k === 'length' || k === 'prototype') return; if (d) Object.defineProperty(t, k, Object.assign({}, d, {configurable:true})); else delete t[k]; }); }); }
{ const _setBook = setBook;
  setBook = function(b){ const from = BOOK; _setBook(b); if (BOOK === from) return;
    if (from === 'hoc') b4Wear(false); if (BOOK === 'hoc') b4Wear(true); }; }

/* ---- the four new soldiers of the Fourteenth, and Orvas of the Burned Tears ---- */
Object.assign(TPL, {
  tallow:{name:'Tallow', role:'Raw recruit · Quon Tali', sig:'L', col:'#c9b27a', hp:17, ac:13, atk:3, dmg:[1,8,1], rng:1, mv:4, init:1, st:{might:1, wits:1, guile:2}, ab:['shove','salve'],
    epithet:'"My grandmother read for fishermen. They mostly came back."', origin:'A fishing village on the Quon coast', age:18, service:'Four months, three of them on a transport', height:'Tall for his age and not used to it yet.',
    weapon:'A short sword still bright from the armoury, and a spear he was told to carry', armour:'New boiled leather that creaks, a helm a size too big, and a finger bone on a thong like everyone else',
    bio:`One of the half of the Fourteenth that came off the transports from Quon Tali and had never seen a desert or a dead man. He has seen both now, on the Aren Way, and is trying to look as if he had seen them before. It fools no one. The squad is kind about it, as soldiers are kind: loudly, and at his expense.`,
    bio2:`His grandmother read the Deck for the boats on the Quon coast, by the light of the gutting-shed, for fish heads and gossip. When she died the deck came to him in a square of oilcloth, the paint worn off the corners by sixty years of thumbs. He reads it the way she taught him, badly, and sometimes it is right, and that frightens him more than when it is wrong.`,
    traits:['Salutes everyone, to be safe', 'Writes home and never sends it', 'Keeps the grandmother\'s deck in oilcloth inside his shirt', 'Laughs half a beat after the veterans, to check it was a joke'],
    gear:['His grandmother\'s deck, in oilcloth', 'A letter home, unfinished, in its fourth month', 'A finger bone from the old Aren graveyard, on a thong'],
    get quest(){ return b4In('marrow') ? `Marrow reads for the squad. She watched him lay the old woman's cards out once, at night, and told him afterwards which of them his grandmother had got wrong. He has decided to learn from her before the desert, while there is time.` : `With no healer to read for the squad, the squad has started asking him. He did not want it. He reads anyway, the way his grandmother did, for whoever sits down, and hopes the cards know more than he does.`; },
    banter:[`"Sergeant." A pause. "Was that right? The salute?"`, `"My grandmother said Oponn gives with one hand. She never said what the other one was doing."`, `"I counted the bones on the standard. It made me feel worse. I'm going to stop counting things."`],
    rel:{haddat:'She makes him stand behind the shield until he stops flinching. He has nearly stopped.', sathi:'"The foal." He has decided it is a compliment.', tangle:'Let him count the satchel once. He got it right. It was the proudest moment of his life.', marrow:'He watches her read and copies her hands. She knows. She lets him.', hessa:'She is the first temple guard he has ever spoken to. He keeps calling her "sister" by accident.', tebbet:'Tebbet is teaching him the bow in the evenings. He is not good at it.', darrut:'Darrut tells him the Aren Guard stories. Tallow believes nearly all of them.', orvas:'He has never seen a horse go like that. He tells Orvas so, every day, and Orvas lets him.', redblade:'Ramin showed him how to keep a blade clean. He keeps it cleaner than anything he owns.', warlock:'The grandmother in Keth laughed at his cards. He has not asked why.'}},
  hessa:{name:'Hessa', role:'Spear and shield · Kartool', sig:'E', col:'#8a9a6a', hp:22, ac:15, atk:4, dmg:[1,8,2], rng:1, mv:4, init:0, st:{might:2, wits:1, guile:0}, ab:['bash','salve'],
    epithet:'"D\'rek is patient. I am not, which is why I left."', origin:'Kartool City', age:31, service:'Six years at the temple doors, and a year in the Malazan ranks', height:'Square, heavy in the shoulder, and stands as still as a door.',
    weapon:'A long-bladed temple spear, and a tall shield with a worm carved into the rim and painted over', armour:'Malazan scale over a temple guard\'s padded coat, and the Worm\'s mark inked on the inside of her left wrist',
    bio:`Stood the doors of D'rek's Grand Temple in Kartool City for six years with a spear and a shield, while the priests inside did whatever the Worm of Autumn asks for. She does not say why she left. She signed on with the Malazans in the same week, which she says is a coincidence, and the 9th took her because she could already hold a line and nobody else in her intake could.`,
    bio2:`The temple taught her that every living thing rots, and that rot is not an insult. It is the floor of the world. She is calm about it in a way the recruits find hard to stand next to. She prays at dusk, to the ground, very briefly, and then eats like someone who expects to be busy tomorrow.`,
    traits:['Prays at dusk, to the ground, briefly', 'Will not step on a worm, and moves them off the road', 'Says "eventually" when asked anything about death', 'Sharpens the spear while she talks, by feel'],
    gear:['A temple guard\'s seal, worn on a cord under the scale', 'A twist of grave-dirt from Kartool', 'A whetstone she has had since she was twelve'],
    get quest(){ return `The temple asked something of her that she would not give, and she walked out of its doors and into the Empire's. Kartool is a long way behind. The Worm is not, she says. The Worm is under every road. She is waiting to learn whether it is waiting for her.`; },
    banter:[`"Shields together. Together. You are a wall, not a row of doors."`, `"Everything rots, Sergeant. That is not a complaint. It is how the ground is made."`, `"In the temple we had a word for recruits like ours. I will not say it in front of them."`],
    rel:{haddat:'Two women who keep their gods to themselves. They nod after prayers.', sathi:'Sathi asked if D\'rek eats people. "Eventually." They have been friends since.', tangle:'Asked what is in the clay, and then stood further off. He respects her for it.', marrow:'They argue warrens over the fire, gently, and enjoy it.', tallow:'He keeps calling her "sister". She has stopped correcting him.', tebbet:'Tebbet shoots past her shoulder in drill. She has never once flinched. He finds this unsettling.', darrut:'They share the front of the squad and the shield wall. They have not had a conversation. They do not need one.', orvas:'The Khundryl grieve their dead loudly. Hessa grieves no one. They are curious about each other.', redblade:'Temples and companies: they have found they mean the same thing.', warlock:'Two women who have met a god. Neither is impressed.'}},
  tebbet:{name:'Tebbet', role:'Bowman · Dal Hon', sig:'B', col:'#b7895a', hp:14, ac:12, atk:4, dmg:[1,8,1], rng:6, mv:5, init:2, st:{might:1, wits:2, guile:2}, ab:['mark','salve'],
    epithet:'"I would rather be a long way off when it happens."', origin:'Dal Hon, the hill country', age:26, service:'Five years, archer, two of them on Quon Tali\'s coast', height:'Long in the arm, narrow, and very still before he looses.',
    weapon:'A Dal Honese recurve that his uncle made and he has rebuilt twice, and a knife he never uses if he can help it', armour:'A padded jack, a leather bracer worn smooth, and a cloth hood against the sun',
    bio:`A Dal Honese bowman who joined the Malazans for the pay and has stayed for reasons he describes as "complicated" and nobody has the patience to hear. He was posted to the 9th because the 9th had no archers who could hit anything. It has one now. He would like a second, so that someone else can be the one everyone looks at.`,
    bio2:`The Dal Honese dream, he says, and take the dreams seriously, and he has dreamt of sand for a month without having seen any. The sand was real when he got here. He has been quiet since. He prays to the Queen of Dreams the hill way, with his eyes open and his bow across his knees, which the squad finds unsettling and he finds practical.`,
    traits:['Sights along every road like an arrow', 'Prays with his eyes open', 'Mends his own fletching and nobody else\'s', 'Counts his arrows the way Tangle counts the satchel, and resents the comparison'],
    gear:['Spare bowstrings in a waxed pouch', 'Goose fletching from Dal Hon, nearly gone', 'A dream-charm of knotted hair, his mother\'s'],
    get quest(){ return `He dreamt of sand before he saw any. Lately he dreams of a sea where the sand is, and does not know what that means, and has decided not to mention it to Marrow in case she does.`; },
    banter:[`"From back here, Sergeant, everything looks like a target. It's restful."`, `"The Queen sends dreams. I send arrows. We have an understanding."`, `"Two hundred paces, the sergeant says. In this dust, call it a hundred and pray."`],
    rel:{haddat:'She asks what he sees from the back. She believes him, which surprised him.', sathi:'They shoot for dried meat every evening. They are even. Neither will say so.', tangle:'Two men who prefer to do it from a distance. They get on.', marrow:'She stitched his bow hand. He thanked her in Dal Honese, at length.', tallow:'He is teaching the boy the bow. The boy is not good at it. Tebbet is patient.', hessa:'He shoots past her shoulder in drill and she never flinches. He would like to know how.', darrut:'Darrut calls him "the Dal Honese" in the third person. Tebbet calls him "the wall" back.', orvas:'Horse archers make him nervous. Orvas has noticed, and rides closer.', redblade:'Two straight backs at drill.', warlock:'Makes the sign against the evil eye when the old voice speaks.'}},
  darrut:{name:'Darrut', role:'Shield · late of the Aren Guard', sig:'D', col:'#9a8c70', hp:23, ac:15, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, st:{might:2, wits:1, guile:1}, ab:['bash','salve'],
    epithet:'"I was on the wall. That is all I will say about the wall."', origin:'Aren, the Old Quarter', age:34, service:'Twelve years in the Aren Guard, and a few months in the 9th', height:'Broad, thick in the neck, and moves slower than he can.',
    weapon:'A Malazan short sword, and the Guard\'s big round shield with its badge scraped off', armour:'Aren Guard mail, patched, and a helm with the Guard\'s plume cut off',
    bio:`Twelve years in the Aren Guard, which in Aren means drills, gates and the odd riot. When Blistig was promoted out of the Guard to command the 9th, some of his men asked to go with him, because they had stood with him once when it mattered. Darrut was one of them. He says it was the 9th or the harbour, and he gets seasick.`,
    bio2:`He was on Aren's north wall the day the Chain came in along the Way, and the day after. He does not tell that story. He tells every other Aren Guard story there is, the brawls and the drunk captains and the camel in the governor's garden, and he tells them well. The squad has noticed the one he leaves out.`,
    traits:['Tells long stories with a short ending', 'Polishes the place on the shield where the badge was', 'Stands like a gate in a crowd', 'Eats whatever is left and calls it his favourite'],
    gear:['A Guard plume he cut off and kept', 'A copper from every gate in Aren, on a string', 'A wineskin that has never once had wine in it'],
    get quest(){ return `A handful of the Aren Guard followed Blistig into the 9th. The legion grumbles that the Fist grumbles. Darrut has heard him say the Adjunct will kill them all. He has decided to see for himself, and to keep his shield up while he does.`; },
    banter:[`"In the Guard we'd have called this a parade. Nobody fell over. Mostly."`, `"Did I tell you about the camel? I'll tell you about the camel."`, `"Shield up, recruit. Higher. That's your face it's for."`],
    rel:{haddat:'He was on the wall when she came in under it. Neither has brought it up.', sathi:'Hackle growled at him once and never again. Sathi counts that for him.', tangle:'Asked if a cusser could take down a wall. "Which wall?" They have not resolved it.', marrow:'He comes to her with every blister. She suspects he likes the company, and allows it.', tallow:'He tells the boy the Guard stories. The boy believes nearly all of them, which is the right amount.', hessa:'They share the front of the line and have never needed a conversation.', tebbet:'"The Dal Honese." "The wall." It is fond, on both sides.', orvas:'Asked Orvas to teach him to ride. Orvas looked at him for some time and then said yes.', redblade:'Ramin was in Aren\'s cells. Darrut was the Guard. They are working round it.', warlock:'The boy frightens him. He hides it well, and the boy is grateful.'}},
  orvas:{name:'Orvas', role:'Rider · Khundryl Burned Tears', sig:'O', col:'#a85a3a', hp:17, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:6, init:3, st:{might:1, wits:1, guile:2}, ab:['b2_lance','salve'],
    epithet:'"We grieve the loss of ourselves. Then we ride."', origin:'The Khundryl, Gall\'s clan', age:23, service:'Every summer of his life on a horse, and one with the Malazans', height:'Lean as a tent-pole and always half turned toward his horse.',
    weapon:'A Khundryl lance cut short for the press, and a curved knife', armour:'Lacquered leather, horsehair, and the black tears inked down both cheeks',
    bio:`One of Gall's Burned Tears, the Khundryl who shadowed the Fourteenth out of the Vathar and came in to kneel. The clan has a debt to the Chain's dead, Gall says, for riding away before the end. Orvas has been lent to a Malazan squad of the 9th to pay a piece of it, which he thinks is a very small piece, and says so.`,
    bio2:`The tears down his face are the reason, he says, when anybody asks, and that is all he says. He rides the way Sathi rides, as if the horse had been his idea, and he will not walk if there is anything with four legs within a hundred paces. He laughs a great deal. He grieves a great deal. He does both at the same fire.`,
    traits:['Will not walk if he can ride', 'Grieves out loud at every fire', 'Laughs at the same fire, a moment later', 'Calls the squad "the herd" and means it well'],
    gear:['A horse-tail standard, small, his father\'s', 'A pot of black ink and a needle', 'A strip of the clan\'s old colours, tied to the lance'],
    get quest(){ return `The Burned Tears came to make amends to the dead of the Chain. Orvas has been told to ride with Malazans until the debt is paid. He does not know how they will know. He has decided to keep riding until somebody tells him to stop.`; },
    banter:[`"A herd that walks. My grandmother would weep. Then she would laugh. I am doing both."`, `"The dead of my clan ride behind us, Sergeant. They are very slow. They are very many."`, `"Give me a horse and a flank and I will give you the rest of the afternoon."`],
    rel:{haddat:'She speaks to him in an Odhan tongue, badly. He answers in Malazan, worse. Both find it restful.', sathi:'A Weasel and a Burned Tear. They agree about horses and nothing else, at volume.', tangle:'Tangle keeps the satchel on the far side from the horse. Orvas thinks this is wise.', marrow:'She asked about the tears once. He said, "They are the reason." She let it be, and he liked her for it.', tallow:'The boy says every day that he has never seen a horse go like that. Orvas lets him.', hessa:'The Khundryl grieve loudly. Hessa grieves no one. Each finds the other worth watching.', tebbet:'Horse archers make the Dal Honese nervous. Orvas rides closer, to help.', darrut:'He is teaching the Aren man to ride. It is going badly. They are both enjoying it.', redblade:'Ramin rides beside him and talks horses. They are, for a few hours a day, entirely happy.', warlock:'The Khundryl grieve their dead. Keth carries his. Some nights they sit together without a word.'}},
});
Object.assign(VERB, {tallow:'thrusts at', hessa:'drives the temple spear at', tebbet:'looses an arrow at', darrut:'cuts at', orvas:'drives the short lance at'});
Object.assign(STATUP, {tallow:['guile', 'might'], hessa:['might', 'wits'], tebbet:['guile', 'wits'], darrut:['might', 'wits'], orvas:['guile', 'might']});
Object.assign(PICKS[3], {
  tallow:[['nerve', 'Grandmother\'s Luck', 'Tallow takes the Nerve pick early: +1 initiative and +1 to every skill check he rolls. The old woman said he was lucky. He is starting to believe her.'], ['holdline', 'Hold, Recruit', 'Tallow\'s free swings are unlimited and hit +2. The drill took, in the end.']],
  hessa:[['shieldwall', 'The Temple Door', 'Squadmates standing next to Hessa get +2 armour. Six years in a doorway taught her how wide a door is.'], ['holdline', 'The Worm Waits', 'Hessa\'s free swings are unlimited and hit +2. Anything that walks away from her pays for it.']],
  tebbet:[['quickshot', 'The Hill Pair', 'Once a fight: two arrows at one target within reach (three from level 6). The Dal Honese way: the second before the first has landed.'], ['ghost', 'Far Off', 'Enemies take −2 to hit Tebbet. He is always somewhere further away than you thought.']],
  darrut:[['discipline', 'Guard Drill', 'Every squadmate wears +1 armour. Twelve years of telling people on a wall where to stand.'], ['holdline', 'The Gate', 'Darrut\'s free swings are unlimited and hit +2. He has held a gate. He knows what goes through.']],
  orvas:[['ghost', 'Low on the Horse', 'Enemies take −2 to hit Orvas. He is never quite where the horse is.'], ['sappers_eye', 'The Flank', 'The squad rolls +2 initiative, and Orvas\'s free swings hit +2. The Khundryl see the gap before it opens.']],
});
/* their gods (31c), and the sergeant's in Book Four: Fener is gone, and Treach answers (Heboric is Treach's Destriant in Raraku; hoc-canon §13) */
Object.assign(PATRONS, {
  tallow:{sig:'kettle', god:'Oponn', title:'Oponn, the Twins', txt:id => `A card slides out of the oilcloth in Tallow's shirt and lands face up in the dust beside his hand. It is the Twins. It is always the Twins, his grandmother used to say, when you need them and when you don't.\n\nThe Lady pulls. Back to back with her, her brother looks at the boy, and then at the squad, and makes a note of what it will cost.`},
  hessa:{sig:'hessa', god:'D\'rek', title:'D\'rek, the Worm of Autumn', txt:id => `Hessa, face down, puts her palm flat on the ground and says one word in the temple tongue, and the ground under the squad goes soft and warm, like a field turned over in autumn.\n\nThe Worm of Autumn does not hurry. It does not need to. Everything comes to it in the end, and it has decided that the end is not today, not for these. The enemy's blades come away from the squad with rot on them.`},
  tebbet:{sig:'redblade', god:'the Queen of Dreams', title:'The Queen of Dreams', txt:id => `Tebbet goes down with his eyes open, the hill way, and the fight goes very far away, into a dream that somebody else is having about a sea where the sand should be.\n\nIn the dream the squad stands up. The Queen does not explain. The Dal Honese never ask her to.`},
  darrut:{sig:'brisk', god:'Hood', title:'Hood, Lord of Death', txt:id => `Darrut, on his knees behind the big round shield, says the Aren Guard's prayer, which is short and mostly swearing.\n\nSomewhere there is a gate the size of the world, and Darrut has seen it once already, from a wall, on the day the Chain came in. A grey hand on it pauses. *Not these. Not after that.*`},
  orvas:{sig:'orvas', god:'the Khundryl dead', title:'The dead of the Burned Tears', txt:id => `Orvas goes down laughing, and then he is grieving, out loud, the Khundryl way, and the sound goes out over the field and something answers it.\n\nThey come up out of the dust at a walk and then at a gallop: riders with black tears on their faces, a great many, and very old, and very patient. They ride round the squad once, the way you ride round a herd, and the enemy remembers somewhere else it needs to be.`},
});
{ const prev = Object.getOwnPropertyDescriptor(PATRONS, 'sgt');
  Object.defineProperty(PATRONS, 'sgt', {configurable:true, enumerable:true, get(){ return S && S.book === 'hoc' ? PATRON_TREACH : prev.get ? prev.get() : prev.value; }, set(v){ /* kept per book */ }}); }

/* ---- Nerve: how steady the raw company round the squad is (0..10, start 5) ----
   b4Nerve(d, why) changes it and notes it. Omens, bad news and raids lower it (the chapters call it); the squad's steadiness, the Khundryl and a
   clean fight raise it. A fight with def.company has company regulars in it: Nerve 7+ sends one more, 9+ two more; Nerve 3 or less, the
   regulars may break at the end of round 2 (each 25% per point below 4). A won company fight in which nobody in the squad went down: +1. */
const NERVE_MAX = 10, B4_NERVE0 = 5;
function b4Nerve(d = 0, why = ''){ if (!S) return 0; S.nerve ??= B4_NERVE0;
  const n0 = S.nerve; S.nerve = clamp(n0 + d, 0, NERVE_MAX); const dn = S.nerve - n0;
  if (dn) { const s = `${why ? why + ': ' : ''}Nerve ${dn > 0 ? '+' : '−'}${Math.abs(dn)}.`; note(s.charAt(0).toUpperCase() + s.slice(1), dn < 0 ? 'bad' : 'good'); tally(dn > 0 ? 'nerveUp' : 'nerveDown', Math.abs(dn)); }
  updChain(); return dn; }
const b4NerveNow = () => (S && S.nerve != null ? S.nerve : B4_NERVE0);
/* for text: 'steady' (7+), 'shaky' (3 or less), or '' */
const b4Mood = () => b4NerveNow() >= 7 ? 'steady' : b4NerveNow() <= 3 ? 'shaky' : '';
/* ---- Dust: from Chapter 5, the Whirlwind's sand (0..3). Set by the chapter (B4DUST, at startChapter); a fight may override it with def.dust.
   Each point: every shot's range −1 (never below 2), and sorcery (a squadmate's strain-costing spell, and an enemy caster's trick) sputters
   5% a point. Spirit-craft (a.spirit) and Elder tricks (a.elder) never sputter; nor anything under the Leper (70c). ---- */
const B4DUST = {1:0, 2:0, 3:0, 4:0, 5:1, 6:2, 7:3};
const b4DustNow = () => { if (!b4On()) return 0; const d = B && B.def && B.def.dust != null ? B.def.dust : S.dust != null ? S.dust : B4DUST[S.chapter] || 0; return clamp(d, 0, 3); };
const b4SputterPct = () => 5 * b4DustNow();
/* the widget for a node's html: two bars and a caption (styled like Book Two's chainHTML) */
function nerveHTML(road){
  const n = b4NerveNow(), d = b4On() ? (S.dust != null ? S.dust : B4DUST[S.chapter] || 0) : 0, m = b4Mood();
  return `<div class="chainbox allybox" role="group" aria-label="Nerve and Dust">${road ? `<div class="road">${esc(road)}</div>` : ''}
    <div class="crow"><span>Nerve</span><b>${n} of ${NERVE_MAX}${m === 'steady' ? ' · the company stands with you' : m === 'shaky' ? ' · the company may break' : ''}</b></div><div class="bar"><i style="width:${Math.round(n / NERVE_MAX * 100)}%"></i></div>
    <div class="crow"><span>Dust</span><b>${d ? `${d} of 3 · shots −${d}, sorcery sputters ${5 * d}%` : 'none yet'}</b></div><div class="bar col"><i style="width:${Math.round(d / 3 * 100)}%"></i></div></div>`; }
/* the HUD pill beside the silver: Nerve n · Dust n (Book Four only) */
{ const _updChain = updChain;
  updChain = function(){ const el = typeof document !== 'undefined' && document.getElementById('chainp');
    if (!el || !S || S.book !== 'hoc') return _updChain();
    const n = b4NerveNow(), d = S.dust != null ? S.dust : B4DUST[S.chapter] || 0;
    el.innerHTML = `<span class="chainpill allypill"><span class="${n <= 3 ? 'dry' : ''}">Nerve <b>${n}</b></span>${d ? `<span class="dry">Dust <b>${d}</b></span>` : ''}</span>`; }; }
/* the chapter sets the dust (a chapter may set S.dust itself after this, for one stretch) */
{ const _startChapter = startChapter;
  startChapter = function(n){ if (b4On() && CHAPTERS[n]) S.dust = B4DUST[n] || 0; return _startChapter(n); }; }
/* shots shorten in the dust */
const b4Shorten = u => { const d = b4DustNow(); if (d && u && u.rng > 1) u.rng = Math.max(2, u.rng - d); return u; };
{ const _mkParty = mkParty; mkParty = function(id, x, y){ const u = _mkParty(id, x, y); return b4On() ? b4Shorten(u) : u; }; }
{ const _mkAlly = mkAlly; mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y); if (b4On() && k === 'b4_regular') { u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); u.b4reg = true; } return b4On() ? b4Shorten(u) : u; }; }
/* Book Four's squad is the same veterans' curve as Book Three's (8..15 against 2..8): its enemies carry the gap, per chapter. Starting
   numbers are Book Three's (B3GAP); tools/balance.mjs tunes them with David once fights exist. */
const B4GAP = {1:{ac:7, atk:4, hp:1.8, dmg:6}, 2:{ac:6, atk:4, hp:1.7, dmg:5}, 3:{ac:5, atk:4, hp:1.55, dmg:4}, 4:{ac:6, atk:4, hp:1.5, dmg:5},
  5:{ac:5, atk:2, hp:1.35, dmg:4}, 6:{ac:5, atk:2, hp:1.25, dmg:4}, 7:{ac:5, atk:1, hp:1.25, dmg:4}};
{ const _mkFoe = mkFoe;
  mkFoe = function(k, x, y, extra){ const u = _mkFoe(k, x, y, extra); if (!b4On()) return u; const g = B4GAP[clamp(S.chapter || 1, 1, 7)];
    if (g) { const s = (S.diff || 'soldier') === 'soldier' && g.s ? g.s : {hp:1, atk:0, dmg:0};
      u.ac = (u.ac || 10) + g.ac; u.atk = (u.atk || 0) + g.atk + (s.atk || 0); u.maxhp = u.hp = Math.max(1, Math.round(u.maxhp * g.hp * (s.hp || 1))); if (u.dmg) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + g.dmg + (s.dmg || 0)]; }
    return b4Shorten(u); }; }
/* the squad's sorcery in the dust: half effect when it sputters (the mechanism Book Two's fouled warrens use, 47) */
const b4Grit = () => ['The warren comes up full of sand.', 'Grit in the warren. Half of it comes through.', 'The sorcery catches in the dust like cloth on a nail.', 'The Whirlwind\'s sand is in the warren too.'][R(4)];
{ const _useAb = useAb;
  useAb = function(k, x, y){
    const u = B && B.cur, a = AB[k];
    if (!b4On() || !u || !a || !a.strain || a.elder || a.spirit || u.side !== 'p' || u.ally || !b4DustNow()) return _useAb(k, x, y);
    if (S.card === 'b4c_leper' || boon('ground') || R(100) >= b4SputterPct()) return _useAb(k, x, y);
    blog(`<em>${u.name} reaches for the warren. ${b4Grit()}</em> Half effect.`); float(u, 'sputters', '#c8a868'); tally('b4Sputters'); S.f.b4_sputters = (S.f.b4_sputters || 0) + 1;
    const w0 = B.warren || {}, down = B.units.filter(p => p.side === 'p' && p.hp <= 0);
    B.warren = Object.assign({}, w0, {denul:(w0.denul || 1) * .5, meanas:(w0.meanas || 1) * .5});
    try { return _useAb(k, x, y); }
    finally { B.warren = w0; down.filter(p => p.hp > 0).forEach(p => { p.hp = Math.max(1, Math.ceil(p.hp / 2)); }); } }; }
/* an enemy caster in the dust: its sorcery may fizzle for the turn (it fights with what it carries instead) */
{ const _foeSpecial = foeSpecial;
  foeSpecial = async function(u, gone){
    if (!b4On() || !B || !u || !b4DustNow() || S.card === 'b4c_leper' || !(u.sk || []).some(k => SORC.includes(k)) || u.otat || R(100) >= b4SputterPct()) return _foeSpecial(u, gone);
    u.otat = true; blog(`<em>${u.name} calls on something, and the dust swallows it.</em>`); float(u, 'sputters', '#c8a868');
    try { return await _foeSpecial(u, gone); } finally { u.otat = false; } }; }

/* ---- the company regulars: a fight with def.company = {at:[[x, y], …], n:1} (or true) has n regulars of the 9th beside the squad (default 1),
   placed at the tiles given (or by the squad). Nerve 7+: one more; 9+: two more. Nerve 3 or less: at the end of round 2 each regular breaks
   (leaves the field) at 25% per point of Nerve below 4. ---- */
FOES.b4_regular = {name:'Ninth regular', kind:'b2soldier', sig:'n', hp:15, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:1, verb:'cuts at'};
const b4CompanyN = d => { const c = d && d.company; if (!c) return 0; const base = c === true ? 1 : c.n ?? 1, n = b4NerveNow(); return base + (n >= 9 ? 2 : n >= 7 ? 1 : 0); };
const b4BreakPct = () => Math.max(0, 4 - b4NerveNow()) * 25;
{ const _battleDef = battleDef;
  battleDef = function(id, stage){ const d = _battleDef(id, stage); if (!d || !b4On()) return d; let out = d;
    if (d.company) { const c = d.company === true ? {} : d.company, at = c.at && c.at.length ? c.at : [d.party[0]], n = b4CompanyN(d);
      out = Object.assign({}, out, {allies:[...(out.allies || []), ...Array.from({length:n}, (_, i) => ['b4_regular', at[i % at.length][0], at[i % at.length][1]])], b4Regs:n}); }
    /* Hackle: at Sathi's knee if she came across; if she fell and the whistle brought him home in Book Two, at the sergeant's */
    if (!d.noDog) { const sq = SQUAD(), i = b4In('sathi') ? sq.indexOf('sathi') : b4Was('b2_hackleBack') && !(S.dead && S.dead.hackle) ? sq.indexOf('sgt') : -1;
      if (i >= 0) { const p = d.party[i] || d.party[d.party.length - 1]; out = Object.assign({}, out, {allies:[...(out.allies || []), ['hackle', p[0], p[1]]], dogIn:true}); } }
    return out; }; }
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt); if (!b4On() || !B || !B.def) return r;
    const d = B.def, dust = b4DustNow();
    if (d.dogIn) blog(b4In('sathi') ? `Hackle is at Sathi's knee, hackles up.` : `Hackle is at the sergeant's knee. He has been since the whistle.`);
    if (dust) blog(`<em>Dust ${dust}. The Whirlwind's sand is in the air: every shot −${dust} range, and sorcery sputters ${5 * dust}% of the time. Spirit-craft is untouched.</em>`);
    if (d.b4Regs) { const n = b4NerveNow(); B.b4Brittle = n <= 3;
      blog(n >= 7 ? `<em>Nerve ${n}. The company is steady: ${d.b4Regs} of the 9th's regulars come up beside the squad without being asked.</em>` : n <= 3 ? `<em>Nerve ${n}. The regulars beside the squad keep looking back at the column. They may not stay.</em>` : `<em>Nerve ${n}. A regular of the 9th fights beside the squad.</em>`); }
    return r; }; }
{ const _newRound = newRound;
  newRound = function(){ const r = _newRound(); if (!b4On() || !B || B.over || B.round !== 3 || !B.b4Brittle || B.b4Broke) return r;
    B.b4Broke = true; const pct = b4BreakPct(), gone = new Set(B.units.filter(u => u.b4reg && u.hp > 0 && R(100) < pct));
    if (gone.size) { B.units = B.units.filter(u => !gone.has(u)); B.initOrder = B.initOrder.filter(u => !gone.has(u)); B.order = B.order.filter(u => !gone.has(u));
      blog(`<em>${gone.size > 1 ? `${gone.size} of the regulars break` : 'The regular breaks'} and run${gone.size > 1 ? '' : 's'} for the column.</em> Nobody calls after them.`);
      tally('b4Broke', gone.size); S.f.b4_broke = (S.f.b4_broke || 0) + gone.size; updBattleUI(); }
    return r; }; }

/* ---- the squad away for one fight, the worst-hurt, the last stand and the rounds (as Book Three has them, for Book Four) ----
   def.away = ['tangle']: fought without them (they are still in the squad). def.hurtMost: S.f.b4_hurtMost after the fight (never the sergeant,
   never a recruit). def.lastStand: a hold-out; won or lost it goes on to def.after with the experience, no god, no retry; S.f.b4_lastHeld
   1/0 and S.f.b4_lastRounds. Every fight writes S.f.b4_lastRoundsFought. A won company fight with nobody in the squad down: Nerve +1. */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const d = b4On() ? BATTLES[id] : null, away = d && (d.away || (opt.stage === 2 && d.stage2 && d.stage2.away));
    if (!away || !away.some(k => S.squad.includes(k))) return _startBattle(id, opt);
    const sq = S.squad; S.squad = sq.filter(k => !away.includes(k));
    try { return _startBattle(id, opt); }
    finally { S.squad = sq; if (B && B.snap) { const o = JSON.parse(B.snap); o.squad = sq.slice(); B.snap = JSON.stringify(o); } save(); } }; }
{ const _win = win;
  win = function(){
    if (b4On() && B && B.def) { S.f.b4_lastRoundsFought = B.round;
      if (B.def.lastStand) { S.f.b4_lastHeld = 1; S.f.b4_lastRounds = B.round; }
      if (B.def.hurtMost) { const c = B.units.filter(u => u.side === 'p' && !u.ally && u.id !== 'sgt' && !B4_RECRUITS.includes(u.id) && TPL[u.id] && S.squad.includes(u.id)).sort((a, b) => a.hp / a.maxhp - b.hp / b.maxhp);
        if (c.length) S.f.b4_hurtMost = c[0].id; }
      if (B.def.company && B.units.filter(u => u.side === 'p' && !u.ally).every(u => u.hp > 0)) { tally('b4Clean'); b4Nerve(1, 'A clean fight, and the company saw it'); } }
    return _win(); }; }
{ const _lose = lose;
  lose = function(){ if (!b4On() || !B || !B.def || !B.def.lastStand) return _lose();
    AUDIO.play('lose'); const xp = Math.round((B.def.xp || 0) * XPK), up = gainXP(xp); S.f.b4_lastHeld = 0; S.f.b4_lastRounds = B.round;
    note(`The squad went down, and the line went on past them. +${xp} experience.`, 'bad'); if (up) note(lvlNote(), 'good');
    S.scene = 'talk'; save(); updBattleUI(); talk(B.def.after); }; }
{ const _endBeat = endBeat;
  endBeat = function(won){ const r = _endBeat(won); if (b4On() && B && B.banner && !won) B.banner.txt = B.def && B.def.lastStand ? 'The line went on' : 'The squad is down'; return r; }; }

/* ---- a fresh Book Four sergeant, and what a finished Book Two can bring ----
   Only a finished Book Two whose road out (b2_c7_key) was 'guard' or 'wickans' transfers: that squad was in Aren when the Adjunct came.
   'desert' does not (it is heard of as rumour). An Old Hand of the Fourth goes back to the Fourth and does not come. */
const B4_KEEP = ['b2_c7_key', 'b2_gateCount', 'b2_runLost', 'b2_ilhar', 'b2_ilharSeen', 'b2_girlsFound', 'b2_girlsRode', 'b2_vatharLost', 'b2_barrowHeld', 'b2_barrowFell', 'b2_barrowRounds', 'b2_hackleBack',
  'b2_raminGone', 'b2_kethGone', 'b2_raminDone', 'b2_kethDone', 'b2_kethSormo', 'b2_stay', 'b2_split', 'b2_splitHow', 'b2_woundWho', 'b2_woundHealed', 'b2_silandaWho', 'b2_silandaBack', 'b2_sathiCrows',
  'b2_ressanOut', 'b2_yedda', 'b2_imra', 'b2_knots', 'b2_sputters', 'b2_herd', 'b2_cusserKept', 'b2_marrowEnd', 'b2_sathiClan', 'b2_duiker', 'b2_bult', 'b2_c6_key', 'b2_c5_key', 'b2_c4_key', 'b2_c3_key', 'b2_c2_key', 'b2_c1_key'];
const B4_ROADS = ['guard', 'wickans'];
const b4Qualifies = o => !!(o && o.book === 'dg' && o.chapters && B4_ROADS.includes(o.chapters[7] ?? (o.f && o.f.b2_c7_key)));
function b4Import(id){ const o = loadSlot(id); if (!b4Qualifies(o)) return null;
  const f = o.f || {}, dead = o.dead || {}, road = o.chapters[7] ?? f.b2_c7_key;
  const mates = HOC_CORE.filter(k => (o.squad || []).includes(k) && !dead[k]);
  const keep = {}; B4_KEEP.forEach(k => { if (f[k] != null) keep[k] = f[k]; });
  if (typeof B2_KEEP6 !== 'undefined') keep.keepsakes = Object.values(B2_KEEP6).filter(it => (o.kit || []).includes(it));
  if (o.chain) keep.column = o.chain.column || 0;
  const loy = {}; mates.forEach(k => { loy[k] = clamp(((o.loy || {})[k]) || 0, -2, 3); });
  /* what the squad carried, as Book Three's transfer does (60): worn gear and unworn kit, talents and veteran picks, the tricks of anyone who comes across */
  const who = ['sgt', ...mates], gear = {}, picks = {}, worn = new Set();
  who.forEach(k => { gear[k] = {}; Object.entries(((o.gear || {})[k]) || {}).forEach(([slot, it]) => { if (ITEMS[it]) { gear[k][slot] = it; worn.add(it); } });
    picks[k] = (((o.picks || {})[k]) || []).filter(p => PICKS.vet.some(v => v[0] === p) || ((PICKS[3][k] || []).some(v => v[0] === p))); });
  const wornByGone = new Set(); Object.entries(o.gear || {}).forEach(([k, g]) => { if (!who.includes(k)) Object.values(g || {}).forEach(it => wornByGone.add(it)); });
  const kit = (o.kit || []).filter(it => ITEMS[it] && (worn.has(it) || !wornByGone.has(it)));
  const tricks = {}; Object.entries(o.tricks || {}).forEach(([k, t]) => { if (TRICKS[k] && t && who.includes(t.who)) tricks[k] = {who:t.who, ch:0, left:null}; });
  const inv = Object.assign({sharper:0, burner:0, cusser:0, smoker:0}, ...B2_MUNI.map(k => ({[k]:Math.max(0, ((o.inv || {})[k]) || 0)})), {salve:Math.max(2, ((o.inv || {}).salve) || 0)}); // Tangle's satchel, as Book Two left it
  return {from:o.name, sid:id, road, lvl:o.lvl || 1, mates, loy, dead:Object.keys(dead).filter(k => TPL[k] && k !== 'sgt'), deadAt:dead, f:keep, gear, picks, kit, tricks, inv,
    ramin:!!f.b2_raminGone && !dead.redblade, keth:!!f.b2_kethGone && !dead.warlock}; }
/* every Book Four game starts at level 8 (cap 15): the veterans' curve and its picks are Book Three's (60) */
const B4_START_LVL = 8;
function newStateHOC(name, importId, sid){
  name = name || 'Hask';
  const imp = importId ? b4Import(importId) : null, mates = imp ? imp.mates : ['haddat', 'tangle', 'marrow'];
  const fill = HOC_NEW.slice(0, Math.max(0, 4 - mates.length)), squad = ['sgt', ...mates, ...fill];
  const s = {v:1, book:'hoc', sid:sid || (imp ? newSid() : sidFor(name)), name, scene:'chintro', node:null, bg:null, silver:12, xp:0, lvl:1, card:null,
    inv:{sharper:2, burner:1, cusser:1, salve:2, smoker:1}, loy:{}, f:{}, pos:{x:5, y:8},
    trail:[{x:4, y:8}, {x:6, y:8}, {x:4, y:9}, {x:5, y:9}], log:[], ending:null, battle:null, bopt:null,
    squad, chapter:0, chapters:{}, area:'pale', nerve:B4_NERVE0, dust:0, dead:{}};
  squad.forEach(k => { if (k !== 'sgt') s.loy[k] = 0; });
  s.lvl = Math.max(B4_START_LVL, Math.min(15, imp ? imp.lvl : 1)); s.xp = LEVELS[s.lvl - 1];
  if (imp) { s.imported = {from:imp.from, sid:imp.sid, road:imp.road, lvl:imp.lvl, mates:imp.mates.slice(), dead:imp.dead, f:imp.f, ramin:imp.ramin, keth:imp.keth};
    Object.assign(s.loy, imp.loy); s.gear = imp.gear; s.picks = imp.picks; s.kit = imp.kit; s.tricks = imp.tricks; s.inv = imp.inv;
    imp.dead.forEach(k => { const d = imp.deadAt[k] || {}; s.dead[k] = {ch:d.ch || 7, where:d.where || 'The Barrow', from:'dg'}; }); } // Book Two's dead stay dead: never in the squad, never a recruit
  else s.dead.sathi = {ch:7, where:'The Barrow', from:'dg'}; // the fresh start: Sathi fell at the Barrow, and Hackle was not seen again
  migrate(s); s.picksDue = b3PicksDue(s);
  return s; }
/* a recruit joining a veteran squad brings her own veteran picks for the levels already passed; a recruit joins the squad, not the Fourth */
{ const _recruit = recruit;
  recruit = function(id){ if (!b4On()) return _recruit(id); const was = S.squad.includes(id), n0 = note;
    note = (t, c) => n0(String(t).replace('joins the Fourth', 'joins the squad'), c); try { _recruit(id); } finally { note = n0; }
    if (!was && S.squad.includes(id)) { S.picks[id] ??= []; const have = S.picks[id].filter(p => PICKS.vet.some(v => v[0] === p)).length, want = B3_VET_LVLS.filter(l => S.lvl >= l).length;
      PICKS.vet.map(v => v[0]).filter(k => !S.picks[id].includes(k)).slice(0, Math.max(0, want - have)).forEach(k => S.picks[id].push(k)); save(); } }; }
{ const _rest = rest; rest = function(t){ return _rest(t || (b4On() ? 'The squad rests inside the 9th\'s lines. Wounds close, mostly.' : t)); }; }
const b4Rest = t => { if (!S) return false; const had = !!S.wounds; rest(t || 'The squad rests inside the 9th\'s lines, with a legion of recruits snoring round it. Wounds close, mostly.'); if (!had) note('Rested.', 'good'); save(); return true; };

/* ---- the three recruits: one at a time, swapped at a fire (Book Two's and Three's rule) ----
   Ramin (redblade) with the Red Blades, transfer only, if he went to the cells alive (S.imported.ramin). Keth (warlock) with Temul's Wickan
   youths, transfer only, if he went to the Wickan children alive (S.imported.keth). Orvas, a Khundryl Burned Tear, from Chapter 3 in every game.
   S.f.b4_raminDone / b4_kethDone / b4_orvasDone: 1 walks with the squad, 2 waits near with their own people, 0 sent away (set 0 yourself).
   b4Join(id): joins if no other recruit walks with the squad and there is room (six at most); otherwise waits (2) with a note.
   b4SwapIn(id): the recruit who walks goes back to their people (kit kept in S.f.b4_allyGear) and this one comes in. */
const B4_DONE = {redblade:'b4_raminDone', warlock:'b4_kethDone', orvas:'b4_orvasDone'};
const B4_HOME = {redblade:'the Red Blades\' lines', warlock:'Temul\'s Wickan youths', orvas:'the Khundryl fires'};
const B4_CAP = 6;
const b4Room = () => Math.max(0, B4_CAP - ((S && S.squad) || []).length);
const b4Recruit_ = () => (S && Array.isArray(S.squad) && B4_RECRUITS.find(k => S.squad.includes(k))) || null;
/* may this recruit be offered at all in this game? */
const b4CanRecruit = id => !!(b4On() && TPL[id] && !(S.dead && S.dead[id]) && (id === 'orvas' ? true : id === 'redblade' ? !!(S.imported && S.imported.ramin) : id === 'warlock' ? !!(S.imported && S.imported.keth) : false));
function b4Join(id){ if (!b4CanRecruit(id) || b4In(id)) return false;
  if (b4Recruit_() || b4Room() <= 0) { S.f[B4_DONE[id]] = 2; note(`${NAME(id)} stays with ${B4_HOME[id]} for now. Ask at any fire, and he'll come.`); save(); return false; }
  S.f[B4_DONE[id]] = 1; recruit(id); return true; }
function b4SwapIn(id){ if (!b4CanRecruit(id) || b4In(id)) return false;
  const out = b4Recruit_();
  if (out) { S.f.b4_allyGear ??= {}; S.f.b4_allyGear[out] = Object.assign({}, S.gear[out] || {}); S.squad = S.squad.filter(x => x !== out); S.gear[out] = {}; S.f[B4_DONE[out]] = 2;
    S.trail = S.trail.slice(0, Math.max(1, S.squad.length - 1)); note(`${NAME(out)} goes back to ${B4_HOME[out]}. Ask at any fire, and he'll come.`); }
  if (b4Room() <= 0) return false;
  S.f[B4_DONE[id]] = 1; recruit(id);
  Object.entries(((S.f.b4_allyGear || {})[id]) || {}).forEach(([slot, it]) => { if (ITEMS[it] && S.kit.includes(it) && !SQUAD().some(w => Object.values(S.gear[w] || {}).includes(it))) S.gear[id][slot] = it; });
  save(); return true; }
const b4Waiting = id => !!(b4On() && S.f && S.f[B4_DONE[id]] === 2 && !b4In(id) && !(S.dead && S.dead[id]));
/* the recruits who could be asked at a fire, for a swap choice list */
const b4Offers = () => B4_RECRUITS.filter(id => b4Waiting(id));

/* ---- who reads the Deck in Book Four (36b visReader, 21's captions, 70c's readings) ----
   Marrow while she is in the squad and alive (she read for Book Two); otherwise Tallow, from his grandmother's deck; otherwise an old soldier
   of the 9th who reads for the legion, whose name nobody has. */
{ const _vr = VISREADER;
  VISREADER = () => { if (!b4On()) return _vr ? _vr() : null;
    if (b4In('marrow')) return {id:'marrow', name:'Marrow', he:false};
    if (b4In('tallow')) return {id:'tallow', name:'Tallow', he:true};
    return {id:'oldninth', name:'The old soldier', mid:'the old soldier', he:true}; }; }

/* ---- how far Book Four goes, for the title: counted from the chapters actually registered. With none, the book is 'coming':
   off the shelf, the picker and Deeds (14 shelfBooks); showTitle(false, 'hoc') still dresses the title for it, and Begin says it is being written ---- */
const b4ChCount = () => Object.keys(BOOK === 'hoc' ? CHAPTERS : BOOKSNAP.hoc.ch).length;
const b4Progress = () => { const n = b4ChCount(); return n >= 7 ? 'All seven chapters.' : n === 0 ? 'Its chapters are being written.' : n === 1 ? 'Chapter One so far.' : `${['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'][n]} chapters so far.`; };
Object.defineProperty(BOOKS.hoc, 'blurb', {configurable:true, get(){ return 'Seven Cities, the year after the Chain, beside House of Chains. Book Two\'s squad in the Adjunct\'s Fourteenth, from Aren to Raraku. Plays on its own; a finished Book Two save on the Aren Guard or Wickan road can bring its squad across.' + (b4ChCount() >= 7 ? '' : ' ' + b4Progress()); }});
Object.defineProperty(BOOKS.hoc, 'coming', {configurable:true, get(){ return b4ChCount() === 0; }});
Object.defineProperty(BOOKS.hoc, 'titleArt', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['title/hoc'] ? 'title/hoc' : 'title/dg'; }});

/* ---- the import, on the title: finished Book Two sergeants on the Aren Guard or the Wickan road ---- */
const b4Finished = () => roster().list.filter(e => e.book === 'dg' && e.done && b4Qualifies(loadSlot(e.id)));
const b4And = a => a.length > 1 ? a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1] : a[0] || '';
function b4ImpDesc(id){ const i = id && b4Import(id); if (!i) return 'A fresh start: Haddat, Tangle and Marrow came off the Chain with you. Sathi stayed on the Barrow. A recruit off the transports makes five.';
  const dead = i.dead.filter(k => HOC_CORE.includes(k) || ['redblade', 'warlock'].includes(k)).map(k => TPL[k].name), went = i.mates.map(k => TPL[k].name), fill = HOC_NEW.slice(0, Math.max(0, 4 - i.mates.length)).map(k => TPL[k].name);
  return `Sergeant ${esc(i.from)}'s squad, as it came into Aren: ${went.length ? esc(b4And(went)) : 'nobody but you'}${dead.length ? `. ${esc(b4And(dead))} stayed on the Barrow` : ''}${fill.length ? `. The Fourteenth makes up the five with ${esc(b4And(fill))}` : ''}.${i.ramin ? ' Ramin is with the Red Blades.' : ''}${i.keth ? ' Keth is with the Wickan youths.' : ''} The sergeant's name comes with them.`; }

/* ---- the words Book Four throws at you: [chapter, word, meaning, met?] (flags the chapters set unlock the later ones) ---- */
GLOSSX.hoc = [
  [0, 'The Fourteenth', 'The Adjunct\'s new army, raised to put down the Whirlwind: three legions, the 8th, 9th and 10th, half of them recruits off the transports from Quon Tali who have never fought. The Chain\'s survivors were dealt out across all three.'],
  [0, 'The Adjunct', 'Tavore, the Empress\'s Adjunct, who commands the Fourteenth. Plain, quiet, and very far from the ranks. The soldiers have not decided what she is. Some of the old hands call her cold iron, quietly.'],
  [0, 'The 9th Legion', 'Fist Blistig\'s legion. He commanded the Aren Guard before this and was given the 9th whether he wanted it or not. The Guard stays in Aren; a few of its men followed him.'],
  [0, 'The Red Blades', 'Seven Cities loyalists, cavalry in chain. Thrown in Aren\'s cells by the High Fist, freed by Blistig, and riding now for the Adjunct under Tene Baralta.'],
  [0, 'The Wickans', 'Temul\'s youths, some forty, who came through the Chain and guard the Adjunct; and three hundred Crow who came by ship and will not take orders from a boy.'],
  [0, 'The Whirlwind', 'The rising, and the goddess in Raraku\'s sand. Sha\'ik and her army wait for the Fourteenth inside its wall of wind.'],
  [0, 'Raraku', 'The Holy Desert, north of Aren: an old sea bed, they say, with the Whirlwind walled round it. Nobody in the 9th has been inside. Haddat has, a little way.'],
  [0, 'The finger bones', 'Every soldier in the Fourteenth wears one on a thong, from the old graveyard in Aren. It started as a joke. The Adjunct made it the army\'s.'],
  [0, 'Nerve', 'How steady the raw company round the squad is, out of ten. High, and regulars come into a fight beside you. Low, and they may run.'],
  [0, 'Dust', 'The Whirlwind\'s sand, once the army is near it: shots fall short and sorcery catches in it. Spirit-craft is not touched.', ()=>!!(S && (S.dust || (S.chapter || 0) >= 5))],
  [0, 'Treach', 'The Tiger of Summer. A god new this year, they say, risen as the Boar fell. Soldiers who swore by Fener are learning a different oath.', ()=>godMet('sgt') || !!(S.f && S.f.b4_treach)],
  [0, 'D\'rek', 'The Worm of Autumn, whose Grand Temple is in Kartool City. Rot and the turning year. Hessa stood her doors for six years.', ()=>b4In('hessa') || godMet('hessa')],
  [1, 'Blistig', 'Fist of the 9th, late of the Aren Guard. Says the Adjunct will get them all killed. Says it where the soldiers can hear.', ()=>!!(S.f && S.f.b4_blistig) || (S.chapter || 0) >= 1],
  [2, 'Coltaine\'s Fall', 'The hill on the Aren Way where the Chain ended, a day north of the city. The pilgrims have hung it with braids and feathers.', ()=>(S.chapter || 0) >= 2],
  [3, 'The Burned Tears', 'Gall\'s Khundryl, some three thousand riders with black tears inked on their faces. They rode away from Coltaine before the end. They have come to make it right.', ()=>(S.chapter || 0) >= 3 || !!(S.f && S.f.b4_khundryl)],
  [4, 'Leoman', 'Leoman of the Flails, Sha\'ik\'s war leader, raiding the column with a few hundred riders. Fast, and never where you look for him.', ()=>(S.chapter || 0) >= 4 || !!(S.f && S.f.b4_leoman)],
  [6, 'The House of Chains', 'A new House in the Deck, they say. Nobody in the army can say who put it there.', ()=>!!(S.f && S.f.b4_chains) || ['b4c_knightchains', 'b4c_leper'].includes(S.card)],
];

/* ---- the journal, the count and the Deeds, by book (38b handles Books One and Two; 60 Book Three) ---- */
{ const _jn = journalNotes; journalNotes = function(){ const out = _jn(); if (!b4On()) return out; const i = S.imported;
    out.unshift(i ? `The squad, from Sergeant ${esc(i.from)}'s Book Two: into Aren on the ${i.road === 'wickans' ? 'Wickan' : 'Aren Guard'} road.${b4Fallen().length ? ` ${esc(b4FallenNames())} stayed on the Barrow.` : ''}` : `The squad came off the Chain into Aren. Sathi stayed on the Barrow, and Hackle was not seen again.`);
    return out; }; }
{ const _sr = statsRows; statsRows = function(s){ const r = _sr(s); if (!s || s.book !== 'hoc') return r;
    const st = s.stats || {};
    r.push(['Nerve, now', `${s.nerve != null ? s.nerve : B4_NERVE0} of ${NERVE_MAX}`], ['Dust, now', `${s.dust || 0} of 3`], ['Sorcery that sputtered in the dust', (s.f && s.f.b4_sputters) || 0]);
    if (st.nerveUp || st.nerveDown) r.push(['Nerve won and lost', `${st.nerveUp || 0} won, ${st.nerveDown || 0} lost`]);
    if (st.b4Broke) r.push(['Regulars who broke', st.b4Broke]);
    return r; }; }
function b4DeedsExtra(mine){
  const fin = mine.filter(({s}) => bookDone(s)), nerve = mine.map(({s}) => s.nerve != null ? s.nerve : B4_NERVE0);
  const rows = [['Most nerve, now', mine.length ? Math.max(...nerve) : 'Not yet'], ['Came with the squad from Book Two', mine.filter(({s}) => s.imported).length || 'None yet'],
    ['Regulars who broke', mine.reduce((a, {s}) => a + ((s.f && s.f.b4_broke) || 0), 0) || 'None yet'], ['Finished at Raraku', fin.length || 'Not yet']];
  return `<h4 class="jh">Nerve and Dust</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }

/* ---- Book Four's road map: Aren, the Aren Way and Coltaine's Fall, the Vathar, the hills, the Whirlwind Wall, Pan'arak, Raraku ---- */
const ROUTE_B4 = [ // chapter -> where (a sketch: Aren on the coast, Raraku inland to the north-east)
  {x:.16, y:.86, t:'Aren', a:'l'}, {x:.2, y:.82, t:'Aren · the muster'}, {x:.26, y:.7, t:'Coltaine\'s Fall', a:'l'}, {x:.36, y:.58, t:'The Vathar'},
  {x:.48, y:.5, t:'The hills', a:'l'}, {x:.6, y:.38, t:'The Whirlwind Wall'}, {x:.7, y:.27, t:'Pan\'arak', a:'l'}, {x:.78, y:.2, t:'Raraku'}];
function drawB4Route(cv, s, t){
  const dpr = Math.min(2, window.devicePixelRatio || 1), W = cv.clientWidth, H = cv.clientHeight; if (!W) return;
  if (cv.width !== Math.round(W*dpr)) { cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr); }
  const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#2e2618'); bg.addColorStop(1, '#1c170e'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 60; i++) ctx.fillRect(hash(i, 33)*W, hash(i, 34)*H, 1 + hash(i, 35)*2, 1);
  ctx.fillStyle = '#16304a'; ctx.beginPath(); ctx.moveTo(0, H*.7); ctx.quadraticCurveTo(W*.12, H*.84, W*.22, H); ctx.lineTo(0, H); ctx.fill(); // Aren Bay
  ctx.fillStyle = 'rgba(106,168,255,.25)'; ctx.font = `italic ${Math.round(Math.max(9, H*.05))}px 'IM Fell English', serif`; ctx.textAlign = 'left'; ctx.fillText('Aren Bay', W*.02, H*.97);
  ctx.strokeStyle = 'rgba(106,168,255,.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W*.24, H*.5); ctx.quadraticCurveTo(W*.36, H*.6, W*.5, H*.66); ctx.stroke(); // the Vathar
  for (let i = 0; i < 14; i++) { ctx.fillStyle = 'rgba(210,180,120,.10)'; ctx.fillRect(W*(.4 + hash(i, 36)*.5), H*(.1 + hash(i, 37)*.5), 12, 1); } // dunes
  const done = bookDone(s), ch = s.chapter || 0, ww = (Math.sin(t/900) + 1)/2;
  ctx.strokeStyle = `rgba(214,184,122,${.14 + ww*.06})`; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(W*.8, H*.18, Math.min(W, H)*.16, 0, 7); ctx.stroke(); // the Whirlwind's wall round Raraku
  if (done) { ctx.fillStyle = 'rgba(80,130,180,.35)'; ctx.beginPath(); ctx.ellipse(W*.8, H*.18, Math.min(W, H)*.1, Math.min(W, H)*.07, 0, 0, 7); ctx.fill(); } // a sea where the desert was
  const pts = ROUTE_B4.filter((r, n) => n <= ch).map(r => ({x:r.x*W, y:r.y*H}));
  ctx.strokeStyle = 'rgba(232,192,115,.8)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke(); ctx.setLineDash([]);
  ROUTE_B4.forEach((r, n) => { if (n === 1) return; const x = r.x*W, y = r.y*H, on = n === 0 || n <= ch, here = (n === 0 ? ch <= 1 : n === ch) && !done && ch > 0;
    if (!on) { ctx.fillStyle = 'rgba(200,190,170,.18)'; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill(); return; }
    if (here) glow(ctx, x, y, 18, '#e8c073', .35 + Math.sin(t/300)*.15);
    ctx.fillStyle = here ? '#f6dca0' : '#c9a35a'; ctx.beginPath(); ctx.arc(x, y, here ? 5 : 3.5, 0, 7); ctx.fill();
    ctx.fillStyle = here ? '#f2dca6' : 'rgba(230,218,194,.7)'; ctx.font = `600 ${Math.round(Math.max(9, Math.min(13, W*.028)))}px 'Alegreya Sans SC', sans-serif`; ctx.textAlign = r.a === 'l' ? 'right' : 'left';
    ctx.fillText(r.t, x + (r.a === 'l' ? -8 : 8), y - 6); });
}
{ const _drawRoute = drawRoute; drawRoute = function(cv, s, t){ return bookOf(s) === 'hoc' ? drawB4Route(cv, s, t) : _drawRoute(cv, s, t); }; }

/* ---- backdrops for Book Four's reading places and marches (the chapters add their own and may replace these; until then each reuses a
   Book Two or Three drawing of a like place) ---- */
const B4_SCENE_LIKE = {b4_aren_yard:'b2_camp_night', b4_road_fire:'b2_aren_way_dusk', b4_feast:'b2_sanimon_hills', b4_seti_fire:'b2_camp_night', b4_wall_fire:'b2_dry_march',
  b4_picket:'b2_geleen_moon', b4_coral:'b3_c7_shore_night', b4_march:'b2_odhan_day', b4_march_dusk:'b2_odhan_dusk'};
Object.assign(SCENES, {
  b4_aren_yard:{loc:'Aren', sub:'The 9th\'s barracks yard · night', cap:'Lamps in the barracks windows, a legion of recruits failing to sleep, and the old graveyard over the wall.', amb:'explore'},
  b4_road_fire:{loc:'The Aren Way', sub:'Below Coltaine\'s Fall · night', cap:'A fire off the road, the empty trees along it, and the hill above with the pilgrims\' braids on it.', amb:'explore'},
  b4_feast:{loc:'The Vathar Hills', sub:'The Khundryl fires', cap:'Three thousand riders round their fires, grieving loudly, and the Fourteenth getting drunk among them.', amb:'explore'},
  b4_seti_fire:{loc:'The column\'s camp', sub:'The Seti wounded · night', cap:'Wounded horse-warriors under blankets by a low fire, and the burnt wagons still smoking.', amb:'explore'},
  b4_wall_fire:{loc:'Short of the Wall', sub:'The Whirlwind · night', cap:'A fire in the lee of a rock, and beyond it the Whirlwind, standing up out of the desert like a cliff of sand.', amb:'explore'},
  b4_picket:{loc:'Before Pan\'arak', sub:'The picket line · night', cap:'A line of shallow scrapes in the sand, the rebel fires across the basin, and nothing to do but watch.', amb:'explore'},
  b4_coral:{loc:'Raraku', sub:'A coral island · after the flood', cap:'Coral that was a desert floor yesterday, and water to the edge of sight where there was sand.', amb:'explore'},
  b4_march:{loc:'The march north', sub:'The Fourteenth\'s column', cap:'A road of dust a league long, and the column in it, and the sun.', amb:'explore'},
  b4_march_dusk:{loc:'The march north', sub:'The column at dusk', cap:'The column halting, fires going up along it, and the dust settling.', amb:'explore'},
});
Object.entries(B4_SCENE_LIKE).forEach(([k, like]) => { SCENEX[k] ??= (cv, t) => (SCENEX[like] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); });

/* ---- engine text that reads Book One's flags, given Book Four's own words while S.book is 'hoc' (each falls through to the book before) ---- */
{ const B4FIN = {squad:'The squad', sgtRole:'Sergeant · Third squad, 9th Legion', road:'The squad\'s road', prologue:false, paper:false,
    list:()=>['The roll', `${Object.keys((S && S.dead) || {}).length} names`], noDead:'None of the squad. Every one of them walked out of Raraku.', endline:'The End of <em>Unblooded</em>'};
  Object.keys(B4FIN).forEach(k => { const prev = Object.getOwnPropertyDescriptor(FIN_L, k);
    Object.defineProperty(FIN_L, k, {configurable:true, enumerable:true, get(){ return b4On() ? B4FIN[k] : prev && prev.get ? prev.get() : prev && prev.value; }, set(v){ /* kept per book */ }}); }); }
/* the chapter card and end screen fall back to Book One's places by chapter number when a chapter names no scene: in Book Four, Aren, then the march */
{ const _sci = showChapterIntro; showChapterIntro = function(){ const r = _sci(); const CH = CHAPTERS[S && S.chapter];
    if (b4On() && CH && !(CH.intro && CH.intro.scene)) { G.sceneKind = S.chapter === 1 ? 'b4_aren_yard' : 'b4_march'; AUDIO.setScene(sceneAmb(G.sceneKind, 'explore')); } return r; }; }
{ const _sce = showChapterEnd; showChapterEnd = function(...a){ const r = _sce(...a); const CH = CHAPTERS[S && S.chapter];
    if (b4On() && CH && !CH.endScene) G.sceneKind = S.chapter === 1 ? 'b4_aren_yard' : 'b4_march_dusk'; return r; }; }
{ const _mc = MUNI.cusser[2];
  MUNI.cusser[2] = () => b4On() ? `The big one. Fired from the cradle under a crossbow, never thrown by anyone who wants to keep the arm.${b4In('tangle') ? ' Tangle counts the cussers last, and twice.' : ''}` : (typeof _mc === 'function' ? _mc() : _mc); }

/* Book Four's chapters register in start() (90), after Book Three's: registerChapter(n, B4CHn, 'hoc') */

/* each chapter publishes its key values here (B4KEYS[n] = ['x','y']): tools/play.mjs --from=N builds earlier chapters' keys from it.
   These are the plan's draft keys (book4-hoc-plan.md, "Key choices"); the book brief fixes them, and a chapter may replace its row. */
const B4KEYS = {1:['grave', 'chain'], 2:['fall', 'march'], 3:['carry', 'blow'], 4:['seti', 'picket'], 5:['seep', 'column'], 6:['hold', 'forward'], 7:['line', 'horse', 'ledger']};
