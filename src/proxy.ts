import { NextResponse, type NextRequest } from 'next/server'

// Web addresses are case-sensitive. Phones often capitalise the first letter
// typed into the address bar, so send /Sitemap.xml, /ROBOTS.TXT and the like
// to the real lowercase file instead of a 404.
const files = new Set(['/sitemap.xml', '/robots.txt'])

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const lower = pathname.toLowerCase()
  if (pathname !== lower && files.has(lower)) {
    return NextResponse.redirect(new URL(lower, request.url), 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?:[Ss][Ii][Tt][Ee][Mm][Aa][Pp]\\.[Xx][Mm][Ll])|(?:[Rr][Oo][Bb][Oo][Tt][Ss]\\.[Tt][Xx][Tt]))'],
}
