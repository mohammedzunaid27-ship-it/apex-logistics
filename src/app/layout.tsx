import type { Metadata, Viewport } from 'next'
import { Big_Shoulders, Familjen_Grotesk, Martian_Mono } from 'next/font/google'
import './globals.css'
import { site } from '@/lib/site'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { JsonLd } from '@/components/JsonLd'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { SmoothScroll } from '@/components/SmoothScroll'
import { RevealObserver } from '@/components/RevealObserver'
import { Backdrop } from '@/components/Backdrop'
import { IntroImpact } from '@/components/intro/IntroImpact'

// Big Shoulders: a condensed industrial grotesque cut from Chicago's
// steel-town signage. Familjen Grotesk for reading, Martian Mono for specs.
const display = Big_Shoulders({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-display-var',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['Arial Narrow', 'sans-serif'],
})

const body = Familjen_Grotesk({
  subsets: ['latin'],
  variable: '--font-body-var',
  display: 'swap',
})

const mono = Martian_Mono({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-mono-var',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0b0c',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Steel Supplier in Johannesburg | Apex Metals',
    template: '%s | Apex Metals',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'steel supplier Johannesburg',
    'steel merchant Johannesburg',
    'structural steel Johannesburg',
    'steel suppliers Gauteng',
    'I-beams Johannesburg',
    'steel tubing Johannesburg',
    'sheet metal Johannesburg',
    'chequer plate',
    'flat bar',
    'stainless steel Johannesburg',
    'rebar Johannesburg',
    'steel cut to size',
    'Apex Metals',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'business',
  alternates: { canonical: '/' },
  formatDetection: { telephone: true, email: true, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: '/',
    siteName: site.name,
    title: 'Apex Metals | Steel supply, cutting and delivery in Johannesburg',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Metals | Steel supply in Johannesburg',
    description: site.description,
  },
}

// Runs before first paint: marks JS as available and decides whether the
// intro plays (once per browser session) so the overlay never flashes.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(!sessionStorage.getItem('apex-intro-seen')){d.classList.add('intro-play');window.__introFailsafe=setTimeout(function(){d.classList.remove('intro-play')},7000)}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-ZA"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body>
        <a href="#main" className="skip-link label">
          Skip to content
        </a>
        <IntroImpact />
        <div className="relative min-h-screen">
          <Backdrop />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
        <SmoothScroll />
        <RevealObserver />
      </body>
    </html>
  )
}
