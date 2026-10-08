'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CloseIcon, LogoMark, MenuIcon, PhoneIcon, WhatsAppIcon, ArrowRight } from './Icons'
import { primaryPhone, site, whatsappLink } from '@/lib/site'

const links = [
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-colors duration-300 ${
          scrolled || open ? 'border-line bg-base/90 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8"
        >
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
            <LogoMark size={40} className="text-steel transition-colors group-hover:text-fg" />
            <span className="font-display text-[1.65rem] font-extrabold uppercase leading-none tracking-[0.02em]">
              Apex<span className="text-muted"> Metals</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className={`label relative py-2 transition-colors hover:text-fg ${isActive(l.href) ? 'text-fg' : ''}`}
                >
                  {l.label}
                  {isActive(l.href) && <span className="absolute inset-x-0 -bottom-px h-px bg-molten" />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 md:flex">
            <a href={`tel:${primaryPhone.tel}`} className="label flex items-center gap-2 text-fg hover:text-molten">
              <PhoneIcon size={14} />
              {primaryPhone.display}
            </a>
            <Link href="/contact#quote" className="btn btn-molten !min-h-[42px] !px-4">
              Get a quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center border border-line-strong md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </nav>
      </div>

      <div
        id="mobile-menu"
        data-lenis-prevent
        className={`fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-base px-5 pb-10 pt-6 transition-[opacity,transform] duration-300 md:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
      >
        <ul className="border-t border-line">
          {links.map((l, i) => (
            <li key={l.href} className="border-b border-line">
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-5"
              >
                <span className="font-display text-5xl font-extrabold uppercase leading-none">{l.label}</span>
                <span className="label">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-3">
          <Link href="/contact#quote" onClick={() => setOpen(false)} className="btn btn-molten w-full">
            Get a quote <ArrowRight />
          </Link>
          {site.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="btn btn-line w-full">
              <PhoneIcon size={14} /> {p.display}
            </a>
          ))}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-line w-full">
            <WhatsAppIcon size={16} className="text-[#25d366]" /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
