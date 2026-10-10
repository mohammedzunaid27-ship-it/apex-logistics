import Link from 'next/link'
import { products } from '@/lib/content'
import { site, whatsappLink } from '@/lib/site'
import { LogoMark } from './Icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-24 border-t border-line bg-base/95">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-12 md:py-16">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="flex min-h-[44px] items-center gap-3" aria-label={`${site.name} home`}>
              <LogoMark size={44} className="text-steel" />
              <span className="font-display text-3xl font-extrabold uppercase leading-none">Apex Metals</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm text-muted">
              Metal merchants in {site.address.locality}. Mild and stainless steel, aluminium, copper, brass,
              bronze, cast iron, engineering steels and wear plate, cut to size and delivered nationwide.
            </p>
            <address className="mt-6 not-italic">
              <p className="label">
                {site.address.locality}, {site.address.region}, {site.address.countryName}
              </p>
            </address>
          </div>

          <nav aria-label="Products" className="md:col-span-3">
            <p className="label mb-3 text-fg md:mb-5">Products</p>
            <ul className="text-sm text-muted">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="block py-2.5 hover:text-fg lg:py-1.5">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <p className="label mb-3 text-fg md:mb-5">Company</p>
            <ul className="text-sm text-muted">
              <li><Link href="/services" className="block py-2.5 hover:text-fg lg:py-1.5">Services</Link></li>
              <li><Link href="/guides" className="block py-2.5 hover:text-fg lg:py-1.5">Buying guides</Link></li>
              <li><Link href="/about" className="block py-2.5 hover:text-fg lg:py-1.5">About</Link></li>
              <li><Link href="/contact" className="block py-2.5 hover:text-fg lg:py-1.5">Contact</Link></li>
              <li><Link href="/contact#quote" className="block py-2.5 hover:text-fg lg:py-1.5">Request a quote</Link></li>
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3">
            <p className="label mb-3 text-fg md:mb-5">Talk to us</p>
            <ul className="text-sm text-muted">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="block py-2.5 hover:text-fg lg:py-1.5">{p.display}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="block break-all py-2.5 hover:text-fg lg:py-1.5">{site.email}</a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="block py-2.5 hover:text-fg lg:py-1.5">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line py-8">
          <p className="label mb-3 text-fg">Nationwide delivery, including</p>
          <p className="text-sm leading-relaxed text-faint">{site.serviceAreas.join(' · ')}</p>
        </div>

        <p aria-hidden className="outline-text select-none font-display text-[22vw] font-extrabold uppercase leading-[0.78] tracking-tight md:text-[17.5vw] xl:text-[15rem]">
          Apex Metals
        </p>

        <div className="flex flex-col gap-2 border-t border-line pb-28 pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-6">
          <p>
            © {year} {site.legalName}. {site.yearsInTrade} years in metal.
          </p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="inline-block py-3 hover:text-fg">Privacy Policy</Link></li>
            <li><Link href="/terms" className="inline-block py-3 hover:text-fg">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
