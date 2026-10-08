import { ImageResponse } from 'next/og'
import { brandFonts, gridBackground, Mark } from '@/lib/brandImage'
import { site } from '@/lib/site'

export const alt = `${site.name}: steel supply, cutting and delivery in ${site.address.locality}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Mark width={120} />
          <div style={{ display: 'flex', fontFamily: 'Martian Mono', fontSize: 20, letterSpacing: 4, color: '#959ea6' }}>
            {`${site.yearsInTrade} YEARS IN STEEL`}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Big Shoulders', fontSize: 200, lineHeight: 0.85, letterSpacing: -2 }}>
            <span>APEX</span>
            <span style={{ width: 8, background: '#ff6a1f', margin: '18px 28px' }} />
            <span style={{ color: '#959ea6' }}>METALS</span>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 36,
              fontFamily: 'Martian Mono',
              fontSize: 22,
              letterSpacing: 4,
              color: '#b8c1c9',
            }}
          >
            STEEL SUPPLY · CUTTING · DELIVERY · JOHANNESBURG
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await brandFonts() },
  )
}
