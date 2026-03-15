'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { heading } from '@/lib/fonts'

export function Navbar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-4 mt-4 rounded-2xl px-6 py-5 grid grid-cols-3 items-center bg-[#0e0e0e]/85 backdrop-blur-xl border border-white/[0.12] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Left — Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#services"
            className="text-sm text-[#8a8580] hover:text-[#D4AF37] transition-colors"
          >
            Services
          </Link>
          <Link
            href="/#track"
            className="text-sm text-[#8a8580] hover:text-[#D4AF37] transition-colors"
          >
            Track
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-[#8a8580] hover:text-[#D4AF37] transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Center — Logo */}
        <Link href="/" className="flex flex-col items-center leading-none justify-self-center">
          <span
            className={`${heading.className} text-5xl md:text-6xl tracking-widest text-[#e8e4e0] font-bold`}
          >
            APEX
          </span>
          <span className={`${heading.className} mt-0.5 text-lg md:text-xl tracking-[0.3em] text-[#D4AF37]/70 font-normal`}>
            LOGISTICS
          </span>
        </Link>

        {/* Right — Phone */}
        <div className="flex justify-end">
          <a
            href="tel:0615456926"
            className="flex items-center gap-2 bg-[#D4AF37] text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#F3E5AB] active:scale-[0.97] transition-all min-h-[48px] min-w-[48px] justify-center"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">061 545 6926</span>
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
