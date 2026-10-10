import { NextRequest, NextResponse } from 'next/server'
import { enquiryTypes, products } from '@/lib/content'
import { site } from '@/lib/site'

// Quote requests are emailed through Resend when RESEND_API_KEY is set.
// Without it the route answers 503 and the form hands the visitor a
// pre-filled WhatsApp message or email instead, so no request is lost.
//
// Only the site's own form can post here: same-origin JSON, a small body and
// known fields. Anything that trips the bot checks gets a fake success.

const MAX_BODY = 16_000
const MIN_FILL_MS = 2_000

const LIMITS = { enquiry: 40, name: 120, phone: 40, email: 160, company: 160, product: 80, area: 120, message: 3000 }
type Field = keyof typeof LIMITS

const productChoices = new Set(['', ...products.map((p) => p.name), 'A mix of products', 'Not sure yet'])

// ── rate limiting ────────────────────────────────────────────────
// Per server instance, so it slows a flood rather than stopping it outright.
// Timestamps are kept for an hour and the table is capped so it cannot grow
// without bound.
const MINUTE = 60_000
const HOUR = 60 * MINUTE
const PER_IP = [
  { window: MINUTE, max: 5 },
  { window: HOUR, max: 20 },
]
const ALL_IPS_PER_MINUTE = 40
const MAX_TRACKED = 5_000

const hits = new Map<string, number[]>()
let recent: number[] = []

function rateLimited(ip: string, now: number) {
  recent = recent.filter((t) => now - t < MINUTE)
  if (recent.length >= ALL_IPS_PER_MINUTE) return true

  if (hits.size > MAX_TRACKED) {
    for (const [key, times] of hits) if (now - times[times.length - 1] > HOUR) hits.delete(key)
    if (hits.size > MAX_TRACKED) hits.clear()
  }

  const times = (hits.get(ip) ?? []).filter((t) => now - t < HOUR)
  if (PER_IP.some(({ window, max }) => times.filter((t) => now - t < window).length >= max)) {
    hits.set(ip, times)
    return true
  }
  times.push(now)
  hits.set(ip, times)
  recent.push(now)
  return false
}

// ── input cleaning ───────────────────────────────────────────────
// Control characters and bidi overrides are dropped; single-line fields lose
// line breaks so nothing can spill into the email subject.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F‪-‮⁦-⁩]/g

function clean(value: unknown, multiline: boolean) {
  if (typeof value !== 'string') return ''
  const s = value.normalize('NFC').replace(/\r\n?/g, '\n').replace(/\t/g, ' ').replace(CONTROL, '')
  return multiline ? s.replace(/\n{3,}/g, '\n\n').trim() : s.replace(/\s+/g, ' ').trim()
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i
const PHONE_CHARS = /^[0-9+()\-.\s]+$/

function reply(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

function fromThisSite(request: NextRequest) {
  const fetchSite = request.headers.get('sec-fetch-site')
  if (fetchSite && fetchSite !== 'same-origin') return false
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (!origin || !host) return false
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  if (!fromThisSite(request)) {
    return reply({ ok: false, error: 'Please use the form on our contact page.' }, 403)
  }

  const type = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()
  if (type !== 'application/json') {
    return reply({ ok: false, error: 'Invalid request.' }, 415)
  }

  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) {
    return reply({ ok: false, error: 'That message is too long.' }, 413)
  }

  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip, Date.now())) {
    return reply({ ok: false, error: 'Too many requests. Please wait a few minutes or WhatsApp us.' }, 429)
  }

  let body: Record<string, unknown>
  try {
    const text = await request.text()
    if (text.length > MAX_BODY) return reply({ ok: false, error: 'That message is too long.' }, 413)
    const parsed: unknown = JSON.parse(text)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object')
    body = parsed as Record<string, unknown>
  } catch {
    return reply({ ok: false, error: 'Invalid request.' }, 400)
  }

  // bots fill the hidden field or submit faster than anyone can type; pretend it worked
  const elapsed = typeof body.elapsed === 'number' ? body.elapsed : null
  if ((typeof body.website === 'string' && body.website.trim()) || (elapsed !== null && elapsed < MIN_FILL_MS)) {
    return reply({ ok: true })
  }

  const data = {} as Record<Field, string>
  for (const key of Object.keys(LIMITS) as Field[]) {
    const value = clean(body[key], key === 'message')
    if (value.length > LIMITS[key]) {
      return reply({ ok: false, error: 'One of the fields is too long.' }, 400)
    }
    data[key] = value
  }

  if (!(enquiryTypes as readonly string[]).includes(data.enquiry)) data.enquiry = enquiryTypes[0]
  if (!productChoices.has(data.product)) data.product = ''

  if (data.name.length < 2 || !data.phone || data.message.length < 3) {
    return reply({ ok: false, error: 'Please add your name, a phone number and what you need.' }, 400)
  }
  const digits = data.phone.replace(/\D/g, '').length
  if (!PHONE_CHARS.test(data.phone) || digits < 9 || digits > 15) {
    return reply({ ok: false, error: 'That phone number does not look right.' }, 400)
  }
  if (data.email && !EMAIL.test(data.email)) {
    return reply({ ok: false, error: 'That email address does not look right.' }, 400)
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return reply({ ok: false, fallback: true }, 503)
  }

  const fields = (Object.keys(LIMITS) as Field[]).filter((k) => k !== 'message' && data[k])
  const rows = fields
    .map((k) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${escapeHtml(data[k])}</td></tr>`)
    .join('')
  const text = `${fields.map((k) => `${k}: ${data[k]}`).join('\n')}\n\n${data.message}`
  const subject = `${data.enquiry} enquiry: ${data.name}${data.company ? ` (${data.company})` : ''}`.slice(0, 200)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL ?? 'Apex Metals website <onboarding@resend.dev>',
      to: [process.env.QUOTE_TO_EMAIL ?? site.email],
      reply_to: data.email || undefined,
      subject,
      text,
      html: `<table>${rows}</table><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
    }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null)

  if (!res?.ok) {
    return reply({ ok: false, fallback: true }, 502)
  }

  return reply({ ok: true })
}
