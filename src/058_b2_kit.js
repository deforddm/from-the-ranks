/* ============ Book Two: the squad's kit, and water as the money (v5.3) ============ */
/* Book Two had seventeen items, all trinkets, six of them parting gifts, and nothing to spend silver on. This file gives it a weapon or a
   piece of armour in every chapter, made for this squad, and five pieces with their own effects; and it makes water the money. On the
   Chain nobody wants silver. Traders walk in the column and take skins (b2Buy); the games at the fires are played for skins (58b).
   - Heavy armour (it.heavy) is a real choice: the armour is good, and at noon in a heat fight it is an oven (B2_HEAVY, 47), unless the
     wearer drank first, or wears a desert robe over it (b2_robe).
   - Specials: the Semk god-fetish (a fouled spell comes out clean, once a chapter), the Silanda's plank (it bites back, once a fight), the
     cold iron knife (a blow that lands slows), the Trygalle's skin (a rest costs no water, once a chapter), the desert robe (no heat).
   - The HUD drops silver in Book Two; the pack counts water. The Geleen's chests are still the Seventh's silver, because they are. */

/* who can carry what: the Book Two squad, the sergeant included */
const B2W = {front:['sgt', 'haddat', 'redblade'], blade:['sgt', 'haddat', 'redblade', 'sathi', 'warlock'], light:['sgt', 'sathi', 'tangle', 'marrow', 'warlock'], all:null};
const B2_ITEMS = {
  /* Chapter 1, Hissar: the garrison quartermaster, giving out what will not fit on the carts */
  b2_auxtulwar:{name:'An auxiliary\'s tulwar', slot:'weapon', who:B2W.front, atk:1, dmg:[1,8,3], line:'A Hissari auxiliary\'s tulwar from the garrison racks, the blue cord on the grip faded white. Heavier at the tip than a Malazan blade, and it wants to be swung, not pointed.'},
  b2_auxmail:{name:'Auxiliary mail', slot:'armour', who:['sgt', 'haddat', 'redblade', 'tangle'], ac:2, hp:2, heavy:true, line:'A long auxiliary mail shirt off the garrison racks, oiled against the sand. Good mail. Heavy mail: at noon in the heat it is an oven, unless the wearer drank first.'},
  /* Chapter 2: a Weasel horse-boy at Dryj Spring; Semk loot on the Sekala's west bank, sold by a camp follower for water */
  b2_horsebow:{name:'A Weasel horse-bow', slot:'weapon', who:['sathi', 'sgt'], atk:1, rng:1, dmg:[1,8,0], line:'A Weasel Clan horse-bow, short and doubled back on itself, horn and sinew, with a fresh string. The boy who gave it to you had a better one. He made a point of saying so.'},
  b2_semkaxe:{name:'A Semk war-axe', slot:'weapon', who:B2W.front, dmg:[1,10,2], line:'A broad-bladed Semk axe with the god\'s marks burnt into the haft. It came up off the west bank after the ford. It is heavy in the head and does not care what it hits.'},
  b2_fetish:{name:'A Semk god-fetish', slot:'trinket', who:null, stat:{wits:1}, line:'A knot of hair, bone and painted clay off a dead Semk on the west bank: the god they wore, before the spirits ate it. Held by a squadmate who casts, a spell the fouled warren would spoil comes out clean instead, once a chapter. Marrow says not to ask it why.'},
  b2_wickanhide:{name:'Wickan hardened hide', slot:'armour', who:B2W.light, ac:1, mv:1, line:'A Wickan rider\'s hide coat, boiled and hardened, fringed at the yoke. It turns a knife and it does not cook you. The Wickans laugh at Malazans in mail.'},
  /* Chapter 3: a Kanese tinker at the P'atha; the column's stragglers at the Shallows */
  b2_tithlance:{name:'A Tithansi lance', slot:'weapon', who:['redblade', 'haddat', 'sgt'], atk:1, rng:1, ac:-1, reach:true, dmg:[1,10,1], line:'A Tithansi lance, cut down to a long spear. It reaches over a shield to the man behind it, and leaves the one holding it a little open.'},
  b2_robe:{name:'A desert robe', slot:'trinket', who:null, line:'A pale Odhan robe worn over whatever else you wear, the way the tribes wear them. Whoever wears it never feels the heat in a noon fight, mail or no mail. The Malazans laughed at the tribes for these. The Malazans have stopped laughing.'},
  /* Chapter 4: the Council's carriages. A noble's man sells what his master will not miss, for the water his master wants */
  b2_noblesabre:{name:'A noble\'s sabre', slot:'weapon', who:B2W.blade, atk:2, dmg:[1,8,1], line:'A Falari-steel sabre with a silver basket hilt and a crest somebody has scratched off. It has never been used. It is much the best blade in the squad.'},
  b2_officerscale:{name:'An officer\'s scale', slot:'armour', who:B2W.front, ac:3, heavy:true, line:'A dead officer\'s scale coat, Malazan, the plates still bright. The best armour on the Chain. In a noon fight it is also the hottest thing on the Chain.'},
  /* Chapter 4, the far bank: a Foolish Dog who crossed on the Silanda */
  b2_plank:{name:'A plank of the Silanda', slot:'trinket', who:null, hp:2, line:'A splinter of black wood off the Silanda, the burnt ship that should not float, with something carved in it nobody can read. Once a fight, when the bearer is hit, the wood bites back at whoever struck. Do not leave it on the ground at night.'},
  /* Chapter 5: the Jaghut tower; the Trygalle Trade Guild, who trade in anything, and in water like everyone else */
  b2_coldknife:{name:'A cold iron knife', slot:'weapon', who:['marrow', 'warlock', 'tangle', 'sathi', 'sgt'], atk:2, dmg:[1,6,2], line:'A knife found in the ice of the Jaghut tower, cold to hold and never warmer. A blow it lands leaves the wound cold: the enemy is slowed on its next turn. Keth\'s grandmother will not touch it.'},
  b2_tcrossbow:{name:'A Trygalle crossbow', slot:'weapon', who:['tangle', 'sgt', 'sathi'], atk:1, dmg:[1,10,2], line:'A shareholder\'s crossbow, Trygalle-made, with a windlass that winds itself if you speak to it nicely. Tangle says it is the best crossbow on two continents and will not let anybody else oil it.'},
  b2_tleathers:{name:'Trygalle leathers', slot:'armour', who:B2W.light, ac:2, line:'Shareholder\'s leathers, layered and stitched with something that is not thread, scuffed by roads that are not on any map.'},
  b2_tskin:{name:'A Trygalle skin', slot:'trinket', who:null, line:'A Trygalle waterskin, with a stopper on a chain. It holds more than it should. Carried by a squadmate, it means one rest a chapter costs no water. The shareholder said not to look inside. Nobody has.'},
  /* Chapter 6: the Khundryl, at Sanimon */
  b2_horsehair:{name:'A Khundryl horsehair cloak', slot:'armour', who:null, ac:1, stat:{guile:1}, line:'A Khundryl cloak of black horsehair, oiled, that sheds the dust and the rain and most of the arrows. The Khundryl wear them painted for their own funerals. This one is not painted. Yet.'},
  b2_khundrylblade:{name:'A Khundryl blade', slot:'weapon', who:B2W.blade, atk:1, dmg:[1,8,3], line:'A Khundryl horseman\'s curved blade, long for a man on foot. The warrior who traded it said it had been in three wars and wanted a fourth.'},
  /* Chapter 7: Aren. The stores, open to the Seventh's squads before the wall; and on the quay, after the crows, a feather */
  b2_arensword:{name:'An Aren longsword', slot:'weapon', who:B2W.front, atk:1, dmg:[1,10,3], line:'A longsword from the Aren stores, never drawn, still in its grease. Ten thousand men in this city have one just like it and have not used it either.'},
  b2_arenmail:{name:'Aren Guard mail', slot:'armour', who:['sgt', 'haddat', 'redblade', 'tangle'], ac:3, hp:2, heavy:true, line:'Clean mail from the Aren stores, oiled, every ring whole. In a noon fight it is an oven, like all mail. In Aren it has never been in a noon fight.'},
  b2_crowfeather:{name:'A crow\'s feather', slot:'trinket', who:null, stat:{might:1, wits:1, guile:1}, line:'A black feather the length of a hand, from the cloak of feathers the Fist wore, that a Wickan child picked up off the quay and gave to the sergeant without a word. The Wickans do not say whose it was. They do not need to.'},
};
Object.assign(B2CH1.gear ??= {}, {b2_auxtulwar:B2_ITEMS.b2_auxtulwar, b2_auxmail:B2_ITEMS.b2_auxmail});
Object.assign(B2CH2.gear ??= {}, {b2_horsebow:B2_ITEMS.b2_horsebow, b2_semkaxe:B2_ITEMS.b2_semkaxe, b2_fetish:B2_ITEMS.b2_fetish, b2_wickanhide:B2_ITEMS.b2_wickanhide});
Object.assign(B2CH3.gear ??= {}, {b2_tithlance:B2_ITEMS.b2_tithlance, b2_robe:B2_ITEMS.b2_robe});
Object.assign(B2CH4.gear ??= {}, {b2_noblesabre:B2_ITEMS.b2_noblesabre, b2_officerscale:B2_ITEMS.b2_officerscale, b2_plank:B2_ITEMS.b2_plank});
Object.assign(B2CH5.gear ??= {}, {b2_coldknife:B2_ITEMS.b2_coldknife, b2_tcrossbow:B2_ITEMS.b2_tcrossbow, b2_tleathers:B2_ITEMS.b2_tleathers, b2_tskin:B2_ITEMS.b2_tskin});
Object.assign(B2CH6.gear ??= {}, {b2_horsehair:B2_ITEMS.b2_horsehair, b2_khundrylblade:B2_ITEMS.b2_khundrylblade});
Object.assign(B2CH7.gear ??= {}, {b2_arensword:B2_ITEMS.b2_arensword, b2_arenmail:B2_ITEMS.b2_arenmail, b2_crowfeather:B2_ITEMS.b2_crowfeather});

/* ---------------- water as the money ---------------- */
const b2Worn = (id, item) => !!(S && S.gear && S.gear[id] && Object.values(S.gear[id]).includes(item));
const b2Carrier = item => (S && Array.isArray(S.squad) ? S.squad.find(w => b2Worn(w, item)) : null) || null;
/* buy a thing for water: off the skins, into the kit, onto whoever it suits */
function b2Buy(item, price, from){ const it = ITEMS[item]; if (!it || S.kit.includes(item) || chainW() < price) return false;
  chain(-price, 0, from || 'Paid'); S.kit.push(item); AUDIO.play('coin'); note(`Bought: ${it.name}, for ${numw(price)} skin${price === 1 ? '' : 's'} of water.`, 'good');
  const who = placeGear(item); if (who) note(`${NAME(who)} takes it: it suits ${who === 'sgt' ? 'you' : NAME(who)} best of those with a free hand for it.`, 'good');
  tally('waterSpent', price); save(); return true; }
/* what a ware does, in a few words, for the trader's list */
/* v8.1: the one stat line (14b itemStatLine), heavy and specials included; the specials' words are ITEM_SPECIAL's (B2_SPECIAL is gone) */
function b2WareSays(item){ return ITEMS[item] ? itemStatLine(item) : ''; }
/* a trader's node: what they have, at what price, and a choice for each thing the squad can afford. o: {sp, txt(), wares:[[item, price]], haggle} */
function b2Trader(node, o){ return () => { const left = o.wares.filter(([it]) => !S.kit.includes(it)), w = chainW();
  return {sp:o.sp, fx:()=>{ S.f[node] = 1; }, txt:`${typeof o.txt === 'function' ? o.txt() : o.txt}${left.length ? `\n\n${left.map(([it, p]) => `*${ITEMS[it].name}*, ${numw(b2Price(node, it, p))} skin${b2Price(node, it, p) === 1 ? '' : 's'}: ${b2WareSays(it)}.`).join('\n\n')}` : `\n\n${o.empty || 'There is nothing left you could use.'}`}`,
    html:chainHTML(), ch:[
      ...left.map(([it, p]) => { const q = b2Price(node, it, p); return {t:`Buy the ${ITEMS[it].name.replace(/^(A|An|The) /, '').toLowerCase()}.`, tag:`${q} water`, req:()=>chainW() >= q, fx:()=>{ b2Buy(it, q, o.sp); }, go:node}; }),
      ...(o.haggle !== false ? left.filter(([it]) => !(S.f.b2_haggled || {})[it]).map(([it, p]) => ({t:`Haggle for the ${ITEMS[it].name.replace(/^(A|An|The) /, '').toLowerCase()}.`, tag:'Haggle', go:()=>playHaggle({item:it, price:b2Price(node, it, p), node, trader:o.sp})})) : []),
      ...(o.more ? o.more() : []),
      {t:left.length && !left.some(([it, p]) => w >= b2Price(node, it, p)) ? 'Not enough water. Leave it.' : 'Leave it.', go:()=>startExplore()}]}; }; }
/* a price, after any haggling (S.f.b2_price[node:item]) */
const b2Price = (node, item, p) => { const k = (S.f.b2_price || {})[node + ':' + item]; return k != null ? k : p; };

/* ---------------- where each piece is ---------------- */
const b2Npc = (n, aid, o) => { const A = b2Area(n, aid); if (A) A.npcs.push(o); };
b2Npc(1, 'b2_gate', {id:'qm1', name:'The quartermaster', kind:'b2soldier', x:12, y:4, node:()=>'b2_qm1', fresh:()=>!S.f.b2_qm1});
b2Npc(2, 'b2_dryj', {id:'horseboy', name:'A Weasel horse-boy', kind:'weasel', x:12, y:5, node:()=>'b2_horseboy', fresh:()=>!S.f.b2_horseboy});
b2Npc(2, 'b2_westbank', {id:'follower2', name:'A camp follower', kind:'hissari_w', x:3, y:4, node:()=>'b2_follower2', show:()=>!!S.f.b2_blown, fresh:()=>!!S.f.b2_blown && !S.f.b2_follower2});
b2Npc(3, 'b2_patha', {id:'tinker3', name:'A Kanese tinker', kind:'hissari_m', x:6, y:6, node:()=>'b2_tinker3', fresh:()=>!S.f.b2_tinker3});
b2Npc(4, 'b2_carriages', {id:'servant4', name:'A noble\'s man', kind:'hissari_m', x:4, y:8, node:()=>'b2_servant4', fresh:()=>!S.f.b2_servant4});
b2Npc(4, 'b2_farbank', {id:'silanda4', name:'A Foolish Dog rider', kind:'foolish_dog', x:2, y:5, node:()=>'b2_silanda4', fresh:()=>!S.f.b2_silanda4});
b2Npc(5, 'b2_jtower', {id:'icesapper', name:'One of Mincer\'s sappers', kind:'sapper', x:12, y:4, node:()=>'b2_icesapper', fresh:()=>!S.f.b2_icesapper});
b2Npc(5, 'b2_karpcamp', {id:'trader5', name:'The Trygalle\'s trader', kind:'trygalle_guard', x:4, y:4, node:()=>'b2_trader5', fresh:()=>!S.f.b2_trader5});
b2Npc(6, 'b2_hills', {id:'ktrader6', name:'A Khundryl horse-trader', kind:'khundryl', x:12, y:4, node:()=>'b2_ktrader6', fresh:()=>!S.f.b2_ktrader6});
b2Npc(7, 'b2_aren', {id:'stores7', name:'The Aren stores', kind:'aren_guard', x:4, y:4, node:()=>'b2_stores7', show:()=>b2Ph7() <= 1, fresh:()=>b2Ph7() <= 1 && !S.f.b2_stores7});
b2Npc(7, 'b2_quay', {id:'feather7', name:'A Wickan child', kind:'child', x:13, y:2, node:()=>'b2_feather7', show:()=>b2Ph7() >= 2, fresh:()=>b2Ph7() >= 2 && !S.f.b2_feather7});

Object.assign(B2CH1.dlg, {
  b2_qm1:()=>({sp:'The quartermaster', fx:()=>{ S.f.b2_qm1 = 1; }, txt:
`A quartermaster-sergeant of the garrison is standing on the tailboard of a cart in the gate square, throwing things off it. Tents. A field-oven. A crate of something that breaks. He has been told what will fit on the carts, and it is not much, and what will not fit he is giving to anyone with a Seventh badge who will carry it.

"Third Squad? Good. Take something. Take something before the rebels do." He kicks a rack. "Auxiliary kit. Tulwars. Mail. They were going back to the Hissari, but the Hissari have gone over the wall with green on their arms." He looks at ${b2In('haddat') ? 'Haddat, who has not' : 'the square, full of people who have not'}. "One each thing, Sergeant. I am not a market."`,
    ch:[{t:'Take a tulwar.', req:()=>!S.kit.includes('b2_auxtulwar'), fx:()=>{ gain('b2_auxtulwar'); }, go:'b2_qm1b'},
        {t:'Take a mail shirt.', req:()=>!S.kit.includes('b2_auxmail'), fx:()=>{ gain('b2_auxmail'); }, go:'b2_qm1b'},
        {t:'Leave it for someone who needs it more.', go:()=>startExplore()}]}),
  b2_qm1b:()=>({sp:'The quartermaster', txt:`"Good. One less thing for the Apocalypse." He throws a field-oven off the cart. It lands on its door and stays there. ${!S.kit.includes('b2_auxtulwar') || !S.kit.includes('b2_auxmail') ? '"Go on. The other as well. Before I change my mind or the city falls in on us, whichever."' : '"That\'s the lot. Go and walk somewhere."'}`,
    ch:[{t:'Take a tulwar too.', req:()=>!S.kit.includes('b2_auxtulwar'), fx:()=>{ gain('b2_auxtulwar'); }, go:'b2_qm1b'},
        {t:'Take a mail shirt too.', req:()=>!S.kit.includes('b2_auxmail'), fx:()=>{ gain('b2_auxmail'); }, go:'b2_qm1b'},
        {t:'On.', go:()=>startExplore()}]}),
});
Object.assign(B2CH2.dlg, {
  b2_horseboy:()=>({sp:'A Weasel horse-boy', fx:()=>{ S.f.b2_horseboy = 1; }, txt:
`A Weasel boy of about twelve is holding six horses at the edge of the tamarisks, and looking at you as if you were a seventh horse, and not a good one.

${b2In('sathi') ? `He sees Sathi and his face changes completely. They talk in Weasel, fast, both of them laughing, and then he unslings a bow off his own back and holds it out to her. "He says mine is bad," Sathi tells you. "It is not bad. He says his cousin's is better, and he will take his cousin's, and his cousin can have mine." She takes it with a nod. "This is how the Weasels say thank you for the spring."` : `"Malazan," he says. "You have a bow?" You do not. "You should have a bow. Everybody should have a bow." He holds one out, short and doubled back on itself. "A skin of water. For the horses. Not for me."`}`,
    ch:[{t:'Take the bow.', req:()=>b2In('sathi') && !S.kit.includes('b2_horsebow'), fx:()=>{ gain('b2_horsebow'); }, go:()=>startExplore()},
        {t:'A skin of water for the bow.', tag:'1 water', req:()=>!b2In('sathi') && !S.kit.includes('b2_horsebow') && chainW() >= 1, fx:()=>{ b2Buy('b2_horsebow', 1, 'For the horses'); }, go:()=>startExplore()},
        {t:'Leave him to the horses.', go:()=>startExplore()}]}),
  b2_follower2:b2Trader('b2_follower2', {sp:'A camp follower', txt:()=>`A woman from the weavers' street has spread a blanket on the stony ground above the river, and on it is what came off the dead Semk on the west bank in the night: an axe, a coat of Wickan hide somebody traded her for bread, and a knot of hair and bone and painted clay she will not touch with her bare hand.

"Water," she says. "Not silver. This river has no use for silver. Silver does not wet anything."`,
    wares:[['b2_semkaxe', 2], ['b2_wickanhide', 2], ['b2_fetish', 3]], empty:'She rolls up the empty blanket. "That\'s the dead picked clean, then."'}),
});
Object.assign(B2CH3.dlg, {
  b2_tinker3:b2Trader('b2_tinker3', {sp:'A Kanese tinker', txt:()=>`An old Kanese tinker has walked his handcart all the way from Hissar, and set up shop on it at the edge of the camp as if this were a market day in Kan: pots, buckles, needles, a lance off a dead Tithansi, a pale Odhan robe folded very neatly.

"The robe is for the noon," he says. "The tribes are not fools. Malazans walk the Odhan in iron, and then they are surprised." He holds up the lance. "And this, for reaching over things."${b2In('redblade') ? `\n\nRamin takes the lance from him, weighs it, sights along it, and hands it back with a small bow. "Tithansi," he says. "Too long in the head and too short in the haft. In the right hands it will do." He does not say whose hands those are. He does not have to.` : ''}`,
    wares:[['b2_tithlance', 2], ['b2_robe', 3]], empty:'"Sold out," he says, with enormous satisfaction. "On the Odhan. In a war. Write that down, somebody."'}),
});
Object.assign(B2CH4.dlg, {
  b2_servant4:b2Trader('b2_servant4', {sp:'A noble\'s man', txt:()=>`A noble's man, in a good coat gone grey with dust, is standing behind the last carriage in the ring with a long bundle under his arm, looking both ways before he speaks.

"My master has water for his horses and not for his household," he says, very low. "He will not notice these are gone. He has not noticed anything since Hissar." He unrolls the bundle: a sabre with a scratched-off crest, never used; a dead officer's scale coat, the plates still bright. "Water, soldier. Skins. For the children in the kitchen cart."${b2In('redblade') ? `\n\nRamin looks at the officer's scale, at the bright plates, and touches his own red ones, once. "Somebody kept that well," he says. "Then somebody stopped."` : ''}`,
    wares:[['b2_noblesabre', 4], ['b2_officerscale', 4]], empty:'He folds the empty cloth and goes back to the kitchen cart.'}),
  b2_silanda4:()=>({sp:'A Foolish Dog rider', fx:()=>{ S.f.b2_silanda4 = 1; }, txt:
`A Foolish Dog warrior with his arm strapped to his chest is sitting on a root at the edge of the trees, turning something over in his good hand. He went down the river on the Silanda with the wounded, and came back up the bank this morning, and has not said a word about it to anyone.

He holds the thing out to you: a long splinter of black wood, with something carved into it that is not any writing you know. "Off the deck," he says. "It came away in my hand. I do not want it." He looks at the river. "It bites. Not me. Things that hit me."${b2In('warlock') ? `\n\nKeth, behind you, takes a step back. "The grandmother says keep it," he says. "She says to keep it away from her."` : ''}`,
    ch:[{t:'Take the splinter.', fx:()=>{ gain('b2_plank'); }, go:()=>startExplore()}, {t:'Leave it with him.', go:()=>startExplore()}]}),
});
Object.assign(B2CH5.dlg, {
  b2_icesapper:()=>({sp:'One of Mincer\'s sappers', fx:()=>{ S.f.b2_icesapper = 1; }, txt:
`One of Mincer's sappers is sitting on the tower's cold floor with her hands tucked into her armpits, staring at a knife on the flagstones in front of her.

"Found it in the ice," she says. "In the wall. Chipped it out." She does not pick it up. "It's cold. It doesn't get warm. I've had it in my shirt an hour and it doesn't get warm." She pushes it toward you with her boot. "You have it. Mincer says it's Jaghut, and Mincer says a lot of things, and I've decided to believe this one."`,
    ch:[{t:'Take the knife.', fx:()=>{ gain('b2_coldknife'); }, go:()=>startExplore()}, {t:'Leave it in the tower.', go:()=>startExplore()}]}),
  b2_trader5:b2Trader('b2_trader5', {sp:'The Trygalle\'s trader', haggle:true, txt:()=>`The Trygalle Trade Guild's carriage stands at the edge of the camp with its horses blowing and its wheels steaming, and beside it a shareholder has opened a long box on two trestles: a crossbow, leathers, a waterskin with a stopper on a chain.

"We came through a warren with a war in it to bring the Fist a bottle," she says. "While we're here, we trade. Water, Sergeant. Everything on this continent is priced in water this summer, and the Guild is not stupid." She taps the skin with one gloved finger. "That one holds more than it should. Don't look inside."`,
    wares:[['b2_tcrossbow', 4], ['b2_tleathers', 3], ['b2_tskin', 5]], empty:'"Cleaned out," she says. "On the Nenoth. The partners will never believe it."'}),
});
Object.assign(B2CH6.dlg, {
  b2_ktrader6:b2Trader('b2_ktrader6', {sp:'A Khundryl horse-trader', txt:()=>`A Khundryl warrior with his face half painted is sitting by his horses with a cloak of black horsehair over his knees and a long curved blade across it. He has come a long way to fight somebody else's war, and he has things he will not need.

"Water," he says, in trade-talk. "My horses drink. Your silver does not." He shakes out the cloak. "This one is not painted. Paint it when you are ready."${b2In('warlock') ? `\n\nKeth squats down by the Khundryl's paint-pots and sniffs them. The old woman, out of him, approving: "Ochre and ash. Proper manners. Buy something, Malazan, so he thinks well of us."` : ''}${b2In('redblade') ? `\n\nThe Khundryl looks at Ramin's red scale and says something in trade-talk. Ramin answers in the same, with a bow, and the Khundryl laughs and slaps his own knee.` : ''}`,
    wares:[['b2_horsehair', 3], ['b2_khundrylblade', 3]], empty:'He nods, once, and goes back to his paint.'}),
});
Object.assign(B2CH7.dlg, {
  b2_stores7:()=>({sp:'The Aren stores', fx:()=>{ S.f.b2_stores7 = 1; }, txt:
`The Aren stores are open, for once: a Guard sergeant with a slate at the door of a warehouse full of things nobody has used, letting the Seventh's squads in two at a time and not writing anything down.

"Take what you'll carry up the wall," he says. "The High Fist says the stores are for the city's army. The city's army has more than it can carry already." He waves a hand at the crates. "There's been no count kept all summer."`,
    ch:[{t:'A longsword, still in its grease.', req:()=>!S.kit.includes('b2_arensword'), fx:()=>{ gain('b2_arensword'); }, go:'b2_stores7'},
        {t:'A mail shirt, every ring whole.', req:()=>!S.kit.includes('b2_arenmail'), fx:()=>{ gain('b2_arenmail'); }, go:'b2_stores7'},
        {t:'Fill every skin at the cistern.', req:()=>chainW() < CHAIN_MAXW && !S.f.b2_storesWater, fx:()=>{ S.f.b2_storesWater = 1; chain(CHAIN_MAXW - chainW(), 0, 'The Aren cistern'); }, go:'b2_stores7'},
        {t:'Up to the wall.', go:()=>startExplore()}]}),
  b2_feather7:()=>({sp:'A Wickan child', fx:()=>{ S.f.b2_feather7 = 1; }, txt:
`A Wickan child, a Crow girl no older than eight, walks up to you on the quay without a word and holds out a feather: black, the length of your hand, with the light going blue along it.

She waits until you take it. Then she goes back to the other children, at the end of the quay, and sits down with them, and none of them look at you, and all of them know.${b2OH() && b2In(b2OH()) ? `\n\n${NAME(b2OH())} watches her go. "On Genabackis we'd have called that an omen," ${['ohl', 'vell'].includes(b2OH()) ? 'he' : 'she'} says. "Here I think it's just thanks."` : ''}`,
    ch:[{t:'Keep it.', fx:()=>{ gain('b2_crowfeather'); }, go:()=>startExplore()}]}),
});

/* ---------------- what the special pieces do ---------------- */
/* the Semk fetish: once a chapter, a spell the fouled warren would spoil comes out clean (47's useAb asks b2Steady before it sputters) */
function b2Steady(u){ if (!u || !b2Worn(u.id, 'b2_fetish') || S.f.b2_fetishCh === S.chapter) return false;
  S.f.b2_fetishCh = S.chapter; blog(`<em>The warren comes up thick and wrong, and the Semk fetish at ${u.name}'s belt goes hot.</em> The spell comes out clean.`); float(u, 'clean', '#c8a24a'); return true; }
/* the Silanda's plank bites back, once a fight; the cold iron knife slows what it cuts */
{ const _attack = attack; attack = function(a, t, o = {}){ const r = _attack(a, t, o);
  if (S && S.book === 'dg' && B && r && r.hit) {
    if (a && a.side === 'p' && !a.ally && b2Worn(a.id, 'b2_coldknife') && cheb(a, t) <= 1) later(() => { if (B && t.hp > 0) { t.slowTurn = true; float(t, 'cold', '#bfe8ff'); } }, pace(200));
    if (a && a.side === 'e' && t && t.side === 'p' && !t.ally && b2Worn(t.id, 'b2_plank') && !B.used['plank_' + t.id]) { B.used['plank_' + t.id] = 1;
      later(() => { if (!B || a.hp <= 0) return; blog(`<em>The black wood at ${t.name}'s belt bites.</em> ${a.name} takes 3.`); hurt(a, 3); sparks(a.x, a.y, 10, '#3a2a3a', .5); updBattleUI(); }, pace(300)); } }
  return r; }; }
/* the Trygalle skin: one rest a chapter costs no water */
{ const _rest = dgRest; dgRest = function(t){ if (S && b2Carrier('b2_tskin') && S.f.b2_tskinCh !== S.chapter) { S.f.b2_tskinCh = S.chapter; note('The Trygalle skin is full again. It was empty last night. The rest costs no water.', 'good'); rest(t || 'The squad rests in what shade there is. Wounds close, mostly.'); return true; } return _rest(t); }; }

/* ---------------- the HUD and the pack count water, not silver ---------------- */
{ const _u = updSilver; updSilver = function(){ _u(); const el = typeof document !== 'undefined' && document.getElementById('silver'); if (el) el.style.display = S && S.book === 'dg' ? 'none' : ''; }; }
