export const dynamic = 'force-static'
export const revalidate = false

export async function GET() {
  const baseUrl = 'https://1abel.com'
  const currentDate = new Date().toISOString()

  // All 22 base products across both arcs
  const products = [
    'tops/thermal', 'tops/hoodie', 'tops/tee', 'tops/longsleeve', 'tops/crewneck', 'tops/overshirt',
    'bottoms/denim', 'bottoms/cargo', 'bottoms/joggers', 'bottoms/sweats', 'bottoms/shorts',
    'outerwear/puffer', 'accessories/beanie', 'accessories/cap', 'accessories/belt',
    'accessories/gloves', 'accessories/socks', 'accessories/ring'
  ]

  const urls = products.flatMap(path => [
    `<url>
    <loc>${baseUrl}/arc-2/${path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`,
    `<url>
    <loc>${baseUrl}/arc-3/${path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
  ]).join('\n  ')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
