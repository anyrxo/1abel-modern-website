import { BASE_PRODUCTS, COLORS, PREMIUM_ACCESSORY_COLORS, PREMIUM_ACCESSORIES } from '@/data/products'

interface ProductSchemaProps {
  productId: string
  arc: 'ARC_2' | 'ARC_3'
  selectedColor?: string
  overallRating?: number
  totalReviews?: number
  pairsWith?: Array<{
    product: string
    color: string
    arc: string
    reason: string
    price: number
  }>
}

/**
 * JSON-LD Schema markup for product pages
 * Implements Product schema with offers, reviews, and cross-linking
 */
export default function ProductSchema({
  productId,
  arc,
  selectedColor,
  overallRating = 4.9,
  totalReviews = 0,
  pairsWith = []
}: ProductSchemaProps) {
  const product = BASE_PRODUCTS[productId]
  const price = arc === 'ARC_2' ? product.arc2Price : product.arc3Price
  const arcName = arc === 'ARC_2' ? 'Arc 2 Shadow' : 'Arc 3 Light'
  const arcSlug = arc === 'ARC_2' ? 'arc-2' : 'arc-3'
  const categorySlug = product.category.toLowerCase()
  const productSlug = productId.toLowerCase().replace(/_/g, '-')

  // Get available colors
  const colors = PREMIUM_ACCESSORIES.includes(productId)
    ? (arc === 'ARC_2' ? PREMIUM_ACCESSORY_COLORS.ARC_2 : PREMIUM_ACCESSORY_COLORS.ARC_3)
    : (arc === 'ARC_2' ? COLORS.ARC_2 : COLORS.ARC_3)

  const colorOptions = Object.keys(colors)

  // Product URL
  const productUrl = `https://1abel.com/${arcSlug}/${categorySlug}/${productSlug}`

  // Main product schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} - ${arcName}`,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: '1ABEL',
      url: 'https://1abel.com',
      logo: 'https://1abel.com/images/logo.png',
      description: 'Music-inspired minimalist fashion by Anyro',
    },
    category: product.category,
    color: selectedColor || colorOptions.join(', '),
    material: product.details.find(d => d.includes('cotton') || d.includes('fabric') || d.includes('GSM')) || 'Premium fabric',
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'USD',
      price: price,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: '1ABEL',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: totalReviews > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: overallRating,
      reviewCount: totalReviews,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    image: colorOptions.map(color =>
      `https://1abel.com/images/products/${arcSlug}-${productSlug}-${color.toLowerCase()}.jpg`
    ),
    sku: `${arcSlug.toUpperCase()}-${productId}-${selectedColor || 'MULTI'}`,
    mpn: `1ABEL-${productId}-${arc}`,
    gtin13: undefined, // Add if you have GTINs
    // Size variants
    variesBy: product.sizes.length > 1 ? 'size' : undefined,
    size: product.sizes.join(', '),
    // Additional product features
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Collection',
        value: arcName,
      },
      {
        '@type': 'PropertyValue',
        name: 'Available Colors',
        value: colorOptions.length.toString(),
      },
      ...product.details.map(detail => ({
        '@type': 'PropertyValue',
        name: 'Feature',
        value: detail,
      })),
    ],
    // Related products (cross-linking)
    isRelatedTo: pairsWith.slice(0, 4).map(pair => ({
      '@type': 'Product',
      name: `${pair.product} - ${pair.arc === 'ARC_2' ? 'Arc 2 Shadow' : 'Arc 3 Light'}`,
      url: `https://1abel.com/${pair.arc === 'ARC_2' ? 'arc-2' : 'arc-3'}/${categorySlug}/${pair.product.toLowerCase()}`,
      offers: {
        '@type': 'Offer',
        price: pair.price,
        priceCurrency: 'USD',
      },
    })),
    // Breadcrumb
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://1abel.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: arcName,
          item: `https://1abel.com/${arcSlug}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.category,
          item: `https://1abel.com/${arcSlug}/${categorySlug}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: product.name,
          item: productUrl,
        },
      ],
    },
  }

  // Organization schema for brand context
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '1ABEL',
    url: 'https://1abel.com',
    logo: 'https://1abel.com/images/logo.png',
    description: 'Music-inspired minimalist fashion. Two systems: Arc 2 Shadow (dark, substantial) and Arc 3 Light (soft, elevated). Founded by entrepreneur Anyro.',
    founder: {
      '@type': 'Person',
      name: 'Anyro',
    },
    sameAs: [
      // Add social media links if available
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
