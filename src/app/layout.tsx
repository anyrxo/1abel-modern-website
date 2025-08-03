import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalSoundSystem } from '@/components/GlobalSoundSystem'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1ABEL - Global Music Label | RnB, Trap & Rap Artists Worldwide',
  description: '1ABEL is the world\'s leading music label specializing in RnB, trap, and rap. We discover, develop, and promote breakthrough artists globally. Join the revolution with streaming optimization, viral marketing, and industry-leading artist development.',
  keywords: 'music label, RnB music label, trap music label, rap music label, hip hop label, music distribution, artist development, streaming optimization, viral marketing, music promotion, record label, independent label, music industry, artist management, music publishing, global music label, international artists, music career development, playlist placement, streaming services',
  authors: [{ name: '1ABEL Music Label' }],
  creator: '1ABEL',
  publisher: '1ABEL Global Music',
  category: 'Music & Entertainment',
  classification: 'Music Label',
  openGraph: {
    title: '1ABEL - Global Music Label | RnB, Trap & Rap Artists Worldwide',
    description: '1ABEL is the world\'s leading music label specializing in RnB, trap, and rap. We discover, develop, and promote breakthrough artists globally with industry-leading streaming optimization and viral marketing.',
    url: 'https://1abel.com',
    siteName: '1ABEL Music Label',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '1ABEL Global Music Label - RnB, Trap & Rap Artists',
      },
    ],
    locale: 'en_US',
    type: 'website',
    alternateLocale: ['en_GB', 'en_CA', 'en_AU'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1ABEL - Global Music Label | RnB, Trap & Rap',
    description: 'World\'s leading music label for RnB, trap & rap artists. Industry-leading streaming optimization & viral marketing. Join the revolution.',
    images: ['/og-image.jpg'],
    creator: '@1ABEL_Music',
    site: '@1ABEL_Music',
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
    bing: 'bing-site-verification',
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
    'apple-mobile-web-app-title': '1ABEL Music',
    'application-name': '1ABEL',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#dc2626',
    'color-scheme': 'dark light',
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
    "@type": "Organization",
    "name": "1ABEL",
    "alternateName": "1ABEL Music Label",
    "url": "https://1abel.com",
    "logo": "https://1abel.com/logo.png",
    "description": "1ABEL is the world's leading music label specializing in RnB, trap, and rap. We discover, develop, and promote breakthrough artists globally.",
    "foundingDate": "2020",
    "industry": "Music Industry",
    "numberOfEmployees": "50-100",
    "areaServed": "Worldwide",
    "knowsAbout": ["Music Production", "Artist Development", "Music Marketing", "Streaming Optimization", "Music Distribution"],
    "sameAs": [
      "https://instagram.com/1abel_music",
      "https://twitter.com/1ABEL_Music",
      "https://youtube.com/@1ABEL",
      "https://spotify.com/artist/1ABEL"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Business Inquiries",
      "email": "anyro@1abel.com",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Music Label Services",
          "description": "Complete artist development, music production, distribution, and marketing services"
        }
      }
    ]
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
        <meta name="DC.title" content="1ABEL - Global Music Label" />
        <meta name="DC.creator" content="1ABEL" />
        <meta name="DC.subject" content="Music Label, RnB, Trap, Rap" />
        <meta name="DC.description" content="World's leading music label for RnB, trap, and rap artists" />
        <meta name="DC.type" content="Text.Homepage" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.language" content="en" />
        <meta name="DC.coverage" content="Global" />
      </head>
      <body className={inter.className}>
        {children}
        <GlobalSoundSystem />
      </body>
    </html>
  )
}