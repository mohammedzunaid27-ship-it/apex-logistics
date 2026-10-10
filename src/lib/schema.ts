import { faqs as homeFaqs, products, services, type Product } from './content'
import type { Guide } from './guides'
import type { Item } from './items'
import { absoluteUrl, site } from './site'

// schema.org structured data. Kept factual: no ratings, prices or opening
// hours are published until the business confirms them. Stock items are
// described as supply services, not Products: Google treats every Product as
// a shopping listing and flags it as broken when there is no price.

const businessId = `${site.url}/#business`
const orgId = `${site.url}/#organization`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl('/logo.png'),
    email: site.email,
    telephone: site.phones.map((p) => p.tel),
    contactPoint: site.phones.map((p) => ({
      '@type': 'ContactPoint',
      telephone: p.tel,
      contactType: 'sales',
      areaServed: 'ZA',
      availableLanguage: ['English', 'Afrikaans', 'Zulu'],
    })),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: 'en-ZA',
    publisher: { '@id': orgId },
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Store'],
    '@id': businessId,
    name: site.name,
    description: site.description,
    url: site.url,
    image: absoluteUrl('/opengraph-image'),
    logo: absoluteUrl('/logo.png'),
    email: site.email,
    telephone: site.phones[0].tel,
    parentOrganization: { '@id': orgId },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { '@type': 'Country', name: site.address.countryName },
      ...site.serviceAreas.map((name) => ({ '@type': 'City', name })),
    ],
    knowsAbout: products.map((p) => p.name).concat(['Metal cutting to size', 'Hardox wear plate', 'EN19', 'EN24']),
    slogan: site.tagline,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Ferrous and non-ferrous metals',
      itemListElement: products.map((p) => ({
        '@type': 'OfferCatalog',
        name: p.name,
        url: absoluteUrl(`/products/${p.slug}`),
        itemListElement: p.items.map((item) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: `${item.name} supply`, description: item.spec },
        })),
      })),
    },
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, description: s.body },
    })),
  }
}

export function faqSchema(items: { q: string; a: string }[] = homeFaqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

export function productCategorySchema(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${p.name} supplier in ${site.address.locality}`,
    serviceType: p.name,
    description: p.intro,
    url: absoluteUrl(`/products/${p.slug}`),
    provider: { '@id': businessId },
    areaServed: { '@type': 'Country', name: site.address.countryName },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: p.name,
      itemListElement: p.items.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${item.name} supply`, description: item.spec },
      })),
    },
  }
}

export function itemSchema(item: Item, rangeName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${item.name} supplier in ${site.address.locality}`,
    serviceType: `${item.name} supply`,
    category: rangeName,
    description: item.intro,
    url: absoluteUrl(`/products/${item.range}/${item.slug}`),
    provider: { '@id': businessId },
    areaServed: { '@type': 'Country', name: site.address.countryName },
  }
}

export function itemListSchema(name: string, entries: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: entries.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.name,
      url: absoluteUrl(e.path),
    })),
  }
}

export function articleSchema(g: Guide) {
  const url = absoluteUrl(`/guides/${g.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.title,
    description: g.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(`/guides/${g.slug}/opengraph-image`),
    datePublished: g.published,
    dateModified: g.updated,
    inLanguage: 'en-ZA',
    keywords: g.keywords.join(', '),
    author: { '@type': 'Organization', '@id': orgId, name: site.name, url: site.url },
    publisher: { '@type': 'Organization', '@id': orgId, name: site.name, logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png') } },
  }
}
