import type { Metadata } from 'next'
import { site } from './site'

// Every page gets matching title, description, canonical URL and social
// preview. Setting openGraph on a page replaces the inherited one, so the
// share image is passed explicitly unless the route has its own.
export function pageMeta({
  title,
  description,
  path,
  keywords,
  ownImage = false,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  ownImage?: boolean
}): Metadata {
  const image = { url: '/opengraph-image', width: 1200, height: 630, alt: `${site.name}, ${site.address.locality}` }
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_ZA',
      siteName: site.name,
      url: path,
      title: `${title} | ${site.name}`,
      description,
      ...(ownImage ? {} : { images: [image] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
      ...(ownImage ? {} : { images: [image.url] }),
    },
  }
}
