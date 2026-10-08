import { NextRequest, NextResponse } from 'next/server'
import { site } from '@/lib/site'

// Quote requests are emailed through Resend when RESEND_API_KEY is set.
// Without it the route answers 503 and the form hands the visitor a
// pre-filled WhatsApp message or email instead, so no request is lost.

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60_000
  const max = 5
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= max) return false
  entry.count++
  return true
}

const LIMITS = { enquiry: 40, name: 120, phone: 40, email: 160, company: 160, product: 80, area: 120, message: 3000 }
type Field = keyof typeof LIMITS

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? 'anonymous'

  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Please wait a minute.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  // bots fill the hidden field; pretend it worked
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: true })
  }

  const data = {} as Record<Field, string>
  for (const key of Object.keys(LIMITS) as Field[]) {
    const value = typeof body[key] === 'string' ? (body[key] as string).trim() : ''
    if (value.length > LIMITS[key]) {
      return NextResponse.json({ ok: false, error: 'One of the fields is too long.' }, { status: 400 })
    }
    data[key] = value
  }

  if (!data.name || !data.phone || !data.message) {
    return NextResponse.json(
      { ok: false, error: 'Please add your name, a phone number and what you need.' },
      { status: 400 },
    )
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: 'That email address does not look right.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ ok: false, fallback: true }, { status: 503 })
  }

  const rows = (Object.keys(LIMITS) as Field[])
    .filter((k) => k !== 'message' && data[k])
    .map((k) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${escapeHtml(data[k])}</td></tr>`)
    .join('')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM_EMAIL ?? 'Apex Metals website <onboarding@resend.dev>',
      to: [process.env.QUOTE_TO_EMAIL ?? site.email],
      reply_to: data.email || undefined,
      subject: `${data.enquiry || 'Website'} enquiry: ${data.name}${data.company ? ` (${data.company})` : ''}`,
      html: `<table>${rows}</table><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
    }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null)

  if (!res?.ok) {
    return NextResponse.json({ ok: false, fallback: true }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
