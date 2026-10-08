import type { Metadata } from 'next'
import { products } from '@/lib/content'
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
      <QuoteBand title="Not sure what you need?" />
    </>
  )
}
