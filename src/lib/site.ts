// Single source of truth for business details. Change them here and every
// page, the footer, the structured data and the legal pages pick them up.

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return 'http://localhost:3000'
}

export const site = {
  name: 'Apex Metals',
  legalName: 'Apex Metals',
  url: resolveSiteUrl(),
  yearsInTrade: 20,
  tagline: 'Steel and metal supply, cut to size, delivered nationwide',
  description:
    'Mild and stainless steel, aluminium, copper, brass, bronze, EN steels and Hardox from Johannesburg. Cut to size and delivered nationwide. 20 years in metal.',
  email: 'apexmetals@gmail.com',
  phones: [
    { display: '061 545 6926', tel: '+27615456926' },
    { display: '071 490 7858', tel: '+27714907858' },
  ],
  whatsapp: '27615456926',
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
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path === '/' ? '' : path}`
}
