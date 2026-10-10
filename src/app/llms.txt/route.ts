import { products } from '@/lib/content'
import { guides } from '@/lib/guides'
import { items } from '@/lib/items'
import { absoluteUrl, site } from '@/lib/site'

// llms.txt: a plain summary of the site for AI assistants and answer engines
// (ChatGPT, Claude, Perplexity and the like), following llmstxt.org.
export const dynamic = 'force-static'

export function GET() {
  const link = (name: string, path: string, note: string) => `- [${name}](${absoluteUrl(path)}): ${note}`
  const body = [
    `# ${site.name}`,
    '',
    `> Steel and metal supplier in ${site.address.locality}, ${site.address.countryName}, with ${site.yearsInTrade} years in the metal trade. Mild and stainless steel, aluminium, copper, brass, bronze, cast iron, engineering steels, Hardox wear plate and schedule pipe. Full lengths or cut to size, delivered anywhere in South Africa.`,
    '',
    `Phone ${site.phones.map((p) => p.display).join(' or ')}. WhatsApp ${site.whatsapp.display}. Email ${site.email}. Quotes: ${absoluteUrl('/contact')}`,
    '',
    '## Product ranges',
    ...products.map((p) => link(p.name, `/products/${p.slug}`, p.short)),
    '',
    '## Grades and products',
    ...items.map((i) => link(i.name, `/products/${i.range}/${i.slug}`, i.short)),
    '',
    '## Buying guides',
    ...guides.map((g) => link(g.title, `/guides/${g.slug}`, g.description)),
    '',
    '## Company',
    link('Services', '/services', 'Cutting to size, full lengths or cut pieces, nationwide delivery, quotes and orders'),
    link('About', '/about', `Who we are and how we work`),
    link('Contact', '/contact', 'Phone, WhatsApp, email and the quote form'),
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
