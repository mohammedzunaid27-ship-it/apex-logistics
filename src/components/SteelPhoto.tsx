import Image from 'next/image'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { photos, type PhotoKey } from '@/lib/content'

// Photos are served from this site. Order of preference:
//   1. public/photos/<key>.(jpg|jpeg|webp|png), committed by hand
//   2. public/stock-cache/<key>.jpg, downloaded at build by scripts/fetch-photos.mjs
//   3. a plain steel panel, so a missing photo never shows a broken image
// Pages are static, so this runs once at build time.

const root = process.cwd()

const manifest: Record<string, { file: string; alt: string }> = (() => {
  try {
    return JSON.parse(readFileSync(join(root, 'public', 'stock-cache', 'manifest.json'), 'utf8'))
  } catch {
    return {}
  }
})()

function override(key: PhotoKey) {
  for (const ext of ['jpg', 'jpeg', 'webp', 'png']) {
    if (existsSync(join(root, 'public', 'photos', `${key}.${ext}`))) return `/photos/${key}.${ext}`
  }
  return null
}

interface Props {
  photo: PhotoKey
  sizes: string
  className?: string
  priority?: boolean
}

export function SteelPhoto({ photo, sizes, className = '', priority = false }: Props) {
  const own = override(photo)
  const cached = manifest[photo]
  const src = own ?? cached?.file
  const alt = own ? photos[photo].alt : (cached?.alt ?? photos[photo].alt)

  if (!src) {
    return <div aria-hidden className={`steel-placeholder absolute inset-0 ${className}`} />
  }

  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
}
