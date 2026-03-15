'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, AlertCircle } from 'lucide-react'
import { AnimateInView } from './AnimateInView'

const EASE = [0.22, 1, 0.36, 1] as const
const TRACKING_REGEX = /^APX-\d{4}$/

export function TrackingInput() {
  const [digits, setDigits] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/^APX-?/i, '').replace(/\D/g, '').slice(0, 4)
    setDigits(raw)
    if (error) setError('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && digits.length === 0) {
      e.preventDefault()
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const code = `APX-${digits}`

    if (!TRACKING_REGEX.test(code)) {
      setError('Please enter a valid 4-digit tracking code (e.g. APX-1024)')
      inputRef.current?.focus()
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/track/${digits}`)
      if (res.status === 404) {
        setError('No shipment found for this tracking code.')
        setLoading(false)
        return
      }
      if (!res.ok) {
        setError('Something went wrong. Please try again.')
        setLoading(false)
        return
      }
      router.push(`/track/${digits}`)
    } catch {
      setError('Network error. Please check your connection.')
      setLoading(false)
    }
  }

  const displayValue = `APX-${digits}`

  return (
    <section id="track" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimateInView>
          <p className="text-xs tracking-[0.25em] text-[#4a4a4a] uppercase mb-4 text-center">
            Real-Time Tracking
          </p>
          <h2
            className="text-4xl md:text-5xl font-heading text-[#1a1a1a] text-center mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Track Your Shipment
          </h2>
          <p className="text-[#4a4a4a] text-center mb-12 text-sm">
            Enter your APX delivery code to get real-time status.
          </p>
        </AnimateInView>

        <AnimateInView delay={0.1}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="glass-card rounded-2xl p-2 flex gap-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  value={displayValue}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="APX-1024"
                  aria-label="Tracking code"
                  className="w-full bg-transparent px-4 py-4 text-lg font-heading text-[#1a1a1a] placeholder-[#c5bdb9] focus:outline-none tracking-widest min-h-[56px]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  disabled={loading}
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading || digits.length !== 4}
                className="bg-[#1a1a1a] text-[#e5dad6] px-6 py-4 rounded-xl flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed min-h-[56px] min-w-[56px] justify-center"
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
              >
                {loading ? (
                  <motion.div
                    className="w-4 h-4 border-2 border-[#e5dad6]/30 border-t-[#e5dad6] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  />
                ) : (
                  <>
                    <Search size={16} />
                    <span className="hidden sm:inline">Track</span>
                  </>
                )}
              </motion.button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  className="flex items-center gap-2 text-sm text-[#4a4a4a] mt-3 px-2"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  role="alert"
                >
                  <AlertCircle size={14} className="flex-shrink-0" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <p className="text-center text-xs text-[#9a9490] mt-4">
            Try: APX-1001 · APX-1024 · APX-2048 · APX-3000 · APX-4096
          </p>
        </AnimateInView>
      </div>
    </section>
  )
}
