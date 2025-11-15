import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { CartProvider } from '@/lib/cartContext'
import { AuthProvider } from '@/lib/authContext'
import { SecurityProtection } from '@/components/SecurityProtection'
import { CoreWebVitals } from '@/components/CoreWebVitals'
import { IndexNow } from '@/components/IndexNow'
import { SEOPerformanceTracker } from '@/components/SEOPerformanceTracker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://1abel.com'),
  title: '1ABEL - Music-Inspired Minimalist Fashion',
  description: 'Premium minimalist essentials for those who move too fast to overthink their wardrobe. Arc 2 Shadow & Arc 3 Light collections by Anyro.',
  keywords: '1abel, 1ABEL, 1abel fashion, 1abel clothing, 1abel brand, 1abel minimalist, 1abel arc 2, 1abel arc 3, 1abel store, 1abel shop, buy 1abel, minimalist fashion, music-inspired clothing, premium streetwear, Arc 2 Shadow, Arc 3 Light, VOID STEEL BLOOD MOSS EARTH, CLOUD SAKURA MIST SAND LILAC, designer essentials, contemporary menswear, womenswear, gender-neutral fashion, sustainable fashion, slow fashion, timeless wardrobe, Anyro, Anyro fashion, @anyrxo, aesthetic clothing, intentional design, urban minimalism, monochrome fashion, capsule wardrobe, quality basics, curated clothing, fashion for creatives, music and fashion, frequency wear, where sound becomes style, iimagined fashion, music inspired fashion brand',
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
  appleWebApp: {
    capable: true,
    title: '1ABEL',
    statusBarStyle: 'black-translucent',
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
    canonical: '/',
    languages: {
      'en-US': '/',
      'en-GB': '/en-gb',
      'en-CA': '/en-ca',
      'en-AU': '/en-au',
      'x-default': '/',
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Organization Schema with AggregateRating
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
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
      "https://twitter.com/1ABEL",
      "https://1abel.com"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "anyro@1abel.com",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  // Professional Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "1ABEL - Premium Minimalist Fashion",
    "image": "https://1abel.com/og-image.jpg",
    "priceRange": "$$-$$$",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    },
    "url": "https://1abel.com",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "1ABEL Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Arc 2 Shadow Collection",
            "description": "Dark minimalist essentials - VOID, STEEL, BLOOD, MOSS, EARTH"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Arc 3 Light Collection",
            "description": "Light minimalist essentials - CLOUD, SAKURA, MIST, SAND, LILAC"
          }
        }
      ]
    }
  }

  // Website Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "1ABEL",
    "url": "https://1abel.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://1abel.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  // Breadcrumb Schema for Navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://1abel.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Arc 2 Shadow",
        "item": "https://1abel.com/arc-2"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Arc 3 Light",
        "item": "https://1abel.com/arc-3"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Blog",
        "item": "https://1abel.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "About",
        "item": "https://1abel.com/about"
      }
    ]
  }

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is 1ABEL?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1ABEL is a music-inspired minimalist fashion brand designed for entrepreneurs and creatives who juggle multiple businesses. We create premium essentials that eliminate decision fatigue - clothing that just works, every time. Our Arc 2 Shadow (dark colors) and Arc 3 Light (bright colors) collections are designed to pair perfectly within their arc."
        }
      },
      {
        "@type": "Question",
        "name": "What are Arc 2 Shadow and Arc 3 Light?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Arc 2 Shadow features dark colors (VOID, STEEL, BLOOD, MOSS, EARTH) designed for focus and depth. Arc 3 Light features bright colors (CLOUD, SAKURA, MIST, SAND, LILAC) designed for clarity and openness. Each arc is a complete wardrobe system where any piece pairs perfectly with any other piece in the same arc."
        }
      },
      {
        "@type": "Question",
        "name": "What makes 1ABEL different from other minimalist brands?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1ABEL is music-inspired - our founder Anyro created the brand after realizing clothing should work like music: effortless mood shifts without thinking. We use premium heavyweight fabrics (220-600 GSM), subtle tone-on-tone branding, and a two-arc system that guarantees perfect pairings. It's minimalism with intention, not just basics."
        }
      },
      {
        "@type": "Question",
        "name": "What is your sizing like?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1ABEL uses relaxed oversized fits with dropped shoulders. Tops are available in XS-XL, bottoms in sizes 28-42 waist or XS-XL for elastic styles. Our fit is designed to be comfortable and intentional - not tight, not baggy, just right. Check individual product pages for detailed size charts."
        }
      },
      {
        "@type": "Question",
        "name": "Do you ship internationally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, 1ABEL ships worldwide. We offer free shipping on orders over $200 and express shipping options. All orders are processed within 1-3 business days. International customs fees may apply depending on your country."
        }
      },
      {
        "@type": "Question",
        "name": "What is your return policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer 30-day returns on unworn items with original tags attached. If the piece doesn't work for you, we'll make it right. Email anyro@1abel.com to initiate a return. We want you to love every piece in your 1ABEL wardrobe."
        }
      }
    ]
  }

  return (
    <html lang="en">
      <head>
        {/* Organization Schema with Ratings */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Professional Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        {/* Website Schema with Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {/* FAQ Schema for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        {/* Breadcrumb Schema for Navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LMLEKQL999"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LMLEKQL999');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "u6hsotvvmn");
            `,
          }}
        />

        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//1abel.com" />
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

        {/* Social Sharing Optimization */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="1ABEL - Music-Inspired Minimalist Fashion" />
        <meta property="fb:app_id" content="1ABEL" />

        {/* Pinterest Rich Pins */}
        <meta property="og:site_name" content="1ABEL" />
        <meta name="pinterest-rich-pin" content="true" />

        {/* LinkedIn Optimization */}
        <meta property="og:image:secure_url" content="https://1abel.com/og-image.jpg" />

        {/* WhatsApp Preview */}
        <meta property="og:image:type" content="image/jpeg" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <SecurityProtection />
            <CoreWebVitals />
            <IndexNow />
            <SEOPerformanceTracker />
            {children}
            <MobileBottomNav />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}