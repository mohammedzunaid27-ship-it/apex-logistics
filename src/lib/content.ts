// All business copy lives here so it can be corrected in one place.
// Product ranges are typical merchant stock. Confirm against the yard before launch.

export type ProfileKey = 'ibeam' | 'plate' | 'tube' | 'bar' | 'ingot' | 'mesh'

export type PhotoKey =
  | 'weldSparks'
  | 'weldDark'
  | 'weldMask'
  | 'weldSite'
  | 'pipes'
  | 'pipesPile'
  | 'girders'

// Unsplash photo ids (free Unsplash License). Swap for yard photos when available.
export const photos: Record<PhotoKey, { id: string; alt: string }> = {
  weldSparks: { id: 'FQynd63cHeQ', alt: 'Welder joining steel with sparks spraying from the arc' },
  weldDark: { id: 'd9Xff2E37ak', alt: 'Welder working on a steel part in a dark workshop' },
  weldMask: { id: 'dni5FT1QXvk', alt: 'Fabricator in a respirator welding a steel component' },
  weldSite: { id: 'jcm9Qo8O7kw', alt: 'Welder on a construction site with sparks against the evening sky' },
  pipes: { id: 'IMe9ChGGUq8', alt: 'Stack of steel pipes seen end on' },
  pipesPile: { id: 'LT-oz1yj0_0', alt: 'Pile of steel tube lengths in a stockyard' },
  girders: { id: 'j4FjddHQTDE', alt: 'Steel girder framework of a large industrial structure' },
}

export interface Product {
  slug: string
  name: string
  profile: ProfileKey
  photo: PhotoKey
  short: string
  intro: string
  items: { name: string; spec: string }[]
  lengths: string
  uses: string[]
  keywords: string[]
  faqs: { q: string; a: string }[]
}

export const products: Product[] = [
  {
    slug: 'structural-steel',
    name: 'Structural Steel',
    profile: 'ibeam',
    photo: 'girders',
    short: 'I-beams, H-sections, channel and angle for frames, roofs and mezzanines.',
    intro:
      'The heavy sections that hold a building up. We keep the common sizes on the floor and cut them to your lengths, so the steel arrives ready to fit instead of ready to trim.',
    items: [
      { name: 'IPE I-beams', spec: 'Parallel flange, 80 to 300 mm deep' },
      { name: 'H-sections', spec: 'Columns and H-beams, 152 to 305 mm' },
      { name: 'PFC channel', spec: 'Parallel flange channel, 76 to 300 mm' },
      { name: 'Equal angle', spec: '20 × 20 to 150 × 150 mm' },
      { name: 'Unequal angle', spec: '40 × 20 to 150 × 90 mm' },
      { name: 'T-sections', spec: 'Split from I-sections on request' },
    ],
    lengths: 'Stock lengths of 6, 9 and 12 m, or cut to your schedule.',
    uses: [
      'Portal frames and warehouses',
      'Mezzanine floors',
      'Roof trusses and purlins',
      'Lintels and support beams',
      'Gantries and crane rails',
    ],
    keywords: [
      'structural steel Johannesburg',
      'I-beam supplier Johannesburg',
      'H-beam Gauteng',
      'channel iron',
      'angle iron Johannesburg',
    ],
    faqs: [
      {
        q: 'Can you cut beams and channel to length?',
        a: 'Yes. Send your cutting list and the sections are cut to length in the yard before they are loaded.',
      },
      {
        q: 'Which lengths do you stock?',
        a: 'The common sections are stocked in 6, 9 and 12 m lengths. Heavier or less common sections can be ordered in. Ask and we will give you a lead time.',
      },
      {
        q: 'Can you help me pick a section size?',
        a: 'We can tell you what is available and what is commonly used, but sizes for a structure should come from your engineer or the approved drawings.',
      },
    ],
  },
  {
    slug: 'sheet-and-plate',
    name: 'Sheet & Plate',
    profile: 'plate',
    photo: 'weldMask',
    short: 'Hot rolled, cold rolled and galvanised sheet, chequer plate and mild steel plate.',
    intro:
      'Flat steel for cladding, flooring, brackets and fabrication. Buy full sheets, or have us guillotine and fold them so the pieces go straight onto the job.',
    items: [
      { name: 'Hot rolled sheet', spec: '1.6 to 4.5 mm' },
      { name: 'Cold rolled sheet', spec: '0.5 to 3 mm, clean finish for painting' },
      { name: 'Galvanised sheet', spec: '0.4 to 3 mm, zinc coated' },
      { name: 'Chequer plate', spec: '3 to 8 mm, raised pattern for floors and steps' },
      { name: 'Mild steel plate', spec: '5 to 25 mm, thicker on request' },
      { name: 'Roof sheeting', spec: 'IBR and corrugated profiles' },
    ],
    lengths: 'Full sheets of 2.5 × 1.225 m and 3 × 1.5 m, or guillotined to size.',
    uses: [
      'Cladding and flashings',
      'Floors, ramps and stair treads',
      'Base plates, brackets and gussets',
      'Trailer and truck bodies',
      'Enclosures and ducting',
    ],
    keywords: [
      'steel sheet Johannesburg',
      'chequer plate Johannesburg',
      'galvanised sheet Gauteng',
      'mild steel plate supplier',
      'sheet metal cutting Johannesburg',
    ],
    faqs: [
      {
        q: 'Do you sell part sheets?',
        a: 'We guillotine sheet to the sizes you need. Pricing is based on the sheet the pieces come from, and we will tell you up front if a different layout saves you money.',
      },
      {
        q: 'Can you fold sheet into angles and flashings?',
        a: 'Yes. Light gauge sheet can be folded into angles, channels, flashings and brackets. Send a sketch with the dimensions.',
      },
    ],
  },
  {
    slug: 'tube-and-pipe',
    name: 'Tube & Pipe',
    profile: 'tube',
    photo: 'pipes',
    short: 'Round, square and rectangular tube, black and galvanised pipe.',
    intro:
      'Hollow sections for gates, balustrades, frames and handrails, plus pipe for water, structure and fencing. Tell us the wall thickness you need and we will tell you what is on the floor.',
    items: [
      { name: 'Square tube', spec: '15 × 15 to 100 × 100 mm' },
      { name: 'Rectangular tube', spec: '38 × 25 to 150 × 50 mm' },
      { name: 'Round tube', spec: '12.7 to 76.2 mm OD' },
      { name: 'Black pipe', spec: '15 to 150 mm NB' },
      { name: 'Galvanised pipe', spec: '15 to 100 mm NB' },
      { name: 'Wall thickness', spec: '0.9 to 4 mm on tube' },
    ],
    lengths: '6 m lengths, cut to size on request.',
    uses: [
      'Gates, burglar bars and palisades',
      'Balustrades and handrails',
      'Carports and shade structures',
      'Furniture and shopfitting frames',
      'Fencing and farm work',
    ],
    keywords: [
      'square tubing Johannesburg',
      'steel pipe supplier Johannesburg',
      'galvanised pipe Gauteng',
      'rectangular tube',
      'round tube steel',
    ],
    faqs: [
      {
        q: 'Do you stock galvanised square tube?',
        a: 'Pre-galvanised tube is available in the common sizes. For heavier walls, black tube is normally hot dip galvanised after fabrication.',
      },
      {
        q: 'Can I buy a single length?',
        a: 'Yes. One length or a full bundle, cut or uncut.',
      },
    ],
  },
  {
    slug: 'bar-and-flat',
    name: 'Bar & Flat',
    profile: 'bar',
    photo: 'pipesPile',
    short: 'Flat bar, round bar, square bar and bright bar.',
    intro:
      'Solid steel for brackets, shafts, pins, gates and decorative work. Small quantities are fine, from a single length to a bundle.',
    items: [
      { name: 'Flat bar', spec: '12 × 3 to 150 × 12 mm' },
      { name: 'Round bar', spec: '6 to 50 mm diameter' },
      { name: 'Square bar', spec: '8 to 32 mm' },
      { name: 'Bright bar', spec: 'Round and hex, for machining' },
      { name: 'Half round and hollow bar', spec: 'For gates and trim' },
    ],
    lengths: '6 m lengths, cut to size on request.',
    uses: [
      'Brackets, cleats and straps',
      'Shafts, pins and spacers',
      'Gates and security bars',
      'Decorative and architectural work',
      'Repairs and maintenance',
    ],
    keywords: [
      'flat bar Johannesburg',
      'round bar steel supplier',
      'bright bar Gauteng',
      'square bar',
      'mild steel bar Johannesburg',
    ],
    faqs: [
      {
        q: 'Do you cut bar to short lengths?',
        a: 'Yes. Bar can be cut to short pieces for brackets, spacers and pins. Give us the length and the count.',
      },
    ],
  },
  {
    slug: 'stainless-and-non-ferrous',
    name: 'Stainless & Non-Ferrous',
    profile: 'ingot',
    photo: 'weldDark',
    short: 'Stainless steel, aluminium, copper and brass in sheet, tube and bar.',
    intro:
      'For work that has to resist rust, carry current or look good for years. We supply the common grades and can source the less common ones.',
    items: [
      { name: 'Stainless steel', spec: '304 and 316 sheet, tube, angle and bar' },
      { name: 'Aluminium', spec: 'Sheet, chequer plate, angle, tube and flat' },
      { name: 'Copper', spec: 'Sheet, bar and busbar' },
      { name: 'Brass', spec: 'Rod, sheet and hex' },
    ],
    lengths: 'Full sheets, full lengths or cut pieces.',
    uses: [
      'Food, kitchen and medical equipment',
      'Marine and outdoor fittings',
      'Electrical busbars and earthing',
      'Trims, signage and shopfitting',
      'Machined parts',
    ],
    keywords: [
      'stainless steel supplier Johannesburg',
      'aluminium sheet Johannesburg',
      'copper busbar Gauteng',
      'brass rod supplier',
      'non-ferrous metals Johannesburg',
    ],
    faqs: [
      {
        q: 'What is the difference between 304 and 316 stainless?',
        a: '316 contains molybdenum, which gives it better resistance to salt and chemicals. 304 is the standard choice for indoor and general use and costs less.',
      },
      {
        q: 'Can you source grades you do not keep in stock?',
        a: 'Often, yes. Send the grade, size and quantity and we will come back with a price and lead time.',
      },
    ],
  },
  {
    slug: 'mesh-and-reinforcing',
    name: 'Mesh & Reinforcing',
    profile: 'mesh',
    photo: 'weldSite',
    short: 'Reinforcing bar, welded mesh, brickforce and expanded metal.',
    intro:
      'Reinforcing for slabs and foundations, and mesh for fencing, guards and walkways. Sold by the sheet, the length or the bundle.',
    items: [
      { name: 'Reinforcing bar', spec: 'Y10 to Y25 high tensile, R-bar mild steel' },
      { name: 'Welded mesh', spec: 'Ref 100 to Ref 617 for slabs and surface beds' },
      { name: 'Brickforce', spec: 'Wall reinforcing in standard widths' },
      { name: 'Expanded metal', spec: 'Walkways, guards and security screens' },
    ],
    lengths: 'Rebar in 6 and 12 m lengths. Mesh in full sheets.',
    uses: [
      'Foundations and slabs',
      'Surface beds and driveways',
      'Columns and beams',
      'Security screens and machine guards',
      'Walkways and platforms',
    ],
    keywords: [
      'rebar Johannesburg',
      'reinforcing steel supplier Gauteng',
      'welded mesh Johannesburg',
      'ref 193 mesh',
      'expanded metal supplier',
    ],
    faqs: [
      {
        q: 'Which mesh do I need for a slab?',
        a: 'It depends on the slab and the load, and should come from your engineer. Ref 193 and Ref 245 are common for residential surface beds.',
      },
    ],
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export type ServiceIconKey = 'cut' | 'fold' | 'truck' | 'ledger' | 'yard'

export const services: { id: string; icon: ServiceIconKey; name: string; body: string }[] = [
  {
    id: 'cutting',
    icon: 'cut',
    name: 'Cut to length',
    body: 'Sections, tube, bar and pipe cut to your schedule. Send the list and every piece is cut before it is loaded, so there is nothing left to trim on site.',
  },
  {
    id: 'folding',
    icon: 'fold',
    name: 'Guillotine and folding',
    body: 'Sheet and light plate guillotined to size and folded into angles, channels, flashings and brackets from your sketch.',
  },
  {
    id: 'delivery',
    icon: 'truck',
    name: 'Delivery across Gauteng',
    body: 'Our own trucks deliver to sites, workshops and yards around Johannesburg and Pretoria. Longer distances by arrangement.',
  },
  {
    id: 'collection',
    icon: 'yard',
    name: 'Order ahead and collect',
    body: 'Order by phone or WhatsApp and your steel is cut, bundled and waiting when you arrive at the yard.',
  },
  {
    id: 'accounts',
    icon: 'ledger',
    name: 'Trade accounts',
    body: 'Contractors and fabricators who buy regularly can ask about an account for consistent pricing and quicker ordering.',
  },
]

export const reasons = [
  {
    title: '20 years in steel',
    body: 'Two decades of selling steel in Johannesburg. We know the sizes, the substitutes and what works on site.',
  },
  {
    title: 'Straight answers',
    body: 'If a size is out of stock we say so, and offer the closest thing we have instead of leaving you waiting.',
  },
  {
    title: 'Cut before it leaves',
    body: 'Cutting in the yard saves you time, offcuts and grinder discs. Pieces arrive ready to weld or bolt.',
  },
  {
    title: 'Our own trucks',
    body: 'We run our own delivery, so when you ask where your order is, we can give you a real answer.',
  },
]

export const industries = [
  { name: 'Building contractors', body: 'Beams, lintels, rebar and mesh for houses, extensions and commercial builds.' },
  { name: 'Steel fabricators', body: 'Sections, tube and plate cut to your cutting list, ready for the bench.' },
  { name: 'Engineering workshops', body: 'Bright bar, plate and non-ferrous stock for machining and repairs.' },
  { name: 'Mining and industrial', body: 'Plate, angle and channel for maintenance, guards and platforms.' },
  { name: 'Farms and agriculture', body: 'Pipe, tube and mesh for sheds, gates, kraals and fencing.' },
  { name: 'Homeowners and DIY', body: 'A few lengths for a gate, a carport or a burglar bar. Small orders are welcome.' },
]

export const process = [
  { title: 'Send your list', body: 'Call, WhatsApp or email the sizes and quantities. A photo of a handwritten list is fine.' },
  { title: 'Get a price', body: 'We check stock, confirm what is available and send you a written quote.' },
  { title: 'We cut and load', body: 'Your steel is cut, folded and bundled to the order.' },
  { title: 'Delivered or collected', body: 'We bring it to site, or it waits for you at the yard.' },
]

export const faqs = [
  {
    q: 'Do you sell to the public or only to the trade?',
    a: 'Both. Contractors, fabricators, farmers and homeowners all buy from us, and small orders are welcome.',
  },
  {
    q: 'Can you cut steel to size?',
    a: 'Yes. Sections, tube, bar and pipe are cut to length, and sheet is guillotined and folded. Send your cutting list with the order.',
  },
  {
    q: 'Do you deliver?',
    a: 'Yes, across Johannesburg, Pretoria and the rest of Gauteng on our own trucks. The delivery cost depends on distance and load and is shown on your quote.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Send the sizes, quantities and delivery address by WhatsApp, email or the quote form on this site. We reply with a written price.',
  },
  {
    q: 'Can you get sizes you do not stock?',
    a: 'Often, yes. Tell us what you need and we will check with our suppliers and come back with a price and lead time.',
  },
  {
    q: 'How long has Apex Metals been in business?',
    a: 'The team behind Apex Metals has been supplying steel in Johannesburg for 20 years.',
  },
]
