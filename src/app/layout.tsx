import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { CartProvider } from '@/lib/cartContext'
import { AuthProvider } from '@/lib/authContext'
import { SecurityProtection } from '@/components/SecurityProtection'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1ABEL - Where Sound Becomes Style | Music-Inspired Minimalist Fashion',
  description: 'Premium minimalist essentials designed for those who move too fast to overthink their wardrobe. Music-driven design meets effortless style. Arc 2 Shadow & Arc 3 Light collections. Created by Anyro. A brand of IImagined Company.',
  keywords: 'minimalist fashion, music-inspired clothing, premium streetwear, Arc 2 Shadow (VOID STEEL BLOOD MOSS EARTH), Arc 3 Light (CLOUD SAKURA MIST SAND LILAC), designer essentials, contemporary menswear, womenswear, gender-neutral fashion, sustainable fashion, slow fashion, timeless wardrobe, 1ABEL, Anyro, @anyrxo, aesthetic clothing, intentional design, urban minimalism, monochrome fashion, capsule wardrobe, quality basics, curated clothing, fashion for creatives, music and fashion, frequency wear',
  authors: [{ name: '1ABEL - A Brand of IImagined Company' }],
  creator: 'IImagined Company',
  publisher: 'IImagined Company',
  category: 'Fashion & Apparel',
  classification: 'Clothing Brand',
  openGraph: {
    title: '1ABEL - Where Sound Becomes Style | Music-Inspired Fashion',
    description: 'Premium minimalist essentials for those who move too fast to overthink their wardrobe. Music-driven design meets effortless style. Arc 2 Shadow & Arc 3 Light.',
    url: 'https://1abel.com',
    siteName: '1ABEL',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '1ABEL - Music-Inspired Minimalist Fashion | Arc 2 Shadow & Arc 3 Light',
      },
    ],
    locale: 'en_US',
    type: 'website',
    alternateLocale: ['en_GB', 'en_CA', 'en_AU'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1ABEL - Where Sound Becomes Style',
    description: 'Music-driven design meets effortless style. For creatives who move too fast to overthink their wardrobe. Arc 2 Shadow & Arc 3 Light.',
    images: ['/og-image.jpg'],
    creator: '@anyrxo',
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
    "alternateName": "1ABEL - Where Sound Becomes Style",
    "url": "https://1abel.com",
    "logo": "https://1abel.com/logo.png",
    "description": "Music-inspired minimalist fashion brand. Premium essentials designed for those who move too fast to overthink their wardrobe. Arc 2 Shadow & Arc 3 Light collections. Created by Anyro (@anyrxo). Where clothing works like music - pieces that always pair perfectly.",
    "slogan": "Where sound becomes style. Where every piece is a frequency you can wear.",
    "founder": {
      "@type": "Person",
      "name": "Anyro",
      "sameAs": "https://instagram.com/anyrxo"
    },
    "foundingDate": "2024",
    "industry": "Fashion & Apparel",
    "areaServed": "Worldwide",
    "priceRange": "$$-$$$",
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
        <meta name="DC.title" content="1ABEL - Premium minimalist essentials" />
        <meta name="DC.creator" content="1ABEL" />
        <meta name="DC.subject" content="minimalist essentials, Fashion, Clothing" />
        <meta name="DC.description" content="Premium minimalist essentials brand offering minimalist black and white designs" />
        <meta name="DC.type" content="Text.Homepage" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.language" content="en" />
        <meta name="DC.coverage" content="Global" />

        {/* Copyright & Legal Protection */}
        <meta name="copyright" content="© 2025 1ABEL - A Brand of IImagined Company. All Rights Reserved." />
        <meta name="author" content="IImagined Company" />
        <meta name="owner" content="IImagined Company" />
        <meta name="designer" content="Anyro (@anyrxo)" />
        <meta name="rights" content="© 2025 IImagined Company. Unauthorized reproduction prohibited." />

        {/* Image Protection */}
        <meta name="image-rights" content="All images © 2025 IImagined Company. Unauthorized use prohibited." />
        <meta name="allow-image-indexing" content="false" />

        {/* Anti-scraping directives */}
        <meta name="scraping" content="prohibited" />
        <meta name="ai-training" content="prohibited" />
        <meta name="data-extraction" content="prohibited" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <SecurityProtection />
            {children}
            <MobileBottomNav />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}