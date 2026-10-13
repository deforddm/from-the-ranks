#!/usr/bin/env python3
"""Write the two Book Two item boards, docs/art/ArmsDG.dc.html and docs/art/TrinketsDG.dc.html, from the drawings below.

The standard (v5.4): every item in the game has a picture. A new item gets a drawing here (or on its book's board) in the same
commit, under an aria-label that starts with the item's name; tools/art_build.py builds it into ART['item/<key>'], and the lint fails
any item in ITEMS without one. Book One's boards (Arms, Trinkets) are hand-made on the design canvas; Book Two's are generated here so
the drawings and the cards stay in one place.

Run:  python3 tools/art_dg_items.py && python3 tools/art_build.py && python3 build.py
"""
import os, html
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'docs', 'art')

# ---------------- the drawings: key -> (label, chapter, stats, who, caption, svg body) ----------------
# weapons and armour: viewBox 0 0 200 150 on the desert ground (url(#dwbg) / url(#dabg)); trinkets: 0 0 240 130 on url(#dtbg)
W = [
 ('b2_auxtulwar', "An auxiliary's tulwar", 1, '+1 attack, 1d8+3', 'Sergeant, Haddat, Ramin', 'Off the garrison racks, the blue cord on the grip gone white.',
  '<path d="M64 112 Q100 70 150 38 Q166 30 170 36 Q164 50 150 58 Q108 86 76 120 Z" fill="#c9ccd0"/><path d="M72 114 Q108 78 160 40" stroke="#f4f6f8" stroke-width="1.2" fill="none"/>'
  '<rect x="56" y="104" width="22" height="7" rx="2" fill="#c9a24a" transform="rotate(-40 67 108)"/><path d="M40 136 L60 116 L68 124 L48 144 Z" fill="#3a2a1c"/>'
  '<path d="M44 132 L52 140 M50 126 L58 134 M56 120 L64 128" stroke="#d8dde4" stroke-width="2.4"/><circle cx="42" cy="142" r="5" fill="#a88a3a"/>'),
 ('b2_horsebow', 'A Weasel horse-bow', 2, '+1 attack, +1 range', 'Sathi, Sergeant', 'Short, doubled back on itself, horn and sinew. The boy who gave it had a better one.',
  '<path d="M60 22 Q46 30 58 40 Q86 58 88 75 Q86 92 58 110 Q46 120 60 128" fill="none" stroke="#e2cfa0" stroke-width="7" stroke-linecap="round"/>'
  '<path d="M60 22 Q46 30 58 40 M58 110 Q46 120 60 128" fill="none" stroke="#3a2a18" stroke-width="7" stroke-linecap="round"/><rect x="82" y="66" width="12" height="18" rx="3" fill="#6b4a30"/>'
  '<path d="M60 26 L60 124" stroke="#efe4cb" stroke-width="1"/><path d="M92 75 L170 75" stroke="#b89a6a" stroke-width="2"/><path d="M170 70 L182 75 L170 80 Z" fill="#a8a8a0"/><path d="M96 70 L104 75 L96 80" fill="#c8a24a"/>'),
 ('b2_semkaxe', 'A Semk war-axe', 2, '1d10+2', 'Sergeant, Haddat, Ramin', "Picked up off the west bank. The god's marks are burnt into the haft.",
  '<path d="M52 136 L132 34" stroke="#5a3e24" stroke-width="8" stroke-linecap="round"/><path d="M118 22 Q150 18 168 40 Q156 62 128 64 Q132 44 118 22 Z" fill="#9a9690"/>'
  '<path d="M124 26 Q150 24 162 40 Q152 56 132 58" fill="none" stroke="#d8d4cc" stroke-width="1.5"/><path d="M76 108 L86 112 M84 96 L94 100 M92 86 L102 90" stroke="#1a0e08" stroke-width="3"/>'
  '<circle cx="80" cy="102" r="3" fill="#b04a2a"/><circle cx="96" cy="82" r="3" fill="#b04a2a"/><path d="M60 128 L54 140 L64 134" fill="#c8b088"/>'),
 ('b2_tithlance', 'A Tithansi lance', 3, '+1 attack, +1 range, reach, −1 armour', 'Ramin, Haddat, Sergeant', 'Cut down to a long spear. It reaches over a shield to the man behind it.',
  '<path d="M20 136 L156 30" stroke="#6a4a2c" stroke-width="5" stroke-linecap="round"/><path d="M150 34 Q166 16 184 12 Q178 30 160 44 Z" fill="#c8ccd4"/><path d="M156 36 L178 16" stroke="#f2f4f8" stroke-width="1"/>'
  '<path d="M146 40 Q136 54 140 66 Q148 56 152 46 Z" fill="#b08a5a"/><path d="M144 44 Q132 60 132 74" stroke="#8a2a1a" stroke-width="3" fill="none"/><path d="M20 136 L26 130" stroke="#2a1a0c" stroke-width="7"/>'),
 ('b2_noblesabre', "A noble's sabre", 4, '+2 attack', 'Sergeant, Haddat, Ramin, Sathi, Keth', 'Falari steel, a silver basket hilt, a crest scratched off. Never used.',
  '<path d="M74 104 Q118 70 172 30 Q178 28 176 34 Q126 80 84 112 Z" fill="#dfe3ea"/><path d="M80 106 Q122 74 172 32" stroke="#ffffff" stroke-width="1" fill="none"/>'
  '<path d="M58 96 Q44 124 72 130 Q96 132 94 110" fill="none" stroke="#e2e6ec" stroke-width="4"/><path d="M62 102 Q54 122 74 124 M70 98 Q66 118 84 120" fill="none" stroke="#b8bec6" stroke-width="2.4"/>'
  '<path d="M40 136 L66 110 L74 118 L48 144 Z" fill="#5a3e2a"/><path d="M46 134 L54 142 M52 128 L60 136 M58 122 L66 130" stroke="#c8ccd2" stroke-width="1.5"/><circle cx="42" cy="142" r="5" fill="#d8dce2"/><path d="M84 104 L92 112" stroke="#6a6e74" stroke-width="2" stroke-dasharray="1 2"/>'),
 ('b2_coldknife', 'A cold iron knife', 5, '+1 attack; a blow that lands slows', 'Marrow, Keth, Tangle, Sathi, Sergeant', 'Chipped out of the ice in the Jaghut tower. It never gets warm.',
  '<circle cx="118" cy="66" r="52" fill="url(#dcold)"/><path d="M84 96 L150 36 L158 42 L94 104 Z" fill="#9aa8b8"/><path d="M90 100 L154 39" stroke="#e8f2ff" stroke-width="1.2"/>'
  '<path d="M56 126 L84 96 L94 104 L66 134 Z" fill="#2a2e36"/><path d="M60 128 L68 120 M66 122 L74 114" stroke="#5a6070" stroke-width="2"/>'
  '<path d="M126 44 l4 -8 l4 8 l-4 8 Z M146 70 l3 -6 l3 6 l-3 6 Z M100 60 l3 -6 l3 6 l-3 6 Z" fill="#dff0ff" opacity=".8"/>'),
 ('b2_tcrossbow', 'A Trygalle crossbow', 5, '+1 attack, 1d8+2, +1 range', 'Tangle, Sergeant, Sathi', 'The windlass winds itself if you speak to it nicely.',
  '<path d="M40 100 L150 62" stroke="#5a3e22" stroke-width="10" stroke-linecap="round"/><path d="M128 30 Q150 50 160 92" fill="none" stroke="#7a7a80" stroke-width="5" stroke-linecap="round"/>'
  '<path d="M128 30 L160 92" stroke="#e0d8c4" stroke-width="1"/><circle cx="62" cy="92" r="11" fill="#3a3a40"/><circle cx="62" cy="92" r="6" fill="none" stroke="#c8a24a" stroke-width="2"/>'
  '<circle cx="62" cy="92" r="16" fill="none" stroke="#a8d8c8" stroke-width="1" opacity=".5" class="shimmer"/><path d="M100 74 L150 58" stroke="#c8b088" stroke-width="2"/>'),
 ('b2_khundrylblade', 'A Khundryl blade', 6, '+1 attack, 1d8+3', 'Sergeant, Haddat, Ramin, Sathi, Keth', 'In three wars, and wanting a fourth.',
  '<path d="M60 116 Q104 92 140 54 Q160 34 182 26 Q176 44 156 62 Q118 98 68 124 Z" fill="#c4c4bc"/><path d="M66 118 Q112 92 176 30" stroke="#f0f0e8" stroke-width="1" fill="none"/>'
  '<rect x="52" y="110" width="20" height="6" rx="2" fill="#8a6a3a" transform="rotate(-30 62 113)"/><path d="M30 138 L54 116 L62 124 L38 146 Z" fill="#2a1a10"/>'
  '<path d="M32 140 Q20 128 14 142 M34 142 Q24 134 20 148 M30 136 Q16 124 10 134" stroke="#0e0a08" stroke-width="2" fill="none"/>'),
 ('b2_arensword', 'An Aren longsword', 7, '+2 attack, 1d8+2', 'Sergeant, Haddat, Ramin', 'Never drawn. Still in its grease.',
  '<path d="M60 110 L168 30 L176 36 L70 118 Z" fill="#d4d8de"/><path d="M66 112 L172 33" stroke="#f8faff" stroke-width="1"/><path d="M110 82 L140 60" stroke="#c8b070" stroke-width="3" opacity=".35"/>'
  '<rect x="46" y="98" width="34" height="7" rx="2" fill="#7a7a7a" transform="rotate(-37 63 101)"/><path d="M36 134 L58 114 L66 122 L44 142 Z" fill="#3a2a1c"/><circle cx="38" cy="140" r="6" fill="#8a8a8a"/>'),
]
A = [
 ('b2_auxmail', 'Auxiliary mail', 1, '+2 armour, +2 health · heavy', 'Sergeant, Haddat, Ramin, Tangle', 'Good mail. At noon in the heat it is an oven.',
  '<path d="M64 30 L136 30 L156 52 L144 62 L140 128 L60 128 L56 62 L44 52 Z" fill="url(#dmail)"/><path d="M64 30 L136 30 L156 52 L144 62 L140 128 L60 128 L56 62 L44 52 Z" fill="url(#rings)"/>'
  '<path d="M60 128 L140 128" stroke="#6a8aaa" stroke-width="4"/><path d="M86 30 Q100 44 114 30" fill="#1a1612"/><circle cx="160" cy="26" r="10" fill="#e8923a" opacity=".55"/><path d="M160 10 v6 M160 36 v6 M144 26 h6 M170 26 h6" stroke="#f0b05a" stroke-width="2"/>'),
 ('b2_wickanhide', 'Wickan hardened hide', 2, '+1 armour, +1 move', 'Sergeant, Sathi, Tangle, Marrow, Keth', 'It turns a knife and it does not cook you.',
  '<path d="M66 30 L134 30 L152 56 L140 62 L138 116 L62 116 L60 62 L48 56 Z" fill="#8a6a44"/><path d="M66 30 L134 30 L152 56 L140 62 L138 116 L62 116 L60 62 L48 56 Z" fill="none" stroke="#3a2614" stroke-width="2"/>'
  '<path d="M62 116 L62 130 M70 116 L70 128 M78 116 L78 131 M86 116 L86 128 M94 116 L94 130 M102 116 L102 128 M110 116 L110 131 M118 116 L118 128 M126 116 L126 130 M134 116 L134 128" stroke="#c8a878" stroke-width="2"/>'
  '<path d="M64 52 Q100 64 136 52" stroke="#c8a878" stroke-width="2" fill="none"/><path d="M100 32 L100 112" stroke="#5a3e24" stroke-width="2"/>'),
 ('b2_officerscale', "An officer's scale", 4, '+3 armour · heavy', 'Sergeant, Haddat, Ramin', 'The best armour on the Chain, and the hottest.',
  '<path d="M64 30 L136 30 L156 52 L144 62 L140 128 L60 128 L56 62 L44 52 Z" fill="#7a7e86"/><path d="M64 30 L136 30 L156 52 L144 62 L140 128 L60 128 L56 62 L44 52 Z" fill="url(#scales)"/>'
  '<path d="M86 30 Q100 44 114 30" fill="#1a1612"/><path d="M68 52 L78 92" stroke="#ffffff" stroke-width="4" opacity=".18"/><circle cx="160" cy="26" r="10" fill="#e8923a" opacity=".55"/><path d="M160 10 v6 M160 36 v6 M144 26 h6 M170 26 h6" stroke="#f0b05a" stroke-width="2"/>'),
 ('b2_tleathers', 'Trygalle leathers', 5, '+2 armour', 'Sergeant, Sathi, Tangle, Marrow, Keth', 'Stitched with something that is not thread.',
  '<path d="M66 30 L134 30 L152 56 L140 62 L138 126 L62 126 L60 62 L48 56 Z" fill="#4a3424"/><path d="M62 72 L138 72 M62 92 L138 92 M62 112 L138 112" stroke="#2a1c12" stroke-width="3"/>'
  '<path d="M64 70 L136 70 M64 90 L136 90 M64 110 L136 110" stroke="#9ad8c0" stroke-width="1" stroke-dasharray="3 4" class="shimmer"/><path d="M100 30 L100 126" stroke="#2a1c12" stroke-width="2"/><path d="M76 40 L86 50 M114 50 L124 40" stroke="#6a5038" stroke-width="2"/>'),
 ('b2_horsehair', 'A Khundryl horsehair cloak', 6, '+1 armour, +1 Guile', 'anyone', 'Worn painted, for your own funeral. This one is not painted. Yet.',
  '<path d="M72 26 Q100 18 128 26 L156 132 Q100 140 44 132 Z" fill="#141212"/><path d="M58 128 L70 40 M72 132 L80 36 M88 134 L92 30 M104 134 L104 28 M120 134 L114 32 M136 130 L124 36 M150 128 L132 44" stroke="#2e2a28" stroke-width="2"/>'
  '<path d="M84 30 Q100 40 116 30" fill="none" stroke="#3a3430" stroke-width="3"/><path d="M152 34 l10 0 M152 40 l14 0 M152 46 l8 0" stroke="#c87a3a" stroke-width="3" opacity=".7"/><path d="M160 54 l8 -4" stroke="#d8d0c0" stroke-width="2" opacity=".6"/>'),
 ('b2_arenmail', 'Aren Guard mail', 7, '+3 armour, +2 health · heavy', 'Sergeant, Haddat, Ramin, Tangle', 'Every ring whole. It has never been in a noon fight.',
  '<path d="M64 30 L136 30 L156 52 L144 62 L140 128 L60 128 L56 62 L44 52 Z" fill="url(#dmail2)"/><path d="M64 30 L136 30 L156 52 L144 62 L140 128 L60 128 L56 62 L44 52 Z" fill="url(#rings)"/>'
  '<path d="M60 128 L140 128" stroke="#c8a24a" stroke-width="4"/><path d="M86 30 Q100 44 114 30" fill="#1a1612"/><path d="M74 48 L82 96" stroke="#ffffff" stroke-width="5" opacity=".2"/>'),
]
T = [
 ('b2_dipper', "Ressan's dipper", 1, '+2 health', "Forty years of other people's mouths wore the lip thin.",
  '<path d="M60 92 L170 40" stroke="#b8902e" stroke-width="5" stroke-linecap="round"/><ellipse cx="62" cy="96" rx="28" ry="14" fill="#c9a24a"/><ellipse cx="62" cy="92" rx="24" ry="9" fill="#5a4010"/><path d="M38 96 Q62 112 86 96" fill="none" stroke="#f0d08a" stroke-width="1.5"/><path d="M170 40 Q186 30 196 44" fill="none" stroke="#3a2a1a" stroke-width="2"/>'),
 ('b2_lancehead', 'Odhan lance-head', 1, '+1 attack', 'The green rag is still knotted under it.',
  '<path d="M120 14 Q140 40 132 70 L108 70 Q100 40 120 14 Z" fill="#a8acb2"/><path d="M120 18 L120 66" stroke="#e8ecf0" stroke-width="1.2"/><rect x="110" y="70" width="20" height="26" rx="3" fill="#5a5048"/>'
  '<path d="M108 82 Q90 92 84 112 Q100 104 110 92 M130 82 Q146 92 152 110 Q138 104 130 92" fill="#3e8a3a"/>'),
 ('b2_tamarisk', 'Tamarisk switch', 2, '+1 health', 'Cut over the water at Dryj. Gone grey and hard.',
  '<path d="M40 104 Q120 70 200 40" stroke="#7a7a64" stroke-width="3" fill="none"/>' + ''.join(f'<path d="M{60+i*16} {96-i*6} q6 -14 14 -16 M{66+i*16} {94-i*6} q8 8 16 4" stroke="#9aa08a" stroke-width="1.6" fill="none"/>' for i in range(8))),
 ('b2_wellrope', 'Well-rope knot', 2, '+1 attack', 'Horsehair rope, knotted the Tithansi way.',
  '<path d="M30 70 Q70 60 96 66 Q126 72 120 52 Q112 34 98 50 Q88 64 110 80 Q132 96 144 70 Q150 56 210 62" fill="none" stroke="#6a5038" stroke-width="9" stroke-linecap="round"/><path d="M30 70 Q70 60 96 66 Q126 72 120 52 Q112 34 98 50 Q88 64 110 80 Q132 96 144 70 Q150 56 210 62" fill="none" stroke="#a8885e" stroke-width="2" stroke-dasharray="4 5"/>'),
 ('b2_paving', 'A ford stone', 2, '+2 health', 'Prised up from the Sekala ford before the cussers went in.',
  '<path d="M70 40 L170 34 L182 92 L64 100 Z" fill="#8a8072"/><path d="M70 40 L170 34 L172 44 L72 50 Z" fill="#a89c8a"/><path d="M90 60 L104 82 M130 56 L140 74 M150 70 L158 84" stroke="#5a5248" stroke-width="2"/><path d="M64 100 L182 92" stroke="#3a4a5a" stroke-width="3" opacity=".6"/>'),
 ('b2_fetish', 'A Semk god-fetish', 2, '+1 Wits; a spoiled spell comes out clean, once a chapter', 'The god the Semk wore, before the spirits ate it. Do not ask it anything.',
  '<circle cx="120" cy="66" r="48" fill="url(#dtglow)"/><path d="M96 30 Q120 20 144 30 Q136 48 120 50 Q104 48 96 30 Z" fill="#1a1410"/><path d="M100 34 Q96 60 104 80 M140 34 Q146 60 136 82 M112 40 Q110 70 116 96 M128 40 Q132 70 126 98" stroke="#2a1e16" stroke-width="3"/>'
  '<circle cx="120" cy="70" r="16" fill="#b0603a"/><circle cx="120" cy="70" r="8" fill="#e8d8b0"/><circle cx="120" cy="70" r="3.5" fill="#1a0e08"/><path d="M104 96 L136 96 L130 110 L110 110 Z" fill="#e6dcc4"/>'),
 ('b2_clawstar', 'A black iron star', 3, '+1 attack', 'Five points, edged on every one. Pulled out of a dead Tithansi.',
  '<path d="M120 22 L131 54 L165 54 L138 74 L148 106 L120 86 L92 106 L102 74 L75 54 L109 54 Z" fill="#1a1a1e"/><path d="M120 22 L131 54 L165 54 L138 74 L148 106 L120 86 L92 106 L102 74 L75 54 L109 54 Z" fill="none" stroke="#7a7e88" stroke-width="1.5"/><circle cx="120" cy="66" r="6" fill="#3a3a40"/>'),
 ('b2_tunnelroot', 'A root from the cut', 3, '+2 health', 'Still damp, weeks later, in a country with no water.',
  '<path d="M40 64 Q80 40 110 66 Q140 92 180 62 Q196 50 210 58" fill="none" stroke="#d8ccb0" stroke-width="7" stroke-linecap="round"/><path d="M110 66 Q118 88 106 104 M150 76 Q164 96 156 110" fill="none" stroke="#c8bca0" stroke-width="3"/><circle cx="96" cy="74" r="3" fill="#8ab0c8"/><circle cx="166" cy="70" r="2.5" fill="#8ab0c8"/><circle cx="128" cy="84" r="2" fill="#8ab0c8"/>'),
 ('b2_sappershield', "A sapper's dented shield-boss", 3, '+1 health', 'Dented in the shape of a horse\'s hoof, from the ramp at Gelor.',
  '<circle cx="120" cy="66" r="44" fill="#6a6a6e"/><circle cx="120" cy="66" r="44" fill="none" stroke="#3a3a3e" stroke-width="5"/><path d="M104 56 Q120 40 136 56 Q138 76 120 82 Q102 76 104 56 Z" fill="#3e3e42"/><path d="M110 58 Q120 50 130 58" fill="none" stroke="#9a9aa0" stroke-width="2"/><circle cx="92" cy="40" r="3" fill="#8a8a90"/><circle cx="150" cy="44" r="3" fill="#8a8a90"/>'),
 ('b2_robe', 'A desert robe', 3, 'no heat in a noon fight', 'The Malazans laughed at the tribes for these. They have stopped laughing.',
  '<path d="M60 44 L180 44 L188 98 L52 98 Z" fill="#d8ccb0"/><path d="M60 44 L180 44 L176 56 L64 56 Z" fill="#ece2cc"/><path d="M80 56 L76 98 M120 56 L120 98 M160 56 L164 98" stroke="#b8a888" stroke-width="2"/><circle cx="196" cy="26" r="10" fill="#f0b05a" opacity=".5"/><path d="M180 30 L190 40" stroke="#5a8aaa" stroke-width="3"/>'),
 ('b2_conduct', "Dom's safe-conduct", 4, '+1 Guile', "A Fist's seal, the Emperor's mark scraped out of it.",
  '<path d="M66 24 L176 30 L170 108 L60 102 Z" fill="#e6dcc0"/><path d="M80 44 L160 48 M78 58 L156 62 M76 72 L130 74" stroke="#7a6a4a" stroke-width="1.5"/><circle cx="148" cy="90" r="13" fill="#8a1e1a"/><path d="M142 86 L154 94 M154 86 L142 94" stroke="#c84a3a" stroke-width="2"/>'),
 ('b2_pikehead', 'A pike-head from the ford', 4, '+1 attack', 'Made in a Malazan pattern. Somebody sold it to the other side.',
  '<path d="M120 12 L136 62 L104 62 Z" fill="#9a9ea6"/><path d="M120 16 L120 60" stroke="#e8ecf0" stroke-width="1"/><rect x="112" y="62" width="16" height="30" rx="2" fill="#6a6e76"/><path d="M114 92 L112 104 L118 98 L122 108 L126 98 L130 106 L128 92 Z" fill="#6a4a2c"/>'),
 ('b2_plank', 'A plank of the Silanda', 4, '+2 health; bites back, once a fight', "Do not leave it on the ground at night.",
  '<path d="M40 76 L190 48 L196 62 L46 90 Z" fill="#141016"/><path d="M40 76 L190 48 L192 54 L42 82 Z" fill="#2a2228"/>'
  '<path d="M80 72 l6 -8 l4 8 M104 66 l2 -9 l6 6 M128 62 l6 -6 l2 8 M152 57 l4 -8 l4 7" stroke="#9a6ad0" stroke-width="2" fill="none" class="shimmer"/><path d="M190 48 L210 40 L196 62" fill="#141016"/>'),
 ('b2_sealskin', "A skin with the water-sellers' seal", 5, '+1 Wits', "Off a dead Tregyn on the Nenoth. Haddat knew the mark.",
  '<path d="M80 40 Q60 70 82 100 Q120 116 158 100 Q180 70 160 40 Q120 30 80 40 Z" fill="#7a5a3a"/><rect x="112" y="22" width="16" height="16" rx="3" fill="#5a3e24"/><path d="M110 38 L130 38" stroke="#c8a24a" stroke-width="3"/>'
  '<circle cx="120" cy="72" r="14" fill="none" stroke="#3a2614" stroke-width="3"/><path d="M112 70 Q120 82 128 70" fill="none" stroke="#3a2614" stroke-width="2.5"/><path d="M120 60 L120 66" stroke="#3a2614" stroke-width="2.5"/>'),
 ('b2_tskin', 'A Trygalle skin', 5, 'one rest a chapter costs no water', 'It holds more than it should. Do not look inside.',
  '<circle cx="120" cy="70" r="46" fill="url(#dtglow)"/><path d="M84 42 Q66 72 86 102 Q120 116 154 102 Q174 72 156 42 Q120 32 84 42 Z" fill="#5a4030"/><path d="M96 56 Q120 50 144 56" stroke="#9ad8c0" stroke-width="1.5" fill="none" class="shimmer"/>'
  '<rect x="112" y="22" width="16" height="16" rx="3" fill="#3a2a1c"/><circle cx="120" cy="18" r="6" fill="#c8a24a"/><path d="M126 20 Q150 22 156 40" fill="none" stroke="#a8a8a0" stroke-width="2" stroke-dasharray="3 2"/>'),
 ('b2_bluethread', 'A blue thread', 6, '+1 Wits', "From Haddat's mother's veil. Tied to her shield grip from Hissar to the Geleen.",
  '<path d="M40 80 Q70 40 100 70 Q130 100 150 60 Q166 30 190 54 Q204 70 184 84 Q166 94 172 72" fill="none" stroke="#3a6aa8" stroke-width="3" stroke-linecap="round"/><path d="M40 80 Q70 40 100 70 Q130 100 150 60" fill="none" stroke="#8ab0e0" stroke-width="1" opacity=".6"/>'),
 ('b2_whistle', 'A bone whistle', 6, '+1 Guile', 'Hackle answers it. Nobody else can hear it properly.',
  '<path d="M50 74 L180 54 Q192 54 192 64 Q192 74 180 74 L52 88 Q42 86 44 80 Z" fill="#e6dcc4"/><ellipse cx="120" cy="66" rx="6" ry="4" fill="#3a2a1a"/><ellipse cx="148" cy="62" rx="5" ry="3.5" fill="#3a2a1a"/><path d="M186 62 L210 50" stroke="#3a2a1a" stroke-width="2"/>'),
 ('b2_bead', 'A Kanese prayer bead', 6, '+1 Wits', 'From Itko Kan, with no prayer Tangle could ever remember.',
  '<path d="M40 50 Q120 120 200 50" fill="none" stroke="#5a3e24" stroke-width="2"/><circle cx="120" cy="84" r="20" fill="#8a3a2a"/><circle cx="114" cy="78" r="6" fill="#c86a4a" opacity=".7"/><path d="M106 84 L134 84 M120 70 L120 98" stroke="#3a1a10" stroke-width="2"/>'),
 ('b2_knotstring', 'A knotted string', 6, '+1 Wits', 'A knot for every healing that took, from Hissar to the Geleen.',
  '<path d="M24 66 L216 66" stroke="#c8b088" stroke-width="2.5"/>' + ''.join(f'<circle cx="{34+i*13}" cy="66" r="4.2" fill="#a88a5a"/>' for i in range(14))),
 ('b2_sash', 'A red sash', 6, '+1 Might', 'Folded, for the day there was a horse to ride in it.',
  '<path d="M60 44 L180 40 L184 92 L56 96 Z" fill="#a8261a"/><path d="M60 44 L180 40 L178 52 L62 56 Z" fill="#c84a3a"/><path d="M60 70 L182 66" stroke="#6a120a" stroke-width="2"/><path d="M180 40 L204 34 L196 58 Z" fill="#8a1e14"/>'),
 ('b2_dogtooth', "A dog's tooth", 6, '+1 Wits', "Keth's first dog's. For Hackle, when he is old.",
  '<path d="M60 30 Q120 80 180 30" fill="none" stroke="#3a2a1a" stroke-width="2"/><path d="M108 58 Q120 52 132 58 Q130 90 120 110 Q110 90 108 58 Z" fill="#e2d4a8"/><path d="M108 58 Q120 52 132 58 Q124 64 120 64 Q114 64 108 58 Z" fill="#a88a5a"/><path d="M124 66 Q124 88 120 104" stroke="#c4b48a" stroke-width="1.5" fill="none"/>'),
 ('b2_crowfeather', "A crow's feather", 7, '+1 Might, +1 Wits, +1 Guile', 'From the cloak the Fist wore. The Wickans do not say whose. They do not need to.',
  '<path d="M44 104 Q120 40 200 24" stroke="#2a2a30" stroke-width="2.5" fill="none"/><path d="M70 92 Q110 40 196 26 Q150 64 70 92 Z" fill="#101014"/><path d="M80 86 Q118 50 190 30" stroke="#4a6ab0" stroke-width="1.5" fill="none" opacity=".7"/>'
  + ''.join(f'<path d="M{86+i*14} {84-i*7} l-8 10" stroke="#1e1e24" stroke-width="1.5"/>' for i in range(8))),
]

DEFS = '''<svg width="0" height="0" style="position: absolute" aria-hidden="true"><defs>
<radialGradient id="dwbg" cx="0.5" cy="0.5" r="0.62"><stop offset="0" stop-color="#4a3a24"></stop><stop offset="1" stop-color="#110d09"></stop></radialGradient>
<radialGradient id="dabg" cx="0.5" cy="0.5" r="0.62"><stop offset="0" stop-color="#3e3226"></stop><stop offset="1" stop-color="#100c0a"></stop></radialGradient>
<radialGradient id="dtbg" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#40321e"></stop><stop offset="1" stop-color="#0f0c09"></stop></radialGradient>
<radialGradient id="dtglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#e8c98a" stop-opacity=".22"></stop><stop offset="1" stop-color="#e8c98a" stop-opacity="0"></stop></radialGradient>
<radialGradient id="dcold" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#bfe8ff" stop-opacity=".28"></stop><stop offset="1" stop-color="#bfe8ff" stop-opacity="0"></stop></radialGradient>
<linearGradient id="dmail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a9a96"></stop><stop offset=".6" stop-color="#5a5a58"></stop><stop offset="1" stop-color="#2a2a28"></stop></linearGradient>
<linearGradient id="dmail2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8ccd2"></stop><stop offset=".6" stop-color="#7a7e86"></stop><stop offset="1" stop-color="#3a3c40"></stop></linearGradient>
<pattern id="rings" width="6" height="5" patternUnits="userSpaceOnUse"><circle cx="3" cy="2.5" r="2" fill="none" stroke="#1a1a18" stroke-width=".8" opacity=".55"></circle></pattern>
<pattern id="scales" width="8" height="7" patternUnits="userSpaceOnUse"><path d="M0 0 Q4 8 8 0" fill="none" stroke="#2a2c30" stroke-width="1"></path><path d="M1 1 Q4 6 7 1" fill="none" stroke="#d8dce2" stroke-width=".6" opacity=".6"></path></pattern>
</defs></svg>'''
HEAD = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,500&amp;family=Cormorant+SC:wght@500;600;700&amp;display=swap">
<style>
body{{margin:0}}
@keyframes shimmer{{0%,100%{{opacity:.25}}50%{{opacity:.7}}}}
.shimmer{{animation:shimmer 4s ease-in-out infinite}}
@media (prefers-reduced-motion: reduce){{.shimmer{{animation:none}}}}
</style>
</helmet>
<div style="width: 1600px; box-sizing: border-box; padding: 52px 100px 48px; background: #0d0b08; font-family: 'Cormorant Garamond', Georgia, serif; color: #e8dcc2; display: flex; flex-direction: column; gap: 22px">
{defs}
<div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 24px">
<div style="display: flex; flex-direction: column; gap: 6px">
<div style="font-family: 'Cormorant SC', Georgia, serif; font-weight: 600; font-size: 16px; letter-spacing: 0.32em; color: #c9a15a">Book Two · the Chain of Dogs</div>
<h1 style="margin: 0; font-family: 'Cormorant SC', Georgia, serif; font-weight: 600; font-size: 56px; line-height: 1; color: #efe4cb">{h1}</h1>
</div>
<p style="margin: 0; font-style: italic; font-size: 20px; color: #b5a888; max-width: 600px; text-align: right">{blurb}</p>
</div>
'''
FOOT = '''</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":1600,"height":{h}}}}}'>
class Component extends DCLogic {{
renderVals() {{
return {{}};
}}
}}
</script>
</body>
</html>
'''
def card(label, ch, stats, who, cap, body, vb, bg, accent, border):
    w, h = vb
    return (f'<div style="background: #14110e; border: 1px solid {border}; border-radius: 4px; padding: 10px 12px 16px; display: flex; flex-direction: column; gap: 7px">\n'
            f'<svg width="100%" height="{140 if w == 200 else 150}" viewBox="0 0 {w} {h}" role="img" aria-label="{html.escape(label, quote=False)}"><rect width="{w}" height="{h}" rx="3" fill="url(#{bg})"></rect>\n{body}</svg>\n'
            f'<div style="font-family: \'Cormorant SC\', Georgia, serif; font-weight: 600; font-size: 20px; line-height: 1.05; color: #efe4cb">{html.escape(label)}</div>\n'
            f'<div style="font-size: 13px; letter-spacing: 0.06em; color: {accent}">Ch {ch} · {html.escape(stats)} · {html.escape(who)}</div>\n'
            f'<p style="margin: 0; font-size: 15px; line-height: 1.32; color: #c8bca2">{html.escape(cap)}</p>\n</div>\n\n')
def section(name, col):
    return f'<div style="font-family: \'Cormorant SC\', Georgia, serif; font-size: 18px; letter-spacing: 0.28em; color: {col}; border-bottom: 1px solid #3a3022; padding-bottom: 6px">{name}</div>\n'
def grid(n): return f'<div style="display: grid; grid-template-columns: repeat({n}, minmax(0, 1fr)); gap: 18px">\n\n'

arms = HEAD.format(title='Book Two items — weapons and armour', defs=DEFS, h1='Weapons &amp; Armour', blurb=f'{len(W) + len(A)} pieces off the Chain, Hissar to Aren. Nobody on the Odhan sells for silver.')
arms += section('Weapons', '#d8b070') + grid(5) + ''.join(card(l, c, s, w, cap, b, (200, 150), 'dwbg', '#d8b070', '#4a3a24') for _, l, c, s, w, cap, b in W) + '</div>\n'
arms += section('Armour', '#b8a0c0') + grid(6) + ''.join(card(l, c, s, w, cap, b, (200, 150), 'dabg', '#b8a0c0', '#3e3226') for _, l, c, s, w, cap, b in A) + '</div>\n'
arms += FOOT.format(h=1300)
trink = HEAD.format(title='Book Two items — trinkets', defs=DEFS, h1='Trinkets', blurb=f'{len(T)} small things carried from Hissar. Most of them were somebody\'s, and some of them still are.')
trink += grid(5) + ''.join(card(l, c, s, 'anyone' if k != 'b2_sealskin' else 'Haddat', cap, b, (240, 130), 'dtbg', '#c9a15a', '#3a3022') for k, l, c, s, cap, b in T) + '</div>\n'
trink += FOOT.format(h=1700)
open(os.path.join(OUT, 'ArmsDG.dc.html'), 'w', encoding='utf-8').write(arms)
open(os.path.join(OUT, 'TrinketsDG.dc.html'), 'w', encoding='utf-8').write(trink)
# the label -> key map art_build.py reads for these boards
KEYS = {l: k for k, l, *_ in W + A} | {l: k for k, l, *_ in T}
open(os.path.join(OUT, 'items_dg.json'), 'w', encoding='utf-8').write(__import__('json').dumps(KEYS, ensure_ascii=False, indent=1))
print(len(W), 'weapons,', len(A), 'armour,', len(T), 'trinkets')
