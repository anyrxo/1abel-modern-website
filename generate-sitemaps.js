/**
 * Sitemap Generation Script
 * Run this after building to generate all sitemaps
 *
 * Usage: node generate-sitemaps.js
 */

const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://1abel.com'
const OUT_DIR = path.join(__dirname, 'out')

function generateSitemapIndex() {
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

function generateStaticSitemap() {
  const pages = [
    { loc: '/', priority: 1.0, changefreq: 'daily' },
    { loc: '/about/', priority: 0.8, changefreq: 'monthly' },
    { loc: '/contact/', priority: 0.7, changefreq: 'monthly' },
    { loc: '/careers/', priority: 0.6, changefreq: 'weekly' },
    { loc: '/services/', priority: 0.6, changefreq: 'monthly' },
    { loc: '/shipping/', priority: 0.5, changefreq: 'monthly' },
    { loc: '/refund/', priority: 0.5, changefreq: 'monthly' },
    { loc: '/privacy/', priority: 0.4, changefreq: 'yearly' },
    { loc: '/terms/', priority: 0.4, changefreq: 'yearly' },
    { loc: '/terms-of-use/', priority: 0.4, changefreq: 'yearly' },
    { loc: '/tops/', priority: 0.9, changefreq: 'weekly' },
    { loc: '/bottoms/', priority: 0.9, changefreq: 'weekly' },
    { loc: '/accessories/', priority: 0.9, changefreq: 'weekly' },
    { loc: '/arc-2/', priority: 0.95, changefreq: 'daily' },
    { loc: '/arc-2/shop-all/', priority: 0.9, changefreq: 'daily' },
    { loc: '/arc-2/collections/', priority: 0.85, changefreq: 'weekly' },
    { loc: '/arc-2/tops/', priority: 0.85, changefreq: 'weekly' },
    { loc: '/arc-2/bottoms/', priority: 0.85, changefreq: 'weekly' },
    { loc: '/arc-2/accessories/', priority: 0.85, changefreq: 'weekly' },
    { loc: '/arc-3/', priority: 0.95, changefreq: 'daily' },
    { loc: '/arc-3/shop-all/', priority: 0.9, changefreq: 'daily' },
    { loc: '/arc-3/collections/', priority: 0.85, changefreq: 'weekly' },
    { loc: '/arc-3/tops/', priority: 0.85, changefreq: 'weekly' },
    { loc: '/arc-3/bottoms/', priority: 0.85, changefreq: 'weekly' },
    { loc: '/arc-3/accessories/', priority: 0.85, changefreq: 'weekly' },
  ]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  pages.forEach(page => {
    xml += `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  })

  xml += `</urlset>`
  return xml
}

function generateProductsSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  const products = [
    // Tops
    'thermal', 'hoodie', 'coach-jacket', 'crewneck', 'longsleeve', 'tee', 'overshirt', 'puffer',
    // Bottoms
    'cargo', 'sweats', 'denim', 'joggers', 'shorts', 'wide-pants',
    // Accessories
    'chain', 'ring', 'belt', 'gloves', 'beanie', 'cap', 'socks', 'tote'
  ]

  const categories = {
    thermal: 'tops', hoodie: 'tops', 'coach-jacket': 'tops', crewneck: 'tops',
    longsleeve: 'tops', tee: 'tops', overshirt: 'tops', puffer: 'tops',
    cargo: 'bottoms', sweats: 'bottoms', denim: 'bottoms', joggers: 'bottoms',
    shorts: 'bottoms', 'wide-pants': 'bottoms',
    chain: 'accessories', ring: 'accessories', belt: 'accessories', gloves: 'accessories',
    beanie: 'accessories', cap: 'accessories', socks: 'accessories', tote: 'accessories'
  }

  products.forEach(product => {
    const category = categories[product]

    // Arc 2
    xml += `  <url>
    <loc>${SITE_URL}/arc-2/${category}/${product}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`

    // Arc 3
    xml += `  <url>
    <loc>${SITE_URL}/arc-3/${category}/${product}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`
  })

  xml += `</urlset>`
  return xml
}

function generateImageSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

  const products = [
    'thermal', 'hoodie', 'coach-jacket', 'crewneck', 'longsleeve', 'tee', 'overshirt', 'puffer',
    'cargo', 'sweats', 'denim', 'joggers', 'shorts', 'wide-pants',
    'chain', 'ring', 'belt', 'gloves', 'beanie', 'cap', 'socks', 'tote'
  ]

  const categories = {
    thermal: 'tops', hoodie: 'tops', 'coach-jacket': 'tops', crewneck: 'tops',
    longsleeve: 'tops', tee: 'tops', overshirt: 'tops', puffer: 'tops',
    cargo: 'bottoms', sweats: 'bottoms', denim: 'bottoms', joggers: 'bottoms',
    shorts: 'bottoms', 'wide-pants': 'bottoms',
    chain: 'accessories', ring: 'accessories', belt: 'accessories', gloves: 'accessories',
    beanie: 'accessories', cap: 'accessories', socks: 'accessories', tote: 'accessories'
  }

  products.forEach(product => {
    const category = categories[product]
    const arc2Colors = ['void', 'steel', 'blood', 'moss', 'earth']
    const arc3Colors = ['cloud', 'sakura', 'mist', 'sand', 'lilac']

    // Arc 2
    xml += `  <url>
    <loc>${SITE_URL}/arc-2/${category}/${product}/</loc>
`
    arc2Colors.forEach(color => {
      xml += `    <image:image>
      <image:loc>${SITE_URL}/images/arc2-${product}-${color}.jpg</image:loc>
      <image:title>${product.replace(/-/g, ' ')} in ${color} - Arc 2 Shadow</image:title>
    </image:image>
`
    })
    xml += `  </url>
`

    // Arc 3
    xml += `  <url>
    <loc>${SITE_URL}/arc-3/${category}/${product}/</loc>
`
    arc3Colors.forEach(color => {
      xml += `    <image:image>
      <image:loc>${SITE_URL}/images/arc3-${product}-${color}.jpg</image:loc>
      <image:title>${product.replace(/-/g, ' ')} in ${color} - Arc 3 Light</image:title>
    </image:image>
`
    })
    xml += `  </url>
`
  })

  xml += `</urlset>`
  return xml
}

// Generate all sitemaps
console.log('🗺️  Generating sitemaps...')

const sitemaps = {
  'sitemap.xml': generateSitemapIndex(),
  'sitemap-static.xml': generateStaticSitemap(),
  'sitemap-products.xml': generateProductsSitemap(),
  'sitemap-images.xml': generateImageSitemap(),
}

// Ensure out directory exists
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
}

// Write all sitemaps
Object.entries(sitemaps).forEach(([filename, content]) => {
  const filepath = path.join(OUT_DIR, filename)
  fs.writeFileSync(filepath, content, 'utf8')
  console.log(`✅ Generated: ${filename}`)
})

console.log('✨ All sitemaps generated successfully!')
console.log(`📁 Location: ${OUT_DIR}`)
console.log('\n🚀 Next steps:')
console.log('1. Submit sitemap.xml to Google Search Console')
console.log('2. Submit to Bing Webmaster Tools')
console.log('3. Add to robots.txt: Sitemap: https://1abel.com/sitemap.xml')
