import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'
import { Container, ProductRows } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="pb-16 pt-[128px] md:pt-[168px]">
      <Container>
        <p className="label text-molten">Error 404</p>
        <h1 className="display-xl mt-4">
          Wrong size.
          <br />
          <span className="text-steel">Page not found.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted">
          The page you asked for is not here. It may have moved, or the link may be wrong.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-molten">
            Back to the home page <ArrowRight />
          </Link>
          <Link href="/contact" className="btn btn-line">
            Contact us
          </Link>
        </div>
        <div className="mt-24">
          <p className="label mb-6">Or browse our ranges</p>
          <ProductRows />
        </div>
      </Container>
    </section>
  )
}
