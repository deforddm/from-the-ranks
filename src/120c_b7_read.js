/* ============ Book Seven: the readings. The Third reads the Deck of Dragons; the Letherii cast the Tiles of the Holds (v10.0, 120c) ============
   Each squad reads through its own reader, as in its own earlier book, by b7As (120): S.book is set to 'hoc' for the Third (Book Four's chain,
   70c: Marrow while she walks, else Tallow, else the old soldier of the 9th) and to 'mt' for the Letherii (80, 80c: Perrit while she walks,
   else the tile-woman) for the moment the reader, the captions and the words are asked for. The Deck cards are canon cards the earlier books
   already hold (their effects are engine-wide on S.card); the tiles are Book Five's (B5TILES), and their effects are given here for the
   Letherii's fights, since 80c's read b5On().

   How a chapter uses it (one API for both squads):
     - fill B7READ[n] from the chapter's file: {scene, where, set, back, backT, say:{<reader id>:'…'}}
         the Third's reader ids: marrow, tallow, oldninth. The Letherii's: perrit, tilewoman.
     - put b7ReadChoice(n) among the chapter's first halt choices;
     - register two nodes:  b7_c<n>_read: () => b7ReadOffer(n),  b7_c<n>_card: () => b7ReadCard(n).
   "Let him/her draw" (or "lay them") sets S.f.b7_c<n>_drawn = 1 and S.f.b7_c<n>_reader; "Not now" sets S.f.b7_c<n>_noCard = 1.
   b7_c<n>_card is what 36b's cardNodeName() returns in Book Seven. */

const b7Tiles = () => b7L(); // the Letherii read tiles; 36b's visTiles() says "Through the Tiles" for them
{ const _vr = VISREADER; VISREADER = () => b7On() ? b7As(() => _vr ? _vr() : null) : (_vr ? _vr() : null); }
{ const _cb = CARDBOOK;
  CARDBOOK = {
    txt:id => b7On() ? b7As(() => _cb.txt(id)) : _cb.txt(id),
    cap(t, self, second){ return b7On() ? b7As(() => _cb.cap(t, self, second)) : _cb.cap(t, self, second); },
  };
  ['square', 'done', 'look'].forEach(k => { if (_cb && typeof _cb[k] === 'function') CARDBOOK[k] = (...a) => b7On() ? b7As(() => _cb[k](...a)) : _cb[k](...a); }); }
/* the tiles are drawn square, obsidian for Perrit and bone for the tile-woman (80c), while the Letherii read */
{ const _dcf = drawCardFlip; drawCardFlip = function(...a){ return b7L() ? b7As(() => _dcf.apply(this, a)) : _dcf.apply(this, a); }; }

/* each chapter's pool leans to one card or tile (three of it), with two others. The Third's chapters draw from Book Four's deck, the Letherii's from Book Five's tiles. */
const B7POOL = {
  1:['b2c_soldier', 'b2c_soldier', 'b2c_soldier', 'herald', 'oponn'],          // the burned ships: an army landed with no way back
  2:['b5t_watcher', 'b5t_watcher', 'b5t_watcher', 'b5t_betrayer', 'b5t_throne'],  // the file: someone is looking
  3:['assassin', 'assassin', 'assassin', 'b2c_soldier', 'obelisk'],            // night raids: the knife in the dark
  4:['b5t_wall', 'b5t_wall', 'b5t_wall', 'b5t_hunter', 'b5t_walker'],          // the muster: the line
  5:['herald', 'herald', 'herald', 'b4c_knightchains', 'b2c_queen'],           // the village: the door held open
  6:['b5t_gate', 'b5t_gate', 'b5t_gate', 'b5t_barrow', 'b5t_saviour'],         // before the walls: through something, fast
  7:['b2c_king', 'b2c_king', 'b2c_king', 'oponn', 'b4c_leper'],                // Letheras: a throne changes hands
};
const b7Pool = n => (B7POOL[n] || B7POOL[B7_CH[n] === 'l' ? 2 : 1]).filter(id => CARDS[id]);
const b7Rd = () => visReader();
const b7RdObj = () => b7Rd().he ? 'him' : 'her';
/* The 9th's old soldier goes home on the last pinnace in Chapter 1 (rg-ch1-notes); from Chapter 3 the chain's third reader is an old marine of the column.
   His own once-a-book line and his "again" line, so Book Four's "of the 9th" description is not shown after Chapter 1 (continuity read, Nov 5). */
const B7RD_OLDMARINE = {deck:'An old marine of the column reads for whoever asks, for a finger of rum: a grey man with a soldier\'s deck that has been to more wars than he has. Nobody in the Third knows his name. Nobody has asked yet.',
  again:'The old marine has his deck out, and his cup out for the rum.'};
const b7OldMarine = () => b7Thread() === 't' && (S.chapter || 0) > 1;
const b7RdWords = (id, again) => b7Thread() === 't' ? (id === 'oldninth' && b7OldMarine() ? (S.f.b7_rd_oldmarine ? B7RD_OLDMARINE.again : B7RD_OLDMARINE.deck)
  : ((again ? B4RD_AGAIN : B4RD_DECK)[id])) : ((again ? B5RD_AGAIN : B5RD_SET)[id]);
/* The Third's own card words in Lether (Nov 6, David: Book Four's lines spoke of Raraku and the sand). The descriptions stay Book Four's;
   the readers' lines are new. 'oldninth' is the 9th's old soldier in Chapter 1 and the old marine of the column after, so its lines name neither. */
const B7SAY = {
  b2c_soldier:{d:B4SAY.b2c_soldier.d,
    marrow:`"Soldier of High House Death," Marrow says. "Armour, child, and a gate behind it." She looks down the beach at the black ribs of the transports. "There's no gate behind us now. So it's armour."`,
    tallow:`"The grey soldier," Tallow says. "Grandmother said he meant a long watch." He looks at the finger bone on his thong, then at the dark country past the dunes. "She never said how long."`,
    oldninth:`"Death's soldier," says the old man. "Means you'll stand where you're put." He drinks. "Long way from anywhere to be put, this."`},
  herald:{d:B4SAY.herald.d,
    marrow:`"The Herald," Marrow says. "Holding the door." She does not look at the squad while she says it. "Somebody walks through before this is done, child. I'd rather it was one of theirs."`,
    tallow:`"The door man," Tallow says. "She'd turn him face down if the boats were out." He turns it face down. Nobody tells him the boats are gone.`,
    oldninth:`"Herald," the old man says, and he isn't drinking now. "Door's open. Somebody goes through it." He looks at the fire and not at you. "Never know who till after."`},
  oponn:{d:B4SAY.oponn.d,
    marrow:`"The Twins," Marrow says. "Spinning the coin over a strange country." She leaves it face up. "Don't thank them, child. And don't spend it before it lands."`,
    tallow:`"Twins," Tallow says. "They don't care whose coin it is." He glances toward the city, or toward where somebody said the city is. "Theirs or ours."`,
    oldninth:`"Luck," the old man says. "Push or pull, no telling." He shrugs. "I've had both in one night. Twice."`},
  assassin:{d:B4SAY.assassin.d,
    marrow:`"The Rope," Marrow says. "Somebody walking where nobody sees him." She almost smiles. "That's us, this month, child. We're the ones in the dark."`,
    tallow:`"The rope man," Tallow says. "She said he meant a stranger in the boat." He looks out at the farms with no lights in them. "Here, the stranger's us."`,
    oldninth:`"Shadow's knife," says the old man. "Hit and gone before they've found their boots." He nods at the fields. "That's the whole war, this one. Card knows it."`},
  obelisk:{d:B4SAY.obelisk.d,
    marrow:`"Something lasts," Marrow says. "The priests said it, and then said not to be pleased." She looks round at the marines asleep in the ditch. "Something. Not everything."`,
    tallow:`"The stone," Tallow says. "For the old men." He puts it down carefully on the turf. "It means you'll last. It doesn't say where."`,
    oldninth:`"Obelisk," the old man says. "You'll last." He taps the card twice. "Doesn't say you'll like it."`},
  b4c_knightchains:{d:B4SAY.b4c_knightchains.d,
    marrow:`Marrow holds it a long time. "Chains. Still don't know this House, child," she says. "A knight who stands alone." She looks at the village wall, and the door in it. "Somebody holds a door alone tonight. The Deck's sure of that much."`,
    tallow:`"The one that wasn't in her deck," Tallow says. He doesn't turn it over this time. "It keeps coming up. That means something, doesn't it." It isn't a question.`,
    oldninth:`"That new one again," the old man says. "Stands on his own." He looks at the wall. "Somebody'll have to, here. Don't let it be you if you can help it."`},
  b2c_queen:{d:B4SAY.b2c_queen.d,
    marrow:`"The Queen of High House Life," Marrow says. "Water into dry ground." She looks at the wounded laid along the wall. "There's mending to do, child, and the Deck says it takes. Some of it."`,
    tallow:`"The lady with the cup," Tallow says. "A good catch, Grandmother said." He looks at the village well, and the bucket by it. "We could use one."`,
    oldninth:`"Queen with the cup," the old man says. "Healers heal more." He pours a drop on the ground, which for him is a prayer. "Tell yours."`},
  b2c_king:{d:B4SAY.b2c_king.d,
    marrow:`Marrow looks at it a while. "The King of High House Death," she says. "On his seat, with the gate open." She looks past the fire at the towers and the smoke. "There's a throne in that city, child. Somebody gets off it."`,
    tallow:`"The hooded man," Tallow says. "She wouldn't read him." He reads him. "He means somebody's done," he says. "Not who."`,
    oldninth:`"Hood's own," the old man says, and touches his bone. "Means the dead are close, and the falling's half done." He looks at the city. "Hit what's already falling."`},
  b4c_leper:{d:B4SAY.b4c_leper.d,
    marrow:()=>`"The Leper," Marrow says. "Chains again. Walks through the bad places and catches nothing." She holds a hand up to the city's smoke. "Your mages won't choke on what's in the air, child. They won't get as much, either."`,
    tallow:`"The bell," Tallow says. "So you know he's coming." He listens to the city a while: shouting, a long way off, and something that might be bells. "I can hear that one."`,
    oldninth:`"Leper," the old man says. "Chains." He taps his own temple. "Mages walk clean, but they walk short." He drinks, a lot.`},
};
const b7CardSay = id => { const tt = b7Thread() === 't'; return b7As(() => { const s = (tt ? (B7SAY[id] ? B7SAY : B4SAY) : B5SAY)[id], r = b7Rd().id, v = s && (typeof s[r] === 'function' ? s[r]() : s[r]);
  return s ? `${s.d}\n\n${v || ''}`.trim() : ((CARDS[id] && CARDS[id].txt) || ''); }); };

/* per chapter: the writers fill 3..7. Chapter 1 (the Third, the coast) and Chapter 2 (the Letherii, the barracks) are the worked examples. */
const B7READ = {
  1:{scene:'b7_coast_night', where:'a flat stone above the tide line', set:'The night the transports burned, above the beach, with the smoke still lying along the water.', back:'b7_c1_fire', backT:'Back to the fire.',
     say:{marrow:'"No ships," Marrow says, before she has turned a card. "I know. I watched too. Sit down."', tallow:'"My grandmother said never read with your back to the sea," Tallow says. "She never said what to do with no ships."',
          oldninth:'"One finger of rum," the old soldier says. "Two if the boats are burning. They are."'}},
  2:{scene:'b7_barracks', where:'the flagstones of the barracks yard, under the lamp', set:'Night in Letheras, the Edur at the gate, and somewhere across the city a clerk adding a line to a file.', back:'b7_c2_yard', backT:'Back to the yard.',
     say:{perrit:'"Three tiles," she says. "Quietly. There are ears on the wall tonight, and some of them are ours." She does not smile. "Sit, Sergeant."',
          tilewoman:'"Still here," the old woman says. "So am I. A dock first. The tiles cost the same under an emperor as under a king."'}},
};

function b7ReadChoice(n){ const r = b7Rd(), t = b7Thread() === 'l';
  return {t:`Sit with ${r.id === 'oldninth' && b7OldMarine() ? 'the old marine' : (r.mid || r.name)} and the ${t ? 'tiles' : 'Deck'}.`, deck:true, req:()=>!S.f[`b7_c${n}_drawn`] && !S.f[`b7_c${n}_noCard`], go:`b7_c${n}_read`}; }
function b7ReadOffer(n, card = `b7_c${n}_card`){ const D = B7READ[n] || B7READ[B7_CH[n] === 'l' ? 2 : 1], r = b7Rd(), seen = S.f['b7_rd_' + r.id], tiles = b7Thread() === 'l';
  return {sp:r.id === 'tilewoman' ? 'The tile-woman' : r.id === 'oldninth' && b7OldMarine() ? 'The old marine' : r.name, scene:D.scene, fx:()=>{ S.f['b7_rd_' + r.id] = 1; if (r.id === 'oldninth' && b7OldMarine()) S.f.b7_rd_oldmarine = 1; }, txt:
`${b7RdWords(r.id, seen) || ''}

${D.set || ''} ${(D.say || {})[r.id] || ''}`.trim(),
    ch:[{t:tiles ? 'Let her lay them.' : `Let ${b7RdObj()} draw.`, deck:true, fx:()=>{ S.f[`b7_c${n}_drawn`] = 1; S.f[`b7_c${n}_reader`] = r.id; S.card = dealCard(b7Pool(n)); }, go:()=>cardSequence(()=>talk(card))},
        {t:'"Not now."', fx:()=>{ S.f[`b7_c${n}_noCard`] = 1; }, go:D.back}]}; }
function b7ReadCard(n){ const D = B7READ[n] || B7READ[B7_CH[n] === 'l' ? 2 : 1], r = b7Rd(), pool = b7Pool(n), id = S.card && CARDS[S.card] ? S.card : pool[0], c = CARDS[id], tiles = b7Thread() === 'l';
  return {sp:tiles ? 'The Tiles of the Holds' : 'The Deck of Dragons', scene:D.scene,
    txt:tiles ? `${r.name} lays the tiles out on ${D.where}. The first ones show ${r.he ? 'him' : 'her'} nothing. The last one does.` : `${r.name} lays the reading out on ${D.where}. ${readRefuseLine(b7RdObj())}`,
    html:`<div class="cardinline"><canvas id="icard" width="240" height="360"></canvas></div><div class="note">${esc(c.name)}${c.house && tiles ? ` · ${esc(c.house)}` : ''}${c.fx ? ` · ${esc(c.fx)}` : ''}</div>`, oncard:[id, false],
    after:b7CardSay(id), ch:[{t:D.backT, go:D.back}]}; }

/* ---- the tiles' effects in the Letherii's fights (80c's, keyed on S.card, which read b5On()) ---- */
const b7Tile = () => (b7L() && S.card && B5TILES[S.card]) ? B5TILES[S.card].b5fx : null;
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o), fx = b7Tile(); if (!fx || !a || !t) return c;
    if (fx === 'armour' && t.side === 'p' && !t.ally) c.ac += 1;
    if (fx === 'hit' && a.side === 'p' && !a.ally) c.bonus += 1;
    if (fx === 'ward' && a.side === 'e' && t.side === 'p') c.bonus -= 1;
    return c; }; }
{ const _heal = heal; heal = function(u, n){ return _heal(u, b7Tile() === 'heal' && u && u.side === 'p' && n > 0 ? n + 2 : n); }; }
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (b7Tile() === 'finish' && a && a.side === 'p' && t && t.side === 'e' && t.hp > 0 && t.hp * 2 <= t.maxhp) { const dd = o.dmg || a.dmg; if (dd) o = Object.assign({}, o, {dmg:[dd[0], dd[1], (dd[2] || 0) + 2]}); }
    return _attack(a, t, o); }; }
{ const _mkParty = mkParty;
  mkParty = function(id, x, y){ const u = _mkParty(id, x, y), fx = b7Tile(); if (!fx) return u;
    if (fx === 'hp') { const full = u.hp === u.maxhp; u.maxhp += 4; if (full) u.hp = u.maxhp; }
    if (fx === 'move') u.mv += 1;
    return u; }; }
/* a Book Seven fight opens with the card's or the tile's word in the log */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt);
    if (b7On() && B && B.log && CARDS[S.card] && CARDS[S.card].fx) blog(`<em>${CARDS[S.card].name}:</em> ${CARDS[S.card].fx}`);
    return r; }; }

/* ---- the tables (21b): one per chapter's reading place ----
   1 above the beach the night the ships burned; 2 the Whitefinders' barracks yard in Letheras; 3 a farmhouse floor inland, no lamp;
   4 a tent at the muster below Kravos Hill; 5 the village, the factor's cellar; 6 the line before the ridge, at dawn; 7 a Letheras street at the end. */
Object.assign(READTABLE, {
  'rg:1':{surf:'ground', p:{base:'#8a7c60', dark:'#4a4030', stones:14}, light:'fire', lp:[.9, .1], lc:'#ff9040', air:'sparks', dark:'#0a0806', props:[['cup', .12, .86, 12]]},
  'rg:2':{surf:'stone', p:{base:'#4a4a4e', dark:'#1e1e22', flags:1}, light:'lantern', lp:[.12, .1], lc:'#ffc070', air:'none', dark:'#08090c', props:[['lantern', .12, .1, 14], ['coin', .86, .16, 9]]},
  'rg:3':{surf:'wood', p:{base:'#4a3c2c', dark:'#1c1610', planks:5}, light:'coals', lp:[.5, .96], lc:'#ff6a30', air:'none', dark:'#060504', props:[]},
  'rg:4':{surf:'cloth', p:{base:'#3e4046', dark:'#1c1e22', under:{base:'#3a3a30', dark:'#1a1a14', stones:10}, rot:.05, folds:3}, light:'lantern', lp:[.88, .12], lc:'#ffc070', air:'none', dark:'#08090a', props:[['lantern', .88, .12, 14], ['helm', .12, .84, 16]]},
  'rg:5':{surf:'stone', p:{base:'#4a4238', dark:'#1e1a16', cracks:4}, light:'torch', lp:[.1, .1], lc:'#ff8a40', air:'ash', dark:'#08070a', props:[['jug', .88, .84, 14]]},
  'rg:6':{surf:'shield', p:{base:'#4a5058', dark:'#1e2228', under:{base:'#3a3a30', dark:'#18180e', stones:30, grass:80, grassCol:'#4a4e30'}}, light:'dawn', lp:[.92, .12], lc:'#c8c0c8', air:'dust', dark:'#0a0a0c', props:[]},
  'rg:7':{surf:'stone', p:{base:'#3a3c42', dark:'#141418', cracks:6, edge:1}, light:'fire', lp:[.5, 0], lc:'#ffb060', air:'ash', dark:'#08080a', props:[['knife', .86, .14, 13, .3]]},
});
