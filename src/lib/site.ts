// Single source of truth for business details. Change them here and every
// page, the footer, the structured data and the legal pages pick them up.

// The live address. Vercel serves the site on www and 308-redirects the bare
// domain to it, so canonicals, the sitemap and structured data must use www too:
// pointing them at the bare domain sends Google to a redirect from every page.
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  return 'https://www.apexmetals.co.za'
}

export const site = {
  name: 'Apex Metals',
  legalName: 'Apex Metals',
  url: resolveSiteUrl(),
  yearsInTrade: 20,
  tagline: 'Steel and metal supply, cut to size, delivered nationwide',
  description:
    'Mild and stainless steel, aluminium, copper, brass, bronze, EN steels and Hardox from Johannesburg. Cut to size and delivered nationwide. 20 years in metal.',
  // info@ for general mail, sales@ for quotes and orders (both hosted at xneelo)
  email: 'info@apexmetals.co.za',
  salesEmail: 'sales@apexmetals.co.za',
  phones: [
    { display: '061 545 6126', tel: '+27615456126' },
    { display: '071 490 7858', tel: '+27714907858' },
  ],
  whatsapp: { display: '061 545 6126', number: '27615456126' },
  address: {
    locality: 'Johannesburg',
    region: 'Gauteng',
    country: 'ZA',
    countryName: 'South Africa',
  },
  geo: { latitude: -26.2041, longitude: 28.0473 },
  // We deliver nationwide; these are the main centres named on the site
  serviceAreas: [
    'Johannesburg',
    'Pretoria',
    'Ekurhuleni',
    'Vereeniging',
    'Rustenburg',
    'Polokwane',
    'Mbombela',
    'eMalahleni',
    'Bloemfontein',
    'Kimberley',
    'Durban',
    'Richards Bay',
    'Cape Town',
    'Gqeberha',
    'East London',
    'George',
  ],
} as const

export const primaryPhone = site.phones[0]

export function whatsappLink(message = 'Hi Apex Metals, I would like a quote.') {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path === '/' ? '' : path}`
}
