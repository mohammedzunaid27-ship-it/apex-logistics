import Link from 'next/link'
import type { Block } from '@/lib/guides'
import { ArrowUpRight } from './Icons'
import { Container } from './ui'

// Turns [text](/path) in guide copy into site links. Only internal paths are
// written this way, so every match becomes a <Link>.
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\(\/[^)]*\))/g)
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/)
        return m ? (
          <Link key={i} href={m[2]}>
            {m[1]}
          </Link>
        ) : (
          part
        )
      })}
    </>
  )
}

export function GuideBlock({ block }: { block: Block }) {
  if (typeof block === 'string') {
    return (
      <p>
        <Inline text={block} />
      </p>
    )
  }
  if ('list' in block) {
    return (
      <ul>
        {block.list.map((li) => (
          <li key={li}>
            <Inline text={li} />
          </li>
        ))}
      </ul>
    )
  }
  const { caption, head, rows } = block.table
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-label={caption}>
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.join('|')}>
              {r.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={i}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// "Before you order" links from product pages to the guides that cover them
export function GuideLinks({ guides }: { guides: { slug: string; title: string; description: string }[] }) {
  if (guides.length === 0) return null
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="seam" />
        <h2 className="display-md mt-6" data-reveal>
          Before you order
        </h2>
        <ul className="mt-8 border-t border-line">
          {guides.map((g) => (
            <li key={g.slug} className="border-b border-line" data-reveal>
              <Link href={`/guides/${g.slug}`} className="group grid gap-2 py-6 md:grid-cols-12 md:gap-8">
                <span className="font-display text-2xl font-extrabold uppercase leading-none md:col-span-5">{g.title}</span>
                <span className="flex items-start justify-between gap-4 text-muted md:col-span-7">
                  {g.description}
                  <ArrowUpRight className="mt-1 shrink-0 transition-colors group-hover:text-molten" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
