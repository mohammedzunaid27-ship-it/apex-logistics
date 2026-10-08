import { ImageResponse } from 'next/og'
import { brandFonts, Mark } from '@/lib/brandImage'

// Square raster logo for search engines (schema.org Organization.logo).
export const dynamic = 'force-static'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0b0c',
          color: '#e7eaed',
        }}
      >
        <Mark width={300} />
        <div style={{ display: 'flex', marginTop: 40, fontFamily: 'Big Shoulders', fontSize: 80, letterSpacing: 2 }}>
          APEX <span style={{ color: '#959ea6', marginLeft: 22 }}>METALS</span>
        </div>
      </div>
    ),
    { width: 512, height: 512, fonts: await brandFonts() },
  )
}
