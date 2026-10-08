// Downloads the stock photos listed in src/lib/photo-sources.json into
// public/stock-cache/ so the site serves them from its own domain instead of
// hotlinking a third party. Runs before every build (npm "prebuild").
//
// It never fails the build: a key with no working source is simply left out
// of the manifest and the page shows a plain steel panel in its place.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const outDir = join(root, 'public', 'stock-cache')
const sources = JSON.parse(await readFile(join(root, 'src/lib/photo-sources.json'), 'utf8'))

let sharp = null
try {
  sharp = (await import('sharp')).default
} catch {
  // sharp ships with Next.js; without it the original file is kept as is
}

async function download(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ApexMetalsSiteBuild/1.0)', Accept: 'image/*' },
  })
  const type = res.headers.get('content-type') || ''
  if (!res.ok || !type.startsWith('image/')) throw new Error(`${res.status} ${type}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 30_000) throw new Error(`too small (${buf.length} bytes)`)
  return buf
}

await mkdir(outDir, { recursive: true })
const manifest = {}

for (const [key, list] of Object.entries(sources)) {
  if (key.startsWith('_')) continue
  // a photo committed to public/photos takes priority; nothing to fetch
  if (['jpg', 'jpeg', 'webp', 'png'].some((ext) => existsSync(join(root, 'public', 'photos', `${key}.${ext}`)))) {
    console.log(`[photos] ${key}: using public/photos override`)
    continue
  }
  for (const { url, alt } of list) {
    try {
      let buf = await download(url)
      if (sharp) {
        buf = await sharp(buf).rotate().resize({ width: 2000, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toBuffer()
      }
      await writeFile(join(outDir, `${key}.jpg`), buf)
      manifest[key] = { file: `/stock-cache/${key}.jpg`, alt }
      console.log(`[photos] ${key}: ok from ${new URL(url).host} (${Math.round(buf.length / 1024)} KB)`)
      break
    } catch (err) {
      console.warn(`[photos] ${key}: ${new URL(url).host} failed: ${err.message}`)
    }
  }
  if (!manifest[key]) console.warn(`[photos] ${key}: no source worked, a placeholder will be shown`)
}

await writeFile(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`[photos] ${Object.keys(manifest).length} photos ready`)
