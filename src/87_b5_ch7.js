/* ============ Book Five, Chapter 7: The Seventh Closure, and the end of Book Five ============ */
/* Letheras falls (Midnight Tides ch 22, 24-25; mt-canon §7.3, §8, §9, §10, §17c). Phase 1, the night: the Sixth comes into Letheras
   behind the broken army from Brans Keep; the city in disorder (burned houses, looting, the dead in the streets: headline); word that
   the King has been declared Emperor by his court (heard; rule 40, belief); starlings in their thousands round a dark tower apart over the
   roofs; the City Garrison's bell-stations calling what soldiers are left; Finadd Ennic, wounded (Ch6, both roads), puts the Sixth at a
   footbridge over the Quillas Canal by the Low Walk, in the Drownings District, two streets from where the sergeant was born. On Ch5
   'sign' the house's strongroom in the Counters' Quarter burns in the looting (a quarter of every debt goes); on 'refuse' the clerk sits
   in a doorway all night with the paybook case on his knees. Looters in the streets (optional). Phase 2, the footbridge at night: the
   barricade of carts, the brazier (the fire), the tiles (the reading's place), the fallen of Brans Keep named once at the fire and who
   carries their debts, the court's men on the Low Walk with a list if a debt is drowning (b5DrowningThreat(); Ch1 'pay': the receipt
   turns them away; 'swim': they know Thegg's face). Phase 3, the day: citizens on the white walls watching the west road and wagering;
   the Jheck's wolves loose in the Drownings District (fought); word along the canal that a Finadd held the main bridge and fought the
   Emperor, and both fell, and the Emperor rose (belief); Settle Lake's thump (one line); the Edur at the barricade (fought); then the
   K'risnan's sorcery down the street, the lamps going out ahead of it, and the squad goes into the canal under the footbridge (a Might
   check for the swimmers; nobody dies); it stops: the Emperor's word, the killing stopped and a day of suffering decreed (never what it
   holds). Phase 4, the evening on the Low Walk: the canal children's holed dock (the trick), the rumours (Eberict dead in a street, the
   King's Champion dead in the throne room, the Chancellor's fealty), an Edur patrol at the end of the street, and the roads, the key
   S.f.b5_c7_key: 'emperor' (lay down arms and be taken back into the army, which is the Emperor's now: the paybooks don't change),
   'paid' (lay down arms and take discharge: every dock in hand on the debts, smallest first; the half-paid released), 'ledger' (out of
   the ledger: Ennic writes the squad into the dead roll of the fall; the debts pass to the heirs). Then the finale (B5CH7.finale, read
   by 37's showFinale): the road, a page for every squadmate and every recruit, the sergeant, the coda, the credits. Never Moroch's bridge,
   Main Canal, Soulan Bridge, the Pack's temple, Settle Lake's cavern or bench, the swamp, Tehol's house, roof, street or warehouse, the
   Eternal Domicile and its halls and throne room, the Azath and its barrow, the crypt, Seren's house, Mayen's streets, Bugg's wall; never
   a meeting with Brys, the Ceda, Rhulad, Trull, Fear, Mosag, Tehol, Bugg, Eberict, Hull, Udinaas, Seren, Iron Bars or the Azath's child.
   Notes for later books: docs/mt-ch7-notes.md. */
/* FOR THE ARTIST (87b): names this file uses.
   Items: ART['item/b5_c7_dock'], ['item/b5_c7_lamp'], ['item/b5_c7_ledgerpage'].
   Figures: b5_c7_looter, b5_c7_greatwolf, b5_c7_courtman, b5_c7_patrol, b5_c7_child (the canal children; Claude's call), b5_c7_citizen
   (a citizen of Letheras with a wager-slate; Claude's call). Reused: b5_c1_ennic, b5_c1_clerk, b5_c1_tilewoman, b5_letherii, b5_regular,
   and the shelf's b5_edur, b5_unblooded, b5_wraith, b5_jheck, thug, bruiser.
   Backdrops (SCENEX): b5_letheras (80's, redrawn: the footbridge and its barricade by night), b5_c7_night, b5_c7_walls, b5_c7_sorcery,
   b5_c7_under, b5_c7_finale.
   Ground (TILEX): b5_c7_streets (. paving , rubble # burned house c overturned cart F brazier b bell-station x a broken shopfront h your
   street v the way to the Low Walk), b5_c7_canal (. paving , steps ~ canal = barricade - the footbridge a the arch F the brazier ^ back
   to the streets E the street the Edur come down J the tiers), b5_c7_canalnight (the same by night, for the audio's night bed),
   b5_c7_walk (the Low Walk at evening, quieter: as b5_c7_canal, P the patrol at the street's end), and for fights b5_c7_lowwalk (# the
   canal) and b5_c7_barricade (# burned walls). In fights 't' is cover. */

/* ---- small helpers (b57: Book Five, Chapter Seven) ---- */
const b57L = (id, n) => { if (b5In(id) && S.loy && S.loy[id] != null) loy(id, n); };
const b57Say = m => { for (const k of Object.keys(m)) if (k !== '_' && (k === 'sgt' || b5In(k))) return typeof m[k] === 'function' ? m[k]() : m[k]; return typeof m._ === 'function' ? m._() : (m._ || ''); };
const b57If = (id, s) => b5In(id) ? (typeof s === 'function' ? s() : s) : '';
const b57Who = () => (ROLL() && ROLL().who) || 'sgt';
const b57Nm = id => id === 'sgt' ? 'you' : NAME(id);
const b57Pos = id => id === 'sgt' ? 'your' : NAME(id) + '\'s';
const b57V = (id, you, they) => id === 'sgt' ? you : they;
const b57Ph = () => S.f.b5_c7_ph || 1;
const b57Key = () => S.f.b5_c7_key || null;
const b57Day = () => S.f.b5_c7_day || 0;
const b57Docks = (n, why) => { S.silver = (S.silver || 0) + n; updSilver(); note(`+${n} docks: ${why}.`, 'good'); };
const b57Rattle = id => { S.rattled ??= {}; S.rattled[id] = 1; };
const b57Here = () => S.squad.filter(id => id !== 'sgt' && b5In(id));
const b57And = a => a.length < 2 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
const b57Has = id => !!(S.kit && S.kit.includes(id));
const b57Rel = () => Array.isArray(S.f.b5_c7_released) ? S.f.b5_c7_released : [];
const b57Cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
/* the earlier keys, each read with a default (a --from=7 save may have taken either; an unset key reads as the quieter road) */
const b57House = () => S.f.b5_c5_key === 'sign' || S.f.b5_holder === 'house';    // Ch5 'sign': the house holds the paybooks
const b57Swam = () => S.f.b5_c1_key === 'swim' || !!S.f.b5_c1_swam;               // Ch1 'swim': Thegg swam the Quillas with the court's coin
const b57Held = () => S.f.b5_c4_key !== 'run';                                    // Ch4 'hold': the west rampart to the surrender
const b57Stood = () => S.f.b5_c6_key !== 'fallback';                              // Ch6 'stand': the crossing on the dry channel
const b57Holder = () => b57House() ? 'the house' : 'the army';
/* the fallen of Brans Keep (ids), and who carries each debt (the brief's heirs table) */
const b57Fallen = () => (Array.isArray(S.f.b5_c6_fallen) ? S.f.b5_c6_fallen : Object.keys(S.dead || {}).filter(id => S.dead[id] && S.dead[id].ch === 6)).filter(id => TPL[id]);
const B57_HEIRS = {sgt:'a cousin two streets back from the Quillas', tobet:'his family on the tenant farm, who are Indebted again', thegg:'nobody living: the tavern writes it to a dead woman\'s dead son, and the clerk says that is a ledger nobody can collect', perrit:'her father, a clerk in the Pursers\' District', ammet:'the cutler, who will take the tools back, and the note dies with her name', ruuk:'his clan in the Faraed hills', brune:'her village on the coast', pessa:'nobody: her name is spelled wrong in the press-gang\'s book, and her husband is gone'};
const b57Heir = id => { const owed = ((S.f.b5_heirs || {})[id]) || 0; return owed > 0 ? `${NAME(id)}'s ${b5Coin(owed)} went to ${B57_HEIRS[id] || 'the heirs'}.` : `${NAME(id)} owed nothing at the end, and the clerk wrote that too.`; };
/* a "yes, but" in docks of debt on whoever rolled it (5 to 20), never past what the holder will wait for: if it would press the roller,
   the scene takes another cost (alt: {t(id), fx(id)}). fx runs before t (16, settleRoll), so fx decides. As b56Owe. */
let b57NearOk = true;
const b57Room = (id, n) => { const d0 = b5DebtStart(id), lim = d0 > 0 ? d0 * B5_PRESS : 50; return b5Debt(id) + n <= lim; };
const b57Owe = (n, why, line, alt) => ({
  fx:()=>{ const w = b57Who(); b57NearOk = b57Room(w, n); if (b57NearOk) b5Owe(w, n, why); else if (alt && alt.fx) alt.fx(w); },
  t:()=>{ const w = b57Who(); return b57NearOk ? line(w) : (alt && alt.t ? alt.t(w) : `Yes, but it costs ${b57Nm(w)} something.`); }});
/* the house's strongroom in the Counters' Quarter burns in the night's looting (Ch5 'sign'): a quarter of every debt goes, once */
const b57Burn = () => { if (!b57House() || S.f.b5_c7_burned) return; S.f.b5_c7_burned = 1;
  b5Debtors().forEach(id => { const d = b5Debt(id); if (d > 0) b5Forgive(id, Math.ceil(d / 4), 'the house\'s ledgers burned'); }); save(); };
/* an item gone into the canal: off whoever wore it and out of the kit */
const b57Drop = id => { if (!b57Has(id)) return false; S.kit = S.kit.filter(k => k !== id); Object.values(S.gear || {}).forEach(g => { Object.keys(g).forEach(sl => { if (g[sl] === id) delete g[sl]; }); }); return true; };
/* where the chapter goes on from, if a "Not now" stepped away between its steps */
const b57Next = () => { const p = b57Ph();
  if (p < 2) return 'b5_c7_ennic';
  if (p < 3) return 'b5_c7_fire';
  if (p < 4) return !S.f.b5_c7_wolvesDone ? 'b5_c7_tiers' : !S.f.b5_c7_barricadeDone ? 'b5_c7_edur' : !S.f.b5_c7_canal ? 'b5_c7_sorcery' : 'b5_c7_under';
  return b57Key() ? 'b5_c7_last' : 'b5_c7_roads'; };
/* a soldier's line in the book of the fall: who they are now, by the books (the finale) */
/* was this soldier walking at that chapter's key (80's b5MarkWalked)? An old save without the record credits everybody, as before */
const b57Was = (n, id) => { const w = S.f[`b5_c${n}_walked`]; return id === 'sgt' || !Array.isArray(w) || w.includes(id); };
const b57HighFortThere = id => b57Held() ? `${id === 'sgt' ? 'You' : NAME(id)} held the west rampart at High Fort to the surrender, and walked south without a sword.` : `${id === 'sgt' ? 'You' : NAME(id)} went west from High Fort into the Jheck's wood with the Grass Jackets, and came out on the road south with ${id === 'sgt' ? 'your' : b5His(id)} sword.`;
const b57ChannelThere = id => b57Stood() ? `At Brans Keep ${id === 'sgt' ? 'you' : b5He(id)} held the crossing on the dry channel while the battalion went back over it.` : `At Brans Keep ${id === 'sgt' ? 'you' : b5He(id)} went back over the dry channel with the first who broke, toward Dissent.`;
const b57HighFort = id => b57Was(4, id) ? b57HighFortThere(id) : `At High Fort ${NAME(id)} was back with the company's followers, not ${b57Held() ? 'on the west rampart' : 'with the squad in the wood'}, and came south after the squad.`;
const b57Channel = id => b57Was(6, id) ? b57ChannelThere(id) : `At Brans Keep ${b5He(id)} waited behind the lines with the company's followers, and was not ${b57Stood() ? 'at the crossing' : 'with the squad on the channel'}.`;

/* ---- the roads: what each does to the paybooks (the brief's Ch7 row; Claude's calls 16) ---- */
/* paid: every dock in hand on the debts of the discharged (the sergeant and the squad walking), smallest first, so the most go free; then
   the army's release for everyone easing or free, which forgives the rest (the army bought the debts cheap and has had its money back) */
function b57PaidOut(){ if (S.f.b5_c7_paidDone) return; S.f.b5_c7_paidDone = 1; const s0 = S.silver || 0, who = ['sgt', ...b57Here()];
  who.filter(id => b5Debt(id) > 0).sort((a, b) => b5Debt(a) - b5Debt(b)).forEach(id => { if ((S.silver || 0) > 0) b5Pay(id, b5Debt(id), 'paid out at discharge, smallest first'); });
  S.f.b5_c7_spent = s0 - (S.silver || 0);
  const rel = []; who.forEach(id => { const st = b5Standing(id); if (st === 'free' || st === 'easing') { if (b5Debt(id) > 0) b5Forgive(id, b5Debt(id), 'the army\'s release at discharge'); rel.push(id); } });
  S.f.b5_c7_released = rel; save(); }
/* ledger: the squad written into the dead roll of the fall; listed dead, each line passes to the heirs (kept apart from the true dead's
   S.f.b5_heirs, so the finale can tell them apart) */
function b57Listed(){ if (S.f.b5_c7_listed) return; const L = {};
  ['sgt', ...b57Here()].forEach(id => { b5DebtInit(id); L[id] = b5Debt(id); S.debt[id] = 0; });
  S.f.b5_c7_listed = L; note(`The dead roll of the fall: ${b5Coin(Object.values(L).reduce((a, v) => a + v, 0))} of the squad's debts pass to the heirs, as the army's rule says.`, 'bad'); updChain(); save(); }

/* ---- the Holed Dock: the Lady's Pull (pull, t_pull), in Lether's words. Canal children drop a holed dock into the Quillas for the
   drowned and keep its twin; the Errant, as Lether prays to him, is said to remember who keeps one. Not sorcery. Twice a chapter (one
   more from level 5): after a failed check, roll it again; or before an attack, roll twice and keep the better; the next check is −2. ---- */
Object.assign(TRICKS, {
  b5_c7_dock:{name:'The Holed Dock', ch:7, use:'chapter', n:2, ab:'t_b5_c7_dock', where:'the Low Walk after the sorcery stopped, with the canal children',
    lore:'The canal children of the Drownings District drop a holed dock into the Quillas for the drowned, and keep its twin on a cord. The Errant, the Letherii say, remembers who keeps one. Spin it on its edge when a thing has gone wrong, and it may go the other way; it always wants paying for afterwards.',
    get fx(){ return `${trickTimes('b5_c7_dock')} a chapter: spin the dock on its edge after a failed check and roll it again, or before an attack and roll twice, keeping the better. It wants paying for: the squad's next check is −2. One more use from level 5. Not sorcery.`; }},
});
Object.assign(AB, {
  t_b5_c7_dock:{name:TRICKS.b5_c7_dock.name, trick:'b5_c7_dock', self:true, free:true, desc:()=>'Spin the holed dock: this turn\'s attack rolls twice and keeps the better. It wants paying for: the squad\'s next check is −2. Does not use the action.',
    ok:u=>!B.acted && u.luckyTurn !== B.turn,
    run(u){ u.luckyTurn = B.turn; S.push = 1; AUDIO.play('coin'); float(u, 'the dock spins', '#e8c073'); sparks(u.x, u.y, 10, '#e8c073', .4); blog(`${u.name} spins a holed dock on its edge on a thumbnail, and catches it, and does not look at which way it fell.`); }},
});
/* The check half of the Pull lives in 16's rollDice, which asks for the trick 'pull' by name. In Book Five only, when the squad carries
   the Holed Dock and not the Pull, 'pull' is answered by the dock: its charges, its spending, its words. Guarded (b5On); other books and
   a squad with the real Pull are untouched. Reported to the lead as an engine need. */
{ const _tl = trickLeft, _sp = spendTrick, _rd = rollDice, _nt = note, _bl = blog;
  const dock = k => b5On() && k === 'pull' && S && S.tricks && S.tricks.b5_c7_dock && !S.tricks.pull;
  trickLeft = function(k){ return _tl(dock(k) ? 'b5_c7_dock' : k); };
  spendTrick = function(k){ if (!dock(k)) return _sp(k); _sp('b5_c7_dock'); S.tricks.pull = {who:S.tricks.b5_c7_dock.who, ch:7, b57:1}; }; // 16 names the spinner through trickBy('pull') next: lend it the dock's bearer for that one line
  rollDice = function(r, done, spun){ if (S && S.tricks && S.tricks.pull && S.tricks.pull.b57) delete S.tricks.pull; return _rd(r, done, spun); };
  note = function(t, c){ if (b5On() && typeof t === 'string' && /spins the coin\. The Lady pulls/.test(t)) t = t.replace(/spins the coin\. The Lady pulls; the Lord will push back on the next check \(−2\)\./, 'spins the holed dock on its edge. It comes down the other way; the next check pays for it (−2).'); return _nt(t, c); };
  blog = function(m){ if (b5On() && typeof m === 'string') m = m.replace('<em>The Lady pulls.</em>', '<em>The dock spins.</em>'); return _bl(m); };
  /* the button's words: Spin the dock, not the coin, in Lether */
  if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') { const mo = new MutationObserver(() => { if (!b5On()) return; const b = document.getElementById('dPull'); if (b && !b.dataset.b57) { b.dataset.b57 = 1; b.textContent = `Spin the dock · The Holed Dock (${trickLeft('pull')} left)`; } });
    const go = () => { const sh = document.getElementById('sheet'); if (sh) mo.observe(sh, {childList:true, subtree:true}); }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go(); } }

/* ---- the words this chapter adds to Book Five's glossary ---- */
GLOSSX.mt.push(
  [7, 'The City Garrison', 'The soldiers who keep Letheras: bell-stations in every district, which ring to call other units in. In the last night they called whoever was left.', ()=>(S.chapter || 0) >= 7],
  [7, 'The day of suffering', 'What the Emperor decreed when he stopped the killing in Letheras\'s streets. The Sixth heard it called along the canal.', ()=>!!(S.f && S.f.b5_c7_stopped)],
  [7, 'The dead roll', 'The army\'s list of its fallen, written by each company\'s officer. A soldier on it is dead to the army, and the army\'s rule sends the debt to the heirs.', ()=>!!(S.f && S.f.b5_c7_key === 'ledger')]);

/* ---- the reading: Letheras, a barricade by a canal: cracked stone, a torch, a dock and a knife (the night before the Edur come) ---- */
B5READ[7] = {scene:'b5_letheras', where:'a cracked flagstone behind the barricade, by a torch jammed in a cart\'s wheel, with a dock and a knife laid on it', set:'The footbridge over the Quillas Canal at night, behind a barricade of carts, with the city burning in three places over the roofs and the Edur a night\'s march away.',
  back:'b5_c7_tiles_done', backT:'Back to the barricade.',
  get say(){ return {perrit:`Perrit sits down on the flagstone with her back to the barricade and her face to the canal, which she has never done, and lays the calfskin on the cracked stone. A dock and a knife lie on it already, left by whoever sat here last. She moves neither. "They can be in it," she says. "Everything else is."${b5In('pessa') ? ' Pessa sits on the cart\'s shaft above her and watches the water instead.' : ''}`,
    tilewoman:`The tile-woman has come down to the Low Walk with the company's followers, the ones who are left, and she sits down on the cracked flagstone behind the barricade without asking whose it is. There is a dock on it already, and a knife. "Somebody paid," she says, and spits to one side, for manners. "A dock, Sergeant, all the same. I'll not read the last night in Letheras on credit."`}; }};

/* the fire is a roster fire (38c): the brazier at the footbridge barricade */
ROSTER_FIRES.mt[7] = ['b5_c7_fire'];

const B5CH7 = {
  title:'The Seventh Closure', number:'Seven',
  intro:{loc:'Letheras', sub:'The night after Brans Keep · the Drownings District', scene:'b5_c7_night', cap:'Letheras at night: fires over the roofs in three places, the starlings going round a dark tower, and the broken army coming in at the gate.',
    paras:[
`The broken army comes home in the night. It comes in at the main gate on the cobbled road, under the white walls, in ones and twos and companies, and the gate-wardens count it in, because counting is what the gate-wardens do, and stop counting somewhere after midnight.`,
`Letheras is not the city the Sixth left in the summer. There are houses burned out along the streets in from the gate, and shops with their shutters torn off, and people carrying things out of other people's doors, and the dead in the gutters, left. It has been like this, the gate-wardens say, for two days. At the gate there is a word going round that nobody can stop repeating: the King has been crowned Emperor, by his own court, in the new palace. The Seventh Closure has come. Everybody says so.`,
()=>{ const v = b57Here().map(id => TPL[id].name), fell = b57Fallen().map(NAME);
  return `${v.length ? `${b57And(v)} ${v.length > 1 ? 'are' : 'is'} with you.` : 'The squad, tonight, is you.'}${fell.length ? ` ${b57And(fell)} ${fell.length > 1 ? 'are' : 'is'} in the barrow at Brans Keep.` : ''} Finadd Ennic walks with one hand on the stitches in his side. The Edur are a night's march behind.`; }],
    go:'Into the city', node:'b5_c7_start'},

  areas:[
    /* 16 x 12 (b5_c7_streets, the night): the Drownings District in disorder. . paving  , rubble  # burned house  c overturned cart
       F a street brazier  b the City Garrison's bell-station  x a broken shopfront  h your street  p a fallen shutter in the rubble
       v the way to the Low Walk */
    { id:'b5_c7_streets', title:'Letheras · the Drownings District', sub:'The night after Brans Keep', hint:'Tap ground to move · tap a figure to talk · the Low Walk is west', decor:'b5_c7_streets', dark:true,
      map:[ "####,..##..,####",
            "#..,....#.....b#",
            "#.c..,..#..,...#",
            "##...........x.#",
            "#....##..,.....#",
            "#.,..##....c...#",
            "v......F.......#",
            "#..,.......##..#",
            "#.....c....##..#",
            "##..,...,..p...#",
            "#.......#..,..h#",
            "######..########" ],
      walk:'.,', triggers:{F:'b5_c7_brazier', b:'b5_c7_bell', x:'b5_c7_shop', h:'b5_c7_street', p:'b5_c7_rubble', v:'b5_c7_tobridge'}, start:{x:6, y:10},
      quest:()=> S.f.b5_c7_orders ? 'The Low Walk, west. The footbridge.' : 'Finadd Ennic. The bell is ringing.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:8, y:8, node:()=>'b5_c7_ennic', fresh:()=>!S.f.b5_c7_orders},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:3, y:8, node:()=>b57House() && !S.f.b5_c7_burned ? 'b5_c7_counters' : 'b5_c7_clerk', fresh:()=>!S.f.b5_c7_clerk},
        ] },

    /* 16 x 12 (b5_c7_canal, the night): the footbridge over the Quillas Canal by the Low Walk. . paving  , steps  ~ the canal  = the
       barricade of carts  - the footbridge  a the arch, the way under  F the brazier at the barricade  ^ back to the streets */
    { id:'b5_c7_canal', title:'The footbridge', sub:'The Quillas Canal · the Low Walk · night', hint:'Tap ground to move · the brazier is behind the barricade · the arch is under the bridge', decor:'b5_c7_canalnight', dark:true,
      map:[ "####..^...######",
            "#..............#",
            "#.====..====...#",
            "#......F.......#",
            "#..............#",
            ",,,,,,,--,,,,,,,",
            "~~~~~~~--~~~~~~~",
            "~~~~~~~--~~~~~~~",
            ",,,,,,a--a,,,,,,",
            "................",
            "#....#....#....#",
            "################" ],
      walk:'.,-', triggers:{F:'b5_c7_fire', a:'b5_c7_arch', '^':'b5_c7_back'}, start:{x:7, y:4},
      quest:()=> b57Ph() < 3 ? 'The barricade. The brazier. Morning.' : 'Morning.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:10, y:3, node:()=>'b5_c7_ennic_bridge', fresh:()=>!S.f.b5_c7_ennicBridge},
        {id:'garrison', name:'A garrison sergeant', kind:'b5_letherii', x:4, y:1, node:()=>'b5_c7_garrison', fresh:()=>!S.f.b5_c7_garrison},
        {id:'qm', name:'The quartermaster', kind:'b5_c5_quartermaster', x:13, y:4, node:()=>'b5_c7_qm', fresh:()=>!S.f.b5_c7_qm},
        {id:'court', name:'The Drownings court\'s men', kind:'b5_c7_courtman', x:12, y:9, node:()=>'b5_c7_courtmen', show:()=>b57Ph() === 2 && !S.f.b5_c7_courtDone && (!!S.f.b5_c7_threat || b5DrowningThreat()), fresh:()=>true},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:3, y:9, node:()=>'b5_c7_tilewoman', fresh:()=>false} ] },

    /* 16 x 12 (b5_c7_day, the day): the same footbridge by daylight. E the street the Edur come down  J the tiers along the Low Walk,
       where the wolves are; the rest as the night */
    { id:'b5_c7_day', title:'The footbridge', sub:'The Quillas Canal · the day the Edur come', hint:'Tap ground to move · the tiers are along the Low Walk · the street the Edur come down is north', decor:'b5_c7_canal',
      map:[ "####..E...######",
            "#..............#",
            "#.====..====...#",
            "#......F.......#",
            "#..............#",
            ",,,,,,,--,,,,,,,",
            "~~~~~~~--~~~~~~~",
            "~~~~~~~--~~~~~~~",
            ",,,,,,a--a,,,,,,",
            "................",
            "#JJ..#....#..JJ#",
            "################" ],
      walk:'.,-', triggers:{F:'b5_c7_fire', a:'b5_c7_arch', E:'b5_c7_edur', J:'b5_c7_tiers'}, start:{x:7, y:4},
      quest:()=> !S.f.b5_c7_wolvesDone ? 'Wolves on the tiers.' : !S.f.b5_c7_barricadeDone ? 'The barricade. The Edur are in the street.' : 'The canal. Now.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:10, y:3, node:()=>'b5_c7_ennic_day', fresh:()=>false},
        {id:'citizen', name:'A citizen with a slate', kind:'b5_c7_citizen', x:13, y:1, node:()=>'b5_c7_wager', fresh:()=>!S.f.b5_c7_wager},
        {id:'garrison', name:'A garrison sergeant', kind:'b5_letherii', x:3, y:3, node:()=>'b5_c7_garrison_day', fresh:()=>!S.f.b5_c7_garrisonDay} ] },

    /* 16 x 12 (b5_c7_walk, the evening): the Low Walk after the fall, quieter. P the patrol at the end of the street  F the brazier,
       burned down  a the arch  , the barricade's carts pulled apart */
    { id:'b5_c7_walk', title:'The Low Walk', sub:'The Quillas Canal · the evening of the fall', hint:'Tap ground to move · the patrol is at the end of the street', decor:'b5_c7_walk',
      map:[ "####..P...######",
            "#..............#",
            "#.=,,=..=,,=...#",
            "#......F.......#",
            "#..............#",
            ",,,,,,,--,,,,,,,",
            "~~~~~~~--~~~~~~~",
            "~~~~~~~--~~~~~~~",
            ",,,,,,a--a,,,,,,",
            "................",
            "#....#....#....#",
            "################" ],
      walk:'.,-', triggers:{F:'b5_c7_fire', a:'b5_c7_arch', P:'b5_c7_roads'}, start:{x:7, y:9},
      quest:()=> b57Key() ? 'The last of it.' : 'The patrol is coming down the street. The roads.',
      npcs:[
        {id:'ennic', name:B5_FINADD.name, kind:'b5_c1_ennic', x:9, y:4, node:()=>'b5_c7_ennic_eve', fresh:()=>!S.f.b5_c7_ennicEve},
        {id:'clerk', name:'The company clerk', kind:'b5_c1_clerk', x:5, y:4, node:()=>'b5_c7_clerk_eve', fresh:()=>!S.f.b5_c7_clerkEve},
        {id:'children', name:'Canal children', kind:'b5_c7_child', x:12, y:8, node:()=>'b5_c7_children', fresh:()=>!S.f.b5_c7_dockTried},
        {id:'news', name:'A garrison sergeant', kind:'b5_letherii', x:2, y:9, node:()=>'b5_c7_news', fresh:()=>!S.f.b5_c7_news},
        {id:'tilewoman', name:'The tile-woman', kind:'b5_c1_tilewoman', x:4, y:9, node:()=>'b5_c7_tilewoman', fresh:()=>false} ] } ],

  battles:{
    /* the night (optional): looters in a broken shopfront, deserters among them */
    b5_c7_looters:{title:'The broken shopfront', style:'b5_c7_streets', dark:true, warrenText:'Letheras at night · the Holds are quiet, and listening to the city', warren:{meanas:1, denul:1}, music:'battle',
      map:["##..#..#","........","..t.....","........",".....t..","........","#.......","........","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_deserter',2,1],['b5_deserter',5,1],['b5_deserter',4,2],['b5_deserterbow',6,0],['b5_c7_looter',3,0]], xp:120, after:'b5_c7_looters_after',
      preText:()=>`They have a cooper's shop open to the street and are carrying it out in barrels, and three of them are wearing the army's coats with the badges cut off. They see the Sixth's shields and the white fingertips, and the one with the bow laughs.${b57If('tobet', ' Tobet has an arrow on the string before the laugh is finished.')}`},
    /* the night, only on the canal threat (optional): the Drownings court's men, with a list, non-lethal */
    b5_c7_court:{title:'The Low Walk', style:'b5_c7_lowwalk', dark:true, open:true, warrenText:'The Low Walk at night · the canal is listening', warren:{meanas:1, denul:1}, music:'battle',
      objective:{type:'survive', rounds:4, text:'Cudgels and a list; nobody killed. Hold them four rounds, until the garrison at the barricade comes down the steps.'},
      map:["#.......","#..t....","#.......","#.....t.","#.......","#..t....","#.......","#.......","#.......","#......."],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_collector',4,1],['b5_bully',2,2],['b5_bully',6,2],['b5_bully',4,3]], xp:120, after:'b5_c7_court_after',
      preText:()=>`The court's man folds his list and puts it inside his coat, and the three with him take their cudgels out of their belts. "The city is falling," he says, "and the court sits tomorrow, or the day after, or whenever there is a court. A debt is a debt."`},
    /* the day (main): Jheck wolves loose in the Drownings District, on the Low Walk and the tiers; then the footbridge */
    b5_c7_wolves:{title:'The tiers', style:'b5_c7_lowwalk', warrenText:'The Low Walk by day · something old in the Holds is awake under the city', warren:{meanas:1, denul:1}, music:'battle',
      map:["#.......","#..t....","#.......","#....t..","#.......","#.......","#..t....","#.......","#.......","#......."],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
      foes:[['b5_jheck',2,1],['b5_jheck',5,1],['b5_jheck',4,0],['b5_jheck',6,2]], xp:170, after:'b5_c7_wolves_after',
      waves:[{round:2, foes:[['b5_jheck',7,3],['b5_jheck',1,0]], text:'Two more come down the tiers from the street above, low and fast, going from step to step without looking where they put their feet.'}],
      preText:()=>`They are on the tiers along the Low Walk where the Drownings crowd sits, among the benches, too big to be wolves and moving like wolves: going at the gaps between people, not at the people. The citizens who came down to watch the canal are going back up the tiers the other way, as fast as they can.${b57If('pessa', ' Pessa has her boathook down off the upright. "Not on my canal," she says.')}`,
      stage2:{title:'The footbridge', xp:80,
        text:()=>`The first of them are down, or gone off along the Low Walk with their tails low. Then the footbridge: two more on it, coming over from the far side, and behind them, at the foot of the bridge, one much bigger, grey to the muzzle, walking. It does not hurry. It has never needed to.${b57Say({thegg:'\n\n"Behind me," Thegg says, and sets his shield across the footbridge\'s end.', brune:'\n\nBrune looks at the water under the bridge, and then at the wolf. "It will not swim," she says. "Remember that."', _:''})}`,
        map:["#.......","#.......","#..t....","#.......","#.......","#....t..","#.......","#.......","#.......","#......."],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]],
        foes:[['b5_jheck',3,1],['b5_jheck',5,1],['b5_c7_greatwolf',4,0]]} },
    /* the day (main): the Edur at the barricade, before the sorcery; then the Low Walk, until it comes. Not mortal. */
    b5_c7_barricade:{title:'The barricade', style:'b5_c7_barricade', warrenText:'The footbridge barricade · the Holds are full of something coming down the streets', warren:{meanas:1, denul:1}, music:'battle',
      map:["........","........","...t....","........","t.......","......t.","........","..t..t..","........","........"],
      party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b5_regular',1,7]],
      foes:[['b5_edur',3,1],['b5_edur',5,1],['b5_edur',4,0],['b5_unblooded',2,2],['b5_unblooded',6,2],['b5_unblooded',1,1],['b5_wraith',0,0],['b5_wraith',7,0]], xp:180, after:'b5_c7_barricade_after',
      preText:()=>`They come down the street toward the footbridge in no hurry, tall and grey, in dark leather, with long swords, and shapes going ahead of them along the house-fronts that are not anybody's shadows. A garrison soldier at the barricade says a word that would get him flogged in any other week. The carts will not stop them. The carts are not meant to. They are meant to make them come one way.`,
      stage2:{title:'The Low Walk', xp:90,
        text:()=>`They come over the carts at last, and the Sixth goes back down the steps to the Low Walk, because the Low Walk is narrow and has a canal on one side, and a narrow place is a soldier's friend.\n\nBehind the Edur, at the top of the street, the light is going wrong. The lamps along the house-fronts are going out, one after another, coming this way.${b57Say({perrit:'\n\nPerrit has gone grey. "Sergeant," she says. "That is not theirs. That is something they carry." She does not say more, and her hand is shaking on the tile pouch.', tobet:'\n\nTobet looks up the street. "The lamps," he says. "Count the lamps."', _:''})}`,
        map:["#.......","#..t....","#.......","#.......","#....t..","#.......","#.......","#..t....","#.......","#......."],
        party:[[3,8],[4,8],[2,8],[5,8],[3,9],[4,9]], allies:[['b5_regular',6,8]],
        foes:[['b5_edur',4,1],['b5_unblooded',5,1],['b5_unblooded',2,0],['b5_wraith',6,0]],
        waves:[{round:2, foes:[['b5_unblooded',7,1]], text:'One more down the steps, quick, young, with the lamps going out behind him.'}]} } },

  foes:{
    /* a looter of the last night: a city man with a cooper's mallet and a sack, and nothing left to lose */
    b5_c7_looter:{name:'A looter', sig:'l', kind:'b5_c7_looter', hp:16, ac:12, atk:4, dmg:[1,8,1], rng:1, mv:4, init:2, boss:true, sk:['shove'], verb:'swings a cooper\'s mallet at'},
    /* the pack's biggest: a Jheck wolf, too big, grey to the muzzle (never B'nagga; never named) */
    b5_c7_greatwolf:{name:'The pack\'s biggest', sig:'W', kind:'b5_c7_greatwolf', hp:40, ac:14, atk:6, dmg:[2,6,2], rng:1, mv:6, init:3, boss:true, sk:['pounce'], verb:'bites'} },

  gear:{ // slot ∈ weapon|armour|trinket; role (38c) on each
    b5_c7_dock:{name:'A holed dock from the Low Walk', slot:'trinket', role:'any', who:null, stat:{guile:1},
      line:'A worn copper dock with a hole bored through it, on a cord still wet from the canal: the twin of the one the canal children dropped into the Quillas for the drowned, the evening the city fell. The Errant, they say, remembers who keeps one. It is worth exactly one dock, and nobody in the Sixth would spend it. +1 Guile.'},
    b5_c7_lamp:{name:'A canal lamp off the Low Walk', slot:'trinket', role:'any', who:null, hp:3,
      line:'A small iron lamp with a horn window, green with canal water, off its hook on the Low Walk. It went under the footbridge with the squad, out, in somebody\'s fist, and came up still in it. It has not been lit since, or put down. +3 health.'},
    b5_c7_ledgerpage:{name:'The Sixth\'s page from the paybook', slot:'trinket', role:'any', who:null,
      line:'A single ruled page out of the Sixth Company\'s paybook: columns of names and numbers in the clerk\'s hand, and a line drawn neatly through every one. The clerk tore it out and handed it over without a word. It is the only receipt the army ever gave anybody in the squad for anything.'} },

  scenes:{
    b5_c7_night:{loc:'Letheras', sub:'The night after Brans Keep', cap:'Fires over the roofs in three places, smoke lying in the streets, and starlings in their thousands going round a dark tower apart.', amb:'explore'},
    b5_c7_walls:{loc:'Letheras', sub:'The day the Edur come · the white walls', cap:'Citizens along the white walls in their hundreds, watching the west road, and some of them writing on slates.', amb:'explore'},
    b5_c7_sorcery:{loc:'Letheras', sub:'The day the Edur come · the street', cap:'A darkness coming down the street toward the barricade, and the lamps going out ahead of it, one after another.', amb:'explore'},
    b5_c7_under:{loc:'Letheras', sub:'Under the footbridge', cap:'Under the arch of the footbridge: green water to the chin, the stones dripping, and daylight on the steps above.', amb:'explore'},
    b5_c7_finale:{loc:'Letheras', sub:'The Low Walk · the evening of the fall', cap:'The Low Walk at dusk after the fall: the canal going by under the footbridge as it always has, and the squad small on the steps.', amb:'explore'} },

  end:{
    emperor:['The Emperor\'s army', 'Letheras fell on the day of the Seventh Closure. The Sixth held a footbridge over the Quillas Canal against the Jheck and the Edur, and went into the canal when the sorcery came down the street, and came out of it alive. In the evening it laid down its arms to an Edur patrol on the Low Walk and was taken back into the army, which is the Emperor\'s now. The paybooks did not change. Only the seals did.'],
    paid:['Paid out', 'Letheras fell on the day of the Seventh Closure. The Sixth held a footbridge over the Quillas Canal against the Jheck and the Edur, and went into the canal when the sorcery came down the street, and came out of it alive. In the evening it laid down its arms and took its discharge, and spent every dock it had on its debts, smallest first, and walked out of the army in Letheras with what the sums left it.'],
    ledger:['Out of the ledger', 'Letheras fell on the day of the Seventh Closure. The Sixth held a footbridge over the Quillas Canal against the Jheck and the Edur, and went into the canal when the sorcery came down the street, and came out of it alive. In the evening, before the patrol reached it, it slipped away along the canal, and Finadd Ennic wrote it into the dead roll of the fall in his neat hand.'] },
  endScene:'b5_c7_finale',
  endCap:()=> b57Key() === 'emperor' ? 'The Low Walk at dusk, the squad\'s swords on a cart, and the canal going by under the footbridge as it always has.' : b57Key() === 'paid' ? 'The Low Walk at dusk, the squad out of uniform on the steps, and the canal going by under the footbridge as it always has.' : 'The Low Walk at dusk, empty, and the canal going by under the footbridge as it always has.',
  tease:'The epilogue: where each road out of Letheras goes, what every debt became, and the end of Book Five.',

  extras:()=>{ const f = S.f, x = [], fell = b57Fallen();
    if (f.b5_c7_burned) x.push('In the night the house\'s strongroom in the Counters\' Quarter burned, and a quarter of every debt with it.');
    else if (f.b5_c7_clerk && !b57House()) x.push('The clerk sat all night in a doorway with the paybook case on his knees.');
    if (fell.length) x.push(`At the brazier the squad said ${b57And(fell.map(NAME))}, once each.`);
    if (f.b5_c7_courtDone) x.push(f.b5_c7_courtDone === 'receipt' ? 'The fines court\'s receipt turned the court\'s men away on the last night.' : f.b5_c7_courtDone === 'swam' ? 'The court\'s men knew Thegg\'s face, the one who swam, and went.' : 'The Drownings court\'s men came with a list on the last night, and went away without the name.');
    if (f.b5_c7_wolvesDone) x.push('The Sixth drove the Jheck\'s wolves off the tiers and the footbridge.');
    if (f.b5_c7_canal) x.push('When the sorcery came down the street, the swimmers took the squad into the canal under the footbridge, and everybody came up.');
    if (f.b5_c7_dockOk) x.push('The canal children showed the squad the holed dock, and gave it the twin.');
    if (f.b5_c7_key === 'emperor') x.push('This sergeant\'s road goes on: the Emperor\'s army. Book Seven, when it is written, will offer this save.');
    if (f.b5_c7_key === 'paid') x.push(`The squad spent ${b5Coin(f.b5_c7_spent || 0)} on its debts at discharge. ${(f.b5_c7_released || []).length ? `${b57Cap(b57And(b57Rel().map(id => id === 'sgt' ? 'you' : NAME(id))))} walked out paid up.` : 'Nobody walked out paid up.'} No road onward.`);
    if (f.b5_c7_key === 'ledger') x.push('The squad is in the dead roll of the fall, and its debts have gone to the heirs. No road onward.');
    if (b5In('pessa')) x.push('Pessa came home to the canals, and argued with them.');
    if (b5In('ruuk')) x.push('Ruuk found the squad every road in a city he had never seen.');
    if (b5In('brune')) x.push('Brune went into the canal and said it was not the sea, and held on anyway.');
    return x; },

  journal:()=>{ const f = S.f; return [
    f.b5_c7_key === 'emperor' && 'The Sixth laid down its arms on the Low Walk and was taken back into the Emperor\'s army. The paybooks stand.',
    f.b5_c7_key === 'paid' && 'The Sixth took its discharge on the Low Walk and paid its debts as far as the docks went, smallest first.',
    f.b5_c7_key === 'ledger' && 'The Sixth is in the dead roll of the fall. Its debts have gone to the heirs.',
    f.b5_c7_stopped && 'The Emperor stopped the killing in the streets, and decreed a day of suffering.',
    f.b5_c7_canal && 'When the sorcery came down the street, the squad went into the canal under the footbridge, and came up.',
    f.b5_c7_word && 'Word along the canal: a Finadd held the main bridge and fought the Emperor, and both fell, and the Emperor rose. Not one of them saw it.',
    f.b5_c7_burned && 'The house\'s strongroom burned in the night. A quarter of every debt went with it.',
    'The King has been crowned Emperor, they say, by his court. The Seventh Closure has come.',
    'The Sixth is in Letheras, at a footbridge over the Quillas Canal by the Low Walk, two streets from where you were born.'].filter(Boolean); },

  dlg:{
    /* ---- phase 1: the night, the Drownings District ---- */
    b5_c7_start:()=>({sp:'Letheras · the night', scene:'b5_c7_night', fx:()=>{ S.f.b5_c7_ph ??= 1; },
      again:()=>`The Drownings District at night: burned houses, and the bell ringing.`, txt:
`The Sixth comes down into the Drownings District in the small hours, because that is where the bell is ringing.

Every City Garrison station in Letheras has a bell, and each district's bell has its own count, and tonight they are all ringing the same count over and over: *any soldier, here*. The Drownings' bell is in a station at the corner of the old fish market, and a garrison sergeant is standing under it with a lamp, writing down whoever comes.

Over the roofs, in three places, there are fires, and they are being left to burn. And in the dark between them, round a dark tower that stands apart from everything, there are starlings, tens of thousands of them, going round and round at night, which starlings do not do.${b57Say({tobet:`\n\nTobet watches them. "They're counting something," he says. "Everyone in this city is."`, perrit:`\n\nPerrit watches them and does not say what she thinks they are doing, which in Perrit is a great deal.`, _:''})}

This is two streets from where you were born. You know the corner. You know the bell.`,
      ch:[{t:'Find the Finadd.', go:'b5_c7_ennic'},
          {t:'A glow over the roofs to the east. The Counters\' Quarter.', req:()=>b57House() && !S.f.b5_c7_burned, go:'b5_c7_counters'},
          {t:'Walk the street.', go:()=>startExplore()}]}),

    b5_c7_ennic:()=>({sp:B5_FINADD.name, scene:'b5_c7_night', fx:()=>{ S.f.b5_c7_orders = 1; },
      again:()=>`Finadd Ennic, one hand on the stitches. "The footbridge, Sergeant."`, txt:
`Finadd Ennic has been to the bell and back, with one hand on the stitches in his side and his book under the other arm, and he has the look of an officer who has been given an order at last and is not sure he likes it.

"The garrison is putting what soldiers come at the bridges," he says. "Every bridge. The big ones get the Prince's Guard and the King's, what is left of them. We have a footbridge." He opens the book and reads it out, because he wrote it down. "The footbridge over the Quillas Canal by the Low Walk, in the Drownings District. A barricade of carts. Hold it." He shuts the book. "I asked the garrison sergeant against what. He said against whatever comes down the street."${S.f.b5_c6_stitched === 'ammet' && b5In('ammet') ? `\n\nAmmet looks at his side without asking. "Hold still," she says, and he does, in the middle of the street, and she checks her stitches by the light of a burning house. "They'll do," she says.` : ''}

He looks west down the street. "You know this part of the city, Sergeant. Lead on."`,
      ch:[{t:'"The Low Walk is this way."', onward:true, go:'b5_c7_tobridge'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the house's strongroom in the Counters' Quarter burns (Ch5 'sign'): a quarter of every debt goes */
    b5_c7_counters:()=>({sp:'The company clerk', scene:'b5_c7_night', html:debtHTML('The Sixth Company · Letheras'), fx:()=>{ b57Burn(); S.f.b5_c7_clerk = 1; },
      again:()=>`The glow over the Counters' Quarter, dying down.`, txt:
`Over the roofs to the east the sky is orange and rising, and the company clerk has stopped in the street with the oilskin case against his chest to look at it.

"The Counters' Quarter," he says. "That is the house's street. That will be the house." He watches for a while. "Strongrooms are built against thieves. They are not built against a city."

A man comes past with a ledger under each arm, running, and drops one, and does not stop for it. The clerk picks it up and looks inside, and puts it down on a step, carefully.

"They will have copies," he says. "The house always has copies. But not all of them, and not tonight, and not of everything." He does a sum in his head, and you watch him do it. "A quarter, Sergeant. Near enough. A quarter of every line the house holds went up in that." He holds the case tighter. "I would not say so to the house's factor. I would not say anything to the house's factor."${b57If('tobet', `\n\nTobet watches the glow. "That's my plough," he says, flat. "A quarter of it." He sounds as if he cannot decide which quarter.`)}${b57If('perrit', `\n\nPerrit has done the sum too, faster. "Rounded up," she says. "In our favour. For once."`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b5_c7_clerk:()=>({sp:'The company clerk', scene:'b5_c7_night', html:debtHTML('The Sixth Company · Letheras'), fx:()=>{ S.f.b5_c7_clerk = 1; },
      again:()=>`The clerk in a doorway, with the case on his knees.`, txt: b57House() ?
`The company clerk has found a doorway out of the wind with the oilskin case on his knees. Over the roofs to the east, where the Counters' Quarter is, the glow has gone down to red.

"The house will have copies of some of it," he says. "The army has the rest." He pats the case. "Whatever happens tomorrow, this is what the squad owes. It is the only book in Letheras tonight that is right."` :
`The company clerk has found a doorway out of the wind and is sitting in it with the oilskin case on his knees, both arms round it, the way a man holds a child in a crowd.

"The army's book," he says. "The house's men did not get it at Brans Keep, and the looters will not get it tonight." He does not move. "I will be here, Sergeant. All night. If anybody wants to pay anything down, I can write it. If anybody wants to take the book, they can try." He looks very small and very sure.`,
      ch:[{t:'The pay desk, in the doorway.', go:'b5_c7_pay'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* a street brazier: citizens, the word of the Emperor, the wagers already being laid */
    b5_c7_brazier:()=>({sp:'A street brazier', scene:'b5_c7_night', fx:()=>{ S.f.b5_c7_brazier = 1; },
      again:()=>`The brazier at the corner, and the people round it.`, txt:
`At the corner by the fish market somebody has dragged a brazier out of a shut-up tavern and lit it, and a dozen people of the district are standing round it in the middle of the street, because it is the only light that is not a house burning.

They know the Sixth's coats, and they make room. They have news, and they want to give it to soldiers, because soldiers ought to have it. The King has been crowned Emperor in the new palace by his court: they all agree on that, and on the Seventh Closure, and on what it means, which is that it is going to be all right. A woman says the Emperor will come out on the balcony in the morning and the Edur will kneel. A man says the Edur eat what they kill, and is told to be quiet in front of the children. A boy says he has heard that the Edur cannot cross running water, and the canal is running water, and everybody looks at the boy until he stops.

An old man with a slate is taking wagers on which bridge the Edur come over first. He has odds chalked up already, and the crowd lets him. It is Letheras.${b57Say({ruuk:`\n\nRuuk stands where the brazier's light gives out, looking up the streets in every direction. "I know every road in the Faraed," he says. "This is not roads. This is a knot." He grins anyway. "Give me a night. I'll know it."`, pessa:`\n\nPessa sniffs the canal on the wind. "That's the Quillas," she says. "I'd know it blind. I poled grain under every bridge on it." She looks at the old man's slate. "He's got the odds wrong on the Low Walk."`, _:''})}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the City Garrison's bell-station */
    b5_c7_bell:()=>({sp:'The bell-station', scene:'b5_c7_night', fx:()=>{ S.f.b5_c7_bell = 1; },
      again:()=>`The bell-station at the corner, still ringing.`, txt:
`The garrison sergeant under the bell has a lamp on a nail and a book on a barrel, and he is writing down every soldier who comes in under the bell: name, unit, what they are carrying. He writes the Sixth down without looking up, company by company of one.

"Whitefinders," he says. "From the keep?" He writes. "You're the first of the Whitefinders. Your Finadd has his orders. The footbridge by the Low Walk." He looks up at last. "Do you know where that is?"

You do. You learned to swim off its steps.

"Good," the garrison sergeant says, and goes back to writing. Behind him the bell goes on ringing its count, over and over, over a district that has mostly stopped listening.`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the broken shopfront: looters (the optional fight) */
    b5_c7_shop:()=>({sp:'A broken shopfront', scene:'b5_c7_night', again:()=>`The cooper's shop, its shutters off.`, txt: S.f.b5_c7_lootDone ?
`The cooper's shop, its shutters off, its barrels back inside where the cooper rolled them.` :
`A cooper's shop with its shutters torn off, and inside it, by the light of a lantern on the floor, people are rolling barrels out into the street. Some of them are city people with sacks. Some of them are wearing the army's coats with the badges cut off: deserters, out of some company that broke on the road, who have decided the city owes them.

Above the shop a shutter is open an inch, and somebody inside is watching, and keeping very still.`,
      ch:[{t:'"Put them back." Shields.', req:()=>!S.f.b5_c7_lootDone, go:()=>startBattle('b5_c7_looters', {})},
          {t:'Talk them out of it: the bell is ringing, and the garrison is writing down names.', check:['guile', 14], req:()=>!S.f.b5_c7_lootDone && !S.f.b5_c7_lootTalk, fx:()=>{ S.f.b5_c7_lootTalk = 1; },
            edges:id=>[id === 'sgt' && ['this is your district, and you sound like it', 2], id === 'pessa' && ['she talks back for a living', 2], id === 'tobet' && ['he knows what a deserter is afraid of', 1], id === 'thegg' && ['Thegg is not a talk', -1]],
            near:{t:()=>{ const w = b57Who(); return `Yes, but one of the deserters looks at ${b57Nm(w)} a long time before he goes, and says a name, and it is the right name: rattled.`; }, fx:()=>b57Rattle(b57Who())},
            go:'b5_c7_shop_talked', fail:'b5_c7_shop_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_shop_talked:()=>({sp:'A broken shopfront', scene:'b5_c7_night', fx:()=>{ if (!S.f.b5_c7_lootDone) { S.f.b5_c7_lootDone = 1; S.f.b5_c7_lootTalked = 1; b57Docks(8, 'the cooper\'s thanks, from the upstairs window, in a sock'); } }, txt:
`The deserters listen to the bell, and to the names, and look at each other, and put the barrels down. The city people with sacks are gone before the deserters are. The deserters go last, up the street, the other way from the bell.

The shutter upstairs opens all the way, and a sock comes down on a string with eight docks in it. "For the barrels," the cooper says, from the dark. He does not come down.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b5_c7_shop_no:()=>({sp:'A broken shopfront', scene:'b5_c7_night', txt:
`They listen to the bell, and to the names, and the one with the bow laughs, and says the garrison can write his name in the canal.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c7_looters', {surprise:'e'})}]}),
    b5_c7_looters_after:()=>({sp:'A broken shopfront', scene:'b5_c7_night', fx:()=>{ if (!S.f.b5_c7_lootDone) { S.f.b5_c7_lootDone = 1; b57Docks(12, 'the cooper\'s thanks, from the upstairs window, in a sock'); } }, txt:
`The looters go, the ones who can, up the street and away from the bell. The barrels stand in the street where they were dropped.

The shutter upstairs opens all the way, and a sock comes down on a string with twelve docks in it. "For the barrels," the cooper says, from the dark. "Roll them back in, if you would. I'll not come down." The Sixth rolls them back in.${b57If('ammet', `\n\nAmmet goes round the squad by the lantern's light. "Hold still," she says, to whoever moves first, and nobody does.`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* something in the rubble: a purse, under a fallen shutter */
    b5_c7_rubble:()=>({sp:'The rubble', scene:'b5_c7_night', again:()=>`The rubble by the burned house.`, txt:
`In the rubble in front of a burned house a fallen shutter lies across something, and under the edge of the shutter, in the light from the fires, there is the corner of a purse, good leather, with the strings still tied. Whoever dropped it was in a hurry. The shutter is heavy, and the house behind it is still ticking with the heat.`,
      ch:[{t:'Get it out from under, carefully.', check:['wits', 13], req:()=>!S.f.b5_c7_rubbleTried, fx:()=>{ S.f.b5_c7_rubbleTried = 1; },
            edges:id=>[id === 'thegg' && ['the shutter is nothing to Thegg', 2], id === 'ruuk' && ['he reads the ground, and rubble is ground', 1], id === 'perrit' && ['she works out where the weight is first', 1]],
            near:{t:()=>{ const w = b57Who(); return `Yes, but the shutter shifts as ${b57Nm(w)} ${b57V(w, 'reach', 'reaches')} under it and takes the skin off a forearm: bruised.`; }, fx:()=>bruise(b57Who(), bruiseN())},
            go:'b5_c7_rubble_ok', fail:'b5_c7_rubble_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_rubble_ok:()=>({sp:'The rubble', scene:'b5_c7_night', fx:()=>{ if (!S.f.b5_c7_purse) { S.f.b5_c7_purse = 1; b57Docks(10, 'a purse out of the rubble, its owner gone'); } }, txt:
`The purse comes out from under the shutter whole. Inside are ten docks and a pawnbroker's ticket for a ring. The squad keeps the docks and leaves the ticket on the step, under a stone, where the owner might come back for it.${b57If('tobet', ` Tobet reads the ticket. "Pawned for four," he says. "Worth twenty. The pawnbroker will be glad of tonight." He puts it back under the stone.`)}`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),
    b5_c7_rubble_no:()=>({sp:'The rubble', scene:'b5_c7_night', txt:
`The shutter will not shift without bringing the rest of the front down with it, and the house is still too hot to stand near. The purse stays where it is, for whoever the city gives it to.`,
      ch:[{t:'Back to the street.', go:()=>startExplore()}]}),

    /* your street: two streets back from the Quillas */
    b5_c7_street:()=>({sp:'Your street', scene:'b5_c7_night', fx:()=>{ S.f.b5_c7_street = 1; },
      again:()=>`The street where you were born, shuttered.`, txt:
`Two streets back from the Quillas Canal there is a street of narrow houses with their upper floors leaning together, and you were born in the fourth on the left. The family debt was born there too, a generation before you, and lived there longer than anybody.

The house is shut, and dark. Your mother's cousin has it now, with the debt's last memory on the lintel, where your father cut a tally every year he paid. The shutters are closed and barred from inside, which is sensible. You do not knock. A soldier knocking tonight is not a thing anybody in the street wants to open a door to.

You touch the white fingertip on your shield's boss, for the Errant, from habit, and go back to the corner.${b57Say({thegg:`\n\nThegg waits at the end of the street, turned sideways, so as not to fill it. "Your mother's house?" he says. You tell him. He nods, and says nothing more about it, which is a kindness.`, _:''})}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the way to the Low Walk */
    b5_c7_tobridge:()=>({sp:'The way to the Low Walk', scene:'b5_c7_night', fx:()=>{ b57Burn(); }, again:()=>`The street going down to the Low Walk.`, txt: !S.f.b5_c7_orders ?
`The street goes down toward the canal and the Low Walk. Finadd Ennic has not given the Sixth its place yet; he is at the bell.` :
`The street goes down toward the Low Walk, past the shuttered tavern where the Drownings bookmakers drink, past the steps to the tiers, and there is the Quillas Canal, black and slow under the fires, and the footbridge over it, and somebody's carts dragged across the street at its head.`,
      ch:[{t:'Down to the footbridge.', req:()=>!!S.f.b5_c7_orders, onward:true, go:()=>{ S.f.b5_c7_ph = Math.max(2, b57Ph()); S.f.b5_c7_threat = b5DrowningThreat() ? 1 : 0; startExplore('b5_c7_canal'); talk('b5_c7_bridge'); }},
          {t:'Find the Finadd first.', req:()=>!S.f.b5_c7_orders, go:'b5_c7_ennic'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 2: the footbridge at night; the reading's place ---- */
    b5_c7_bridge:()=>({sp:'The footbridge', scene:'b5_letheras', fx:()=>{ S.f.b5_c7_ph = Math.max(2, b57Ph()); S.f.b5_c7_atBridge = 1; },
      again:()=>`The footbridge over the Quillas, the barricade at its head, and the brazier.`, txt:
`The footbridge over the Quillas Canal is the width of two carts and the height of a tall man over the water, an old stone arch with a rail, and you have stood on its rail as a child and dropped off it into the canal for a dare, many times. It is smaller than you remember. Everything is.

At its north end, where the street comes down from the district, someone has dragged carts across in two rows with a gap between, and a brazier stands in the gap, and a dozen City Garrison soldiers are sitting behind the carts with their spears across their knees. They look at the Whitefinders' shields, and the white fingertips, and at Finadd Ennic's stitches, and make room behind the carts without being asked.

Below, on the Low Walk, the tiers where the city sits to watch the Drownings are empty. The canal goes under the arch the way it always has.${b57Say({perrit:`\n\nPerrit stands on the bridge with the canal on both sides of her, and her mouth goes thin. "Of course it's a bridge," she says.`, _:''})}`,
      ch:[b5TileChoice(7),
          {t:'The brazier.', go:'b5_c7_fire'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_tiles:()=>b5TileOffer(7),
    b5_c7_card:()=>b5TileCard(7),
    b5_c7_tiles_done:()=>({sp:'The Tiles of the Holds', scene:'b5_letheras', txt:
`${S.f.b5_c7_drawn ? (S.f.b5_c7_reader === 'perrit' ? 'Perrit puts the tiles back in the pouch one at a time, and ties it, and then she picks the dock up off the flagstone, and the knife, and holds them a while, and puts them back exactly where they were.' : 'The tile-woman wraps the bone in the oiled cloth, and the dock goes into her shawl, and she leaves the other dock and the knife on the stone. "Not mine," she says, and goes back down to the followers on the Low Walk.') : 'The tiles stay in the pouch.'} The brazier pops. Over the roofs the fires are lower.`,
      ch:[{t:'The brazier.', go:'b5_c7_fire'},
          {t:'Back to the barricade.', go:()=>startExplore()}]}),

    /* ---- the brazier at the barricade: the fire (no game; the roads) ---- */
    b5_c7_fire:()=>{ const p = b57Ph(), fell = b57Fallen();
      return {sp:'The brazier', scene:p >= 4 ? 'b5_c7_finale' : p === 3 ? 'b5_letheras' : 'b5_letheras', again:()=>p >= 4 ? `The brazier at the barricade, burned down to coals, and the patrol at the end of the street.` : p === 3 ? `The brazier, cold in the daylight.` : `The brazier in the gap between the carts, and the canal under the footbridge.`, txt: p >= 4 ?
`The brazier in the gap between the carts has burned down to coals while the squad was in the canal, and nobody has fed it. The squad stands round it anyway, wet to the bone, steaming a little, and the coals hiss when anybody drips on them.

At the end of the street, where the Edur came down, an Edur patrol is going from door to door, slowly, a long way off yet. Behind the squad the canal goes under the footbridge as it always has.${b57If('thegg', `\n\nThegg wrings out ${b57Has('b5_c1_weightbag') ? 'the weight-sack on his shield\'s strap' : 'his shield\'s strap'}, slowly, as if it mattered.`)}` : p === 3 ?
`The brazier is out, in the daylight, and nobody is going to sit at it today.` :
`The brazier in the gap between the carts, and the City Garrison's soldiers round it, and the Sixth round it with them, a long way from High Fort and as near home as some of them will ever be.

The brazier's circle is not drinking.${b57If('ammet', ' Ammet least of all, who never does the night before.')}${b57If('pessa', `\n\nPessa sits on a cart's shaft with her boathook upright, facing the canal, as if she might be asked to pole something under the bridge at any moment.`)}${b57If('brune', `\n\nBrune has gone down the steps and put her feet in the canal, because it is water. She says it is not the sea. She keeps them in.`)}${b57If('ruuk', `\n\nRuuk sits on top of the barricade, watching the street, and every so often he names a street out loud to himself, getting it right.`)}${fell.length && !S.f.b5_c7_named ? `\n\nThere are names the squad has not said since Brans Keep.` : ''}`,
        ch:[{t:'Sit an hour. Let the squad rest.', req:()=>p === 2 && !S.f.b5_c7_rest, fx:()=>{ S.f.b5_c7_rest = 1; b5Rest('The squad sits an hour at the brazier behind the carts, with the canal going by. Wounds close, mostly.'); }, go:'b5_c7_fire_rest'},
            {t:'The pay desk, at the clerk\'s case. (On the paid road, the squad\'s docks go on the debts.)', go:'b5_c7_pay'},
            {t:'Talk with the squad.', req:()=>p !== 3, go:'b5_c7_fire_talk'},
            {t:'Say the names.', req:()=>fell.length > 0 && !S.f.b5_c7_named && p !== 3, go:'b5_c7_names'},
            {t:'Sleep, behind the carts. The morning will come down the street.', req:()=>p === 2 && S.area !== 'b5_c7_day', onward:true, go:'b5_c7_night'},
            {t:'The patrol is coming. The roads.', req:()=>p >= 4 && !b57Key(), onward:true, go:'b5_c7_roads'},
            {t:'The last of it.', req:()=>p >= 4 && !!b57Key(), onward:true, go:'b5_c7_last'},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c7_fire_rest:()=>({sp:'The brazier', scene:'b5_letheras', txt:
`An hour by the brazier. The garrison soldiers sleep in turns against the carts. The canal talks to itself under the arch.

${b57Say({ammet:`Ammet goes round the squad and looks at hands and feet and the stitches from the keep, and says "Hold still" to Finadd Ennic, who does.`, thegg:`Thegg sits with his shield across his knees and his hand flat on it, and talks low in his mother's tongue to her people's dead, until he sleeps.`, _:'Some of the squad sleep. The rest watch the street.'})}${b57If('tobet', `\n\nTobet counts his arrows, then his debts, then his arrows, and cuts a notch in the tally-stick, and then, after a while, another.`)}${b57Has('b5_c6_paint') ? `\n\nWhoever has the drill-sergeant's paint-pot goes along the squad's shields by the brazier's light and paints every fingertip fresh, white, and the garrison soldiers watch it done and ask what it is for, and the squad cannot tell them.` : ''}`,
      ch:[{t:'Back to the brazier.', go:'b5_c7_fire'}]}),
    /* the squad's talk: one line each, by phase */
    b5_c7_fire_talk:()=>{ const ln = [], eve = b57Ph() >= 4;
      if (b5In('tobet')) ln.push(eve ? `Tobet is wringing out his bowstring. "It's ruined," he says. "Canal water." He looks at it. "Lether owes me a bowstring. I'll put it on the list."` : `Tobet is looking at the street. "From back here," he says, "everything owes me money." He laughs, flat, at his own joke, the way he laughed at the Drownings jokes in the summer, and does not mean it.`);
      if (b5In('thegg')) ln.push(eve ? `Thegg is sitting on the steps with his feet on the Low Walk, very wet, very calm. "Four lungs," he says, when you sit beside him. "My mother's people's. I used them all today." He thinks. "I would like to not use them again for a long time."` : b57Swam() ? `Thegg looks at the canal under the footbridge. "I went under once this year already," he says. "With three hundred docks on me." He looks at it a while longer. "It is the same water. It does not remember me. That is a good thing about water."` : `Thegg looks at the canal under the footbridge. "I never swam it," he says. "You paid, and I never swam it." He considers the water. "I am glad. It looks cold."`);
      if (b5In('perrit')) ln.push(eve ? `Perrit is sitting with her back to the barricade and her face to the canal, and has been for an hour, which nobody mentions. "I went under," she says. "With my back to the water and my face in it." She does a sum on her fingers, out of habit, and stops. "I'm still here. I will have to recalculate a great deal."` : `Perrit has her tile pouch in her lap and is not opening it. "The Ceda is somewhere in the palace, on his tile," she says. "Everybody in the cadre says so." She looks at the starlings. "Whatever happens tomorrow, Sergeant, it will be decided by people who are not on this bridge. I find that a comfort. I find that I shouldn't."`);
      if (b5In('ammet')) ln.push(eve ? `Ammet has her bag open on the steps and is laying out her needles to dry, one at a time, on a cloth. "Canal water," she says. "I'll boil them all twice." She holds one up to the last light. "Nobody hurt in the water," she says. "I'd like that written down somewhere."` : `Ammet is boiling her needles in a tin on the brazier. "My grandmother said cities are where the sick go to be counted," she says. "She was half Nerek. She'd seen the counting." She tips the water out. "Tomorrow I'll be counting."`);
      if (b5In('ruuk')) ln.push(eve ? `Ruuk sits on the barricade with his knees up. "I learned every street," he says. "In a night. And then the city fell over." He grins, a little. "I'll never use them again. My grandmother will not believe a word."` : `Ruuk is on top of the barricade, naming streets. "That is Gutter Lane," he says. "That is the Bookmakers' Steps. That is the one with no name that everybody calls the Wet One." He looks pleased. "Not that way. The map lies. Come." There is still no map.`);
      if (b5In('brune')) ln.push(eve ? `Brune is wringing out her hair. "The canal is not the sea," she says. "It took nothing back. It just held us." She thinks about it. "That is a kindness I did not expect from Lether."` : `Brune is on the bottom step, as close to the water as the step allows. "It goes to the sea," she says. "Eventually. Everything here does, eventually." She does not take her feet out.`);
      if (b5In('pessa')) ln.push(eve ? `Pessa is sitting on the bottom step with her boathook across her knees, dripping. "My canal," she says. "I knew every stone under that arch. I told them." She sniffs. "Nobody ever listens to a woman with a boathook until she's the only one who knows where the ledge is."` : `Pessa reads her line in the clerk's book out loud, from memory, to the canal: "*Pessa*. Less thirty." She sniffs. "Tomorrow I'll be a soldier or I'll be wet," she says. "Possibly both. I'm not a soldier."`);
      return {sp:'The brazier', scene:b57Ph() >= 4 ? 'b5_c7_finale' : 'b5_letheras', txt:ln.length ? ln.join('\n\n') : `The squad is you, tonight, and the brazier, and the canal. You sit with all three. The canal has always been the best of the company.`,
        ch:[{t:'Back to the brazier.', go:'b5_c7_fire'}]}; },
    /* the fallen of Brans Keep, named once each, and who carries their debts */
    b5_c7_names:()=>{ const fell = b57Fallen();
      return {sp:'The brazier', scene:'b5_letheras', fx:()=>{ S.f.b5_c7_named = 1; }, txt: fell.length ?
`At the brazier, late, with the garrison soldiers asleep against the carts, the squad says the names. It is not decided. One voice starts, and the rest follow.

${fell.map(id => `*${NAME(id)}*.`).join(' ')}

Once each. They are in the barrow on the field at Brans Keep, with the Edur dead and the rest of the army's, in one mound, by the Emperor's order. The squad did not see them go into it. It knows they are there.

${fell.map(b57Heir).join(' ')} It is not the squad's to pay. The army's rule says the heirs carry it, and the army's rule is written down, in the case on the clerk's knees.${b57Say({thegg:`\n\nThegg says something low in his mother's tongue after the names, to her people's dead. When you look at him he says, "I told them who was coming."`, _:''})}` :
`There are no names to say. Everybody who went over the channel at Brans Keep is at the brazier.`,
        ch:[{t:'Back to the brazier.', go:'b5_c7_fire'}]}; },
    b5_c7_pay:()=>({sp:'The clerk\'s case · the pay desk', scene:b57Ph() >= 4 ? 'b5_c7_finale' : 'b5_letheras', html:debtHTML('The Sixth Company · Letheras'), again:()=>`The pay desk. The clerk's pen is wet, and the squad has ${b5Coin(S.silver || 0)} in hand.`, txt:
`The clerk opens the case on a cart's tailboard and takes out the Sixth's book, dry, because the oilskin is good oilskin. "Anything paid down tonight is paid," he says. "${b57House() ? 'The house will get it, whenever there is a house again.' : 'The army will get it, whoever the army is by tomorrow.'}" He wets the pen. "If the squad takes its discharge, Sergeant, I will put what is in hand on the smallest lines first. That is the most soldiers out. That is the arithmetic."`,
      ch:b5PayChoices('b5_c7_fire')}),

    b5_c7_ennic_bridge:()=>({sp:B5_FINADD.name, scene:'b5_letheras', fx:()=>{ S.f.b5_c7_ennicBridge = 1; },
      again:()=>`Finadd Ennic, writing at the barricade.`, txt:
`Finadd Ennic is sitting on a cart's shaft writing the night's orders into his book, in his neat hand, by the brazier's light. He shows you the page. It says *The footbridge over the Quillas Canal, the Low Walk. Hold.* and underneath, smaller, *Against whatever comes down the street.*

"I have never written anything so short," he says. "I keep wanting to add to it." He closes the book. "The Guard has the main bridge, they say." He seems to find this hopeful. "We have this one. We will hold it."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_garrison:()=>({sp:'A garrison sergeant', scene:'b5_letheras', fx:()=>{ S.f.b5_c7_garrison = 1; },
      again:()=>`The garrison sergeant behind the carts.`, txt:
`The garrison sergeant at the barricade is an old man with a spear and the City Garrison's badge on a coat that has been let out twice. He has been at this footbridge for two days, keeping looters off the Low Walk, and he is glad of the Whitefinders and does not pretend not to be.

"They'll be on the walls in the morning," he says. "The whole city. To watch them come down the west road." He spits into the canal. "Taking wagers. My wife will be up there with her sister and a slate." He looks at the street. "Spectators. That's a Letherii talent, that is. We'd watch our own drowning and lay odds on how we'd float."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* the quartermaster, with nothing to sell: no salves in Letheras's last day (the brief) */
    b5_c7_qm:()=>({sp:'The quartermaster', scene:'b5_letheras', fx:()=>{ S.f.b5_c7_qm = 1; }, again:()=>`The quartermaster on his empty cart.`, txt:
`The quartermaster has got his cart as far as the footbridge and no further, and is sitting on its tail with the crate open beside him. The crate is empty. He shows you, in case you thought otherwise.

"No salves," he says. "Not tonight. The army's stores in the city are in the looters' hands or the garrison's or nobody's, and I've been to all three." He shuts the lid. "I'd sell you one at six if I had one. I'd sell you one at six tomorrow, if there's a tomorrow with a price in it." He considers the canal. "There's always a price in it. It's Letheras."${b57If('ammet', `\n\nAmmet looks into the empty crate. "Then I'll use what's in my bag," she says, "and what's in my bag is needle and gut." She does not sound worried. She sounds as if she has counted.`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    /* the garrison sergeant by day, on the barricade */
    b5_c7_garrison_day:()=>({sp:'A garrison sergeant', scene:'b5_c7_walls', fx:()=>{ S.f.b5_c7_garrisonDay = 1; }, again:()=>`The garrison sergeant on the barricade, looking at the walls.`, txt:
`The old garrison sergeant is up on a cart at the barricade, looking over the roofs at the white walls and the people on them. "My wife's up there," he says. "With her sister. And a slate." He shades his eyes. "I can't see her. I know she's there. She'll have odds on this bridge."

He gets down. "${S.f.b5_c7_barricadeDone ? 'Whatever that was in the street,' : S.f.b5_c7_wolvesDone ? 'Wolves on the tiers,' : 'Wolves in the streets, they say,'}" he says, "and the city on the walls watching it like a Drowning. Spectators." He spits into the canal. "That's a Letherii talent. I've always said so."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the court's men: the canal threat (a drowning debt in Letheras) ---- */
    b5_c7_courtmen:()=>{ const list = b5Debtors().filter(id => b5Standing(id) === 'drowning'), w = list[0] || 'sgt';
      return {sp:'The Drownings court\'s men', scene:'b5_letheras', fx:()=>{ S.f.b5_c7_courtMet = 1; }, again:()=>`The court's man on the Low Walk with his list.`, txt:
`Four men come along the Low Walk by lamplight, in no hurry, with the Drownings court's brass tag on their coats: a thin man with a list in front, and three with cudgels behind. Even tonight. The city is burning in three places and the Edur are a night's march off, and the fines court of the Drownings has men out with a list.

The thin man stops at the foot of the steps and reads from it, by the light of the brazier above. "${w === 'sgt' ? 'The sergeant of the Sixth Company, Whitefinder Battalion' : `${NAME(w)}, of the Sixth Company, Whitefinder Battalion`}. A debt past the line the holder will wait for. The court has the name." He folds the list. "The court is sitting tomorrow, or the day after, or whenever there is a court. We'll take the name along now and save everybody the walk."${b57Swam() && b5In('thegg') ? `\n\nOne of the cudgel-men has seen Thegg, and is looking at him, and has stopped looking at anything else. "That's the one who swam," he says, to the thin man, quietly. "In the summer. With three hundred on him."` : ''}`,
        ch:[{t:'Show him the fines court\'s receipt: three hundred docks, received, sealed.', check:['wits', 13], req:()=>b57Has('b5_c1_receipt') && !S.f.b5_c7_receiptTried, fx:()=>{ S.f.b5_c7_receiptTried = 1; },
              edges:id=>[id === 'sgt' && ['you know how the Drownings court reads its own paper', 2], id === 'perrit' && ['she has read worse paper than this for a living', 1], id === 'pessa' && ['she argues with clerks for sport', 1]],
              near:b57Owe(5, 'The court\'s fee for reading its own receipt', w2 => `Yes, but the thin man writes a fee in his book for the reading of it, against ${b57Pos(w2)} name: ${b5Coin(5)}. Even tonight.`, {t:w2 => `Yes, but the thin man reads the receipt three times, aloud, at length, and ${b57Nm(w2)} ${b57V(w2, 'stand', 'stands')} there through all of it: rattled.`, fx:w2 => b57Rattle(w2)}),
              go:'b5_c7_court_ok', fail:'b5_c7_court_no'},
            {t:'Let them get a good look at Thegg.', req:()=>b57Swam() && b5In('thegg') && !S.f.b5_c7_courtDone, go:'b5_c7_court_swam'},
            {t:'"The name stays here." Shields.', req:()=>!S.f.b5_c7_courtDone, go:()=>startBattle('b5_c7_court', {})},
            {t:'Not now.', go:()=>startExplore()}]}; },
    b5_c7_court_ok:()=>({sp:'The Drownings court\'s men', scene:'b5_letheras', fx:()=>{ S.f.b5_c7_courtDone = 'receipt'; }, txt:
`The thin man takes the receipt and holds it to the brazier's light, and reads it, and turns it over and reads the seal, and the court's cord through it, and reads it again.

"Three hundred," he says. "Received. The court's own seal." He gives it back, carefully, by the corner. "The court does not take a name twice for one fine, Sergeant. The court is very particular about that. It is almost the only thing it is particular about." He crosses something out on his list, and nods to the cudgels, and they go back along the Low Walk the way they came.

${b57If('thegg', 'Thegg watches them go. "Three hundred docks," he says, "and it turns out to be for this." He sounds pleased about it, slowly.')}`,
      ch:[{t:'Back to the barricade.', go:()=>startExplore()}]}),
    b5_c7_court_no:()=>({sp:'The Drownings court\'s men', scene:'b5_letheras', txt:
`The thin man reads the receipt, and gives it back. "For a fine," he says. "This is a debt. The court has a different book for debts." He nods to the cudgels.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c7_court', {surprise:'e'})}]}),
    b5_c7_court_swam:()=>({sp:'The Drownings court\'s men', scene:'b5_letheras', fx:()=>{ S.f.b5_c7_courtDone = 'swam'; }, txt: !b5In('thegg') ? `The court's men look the squad over a long while, and fold the list, and go back along the Low Walk.` :
`Thegg stands up behind the carts, all of him, slowly, and comes down the steps to the Low Walk, and stands there, sideways out of politeness, with the court's empty weight-sack ${b57Has('b5_c1_weightbag') ? 'still tied to his shield\'s strap' : 'long gone, and the shape of it still on his shield\'s strap'}.

"The one who swam," the cudgel-man says again.

The thin man looks at Thegg a long while. "The court took its fee off you in the summer," he says at last. "And its rope, and its weights. And you came out the far side." He folds the list and puts it away. "A man the canal has given back once, the court does not like to ask twice. It is bad for the wagering." He nods, to Thegg, almost politely, and the four of them go back along the Low Walk.

Thegg watches them go. "I did not say anything," he says, puzzled. "I just stood here."`,
      ch:[{t:'Back to the barricade.', go:()=>startExplore()}]}),
    b5_c7_court_after:()=>({sp:'The Low Walk', scene:'b5_letheras', fx:()=>{ if (!S.f.b5_c7_courtDone) S.f.b5_c7_courtDone = 'fought'; }, txt:
`The garrison soldiers come down the steps at last with their spears, and the court's men go back along the Low Walk, holding their heads, the thin man last. He has dropped his list. It lies on the setts by the canal's edge, wet.

You pick it up. There are eleven names on it, from all over the Drownings District, and one of them is the squad's. You tear it in half, and in half again, and drop it into the canal, and the canal takes it under the arch.${b57If('pessa', `\n\nPessa watches the pieces go. "That's how you do a list," she says, with deep approval.`)}`,
      ch:[{t:'Back to the barricade.', go:()=>startExplore()}]}),

    /* the tile-woman, with the company's followers on the Low Walk */
    b5_c7_tilewoman:()=>({sp:'The tile-woman', scene:'b5_letheras', again:()=>`The tile-woman on the Low Walk, with the followers.`, txt:
`The tile-woman has come down to the Low Walk with what is left of the company's followers, a dozen women and two carts, and they have made a camp under the tiers, out of the wind. She is sitting on the bottom step with her bag of oiled cloth in her lap. She spits to one side when you come down.

${b57Ph() >= 4 ? `"Still here," she says. "Both of us." She looks at the water. "I'd not have bet on it. I'd not have got odds."` : b57Ph() >= 3 ? `"Go and hold your bridge," she says. "I'll be here when it's done, one way or the other."` : b5In('perrit') ? `"Your mage reads tonight," she says. "Good. I'll not read this one if I've the choice." She looks up at the starlings over the roofs. "Bone doesn't like a city at night. Neither do I."` : `"I'll read," she says. "Up behind your carts, on the stone. Not down here: the water listens." She shakes the bag, and it clicks. "A dock."`}`,
      ch:[Object.assign(b5TileChoice(7), {req:()=>b57Ph() === 2 && !b5In('perrit') && !S.f.b5_c7_drawn && !S.f.b5_c7_noCard}),
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the arch: under the footbridge, the way into the canal (by phase) */
    b5_c7_arch:()=>({sp:'Under the footbridge', scene:b57Ph() >= 3 && S.f.b5_c7_canal ? 'b5_c7_under' : 'b5_letheras', again:()=>`The arch of the footbridge, and the canal under it.`, txt: b57Ph() >= 4 ?
`The arch of the footbridge, and the green water under it, and the ledge along the stones where the squad hung on through the afternoon. You can see the marks where hands held. They will be gone by morning.` : S.f.b5_c7_canal ?
`Under the arch, the green water, and the squad in it.` :
`Under the footbridge the Low Walk's steps go right down into the canal, and the arch goes over the water low and dark, and along the stones under it there is a ledge a hand wide, a hand under the surface, that every child in the Drownings District knows and no grown-up has looked at in years. You hung off it as a child, with your nose just out of the water, counting, to see who could stay the longest.

It is still there. You check.${b57If('pessa', ' Pessa leans over and looks too. "The ledge," she says. "Good. They never fill them in."')}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_back:()=>({sp:'The street', scene:'b5_c7_night', again:()=>`The street back up into the district.`, txt:
`The street goes back up into the Drownings District, toward the bell and the fires. The Sixth's place is here.`,
      ch:[{t:'Back up into the district, for a while.', req:()=>b57Ph() === 2, go:()=>startExplore('b5_c7_streets')},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the night, and the morning */
    b5_c7_night:()=>({sp:'The night', scene:'b5_letheras', again:()=>`The night behind the carts.`, txt:
`The night is short. The fires over the roofs burn down. The starlings stop going round the dark tower at last, somewhere before dawn, and settle, and the city is quiet the way a city is quiet that is listening.

Twice somebody runs down the street, and is let through the gap between the carts, and goes on over the footbridge without stopping, and is gone into the Pursers' side of the district.${b57If('thegg', ' Thegg sleeps sitting up against a cart wheel with his shield across his knees.')}${b57If('tobet', ' Tobet sleeps with his bow in his arms.')}${b57If('perrit', ' Perrit does not sleep, and says she did.')}

Then grey over the roofs, and a sound from the west, a long way off, like a great many feet.`,
      ch:[{t:'Morning.', onward:true, fx:()=>{ S.f.b5_c7_ph = 3; }, go:()=>{ startExplore('b5_c7_day'); talk('b5_c7_morning'); }},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- phase 3: the day ---- */
    b5_c7_morning:()=>({sp:'The day the Edur come', scene:'b5_c7_walls', fx:()=>{ S.f.b5_c7_ph = Math.max(3, b57Ph()); S.f.b5_c7_walls = 1; },
      again:()=>`The footbridge by daylight, and the citizens on the walls.`, txt:
`In the morning the citizens of Letheras go up on the white walls to watch.

You can see them from the footbridge, over the roofs to the west: the walls lined with people, hundreds of them, thousands, in their good coats, with their children on their shoulders, looking out at the west road. Some of them have brought food. Some of them have brought slates. The garrison sergeant was right about his wife.

Word comes down the streets by runners and by shouting: the Edur are on the west road. Then: the Edur are at the gate. Then nothing for a long time, and then a great many things at once, none of them agreeing.

Then, from somewhere among the streets to the north, close, a sound that is not men: a howl, and another, and screaming.${b57Say({ruuk:`\n\nRuuk is up on the barricade already. "Wolves," he says. "In the streets. Coming down the hill, by the sound." He has a spear in his hand. "They hate up. There is no up here."`, tobet:`\n\nTobet has an arrow on the string. "Wolves," he says. "In Letheras. I'll put that on the list too."`, _:''})}`,
      ch:[{t:'The tiers. They are coming down onto the Low Walk.', go:'b5_c7_tiers'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_wager:()=>({sp:'A citizen with a slate', scene:'b5_c7_walls', fx:()=>{ S.f.b5_c7_wager = 1; },
      again:()=>`The citizen with the slate, at the street's corner.`, txt: S.f.b5_c7_wolvesDone ?
`The citizen with the slate is rubbing out a column with his sleeve. "The wolves," he says. "I had the wolves at five to one against the Low Walk." He looks at the Sixth. "I won. I'm not complaining." He chalks something new. "The Edur, now. I've no idea of the odds on the Edur. Nobody has."` :
`A citizen of the district in a good coat has come down from the walls to the corner by the footbridge, with a slate and chalk, because, he says, the view is better from the walls but the business is better down here. He has the bridges of the Drownings District chalked up in a column with odds beside each one. The footbridge by the Low Walk is near the bottom.

"No offence, soldiers," he says. "It's a small bridge." He looks at the Whitefinders' shields. "I'll shorten the odds if you like. For the shields."`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    /* the tiers: the Jheck's wolves loose in the Drownings District (the main fight) */
    b5_c7_tiers:()=>({sp:'The tiers', scene:'b5_c7_walls', again:()=>`The tiers along the Low Walk, where the Drownings crowd sits.`, txt: S.f.b5_c7_wolvesDone ?
`The tiers, empty, and the benches overturned where the wolves went through them.` :
`Along the Low Walk the tiers go up in steps from the water, where the city sits to watch the Drownings, and on the tiers, among the benches, there are wolves: grey, too big to be wolves, going along the steps low and fast, at the people who came down to watch the canal and are now trying to get back up the tiers the other way.

Some of the wolves are wolves. Some of them, the garrison sergeant says, very quietly, are not.`,
      ch:[{t:'"Shields. Down onto the tiers."', req:()=>!S.f.b5_c7_wolvesDone, go:()=>startBattle('b5_c7_wolves', {})},
          {t:'Along the Low Walk under the tiers, below their eyeline, and up onto them from the water side.', check:['wits', 15], req:()=>!S.f.b5_c7_wolvesDone && !S.f.b5_c7_tiersTried, fx:()=>{ S.f.b5_c7_tiersTried = 1; },
            edges:id=>[id === 'sgt' && ['you have run along under these tiers since you could run', 2], id === 'pessa' && ['she has walked the Low Walk with a boathook a thousand times', 2], id === 'ruuk' && ['he reads ground, even ground with steps in it', 1], id === 'thegg' && ['the Low Walk was not made for Thegg', -2]],
            near:{t:()=>{ const w = b57Who(); return `Yes, but a wolf turns as ${b57Nm(w)} ${b57V(w, 'come', 'comes')} up the steps and gets a tooth through a boot before the shield comes round: bruised.`; }, fx:()=>bruise(b57Who(), bruiseN())},
            go:()=>startBattle('b5_c7_wolves', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c7_tiers_seen'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_tiers_seen:()=>({sp:'The tiers', scene:'b5_c7_walls', txt:
`A bench goes over on the step above, kicked by somebody running, and every grey head on the tiers comes round at once.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c7_wolves', {surprise:'e'})}]}),
    b5_c7_wolves_after:()=>({sp:'The footbridge', scene:'b5_c7_walls', fx:()=>{ if (S.f.b5_c7_wolvesDone) return; S.f.b5_c7_wolvesDone = 1; S.f.b5_c7_day = Math.max(1, b57Day()); S.f.b5_c7_word = 1; b57Docks(8, 'the citizen with the slate, who had the wolves at five to one against the Low Walk'); }, txt:
`The big one goes off the footbridge's end and along the Low Walk, limping, and the last of the others with it, up the steps into the streets and away north. The tiers are empty but for the benches. On the far side of the canal the citizens who were caught on the tiers come down off them, slowly, staring at the Whitefinders as if they had never seen soldiers before.

The citizen with the slate comes down to the barricade. "Five to one," he says. "Against the Low Walk." He gives the Sixth eight docks out of his own purse, unasked, because he won, and a bookmaker who wins pays his luck.

Then a runner along the canal, shouting as he comes, and everybody along the Low Walk stops to listen. A Finadd held the main bridge. With his company, seventy of them or so, in a shield wall. The Emperor came down to it himself, in front of the Edur. And the Finadd fought him, and they killed each other, both of them, on the bridge.

And then the Emperor got up.

The runner is gone before anybody can ask him how he knows. Not a soul along the canal saw it. Everybody along the canal is saying it, already, to everybody else.${b57Say({tobet:`\n\nTobet has gone quiet. "Got up," he says, at last. "He'd want paying for that, in Lether."`, ammet:`\n\nAmmet says, "I'd want to look at that wound," and nothing else.`, _:''})}

Somewhere to the north-east of the city, a long way off, there is a sound like a great door shutting, a single deep thump, and then nothing. The garrison sergeant says it came from Settle Lake. What it was, he cannot say.`,
      ch:[{t:'To the barricade. The street.', onward:true, go:'b5_c7_edur'},
          {t:'Not now.', go:()=>startExplore()}]}),

    b5_c7_ennic_day:()=>({sp:B5_FINADD.name, scene:'b5_c7_walls', again:()=>`Finadd Ennic at the barricade, with his sword out.`, txt:
`Finadd Ennic has his sword out, which the squad has seen once before, on the dry channel. ${!S.f.b5_c7_wolvesDone ? '"The tiers, Sergeant," he says. "Before they get across the bridge."' : !S.f.b5_c7_barricadeDone ? '"The street, Sergeant," he says. "They are coming down it."' : '"The canal, Sergeant," he says. "You said you knew the way under."'}`,
      ch:[{t:'"Yes, Finadd."', go:()=>talk(b57Next())},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* the Edur at the barricade (the main fight), before the sorcery */
    b5_c7_edur:()=>({sp:'The barricade', scene:'b5_letheras', again:()=>`The barricade of carts, and the street beyond it.`, txt: !S.f.b5_c7_wolvesDone ?
`The street beyond the barricade is empty, for now. The wolves are on the tiers.` : S.f.b5_c7_barricadeDone ?
`The barricade is broken, and the street beyond it is going dark.` :
`At the top of the street, where it comes down from the district, the Edur come round the corner.

Not many. A score, perhaps, tall and grey, in dark leather, walking, with long swords and spears, and shapes going ahead of them along the house-fronts that are not anybody's shadows. They come down the middle of the street toward the footbridge as if the street were theirs, which, the garrison sergeant says, it probably is by now.

The garrison soldiers stand up behind the carts. So does the Sixth. You touch the white fingertip on your shield's boss, for the Errant.`,
      ch:[{t:'"Shields. Behind the carts."', req:()=>S.f.b5_c7_wolvesDone && !S.f.b5_c7_barricadeDone, go:()=>startBattle('b5_c7_barricade', {})},
          {t:'Brace the carts first: wheels chocked, shafts out, so they come one way.', check:['might', 15], req:()=>S.f.b5_c7_wolvesDone && !S.f.b5_c7_barricadeDone && !S.f.b5_c7_braceTried, fx:()=>{ S.f.b5_c7_braceTried = 1; },
            edges:id=>[id === 'thegg' && ['he simply lifts the cart', 3], S.f.b5_c6_fingerOk && ['the drill-sergeant\'s finger: shields locked behind the carts', 1], id === 'pessa' && ['she has chocked a barge on a tide', 1], id === 'perrit' && ['she would rather work out the angle than lift it', -1]],
            near:{t:()=>{ const w = b57Who(); return `Yes, but a cart's shaft comes round as ${b57Nm(w)} ${b57V(w, 'set', 'sets')} it and catches a shoulder: bruised.`; }, fx:()=>bruise(b57Who(), bruiseN())},
            go:()=>startBattle('b5_c7_barricade', nearMiss() ? {} : {surprise:'p'}), fail:'b5_c7_brace_late'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_brace_late:()=>({sp:'The barricade', scene:'b5_letheras', txt:
`The cart will not chock. The wheel spins on the setts, and the shaft swings, and the Edur are at the carts before it stops swinging.`,
      ch:[{t:'Shields.', go:()=>startBattle('b5_c7_barricade', {surprise:'e'})}]}),
    b5_c7_barricade_after:()=>({sp:'The Low Walk', scene:'b5_c7_sorcery', fx:()=>{ if (S.f.b5_c7_barricadeDone) return; S.f.b5_c7_barricadeDone = 1; S.f.b5_c7_day = Math.max(2, b57Day()); }, txt:
`The Edur on the Low Walk go back up the steps, the ones who can, and stand at the top of the street, and do not come down again. They are looking back up the street, the way they came. They are stepping out of the middle of it, onto the house-fronts' steps.

The lamps along the street are going out.

One after another, from the top of the street down, the lamps along the house-fronts go out, each one a little after the one before, coming this way, and behind the last lit lamp the street is not dark the way a street is dark at night. It is dark the way the bottom of the canal is dark. It is coming down the street at a walk.

A garrison soldier on the barricade looks at it, and drops his spear, and runs, over the footbridge and away. He is let go. At a window above the street a woman is watching it come, and then the window is dark too, and nobody is at it.

Finadd Ennic looks at it. Then at you. "Sergeant," he says. "You said you knew the way under."`,
      ch:[{t:'"The canal. Everybody down the steps and under the arch. Now."', onward:true, go:'b5_c7_sorcery'}]}),
    /* the sorcery comes down the street, and the squad goes into the canal: the swimmers take the others under (a Might check) */
    b5_c7_sorcery:()=>({sp:'Into the canal', scene:'b5_c7_sorcery', fx:()=>{ S.f.b5_c7_day = Math.max(2, b57Day()); }, again:()=>`The steps down into the canal, and the dark coming down the street.`, txt: S.f.b5_c7_canal ?
`The squad is under the arch.` :
`Down the Low Walk's steps, the squad and Finadd Ennic and the three garrison soldiers who stayed, into the Quillas Canal, in their scale and their coats and their boots, with the dark coming down the street above at a walk.

The ones who can swim take the ones who cannot. ${b57Swam() && b5In('thegg') ? 'Thegg goes first, because he has been under once this year already with three hundred docks on him, and four lungs are four lungs, and he takes two of them with him, one under each arm.' : 'You go first, because you were born two streets back from this water and have never once said that you can swim like an eel.'}${b57If('brune', ' Brune goes in like a seal, and comes up under the arch, and turns, and holds out her spear-shaft for whoever is next.')}${b57If('pessa', ' Pessa goes in with her boathook and finds the ledge under the arch with it first time, and hooks it, and holds.')}${b57If('perrit', ' Perrit, who has never stood with her back to water, goes in face first and does not make a sound.')}

The ledge under the arch is a hand wide and a hand under the surface. There is room on it for everybody, if everybody holds on.`,
      ch:[{t:'Get everybody under the arch, on the ledge, and holding. (the swimmers carry the rest)', req:()=>!S.f.b5_c7_canal && !S.f.b5_c7_hard, check:['might', 14],
            edges:id=>[id === 'sgt' && ['canal-born; a swimmer who never says so', 2], id === 'thegg' && b57Swam() && ['four lungs, and he has been under once with three hundred docks on him', 2], id === 'brune' && ['the Shake swim before they walk', 2], id === 'pessa' && ['she knows every stone under that arch', 2], id === 'perrit' && ['she has never stood with her back to water', -1]],
            near:b57Owe(15, 'Kit lost in the canal', w => `Yes, but ${b57Pos(w)} shield goes down in the green water off the ledge and does not come up, and the army's ledger will want it back: ${b5Coin(15)} against ${b57Pos(w)} line.`, {t:w => `Yes, but ${b57Nm(w)} ${b57V(w, 'go', 'goes')} under twice getting the last of them onto the ledge, and ${b57V(w, 'come', 'comes')} up the second time with ${b57Pos(w)} heart going like a drum: rattled.`, fx:w => b57Rattle(w)}),
            go:'b5_c7_under', fail:'b5_c7_canal_hard'},
          {t:'Under the arch.', req:()=>!!S.f.b5_c7_canal || !!S.f.b5_c7_hard, go:'b5_c7_under'}]}),
    b5_c7_canal_hard:()=>({sp:'Into the canal', scene:'b5_c7_under', fx:()=>{ if (S.f.b5_c7_hard) return; S.f.b5_c7_hard = 1; const w = b57Who(); if (b57Room(w, 15)) b5Owe(w, 15, 'Kit lost in the canal'); b57Rattle(w); }, txt:
`It goes wrong in the water the way things go wrong in water: all at once, and quietly. A garrison soldier panics and goes under, and ${b57Nm(b57Who())} ${b57V(b57Who(), 'go', 'goes')} down after him, and comes up with him, and goes down again for the shield that went off the ledge, and does not find it. For a while there are too many people and not enough ledge.

Then there is enough ledge. Everybody is holding on. It cost something, and it can be paid later.`,
      ch:[{t:'Hold on.', go:'b5_c7_under'}]}),
    /* under the arch: hold; then it stops: the Emperor's word, and a day of suffering decreed (never what it holds) */
    b5_c7_under:()=>({sp:'Under the footbridge', scene:'b5_c7_under', fx:()=>{ if (S.f.b5_c7_canal) return; S.f.b5_c7_canal = 1; S.f.b5_c7_day = 3; S.f.b5_c7_stopped = 1; if (!S.f.b5_c7_lampGot) { S.f.b5_c7_lampGot = 1; gain('b5_c7_lamp'); } if (b57Drop('b5_c3_ash')) S.f.b5_c7_ash = 1; }, again:()=>`Under the arch, in the green water.`, txt:
`Under the arch of the footbridge, on the ledge, in the green water to the chin, the squad holds on.

Above, through the gap between the arch and the water, you can see the Low Walk's steps in daylight, and then you cannot: the light on the steps goes, and the dark comes down them, and over the water, and across the mouth of the arch, slowly, and stays.

It is very cold. The squad is silent but for one voice praying, very quietly, and it might be yours. The water is in your mouth and your ears and you can feel your own heart in the stone under your fingers. In the canal under the arch there is nothing at all but the water and the squad, holding on, and the dark across the arch's mouth like a door.

Then it goes. It goes on down the canal, the way it came down the street, at a walk. The light comes back onto the steps.

You stay where you are anyway, until your hands decide.${S.f.b5_c7_ash ? `\n\nWhen at last somebody moves, a twist of brown paper floats out from the ledge into the green water, and comes undone, and a pinch of grey ash, still faintly green, goes out of it onto the canal and away under the arch toward the sea. It came down on the dock at Kraig's Landing a long time ago. The squad lets it go.` : ''}${b57Say({thegg:`\n\nThegg is the last to let go of the ledge. "Four lungs," he says, when he can. "I needed five."`, brune:`\n\nBrune lets go of the ledge last. "It held us," she says. "It did not take us. Write that down."`, _:''})}

Much later, from the bridge above, a voice in Letherii with a strange edge to it calls along the canal, the same words over and over, going away along the Low Walk: the killing is stopped, by the Emperor's word. Tomorrow is decreed a day of suffering.

The voice does not say what that means. The ledge does not ask.

When the squad climbs out at last, somebody is holding one of the Low Walk's canal lamps, out, green with water, that came off its hook on the way down and never left the hand that grabbed it.`,
      ch:[{t:'Up the steps. Evening.', onward:true, fx:()=>{ S.f.b5_c7_ph = 4; }, go:()=>{ startExplore('b5_c7_walk'); talk('b5_c7_evening'); }}]}),

    /* ---- phase 4: the evening on the Low Walk ---- */
    b5_c7_evening:()=>({sp:'The Low Walk · evening', scene:'b5_c7_finale', fx:()=>{ S.f.b5_c7_ph = 4; }, again:()=>`The Low Walk at evening, and the patrol at the end of the street.`, txt:
`It is evening when the squad climbs out, and the Low Walk is quiet the way it has never been quiet in your life. The barricade's carts have been pulled apart. The brazier has burned down. The tiers across the canal are empty, and so are the windows above them.

The city is not burning any more. It is not doing anything. Over the roofs the starlings are going round the dark tower again, slowly, because it is evening and that is what starlings do.

At the end of the street, where the Edur came down this morning, an Edur patrol is going from door to door: five or six of them, tall, unhurried, taking spears and swords out of doorways and stacking them on a handcart. They have not looked down the street toward the footbridge yet. They will.

The squad is wet to the bone. Finadd Ennic is sitting on the bottom step with his book open on his knees, and the book is dry, because the clerk's oilskin is good oilskin.`,
      ch:[{t:'Finadd Ennic.', go:'b5_c7_ennic_eve'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_news:()=>({sp:'A garrison sergeant', scene:'b5_c7_finale', fx:()=>{ S.f.b5_c7_news = 1; }, again:()=>`The garrison sergeant on the Low Walk, wringing out his coat.`, txt:
`The old garrison sergeant from the barricade came up out of the canal two arches down, and has walked back along the Low Walk to find the Whitefinders, wringing out his coat as he comes. He has been talking to people. Everybody along the canal has been talking to everybody.

"Finadd Eberict's dead," he says. "In a street, near the river. Him that had the King's Leave. Nobody knows who did it, and nobody's saying they're sorry." He wrings the coat. "The King's Champion is dead, they say. In the throne room. The people who say it were there, or say they were." He shakes his head. "And the Chancellor's sworn to the Emperor. On his knees, they say, the same day."

He puts the coat back on, wet. "So that's all decided, then," he says. "Nobody asked us. They never do."${b57If('tobet', `\n\nTobet listens to all of it. "Somebody will have written it down," he says. "Somebody always does."`)}`,
      ch:[{t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_ennic_eve:()=>({sp:B5_FINADD.name, scene:'b5_c7_finale', fx:()=>{ S.f.b5_c7_ennicEve = 1; }, again:()=>`Finadd Ennic on the bottom step, with his book.`, txt:
`Finadd Ennic has his book open on his knees and a dry pen, and he has written nothing.

"The patrol will come down the street," he says. "They are collecting swords. In the morning I expect they will collect soldiers. The army is the Emperor's, the garrison sergeant says. Everybody's sworn, or will." He turns a page. "I have orders for none of it, Sergeant."

He looks up at you, and for once he does not wait. "I will sign whatever you put in front of me," he says. "I always have. Tonight I would like you to know that I know that." He looks at the dry page. "There are three things I can write. *Taken back into the army.* *Discharged.* Or the dead roll, which is my book, and nobody reads it but the clerks." He closes it on the pen. "Whatever you put in front of me."`,
      ch:[{t:'The patrol. The roads.', req:()=>!b57Key(), onward:true, go:'b5_c7_roads'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_clerk_eve:()=>({sp:'The company clerk', scene:'b5_c7_finale', html:debtHTML('The Sixth Company · the fall'), fx:()=>{ S.f.b5_c7_clerkEve = 1; }, again:()=>`The clerk with the case on his knees, dry.`, txt:
`The company clerk has the oilskin case on his knees, and it is dry, and so, somehow, is he, mostly. He went into the canal holding it over his head and came out the same way.

"Every road out is in here," he says, and pats it. "Whatever the Finadd writes, Sergeant, I write the other half: what each line becomes." He opens the book to the Sixth's page. "If the squad is taken back, every line stands, under the Emperor's seal. If the squad takes its discharge, I will put every dock in hand on the smallest lines first, so the most walk out free, and the army releases whoever is past half: it bought the debts cheap and has had its money back. And if the Finadd writes the dead roll," he says, and stops, and then says it, "the lines go to the heirs. That is the army's rule. I did not make it."`,
      ch:[{t:'The pay desk.', go:'b5_c7_pay'},
          {t:'Not now.', go:()=>startExplore()}]}),

    /* ---- the canal children's holed dock: the trick (✦ Guile 16) and the dock ---- */
    b5_c7_children:()=>({sp:'Canal children', scene:'b5_c7_finale', again:()=>`The canal children on the Low Walk's edge, with their docks.`, txt:
`Three children of the district are sitting on the Low Walk's edge with their feet over the water, the first people out of doors in the street since the dark went by, and one of them is holding a dock on a cord: a holed one, a copper dock with a hole bored through it.

You know what it is. You had one. Every child in the Drownings had one. You drop one into the Quillas for the drowned, and keep its twin on a cord round your neck, and the Errant remembers who keeps one. That is what the children say. That is what you said.

The child with the cord drops a dock into the canal. It goes under without a sound. The three of them look up at the soldiers, wet to the bone, and the oldest says, "Did you go in? We saw you go in." She considers you. "You don't know how to do it properly, I expect. Grown-ups don't."${b57If('pessa', `\n\nPessa sits down on the edge next to them with her boathook across her knees. "I know how," she says.`)}`,
      ch:[{t:'"Show us properly." (the Holed Dock)', check:['guile', 16], trick:'b5_c7_dock', req:()=>!S.f.b5_c7_dockTried, fx:()=>{ S.f.b5_c7_dockTried = 1; },
            edges:id=>[id === 'sgt' && ['canal-born: you had one, once, on a cord', 2], id === 'pessa' && ['she grew up on the canals, and still talks back like it', 2], id === 'brune' && ['the Shake give the sea its share too', 1], id === 'tobet' && ['he laughs at the right moment, and means it', 1], id === 'perrit' && ['she asks what it is for, which is not how it is done', -1]],
            near:{t:()=>{ const w = b57Who(); return `Yes, but the children make ${b57Nm(w)} drop a dock of ${b57Pos(w)} own in first, to show willing, and keep the twin for themselves: a dock gone.`; }, fx:()=>{ if ((S.silver || 0) > 0) { S.silver -= 1; updSilver(); } }},
            go:'b5_c7_dock_ok', fail:'b5_c7_dock_no'},
          {t:'Not now.', go:()=>startExplore()}]}),
    b5_c7_dock_ok:()=>({sp:'Canal children', scene:'b5_c7_finale', fx:()=>{ S.f.b5_c7_dockOk = 1; if (!S.f.b5_c7_dockGot) { S.f.b5_c7_dockGot = 1; gain('b5_c7_dock'); } }, txt:
`The oldest shows ${by({sgt:'you', _:'{who}'})} properly. You hold the dock on its edge on your thumbnail, so, and spin it, so, and while it spins you think of whoever it is for, and you do not look at it when it comes down. Heads or the hole, it does not matter. It matters that you did not look. Then you drop it in.

${by({sgt:'You do it', _:'{who} does it'})}, and does not look, and drops it in, and the canal takes it under the arch.

The girl gives ${by({sgt:'you', _:'{who}'})} its twin, on a wet cord, without being asked. "You'll want that," she says. "For next time it goes wrong." She considers the squad again. "It'll go wrong. It always does." She goes back to her feet in the water.`,
      ch:[{t:'Back to the Low Walk.', go:()=>startExplore()}]}),
    b5_c7_dock_no:()=>({sp:'Canal children', scene:'b5_c7_finale', fx:()=>{ if (!S.f.b5_c7_dockGot) { S.f.b5_c7_dockGot = 1; gain('b5_c7_dock'); } }, txt:
`${by({sgt:'You look', _:'{who} looks'})}. It is impossible not to look. The children sigh, all three together, the way children sigh at grown-ups.

"You looked," the oldest says. "You always look." She gives you the twin anyway, on its wet cord. "Keep it. You'll learn. Or you won't." She goes back to her feet in the water.`,
      ch:[{t:'Back to the Low Walk.', go:()=>startExplore()}]}),

    /* ---- the roads: the key, at the Low Walk in the evening, with the patrol at the end of the street ---- */
    b5_c7_roads:()=>({sp:'The roads', scene:'b5_c7_finale', html:debtHTML('The Sixth Company · the fall'), again:()=>`The patrol at the end of the street, and the roads.`, txt: b57Key() ?
`It is written. ${b57Key() === 'emperor' ? 'The Sixth is the Emperor\'s.' : b57Key() === 'paid' ? 'The Sixth is discharged.' : 'The Sixth is in the dead roll.'}` :
`The patrol has come halfway down the street. One of them has looked toward the footbridge, and seen the soldiers on the Low Walk, and said something to the others, and they are coming on, not hurrying, with the handcart of swords behind them.

Finadd Ennic stands up with his book open and his pen in his hand. The clerk opens the case. Everybody is looking at you, the way they have looked at you since the barracks yard in the summer, because you are the sergeant, and the sergeant is who decides.

There are three roads, and every one of them goes through the paybook.

*Lay down arms to the patrol in the street, and be taken back into the army, which is the Emperor's now.* The lines stand, in the same books, under new seals.

*Lay down arms and take discharge.* Every dock in hand goes on the debts, smallest first, and whoever is past half is released. Everybody else walks out of uniform owing, in Letheras, where the canal is.

*Out of the ledger.* Along the canal and away before the patrol reaches the footbridge, and Finadd Ennic writes the squad into the dead roll of the fall, and the lines go to the heirs.${b57Say({tobet:`\n\n"I've been sold ${b57House() ? 'twice' : 'once'}," Tobet says, very quietly. "I'd like to see what dead is like."`, _:''})}${b57If('thegg', `\n\nThegg says, "Whatever you say, Sergeant," and means it, and stands sideways, out of the way of the decision.`)}${b57If('perrit', `\n\nPerrit has done all three sums. She does not say them. She says, "They are all correct," which is not the same thing.`)}${b57If('ammet', `\n\nAmmet has her bag on her back. "There are sick in Letheras whichever way it goes," she says.`)}${b57If('ruuk', `\n\nRuuk is a step ahead already, as ever, at the canal's edge. "There's a road along the water," he says. "There's always a road. I'm only saying."`)}${b57If('brune', `\n\nBrune looks at the canal going under the arch. "The Shore takes everything back," she says. "I would just like it to wait." She looks at you. "This is the waiting. Choose."`)}${b57If('pessa', `\n\nPessa has her boathook upright. "I'm not a soldier," she says. "I never was. Whatever you write, write that."`)}`,
      ch:[{t:'"We lay them down. Into the army, whoever it belongs to." (the Emperor\'s army)', req:()=>!b57Key(), fx:()=>{ S.f.b5_c7_key = 'emperor'; S.f.b5_c7_sealed = 1; b57L('perrit', 1); b57L('thegg', 1); b57L('tobet', -1); b57L('pessa', -2); b57L('brune', -1); }, go:'b5_c7_emperor'},
          {t:'"We lay them down and take our discharge. Pay what we can." (paid out)', req:()=>!b57Key(), fx:()=>{ S.f.b5_c7_key = 'paid'; b57PaidOut(); b57L('pessa', 1); b57L('ruuk', 1); b57L('brune', 1); b57L('perrit', -1); }, go:'b5_c7_paid'},
          {t:'"Write us down, Finadd. The dead roll." (out of the ledger)', req:()=>!b57Key(), fx:()=>{ S.f.b5_c7_key = 'ledger'; b57Listed(); b57L('tobet', 2); b57L('pessa', 1); b57L('thegg', -1); b57L('perrit', -1); b57L('ruuk', -1); b57L('brune', -1); }, go:'b5_c7_ledger'},
          {t:'"Not yet."', req:()=>!b57Key(), go:()=>startExplore()},
          {t:'The last of it.', req:()=>!!b57Key(), onward:true, go:'b5_c7_last'},
          {t:'Not now.', req:()=>!!b57Key(), go:()=>startExplore()}]}),
    b5_c7_emperor:()=>({sp:'The Emperor\'s army', scene:'b5_c7_finale', html:debtHTML('The Sixth Company · under new seals'), txt:
`The Sixth lays its swords and spears and bows down on the Low Walk in a row, and stands behind them, and waits for the patrol. ${b57Say({tobet:'Tobet lays his bow down last, and straightens it so it lies true with the others.', _:''})}

The Edur come down the street and stop at the footbridge and look at the row of weapons, and at the soldiers behind it, wet to the bone, with the white fingertips on their shields' bosses. One of them speaks Letherii, badly. He asks whose soldiers these are. Finadd Ennic says the Sixth Company of the Whitefinder Battalion, and the Edur says: the Emperor's, then. He says it as if he is not sure he likes it either.

The weapons go on the handcart. The soldiers do not. In the morning, the Edur says, they will be counted.

Finadd Ennic swears with the rest, in the street, because the garrison sergeant says everybody is swearing, and writes it in his book afterwards: *The Sixth Company, taken into the army of the Emperor.* The clerk writes nothing at all, because nothing in the paybook has changed. Every line stands, in the same book. Only the seal on the front will be new.${b57If('pessa', `\n\nPessa watches her boathook go onto the handcart. "That's mine," she says, to the Edur. "Not the army's. Mine." The Edur looks at it, and at her, and gives it back. She does not thank him.`)}`,
      ch:[{t:'Back to the brazier.', go:'b5_c7_fire'},
          {t:'The last of it.', onward:true, go:'b5_c7_last'}]}),
    b5_c7_paid:()=>{ const rel = b57Rel();
      return {sp:'Paid out', scene:'b5_c7_finale', html:debtHTML('The Sixth Company · at discharge'), txt:
`The Sixth lays its weapons down on the Low Walk, and Finadd Ennic writes *Discharged* against every name, in his neat hand, and signs each one, which takes a long time, and the clerk does the other half.

He puts every dock the squad has on the lines, smallest first, out loud, so the squad can hear the arithmetic: ${b5Coin(S.f.b5_c7_spent || 0)}, down to the last dock. Then he goes through the book again, line by line, and wherever a line is past half, he writes the army's release across it, and blots it. "The army bought these cheap," he says, to nobody in particular. "It has had its money back. That is what the release is for."

${rel.length ? `${b57And(rel.map(id => id === 'sgt' ? 'You' : NAME(id)))} ${rel.length > 1 || rel[0] === 'sgt' ? 'walk' : 'walks'} out of the army owing nothing.` : 'Nobody walks out owing nothing. The docks did not go far enough.'} ${['sgt', ...b57Here()].filter(id => !rel.includes(id)).length ? `${b57Cap(b57And(['sgt', ...b57Here()].filter(id => !rel.includes(id)).map(id => id === 'sgt' ? 'you' : NAME(id))))} ${['sgt', ...b57Here()].filter(id => !rel.includes(id)).length > 1 ? 'walk' : 'walks'} out of uniform still owing, in Letheras, to ${b57Holder()}, with the canal going by.` : ''}${b57If('tobet', rel.includes('tobet') ? `\n\nTobet looks at his line with the release across it, and keeps looking. "Nine hundred docks of plough," he says, "and nobody ever owned it but the debt." He folds his hands over the tally-stick, and then he breaks it.` : `\n\nTobet looks at his line. "Out of uniform," he says, flat. "Still owing. In Letheras." He looks at the canal. "I know how that one ends. I laughed at the jokes."`)}`,
        ch:[{t:'Back to the brazier.', go:'b5_c7_fire'},
            {t:'The last of it.', onward:true, go:'b5_c7_last'}]}; },
    b5_c7_ledger:()=>({sp:'Out of the ledger', scene:'b5_c7_finale', fx:()=>{ if (!S.f.b5_c7_pageGot) { S.f.b5_c7_pageGot = 1; gain('b5_c7_ledgerpage'); } }, txt:
`Finadd Ennic opens his book to the back, where the dead roll is, and writes the fall of Letheras at the top of a clean page, and the date, and then, one under another, in his neat hand, the squad: ${b57And(['sgt', ...b57Here()].map(id => id === 'sgt' ? `${S.name}, sergeant` : NAME(id)))}. Against each, the same words. *Fell at the footbridge over the Quillas, the Low Walk.*

The clerk watches him write. When he has finished, the clerk blots it. Then he opens the paybook, and takes out the Sixth's page, and tears it out along the fold, neatly, and holds it out to you without a word. Every line on it has a line through it.

"Listed dead," the clerk says, at last, "the debts pass to the heirs. That is the army's rule." He shuts the case. "I did not make it. I have only ever written it down."

Ennic looks at the patrol, halfway down the street. "The canal, Sergeant," he says. "West, along the Low Walk, and under the next bridge, and the next. Do not come back for anything." He does not offer his hand. Then he does.${b57If('tobet', `\n\nTobet reads his name in the dead roll over Ennic's shoulder. "Dead," he says. "The one thing the army can't buy back." He laughs, flat, and for once he means it.`)}${b57If('thegg', `\n\nThegg looks at the page. "The tavern will write it to my mother's son," he says. "Who is dead. To a dead woman's dead son." He considers it. "That can't be collected." He does not sound pleased. He sounds tired.`)}`,
      ch:[{t:'Back to the brazier.', go:'b5_c7_fire'},
          {t:'The last of it.', onward:true, go:'b5_c7_last'}]}),

    /* the end of the chapter, and of Book Five */
    b5_c7_last:()=> !b57Key() ? ({sp:'The Low Walk', scene:'b5_c7_finale', txt:
`The road is not chosen yet. The patrol, and Finadd Ennic.`,
      ch:[{t:'Not yet.', go:()=>startExplore()}]}) : ({sp:'The last of it', scene:'b5_c7_finale', txt:
`${b57Key() === 'ledger' ? `The squad goes west along the Low Walk in the dusk, quietly, under the next bridge and the next, with the canal on its left hand, and behind it the patrol reaches the footbridge and finds a row of nothing on the Low Walk, and a Finadd with a book, and a clerk with a case. In the Finadd's book, the squad is dead. It is the neatest thing he has ever written.` : b57Key() === 'paid' ? `The squad walks up off the Low Walk in the dusk out of uniform, in its shirts, with its discharge in the clerk's hand and its lines in the clerk's book, and the patrol lets it go by, because it is carrying nothing worth stacking on a handcart.` : `The squad stands on the Low Walk in the dusk without its swords, behind the clerk and the Finadd, and the patrol goes on up the street with the handcart, and in the morning there will be a count.`}

Behind it, the Quillas Canal goes under the footbridge as it always has, green and slow, toward the river and the sea. The starlings settle on the dark tower. The city is the Emperor's, and everybody in it says the Seventh Closure has come.

You touch the white fingertip on your shield's boss, for the Errant, from habit.`,
      ch:[{t:'Go.', onward:true, go:()=>chapterEnd(7, b57Key())},
          {t:'Not yet.', go:()=>startExplore()}]}),
  },
};

/* ============ the end of Book Five: the road out of Letheras, a page per squadmate and recruit, the fallen, the sergeant, the coda
   (37: showFinale). Every page says what that soldier's debt became and one line of the book's road. ============ */
const B57FIN = {};
B57FIN.KEYS = ['emperor', 'paid', 'ledger'];
B57FIN.key = k => B57FIN.KEYS.includes(k) ? k : B57FIN.KEYS.includes(S.f.b5_c7_key) ? S.f.b5_c7_key : 'emperor';
B57FIN.join = ps => ps.filter(p => p && String(p).trim()).join('\n\n');
B57FIN.loy = (id, warm, cold, mid) => { const l = (S.loy && S.loy[id]) || 0; return l >= 2 ? warm : l <= -2 ? cold : mid; };
/* what a soldier's debt became, by the road (the numbers, the holder, and on ledger the heirs) */
B57FIN.debt = (id, key) => { const sgt = id === 'sgt', nm = sgt ? 'Your' : NAME(id) + '\'s', d = b5Debt(id), d0 = b5DebtStart(id), st = b5Standing(id), hold = b57Holder();
  const burned = S.f.b5_c7_burned ? ` A quarter of it went up in the house's strongroom the night before the fall.` : '';
  if (key === 'ledger') { const L = (S.f.b5_c7_listed || {})[id];
    return L > 0 ? `${nm} line in the paybook, ${b5Coin(L)}, went to ${B57_HEIRS[id] || 'the heirs'} with the dead roll, as the army's rule says.${burned}` : `${nm} line was closed before the dead roll was written: nothing went to the heirs.`; }
  if (key === 'paid') return b57Rel().includes(id) ? `${nm} line closed at discharge: paid down, and the army's release across the rest. ${sgt ? 'You owe' : `${b5He(id) === 'she' ? 'She owes' : 'He owes'}`} nothing to anybody, which in Lether is very nearly a title.${burned}` : `${sgt ? 'You walked' : `${NAME(id)} walked`} out of uniform still owing ${b5Coin(d)} to ${hold}, of the ${b5Coin(d0)} ${sgt ? 'you' : b5He(id)} started the book with: ${B5_STANDW[st]}. In Letheras, where the canal is.${burned}`;
  return `${nm} line stands as it was, ${b5Coin(d)} of the ${b5Coin(d0)} ${sgt ? 'you' : b5He(id)} started the book with (${B5_STANDW[st]}), in the same book under the Emperor's seal, held by ${hold}.${burned}`; };

B57FIN.ending = key => {
  const T = {emperor:['The Emperor\'s army', 'b5_c7_finale'], paid:['Paid out', 'b5_c7_finale'], ledger:['Out of the ledger', 'b5_c7_finale']}[key] || ['The Emperor\'s army', 'b5_c7_finale'];
  if (typeof S === 'undefined' || !S || !S.f) return {title:T[0], scene:T[1], paras:[]};
  try {
    const mates = b57Here().map(NAME), fell = b57Fallen().map(NAME);
    let P;
    if (key === 'emperor') P = [
`In the morning the Edur count the soldiers of Letheras, street by street, and write them down, which surprises everybody: the Edur, it turns out, can be taught to keep books. The Sixth Company of the Whitefinder Battalion is counted on the Low Walk, and marched to a barracks it knows, and given back its swords a week later by a Letherii officer with a new band on his arm. The army is the Emperor's now. It is the same army.`,
`${mates.length ? `${b57And(mates)} ${mates.length > 1 ? 'are' : 'is'} counted with you.` : 'You are counted alone, and the officer with the band puts two recruits beside you so that it looks like a squad.'} The paybooks come back from the counting-room with the Emperor's seal on the front, and inside them every line is where it was. The clerk checks. Twice.`,
`There is talk in the barracks of the Edur sending ships across the sea, a long way off, for reasons the barracks does not know. The Sixth's road goes on, in the army, under the new seals: Book Seven, when it is written, will offer this save.`];
    else if (key === 'paid') P = [
`The Sixth Company of the Whitefinder Battalion is discharged on the Low Walk on the evening of the fall, and walks up off it out of uniform in the dusk, and the Edur patrol lets it by. In the morning the city is the Emperor's, and the Sixth is not anybody's.`,
`${b57Rel().length ? `${b57And(b57Rel().map(id => id === 'sgt' ? 'You' : NAME(id)))} walked out owing nothing.` : 'Nobody walked out owing nothing.'} ${['sgt', ...b57Here()].filter(id => !b57Rel().includes(id)).length ? 'The rest walked out owing, in Letheras, where the debt goes into the canal with whoever owes it, and the court sits again within the month.' : ''} The squad spent ${b5Coin(S.f.b5_c7_spent || 0)} at discharge, smallest first, which was the arithmetic.`,
`There is no road onward from here. The Sixth's paybook is closed, and the army that kept it belongs to somebody else.`];
    else P = [
`In the dead roll of the fall of Letheras, in Finadd Ravel Ennic's neat hand, the squad fell at the footbridge over the Quillas, the Low Walk, every one of them. The clerk blotted it. The army's rule sent every line to the heirs.`,
`The squad went west along the canal in the dusk, under the bridges, and out of Letheras by ways a canal-born sergeant knows and nobody writes down. ${mates.length ? `${b57And(mates)} went with you.` : 'You went alone.'} Nobody is looking for soldiers who are dead.`,
`There is no road onward from here. That was the point.`];
    if (fell.length) P.push(`${b57And(fell)} ${fell.length > 1 ? 'are' : 'is'} in the barrow at Brans Keep.`);
    return {title:T[0], scene:T[1], paras:P};
  } catch(e) { return {title:T[0], scene:T[1], paras:[]}; }
};

/* a page for a squadmate who walks to the end */
B57FIN.fate = (id, key) => {
  key = B57FIN.key(key); const R = key, D = B57FIN.debt(id, key);
  const add = (title, ps) => ({title, txt:B57FIN.join(ps)});
  if (id === 'sgt') return B57FIN.sgt(key);
  if (id === 'tobet') return add('Everything owes him money', [
    R === 'emperor' ? `Tobet is counted with the Sixth on the Low Walk, and marched back to barracks, and given back a bow by an officer with a new band, and strings it, and counts his arrows, then his debts, then his arrows. "Sold ${b57House() ? 'three times' : 'twice'} now," he says, flat. "It's a career."` :
    R === 'paid' ? (b57Rel().includes('tobet') ? `Tobet walks out of the army on the evening of the fall with nothing owed, which nobody in his family has done in three generations, and goes looking for the plough. He finds the farm. He does not find the plough. He laughs, and means it.` : `Tobet walks out of uniform in Letheras still owing for a plough he has never seen, and finds work with a bookmaker on the Low Walk, chalking the odds, because he can count. He does not laugh at the Drownings jokes any more. He chalks them.`) :
    `Tobet walks out of the ledger along the canal, dead, and for the first time in his life nobody owns a line of him. The debt goes back to the farm. He knows it. He goes the other way.`,
    D,
    `${b57HighFort('tobet')} ${b57Channel('tobet')} Under the footbridge he held on to the ledge with one hand and his bow with the other.`,
    B57FIN.loy('tobet', `"Sergeant," he says to you, softly, half a step behind, the way he always has. It is the most he says to anybody.`, `He calls you Sergeant still, and nothing else.`, `"From back here," he tells you, "you look like you know where you're going." It is meant kindly.`)]);
  if (id === 'thegg') return add('Behind me', [
    R === 'emperor' ? `Thegg is counted with the Sixth and marched to barracks, and stands in the door of the barracks sideways, out of politeness, while the Edur officer counts the room. In the Emperor's army he is the shield, as he was in the King's. "Behind me," he says, at drill. The recruits get behind him.` :
    R === 'paid' ? `Thegg walks out of uniform and goes to the pit town outside the white walls, and into his mother's tavern, and sits down in it a whole night and does not carry anything. ${b57Rel().includes('thegg') ? 'He writes *Paid* across her tab in his own hand, slowly, and the tavern-keeper lets him.' : 'The tab is still there. He looks at it a long time.'}` :
    `Thegg walks out of the ledger along the canal, and his mother's tab goes to a dead woman's dead son, and the clerk was right: nobody can collect it. He talks to her people's dead at night, low, in her tongue, and tells them he is one of them now, on paper.`,
    D,
    b57Swam() ? `In the summer he swam the Quillas weighted with three hundred docks of the court's coin, and came out the far side. Under the footbridge, at the fall, he used all four lungs. ${b57HighFort('thegg')}` : `In the summer the squad paid his fine at the court so he would not swim the Quillas. Under the footbridge, at the fall, he swam it anyway, carrying two. ${b57HighFort('thegg')}`,
    B57FIN.loy('thegg', `"Behind me, Sergeant," he says, and means you too, now. He did not used to.`, `He stands where you put him, sideways, and does not offer anything more.`, `He turns sideways for doors, and for you.`)]);
  if (id === 'perrit') return add('The sums', [
    R === 'emperor' ? `Perrit is counted with the Sixth, and the cadre school is the Emperor's too now, and nobody can tell her yet what the Emperor wants with a cadre mage of the Holds. She pays the school on the first of the month anyway, with a face like a closed door. The books have to be kept straight by someone.` :
    R === 'paid' ? `Perrit walks out of uniform to her father's house in the Pursers' District, and copies ledgers for him at three docks a week, and is good at it, and on the side, in the evenings, she teaches two clerks' daughters their sums. And the Holds. Not linking.` :
    `Perrit walks out of the ledger, and her line goes to her father, a clerk in the Pursers' District, who will pay it, a few docks at a time, for the rest of his life. She knows it. She sends him what she can, unsigned, from wherever she is.`,
    D,
    `${b57HighFort('perrit')} Unlinked, at High Fort and at Brans Keep, she felt the links go and was not one of them. Under the footbridge she went into the water face first, with her back to nothing.`,
    B57FIN.loy('perrit', `"Your arithmetic is not bad, Sergeant," she tells you once. From Perrit it is a medal.`, `She corrects your sums out loud, still, and nothing else.`, `"Rounded in our favour," she says, of the whole book. "For once."`)]);
  if (id === 'ammet') return add('Hold still', [
    R === 'emperor' ? `Ammet is counted with the Sixth and goes back to the barracks infirmary with her needles boiled twice, and the Edur officer who counts the infirmary asks what she does, and she tells him. "Hold still," she says to him, later, about a cut on his hand. He does.` :
    R === 'paid' ? `Ammet walks out of uniform with her tools${b57Rel().includes('ammet') ? ', paid for, at last, and the cutler\'s note burned in the cutler\'s own grate, slowly' : ', still on the cutler\'s note'}, and takes a room off the Low Walk with a lamp in the window, and the district's sick find her in a week. Cities are where the sick go to be counted. She does the counting.` :
    `Ammet walks out of the ledger with her tools in her bag, and the cutler's note dies with her name in the dead roll. The cutler will want the tools back. He can come and find them.`,
    D,
    S.f.b5_c3_key === 'warn' ? `At Kraig's Landing she sent a runner up the bank to the Nerek villages, too late, and on the road south a Nerek family knew the Sixth's name. She has never said whether that was enough. ${b57HighFort('ammet')}` : `At Kraig's Landing she watched the green fire over the villages with the rest, and said nothing then, and has said very little since about the Nerek. ${b57HighFort('ammet')}`,
    B57FIN.loy('ammet', `"Hold still," she tells you, at the end of it, and looks you over, and says, "You'll keep." From Ammet it is a blessing.`, `She stitches you as she stitches everybody, quickly, and moves on.`, `"If a god wanted the work," she tells you, "it could come and hold the lamp." She says you held it, once.`)]);
  if (id === 'ruuk') return add('The map lies', [
    R === 'emperor' ? `Ruuk is counted with the Sixth, a Faraed boy in the Emperor's army, and the Edur officer asks what he is for, and he says roads. They give him roads. He is always a step ahead on them.` :
    R === 'paid' ? `Ruuk walks out of uniform and out of Letheras by the north road, a step ahead, toward the Faraed hills and his grandmother, ${b57Rel().includes('ruuk') ? 'with forty docks of his clan\'s grain paid and released' : 'still owing his clan\'s grain'}. She will not believe a word of it. He will tell her anyway.` :
    `Ruuk walks out of the ledger along the canal and out of the city by a road nobody else could find, and his clan in the Faraed hills carries the grain. He knows. He will go and carry it with them.`,
    D,
    `At Kraig's Landing he joined the Sixth to find it roads. ${b57HighFort('ruuk')} In Letheras he learned every street in a night, and the city fell over the next day.`,
    B57FIN.loy('ruuk', `"Not that way," he tells you, at every turning. "The map lies. Come." You have stopped asking which map.`, `He goes ahead, and does not look back to see if you follow.`, `He names birds for you, now and then. Starlings, mostly.`)]);
  if (id === 'brune') return add('The Shore', [
    R === 'emperor' ? `Brune is counted with the Sixth, and the Edur ask what she is, and she says of the Shake, and they write it down. In the Emperor's army she stands on the barracks steps every evening with her face toward the sea, which is not in that direction, and nobody corrects her.` :
    R === 'paid' ? `Brune walks out of uniform and down the river to the coast, ${b57Rel().includes('brune') ? 'owing nothing, to find a small boat she will not take far' : 'still owing the harbour master for a boat he took'}. The Shore takes everything back. She would just like it to wait, a little longer.` :
    `Brune walks out of the ledger, and her village on the coast carries the harbour master's boat. She goes home to help them carry it. She does not tell them she is dead. She will.`,
    D,
    S.f.b5_c2_key === 'dead' ? `At Trate she carried the drowned off the wrecks with her own people and laid them on the quay. ${b57HighFort('brune')}` : `At Trate the squad took the harbour master's salvage, and she said the Shore would want it back either way. ${b57HighFort('brune')}`,
    B57FIN.loy('brune', `"You can swim," she tells you, at the end of it, as if it settled something. It does.`, `She keeps her feet in the water, and her own counsel.`, `She sits by you at fires, saying nothing, with her feet in whatever water there is.`)]);
  if (id === 'pessa') return add('A woman with a boathook', [
    R === 'emperor' ? `Pessa is counted with the Sixth, and tells the Edur officer she is not a soldier, and he writes down that she is. She keeps the boathook. She reads her line out loud every pay-day, as she always has, and now she reads the seal too.` :
    R === 'paid' ? `Pessa walks out of uniform and down to the Quillas, and finds out who is poling her barge, and argues with them, and wins. ${b57Rel().includes('pessa') ? 'Her line is closed. She reads it out loud anyway, to the barge.' : 'Her line is not closed. She reads it out loud, to the barge, every pay-day.'}` :
    `Pessa walks out of the ledger along her own canal, and the press-gang's chit goes to nobody: her name is spelled wrong in their book, and her husband is gone. It is the first thing the army ever got wrong in her favour.`,
    D,
    `On the road south the press-gang wrote her kit against her name. ${b57Channel('pessa')} Under the footbridge she found the ledge first time, with the boathook.`,
    B57FIN.loy('pessa', `"You're all right," she tells you, "for a soldier." From Pessa there is nothing warmer.`, `She argues with you as she argues with everybody. More, if anything.`, `"I'm not a soldier," she tells you, still. "But I'd stand with you." She seems surprised to hear herself.`)]);
  return {title:TPL[id] ? TPL[id].role : '', txt:B57FIN.join([TPL[id] ? TPL[id].quest : '', D])};
};

/* a page for someone not walking at the end: the fallen at Brans Keep, a recruit waiting, a recruit sent away */
B57FIN.gone = (id, key) => {
  key = B57FIN.key(key);
  if (S.dead && S.dead[id]) { const owed = ((S.f.b5_heirs || {})[id]) || 0;
    return {title:'In the barrow', txt:B57FIN.join([
      `${NAME(id)} fell at Brans Keep, ${S.dead[id].ch === 6 && b57Stood() ? 'at the crossing on the dry channel, holding it while the battalion went back over' : 'on the field'}. Whoever fell there stayed down.`,
      `${b5He(id) === 'she' ? 'She is' : 'He is'} in the barrow the Emperor ordered on the field below the keep, with the Edur dead and the rest of the army's together, in one long mound, raised in a night. The squad saw the torches. It never went down to the mound.`,
      owed > 0 ? `${NAME(id)}'s debt, ${b5Coin(owed)}, passed to ${B57_HEIRS[id] || 'the heirs'}${S.f.b5_c6_heirsWritten === 'house' ? ', with the house\'s interest on top, in the factor\'s clean hand' : ', in the clerk\'s hand, without interest, because the army does not charge interest on the dead'}. It was never the squad's to pay.` : `${NAME(id)} owed nothing at the end, and the clerk wrote that too.`,
      `At the brazier on the footbridge, the last night, the squad said the name, once.`])}; }
  if (!B5_RECRUITS.includes(id)) return null;
  const done = S.f[B5_DONE[id]], waits = (S.camp || []).includes(id) || done === 2;
  const debtNow = `${NAME(id)}'s line in the Sixth's book: ${b5Coin(b5Debt(id))} (${B5_STANDW[b5Standing(id)]}). ${key === 'ledger' ? 'The dead roll did not list ' + b5Him(id) + ': ' + b5He(id) + ' was not on the Low Walk.' : key === 'paid' ? 'The discharge did not reach ' + b5Him(id) + ': ' + b5He(id) + ' was not on the Low Walk.' : 'It stands under the new seal with the rest.'}`;
  if (waits) return {label:'Waiting', title:{ruuk:'With the scouts', brune:'With the Shake', pessa:'With the column'}[id], txt:B57FIN.join([
    {ruuk:`Ruuk waited with the company's followers through the fall, a Faraed boy in a city that was not roads, and in the evening he came down to the Low Walk to find the Sixth, a step ahead of everybody, and found it.`,
     brune:`Brune waited with the company's followers through the fall, and when the dark went down the canal she put her feet in the water anyway, because it was water.`,
     pessa:`Pessa waited with the refugees and the company's followers through the fall, in her own city, two canals from her own barge, with her boathook upright and her grievance intact.`}[id],
    debtNow])};
  if (done === 0) return {label:'Sent away', title:{ruuk:'The Faraed hills', brune:'The strand', pessa:'The road south'}[id], txt:B57FIN.join([
    {ruuk:`At Kraig's Landing the Sixth could not take Ruuk on, and he went back to the Faraed scouts, and was a step ahead of somebody else's company all the way to wherever it went. His clan's grain is still owed, to the same people.`,
     brune:`At Trate the Sixth could not take Brune on, and she went back to the Shake boats on the strand, and the boats went down the coast with the drowned. The harbour master's boat is still owed.`,
     pessa:`On the road south the Sixth did not take Pessa, and the press-gang's chit stayed in the press-gang's book, spelled wrong. Wherever she is, she is arguing with somebody.`}[id]])};
  return {label:'Another road', title:TPL[id].name, txt:`The Sixth never took ${NAME(id)} on. ${b5He(id) === 'she' ? 'Her' : 'His'} road went another way, and the squad does not know where.`};
};

/* the sergeant's page */
B57FIN.sgt = key => {
  const f = S.f, D = B57FIN.debt('sgt', key);
  return {title:'The Sixth', txt:B57FIN.join([
    key === 'emperor' ? `You are a sergeant in the Emperor's army, which is the King's army with a new seal on the front of its books. You run what is left of the Sixth for a Finadd who signs. When the recruits ask what the fall of Letheras was like you tell them about a footbridge, and a ledge under the water, and they do not believe you about the ledge.` :
    key === 'paid' ? `You walked out of the army on the evening of the fall in your shirt, two streets from where you were born, and went and knocked on your mother's cousin's door at last. She opened it. The family's tally is still cut on the lintel, a notch for every year somebody paid.` :
    `You are in the dead roll of the fall of Letheras, in Finadd Ennic's neat hand. You went west along the canal in the dusk, under the bridges, by ways a canal-born child knows and nobody writes down, and out. Somewhere in Letheras a cousin two streets back from the Quillas has your line now. You think about that more than you would like.`,
    D,
    `${b57HighFort('sgt')} ${b57Channel('sgt')} On the last day you took the squad into the Quillas under the footbridge where you learned to swim, and everybody came up.`,
    trickBy('b5_c7_dock') === 'sgt' || b57Has('b5_c7_dock') ? `There is a holed dock on a wet cord round your neck, the twin of one that went into the canal for the drowned. You do not look at it when you spin it.` : '',
    f.b5_c6_fingerOk ? 'You still touch the white fingertip on your boss before anything. The battalion never learned why the finger. You have decided the drill-sergeant was right, and that it does not matter.' : 'You still touch the white fingertip on your boss before anything, for the Errant. The battalion never learned why the finger.'])};
};

/* the coda: the Edur in the city, the belief, the canal, the paybooks; the count */
B57FIN.coda = key => {
  const fell = b57Fallen();
  return [
`Letheras fell on the day the Letherii call the Seventh Closure. The King had been crowned Emperor by his court two nights before, and everybody in the city says the prophecy came true, and that the Emperor is the First Emperor reborn, in his way. The Edur are in the streets. Their Emperor stopped the killing with a word, and decreed a day of suffering, and then it was over, and the city went back to counting.`,
`The army of Lether was destroyed at Brans Keep, and what was left of it came home to the walls and was sworn, or discharged, or written down. The Sixth Company of the Whitefinder Battalion held a footbridge over the Quillas Canal by the Low Walk, and went into the water, and came up. ${fell.length ? `${b57And(fell.map(NAME))} did not see Letheras again.` : 'Every one of the squad who went over the dry channel came home to the canal.'} That is the Sixth's part. It is small. It is written down.`,
`Under the footbridge the canal goes by as it always has, green and slow, toward the river and the sea. In a case of good oilskin, somewhere, the Sixth's paybook says what every soldier owed, and to whom, and what became of it. In Lether that is the whole of a life, and the end of it.`,
debtHTML(key === 'ledger' ? 'The Sixth Company · the dead roll' : key === 'paid' ? 'The Sixth Company · at discharge' : 'The Sixth Company · under the Emperor\'s seal')];
};

B5CH7.finale = {
  ids:()=>['tobet', 'thegg', 'perrit', 'ammet', 'ruuk', 'brune', 'pessa'],
  labels:{epi:'Epilogue', squad:'The squad', fallen:'Fallen at Brans Keep', away:'Not on the Low Walk', sgtRole:'Sergeant · Sixth Company, the Whitefinder Battalion', road:'The squad\'s road', prologue:false,
    list:()=>['The roll', `${Object.keys((S && S.dead) || {}).length} names`], noDead:'None of the squad. Every one of them came home to the canal.', paper:false,
    endline:'The End of <em>Indebted</em>',
    credit:'The Malazan world was created by Steven Erikson and Ian C. Esslemont, and it and its canon characters belong to them. With thanks to Steven Erikson for Midnight Tides, for Lether, its debts and its canals, and to Ian C. Esslemont for the world they built together; the Sixth only walked beside it.'},
  endings:{ get emperor(){ return B57FIN.ending('emperor'); }, get paid(){ return B57FIN.ending('paid'); }, get ledger(){ return B57FIN.ending('ledger'); } },
  fate:(id, key)=>B57FIN.fate(id, key),
  gone:(id, key)=>B57FIN.gone(id, key),
  coda:(key)=>B57FIN.coda(key) };

/* the onward road: a finished Book Five save on the 'emperor' road is the one Book Seven may offer (no import is written yet) */
const b57Onward = s => !!(s && s.book === 'mt' && s.chapters && s.chapters[7] === 'emperor');
