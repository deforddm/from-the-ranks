/* ============ Book Ten: the readings. The Third reads the Deck of Dragons; the Letherii cast the Tiles of the Holds (v13.0, 180c) ============
   As Book Nine's 160c, under Book Ten's names. Each squad reads through its own reader, by b10As (180): S.book is set to 'hoc' for the
   Third (Book Four's chain, 70c: Marrow while she walks, else Tallow, else the old soldier, who is "the old marine" of the heavies' lines
   since Book Nine) and to 'mt' for the Letherii (80c: Perrit while she walks, else the tile-woman, who still rides the supply train) for the
   moment the reader, the captions and the words are asked for. The once-a-book words, the "again" words and every card and tile line are
   Book Ten's own (B10RD, B10SAY, B10SAY_L). The cards are canon Deck cards the earlier books already hold; the tiles are Book Five's.
   Canon in the words: the King of High House Death's seat is empty (rule 74, closed but not named); the Knight of Chains is a card, never the
   god in his chains (rule 98); the Errant is gone into the warrens after Chapter 2 (§7), so the Letherii readers feel the tiles go quiet and
   never say why (rule 31: never "Errastas", never "Elder"); magic near the Adjunct's ground may feel dead (§7, the otataral).
   The v10.0.2 rule: the squad is read before b10As switches the book (b10As passes it in), never after.

   How a chapter uses it (one API for both squads):
     - fill B10READ[n] from the chapter's file: {scene, where, set, back, backT, say:{<reader id>:'…'}}
         the Third's reader ids: marrow, tallow, oldninth. The Letherii's: perrit, tilewoman.
     - put b10ReadChoice(n) among the chapter's first halt choices;
     - register two nodes:  b10_c<n>_read: () => b10ReadOffer(n),  b10_c<n>_card: () => b10ReadCard(n).
   "Let her draw" (or "lay them") sets S.f.b10_c<n>_drawn = 1 and S.f.b10_c<n>_reader; "Not now" sets S.f.b10_c<n>_noCard = 1.
   b10_c<n>_card is what 36b's cardNodeName() returns in Book Ten. */

{ const _vr = VISREADER; VISREADER = () => { if (!b10On()) return _vr ? _vr() : null; const r = b10As(() => _vr ? _vr() : null);
    return r && r.id === 'oldninth' ? Object.assign({}, r, {name:'The old marine', mid:'the old marine'}) : r; }; }
{ const _cb = CARDBOOK;
  CARDBOOK = {
    txt:id => b10On() ? b10As(() => _cb.txt(id)) : _cb.txt(id),
    cap(t, self, second){ return b10On() ? b10As(() => _cb.cap(t, self, second)) : _cb.cap(t, self, second); },
  };
  ['square', 'done', 'look'].forEach(k => { if (_cb && typeof _cb[k] === 'function') CARDBOOK[k] = (...a) => b10On() ? b10As(() => _cb[k](...a)) : _cb[k](...a); }); }
/* the tiles are drawn square, obsidian for Perrit and bone for the tile-woman (80c), while the Letherii read */
{ const _dcf = drawCardFlip; drawCardFlip = function(...a){ return b10L() ? b10As(() => _dcf.apply(this, a)) : _dcf.apply(this, a); }; }

/* each chapter's pool leans to one card or tile (three of it), with two others */
const B10POOL = {
  1:['b3c_lifesoldier', 'b3c_lifesoldier', 'b3c_lifesoldier', 'oponn', 'b2c_king'],   // the camp after the short-tails: kneeling over somebody
  2:['b5t_seer', 'b5t_seer', 'b5t_seer', 'b5t_walker', 'b5t_seed'],                   // the parting: an eye open, watching them go
  3:['b4c_leper', 'b4c_leper', 'b4c_leper', 'b2c_queen', 'obelisk'],                  // the night marches: walking through the bad country
  4:['b5t_whitecrow', 'b5t_whitecrow', 'b5t_whitecrow', 'b5t_walker', 'b5t_boneperch'], // the long way round: a branch nobody else sits on
  5:['b2c_queen', 'b2c_queen', 'b2c_queen', 'b4c_knightchains', 'obelisk'],           // the last water: water into dry ground
  6:['b5t_heartstone', 'b5t_heartstone', 'b5t_heartstone', 'b5t_wall', 'b5t_barrow'], // the feint: a coal under ash
  7:['b4c_knightchains', 'b4c_knightchains', 'b4c_knightchains', 'b2c_soldier', 'b2c_mason'], // over the ridge: one who stands alone
};
const b10Pool = n => (B10POOL[n] || B10POOL[B10_CH[n] === 'l' ? 2 : 1]).filter(id => CARDS[id]);
const b10Rd = () => visReader();
const b10RdObj = () => b10Rd().he ? 'him' : 'her';
/* the once-a-book words, and the "again" words */
const B10RD = {
  marrow:{deck:'Marrow has her Deck out: the temple deck from Nap, carried the length of the Chain and across two oceans and into the Wastes. She reads at the first halt of a road, as she always has. She has stopped counting the cards before she shuffles. She says they are all still there, which is more than the army can say.', again:'Marrow has the Deck out, the paint gone soft at every corner.'},
  tallow:{deck:'Tallow has his grandmother\'s deck out of its oilcloth. He lays them two down and one up, the way she did, and keeps them close to his chest so the light off the ground does not get at them.', again:'Tallow has the old woman\'s deck out, held close.'},
  oldninth:{deck:'The old marine reads for the heavies\' lines, still: a grey man with a soldier\'s deck that has seen more wars than he has, and a cup with nothing in it this time. He says the cards do not need the rum. He does.', again:'The old marine has his deck out, and an empty cup beside it out of habit.'},
  perrit:{deck:'Perrit has her tiles out of the calfskin pouch: the cadre\'s black stone, small and square. She warms each one in her palm before she lays it. Lately she holds them longer, and lays them down as if she expected them to be heavier.', again:'Perrit has the black tiles out, holding each one a while.'},
  tilewoman:{deck:'The old tile-woman still rides the supply train, on a different wagon now, because hers ran out of horses. She reads at the tailboards for a dock that nobody out here can spend, and takes it anyway, because a dock is a dock.', again:'The tile-woman has her bone tiles out on a tailboard.'},
};
const b10RdWords = (id, again) => B10RD[id] ? (again ? B10RD[id].again : B10RD[id].deck) : '';
/* the Third's card lines: the description (Book Four's), then the reader's own line in Book Ten */
const B10SAY = {
  b3c_lifesoldier:{d:B4SAY.b3c_lifesoldier.d,
    marrow:`"Soldier of High House Life," Marrow says. "Kneeling over somebody." She looks at the long tents, where the surgeons have not stopped since the battle. "There's mending here, child. More than there should be. Don't ask who's paying for it."`,
    tallow:`"The kneeling one," Tallow says. "Grandmother liked her." He looks down the rows of the wounded. "I'd like her to stay a while."`,
    oldninth:`"Life's soldier," the old marine says. "Healers heal more." He turns the empty cup over. "They'll need to. Tell yours."`},
  oponn:{d:B4SAY.oponn.d,
    marrow:`"The Twins," Marrow says. "The coin in the air." She leaves it face up. "Missing is not dead, child. I said that before. The coin agrees with me, for once."`,
    tallow:`"Twins," Tallow says. "A good tide." He looks out past the pickets, where somebody is walking in who should not be. "Or a strange one."`,
    oldninth:`"Luck," the old marine says. "It's turning. Don't ask which way." He squints at the edge of the camp. "Somebody's coming back who wasn't. That's one way."`},
  b2c_king:{d:B4SAY.b2c_king.d,
    marrow:`Marrow does not turn him over. "The King's seat is still empty," she says. "Still." She slides the card under the others. "Somebody else keeps that gate now. I'd rather not meet them yet."`,
    tallow:`"The hooded man," Tallow says. "He isn't there." He looks at the card a long while. "Grandmother would have hated that more than anything."`,
    oldninth:`"Hood's own," the old marine says, and does not touch the bone at his throat this time. "Empty chair." He puts it away. "Burial lines are full anyway. Somebody's taking them."`},
  b4c_leper:{d:B4SAY.b4c_leper.d,
    marrow:`"The Leper," Marrow says. "Walks through the bad country and catches nothing." She looks out at the glass, flat and bright to the edge of the world. "The warrens are dead out here, child. Whatever the squad has that isn't steel, don't count on it."`,
    tallow:`"The bell," Tallow says. "So you know he's coming." He listens. There is no sound at all, out here, but the column. "He's already here. He's us."`,
    oldninth:`"Leper," the old marine says. "Walks clean." He looks at the dark where the Adjunct's tent is pitched. "Up near her, nothing works but your legs. Keep them working."`},
  b2c_queen:{d:B4SAY.b2c_queen.d,
    marrow:()=>(S.chapter || 0) >= 5 ? `Marrow holds the Queen a while. "Water," she says, "into dry ground." Her voice cracks on the second word and she does not try it again. She lays the card face up between them, and leaves it there.` : `"The Queen of High House Life," Marrow says. "The cup running over." She looks at the water barrels on the wagon, and counts them, and does not say the number. "Drink when you're told, child. Not before."`,
    tallow:`"The lady with the cup," Tallow says. His lips are split; he does not lick them. "Grandmother said she always comes. She never said when."`,
    oldninth:`"Queen with the cup," the old marine says. "Healers heal more." He looks at his own empty one. "And somewhere, somebody gets a drink. I'd like it to be us."`},
  obelisk:{d:B4SAY.obelisk.d,
    marrow:`"Something lasts," Marrow says. She looks round at the squad, thinner than it was in the Wastes, and the Wastes took plenty. "Something. I'd like it to be the names."`,
    tallow:`"The stone," Tallow says. "For the old men." He puts it down carefully on the glass, which is harder than any table. "It'll last. It always does."`,
    oldninth:`"Obelisk," the old marine says. "You'll last." He taps it twice. "Doesn't say how much of you."`},
  b4c_knightchains:{d:B4SAY.b4c_knightchains.d,
    marrow:()=>(S.chapter || 0) >= 7 ? `Marrow holds it and does not lay it down at first. "Chains," she says. "A knight who stands alone." She looks at the line forming, and the gaps in it, and at the ridge beyond. "Somebody stands alone today. Somebody always has. Let it be somebody else's turn, child."` : `"The Knight of Chains," Marrow says. "Standing where nobody else will." She looks east. "That House is the reason for all of this, they say. I don't like it in my hand."`,
    tallow:`"The one that wasn't in her deck," Tallow says. "It's always in mine now." He turns it face down, and then, after a while, face up again.`,
    oldninth:`"That one," the old marine says. "Stands on his own, hits harder for it." He looks along the line. "Don't be him. If you have to be, be him properly."`},
  b2c_soldier:{d:B4SAY.b2c_soldier.d,
    marrow:`"Soldier of High House Death," Marrow says. "A gate behind him. Somebody else's gate now." She looks at the heavies in their scale. "Stand where you're put, child. Today that's all there is to it."`,
    tallow:`"The grey soldier," Tallow says. "A long watch." He looks at the sun. "Long enough, maybe."`,
    oldninth:`"Death's soldier," the old marine says. "Heavies' card." He almost laughs. "Never been dealt it so often."`},
  b2c_mason:{d:B4SAY.b2c_mason.d,
    marrow:`"The Mason," Marrow says. "A long stone for a long hole." She puts it down carefully, and looks away, toward where the barrows will be, though nobody has dug them yet. "Munitions bite deeper today. That's all I'll say about this one."`,
    tallow:`"The stone-cutter," Tallow says. "She hated this one." He looks at the sappers' crates. "They won't."`,
    oldninth:`"Mason," the old marine says. "Sapper's lucky day." He looks at the ridge. "Everybody else's, maybe not."`},
};
/* the Letherii's tile lines in Book Ten: the descriptions stay Book Five's. After Chapter 2 the tiles feel quiet, as if somebody had left
   the room (the Errant, never named as the cause) */
const b10Quietly = () => (S.chapter || 0) > 2;
const B10SAY_L = {
  b5t_seer:{d:B5SAY.b5t_seer.d,
    perrit:`"The Seer," Perrit says. "An eye, open, in the antlers." She looks east, where the Malazans are walking out onto the glass in a long dark line. "Somebody should watch them go. The tile says it is us."`,
    tilewoman:`"The eye in the antlers," the old woman says. "Means they swing and miss." She shades her own eyes toward the glass. "Means you watch, soldier. Somebody has to."`},
  b5t_walker:{d:B5SAY.b5t_walker.d,
    perrit:()=>b10Quietly() ? `"The Walker." Perrit turns it over, and over again. "No prints behind." She is quiet. "It is cold. Colder than in the Wastes. The tiles used to answer back a little. This one only lies there."` : `"The Walker," Perrit says. "A long road, and no prints." She looks south, along the column. "A longer road than theirs, and with water in it. I will take ours."`,
    tilewoman:`"The walking one," the old woman says. "Long road." She looks at her own feet. "Your feet first, soldier. Then the horses'. Then pride, if there's any left."`},
  b5t_seed:{d:B5SAY.b5t_seed.d,
    perrit:`"The Seed," Perrit says. "Green in the ice." She glances at the water barrels. "Wounds close better than they should. I would like to believe it."`,
    tilewoman:`"The seed," the old woman says. "Good tile for a dry road." She taps her water-skin. "Heals more. Drink less. You know the rest."`},
  b5t_whitecrow:{d:B5SAY.b5t_whitecrow.d,
    perrit:`"The White Crow." Perrit lays it slowly. "On a branch nobody else is sitting on." She looks at the column, the Bolkando ahead and the grey knights' dust ahead of them, and the Letherii last. "That is us, I think. Behind everyone. The tile says it keeps us from being hit. I hope it is right; the tiles have been very quiet."`,
    tilewoman:`"The white crow," the old woman says. "Alone on its branch. Means they miss you." She sniffs. "Means everybody else went on ahead. Both, soldier. Always both."`},
  b5t_boneperch:{d:B5SAY.b5t_boneperch.d,
    perrit:`"Bone Perch." Perrit frowns at it. "Nothing on it yet." She looks at the horse-lines, thinner every night. "It means we will last a little longer than we should. The tile does not say what it costs. They never used to say. Now they say nothing at all."`,
    tilewoman:`"The pole of bones," the old woman says. "Nothing on it." She looks at the horses. "Not yet, anyway. More health for you, soldier. Less for the horses, I'd say."`},
  b5t_heartstone:{d:B5SAY.b5t_heartstone.d,
    perrit:`"Heartstone." Perrit holds it a long while before she lays it. "A slow light, like a coal under ash." She looks at the Kolansii line across the field, and the city beyond it. "Something in it still burns. I will take that. It is the first tile in a while that felt warm."`,
    tilewoman:`"The stone with the coal in it," the old woman says. "Means you last." She looks at the line forming. "Means you'll need to, today. Coal under ash, soldier. Don't go out."`},
  b5t_wall:{d:B5SAY.b5t_wall.d,
    perrit:`"The Wall." Perrit squares it with the others. "Stone on stone, no gate." She looks along the Letherii line. "Stand behind each other. That has always been the whole of it."`,
    tilewoman:`"Stone on stone," says the old woman. "Your shields hold." She looks at them. "They'd better."`},
  b5t_barrow:{d:B5SAY.b5t_barrow.d,
    perrit:`Perrit lays the Barrow and does not look at it. "A long mound with a stone at its head, and nothing cut on the stone." She is quiet. "Whoever is under it, nobody wrote it down. I will write ours down. Every one."`,
    tilewoman:`"The long mound," the old woman says, and puts it away quickly. "Means you finish what's falling." She does not look at the field. "Means somebody digs, after."`},
};
/* the reader is read inside b10As (Book Four's or Book Five's chain); the squad is passed in from before the switch */
const b10CardSay = id => b10As(t => { const tbl = t === 't' ? B10SAY : B10SAY_L, s = tbl[id] || (t === 't' ? B4SAY : B5SAY)[id], r = b10Rd().id, v = s && (typeof s[r] === 'function' ? s[r]() : s[r]);
  return s ? `${s.d}\n\n${v || ''}`.trim() : ((CARDS[id] && CARDS[id].txt) || ''); });

/* per chapter: the writers fill 3..7. Chapter 1 (the Third, the camp) and Chapter 2 (the Letherii, the parting) are the worked examples. */
const B10READ = {
  1:{scene:'b10_camp_night', where:'an upturned water barrel at the burial lines', set:'Night in the camp after the short-tails, the burial lines quiet at last, and the allies\' fires coming up on the horizon one by one.', back:'b10_c1_fire', backT:'Back to the fire.',
     say:{marrow:'"Sit down, child," Marrow says. "One card. Everybody else has been counting names all day. Let the Deck count something else."', tallow:'"Grandmother read on the night after a burial," Tallow says. "She said the dead like to see the cards go round. One?"',
          oldninth:'"Still here," the old marine says. "Both of us. That calls for a card, if not a drink. Sit."'}},
  2:{scene:'b10_train', where:'the tailboard of a water wagon at the parting', set:'Evening on the day the army split, the Malazans gone out onto the glass, and the Letherii column turning south with its train.', back:'b10_c2_fire', backT:'Back to the fire.',
     say:{perrit:'"Three tiles," she says. "Before a long road. We are on one now, and they are on a worse one." She warms the first tile in her hand. "Sit, Sergeant."',
          tilewoman:'"South, then," the old woman says. "The long way. A dock first, soldier. It\'s a long way to spend it."'}},
};

function b10ReadChoice(n){ const r = b10Rd(), t = b10Thread() === 'l';
  return {t:`Sit with ${r.id === 'oldninth' ? 'the old marine' : (r.mid || r.name)} and the ${t ? 'tiles' : 'Deck'}.`, deck:true, req:()=>!S.f[`b10_c${n}_drawn`] && !S.f[`b10_c${n}_noCard`], go:`b10_c${n}_read`}; }
function b10ReadOffer(n, card = `b10_c${n}_card`){ const D = B10READ[n] || B10READ[B10_CH[n] === 'l' ? 2 : 1], r = b10Rd(), seen = S.f['b10_rd_' + r.id], tiles = b10Thread() === 'l';
  return {sp:r.id === 'tilewoman' ? 'The tile-woman' : r.id === 'oldninth' ? 'The old marine' : r.name, scene:D.scene, fx:()=>{ S.f['b10_rd_' + r.id] = 1; }, txt:
`${b10RdWords(r.id, seen)}

${D.set || ''} ${(D.say || {})[r.id] || ''}`.trim(),
    ch:[{t:tiles ? 'Let her lay them.' : `Let ${b10RdObj()} draw.`, deck:true, fx:()=>{ S.f[`b10_c${n}_drawn`] = 1; S.f[`b10_c${n}_reader`] = r.id; S.card = dealCard(b10Pool(n)); }, go:()=>cardSequence(()=>talk(card))},
        {t:'"Not now."', fx:()=>{ S.f[`b10_c${n}_noCard`] = 1; }, go:D.back}]}; }
function b10ReadCard(n){ const D = B10READ[n] || B10READ[B10_CH[n] === 'l' ? 2 : 1], r = b10Rd(), pool = b10Pool(n), id = S.card && CARDS[S.card] ? S.card : pool[0], c = CARDS[id], tiles = b10Thread() === 'l';
  const nm = r.id === 'oldninth' ? 'The old marine' : r.id === 'tilewoman' ? 'The tile-woman' : r.name;
  return {sp:tiles ? 'The Tiles of the Holds' : 'The Deck of Dragons', scene:D.scene,
    txt:tiles ? `${nm} lays the tiles out on ${D.where}. The first ones show ${r.he ? 'him' : 'her'} nothing. The last one does.` : `${nm} lays the reading out on ${D.where}. ${readRefuseLine(b10RdObj())}`,
    html:`<div class="cardinline"><canvas id="icard" width="240" height="360"></canvas></div><div class="note">${esc(c.name)}${c.house && tiles ? ` · ${esc(c.house)}` : ''}${c.fx ? ` · ${esc(c.fx)}` : ''}</div>`, oncard:[id, false],
    after:b10CardSay(id), ch:[{t:D.backT, go:D.back}]}; }

/* ---- the tiles' effects in the Letherii's fights (80c's, keyed on S.card, which read b5On()) ---- */
const b10Tile = () => (b10L() && S.card && B5TILES[S.card]) ? B5TILES[S.card].b5fx : null;
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o), fx = b10Tile(); if (!fx || !a || !t) return c;
    if (fx === 'armour' && t.side === 'p' && !t.ally) c.ac += 1;
    if (fx === 'hit' && a.side === 'p' && !a.ally) c.bonus += 1;
    if (fx === 'ward' && a.side === 'e' && t.side === 'p') c.bonus -= 1;
    return c; }; }
{ const _heal = heal; heal = function(u, n){ return _heal(u, b10Tile() === 'heal' && u && u.side === 'p' && n > 0 ? n + 2 : n); }; }
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (b10Tile() === 'finish' && a && a.side === 'p' && t && t.side === 'e' && t.hp > 0 && t.hp * 2 <= t.maxhp) { const dd = o.dmg || a.dmg; if (dd) o = Object.assign({}, o, {dmg:[dd[0], dd[1], (dd[2] || 0) + 2]}); }
    return _attack(a, t, o); }; }
{ const _mkParty = mkParty;
  mkParty = function(id, x, y){ const u = _mkParty(id, x, y), fx = b10Tile(); if (!fx) return u;
    if (fx === 'hp') { const full = u.hp === u.maxhp; u.maxhp += 4; if (full) u.hp = u.maxhp; }
    if (fx === 'move') u.mv += 1;
    return u; }; }

/* ---- the tables (21b): one per chapter's reading place ----
   1 an upturned water barrel at the burial lines, night; 2 a water wagon's tailboard at the parting, evening; 3 the glass under the stars,
   no fire; 4 a horse-blanket on the ground by the train, dusk; 5 the glass at first light, the last of the water; 6 a crate from the King's
   ships on the beach, dawn; 7 a shield on the ground behind the regulars' line, the light going. */
Object.assign(READTABLE, {
  'tcg:1':{surf:'wood', p:{base:'#4a3c2c', dark:'#1c1610', planks:5}, light:'lantern', lp:[.12, .1], lc:'#ffc070', air:'none', dark:'#08070a', props:[['lantern', .12, .1, 14], ['cup', .86, .84, 12]]},
  'tcg:2':{surf:'wood', p:{base:'#5a4a36', dark:'#241c12', planks:3}, light:'dusk', lp:[.88, .12], lc:'#e0a070', air:'dust', dark:'#0a0806', props:[['coin', .14, .84, 9]]},
  'tcg:3':{surf:'stone', p:{base:'#3a4a5c', dark:'#141c26', cracks:6}, light:'dusk', lp:[.5, 0], lc:'#a8b8d8', air:'none', dark:'#04060a', props:[]},
  'tcg:4':{surf:'ground', p:{base:'#6a5a42', dark:'#2a2216', stones:20, grass:20, grassCol:'#7a6a3a'}, light:'dusk', lp:[.5, 0], lc:'#d09070', air:'dust', dark:'#0e0c0a', props:[['coin', .86, .16, 9]]},
  'tcg:5':{surf:'stone', p:{base:'#5a6a7c', dark:'#1e2834', cracks:8}, light:'dawn', lp:[.92, .1], lc:'#e8d8c0', air:'none', dark:'#08090c', props:[['cup', .86, .84, 12]]},
  'tcg:6':{surf:'wood', p:{base:'#6a5a42', dark:'#2a2216', planks:4}, light:'dawn', lp:[.92, .12], lc:'#e8c8a0', air:'none', dark:'#0a0a0c', props:[['coin', .14, .16, 9]]},
  'tcg:7':{surf:'shield', p:{base:'#4a5058', dark:'#1e2228', under:{base:'#6a5a46', dark:'#2a2418', stones:30, grass:10, grassCol:'#7a6a4a'}}, light:'dusk', lp:[.5, 0], lc:'#e0a070', air:'ash', dark:'#08080a', props:[['helm', .12, .84, 16]]},
});
