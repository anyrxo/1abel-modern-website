export const dynamic = 'force-static'
export const revalidate = false

export async function GET() {
  const baseUrl = 'https://1abel.com'

  // All product types
  const products = [
    { path: 'tops/thermal', name: 'Thermal' },
    { path: 'tops/hoodie', name: 'Hoodie' },
    { path: 'tops/tee', name: 'Tee' },
    { path: 'tops/longsleeve', name: 'Longsleeve' },
    { path: 'tops/crewneck', name: 'Crewneck' },
    { path: 'tops/overshirt', name: 'Overshirt' },
    { path: 'bottoms/denim', name: 'Denim' },
    { path: 'bottoms/cargo', name: 'Cargo' },
    { path: 'bottoms/joggers', name: 'Joggers' },
    { path: 'bottoms/sweats', name: 'Sweats' },
    { path: 'bottoms/shorts', name: 'Shorts' },
    { path: 'outerwear/puffer', name: 'Puffer' },
    { path: 'accessories/beanie', name: 'Beanie' },
    { path: 'accessories/cap', name: 'Cap' },
    { path: 'accessories/belt', name: 'Belt' },
    { path: 'accessories/gloves', name: 'Gloves' },
    { path: 'accessories/socks', name: 'Socks' },
    { path: 'accessories/ring', name: 'Ring' },
  ]

  // Arc 2 Shadow colors
  const arc2Colors = ['void', 'steel', 'blood', 'moss', 'earth']

  // Arc 3 Light colors
  const arc3Colors = ['cloud', 'sakura', 'mist', 'sand', 'lilac']

  const arc2Images = products.flatMap(product =>
    arc2Colors.map(color => `<url>
    <loc>${baseUrl}/arc-2/${product.path}</loc>
    <image:image>
      <image:loc>${baseUrl}/images/products/arc2-${product.path.split('/')[1]}-${color}.jpg</image:loc>
      <image:title>${product.name} in ${color.toUpperCase()} - Arc 2 Shadow</image:title>
      <image:caption>Premium minimalist ${product.name.toLowerCase()} from Arc 2 Shadow collection</image:caption>
    </image:image>
  </url>`)
  ).join('\n  ')

  const arc3Images = products.flatMap(product =>
    arc3Colors.map(color => `<url>
    <loc>${baseUrl}/arc-3/${product.path}</loc>
    <image:image>
      <image:loc>${baseUrl}/images/products/arc3-${product.path.split('/')[1]}-${color}.jpg</image:loc>
      <image:title>${product.name} in ${color.toUpperCase()} - Arc 3 Light</image:title>
      <image:caption>Premium minimalist ${product.name.toLowerCase()} from Arc 3 Light collection</image:caption>
    </image:image>
  </url>`)
  ).join('\n  ')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${arc2Images}
  ${arc3Images}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
