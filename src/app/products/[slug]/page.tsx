import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, products, services } from '@/lib/content'
import { itemsForRange } from '@/lib/items'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { faqSchema, productCategorySchema } from '@/lib/schema'
import { JsonLd } from '@/components/JsonLd'
import { SteelPhoto } from '@/components/SteelPhoto'
import { ArrowRight, ArrowUpRight, ProfileIcon, ServiceIcon } from '@/components/Icons'
import { Breadcrumbs, Container, Faq, ProductRows, QuoteBand } from '@/components/ui'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) return {}
  return pageMeta({
    title: `${p.name} Supplier in Johannesburg`,
    description: `${p.short} Cut to size and delivered nationwide from ${site.address.locality}.`,
    path: `/products/${p.slug}`,
    keywords: p.keywords,
    ownImage: true,
  })
}

const relevantServices = ['cutting', 'lengths', 'delivery']

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) notFound()

  const index = products.indexOf(p) + 1
  const others = products.filter((o) => o.slug !== p.slug)
  const rangeItems = itemsForRange(p.slug)

  return (
    <>
      <JsonLd data={[productCategorySchema(p), faqSchema(p.faqs)]} />

      <section className="pb-16 pt-[128px] md:pt-[168px]">
        <Container>
          <Breadcrumbs
            trail={[
              { name: 'Products', path: '/products' },
              { name: p.name, path: `/products/${p.slug}` },
            ]}
          />
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="label flex items-center gap-4 text-molten">
                <span>Range 0{index}</span>
                <span className="h-px w-10 bg-molten" />
                <span className="text-muted">{site.address.locality}</span>
              </p>
              <h1 className="mt-5">
                <span className="display-xl block">{p.name}</span>
                <span className="mt-4 block font-body text-xl font-normal normal-case tracking-normal text-muted md:text-2xl">
                  Supplier in {site.address.locality}. Cut to size, delivered nationwide.
                </span>
              </h1>
            </div>
            <div className="hidden items-end justify-end md:col-span-4 md:flex">
              <ProfileIcon name={p.profile} size={160} className="text-line-strong" />
            </div>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <p className="text-lg leading-relaxed text-muted md:col-span-6 md:text-xl">{p.intro}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:col-span-5 md:col-start-8 md:flex-col md:items-stretch">
              <Link href={`/contact?product=${encodeURIComponent(p.name)}#quote`} className="btn btn-molten">
                Request a quote <ArrowRight />
              </Link>
              <a href={`tel:${site.phones[0].tel}`} className="btn btn-line">
                Call {site.phones[0].display}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <figure className="ticks relative aspect-[16/9] overflow-hidden border border-line bg-raised md:aspect-[21/8]" data-reveal>
            <SteelPhoto photo={p.photo} priority sizes="100vw" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
          </figure>
        </Container>
      </section>

      {/* ── Stock table ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4" data-reveal>
              <div className="seam" />
              <h2 className="display-md mt-6">What we stock</h2>
              <p className="mt-5 text-muted">{p.supply}</p>
              <p className="mt-4 text-sm text-faint">
                Sizes and grades on the floor change with every delivery. Send your list and we confirm exactly what
                is available before you pay.
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6" data-reveal>
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  {p.name} stocked by {site.name}
                </caption>
                <thead className="hidden sm:table-header-group">
                  <tr className="border-b border-line-strong">
                    <th scope="col" className="label py-4 pr-6 font-normal">Product</th>
                    <th scope="col" className="label py-4 font-normal">Notes</th>
                  </tr>
                </thead>
                <tbody className="border-t border-line-strong sm:border-t-0">
                  {/* rows stack on phones so long names never squeeze the notes */}
                  {p.items.map((item) => (
                    <tr key={item.name} className="block border-b border-line py-4 sm:table-row sm:py-0">
                      <th
                        scope="row"
                        className="block align-top font-display text-2xl font-extrabold uppercase leading-tight sm:table-cell sm:w-1/2 sm:py-5 sm:pr-6"
                      >
                        {item.name}
                      </th>
                      <td className="mt-1 block align-top text-muted sm:mt-0 sm:table-cell sm:py-5">{item.spec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Grade and product pages in this range ── */}
      {rangeItems.length > 0 && (
        <section className="py-12 md:py-20">
          <Container>
            <div className="seam" />
            <h2 className="display-md mt-6" data-reveal>
              {p.name}: grades and products
            </h2>
            <ul className="mt-10 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {rangeItems.map((it) => (
                <li key={it.slug} className="border-b border-r border-line">
                  <Link
                    href={`/products/${p.slug}/${it.slug}`}
                    className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span className="font-display text-2xl font-extrabold uppercase leading-none">{it.name}</span>
                      <ArrowUpRight className="shrink-0 text-muted transition-colors group-hover:text-molten" />
                    </span>
                    <span className="text-sm text-muted">{it.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* ── Uses + services ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5" data-reveal>
              <div className="seam" />
              <h2 className="display-md mt-6">Used for</h2>
              <ul className="mt-8 border-t border-line">
                {p.uses.map((u) => (
                  <li key={u} className="flex items-center gap-4 border-b border-line py-4">
                    <span className="h-1.5 w-1.5 shrink-0 bg-molten" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-6 md:col-start-7" data-reveal>
              <div className="seam" />
              <h2 className="display-md mt-6">Ready when it arrives</h2>
              <ul className="mt-8 grid gap-px border border-line bg-line">
                {services
                  .filter((s) => relevantServices.includes(s.id))
                  .map((s) => (
                    <li key={s.id} className="grid grid-cols-[auto_1fr] gap-5 bg-base p-6">
                      <ServiceIcon name={s.icon} size={36} className="text-molten" />
                      <div>
                        <h3 className="font-display text-2xl font-extrabold uppercase leading-none">{s.name}</h3>
                        <p className="mt-2 text-sm text-muted">{s.body}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4" data-reveal>
              <div className="seam" />
              <h2 className="display-md mt-6">{p.name} questions</h2>
            </div>
            <div className="md:col-span-8">
              <Faq items={p.faqs} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Other ranges ── */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="seam" />
          <h2 className="display-md mt-6" data-reveal>
            Other ranges
          </h2>
          <div className="mt-10">
            <ProductRows items={others} />
          </div>
        </Container>
      </section>

      <QuoteBand title={`Need ${p.name.toLowerCase()}?`} />
    </>
  )
}
