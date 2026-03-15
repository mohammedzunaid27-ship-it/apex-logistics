'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('apex-cookies-accepted')
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  function accept() {
    localStorage.setItem('apex-cookies-accepted', 'true')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-lg rounded-2xl bg-[#0e0e0e]/95 backdrop-blur-xl border border-white/10 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm text-[#c0bbb6] leading-relaxed">
            We use cookies to improve your experience, analyse traffic, and personalise content.
            By continuing, you agree to our{' '}
            <Link href="/privacy" className="text-[#D4AF37] underline underline-offset-2 hover:text-[#F3E5AB] transition-colors">
              Privacy Policy
            </Link>.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={accept}
              className="rounded-xl bg-[#D4AF37] px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-[#F3E5AB]"
            >
              Accept All
            </button>
            <button
              onClick={accept}
              className="rounded-xl border border-white/10 px-6 py-2.5 text-sm text-[#8a8580] transition hover:border-white/20 hover:text-[#e8e4e0]"
            >
              Essential Only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
