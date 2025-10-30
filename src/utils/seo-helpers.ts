/**
 * SEO Helper Utilities
 * Collection of utility functions for SEO optimization
 */

/**
 * Generate SEO-friendly URL slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Calculate reading time
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Extract keywords from text
 */
export function extractKeywords(text: string, count: number = 10): string[] {
  // Remove common stop words
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'this', 'but', 'they', 'have', 'had',
    'what', 'when', 'where', 'who', 'which', 'why', 'how',
  ])

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word))

  // Count word frequency
  const frequency: Record<string, number> = {}
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })

  // Sort by frequency and return top N
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([word]) => word)
}

/**
 * Generate meta description from content
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '')

  // Truncate to maxLength
  if (text.length <= maxLength) return text

  // Truncate at last complete sentence before maxLength
  const truncated = text.slice(0, maxLength)
  const lastPeriod = truncated.lastIndexOf('.')
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastPeriod > maxLength - 50) {
    return truncated.slice(0, lastPeriod + 1)
  }

  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + '...'
  }

  return truncated + '...'
}

/**
 * Check if URL is internal
 */
export function isInternalUrl(url: string, domain: string = '1abel.com'): boolean {
  try {
    const urlObj = new URL(url, `https://${domain}`)
    return urlObj.hostname === domain || urlObj.hostname === `www.${domain}`
  } catch {
    return !url.startsWith('http') // Relative URLs are internal
  }
}

/**
 * Generate breadcrumb items from URL
 */
export function generateBreadcrumbs(url: string): Array<{ name: string; url: string }> {
  const path = url.replace('https://1abel.com', '')
  const segments = path.split('/').filter(Boolean)

  const breadcrumbs = [{ name: 'Home', url: 'https://1abel.com/' }]

  let currentPath = 'https://1abel.com'
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    breadcrumbs.push({
      name,
      url: currentPath + (index === segments.length - 1 ? '/' : ''),
    })
  })

  return breadcrumbs
}

/**
 * Calculate keyword density
 */
export function calculateKeywordDensity(text: string, keyword: string): number {
  const lowerText = text.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()

  const matches = (lowerText.match(new RegExp(lowerKeyword, 'g')) || []).length
  const totalWords = text.split(/\s+/).length

  return totalWords > 0 ? (matches / totalWords) * 100 : 0
}

/**
 * Validate meta tags
 */
export function validateMetaTags(html: string): {
  valid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []

  // Check for title
  if (!html.includes('<title>') || !html.includes('</title>')) {
    errors.push('Missing <title> tag')
  } else {
    const titleMatch = html.match(/<title>(.*?)<\/title>/)
    if (titleMatch) {
      const titleLength = titleMatch[1].length
      if (titleLength < 30) warnings.push('Title tag too short (< 30 characters)')
      if (titleLength > 60) warnings.push('Title tag too long (> 60 characters)')
    }
  }

  // Check for meta description
  if (!html.includes('name="description"')) {
    errors.push('Missing meta description')
  } else {
    const descMatch = html.match(/name="description"\s+content="([^"]*)"/)
    if (descMatch) {
      const descLength = descMatch[1].length
      if (descLength < 120) warnings.push('Meta description too short (< 120 characters)')
      if (descLength > 160) warnings.push('Meta description too long (> 160 characters)')
    }
  }

  // Check for canonical URL
  if (!html.includes('rel="canonical"')) {
    warnings.push('Missing canonical URL')
  }

  // Check for Open Graph tags
  if (!html.includes('property="og:title"')) {
    warnings.push('Missing og:title')
  }
  if (!html.includes('property="og:description"')) {
    warnings.push('Missing og:description')
  }
  if (!html.includes('property="og:image"')) {
    warnings.push('Missing og:image')
  }

  // Check for structured data
  if (!html.includes('application/ld+json')) {
    warnings.push('No structured data (JSON-LD) found')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Calculate SEO score for a page
 */
export function calculateSEOScore(metrics: {
  hasTitle: boolean
  titleLength: number
  hasMetaDescription: boolean
  descriptionLength: number
  hasH1: boolean
  h1Count: number
  wordCount: number
  imageCount: number
  imagesWithAlt: number
  internalLinks: number
  externalLinks: number
  hasCanonical: boolean
  hasStructuredData: boolean
  hasOpenGraph: boolean
  pageLoadTime: number
}): { score: number; suggestions: string[] } {
  let score = 0
  const suggestions: string[] = []

  // Title (15 points)
  if (metrics.hasTitle) {
    if (metrics.titleLength >= 30 && metrics.titleLength <= 60) {
      score += 15
    } else {
      score += 10
      suggestions.push('Optimize title length (30-60 characters)')
    }
  } else {
    suggestions.push('Add a title tag')
  }

  // Meta description (15 points)
  if (metrics.hasMetaDescription) {
    if (metrics.descriptionLength >= 120 && metrics.descriptionLength <= 160) {
      score += 15
    } else {
      score += 10
      suggestions.push('Optimize meta description length (120-160 characters)')
    }
  } else {
    suggestions.push('Add a meta description')
  }

  // H1 tag (10 points)
  if (metrics.hasH1 && metrics.h1Count === 1) {
    score += 10
  } else if (metrics.hasH1) {
    score += 5
    suggestions.push('Use exactly one H1 tag per page')
  } else {
    suggestions.push('Add an H1 heading')
  }

  // Content length (15 points)
  if (metrics.wordCount >= 1000) {
    score += 15
  } else if (metrics.wordCount >= 300) {
    score += 10
    suggestions.push('Add more content (aim for 1000+ words for better SEO)')
  } else {
    score += 5
    suggestions.push('Content is too short (< 300 words)')
  }

  // Images (10 points)
  if (metrics.imageCount > 0) {
    if (metrics.imagesWithAlt === metrics.imageCount) {
      score += 10
    } else {
      score += 5
      suggestions.push('Add alt text to all images')
    }
  } else {
    suggestions.push('Consider adding images for better engagement')
  }

  // Internal linking (10 points)
  if (metrics.internalLinks >= 5) {
    score += 10
  } else if (metrics.internalLinks >= 2) {
    score += 7
    suggestions.push('Add more internal links (aim for 5+)')
  } else {
    score += 3
    suggestions.push('Add internal links to related content')
  }

  // Technical SEO (25 points)
  if (metrics.hasCanonical) score += 5
  else suggestions.push('Add canonical URL')

  if (metrics.hasStructuredData) score += 10
  else suggestions.push('Add structured data (JSON-LD)')

  if (metrics.hasOpenGraph) score += 5
  else suggestions.push('Add Open Graph tags for social sharing')

  if (metrics.pageLoadTime < 2500) score += 5
  else suggestions.push('Improve page load time (< 2.5s)')

  return {
    score: Math.min(100, score),
    suggestions,
  }
}

/**
 * Generate schema.org markup for a product
 */
export function generateProductSchema(product: {
  name: string
  description: string
  image: string
  price: number
  currency: string
  availability: string
  rating?: number
  reviewCount?: number
  brand?: string
  sku?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
    },
    ...(product.rating && product.reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }),
    ...(product.brand && { brand: { '@type': 'Brand', name: product.brand } }),
    ...(product.sku && { sku: product.sku }),
  }
}

/**
 * Clean text for SEO (remove special characters, extra spaces)
 */
export function cleanTextForSEO(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .replace(/[\r\n]+/g, ' ') // Newlines to spaces
    .trim()
}

/**
 * Check if content is duplicate
 */
export function checkDuplicateContent(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/))
  const words2 = new Set(text2.toLowerCase().split(/\s+/))

  const intersection = new Set([...words1].filter(word => words2.has(word)))
  const union = new Set([...words1, ...words2])

  return (intersection.size / union.size) * 100 // Similarity percentage
}
