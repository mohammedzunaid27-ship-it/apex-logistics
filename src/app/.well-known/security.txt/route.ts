import { absoluteUrl, site } from '@/lib/site'

// RFC 9116 contact file, so anyone who finds a security problem with the site
// knows where to report it. Built at deploy time; the expiry rolls forward a
// year with every deploy.
export const dynamic = 'force-static'

export function GET() {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  expires.setUTCHours(0, 0, 0, 0)
  const body = [
    `Contact: mailto:${site.email}`,
    `Expires: ${expires.toISOString()}`,
    'Preferred-Languages: en',
    `Canonical: ${absoluteUrl('/.well-known/security.txt')}`,
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
