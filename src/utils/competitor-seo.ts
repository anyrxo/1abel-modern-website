/**
 * Competitor Suppression SEO Strategies
 *
 * Ethical SEO techniques to outrank competitors:
 * 1. Content depth and quality
 * 2. Faster loading times
 * 3. Better user experience
 * 4. More comprehensive information
 * 5. Superior schema markup
 * 6. Better backlink profile
 */

/**
 * Generate competitor comparison schema
 * Helps search engines understand how you compare to alternatives
 */
export function generateComparisonSchema(
  yourProduct: {
    name: string
    price: number
    rating: number
    features: string[]
  },
  competitors: Array<{
    name: string
    price: number
    rating: number
    features: string[]
  }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ComparisonTable',
    mainEntity: {
      '@type': 'Product',
      name: yourProduct.name,
      offers: {
        '@type': 'Offer',
        price: yourProduct.price,
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: yourProduct.rating,
      },
      additionalProperty: yourProduct.features.map(feature => ({
        '@type': 'PropertyValue',
        name: feature,
      })),
    },
    itemListElement: competitors.map((competitor, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: competitor.name,
        offers: {
          '@type': 'Offer',
          price: competitor.price,
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: competitor.rating,
        },
      },
    })),
  }
}

/**
 * Generate "Better Alternative" schema
 */
export function generateAlternativeSchema(
  competitorName: string,
  yourProduct: {
    name: string
    url: string
    advantages: string[]
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${competitorName} Alternative`,
    description: `Why ${yourProduct.name} is a better choice than ${competitorName}`,
    itemListElement: yourProduct.advantages.map((advantage, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: advantage,
    })),
    url: yourProduct.url,
  }
}

/**
 * Target long-tail competitor keywords
 */
export const competitorKeywords = [
  // Generic competitors
  'minimalist fashion alternative',
  'better than [competitor]',
  '[competitor] vs 1ABEL',
  'affordable luxury streetwear',
  'music-inspired clothing brand',

  // Specific use cases
  'best streetwear for creatives',
  'minimalist wardrobe essentials',
  'sustainable fashion brand',
  'high quality basics',

  // Problem-solving keywords
  'clothes that last forever',
  'versatile minimalist clothing',
  'wardrobe essentials for men',
  'timeless fashion pieces',

  // Comparison keywords
  'premium basics comparison',
  'best minimalist clothing brands 2025',
  'affordable designer alternatives',
]

/**
 * Content depth strategy
 * More comprehensive = better rankings
 */
export const contentDepthRequirements = {
  productPages: {
    minWords: 800,
    sections: [
      'Product Overview',
      'Key Features',
      'Material & Construction',
      'Sizing & Fit',
      'Care Instructions',
      'Styling Ideas',
      'Customer Reviews',
      'Shipping & Returns',
      'FAQ',
    ],
  },
  categoryPages: {
    minWords: 600,
    sections: [
      'Category Overview',
      'Why Choose This Category',
      'Product Comparison',
      'Styling Guide',
      'Size Guide',
      'FAQ',
    ],
  },
  blogPosts: {
    minWords: 1500,
    sections: [
      'Introduction',
      'Main Content (multiple sections)',
      'Expert Tips',
      'Examples/Case Studies',
      'Conclusion',
      'Related Articles',
    ],
  },
}

/**
 * Internal linking strategy for SEO power
 */
export function generateInternalLinkingStructure() {
  return {
    homepage: {
      linksTo: ['Arc 2', 'Arc 3', 'About', 'Best Sellers', 'New Arrivals'],
      linkDensity: 'high',
    },
    arcPages: {
      linksTo: ['Products', 'Category Pages', 'Shop All', 'Related Products'],
      linkDensity: 'high',
    },
    productPages: {
      linksTo: ['Category', 'Arc Page', 'Related Products', 'Pairs With', 'Similar Items'],
      linkDensity: 'medium',
    },
    categoryPages: {
      linksTo: ['All Products in Category', 'Related Categories', 'Arc Pages'],
      linkDensity: 'high',
    },
    blogPosts: {
      linksTo: ['Related Products', 'Related Posts', 'Category Pages', 'Resources'],
      linkDensity: 'medium',
    },
  }
}

/**
 * Click depth optimization
 * Every page should be reachable in 3 clicks or less from homepage
 */
export function calculateClickDepth(url: string): number {
  const path = url.replace('https://1abel.com', '')
  const segments = path.split('/').filter(Boolean)

  // Homepage = 0 clicks
  if (segments.length === 0) return 0

  // Main arc/category pages = 1 click
  if (segments.length === 1) return 1

  // Product pages = 2 clicks (Arc → Category → Product)
  if (segments.length === 3) return 2

  // Everything else should ideally be ≤ 3
  return Math.min(segments.length, 3)
}

/**
 * Meta description optimization
 * Beat competitors with better CTR
 */
export function generateOptimizedMetaDescription(
  product: string,
  arc: string,
  usp: string
): string {
  // Formula: Benefit + Feature + CTA + Scarcity/Social Proof
  const templates = [
    `${product} from ${arc}. ${usp}. Premium quality, 4.9★ rated. Free shipping on orders over $100.`,
    `Experience ${product} - ${usp}. Part of our ${arc} collection. Loved by 10,000+ customers. Shop now.`,
    `${product} reimagined. ${usp}. ${arc} exclusive. Limited edition. Free returns within 30 days.`,
    `Premium ${product} - ${usp}. ${arc} collection. Rated 4.9/5 by verified buyers. Ships in 24h.`,
  ]

  // Rotate randomly to test different approaches
  return templates[Math.floor(Math.random() * templates.length)]
}

/**
 * Title tag optimization
 * Beat competitors in CTR with emotional triggers
 */
export function generateOptimizedTitle(
  product: string,
  arc: string,
  category: string
): string {
  const templates = [
    `${product} - ${arc} | 1ABEL (★4.9)`,
    `${product} | Premium ${category} - ${arc} Collection`,
    `Buy ${product} - ${arc} | Music-Inspired Fashion`,
    `${product} - ${arc} | Free Shipping & Returns`,
  ]

  return templates[Math.floor(Math.random() * templates.length)]
}

/**
 * Content freshness signals
 */
export function generateFreshnessSignals() {
  return {
    lastUpdated: new Date().toISOString(),
    publishDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
    // Add to schema
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
  }
}

/**
 * Semantic keyword clusters
 * Group related keywords for topic authority
 */
export const semanticClusters = {
  minimalistFashion: [
    'minimalist clothing',
    'minimalist wardrobe',
    'minimalist style',
    'simple clothing',
    'essential wardrobe',
    'capsule wardrobe',
    'timeless fashion',
  ],
  musicInspired: [
    'music-inspired fashion',
    'streetwear for musicians',
    'creative clothing',
    'artist clothing',
    'producer fashion',
    'studio wear',
  ],
  premiumQuality: [
    'premium clothing',
    'high quality basics',
    'luxury essentials',
    'designer basics',
    'quality over quantity',
    'investment pieces',
  ],
  arc2Shadow: [
    'dark minimalist clothing',
    'all black streetwear',
    'shadow aesthetic',
    'dark wardrobe',
    'noir fashion',
  ],
  arc3Light: [
    'light minimalist clothing',
    'bright streetwear',
    'pastel fashion',
    'light wardrobe',
    'soft aesthetic',
  ],
}

/**
 * Generate FAQ schema to capture featured snippets
 */
export function generateCompetitorFAQ() {
  return [
    {
      question: 'Is 1ABEL better than [competitor]?',
      answer: '1ABEL offers music-inspired minimalist design with premium materials at fair prices. Unlike mass-market brands, each piece is designed with the creative professional in mind.',
    },
    {
      question: 'What makes 1ABEL different from other streetwear brands?',
      answer: '1ABEL combines minimalist design principles with music-driven aesthetics. Our Arc system simplifies decision-making while maintaining style versatility.',
    },
    {
      question: 'How does 1ABEL compare to luxury brands?',
      answer: '1ABEL delivers luxury-level quality and design at accessible prices. We focus on timeless pieces that last, not seasonal trends.',
    },
  ]
}
