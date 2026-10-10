// Buyer's guides: the questions customers ask before they order, answered once
// in full. Figures are standard published values; the grade and condition on
// the mill certificate always decide.
//
// A paragraph is a plain string and may contain internal links written as
// [text](/path). Lists and tables are objects.

export type Block =
  | string
  | { list: string[] }
  | { table: { caption: string; head: string[]; rows: string[][] } }

export interface Guide {
  slug: string
  title: string
  metaTitle: string
  description: string
  intro: string
  published: string
  updated: string
  ranges: string[]
  items: string[]
  keywords: string[]
  sections: { id: string; heading: string; body: Block[] }[]
}

export const guides: Guide[] = [
  {
    slug: 'en19-vs-en24',
    title: 'EN19 vs EN24: which alloy steel to order',
    metaTitle: 'EN19 vs EN24: Which Alloy Steel to Order',
    description:
      'EN19 and EN24 compared: composition, Condition T strength, section size limits, equivalents, cost, and which one to order for shafts, gears and pins.',
    intro:
      'Both are alloy steels supplied hardened and tempered to Condition T, and on paper they reach the same strength. The difference is how deep that strength goes into a thick bar, how well the steel takes a shock, and the price.',
    published: '2026-10-10',
    updated: '2026-10-10',
    ranges: ['engineering-steels'],
    items: ['en19', 'en24'],
    keywords: ['EN19 vs EN24', 'difference between EN19 and EN24', 'EN19 or EN24 for shafts', 'EN24T', 'EN19T'],
    sections: [
      {
        id: 'short-answer',
        heading: 'The short answer',
        body: [
          'Order [EN19](/products/engineering-steels/en19) for most shafts, gears, pins and bolts up to about 100 mm diameter. Order [EN24](/products/engineering-steels/en24) when the part is bigger than that, takes heavy shock loads, or the drawing calls for a strength above Condition T.',
        ],
      },
      {
        id: 'composition',
        heading: 'What is in them',
        body: [
          {
            table: {
              caption: 'Composition, % by weight (BS 970: 709M40 and 817M40)',
              head: ['Element', 'EN19', 'EN24'],
              rows: [
                ['Carbon', '0.36 – 0.44', '0.36 – 0.44'],
                ['Manganese', '0.70 – 1.00', '0.45 – 0.70'],
                ['Chromium', '0.90 – 1.20', '1.00 – 1.40'],
                ['Molybdenum', '0.25 – 0.35', '0.20 – 0.35'],
                ['Nickel', '–', '1.30 – 1.70'],
              ],
            },
          },
          'The nickel in EN24 is what separates them. It lets the steel harden further into a thick section and makes it tougher, so it is less likely to crack under impact.',
        ],
      },
      {
        id: 'strength',
        heading: 'Strength in Condition T',
        body: [
          'Condition T is the hardened and tempered state most stockists supply. In that condition both grades are specified at 850 to 1000 MPa tensile strength and 248 to 302 HB. A 40 mm bar of either will do the same job.',
          'Section size is where they part ways. Quenching only hardens so deep, so the specified properties of EN19T hold up to about 100 mm ruling section, while EN24T holds them up to about 250 mm. On a large shaft, EN19 can be noticeably softer in the middle than at the surface.',
          'EN24 is also the usual choice when a drawing calls for Condition V or W, the higher-strength conditions above T.',
        ],
      },
      {
        id: 'equivalents',
        heading: 'Equivalent grades',
        body: [
          {
            table: {
              caption: 'Close equivalents. Check the limits if a drawing quotes a specific standard.',
              head: ['Standard', 'EN19', 'EN24'],
              rows: [
                ['BS 970', '709M40', '817M40'],
                ['EN / DIN', '42CrMo4 (1.7225)', '34CrNiMo6 (1.6582)'],
                ['AISI / SAE', '4140', '4340'],
              ],
            },
          },
        ],
      },
      {
        id: 'workshop',
        heading: 'Machining, hardening and welding',
        body: [
          'Both machine well in Condition T. Both can be induction or flame hardened, or nitrided, for a hard wearing surface over a tough core.',
          'Neither is a welding steel. If a weld cannot be avoided it needs preheat, slow cooling and stress relief, and it is best kept off load-bearing sections.',
        ],
      },
      {
        id: 'cost',
        heading: 'Cost and availability',
        body: [
          'EN24 costs more because of the nickel, and its price moves with the nickel market. EN19 is usually the cheaper and more widely stocked of the two, so it is the sensible default when the part does not need what EN24 adds.',
        ],
      },
      {
        id: 'which',
        heading: 'Which one for your part',
        body: [
          {
            list: [
              'Shafts, axles and spindles up to about 100 mm: EN19',
              'Gears and couplings in normal service: EN19',
              'High-tensile bolts and studs: EN19',
              'Shafts and pins over 100 mm: EN24',
              'Parts that take repeated shock, such as crusher, mining and earthmoving pins: EN24',
              'Drawings that call for Condition V or above: EN24',
            ],
          },
          'For gears and cams that need a very hard surface, a case-hardening steel such as [EN36B](/products/engineering-steels/en36b) may suit better than either.',
        ],
      },
    ],
  },
  {
    slug: '304-vs-316-stainless-steel',
    title: '304 vs 316 stainless steel: which grade to use',
    metaTitle: '304 vs 316 Stainless Steel: Which Grade to Use',
    description:
      '304 and 316 stainless steel compared: what molybdenum does, coastal and chemical use, L grades for welding, cost, and how to tell the two apart.',
    intro:
      'Most stainless steel sold in South Africa is one of two grades, 304 or 316. They look identical. The difference is about 2% molybdenum in 316, and that decides how the steel copes with salt and chemicals.',
    published: '2026-10-10',
    updated: '2026-10-10',
    ranges: ['stainless-steel', 'schedule-pipe'],
    items: ['stainless-steel-sheet', 'stainless-steel-tube'],
    keywords: ['304 vs 316 stainless steel', 'difference between 304 and 316', '316 stainless coastal', '304L 316L', 'marine grade stainless South Africa'],
    sections: [
      {
        id: 'short-answer',
        heading: 'The short answer',
        body: [
          'Use 304 indoors and inland: kitchens, food equipment, frames and balustrades in Johannesburg, Pretoria and the rest of the Highveld. Use 316 near the sea, around swimming pools, and wherever salt, brine or process chemicals reach the steel.',
        ],
      },
      {
        id: 'composition',
        heading: 'What is in them',
        body: [
          {
            table: {
              caption: 'Composition, % by weight (EN 10088: 1.4301 and 1.4401)',
              head: ['Element', '304', '316'],
              rows: [
                ['Chromium', '17.5 – 19.5', '16.5 – 18.5'],
                ['Nickel', '8.0 – 10.5', '10.0 – 13.0'],
                ['Molybdenum', '–', '2.0 – 2.5'],
                ['Carbon, max', '0.07', '0.07'],
              ],
            },
          },
        ],
      },
      {
        id: 'molybdenum',
        heading: 'What the molybdenum does',
        body: [
          'Stainless steel resists rust because of a thin chromium oxide film on its surface. Chlorides, found in sea air, pool water, bleach and brine, break that film down at small points and eat pits into the steel. Molybdenum makes the film much harder to break.',
          'The usual way to compare grades is the pitting resistance number, PREN. 304 scores about 19 and 316 about 24. Higher is better.',
        ],
      },
      {
        id: 'where',
        heading: 'Where each grade belongs',
        body: [
          {
            table: {
              caption: 'Typical choices',
              head: ['Use', 'Grade'],
              rows: [
                ['Commercial kitchens, splashbacks and food equipment', '304'],
                ['Balustrades, handrails and frames inland', '304'],
                ['Anything within reach of sea air: Durban, Cape Town, Gqeberha, East London, Richards Bay', '316'],
                ['Swimming pools and pool surrounds', '316'],
                ['Boat and marine fittings', '316'],
                ['Chemical, pharmaceutical and brine handling', '316'],
                ['Food processing with salty or acidic products', '316'],
              ],
            },
          },
        ],
      },
      {
        id: 'l-grades',
        heading: '304L and 316L',
        body: [
          'The L grades limit carbon to 0.03%. Welding heats the steel beside the weld, and with more carbon present, chromium carbides can form there and leave that zone open to corrosion. On thin sheet the difference is small. For welded plate and pipe in corrosive service, ask for the L grade.',
          'Much of the material sold today is dual-certified, meeting both 304 and 304L, or 316 and 316L.',
        ],
      },
      {
        id: 'tell-apart',
        heading: 'Telling them apart',
        body: [
          'You cannot tell 304 from 316 by eye or with a magnet. Both are non-magnetic when annealed, and both can turn slightly magnetic after bending or cold work. The reliable checks are the mill certificate, a molybdenum spot test, or a handheld XRF analyser.',
        ],
      },
      {
        id: 'cost',
        heading: 'Cost',
        body: [
          '316 costs noticeably more than 304, mainly because of the molybdenum and the extra nickel. Using it where 304 would do is money spent for nothing. Using 304 at the coast usually shows up as brown tea staining on the surface, and in time as pitting.',
          'We supply both grades in [sheet and plate](/products/stainless-steel/stainless-steel-sheet), [tube](/products/stainless-steel/stainless-steel-tube), bar and [schedule pipe](/products/schedule-pipe). Tell us the grade with the sizes and we confirm what is in stock.',
        ],
      },
    ],
  },
  {
    slug: 'hardox-400-vs-450-vs-500',
    title: 'Hardox 400 vs 450 vs 500: choosing a grade',
    metaTitle: 'Hardox 400 vs 450 vs 500: Choosing a Grade',
    description:
      'Hardox 400, 450 and 500 compared: hardness, wear life, bending, cutting and welding, and which grade suits buckets, liners, chutes and tipper bodies.',
    intro:
      'Hardox grades are named after their nominal Brinell hardness. Harder plate lasts longer against abrasion but is harder to bend, drill and weld. Picking a grade is a trade between wear life and how much work the plate needs before it goes into service.',
    published: '2026-10-10',
    updated: '2026-10-10',
    ranges: ['wear-plate'],
    items: ['hardox'],
    keywords: ['Hardox 400 vs 450', 'Hardox 450 vs 500', 'Hardox grades', 'which Hardox to use', 'Hardox hardness'],
    sections: [
      {
        id: 'hardness',
        heading: 'Hardness of each grade',
        body: [
          {
            table: {
              caption: 'Hardness ranges as published by SSAB. Exact values vary with plate thickness.',
              head: ['Grade', 'Hardness (HBW)', 'In short'],
              rows: [
                ['Hardox 400', '370 – 430', 'The easiest of the three to bend and machine'],
                ['Hardox 450', '425 – 475', 'The common all-rounder'],
                ['Hardox 500', '470 – 530', 'Longest wear life, least forgiving to bend'],
              ],
            },
          },
        ],
      },
      {
        id: 'wear',
        heading: 'Wear life',
        body: [
          'Against sliding abrasion, such as sand, ore and gravel moving across the plate, wear life rises with hardness. Moving up a grade either makes a liner last longer at the same thickness or lets you use thinner, lighter plate for the same life.',
          'Under heavy impact, such as large rock dropped from height, toughness matters as much as hardness. The softer grades take a hit with less risk of cracking.',
        ],
      },
      {
        id: 'bending',
        heading: 'Bending and forming',
        body: [
          'Harder plate needs a larger bend radius and more press force, and springs back more. Hardox 400 bends tightest and 500 needs the most generous radius. SSAB publishes the minimum bend radius for every grade and thickness.',
          'If the part is bent, tell us the plate thickness and the inside radius so we can confirm the grade suits it.',
        ],
      },
      {
        id: 'cutting-welding',
        heading: 'Cutting, drilling and welding',
        body: [
          'All three can be cut by plasma, laser, waterjet or oxy-fuel. Thick plate may need preheating before thermal cutting to stop the edges cracking.',
          'Drilling and machining get harder as hardness rises, and carbide tooling is the norm on 500. All three are weldable using low-hydrogen consumables and the preheat SSAB recommends for the thickness.',
        ],
      },
      {
        id: 'which',
        heading: 'Which grade for which job',
        body: [
          {
            list: [
              'Parts with tight bends or a lot of drilling and machining: Hardox 400',
              'Bucket shells, tipper and dump bodies, general liners: Hardox 450',
              'Chute and hopper liners, cutting edges and wear strips under heavy sliding abrasion: Hardox 450 or 500',
              'Flat liners that are bolted in rather than bent: Hardox 500 for the longest life',
            ],
          },
          'These are typical choices, not rules. The material being handled, the impact and the thickness all play a part. Send us the job and we will suggest a grade, or read more about [Hardox plate](/products/wear-plate/hardox) and our [wear plate range](/products/wear-plate).',
          'Hardox is a registered trademark of SSAB.',
        ],
      },
    ],
  },
  {
    slug: 'schedule-40-vs-80-pipe-sizes',
    title: 'Schedule 40 vs schedule 80 pipe sizes in mm',
    metaTitle: 'Schedule 40 vs 80 Pipe Sizes Chart in mm',
    description:
      'Schedule 40 and 80 pipe dimensions in millimetres: outside diameter and wall thickness for ½ to 12 inch pipe, what schedule means, and how to order.',
    intro:
      'Pipe is named by a nominal size and a schedule. The nominal size fixes the outside diameter and the schedule sets the wall thickness. Schedule 80 has a thicker wall than schedule 40 on the same outside diameter, so it handles more pressure but has a smaller bore.',
    published: '2026-10-10',
    updated: '2026-10-10',
    ranges: ['schedule-pipe', 'stainless-steel'],
    items: [],
    keywords: ['schedule 40 pipe dimensions mm', 'schedule 80 pipe dimensions', 'pipe schedule chart', 'schedule 40 vs 80', 'schedule pipe South Africa'],
    sections: [
      {
        id: 'chart',
        heading: 'Sizes chart',
        body: [
          {
            table: {
              caption:
                'Dimensions to ASME B36.10M. Stainless pipe to ASME B36.19M has the same outside diameters, and the same walls in schedule 40S and 80S up to 8 inch.',
              head: ['Nominal size', 'DN', 'Outside Ø (mm)', 'Sch 40 wall (mm)', 'Sch 80 wall (mm)'],
              rows: [
                ['½"', '15', '21.3', '2.77', '3.73'],
                ['¾"', '20', '26.7', '2.87', '3.91'],
                ['1"', '25', '33.4', '3.38', '4.55'],
                ['1¼"', '32', '42.2', '3.56', '4.85'],
                ['1½"', '40', '48.3', '3.68', '5.08'],
                ['2"', '50', '60.3', '3.91', '5.54'],
                ['2½"', '65', '73.0', '5.16', '7.01'],
                ['3"', '80', '88.9', '5.49', '7.62'],
                ['4"', '100', '114.3', '6.02', '8.56'],
                ['5"', '125', '141.3', '6.55', '9.53'],
                ['6"', '150', '168.3', '7.11', '10.97'],
                ['8"', '200', '219.1', '8.18', '12.70'],
                ['10"', '250', '273.1', '9.27', '15.09'],
                ['12"', '300', '323.9', '10.31', '17.48'],
              ],
            },
          },
        ],
      },
      {
        id: 'schedule',
        heading: 'What schedule means',
        body: [
          'Schedule is a series of wall thicknesses, not a pressure rating on its own. The same schedule gives a thicker wall as the pipe gets bigger, so 6 inch schedule 40 has a far heavier wall than 1 inch schedule 40.',
          'Inside diameter is the outside diameter less two walls. A 2 inch schedule 40 pipe has a bore of about 52.5 mm. In schedule 80 it is about 49.2 mm.',
        ],
      },
      {
        id: 'nominal',
        heading: 'Nominal size is not the outside diameter',
        body: [
          'Up to 12 inch the nominal size is a trade name, not a measurement. A 2 inch pipe measures 60.3 mm across the outside. To identify a pipe you already have, measure the outside diameter with a vernier and the wall at a cut end, then match both to the chart.',
        ],
      },
      {
        id: 'which',
        heading: 'Schedule 40 or 80?',
        body: [
          'Schedule 40 is the standard wall for most water, air and general process lines, and for structural uses such as posts and handrails. Schedule 80 is chosen for higher pressure, for pipe that will be threaded, since the thread is cut into the wall, and where corrosion or erosion will thin the wall over time.',
          'The pressure a pipe may carry depends on the material, the temperature and the design code. Take the rating from your engineer or the code, not from the schedule alone.',
        ],
      },
      {
        id: 'ordering',
        heading: 'Ordering schedule pipe',
        body: [
          {
            list: [
              'Nominal size, or the outside diameter if you are matching existing pipe',
              'Schedule, for example 40 or 80',
              'Material: mild steel, or stainless with the grade (see [304 vs 316](/guides/304-vs-316-stainless-steel))',
              'Full lengths, or the cut lengths you need',
              'Quantity and delivery town',
            ],
          },
          'We stock mild steel and stainless [schedule pipe](/products/schedule-pipe) in full lengths or cut to size.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-order-metal-cut-to-size',
    title: 'How to order metal cut to size',
    metaTitle: 'How to Order Metal Cut to Size: Cutting Lists',
    description:
      'What to put on a metal cutting list so the quote comes back right first time: material and grade, shape, sizes, lengths, quantities, tolerances and delivery.',
    intro:
      'Most delays on a metal order come from one missing detail on the list: a grade, a wall thickness, or whether a size is inside or outside. This is what we need to price and cut an order right the first time.',
    published: '2026-10-10',
    updated: '2026-10-10',
    ranges: ['mild-steel', 'engineering-steels', 'stainless-steel', 'aluminium'],
    items: [],
    keywords: ['metal cut to size Johannesburg', 'steel cut to size', 'cutting list', 'how to order steel', 'order metal online South Africa'],
    sections: [
      {
        id: 'five-things',
        heading: 'Every line needs five things',
        body: [
          {
            list: [
              'Material and grade: mild steel, 304 stainless, EN19T, aluminium and so on',
              'Shape: round bar, flat bar, square tube, angle, channel, plate',
              'Section size: diameter, width × thickness, or outside size × wall',
              'Length of each piece, or "full length"',
              'Quantity',
            ],
          },
          {
            table: {
              caption: 'A cutting list that can be priced as it stands',
              head: ['Material', 'Shape', 'Section', 'Length', 'Qty'],
              rows: [
                ['Mild steel', 'Flat bar', '50 × 8 mm', '1 200 mm', '12'],
                ['EN19T', 'Round bar', 'Ø75 mm', '300 mm', '4'],
                ['304 stainless', 'Square tube', '40 × 40 × 1.5 mm', 'Full length', '6'],
                ['Hardox 450', 'Plate', '10 mm', '600 × 400 mm', '2'],
              ],
            },
          },
        ],
      },
      {
        id: 'mix-ups',
        heading: 'Sizes that cause mix-ups',
        body: [
          {
            list: [
              'Tube: give the outside size and the wall thickness. Round tube is sold by outside diameter, while pipe goes by nominal size and schedule (see the [pipe sizes chart](/guides/schedule-40-vs-80-pipe-sizes)).',
              'Plate and sheet: thickness first, then length × width.',
              'Angle and channel: both leg or flange sizes and the thickness, for example 50 × 50 × 5 mm angle.',
              'Diameter or radius: write Ø for diameter so there is no doubt.',
              'Units: millimetres throughout. If a drawing is in inches, say so.',
            ],
          },
        ],
      },
      {
        id: 'tolerances',
        heading: 'Tolerances and machining allowance',
        body: [
          'If a length is critical, mark it on the line and give the tolerance you need.',
          'If the part will be machined, order the bar a size above the finished size. A shaft that finishes at 48 mm is usually cut from 50 mm bar. Bright bar such as EN3B or EN1A comes closer to size and needs less taken off.',
        ],
      },
      {
        id: 'full-lengths',
        heading: 'Full lengths or cut pieces',
        body: [
          'Bar, tube and sections come in standard mill lengths, commonly 6 metres. If you need most of a length, buying it whole can work out cheaper than paying for cuts and offcuts. If you need a few short pieces, cut pieces save you storing and scrapping the rest. Ask and we will price both.',
        ],
      },
      {
        id: 'delivery',
        heading: 'Delivery details',
        body: [
          'Add the delivery town or address, the date you need it, and anything that limits access on site, such as a narrow gate or no forklift. Long lengths need a vehicle that can carry them, so mention it if a long truck cannot reach you.',
        ],
      },
      {
        id: 'sending',
        heading: 'Sending the list',
        body: [
          'Type it into the [quote form](/contact#quote), send it on WhatsApp, or email a photo of a handwritten list or a drawing. We reply with a written price. See [our services](/services) for what we cut and deliver.',
        ],
      },
    ],
  },
]

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug)
}

export function guidesForItem(slug: string) {
  return guides.filter((g) => g.items.includes(slug))
}

export function guidesForRange(slug: string) {
  return guides.filter((g) => g.ranges.includes(slug))
}

// Plain text of a block, for word counts and llms.txt
export function blockText(b: Block): string {
  const strip = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  if (typeof b === 'string') return strip(b)
  if ('list' in b) return b.list.map(strip).join(' ')
  return [b.table.caption, ...b.table.head, ...b.table.rows.flat()].join(' ')
}

export function readingMinutes(g: Guide) {
  const words = [g.intro, ...g.sections.flatMap((s) => [s.heading, ...s.body.map(blockText)])]
    .join(' ')
    .split(/\s+/).length
  return Math.max(2, Math.round(words / 200))
}
