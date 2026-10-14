/* ============ Book Three: The Fair Exchange (beside Memories of Ice) — the Fourth again, the Alliance, the poisoned warrens ============ */
/* Book Three is the Fourth's own book again: Book One's sergeant and squad, the spring after the Fete, marching with Onearm's Host and
   Caladan Brood's army from the parley at Pale to Coral. Its chapters register with registerChapter(n, CH, 'moi') (90) and every id
   carries a b3_ prefix (areas, nodes, fights, foes, gear, scenes, tricks, flags S.f.b3_*). This file holds what the book needs outside
   a chapter: the Fourth's Book Three lives (swapped in and out by setBook), the two recruits, the Alliance (trust and dread), the
   poisoned warrens, allies who come when trusted, the import of a finished Book One on the outlaw road, the glossary and the gods.
   Everything here is guarded by S.book === 'moi' (or BOOK === 'moi'); Book One and Book Two play exactly as before.
   The function, table and flag names a chapter writer uses are listed in docs/v6.0-notes.md. */

const MOI_PORDER = ['sgt', 'brisk', 'kettle', 'tuft', 'ohl'];
const B3_RECRUITS = ['sohra', 'greysword'];
const b3On = () => !!(S && S.book === 'moi');
const b3In = id => !!(S && Array.isArray(S.squad) && S.squad.includes(id) && !(S.dead && S.dead[id]));
/* the Book One save a Book Three game was carried from: b3Was(k) reads one of its flags (undefined on a fresh start) */
const b3Was = k => (S && S.imported && S.imported.f) ? S.imported.f[k] : undefined;
const b3Fallen = () => (S && S.imported && Array.isArray(S.imported.dead)) ? S.imported.dead.filter(id => TPL[id]) : [];
const b3FallenNames = () => { const n = b3Fallen().map(id => TPL[id].name); return n.length > 1 ? n.slice(0, -1).join(', ') + ' and ' + n[n.length - 1] : n[0] || ''; };
/* Ohl's list in Book Three: the Book One count carried across (plus the Fourth's dead in this book), or null on a fresh start */
const b3List = () => { const i = S && S.imported && S.imported.f; return i && typeof i.list === 'number' ? i.list + Object.keys((S && S.dead) || {}).length + ((S.f && S.f.b3_listAdds) || 0) : null; };
const b3ListWords = () => { const n = b3List(); return n ? `${n} names` : 'more than two hundred names'; };

/* ---- the sergeant in Book Three: the same Untan sergeant, the same hands, after the Fete ---- */
BOOKSNAP.moi.sgt = Object.getOwnPropertyDescriptors({
  name:'', role:'Sergeant', sig:'S', col:'#d6a24a', hp:22, ac:14, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, st:{might:2, wits:2, guile:1}, ab:['rally','shove','salve'],
  epithet:'Fourth Squad, Seventh Company, Onearm\'s Host', origin:'Unta, Quon Tali', age:34, service:'Eleven years, marines, and a spring on the road south', height:'Middling. Stands like something taller.',
  weapon:'Malazan longsword, notched twice, and a knife nobody has seen drawn', armour:'Boiled leather over quilting, iron cap, a shield picked up at Nathilog and never put down',
  bio:`Eleven years in the marines, three of them under Dujek. Knows which orders to follow slowly and which to follow at a run, and has never once confused the two in front of an officer. Has not yet decided which kind this spring's orders are.`,
  get bio2(){ const f = b3Fallen();
    return `Came up through the Untan garrison, transferred out after a promotion that was offered in place of an apology. Came up out of the Pale with all five, and Dujek Onearm noticed, and said so, which in this army is a kind of medal nobody can take off you.${f.length ? ` The count is shorter now. ${b3FallenNames()} did not come out of Darujhistan, and the sergeant still counts ${f.length > 1 ? 'them' : ['ohl', 'vell'].includes(f[0]) ? 'him' : 'her'}, once, at the end, the way you count a tooth that is gone.` : ''}\n\nKeeps the pay ledger honest and the munitions count honester, on a road with no paymaster at the end of it. The proclamations say the Host is outlawed. The Host marches south-east beside Caladan Brood, whom it spent ten years trying to kill, and the sergeant has decided that is somebody else's sum.`; },
  traits:['Reads every order twice','Never sits with a back to the tent flap','Remembers the names of the dead, all of them','Drinks only after, never during'],
  gear:['Pay ledger, waterproofed','Second Army whistle, no longer used','Field kit: needle, thread, a bone saw Ohl disapproves of'],
  get quest(){ const f = (S && S.f) || {};
    return f.b3_legSeen ? `Whiskeyjack's leg. Mallet wanted a week of him flat on his back after Darujhistan, and Whiskeyjack has not given him an hour. The sergeant has stopped asking anyone about it and started watching how he stands, which is worse every time, and which he knows is being watched.`
      : `Whiskeyjack has been favouring a leg since Darujhistan. A healer could mend it, the camp says, if he would lie still long enough. He won't. The sergeant has noticed, and has noticed Whiskeyjack noticing.`; },
});

/* ---- the Fourth's Book Three lives: these fields swap in when the book is Book Three, and Book One's come back when it isn't ----
   (stats, abilities, portraits, sprites, traits and gear stay Book One's: the same soldiers, a few months on) */
const B3_FIELDS = ['epithet', 'service', 'bio2', 'quest', 'banter', 'rel'];
BOOKSNAP.moi.tpl = {
  brisk:Object.getOwnPropertyDescriptors({
    epithet:'"He owes me four coppers. I mean to collect."', service:'Nine years and a spring, six of them heavy infantry',
    get bio2(){ const shut = S && S.imported && b3Was('c7_letter') !== 'brisk';
      return `Grew up loading barges on the Cawn docks with her brother Tavrin, called Tav, who joined the Second the year she joined the Third. He is alive. He is in the Host, Fourth Regiment, a mile back down the column, and of an evening she can walk to his cook-fire and stand at the edge of the light until he looks up. Some evenings she does.\n\n${shut ? `The letter is still sealed. She says she'll open it when he's dead. He says that's a long wait. They have both decided this is funny.` : `The letter is open. He owes her four coppers from the Cawn wharf, and says so, and will not pay.`} Her loyalty is slow to give and does not come back once spent.`; },
    get quest(){ return `Two of them in one army now, going south into a war. Tav came out of the Pale alive and she would like that to be the last list she ever reads for his name. *We don't leave people.* She has decided it goes as far as a brother. She hasn't told him. He'd laugh, and then he'd stand in front of something.`; },
    banter:[`"Sergeant." A pause, because it's spring and she's in a good mood. "Sergeant."`, `"Tav says Rhivi bread's the best thing he's eaten in three years. Tav's eaten Second Army rations for three years. It isn't a high wall."`, `"Ten years we fought this lot. Now I'm digging latrines beside them. Nobody asked the latrine."`],
    rel:{kettle:'Stands upwind of her. Always. Has started standing upwind of the quorls as well.', tuft:'Walks behind her when she goes to the Rhivi fires, at a distance that is not following and is not anything else.', ohl:'Lets him talk. He is still the only one she lets.', ellis:'Walks on her open side on the march. Has still never said why.', vell:'He stands behind her shield without being told. She has stopped pretending not to notice.', sohra:'Watched the Rhivi girl ride for a morning and then said "Good." It is the longest review she has ever given.', greysword:'Another shield. They have not spoken much. They stand the same way, and both of them noticed.'}}),
  kettle:Object.getOwnPropertyDescriptors({
    epithet:'Soot to the elbows. Counts quorls now, as well as cussers.', service:'Six years, all of them sapper, and a spring under the quorls',
    get bio2(){ const d = S && S.imported ? b3Was('c7_debt') : null;
      const debt = d === 'paid' || d === 'spent' ? `The Moranth debt is square: a quartermaster wrote it so on a slate, and Kettle counts it every morning anyway.` : d === 'owed' ? `The Moranth debt is carried, the way the quartermaster said: lighter, by two.` : d === 'closed' ? `The Moranth debt is closed, one way or another.` : `The Moranth debt is settled or carried, depending on how you count, and Kettle counts everything.`;
      return `Ran contraband for a Falari smuggler before the Empire made the arrangement unprofitable and the marines made it a career. Learned Moranth munitions from a sapper called Chub who lost three fingers demonstrating them and considered it a fair trade.\n\n${debt} The quorls are not something in the sky to watch for any more. They are here. The Black Moranth fly for Dujek now and come down at dusk at the edge of the camp, and Kettle goes and stands near them the way other people stand near a fire.`; },
    get quest(){ const used = S && S.imported && b3Was('c5_cusserUsed'), gone = S && S.imported && b3Was('c7_debt') === 'paid' && !used;
      return used ? `Chub's cusser went up at a barrow in the Gadrobi Hills. There is a new one in the satchel, and she has named it Maud too, because some names are a post, not a person. She will not throw it at anything that doesn't matter. The quorls she is still learning, one by one.`
        : gone ? `Maud went back to the Moranth at Darujhistan. She checks the satchel for her anyway, every morning, and then goes to look at the quorls, which she is learning one by one.`
        : `The quorls, one by one: she has started to learn which is which. And Maud, the cusser at the bottom of the satchel, which she will not throw at anything that doesn't matter. She has stopped being able to say what would.`; },
    banter:[`"Two sharpers, one burner, one cusser. Same as this morning. The Moranth counted too, if you want a second opinion."`, `"The quorls are *warm*, Sergeant. Chub said. Nobody believed him. I'm writing it in the ledger so somebody has to."`, `"You point, I make it stop being a thing. The Barghast point and shout. I don't know what they want stopped. I'm not asking."`],
    rel:{brisk:'Calls her "the wall." Still not to her face.', tuft:'Shares a tent with her. Tuft goes out at night to the Rhivi fires now. Kettle leaves the flap tied open.', ohl:'Nine stitchings and counting. She pays in Rhivi tobacco now, which he says is worse.', ellis:'They still trade, arrows for trip-cord. Neither has said what for, still.', vell:'He asked if a quorl could carry a sharper and drop it. She has not slept since, for joy.', sohra:'Offered the Rhivi girl a sharper to hold, as a courtesy. Sohra held it like a bird. They are friends now.', greysword:'Asked the Capan what Capustan\'s walls were made of. Dannet asked why. Kettle said "professional interest." They have not resolved it.'}}),
  tuft:Object.getOwnPropertyDescriptors({
    epithet:'"She\'s not gone. I believe it."', service:'Eighteen months, give or take. Feels longer to everyone.',
    get bio2(){ return `A Mouse Quarter foundling who found her warren the way children in that quarter find most things, by accident and at night, and lived through the night the cadre came through the Quarter by being small and very quiet.\n\nBefore the Fourth left Darujhistan she said it aloud at last, and kept a promise doing it: the child the Rhivi carried out of a fire is Tattersail, and more than Tattersail, and Tuft does not pretend to know the rest. The child is with the Rhivi now, and the Rhivi are with Brood, and Brood marches beside the Host, and every day Tuft walks a little further up the column without seeming to.`; },
    get quest(){ return `The child is with Brood's army, growing years in weeks: older every time Tuft finds a reason to walk past the Rhivi fires, which is often. And a tall man in a fur-collared cloak, who stands at Brood's shoulder, looks at the child the way Kettle looks at a fuse. Tuft has seen him look. She has not stopped seeing it.`; },
    banter:[`"The cards are quiet this spring, Sergeant. I don't trust it. Quiet's what they do before they say something."`, `"She's older today. Not by a day. By a year." She doesn't say who. She doesn't need to.`, `"Brood's people don't count us. They look at the Host the way you look at weather. I've decided I like it."`],
    rel:{brisk:'Brisk walks behind her to the Rhivi fires and pretends she was going that way. Tuft lets her.', kettle:'The only one she talks to after dark. Kettle leaves the tent flap open for her now.', ohl:'He has stopped watching the lamp. He watches the Rhivi camp instead, when she is in it.', ellis:'Ellis still waits for her to say when to put the cards away.', vell:'He still doesn\'t ask for the cloak back.', sohra:'The Rhivi girl knows the child, and has never once said so. Tuft has decided that is a kindness, and owes her for it.', greysword:'The Capan watches her read as if the cards might bite. Tuft has told her they don\'t. She has not told her the rest.'}}),
  ohl:Object.getOwnPropertyDescriptors({
    epithet:'Denul is a standing argument with Hood. Hood has been gathering allies.', service:'Twenty-two years, three armies, and now an alliance, which is worse',
    get bio2(){ return `Was a temple healer in Ehrlitan when the Malazans took the city, and chose the conquerors' army over the conquered priesthood because the army had more wounded and fewer sermons. Served the Second under Dujek before Dujek was the whole army. Has patched every member of the Fourth at least once, and Kettle nine times.\n\nSeven Cities, his country, has risen this year, they say in the Host: a holy war, the whole of it burning. The ships out of Genabaris have stopped bringing letters for anyone from Ehrlitan. He has not said one word about it. He reads the list at night now with his lips moving.`; },
    get quest(){ const ch = (S && S.chapter) || 0;
      return `${ch >= 3 ? `In Capustan there was a priest whose own warren ate him from the inside while he healed: that is the story in the healers' tents, and Ohl has asked to hear it three times.` : `The healers in Brood's camp say the warrens go wrong in the Pannion lands: poisoned, like a well. Reach for Denul down there and something may reach back.`} He keeps the list, ${b3ListWords()}. He means to keep it from getting longer, and has stopped saying so out loud, in case Hood is listening.`; },
    banter:[`"Drink the tea, Sergeant. The Rhivi gave me the leaves. It's worse than mine. I'm told that's respect."`, `"Seven Cities is burning, the Moranth say. I was born there. I have decided the Moranth exaggerate."`, `"Brood's people heal with songs and smoke. I heal with needles and complaint. We have agreed that neither of us is doing it properly."`],
    rel:{brisk:'Calls her "child." She allows it. She has started calling him "old man," which he allows.', kettle:'Nine stitchings. He is fond of her the way one is fond of weather.', tuft:'Worries. Says nothing. Watches the Rhivi camp when she is in it.', ellis:'He looked at her hand, in the end. He still asks about it, once a week.', vell:'Still checks the stitches. Vell still pretends to mind.', sohra:'She sang over a cut he had already stitched, and it closed quicker than it had any right to. He has written that down, and underlined it, and is angry about it.', greysword:'He asked the Capan about the healers in Capustan. She told him. He went and sat by himself for an hour.'}}),
  /* Ellis and Vell keep their Book One templates; only their unfinished business moves on (a Book One import can bring them) */
  ellis:Object.getOwnPropertyDescriptors({ get quest(){ return `Toc the Younger kept riding, Paran said. Ellis scouts for the Host now, and looks down every road that leads anywhere but south-east, and does not say why. Nobody asks.`; } }),
  vell:Object.getOwnPropertyDescriptors({ get quest(){ return `A Daru rope boy a long way from any roof. Whatever the Guild wrote against his name stays written, back in the city; out here there is nothing to string a line between, and he has started, to his own surprise, to like the sky.`; } }),
};
/* Book One's own descriptors for those fields, kept at load (TPL here is still Book One's) so setBook can put them back exactly */
const B3_ONE = Object.fromEntries(Object.keys(BOOKSNAP.moi.tpl).map(id => [id, Object.fromEntries(Object.keys(BOOKSNAP.moi.tpl[id]).map(k => [k, Object.getOwnPropertyDescriptor(TPL[id], k)]))]));
function b3Wear(on){ Object.entries(on ? BOOKSNAP.moi.tpl : B3_ONE).forEach(([id, ds]) => { const t = TPL[id]; if (!t) return;
  Object.entries(ds).forEach(([k, d]) => { if (k === 'name' || k === 'length' || k === 'prototype') return; if (d) Object.defineProperty(t, k, Object.assign({}, d, {configurable:true})); else delete t[k]; }); }); }
{ const _setBook = setBook;
  setBook = function(b){ const from = BOOK; _setBook(b); if (BOOK === from) return;
    if (from === 'moi') b3Wear(false); if (BOOK === 'moi') b3Wear(true); }; }

/* ---- the two recruits (Book Three): one at a time in the normal case; the chapters stage their joining ---- */
Object.assign(TPL, {
  sohra:{name:'Sohra', role:'Rhivi rider · spirit-singer', sig:'R', col:'#c9a86a', hp:15, ac:13, atk:4, dmg:[1,8,1], rng:5, mv:6, init:3, st:{might:1, wits:2, guile:2}, ab:['mark','b3_song','salve'],
    epithet:'"The herds remember. I only sing."', origin:'The Rhivi Plain, the Mhybe\'s people', age:20, service:'Seven summers on the herd-trails, one beside the Malazans', height:'Small, quick, and never quite still.',
    weapon:'A Rhivi horn bow, a long knife, and a herd-staff hung with bone beads that click when she walks', armour:'Plains leathers, a cloak of bhederin hide, and a pale spirit-mark painted across the eyes',
    bio:`A herd-rider of the Rhivi who sings to the herds' dead and is answered, which she treats as ordinary. The Rhivi lent her to the Fourth to keep an eye on the Malazans for the Mhybe. She told the sergeant so, to the sergeant's face, on the first day. It is the most honest thing anyone in either army has said all spring.`,
    bio2:`Ten years ago the Malazans burned her family's summer grazing, and she is not going to pretend otherwise. Her mother taught her the spirit-songs, her father the bow, and the herds the rest: that the dead do not leave, they only move to the edge of the grass and wait to be sung to.\n\nShe has decided the Fourth is a herd. It is a slow one, and it complains, and she means to bring it in.`,
    traits:['Sings under her breath to things nobody else can see', 'Counts the bhederin before the soldiers', 'Will not sleep inside a tent', 'Laughs at Malazan jokes a beat late, and harder'],
    gear:['A bone whistle for the herds', 'Bone beads, one for each of the herd\'s dead she has sung home', 'Smoked bhederin, which she shares with exactly one person a day'],
    get quest(){ return `The Mhybe sent her to watch the Malazans, and she is watching. She has started to watch the Mhybe too, who was young at the turn of the year and is not young now, and nobody in the Rhivi camp will tell her why.`; },
    banter:[`"The Mhybe asked me what the Malazans are like. I said loud. She said that was not an answer. I said it was the whole answer."`, `"Your dead stand very close to you, Sergeant. Ours stand at the edge of the grass. I think yours are worried about you."`, `"Horses would help. I have said this every day. I will say it tomorrow."`],
    rel:{brisk:'Calls her "the standing stone," in Rhivi, as a compliment. Brisk has had it explained and has decided to allow it.', kettle:'Held one of Kettle\'s sharpers once, like a bird. They are friends now, which alarms everyone else.', tuft:'Knows what the Rhivi carry, and has never once said so to Tuft. Sings a little louder when Tuft walks past the fires.', ohl:'Sang over a cut he had stitched and it closed too fast. He is angry about it. She finds this very funny.', ellis:'Two scouts. They agree about ground, and about nothing else, and enjoy it.', vell:'Has offered to teach him to ride. He has asked what happens if he falls off. She said, "You get back on." He is still thinking about it.', greysword:'The Rhivi and the Capan were not friends before this war. They are polite about it, carefully, in a third language.'}},
  greysword:{name:'Dannet', role:'Grey Sword acolyte · shield', sig:'D', col:'#9aa4ac', hp:22, ac:15, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, st:{might:2, wits:1, guile:1}, ab:['bash','b3_howl','salve'],
    epithet:'"The boar is gone. Something else is listening."', origin:'Capustan, the Camps', age:24, service:'One year an acolyte of the Grey Swords, and twenty-three a Capan second daughter', height:'Tall, square, and stands as if a wall were behind her even when there is none.',
    weapon:'A straight Grey Sword blade, and a round shield with the painted boar scraped off and a wolf\'s head half-painted over it', armour:'A grey surcoat over mail, the acolytes\' shorn hair, and a Fener amulet she still wears and says is cold',
    bio:`A Capan second daughter, which in Capustan means a dowry nobody meant to pay and a husband nobody asked her about. She walked out of her father's house and into the Grey Swords' barracks the year they began taking daughters, and learned the shield before she learned to like it. The company has lent her to the Malazans as a guide into the Domin. She knows the roads. She does not say what she saw from the walls.`,
    bio2:`She was on the wall when the Tenescowri came, and in the streets after, and she will tell you the order of it and nothing else. Fener is gone; every Grey Sword felt him go, she says, like a floor taken away. Now there are wolves in the company's dreams, two of them, and the new Destriant says the Wolves of Winter are listening. Dannet is not yet sure she wants to be listened to.`,
    traits:['Swears in Elin, quietly, when it matters', 'Will not stand with her back to a fire', 'Touches the cold amulet before every fight, and then the wolf on the shield', 'Eats like a soldier and sleeps like a sentry'],
    gear:['A Fener amulet, cold to the touch', 'A pot of grey paint and a brush, for the wolf', 'A map of the Domin\'s roads, in her own hand'],
    get quest(){ return `The Grey Swords lent her to the Malazans until the Domin is done. She means to bring the company back an answer: whether the Wolves are a god, or a grief with teeth. She has started to hear them at night, and has not told the Destriant.`; },
    banter:[`"In Capustan we said the Malazans ate their prisoners. I know now who we were thinking of. I apologise. Mostly."`, `"Shield up, Sergeant. Not for you. For me. I like to know where it is."`, `"The wolf on the shield is half done. I'll finish it when I know what it's for."`],
    rel:{brisk:'Another shield. They stand the same way, and both of them noticed, and neither will say.', kettle:'The sapper asked what Capustan\'s walls were made of. Dannet asked why. They have not resolved it.', tuft:'Watches the cards as if they might bite. Tuft says they don\'t. Dannet says the boar didn\'t either, until it was gone.', ohl:'Told him about the healers in Capustan, because he asked. He went and sat by himself for an hour, and she sat with him for most of it.', ellis:'Ellis asked where the Domin\'s sentries stand. Dannet drew it in the dirt. It is the most either has said in a day.', vell:'He asked if the wolves were real. She said "Ask me at Coral." He has written that down.', sohra:'The Capan and the Rhivi were not friends before this war. They are polite about it, carefully, in a third language.'}},
});
Object.assign(VERB, {sohra:'looses an arrow at', greysword:'cuts at'});
Object.assign(STATUP, {sohra:['guile', 'wits'], greysword:['might', 'wits']});
Object.assign(PICKS[3], {
  sohra:[['quickshot', 'Two before the Turn', 'Once a fight: two arrows at one target within reach (three from level 6). The Rhivi way: loosed before the herd has finished turning.'], ['ghost', 'Grass-Walker', 'Enemies take −2 to hit Sohra. On the plain you are never quite where the eye expects.']],
  greysword:[['shieldwall', 'The Grey Wall', 'Squadmates standing next to Dannet get +2 armour. The acolytes drilled it on Capustan\'s walls until they did not need to.'], ['holdline', 'Hold the Breach', 'Dannet\'s free swings are unlimited and hit +2.']],
});
/* their gods, and the sergeant's in Book Three: Fener is gone this year, and the Tiger of Summer answers instead (PATRONS is keyed by id, so the sergeant's entry follows the book) */
Object.assign(PATRONS, {
  sohra:{god:'the Rhivi spirits', title:'The spirits of the Rhivi herds', txt:id => `Sohra, flat in the dirt, starts to sing. It is not loud. It does not need to be.\n\nAt the edge of the field the grass bends the way grass bends when a herd goes through it, and there is no herd. Something vast and patient and long dead comes in off the plain, and stands over the squad the way the old bulls stand over the calves, and the enemy, all at once, would rather be somewhere else.`},
  greysword:{god:'Togg and Fanderay', title:'Togg and Fanderay, the Wolves of Winter', txt:id => `Dannet goes down with her hand on the half-painted wolf, and the air goes cold, very suddenly, the cold of a hill in deep winter.\n\nSomewhere two wolves lift their heads at the same time, a long way apart, and look the same way. Neither of them is a boar. Neither of them is kind. The grey cloak on Dannet's shoulders frosts white, and she gets up.`},
});
const PATRON_FENER = PATRONS.sgt;
const PATRON_TREACH = {god:'Treach', title:'Treach, the Tiger of Summer', txt:id => `Something long and striped goes past at the edge of the light, low to the ground, and the grass stands up behind it as if it had been combed.\n\nFener does not answer this year; everyone in the Host knows it, and nobody can say how. Treach, the Tiger of Summer, is new to being a god and has not learned to be polite about it. He likes a fight that is not finished. This one is not finished.`};
Object.defineProperty(PATRONS, 'sgt', {configurable:true, enumerable:true, get(){ return S && S.book === 'moi' ? PATRON_TREACH : PATRON_FENER; }, set(v){ /* kept per book */ }});

/* ---- their two abilities ---- */
const b3SongHeal = () => 2 + Math.floor(((S && S.lvl) || 1) / 2);
AB.b3_song = {name:'Spirit-Song of the Herds', self:true, spirit:true,
  desc:()=>`Once a fight: every squadmate within 3 heals ${b3SongHeal()} and gets +1 to hit through next round. Spirit-craft: the Domin's poison never touches it.`,
  ok:()=>!B.used.b3_song,
  run(u){ B.used.b3_song = 1; AUDIO.play('heal'); sparks(u.x, u.y, 18, '#e8d9a0', .4);
    party().filter(p => !p.ally && cheb(u, p) <= 3).forEach(p => { heal(p, b3SongHeal()); p.b3SongUntil = B.round + 1; });
    blog(`${u.name} sings, low, to the herds' dead. Something answers from the edge of the grass, and the squad stands a little straighter.`); }};
AB.b3_howl = {name:'The Wolf\'s Howl', self:true,
  desc:()=>`Enemies within 2 take −2 to hit until Dannet's next turn. Recharges after 3 rounds.`,
  ok:u=>!(u.cdHowl >= B.round),
  run(u){ u.cdHowl = B.round + 3; AUDIO.play('shadow'); const near = foes().filter(f => cheb(u, f) <= 2);
    near.forEach(f => { f.b3HowlUntil = B.round + 1; float(f, 'cowed', '#c8d4e0'); });
    blog(near.length ? `${u.name} lifts her head and howls. It is not a sound a woman should be able to make, and ${near.length > 1 ? 'the enemy near her flinch' : `${near[0].name} flinches`} from it.` : `${u.name} howls at nothing. Somewhere, a long way off, something howls back.`); }};
{ const _squadTurnStart = squadTurnStart;
  squadTurnStart = function(u){ const r = _squadTurnStart(u); if (b3On() && B && u && u.id === 'greysword') B.units.forEach(e => { if (e.b3HowlUntil != null) e.b3HowlUntil = -1; }); return r; }; }

/* ---- the Alliance: trust (how far Brood's peoples trust the Fourth) and dread (what the Domin does to the mind), both 0..12 ---- */
const ALLY_MAX = 12;
function ally(dTrust = 0, dDread = 0, why = ''){
  if (!S) return; S.ally ??= {trust:5, dread:1};
  if (dDread > 0 && S.card === 'b3c_obelisk') dDread = Math.max(0, dDread - 1); // the Obelisk (60c): dread rises by 1 less each time it rises
  const t0 = S.ally.trust, d0 = S.ally.dread;
  S.ally.trust = clamp(t0 + dTrust, 0, ALLY_MAX); S.ally.dread = clamp(d0 + dDread, 0, ALLY_MAX);
  const dT = S.ally.trust - t0, dD = S.ally.dread - d0, bits = [];
  if (dT) bits.push(`trust ${dT > 0 ? '+' : '−'}${Math.abs(dT)}`); if (dD) bits.push(`dread ${dD > 0 ? '+' : '−'}${Math.abs(dD)}`);
  if (bits.length) { const s = `${why ? why + ': ' : ''}${bits.join(', ')}.`; note(s.charAt(0).toUpperCase() + s.slice(1), dT < 0 || dD > 0 ? 'bad' : 'good'); }
  if (dT > 0) tally('trustUp', dT); if (dT < 0) tally('trustDown', -dT); if (dD > 0) tally('dreadUp', dD);
  updChain();
}
const b3Trust = () => (S && S.ally ? S.ally.trust : 0), b3Dread = () => (S && S.ally ? S.ally.dread : 0);
/* the state of the squad's nerve for text: 'haunted' (dread 10+), 'shaken' (6+), or '' */
const b3Mind = () => b3Dread() >= 10 ? 'haunted' : b3Dread() >= 6 ? 'shaken' : '';
/* the widget for a node's html: two bars and a caption for where the Alliance is on the road */
function allyHTML(road){
  const t = b3Trust(), d = b3Dread(), m = b3Mind();
  return `<div class="chainbox allybox" role="group" aria-label="The Alliance">${road ? `<div class="road">${esc(road)}</div>` : ''}
    <div class="crow"><span>Trust</span><b>${t} of ${ALLY_MAX}${t >= 8 ? ' · Brood\'s people come when called' : ''}</b></div><div class="bar"><i style="width:${Math.round(t / ALLY_MAX * 100)}%"></i></div>
    <div class="crow"><span>Dread</span><b>${d} of ${ALLY_MAX}${m ? ` · ${m}` : ''}</b></div><div class="bar col"><i style="width:${Math.round(d / ALLY_MAX * 100)}%"></i></div></div>`;
}
/* the HUD pill beside the silver: Trust n · Dread n (Book Three only; Book Two's water and column are drawn by the same element) */
{ const _updChain = updChain;
  updChain = function(){ const el = typeof document !== 'undefined' && document.getElementById('chainp');
    if (!el || !S || S.book !== 'moi') return _updChain();
    S.ally ??= {trust:5, dread:1};
    el.innerHTML = `<span class="chainpill allypill"><span>Trust <b>${S.ally.trust}</b></span><span class="${S.ally.dread >= 6 ? 'dry' : ''}">Dread <b>${S.ally.dread}</b></span></span>`; }; }
/* a full rest in Book Three is free (the Host feeds its own) and lowers dread by 2: a fire, a song, the Host around you */
function b3Rest(t){ if (!S) return false; S.ally ??= {trust:5, dread:1};
  rest(t || 'The Fourth rests inside the Host\'s lines, with ten thousand people snoring round it. Wounds close, mostly.');
  if (S.ally.dread > 0) ally(0, -2, 'A fire, and the Host around you'); else note(t ? 'Rested.' : 'Rested, and nothing much on anyone\'s mind.', 'good');
  save(); return true; }

/* ---- the allies Brood's peoples send, when they trust the Fourth enough ----
   A fight may name an ally: def.aid = {kind:'b3_rhivi_rider', at:[x, y], need:8} (or an array of them). At trust >= need (default 8)
   that ally fights beside the squad, scaled by level; below it, a short log line says who did not come. */
Object.assign(FOES, {
  b3_rhivi_rider:{name:'Rhivi rider', sig:'r', hp:14, ac:13, atk:4, dmg:[1,8,1], rng:5, mv:6, init:3, verb:'looses an arrow at'},
  b3_barghast:{name:'Barghast warrior', sig:'b', hp:20, ac:13, atk:5, dmg:[2,6,2], rng:1, mv:4, init:1, verb:'swings a blood-iron blade at'},
  b3_andii:{name:'Tiste Andii', sig:'a', hp:18, ac:15, atk:5, dmg:[1,10,2], rng:1, mv:5, init:3, verb:'cuts, cold and quick, at'},
  b3_greysword:{name:'Grey Sword trooper', sig:'g', hp:20, ac:15, atk:4, dmg:[1,8,2], rng:1, mv:4, init:1, verb:'cuts at'},
  b3_moranth:{name:'Black Moranth', sig:'m', hp:16, ac:15, atk:4, dmg:[1,8,1], rng:4, mv:4, init:2, verb:'looses a quarrel at'},
  /* the enemy, for chapters to place (sprites: beklite, seerdomin, tenescowri, khell). Chapters may add their own b3_ foes beside these. */
  b3_beklite:{name:'Beklite', kind:'beklite', sig:'B', hp:13, ac:14, atk:4, dmg:[1,8,1], rng:1, mv:4, init:1, verb:'drives a spear at'},
  b3_seerdomin:{name:'Seerdomin', kind:'seerdomin', sig:'Σ', hp:26, ac:15, atk:5, dmg:[1,10,3], rng:1, mv:4, init:2, verb:'brings the long mace down on'},
  b3_tenescowri:{name:'Tenescowri', kind:'tenescowri', sig:'t', hp:7, ac:10, atk:2, dmg:[1,4,0], rng:1, mv:4, init:0, verb:'claws at'},
  b3_khell:{name:'K\'ell Hunter', kind:'khell', sig:'K', hp:60, ac:15, atk:6, dmg:[2,8,3], rng:1, mv:6, init:3, boss:true, verb:'scythes a blade-arm through'},
});
const B3_AID = ['b3_rhivi_rider', 'b3_barghast', 'b3_andii', 'b3_greysword', 'b3_moranth'];
const B3_AID_WHO = {b3_rhivi_rider:'the Rhivi', b3_barghast:'the Barghast', b3_andii:'the Tiste Andii', b3_greysword:'the Grey Swords', b3_moranth:'the Black Moranth'};
/* v6.1: Book Three's squad is six levels above the curve its fights were first tuned on (8..15 against 2..8). Its enemies carry that gap:
   harder to hit, harder hitting, more of them to cut through. Per chapter, from tools/balance.mjs against the old curve's numbers. */
const B3GAP = {1:{ac:7, atk:4, hp:1.8, dmg:6}, 2:{ac:6, atk:4, hp:1.7, dmg:5}, 3:{ac:5, atk:4, hp:1.55, dmg:4}, 4:{ac:6, atk:4, hp:1.5, dmg:5},
  5:{ac:5, atk:2, hp:1.35, dmg:4}, 6:{ac:5, atk:2, hp:1.25, dmg:4}, 7:{ac:5, atk:1, hp:1.25, dmg:4}}; // tuned Oct 13, 2026: smart-play health lost within a few points of the old curve, chapter by chapter
{ const _mkFoe = mkFoe;
  mkFoe = function(k, x, y, extra){ const u = _mkFoe(k, x, y, extra); if (!b3On()) return u; const g = B3GAP[clamp(S.chapter || 1, 1, 7)]; if (!g) return u;
    u.ac = (u.ac || 10) + g.ac; u.atk = (u.atk || 0) + g.atk; u.maxhp = u.hp = Math.max(1, Math.round(u.maxhp * g.hp)); if (u.dmg) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + g.dmg]; return u; }; }
{ const _mkAlly = mkAlly;
  mkAlly = function(k, x, y){ const u = _mkAlly(k, x, y); if (B3_AID.includes(k)) { u.maxhp = u.hp = FOES[k].hp + 3 * lvB(); u.atk += lvB(); if (u.dmg && lvDmg()) u.dmg = [u.dmg[0], u.dmg[1], (u.dmg[2] || 0) + lvDmg()]; u.ac += lvAc(); } return u; }; }
const b3AidList = d => !d || !d.aid ? [] : Array.isArray(d.aid) ? d.aid : [d.aid];
{ const _battleDef = battleDef;
  battleDef = function(id, stage){ const d = _battleDef(id, stage); if (!d || !S || S.book !== 'moi' || !d.aid) return d;
    const came = [], not = [];
    b3AidList(d).forEach(a => { if (!a || !FOES[a.kind]) return; (b3Trust() >= (a.need ?? 8) ? came : not).push(a); });
    return Object.assign({}, d, {allies:[...(d.allies || []), ...came.map(a => [a.kind, a.at[0], a.at[1]])], b3Came:came.map(a => a.kind), b3Not:not.map(a => a.kind)}); }; }

/* ---- the battle opening in Book Three: who came, who did not, and the squad's nerve ---- */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt);
    if (!b3On() || !B || !B.def) return r;
    const d = B.def, who = ks => [...new Set(ks.map(k => B3_AID_WHO[k] || (FOES[k] && FOES[k].name) || k))];
    if ((d.b3Came || []).length) blog(`${who(d.b3Came).join(' and ').replace(/^./, c => c.toUpperCase())} came when the Fourth asked. Trust is a thing you can stand beside.`);
    if ((d.b3Not || []).length) blog(`<em>${who(d.b3Not).join(' and ').replace(/^./, c => c.toUpperCase())} did not come. Nobody asked twice.</em>`);
    const m = b3Mind(); B.b3Mind = m;
    if (m === 'haunted') { B.units.filter(u => u.side === 'p' && !u.ally).forEach(u => { u.ini -= 1; }); B.initOrder.sort((a, b) => b.ini - a.ini);
      blog(`<em>Haunted. The Domin is in every head in the squad: −1 to hit all fight, and slower off the mark.</em>`); }
    else if (m === 'shaken') blog(`<em>Shaken. The squad has seen too much of the Domin: −1 to hit for the first two rounds.</em>`);
    return r; }; }
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o); if (!b3On() || !B || !a) return c;
    const mine = a.side === 'p', sq = mine && !a.ally;
    if (sq && (B.b3Mind === 'haunted' || (B.b3Mind === 'shaken' && B.round <= 2))) c.bonus -= 1;
    if (mine && a.b3SongUntil >= B.round) c.bonus += 1;
    if (!mine && a.b3HowlUntil >= B.round) c.bonus -= 2;
    return c; }; }

/* ---- poisoned warrens: in the Pannion lands the Crippled God's poison runs in the warrens ----
   While S.f.b3_domin is set (the chapters set it: Capustan's siege ground from Chapter 3, the Domin from Chapter 5), a strain-costing
   spell by a squadmate may burn its caster for 1d4 + max(0, chapter − 3) (never below 1 health): 10% in Chapter 3, +5% a chapter, 30% by
   Chapter 7. Spirit-craft (a.spirit: Sohra's song) and Elder tricks (a.elder) never burn; nor does anything under the Leper (60c).
   S.f.b3_burns counts the burns. */
const b3BurnPct = () => !b3On() || !S.f.b3_domin ? 0 : clamp(10 + 5 * ((S.chapter || 3) - 3), 10, 30);
const B3_BURN_LINE = {
  ohl:['Denul comes up hot, and something in it bites.', 'Ohl reaches into Denul and it reaches back. He says something in Ehrlii that is not a prayer.', 'The warren tastes of rust. Ohl heals, and pays for it.'],
  tuft:['Meanas comes up wrong, oily, and something in it bites.', 'The shadow comes when Tuft calls it, and brings something with it that has teeth.', 'Tuft flinches as she casts. The warren is not empty down here.'],
  any:['The warren comes up hot, and something in it bites.', 'Whatever runs in the warrens down here has noticed.', 'The warren answers, and takes its fee in blood.']};
{ const _useAb = useAb;
  useAb = function(k, x, y){
    const u = B && B.cur, a = AB[k];
    if (!b3On() || !u || !a || !a.strain || a.elder || a.spirit || u.side !== 'p' || u.ally || !S.f.b3_domin) return _useAb(k, x, y);
    const burn = S.card !== 'b3c_leper' && R(100) < b3BurnPct();
    const r = _useAb(k, x, y);
    if (burn && u.hp > 0) { const dmg = roll(1, 4, 0) + Math.max(0, (S.chapter || 0) - 3), n = Math.min(dmg, u.hp - 1);
      if (n > 0) { u.hp -= n; float(u, '−' + n + ' burnt', '#d0703a'); u.flash = performance.now(); }
      const L = B3_BURN_LINE[u.id] || B3_BURN_LINE.any; blog(`<em>${L[R(L.length)]}</em> ${u.name} takes ${n > 0 ? n : 'nothing, this time'}${n > 0 && n < dmg ? ' (it leaves them standing)' : ''}.`);
      S.f.b3_burns = (S.f.b3_burns || 0) + 1; tally('b3Burns'); updBattleUI(); }
    return r; }; }

/* ---- the squad away for one fight, the worst-hurt, and the last stand (as Book Two has them, for Book Three) ----
   def.away = ['kettle']: fought without them (they are still in the squad). def.hurtMost: after the fight S.f.b3_hurtMost is the squadmate
   who came out worst for their size (never the sergeant, never a recruit: the Rhivi and the Grey Swords keep their own).
   def.lastStand: a hold-out the squad cannot be asked to win; won or lost it goes on to def.after with the experience, no god, no retry;
   S.f.b3_lastHeld = 1 if they held, 0 if they went down; S.f.b3_lastRounds = the rounds it lasted. S.f.b3_lastRoundsFought = any fight's rounds. */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const d = b3On() ? BATTLES[id] : null, away = d && (d.away || (opt.stage === 2 && d.stage2 && d.stage2.away));
    if (!away || !away.some(k => S.squad.includes(k))) return _startBattle(id, opt);
    const sq = S.squad; S.squad = sq.filter(k => !away.includes(k));
    try { return _startBattle(id, opt); }
    finally { S.squad = sq; if (B && B.snap) { const o = JSON.parse(B.snap); o.squad = sq.slice(); B.snap = JSON.stringify(o); } save(); } }; }
{ const _win = win;
  win = function(){
    if (b3On() && B && B.def) { S.f.b3_lastRoundsFought = B.round;
      if (B.def.lastStand) { S.f.b3_lastHeld = 1; S.f.b3_lastRounds = B.round; }
      if (B.def.hurtMost) { const c = B.units.filter(u => u.side === 'p' && !u.ally && u.id !== 'sgt' && !B3_RECRUITS.includes(u.id) && TPL[u.id] && S.squad.includes(u.id)).sort((a, b) => a.hp / a.maxhp - b.hp / b.maxhp);
        if (c.length) S.f.b3_hurtMost = c[0].id; } }
    return _win(); }; }
{ const _lose = lose;
  lose = function(){ if (!b3On() || !B || !B.def || !B.def.lastStand) return _lose();
    AUDIO.play('lose'); const xp = Math.round((B.def.xp || 0) * XPK), up = gainXP(xp); S.f.b3_lastHeld = 0; S.f.b3_lastRounds = B.round;
    note(`The Fourth went down, and the line went on past them. +${xp} experience.`, 'bad'); if (up) note(lvlNote(), 'good');
    S.scene = 'talk'; save(); updBattleUI(); talk(B.def.after); }; }
{ const _endBeat = endBeat;
  endBeat = function(won){ const r = _endBeat(won); if (b3On() && B && B.banner && !won && B.def && B.def.lastStand) B.banner.txt = 'The line went on'; return r; }; }

/* ---- a fresh Book Three sergeant, and what a finished Book One on the outlaw road can bring ---- */
const B3_KEEP = ['c7_tav', 'c7_letter', 'c7_debt', 'c7_chub', 'c6_tuft', 'c7_tuftCut', 'c5_tuftMarked', 'c4_key', 'c4_vell', 'c6_key', 'c7_wjKnows', 'c7_wjReport', 'sgtScar', 'c2_ellisJoined', 'c5_ellisThrough', 'c7_ellisBack', 'c5_cusserUsed'];
const B3_MATES = ['brisk', 'kettle', 'tuft', 'ohl', 'ellis', 'vell'];
/* a Book One save qualifies if it finished on the outlaw road (that Fourth marched north with the Host) */
const b3Qualifies = o => !!(o && (!o.book || o.book === 'gotm') && o.chapters && o.chapters[7] === 'outlaw');
function b3Import(id){ const o = loadSlot(id); if (!b3Qualifies(o)) return null;
  const f = o.f || {}, dead = o.dead || {}, follow = f.c7_follow || {};
  const mates = B3_MATES.filter(k => (o.squad || []).includes(k) && !dead[k] && follow[k] !== false);
  const keep = {}; B3_KEEP.forEach(k => { if (f[k] != null) keep[k] = f[k]; });
  keep.list = 211 + (f.c2_key === 'light' ? 1 : 0) + (f.c4_key === 'aside' ? 1 : 0) + Object.keys(dead).length + (f.listAdds || 0);
  const loy = {}; mates.forEach(k => { loy[k] = clamp(((o.loy || {})[k]) || 0, -2, 3); });
  /* v6.1: the transfer brings what the Fourth carried: the gear each of them wears and the unworn kit, their talents and veteran picks, and every
     trick held by someone who comes across (charges full again). Gear and tricks of the dead and of anyone who stayed behind stay behind. */
  const who = ['sgt', ...mates], gear = {}, picks = {}, worn = new Set();
  who.forEach(k => { gear[k] = {}; Object.entries(((o.gear || {})[k]) || {}).forEach(([slot, it]) => { if (ITEMS[it]) { gear[k][slot] = it; worn.add(it); } });
    picks[k] = (((o.picks || {})[k]) || []).filter(p => PICKS.vet.some(v => v[0] === p) || ((PICKS[3][k] || []).some(v => v[0] === p))); });
  const wornByGone = new Set(); Object.entries(o.gear || {}).forEach(([k, g]) => { if (!who.includes(k)) Object.values(g || {}).forEach(it => wornByGone.add(it)); });
  const kit = (o.kit || []).filter(it => ITEMS[it] && (worn.has(it) || !wornByGone.has(it)));
  const tricks = {}; Object.entries(o.tricks || {}).forEach(([k, t]) => { if (TRICKS[k] && t && who.includes(t.who)) tricks[k] = {who:t.who, ch:0, left:null}; });
  return {from:o.name, sid:id, road:'outlaw', lvl:o.lvl || 1, mates, loy, dead:Object.keys(dead).filter(k => TPL[k] && k !== 'sgt'), f:keep, gear, picks, kit, tricks}; }
/* v6.1: Book Three's Fourth are veterans: every game starts at level 8 (the cap is 15 in Book Three), with the picks a level-8 squad has made.
   The level-3 talent and the veteran picks at 5 and 7 are chosen on the first talk (openPicks), unless a transfer already made them. */
const B3_START_LVL = 8;
const B3_VET_LVLS = [5,7,9,11,13,15];
function b3PicksDue(s){ const due = [];
  if (s.squad.some(k => PICKS[3][k] && !(s.picks[k] || []).some(p => PICKS[3][k].some(o => o[0] === p)))) due.push(3);
  B3_VET_LVLS.filter(l => s.lvl >= l).forEach((l, i) => { if (s.squad.some(k => ((s.picks[k] || []).filter(p => PICKS.vet.some(v => v[0] === p))).length <= i)) due.push(l); });
  return due; }
function newStateMOI(name, importId, sid){
  name = name || 'Hask';
  const imp = importId ? b3Import(importId) : null;
  const s = {v:1, book:'moi', sid:sid || (imp ? newSid() : sidFor(name)), name, scene:'chintro', node:null, bg:null, silver:15, xp:0, lvl:1, card:null,
    inv:{sharper:2, burner:1, cusser:1, salve:2, smoker:1}, loy:{brisk:0, kettle:0, tuft:0, ohl:0}, f:{}, pos:{x:5, y:8},
    trail:[{x:4, y:8}, {x:6, y:8}, {x:4, y:9}, {x:5, y:9}], log:[], ending:null, battle:null, bopt:null,
    squad:[...MOI_PORDER], chapter:0, chapters:{}, area:'pale', ally:{trust:5, dread:1}};
  s.lvl = B3_START_LVL; s.xp = LEVELS[B3_START_LVL - 1];
  if (imp) { s.imported = {from:imp.from, sid:imp.sid, road:'outlaw', lvl:imp.lvl, dead:imp.dead, f:imp.f};
    s.squad = ['sgt', ...imp.mates]; s.loy = Object.assign({}, imp.loy);
    s.gear = imp.gear; s.picks = imp.picks; s.kit = imp.kit; s.tricks = imp.tricks;
    if (imp.f.sgtScar) s.f.sgtScar = 1; } // the alley scar comes with the sergeant (the portrait reads S.f.sgtScar)
  migrate(s); s.picksDue = b3PicksDue(s);
  return s;
}
/* v6.1: a recruit who joins a veteran squad brings her own veteran picks for the levels already passed (in order) */
{ const _recruit = recruit;
  recruit = function(id){ const was = S && S.squad && S.squad.includes(id); _recruit(id);
    if (b3On() && !was && S.squad.includes(id)) { S.picks[id] ??= []; const have = S.picks[id].filter(p => PICKS.vet.some(v => v[0] === p)).length, want = B3_VET_LVLS.filter(l => S.lvl >= l).length;
      PICKS.vet.map(v => v[0]).filter(k => !S.picks[id].includes(k)).slice(0, Math.max(0, want - have)).forEach(k => S.picks[id].push(k)); save(); } }; }
/* how many may join: the squad is at most six (the sergeant, the four, one recruit); an import that lost squadmates leaves room for more */
const B3_CAP = 6;
const b3Room = () => Math.max(0, B3_CAP - ((S && S.squad) || []).length);
const B3_DONE = {sohra:'b3_sohraDone', greysword:'b3_dannetDone'}; // 1 = with the squad, 2 = waiting near with their own people, 0 = declined
const B3_HOME = {sohra:'the Rhivi fires', greysword:'the Grey Swords\' lines'};
const b3Recruit_ = () => (S && Array.isArray(S.squad) && B3_RECRUITS.find(k => S.squad.includes(k))) || null;
/* a recruit joins if there is room; otherwise they wait near with their own people (flag 2) and b3SwapIn can bring them in */
function b3Join(id){ if (!TPL[id] || !B3_RECRUITS.includes(id) || b3In(id)) return false;
  if (b3Room() <= 0) { S.f[B3_DONE[id]] = 2; note(`${NAME(id)} stays with ${B3_HOME[id]} for now. There is no room in the Fourth, and both of you know it.`); save(); return false; }
  S.f[B3_DONE[id]] = 1; recruit(id); return true; }
/* swap the recruit who walks with the squad for the one who waits (like b2SwapIn): the one going out keeps their kit for later */
function b3SwapIn(id){ if (!TPL[id] || !B3_RECRUITS.includes(id) || b3In(id)) return false;
  const out = b3Recruit_();
  if (b3Room() <= 0) { if (!out) return false;
    S.f.b3_allyGear ??= {}; S.f.b3_allyGear[out] = Object.assign({}, S.gear[out] || {}); S.squad = S.squad.filter(x => x !== out); S.gear[out] = {}; S.f[B3_DONE[out]] = 2;
    S.trail = S.trail.slice(0, Math.max(1, S.squad.length - 1)); note(`${NAME(out)} goes back to ${B3_HOME[out]}. Ask at any halt, and she'll come.`); }
  S.f[B3_DONE[id]] = 1; recruit(id);
  Object.entries(((S.f.b3_allyGear || {})[id]) || {}).forEach(([slot, it]) => { if (ITEMS[it] && S.kit.includes(it) && !SQUAD().some(w => Object.values(S.gear[w] || {}).includes(it))) S.gear[id][slot] = it; });
  save(); return true; }
const b3Waiting = id => !!(b3On() && S.f && S.f[B3_DONE[id]] === 2 && !b3In(id) && !(S.dead && S.dead[id]));

/* ---- who reads the Deck in Book Three (36b visReader, 21's captions, 60c's readings) ----
   Tuft while she is in the squad and alive (she read for Book One); without her, Sohra, the Rhivi way (bones and smoke); without both,
   Old Benna, a Host laundress who reads for coppers. {id, name, he, mid}: mid is the name in the middle of a sentence. */
{ const _vr = VISREADER;
  VISREADER = () => { if (!b3On()) return _vr ? _vr() : null;
    if (b3In('tuft')) return {id:'tuft', name:'Tuft', he:false};
    if (b3In('sohra')) return {id:'sohra', name:'Sohra', he:false};
    return {id:'benna', name:'Old Benna', mid:'old Benna', he:false}; }; }

/* ---- how far Book Three goes, for the title: counted from the chapters actually registered ---- */
const b3ChCount = () => Object.keys(BOOK === 'moi' ? CHAPTERS : BOOKSNAP.moi.ch).length;
const b3Progress = () => { const n = b3ChCount(); return n >= 7 ? 'All seven chapters.' : n === 0 ? 'Its chapters are being written.' : n === 1 ? 'Chapter One so far.' : `${['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'][n]} chapters so far.`; };
Object.defineProperty(BOOKS.moi, 'blurb', {configurable:true, get(){ return 'Genabackis, the spring after the Fete, beside Memories of Ice. The Fourth Squad again, with Onearm\'s Host and Caladan Brood\'s army, from the parley at Pale to Coral. Plays on its own; a finished Book One on the outlaw road can carry its Fourth across. ' + b3Progress(); }});
/* the painted title, while the artist's file is loading or if it is missing: Book One's */
Object.defineProperty(BOOKS.moi, 'titleArt', {configurable:true, get(){ return typeof ART !== 'undefined' && ART['title/moi'] ? 'title/moi' : 'title/key'; }});

/* ---- the import, on the title: finished Book One sergeants on the outlaw road ---- */
const b3Finished = () => roster().list.filter(e => (!e.book || e.book === 'gotm') && e.done && b3Qualifies(loadSlot(e.id)));
function b3ImpDesc(id){ const i = id && b3Import(id); if (!i) return 'A fresh start: the Fourth all came out of Darujhistan, and marched north with the Host.';
  const dead = i.dead.map(k => TPL[k].name), went = i.mates.map(k => TPL[k].name);
  return `Sergeant ${esc(i.from)}'s Fourth, as they left Darujhistan: ${went.length ? esc(went.join(', ')) : 'nobody else'}${dead.length ? `. ${esc(dead.join(' and '))} did not come out; there is room for a recruit where they were` : ''}. The sergeant's name comes with them.`; }

/* ---- the words Book Three throws at you: [chapter, word, meaning, met?] (flags the chapters set unlock the later ones) ---- */
GLOSSX.moi = [
  [0, 'Onearm\'s Host', 'Dujek Onearm\'s army on Genabackis. The proclamations say the Empress has outlawed it. The Host says nothing either way, and marches.'],
  [0, 'Caladan Brood', 'The warlord the Host fought for ten years across Genabackis: huge, quiet, with a hammer on his back. Now the Host marches beside him, and nobody has quite got used to it.'],
  [0, 'The Rhivi', 'Herders of the plain, who follow the bhederin and sing to their dead. They fought beside Brood against the Empire. The Mhybe is their elder.'],
  [0, 'The Barghast', 'Clans of the hills and mountains who whiten their faces for war and quarrel with one another more than with anyone else. Some of them have fought for Brood for years.'],
  [0, 'The Tiste Andii', 'Tall, dark-skinned, older than anyone\'s history: Anomander Rake\'s people. Korlat speaks for them while their lord is elsewhere.'],
  [0, 'Moon\'s Spawn', 'The floating fortress that hung over Pale, and then over Darujhistan. Nobody has seen it since the Fete. The Andii do not say where it is.'],
  [0, 'The Pannion Domin', 'A new empire in the south, under a prophet called the Seer, and spreading. It is the reason the two armies are marching together.'],
  [0, 'The Seer', 'The Pannion Seer, in Coral. Nobody in the Host has seen him. The rumours say he is old, and cold, and a great many other things.'],
  [0, 'Tenescowri', 'The Seer\'s peasant army: the starving, driven ahead of the Pannion legions by the hundred thousand. What they do with the fallen is said quietly, if at all.'],
  [0, 'Black Moranth', 'The Moranth of the black chitin, who fly for Dujek on quorls, great winged mounts like dragonflies the size of horses. Their munitions are the Host\'s.'],
  [0, 'Treach', 'The Tiger of Summer. A god new this year, they say, risen as the Boar fell. Soldiers who swore by Fener are learning a different oath.', ()=>godMet('sgt') || !!(S.f && S.f.b3_treach)],
  [1, 'Kallor', 'Brood\'s second. Old, the soldiers say, older than the Empire, a king of somewhere that is not there any more. The soldiers do not like him. He does not appear to need them to.', ()=>!!(S.f && S.f.b3_kallor)],
  [1, 'The Mhybe', 'The Rhivi elder who carries the child. She was young at the turn of the year.', ()=>!!(S.f && S.f.b3_mhybe)],
  [2, 'K\'Chain Che\'Malle', 'Something older than the Imass, walking again: two-legged, long-tailed, grey, with blades where its hands should be. The K\'ell Hunters. Ropes, munitions, and luck.', ()=>!!(S.f && S.f.b3_khell)],
  [3, 'Capustan', 'A city on the Catlin River, under the Pannion siege: a prince, a Mask Council of quarrelling priests, and the Grey Swords on its walls.', ()=>S.chapter >= 3 || !!(S.f && S.f.b3_capustan)],
  [3, 'The Grey Swords', 'Fener\'s Reve, a mercenary company in Capustan\'s pay. Their god was torn down this year. They are learning to pray to wolves.', ()=>!!(S.f && S.f.b3_greyswords)],
  [3, 'Warrens poisoned', 'In the Pannion lands the warrens are fouled. A healer reaching into Denul may find something reaching back.', ()=>!!(S.f && S.f.b3_domin)],
];

/* ---- the journal, the count and the Deeds, by book (38b handles Books One and Two) ---- */
{ const _jn = journalNotes; journalNotes = function(){ const out = _jn(); const i = S && S.book === 'moi' && S.imported;
    if (i) out.unshift(`The Fourth, from Sergeant ${esc(i.from)}'s Book One: north with the Host from Darujhistan.${b3Fallen().length ? ` ${esc(b3FallenNames())} did not come out of the city.` : ''}`);
    return out; }; }
{ const _sr = statsRows; statsRows = function(s){ const r = _sr(s); if (!s || s.book !== 'moi') return r;
    const a = s.ally || {trust:5, dread:1}, st = s.stats || {};
    r.push(['Trust, now', `${a.trust} of ${ALLY_MAX}`], ['Dread, now', `${a.dread} of ${ALLY_MAX}`], ['Warrens that burned', (s.f && s.f.b3_burns) || 0]);
    if (st.trustUp || st.trustDown) r.push(['Trust won and lost', `${st.trustUp || 0} won, ${st.trustDown || 0} lost`]);
    return r; }; }
/* the extra rows on the Deeds page for Book Three (38b bookDeedsHTML calls it) */
function b3DeedsExtra(mine){
  const fin = mine.filter(({s}) => bookDone(s)), trust = mine.map(({s}) => (s.ally && s.ally.trust) || 0), dread = mine.map(({s}) => (s.ally && s.ally.dread) || 0);
  const rows = [['Most trust, now', mine.length ? Math.max(...trust) : 'Not yet'], ['Least dread, now', mine.length ? Math.min(...dread) : 'Not yet'],
    ['Warrens that burned', mine.reduce((a, {s}) => a + ((s.f && s.f.b3_burns) || 0), 0) || 'None yet'], ['Came with the Fourth from Book One', mine.filter(({s}) => s.imported).length || 'None yet'],
    ['Finished at Coral', fin.length || 'Not yet']];
  return `<h4 class="jh">The Alliance</h4><div class="kv">${rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join('')}</div>`; }

/* ---- Book Three's road map: Pale, the Rhivi Plain, Capustan, the Catlin, the Maurik, Coral (as the series map draws it) ---- */
const ROUTE_B3 = [ // chapter -> where (the map is Genabackis from Pale south-east to the coast)
  {x:.14, y:.14, t:'Pale', a:'l'}, {x:.18, y:.17, t:'Pale · the parley'}, {x:.34, y:.3, t:'The Rhivi Plain'}, {x:.52, y:.44, t:'Capustan', a:'l'},
  {x:.56, y:.5, t:'Capustan · the prisoners'}, {x:.62, y:.6, t:'The Catlin', a:'l'}, {x:.72, y:.72, t:'The Maurik'}, {x:.84, y:.86, t:'Coral', a:'l'}];
function drawB3Route(cv, s, t){
  const dpr = Math.min(2, window.devicePixelRatio || 1), W = cv.clientWidth, H = cv.clientHeight; if (!W) return;
  if (cv.width !== Math.round(W*dpr)) { cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr); }
  const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#22261c'); bg.addColorStop(1, '#151810'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let i = 0; i < 60; i++) ctx.fillRect(hash(i, 23)*W, hash(i, 24)*H, 1 + hash(i, 25)*2, 1);
  ctx.fillStyle = '#16304a'; ctx.beginPath(); ctx.moveTo(W*.7, H); ctx.quadraticCurveTo(W*.86, H*.78, W, H*.7); ctx.lineTo(W, H); ctx.fill(); // the coast by Coral
  ctx.fillStyle = 'rgba(106,168,255,.25)'; ctx.font = `italic ${Math.round(Math.max(9, H*.05))}px 'IM Fell English', serif`; ctx.textAlign = 'right'; ctx.fillText('Rust Ocean', W*.98, H*.97);
  ctx.strokeStyle = 'rgba(106,168,255,.45)'; ctx.lineWidth = 2; // the Catlin and the Maurik
  [[.4, .5, .8, .58], [.6, .66, .86, .76]].forEach(([x1, y1, x2, y2]) => { ctx.beginPath(); ctx.moveTo(W*x1, H*y1); ctx.quadraticCurveTo(W*(x1 + x2)/2, H*(y1 + y2)/2 + 10, W*x2, H*y2); ctx.stroke(); });
  for (let i = 0; i < 18; i++) { ctx.fillStyle = 'rgba(170,190,120,.10)'; ctx.fillRect(W*(.18 + hash(i, 26)*.3), H*(.18 + hash(i, 27)*.2), 12, 1); } // the plain
  ctx.fillStyle = 'rgba(180,200,220,.10)'; for (let i = 0; i < 6; i++) { const mx = W*(.7 + i*.05), my = H*(.62 + (i % 2)*.05); ctx.beginPath(); ctx.moveTo(mx - 10, my + 8); ctx.lineTo(mx, my - 8); ctx.lineTo(mx + 10, my + 8); ctx.fill(); } // the cold hills by Coral
  const ch = s.chapter || 0, pts = ROUTE_B3.filter((r, n) => n <= ch).map(r => ({x:r.x*W, y:r.y*H}));
  ctx.strokeStyle = 'rgba(190,210,230,.8)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke(); ctx.setLineDash([]);
  ROUTE_B3.forEach((r, n) => { if (n === 1 || n === 4) return; // the parley and the prisoners are the same places again: one dot each
    const x = r.x*W, y = r.y*H, last = n === 0 ? (ch <= 1) : n === 3 ? (ch === 3 || ch === 4) : n === ch, on = n === 0 ? true : n === 3 ? ch >= 3 : n <= ch, here = last && !bookDone(s) && ch > 0;
    if (!on) { ctx.fillStyle = 'rgba(200,190,170,.18)'; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill(); return; }
    if (here) glow(ctx, x, y, 18, '#bcd4ee', .35 + Math.sin(t/300)*.15);
    ctx.fillStyle = here ? '#dceaf8' : '#8fa8c0'; ctx.beginPath(); ctx.arc(x, y, here ? 5 : 3.5, 0, 7); ctx.fill();
    ctx.fillStyle = here ? '#f2dca6' : 'rgba(230,218,194,.7)'; ctx.font = `600 ${Math.round(Math.max(9, Math.min(13, W*.028)))}px 'Alegreya Sans SC', sans-serif`; ctx.textAlign = r.a === 'l' ? 'right' : 'left';
    ctx.fillText(r.t, x + (r.a === 'l' ? -8 : 8), y - 6); });
}
{ const _drawRoute = drawRoute; drawRoute = function(cv, s, t){ return bookOf(s) === 'moi' ? drawB3Route(cv, s, t) : _drawRoute(cv, s, t); }; }

/* ---- backdrops for Book Three's first halts (the chapters add their own; these reuse Book One's camp drawing) ---- */
Object.assign(SCENES, {
  b3_pale_camp:{loc:'Outside Pale', sub:'The Host\'s camp · spring', cap:'Mud, new grass through it, tent lines to the horizon, and two armies trying not to stare at each other.', amb:'explore'},
  b3_pale_night:{loc:'Outside Pale', sub:'The camps at night', cap:'Two armies\' fires, a long way apart and getting closer, and the Rhivi singing somewhere in between.', amb:'explore'},
});
SCENEX.b3_pale_camp ??= (cv, t) => drawCamp(cv, t, false);
SCENEX.b3_pale_night ??= (cv, t) => drawCamp(cv, t, true);

/* ---- the Book picker holds three books now: a little less padding, so they fit at 360px ---- */
if (typeof document !== 'undefined' && document.head && !document.getElementById('b3css')) {
  const st = document.createElement('style'); st.id = 'b3css';
  st.textContent = '.bseg .btn{padding:4px 4px;min-width:0}.bseg .btn small{font-size:.62rem;white-space:normal;text-align:center}.allypill .dry{color:#c9b6e8}#nm.locked{opacity:.8;font-style:italic}';
  document.head.appendChild(st); }

/* ---- Book One safety: engine text that reads Book One's flags, given Book Three's own words while S.book is 'moi' ----
   (Book One and Book Two see exactly what they saw before; each guard falls through to the original outside Book Three) */
/* the finale's defaults (37 FIN_L), until Book Three's Chapter 7 brings CH7.finale.labels of its own: no prologue on the road page,
   no Book One proclamation, Ohl's list counted the Book Three way, the book's own last line */
{ const B3FIN = {prologue:false, paper:false, list:()=>[b3In('ohl') || b3List() ? 'Ohl\'s list' : 'The list', b3ListWords()], noDead:'None of the Fourth. Every one of them walked out of the Domin.', endline:'The End of <em>The Fair Exchange</em>'};
  Object.keys(B3FIN).forEach(k => { const one = FIN_L[k]; Object.defineProperty(FIN_L, k, {configurable:true, enumerable:true, get(){ return b3On() ? B3FIN[k] : one; }, set(v){ /* kept per book */ }}); }); }
/* the chapter card and end screen fall back to Book One's places by chapter number (6: the Fete, 7: the lakefront) when a chapter names
   no scene; in Book Three they fall back to the plain instead (a chapter's intro.scene / endScene always wins) */
{ const _sci = showChapterIntro; showChapterIntro = function(){ const r = _sci(); const CH = CHAPTERS[S && S.chapter];
    if (b3On() && CH && !(CH.intro && CH.intro.scene)) { G.sceneKind = S.chapter === 1 ? 'b3_pale_camp' : 'plain'; AUDIO.setScene(sceneAmb(G.sceneKind, 'explore')); } return r; }; }
{ const _sce = showChapterEnd; showChapterEnd = function(...a){ const r = _sce(...a); const CH = CHAPTERS[S && S.chapter];
    if (b3On() && CH && !CH.endScene) G.sceneKind = S.chapter === 1 ? 'b3_pale_night' : 'plain_dusk'; return r; }; }
/* the cusser's caption in the pack (19d MUNI) reads Book One's Maud flags; Book Three keeps no Maud rule in a fight (31 maudKept is Book One's) */
{ const _mc = MUNI.cusser[2];
  MUNI.cusser[2] = () => b3On() ? `The big one. Fired from the cradle under a crossbow, never thrown by anyone who wants to keep the arm.${b3In('kettle') ? ' Kettle has a cusser she calls Maud, and says so to anyone who stands too close to the satchel.' : ''}` : (typeof _mc === 'function' ? _mc() : _mc); }

/* Book Three's chapters register in start() (90), after Book Two's: registerChapter(n, B3CHn, 'moi') */

/* each chapter publishes its key values here (B3KEYS[n] = ['x','y']): tools/play.mjs --from=N builds earlier chapters' keys from it */
const B3KEYS = {1:['mhybe','crate'], 2:['herd','wagons'], 3:['field','camps'], 4:['share','hold'], 5:['brood','quiet'], 6:['quorl','maurik'], 7:['host','daru','standdown']};
