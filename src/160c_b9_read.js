/* ============ Book Nine: the readings. The Third reads the Deck of Dragons; the Letherii cast the Tiles of the Holds (v12.0, 160c) ============
   Each squad reads through its own reader, as in Book Seven (120c), by b9As (160): S.book is set to 'hoc' for the Third (Book Four's chain,
   70c: Marrow while she walks, else Tallow, else the old soldier, who in Book Nine is "the old marine" of the heavies' lines) and to 'mt'
   for the Letherii (80, 80c: Perrit while she walks, else the tile-woman, who follows the escort's supply train for a dock; Claude's call)
   for the moment the reader, the captions and the words are asked for. The once-a-book words, the "again" words and every card and tile
   line are Book Nine's own (B9RD, B9SAY, B9SAY_L). The cards are canon Deck cards the earlier books already hold (their effects are
   engine-wide, keyed on S.card); the tiles are Book Five's (B5TILES), their effects given here for the Letherii's fights.
   The v10.0.2 rule: the squad is read before b9As switches the book (b9As passes it in), never after.

   How a chapter uses it (one API for both squads):
     - fill B9READ[n] from the chapter's file: {scene, where, set, back, backT, say:{<reader id>:'…'}}
         the Third's reader ids: marrow, tallow, oldninth. The Letherii's: perrit, tilewoman.
     - put b9ReadChoice(n) among the chapter's first halt choices;
     - register two nodes:  b9_c<n>_read: () => b9ReadOffer(n),  b9_c<n>_card: () => b9ReadCard(n).
   "Let her draw" (or "lay them") sets S.f.b9_c<n>_drawn = 1 and S.f.b9_c<n>_reader; "Not now" sets S.f.b9_c<n>_noCard = 1.
   b9_c<n>_card is what 36b's cardNodeName() returns in Book Nine. */

{ const _vr = VISREADER; VISREADER = () => b9On() ? b9As(() => _vr ? _vr() : null) : (_vr ? _vr() : null); }
{ const _cb = CARDBOOK;
  CARDBOOK = {
    txt:id => b9On() ? b9As(() => _cb.txt(id)) : _cb.txt(id),
    cap(t, self, second){ return b9On() ? b9As(() => _cb.cap(t, self, second)) : _cb.cap(t, self, second); },
  };
  ['square', 'done', 'look'].forEach(k => { if (_cb && typeof _cb[k] === 'function') CARDBOOK[k] = (...a) => b9On() ? b9As(() => _cb[k](...a)) : _cb[k](...a); }); }
/* the tiles are drawn square, obsidian for Perrit and bone for the tile-woman (80c), while the Letherii read */
{ const _dcf = drawCardFlip; drawCardFlip = function(...a){ return b9L() ? b9As(() => _dcf.apply(this, a)) : _dcf.apply(this, a); }; }

/* each chapter's pool leans to one card or tile (three of it), with two others. The Third's chapters draw from Book Four's deck, the Letherii's from Book Five's tiles. */
const B9POOL = {
  1:['herald', 'herald', 'herald', 'b2c_king', 'oponn'],                       // Letheras, the night the dead stirred: a door held open
  2:['b5t_walker', 'b5t_walker', 'b5t_walker', 'b5t_wall', 'b5t_seed'],         // the escort mustered: a long road, no prints
  3:['b2c_queen', 'b2c_queen', 'b2c_queen', 'b4c_leper', 'obelisk'],            // the fever on the road east: water into dry ground
  4:['b5t_hunter', 'b5t_hunter', 'b5t_hunter', 'b5t_seed', 'b5t_watcher'],      // the ration book: a spear in the grass, and thin game
  5:['obelisk', 'obelisk', 'obelisk', 'b3c_lifesoldier', 'b2c_soldier'],        // short rations: something lasts
  6:['b5t_wall', 'b5t_wall', 'b5t_wall', 'b5t_dolmen', 'b5t_gate'],             // the battle's day: stone on stone
  7:['b2c_soldier', 'b2c_soldier', 'b2c_soldier', 'b4c_knightchains', 'b2c_mason'], // the rearguard: stand where you are put
};
const b9Pool = n => (B9POOL[n] || B9POOL[B9_CH[n] === 'l' ? 2 : 1]).filter(id => CARDS[id]);
const b9Rd = () => visReader();
const b9RdObj = () => b9Rd().he ? 'him' : 'her';
/* the once-a-book words, and the "again" words */
const B9RD = {
  marrow:{deck:'Marrow has her Deck out: the temple deck from Nap, the paint gone soft at the corners, that she carried the length of the Chain and across two oceans since. She reads at the first halt of a road, as she always has. Lately she counts the cards before she shuffles.', again:'Marrow has the temple deck out, and counts it first.'},
  tallow:{deck:'Tallow has his grandmother\'s deck out of its oilcloth: fishing-village board, thin as a fingernail now. He lays them two down and one up, the way she did, and keeps his back to the wind so the dust stays off them.', again:'Tallow has the old woman\'s deck out, his back to the wind.'},
  oldninth:{deck:'An old marine reads for the heavies\' lines for a finger of rum: a grey man with a soldier\'s deck that has been to more wars than he has. The Third has never learned his name. He says the cards know it, and the cards are better company.', again:'The old marine has his deck out, and his cup out for the rum.'},
  perrit:{deck:'Perrit has her tiles out of the calfskin pouch: the cadre\'s black stone, small and square. Out here she warms each one in her palm before she lays it, and frowns when it stays cold.', again:'Perrit has the black tiles out, warming them in her palm.'},
  tilewoman:{deck:'The old tile-woman came out of Letheras on the back of a supply wagon, for reasons she keeps in the same oiled bag as her bone tiles. She reads for the escort at the tailboards for a dock, the same as she did in the city, and complains about the dust in the same voice.', again:'The tile-woman has her bone tiles out, and her hand out for the dock.'},
};
const b9RdWords = (id, again) => B9RD[id] ? (again ? B9RD[id].again : B9RD[id].deck) : '';
/* the Third's card lines: the description (Book Four's), then the reader's own line in Book Nine. The King's seat is empty (Hood fell in
   Book Eight, rule 74), and the readers only feel that something is missing. */
const B9SAY = {
  herald:{d:B4SAY.herald.d,
    marrow:`"The Herald," Marrow says. "Holding the door." She glances over her shoulder at the dark city, where something is moving that should not be. "Doors are open all over Letheras tonight, child. Mind which ones you walk through."`,
    tallow:`"The door man," Tallow says. "She'd turn him face down." He turns him face down. Somewhere across the roofs a dog howls and stops. "I think he's already been through."`,
    oldninth:`"Herald," the old marine says. "Door's open." He drinks, and listens to the city a while. "Somebody's dealing more than one hand tonight. Not us. Drink up."`},
  b2c_king:{d:B4SAY.b2c_king.d,
    marrow:`Marrow looks at the King of High House Death and does not turn him over. "The seat's empty," she says. "It's been empty a while now." She puts the card under the others. "Hit what's falling, child. Whoever counts them after isn't who it was."`,
    tallow:`"The hooded man," Tallow says. "She never read him." He frowns at it. "Grandmother said he was always there. He isn't, is he. Look at it."`,
    oldninth:`"Hood's own," the old marine says, and touches the bone at his throat, and stops halfway. "Old habit." He shrugs. "Finish what's going down. Somebody still keeps the gate."`},
  oponn:{d:B4SAY.oponn.d,
    marrow:`"The Twins," Marrow says. "Spinning the coin over a strange road." She leaves it face up. "Don't thank them. And don't spend it before it lands."`,
    tallow:`"Twins," Tallow says. "Grandmother called it a good tide." He looks east, toward the dark where the road goes. "I hope it's that sort of road."`,
    oldninth:`"Luck," the old marine says. "Push or pull. Can't tell which from here." He tips the cup. "Ask me in a month."`},
  b2c_queen:{d:B4SAY.b2c_queen.d,
    marrow:`"The Queen of High House Life," Marrow says. "Water into dry ground." She looks at the squad's water-skins, and at the fever-carts behind the column. "Boil what you drink, child. The Deck says the healing takes. It doesn't say for free."`,
    tallow:`"The lady with the cup," Tallow says. "A good catch, Grandmother said." He looks at the brown water in the ditch. "I'd settle for a clean one."`,
    oldninth:`"Queen with the cup," the old marine says. "Healers heal more." He pours a drop from his canteen on the ground, which out here is a real prayer. "Tell yours to keep it boiling."`},
  b4c_leper:{d:B4SAY.b4c_leper.d,
    marrow:`"The Leper," Marrow says. "Chains. Walks through the bad country and catches nothing." She looks at the mages' wagon, which is quiet these days. "The warrens are thin out here, child. Whatever sorcery the squad has will walk clean. Shorter, but clean."`,
    tallow:`"The bell," Tallow says. "So you know he's coming." He listens. There is only wind, and the column's noise. "Or so you know he's already here."`,
    oldninth:`"Leper," the old marine says. "Mages walk clean and walk short." He nods at the High Mage's tent, far up the column. "Even them, I hear. Don't lean on it."`},
  obelisk:{d:B4SAY.obelisk.d,
    marrow:()=>(S.chapter || 0) >= 5 ? `"Something lasts," Marrow says. She looks round at the squad, thinner than it was in Letheras. "Something. I'd like it to be us."` : `"Something lasts," Marrow says. "The priests said it, and then said not to be pleased." She looks out at the empty land. "Out here I'll take it."`,
    tallow:`"The stone," Tallow says. "For the old men." He sets it down carefully. "It means you'll last. It doesn't say how hungry."`,
    oldninth:`"Obelisk," the old marine says. "You'll last." He taps the card twice. "Doesn't say you'll enjoy it. Never has."`},
  b3c_lifesoldier:{d:B4SAY.b3c_lifesoldier.d,
    marrow:`"Soldier of High House Life," Marrow says. "Kneeling over someone." She looks at the cook-pot, which is mostly water. "There's mending, child. The Deck says it goes further than it should. Somebody else is paying for it."`,
    tallow:`"The kneeling one," Tallow says. "Grandmother liked this one." He looks at the sick-wagon. "I like it too, this week."`,
    oldninth:`"Life's soldier," the old marine says. "Healers heal more." He pours a drop for it. "Tell yours. They'll want to hear something good."`},
  b2c_soldier:{d:B4SAY.b2c_soldier.d,
    marrow:()=>(S.chapter || 0) >= 7 ? `"Soldier of High House Death," Marrow says. "Armour, and a gate behind it." She looks east, at the dust on the horizon, and her hand on the card goes still. "Stand where you're put, child. All of you. Today that's the whole of it."` : `"Soldier of High House Death," Marrow says. "Armour, child, and a gate behind it." She looks at the heavies in their scale. "You're in good company for it."`,
    tallow:`"The grey soldier," Tallow says. "Grandmother said he meant a long watch." He looks along the line. "She never said how long. She never says how long."`,
    oldninth:`"Death's soldier," the old marine says. "Means you stand where you're put." He drinks. "Heavies were made for this card. Lucky us."`},
  b4c_knightchains:{d:B4SAY.b4c_knightchains.d,
    marrow:`Marrow holds it a while. "Chains. A knight who stands alone." She looks at the squad, close round the fire, and then at the gaps in the line beyond it. "Somebody stands alone before this is over. The Deck's sure of that much, and I wish it weren't."`,
    tallow:`"The one that wasn't in her deck," Tallow says. He does not turn it over this time. "It keeps coming. That means something."`,
    oldninth:`"That new one," the old marine says. "Stands on his own and hits harder for it." He looks at the line. "Don't be him if you can help it. Be him if you can't."`},
  b2c_mason:{d:B4SAY.b2c_mason.d,
    marrow:`"The Mason," Marrow says. "High House Death, cutting a long stone for a long hole." She puts it down carefully. "Munitions bite deeper. I don't like who the stone's for."`,
    tallow:`"The stone-cutter," Tallow says. "Grandmother hated this one." He looks at the sappers' crates. "They'll like it, though."`,
    oldninth:`"The Mason," the old marine says. "Your sapper's lucky day." He looks at the far dust a while. "Not everyone's."`},
};
/* the Letherii's tile lines in Book Nine: the descriptions stay Book Five's. The tiles feel cold in the Wastes (the Holds thin, R19.2 S6),
   and no tile names who stands behind it (rule 97: Brys never acts) */
const B9SAY_L = {
  b5t_walker:{d:B5SAY.b5t_walker.d,
    perrit:`"The Walker," Perrit says. "A long road, and no prints." She looks at the column going out of the gate, and the dust it raises. "We will leave prints. The tile does not know about the Malazans."`,
    tilewoman:`"The walking one," the old woman says. "No tracks." She sniffs. "Means a long way. Means your feet first, soldier, and your boots second, and your pride a long way after."`},
  b5t_wall:{d:B5SAY.b5t_wall.d,
    perrit:()=>(S.chapter || 0) >= 6 ? `"The Wall." Perrit squares it against the others. "Stone on stone, no gate." She looks east at the dust and keeps her voice level. "Stand behind each other. Today, nothing else."` : `"The Wall," Perrit says. "Stone on stone." She looks at the drill ground, and the Malazan sergeant walking the front rank. "They are teaching us to be one. The tile agrees, for once."`,
    tilewoman:`"Stone on stone," says the old woman. "Your shields will hold." She looks at the soldiers round her. "They will need to."`},
  b5t_seed:{d:B5SAY.b5t_seed.d,
    perrit:`"The Seed." Perrit turns it, and turns it again, as if it might warm. "A thread of green in the ice." She glances at the water barrels. "Wounds close better than they should. Out here, I will take a tile that says so."`,
    tilewoman:`"The seed," the old woman says, and almost smiles. "A good tile for a dry road." She taps the water-skin at her hip. "Heals more, soldier. Drink less. Both, if you can."`},
  b5t_hunter:{d:B5SAY.b5t_hunter.d,
    perrit:()=>`"The Hunter." Perrit lays it flat. "A spear in the grass." She looks out at the empty country${b9In('kaedra') ? ', and then at Kaedra, who is already looking at it' : ''}. "There is game out there. Not much. Aim well."`,
    tilewoman:`"The spear in the grass," the old woman says. "Means your blows land." She looks at the empty plain. "Means there is something to land them on, which out here is good news."`},
  b5t_watcher:{d:B5SAY.b5t_watcher.d,
    perrit:`"The Watcher." Perrit stops with her hand over it. "Someone at a high window, looking out." She looks up at the empty sky. "No windows here. Something is watching anyway. Keep your heads down."`,
    tilewoman:`"The one at the window," the old woman says. "Means they swing and miss." She looks east. "Means somebody out there is looking this way. Both, soldier. Usually both."`},
  b5t_dolmen:{d:B5SAY.b5t_dolmen.d,
    perrit:`"Dolmen." Perrit is quiet. "Three stones and one laid across them. Very old." She looks at the line forming in the dust. "Stand like that, and you will be here after. That is all it says. It is enough."`,
    tilewoman:`"The old stones," the old woman says. "Very still." She pulls her shawl up against the dust. "Stand still and they cannot move you. Good tile. Bad day for it."`},
  b5t_gate:{d:B5SAY.b5t_gate.d,
    perrit:`"The Gate," Perrit says. "The Dragon Hold. Fire, and the fire going somewhere." She looks behind the line, at the way back. "We will go through something quickly today. Through, I hope. Not back."`,
    tilewoman:`"The stones with the fire," the old woman says. "A door. Through it fast, soldier." She looks at the horizon and stops talking, and packs the tiles away early.`},
};
/* the reader is read inside b9As (Book Four's or Book Five's chain); the squad is passed in from before the switch */
const b9CardSay = id => b9As(t => { const tbl = t === 't' ? B9SAY : B9SAY_L, s = tbl[id] || (t === 't' ? B4SAY : B5SAY)[id], r = b9Rd().id, v = s && (typeof s[r] === 'function' ? s[r]() : s[r]);
  return s ? `${s.d}\n\n${v || ''}`.trim() : ((CARDS[id] && CARDS[id].txt) || ''); });

/* per chapter: the writers fill 3..7. Chapter 1 (the Third, Letheras) and Chapter 2 (the Letherii, the muster) are the worked examples. */
const B9READ = {
  1:{scene:'b9_letheras_night', where:'a kit-crate in the emptied barracks yard', set:'The night before the march, the barracks gone quiet, and somewhere across the city a sound like a roof going in.', back:'b9_c1_fire', backT:'Back to the fire.',
     say:{marrow:'"Everyone else cleared out," Marrow says. "I know. I felt it too. Sit down, child. One card, quietly."', tallow:'"Grandmother said never read on a night the dogs won\'t settle," Tallow says. "They won\'t. One card?"',
          oldninth:'"Stayed in, did you," the old marine says. "Smart. Half the army\'s in the taverns, hiding from whatever that was. One card, and rum after."'}},
  2:{scene:'b9_muster', where:'the tailboard of a supply wagon at the muster', set:'Evening on the escort\'s muster ground, the drill over, and the train being loaded behind the brigades by lamplight.', back:'b9_c2_fire', backT:'Back to the fire.',
     say:{perrit:'"Three tiles," she says. "Before a long road, the school says. The school did not have this road in mind." She does not smile. "Sit, Sergeant."',
          tilewoman:'"Going east with the foreigners," the old woman says. "So am I, on a wagon, for my sins. A dock first. The tiles cost the same in the Wastes."'}},
};

function b9ReadChoice(n){ const r = b9Rd(), t = b9Thread() === 'l';
  return {t:`Sit with ${r.id === 'oldninth' ? 'the old marine' : (r.mid || r.name)} and the ${t ? 'tiles' : 'Deck'}.`, deck:true, req:()=>!S.f[`b9_c${n}_drawn`] && !S.f[`b9_c${n}_noCard`], go:`b9_c${n}_read`}; }
function b9ReadOffer(n, card = `b9_c${n}_card`){ const D = B9READ[n] || B9READ[B9_CH[n] === 'l' ? 2 : 1], r = b9Rd(), seen = S.f['b9_rd_' + r.id], tiles = b9Thread() === 'l';
  return {sp:r.id === 'tilewoman' ? 'The tile-woman' : r.id === 'oldninth' ? 'The old marine' : r.name, scene:D.scene, fx:()=>{ S.f['b9_rd_' + r.id] = 1; }, txt:
`${b9RdWords(r.id, seen)}

${D.set || ''} ${(D.say || {})[r.id] || ''}`.trim(),
    ch:[{t:tiles ? 'Let her lay them.' : `Let ${b9RdObj()} draw.`, deck:true, fx:()=>{ S.f[`b9_c${n}_drawn`] = 1; S.f[`b9_c${n}_reader`] = r.id; S.card = dealCard(b9Pool(n)); }, go:()=>cardSequence(()=>talk(card))},
        {t:'"Not now."', fx:()=>{ S.f[`b9_c${n}_noCard`] = 1; }, go:D.back}]}; }
function b9ReadCard(n){ const D = B9READ[n] || B9READ[B9_CH[n] === 'l' ? 2 : 1], r = b9Rd(), pool = b9Pool(n), id = S.card && CARDS[S.card] ? S.card : pool[0], c = CARDS[id], tiles = b9Thread() === 'l';
  const nm = r.id === 'oldninth' ? 'The old marine' : r.id === 'tilewoman' ? 'The tile-woman' : r.name;
  return {sp:tiles ? 'The Tiles of the Holds' : 'The Deck of Dragons', scene:D.scene,
    txt:tiles ? `${nm} lays the tiles out on ${D.where}. The first ones show ${r.he ? 'him' : 'her'} nothing. The last one does.` : `${nm} lays the reading out on ${D.where}. ${readRefuseLine(b9RdObj())}`,
    html:`<div class="cardinline"><canvas id="icard" width="240" height="360"></canvas></div><div class="note">${esc(c.name)}${c.house && tiles ? ` · ${esc(c.house)}` : ''}${c.fx ? ` · ${esc(c.fx)}` : ''}</div>`, oncard:[id, false],
    after:b9CardSay(id), ch:[{t:D.backT, go:D.back}]}; }

/* ---- the tiles' effects in the Letherii's fights (80c's, keyed on S.card, which read b5On()) ---- */
const b9Tile = () => (b9L() && S.card && B5TILES[S.card]) ? B5TILES[S.card].b5fx : null;
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o), fx = b9Tile(); if (!fx || !a || !t) return c;
    if (fx === 'armour' && t.side === 'p' && !t.ally) c.ac += 1;
    if (fx === 'hit' && a.side === 'p' && !a.ally) c.bonus += 1;
    if (fx === 'ward' && a.side === 'e' && t.side === 'p') c.bonus -= 1;
    return c; }; }
{ const _heal = heal; heal = function(u, n){ return _heal(u, b9Tile() === 'heal' && u && u.side === 'p' && n > 0 ? n + 2 : n); }; }
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (b9Tile() === 'finish' && a && a.side === 'p' && t && t.side === 'e' && t.hp > 0 && t.hp * 2 <= t.maxhp) { const dd = o.dmg || a.dmg; if (dd) o = Object.assign({}, o, {dmg:[dd[0], dd[1], (dd[2] || 0) + 2]}); }
    return _attack(a, t, o); }; }
{ const _mkParty = mkParty;
  mkParty = function(id, x, y){ const u = _mkParty(id, x, y), fx = b9Tile(); if (!fx) return u;
    if (fx === 'hp') { const full = u.hp === u.maxhp; u.maxhp += 4; if (full) u.hp = u.maxhp; }
    if (fx === 'move') u.mv += 1;
    return u; }; }

/* ---- the tables (21b): one per chapter's reading place ----
   1 a kit-crate in the emptied barracks yard, Letheras, night; 2 a supply wagon's tailboard at the muster, lamplight; 3 a stone by the road
   east, a fever-fire; 4 a ration crate at the escort's train in the Wastes; 5 bare ground in the Wastes under the stars, a dung-fire;
   6 a shield laid on the plain at dawn before the battle; 7 the plain after dark, lit by what is burning. */
Object.assign(READTABLE, {
  'dod:1':{surf:'wood', p:{base:'#4a3c2c', dark:'#1c1610', planks:4}, light:'lantern', lp:[.12, .1], lc:'#ffc070', air:'none', dark:'#08070a', props:[['lantern', .12, .1, 14], ['cup', .86, .84, 12]]},
  'dod:2':{surf:'wood', p:{base:'#5a4a36', dark:'#241c12', planks:3}, light:'lantern', lp:[.88, .12], lc:'#ffc070', air:'dust', dark:'#0a0806', props:[['lantern', .88, .12, 14], ['coin', .14, .84, 9]]},
  'dod:3':{surf:'stone', p:{base:'#6a5c48', dark:'#2a2218', cracks:3}, light:'fire', lp:[.9, .9], lc:'#ff9040', air:'sparks', dark:'#0a0806', props:[['jug', .12, .16, 14]]},
  'dod:4':{surf:'wood', p:{base:'#6a5a42', dark:'#2a2216', planks:5}, light:'dusk', lp:[.5, 0], lc:'#d09070', air:'dust', dark:'#0e0c0a', props:[['coin', .86, .16, 9]]},
  'dod:5':{surf:'ground', p:{base:'#7a6a50', dark:'#2a2418', stones:20, grass:40, grassCol:'#8a7a4a'}, light:'coals', lp:[.5, .96], lc:'#ff6a30', air:'none', dark:'#060504', props:[['cup', .86, .14, 12]]},
  'dod:6':{surf:'shield', p:{base:'#4a5058', dark:'#1e2228', under:{base:'#7a6a50', dark:'#2a2418', stones:30, grass:30, grassCol:'#8a7a4a'}}, light:'dawn', lp:[.92, .12], lc:'#e8c8a0', air:'dust', dark:'#0a0a0c', props:[]},
  'dod:7':{surf:'ground', p:{base:'#5a4c3a', dark:'#1a140e', stones:40}, light:'fire', lp:[.5, 0], lc:'#ffb060', air:'ash', dark:'#08080a', props:[['helm', .12, .84, 16]]},
});
