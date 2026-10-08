import { cache } from 'react'

// Unsplash photo pages are identified by a short id, but the image CDN uses a
// different long id. Resolve it once at build time so the browser can request
// resized AVIF/WebP straight from images.unsplash.com. If resolution fails the
// download endpoint is used instead, which redirects to the same image.

const CDN = 'https://images.unsplash.com/'

async function viaDownloadRedirect(id: string) {
  const res = await fetch(`https://unsplash.com/photos/${id}/download`, {
    redirect: 'manual',
    signal: AbortSignal.timeout(6000),
    cache: 'force-cache',
  })
  const location = res.headers.get('location')
  if (!location?.startsWith(CDN)) return null
  const url = new URL(location)
  return `${url.origin}${url.pathname}`
}

async function viaPageMeta(id: string) {
  const res = await fetch(`https://unsplash.com/photos/${id}`, {
    signal: AbortSignal.timeout(6000),
    cache: 'force-cache',
  })
  if (!res.ok) return null
  const html = await res.text()
  const match = html.match(/https:\/\/images\.unsplash\.com\/photo-[A-Za-z0-9_-]+/)
  return match ? match[0] : null
}

export const resolveUnsplash = cache(async (id: string): Promise<string | null> => {
  for (const attempt of [viaDownloadRedirect, viaPageMeta]) {
    try {
      const base = await attempt(id)
      if (base) return base
    } catch {
      // network unavailable or blocked; try the next strategy
    }
  }
  return null
})

export const WIDTHS = [480, 768, 1080, 1440, 1920] as const

export function cdnUrl(base: string, width: number, quality = 70) {
  return `${base}?w=${width}&q=${quality}&auto=format&fit=crop`
}

export function fallbackUrl(id: string, width: number) {
  return `https://unsplash.com/photos/${id}/download?w=${width}`
}
