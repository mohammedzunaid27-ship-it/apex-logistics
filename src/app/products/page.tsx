import type { Metadata } from 'next'
import Link from 'next/link'
import { products } from '@/lib/content'
import { items } from '@/lib/items'
import { itemListSchema } from '@/lib/schema'
import { JsonLd } from '@/components/JsonLd'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { PageHero, ProductRows, QuoteBand, Container } from '@/components/ui'

export const metadata: Metadata = pageMeta({
  title: 'Steel & Metal Products in Johannesburg',
  description: `Mild and stainless steel, aluminium, copper, brass, bronze, cast iron, EN steels, Hardox and schedule pipe from ${site.name}, ${site.address.locality}. Cut to size.`,
  path: '/products',
})

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema('Metal products and grades', [
          ...products.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
          ...items.map((i) => ({ name: i.name, path: `/products/${i.range}/${i.slug}` })),
        ])}
      />
      <PageHero
        trail={[{ name: 'Products', path: '/products' }]}
        label={`${products.length} ranges · cut to size`}
        title="Steel and metal products"
        intro={
          <p>
            Ferrous and non-ferrous metals for engineering shops, fabricators, mines and plants, kept in common sizes
            in {site.address.locality} and delivered nationwide. Open a range for the products and grades we carry.
          </p>
        }
      />
      <section className="pb-12">
        <Container>
          <ProductRows />
        </Container>
      </section>
      {/* Directory of every grade and product page */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="seam" />
          <h2 className="display-lg mt-6">Find it by name</h2>
          <p className="mt-5 max-w-xl text-muted">
            Looking for a specific grade or product? Each has its own page with what it is, what it is used for and how
            we supply it.
          </p>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((p) => items.some((i) => i.range === p.slug))
              .map((p) => (
                <div key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="label inline-flex min-h-[40px] items-center text-molten hover:text-fg">
                    {p.name}
                  </Link>
                  <ul className="mt-1 border-t border-line">
                    {items
                      .filter((i) => i.range === p.slug)
                      .map((i) => (
                        <li key={i.slug} className="border-b border-line">
                          <Link href={`/products/${p.slug}/${i.slug}`} className="block py-3 text-fg hover:text-molten">
                            {i.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        </Container>
      </section>

      <QuoteBand title="Not sure what you need?" />
    </>
  )
}
