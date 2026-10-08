import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Shared artwork for the generated social image, Apple icon and logo PNG.

const fontDir = join(process.cwd(), 'node_modules/@fontsource')

export async function brandFonts() {
  const [display, mono] = await Promise.all([
    readFile(join(fontDir, 'big-shoulders/files/big-shoulders-latin-900-normal.woff')),
    readFile(join(fontDir, 'martian-mono/files/martian-mono-latin-400-normal.woff')),
  ])
  return [
    { name: 'Big Shoulders', data: display, weight: 900 as const, style: 'normal' as const },
    { name: 'Martian Mono', data: mono, weight: 400 as const, style: 'normal' as const },
  ]
}

const markSvg = (light: string, dark: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 32"><path d="M0 0H25V6L30 5V13L25 12V19L20 18V26L25 25V32H0Z" fill="${light}"/><path d="M52 0H25V6L30 5V13L25 12V19L20 18V26L25 25V32H52Z" fill="${dark}"/><path d="M25 0V6L30 5V13L25 12V19L20 18V26L25 25V32" fill="none" stroke="#ff6a1f" stroke-width="1.6"/></svg>`,
  )}`

export function Mark({ width }: { width: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={markSvg('#b8c1c9', '#5f676e')} width={width} height={(width * 32) / 52} alt="" />
}

export const gridBackground = {
  backgroundColor: '#0a0b0c',
  backgroundImage:
    'linear-gradient(rgba(214,222,230,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(214,222,230,0.06) 1px, transparent 1px)',
  backgroundSize: '60px 60px',
}
