import Link from 'next/link'
import { products } from '@/lib/content'
import { site, whatsappLink } from '@/lib/site'
import { LogoMark } from './Icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-24 border-t border-line bg-base/95">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
              <LogoMark size={44} className="text-steel" />
              <span className="font-display text-3xl font-extrabold uppercase leading-none">Apex Metals</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm text-muted">
              Steel merchants in {site.address.locality}. Structural steel, sheet, plate, tube, bar, mesh and
              non-ferrous metals, cut to size and delivered across {site.address.region}.
            </p>
            <address className="mt-6 not-italic">
              <p className="label">
                {site.address.locality}, {site.address.region}, {site.address.countryName}
              </p>
            </address>
          </div>

          <nav aria-label="Products" className="md:col-span-3">
            <p className="label mb-5 text-fg">Products</p>
            <ul className="space-y-2.5 text-sm text-muted">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="hover:text-fg">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <p className="label mb-5 text-fg">Company</p>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/services" className="hover:text-fg">Services</Link></li>
              <li><Link href="/about" className="hover:text-fg">About</Link></li>
              <li><Link href="/contact" className="hover:text-fg">Contact</Link></li>
              <li><Link href="/contact#quote" className="hover:text-fg">Request a quote</Link></li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label mb-5 text-fg">Talk to us</p>
            <ul className="space-y-2.5 text-sm text-muted">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="hover:text-fg">{p.display}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-fg">{site.email}</a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line py-8">
          <p className="label mb-3 text-fg">Delivering to</p>
          <p className="text-sm leading-relaxed text-faint">{site.serviceAreas.join(' · ')}</p>
        </div>

        <p aria-hidden className="outline-text select-none font-display text-[22vw] font-extrabold uppercase leading-[0.78] tracking-tight md:text-[17.5vw] xl:text-[15rem]">
          Apex Metals
        </p>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.yearsInTrade} years in steel.
          </p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="hover:text-fg">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-fg">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
