'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { products } from '@/lib/content'
import { site, whatsappLink } from '@/lib/site'
import { ArrowRight, MailIcon, WhatsAppIcon } from './Icons'

type Status = 'idle' | 'sending' | 'sent' | 'manual'

const empty = { name: '', phone: '', email: '', company: '', product: '', area: '', message: '', website: '' }

function compose(f: typeof empty) {
  const header = [
    `Quote request from ${f.name}`,
    f.company && `Company: ${f.company}`,
    `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    f.product && `Products: ${f.product}`,
    f.area && `Delivery area: ${f.area}`,
  ].filter(Boolean)
  return `${header.join('\n')}\n\n${f.message}`
}

// Reads ?product= from links on the product pages. Wrap in <Suspense> with a
// plain <QuoteForm /> fallback so the form is still in the static HTML.
export function QuoteFormFromParams() {
  const product = useSearchParams().get('product') ?? ''
  return <QuoteForm key={product} initialProduct={product} />
}

export function QuoteForm({ initialProduct = '' }: { initialProduct?: string }) {
  const [form, setForm] = useState(() => ({
    ...empty,
    product: products.some((p) => p.name === initialProduct) ? initialProduct : '',
  }))
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [sentCopy, setSentCopy] = useState(empty)

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError('Please add your name, a phone number and what you need.')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setSentCopy(form)
        setForm(empty)
        setStatus('sent')
        return
      }
      if (res.status === 400 || res.status === 429) {
        setError(data.error ?? 'Please check the form and try again.')
        setStatus('idle')
        return
      }
      setSentCopy(form)
      setStatus('manual')
    } catch {
      setSentCopy(form)
      setStatus('manual')
    }
  }

  if (status === 'sent') {
    return (
      <div className="panel ticks p-8 md:p-12" role="status">
        <p className="label text-molten">Received</p>
        <h3 className="display-md mt-4">Thanks, {sentCopy.name.split(' ')[0]}.</h3>
        <p className="mt-4 max-w-md text-muted">
          Your list is with us. We will come back to you on {sentCopy.phone}
          {sentCopy.email ? ` or ${sentCopy.email}` : ''} with a price.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn btn-line mt-8">
          Send another
        </button>
      </div>
    )
  }

  if (status === 'manual') {
    const body = compose(sentCopy)
    return (
      <div className="panel ticks p-8 md:p-12" role="status">
        <p className="label text-molten">One more tap</p>
        <h3 className="display-md mt-4">Send it straight to us</h3>
        <p className="mt-4 max-w-md text-muted">
          The form could not send automatically. Your details are filled in below, so pick WhatsApp or email and
          press send.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a href={whatsappLink(body)} target="_blank" rel="noopener noreferrer" className="btn btn-molten">
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent('Quote request')}&body=${encodeURIComponent(body)}`}
            className="btn btn-line"
          >
            <MailIcon size={14} /> Email
          </a>
        </div>
        <button type="button" onClick={() => setStatus('idle')} className="label mt-6 underline underline-offset-4 hover:text-fg">
          Back to the form
        </button>
      </div>
    )
  }

  const labelCls = 'label mb-2 block'

  return (
    <form onSubmit={submit} noValidate className="panel ticks grid gap-5 p-6 sm:grid-cols-2 md:p-10">
      <div>
        <label htmlFor="q-name" className={labelCls}>
          Name <span className="text-molten">*</span>
        </label>
        <input id="q-name" name="name" autoComplete="name" required value={form.name} onChange={update} className="field" />
      </div>
      <div>
        <label htmlFor="q-phone" className={labelCls}>
          Phone <span className="text-molten">*</span>
        </label>
        <input id="q-phone" name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={update} className="field" />
      </div>
      <div>
        <label htmlFor="q-email" className={labelCls}>
          Email
        </label>
        <input id="q-email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} className="field" />
      </div>
      <div>
        <label htmlFor="q-company" className={labelCls}>
          Company
        </label>
        <input id="q-company" name="company" autoComplete="organization" value={form.company} onChange={update} className="field" />
      </div>
      <div>
        <label htmlFor="q-product" className={labelCls}>
          What do you need?
        </label>
        <select id="q-product" name="product" value={form.product} onChange={update} className="field">
          <option value="">Choose a range</option>
          {products.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name}
            </option>
          ))}
          <option value="A mix of products">A mix of products</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="q-area" className={labelCls}>
          Delivery area
        </label>
        <input
          id="q-area"
          name="area"
          placeholder="Suburb, or collect"
          value={form.area}
          onChange={update}
          className="field"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="q-message" className={labelCls}>
          Sizes and quantities <span className="text-molten">*</span>
        </label>
        <textarea
          id="q-message"
          name="message"
          rows={5}
          required
          placeholder={'e.g. 6 × 50×50×3 square tube, cut to 2.4 m\n2 sheets 3 mm chequer plate'}
          value={form.message}
          onChange={update}
          className="field resize-y"
        />
      </div>
      {/* honeypot: real people never see or fill this */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="q-website">Website</label>
        <input id="q-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-faint">
          We use these details only to reply to you. See our{' '}
          <a href="/privacy" className="underline underline-offset-2 hover:text-fg">
            privacy policy
          </a>
          .
        </p>
        <button type="submit" disabled={status === 'sending'} className="btn btn-molten disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send for a quote'} <ArrowRight />
        </button>
      </div>
      {error ? (
        <p role="alert" className="text-sm text-molten-hot sm:col-span-2">
          {error}
        </p>
      ) : null}
    </form>
  )
}
