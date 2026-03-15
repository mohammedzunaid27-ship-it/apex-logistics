'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Phone, Menu, X } from 'lucide-react'
import { heading } from '@/lib/fonts'

const ease = [0.22, 1, 0.36, 1] as const

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#technology', label: 'Technology' },
  { href: '/#track', label: 'Track' },
  { href: '/#contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {/* Desktop & mobile top bar */}
      <nav className="mx-3 sm:mx-4 mt-3 sm:mt-4 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center bg-[#0e0e0e]/90 backdrop-blur-xl border border-white/[0.12] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Left — hamburger on mobile, nav links on desktop */}
        <div className="flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#8a8580] hover:text-[#e8e4e0] active:bg-white/5 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#8a8580] hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Center — Logo */}
        <Link href="/" className="flex flex-col items-center leading-none justify-self-center">
          <span
            className={`${heading.className} text-3xl sm:text-5xl md:text-6xl tracking-widest text-[#e8e4e0] font-bold`}
          >
            APEX
          </span>
          <span className={`${heading.className} mt-0.5 text-xs sm:text-lg md:text-xl tracking-[0.3em] text-[#D4AF37]/70 font-normal`}>
            LOGISTICS
          </span>
        </Link>

        {/* Right — Phone */}
        <div className="flex justify-end">
          <a
            href="tel:0615456926"
            className="flex items-center gap-2 bg-[#D4AF37] text-black text-sm font-semibold px-3 sm:px-4 py-2.5 rounded-xl hover:bg-[#F3E5AB] active:scale-[0.97] transition-all min-h-[44px] min-w-[44px] justify-center"
          >
            <Phone size={14} />
            <span className="hidden sm:inline">061 545 6926</span>
          </a>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden mx-3 mt-2 rounded-2xl bg-[#0e0e0e]/95 backdrop-blur-xl border border-white/[0.12] shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="py-4 px-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-[#8a8580] hover:text-[#D4AF37] transition-colors border-b border-white/5 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:0714907858"
                className="block py-3 text-base text-[#8a8580] hover:text-[#D4AF37] transition-colors"
              >
                071 490 7858
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
