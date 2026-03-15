import Link from 'next/link'
import { ArrowLeft, PackageX } from 'lucide-react'

export default function TrackNotFound() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-12 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-6">
          <PackageX size={28} className="text-[#8a8580]" />
        </div>
        <h1
          className="text-3xl font-heading text-[#e8e4e0] mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Not Found
        </h1>
        <p className="text-sm text-[#8a8580] mb-8 leading-relaxed">
          No shipment found for this tracking code. Please check the code and try
          again.
        </p>
        <Link
          href="/#track"
          className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#F3E5AB] transition-colors"
        >
          <ArrowLeft size={14} />
          Try Another Code
        </Link>
      </div>
    </main>
  )
}
