/* ============ Book Five: Indebted (beside Midnight Tides) — a Letherii squad of the Whitefinder Battalion, and Debt ============ */
/* Book Five is a new cast, as Book Two was: the Sixth Company's sergeant and four soldiers of a company of the Whitefinder Battalion, from
   Letheras north to Trate, Kraig's Landing and High Fort, and back south to Brans Keep and the fall of Letheras. Nothing carries in.
   Its chapters register with registerChapter(n, B5CHn, 'mt') (90) and every id carries a b5_ prefix (areas, nodes, fights, foes, gear,
   scenes, tricks, flags S.f.b5_*). This file holds what the book needs outside a chapter: the sergeant's Book Five history, the four, the
   three recruits (Ruuk, Brune, Pessa), the company's Finadd, Debt (in docks), the surgeon's and the cadre mage's hands re-told in Lether's
   words, the gods, the foes, the glossary, the journal, the count, Deeds, the road map, the backdrops, the finale defaults and B5KEYS.
   Everything here is guarded by S.book === 'mt' (or BOOK === 'mt'); Books One to Four play exactly as before.
   The names a chapter writer uses are listed in docs/v8.0-notes.md, "For chapter writers". Canon: docs/mt-canon.md (binding). */

const MT_PORDER = ['sgt', 'tobet', 'thegg', 'perrit', 'ammet'];   // the sergeant and the four, in the order they walk
const B5_RECRUITS = ['ruuk', 'brune', 'pessa'];                  // Brune (Ch 2, at Trate), Ruuk (Ch 3, at Kraig's Landing), Pessa (Ch 5)
const b5On = () => !!(S && S.book === 'mt');
const b5In = id => !!(S && Array.isArray(S.squad) && S.squad.includes(id) && !(S.dead && S.dead[id]));
const b5He = id => ['perrit', 'ammet', 'pessa', 'brune'].includes(id) ? 'she' : 'he'; // the sergeant is never gendered: chapters say "you"
const b5His = id => b5He(id) === 'she' ? 'her' : 'his', b5Him = id => b5He(id) === 'she' ? 'her' : 'him';
/* the company's officer: a regular, never a TPL. Ranks are Letherii (Preda, Atri-Preda, Finadd); "sergeant" is plain English (mt-canon §2) */
const B5_FINADD = {name:'Finadd Ravel Ennic', short:'Ennic', he:true};
const b5Coin = n => `${n} dock${n === 1 ? '' : 's'}`; // Book Five counts its money in docks only, and never gives an exchange rate

/* ---- the sergeant in Book Five: a Letherii sergeant of the Sixth Company (the same hands as Book Two's: stats and abilities) ---- */
BOOKSNAP.mt.sgt = Object.getOwnPropertyDescriptors({
  name:'', role:'Sergeant', sig:'S', col:'#d6a24a', hp:22, ac:14, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, st:{might:2, wits:2, guile:1}, ab:['rally','shove','salve'],
  epithet:'Sixth Company, the Whitefinder Battalion', origin:'Letheras, two streets back from the Quillas Canal', age:34, service:'Twelve years, the last five as the Sixth Company\'s sergeant', height:'Middling, with the forward lean of a soldier who has carried a pack for twelve years.',
  weapon:'A Letherii shortsword, and a round shield with a white fingertip painted on the boss, as the whole battalion paints it', armour:'Scale over a padded coat, the company\'s blue-grey cloak, and a purse on a thong that is mostly for show',
  bio:`Born two streets back from the Quillas Canal, where every child learns to swim early, and learns why. Your father's debt became your mother's, and then yours, the way debts do in Lether.\n\nAt twenty-two you signed it over to the army. The army bought it from the holder for less than it was worth, and has been taking it back out of your pay ever since. It is the best bargain you ever made, and you still check the sums.`,
  get bio2(){ const d = b5Debt('sgt'), d0 = b5DebtStart('sgt');
    return `The paybook says you owe ${b5Coin(d)}.${d < d0 ? ` It said ${b5Coin(d0)} when the company marched.` : ` It said four hundred and twelve when you made sergeant. That is the whole of your career, in one number, and you know it to the dock.`}\n\nThe Sixth Company has been yours for five years. Finadd Ennic signs what you put in front of him and lets you run it. The Errant is Lether's god of chance and bad impulses, and every soldier prays to him before a wager. You pray to him before everything.`; },
  traits:['Counts in docks without moving your lips', 'Swims well, and never says so', 'Knows the company\'s debts better than its birthdays', 'Touches the white fingertip on the shield before a fight, for the Errant'],
  gear:['A paybook with twelve years of deductions in it', 'A dock with a hole bored through it, on a cord', 'Field kit: needle, thread, salt'],
  get quest(){ return `The Edur in the north are a rumour this year, and the King is sending a delegation to talk to them. The Whitefinders train in the south. The Sixth Company goes where it is told, and you mean to come out of this war owing less than you went in.`; },
});

/* ---- the four, and the three recruits: full templates at base (level 1) numbers, sized like Book Two's squad ---- */
Object.assign(TPL, {
  tobet:{name:'Tobet', role:'Bowman · Indebted', sig:'T', col:'#b8a070', hp:15, ac:12, atk:4, dmg:[1,8,1], rng:6, mv:5, init:2, st:{might:1, wits:1, guile:2}, ab:['mark','salve'],
    epithet:'"The army owns my debt now. It is a better master than the last one. Mostly."', origin:'A tenant farm east of Letheras, held against a debt', age:22, service:'Two years, bowman, since the army bought his debt', height:'Narrow, quick, and always half a step behind whoever is talking, out of habit.',
    weapon:'A yew bow, a Letherii issue quiver, and a bone-handled knife he uses for everything else', armour:'A padded jack, a leather bracer, and the company\'s cloak, cut down to fit',
    bio:`Born Indebted, to a family that was Indebted before him, on a farm that belonged to the man who held the debt. His grandfather borrowed for a plough. Tobet has paid on that plough every year of his life and has never seen it.\n\nThe army bought the debt from the holder two years ago, as it buys a great many, and Tobet came with it. They gave him a bow because he could already use one, from shooting the holder's birds for the holder's table.`,
    get bio2(){ const d = b5Debt('tobet');
      return `In the ranks an Indebted soldier is a soldier like any other, the recruiters say, which is nearly true. His pay goes to the ledger before it goes to him. What is left buys arrows.\n\n${d > 0 ? `The ledger says ${b5Coin(d)}. He has done the sum. At a soldier's pay, if nothing goes wrong, he will be clear at fifty-one. He has decided that something will go right instead.` : `The ledger says nothing. He has read the line where it says nothing eleven times, and has not yet decided what a man does next.`}`; },
    traits:['Answers to "you" faster than to his name', 'Counts arrows, then debts, then arrows', 'Will not sit in a chair with arms', 'Laughs at the Drownings jokes, and does not mean it'],
    gear:['A tally-stick with two years of notches', 'Spare bowstrings in waxed cloth', 'A feather from the holder\'s birds, kept out of spite'],
    get quest(){ const s = b5Standing('tobet'); return s === 'free' ? `Tobet owes nobody anything. He walks the same, eats the same and stands his watch the same, and every so often he stops, as if somebody had called him, and nobody has.` : `The army bought him. Somewhere ahead is the day the army sells him back to himself. He keeps the tally-stick, and he has started to believe in the day, which frightens him more than the Edur.`; },
    banter:[`"Sergeant." Quietly, and a half-step behind, the way he says everything.`, `"The holder used to say a debt is a promise. I said the plough promised nothing. He added a dock for the answer."`, `"From back here, Sergeant, everything owes me money. It helps me aim."`],
    rel:{thegg:'Thegg lifts him over walls without asking. Tobet has stopped minding, and started counting on it.', perrit:'She reads the tiles for the squad. He asks her, every time, if there is a tile for a man who is paid up. She says she is looking.', ammet:'Ammet stitched his bow-hand and charged him nothing. He wrote it in the tally-stick anyway.', ruuk:'Two who grew up watching birds. They do not talk about it. They watch birds.', brune:'She asked what Indebted means. He told her. She said the Shake have a word for it too, and it means the same, and it is not a nice word.', pessa:'The press-gang wrote a debt beside her name. He showed her how to read the ledger line, so she can watch it.'}},
  thegg:{name:'Thegg', role:'Shield · Tarthenal half-blood', sig:'G', col:'#9a8466', hp:26, ac:15, atk:4, dmg:[1,8,2], rng:1, mv:4, init:0, st:{might:3, wits:0, guile:1}, ab:['bash','salve'],
    epithet:'"Stand behind me. That is what I am for, and I am very good at it."', origin:'A pit town outside Letheras, the Tarthenal side', age:29, service:'Seven years, shield, all of them in the Sixth', height:'Head and shoulders over the company, and wider than the doors he has to turn sideways for.',
    weapon:'A Letherii broadsword that looks like a knife in his hand, and a tower shield the quartermaster had made twice', armour:'Two sets of scale riveted into one, and a cloak the company tailor gave up on',
    bio:`His mother was Tarthenal and his father was not, and neither of them is a thing he talks about at length. He grew up in the pit towns outside Letheras, where what is left of the Tarthenal lives, mostly on drink and mostly on credit.\n\nHe joined at twenty-two because the tavern in the pit town held his mother's debt, and the army was the only place that would take the debt and him together, and stop it growing.`,
    get bio2(){ const d = b5Debt('thegg');
      return `He is very big, and very calm, and slower to anger than anyone in the company, which is lucky for the company. Ammet has listened to his chest with her ear against the scale and said nothing, which is the most anyone has got out of her about it.\n\n${d > 0 ? `${b5Coin(d)} left on his mother's tab.` : `His mother's tab is paid. He went to the pit town to tell the tavern so, and came back with a split lip and the receipt.`} He does not pray to his mother's people's gods. Nobody sane does. He talks to her dead instead, at night, in a voice like a cart going over a bridge.`; },
    traits:['Turns sideways for doors, and for people', 'Eats a second ration if one is going, and asks first', 'Talks to the dead at night, low, in a tongue the company does not have', 'Never once raised his voice in the Sixth'],
    gear:['A receipt from the pit-town tavern, folded small', 'A whetstone the size of a brick', 'A string of his mother\'s clay beads'],
    get quest(){ return `The Tarthenal had a country once, north-west of Letheras, before Lether ate it. Some of its towns still have Tarthenal names. Thegg has never been. He would like to see one, once, from the road, and has not said so to anyone but the dead.`; },
    banter:[`"Behind me, Sergeant. No, further. There."`, `"My mother said the Letherii count everything. She said it as a curse. I say it as a sergeant would."`, `"I am not angry. When I am angry you will know, because I will stop talking. I am talking."`],
    rel:{tobet:'Lifts the boy over walls without asking. He thinks Tobet weighs about as much as the tower shield, and treats him as carefully.', perrit:'She asked him once whether the Tarthenal read tiles. He said the Tarthenal mostly read tavern slates. She laughed, and he was pleased for a day.', ammet:'She has listened to his chest and said nothing. He trusts her more for it than for anything she could have said.', ruuk:'The Faraed boy rides on his shoulders across a river once, and after that follows him like a dog. Thegg allows it.', brune:'Two peoples Lether ate. They do not compare. They share a fire, which is enough.', pessa:'He carries her pack the first week without being asked, and gives it back the second, which she understands better.'}},
  perrit:{name:'Perrit', role:'Cadre mage · the Holds', sig:'P', col:'#a8a0d8', hp:14, ac:12, atk:4, dmg:[1,6,1], rng:1, mv:4, init:1, st:{might:0, wits:3, guile:2}, ab:['b4_bolt','b4_gust','salve'], magic:true,
    epithet:'"The tiles do not lie. They also do not say what they mean."', origin:'Letheras, the Pursers\' District', age:26, service:'Three years at the cadre school, and two with the battalion', height:'Small and upright, and always slightly cold, as if the room were.',
    weapon:'A knife, and the sorcery of the Holds, when it consents', armour:'A padded coat with the cadre\'s grey piping, and a pouch of black tiles worn at the hip',
    bio:`A clerk's daughter from the Pursers' District who could make a lamp gutter by looking at it. The cadre found her that way. The school trained her in the Letherii way: sorcery drawn through the Holds, tidy and ruled, with lightning at the end of it for the army's use.\n\nThe school does not charge fees. It lends them. Perrit came out a cadre mage with a commission in the Whitefinders and a debt to the school that she pays every month, on the first, with a face like a closed door.`,
    get bio2(){ const d = b5Debt('perrit');
      return `She reads the tiles for the company, from a cadre set of her own: small tiles of black stone, polished by other hands before hers. Feather witches read the tiles for generations before the cadre did. Perrit reads them like a clerk, and is right often enough to make the company uneasy.\n\n${d > 0 ? `The school's ledger says ${b5Coin(d)}.` : `The school's ledger says she is paid. She has written to the school to make sure.`} She prays to the Empty Hold, which is the Letherii way, and expects nothing back, which is hers.`; },
    traits:['Lays out three tiles before breakfast, and puts them away without a word', 'Corrects the company\'s arithmetic, out loud', 'Never stands with her back to water', 'Keeps her tiles in a pouch she will not let anyone touch'],
    gear:['A cadre set of black tiles in a calfskin pouch', 'The school\'s ledger, a copy, in her own hand', 'A brass lamp-snuffer she was given on the first day'],
    get quest(){ return `The cadre says the war, when it comes, will be a mages' war, and the soldiers will be there to stand round the mages. Perrit has done the sums on that, too. She would like to be wrong about them, and is keeping the tiles close in case.`; },
    banter:[`"Three tiles this morning, Sergeant. I will not tell you which. You would only worry."`, `"Lightning is easy. Lightning in the right place is a skill. Lightning in the right place twice is a career."`, `"The Holds are not gods. They are where the gods were. That is either very comforting or not at all."`],
    rel:{tobet:'He asks every reading if there is a tile for a man who is paid up. She has not found one. She has started looking harder than she lets on.', thegg:'She asked him if the Tarthenal read tiles. "Tavern slates." She laughed out loud, which the company had not heard before.', ammet:'Sorcery and surgery: the mage and the surgeon have agreed not to discuss whose work is harder, and discuss it every night.', ruuk:'The Faraed boy will not look at her tiles. He says his grandmother would not have liked them. She has stopped laying them out where he can see.', brune:'Brune says the sea takes back everything, tiles too. Perrit says the sea is welcome to try.', pessa:'Pessa asked her to read for a dead husband. Perrit did, carefully, and lied about one tile, and has not told anyone.'}},
  ammet:{name:'Ammet', role:'Surgeon · the battalion', sig:'A', col:'#8fb39a', hp:15, ac:12, atk:2, dmg:[1,6,0], rng:1, mv:4, init:0, st:{might:1, wits:3, guile:0}, ab:['mend','wash','stanch','salve'], magic:true,
    epithet:'"Hold still. No, still. That is the whole of the art."', origin:'Letheras, the Down Market', age:41, service:'Nineteen years, the last eleven as a battalion surgeon', height:'Short, broad in the forearm, with a cutler\'s burn on one wrist and the patience of a stone.',
    weapon:'A surgeon\'s knife, and the heavy end of a splint when it is needed', armour:'A leather apron over a padded coat, and a roll of tools that clinks when she walks',
    bio:`An army surgeon, which in Lether means needle, gut, splints, hot iron and herbs, and no sorcery at all. The cadre's mages kill things. Ammet mends what they did not kill, and what the other side did, and she does it by hand.\n\nHer grandmother was half Nerek and knew the herbs, and taught her which leaf stops bleeding and which stops pain and which stops everything. The Letherii surgeons' guild taught her the rest, and sold her the tools on credit.`,
    get bio2(){ const d = b5Debt('ammet');
      return `${d > 0 ? `The cutler who made the tools still holds the note: ${b5Coin(d)}, after nineteen years of paying.` : `The tools are paid for. She went to the cutler with the last of it and he gave her a new needle for nothing, which she has not used, because it was a gift.`} She keeps them sharper than the cutler ever did.\n\nShe is not gentle, and she is not unkind, and she has noticed that soldiers find those the same thing when they are bleeding. She does not pray. She says that if a god wanted the work, it could come and hold the lamp.`; },
    traits:['Sharpens a needle while she talks to you', 'Says "still" the way other people say "please"', 'Keeps her grandmother\'s herbs in twists of paper, labelled in two hands', 'Will not drink the night before a fight, and drinks the night after'],
    gear:['A roll of surgeon\'s tools from a Letheras cutler', 'Twists of her grandmother\'s herbs, labelled', 'A length of clean gut on a reel, guarded'],
    get quest(){ return `The cadre say this war will be sorcery. Ammet has seen what sorcery leaves behind, and it is not much to stitch. She means to keep the Sixth in the kind of wounds she can sew, and has told the sergeant so, more than once, in front of the Finadd.`; },
    banter:[`"Hold still." It is not a request. It never is.`, `"Sorcery is very impressive. Then somebody has to sew it up."`, `"I charge nothing in the field. You will pay me back by not making me do that again."`],
    rel:{tobet:'She stitched his bow-hand and charged him nothing. He wrote it on his tally-stick anyway. She saw, and let him.', thegg:'She has listened to his chest and said nothing. He trusts her more for it. She noticed that, and kept saying nothing.', perrit:'Surgery and sorcery. They have agreed not to argue whose work is harder, and argue it every night.', ruuk:'The boy brings her herbs from the hills that her grandmother would have known. She knows half of them. She learns the other half.', brune:'Brune came to her with a fish-hook through her palm and asked her not to make a fuss. Ammet did not. They have been friends since.', pessa:'Pessa held the lamp for her the first night without being told. Ammet has decided she is the only one in the squad with any sense.'}},
  /* the recruits */
  ruuk:{name:'Ruuk', role:'Guide · Faraed', sig:'R', col:'#a88a5a', hp:14, ac:13, atk:4, dmg:[1,6,1], rng:4, mv:6, init:3, st:{might:1, wits:2, guile:2}, ab:['mark','salve'],
    epithet:'"The road is not where your map says. It never was. Come."', origin:'The Faraed hills of the north', age:17, service:'Two summers guiding for the army, paid by the day', height:'Thin, wiry, and always a little ahead of where he was a moment ago.',
    weapon:'A bundle of light throwing-spears and a hunting knife', armour:'Hide over wool, and a hood against the northern rain',
    bio:`One of the Faraed of the northern hills, a people Lether took a long time ago and has mostly forgotten it took. The army pays Faraed boys to find it the roads its maps get wrong. Ruuk has found it a good many, at a dock a day.\n\nHe throws a spear the way the Letherii throw dice: often, cheerfully, and expecting to win.`,
    bio2:`His clan owes a trader in Trate for a winter's grain, and the trader takes it out of Ruuk's day-rate, a few docks at a time. He does not complain. He says the trader is a bad man, but the grain was good.\n\nHe likes the Sixth because it pays on the day, and because the big Tarthenal carried him over a river once without being asked.`,
    traits:['Walks ahead and waits, and walks ahead again', 'Will not look at the cadre\'s tiles', 'Eats standing up', 'Names every bird, in Faraed, whether anyone asked or not'],
    gear:['Three light throwing-spears', 'A pouch of grain from the trader, for luck', 'A bird-bone whistle'],
    get quest(){ return `The army pays him to find roads. Lately it has asked about the roads into the Edur country, and the roads back, and which are quicker. Ruuk has answered. He has not said what he thinks it means, and he has started sleeping with his spears.`; },
    banter:[`"Not that way. The map lies. Come."`, `"My grandmother said the Letherii write everything down so they do not have to remember it. I remember it."`, `"That bird says rain. That bird always says rain. That bird is right."`],
    rel:{tobet:'They both grew up watching birds for somebody else\'s table. They watch birds together and do not discuss it.', thegg:'Thegg carried him over a river once. Ruuk follows him about now, and the big man allows it.', perrit:'He will not look at her tiles. He brings her a stone from every hill instead, which she keeps.', ammet:'He brings her herbs from the hills. She knows half of them. She is learning the other half from him.', brune:'Two peoples from the edges. They agree about the sea and the hills, which is to say not at all, and enjoy it.', pessa:'He finds her a road round every burnt village. She has noticed, and has not thanked him, which he prefers.'}},
  brune:{name:'Brune', role:'Fish-spear · the Shake', sig:'B', col:'#7a9aa0', hp:17, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:5, init:2, st:{might:2, wits:1, guile:1}, ab:['b2_lance','salve'],
    epithet:'"The Shore takes everything back. I would just like it to wait."', origin:'The central west coast, a Shake fishing village', age:24, service:'One season, hired on at Trate with her own spear', height:'Long-limbed and sea-weathered, salt in every crease of her.',
    weapon:'A barbed fish-spear, shortened for the press, and a gutting knife', armour:'Oiled sealskin over wool, and a cord of shells round her neck',
    bio:`One of the Shake, the first people of the central west coast, much married into and mostly forgotten by Lether. Her village fishes, and pays the harbour tax, and pays the boat tax, and the year the tax came twice it lost its boat.\n\nBrune walked up the coast to Trate with her fish-spear and hired on with the first company that would take a Shake, which was the Sixth, on loan to the harbour.`,
    bio2:`She owes the harbour master for the boat that is not hers any more, which is a Letherii joke she does not find funny. The Shake pray to the Shore, the sea that takes back everything. Brune prays to it every evening, with her feet in the water if there is water, and asks it, politely, to take its time.\n\nShe fights the way she fishes: patient, from a little way off, and then all at once.`,
    traits:['Stands with her feet in water whenever there is water', 'Says nothing for an hour, then something exact', 'Mends nets nobody has given her', 'Counts the tide, not the hours'],
    gear:['A cord of shells from her village beach', 'A net-needle of whale bone', 'The harbour master\'s receipt for a boat she no longer has'],
    get quest(){ return `The Shake raised no army when Lether came, and paid for it with their boats and their names. Brune does not want her people's name back. She wants a boat, and she has worked out that the army pays enough, in a war, to buy one.`; },
    banter:[`"The Shore takes everything back, Sergeant. It is in no hurry. Neither am I."`, `"Fish do not argue. That is the main difference between fish and soldiers."`, `"The tide is going out. Something always goes with it."`],
    rel:{tobet:'She told him the Shake have a word for Indebted too. It means the same, and it is not a nice word. He was glad to hear it.', thegg:'Two peoples Lether ate. They share a fire and do not compare.', perrit:'Brune says the sea will take back the tiles too. Perrit says the sea is welcome to try. They like each other.', ammet:'Ammet took a fish-hook out of her palm and did not make a fuss. Brune has not forgotten.', ruuk:'Hills and sea. They argue, cheerfully, and never settle it.', pessa:'Pessa grew up on the canals; Brune on the sea. They argue about water, and agree about boats.'}},
  pessa:{name:'Pessa', role:'Pressed · boathook', sig:'E', col:'#a8907a', hp:15, ac:12, atk:4, dmg:[1,6,1], rng:1, mv:5, init:3, st:{might:1, wits:1, guile:3}, ab:['grapple','salve'],
    epithet:'"I did not ask to be here. Since I am, give me something to hold."', origin:'A canal village north of Letheras, burned on the retreat', age:33, service:'A few days, pressed on the road south', height:'Lean and quick, with a boatwoman\'s shoulders and a burn-scar on one cheek.',
    weapon:'A canal boathook, iron-shod, and a short knife', armour:'A borrowed jack two sizes too big, and her own oilskin over it',
    bio:`She poled a grain barge on the canals north of the capital until the army came back down the road burning everything it could not carry. Her village was on the list. She was on the road with what she could carry when the press-gang found her, and it wrote her name in its ledger.\n\nIt wrote a debt beside her name, for the jack, the boots and the ration she had not asked for. She has been watching that line since.`,
    bio2:`She is quick with the boathook, which hooks a man as well as a mooring post, and quicker with her tongue, which the squad has decided to admire from a little way off.\n\nShe had a husband. She mentions him the way you mention weather that has passed. She does not pray. She says the Errant has had his chance.`,
    traits:['Holds the boathook like a pole, upright, at rest', 'Reads the ledger line beside her name every pay-day', 'Swears in canal cant, which is very specific', 'Finds the driest place to sleep before anyone else has looked'],
    gear:['The boathook from her barge', 'A burnt corner of the barge\'s name-board', 'The press-gang\'s chit, with her name spelled wrong'],
    get quest(){ return `The army burned her village to keep the Edur from eating it, and then pressed her to fight the Edur. She has not decided which of them she is angrier with. She has decided to live long enough to find out.`; },
    banter:[`"I am not a soldier. I am a woman with a boathook and a grievance. Point me at something."`, `"They wrote me down for the boots. These boots. I would like to show you these boots."`, `"On the canal we say the water does not care. It is the kindest thing we say."`],
    rel:{tobet:'He showed her how to read the ledger line beside her name. She reads it every pay-day, out loud, at him.', thegg:'He carried her pack the first week and gave it back the second. She understood that better than kindness.', perrit:'She asked Perrit to read for a dead man. Perrit did, carefully. Pessa thinks one tile was a lie, and is grateful.', ammet:'She held the lamp for the surgeon the first night without being told. Ammet has decided she has sense.', ruuk:'The Faraed boy finds her a road round every burnt village. She has not thanked him. He prefers it.', brune:'Canal and sea. They argue about water, and agree about boats.'}},
});
Object.assign(VERB, {tobet:'looses an arrow at', thegg:'cuts at', perrit:'slashes a knife at', ammet:'jabs a surgeon\'s knife at', ruuk:'throws a spear at', brune:'drives the fish-spear at', pessa:'swings the boathook at'});
Object.assign(STATUP, {tobet:['guile', 'wits'], thegg:['might', 'wits'], perrit:['wits', 'guile'], ammet:['wits', 'might'], ruuk:['guile', 'might'], brune:['might', 'guile'], pessa:['guile', 'might']});
Object.assign(PICKS[3], {
  tobet:[['quickshot', 'Two Before One', 'Once a fight: two arrows at one target within reach (three from level 6). The holder\'s birds never sat still for the second.'], ['ghost', 'Small Target', 'Enemies take −2 to hit Tobet. An Indebted boy learns early to be somewhere the blow is not.']],
  thegg:[['shieldwall', 'Behind Me', 'Squadmates standing next to Thegg get +2 armour. There is a great deal of him to stand behind.'], ['holdline', 'Like a Hill', 'Thegg\'s free swings are unlimited and hit +2. Going round him takes a long time, and he is not idle while you do it.']],
  perrit:[['b4_stormeye', 'The Long Tile', 'The cadre\'s lightning reaches 6 tiles and strikes at +3. The school taught distance first, because the army asked for it.'], ['b4_squall', 'The Hold Breathes Out', 'The Hold\'s Shove throws one tile further, and does 1d6 instead of 1d4. She has learned to lean on it.']],
  ammet:[['triage', 'Field Surgery', 'Needle and Gut heals +3 and reaches 4 tiles. Nineteen years of crawling to whoever is screaming loudest.'], ['argument', 'Hot Iron', 'Once a fight: a downed squadmate within 2 stands up at 6 health. Strain 3. Smelling salts, a hot iron, and a voice they cannot ignore.']],
  ruuk:[['ghost', 'Faraed Feet', 'Enemies take −2 to hit Ruuk. In the hills a boy who is where you aimed does not grow up.'], ['sappers_eye', 'Reads the Ground', 'The squad rolls +2 initiative, and Ruuk\'s free swings hit +2. He saw the way in before you did, and the way out.']],
  brune:[['ghost', 'Wet Sand', 'Enemies take −2 to hit Brune. She moves like the tide does: never quite where you left it.'], ['holdline', 'The Tide Line', 'Brune\'s free swings are unlimited and hit +2. Whatever comes past the fish-spear comes past it slowly.']],
  pessa:[['snare', 'The Mooring Twist', 'Whatever the boathook hauls in is tangled: −2 to hit and −2 armour through its next turn. She has moored a barge in a gale.'], ['ghost', 'Keeps Low', 'Enemies take −2 to hit Pessa. On the road south she learned to be small.']],
});

/* ---- the gods who answer in Book Five (31c BOONS, 19e sigils): the Errant for the sergeant, the Empty Hold for Perrit, the Tarthenal dead for
   Thegg (an invention: the Tarthenal's own gods are malign and never a patron), the Shore for Brune. The Errant is Lether's god of chance as
   the Letherii pray to him, nothing more (mt-canon §10 rule 31). ---- */
const PATRON_ERRANT = {sig:'errant', god:'the Errant', title:'The Errant, god of chance', txt:id => `There is a dock on the ground by your hand that was not there a moment ago, an old one, worn smooth, with a hole bored through it. It is standing on its edge.\n\nEvery soldier in Lether prays to the Errant before a wager. He is the god of chance and fateful circumstance and the impulse you should not have followed, and he has always liked a soldier who follows it anyway. The coin falls. It falls your way.`};
Object.assign(PATRONS, {
  perrit:{sig:'perrit', god:'the Empty Hold', title:'The Empty Hold', txt:id => `Perrit's pouch of tiles spills on the ground as she goes down, and one of them lands face up and stays face up while the rest go dark: the tile with a hand held open at its edge.\n\nThe Empty Hold is the heart of Letherii worship, the throne that knew no king, and the hand on the tile belongs to nobody the tile will name. It opens anyway, over the squad. Perrit, when she can talk again, says she did not expect that, and that she will not expect it again.`},
  thegg:{sig:'thegg', god:'the Tarthenal dead', title:'The Tarthenal dead', txt:id => `Thegg goes down on one knee and stays there, and says something low in his mother's tongue to the ground, in the voice he uses at night.\n\nThe ground answers. Nobody sees them, quite: only that the squad's shadows are suddenly very tall, and very broad, and there are more of them than there are soldiers. The Tarthenal dead are patient. They have had a great deal of practice. They stand behind the boy until he gets up.`},
  brune:{sig:'brune', god:'the Shore', title:'The Shore', txt:id => `Brune, flat on her back, laughs, which nobody expected, and says, "Not yet," to something that is not in the fight.\n\nThere is the sound of surf where there is no sea, and the smell of weed, and the ground under the squad goes wet and cold and moves, the way sand moves under your feet when a wave goes out. The Shore takes everything back. It has decided, for now, to take back the enemy first.`},
});
{ const prev = Object.getOwnPropertyDescriptor(PATRONS, 'sgt');
  Object.defineProperty(PATRONS, 'sgt', {configurable:true, enumerable:true, get(){ return S && S.book === 'mt' ? PATRON_ERRANT : prev.get ? prev.get() : prev.value; }, set(v){ /* kept per book */ }}); }

/* ---- the surgeon's hands and the cadre's sorcery, in Lether's words. No new mechanics: Ammet's work is Ohl's mend, wash, stanch and argument,
   told as needle, gut, splints and hot iron (no sorcery: the warren never weakens it); Perrit's is Yorin's lightning and shove, drawn through
   the Holds; Pessa's boathook is Vell's hook; Brune's fish-spear is Ramin's short lance. Names and words change in Book Five only. ---- */
const b5Surgeon = () => (B && B.cur && B.cur.side === 'p' && B.cur.ab && B.cur.ab.includes('mend') && B.cur.id) || HEALER() || 'ammet';
const B5_ABX = {
  mend:{name:'Needle and Gut', desc:()=>{ const w = b5Surgeon(); return `Surgery on a squadmate within ${has(w, 'triage') ? 4 : 3}: 2d6+${(has(w, 'triage') ? 6 : 3) + lvB()}. Needle, gut and a steady hand, and no sorcery in it, so nothing on the field can thin it. Strain 3: the hands tire.`; },
    line:(u, t) => `${u.name} kneels over ${t ? t.name : 'the wound'} with needle and gut and sews fast, talking the whole time, mostly "still".`},
  wash:{name:'The Rounds', desc:()=>`${HEALER() ? NAME(HEALER()) : 'The surgeon'} and every squadmate within 3 heal 2d4+${2 + lvB()}, and their bleeding stops: water, clean linen and a fast round of everyone hurt. Grows with the squad's level. Strain 3.`,
    line:u => `${u.name} goes round the wounded at a crouching run with water and linen, binding as ${b5He(u.id)} goes.`},
  stanch:{name:'Tourniquet', desc:()=>'A squadmate within 3 cannot drop below 1 health until the surgeon\'s next turn, stops bleeding, and heals 1 for each squad level past the first. A strap and a stick, twisted hard. Strain 2.',
    line:(u, t) => `${u.name} gets a strap round ${t && t !== u ? `${t.name}'s` : 'the'} wound and twists the stick until it holds. ${t && t !== u ? t.name : 'Nobody'} is going anywhere until ${b5He(u.id)} says so.`},
  argument:{name:'Hot Iron', desc:()=>`Once a fight: a downed squadmate within 2 stands up at ${6 + 2 * lvB()} health. Smelling salts, a hot iron and a voice they cannot ignore. Strain 3.`,
    line:(u, t) => `${u.name} puts a hot iron to ${t ? t.name : 'the wound'} and says something short and filthy into ${t ? b5His(t.id) || 'their' : 'their'} ear. ${t ? t.name : 'They'} gets up, mostly to argue.`},
  b4_bolt:{name:'The Cadre\'s Lightning', desc:()=>{ const u = (B && B.cur && B.cur.id === 'perrit') ? B.cur : {id:'perrit'}; return `Letherii sorcery, drawn through the Holds: lightning on an enemy within ${b4BoltR(u)} in sight. It strikes at +${S && has('perrit', 'b4_stormeye') ? 3 : 2}: 2d6+${2 + lvDmg()} on a hit. Strain 2.`; },
    line:u => `${u.name} lays two fingers on a tile at ${b5His(u.id)} hip and says the cadre's word, and the Hold opens a crack.`},
  b4_gust:{name:'The Hold\'s Shove', desc:()=>`Letherii sorcery: a shove of the Hold's air at an enemy within 4. It and every enemy next to it are thrown straight back ${b4GustD({id:'perrit'})} tiles, ${S && has('perrit', 'b4_squall') ? '1d6' : '1d4'} each, and +1d6 into a wall or a body. Every squadmate a thrown enemy leaves gets a free swing. Toward a pit or a drop: a save to catch the lip. Bosses and the very heavy stagger and stay put. Strain 3.`,
    line:u => `${u.name} puts both palms out flat, the way the school taught, and the air in front of ${b5Him(u.id)} leaves all at once.`},
  grapple:{name:'Boathook', desc:()=>`Hook an enemy 2 to ${grapR()} tiles off with the boathook: 1d6+${1 + lvDmg()} on a hit, and it is hauled to the open tile beside Pessa nearest it. Hauled across a pit or a drop, it saves to catch the lip and go down prone, or goes in. Bosses and the very heavy take the hook but don't come. Recharges after ${2 - lvAt(6)} round${lvAt(6) ? '' : 's'}. Grows with level.`,
    map:[[/throws the hook at/g, 'swings the boathook at'], [/Vell lets go of the line before it takes him instead/g, 'Pessa lets go of the haft before it takes her instead'], [/beside Vell/g, 'beside Pessa'], [/Vell hauls on the line with his whole weight/g, 'Pessa hauls on the boathook with her whole weight'], [/tangled to the knees in tarred rope/g, 'tangled in the hook and its own feet'], [/\bVell\b/g, 'Pessa']]},
  b2_lance:{name:'The Fish-Spear', map:[[/drives the short lance at/g, 'drives the fish-spear at']]},
};
Object.entries(B5_ABX).forEach(([k, x]) => { const a = AB[k]; if (!a) return;
  ['name', 'desc'].forEach(f => { if (!x[f]) return; const d = Object.getOwnPropertyDescriptor(a, f); const base = d && 'value' in d ? d.value : undefined;
    Object.defineProperty(a, f, {configurable:true, enumerable:true, get(){ return b5On() ? x[f] : base; }, set(v){ /* fixed per book */ }}); });
  const run = a.run;
  a.run = function(u, x0, y0){ if (!b5On()) return run.call(this, u, x0, y0);
    const t = B && B.units.find(p => p.x === x0 && p.y === y0), _b = blog; let n = 0; const w0 = B && B.warren;
    blog = m => { let s = String(m); if (x.line && n === 0) s = x.line(u, t); if (x.map) x.map.forEach(([re, to]) => { s = s.replace(re, to); }); n++; return _b(s); };
    if (u && u.id === 'ammet' && B) B.warren = Object.assign({}, w0 || {}, {denul:1}); // surgery is not a warren: nothing thins it
    const done = () => { blog = _b; if (u && u.id === 'ammet' && B && w0) B.warren = w0; };
    let r; try { r = run.call(this, u, x0, y0); } catch (e) { done(); throw e; }
    if (r && r.then) return r.finally(done);
    done(); return r; }; });

/* ---- Debt: every soldier carries one, in docks (S.debt[id]). Paying it down is loyalty and freedom; letting it grow brings the collectors,
   and in Letheras the threat of the Drownings. A dead soldier's debt passes to the heirs with the lost kit (mt-canon §2): it is recorded
   (S.f.b5_heirs) and the squad is not charged for it. Starting debts are Claude's calls; each one's reason is in the soldier's bio. ----
   Standing, against the debt the soldier started the book with (S.debt0[id]):
     'free'     nothing owed                         (crossing into it: loyalty +1, once; S.f.b5_freed_<id>)
     'easing'   half the start or less               (crossing into it: loyalty +1, once; S.f.b5_eased_<id>)
     'held'     between
     'pressed'  more than 1.25 × the start           (crossing into it: loyalty −1, once; the collectors: S.f.b5_collectors counts)
     'drowning' 1.5 × the start or more              (in Letheras, Chapters 1 and 7, a Drowning is threatened: b5DrowningThreat())
   A soldier who started at nothing is 'pressed' from 50 docks and 'drowning' from 100. The sergeant has no loyalty to move. */
const B5_DEBT0 = {sgt:340, tobet:900, thegg:260, perrit:410, ammet:180, ruuk:40, brune:60, pessa:120};
const B5_EASE = .5, B5_PRESS = 1.25, B5_DROWN = 1.5;
const b5Debt = id => (S && S.debt && S.debt[id] != null ? S.debt[id] : (B5_DEBT0[id] || 0));
const b5DebtStart = id => (S && S.debt0 && S.debt0[id] != null ? S.debt0[id] : (B5_DEBT0[id] || 0));
function b5Standing(id){ const d = b5Debt(id), d0 = b5DebtStart(id); if (d <= 0) return 'free';
  const press = d0 > 0 ? d0 * B5_PRESS : 50, drown = d0 > 0 ? d0 * B5_DROWN : 100;
  return d >= drown ? 'drowning' : d > press ? 'pressed' : d0 > 0 && d <= d0 * B5_EASE ? 'easing' : 'held'; }
const B5_STANDW = {free:'paid up', easing:'easing', held:'held', pressed:'pressed by the collectors', drowning:'the canal is talked of'};
/* who counts: the living who walk, and the living at camp */
const b5Debtors = () => S ? [...new Set([...(S.squad || []), ...(S.camp || [])])].filter(id => (id === 'sgt' || TPL[id]) && !(S.dead && S.dead[id]) && B5_DEBT0[id] != null) : [];
const b5DebtTotal = () => b5Debtors().reduce((a, id) => a + b5Debt(id), 0);
const b5Collectors = () => b5Debtors().filter(id => ['pressed', 'drowning'].includes(b5Standing(id)));
const b5DrowningThreat = () => !!(b5On() && [1, 7].includes(S.chapter || 0) && b5Debtors().some(id => b5Standing(id) === 'drowning'));
function b5DebtInit(id){ if (!S) return; S.debt ??= {}; S.debt0 ??= {}; if (S.debt[id] == null) S.debt[id] = B5_DEBT0[id] || 0; if (S.debt0[id] == null) S.debt0[id] = S.debt[id]; }
/* what crossing a line means: said once, and loyalty moves once each way */
function b5Crossed(id, before){ const now = b5Standing(id); if (now === before) return;
  const rank = {free:0, easing:1, held:2, pressed:3, drowning:4}, who = id === 'sgt' ? 'You' : NAME(id);
  if (rank[now] < rank[before]) {
    if (now === 'free' && !S.f['b5_freed_' + id]) { S.f['b5_freed_' + id] = 1; tally('b5Freed'); note(`${who} ${id === 'sgt' ? 'owe' : 'owes'} nothing. The ledger line is closed.`, 'good'); if (id !== 'sgt' && S.loy[id] != null) loy(id, 1); }
    else if (now === 'easing' && !S.f['b5_eased_' + id]) { S.f['b5_eased_' + id] = 1; note(`${who} ${id === 'sgt' ? 'are' : 'is'} past half of it.`, 'good'); if (id !== 'sgt' && S.loy[id] != null) loy(id, 1); } }
  else {
    if ((now === 'pressed' || now === 'drowning') && !S.f['b5_pressed_' + id]) { S.f['b5_pressed_' + id] = 1; S.f.b5_collectors = (S.f.b5_collectors || 0) + 1; tally('b5Pressed');
      note(`${id === 'sgt' ? 'Your' : `${NAME(id)}'s`} debt has grown past what the holder will wait for. The collectors know the name.`, 'bad'); if (id !== 'sgt' && S.loy[id] != null) loy(id, -1); }
    if (now === 'drowning' && !S.f['b5_drown_' + id]) { S.f['b5_drown_' + id] = 1; S.f.b5_drownRisk = 1; note(`In Letheras, a debt that size goes into the canal with whoever owes it.`, 'bad'); } } }
/* a soldier owes more (n > 0) */
function b5Owe(id, n, why = ''){ if (!S || !(n > 0)) return 0; b5DebtInit(id); const before = b5Standing(id);
  S.debt[id] += n; tally('b5Owed', n);
  const s = `${why ? why + ': ' : ''}${id === 'sgt' ? 'you owe' : `${NAME(id)} owes`} ${b5Coin(n)} more.`; note(s.charAt(0).toUpperCase() + s.slice(1), 'bad');
  b5Crossed(id, before); updChain(); save(); return n; }
/* the squad pays down a soldier's debt out of its own docks (S.silver): as much as it has, up to what is owed. Returns what was paid. */
function b5Pay(id, n, why = ''){ if (!S) return 0; b5DebtInit(id); const before = b5Standing(id);
  const p = Math.max(0, Math.min(n, S.silver || 0, S.debt[id])); if (!p) { note(S.debt[id] <= 0 ? `${id === 'sgt' ? 'You owe' : `${NAME(id)} owes`} nothing to pay.` : 'Not a dock to spare.', 'bad'); return 0; }
  S.silver -= p; S.debt[id] -= p; tally('b5Paid', p);
  const s = `${why ? why + ': ' : ''}${b5Coin(p)} paid on ${id === 'sgt' ? 'your' : `${NAME(id)}'s`} debt.`; note(s.charAt(0).toUpperCase() + s.slice(1), 'good');
  b5Crossed(id, before); updChain(); save(); return p; }
/* a debt shrinks without the squad's docks (a bounty, a ledger burned, a holder dead): the story's to give */
function b5Forgive(id, n, why = ''){ if (!S || !(n > 0)) return 0; b5DebtInit(id); const before = b5Standing(id), p = Math.min(n, S.debt[id]); if (!p) return 0;
  S.debt[id] -= p; tally('b5Forgiven', p); const s = `${why ? why + ': ' : ''}${b5Coin(p)} off ${id === 'sgt' ? 'your' : `${NAME(id)}'s`} debt.`; note(s.charAt(0).toUpperCase() + s.slice(1), 'good');
  b5Crossed(id, before); updChain(); save(); return p; }
/* the widget for a node's html (Book Two's chain box): each debtor's debt against where it started */
function debtHTML(road){ const ids = b5Debtors();
  return `<div class="chainbox allybox" role="group" aria-label="The squad's debts">${road ? `<div class="road">${esc(road)}</div>` : ''}
    ${ids.map(id => { const d = b5Debt(id), d0 = Math.max(1, b5DebtStart(id)), st = b5Standing(id); return `<div class="crow"><span>${esc(id === 'sgt' ? 'You' : NAME(id))}</span><b>${b5Coin(d)} · ${B5_STANDW[st]}</b></div><div class="bar${st === 'pressed' || st === 'drowning' ? ' col' : ''}"><i style="width:${Math.min(100, Math.round(d / (d0 * B5_DROWN) * 100))}%"></i></div>`; }).join('')}
    <div class="crow"><span>The squad</span><b>${b5Coin(b5DebtTotal())} owed · ${b5Coin(S.silver || 0)} in hand</b></div></div>`; }
/* the HUD: the purse is in docks, and the pill beside it is the squad's debt */
{ const _updSilver = updSilver;
  updSilver = function(){ if (!b5On()) return _updSilver();
    const el = typeof document !== 'undefined' && document.getElementById('silver'); if (!el) return; const t = b5Coin(S.silver);
    if (el.textContent !== t) { el.textContent = t; if (silverShown != null && silverShown !== S.silver) { el.classList.remove('sup', 'sdown'); void el.offsetWidth; el.classList.add(S.silver > silverShown ? 'sup' : 'sdown'); } }
    silverShown = S.silver; updChain(); }; }
{ const _updChain = updChain;
  updChain = function(){ const el = typeof document !== 'undefined' && document.getElementById('chainp');
    if (!el || !S || S.book !== 'mt') return _updChain();
    const c = b5Collectors().length; el.innerHTML = `<span class="chainpill allypill"><span class="${c ? 'dry' : ''}">Debt <b>${b5DebtTotal()}</b></span>${c ? `<span class="dry">Collectors <b>${c}</b></span>` : ''}</span>`; }; }
/* the squad sheet: a Debt section on both tabs */
{ const _openChars = openChars;
  openChars = function(i, tab){ const r = _openChars(i, tab); if (!b5On()) return r;
    const m = typeof document !== 'undefined' && $('#chars'); if (!m || m.hidden) return r; const id = SQUAD()[charIdx]; if (!id || B5_DEBT0[id] == null) return r;
    const d = b5Debt(id), d0 = b5DebtStart(id), st = b5Standing(id), first = m.querySelector('.csheet .tabs + div .sec'); if (!first || m.querySelector('.sec.b5debt')) return r;
    const box = document.createElement('div'); box.className = 'sec b5debt';
    box.innerHTML = `<h4>Debt</h4><div class="kv"><span>Owed</span><span>${b5Coin(d)}</span><span>At the march</span><span>${b5Coin(d0)}</span><span>Standing</span><span>${esc(B5_STANDW[st])}</span></div><p class="fine">${id === 'sgt' ? 'Yours, to the army that bought it.' : `${esc(NAME(id))}'s, in docks.`} Paying it down is loyalty and freedom; letting it grow brings the collectors, and in Letheras the canal.</p>`;
    first.after(box); return r; }; }
/* a dead soldier's debt passes to the heirs, with the lost kit: written down, and not the squad's to pay */
{ const _kill = kill;
  kill = function(id){ const owed = b5On() && S.squad.includes(id) ? b5Debt(id) : 0; _kill(id);
    if (b5On() && S.dead && S.dead[id]) { S.f.b5_heirs ??= {}; S.f.b5_heirs[id] = owed; if (owed > 0) note(`${NAME(id)}'s debt, ${b5Coin(owed)}, passes to the heirs with the lost kit, as the army's ledger says it does. It is not the squad's to pay.`); save(); } }; }

/* ---- a fresh Book Five sergeant: level 1, cap 8, Book Two's curve and its picks (15 picksOwed). Nothing is carried in. ---- */
function newStateMT(name, sid){
  name = name || 'Hask';
  const s = {v:1, book:'mt', sid:sid || sidFor(name), name, scene:'chintro', node:null, bg:null, silver:12, xp:0, lvl:1, card:null,
    inv:{sharper:0, burner:0, cusser:0, salve:2, smoker:0}, loy:{tobet:0, thegg:0, perrit:0, ammet:0}, f:{}, pos:{x:5, y:8},
    trail:[{x:4, y:8}, {x:6, y:8}, {x:4, y:9}, {x:5, y:9}], log:[], ending:null, battle:null, bopt:null,
    squad:[...MT_PORDER], chapter:0, chapters:{}, area:'pale', dead:{},
    debt:Object.fromEntries(MT_PORDER.map(k => [k, B5_DEBT0[k]])), debt0:Object.fromEntries(MT_PORDER.map(k => [k, B5_DEBT0[k]]))};
  return migrate(s); }
{ const _migrate = migrate; migrate = function(s){ const r = _migrate(s); if (s && s.book === 'mt') { s.debt ??= {}; s.debt0 ??= {}; [...(s.squad || []), ...(s.camp || [])].forEach(k => { if (B5_DEBT0[k] == null) return; s.debt[k] ??= B5_DEBT0[k]; s.debt0[k] ??= s.debt[k]; }); } return r; }; }
/* a recruit joins the squad, not the Fourth; and brings a debt of their own */
{ const _recruit = recruit;
  recruit = function(id){ if (!b5On()) return _recruit(id); const n0 = note;
    note = (t, c) => n0(String(t).replace('joins the Fourth', 'joins the squad'), c); try { _recruit(id); } finally { note = n0; }
    if (B5_DEBT0[id] != null) b5DebtInit(id); save(); }; }
{ const _rest = rest; rest = function(t){ return _rest(t || (b5On() ? 'The squad rests in the company\'s lines. Wounds close, mostly.' : t)); }; }
const b5Rest = t => { if (!S) return false; const had = !!S.wounds; rest(t || 'The squad rests in the company\'s lines, with the Sixth snoring round it. Wounds close, mostly.'); if (!had) note('Rested.', 'good'); save(); return true; };
/* Lether has no Moranth munitions: the roster does not count a missing sapper against Book Five's squad */
{ const _rl = rosterLacks; rosterLacks = function(sq){ const r = _rl(sq); return b5On() ? r.filter(k => k !== 'munitions') : r; }; }

/* ---- the three recruits: Brune, of the Shake (Chapter 2, at Trate); Ruuk, a Faraed guide (Chapter 3, at Kraig's Landing); Pessa, a refugee pressed into the ranks
   (Chapter 5). Through the roster (38c), six at most. S.f.b5_ruukDone / b5_bruneDone / b5_pessaDone: 1 walks, 2 waits with their own people,
   0 sent away (set 0 yourself). b5Join(id) joins, or waits if there is no room; b5SwapIn(id) brings one in from waiting (the roster chooses). ---- */
const B5_DONE = {ruuk:'b5_ruukDone', brune:'b5_bruneDone', pessa:'b5_pessaDone'};
const B5_HOME = {ruuk:'the Faraed scouts\' fire', brune:'the Shake boats on the strand', pessa:'the refugee column'};
const b5Room = () => Math.max(0, ROSTER_CAP - ((S && S.squad) || []).length);
const b5Recruit_ = () => (S && Array.isArray(S.squad) && B5_RECRUITS.find(k => S.squad.includes(k))) || null;
const b5CanRecruit = id => !!(b5On() && TPL[id] && B5_RECRUITS.includes(id) && !(S.dead && S.dead[id]) && S.f[B5_DONE[id]] !== 0);
function b5Join(id){ if (!b5CanRecruit(id) || b5In(id)) return false;
  if (b5Room() <= 0) { S.f[B5_DONE[id]] = 2; S.camp = [...(S.camp || []).filter(x => x !== id), id]; b5DebtInit(id); S.loy[id] ??= 0; S.picks[id] ??= []; S.gear[id] ??= {};
    note(`${NAME(id)} stays with ${B5_HOME[id]} for now: no room in the squad. The roster at any fire can bring ${b5Him(id)} in.`); save(); return false; }
  S.f[B5_DONE[id]] = 1; recruit(id); return true; }
function b5SwapIn(id){ if (!b5CanRecruit(id) || b5In(id)) return false; if (b5Room() > 0) return rosterIn(id); const out = b5Recruit_(); return !!out && rosterSwap(out, id); }
const b5Waiting = id => !!(b5On() && S.f && S.f[B5_DONE[id]] === 2 && !b5In(id) && !(S.dead && S.dead[id]));
const b5Offers = () => B5_RECRUITS.filter(id => b5Waiting(id) && (b5Room() > 0 || !!b5Recruit_()));
/* who walked at a chapter's key (High Fort, Ch 4; Brans Keep, Ch 6): S.f.b5_c<n>_walked, the ids walking, sergeant included. Set when the key
   is chosen and again when its fight starts (a "Not now" between the two may bring a waiting recruit in at a fire), so the finale's fate
   pages credit the rampart and the crossing only to those who were there (87's b57HighFort / b57Channel). */
function b5MarkWalked(n){ if (!b5On() || !S.f) return; S.f[`b5_c${n}_walked`] = (S.squad || []).filter(id => !(S.dead && S.dead[id])); }
const B5_WALKED_AT = {b5_c4_demon:4, b5_c4_wolves:4, b5_c6_channel:6, b5_c6_flight:6};
{ const _sb = startBattle; startBattle = function(id, opt){ if (b5On() && B5_WALKED_AT[id] && !(opt && opt.stage === 2)) b5MarkWalked(B5_WALKED_AT[id]); return _sb.apply(this, arguments); }; }

/* ---- the pay desk: a shared body for every chapter's b5_c<n>_pay node. For each debtor who owes and while the squad has docks: "10 docks on
   X's" (or what there is, if less) and "All we can on X's" (when that is more than 10), each through b5Pay and back to the desk; then
   "Not now." to back. here: the desk's own node id (default: the node showing it). A chapter writes
     b5_c4_pay: () => ({sp:'The clerk', txt:'…', html:debtHTML('The Sixth Company'), ch:b5PayChoices('b5_c4_fire')}) ---- */
const B5_PAYSTEP = 10;
function b5PayChoices(back, here){ let at = here; const desk = () => talk(at || here), mark = () => { at = here || S.node; }, out = [];
  b5Debtors().forEach(id => { const who = id === 'sgt' ? 'your' : `${NAME(id)}'s`, can = () => Math.min(S.silver || 0, b5Debt(id));
    out.push({t:`${b5Coin(Math.min(B5_PAYSTEP, Math.max(1, can())))} on ${who} debt.`, req:()=>can() > 0, fx:()=>{ mark(); b5Pay(id, B5_PAYSTEP, 'At the pay desk'); }, go:desk});
    out.push({t:`All we can on ${who} debt.`, req:()=>can() > B5_PAYSTEP, fx:()=>{ mark(); b5Pay(id, can(), 'At the pay desk'); }, go:desk}); });
  out.push({t:'"Not now."', go:back});
  return out; }

/* ---- disarmed and rearmed (Chapter 4 on hold: the surrender at High Fort; Chapter 5: the cache and Brans Keep). b5Disarm() takes every
   weapon-slot item off every soldier (walking or at camp) and out of the kit into S.f.b5_stash (ids; S.f.b5_stashWho remembers who wore
   each) and sets S.f.b5_disarmed = 1. Armour and trinkets stay; the squad still fights with its base attacks, which are the knives and
   staves the Edur let them keep. Idempotent: a second call only sweeps up a weapon gained since. b5Rearm(fallback) clears b5_disarmed,
   gives back what was stashed (to whoever wore it, if they walk and the slot is free, else where it suits best), or, if the stash is
   empty (a fresh --from=5 save), the fallback item ids that exist; sets S.f.b5_rearmed = 1 and returns the ids given. Once only: a
   second call, or a call when not disarmed, gives nothing. ---- */
const b5IsWeapon = g => !!(g && ITEMS[g] && ITEMS[g].slot === 'weapon');
function b5Disarm(){ if (!b5On()) return 0;
  const stash = Array.isArray(S.f.b5_stash) ? S.f.b5_stash : [], who = S.f.b5_stashWho || {}, took = [];
  Object.entries(S.gear || {}).forEach(([w, g]) => { if (g && b5IsWeapon(g.weapon)) { who[g.weapon] ??= w; if (!took.includes(g.weapon)) took.push(g.weapon); delete g.weapon; } });
  (S.kit || []).filter(b5IsWeapon).forEach(g => { if (!took.includes(g)) took.push(g); });
  S.kit = (S.kit || []).filter(g => !b5IsWeapon(g));
  took.forEach(g => { if (!stash.includes(g)) stash.push(g); });
  const first = !S.f.b5_disarmed; S.f.b5_stash = stash; S.f.b5_stashWho = who; S.f.b5_disarmed = 1; delete S.f.b5_rearmed;
  if (first) note(`Swords, spears and bows go on the Edur's pile${took.length ? `, ${took.map(g => ITEMS[g].name.replace(/^An? /, 'the ').replace(/^The /, 'the ')).join(', ')} with them` : ''}. Knives, shields and paybooks stay.`, 'bad');
  save(); return took.length; }
function b5Rearm(fallback = []){ if (!b5On() || !S.f.b5_disarmed) return [];
  const stash = (Array.isArray(S.f.b5_stash) ? S.f.b5_stash : []).filter(g => ITEMS[g]), who = S.f.b5_stashWho || {};
  const give = (stash.length ? stash : (Array.isArray(fallback) ? fallback : [fallback])).filter(g => ITEMS[g]);
  delete S.f.b5_disarmed; S.f.b5_rearmed = 1; S.f.b5_stash = []; S.f.b5_stashWho = {}; S.kit ??= [];
  give.forEach(g => { if (S.kit.includes(g)) return; S.kit.push(g); const w = who[g], sl = ITEMS[g].slot;
    if (w && SQUAD().includes(w) && S.gear[w] && !S.gear[w][sl] && canWear(w, g)) S.gear[w][sl] = g; else placeGear(g); });
  armUnarmed(); // v8.1 (31c): nobody walks on with an empty hand while a spear or a bow they could carry lies in the pack
  note(give.length ? `The squad is armed again: ${give.map(g => ITEMS[g].name).join(', ')}.` : 'The squad is armed again, from what the quartermaster has.', 'good');
  save(); return give; }

/* ---- who reads the tiles in Book Five (36b visReader, 21's captions, 80c's readings): Perrit, while she walks and lives; otherwise the
   tile-woman, an old camp follower who reads for the company for a dock, whose name nobody has ---- */
{ const _vr = VISREADER;
  VISREADER = () => { if (!b5On()) return _vr ? _vr() : null;
    if (b5In('perrit')) return {id:'perrit', name:'Perrit', he:false};
    return {id:'tilewoman', name:'The tile-woman', mid:'the tile-woman', he:false}; }; }

/* ---- how far Book Five goes, for the title: with no chapter registered the book is 'coming' (off the shelf, the picker and Deeds);
   showTitle(false, 'mt') still dresses the title for it, and Begin says it is being written ---- */
const b5ChCount = () => Object.keys(BOOK === 'mt' ? CHAPTERS : BOOKSNAP.mt.ch).length;
const b5Progress = () => { const n = b5ChCount(); return n >= 7 ? 'All seven chapters.' : n === 0 ? 'Its chapters are being written.' : n === 1 ? 'Chapter One so far.' : `${['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'][n]} chapters so far.`; };
Object.defineProperty(BOOKS.mt, 'blurb', {configurable:true, get(){ return 'Lether, beside Midnight Tides, years before the Malazans hear of it. A new Letherii squad of the Whitefinder Battalion, from Letheras north to High Fort and back to the city\'s fall. Plays on its own.' + (b5ChCount() >= 7 ? '' : ' ' + b5Progress()); }});
Object.defineProperty(BOOKS.mt, 'coming', {configurable:true, get(){ return b5ChCount() === 0; }});
Object.defineProperty(BOOKS.mt, 'titleArt', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['title/mt'] ? 'title/mt' : 'title/hoc'; }});

/* ---- the foes (stat blocks only; chapters place them). Sized for levels 1-8 like Book Two's; the chapter curve (31c FSCALE) grows them.
   The Edur's side: warriors, the unblooded, the K'risnan (deformed sorcerers: never the power behind them by name, rule 42), shadow wraiths,
   a Jheck Soletaken wolf, a bound demon (Kenryll'ah). Lether's own margins: deserters on the road, a debt-collector's bullies, a press-gang. ---- */
Object.assign(FOES, {
  b5_edur:{name:'Tiste Edur warrior', kind:'b5_edur', sig:'E', hp:18, ac:14, atk:5, dmg:[1,10,2], rng:1, mv:4, init:2, sk:['parry'], verb:'cuts, grey and quick, at'},
  b5_unblooded:{name:'Edur unblooded', kind:'b5_unblooded', sig:'u', hp:13, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:5, init:3, verb:'drives a spear at'},
  b5_krisnan:{name:'K\'risnan', kind:'b5_krisnan', sig:'K', hp:16, ac:12, atk:4, dmg:[1,6,1], rng:4, mv:3, init:1, sk:['daze', 'drain'], verb:'reaches through the shadow at'},
  b5_wraith:{name:'Shadow wraith', kind:'b5_wraith', sig:'w', hp:9, ac:13, atk:4, dmg:[1,6,1], rng:1, mv:5, init:3, sk:['drain'], verb:'claws at'},
  b5_jheck:{name:'Jheck wolf', kind:'b5_jheck', sig:'j', hp:16, ac:13, atk:5, dmg:[1,8,2], rng:1, mv:6, init:3, sk:['pounce'], verb:'bites'},
  b5_demon:{name:'Bound demon', kind:'b5_demon', sig:'D', hp:44, ac:16, atk:6, dmg:[2,6,3], rng:1, mv:4, init:1, boss:true, dr:2, sk:['shove', 'reach'], verb:'brings a great armoured fist down on'},
  b5_deserter:{name:'Letherii deserter', kind:'b5_letherii', sig:'d', hp:12, ac:13, atk:4, dmg:[1,8,0], rng:1, mv:4, init:1, verb:'cuts at'},
  b5_deserterbow:{name:'Deserter bowman', kind:'b5_letherii_bow', sig:'a', hp:9, ac:12, atk:3, dmg:[1,8,0], rng:5, mv:4, init:2, sk:['pin'], verb:'looses at'},
  b5_bully:{name:'Collector\'s bully', kind:'bruiser', sig:'b', hp:14, ac:12, atk:4, dmg:[1,6,2], rng:1, mv:4, init:1, sk:['shove'], verb:'swings a cudgel at'},
  b5_collector:{name:'The collector\'s man', kind:'thug', sig:'C', hp:24, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'cuts at'},
  b5_pressman:{name:'Press-gang soldier', kind:'b5_letherii', sig:'p', hp:13, ac:13, atk:4, dmg:[1,6,1], rng:1, mv:4, init:1, sk:['shove'], verb:'swings a cudgel at'},
  b5_presssgt:{name:'Press-gang sergeant', kind:'b5_letherii', sig:'P', hp:22, ac:14, atk:5, dmg:[1,8,2], rng:1, mv:4, init:2, boss:true, sk:['rally'], verb:'cuts at'},
  /* on the squad's side: a Whitefinder regular, for fights beside the battalion (Chapters 4-7), in a fight's allies:[['b5_regular', x, y]] */
  b5_regular:{name:'Whitefinder regular', kind:'b5_letherii', sig:'r', hp:15, ac:13, atk:4, dmg:[1,8,1], rng:1, mv:4, init:1, verb:'cuts at'},
});
/* the regular grows with the squad, as Book Four's Ninth regular does */
{ const _mkAlly = mkAlly; mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y);
    if (k === 'b5_regular') { u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); u.b5reg = true; } return u; }; }

/* ---- Book Five's balance (David, Thu Oct 29, 2026, 1:42 PM PDT; docs/mt-balance.md). Book Five is on Book Two's curve (FSCALE, and
   SOLDIER_LATE.mt = Book Two's row, kept), and as built its Bridgeburner fights were far easier than the 75-80% won asked. B5GAP carries the
   difference, per chapter, on Bridgeburner only ({ac +, atk +, hp ×, dmg +}, as Book Four's B4GAP and Book Three's B3GAP); a fight may
   carry its own row in B5GAP_FIGHT. B5SOFT eases one fight on Soldier only (Ch 7's barricade: a smart Soldier wins it every time).
   Story is never touched, and nothing here runs outside Book Five (S.book === 'mt'). ---- */
const B5GAP = { // tuned Thu Oct 29, 2026 (docs/mt-balance.md): the chapter's row, for the fights without a row of their own below
  1:{ac:2, atk:1, hp:1.45, dmg:2},
  2:{ac:3, atk:3, hp:1.7, dmg:3},
  3:{ac:3, atk:3, hp:2.0, dmg:4},
  4:{ac:2, atk:2, hp:1.6, dmg:3},
  5:{ac:3, atk:3, hp:2.0, dmg:4},
  6:{ac:3, atk:3, hp:2.0, dmg:4},
  7:{ac:3, atk:3, hp:2.0, dmg:4}};
const B5GAP_FIGHT = { // a fight's own row instead of its chapter's: the main and key fights sit lower, the small ones carry the chapter's
  b5_c1_lowwalk:{ac:1, atk:1, hp:1.2, dmg:1},
  b5_c1_tavern:{ac:0, atk:0, hp:.92, dmg:0} /* the hardest as built (about 62% won): eased a little */,
  b5_c2_looters:{ac:3, atk:3, hp:1.7, dmg:3},
  b5_c2_wreckers:{ac:1, atk:1, hp:1.3, dmg:1},
  b5_c2_hulk:{ac:0, atk:1, hp:1.15, dmg:1} /* the main fight */,
  b5_c3_rivermen:{ac:1, atk:1, hp:1.15, dmg:1} /* the main fight */,
  b5_c3_bank:{ac:2, atk:2, hp:1.6, dmg:3},
  b5_c4_wraiths:{ac:2, atk:2, hp:1.5, dmg:3},
  b5_c4_demon:{ac:1, atk:1, hp:1.4, dmg:2} /* the key fight (hold) */,
  b5_c4_wolves:{ac:2, atk:2, hp:1.6, dmg:4} /* the key fight (run) */,
  b5_c5_farm:{ac:3, atk:3, hp:1.6, dmg:3},
  b5_c5_wagons:{ac:2, atk:2, hp:1.7, dmg:3},
  b5_c6_hills:{ac:2, atk:1, hp:1.4, dmg:2},
  b5_c6_flight:{ac:1, atk:1, hp:1.4, dmg:2},
  b5_c6_channel:{ac:2, atk:1, hp:1.4, dmg:2} /* the mortal fight */,
  b5_c7_looters:{ac:3, atk:3, hp:1.85, dmg:4},
  b5_c7_wolves:{ac:1, atk:1, hp:1.25, dmg:1},
  b5_c7_barricade:{ac:0, atk:1, hp:1.05, dmg:0} /* the main fight */};
const B5SOFT = {b5_c7_barricade:{hp:.85, atk:-1, dmg:-1}}; // Soldier only: the barricade lost 1 run in 12 (no gear, level 7); this takes back about what the Soldier late extra adds
const b5Gap = () => { if (!b5On() || (S.diff || 'soldier') !== 'bridgeburner') return null; const id = B && B.id;
  return (id && B5GAP_FIGHT[id]) || B5GAP[clamp(S.chapter || 1, 1, 7)] || null; };
const b5Soft = () => (b5On() && (S.diff || 'soldier') === 'soldier' && B && B.id && B5SOFT[B.id]) || null;
{ const _mkFoe = mkFoe;
  mkFoe = function(k, x, y, extra){ const u = _mkFoe(k, x, y, extra); if (!b5On()) return u;
    const g = b5Gap() || b5Soft(); if (!g) return u;
    u.ac = (u.ac || 10) + (g.ac || 0); u.atk = (u.atk || 0) + (g.atk || 0); u.maxhp = u.hp = Math.max(1, Math.round(u.maxhp * (g.hp || 1)));
    if (u.dmg) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + (g.dmg || 0)]; return u; }; }

/* ---- the words Book Five throws at you: [chapter, word, meaning, met?]. Bound by mt-canon §10: Bugg, Turudal Brizad and Yan Tovis are
   what the squad could know of them, no more; the Errant is Lether's god of chance; the tiles name no being. ---- */
GLOSSX.mt = [
  [0, 'Lether', 'The kingdom, and its capital Letheras: canals, towers, markets and ledgers. Lether counts everything, and everyone in it owes somebody.'],
  [0, 'The Indebted', 'A class, not only a condition. A debt that cannot be paid passes to the children, and the children to theirs. Many soldiers joined the army to stop a debt growing.'],
  [0, 'Docks', 'Letherii coin. There are bigger coins, the thirds and the peaks. A soldier mostly sees docks, and mostly sees them leave.'],
  [0, 'The Drownings', 'Letheras\'s court for those who cannot pay their fines. The accused is weighted with the fine in coins and made to swim the Quillas Canal. Reach the far side and you are free. Most do not. The crowds wager on it.'],
  [0, 'The Whitefinder Battalion', 'The squad\'s battalion, stationed at High Fort on the northern frontier. Its soldiers paint a white fingertip on their shield-boss. Nobody in it can say for certain why.'],
  [0, 'The Sixth Company', 'The squad\'s company of the Whitefinders, under Finadd Ravel Ennic.'],
  [0, 'Finadd', 'A captain, in the Letherii army. Above a Finadd is an Atri-Preda, and above everyone is the Preda, who commands the army.'],
  [0, 'Finadd Ravel Ennic', 'The Sixth Company\'s officer. He signs what the sergeant puts in front of him and lets the sergeant run the company, which the company counts as a virtue.'],
  [0, 'The Errant', 'Lether\'s god of chance, fateful circumstance and the impulse you should not have followed. Soldiers pray to him before a wager. His festival brings the Special Drownings.'],
  [0, 'The Holds', 'The old powers the Letherii reckon by: the Empty Hold, the Beast Hold, the Dragon Hold, the Azath Hold, the Hold of Ice, and the Fulcra. Each has its tiles.'],
  [0, 'The Tiles of the Holds', 'The Letherii way of reading what is coming: tiles of the Holds laid out and read. Feather witches read them for generations. The cadre reads them now, and so do old women in every camp.'],
  [0, 'The Empty Hold', 'The heart of Letherii worship: the throne that knew no king. Its tiles are the Empty Throne, the Watcher, the Walker, the Saviour, the Betrayer and others.'],
  [0, 'The cadre', 'The army\'s mages, trained in the Ceda\'s schools to draw sorcery through the Holds. The army leans on them more than on its swords.'],
  [0, 'The Ceda', 'The King\'s Sorcerer, Kuru Qan, who oversees every mage in Lether. Soldiers see his banner, and not him.'],
  [0, 'The Seventh Closure', 'A prophecy every Letherii knows: the king who rules at the Seventh Closure will be transformed and become the First Emperor reborn. This year, people say, is the year.'],
  [0, 'Bugg', 'Tehol Beddict\'s manservant, a builder. People in Letheras know the name the way they know a bridge.', ()=>!!(S && S.f && S.f.b5_bugg)],
  [0, 'Turudal Brizad', 'The Queen\'s First Consort. Court gossip, which soldiers hear third-hand.', ()=>!!(S && S.f && S.f.b5_brizad)],
  [0, 'The Tarthenal', 'A people Lether conquered, north-west of Letheras. Some towns still keep Tarthenal names. Most Tarthenal now live in the pit towns outside the cities. Their old gods are best left to look the other way.', ()=>b5In('thegg') || godMet('thegg')],
  [0, 'The Tarthenal dead', 'What Thegg talks to at night: his mother\'s people, the dead ones. Not their gods.', ()=>b5In('thegg') || godMet('thegg')],
  [0, 'Army surgeons', 'Lether\'s healers: needle, gut, splints, hot iron and herbs. No sorcery. The cadre kills; the surgeons sew.', ()=>b5In('ammet')],
  [1, 'Tiste Edur', 'The people of the north, across the frontier: grey-skinned, long-lived, six tribes under one king. Lether trades with them, poaches their seals, and is about to find out what that costs.', ()=>(S.chapter || 0) >= 1],
  [1, 'Trate', 'Lether\'s northernmost city, a walled port with a lighthouse over the harbour, and the Tarancede Tower out on its rocks.', ()=>(S.chapter || 0) >= 1 || !!(S.f && S.f.b5_trate)],
  [2, 'Shadow wraiths', 'Shapes in the rigging of the ships that came into Trate. They do what the Edur sorcerers tell them.', ()=>(S.chapter || 0) >= 2],
  [3, 'The Faraed', 'A people of the northern hills, long under Lether. The army pays Faraed boys to find the roads its maps get wrong.', ()=>b5In('ruuk') || !!(S.f && S.f.b5_ruukDone)],
  [2, 'The Shake', 'The first people of the central west coast and its islands, much married into. Lether took their coast without a war. Their faith is the Shore, the sea that takes back everything.', ()=>b5In('brune') || !!(S.f && S.f.b5_bruneDone) || godMet('brune')],
  [3, 'Kraig\'s Landing', 'Three buildings and a dock upriver from Trate, near the Edur border. A regiment camps round it this year, and the Ceda\'s banner flies on the ships.', ()=>(S.chapter || 0) >= 3],
  [3, 'Yan Tovis', 'The Atri-Preda at Fent Reach, on the northern coast.', ()=>!!(S.f && S.f.b5_fentReach) || (S.chapter || 0) >= 4],
  [3, 'The Nerek', 'A people of the eastern mountains, drawn into debt by traders and then into Lether. Many ended on the streets of Letheras.', ()=>(S.chapter || 0) >= 3],
  [4, 'High Fort', 'The Whitefinders\' station: a fort on pasture south of the Katter River, guarding the pass into Edur lands. Earth ramparts in front of it, and Dry Gully beyond.', ()=>(S.chapter || 0) >= 4],
  [4, 'The Jheck', 'Wolves of the north who fight for the Edur. Some of them are men, some of the time.', ()=>(S.chapter || 0) >= 4],
  [4, 'K\'risnan', 'The Edur\'s sorcerers. Their bodies are twisted, as if something were using them from inside. Nobody in the Sixth wants to know what.', ()=>(S.chapter || 0) >= 4],
  [4, 'Bluerose', 'A conquered horse country to the east. Its horses are behind Lether\'s cavalry. Its officers are not trusted.', ()=>(S.chapter || 0) >= 5],
  [6, 'Brans Keep', 'A fortress two days\' ride north-west of Letheras, built against a cliff, with a lake on one side and a dry channel on the other.', ()=>(S.chapter || 0) >= 6],
  [1, 'Debt', 'What every soldier in the squad carries, in docks. Paid down, it buys loyalty and freedom. Left to grow, it brings the collectors, and in Letheras, the canal.'],
];

/* ---- the journal, the count and the Deeds, by book ---- */
{ const _jn = journalNotes; journalNotes = function(){ const out = _jn(); if (!b5On()) return out;
    const c = b5Collectors(), heirs = Object.entries((S.f && S.f.b5_heirs) || {}).filter(([, v]) => v > 0);
    out.unshift(`The squad's debts: ${b5Debtors().map(id => `${id === 'sgt' ? 'yours' : esc(NAME(id)) + '\'s'} ${b5Coin(b5Debt(id))}`).join(', ')}. ${b5Coin(b5DebtTotal())} in all, against ${b5Coin(S.silver || 0)} in hand.${c.length ? ` The collectors know ${c.length > 1 ? `${c.length} of the names` : 'one name'}.` : ''}${heirs.length ? ` Gone to the heirs: ${heirs.map(([id, v]) => `${esc(TPL[id] ? TPL[id].name : id)}'s ${b5Coin(v)}`).join(', ')}.` : ''}`);
    return out; }; }
{ const _sr = statsRows; statsRows = function(s){ const r = _sr(s); if (!s || s.book !== 'mt') return r;
    const st = s.stats || {}, out = r.filter(([k]) => k !== 'Munitions thrown').map(([k, v]) => [k.replace(/^Silver /, 'Docks '), v]);
    const owed = Object.entries(s.debt || {}).filter(([id]) => !(s.dead && s.dead[id])).reduce((a, [, v]) => a + (v || 0), 0);
    out.push(['The squad\'s debts, now', b5Coin(owed)], ['Paid down', b5Coin(st.b5Paid || 0)], ['Owed on top', b5Coin(st.b5Owed || 0)]);
    if (st.b5Freed) out.push(['Soldiers paid up', st.b5Freed]); if (st.b5Pressed) out.push(['Debts the collectors came for', st.b5Pressed]);
    return out; }; }
function b5DeedsExtra(mine){
  const fin = mine.filter(({s}) => bookDone(s)), owed = mine.map(({s}) => Object.entries(s.debt || {}).filter(([id]) => !(s.dead && s.dead[id])).reduce((a, [, v]) => a + (v || 0), 0));
  const freed = mine.reduce((a, {s}) => a + (((s.stats || {}).b5Freed) || 0), 0), paid = mine.reduce((a, {s}) => a + (((s.stats || {}).b5Paid) || 0), 0);
  const rows = [['Least owed, now', mine.length ? b5Coin(Math.min(...owed)) : 'Not yet'], ['Paid down, across every sergeant', paid ? b5Coin(paid) : 'Nothing yet'],
    ['Soldiers who walked out paid up', freed || 'None yet'], ['Finished in Letheras', fin.length || 'Not yet']];
  return `<h4 class="jh">Debt</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }

/* ---- Book Five's road map: Letheras in the south, the road north to Trate on the coast, upriver to Kraig's Landing, High Fort on the
   frontier, and back down the road south through the burned country to Brans Keep and Letheras ---- */
const ROUTE_B5 = [ // chapter -> where
  {x:.56, y:.86, t:'Letheras', a:'l'}, {x:.52, y:.82, t:'Letheras · the barracks'}, {x:.3, y:.16, t:'Trate', a:'l'}, {x:.44, y:.12, t:'Kraig\'s Landing'},
  {x:.6, y:.2, t:'High Fort'}, {x:.58, y:.5, t:'The road south', a:'l'}, {x:.4, y:.7, t:'Brans Keep', a:'l'}, {x:.58, y:.88, t:'Letheras'}];
function drawB5Route(cv, s, t){
  const dpr = Math.min(2, window.devicePixelRatio || 1), W = cv.clientWidth, H = cv.clientHeight; if (!W) return;
  if (cv.width !== Math.round(W*dpr)) { cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr); }
  const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#1e2620'); bg.addColorStop(1, '#141a16'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 60; i++) ctx.fillRect(hash(i, 53)*W, hash(i, 54)*H, 1 + hash(i, 55)*2, 1);
  ctx.fillStyle = '#16304a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W*.5, 0); ctx.quadraticCurveTo(W*.36, H*.1, W*.22, H*.12); ctx.quadraticCurveTo(W*.1, H*.2, 0, H*.4); ctx.fill(); // the northern sea off Trate
  ctx.fillStyle = 'rgba(106,168,255,.25)'; ctx.font = `italic ${Math.round(Math.max(9, H*.05))}px 'IM Fell English', serif`; ctx.textAlign = 'left'; ctx.fillText('The Reach', W*.03, H*.08);
  ctx.strokeStyle = 'rgba(106,168,255,.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W*.32, H*.15); ctx.quadraticCurveTo(W*.4, H*.13, W*.5, H*.06); ctx.stroke(); // the river up to the Landing
  ctx.beginPath(); ctx.moveTo(W*.8, H*.3); ctx.quadraticCurveTo(W*.62, H*.6, W*.58, H*.9); ctx.lineTo(W*.5, H); ctx.stroke(); // the Lether River down to the capital
  ctx.fillStyle = 'rgba(120,150,110,.12)'; for (let i = 0; i < 16; i++) ell(ctx, W*(.62 + hash(i, 56)*.3), H*(.04 + hash(i, 57)*.16), 8, 4, 'rgba(120,150,110,.14)'); // the forest north of High Fort, and Edur country beyond
  const done = bookDone(s), ch = s.chapter || 0;
  if (ch >= 5) { ctx.fillStyle = 'rgba(30,20,14,.35)'; ctx.beginPath(); ctx.ellipse(W*.52, H*.58, W*.16, H*.12, .3, 0, 7); ctx.fill(); } // the burned country on the road south
  const pts = ROUTE_B5.filter((r, n) => n <= ch).map(r => ({x:r.x*W, y:r.y*H}));
  ctx.strokeStyle = 'rgba(232,192,115,.8)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke(); ctx.setLineDash([]);
  ROUTE_B5.forEach((r, n) => { if (n === 1) return; const x = r.x*W, y = r.y*H, on = n === 0 || n <= ch, here = (n === 0 ? ch <= 1 : n === ch) && !done && ch > 0;
    if (n === 7 && ch < 7) return; // Letheras is already on the map
    if (!on) { ctx.fillStyle = 'rgba(200,190,170,.18)'; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill(); return; }
    if (here) glow(ctx, x, y, 18, '#e8c073', .35 + Math.sin(t/300)*.15);
    ctx.fillStyle = here ? '#f6dca0' : '#c9a35a'; ctx.beginPath(); ctx.arc(x, y, here ? 5 : 3.5, 0, 7); ctx.fill();
    ctx.fillStyle = here ? '#f2dca6' : 'rgba(230,218,194,.7)'; ctx.font = `600 ${Math.round(Math.max(9, Math.min(13, W*.028)))}px 'Alegreya Sans SC', sans-serif`; ctx.textAlign = r.a === 'l' ? 'right' : 'left';
    ctx.fillText(r.t, x + (r.a === 'l' ? -8 : 8), y - 6); });
}
{ const _drawRoute = drawRoute; drawRoute = function(cv, s, t){ return bookOf(s) === 'mt' ? drawB5Route(cv, s, t) : _drawRoute(cv, s, t); }; }

/* ---- backdrops for Book Five's reading places and marches (the chapters add their own and may replace these; until then each borrows an
   earlier book's drawing of a like place) ---- */
const B5_SCENE_LIKE = {b5_barracks:'b4_aren_yard', b5_trate_harbour:'b2_harbour_night', b5_landing:'b3_c6_barges', b5_highfort:'b3_c3_walls_night', b5_road_south:'b3_c5_burnt',
  b5_branskeep:'b3_c6_entrench', b5_letheras:'b4_c1_quay', b5_march:'b3_c6_road', b5_march_dusk:'b3_c2_far_dusk'};
Object.assign(SCENES, {
  b5_barracks:{loc:'Letheras', sub:'The Whitefinders\' barracks · night', cap:'Lamps in the barracks windows, the canal smell over the wall, and a company paying its debts in its sleep.', amb:'explore'},
  b5_trate_harbour:{loc:'Trate', sub:'The harbour after the wave · evening', cap:'Wrecks on the quays, fish on the cobbles, and the lighthouse standing over all of it as if nothing happened.', amb:'explore'},
  b5_landing:{loc:'Kraig\'s Landing', sub:'The barges at the dock · night', cap:'Barges tied three deep, a regiment\'s fires on the bank, and the mountains to the north very dark.', amb:'explore'},
  b5_highfort:{loc:'High Fort', sub:'The western rampart · night', cap:'An earth rampart, the bastion tower over it, and across Dry Gully the fires of an army that has not yet come.', amb:'explore'},
  b5_road_south:{loc:'The road south', sub:'The burned country', cap:'Fields burned to the root on both sides of the road, by Letherii hands, so the Edur would find nothing.', amb:'explore'},
  b5_branskeep:{loc:'Brans Keep', sub:'Across the dry channel', cap:'The keep against its cliff, the lake beside it, and the whole army of Lether drawn up in front.', amb:'explore'},
  b5_letheras:{loc:'Letheras', sub:'A canal and a barricade', cap:'A bridge that is not the main one, a barricade of carts, and the city very quiet behind it.', amb:'explore'},
  b5_march:{loc:'The road', sub:'The Sixth Company\'s column', cap:'A military road, straight as a ruler, and the company on it, counting the leagues.', amb:'explore'},
  b5_march_dusk:{loc:'The road', sub:'The column at dusk', cap:'The column halting, the cooks first at the fires, and the sergeant counting heads.', amb:'explore'},
});
Object.entries(B5_SCENE_LIKE).forEach(([k, like]) => { SCENEX[k] ??= (cv, t) => (SCENEX[like] || ((c, tt) => drawCamp(c, tt, true)))(cv, t); });

/* ---- engine text that reads Book One's flags, given Book Five's own words while S.book is 'mt' (each falls through to the book before) ---- */
{ const B5FIN = {squad:'The squad', sgtRole:'Sergeant · Sixth Company, the Whitefinder Battalion', road:'The squad\'s road', prologue:false, paper:false,
    list:()=>['The roll', `${Object.keys((S && S.dead) || {}).length} names`], noDead:'None of the squad. Every one of them walked out of Letheras.', endline:'The End of <em>Indebted</em>'};
  Object.keys(B5FIN).forEach(k => { const prev = Object.getOwnPropertyDescriptor(FIN_L, k);
    Object.defineProperty(FIN_L, k, {configurable:true, enumerable:true, get(){ return b5On() ? B5FIN[k] : prev && prev.get ? prev.get() : prev && prev.value; }, set(v){ /* kept per book */ }}); }); }
/* the chapter card and end screen fall back to Book One's places by chapter number when a chapter names no scene: in Book Five, the barracks, then the road */
{ const _sci = showChapterIntro; showChapterIntro = function(){ const r = _sci(); const CH = CHAPTERS[S && S.chapter];
    if (b5On() && CH && !(CH.intro && CH.intro.scene)) { G.sceneKind = S.chapter === 1 ? 'b5_barracks' : 'b5_march'; AUDIO.setScene(sceneAmb(G.sceneKind, 'explore')); } return r; }; }
{ const _sce = showChapterEnd; showChapterEnd = function(...a){ const r = _sce(...a); const CH = CHAPTERS[S && S.chapter];
    if (b5On() && CH && !CH.endScene) G.sceneKind = S.chapter === 1 ? 'b5_barracks' : 'b5_march_dusk'; return r; }; }
/* the losing banner */
{ const _endBeat = endBeat;
  endBeat = function(won){ const r = _endBeat(won); if (b5On() && B && B.banner && !won) B.banner.txt = 'The squad is down'; return r; }; }

/* Book Five's chapters register in start() (90), after Book Four's: registerChapter(n, B5CHn, 'mt') */

/* each chapter publishes its key values here (B5KEYS[n] = ['x','y']): tools/play.mjs --from=N builds earlier chapters' keys from it.
   These are the plan's keys (book5-mt-plan.md, "Key choices"); a chapter may replace its row. */
const B5KEYS = {1:['pay', 'swim'], 2:['salvage', 'dead'], 3:['watch', 'warn'], 4:['hold', 'run'], 5:['sign', 'refuse'], 6:['stand', 'fallback'], 7:['emperor', 'paid', 'ledger']};
