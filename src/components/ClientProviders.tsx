'use client'

import { LenisProvider } from './LenisProvider'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'
import { CookieConsent } from './CookieConsent'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </LenisProvider>
  )
}
