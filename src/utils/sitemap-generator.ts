/**
 * Dynamic XML Sitemap Generator for 1ABEL
 *
 * Generates comprehensive XML sitemaps including:
 * - Main sitemap index
 * - Product sitemaps (by arc/category)
 * - Static pages sitemap
 * - Image sitemaps
 * - Video sitemaps (if applicable)
 */

import { BASE_PRODUCTS } from '@/data/products'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  images?: Array<{
    loc: string
    title?: string
    caption?: string
  }>
}

const SITE_URL = 'https://1abel.com'

/**
 * Generate main sitemap index
 */
export function generateSitemapIndex(): string {
  const sitemaps = [
    { loc: `${SITE_URL}/sitemap-static.xml`, lastmod: new Date().toISOString() },
    { loc: `${SITE_URL}/sitemap-products.xml`, lastmod: new Date().toISOString() },
    { loc: `${SITE_URL}/sitemap-arc2.xml`, lastmod: new Date().toISOString() },
    { loc: `${SITE_URL}/sitemap-arc3.xml`, lastmod: new Date().toISOString() },
    { loc: `${SITE_URL}/sitemap-images.xml`, lastmod: new Date().toISOString() },
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`
}

/**
 * Generate static pages sitemap
 */
export function generateStaticSitemap(): string {
  const staticPages: SitemapUrl[] = [
    { loc: `${SITE_URL}/`, changefreq: 'daily', priority: 1.0 },
    { loc: `${SITE_URL}/about/`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${SITE_URL}/contact/`, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/careers/`, changefreq: 'weekly', priority: 0.6 },
    { loc: `${SITE_URL}/services/`, changefreq: 'monthly', priority: 0.6 },
    { loc: `${SITE_URL}/shipping/`, changefreq: 'monthly', priority: 0.5 },
    { loc: `${SITE_URL}/refund/`, changefreq: 'monthly', priority: 0.5 },
    { loc: `${SITE_URL}/privacy/`, changefreq: 'yearly', priority: 0.4 },
    { loc: `${SITE_URL}/terms/`, changefreq: 'yearly', priority: 0.4 },
    { loc: `${SITE_URL}/terms-of-use/`, changefreq: 'yearly', priority: 0.4 },

    // Category pages
    { loc: `${SITE_URL}/tops/`, changefreq: 'weekly', priority: 0.9 },
    { loc: `${SITE_URL}/bottoms/`, changefreq: 'weekly', priority: 0.9 },
    { loc: `${SITE_URL}/accessories/`, changefreq: 'weekly', priority: 0.9 },

    // Arc pages
    { loc: `${SITE_URL}/arc-2/`, changefreq: 'daily', priority: 0.95 },
    { loc: `${SITE_URL}/arc-2/shop-all/`, changefreq: 'daily', priority: 0.9 },
    { loc: `${SITE_URL}/arc-2/collections/`, changefreq: 'weekly', priority: 0.85 },
    { loc: `${SITE_URL}/arc-2/tops/`, changefreq: 'weekly', priority: 0.85 },
    { loc: `${SITE_URL}/arc-2/bottoms/`, changefreq: 'weekly', priority: 0.85 },
    { loc: `${SITE_URL}/arc-2/accessories/`, changefreq: 'weekly', priority: 0.85 },

    { loc: `${SITE_URL}/arc-3/`, changefreq: 'daily', priority: 0.95 },
    { loc: `${SITE_URL}/arc-3/shop-all/`, changefreq: 'daily', priority: 0.9 },
    { loc: `${SITE_URL}/arc-3/collections/`, changefreq: 'weekly', priority: 0.85 },
    { loc: `${SITE_URL}/arc-3/tops/`, changefreq: 'weekly', priority: 0.85 },
    { loc: `${SITE_URL}/arc-3/bottoms/`, changefreq: 'weekly', priority: 0.85 },
    { loc: `${SITE_URL}/arc-3/accessories/`, changefreq: 'weekly', priority: 0.85 },

    // Account pages (login required, lower priority)
    { loc: `${SITE_URL}/account/login/`, changefreq: 'yearly', priority: 0.3 },
    { loc: `${SITE_URL}/account/signup/`, changefreq: 'yearly', priority: 0.3 },
    { loc: `${SITE_URL}/cart/`, changefreq: 'never', priority: 0.1 },
    { loc: `${SITE_URL}/checkout/`, changefreq: 'never', priority: 0.1 },
  ]

  return generateSitemapXML(staticPages)
}

/**
 * Generate products sitemap (all products)
 */
export function generateProductsSitemap(): string {
  const products = Object.values(BASE_PRODUCTS)
  const urls: SitemapUrl[] = []

  // Arc 2 products
  products.forEach(product => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-')
    const category = product.category.toLowerCase()

    // Arc 2 product page
    urls.push({
      loc: `${SITE_URL}/arc-2/${category}/${slug}/`,
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
      images: [
        {
          loc: `${SITE_URL}/images/products/arc2-${slug}.jpg`,
          title: `${product.name} - Arc 2 Shadow`,
          caption: product.description,
        }
      ]
    })

    // Arc 3 product page
    urls.push({
      loc: `${SITE_URL}/arc-3/${category}/${slug}/`,
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
      images: [
        {
          loc: `${SITE_URL}/images/products/arc3-${slug}.jpg`,
          title: `${product.name} - Arc 3 Light`,
          caption: product.description,
        }
      ]
    })
  })

  return generateSitemapXML(urls)
}

/**
 * Generate Arc 2 specific sitemap
 */
export function generateArc2Sitemap(): string {
  const products = Object.values(BASE_PRODUCTS)
  const urls: SitemapUrl[] = []

  products.forEach(product => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-')
    const category = product.category.toLowerCase()

    urls.push({
      loc: `${SITE_URL}/arc-2/${category}/${slug}/`,
      changefreq: 'weekly',
      priority: 0.95,
      lastmod: new Date().toISOString(),
    })
  })

  return generateSitemapXML(urls)
}

/**
 * Generate Arc 3 specific sitemap
 */
export function generateArc3Sitemap(): string {
  const products = Object.values(BASE_PRODUCTS)
  const urls: SitemapUrl[] = []

  products.forEach(product => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-')
    const category = product.category.toLowerCase()

    urls.push({
      loc: `${SITE_URL}/arc-3/${category}/${slug}/`,
      changefreq: 'weekly',
      priority: 0.95,
      lastmod: new Date().toISOString(),
    })
  })

  return generateSitemapXML(urls)
}

/**
 * Generate image sitemap
 */
export function generateImageSitemap(): string {
  const products = Object.values(BASE_PRODUCTS)
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

  products.forEach(product => {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-')
    const category = product.category.toLowerCase()

    // Arc 2 colors
    const arc2Colors = ['void', 'steel', 'blood', 'moss', 'earth']
    arc2Colors.forEach(color => {
      xml += `  <url>
    <loc>${SITE_URL}/arc-2/${category}/${slug}/</loc>
    <image:image>
      <image:loc>${SITE_URL}/images/products/arc2-${slug}-${color}.jpg</image:loc>
      <image:title>${product.name} in ${color.toUpperCase()} - Arc 2 Shadow</image:title>
      <image:caption>${product.description}</image:caption>
    </image:image>
  </url>
`
    })

    // Arc 3 colors
    const arc3Colors = ['cloud', 'sakura', 'mist', 'sand', 'lilac']
    arc3Colors.forEach(color => {
      xml += `  <url>
    <loc>${SITE_URL}/arc-3/${category}/${slug}/</loc>
    <image:image>
      <image:loc>${SITE_URL}/images/products/arc3-${slug}-${color}.jpg</image:loc>
      <image:title>${product.name} in ${color.toUpperCase()} - Arc 3 Light</image:title>
      <image:caption>${product.description}</image:caption>
    </image:image>
  </url>
`
    })
  })

  xml += `</urlset>`
  return xml
}

/**
 * Helper function to generate sitemap XML
 */
function generateSitemapXML(urls: SitemapUrl[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

  urls.forEach(url => {
    xml += `  <url>
    <loc>${url.loc}</loc>
`
    if (url.lastmod) {
      xml += `    <lastmod>${url.lastmod}</lastmod>
`
    }
    if (url.changefreq) {
      xml += `    <changefreq>${url.changefreq}</changefreq>
`
    }
    if (url.priority !== undefined) {
      xml += `    <priority>${url.priority}</priority>
`
    }

    // Add images if present
    if (url.images && url.images.length > 0) {
      url.images.forEach(image => {
        xml += `    <image:image>
      <image:loc>${image.loc}</image:loc>
`
        if (image.title) {
          xml += `      <image:title>${escapeXml(image.title)}</image:title>
`
        }
        if (image.caption) {
          xml += `      <image:caption>${escapeXml(image.caption)}</image:caption>
`
        }
        xml += `    </image:image>
`
      })
    }

    xml += `  </url>
`
  })

  xml += `</urlset>`
  return xml
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Generate all sitemaps and save to files
 * Run this as a build script
 */
export function generateAllSitemaps() {
  return {
    'sitemap.xml': generateSitemapIndex(),
    'sitemap-static.xml': generateStaticSitemap(),
    'sitemap-products.xml': generateProductsSitemap(),
    'sitemap-arc2.xml': generateArc2Sitemap(),
    'sitemap-arc3.xml': generateArc3Sitemap(),
    'sitemap-images.xml': generateImageSitemap(),
  }
}
