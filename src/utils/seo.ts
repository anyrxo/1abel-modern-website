import { Metadata } from 'next'

interface SEOPageData {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
  section?: string
}

export function generateSEOMetadata({
  title,
  description,
  keywords = 'music label, RnB, trap, rap, artist development, streaming optimization, music industry, global music label',
  image = '/og-image.jpg',
  url = 'https://1abel.com',
  type = 'website',
  publishedTime,
  author = '1ABEL Global Music Label',
  section
}: SEOPageData): Metadata {
  const fullTitle = title.includes('1ABEL') ? title : `${title} | 1ABEL - Global Music Label`
  
  return {
    title: fullTitle,
    description,
    keywords: `${keywords}, music label, RnB music label, trap music label, rap music label, hip hop label, music distribution, artist development, streaming optimization, viral marketing, music promotion, record label, independent label, music industry, artist management, music publishing, global music label, international artists, music career development, playlist placement, streaming services`,
    authors: [{ name: author }],
    creator: '1ABEL',
    publisher: '1ABEL Global Music',
    category: 'Music & Entertainment',
    classification: 'Music Label',
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: '1ABEL Music Label',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - 1ABEL Global Music Label`,
        },
      ],
      locale: 'en_US',
      type: type as any,
      ...(publishedTime && type === 'article' && {
        publishedTime,
        authors: [author],
        section,
        tags: keywords.split(', ')
      }),
      alternateLocale: ['en_GB', 'en_CA', 'en_AU'],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description.length > 200 ? description.substring(0, 197) + '...' : description,
      images: [image],
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
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'en-GB': url.replace('https://1abel.com', 'https://1abel.com/en-gb'),
        'en-CA': url.replace('https://1abel.com', 'https://1abel.com/en-ca'),
        'en-AU': url.replace('https://1abel.com', 'https://1abel.com/en-au'),
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
}

export function generateBlogStructuredData(post: any, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://1abel.com/blog-images/${post.slug}.jpg`,
    "author": {
      "@type": "Organization",
      "name": "1ABEL",
      "url": "https://1abel.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "1ABEL Global Music Label",
      "logo": {
        "@type": "ImageObject",
        "url": "https://1abel.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": post.category,
    "keywords": `${post.category}, music label, RnB, trap, rap, streaming, artist development, music industry, global music label, viral marketing, playlist placement`,
    "wordCount": 2500,
    "url": url,
    "isPartOf": {
      "@type": "Blog",
      "name": "1ABEL Blog",
      "url": "https://1abel.com/blog"
    },
    "about": {
      "@type": "Thing",
      "name": "Music Industry",
      "description": "Global music label insights and industry trends"
    },
    "mentions": [
      {
        "@type": "Organization",
        "name": "Spotify",
        "url": "https://spotify.com"
      },
      {
        "@type": "Organization", 
        "name": "Apple Music",
        "url": "https://music.apple.com"
      },
      {
        "@type": "Organization",
        "name": "YouTube Music", 
        "url": "https://music.youtube.com"
      }
    ],
    "genre": ["RnB", "Trap", "Rap", "Hip Hop"],
    "inLanguage": "en-US",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "1ABEL Global Music Label"
    },
    "copyrightYear": 2025,
    "license": "https://creativecommons.org/licenses/by-nc-nd/4.0/"
  }
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Corporation", "MusicGroup"],
    "name": "1ABEL",
    "alternateName": "1ABEL Music Label",
    "legalName": "1ABEL Global Music Label",
    "url": "https://1abel.com",
    "logo": "https://1abel.com/logo.png",
    "image": "https://1abel.com/og-image.jpg",
    "description": "1ABEL is the world's leading music label specializing in RnB, trap, and rap. We discover, develop, and promote breakthrough artists globally with industry-leading streaming optimization and viral marketing strategies.",
    "foundingDate": "2020",
    "foundingLocation": "Global",
    "industry": "Music Industry",
    "naics": "512220",
    "isicV4": "5920",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 50,
      "maxValue": 100
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "serviceArea": {
      "@type": "Place", 
      "name": "Global"
    },
    "knowsAbout": [
      "Music Production",
      "Artist Development", 
      "Music Marketing",
      "Streaming Optimization",
      "Music Distribution",
      "Viral Marketing",
      "Playlist Placement",
      "Social Media Marketing",
      "Music Publishing",
      "Artist Management",
      "Record Label Services",
      "RnB Music",
      "Trap Music", 
      "Rap Music",
      "Hip Hop Music"
    ],
    "keywords": "music label, RnB, trap, rap, artist development, streaming optimization, viral marketing, playlist placement, music distribution, global music label",
    "slogan": "A Beautiful Heaven for Artists",
    "mission": "Revolutionizing how music careers are built through modern marketing and genuine partnerships",
    "sameAs": [
      "https://instagram.com/1abel_music",
      "https://twitter.com/1ABEL_Music", 
      "https://youtube.com/@1ABEL",
      "https://spotify.com/artist/1ABEL",
      "https://music.apple.com/artist/1ABEL",
      "https://soundcloud.com/1abel",
      "https://tiktok.com/@1abel"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Business Inquiries",
        "email": "anyro@1abel.com",
        "availableLanguage": ["English"],
        "areaServed": "Worldwide"
      },
      {
        "@type": "ContactPoint", 
        "contactType": "Artist Submissions",
        "email": "submissions@1abel.com",
        "availableLanguage": ["English"],
        "areaServed": "Worldwide"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global",
      "addressRegion": "Worldwide"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Music Label Services",
          "description": "Complete artist development, music production, distribution, and marketing services",
          "category": "Music & Entertainment",
          "areaServed": "Worldwide"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "USD",
          "price": "Contact for pricing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Streaming Optimization",
          "description": "Maximize your streaming revenue across all platforms",
          "category": "Music Marketing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Viral Marketing",
          "description": "TikTok and social media strategies that create viral moments",
          "category": "Digital Marketing"
        }
      }
    ],
    "owns": [
      {
        "@type": "CreativeWork",
        "name": "1ABEL Blog",
        "url": "https://1abel.com/blog",
        "description": "Industry insights and music marketing strategies"
      }
    ],
    "parentOrganization": null,
    "subOrganization": [],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Industry Experience",
        "name": "Global Music Industry Expertise"
      }
    ]
  }
}