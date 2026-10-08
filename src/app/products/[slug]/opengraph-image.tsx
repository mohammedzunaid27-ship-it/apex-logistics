import { ImageResponse } from 'next/og'
import { brandFonts, gridBackground, Mark } from '@/lib/brandImage'
import { getProduct, products } from '@/lib/content'
import { site } from '@/lib/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${site.name} steel products in ${site.address.locality}`

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getProduct(slug)
  const name = p?.name ?? 'Steel'
  const items = p ? p.items.slice(0, 4).map((i) => i.name.toUpperCase()).join(' · ') : ''

  return new ImageResponse(
    (
      <div
        style={{
          ...gridBackground,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          color: '#e7eaed',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Mark width={96} />
          <div style={{ display: 'flex', fontFamily: 'Big Shoulders', fontSize: 52, letterSpacing: 1 }}>
            APEX <span style={{ color: '#959ea6', marginLeft: 14 }}>METALS</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Martian Mono', fontSize: 20, letterSpacing: 4, color: '#ff6a1f' }}>
            {`SUPPLIER IN ${site.address.locality.toUpperCase()}`}
          </div>
          <div style={{ display: 'flex', fontFamily: 'Big Shoulders', fontSize: 150, lineHeight: 0.9, marginTop: 16 }}>
            {name.toUpperCase()}
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontFamily: 'Martian Mono', fontSize: 18, letterSpacing: 2, color: '#b8c1c9' }}>
            {items}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await brandFonts() },
  )
}
