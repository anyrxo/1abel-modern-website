import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalSoundSystem } from '@/components/GlobalSoundSystem'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { CartProvider } from '@/lib/cartContext'
import { AuthProvider } from '@/lib/authContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1ABEL - Premium Streetwear & Fashion',
  description: '1ABEL is a premium streetwear brand offering minimalist black and white designs. Shop our curated collection of tops, bottoms, and accessories.',
  keywords: 'streetwear, fashion, clothing brand, minimalist fashion, black and white fashion, premium streetwear, urban fashion, contemporary fashion, designer clothing, fashion boutique, mens fashion, womens fashion, streetwear brand, fashion store, online clothing store',
  authors: [{ name: '1ABEL' }],
  creator: '1ABEL',
  publisher: '1ABEL',
  category: 'Fashion & Apparel',
  classification: 'Clothing Brand',
  openGraph: {
    title: '1ABEL - Premium Streetwear & Fashion',
    description: '1ABEL is a premium streetwear brand offering minimalist black and white designs. Shop our curated collection of tops, bottoms, and accessories.',
    url: 'https://1abel.com',
    siteName: '1ABEL',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '1ABEL Premium Streetwear & Fashion',
      },
    ],
    locale: 'en_US',
    type: 'website',
    alternateLocale: ['en_GB', 'en_CA', 'en_AU'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1ABEL - Premium Streetwear & Fashion',
    description: 'Premium streetwear brand offering minimalist black and white designs. Shop our curated collection.',
    images: ['/og-image.jpg'],
    creator: '@1ABEL',
    site: '@1ABEL',
  },
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
    'noimageindex': false,
    'notranslate': false,
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: 'https://1abel.com',
    languages: {
      'en-US': 'https://1abel.com',
      'en-GB': 'https://1abel.com/en-gb',
      'en-CA': 'https://1abel.com/en-ca',
      'en-AU': 'https://1abel.com/en-au',
    },
  },
  other: {
    'apple-mobile-web-app-title': '1ABEL',
    'application-name': '1ABEL',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#000000',
    'color-scheme': 'light dark',
    'format-detection': 'telephone=no',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "1ABEL",
    "alternateName": "1ABEL Streetwear",
    "url": "https://1abel.com",
    "logo": "https://1abel.com/logo.png",
    "description": "1ABEL is a premium streetwear brand offering minimalist black and white designs. Shop our curated collection of tops, bottoms, and accessories.",
    "foundingDate": "2020",
    "industry": "Fashion & Apparel",
    "areaServed": "Worldwide",
    "priceRange": "$$",
    "sameAs": [
      "https://instagram.com/1abel",
      "https://twitter.com/1ABEL"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "info@1abel.com",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "1ABEL Clothing",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Tops",
          "itemListElement": []
        },
        {
          "@type": "OfferCatalog",
          "name": "Bottoms",
          "itemListElement": []
        },
        {
          "@type": "OfferCatalog",
          "name": "Accessories",
          "itemListElement": []
        }
      ]
    }
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="canonical" href="https://1abel.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//1abel.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="language" content="English" />
        <meta name="robots" content="index,follow,noimageindex,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow,noimageindex,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_GB" />
        <meta property="og:locale:alternate" content="en_CA" />
        <meta property="og:locale:alternate" content="en_AU" />
        <meta name="geo.region" content="Global" />
        <meta name="geo.placename" content="Worldwide" />
        <meta name="ICBM" content="Global Music Label" />
        <meta name="DC.title" content="1ABEL - Premium Streetwear" />
        <meta name="DC.creator" content="1ABEL" />
        <meta name="DC.subject" content="Streetwear, Fashion, Clothing" />
        <meta name="DC.description" content="Premium streetwear brand offering minimalist black and white designs" />
        <meta name="DC.type" content="Text.Homepage" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.language" content="en" />
        <meta name="DC.coverage" content="Global" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <MobileBottomNav />
            <GlobalSoundSystem />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}