/**
 * Advanced Schema.org Markup Components
 * Comprehensive structured data for maximum SEO impact
 */

/**
 * Backlink Magnet Schema
 * Makes your content highly citable and linkable
 */
export function BacklinkMagnetSchema({
  title,
  author,
  datePublished,
  citations,
  statistics,
}: {
  title: string
  author: string
  datePublished: string
  citations: Array<{ title: string; url: string }>
  statistics: Array<{ label: string; value: string }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: title,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    citation: citations.map(c => ({
      '@type': 'CreativeWork',
      name: c.title,
      url: c.url,
    })),
    // Makes content citable
    isAccessibleForFree: true,
    inLanguage: 'en',
    // Include statistics for data-driven backlinks
    about: statistics.map(stat => ({
      '@type': 'QuantitativeValue',
      name: stat.label,
      value: stat.value,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) Schema
 */
export function EEATSchema({
  authorName,
  authorBio,
  authorCredentials,
  organization,
  reviewedBy,
  factChecked,
}: {
  authorName: string
  authorBio: string
  authorCredentials: string[]
  organization: string
  reviewedBy?: string
  factChecked?: boolean
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: authorName,
    description: authorBio,
    knowsAbout: authorCredentials,
    memberOf: {
      '@type': 'Organization',
      name: organization,
    },
    ...(reviewedBy && {
      reviewedBy: {
        '@type': 'Person',
        name: reviewedBy,
      },
    }),
    ...(factChecked && {
      claimReviewed: 'Content has been fact-checked and verified',
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Video Schema (if you add product videos)
 */
export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
}: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string
  contentUrl: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration, // Format: PT1M33S (1 minute 33 seconds)
    contentUrl,
    embedUrl: contentUrl,
    // Video SEO enhancements
    inLanguage: 'en',
    isFamilyFriendly: true,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * BreadcrumbList Schema
 * Helps search engines understand site structure
 */
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Collection Page Schema
 * For Arc 2 / Arc 3 collection pages
 */
export function CollectionPageSchema({
  name,
  description,
  url,
  numberOfItems,
  items,
}: {
  name: string
  description: string
  url: string
  numberOfItems: number
  items: Array<{ name: string; url: string; price: number }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: item.name,
          url: item.url,
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'USD',
          },
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Brand Schema
 * Establishes brand entity
 */
export function BrandSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: '1ABEL',
    description: 'Music-inspired minimalist fashion brand',
    url: 'https://1abel.com',
    logo: 'https://1abel.com/images/logo.png',
    founder: {
      '@type': 'Person',
      name: 'Anyro',
      url: 'https://twitter.com/anyrxo',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'IImagined Company',
    },
    slogan: 'Where Sound Becomes Style',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://twitter.com/1ABEL',
      'https://instagram.com/1abel',
      'https://instagram.com/anyrxo',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Store/Business Schema
 */
export function StoreSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: '1ABEL',
    description: 'Premium minimalist fashion essentials inspired by music',
    url: 'https://1abel.com',
    logo: 'https://1abel.com/images/logo.png',
    image: 'https://1abel.com/images/og/homepage.jpg',
    priceRange: '$$-$$$',
    telephone: '+1-XXX-XXX-XXXX', // Add real phone
    email: 'anyro@1abel.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '1ABEL Collections',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Arc 2 Shadow',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Tops' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Bottoms' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Accessories' } },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Arc 3 Light',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Tops' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Bottoms' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Accessories' } },
          ],
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Website Search Schema
 * Enables site search in Google
 */
export function WebsiteSearchSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '1ABEL',
    url: 'https://1abel.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://1abel.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * How-To Schema (for styling guides)
 */
export function HowToSchema({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: Array<{ name: string; text: string; image?: string }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
