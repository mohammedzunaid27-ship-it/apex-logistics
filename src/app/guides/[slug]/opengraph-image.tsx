import { ImageResponse } from 'next/og'
import { brandFonts, gridBackground, Mark } from '@/lib/brandImage'
import { getGuide, guides } from '@/lib/guides'
import { site } from '@/lib/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${site.name} buying guide`

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export default async function GuideOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const title = (getGuide(slug)?.title ?? 'Metal buying guide').toUpperCase()

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
            BUYING GUIDE
          </div>
          <div style={{ display: 'flex', fontFamily: 'Big Shoulders', fontSize: title.length > 40 ? 84 : 104, lineHeight: 0.92, marginTop: 16 }}>
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await brandFonts() },
  )
}
