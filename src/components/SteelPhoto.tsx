import { photos, type PhotoKey } from '@/lib/content'
import { WIDTHS, cdnUrl, fallbackUrl, resolveUnsplash } from '@/lib/unsplash'

interface Props {
  photo: PhotoKey
  sizes: string
  className?: string
  priority?: boolean
}

export async function SteelPhoto({ photo, sizes, className = '', priority = false }: Props) {
  const { id, alt } = photos[photo]
  const base = await resolveUnsplash(id)
  const url = (w: number) => (base ? cdnUrl(base, w) : fallbackUrl(id, w))

  return (
    // Plain img: the Unsplash CDN already serves resized AVIF/WebP, so routing
    // through next/image would only add a second optimisation pass.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url(1440)}
      srcSet={WIDTHS.map((w) => `${url(w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
