// One page per grade or product people search for by name. Each page lives
// under its range: /products/<range>/<slug>. Technical notes are general
// reference values; confirm the exact grade and condition with each order.

export interface Item {
  slug: string
  range: string
  name: string
  short: string
  title: string
  description: string
  intro: string
  facts: { label: string; value: string }[]
  uses: string[]
  notes: string[]
  faqs: { q: string; a: string }[]
  related: string[]
  keywords: string[]
}

export const items: Item[] = [
  // ── Engineering steels ──────────────────────────────────────────
  {
    slug: 'en19',
    range: 'engineering-steels',
    name: 'EN19',
    short: 'Chrome-moly alloy steel for shafts, gears and bolts. Condition T available.',
    title: 'EN19 Steel Supplier in Johannesburg',
    description: 'EN19 (709M40, 42CrMo4) round bar in Condition T, cut to length in Johannesburg and delivered nationwide. Ask Apex Metals for a quote.',
    intro:
      'EN19 is a chromium-molybdenum alloy steel and one of the most used grades in South African engineering shops. In Condition T it arrives hardened and tempered, ready to machine into shafts, gears and high-tensile bolts without further heat treatment.',
    facts: [
      { label: 'Also known as', value: '709M40, 42CrMo4 (1.7225), similar to AISI 4140' },
      { label: 'Type', value: 'Chromium-molybdenum alloy steel' },
      { label: 'Condition T', value: 'Hardened and tempered, about 850 to 1000 MPa tensile, 248 to 302 HB' },
      { label: 'Forms', value: 'Round bar, full lengths or cut to size' },
    ],
    uses: ['Shafts, axles and spindles', 'Gears and pinions', 'High-tensile bolts and studs', 'Couplings and connecting rods', 'Hydraulic and pump components'],
    notes: [
      'EN19 machines well in Condition T and can be induction or flame hardened for extra surface wear resistance.',
      'For larger diameters or parts that take heavy shock loads, EN24 holds its strength deeper into the section and is the safer choice.',
    ],
    faqs: [
      { q: 'Is EN19 the same as 4140?', a: 'They are close equivalents. EN19 (709M40) and AISI 4140 are both chromium-molybdenum steels with very similar composition and are often used interchangeably.' },
      { q: 'Can you cut EN19 to length?', a: 'Yes. Give us the diameter, length and quantity and we cut it before delivery.' },
      { q: 'Should I use EN19 or EN24?', a: 'EN19 suits most shafts, gears and bolts. EN24 has nickel added, which makes it tougher and better for large sections and the most heavily loaded parts.' },
    ],
    related: ['en24', 'en9', 'en36b'],
    keywords: ['EN19 steel Johannesburg', 'EN19 supplier South Africa', '709M40', '42CrMo4', '4140 steel South Africa'],
  },
  {
    slug: 'en24',
    range: 'engineering-steels',
    name: 'EN24',
    short: 'Nickel-chrome-moly alloy steel for heavy-duty shafts and gears. Condition T available.',
    title: 'EN24 Steel Supplier in Johannesburg',
    description: 'EN24 (817M40, similar to 4340) round bar in Condition T, cut to length in Johannesburg and delivered nationwide. Ask Apex Metals for a quote.',
    intro:
      'EN24 is a nickel-chromium-molybdenum alloy steel. The nickel gives it more toughness than EN19 and lets it harden through thicker sections, so it is the grade engineers specify for heavily loaded shafts, gears and pins.',
    facts: [
      { label: 'Also known as', value: '817M40, similar to 34CrNiMo6 (1.6582) and AISI 4340' },
      { label: 'Type', value: 'Nickel-chromium-molybdenum alloy steel' },
      { label: 'Condition T', value: 'Hardened and tempered, about 850 to 1000 MPa tensile, 248 to 302 HB' },
      { label: 'Forms', value: 'Round bar, full lengths or cut to size' },
    ],
    uses: ['Heavy-duty shafts and axles', 'Gears and crankshafts', 'Mining and earthmoving pins', 'Connecting rods and spindles', 'Highly stressed bolts and studs'],
    notes: [
      'EN24 keeps good impact strength at high tensile levels, which is why it is used where a failure would be costly.',
      'It can be supplied in higher tensile conditions for special applications. Ask if you need something other than Condition T.',
    ],
    faqs: [
      { q: 'Is EN24 the same as 4340?', a: 'EN24 (817M40) is the British equivalent of AISI 4340. Both are nickel-chromium-molybdenum steels with very similar properties.' },
      { q: 'Why is EN24 more expensive than EN19?', a: 'The nickel content costs more, and in return you get better toughness and through-hardening in larger diameters.' },
    ],
    related: ['en19', 'en36b', 'k110-tool-steel'],
    keywords: ['EN24 steel Johannesburg', 'EN24 supplier South Africa', '817M40', '4340 steel South Africa', 'EN24T'],
  },
  {
    slug: 'en9',
    range: 'engineering-steels',
    name: 'EN9',
    short: 'Medium-carbon steel for sprockets, gears and wear parts.',
    title: 'EN9 Steel Supplier in Johannesburg',
    description: 'EN9 (070M55) medium-carbon steel bar for sprockets, gears and wear parts. Cut to size in Johannesburg, delivered nationwide by Apex Metals.',
    intro:
      'EN9 is a medium-carbon steel with around 0.55% carbon. It is stronger and harder-wearing than mild steel and responds well to flame and induction hardening, which makes it a common choice for sprockets, gears and parts that rub.',
    facts: [
      { label: 'Also known as', value: '070M55, similar to C55 (1.0535) and AISI 1055' },
      { label: 'Type', value: 'Medium-carbon steel' },
      { label: 'Hardening', value: 'Suitable for flame and induction hardening' },
      { label: 'Forms', value: 'Bar, full lengths or cut to size' },
    ],
    uses: ['Sprockets and gears', 'Cams and rollers', 'Wear plates and strips', 'Spindles and axles', 'Agricultural parts'],
    notes: [
      'EN9 is a cost-effective step up from mild steel when wear is the main problem rather than shock loading.',
      'Its higher carbon means welding needs preheat and care. For welded parts, ask us about alternatives.',
    ],
    faqs: [
      { q: 'What is EN9 used for?', a: 'Mostly sprockets, gears, cams and other parts that need wear resistance, often with the working surface flame or induction hardened.' },
      { q: 'Can EN9 be welded?', a: 'It can, but the higher carbon content needs preheating and controlled cooling to avoid cracking.' },
    ],
    related: ['en19', 'en3', 'en1a'],
    keywords: ['EN9 steel Johannesburg', 'EN9 supplier South Africa', '070M55', 'medium carbon steel bar'],
  },
  {
    slug: 'en1a',
    range: 'engineering-steels',
    name: 'EN1A',
    short: 'Free-cutting steel for fast, clean machining of turned parts.',
    title: 'EN1A Free-Cutting Steel in Johannesburg',
    description: 'EN1A (230M07) free-cutting steel bar for high-volume turned parts. Cut to size in Johannesburg and delivered nationwide by Apex Metals.',
    intro:
      'EN1A is a low-carbon steel with added sulphur that breaks chips cleanly and lets lathes run fast. It is the standard choice for high-volume turned parts that are not heavily stressed.',
    facts: [
      { label: 'Also known as', value: '230M07, similar to 11SMn30 (1.0715) and AISI 1215' },
      { label: 'Type', value: 'Free-cutting low-carbon steel' },
      { label: 'Machinability', value: 'Excellent, with short chips and a good finish' },
      { label: 'Forms', value: 'Bright bar, full lengths or cut to size' },
    ],
    uses: ['Nuts, bolts and screws', 'Pins, bushes and spacers', 'Hydraulic fittings', 'Turned components in volume', 'Light-duty shafts'],
    notes: [
      'The sulphur that makes EN1A easy to machine also makes it a poor choice for welding and for parts under high stress.',
      'If a turned part needs strength or welding, EN3B or an alloy grade is usually the better option.',
    ],
    faqs: [
      { q: 'Can EN1A be welded?', a: 'It is not recommended. The added sulphur makes welds prone to cracking.' },
      { q: 'Why choose EN1A over mild steel?', a: 'It machines much faster with a better finish, which saves time and tooling on turned parts.' },
    ],
    related: ['en3', 'en9', 'brass-bar'],
    keywords: ['EN1A steel Johannesburg', 'free cutting steel South Africa', '230M07', 'EN1A bright bar'],
  },
  {
    slug: 'en3',
    range: 'engineering-steels',
    name: 'EN3A & EN3B',
    short: 'Low-carbon general engineering steel. EN3B is bright drawn.',
    title: 'EN3A & EN3B Steel in Johannesburg',
    description: 'EN3A and EN3B low-carbon mild steel bar for general engineering, weldable and easy to machine. Cut to size in Johannesburg by Apex Metals.',
    intro:
      'EN3 is a low-carbon mild steel for general engineering work. EN3A is the hot-rolled bar; EN3B is bright drawn, so it comes with a clean finish and closer size tolerance that saves machining.',
    facts: [
      { label: 'Type', value: 'Low-carbon mild steel, around 0.2% carbon' },
      { label: 'EN3A', value: 'Hot-rolled (black) bar' },
      { label: 'EN3B', value: 'Bright drawn bar with a clean, accurate finish' },
      { label: 'Forms', value: 'Round, square and flat bar, full lengths or cut to size' },
    ],
    uses: ['General machined parts', 'Lightly loaded shafts and pins', 'Brackets and fixtures', 'Welded fabrications', 'Case-hardened parts'],
    notes: [
      'EN3 welds easily and can be case hardened when a wear-resistant surface is needed.',
      'Choose EN3B when the bar will be used close to size, for example for pins and spindles.',
    ],
    faqs: [
      { q: 'What is the difference between EN3A and EN3B?', a: 'EN3A is hot rolled and has a black mill-scale finish. EN3B is bright drawn, which gives a clean surface and tighter tolerances.' },
      { q: 'Is EN3B weldable?', a: 'Yes. Its low carbon content makes it easy to weld.' },
    ],
    related: ['en1a', 'en9', 'en36b'],
    keywords: ['EN3B steel Johannesburg', 'EN3A bar', 'bright mild steel bar', 'EN3B supplier South Africa'],
  },
  {
    slug: 'en36b',
    range: 'engineering-steels',
    name: 'EN36B',
    short: 'Nickel-chrome case-hardening steel for gears, cams and pins.',
    title: 'EN36B Case-Hardening Steel in Johannesburg',
    description: 'EN36B (655M13) case-hardening steel for gears, cams and pins: a hard surface over a tough core. Cut to size in Johannesburg by Apex Metals.',
    intro:
      'EN36B is a nickel-chromium case-hardening steel. After carburising it has a very hard, wear-resistant surface over a tough core, the combination needed for gears and cams that see both wear and shock.',
    facts: [
      { label: 'Also known as', value: '655M13, similar to 15NiCr13 (1.5752)' },
      { label: 'Type', value: 'Nickel-chromium case-hardening steel' },
      { label: 'Heat treatment', value: 'Carburised and hardened after machining' },
      { label: 'Forms', value: 'Round bar, full lengths or cut to size' },
    ],
    uses: ['Gears and pinions', 'Cams and camshafts', 'Heavy-duty pins and bushes', 'Splined shafts', 'Crown wheels'],
    notes: [
      'Parts are machined first, then carburised and hardened, so the finished surface stays hard while the core resists cracking.',
    ],
    faqs: [
      { q: 'What is case hardening?', a: 'Carbon is diffused into the surface of the finished part, which is then hardened. The result is a hard skin for wear and a tougher core for strength.' },
    ],
    related: ['en24', 'en19', 'en3'],
    keywords: ['EN36B steel Johannesburg', 'case hardening steel South Africa', '655M13', 'EN36 supplier'],
  },
  {
    slug: 'k110-tool-steel',
    range: 'engineering-steels',
    name: 'K110 Tool Steel',
    short: 'High-carbon, high-chromium cold-work tool steel, similar to D2.',
    title: 'K110 Tool Steel Supplier in Johannesburg',
    description: 'K110 cold-work tool steel (similar to D2, 1.2379) for dies, punches and shear blades. Cut to size in Johannesburg, delivered nationwide.',
    intro:
      'K110 is a cold-work tool steel with high carbon and around 12% chromium. It holds an edge and resists wear, which is why toolmakers use it for blanking dies, punches and shear blades.',
    facts: [
      { label: 'Also known as', value: 'Similar to D2 and X153CrMoV12 (1.2379)' },
      { label: 'Type', value: 'High-carbon, high-chromium cold-work tool steel' },
      { label: 'Working hardness', value: 'Typically around 58 to 62 HRC after hardening and tempering' },
      { label: 'Forms', value: 'Bar, cut to size' },
    ],
    uses: ['Blanking and punching dies', 'Shear and slitter blades', 'Thread rolling dies', 'Forming tools', 'Wear parts and guides'],
    notes: [
      'K110 is supplied soft annealed for machining, then hardened and tempered once the tool is finished.',
      'K110 is a trade name of voestalpine Böhler.',
    ],
    faqs: [
      { q: 'Is K110 the same as D2?', a: 'K110 is equivalent to D2 (1.2379), a high-carbon, high-chromium cold-work tool steel.' },
      { q: 'Can you cut K110 to size?', a: 'Yes. Send the dimensions and we will quote for the cut blocks or lengths.' },
    ],
    related: ['spring-steel', 'en24', 'hardox'],
    keywords: ['K110 tool steel Johannesburg', 'D2 tool steel South Africa', '1.2379', 'tool steel supplier'],
  },
  {
    slug: 'spring-steel',
    range: 'engineering-steels',
    name: 'Spring Steel',
    short: 'Spring steel sheet up to 3 mm for springs, clips and shims.',
    title: 'Spring Steel Sheet Supplier in Johannesburg',
    description: 'Spring steel sheet up to 3 mm for springs, clips, washers and shims. Cut to size in Johannesburg and delivered nationwide by Apex Metals.',
    intro:
      'Spring steel is a high-carbon steel that returns to shape after bending. We supply it in sheet up to 3 mm thick for flat springs, clips, washers and shims.',
    facts: [
      { label: 'Type', value: 'High-carbon spring steel' },
      { label: 'Thickness', value: 'Sheet up to 3 mm' },
      { label: 'Forms', value: 'Sheet, or cut to size' },
    ],
    uses: ['Flat springs and clips', 'Spring washers', 'Shims and spacers', 'Scraper and doctor blades', 'Latches and retainers'],
    notes: [
      'Tell us the thickness and the part you are making, and we will confirm the grade and condition available.',
    ],
    faqs: [
      { q: 'What thickness of spring steel do you stock?', a: 'Sheet up to 3 mm thick. Ask for the exact thickness you need.' },
    ],
    related: ['k110-tool-steel', 'en9', 'stainless-steel-sheet'],
    keywords: ['spring steel sheet Johannesburg', 'spring steel South Africa', 'spring steel supplier'],
  },

  // ── Bronze & cast iron ──────────────────────────────────────────
  {
    slug: 'phosphor-bronze',
    range: 'bronze-and-cast-iron',
    name: 'Phosphor Bronze PB1 & LG2 Gunmetal',
    short: 'PB1 phosphor bronze and LG2 leaded gunmetal in solid and hollow bar.',
    title: 'Phosphor Bronze PB1 & LG2 in Johannesburg',
    description: 'PB1 phosphor bronze and LG2 gunmetal in solid and hollow bar for bushes, bearings and gears. Cut to length in Johannesburg by Apex Metals.',
    intro:
      'PB1 and LG2 are the two bearing bronzes engineering shops use most. PB1 phosphor bronze is the stronger, harder alloy for gears and heavy loads. LG2 leaded gunmetal machines more easily and suits general bushes, valves and fittings.',
    facts: [
      { label: 'PB1', value: 'Phosphor bronze, CuSn10P, about 10% tin' },
      { label: 'LG2', value: 'Leaded gunmetal, CuSn5Zn5Pb5 (85/5/5/5)' },
      { label: 'Standard', value: 'BS 1400 cast copper alloys, continuously cast bar' },
      { label: 'Forms', value: 'Solid and hollow (cored) round bar, full bars or cut to length' },
    ],
    uses: ['Worm wheels and gears (PB1)', 'Heavily loaded bearings (PB1)', 'General bushes and sleeves (LG2)', 'Valve and pump parts (LG2)', 'Thrust washers'],
    notes: [
      'Hollow bar starts close to the finished size of a bush, which saves boring time and material.',
      'For marine use or higher strength, aluminium bronze AB1 or AB2 is often the better choice.',
    ],
    faqs: [
      { q: 'Should I use PB1 or LG2?', a: 'Use PB1 for gears, worm wheels and heavily loaded bearings. Use LG2 for general bushes, valves and fittings where easy machining matters more than maximum strength.' },
      { q: 'Do you stock hollow bronze bar?', a: 'Yes. Both solid and hollow bar are available. Give us the outside and inside diameters you need.' },
    ],
    related: ['aluminium-bronze', 'cast-iron-bar', 'brass-bar'],
    keywords: ['phosphor bronze Johannesburg', 'PB1 bronze South Africa', 'LG2 gunmetal', 'bronze hollow bar', 'bronze bush material'],
  },
  {
    slug: 'aluminium-bronze',
    range: 'bronze-and-cast-iron',
    name: 'Aluminium Bronze AB1 & AB2',
    short: 'High-strength, corrosion-resistant bronze in solid and hollow bar.',
    title: 'Aluminium Bronze AB1 & AB2 in Johannesburg',
    description: 'AB1 aluminium bronze and AB2 nickel aluminium bronze bar for marine, pump and heavy-wear parts. Cut to length in Johannesburg by Apex Metals.',
    intro:
      'Aluminium bronzes are among the strongest copper alloys. AB1 combines strength with good wear and corrosion resistance. AB2, nickel aluminium bronze, goes further and stands up to seawater and heavy wear.',
    facts: [
      { label: 'AB1', value: 'Aluminium bronze, CuAl10Fe3' },
      { label: 'AB2', value: 'Nickel aluminium bronze, CuAl10Fe5Ni5' },
      { label: 'Standard', value: 'BS 1400 cast copper alloys, continuously cast bar' },
      { label: 'Forms', value: 'Solid and hollow round bar, full bars or cut to length' },
    ],
    uses: ['Marine fittings and propeller parts', 'Pump and valve components', 'Heavy-duty bushes and wear plates', 'Gears and worm wheels', 'Non-sparking tools and parts'],
    notes: [
      'AB2 is the usual choice for seawater and corrosive service; AB1 suits most general high-strength bushes.',
    ],
    faqs: [
      { q: 'What is the difference between AB1 and AB2?', a: 'AB2 contains nickel, which gives higher strength and better resistance to seawater and wear than AB1.' },
      { q: 'Is aluminium bronze stronger than phosphor bronze?', a: 'Generally yes. Aluminium bronzes have higher strength, while phosphor bronze has better bearing properties at high speed.' },
    ],
    related: ['phosphor-bronze', 'cast-iron-bar', 'copper-busbar'],
    keywords: ['aluminium bronze Johannesburg', 'AB2 bronze South Africa', 'nickel aluminium bronze', 'AB1 bronze bar'],
  },
  {
    slug: 'cast-iron-bar',
    range: 'bronze-and-cast-iron',
    name: 'Cast Iron Bar',
    short: 'Continuously cast iron in solid and hollow bar for bushes and hydraulics.',
    title: 'Cast Iron Bar Supplier in Johannesburg',
    description: 'Cast iron round and hollow bar for bushes, pulleys and hydraulic parts. Machines cleanly and damps vibration. Cut to length by Apex Metals.',
    intro:
      'Continuously cast iron bar machines cleanly and the graphite in it acts as a built-in lubricant. It also damps vibration well, which is why it is used for hydraulic parts, bushes and pulleys.',
    facts: [
      { label: 'Type', value: 'Continuously cast iron bar' },
      { label: 'Properties', value: 'Free machining, self-lubricating, good vibration damping' },
      { label: 'Forms', value: 'Solid and hollow round bar, full bars or cut to length' },
    ],
    uses: ['Hydraulic pistons, glands and valves', 'Bushes and bearings', 'Pulleys and gears', 'Machine tool parts', 'Dies and fixtures'],
    notes: [
      'Cast iron is strong in compression but less tolerant of shock than steel. For impact loads, use steel or bronze instead.',
    ],
    faqs: [
      { q: 'Why use cast iron instead of steel?', a: 'It machines faster, wears well against itself and other metals, and damps vibration. Steel is the better choice where parts take impact.' },
    ],
    related: ['phosphor-bronze', 'aluminium-bronze', 'en9'],
    keywords: ['cast iron bar Johannesburg', 'cast iron hollow bar', 'continuous cast iron South Africa'],
  },

  // ── Wear plate ──────────────────────────────────────────────────
  {
    slug: 'hardox',
    range: 'wear-plate',
    name: 'Hardox Wear Plate',
    short: 'Abrasion-resistant steel plate, cut to size for buckets, liners and chutes.',
    title: 'Hardox Plate Supplier in Johannesburg',
    description: 'Hardox wear plate cut to size in Johannesburg for buckets, liners, chutes and tipper bodies. Delivered nationwide by Apex Metals.',
    intro:
      'Hardox is an abrasion-resistant steel plate that lasts many times longer than ordinary plate in wear service, while staying tough enough to bend and weld. We supply it cut to the sizes you need.',
    facts: [
      { label: 'Type', value: 'Quenched abrasion-resistant steel plate' },
      { label: 'Grades', value: 'Named by nominal Brinell hardness, for example Hardox 400, 450 and 500' },
      { label: 'Workshop', value: 'Can be cut, bent and welded with the right procedures' },
      { label: 'Forms', value: 'Plate, cut to size' },
    ],
    uses: ['Excavator and loader buckets', 'Chute and hopper liners', 'Tipper and dump bodies', 'Crusher and screen parts', 'Cutting edges and wear strips'],
    notes: [
      'Tell us the grade, thickness and sizes or send a drawing, and we confirm availability and price.',
      'We also supply Bennox wear plate, cut to size.',
      'Hardox is a registered trademark of SSAB.',
    ],
    faqs: [
      { q: 'Can you cut Hardox to size?', a: 'Yes. Hardox is supplied cut to the sizes you need. Send a sketch or the dimensions and quantities.' },
      { q: 'Which Hardox grade do I need?', a: 'Higher numbers are harder and resist abrasion longer, but are harder to bend. Hardox 400 and 450 are common all-rounders; 500 suits heavier abrasion.' },
      { q: 'Can Hardox be welded?', a: 'Yes, with suitable consumables and, on thicker plate, preheating. Follow the manufacturer’s welding recommendations.' },
    ],
    related: ['k110-tool-steel', 'structural-steel-beams', 'stainless-steel-sheet'],
    keywords: ['Hardox Johannesburg', 'Hardox plate South Africa', 'Hardox 400', 'Hardox 450', 'wear plate supplier'],
  },

  // ── Copper & brass ──────────────────────────────────────────────
  {
    slug: 'copper-busbar',
    range: 'copper-and-brass',
    name: 'Copper Busbar',
    short: 'High-conductivity copper flat bar for switchboards and earthing.',
    title: 'Copper Busbar Supplier in Johannesburg',
    description: 'Copper busbar for switchboards, distribution boards and earthing, cut to length in Johannesburg and delivered nationwide by Apex Metals.',
    intro:
      'Busbar is flat copper bar that carries current inside switchboards, distribution boards and earthing systems. We supply it in the common widths and thicknesses, cut to the lengths on your list.',
    facts: [
      { label: 'Material', value: 'Normally high-conductivity electrolytic copper (Cu-ETP)' },
      { label: 'Forms', value: 'Flat bar in a range of widths and thicknesses' },
      { label: 'Supply', value: 'Full lengths or cut to length' },
    ],
    uses: ['Switchboards and distribution boards', 'Earth bars and bonding', 'Transformer and generator connections', 'Panel building', 'Battery and rectifier links'],
    notes: [
      'Give us the width, thickness, length and number of pieces and we will quote.',
      'We also supply copper round and square bar, tube, sheet and plate.',
    ],
    faqs: [
      { q: 'Can you cut copper busbar to length?', a: 'Yes. Send the sizes and quantities and the bars are cut before delivery.' },
    ],
    related: ['brass-bar', 'aluminium-bronze', 'phosphor-bronze'],
    keywords: ['copper busbar Johannesburg', 'copper busbar South Africa', 'copper flat bar', 'earth bar copper'],
  },
  {
    slug: 'brass-bar',
    range: 'copper-and-brass',
    name: 'Brass Bar',
    short: 'Brass round, square and flat bar for fittings and machined parts.',
    title: 'Brass Bar Supplier in Johannesburg',
    description: 'Brass round, square and flat bar, tube, sheet and plate for fittings and machined parts. Cut to size in Johannesburg by Apex Metals.',
    intro:
      'Brass machines cleanly, resists corrosion and looks good, which is why it is used for fittings, valve parts and turned components. We stock round, square and flat bar as well as tube, sheet and plate.',
    facts: [
      { label: 'Material', value: 'Copper-zinc alloy' },
      { label: 'Bar', value: 'Round, square and flat' },
      { label: 'Also', value: 'Round tube, sheet and plate' },
      { label: 'Supply', value: 'Full lengths or cut to size' },
    ],
    uses: ['Plumbing and gas fittings', 'Valve parts and nozzles', 'Turned and machined components', 'Electrical terminals', 'Plaques, trims and decorative work'],
    notes: [
      'Free-machining brass is the usual choice for turned parts. Tell us what you are making and we will confirm the alloy available.',
    ],
    faqs: [
      { q: 'What is the difference between brass and bronze?', a: 'Brass is copper with zinc and machines very easily. Bronze is copper with tin or aluminium and is stronger and better for bearings and wear.' },
    ],
    related: ['copper-busbar', 'phosphor-bronze', 'en1a'],
    keywords: ['brass bar Johannesburg', 'brass rod South Africa', 'brass supplier Johannesburg', 'brass flat bar'],
  },

  // ── Aluminium ───────────────────────────────────────────────────
  {
    slug: 'aluminium-treadplate',
    range: 'aluminium',
    name: 'Aluminium Treadplate',
    short: 'Light, rust-free chequer plate for trailers, canopies and steps.',
    title: 'Aluminium Treadplate Supplier in Johannesburg',
    description: 'Aluminium treadplate (chequer plate) for trailers, canopies, toolboxes and steps. Full sheets or cut to size in Johannesburg by Apex Metals.',
    intro:
      'Aluminium treadplate has a raised pattern for grip and weighs about a third as much as steel. It does not rust, so it is the go-to sheet for trailers, bakkie canopies, toolboxes and steps.',
    facts: [
      { label: 'Material', value: 'Aluminium sheet with a raised anti-slip pattern' },
      { label: 'Weight', value: 'About a third of the weight of steel plate' },
      { label: 'Supply', value: 'Full sheets or cut to size' },
    ],
    uses: ['Trailer floors and sides', 'Bakkie canopies and toolboxes', 'Steps, ramps and walkways', 'Truck body cladding', 'Wall and corner protection'],
    notes: [
      'Tell us the thickness and the sheet or cut sizes you need. We also stock plain aluminium sheet and plate, angle, channel, tube and bar.',
    ],
    faqs: [
      { q: 'Is aluminium treadplate the same as chequer plate?', a: 'Yes. Treadplate, chequer plate and checker plate are names for the same patterned sheet.' },
      { q: 'Can you cut treadplate to size?', a: 'Yes. Send the sizes and quantities and we will quote for cut pieces.' },
    ],
    related: ['stainless-steel-sheet', 'stainless-steel-tube', 'angle-iron-and-channel'],
    keywords: ['aluminium treadplate Johannesburg', 'aluminium chequer plate South Africa', 'checker plate aluminium', 'aluminium sheet Johannesburg'],
  },

  // ── Stainless ───────────────────────────────────────────────────
  {
    slug: 'stainless-steel-tube',
    range: 'stainless-steel',
    name: 'Stainless Steel Tube',
    short: 'Round, square and rectangular stainless tube for balustrades and frames.',
    title: 'Stainless Steel Tube Supplier in Johannesburg',
    description: 'Stainless steel round, square and rectangular tube for balustrades, handrails and frames. Cut to length in Johannesburg by Apex Metals.',
    intro:
      'Stainless tube is used wherever a frame or rail has to stay clean and rust-free: balustrades, handrails, food equipment and furniture. We stock round, square and rectangular tube and cut it to length.',
    facts: [
      { label: 'Shapes', value: 'Round, square and rectangular' },
      { label: 'Common grades', value: '304 for general use, 316 for coastal and chemical exposure' },
      { label: 'Supply', value: 'Full lengths or cut to size' },
    ],
    uses: ['Balustrades and handrails', 'Food and dairy equipment frames', 'Shopfitting and furniture', 'Process and plant work', 'Marine fittings'],
    notes: [
      'Tell us whether appearance matters. Finish affects price, so we will quote the right one for the job.',
      'For pressure piping, see our stainless schedule pipe.',
    ],
    faqs: [
      { q: 'Should I use 304 or 316 stainless tube?', a: '304 suits most indoor and general work. Use 316 near the coast or around chemicals, where its molybdenum content resists pitting.' },
    ],
    related: ['stainless-steel-sheet', 'aluminium-treadplate', 'copper-busbar'],
    keywords: ['stainless steel tube Johannesburg', 'stainless square tube South Africa', 'stainless handrail tube', '304 stainless tube'],
  },
  {
    slug: 'stainless-steel-sheet',
    range: 'stainless-steel',
    name: 'Stainless Steel Sheet & Plate',
    short: 'Stainless sheet, plate and treadplate, full sheets or cut to size.',
    title: 'Stainless Steel Sheet & Plate in Johannesburg',
    description: 'Stainless steel sheet, plate and treadplate for kitchens, food equipment, tanks and cladding. Cut to size in Johannesburg by Apex Metals.',
    intro:
      'Stainless sheet and plate are the base material for commercial kitchens, food and dairy equipment, tanks and cladding. We supply full sheets or cut pieces, and stainless treadplate for floors and steps.',
    facts: [
      { label: 'Forms', value: 'Sheet, plate and treadplate' },
      { label: 'Common grades', value: '304 for general use, 316 for coastal and chemical exposure' },
      { label: 'Supply', value: 'Full sheets or cut to size' },
    ],
    uses: ['Commercial kitchens and splashbacks', 'Food and dairy equipment', 'Tanks and hoppers', 'Cladding and signage', 'Slip-resistant floors and steps'],
    notes: ['Give us the thickness, grade and sizes and we confirm what is in stock.'],
    faqs: [
      { q: 'Do you stock stainless treadplate?', a: 'Yes, stainless treadplate is part of the range alongside sheet and plate.' },
    ],
    related: ['stainless-steel-tube', 'aluminium-treadplate', 'hardox'],
    keywords: ['stainless steel sheet Johannesburg', 'stainless plate South Africa', 'stainless treadplate', '304 stainless sheet'],
  },

  // ── Mild steel ──────────────────────────────────────────────────
  {
    slug: 'structural-steel-beams',
    range: 'mild-steel',
    name: 'Steel Beams & Columns',
    short: 'Universal beams and columns, IPE sections and joists.',
    title: 'Steel Beams Supplier in Johannesburg',
    description: 'Universal beams, universal columns, IPE sections and joists for frames, mezzanines and roofs. Cut to length in Johannesburg by Apex Metals.',
    intro:
      'Structural beams and columns carry the load in frames, mezzanines, roofs and gantries. We supply universal beams and columns, IPE sections and joists, cut to the lengths on your drawings.',
    facts: [
      { label: 'Universal beams', value: 'I-sections, deeper than they are wide' },
      { label: 'Universal columns', value: 'H-sections, close to square' },
      { label: 'IPE and joists', value: 'Parallel and taper flange I-beams' },
      { label: 'Supply', value: 'Full lengths or cut to length' },
    ],
    uses: ['Building and warehouse frames', 'Mezzanine floors', 'Lintels and support beams', 'Gantries and crane rails', 'Trailer and machine chassis'],
    notes: ['Section sizes for a structure should come from your engineer or approved drawings. Send the schedule and we will quote.'],
    faqs: [
      { q: 'What is the difference between a beam and a column section?', a: 'Universal beams are deeper than they are wide and work best in bending. Universal columns are close to square and carry compression loads well.' },
      { q: 'Can you cut beams to length?', a: 'Yes. Send your cutting list and the beams are cut before delivery.' },
    ],
    related: ['angle-iron-and-channel', 'ibr-and-corrugated-sheeting', 'expanded-metal-and-grating'],
    keywords: ['steel beams Johannesburg', 'I beam supplier South Africa', 'H beam Johannesburg', 'IPE beams', 'universal beams'],
  },
  {
    slug: 'angle-iron-and-channel',
    range: 'mild-steel',
    name: 'Angle Iron & Channel',
    short: 'Mild steel angle and channel for frames, supports and trailers.',
    title: 'Angle Iron & Channel in Johannesburg',
    description: 'Mild steel angle iron and channel for frames, supports, bracing and trailers. Full lengths or cut to size in Johannesburg by Apex Metals.',
    intro:
      'Angle iron and channel are the everyday sections for frames, brackets, bracing and trailers. We stock the common sizes and cut them to your list.',
    facts: [
      { label: 'Angle', value: 'L-shaped mild steel section' },
      { label: 'Channel', value: 'U-shaped mild steel section' },
      { label: 'Supply', value: 'Full lengths or cut to size' },
    ],
    uses: ['Frames and racks', 'Brackets and supports', 'Bracing and purlins', 'Trailer chassis', 'Gates and fencing frames'],
    notes: ['Send the sizes, lengths and quantities. We also stock round, square and flat bar and square and round tube.'],
    faqs: [
      { q: 'Do you sell single lengths of angle iron?', a: 'Yes. A single length or a bundle, cut or uncut.' },
    ],
    related: ['structural-steel-beams', 'expanded-metal-and-grating', 'ibr-and-corrugated-sheeting'],
    keywords: ['angle iron Johannesburg', 'steel channel Johannesburg', 'angle iron supplier South Africa', 'mild steel angle'],
  },
  {
    slug: 'ibr-and-corrugated-sheeting',
    range: 'mild-steel',
    name: 'IBR & Corrugated Sheeting',
    short: 'IBR and corrugated roof and wall sheeting.',
    title: 'IBR & Corrugated Roof Sheeting in Johannesburg',
    description: 'IBR and corrugated steel roof and wall sheeting for roofs, carports and sheds. Cut to length and delivered nationwide by Apex Metals.',
    intro:
      'IBR and corrugated sheeting are the two most common steel roof and wall profiles in South Africa. IBR has a flat trapezoidal rib that spans further; corrugated has the classic rounded wave.',
    facts: [
      { label: 'IBR', value: 'Trapezoidal rib profile, good spanning strength' },
      { label: 'Corrugated', value: 'Rounded wave profile' },
      { label: 'Supply', value: 'Sheets cut to the lengths you need' },
    ],
    uses: ['Roofs and wall cladding', 'Carports and shade structures', 'Sheds and outbuildings', 'Farm structures', 'Site hoarding'],
    notes: ['Tell us the profile, lengths and number of sheets and we will quote, including what finishes are in stock.'],
    faqs: [
      { q: 'Should I use IBR or corrugated?', a: 'IBR spans further between purlins and drains well on low pitches. Corrugated is often chosen for its look and suits steeper roofs.' },
    ],
    related: ['structural-steel-beams', 'angle-iron-and-channel', 'expanded-metal-and-grating'],
    keywords: ['IBR sheeting Johannesburg', 'corrugated roof sheets Johannesburg', 'roof sheeting South Africa', 'IBR roof sheets'],
  },
  {
    slug: 'expanded-metal-and-grating',
    range: 'mild-steel',
    name: 'Expanded Metal, Grating & Palisades',
    short: 'Expanded metal in all sizes, grating, handrailing and palisades.',
    title: 'Expanded Metal & Grating in Johannesburg',
    description: 'Expanded metal in all sizes, steel grating, handrailing and palisade fencing. Cut to size in Johannesburg and delivered nationwide by Apex Metals.',
    intro:
      'For walkways, guards and security, we supply expanded metal in all sizes, steel grating, handrailing and palisades.',
    facts: [
      { label: 'Expanded metal', value: 'All sizes, for screens, guards and walkways' },
      { label: 'Grating', value: 'For walkways, platforms and drain covers' },
      { label: 'Handrailing', value: 'For stairs, walkways and platforms' },
      { label: 'Palisades', value: 'For security fencing' },
    ],
    uses: ['Machine guards and screens', 'Walkways and platforms', 'Stair treads and landings', 'Security fencing', 'Drain and trench covers'],
    notes: ['Send the mesh size or grating type with your sizes and quantities and we will quote.'],
    faqs: [
      { q: 'What sizes of expanded metal do you stock?', a: 'All the standard sizes. Tell us the opening size, thickness and sheet size you need.' },
    ],
    related: ['angle-iron-and-channel', 'structural-steel-beams', 'ibr-and-corrugated-sheeting'],
    keywords: ['expanded metal Johannesburg', 'steel grating South Africa', 'palisade fencing Johannesburg', 'handrailing steel'],
  },
]

export function getItem(range: string, slug: string) {
  return items.find((i) => i.range === range && i.slug === slug)
}

export function itemsForRange(range: string) {
  return items.filter((i) => i.range === range)
}

export function itemBySlug(slug: string) {
  return items.find((i) => i.slug === slug)
}
