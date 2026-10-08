// All business copy lives here so it can be corrected in one place.
// Product ranges follow the stock list supplied by the business.

export type ProfileKey = 'ibeam' | 'plate' | 'tube' | 'bar' | 'ingot' | 'hollow' | 'pipe' | 'wear'

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
  weldDark: { id: 'd9Xff2E37ak', alt: 'Welder working on a metal part in a dark workshop' },
  weldMask: { id: 'dni5FT1QXvk', alt: 'Fabricator in a respirator welding a steel component' },
  weldSite: { id: 'jcm9Qo8O7kw', alt: 'Welder on a construction site with sparks against the evening sky' },
  pipes: { id: 'IMe9ChGGUq8', alt: 'Stack of steel pipes seen end on' },
  pipesPile: { id: 'LT-oz1yj0_0', alt: 'Pile of metal tube lengths in a stockyard' },
  girders: { id: 'j4FjddHQTDE', alt: 'Steel girder framework of a large industrial structure' },
}

export interface Product {
  slug: string
  name: string
  // short form for tight spaces (ticker, captions)
  tag: string
  profile: ProfileKey
  photo: PhotoKey
  short: string
  intro: string
  items: { name: string; spec: string }[]
  supply: string
  uses: string[]
  keywords: string[]
  faqs: { q: string; a: string }[]
}

export const products: Product[] = [
  {
    slug: 'mild-steel',
    name: 'Mild Steel',
    tag: 'Mild steel',
    profile: 'ibeam',
    photo: 'girders',
    short: 'Bar, tube, angle, channel, beams, columns, plate, treadplate, roof sheeting, grating and palisades.',
    intro:
      'The everyday workhorse. From a few lengths of flat bar to universal beams for a building frame, mild steel is the bulk of what we cut and deliver every week.',
    items: [
      { name: 'Round, square and flat bar', spec: 'For brackets, shafts, gates and general fabrication' },
      { name: 'Round and square tube', spec: 'For frames, gates, balustrades and furniture' },
      { name: 'Angle iron and channels', spec: 'For frames, supports, bracing and trailers' },
      { name: 'Universal columns and beams', spec: 'H and I sections for structural frames' },
      { name: 'IPE sections and joists', spec: 'Parallel and taper flange I-beams' },
      { name: 'Sheets and plates', spec: 'Full sheets or cut to size' },
      { name: 'Treadplate', spec: 'Raised pattern plate for floors, steps and ramps' },
      { name: 'IBR and corrugated sheeting', spec: 'Roofing and cladding profiles' },
      { name: 'Grating and handrailing', spec: 'For walkways, platforms and stairs' },
      { name: 'Expanded metal', spec: 'All sizes, for guards, screens and walkways' },
      { name: 'Palisades', spec: 'For security fencing' },
    ],
    supply: 'Full lengths and sheets, or cut to size.',
    uses: [
      'Building frames, mezzanines and roofs',
      'Gates, fencing and burglar bars',
      'Trailers, chassis and truck bodies',
      'Walkways, platforms and stairs',
      'General fabrication and repairs',
    ],
    keywords: [
      'mild steel supplier Johannesburg',
      'steel beams Johannesburg',
      'angle iron Johannesburg',
      'IPE beams South Africa',
      'IBR sheeting Johannesburg',
      'treadplate supplier',
    ],
    faqs: [
      {
        q: 'Can you cut mild steel to size?',
        a: 'Yes. Bar, tube, angle, channel, beams and plate can be cut to your sizes before delivery. Send the sizes and quantities with your enquiry.',
      },
      {
        q: 'Do you supply roof sheeting?',
        a: 'Yes, IBR and corrugated sheeting. Tell us the lengths and number of sheets and we will quote.',
      },
      {
        q: 'Can you help me choose a beam size?',
        a: 'We can tell you what is available and what is commonly used, but the size of a structural member should come from your engineer or approved drawings.',
      },
    ],
  },
  {
    slug: 'stainless-steel',
    name: 'Stainless Steel',
    tag: 'Stainless',
    profile: 'tube',
    photo: 'pipesPile',
    short: 'Round and flat bar, round, square and rectangular tube, angle, sheet, plate and treadplate.',
    intro:
      'For anything that has to stay clean, resist rust or look good for years: food plants, kitchens, marine fittings, balustrades and process equipment.',
    items: [
      { name: 'Round bar', spec: 'For shafts, pins and machined parts' },
      { name: 'Flat bar', spec: 'For brackets, trims and frames' },
      { name: 'Round tube', spec: 'For handrails, balustrades and frames' },
      { name: 'Square and rectangular tube', spec: 'For frames, tables and equipment' },
      { name: 'Angle iron', spec: 'For frames, supports and edging' },
      { name: 'Sheets and plates', spec: 'Full sheets or cut to size' },
      { name: 'Treadplate', spec: 'Slip-resistant floors and steps' },
      { name: 'Schedule pipe', spec: 'Full lengths or cut, see schedule pipe' },
    ],
    supply: 'Full lengths and sheets, or cut to size.',
    uses: [
      'Food, beverage and dairy equipment',
      'Commercial kitchens and counters',
      'Balustrades and handrails',
      'Marine and outdoor fittings',
      'Chemical and process plant',
    ],
    keywords: [
      'stainless steel supplier Johannesburg',
      'stainless steel tube Johannesburg',
      'stainless steel sheet South Africa',
      'stainless treadplate',
      'stainless round bar',
    ],
    faqs: [
      {
        q: 'What is the difference between 304 and 316 stainless?',
        a: '316 contains molybdenum, which gives it better resistance to salt and chemicals. 304 is the usual choice for indoor and general use and costs less. Ask which grade is available in the size you need.',
      },
      {
        q: 'Do you stock stainless treadplate?',
        a: 'Yes, stainless treadplate is part of our range alongside sheet and plate.',
      },
    ],
  },
  {
    slug: 'aluminium',
    name: 'Aluminium',
    tag: 'Aluminium',
    profile: 'plate',
    photo: 'weldMask',
    short: 'Round, square and flat bar, round and square tube, angles, channels, sheet, plate and treadplate.',
    intro:
      'Light, rust-free and easy to work. Aluminium goes into trailers, boats, signage, shopfitting and anywhere weight matters.',
    items: [
      { name: 'Round, square and flat bar', spec: 'For machining, brackets and trims' },
      { name: 'Round and square tube', spec: 'For frames, racks and furniture' },
      { name: 'Angles and unequal angles', spec: 'For frames, edging and supports' },
      { name: 'Channels', spec: 'For frames and runners' },
      { name: 'Sheets and plates', spec: 'Full sheets or cut to size' },
      { name: 'Treadplate', spec: 'Light, slip-resistant floors, steps and toolboxes' },
    ],
    supply: 'Full lengths and sheets, or cut to size.',
    uses: [
      'Trailers, canopies and toolboxes',
      'Boats and marine fittings',
      'Shopfitting and signage',
      'Ladders, racks and frames',
      'Machined parts',
    ],
    keywords: [
      'aluminium supplier Johannesburg',
      'aluminium treadplate Johannesburg',
      'aluminium sheet South Africa',
      'aluminium angle',
      'aluminium tube supplier',
    ],
    faqs: [
      {
        q: 'Do you stock aluminium treadplate?',
        a: 'Yes. Aluminium treadplate is popular for trailers, canopies, toolboxes and steps.',
      },
      {
        q: 'Can you cut aluminium sheet and plate to size?',
        a: 'Yes. Give us the sizes and quantities and we will quote for the cut pieces.',
      },
    ],
  },
  {
    slug: 'copper-and-brass',
    name: 'Copper & Brass',
    tag: 'Copper & brass',
    profile: 'ingot',
    photo: 'weldDark',
    short: 'Copper bar, busbar, tube, sheet and plate. Brass bar, tube, sheet and plate.',
    intro:
      'Copper for carrying current and heat, brass for parts that need to machine cleanly and resist corrosion. Both in bar, tube, sheet and plate.',
    items: [
      { name: 'Copper round and square bar', spec: 'For electrical and machined parts' },
      { name: 'Copper busbar', spec: 'For switchboards, panels and earthing' },
      { name: 'Copper round tube', spec: 'For heat exchange and fittings' },
      { name: 'Copper sheets and plates', spec: 'For electrical, roofing and decorative work' },
      { name: 'Brass round, square and flat bar', spec: 'For fittings, valves and machined parts' },
      { name: 'Brass round tube', spec: 'For fittings and trims' },
      { name: 'Brass sheets and plates', spec: 'For plaques, trims and decorative work' },
    ],
    supply: 'Full lengths and sheets, or cut to size.',
    uses: [
      'Switchboards, panels and earthing',
      'Valves, fittings and bushes',
      'Machined and turned parts',
      'Plaques, trims and signage',
      'Heat exchangers',
    ],
    keywords: [
      'copper supplier Johannesburg',
      'copper busbar Johannesburg',
      'brass supplier Johannesburg',
      'brass rod South Africa',
      'copper sheet supplier',
    ],
    faqs: [
      {
        q: 'Do you stock copper busbar?',
        a: 'Yes. Send the width, thickness, length and quantity and we will quote.',
      },
      {
        q: 'What is the difference between brass and bronze?',
        a: 'Brass is copper alloyed with zinc and machines very easily. Bronze is copper alloyed with tin or aluminium and is stronger and better for bearings and wear. See our bronze range for bushes and gears.',
      },
    ],
  },
  {
    slug: 'bronze-and-cast-iron',
    name: 'Bronze & Cast Iron',
    tag: 'Bronze & cast iron',
    profile: 'hollow',
    photo: 'weldSparks',
    short: 'Phosphor bronze PB1 and LG2, aluminium bronze AB1 and AB2, and cast iron, in round and hollow bar.',
    intro:
      'Bearing and wear materials for the workshop. Solid and hollow bar for bushes, bearings, gears and sleeves, so you machine less and waste less.',
    items: [
      { name: 'Phosphor bronze PB1', spec: 'Round and hollow bar for gears, worm wheels and heavy-duty bearings' },
      { name: 'Leaded gunmetal LG2', spec: 'Round and hollow bar for general bushes, valves and fittings' },
      { name: 'Aluminium bronze AB1', spec: 'Round and hollow bar, strong and corrosion resistant' },
      { name: 'Aluminium bronze AB2', spec: 'Nickel aluminium bronze, round and hollow bar for marine and heavy wear' },
      { name: 'Cast iron', spec: 'Round and hollow bar for bushes, pulleys and hydraulic parts' },
    ],
    supply: 'Full bars or cut to length.',
    uses: [
      'Bushes, bearings and sleeves',
      'Gears and worm wheels',
      'Pump and valve parts',
      'Marine fittings',
      'Hydraulic components and pulleys',
    ],
    keywords: [
      'phosphor bronze supplier Johannesburg',
      'PB1 bronze South Africa',
      'LG2 gunmetal',
      'aluminium bronze AB2',
      'cast iron bar supplier',
      'hollow bar Johannesburg',
    ],
    faqs: [
      {
        q: 'Should I use PB1 or LG2?',
        a: 'PB1 phosphor bronze is harder and stronger, so it suits gears, worm wheels and heavily loaded bearings. LG2 leaded gunmetal is easier to machine and is the usual choice for general bushes, valves and fittings.',
      },
      {
        q: 'Why use hollow bar?',
        a: 'Hollow bar starts closer to the finished shape of a bush or sleeve, so there is less to bore out. That saves machining time and material.',
      },
      {
        q: 'What is cast iron bar used for?',
        a: 'Cast iron machines cleanly and the graphite in it helps with lubrication and vibration damping, which makes it a good choice for bushes, pulleys and hydraulic parts.',
      },
    ],
  },
  {
    slug: 'engineering-steels',
    name: 'Engineering Steels',
    tag: 'EN steels',
    profile: 'bar',
    photo: 'weldSite',
    short: 'EN1A, EN3A, EN3B, EN9, EN19, EN24 and EN36B, K110 tool steel and spring steel. Condition T available.',
    intro:
      'The grades engineering shops machine every day, from free-cutting EN1A to EN24 in Condition T for heavily loaded shafts. Cut to the lengths you need.',
    items: [
      { name: 'EN1A', spec: 'Free-cutting steel for high-volume turned parts' },
      { name: 'EN3A and EN3B', spec: 'Low-carbon general engineering steel, EN3B bright drawn' },
      { name: 'EN9', spec: 'Medium-carbon steel for sprockets, gears and wear parts' },
      { name: 'EN19', spec: 'Chrome-moly alloy steel for shafts, bolts and gears. Condition T available' },
      { name: 'EN24', spec: 'Nickel-chrome-moly alloy steel for heavy-duty shafts and gears. Condition T available' },
      { name: 'EN36B', spec: 'Case-hardening steel for gears, cams and pins' },
      { name: 'K110 tool steel', spec: 'Cold-work tool steel for dies, punches and shear blades' },
      { name: 'Spring steel', spec: 'Sheets up to 3 mm' },
    ],
    supply: 'Full bars or cut to size.',
    uses: [
      'Shafts, axles and spindles',
      'Gears, sprockets and couplings',
      'Bolts, pins and fasteners',
      'Dies, punches and blades',
      'Springs and clips',
    ],
    keywords: [
      'EN19 supplier Johannesburg',
      'EN24 steel South Africa',
      'EN9 steel Johannesburg',
      'K110 tool steel',
      'special steels Johannesburg',
      'spring steel sheet',
    ],
    faqs: [
      {
        q: 'What does Condition T mean?',
        a: 'Condition T is a hardened and tempered condition with a tensile strength of roughly 850 to 1000 MPa. EN19 and EN24 supplied in Condition T can be machined and used without further heat treatment for many shafts and gears.',
      },
      {
        q: 'EN19 or EN24?',
        a: 'Both are high-tensile alloy steels. EN24 contains nickel, which makes it tougher and better for larger sections and the most demanding parts. EN19 is a common, more economical choice for shafts, bolts and gears.',
      },
      {
        q: 'What is K110?',
        a: 'K110 is a high-carbon, high-chromium cold-work tool steel, similar to D2. It holds an edge and resists wear, so it is used for dies, punches and shear blades.',
      },
    ],
  },
  {
    slug: 'wear-plate',
    name: 'Wear Plate',
    tag: 'Hardox',
    profile: 'wear',
    photo: 'weldMask',
    short: 'Hardox and Bennox wear-resistant plate, cut to size.',
    intro:
      'Abrasion-resistant plate for parts that take a beating: buckets, chutes, liners and tipper bodies. Supplied cut to size so it is ready to fit.',
    items: [
      { name: 'Hardox plate', spec: 'Abrasion-resistant steel plate, cut to size' },
      { name: 'Bennox plate', spec: 'Wear plate, cut to size' },
    ],
    supply: 'Cut to size from plate.',
    uses: [
      'Excavator and loader buckets',
      'Chutes, hoppers and liners',
      'Tipper and dump bodies',
      'Crusher and screen parts',
      'Cutting edges and wear strips',
    ],
    keywords: [
      'Hardox supplier Johannesburg',
      'Hardox plate South Africa',
      'wear plate Johannesburg',
      'abrasion resistant plate',
      'Bennox plate',
    ],
    faqs: [
      {
        q: 'Can you cut Hardox to size?',
        a: 'Yes. Hardox and Bennox plate are supplied cut to the sizes you need. Send a sketch or the dimensions and quantities.',
      },
      {
        q: 'What is wear plate used for?',
        a: 'Wear plate is much harder than ordinary steel plate, so it lasts far longer in abrasive work: buckets, liners, chutes and tipper bodies in mining, quarrying and earthmoving.',
      },
    ],
  },
  {
    slug: 'schedule-pipe',
    name: 'Schedule Pipe',
    tag: 'Schedule pipe',
    profile: 'pipe',
    photo: 'pipes',
    short: 'Mild steel and stainless steel schedule pipe, in full lengths or cut to size.',
    intro:
      'Pipe made to standard wall thicknesses for pressure lines, process piping and structural work, in mild steel and stainless steel.',
    items: [
      { name: 'Mild steel schedule pipe', spec: 'Full lengths or cut to size' },
      { name: 'Stainless steel schedule pipe', spec: 'Full lengths or cut to size' },
    ],
    supply: 'Full lengths or cut to size.',
    uses: [
      'Pressure and process lines',
      'Plant and mining pipework',
      'Structural posts and supports',
      'Bollards and barriers',
      'Machine frames and rollers',
    ],
    keywords: [
      'schedule pipe Johannesburg',
      'schedule 40 pipe South Africa',
      'stainless schedule pipe',
      'mild steel pipe supplier',
      'steel pipe Johannesburg',
    ],
    faqs: [
      {
        q: 'What does pipe schedule mean?',
        a: 'Schedule describes the wall thickness for a given pipe size. A higher schedule, such as Schedule 80, has a thicker wall than Schedule 40 and takes higher pressure.',
      },
      {
        q: 'Do you sell full lengths or cut pieces?',
        a: 'Both. Buy full lengths, or have the pipe cut to the lengths on your list.',
      },
    ],
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export const enquiryTypes = ['Quotation', 'Prices', 'New order', 'Delivery']

export type ServiceIconKey = 'cut' | 'truck' | 'ledger' | 'yard'

export const services: { id: string; icon: ServiceIconKey; name: string; body: string }[] = [
  {
    id: 'cutting',
    icon: 'cut',
    name: 'Cut to size',
    body: 'Bar, plate, tube, sections, Hardox and engineering steels cut to your sizes, so the pieces arrive ready to machine, weld or fit.',
  },
  {
    id: 'lengths',
    icon: 'yard',
    name: 'Full lengths or just the piece',
    body: 'Buy a full length or a full sheet, or only the pieces you need cut from it.',
  },
  {
    id: 'delivery',
    icon: 'truck',
    name: 'Nationwide delivery',
    body: 'Ordered in Johannesburg, delivered anywhere in South Africa. We quote the delivery with the order.',
  },
  {
    id: 'enquiries',
    icon: 'ledger',
    name: 'Quotes, prices and orders',
    body: 'Ask for a quotation, check a price, place a new order or follow up a delivery by phone, WhatsApp, email or the form on this site.',
  },
]

export const reasons = [
  {
    title: '20 years in metal',
    body: 'Two decades supplying workshops, fabricators and mines. We know the grades, the sizes and the sensible substitutes.',
  },
  {
    title: 'Ferrous and non-ferrous',
    body: 'Mild steel to phosphor bronze, EN24 to Hardox. One enquiry, one invoice, one delivery.',
  },
  {
    title: 'Cut to size',
    body: 'Pieces cut to your list, so you are not paying to store, handle or scrap offcuts on site.',
  },
  {
    title: 'Delivered nationwide',
    body: 'From our Johannesburg base to any town in South Africa.',
  },
]

export const industries = [
  { name: 'Engineering workshops', body: 'EN steels, bronze, cast iron and bright bar for shafts, bushes and gears.' },
  { name: 'Fabricators and welders', body: 'Mild steel and stainless bar, tube, sections and plate, cut to your list.' },
  { name: 'Mining and quarrying', body: 'Hardox wear plate for buckets and liners, EN steels for pins and shafts.' },
  { name: 'Construction', body: 'Beams, columns, roof sheeting, grating, handrailing and palisades.' },
  { name: 'Food and process plants', body: 'Stainless sheet, tube, bar and schedule pipe.' },
  { name: 'Electrical and panel builders', body: 'Copper busbar, bar and sheet, and brass.' },
]

export const process = [
  { title: 'Send your list', body: 'Call, WhatsApp or email the material, sizes and quantities. A photo of a handwritten list is fine.' },
  { title: 'Get a price', body: 'We confirm what is available and send you a written quotation.' },
  { title: 'We cut to size', body: 'Your order is cut to your sizes and bundled.' },
  { title: 'Delivered', body: 'To your workshop, site or yard, anywhere in South Africa.' },
]

export const faqs = [
  {
    q: 'Which metals do you supply?',
    a: 'Mild steel, stainless steel, aluminium, copper, brass, phosphor and aluminium bronze, cast iron, engineering steels such as EN19 and EN24, K110 tool steel, spring steel, Hardox and Bennox wear plate, expanded metal and schedule pipe.',
  },
  {
    q: 'Can you cut to size?',
    a: 'Yes. Bar, tube, sections, plate, Hardox and engineering steels can be cut to your sizes. Send the sizes and quantities with your enquiry.',
  },
  {
    q: 'Do you deliver outside Johannesburg?',
    a: 'Yes. We deliver nationwide in South Africa. The delivery is quoted together with your order.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Send the material, sizes, quantities and delivery address by WhatsApp, email or the form on this site, or call us. We reply with a written quotation.',
  },
  {
    q: 'Do you stock EN19 and EN24 in Condition T?',
    a: 'Yes, Condition T is available. Tell us the diameter and length you need.',
  },
  {
    q: 'How long has Apex Metals been in the trade?',
    a: 'The team behind Apex Metals has been supplying metal from Johannesburg for 20 years.',
  },
]
