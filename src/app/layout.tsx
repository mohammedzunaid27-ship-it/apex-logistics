import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://apex-logistics.vercel.app'),
  title: {
    default: 'Apex Logistics | Premium Freight & Commodities Delivery in South Africa',
    template: '%s | Apex Logistics',
  },
  description:
    'South Africa\'s premium freight and logistics provider. AI-powered route optimisation, real-time telematics, and 99.2% on-time delivery. Track your APX shipment instantly. Furniture, wholesale, and commodities transport nationwide.',
  keywords: [
    'logistics South Africa',
    'freight Johannesburg',
    'commodity transport South Africa',
    'furniture delivery Johannesburg',
    'wholesale logistics Gauteng',
    'APX tracking',
    'road freight South Africa',
    'Apex Metals',
    'heavy freight transport',
    'AI logistics South Africa',
    'metals transport Johannesburg',
    'cargo delivery nationwide',
    'freight company Gauteng',
    'supply chain South Africa',
    'shipment tracking South Africa',
  ],
  authors: [{ name: 'Apex Logistics' }],
  creator: 'Apex Logistics',
  publisher: 'Apex Logistics',
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
    title: 'Apex Logistics | Premium Freight & Commodities Delivery',
    description:
      'AI-powered logistics with 99.2% on-time delivery. Furniture, wholesale goods, and high-value commodities transport across South Africa. Track your APX shipment live.',
    siteName: 'Apex Logistics',
    locale: 'en_ZA',
    type: 'website',
    url: 'https://apex-logistics.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Logistics | Premium Freight & Commodities Delivery',
    description:
      'AI-powered logistics across South Africa. 10+ years, 2,500+ deliveries, 99.2% success rate. Track your shipment live.',
  },
  alternates: {
    canonical: 'https://apex-logistics.vercel.app',
  },
  category: 'logistics',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Apex Logistics',
  description:
    'Premium nationwide freight and commodities delivery powered by AI route optimisation. A subsidiary of Apex Metals.',
  telephone: ['+27615456926', '+27714907858'],
  email: 'ApexLogistics@gmail.com',
  url: 'https://apex-logistics.vercel.app',
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
  areaServed: {
    '@type': 'Country',
    name: 'South Africa',
  },
  serviceType: [
    'Furniture Transport',
    'Wholesale Delivery',
    'Commodities Transport',
    'Metals Haulage',
    'General Road Freight',
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Apex Logistics',
  url: 'https://apex-logistics.vercel.app',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Apex Metals',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+27615456926',
      contactType: 'customer service',
      areaServed: 'ZA',
      availableLanguage: ['English', 'Afrikaans'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+27714907858',
      contactType: 'customer service',
      areaServed: 'ZA',
      availableLanguage: ['English', 'Afrikaans'],
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
