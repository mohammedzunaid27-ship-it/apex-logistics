'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

const metrics = [
  { value: '10+', label: 'Years Experience' },
  { value: '2,000+', label: 'Tons Delivered' },
  { value: '98.8%', label: 'Success Rate' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="text-xs tracking-[0.3em] text-[#4a4a4a] uppercase mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
        >
          Johannesburg, South Africa · Nationwide
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-heading text-[#1a1a1a] leading-[1.05] tracking-tight mb-8"
          style={{ fontFamily: 'var(--font-heading)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
        >
          Moving South Africa
          <br />
          <em className="not-italic text-[#4a4a4a]">Forward.</em>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-[#4a4a4a] max-w-2xl mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.35 }}
        >
          Premium nationwide freight — furniture, wholesale goods, commodities,
          and specialized cargo. Delivered with precision, every time.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
        >
          <Link
            href="/#track"
            className="bg-[#1a1a1a] text-[#e5dad6] px-8 py-4 rounded-xl text-sm tracking-wide hover:bg-[#2a2a2a] active:scale-[0.97] transition-all min-h-[52px] flex items-center"
          >
            Track Your Delivery
          </Link>
          <Link
            href="/#contact"
            className="glass-card px-8 py-4 rounded-xl text-sm text-[#1a1a1a] tracking-wide hover:bg-white/50 active:scale-[0.97] transition-all min-h-[52px] flex items-center"
          >
            Request a Quote
          </Link>
        </motion.div>

        {/* Credibility Metrics */}
        <motion.div
          className="glass-card rounded-2xl px-6 py-6 grid grid-cols-3 gap-4 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.6 }}
        >
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <p
                className="text-3xl md:text-4xl font-heading text-[#1a1a1a]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {m.value}
              </p>
              <p className="text-xs text-[#4a4a4a] mt-1 leading-tight">{m.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-[#9a9490]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
