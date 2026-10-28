/* ============ Book Five: the Tiles of the Holds ============
   Lether does not read the Deck of Dragons. It reads the Tiles of the Holds: tiles of the Empty Hold, the Beast Hold, the Dragon Hold, the
   Azath Hold, the Hold of Ice and the Fulcra, and Dolmen, laid out and read (mt-canon §3). A reading in every chapter, at the chapter's first
   halt. The reader is VISREADER (80): Perrit, from her cadre set of black stone; otherwise the tile-woman, an old camp follower with a set of
   bone. Rule 41 binds every word here: a tile never names the being behind it, and there is no tile called the Errant, Saddick or the Knight
   of Shadows. The visions are "Through the Tiles" (36b).

   How a chapter uses it (Book Four's pattern, 70c):
     - fill B5READ[n] from the chapter's own file: {scene, where, set, back, backT, say:{perrit, tilewoman}}
         scene  a SCENES key for the backdrop (80 registers one per reading place: b5_barracks, b5_trate_harbour, b5_landing, b5_highfort,
                b5_road_south, b5_branskeep, b5_letheras); where  what the tiles are laid on; set  one sentence of time and place;
         back   where the start node was going (a node id, or a function); backT  its button; say  each reader's offer.
     - put b5TileChoice(n) among the chapter's first halt choices;
     - register two nodes:  b5_c<n>_tiles: () => b5TileOffer(n),  b5_c<n>_card: () => b5TileCard(n).
   "Let her lay them" sets S.f.b5_c<n>_drawn = 1 and S.f.b5_c<n>_reader, deals from B5POOL[n] and plays the full-screen reading (21, with
   square tiles); "Not now" sets S.f.b5_c<n>_noCard = 1. b5_c<n>_card is what 36b's cardNodeName() returns in Book Five. The tile drawn
   is S.card, as a card is in every other book, and its effect holds in every fight of the chapter. */

/* ---- the tiles: each an effect another book's card already has (no new mechanics), keyed on S.card in Book Five (b5fx) ----
   armour +1 armour (Soldier of High House Death) · hp +4 health (Obelisk) · heal healing +2 (the Queen) · hit +1 to attacks (Oponn's)
   ward enemies −1 to hit (Knight of High House Dark) · move +1 move (the Hounds) · finish +2 on an enemy at half health (the King) */
const B5TILES = {
  b5t_throne:{name:'The Empty Throne', house:'The Empty Hold', hue:'#c8b47a', b5fx:'hit', txt:'A high seat cut from one stone, and empty. It has always been empty.', fx:'+1 to the squad\'s attacks this chapter.'},
  b5t_watcher:{name:'The Watcher', house:'The Empty Hold', hue:'#a8b0c8', b5fx:'ward', txt:'A figure at a high window, back turned, looking out at something the tile does not show.', fx:'Enemies are −1 to hit this chapter.'},
  b5t_walker:{name:'The Walker', house:'The Empty Hold', hue:'#9aa890', b5fx:'move', txt:'A figure walking away down a long road, and no prints behind it.', fx:'+1 move for every squadmate this chapter.'},
  b5t_saviour:{name:'The Saviour', house:'The Empty Hold', hue:'#d8c890', b5fx:'heal', txt:'A hand held out, open, from the edge of the tile. Whose hand, the tile does not say.', fx:'Every healing on the squad heals 2 more this chapter.'},
  b5t_betrayer:{name:'The Betrayer', house:'The Empty Hold', hue:'#a85a4a', b5fx:'finish', txt:'Two figures walking together, and one of them has a knife behind its back.', fx:'The squad\'s blows on an enemy at half health or less do +2.'},
  b5t_boneperch:{name:'Bone Perch', house:'The Beast Hold', hue:'#c8bca0', b5fx:'hp', txt:'A pole of bones lashed together, and nothing perched on it yet.', fx:'+4 health for every squadmate this chapter.'},
  b5t_hunter:{name:'The Hunter', house:'The Beast Hold', hue:'#8a7a4a', b5fx:'hit', txt:'A spear held low in long grass, and the grass not moving.', fx:'+1 to the squad\'s attacks this chapter.'},
  b5t_seer:{name:'The Seer', house:'The Beast Hold', hue:'#9aa0b8', b5fx:'ward', txt:'An eye, open, in the middle of a tangle of antlers.', fx:'Enemies are −1 to hit this chapter.'},
  b5t_gate:{name:'The Gate', house:'The Dragon Hold', hue:'#c8703a', b5fx:'move', txt:'Two standing stones with fire between them, and the fire going somewhere.', fx:'+1 move for every squadmate this chapter.'},
  b5t_heartstone:{name:'Heartstone', house:'The Azath Hold', hue:'#8a9a7a', b5fx:'hp', txt:'A stone with a slow light in it, like a coal under ash.', fx:'+4 health for every squadmate this chapter.'},
  b5t_wall:{name:'The Wall', house:'The Azath Hold', hue:'#9a9080', b5fx:'armour', txt:'Courses of fitted stone, no gate in them, going up past the edge of the tile.', fx:'+1 armour for every squadmate this chapter.'},
  b5t_barrow:{name:'The Barrow', house:'The Azath Hold', hue:'#6a7a6a', b5fx:'finish', txt:'A long low mound, grassed over, with a stone at its head and the stone cut with nothing.', fx:'The squad\'s blows on an enemy at half health or less do +2.'},
  b5t_seed:{name:'The Seed', house:'The Hold of Ice', hue:'#a8d0e0', b5fx:'heal', txt:'A seed in ice, and in the seed a thread of green.', fx:'Every healing on the squad heals 2 more this chapter.'},
  b5t_axe:{name:'The Axe', house:'The Fulcra', hue:'#b0a090', b5fx:'finish', txt:'A short axe, stuck in a block, the haft worn pale by a hand.', fx:'The squad\'s blows on an enemy at half health or less do +2.'},
  b5t_whitecrow:{name:'The White Crow', house:'The Fulcra', hue:'#e0e0d8', b5fx:'ward', txt:'A crow, white all over, on a branch nobody else is sitting on.', fx:'Enemies are −1 to hit this chapter.'},
  b5t_dolmen:{name:'Dolmen', house:'The Holds', hue:'#8a8478', b5fx:'armour', txt:'Three standing stones and one laid across them, very old, very still.', fx:'+1 armour for every squadmate this chapter.'},
};
Object.assign(CARDS, B5TILES);
/* each chapter's pool leans to one tile (three of it), with two others */
const B5POOL = {
  1:['b5t_throne', 'b5t_throne', 'b5t_throne', 'b5t_saviour', 'b5t_walker'],      // Letheras: the throne that knew no king, the year of the Closure
  2:['b5t_barrow', 'b5t_barrow', 'b5t_barrow', 'b5t_seed', 'b5t_watcher'],        // Trate after the wave: the drowned
  3:['b5t_watcher', 'b5t_watcher', 'b5t_watcher', 'b5t_hunter', 'b5t_heartstone'], // Kraig's Landing: watching the fire from a distance
  4:['b5t_wall', 'b5t_wall', 'b5t_wall', 'b5t_gate', 'b5t_boneperch'],            // High Fort: the rampart
  5:['b5t_walker', 'b5t_walker', 'b5t_walker', 'b5t_seed', 'b5t_whitecrow'],      // the road south
  6:['b5t_axe', 'b5t_axe', 'b5t_axe', 'b5t_dolmen', 'b5t_betrayer'],              // Brans Keep
  7:['b5t_gate', 'b5t_gate', 'b5t_gate', 'b5t_throne', 'b5t_saviour'],            // Letheras falls
};
const b5Tile = () => (b5On() && S.card && B5TILES[S.card]) ? B5TILES[S.card].b5fx : null;

/* ---- the tiles' effects: engine-wide, keyed on S.card while the book is Book Five ---- */
{ const _atkCalc = atkCalc;
  atkCalc = function(a, t, o = {}){ const c = _atkCalc(a, t, o), fx = b5Tile(); if (!fx || !a || !t) return c;
    if (fx === 'armour' && t.side === 'p' && !t.ally) c.ac += 1;
    if (fx === 'hit' && a.side === 'p' && !a.ally) c.bonus += 1;
    if (fx === 'ward' && a.side === 'e' && t.side === 'p') c.bonus -= 1;
    return c; }; }
{ const _heal = heal; heal = function(u, n){ return _heal(u, b5Tile() === 'heal' && u && u.side === 'p' && n > 0 ? n + 2 : n); }; }
{ const _attack = attack;
  attack = function(a, t, o = {}){
    if (b5Tile() === 'finish' && a && a.side === 'p' && t && t.side === 'e' && t.hp > 0 && t.hp * 2 <= t.maxhp) { const dd = o.dmg || a.dmg; if (dd) o = Object.assign({}, o, {dmg:[dd[0], dd[1], (dd[2] || 0) + 2]}); }
    return _attack(a, t, o); }; }
{ const _mkParty = mkParty;
  mkParty = function(id, x, y){ const u = _mkParty(id, x, y), fx = b5Tile(); if (!fx) return u;
    if (fx === 'hp') { const full = u.hp === u.maxhp; u.maxhp += 4; if (full) u.hp = u.maxhp; }
    if (fx === 'move') u.mv += 1;
    return u; }; }
/* a Book Five fight opens with the tile's word in the log */
{ const _startBattle = startBattle;
  startBattle = function(id, opt = {}){ const r = _startBattle(id, opt);
    if (b5On() && B && B.log && B5TILES[S.card]) blog(`<em>${B5TILES[S.card].name}:</em> ${B5TILES[S.card].fx}`);
    return r; }; }

/* ---- the readers ---- */
const b5Rd = () => visReader();
const B5RD_SET = {
  perrit:`Perrit has her tiles out of the calfskin pouch: a cadre set of black stone, small and square and polished by other hands before hers. She lays them face down in a spiral, the way the school taught, and turns them like a clerk turning pages, without hurry.`,
  tilewoman:`An old woman of the camp followers reads tiles for the company for a dock: a set of bone, yellow and worn round the edges, kept in a bag of oiled cloth. Nobody knows her name. She has been asked. She says the tiles know it, and that will do.`,
};
const B5RD_AGAIN = {perrit:'Perrit has the black tiles out of their pouch.', tilewoman:'The tile-woman has her bone tiles out, and her hand out for the dock.'};
/* per chapter: the scene, what the tiles are laid on, a line of time and place, where the start node was going (back/backT), and each reader's offer.
   Chapter writers fill B5READ[2..7] from their own files (READTABLE['mt:n'] already has the table for each place); this is Chapter One's, as the worked example. */
const B5READ = {
  1:{scene:'b5_barracks', where:'the flagstones of the barracks yard, under the lamp', set:'Night in Letheras, a day before the company marches, and the canal smell coming over the wall.',
    back:()=>startExplore(), backT:'Back to the yard.',
    say:{perrit:`"Three tiles," she says, "before a march. The school says it is superstition. The school also says to do it." She does not smile. "Sit, Sergeant."`,
      tilewoman:`"The Whitefinders," the old woman says. "Going north, they say. Sit, then. A dock first. The tiles do not work for nothing, and neither do I."`}},
};
/* each tile, said by each reader: what it shows, and what it means this chapter. A line may be a function. No tile names who stands behind it. */
const B5SAY = {
  b5t_throne:{d:B5TILES.b5t_throne.txt,
    perrit:`"The Empty Throne," Perrit says. "The heart of the Empty Hold. The throne that knew no king." She taps the empty seat. "In the year of the Seventh Closure, every reader in Letheras will be turning this one over. Strike first, it means. Somebody will."`,
    tilewoman:`"The empty chair," says the old woman. "Turns up every year. More this year." She looks toward the palace over the roofs. "Everybody wants to sit in it. Hit hard, soldier, while they argue."`},
  b5t_watcher:{d:B5TILES.b5t_watcher.txt,
    perrit:`"The Watcher." Perrit does not turn it face down, though her hand moves to. "Someone is looking. Not at us, I think. Past us." She puts the tile at the edge of the spread. "Keep your heads down. It helps."`,
    tilewoman:`"The one at the window," the old woman says. "Means you are seen. Means they miss more than they hit, if you keep still." She clicks her tongue. "Nobody keeps still."`},
  b5t_walker:{d:B5TILES.b5t_walker.txt,
    perrit:`"The Walker," Perrit says. "A long road, and no prints." She looks south, though they have not yet gone north. "We walk further than we planned. We had better walk quickly."`,
    tilewoman:`"The walking one. No tracks." The old woman nods. "Means a long way. Means you will be good at it by the end. Feet first, soldier, always feet first."`},
  b5t_saviour:{d:B5TILES.b5t_saviour.txt,
    perrit:()=>`"The Saviour." Perrit is very still. "The open hand." She does not say whose; nobody who reads the tiles properly ever does. "Wounds close, this road. ${b5In('ammet') ? 'Tell Ammet. She will say she does not need the help.' : 'Somebody will have to close them.'}"`,
    tilewoman:`"The hand," says the old woman, and touches her own chest. "A kind tile. You will bleed less than you should." She holds out her palm. "Another dock for a kind one."`},
  b5t_betrayer:{d:B5TILES.b5t_betrayer.txt,
    perrit:`"The Betrayer." Perrit lays it down carefully, the way you lay down a blade. "Somebody walks beside us with a knife behind their back." She looks round the squad and then, pointedly, at the hills. "Hit what is already falling. It will not get up to argue."`,
    tilewoman:`"The knife behind the back," the old woman says, and laughs, short. "Every tile-reader in Lether can tell you that one in her sleep. Somebody is lying. Finish what you start."`},
  b5t_boneperch:{d:B5TILES.b5t_boneperch.txt,
    perrit:`"Bone Perch," Perrit says. "The Beast Hold. Old, older than the Empty Hold, the feather witches say." She turns it once in her fingers. "Something endures. Us, I hope."`,
    tilewoman:`"The bone pole," says the old woman. "My mother read that one for men going to sea. Means you come back." She pauses. "Most of you."`},
  b5t_hunter:{d:B5TILES.b5t_hunter.txt,
    perrit:()=>`"The Hunter." Perrit lays it flat. "Long grass, and a spear in it." She glances ${b5In('tobet') ? 'at Tobet\'s bow, and then ' : ''}at the dark. "Aim well. The tiles say you will."`,
    tilewoman:`"The spear in the grass," the old woman says. "A good one for soldiers. Means your blows land. Means theirs do too, if they drew it."`},
  b5t_seer:{d:B5TILES.b5t_seer.txt,
    perrit:`"The Seer." Perrit frowns at the eye in the antlers. "The Beast Hold sees for itself. We do not have to." She puts it at the head of the spread. "We are watched over, a little. They will miss."`,
    tilewoman:`"The eye in the antlers," says the old woman. "Something old is looking after you. I would not thank it out loud."`},
  b5t_gate:{d:B5TILES.b5t_gate.txt,
    perrit:`"The Gate," Perrit says. "The Dragon Hold." Her voice does not change, but she sits back. "Fire, and the fire going somewhere. We go through something, soon. Quickly, I would say."`,
    tilewoman:`"The stones with the fire," the old woman says. "A door. Through it fast, soldier. Doors close."`},
  b5t_heartstone:{d:B5TILES.b5t_heartstone.txt,
    perrit:`"Heartstone. The Azath Hold." Perrit holds it to the lamp as if it might be warm. "The Azath tiles are the old ones, the slow ones. They mean holding on." She sets it down. "Hold on, then."`,
    tilewoman:`"The coal under the ash," says the old woman. "You will be harder to put down than you look." She looks the squad over. "You look easy to put down."`},
  b5t_wall:{d:B5TILES.b5t_wall.txt,
    perrit:`"The Wall." Perrit almost laughs. "On a rampart. The tiles are not subtle tonight." She squares it with the edge of the spread. "Stand behind something. Stand behind each other."`,
    tilewoman:()=>`"Stone on stone," says the old woman. "A wall tile. Your shields will hold."${b5In('thegg') ? ' She looks at Thegg for a long moment. "That one is a wall already."' : ''}`},
  b5t_barrow:{d:B5TILES.b5t_barrow.txt,
    perrit:`Perrit turns the Barrow and sits back. "The Azath Hold," she says. "A grave with nothing on the stone." She looks out at the harbour, at what the water left. "There are a great many of those here. Finish what is falling. Bury what is not."`,
    tilewoman:`"The long mound," says the old woman, and spits to one side, which is manners. "The dead are close. Means hit what is already going down, and do not wait to watch."`},
  b5t_seed:{d:B5TILES.b5t_seed.txt,
    perrit:`"The Seed. The Hold of Ice." Perrit holds it longer than the others. "Something green in something cold." She puts it down gently. "Wounds mend this road. Better than they should."`,
    tilewoman:`"The seed in the ice," the old woman says. "A healing tile. Spring in it." She sniffs at the road. "Not here. But in it."`},
  b5t_axe:{d:B5TILES.b5t_axe.txt,
    perrit:`"The Axe. The Fulcra." Perrit's mouth goes thin. "A plain tile for a plain day. Somebody's work, and somebody's block." She does not look toward the keep. "Finish them. Do not leave them half done."`,
    tilewoman:`"The axe in the block," says the old woman. "My grandmother hated that one. It means the day is for finishing things." She gathers her shawl. "Finish yours."`},
  b5t_whitecrow:{d:B5TILES.b5t_whitecrow.txt,
    perrit:`"The White Crow," Perrit says. "The Fulcra. The odd one out." She looks round the squad as if counting who that might be. "Luck, of the strange kind. They will miss you, mostly."`,
    tilewoman:`"The white crow," the old woman says, and smiles for the first time. "Strange luck. The kind that keeps you alive and never tells you why."`},
  b5t_dolmen:{d:B5TILES.b5t_dolmen.txt,
    perrit:`"Dolmen." Perrit says the word as if it were heavy. "A tile of the Holds, the oldest kind. Stones that stand because they have always stood." She sets it square. "Stand like them."`,
    tilewoman:`"The standing stones," says the old woman. "Means hold your ground. Means the ground will hold you." She taps the bone. "It is a liar sometimes, this one."`},
};
const b5TileSay = id => { const s = B5SAY[id], r = b5Rd().id, v = s && (typeof s[r] === 'function' ? s[r]() : s[r]); return s ? `${s.d}\n\n${v || ''}`.trim() : ((CARDS[id] && CARDS[id].txt) || ''); };
/* the reading screen in Book Five (21): square tiles, the reader's captions and the tiles' words. The other books keep theirs (47c, 60c, 70c). */
{ const _cb = CARDBOOK;
  CARDBOOK = {
    txt:id => { if (!b5On()) return _cb ? _cb.txt(id) : ((CARDS[id] && CARDS[id].txt) || ''); const s = B5SAY[id]; return s ? s.d : ((CARDS[id] && CARDS[id].txt) || ''); },
    cap(t, self, second){ if (!b5On()) return _cb ? _cb.cap(t, self, second) : '';
      const r = b5Rd(), n = r.name, first = {perrit:'Perrit turns the tiles face down and stirs them with two fingers.', tilewoman:'The tile-woman shakes the bone tiles in her two hands.'}[r.id] || `${n} lays out the tiles.`;
      const spread = {perrit:'A spiral of tiles, as the school lays them.', tilewoman:'Three tiles in a row, and one above.'}[r.id] || 'The tiles go down.';
      if (second) return t < 1500 ? `${n} gathers them back.` : t < 2900 ? 'Again. The tiles allow it.' : t < 4900 ? '' : t < 5800 ? 'Another turns up.' : '';
      return t < 1500 ? first : t < 2900 ? spread : t < 3900 ? 'The first tile shows nothing she wants.' : t < 4900 ? 'Nor the next.' : t < 5800 ? 'The last tile does.' : ''; },
    square:() => b5On(),
    done:() => b5On() ? 'Gather the tiles' : 'Put the cards away',
    look:() => b5On() ? 'Look into the tile' : 'Look into the card',
  }; }
/* the tiles are tiles, not cards: drawn square (the reading's slot keeps its height in other books), obsidian for Perrit and bone for the tile-woman */
{ const _dcf = drawCardFlip;
  drawCardFlip = function(ctx, id, x, y, W, H, k, t, rot = 0, scale = 1){
    if (!b5On()) return _dcf(ctx, id, x, y, W, H, k, t, rot, scale);
    const sz = Math.min(W, H), ox = x + (W - sz) / 2, oy = y + (H - sz) / 2;
    ctx.save(); ctx.translate(ox + sz / 2, oy + sz / 2); ctx.rotate(rot); ctx.scale(scale, scale);
    const sx = Math.cos(k * Math.PI), face = k > .5; ctx.scale(Math.max(.02, Math.abs(sx)), 1); ctx.translate(-sz / 2, -sz / 2);
    ctx.shadowColor = 'rgba(0,0,0,.85)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8; ctx.fillStyle = '#000'; ctx.fillRect(3, 3, sz - 6, sz - 6); ctx.shadowColor = 'transparent';
    drawHoldTile(ctx, B5TILES[id] ? id : b5TileFor(id), sz, face, t);
    ctx.restore(); }; }
/* a card from another book shown in Book Five (the refused ones in 21's spread): a tile of the Holds picked steadily from its id */
const B5TILE_IDS = Object.keys(B5TILES);
const b5TileFor = id => { let h = 0; String(id || 'x').split('').forEach(c => { h = (h * 31 + c.charCodeAt(0)) | 0; }); return B5TILE_IDS[Math.abs(h) % B5TILE_IDS.length]; };

/* ---- the chapter's reading: a choice on the chapter's first halt, the offer, and the tile ---- */
function b5TileChoice(n){ const r = b5Rd();
  return {t:`Sit with ${r.mid || r.name} and the tiles.`, deck:true, req:()=>!S.f[`b5_c${n}_drawn`] && !S.f[`b5_c${n}_noCard`], go:`b5_c${n}_tiles`}; }
function b5TileOffer(n, card = `b5_c${n}_card`){ const D = B5READ[n] || B5READ[1], r = b5Rd(), seen = S.f['b5_rd_' + r.id];
  return {sp:r.id === 'tilewoman' ? 'The tile-woman · the camp' : r.name, scene:D.scene, fx:()=>{ S.f['b5_rd_' + r.id] = 1; }, txt:
`${(seen ? B5RD_AGAIN[r.id] : B5RD_SET[r.id]) || ''}

${D.set || ''} ${(D.say || {})[r.id] || ''}`.trim(),
    ch:[{t:'Let her lay them.', deck:true, fx:()=>{ S.f[`b5_c${n}_drawn`] = 1; S.f[`b5_c${n}_reader`] = r.id; S.card = dealCard(B5POOL[n] || B5POOL[1]); }, go:()=>cardSequence(()=>talk(card))},
        {t:'"Not now."', fx:()=>{ S.f[`b5_c${n}_noCard`] = 1; }, go:D.back}]}; }
function b5TileCard(n){ const D = B5READ[n] || B5READ[1], r = b5Rd(), pool = B5POOL[n] || B5POOL[1], id = S.card && B5TILES[S.card] ? S.card : pool[0], c = CARDS[id];
  return {sp:'The Tiles of the Holds', scene:D.scene, txt:`${r.name} lays the tiles out on ${D.where}. The first two show ${r.he ? 'him' : 'her'} nothing. The last one does.`,
    html:`<div class="cardinline"><canvas id="icard" width="240" height="360"></canvas></div><div class="note">${esc(c.name)} · ${esc(c.house)}${c.fx ? ` · ${esc(c.fx)}` : ''}</div>`, oncard:[id, false],
    after:b5TileSay(id),
    ch:[{t:D.backT, go:D.back}]}; }

/* ---- the tables (21b): one per chapter's reading place ----
   1 the Whitefinders' barracks yard in Letheras at night; 2 Trate harbour after the wave, a summer evening; 3 the barges at Kraig's Landing,
   night; 4 the western rampart at High Fort; 5 the road south, through the burned country; 6 Brans Keep, across the dry channel; 7 Letheras,
   a barricade by a canal. */
Object.assign(READTABLE, {
  'mt:1':{surf:'stone', p:{base:'#4a4a4e', dark:'#1e1e22', flags:1}, light:'lantern', lp:[.12, .1], lc:'#ffc070', air:'none', dark:'#08090c', props:[['lantern', .12, .1, 14], ['coin', .86, .16, 9]]},
  'mt:2':{surf:'wood', p:{base:'#4a4038', dark:'#1e1a16', planks:4, straps:1, under:{base:'#3a3a3a', dark:'#161616', stones:30}}, light:'dusk', lp:[1, .35], lc:'#e09058', air:'mist', dark:'#0c0c0e', props:[['rope', .88, .14, 16]]},
  'mt:3':{surf:'wood', p:{base:'#3e3428', dark:'#18140e', planks:3, rings:4}, light:'lantern', lp:[.9, .1], lc:'#ffb860', air:'mist', dark:'#06080a', props:[['lantern', .9, .1, 13], ['rope', .12, .86, 14]]},
  'mt:4':{surf:'ground', p:{base:'#4a4a38', dark:'#20201a', grass:180, grassCol:'#5a6038', stones:20}, light:'fire', lp:[.9, .92], lc:'#ff9a40', air:'sparks', dark:'#0a0c08', props:[['helm', .1, .14, 15]]},
  'mt:5':{surf:'ground', p:{base:'#2e2620', dark:'#120e0c', stones:40, ash:200, ruts:1}, light:'coals', lp:[.12, .9], lc:'#ff6a30', air:'ash', dark:'#0a0806', props:[]},
  'mt:6':{surf:'shield', p:{base:'#4a5058', dark:'#1e2228', under:{base:'#3a3a30', dark:'#18180e', stones:40, grass:60, grassCol:'#4a4e30'}}, light:'dawn', lp:[.92, .12], lc:'#c8c0c8', air:'dust', dark:'#0a0a0c', props:[]},
  'mt:7':{surf:'stone', p:{base:'#3a3c42', dark:'#141418', cracks:6, edge:1}, light:'torch', lp:[.1, .1], lc:'#ff8a40', air:'ash', dark:'#08080a', props:[['coin', .84, .86, 9], ['knife', .86, .14, 13, .3]]},
});
/* the Holds' light on the table after the turn, and their mark behind the words */
Object.assign(TBL_HOUSE, {
  'The Empty Hold':{mood:k => ({flick:1 - k * .5, reach:1 + k * .1, bright:1 + k * .1}), over(ctx, W, H, t, k){ tblScreen(ctx, W, H, `rgba(220,200,150,${.08 * k})`); }},
  'The Beast Hold':{mood:k => ({flick:1 + k * .8, reach:1, bright:1}), over(ctx, W, H, t, k){ tblMul(ctx, W, H, `rgb(255,${255 - k * 30 | 0},${255 - k * 60 | 0})`); }},
  'The Dragon Hold':{mood:k => ({flick:1 + k * 1.4, reach:1 + k * .1, bright:1 + k * .3}), over(ctx, W, H, t, k){ tblScreen(ctx, W, H, `rgba(220,110,50,${.1 * k})`); }},
  'The Azath Hold':{mood:k => ({flick:1 - k * .7, reach:1 - k * .1, bright:1 - k * .2}), over(ctx, W, H, t, k){ tblMul(ctx, W, H, `rgb(${255 - k * 50 | 0},${255 - k * 20 | 0},${255 - k * 50 | 0})`); }},
  'The Hold of Ice':{mood:k => ({flick:1 - k * .8, reach:1, bright:1 - k * .1}), over(ctx, W, H, t, k){ tblMul(ctx, W, H, `rgb(${255 - k * 60 | 0},${255 - k * 20 | 0},255)`); tblScreen(ctx, W, H, `rgba(170,210,240,${.07 * k})`); }},
  'The Fulcra':{mood:k => ({flick:1, reach:1, bright:1 - k * .05}), over(ctx, W, H, t, k){ tblScreen(ctx, W, H, `rgba(230,230,220,${.06 * k})`); }},
  'The Holds':{mood:k => ({flick:1 - k * .3, reach:1, bright:1}), over(ctx, W, H, t, k){ tblMul(ctx, W, H, `rgb(${255 - k * 25 | 0},${255 - k * 25 | 0},${255 - k * 30 | 0})`); }},
});
Object.assign(TBL_SIGIL, {
  'The Empty Hold'(ctx, r){ ctx.strokeRect(-r * .7, -r * .7, r * 1.4, r * 1.4); ctx.beginPath(); ctx.moveTo(-r * .3, -r * .4); ctx.lineTo(-r * .3, r * .2); ctx.lineTo(r * .3, r * .2); ctx.lineTo(r * .3, -r * .4); ctx.moveTo(-r * .4, r * .2); ctx.lineTo(-r * .4, r * .45); ctx.lineTo(r * .4, r * .45); ctx.lineTo(r * .4, r * .2); ctx.stroke(); },
  'The Beast Hold'(ctx, r){ ctx.strokeRect(-r * .7, -r * .7, r * 1.4, r * 1.4); ctx.beginPath(); ctx.moveTo(0, r * .5); ctx.lineTo(0, -r * .5); for (let i = -1; i <= 1; i += 2) { ctx.moveTo(0, -r * .1); ctx.lineTo(i * r * .4, -r * .45); ctx.moveTo(0, r * .15); ctx.lineTo(i * r * .35, -r * .1); } ctx.stroke(); },
  'The Dragon Hold'(ctx, r){ ctx.strokeRect(-r * .7, -r * .7, r * 1.4, r * 1.4); ctx.beginPath(); ctx.moveTo(-r * .35, r * .5); ctx.lineTo(-r * .35, -r * .4); ctx.moveTo(r * .35, r * .5); ctx.lineTo(r * .35, -r * .4); ctx.moveTo(-r * .1, r * .3); ctx.quadraticCurveTo(r * .1, 0, -r * .05, -r * .35); ctx.stroke(); },
  'The Azath Hold'(ctx, r){ ctx.strokeRect(-r * .7, -r * .7, r * 1.4, r * 1.4); ctx.beginPath(); ctx.arc(0, 0, r * .35, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r * .12, 0, 7); ctx.fill(); },
  'The Hold of Ice'(ctx, r){ ctx.strokeRect(-r * .7, -r * .7, r * 1.4, r * 1.4); ctx.beginPath(); for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI; ctx.moveTo(Math.cos(a) * r * .45, Math.sin(a) * r * .45); ctx.lineTo(-Math.cos(a) * r * .45, -Math.sin(a) * r * .45); } ctx.stroke(); },
  'The Fulcra'(ctx, r){ ctx.strokeRect(-r * .7, -r * .7, r * 1.4, r * 1.4); ctx.beginPath(); ctx.moveTo(-r * .45, r * .4); ctx.lineTo(0, -r * .45); ctx.lineTo(r * .45, r * .4); ctx.closePath(); ctx.stroke(); },
  'The Holds'(ctx, r){ ctx.strokeRect(-r * .7, -r * .7, r * 1.4, r * 1.4); ctx.beginPath(); ctx.moveTo(-r * .45, r * .4); ctx.lineTo(-r * .45, -r * .2); ctx.moveTo(r * .45, r * .4); ctx.lineTo(r * .45, -r * .2); ctx.moveTo(-r * .55, -r * .25); ctx.lineTo(r * .55, -r * .25); ctx.stroke(); },
});
/* the spreads: Perrit's spiral (the school lays the tiles as the Cedance does, round a centre), the tile-woman's row with the answer above */
Object.assign(SPREADS, {
  spiral5:{slots:[{dx:-1.05, yy:.36, dy:-.6, rot:-.04, sc:.8, flip:2600}, {dx:1.05, yy:.36, dy:-.6, rot:.04, sc:.8, flip:3150}, {dx:1.05, yy:.36, dy:.62, rot:-.03, sc:.8, flip:3700}, {dx:-1.05, yy:.36, dy:.62, rot:.03, sc:.8, flip:4250}, {dx:0, yy:.36, rot:0, ans:1}]},
  row4:{slots:[{dx:-1.15, yy:.56, rot:-.05, flip:2900}, {dx:0, yy:.58, rot:.02, flip:3400}, {dx:1.15, yy:.56, rot:.06, flip:3900}, {dx:0, yy:.3, rot:0, ans:1}]},
});
Object.assign(READER_SPREAD, {perrit:'spiral5', tilewoman:'row4'});
Object.assign(TBL_KIT, {
  perrit(ctx, x, y, CW){ TBL_PROP.pouch(ctx, x + CW * 1.5, y - CW * .35, CW * .24); }, // the calfskin pouch
  tilewoman(ctx, x, y, CW){ TBL_PROP.sacking(ctx, x + CW * .5, y - CW * .55, CW * .8); TBL_PROP.coin(ctx, x - CW * .5, y - CW * .25, CW * .08); }, // her oiled cloth, and the dock she charges
});
