import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-10 sm:py-12 px-4 border-t border-white/8">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
        {/* Logo + tagline */}
        <div className="text-center">
          <p
            className="text-sm text-[#e8e4e0]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Apex Logistics
          </p>
          <p className="text-xs text-[#555] mt-0.5">A subsidiary of Apex Metals · Johannesburg, South Africa</p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#8a8580]">
          <Link href="/#services" className="hover:text-[#D4AF37] transition-colors">
            Services
          </Link>
          <Link href="/#technology" className="hover:text-[#D4AF37] transition-colors">
            Technology
          </Link>
          <Link href="/#track" className="hover:text-[#D4AF37] transition-colors">
            Track
          </Link>
          <Link href="/#contact" className="hover:text-[#D4AF37] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Phone numbers */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#8a8580]">
          <a href="tel:0615456926" className="hover:text-[#D4AF37] transition-colors">
            061 545 6926
          </a>
          <a href="tel:0714907858" className="hover:text-[#D4AF37] transition-colors">
            071 490 7858
          </a>
          <a href="mailto:ApexLogistics@gmail.com" className="hover:text-[#D4AF37] transition-colors">
            ApexLogistics@gmail.com
          </a>
        </div>

        {/* Legal + copyright */}
        <div className="flex flex-col items-center gap-2">
          <nav className="flex items-center gap-4 text-xs text-[#555]">
            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
          </nav>
          <p className="text-xs text-[#555]">
            &copy; {new Date().getFullYear()} Apex Logistics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
