import type { MetadataRoute } from 'next'
import { products } from '@/lib/content'
import { guides } from '@/lib/guides'
import { items } from '@/lib/items'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // date the content last changed; bump it when copy is updated
  const lastModified = new Date('2026-10-09')
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly', modified = lastModified) => ({
    url: absoluteUrl(path),
    lastModified: modified,
    changeFrequency,
    priority,
  })

  return [
    page('/', 1, 'weekly'),
    page('/products', 0.9, 'weekly'),
    ...products.map((p) => page(`/products/${p.slug}`, 0.9, 'monthly')),
    ...items.map((i) => page(`/products/${i.range}/${i.slug}`, 0.8, 'monthly')),
    page('/guides', 0.7, 'monthly'),
    ...guides.map((g) => page(`/guides/${g.slug}`, 0.7, 'monthly', new Date(g.updated))),
    page('/services', 0.8, 'monthly'),
    page('/contact', 0.8, 'monthly'),
    page('/about', 0.6, 'monthly'),
    page('/privacy', 0.2, 'yearly'),
    page('/terms', 0.2, 'yearly'),
  ]
}
