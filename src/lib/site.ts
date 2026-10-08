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
  tagline: 'Steel supply, cutting and delivery in Johannesburg',
  description:
    'Johannesburg steel merchant with 20 years in the trade. Structural steel, sheet, plate, tube, bar and mesh, cut to size and delivered across Gauteng.',
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
  serviceAreas: [
    'Johannesburg',
    'Sandton',
    'Randburg',
    'Roodepoort',
    'Soweto',
    'Midrand',
    'Germiston',
    'Boksburg',
    'Benoni',
    'Kempton Park',
    'Alberton',
    'Edenvale',
    'Pretoria',
    'Centurion',
    'Krugersdorp',
    'Vereeniging',
  ],
} as const

export const primaryPhone = site.phones[0]

export function whatsappLink(message = 'Hi Apex Metals, I would like a quote.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path === '/' ? '' : path}`
}
