/* ============ v13.57.0: armour for the regulars in Books Three, Four, Five and Eight (David, Nov 19, 2026, 5:33 PM PST: "approved"; series-polish-plan.md §0j) ============
   Those four books gave two or three pieces of armour for five or six soldiers. Twelve more, three a book: one early, one in the middle, a light piece in every book.
   Each is found at a scene every squad passes (one is bought, on the paybook, as drafted). A save already past the chapter is given the piece once.
   The pieces go into each chapter's own gear list, so everything that reads a chapter's kit (the bot, the lists) sees them. Pictures: src/989e_armour_art.js.
   Canon: Beklites, the Domin's regular foot, red- and gold-clad (MoI glossary; F, UK Trade p.306; W Pannion Domin). The City Watch of Darujhistan (W City Watch; F, GotM).
   Telaba, a Seven Cities robe (MoI, one source: supported). The Rhivi, the Khundryl, the Aren Guard and the Cold Clay Battalion are in their books' canon sheets already. */
const ARMOUR_NEW = [
  {book:'moi', ch:1, CH:() => typeof B3CH1 !== 'undefined' && B3CH1, id:'b3_c1_hostscale', nodes:['b3_c1_pell'], when:() => !!S.f.b3_c1_tunnelsDone,
    def:{name:'Host scale, re-issued', slot:'armour', role:'mail', who:null, ac:2,
      line:'A coat of the Host\'s scale off Pell\'s wagon, re-issued. The last owner\'s number has been painted out on the collar and a new one not yet painted in. Pell says that makes it nobody\'s, and so cheaper to lose.'},
    para:() => 'Pell reaches behind the crates and drops a coat of scale on the tailboard. "Re-issued," he says. "Against the two crates. Don\'t thank me. I\'ve written it down."'},
  {book:'moi', ch:2, CH:() => typeof B3CH2 !== 'undefined' && B3CH2, id:'b3_c2_rhivijerkin', nodes:['b3_c2_after_herd'],
    def:{name:'A Rhivi hide jerkin', slot:'armour', role:'light', who:null, ac:1, hp:2,
      line:'Bhederin hide, scraped thin and smoked, laced at the sides with sinew. The herders wear them against horn and thorn. It turns less than mail and weighs nothing, and it smells of the herd, which the herd finds reassuring.'},
    para:() => 'One of the herd-women lays a hide jerkin across your pack before she goes, and is gone among the children before you can turn round.'},
  {book:'moi', ch:5, CH:() => typeof B3CH5 !== 'undefined' && B3CH5, id:'b3_c5_lamellar', nodes:['b3_c5_after_ford'],
    def:{name:'A Beklite\'s lamellar', slot:'armour', role:'mail', who:null, ac:2, hp:2,
      line:'Lacquered plates laced in rows, red and gold under the river mud, off one of the Hundred Thousand at the ford. The lacing is good. Somebody did it to last longer than he did.'},
    para:() => 'On the gravel one of the Beklites lies face down in a coat of laced plates, red and gold under the mud. The coat is sound, and he has no more use for it. You take it.'},
  {book:'hoc', ch:2, CH:() => typeof B4CH2 !== 'undefined' && B4CH2, id:'b4_c2_arencoat', nodes:['b4_c2_robbers_after'],
    def:{name:'An Aren Guard\'s banded coat', slot:'armour', role:'mail', who:null, ac:2, hp:2,
      line:'Iron bands on oiled leather, the Aren Guard\'s pattern, with the city\'s mark on the shoulder-plate. It came out of a robber\'s sack on the Aren Way. Nobody asks whose it was. On that road there is no shortage of answers.'},
    para:() => 'The robbers\' sack is where they dropped it. Most of what is in it goes back into the ground. A banded coat with the Aren Guard\'s mark was never in the ground; it will do more good on a back.'},
  {book:'hoc', ch:3, CH:() => typeof B4CH3 !== 'undefined' && B4CH3, id:'b4_c3_khundrylvest', nodes:['b4_c3_gall'],
    def:{name:'A Khundryl horse-hide vest', slot:'armour', role:'light', who:null, ac:1, hp:2,
      line:'Horse-hide with the hair left on, cut short for riding, the seams sewn in black thread in a line of small tears. A Burned Tear left it on the Third\'s packs and walked on before anyone could thank him, which seems to have been the point.'},
    para:() => 'One of the two warriors behind him has left something on the Third\'s packs: a horse-hide vest, the hair still on it. When you look up he is already at the next fire.'},
  {book:'hoc', ch:5, CH:() => typeof B4CH5 !== 'undefined' && B4CH5, id:'b4_c5_telaba', nodes:['b4_c5_riders_after'],
    def:{name:'A quilted telaba', slot:'armour', role:'light', who:null, ac:1, hp:3,
      line:'A desert rider\'s telaba, quilted thick across the chest and shoulders and loose everywhere else, the colour of the sand it was worn in. It keeps the sun out and takes the edge off a blade. Its last owner rode at the picket stakes and did not ride back.'},
    para:() => 'One of them wore a telaba quilted thick across the chest. The sand has not had it yet. You take it before it does.'},
  {book:'mt', ch:1, CH:() => typeof B5CH1 !== 'undefined' && B5CH1, id:'b5_c1_brigandine', nodes:[],
    def:{name:'Battalion brigandine, on the paybook', slot:'armour', role:'mail', who:null, ac:2,
      line:'Small plates riveted under blue canvas, battalion issue, with the Whitefinders\' tally stamped inside the collar. The quartermaster did not ask for docks. He wrote a line in the paybook instead, and blew on the ink.'}},
  {book:'mt', ch:3, CH:() => typeof B5CH3 !== 'undefined' && B5CH3, id:'b5_c3_coldjack', nodes:['b5_c3_regiment'],
    def:{name:'A Cold Clay quilted jack', slot:'armour', role:'light', who:null, ac:1, hp:3,
      line:'Layered linen quilted in diamonds, in the Cold Clay Battalion\'s grey. Its owner was issued two and saw no reason to say so. It will stop a knife and slow an arrow, and it dries faster than anything else in the regiment.'},
    para:() => 'He nods at a quilted jack hung on the guy-rope. "Take that, if it fits one of yours. They issued me two. I never told them."'},
  {book:'mt', ch:4, CH:() => typeof B5CH4 !== 'undefined' && B5CH4, id:'b5_c4_wallplate', nodes:['b5_c4_wraiths_after'],
    def:{name:'High Fort wall-plate', slot:'armour', role:'heavy', who:null, ac:3,
      line:'A breast and back of thick plate made for standing on a rampart, not for marching under: High Fort\'s mark on the strap, and the strap unbuckled in a hurry. The man it was issued to took it off to run faster. It worked.'},
    para:() => 'Another has shed his wall-plate on the rampart\'s step to run the faster. It has High Fort\'s mark on the strap.'},
  {book:'tth', ch:1, CH:() => typeof B8CH1 !== 'undefined' && B8CH1, id:'b8_c1_duelcoat', nodes:['b8_c1_alley_after'],
    def:{name:'A Daru duelling coat', slot:'armour', role:'light', who:null, ac:2, hp:2,
      line:'Padded silk over horsehair, cut close, the kind the young bloods of Darujhistan wear to settle things at dawn. This one was hung on a chimney-pot by a man who meant to come back for it. The lining has more pockets than a coat needs.'},
    para:() => 'One of them hung his coat on a chimney-pot before he started, to keep it off the slates: a duellist\'s coat, padded silk. He did not come back past the chimney.'},
  {book:'tth', ch:3, CH:() => typeof B8CH3 !== 'undefined' && B8CH3, id:'b8_c3_harbourleathers', nodes:['b8_c3_thessaly_lamp'],
    def:{name:'Harbour-watch leathers', slot:'armour', role:'light', who:null, ac:2, hp:3,
      line:'Oiled leather, salt-stiff, with the old harbour watch\'s knot stamped on the breast, from when the city was Coral. It hung on a peg through the siege and the night that came after, and nobody came for it. Thessaly says somebody should wear it.'},
    para:() => '"And that," she says, not looking up, and points the pen at a peg by the door. Oiled leathers, salt-stiff, a knot stamped on the breast. "The harbour watch\'s, from when this was Coral. Nobody has come for them. Somebody should wear them."'},
  {book:'tth', ch:6, CH:() => typeof B8CH6 !== 'undefined' && B8CH6, id:'b8_c6_watchcuirass', nodes:['b8_c6_wall_after', 'b8_c6_street_after'],
    def:{name:'A City Watch cuirass', slot:'armour', role:'heavy', who:null, ac:3, hp:3,
      line:'A Watch cuirass, plain steel, with the hook for a globed lantern still on the belt. Its owner set it down and went somewhere a cuirass was no help. On this night that could be anywhere in the city.'},
    para:() => 'Close by there is a Watch cuirass set down neatly, lantern-hook and all, and nobody near it. You take it. The Watch can have it back when the Watch comes back.'}];
/* give a piece once, by its own flag */
function armourGive(r){ if (!S || !S.f || S.f[r.id]) return false; S.f[r.id] = 1; gain(r.id); return true; }
ARMOUR_NEW.forEach(r => { const CH = r.CH(); if (!CH) return; (CH.gear ??= {})[r.id] = r.def; if (typeof ITEM_ROLE !== 'undefined') ITEM_ROLE[r.id] = r.def.role;
  r.nodes.forEach(nd => { const f = CH.dlg && CH.dlg[nd]; if (!f) { console.warn('armour: no node', nd); return; }
    CH.dlg[nd] = function(){ const n = f.apply(this, arguments); if (!n || typeof n !== 'object') return n; const ok = !r.when || r.when();
      if (ok || (S && S.f && S.f[r.id + '_at'] === nd)) { const fx0 = n.fx; n.fx = () => { if (fx0) fx0(); if (armourGive(r)) S.f[r.id + '_at'] = nd; };
        if (r.when) n.fxAgain = true; /* Pell's coat waits on the saps: his own fx only sets a flag, so running it again is harmless */
        if (typeof n.txt === 'string' && (!S.f[r.id] || S.f[r.id + '_at'] === nd)) n.txt += '\n\n' + r.para(); }
      return n; };
    CH.dlg[nd].toString = () => String(f) + `\n/* 988: gain('${r.id}') */`; /* tools that read a node's source still see the original */ }); });
/* Book Five's is bought, and the price is a line in the paybook (the book's own "yes, but") */
if (typeof B5CH1 !== 'undefined' && B5CH1.dlg && B5CH1.dlg.b5_c1_qm) { const f = B5CH1.dlg.b5_c1_qm, r = ARMOUR_NEW.find(x => x.id === 'b5_c1_brigandine');
  B5CH1.dlg.b5_c1_qm = function(){ const n = f.apply(this, arguments);
    if (n && Array.isArray(n.ch)) n.ch.splice(Math.max(0, n.ch.length - 1), 0, {t:'A battalion brigandine. ("Write it on the paybook.")', tag:'6 docks of debt', ware:'b5_c1_brigandine', req:() => !S.f.b5_c1_brigandine && !(S.kit || []).includes('b5_c1_brigandine'),
      fx:() => { if (armourGive(r)) { b5Owe('sgt', 6, 'A battalion brigandine'); note('A brigandine, for a line in the paybook.', 'good'); } }, go:'b5_c1_qm'});
    return n; };
  B5CH1.dlg.b5_c1_qm.toString = () => String(f) + `\n/* 988: gain('b5_c1_brigandine') */`; }
/* a save already past the chapter is given the piece (not the brigandine: that one is bought) */
{ const _migrate = migrate; migrate = function(s){ const r = _migrate(s) || s; try { if (r && r.f && Array.isArray(r.kit)) ARMOUR_NEW.forEach(a => { if (a.nodes.length && (r.book || 'gotm') === a.book && (r.chapter || 0) > a.ch && !r.f[a.id]) { r.f[a.id] = 1; if (!r.kit.includes(a.id)) r.kit.push(a.id); } }); } catch (e) {} return r; }; }
