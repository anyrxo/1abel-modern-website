/**
 * Comprehensive Social Media Meta Tags
 * Optimized for ALL major platforms
 */

import { Metadata } from 'next'

interface SocialMetaProps {
  title: string
  description: string
  image: string
  url: string
  type?: 'website' | 'article'
  price?: number
  currency?: string
  availability?: 'in stock' | 'out of stock' | 'preorder'
  brand?: string
  category?: string
}

export function generateSocialMeta(props: SocialMetaProps): Metadata {
  const {
    title,
    description,
    image,
    url,
    type = 'website',
    price,
    currency = 'USD',
    availability = 'in stock',
    brand = '1ABEL',
    category,
  } = props

  return {
    // Basic Meta Tags
    title,
    description,

    // Open Graph (Facebook, LinkedIn, Discord, Telegram)
    openGraph: {
      type: type || 'website',
      title,
      description,
      url,
      siteName: '1ABEL',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          url: image,
          width: 1200,
          height: 1200,
          alt: title,
        },
      ],
      locale: 'en_US',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      site: '@1ABEL',
      creator: '@anyrxo',
    },

    // Additional meta tags
    other: {
      // Pinterest Rich Pins
      'pinterest:description': description,
      'pinterest:image': image,

      // WhatsApp / Telegram
      'og:image:width': '1200',
      'og:image:height': '630',

      // LinkedIn specific
      'linkedin:owner': '1ABEL',

      // Reddit
      'reddit:title': title,
      'reddit:description': description,

      // Slack unfurling
      'slack-app-id': 'YOUR_SLACK_APP_ID', // Replace with actual Slack app ID

      // Product-specific meta (Google Shopping, Pinterest, etc.)
      ...(price && {
        'product:price:amount': price.toString(),
        'product:price:currency': currency,
        'product:availability': availability,
        'product:brand': brand,
        'product:category': category,
        'product:retailer_item_id': url,

        // Schema.org product markup (JSON-LD alternative)
        'og:type': 'product',
        'og:product:price:amount': price.toString(),
        'og:product:price:currency': currency,
        'og:availability': availability,
        'og:brand': brand,

        // Pinterest Product Pins
        'pinterest:price': `${price} ${currency}`,
        'pinterest:availability': availability,

        // Facebook Product Catalog
        'fb:app_id': 'YOUR_FB_APP_ID', // Replace with actual Facebook App ID
        'product:condition': 'new',
        'product:retailer_part_no': url,
      }),

      // Apple specific
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': brand,

      // Microsoft specific
      'msapplication-TileColor': '#000000',
      'msapplication-TileImage': '/icons/ms-icon-144x144.png',

      // Theme color
      'theme-color': '#000000',

      // Format detection
      'format-detection': 'telephone=no',
    },
  }
}

/**
 * Generate product-specific social meta
 */
export function generateProductSocialMeta(
  productName: string,
  description: string,
  price: number,
  arc: 'Arc 2 Shadow' | 'Arc 3 Light',
  category: string,
  slug: string
): Metadata {
  const url = `https://1abel.com/arc-${arc === 'Arc 2 Shadow' ? '2' : '3'}/${category.toLowerCase()}/${slug}/`
  const image = `https://1abel.com/images/og/${slug}-${arc.replace(' ', '-').toLowerCase()}.jpg`

  return generateSocialMeta({
    title: `${productName} - ${arc} | 1ABEL`,
    description: `${description} Premium ${category} from 1ABEL's ${arc} collection. Music-inspired minimalist design.`,
    image,
    url,
    type: 'website',
    price,
    currency: 'USD',
    availability: 'in stock',
    brand: '1ABEL',
    category: `Apparel & Accessories > Clothing > ${category}`,
  })
}

/**
 * Generate homepage social meta
 */
export function generateHomepageSocialMeta(): Metadata {
  return generateSocialMeta({
    title: '1ABEL - Where Sound Becomes Style | Music-Inspired Minimalist Fashion',
    description: 'Premium minimalist essentials designed for those who move too fast to overthink their wardrobe. Music-driven design meets effortless style.',
    image: 'https://1abel.com/images/og/homepage.jpg',
    url: 'https://1abel.com/',
    type: 'website',
  })
}

/**
 * Generate category page social meta
 */
export function generateCategorySocialMeta(
  category: string,
  arc?: 'Arc 2 Shadow' | 'Arc 3 Light'
): Metadata {
  const arcSlug = arc ? `/arc-${arc === 'Arc 2 Shadow' ? '2' : '3'}` : ''
  const url = `https://1abel.com${arcSlug}/${category.toLowerCase()}/`
  const title = arc
    ? `${category} - ${arc} | 1ABEL`
    : `${category} | 1ABEL`
  const description = arc
    ? `Explore ${category.toLowerCase()} from 1ABEL's ${arc} collection. Music-inspired minimalist essentials.`
    : `Shop premium ${category.toLowerCase()} from 1ABEL. Where sound becomes style.`

  return generateSocialMeta({
    title,
    description,
    image: `https://1abel.com/images/og/${category.toLowerCase()}-${arc ? arc.replace(' ', '-').toLowerCase() : 'all'}.jpg`,
    url,
    type: 'website',
  })
}
