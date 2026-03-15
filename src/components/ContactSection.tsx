'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, CheckCircle } from 'lucide-react'
import { AnimateInView } from './AnimateInView'

const EASE = [0.22, 1, 0.36, 1] as const

const cargoTypes = [
  'Furniture',
  'Wholesale Goods',
  'Steel',
  'Copper',
  'Aluminium',
  'Other Metals',
  'General Freight',
  'Other',
]

export function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    cargoType: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) {
      setError('Name and message are required.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      setSuccess(true)
      setForm({ name: '', company: '', cargoType: '', message: '' })
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-white/40 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-3.5 text-sm text-[#1a1a1a] placeholder-[#9a9490] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors min-h-[48px]'

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimateInView>
          <p className="text-xs tracking-[0.25em] text-[#4a4a4a] uppercase mb-4 text-center">
            Get In Touch
          </p>
          <h2
            className="text-4xl md:text-5xl font-heading text-[#1a1a1a] text-center mb-16 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Request a Quote
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <AnimateInView className="lg:col-span-2" direction="left">
            <div className="glass-card rounded-2xl p-8 h-full flex flex-col gap-8">
              <div>
                <h3
                  className="text-xl font-heading text-[#1a1a1a] mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Apex Logistics
                </h3>
                <p className="text-sm text-[#4a4a4a] leading-relaxed">
                  A subsidiary of Apex Metals. Johannesburg, South Africa.
                  Available for nationwide freight enquiries.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="tel:0615456926"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2a2a2a] transition-colors">
                    <Phone size={16} className="text-[#e5dad6]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] text-[#9a9490] uppercase">
                      Phone
                    </p>
                    <p className="text-sm text-[#1a1a1a] font-medium">061 545 6926</p>
                  </div>
                </a>

                <a
                  href="mailto:ApexLogistics@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2a2a2a] transition-colors">
                    <Mail size={16} className="text-[#e5dad6]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] text-[#9a9490] uppercase">
                      Email
                    </p>
                    <p className="text-sm text-[#1a1a1a] font-medium">
                      ApexLogistics@gmail.com
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-auto pt-6 border-t border-white/30">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['10+', 'Years'],
                    ['98.8%', 'On-Time'],
                  ].map(([val, label]) => (
                    <div key={label}>
                      <p
                        className="text-2xl font-heading text-[#1a1a1a]"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {val}
                      </p>
                      <p className="text-xs text-[#9a9490]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateInView>

          {/* Form */}
          <AnimateInView className="lg:col-span-3" delay={0.1}>
            <div className="glass-card rounded-2xl p-8">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center text-center py-12 gap-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                      <CheckCircle size={28} className="text-[#e5dad6]" />
                    </div>
                    <h3
                      className="text-xl font-heading text-[#1a1a1a]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Message Received
                    </h3>
                    <p className="text-sm text-[#4a4a4a] max-w-xs">
                      Thank you. We will be in touch within 24 hours.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="text-xs text-[#9a9490] hover:text-[#1a1a1a] transition-colors mt-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#4a4a4a] mb-1.5 tracking-wide">
                          Name <span className="text-[#9a9490]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={inputClass}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#4a4a4a] mb-1.5 tracking-wide">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Company name"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#4a4a4a] mb-1.5 tracking-wide">
                        Cargo Type
                      </label>
                      <select
                        name="cargoType"
                        value={form.cargoType}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select cargo type</option>
                        {cargoTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#4a4a4a] mb-1.5 tracking-wide">
                        Message <span className="text-[#9a9490]">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your freight requirements..."
                        rows={4}
                        className={`${inputClass} resize-none min-h-[120px]`}
                        required
                      />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          className="text-sm text-[#4a4a4a] flex items-center gap-2"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          role="alert"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="bg-[#1a1a1a] text-[#e5dad6] py-4 rounded-xl text-sm tracking-wide hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[52px] flex items-center justify-center gap-2"
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <motion.div
                          className="w-4 h-4 border-2 border-[#e5dad6]/30 border-t-[#e5dad6] rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        />
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
