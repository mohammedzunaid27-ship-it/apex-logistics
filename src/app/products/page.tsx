import type { Metadata } from 'next'
import { products } from '@/lib/content'
import { site } from '@/lib/site'
import { pageMeta } from '@/lib/meta'
import { PageHero, ProductRows, QuoteBand, Container } from '@/components/ui'

export const metadata: Metadata = pageMeta({
  title: 'Steel & Metal Products in Johannesburg',
  description: `Structural steel, sheet, plate, tube, bar, stainless, aluminium, rebar and mesh from ${site.name}, ${site.address.locality}. Cut to size and delivered.`,
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
            Everything a builder, fabricator or engineering shop needs from a steel merchant, kept in common sizes
            in our {site.address.locality} yard. Pick a range for the sizes we usually carry.
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
