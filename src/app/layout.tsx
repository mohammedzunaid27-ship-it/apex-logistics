import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { ClientProviders } from '@/components/ClientProviders'

const headingFont = Space_Grotesk({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading-var',
  display: 'swap',
})

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Apex Logistics | Premium Freight & Commodities Delivery in South Africa',
  description:
    'Delivering excellence with over 2,500+ deliveries of high-value commodities completed safely. Track your APX delivery instantly. 10+ years experience. 99.2% success rate.',
  keywords: [
    'logistics South Africa',
    'freight Johannesburg',
    'commodity transport',
    'furniture delivery',
    'wholesale logistics',
    'APX tracking',
    'road freight',
    'Apex Metals',
  ],
  authors: [{ name: 'Apex Logistics' }],
  openGraph: {
    title: 'Apex Logistics | Premium Freight & Commodities Delivery',
    description:
      'Nationwide logistics specialising in furniture, wholesale goods, and high-value commodities. Track your APX delivery instantly.',
    siteName: 'Apex Logistics',
    locale: 'en_ZA',
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Apex Logistics',
  description:
    'Premium nationwide freight and commodities delivery. A subsidiary of Apex Metals.',
  telephone: '+27615456926',
  email: 'ApexLogistics@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Johannesburg',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -26.2041,
    longitude: 28.0473,
  },
  areaServed: 'South Africa',
  serviceType: [
    'Furniture Transport',
    'Wholesale Delivery',
    'Commodities Transport',
    'General Road Freight',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-ZA" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
