import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'anonymous'

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 })
  }

  let body: { name?: string; company?: string; cargoType?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, company, cargoType, message } = body

  if (!name?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 })
  }

  if (name.length > 120 || message.length > 2000) {
    return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 })
  }

  // Log the submission — swap this for Resend/Nodemailer in production
  console.log('[Contact Form]', {
    name: name.trim(),
    company: company?.trim() ?? '',
    cargoType: cargoType ?? '',
    message: message.trim(),
    timestamp: new Date().toISOString(),
  })

  return NextResponse.json({
    success: true,
    message: 'Message received. We will be in touch within 24 hours.',
  })
}
