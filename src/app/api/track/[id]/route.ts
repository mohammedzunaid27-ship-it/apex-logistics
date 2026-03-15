import { NextRequest, NextResponse } from 'next/server'
import { mockShipments } from '@/lib/mockData'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60_000
  const max = 30
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= max) return false
  entry.count++
  return true
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'anonymous'

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const { id } = await params
  const trackingCode = `APX-${id}`

  if (!/^APX-\d{4}$/.test(trackingCode)) {
    return NextResponse.json(
      { error: 'Invalid tracking code format. Expected APX-####.' },
      { status: 400 },
    )
  }

  const shipment = mockShipments[id]

  if (!shipment) {
    return NextResponse.json({ error: 'Shipment not found.' }, { status: 404 })
  }

  return NextResponse.json(shipment)
}
